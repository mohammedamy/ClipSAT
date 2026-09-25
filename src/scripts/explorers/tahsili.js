/* Canvas explorers for the tahsili track (Plan 5 Phase 5.015, ADR 0039).
   Moved verbatim out of modules/02-core-app.js. build.js minifies this file to
   public/js/ex/tahsili.js, which base.njk loads only on the tahsili page, right after
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

  /* ===================== TAHSILI · TRIG WAVE ===================== */
  (function(){
    var canvas=document.getElementById('tahWaveCanvas'); if(!canvas) return;
    var A=2, B=1, sa=document.getElementById('tahAmp'), sb=document.getElementById('tahFreq');
    var view={xmin:-6.5,xmax:6.5,ymin:-3.4,ymax:3.4};
    var dataBtn=document.getElementById('tahWaveDataBtn'), dataPanel=document.getElementById('tahWaveDataPanel'),
        dataDesc=document.getElementById('tahWaveDataDesc'), dataRows=document.getElementById('tahWaveDataRows');
    wireDataToggle(dataBtn,dataPanel);
    function updateDataView(f,period){
      if(!dataDesc) return;
      dataDesc.textContent='Function y = '+A+' sin('+B+'x). Amplitude = '+A+'. Period = 2π/'+B+' = '+fmt(period,2)+'.';
      var N=9, rows=[];
      for(var i=0;i<N;i++){ var x=view.xmin+(view.xmax-view.xmin)*i/(N-1); rows.push([fmt(x),fmt(f(x))]); }
      renderDataRows(dataRows,rows);
    }
    function draw(ctx,w,h){
      var P=new Plot(ctx,w,h,view,{l:22,r:12,t:12,b:18}); P.clear(); P.grid();
      P.segment(view.xmin,A,view.xmax,A,AMBER2,1.2,[5,4]);
      P.segment(view.xmin,-A,view.xmax,-A,AMBER2,1.2,[5,4]);
      var f=function(x){return A*Math.sin(B*x);};
      P.curve(f, INDIGO, 2.6);
      document.getElementById('tahWAmp').textContent=A;
      var period=2*Math.PI/B;
      document.getElementById('tahWPeriod').textContent=period.toFixed(2);
      updateDataView(f,period);
    }
    function upd(){ A=parseInt(sa.value,10); B=parseInt(sb.value,10);
      document.getElementById('tahAmpV').textContent=A; document.getElementById('tahFreqV').textContent=B; redrawAll(); }
    register(canvas,draw); sa.addEventListener('input',upd); sb.addEventListener('input',upd);
  })();

  /* ===================== TAHSILI · FUNCTION TRANSFORMATION ===================== */
  (function(){
    var canvas=document.getElementById('tahTransCanvas'); if(!canvas) return;
    var hh=0, kk=0, sh=document.getElementById('tahH'), sk=document.getElementById('tahK');
    var view={xmin:-8,xmax:8,ymin:-5,ymax:7};
    var dataBtn=document.getElementById('tahTransDataBtn'), dataPanel=document.getElementById('tahTransDataPanel'),
        dataDesc=document.getElementById('tahTransDataDesc'), dataRows=document.getElementById('tahTransDataRows');
    wireDataToggle(dataBtn,dataPanel);
    function updateDataView(base,g){
      if(!dataDesc) return;
      dataDesc.textContent='g(x) = |x − '+hh+'| + '+kk+'. Vertex at ('+hh+', '+kk+').';
      var N=9, rows=[];
      for(var i=0;i<N;i++){ var x=view.xmin+(view.xmax-view.xmin)*i/(N-1); rows.push([fmt(x),fmt(base(x)),fmt(g(x))]); }
      renderDataRows(dataRows,rows);
    }
    function draw(ctx,w,h){
      var P=new Plot(ctx,w,h,view,{l:22,r:12,t:12,b:18}); P.clear(); P.grid();
      var base=function(x){return Math.abs(x-0)+0;};
      P.curve(base, '#C2CCDA', 1.6);
      var g=function(x){return Math.abs(x-hh)+kk;};
      P.curve(g, INDIGO, 2.6);
      P.dot(hh,kk,AMBER2,5);
      document.getElementById('tahVertex').textContent='('+hh+', '+kk+')';
      updateDataView(base,g);
    }
    function upd(){ hh=parseInt(sh.value,10); kk=parseInt(sk.value,10);
      document.getElementById('tahHV').textContent=hh; document.getElementById('tahKV').textContent=kk; redrawAll(); }
    register(canvas,draw); sh.addEventListener('input',upd); sk.addEventListener('input',upd);
  })();

  /* ===================== TAHSILI · SECANT → TANGENT ===================== */
  (function(){
    var canvas=document.getElementById('tahDerivCanvas'); if(!canvas) return;
    var dh=2, s=document.getElementById('tahDh');
    var view={xmin:-0.6,xmax:3.4,ymin:-1,ymax:9.6};
    var dataBtn=document.getElementById('tahDerivDataBtn'), dataPanel=document.getElementById('tahDerivDataPanel'),
        dataDesc=document.getElementById('tahDerivDataDesc'), dataRows=document.getElementById('tahDerivDataRows');
    wireDataToggle(dataBtn,dataPanel);
    function f(x){ return x*x; }
    function updateDataView(a,b,m){
      if(!dataDesc) return;
      dataDesc.textContent='f(x) = x². Secant through a = '+a+' and a+h = '+fmt(b,2)+' (h = '+fmt(dh,2)+') has slope '+fmt(m,2)+'. As h → 0, this slope approaches the tangent slope f′(1) = 2.';
      var N=9, rows=[];
      for(var i=0;i<N;i++){ var x=view.xmin+(view.xmax-view.xmin)*i/(N-1); rows.push([fmt(x),fmt(f(x))]); }
      renderDataRows(dataRows,rows);
    }
    function draw(ctx,w,h){
      var P=new Plot(ctx,w,h,view,{l:24,r:12,t:12,b:18}); P.clear(); P.grid();
      P.curve(f, INDIGO, 2.6);
      // tangent at x=1 (slope 2) for reference
      P.segment(view.xmin, 1+2*(view.xmin-1), view.xmax, 1+2*(view.xmax-1), '#C2CCDA', 1.4, [5,4]);
      var a=1, b=a+dh, m=(f(b)-f(a))/dh;
      // secant line through (a,f(a)) and (b,f(b))
      P.segment(view.xmin, f(a)+m*(view.xmin-a), view.xmax, f(a)+m*(view.xmax-a), INK, 2);
      P.dot(a,f(a),AMBER2,5); P.dot(b,f(b),AMBER2,5);
      document.getElementById('tahSecSlope').textContent=m.toFixed(2);
      updateDataView(a,b,m);
    }
    register(canvas,draw);
    s.addEventListener('input',function(){ dh=parseFloat(s.value); document.getElementById('tahDhV').textContent=dh.toFixed(2); redrawAll(); });
  })();
})(window.CSExplorerKit);
