/* Canvas explorers for the a2level track (Plan 5 Phase 5.015, ADR 0039).
   Moved verbatim out of modules/02-core-app.js. build.js minifies this file to
   public/js/ex/a2level.js, which base.njk loads only on the a2level page, right after
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

  /* ===================== A2 · TANGENT GRADIENT ===================== */
  (function(){
    var canvas=document.getElementById('a2DerivCanvas'); if(!canvas) return;
    var x0=1, s=document.getElementById('a2DerivX');
    var f=function(x){return x*x*x-3*x;}, df=function(x){return 3*x*x-3;};
    var view={xmin:-2.6,xmax:2.6,ymin:-4,ymax:4};
    var dataBtn=document.getElementById('a2DerivDataBtn'), dataPanel=document.getElementById('a2DerivDataPanel'),
        dataDesc=document.getElementById('a2DerivDataDesc'), dataRows=document.getElementById('a2DerivDataRows');
    wireDataToggle(dataBtn,dataPanel);
    function updateDataView(y0,m,tangent){
      if(!dataDesc) return;
      dataDesc.textContent='f(x) = x³ − 3x. At x₀ = '+fmt(x0,1)+', f(x₀) = '+fmt(y0,2)+', tangent slope f′(x₀) = '+fmt(m,2)+'.';
      var N=9, rows=[];
      for(var i=0;i<N;i++){ var x=view.xmin+(view.xmax-view.xmin)*i/(N-1); rows.push([fmt(x),fmt(f(x)),fmt(tangent(x))]); }
      renderDataRows(dataRows,rows);
    }
    function draw(ctx,w,ht){ var P=new Plot(ctx,w,ht,view,{l:26,r:12,t:12,b:20}); P.clear(); P.grid();
      P.curve(f, INDIGO, 2.4);
      var y0=f(x0), m=df(x0);
      var tangent=function(x){return y0+m*(x-x0);};
      P.curve(tangent, AMBER2, 2); P.dot(x0,y0,AMBER2,5.5);
      document.getElementById('a2DerivSlope').textContent=m.toFixed(2);
      updateDataView(y0,m,tangent);
    }
    register(canvas,draw);
    s.addEventListener('input',function(){ x0=parseFloat(s.value); document.getElementById('a2DerivXV').textContent=x0.toFixed(1); redrawAll(); });
  })();

  /* ===================== A2 · VECTOR ADDITION ===================== */
  (function(){
    var canvas=document.getElementById('a2VecCanvas'); if(!canvas) return;
    var ax=3, ay=1, bx=1, by=3, sX=document.getElementById('a2VecX'), sY=document.getElementById('a2VecY');
    var view={xmin:-6,xmax:6,ymin:-6,ymax:6};
    var dataBtn=document.getElementById('a2VecDataBtn'), dataPanel=document.getElementById('a2VecDataPanel'),
        dataDesc=document.getElementById('a2VecDataDesc'), dataRows=document.getElementById('a2VecDataRows');
    wireDataToggle(dataBtn,dataPanel);
    function updateDataView(mag){
      if(!dataDesc) return;
      dataDesc.textContent='Vector a = ('+ax+', '+ay+'), vector b = ('+bx+', '+by+'). Resultant a + b = ('+(ax+bx)+', '+(ay+by)+'), magnitude '+fmt(mag,2)+'.';
      renderDataRows(dataRows,[
        ['a','('+ax+', '+ay+')',fmt(Math.sqrt(ax*ax+ay*ay),2)],
        ['b','('+bx+', '+by+')',fmt(Math.sqrt(bx*bx+by*by),2)],
        ['a + b','('+(ax+bx)+', '+(ay+by)+')',fmt(mag,2)]
      ]);
    }
    function draw(ctx,w,ht){ var P=new Plot(ctx,w,ht,view,{l:24,r:12,t:12,b:20}); P.clear(); P.grid();
      P.segment(0,0,ax,ay,INDIGO,2.6); P.dot(ax,ay,INDIGO,4.5);
      P.segment(0,0,bx,by,AMBER2,2.6); P.dot(bx,by,AMBER2,4.5);
      P.segment(0,0,ax+bx,ay+by,'#2B5BA8',2,[4,4]); P.dot(ax+bx,ay+by,'#2B5BA8',5);
      var mag=Math.sqrt((ax+bx)*(ax+bx)+(ay+by)*(ay+by));
      document.getElementById('a2VecRes').textContent='('+(ax+bx)+', '+(ay+by)+')';
      document.getElementById('a2VecMag').textContent=mag.toFixed(2);
      updateDataView(mag);
    }
    function upd(){ bx=parseFloat(sX.value); by=parseFloat(sY.value); document.getElementById('a2VecXV').textContent=bx; document.getElementById('a2VecYV').textContent=by; redrawAll(); }
    register(canvas,draw); sX.addEventListener('input',upd); sY.addEventListener('input',upd);
  })();
})(window.CSExplorerKit);
