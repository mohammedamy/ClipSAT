/* Canvas explorers for the linalg track (Plan 5 Phase 5.015, ADR 0039).
   Moved verbatim out of modules/02-core-app.js. build.js minifies this file to
   public/js/ex/linalg.js, which base.njk loads only on the linalg page, right after
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

  /* ═══════════════════ LINEAR ALGEBRA TRACK EXPLORERS (Pillar 2 MVP —
     same retrofit as MVC above; linalg/ also launched with 0 explorers).
     Flagship item: la-matrices' transformation sandbox is the exact
     roadmap line "a linear-algebra transformation sandbox (matrix in,
     live-warped grid out)". */

  /* LINALG CH 1 — dot product, norm & Cauchy–Schwarz. u is fixed at the
     Worked example 1.B vector (1,2); v keeps the same length (√5) as
     example 1.B's v = (2,1) but rotates freely, so dragging finds the
     equality case (v parallel to u) the proof singles out. */
  (function(){
    var canvas=document.getElementById('laVecCanvas'); if(!canvas) return;
    var ux=1, uy=2, vmag=Math.sqrt(5), theta=27*Math.PI/180;
    var view={xmin:-3,xmax:3,ymin:-3,ymax:3};
    var dataBtn=document.getElementById('laVecDataBtn'), dataPanel=document.getElementById('laVecDataPanel'),
        dataDesc=document.getElementById('laVecDataDesc'), dataRows=document.getElementById('laVecDataRows');
    wireDataToggle(dataBtn,dataPanel);
    function updateDataView(vx,vy,dot,umag){
      if(!dataDesc) return;
      dataDesc.textContent='u = ⟨1, 2⟩ (fixed). v = ⟨'+fmt(vx,2)+', '+fmt(vy,2)+'⟩, same length as u (|v| = √5). u·v = '+fmt(dot,3)+'. |u||v| = '+fmt(umag*vmag,3)+'. Cauchy–Schwarz: |u·v| ≤ |u||v| always holds — equality exactly when v is parallel to u.';
      renderDataRows(dataRows,[
        ['u','⟨1, 2⟩',fmt(umag,3)],
        ['v','⟨'+fmt(vx,2)+', '+fmt(vy,2)+'⟩',fmt(vmag,3)],
        ['u · v',fmt(dot,3)],
        ['|u| |v|',fmt(umag*vmag,3)]
      ]);
    }
    function draw(ctx,w,h){
      var P=new Plot(ctx,w,h,view,{l:30,r:12,t:14,b:26}); P.clear(); P.grid();
      var vx=vmag*Math.cos(theta), vy=vmag*Math.sin(theta);
      var dot=ux*vx+uy*vy, umag=Math.sqrt(ux*ux+uy*uy);
      var c=P.ctx;
      arrow(c,P.X(0),P.Y(0),P.X(ux),P.Y(uy),INDIGO,2.8);
      arrow(c,P.X(0),P.Y(0),P.X(vx),P.Y(vy),AMBER2,2.8);
      document.getElementById('laVecDot').textContent=fmt(dot,3);
      document.getElementById('laVecBound').textContent=fmt(umag*vmag,3);
      updateDataView(vx,vy,dot,umag);
    }
    register(canvas,draw);
    var s=document.getElementById('laVecTheta');
    function upd(){ theta=parseInt(s.value,10)*Math.PI/180; document.getElementById('laVecThetaVal').textContent=s.value+'°'; redrawAll(); }
    s.addEventListener('input',upd); upd();
  })();

  /* LINALG CH 2 — two linear equations, one intersection (or none/
     infinite). Eq. 1 is fixed at x + y = 5; Eq. 2 defaults to x − y = 1,
     matching Worked example 2.A exactly (solution (3,2)) — dragging its
     sliders finds the dependent (a2 = −1, c2 = −5) and inconsistent
     (a2 = −1, c2 ≠ −5) cases from the chapter's own "how many solutions"
     cards. */
  (function(){
    var canvas=document.getElementById('laSysCanvas'); if(!canvas) return;
    var a2=1, c2=1;
    var view={xmin:-4,xmax:8,ymin:-4,ymax:10};
    var dataBtn=document.getElementById('laSysDataBtn'), dataPanel=document.getElementById('laSysDataPanel'),
        dataDesc=document.getElementById('laSysDataDesc'), dataRows=document.getElementById('laSysDataRows');
    wireDataToggle(dataBtn,dataPanel);
    function line1(x){ return 5-x; }
    function line2(x){ return a2*x-c2; }
    function solve(){
      if(Math.abs(a2+1)<1e-9){
        if(Math.abs(-c2-5)<1e-9) return {type:'dependent'};
        return {type:'inconsistent'};
      }
      var x=(5+c2)/(a2+1), y=5-x;
      return {type:'unique', x:x, y:y};
    }
    function updateDataView(sol){
      if(!dataDesc) return;
      var desc='Eq. 1 (fixed): x + y = 5. Eq. 2: '+fmt(a2,2)+'x − y = '+fmt(c2,2)+'. ';
      if(sol.type==='unique') desc+='Unique solution (x, y) = ('+fmt(sol.x,3)+', '+fmt(sol.y,3)+') — consistent, independent.';
      else if(sol.type==='dependent') desc+='The two equations describe the same line — infinitely many solutions (consistent, dependent).';
      else desc+='The two lines are parallel and distinct — no solution (inconsistent).';
      dataDesc.textContent=desc;
      renderDataRows(dataRows,[
        ['Eq. 1','x + y = 5'],
        ['Eq. 2',fmt(a2,2)+'x − y = '+fmt(c2,2)],
        ['type',sol.type],
        ['solution', sol.type==='unique' ? '('+fmt(sol.x,3)+', '+fmt(sol.y,3)+')' : (sol.type==='dependent'?'infinitely many':'none')]
      ]);
    }
    function draw(ctx,w,h){
      var P=new Plot(ctx,w,h,view,{l:30,r:12,t:14,b:26}); P.clear(); P.grid();
      P.curve(line1,INDIGO,2.6);
      P.curve(line2,AMBER2,2.6);
      var sol=solve();
      if(sol.type==='unique') P.dot(sol.x,sol.y,INK,5.5);
      document.getElementById('laSysType').textContent=
        sol.type==='unique' ? 'unique solution' : sol.type==='dependent' ? 'infinitely many (dependent)' : 'no solution (inconsistent)';
      document.getElementById('laSysSol').textContent= sol.type==='unique' ? '('+fmt(sol.x,3)+', '+fmt(sol.y,3)+')' : '—';
      updateDataView(sol);
    }
    register(canvas,draw);
    var sa=document.getElementById('laSysA2'), sc=document.getElementById('laSysC2');
    function upd(){
      a2=parseFloat(sa.value); c2=parseFloat(sc.value);
      document.getElementById('laSysA2val').textContent=fmt(a2,1);
      document.getElementById('laSysC2val').textContent=fmt(c2,1);
      redrawAll();
    }
    sa.addEventListener('input',upd); sc.addEventListener('input',upd); upd();
  })();

  /* LINALG CH 3 — matrix transformation sandbox: matrix in, live-warped
     grid out. Presets snap to Identity/Rotate 90°/Scale ×2/Shear/Reflect;
     the filled parallelogram is the image of the unit square, amber
     instead of indigo exactly when det < 0 (orientation reversed) —
     foreshadowing CH 4's signed area. */
  (function(){
    var canvas=document.getElementById('laMatCanvas'); if(!canvas) return;
    var a=1,b=0,c=0,d=1;
    var view={xmin:-6,xmax:6,ymin:-6,ymax:6};
    var GRID_EXT=2, GRID_STEP=0.5;
    var dataBtn=document.getElementById('laMatDataBtn'), dataPanel=document.getElementById('laMatDataPanel'),
        dataDesc=document.getElementById('laMatDataDesc'), dataRows=document.getElementById('laMatDataRows');
    wireDataToggle(dataBtn,dataPanel);
    function tf(x,y){ return {x:a*x+b*y, y:c*x+d*y}; }
    function updateDataView(det){
      if(!dataDesc) return;
      dataDesc.textContent='A = [['+fmt(a,2)+', '+fmt(b,2)+'], ['+fmt(c,2)+', '+fmt(d,2)+']]. det(A) = '+fmt(det,3)+'. The unit square’s image has area |det(A)| = '+fmt(Math.abs(det),3)+', '+(det<0?'with orientation reversed (flipped).':'preserving orientation.');
      renderDataRows(dataRows,[
        ['A','[['+fmt(a,2)+', '+fmt(b,2)+'], ['+fmt(c,2)+', '+fmt(d,2)+']]'],
        ['A e₁ (column 1)','('+fmt(a,2)+', '+fmt(c,2)+')'],
        ['A e₂ (column 2)','('+fmt(b,2)+', '+fmt(d,2)+')'],
        ['det(A)',fmt(det,3)],
        ['area scale factor',fmt(Math.abs(det),3)],
        ['orientation', det<0?'reversed':(det>0?'preserved':'collapsed (singular)')]
      ]);
    }
    function draw(ctx,wpx,hpx){
      var P=new Plot(ctx,wpx,hpx,view,{l:30,r:12,t:14,b:26}); P.clear();
      var cx=P.ctx, k;
      cx.strokeStyle='rgba(140,151,168,.35)'; cx.lineWidth=1;
      for(k=-GRID_EXT;k<=GRID_EXT+1e-9;k+=GRID_STEP){
        cx.beginPath(); cx.moveTo(P.X(k),P.Y(-GRID_EXT)); cx.lineTo(P.X(k),P.Y(GRID_EXT)); cx.stroke();
        cx.beginPath(); cx.moveTo(P.X(-GRID_EXT),P.Y(k)); cx.lineTo(P.X(GRID_EXT),P.Y(k)); cx.stroke();
      }
      var det=a*d-b*c;
      var s00=tf(0,0), s10=tf(1,0), s11=tf(1,1), s01=tf(0,1);
      cx.beginPath(); cx.moveTo(P.X(s00.x),P.Y(s00.y)); cx.lineTo(P.X(s10.x),P.Y(s10.y));
      cx.lineTo(P.X(s11.x),P.Y(s11.y)); cx.lineTo(P.X(s01.x),P.Y(s01.y)); cx.closePath();
      cx.fillStyle = det<0 ? 'rgba(200,144,42,.22)' : 'rgba(30,58,110,.18)';
      cx.fill();
      cx.strokeStyle = det<0 ? AMBER2 : INDIGO2; cx.lineWidth=1.4;
      for(k=-GRID_EXT;k<=GRID_EXT+1e-9;k+=GRID_STEP){
        var p1=tf(k,-GRID_EXT), p2=tf(k,GRID_EXT);
        cx.beginPath(); cx.moveTo(P.X(p1.x),P.Y(p1.y)); cx.lineTo(P.X(p2.x),P.Y(p2.y)); cx.stroke();
        var q1=tf(-GRID_EXT,k), q2=tf(GRID_EXT,k);
        cx.beginPath(); cx.moveTo(P.X(q1.x),P.Y(q1.y)); cx.lineTo(P.X(q2.x),P.Y(q2.y)); cx.stroke();
      }
      P.grid();
      arrow(cx,P.X(0),P.Y(0),P.X(a),P.Y(c),INDIGO,2.8);
      arrow(cx,P.X(0),P.Y(0),P.X(b),P.Y(d),AMBER2,2.8);
      document.getElementById('laMatDet').textContent=fmt(det,3);
      document.getElementById('laMatArea').textContent=fmt(Math.abs(det),3);
      updateDataView(det);
    }
    register(canvas,draw);
    var sa=document.getElementById('laMatA'), sb=document.getElementById('laMatB'),
        sc=document.getElementById('laMatC'), sd=document.getElementById('laMatD');
    function syncLabels(){
      document.getElementById('laMatAval').textContent=fmt(a,2);
      document.getElementById('laMatBval').textContent=fmt(b,2);
      document.getElementById('laMatCval').textContent=fmt(c,2);
      document.getElementById('laMatDval').textContent=fmt(d,2);
    }
    function upd(){ a=parseFloat(sa.value); b=parseFloat(sb.value); c=parseFloat(sc.value); d=parseFloat(sd.value); syncLabels(); redrawAll(); }
    [sa,sb,sc,sd].forEach(function(el){ el.addEventListener('input',upd); });
    upd();
    var PRESETS={ identity:[1,0,0,1], rot90:[0,-1,1,0], scale2:[2,0,0,2], shear:[1,1,0,1], reflect:[1,0,0,-1] };
    document.querySelectorAll('.radios button').forEach(function(btn){
      if(!btn.closest('.ex-controls')||!btn.closest('.ex-controls').querySelector('#laMatA')) return;
      btn.addEventListener('click',function(){
        btn.parentNode.querySelectorAll('button').forEach(function(x){x.classList.remove('on');});
        btn.classList.add('on');
        var p=PRESETS[btn.getAttribute('data-rule')]; if(!p) return;
        sa.value=p[0]; sb.value=p[1]; sc.value=p[2]; sd.value=p[3];
        upd();
      });
    });
  })();

  /* LINALG CH 4 — determinant as a signed area. Default u=(3,1), v=(1,2)
     (det = 5) — a fresh non-degenerate pair, distinct from CH 3's matrix
     so both explorers stay independently meaningful. Fill flips indigo →
     amber when det < 0, matching CH 3's own orientation-flip convention. */
  (function(){
    var canvas=document.getElementById('laDetCanvas'); if(!canvas) return;
    var ux=3, uy=1, vx=1, vy=2;
    var view={xmin:-3,xmax:8,ymin:-3,ymax:8};
    var dataBtn=document.getElementById('laDetDataBtn'), dataPanel=document.getElementById('laDetDataPanel'),
        dataDesc=document.getElementById('laDetDataDesc'), dataRows=document.getElementById('laDetDataRows');
    wireDataToggle(dataBtn,dataPanel);
    function updateDataView(det){
      if(!dataDesc) return;
      dataDesc.textContent='u = ('+fmt(ux,2)+', '+fmt(uy,2)+'), v = ('+fmt(vx,2)+', '+fmt(vy,2)+'). det([u v]) = uₓvy − uyvx = '+fmt(det,3)+'. |det| = area of the parallelogram spanned by u and v = '+fmt(Math.abs(det),3)+'. '+(Math.abs(det)<1e-9?'u and v are linearly dependent (parallel, or one is the zero vector) — the matrix [u v] is singular (not invertible).':'The matrix [u v] is invertible (det ≠ 0).');
      renderDataRows(dataRows,[
        ['u','('+fmt(ux,2)+', '+fmt(uy,2)+')'],
        ['v','('+fmt(vx,2)+', '+fmt(vy,2)+')'],
        ['det = uₓvy − uyvx',fmt(ux*vy-uy*vx,3)],
        ['area = |det|',fmt(Math.abs(ux*vy-uy*vx),3)],
        ['invertible?', Math.abs(ux*vy-uy*vx)<1e-9 ? 'no (singular)' : 'yes']
      ]);
    }
    function draw(ctx,w,h){
      var P=new Plot(ctx,w,h,view,{l:30,r:12,t:14,b:26}); P.clear(); P.grid();
      var det=ux*vy-uy*vx, c=P.ctx;
      c.beginPath(); c.moveTo(P.X(0),P.Y(0)); c.lineTo(P.X(ux),P.Y(uy));
      c.lineTo(P.X(ux+vx),P.Y(uy+vy)); c.lineTo(P.X(vx),P.Y(vy)); c.closePath();
      c.fillStyle = det<0 ? 'rgba(200,144,42,.25)' : 'rgba(30,58,110,.20)';
      c.fill();
      arrow(c,P.X(0),P.Y(0),P.X(ux),P.Y(uy),INDIGO,2.8);
      arrow(c,P.X(0),P.Y(0),P.X(vx),P.Y(vy),AMBER2,2.8);
      document.getElementById('laDetVal').textContent=fmt(det,3);
      document.getElementById('laDetArea').textContent=fmt(Math.abs(det),3);
      document.getElementById('laDetInv').textContent = Math.abs(det)<1e-9 ? 'singular' : 'invertible';
      updateDataView(det);
    }
    register(canvas,draw);
    var su=document.getElementById('laDetUx'), suy=document.getElementById('laDetUy'),
        sv=document.getElementById('laDetVx'), svy=document.getElementById('laDetVy');
    function upd(){
      ux=parseFloat(su.value); uy=parseFloat(suy.value); vx=parseFloat(sv.value); vy=parseFloat(svy.value);
      document.getElementById('laDetUxval').textContent=fmt(ux,2);
      document.getElementById('laDetUyval').textContent=fmt(uy,2);
      document.getElementById('laDetVxval').textContent=fmt(vx,2);
      document.getElementById('laDetVyval').textContent=fmt(vy,2);
      redrawAll();
    }
    [su,suy,sv,svy].forEach(function(el){ el.addEventListener('input',upd); });
    upd();
  })();

  /* ══════════════════════════════════════════════════════════════════
     LINEAR ALGEBRA — chapters 5-8 (vector spaces, eigenvalues, linear
     transformations, orthogonality/least squares). Same shared Plot/
     register/redrawAll/fmt/wireDataToggle/renderDataRows/arrow helpers.
     ══════════════════════════════════════════════════════════════════ */

  /* LA CH 5 — span of two vectors in R^2, u fixed, v's angle adjustable */
  (function(){
    var canvas=document.getElementById('laSpanCanvas'); if(!canvas) return;
    var view={xmin:-6,xmax:6,ymin:-6,ymax:6};
    var u=[2,0];
    var angleDeg=60, c1=1, c2=1;
    var dataBtn=document.getElementById('laSpanDataBtn'), dataPanel=document.getElementById('laSpanDataPanel'),
        dataDesc=document.getElementById('laSpanDataDesc'), dataRows=document.getElementById('laSpanDataRows');
    wireDataToggle(dataBtn,dataPanel);
    function vOf(){
      var rad=angleDeg*Math.PI/180, len=Math.sqrt(u[0]*u[0]+u[1]*u[1]);
      return [len*Math.cos(rad), len*Math.sin(rad)];
    }
    function updateDataView(v,result,dependent){
      if(!dataDesc) return;
      dataDesc.textContent='u = ⟨'+fmt(u[0],2)+', '+fmt(u[1],2)+'⟩, v = ⟨'+fmt(v[0],2)+', '+fmt(v[1],2)+'⟩. c₁u + c₂v = ⟨'+fmt(result[0],2)+', '+fmt(result[1],2)+'⟩. '+(dependent ? 'u and v are parallel here — linearly dependent, span is just a line.' : 'u and v are linearly independent here — span is all of ℝ².');
      renderDataRows(dataRows,[
        ['u','⟨'+fmt(u[0],2)+', '+fmt(u[1],2)+'⟩'],
        ['v','⟨'+fmt(v[0],2)+', '+fmt(v[1],2)+'⟩'],
        ['c₁u + c₂v','⟨'+fmt(result[0],2)+', '+fmt(result[1],2)+'⟩']
      ]);
    }
    function draw(ctx,w,h){
      var P=new Plot(ctx,w,h,view,{l:30,r:12,t:14,b:26}); P.clear(); P.grid();
      var c=P.ctx, v=vOf();
      var det=u[0]*v[1]-u[1]*v[0];
      var dependent=Math.abs(det)<1e-6;
      // faint dots sampling span(u,v)
      c.fillStyle='rgba(86,97,115,0.28)';
      for(var i=0;i<180;i++){
        var rc1=(Math.random()*6-3), rc2=(Math.random()*6-3);
        var px=rc1*u[0]+rc2*v[0], py=rc1*u[1]+rc2*v[1];
        if(px<view.xmin||px>view.xmax||py<view.ymin||py>view.ymax) continue;
        c.beginPath(); c.arc(P.X(px),P.Y(py),1.4,0,2*Math.PI); c.fill();
      }
      arrow(c,P.X(0),P.Y(0),P.X(u[0]),P.Y(u[1]),INDIGO,2.6);
      arrow(c,P.X(0),P.Y(0),P.X(v[0]),P.Y(v[1]),AMBER2,2.6);
      var result=[c1*u[0]+c2*v[0], c1*u[1]+c2*v[1]];
      P.dot(result[0],result[1],INK,5);
      document.getElementById('laSpanResult').textContent='⟨'+fmt(result[0],2)+', '+fmt(result[1],2)+'⟩';
      document.getElementById('laSpanStatus').textContent = dependent ? 'only a line' : 'all of ℝ²';
      updateDataView(v,result,dependent);
    }
    register(canvas,draw);
    var sAngle=document.getElementById('laSpanVx'), sC1=document.getElementById('laSpanC1'), sC2=document.getElementById('laSpanC2');
    function upd(){
      angleDeg=parseFloat(sAngle.value); c1=parseFloat(sC1.value); c2=parseFloat(sC2.value);
      document.getElementById('laSpanVxVal').textContent=fmt(angleDeg,0)+'°';
      document.getElementById('laSpanC1Val').textContent=fmt(c1,2);
      document.getElementById('laSpanC2Val').textContent=fmt(c2,2);
      redrawAll();
    }
    sAngle.addEventListener('input',upd); sC1.addEventListener('input',upd); sC2.addEventListener('input',upd); upd();
  })();

  /* LA CH 6 — eigenvectors: unit circle vs its image ellipse under A */
  (function(){
    var canvas=document.getElementById('laEigCanvas'); if(!canvas) return;
    var a=4, b=1, cM=2, d=3;
    var dataBtn=document.getElementById('laEigDataBtn'), dataPanel=document.getElementById('laEigDataPanel'),
        dataDesc=document.getElementById('laEigDataDesc'), dataRows=document.getElementById('laEigDataRows');
    wireDataToggle(dataBtn,dataPanel);
    function eigen(){
      var T=a+d, D=a*d-b*cM, disc=T*T-4*D;
      if(disc<0) return null;
      var s=Math.sqrt(disc), l1=(T+s)/2, l2=(T-s)/2;
      function vecFor(l){
        if(Math.abs(b)>1e-9) return [b, l-a];
        if(Math.abs(cM)>1e-9) return [l-d, cM];
        return Math.abs(l-a)<1e-6 ? [1,0] : [0,1];
      }
      return {l1:l1,l2:l2,v1:vecFor(l1),v2:vecFor(l2)};
    }
    function updateDataView(eig){
      if(!dataDesc) return;
      if(!eig){ dataDesc.textContent='A = [['+fmt(a,2)+', '+fmt(b,2)+'], ['+fmt(cM,2)+', '+fmt(d,2)+']]. The characteristic equation has no real roots here (complex eigenvalues) — no real eigenvector direction exists.'; renderDataRows(dataRows,[['λ','complex — no real eigenvector']]); return; }
      dataDesc.textContent='A = [['+fmt(a,2)+', '+fmt(b,2)+'], ['+fmt(cM,2)+', '+fmt(d,2)+']]. λ₁ = '+fmt(eig.l1,3)+' with eigenvector ⟨'+fmt(eig.v1[0],2)+', '+fmt(eig.v1[1],2)+'⟩; λ₂ = '+fmt(eig.l2,3)+' with eigenvector ⟨'+fmt(eig.v2[0],2)+', '+fmt(eig.v2[1],2)+'⟩.';
      renderDataRows(dataRows,[
        ['λ₁',fmt(eig.l1,3),'⟨'+fmt(eig.v1[0],2)+', '+fmt(eig.v1[1],2)+'⟩'],
        ['λ₂',fmt(eig.l2,3),'⟨'+fmt(eig.v2[0],2)+', '+fmt(eig.v2[1],2)+'⟩']
      ]);
    }
    function draw(ctx,w,h){
      var view={xmin:-3,xmax:3,ymin:-3,ymax:3};
      var P=new Plot(ctx,w,h,view,{l:26,r:10,t:10,b:20}); P.clear();
      var c=P.ctx, N=120, i, ang, px, py;
      c.beginPath();
      for(i=0;i<=N;i++){ ang=2*Math.PI*i/N; px=P.X(Math.cos(ang)); py=P.Y(Math.sin(ang)); if(i===0) c.moveTo(px,py); else c.lineTo(px,py); }
      c.closePath(); c.strokeStyle='#B8C3D6'; c.lineWidth=1.4; c.stroke();
      c.beginPath();
      for(i=0;i<=N;i++){
        ang=2*Math.PI*i/N;
        var ux=Math.cos(ang), uy=Math.sin(ang);
        var ix=a*ux+b*uy, iy=cM*ux+d*uy;
        px=P.X(ix); py=P.Y(iy);
        if(i===0) c.moveTo(px,py); else c.lineTo(px,py);
      }
      c.closePath(); c.strokeStyle=INDIGO; c.lineWidth=2.4; c.stroke();
      var eig=eigen();
      if(eig){
        [[eig.v1,AMBER2],[eig.v2,'#0e9f8f']].forEach(function(pair){
          var vec=pair[0], color=pair[1];
          var mag=Math.sqrt(vec[0]*vec[0]+vec[1]*vec[1]);
          if(mag<1e-9) return;
          var ux=vec[0]/mag, uy=vec[1]/mag, L=2.8;
          P.segment(-L*ux,-L*uy,L*ux,L*uy,color,2,[6,4]);
        });
        document.getElementById('laEigL1').textContent=fmt(eig.l1,3);
        document.getElementById('laEigL2').textContent=fmt(eig.l2,3);
      } else {
        document.getElementById('laEigL1').textContent='complex';
        document.getElementById('laEigL2').textContent='complex';
      }
      updateDataView(eig);
    }
    register(canvas,draw);
    var sA=document.getElementById('laEigA'), sB=document.getElementById('laEigB'), sC=document.getElementById('laEigC'), sD=document.getElementById('laEigD');
    function upd(){
      a=parseFloat(sA.value); b=parseFloat(sB.value); cM=parseFloat(sC.value); d=parseFloat(sD.value);
      document.getElementById('laEigAval').textContent=fmt(a,2);
      document.getElementById('laEigBval').textContent=fmt(b,2);
      document.getElementById('laEigCval').textContent=fmt(cM,2);
      document.getElementById('laEigDval').textContent=fmt(d,2);
      redrawAll();
    }
    [sA,sB,sC,sD].forEach(function(el){ el.addEventListener('input',upd); });
    upd();
  })();

  /* LA CH 8 — least squares: candidate line vs the four data points */
  (function(){
    var canvas=document.getElementById('laLSQCanvas'); if(!canvas) return;
    var points=[[1,1],[2,3],[3,4],[4,6]];
    var view={xmin:0,xmax:5,ymin:-1,ymax:8};
    var m=1, b=0;
    var dataBtn=document.getElementById('laLSQDataBtn'), dataPanel=document.getElementById('laLSQDataPanel'),
        dataDesc=document.getElementById('laLSQDataDesc'), dataRows=document.getElementById('laLSQDataRows');
    wireDataToggle(dataBtn,dataPanel);
    function sse(){
      var s=0;
      points.forEach(function(p){ var r=p[1]-(m*p[0]+b); s+=r*r; });
      return s;
    }
    function updateDataView(){
      if(!dataDesc) return;
      dataDesc.textContent='Candidate line y = '+fmt(m,2)+'x + '+fmt(b,2)+'. Sum of squared residuals = '+fmt(sse(),3)+'. The least-squares optimum is m = 1.6, b = -0.5 (Worked example 8.B).';
      var rows=[];
      points.forEach(function(p){ var pred=m*p[0]+b, res=p[1]-pred; rows.push([fmt(p[0],0),fmt(p[1],0),fmt(pred,2),fmt(res,2)]); });
      renderDataRows(dataRows,rows);
    }
    function draw(ctx,w,h){
      var P=new Plot(ctx,w,h,view,{l:28,r:12,t:12,b:24}); P.clear(); P.grid();
      P.curve(function(x){ return m*x+b; }, INDIGO, 2.4);
      points.forEach(function(p){
        var pred=m*p[0]+b;
        P.segment(p[0],p[1],p[0],pred,AMBER2,2,[4,3]);
        P.dot(p[0],p[1],INK,5);
      });
      var s=sse();
      document.getElementById('laLSQSSE').textContent=fmt(s,3);
      updateDataView();
    }
    register(canvas,draw);
    var sM=document.getElementById('laLSQm'), sB2=document.getElementById('laLSQb');
    function upd(){
      m=parseInt(sM.value,10)/10; b=parseInt(sB2.value,10)/10;
      document.getElementById('laLSQmVal').textContent=fmt(m,1);
      document.getElementById('laLSQbVal').textContent=fmt(b,1);
      redrawAll();
    }
    sM.addEventListener('input',upd); sB2.addEventListener('input',upd); upd();
  })();
})(window.CSExplorerKit);
