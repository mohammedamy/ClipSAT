/* Canvas explorers for the apab track (Plan 5 Phase 5.015, ADR 0039).
   Moved verbatim out of modules/02-core-app.js. build.js minifies this file to
   public/js/ex/apab.js, which base.njk loads only on the apab page, right after
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

  /* ===================== AP AB · FUNCTION & ITS DERIVATIVE ===================== */
  (function(){
    var canvas=document.getElementById('apDerivCanvas'); if(!canvas) return;
    var xv=1, s=document.getElementById('apDerivX');
    var view={xmin:-2.8,xmax:2.8,ymin:-4,ymax:6};
    var dataBtn=document.getElementById('apDerivDataBtn'), dataPanel=document.getElementById('apDerivDataPanel'),
        dataDesc=document.getElementById('apDerivDataDesc'), dataRows=document.getElementById('apDerivDataRows');
    wireDataToggle(dataBtn,dataPanel);
    function f(x){ return x*x*x/3 - x; }
    function fp(x){ return x*x - 1; }
    function updateDataView(){
      if(!dataDesc) return;
      dataDesc.textContent='Function f(x) = x³/3 − x, with its derivative f′(x) = x² − 1 plotted alongside it. At x = '+fmt(xv,2)+', f(x) = '+fmt(f(xv),2)+' and f′(x) = '+fmt(fp(xv),2)+'.';
      var N=9, rows=[];
      for(var i=0;i<N;i++){ var x=view.xmin+(view.xmax-view.xmin)*i/(N-1); rows.push([fmt(x),fmt(f(x)),fmt(fp(x))]); }
      renderDataRows(dataRows,rows);
    }
    function draw(ctx,w,h){
      var P=new Plot(ctx,w,h,view,{l:26,r:12,t:12,b:20}); P.clear(); P.grid();
      P.curve(f, INDIGO, 2.6);
      P.curve(fp, AMBER2, 2.2);
      P.vline(xv, '#9FB0C7', [4,4]);
      var m=fp(xv);
      P.segment(xv-0.85, f(xv)-m*0.85, xv+0.85, f(xv)+m*0.85, INDIGO2, 2);
      P.dot(xv, f(xv), INDIGO, 5);
      P.dot(xv, fp(xv), AMBER2, 5);
      _set('apDerivFx', f(xv).toFixed(2));
      _set('apDerivSlope', m.toFixed(2));
      updateDataView();
    }
    register(canvas,draw);
    if(s){
      s.addEventListener('input',function(){
        xv=parseFloat(s.value);
        _set('apDerivXV', xv.toFixed(1));
        updateDataView();
        redrawAll();
      });
    }
    updateDataView();
  })();

  /* ===================== AP AB · MEAN VALUE THEOREM ===================== */
  (function(){
    var canvas=document.getElementById('apMvtCanvas'); if(!canvas) return;
    var bb=6, s=document.getElementById('apMvtB');
    var view={xmin:-0.6,xmax:8.6,ymin:-1.6,ymax:3.6};
    var dataBtn=document.getElementById('apMvtDataBtn'), dataPanel=document.getElementById('apMvtDataPanel'),
        dataDesc=document.getElementById('apMvtDataDesc'), dataRows=document.getElementById('apMvtDataRows');
    wireDataToggle(dataBtn,dataPanel);
    function f(x){ return -0.15*x*x + x + 1; }
    function fp(x){ return -0.3*x + 1; }
    function updateDataView(a,m,c){
      if(!dataDesc) return;
      dataDesc.textContent='Curve f(x) = −0.15x² + x + 1 on [0, '+fmt(bb,2)+']. Secant slope = (f(b)−f(a))/(b−a) = '+fmt(m,2)+'. By the Mean Value Theorem, f′(c) = '+fmt(m,2)+' at c = '+fmt(c,2)+' (confirmed: f′(c) = '+fmt(fp(c),2)+').';
      var N=9, rows=[];
      for(var i=0;i<N;i++){ var x=a+(bb-a)*i/(N-1); rows.push([fmt(x),fmt(f(x))]); }
      renderDataRows(dataRows,rows);
    }
    function draw(ctx,w,h){
      var P=new Plot(ctx,w,h,view,{l:24,r:12,t:12,b:20}); P.clear(); P.grid();
      P.curve(f, INDIGO, 2.6);
      var a=0, m=(f(bb)-f(a))/(bb-a), c=bb/2; // quadratic: MVT point is midpoint
      P.segment(a, f(a), bb, f(bb), AMBER2, 2);          // secant
      P.segment(c-1.6, f(c)-m*1.6, c+1.6, f(c)+m*1.6, INDIGO2, 2.4, [6,4]); // parallel tangent
      P.dot(a,f(a),AMBER2,5); P.dot(bb,f(bb),AMBER2,5);
      P.ring(c,f(c),INDIGO,6);
      _set('apMvtSlope', m.toFixed(2));
      _set('apMvtC', c.toFixed(2));
      updateDataView(a,m,c);
    }
    register(canvas,draw);
    if(s){
      s.addEventListener('input',function(){
        bb=parseFloat(s.value);
        _set('apMvtBV', bb);
        var a=0, m=(f(bb)-f(a))/(bb-a), c=bb/2;
        updateDataView(a,m,c);
        redrawAll();
      });
    }
    updateDataView(0, (f(bb)-f(0))/bb, bb/2);
  })();

  /* ===================== AP AB · RIEMANN SUMS ===================== */
  (function(){
    var canvas=document.getElementById('apRiemCanvas'); if(!canvas) return;
    var n=6, type='left', sn=document.getElementById('apRiemN'), st=document.getElementById('apRiemType');
    var a=0,b=4, view={xmin:-0.4,xmax:4.4,ymin:-0.6,ymax:8};
    var dataBtn=document.getElementById('apRiemDataBtn'), dataPanel=document.getElementById('apRiemDataPanel'),
        dataDesc=document.getElementById('apRiemDataDesc'), dataRows=document.getElementById('apRiemDataRows');
    wireDataToggle(dataBtn,dataPanel);
    function f(x){ return 0.4*x*x + 1; }
    var exact=0.4*Math.pow(b,3)/3 + (b-a); // ∫0^4 (0.4x^2+1) dx
    var TYPE_NAME={ left:'Left', right:'Right', mid:'Midpoint' };
    function updateDataView(approx){
      if(!dataDesc) return;
      var dx=(b-a)/n;
      dataDesc.textContent='Function f(x) = 0.4x² + 1 on ['+a+', '+b+'], partitioned into '+n+' rectangles of width '+fmt(dx,3)+' using the '+TYPE_NAME[type]+' rule. Approximate sum ≈ '+fmt(approx,3)+'. Exact value = '+fmt(exact,3)+' (error '+fmt(Math.abs(exact-approx),3)+').';
      var rows=[];
      for(var i=0;i<n;i++){
        var xl=a+i*dx, xr=xl+dx, xs= type==='left'?xl : (type==='right'?xr : xl+dx/2);
        var hh=f(xs);
        rows.push([(i+1),'['+fmt(xl)+', '+fmt(xr)+']',fmt(xs),fmt(hh),fmt(hh*dx)]);
      }
      renderDataRows(dataRows,rows);
    }
    function calcApprox(){
      var dx=(b-a)/n, ap=0;
      for(var i=0;i<n;i++){
        var xl=a+i*dx, xs= type==='left'?xl : (type==='right'?xl+dx : xl+dx/2);
        ap+=f(xs)*dx;
      }
      return ap;
    }
    function draw(ctx,w,h){
      var P=new Plot(ctx,w,h,view,{l:24,r:12,t:12,b:20}); P.clear(); P.grid();
      var dx=(b-a)/n, approx=0;
      for(var i=0;i<n;i++){
        var xl=a+i*dx, xs= type==='left'?xl : (type==='right'?xl+dx : xl+dx/2);
        var hh=f(xs); approx+=hh*dx;
        var X0=P.X(xl), X1=P.X(xl+dx), Y0=P.Y(0), Y1=P.Y(hh);
        ctx.fillStyle='rgba(184,128,31,0.18)'; ctx.fillRect(X0, Y1, X1-X0, Y0-Y1);
        ctx.strokeStyle=AMBER2; ctx.lineWidth=1; ctx.strokeRect(X0, Y1, X1-X0, Y0-Y1);
      }
      P.curve(f, INDIGO, 2.6);
      _set('apRiemApprox', approx.toFixed(3));
      _set('apRiemExact', exact.toFixed(3));
      updateDataView(approx);
    }
    register(canvas,draw);
    if(sn){
      sn.addEventListener('input',function(){
        n=parseInt(sn.value,10);
        _set('apRiemNV', n);
        updateDataView(calcApprox());
        redrawAll();
      });
    }
    if(st){
      st.addEventListener('change',function(){
        type=st.value;
        updateDataView(calcApprox());
        redrawAll();
      });
    }
    updateDataView(calcApprox());
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

  /* ===================== EPSILON-DELTA LIMIT EXPLORER ===================== */
  function initEpsDeltaExplorer(pfx){
    var canvas=document.getElementById(pfx+'Canvas'); if(!canvas) return;
    var sEps=document.getElementById(pfx+'Eps'), sDelta=document.getElementById(pfx+'Delta');
    var elEpsV=document.getElementById(pfx+'EpsV'), elDeltaV=document.getElementById(pfx+'DeltaV'),
        elMaxDelta=document.getElementById(pfx+'MaxDelta'), elValid=document.getElementById(pfx+'Valid');
    var dataBtn=document.getElementById(pfx+'DataBtn'), dataPanel=document.getElementById(pfx+'DataPanel'),
        dataDesc=document.getElementById(pfx+'DataDesc'), dataRows=document.getElementById(pfx+'DataRows');
    wireDataToggle(dataBtn,dataPanel);

    var cVal = 2.0, LVal = 3.0;
    function f(x){ return 2*x - 1; }
    var view = {xmin: 0.5, xmax: 3.5, ymin: 0.5, ymax: 5.5};

    var epsVal = 0.50, deltaVal = 0.25;

    function updateDataView(){
      if(!dataDesc) return;
      var maxDelta = epsVal / 2;
      var isValid = deltaVal <= maxDelta + 1e-5;
      dataDesc.textContent = 'Precise (ε, δ) definition visualizer for f(x) = 2x − 1 at target point c = 2, limit L = 3. Current error tolerance ε = ' + fmt(epsVal, 2) + ' (corridor [' + fmt(LVal - epsVal, 2) + ', ' + fmt(LVal + epsVal, 2) + ']), probe radius δ = ' + fmt(deltaVal, 2) + ' (interval [' + fmt(cVal - deltaVal, 2) + ', ' + fmt(cVal + deltaVal, 2) + ']). Maximum valid δ = ε / 2 = ' + fmt(maxDelta, 3) + '. Condition 0 < |x - 2| < δ ⇒ |f(x) - 3| < ε is ' + (isValid ? 'SATISFIED ✔' : 'VIOLATED (δ too large, curve escapes ε-corridor) ❌') + '.';

      var sampleXs = [cVal - deltaVal, cVal - deltaVal/2, cVal, cVal + deltaVal/2, cVal + deltaVal];
      var rows = [];
      for(var i=0; i<sampleXs.length; i++){
        var sx = sampleXs[i];
        var sy = f(sx);
        var err = Math.abs(sy - LVal);
        var inBand = err < epsVal + 1e-5;
        rows.push([fmt(sx, 3), fmt(sy, 3), fmt(err, 3), inBand ? 'Inside ε-band ✔' : 'Escapes band ❌']);
      }
      renderDataRows(dataRows, rows);
    }

    function draw(ctx, w, h){
      var P = new Plot(ctx, w, h, view, {l: 34, r: 14, t: 16, b: 26});
      P.clear(); P.grid();

      var maxDelta = epsVal / 2;
      var isValid = deltaVal <= maxDelta + 1e-5;

      var Ytop = P.Y(LVal + epsVal), Ybot = P.Y(LVal - epsVal);
      ctx.fillStyle = isValid ? 'rgba(16, 185, 129, 0.12)' : 'rgba(239, 68, 68, 0.12)';
      ctx.fillRect(P.pad.l, Ytop, P.w - P.pad.l - P.pad.r, Ybot - Ytop);

      P.segment(view.xmin, LVal + epsVal, view.xmax, LVal + epsVal, isValid ? '#10b981' : '#ef4444', 1.2, [4, 4]);
      P.segment(view.xmin, LVal - epsVal, view.xmax, LVal - epsVal, isValid ? '#10b981' : '#ef4444', 1.2, [4, 4]);

      var Xleft = P.X(cVal - deltaVal), Xright = P.X(cVal + deltaVal);
      ctx.fillStyle = 'rgba(99, 102, 241, 0.10)';
      ctx.fillRect(Xleft, P.pad.t, Xright - Xleft, P.h - P.pad.t - P.pad.b);

      P.vline(cVal - deltaVal, INDIGO2, [5, 4]);
      P.vline(cVal + deltaVal, INDIGO2, [5, 4]);

      P.curve(f, INDIGO, 2.2);
      P.segment(cVal - deltaVal, f(cVal - deltaVal), cVal + deltaVal, f(cVal + deltaVal), isValid ? '#10b981' : '#ef4444', 3.4);
      P.ring(cVal, LVal, AMBER2, 6);

      _set(pfx+'EpsV', fmt(epsVal, 2));
      _set(pfx+'DeltaV', fmt(deltaVal, 2));
      _set(pfx+'MaxDelta', fmt(maxDelta, 3));
      if(elValid){
        elValid.textContent = isValid ? 'Valid: curve inside ε-band ✔' : 'Too large: curve escapes ε-band ❌';
        elValid.style.color = isValid ? 'var(--emerald, #10b981)' : 'var(--crimson, #ef4444)';
      }

      updateDataView();
    }

    register(canvas, draw);

    function syncState(){
      if(sEps) epsVal = parseFloat(sEps.value);
      if(sDelta) deltaVal = parseFloat(sDelta.value);
      updateDataView();
      redrawAll();
    }

    if(sEps){ sEps.addEventListener('input', syncState); sEps.addEventListener('change', syncState); }
    if(sDelta){ sDelta.addEventListener('input', syncState); sDelta.addEventListener('change', syncState); }
    syncState();
  }

  /* ===================== AP AB · INVERSE FUNCTIONS & RECIPROCAL SLOPES ===================== */
  function initInvExplorer(pfx){
    var canvas=document.getElementById(pfx+'Canvas'); if(!canvas) return;
    var sA=document.getElementById(pfx+'A');
    var elAV=document.getElementById(pfx+'AV'), elPt=document.getElementById(pfx+'Pt'),
        elFa=document.getElementById(pfx+'Fa'), elFi=document.getElementById(pfx+'Fi');
    var dataBtn=document.getElementById(pfx+'DataBtn'), dataPanel=document.getElementById(pfx+'DataPanel'),
        dataDesc=document.getElementById(pfx+'DataDesc'), dataRows=document.getElementById(pfx+'DataRows');
    wireDataToggle(dataBtn,dataPanel);

    var aVal = 0.8;
    var view = {xmin: -2.5, xmax: 2.5, ymin: -2.5, ymax: 2.5};

    function f(x){ return 0.5*x*x*x + 0.8*x; }
    function fp(x){ return 1.5*x*x + 0.8; }

    function updateDataView(){
      if(!dataDesc) return;
      var bVal = f(aVal);
      var mF = fp(aVal);
      var mInv = 1 / mF;
      var prod = mF * mInv;
      dataDesc.textContent = 'Inverse Function Analysis for f(x) = 0.5x³ + 0.8x. At input a = ' + fmt(aVal, 2) + ', point on f is (' + fmt(aVal, 2) + ', ' + fmt(bVal, 2) + ') with tangent slope f′(a) = ' + fmt(mF, 3) + '. The reflected point on f⁻¹ is (' + fmt(bVal, 2) + ', ' + fmt(aVal, 2) + ') with slope (f⁻¹)′(b) = 1/f′(a) = ' + fmt(mInv, 3) + '. Slope product: ' + fmt(prod, 3) + ' (exact reciprocal).';

      var rows = [];
      var sampleAs = [-1.4, -1.0, -0.6, -0.2, 0.0, 0.2, 0.6, 1.0, 1.4];
      for(var i=0; i<sampleAs.length; i++){
        var sa = sampleAs[i];
        var sb = f(sa);
        var smf = fp(sa);
        var sminv = 1 / smf;
        rows.push([
          '(' + fmt(sa, 2) + ', ' + fmt(sb, 2) + ')',
          fmt(smf, 3),
          '(' + fmt(sb, 2) + ', ' + fmt(sa, 2) + ')',
          fmt(sminv, 3),
          fmt(smf * sminv, 3)
        ]);
      }
      renderDataRows(dataRows, rows);
    }

    function draw(ctx, w, h){
      var P = new Plot(ctx, w, h, view, {l: 26, r: 12, t: 14, b: 20});
      P.clear(); P.grid();

      var bVal = f(aVal);
      var mF = fp(aVal);
      var mInv = 1 / mF;

      // Reflection line y = x
      P.segment(view.xmin, view.xmin, view.xmax, view.xmax, LINE, 1.4, [5, 4]);

      // Curve f(x)
      P.curve(f, INDIGO, 2.6);

      // Inverse curve f^-1 (parametric)
      ctx.strokeStyle = AMBER2;
      ctx.lineWidth = 2.4;
      ctx.beginPath();
      var started = false;
      var Npts = 100;
      for(var i=0; i<=Npts; i++){
        var t = view.ymin + (view.ymax - view.ymin) * i / Npts;
        var xt = f(t);
        var yt = t;
        if(xt >= view.xmin - 0.5 && xt <= view.xmax + 0.5){
          var px = P.X(xt), py = P.Y(yt);
          if(!started){ ctx.moveTo(px, py); started = true; } else { ctx.lineTo(px, py); }
        }
      }
      ctx.stroke();

      // Dashed segment connecting (a, b) and (b, a)
      P.segment(aVal, bVal, bVal, aVal, 'rgba(159,176,199,0.7)', 1.2, [4, 3]);

      // Tangent to f at (a, b)
      var tLen = 0.8;
      P.segment(aVal - tLen, bVal - mF*tLen, aVal + tLen, bVal + mF*tLen, INDIGO2, 2.0);

      // Tangent to f^-1 at (b, a)
      P.segment(bVal - tLen, aVal - mInv*tLen, bVal + tLen, aVal + mInv*tLen, AMBER, 2.0);

      // Dots
      P.dot(aVal, bVal, INDIGO, 5.5);
      P.dot(bVal, aVal, AMBER2, 5.5);

      _set(pfx+'AV', aVal.toFixed(1));
      _set(pfx+'Pt', '(' + aVal.toFixed(2) + ', ' + bVal.toFixed(2) + ')');
      _set(pfx+'Fa', mF.toFixed(3));
      _set(pfx+'Fi', mInv.toFixed(3));

      updateDataView();
    }

    register(canvas, draw);

    function syncState(){
      if(sA) aVal = parseFloat(sA.value);
      _set(pfx+'AV', aVal.toFixed(1));
      updateDataView();
      redrawAll();
    }

    if(sA){
      sA.addEventListener('input', syncState);
      sA.addEventListener('change', syncState);
    }
    syncState();
  }

  /* ===================== AP AB · LINEARIZATION & CONCAVITY ERROR ===================== */
  function initLinExplorer(pfx){
    var canvas=document.getElementById(pfx+'Canvas'); if(!canvas) return;
    var sX=document.getElementById(pfx+'X'), sA=document.getElementById(pfx+'A');
    var elXV=document.getElementById(pfx+'XV'), elAV=document.getElementById(pfx+'AV'),
        elFx=document.getElementById(pfx+'Fx'), elLx=document.getElementById(pfx+'Lx'),
        elErr=document.getElementById(pfx+'Err'), elType=document.getElementById(pfx+'Type');
    var dataBtn=document.getElementById(pfx+'DataBtn'), dataPanel=document.getElementById(pfx+'DataPanel'),
        dataDesc=document.getElementById(pfx+'DataDesc'), dataRows=document.getElementById(pfx+'DataRows');
    wireDataToggle(dataBtn,dataPanel);

    var xVal = 2.8, aVal = 2.0;
    var view = {xmin: 0.2, xmax: 4.8, ymin: 0.0, ymax: 2.8};

    function f(x){ return Math.sqrt(x); }
    function fp(x){ return 0.5 / Math.sqrt(x); }
    function L(x, a){ return f(a) + fp(a)*(x - a); }

    function updateDataView(){
      if(!dataDesc) return;
      var yTrue = f(xVal);
      var yLin = L(xVal, aVal);
      var err = yLin - yTrue;
      var isOver = err >= -1e-6;
      dataDesc.textContent = 'Linear approximation for f(x) = √x centered at a = ' + fmt(aVal, 2) + '. At probe x = ' + fmt(xVal, 2) + ', true value f(x) = ' + fmt(yTrue, 3) + ', linear estimate L(x) = ' + fmt(yLin, 3) + '. Error L(x) − f(x) = ' + (err >= 0 ? '+' : '') + fmt(err, 4) + '. Concavity: f″(x) = −1/(4x^(3/2)) < 0 (concave down), so tangent lies above curve: ' + (isOver ? 'Overestimate ✔' : 'Underestimate') + '.';

      var rows = [];
      var sampleXs = [0.5, 1.0, 1.5, 2.0, 2.5, 3.0, 3.5, 4.0, 4.5];
      for(var i=0; i<sampleXs.length; i++){
        var sx = sampleXs[i];
        var sTrue = f(sx);
        var sLin = L(sx, aVal);
        var sErr = sLin - sTrue;
        rows.push([
          fmt(sx, 2),
          fmt(sTrue, 3),
          fmt(sLin, 3),
          (sErr >= 0 ? '+' : '') + fmt(sErr, 4),
          sErr >= -1e-6 ? 'Overestimate (f″ < 0)' : 'Underestimate'
        ]);
      }
      renderDataRows(dataRows, rows);
    }

    function draw(ctx, w, h){
      var P = new Plot(ctx, w, h, view, {l: 28, r: 14, t: 14, b: 22});
      P.clear(); P.grid();

      var yTrue = f(xVal);
      var yLin = L(xVal, aVal);
      var err = yLin - yTrue;

      // Curve f(x) = sqrt(x)
      P.curve(f, INDIGO, 2.6);

      // Tangent line L(x)
      P.curve(function(x){ return L(x, aVal); }, AMBER2, 2.0);

      // Tangent point (a, f(a))
      P.ring(aVal, f(aVal), INDIGO, 6);

      // Probe vertical line at xVal
      P.vline(xVal, 'rgba(159,176,199,0.7)', [4, 4]);

      // Error segment between true and linear
      P.segment(xVal, yTrue, xVal, yLin, '#ef4444', 3.0);

      // Probe dots
      P.dot(xVal, yTrue, INDIGO, 5.0);
      P.dot(xVal, yLin, AMBER2, 5.0);

      _set(pfx+'XV', xVal.toFixed(1));
      _set(pfx+'AV', aVal.toFixed(1));
      _set(pfx+'Fx', yTrue.toFixed(3));
      _set(pfx+'Lx', yLin.toFixed(3));
      _set(pfx+'Err', (err >= 0 ? '+' : '') + err.toFixed(3));
      _set(pfx+'Type', 'Overestimate (f″ < 0)');

      updateDataView();
    }

    register(canvas, draw);

    function syncState(){
      if(sX) xVal = parseFloat(sX.value);
      if(sA) aVal = parseFloat(sA.value);
      _set(pfx+'XV', xVal.toFixed(1));
      _set(pfx+'AV', aVal.toFixed(1));
      updateDataView();
      redrawAll();
    }

    if(sX){ sX.addEventListener('input', syncState); sX.addEventListener('change', syncState); }
    if(sA){ sA.addEventListener('input', syncState); sA.addEventListener('change', syncState); }
    syncState();
  }

  /* ===================== AP AB · SLOPE FIELDS & SOLUTION CURVES ===================== */
  function initSlopeExplorer(pfx){
    var canvas=document.getElementById(pfx+'Canvas'); if(!canvas) return;
    var sY0=document.getElementById(pfx+'Y0'), sEq=document.getElementById(pfx+'Eq');
    var elY0V=document.getElementById(pfx+'Y0V'), elInit=document.getElementById(pfx+'Init'),
        elValAt1=document.getElementById(pfx+'ValAt1'), elAsymp=document.getElementById(pfx+'Asymp');
    var dataBtn=document.getElementById(pfx+'DataBtn'), dataPanel=document.getElementById(pfx+'DataPanel'),
        dataDesc=document.getElementById(pfx+'DataDesc'), dataRows=document.getElementById(pfx+'DataRows');
    wireDataToggle(dataBtn,dataPanel);

    var y0Val = 1.0;
    var eqType = 'linear';
    var view = {xmin: -2.8, xmax: 2.8, ymin: -2.8, ymax: 2.8};

    function slopeFn(eq, x, y){
      if(eq === 'circle'){
        if(Math.abs(y) < 1e-4) return 100 * (x < 0 ? 1 : -1);
        return -x / y;
      } else if(eq === 'decay'){
        return -0.6 * y;
      } else {
        return x - y;
      }
    }

    function solFn(eq, x, y0){
      if(eq === 'circle'){
        var r2 = y0 * y0;
        if(x * x > r2) return null;
        var s = Math.sqrt(r2 - x * x);
        return y0 >= 0 ? s : -s;
      } else if(eq === 'decay'){
        return y0 * Math.exp(-0.6 * x);
      } else {
        // dy/dx = x - y with y(0) = y0 => y = x - 1 + (y0 + 1)e^-x
        return x - 1 + (y0 + 1) * Math.exp(-x);
      }
    }

    function updateDataView(){
      if(!dataDesc) return;
      var y1 = solFn(eqType, 1.0, y0Val);
      var y1Str = y1 === null ? 'undefined' : fmt(y1, 3);
      var eqName = eqType === 'circle' ? 'dy/dx = −x/y' : (eqType === 'decay' ? 'dy/dx = −0.6y' : 'dy/dx = x − y');
      dataDesc.textContent = 'Slope Field & Solution Trajectory for ' + eqName + ' through initial condition (0, ' + fmt(y0Val, 2) + '). Value at x = 1.0 is y(1) = ' + y1Str + '. Solution curve follows the local tangent field flow.';

      var rows = [];
      var gridSamples = [
        [-2, -1], [-2, 1], [-1, 0], [-1, 2], [0, -1], [0, 1], [1, -1], [1, 2], [2, 0], [2, 2]
      ];
      for(var i=0; i<gridSamples.length; i++){
        var gx = gridSamples[i][0], gy = gridSamples[i][1];
        var sl = slopeFn(eqType, gx, gy);
        var angleDeg = Math.round(Math.atan(sl) * 180 / Math.PI);
        var onSol = solFn(eqType, gx, y0Val);
        var dist = onSol === null ? 'N/A' : fmt(Math.abs(onSol - gy), 2);
        rows.push([
          '(' + gx + ', ' + gy + ')',
          fmt(sl, 2),
          angleDeg + '°',
          dist === '0.00' ? 'On curve ✔' : 'Off curve (dist ' + dist + ')'
        ]);
      }
      renderDataRows(dataRows, rows);
    }

    function draw(ctx, w, h){
      var P = new Plot(ctx, w, h, view, {l: 26, r: 14, t: 14, b: 20});
      P.clear(); P.grid();

      // Draw grid of slope ticks
      var step = 0.5;
      var tickLen = 0.16;
      for(var gx = -2.5; gx <= 2.5 + 1e-4; gx += step){
        for(var gy = -2.5; gy <= 2.5 + 1e-4; gy += step){
          var m = slopeFn(eqType, gx, gy);
          var ang = Math.atan(m);
          var dx = Math.cos(ang) * tickLen;
          var dy = Math.sin(ang) * tickLen;
          P.segment(gx - dx, gy - dy, gx + dx, gy + dy, 'rgba(159, 176, 199, 0.65)', 1.4);
        }
      }

      // Draw solution curve
      P.curve(function(x){ return solFn(eqType, x, y0Val); }, INDIGO, 2.8);

      // Initial point (0, y0)
      P.dot(0, y0Val, AMBER2, 6);

      var y1 = solFn(eqType, 1.0, y0Val);
      var y1Str = y1 === null ? 'N/A' : y1.toFixed(3);

      _set(pfx+'Y0V', y0Val.toFixed(1));
      _set(pfx+'Init', '(0.0, ' + y0Val.toFixed(1) + ')');
      _set(pfx+'ValAt1', y1Str);
      _set(pfx+'Asymp', eqType === 'linear' ? 'y = x − 1' : (eqType === 'circle' ? 'Circle r = ' + Math.abs(y0Val).toFixed(1) : 'Horizontal y = 0'));

      updateDataView();
    }

    register(canvas, draw);

    function syncState(){
      if(sY0) y0Val = parseFloat(sY0.value);
      if(sEq) eqType = sEq.value;
      _set(pfx+'Y0V', y0Val.toFixed(1));
      updateDataView();
      redrawAll();
    }

    if(sY0){ sY0.addEventListener('input', syncState); sY0.addEventListener('change', syncState); }
    if(sEq){ sEq.addEventListener('change', syncState); }
    syncState();
  }

  /* ===================== AP AB · AREA BETWEEN CURVES & SLICING ===================== */
  function initAreaExplorer(pfx){
    var canvas=document.getElementById(pfx+'Canvas'); if(!canvas) return;
    var sB=document.getElementById(pfx+'B'), sX=document.getElementById(pfx+'X');
    var elBV=document.getElementById(pfx+'BV'), elXV=document.getElementById(pfx+'XV'),
        elTop=document.getElementById(pfx+'Top'), elBot=document.getElementById(pfx+'Bot'),
        elHeight=document.getElementById(pfx+'Height'), elTotal=document.getElementById(pfx+'Total');
    var dataBtn=document.getElementById(pfx+'DataBtn'), dataPanel=document.getElementById(pfx+'DataPanel'),
        dataDesc=document.getElementById(pfx+'DataDesc'), dataRows=document.getElementById(pfx+'DataRows');
    wireDataToggle(dataBtn,dataPanel);

    var bVal = 2.5, xVal = 1.5;
    var view = {xmin: -0.4, xmax: 3.8, ymin: -0.4, ymax: 4.2};

    function f(x){ return -0.3*x*x + 3.5; }
    function g(x){ return 0.25*x*x; }
    function height(x){ return f(x) - g(x); }
    function totalArea(b){ return 3.5*b - (0.55/3)*Math.pow(b, 3); }

    function updateDataView(){
      if(!dataDesc) return;
      var probeX = Math.min(xVal, bVal);
      var yTop = f(probeX), yBot = g(probeX);
      var hProbe = height(probeX);
      var totA = totalArea(bVal);
      dataDesc.textContent = 'Area between curves f(x) = −0.3x² + 3.5 (upper) and g(x) = 0.25x² (lower) integrated from x = 0 to b = ' + fmt(bVal, 2) + '. Total enclosed area = ' + fmt(totA, 3) + '. At representative vertical slice x* = ' + fmt(probeX, 2) + ', top curve is ' + fmt(yTop, 3) + ', bottom curve is ' + fmt(yBot, 3) + ', and slice height h(x*) = ' + fmt(hProbe, 3) + '.';

      var rows = [];
      var N = 8;
      for(var i=0; i<=N; i++){
        var sx = (bVal * i) / N;
        var sTop = f(sx), sBot = g(sx);
        var sH = height(sx);
        var sCum = totalArea(sx);
        rows.push([fmt(sx, 2), fmt(sTop, 3), fmt(sBot, 3), fmt(sH, 3), fmt(sCum, 3)]);
      }
      renderDataRows(dataRows, rows);
    }

    function draw(ctx, w, h){
      var P = new Plot(ctx, w, h, view, {l: 26, r: 14, t: 14, b: 20});
      P.clear(); P.grid();

      var probeX = Math.min(xVal, bVal);
      var yTop = f(probeX), yBot = g(probeX);
      var hProbe = height(probeX);
      var totA = totalArea(bVal);

      // Shaded area between f and g from 0 to b
      ctx.fillStyle = 'rgba(99, 102, 241, 0.16)';
      ctx.beginPath();
      var Npts = 40;
      for(var i=0; i<=Npts; i++){
        var sx = (bVal * i) / Npts;
        var px = P.X(sx), py = P.Y(f(sx));
        if(i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
      }
      for(var j=Npts; j>=0; j--){
        var sx2 = (bVal * j) / Npts;
        var px2 = P.X(sx2), py2 = P.Y(g(sx2));
        ctx.lineTo(px2, py2);
      }
      ctx.closePath();
      ctx.fill();

      // Curves
      P.curve(f, INDIGO, 2.6);
      P.curve(g, AMBER2, 2.4);

      // Right boundary line x = b
      P.vline(bVal, 'rgba(159,176,199,0.7)', [4, 4]);

      // Vertical slice at probeX
      var sliceW = 0.12;
      var X0 = P.X(probeX - sliceW/2), X1 = P.X(probeX + sliceW/2);
      var Y0 = P.Y(yTop), Y1 = P.Y(yBot);
      ctx.fillStyle = 'rgba(184, 128, 31, 0.45)';
      ctx.fillRect(X0, Y0, X1 - X0, Y1 - Y0);
      ctx.strokeStyle = AMBER2;
      ctx.lineWidth = 1.5;
      ctx.strokeRect(X0, Y0, X1 - X0, Y1 - Y0);

      // Slice probe dots
      P.dot(probeX, yTop, INDIGO, 5);
      P.dot(probeX, yBot, AMBER2, 5);

      _set(pfx+'BV', bVal.toFixed(2));
      _set(pfx+'XV', probeX.toFixed(1));
      _set(pfx+'Top', yTop.toFixed(3));
      _set(pfx+'Bot', yBot.toFixed(3));
      _set(pfx+'Height', hProbe.toFixed(3));
      _set(pfx+'Total', totA.toFixed(3));

      updateDataView();
    }

    register(canvas, draw);

    function syncState(){
      if(sB) bVal = parseFloat(sB.value);
      if(sX) xVal = parseFloat(sX.value);
      _set(pfx+'BV', bVal.toFixed(2));
      _set(pfx+'XV', Math.min(xVal, bVal).toFixed(1));
      updateDataView();
      redrawAll();
    }

    if(sB){ sB.addEventListener('input', syncState); sB.addEventListener('change', syncState); }
    if(sX){ sX.addEventListener('input', syncState); sX.addEventListener('change', syncState); }
    syncState();
  }

  // Initialize apab track explorers
  initContExplorer('apabCont');
  initEpsDeltaExplorer('apabEps');
  initInvExplorer('apabInv');
  initLinExplorer('apabLin');
  initSlopeExplorer('apabSlope');
  initAreaExplorer('apabArea');
})(window.CSExplorerKit);
