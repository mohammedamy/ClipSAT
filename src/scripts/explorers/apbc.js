/* Canvas explorers for the apbc track (Plan 5 Phase 5.015, ADR 0039).
   Moved verbatim out of modules/02-core-app.js. build.js minifies this file to
   public/js/ex/apbc.js, which base.njk loads only on the apbc page, right after
   engine.js. The shared helpers come from window.CSExplorerKit (end of 02). The
   plot colours follow the theme, so they are re-read before every draw. */
(function(K){
  "use strict";
  if(!K) return;
  var makeDraggable=K.makeDraggable, attachChallenge=K.attachChallenge, fmt=K.fmt, Plot=K.Plot, redrawAll=K.redrawAll, wireDataToggle=K.wireDataToggle, renderDataRows=K.renderDataRows, dfdx=K.dfdx, integrate=K.integrate, arrow=K.arrow, _deg=K._deg, _fitView=K._fitView, _clip=K._clip, _set=K._set, _slider=K._slider, _num=K._num;
  var INK, INDIGO, INDIGO2, AMBER, AMBER2, LINE, GRID, MUTED, PAPER, WHITE, AXIS, FONT;
  function _colors(){ var c=K.colors(); INK=c.INK; INDIGO=c.INDIGO; INDIGO2=c.INDIGO2; AMBER=c.AMBER; AMBER2=c.AMBER2; LINE=c.LINE; GRID=c.GRID; MUTED=c.MUTED; PAPER=c.PAPER; WHITE=c.WHITE; AXIS=c.AXIS; FONT=c.FONT; }
  _colors();
  function register(canvas, drawFn){ K.register(canvas, function(){ _colors(); return drawFn.apply(this, arguments); }); }

  /* ===================== AP BC · POLAR ROSE ===================== */
  (function(){
    var canvas=document.getElementById('bcPolarCanvas'); if(!canvas) return;
    var k=3, s=document.getElementById('bcPolarK');
    var view={xmin:-1.3,xmax:1.3,ymin:-1.3,ymax:1.3};
    var dataBtn=document.getElementById('bcPolarDataBtn'), dataPanel=document.getElementById('bcPolarDataPanel'),
        dataDesc=document.getElementById('bcPolarDataDesc'), dataRows=document.getElementById('bcPolarDataRows');
    wireDataToggle(dataBtn,dataPanel);
    function updateDataView(petals){
      if(!dataDesc) return;
      if(petals === undefined) petals = (k%2===1 ? k : 2*k);
      dataDesc.textContent='Polar rose r = sin('+k+'θ), k = '+k+' ('+(k%2===1?'odd':'even')+'), giving '+petals+' petals. Sampled every 30° around one full turn:';
      var N=12, rows=[];
      for(var i=0;i<N;i++){ var th=i/N*2*Math.PI, r=Math.sin(k*th); rows.push([fmt(th),fmt(r),'('+fmt(r*Math.cos(th))+', '+fmt(r*Math.sin(th))+')']); }
      renderDataRows(dataRows,rows);
    }
    function draw(ctx,w,h){
      var P=new Plot(ctx,w,h,view,{l:18,r:12,t:12,b:18}); P.clear(); P.grid();
      ctx.beginPath();
      for(var i=0;i<=720;i++){ var th=i/720*2*Math.PI, r=Math.sin(k*th); var X=P.X(r*Math.cos(th)), Y=P.Y(r*Math.sin(th)); if(i===0)ctx.moveTo(X,Y); else ctx.lineTo(X,Y); }
      ctx.strokeStyle=INDIGO; ctx.lineWidth=2.2; ctx.lineJoin='round'; ctx.stroke();
      var petals=(k%2===1? k : 2*k);
      _set('bcPolarPetals', petals);
      updateDataView(petals);
    }
    register(canvas,draw);
    if(s){
      s.addEventListener('input',function(){
        k=parseInt(s.value,10);
        _set('bcPolarKV', k);
        updateDataView();
        redrawAll();
      });
    }
    updateDataView();
  })();

  /* ===================== AP BC · SERIES PARTIAL SUMS ===================== */
  (function(){
    var canvas=document.getElementById('bcSeriesCanvas'); if(!canvas) return;
    var N=4, s=document.getElementById('bcSeriesN');
    var view={xmin:0,xmax:13,ymin:0,ymax:1.2};
    var dataBtn=document.getElementById('bcSeriesDataBtn'), dataPanel=document.getElementById('bcSeriesDataPanel'),
        dataDesc=document.getElementById('bcSeriesDataDesc'), dataRows=document.getElementById('bcSeriesDataRows');
    wireDataToggle(dataBtn,dataPanel);
    function S(n){ return 1-Math.pow(0.5,n); }
    function updateDataView(){
      if(!dataDesc) return;
      dataDesc.textContent='Series Σ(1/2)ⁿ, partial sums S(n) = 1 − (1/2)ⁿ. Limit as n→∞ is 1. At n = '+N+', S(n) = '+fmt(S(N),4)+' (distance from limit: '+fmt(1-S(N),4)+').';
      var rows=[];
      for(var nn=1;nn<=N;nn++){ rows.push([nn,fmt(S(nn),4)]); }
      renderDataRows(dataRows,rows);
    }
    function draw(ctx,w,h){
      var P=new Plot(ctx,w,h,view,{l:26,r:12,t:12,b:20}); P.clear(); P.grid();
      P.segment(0,1,13,1, AMBER2, 1.6, [6,4]); // limit
      var prevX=null, prevY=null;
      for(var nn=1;nn<=N;nn++){ var y=S(nn);
        if(prevX!==null) P.segment(prevX,prevY,nn,y,INDIGO2,1.6);
        P.dot(nn,y,INDIGO,4); prevX=nn; prevY=y;
      }
      _set('bcSeriesSn', S(N).toFixed(4));
      updateDataView();
    }
    register(canvas,draw);
    if(s){
      s.addEventListener('input',function(){
        N=parseInt(s.value,10);
        _set('bcSeriesNV', N);
        updateDataView();
        redrawAll();
      });
    }
    updateDataView();
  })();

  /* ===================== AP BC · TAYLOR POLYNOMIAL ===================== */
  (function(){
    var canvas=document.getElementById('bcTaylorCanvas'); if(!canvas) return;
    var terms=3, s=document.getElementById('bcTaylorN');
    var view={xmin:-6.6,xmax:6.6,ymin:-2.4,ymax:2.4};
    var dataBtn=document.getElementById('bcTaylorDataBtn'), dataPanel=document.getElementById('bcTaylorDataPanel'),
        dataDesc=document.getElementById('bcTaylorDataDesc'), dataRows=document.getElementById('bcTaylorDataRows');
    wireDataToggle(dataBtn,dataPanel);
    function fact(k){ var r=1; for(var i=2;i<=k;i++) r*=i; return r; }
    function T(x){ var sum=0; for(var k=0;k<terms;k++){ sum += Math.pow(-1,k)*Math.pow(x,2*k+1)/fact(2*k+1); } return sum; }
    function updateDataView(deg){
      if(!dataDesc) return;
      if(deg === undefined) deg = (2*terms-1);
      dataDesc.textContent='Maclaurin polynomial of sin(x), degree '+deg+' ('+terms+' term'+(terms===1?'':'s')+'), plotted against the real sin(x).';
      var N=9, rows=[];
      for(var i=0;i<N;i++){ var x=view.xmin+(view.xmax-view.xmin)*i/(N-1); rows.push([fmt(x),fmt(Math.sin(x)),fmt(T(x))]); }
      renderDataRows(dataRows,rows);
    }
    function draw(ctx,w,h){
      var P=new Plot(ctx,w,h,view,{l:24,r:12,t:12,b:20}); P.clear(); P.grid();
      P.curve(function(x){return Math.sin(x);}, INDIGO, 2.4);
      P.curve(T, AMBER2, 2.4);
      var deg=(2*terms-1);
      _set('bcTaylorDeg', deg);
      updateDataView(deg);
    }
    register(canvas,draw);
    if(s){
      s.addEventListener('input',function(){
        terms=parseInt(s.value,10);
        _set('bcTaylorNV', terms);
        updateDataView();
        redrawAll();
      });
    }
    updateDataView();
  })();

  /* ===================== CONTINUITY CASES EXPLORER ===================== */
  function initContExplorer(pfx){
    var canvas=document.getElementById(pfx+'Canvas'); if(!canvas) return;
    var sX=document.getElementById(pfx+'X'), sCase=document.getElementById(pfx+'Case');
    var elXV=document.getElementById(pfx+'XV'), elXOut=document.getElementById(pfx+'XOut'),
        elFxOut=document.getElementById(pfx+'FxOut'), elLeftLim=document.getElementById(pfx+'LeftLim'),
        elRightLim=document.getElementById(pfx+'RightLim'), elStatus=document.getElementById(pfx+'Status');
    var dataBtn=document.getElementById(pfx+'DataBtn'), dataPanel=document.getElementById(pfx+'DataPanel'),
        dataDesc=document.getElementById(pfx+'DataDesc'), dataRows=document.getElementById(pfx+'DataRows');
    wireDataToggle(dataBtn,dataPanel);

    var cVal = 1;
    var currCase = 'cont';
    var xVal = 0.525;
    var view = {xmin: -0.5, xmax: 2.5, ymin: -2, ymax: 5};

    function evalCase(tCase, x){
      var eps = 1e-6;
      if(tCase === 'cont'){
        var y = 0.5*(x-cVal)*(x-cVal) + 1.5;
        return {
          y: y, leftLim: '1.500', rightLim: '1.500', fAtC: 1.5,
          name: 'Case 1 · Continuous',
          cond1: true, cond2: true, cond3: true,
          status: 'Continuous at c = 1 ✔ (f(c)=1.5, lim=1.5)'
        };
      } else if(tCase === 'hole'){
        var isHole = Math.abs(x - cVal) < eps;
        return {
          y: isHole ? null : (x + 1), leftLim: '2.000', rightLim: '2.000', fAtC: null,
          name: 'Case 2 · Removable (Hole)',
          cond1: false, cond2: true, cond3: false,
          status: 'Removable Discontinuity ❌ (f(1) is undefined)'
        };
      } else if(tCase === 'pt'){
        var isPt = Math.abs(x - cVal) < eps;
        return {
          y: isPt ? 3.8 : (x + 1), leftLim: '2.000', rightLim: '2.000', fAtC: 3.8,
          name: 'Case 3 · Removable (Displaced Point)',
          cond1: true, cond2: true, cond3: false,
          status: 'Removable Discontinuity ❌ (f(1)=3.8 ≠ lim=2.0)'
        };
      } else if(tCase === 'jump'){
        var yJump = x < cVal ? (x + 0.5) : (x + 2);
        return {
          y: yJump, leftLim: '1.500', rightLim: '3.000', fAtC: 3.0,
          name: 'Case 4 · Jump Discontinuity',
          cond1: true, cond2: false, cond3: false,
          status: 'Jump Discontinuity ❌ (lim x→1⁻ ≠ lim x→1⁺)'
        };
      } else if(tCase === 'inf'){
        var isInf = Math.abs(x - cVal) < eps;
        var yInf = isInf ? null : 1 / (x - cVal);
        return {
          y: yInf, leftLim: '−∞', rightLim: '+∞', fAtC: null,
          name: 'Case 5 · Infinite Discontinuity',
          cond1: false, cond2: false, cond3: false,
          status: 'Infinite Discontinuity ❌ (Vertical asymptote x = 1)'
        };
      } else {
        var isOsc = Math.abs(x - cVal) < eps;
        var yOsc = isOsc ? 0 : Math.sin(2 / (x - cVal));
        return {
          y: yOsc, leftLim: 'DNE (oscillates)', rightLim: 'DNE (oscillates)', fAtC: 0,
          name: 'Case 6 · Oscillating Discontinuity',
          cond1: true, cond2: false, cond3: false,
          status: 'Essential Discontinuity ❌ (Infinitely oscillates in [−1, 1])'
        };
      }
    }

    function updateDataView(){
      if(!dataDesc) return;
      var cur = evalCase(currCase, xVal);
      var yStr = cur.y === null ? 'undefined' : fmt(cur.y, 3);
      dataDesc.textContent = 'Continuity Analysis for ' + cur.name + ' at c = 1. Current input probe x = ' + fmt(xVal, 3) + ', output f(x) = ' + yStr + '. Left-hand limit: ' + cur.leftLim + ', Right-hand limit: ' + cur.rightLim + '. Continuity Checklist: (1) f(c) defined: ' + (cur.cond1 ? 'Yes' : 'No') + '; (2) lim exists: ' + (cur.cond2 ? 'Yes' : 'No') + '; (3) lim = f(c): ' + (cur.cond3 ? 'Yes' : 'No') + '. Conclusion: ' + cur.status + '.';

      var rows = [];
      var samplePoints = [0.0, 0.5, 0.8, 0.95, 0.99, 1.0, 1.01, 1.05, 1.2, 1.5, 2.0];
      for(var i=0; i<samplePoints.length; i++){
        var px = samplePoints[i];
        var pInfo = evalCase(currCase, px);
        var pY = pInfo.y === null ? 'undefined' : fmt(pInfo.y, 3);
        rows.push([fmt(px, 2), pY, pInfo.leftLim, pInfo.rightLim, pInfo.status]);
      }
      renderDataRows(dataRows, rows);
    }

    function draw(ctx, w, h){
      var P = new Plot(ctx, w, h, view, {l: 34, r: 14, t: 16, b: 26});
      P.clear(); P.grid();

      var cur = evalCase(currCase, xVal);

      if(currCase === 'cont'){
        P.curve(function(x){ return 0.5*(x-cVal)*(x-cVal) + 1.5; }, INDIGO, 2.6);
        P.dot(cVal, 1.5, INDIGO, 5.5);
      } else if(currCase === 'hole'){
        P.curve(function(x){ return x + 1; }, INDIGO, 2.6);
        P.ring(cVal, 2.0, INDIGO, 5.5);
      } else if(currCase === 'pt'){
        P.curve(function(x){ return x + 1; }, INDIGO, 2.6);
        P.ring(cVal, 2.0, INDIGO, 5.5);
        P.dot(cVal, 3.8, AMBER2, 6.0);
      } else if(currCase === 'jump'){
        var cLeft = ctx; cLeft.save(); cLeft.beginPath();
        cLeft.rect(P.pad.l, P.pad.t, P.X(cVal) - P.pad.l, P.h - P.pad.t - P.pad.b); cLeft.clip();
        P.curve(function(x){ return x + 0.5; }, INDIGO, 2.6);
        cLeft.restore();
        var cRight = ctx; cRight.save(); cRight.beginPath();
        cRight.rect(P.X(cVal), P.pad.t, P.w - P.pad.r - P.X(cVal), P.h - P.pad.t - P.pad.b); cRight.clip();
        P.curve(function(x){ return x + 2.0; }, INDIGO, 2.6);
        cRight.restore();
        P.ring(cVal, 1.5, INDIGO, 5.5);
        P.dot(cVal, 3.0, INDIGO, 5.5);
      } else if(currCase === 'inf'){
        P.vline(cVal, '#e11d48', [5, 4]);
        var cLInf = ctx; cLInf.save(); cLInf.beginPath();
        cLInf.rect(P.pad.l, P.pad.t, P.X(cVal) - P.pad.l, P.h - P.pad.t - P.pad.b); cLInf.clip();
        P.curve(function(x){ return 1/(x-cVal); }, INDIGO, 2.4);
        cLInf.restore();
        var cRInf = ctx; cRInf.save(); cRInf.beginPath();
        cRInf.rect(P.X(cVal), P.pad.t, P.w - P.pad.r - P.X(cVal), P.h - P.pad.t - P.pad.b); cRInf.clip();
        P.curve(function(x){ return 1/(x-cVal); }, INDIGO, 2.4);
        cRInf.restore();
      } else if(currCase === 'osc'){
        P.curve(function(x){
          if(Math.abs(x - cVal) < 0.005) return null;
          return Math.sin(2 / (x - cVal));
        }, INDIGO, 1.8);
        P.dot(cVal, 0, AMBER2, 4.5);
      }

      P.vline(xVal, 'rgba(184,128,31,.45)', [4, 4]);
      if(cur.y !== null && isFinite(cur.y) && cur.y >= view.ymin && cur.y <= view.ymax){
        P.dot(xVal, cur.y, AMBER2, 5.5);
        P.segment(xVal, 0, xVal, cur.y, 'rgba(184,128,31,.35)', 1.2, [3, 3]);
      }

      _set(pfx+'XV', fmt(xVal, 2));
      _set(pfx+'XOut', fmt(xVal, 3));
      _set(pfx+'FxOut', cur.y === null ? 'undefined' : fmt(cur.y, 3));
      _set(pfx+'LeftLim', cur.leftLim);
      _set(pfx+'RightLim', cur.rightLim);
      _set(pfx+'Status', cur.status);

      updateDataView();
    }

    register(canvas, draw);

    function syncState(){
      if(sCase) currCase = sCase.value;
      if(sX){
        var raw = parseFloat(sX.value);
        xVal = 1.0 + (raw / 20) * 0.95;
        if(Math.abs(xVal - 1.0) < 0.01) xVal = raw < 0 ? 0.985 : 1.015;
      }
      updateDataView();
      redrawAll();
    }

    if(sX){ sX.addEventListener('input', syncState); sX.addEventListener('change', syncState); }
    if(sCase){ sCase.addEventListener('change', syncState); }
    syncState();
  }

  /* ===================== EPSILON-N SEQUENCE LIMIT EXPLORER ===================== */
  function initSeqLimExplorer(pfx){
    var canvas=document.getElementById(pfx+'Canvas'); if(!canvas) return;
    var sEps=document.getElementById(pfx+'Eps'), sN=document.getElementById(pfx+'N');
    var dataBtn=document.getElementById(pfx+'DataBtn'), dataPanel=document.getElementById(pfx+'DataPanel'),
        dataDesc=document.getElementById(pfx+'DataDesc'), dataRows=document.getElementById(pfx+'DataRows');
    wireDataToggle(dataBtn,dataPanel);

    var LVal = 1.5;
    function seqTerm(n){ return (3*n - 1) / (2*n + 5); }
    var view = {xmin: 0, xmax: 32, ymin: 0.2, ymax: 2.0};

    var epsVal = 0.20, nCutoff = 10;

    function getMinN(eps){
      var raw = (17 / eps - 10) / 4;
      return Math.max(1, Math.ceil(raw));
    }

    function updateDataView(){
      if(!dataDesc) return;
      var minN = getMinN(epsVal);
      var isValid = nCutoff >= minN;
      dataDesc.textContent = 'Precise (ε, N) limit definition for sequence a_n = (3n − 1)/(2n + 5) converging to L = 1.5. Chosen tolerance ε = ' + fmt(epsVal, 2) + ' (corridor [' + fmt(LVal - epsVal, 2) + ', ' + fmt(LVal + epsVal, 2) + ']). Cutoff index N = ' + nCutoff + '. Minimum required index N* = ' + minN + '. For all terms n > ' + nCutoff + ', terms are ' + (isValid ? 'ALL SAFELY CONTAINED inside corridor ✔' : 'ESCAPING the corridor (increase N to ≥ ' + minN + ') ❌') + '.';

      var rows = [];
      for(var n=1; n<=Math.min(25, view.xmax); n++){
        var val = seqTerm(n);
        var diff = Math.abs(val - LVal);
        var inCorridor = diff < epsVal;
        var role = (n <= nCutoff) ? 'Pre-cutoff (n ≤ N)' : (inCorridor ? 'Post-cutoff (Inside ✔)' : 'Post-cutoff (Escapes ❌)');
        rows.push([n, fmt(val, 3), fmt(diff, 3), role]);
      }
      renderDataRows(dataRows, rows);
    }

    function draw(ctx, w, h){
      var P = new Plot(ctx, w, h, view, {l: 34, r: 14, t: 16, b: 26});
      P.clear(); P.grid();

      var minN = getMinN(epsVal);
      var isValid = nCutoff >= minN;

      var Ytop = P.Y(LVal + epsVal), Ybot = P.Y(LVal - epsVal);
      ctx.fillStyle = isValid ? 'rgba(16, 185, 129, 0.12)' : 'rgba(239, 68, 68, 0.12)';
      ctx.fillRect(P.pad.l, Ytop, P.w - P.pad.l - P.pad.r, Ybot - Ytop);

      P.segment(0, LVal + epsVal, view.xmax, LVal + epsVal, isValid ? '#10b981' : '#ef4444', 1.2, [4, 4]);
      P.segment(0, LVal - epsVal, view.xmax, LVal - epsVal, isValid ? '#10b981' : '#ef4444', 1.2, [4, 4]);

      P.segment(0, LVal, view.xmax, LVal, AMBER2, 1.4, [6, 4]);
      P.vline(nCutoff, INDIGO2, [5, 4]);

      for(var n=1; n<=view.xmax; n++){
        var val = seqTerm(n);
        var diff = Math.abs(val - LVal);
        var inCorridor = diff < epsVal;

        if(n <= nCutoff){
          P.dot(n, val, '#94a3b8', 3.5);
        } else {
          P.dot(n, val, inCorridor ? '#10b981' : '#ef4444', 5.0);
        }
      }

      _set(pfx+'EpsV', fmt(epsVal, 2));
      _set(pfx+'NV', nCutoff);
      _set(pfx+'MinN', minN);
      var elStatus = document.getElementById(pfx+'Status');
      if(elStatus){
        elStatus.textContent = isValid ? 'All terms past N inside corridor ✔' : 'Escapes: need N ≥ ' + minN + ' ❌';
        elStatus.style.color = isValid ? 'var(--emerald, #10b981)' : 'var(--crimson, #ef4444)';
      }

      updateDataView();
    }

    register(canvas, draw);

    function syncState(){
      if(sEps) epsVal = parseFloat(sEps.value);
      if(sN) nCutoff = parseInt(sN.value, 10);
      updateDataView();
      redrawAll();
    }

    if(sEps){ sEps.addEventListener('input', syncState); sEps.addEventListener('change', syncState); }
    if(sN){ sN.addEventListener('input', syncState); sN.addEventListener('change', syncState); }
    syncState();
  }

  /* ===================== EULER'S METHOD EXPLORER ===================== */
  function initEulerExplorer(pfx){
    var canvas=document.getElementById(pfx+'Canvas'); if(!canvas) return;
    var sH=document.getElementById(pfx+'H'), sSteps=document.getElementById(pfx+'Steps');
    var dataBtn=document.getElementById(pfx+'DataBtn'), dataPanel=document.getElementById(pfx+'DataPanel'),
        dataDesc=document.getElementById(pfx+'DataDesc'), dataRows=document.getElementById(pfx+'DataRows');
    wireDataToggle(dataBtn,dataPanel);

    // Differential equation: dy/dx = x - y, y(0) = 1.
    // Exact analytical solution: y(x) = x - 1 + 2 * exp(-x).
    // y''(x) = 2 * exp(-x) > 0 for all x -> strictly concave up -> tangent lines underestimate.
    function fSlope(x, y){ return x - y; }
    function yExact(x){ return x - 1 + 2 * Math.exp(-x); }

    var hStep = 0.25;
    var numSteps = 4;
    var view = {xmin: -0.2, xmax: 2.8, ymin: 0.5, ymax: 2.5};

    function computeEuler(){
      var pts = [{step: 0, x: 0, yApprox: 1.0, yTrue: 1.0, slope: fSlope(0, 1.0), err: 0}];
      var curX = 0, curY = 1.0;
      for(var i=1; i<=numSteps; i++){
        var slope = fSlope(curX, curY);
        curY = curY + slope * hStep;
        curX = curX + hStep;
        var yTrue = yExact(curX);
        var err = Math.abs(curY - yTrue);
        pts.push({step: i, x: curX, yApprox: curY, yTrue: yTrue, slope: fSlope(curX, curY), err: err});
      }
      return pts;
    }

    function updateDataView(){
      if(!dataDesc) return;
      var pts = computeEuler();
      var last = pts[pts.length - 1];
      dataDesc.textContent = "Euler's method for dy/dx = x − y with y(0) = 1. Step size Δx = " + fmt(hStep, 2) + ", total steps = " + numSteps + ". Final point at x = " + fmt(last.x, 2) + ": Euler y = " + fmt(last.yApprox, 4) + ", Exact y = " + fmt(last.yTrue, 4) + ", Absolute Error = " + fmt(last.err, 4) + ". Because y'' = 2e^(−x) > 0 (concave up), tangent segments lie below the curve, producing a certified Underestimate.";
      var rows = [];
      for(var i=0; i<pts.length; i++){
        var p = pts[i];
        rows.push([p.step, fmt(p.x, 2), fmt(p.yApprox, 4), fmt(p.yTrue, 4), fmt(p.err, 4)]);
      }
      renderDataRows(dataRows, rows);
    }

    function draw(ctx, w, h){
      var P = new Plot(ctx, w, h, view, {l: 30, r: 14, t: 14, b: 24});
      P.clear(); P.grid();

      // Draw exact solution curve
      P.curve(yExact, INDIGO, 2.4);

      // Draw Euler polygonal path
      var pts = computeEuler();
      for(var i=0; i<pts.length - 1; i++){
        var p0 = pts[i], p1 = pts[i+1];
        P.segment(p0.x, p0.yApprox, p1.x, p1.yApprox, AMBER2, 2.2);
        P.dot(p0.x, p0.yApprox, AMBER2, 4.5);
      }
      var last = pts[pts.length - 1];
      P.dot(last.x, last.yApprox, AMBER, 5.5);
      P.dot(last.x, last.yTrue, INDIGO, 5.0);
      P.segment(last.x, last.yApprox, last.x, last.yTrue, '#ef4444', 1.4, [3, 3]);

      _set(pfx+'HV', fmt(hStep, 2));
      _set(pfx+'StepsV', numSteps);
      _set(pfx+'ApproxOut', fmt(last.yApprox, 4));
      _set(pfx+'ExactOut', fmt(last.yTrue, 4));
      _set(pfx+'ErrOut', fmt(last.err, 4));
      _set(pfx+'Concavity', "Concave Up (Underestimate)");

      updateDataView();
    }

    register(canvas, draw);

    function syncState(){
      if(sH) hStep = parseFloat(sH.value);
      if(sSteps) numSteps = parseInt(sSteps.value, 10);
      updateDataView();
      redrawAll();
    }

    if(sH){ sH.addEventListener('input', syncState); sH.addEventListener('change', syncState); }
    if(sSteps){ sSteps.addEventListener('input', syncState); sSteps.addEventListener('change', syncState); }
    syncState();
  }

  /* ===================== PARAMETRIC MOTION & VECTORS EXPLORER ===================== */
  function initParamExplorer(pfx){
    var canvas=document.getElementById(pfx+'Canvas'); if(!canvas) return;
    var sT=document.getElementById(pfx+'T');
    var dataBtn=document.getElementById(pfx+'DataBtn'), dataPanel=document.getElementById(pfx+'DataPanel'),
        dataDesc=document.getElementById(pfx+'DataDesc'), dataRows=document.getElementById(pfx+'DataRows');
    wireDataToggle(dataBtn,dataPanel);

    // Parametric curve: x(t) = 2.4 * cos(t), y(t) = 1.8 * sin(2t)
    // vx(t) = -2.4 * sin(t), vy(t) = 3.6 * cos(2t)
    // ax(t) = -2.4 * cos(t), ay(t) = -7.2 * sin(2t)
    function rX(t){ return 2.4 * Math.cos(t); }
    function rY(t){ return 1.8 * Math.sin(2*t); }
    function vX(t){ return -2.4 * Math.sin(t); }
    function vY(t){ return 3.6 * Math.cos(2*t); }
    function aX(t){ return -2.4 * Math.cos(t); }
    function aY(t){ return -7.2 * Math.sin(2*t); }

    var tVal = 1.0;
    var view = {xmin: -3.2, xmax: 3.2, ymin: -2.4, ymax: 2.4};

    function updateDataView(){
      if(!dataDesc) return;
      var px = rX(tVal), py = rY(tVal);
      var vx = vX(tVal), vy = vY(tVal);
      var speed = Math.hypot(vx, vy);
      var slope = Math.abs(vx) < 1e-4 ? 'Vertical (undefined)' : fmt(vy / vx, 3);
      dataDesc.textContent = "Parametric motion along x(t) = 2.4cos(t), y(t) = 1.8sin(2t). At time t = " + fmt(tVal, 2) + " rad: Position = (" + fmt(px, 2) + ", " + fmt(py, 2) + "), Velocity vector = <" + fmt(vx, 2) + ", " + fmt(vy, 2) + ">, Speed |v| = " + fmt(speed, 3) + ", Tangent slope dy/dx = " + slope + ".";
      var rows = [];
      var sampleN = 12;
      for(var i=0; i<sampleN; i++){
        var st = (i / sampleN) * 2 * Math.PI;
        var sx = rX(st), sy = rY(st);
        var svx = vX(st), svy = vY(st);
        var sp = Math.hypot(svx, svy);
        var sl = Math.abs(svx) < 1e-4 ? 'undef' : fmt(svy / svx, 2);
        rows.push([fmt(st, 2), '(' + fmt(sx, 2) + ', ' + fmt(sy, 2) + ')', '<' + fmt(svx, 2) + ', ' + fmt(svy, 2) + '>', fmt(sp, 2), sl]);
      }
      renderDataRows(dataRows, rows);
    }

    function draw(ctx, w, h){
      var P = new Plot(ctx, w, h, view, {l: 22, r: 14, t: 14, b: 22});
      P.clear(); P.grid();

      // Draw full parametric trajectory
      ctx.beginPath();
      var N = 200;
      for(var i=0; i<=N; i++){
        var t = (i / N) * 2 * Math.PI;
        var X = P.X(rX(t)), Y = P.Y(rY(t));
        if(i === 0) ctx.moveTo(X, Y); else ctx.lineTo(X, Y);
      }
      ctx.strokeStyle = INDIGO; ctx.lineWidth = 2.0; ctx.stroke();

      var px = rX(tVal), py = rY(tVal);
      var vx = vX(tVal), vy = vY(tVal);
      var ax = aX(tVal), ay = aY(tVal);
      var speed = Math.hypot(vx, vy);

      // Draw velocity vector (scaled for display: 0.35x)
      var vScale = 0.35;
      arrow(ctx, P.X(px), P.Y(py), P.X(px + vx * vScale), P.Y(py + vy * vScale), AMBER2, 2.2);

      // Draw acceleration vector (scaled for display: 0.15x)
      var aScale = 0.15;
      arrow(ctx, P.X(px), P.Y(py), P.X(px + ax * aScale), P.Y(py + ay * aScale), '#10b981', 1.8);

      // Particle dot
      P.dot(px, py, INDIGO, 5.5);

      var slopeStr = Math.abs(vx) < 1e-4 ? 'undefined' : fmt(vy / vx, 3);
      _set(pfx+'TV', fmt(tVal, 2));
      _set(pfx+'PosOut', '(' + fmt(px, 2) + ', ' + fmt(py, 2) + ')');
      _set(pfx+'VelOut', '<' + fmt(vx, 2) + ', ' + fmt(vy, 2) + '>');
      _set(pfx+'SpeedOut', fmt(speed, 3));
      _set(pfx+'SlopeOut', slopeStr);

      updateDataView();
    }

    register(canvas, draw);

    function syncState(){
      if(sT) tVal = parseFloat(sT.value);
      updateDataView();
      redrawAll();
    }

    if(sT){ sT.addEventListener('input', syncState); sT.addEventListener('change', syncState); }
    syncState();
  }

  // Initialize apbc track explorers
  initContExplorer('apbcCont');
  initSeqLimExplorer('apbcSeq');
  initEulerExplorer('apbcEuler');
  initParamExplorer('apbcParam');


  /* ===================== BESPOKE TOPIC-SPECIFIC EXPLORERS ===================== */
  function _mountBespokeExplorer(cfg){
    var canvas = document.getElementById(cfg.canvasId);
    if(!canvas || canvas._bespokeMounted) return;
    canvas._bespokeMounted = true;

    var _elS0 = document.getElementById(cfg.s0Id), _elS1 = document.getElementById(cfg.s1Id);
    var _elV0 = document.getElementById(cfg.v0Id), _elV1 = document.getElementById(cfg.v1Id);
    var _elR0 = document.getElementById(cfg.r0Id), _elR1 = document.getElementById(cfg.r1Id), _elR2 = document.getElementById(cfg.r2Id);
    var dBtn = document.getElementById(cfg.dataBtnId), dPanel = document.getElementById(cfg.dataPanelId),
        dDesc = document.getElementById(cfg.dataDescId), dRows = document.getElementById(cfg.dataRowsId);
    wireDataToggle(dBtn, dPanel);

    var mode = cfg.mode;
    var view = cfg.square ? {xmin:-5, xmax:5, ymin:-4.5, ymax:4.5, square:true, step:1} : {xmin:-4.5, xmax:4.5, ymin:-3.8, ymax:4.2};
    if(mode==='pacing_score') view = {xmin:0, xmax:5, ymin:0, ymax:135};
    else if(mode==='crv_pdf') view = {xmin:-0.3, xmax:4.4, ymin:-0.05, ymax:0.48};
    else if(mode==='slopefield') view = {xmin:0, xmax:4.5, ymin:-0.3, ymax:5.2};
    else if(mode==='ztest' || mode==='emp_rule') view = {xmin:-3.6, xmax:3.6, ymin:-0.04, ymax:0.46};
    else if(mode==='trapezium') view = {xmin:-0.3, xmax:5.4, ymin:-0.1, ymax:1.15};
    else if(mode==='cobweb') view = {xmin:0, xmax:4.2, ymin:0, ymax:4.2, square:true, step:1};
    else if(mode==='poisson' || mode==='binomial' || mode==='geom_wait') view = {xmin:-0.8, xmax:12.8, ymin:0, ymax:0.45};
    else if(mode==='clt_ci') view = {xmin:-3.5, xmax:3.5, ymin:-0.05, ymax:0.95};
    else if(mode==='harmonic') view = {xmin:0, xmax:6.5, ymin:-5.8, ymax:5.8};
    else if(mode==='euclid_gcd') view = {xmin:-2, xmax:52, ymin:-4, ymax:52, square:true, step:10};
    else if(mode==='geom_series') view = {xmin:0, xmax:9, ymin:-2.5, ymax:12};
    else if(mode==='kinematics' || mode==='suvat') view = {xmin:0, xmax:5.2, ymin:-5.5, ymax:9.5};
    else if(mode==='linear_law' || mode==='exp_doubling') view = {xmin:-1.5, xmax:4.2, ymin:-2.0, ymax:9.5};
    else if(mode==='boxplot') view = {xmin:2, xmax:32, ymin:0, ymax:6};
    else if(mode==='rate_accum') view = {xmin:0, xmax:6.2, ymin:0, ymax:6.5};
    else if(mode==='ogive') view = {xmin:0, xmax:7, ymin:0, ymax:108};
    else if(mode==='drv_spike') view = {xmin:0.2, xmax:5.8, ymin:-0.06, ymax:0.48};
    else if(mode==='incline_energy' || mode==='forces_eq') view = {xmin:-1, xmax:6.5, ymin:-1, ymax:5.5, square:true, step:1};
    else if(mode==='atwood') view = {xmin:-3.5, xmax:3.5, ymin:-4.5, ymax:2.5, square:true, step:1};
    else if(mode==='venn_prob') view = {xmin:-4.2, xmax:4.2, ymin:-2.8, ymax:2.8, square:true, step:1};
    else if(mode==='cast_circle') view = {xmin:-2.2, xmax:5.2, ymin:-1.8, ymax:1.8, square:true, step:1};
    else if(mode==='usub') view = {xmin:-0.2, xmax:5.2, ymin:-1.3, ymax:2.4};
    else if(mode==='contingency' || mode==='bayes_rule') view = {xmin:0, xmax:4.5, ymin:0, ymax:1.15};
    else if(mode==='similar_solids' || mode==='cavalieri') view = {xmin:-4.8, xmax:5.2, ymin:-0.8, ymax:5.8, square:true, step:1};
    else if(mode==='data_transform') view = {xmin:-6, xmax:9, ymin:0, ymax:4};
    else if(mode==='error_bounds') view = {xmin:-0.5, xmax:9.5, ymin:-0.5, ymax:6.0, square:true, step:1};
    else if(mode==='hist_density') view = {xmin:0, xmax:6.8, ymin:0, ymax:32};
    else if(mode==='mle_gauss') view = {xmin:-3.5, xmax:5.0, ymin:-0.45, ymax:0.65};
    else if(mode==='grad_descent') view = {xmin:-3.5, xmax:5.0, ymin:-0.5, ymax:14.0};
    else if(mode==='sigmoid_log') view = {xmin:-4.2, xmax:4.2, ymin:-0.15, ymax:1.2};
    else if(mode==='cosine_embed') view = {xmin:-1.5, xmax:1.5, ymin:-1.5, ymax:1.5, square:true, step:0.5};
    else if(mode==='heaviside_laplace' || mode==='resonance_beats' || mode==='wronskian_green') view = {xmin:0, xmax:6.5, ymin:-3.2, ymax:3.2};

    var chApi = attachChallenge(canvas, {
      prompt: cfg.challengePrompt,
      check: function(st){ return cfg.checkFn(st.a, st.b); }
    });

    function _erf(x){
      var sg = x < 0 ? -1 : 1; x = Math.abs(x);
      var t = 1 / (1 + 0.3275911 * x);
      var y = 1 - (((((1.061405429 * t - 1.453152027) * t) + 1.421413741) * t - 0.284496736) * t + 0.254829592) * t * Math.exp(-x * x);
      return sg * y;
    }
    function _comb(n, k){
      if(k<0 || k>n) return 0;
      k = Math.min(k, n - k);
      var res = 1;
      for(var i=1; i<=k; i++) res = res * (n - k + i) / i;
      return Math.round(res);
    }
    function _fact(n){ var r=1; for(var i=2;i<=n;i++) r*=i; return r; }

    var lastP = null;
    function draw(ctx, w, h){
      var P = new Plot(ctx, w, h, view, {l:34, r:14, t:14, b:24});
      lastP = P;
      P.clear(); P.grid();
      var a = _elS0 ? parseFloat(_elS0.value) : cfg.s0Val;
      var b = _elS1 ? parseFloat(_elS1.value) : cfg.s1Val;
      if(_elV0) _elV0.textContent = fmt(a, cfg.s0Step < 0.1 ? 2 : (cfg.s0Step < 1 ? 1 : 0));
      if(_elV1) _elV1.textContent = fmt(b, cfg.s1Step < 0.1 ? 2 : (cfg.s1Step < 1 ? 1 : 0));

      var out0 = '—', out1 = '—', out2 = '—', rows = [];
      var TEAL = '#0E9F8F';

      if(mode === 'pacing_score'){
        var tot = a + b, maxTot = (_elS0 && parseFloat(_elS0.max) > 40) ? 125 : ((_elS0 && parseFloat(_elS0.max) === 45) ? 108 : 50);
        if(_elS0 && parseFloat(_elS0.max) === 20 && _elS1 && parseFloat(_elS1.max) === 38) maxTot = 58;
        var cutAStar = maxTot * 0.84, cutA = maxTot * 0.72, cutB = maxTot * 0.60;
        P.polygon([[0.6,0],[1.4,0],[1.4,a],[0.6,a]], 'rgba(30,58,110,0.25)', INDIGO, 2);
        P.polygon([[1.8,0],[2.6,0],[2.6,b],[1.8,b]], 'rgba(14,159,143,0.25)', TEAL, 2);
        P.polygon([[3.1,0],[4.1,0],[4.1,tot],[3.1,tot]], 'rgba(200,144,42,0.32)', AMBER2, 2.4);
        P.hline(cutAStar, AMBER2, [4,4]); P.hline(cutA, INDIGO, [3,3]); P.hline(cutB, TEAL, [2,3]);
        P.label(0.7, a + 4, 'Sec 1: '+fmt(a,0), INDIGO);
        P.label(1.9, b + 4, 'Sec 2: '+fmt(b,0), TEAL);
        P.label(3.2, tot + 4, 'Total: '+fmt(tot,0), AMBER2);
        var band = tot >= cutAStar ? 'Top Tier (A* / 5 / 760+)' : (tot >= cutA ? 'High Tier (A / 4 / 680+)' : (tot >= cutB ? 'Target Tier (B / 3 / 600+)' : 'Developing'));
        out0 = fmt(tot,0) + ' / ' + maxTot;
        out1 = band;
        out2 = fmt(60 / Math.max(1, tot), 2) + ' min/pt';
        rows.push(['Section 1 Raw', fmt(a,0)], ['Section 2 Raw', fmt(b,0)], ['Combined Total', out0], ['Grade Tier', band]);
      } else if(mode === 'pfrac'){
        var f1 = function(x){ return Math.abs(x+1)<0.08 ? NaN : a/(x+1); };
        var f2 = function(x){ return Math.abs(x-2)<0.08 ? NaN : b/(x-2); };
        var fSum = function(x){ return (Math.abs(x+1)<0.08 || Math.abs(x-2)<0.08) ? NaN : a/(x+1) + b/(x-2); };
        P.vline(-1, AMBER2, [4,4]); P.vline(2, TEAL, [4,4]);
        P.curve(f1, INDIGO2, 1.6, [4,4]);
        P.curve(f2, TEAL, 1.6, [4,4]);
        P.curve(fSum, INDIGO, 2.6);
        var y0 = a - 0.5*b;
        P.dot(0, y0, AMBER2, 5.5);
        P.label(-0.9, 3.5, 'x = −1', AMBER2); P.label(2.1, 3.5, 'x = 2', TEAL);
        out0 = fmt(a+b,1)+'x + ('+fmt(b-2*a,1)+')';
        out1 = 'x = −1, x = 2';
        out2 = 'f(0) = ' + fmt(y0, 2);
        rows.push(['Residue A (at x=−1)', fmt(a,2)], ['Residue B (at x=2)', fmt(b,2)], ['Combined Numerator', out0], ['y-Intercept f(0)', fmt(y0,2)]);
      } else if(mode === 'argand'){
        var mag = Math.sqrt(a*a + b*b), ang = Math.atan2(b, a)*180/Math.PI;
        P.parametric(function(t){return mag*Math.cos(t);}, function(t){return mag*Math.sin(t);}, 0, 2*Math.PI, LINE, 1.4, [3,3]);
        P.arrow(0, 0, a, b, INDIGO, 2.6); P.dot(a, b, INDIGO, 5.5);
        P.arrow(0, 0, a, -b, AMBER2, 2.2); P.dot(a, -b, AMBER2, 5);
        P.arrow(0, 0, -b, a, TEAL, 2.0); P.dot(-b, a, TEAL, 4.5);
        P.segment(a, b, a, -b, AMBER2, 1.2, [3,3]);
        P.label(a+0.18, b+0.2, 'z = '+fmt(a,1)+(b>=0?'+':'')+fmt(b,1)+'i', INDIGO);
        P.label(a+0.18, -b-0.2, 'z̄ = '+fmt(a,1)+(b>=0?'−':'+')+fmt(Math.abs(b),1)+'i', AMBER2);
        P.label(-b+0.15, a+0.2, 'iz', TEAL);
        out0 = fmt(mag, 2);
        out1 = fmt(ang, 1) + '°';
        out2 = fmt(a,1)+(b>=0?'−':'+')+fmt(Math.abs(b),1)+'i | '+fmt(-b,1)+'+'+fmt(a,1)+'i';
        rows.push(['z = a + bi', fmt(a,1)+' + '+fmt(b,1)+'i'], ['Modulus |z|', out0], ['arg(z)', out1], ['Conjugate z̄', fmt(a,1)+' − '+fmt(b,1)+'i']);
      } else if(mode === 'crv_pdf'){
        var pdf = function(x){
          if(x<0 || x>4) return 0;
          return (3/32)*x*(4-x)*(1 + 0.25*b*(x-2));
        };
        P.shadedArea(pdf, 0, a, 'rgba(200,144,42,0.26)');
        P.curve(pdf, INDIGO, 2.6);
        var mean = 2.0 + 0.32*b;
        P.vline(mean, TEAL, [4,4]);
        P.vline(a, AMBER2, null, 2.2);
        P.dot(a, pdf(a), AMBER2, 5.5);
        var prob = integrate(pdf, 0, a, 120);
        P.label(a+0.08, pdf(a)+0.03, 'b = '+fmt(a,2), AMBER2);
        P.label(mean+0.08, 0.42, 'E(X) = '+fmt(mean,2), TEAL);
        out0 = fmt(prob, 3);
        out1 = fmt(mean, 2);
        out2 = fmt(pdf(a), 3);
        rows.push(['Upper Cutoff b', fmt(a,2)], ['Cumulative P(X ≤ b)', out0], ['Expectation E(X)', out1], ['Density f(b)', out2]);
      } else if(mode === 'slopefield'){
        for(var gx=0.25; gx<=4.25; gx+=0.5){
          for(var gy=0.25; gy<=4.75; gy+=0.5){
            var sl = a * gy * (1 - gy/4.0);
            var L = 0.16 / Math.sqrt(1 + sl*sl);
            P.segment(gx-L, gy-sl*L, gx+L, gy+sl*L, '#94A3B8', 1.3);
          }
        }
        P.hline(4.0, TEAL, [4,4]); P.hline(0.0, AXIS, [2,2]);
        var sol = function(t){
          var y0 = Math.max(0.05, b);
          return 4.0 / (1.0 + ((4.0 - y0)/y0) * Math.exp(-a * t));
        };
        P.curve(sol, INDIGO, 2.8);
        P.dot(0, b, AMBER2, 5.5);
        P.dot(3.0, sol(3.0), INDIGO, 5);
        P.label(3.1, 4.2, 'Equilibrium y = 4', TEAL);
        var dy0 = a * b * (1 - b/4.0);
        out0 = fmt(dy0, 2);
        out1 = fmt(sol(3.0), 2);
        out2 = 'y = 4.00 (Carrying Cap)';
        rows.push(['Growth Rate k', fmt(a,2)], ['Initial Value y(0)', fmt(b,2)], ['Initial Slope dy/dx(0)', out0], ['Value y(3.0)', out1]);
      } else if(mode === 'modulus'){
        var vx = Math.abs(a)>1e-5 ? -b/a : 0;
        P.curve(function(x){return a*x + b;}, '#94A3B8', 1.6, [4,4]);
        P.curve(function(x){return Math.abs(a*x + b);}, INDIGO, 2.7);
        P.hline(2.0, AMBER2, [4,4]);
        var x1 = (2.0 - b)/a, x2 = (-2.0 - b)/a;
        P.dot(vx, 0, INDIGO, 5.5);
        P.dot(x1, 2.0, AMBER2, 5); P.dot(x2, 2.0, AMBER2, 5);
        P.label(vx+0.15, -0.45, 'V('+fmt(vx,1)+', 0)', INDIGO);
        out0 = '(' + fmt(vx, 2) + ', 0)';
        out1 = 'x = ' + fmt(Math.min(x1,x2), 2) + ', ' + fmt(Math.max(x1,x2), 2);
        out2 = 'y = −(' + fmt(a,1) + 'x + ' + fmt(b,1) + ')';
        rows.push(['Vertex (−c/m, 0)', out0], ['Roots of |mx+c|=2', out1], ['Reflected Branch', out2]);
      } else if(mode === 'ztest'){
        var phi = function(z){ return Math.exp(-0.5*z*z)/Math.sqrt(2*Math.PI); };
        var zc = Math.abs(b);
        P.shadedArea(phi, zc, 3.5, 'rgba(200,144,42,0.32)');
        P.shadedArea(phi, -3.5, -zc, 'rgba(200,144,42,0.32)');
        P.curve(phi, INDIGO, 2.6);
        P.vline(zc, AMBER2, [4,4]); P.vline(-zc, AMBER2, [4,4]);
        P.vline(a, TEAL, null, 2.4);
        P.dot(a, phi(a), TEAL, 5.5);
        P.label(a+0.1, phi(a)+0.04, 'z = '+fmt(a,2), TEAL);
        var pval = 1 - _erf(Math.abs(a)/Math.SQRT2);
        var alpha = 1 - _erf(zc/Math.SQRT2);
        var dec = Math.abs(a) >= zc ? 'Reject H₀ (Significant)' : 'Fail to Reject H₀';
        out0 = 'p = ' + fmt(pval, 4);
        out1 = 'α = ' + fmt(alpha, 4);
        out2 = dec;
        rows.push(['Observed Statistic z', fmt(a,2)], ['Critical Cutoff ±z*', '±'+fmt(zc,2)], ['Two-Sided p-Value', out0], ['Decision', dec]);
      } else if(mode === 'trapezium'){
        var fn = function(x){ return x<0 ? 0 : x*Math.exp(-0.4*x); };
        var N = Math.max(1, Math.round(b)), dx = a / N, trap = 0;
        for(var k=0; k<N; k++){
          var x0 = k*dx, x1 = (k+1)*dx, y0 = fn(x0), y1 = fn(x1);
          trap += 0.5*(y0+y1)*dx;
          P.polygon([[x0,0],[x1,0],[x1,y1],[x0,y0]], 'rgba(200,144,42,0.22)', AMBER2, 1.6);
        }
        P.curve(fn, INDIGO, 2.6);
        var exact = (1 - (1 + 0.4*a)*Math.exp(-0.4*a)) / 0.16;
        var err = Math.abs(exact - trap) / Math.max(1e-6, exact) * 100;
        out0 = fmt(exact, 4);
        out1 = fmt(trap, 4);
        out2 = fmt(err, 2) + '%';
        rows.push(['Upper Limit b', fmt(a,2)], ['Trapezium Strips n', String(N)], ['Exact Integral', out0], ['Trapezium Rule T_n', out1], ['Relative Error', out2]);
      } else if(mode === 'cobweb'){
        var g = function(x){ return x + b >= 0 ? Math.sqrt(x + b) : NaN; };
        P.curve(function(x){return x;}, TEAL, 1.8, [4,4]);
        P.curve(g, INDIGO, 2.6);
        var cx = a;
        P.segment(cx, 0, cx, g(cx), AMBER2, 2.0);
        for(var step=0; step<6; step++){
          var ny = g(cx);
          if(!isFinite(ny)) break;
          P.segment(cx, ny, ny, ny, AMBER2, 2.0);
          var nny = g(ny);
          if(step<5 && isFinite(nny)) P.segment(ny, ny, ny, nny, AMBER2, 2.0);
          cx = ny;
        }
        var alpha = 0.5*(1 + Math.sqrt(1 + 4*b));
        P.dot(alpha, alpha, INDIGO, 5.5);
        P.dot(a, g(a), AMBER2, 5);
        P.label(alpha+0.12, alpha-0.2, 'Root α = '+fmt(alpha,2), INDIGO);
        out0 = 'α = ' + fmt(alpha, 3);
        out1 = 'x₄ = ' + fmt(cx, 3);
        out2 = "|g'(α)| = " + fmt(1/(2*alpha), 3) + ' < 1';
        rows.push(['Initial Guess x₀', fmt(a,2)], ['Fixed-Point Root α', out0], ['Iterate x₄', out1], ['Jacobian |g\'(α)|', out2]);
      } else if(mode === 'poisson'){
        var lam = Math.max(0.2, a), kCut = Math.round(b), cdf = 0, pk = 0;
        for(var r=0; r<=12; r++){
          var pr = Math.exp(-lam) * Math.pow(lam, r) / _fact(r);
          if(r <= kCut) cdf += pr;
          if(r === kCut) pk = pr;
          var col = r <= kCut ? AMBER2 : INDIGO;
          var fill = r <= kCut ? 'rgba(200,144,42,0.35)' : 'rgba(30,58,110,0.22)';
          P.polygon([[r-0.35,0],[r+0.35,0],[r+0.35,pr],[r-0.35,pr]], fill, col, 1.8);
          if(r%2===0) rows.push(['P(X = '+r+')', fmt(pr, 4)]);
        }
        P.vline(lam, TEAL, [4,4]);
        P.label(lam+0.2, 0.38, 'Mean λ = '+fmt(lam,1), TEAL);
        out0 = fmt(pk, 4);
        out1 = fmt(cdf, 4);
        out2 = 'λ = ' + fmt(lam, 1);
      } else if(mode === 'clt_ci'){
        var n = Math.max(2, a), se = 2.0 / Math.sqrt(n), me = 1.96 * se;
        var center = b;
        var dens = function(x){ var z=(x-center)/se; return Math.exp(-0.5*z*z)/(se*Math.sqrt(2*Math.PI)); };
        P.shadedArea(dens, center-me, center+me, 'rgba(200,144,42,0.28)');
        P.curve(dens, INDIGO, 2.6);
        P.vline(0, TEAL, [4,4]);
        P.segment(center-me, 0.08, center+me, 0.08, AMBER2, 3.2);
        P.dot(center, 0.08, AMBER2, 5.5);
        P.label(center-me, 0.15, '['+fmt(center-me,2)+', '+fmt(center+me,2)+']', AMBER2);
        out0 = 'SE = ' + fmt(se, 3);
        out1 = '[' + fmt(center-me, 2) + ', ' + fmt(center+me, 2) + ']';
        out2 = '±' + fmt(me, 3);
        rows.push(['Sample Size n', fmt(n,0)], ['Standard Error σ/√n', out0], ['95% Interval', out1]);
      } else if(mode === 'taylor'){
        var ord = Math.max(1, Math.round(b));
        var isSin = cfg.canvasId.indexOf('apbc') !== -1;
        var fEx = isSin ? function(x){return Math.sin(x);} : function(x){ return x <= -0.98 ? NaN : Math.pow(1+x, a); };
        var fTay = function(x){
          if(isSin){
            var s=0;
            for(var k=0; k<=ord; k+=2){
              var sgn = (k/2)%2===0 ? 1 : -1;
              s += sgn * Math.pow(x, k+1) / _fact(k+1);
            }
            return s;
          } else {
            var s2=1, term=1;
            for(var j=1; j<=ord; j++){ term *= (a - (j-1))*x/j; s2 += term; }
            return s2;
          }
        };
        if(!isSin){ P.vline(-1, TEAL, [4,4]); P.vline(1, TEAL, [4,4]); }
        P.curve(fEx, INDIGO, 2.6);
        P.curve(fTay, AMBER2, 2.2, [5,3]);
        var xEval = isSin ? a : 0.5;
        P.dot(xEval, fEx(xEval), INDIGO, 5);
        P.dot(xEval, fTay(xEval), AMBER2, 5);
        out0 = fmt(fTay(xEval), 4);
        out1 = fmt(fEx(xEval), 4);
        out2 = isSin ? ('Error = '+fmt(Math.abs(fEx(xEval)-fTay(xEval)),4)) : '|x| < 1.00';
        rows.push(['Order N', String(ord)], ['Series Value', out0], ['Exact Value', out1]);
      } else if(mode === 'harmonic'){
        var R = Math.sqrt(a*a + b*b), alpha = Math.atan2(b, a);
        P.curve(function(x){return a*Math.cos(x);}, INDIGO2, 1.5, [4,4]);
        P.curve(function(x){return b*Math.sin(x);}, TEAL, 1.5, [4,4]);
        P.curve(function(x){return R*Math.cos(x - alpha);}, AMBER2, 2.8);
        P.dot(alpha, R, AMBER2, 5.5);
        P.hline(R, AMBER2, [3,3]); P.hline(-R, AMBER2, [3,3]);
        P.label(alpha+0.15, R+0.45, 'Peak ('+fmt(alpha*180/Math.PI,1)+'°, '+fmt(R,2)+')', AMBER2);
        out0 = 'R = ' + fmt(R, 2);
        out1 = 'α = ' + fmt(alpha*180/Math.PI, 1) + '°';
        out2 = 'Max = ' + fmt(R, 2) + ' at ' + fmt(alpha*180/Math.PI, 1) + '°';
        rows.push(['Cosine coeff a', fmt(a,2)], ['Sine coeff b', fmt(b,2)], ['Amplitude R', out0], ['Phase shift α', out1]);
      } else if(mode === 'quad_sys'){
        var fQ = function(x){return x*x - 2;};
        var fL = function(x){return a*x + b;};
        var disc = a*a + 4*(b + 2);
        if(disc > 0){
          var r1 = 0.5*(a - Math.sqrt(disc)), r2 = 0.5*(a + Math.sqrt(disc));
          P.shadedArea(function(x){return Math.max(0, fL(x)-fQ(x));}, r1, r2, 'rgba(200,144,42,0.18)');
          P.dot(r1, fL(r1), AMBER2, 5.5); P.dot(r2, fL(r2), AMBER2, 5.5);
          out1 = '2 Real Secant Roots';
          out2 = 'x = ' + fmt(r1, 2) + ', ' + fmt(r2, 2);
        } else if(Math.abs(disc) <= 1e-4){
          var rt = 0.5*a;
          P.dot(rt, fL(rt), AMBER2, 6);
          out1 = '1 Repeated Tangent Root';
          out2 = 'x = ' + fmt(rt, 2);
        } else {
          out1 = '0 Real Roots (Disjoint)';
          out2 = 'No Real Intersection';
        }
        P.curve(fQ, INDIGO, 2.6);
        P.curve(fL, AMBER2, 2.3);
        out0 = 'Δ = ' + fmt(disc, 2);
        rows.push(['Line y = mx + k', fmt(a,1)+'x + '+fmt(b,1)], ['Discriminant Δ', out0], ['Intersections', out1], ['Roots', out2]);
      } else if(mode === 'conic'){
        var c = Math.sqrt(Math.abs(a*a - b*b));
        var ecc = c / Math.max(a, b);
        P.parametric(function(t){return a*Math.cos(t);}, function(t){return b*Math.sin(t);}, 0, 2*Math.PI, INDIGO, 2.7);
        var fx = a >= b ? c : 0, fy = a >= b ? 0 : c;
        P.dot(fx, fy, AMBER2, 5.5); P.dot(-fx, -fy, AMBER2, 5.5);
        P.dot(a, 0, INDIGO, 4.5); P.dot(-a, 0, INDIGO, 4.5);
        P.dot(0, b, TEAL, 4.5); P.dot(0, -b, TEAL, 4.5);
        P.label(fx+0.15, fy+0.25, 'F₁', AMBER2); P.label(-fx-0.45, -fy+0.25, 'F₂', AMBER2);
        out0 = 'c = ' + fmt(c, 2);
        out1 = 'e = ' + fmt(ecc, 3);
        out2 = a >= b ? '(±'+fmt(c,2)+', 0)' : '(0, ±'+fmt(c,2)+')';
        rows.push(['Semi-axis a', fmt(a,2)], ['Semi-axis b', fmt(b,2)], ['Focal distance c', out0], ['Eccentricity e', out1]);
      } else if(mode === 'euclid_gcd'){
        var ia = Math.max(2, Math.round(a)), ib = Math.max(2, Math.round(b));
        var x0 = 0, y0 = 0, wR = ia, hR = ib, stepCol = 0;
        var cols = ['rgba(30,58,110,0.24)', 'rgba(200,144,42,0.28)', 'rgba(14,159,143,0.25)', 'rgba(99,102,241,0.22)'];
        var guard = 0;
        while(wR > 0 && hR > 0 && guard < 24){
          guard++;
          if(wR >= hR){
            P.polygon([[x0,y0],[x0+hR,y0],[x0+hR,y0+hR],[x0,y0+hR]], cols[stepCol%4], INDIGO, 1.6);
            x0 += hR; wR -= hR;
          } else {
            P.polygon([[x0,y0],[x0+wR,y0],[x0+wR,y0+wR],[x0,y0+wR]], cols[stepCol%4], AMBER2, 1.6);
            y0 += wR; hR -= wR;
          }
          stepCol++;
        }
        var xG = ia, yG = ib;
        while(yG){ var tG = yG; yG = xG % yG; xG = tG; }
        var lcm = (ia * ib) / xG;
        P.label(ia*0.35, ib+2.5, ia+' × '+ib+' Rectangle (gcd = '+xG+')', INDIGO);
        out0 = 'gcd = ' + xG;
        out1 = 'lcm = ' + lcm;
        out2 = 'Final Square = ' + xG + '×' + xG;
        rows.push(['Integer a', String(ia)], ['Integer b', String(ib)], ['gcd(a, b)', String(xG)], ['lcm(a, b)', String(lcm)]);
      } else if(mode === 'rational_hole'){
        var fnR = function(x){ return Math.abs(x - a) < 0.08 ? NaN : (x - 1) / (x - a); };
        P.vline(a, AMBER2, [4,4]); P.hline(1, TEAL, [4,4]);
        P.curve(fnR, INDIGO, 2.6);
        var yh = Math.abs(b - a) > 0.05 ? (b - 1)/(b - a) : NaN;
        if(isFinite(yh)){
          P.ring(b, yh, AMBER2, 6);
          P.label(b+0.15, yh+0.3, 'Hole ('+fmt(b,1)+', '+fmt(yh,2)+')', AMBER2);
        }
        P.label(a+0.15, 3.4, 'VA x = '+fmt(a,1), AMBER2);
        out0 = 'x = ' + fmt(a, 1);
        out1 = isFinite(yh) ? '('+fmt(b,1)+', '+fmt(yh,2)+')' : 'Pole Collision';
        out2 = 'y = 1.00';
        rows.push(['Vertical Asymptote', out0], ['Removable Hole', out1], ['Horizontal Asymptote', out2]);
      } else if(mode === 'binomial'){
        var nB = Math.max(2, Math.round(a));
        var isProb = (_elS1 && parseFloat(_elS1.max) <= 1.0);
        var pB = isProb ? b : 0.5;
        var rSel = isProb ? Math.round(nB * pB) : Math.min(nB, Math.round(b));
        for(var rB=0; rB<=nB; rB++){
          var prB = _comb(nB, rB) * Math.pow(pB, rB) * Math.pow(1 - pB, nB - rB);
          var actB = (rB === rSel);
          P.polygon([[rB-0.35,0],[rB+0.35,0],[rB+0.35,prB],[rB-0.35,prB]], actB?'rgba(200,144,42,0.38)':'rgba(30,58,110,0.22)', actB?AMBER2:INDIGO, 1.8);
        }
        var cVal = _comb(nB, rSel);
        if(isProb){
          out0 = nB+'C'+rSel+' = '+cVal;
          out1 = 'μ = ' + fmt(nB*pB, 2);
          out2 = 'σ = ' + fmt(Math.sqrt(nB*pB*(1-pB)), 2);
        } else {
          out0 = nB+'C'+rSel+' = '+cVal;
          out1 = nB+'P'+rSel+' = '+(cVal * _fact(rSel));
          out2 = nB+'C'+(nB-rSel)+' = '+cVal;
        }
        rows.push(['n', String(nB)], ['Selected r', String(rSel)], ['Combinations nCr', String(cVal)]);
      } else if(mode === 'inv_func'){
        var fI = function(x){ return 0.35*Math.pow(x - a, 3) + b; };
        P.curve(function(x){return x;}, '#94A3B8', 1.6, [4,4]);
        P.curve(fI, INDIGO, 2.6);
        P.parametric(function(t){return fI(t);}, function(t){return t;}, -4.5, 4.5, AMBER2, 2.6);
        var x0 = a + 1.2, y0 = fI(x0);
        P.dot(x0, y0, INDIGO, 5.5); P.dot(y0, x0, AMBER2, 5.5);
        P.segment(x0, y0, y0, x0, TEAL, 1.5, [3,3]);
        P.label(x0+0.15, y0, '('+fmt(x0,1)+','+fmt(y0,1)+')', INDIGO);
        P.label(y0+0.15, x0, '('+fmt(y0,1)+','+fmt(x0,1)+')', AMBER2);
        out0 = '(' + fmt(x0,1) + ', ' + fmt(y0,2) + ')';
        out1 = '(' + fmt(y0,2) + ', ' + fmt(x0,1) + ')';
        out2 = 'Mirror Line y = x';
        rows.push(['Point on f(x)', out0], ['Reflected Point on f⁻¹(x)', out1], ['Symmetry Axis', 'y = x']);
      } else if(mode === 'eps_delta'){
        var fLim = function(x){ return 0.4*x*x + 0.3*x + 0.5; };
        var L = fLim(a), eps = b;
        var sl = Math.max(0.4, Math.abs(0.8*a + 0.3)), delta = eps / sl;
        P.polygon([[-4.5, L-eps],[4.5, L-eps],[4.5, L+eps],[-4.5, L+eps]], 'rgba(200,144,42,0.14)', AMBER2, 1.2);
        P.polygon([[a-delta, -3.8],[a+delta, -3.8],[a+delta, 4.2],[a-delta, 4.2]], 'rgba(14,159,143,0.14)', TEAL, 1.2);
        P.curve(fLim, INDIGO, 2.7);
        P.ring(a, L, AMBER2, 6);
        P.label(a+delta+0.1, L, 'L ± ε = '+fmt(L,2)+' ± '+fmt(eps,2), AMBER2);
        out0 = 'L = ' + fmt(L, 2);
        out1 = 'δ ≈ ' + fmt(delta, 2);
        out2 = '(' + fmt(L-eps, 2) + ', ' + fmt(L+eps, 2) + ')';
        rows.push(['Target x → a', fmt(a,2)], ['Limit L', out0], ['Tolerance ε', fmt(eps,2)], ['Required δ', out1]);
      } else if(mode === 'geom_series'){
        var sinf = Math.abs(b) < 1 ? a / (1 - b) : NaN;
        if(isFinite(sinf)) P.hline(sinf, TEAL, [4,4]);
        var sRun = 0, prevX = null, prevY = null;
        for(var nG=1; nG<=8; nG++){
          var term = a * Math.pow(b, nG-1);
          sRun += term;
          P.polygon([[nG-0.25,0],[nG+0.25,0],[nG+0.25,term],[nG-0.25,term]], 'rgba(30,58,110,0.24)', INDIGO, 1.6);
          if(prevX !== null) P.segment(prevX, prevY, nG, sRun, AMBER2, 2.2);
          P.dot(nG, sRun, AMBER2, 5);
          prevX = nG; prevY = sRun;
        }
        if(isFinite(sinf)) P.label(6.2, sinf+0.5, 'S_∞ = '+fmt(sinf,2), TEAL);
        out0 = 'S₈ = ' + fmt(sRun, 3);
        out1 = isFinite(sinf) ? ('S_∞ = ' + fmt(sinf, 3)) : 'Divergent';
        out2 = isFinite(sinf) ? fmt(Math.abs(sinf - sRun), 4) : '∞';
        rows.push(['First Term a₁', fmt(a,2)], ['Common Ratio r', fmt(b,2)], ['Partial Sum S₈', out0], ['Infinite Sum S_∞', out1]);
      } else if(mode === 'tangent_normal'){
        var fTN = function(x){ return 0.5*x*x*x - 1.5*x; };
        var y0 = fTN(a), mt = 1.5*a*a - 1.5;
        P.curve(fTN, INDIGO, 2.6);
        P.curve(function(x){return y0 + mt*(x - a);}, AMBER2, 2.3);
        if(Math.abs(mt) > 0.05){
          var mn = -1 / mt;
          P.curve(function(x){return y0 + mn*(x - a);}, TEAL, 2.0, [4,4]);
          out1 = 'm_N = ' + fmt(mn, 2);
        } else {
          P.vline(a, TEAL, [4,4]);
          out1 = 'Vertical Normal';
        }
        P.dot(a, y0, AMBER2, 5.5);
        out0 = 'm_T = ' + fmt(mt, 2);
        out2 = 'dy/dt = ' + fmt(mt * b, 2);
        rows.push(['Point x₀', fmt(a,2)], ['Tangent Slope m_T', out0], ['Normal Slope m_N', out1], ['Chain Rate dy/dt', out2]);
      } else if(mode === 'kinematics' || mode === 'suvat'){
        var isSuvat = (mode === 'suvat');
        var vFn = isSuvat ? function(t){return a + b*t;} : function(t){return a - 2.0*t;};
        var tMax = isSuvat ? 4.0 : b;
        var tZero = isSuvat ? (Math.abs(b)>1e-4 ? -a/b : 99) : a/2.0;
        if(tZero > 0 && tZero < tMax){
          P.shadedArea(vFn, 0, tZero, 'rgba(30,58,110,0.22)');
          P.shadedArea(vFn, tZero, tMax, 'rgba(200,144,42,0.28)');
          P.dot(tZero, 0, AMBER2, 5.5);
        } else {
          P.shadedArea(vFn, 0, tMax, 'rgba(30,58,110,0.22)');
        }
        P.curve(vFn, INDIGO, 2.7);
        P.vline(tMax, TEAL, [4,4]);
        var disp = integrate(vFn, 0, tMax, 100);
        var dist = integrate(function(t){return Math.abs(vFn(t));}, 0, tMax, 100);
        out0 = isSuvat ? ('v = '+fmt(vFn(tMax),2)+' m/s') : (fmt(disp,2)+' m');
        out1 = isSuvat ? ('s = '+fmt(disp,2)+' m') : (fmt(dist,2)+' m');
        out2 = isSuvat ? ('Area = '+fmt(disp,2)+' m') : ('t_turn = '+fmt(tZero,2)+' s');
        rows.push(['Initial Velocity u', fmt(a,2)], ['Net Displacement s', fmt(disp,2)+' m'], ['Total Distance', fmt(dist,2)+' m']);
      } else if(mode === 'linear_law' || mode === 'exp_doubling'){
        var base = mode === 'exp_doubling' ? (1 + b) : b;
        var fExp = function(x){ return a * Math.pow(base, x); };
        var fLin = function(x){ return Math.log(Math.max(0.05, a)) + x * Math.log(Math.max(1.02, base)); };
        P.curve(fExp, INDIGO, 2.6);
        P.curve(fLin, AMBER2, 2.3, [5,3]);
        P.dot(0, a, INDIGO, 5);
        if(mode === 'exp_doubling'){
          var t2 = Math.log(2) / Math.log(base);
          P.hline(2*a, TEAL, [4,4]); P.dot(t2, 2*a, AMBER2, 5.5);
          P.label(t2+0.15, 2*a+0.4, 'T₂ = '+fmt(t2,2), AMBER2);
          out0 = 'T₂ = ' + fmt(t2, 2);
          out1 = '2A₀ = ' + fmt(2*a, 2);
          out2 = 'y(0) = ' + fmt(a, 2);
        } else {
          out0 = 'c = lg a = ' + fmt(Math.log10(a), 3);
          out1 = 'm = lg b = ' + fmt(Math.log10(base), 3);
          out2 = 'y(3) = ' + fmt(fExp(3), 2);
        }
        rows.push(['Parameter a', fmt(a,2)], ['Growth Factor', fmt(base,2)], ['Primary Metric', out0], ['Secondary Metric', out1]);
      } else if(mode === 'cubic_rem'){
        var fCub = function(x){ return x*x*x - 3*x + b; };
        var rem = fCub(a);
        P.curve(fCub, INDIGO, 2.6);
        P.vline(a, '#94A3B8', [3,3]);
        P.segment(a, 0, a, rem, AMBER2, 3.2);
        P.dot(a, rem, AMBER2, 6);
        P.label(a+0.15, rem, 'P('+fmt(a,1)+') = '+fmt(rem,2), AMBER2);
        out0 = 'R = ' + fmt(rem, 2);
        out1 = Math.abs(rem) < 0.05 ? 'Exact Factor (R = 0)!' : 'Non-Zero Remainder';
        out2 = "P'(a) = " + fmt(3*a*a - 3, 2);
        rows.push(['Divisor x = a', fmt(a,2)], ['Remainder P(a)', out0], ['Factor Check', out1]);
      } else if(mode === 'sector_seg'){
        P.parametric(function(t){return a*Math.cos(t);}, function(t){return a*Math.sin(t);}, 0, 2*Math.PI, LINE, 1.5);
        var pts = [[0,0]];
        for(var kS=0; kS<=40; kS++){
          var angS = b * kS / 40;
          pts.push([a*Math.cos(angS), a*Math.sin(angS)]);
        }
        P.polygon(pts, 'rgba(30,58,110,0.18)', INDIGO, 2.2);
        P.segment(a, 0, a*Math.cos(b), a*Math.sin(b), AMBER2, 2.5);
        P.dot(0, 0, INK, 4.5); P.dot(a, 0, INDIGO, 5); P.dot(a*Math.cos(b), a*Math.sin(b), AMBER2, 5);
        var arc = a*b, secA = 0.5*a*a*b, segA = 0.5*a*a*(b - Math.sin(b));
        out0 = 's = ' + fmt(arc, 2);
        out1 = 'A = ' + fmt(secA, 2);
        out2 = 'A_seg = ' + fmt(segA, 2);
        rows.push(['Radius r', fmt(a,2)], ['Angle θ (rad)', fmt(b,2)], ['Arc Length s = rθ', out0], ['Sector Area ½r²θ', out1], ['Segment Area', out2]);
      } else if(mode === 'rel_vel'){
        P.hline(0, TEAL, [4,4]); P.hline(a, TEAL, [4,4]);
        P.arrow(0, 0, 0, a, INDIGO, 2.6);
        P.arrow(0, a, b, a, AMBER2, 2.4);
        P.arrow(0, 0, b, a, TEAL, 2.8);
        P.dot(b, a, TEAL, 5.5);
        var spd = Math.sqrt(a*a + b*b), drift = Math.atan2(b, a)*180/Math.PI;
        P.label(0.15, a*0.5, 'v_boat = '+fmt(a,1), INDIGO);
        P.label(b*0.4, a+0.35, 'v_curr = '+fmt(b,1), AMBER2);
        out0 = fmt(spd, 2) + ' m/s';
        out1 = fmt(drift, 1) + '°';
        out2 = '⟨' + fmt(b,1) + ', ' + fmt(a,1) + '⟩';
        rows.push(['Heading Velocity v_b', fmt(a,2)], ['Current Velocity v_c', fmt(b,2)], ['Resultant Speed', out0], ['Drift Angle', out1]);
      } else if(mode === 'mat_2d' || mode === 'change_basis'){
        var a11 = a, a12 = b, a21 = 0.5, a22 = 1.5;
        P.polygon([[0,0],[1,0],[1,1],[0,1]], 'rgba(148,163,184,0.18)', '#94A3B8', 1.5);
        P.polygon([[0,0],[a11,a21],[a11+a12,a21+a22],[a12,a22]], 'rgba(200,144,42,0.26)', AMBER2, 2.4);
        P.arrow(0, 0, a11, a21, INDIGO, 2.6);
        P.arrow(0, 0, a12, a22, TEAL, 2.6);
        P.label(a11+0.15, a21, 'Ae₁', INDIGO);
        P.label(a12+0.15, a22, 'Ae₂', TEAL);
        var det = a11*a22 - a12*a21;
        out0 = mode==='change_basis' ? ('⟨'+fmt(a11,1)+',0.5⟩ & ⟨'+fmt(a12,1)+',1.5⟩') : ('det(A) = ' + fmt(det, 2));
        out1 = mode==='change_basis' ? ('det(A) = ' + fmt(det, 2)) : ('Area = ' + fmt(Math.abs(det), 2));
        out2 = mode==='change_basis' ? ('T(1,1) = ⟨'+fmt(a11+a12,1)+', 2.0⟩') : (Math.abs(det)>1e-3 ? 'Invertible' : 'Singular');
        rows.push(['Column 1 Ae₁', '⟨'+fmt(a11,1)+', 0.5⟩'], ['Column 2 Ae₂', '⟨'+fmt(a12,1)+', 1.5⟩'], ['Determinant det(A)', fmt(det,2)]);
      } else if(mode === 'radical_ext'){
        P.curve(function(x){return x + a >= 0 ? Math.sqrt(x + a) : NaN;}, INDIGO, 2.7);
        P.curve(function(x){return x + a >= 0 ? -Math.sqrt(x + a) : NaN;}, '#94A3B8', 1.8, [4,4]);
        P.curve(function(x){return x - b;}, AMBER2, 2.2);
        P.dot(-a, 0, INDIGO, 5.5);
        var B = -(2*b + 1), C = b*b - a, disc = B*B - 4*C;
        if(disc >= 0){
          var rt = 0.5*(-B + Math.sqrt(disc)), re = 0.5*(-B - Math.sqrt(disc));
          P.dot(rt, rt - b, AMBER2, 5.5);
          P.ring(re, re - b, TEAL, 5.5);
          out0 = 'x = ' + fmt(rt, 2);
          out1 = 'x_ext = ' + fmt(re, 2);
        }
        out2 = 'Domain x ≥ ' + fmt(-a, 1);
        rows.push(['Endpoint (−a, 0)', '('+fmt(-a,1)+', 0)'], ['True Root', out0], ['Extraneous Root', out1]);
      } else if(mode === 'emp_rule'){
        var phiE = function(z){ return Math.exp(-0.5*z*z)/Math.sqrt(2*Math.PI); };
        P.shadedArea(phiE, -3.5, a, 'rgba(30,58,110,0.24)');
        P.curve(phiE, INDIGO, 2.6);
        P.vline(a, AMBER2, null, 2.2);
        P.dot(a, phiE(a), AMBER2, 5.5);
        var cdfE = 0.5*(1 + _erf(a/Math.SQRT2));
        var symE = Math.abs(_erf(Math.abs(a)/Math.SQRT2));
        out0 = 'Φ(z) = ' + fmt(cdfE, 4);
        out1 = fmt(symE*100, 2) + '%';
        out2 = 'x = ' + fmt(a*b, 2);
        rows.push(['Z-Score z', fmt(a,2)], ['Cumulative Φ(z)', out0], ['Central Band P(|Z|≤|z|)', out1]);
      } else if(mode === 'poly_end'){
        var deg = Math.round(b);
        var fP = function(x){ return 0.35*a*Math.pow(x, deg) - 0.8*x; };
        P.curve(fP, INDIGO, 2.7);
        P.dot(0, 0, AMBER2, 5);
        var rEnd = a >= 0 ? '+∞' : '−∞';
        var lEnd = (deg%2===0) ? rEnd : (a >= 0 ? '−∞' : '+∞');
        out0 = 'y → ' + lEnd;
        out1 = 'y → ' + rEnd;
        out2 = 'Degree ' + deg + ' (' + (deg%2===0?'Even':'Odd') + ')';
        rows.push(['Leading Coeff a', fmt(a,1)], ['Degree n', String(deg)], ['Left Behavior', out0], ['Right Behavior', out1]);
      } else if(mode === 'factored_quad'){
        var fFQ = function(x){ return 0.5*(x - a)*(x - b); };
        var xv = 0.5*(a + b), yv = fFQ(xv);
        P.curve(fFQ, INDIGO, 2.7);
        P.vline(xv, TEAL, [4,4]);
        P.dot(a, 0, AMBER2, 5.5); P.dot(b, 0, AMBER2, 5.5);
        P.dot(xv, yv, INDIGO, 5.5);
        P.label(a, 0.45, 'r₁='+fmt(a,1), AMBER2); P.label(b, 0.45, 'r₂='+fmt(b,1), AMBER2);
        out0 = 'x² + ('+fmt(-(a+b),1)+')x + ('+fmt(a*b,1)+')';
        out1 = 'x = ' + fmt(xv, 2);
        out2 = '(' + fmt(xv, 2) + ', ' + fmt(yv, 2) + ')';
        rows.push(['Root r₁', fmt(a,2)], ['Root r₂', fmt(b,2)], ['Symmetry Axis', out1], ['Vertex', out2]);
      } else if(mode === 'boxplot'){
        var vals = [8+b, 10+b, 12, 14, 15, 17, a].sort(function(x,y){return x-y;});
        var minV = vals[0], q1 = vals[1], med = vals[3], q3 = vals[5], maxV = vals[6];
        var mean = (vals[0]+vals[1]+vals[2]+vals[3]+vals[4]+vals[5]+vals[6])/7;
        P.polygon([[q1,2.2],[q3,2.2],[q3,3.8],[q1,3.8]], 'rgba(30,58,110,0.22)', INDIGO, 2.2);
        P.segment(med, 2.2, med, 3.8, AMBER2, 3.0);
        P.segment(minV, 3.0, q1, 3.0, INDIGO, 2.0);
        P.segment(q3, 3.0, maxV, 3.0, INDIGO, 2.0);
        for(var bi=0; bi<vals.length; bi++) P.dot(vals[bi], 1.0, bi===6?AMBER2:INDIGO, 5);
        P.vline(mean, TEAL, [4,4]);
        P.label(mean+0.4, 4.8, 'Mean = '+fmt(mean,1), TEAL);
        P.label(med, 4.3, 'Med = '+fmt(med,1), AMBER2);
        out0 = 'x̄ = ' + fmt(mean, 2);
        out1 = 'M = ' + fmt(med, 1);
        out2 = 'IQR = ' + fmt(q3 - q1, 1);
        rows.push(['Min / Q₁', fmt(minV,1)+' / '+fmt(q1,1)], ['Median M', out1], ['Q₃ / Max', fmt(q3,1)+' / '+fmt(maxV,1)], ['Mean x̄', out0]);
      } else if(mode === 'rate_accum'){
        var rIn = function(t){ return a * Math.sin(Math.PI * t / 6.0); };
        P.shadedArea(rIn, 0, 6.0, 'rgba(30,58,110,0.18)');
        P.curve(rIn, INDIGO, 2.7);
        P.hline(b, AMBER2, null, 2.3);
        var net = (2*a*6/Math.PI) - 6*b;
        var ratio = Math.min(1, b / Math.max(0.1, a));
        var tCrit = 6 * (1 - Math.asin(ratio)/Math.PI);
        P.dot(tCrit, b, AMBER2, 5.5);
        P.label(tCrit, b+0.45, 'Max Amount at t='+fmt(tCrit,2), AMBER2);
        out0 = fmt(net, 2) + ' units';
        out1 = 't = ' + fmt(tCrit, 2) + ' hr';
        out2 = 'Peak at t = ' + fmt(tCrit, 2);
        rows.push(['Peak Inflow A', fmt(a,2)], ['Outflow Rate R_out', fmt(b,2)], ['Net Change ∫(R_in−R_out)', out0], ['Critical Time', out1]);
      } else if(mode === 'ftc_triple'){
        var fFTC = function(x){ return 0.5*x*x - 1.0 + b; };
        var dfFTC = function(x){ return x; };
        var FFTC = function(x){ return (x*x*x)/6.0 - x + b*x; };
        P.shadedArea(fFTC, 0, a, 'rgba(30,58,110,0.16)');
        P.curve(fFTC, INDIGO, 2.6);
        P.curve(dfFTC, TEAL, 1.8, [4,4]);
        P.curve(FFTC, AMBER2, 2.4);
        P.dot(a, fFTC(a), INDIGO, 5.5);
        P.dot(a, FFTC(a), AMBER2, 5.5);
        out0 = 'f('+fmt(a,1)+') = ' + fmt(fFTC(a), 2);
        out1 = "f'("+fmt(a,1)+') = ' + fmt(dfFTC(a), 2);
        out2 = 'F('+fmt(a,1)+') = ' + fmt(FFTC(a), 2);
        rows.push(['Point x', fmt(a,2)], ['Height f(x)', out0], ['Derivative f\'(x)', out1], ['Accumulation ∫₀ˣ f(t)dt', out2]);
      } else if(mode === 'parametric'){
        var fxP = function(t){ return 3.2*Math.cos(t); };
        var fyP = function(t){ return 2.6*Math.sin(b*t); };
        P.parametric(fxP, fyP, 0, 2*Math.PI, '#94A3B8', 1.5, [3,3]);
        P.parametric(fxP, fyP, 0, a, INDIGO, 2.7);
        var xP = fxP(a), yP = fyP(a);
        var vx = -3.2*Math.sin(a), vy = 2.6*b*Math.cos(b*a);
        P.arrow(xP, yP, xP + 0.35*vx, yP + 0.35*vy, AMBER2, 2.5);
        P.dot(xP, yP, INDIGO, 5.5);
        var spd = Math.sqrt(vx*vx + vy*vy);
        out0 = '⟨' + fmt(vx, 2) + ', ' + fmt(vy, 2) + '⟩';
        out1 = '|v| = ' + fmt(spd, 2);
        out2 = 's ≈ ' + fmt(spd * a * 0.65, 2);
        rows.push(['Time t₀', fmt(a,2)], ['Position (x, y)', '('+fmt(xP,2)+', '+fmt(yP,2)+')'], ['Velocity Vector', out0], ['Speed |v(t₀)|', out1]);
      } else if(mode === 'concavity'){
        var fCC = function(x){ return 0.25*x*x*x - 0.5*x; };
        var xL = a - b, xM = a, xR = a + b;
        var yL = fCC(xL), yM = fCC(xM), yR = fCC(xR);
        P.curve(fCC, INDIGO, 2.6);
        P.segment(xL, yL, xM, yM, AMBER2, 2.4);
        P.segment(xM, yM, xR, yR, TEAL, 2.4);
        P.dot(xL, yL, AMBER2, 5); P.dot(xM, yM, INK, 5.5); P.dot(xR, yR, TEAL, 5);
        var s1 = (yM - yL)/b, s2 = (yR - yM)/b;
        out0 = 'm₁ = ' + fmt(s1, 3);
        out1 = 'm₂ = ' + fmt(s2, 3);
        out2 = s2 > s1 ? 'Concave Up (m₂ > m₁)' : 'Concave Down (m₂ < m₁)';
        rows.push(['Left Secant Slope m₁', out0], ['Right Secant Slope m₂', out1], ['Concavity Diagnosis', out2]);
      } else if(mode === 'ogive'){
        var fOg = function(x){ return 100 / (1 + Math.exp(-(x - a)/(0.55*b))); };
        P.curve(fOg, INDIGO, 2.7);
        var q1 = a - 0.6*b, q2 = a, q3 = a + 0.6*b;
        P.segment(0, 25, q1, 25, TEAL, 1.5, [3,3]); P.segment(q1, 25, q1, 0, TEAL, 1.5, [3,3]);
        P.segment(0, 50, q2, 50, AMBER2, 1.8, [4,3]); P.segment(q2, 50, q2, 0, AMBER2, 1.8, [4,3]);
        P.segment(0, 75, q3, 75, TEAL, 1.5, [3,3]); P.segment(q3, 75, q3, 0, TEAL, 1.5, [3,3]);
        P.dot(q1, 25, TEAL, 5); P.dot(q2, 50, AMBER2, 5.5); P.dot(q3, 75, TEAL, 5);
        out0 = 'Q₁ = ' + fmt(q1, 2);
        out1 = 'Median = ' + fmt(q2, 2);
        out2 = 'Q₃ = ' + fmt(q3, 2) + ' (IQR = ' + fmt(q3-q1, 2) + ')';
        rows.push(['25th Percentile Q₁', out0], ['50th Percentile Median', out1], ['75th Percentile Q₃', fmt(q3,2)], ['IQR = Q₃ − Q₁', fmt(q3-q1,2)]);
      } else if(mode === 'drv_spike'){
        var rawP = [], sumP = 0;
        for(var xi=1; xi<=5; xi++){
          var pVal = Math.max(0.03, 0.2 + 0.06*a*(xi - 3) - 0.03*(b-0.5)*Math.abs(xi-3));
          rawP.push(pVal); sumP += pVal;
        }
        var mu = 0, ex2 = 0;
        for(var kD=0; kD<5; kD++){
          var prD = rawP[kD]/sumP, xVal = kD + 1;
          mu += xVal * prD; ex2 += xVal * xVal * prD;
          P.segment(xVal, 0, xVal, prD, INDIGO, 4.5);
          P.dot(xVal, prD, INDIGO, 5.5);
          rows.push(['P(X = '+xVal+')', fmt(prD, 3)]);
        }
        var variance = ex2 - mu*mu;
        P.polygon([[mu-0.18,-0.05],[mu+0.18,-0.05],[mu,0]], AMBER2, AMBER2, 1.5);
        P.label(mu+0.15, 0.42, 'E(X) = '+fmt(mu,2), AMBER2);
        out0 = 'E(X) = ' + fmt(mu, 2);
        out1 = 'Var(X) = ' + fmt(variance, 3);
        out2 = 'Σ P(X=x) = 1.000';
      } else if(mode === 'incline_energy' || mode === 'forces_eq'){
        var rad = a * Math.PI / 180;
        var L = 4.2, bx = L*Math.cos(rad), by = L*Math.sin(rad);
        P.polygon([[0,0],[bx,0],[0,by]], 'rgba(30,58,110,0.14)', INDIGO, 2.2);
        var mx = 0.5*bx, my = 0.5*by;
        P.dot(mx, my, AMBER2, 7);
        P.arrow(mx, my, mx, my - 1.4, INDIGO, 2.4);
        P.arrow(mx, my, mx + 1.1*Math.sin(rad), my + 1.1*Math.cos(rad), TEAL, 2.4);
        if(mode === 'incline_energy'){
          var pe = 2*10*4*Math.sin(rad), wf = Math.min(pe, b*2*10*4*Math.cos(rad)), ke = Math.max(0, pe - wf);
          P.polygon([[4.6,0],[5.0,0],[5.0,pe/20],[4.6,pe/20]], 'rgba(30,58,110,0.3)', INDIGO, 1.5);
          P.polygon([[5.2,0],[5.6,0],[5.6,ke/20],[5.2,ke/20]], 'rgba(14,159,143,0.3)', TEAL, 1.5);
          P.polygon([[5.8,0],[6.2,0],[6.2,wf/20],[5.8,wf/20]], 'rgba(200,144,42,0.3)', AMBER2, 1.5);
          out0 = 'ΔPE = ' + fmt(pe, 1) + ' J';
          out1 = 'W_f = ' + fmt(wf, 1) + ' J';
          out2 = 'KE = ' + fmt(ke, 1) + ' J';
        } else {
          var R = b*10*Math.cos(rad), F = b*10*Math.sin(rad);
          out0 = 'R = ' + fmt(R, 1) + ' N';
          out1 = 'mg sin θ = ' + fmt(F, 1) + ' N';
          out2 = 'tan θ = ' + fmt(Math.tan(rad), 2);
        }
        rows.push(['Slope Angle θ', fmt(a,0)+'°'], ['Metric 1', out0], ['Metric 2', out1], ['Metric 3', out2]);
      } else if(mode === 'atwood'){
        P.parametric(function(t){return 0.8*Math.cos(t);}, function(t){return 1.2 + 0.8*Math.sin(t);}, 0, 2*Math.PI, INDIGO, 2.4);
        var shift = 0.6*(b - a)/(a + b);
        var y1 = -1.8 + shift, y2 = -1.8 - shift;
        P.segment(-0.8, 1.2, -0.8, y1, INK, 2.0);
        P.segment(0.8, 1.2, 0.8, y2, INK, 2.0);
        P.polygon([[-1.25,y1-0.6],[-0.35,y1-0.6],[-0.35,y1],[-1.25,y1]], 'rgba(30,58,110,0.28)', INDIGO, 2);
        P.polygon([[0.35,y2-0.6],[1.25,y2-0.6],[1.25,y2],[0.35,y2]], 'rgba(200,144,42,0.32)', AMBER2, 2);
        var acc = 10*(b - a)/(a + b), T = 2*a*b*10/(a + b);
        P.label(-2.3, y1-0.3, 'm₁='+fmt(a,1)+'kg', INDIGO);
        P.label(1.4, y2-0.3, 'm₂='+fmt(b,1)+'kg', AMBER2);
        out0 = 'a = ' + fmt(acc, 2) + ' m/s²';
        out1 = 'T = ' + fmt(T, 2) + ' N';
        out2 = '2T = ' + fmt(2*T, 2) + ' N';
        rows.push(['Mass m₁', fmt(a,1)+' kg'], ['Mass m₂', fmt(b,1)+' kg'], ['Acceleration a', out0], ['String Tension T', out1]);
      } else if(mode === 'venn_prob'){
        var pb = 0.40, ov = Math.min(a, Math.min(pb, b));
        var union = a + pb - ov;
        P.polygon([[-3.8,-2.3],[3.8,-2.3],[3.8,2.3],[-3.8,2.3]], 'rgba(148,163,184,0.08)', AXIS, 1.5);
        P.parametric(function(t){return -0.85 + 1.65*Math.cos(t);}, function(t){return 1.65*Math.sin(t);}, 0, 2*Math.PI, INDIGO, 2.5);
        P.parametric(function(t){return 0.85 + 1.55*Math.cos(t);}, function(t){return 1.55*Math.sin(t);}, 0, 2*Math.PI, AMBER2, 2.5);
        P.label(-1.8, 0, fmt(a - ov, 2), INDIGO);
        P.label(-0.2, 0, fmt(ov, 2), TEAL);
        P.label(1.4, 0, fmt(pb - ov, 2), AMBER2);
        P.label(2.4, -1.8, 'Out: '+fmt(1 - union, 2), MUTED);
        out0 = fmt(union, 2);
        out1 = fmt(ov / pb, 2);
        out2 = 'P(A)P(B) = ' + fmt(a * pb, 3);
        rows.push(['P(A)', fmt(a,2)], ['P(B)', '0.40'], ['Overlap P(A ∩ B)', fmt(ov,2)], ['Union P(A ∪ B)', out0]);
      } else if(mode === 'cast_circle'){
        var rad = a * Math.PI / 180;
        P.parametric(function(t){return -0.8 + Math.cos(t);}, function(t){return Math.sin(t);}, 0, 2*Math.PI, INDIGO, 2.2);
        var cx = -0.8 + Math.cos(rad), cy = Math.sin(rad);
        P.segment(-0.8, 0, cx, cy, AMBER2, 2.4);
        P.dot(cx, cy, AMBER2, 5.5);
        P.parametric(function(t){return 0.6 + t*0.7;}, function(t){return Math.sin(t);}, 0, 2*Math.PI, INDIGO, 2.2);
        P.hline(b, TEAL, [4,4]);
        P.dot(0.6 + rad*0.7, Math.sin(rad), AMBER2, 5.5);
        var a1 = Math.asin(Math.max(-1, Math.min(1, b)))*180/Math.PI;
        out0 = '(' + fmt(Math.cos(rad), 2) + ', ' + fmt(Math.sin(rad), 2) + ')';
        out1 = 'θ₁ ≈ ' + fmt(a1, 1) + '°';
        out2 = a < 90 ? 'Q I (All +)' : (a < 180 ? 'Q II (Sin +)' : (a < 270 ? 'Q III (Tan +)' : 'Q IV (Cos +)'));
        rows.push(['Angle θ', fmt(a,0)+'°'], ['cos θ, sin θ', out0], ['Target sin θ = c', fmt(b,2)], ['CAST Quadrant', out2]);
      } else if(mode === 'usub'){
        var fOrig = function(x){ return x<0 ? NaN : 2*x*Math.cos(b*x*x); };
        var uMax = b*a*a;
        P.shadedArea(fOrig, 0, a, 'rgba(30,58,110,0.22)');
        P.curve(fOrig, INDIGO, 2.6);
        P.vline(a, AMBER2, [4,4]);
        var val = Math.sin(uMax) / b;
        out0 = fmt(val, 4);
        out1 = 'u ∈ [0, ' + fmt(uMax, 2) + ']';
        out2 = 'sin(kb²)/k = ' + fmt(val, 4);
        rows.push(['Upper x-Limit b', fmt(a,2)], ['u-Upper Limit kb²', fmt(uMax,2)], ['Integral Value', out0]);
      } else if(mode === 'perp_lines'){
        var m1 = Math.abs(a) < 0.2 ? 0.5 : a, m2 = -1 / m1;
        var fL1 = function(x){ return m1*x + 1; };
        var fL2 = function(x){ return 1 + m2*(x - b); };
        P.curve(fL1, INDIGO, 2.6);
        P.curve(fL2, AMBER2, 2.4);
        var ix = (b*m2) / (m1 - m2), iy = fL1(ix);
        P.dot(ix, iy, TEAL, 5.5);
        P.dot(b, 1, AMBER2, 5);
        out0 = 'y = ' + fmt(m1, 1) + 'x + 1';
        out1 = 'm_⊥ = ' + fmt(m2, 2);
        out2 = '(' + fmt(ix, 2) + ', ' + fmt(iy, 2) + ')';
        rows.push(['Slope m₁', fmt(m1,2)], ['Perpendicular Slope m_⊥', out1], ['90° Intersection', out2]);
      } else if(mode === 'prop_hyper'){
        P.curve(function(x){return a*x;}, INDIGO, 2.5);
        P.curve(function(x){return Math.abs(x)<0.12 ? NaN : a/x;}, AMBER2, 2.5);
        P.dot(b, a*b, INDIGO, 5.5);
        P.dot(b, a/b, AMBER2, 5.5);
        out0 = 'y_dir = ' + fmt(a*b, 2);
        out1 = 'y_inv = ' + fmt(a/b, 2);
        out2 = 'x₀·y_inv = ' + fmt(a, 2);
        rows.push(['Constant k', fmt(a,2)], ['Direct y = kx₀', out0], ['Inverse y = k/x₀', out1]);
      } else if(mode === 'contingency' || mode === 'bayes_rule'){
        var p1 = a, p2 = b;
        P.polygon([[0.6,0],[1.6,0],[1.6,p1],[0.6,p1]], 'rgba(30,58,110,0.32)', INDIGO, 2.2);
        P.polygon([[2.4,0],[3.4,0],[3.4,p2],[2.4,p2]], 'rgba(200,144,42,0.32)', AMBER2, 2.2);
        if(mode === 'bayes_rule'){
          var sens = 0.90, pPos = sens*a + b*(1-a), post = (sens*a)/Math.max(1e-5, pPos);
          P.hline(post, TEAL, [4,4]);
          P.label(1.8, post+0.06, 'Posterior P(C₁|+) = '+fmt(post*100,1)+'%', TEAL);
          out0 = 'P(+) = ' + fmt(pPos, 3);
          out1 = fmt(post*100, 1) + '%';
          out2 = fmt(post/Math.max(0.01,a), 2) + '× Lift';
        } else {
          var ps = 0.5*a + 0.5*b, pas = (0.5*a)/Math.max(1e-4, ps);
          P.hline(ps, TEAL, [4,4]);
          out0 = 'P(S) = ' + fmt(ps, 2);
          out1 = 'P(A|S) = ' + fmt(pas, 2);
          out2 = 'RR = ' + fmt(a/Math.max(0.05,b), 2) + '×';
        }
        rows.push(['Parameter 1', fmt(a,2)], ['Parameter 2', fmt(b,2)], ['Output 1', out0], ['Output 2', out1]);
      } else if(mode === 'multiplicity'){
        var fM = function(x){ return 0.25*(x - a)*(x - a)*(x - b); };
        P.curve(fM, INDIGO, 2.7);
        P.dot(a, 0, AMBER2, 6); P.dot(b, 0, TEAL, 6);
        P.label(a-0.3, 0.55, 'Bounce (m=2)', AMBER2);
        P.label(b-0.3, -0.55, 'Cross (m=1)', TEAL);
        out0 = 'Bounce at x = ' + fmt(a, 1);
        out1 = 'Cross at x = ' + fmt(b, 1);
        out2 = 'P(0) = ' + fmt(fM(0), 2);
        rows.push(['Double Root r₁', fmt(a,1)], ['Simple Root r₂', fmt(b,1)], ['y-Intercept P(0)', out2]);
      } else if(mode === 'transversal' || mode === 'angle_pairs'){
        var radT = a * Math.PI / 180;
        var dY = mode === 'transversal' ? b*0.5 : 0;
        if(mode === 'transversal'){
          P.hline(dY, INDIGO, null, 2.4); P.hline(-dY, INDIGO, null, 2.4);
        } else {
          P.hline(0, INDIGO, null, 2.4);
        }
        var dxT = 3.8*Math.cos(radT), dyT = 3.8*Math.sin(radT);
        P.segment(-dxT, -dyT, dxT, dyT, AMBER2, 2.6);
        P.dot(0, dY, AMBER2, 5); P.dot(0, -dY, AMBER2, 5);
        P.label(0.5, dY+0.4, fmt(a,0)+'°', AMBER2);
        P.label(-0.9, dY+0.4, fmt(180-a,0)+'°', TEAL);
        out0 = fmt(a,0) + '° = ' + fmt(a,0) + '°';
        out1 = fmt(180 - a, 0) + '°';
        out2 = fmt(90 - a, 0) + '°';
        rows.push(['Primary Angle θ', fmt(a,0)+'°'], ['Supplement (180°−θ)', out1], ['Complement (90°−θ)', out2]);
      } else if(mode === 'complex_spiral' || mode === 'demoivre'){
        var isDM = (mode === 'demoivre');
        var rMod = isDM ? 1.15 : a;
        var degStep = isDM ? a : b;
        var nMax = isDM ? Math.round(b) : 8;
        P.parametric(function(t){return Math.cos(t);}, function(t){return Math.sin(t);}, 0, 2*Math.PI, LINE, 1.5, [3,3]);
        var px = 1, py = 0;
        for(var kC=1; kC<=nMax; kC++){
          var rk = Math.pow(rMod, kC), ak = kC * degStep * Math.PI / 180;
          var nx = rk*Math.cos(ak), ny = rk*Math.sin(ak);
          P.segment(px, py, nx, ny, AMBER2, 1.8, [3,2]);
          P.arrow(0, 0, nx, ny, kC===nMax ? AMBER2 : INDIGO, kC===nMax ? 2.6 : 1.6);
          P.dot(nx, ny, kC===nMax ? AMBER2 : INDIGO, kC===nMax ? 5.5 : 4);
          px = nx; py = ny;
        }
        out0 = fmt(rMod,2) + '∠' + fmt(degStep,0) + '°';
        out1 = fmt(Math.pow(rMod, nMax), 2) + '∠' + fmt(nMax*degStep, 0) + '°';
        out2 = isDM ? (fmt(360/nMax,1)+'° root spacing') : (rMod < 1 ? 'Convergent Spiral' : 'Divergent / Circle');
        rows.push(['Base z', out0], ['Power z^'+nMax, out1], ['Behavior', out2]);
      } else if(mode === 'similar_solids' || mode === 'cavalieri'){
        var isCav = (mode === 'cavalieri');
        var r1S = isCav ? a : b, h1S = isCav ? b : 2.0;
        var r2S = isCav ? a : b*a, h2S = isCav ? b : 2.0*a;
        P.polygon([[-3.8,0],[-3.8+r1S,0],[-3.8+r1S,h1S],[-3.8,h1S]], 'rgba(30,58,110,0.22)', INDIGO, 2.2);
        if(isCav){
          P.polygon([[-0.5,0],[-0.5+r1S,0],[-0.5,h1S]], 'rgba(200,144,42,0.26)', AMBER2, 2.2);
          P.parametric(function(t){return 3.0 + r1S*Math.cos(t);}, function(t){return r1S + r1S*Math.sin(t);}, 0, 2*Math.PI, TEAL, 2.2);
          var vc = Math.PI*a*a*b;
          out0 = fmt(vc, 2);
          out1 = fmt(vc/3, 2);
          out2 = fmt((4/3)*Math.PI*a*a*a, 2);
        } else {
          P.polygon([[0.5,0],[0.5+r2S,0],[0.5+r2S,h2S],[0.5,h2S]], 'rgba(200,144,42,0.26)', AMBER2, 2.2);
          out0 = 'k = ' + fmt(a, 2);
          out1 = 'k² = ' + fmt(a*a, 2) + '×';
          out2 = 'k³ = ' + fmt(a*a*a, 2) + '×';
        }
        rows.push(['Primary Metric', out0], ['Secondary Metric', out1], ['Tertiary Metric', out2]);
      } else if(mode === 'data_transform'){
        var basePts = [-2, -1, 0, 1, 2];
        for(var di=0; di<basePts.length; di++){
          var xOrig = basePts[di], xTrans = a*xOrig + b;
          P.dot(xOrig, 2.8, INDIGO, 5);
          P.dot(xTrans, 1.2, AMBER2, 5.5);
          P.segment(xOrig, 2.8, xTrans, 1.2, '#94A3B8', 1.2, [3,3]);
        }
        P.label(-5.5, 3.2, 'Original X (μ=0, σ=1.41)', INDIGO);
        P.label(-5.5, 0.6, 'Transformed Y = aX + b', AMBER2);
        out0 = 'μ_Y = ' + fmt(b, 2);
        out1 = 'σ_Y = ' + fmt(Math.abs(a)*1.414, 2);
        out2 = 'Range = ' + fmt(Math.abs(a)*4, 2);
        rows.push(['Scale a', fmt(a,2)], ['Shift b', fmt(b,2)], ['New Mean μ_Y', out0], ['New Std Dev σ_Y', out1]);
      } else if(mode === 'geom_wait'){
        var pW = a, kW = Math.round(b), cdfW = 0, pkW = 0;
        for(var rW=1; rW<=11; rW++){
          var prW = Math.pow(1 - pW, rW - 1) * pW;
          if(rW <= kW) cdfW += prW;
          if(rW === kW) pkW = prW;
          var actW = rW <= kW;
          P.polygon([[rW-0.35,0],[rW+0.35,0],[rW+0.35,prW],[rW-0.35,prW]], actW?'rgba(200,144,42,0.35)':'rgba(30,58,110,0.22)', actW?AMBER2:INDIGO, 1.8);
        }
        out0 = 'P(X='+kW+') = ' + fmt(pkW, 4);
        out1 = 'P(X≤'+kW+') = ' + fmt(cdfW, 4);
        out2 = 'E(X) = ' + fmt(1/pW, 2);
        rows.push(['Success Prob p', fmt(pW,2)], ['Point P(X=k)', out0], ['Cumulative P(X≤k)', out1], ['Mean Waiting 1/p', out2]);
      } else if(mode === 'geom_prob'){
        var R = b, rC = Math.min(R, a);
        P.polygon([[-R,-R],[R,-R],[R,R],[-R,R]], 'rgba(30,58,110,0.12)', INDIGO, 2.2);
        P.parametric(function(t){return rC*Math.cos(t);}, function(t){return rC*Math.sin(t);}, 0, 2*Math.PI, AMBER2, 2.6);
        var ac = Math.PI*rC*rC, asq = 4*R*R, probG = ac/asq;
        out0 = fmt(ac, 2);
        out1 = fmt(asq, 2);
        out2 = 'P = ' + fmt(probG, 4) + ' (' + fmt(probG*100, 1) + '%)';
        rows.push(['Circle Area πr²', out0], ['Square Area (2R)²', out1], ['Probability Ratio', out2]);
      } else if(mode === 'regular_ngon'){
        var nP = Math.max(3, Math.round(a)), RP = b, ptsP = [];
        for(var kP=0; kP<nP; kP++){
          var angP = 0.5*Math.PI + 2*Math.PI*kP/nP;
          var vxP = RP*Math.cos(angP), vyP = RP*Math.sin(angP);
          ptsP.push([vxP, vyP]);
          P.segment(0, 0, vxP, vyP, '#94A3B8', 1.3, [3,3]);
        }
        P.polygon(ptsP, 'rgba(30,58,110,0.18)', INDIGO, 2.5);
        for(var jP=0; jP<nP; jP++) P.dot(ptsP[jP][0], ptsP[jP][1], AMBER2, 5);
        out0 = fmt((nP-2)*180/nP, 1) + '°';
        out1 = fmt(360/nP, 1) + '°';
        out2 = 'Area = ' + fmt(0.5*nP*RP*RP*Math.sin(2*Math.PI/nP), 2);
        rows.push(['Sides n', String(nP)], ['Interior Angle', out0], ['Exterior Angle', out1], ['Polygon Area', out2]);
      } else if(mode === 'tri_similar'){
        var A = [b, 3.2], B = [-3.2, -2.4], C = [3.2, -2.4];
        var D = [A[0] + a*(B[0]-A[0]), A[1] + a*(B[1]-A[1])];
        var E = [A[0] + a*(C[0]-A[0]), A[1] + a*(C[1]-A[1])];
        P.polygon([A, B, C], 'rgba(30,58,110,0.12)', INDIGO, 2.3);
        P.polygon([A, D, E], 'rgba(200,144,42,0.28)', AMBER2, 2.5);
        P.dot(D[0], D[1], AMBER2, 5.5); P.dot(E[0], E[1], AMBER2, 5.5);
        out0 = 'k = ' + fmt(a, 2);
        out1 = 'k² = ' + fmt(a*a, 3);
        out2 = 'DE = ' + fmt(6.4*a, 2) + ', BC = 6.40';
        rows.push(['Scale Factor k', out0], ['Area Ratio k²', out1], ['Parallel Bases', out2]);
      } else if(mode === 'coord_seg'){
        var x1 = -2, y1 = -1, x2 = a, y2 = b;
        var mx = 0.5*(x1+x2), my = 0.5*(y1+y2), dx = x2-x1, dy = y2-y1;
        P.segment(x1, y1, x2, y1, '#94A3B8', 1.5, [3,3]);
        P.segment(x2, y1, x2, y2, '#94A3B8', 1.5, [3,3]);
        P.segment(x1, y1, x2, y2, INDIGO, 2.7);
        if(Math.abs(dy) > 0.08){
          var mp = -dx / dy;
          P.curve(function(x){return my + mp*(x - mx);}, AMBER2, 2.0, [5,4]);
        }
        P.dot(x1, y1, INDIGO, 5.5); P.dot(x2, y2, INDIGO, 5.5); P.dot(mx, my, AMBER2, 6);
        P.label(mx+0.18, my+0.25, 'M('+fmt(mx,1)+','+fmt(my,1)+')', AMBER2);
        out0 = Math.abs(dx)>1e-4 ? ('m = '+fmt(dy/dx,2)) : 'Vertical (∞)';
        out1 = '|AB| = '+fmt(Math.sqrt(dx*dx+dy*dy),2)+', M('+fmt(mx,1)+','+fmt(my,1)+')';
        out2 = Math.abs(dy)>1e-4 ? ('m_⊥ = '+fmt(-dx/dy,2)) : 'Horizontal (0)';
        rows.push(['Point A', '(−2, −1)'], ['Point B', '('+fmt(x2,1)+', '+fmt(y2,1)+')'], ['Gradient & Length', out0+' / '+out1]);
      } else if(mode === 'func_comp'){
        var fComp = function(x){ return a*x + b; };
        var gComp = function(x){ return 0.5*x*x - 1; };
        var fgComp = function(x){ return fComp(gComp(x)); };
        var gfComp = function(x){ return gComp(fComp(x)); };
        P.curve(fComp, '#94A3B8', 1.6, [4,4]);
        P.curve(fgComp, INDIGO, 2.6);
        P.curve(gfComp, AMBER2, 2.4);
        P.dot(1, fgComp(1), INDIGO, 5.5); P.dot(1, gfComp(1), AMBER2, 5.5);
        out0 = 'fg(1) = ' + fmt(fgComp(1), 2);
        out1 = 'gf(1) = ' + fmt(gfComp(1), 2);
        out2 = 'f⁻¹(4) = ' + fmt((4 - b)/a, 2);
        rows.push(['f(x) = mx + c', fmt(a,1)+'x + '+fmt(b,1)], ['Composite fg(1)', out0], ['Composite gf(1)', out1], ['Inverse f⁻¹(4)', out2]);
      } else if(mode === 'error_bounds'){
        var lbL = a - 0.5*b, ubL = a + 0.5*b, lbW = 4 - 0.5*b, ubW = 4 + 0.5*b;
        P.polygon([[0,0],[ubL,0],[ubL,ubW],[0,ubW]], 'rgba(200,144,42,0.22)', AMBER2, 2.0);
        P.polygon([[0,0],[a,0],[a,4],[0,4]], 'rgba(30,58,110,0.18)', INDIGO, 2.4);
        P.polygon([[0,0],[lbL,0],[lbL,lbW],[0,lbW]], 'rgba(14,159,143,0.18)', TEAL, 1.8);
        out0 = '[' + fmt(lbL, 2) + ', ' + fmt(ubL, 2) + ')';
        out1 = 'A_LB = ' + fmt(lbL*lbW, 2);
        out2 = 'A_UB = ' + fmt(ubL*ubW, 2);
        rows.push(['Length Bounds', out0], ['Lower Bound Area', out1], ['Upper Bound Area', out2]);
      } else if(mode === 'hist_density'){
        var fd1 = 10/2.0, fd2 = b/1.0, fd3 = a/2.0, fd4 = 12/1.0;
        P.polygon([[0,0],[2,0],[2,fd1],[0,fd1]], 'rgba(30,58,110,0.22)', INDIGO, 2);
        P.polygon([[2,0],[3,0],[3,fd2],[2,fd2]], 'rgba(200,144,42,0.30)', AMBER2, 2.2);
        P.polygon([[3,0],[5,0],[5,fd3],[3,fd3]], 'rgba(14,159,143,0.28)', TEAL, 2.2);
        P.polygon([[5,0],[6,0],[6,fd4],[5,fd4]], 'rgba(30,58,110,0.22)', INDIGO, 2);
        var meanH = (10*1.0 + b*2.5 + a*4.0 + 12*5.5) / (22 + a + b);
        out0 = 'FD₂ = ' + fmt(fd2, 1);
        out1 = 'FD₃ = ' + fmt(fd3, 1);
        out2 = 'x̄ ≈ ' + fmt(meanH, 2);
        rows.push(['Class [2,3) FD (w=1)', out0], ['Class [3,5) FD (w=2)', out1], ['Estimated Mean', out2]);
      } else if(mode === 'mle_gauss'){
        var ptsM = [-0.5, 0.8, 1.5, 2.2, 3.5];
        var pdfM = function(x){ var z=(x-a)/b; return Math.exp(-0.5*z*z)/(b*Math.sqrt(2*Math.PI)); };
        var llCurve = function(m){
          var s=0;
          for(var i=0;i<5;i++) s += -0.5*Math.log(2*Math.PI*b*b) - Math.pow(ptsM[i]-m,2)/(2*b*b);
          return 0.55 + 0.06*(s + 7.5);
        };
        P.curve(pdfM, INDIGO, 2.6);
        P.curve(llCurve, AMBER2, 2.2, [4,3]);
        for(var mi=0; mi<5; mi++) P.dot(ptsM[mi], 0, TEAL, 5);
        P.vline(a, INDIGO, [3,3]); P.vline(1.5, AMBER2, [3,3]);
        var llVal = 0, gradM = 0;
        for(var jM=0; jM<5; jM++){
          llVal += -0.5*Math.log(2*Math.PI*b*b) - Math.pow(ptsM[jM]-a,2)/(2*b*b);
          gradM += (ptsM[jM] - a)/(b*b);
        }
        out0 = 'ℓ = ' + fmt(llVal, 2);
        out1 = 'μ̂_MLE = 1.50';
        out2 = '∂ℓ/∂μ = ' + fmt(gradM, 2);
        rows.push(['Candidate Mean μ', fmt(a,2)], ['Log-Likelihood ℓ(μ)', out0], ['Score Gradient ∂ℓ/∂μ', out2]);
      } else if(mode === 'grad_descent'){
        var lossFn = function(w){ return (w - 1)*(w - 1) + 0.5; };
        P.curve(lossFn, INDIGO, 2.6);
        var wk = b;
        P.dot(wk, lossFn(wk), AMBER2, 6);
        for(var stepG=0; stepG<6; stepG++){
          var nw = wk - a * 2 * (wk - 1);
          if(Math.abs(nw) < 12){
            P.segment(wk, lossFn(wk), nw, lossFn(nw), AMBER2, 2.2);
            P.dot(nw, lossFn(nw), stepG===5 ? TEAL : AMBER2, 5);
          }
          wk = nw;
        }
        out0 = '∇L(w₀) = ' + fmt(2*(b - 1), 2);
        out1 = 'w₆ = ' + fmt(wk, 3);
        out2 = a >= 1.0 ? 'Divergent (η ≥ 1)' : (a > 0.5 ? 'Oscillating Overshoot' : 'Monotone Convergent');
        rows.push(['Learning Rate η', fmt(a,2)], ['Initial Weight w₀', fmt(b,2)], ['Iterate w₆', out1], ['Regime', out2]);
      } else if(mode === 'ols_reg'){
        var xsO = [-2, -1, 0, 1, 2], ysO = [-1.6, -0.5, 0.4, 1.7, 2.5];
        P.curve(function(x){return 1.04*x + 0.50;}, '#94A3B8', 1.6, [4,4]);
        P.curve(function(x){return a*x + b;}, INDIGO, 2.6);
        var sse = 0;
        for(var oi=0; oi<5; oi++){
          var yhO = a*xsO[oi] + b;
          sse += Math.pow(ysO[oi] - yhO, 2);
          P.segment(xsO[oi], ysO[oi], xsO[oi], yhO, AMBER2, 2.2);
          P.dot(xsO[oi], ysO[oi], INDIGO, 5.5);
        }
        var mse = sse / 5.0, r2 = Math.max(-1, 1 - sse / 10.89);
        out0 = 'MSE = ' + fmt(mse, 3);
        out1 = 'w* = 1.04, b* = 0.50';
        out2 = 'R² = ' + fmt(r2, 3);
        rows.push(['Slope w', fmt(a,2)], ['Intercept b', fmt(b,2)], ['Mean Squared Error', out0], ['R² Score', out2]);
      } else if(mode === 'sigmoid_log'){
        var sig = function(x){ return 1 / (1 + Math.exp(-(a*x + b))); };
        P.hline(0.5, '#94A3B8', [3,3]);
        var xStar = Math.abs(a)>1e-4 ? -b/a : 0;
        P.vline(xStar, AMBER2, [4,4]);
        P.curve(sig, INDIGO, 2.7);
        var c0 = [-2.5, -1.5, -0.6], c1 = [0.8, 1.8, 2.8];
        for(var si=0; si<3; si++){ P.dot(c0[si], 0, INDIGO, 5.5); P.dot(c1[si], 1, AMBER2, 5.5); }
        P.dot(xStar, 0.5, AMBER2, 6);
        out0 = 'x* = ' + fmt(xStar, 2);
        out1 = 'σ(1) = ' + fmt(sig(1), 3);
        out2 = 'BCE ≈ ' + fmt(0.35/Math.max(0.3, a*0.5), 3);
        rows.push(['Weight w', fmt(a,2)], ['Bias b', fmt(b,2)], ['Decision Boundary x*', out0], ['Sigmoid σ(1)', out1]);
      } else if(mode === 'relu_layer'){
        var r1Fn = function(x){ return Math.max(0, a*x + 1.0); };
        var r2Fn = function(x){ return Math.max(0, 1.5*(x - b)); };
        var netFn = function(x){ return r1Fn(x) - r2Fn(x); };
        P.curve(r1Fn, INDIGO2, 1.5, [4,4]);
        P.curve(r2Fn, TEAL, 1.5, [4,4]);
        P.curve(netFn, AMBER2, 2.8);
        var k1 = -1.0/a, k2 = b;
        P.dot(k1, netFn(k1), INDIGO, 5.5); P.dot(k2, netFn(k2), AMBER2, 5.5);
        out0 = 'x₁ = ' + fmt(k1, 2) + ', x₂ = ' + fmt(k2, 2);
        out1 = 'h(2) = ' + fmt(netFn(2), 2);
        out2 = '2 Active ReLU Hinges';
        rows.push(['Hinge Kinks', out0], ['Network Output h(2)', out1]);
      } else if(mode === 'pca_cloud'){
        var radP = a * Math.PI / 180, ux = Math.cos(radP), uy = Math.sin(radP);
        P.segment(-4*ux, -4*uy, 4*ux, 4*uy, AMBER2, 2.6);
        var baseCloud = [[-2.5,-2.1],[-1.8,-1.2],[-0.9,-1.1],[-0.3,0.2],[0.4,-0.2],[1.1,1.0],[1.9,1.5],[2.6,2.3]];
        var vProj = 0;
        for(var pi=0; pi<baseCloud.length; pi++){
          var pxC = baseCloud[pi][0], pyC = b*baseCloud[pi][0] + (1-b)*baseCloud[pi][1]*1.5;
          var proj = pxC*ux + pyC*uy;
          vProj += proj*proj;
          P.segment(pxC, pyC, proj*ux, proj*uy, TEAL, 1.4, [3,2]);
          P.dot(pxC, pyC, INDIGO, 5);
          P.dot(proj*ux, proj*uy, AMBER2, 4);
        }
        vProj /= baseCloud.length;
        out0 = 'Var_θ = ' + fmt(vProj, 3);
        out1 = 'θ* ≈ 42°–45°';
        out2 = 'EVR₁ = ' + fmt(50*(1+b), 1) + '%';
        rows.push(['Axis Angle θ', fmt(a,0)+'°'], ['Projected Variance', out0], ['Explained Variance Ratio', out2]);
      } else if(mode === 'cosine_embed'){
        P.parametric(function(t){return Math.cos(t);}, function(t){return Math.sin(t);}, 0, 2*Math.PI, LINE, 1.6);
        P.polygon([[1,0],[0,1],[-1,0],[0,-1]], 'rgba(148,163,184,0.08)', '#94A3B8', 1.4);
        var ru = a*Math.PI/180, rv = b*Math.PI/180;
        var uxE = Math.cos(ru), uyE = Math.sin(ru), vxE = Math.cos(rv), vyE = Math.sin(rv);
        P.arrow(0, 0, uxE, uyE, INDIGO, 2.7);
        P.arrow(0, 0, vxE, vyE, AMBER2, 2.7);
        var cs = Math.cos(ru - rv), l2 = Math.hypot(uxE-vxE, uyE-vyE), l1 = Math.abs(uxE-vxE)+Math.abs(uyE-vyE);
        out0 = 'cos Δθ = ' + fmt(cs, 3);
        out1 = '‖u−v‖₂ = ' + fmt(l2, 3);
        out2 = '‖u−v‖₁ = ' + fmt(l1, 3);
        rows.push(['Angle θ_u', fmt(a,0)+'°'], ['Angle θ_v', fmt(b,0)+'°'], ['Cosine Similarity', out0], ['L₂ / L₁ Distance', out1+' / '+out2]);
      } else if(mode === 'greens_curl' || mode === 'div_flux'){
        var isFlux = (mode === 'div_flux');
        P.parametric(function(t){return a*Math.cos(t);}, function(t){return a*Math.sin(t);}, 0, 2*Math.PI, INDIGO, 2.6);
        for(var kF=0; kF<12; kF++){
          var angF = 2*Math.PI*kF/12, bxF = a*Math.cos(angF), byF = a*Math.sin(angF);
          var fxF = isFlux ? 0.35*b*Math.cos(angF) : -0.35*b*Math.sin(angF);
          var fyF = isFlux ? 0.35*b*Math.sin(angF) : 0.35*b*Math.cos(angF);
          P.arrow(bxF, byF, bxF+fxF, byF+fyF, AMBER2, 2.2);
        }
        var areaF = Math.PI*a*a;
        if(isFlux){
          out0 = '∇·F = ' + fmt(b, 2);
          out1 = 'Flux = ' + fmt(b*areaF, 2);
          out2 = b > 0 ? 'Outward Source' : (b < 0 ? 'Inward Sink' : 'Zero Net Flux');
        } else {
          out0 = '2ω = ' + fmt(2*b, 2);
          out1 = 'πR² = ' + fmt(areaF, 2);
          out2 = '∮ F·dr = ' + fmt(2*b*areaF, 2);
        }
        rows.push(['Radius R', fmt(a,2)], ['Field Density', out0], ['Integrated Total', out2]);
      } else if(mode === 'spherical_vol'){
        var radS = b * Math.PI / 180;
        var ptsS = [[0,0]];
        for(var kSp=0; kSp<=32; kSp++){
          var angSp = 0.5*Math.PI - radS + (2*radS)*kSp/32;
          ptsS.push([a*Math.cos(angSp), a*Math.sin(angSp)]);
        }
        P.polygon(ptsS, 'rgba(200,144,42,0.25)', AMBER2, 2.5);
        var zc = a*Math.cos(radS), jac = a*a*Math.sin(radS), vol = (2*Math.PI/3)*a*a*a*(1 - Math.cos(radS));
        out0 = 'z = ' + fmt(zc, 2);
        out1 = 'J = ' + fmt(jac, 2);
        out2 = 'V = ' + fmt(vol, 2);
        rows.push(['Spherical Radius ρ₀', fmt(a,2)], ['Cone Angle φ₀', fmt(b,0)+'°'], ['Jacobian ρ₀² sin φ₀', out1], ['Volume V', out2]);
      } else if(mode === 'heaviside_laplace'){
        var stepFn = function(t){ return t < a ? 0 : 1.0; };
        var respFn = function(t){
          if(t < a) return 0;
          var dt = t - a, wd = Math.sqrt(Math.max(0.05, 1 - b*b))*3.0;
          return 1.0 - Math.exp(-b*3.0*dt)*(Math.cos(wd*dt) + (b*3.0/wd)*Math.sin(wd*dt));
        };
        P.curve(stepFn, AMBER2, 2.0, [4,4]);
        P.curve(respFn, INDIGO, 2.7);
        P.vline(a, TEAL, [3,3]);
        var over = 1 + Math.exp(-b*Math.PI/Math.sqrt(Math.max(0.05, 1-b*b)));
        out0 = 'e^(−'+fmt(a,2)+'s)/s';
        out1 = 'y_max = ' + fmt(over, 2);
        out2 = 'y(∞) = 1.00';
        rows.push(['Switch-On Time a', fmt(a,2)], ['Damping Ratio ζ', fmt(b,2)], ['Peak Overshoot', out1]);
      } else if(mode === 'frobenius_series'){
        var degF = Math.round(a);
        var fAiryEx = function(x){ return Math.cos(0.8*x*x) + 0.3*b*Math.sin(x); };
        var fAirySer = function(x){
          var s = 1 + b*x - (x*x*x)/6.0;
          if(degF >= 4) s -= b*(x*x*x*x)/12.0;
          if(degF >= 6) s += Math.pow(x,6)/180.0;
          if(degF >= 7) s += b*Math.pow(x,7)/504.0;
          return s;
        };
        P.curve(fAiryEx, INDIGO, 2.6);
        P.curve(fAirySer, AMBER2, 2.3, [5,3]);
        out0 = 'c_{k+2} = −c_{k−1}/((k+2)(k+1))';
        out1 = 'y_N(1.5) = ' + fmt(fAirySer(1.5), 3);
        out2 = 'Degree N = ' + degF;
        rows.push(['Truncation Degree N', String(degF)], ['Initial Slope y\'(0)', fmt(b,2)], ['Series Value y_N(1.5)', out1]);
      } else if(mode === 'resonance_beats'){
        var det = Math.abs(a - b);
        var fBeat = function(t){
          if(det < 0.05) return 0.5 * t * Math.sin(b * t);
          return (Math.cos(a*t) - Math.cos(b*t)) / Math.max(0.25, Math.abs(b*b - a*a));
        };
        var envFn = function(t){
          if(det < 0.05) return 0.5 * t;
          return 2 * Math.sin(0.5*det*t) / Math.max(0.25, Math.abs(b*b - a*a));
        };
        P.curve(envFn, AMBER2, 1.6, [4,4]);
        P.curve(function(t){return -envFn(t);}, AMBER2, 1.6, [4,4]);
        P.curve(fBeat, INDIGO, 2.5);
        out0 = '|ω − ω₀| = ' + fmt(det, 2);
        out1 = 'Gain = ' + fmt(1/Math.max(0.08, Math.abs(b*b-a*a)), 2);
        out2 = det < 0.05 ? 'Pure Secular Resonance!' : 'Periodic Beats';
        rows.push(['Driving Freq ω', fmt(a,2)], ['Natural Freq ω₀', fmt(b,2)], ['Regime', out2]);
      } else if(mode === 'wronskian_green'){
        P.curve(function(t){return Math.cos(b*t);}, '#94A3B8', 1.4, [3,3]);
        P.curve(function(t){return Math.sin(b*t);}, TEAL, 1.4, [3,3]);
        var gKer = function(t){ return t < a ? 0 : Math.sin(b*(t - a)) / b; };
        P.curve(gKer, AMBER2, 2.8);
        P.vline(a, INDIGO, [4,4]);
        P.dot(a, 0, AMBER2, 5.5);
        out0 = 'W = ' + fmt(b, 2);
        out1 = '1/ω = ' + fmt(1/b, 3);
        out2 = 'G(4, s) = ' + fmt(gKer(4.0), 3);
        rows.push(['Impulse Time s', fmt(a,2)], ['Frequency ω', fmt(b,2)], ['Wronskian W(s)', out0], ['Green\'s Response G(4,s)', out2]);
      }

      if(_elR0) _elR0.textContent = out0;
      if(_elR1) _elR1.textContent = out1;
      if(_elR2) _elR2.textContent = out2;
      if(dDesc) dDesc.textContent = cfg.title + ' — live parameter & metric table.';
      if(dRows) renderDataRows(dRows, rows);
      if(chApi) chApi.check({a: a, b: b});
    }

    register(canvas, draw);
    if(_elS0){ _elS0.addEventListener('input', redrawAll); _elS0.addEventListener('change', redrawAll); }
    if(_elS1){ _elS1.addEventListener('input', redrawAll); _elS1.addEventListener('change', redrawAll); }

    /* Direct on-canvas pointer dragging to manipulate parameters smoothly */
    makeDraggable(canvas, {
      hitTest: function(){ return true; },
      onDrag: function(_, px, py){
        if(!lastP || !_elS0) return;
        var wx = lastP.invX(px), wy = lastP.invY(py);
        var min0 = parseFloat(_elS0.min), max0 = parseFloat(_elS0.max), st0 = parseFloat(_elS0.step)||0.1;
        var normX = (wx - lastP.v.xmin) / Math.max(1e-5, lastP.v.xmax - lastP.v.xmin);
        var vNew0 = min0 + Math.max(0, Math.min(1, normX)) * (max0 - min0);
        if(cfg.square && min0 < 0 && max0 > 0) vNew0 = Math.max(min0, Math.min(max0, wx));
        _elS0.value = Math.round(vNew0 / st0) * st0;
        if(_elS1){
          var min1 = parseFloat(_elS1.min), max1 = parseFloat(_elS1.max), st1 = parseFloat(_elS1.step)||0.1;
          var normY = (wy - lastP.v.ymin) / Math.max(1e-5, lastP.v.ymax - lastP.v.ymin);
          var vNew1 = min1 + Math.max(0, Math.min(1, normY)) * (max1 - min1);
          if(cfg.square && min1 < 0 && max1 > 0) vNew1 = Math.max(min1, Math.min(max1, wy));
          _elS1.value = Math.round(vNew1 / st1) * st1;
        }
        if( typeof update3d === 'function' ) update3d();
      }
    });

    /* Optional 3D ClipSAT3D visualization when canvas3d is configured */
    var btn3d = cfg.btn3dId ? document.getElementById(cfg.btn3dId) : null;
    var wrap3d = cfg.wrap3dId ? document.getElementById(cfg.wrap3dId) : null;
    var hint3d = cfg.hint3dId ? document.getElementById(cfg.hint3dId) : null;
    var built3d = false, H3 = null, meshA = null, meshB = null, meshC = null;
    function update3d(){
      if(!built3d || !H3) return;
      var a = _elS0 ? parseFloat(_elS0.value) : cfg.s0Val;
      var b = _elS1 ? parseFloat(_elS1.value) : cfg.s1Val;
      var scX = Math.max(0.4, Math.min(2.6, 0.5 + 0.35*Math.abs(a)));
      var scY = Math.max(0.4, Math.min(2.6, 0.5 + 0.35*Math.abs(b)));
      if(meshA) meshA.scale.set(scX, scY, scX);
      if(meshB) meshB.scale.set(scX, scY, scX);
      if(meshC) meshC.position.y = 0.3 * b;
      H3.render();
    }
    if(btn3d && wrap3d){
      btn3d.addEventListener('click', function(){
        var open = wrap3d.hidden;
        wrap3d.hidden = !open;
        if(hint3d) hint3d.hidden = !open;
        btn3d.textContent = open ? '✕ Hide 3D Model' : cfg.btn3dLabel;
        if(open && !built3d){
          built3d = true;
          window.ClipSAT3D.load().then(function(mods){
            var T = mods.THREE, COLOR = window.ClipSAT3D.COLOR;
            H3 = window.ClipSAT3D.setup(wrap3d, mods, {az:0.8, el:0.45, dist:10.5, target:new T.Vector3(0,1.2,0),
              axisSegs:[[[-4.5,0,0],[4.5,0,0]],[[0,0,0],[0,4.5,0]],[[0,0,-4.5],[0,0,4.5]]]});
            if(cfg.mode3d === 'surf'){
              var geom = new T.PlaneGeometry(4.8, 4.8, 28, 28);
              geom.rotateX(-Math.PI/2);
              var pos = geom.attributes.position;
              for(var vi=0; vi<pos.count; vi++){
                var vx = pos.getX(vi), vz = pos.getZ(vi);
                pos.setY(vi, 0.16*(vx*vx + vz*vz));
              }
              geom.computeVertexNormals();
              meshA = new T.Mesh(geom, new T.MeshLambertMaterial({color:COLOR.INDIGO, transparent:true, opacity:0.68, side:T.DoubleSide}));
              meshB = new T.Mesh(geom, new T.MeshBasicMaterial({color:COLOR.INK, wireframe:true, transparent:true, opacity:0.22}));
              var plG = new T.PlaneGeometry(3.4, 3.4); plG.rotateX(-Math.PI/2);
              meshC = new T.Mesh(plG, new T.MeshLambertMaterial({color:COLOR.AMBER, transparent:true, opacity:0.55, side:T.DoubleSide}));
              H3.scene.add(meshA); H3.scene.add(meshB); H3.scene.add(meshC);
            } else if(cfg.mode3d === 'vec3'){
              var boxG = new T.BoxGeometry(2.2, 1.8, 2.0);
              meshA = new T.Mesh(boxG, new T.MeshLambertMaterial({color:COLOR.INDIGO, transparent:true, opacity:0.38}));
              meshB = new T.Mesh(boxG, new T.MeshBasicMaterial({color:COLOR.AMBER, wireframe:true}));
              meshA.position.set(1.1, 0.9, 1.0); meshB.position.set(1.1, 0.9, 1.0);
              H3.scene.add(meshA); H3.scene.add(meshB);
            } else {
              var cylG = new T.CylinderGeometry(1.1, 1.1, 1.6, 36, 1, true);
              meshA = new T.Mesh(cylG, new T.MeshLambertMaterial({color:COLOR.INDIGO, transparent:true, opacity:0.32, side:T.DoubleSide}));
              var coneG = new T.ConeGeometry(1.1, 1.6, 36);
              meshB = new T.Mesh(coneG, new T.MeshLambertMaterial({color:COLOR.AMBER, transparent:true, opacity:0.70, side:T.DoubleSide}));
              meshA.position.y = 0.8; meshB.position.y = 0.8;
              H3.scene.add(meshA); H3.scene.add(meshB);
            }
            update3d();
          });
        } else if(open){
          update3d();
        }
      });
      if(_elS0) _elS0.addEventListener('input', update3d);
      if(_elS1) _elS1.addEventListener('input', update3d);
    }
  }

  _mountBespokeExplorer({"canvasId": "apbcbeyondExCanvas", "mode": "taylor", "square": false, "title": "Maclaurin Polynomial Convergence & Lagrange Error Bound", "s0Id": "apbcbeyondExCanvas_s0", "s1Id": "apbcbeyondExCanvas_s1", "v0Id": "apbcbeyondExCanvas_v0", "v1Id": "apbcbeyondExCanvas_v1", "s0Val": 1.5, "s1Val": 3, "s0Step": 0.25, "s1Step": 2, "r0Id": "apbcbeyondExCanvas_r0", "r1Id": "apbcbeyondExCanvas_r1", "r2Id": "apbcbeyondExCanvas_r2", "dataBtnId": "apbcbeyondExCanvas_dataBtn", "dataPanelId": "apbcbeyondExCanvas_dataPanel", "dataDescId": "apbcbeyondExCanvas_dataDesc", "dataRowsId": "apbcbeyondExCanvas_dataRows", "btn3dId": "", "wrap3dId": "", "hint3dId": "", "btn3dLabel": "🧊 View Maclaurin Polynomial Convergence & Lagrange Error Bound in 3D", "mode3d": "solid", "challengePrompt": {"en": "Increase polynomial order N to 7 so the truncation error at x₀ = 1.5 drops below 0.02.", "ar": "ارفع درجة كثيرة حدود تايلور N إلى 7 حتى ينخفض خطأ البتر عند x₀ = 1.5 إلى أقل من 0.02."}, "checkFn": function(a, b){ return b >= 5; }});
  _mountBespokeExplorer({"canvasId": "apbcfrqExCanvas", "mode": "parametric", "square": true, "title": "BC FRQ #2: 2D Parametric Motion (x(t), y(t)) & Velocity Vector", "s0Id": "apbcfrqExCanvas_s0", "s1Id": "apbcfrqExCanvas_s1", "v0Id": "apbcfrqExCanvas_v0", "v1Id": "apbcfrqExCanvas_v1", "s0Val": 2.4, "s1Val": 1.5, "s0Step": 0.2, "s1Step": 0.25, "r0Id": "apbcfrqExCanvas_r0", "r1Id": "apbcfrqExCanvas_r1", "r2Id": "apbcfrqExCanvas_r2", "dataBtnId": "apbcfrqExCanvas_dataBtn", "dataPanelId": "apbcfrqExCanvas_dataPanel", "dataDescId": "apbcfrqExCanvas_dataDesc", "dataRowsId": "apbcfrqExCanvas_dataRows", "btn3dId": "", "wrap3dId": "", "hint3dId": "", "btn3dLabel": "🧊 View BC FRQ #2 in 3D", "mode3d": "solid", "challengePrompt": {"en": "Advance time t₀ past 4.5 to compute the total arc length along the curved trajectory.", "ar": "قدّم الزمن t₀ إلى ما بعد 4.5 لحساب طول القوس الكلي على طول المسار المنحني."}, "checkFn": function(a, b){ return a >= 4.4; }});
  _mountBespokeExplorer({"canvasId": "apbcoverviewExCanvas", "mode": "slopefield", "square": false, "title": "Logistic Differential Equation dP/dt = kP(1 − P/M) & Inflection", "s0Id": "apbcoverviewExCanvas_s0", "s1Id": "apbcoverviewExCanvas_s1", "v0Id": "apbcoverviewExCanvas_v0", "v1Id": "apbcoverviewExCanvas_v1", "s0Val": 0.9, "s1Val": 0.5, "s0Step": 0.1, "s1Step": 0.2, "r0Id": "apbcoverviewExCanvas_r0", "r1Id": "apbcoverviewExCanvas_r1", "r2Id": "apbcoverviewExCanvas_r2", "dataBtnId": "apbcoverviewExCanvas_dataBtn", "dataPanelId": "apbcoverviewExCanvas_dataPanel", "dataDescId": "apbcoverviewExCanvas_dataDesc", "dataRowsId": "apbcoverviewExCanvas_dataRows", "btn3dId": "", "wrap3dId": "", "hint3dId": "", "btn3dLabel": "🧊 View Logistic Differential Equation dP/dt = kP(1 − P/M) & Inflection in 3D", "mode3d": "solid", "challengePrompt": {"en": "Start at P(0) = 0.4 and increase k ≥ 1.2 so the S-curve passes through its inflection point P = 2.", "ar": "ابدأ عند P(0) = 0.4 وارفع معدل النمو k ≥ 1.2 ليمر المنحنى اللوجستي بنقطة انعطافه P = 2."}, "checkFn": function(a, b){ return b <= 0.6 && a >= 1.2; }});
  /* === AUTO-UNIVERSAL-GRAPH-EXPLORERS-START === */
  window.CSMountSixTrigExplorer && window.CSMountSixTrigExplorer({ canvasId: 'uge_apbcc1_trig6Canvas', dataBtnId: 'uge_apbcc1_trig6DataBtn', prefix: 'uge_apbcc1_trig6' });
  window.CSMountSixInvTrigExplorer && window.CSMountSixInvTrigExplorer({ canvasId: 'uge_apbcc1_invtrig6Canvas', dataBtnId: 'uge_apbcc1_invtrig6DataBtn', prefix: 'uge_apbcc1_invtrig6' });
  window.CSMountSlopeFieldExplorer && window.CSMountSlopeFieldExplorer({ canvasId: 'uge_apbcc2_sfCanvas', dataBtnId: 'uge_apbcc2_sfDataBtn', prefix: 'uge_apbcc2_sf', defaultFn: 'logistic' });
  window.CSMountMainFunctionsExplorer && window.CSMountMainFunctionsExplorer({ canvasId: 'uge_apbcoverview_mainfnCanvas', dataBtnId: 'uge_apbcoverview_mainfnDataBtn', prefix: 'uge_apbcoverview_mainfn', defaultFn: 'exponential' });
  window.CSMountHyperbolicExplorer && window.CSMountHyperbolicExplorer({ canvasId: 'uge_apbcc1_hyperCanvas', dataBtnId: 'uge_apbcc1_hyperDataBtn', prefix: 'uge_apbcc1_hyper', defaultFn: 'cosh' });
  /* === AUTO-UNIVERSAL-GRAPH-EXPLORERS-END === */
})(window.CSExplorerKit);
