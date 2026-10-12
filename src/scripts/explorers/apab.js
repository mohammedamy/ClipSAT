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
      document.getElementById('apDerivFx').textContent=f(xv).toFixed(2);
      document.getElementById('apDerivSlope').textContent=m.toFixed(2);
      updateDataView();
    }
    register(canvas,draw);
    s.addEventListener('input',function(){ xv=parseFloat(s.value); document.getElementById('apDerivXV').textContent=xv.toFixed(1); redrawAll(); });
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
      document.getElementById('apMvtSlope').textContent=m.toFixed(2);
      document.getElementById('apMvtC').textContent=c.toFixed(2);
      updateDataView(a,m,c);
    }
    register(canvas,draw);
    s.addEventListener('input',function(){ bb=parseFloat(s.value); document.getElementById('apMvtBV').textContent=bb; redrawAll(); });
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
      document.getElementById('apRiemApprox').textContent=approx.toFixed(3);
      document.getElementById('apRiemExact').textContent=exact.toFixed(3);
      updateDataView(approx);
    }
    register(canvas,draw);
    sn.addEventListener('input',function(){ n=parseInt(sn.value,10); document.getElementById('apRiemNV').textContent=n; redrawAll(); });
    st.addEventListener('change',function(){ type=st.value; redrawAll(); });
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

      if(elXV) elXV.textContent = fmt(xVal, 2);
      if(elXOut) elXOut.textContent = fmt(xVal, 3);
      if(elFxOut) elFxOut.textContent = cur.y === null ? 'undefined' : fmt(cur.y, 3);
      if(elLeftLim) elLeftLim.textContent = cur.leftLim;
      if(elRightLim) elRightLim.textContent = cur.rightLim;
      if(elStatus) elStatus.textContent = cur.status;

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

      if(elEpsV) elEpsV.textContent = fmt(epsVal, 2);
      if(elDeltaV) elDeltaV.textContent = fmt(deltaVal, 2);
      if(elMaxDelta) elMaxDelta.textContent = fmt(maxDelta, 3);
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

  // Initialize apab track explorers
  initContExplorer('apabCont');
  initEpsDeltaExplorer('apabEps');
})(window.CSExplorerKit);

