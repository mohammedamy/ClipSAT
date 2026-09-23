/* ── Keyboard access for horizontally scrolling display math (WCAG 2.1.1) ──
   .katex-display is overflow-x:auto (main.css) so a wide equation scrolls
   instead of breaking the layout — but a scroll container with nothing
   focusable inside is unreachable without a mouse (axe:
   scrollable-region-focusable). Only equations that actually overflow get
   tabindex="0": making every display equation a tab stop would bury the
   page's real controls under hundreds of extra stops. Overflow depends on
   layout, so this re-checks whenever a chapter is shown (the .chapter
   ch-active class flips) and on resize, and removes the tab stop again from
   an equation that no longer overflows. */
(function(){
  var MARK='data-scroll-focus';
  function sync(root){
    var nodes=(root||document).querySelectorAll('.katex-display');
    for(var i=0;i<nodes.length;i++){
      var el=nodes[i];
      if(el.offsetParent===null) continue; // hidden: its width is unknown until shown
      var overflows=el.scrollWidth>el.clientWidth+1;
      if(overflows && !el.hasAttribute('tabindex')){
        el.setAttribute('tabindex','0'); el.setAttribute(MARK,'1');
      } else if(!overflows && el.getAttribute(MARK)==='1'){
        el.removeAttribute('tabindex'); el.removeAttribute(MARK);
      }
    }
  }
  var pending=null;
  function schedule(){
    if(pending) return;
    pending=setTimeout(function(){ pending=null; sync(); },60);
  }
  window.CS_syncScrollFocus=sync;
  if(document.readyState!=='loading') schedule(); else document.addEventListener('DOMContentLoaded',schedule);
  window.addEventListener('load',schedule);
  window.addEventListener('resize',schedule);
  if('MutationObserver' in window){
    new MutationObserver(function(muts){
      for(var i=0;i<muts.length;i++){
        var t=muts[i].target;
        if(t.classList && (t.classList.contains('chapter')||t.classList.contains('view'))){ schedule(); return; }
      }
    }).observe(document.documentElement,{subtree:true,attributes:true,attributeFilter:['class']});
  }
})();
