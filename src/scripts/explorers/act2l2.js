/* Canvas explorers for the act2l2 track (Plan 5 Phase 5.015, ADR 0039).
   Moved verbatim out of modules/02-core-app.js. build.js minifies this file to
   public/js/ex/act2l2.js, which base.njk loads only on the act2l2 page, right after
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
     ACT 2 MATH LEVEL 2 & EST 2 MATH LEVEL 2 — full-density explorer
     build-out. Same shared Plot/register/redrawAll/fmt/wireDataToggle/
     renderDataRows/arrow helpers as every explorer above.
     ══════════════════════════════════════════════════════════════════ */

  /* ACT2L2 CH 2 — determinant as a signed area, tied to Theorem 2.1's
     2×2 inverse formula. Default matrix matches Worked example 2.C
     (a=2,b=3,c=1,d=-1, det=-5) so the explorer and the worked example
     agree on first load. */
  (function(){
    var canvas=document.getElementById('act2l2DetCanvas'); if(!canvas) return;
    var a=2, b=3, c=1, d=-1;
    var view={xmin:-4,xmax:6,ymin:-4,ymax:6};
    var dataBtn=document.getElementById('act2l2DetDataBtn'), dataPanel=document.getElementById('act2l2DetDataPanel'),
        dataDesc=document.getElementById('act2l2DetDataDesc'), dataRows=document.getElementById('act2l2DetDataRows');
    wireDataToggle(dataBtn,dataPanel);
    function updateDataView(det){
      if(!dataDesc) return;
      var inv = Math.abs(det)<1e-9 ? 'not invertible (det = 0)' : 'invertible';
      dataDesc.textContent='A has rows ('+fmt(a,2)+', '+fmt(b,2)+') and ('+fmt(c,2)+', '+fmt(d,2)+'). det A = ad − bc = '+fmt(det,3)+'. Column 1 image u = ('+fmt(a,2)+', '+fmt(c,2)+'), column 2 image v = ('+fmt(b,2)+', '+fmt(d,2)+'). |det A| = area of the parallelogram they span = '+fmt(Math.abs(det),3)+'. A is '+inv+'.';
      renderDataRows(dataRows,[
        ['A (rows)','('+fmt(a,2)+', '+fmt(b,2)+'), ('+fmt(c,2)+', '+fmt(d,2)+')'],
        ['det A = ad − bc',fmt(det,3)],
        ['area = |det A|',fmt(Math.abs(det),3)],
        ['invertible?', Math.abs(det)<1e-9 ? 'no (singular)' : 'yes']
      ]);
    }
    function draw(ctx,w,h){
      var P=new Plot(ctx,w,h,view,{l:30,r:12,t:14,b:26}); P.clear(); P.grid();
      var det=a*d-b*c, ctxc=P.ctx;
      var ux=a, uy=c, vx=b, vy=d;
      ctxc.beginPath(); ctxc.moveTo(P.X(0),P.Y(0)); ctxc.lineTo(P.X(ux),P.Y(uy));
      ctxc.lineTo(P.X(ux+vx),P.Y(uy+vy)); ctxc.lineTo(P.X(vx),P.Y(vy)); ctxc.closePath();
      ctxc.fillStyle = det<0 ? 'rgba(200,144,42,.25)' : 'rgba(30,58,110,.20)';
      ctxc.fill();
      arrow(ctxc,P.X(0),P.Y(0),P.X(ux),P.Y(uy),INDIGO,2.8);
      arrow(ctxc,P.X(0),P.Y(0),P.X(vx),P.Y(vy),AMBER2,2.8);
      document.getElementById('act2l2DetVal').textContent=fmt(det,3);
      document.getElementById('act2l2DetInv').textContent = Math.abs(det)<1e-9 ? 'singular' : 'invertible';
      if(Math.abs(det)>1e-9){
        document.getElementById('act2l2DetInvMatrix').textContent =
          '('+fmt(d/det,3)+', '+fmt(-b/det,3)+'), ('+fmt(-c/det,3)+', '+fmt(a/det,3)+')';
      } else {
        document.getElementById('act2l2DetInvMatrix').textContent = 'none';
      }
      updateDataView(det);
    }
    register(canvas,draw);
    var sa=document.getElementById('act2l2DetA'), sb=document.getElementById('act2l2DetB'),
        sc=document.getElementById('act2l2DetC'), sd=document.getElementById('act2l2DetD');
    function upd(){
      a=parseFloat(sa.value); b=parseFloat(sb.value); c=parseFloat(sc.value); d=parseFloat(sd.value);
      document.getElementById('act2l2DetAval').textContent=fmt(a,1);
      document.getElementById('act2l2DetBval').textContent=fmt(b,1);
      document.getElementById('act2l2DetCval').textContent=fmt(c,1);
      document.getElementById('act2l2DetDval').textContent=fmt(d,1);
      redrawAll();
    }
    [sa,sb,sc,sd].forEach(function(el){ el.addEventListener('input',upd); });
    upd();
  })();

  /* ACT2L2 CH 5 — double-angle identities on the unit circle: a single
     angle slider θ drives a point at θ AND a second point at 2θ, so
     Theorem 5.1's sin2x/cos2x fall directly out of the picture. */
  (function(){
    var canvas=document.getElementById('act2l2TrigCanvas'); if(!canvas) return;
    var theta=30*Math.PI/180;
    var view={xmin:-1.5,xmax:1.5,ymin:-1.5,ymax:1.5};
    var dataBtn=document.getElementById('act2l2TrigDataBtn'), dataPanel=document.getElementById('act2l2TrigDataPanel'),
        dataDesc=document.getElementById('act2l2TrigDataDesc'), dataRows=document.getElementById('act2l2TrigDataRows');
    wireDataToggle(dataBtn,dataPanel);
    function updateDataView(){
      if(!dataDesc) return;
      var deg=Math.round(theta*180/Math.PI);
      dataDesc.textContent='θ = '+deg+'°. (cos θ, sin θ) = ('+fmt(Math.cos(theta),3)+', '+fmt(Math.sin(theta),3)+'). 2θ = '+(2*deg)+'°, with (cos 2θ, sin 2θ) = ('+fmt(Math.cos(2*theta),3)+', '+fmt(Math.sin(2*theta),3)+'), matching Theorem 5.1: sin 2θ = 2 sin θ cos θ and cos 2θ = cos²θ − sin²θ.';
      renderDataRows(dataRows,[
        ['θ',Math.round(theta*180/Math.PI)+'°'],
        ['sin θ, cos θ',fmt(Math.sin(theta),3)+', '+fmt(Math.cos(theta),3)],
        ['2 sin θ cos θ (= sin 2θ)',fmt(2*Math.sin(theta)*Math.cos(theta),3)],
        ['cos²θ − sin²θ (= cos 2θ)',fmt(Math.cos(theta)*Math.cos(theta)-Math.sin(theta)*Math.sin(theta),3)]
      ]);
    }
    function draw(ctx,w,h){
      var P=new Plot(ctx,w,h,view,{l:28,r:12,t:12,b:24}); P.clear(); P.grid();
      var c=P.ctx;
      c.strokeStyle=LINE; c.lineWidth=1.4; c.beginPath(); c.arc(P.X(0),P.Y(0),(P.X(1)-P.X(0)),0,2*Math.PI); c.stroke();
      var px=Math.cos(theta), py=Math.sin(theta);
      var qx=Math.cos(2*theta), qy=Math.sin(2*theta);
      arrow(c,P.X(0),P.Y(0),P.X(px),P.Y(py),INDIGO,2.6);
      P.dot(px,py,INDIGO,5.5);
      arrow(c,P.X(0),P.Y(0),P.X(qx),P.Y(qy),AMBER2,2.2);
      P.dot(qx,qy,AMBER2,5.5);
      document.getElementById('act2l2TrigSin').textContent=fmt(py,3);
      document.getElementById('act2l2TrigCos').textContent=fmt(px,3);
      document.getElementById('act2l2TrigSin2').textContent=fmt(qy,3);
      document.getElementById('act2l2TrigCos2').textContent=fmt(qx,3);
      updateDataView();
    }
    register(canvas,draw);
    var s=document.getElementById('act2l2TrigTheta');
    function upd(){ theta=parseInt(s.value,10)*Math.PI/180; document.getElementById('act2l2TrigThetaV').textContent=s.value+'°'; redrawAll(); }
    s.addEventListener('input',upd); upd();
  })();

  /* ACT2L2 CH 1 — z on the Argand plane with its conjugate, tied to
     Theorem 1.1 (z z̄ = |z|²). Default z=3+4i matches Worked example
     1.B's division problem's numerator-conjugate arithmetic. */
  (function(){
    var canvas=document.getElementById('act2l2ComplexCanvas'); if(!canvas) return;
    var view={xmin:-6,xmax:6,ymin:-6,ymax:6};
    var a=3, b=4;
    var dataBtn=document.getElementById('act2l2ComplexDataBtn'), dataPanel=document.getElementById('act2l2ComplexDataPanel'),
        dataDesc=document.getElementById('act2l2ComplexDataDesc'), dataRows=document.getElementById('act2l2ComplexDataRows');
    wireDataToggle(dataBtn,dataPanel);
    function updateDataView(mod2){
      if(!dataDesc) return;
      dataDesc.textContent='z = '+fmt(a,2)+(b>=0?' + ':' − ')+fmt(Math.abs(b),2)+'i, z̄ = '+fmt(a,2)+(b>=0?' − ':' + ')+fmt(Math.abs(b),2)+'i. z·z̄ = '+fmt(mod2,3)+' = |z|², confirming Theorem 1.1.';
      renderDataRows(dataRows,[
        ['z', fmt(a,2)+(b>=0?' + ':' − ')+fmt(Math.abs(b),2)+'i'],
        ['z̄', fmt(a,2)+(b>=0?' − ':' + ')+fmt(Math.abs(b),2)+'i'],
        ['|z|', fmt(Math.sqrt(a*a+b*b),3)],
        ['z · z̄ (= |z|²)', fmt(a*a+b*b,3)]
      ]);
    }
    function draw(ctx,w,h){
      var extent=Math.max(6, Math.abs(a)*1.3, Math.abs(b)*1.3);
      view.xmin=-extent; view.xmax=extent; view.ymin=-extent; view.ymax=extent;
      var P=new Plot(ctx,w,h,view,{l:28,r:12,t:12,b:24}); P.clear(); P.grid();
      var mod=Math.sqrt(a*a+b*b);
      arrow(P.ctx,P.X(0),P.Y(0),P.X(a),P.Y(b),INDIGO,2.4);
      P.dot(a,b,INDIGO,5.5);
      arrow(P.ctx,P.X(0),P.Y(0),P.X(a),P.Y(-b),AMBER,2.2);
      P.dot(a,-b,AMBER,5.5);
      document.getElementById('act2l2ComplexMod').textContent=fmt(mod,3);
      document.getElementById('act2l2ComplexConj').textContent=fmt(a,2)+(b>=0?' − ':' + ')+fmt(Math.abs(b),2)+'i';
      document.getElementById('act2l2ComplexProd').textContent=fmt(a*a+b*b,3);
      updateDataView(a*a+b*b);
    }
    register(canvas,draw);
    var sA=document.getElementById('act2l2ComplexA'), sB=document.getElementById('act2l2ComplexB');
    function upd(){
      a=parseFloat(sA.value); b=parseFloat(sB.value);
      document.getElementById('act2l2ComplexAVal').textContent=fmt(a,1);
      document.getElementById('act2l2ComplexBVal').textContent=fmt(b,1);
      redrawAll();
    }
    sA.addEventListener('input',upd); sB.addEventListener('input',upd);
    upd();
  })();
})(window.CSExplorerKit);
