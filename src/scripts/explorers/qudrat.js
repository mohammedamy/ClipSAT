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
    if(K.makeDraggable){
      K.makeDraggable(canvas, {
        hitTest: function(pxPos, pyPos){
          var y = canvas.height / 2;
          var curA = px(2 * x, canvas.width);
          var curB = px(x + 3, canvas.width);
          if(Math.hypot(pxPos - curA, pyPos - (y + 24)) < 24) return 'A';
          if(Math.hypot(pxPos - curB, pyPos - (y - 16)) < 24) return 'B';
          if(Math.abs(pyPos - y) < 30) return 'axis';
          return null;
        },
        onDrag: function(target, pxPos, pyPos){
          var val = xmin + (pxPos - 24) / (canvas.width - 38) * (xmax - xmin);
          if(target === 'A') val = val / 2;
          else if(target === 'B') val = val - 3;
          var newX = Math.round(Math.max(-8, Math.min(10, val)));
          x = newX;
          if(s) s.value = x;
          var xv = document.getElementById('qudCmpXV');
          if(xv) xv.textContent = x;
          redrawAll();
        }
      });
    }
  })();

  /* ===================== QUDRAT · SHADED REGION GEOMETRY (مساحة الجزء المظلل) ===================== */
  (function(){
    var canvas=document.getElementById('qudShadedCanvas'); if(!canvas) return;
    var r=6, mode=1;
    var sr=document.getElementById('qudShadedR'), sm=document.getElementById('qudShadedMode');
    var dataBtn=document.getElementById('qudShadedDataBtn'), dataPanel=document.getElementById('qudShadedDataPanel'),
        dataDesc=document.getElementById('qudShadedDataDesc'), dataRows=document.getElementById('qudShadedDataRows');
    wireDataToggle(dataBtn,dataPanel);
    function draw(ctx,w,h){
      ctx.clearRect(0,0,w,h);
      var cx=w*0.42, cy=h*0.52, R=Math.min(w,h)*0.34, S=2*R;
      var outerA=0, innerA=0, exactStr='', shadedA=0, titleStr='';
      if(mode===1){
        /* Square of side 2r with inscribed circle of radius r */
        outerA = (2*r)*(2*r);
        innerA = Math.PI*r*r;
        shadedA = r*r*(4 - 3.14);
        exactStr = (r*r)+'(4 − π)';
        titleStr = 'مربع طول ضلعه '+(2*r)+' بداخله دائرة نق = '+r;
        ctx.fillStyle='rgba(200,144,42,0.24)'; ctx.strokeStyle=INK; ctx.lineWidth=2;
        ctx.fillRect(cx-R,cy-R,S,S); ctx.strokeRect(cx-R,cy-R,S,S);
        ctx.fillStyle=PAPER||'#fff'; ctx.strokeStyle=INDIGO; ctx.lineWidth=2.2;
        ctx.beginPath(); ctx.arc(cx,cy,R,0,2*Math.PI); ctx.fill(); ctx.stroke();
        ctx.strokeStyle=AMBER2; ctx.setLineDash([4,3]);
        ctx.beginPath(); ctx.moveTo(cx,cy); ctx.lineTo(cx+R,cy); ctx.stroke(); ctx.setLineDash([]);
        ctx.fillStyle=INDIGO; ctx.font='600 12px ui-sans-serif, system-ui, sans-serif'; ctx.textAlign='center';
        ctx.fillText('r = '+r, cx+R/2, cy-6);
        ctx.fillText('s = '+(2*r), cx, cy+R+16);
      } else if(mode===2){
        /* Circle of radius r with inscribed square of diagonal 2r (area = 2r^2) */
        outerA = Math.PI*r*r;
        innerA = 2*r*r;
        shadedA = r*r*(3.14 - 2);
        exactStr = (r*r)+'(π − 2)';
        titleStr = 'دائرة نق = '+r+' بداخلها مربع قطره '+(2*r);
        ctx.fillStyle='rgba(200,144,42,0.24)'; ctx.strokeStyle=INDIGO; ctx.lineWidth=2.2;
        ctx.beginPath(); ctx.arc(cx,cy,R,0,2*Math.PI); ctx.fill(); ctx.stroke();
        var hs = R/Math.SQRT2;
        ctx.fillStyle=PAPER||'#fff'; ctx.strokeStyle=INK; ctx.lineWidth=2;
        ctx.fillRect(cx-hs,cy-hs,2*hs,2*hs); ctx.strokeRect(cx-hs,cy-hs,2*hs,2*hs);
        ctx.strokeStyle=AMBER2; ctx.setLineDash([4,3]);
        ctx.beginPath(); ctx.moveTo(cx-hs,cy+hs); ctx.lineTo(cx+hs,cy-hs); ctx.stroke(); ctx.setLineDash([]);
        ctx.fillStyle=INDIGO; ctx.font='600 12px ui-sans-serif, system-ui, sans-serif'; ctx.textAlign='center';
        ctx.fillText('قطر المربع = '+(2*r), cx, cy+R+16);
      } else {
        /* 4 tangent circles of radius r/2 inside square of side 2r */
        outerA = (2*r)*(2*r);
        innerA = 4*Math.PI*(r/2)*(r/2);
        shadedA = r*r*(4 - 3.14);
        exactStr = (r*r)+'(4 − π)';
        titleStr = 'مربع ضلعه '+(2*r)+' بداخله 4 دوائر متماسة (نق = '+(r/2)+')';
        ctx.fillStyle='rgba(200,144,42,0.24)'; ctx.strokeStyle=INK; ctx.lineWidth=2;
        ctx.fillRect(cx-R,cy-R,S,S); ctx.strokeRect(cx-R,cy-R,S,S);
        var rs=R/2;
        [[-1,-1],[1,-1],[-1,1],[1,1]].forEach(function(d){
          ctx.fillStyle=PAPER||'#fff'; ctx.strokeStyle=INDIGO; ctx.lineWidth=1.8;
          ctx.beginPath(); ctx.arc(cx+d[0]*rs,cy+d[1]*rs,rs,0,2*Math.PI); ctx.fill(); ctx.stroke();
        });
        ctx.fillStyle=INDIGO; ctx.font='600 12px ui-sans-serif, system-ui, sans-serif'; ctx.textAlign='center';
        ctx.fillText('s = '+(2*r)+', r_small = '+(r/2), cx, cy+R+16);
      }
      ctx.fillStyle=INK; ctx.font='700 12.5px ui-sans-serif, system-ui, sans-serif'; ctx.textAlign='center';
      ctx.fillText(titleStr, w/2, 18);
      /* Formula panel on the right */
      var rx=w*0.76;
      ctx.textAlign='center'; ctx.font='600 12px ui-sans-serif, system-ui, sans-serif';
      ctx.fillStyle=INDIGO; ctx.fillText('الصيغة الذهبية:', rx, cy-28);
      ctx.fillStyle=AMBER2; ctx.font='700 14px ui-sans-serif, system-ui, sans-serif';
      ctx.fillText(exactStr, rx, cy-6);
      ctx.fillStyle=INK; ctx.font='600 12.5px ui-sans-serif, system-ui, sans-serif';
      ctx.fillText('≈ '+shadedA.toFixed(2), rx, cy+18);
      ctx.textAlign='left';
      _set('qudShadedExact', exactStr);
      _set('qudShadedApprox', shadedA.toFixed(2));
      _set('qudShadedOuter', outerA.toFixed(1));
      if(dataDesc){
        dataDesc.textContent = titleStr + ' — المساحة المظللة الدقيقة = ' + exactStr + ' ≈ ' + shadedA.toFixed(2) + ' (باعتبار π ≈ 3.14).';
        renderDataRows(dataRows, [
          ['نصف القطر r', r],
          ['المساحة الخارجية (Outer)', outerA.toFixed(2)],
          ['المساحة الداخلية (Inner)', innerA.toFixed(2)],
          ['المساحة المظللة (الدقيقة)', exactStr],
          ['المساحة المظللة (π ≈ 3.14)', shadedA.toFixed(2)]
        ]);
      }
    }
    function upd(){
      if(sr){ r=parseInt(sr.value,10)||6; _set('qudShadedRV', r); }
      if(sm){ mode=parseInt(sm.value,10)||1; _set('qudShadedModeV', mode===1?'مربع - دائرة':(mode===2?'دائرة - مربع':'4 دوائر متماسة')); }
      redrawAll();
    }
    register(canvas,draw);
    if(sr) sr.addEventListener('input',upd);
    if(sm) sm.addEventListener('input',upd);
  })();

  /* ===================== QUDRAT · CLOCK ANGLE & CYCLIC PATTERNS (زاوية الساعة) ===================== */
  (function(){
    var canvas=document.getElementById('qudClockCanvas'); if(!canvas) return;
    var H=3, M=20;
    var sh=document.getElementById('qudClkH'), sm=document.getElementById('qudClkM');
    var dataBtn=document.getElementById('qudClockDataBtn'), dataPanel=document.getElementById('qudClockDataPanel'),
        dataDesc=document.getElementById('qudClockDataDesc'), dataRows=document.getElementById('qudClockDataRows');
    wireDataToggle(dataBtn,dataPanel);
    function draw(ctx,w,h){
      ctx.clearRect(0,0,w,h);
      var cx=w*0.38, cy=h*0.52, R=Math.min(w,h)*0.36;
      ctx.fillStyle=PAPER||'#fff'; ctx.strokeStyle=INDIGO; ctx.lineWidth=2.4;
      ctx.beginPath(); ctx.arc(cx,cy,R,0,2*Math.PI); ctx.fill(); ctx.stroke();
      ctx.fillStyle=INK; ctx.font='600 11px ui-sans-serif, system-ui, sans-serif'; ctx.textAlign='center';
      for(var k=1;k<=12;k++){
        var ang = (k*30 - 90)*Math.PI/180;
        var tx = cx + (R-15)*Math.cos(ang), ty = cy + (R-15)*Math.sin(ang)+4;
        ctx.fillText(String(k), tx, ty);
      }
      var degH = (H%12)*30 + M*0.5;
      var degM = M*6;
      var diff = Math.abs(30*(H%12) - 5.5*M);
      var minor = diff > 180 ? 360 - diff : diff;
      var reflex = 360 - minor;
      var radH = (degH - 90)*Math.PI/180, radM = (degM - 90)*Math.PI/180;
      /* Draw minor angle sector */
      ctx.fillStyle='rgba(200,144,42,0.22)';
      ctx.beginPath(); ctx.moveTo(cx,cy);
      var a1 = Math.min(radH, radM), a2 = Math.max(radH, radM);
      if(a2 - a1 <= Math.PI) ctx.arc(cx,cy,R*0.42,a1,a2,false);
      else ctx.arc(cx,cy,R*0.42,a2,a1+2*Math.PI,false);
      ctx.closePath(); ctx.fill();
      /* Hands */
      ctx.strokeStyle=INDIGO; ctx.lineWidth=3.4; ctx.lineCap='round';
      ctx.beginPath(); ctx.moveTo(cx,cy); ctx.lineTo(cx+R*0.54*Math.cos(radH), cy+R*0.54*Math.sin(radH)); ctx.stroke();
      ctx.strokeStyle=AMBER2; ctx.lineWidth=2.4;
      ctx.beginPath(); ctx.moveTo(cx,cy); ctx.lineTo(cx+R*0.76*Math.cos(radM), cy+R*0.76*Math.sin(radM)); ctx.stroke();
      ctx.fillStyle=INK; ctx.beginPath(); ctx.arc(cx,cy,4,0,2*Math.PI); ctx.fill();

      var timeStr = H + ':' + (M<10?'0'+M:M);
      var rx = w*0.75;
      ctx.textAlign='center';
      ctx.fillStyle=INK; ctx.font='700 13px ui-sans-serif, system-ui, sans-serif';
      ctx.fillText('الساعة ' + timeStr, rx, cy-34);
      ctx.fillStyle=INDIGO; ctx.font='600 11.5px ui-sans-serif, system-ui, sans-serif';
      ctx.fillText('|30('+H+') − 5.5('+M+')|', rx, cy-12);
      ctx.fillStyle=AMBER2; ctx.font='700 15px ui-sans-serif, system-ui, sans-serif';
      ctx.fillText('الزاوية الصغرى = '+minor.toFixed(1)+'°', rx, cy+12);
      ctx.fillStyle=MUTED; ctx.font='600 11.5px ui-sans-serif, system-ui, sans-serif';
      ctx.fillText('الزاوية الكبرى = '+reflex.toFixed(1)+'°', rx, cy+34);
      ctx.textAlign='left';

      _set('qudClkTime', timeStr);
      _set('qudClkAngle', minor.toFixed(1)+'°');
      _set('qudClkReflex', reflex.toFixed(1)+'°');
      if(dataDesc){
        dataDesc.textContent = 'عند الساعة '+timeStr+': زاوية عقرب الساعات = '+degH.toFixed(1)+'°، زاوية عقرب الدقائق = '+degM.toFixed(1)+'°، الزاوية الصغرى = '+minor.toFixed(1)+'°.';
        renderDataRows(dataRows, [
          ['الوقت (Time)', timeStr],
          ['قانون قياس |30H − 5.5M|', diff.toFixed(1)+'°'],
          ['الزاوية الصغرى (Minor Angle)', minor.toFixed(1)+'°'],
          ['الزاوية الكبرى المنعكسة (Reflex)', reflex.toFixed(1)+'°']
        ]);
      }
    }
    function upd(){
      if(sh){ H=parseInt(sh.value,10)||3; _set('qudClkHV', H); }
      if(sm){ M=parseInt(sm.value,10)||0; _set('qudClkMV', M); }
      redrawAll();
    }
    register(canvas,draw);
    if(sh) sh.addEventListener('input',upd);
    if(sm) sm.addEventListener('input',upd);
  })();

  /* ===================== QUDRAT · MOTION, CATCH-UP & HARMONIC MEAN SPEED ===================== */
  (function(){
    var canvas=document.getElementById('qudMotionCanvas'); if(!canvas) return;
    var v1=60, v2=90, dist=180;
    var sv1=document.getElementById('qudMotV1'), sv2=document.getElementById('qudMotV2');
    var dataBtn=document.getElementById('qudMotionDataBtn'), dataPanel=document.getElementById('qudMotionDataPanel'),
        dataDesc=document.getElementById('qudMotionDataDesc'), dataRows=document.getElementById('qudMotionDataRows');
    wireDataToggle(dataBtn,dataPanel);
    function draw(ctx,w,h){
      ctx.clearRect(0,0,w,h);
      var harm = (2*v1*v2)/(v1+v2);
      var arith = (v1+v2)/2;
      var tMeet = dist/(v1+v2);
      var tCatch = v2>v1 ? (v1*1)/(v2-v1) : Infinity;

      var x0=28, x1=w-28, roadW=x1-x0, yRoad=h*0.42;
      ctx.strokeStyle=INK; ctx.lineWidth=3;
      ctx.beginPath(); ctx.moveTo(x0,yRoad); ctx.lineTo(x1,yRoad); ctx.stroke();
      var meetFrac = v1/(v1+v2), xm = x0 + roadW*meetFrac;
      /* Vehicle 1 arrow */
      ctx.fillStyle=INDIGO; ctx.strokeStyle=INDIGO; ctx.lineWidth=2.4;
      ctx.beginPath(); ctx.moveTo(x0,yRoad-16); ctx.lineTo(xm-6,yRoad-16); ctx.stroke();
      ctx.beginPath(); ctx.arc(x0+6,yRoad-16,5,0,2*Math.PI); ctx.fill();
      ctx.font='600 11.5px ui-sans-serif, system-ui, sans-serif'; ctx.textAlign='left';
      ctx.fillText('v₁ = '+v1+' كم/س →', x0+14, yRoad-24);
      /* Vehicle 2 arrow */
      ctx.fillStyle=AMBER2; ctx.strokeStyle=AMBER2; ctx.lineWidth=2.4;
      ctx.beginPath(); ctx.moveTo(x1,yRoad-16); ctx.lineTo(xm+6,yRoad-16); ctx.stroke();
      ctx.beginPath(); ctx.arc(x1-6,yRoad-16,5,0,2*Math.PI); ctx.fill();
      ctx.textAlign='right';
      ctx.fillText('← v₂ = '+v2+' كم/س', x1-14, yRoad-24);
      /* Meeting point */
      ctx.fillStyle='#10b981';
      ctx.beginPath(); ctx.arc(xm,yRoad,6,0,2*Math.PI); ctx.fill();
      ctx.textAlign='center'; ctx.font='700 11.5px ui-sans-serif, system-ui, sans-serif';
      ctx.fillText('نقطة الالتقاء ('+tMeet.toFixed(2)+' س)', xm, yRoad+22);

      /* Bottom comparison bar: Harmonic Mean vs Arithmetic Mean Trap */
      var yBar=h*0.78;
      ctx.fillStyle=INK; ctx.font='600 12px ui-sans-serif, system-ui, sans-serif';
      ctx.fillText('متوسط السرعة ذهاباً وإياباً = 2v₁v₂/(v₁+v₂) = '+harm.toFixed(1)+' كم/س  (فخ الوسط الحسابي الخاطئ: '+arith.toFixed(1)+' كم/س)', w/2, yBar);
      ctx.textAlign='left';

      _set('qudMotHarm', harm.toFixed(1)+' كم/س');
      _set('qudMotMeet', tMeet.toFixed(2)+' ساعة');
      _set('qudMotCatch', isFinite(tCatch)?(tCatch.toFixed(2)+' ساعة'):'لا تلحق');
      if(dataDesc){
        dataDesc.textContent = 'السرعة المتوسطة ذهاباً وإياباً = '+harm.toFixed(1)+' كم/س، زمن الالتقاء في اتجاهين متعاكسين (مسافة '+dist+' كم) = '+tMeet.toFixed(2)+' ساعة.';
        renderDataRows(dataRows, [
          ['السرعة الأولى v₁', v1+' كم/س'],
          ['السرعة الثانية v₂', v2+' كم/س'],
          ['متوسط السرعة ذهاباً وإياباً (Harmonic)', harm.toFixed(2)+' كم/س'],
          ['زمن الالتقاء (باتجاهين متعاكسين لـ 180 كم)', tMeet.toFixed(2)+' ساعة'],
          ['زمن اللحاق بعد تقدم ساعة واحدة', isFinite(tCatch)?(tCatch.toFixed(2)+' ساعة'):'غير ممكن (v₂ ≤ v₁)']
        ]);
      }
    }
    function upd(){
      if(sv1){ v1=parseInt(sv1.value,10)||60; _set('qudMotV1V', v1); }
      if(sv2){ v2=parseInt(sv2.value,10)||90; _set('qudMotV2V', v2); }
      redrawAll();
    }
    register(canvas,draw);
    if(sv1) sv1.addEventListener('input',upd);
    if(sv2) sv2.addEventListener('input',upd);
  })();

  /* ===================== QUDRAT · MENTAL SHORTCUT & GAUSSIAN SUM LAB ===================== */
  (function(){
    var canvas=document.getElementById('qudShortcutCanvas'); if(!canvas) return;
    var n=8, mode=1;
    var sn=document.getElementById('qudShortN'), sm=document.getElementById('qudShortMode');
    var dataBtn=document.getElementById('qudShortDataBtn'), dataPanel=document.getElementById('qudShortDataPanel'),
        dataDesc=document.getElementById('qudShortDataDesc'), dataRows=document.getElementById('qudShortDataRows');
    wireDataToggle(dataBtn,dataPanel);

    function draw(ctx,w,h){
      ctx.clearRect(0,0,w,h);
      var pad=24, bot=h-30, top=28;
      if(mode===1){
        /* Gaussian Staircase 1 + 2 + ... + n = n(n+1)/2 */
        var sum = n*(n+1)/2;
        var bw = Math.min(28, (w-2*pad)/(n+1));
        var bh = (bot-top)/(n+1);
        var xStart = (w - bw*n)/2;
        for(var i=1;i<=n;i++){
          /* Primary staircase (1..n) */
          ctx.fillStyle = INDIGO;
          ctx.fillRect(xStart+(i-1)*bw, bot-i*bh, bw-2, i*bh);
          /* Complementary inverted staircase (n+1-i) forming rectangle n × (n+1) */
          ctx.fillStyle = 'rgba(200,144,42,0.28)';
          ctx.fillRect(xStart+(i-1)*bw, bot-(n+1)*bh, bw-2, (n+1-i)*bh - 2);
          ctx.fillStyle = INK; ctx.font='600 10px ui-sans-serif, system-ui, sans-serif'; ctx.textAlign='center';
          ctx.fillText(String(i), xStart+(i-0.5)*bw, bot+14);
        }
        ctx.fillStyle = INK; ctx.font='700 12.5px ui-sans-serif, system-ui, sans-serif'; ctx.textAlign='center';
        ctx.fillText('مجموع جاوس: 1 + 2 + … + '+n+' = '+n+'×'+(n+1)+'/2 = '+sum, w/2, 18);
        _set('qudShortFormula', 'n(n+1)/2 = '+n+'×'+(n+1)+'/2');
        _set('qudShortVal', String(sum));
        _set('qudShortTrap', 'مستطيل أبعاده '+n+' × '+(n+1)+' مقسوم على 2');
      } else if(mode===2){
        /* Telescoping Fractions: 1/(1×2) + 1/(2×3) + ... + 1/(n(n+1)) = n/(n+1) */
        var frac = n/(n+1);
        var barW = w - 2*pad - 20, barX = pad + 10, barY = h/2 - 22, barH = 38;
        ctx.strokeStyle = INK; ctx.lineWidth = 1.5;
        ctx.strokeRect(barX, barY, barW, barH);
        var curX = barX;
        for(var k=1;k<=n;k++){
          var seg = (1/(k*(k+1))) * barW;
          ctx.fillStyle = (k%2===1) ? INDIGO : AMBER2;
          ctx.fillRect(curX, barY, seg, barH);
          curX += seg;
        }
        ctx.fillStyle = INK; ctx.font='700 12.5px ui-sans-serif, system-ui, sans-serif'; ctx.textAlign='center';
        ctx.fillText('الكسور المتتالية: 1/(1×2) + 1/(2×3) + … + 1/('+n+'×'+(n+1)+') = '+n+'/'+(n+1), w/2, 22);
        ctx.font='600 11.5px ui-sans-serif, system-ui, sans-serif';
        ctx.fillText('بالتفكيك (1 − 1/2) + (1/2 − 1/3) + … + (1/'+n+' − 1/'+(n+1)+') = 1 − 1/'+(n+1)+' = '+n+'/'+(n+1)+' ≈ '+(frac*100).toFixed(1)+'%', w/2, barY+barH+26);
        _set('qudShortFormula', '1 − 1/(n+1) = n/(n+1)');
        _set('qudShortVal', n+'/'+(n+1)+' ('+frac.toFixed(3)+')');
        _set('qudShortTrap', 'جميع الحدود الوسطى تُحذف بالتناوب');
      } else {
        /* Difference of Squares Mental Shortcut: (100+n)^2 - (100-n)^2 = 400n */
        var A = 50 + n, B = 50 - n;
        var diff = A*A - B*B;
        var cx = w/2, cy = h/2 + 6;
        ctx.fillStyle = 'rgba(43,91,168,0.16)';
        ctx.strokeStyle = INDIGO; ctx.lineWidth = 2;
        ctx.fillRect(cx-90, cy-46, 180, 92);
        ctx.strokeRect(cx-90, cy-46, 180, 92);
        ctx.fillStyle = INK; ctx.font='700 13px ui-sans-serif, system-ui, sans-serif'; ctx.textAlign='center';
        ctx.fillText(A+'² − '+B+'² = ('+A+' − '+B+')('+A+' + '+B+')', cx, cy-12);
        ctx.fillStyle = AMBER2; ctx.font='700 14px ui-sans-serif, system-ui, sans-serif';
        ctx.fillText('= ('+(A-B)+') × (100) = '+diff, cx, cy+18);
        _set('qudShortFormula', '('+A+'−'+B+')('+A+'+'+B+') = '+(2*n)+' × 100');
        _set('qudShortVal', String(diff));
        _set('qudShortTrap', 'تجنب تربيع الأعداد الكبيرة كل على حدة');
      }
      ctx.textAlign='left';
      if(dataDesc){
        dataDesc.textContent = 'استراتيجية قياس السريعة (النمط '+mode+'، n = '+n+').';
        renderDataRows(dataRows, [
          ['قيمة المتغير n', n],
          ['مجموع الأعداد 1..n', (n*(n+1)/2)],
          ['مجموع الفردية 1+3+…+(2n−1)', n*n],
          ['مجموع الكسور المتتالية 1/(k(k+1))', n+'/'+(n+1)],
          ['فرق المربعين ('+(50+n)+'² − '+(50-n)+'²)', 200*n]
        ]);
      }
    }
    function upd(){
      if(sn){ n=parseInt(sn.value,10)||8; _set('qudShortNV', n); }
      if(sm){ mode=parseInt(sm.value,10)||1; _set('qudShortModeV', mode); }
      redrawAll();
    }
    register(canvas,draw);
    if(sn) sn.addEventListener('input',upd);
    if(sm) sm.addEventListener('input',upd);
  })();

  /* ===================== QUDRAT · CYCLICAL POWERS & UNITS DIGIT LAB ===================== */
  (function(){
    var canvas=document.getElementById('qudPowersCanvas'); if(!canvas) return;
    var base=2, exp=17;
    var sb=document.getElementById('qudPowBase'), se=document.getElementById('qudPowExp');
    var dataBtn=document.getElementById('qudPowDataBtn'), dataPanel=document.getElementById('qudPowDataPanel'),
        dataDesc=document.getElementById('qudPowDataDesc'), dataRows=document.getElementById('qudPowDataRows');
    wireDataToggle(dataBtn,dataPanel);

    var CYCLES = {
      2: [2, 4, 8, 6],
      3: [3, 9, 7, 1],
      4: [4, 6, 4, 6],
      7: [7, 9, 3, 1],
      8: [8, 4, 2, 6],
      9: [9, 1, 9, 1]
    };

    function draw(ctx,w,h){
      ctx.clearRect(0,0,w,h);
      var cyc = CYCLES[base] || [base%10, (base*base)%10, (base*base*base)%10, (base*base*base*base)%10];
      var rem = exp % 4;
      var activeIdx = (rem === 0) ? 3 : (rem - 1);
      var unitDigit = cyc[activeIdx];

      ctx.fillStyle = INK; ctx.font='700 13px ui-sans-serif, system-ui, sans-serif'; ctx.textAlign='center';
      ctx.fillText('دورة خانة الآحاد للقوة '+base+'^'+exp+' (الباقي عند القسمة على 4 هو '+rem+')', w/2, 24);

      var boxW = Math.min(72, (w-60)/4 - 10), boxH = 62, y0 = h/2 - 24;
      var totalW = 4*boxW + 3*14, x0 = (w - totalW)/2;
      for(var i=0;i<4;i++){
        var bx = x0 + i*(boxW+14);
        var isHit = (i === activeIdx);
        ctx.fillStyle = isHit ? 'rgba(200,144,42,0.24)' : 'rgba(43,91,168,0.10)';
        ctx.strokeStyle = isHit ? AMBER2 : INDIGO;
        ctx.lineWidth = isHit ? 2.8 : 1.5;
        ctx.fillRect(bx, y0, boxW, boxH);
        ctx.strokeRect(bx, y0, boxW, boxH);
        ctx.fillStyle = MUTED; ctx.font='600 11px ui-sans-serif, system-ui, sans-serif';
        ctx.fillText('الباقي '+(i===3?'0 (أو 4)':String(i+1)), bx+boxW/2, y0-8);
        ctx.fillStyle = isHit ? AMBER2 : INK; ctx.font='700 20px ui-sans-serif, system-ui, sans-serif';
        ctx.fillText(String(cyc[i]), bx+boxW/2, y0+34);
        ctx.fillStyle = MUTED; ctx.font='500 10.5px ui-sans-serif, system-ui, sans-serif';
        ctx.fillText(base+'^'+(i+1), bx+boxW/2, y0+52);
      }
      ctx.fillStyle = INK; ctx.font='600 12px ui-sans-serif, system-ui, sans-serif';
      ctx.fillText('بما أن '+exp+' ÷ 4 يعطي باقي = '+rem+' ← خانة آحاد '+base+'^'+exp+' هي '+unitDigit, w/2, y0+boxH+28);
      ctx.textAlign='left';

      _set('qudPowRem', rem===0 ? '0 (الموقع الرابع)' : String(rem));
      _set('qudPowUnit', String(unitDigit));
      _set('qudPowCycle', cyc.join(' → '));
      if(dataDesc){
        dataDesc.textContent = 'الأساس '+base+' مرفوعاً للأس '+exp+': باقي قسمة الأس على 4 يساوي '+rem+'، وبالتالي خانة الآحاد هي '+unitDigit+'.';
        renderDataRows(dataRows, [
          ['الأساس (Base)', base],
          ['الأس (Exponent)', exp],
          ['دورة الآحاد الرباعية', cyc.join(' ، ')],
          ['باقي قسمة الأس على 4', rem],
          ['خانة الآحاد النهائية', unitDigit]
        ]);
      }
    }
    function upd(){
      var allowed = [2,3,4,7,8,9];
      if(sb){
        var raw = parseInt(sb.value,10)||2;
        base = allowed.indexOf(raw)!==-1 ? raw : 2;
        _set('qudPowBaseV', base);
      }
      if(se){ exp=parseInt(se.value,10)||17; _set('qudPowExpV', exp); }
      redrawAll();
    }
    register(canvas,draw);
    if(sb) sb.addEventListener('input',upd);
    if(se) se.addEventListener('input',upd);
  })();

  /* ===================== QUDRAT · ALGEBRAIC IDENTITIES AREA MODEL ===================== */
  (function(){
    var canvas=document.getElementById('qudIdentitiesCanvas'); if(!canvas) return;
    var a=6, b=3;
    var sa=document.getElementById('qudIdA'), sb=document.getElementById('qudIdB');
    var dataBtn=document.getElementById('qudIdDataBtn'), dataPanel=document.getElementById('qudIdDataPanel'),
        dataDesc=document.getElementById('qudIdDataDesc'), dataRows=document.getElementById('qudIdDataRows');
    wireDataToggle(dataBtn,dataPanel);

    function draw(ctx,w,h){
      ctx.clearRect(0,0,w,h);
      var tot = a + b;
      var sz = Math.min(w,h) - 66;
      var x0 = (w - sz)/2, y0 = 32;
      var wa = (a/tot)*sz, wb = (b/tot)*sz;

      /* a^2 block */
      ctx.fillStyle = 'rgba(43,91,168,0.22)'; ctx.strokeStyle = INDIGO; ctx.lineWidth = 2;
      ctx.fillRect(x0, y0, wa, wa); ctx.strokeRect(x0, y0, wa, wa);
      /* ab blocks */
      ctx.fillStyle = 'rgba(200,144,42,0.22)'; ctx.strokeStyle = AMBER2;
      ctx.fillRect(x0+wa, y0, wb, wa); ctx.strokeRect(x0+wa, y0, wb, wa);
      ctx.fillRect(x0, y0+wa, wa, wb); ctx.strokeRect(x0, y0+wa, wa, wb);
      /* b^2 block */
      ctx.fillStyle = 'rgba(16,185,129,0.22)'; ctx.strokeStyle = '#10b981';
      ctx.fillRect(x0+wa, y0+wa, wb, wb); ctx.strokeRect(x0+wa, y0+wa, wb, wb);

      ctx.fillStyle = INK; ctx.font='700 12px ui-sans-serif, system-ui, sans-serif'; ctx.textAlign='center';
      ctx.fillText('(a + b)² = a² + 2ab + b² = '+(tot*tot), w/2, 18);
      ctx.fillText('a² = '+(a*a), x0+wa/2, y0+wa/2+4);
      if(wb > 26){
        ctx.fillText('ab='+(a*b), x0+wa+wb/2, y0+wa/2+4);
        ctx.fillText('ab='+(a*b), x0+wa/2, y0+wa+wb/2+4);
        ctx.fillText('b²='+(b*b), x0+wa+wb/2, y0+wa+wb/2+4);
      }
      ctx.font='600 11.5px ui-sans-serif, system-ui, sans-serif';
      ctx.fillText('a² + b² = '+(a*a+b*b)+'  |  2ab = '+(2*a*b)+'  |  (a − b)² = '+((a-b)*(a-b))+'  |  a² − b² = '+(a*a-b*b), w/2, y0+sz+20);
      ctx.textAlign='left';

      _set('qudIdSqSum', String(tot*tot));
      _set('qudIdSumSq', String(a*a + b*b));
      _set('qudIdDiffSq', String(a*a - b*b));
      if(dataDesc){
        dataDesc.textContent = 'المتطابقات الجبرية عند a = '+a+' و b = '+b+': مربع المجموع = '+(tot*tot)+'، مجموع المربعين = '+(a*a+b*b)+'، الفرق بين مربعين = '+(a*a-b*b)+'.';
        renderDataRows(dataRows, [
          ['قيمة a و b', 'a = '+a+' ، b = '+b],
          ['مربع المجموع (a + b)²', tot*tot],
          ['مجموع المربعين a² + b²', a*a + b*b],
          ['الحد الأوسط 2ab', 2*a*b],
          ['مربع الفرق (a − b)²', (a-b)*(a-b)],
          ['الفرق بين مربعين a² − b²', a*a - b*b]
        ]);
      }
    }
    function upd(){
      if(sa){ a=parseInt(sa.value,10)||6; _set('qudIdAV', a); }
      if(sb){ b=parseInt(sb.value,10)||3; _set('qudIdBV', b); }
      redrawAll();
    }
    register(canvas,draw);
    if(sa) sa.addEventListener('input',upd);
    if(sb) sb.addEventListener('input',upd);
  })();

  /* ===================== QUDRAT · 360° PIE SECTOR & DATA LAB ===================== */
  (function(){
    var canvas=document.getElementById('qudPieSectorCanvas'); if(!canvas) return;
    var pct=30, totalN=720;
    var sp=document.getElementById('qudPiePct'), sn=document.getElementById('qudPieTotal');
    var dataBtn=document.getElementById('qudPieDataBtn'), dataPanel=document.getElementById('qudPieDataPanel'),
        dataDesc=document.getElementById('qudPieDataDesc'), dataRows=document.getElementById('qudPieDataRows');
    wireDataToggle(dataBtn,dataPanel);

    function draw(ctx,w,h){
      ctx.clearRect(0,0,w,h);
      var cx=w*0.36, cy=h*0.52, r=Math.min(w*0.28, h*0.38);
      var deg = (pct/100)*360;
      var rad = deg*Math.PI/180;
      var count = Math.round((pct/100)*totalN);

      /* Full circle background */
      ctx.fillStyle = 'rgba(43,91,168,0.12)';
      ctx.strokeStyle = INDIGO; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.arc(cx,cy,r,0,2*Math.PI); ctx.fill(); ctx.stroke();

      /* Highlighted sector */
      ctx.fillStyle = 'rgba(200,144,42,0.38)';
      ctx.strokeStyle = AMBER2; ctx.lineWidth = 2.4;
      ctx.beginPath(); ctx.moveTo(cx,cy); ctx.arc(cx,cy,r,-Math.PI/2,-Math.PI/2+rad); ctx.closePath(); ctx.fill(); ctx.stroke();

      /* Right-side formula & summary cards */
      var rx = w*0.68;
      ctx.fillStyle = INK; ctx.font='700 13px ui-sans-serif, system-ui, sans-serif'; ctx.textAlign='center';
      ctx.fillText('تحويل القطاع الدائري (360° ↔ 100%)', w/2, 20);
      ctx.fillText('النسبة: '+pct+'%', rx, cy-34);
      ctx.fillStyle = AMBER2; ctx.font='700 14px ui-sans-serif, system-ui, sans-serif';
      ctx.fillText('الزاوية المركزية = '+deg.toFixed(1)+'°', rx, cy-6);
      ctx.fillStyle = INDIGO;
      ctx.fillText('العدد = '+count+' من '+totalN, rx, cy+22);
      ctx.fillStyle = MUTED; ctx.font='600 11px ui-sans-serif, system-ui, sans-serif';
      ctx.fillText('الباقي = '+(totalN-count)+' ('+(100-pct)+'%)', rx, cy+46);
      ctx.textAlign='left';

      _set('qudPieAngle', deg.toFixed(1)+'°');
      _set('qudPieCount', String(count));
      _set('qudPieRem', String(totalN - count));
      if(dataDesc){
        dataDesc.textContent = 'القطاع الدائري بنسبة '+pct+'% من إجمالي '+totalN+': الزاوية المركزية = '+deg.toFixed(1)+'°، وعدد العناصر = '+count+'.';
        renderDataRows(dataRows, [
          ['النسبة المئوية للقطاع', pct+'%'],
          ['الزاوية المركزية (p% × 360°)', deg.toFixed(1)+'°'],
          ['العدد الكلي (N)', totalN],
          ['قيمة القطاع (العدد)', count],
          ['قيمة الباقي (100% − p%)', (totalN - count)+' ('+(100-pct)+'%)']
        ]);
      }
    }
    function upd(){
      if(sp){ pct=parseInt(sp.value,10)||30; _set('qudPiePctV', pct); }
      if(sn){ totalN=parseInt(sn.value,10)||720; _set('qudPieTotalV', totalN); }
      redrawAll();
    }
    register(canvas,draw);
    if(sp) sp.addEventListener('input',upd);
    if(sn) sn.addEventListener('input',upd);
  })();
})(window.CSExplorerKit);
