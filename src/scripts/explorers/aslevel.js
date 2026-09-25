/* Canvas explorers for the aslevel track (Plan 5 Phase 5.015, ADR 0039).
   Moved verbatim out of modules/02-core-app.js. build.js minifies this file to
   public/js/ex/aslevel.js, which base.njk loads only on the aslevel page, right after
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

  /* ===================== AS · LINE SLOPE & INTERCEPTS ===================== */
  (function(){
    var canvas=document.getElementById('asLineCanvas'); if(!canvas) return;
    var m=1,b=0, sm=document.getElementById('asM'), sb=document.getElementById('asB');
    var view={xmin:-6,xmax:6,ymin:-7,ymax:7};
    var dataBtn=document.getElementById('asLineDataBtn'), dataPanel=document.getElementById('asLineDataPanel'),
        dataDesc=document.getElementById('asLineDataDesc'), dataRows=document.getElementById('asLineDataRows');
    wireDataToggle(dataBtn,dataPanel);
    function updateDataView(f){
      if(!dataDesc) return;
      dataDesc.textContent='Line y = '+m+'x '+(b>=0?'+ '+b:'− '+(-b))+'. Gradient = '+m+'. y-intercept (0, '+b+').';
      var N=9, rows=[];
      for(var i=0;i<N;i++){ var x=view.xmin+(view.xmax-view.xmin)*i/(N-1); rows.push([fmt(x),fmt(f(x))]); }
      renderDataRows(dataRows,rows);
    }
    function draw(ctx,w,ht){ var P=new Plot(ctx,w,ht,view,{l:24,r:12,t:12,b:20}); P.clear(); P.grid();
      var f=function(x){return m*x+b;};
      P.curve(f, INDIGO, 2.6);
      P.dot(0,b,AMBER2,5); if(Math.abs(m)>1e-9) P.dot(-b/m,0,AMBER2,5);
      document.getElementById('asLineSlope').textContent=m;
      document.getElementById('asLineYint').textContent='(0, '+b+')';
      document.getElementById('asLineXint').textContent=(Math.abs(m)<1e-9?'none':'('+(-b/m).toFixed(2)+', 0)');
      updateDataView(f);
    }
    function upd(){ m=parseFloat(sm.value); b=parseFloat(sb.value); document.getElementById('asMV').textContent=m; document.getElementById('asBV').textContent=b; redrawAll(); }
    register(canvas,draw); sm.addEventListener('input',upd); sb.addEventListener('input',upd);
  })();

  /* ===================== AS · GRAPH TRANSLATION (SINE) ===================== */
  (function(){
    var canvas=document.getElementById('asTransCanvas'); if(!canvas) return;
    var h=0,k=0, sh=document.getElementById('asTransH'), sk=document.getElementById('asTransK');
    var view={xmin:0,xmax:360,ymin:-2.5,ymax:2.5};
    var dataBtn=document.getElementById('asTransDataBtn'), dataPanel=document.getElementById('asTransDataPanel'),
        dataDesc=document.getElementById('asTransDataDesc'), dataRows=document.getElementById('asTransDataRows');
    wireDataToggle(dataBtn,dataPanel);
    function updateDataView(base,g){
      if(!dataDesc) return;
      dataDesc.textContent='y = sin(x \u2212 '+h+'\u00B0) + '+k+'. Shift ('+h+'\u00B0, '+k+') from the parent sin(x).';
      var rows=[];
      for(var t=0;t<=360;t+=45){ rows.push([t+'\u00B0',fmt(base(t),3),fmt(g(t),3)]); }
      renderDataRows(dataRows,rows);
    }
    function draw(ctx,w,ht){ var P=new Plot(ctx,w,ht,view,{l:30,r:12,t:12,b:22}); P.clear(); P.grid();
      var base=function(x){return Math.sin(x*Math.PI/180);};
      P.curve(base, '#C2CCDA', 1.6);
      var g=function(x){return Math.sin((x-h)*Math.PI/180)+k;};
      P.curve(g, INDIGO, 2.6);
      document.getElementById('asTransShift').textContent='('+h+'\u00B0, '+k+')';
      updateDataView(base,g);
    }
    function upd(){ h=parseFloat(sh.value); k=parseFloat(sk.value); document.getElementById('asTransHV').textContent=h+'\u00B0'; document.getElementById('asTransKV').textContent=k; redrawAll(); }
    register(canvas,draw); sh.addEventListener('input',upd); sk.addEventListener('input',upd);
  })();

  /* ===================== AS · SECANT → TANGENT ===================== */
  (function(){
    var canvas=document.getElementById('asDerivCanvas'); if(!canvas) return;
    var hh=2, s=document.getElementById('asDerivH'), f=function(x){return x*x;};
    var view={xmin:-1,xmax:5,ymin:-1,ymax:12};
    var dataBtn=document.getElementById('asDerivDataBtn'), dataPanel=document.getElementById('asDerivDataPanel'),
        dataDesc=document.getElementById('asDerivDataDesc'), dataRows=document.getElementById('asDerivDataRows');
    wireDataToggle(dataBtn,dataPanel);
    function updateDataView(x0,x1,slope){
      if(!dataDesc) return;
      dataDesc.textContent='f(x) = x². Secant through x = '+x0+' and x = '+fmt(x1,2)+' (h = '+fmt(hh,2)+') has slope '+fmt(slope,3)+'. As h → 0, this approaches the tangent slope f′(1) = 2.';
      var N=9, rows=[];
      for(var i=0;i<N;i++){ var x=view.xmin+(view.xmax-view.xmin)*i/(N-1); rows.push([fmt(x),fmt(f(x))]); }
      renderDataRows(dataRows,rows);
    }
    function draw(ctx,w,ht){ var P=new Plot(ctx,w,ht,view,{l:26,r:12,t:12,b:20}); P.clear(); P.grid();
      P.curve(f, INDIGO, 2.4);
      var x0=1, x1=1+hh, y0=f(x0), y1=f(x1), slope=(y1-y0)/hh;
      P.curve(function(x){return y0+slope*(x-x0);}, AMBER2, 2);
      P.dot(x0,y0,INDIGO,5); P.dot(x1,y1,AMBER2,5);
      document.getElementById('asDerivSlope').textContent=slope.toFixed(3);
      updateDataView(x0,x1,slope);
    }
    register(canvas,draw);
    s.addEventListener('input',function(){ hh=parseFloat(s.value); document.getElementById('asDerivHV').textContent=hh.toFixed(1); redrawAll(); });
  })();
})(window.CSExplorerKit);
