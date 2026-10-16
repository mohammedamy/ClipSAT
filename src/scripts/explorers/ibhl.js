/* Canvas explorers for the ibhl track (Plan 5 Phase 5.015, ADR 0039).
   Moved verbatim out of modules/02-core-app.js. build.js minifies this file to
   public/js/ex/ibhl.js, which base.njk loads only on the ibhl page, right after
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
     IB MATH HL — Pillar 2 MVP retrofit continued (track 8 of 8, last
     one). Same shared Plot/register/redrawAll/fmt/ClipSAT3D helpers.
     ══════════════════════════════════════════════════════════════════ */

  /* IB HL TOPIC 3 — cross product in 3D, u fixed, v's z-component slides */
  (function(){
    var btn=document.getElementById('ibhlCrossBtn'); if(!btn) return;
    var wrap=document.getElementById('ibhlCrossWrap');
    var hint=document.getElementById('ibhlCrossHint');
    var slider=document.getElementById('ibhlV3');
    var slider1=document.getElementById('ibhlV1');
    var built=false, H=null, arrows=[];
    var u=[1,2,3], v1=4, v3=2;
    var dataBtn=document.getElementById('ibhlCrossDataBtn'), dataPanel=document.getElementById('ibhlCrossDataPanel'),
        dataDesc=document.getElementById('ibhlCrossDataDesc'), dataRows=document.getElementById('ibhlCrossDataRows');
    wireDataToggle(dataBtn,dataPanel);

    function cross(a,b){ return [a[1]*b[2]-a[2]*b[1], a[2]*b[0]-a[0]*b[2], a[0]*b[1]-a[1]*b[0]]; }
    function mag(vec){ return Math.sqrt(vec[0]*vec[0]+vec[1]*vec[1]+vec[2]*vec[2]); }
    function vlab(vec,dp){ return '⟨'+fmt(vec[0],dp)+', '+fmt(vec[1],dp)+', '+fmt(vec[2],dp)+'⟩'; }

    function mkArrow(T,vec,color){
      var len=Math.sqrt(vec[0]*vec[0]+vec[1]*vec[1]+vec[2]*vec[2]);
      if(len<1e-6) return null;
      var dir=new T.Vector3(vec[0],vec[1],vec[2]).normalize();
      return new T.ArrowHelper(dir, new T.Vector3(0,0,0), len, color, Math.min(0.8,len*0.18), Math.min(0.45,len*0.12));
    }

    /* Non-visual equivalent (Pillar 4 scale): this explorer is 3D-only —
       no 2D canvas fallback exists to describe — so the data view is wired
       directly to the same refreshReadout() the slider already calls,
       rather than a register()/draw() cycle like every other explorer. */
    function updateDataView(v,w){
      if(!dataDesc) return;
      dataDesc.textContent='u = '+vlab(u,0)+' (fixed). v = '+vlab(v,1)+'. u × v = '+vlab(w,2)+', magnitude '+fmt(mag(w),3)+'. The cross product is perpendicular to both u and v.';
      renderDataRows(dataRows,[
        ['u',vlab(u,0),fmt(mag(u),3)],
        ['v',vlab(v,1),fmt(mag(v),3)],
        ['u × v',vlab(w,2),fmt(mag(w),3)]
      ]);
    }

    function refreshReadout(){
      var v=[v1,-1,v3], w=cross(u,v);
      document.getElementById('ibhlW').textContent='⟨'+fmt(w[0],0)+', '+fmt(w[1],0)+', '+fmt(w[2],2)+'⟩';
      document.getElementById('ibhlWmag').textContent=fmt(Math.sqrt(w[0]*w[0]+w[1]*w[1]+w[2]*w[2]),3);
      updateDataView(v,w);
    }

    function updateScene(){
      if(!H) return;
      arrows.forEach(function(a){ H.scene.remove(a); });
      arrows=[];
      var T=H.THREE;
      var v=[v1,-1,v3], w=cross(u,v);
      var au=mkArrow(T,u,0x1E3A6E); if(au){ H.scene.add(au); arrows.push(au); }
      var av=mkArrow(T,v,0xC8902A); if(av){ H.scene.add(av); arrows.push(av); }
      var aw=mkArrow(T,w,0x2FA36B); if(aw){ H.scene.add(aw); arrows.push(aw); }
    }

    function build(mods){
      var T=mods.THREE;
      H=ClipSAT3D.setup(wrap, mods, {az:0.8, el:0.45, dist:16, target:new T.Vector3(0,0,0),
        axisSegs:[[[-12,0,0],[12,0,0]],[[0,-12,0],[0,12,0]],[[0,0,-12],[0,0,12]]]});
      updateScene();
      H.render();
    }

    function open3d(){
      wrap.hidden=false; hint.hidden=false;
      btn.setAttribute('aria-expanded','true');
      btn.textContent='🧊 Hide 3D view';
      if(built){ updateScene(); H.render(); return; }
      built=true;
      btn.disabled=true; btn.textContent='Loading 3D…';
      ClipSAT3D.load().then(function(mods){
        btn.disabled=false; btn.textContent='🧊 Hide 3D view';
        build(mods);
      }).catch(function(){
        built=false;
        btn.disabled=false; btn.textContent='🧊 View u × v in 3D';
        wrap.hidden=true; hint.hidden=true;
        btn.setAttribute('aria-expanded','false');
        wrap.textContent='3D view failed to load — check your connection and try again.';
        wrap.hidden=false;
      });
    }
    function close3d(){
      wrap.hidden=true; hint.hidden=true;
      btn.setAttribute('aria-expanded','false');
      btn.textContent='🧊 View u × v in 3D';
    }

    btn.addEventListener('click',function(){ if(wrap.hidden) open3d(); else close3d(); });
    slider.addEventListener('input',function(){
      v3=parseInt(slider.value,10)/10;
      document.getElementById('ibhlV3lab').textContent=fmt(v3,1);
      refreshReadout();
      if(built){ updateScene(); H.render(); }
    });
    if(slider1){
      slider1.addEventListener('input',function(){
        v1=parseInt(slider1.value,10)/10;
        document.getElementById('ibhlV1lab').textContent=fmt(v1,1);
        refreshReadout();
        if(built){ updateScene(); H.render(); }
      });
    }
    refreshReadout();
  })();

  /* ===================== IB HL TOPIC 3 · TWO PLANES & INTERSECTION LINE ===================== */
  (function(){
    var canvas=document.getElementById('ibhlPlanesCanvas'); if(!canvas) return;
    var btn=document.getElementById('ibhlPlanes3dBtn'), wrap=document.getElementById('ibhlPlanes3dWrap'), hint=document.getElementById('ibhlPlanes3dHint');
    var sA=document.getElementById('ibhlP2A'), sB=document.getElementById('ibhlP2B'), sC=document.getElementById('ibhlP2C'), sD=document.getElementById('ibhlP2D');
    var dataBtn=document.getElementById('ibhlPlanesDataBtn'), dataPanel=document.getElementById('ibhlPlanesDataPanel'),
        dataDesc=document.getElementById('ibhlPlanesDataDesc'), dataRows=document.getElementById('ibhlPlanesDataRows');
    wireDataToggle(dataBtn,dataPanel);

    var n1=[1,2,-1], d1=3;
    var n2a=2, n2b=-1, n2c=3, d2=1;
    var built=false, H=null, p1Mesh=null, p2Mesh=null, arr1=null, arr2=null, lineMesh=null;

    function mathState(){
      var len1=Math.sqrt(n1[0]*n1[0]+n1[1]*n1[1]+n1[2]*n1[2]);
      var n2=[n2a,n2b,n2c];
      var len2=Math.sqrt(n2[0]*n2[0]+n2[1]*n2[1]+n2[2]*n2[2]); if(len2<1e-6){ len2=1; n2=[0,1,0]; }

      // Cross product d = n1 x n2
      var dx=n1[1]*n2[2] - n1[2]*n2[1];
      var dy=n1[2]*n2[0] - n1[0]*n2[2];
      var dz=n1[0]*n2[1] - n1[1]*n2[0];
      var lenD=Math.sqrt(dx*dx+dy*dy+dz*dz);

      // Dot product and dihedral angle
      var dot12=n1[0]*n2[0]+n1[1]*n2[1]+n1[2]*n2[2];
      var cosPhi=Math.min(1, Math.max(0, Math.abs(dot12)/(len1*len2)));
      var phiDeg=Math.acos(cosPhi)*180/Math.PI;

      // Find a point on intersection line
      var isParallel=lenD<1e-4;
      var p0=[0,0,0];
      if(!isParallel){
        if(Math.abs(dz)>1e-4){
          p0[0]=(d1*n2[1] - d2*n1[1])/dz;
          p0[1]=(d2*n1[0] - d1*n2[0])/dz;
          p0[2]=0;
        } else if(Math.abs(dy)>1e-4){
          p0[0]=(d1*n2[2] - d2*n1[2])/dy;
          p0[1]=0;
          p0[2]=(d2*n1[0] - d1*n2[0])/dy;
        } else {
          p0[0]=0;
          p0[1]=(d1*n2[2] - d2*n1[2])/dx;
          p0[2]=(d2*n1[1] - d1*n2[1])/dx;
        }
      }

      return {
        n1:n1, len1:len1, d1:d1,
        n2:n2, len2:len2, d2:d2,
        dVec:[dx,dy,dz], lenD:lenD, isParallel:isParallel,
        p0:p0, dot12:dot12, cosPhi:cosPhi, phiDeg:phiDeg
      };
    }

    function updateReadouts(st){
      var p1El=document.getElementById('ibhlPlane1Eq'); if(p1El) p1El.textContent='x + 2y - z = 3';
      var p2El=document.getElementById('ibhlPlane2Eq'); if(p2El){
        var parts=[];
        if(st.n2[0]!==0) parts.push((st.n2[0]===1?'':st.n2[0]===-1?'-':st.n2[0])+'x');
        if(st.n2[1]!==0) parts.push((parts.length?(st.n2[1]>0?'+ ':'- '):st.n2[1]<0?'-':'')+(Math.abs(st.n2[1])===1?'':Math.abs(st.n2[1]))+'y');
        if(st.n2[2]!==0) parts.push((parts.length?(st.n2[2]>0?'+ ':'- '):st.n2[2]<0?'-':'')+(Math.abs(st.n2[2])===1?'':Math.abs(st.n2[2]))+'z');
        p2El.textContent=(parts.join(' ')||'0')+' = '+st.d2;
      }
      var lineEl=document.getElementById('ibhlInterLine'); if(lineEl){
        lineEl.textContent=st.isParallel?'Planes are parallel':'⟨'+st.dVec[0]+', '+st.dVec[1]+', '+st.dVec[2]+'⟩';
      }
      var angEl=document.getElementById('ibhlDihedralAngle'); if(angEl){
        angEl.textContent=st.isParallel?'0.0° (Parallel)':fmt(st.phiDeg,1)+'°';
      }

      if(dataDesc){
        dataDesc.textContent='Plane Π₁: x + 2y - z = 3 (Normal n₁ = ⟨1,2,-1⟩). Plane Π₂: '+st.n2[0]+'x + '+st.n2[1]+'y + '+st.n2[2]+'z = '+st.d2+' (Normal n₂ = ⟨'+st.n2[0]+','+st.n2[1]+','+st.n2[2]+'⟩). '+(st.isParallel?'Planes are parallel.':'Line of intersection direction d = n₁ × n₂ = ⟨'+st.dVec[0]+','+st.dVec[1]+','+st.dVec[2]+'⟩, dihedral angle φ = '+fmt(st.phiDeg,1)+'°.');
      }
      renderDataRows(dataRows,[
        ['Plane Π₁ Normal', '⟨1, 2, -1⟩'],
        ['Plane Π₂ Normal', '⟨'+st.n2[0]+', '+st.n2[1]+', '+st.n2[2]+'⟩'],
        ['Direction Vector d = n₁ × n₂', st.isParallel?'Parallel (zero cross product)':'⟨'+st.dVec[0]+', '+st.dVec[1]+', '+st.dVec[2]+'⟩'],
        ['Dihedral Angle φ', fmt(st.phiDeg,1)+'°'],
        ['Point on Line P', st.isParallel?'—':'('+fmt(st.p0[0],2)+', '+fmt(st.p0[1],2)+', '+fmt(st.p0[2],2)+')']
      ]);
    }

    function projectIso(x,y,z,cx,cy,sc){
      var cos30=0.866, sin30=0.5;
      var px=cx + sc*(y*cos30 - x*cos30);
      var py=cy - sc*(z - (x+y)*sin30*0.55);
      return [px,py];
    }

    function getPlaneQuad(n, dVal, S){
      var len=Math.sqrt(n[0]*n[0]+n[1]*n[1]+n[2]*n[2])||1;
      var nu=[n[0]/len, n[1]/len, n[2]/len];
      var k=Math.abs(nu[2])<0.9?[0,0,1]:[0,1,0];
      var u=[nu[1]*k[2]-nu[2]*k[1], nu[2]*k[0]-nu[0]*k[2], nu[0]*k[1]-nu[1]*k[0]];
      var uL=Math.sqrt(u[0]*u[0]+u[1]*u[1]+u[2]*u[2])||1; u=[u[0]/uL,u[1]/uL,u[2]/uL];
      var v=[nu[1]*u[2]-nu[2]*u[1], nu[2]*u[0]-nu[0]*u[2], nu[0]*u[1]-nu[1]*u[0]];
      var cDist=dVal/len;
      var c=[nu[0]*cDist, nu[1]*cDist, nu[2]*cDist];
      return {
        c:c, nu:nu,
        corners:[
          [c[0]-S*u[0]-S*v[0], c[1]-S*u[1]-S*v[1], c[2]-S*u[2]-S*v[2]],
          [c[0]+S*u[0]-S*v[0], c[1]+S*u[1]-S*v[1], c[2]+S*u[2]-S*v[2]],
          [c[0]+S*u[0]+S*v[0], c[1]+S*u[1]+S*v[1], c[2]+S*u[2]+S*v[2]],
          [c[0]-S*u[0]+S*v[0], c[1]-S*u[1]+S*v[1], c[2]-S*u[2]+S*v[2]]
        ]
      };
    }

    function draw(ctx,w,ht){
      ctx.clearRect(0,0,w,ht);
      var cx=w*0.5, cy=ht*0.55, sc=Math.min(w,ht)*0.11;
      var st=mathState();
      updateReadouts(st);

      // Axes
      ctx.lineWidth=1; ctx.strokeStyle=GRID||'#8C97A8'; ctx.fillStyle=MUTED||'#6B7280';
      ctx.font='11px sans-serif';
      var o=projectIso(0,0,0,cx,cy,sc);
      var axX=projectIso(3.8,0,0,cx,cy,sc), axY=projectIso(0,3.8,0,cx,cy,sc), axZ=projectIso(0,0,3.8,cx,cy,sc);
      ctx.beginPath(); ctx.moveTo(o[0],o[1]); ctx.lineTo(axX[0],axX[1]); ctx.stroke(); ctx.fillText('+x',axX[0]+3,axX[1]);
      ctx.beginPath(); ctx.moveTo(o[0],o[1]); ctx.lineTo(axY[0],axY[1]); ctx.stroke(); ctx.fillText('+y',axY[0]+3,axY[1]);
      ctx.beginPath(); ctx.moveTo(o[0],o[1]); ctx.lineTo(axZ[0],axZ[1]); ctx.stroke(); ctx.fillText('+z',axZ[0]-4,axZ[1]-4);

      // Plane 1 (fixed, indigo)
      var q1=getPlaneQuad(st.n1, st.d1, 2.5);
      var cp1=q1.corners.map(function(p){ return projectIso(p[0],p[1],p[2],cx,cy,sc); });
      ctx.beginPath(); ctx.moveTo(cp1[0][0],cp1[0][1]);
      for(var i=1;i<4;i++) ctx.lineTo(cp1[i][0],cp1[i][1]);
      ctx.closePath();
      ctx.fillStyle='rgba(30, 58, 110, 0.28)'; ctx.fill();
      ctx.strokeStyle=INDIGO||'#1E3A6E'; ctx.lineWidth=1.8; ctx.stroke();

      // Normal 1
      var c1=projectIso(q1.c[0],q1.c[1],q1.c[2],cx,cy,sc);
      var n1Tip=projectIso(q1.c[0]+1.8*q1.nu[0], q1.c[1]+1.8*q1.nu[1], q1.c[2]+1.8*q1.nu[2], cx,cy,sc);
      ctx.beginPath(); ctx.moveTo(c1[0],c1[1]); ctx.lineTo(n1Tip[0],n1Tip[1]);
      ctx.strokeStyle=INDIGO||'#1E3A6E'; ctx.lineWidth=2.2; ctx.stroke();
      arrow(ctx, c1[0], c1[1], n1Tip[0], n1Tip[1], 7, INDIGO||'#1E3A6E');

      // Plane 2 (user, amber)
      var q2=getPlaneQuad(st.n2, st.d2, 2.5);
      var cp2=q2.corners.map(function(p){ return projectIso(p[0],p[1],p[2],cx,cy,sc); });
      ctx.beginPath(); ctx.moveTo(cp2[0][0],cp2[0][1]);
      for(var j=1;j<4;j++) ctx.lineTo(cp2[j][0],cp2[j][1]);
      ctx.closePath();
      ctx.fillStyle='rgba(200, 144, 42, 0.28)'; ctx.fill();
      ctx.strokeStyle=AMBER2||'#C8902A'; ctx.lineWidth=1.8; ctx.stroke();

      // Normal 2
      var c2=projectIso(q2.c[0],q2.c[1],q2.c[2],cx,cy,sc);
      var n2Tip=projectIso(q2.c[0]+1.8*q2.nu[0], q2.c[1]+1.8*q2.nu[1], q2.c[2]+1.8*q2.nu[2], cx,cy,sc);
      ctx.beginPath(); ctx.moveTo(c2[0],c2[1]); ctx.lineTo(n2Tip[0],n2Tip[1]);
      ctx.strokeStyle=AMBER2||'#C8902A'; ctx.lineWidth=2.2; ctx.stroke();
      arrow(ctx, c2[0], c2[1], n2Tip[0], n2Tip[1], 7, AMBER2||'#C8902A');

      // Intersection Line (green)
      if(!st.isParallel){
        var dirUnit=[st.dVec[0]/st.lenD, st.dVec[1]/st.lenD, st.dVec[2]/st.lenD];
        var lA=projectIso(st.p0[0]-3.2*dirUnit[0], st.p0[1]-3.2*dirUnit[1], st.p0[2]-3.2*dirUnit[2], cx,cy,sc);
        var lB=projectIso(st.p0[0]+3.2*dirUnit[0], st.p0[1]+3.2*dirUnit[1], st.p0[2]+3.2*dirUnit[2], cx,cy,sc);
        ctx.beginPath(); ctx.moveTo(lA[0],lA[1]); ctx.lineTo(lB[0],lB[1]);
        ctx.strokeStyle='#10B981'; ctx.lineWidth=3; ctx.stroke();
        ctx.fillStyle='#10B981'; ctx.font='bold 12px sans-serif';
        ctx.fillText('Line d', lB[0]+6, lB[1]);
      }
    }

    function update3dScene(){
      if(!H) return;
      var T=H.THREE, st=mathState();

      if(p1Mesh){
        var nu1=new T.Vector3(st.n1[0]/st.len1, st.n1[1]/st.len1, st.n1[2]/st.len1);
        var c1=new T.Vector3().copy(nu1).multiplyScalar(st.d1/st.len1);
        p1Mesh.position.copy(c1);
        p1Mesh.quaternion.setFromUnitVectors(new T.Vector3(0,0,1), nu1);
        if(arr1){
          H.scene.remove(arr1);
          arr1=new T.ArrowHelper(nu1, c1, 2.5, 0x1E3A6E, 0.45, 0.25);
          H.scene.add(arr1);
        }
      }
      if(p2Mesh){
        var nu2=new T.Vector3(st.n2[0]/st.len2, st.n2[1]/st.len2, st.n2[2]/st.len2);
        var c2=new T.Vector3().copy(nu2).multiplyScalar(st.d2/st.len2);
        p2Mesh.position.copy(c2);
        p2Mesh.quaternion.setFromUnitVectors(new T.Vector3(0,0,1), nu2);
        if(arr2){
          H.scene.remove(arr2);
          arr2=new T.ArrowHelper(nu2, c2, 2.5, 0xC8902A, 0.45, 0.25);
          H.scene.add(arr2);
        }
      }
      if(lineMesh){
        if(st.isParallel){
          lineMesh.visible=false;
        } else {
          lineMesh.visible=true;
          var du=new T.Vector3(st.dVec[0]/st.lenD, st.dVec[1]/st.lenD, st.dVec[2]/st.lenD);
          var pStart=new T.Vector3(st.p0[0]-5*du.x, st.p0[1]-5*du.y, st.p0[2]-5*du.z);
          var pEnd=new T.Vector3(st.p0[0]+5*du.x, st.p0[1]+5*du.y, st.p0[2]+5*du.z);
          lineMesh.geometry.setFromPoints([pStart, pEnd]);
        }
      }
      H.render();
    }

    function build3d(mods){
      var T=mods.THREE, COLOR=ClipSAT3D.COLOR;
      H=ClipSAT3D.setup(wrap, mods, {
        az:0.9, el:0.45, dist:14, target:new T.Vector3(0,0,0),
        axisSegs:[[[-6,0,0],[6,0,0]],[[0,-6,0],[0,6,0]],[[0,0,-6],[0,0,6]]]
      });

      var pGeo1=new T.PlaneGeometry(8,8);
      var pMat1=new T.MeshLambertMaterial({color:COLOR.INDIGO, transparent:true, opacity:0.45, side:T.DoubleSide});
      p1Mesh=new T.Mesh(pGeo1,pMat1); H.scene.add(p1Mesh);
      arr1=new T.ArrowHelper(new T.Vector3(0,1,0), new T.Vector3(0,0,0), 2.5, 0x1E3A6E); H.scene.add(arr1);

      var pGeo2=new T.PlaneGeometry(8,8);
      var pMat2=new T.MeshLambertMaterial({color:COLOR.AMBER, transparent:true, opacity:0.45, side:T.DoubleSide});
      p2Mesh=new T.Mesh(pGeo2,pMat2); H.scene.add(p2Mesh);
      arr2=new T.ArrowHelper(new T.Vector3(0,1,0), new T.Vector3(0,0,0), 2.5, 0xC8902A); H.scene.add(arr2);

      var lGeo=new T.BufferGeometry();
      var lMat=new T.LineBasicMaterial({color:0x10B981, linewidth:3.5});
      lineMesh=new T.Line(lGeo,lMat); H.scene.add(lineMesh);

      update3dScene();
    }

    function open3d(){
      wrap.hidden=false; hint.hidden=false;
      btn.setAttribute('aria-expanded','true');
      btn.textContent='🧊 Hide 3D view';
      if(built){ update3dScene(); return; }
      built=true; btn.disabled=true; btn.textContent='Loading 3D…';
      ClipSAT3D.load().then(function(mods){
        btn.disabled=false; btn.textContent='🧊 Hide 3D view';
        build3d(mods);
      }).catch(function(){
        built=false; btn.disabled=false; btn.textContent='🧊 View 2 Planes & Line in 3D';
        wrap.hidden=true; hint.hidden=true;
        btn.setAttribute('aria-expanded','false');
        wrap.textContent='3D view failed to load — check your connection and try again.';
        wrap.hidden=false;
      });
    }
    function close3d(){
      wrap.hidden=true; hint.hidden=true;
      btn.setAttribute('aria-expanded','false');
      btn.textContent='🧊 View 2 Planes & Line in 3D';
    }

    if(btn) btn.addEventListener('click', function(){ if(wrap.hidden) open3d(); else close3d(); });

    function onCtrl(){
      n2a=parseFloat(sA.value); document.getElementById('ibhlP2AV').textContent=n2a;
      n2b=parseFloat(sB.value); document.getElementById('ibhlP2BV').textContent=n2b;
      n2c=parseFloat(sC.value); document.getElementById('ibhlP2CV').textContent=n2c;
      d2=parseFloat(sD.value); document.getElementById('ibhlP2DV').textContent=d2;
      redrawAll();
      if(built) update3dScene();
    }

    [sA,sB,sC,sD].forEach(function(s){ if(s) s.addEventListener('input',onCtrl); });
    register(canvas,draw);
  })();


  /* IB HL TOPIC 4 — confidence interval for the mean, z-based sampling
     distribution shaded between the bounds */
  (function(){
    var canvas=document.getElementById('ibhlCICanvas'); if(!canvas) return;
    var view={xmin:0,xmax:1,ymin:0,ymax:1};
    var xbar=52.3, s=8.4, n=64, level=95;
    var Z={90:1.645,95:1.96,99:2.576};
    var dataBtn=document.getElementById('ibhlCIDataBtn'), dataPanel=document.getElementById('ibhlCIDataPanel'),
        dataDesc=document.getElementById('ibhlCIDataDesc'), dataRows=document.getElementById('ibhlCIDataRows');
    wireDataToggle(dataBtn,dataPanel);
    function stats(){
      var se=s/Math.sqrt(n), z=Z[level]||1.96, margin=z*se;
      return {se:se,z:z,margin:margin,lo:xbar-margin,hi:xbar+margin};
    }
    function pdf(x,mu,sigma){ return Math.exp(-0.5*Math.pow((x-mu)/sigma,2))/(sigma*Math.sqrt(2*Math.PI)); }
    function updateDataView(st){
      if(!dataDesc) return;
      dataDesc.textContent='x̄ = '+fmt(xbar,2)+', s = '+fmt(s,2)+', n = '+n+', '+level+'% CI: z = '+fmt(st.z,3)+', SE = s/√n = '+fmt(st.se,3)+', margin = '+fmt(st.margin,3)+'. CI = ('+fmt(st.lo,2)+', '+fmt(st.hi,2)+').';
      renderDataRows(dataRows,[
        ['x̄',fmt(xbar,2)],['s',fmt(s,2)],['n',n],
        ['standard error s/√n',fmt(st.se,3)],
        ['z ('+level+'%)',fmt(st.z,3)],
        ['margin of error',fmt(st.margin,3)],
        ['confidence interval','('+fmt(st.lo,2)+', '+fmt(st.hi,2)+')']
      ]);
    }
    function draw(ctx,w,h){
      var st=stats();
      view.xmin=xbar-4*st.se; view.xmax=xbar+4*st.se; view.ymin=0; view.ymax=pdf(xbar,xbar,st.se)*1.25;
      var P=new Plot(ctx,w,h,view,{l:34,r:12,t:14,b:26}); P.clear(); P.grid();
      var fn=function(x){ return pdf(x,xbar,st.se); };
      P.areaUnder(fn,st.lo,st.hi,'rgba(30,58,110,0.16)');
      P.curve(fn,INDIGO,2.4);
      P.vline(st.lo,AMBER2,[5,4]); P.vline(st.hi,AMBER2,[5,4]);
      P.vline(xbar,'#AEB8C7',[3,3]);
      document.getElementById('ibhlCIMargin').textContent=fmt(st.margin,3);
      document.getElementById('ibhlCIBounds').textContent='('+fmt(st.lo,2)+', '+fmt(st.hi,2)+')';
      updateDataView(st);
    }
    register(canvas,draw);
    var sX=document.getElementById('ibhlCIXbar'), sS=document.getElementById('ibhlCIS'), sN=document.getElementById('ibhlCIN'), sL=document.getElementById('ibhlCILevel');
    function upd(){
      xbar=parseFloat(sX.value); s=parseFloat(sS.value); n=parseInt(sN.value,10);
      if(sL){ level=parseInt(sL.value,10); }
      document.getElementById('ibhlCIXbarVal').textContent=fmt(xbar,1);
      document.getElementById('ibhlCISVal').textContent=fmt(s,1);
      document.getElementById('ibhlCINVal').textContent=n;
      redrawAll();
    }
    sX.addEventListener('input',upd); sS.addEventListener('input',upd); sN.addEventListener('input',upd);
    if(sL){ sL.addEventListener('change',upd); }
    upd();
  })();

  /* IB HL TOPIC 4 — the Poisson distribution, bar chart */
  (function(){
    var canvas=document.getElementById('ibhlPoisCanvas'); if(!canvas) return;
    var Kmax=15;
    var view={xmin:-0.5,xmax:Kmax+0.5,ymin:0,ymax:0.7};
    var lambda=3, kSel=5;
    var dataBtn=document.getElementById('ibhlPoisDataBtn'), dataPanel=document.getElementById('ibhlPoisDataPanel'),
        dataDesc=document.getElementById('ibhlPoisDataDesc'), dataRows=document.getElementById('ibhlPoisDataRows');
    wireDataToggle(dataBtn,dataPanel);
    function pmf(k,lam){
      var p=Math.exp(-lam);
      for(var i=1;i<=k;i++){ p*=lam/i; }
      return p;
    }
    function updateDataView(){
      if(!dataDesc) return;
      dataDesc.textContent='Poisson distribution with rate λ = '+fmt(lambda,1)+'. P(X = '+kSel+') = '+fmt(pmf(kSel,lambda),4)+' (highlighted).';
      var rows=[];
      for(var k=0;k<=Kmax;k++){ rows.push([k,fmt(pmf(k,lambda),4)]); }
      renderDataRows(dataRows,rows);
    }
    function draw(ctx,w,h){
      var P=new Plot(ctx,w,h,view,{l:30,r:12,t:12,b:24}); P.clear(); P.grid();
      var c=P.ctx;
      for(var k=0;k<=Kmax;k++){
        var p=pmf(k,lambda);
        var x0=P.X(k-0.4), x1=P.X(k+0.4), y0=P.Y(0), y1=P.Y(p);
        c.fillStyle = k===kSel ? 'rgba(200,144,42,0.85)' : 'rgba(30,58,110,0.65)';
        c.fillRect(x0, y1, x1-x0, y0-y1);
      }
      document.getElementById('ibhlMeanLam').textContent=fmt(lambda,1);
      document.getElementById('ibhlPX5').textContent=fmt(pmf(kSel,lambda),4);
      updateDataView();
    }
    register(canvas,draw);
    var s=document.getElementById('ibhlLambda'), sk=document.getElementById('ibhlPoisK');
    function upd(){
      lambda=parseInt(s.value,10)/10;
      if(sk){ kSel=parseInt(sk.value,10); }
      document.getElementById('ibhlLambdaLab').textContent=fmt(lambda,1);
      if(sk){ document.getElementById('ibhlPoisKlab').textContent=kSel; }
      redrawAll();
    }
    s.addEventListener('input',upd);
    if(sk){ sk.addEventListener('input',upd); }
    upd();
  })();

  /* IB HL TOPIC 5 — Maclaurin series for cos x */
  (function(){
    var canvas=document.getElementById('ibhlMacCanvas'); if(!canvas) return;
    var view={xmin:-6.3,xmax:6.3,ymin:-3,ymax:3};
    var n=3, fnName='cos';
    var dataBtn=document.getElementById('ibhlMacDataBtn'), dataPanel=document.getElementById('ibhlMacDataPanel'),
        dataDesc=document.getElementById('ibhlMacDataDesc'), dataRows=document.getElementById('ibhlMacDataRows');
    wireDataToggle(dataBtn,dataPanel);
    function maclaurin(x,nn,fname){
      var sum=0, term, xx=x*x, kk;
      if(fname==='sin'){
        term=x;
        for(kk=0;kk<nn;kk++){ sum+=term; term *= -xx/((2*kk+2)*(2*kk+3)); }
      } else {
        term=1;
        for(kk=0;kk<nn;kk++){ sum+=term; term *= -xx/((2*kk+1)*(2*kk+2)); }
      }
      return sum;
    }
    function exactFn(x){ return fnName==='sin' ? Math.sin(x) : Math.cos(x); }
    function updateDataView(exact,approx){
      if(!dataDesc) return;
      dataDesc.textContent='Maclaurin polynomial for '+(fnName==='sin'?'sin(x)':'cos(x)')+', '+n+' term'+(n===1?'':'s')+'. At x = 0.1: exact value = '+fmt(exact,6)+', approximation = '+fmt(approx,6)+'.';
      var N=9, rows=[];
      for(var i=0;i<N;i++){ var x=view.xmin+(view.xmax-view.xmin)*i/(N-1); rows.push([fmt(x),fmt(exactFn(x)),fmt(maclaurin(x,n,fnName))]); }
      renderDataRows(dataRows,rows);
    }
    function draw(ctx,w,h){
      var P=new Plot(ctx,w,h,view,{l:28,r:12,t:12,b:24}); P.clear(); P.grid();
      P.curve(exactFn, INDIGO, 2.2);
      P.curve(function(x){ return maclaurin(x,n,fnName); }, AMBER2, 2.2, [5,4]);
      var exact=exactFn(0.1), approx=maclaurin(0.1,n,fnName);
      document.getElementById('ibhlExact').textContent=fmt(exact,6);
      document.getElementById('ibhlApprox').textContent=fmt(approx,6);
      updateDataView(exact,approx);
    }
    register(canvas,draw);
    var s=document.getElementById('ibhlN'), fnSel=document.getElementById('ibhlMacFn');
    function upd(){
      n=parseInt(s.value,10);
      if(fnSel){ fnName=fnSel.value; }
      document.getElementById('ibhlNlab').textContent=n;
      redrawAll();
    }
    s.addEventListener('input',upd);
    if(fnSel){ fnSel.addEventListener('change',upd); }
    upd();
  })();

  /* IB HL TOPIC 1 — a complex number on the Argand plane, with its
     conjugate (mirrored across the real axis), modulus, and argument
     (drawn as an arc from the positive real axis). */
  (function(){
    var canvas=document.getElementById('ibhlArgandCanvas'); if(!canvas) return;
    var view={xmin:-6,xmax:6,ymin:-6,ymax:6};
    var a=3, b=4;
    var dataBtn=document.getElementById('ibhlArgandDataBtn'), dataPanel=document.getElementById('ibhlArgandDataPanel'),
        dataDesc=document.getElementById('ibhlArgandDataDesc'), dataRows=document.getElementById('ibhlArgandDataRows');
    wireDataToggle(dataBtn,dataPanel);
    function updateDataView(mod,argDeg){
      if(!dataDesc) return;
      dataDesc.textContent='z = '+fmt(a,2)+(b>=0?' + ':' − ')+fmt(Math.abs(b),2)+'i. |z| = '+fmt(mod,3)+', arg(z) = '+fmt(argDeg,2)+'°, z̄ = '+fmt(a,2)+(b>=0?' − ':' + ')+fmt(Math.abs(b),2)+'i.';
      renderDataRows(dataRows,[
        ['z', fmt(a,2)+(b>=0?' + ':' − ')+fmt(Math.abs(b),2)+'i'],
        ['|z|', fmt(mod,3)],
        ['arg(z)', fmt(argDeg,2)+'°'],
        ['z̄', fmt(a,2)+(b>=0?' − ':' + ')+fmt(Math.abs(b),2)+'i']
      ]);
    }
    function draw(ctx,w,h){
      var extent=Math.max(6, Math.abs(a)*1.3, Math.abs(b)*1.3);
      view.xmin=-extent; view.xmax=extent; view.ymin=-extent; view.ymax=extent;
      var P=new Plot(ctx,w,h,view,{l:28,r:12,t:12,b:24}); P.clear(); P.grid();
      var c=P.ctx;
      var mod=Math.sqrt(a*a+b*b);
      var argRad=Math.atan2(b,a), argDeg=(argRad*180/Math.PI+360)%360;
      P.segment(0,0,a,b,INDIGO,2.4);
      P.dot(a,b,INDIGO,5.5);
      P.segment(0,0,a,-b,AMBER,2.2,[5,3]);
      P.dot(a,-b,AMBER,5.5);
      if(mod>1e-9){
        var N=30, rr=Math.min(1.1,mod*0.32);
        c.beginPath(); c.strokeStyle=AMBER2; c.lineWidth=1.6;
        for(var i=0;i<=N;i++){
          var t=argRad*i/N;
          var px=P.X(rr*Math.cos(t)), py=P.Y(rr*Math.sin(t));
          if(i===0){ c.moveTo(px,py); } else { c.lineTo(px,py); }
        }
        c.stroke();
      }
      document.getElementById('ibhlArgandMod').textContent=fmt(mod,3);
      document.getElementById('ibhlArgandArg').textContent=fmt(argDeg,2)+'°';
      document.getElementById('ibhlArgandConj').textContent=fmt(a,2)+(b>=0?' − ':' + ')+fmt(Math.abs(b),2)+'i';
      updateDataView(mod,argDeg);
    }
    register(canvas,draw);
    var sA=document.getElementById('ibhlArgandA'), sB=document.getElementById('ibhlArgandB');
    function upd(){
      a=parseFloat(sA.value); b=parseFloat(sB.value);
      document.getElementById('ibhlArgandAVal').textContent=fmt(a,1);
      document.getElementById('ibhlArgandBVal').textContent=fmt(b,1);
      redrawAll();
    }
    sA.addEventListener('input',upd); sB.addEventListener('input',upd);
    upd();
  })();

  /* IB HL TOPIC 1 — de Moivre's theorem & n-th roots of unity, on the unit
     circle (r=1 throughout, so z^n=cis(nθ) exactly and both z, z^n stay on
     the same circle as the roots of unity themselves — the general r case
     from the callout's formula is mentioned in the note but not dragged,
     since large r^n would blow the view up for n>2 or 3). */
  (function(){
    var canvas=document.getElementById('ibhlDeMoivreCanvas'); if(!canvas) return;
    var view={xmin:-1.6,xmax:1.6,ymin:-1.15,ymax:1.15};
    var thetaDeg=30, n=3, rMod=1;
    var dataBtn=document.getElementById('ibhlDMDataBtn'), dataPanel=document.getElementById('ibhlDMDataPanel'),
        dataDesc=document.getElementById('ibhlDMDataDesc'), dataRows=document.getElementById('ibhlDMDataRows');
    wireDataToggle(dataBtn,dataPanel);
    function toRad(d){ return d*Math.PI/180; }
    function updateDataView(){
      if(!dataDesc) return;
      var nThetaNow=((thetaDeg*n)%360+360)%360;
      dataDesc.textContent='z = '+fmt(rMod,2)+' cis('+thetaDeg+'°), so by De Moivre z^'+n+' = '+fmt(Math.pow(rMod,n),3)+' cis('+n+' × '+thetaDeg+'°) = '+fmt(Math.pow(rMod,n),3)+' cis('+fmt(nThetaNow,1)+'°). The n-th roots of unity (unit circle, r = 1), with n = '+n+', are equally spaced 360°/'+n+' = '+fmt(360/n,1)+'° apart. z has |z| = r = '+fmt(rMod,2)+', so |z^n| = r^n = '+fmt(Math.pow(rMod,n),3)+' — '+(Math.abs(rMod-1)<1e-9?'on the unit circle like the roots themselves.':(rMod>1?'outside the unit circle, growing fast with n.':'inside the unit circle, shrinking with n.'));
      var rows=[];
      for(var k=0;k<n;k++){
        var ang=360*k/n;
        rows.push([k, fmt(ang,1)+'°', fmt(Math.cos(toRad(ang)),3), fmt(Math.sin(toRad(ang)),3)]);
      }
      renderDataRows(dataRows,rows);
    }
    function draw(ctx,w,h){
      var rn=Math.pow(rMod,n);
      var extent=Math.max(1.6, Math.abs(rn)*1.3, rMod*1.3);
      view.xmin=-extent; view.xmax=extent; view.ymin=-extent*0.72; view.ymax=extent*0.72;
      var P=new Plot(ctx,w,h,view,{l:26,r:10,t:10,b:20}); P.clear();
      var c=P.ctx, N=120, i, a, px, py;
      c.beginPath();
      for(i=0;i<=N;i++){ a=2*Math.PI*i/N; px=P.X(Math.cos(a)); py=P.Y(Math.sin(a)); if(i===0) c.moveTo(px,py); else c.lineTo(px,py); }
      c.closePath(); c.lineWidth=1.4; c.strokeStyle='#B8C3D6'; c.stroke();
      c.strokeStyle=AXIS; c.lineWidth=1;
      c.beginPath(); c.moveTo(P.X(view.xmin),P.Y(0)); c.lineTo(P.X(view.xmax),P.Y(0)); c.stroke();
      c.beginPath(); c.moveTo(P.X(0),P.Y(view.ymin)); c.lineTo(P.X(0),P.Y(view.ymax)); c.stroke();
      for(var k=0;k<n;k++){
        var rootAng=2*Math.PI*k/n;
        P.ring(Math.cos(rootAng),Math.sin(rootAng),MUTED,4.5);
      }
      var thetaRad=toRad(thetaDeg), zx=rMod*Math.cos(thetaRad), zy=rMod*Math.sin(thetaRad);
      P.segment(0,0,zx,zy,INDIGO,2.4);
      P.dot(zx,zy,INDIGO,5.5);
      var nThetaRad=thetaRad*n, znx=rn*Math.cos(nThetaRad), zny=rn*Math.sin(nThetaRad);
      P.segment(0,0,znx,zny,AMBER,2.2,[5,3]);
      P.dot(znx,zny,AMBER,5.5);
      var nThetaMod=((thetaDeg*n)%360+360)%360;
      document.getElementById('ibhlDMzn').textContent=fmt(rn,2)+' cis('+fmt(nThetaMod,1)+'°)';
      document.getElementById('ibhlDMspacing').textContent=fmt(360/n,1)+'°';
      var rnEl=document.getElementById('ibhlDMrn'); if(rnEl){ rnEl.textContent=fmt(rn,3); }
      updateDataView();
    }
    register(canvas,draw);
    var thetaSlider=document.getElementById('ibhlDMtheta'), nSlider=document.getElementById('ibhlDMn'), rSlider=document.getElementById('ibhlDMr');
    function upd(){
      thetaDeg=parseInt(thetaSlider.value,10); n=parseInt(nSlider.value,10);
      if(rSlider){ rMod=parseInt(rSlider.value,10)/10; }
      document.getElementById('ibhlDMthetaVal').textContent=thetaDeg+'°';
      document.getElementById('ibhlDMnVal').textContent=n;
      if(rSlider){ document.getElementById('ibhlDMrVal').textContent=fmt(rMod,1); }
      redrawAll();
    }
    thetaSlider.addEventListener('input',upd); nSlider.addEventListener('input',upd);
    if(rSlider){ rSlider.addEventListener('input',upd); }
    upd();
  })();

  /* IB HL TOPIC 2 — y=f(x) vs y=|f(x)|, and solving |f(x)|=k */
  (function(){
    var canvas=document.getElementById('ibhlModCanvas'); if(!canvas) return;
    var view={xmin:-4,xmax:4,ymin:-5,ymax:5};
    var k=1, absMode=false;
    function f(x){ return 0.5*x*x*x-2*x; }
    function g(x){ return absMode ? Math.abs(f(x)) : f(x); }
    var dataBtn=document.getElementById('ibhlModDataBtn'), dataPanel=document.getElementById('ibhlModDataPanel'),
        dataDesc=document.getElementById('ibhlModDataDesc'), dataRows=document.getElementById('ibhlModDataRows');
    wireDataToggle(dataBtn,dataPanel);
    function countSolutions(){
      var N=800, count=0, prev=g(view.xmin)-k;
      for(var i=1;i<=N;i++){
        var x=view.xmin+(view.xmax-view.xmin)*i/N;
        var cur=g(x)-k;
        if((prev<0 && cur>=0) || (prev>0 && cur<=0)){ count++; }
        prev=cur;
      }
      return count;
    }
    function updateDataView(count){
      if(!dataDesc) return;
      dataDesc.textContent='f(x) = 0.5x³ − 2x. '+(absMode ? 'Graphing y = |f(x)|.' : 'Graphing y = f(x).')+' The line y = '+fmt(k,1)+' crosses the curve '+count+' time'+(count===1?'':'s')+' — so '+(absMode ? '|f(x)| = '+fmt(k,1) : 'f(x) = '+fmt(k,1))+' has '+count+' real solution'+(count===1?'':'s')+' in this window.';
      var N=9, rows=[];
      for(var i=0;i<N;i++){ var x=view.xmin+(view.xmax-view.xmin)*i/(N-1); rows.push([fmt(x),fmt(f(x)),fmt(g(x))]); }
      renderDataRows(dataRows,rows);
    }
    function draw(ctx,w,h){
      var P=new Plot(ctx,w,h,view,{l:28,r:12,t:12,b:24}); P.clear(); P.grid();
      if(absMode){ P.curve(f,'#B8C3D6',1.6,[3,3]); }
      P.curve(g,INDIGO,2.4);
      P.segment(view.xmin,k,view.xmax,k,AMBER2,2.2,[6,4]);
      var count=countSolutions();
      document.getElementById('ibhlModCount').textContent=count;
      updateDataView(count);
    }
    register(canvas,draw);
    var sK=document.getElementById('ibhlModK'), cbAbs=document.getElementById('ibhlModAbs');
    function upd(){
      k=parseFloat(sK.value);
      if(cbAbs){ absMode=cbAbs.checked; }
      document.getElementById('ibhlModKVal').textContent=fmt(k,1);
      redrawAll();
    }
    sK.addEventListener('input',upd);
    if(cbAbs){ cbAbs.addEventListener('change',upd); }
    upd();
  })();

  /* IB HL AA — inverse trig functions and their derivatives */
  (function(){
    var canvas=document.getElementById('ibhlInvTrigCanvas'); if(!canvas) return;
    var fnName='arcsin', a=0.5;
    var dataBtn=document.getElementById('ibhlInvTrigDataBtn'), dataPanel=document.getElementById('ibhlInvTrigDataPanel'),
        dataDesc=document.getElementById('ibhlInvTrigDataDesc'), dataRows=document.getElementById('ibhlInvTrigDataRows');
    wireDataToggle(dataBtn,dataPanel);
    function fn(x){
      if(fnName==='arcsin'){ return Math.asin(x); }
      if(fnName==='arccos'){ return Math.acos(x); }
      return Math.atan(x);
    }
    function deriv(x){
      if(fnName==='arcsin'){ return 1/Math.sqrt(1-x*x); }
      if(fnName==='arccos'){ return -1/Math.sqrt(1-x*x); }
      return 1/(1+x*x);
    }
    function viewFor(){
      if(fnName==='arcsin'){ return {xmin:-1.05,xmax:1.05,ymin:-2.2,ymax:2.2}; }
      if(fnName==='arccos'){ return {xmin:-1.05,xmax:1.05,ymin:-0.4,ymax:3.5}; }
      return {xmin:-5.5,xmax:5.5,ymin:-2.2,ymax:2.2};
    }
    function updateDataView(av,fav,dav){
      if(!dataDesc) return;
      dataDesc.textContent='y = '+fnName+'(x). At x = '+fmt(av,3)+', f(x) = '+fmt(fav,3)+', f′(x) = '+fmt(dav,3)+'.';
      var v=viewFor(), N=9, rows=[];
      for(var i=0;i<N;i++){ var x=v.xmin+0.02+(v.xmax-v.xmin-0.04)*i/(N-1); rows.push([fmt(x),fmt(fn(x)),fmt(deriv(x))]); }
      renderDataRows(dataRows,rows);
    }
    function draw(ctx,w,h){
      var view=viewFor();
      var P=new Plot(ctx,w,h,view,{l:28,r:12,t:12,b:24}); P.clear(); P.grid();
      P.curve(fn,INDIGO,2.4);
      P.curve(deriv,AMBER2,2,[5,4]);
      var lim = fnName==='arctan' ? 5.2 : 0.98;
      var av=Math.max(-lim,Math.min(lim,a));
      var fav=fn(av), dav=deriv(av);
      P.dot(av,fav,INK,5);
      document.getElementById('ibhlInvTrigFA').textContent=fmt(fav,3);
      document.getElementById('ibhlInvTrigDA').textContent=fmt(dav,3);
      updateDataView(av,fav,dav);
    }
    register(canvas,draw);
    var sFn=document.getElementById('ibhlInvTrigFn'), sA=document.getElementById('ibhlInvTrigA');
    function upd(){
      if(sFn){ fnName=sFn.value; }
      a=parseFloat(sA.value)/100;
      var lim = fnName==='arctan' ? 5.2 : 0.98;
      if(a>lim){ a=lim; } if(a<-lim){ a=-lim; }
      document.getElementById('ibhlInvTrigAVal').textContent=fmt(a,2);
      redrawAll();
    }
    if(sFn){ sFn.addEventListener('change',upd); }
    sA.addEventListener('input',upd); upd();
  })();

  /* IB HL AI — Markov chain, two states, approach to steady state */
  (function(){
    var canvas=document.getElementById('ibhlMarkovCanvas'); if(!canvas) return;
    var view={xmin:0,xmax:15,ymin:0,ymax:1};
    var p=0.7, q=0.6, x0=1;
    var dataBtn=document.getElementById('ibhlMarkovDataBtn'), dataPanel=document.getElementById('ibhlMarkovDataPanel'),
        dataDesc=document.getElementById('ibhlMarkovDataDesc'), dataRows=document.getElementById('ibhlMarkovDataRows');
    wireDataToggle(dataBtn,dataPanel);
    function series(){
      var xs=[x0];
      for(var i=1;i<=15;i++){ var prev=xs[i-1]; xs.push(prev*p+(1-prev)*(1-q)); }
      return xs;
    }
    function updateDataView(xs,piA){
      if(!dataDesc) return;
      dataDesc.textContent='Transition matrix P(A→A) = '+fmt(p,2)+', P(B→B) = '+fmt(q,2)+', starting P(A) = '+fmt(x0,2)+'. Steady state πA = '+fmt(piA,3)+'.';
      var rows=[];
      [0,3,6,9,12,15].forEach(function(n){ rows.push([n, fmt(xs[n],4)]); });
      renderDataRows(dataRows,rows);
    }
    function draw(ctx,w,h){
      var P=new Plot(ctx,w,h,view,{l:30,r:12,t:12,b:24}); P.clear(); P.grid();
      var xs=series();
      for(var i=0;i<xs.length-1;i++){ P.segment(i,xs[i],i+1,xs[i+1],INDIGO,2.2); }
      for(var i=0;i<xs.length;i++){ P.dot(i,xs[i],INDIGO,3.5); }
      var denom=(1-p)+(1-q);
      var piA = denom>1e-9 ? (1-q)/denom : x0;
      P.segment(0,piA,15,piA,AMBER2,1.6,[5,4]);
      document.getElementById('ibhlMarkovSteady').textContent=fmt(piA,3);
      document.getElementById('ibhlMarkovX15').textContent=fmt(xs[15],3);
      updateDataView(xs,piA);
    }
    register(canvas,draw);
    var sP=document.getElementById('ibhlMarkovP'), sQ=document.getElementById('ibhlMarkovQ'), sX0=document.getElementById('ibhlMarkovX0');
    function upd(){
      p=parseFloat(sP.value); q=parseFloat(sQ.value); x0=parseFloat(sX0.value);
      document.getElementById('ibhlMarkovPVal').textContent=fmt(p,2);
      document.getElementById('ibhlMarkovQVal').textContent=fmt(q,2);
      document.getElementById('ibhlMarkovX0Val').textContent=fmt(x0,2);
      redrawAll();
    }
    sP.addEventListener('input',upd); sQ.addEventListener('input',upd); sX0.addEventListener('input',upd); upd();
  })();

  /* IB HL AI HL — Kruskal's algorithm, step by step, on the fixed
     5-vertex graph from the Practice Problem below (AB=3, BC=2, CD=4,
     DE=1, AC=7, BD=5, CE=6, AD=8). Re-run from scratch on every slider
     move rather than caching state, since the step count can move
     either direction. */
  (function(){
    var canvas=document.getElementById('ibhlKruskalCanvas'); if(!canvas) return;
    var view={xmin:-1,xmax:11,ymin:-1,ymax:9};
    var step=4;
    var verts={A:[0,6],B:[5,8],C:[10,6],D:[7,0],E:[2,0]};
    var edges=[
      {a:'D',b:'E',w:1},{a:'B',b:'C',w:2},{a:'A',b:'B',w:3},{a:'C',b:'D',w:4},
      {a:'B',b:'D',w:5},{a:'C',b:'E',w:6},{a:'A',b:'C',w:7},{a:'A',b:'D',w:8}
    ];
    var dataBtn=document.getElementById('ibhlKruskalDataBtn'), dataPanel=document.getElementById('ibhlKruskalDataPanel'),
        dataDesc=document.getElementById('ibhlKruskalDataDesc'), dataRows=document.getElementById('ibhlKruskalDataRows');
    wireDataToggle(dataBtn,dataPanel);
    function run(upTo){
      var parent={A:'A',B:'B',C:'C',D:'D',E:'E'};
      function find(x){ while(parent[x]!==x){ x=parent[x]; } return x; }
      var results=[], weight=0, count=0, i, e, ra, rb;
      for(i=0;i<edges.length;i++){
        e=edges[i];
        if(i>=upTo){ results.push({e:e,decision:null}); continue; }
        ra=find(e.a); rb=find(e.b);
        if(ra!==rb){ parent[ra]=rb; results.push({e:e,decision:'add'}); weight+=e.w; count++; }
        else { results.push({e:e,decision:'skip'}); }
      }
      return {results:results,weight:weight,count:count};
    }
    function updateDataView(r){
      if(!dataDesc) return;
      dataDesc.textContent='Edges sorted by weight, considering the first '+step+' of 8. MST weight so far = '+r.weight+', edges in tree = '+r.count+' of 4 needed.';
      var rows=r.results.map(function(item){
        var lbl=item.e.a+item.e.b;
        var dec = item.decision===null ? '—' : (item.decision==='add' ? 'added' : 'skipped (cycle)');
        return [lbl,item.e.w,dec];
      });
      renderDataRows(dataRows,rows);
    }
    function draw(ctx,w,h){
      var P=new Plot(ctx,w,h,view,{l:16,r:16,t:16,b:16}); P.clear();
      var c=P.ctx;
      var r=run(step);
      var i,e,res,pa,pb,color,dash,lw,mx,my;
      for(i=0;i<edges.length;i++){
        e=edges[i]; res=r.results[i];
        pa=verts[e.a]; pb=verts[e.b];
        color = res.decision==='add' ? '#1a9e5c' : (res.decision==='skip' ? '#AEB8C7' : '#E4E8EE');
        dash = res.decision==='add' ? null : (res.decision==='skip' ? [5,4] : null);
        lw = res.decision==='add' ? 3 : (res.decision==='skip' ? 1.6 : 1.2);
        P.segment(pa[0],pa[1],pb[0],pb[1],color,lw,dash);
        mx=(pa[0]+pb[0])/2; my=(pa[1]+pb[1])/2;
        c.font=FONT; c.fillStyle=MUTED; c.textAlign='center'; c.textBaseline='middle';
        c.fillText(String(e.w), P.X(mx), P.Y(my));
      }
      Object.keys(verts).forEach(function(v){
        var pt=verts[v];
        P.dot(pt[0],pt[1],INK,7);
        c.font=FONT; c.fillStyle=INK; c.textAlign='center'; c.textBaseline='bottom';
        c.fillText(v, P.X(pt[0]), P.Y(pt[1])-10);
      });
      document.getElementById('ibhlKruskalWeight').textContent=String(r.weight);
      document.getElementById('ibhlKruskalCount').textContent=r.count+' of 4 needed';
      updateDataView(r);
    }
    register(canvas,draw);
    var sStep=document.getElementById('ibhlKruskalStep');
    function upd(){
      step=parseInt(sStep.value,10);
      document.getElementById('ibhlKruskalStepVal').textContent=step;
      redrawAll();
    }
    sStep.addEventListener('input',upd);
    upd();
  })();

  /* ===================== CONTINUITY CASES EXPLORER ===================== */
  function initContExplorer(pfx){
    var canvas=document.getElementById(pfx+'Canvas'); if(!canvas) return;
    var sX=document.getElementById(pfx+'X'), sCase=document.getElementById(pfx+'Case');
    var elXV=document.getElementById(pfx+'XV'), elXOut=document.getElementById(pfx+'XOut'),
        elFxOut=document.getElementById(pfx+'FxOut'), elLeftLim=document.getElementById(pfx+'LeftLim'),
        elRightLim=document.getElementById(pfx+'RightLim'), elStatus=document.getElementById(pfx+'Status');
    var dataBtn=document.getElementById(pfx+'DataBtn'), dataPanel=document.getElementById(pfx+'DataPanel'),
        dataDesc=document.getElementById(pfx+'DataDesc'), dataRows=document.getElementById(pfx+'DataRows');
    wireDataToggle(dataBtn,dataPanel);

    var cVal = 1;
    var currCase = 'cont';
    var xVal = 0.525;
    var view = {xmin: -0.5, xmax: 2.5, ymin: -2, ymax: 5};

    function evalCase(tCase, x){
      var eps = 1e-6;
      if(tCase === 'cont'){
        var y = 0.5*(x-cVal)*(x-cVal) + 1.5;
        return {
          y: y, leftLim: '1.500', rightLim: '1.500', fAtC: 1.5,
          name: 'Case 1 · Continuous',
          cond1: true, cond2: true, cond3: true,
          status: 'Continuous at c = 1 ✔ (f(c)=1.5, lim=1.5)'
        };
      } else if(tCase === 'hole'){
        var isHole = Math.abs(x - cVal) < eps;
        return {
          y: isHole ? null : (x + 1), leftLim: '2.000', rightLim: '2.000', fAtC: null,
          name: 'Case 2 · Removable (Hole)',
          cond1: false, cond2: true, cond3: false,
          status: 'Removable Discontinuity ❌ (f(1) is undefined)'
        };
      } else if(tCase === 'pt'){
        var isPt = Math.abs(x - cVal) < eps;
        return {
          y: isPt ? 3.8 : (x + 1), leftLim: '2.000', rightLim: '2.000', fAtC: 3.8,
          name: 'Case 3 · Removable (Displaced Point)',
          cond1: true, cond2: true, cond3: false,
          status: 'Removable Discontinuity ❌ (f(1)=3.8 ≠ lim=2.0)'
        };
      } else if(tCase === 'jump'){
        var yJump = x < cVal ? (x + 0.5) : (x + 2);
        return {
          y: yJump, leftLim: '1.500', rightLim: '3.000', fAtC: 3.0,
          name: 'Case 4 · Jump Discontinuity',
          cond1: true, cond2: false, cond3: false,
          status: 'Jump Discontinuity ❌ (lim x→1⁻ ≠ lim x→1⁺)'
        };
      } else if(tCase === 'inf'){
        var isInf = Math.abs(x - cVal) < eps;
        var yInf = isInf ? null : 1 / (x - cVal);
        return {
          y: yInf, leftLim: '−∞', rightLim: '+∞', fAtC: null,
          name: 'Case 5 · Infinite Discontinuity',
          cond1: false, cond2: false, cond3: false,
          status: 'Infinite Discontinuity ❌ (Vertical asymptote x = 1)'
        };
      } else {
        var isOsc = Math.abs(x - cVal) < eps;
        var yOsc = isOsc ? 0 : Math.sin(2 / (x - cVal));
        return {
          y: yOsc, leftLim: 'DNE (oscillates)', rightLim: 'DNE (oscillates)', fAtC: 0,
          name: 'Case 6 · Oscillating Discontinuity',
          cond1: true, cond2: false, cond3: false,
          status: 'Essential Discontinuity ❌ (Infinitely oscillates in [−1, 1])'
        };
      }
    }

    function updateDataView(){
      if(!dataDesc) return;
      var cur = evalCase(currCase, xVal);
      var yStr = cur.y === null ? 'undefined' : fmt(cur.y, 3);
      dataDesc.textContent = 'Continuity Analysis for ' + cur.name + ' at c = 1. Current input probe x = ' + fmt(xVal, 3) + ', output f(x) = ' + yStr + '. Left-hand limit: ' + cur.leftLim + ', Right-hand limit: ' + cur.rightLim + '. Continuity Checklist: (1) f(c) defined: ' + (cur.cond1 ? 'Yes' : 'No') + '; (2) lim exists: ' + (cur.cond2 ? 'Yes' : 'No') + '; (3) lim = f(c): ' + (cur.cond3 ? 'Yes' : 'No') + '. Conclusion: ' + cur.status + '.';

      var rows = [];
      var samplePoints = [0.0, 0.5, 0.8, 0.95, 0.99, 1.0, 1.01, 1.05, 1.2, 1.5, 2.0];
      for(var i=0; i<samplePoints.length; i++){
        var px = samplePoints[i];
        var pInfo = evalCase(currCase, px);
        var pY = pInfo.y === null ? 'undefined' : fmt(pInfo.y, 3);
        rows.push([fmt(px, 2), pY, pInfo.leftLim, pInfo.rightLim, pInfo.status]);
      }
      renderDataRows(dataRows, rows);
    }

    function draw(ctx, w, h){
      var P = new Plot(ctx, w, h, view, {l: 34, r: 14, t: 16, b: 26});
      P.clear(); P.grid();

      var cur = evalCase(currCase, xVal);

      if(currCase === 'cont'){
        P.curve(function(x){ return 0.5*(x-cVal)*(x-cVal) + 1.5; }, INDIGO, 2.6);
        P.dot(cVal, 1.5, INDIGO, 5.5);
      } else if(currCase === 'hole'){
        P.curve(function(x){ return x + 1; }, INDIGO, 2.6);
        P.ring(cVal, 2.0, INDIGO, 5.5);
      } else if(currCase === 'pt'){
        P.curve(function(x){ return x + 1; }, INDIGO, 2.6);
        P.ring(cVal, 2.0, INDIGO, 5.5);
        P.dot(cVal, 3.8, AMBER2, 6.0);
      } else if(currCase === 'jump'){
        var cLeft = ctx; cLeft.save(); cLeft.beginPath();
        cLeft.rect(P.pad.l, P.pad.t, P.X(cVal) - P.pad.l, P.h - P.pad.t - P.pad.b); cLeft.clip();
        P.curve(function(x){ return x + 0.5; }, INDIGO, 2.6);
        cLeft.restore();
        var cRight = ctx; cRight.save(); cRight.beginPath();
        cRight.rect(P.X(cVal), P.pad.t, P.w - P.pad.r - P.X(cVal), P.h - P.pad.t - P.pad.b); cRight.clip();
        P.curve(function(x){ return x + 2.0; }, INDIGO, 2.6);
        cRight.restore();
        P.ring(cVal, 1.5, INDIGO, 5.5);
        P.dot(cVal, 3.0, INDIGO, 5.5);
      } else if(currCase === 'inf'){
        P.vline(cVal, '#e11d48', [5, 4]);
        var cLInf = ctx; cLInf.save(); cLInf.beginPath();
        cLInf.rect(P.pad.l, P.pad.t, P.X(cVal) - P.pad.l, P.h - P.pad.t - P.pad.b); cLInf.clip();
        P.curve(function(x){ return 1/(x-cVal); }, INDIGO, 2.4);
        cLInf.restore();
        var cRInf = ctx; cRInf.save(); cRInf.beginPath();
        cRInf.rect(P.X(cVal), P.pad.t, P.w - P.pad.r - P.X(cVal), P.h - P.pad.t - P.pad.b); cRInf.clip();
        P.curve(function(x){ return 1/(x-cVal); }, INDIGO, 2.4);
        cRInf.restore();
      } else if(currCase === 'osc'){
        P.curve(function(x){
          if(Math.abs(x - cVal) < 0.005) return null;
          return Math.sin(2 / (x - cVal));
        }, INDIGO, 1.8);
        P.dot(cVal, 0, AMBER2, 4.5);
      }

      P.vline(xVal, 'rgba(184,128,31,.45)', [4, 4]);
      if(cur.y !== null && isFinite(cur.y) && cur.y >= view.ymin && cur.y <= view.ymax){
        P.dot(xVal, cur.y, AMBER2, 5.5);
        P.segment(xVal, 0, xVal, cur.y, 'rgba(184,128,31,.35)', 1.2, [3, 3]);
      }

      if(elXV) elXV.textContent = fmt(xVal, 2);
      if(elXOut) elXOut.textContent = fmt(xVal, 3);
      if(elFxOut) elFxOut.textContent = cur.y === null ? 'undefined' : fmt(cur.y, 3);
      if(elLeftLim) elLeftLim.textContent = cur.leftLim;
      if(elRightLim) elRightLim.textContent = cur.rightLim;
      if(elStatus) elStatus.textContent = cur.status;

      updateDataView();
    }

    register(canvas, draw);

    function syncState(){
      if(sCase) currCase = sCase.value;
      if(sX){
        var raw = parseFloat(sX.value);
        xVal = 1.0 + (raw / 20) * 0.95;
        if(Math.abs(xVal - 1.0) < 0.01) xVal = raw < 0 ? 0.985 : 1.015;
      }
      updateDataView();
      redrawAll();
    }

    if(sX){ sX.addEventListener('input', syncState); sX.addEventListener('change', syncState); }
    if(sCase){ sCase.addEventListener('change', syncState); }
    syncState();
  }

  /* ===================== EPSILON-DELTA LIMIT EXPLORER ===================== */
  function initEpsDeltaExplorer(pfx){
    var canvas=document.getElementById(pfx+'Canvas'); if(!canvas) return;
    var sEps=document.getElementById(pfx+'Eps'), sDelta=document.getElementById(pfx+'Delta');
    var elEpsV=document.getElementById(pfx+'EpsV'), elDeltaV=document.getElementById(pfx+'DeltaV'),
        elMaxDelta=document.getElementById(pfx+'MaxDelta'), elValid=document.getElementById(pfx+'Valid');
    var dataBtn=document.getElementById(pfx+'DataBtn'), dataPanel=document.getElementById(pfx+'DataPanel'),
        dataDesc=document.getElementById(pfx+'DataDesc'), dataRows=document.getElementById(pfx+'DataRows');
    wireDataToggle(dataBtn,dataPanel);

    var cVal = 2.0, LVal = 3.0;
    function f(x){ return 2*x - 1; }
    var view = {xmin: 0.5, xmax: 3.5, ymin: 0.5, ymax: 5.5};

    var epsVal = 0.50, deltaVal = 0.25;

    function updateDataView(){
      if(!dataDesc) return;
      var maxDelta = epsVal / 2;
      var isValid = deltaVal <= maxDelta + 1e-5;
      dataDesc.textContent = 'Precise (ε, δ) definition visualizer for f(x) = 2x − 1 at target point c = 2, limit L = 3. Current error tolerance ε = ' + fmt(epsVal, 2) + ' (corridor [' + fmt(LVal - epsVal, 2) + ', ' + fmt(LVal + epsVal, 2) + ']), probe radius δ = ' + fmt(deltaVal, 2) + ' (interval [' + fmt(cVal - deltaVal, 2) + ', ' + fmt(cVal + deltaVal, 2) + ']). Maximum valid δ = ε / 2 = ' + fmt(maxDelta, 3) + '. Condition 0 < |x - 2| < δ ⇒ |f(x) - 3| < ε is ' + (isValid ? 'SATISFIED ✔' : 'VIOLATED (δ too large, curve escapes ε-corridor) ❌') + '.';

      var sampleXs = [cVal - deltaVal, cVal - deltaVal/2, cVal, cVal + deltaVal/2, cVal + deltaVal];
      var rows = [];
      for(var i=0; i<sampleXs.length; i++){
        var sx = sampleXs[i];
        var sy = f(sx);
        var err = Math.abs(sy - LVal);
        var inBand = err < epsVal + 1e-5;
        rows.push([fmt(sx, 3), fmt(sy, 3), fmt(err, 3), inBand ? 'Inside ε-band ✔' : 'Escapes band ❌']);
      }
      renderDataRows(dataRows, rows);
    }

    function draw(ctx, w, h){
      var P = new Plot(ctx, w, h, view, {l: 34, r: 14, t: 16, b: 26});
      P.clear(); P.grid();

      var maxDelta = epsVal / 2;
      var isValid = deltaVal <= maxDelta + 1e-5;

      var Ytop = P.Y(LVal + epsVal), Ybot = P.Y(LVal - epsVal);
      ctx.fillStyle = isValid ? 'rgba(16, 185, 129, 0.12)' : 'rgba(239, 68, 68, 0.12)';
      ctx.fillRect(P.pad.l, Ytop, P.w - P.pad.l - P.pad.r, Ybot - Ytop);

      P.segment(view.xmin, LVal + epsVal, view.xmax, LVal + epsVal, isValid ? '#10b981' : '#ef4444', 1.2, [4, 4]);
      P.segment(view.xmin, LVal - epsVal, view.xmax, LVal - epsVal, isValid ? '#10b981' : '#ef4444', 1.2, [4, 4]);

      var Xleft = P.X(cVal - deltaVal), Xright = P.X(cVal + deltaVal);
      ctx.fillStyle = 'rgba(99, 102, 241, 0.10)';
      ctx.fillRect(Xleft, P.pad.t, Xright - Xleft, P.h - P.pad.t - P.pad.b);

      P.vline(cVal - deltaVal, INDIGO2, [5, 4]);
      P.vline(cVal + deltaVal, INDIGO2, [5, 4]);

      P.curve(f, INDIGO, 2.2);
      P.segment(cVal - deltaVal, f(cVal - deltaVal), cVal + deltaVal, f(cVal + deltaVal), isValid ? '#10b981' : '#ef4444', 3.4);
      P.ring(cVal, LVal, AMBER2, 6);

      if(elEpsV) elEpsV.textContent = fmt(epsVal, 2);
      if(elDeltaV) elDeltaV.textContent = fmt(deltaVal, 2);
      if(elMaxDelta) elMaxDelta.textContent = fmt(maxDelta, 3);
      if(elValid){
        elValid.textContent = isValid ? 'Valid: curve inside ε-band ✔' : 'Too large: curve escapes ε-band ❌';
        elValid.style.color = isValid ? 'var(--emerald, #10b981)' : 'var(--crimson, #ef4444)';
      }

      updateDataView();
    }

    register(canvas, draw);

    function syncState(){
      if(sEps) epsVal = parseFloat(sEps.value);
      if(sDelta) deltaVal = parseFloat(sDelta.value);
      updateDataView();
      redrawAll();
    }

    if(sEps){ sEps.addEventListener('input', syncState); sEps.addEventListener('change', syncState); }
    if(sDelta){ sDelta.addEventListener('input', syncState); sDelta.addEventListener('change', syncState); }
    syncState();
  }

  // Initialize ibhl track explorers
  initContExplorer('ibhlCont');
  initEpsDeltaExplorer('ibhlEps');
})(window.CSExplorerKit);

