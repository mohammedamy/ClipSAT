/* Canvas explorers for the ibsl track (Plan 5 Phase 5.015, ADR 0039).
   Moved verbatim out of modules/02-core-app.js. build.js minifies this file to
   public/js/ex/ibsl.js, which base.njk loads only on the ibsl page, right after
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
     IB MATH SL — Pillar 2 MVP retrofit continued (track 7 of 8). Same
     shared Plot/register/redrawAll/fmt/dfdx helpers.
     ══════════════════════════════════════════════════════════════════ */

  /* IB SL TOPIC 2 — transformations of y=f(x), base f(x)=x^2 */
  (function(){
    var canvas=document.getElementById('ibslTransCanvas'); if(!canvas) return;
    var view={xmin:-8,xmax:8,ymin:-8,ymax:8};
    var TEAL='#0e9f8f';
    var a=1, h=0, k=0, reflect=false;
    function base(x){ return x*x; }
    var dataBtn=document.getElementById('ibslTransDataBtn'), dataPanel=document.getElementById('ibslTransDataPanel'),
        dataDesc=document.getElementById('ibslTransDataDesc'), dataRows=document.getElementById('ibslTransDataRows');
    wireDataToggle(dataBtn,dataPanel);
    function updateDataView(g,eq){
      if(!dataDesc) return;
      dataDesc.textContent='y = '+eq+'.'+(reflect?' Reflection y = −g(x) shown dashed.':'');
      var N=9, rows=[];
      for(var i=0;i<N;i++){ var x=view.xmin+(view.xmax-view.xmin)*i/(N-1); rows.push([fmt(x),fmt(base(x)),fmt(g(x))]); }
      renderDataRows(dataRows,rows);
    }
    function draw(ctx,w,h2){
      var P=new Plot(ctx,w,h2,view,{l:28,r:12,t:12,b:24}); P.clear(); P.grid();
      P.curve(base, '#B8C3D6', 2);
      var g=function(x){ return a*base(x-h)+k; };
      P.curve(g, INDIGO, 2.6);
      if(reflect){ P.curve(function(x){ return -g(x); }, TEAL, 2.2, [6,4]); }
      var eq=fmt(a,1)+'(x'+(h>=0?'-'+h:'+'+(-h))+')²'+(k>=0?' + '+k:' - '+(-k));
      document.getElementById('ibslTransEq').textContent='y = '+eq;
      updateDataView(g,eq);
    }
    register(canvas,draw);
    var sa=document.getElementById('ibslTransA'), sh=document.getElementById('ibslTransH'), sk=document.getElementById('ibslTransK');
    var cbReflect=document.getElementById('ibslTransReflect');
    function upd(){
      a=parseInt(sa.value,10)/10; h=parseInt(sh.value,10); k=parseInt(sk.value,10);
      document.getElementById('ibslTransAlab').textContent=fmt(a,1);
      document.getElementById('ibslTransHlab').textContent=h;
      document.getElementById('ibslTransKlab').textContent=k;
      redrawAll();
    }
    sa.addEventListener('input',upd); sh.addEventListener('input',upd); sk.addEventListener('input',upd);
    if(cbReflect){ cbReflect.addEventListener('change',function(){ reflect=cbReflect.checked; redrawAll(); }); }
    upd();
  })();

  /* IB SL TOPIC 3 — solving a triangle from two sides and the included
     angle, via the cosine rule (third side) then the cosine rule again
     for the other two angles (avoids the sine rule's ambiguous case). */
  (function(){
    var canvas=document.getElementById('ibslTriCanvas'); if(!canvas) return;
    var view={xmin:-1,xmax:11,ymin:-1,ymax:11};
    var p=7, q=9, thetaDeg=40;
    var dataBtn=document.getElementById('ibslTriDataBtn'), dataPanel=document.getElementById('ibslTriDataPanel'),
        dataDesc=document.getElementById('ibslTriDataDesc'), dataRows=document.getElementById('ibslTriDataRows');
    wireDataToggle(dataBtn,dataPanel);
    function solve(){
      var theta=thetaDeg*Math.PI/180;
      var r=Math.sqrt(p*p+q*q-2*p*q*Math.cos(theta));
      var angC=Math.acos(Math.max(-1,Math.min(1,(r*r+p*p-q*q)/(2*r*p))))*180/Math.PI;
      var angB=Math.acos(Math.max(-1,Math.min(1,(r*r+q*q-p*p)/(2*r*q))))*180/Math.PI;
      return {r:r,angC:angC,angB:angB};
    }
    function updateDataView(s){
      if(!dataDesc) return;
      dataDesc.textContent='p = '+fmt(p,1)+', q = '+fmt(q,1)+', included angle = '+thetaDeg+'°. Third side r = '+fmt(s.r,3)+' (cosine rule); the other two angles follow, also via the cosine rule.';
      renderDataRows(dataRows,[
        ['side p',fmt(p,1)],['side q',fmt(q,1)],['included angle',thetaDeg+'°'],
        ['side r (opposite the included angle)',fmt(s.r,3)],
        ['angle opposite q',fmt(s.angC,2)+'°'],['angle opposite p',fmt(s.angB,2)+'°']
      ]);
    }
    function draw(ctx,w,h){
      var theta=thetaDeg*Math.PI/180;
      var Ax=0, Ay=0, Px=p, Py=0, Qx=q*Math.cos(theta), Qy=q*Math.sin(theta);
      var xs=[Ax,Px,Qx], ys=[Ay,Py,Qy], pad=1.5;
      view.xmin=Math.min.apply(null,xs)-pad; view.xmax=Math.max.apply(null,xs)+pad;
      view.ymin=Math.min.apply(null,ys)-pad; view.ymax=Math.max.apply(null,ys)+pad;
      var P=new Plot(ctx,w,h,view,{l:28,r:12,t:12,b:24}); P.clear(); P.grid();
      P.segment(Ax,Ay,Px,Py,INDIGO,2.4);
      P.segment(Ax,Ay,Qx,Qy,INDIGO,2.4);
      P.segment(Px,Py,Qx,Qy,AMBER2,2.4);
      P.dot(Ax,Ay,INK,4.5); P.dot(Px,Py,INK,4.5); P.dot(Qx,Qy,INK,4.5);
      var s=solve();
      document.getElementById('ibslTriR').textContent=fmt(s.r,3);
      document.getElementById('ibslTriAngles').textContent=fmt(s.angC,2)+'°, '+fmt(s.angB,2)+'°';
      updateDataView(s);
    }
    register(canvas,draw);
    var sP=document.getElementById('ibslTriP'), sQ=document.getElementById('ibslTriQ'), sTh=document.getElementById('ibslTriTheta');
    function upd(){
      p=parseFloat(sP.value); q=parseFloat(sQ.value); thetaDeg=parseInt(sTh.value,10);
      document.getElementById('ibslTriPVal').textContent=fmt(p,1);
      document.getElementById('ibslTriQVal').textContent=fmt(q,1);
      document.getElementById('ibslTriThetaVal').textContent=thetaDeg+'°';
      redrawAll();
    }
    sP.addEventListener('input',upd); sQ.addEventListener('input',upd); sTh.addEventListener('input',upd);
    upd();
  })();

  /* IB SL TOPIC 3 — angle between two 2D vectors, via the dot product;
     both direction sliders are fully independent so any configuration,
     including the perpendicular default, can be checked visually. */
  (function(){
    var canvas=document.getElementById('ibslVecAngCanvas'); if(!canvas) return;
    var view={xmin:-6,xmax:6,ymin:-6,ymax:6};
    var uAng=20, uLen=4, vAng=110, vLen=3;
    var dataBtn=document.getElementById('ibslVecAngDataBtn'), dataPanel=document.getElementById('ibslVecAngDataPanel'),
        dataDesc=document.getElementById('ibslVecAngDataDesc'), dataRows=document.getElementById('ibslVecAngDataRows');
    wireDataToggle(dataBtn,dataPanel);
    function compute(){
      var ur=uAng*Math.PI/180, vr=vAng*Math.PI/180;
      var ux=uLen*Math.cos(ur), uy=uLen*Math.sin(ur);
      var vx=vLen*Math.cos(vr), vy=vLen*Math.sin(vr);
      var dot=ux*vx+uy*vy;
      var cosT=Math.max(-1,Math.min(1,dot/(uLen*vLen)));
      var theta=Math.acos(cosT)*180/Math.PI;
      return {ux:ux,uy:uy,vx:vx,vy:vy,dot:dot,theta:theta};
    }
    function updateDataView(s){
      if(!dataDesc) return;
      dataDesc.textContent='u = ⟨'+fmt(s.ux,2)+', '+fmt(s.uy,2)+'⟩, v = ⟨'+fmt(s.vx,2)+', '+fmt(s.vy,2)+'⟩. u · v = '+fmt(s.dot,3)+'. Angle between them = '+fmt(s.theta,1)+'°.';
      renderDataRows(dataRows,[
        ['u','⟨'+fmt(s.ux,2)+', '+fmt(s.uy,2)+'⟩'],
        ['v','⟨'+fmt(s.vx,2)+', '+fmt(s.vy,2)+'⟩'],
        ['u · v',fmt(s.dot,3)],
        ['angle between u and v',fmt(s.theta,1)+'°']
      ]);
    }
    function draw(ctx,w,h){
      var P=new Plot(ctx,w,h,view,{l:28,r:12,t:12,b:24}); P.clear(); P.grid();
      var s=compute();
      var c=P.ctx;
      arrow(c,P.X(0),P.Y(0),P.X(s.ux),P.Y(s.uy),INDIGO,2.8);
      arrow(c,P.X(0),P.Y(0),P.X(s.vx),P.Y(s.vy),AMBER2,2.8);
      document.getElementById('ibslVecAngDot').textContent=fmt(s.dot,3);
      document.getElementById('ibslVecAngTheta').textContent=fmt(s.theta,1)+'°';
      updateDataView(s);
    }
    register(canvas,draw);
    var sUa=document.getElementById('ibslVecAngUang'), sUl=document.getElementById('ibslVecAngUlen'),
        sVa=document.getElementById('ibslVecAngVang'), sVl=document.getElementById('ibslVecAngVlen');
    function upd(){
      uAng=parseInt(sUa.value,10); uLen=parseFloat(sUl.value);
      vAng=parseInt(sVa.value,10); vLen=parseFloat(sVl.value);
      document.getElementById('ibslVecAngUangVal').textContent=uAng+'°';
      document.getElementById('ibslVecAngUlenVal').textContent=fmt(uLen,1);
      document.getElementById('ibslVecAngVangVal').textContent=vAng+'°';
      document.getElementById('ibslVecAngVlenVal').textContent=fmt(vLen,1);
      redrawAll();
    }
    sUa.addEventListener('input',upd); sUl.addEventListener('input',upd);
    sVa.addEventListener('input',upd); sVl.addEventListener('input',upd);
    upd();
  })();

  /* IB SL TOPIC 3 — sinusoidal tide model, h(t) = A sin(2 pi t / P) + k */
  (function(){
    var canvas=document.getElementById('ibslTideCanvas'); if(!canvas) return;
    var view={xmin:0,xmax:24,ymin:-7,ymax:16};
    var A=3, P=12, k=5, tq=6;
    var dataBtn=document.getElementById('ibslTideDataBtn'), dataPanel=document.getElementById('ibslTideDataPanel'),
        dataDesc=document.getElementById('ibslTideDataDesc'), dataRows=document.getElementById('ibslTideDataRows');
    wireDataToggle(dataBtn,dataPanel);
    function updateDataView(hFn){
      if(!dataDesc) return;
      dataDesc.textContent='h(t) = '+A+' sin(2πt/'+P+') + '+k+'. Max height = '+(k+A)+', min height = '+(k-A)+', period = '+P+' hours. At t = '+fmt(tq,1)+' h, h(t) = '+fmt(hFn(tq),2)+'.';
      var N=9, rows=[];
      for(var i=0;i<N;i++){ var t=P*i/(N-1); rows.push([fmt(t),fmt(hFn(t))]); }
      renderDataRows(dataRows,rows);
    }
    function draw(ctx,w,h){
      var Pl=new Plot(ctx,w,h,view,{l:26,r:12,t:12,b:24}); Pl.clear(); Pl.grid();
      var hFn=function(t){ return A*Math.sin(2*Math.PI*t/P)+k; };
      Pl.curve(hFn, INDIGO, 2.6);
      Pl.segment(view.xmin,k,view.xmax,k,'#AEB8C7',1,[3,3]);
      var ht=hFn(tq);
      Pl.vline(tq,'#AEB8C7',[3,3]);
      Pl.dot(tq,ht,AMBER2,5.5);
      document.getElementById('ibslMax').textContent=k+A;
      document.getElementById('ibslMin').textContent=k-A;
      document.getElementById('ibslTideHT').textContent=fmt(ht,2);
      updateDataView(hFn);
    }
    register(canvas,draw);
    var sA=document.getElementById('ibslTideA'), sP=document.getElementById('ibslTideP'), sk=document.getElementById('ibslTideK');
    var sT=document.getElementById('ibslTideT');
    function upd(){
      A=parseInt(sA.value,10); P=parseInt(sP.value,10); k=parseInt(sk.value,10);
      if(sT){ tq=parseFloat(sT.value); }
      document.getElementById('ibslTideAlab').textContent=A;
      document.getElementById('ibslTidePlab').textContent=P;
      document.getElementById('ibslTideKlab').textContent=k;
      if(sT){ document.getElementById('ibslTideTlab').textContent=fmt(tq,1); }
      redrawAll();
    }
    sA.addEventListener('input',upd); sP.addEventListener('input',upd); sk.addEventListener('input',upd);
    if(sT){ sT.addEventListener('input',upd); }
    upd();
  })();

  /* IB SL TOPIC 5 — the tangent line and f'(a), f(x)=x^3-3x */
  (function(){
    var canvas=document.getElementById('ibslTanCanvas'); if(!canvas) return;
    var view={xmin:-3,xmax:3,ymin:-4,ymax:4};
    var TEAL='#0e9f8f';
    var a=1, hStep=1;
    function f(x){ return x*x*x-3*x; }
    var dataBtn=document.getElementById('ibslTanDataBtn'), dataPanel=document.getElementById('ibslTanDataPanel'),
        dataDesc=document.getElementById('ibslTanDataDesc'), dataRows=document.getElementById('ibslTanDataRows');
    wireDataToggle(dataBtn,dataPanel);
    function updateDataView(fa,slope,secSlope,tangent,monoText){
      if(!dataDesc) return;
      dataDesc.textContent='f(x) = x³ − 3x. At a = '+fmt(a,1)+', f(a) = '+fmt(fa,3)+', f′(a) = '+fmt(slope,3)+' — f is '+monoText+' there. The secant through a and a+h (h = '+fmt(hStep,2)+') has slope '+fmt(secSlope,3)+', which approaches f′(a) as h → 0.';
      var N=9, rows=[];
      for(var i=0;i<N;i++){ var x=view.xmin+(view.xmax-view.xmin)*i/(N-1); rows.push([fmt(x),fmt(f(x)),fmt(tangent(x))]); }
      renderDataRows(dataRows,rows);
    }
    function draw(ctx,w,h){
      var P=new Plot(ctx,w,h,view,{l:28,r:12,t:12,b:24}); P.clear(); P.grid();
      P.curve(f,INDIGO,2.6);
      var fa=f(a), slope=dfdx(f,a), L=1.2;
      var tangent=function(x){ return fa+slope*(x-a); };
      P.segment(a-L,fa-slope*L,a+L,fa+slope*L,AMBER2,2.4);
      var a2=a+hStep, fa2=f(a2), secSlope=(fa2-fa)/hStep;
      P.segment(a-L,fa-secSlope*L,a+L,fa+secSlope*L,TEAL,2,[5,4]);
      P.dot(a,fa,INK,5);
      P.ring(a2,fa2,TEAL,4.5);
      document.getElementById('ibslFA').textContent=fmt(fa,3);
      document.getElementById('ibslFprimeA').textContent=fmt(slope,3);
      var secEl=document.getElementById('ibslSecSlope'); if(secEl){ secEl.textContent=fmt(secSlope,3); }
      var mono=document.getElementById('ibslMono');
      var monoText = Math.abs(slope)<0.02 ? 'at a critical point' : (slope>0 ? 'increasing' : 'decreasing');
      mono.textContent = monoText;
      updateDataView(fa,slope,secSlope,tangent,monoText);
    }
    register(canvas,draw);
    var s=document.getElementById('ibslTanA'), sH=document.getElementById('ibslTanH');
    function upd(){
      a=parseInt(s.value,10)/10;
      if(sH){ hStep=parseInt(sH.value,10)/10; }
      document.getElementById('ibslTanAlab').textContent=fmt(a,1);
      if(sH){ document.getElementById('ibslTanHlab').textContent=fmt(hStep,1); }
      redrawAll();
    }
    s.addEventListener('input',upd);
    if(sH){ sH.addEventListener('input',upd); }
    upd();
  })();

  /* ══════════════════════════════════════════════════════════════════
     IB MATH SL/HL — new explorers for chapters that had none, added
     alongside a syllabus review against the current IB Mathematics
     AA/AI curriculum. Same shared Plot/register/redrawAll/fmt/
     wireDataToggle/renderDataRows helpers as every explorer above.
     ══════════════════════════════════════════════════════════════════ */

  /* IB SL TOPIC 1 — geometric series, partial sums vs S-infinity */
  (function(){
    var canvas=document.getElementById('ibslGeoCanvas'); if(!canvas) return;
    var view={xmin:0,xmax:21,ymin:-10,ymax:10};
    var r=0.5, u1=3;
    var dataBtn=document.getElementById('ibslGeoDataBtn'), dataPanel=document.getElementById('ibslGeoDataPanel'),
        dataDesc=document.getElementById('ibslGeoDataDesc'), dataRows=document.getElementById('ibslGeoDataRows');
    wireDataToggle(dataBtn,dataPanel);
    function Sn(n){ return Math.abs(r-1)<1e-9 ? u1*n : u1*(1-Math.pow(r,n))/(1-r); }
    function updateDataView(){
      if(!dataDesc) return;
      var conv=Math.abs(r)<1;
      dataDesc.textContent='u1 = '+fmt(u1,1)+', r = '+fmt(r,2)+'. '+(conv ? 'S∞ = '+fmt(u1/(1-r),3)+'.' : 'Diverges (|r| ≥ 1) — partial sums grow without bound.');
      var rows=[];
      [5,10,15,20].forEach(function(n){ rows.push([n, fmt(Sn(n),3)]); });
      renderDataRows(dataRows,rows);
    }
    function draw(ctx,w,h){
      var conv=Math.abs(r)<1;
      var sinf=conv ? u1/(1-r) : Sn(20);
      var hi=Math.max(Math.abs(sinf),Math.abs(u1),1)*1.3+1;
      view.ymin=-hi; view.ymax=hi;
      var P=new Plot(ctx,w,h,view,{l:34,r:12,t:14,b:26}); P.clear(); P.grid();
      var c=P.ctx;
      for(var n=1;n<=20;n++){
        var s=Sn(n);
        var x0=P.X(n-0.4), x1=P.X(n+0.4), y0=P.Y(0), y1=P.Y(s);
        c.fillStyle=INDIGO;
        c.fillRect(Math.min(x0,x1), Math.min(y0,y1), Math.abs(x1-x0), Math.abs(y1-y0));
      }
      if(conv){ P.segment(0,u1/(1-r),21,u1/(1-r),AMBER2,2,[6,4]); }
      document.getElementById('ibslGeoS20').textContent=fmt(Sn(20),3);
      document.getElementById('ibslGeoSinf').textContent = conv ? fmt(u1/(1-r),3) : 'diverges';
      updateDataView();
    }
    register(canvas,draw);
    var rs=document.getElementById('ibslGeoR'), us=document.getElementById('ibslGeoU1');
    function upd(){
      r=parseFloat(rs.value); u1=parseFloat(us.value);
      document.getElementById('ibslGeoRVal').textContent=fmt(r,2);
      document.getElementById('ibslGeoU1Val').textContent=fmt(u1,1);
      redrawAll();
    }
    rs.addEventListener('input',upd); us.addEventListener('input',upd); upd();
  })();

  /* IB SL TOPIC 4 — the Binomial distribution, bar chart with a
     highlighted outcome k (matches the Practice Problem's n=12, p=0.30
     exactly at the default settings). */
  (function(){
    var canvas=document.getElementById('ibslBinomCanvas'); if(!canvas) return;
    var view={xmin:-0.5,xmax:12.5,ymin:0,ymax:0.3};
    var n=12, p=0.30, kSel=4;
    var dataBtn=document.getElementById('ibslBinomDataBtn'), dataPanel=document.getElementById('ibslBinomDataPanel'),
        dataDesc=document.getElementById('ibslBinomDataDesc'), dataRows=document.getElementById('ibslBinomDataRows');
    wireDataToggle(dataBtn,dataPanel);
    function nCk(nn,k){
      if(k<0||k>nn) return 0;
      var r=1;
      for(var i=0;i<k;i++){ r=r*(nn-i)/(i+1); }
      return r;
    }
    function pmf(k){
      if(k<0||k>n) return 0;
      return nCk(n,k)*Math.pow(p,k)*Math.pow(1-p,n-k);
    }
    function updateDataView(){
      if(!dataDesc) return;
      dataDesc.textContent='X ~ B('+n+', '+fmt(p,2)+'). Mean μ = np = '+fmt(n*p,2)+'. P(X = '+kSel+') = '+fmt(pmf(kSel),4)+(kSel>n?' — no such outcome, k exceeds n.':'.');
      var rows=[];
      for(var k=0;k<=n;k++){ rows.push([k,fmt(pmf(k),4)]); }
      renderDataRows(dataRows,rows);
    }
    function draw(ctx,w,h){
      var maxP=0, k;
      for(k=0;k<=n;k++){ maxP=Math.max(maxP,pmf(k)); }
      view.xmin=-0.5; view.xmax=n+0.5; view.ymin=0; view.ymax = maxP>0 ? maxP*1.25 : 1;
      var P=new Plot(ctx,w,h,view,{l:30,r:12,t:12,b:24}); P.clear(); P.grid();
      var c=P.ctx;
      for(k=0;k<=n;k++){
        var pr=pmf(k);
        var x0=P.X(k-0.4), x1=P.X(k+0.4), y0=P.Y(0), y1=P.Y(pr);
        c.fillStyle = k===kSel ? 'rgba(200,144,42,0.85)' : 'rgba(30,58,110,0.65)';
        c.fillRect(x0, y1, x1-x0, y0-y1);
      }
      document.getElementById('ibslBinomMean').textContent=fmt(n*p,2);
      document.getElementById('ibslBinomPK').textContent=fmt(pmf(kSel),4);
      updateDataView();
    }
    register(canvas,draw);
    var sN=document.getElementById('ibslBinomN'), sP=document.getElementById('ibslBinomP'), sK=document.getElementById('ibslBinomK');
    function upd(){
      n=parseInt(sN.value,10); p=parseInt(sP.value,10)/100; kSel=parseInt(sK.value,10);
      document.getElementById('ibslBinomNVal').textContent=n;
      document.getElementById('ibslBinomPVal').textContent=sP.value+'%';
      document.getElementById('ibslBinomKVal').textContent=kSel;
      redrawAll();
    }
    sN.addEventListener('input',upd); sP.addEventListener('input',upd); sK.addEventListener('input',upd);
    upd();
  })();

  /* IB SL TOPIC 4 — the Normal distribution, shaded to a movable x */
  (function(){
    var canvas=document.getElementById('ibslNormCanvas'); if(!canvas) return;
    var view={xmin:0,xmax:20,ymin:0,ymax:0.3};
    var mu=10, sigma=2, xVal=10;
    var dataBtn=document.getElementById('ibslNormDataBtn'), dataPanel=document.getElementById('ibslNormDataPanel'),
        dataDesc=document.getElementById('ibslNormDataDesc'), dataRows=document.getElementById('ibslNormDataRows');
    wireDataToggle(dataBtn,dataPanel);
    function erf(x){
      var sign = x<0 ? -1 : 1; x=Math.abs(x);
      var a1=0.254829592, a2=-0.284496736, a3=1.421413741, a4=-1.453152027, a5=1.061405429, p=0.3275911;
      var t=1/(1+p*x);
      var y=1-((((a5*t+a4)*t+a3)*t+a2)*t+a1)*t*Math.exp(-x*x);
      return sign*y;
    }
    function pdf(x){ return Math.exp(-0.5*Math.pow((x-mu)/sigma,2))/(sigma*Math.sqrt(2*Math.PI)); }
    function cdf(x){ return 0.5*(1+erf((x-mu)/(sigma*Math.SQRT2))); }
    function updateDataView(z,p){
      if(!dataDesc) return;
      dataDesc.textContent='X ~ N('+fmt(mu,1)+', '+fmt(sigma,1)+'²). At x = '+fmt(xVal,1)+', z = '+fmt(z,3)+', P(X ≤ x) = '+fmt(p,4)+'.';
      var rows=[];
      [-2,-1,0,1,2].forEach(function(k){
        var x=mu+k*sigma;
        rows.push(['μ'+(k===0?'':(k>0?'+'+k:k))+'σ', fmt(x,2), fmt(cdf(x),4)]);
      });
      renderDataRows(dataRows,rows);
    }
    function draw(ctx,w,h){
      view.xmin=mu-4*sigma; view.xmax=mu+4*sigma; view.ymin=0; view.ymax=pdf(mu)*1.25;
      var P=new Plot(ctx,w,h,view,{l:34,r:12,t:14,b:26}); P.clear(); P.grid();
      var xd=Math.max(view.xmin,Math.min(view.xmax,xVal));
      P.areaUnder(pdf,view.xmin,xd,'rgba(30,58,110,0.16)');
      P.curve(pdf,INDIGO,2.4);
      P.vline(xd,AMBER2,[5,4]);
      var z=(xVal-mu)/sigma, p=cdf(xVal);
      document.getElementById('ibslNormZ').textContent=fmt(z,3);
      document.getElementById('ibslNormP').textContent=fmt(p,4);
      updateDataView(z,p);
    }
    register(canvas,draw);
    var sMu=document.getElementById('ibslNormMu'), sSigma=document.getElementById('ibslNormSigma'), sX=document.getElementById('ibslNormX');
    function upd(){
      mu=parseFloat(sMu.value); sigma=parseFloat(sSigma.value); xVal=parseFloat(sX.value);
      document.getElementById('ibslNormMuVal').textContent=fmt(mu,1);
      document.getElementById('ibslNormSigmaVal').textContent=fmt(sigma,1);
      document.getElementById('ibslNormXVal').textContent=fmt(xVal,1);
      redrawAll();
    }
    sMu.addEventListener('input',upd); sSigma.addEventListener('input',upd); sX.addEventListener('input',upd); upd();
  })();

  /* IB SL AI — Voronoi diagram, three fixed sites, movable query point */
  (function(){
    var canvas=document.getElementById('ibslVorCanvas'); if(!canvas) return;
    var view={xmin:0,xmax:10,ymin:0,ymax:10};
    var TEAL='#0e9f8f';
    var sites=[[2,2],[8,3],[5,8]];
    var cols=[INDIGO,AMBER2,TEAL];
    var fills=['rgba(30,58,110,0.14)','rgba(200,144,42,0.16)','rgba(14,159,143,0.16)'];
    var qx=5, qy=5;
    var dataBtn=document.getElementById('ibslVorDataBtn'), dataPanel=document.getElementById('ibslVorDataPanel'),
        dataDesc=document.getElementById('ibslVorDataDesc'), dataRows=document.getElementById('ibslVorDataRows');
    wireDataToggle(dataBtn,dataPanel);
    function nearest(px,py){
      var best=0, bd=Infinity;
      for(var i=0;i<sites.length;i++){
        var dx=px-sites[i][0], dy=py-sites[i][1], d=dx*dx+dy*dy;
        if(d<bd){ bd=d; best=i; }
      }
      return best;
    }
    function updateDataView(qk,dist){
      if(!dataDesc) return;
      dataDesc.textContent='Query point ('+fmt(qx,1)+', '+fmt(qy,1)+') is closest to Site '+(qk+1)+', distance '+fmt(dist,2)+'.';
      var rows=[];
      sites.forEach(function(s,i){ rows.push(['Site '+(i+1), fmt(s[0],1)+', '+fmt(s[1],1), i===qk?'nearest':'']); });
      renderDataRows(dataRows,rows);
    }
    function draw(ctx,w,h){
      var P=new Plot(ctx,w,h,view,{l:26,r:10,t:10,b:20}); P.clear();
      var c=P.ctx, N=28;
      for(var i=0;i<N;i++){
        for(var j=0;j<N;j++){
          var x=view.xmin+(view.xmax-view.xmin)*(i+0.5)/N, y=view.ymin+(view.ymax-view.ymin)*(j+0.5)/N;
          var k=nearest(x,y);
          var x0=P.X(view.xmin+(view.xmax-view.xmin)*i/N), x1=P.X(view.xmin+(view.xmax-view.xmin)*(i+1)/N);
          var y0=P.Y(view.ymin+(view.ymax-view.ymin)*j/N), y1=P.Y(view.ymin+(view.ymax-view.ymin)*(j+1)/N);
          c.fillStyle=fills[k];
          c.fillRect(Math.min(x0,x1), Math.min(y1,y0), Math.abs(x1-x0), Math.abs(y0-y1));
        }
      }
      for(var s=0;s<sites.length;s++){ P.dot(sites[s][0],sites[s][1],cols[s],6); }
      P.ring(qx,qy,INK,5);
      var qk=nearest(qx,qy), dist=Math.sqrt(Math.pow(qx-sites[qk][0],2)+Math.pow(qy-sites[qk][1],2));
      document.getElementById('ibslVorSite').textContent='Site '+(qk+1);
      document.getElementById('ibslVorDist').textContent=fmt(dist,2);
      updateDataView(qk,dist);
    }
    register(canvas,draw);
    var sX=document.getElementById('ibslVorX'), sY=document.getElementById('ibslVorY');
    function upd(){
      qx=parseFloat(sX.value); qy=parseFloat(sY.value);
      document.getElementById('ibslVorXVal').textContent=fmt(qx,1);
      document.getElementById('ibslVorYVal').textContent=fmt(qy,1);
      redrawAll();
    }
    sX.addEventListener('input',upd); sY.addEventListener('input',upd); upd();
  })();
})(window.CSExplorerKit);
