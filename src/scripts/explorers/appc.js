/* Canvas explorers for the appc track (Plan 5 Phase 5.015, ADR 0039).
   Moved verbatim out of modules/02-core-app.js. build.js minifies this file to
   public/js/ex/appc.js, which base.njk loads only on the appc page, right after
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




  /* ══════════════════════════════════════════════════════════════════
     AP PRECALCULUS — Pillar 2 MVP retrofit continued (track 5 of 8).
     Same shared Plot/register/redrawAll/fmt helpers.
     ══════════════════════════════════════════════════════════════════ */

  /* APPC UNIT 1 — average rate of change & concavity, f(x)=x^3/3-x */
  (function(){
    var canvas=document.getElementById('appcArocCanvas'); if(!canvas) return;
    var view={xmin:-3.2,xmax:3.2,ymin:-2.4,ymax:2.4};
    var a=-2, b=0;
    function f(x){ return x*x*x/3-x; }
    var dataBtn=document.getElementById('appcArocDataBtn'), dataPanel=document.getElementById('appcArocDataPanel'),
        dataDesc=document.getElementById('appcArocDataDesc'), dataRows=document.getElementById('appcArocDataRows');
    wireDataToggle(dataBtn,dataPanel);
    function updateDataView(aroc){
      if(!dataDesc) return;
      dataDesc.textContent='f(x) = x³/3 − x. Average rate of change on ['+fmt(Math.min(a,b),1)+', '+fmt(Math.max(a,b),1)+'] = (f(b) − f(a))/(b − a) = '+(isNaN(aroc)?'undefined (a = b)':fmt(aroc,3))+'.';
      var N=9, rows=[];
      for(var i=0;i<N;i++){ var x=view.xmin+(view.xmax-view.xmin)*i/(N-1); rows.push([fmt(x),fmt(f(x))]); }
      renderDataRows(dataRows,rows);
    }
    function draw(ctx,w,h){
      var P=new Plot(ctx,w,h,view,{l:28,r:12,t:12,b:24}); P.clear(); P.grid();
      P.curve(f,INDIGO,2.4);
      var fa=f(a), fb=f(b);
      P.segment(a,fa,b,fb,AMBER2,2.6);
      P.dot(a,fa,INK,4.5); P.dot(b,fb,INK,4.5);
      var aroc=(b-a)!==0 ? (fb-fa)/(b-a) : NaN;
      _set('appcArocVal', isNaN(aroc) ? '—' : fmt(aroc,3));
      _set('appcArocNote', (a+b)>0 ? 'up' : 'down');
      updateDataView(aroc);
    }
    register(canvas,draw);
    var sa=document.getElementById('appcArocA'), sb=document.getElementById('appcArocB');
    function upd(){
      a=parseInt(sa.value,10)/10; b=parseInt(sb.value,10)/10;
      _set('appcArocAlab', fmt(a,1));
      _set('appcArocBlab', fmt(b,1));
      var fa=f(a), fb=f(b);
      var aroc=(b-a)!==0 ? (fb-fa)/(b-a) : NaN;
      updateDataView(aroc);
      redrawAll();
    }
    sa.addEventListener('input',upd); sb.addEventListener('input',upd); upd();
  })();

  /* APPC UNIT 2 — exponential growth & decay, continuous form */
  (function(){
    var canvas=document.getElementById('appcGdCanvas'); if(!canvas) return;
    var view={xmin:0,xmax:18,ymin:0,ymax:8};
    var r=0.12;
    var dataBtn=document.getElementById('appcGdDataBtn'), dataPanel=document.getElementById('appcGdDataPanel'),
        dataDesc=document.getElementById('appcGdDataDesc'), dataRows=document.getElementById('appcGdDataRows');
    wireDataToggle(dataBtn,dataPanel);
    function updateDataView(){
      if(!dataDesc) return;
      var f=function(t){ return Math.exp(r*t); };
      var model = r>0.001?'growth': r<-0.001?'decay':'constant';
      var desc='P(t) = e^('+fmt(r,3)+'t), continuous rate r = '+(r>=0?'+':'')+fmt(r*100,1)+'% ('+model+'). P(10) = '+fmt(f(10),3)+'.';
      if(Math.abs(r)>=0.001){ desc += r>0 ? ' Doubling time = '+fmt(Math.LN2/r,2)+'.' : ' Half-life = '+fmt(Math.LN2/-r,2)+'.'; }
      dataDesc.textContent=desc;
      var N=9, rows=[];
      for(var i=0;i<N;i++){ var t=view.xmin+(view.xmax-view.xmin)*i/(N-1); rows.push([fmt(t),fmt(f(t))]); }
      renderDataRows(dataRows,rows);
    }
    function draw(ctx,w,h){
      var P=new Plot(ctx,w,h,view,{l:28,r:12,t:12,b:24}); P.clear(); P.grid();
      var f=function(t){ return Math.exp(r*t); };
      P.curve(f, INDIGO, 2.6);
      P.segment(view.xmin,1,view.xmax,1,'#AEB8C7',1,[3,3]);
      P.dot(0,1,INK,4.5);
      var model = r>0.001?'growth': r<-0.001?'decay':'constant';
      _set('appcGdP10', fmt(f(10),3));
      _set('appcGdVal', fmt(f(3),3));
      _set('appcGdModel', model);
      _set('appcGdType', model);
      var lab=document.getElementById('appcGdDblLab'), val=document.getElementById('appcGdDbl');
      if(lab&&val){
        if(Math.abs(r)<0.001){ lab.textContent='—'; val.textContent='—'; }
        else if(r>0){ lab.textContent='doubling time'; val.textContent=fmt(Math.LN2/r,2); }
        else { lab.textContent='half-life'; val.textContent=fmt(Math.LN2/-r,2); }
      }
      updateDataView();
    }
    register(canvas,draw);
    var s=document.getElementById('appcGdR');
    function upd(){ r=parseInt(s.value,10)/100; _set('appcGdRlab', (r>=0?'+':'')+fmt(r*100,1)+'%'); updateDataView(); redrawAll(); }
    s.addEventListener('input',upd); upd();
  })();

  /* APPC UNIT 3 — polar rose r = a cos(n theta) */
  (function(){
    var canvas=document.getElementById('appcPolarCanvas'); if(!canvas) return;
    var view={xmin:-4,xmax:4,ymin:-2.75,ymax:2.75};
    var n=3, A=3;
    var dataBtn=document.getElementById('appcPolarDataBtn'), dataPanel=document.getElementById('appcPolarDataPanel'),
        dataDesc=document.getElementById('appcPolarDataDesc'), dataRows=document.getElementById('appcPolarDataRows');
    wireDataToggle(dataBtn,dataPanel);
    function updateDataView(){
      if(!dataDesc) return;
      var petals = (n%2===1) ? n : 2*n;
      dataDesc.textContent='Polar rose r = '+A+' cos('+n+'θ), n = '+n+' ('+(n%2===1?'odd':'even')+'), giving '+petals+' petals. Sampled every 30° around one full turn:';
      var N=12, rows=[];
      for(var i=0;i<N;i++){ var th=i/N*2*Math.PI, r=A*Math.cos(n*th); rows.push([fmt(th),fmt(r),'('+fmt(r*Math.cos(th))+', '+fmt(r*Math.sin(th))+')']); }
      renderDataRows(dataRows,rows);
    }
    function draw(ctx,w,h){
      var P=new Plot(ctx,w,h,view,{l:20,r:10,t:10,b:20}); P.clear();
      var c=P.ctx, N=400, i, theta, r, x, y, px, py;
      c.beginPath();
      for(i=0;i<=N;i++){
        theta=2*Math.PI*i/N; r=A*Math.cos(n*theta);
        x=r*Math.cos(theta); y=r*Math.sin(theta);
        px=P.X(x); py=P.Y(y);
        if(i===0) c.moveTo(px,py); else c.lineTo(px,py);
      }
      c.lineWidth=2.4; c.strokeStyle=INDIGO; c.stroke();
      var petals = (n%2===1) ? n : 2*n;
      _set('appcPetals', petals);
      updateDataView();
    }
    register(canvas,draw);
    var s=document.getElementById('appcPolarN');
    function upd(){ n=parseInt(s.value,10); _set('appcPolarNlab', n); updateDataView(); redrawAll(); }
    s.addEventListener('input',upd); upd();
  })();

  /* APPC UNIT 4 (appc-u4) — inverse as a reflection in y = x, Function
     composition and inverses box. Default f(x)=(3x−1)/(x+2) = Worked
     Example 4.1, whose inverse is (2x+1)/(3−x). */
  (function(){
    var canvas=document.getElementById('appcInvCanvas'); if(!canvas) return;
    var FNS={
      rat:{f:function(x){ return (3*x-1)/(x+2); }, fi:function(x){ return (2*x+1)/(3-x); }, pole:-2, ipole:3, txt:'(2x + 1)/(3 − x)'},
      exp:{f:function(x){ return Math.pow(2,x); }, fi:function(x){ return x>0 ? Math.log(x)/Math.LN2 : NaN; }, txt:'log₂ x'},
      cub:{f:function(x){ return x*x*x/4+1; }, fi:function(x){ return Math.cbrt(4*(x-1)); }, txt:'∛(4(x − 1))'}
    };
    var key='rat', a=1;
    wireDataToggle(document.getElementById('appcInvDataBtn'),document.getElementById('appcInvDataPanel'));
    function updateDataView(){
      var F=FNS[key] || FNS.rat;
      var fa=F.f(a), ok=isFinite(fa);
      var desc=document.getElementById('appcInvDataDesc');
      if(desc) desc.textContent='f⁻¹(x) = '+F.txt+'. '+(ok ? 'The point ('+fmt(a,2)+', '+fmt(fa,3)+') on f reflects across y = x to ('+fmt(fa,3)+', '+fmt(a,2)+') on f⁻¹, and f⁻¹(f(a)) = '+fmt(F.fi(fa),3)+' = a.' : 'a = '+fmt(a,1)+' is not in the domain of f.');
      var rows=[]; [-3,-1,0,1,2,3].forEach(function(x){ var y=F.f(x); rows.push([String(x), isFinite(y)?fmt(y,3):'undefined', isFinite(y)?'('+fmt(y,3)+', '+x+')':'—']); });
      renderDataRows(document.getElementById('appcInvDataRows'),rows);
    }
    function draw(ctx,w,h){
      var F=FNS[key] || FNS.rat, pad={l:30,r:12,t:14,b:26};
      var view=_fitView(-6,6,-6,6,w,h,pad);
      var P=new Plot(ctx,w,h,view,pad); P.clear(); P.grid();
      var gap=(view.xmax-view.xmin)/320*1.2;
      function guard(fn,pole){ return function(x){ return (pole!=null && Math.abs(x-pole)<gap) ? NaN : fn(x); }; }
      _clip(P,function(){ P.segment(-20,-20,20,20,MUTED,1.3,[6,4]); });
      P.curve(guard(F.f,F.pole),INDIGO,2.6);
      P.curve(guard(F.fi,F.ipole),AMBER2,2.6);
      var fa=F.f(a), ok=isFinite(fa);
      if(ok){
        P.segment(a,fa,fa,a,LINE,1.4,[3,3]);
        P.dot(a,fa,INDIGO,5); P.dot(fa,a,AMBER2,5);
      }
      _set('appcInvFa', ok ? '('+fmt(a,2)+', '+fmt(fa,3)+')' : 'f('+fmt(a,1)+') undefined');
      _set('appcInvRef', ok ? '('+fmt(fa,3)+', '+fmt(a,2)+')' : '—');
      _set('appcInvChk', ok ? fmt(F.fi(fa),3) : '—');
      _set('appcInvFormula',F.txt);
      updateDataView();
    }
    register(canvas,draw);
    var sel=document.getElementById('appcInvF'), sa=document.getElementById('appcInvA');
    function upd(){ key=sel.value; a=parseFloat(sa.value); _set('appcInvAV',fmt(a,1)); updateDataView(); redrawAll(); }
    if(sel) sel.addEventListener('change',upd);
    if(sa) sa.addEventListener('input',upd);
    upd();
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

  // Initialize appc track explorers
  initContExplorer('appcCont');
})(window.CSExplorerKit);

