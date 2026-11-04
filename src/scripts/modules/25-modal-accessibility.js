(function(){
  function isBackdropCloser(el){
    // Modal overlays close themselves via onclick="if(event.target===this)close…()" —
    // that's a click-outside-to-dismiss convenience for mouse users, not a control
    // that should itself receive keyboard focus (the modal's own Close button already
    // does). Leaving these alone also avoids making an entire full-screen overlay div
    // a single giant tab stop.
    var oc=el.getAttribute('onclick')||'';
    return /event\.target\s*===\s*this/.test(oc) || el.classList.contains('fc-backdrop');
  }
  function hasFocusableChild(el){
    // If a clickable div already contains a real control (a button, link, input…),
    // making the div itself a second, wrapping tab stop would create a confusing
    // "interactive inside interactive" nesting — the inner control is already
    // keyboard-reachable on its own, so leave the wrapper as-is.
    return !!el.querySelector('a[href],button,input,select,textarea,[tabindex]');
  }
  function enhance(el){
    if(el.hasAttribute('data-kbd-done')) return;
    if(el.tagName!=='DIV'&&el.tagName!=='SPAN') return;
    if(!el.hasAttribute('onclick')) return;
    el.setAttribute('data-kbd-done','1');
    if(el.hasAttribute('tabindex')) return; // already keyboard-reachable somehow
    if(el.getAttribute('aria-hidden')==='true') return;
    if(isBackdropCloser(el)) return;
    if(hasFocusableChild(el)) return;
    el.setAttribute('tabindex','0');
    if(!el.hasAttribute('role')) el.setAttribute('role','button');
    el.addEventListener('keydown',function(e){
      if(e.key==='Enter'||e.key===' '||e.key==='Spacebar'){
        e.preventDefault();
        el.click();
      }
    });
  }
  function scan(root){
    if(!root||root.nodeType!==1) return;
    if(root.matches&&root.matches('[onclick]')) enhance(root);
    if(root.querySelectorAll) root.querySelectorAll('[onclick]').forEach(enhance);
  }
  scan(document.body);
  // Delegated keyboard activation for dynamically injected [onclick] DIV/SPANs (zero global subtree MutationObserver)
  document.addEventListener('keydown',function(e){
    if(e.key!=='Enter'&&e.key!==' '&&e.key!=='Spacebar') return;
    var el=e.target;
    if(!el||el.nodeType!==1) return;
    if((el.tagName==='DIV'||el.tagName==='SPAN')&&el.hasAttribute('onclick')&&!isBackdropCloser(el)){
      e.preventDefault();
      el.click();
    }
  });
  document.addEventListener('clipsat:quiz-ready',function(ev){
    var root=(ev&&ev.detail&&ev.detail.outEl)||document.body;
    scan(root);
  });
  document.addEventListener('clipsat:chapter-change',function(){ scan(document.body); });
})();

/* ══════ Modal focus & inert lifecycle management (WCAG 2.2 AA · WP-29) ══════ */
(function(){
  var MODALS=[
    'mistake-overlay','progress-overlay','legal-overlay','cloud-auth-modal',
    'cookie-consent-overlay','teacher-view-modal','google-auth-modal','gform-panel-modal',
    'glossaryOverlay','formulaOverlay','flashcards-sidebar'
  ];
  var FOCUSABLE_SEL='a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])';
  function isOverlayVisible(el){
    if(!el) return false;
    var cs=getComputedStyle(el);
    if(cs.display==='none'||cs.visibility==='hidden'||parseFloat(cs.opacity||'1')<=0.02) return false;
    if(el.id==='flashcards-sidebar') return el.classList.contains('open');
    if(el.classList.contains('glossary-overlay')||el.classList.contains('formula-overlay')||el.classList.contains('legal-overlay')){
      return el.classList.contains('open')||el.classList.contains('show')||el.classList.contains('active');
    }
    return true;
  }
  MODALS.forEach(function(id){
    var el=document.getElementById(id);
    if(!el) return;
    var lastFocus=null, keyHandler=null, wasVisible=isOverlayVisible(el);
    el.inert=!wasVisible;
    if(!wasVisible) el.setAttribute('aria-hidden','true');
    function focusables(){
      return Array.prototype.slice.call(el.querySelectorAll(FOCUSABLE_SEL))
        .filter(function(n){ return n.offsetParent!==null; });
    }
    function closeOverlay(){
      if(id==='glossaryOverlay'&&window.closeGlossaryModal){ window.closeGlossaryModal(); return; }
      if(id==='formulaOverlay'&&window.closeFormulaModal){ window.closeFormulaModal(); return; }
      if(id==='flashcards-sidebar'&&window.CSGamify&&window.CSGamify.closeFlashcards){ window.CSGamify.closeFlashcards(); return; }
      el.click();
    }
    function onShown(){
      el.inert=false;
      el.setAttribute('aria-hidden','false');
      lastFocus=document.activeElement;
      setTimeout(function(){
        var f=focusables();
        if(f[0]) f[0].focus({preventScroll:true});
      }, 20);
      keyHandler=function(e){
        if(e.key==='Escape'){
          e.stopPropagation();
          closeOverlay();
          return;
        }
        if(e.key!=='Tab') return;
        var items=focusables();
        if(!items.length) return;
        var first=items[0], last=items[items.length-1];
        if(e.shiftKey && document.activeElement===first){ e.preventDefault(); last.focus(); }
        else if(!e.shiftKey && document.activeElement===last){ e.preventDefault(); first.focus(); }
      };
      el.addEventListener('keydown',keyHandler);
    }
    function onHidden(){
      el.inert=true;
      el.setAttribute('aria-hidden','true');
      if(keyHandler){ el.removeEventListener('keydown',keyHandler); keyHandler=null; }
      if(lastFocus && document.contains(lastFocus)) lastFocus.focus({preventScroll:true});
      lastFocus=null;
    }
    var mo=new MutationObserver(function(){
      var visible=isOverlayVisible(el);
      if(visible && !wasVisible) onShown();
      else if(!visible && wasVisible) onHidden();
      wasVisible=visible;
    });
    mo.observe(el,{attributes:true,attributeFilter:['class','style']});
  });

  /* #chatPanel Escape & focus return to #chatFab (WP-29) */
  var chatPanel=document.getElementById('chatPanel');
  if(chatPanel){
    chatPanel.addEventListener('keydown',function(e){
      if(e.key==='Escape' && chatPanel.classList.contains('open')){
        e.stopPropagation();
        var closeBtn=document.getElementById('chatClose');
        if(closeBtn) closeBtn.click();
        var fab=document.getElementById('chatFab');
        if(fab) setTimeout(function(){ fab.focus({preventScroll:true}); }, 30);
      }
    });
  }
})();