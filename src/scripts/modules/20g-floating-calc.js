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
      'top:80px',
      'right:24px',
      'width:450px',
      'height:550px',
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
        '<div style="display:flex;gap:3px;margin-left:auto;background:rgba(0,0,0,.2);padding:2px 4px;border-radius:6px">',
          '<button type="button" class="cs-fcalc-tab" data-mode="graphing" style="background:rgba(255,255,255,.2);color:#fff;border:none;border-radius:4px;padding:3px 7px;font-size:.72rem;font-weight:600;cursor:pointer">Graphing</button>',
          '<button type="button" class="cs-fcalc-tab" data-mode="scientific" style="background:transparent;color:rgba(255,255,255,.8);border:none;border-radius:4px;padding:3px 7px;font-size:.72rem;font-weight:600;cursor:pointer">Scientific</button>',
          '<button type="button" class="cs-fcalc-tab" data-mode="fourFunction" style="background:transparent;color:rgba(255,255,255,.8);border:none;border-radius:4px;padding:3px 7px;font-size:.72rem;font-weight:600;cursor:pointer">Quick</button>',
          '<button type="button" class="cs-fcalc-tab" data-mode="distributions" style="background:transparent;color:rgba(255,255,255,.8);border:none;border-radius:4px;padding:3px 7px;font-size:.72rem;font-weight:600;cursor:pointer">📊 Stats</button>',
        '</div>',
        '<button type="button" id="cs-fcalc-min-btn" aria-label="Minimize" style="background:transparent;border:none;color:#fff;font-size:.95rem;padding:2px 6px;cursor:pointer;opacity:.85;margin-left:4px">_</button>',
        '<button type="button" id="cs-fcalc-close-btn" aria-label="Close" style="background:transparent;border:none;color:#fff;font-size:1.1rem;padding:2px 6px;cursor:pointer;opacity:.85">&times;</button>',
      '</div>',
      '<div id="cs-fcalc-body" style="flex:1;position:relative;background:#f8fafc;width:100%;height:100%;overflow:hidden">',
        '<iframe id="cs-fcalc-frame" title="Desmos Calculator" style="width:100%;height:100%;border:none;display:block" src="about:blank"></iframe>',
        '<div id="cs-fcalc-stats" style="display:none;width:100%;height:100%;overflow-y:auto;padding:12px;box-sizing:border-box;background:#f8fafc;font-size:.85rem;color:#1e293b"></div>',
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

      // Draw SVG bell curve
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
    var statsEl = _calcEl.querySelector('#cs-fcalc-stats');
    if(mode === 'distributions'){
      if(frame) frame.style.display = 'none';
      if(statsEl){
        statsEl.style.display = 'block';
        _renderStatsUI(statsEl);
      }
    } else {
      if(statsEl) statsEl.style.display = 'none';
      if(frame){
        frame.style.display = 'block';
        var targetSrc = MODES[mode].url;
        if(frame.src !== targetSrc){
          frame.src = targetSrc;
        }
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
