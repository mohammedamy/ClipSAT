(function(){
  "use strict";

  /* ═══════════════════════════════════════════════════════════════════
     CLIP-SAT FLOATING EXAM CALCULATOR (Desmos Graphing + Scientific + Quick)
     Authentic floating tool for CBT practice & coursework.
     ═══════════════════════════════════════════════════════════════════ */

  var _calcEl = null;
  var _activeMode = 'graphing';
  var _isMinimized = false;
  var _pos = { x: 0, y: 0 };
  var _hasMoved = false;

  var MODES = {
    graphing: {
      name: 'Graphing',
      url: 'https://www.desmos.com/calculator?embed'
    },
    scientific: {
      name: 'Scientific',
      url: 'https://www.desmos.com/scientific?embed'
    },
    fourFunction: {
      name: 'Quick Calc',
      url: 'https://www.desmos.com/fourfunction?embed'
    }
  };

  function _buildCalcDOM(){
    if(_calcEl) return _calcEl;

    _calcEl = document.createElement('div');
    _calcEl.id = 'cs-floating-calc';
    _calcEl.setAttribute('role', 'dialog');
    _calcEl.setAttribute('aria-label', 'Floating Exam Calculator');
    _calcEl.style.cssText = [
      'position:fixed',
      'top:80px',
      'right:24px',
      'width:440px',
      'height:540px',
      'min-width:320px',
      'min-height:260px',
      'max-width:95vw',
      'max-height:85vh',
      'background:var(--panel,#ffffff)',
      'border:1.5px solid var(--border,#cbd5e1)',
      'border-radius:12px',
      'box-shadow:0 12px 36px rgba(0,0,0,.22), 0 2px 8px rgba(0,0,0,.1)',
      'z-index:98000',
      'display:none',
      'flex-direction:column',
      'overflow:hidden',
      'resize:both',
      'font-family:var(--sans,-apple-system,BlinkMacSystemFont,sans-serif)'
    ].join(';');

    _calcEl.innerHTML = [
      '<div id="cs-fcalc-header" style="background:var(--indigo,#132746);color:#fff;padding:8px 12px;display:flex;align-items:center;gap:8px;cursor:move;user-select:none;flex-shrink:0">',
        '<span style="font-weight:700;font-size:.85rem;display:flex;align-items:center;gap:6px">🧮 <span>Calculator</span></span>',
        '<div style="display:flex;gap:4px;margin-left:auto;background:rgba(0,0,0,.2);padding:2px 4px;border-radius:6px">',
          '<button type="button" class="cs-fcalc-tab" data-mode="graphing" style="background:rgba(255,255,255,.2);color:#fff;border:none;border-radius:4px;padding:3px 8px;font-size:.74rem;font-weight:600;cursor:pointer">Graphing</button>',
          '<button type="button" class="cs-fcalc-tab" data-mode="scientific" style="background:transparent;color:rgba(255,255,255,.8);border:none;border-radius:4px;padding:3px 8px;font-size:.74rem;font-weight:600;cursor:pointer">Scientific</button>',
          '<button type="button" class="cs-fcalc-tab" data-mode="fourFunction" style="background:transparent;color:rgba(255,255,255,.8);border:none;border-radius:4px;padding:3px 8px;font-size:.74rem;font-weight:600;cursor:pointer">Quick</button>',
        '</div>',
        '<button type="button" id="cs-fcalc-min-btn" aria-label="Minimize" style="background:transparent;border:none;color:#fff;font-size:.95rem;padding:2px 6px;cursor:pointer;opacity:.85;margin-left:4px">_</button>',
        '<button type="button" id="cs-fcalc-close-btn" aria-label="Close" style="background:transparent;border:none;color:#fff;font-size:1.1rem;padding:2px 6px;cursor:pointer;opacity:.85">&times;</button>',
      '</div>',
      '<div id="cs-fcalc-body" style="flex:1;position:relative;background:#f8fafc;width:100%;height:100%;overflow:hidden">',
        '<iframe id="cs-fcalc-frame" title="Desmos Calculator" style="width:100%;height:100%;border:none;display:block" src="about:blank"></iframe>',
      '</div>'
    ].join('');

    document.body.appendChild(_calcEl);

    // Wire buttons
    var closeBtn = _calcEl.querySelector('#cs-fcalc-close-btn');
    if(closeBtn) closeBtn.onclick = function(){ window.closeFloatingCalc(); };

    var minBtn = _calcEl.querySelector('#cs-fcalc-min-btn');
    if(minBtn) minBtn.onclick = function(){ _toggleMinimize(); };

    var tabs = _calcEl.querySelectorAll('.cs-fcalc-tab');
    tabs.forEach(function(btn){
      btn.onclick = function(){
        var mode = this.getAttribute('data-mode');
        _switchMode(mode);
      };
    });

    _makeHeaderDraggable(_calcEl, _calcEl.querySelector('#cs-fcalc-header'));

    return _calcEl;
  }

  function _switchMode(mode){
    if(!MODES[mode]) mode = 'graphing';
    _activeMode = mode;

    var tabs = _calcEl.querySelectorAll('.cs-fcalc-tab');
    tabs.forEach(function(b){
      var isActive = (b.getAttribute('data-mode') === mode);
      b.style.background = isActive ? 'rgba(255,255,255,.25)' : 'transparent';
      b.style.color = isActive ? '#fff' : 'rgba(255,255,255,.75)';
    });

    var frame = _calcEl.querySelector('#cs-fcalc-frame');
    if(frame){
      var targetSrc = MODES[mode].url;
      if(frame.src !== targetSrc){
        frame.src = targetSrc;
      }
    }
  }

  function _toggleMinimize(){
    var body = _calcEl.querySelector('#cs-fcalc-body');
    var minBtn = _calcEl.querySelector('#cs-fcalc-min-btn');
    _isMinimized = !_isMinimized;
    if(_isMinimized){
      if(body) body.style.display = 'none';
      _calcEl.style.height = 'auto';
      _calcEl.style.minHeight = '0';
      _calcEl.style.resize = 'none';
      if(minBtn) minBtn.textContent = '▢';
    } else {
      if(body) body.style.display = 'block';
      _calcEl.style.height = '540px';
      _calcEl.style.minHeight = '260px';
      _calcEl.style.resize = 'both';
      if(minBtn) minBtn.textContent = '_';
    }
  }

  function _makeHeaderDraggable(container, handle){
    var startX = 0, startY = 0, initLeft = 0, initTop = 0;
    var dragging = false;

    function onPointerDown(e){
      if(e.target.tagName === 'BUTTON' || e.target.closest('button')) return;
      dragging = true;
      var clientX = e.touches ? e.touches[0].clientX : e.clientX;
      var clientY = e.touches ? e.touches[0].clientY : e.clientY;
      startX = clientX;
      startY = clientY;

      var rect = container.getBoundingClientRect();
      initLeft = rect.left;
      initTop = rect.top;

      // Switch from right-based positioning to absolute left/top
      container.style.right = 'auto';
      container.style.left = initLeft + 'px';
      container.style.top = initTop + 'px';

      document.addEventListener('mousemove', onPointerMove, { passive: false });
      document.addEventListener('mouseup', onPointerUp);
      document.addEventListener('touchmove', onPointerMove, { passive: false });
      document.addEventListener('touchend', onPointerUp);
      e.preventDefault();
    }

    function onPointerMove(e){
      if(!dragging) return;
      var clientX = e.touches ? e.touches[0].clientX : e.clientX;
      var clientY = e.touches ? e.touches[0].clientY : e.clientY;
      var dx = clientX - startX;
      var dy = clientY - startY;

      var newLeft = Math.max(10, Math.min(window.innerWidth - 80, initLeft + dx));
      var newTop = Math.max(10, Math.min(window.innerHeight - 50, initTop + dy));

      container.style.left = newLeft + 'px';
      container.style.top = newTop + 'px';
      _hasMoved = true;
      e.preventDefault();
    }

    function onPointerUp(){
      dragging = false;
      document.removeEventListener('mousemove', onPointerMove);
      document.removeEventListener('mouseup', onPointerUp);
      document.removeEventListener('touchmove', onPointerMove);
      document.removeEventListener('touchend', onPointerUp);
    }

    handle.addEventListener('mousedown', onPointerDown);
    handle.addEventListener('touchstart', onPointerDown, { passive: false });
  }

  window.openFloatingCalc = function(mode){
    var el = _buildCalcDOM();
    if(mode && MODES[mode]){
      _switchMode(mode);
    } else {
      var frame = el.querySelector('#cs-fcalc-frame');
      if(!frame.src || frame.src === 'about:blank'){
        _switchMode(_activeMode);
      }
    }
    el.style.display = 'flex';
  };

  window.closeFloatingCalc = function(){
    if(_calcEl){
      _calcEl.style.display = 'none';
    }
  };

  window.toggleFloatingCalc = function(mode){
    var el = _buildCalcDOM();
    if(el.style.display === 'flex'){
      window.closeFloatingCalc();
    } else {
      window.openFloatingCalc(mode);
    }
  };

  // Keyboard shortcut: Alt + C toggles the floating calculator
  document.addEventListener('keydown', function(e){
    if(e.altKey && (e.key === 'c' || e.key === 'C')){
      window.toggleFloatingCalc();
      e.preventDefault();
    }
  });

})();
