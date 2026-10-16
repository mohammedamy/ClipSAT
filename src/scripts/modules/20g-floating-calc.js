(function(){
  "use strict";

  /* ═══════════════════════════════════════════════════════════════════
     CLIP-SAT FLOATING EXAM CALCULATOR (Desmos Graphing + Scientific + Quick)
     Authentic floating tool for CBT practice & coursework.
     Powered by official Desmos API with on-screen math keypad, presets,
     responsive drag/resize, expand/restore, and dark-mode sync.
     ═══════════════════════════════════════════════════════════════════ */

  var DESMOS_API_URL = 'https://www.desmos.com/api/v1.11/calculator.js?apiKey=dcb31709b452b1cf9dc26972add0fda6';
  var _desmosLoadPromise = null;

  function _ensureDesmosAPI(){
    if(window.Desmos && typeof window.Desmos.GraphingCalculator === 'function'){
      return Promise.resolve(window.Desmos);
    }
    if(_desmosLoadPromise) return _desmosLoadPromise;
    _desmosLoadPromise = new Promise(function(resolve, reject){
      var existing = document.querySelector('script[src*="desmos.com/api"]');
      if(existing){
        var waitCount = 0;
        var checkInterval = setInterval(function(){
          waitCount++;
          if(window.Desmos && typeof window.Desmos.GraphingCalculator === 'function'){
            clearInterval(checkInterval);
            resolve(window.Desmos);
          } else if(waitCount > 100){
            clearInterval(checkInterval);
            reject(new Error('Desmos API load timeout'));
          }
        }, 50);
        return;
      }
      var s = document.createElement('script');
      s.src = DESMOS_API_URL;
      s.async = true;
      s.onload = function(){
        if(window.Desmos && typeof window.Desmos.GraphingCalculator === 'function'){
          resolve(window.Desmos);
        } else {
          reject(new Error('Desmos API object missing'));
        }
      };
      s.onerror = function(err){ reject(err); };
      document.head.appendChild(s);
    });
    return _desmosLoadPromise;
  }

  function _isDarkMode(){
    return document.documentElement.getAttribute('data-theme') === 'dark' ||
           document.documentElement.classList.contains('dark') ||
           (document.body && document.body.classList.contains('dark'));
  }

  var _calcEl = null;
  var _activeMode = 'graphing';
  var _isMinimized = false;
  var _isMaximized = false;
  var _savedBounds = null;
  var _hasMoved = false;
  var _apiCalc = null;
  var _apiMode = null;
  var _themeObserver = null;

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
    },
    distributions: {
      name: 'Distributions',
      isCustom: true
    }
  };

  /* ── Stats Math Helpers ── */
  function _erf(x){
    var sign = x < 0 ? -1 : 1; x = Math.abs(x);
    var a1=0.254829592, a2=-0.284496736, a3=1.421413741, a4=-1.453152027, a5=1.061405429, p=0.3275911;
    var t = 1 / (1 + p * x);
    var y = 1 - (((((a5 * t + a4) * t + a3) * t + a2) * t + a1) * t * Math.exp(-x * x));
    return sign * y;
  }
  function _normCdf(x, mu, sigma){
    if(sigma <= 0) return 0;
    var z = (x - mu) / sigma;
    return 0.5 * (1 + _erf(z / Math.SQRT2));
  }
  function _invNorm(p, mu, sigma){
    if(p <= 0) return -Infinity;
    if(p >= 1) return Infinity;
    var q = p < 0.5 ? p : 1 - p;
    var t = Math.sqrt(-2 * Math.log(q));
    var c0 = 2.515517, c1 = 0.802853, c2 = 0.010328;
    var d1 = 1.432788, d2 = 0.189269, d3 = 0.001308;
    var z = t - ((c2 * t + c1) * t + c0) / (((d3 * t + d2) * t + d1) * t + 1);
    if(p < 0.5) z = -z;
    return mu + z * sigma;
  }
  function _logFact(n){
    var s = 0;
    for(var i = 2; i <= n; i++) s += Math.log(i);
    return s;
  }
  function _binomPdf(n, p, k){
    if(k < 0 || k > n || p < 0 || p > 1) return 0;
    if(p === 0) return k === 0 ? 1 : 0;
    if(p === 1) return k === n ? 1 : 0;
    var logC = _logFact(n) - _logFact(k) - _logFact(n - k);
    return Math.exp(logC + k * Math.log(p) + (n - k) * Math.log(1 - p));
  }
  function _poissonPdf(lambda, k){
    if(k < 0 || lambda <= 0) return 0;
    return Math.exp(-lambda + k * Math.log(lambda) - _logFact(k));
  }

  var _statsDist = 'normCdf';

  function _buildCalcDOM(){
    if(_calcEl) return _calcEl;

    _calcEl = document.createElement('div');
    _calcEl.id = 'cs-floating-calc';
    _calcEl.setAttribute('role', 'dialog');
    _calcEl.setAttribute('aria-label', 'Floating Exam Calculator');
    _calcEl.style.cssText = [
      'position:fixed',
      'top:72px',
      'right:24px',
      'width:560px',
      'height:600px',
      'min-width:340px',
      'min-height:300px',
      'max-width:96vw',
      'max-height:90vh',
      'background:var(--panel,#ffffff)',
      'border:1.5px solid var(--border,#cbd5e1)',
      'border-radius:12px',
      'box-shadow:0 14px 40px rgba(0,0,0,.26), 0 3px 10px rgba(0,0,0,.12)',
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
        '<div style="display:flex;gap:3px;margin-left:auto;background:rgba(0,0,0,.2);padding:2px 4px;border-radius:6px">',
          '<button type="button" class="cs-fcalc-tab" data-mode="graphing" style="background:rgba(255,255,255,.2);color:#fff;border:none;border-radius:4px;padding:3px 7px;font-size:.72rem;font-weight:600;cursor:pointer">Graphing</button>',
          '<button type="button" class="cs-fcalc-tab" data-mode="scientific" style="background:transparent;color:rgba(255,255,255,.8);border:none;border-radius:4px;padding:3px 7px;font-size:.72rem;font-weight:600;cursor:pointer">Scientific</button>',
          '<button type="button" class="cs-fcalc-tab" data-mode="fourFunction" style="background:transparent;color:rgba(255,255,255,.8);border:none;border-radius:4px;padding:3px 7px;font-size:.72rem;font-weight:600;cursor:pointer">Quick</button>',
          '<button type="button" class="cs-fcalc-tab" data-mode="distributions" style="background:transparent;color:rgba(255,255,255,.8);border:none;border-radius:4px;padding:3px 7px;font-size:.72rem;font-weight:600;cursor:pointer">📊 Stats</button>',
        '</div>',
        '<button type="button" id="cs-fcalc-max-btn" title="Expand / Restore" aria-label="Expand" style="background:transparent;border:none;color:#fff;font-size:.9rem;padding:2px 6px;cursor:pointer;opacity:.85;margin-left:4px">⛶</button>',
        '<button type="button" id="cs-fcalc-min-btn" title="Minimize" aria-label="Minimize" style="background:transparent;border:none;color:#fff;font-size:.95rem;padding:2px 6px;cursor:pointer;opacity:.85;margin-left:2px">_</button>',
        '<button type="button" id="cs-fcalc-close-btn" title="Close" aria-label="Close" style="background:transparent;border:none;color:#fff;font-size:1.15rem;padding:2px 6px;cursor:pointer;opacity:.85">&times;</button>',
      '</div>',
      '<div id="cs-fcalc-presets-bar" style="background:var(--subtle,#f1f5f9);border-bottom:1px solid var(--border,#e2e8f0);padding:4px 10px;display:flex;align-items:center;gap:6px;font-size:.72rem;flex-shrink:0;overflow-x:auto">',
        '<span style="font-weight:700;color:var(--text-muted,#64748b);display:flex;align-items:center;gap:3px">⚡ Presets:</span>',
        '<button type="button" class="cs-fcalc-preset-btn" data-preset="linear" style="background:var(--panel,#fff);border:1px solid var(--border,#cbd5e1);border-radius:4px;padding:2px 7px;cursor:pointer;font-size:.72rem;font-weight:600;color:#1e40af">y=mx+b</button>',
        '<button type="button" class="cs-fcalc-preset-btn" data-preset="quadratic" style="background:var(--panel,#fff);border:1px solid var(--border,#cbd5e1);border-radius:4px;padding:2px 7px;cursor:pointer;font-size:.72rem;font-weight:600;color:#6b21a8">y=ax²+bx+c</button>',
        '<button type="button" class="cs-fcalc-preset-btn" data-preset="system" style="background:var(--panel,#fff);border:1px solid var(--border,#cbd5e1);border-radius:4px;padding:2px 7px;cursor:pointer;font-size:.72rem;font-weight:600;color:#047857">System</button>',
        '<button type="button" class="cs-fcalc-preset-btn" data-preset="trig" style="background:var(--panel,#fff);border:1px solid var(--border,#cbd5e1);border-radius:4px;padding:2px 7px;cursor:pointer;font-size:.72rem;font-weight:600;color:#c026d3">sin(x)</button>',
        '<button type="button" class="cs-fcalc-preset-btn" data-preset="circle" style="background:var(--panel,#fff);border:1px solid var(--border,#cbd5e1);border-radius:4px;padding:2px 7px;cursor:pointer;font-size:.72rem;font-weight:600;color:#b45309">Circle</button>',
        '<button type="button" class="cs-fcalc-preset-btn" data-preset="clear" style="margin-left:auto;background:transparent;border:1px solid #fca5a5;border-radius:4px;padding:2px 6px;cursor:pointer;font-size:.7rem;color:#b91c1c;font-weight:600">Clear</button>',
      '</div>',
      '<div id="cs-fcalc-body" style="flex:1;position:relative;background:#f8fafc;width:100%;height:100%;overflow:hidden">',
        '<div id="cs-fcalc-api-box" style="position:relative;width:100%;height:100%;display:none"></div>',
        '<iframe id="cs-fcalc-frame" title="Desmos Calculator" style="position:relative;width:100%;height:100%;border:none;display:none" src="about:blank"></iframe>',
        '<div id="cs-fcalc-stats" style="display:none;width:100%;height:100%;overflow-y:auto;padding:12px;box-sizing:border-box;background:#f8fafc;font-size:.85rem;color:#1e293b"></div>',
        '<div id="cs-fcalc-shield" style="position:absolute;inset:0;z-index:9999;display:none;background:transparent;cursor:move"></div>',
      '</div>'
    ].join('');

    document.body.appendChild(_calcEl);

    // Wire close, minimize, maximize
    var closeBtn = _calcEl.querySelector('#cs-fcalc-close-btn');
    if(closeBtn) closeBtn.onclick = function(){ window.closeFloatingCalc(); };

    var minBtn = _calcEl.querySelector('#cs-fcalc-min-btn');
    if(minBtn) minBtn.onclick = function(){ _toggleMinimize(); };

    var maxBtn = _calcEl.querySelector('#cs-fcalc-max-btn');
    if(maxBtn) maxBtn.onclick = function(){ _toggleMaximize(); };

    // Wire tabs
    var tabs = _calcEl.querySelectorAll('.cs-fcalc-tab');
    tabs.forEach(function(btn){
      btn.onclick = function(){
        var mode = this.getAttribute('data-mode');
        _switchMode(mode);
      };
    });

    // Wire presets
    var presetBtns = _calcEl.querySelectorAll('.cs-fcalc-preset-btn');
    presetBtns.forEach(function(btn){
      btn.onclick = function(){
        var preset = this.getAttribute('data-preset');
        _applyFloatingPreset(preset);
      };
    });

    _makeHeaderDraggable(_calcEl, _calcEl.querySelector('#cs-fcalc-header'));

    // ResizeObserver to ensure Desmos refits canvas when resized by user
    if(window.ResizeObserver){
      try{
        var ro = new ResizeObserver(function(){
          if(_apiCalc && typeof _apiCalc.resize === 'function'){
            _apiCalc.resize();
          }
        });
        ro.observe(_calcEl);
      }catch(e){}
    }

    return _calcEl;
  }

  function _applyFloatingPreset(preset){
    if(_activeMode !== 'graphing'){
      _switchMode('graphing');
    }
    if(!_apiCalc || typeof _apiCalc.setExpression !== 'function') return;
    if(preset === 'clear'){
      _apiCalc.setBlank();
      return;
    }
    _apiCalc.setBlank();
    if(preset === 'linear'){
      _apiCalc.setExpression({ id: 'l1', latex: 'y = 2x + 1', color: '#2563eb' });
    } else if(preset === 'quadratic'){
      _apiCalc.setExpression({ id: 'q1', latex: 'y = x^2 - 4x + 3', color: '#7c3aed' });
      _apiCalc.setExpression({ id: 'v1', latex: '(2, -1)', color: '#dc2626', showLabel: true, label: 'Vertex (2, -1)' });
    } else if(preset === 'system'){
      _apiCalc.setExpression({ id: 's1', latex: 'y = 2x - 1', color: '#2563eb' });
      _apiCalc.setExpression({ id: 's2', latex: 'y = -x + 5', color: '#dc2626' });
      _apiCalc.setExpression({ id: 'p1', latex: '(2, 3)', color: '#059669', showLabel: true, label: 'Intersection (2, 3)' });
    } else if(preset === 'trig'){
      _apiCalc.setExpression({ id: 't1', latex: 'y = \\sin(x)', color: '#c026d3' });
      _apiCalc.setExpression({ id: 't2', latex: 'y = \\cos(x)', color: '#0284c7' });
    } else if(preset === 'circle'){
      _apiCalc.setExpression({ id: 'c1', latex: '(x - 2)^2 + (y + 1)^2 = 16', color: '#b45309' });
      _apiCalc.setExpression({ id: 'ctr', latex: '(2, -1)', color: '#b45309', showLabel: true, label: 'Center (2, -1), r=4' });
    }
  }

  function _renderStatsUI(container){
    var html = [
      '<div style="display:flex;gap:4px;margin-bottom:12px;border-bottom:1px solid #e2e8f0;padding-bottom:8px">',
        '<button type="button" class="cs-sdist-btn" data-dist="normCdf" style="flex:1;padding:5px;border-radius:6px;font-size:.73rem;font-weight:600;cursor:pointer;border:1px solid '+(_statsDist==='normCdf'?'#4f46e5':'#cbd5e1')+';background:'+(_statsDist==='normCdf'?'#4f46e5':'#fff')+';color:'+(_statsDist==='normCdf'?'#fff':'#334155')+'">Normal CDF</button>',
        '<button type="button" class="cs-sdist-btn" data-dist="invNorm" style="flex:1;padding:5px;border-radius:6px;font-size:.73rem;font-weight:600;cursor:pointer;border:1px solid '+(_statsDist==='invNorm'?'#4f46e5':'#cbd5e1')+';background:'+(_statsDist==='invNorm'?'#4f46e5':'#fff')+';color:'+(_statsDist==='invNorm'?'#fff':'#334155')+'">invNorm</button>',
        '<button type="button" class="cs-sdist-btn" data-dist="binom" style="flex:1;padding:5px;border-radius:6px;font-size:.73rem;font-weight:600;cursor:pointer;border:1px solid '+(_statsDist==='binom'?'#4f46e5':'#cbd5e1')+';background:'+(_statsDist==='binom'?'#4f46e5':'#fff')+';color:'+(_statsDist==='binom'?'#fff':'#334155')+'">Binomial</button>',
        '<button type="button" class="cs-sdist-btn" data-dist="poisson" style="flex:1;padding:5px;border-radius:6px;font-size:.73rem;font-weight:600;cursor:pointer;border:1px solid '+(_statsDist==='poisson'?'#4f46e5':'#cbd5e1')+';background:'+(_statsDist==='poisson'?'#4f46e5':'#fff')+';color:'+(_statsDist==='poisson'?'#fff':'#334155')+'">Poisson</button>',
      '</div>',
      '<div id="cs-sdist-body"></div>'
    ].join('');

    container.innerHTML = html;

    var btns = container.querySelectorAll('.cs-sdist-btn');
    btns.forEach(function(b){
      b.onclick = function(){
        _statsDist = this.getAttribute('data-dist');
        _renderStatsUI(container);
      };
    });

    var bodyEl = container.querySelector('#cs-sdist-body');
    if(_statsDist === 'normCdf') _renderNormCdf(bodyEl);
    else if(_statsDist === 'invNorm') _renderInvNorm(bodyEl);
    else if(_statsDist === 'binom') _renderBinom(bodyEl);
    else if(_statsDist === 'poisson') _renderPoisson(bodyEl);
  }

  function _renderNormCdf(body){
    body.innerHTML = [
      '<div style="background:#fff;padding:10px;border-radius:8px;border:1px solid #e2e8f0;margin-bottom:10px">',
        '<div style="font-weight:700;font-size:.82rem;margin-bottom:8px;color:#1e3a8a">Normal Distribution: X ~ N(μ, σ²)</div>',
        '<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:8px">',
          '<label style="font-size:.75rem;color:#64748b">Mean (μ):<br><input type="number" id="cs-sc-mu" value="0" step="any" style="width:100%;padding:4px 6px;border:1px solid #cbd5e1;border-radius:4px;font-size:.8rem;box-sizing:border-box"></label>',
          '<label style="font-size:.75rem;color:#64748b">Std Dev (σ):<br><input type="number" id="cs-sc-sigma" value="1" min="0.0001" step="any" style="width:100%;padding:4px 6px;border:1px solid #cbd5e1;border-radius:4px;font-size:.8rem;box-sizing:border-box"></label>',
        '</div>',
        '<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">',
          '<label style="font-size:.75rem;color:#64748b">Lower (a):<br><input type="number" id="cs-sc-lower" value="-1.96" step="any" style="width:100%;padding:4px 6px;border:1px solid #cbd5e1;border-radius:4px;font-size:.8rem;box-sizing:border-box"></label>',
          '<label style="font-size:.75rem;color:#64748b">Upper (b):<br><input type="number" id="cs-sc-upper" value="1.96" step="any" style="width:100%;padding:4px 6px;border:1px solid #cbd5e1;border-radius:4px;font-size:.8rem;box-sizing:border-box"></label>',
        '</div>',
      '</div>',
      '<div id="cs-sc-result" style="background:#e0e7ff;border:1px solid #c7d2fe;padding:10px;border-radius:8px;margin-bottom:10px;font-family:monospace;font-size:.9rem;font-weight:700;color:#1e1b4b;text-align:center"></div>',
      '<div id="cs-sc-svg" style="background:#fff;border:1px solid #e2e8f0;border-radius:8px;padding:6px;text-align:center"></div>'
    ].join('');

    var muIn = body.querySelector('#cs-sc-mu');
    var sigIn = body.querySelector('#cs-sc-sigma');
    var lowIn = body.querySelector('#cs-sc-lower');
    var upIn = body.querySelector('#cs-sc-upper');
    var resEl = body.querySelector('#cs-sc-result');
    var svgEl = body.querySelector('#cs-sc-svg');

    function calc(){
      var mu = parseFloat(muIn.value) || 0;
      var sigma = parseFloat(sigIn.value) || 1;
      var a = parseFloat(lowIn.value);
      var b = parseFloat(upIn.value);
      if(isNaN(a)) a = -Infinity;
      if(isNaN(b)) b = Infinity;

      var pA = a === -Infinity ? 0 : _normCdf(a, mu, sigma);
      var pB = b === Infinity ? 1 : _normCdf(b, mu, sigma);
      var prob = Math.max(0, pB - pA);

      var za = a === -Infinity ? '−∞' : ((a - mu) / sigma).toFixed(3);
      var zb = b === Infinity ? '+∞' : ((b - mu) / sigma).toFixed(3);

      resEl.innerHTML = 'P(' + (a===-Infinity?'-∞':a) + ' ≤ X ≤ ' + (b===Infinity?'+∞':b) + ') = <span style="color:#4f46e5">' + prob.toFixed(5) + '</span><br><span style="font-size:.75rem;font-weight:normal;color:#475569">z-scores: z_a = ' + za + ', z_b = ' + zb + '</span>';

      var W = 380, H = 140, pad = 24;
      var minX = mu - 3.5 * sigma, maxX = mu + 3.5 * sigma;
      function sx(x){ return pad + (x - minX) / (maxX - minX) * (W - 2 * pad); }
      function sy(y){ return H - pad - y * (H - 2 * pad) / 0.42; }

      var d = 'M';
      var dShade = 'M';
      var inShade = false;
      var steps = 80;
      for(var i = 0; i <= steps; i++){
        var curX = minX + i * (maxX - minX) / steps;
        var z = (curX - mu) / sigma;
        var curY = Math.exp(-0.5 * z * z) / Math.sqrt(2 * Math.PI);
        var px = sx(curX), py = sy(curY);
        d += (i === 0 ? '' : 'L') + px.toFixed(1) + ',' + py.toFixed(1);

        if(curX >= Math.max(minX, a) && curX <= Math.min(maxX, b)){
          if(!inShade){
            dShade += px.toFixed(1) + ',' + (H - pad) + ' L' + px.toFixed(1) + ',' + py.toFixed(1);
            inShade = true;
          } else {
            dShade += ' L' + px.toFixed(1) + ',' + py.toFixed(1);
          }
        } else if(inShade){
          dShade += ' L' + px.toFixed(1) + ',' + (H - pad);
          inShade = false;
        }
      }
      if(inShade) dShade += ' L' + sx(Math.min(maxX, b)).toFixed(1) + ',' + (H - pad);

      var svg = '<svg width="100%" height="130" viewBox="0 0 '+W+' '+H+'" style="display:block">';
      svg += '<line x1="'+pad+'" y1="'+(H-pad)+'" x2="'+(W-pad)+'" y2="'+(H-pad)+'" stroke="#94a3b8" stroke-width="1.5"/>';
      if(dShade.length > 5) svg += '<path d="'+dShade+' Z" fill="rgba(79,70,229,0.25)"/>';
      svg += '<path d="'+d+'" fill="none" stroke="#4f46e5" stroke-width="2"/>';

      if(a > minX && a < maxX){
        svg += '<line x1="'+sx(a).toFixed(1)+'" y1="'+(H-pad)+'" x2="'+sx(a).toFixed(1)+'" y2="'+pad+'" stroke="#d97706" stroke-width="1.5" stroke-dasharray="3,3"/>';
        svg += '<text x="'+sx(a).toFixed(1)+'" y="'+(H-pad+12)+'" font-size="8" font-weight="bold" fill="#d97706" text-anchor="middle">'+a+'</text>';
      }
      if(b > minX && b < maxX){
        svg += '<line x1="'+sx(b).toFixed(1)+'" y1="'+(H-pad)+'" x2="'+sx(b).toFixed(1)+'" y2="'+pad+'" stroke="#d97706" stroke-width="1.5" stroke-dasharray="3,3"/>';
        svg += '<text x="'+sx(b).toFixed(1)+'" y="'+(H-pad+12)+'" font-size="8" font-weight="bold" fill="#d97706" text-anchor="middle">'+b+'</text>';
      }
      svg += '<text x="'+sx(mu).toFixed(1)+'" y="'+(H-pad+12)+'" font-size="8" fill="#64748b" text-anchor="middle">μ='+mu+'</text>';
      svg += '</svg>';
      svgEl.innerHTML = svg;
    }

    [muIn, sigIn, lowIn, upIn].forEach(function(inp){ inp.oninput = calc; });
    calc();
  }

  function _renderInvNorm(body){
    body.innerHTML = [
      '<div style="background:#fff;padding:10px;border-radius:8px;border:1px solid #e2e8f0;margin-bottom:10px">',
        '<div style="font-weight:700;font-size:.82rem;margin-bottom:8px;color:#1e3a8a">Inverse Normal (invNorm)</div>',
        '<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:8px">',
          '<label style="font-size:.75rem;color:#64748b">Area / Prob (p):<br><input type="number" id="cs-sc-in-p" value="0.95" min="0.0001" max="0.9999" step="0.01" style="width:100%;padding:4px 6px;border:1px solid #cbd5e1;border-radius:4px;font-size:.8rem;box-sizing:border-box"></label>',
          '<label style="font-size:.75rem;color:#64748b">Tail Position:<br><select id="cs-sc-in-tail" style="width:100%;padding:4px 6px;border:1px solid #cbd5e1;border-radius:4px;font-size:.8rem;box-sizing:border-box"><option value="left">Left (X ≤ k)</option><option value="right">Right (X ≥ k)</option></select></label>',
        '</div>',
        '<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">',
          '<label style="font-size:.75rem;color:#64748b">Mean (μ):<br><input type="number" id="cs-sc-in-mu" value="0" step="any" style="width:100%;padding:4px 6px;border:1px solid #cbd5e1;border-radius:4px;font-size:.8rem;box-sizing:border-box"></label>',
          '<label style="font-size:.75rem;color:#64748b">Std Dev (σ):<br><input type="number" id="cs-sc-in-sigma" value="1" min="0.0001" step="any" style="width:100%;padding:4px 6px;border:1px solid #cbd5e1;border-radius:4px;font-size:.8rem;box-sizing:border-box"></label>',
        '</div>',
      '</div>',
      '<div id="cs-sc-in-res" style="background:#e0e7ff;border:1px solid #c7d2fe;padding:10px;border-radius:8px;margin-bottom:10px;font-family:monospace;font-size:.9rem;font-weight:700;color:#1e1b4b;text-align:center"></div>'
    ].join('');

    var pIn = body.querySelector('#cs-sc-in-p');
    var tailIn = body.querySelector('#cs-sc-in-tail');
    var muIn = body.querySelector('#cs-sc-in-mu');
    var sigIn = body.querySelector('#cs-sc-in-sigma');
    var resEl = body.querySelector('#cs-sc-in-res');

    function calc(){
      var p = parseFloat(pIn.value) || 0.5;
      var tail = tailIn.value;
      var mu = parseFloat(muIn.value) || 0;
      var sigma = parseFloat(sigIn.value) || 1;

      var effP = tail === 'right' ? (1 - p) : p;
      var val = _invNorm(effP, mu, sigma);
      var z = (val - mu) / sigma;

      resEl.innerHTML = 'Value k = <span style="color:#4f46e5">' + val.toFixed(4) + '</span><br><span style="font-size:.75rem;font-weight:normal;color:#475569">z-score: z = ' + z.toFixed(3) + '</span>';
    }

    [pIn, tailIn, muIn, sigIn].forEach(function(inp){ inp.oninput = calc; inp.onchange = calc; });
    calc();
  }

  function _renderBinom(body){
    body.innerHTML = [
      '<div style="background:#fff;padding:10px;border-radius:8px;border:1px solid #e2e8f0;margin-bottom:10px">',
        '<div style="font-weight:700;font-size:.82rem;margin-bottom:8px;color:#1e3a8a">Binomial Distribution: X ~ B(n, p)</div>',
        '<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px">',
          '<label style="font-size:.75rem;color:#64748b">Trials (n):<br><input type="number" id="cs-sc-bn-n" value="10" min="1" max="500" style="width:100%;padding:4px 6px;border:1px solid #cbd5e1;border-radius:4px;font-size:.8rem;box-sizing:border-box"></label>',
          '<label style="font-size:.75rem;color:#64748b">Prob (p):<br><input type="number" id="cs-sc-bn-p" value="0.5" min="0" max="1" step="0.05" style="width:100%;padding:4px 6px;border:1px solid #cbd5e1;border-radius:4px;font-size:.8rem;box-sizing:border-box"></label>',
          '<label style="font-size:.75rem;color:#64748b">Successes (k):<br><input type="number" id="cs-sc-bn-k" value="5" min="0" style="width:100%;padding:4px 6px;border:1px solid #cbd5e1;border-radius:4px;font-size:.8rem;box-sizing:border-box"></label>',
        '</div>',
      '</div>',
      '<div id="cs-sc-bn-res" style="background:#e0e7ff;border:1px solid #c7d2fe;padding:10px;border-radius:8px;margin-bottom:10px;font-family:monospace;font-size:.85rem;color:#1e1b4b;line-height:1.6"></div>'
    ].join('');

    var nIn = body.querySelector('#cs-sc-bn-n');
    var pIn = body.querySelector('#cs-sc-bn-p');
    var kIn = body.querySelector('#cs-sc-bn-k');
    var resEl = body.querySelector('#cs-sc-bn-res');

    function calc(){
      var n = parseInt(nIn.value, 10) || 10;
      var p = parseFloat(pIn.value);
      if(isNaN(p)) p = 0.5;
      var k = parseInt(kIn.value, 10);
      if(isNaN(k)) k = 0;

      var pdf = _binomPdf(n, p, k);
      var cdfLe = 0;
      for(var i = 0; i <= k; i++) cdfLe += _binomPdf(n, p, i);
      var cdfGe = 1 - cdfLe + pdf;
      var mu = n * p;
      var variance = n * p * (1 - p);

      resEl.innerHTML = '<strong>P(X = ' + k + ')</strong> = <span style="color:#4f46e5;font-weight:bold">' + pdf.toFixed(5) + '</span><br>' +
        '<strong>P(X ≤ ' + k + ')</strong> = ' + Math.min(1, cdfLe).toFixed(5) + '<br>' +
        '<strong>P(X ≥ ' + k + ')</strong> = ' + Math.max(0, cdfGe).toFixed(5) + '<br>' +
        '<span style="font-size:.75rem;color:#475569">Mean μ = ' + mu.toFixed(2) + ' · Var σ² = ' + variance.toFixed(2) + ' · SD σ = ' + Math.sqrt(variance).toFixed(2) + '</span>';
    }

    [nIn, pIn, kIn].forEach(function(inp){ inp.oninput = calc; });
    calc();
  }

  function _renderPoisson(body){
    body.innerHTML = [
      '<div style="background:#fff;padding:10px;border-radius:8px;border:1px solid #e2e8f0;margin-bottom:10px">',
        '<div style="font-weight:700;font-size:.82rem;margin-bottom:8px;color:#1e3a8a">Poisson Distribution: X ~ Po(λ)</div>',
        '<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">',
          '<label style="font-size:.75rem;color:#64748b">Rate (λ):<br><input type="number" id="cs-sc-ps-lam" value="2.5" min="0.0001" step="0.5" style="width:100%;padding:4px 6px;border:1px solid #cbd5e1;border-radius:4px;font-size:.8rem;box-sizing:border-box"></label>',
          '<label style="font-size:.75rem;color:#64748b">Occurrences (k):<br><input type="number" id="cs-sc-ps-k" value="2" min="0" style="width:100%;padding:4px 6px;border:1px solid #cbd5e1;border-radius:4px;font-size:.8rem;box-sizing:border-box"></label>',
        '</div>',
      '</div>',
      '<div id="cs-sc-ps-res" style="background:#e0e7ff;border:1px solid #c7d2fe;padding:10px;border-radius:8px;margin-bottom:10px;font-family:monospace;font-size:.85rem;color:#1e1b4b;line-height:1.6"></div>'
    ].join('');

    var lamIn = body.querySelector('#cs-sc-ps-lam');
    var kIn = body.querySelector('#cs-sc-ps-k');
    var resEl = body.querySelector('#cs-sc-ps-res');

    function calc(){
      var lambda = parseFloat(lamIn.value) || 1;
      var k = parseInt(kIn.value, 10);
      if(isNaN(k)) k = 0;

      var pdf = _poissonPdf(lambda, k);
      var cdfLe = 0;
      for(var i = 0; i <= k; i++) cdfLe += _poissonPdf(lambda, i);
      var cdfGe = 1 - cdfLe + pdf;

      resEl.innerHTML = '<strong>P(X = ' + k + ')</strong> = <span style="color:#4f46e5;font-weight:bold">' + pdf.toFixed(5) + '</span><br>' +
        '<strong>P(X ≤ ' + k + ')</strong> = ' + Math.min(1, cdfLe).toFixed(5) + '<br>' +
        '<strong>P(X ≥ ' + k + ')</strong> = ' + Math.max(0, cdfGe).toFixed(5) + '<br>' +
        '<span style="font-size:.75rem;color:#475569">Mean μ = ' + lambda + ' · Var σ² = ' + lambda + ' · SD σ = ' + Math.sqrt(lambda).toFixed(2) + '</span>';
    }

    [lamIn, kIn].forEach(function(inp){ inp.oninput = calc; });
    calc();
  }

  function _setupThemeObserver(){
    if(_themeObserver) return;
    try {
      _themeObserver = new MutationObserver(function(){
        if(_apiCalc && typeof _apiCalc.updateSettings === 'function'){
          _apiCalc.updateSettings({ invertedColors: _isDarkMode() });
        }
      });
      _themeObserver.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['data-theme', 'class']
      });
    } catch(e){}
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

    var presetsBar = _calcEl.querySelector('#cs-fcalc-presets-bar');
    if(presetsBar){
      presetsBar.style.display = (mode === 'graphing' && !_isMinimized) ? 'flex' : 'none';
    }

    var apiBox = _calcEl.querySelector('#cs-fcalc-api-box');
    var frame = _calcEl.querySelector('#cs-fcalc-frame');
    var statsEl = _calcEl.querySelector('#cs-fcalc-stats');

    if(mode === 'distributions'){
      if(apiBox) apiBox.style.display = 'none';
      if(frame) frame.style.display = 'none';
      if(statsEl){
        statsEl.style.display = 'block';
        _renderStatsUI(statsEl);
      }
      return;
    }

    if(statsEl) statsEl.style.display = 'none';

    _ensureDesmosAPI().then(function(Desmos){
      if(!apiBox) return;
      apiBox.style.display = 'block';
      if(frame) frame.style.display = 'none';

      if(_apiCalc && _apiMode === mode){
        if(typeof _apiCalc.resize === 'function') _apiCalc.resize();
        return;
      }

      if(_apiCalc && typeof _apiCalc.destroy === 'function'){
        try { _apiCalc.destroy(); } catch(e){}
      }
      _apiCalc = null;
      apiBox.innerHTML = '';

      var dark = _isDarkMode();
      if(mode === 'graphing'){
        _apiCalc = Desmos.GraphingCalculator(apiBox, {
          keypad: true,
          expressions: true,
          settingsMenu: true,
          zoomButtons: true,
          expressionsTopbar: true,
          pointsOfInterest: true,
          trace: true,
          border: false,
          invertedColors: dark
        });
      } else if(mode === 'scientific' && typeof Desmos.ScientificCalculator === 'function'){
        _apiCalc = Desmos.ScientificCalculator(apiBox, {
          keypad: true,
          border: false,
          invertedColors: dark
        });
      } else if(mode === 'fourFunction' && typeof Desmos.FourFunctionCalculator === 'function'){
        _apiCalc = Desmos.FourFunctionCalculator(apiBox, {
          keypad: true,
          border: false,
          invertedColors: dark
        });
      } else {
        _apiCalc = Desmos.GraphingCalculator(apiBox, {
          keypad: true,
          expressions: true,
          invertedColors: dark
        });
      }
      _apiMode = mode;
      _setupThemeObserver();
      setTimeout(function(){
        if(_apiCalc && typeof _apiCalc.resize === 'function') _apiCalc.resize();
      }, 50);
    }).catch(function(){
      // Fallback to iframe if API CDN failed or offline
      if(apiBox) apiBox.style.display = 'none';
      if(frame){
        frame.style.display = 'block';
        var targetSrc = MODES[mode].url;
        if(frame.src !== targetSrc) frame.src = targetSrc;
      }
    });
  }

  function _toggleMaximize(){
    if(_isMinimized) _toggleMinimize();
    var maxBtn = _calcEl.querySelector('#cs-fcalc-max-btn');
    if(_isMaximized){
      // Restore
      if(_savedBounds){
        _calcEl.style.width = _savedBounds.width;
        _calcEl.style.height = _savedBounds.height;
        _calcEl.style.left = _savedBounds.left;
        _calcEl.style.top = _savedBounds.top;
        _calcEl.style.right = _savedBounds.right;
      }
      if(maxBtn) { maxBtn.textContent = '⛶'; maxBtn.title = 'Expand'; }
      _isMaximized = false;
    } else {
      // Maximize / Expand
      _savedBounds = {
        width: _calcEl.style.width || '560px',
        height: _calcEl.style.height || '600px',
        left: _calcEl.style.left || '',
        top: _calcEl.style.top || '',
        right: _calcEl.style.right || '24px'
      };
      var maxW = Math.min(880, Math.floor(window.innerWidth * 0.94));
      var maxH = Math.min(720, Math.floor(window.innerHeight * 0.88));
      var left = Math.max(12, Math.floor((window.innerWidth - maxW) / 2));
      var top = Math.max(20, Math.floor((window.innerHeight - maxH) / 2));
      _calcEl.style.right = 'auto';
      _calcEl.style.left = left + 'px';
      _calcEl.style.top = top + 'px';
      _calcEl.style.width = maxW + 'px';
      _calcEl.style.height = maxH + 'px';
      if(maxBtn) { maxBtn.textContent = '❐'; maxBtn.title = 'Restore'; }
      _isMaximized = true;
    }
    setTimeout(function(){
      if(_apiCalc && typeof _apiCalc.resize === 'function') _apiCalc.resize();
    }, 60);
  }

  function _toggleMinimize(){
    var body = _calcEl.querySelector('#cs-fcalc-body');
    var presetsBar = _calcEl.querySelector('#cs-fcalc-presets-bar');
    var minBtn = _calcEl.querySelector('#cs-fcalc-min-btn');
    _isMinimized = !_isMinimized;
    if(_isMinimized){
      if(body) body.style.display = 'none';
      if(presetsBar) presetsBar.style.display = 'none';
      _calcEl.style.height = 'auto';
      _calcEl.style.minHeight = '0';
      _calcEl.style.resize = 'none';
      if(minBtn) { minBtn.textContent = '▢'; minBtn.title = 'Restore'; }
    } else {
      if(body) body.style.display = 'block';
      if(presetsBar && _activeMode === 'graphing') presetsBar.style.display = 'flex';
      _calcEl.style.height = _isMaximized ? Math.min(720, Math.floor(window.innerHeight * 0.88)) + 'px' : '600px';
      _calcEl.style.minHeight = '300px';
      _calcEl.style.resize = 'both';
      if(minBtn) { minBtn.textContent = '_'; minBtn.title = 'Minimize'; }
      setTimeout(function(){
        if(_apiCalc && typeof _apiCalc.resize === 'function') _apiCalc.resize();
      }, 60);
    }
  }

  function _makeHeaderDraggable(container, handle){
    var startX = 0, startY = 0, initLeft = 0, initTop = 0;
    var dragging = false;
    var shield = container.querySelector('#cs-fcalc-shield');

    function onPointerDown(e){
      if(e.target.tagName === 'BUTTON' || e.target.closest('button')) return;
      dragging = true;
      if(shield) shield.style.display = 'block';
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
      if(shield) shield.style.display = 'none';
      document.removeEventListener('mousemove', onPointerMove);
      document.removeEventListener('mouseup', onPointerUp);
      document.removeEventListener('touchmove', onPointerMove);
      document.removeEventListener('touchend', onPointerUp);
    }

    handle.addEventListener('mousedown', onPointerDown);
    handle.addEventListener('touchstart', onPointerDown, { passive: false });
  }

  var _calcLocked = false;
  var _calcLockReason = '';

  function _showCalcLockedToast(reason){
    var isAr = document.documentElement.lang === 'ar';
    var msg = isAr
      ? '🚫 الآلة الحاسبة مقفلة: غير مسموح بالآلة الحاسبة في هذا الاختبار.'
      : '🚫 Calculator Locked: No calculator permitted for this examination.';
    if(reason){
      msg += ' (' + reason + ')';
    }
    var existingToast = document.getElementById('calc-locked-toast');
    if(existingToast) existingToast.remove();
    var toast = document.createElement('div');
    toast.id = 'calc-locked-toast';
    toast.style.cssText = 'position:fixed;bottom:24px;left:50%;transform:translateX(-50%);background:#1e293b;color:#f8fafc;padding:10px 18px;border-radius:10px;font-size:0.88rem;font-weight:600;box-shadow:0 8px 24px rgba(0,0,0,0.3);z-index:99999;border:1px solid #475569;display:flex;align-items:center;gap:8px;transition:opacity 0.3s ease;';
    toast.textContent = msg;
    document.body.appendChild(toast);
    setTimeout(function(){
      if(toast && toast.parentElement){
        toast.style.opacity = '0';
        setTimeout(function(){ if(toast.parentElement) toast.remove(); }, 300);
      }
    }, 3000);
  }

  window.setFloatingCalcLocked = function(locked, reason){
    _calcLocked = !!locked;
    _calcLockReason = reason || '';
    if(_calcLocked && _calcEl && _calcEl.style.display !== 'none'){
      window.closeFloatingCalc();
    }
  };

  window.isFloatingCalcLocked = function(){
    return _calcLocked;
  };

  window.openFloatingCalc = function(mode){
    if(_calcLocked){
      _showCalcLockedToast(_calcLockReason);
      return;
    }
    var el = _buildCalcDOM();
    if(mode && MODES[mode]){
      _switchMode(mode);
    } else {
      _switchMode(_activeMode);
    }
    el.style.display = 'flex';
    setTimeout(function(){
      if(_apiCalc && typeof _apiCalc.resize === 'function') _apiCalc.resize();
    }, 50);
  };

  window.closeFloatingCalc = function(){
    if(_calcEl){
      _calcEl.style.display = 'none';
    }
  };

  window.toggleFloatingCalc = function(mode){
    if(_calcLocked){
      _showCalcLockedToast(_calcLockReason);
      return;
    }
    var el = _buildCalcDOM();
    if(el.style.display === 'flex'){
      window.closeFloatingCalc();
    } else {
      window.openFloatingCalc(mode);
    }
  };

  window.setFloatingCalcExpression = function(latex, id, color){
    if(_calcLocked){
      _showCalcLockedToast(_calcLockReason);
      return;
    }
    window.openFloatingCalc('graphing');
    if(_apiCalc && typeof _apiCalc.setExpression === 'function'){
      _apiCalc.setExpression({
        id: id || ('expr_' + Date.now()),
        latex: latex,
        color: color || '#2563eb'
      });
    }
  };

  window.clearFloatingCalc = function(){
    if(_apiCalc && typeof _apiCalc.setBlank === 'function'){
      _apiCalc.setBlank();
    }
  };

  window.getFloatingCalcInstance = function(){
    return _apiCalc;
  };

  // Keyboard shortcut: Alt + C toggles the floating calculator
  document.addEventListener('keydown', function(e){
    if(e.altKey && (e.key === 'c' || e.key === 'C')){
      if(_calcLocked){
        _showCalcLockedToast(_calcLockReason);
        e.preventDefault();
        return;
      }
      window.toggleFloatingCalc();
      e.preventDefault();
    }
  });

})();
