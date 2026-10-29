/* ═══════════════════════════════════════════════════════════════════════════
   02a2-universal-graph-explorers.js — Universal Interactive Graph Explorers
   Provides reusable, DPR-crisp, pointer-draggable, theme-aware HTML5 Canvas
   explorers across all curriculum tracks:
     1. window.CSMountSixTrigExplorer      — All 6 Trigonometric Ratios
     2. window.CSMountSixInvTrigExplorer   — All 6 Inverse Trigonometric Functions
     3. window.CSMountSlopeFieldExplorer   — Interactive Slope Field, RK4 & Euler Lab
     4. window.CSEnhanceStaticSlopeFields  — Auto-interactive enhancer for slope_field figures
     5. window.CSMountMainFunctionsExplorer— All 9+ Main Parent Functions & Transformations
     6. window.CSMountHyperbolicExplorer   — All 6 Hyperbolic & Inverse Hyperbolic Functions
   ═══════════════════════════════════════════════════════════════════════════ */
(function(){
  "use strict";

  function getKit(){ return window.CSExplorerKit || null; }

  function bindCssDrag(canvas, onPoint, opts){
    if(!canvas) return;
    opts = opts || {};
    var active = false;
    canvas.style.touchAction = 'none';
    canvas.style.cursor = 'crosshair';
    function cssPos(e){
      var r = canvas.getBoundingClientRect();
      return { x: e.clientX - r.left, y: e.clientY - r.top, w: r.width || 1, h: r.height || 1 };
    }
    canvas.addEventListener('pointerdown', function(e){
      active = true;
      try { canvas.setPointerCapture(e.pointerId); } catch(_){}
      var p = cssPos(e);
      onPoint(p.x, p.y, p.w, p.h, true);
    });
    canvas.addEventListener('pointermove', function(e){
      if(!active) return;
      var p = cssPos(e);
      onPoint(p.x, p.y, p.w, p.h, false);
    });
    function up(e){
      if(!active) return;
      active = false;
      try { canvas.releasePointerCapture(e.pointerId); } catch(_){}
    }
    canvas.addEventListener('pointerup', up);
    canvas.addEventListener('pointercancel', up);
    if(opts.onDblClick){
      canvas.addEventListener('dblclick', function(e){
        var p = cssPos(e);
        opts.onDblClick(p.x, p.y, p.w, p.h);
      });
    }
  }

  /* ═══════════════════════════════════════════════════════════════════════
     1. ALL 6 TRIGONOMETRIC RATIOS EXPLORER
        sin, cos, tan, csc, sec, cot — Unit Circle + Wave Graph y = A*trig(B*theta)
     ═══════════════════════════════════════════════════════════════════════ */
  window.CSMountSixTrigExplorer = function(cfg){
    var K = getKit(); if(!K || !cfg) return;
    var pfx = cfg.prefix || (cfg.canvasId ? cfg.canvasId.replace(/Canvas$/, '') : '');
    var canvas = document.getElementById(cfg.canvasId || (pfx + 'Canvas'));
    if(!canvas || canvas._csMountedTrig6) return;
    canvas._csMountedTrig6 = true;

    var sFn = document.getElementById(pfx + 'Fn');
    var sTheta = document.getElementById(pfx + 'Theta');
    var sAmp = document.getElementById(pfx + 'Amp');
    var sFreq = document.getElementById(pfx + 'Freq');
    var dataBtn = document.getElementById(cfg.dataBtnId || (pfx + 'DataBtn'));
    var dataPanel = document.getElementById(pfx + 'DataPanel');
    var dataDesc = document.getElementById(pfx + 'DataDesc');
    var dataRows = document.getElementById(pfx + 'DataRows');
    K.wireDataToggle(dataBtn, dataPanel);

    var fnKey = (sFn && sFn.value) || cfg.defaultFn || 'sin';
    var thetaDeg = sTheta ? parseFloat(sTheta.value) : 60;
    var amp = sAmp ? parseFloat(sAmp.value) : 1;
    var freq = sFreq ? parseFloat(sFreq.value) : 1;
    var TEAL = '#0d9488', ROSE = '#e11d48';
    var lastSplitX = 220, lastPuc = null, lastPw = null;

    var chApi = K.attachChallenge(canvas, {
      prompt: cfg.challengePrompt || {
        en: 'Explore all 6 ratios: switch to tan θ, csc θ, sec θ, or cot θ and drag θ to an asymptote (e.g. 90° or 180°), or set θ = 45° where sin θ = cos θ and tan θ = cot θ = 1.',
        ar: 'استكشف النسب المثلثية الست جميعاً: انتقل إلى tan θ أو csc θ أو sec θ أو cot θ وحرّك الزاوية θ نحو خط تقارب رأسي (مثل 90° أو 180°)، أو اضبط θ = 45° حيث يتساوى الجيب وجيب التمام ويصبح tan θ = cot θ = 1.'
      },
      check: function(st){
        return (st.fnKey !== 'sin' && Math.abs(st.thetaDeg) === 45) ||
               ((st.fnKey === 'csc' || st.fnKey === 'sec' || st.fnKey === 'cot') && Math.abs(st.thetaDeg % 90) === 0);
      }
    });

    function evalSix(rad){
      var s = Math.sin(rad), c = Math.cos(rad);
      var zSin = Math.abs(s) < 1e-5, zCos = Math.abs(c) < 1e-5;
      return {
        sin: zSin ? 0 : s,
        cos: zCos ? 0 : c,
        tan: zCos ? NaN : (zSin ? 0 : s / c),
        csc: zSin ? NaN : 1 / s,
        sec: zCos ? NaN : 1 / c,
        cot: zSin ? NaN : (zCos ? 0 : c / s)
      };
    }

    function fmtRatio(v){
      return (v === null || isNaN(v) || !isFinite(v)) ? 'undefined' : K.fmt(v, 3);
    }

    function updateDataView(){
      var rad = thetaDeg * Math.PI / 180;
      var effRad = freq * rad;
      var cur = evalSix(effRad);
      if(dataDesc){
        dataDesc.textContent = 'Active angle θ = ' + thetaDeg + '° (' + K.fmt(rad, 3) + ' rad), amplitude A = ' + K.fmt(amp, 2) + ', frequency B = ' + K.fmt(freq, 2) + '. ' +
          'Base ratios at Bθ: sin = ' + fmtRatio(cur.sin) + ', cos = ' + fmtRatio(cur.cos) + ', tan = ' + fmtRatio(cur.tan) +
          ', csc = ' + fmtRatio(cur.csc) + ', sec = ' + fmtRatio(cur.sec) + ', cot = ' + fmtRatio(cur.cot) + '.';
      }
      if(dataRows){
        var samples = [0, 30, 45, 60, 90, 120, 135, 150, 180, 270, 360];
        if(samples.indexOf(thetaDeg) === -1) samples.unshift(thetaDeg);
        var rows = [];
        for(var i = 0; i < samples.length; i++){
          var d = samples[i], r = freq * d * Math.PI / 180, v = evalSix(r);
          rows.push([
            d + '° (' + K.fmt(d * Math.PI / 180, 2) + ' rad)',
            fmtRatio(amp * v.sin), fmtRatio(amp * v.cos), fmtRatio(amp * v.tan),
            fmtRatio(amp * v.csc), fmtRatio(amp * v.sec), fmtRatio(amp * v.cot)
          ]);
        }
        K.renderDataRows(dataRows, rows);
      }
    }

    function draw(ctx, w, h){
      var C = K.colors();
      ctx.clearRect(0, 0, w, h);
      var splitX = Math.round(w * 0.38);
      lastSplitX = splitX;

      /* LEFT PANE: UNIT CIRCLE GEOMETRY */
      var padL = {l: 16, r: Math.max(12, w - splitX + 6), t: 22, b: 24};
      var viewUC = K._fitView(-1.55, 1.55, -1.55, 1.55, w, h, padL);
      var Puc = new K.Plot(ctx, w, h, viewUC, padL);
      lastPuc = Puc;

      ctx.save();
      ctx.beginPath();
      ctx.rect(padL.l, padL.t, w - padL.l - padL.r, h - padL.t - padL.b);
      ctx.clip();

      Puc.segment(viewUC.xmin, 0, viewUC.xmax, 0, C.AXIS, 1);
      Puc.segment(0, viewUC.ymin, 0, viewUC.ymax, C.AXIS, 1);

      ctx.beginPath();
      for(var i = 0; i <= 120; i++){
        var a = 2 * Math.PI * i / 120;
        var ux = Puc.X(Math.cos(a)), uy = Puc.Y(Math.sin(a));
        if(i === 0) ctx.moveTo(ux, uy); else ctx.lineTo(ux, uy);
      }
      ctx.closePath();
      ctx.lineWidth = 1.6;
      ctx.strokeStyle = '#94a3b8';
      ctx.stroke();

      var rad = thetaDeg * Math.PI / 180;
      var effRad = freq * rad;
      var ucVals = evalSix(rad);
      var vals = evalSix(effRad);
      var cx = ucVals.cos, cy = ucVals.sin;

      Puc.segment(0, 0, cx, 0, C.INDIGO, 2.8);
      Puc.segment(cx, 0, cx, cy, C.AMBER2, 2.8);
      Puc.segment(0, 0, cx, cy, C.INK, 2.2);

      if((fnKey === 'tan' || fnKey === 'sec') && isFinite(ucVals.tan)){
        var sgnX = cx >= 0 ? 1 : -1;
        var ty = ucVals.tan * sgnX;
        Puc.segment(sgnX, -3, sgnX, 3, C.LINE, 1, [3, 3]);
        Puc.segment(sgnX, 0, sgnX, ty, TEAL, 3.0);
        Puc.segment(0, 0, sgnX, ty, C.INDIGO2, 1.8, [4, 3]);
        Puc.dot(sgnX, ty, TEAL, 4.5);
      } else if((fnKey === 'cot' || fnKey === 'csc') && isFinite(ucVals.cot)){
        var sgnY = cy >= 0 ? 1 : -1;
        var cotX = ucVals.cot * sgnY;
        Puc.segment(-3, sgnY, 3, sgnY, C.LINE, 1, [3, 3]);
        Puc.segment(0, sgnY, cotX, sgnY, TEAL, 3.0);
        Puc.segment(0, 0, cotX, sgnY, C.AMBER2, 1.8, [4, 3]);
        Puc.dot(cotX, sgnY, TEAL, 4.5);
      }

      Puc.dot(cx, cy, C.INK, 5.2);
      ctx.restore();

      ctx.font = C.FONT;
      ctx.fillStyle = C.MUTED;
      ctx.textAlign = 'left';
      ctx.textBaseline = 'top';
      ctx.fillText('Unit Circle (drag θ)', padL.l + 2, 4);

      ctx.save();
      ctx.strokeStyle = C.LINE;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(splitX, 8);
      ctx.lineTo(splitX, h - 8);
      ctx.stroke();
      ctx.restore();

      /* RIGHT PANE: CARTESIAN WAVE GRAPH y = A * f(B * theta) */
      var padR = {l: splitX + 30, r: 14, t: 22, b: 24};
      var ymaxW = Math.max(3.5, Math.abs(amp) * 2.2);
      var viewW = {xmin: -2 * Math.PI, xmax: 2 * Math.PI, ymin: -ymaxW, ymax: ymaxW};
      var Pw = new K.Plot(ctx, w, h, viewW, padR);
      lastPw = Pw;

      ctx.save();
      ctx.beginPath();
      ctx.rect(padR.l, padR.t, w - padR.l - padR.r, h - padR.t - padR.b);
      ctx.clip();

      for(var gy = -Math.floor(ymaxW); gy <= Math.floor(ymaxW); gy++){
        Pw.segment(viewW.xmin, gy, viewW.xmax, gy, gy === 0 ? C.AXIS : C.GRID, gy === 0 ? 1.2 : 1);
      }
      for(var k = -4; k <= 4; k++){
        var gx = k * Math.PI / 2;
        Pw.segment(gx, viewW.ymin, gx, viewW.ymax, k === 0 ? C.AXIS : C.GRID, k === 0 ? 1.2 : 1);
      }

      if(fnKey === 'csc'){
        Pw.curve(function(x){ return amp * Math.sin(freq * x); }, '#94a3b8', 1.4, [4, 4]);
      } else if(fnKey === 'sec'){
        Pw.curve(function(x){ return amp * Math.cos(freq * x); }, '#94a3b8', 1.4, [4, 4]);
      }

      /* Vertical asymptotes for tan, sec, csc, cot */
      var bf = Math.max(0.25, Math.abs(freq));
      if(fnKey === 'tan' || fnKey === 'sec'){
        for(var m1 = -9; m1 <= 9; m1 += 2){
          var ax1 = (m1 * Math.PI / 2) / bf;
          if(ax1 >= viewW.xmin && ax1 <= viewW.xmax) Pw.vline(ax1, ROSE, [5, 4]);
        }
      } else if(fnKey === 'csc' || fnKey === 'cot'){
        for(var m2 = -8; m2 <= 8; m2 += 2){
          var ax2 = (m2 * Math.PI / 2) / bf;
          if(ax2 >= viewW.xmin && ax2 <= viewW.xmax) Pw.vline(ax2, ROSE, [5, 4]);
        }
      }

      var fWave = function(x){
        var s = Math.sin(freq * x), co = Math.cos(freq * x);
        if(fnKey === 'sin') return amp * s;
        if(fnKey === 'cos') return amp * co;
        if(fnKey === 'tan') return Math.abs(co) < 0.055 ? NaN : amp * (s / co);
        if(fnKey === 'csc') return Math.abs(s) < 0.055 ? NaN : amp / s;
        if(fnKey === 'sec') return Math.abs(co) < 0.055 ? NaN : amp / co;
        if(fnKey === 'cot') return Math.abs(s) < 0.055 ? NaN : amp * (co / s);
        return amp * s;
      };
      Pw.curve(fWave, C.INDIGO, 2.6);

      Pw.vline(rad, 'rgba(200,144,42,0.55)', [4, 3]);
      var activeY = isFinite(vals[fnKey]) ? amp * vals[fnKey] : NaN;
      if(isFinite(activeY) && activeY >= viewW.ymin && activeY <= viewW.ymax){
        Pw.segment(rad, 0, rad, activeY, C.AMBER2, 2.2);
        Pw.dot(rad, activeY, C.AMBER2, 5.8);
      }
      ctx.restore();

      ctx.font = C.FONT;
      ctx.fillStyle = C.MUTED;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'top';
      var piTicks = [
        {x: -2*Math.PI, lbl: '−2π'}, {x: -Math.PI, lbl: '−π'},
        {x: 0, lbl: '0'}, {x: Math.PI, lbl: 'π'}, {x: 2*Math.PI, lbl: '2π'}
      ];
      for(var ti = 0; ti < piTicks.length; ti++){
        ctx.fillText(piTicks[ti].lbl, Pw.X(piTicks[ti].x), h - padR.b + 5);
      }
      ctx.textAlign = 'left';
      ctx.fillStyle = C.INDIGO;
      var aStr = (amp === 1 ? '' : (amp === -1 ? '−' : K.fmt(amp, 2) + '·'));
      var bStr = (freq === 1 ? 'θ' : K.fmt(freq, 2) + 'θ');
      var perStr = (fnKey === 'tan' || fnKey === 'cot')
        ? (freq === 1 ? 'π' : K.fmt(Math.PI / Math.abs(freq), 2))
        : (freq === 1 ? '2π' : K.fmt(2 * Math.PI / Math.abs(freq), 2));
      ctx.fillText('y = ' + aStr + fnKey + '(' + bStr + ')  [Period ' + perStr + ']', padR.l, 4);

      K._set(pfx + 'ThetaV', thetaDeg + '°');
      if(sAmp) K._set(pfx + 'AmpV', K.fmt(amp, 2));
      if(sFreq) K._set(pfx + 'FreqV', K.fmt(freq, 2));
      K._set(pfx + 'Sin', fmtRatio(amp * vals.sin));
      K._set(pfx + 'Cos', fmtRatio(amp * vals.cos));
      K._set(pfx + 'Tan', fmtRatio(amp * vals.tan));
      K._set(pfx + 'Csc', fmtRatio(amp * vals.csc));
      K._set(pfx + 'Sec', fmtRatio(amp * vals.sec));
      K._set(pfx + 'Cot', fmtRatio(amp * vals.cot));
      updateDataView();
      if(chApi) chApi.check({fnKey: fnKey, thetaDeg: thetaDeg, amp: amp, freq: freq});
    }

    K.register(canvas, draw);

    function sync(){
      if(sFn) fnKey = sFn.value;
      if(sTheta) thetaDeg = parseInt(sTheta.value, 10);
      if(sAmp) amp = parseFloat(sAmp.value);
      if(sFreq) freq = parseFloat(sFreq.value);
      updateDataView();
      K.redrawAll();
    }
    if(sFn) sFn.addEventListener('change', sync);
    if(sTheta){ sTheta.addEventListener('input', sync); sTheta.addEventListener('change', sync); }
    if(sAmp){ sAmp.addEventListener('input', sync); sAmp.addEventListener('change', sync); }
    if(sFreq){ sFreq.addEventListener('input', sync); sFreq.addEventListener('change', sync); }

    bindCssDrag(canvas, function(px, py){
      if(px < lastSplitX && lastPuc){
        var wx = lastPuc.invX(px), wy = lastPuc.invY(py);
        var deg = Math.round((Math.atan2(wy, wx) * 180 / Math.PI) / 5) * 5;
        thetaDeg = Math.max(-360, Math.min(360, deg));
      } else if(lastPw){
        var rx = lastPw.invX(px);
        var deg2 = Math.round((rx * 180 / Math.PI) / 5) * 5;
        thetaDeg = Math.max(-360, Math.min(360, deg2));
      }
      if(sTheta) sTheta.value = thetaDeg;
      K.redrawAll();
    });
    sync();
  };

  /* ═══════════════════════════════════════════════════════════════════════
     2. ALL 6 INVERSE TRIGONOMETRIC FUNCTIONS EXPLORER
        arcsin, arccos, arctan, arccsc, arcsec, arccot
        Cartesian Reflection Across y = x + Unit Circle Principal Range Arc
     ═══════════════════════════════════════════════════════════════════════ */
  window.CSMountSixInvTrigExplorer = function(cfg){
    var K = getKit(); if(!K || !cfg) return;
    var pfx = cfg.prefix || (cfg.canvasId ? cfg.canvasId.replace(/Canvas$/, '') : '');
    var canvas = document.getElementById(cfg.canvasId || (pfx + 'Canvas'));
    if(!canvas || canvas._csMountedInvTrig6) return;
    canvas._csMountedInvTrig6 = true;

    var sFn = document.getElementById(pfx + 'Fn');
    var sX = document.getElementById(pfx + 'X');
    var dataBtn = document.getElementById(cfg.dataBtnId || (pfx + 'DataBtn'));
    var dataPanel = document.getElementById(pfx + 'DataPanel');
    var dataDesc = document.getElementById(pfx + 'DataDesc');
    var dataRows = document.getElementById(pfx + 'DataRows');
    K.wireDataToggle(dataBtn, dataPanel);

    var fnKey = (sFn && sFn.value) || cfg.defaultFn || 'arcsin';
    var xVal = sX ? parseFloat(sX.value) : 0.5;
    var TEAL = '#0d9488', ROSE = '#e11d48';
    var lastSplitX = 320, lastPg = null;

    var chApi = K.attachChallenge(canvas, {
      prompt: cfg.challengePrompt || {
        en: 'Compare principal branches: switch to arccos(x) or arcsec(x) with a negative input (x < 0) to verify the output lands in Quadrant II [π/2, π], then test arccsc(x) at |x| ≥ 1.',
        ar: 'قارن الفروع الأساسية: اختر arccos(x) أو arcsec(x) وجرّب مدخلاً سالباً (x < 0) للتحقق من وقوع الزاوية في الربع الثاني [π/2, π]، ثم اختبر arccsc(x) عند |x| ≥ 1.'
      },
      check: function(st){
        return ((st.fnKey === 'arccos' || st.fnKey === 'arcsec') && st.xVal < 0) ||
               (st.fnKey === 'arccsc' && Math.abs(st.xVal) >= 1);
      }
    });

    var SPECS = {
      arcsin: {
        name: 'arcsin(x) = sin⁻¹(x)', fwdName: 'sin(θ)',
        domTxt: '[−1, 1]', rangeTxt: '[−π/2, π/2] (−90° to 90°)',
        derivTxt: '1 / √(1 − x²)',
        derivFn: function(x){ return Math.abs(x) < 1 ? 1 / Math.sqrt(1 - x*x) : NaN; },
        arcType: 'right',
        evalInv: function(x){ return Math.abs(x) <= 1 ? Math.asin(x) : NaN; },
        evalFwd: function(t){ return (t >= -Math.PI/2 && t <= Math.PI/2) ? Math.sin(t) : NaN; },
        samples: [-1, -0.866, -0.707, -0.5, 0, 0.5, 0.707, 0.866, 1]
      },
      arccos: {
        name: 'arccos(x) = cos⁻¹(x)', fwdName: 'cos(θ)',
        domTxt: '[−1, 1]', rangeTxt: '[0, π] (0° to 180°)',
        derivTxt: '−1 / √(1 − x²)',
        derivFn: function(x){ return Math.abs(x) < 1 ? -1 / Math.sqrt(1 - x*x) : NaN; },
        arcType: 'top',
        evalInv: function(x){ return Math.abs(x) <= 1 ? Math.acos(x) : NaN; },
        evalFwd: function(t){ return (t >= 0 && t <= Math.PI) ? Math.cos(t) : NaN; },
        samples: [-1, -0.866, -0.707, -0.5, 0, 0.5, 0.707, 0.866, 1]
      },
      arctan: {
        name: 'arctan(x) = tan⁻¹(x)', fwdName: 'tan(θ)',
        domTxt: '(−∞, ∞)', rangeTxt: '(−π/2, π/2) (−90° to 90°)',
        derivTxt: '1 / (1 + x²)',
        derivFn: function(x){ return 1 / (1 + x*x); },
        arcType: 'right_open',
        evalInv: function(x){ return Math.atan(x); },
        evalFwd: function(t){ return (t > -Math.PI/2 + 0.05 && t < Math.PI/2 - 0.05) ? Math.tan(t) : NaN; },
        samples: [-3, -1.732, -1, -0.577, 0, 0.577, 1, 1.732, 3]
      },
      arccsc: {
        name: 'arccsc(x) = csc⁻¹(x)', fwdName: 'csc(θ)',
        domTxt: '(−∞, −1] ∪ [1, ∞)', rangeTxt: '[−π/2, 0) ∪ (0, π/2]',
        derivTxt: '−1 / (|x|√(x² − 1))',
        derivFn: function(x){ return Math.abs(x) > 1 ? -1 / (Math.abs(x) * Math.sqrt(x*x - 1)) : NaN; },
        arcType: 'right_no_zero',
        evalInv: function(x){ return Math.abs(x) >= 1 ? Math.asin(1 / x) : NaN; },
        evalFwd: function(t){ return (t >= -Math.PI/2 && t <= Math.PI/2 && Math.abs(t) > 0.08) ? 1 / Math.sin(t) : NaN; },
        samples: [-3, -2, -1.414, -1.155, -1, 1, 1.155, 1.414, 2, 3]
      },
      arcsec: {
        name: 'arcsec(x) = sec⁻¹(x)', fwdName: 'sec(θ)',
        domTxt: '(−∞, −1] ∪ [1, ∞)', rangeTxt: '[0, π/2) ∪ (π/2, π]',
        derivTxt: '1 / (|x|√(x² − 1))',
        derivFn: function(x){ return Math.abs(x) > 1 ? 1 / (Math.abs(x) * Math.sqrt(x*x - 1)) : NaN; },
        arcType: 'top_no_halfpi',
        evalInv: function(x){ return Math.abs(x) >= 1 ? Math.acos(1 / x) : NaN; },
        evalFwd: function(t){ return (t >= 0 && t <= Math.PI && Math.abs(t - Math.PI/2) > 0.08) ? 1 / Math.cos(t) : NaN; },
        samples: [-3, -2, -1.414, -1.155, -1, 1, 1.155, 1.414, 2, 3]
      },
      arccot: {
        name: 'arccot(x) = cot⁻¹(x)', fwdName: 'cot(θ)',
        domTxt: '(−∞, ∞)', rangeTxt: '(0, π) (0° to 180°)',
        derivTxt: '−1 / (1 + x²)',
        derivFn: function(x){ return -1 / (1 + x*x); },
        arcType: 'top_open',
        evalInv: function(x){ return Math.PI / 2 - Math.atan(x); },
        evalFwd: function(t){ return (t > 0.08 && t < Math.PI - 0.08) ? Math.cos(t) / Math.sin(t) : NaN; },
        samples: [-3, -1.732, -1, -0.577, 0, 0.577, 1, 1.732, 3]
      }
    };

    function updateDataView(){
      var S = SPECS[fnKey] || SPECS.arcsin;
      var y = S.evalInv(xVal);
      var ok = isFinite(y);
      if(dataDesc){
        dataDesc.textContent = S.name + ' | Domain: ' + S.domTxt + ' | Principal Range: ' + S.rangeTxt + '. ' +
          (ok ? 'At x = ' + K.fmt(xVal, 2) + ', θ = ' + K.fmt(y, 3) + ' rad (' + K.fmt(y * 180 / Math.PI, 1) + '°).'
              : 'Input x = ' + K.fmt(xVal, 2) + ' is outside the domain ' + S.domTxt + '.');
      }
      if(dataRows){
        var rows = [];
        for(var i = 0; i < S.samples.length; i++){
          var sx = S.samples[i], sy = S.evalInv(sx);
          rows.push([
            K.fmt(sx, 3),
            isFinite(sy) ? K.fmt(sy, 3) + ' rad' : 'undefined',
            isFinite(sy) ? K.fmt(sy * 180 / Math.PI, 1) + '°' : 'undefined',
            isFinite(sy) ? '(' + K.fmt(sy, 2) + ', ' + K.fmt(sx, 2) + ')' : '—'
          ]);
        }
        K.renderDataRows(dataRows, rows);
      }
    }

    function draw(ctx, w, h){
      var C = K.colors();
      ctx.clearRect(0, 0, w, h);
      var S = SPECS[fnKey] || SPECS.arcsin;
      var splitX = Math.round(w * 0.64);
      lastSplitX = splitX;

      var padL = {l: 30, r: Math.max(14, w - splitX + 8), t: 22, b: 24};
      var viewG = K._fitView(-3.4, 3.4, -3.4, 3.4, w, h, padL);
      var Pg = new K.Plot(ctx, w, h, viewG, padL);
      lastPg = Pg;
      Pg.grid();

      ctx.save();
      ctx.beginPath();
      ctx.rect(padL.l, padL.t, w - padL.l - padL.r, h - padL.t - padL.b);
      ctx.clip();

      /* Excluded domain shading for arccsc/arcsec (-1, 1) */
      if(fnKey === 'arccsc' || fnKey === 'arcsec'){
        var xl = Pg.X(-1), xr = Pg.X(1);
        ctx.fillStyle = 'rgba(225, 29, 72, 0.06)';
        ctx.fillRect(xl, padL.t, xr - xl, h - padL.t - padL.b);
      }

      Pg.segment(-5, -5, 5, 5, '#94a3b8', 1.3, [5, 4]);

      if(fnKey === 'arctan'){
        Pg.hline(Math.PI / 2, ROSE, [4, 4]);
        Pg.hline(-Math.PI / 2, ROSE, [4, 4]);
      } else if(fnKey === 'arccot'){
        Pg.hline(Math.PI, ROSE, [4, 4]);
        Pg.hline(0, ROSE, [4, 4]);
      } else if(fnKey === 'arccsc'){
        Pg.hline(0, ROSE, [4, 4]);
      } else if(fnKey === 'arcsec'){
        Pg.hline(Math.PI / 2, ROSE, [4, 4]);
      }

      Pg.curve(S.evalFwd, 'rgba(30,58,110,0.45)', 2.0, [4, 3]);

      if(fnKey === 'arccsc' || fnKey === 'arcsec'){
        Pg.curve(function(x){ return x <= -1 ? S.evalInv(x) : NaN; }, C.AMBER2, 2.8);
        Pg.curve(function(x){ return x >= 1 ? S.evalInv(x) : NaN; }, C.AMBER2, 2.8);
      } else {
        Pg.curve(S.evalInv, C.AMBER2, 2.8);
      }

      var yVal = S.evalInv(xVal);
      var ok = isFinite(yVal);
      Pg.vline(xVal, ok ? 'rgba(200,144,42,0.45)' : 'rgba(225,29,72,0.55)', [3, 3]);
      if(ok){
        Pg.segment(xVal, yVal, yVal, xVal, TEAL, 1.5, [3, 3]);
        Pg.dot(yVal, xVal, C.INDIGO, 4.8);
        Pg.dot(xVal, yVal, C.AMBER2, 5.8);
      }
      ctx.restore();

      ctx.font = C.FONT;
      ctx.fillStyle = C.INDIGO;
      ctx.textAlign = 'left';
      ctx.textBaseline = 'top';
      ctx.fillText('Amber: y = ' + S.name + '  |  Dashed: restricted ' + S.fwdName, padL.l, 4);

      ctx.save();
      ctx.strokeStyle = C.LINE;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(splitX, 8);
      ctx.lineTo(splitX, h - 8);
      ctx.stroke();
      ctx.restore();

      /* RIGHT PANE: UNIT CIRCLE PRINCIPAL RANGE ARC */
      var padR = {l: splitX + 12, r: 12, t: 24, b: 24};
      var viewUC = K._fitView(-1.35, 1.35, -1.35, 1.35, w, h, padR);
      var Puc = new K.Plot(ctx, w, h, viewUC, padR);

      Puc.segment(-1.25, 0, 1.25, 0, C.AXIS, 1);
      Puc.segment(0, -1.25, 0, 1.25, C.AXIS, 1);

      ctx.beginPath();
      for(var i = 0; i <= 100; i++){
        var a = 2 * Math.PI * i / 100;
        var ux = Puc.X(Math.cos(a)), uy = Puc.Y(Math.sin(a));
        if(i === 0) ctx.moveTo(ux, uy); else ctx.lineTo(ux, uy);
      }
      ctx.closePath();
      ctx.lineWidth = 1.3;
      ctx.strokeStyle = '#cbd5e1';
      ctx.stroke();

      var aStart = (S.arcType.indexOf('right') === 0) ? -Math.PI / 2 : 0;
      var aEnd = (S.arcType.indexOf('right') === 0) ? Math.PI / 2 : Math.PI;
      ctx.beginPath();
      for(var j = 0; j <= 60; j++){
        var ang = aStart + (aEnd - aStart) * j / 60;
        var ax = Puc.X(Math.cos(ang)), ay = Puc.Y(Math.sin(ang));
        if(j === 0) ctx.moveTo(ax, ay); else ctx.lineTo(ax, ay);
      }
      ctx.lineWidth = 3.5;
      ctx.strokeStyle = C.AMBER2;
      ctx.stroke();

      if(S.arcType === 'right_no_zero') Puc.ring(1, 0, ROSE, 4.2);
      if(S.arcType === 'top_no_halfpi') Puc.ring(0, 1, ROSE, 4.2);

      if(ok){
        var rcx = Math.cos(yVal), rcy = Math.sin(yVal);
        Puc.segment(0, 0, rcx, rcy, C.INDIGO, 2.4);
        Puc.dot(rcx, rcy, C.AMBER2, 5.2);
      }

      ctx.font = C.FONT;
      ctx.fillStyle = C.MUTED;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'top';
      ctx.fillText('Principal Range Arc', (splitX + w) / 2, 4);
      ctx.fillStyle = ok ? C.INDIGO : ROSE;
      ctx.fillText(ok ? ('θ = ' + K.fmt(yVal * 180 / Math.PI, 1) + '°') : 'Outside Domain ' + S.domTxt, (splitX + w) / 2, h - 20);

      var dVal = S.derivFn(xVal);
      K._set(pfx + 'XV', K.fmt(xVal, 2));
      K._set(pfx + 'XOut', K.fmt(xVal, 3));
      K._set(pfx + 'RadOut', ok ? (K.fmt(yVal, 3) + ' rad') : 'undefined (outside domain)');
      K._set(pfx + 'DegOut', ok ? (K.fmt(yVal * 180 / Math.PI, 1) + '°') : 'undefined');
      K._set(pfx + 'DomOut', S.domTxt);
      K._set(pfx + 'RangeOut', S.rangeTxt);
      K._set(pfx + 'CheckOut', ok ? (S.fwdName.replace('θ', K.fmt(yVal, 2)) + ' = ' + K.fmt(xVal, 3)) : 'Requires x ∈ ' + S.domTxt);
      if(document.getElementById(pfx + 'DerivOut')){
        K._set(pfx + 'DerivOut', isFinite(dVal) ? (K.fmt(dVal, 3) + '  [' + S.derivTxt + ']') : S.derivTxt);
      }
      updateDataView();
      if(chApi) chApi.check({fnKey: fnKey, xVal: xVal});
    }

    K.register(canvas, draw);

    function sync(){
      if(sFn){
        var newFn = sFn.value;
        if((newFn === 'arccsc' || newFn === 'arcsec') && Math.abs(xVal) < 1){
          xVal = xVal >= 0 ? 1.5 : -1.5;
          if(sX) sX.value = xVal;
        } else if((newFn === 'arcsin' || newFn === 'arccos') && Math.abs(xVal) > 1){
          xVal = xVal >= 0 ? 0.5 : -0.5;
          if(sX) sX.value = xVal;
        }
        fnKey = newFn;
      }
      if(sX) xVal = parseFloat(sX.value);
      updateDataView();
      K.redrawAll();
    }
    if(sFn) sFn.addEventListener('change', sync);
    if(sX){ sX.addEventListener('input', sync); sX.addEventListener('change', sync); }

    bindCssDrag(canvas, function(px){
      if(px < lastSplitX && lastPg){
        var wx = lastPg.invX(px);
        var snapped = Math.round(Math.max(-3, Math.min(3, wx)) * 20) / 20;
        xVal = snapped;
        if(sX) sX.value = xVal;
        K.redrawAll();
      }
    });
    sync();
  };

  /* ═══════════════════════════════════════════════════════════════════════
     3. INTERACTIVE SLOPE FIELD, RK4 PARTICULAR SOLUTION & EULER LAB
     ═══════════════════════════════════════════════════════════════════════ */
  var SLOPE_ODES = {
    xmy:      { eq: 'dy/dx = x − y',          f: function(x,y){ return x - y; },             nullcline: function(x){ return x; },          behavior: 'Approaches linear asymptote y = x − 1 as x → ∞' },
    y:        { eq: 'dy/dx = y',              f: function(x,y){ return y; },                 nullcline: function(){ return 0; },           behavior: 'Exponential family y = C·eˣ (unstable equilibrium y = 0)' },
    x:        { eq: 'dy/dx = x',              f: function(x,y){ return x; },                 nullcline: null, vNull: 0,                    behavior: 'Antiderivative family y = ½x² + C (vertex at x = 0)' },
    logistic: { eq: 'dy/dx = 0.5y(1 − y/3)',  f: function(x,y){ return 0.5*y*(1 - y/3); },   nullcline: function(){ return 3; },           behavior: 'Logistic carrying capacity M = 3, inflection at y = 1.5' },
    parab:    { eq: 'dy/dx = 0.3x² − 0.6y',   f: function(x,y){ return 0.3*x*x - 0.6*y; },  nullcline: function(x){ return 0.5*x*x; },    behavior: 'Nullcline parabola y = 0.5x² where dy/dx = 0' },
    sin:      { eq: 'dy/dx = sin(x) − 0.5y',  f: function(x,y){ return Math.sin(x) - 0.5*y; }, nullcline: function(x){ return 2*Math.sin(x); }, behavior: 'Damped sinusoidal steady-state oscillation' },
    circle:   { eq: 'dy/dx = −x / y',         f: function(x,y){ return Math.abs(y) < 0.08 ? NaN : -x / y; }, nullcline: null, vNull: 0, behavior: 'Concentric circular arcs x² + y² = R²' }
  };

  function rk4Step(f, x, y, h){
    var k1 = f(x, y); if(!isFinite(k1)) return NaN;
    var k2 = f(x + 0.5*h, y + 0.5*h*k1); if(!isFinite(k2)) return NaN;
    var k3 = f(x + 0.5*h, y + 0.5*h*k2); if(!isFinite(k3)) return NaN;
    var k4 = f(x + h, y + h*k3); if(!isFinite(k4)) return NaN;
    return y + (h / 6) * (k1 + 2*k2 + 2*k3 + k4);
  }

  function traceRK4(f, x0, y0, xmin, xmax, dt){
    dt = dt || 0.03;
    var fwd = [[x0, y0]], bwd = [[x0, y0]];
    var x = x0, y = y0, guard = 0;
    while(x < xmax && guard++ < 600){
      var yn = rk4Step(f, x, y, dt);
      if(!isFinite(yn) || Math.abs(yn) > 30) break;
      x += dt; y = yn;
      fwd.push([x, y]);
    }
    x = x0; y = y0; guard = 0;
    while(x > xmin && guard++ < 600){
      var yp = rk4Step(f, x, y, -dt);
      if(!isFinite(yp) || Math.abs(yp) > 30) break;
      x -= dt; y = yp;
      bwd.push([x, y]);
    }
    bwd.reverse();
    return bwd.concat(fwd.slice(1));
  }

  function traceEuler(f, x0, y0, xmax, hStep){
    var pts = [[x0, y0]];
    var x = x0, y = y0, steps = 0;
    while(x < xmax - 1e-6 && steps++ < 80){
      var s = f(x, y);
      if(!isFinite(s) || Math.abs(y) > 30) break;
      x += hStep; y += s * hStep;
      pts.push([x, y]);
    }
    return pts;
  }

  window.CSSlopeFieldRK4 = function(fnKey, x0, y0, xmin, xmax, step){
    var ode = SLOPE_ODES[fnKey] || SLOPE_ODES.xmy;
    return traceRK4(ode.f, x0, y0, xmin != null ? xmin : -4, xmax != null ? xmax : 4, step || 0.025);
  };

  window.CSMountSlopeFieldExplorer = function(cfg){
    var K = getKit(); if(!K || !cfg) return;
    var pfx = cfg.prefix || (cfg.canvasId ? cfg.canvasId.replace(/Canvas$/, '') : 'slope');
    var canvas = document.getElementById(cfg.canvasId || (pfx + 'Canvas'));
    if(!canvas || canvas._csMountedSlope) return;
    canvas._csMountedSlope = true;

    var sel = document.getElementById(pfx + 'Fn');
    var sX0 = document.getElementById(pfx + 'X0');
    var sY0 = document.getElementById(pfx + 'Y0');
    var sH  = document.getElementById(pfx + 'H');
    var cEuler = document.getElementById(pfx + 'Euler');
    var cNull  = document.getElementById(pfx + 'Null');
    var dataBtn = document.getElementById(cfg.dataBtnId || (pfx + 'DataBtn'));
    var dataPanel = document.getElementById(pfx + 'DataPanel');
    var dataDesc = document.getElementById(pfx + 'DataDesc');
    var dataRows = document.getElementById(pfx + 'DataRows');
    K.wireDataToggle(dataBtn, dataPanel);

    var key = (sel && sel.value) || cfg.defaultFn || 'xmy';
    if(!SLOPE_ODES[key]) key = 'xmy';
    var x0 = sX0 ? parseFloat(sX0.value) : 0;
    var y0 = sY0 ? parseFloat(sY0.value) : 1;
    var hStep = sH ? parseFloat(sH.value) : 0.5;
    var showEuler = cEuler ? cEuler.checked : true;
    var showNull = cNull ? cNull.checked : true;
    var view = {xmin: -4, xmax: 4, ymin: -4, ymax: 4};
    var pinned = [];
    var lastP = null;
    var TEAL = '#0d9488', ROSE = '#e11d48';

    var chApi = K.attachChallenge(canvas, {
      prompt: cfg.challengePrompt || {
        en: 'Click or drag directly on the slope field to place initial condition (x₀, y₀), or switch to the Logistic model dy/dx = 0.5y(1 − y/3) and test y₀ > 3 vs. 0 < y₀ < 3 to observe convergence to carrying capacity M = 3.',
        ar: 'انقر أو اسحب مباشرة على حقل الميول لتحريك الشرط الابتدائي (x₀, y₀)، أو اختر النموذج اللوجستي dy/dx = 0.5y(1 − y/3) وقارن بين y₀ > 3 و0 < y₀ < 3 لملاحظة التقارب نحو السعة الاستيعابية M = 3.'
      },
      check: function(st){
        return st.dragged || (st.key === 'logistic' && st.y0 > 0.2);
      }
    });
    var userDragged = false;

    function evalAt(pts, targetX){
      for(var i = 1; i < pts.length; i++){
        var xA = pts[i-1][0], xB = pts[i][0];
        if((targetX >= xA && targetX <= xB) || (targetX <= xA && targetX >= xB)){
          var t = Math.abs(xB - xA) < 1e-9 ? 0 : (targetX - xA) / (xB - xA);
          return pts[i-1][1] + t * (pts[i][1] - pts[i-1][1]);
        }
      }
      return NaN;
    }

    function drawPolyline(P, ctx, pts, color, lw, dash){
      if(!pts || pts.length < 2) return;
      ctx.save();
      ctx.beginPath();
      ctx.rect(P.pad.l, P.pad.t, P.w - P.pad.l - P.pad.r, P.h - P.pad.t - P.pad.b);
      ctx.clip();
      ctx.beginPath();
      for(var i = 0; i < pts.length; i++){
        var px = P.X(pts[i][0]), py = P.Y(pts[i][1]);
        if(i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
      }
      ctx.strokeStyle = color;
      ctx.lineWidth = lw || 2.5;
      ctx.lineJoin = 'round';
      if(dash) ctx.setLineDash(dash);
      ctx.stroke();
      ctx.restore();
    }

    function draw(ctx, w, h){
      var C = K.colors();
      var ode = SLOPE_ODES[key] || SLOPE_ODES.xmy;
      var P = new K.Plot(ctx, w, h, view, {l: 32, r: 14, t: 22, b: 26});
      lastP = P;
      P.clear(); P.grid();

      /* Slope field segments */
      var L = 0.16;
      for(var gx = -4; gx <= 4.001; gx += 0.5){
        for(var gy = -4; gy <= 4.001; gy += 0.5){
          var slp = ode.f(gx, gy);
          if(!isFinite(slp)) continue;
          var ang = Math.atan(slp), dx = L * Math.cos(ang), dy = L * Math.sin(ang);
          var isZero = Math.abs(slp) < 0.06;
          P.segment(gx - dx, gy - dy, gx + dx, gy + dy, isZero ? ROSE : '#94a3b8', isZero ? 1.8 : 1.25);
        }
      }

      /* Nullcline dy/dx = 0 */
      if(showNull){
        if(ode.nullcline) P.curve(ode.nullcline, 'rgba(225,29,72,0.55)', 1.5, [5, 4]);
        if(ode.vNull != null) P.vline(ode.vNull, 'rgba(225,29,72,0.55)', [5, 4], 1.5);
        if(key === 'logistic') P.hline(0, 'rgba(225,29,72,0.55)', [5, 4], 1.5);
      }

      /* Pinned comparison trajectories (double-click to pin) */
      for(var pi = 0; pi < pinned.length; pi++){
        var pPts = traceRK4(ode.f, pinned[pi][0], pinned[pi][1], view.xmin, view.xmax, 0.03);
        drawPolyline(P, ctx, pPts, 'rgba(43, 91, 168, 0.42)', 1.9);
        P.dot(pinned[pi][0], pinned[pi][1], C.INDIGO2, 3.8);
      }

      /* Active RK4 exact trajectory */
      var rkPts = traceRK4(ode.f, x0, y0, view.xmin, view.xmax, 0.025);
      drawPolyline(P, ctx, rkPts, C.AMBER2, 2.9);

      /* Optional Euler polygonal approximation */
      var euPts = null;
      if(showEuler){
        euPts = traceEuler(ode.f, x0, y0, view.xmax, hStep);
        drawPolyline(P, ctx, euPts, TEAL, 2.0, [5, 3]);
        for(var ei = 1; ei < euPts.length; ei++){
          if(euPts[ei][1] >= view.ymin && euPts[ei][1] <= view.ymax){
            P.dot(euPts[ei][0], euPts[ei][1], TEAL, 3.4);
          }
        }
      }

      /* Initial condition point (x0, y0) & tangent vector */
      var m0 = ode.f(x0, y0);
      if(isFinite(m0)){
        var ta = Math.atan(m0), tL = 0.55;
        P.arrow(x0, y0, x0 + tL*Math.cos(ta), y0 + tL*Math.sin(ta), C.INDIGO, 2.2);
      }
      P.dot(x0, y0, C.AMBER2, 6.2);

      ctx.font = C.FONT;
      ctx.fillStyle = C.INDIGO;
      ctx.textAlign = 'left';
      ctx.textBaseline = 'top';
      ctx.fillText(ode.eq + '   ·   Click/drag anywhere to move (x₀, y₀), double-click to pin curve', P.pad.l, 4);

      /* Readouts */
      if(sX0) K._set(pfx + 'X0v', K.fmt(x0, 1));
      K._set(pfx + 'Y0v', K.fmt(y0, 1));
      if(sH) K._set(pfx + 'Hv', K.fmt(hStep, 2));
      K._set(pfx + 'Eq', ode.eq);
      K._set(pfx + 'Pt', '(' + K.fmt(x0, 2) + ', ' + K.fmt(y0, 2) + ')  |  slope m₀ = ' + (isFinite(m0) ? K.fmt(m0, 3) : 'undefined'));
      K._set(pfx + 'Note', ode.behavior);

      var xTest = Math.min(view.xmax - 0.1, x0 + 1.0);
      var yRkTest = evalAt(rkPts, xTest);
      var yEuTest = euPts ? evalAt(euPts, xTest) : NaN;
      if(document.getElementById(pfx + 'Err')){
        K._set(pfx + 'Err', (isFinite(yRkTest) && isFinite(yEuTest))
          ? ('RK4: ' + K.fmt(yRkTest, 3) + ' vs Euler: ' + K.fmt(yEuTest, 3) + ' (|err| = ' + K.fmt(Math.abs(yRkTest - yEuTest), 3) + ')')
          : (isFinite(yRkTest) ? 'y(' + K.fmt(xTest, 1) + ') ≈ ' + K.fmt(yRkTest, 3) : '—'));
      }

      if(dataDesc){
        dataDesc.textContent = 'Interactive slope field for ' + ode.eq + ' with initial condition (' + K.fmt(x0, 2) + ', ' + K.fmt(y0, 2) + '), slope f(x₀, y₀) = ' + (isFinite(m0) ? K.fmt(m0, 3) : 'undefined') + '. ' + ode.behavior + '.';
      }
      if(dataRows){
        var rows = [];
        for(var k = 0; k < 9; k++){
          var sx = view.xmin + (view.xmax - view.xmin) * k / 8;
          var sy = evalAt(rkPts, sx);
          var sm = isFinite(sy) ? ode.f(sx, sy) : NaN;
          rows.push([K.fmt(sx, 2), isFinite(sy) ? K.fmt(sy, 3) : '—', isFinite(sm) ? K.fmt(sm, 3) : '—']);
        }
        K.renderDataRows(dataRows, rows);
      }
      if(chApi) chApi.check({key: key, x0: x0, y0: y0, dragged: userDragged});
    }

    K.register(canvas, draw);

    function sync(){
      if(sel && SLOPE_ODES[sel.value]) key = sel.value;
      if(sX0) x0 = parseFloat(sX0.value);
      if(sY0) y0 = parseFloat(sY0.value);
      if(sH)  hStep = parseFloat(sH.value);
      if(cEuler) showEuler = cEuler.checked;
      if(cNull)  showNull = cNull.checked;
      K.redrawAll();
    }
    if(sel) sel.addEventListener('change', function(){ pinned = []; sync(); });
    if(sX0){ sX0.addEventListener('input', sync); sX0.addEventListener('change', sync); }
    if(sY0){ sY0.addEventListener('input', sync); sY0.addEventListener('change', sync); }
    if(sH){ sH.addEventListener('input', sync); sH.addEventListener('change', sync); }
    if(cEuler) cEuler.addEventListener('change', sync);
    if(cNull) cNull.addEventListener('change', sync);

    bindCssDrag(canvas, function(px, py){
      if(!lastP) return;
      var wx = Math.max(-3.6, Math.min(3.6, lastP.invX(px)));
      var wy = Math.max(-3.6, Math.min(3.6, lastP.invY(py)));
      x0 = Math.round(wx * 10) / 10;
      y0 = Math.round(wy * 10) / 10;
      if(sX0) sX0.value = x0;
      if(sY0) sY0.value = y0;
      userDragged = true;
      K.redrawAll();
    }, {
      onDblClick: function(px, py){
        if(!lastP) return;
        var wx = Math.round(Math.max(-3.6, Math.min(3.6, lastP.invX(px))) * 10) / 10;
        var wy = Math.round(Math.max(-3.6, Math.min(3.6, lastP.invY(py))) * 10) / 10;
        if(pinned.length >= 6) pinned.shift();
        pinned.push([wx, wy]);
        K.redrawAll();
      }
    });
    sync();
  };

  /* ═══════════════════════════════════════════════════════════════════════
     4. AUTO-INTERACTIVE ENHANCER FOR ALL STATIC slope_field <figure> BLOCKS
     ═══════════════════════════════════════════════════════════════════════ */
  function compileSafeSlopeExpr(expr){
    var raw = String(expr || 'x - y').trim();
    if(raw === 'x - y' || raw === 'x-y') return function(x,y){ return x - y; };
    if(raw === '0.3*x*x - 0.6*y') return function(x,y){ return 0.3*x*x - 0.6*y; };
    if(raw === '(x+1)/y') return function(x,y){ return Math.abs(y) < 0.08 ? NaN : (x + 1) / y; };
    if(raw === 'x - 0.5*y' || raw === 'x - y/2') return function(x,y){ return x - 0.5*y; };
    if(raw === '0.5*y' || raw === 'k*y' || raw === 'y') return function(x,y){ return 0.5*y; };
    try {
      var safe = raw.replace(/[^0-9xXyY+\-*/().\s]/g, '');
      var fn = new Function('x', 'y', 'return (' + safe + ');');
      var test = fn(1, 1);
      if(typeof test === 'number') return fn;
    } catch(_){}
    return function(x,y){ return x - y; };
  }

  var _sfAutoSeq = 0;
  function escHtml(s){
    return String(s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }
  window.CSEnhanceStaticSlopeFields = function(root){
    var K = getKit(); if(!K || typeof document === 'undefined') return;
    var scope = root || document;
    var figs = scope.querySelectorAll ? scope.querySelectorAll('figure[data-cs-interactive-slopefield="1"]') : [];
    for(var i = 0; i < figs.length; i++){
      (function(fig){
        if(fig._csEnhancedSF) return;
        fig._csEnhancedSF = true;
        var svgHolder = fig.querySelector('.lesson-figure-svg');
        if(!svgHolder) return;

        var origExpr = fig.getAttribute('data-sf-fn') || 'x - y';
        var xmin = parseFloat(fig.getAttribute('data-sf-xmin')); if(!isFinite(xmin)) xmin = -3;
        var xmax = parseFloat(fig.getAttribute('data-sf-xmax')); if(!isFinite(xmax)) xmax = 3;
        var ymin = parseFloat(fig.getAttribute('data-sf-ymin')); if(!isFinite(ymin)) ymin = -3;
        var ymax = parseFloat(fig.getAttribute('data-sf-ymax')); if(!isFinite(ymax)) ymax = 3;
        var x0 = parseFloat(fig.getAttribute('data-sf-x0')); if(!isFinite(x0)) x0 = 0;
        var y0 = parseFloat(fig.getAttribute('data-sf-y0')); if(!isFinite(y0)) y0 = 1;

        var customFn = compileSafeSlopeExpr(origExpr);
        var modeKey = 'custom';
        var showEuler = false;
        var pinned = [];
        var lastP = null;

        /* Hide static SVG on screen (preserve for print if needed) */
        var origSvg = svgHolder.querySelector('svg');
        if(origSvg) origSvg.style.display = 'none';

        var uid = 'csAutoSF_' + (++_sfAutoSeq);
        var wrap = document.createElement('div');
        wrap.className = 'cs-live-slopefield';
        wrap.style.cssText = 'border:1px solid var(--line,#D6DCE6);border-radius:10px;background:var(--paper,#fff);overflow:hidden;margin:4px 0';

        wrap.innerHTML =
          '<div style="display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:8px;padding:8px 12px;border-bottom:1px solid var(--line,#D6DCE6);font-size:.82rem;background:var(--panel,#f8fafc)">' +
            '<div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">' +
              '<span class="badge" style="font-size:.72rem">interactive slope field</span>' +
              '<label for="' + uid + '_sel" style="font-weight:600">dy/dx =</label>' +
              '<select id="' + uid + '_sel" aria-label="Select differential equation" style="padding:3px 7px;border:1px solid var(--line,#cbd5e1);border-radius:6px;background:var(--paper,#fff);color:var(--ink,#0f172a);font-size:.8rem">' +
                '<option value="custom" selected>' + escHtml(origExpr) + ' (chapter ODE)</option>' +
                '<option value="xmy">x − y</option>' +
                '<option value="y">y (exponential)</option>' +
                '<option value="logistic">0.5y(1 − y/3) (logistic)</option>' +
                '<option value="sin">sin(x) − 0.5y</option>' +
                '<option value="circle">−x / y (circles)</option>' +
              '</select>' +
              '<label style="display:inline-flex;align-items:center;gap:4px;cursor:pointer"><input type="checkbox" id="' + uid + '_eu"> Euler (h=0.5)</label>' +
            '</div>' +
            '<div style="display:flex;align-items:center;gap:8px">' +
              '<span id="' + uid + '_readout" class="mono" style="font-size:.79rem;color:var(--indigo,#1E3A6E)"></span>' +
              '<button type="button" id="' + uid + '_pin" style="padding:2px 8px;border:1px solid var(--line,#cbd5e1);border-radius:6px;background:var(--paper,#fff);cursor:pointer;font-size:.76rem">+ Pin</button>' +
              '<button type="button" id="' + uid + '_clr" style="padding:2px 8px;border:1px solid var(--line,#cbd5e1);border-radius:6px;background:var(--paper,#fff);cursor:pointer;font-size:.76rem">Reset</button>' +
            '</div>' +
          '</div>' +
          '<div class="canvas-wrap" style="aspect-ratio:16/9;max-height:310px;width:100%"><canvas id="' + uid + '_cv" aria-label="Interactive slope field — click or drag to move initial condition"></canvas></div>' +
          '<div style="padding:5px 12px;font-size:.75rem;color:var(--muted,#566173);border-top:1px solid var(--line,#D6DCE6)">Click or drag anywhere on the field to move initial point (x₀, y₀) and trace its RK4 solution curve live.</div>';

        svgHolder.appendChild(wrap);

        var cv = document.getElementById(uid + '_cv');
        var selEl = document.getElementById(uid + '_sel');
        var euEl = document.getElementById(uid + '_eu');
        var rdEl = document.getElementById(uid + '_readout');
        var pinBtn = document.getElementById(uid + '_pin');
        var clrBtn = document.getElementById(uid + '_clr');
        var origX0 = x0, origY0 = y0;

        function curF(x, y){
          if(modeKey === 'custom') return customFn(x, y);
          return (SLOPE_ODES[modeKey] || SLOPE_ODES.xmy).f(x, y);
        }

        function drawSF(ctx, w, h){
          var C = K.colors();
          var v = {xmin: xmin, xmax: xmax, ymin: ymin, ymax: ymax};
          var P = new K.Plot(ctx, w, h, v, {l: 32, r: 14, t: 14, b: 24});
          lastP = P;
          P.clear(); P.grid();

          var stepG = (xmax - xmin) / 14;
          var segL = stepG * 0.34;
          for(var gx = xmin; gx <= xmax + 1e-6; gx += stepG){
            for(var gy = ymin; gy <= ymax + 1e-6; gy += stepG){
              var s = curF(gx, gy);
              if(!isFinite(s)) continue;
              var a = Math.atan(s), dx = segL * Math.cos(a), dy = segL * Math.sin(a);
              P.segment(gx - dx, gy - dy, gx + dx, gy + dy, Math.abs(s) < 0.06 ? '#e11d48' : '#94a3b8', 1.25);
            }
          }

          function poly(pts, col, lw, dsh){
            if(!pts || pts.length < 2) return;
            ctx.save();
            ctx.beginPath(); ctx.rect(P.pad.l, P.pad.t, P.w - P.pad.l - P.pad.r, P.h - P.pad.t - P.pad.b); ctx.clip();
            ctx.beginPath();
            for(var j = 0; j < pts.length; j++){
              if(j === 0) ctx.moveTo(P.X(pts[j][0]), P.Y(pts[j][1]));
              else ctx.lineTo(P.X(pts[j][0]), P.Y(pts[j][1]));
            }
            ctx.strokeStyle = col; ctx.lineWidth = lw; if(dsh) ctx.setLineDash(dsh); ctx.stroke();
            ctx.restore();
          }

          for(var p = 0; p < pinned.length; p++){
            poly(traceRK4(curF, pinned[p][0], pinned[p][1], xmin, xmax, 0.025), 'rgba(43,91,168,0.45)', 1.8);
            P.dot(pinned[p][0], pinned[p][1], C.INDIGO2, 3.6);
          }

          var rk = traceRK4(curF, x0, y0, xmin, xmax, 0.02);
          poly(rk, C.AMBER2, 2.8);

          if(showEuler){
            var eu = traceEuler(curF, x0, y0, xmax, 0.5);
            poly(eu, '#0d9488', 2.0, [5, 3]);
            for(var e = 1; e < eu.length; e++) P.dot(eu[e][0], eu[e][1], '#0d9488', 3.2);
          }

          P.dot(x0, y0, C.AMBER2, 5.8);
          var m = curF(x0, y0);
          if(rdEl){
            rdEl.textContent = '(x₀, y₀) = (' + K.fmt(x0, 2) + ', ' + K.fmt(y0, 2) + ') · m = ' + (isFinite(m) ? K.fmt(m, 2) : 'undef');
          }
        }

        K.register(cv, drawSF);
        selEl.addEventListener('change', function(){ modeKey = selEl.value; pinned = []; K.redrawAll(); });
        euEl.addEventListener('change', function(){ showEuler = euEl.checked; K.redrawAll(); });
        pinBtn.addEventListener('click', function(){
          if(pinned.length >= 6) pinned.shift();
          pinned.push([x0, y0]);
          K.redrawAll();
        });
        clrBtn.addEventListener('click', function(){
          pinned = []; x0 = origX0; y0 = origY0; modeKey = 'custom'; selEl.value = 'custom';
          K.redrawAll();
        });
        bindCssDrag(cv, function(px, py){
          if(!lastP) return;
          x0 = Math.round(Math.max(xmin, Math.min(xmax, lastP.invX(px))) * 20) / 20;
          y0 = Math.round(Math.max(ymin, Math.min(ymax, lastP.invY(py))) * 20) / 20;
          K.redrawAll();
        });
      })(figs[i]);
    }
  };

  if(typeof document !== 'undefined'){
    if(document.readyState === 'loading'){
      document.addEventListener('DOMContentLoaded', function(){ window.CSEnhanceStaticSlopeFields(); });
    } else {
      setTimeout(function(){ window.CSEnhanceStaticSlopeFields(); }, 0);
    }
    document.addEventListener('click', function(){
      setTimeout(function(){ window.CSEnhanceStaticSlopeFields(); }, 40);
    });
  }

  /* ═══════════════════════════════════════════════════════════════════════
     5. INTERACTIVE MAIN FUNCTIONS ATLAS & TRANSFORMATION EXPLORER
        Covers: constant, linear, quadratic, cubic, absolute, radical,
                rational, exponential, logarithmic (+ hyperbolics if enabled)
     ═══════════════════════════════════════════════════════════════════════ */
  function fmtShiftX(h){
    if(Math.abs(h) < 1e-6) return 'x';
    return h > 0 ? '(x − ' + h + ')' : '(x + ' + Math.abs(h) + ')';
  }
  function fmtShiftK(k){
    if(Math.abs(k) < 1e-6) return '';
    return k > 0 ? ' + ' + k : ' − ' + Math.abs(k);
  }
  function fmtScaleA(a){
    if(Math.abs(a - 1) < 1e-6) return '';
    if(Math.abs(a + 1) < 1e-6) return '−';
    return String(a);
  }

  var MAIN_FN_CATALOG = {
    constant: {
      name: 'Constant',
      parent: function(){ return 1; },
      evalFn: function(x, a, h, k){ return a + k; },
      eq: function(a, h, k){ return 'f(x) = ' + Math.round((a + k) * 100) / 100; },
      dom: function(){ return '(−∞, ∞)'; },
      rng: function(a, h, k){ var c = Math.round((a + k) * 100) / 100; return '{' + c + '}'; },
      key: function(a, h, k){ var c = Math.round((a + k) * 100) / 100; return 'Horizontal line y = ' + c + ' (slope m = 0)'; }
    },
    linear: {
      name: 'Linear',
      parent: function(x){ return x; },
      evalFn: function(x, a, h, k){ return a * (x - h) + k; },
      eq: function(a, h, k){
        if(Math.abs(a) < 1e-6) return 'f(x) = ' + k;
        return 'f(x) = ' + fmtScaleA(a) + fmtShiftX(h) + fmtShiftK(k);
      },
      dom: function(){ return '(−∞, ∞)'; },
      rng: function(a, h, k){ return Math.abs(a) < 1e-6 ? '{' + k + '}' : '(−∞, ∞)'; },
      key: function(a, h, k){ return 'Slope m = ' + a + ', Pivot (' + h + ', ' + k + ')'; }
    },
    quadratic: {
      name: 'Quadratic',
      parent: function(x){ return x * x; },
      evalFn: function(x, a, h, k){ var u = x - h; return a * u * u + k; },
      eq: function(a, h, k){
        if(Math.abs(a) < 1e-6) return 'f(x) = ' + k;
        return 'f(x) = ' + fmtScaleA(a) + fmtShiftX(h) + '²' + fmtShiftK(k);
      },
      dom: function(){ return '(−∞, ∞)'; },
      rng: function(a, h, k){
        if(Math.abs(a) < 1e-6) return '{' + k + '}';
        return a > 0 ? '[' + k + ', ∞)' : '(−∞, ' + k + ']';
      },
      key: function(a, h, k){ return 'Vertex (' + h + ', ' + k + '), Axis x = ' + h; }
    },
    cubic: {
      name: 'Cubic',
      parent: function(x){ return x * x * x; },
      evalFn: function(x, a, h, k){ var u = x - h; return a * u * u * u + k; },
      eq: function(a, h, k){
        if(Math.abs(a) < 1e-6) return 'f(x) = ' + k;
        return 'f(x) = ' + fmtScaleA(a) + fmtShiftX(h) + '³' + fmtShiftK(k);
      },
      dom: function(){ return '(−∞, ∞)'; },
      rng: function(a, h, k){ return Math.abs(a) < 1e-6 ? '{' + k + '}' : '(−∞, ∞)'; },
      key: function(a, h, k){ return 'Inflection Point (' + h + ', ' + k + ')'; }
    },
    absolute: {
      name: 'Absolute Value',
      parent: function(x){ return Math.abs(x); },
      evalFn: function(x, a, h, k){ return a * Math.abs(x - h) + k; },
      eq: function(a, h, k){
        if(Math.abs(a) < 1e-6) return 'f(x) = ' + k;
        var inner = Math.abs(h) < 1e-6 ? '|x|' : (h > 0 ? '|x − ' + h + '|' : '|x + ' + Math.abs(h) + '|');
        return 'f(x) = ' + fmtScaleA(a) + inner + fmtShiftK(k);
      },
      dom: function(){ return '(−∞, ∞)'; },
      rng: function(a, h, k){
        if(Math.abs(a) < 1e-6) return '{' + k + '}';
        return a > 0 ? '[' + k + ', ∞)' : '(−∞, ' + k + ']';
      },
      key: function(a, h, k){ return 'Corner Vertex (' + h + ', ' + k + '), Slopes ±' + Math.abs(a); }
    },
    radical: {
      name: 'Radical (Square Root)',
      parent: function(x){ return x >= 0 ? Math.sqrt(x) : NaN; },
      evalFn: function(x, a, h, k){ return x >= h ? a * Math.sqrt(x - h) + k : NaN; },
      eq: function(a, h, k){
        if(Math.abs(a) < 1e-6) return 'f(x) = ' + k + ' (x ≥ ' + h + ')';
        var inner = Math.abs(h) < 1e-6 ? 'x' : (h > 0 ? 'x − ' + h : 'x + ' + Math.abs(h));
        return 'f(x) = ' + fmtScaleA(a) + '√(' + inner + ')' + fmtShiftK(k);
      },
      dom: function(a, h){ return '[' + h + ', ∞)'; },
      rng: function(a, h, k){
        if(Math.abs(a) < 1e-6) return '{' + k + '}';
        return a > 0 ? '[' + k + ', ∞)' : '(−∞, ' + k + ']';
      },
      key: function(a, h, k){ return 'Endpoint (' + h + ', ' + k + '), Restricted x ≥ ' + h; }
    },
    rational: {
      name: 'Rational (Reciprocal)',
      parent: function(x){ return Math.abs(x) < 0.05 ? NaN : 1 / x; },
      evalFn: function(x, a, h, k){ return Math.abs(x - h) < 0.05 ? NaN : (a / (x - h)) + k; },
      eq: function(a, h, k){
        if(Math.abs(a) < 1e-6) return 'f(x) = ' + k + ' (x ≠ ' + h + ')';
        var den = Math.abs(h) < 1e-6 ? 'x' : fmtShiftX(h);
        return 'f(x) = ' + a + '/' + den + fmtShiftK(k);
      },
      dom: function(a, h){ return '(−∞, ' + h + ') ∪ (' + h + ', ∞)'; },
      rng: function(a, h, k){
        if(Math.abs(a) < 1e-6) return '{' + k + '}';
        return '(−∞, ' + k + ') ∪ (' + k + ', ∞)';
      },
      key: function(a, h, k){ return 'VA: x = ' + h + ',  HA: y = ' + k; },
      va: function(h){ return h; },
      ha: function(k){ return k; }
    },
    exponential: {
      name: 'Exponential',
      parent: function(x){ return Math.pow(2, x); },
      evalFn: function(x, a, h, k){ return a * Math.pow(2, x - h) + k; },
      eq: function(a, h, k){
        if(Math.abs(a) < 1e-6) return 'f(x) = ' + k;
        var expStr = Math.abs(h) < 1e-6 ? '2ˣ' : '2^' + fmtShiftX(h);
        var coeff = Math.abs(a - 1) < 1e-6 ? '' : (Math.abs(a + 1) < 1e-6 ? '−' : a + '·');
        return 'f(x) = ' + coeff + expStr + fmtShiftK(k);
      },
      dom: function(){ return '(−∞, ∞)'; },
      rng: function(a, h, k){
        if(Math.abs(a) < 1e-6) return '{' + k + '}';
        return a > 0 ? '(' + k + ', ∞)' : '(−∞, ' + k + ')';
      },
      key: function(a, h, k){ return 'HA: y = ' + k + ', Anchor (' + h + ', ' + (a + k) + ')'; },
      ha: function(k){ return k; }
    },
    logarithmic: {
      name: 'Logarithmic',
      parent: function(x){ return x > 0.02 ? Math.log(x) : NaN; },
      evalFn: function(x, a, h, k){ return (x - h) > 0.02 ? a * Math.log(x - h) + k : NaN; },
      eq: function(a, h, k){
        if(Math.abs(a) < 1e-6) return 'f(x) = ' + k + ' (x > ' + h + ')';
        var arg = Math.abs(h) < 1e-6 ? '(x)' : fmtShiftX(h);
        return 'f(x) = ' + fmtScaleA(a) + 'ln' + arg + fmtShiftK(k);
      },
      dom: function(a, h){ return '(' + h + ', ∞)'; },
      rng: function(a, h, k){ return Math.abs(a) < 1e-6 ? '{' + k + '}' : '(−∞, ∞)'; },
      key: function(a, h, k){ return 'VA: x = ' + h + ', Anchor (' + (h + 1) + ', ' + k + ')'; },
      va: function(h){ return h; }
    }
  };

  window.CSMainFunctionsCatalog = MAIN_FN_CATALOG;

  window.CSMountMainFunctionsExplorer = function(cfg){
    var K = getKit(); if(!K || !cfg) return;
    var pfx = cfg.prefix || (cfg.canvasId ? cfg.canvasId.replace(/Canvas$/, '') : '');
    var canvas = document.getElementById(cfg.canvasId || (pfx + 'Canvas'));
    if(!canvas || canvas._csMountedMainFn) return;
    canvas._csMountedMainFn = true;

    var sFn = document.getElementById(pfx + 'Fn');
    var sA  = document.getElementById(pfx + 'A');
    var sH  = document.getElementById(pfx + 'H');
    var sK  = document.getElementById(pfx + 'K');
    var cGhost = document.getElementById(pfx + 'Ghost');
    var dataBtn = document.getElementById(cfg.dataBtnId || (pfx + 'DataBtn'));
    var dataPanel = document.getElementById(pfx + 'DataPanel');
    var dataDesc = document.getElementById(pfx + 'DataDesc');
    var dataRows = document.getElementById(pfx + 'DataRows');
    K.wireDataToggle(dataBtn, dataPanel);

    var fnKey = (sFn && sFn.value) || cfg.defaultFn || 'quadratic';
    if(!MAIN_FN_CATALOG[fnKey]) fnKey = 'quadratic';
    var a = sA ? parseFloat(sA.value) : 1;
    var h = sH ? parseFloat(sH.value) : 0;
    var k = sK ? parseFloat(sK.value) : 0;
    var showGhost = cGhost ? cGhost.checked : true;
    var view = {xmin: -6, xmax: 6, ymin: -5, ymax: 5};
    var lastP = null;
    var TEAL = '#0d9488', ROSE = '#e11d48', EMERALD = '#10b981';

    var chApi = K.attachChallenge(canvas, {
      prompt: cfg.challengePrompt || {
        en: 'Switch between parent families (Constant, Linear, Quadratic, Cubic, Absolute, Radical, Rational, Exponential, Logarithmic) and drag (h, k) on the graph to see how shifts move vertices, endpoints, and asymptotes identically!',
        ar: 'بدّل بين عائلات الدوال الأم التسع (الثابتة، الخطية، التربيعية، التكعيبية، القيمة المطلقة، الجذرية، النسبية، الأسية، اللوغاريتمية) واسحب النقطة المحورية (h, k) على الرسم لملاحظة كيف تتحرك الرؤوس وخطوط التقارب بنفس القاعدة!'
      },
      check: function(st){
        return (Math.abs(st.h) >= 1 && Math.abs(st.k) >= 1) || st.switched;
      }
    });
    var userSwitched = false;

    function computeIntercepts(spec){
      var yInt = spec.evalFn(0, a, h, k);
      var yStr = isFinite(yInt) ? '(0, ' + K.fmt(yInt, 2) + ')' : 'none';
      var xStr = 'none';
      if(Math.abs(a) < 1e-6){
        xStr = Math.abs(k) < 1e-6 ? 'all x in domain' : 'none';
      } else if(fnKey === 'constant'){
        xStr = Math.abs(a + k) < 1e-6 ? 'all real x' : 'none';
      } else if(fnKey === 'linear'){
        xStr = '(' + K.fmt(h - k / a, 2) + ', 0)';
      } else if(fnKey === 'quadratic'){
        var ratioQ = -k / a;
        if(Math.abs(ratioQ) < 1e-6) xStr = '(' + K.fmt(h, 2) + ', 0)';
        else if(ratioQ > 0){
          var sq = Math.sqrt(ratioQ);
          xStr = '(' + K.fmt(h - sq, 2) + ', 0), (' + K.fmt(h + sq, 2) + ', 0)';
        }
      } else if(fnKey === 'cubic'){
        var rC = -k / a;
        var cr = (rC < 0 ? -1 : 1) * Math.pow(Math.abs(rC), 1/3);
        xStr = '(' + K.fmt(h + cr, 2) + ', 0)';
      } else if(fnKey === 'absolute'){
        var rA = -k / a;
        if(Math.abs(rA) < 1e-6) xStr = '(' + K.fmt(h, 2) + ', 0)';
        else if(rA > 0) xStr = '(' + K.fmt(h - rA, 2) + ', 0), (' + K.fmt(h + rA, 2) + ', 0)';
      } else if(fnKey === 'radical'){
        var rRad = -k / a;
        if(rRad >= 0) xStr = '(' + K.fmt(h + rRad * rRad, 2) + ', 0)';
      } else if(fnKey === 'rational'){
        if(Math.abs(k) > 1e-6) xStr = '(' + K.fmt(h - a / k, 2) + ', 0)';
      } else if(fnKey === 'exponential'){
        var rExp = -k / a;
        if(rExp > 0) xStr = '(' + K.fmt(h + Math.log(rExp) / Math.LN2, 2) + ', 0)';
      } else if(fnKey === 'logarithmic'){
        xStr = '(' + K.fmt(h + Math.exp(-k / a), 2) + ', 0)';
      }
      return { yInt: yInt, text: 'y-int: ' + yStr + ' · x-int: ' + xStr };
    }

    function draw(ctx, w, ht){
      var C = K.colors();
      var spec = MAIN_FN_CATALOG[fnKey] || MAIN_FN_CATALOG.quadratic;
      var P = new K.Plot(ctx, w, ht, view, {l: 34, r: 14, t: 22, b: 26});
      lastP = P;
      P.clear(); P.grid();

      if(showGhost){
        if(fnKey === 'rational'){
          P.curve(function(x){ return x < -0.05 ? 1/x : NaN; }, 'rgba(148,163,184,0.65)', 1.5, [4, 4]);
          P.curve(function(x){ return x > 0.05 ? 1/x : NaN; }, 'rgba(148,163,184,0.65)', 1.5, [4, 4]);
        } else {
          P.curve(spec.parent, 'rgba(148,163,184,0.65)', 1.5, [4, 4]);
        }
      }

      if(spec.va) P.vline(spec.va(h), ROSE, [5, 4], 1.6);
      if(spec.ha) P.hline(spec.ha(k), TEAL, [5, 4], 1.6);

      if(fnKey === 'rational'){
        P.curve(function(x){ return x < h - 0.04 ? spec.evalFn(x, a, h, k) : NaN; }, C.INDIGO, 2.8);
        P.curve(function(x){ return x > h + 0.04 ? spec.evalFn(x, a, h, k) : NaN; }, C.INDIGO, 2.8);
      } else {
        P.curve(function(x){ return spec.evalFn(x, a, h, k); }, C.INDIGO, 2.8);
      }

      var ints = computeIntercepts(spec);
      if(isFinite(ints.yInt) && ints.yInt >= view.ymin && ints.yInt <= view.ymax){
        P.dot(0, ints.yInt, EMERALD, 4.2);
      }

      /* Anchor / vertex / asymptote intersection marker */
      var ax = h, ay = k;
      if(fnKey === 'exponential') ay = a + k;
      else if(fnKey === 'logarithmic') ax = h + 1;
      else if(fnKey === 'constant') ay = a + k;

      if(fnKey === 'rational'){
        P.ring(h, k, ROSE, 5.0);
      } else if(ax >= view.xmin && ax <= view.xmax && ay >= view.ymin && ay <= view.ymax){
        P.dot(ax, ay, C.AMBER2, 5.8);
      }

      var eqStr = spec.eq(a, h, k);
      ctx.font = C.FONT;
      ctx.fillStyle = C.INDIGO;
      ctx.textAlign = 'left';
      ctx.textBaseline = 'top';
      ctx.fillText(spec.name + ':  ' + eqStr + '   (drag anchor on graph)', P.pad.l, 4);

      K._set(pfx + 'AV', K.fmt(a, 2));
      K._set(pfx + 'HV', K.fmt(h, 1));
      K._set(pfx + 'KV', K.fmt(k, 1));
      K._set(pfx + 'Eq', eqStr);
      K._set(pfx + 'Dom', spec.dom(a, h, k));
      K._set(pfx + 'Rng', spec.rng(a, h, k));
      K._set(pfx + 'Key', spec.key(a, h, k));
      K._set(pfx + 'Int', ints.text);

      if(dataDesc){
        dataDesc.textContent = spec.name + ' function ' + eqStr + ' | Domain: ' + spec.dom(a, h, k) + ' | Range: ' + spec.rng(a, h, k) + ' | ' + spec.key(a, h, k) + '.';
      }
      if(dataRows){
        var rows = [];
        for(var s = -4; s <= 4; s++){
          var pv = spec.parent(s), gv = spec.evalFn(s, a, h, k);
          rows.push([String(s), isFinite(pv) ? K.fmt(pv, 3) : 'undefined', isFinite(gv) ? K.fmt(gv, 3) : 'undefined']);
        }
        K.renderDataRows(dataRows, rows);
      }
      if(chApi) chApi.check({fnKey: fnKey, a: a, h: h, k: k, switched: userSwitched});
    }

    K.register(canvas, draw);

    function sync(e){
      if(sFn && MAIN_FN_CATALOG[sFn.value]){
        if(e && e.target === sFn) userSwitched = true;
        fnKey = sFn.value;
      }
      if(sA) a = parseFloat(sA.value);
      if(sH) h = parseFloat(sH.value);
      if(sK) k = parseFloat(sK.value);
      if(cGhost) showGhost = cGhost.checked;
      K.redrawAll();
    }
    if(sFn) sFn.addEventListener('change', sync);
    if(sA){ sA.addEventListener('input', sync); sA.addEventListener('change', sync); }
    if(sH){ sH.addEventListener('input', sync); sH.addEventListener('change', sync); }
    if(sK){ sK.addEventListener('input', sync); sK.addEventListener('change', sync); }
    if(cGhost) cGhost.addEventListener('change', sync);

    bindCssDrag(canvas, function(px, py){
      if(!lastP) return;
      var wx = Math.round(Math.max(-4, Math.min(4, lastP.invX(px))) * 2) / 2;
      var wy = Math.round(Math.max(-4, Math.min(4, lastP.invY(py))) * 2) / 2;
      h = wx; k = wy;
      if(sH) sH.value = h;
      if(sK) sK.value = k;
      K.redrawAll();
    });
    sync();
  };

  /* ═══════════════════════════════════════════════════════════════════════
     6. HYPERBOLIC & INVERSE HYPERBOLIC FUNCTIONS EXPLORER (CALCULUS)
        sinh, cosh, tanh, csch, sech, coth + arsinh, arcosh, artanh
     ═══════════════════════════════════════════════════════════════════════ */
  var HYPER_SPECS = {
    sinh: {
      name: 'sinh(x) = ½(eˣ − e⁻ˣ)',
      evalFn: function(u){ return 0.5 * (Math.exp(u) - Math.exp(-u)); },
      derivFn: function(u){ return 0.5 * (Math.exp(u) + Math.exp(-u)); },
      derivFormula: 'd/dx[sinh x] = cosh x',
      domRng: 'Domain (−∞, ∞), Range (−∞, ∞)',
      asym: 'No asymptotes · Odd symmetry',
      hasDecomp: true
    },
    cosh: {
      name: 'cosh(x) = ½(eˣ + e⁻ˣ) [Catenary]',
      evalFn: function(u){ return 0.5 * (Math.exp(u) + Math.exp(-u)); },
      derivFn: function(u){ return 0.5 * (Math.exp(u) - Math.exp(-u)); },
      derivFormula: 'd/dx[cosh x] = sinh x',
      domRng: 'Domain (−∞, ∞), Range [a, ∞)',
      asym: 'Minimum (0, a) · Even symmetry',
      hasDecomp: true
    },
    tanh: {
      name: 'tanh(x) = (eˣ − e⁻ˣ)/(eˣ + e⁻ˣ)',
      evalFn: function(u){ var e = Math.exp(u), em = Math.exp(-u); return (e - em)/(e + em); },
      derivFn: function(u){ var c = 0.5*(Math.exp(u)+Math.exp(-u)); return 1/(c*c); },
      derivFormula: 'd/dx[tanh x] = sech² x',
      domRng: 'Domain (−∞, ∞), Range (−a, a)',
      asym: 'Horizontal asymptotes y = ±a · Odd',
      ha: [-1, 1]
    },
    csch: {
      name: 'csch(x) = 1 / sinh(x)',
      evalFn: function(u){ var s = 0.5*(Math.exp(u)-Math.exp(-u)); return Math.abs(s) < 0.05 ? NaN : 1/s; },
      derivFn: function(u){ var s = 0.5*(Math.exp(u)-Math.exp(-u)), c = 0.5*(Math.exp(u)+Math.exp(-u)); return Math.abs(s) < 0.05 ? NaN : -c/(s*s); },
      derivFormula: 'd/dx[csch x] = −csch x · coth x',
      domRng: 'Domain x ≠ 0, Range y ≠ 0',
      asym: 'VA: x = 0, HA: y = 0 · Odd',
      va: [0], ha: [0]
    },
    sech: {
      name: 'sech(x) = 1 / cosh(x)',
      evalFn: function(u){ return 2 / (Math.exp(u) + Math.exp(-u)); },
      derivFn: function(u){ var s = 0.5*(Math.exp(u)-Math.exp(-u)), c = 0.5*(Math.exp(u)+Math.exp(-u)); return -s/(c*c); },
      derivFormula: 'd/dx[sech x] = −sech x · tanh x',
      domRng: 'Domain (−∞, ∞), Range (0, a]',
      asym: 'HA: y = 0, Peak (0, a) · Even',
      ha: [0]
    },
    coth: {
      name: 'coth(x) = cosh(x) / sinh(x)',
      evalFn: function(u){ var s = 0.5*(Math.exp(u)-Math.exp(-u)), c = 0.5*(Math.exp(u)+Math.exp(-u)); return Math.abs(s) < 0.05 ? NaN : c/s; },
      derivFn: function(u){ var s = 0.5*(Math.exp(u)-Math.exp(-u)); return Math.abs(s) < 0.05 ? NaN : -1/(s*s); },
      derivFormula: 'd/dx[coth x] = −csch² x',
      domRng: 'Domain x ≠ 0, Range |y| > a',
      asym: 'VA: x = 0, HA: y = ±a · Odd',
      va: [0], ha: [-1, 1]
    },
    arsinh: {
      name: 'arsinh(x) = ln(x + √(x² + 1))',
      evalFn: function(u){ return Math.log(u + Math.sqrt(u*u + 1)); },
      derivFn: function(u){ return 1 / Math.sqrt(u*u + 1); },
      derivFormula: 'd/dx[arsinh x] = 1 / √(x² + 1)',
      domRng: 'Domain (−∞, ∞), Range (−∞, ∞)',
      asym: 'Inverse of sinh x · Odd'
    },
    arcosh: {
      name: 'arcosh(x) = ln(x + √(x² − 1))',
      evalFn: function(u){ return u >= 1 ? Math.log(u + Math.sqrt(u*u - 1)) : NaN; },
      derivFn: function(u){ return u > 1.001 ? 1 / Math.sqrt(u*u - 1) : NaN; },
      derivFormula: 'd/dx[arcosh x] = 1 / √(x² − 1) (x > 1)',
      domRng: 'Domain [1, ∞), Principal Range [0, ∞)',
      asym: 'Endpoint (1, 0), Vertical tangent at x = 1'
    },
    artanh: {
      name: 'artanh(x) = ½ ln((1 + x)/(1 − x))',
      evalFn: function(u){ return Math.abs(u) < 0.995 ? 0.5 * Math.log((1 + u)/(1 - u)) : NaN; },
      derivFn: function(u){ return Math.abs(u) < 0.995 ? 1 / (1 - u*u) : NaN; },
      derivFormula: 'd/dx[artanh x] = 1 / (1 − x²) (|x| < 1)',
      domRng: 'Domain (−1, 1), Range (−∞, ∞)',
      asym: 'Vertical asymptotes x = −1 and x = +1 · Odd',
      va: [-1, 1]
    }
  };

  window.CSHyperbolicCatalog = HYPER_SPECS;

  window.CSMountHyperbolicExplorer = function(cfg){
    var K = getKit(); if(!K || !cfg) return;
    var pfx = cfg.prefix || (cfg.canvasId ? cfg.canvasId.replace(/Canvas$/, '') : '');
    var canvas = document.getElementById(cfg.canvasId || (pfx + 'Canvas'));
    if(!canvas || canvas._csMountedHyper) return;
    canvas._csMountedHyper = true;

    var sFn = document.getElementById(pfx + 'Fn');
    var sA  = document.getElementById(pfx + 'A');
    var sX  = document.getElementById(pfx + 'X');
    var cDec = document.getElementById(pfx + 'Decomp');
    var dataBtn = document.getElementById(cfg.dataBtnId || (pfx + 'DataBtn'));
    var dataPanel = document.getElementById(pfx + 'DataPanel');
    var dataDesc = document.getElementById(pfx + 'DataDesc');
    var dataRows = document.getElementById(pfx + 'DataRows');
    K.wireDataToggle(dataBtn, dataPanel);

    var fnKey = (sFn && sFn.value) || cfg.defaultFn || 'cosh';
    if(!HYPER_SPECS[fnKey]) fnKey = 'cosh';
    var aScale = sA ? parseFloat(sA.value) : 1;
    var x0 = sX ? parseFloat(sX.value) : 1;
    var showDecomp = cDec ? cDec.checked : true;
    var view = {xmin: -3.5, xmax: 3.5, ymin: -3.8, ymax: 3.8};
    var lastP = null;
    var TEAL = '#0d9488', ROSE = '#e11d48';

    var chApi = K.attachChallenge(canvas, {
      prompt: cfg.challengePrompt || {
        en: 'Explore hyperbolic functions: compare cosh(x) (the hanging-cable catenary) with ½eˣ + ½e⁻ˣ, then switch to tanh(x) or artanh(x) to inspect their horizontal and vertical asymptotes at ±1!',
        ar: 'استكشف الدوال الزائدية: قارن منحنى السلسلة المعلقة cosh(x) بمركّبتيه الأسيتين ½eˣ و½e⁻ˣ، ثم انتقل إلى tanh(x) أو artanh(x) لملاحظة خطوط التقارب عند ±1!'
      },
      check: function(st){
        return st.fnKey === 'tanh' || st.fnKey === 'artanh' || st.fnKey === 'arcosh' || Math.abs(st.x0) > 1.2;
      }
    });

    function draw(ctx, w, h){
      var C = K.colors();
      var S = HYPER_SPECS[fnKey] || HYPER_SPECS.cosh;
      var P = new K.Plot(ctx, w, h, view, {l: 34, r: 14, t: 22, b: 26});
      lastP = P;
      P.clear(); P.grid();

      if(S.va){
        for(var vi = 0; vi < S.va.length; vi++) P.vline(S.va[vi], ROSE, [5, 4], 1.5);
      }
      if(S.ha){
        for(var hi = 0; hi < S.ha.length; hi++) P.hline(aScale * S.ha[hi], ROSE, [5, 4], 1.5);
      }

      if(showDecomp && S.hasDecomp){
        P.curve(function(x){ return 0.5 * aScale * Math.exp(x); }, TEAL, 1.5, [4, 4]);
        P.curve(function(x){ return (fnKey === 'cosh' ? 0.5 : -0.5) * aScale * Math.exp(-x); }, '#94a3b8', 1.5, [4, 4]);
      }

      var fCur = function(x){ return aScale * S.evalFn(x); };
      if(fnKey === 'csch' || fnKey === 'coth'){
        P.curve(function(x){ return x < -0.05 ? fCur(x) : NaN; }, C.INDIGO, 2.8);
        P.curve(function(x){ return x > 0.05 ? fCur(x) : NaN; }, C.INDIGO, 2.8);
      } else {
        P.curve(fCur, C.INDIGO, 2.8);
      }

      var y0 = fCur(x0);
      var m0 = aScale * S.derivFn(x0);
      P.vline(x0, 'rgba(200,144,42,0.45)', [3, 3]);
      if(isFinite(y0)){
        if(showDecomp && isFinite(m0)){
          var L = 0.9;
          P.segment(x0 - L, y0 - m0*L, x0 + L, y0 + m0*L, C.AMBER2, 2.1);
        }
        P.dot(x0, y0, C.AMBER2, 5.8);
      }

      ctx.font = C.FONT;
      ctx.fillStyle = C.INDIGO;
      ctx.textAlign = 'left';
      ctx.textBaseline = 'top';
      var pref = Math.abs(aScale - 1) < 1e-6 ? '' : K.fmt(aScale, 2) + '·';
      ctx.fillText('y = ' + pref + S.name, P.pad.l, 4);

      var chVal = 0.5 * (Math.exp(x0) + Math.exp(-x0));
      var shVal = 0.5 * (Math.exp(x0) - Math.exp(-x0));
      var identVal = chVal*chVal - shVal*shVal;

      K._set(pfx + 'AV', K.fmt(aScale, 2));
      K._set(pfx + 'XV', K.fmt(x0, 2));
      K._set(pfx + 'Eq', S.name + '  |  ' + S.derivFormula);
      K._set(pfx + 'Val', isFinite(y0)
        ? ('f(' + K.fmt(x0, 2) + ') = ' + K.fmt(y0, 3) + '  ·  f\'(' + K.fmt(x0, 2) + ') = ' + (isFinite(m0) ? K.fmt(m0, 3) : '∞'))
        : 'Outside domain at x₀ = ' + K.fmt(x0, 2));
      K._set(pfx + 'DomRng', S.domRng.replace(/\ba\b/g, K.fmt(aScale, 2)));
      K._set(pfx + 'Asym', S.asym.replace(/\ba\b/g, K.fmt(aScale, 2)));
      K._set(pfx + 'Ident', 'cosh²(' + K.fmt(x0, 2) + ') − sinh²(' + K.fmt(x0, 2) + ') = ' + K.fmt(identVal, 3));

      if(dataDesc){
        dataDesc.textContent = 'Hyperbolic explorer: ' + S.name + ', scale a = ' + K.fmt(aScale, 2) + ', probe x₀ = ' + K.fmt(x0, 2) + '. ' + S.derivFormula + '.';
      }
      if(dataRows){
        var samples = [-2, -1.5, -1, -0.5, 0, 0.5, 1, 1.5, 2];
        var rows = [];
        for(var i = 0; i < samples.length; i++){
          var sx = samples[i], sy = fCur(sx), sd = aScale * S.derivFn(sx);
          rows.push([K.fmt(sx, 2), isFinite(sy) ? K.fmt(sy, 3) : 'undefined', isFinite(sd) ? K.fmt(sd, 3) : 'undefined']);
        }
        K.renderDataRows(dataRows, rows);
      }
      if(chApi) chApi.check({fnKey: fnKey, x0: x0, aScale: aScale});
    }

    K.register(canvas, draw);

    function sync(){
      if(sFn && HYPER_SPECS[sFn.value]){
        var nf = sFn.value;
        if(nf === 'arcosh' && x0 < 1){ x0 = 1.5; if(sX) sX.value = x0; }
        if(nf === 'artanh' && Math.abs(x0) >= 1){ x0 = 0.5; if(sX) sX.value = x0; }
        if((nf === 'csch' || nf === 'coth') && Math.abs(x0) < 0.1){ x0 = 1.0; if(sX) sX.value = x0; }
        fnKey = nf;
      }
      if(sA) aScale = parseFloat(sA.value);
      if(sX) x0 = parseFloat(sX.value);
      if(cDec) showDecomp = cDec.checked;
      K.redrawAll();
    }
    if(sFn) sFn.addEventListener('change', sync);
    if(sA){ sA.addEventListener('input', sync); sA.addEventListener('change', sync); }
    if(sX){ sX.addEventListener('input', sync); sX.addEventListener('change', sync); }
    if(cDec) cDec.addEventListener('change', sync);

    bindCssDrag(canvas, function(px){
      if(!lastP) return;
      var wx = Math.round(Math.max(-3, Math.min(3, lastP.invX(px))) * 20) / 20;
      x0 = wx;
      if(sX) sX.value = x0;
      K.redrawAll();
    });
    sync();
  };
})();
