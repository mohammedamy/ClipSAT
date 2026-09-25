/* Canvas explorers for the igcse track (Plan 5 Phase 5.015, ADR 0039).
   Moved verbatim out of modules/02-core-app.js. build.js minifies this file to
   public/js/ex/igcse.js, which base.njk loads only on the igcse page, right after
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

  /* ===================== IGCSE · CIRCLE THEOREMS ===================== */
  (function(){
    var canvas=document.getElementById('circleCanvas'); if(!canvas) return;
    var R=3, Adeg=200, Bdeg=340, frac=0.5;
    var view={xmin:-4,xmax:4,ymin:-4,ymax:4};
    var s=document.getElementById('circleP');
    var dataBtn=document.getElementById('circleDataBtn'), dataPanel=document.getElementById('circleDataPanel'),
        dataDesc=document.getElementById('circleDataDesc'), dataRows=document.getElementById('circleDataRows');
    wireDataToggle(dataBtn,dataPanel);
    function rad(d){ return d*Math.PI/180; }
    function pt(deg){ return {x:R*Math.cos(rad(deg)), y:R*Math.sin(rad(deg))}; }
    function angleAt(vx,vy,p1,p2){
      var a1x=p1.x-vx,a1y=p1.y-vy,a2x=p2.x-vx,a2y=p2.y-vy;
      var c=(a1x*a2x+a1y*a2y)/(Math.hypot(a1x,a1y)*Math.hypot(a2x,a2y));
      c=Math.max(-1,Math.min(1,c));
      return Math.acos(c)*180/Math.PI;
    }
    function updateDataView(O,A,B,Pp,central,inscribed){
      if(!dataDesc) return;
      dataDesc.textContent='Circle of radius '+fmt(R,1)+' centred at O. Chord AB is fixed; P moves around the circle. Central angle AOB = '+fmt(central,0)+'°. Inscribed angle APB = '+fmt(inscribed,0)+'°. (Circle theorem: the inscribed angle is half the central angle — here half of '+fmt(central,0)+'° is '+fmt(central/2,0)+'°.)';
      renderDataRows(dataRows,[
        ['O',fmt(O.x),fmt(O.y)],
        ['A',fmt(A.x),fmt(A.y)],
        ['B',fmt(B.x),fmt(B.y)],
        ['P',fmt(Pp.x),fmt(Pp.y)]
      ]);
    }
    function draw(ctx,w,h){
      var P=new Plot(ctx,w,h,view,{l:22,r:12,t:12,b:20}); P.clear(); P.grid();
      ctx.save(); ctx.beginPath();
      for(var i=0;i<=120;i++){ var a=rad(i*3), X=P.X(R*Math.cos(a)), Y=P.Y(R*Math.sin(a)); if(i===0) ctx.moveTo(X,Y); else ctx.lineTo(X,Y); }
      ctx.strokeStyle='#C2CCDA'; ctx.lineWidth=2; ctx.stroke(); ctx.restore();
      var A=pt(Adeg), B=pt(Bdeg), Pp=pt(Bdeg+(0.05+0.90*frac)*220);
      P.segment(0,0,A.x,A.y,'#9FB0C7',1.6); P.segment(0,0,B.x,B.y,'#9FB0C7',1.6);
      P.segment(Pp.x,Pp.y,A.x,A.y,INDIGO,2.2); P.segment(Pp.x,Pp.y,B.x,B.y,INDIGO,2.2);
      P.dot(A.x,A.y,AMBER2,5); P.dot(B.x,B.y,AMBER2,5); P.dot(Pp.x,Pp.y,INDIGO,5.5); P.dot(0,0,'#9FB0C7',3.5);
      ctx.fillStyle=MUTED; ctx.font='12px ui-sans-serif, system-ui, sans-serif';
      ctx.fillText('A',P.X(A.x)-12,P.Y(A.y)+4); ctx.fillText('B',P.X(B.x)+6,P.Y(B.y)+4);
      ctx.fillText('P',P.X(Pp.x)+6,P.Y(Pp.y)-6); ctx.fillText('O',P.X(0)+6,P.Y(0)-6);
      var central=angleAt(0,0,A,B), inscribed=angleAt(Pp.x,Pp.y,A,B);
      document.getElementById('circleCentral').textContent=central.toFixed(0)+'°';
      document.getElementById('circleInscribed').textContent=inscribed.toFixed(0)+'°';
      updateDataView({x:0,y:0},A,B,Pp,central,inscribed);
    }
    register(canvas,draw);
    s.addEventListener('input',function(){ frac=parseInt(s.value,10)/100; redrawAll(); });
  })();

  /* ===================== IGCSE · RIGHT-TRIANGLE TRIG ===================== */
  (function(){
    var canvas=document.getElementById('trigCanvas'); if(!canvas) return;
    var H=4, deg=35, view={xmin:-0.6,xmax:4.6,ymin:-0.6,ymax:4.6};
    var s=document.getElementById('trigAngle');
    var dataBtn=document.getElementById('trigDataBtn'), dataPanel=document.getElementById('trigDataPanel'),
        dataDesc=document.getElementById('trigDataDesc'), dataRows=document.getElementById('trigDataRows');
    wireDataToggle(dataBtn,dataPanel);
    function updateDataView(adj,opp,r){
      if(!dataDesc) return;
      dataDesc.textContent='Right triangle with angle θ = '+deg+'° and hypotenuse '+fmt(H,1)+'. Opposite = '+fmt(opp,3)+', adjacent = '+fmt(adj,3)+'.';
      renderDataRows(dataRows,[
        ['θ',deg+'°'],
        ['hypotenuse',fmt(H,3)],
        ['adjacent',fmt(adj,3)],
        ['opposite',fmt(opp,3)],
        ['sin θ',fmt(Math.sin(r),3)],
        ['cos θ',fmt(Math.cos(r),3)],
        ['tan θ',fmt(Math.tan(r),3)]
      ]);
    }
    function draw(ctx,w,h){
      var P=new Plot(ctx,w,h,view,{l:22,r:12,t:12,b:20}); P.clear(); P.grid();
      var r=deg*Math.PI/180, adj=H*Math.cos(r), opp=H*Math.sin(r);
      P.segment(0,0,adj,0,INDIGO,2.4);
      P.segment(adj,0,adj,opp,INDIGO,2.4);
      P.segment(0,0,adj,opp,AMBER2,2.6);
      // right-angle marker
      var m=0.22; P.segment(adj-m,0,adj-m,m,'#9FB0C7',1.4); P.segment(adj-m,m,adj,m,'#9FB0C7',1.4);
      P.dot(0,0,INDIGO,4); P.dot(adj,0,INDIGO,4); P.dot(adj,opp,INDIGO,4);
      ctx.fillStyle=MUTED; ctx.font='12px ui-sans-serif, system-ui, sans-serif';
      ctx.fillText('θ',P.X(0.32),P.Y(0.14));
      ctx.fillText('adj',P.X(adj/2)-8,P.Y(-0.18));
      ctx.fillText('opp',P.X(adj)+6,P.Y(opp/2));
      ctx.fillText('hyp',P.X(adj/2)-22,P.Y(opp/2)-2);
      document.getElementById('trigA').textContent=deg+'°';
      document.getElementById('trigSin').textContent=Math.sin(r).toFixed(3);
      document.getElementById('trigCos').textContent=Math.cos(r).toFixed(3);
      document.getElementById('trigTan').textContent=Math.tan(r).toFixed(3);
      updateDataView(adj,opp,r);
    }
    register(canvas,draw);
    s.addEventListener('input',function(){ deg=parseInt(s.value,10); redrawAll(); });
  })();

  /* ===================== IGCSE · TRANSFORMATIONS ===================== */
  (function(){
    var canvas=document.getElementById('igTransCanvas'); if(!canvas) return;
    var T=[[1,1],[3,1],[1,2]];
    var maps={
      rx:{f:function(p){return [p[0],-p[1]];}, rule:'(x, y) → (x, −y)   ·   reflection in the x-axis'},
      ry:{f:function(p){return [-p[0],p[1]];}, rule:'(x, y) → (−x, y)   ·   reflection in the y-axis'},
      ryx:{f:function(p){return [p[1],p[0]];}, rule:'(x, y) → (y, x)   ·   reflection in y = x'},
      r90:{f:function(p){return [-p[1],p[0]];}, rule:'(x, y) → (−y, x)   ·   rotation 90° anticlockwise about O'},
      r180:{f:function(p){return [-p[0],-p[1]];}, rule:'(x, y) → (−x, −y)   ·   rotation 180° about O'},
      e2:{f:function(p){return [2*p[0],2*p[1]];}, rule:'(x, y) → (2x, 2y)   ·   enlargement scale factor 2, centre O'}
    };
    var key='rx', view={xmin:-6.5,xmax:6.5,ymin:-6.5,ymax:6.5};
    var sel=document.getElementById('igTransSel');
    var dataBtn=document.getElementById('igTransDataBtn'), dataPanel=document.getElementById('igTransDataPanel'),
        dataDesc=document.getElementById('igTransDataDesc'), dataRows=document.getElementById('igTransDataRows');
    wireDataToggle(dataBtn,dataPanel);
    function updateDataView(img){
      if(!dataDesc) return;
      dataDesc.textContent='Rule: '+maps[key].rule+'.';
      var rows=[];
      for(var i=0;i<T.length;i++){ rows.push(['vertex '+(i+1),'('+T[i][0]+', '+T[i][1]+')','('+fmt(img[i][0])+', '+fmt(img[i][1])+')']); }
      renderDataRows(dataRows,rows);
    }
    function poly(P,ctx,pts,color,width,dash){
      ctx.save(); ctx.beginPath();
      for(var i=0;i<pts.length;i++){ var X=P.X(pts[i][0]),Y=P.Y(pts[i][1]); if(i===0) ctx.moveTo(X,Y); else ctx.lineTo(X,Y); }
      ctx.closePath(); ctx.strokeStyle=color; ctx.lineWidth=width; if(dash) ctx.setLineDash(dash); ctx.lineJoin='round'; ctx.stroke(); ctx.restore();
    }
    function draw(ctx,w,h){
      var P=new Plot(ctx,w,h,view,{l:22,r:12,t:12,b:20}); P.clear(); P.grid();
      poly(P,ctx,T,'#B7C0CE',1.8,[5,4]);
      var img=T.map(maps[key].f);
      poly(P,ctx,img,INDIGO,2.6,null);
      img.forEach(function(p){ P.dot(p[0],p[1],AMBER2,4.5); });
      document.getElementById('igTransRule').textContent=maps[key].rule;
      updateDataView(img);
    }
    register(canvas,draw);
    sel.addEventListener('change',function(){ key=sel.value; redrawAll(); });
  })();
})(window.CSExplorerKit);
