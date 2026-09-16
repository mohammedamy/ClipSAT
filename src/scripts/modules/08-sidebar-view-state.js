var _sidebarOpen = false;
var _currentViewName = '';
var _currentChapterId = '';

// Wrap goChapter to track current chapter and refresh sidebar
(function(){
  var _ogc = window.goChapter;
  window.goChapter = function(id, view){
    _currentChapterId = id;
    if(view) _currentViewName = view;
    if(_ogc) _ogc.apply(this, arguments);
    if(_sidebarOpen) setTimeout(_renderSidebar, 120);
  };
})();

function _renderSidebar(){
  var body = document.getElementById('fsb-body');
  var titleEl = document.getElementById('fsb-title');
  if(!body) return;

  // 1. Try current chapter's formula-cards
  if(_currentChapterId){
    var chEl = document.getElementById(_currentChapterId);
    if(chEl){
      var fcs = chEl.querySelectorAll('.formula-cards');
      if(fcs && fcs.length){
        var h=''; fcs.forEach(function(fc){ h+=fc.innerHTML; });
        body.innerHTML = h;
        var th = chEl.querySelector('h2,h3,h1');
        if(titleEl) titleEl.textContent = (th?th.textContent:'Formulas').slice(0,30);
        if(window.MathJax && MathJax.typesetPromise) MathJax.typesetPromise([body]);
        return;
      }
    }
  }

  // 2. Fall back to any formula-cards in the active view
  var viewName = _currentViewName;
  if(!viewName){
    var av = document.querySelector('.view.active');
    if(av && av.id){ viewName = av.id.replace('view-',''); _currentViewName = viewName; }
  }
  if(!viewName){ body.innerHTML='<p class="fsb-empty">Open a chapter to see its formulas here.</p>'; return; }

  var viewEl = document.getElementById('view-'+viewName);
  if(!viewEl){ body.innerHTML='<p class="fsb-empty">Open a chapter to see its formulas here.</p>'; return; }

  var fcs = viewEl.querySelectorAll('.formula-cards');
  if(!fcs || !fcs.length){
    body.innerHTML='<p class="fsb-empty">No formula cards in this section.</p>';
    return;
  }
  var h=''; fcs.forEach(function(fc){ h+=fc.innerHTML; });
  body.innerHTML = h;
  var th = viewEl.querySelector('h1,h2,h3');
  if(titleEl) titleEl.textContent = (th?th.textContent:'Formulas').slice(0,30);
  if(window.MathJax && MathJax.typesetPromise) MathJax.typesetPromise([body]);
}

function toggleSidebar(){
  var sb = document.getElementById('formula-sidebar');
  _sidebarOpen = !_sidebarOpen;
  sb.classList.toggle('open', _sidebarOpen);
  var tog = document.getElementById('fsb-toggle');
  if(tog) tog.style.right = _sidebarOpen ? '270px' : '0';
  if(_sidebarOpen) _renderSidebar();
}
function loadSidebarForView(name){
  _currentViewName = name;
  if(_sidebarOpen) _renderSidebar();
}

/* ── MISTAKE LOG v2 (window.ML) ── */
