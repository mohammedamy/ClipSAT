/* Canvas explorers for the apbc track (Plan 5 Phase 5.015, ADR 0039).
   Moved verbatim out of modules/02-core-app.js. build.js minifies this file to
   public/js/ex/apbc.js, which base.njk loads only on the apbc page, right after
   engine.js. The shared helpers come from window.CSExplorerKit (end of 02). The
   plot colours follow the theme, so they are re-read before every draw. */
(function(K){
  "use strict";
  if(!K) return;
  var fmt=K.fmt, Plot=K.Plot, redrawAll=K.redrawAll, wireDataToggle=K.wireDataToggle, renderDataRows=K.renderDataRows, dfdx=K.dfdx, integrate=K.integrate, arrow=K.arrow, _deg=K._deg, _fitView=K._fitView, _clip=K._clip, _set=K._set, _slider=K._slider, _num=K._num;
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
})(window.CSExplorerKit);
