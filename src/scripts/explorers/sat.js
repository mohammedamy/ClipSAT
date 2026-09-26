/* Canvas explorers for the sat track (Plan 5 Phase 5.015, ADR 0039).
   Moved verbatim out of modules/02-core-app.js. build.js minifies this file to
   public/js/ex/sat.js, which base.njk loads only on the sat page, right after
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

  /* ===================== SAT · LINEAR FUNCTION ===================== */
  (function(){
    var canvas=document.getElementById('satLineCanvas'); if(!canvas) return;
    var m=1, b=1, sm=document.getElementById('satM'), sb=document.getElementById('satB');
    var view={xmin:-6,xmax:6,ymin:-7,ymax:7};
    var dataBtn=document.getElementById('satLineDataBtn'), dataPanel=document.getElementById('satLineDataPanel'),
        dataDesc=document.getElementById('satLineDataDesc'), dataRows=document.getElementById('satLineDataRows');
    wireDataToggle(dataBtn,dataPanel);
    function updateDataView(f){
      if(!dataDesc) return;
      dataDesc.textContent='Line y = '+m+'x '+(b>=0?'+ '+b:'− '+(-b))+'. Slope = '+m+'. y-intercept (0, '+b+').';
      var N=9, rows=[];
      for(var i=0;i<N;i++){ var x=view.xmin+(view.xmax-view.xmin)*i/(N-1); rows.push([fmt(x),fmt(f(x))]); }
      renderDataRows(dataRows,rows);
    }
    function draw(ctx,w,h){
      var P=new Plot(ctx,w,h,view,{l:24,r:12,t:12,b:20}); P.clear(); P.grid();
      var f=function(x){return m*x+b;};
      P.curve(f, INDIGO, 2.6);
      P.dot(0,b,AMBER2,5);
      if(Math.abs(m)>1e-9) P.dot(-b/m,0,AMBER2,5);
      document.getElementById('satLineSlope').textContent=m;
      document.getElementById('satLineYint').textContent='(0, '+b+')';
      document.getElementById('satLineXint').textContent=(Math.abs(m)<1e-9?'none':'('+(-b/m).toFixed(2)+', 0)');
      updateDataView(f);
    }
    function upd(){ m=parseFloat(sm.value); b=parseFloat(sb.value);
      document.getElementById('satMV').textContent=m; document.getElementById('satBV').textContent=b; redrawAll(); }
    register(canvas,draw); sm.addEventListener('input',upd); sb.addEventListener('input',upd);
  })();

  /* ===================== SAT · LINE OF BEST FIT ===================== */
  (function(){
    var canvas=document.getElementById('satFitCanvas'); if(!canvas) return;
    var pts=[[1,2],[2,3],[3,5],[4,4],[5,6],[6,8],[7,7],[8,9]];
    var mx=4.5, my=5.5; // centroid
    var s=0.5, sl=document.getElementById('satFitSlope');
    var view={xmin:0,xmax:9,ymin:0,ymax:10};
    var dataBtn=document.getElementById('satFitDataBtn'), dataPanel=document.getElementById('satFitDataPanel'),
        dataDesc=document.getElementById('satFitDataDesc'), dataRows=document.getElementById('satFitDataRows');
    wireDataToggle(dataBtn,dataPanel);
    function updateDataView(ssr){
      if(!dataDesc) return;
      dataDesc.textContent='Trend line through the centroid ('+mx+', '+my+') with slope '+fmt(s,2)+': y = '+fmt(my,2)+' + '+fmt(s,2)+'(x − '+mx+'). Sum of squared residuals (SSR) = '+fmt(ssr,1)+' — drag the slope to try to minimize it.';
      var rows=[];
      for(var i=0;i<pts.length;i++){ var yp=my+s*(pts[i][0]-mx), res=pts[i][1]-yp; rows.push([pts[i][0],pts[i][1],fmt(yp,2),fmt(res,2),fmt(res*res,2)]); }
      renderDataRows(dataRows,rows);
    }
    function draw(ctx,w,h){
      var P=new Plot(ctx,w,h,view,{l:24,r:12,t:12,b:20}); P.clear(); P.grid();
      // line through centroid with slope s
      P.curve(function(x){return my+s*(x-mx);}, INDIGO, 2.4);
      var ssr=0;
      for(var i=0;i<pts.length;i++){ var yp=my+s*(pts[i][0]-mx); ssr+=(pts[i][1]-yp)*(pts[i][1]-yp);
        P.segment(pts[i][0],pts[i][1],pts[i][0],yp,'rgba(184,128,31,.45)',1.2);
        P.dot(pts[i][0],pts[i][1],AMBER2,4.5);
      }
      document.getElementById('satFitSSR').textContent=ssr.toFixed(1);
      updateDataView(ssr);
    }
    register(canvas,draw);
    sl.addEventListener('input',function(){ s=parseFloat(sl.value); document.getElementById('satFitSlopeV').textContent=s.toFixed(2); redrawAll(); });
  })();

  /* ===================== SAT · EXPONENTIAL MODEL ===================== */
  (function(){
    var canvas=document.getElementById('satExpCanvas'); if(!canvas) return;
    var bb=1.5, s=document.getElementById('satBase'), A=2;
    var view={xmin:-3,xmax:3,ymin:-1,ymax:12};
    var dataBtn=document.getElementById('satExpDataBtn'), dataPanel=document.getElementById('satExpDataPanel'),
        dataDesc=document.getElementById('satExpDataDesc'), dataRows=document.getElementById('satExpDataRows');
    wireDataToggle(dataBtn,dataPanel);
    function updateDataView(f){
      if(!dataDesc) return;
      var type=(bb>1.0001?'growth':(bb<0.9999?'decay':'constant'));
      dataDesc.textContent='Function y = '+A+'·'+fmt(bb,1)+'ˣ ('+type+'). y-intercept (0, '+A+').';
      var N=9, rows=[];
      for(var i=0;i<N;i++){ var x=view.xmin+(view.xmax-view.xmin)*i/(N-1); rows.push([fmt(x),fmt(f(x))]); }
      renderDataRows(dataRows,rows);
    }
    function draw(ctx,w,h){
      var P=new Plot(ctx,w,h,view,{l:24,r:12,t:12,b:20}); P.clear(); P.grid();
      var f=function(x){return A*Math.pow(bb,x);};
      P.curve(f, INDIGO, 2.6);
      P.dot(0,A,AMBER2,5);
      document.getElementById('satExpType').textContent=(bb>1.0001?'growth':(bb<0.9999?'decay':'constant'));
      document.getElementById('satExpY1').textContent=(A*bb).toFixed(2);
      updateDataView(f);
    }
    register(canvas,draw);
    s.addEventListener('input',function(){ bb=parseFloat(s.value); document.getElementById('satBaseV').textContent=bb.toFixed(1); redrawAll(); });
  })();

  /* SAT CH 3 — line–parabola system: 0, 1, or 2 intersections */
  (function(){
    var canvas=document.getElementById('satQuadLineCanvas'); if(!canvas) return;
    var m=1, k=2;
    function parab(x){ return x*x; }
    function line(x){ return m*x+k; }
    var view={xmin:-4,xmax:4,ymin:-2,ymax:16};
    var dataBtn=document.getElementById('satQuadLineDataBtn'), dataPanel=document.getElementById('satQuadLineDataPanel'),
        dataDesc=document.getElementById('satQuadLineDataDesc'), dataRows=document.getElementById('satQuadLineDataRows');
    wireDataToggle(dataBtn,dataPanel);
    function updateDataView(D,pts){
      if(!dataDesc) return;
      var desc='y = x² and y = '+fmt(m,1)+'x + '+fmt(k,1)+'. Substituting: x² − '+fmt(m,1)+'x − '+fmt(k,1)+' = 0, discriminant D = '+fmt(D,2)+'. ';
      desc += pts.length===0?'No real intersections.':pts.length===1?'One intersection (tangent).':'Two intersections.';
      dataDesc.textContent=desc;
      var rows=pts.map(function(p){ return [fmt(p[0],3), fmt(p[1],3)]; });
      if(!rows.length) rows=[['—','no real solutions']];
      renderDataRows(dataRows,rows);
    }
    function draw(ctx,w,h){
      var P=new Plot(ctx,w,h,view,{l:30,r:12,t:14,b:26}); P.clear(); P.grid();
      P.curve(parab,INDIGO,2.6);
      P.curve(line,AMBER2,2.4);
      var D=m*m+4*k, pts=[];
      if(D>=0){
        var sq=Math.sqrt(D), x1=(m+sq)/2, x2=(m-sq)/2;
        pts.push([x1,parab(x1)]);
        if(Math.abs(x1-x2)>1e-6) pts.push([x2,parab(x2)]);
      }
      pts.forEach(function(p){ P.dot(p[0],p[1],INK,5.5); });
      document.getElementById('satQuadLineD').textContent=fmt(D,2);
      document.getElementById('satQuadLineN').textContent = D>1e-9?'2':(D>-1e-9?'1':'0');
      updateDataView(D,pts);
    }
    register(canvas,draw);
    var sm=document.getElementById('satQuadLineM'), sk=document.getElementById('satQuadLineK');
    function upd(){
      m=parseFloat(sm.value); k=parseFloat(sk.value);
      document.getElementById('satQuadLineMval').textContent=fmt(m,1);
      document.getElementById('satQuadLineKval').textContent=fmt(k,1);
      redrawAll();
    }
    sm.addEventListener('input',upd); sk.addEventListener('input',upd); upd();
  })();

  /* SAT CH 8 — piecewise function evaluator (exact Worked example 8.B) */
  (function(){
    var canvas=document.getElementById('satPieceCanvas'); if(!canvas) return;
    var xv=-1;
    function f(x){ return x<2 ? x*x : 3*x-1; }
    var view={xmin:-4,xmax:6,ymin:-4,ymax:18};
    var dataBtn=document.getElementById('satPieceDataBtn'), dataPanel=document.getElementById('satPieceDataPanel'),
        dataDesc=document.getElementById('satPieceDataDesc'), dataRows=document.getElementById('satPieceDataRows');
    wireDataToggle(dataBtn,dataPanel);
    function updateDataView(){
      if(!dataDesc) return;
      var piece = xv<2 ? 'x² (since x < 2)' : '3x − 1 (since x ≥ 2)';
      dataDesc.textContent='f(x) = x² if x<2, 3x−1 if x≥2. At x = '+fmt(xv,2)+', the active piece is '+piece+', so f('+fmt(xv,2)+') = '+fmt(f(xv),3)+'.';
      var N=9, rows=[];
      for(var i=0;i<N;i++){ var x=view.xmin+(view.xmax-view.xmin)*i/(N-1); rows.push([fmt(x),fmt(f(x)), x<2?'x²':'3x−1']); }
      renderDataRows(dataRows,rows);
    }
    function draw(ctx,w,h){
      var P=new Plot(ctx,w,h,view,{l:30,r:12,t:14,b:26}); P.clear(); P.grid();
      var c=P.ctx;
      c.save(); c.beginPath(); c.rect(P.pad.l,P.pad.t,P.X(2)-P.pad.l,P.h-P.pad.t-P.pad.b); c.clip();
      P.curve(function(x){return x*x;},INDIGO,2.6); c.restore();
      c.save(); c.beginPath(); c.rect(P.X(2),P.pad.t,P.w-P.pad.r-P.X(2),P.h-P.pad.t-P.pad.b); c.clip();
      P.curve(function(x){return 3*x-1;},AMBER2,2.6); c.restore();
      if(xv<2) P.ring(2,4,INDIGO,4.5); else P.dot(2,5,AMBER2,4.5); // boundary markers show the pieces don't meet (discontinuity)
      P.dot(xv,f(xv),INK,5.5);
      document.getElementById('satPieceF').textContent=fmt(f(xv),3);
      document.getElementById('satPiecePiece').textContent = xv<2?'x²':'3x − 1';
      updateDataView();
    }
    register(canvas,draw);
    var s=document.getElementById('satPieceX');
    function upd(){ xv=parseFloat(s.value); document.getElementById('satPieceXval').textContent=fmt(xv,2); redrawAll(); }
    s.addEventListener('input',upd); upd();
  })();

  /* SAT CH 9 — mean vs median under a moving outlier (exact Worked example 9.A) */
  (function(){
    var canvas=document.getElementById('satOutlierCanvas'); if(!canvas) return;
    var FIXED=[30,32,35,36,37,38,40];
    var outlier=120;
    var view={xmin:25,xmax:130,ymin:0,ymax:1};
    var dataBtn=document.getElementById('satOutlierDataBtn'), dataPanel=document.getElementById('satOutlierDataPanel'),
        dataDesc=document.getElementById('satOutlierDataDesc'), dataRows=document.getElementById('satOutlierDataRows');
    wireDataToggle(dataBtn,dataPanel);
    function stats(){
      var all=FIXED.concat([outlier]).slice().sort(function(a,b){return a-b;});
      var mean=all.reduce(function(a,b){return a+b;},0)/all.length;
      var mid=all.length/2, median=(all[mid-1]+all[mid])/2;
      return {mean:mean, median:median, all:all};
    }
    function updateDataView(st){
      if(!dataDesc) return;
      dataDesc.textContent='Salaries (thousands): 30, 32, 35, 36, 37, 38, 40, and an eighth value = '+fmt(outlier,0)+'. Mean = '+fmt(st.mean,2)+', median = '+fmt(st.median,2)+'. '+(outlier>50?'The high value pulls the mean above the median — the median better represents a typical salary.':'With the eighth value this close to the rest, mean and median stay close together.');
      renderDataRows(dataRows,[
        ['data (sorted)', st.all.join(', ')],
        ['mean', fmt(st.mean,2)],
        ['median', fmt(st.median,2)]
      ]);
    }
    function draw(ctx,w,h){
      var P=new Plot(ctx,w,h,view,{l:20,r:12,t:12,b:26}); P.clear();
      var c=P.ctx, y=0.35;
      c.strokeStyle=AXIS; c.lineWidth=1; c.beginPath(); c.moveTo(P.X(view.xmin),P.Y(0.15)); c.lineTo(P.X(view.xmax),P.Y(0.15)); c.stroke();
      var xt=view.xmin; for(;xt<=view.xmax;xt+=25){ c.fillStyle=MUTED; c.font=FONT; c.textAlign='center'; c.fillText(String(xt),P.X(xt),P.Y(0.15)+16); }
      FIXED.forEach(function(v){ P.dot(v,y,'rgba(86,97,115,.55)',4.5); });
      P.dot(outlier,y,AMBER2,6);
      var st=stats();
      P.vline(st.mean,INDIGO,[4,3]);
      P.vline(st.median,'rgba(200,144,42,.9)',[2,2]);
      document.getElementById('satOutlierMean').textContent=fmt(st.mean,2);
      document.getElementById('satOutlierMedian').textContent=fmt(st.median,2);
      updateDataView(st);
    }
    register(canvas,draw);
    var s=document.getElementById('satOutlierV');
    function upd(){ outlier=parseFloat(s.value); document.getElementById('satOutlierVval').textContent=fmt(outlier,0); redrawAll(); }
    s.addEventListener('input',upd); upd();
  })();
})(window.CSExplorerKit);
