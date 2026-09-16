(function(){
  function isBackdropCloser(el){
    // Modal overlays close themselves via onclick="if(event.target===this)close…()" —
    // that's a click-outside-to-dismiss convenience for mouse users, not a control
    // that should itself receive keyboard focus (the modal's own Close button already
    // does). Leaving these alone also avoids making an entire full-screen overlay div
    // a single giant tab stop.
    var oc=el.getAttribute('onclick')||'';
    return /event\.target\s*===\s*this/.test(oc);
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
  var mo=new MutationObserver(function(muts){
    for(var i=0;i<muts.length;i++){
      var added=muts[i].addedNodes;
      for(var j=0;j<added.length;j++) scan(added[j]);
    }
  });
  mo.observe(document.body,{childList:true,subtree:true});
})();

/* ══════ Modal focus management ══════
   None of the site's dialog overlays (mistake log, progress, legal,
   cloud sign-in, AI settings) move focus into themselves on open, trap Tab
   within themselves while open, or close on Escape — a keyboard user who
   opens one currently has no way to know it opened (focus stays wherever
   it was on the page behind it), and Tab keeps cycling through that
   background page instead of the dialog. Rather than hand-edit each
   modal's own open/close function (five different call sites, several with
   different class-toggle conventions), this watches each overlay's computed
   `display` and adds all three behaviors uniformly the moment any of them
   opens or closes. */
(function(){
  var MODALS=['mistake-overlay','progress-overlay','legal-overlay','cloud-auth-modal','aiModal','teacher-view-modal','google-auth-modal','gform-panel-modal'];
  var FOCUSABLE_SEL='a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])';
  MODALS.forEach(function(id){
    var el=document.getElementById(id);
    if(!el) return;
    var lastFocus=null, keyHandler=null, wasVisible=false;
    function focusables(){
      return Array.prototype.slice.call(el.querySelectorAll(FOCUSABLE_SEL))
        .filter(function(n){ return n.offsetParent!==null; });
    }
    function onShown(){
      lastFocus=document.activeElement;
      var f=focusables();
      (f[0]||el).focus({preventScroll:true});
      keyHandler=function(e){
        if(e.key==='Escape'){
          // Every one of these overlays already closes itself via
          // onclick="if(event.target===this)close…()" on the div — a
          // programmatic .click() on the div dispatches with target===el,
          // so this reuses each modal's own close logic without needing
          // to know its function name.
          el.click();
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
      if(keyHandler){ el.removeEventListener('keydown',keyHandler); keyHandler=null; }
      if(lastFocus && document.contains(lastFocus)) lastFocus.focus({preventScroll:true});
      lastFocus=null;
    }
    var mo=new MutationObserver(function(){
      var visible=getComputedStyle(el).display!=='none';
      if(visible && !wasVisible) onShown();
      else if(!visible && wasVisible) onHidden();
      wasVisible=visible;
    });
    mo.observe(el,{attributes:true,attributeFilter:['class','style']});
  });
})();