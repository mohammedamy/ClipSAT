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
    var view={xmin:-6,xmax:6,ymin:-6,ymax:6,square:true,step:1};
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

  /* ===================== A2 · 3D LINE & PLANE INTERSECTION ===================== */
  (function(){
    var canvas=document.getElementById('a2LinePlaneCanvas'); if(!canvas) return;
    var btn=document.getElementById('a2LinePlane3dBtn'), wrap=document.getElementById('a2LinePlane3dWrap'), hint=document.getElementById('a2LinePlane3dHint');
    var sA=document.getElementById('a2PlaneA'), sB=document.getElementById('a2PlaneB'), sC=document.getElementById('a2PlaneC'), sD=document.getElementById('a2PlaneD'), sTilt=document.getElementById('a2LineTilt');
    var dataBtn=document.getElementById('a2LinePlaneDataBtn'), dataPanel=document.getElementById('a2LinePlaneDataPanel'),
        dataDesc=document.getElementById('a2LinePlaneDataDesc'), dataRows=document.getElementById('a2LinePlaneDataRows');
    wireDataToggle(dataBtn,dataPanel);

    var na=1, nb=2, nc=2, d=4, dx=2;
    var built=false, H=null, planeMesh=null, wireMesh=null, normalArrow=null, lineObj=null, pointMesh=null;

    function mathState(){
      var lenN=Math.sqrt(na*na+nb*nb+nc*nc); if(lenN<1e-6){ lenN=1; nc=1; }
      var p0=[0,1,0], dVec=[dx,1,1];
      var lenD=Math.sqrt(dVec[0]*dVec[0]+dVec[1]*dVec[1]+dVec[2]*dVec[2]);
      var dotDN=na*dVec[0]+nb*dVec[1]+nc*dVec[2];
      var sinTheta=Math.abs(dotDN)/(lenN*lenD);
      sinTheta=Math.max(0, Math.min(1, sinTheta));
      var thetaDeg=Math.asin(sinTheta)*180/Math.PI;

      var hasIntersect=Math.abs(dotDN)>1e-4;
      var lambda=hasIntersect?(d-(na*p0[0]+nb*p0[1]+nc*p0[2]))/dotDN:0;
      var ip=[p0[0]+lambda*dVec[0], p0[1]+lambda*dVec[1], p0[2]+lambda*dVec[2]];

      return {
        na:na, nb:nb, nc:nc, lenN:lenN, d:d,
        p0:p0, dVec:dVec, lenD:lenD, dotDN:dotDN,
        hasIntersect:hasIntersect, lambda:lambda, ip:ip,
        sinTheta:sinTheta, thetaDeg:thetaDeg
      };
    }

    function updateReadouts(st){
      var eqEl=document.getElementById('a2PlaneEq'); if(eqEl){
        var parts=[];
        if(st.na!==0) parts.push((st.na===1?'':st.na===-1?'-':st.na)+'x');
        if(st.nb!==0) parts.push((parts.length?(st.nb>0?'+ ':'- '):st.nb<0?'-':'')+(Math.abs(st.nb)===1?'':Math.abs(st.nb))+'y');
        if(st.nc!==0) parts.push((parts.length?(st.nc>0?'+ ':'- '):st.nc<0?'-':'')+(Math.abs(st.nc)===1?'':Math.abs(st.nc))+'z');
        eqEl.textContent=(parts.join(' ')||'0')+' = '+st.d;
      }
      var normEl=document.getElementById('a2PlaneNormal'); if(normEl) normEl.textContent='⟨'+st.na+', '+st.nb+', '+st.nc+'⟩';
      var lineEl=document.getElementById('a2LineEq'); if(lineEl) lineEl.textContent='⟨0, 1, 0⟩ + λ⟨'+st.dVec[0]+', 1, 1⟩';
      var intEl=document.getElementById('a2LineIntersect'); if(intEl){
        intEl.textContent=st.hasIntersect?'I('+fmt(st.ip[0],2)+', '+fmt(st.ip[1],2)+', '+fmt(st.ip[2],2)+')':'Parallel (No unique I)';
      }
      var angEl=document.getElementById('a2LineAngleOut'); if(angEl) angEl.textContent=fmt(st.thetaDeg,1)+'°';

      if(dataDesc){
        dataDesc.textContent='Plane Π: '+st.na+'x + '+st.nb+'y + '+st.nc+'z = '+st.d+'. Normal n = ⟨'+st.na+', '+st.nb+', '+st.nc+'⟩. Line r = ⟨0,1,0⟩ + λ⟨'+st.dVec[0]+',1,1⟩. '+(st.hasIntersect?'Intersection point I = ('+fmt(st.ip[0],2)+', '+fmt(st.ip[1],2)+', '+fmt(st.ip[2],2)+') with angle θ = '+fmt(st.thetaDeg,1)+'°.':'Line is parallel to plane.');
      }
      renderDataRows(dataRows,[
        ['Plane Normal n', '⟨'+st.na+', '+st.nb+', '+st.nc+'⟩'],
        ['Plane Equation', st.na+'x + '+st.nb+'y + '+st.nc+'z = '+st.d],
        ['Line Direction d', '⟨'+st.dVec[0]+', 1, 1⟩'],
        ['Line-Plane Angle θ', fmt(st.thetaDeg,1)+'° (sin θ = '+fmt(st.sinTheta,3)+')'],
        ['Intersection Point I', st.hasIntersect?'('+fmt(st.ip[0],2)+', '+fmt(st.ip[1],2)+', '+fmt(st.ip[2],2)+')':'Parallel']
      ]);
    }

    /* 2D Canvas Isometric Drawing */
    function projectIso(x,y,z,cx,cy,sc){
      var cos30=0.866, sin30=0.5;
      var px=cx + sc*(y*cos30 - x*cos30);
      var py=cy - sc*(z - (x+y)*sin30*0.55);
      return [px,py];
    }

    function draw(ctx,w,ht){
      ctx.clearRect(0,0,w,ht);
      var cx=w*0.5, cy=ht*0.55, sc=Math.min(w,ht)*0.11;
      var st=mathState();
      updateReadouts(st);

      // Coordinate axes
      ctx.lineWidth=1; ctx.strokeStyle=GRID||'#8C97A8'; ctx.fillStyle=MUTED||'#6B7280';
      ctx.font='11px sans-serif';
      var o=projectIso(0,0,0,cx,cy,sc);
      var axX=projectIso(4,0,0,cx,cy,sc), axY=projectIso(0,4,0,cx,cy,sc), axZ=projectIso(0,0,4,cx,cy,sc);

      ctx.beginPath(); ctx.moveTo(o[0],o[1]); ctx.lineTo(axX[0],axX[1]); ctx.stroke();
      ctx.fillText('+x', axX[0]+4, axX[1]);
      ctx.beginPath(); ctx.moveTo(o[0],o[1]); ctx.lineTo(axY[0],axY[1]); ctx.stroke();
      ctx.fillText('+y', axY[0]+4, axY[1]);
      ctx.beginPath(); ctx.moveTo(o[0],o[1]); ctx.lineTo(axZ[0],axZ[1]); ctx.stroke();
      ctx.fillText('+z', axZ[0]-4, axZ[1]-6);

      // Construct plane quad in space
      var nUnit=[st.na/st.lenN, st.nb/st.lenN, st.nc/st.lenN];
      var kVec=Math.abs(nUnit[2])<0.9?[0,0,1]:[0,1,0];
      // u = n x k
      var u=[nUnit[1]*kVec[2]-nUnit[2]*kVec[1], nUnit[2]*kVec[0]-nUnit[0]*kVec[2], nUnit[0]*kVec[1]-nUnit[1]*kVec[0]];
      var uLen=Math.sqrt(u[0]*u[0]+u[1]*u[1]+u[2]*u[2]); if(uLen<1e-6) u=[1,0,0]; else { u[0]/=uLen; u[1]/=uLen; u[2]/=uLen; }
      // v = n x u
      var v=[nUnit[1]*u[2]-nUnit[2]*u[1], nUnit[2]*u[0]-nUnit[0]*u[2], nUnit[0]*u[1]-nUnit[1]*u[0]];

      var pDist=st.d/st.lenN;
      var cPt=[nUnit[0]*pDist, nUnit[1]*pDist, nUnit[2]*pDist];
      var S=2.6;
      var corners=[
        [cPt[0]-S*u[0]-S*v[0], cPt[1]-S*u[1]-S*v[1], cPt[2]-S*u[2]-S*v[2]],
        [cPt[0]+S*u[0]-S*v[0], cPt[1]+S*u[1]-S*v[1], cPt[2]+S*u[2]-S*v[2]],
        [cPt[0]+S*u[0]+S*v[0], cPt[1]+S*u[1]+S*v[1], cPt[2]+S*u[2]+S*v[2]],
        [cPt[0]-S*u[0]+S*v[0], cPt[1]-S*u[1]+S*v[1], cPt[2]-S*u[2]+S*v[2]]
      ];
      var cp=corners.map(function(pt){ return projectIso(pt[0],pt[1],pt[2],cx,cy,sc); });

      // Draw plane polygon
      ctx.beginPath();
      ctx.moveTo(cp[0][0],cp[0][1]);
      for(var i=1;i<4;i++) ctx.lineTo(cp[i][0],cp[i][1]);
      ctx.closePath();
      ctx.fillStyle='rgba(30, 58, 110, 0.22)'; ctx.fill();
      ctx.strokeStyle=INDIGO||'#1E3A6E'; ctx.lineWidth=1.8; ctx.stroke();

      // Normal vector arrow from center of plane
      var cIso=projectIso(cPt[0],cPt[1],cPt[2],cx,cy,sc);
      var nTip=projectIso(cPt[0]+2.2*nUnit[0], cPt[1]+2.2*nUnit[1], cPt[2]+2.2*nUnit[2], cx,cy,sc);
      ctx.beginPath(); ctx.moveTo(cIso[0],cIso[1]); ctx.lineTo(nTip[0],nTip[1]);
      ctx.strokeStyle=AMBER2||'#C8902A'; ctx.lineWidth=2.6; ctx.stroke();
      arrow(ctx, cIso[0], cIso[1], nTip[0], nTip[1], 8, AMBER2||'#C8902A');
      ctx.fillStyle=AMBER2||'#C8902A'; ctx.font='bold 12px sans-serif';
      ctx.fillText('n', nTip[0]+6, nTip[1]-2);

      // Line r = P0 + lambda * d
      var lP1=projectIso(st.p0[0]-2.8*st.dVec[0], st.p0[1]-2.8*st.dVec[1], st.p0[2]-2.8*st.dVec[2], cx,cy,sc);
      var lP2=projectIso(st.p0[0]+2.8*st.dVec[0], st.p0[1]+2.8*st.dVec[1], st.p0[2]+2.8*st.dVec[2], cx,cy,sc);
      ctx.beginPath(); ctx.moveTo(lP1[0],lP1[1]); ctx.lineTo(lP2[0],lP2[1]);
      ctx.strokeStyle='#2B5BA8'; ctx.lineWidth=2.2; ctx.stroke();

      // Intersection point
      if(st.hasIntersect){
        var ipIso=projectIso(st.ip[0],st.ip[1],st.ip[2],cx,cy,sc);
        ctx.beginPath(); ctx.arc(ipIso[0],ipIso[1],5.5,0,2*Math.PI);
        ctx.fillStyle='#E11D48'; ctx.fill(); ctx.strokeStyle='#FFF'; ctx.lineWidth=1.5; ctx.stroke();
        ctx.fillStyle=INK||'#0E1726'; ctx.font='bold 11px sans-serif';
        ctx.fillText('I', ipIso[0]+7, ipIso[1]-4);
      }
    }

    /* 3D WebGL Scene Builder */
    function update3dScene(){
      if(!H) return;
      var T=H.THREE, st=mathState();
      var nUnit=new T.Vector3(st.na/st.lenN, st.nb/st.lenN, st.nc/st.lenN);
      var pDist=st.d/st.lenN;
      var center=new T.Vector3().copy(nUnit).multiplyScalar(pDist);

      if(planeMesh){
        planeMesh.position.copy(center);
        planeMesh.quaternion.setFromUnitVectors(new T.Vector3(0,0,1), nUnit);
        if(wireMesh){ wireMesh.position.copy(center); wireMesh.quaternion.copy(planeMesh.quaternion); }
      }
      if(normalArrow){
        H.scene.remove(normalArrow);
        normalArrow=new T.ArrowHelper(nUnit, center, 2.8, 0xC8902A, 0.5, 0.28);
        H.scene.add(normalArrow);
      }
      if(lineObj){
        var pA=new T.Vector3(st.p0[0]-4*st.dVec[0], st.p0[1]-4*st.dVec[1], st.p0[2]-4*st.dVec[2]);
        var pB=new T.Vector3(st.p0[0]+4*st.dVec[0], st.p0[1]+4*st.dVec[1], st.p0[2]+4*st.dVec[2]);
        lineObj.geometry.setFromPoints([pA, pB]);
      }
      if(pointMesh){
        if(st.hasIntersect){
          pointMesh.visible=true;
          pointMesh.position.set(st.ip[0], st.ip[1], st.ip[2]);
        } else {
          pointMesh.visible=false;
        }
      }
      H.render();
    }

    function build3d(mods){
      var T=mods.THREE, COLOR=ClipSAT3D.COLOR;
      H=ClipSAT3D.setup(wrap, mods, {
        az:0.85, el:0.45, dist:13, target:new T.Vector3(0,0,0),
        axisSegs:[[[-6,0,0],[6,0,0]],[[0,-6,0],[0,6,0]],[[0,0,-6],[0,0,6]]]
      });

      var pGeo=new T.PlaneGeometry(7.5,7.5);
      var pMat=new T.MeshLambertMaterial({color:COLOR.INDIGO, transparent:true, opacity:0.45, side:T.DoubleSide});
      planeMesh=new T.Mesh(pGeo,pMat); H.scene.add(planeMesh);

      var wMat=new T.MeshBasicMaterial({color:COLOR.INDIGO, wireframe:true, transparent:true, opacity:0.35});
      wireMesh=new T.Mesh(pGeo,wMat); H.scene.add(wireMesh);

      var lineGeo=new T.BufferGeometry();
      var lineMat=new T.LineBasicMaterial({color:0x3B82F6, linewidth:3});
      lineObj=new T.Line(lineGeo,lineMat); H.scene.add(lineObj);

      var ptGeo=new T.SphereGeometry(0.18,16,16);
      var ptMat=new T.MeshBasicMaterial({color:0xE11D48});
      pointMesh=new T.Mesh(ptGeo,ptMat); H.scene.add(pointMesh);

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
        built=false; btn.disabled=false; btn.textContent='🧊 View Line & Plane in 3D';
        wrap.hidden=true; hint.hidden=true;
        btn.setAttribute('aria-expanded','false');
        wrap.textContent='3D view failed to load — check your connection and try again.';
        wrap.hidden=false;
      });
    }
    function close3d(){
      wrap.hidden=true; hint.hidden=true;
      btn.setAttribute('aria-expanded','false');
      btn.textContent='🧊 View Line & Plane in 3D';
    }

    if(btn) btn.addEventListener('click', function(){ if(wrap.hidden) open3d(); else close3d(); });

    function onCtrl(){
      na=parseFloat(sA.value); document.getElementById('a2PlaneAV').textContent=na;
      nb=parseFloat(sB.value); document.getElementById('a2PlaneBV').textContent=nb;
      nc=parseFloat(sC.value); document.getElementById('a2PlaneCV').textContent=nc;
      d=parseFloat(sD.value); document.getElementById('a2PlaneDV').textContent=d;
      dx=parseFloat(sTilt.value); document.getElementById('a2LineTiltV').textContent=dx;
      redrawAll();
      if(built) update3dScene();
    }

    [sA,sB,sC,sD,sTilt].forEach(function(s){ if(s) s.addEventListener('input',onCtrl); });
    register(canvas,draw);
  })();
})(window.CSExplorerKit);

