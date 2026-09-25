/* Canvas explorers for the act2 track (Plan 5 Phase 5.015, ADR 0039).
   Moved verbatim out of modules/02-core-app.js. build.js minifies this file to
   public/js/ex/act2.js, which base.njk loads only on the act2 page, right after
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
     ACT2 — Pillar 2 MVP retrofit continued (track 4 of 8). Same shared
     Plot/register/redrawAll/fmt helpers as every other track.
     ══════════════════════════════════════════════════════════════════ */

  /* ACT2 CH 3 — rational function asymptotes: f(x) = 2/(x-p) + q */
  (function(){
    var canvas=document.getElementById('act2RatCanvas'); if(!canvas) return;
    var view={xmin:-8,xmax:8,ymin:-8,ymax:8};
    var p=1, q=0;
    var dataBtn=document.getElementById('act2RatDataBtn'), dataPanel=document.getElementById('act2RatDataPanel'),
        dataDesc=document.getElementById('act2RatDataDesc'), dataRows=document.getElementById('act2RatDataRows');
    wireDataToggle(dataBtn,dataPanel);
    function updateDataView(f){
      if(!dataDesc) return;
      dataDesc.textContent='f(x) = 2/(x − '+p+') + '+q+'. Vertical asymptote x = '+p+'. Horizontal asymptote y = '+q+'.';
      var N=9, rows=[];
      for(var i=0;i<N;i++){ var x=view.xmin+(view.xmax-view.xmin)*i/(N-1); var y=f(x); rows.push([fmt(x), isNaN(y)?'undefined (asymptote)':fmt(y)]); }
      renderDataRows(dataRows,rows);
    }
    function draw(ctx,w,h){
      var P=new Plot(ctx,w,h,view,{l:28,r:12,t:12,b:24}); P.clear(); P.grid();
      var f=function(x){ return Math.abs(x-p)<0.06 ? NaN : 2/(x-p)+q; };
      P.curve(f, INDIGO, 2.4);
      P.segment(p,view.ymin,p,view.ymax,AMBER2,1.4,[4,4]);
      P.segment(view.xmin,q,view.xmax,q,AMBER2,1.4,[4,4]);
      document.getElementById('act2VAsym').textContent='x = '+p;
      document.getElementById('act2HAsym').textContent='y = '+q;
      updateDataView(f);
    }
    register(canvas,draw);
    var sp=document.getElementById('act2RatP'), sq=document.getElementById('act2RatQ');
    function upd(){
      p=parseInt(sp.value,10); q=parseInt(sq.value,10);
      document.getElementById('act2RatPlab').textContent=p;
      document.getElementById('act2RatQlab').textContent=q;
      redrawAll();
    }
    sp.addEventListener('input',upd); sq.addEventListener('input',upd); upd();
  })();

  /* ACT2 CH 4 — Law of Cosines */
  (function(){
    var canvas=document.getElementById('act2LawCanvas'); if(!canvas) return;
    var view={xmin:-11,xmax:12,ymin:-2,ymax:11};
    var a=7, b=10, Cdeg=60;
    var dataBtn=document.getElementById('act2LawDataBtn'), dataPanel=document.getElementById('act2LawDataPanel'),
        dataDesc=document.getElementById('act2LawDataDesc'), dataRows=document.getElementById('act2LawDataRows');
    wireDataToggle(dataBtn,dataPanel);
    function updateDataView(cc){
      if(!dataDesc) return;
      dataDesc.textContent='Triangle with sides a = '+a+', b = '+b+', included angle C = '+Cdeg+'°. Law of Cosines: c² = a² + b² − 2ab·cos(C) = '+fmt(cc*cc,2)+', so c = '+fmt(cc,2)+'.';
      renderDataRows(dataRows,[
        ['a',a],['b',b],['C',Cdeg+'°'],['c (Law of Cosines)',fmt(cc,2)]
      ]);
    }
    function draw(ctx,w,h){
      var P=new Plot(ctx,w,h,view,{l:28,r:12,t:12,b:24}); P.clear();
      var c=P.ctx, Crad=Cdeg*Math.PI/180;
      var Ax=a*Math.cos(Crad), Ay=a*Math.sin(Crad), Bx=b, By=0;
      c.beginPath(); c.moveTo(P.X(0),P.Y(0)); c.lineTo(P.X(Bx),P.Y(By)); c.lineTo(P.X(Ax),P.Y(Ay)); c.closePath();
      c.fillStyle='rgba(14,23,38,0.06)'; c.fill(); c.lineWidth=2; c.strokeStyle=INK; c.stroke();
      P.segment(0,0,Bx,By,AMBER2,2.6);
      P.segment(0,0,Ax,Ay,INDIGO,2.6);
      P.segment(Ax,Ay,Bx,By,INK,2.2);
      var cc=Math.sqrt(a*a+b*b-2*a*b*Math.cos(Crad));
      document.getElementById('act2SideC').textContent=fmt(cc,2);
      updateDataView(cc);
    }
    register(canvas,draw);
    var sa=document.getElementById('act2LawA'), sb=document.getElementById('act2LawB'), sC=document.getElementById('act2LawC');
    function upd(){
      a=parseInt(sa.value,10); b=parseInt(sb.value,10); Cdeg=parseInt(sC.value,10);
      document.getElementById('act2LawAlab').textContent=a;
      document.getElementById('act2LawBlab').textContent=b;
      document.getElementById('act2LawClab').textContent=Cdeg+'°';
      redrawAll();
    }
    sa.addEventListener('input',upd); sb.addEventListener('input',upd); sC.addEventListener('input',upd); upd();
  })();

  /* ACT2 CH 7 — inscribed angle theorem: angle at centre = 2 x angle at circumference */
  (function(){
    var canvas=document.getElementById('act2IncCanvas'); if(!canvas) return;
    var view={xmin:-6.4,xmax:6.4,ymin:-4.4,ymax:4.4};
    var R=4, thetaDeg=140;
    var dataBtn=document.getElementById('act2IncDataBtn'), dataPanel=document.getElementById('act2IncDataPanel'),
        dataDesc=document.getElementById('act2IncDataDesc'), dataRows=document.getElementById('act2IncDataRows');
    wireDataToggle(dataBtn,dataPanel);
    function updateDataView(A,B,C,inscribed){
      if(!dataDesc) return;
      dataDesc.textContent='Central angle AOB = '+fmt(thetaDeg,1)+'°. Inscribed angle ACB (from point C on the major arc) = '+fmt(inscribed,1)+'°. (Inscribed Angle Theorem: the inscribed angle is always half the central angle — half of '+fmt(thetaDeg,1)+'° is '+fmt(thetaDeg/2,1)+'°.)';
      renderDataRows(dataRows,[
        ['O',fmt(0),fmt(0)],
        ['A',fmt(A[0]),fmt(A[1])],
        ['B',fmt(B[0]),fmt(B[1])],
        ['C',fmt(C[0]),fmt(C[1])]
      ]);
    }
    function draw(ctx,w,h){
      var P=new Plot(ctx,w,h,view,{l:20,r:10,t:10,b:20}); P.clear();
      var c=P.ctx, N=120, i, a;
      c.beginPath();
      for(i=0;i<=N;i++){ a=2*Math.PI*i/N; var px=P.X(R*Math.cos(a)), py=P.Y(R*Math.sin(a)); if(i===0) c.moveTo(px,py); else c.lineTo(px,py); }
      c.closePath(); c.lineWidth=1.4; c.strokeStyle='#B8C3D6'; c.stroke();
      var half=thetaDeg/2*Math.PI/180;
      var angA=Math.PI/2+half, angB=Math.PI/2-half;
      var Ax=R*Math.cos(angA), Ay=R*Math.sin(angA);
      var Bx=R*Math.cos(angB), By=R*Math.sin(angB);
      var Cx=R*Math.cos(-Math.PI/2), Cy=R*Math.sin(-Math.PI/2);
      P.segment(0,0,Ax,Ay,'#AEB8C7',1.4);
      P.segment(0,0,Bx,By,'#AEB8C7',1.4);
      P.segment(Cx,Cy,Ax,Ay,INDIGO,2.2);
      P.segment(Cx,Cy,Bx,By,INDIGO,2.2);
      P.dot(Ax,Ay,INK,4); P.dot(Bx,By,INK,4); P.dot(Cx,Cy,AMBER2,4.5); P.dot(0,0,INK,3);
      var v1x=Ax-Cx, v1y=Ay-Cy, v2x=Bx-Cx, v2y=By-Cy;
      var dp=v1x*v2x+v1y*v2y, m1=Math.sqrt(v1x*v1x+v1y*v1y), m2=Math.sqrt(v2x*v2x+v2y*v2y);
      var inscribed=Math.acos(Math.max(-1,Math.min(1,dp/(m1*m2))))*180/Math.PI;
      document.getElementById('act2Central').textContent=fmt(thetaDeg,1)+'°';
      document.getElementById('act2Inscribed').textContent=fmt(inscribed,1)+'°';
      updateDataView([Ax,Ay],[Bx,By],[Cx,Cy],inscribed);
    }
    register(canvas,draw);
    var s=document.getElementById('act2IncTheta');
    function upd(){ thetaDeg=parseInt(s.value,10); document.getElementById('act2IncThetalab').textContent=thetaDeg+'°'; redrawAll(); }
    s.addEventListener('input',upd); upd();
  })();
})(window.CSExplorerKit);
