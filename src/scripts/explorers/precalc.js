/* Canvas explorers for the precalc track (Plan 5 Phase 5.015, ADR 0039).
   Moved verbatim out of modules/02-core-app.js. build.js minifies this file to
   public/js/ex/precalc.js, which base.njk loads only on the precalc page, right after
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
     PRECALC — Pillar 2 MVP roadmap item: "retrofit the tracks with zero
     canvas explorers ... with at least 3 each." Precalc had none; these
     three reuse the same shared Plot/register/redrawAll helpers as every
     other track's explorers above, guarded by `if(!canvas) return` so
     they're inert on every page that isn't the Precalc track.
     ══════════════════════════════════════════════════════════════════ */

  /* PRECALC CH 2 — the unit circle: P = (cos θ, sin θ) traced live */
  (function(){
    var canvas=document.getElementById('ucCanvas'); if(!canvas) return;
    var view={xmin:-1.6,xmax:1.6,ymin:-1.1,ymax:1.1};
    var thetaDeg=40;
    var dataBtn=document.getElementById('ucDataBtn'), dataPanel=document.getElementById('ucDataPanel'),
        dataDesc=document.getElementById('ucDataDesc'), dataRows=document.getElementById('ucDataRows');
    wireDataToggle(dataBtn,dataPanel);
    function updateDataView(cx,cy,tanv,quad){
      if(!dataDesc) return;
      dataDesc.textContent='Point on the unit circle at θ = '+thetaDeg+'°, coordinates ('+fmt(cx,3)+', '+fmt(cy,3)+'), quadrant '+quad+'.';
      renderDataRows(dataRows,[
        ['θ',thetaDeg+'°'],
        ['x = cos θ',fmt(cx,3)],
        ['y = sin θ',fmt(cy,3)],
        ['tan θ',isNaN(tanv)?'undefined':fmt(tanv,3)],
        ['quadrant',quad]
      ]);
    }
    function draw(ctx,w,h){
      var P=new Plot(ctx,w,h,view,{l:26,r:10,t:10,b:20}); P.clear();
      var c=P.ctx, N=120, i, a, px, py;
      c.beginPath();
      for(i=0;i<=N;i++){ a=2*Math.PI*i/N; px=P.X(Math.cos(a)); py=P.Y(Math.sin(a)); if(i===0) c.moveTo(px,py); else c.lineTo(px,py); }
      c.closePath(); c.lineWidth=1.4; c.strokeStyle='#B8C3D6'; c.stroke();
      c.strokeStyle=AXIS; c.lineWidth=1;
      c.beginPath(); c.moveTo(P.X(view.xmin),P.Y(0)); c.lineTo(P.X(view.xmax),P.Y(0)); c.stroke();
      c.beginPath(); c.moveTo(P.X(0),P.Y(view.ymin)); c.lineTo(P.X(0),P.Y(view.ymax)); c.stroke();
      var theta=thetaDeg*Math.PI/180, cx=Math.cos(theta), cy=Math.sin(theta);
      P.segment(0,0,cx,0,INDIGO,3);
      P.segment(cx,0,cx,cy,AMBER2,2.4,[4,3]);
      P.segment(0,0,cx,cy,INK,2);
      P.dot(cx,cy,INK,5.5);
      document.getElementById('ucCos').textContent=fmt(cx,3);
      document.getElementById('ucSin').textContent=fmt(cy,3);
      var tanv = Math.abs(cx)<1e-6 ? NaN : cy/cx;
      document.getElementById('ucTan').textContent = isNaN(tanv) ? 'undefined' : fmt(tanv,3);
      var d=((thetaDeg%360)+360)%360;
      var quad = (d%90===0) ? '—' : ['I','II','III','IV'][Math.floor(d/90)];
      document.getElementById('ucQuad').textContent = quad;
      updateDataView(cx,cy,tanv,quad);
    }
    register(canvas,draw);
    var s=document.getElementById('ucT');
    function upd(){ thetaDeg=parseInt(s.value,10); document.getElementById('ucTlab').textContent=thetaDeg+'°'; redrawAll(); }
    s.addEventListener('input',upd); upd();
  })();

  /* PRECALC CH 3 — eccentricity: one focus-distance parameter e sweeps
     circle → ellipse → parabola → hyperbola, same a=3 throughout. */
  (function(){
    var canvas=document.getElementById('pcConicCanvas'); if(!canvas) return;
    var view={xmin:-8.7,xmax:8.7,ymin:-6,ymax:6};
    var A=3, e=0;
    var dataBtn=document.getElementById('pcConicDataBtn'), dataPanel=document.getElementById('pcConicDataPanel'),
        dataDesc=document.getElementById('pcConicDataDesc'), dataRows=document.getElementById('pcConicDataRows');
    wireDataToggle(dataBtn,dataPanel);
    function updateDataView(shape,cVal){
      if(!dataDesc) return;
      dataDesc.textContent='Eccentricity e = '+fmt(e,2)+' → '+shape+'. '+(shape==='parabola'?'Focal length p':'Focus distance c')+' = '+fmt(cVal,3)+'.';
      var rows=[], i, t;
      if(shape==='hyperbola'){
        var b2=A*Math.sqrt(e*e-1), Tmax=1.35;
        for(i=0;i<6;i++){ t=-Tmax+2*Tmax*i/5; rows.push([fmt(A*Math.cosh(t)),fmt(b2*Math.sinh(t))]); }
        for(i=0;i<6;i++){ t=-Tmax+2*Tmax*i/5; rows.push([fmt(-A*Math.cosh(t)),fmt(b2*Math.sinh(t))]); }
      } else if(shape==='parabola'){
        var p=A/2;
        for(i=0;i<9;i++){ var x=-6+12*i/8; rows.push([fmt(x),fmt((x*x)/(4*p))]); }
      } else {
        var b=A*Math.sqrt(Math.max(1e-6,1-e*e));
        for(i=0;i<12;i++){ t=i/12*2*Math.PI; rows.push([fmt(A*Math.cos(t)),fmt(b*Math.sin(t))]); }
      }
      renderDataRows(dataRows,rows);
    }
    function clipRect(P){
      var c=P.ctx; c.save(); c.beginPath();
      c.rect(P.pad.l,P.pad.t,P.w-P.pad.l-P.pad.r,P.h-P.pad.t-P.pad.b); c.clip();
    }
    function draw(ctx,w,h){
      var P=new Plot(ctx,w,h,view,{l:30,r:12,t:12,b:24}); P.clear(); P.grid();
      var c=P.ctx, i, N=200, t, cLab=document.getElementById('cnCLab');
      if(e<0.985){
        var b=A*Math.sqrt(Math.max(1e-6,1-e*e));
        clipRect(P); c.beginPath();
        for(i=0;i<=N;i++){ t=2*Math.PI*i/N; var ex=P.X(A*Math.cos(t)), ey=P.Y(b*Math.sin(t)); if(i===0) c.moveTo(ex,ey); else c.lineTo(ex,ey); }
        c.closePath(); c.lineWidth=2.6; c.strokeStyle=INDIGO; c.stroke(); c.restore();
        var cc=A*e;
        if(cLab) cLab.textContent='c (focus distance)';
        if(cc>0.05){ P.dot(cc,0,AMBER2,4); P.dot(-cc,0,AMBER2,4); }
        var shapeLbl = e<0.02 ? 'circle' : 'ellipse';
        document.getElementById('cnShape').textContent = shapeLbl;
        document.getElementById('cnC').textContent=fmt(cc,3);
        updateDataView(shapeLbl,cc);
      } else if(e>1.015){
        var b2=A*Math.sqrt(e*e-1), Tmax=1.35;
        clipRect(P);
        c.beginPath();
        for(i=0;i<=N;i++){ t=-Tmax+2*Tmax*i/N; var hx=P.X(A*Math.cosh(t)), hy=P.Y(b2*Math.sinh(t)); if(i===0) c.moveTo(hx,hy); else c.lineTo(hx,hy); }
        c.lineWidth=2.6; c.strokeStyle=INDIGO; c.stroke();
        c.beginPath();
        for(i=0;i<=N;i++){ t=-Tmax+2*Tmax*i/N; var hx2=P.X(-A*Math.cosh(t)), hy2=P.Y(b2*Math.sinh(t)); if(i===0) c.moveTo(hx2,hy2); else c.lineTo(hx2,hy2); }
        c.stroke(); c.restore();
        P.segment(view.xmin,(b2/A)*view.xmin,view.xmax,(b2/A)*view.xmax,'#AEB8C7',1.2,[4,4]);
        P.segment(view.xmin,-(b2/A)*view.xmin,view.xmax,-(b2/A)*view.xmax,'#AEB8C7',1.2,[4,4]);
        var cc2=A*e;
        if(cLab) cLab.textContent='c (focus distance)';
        P.dot(cc2,0,AMBER2,4); P.dot(-cc2,0,AMBER2,4);
        document.getElementById('cnShape').textContent='hyperbola';
        document.getElementById('cnC').textContent=fmt(cc2,3);
        updateDataView('hyperbola',cc2);
      } else {
        var p=A/2;
        P.curve(function(x){ return (x*x)/(4*p); }, INDIGO, 2.6);
        P.dot(0,p,AMBER2,4);
        if(cLab) cLab.textContent='p (focal length)';
        document.getElementById('cnShape').textContent='parabola';
        document.getElementById('cnC').textContent=fmt(p,3);
        updateDataView('parabola',p);
      }
    }
    register(canvas,draw);
    var s=document.getElementById('cnE');
    function upd(){ e=parseInt(s.value,10)/100; document.getElementById('cnELab').textContent=fmt(e,2); redrawAll(); }
    s.addEventListener('input',upd); upd();
  })();

  /* PRECALC CH 6 — exponential growth & decay, P(t) = P0 e^{rt} */
  (function(){
    var canvas=document.getElementById('pcGdCanvas'); if(!canvas) return;
    var view={xmin:0,xmax:18,ymin:0,ymax:6};
    var r=0.08;
    var dataBtn=document.getElementById('pcGdDataBtn'), dataPanel=document.getElementById('pcGdDataPanel'),
        dataDesc=document.getElementById('pcGdDataDesc'), dataRows=document.getElementById('pcGdDataRows');
    wireDataToggle(dataBtn,dataPanel);
    function updateDataView(f,model){
      if(!dataDesc) return;
      var desc='P(t) = e^('+fmt(r,3)+'t), rate r = '+(r>=0?'+':'')+fmt(r*100,1)+'% ('+model+'). P(10) = '+fmt(f(10),3)+'.';
      if(Math.abs(r)>=0.001){ desc += r>0 ? ' Doubling time = '+fmt(Math.LN2/r,2)+'.' : ' Half-life = '+fmt(Math.LN2/-r,2)+'.'; }
      dataDesc.textContent=desc;
      var N=9, rows=[];
      for(var i=0;i<N;i++){ var t=view.xmin+(view.xmax-view.xmin)*i/(N-1); rows.push([fmt(t),fmt(f(t))]); }
      renderDataRows(dataRows,rows);
    }
    function draw(ctx,w,h){
      var P=new Plot(ctx,w,h,view,{l:28,r:12,t:12,b:24}); P.clear(); P.grid();
      var f=function(t){ return Math.exp(r*t); };
      P.curve(f, INDIGO, 2.6);
      P.segment(view.xmin,1,view.xmax,1,'#AEB8C7',1,[3,3]);
      P.dot(0,1,INK,4.5);
      document.getElementById('gdP10').textContent=fmt(f(10),3);
      var model = r>0.001?'growth': r<-0.001?'decay':'constant';
      document.getElementById('gdModel').textContent = model;
      var lab=document.getElementById('gdDblLab'), val=document.getElementById('gdDbl');
      if(lab&&val){
        if(Math.abs(r)<0.001){ lab.textContent='—'; val.textContent='—'; }
        else if(r>0){ lab.textContent='doubling time'; val.textContent=fmt(Math.LN2/r,2); }
        else { lab.textContent='half-life'; val.textContent=fmt(Math.LN2/-r,2); }
      }
      updateDataView(f,model);
    }
    register(canvas,draw);
    var s=document.getElementById('gdR');
    function upd(){ r=parseFloat(s.value)/100; document.getElementById('gdRlab').textContent=(r>=0?'+':'')+fmt(r*100,1)+'%'; redrawAll(); }
    s.addEventListener('input',upd); upd();
  })();

  /* PC CH 1 (pc-trig) — SSA ambiguous case, Law of Sines box. A sits at
     the origin, side b runs from A to C at angle A, and a circle of
     radius a about C meets the base ray y=0, x>0 in the possible B's.
     Default a=6, b=8, A=30° = Worked Example 1.3 (two triangles). */
  (function(){
    var canvas=document.getElementById('pcSsaCanvas'); if(!canvas) return;
    var a=6, b=8, A=30;
    wireDataToggle(document.getElementById('pcSsaDataBtn'),document.getElementById('pcSsaDataPanel'));
    function solve(){
      var Ar=A*Math.PI/180, cx=b*Math.cos(Ar), cy=b*Math.sin(Ar), disc=a*a-cy*cy, xs=[];
      if(disc>=-1e-9){
        var s=Math.sqrt(Math.max(0,disc));
        [cx+s, cx-s].forEach(function(x){
          if(x>1e-6 && !xs.some(function(y){ return Math.abs(y-x)<1e-6; })) xs.push(x);
        });
      }
      var tris=xs.map(function(x){
        var B=_deg(Math.atan2(cy, cx-x)); B=180-B;          /* interior angle at B between BA=(−x,0) and BC */
        return {x:x, B:B, C:180-A-B, c:x};
      });
      return {cx:cx, cy:cy, h:cy, tris:tris};
    }
    function draw(ctx,w,h){
      var S=solve(), pad={l:30,r:12,t:14,b:26};
      var view=_fitView(Math.min(-1,S.cx-1.5), Math.max(S.cx+a, b, 4)+1.5, -1.5, S.cy+Math.max(2,Math.min(a,S.cy)), w,h,pad);
      var P=new Plot(ctx,w,h,view,pad); P.clear(); P.grid();
      var c=P.ctx;
      /* circle of radius a about C */
      _clip(P,function(){ c.beginPath(); c.arc(P.X(S.cx),P.Y(S.cy),Math.abs(P.X(a)-P.X(0)),0,2*Math.PI);
        c.setLineDash([5,4]); c.strokeStyle=MUTED; c.lineWidth=1.3; c.stroke(); });
      /* height b sin A */
      P.segment(S.cx,S.cy,S.cx,0,AXIS,1.2,[3,3]);
      var cols=[INDIGO,AMBER2];
      S.tris.forEach(function(T,i){
        c.save(); c.beginPath(); c.moveTo(P.X(0),P.Y(0)); c.lineTo(P.X(S.cx),P.Y(S.cy)); c.lineTo(P.X(T.x),P.Y(0)); c.closePath();
        c.fillStyle = i===0 ? 'rgba(30,58,110,.13)' : 'rgba(200,144,42,.16)'; c.fill(); c.restore();
        P.segment(S.cx,S.cy,T.x,0,cols[i],2.4);
        P.dot(T.x,0,cols[i],5);
      });
      P.segment(0,0,S.cx,S.cy,INK,2.4);
      P.dot(0,0,INK,4); P.dot(S.cx,S.cy,INK,4);
      c.font=FONT; c.fillStyle=INK; c.textAlign='left'; c.textBaseline='bottom';
      c.fillText('A',P.X(0)+6,P.Y(0)-4); c.fillText('C',P.X(S.cx)+6,P.Y(S.cy)-4);
      S.tris.forEach(function(T,i){ c.fillStyle=cols[i]; c.fillText('B'+(i+1),P.X(T.x)+4,P.Y(0)-6); });
      var n=S.tris.length;
      _set('pcSsaH',fmt(S.h,3));
      _set('pcSsaCount', n===1 && Math.abs(a-S.h)<1e-9 ? '1 (right triangle)' : String(n));
      _set('pcSsaB1', n>0 ? fmt(S.tris[0].B,1)+'°, '+fmt(S.tris[0].C,1)+'°' : '—');
      _set('pcSsaB2', n>1 ? fmt(S.tris[1].B,1)+'°, '+fmt(S.tris[1].C,1)+'°' : '—');
      var desc=document.getElementById('pcSsaDataDesc');
      if(desc) desc.textContent='Given a = '+fmt(a,1)+', b = '+fmt(b,1)+', A = '+A+'°. The height from C to the base is b sin A = '+fmt(S.h,3)+'. '
        +(n===0 ? 'Since a < b sin A, side a cannot reach the base: no triangle.'
          : n===1 ? 'Exactly one triangle: B = '+fmt(S.tris[0].B,1)+'°, C = '+fmt(S.tris[0].C,1)+'°.'
          : 'Since b sin A < a < b, two triangles: B = '+fmt(S.tris[0].B,1)+'° or '+fmt(S.tris[1].B,1)+'°.');
      var rows=[['a, b, A',fmt(a,1)+', '+fmt(b,1)+', '+A+'°'],['b sin A',fmt(S.h,3)],['triangles',String(n)]];
      S.tris.forEach(function(T,i){ rows.push(['triangle '+(i+1)+': B, C, c', fmt(T.B,1)+'°, '+fmt(T.C,1)+'°, '+fmt(T.c,2)]); });
      renderDataRows(document.getElementById('pcSsaDataRows'),rows);
    }
    register(canvas,draw);
    function upd(){
      a=parseFloat(sa.value); b=parseFloat(sb.value); A=parseInt(sA.value,10);
      _set('pcSsaAV',fmt(a,1)); _set('pcSsaBV',fmt(b,1)); _set('pcSsaAngV',A+'°');
      redrawAll();
    }
    var sa=_slider('pcSsaA',upd), sb=_slider('pcSsaB',upd), sA=_slider('pcSsaAng',upd);
    upd();
  })();

  /* PC CH 5 (pc-polar) — limaçon r = a + b cos θ, Common polar curves
     table. Default a=b=2 = Worked Example 5.3's cardioid. */
  (function(){
    var canvas=document.getElementById('pcLimaconCanvas'); if(!canvas) return;
    var a=2, b=2, T=360;
    wireDataToggle(document.getElementById('pcLimaconDataBtn'),document.getElementById('pcLimaconDataPanel'));
    function r(t){ return a+b*Math.cos(t); }
    function shape(){
      if(b===0) return a===0 ? 'the pole only' : 'circle (b = 0)';
      if(a===0) return 'circle through the pole (a = 0)';
      if(a===b) return 'cardioid (a = b)';
      return a<b ? 'limaçon with inner loop (a < b)' : 'limaçon, no loop (a > b)';
    }
    function draw(ctx,w,h){
      var M=Math.max(a+b,1)*1.1, pad={l:30,r:12,t:14,b:26};
      var P=new Plot(ctx,w,h,_fitView(-M,M,-M,M,w,h,pad),pad); P.clear(); P.grid();
      var c=P.ctx, Tr=T*Math.PI/180, N=Math.max(2,Math.round(T/1.5));
      /* full curve faint, traced part bold */
      [[2*Math.PI,LINE,1.4],[Tr,INDIGO,2.6]].forEach(function(spec){
        c.save(); c.beginPath();
        for(var i=0;i<=N;i++){ var t=spec[0]*i/N, rr=r(t), X=P.X(rr*Math.cos(t)), Y=P.Y(rr*Math.sin(t)); if(i) c.lineTo(X,Y); else c.moveTo(X,Y); }
        c.strokeStyle=spec[1]; c.lineWidth=spec[2]; c.lineJoin='round'; c.stroke(); c.restore();
      });
      var rp=r(Tr), px=rp*Math.cos(Tr), py=rp*Math.sin(Tr);
      P.segment(0,0,px,py,AMBER2,1.6,[4,3]);
      P.dot(px,py,AMBER2,5);
      _set('pcLimType',shape());
      _set('pcLimMax',fmt(a+b,2));
      _set('pcLimMin',fmt(a-b,2)+(a-b<0?' (negative: inner loop)':''));
      _set('pcLimPt','('+fmt(rp,2)+', '+T+'°)');
      var desc=document.getElementById('pcLimaconDataDesc');
      if(desc) desc.textContent='r = '+fmt(a,1)+' + '+fmt(b,1)+' cos θ: '+shape()+'. Largest r is a + b = '+fmt(a+b,2)+' at θ = 0; at θ = π, r = a − b = '+fmt(a-b,2)+'. The curve is symmetric about the polar axis because cos(−θ) = cos θ.';
      var rows=[]; [0,45,90,135,180,225,270,315].forEach(function(d){ var t=d*Math.PI/180, rr=r(t); rows.push([d+'°',fmt(rr,3),'('+fmt(rr*Math.cos(t),2)+', '+fmt(rr*Math.sin(t),2)+')']); });
      renderDataRows(document.getElementById('pcLimaconDataRows'),rows);
    }
    register(canvas,draw);
    function upd(){
      a=parseFloat(sa.value); b=parseFloat(sb.value); T=parseInt(st.value,10);
      _set('pcLimAV',fmt(a,1)); _set('pcLimBV',fmt(b,1)); _set('pcLimTV',T+'°');
      redrawAll();
    }
    var sa=_slider('pcLimA',upd), sb=_slider('pcLimB',upd), st=_slider('pcLimT',upd);
    upd();
  })();

  /* PC CH 7 (pc-rational) — f(x) = a(x−z)(x−h)/((x−v)(x−h)), Asymptotes
     and holes box. Default a=2, z=2, v=3, h=−2 = Worked Example 7.1. */
  (function(){
    var canvas=document.getElementById('pcRatCanvas'); if(!canvas) return;
    var k=2, z=2, v=3, hh=-2;
    wireDataToggle(document.getElementById('pcRatDataBtn'),document.getElementById('pcRatDataPanel'));
    function fac(r){ return r===0 ? 'x' : (r>0 ? '(x − '+r+')' : '(x + '+(-r)+')'); }
    function analyse(){
      var num=[z,hh], den=[v,hh], holes=[];
      /* cancel common factors one at a time (multiset) */
      for(var i=num.length-1;i>=0;i--){
        var j=den.indexOf(num[i]);
        if(j>=0){ holes.push(num[i]); num.splice(i,1); den.splice(j,1); }
      }
      function g(x){ var p=k; num.forEach(function(r){ p*=(x-r); }); den.forEach(function(r){ p/=(x-r); }); return p; }
      var va=den.slice().filter(function(r,i,arr){ return arr.indexOf(r)===i; });
      /* a cancelled root that still zeroes the reduced denominator is an asymptote, not a hole */
      var realHoles=holes.filter(function(r){ return va.indexOf(r)<0; }).filter(function(r,i,arr){ return arr.indexOf(r)===i; });
      var zeros=num.filter(function(r){ return va.indexOf(r)<0 && realHoles.indexOf(r)<0; }).filter(function(r,i,arr){ return arr.indexOf(r)===i; });
      return {g:g, va:va, holes:realHoles, zeros:zeros, deg:num.length-den.length};
    }
    function draw(ctx,w,h){
      var A=analyse(), view={xmin:-7,xmax:7,ymin:-8,ymax:8};
      var P=new Plot(ctx,w,h,view,{l:30,r:12,t:14,b:26}); P.clear(); P.grid();
      var gap=(view.xmax-view.xmin)/320*1.2;
      A.va.forEach(function(x){ P.vline(x,AMBER2,[6,4]); });
      if(A.deg===0 && !flat) P.segment(view.xmin,k,view.xmax,k,AMBER2,1.4,[6,4]);
      P.curve(function(x){
        for(var i=0;i<A.va.length;i++) if(Math.abs(x-A.va[i])<gap) return NaN;
        return A.g(x);
      },INDIGO,2.6);
      A.holes.forEach(function(x){ var y=A.g(x); if(isFinite(y)) P.ring(x,y,INDIGO,5); });
      A.zeros.forEach(function(x){ P.dot(x,0,INDIGO,4); });
      var eq='f(x) = '+(k===1?'':k===-1?'−':_num(k))+fac(z)+fac(hh)+' / ('+fac(v)+fac(hh)+')';
      var flat=!A.va.length && A.deg===0 && A.zeros.length===0 && A.holes.length>0 && Math.abs(A.g(1e3)-k)<1e-9;
      _set('pcRatEq',eq);
      _set('pcRatHole', A.holes.length ? A.holes.map(function(x){ return '('+x+', '+fmt(A.g(x),3)+')'; }).join(', ') : 'none');
      _set('pcRatVA', A.va.length ? A.va.map(function(x){ return 'x = '+x; }).join(', ') : 'none');
      _set('pcRatHA', flat ? 'none: f(x) = '+_num(k)+' except at the holes' : A.deg===0 ? 'y = '+_num(k) : (A.deg<0 ? 'y = 0' : 'none (oblique)'));
      _set('pcRatZero', A.zeros.length ? A.zeros.map(function(x){ return 'x = '+x; }).join(', ') : 'none');
      var desc=document.getElementById('pcRatDataDesc');
      if(desc) desc.textContent=eq+'. Holes: '+(A.holes.length?A.holes.map(function(x){ return 'x = '+x; }).join(', '):'none')
        +'. Vertical asymptotes: '+(A.va.length?A.va.map(function(x){ return 'x = '+x; }).join(', '):'none')
        +'. Horizontal asymptote: '+(flat?'none, f is constant '+_num(k)+' away from the holes':A.deg===0?'y = '+_num(k):(A.deg<0?'y = 0':'none'))+'.';
      var rows=[]; [-6,-4,-3,-1,0,1,4,6].forEach(function(x){
        var isHole=A.holes.indexOf(x)>=0, isVA=A.va.indexOf(x)>=0;
        rows.push([String(x), isVA ? 'undefined (asymptote)' : isHole ? 'undefined (hole)' : fmt(A.g(x),3)]);
      });
      renderDataRows(document.getElementById('pcRatDataRows'),rows);
    }
    register(canvas,draw);
    function upd(){
      k=parseFloat(sk.value); z=parseInt(sz.value,10); v=parseInt(sv.value,10); hh=parseInt(sh.value,10);
      if(k===0){ k=0.5; sk.value=0.5; }            /* a = 0 is not a rational function of this form */
      _set('pcRatKV',fmt(k,1)); _set('pcRatZV',String(z)); _set('pcRatVV',String(v)); _set('pcRatHV',String(hh));
      redrawAll();
    }
    var sk=_slider('pcRatK',upd), sz=_slider('pcRatZ',upd), sv=_slider('pcRatV',upd), sh=_slider('pcRatH',upd);
    upd();
  })();

  /* PC CH 8 (pc-sequences) — geometric partial sums S_n and S∞, Geometric
     sequences & series box. Default a1=6/5, r=2/5 = Worked Example 8.2. */
  (function(){
    var canvas=document.getElementById('pcGeoCanvas'); if(!canvas) return;
    var a1=1.2, r=0.4, n=10;
    wireDataToggle(document.getElementById('pcGeoDataBtn'),document.getElementById('pcGeoDataPanel'));
    function Sn(m){ return Math.abs(r-1)<1e-12 ? a1*m : a1*(1-Math.pow(r,m))/(1-r); }
    function draw(ctx,w,h){
      var conv=Math.abs(r)<1-1e-12, Sinf=conv ? a1/(1-r) : NaN, vals=[], lo=0, hi=0;
      for(var m=1;m<=n;m++){ var s=Sn(m); vals.push(s); lo=Math.min(lo,s); hi=Math.max(hi,s); }
      if(conv){ lo=Math.min(lo,Sinf); hi=Math.max(hi,Sinf); }
      var pad=Math.max((hi-lo)*0.12,0.5);
      var P=new Plot(ctx,w,h,{xmin:0,xmax:n+1,ymin:lo-pad,ymax:hi+pad},{l:44,r:12,t:14,b:26}); P.clear(); P.grid();
      if(conv) P.segment(0,Sinf,n+1,Sinf,AMBER2,1.8,[6,4]);
      for(var i=0;i<vals.length;i++){
        if(i) P.segment(i,vals[i-1],i+1,vals[i],LINE,1.2);
        P.dot(i+1,vals[i],INDIGO,4);
      }
      _set('pcGeoSn',fmt(Sn(n),5));
      _set('pcGeoSinf',conv ? fmt(Sinf,5) : 'diverges (|r| ≥ 1)');
      _set('pcGeoGap',conv ? fmt(Sinf-Sn(n),5) : '—');
      var desc=document.getElementById('pcGeoDataDesc');
      if(desc) desc.textContent='a₁ = '+fmt(a1,2)+', r = '+fmt(r,2)+'. S'+n+' = '+fmt(Sn(n),5)+'. '
        +(conv ? 'Because |r| < 1, the partial sums approach S∞ = a₁/(1 − r) = '+fmt(Sinf,5)+'.' : 'Because |r| ≥ 1, the partial sums do not approach a finite limit.');
      var rows=[]; for(var j=1;j<=Math.min(n,12);j++) rows.push([String(j),fmt(a1*Math.pow(r,j-1),5),fmt(Sn(j),5)]);
      renderDataRows(document.getElementById('pcGeoDataRows'),rows);
    }
    register(canvas,draw);
    function upd(){
      a1=parseFloat(sa.value); r=parseFloat(sr.value); n=parseInt(sn.value,10);
      _set('pcGeoAV',fmt(a1,2)); _set('pcGeoRV',fmt(r,2)); _set('pcGeoNV',String(n));
      redrawAll();
    }
    var sa=_slider('pcGeoA',upd), sr=_slider('pcGeoR',upd), sn=_slider('pcGeoN',upd);
    upd();
  })();

  /* PC CH 4 (pc-vectors) — dot product, angle, projection, Dot product &
     angle box. Default u=⟨6,2⟩, v=⟨3,4⟩ = Worked Example 4.2. */
  (function(){
    var canvas=document.getElementById('pcProjCanvas'); if(!canvas) return;
    var u1=6, u2=2, v1=3, v2=4;
    wireDataToggle(document.getElementById('pcProjDataBtn'),document.getElementById('pcProjDataPanel'));
    function draw(ctx,w,h){
      var M=Math.max(6,Math.abs(u1),Math.abs(u2),Math.abs(v1),Math.abs(v2))+0.8, pad={l:30,r:12,t:14,b:26};
      var P=new Plot(ctx,w,h,_fitView(-M,M,-M,M,w,h,pad),pad); P.clear(); P.grid();
      var c=P.ctx, dot=u1*v1+u2*v2, vv=v1*v1+v2*v2, uu=Math.sqrt(u1*u1+u2*u2), vn=Math.sqrt(vv);
      var ok=vv>0, t=ok?dot/vv:0, p1=t*v1, p2=t*v2;
      if(ok){ var L=4*M; _clip(P,function(){ P.segment(-L*v1/vn,-L*v2/vn,L*v1/vn,L*v2/vn,LINE,1.1,[2,4]); }); }
      if(ok) P.segment(u1,u2,p1,p2,MUTED,1.4,[5,4]);
      /* projection first and thicker, so v (drawn on top) stays visible when they overlap */
      if(ok && (Math.abs(p1)>1e-9||Math.abs(p2)>1e-9)) arrow(c,P.X(0),P.Y(0),P.X(p1),P.Y(p2),AMBER2,5);
      arrow(c,P.X(0),P.Y(0),P.X(v1),P.Y(v2),INDIGO,2.2);
      arrow(c,P.X(0),P.Y(0),P.X(u1),P.Y(u2),INK,2.6);
      c.font=FONT; c.textBaseline='bottom'; c.textAlign='left';
      c.fillStyle=INK; c.fillText('u',P.X(u1)+5,P.Y(u2)-3);
      c.fillStyle=INDIGO; c.fillText('v',P.X(v1)+5,P.Y(v2)-3);
      var ang=(uu>0&&ok) ? _deg(Math.acos(Math.max(-1,Math.min(1,dot/(uu*vn))))) : NaN;
      _set('pcProjDot',String(dot));
      _set('pcProjAng',isFinite(ang) ? fmt(ang,1)+'°'+(dot===0?' (perpendicular)':'') : 'undefined (zero vector)');
      _set('pcProjVec',ok ? '⟨'+fmt(p1,3)+', '+fmt(p2,3)+'⟩' : 'undefined (v = 0)');
      _set('pcProjScal',ok ? fmt(dot/vn,3) : '—');
      var desc=document.getElementById('pcProjDataDesc');
      if(desc) desc.textContent='u = ⟨'+u1+', '+u2+'⟩, v = ⟨'+v1+', '+v2+'⟩. u · v = '+u1+'('+v1+') + '+u2+'('+v2+') = '+dot+'. '
        +(ok ? '|v|² = '+vv+', so proj_v u = ('+dot+'/'+vv+')v = ⟨'+fmt(p1,3)+', '+fmt(p2,3)+'⟩'+(isFinite(ang)?', and the angle between u and v is '+fmt(ang,1)+'°.':'.') : 'v is the zero vector, so there is no projection.');
      renderDataRows(document.getElementById('pcProjDataRows'),[
        ['u, v','⟨'+u1+', '+u2+'⟩, ⟨'+v1+', '+v2+'⟩'],['u · v',String(dot)],['|u|, |v|',fmt(uu,3)+', '+fmt(vn,3)],
        ['angle θ',isFinite(ang)?fmt(ang,1)+'°':'—'],['proj_v u',ok?'⟨'+fmt(p1,3)+', '+fmt(p2,3)+'⟩':'—']
      ]);
    }
    register(canvas,draw);
    function upd(){
      u1=parseInt(s1.value,10); u2=parseInt(s2.value,10); v1=parseInt(s3.value,10); v2=parseInt(s4.value,10);
      _set('pcProjU1V',String(u1)); _set('pcProjU2V',String(u2)); _set('pcProjV1V',String(v1)); _set('pcProjV2V',String(v2));
      redrawAll();
    }
    var s1=_slider('pcProjU1',upd), s2=_slider('pcProjU2',upd), s3=_slider('pcProjV1',upd), s4=_slider('pcProjV2',upd);
    upd();
  })();
})(window.CSExplorerKit);
