/* Canvas explorers for the qudrat track (Plan 5 Phase 5.015, ADR 0039).
   Moved verbatim out of modules/02-core-app.js. build.js minifies this file to
   public/js/ex/qudrat.js, which base.njk loads only on the qudrat page, right after
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

  /* ===================== QUDRAT · PERCENT CHANGE ===================== */
  (function(){
    var canvas=document.getElementById('qudPctCanvas'); if(!canvas) return;
    var base=80, nv=100, s=document.getElementById('qudPctNew');
    var dataBtn=document.getElementById('qudPctDataBtn'), dataPanel=document.getElementById('qudPctDataPanel'),
        dataDesc=document.getElementById('qudPctDataDesc'), dataRows=document.getElementById('qudPctDataRows');
    wireDataToggle(dataBtn,dataPanel);
    function updateDataView(pct){
      if(!dataDesc) return;
      dataDesc.textContent='Original value '+base+', new value '+nv+'. Change = '+(nv-base)+'. Percent change = ('+nv+' − '+base+') / '+base+' × 100% = '+(pct>=0?'+':'')+pct.toFixed(1)+'%.';
      renderDataRows(dataRows,[
        ['original',base],['new',nv],['change (new − original)',(nv-base)],['percent change',(pct>=0?'+':'')+pct.toFixed(1)+'%']
      ]);
    }
    function draw(ctx,w,h){
      ctx.clearRect(0,0,w,h);
      var maxV=160, bot=h-26, top=14, scale=(bot-top)/maxV;
      function bar(cx,val,color,label){
        var bw=Math.min(64,w*0.20), x=cx-bw/2, y=bot-val*scale;
        ctx.fillStyle=color; ctx.fillRect(x,y,bw,bot-y);
        ctx.fillStyle=INK; ctx.font='600 13px ui-sans-serif, system-ui, sans-serif'; ctx.textAlign='center';
        ctx.fillText(Math.round(val), cx, y-6);
        ctx.fillStyle=MUTED; ctx.font='12px ui-sans-serif, system-ui, sans-serif';
        ctx.fillText(label, cx, bot+16);
      }
      ctx.strokeStyle='#C2CCDA'; ctx.lineWidth=1; ctx.beginPath(); ctx.moveTo(20,bot); ctx.lineTo(w-12,bot); ctx.stroke();
      bar(w*0.32, base, INDIGO, 'original');
      bar(w*0.68, nv, AMBER2, 'new');
      ctx.textAlign='left';
      var pct=(nv-base)/base*100;
      document.getElementById('qudPctChange').textContent=(pct>=0?'+':'')+pct.toFixed(1)+'%';
      updateDataView(pct);
    }
    register(canvas,draw);
    s.addEventListener('input',function(){ nv=parseInt(s.value,10); document.getElementById('qudPctNewV').textContent=nv; redrawAll(); });
  })();

  /* ===================== QUDRAT · RATIO SPLIT ===================== */
  (function(){
    var canvas=document.getElementById('qudRatioCanvas'); if(!canvas) return;
    var total=120, a=2, b=3, sa=document.getElementById('qudRatioA'), sb=document.getElementById('qudRatioB');
    var dataBtn=document.getElementById('qudRatioDataBtn'), dataPanel=document.getElementById('qudRatioDataPanel'),
        dataDesc=document.getElementById('qudRatioDataDesc'), dataRows=document.getElementById('qudRatioDataRows');
    wireDataToggle(dataBtn,dataPanel);
    function updateDataView(shA,shB){
      if(!dataDesc) return;
      dataDesc.textContent='Total '+total+' split in the ratio '+a+' : '+b+' ('+(a+b)+' parts total, each part = '+fmt(total/(a+b),2)+'). Share A = '+Math.round(shA)+', share B = '+Math.round(shB)+'.';
      renderDataRows(dataRows,[
        ['ratio',a+' : '+b],['total',total],['share A ('+a+' parts)',Math.round(shA)],['share B ('+b+' parts)',Math.round(shB)]
      ]);
    }
    function draw(ctx,w,h){
      ctx.clearRect(0,0,w,h);
      var x0=20, x1=w-14, bw=x1-x0, y=h/2-26, bh=52;
      var fracA=a/(a+b);
      var wa=bw*fracA;
      ctx.fillStyle=INDIGO; ctx.fillRect(x0,y,wa,bh);
      ctx.fillStyle=AMBER2; ctx.fillRect(x0+wa,y,bw-wa,bh);
      var shA=total*fracA, shB=total*(1-fracA);
      ctx.fillStyle='#fff'; ctx.font='600 14px ui-sans-serif, system-ui, sans-serif'; ctx.textAlign='center';
      if(wa>42) ctx.fillText(Math.round(shA), x0+wa/2, y+bh/2+5);
      if(bw-wa>42) ctx.fillText(Math.round(shB), x0+wa+(bw-wa)/2, y+bh/2+5);
      ctx.fillStyle=MUTED; ctx.font='12px ui-sans-serif, system-ui, sans-serif';
      ctx.fillText('ratio '+a+' : '+b+'  of  '+total, w/2, y-12);
      ctx.textAlign='left';
      document.getElementById('qudShareA').textContent=Math.round(shA);
      document.getElementById('qudShareB').textContent=Math.round(shB);
      updateDataView(shA,shB);
    }
    function upd(){ a=parseInt(sa.value,10); b=parseInt(sb.value,10);
      document.getElementById('qudRatioAv').textContent=a; document.getElementById('qudRatioBv').textContent=b; redrawAll(); }
    register(canvas,draw); sa.addEventListener('input',upd); sb.addEventListener('input',upd);
  })();

  /* ===================== QUDRAT · QUANTITATIVE COMPARISON ===================== */
  (function(){
    var canvas=document.getElementById('qudCmpCanvas'); if(!canvas) return;
    var x=1, s=document.getElementById('qudCmpX');
    var xmin=-12, xmax=14;
    var dataBtn=document.getElementById('qudCmpDataBtn'), dataPanel=document.getElementById('qudCmpDataPanel'),
        dataDesc=document.getElementById('qudCmpDataDesc'), dataRows=document.getElementById('qudCmpDataRows');
    wireDataToggle(dataBtn,dataPanel);
    function rel(A,B){ return A>B ? 'A > B' : (A<B ? 'A < B' : 'A = B'); }
    function updateDataView(A,B){
      if(!dataDesc) return;
      dataDesc.textContent='Quantity A = 2x, quantity B = x + 3. At x = '+x+': A = '+A+', B = '+B+', so '+rel(A,B)+'. The two are equal when 2x = x + 3, i.e. x = 3 — for x < 3, B > A; for x > 3, A > B.';
      var rows=[], xs=[x-2,x-1,x,x+1,x+2];
      for(var i=0;i<xs.length;i++){ var xv=xs[i], Av=2*xv, Bv=xv+3; rows.push([xv,Av,Bv,rel(Av,Bv)]); }
      renderDataRows(dataRows,rows);
    }
    function px(val,w){ return 24+(val-xmin)/(xmax-xmin)*(w-38); }
    function draw(ctx,w,h){
      ctx.clearRect(0,0,w,h);
      var y=h/2;
      ctx.strokeStyle='#C2CCDA'; ctx.lineWidth=1.5; ctx.beginPath(); ctx.moveTo(20,y); ctx.lineTo(w-12,y); ctx.stroke();
      ctx.fillStyle=MUTED; ctx.font='11px ui-sans-serif, system-ui, sans-serif'; ctx.textAlign='center';
      for(var t=-10;t<=10;t+=5){ var X=px(t,w); ctx.beginPath(); ctx.moveTo(X,y-4); ctx.lineTo(X,y+4); ctx.strokeStyle='#C2CCDA'; ctx.stroke(); ctx.fillText(t, X, y+18); }
      var A=2*x, B=x+3;
      function pt(val,color,label,dir){
        var X=px(val,w);
        ctx.fillStyle=color; ctx.beginPath(); ctx.arc(X,y,6,0,2*Math.PI); ctx.fill();
        ctx.font='600 13px ui-sans-serif, system-ui, sans-serif'; ctx.fillText(label, X, y+dir*16);
      }
      pt(B, AMBER2, 'B', -1);
      pt(A, INDIGO, 'A', 1.6);
      ctx.textAlign='left';
      document.getElementById('qudCmpA').textContent=A;
      document.getElementById('qudCmpB').textContent=B;
      document.getElementById('qudCmpRel').textContent=rel(A,B);
      updateDataView(A,B);
    }
    register(canvas,draw);
    s.addEventListener('input',function(){ x=parseInt(s.value,10); document.getElementById('qudCmpXV').textContent=x; redrawAll(); });
  })();
})(window.CSExplorerKit);
