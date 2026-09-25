/* Canvas explorers for the geo track (Plan 5 Phase 5.015, ADR 0039).
   Moved verbatim out of modules/02-core-app.js. build.js minifies this file to
   public/js/ex/geo.js, which base.njk loads only on the geo page, right after
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

  /* ===================== GEOMETRY · PARALLEL LINES & TRANSVERSAL ===================== */
  (function(){
    var canvas=document.getElementById('geoParCanvas'); if(!canvas) return;
    var deg=55, view={xmin:-6,xmax:6,ymin:-4,ymax:4};
    var s=document.getElementById('geoParA');
    var dataBtn=document.getElementById('geoParDataBtn'), dataPanel=document.getElementById('geoParDataPanel'),
        dataDesc=document.getElementById('geoParDataDesc'), dataRows=document.getElementById('geoParDataRows');
    wireDataToggle(dataBtn,dataPanel);
    function updateDataView(){
      if(!dataDesc) return;
      dataDesc.textContent='A transversal crosses two parallel lines at angle '+deg+'° to them. By the parallel-line angle theorems, both intersections share the same acute angle ('+deg+'°) and the same obtuse angle ('+(180-deg)+'°) — corresponding angles are equal, and each pair is supplementary.';
      renderDataRows(dataRows,[
        ['top line',deg+'°',(180-deg)+'°'],
        ['bottom line',deg+'°',(180-deg)+'°']
      ]);
    }
    function draw(ctx,w,h){
      var P=new Plot(ctx,w,h,view,{l:18,r:12,t:12,b:18}); P.clear(); P.grid();
      var yT=1.6, yB=-1.6;
      P.segment(-6,yT,6,yT,'#9FB0C7',2); P.segment(-6,yB,6,yB,'#9FB0C7',2);
      var m=Math.tan(deg*Math.PI/180);
      // transversal through origin, slope m: x = y/m
      var x1=(4)/m, x2=(-4)/m;
      P.segment(x2,-4,x1,4,INK,2.4);
      var xT=yT/m, xB=yB/m;
      P.dot(xT,yT,AMBER2,5); P.dot(xB,yB,AMBER2,5);
      ctx.fillStyle=MUTED; ctx.font='12px ui-sans-serif, system-ui, sans-serif';
      ctx.fillText(deg+'°', P.X(xT)+8, P.Y(yT)-6);
      ctx.fillText(deg+'°', P.X(xB)+8, P.Y(yB)-6);
      document.getElementById('geoParAcute').textContent=deg+'°';
      document.getElementById('geoParObtuse').textContent=(180-deg)+'°';
      updateDataView();
    }
    register(canvas,draw);
    s.addEventListener('input',function(){ deg=parseInt(s.value,10); redrawAll(); });
  })();

  /* ===================== GEOMETRY · TRIANGLE ANGLE SUM ===================== */
  (function(){
    var canvas=document.getElementById('geoTriCanvas'); if(!canvas) return;
    var cx=0, view={xmin:-4,xmax:4,ymin:-2.4,ymax:2.8};
    var s=document.getElementById('geoTriX');
    var dataBtn=document.getElementById('geoTriDataBtn'), dataPanel=document.getElementById('geoTriDataPanel'),
        dataDesc=document.getElementById('geoTriDataDesc'), dataRows=document.getElementById('geoTriDataRows');
    wireDataToggle(dataBtn,dataPanel);
    function ang(p,q,r){ // angle at p
      var u=[q[0]-p[0],q[1]-p[1]], v=[r[0]-p[0],r[1]-p[1]];
      var c=(u[0]*v[0]+u[1]*v[1])/(Math.hypot(u[0],u[1])*Math.hypot(v[0],v[1]));
      return Math.acos(Math.max(-1,Math.min(1,c)))*180/Math.PI;
    }
    function updateDataView(A,B,C,a,b,c){
      if(!dataDesc) return;
      dataDesc.textContent='Triangle with vertices A, B, C. Interior angles: '+Math.round(a)+'° + '+Math.round(b)+'° + '+Math.round(c)+'° = '+Math.round(a+b+c)+'° (the Triangle Angle Sum Theorem: always 180°).';
      renderDataRows(dataRows,[
        ['A','('+fmt(A[0])+', '+fmt(A[1])+')',Math.round(a)+'°'],
        ['B','('+fmt(B[0])+', '+fmt(B[1])+')',Math.round(b)+'°'],
        ['C','('+fmt(C[0])+', '+fmt(C[1])+')',Math.round(c)+'°']
      ]);
    }
    function draw(ctx,w,h){
      var P=new Plot(ctx,w,h,view,{l:18,r:12,t:12,b:18}); P.clear(); P.grid();
      var A=[-2.4,-1.2], B=[2.4,-1.2], C=[cx,1.9];
      P.segment(A[0],A[1],B[0],B[1],INDIGO,2.4);
      P.segment(B[0],B[1],C[0],C[1],INDIGO,2.4);
      P.segment(C[0],C[1],A[0],A[1],INDIGO,2.4);
      P.dot(A[0],A[1],AMBER2,5); P.dot(B[0],B[1],AMBER2,5); P.dot(C[0],C[1],AMBER2,5);
      var a=ang(A,B,C), b=ang(B,A,C), c=ang(C,A,B);
      ctx.fillStyle=MUTED; ctx.font='12px ui-sans-serif, system-ui, sans-serif';
      ctx.fillText(Math.round(a)+'°', P.X(A[0])+6, P.Y(A[1])-6);
      ctx.fillText(Math.round(b)+'°', P.X(B[0])-22, P.Y(B[1])-6);
      ctx.fillText(Math.round(c)+'°', P.X(C[0])-8, P.Y(C[1])+16);
      document.getElementById('geoTriA').textContent=Math.round(a)+'°';
      document.getElementById('geoTriB').textContent=Math.round(b)+'°';
      document.getElementById('geoTriC').textContent=Math.round(c)+'°';
      document.getElementById('geoTriSum').textContent=Math.round(a+b+c)+'°';
      updateDataView(A,B,C,a,b,c);
    }
    register(canvas,draw);
    s.addEventListener('input',function(){ cx=parseInt(s.value,10)/10; redrawAll(); });
  })();

  /* ===================== GEOMETRY · PYTHAGORAS (SQUARES) ===================== */
  (function(){
    var canvas=document.getElementById('geoPythCanvas'); if(!canvas) return;
    var a=3, b=4, view={xmin:-4.5,xmax:8.5,ymin:-4.5,ymax:8.5};
    var sa=document.getElementById('geoPa'), sb=document.getElementById('geoPb');
    var dataBtn=document.getElementById('geoPythDataBtn'), dataPanel=document.getElementById('geoPythDataPanel'),
        dataDesc=document.getElementById('geoPythDataDesc'), dataRows=document.getElementById('geoPythDataRows');
    wireDataToggle(dataBtn,dataPanel);
    function updateDataView(){
      var cSq=a*a+b*b, cLen=Math.sqrt(cSq);
      if(!dataDesc) return;
      dataDesc.textContent='Right triangle with legs a = '+a+' and b = '+b+'. a² + b² = '+(a*a)+' + '+(b*b)+' = '+cSq+' = c², so c = '+fmt(cLen,3)+'.';
      renderDataRows(dataRows,[
        ['a',a],['b',b],['a²',a*a],['b²',b*b],['a² + b²',cSq],['c (= √(a²+b²))',fmt(cLen,3)],['c²',cSq]
      ]);
    }
    function fillpoly(P,ctx,pts,stroke,fill){
      ctx.save(); ctx.beginPath();
      for(var i=0;i<pts.length;i++){ var X=P.X(pts[i][0]),Y=P.Y(pts[i][1]); if(i===0) ctx.moveTo(X,Y); else ctx.lineTo(X,Y); }
      ctx.closePath(); if(fill){ ctx.fillStyle=fill; ctx.fill(); } ctx.strokeStyle=stroke; ctx.lineWidth=2; ctx.lineJoin='round'; ctx.stroke(); ctx.restore();
    }
    function draw(ctx,w,h){
      var P=new Plot(ctx,w,h,view,{l:18,r:12,t:12,b:18}); P.clear(); P.grid();
      // square on horizontal leg (below)
      fillpoly(P,ctx,[[0,0],[a,0],[a,-a],[0,-a]],'#9FB0C7','rgba(184,128,31,0.10)');
      // square on vertical leg (left)
      fillpoly(P,ctx,[[0,0],[0,b],[-b,b],[-b,0]],'#9FB0C7','rgba(184,128,31,0.10)');
      // square on hypotenuse
      fillpoly(P,ctx,[[a,0],[0,b],[b,a+b],[a+b,a]],INDIGO,'rgba(30,58,110,0.10)');
      // triangle
      fillpoly(P,ctx,[[0,0],[a,0],[0,b]],INK,null);
      P.dot(0,0,INK,3.5);
      ctx.fillStyle=MUTED; ctx.font='12px ui-sans-serif, system-ui, sans-serif';
      ctx.fillText('a²='+(a*a), P.X(a/2)-14, P.Y(-a/2));
      ctx.fillText('b²='+(b*b), P.X(-b/2)-10, P.Y(b/2));
      ctx.fillText('c²='+(a*a+b*b), P.X((a+b)/2)+4, P.Y((a+b)/2)+6);
      document.getElementById('geoPa2').textContent=(a*a);
      document.getElementById('geoPb2').textContent=(b*b);
      document.getElementById('geoPc2').textContent=(a*a+b*b);
      updateDataView();
    }
    function upd(){ a=parseInt(sa.value,10); b=parseInt(sb.value,10);
      document.getElementById('geoPav').textContent=a; document.getElementById('geoPbv').textContent=b; redrawAll(); }
    register(canvas,draw);
    sa.addEventListener('input',upd); sb.addEventListener('input',upd);
  })();

  /* GEO CH 7 — sector area & arc length */
  (function(){
    var canvas=document.getElementById('geoSectorCanvas'); if(!canvas) return;
    var r=4, theta=90;
    var view={xmin:-9,xmax:9,ymin:-9,ymax:9};
    var dataBtn=document.getElementById('geoSectorDataBtn'), dataPanel=document.getElementById('geoSectorDataPanel'),
        dataDesc=document.getElementById('geoSectorDataDesc'), dataRows=document.getElementById('geoSectorDataRows');
    wireDataToggle(dataBtn,dataPanel);
    function updateDataView(arcLen,area){
      if(!dataDesc) return;
      dataDesc.textContent='Circle of radius r = '+fmt(r,1)+', sector angle θ = '+theta+'°. Arc length = (θ/360)·2πr = '+fmt(arcLen,3)+'. Sector area = (θ/360)·πr² = '+fmt(area,3)+'.';
      renderDataRows(dataRows,[
        ['radius r', fmt(r,1)],
        ['angle θ', theta+'°'],
        ['arc length', fmt(arcLen,3)],
        ['sector area', fmt(area,3)]
      ]);
    }
    function draw(ctx,w,h){
      var P=new Plot(ctx,w,h,view,{l:28,r:12,t:12,b:24}); P.clear(); P.grid();
      var c=P.ctx, rad=theta*Math.PI/180;
      var rp=P.X(r)-P.X(0);
      c.fillStyle='rgba(30,58,110,.16)';
      c.beginPath(); c.moveTo(P.X(0),P.Y(0)); c.arc(P.X(0),P.Y(0),rp,-0,-rad,true); c.closePath(); c.fill();
      c.strokeStyle=INDIGO; c.lineWidth=1.6;
      c.beginPath(); c.arc(P.X(0),P.Y(0),rp,0,2*Math.PI); c.stroke();
      arrow(c,P.X(0),P.Y(0),P.X(r),P.Y(0),AMBER2,2.2);
      arrow(c,P.X(0),P.Y(0),P.X(r*Math.cos(rad)),P.Y(r*Math.sin(rad)),AMBER2,2.2);
      var arcLen=(theta/360)*2*Math.PI*r, area=(theta/360)*Math.PI*r*r;
      document.getElementById('geoSectorArc').textContent=fmt(arcLen,3);
      document.getElementById('geoSectorArea').textContent=fmt(area,3);
      updateDataView(arcLen,area);
    }
    register(canvas,draw);
    var sr=document.getElementById('geoSectorR'), st=document.getElementById('geoSectorTheta');
    function upd(){
      r=parseFloat(sr.value); theta=parseInt(st.value,10);
      document.getElementById('geoSectorRval').textContent=fmt(r,1);
      document.getElementById('geoSectorThetaV').textContent=theta+'°';
      redrawAll();
    }
    sr.addEventListener('input',upd); st.addEventListener('input',upd); upd();
  })();

  /* GEO CH 10 — distance, midpoint & slope */
  (function(){
    var canvas=document.getElementById('geoDistCanvas'); if(!canvas) return;
    var x1=0,y1=0,x2=6,y2=8;
    var view={xmin:-10,xmax:10,ymin:-10,ymax:10};
    var dataBtn=document.getElementById('geoDistDataBtn'), dataPanel=document.getElementById('geoDistDataPanel'),
        dataDesc=document.getElementById('geoDistDataDesc'), dataRows=document.getElementById('geoDistDataRows');
    wireDataToggle(dataBtn,dataPanel);
    function updateDataView(dist,mx,my,slope){
      if(!dataDesc) return;
      dataDesc.textContent='A = ('+fmt(x1,1)+', '+fmt(y1,1)+'), B = ('+fmt(x2,1)+', '+fmt(y2,1)+'). Distance AB = '+fmt(dist,3)+'. Midpoint = ('+fmt(mx,2)+', '+fmt(my,2)+'). Slope = '+(isFinite(slope)?fmt(slope,3):'undefined (vertical)')+'.';
      renderDataRows(dataRows,[
        ['A','('+fmt(x1,1)+', '+fmt(y1,1)+')'],
        ['B','('+fmt(x2,1)+', '+fmt(y2,1)+')'],
        ['distance', fmt(dist,3)],
        ['midpoint', '('+fmt(mx,2)+', '+fmt(my,2)+')'],
        ['slope', isFinite(slope)?fmt(slope,3):'undefined']
      ]);
    }
    function draw(ctx,w,h){
      var P=new Plot(ctx,w,h,view,{l:30,r:12,t:14,b:26}); P.clear(); P.grid();
      var c=P.ctx;
      c.strokeStyle='rgba(30,58,110,.55)'; c.lineWidth=2; c.setLineDash([5,4]);
      c.beginPath(); c.moveTo(P.X(x1),P.Y(y1)); c.lineTo(P.X(x2),P.Y(y2)); c.stroke(); c.setLineDash([]);
      P.dot(x1,y1,INDIGO,5.5); P.dot(x2,y2,INDIGO,5.5);
      var dist=Math.sqrt((x2-x1)*(x2-x1)+(y2-y1)*(y2-y1)), mx=(x1+x2)/2, my=(y1+y2)/2, slope=(x2-x1)!==0?(y2-y1)/(x2-x1):Infinity;
      P.dot(mx,my,AMBER2,5);
      document.getElementById('geoDistD').textContent=fmt(dist,3);
      document.getElementById('geoDistMid').textContent='('+fmt(mx,2)+', '+fmt(my,2)+')';
      updateDataView(dist,mx,my,slope);
    }
    register(canvas,draw);
    var s1=document.getElementById('geoDistX1'), s2=document.getElementById('geoDistY1'),
        s3=document.getElementById('geoDistX2'), s4=document.getElementById('geoDistY2');
    function upd(){
      x1=parseFloat(s1.value); y1=parseFloat(s2.value); x2=parseFloat(s3.value); y2=parseFloat(s4.value);
      document.getElementById('geoDistX1val').textContent=fmt(x1,1);
      document.getElementById('geoDistY1val').textContent=fmt(y1,1);
      document.getElementById('geoDistX2val').textContent=fmt(x2,1);
      document.getElementById('geoDistY2val').textContent=fmt(y2,1);
      redrawAll();
    }
    [s1,s2,s3,s4].forEach(function(el){ el.addEventListener('input',upd); });
    upd();
  })();

  /* GEO CH 9 — dilation: length scales by k, area by k^2 */
  (function(){
    var canvas=document.getElementById('geoDilateCanvas'); if(!canvas) return;
    var k=3;
    var A=[0,0], B=[4,0], C=[0,3]; // 3-4-5 triangle; AB has length 4 (Worked example 9.A's side)
    var view={xmin:-2,xmax:16,ymin:-2,ymax:14};
    var dataBtn=document.getElementById('geoDilateDataBtn'), dataPanel=document.getElementById('geoDilateDataPanel'),
        dataDesc=document.getElementById('geoDilateDataDesc'), dataRows=document.getElementById('geoDilateDataRows');
    wireDataToggle(dataBtn,dataPanel);
    function updateDataView(imgLen,areaOrig,areaImg){
      if(!dataDesc) return;
      dataDesc.textContent='Dilating by scale factor k = '+fmt(k,2)+' about the origin: side AB (length 4) maps to length '+fmt(imgLen,2)+'. Area scales by k² = '+fmt(k*k,3)+': '+fmt(areaOrig,2)+' → '+fmt(areaImg,3)+'.';
      renderDataRows(dataRows,[
        ['scale factor k', fmt(k,2)],
        ['|AB| (original)', '4'],
        ["|A'B'| (image)", fmt(imgLen,2)],
        ['area (original)', fmt(areaOrig,2)],
        ['area (image)', fmt(areaImg,3)]
      ]);
    }
    function tri(ctx,P,pts,color,width,fill){
      var c=ctx;
      c.beginPath(); c.moveTo(P.X(pts[0][0]),P.Y(pts[0][1]));
      c.lineTo(P.X(pts[1][0]),P.Y(pts[1][1])); c.lineTo(P.X(pts[2][0]),P.Y(pts[2][1])); c.closePath();
      if(fill){ c.fillStyle=fill; c.fill(); }
      c.strokeStyle=color; c.lineWidth=width; c.stroke();
    }
    function draw(ctx,w,h){
      var P=new Plot(ctx,w,h,view,{l:28,r:12,t:12,b:24}); P.clear(); P.grid();
      tri(ctx,P,[A,B,C],'rgba(140,151,168,.6)',1.6,null);
      var Ai=[A[0]*k,A[1]*k], Bi=[B[0]*k,B[1]*k], Ci=[C[0]*k,C[1]*k];
      tri(ctx,P,[Ai,Bi,Ci],INDIGO2,2.4,'rgba(30,58,110,.12)');
      P.segment(A[0],A[1],B[0],B[1],AMBER2,2.4);
      P.segment(Ai[0],Ai[1],Bi[0],Bi[1],AMBER2,2.4);
      var imgLen=4*k, areaOrig=0.5*4*3, areaImg=areaOrig*k*k;
      document.getElementById('geoDilateLen').textContent=fmt(imgLen,2);
      document.getElementById('geoDilateArea').textContent=fmt(areaImg,3);
      updateDataView(imgLen,areaOrig,areaImg);
    }
    register(canvas,draw);
    var s=document.getElementById('geoDilateK');
    function upd(){ k=parseFloat(s.value); document.getElementById('geoDilateKval').textContent=fmt(k,2); redrawAll(); }
    s.addEventListener('input',upd); upd();
  })();
})(window.CSExplorerKit);
