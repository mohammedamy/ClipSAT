/* Canvas explorers for the mvc track (Plan 5 Phase 5.015, ADR 0039).
   Moved verbatim out of modules/02-core-app.js. build.js minifies this file to
   public/js/ex/mvc.js, which base.njk loads only on the mvc page, right after
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

  /* ═══════════════════ MVC TRACK EXPLORERS (Pillar 2 MVP —
     retrofit canvas explorers into Multivariable Calculus, which launched
     with 0 explorers; see AUDIT.md's density table / the 24-month roadmap's
     "3D surface/gradient view for MVC" line item). Each f(x,y) below is
     this track's own — not calculus's partialCanvas/doubleCanvas functions
     — since mvc/ is its own page, but every explorer reuses the exact
     numbers already worked out in its own chapter's text. */

  /* MVC CH 1 — slicing a surface (partial derivative), 2D */
  (function(){
    var canvas=document.getElementById('mvcSliceCanvas'); if(!canvas) return;
    var c=0, x0=1;
    function f(x,y){ return 5-0.3*x*x-0.2*y*y+0.1*x*y; }
    function fx(x,y){ return -0.6*x+0.1*y; }
    function g(x){ return f(x,c); }
    var view={xmin:-4,xmax:4,ymin:-3,ymax:6};
    var dataBtn=document.getElementById('mvcSliceDataBtn'), dataPanel=document.getElementById('mvcSliceDataPanel'),
        dataDesc=document.getElementById('mvcSliceDataDesc'), dataRows=document.getElementById('mvcSliceDataRows');
    wireDataToggle(dataBtn,dataPanel);
    function updateDataView(m,y0,tangent){
      if(!dataDesc) return;
      dataDesc.textContent='f(x, y) = 5 − 0.3x² − 0.2y² + 0.1xy, sliced at y = c = '+fmt(c,1)+', giving g(x) = f(x, c). At x₀ = '+x0+', g(x₀) = '+fmt(y0,3)+', partial derivative fₓ(x₀, c) = '+fmt(m,3)+'.';
      var N=9, rows=[];
      for(var i=0;i<N;i++){ var x=view.xmin+(view.xmax-view.xmin)*i/(N-1); rows.push([fmt(x),fmt(g(x)),fmt(tangent(x))]); }
      renderDataRows(dataRows,rows);
    }
    function draw(ctx,w,h){
      var P=new Plot(ctx,w,h,view,{l:32,r:12,t:14,b:26}); P.clear(); P.grid();
      P.curve(g,INDIGO,2.8);
      var m=fx(x0,c), y0=g(x0), Lh=1.6;
      var tangent=function(x){ return y0+m*(x-x0); };
      P.segment(x0-Lh,y0-m*Lh,x0+Lh,y0+m*Lh,AMBER2,2.2);
      P.dot(x0,y0,INK,5);
      document.getElementById('mvcSliceF').textContent=fmt(g(x0),3);
      document.getElementById('mvcSliceFx').textContent=fmt(m,3);
      updateDataView(m,y0,tangent);
    }
    register(canvas,draw);
    var s=document.getElementById('mvcSliceC');
    function upd(){ c=parseFloat(s.value); document.getElementById('mvcSliceCval').textContent=fmt(c,1); redrawAll(); }
    s.addEventListener('input',upd); upd();
  })();

  /* MVC CH 1 — 3D companion: the full surface, the slicing plane at y = c,
     and the tangent line/point — same shared ClipSAT3D helper calculus's
     partial-derivatives explorer uses (Pillar 2 scale-phase pattern).
     domain is symmetric about 0 (both x,y run -4..4), so — unlike a
     shifted-domain surface — the vertex's own local z-coordinate after
     rotateX IS its y-domain value directly (no extra negation): a marker
     placed at world Z = k must line up with the surface vertex whose own
     buffer z already equals k, or the point floats off the rendered
     surface instead of sitting on it. */
  (function(){
    var btn=document.getElementById('mvcSlice3dBtn'); if(!btn) return;
    var wrap=document.getElementById('mvcSlice3dWrap');
    var hint=document.getElementById('mvcSlice3dHint');
    var slider=document.getElementById('mvcSliceC');
    var built=false, H=null, tangentLine, pointMesh, planeMesh;
    var x0=1;
    function f(x,y){ return 5-0.3*x*x-0.2*y*y+0.1*x*y; }
    function fx(x,y){ return -0.6*x+0.1*y; }

    function buildSurfaceGeometry(T){
      var N=44, xmin=-4,xmax=4, ymin=-4,ymax=4;
      var geo=new T.PlaneGeometry(xmax-xmin, ymax-ymin, N, N);
      geo.rotateX(-Math.PI/2);
      var pos=geo.attributes.position;
      for(var i=0;i<pos.count;i++){
        var x=pos.getX(i), y=pos.getZ(i); // symmetric domain, shift=0 — see comment above
        pos.setY(i, f(x,y));
      }
      pos.needsUpdate=true; geo.computeVertexNormals();
      return geo;
    }
    function build(mods){
      var T=mods.THREE, COLOR=ClipSAT3D.COLOR;
      H=ClipSAT3D.setup(wrap, mods, {az:0.9, el:0.55, dist:11, target:new T.Vector3(0,2,0),
        axisSegs:[[[-4,0,0],[4,0,0]],[[0,-3,0],[0,6,0]],[[0,0,-4],[0,0,4]]]});
      var surfGeo=buildSurfaceGeometry(T);
      var surfMat=new T.MeshLambertMaterial({color:COLOR.INDIGO, transparent:true, opacity:0.55, side:T.DoubleSide});
      H.scene.add(new T.Mesh(surfGeo,surfMat));
      var wireMat=new T.MeshBasicMaterial({color:COLOR.INDIGO, wireframe:true, transparent:true, opacity:0.25});
      H.scene.add(new T.Mesh(surfGeo,wireMat));
      var planeGeo=new T.PlaneGeometry(8,7);
      var planeMat=new T.MeshBasicMaterial({color:COLOR.AMBER, transparent:true, opacity:0.22, side:T.DoubleSide});
      planeMesh=new T.Mesh(planeGeo,planeMat);
      planeMesh.rotation.x=Math.PI/2;
      H.scene.add(planeMesh);
      var tanGeo=new T.BufferGeometry();
      tanGeo.setAttribute('position', new T.BufferAttribute(new Float32Array(6),3));
      var tanMat=new T.LineBasicMaterial({color:COLOR.AMBER, linewidth:2});
      tangentLine=new T.Line(tanGeo,tanMat);
      H.scene.add(tangentLine);
      pointMesh=new T.Mesh(new T.SphereGeometry(0.09,16,16), new T.MeshBasicMaterial({color:COLOR.INK}));
      H.scene.add(pointMesh);
      update();
      H.render();
    }
    function update(){
      if(!H) return;
      var c=parseFloat(slider.value);
      planeMesh.position.set(0, 2, c);
      var m=fx(x0,c), y0=f(x0,c), Lh=1.6;
      var pos=tangentLine.geometry.attributes.position;
      pos.setXYZ(0, x0-Lh, y0-m*Lh, c);
      pos.setXYZ(1, x0+Lh, y0+m*Lh, c);
      pos.needsUpdate=true;
      tangentLine.geometry.computeBoundingSphere();
      pointMesh.position.set(x0, y0, c);
    }
    function open3d(){
      wrap.hidden=false; hint.hidden=false;
      btn.setAttribute('aria-expanded','true');
      btn.textContent='🧊 Hide 3D surface';
      if(built){ update(); H.render(); return; }
      built=true;
      btn.disabled=true; btn.textContent='Loading 3D…';
      ClipSAT3D.load().then(function(mods){
        btn.disabled=false; btn.textContent='🧊 Hide 3D surface';
        build(mods);
      }).catch(function(){
        built=false;
        btn.disabled=false; btn.textContent='🧊 View the full surface in 3D';
        wrap.hidden=true; hint.hidden=true;
        btn.setAttribute('aria-expanded','false');
        wrap.textContent='3D view failed to load — check your connection and try again.';
        wrap.hidden=false;
      });
    }
    function close3d(){
      wrap.hidden=true; hint.hidden=true;
      btn.setAttribute('aria-expanded','false');
      btn.textContent='🧊 View the full surface in 3D';
    }
    btn.addEventListener('click',function(){ if(wrap.hidden) open3d(); else close3d(); });
    slider.addEventListener('input',function(){ if(built){ update(); H.render(); } });
  })();

  /* MVC CH 2 — gradient & steepest ascent: heatmap of f, a fixed gradient
     arrow, and a rotating unit-direction arrow. Reuses Worked example 2.B's
     exact numbers (f = x²+xy at (1,2), ∇f = ⟨4,1⟩, max rate √17). */
  (function(){
    var canvas=document.getElementById('mvcGradCanvas'); if(!canvas) return;
    var ax=1, ay=2;
    function f(x,y){ return x*x+x*y; }
    var gx=2*ax+ay, gy=ax; // ∇f(1,2) = ⟨2x+y, x⟩ = ⟨4,1⟩
    var theta=0;
    var view={xmin:-1,xmax:6,ymin:-1,ymax:6};
    var dataBtn=document.getElementById('mvcGradDataBtn'), dataPanel=document.getElementById('mvcGradDataPanel'),
        dataDesc=document.getElementById('mvcGradDataDesc'), dataRows=document.getElementById('mvcGradDataRows');
    wireDataToggle(dataBtn,dataPanel);
    function du(t){ return gx*Math.cos(t)+gy*Math.sin(t); }
    function updateDataView(){
      if(!dataDesc) return;
      dataDesc.textContent='f(x, y) = x² + xy at (1, 2): ∇f = ⟨4, 1⟩. Direction u = ⟨cos θ, sin θ⟩ at θ = '+fmt(theta*180/Math.PI,0)+'°. Directional derivative D_u f(1,2) = ∇f·u = '+fmt(du(theta),3)+'. Maximum possible rate in any direction = |∇f| = √17 ≈ 4.123, attained when u points along ∇f.';
      var rows=[], degs=[0,45,90,135,180,225,270,315];
      for(var i=0;i<degs.length;i++){ var t=degs[i]*Math.PI/180; rows.push([degs[i],'('+fmt(Math.cos(t),2)+', '+fmt(Math.sin(t),2)+')',fmt(du(t),3)]); }
      renderDataRows(dataRows,rows);
    }
    function draw(ctx,w,h){
      var P=new Plot(ctx,w,h,view,{l:30,r:12,t:14,b:26}); P.clear();
      var res=28, dxp=(view.xmax-view.xmin)/res, dyp=(view.ymax-view.ymin)/res, i,j;
      var fmin=Infinity, fmax=-Infinity, grid=[];
      for(i=0;i<res;i++){ grid[i]=[]; for(j=0;j<res;j++){
        var vx=view.xmin+(i+0.5)*dxp, vy=view.ymin+(j+0.5)*dyp, val=f(vx,vy);
        grid[i][j]=val; if(val<fmin)fmin=val; if(val>fmax)fmax=val;
      }}
      var c=P.ctx;
      for(i=0;i<res;i++){ for(j=0;j<res;j++){
        var norm=(grid[i][j]-fmin)/((fmax-fmin)||1);
        c.fillStyle='rgba(30,58,110,'+(0.06+0.45*norm).toFixed(3)+')';
        var px=P.X(view.xmin+i*dxp), py=P.Y(view.ymin+(j+1)*dyp);
        var pw=P.X(view.xmin+(i+1)*dxp)-px, ph=P.Y(view.ymin+j*dyp)-py;
        c.fillRect(px,py,pw,ph);
      }}
      P.grid();
      P.dot(ax,ay,INK,5.5);
      var uLen=1.3;
      arrow(c,P.X(ax),P.Y(ay),P.X(ax+Math.cos(theta)*uLen),P.Y(ay+Math.sin(theta)*uLen),INDIGO2,2.6);
      arrow(c,P.X(ax),P.Y(ay),P.X(ax+gx),P.Y(ay+gy),AMBER2,2.8);
      document.getElementById('mvcGradDu').textContent=fmt(du(theta),3);
      updateDataView();
    }
    register(canvas,draw);
    var s=document.getElementById('mvcGradTheta');
    function upd(){ theta=parseInt(s.value,10)*Math.PI/180; document.getElementById('mvcGradThetaVal').textContent=s.value+'°'; redrawAll(); }
    s.addEventListener('input',upd); upd();
  })();

  /* MVC CH 3 — classifying critical points (2nd derivative test), 2D.
     Reuses Worked example 3.A's exact f(x,y) = x³ − 3x + y², whose critical
     points (1,0) [local min] and (−1,0) [saddle] are marked permanently;
     the slider-controlled ring is a movable test point. */
  (function(){
    var canvas=document.getElementById('mvcCritCanvas'); if(!canvas) return;
    var a=1, b=0;
    function f(x,y){ return x*x*x-3*x+y*y; }
    function fx(x,y){ return 3*x*x-3; }
    function fy(x,y){ return 2*y; }
    function Dval(x){ return 12*x; } // f_xx f_yy − f_xy² = (6x)(2) − 0² = 12x
    var view={xmin:-2.2,xmax:2.2,ymin:-2.2,ymax:2.2};
    var dataBtn=document.getElementById('mvcCritDataBtn'), dataPanel=document.getElementById('mvcCritDataPanel'),
        dataDesc=document.getElementById('mvcCritDataDesc'), dataRows=document.getElementById('mvcCritDataRows');
    wireDataToggle(dataBtn,dataPanel);
    function classify(x,y){
      if(Math.abs(fx(x,y))>1e-6 || Math.abs(fy(x,y))>1e-6) return 'Not a critical point (∇f ≠ 0)';
      var D=Dval(x), fxxv=6*x;
      if(D>1e-9) return fxxv>0 ? 'Local minimum' : 'Local maximum';
      if(D<-1e-9) return 'Saddle point';
      return 'Inconclusive (D = 0)';
    }
    function updateDataView(){
      if(!dataDesc) return;
      var type=classify(a,b);
      dataDesc.textContent='f(x, y) = x³ − 3x + y² at (a, b) = ('+fmt(a,2)+', '+fmt(b,2)+'): f_x = '+fmt(fx(a,b),3)+', f_y = '+fmt(fy(a,b),3)+', D = '+fmt(Dval(a),2)+'. '+type+'.';
      renderDataRows(dataRows,[
        ['f_x(a,b)',fmt(fx(a,b),3)],
        ['f_y(a,b)',fmt(fy(a,b),3)],
        ['D = f_xx f_yy − f_xy²',fmt(Dval(a),2)],
        ['classification',type]
      ]);
    }
    function draw(ctx,w,h){
      var P=new Plot(ctx,w,h,view,{l:30,r:12,t:14,b:26}); P.clear();
      var res=26, dxp=(view.xmax-view.xmin)/res, dyp=(view.ymax-view.ymin)/res, i,j;
      var fmin=Infinity, fmax=-Infinity, grid=[];
      for(i=0;i<res;i++){ grid[i]=[]; for(j=0;j<res;j++){
        var vx=view.xmin+(i+0.5)*dxp, vy=view.ymin+(j+0.5)*dyp, val=f(vx,vy);
        grid[i][j]=val; if(val<fmin)fmin=val; if(val>fmax)fmax=val;
      }}
      var c=P.ctx;
      for(i=0;i<res;i++){ for(j=0;j<res;j++){
        var norm=(grid[i][j]-fmin)/((fmax-fmin)||1);
        c.fillStyle='rgba(30,58,110,'+(0.06+0.45*norm).toFixed(3)+')';
        var px=P.X(view.xmin+i*dxp), py=P.Y(view.ymin+(j+1)*dyp);
        var pw=P.X(view.xmin+(i+1)*dxp)-px, ph=P.Y(view.ymin+j*dyp)-py;
        c.fillRect(px,py,pw,ph);
      }}
      P.grid();
      P.dot(1,0,INDIGO,5.5);
      P.dot(-1,0,AMBER2,5.5);
      P.ring(a,b,INK,6);
      document.getElementById('mvcCritFx').textContent=fmt(fx(a,b),3);
      document.getElementById('mvcCritFy').textContent=fmt(fy(a,b),3);
      document.getElementById('mvcCritD').textContent=fmt(Dval(a),2);
      document.getElementById('mvcCritType').textContent=classify(a,b);
      updateDataView();
    }
    register(canvas,draw);
    var sa=document.getElementById('mvcCritA'), sb=document.getElementById('mvcCritB');
    function upd(){
      a=parseFloat(sa.value); b=parseFloat(sb.value);
      document.getElementById('mvcCritAval').textContent=fmt(a,2);
      document.getElementById('mvcCritBval').textContent=fmt(b,2);
      redrawAll();
    }
    sa.addEventListener('input',upd); sb.addEventListener('input',upd); upd();
  })();

  /* MVC CH 3 — 3D companion: the same saddle/bowl surface, its two named
     critical points, and the movable test point. Symmetric domain
     (shift=0) — same no-negation convention as CH 1's 3D companion above. */
  (function(){
    var btn=document.getElementById('mvcCrit3dBtn'); if(!btn) return;
    var wrap=document.getElementById('mvcCrit3dWrap');
    var hint=document.getElementById('mvcCrit3dHint');
    var sa=document.getElementById('mvcCritA'), sb=document.getElementById('mvcCritB');
    var built=false, H=null, testMesh;
    function f(x,y){ return x*x*x-3*x+y*y; }
    function buildSurfaceGeometry(T){
      var N=44, xmin=-2.2,xmax=2.2, ymin=-2.2,ymax=2.2;
      var geo=new T.PlaneGeometry(xmax-xmin, ymax-ymin, N, N);
      geo.rotateX(-Math.PI/2);
      var pos=geo.attributes.position;
      for(var i=0;i<pos.count;i++){ var x=pos.getX(i), y=pos.getZ(i); pos.setY(i, f(x,y)); }
      pos.needsUpdate=true; geo.computeVertexNormals();
      return geo;
    }
    function build(mods){
      var T=mods.THREE, COLOR=ClipSAT3D.COLOR;
      H=ClipSAT3D.setup(wrap, mods, {az:0.85, el:0.5, dist:9, target:new T.Vector3(0,0,0),
        axisSegs:[[[-2.5,0,0],[2.5,0,0]],[[0,-2.5,0],[0,6.5,0]],[[0,0,-2.5],[0,0,2.5]]]});
      var surfGeo=buildSurfaceGeometry(T);
      var surfMat=new T.MeshLambertMaterial({color:COLOR.INDIGO, transparent:true, opacity:0.55, side:T.DoubleSide});
      H.scene.add(new T.Mesh(surfGeo,surfMat));
      var wireMat=new T.MeshBasicMaterial({color:COLOR.INDIGO, wireframe:true, transparent:true, opacity:0.22});
      H.scene.add(new T.Mesh(surfGeo,wireMat));
      var minMesh=new T.Mesh(new T.SphereGeometry(0.09,16,16), new T.MeshBasicMaterial({color:COLOR.INDIGO}));
      minMesh.position.set(1,f(1,0),0); H.scene.add(minMesh);
      var saddleMesh=new T.Mesh(new T.SphereGeometry(0.09,16,16), new T.MeshBasicMaterial({color:COLOR.AMBER}));
      saddleMesh.position.set(-1,f(-1,0),0); H.scene.add(saddleMesh);
      testMesh=new T.Mesh(new T.SphereGeometry(0.1,16,16), new T.MeshBasicMaterial({color:COLOR.INK}));
      H.scene.add(testMesh);
      update();
      H.render();
    }
    function update(){
      if(!H) return;
      var a=parseFloat(sa.value), b=parseFloat(sb.value);
      testMesh.position.set(a, f(a,b), b);
    }
    function open3d(){
      wrap.hidden=false; hint.hidden=false;
      btn.setAttribute('aria-expanded','true');
      btn.textContent='🧊 Hide 3D surface';
      if(built){ update(); H.render(); return; }
      built=true;
      btn.disabled=true; btn.textContent='Loading 3D…';
      ClipSAT3D.load().then(function(mods){
        btn.disabled=false; btn.textContent='🧊 Hide 3D surface';
        build(mods);
      }).catch(function(){
        built=false;
        btn.disabled=false; btn.textContent='🧊 View the surface in 3D';
        wrap.hidden=true; hint.hidden=true;
        btn.setAttribute('aria-expanded','false');
        wrap.textContent='3D view failed to load — check your connection and try again.';
        wrap.hidden=false;
      });
    }
    function close3d(){
      wrap.hidden=true; hint.hidden=true;
      btn.setAttribute('aria-expanded','false');
      btn.textContent='🧊 View the surface in 3D';
    }
    btn.addEventListener('click',function(){ if(wrap.hidden) open3d(); else close3d(); });
    sa.addEventListener('input',function(){ if(built){ update(); H.render(); } });
    sb.addEventListener('input',function(){ if(built){ update(); H.render(); } });
  })();

  /* MVC CH 4 — double Riemann sum over a rectangle (heatmap grid), 2D.
     Reuses Worked example 4.A's exact f(x,y) = x²+y over [0,2]×[0,1],
     whose exact value 11/3 the sum converges to as n grows. */
  (function(){
    var canvas=document.getElementById('mvcDblCanvas'); if(!canvas) return;
    var n=4, A=2, B=1, fmax=5, exact=11/3;
    function f(x,y){ return x*x+y; }
    var view={xmin:0,xmax:2,ymin:0,ymax:1};
    var dataBtn=document.getElementById('mvcDblDataBtn'), dataPanel=document.getElementById('mvcDblDataPanel'),
        dataDesc=document.getElementById('mvcDblDataDesc'), dataRows=document.getElementById('mvcDblDataRows');
    wireDataToggle(dataBtn,dataPanel);
    function updateDataView(sum){
      if(!dataDesc) return;
      var dx=A/n, dy=B/n;
      dataDesc.textContent='f(x, y) = x² + y over [0, 2]×[0, 1], partitioned into an '+n+'×'+n+' grid ('+(n*n)+' cells, each '+fmt(dx,3)+'×'+fmt(dy,3)+', sampled at its midpoint). Riemann sum ≈ '+fmt(sum,3)+'. Exact double integral = 11/3 ≈ '+fmt(exact,3)+' (error '+fmt(Math.abs(exact-sum),3)+').';
      renderDataRows(dataRows,[
        ['grid',n+' × '+n],
        ['cells',n*n],
        ['cell size',fmt(dx,3)+' × '+fmt(dy,3)],
        ['Riemann sum (approx)',fmt(sum,3)],
        ['exact value (11/3)',fmt(exact,3)],
        ['error',fmt(Math.abs(exact-sum),3)]
      ]);
    }
    function draw(ctx,w,h){
      var P=new Plot(ctx,w,h,view,{l:30,r:12,t:14,b:26}); P.clear();
      var dx=A/n, dy=B/n, sum=0, i, j, c=P.ctx;
      for(i=0;i<n;i++){ for(j=0;j<n;j++){
        var mx=(i+0.5)*dx, my=(j+0.5)*dy, val=f(mx,my); sum+=val*dx*dy;
        var al=0.10+0.55*(val/fmax);
        c.fillStyle='rgba(30,58,110,'+al.toFixed(3)+')';
        var px=P.X(i*dx), py=P.Y((j+1)*dy), pw=P.X((i+1)*dx)-px, ph=P.Y(j*dy)-py;
        c.fillRect(px,py,pw,ph);
      }}
      c.strokeStyle='rgba(255,255,255,.85)'; c.lineWidth=1;
      var k;
      for(k=0;k<=n;k++){
        var gx=P.X(k*dx); c.beginPath(); c.moveTo(gx,P.Y(0)); c.lineTo(gx,P.Y(B)); c.stroke();
        var gy=P.Y(k*dy); c.beginPath(); c.moveTo(P.X(0),gy); c.lineTo(P.X(A),gy); c.stroke();
      }
      document.getElementById('mvcDblCells').textContent=(n*n);
      document.getElementById('mvcDblApprox').textContent=fmt(sum,3);
      document.getElementById('mvcDblExact').textContent=fmt(exact,3);
      document.getElementById('mvcDblNlab').textContent=n;
      updateDataView(sum);
    }
    register(canvas,draw);
    var s=document.getElementById('mvcDblN');
    function upd(){ n=parseInt(s.value,10); redrawAll(); }
    s.addEventListener('input',upd); upd();
  })();

  /* MVC CH 4 — 3D companion: Riemann-sum boxes of height f(midpoint) =
     x²+y, plus the true curved surface z = x²+y they approach. Domain is
     [0,2]×[0,1] (not symmetric about 0), so — unlike CH 1/CH 3 above — the
     surface DOES need a shift term; it also needs the same no-negation
     fix, i.e. domain_y = pos.getZ(k) + shift, not shift − pos.getZ(k),
     or the surface ends up z-mirrored relative to where the boxes sit
     (verified by tracing a concrete vertex through PlaneGeometry's
     rotateX(-π/2): local y is untouched in sign by the "−" form, so a box
     at domain y = my lines up with the surface's OWN domain y = B−my
     instead of my, unless my = B/2 — see the task filed for calculus's
     existing partial3d/double3d, which use the un-fixed "−pos.getZ()"
     form). */
  (function(){
    var btn=document.getElementById('mvcDbl3dBtn'); if(!btn) return;
    var wrap=document.getElementById('mvcDbl3dWrap');
    var hint=document.getElementById('mvcDbl3dHint');
    var slider=document.getElementById('mvcDblN');
    var built=false, H=null, boxGroup=null;
    var A=2, B=1;
    function f(x,y){ return x*x+y; }
    function buildBoxes(T, COLOR, n){
      var group=new T.Group();
      var dx=A/n, dy=B/n, shrink=0.9;
      var boxGeo=new T.BoxGeometry(1,1,1);
      var edgesGeo=new T.EdgesGeometry(boxGeo);
      var fillMat=new T.MeshLambertMaterial({color:COLOR.INDIGO, transparent:true, opacity:0.5, side:T.DoubleSide});
      var lineMat=new T.LineBasicMaterial({color:COLOR.INDIGO, transparent:true, opacity:0.55});
      for(var i=0;i<n;i++){ for(var j=0;j<n;j++){
        var mx=(i+0.5)*dx, my=(j+0.5)*dy, val=f(mx,my);
        if(val<=0) continue;
        var mesh=new T.Mesh(boxGeo, fillMat);
        mesh.scale.set(dx*shrink, val, dy*shrink);
        mesh.position.set(mx-A/2, val/2, my-B/2); // center domain [0,2]×[0,1] at origin
        group.add(mesh);
        var edges=new T.LineSegments(edgesGeo, lineMat);
        edges.scale.copy(mesh.scale); edges.position.copy(mesh.position);
        group.add(edges);
      }}
      return group;
    }
    function build(mods){
      var T=mods.THREE, COLOR=ClipSAT3D.COLOR;
      H=ClipSAT3D.setup(wrap, mods, {az:0.7, el:0.5, dist:6.5, target:new T.Vector3(0,1.5,0),
        axisSegs:[[[-1.3,0,0],[1.3,0,0]],[[0,-0.2,0],[0,5,0]],[[0,0,-0.8],[0,0,0.8]]]});
      var N=30;
      var surfGeo=new T.PlaneGeometry(A,B,N,N);
      surfGeo.rotateX(-Math.PI/2);
      var pos=surfGeo.attributes.position;
      for(var k=0;k<pos.count;k++){ var x=pos.getX(k)+A/2, y=pos.getZ(k)+B/2; pos.setY(k, f(x,y)); }
      pos.needsUpdate=true; surfGeo.computeVertexNormals();
      var surfMat=new T.MeshLambertMaterial({color:COLOR.AMBER, transparent:true, opacity:0.35, side:T.DoubleSide});
      H.scene.add(new T.Mesh(surfGeo, surfMat));
      var wireMat=new T.MeshBasicMaterial({color:COLOR.AMBER, wireframe:true, transparent:true, opacity:0.3});
      H.scene.add(new T.Mesh(surfGeo, wireMat));
      update();
      H.render();
    }
    function update(){
      if(!H) return;
      var n=parseInt(slider.value,10);
      if(boxGroup){ H.scene.remove(boxGroup); }
      boxGroup=buildBoxes(H.THREE, ClipSAT3D.COLOR, n);
      H.scene.add(boxGroup);
    }
    function open3d(){
      wrap.hidden=false; hint.hidden=false;
      btn.setAttribute('aria-expanded','true');
      btn.textContent='🧊 Hide 3D view';
      if(built){ update(); H.render(); return; }
      built=true;
      btn.disabled=true; btn.textContent='Loading 3D…';
      ClipSAT3D.load().then(function(mods){
        btn.disabled=false; btn.textContent='🧊 Hide 3D view';
        build(mods);
      }).catch(function(){
        built=false;
        btn.disabled=false; btn.textContent='🧊 View the Riemann boxes in 3D';
        wrap.hidden=true; hint.hidden=true;
        btn.setAttribute('aria-expanded','false');
        wrap.textContent='3D view failed to load — check your connection and try again.';
        wrap.hidden=false;
      });
    }
    function close3d(){
      wrap.hidden=true; hint.hidden=true;
      btn.setAttribute('aria-expanded','false');
      btn.textContent='🧊 View the Riemann boxes in 3D';
    }
    btn.addEventListener('click',function(){ if(wrap.hidden) open3d(); else close3d(); });
    slider.addEventListener('input',function(){ if(built){ update(); H.render(); } });
  })();

  /* MVC CH 6 — linear vector field F = (ax+by, cx+dy), direction-arrow
     grid, plus the conservative-field test (b === c). */
  (function(){
    var canvas=document.getElementById('mvcVFCanvas'); if(!canvas) return;
    var view={xmin:-3.3,xmax:3.3,ymin:-3.3,ymax:3.3};
    var a=0, b=1, cQ=-1, d=0;
    var dataBtn=document.getElementById('mvcVFDataBtn'), dataPanel=document.getElementById('mvcVFDataPanel'),
        dataDesc=document.getElementById('mvcVFDataDesc'), dataRows=document.getElementById('mvcVFDataRows');
    wireDataToggle(dataBtn,dataPanel);
    function Pfn(x,y){ return a*x+b*y; }
    function Qfn(x,y){ return cQ*x+d*y; }
    function updateDataView(test,cons){
      if(!dataDesc) return;
      dataDesc.textContent='F(x,y) = ('+fmt(a,1)+'x + '+fmt(b,1)+'y, '+fmt(cQ,1)+'x + '+fmt(d,1)+'y). ∂P/∂y = '+fmt(b,1)+', ∂Q/∂x = '+fmt(cQ,1)+'. '+(cons ? 'Equal — F is conservative, with potential f(x,y) = '+fmt(a/2,2)+'x² + '+fmt(b,2)+'xy + '+fmt(d/2,2)+'y².' : 'Not equal ('+fmt(test,2)+' ≠ 0) — F is not conservative.');
      renderDataRows(dataRows,[
        ['∂P/∂y',fmt(b,2)],
        ['∂Q/∂x',fmt(cQ,2)],
        ['∂Q/∂x − ∂P/∂y',fmt(test,3)],
        ['conservative?', cons ? 'yes' : 'no']
      ]);
    }
    function draw(ctx,w,h){
      var P=new Plot(ctx,w,h,view,{l:30,r:12,t:14,b:26}); P.clear(); P.grid();
      var c=P.ctx, N=6, gx, gy, arrowLen=0.34;
      for(gx=-N;gx<=N;gx++){
        for(gy=-N;gy<=N;gy++){
          var x=gx*(view.xmax/N)*0.85, y=gy*(view.ymax/N)*0.85;
          var fx=Pfn(x,y), fy=Qfn(x,y);
          var mag=Math.sqrt(fx*fx+fy*fy);
          if(mag<1e-6) continue;
          var ux=fx/mag, uy=fy/mag;
          var x2=x+arrowLen*ux, y2=y+arrowLen*uy;
          arrow(c,P.X(x),P.Y(y),P.X(x2),P.Y(y2),INDIGO,1.6);
        }
      }
      var test=cQ-b, cons=Math.abs(test)<1e-9;
      document.getElementById('mvcVFTest').textContent=fmt(test,3);
      document.getElementById('mvcVFCons').textContent = cons
        ? ('yes — f(x,y) = '+fmt(a/2,2)+'x² + '+fmt(b,2)+'xy + '+fmt(d/2,2)+'y²')
        : ('no — ∂P/∂y ('+fmt(b,2)+') ≠ ∂Q/∂x ('+fmt(cQ,2)+')');
      updateDataView(test,cons);
    }
    register(canvas,draw);
    var sA=document.getElementById('mvcVFA'), sB=document.getElementById('mvcVFB'),
        sC=document.getElementById('mvcVFC'), sD=document.getElementById('mvcVFD');
    function upd(){
      a=parseFloat(sA.value); b=parseFloat(sB.value); cQ=parseFloat(sC.value); d=parseFloat(sD.value);
      document.getElementById('mvcVFAval').textContent=fmt(a,1);
      document.getElementById('mvcVFBval').textContent=fmt(b,1);
      document.getElementById('mvcVFCval').textContent=fmt(cQ,1);
      document.getElementById('mvcVFDval').textContent=fmt(d,1);
      redrawAll();
    }
    [sA,sB,sC,sD].forEach(function(el){ el.addEventListener('input',upd); });
    upd();
  })();
})(window.CSExplorerKit);
