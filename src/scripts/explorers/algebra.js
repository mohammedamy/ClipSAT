/* Canvas explorers for the algebra track (Plan 5 Phase 5.015, ADR 0039).
   Moved verbatim out of modules/02-core-app.js. build.js minifies this file to
   public/js/ex/algebra.js, which base.njk loads only on the algebra page, right after
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

  /* ===================== LINE EXPLORER (Algebra) ===================== */
  (function(){
    var canvas=document.getElementById('lineCanvas'); if(!canvas) return;
    var m=1, b=1, view={xmin:-6,xmax:6,ymin:-6,ymax:6};
    var ms=document.getElementById('lineM'), bs=document.getElementById('lineB');
    var dataBtn=document.getElementById('lineDataBtn'), dataPanel=document.getElementById('lineDataPanel'),
        dataDesc=document.getElementById('lineDataDesc'), dataRows=document.getElementById('lineDataRows');
    wireDataToggle(dataBtn,dataPanel);
    function f(x){ return m*x+b; }
    function updateDataView(){
      if(!dataDesc) return;
      var xint=(Math.abs(m)>1e-6)?fmt(-b/m,2):null;
      dataDesc.textContent='Line: y = '+fmt(m,2)+'x '+(b>=0?'+ '+fmt(b,2):'− '+fmt(Math.abs(b),2))+'. Slope m = '+fmt(m,2)+'. y-intercept (0, '+fmt(b,2)+'). x-intercept '+(xint!==null?'('+xint+', 0)':'none (horizontal line)')+'.';
      var N=9, rows=[];
      for(var i=0;i<N;i++){ var x=view.xmin+(view.xmax-view.xmin)*i/(N-1); rows.push([fmt(x),fmt(f(x))]); }
      renderDataRows(dataRows,rows);
    }
    function draw(ctx,w,h){
      var P=new Plot(ctx,w,h,view,{l:30,r:12,t:14,b:26}); P.clear(); P.grid();
      P.curve(f,INDIGO,2.8);
      P.dot(0,b,AMBER2,5.5);
      if(Math.abs(m)>1e-6) P.dot(-b/m,0,AMBER2,5.5);
      var bs2=(b>=0?'+ '+fmt(b,2):'− '+fmt(Math.abs(b),2));
      document.getElementById('lineEq').textContent='y = '+fmt(m,2)+'x '+bs2;
      document.getElementById('lineMv').textContent=fmt(m,1);
      document.getElementById('lineBv').textContent=fmt(b,1);
      document.getElementById('lineSlope').textContent=fmt(m,2);
      document.getElementById('lineYint').textContent='(0, '+fmt(b,2)+')';
      document.getElementById('lineXint').textContent=(Math.abs(m)>1e-6)?('('+fmt(-b/m,2)+', 0)'):'none (horizontal)';
      updateDataView();
    }
    register(canvas,draw);
    ms.addEventListener('input',function(){ m=parseFloat(ms.value); redrawAll(); });
    bs.addEventListener('input',function(){ b=parseFloat(bs.value); redrawAll(); });
  })();

  /* ===================== QUADRATIC EXPLORER (Algebra) ===================== */
  (function(){
    var canvas=document.getElementById('quadCanvas'); if(!canvas) return;
    var a=1, b=-1, c=-3, view={xmin:-6,xmax:6,ymin:-8,ymax:10};
    var as=document.getElementById('quadA'), bs=document.getElementById('quadB'), cs=document.getElementById('quadC');
    var dataBtn=document.getElementById('quadDataBtn'), dataPanel=document.getElementById('quadDataPanel'),
        dataDesc=document.getElementById('quadDataDesc'), dataRows=document.getElementById('quadDataRows');
    wireDataToggle(dataBtn,dataPanel);
    function f(x){ return a*x*x+b*x+c; }
    function updateDataView(disc,isQ){
      if(!dataDesc) return;
      var desc='Parabola: y = '+fmt(a,1)+'x² '+(b>=0?'+ '+fmt(b,1):'− '+fmt(Math.abs(b),1))+'x '+(c>=0?'+ '+fmt(c,1):'− '+fmt(Math.abs(c),1))+'. Discriminant Δ = '+fmt(disc,2)+'. ';
      if(!isQ){ desc+='a = 0, so this is not actually quadratic.'; }
      else {
        var vx=-b/(2*a);
        desc+='Vertex ('+fmt(vx,2)+', '+fmt(f(vx),2)+'). ';
        if(disc>1e-9){ var s=Math.sqrt(disc); desc+='Two real roots: x = '+fmt((-b+s)/(2*a),2)+' and '+fmt((-b-s)/(2*a),2)+'.'; }
        else if(disc>-1e-9){ desc+='One repeated root at x = '+fmt(vx,2)+'.'; }
        else { desc+='No real roots.'; }
      }
      dataDesc.textContent=desc;
      var N=9, rows=[];
      for(var i=0;i<N;i++){ var x=view.xmin+(view.xmax-view.xmin)*i/(N-1); rows.push([fmt(x),fmt(f(x))]); }
      renderDataRows(dataRows,rows);
    }
    function draw(ctx,w,h){
      var P=new Plot(ctx,w,h,view,{l:32,r:12,t:14,b:26}); P.clear(); P.grid();
      P.curve(f,INDIGO,2.8);
      var disc=b*b-4*a*c, isQ=Math.abs(a)>1e-6;
      if(isQ){
        var vx=-b/(2*a), vy=f(vx);
        P.vline(vx,'rgba(184,128,31,.4)',[4,4]);
        if(disc>=0){
          var sq=Math.sqrt(disc);
          P.dot((-b+sq)/(2*a),0,AMBER,5);
          P.dot((-b-sq)/(2*a),0,AMBER,5);
        }
        P.dot(vx,vy,AMBER2,5.5);
      }
      var bb=(b>=0?'+ '+fmt(b,1):'− '+fmt(Math.abs(b),1));
      var cc=(c>=0?'+ '+fmt(c,1):'− '+fmt(Math.abs(c),1));
      document.getElementById('quadEq').textContent='y = '+fmt(a,1)+'x² '+bb+'x '+cc;
      document.getElementById('quadAv').textContent=fmt(a,1);
      document.getElementById('quadBv').textContent=fmt(b,1);
      document.getElementById('quadCv').textContent=fmt(c,1);
      document.getElementById('quadDisc').textContent=fmt(disc,2);
      var vEl=document.getElementById('quadVert'), rEl=document.getElementById('quadRoots');
      if(!isQ){ vEl.textContent='— (a = 0)'; rEl.textContent='not quadratic'; }
      else {
        vEl.textContent='('+fmt(-b/(2*a),2)+', '+fmt(f(-b/(2*a)),2)+')';
        if(disc>1e-9){ var s=Math.sqrt(disc); rEl.textContent='x = '+fmt((-b+s)/(2*a),2)+',  '+fmt((-b-s)/(2*a),2); }
        else if(disc>-1e-9){ rEl.textContent='x = '+fmt(-b/(2*a),2)+'  (double)'; }
        else { rEl.textContent='no real roots'; }
      }
      updateDataView(disc,isQ);
    }
    register(canvas,draw);
    as.addEventListener('input',function(){ a=parseFloat(as.value); redrawAll(); });
    bs.addEventListener('input',function(){ b=parseFloat(bs.value); redrawAll(); });
    cs.addEventListener('input',function(){ c=parseFloat(cs.value); redrawAll(); });
  })();

  /* ===================== TRANSFORMATIONS (Algebra) ===================== */
  (function(){
    var canvas=document.getElementById('tfCanvas'); if(!canvas) return;
    function coef(a){ return (a===1?'':(a===-1?'−':fmt(a,1)+'·')); }
    function sh(h){ return h===0?'':(h>0?' − '+fmt(h,1):' + '+fmt(Math.abs(h),1)); }
    function vk(k){ return k===0?'':(k>0?' + '+fmt(k,1):' − '+fmt(Math.abs(k),1)); }
    var parents={
      sq:{base:function(t){return t*t;}, eq:function(a,h,k){return 'g(x) = '+coef(a)+'(x'+sh(h)+')²'+vk(k);}},
      abs:{base:function(t){return Math.abs(t);}, eq:function(a,h,k){return 'g(x) = '+coef(a)+'|x'+sh(h)+'|'+vk(k);}},
      sqrt:{base:function(t){return t>=0?Math.sqrt(t):NaN;}, eq:function(a,h,k){return 'g(x) = '+coef(a)+'√(x'+sh(h)+')'+vk(k);}}
    };
    var key='sq', a=1, h=0, k=0, view={xmin:-6,xmax:6,ymin:-6,ymax:6};
    var sel=document.getElementById('tfFn'),
        as=document.getElementById('tfA'), hs=document.getElementById('tfH'), ks=document.getElementById('tfK');
    var dataBtn=document.getElementById('tfDataBtn'), dataPanel=document.getElementById('tfDataPanel'),
        dataDesc=document.getElementById('tfDataDesc'), dataRows=document.getElementById('tfDataRows');
    wireDataToggle(dataBtn,dataPanel);
    var PARENT_LABEL={ sq:'x²', abs:'|x|', sqrt:'√x' };
    function base(x){ return parents[key].base(x); }
    function g(x){ var inner=base(x-h); return isFinite(inner)? a*inner+k : NaN; }
    function updateDataView(){
      if(!dataDesc) return;
      dataDesc.textContent='Parent function: '+PARENT_LABEL[key]+'. Transformation: '+parents[key].eq(a,h,k)+'. Key point (from the parent'+"'"+'s origin) maps to ('+fmt(h,1)+', '+fmt(k,1)+').';
      var N=9, rows=[];
      for(var i=0;i<N;i++){
        var x=view.xmin+(view.xmax-view.xmin)*i/(N-1), bv=base(x), gv=g(x);
        rows.push([fmt(x), isFinite(bv)?fmt(bv):'—', isFinite(gv)?fmt(gv):'—']);
      }
      renderDataRows(dataRows,rows);
    }
    function draw(ctx,w,ht){
      var P=new Plot(ctx,w,ht,view,{l:30,r:12,t:14,b:26}); P.clear(); P.grid();
      P.curve(base,'#B7C0CE',2,[5,4]);
      P.curve(g,INDIGO,2.8);
      P.dot(h,k,AMBER2,5.5);
      document.getElementById('tfEq').textContent=parents[key].eq(a,h,k);
      document.getElementById('tfKey').textContent='('+fmt(h,1)+', '+fmt(k,1)+')';
      document.getElementById('tfAv').textContent=fmt(a,1);
      document.getElementById('tfHv').textContent=fmt(h,1);
      document.getElementById('tfKv').textContent=fmt(k,1);
      updateDataView();
    }
    register(canvas,draw);
    sel.addEventListener('change',function(){ key=sel.value; redrawAll(); });
    as.addEventListener('input',function(){ a=parseFloat(as.value); redrawAll(); });
    hs.addEventListener('input',function(){ h=parseFloat(hs.value); redrawAll(); });
    ks.addEventListener('input',function(){ k=parseFloat(ks.value); redrawAll(); });
  })();

  /* ===================== EXPONENTIAL & LOG (Algebra) ===================== */
  (function(){
    var canvas=document.getElementById('expCanvas'); if(!canvas) return;
    var a=1, b=2, inv=false, view={xmin:-4,xmax:4,ymin:-2,ymax:9};
    var as=document.getElementById('expA'), bs=document.getElementById('expB'), iv=document.getElementById('expInv');
    var dataBtn=document.getElementById('expDataBtn'), dataPanel=document.getElementById('expDataPanel'),
        dataDesc=document.getElementById('expDataDesc'), dataRows=document.getElementById('expDataRows');
    wireDataToggle(dataBtn,dataPanel);
    function f(x){ return a*Math.pow(b,x); }
    function invf(x){ if(x<=0||a<=0||b<=0||Math.abs(b-1)<1e-9) return NaN; return Math.log(x/a)/Math.log(b); }
    function updateDataView(){
      if(!dataDesc) return;
      var type=(b>1.0001?'growth (b > 1)':(b<0.9999?'decay (0 < b < 1)':'constant (b = 1)'));
      dataDesc.textContent='Function: y = '+fmt(a,1)+'·'+fmt(b,1)+'ˣ ('+type+'). y-intercept (0, '+fmt(a,1)+').'+(inv?' Inverse (log) curve is shown alongside it.':'');
      var N=9, rows=[];
      for(var i=0;i<N;i++){
        var x=view.xmin+(view.xmax-view.xmin)*i/(N-1), fv=f(x);
        var iv2=inv?invf(x):NaN;
        rows.push([fmt(x), isFinite(fv)?fmt(fv):'—', (inv&&isFinite(iv2))?fmt(iv2):'—']);
      }
      renderDataRows(dataRows,rows);
    }
    function draw(ctx,w,h){
      var P=new Plot(ctx,w,h,view,{l:30,r:12,t:14,b:26}); P.clear(); P.grid();
      if(inv){
        var lo=Math.max(view.xmin,view.ymin), hi=Math.min(view.xmax,view.ymax);
        P.segment(lo,lo,hi,hi,'#B7C0CE',1.6,[5,4]);
        P.curve(invf,AMBER2,2.4);
      }
      P.curve(f,INDIGO,2.8);
      P.dot(0,a,AMBER2,5.5);
      document.getElementById('expAv').textContent=fmt(a,1);
      document.getElementById('expBv').textContent=fmt(b,1);
      document.getElementById('expEq').textContent='y = '+fmt(a,1)+'·'+fmt(b,1)+'ˣ';
      document.getElementById('expType').textContent=(b>1.0001?'growth (b > 1)':(b<0.9999?'decay (0 < b < 1)':'constant (b = 1)'));
      document.getElementById('expYint').textContent='(0, '+fmt(a,1)+')';
      updateDataView();
    }
    register(canvas,draw);
    as.addEventListener('input',function(){ a=parseFloat(as.value); redrawAll(); });
    bs.addEventListener('input',function(){ b=parseFloat(bs.value); redrawAll(); });
    iv.addEventListener('change',function(){ inv=iv.checked; redrawAll(); });
  })();

  /* ===================== SYSTEM OF LINES (Algebra) ===================== */
  (function(){
    var canvas=document.getElementById('sysCanvas'); if(!canvas) return;
    var m1=1,b1=-1,m2=-1,b2=2, view={xmin:-6,xmax:6,ymin:-6,ymax:6};
    var dataBtn=document.getElementById('sysDataBtn'), dataPanel=document.getElementById('sysDataPanel'),
        dataDesc=document.getElementById('sysDataDesc'), dataRows=document.getElementById('sysDataRows');
    wireDataToggle(dataBtn,dataPanel);
    function L1(x){ return m1*x+b1; } function L2(x){ return m2*x+b2; }
    function updateDataView(sol){
      if(!dataDesc) return;
      dataDesc.textContent='Line 1: y = '+fmt(m1,1)+'x '+(b1>=0?'+ '+fmt(b1,1):'− '+fmt(Math.abs(b1),1))+'. Line 2: y = '+fmt(m2,1)+'x '+(b2>=0?'+ '+fmt(b2,1):'− '+fmt(Math.abs(b2),1))+'. Solution: '+sol+'.';
      var N=9, rows=[];
      for(var i=0;i<N;i++){ var x=view.xmin+(view.xmax-view.xmin)*i/(N-1); rows.push([fmt(x),fmt(L1(x)),fmt(L2(x))]); }
      renderDataRows(dataRows,rows);
    }
    function draw(ctx,w,h){
      var P=new Plot(ctx,w,h,view,{l:30,r:12,t:14,b:26}); P.clear(); P.grid();
      P.curve(L1,INDIGO,2.8); P.curve(L2,INDIGO2,2.6);
      var sol;
      if(Math.abs(m1-m2)<1e-9){ sol=(Math.abs(b1-b2)<1e-9)?'infinitely many (same line)':'no solution (parallel)'; }
      else { var x=(b2-b1)/(m1-m2), y=m1*x+b1; P.dot(x,y,AMBER2,6); sol='('+fmt(x,2)+', '+fmt(y,2)+')'; }
      document.getElementById('sysSol').textContent=sol;
      document.getElementById('sysM1v').textContent=fmt(m1,1);
      document.getElementById('sysB1v').textContent=fmt(b1,1);
      document.getElementById('sysM2v').textContent=fmt(m2,1);
      document.getElementById('sysB2v').textContent=fmt(b2,1);
      updateDataView(sol);
    }
    register(canvas,draw);
    document.getElementById('sysM1').addEventListener('input',function(e){ m1=parseFloat(e.target.value); redrawAll(); });
    document.getElementById('sysB1').addEventListener('input',function(e){ b1=parseFloat(e.target.value); redrawAll(); });
    document.getElementById('sysM2').addEventListener('input',function(e){ m2=parseFloat(e.target.value); redrawAll(); });
    document.getElementById('sysB2').addEventListener('input',function(e){ b2=parseFloat(e.target.value); redrawAll(); });
  })();
})(window.CSExplorerKit);
