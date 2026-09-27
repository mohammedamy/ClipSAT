(function(){
  "use strict";
  var INK='#0E1726', INDIGO='#1E3A6E', INDIGO2='#2B5BA8', AMBER='#B8801F', AMBER2='#C8902A',
      LINE='#D6DCE6', GRID='#E9EDF3', MUTED='#566173', PAPER='#FFFFFF', WHITE='#FFFFFF', AXIS='#AEB8C7';
  var FONT='13px ui-sans-serif, system-ui, -apple-system, sans-serif';
  /* Theme-aware palette: these plot colors were hardcoded light-mode literals,
     so every canvas graph (hero, and every "Explorer" widget across every
     track — the polar rose, Riemann sums, etc., all share this one Plot()
     engine) kept its bright grid/axis lines and dark-on-light dot outlines
     even in dark mode, clashing against the dark canvas background. Pull the
     live values from the same CSS custom properties the rest of the page's
     dark theme already uses, so the plots repaint in sync with the theme —
     no separate dark palette to keep in sync by hand. */
  function refreshPlotColors(){
    var cs = getComputedStyle(document.body);
    function v(name, fallback){ var x = cs.getPropertyValue(name); return x && x.trim() ? x.trim() : fallback; }
    INK    = v('--ink', '#0E1726');
    INDIGO = v('--indigo', '#1E3A6E');
    INDIGO2= v('--indigo-2', '#2B5BA8');
    AMBER  = v('--amber-text', v('--amber', '#B8801F'));
    AMBER2 = v('--amber-2', '#C8902A');
    LINE   = v('--line', '#D6DCE6');
    GRID   = v('--grid', '#E9EDF3');
    MUTED  = v('--muted', '#566173');
    PAPER  = v('--paper', '#FFFFFF');
    WHITE  = PAPER; // dot/marker outline is meant to match the canvas background, not literal white
    AXIS   = v('--faint', '#AEB8C7');
  }
  refreshPlotColors();
  window.CSPlotRefresh = function(){ refreshPlotColors(); if(typeof redrawAll==='function') redrawAll(); };
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- numeric helpers ---------- */
  function dfdx(f,x){ var h=1e-4; return (f(x+h)-f(x-h))/(2*h); }
  function integrate(f,a,b,N){ N=N||2000; var dx=(b-a)/N, s=0; for(var i=0;i<N;i++){ s+=f(a+(i+0.5)*dx); } return s*dx; }
  function fmt(v,d){ d=(d==null)?2:d; if(!isFinite(v)) return '—'; return v.toFixed(d); }
  function niceStep(range,target){
    var raw=range/target, mag=Math.pow(10,Math.floor(Math.log10(raw))), n=raw/mag;
    var s = n<1.5?1 : n<3?2 : n<7?5 : 10; return s*mag;
  }

  /* ---------- Plot helper (works in CSS pixels) ---------- */
  function Plot(ctx,w,h,view,pad){
    this.ctx=ctx; this.w=w; this.h=h; this.v=view;
    this.pad=pad||{l:38,r:14,t:14,b:30};
  }
  Plot.prototype.X=function(x){ var p=this.pad; return p.l+(x-this.v.xmin)/(this.v.xmax-this.v.xmin)*(this.w-p.l-p.r); };
  Plot.prototype.Y=function(y){ var p=this.pad; return this.h-p.b-(y-this.v.ymin)/(this.v.ymax-this.v.ymin)*(this.h-p.t-p.b); };
  Plot.prototype.clear=function(){ this.ctx.clearRect(0,0,this.w,this.h); };
  Plot.prototype.grid=function(){
    var c=this.ctx,v=this.v,p=this.pad;
    var sx=niceStep(v.xmax-v.xmin,7), sy=niceStep(v.ymax-v.ymin,5);
    c.lineWidth=1; c.font=FONT; c.strokeStyle=GRID; c.fillStyle=MUTED; c.textBaseline='middle';
    var x0=Math.ceil(v.xmin/sx)*sx;
    for(var x=x0;x<=v.xmax+1e-9;x+=sx){ var px=this.X(x);
      c.beginPath(); c.moveTo(px,p.t); c.lineTo(px,this.h-p.b); c.stroke();
      if(Math.abs(x)>1e-9){ c.textAlign='center'; c.textBaseline='top'; c.fillText(this._lbl(x), px, this.h-p.b+5); }
    }
    var y0=Math.ceil(v.ymin/sy)*sy;
    for(var y=y0;y<=v.ymax+1e-9;y+=sy){ var py=this.Y(y);
      c.beginPath(); c.moveTo(p.l,py); c.lineTo(this.w-p.r,py); c.stroke();
      if(Math.abs(y)>1e-9){ c.textAlign='right'; c.textBaseline='middle'; c.fillText(this._lbl(y), p.l-6, py); }
    }
    // axes
    c.strokeStyle=AXIS; c.lineWidth=1.4;
    if(v.ymin<0&&v.ymax>0){ var ay=this.Y(0); c.beginPath(); c.moveTo(p.l,ay); c.lineTo(this.w-p.r,ay); c.stroke(); }
    if(v.xmin<0&&v.xmax>0){ var ax=this.X(0); c.beginPath(); c.moveTo(ax,p.t); c.lineTo(ax,this.h-p.b); c.stroke(); }
  };
  Plot.prototype._lbl=function(n){ var r=Math.round(n*100)/100; return (Math.abs(r)<1e-9?0:r).toString(); };
  Plot.prototype.curve=function(f,color,width,dash){
    var c=this.ctx,p=this.pad; c.save(); c.beginPath();
    c.rect(p.l,p.t,this.w-p.l-p.r,this.h-p.t-p.b); c.clip();
    c.beginPath(); var started=false, N=320;
    for(var i=0;i<=N;i++){ var x=this.v.xmin+(this.v.xmax-this.v.xmin)*i/N, y=f(x);
      if(!isFinite(y)){ started=false; continue; }
      var px=this.X(x), py=this.Y(y);
      if(!started){ c.moveTo(px,py); started=true; } else c.lineTo(px,py);
    }
    c.lineWidth=width||2.4; c.strokeStyle=color; c.lineJoin='round';
    if(dash) c.setLineDash(dash); c.stroke(); c.restore();
  };
  Plot.prototype.areaUnder=function(f,a,b,fill){
    var c=this.ctx,p=this.pad; c.save();
    c.beginPath(); c.rect(p.l,p.t,this.w-p.l-p.r,this.h-p.t-p.b); c.clip();
    c.beginPath(); var y0=this.Y(0), N=200; c.moveTo(this.X(a),y0);
    for(var i=0;i<=N;i++){ var x=a+(b-a)*i/N; c.lineTo(this.X(x),this.Y(Math.max(0,f(x)>=0?f(x):f(x)))); }
    c.lineTo(this.X(b),y0); c.closePath(); c.fillStyle=fill; c.fill(); c.restore();
  };
  Plot.prototype.segment=function(x1,y1,x2,y2,color,width,dash){
    var c=this.ctx; c.save(); c.beginPath(); c.moveTo(this.X(x1),this.Y(y1)); c.lineTo(this.X(x2),this.Y(y2));
    c.lineWidth=width||2; c.strokeStyle=color; if(dash) c.setLineDash(dash); c.stroke(); c.restore();
  };
  Plot.prototype.dot=function(x,y,color,r){
    var c=this.ctx; c.beginPath(); c.arc(this.X(x),this.Y(y),r||5,0,2*Math.PI);
    c.fillStyle=color; c.fill(); c.lineWidth=2; c.strokeStyle=WHITE; c.stroke();
  };
  Plot.prototype.ring=function(x,y,color,r){
    var c=this.ctx; c.beginPath(); c.arc(this.X(x),this.Y(y),r||5,0,2*Math.PI);
    c.fillStyle=WHITE; c.fill(); c.lineWidth=2; c.strokeStyle=color; c.stroke();
  };
  Plot.prototype.vline=function(x,color,dash){
    var c=this.ctx,p=this.pad; c.save(); c.beginPath(); c.moveTo(this.X(x),p.t); c.lineTo(this.X(x),this.h-p.b);
    c.lineWidth=1.4; c.strokeStyle=color; if(dash) c.setLineDash(dash); c.stroke(); c.restore();
  };

  /* ---------- canvas registry & sizing ---------- */
  var widgets=[];
  function sizeOf(canvas){
    var dpr=window.devicePixelRatio||1, rect=canvas.getBoundingClientRect();
    if(rect.width<2||rect.height<2) return null;
    canvas.width=Math.round(rect.width*dpr); canvas.height=Math.round(rect.height*dpr);
    var ctx=canvas.getContext('2d'); ctx.setTransform(dpr,0,0,dpr,0,0);
    return {ctx:ctx, w:rect.width, h:rect.height};
  }
  function drawWidget(wd){
    if(wd.canvas.offsetParent===null) return false; // hidden
    var s=sizeOf(wd.canvas); if(!s) return false;
    wd.draw(s.ctx, s.w, s.h);
    wd.seen=true;
    return true;
  }
  /* Explorers scattered down a long lesson page shouldn't all pay their draw
     cost on load — only the ones actually on/near screen. Widgets that are
     already in the initial viewport draw immediately (no flash of blank
     canvas, e.g. the hero); everything else waits for IntersectionObserver
     to report it scrolling into view before its first draw. Once a widget
     has drawn once ("seen"), redrawAll() keeps redrawing it on every future
     call exactly as before — this only defers the *first* paint. */
  var _io = ('IntersectionObserver' in window) ? new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if(!entry.isIntersecting) return;
      var wd=entry.target._cswd;
      if(wd && !wd.seen && drawWidget(wd)) _io.unobserve(entry.target); // one-shot once drawn — redrawAll() covers it from here on
    });
  }, {rootMargin:'200px 0px'}) : null;
  function register(canvas, drawFn){
    var wd={canvas:canvas, draw:drawFn, seen:false};
    canvas._cswd=wd;
    widgets.push(wd);
    if(!_io){ drawWidget(wd); return; }
    var rect=canvas.getBoundingClientRect();
    if(rect.top<window.innerHeight && rect.bottom>0 && canvas.offsetParent!==null){
      drawWidget(wd); // already on screen at registration time — draw now, no need to wait for the observer
    } else {
      _io.observe(canvas);
    }
  }
  function redrawAll(){
    widgets.forEach(function(wd){
      if(!wd.seen) return; // not yet on screen — the observer will draw it when it is
      drawWidget(wd);
    });
  }
  var rt; window.addEventListener('resize',function(){ clearTimeout(rt); rt=setTimeout(redrawAll,120); });

  /* ===================== SHARED "VIEW AS DATA" HELPER (Pillar 4 scale) =====================
     Every chapter explorer's non-visual equivalent follows the same shape: a toggle button
     that shows/hides a panel containing a plain-language description + a sampled data table.
     These two helpers factor out that boilerplate (open/close + aria-expanded, row rendering)
     so each explorer only has to supply its own description text and row values. */
  /* Opening a "View as data" panel draws its explorer first if it has not been drawn yet
     (explorers draw on first scroll into view), so the non-visual equivalent is never
     blank — e.g. a screen-reader user who jumps straight to the button (ADR 0038). */
  function drawExplorerOf(btn){
    var ex=btn.closest&&btn.closest('.explorer');
    if(!ex) return;
    Array.prototype.forEach.call(ex.querySelectorAll('canvas'),function(cv){ // some explorers have two canvases
      var wd=cv._cswd;
      if(wd&&!wd.seen&&drawWidget(wd)&&_io) _io.unobserve(cv);
    });
  }
  function wireDataToggle(btn,panel){
    if(!btn||!panel) return;
    btn.addEventListener('click',function(){
      var opening=panel.hasAttribute('hidden');
      if(opening){ drawExplorerOf(btn); panel.removeAttribute('hidden'); } else panel.setAttribute('hidden','');
      btn.setAttribute('aria-expanded', opening?'true':'false');
    });
  }
  function renderDataRows(rowsEl,rows){
    if(!rowsEl) return;
    var html='',i,j;
    for(i=0;i<rows.length;i++){
      html+='<tr>';
      for(j=0;j<rows[i].length;j++) html+='<td>'+rows[i][j]+'</td>';
      html+='</tr>';
    }
    rowsEl.innerHTML=html;
  }

  /* ── Header "More" overflow menu — toggle + outside-click/Escape-to-close
     for #navMorePanel. Guarded so pages missing it (shouldn't happen, both
     header copies carry it, but cheap insurance) no-op cleanly. */
  (function(){
    var btn=document.getElementById('navMoreBtn'), panel=document.getElementById('navMorePanel');
    if(!btn||!panel) return;
    function closePanel(){ panel.hidden=true; btn.setAttribute('aria-expanded','false'); }
    function openPanel(){
      panel.hidden=false; btn.setAttribute('aria-expanded','true');
      // Kick off Teacher Mode's deferred script load (Plan 5, Phase 5.015)
      // as soon as this panel opens, not on #teacherModeBtn's own click —
      // it's revealed by that panel, so this gives the network fetch a
      // head start before the user could possibly reach that button.
      if (window._ensureTeacherMode) window._ensureTeacherMode();
    }
    btn.addEventListener('click',function(e){
      e.stopPropagation();
      if(panel.hidden) openPanel(); else closePanel();
    });
    document.addEventListener('click',function(e){
      if(!panel.hidden && !panel.contains(e.target) && e.target!==btn) closePanel();
    });
    document.addEventListener('keydown',function(e){ if(e.key==='Escape' && !panel.hidden) closePanel(); });
  })();

  /* ===================== COPY EQUATION AS LATEX ===================== */
  document.addEventListener('click',function(e){
    var btn=e.target.closest && e.target.closest('.copy-eq-btn');
    if(!btn) return;
    var latex=btn.getAttribute('data-latex')||'';
    var restore=btn.textContent, done='✓ Copied';
    function flash(){ btn.textContent=done; btn.classList.add('copied'); setTimeout(function(){ btn.textContent=restore; btn.classList.remove('copied'); },1400); }
    if(navigator.clipboard&&navigator.clipboard.writeText){
      navigator.clipboard.writeText(latex).then(flash).catch(flash);
    } else { flash(); }
  });

  /* ===================== A2 · EXPONENTIAL e^{kx} ===================== */
  (function(){
    var canvas=document.getElementById('a2ExpCanvas'); if(!canvas) return;
    var k=0.5, s=document.getElementById('a2ExpK');
    var view={xmin:-3,xmax:3,ymin:-1,ymax:10};
    var dataBtn=document.getElementById('a2ExpDataBtn'), dataPanel=document.getElementById('a2ExpDataPanel'),
        dataDesc=document.getElementById('a2ExpDataDesc'), dataRows=document.getElementById('a2ExpDataRows');
    wireDataToggle(dataBtn,dataPanel);
    function updateDataView(f){
      if(!dataDesc) return;
      var type=(k>0.001?'growth':(k<-0.001?'decay':'constant'));
      dataDesc.textContent='y = e^('+fmt(k,1)+'x) ('+type+'). At x = 1, y = '+Math.exp(k).toFixed(3)+'.';
      var N=9, rows=[];
      for(var i=0;i<N;i++){ var x=view.xmin+(view.xmax-view.xmin)*i/(N-1); rows.push([fmt(x),fmt(f(x))]); }
      renderDataRows(dataRows,rows);
    }
    function draw(ctx,w,ht){ var P=new Plot(ctx,w,ht,view,{l:26,r:12,t:12,b:20}); P.clear(); P.grid();
      var f=function(x){return Math.exp(k*x);};
      P.curve(f, INDIGO, 2.6); P.dot(0,1,AMBER2,5);
      document.getElementById('a2ExpType').textContent=(k>0.001?'growth':(k<-0.001?'decay':'constant'));
      document.getElementById('a2ExpVal').textContent=Math.exp(k).toFixed(3);
      updateDataView(f);
    }
    register(canvas,draw);
    s.addEventListener('input',function(){ k=parseFloat(s.value); document.getElementById('a2ExpKV').textContent=k.toFixed(1); redrawAll(); });
  })();

  /* ===================== TEST GENERATOR =====================
     genTest and tgReveal live in 05-test-generator-and-ai-settings.js (the question-bank
     path there, the AI path in 05a); this section keeps the print helper. */
  window.tgPrint=function(btn){
    /* Find the section wrapping this button */
    var sec=btn.closest('section.chapter')||btn.closest('section')||btn.closest('.testgen');
    var box=sec||btn.closest('.testgen');
    /* Find the .tg-out that actually has generated content */
    var out=null;
    if(box){
      var outs=box.querySelectorAll('.tg-out');
      for(var _i=outs.length-1;_i>=0;_i--){
        if(outs[_i].querySelector('.problem,.fep-item,.fep-q,.full-exam-paper')){out=outs[_i];break;}
      }
    }
    if(!out||!out.innerHTML.trim()){alert('Generate a test or exam first, then print.');return;}

    var _logoUrl=(document.getElementById('site-logo-img')||{src:''}).src;
    var brandLogoTag=_logoUrl?'<img class="pb-logo-img" src="'+_logoUrl+'" alt="ClipSAT">':'';
    var today=new Date().toLocaleDateString('en-GB',{day:'numeric',month:'long',year:'numeric'});
    var examHTML=out.innerHTML;
    var _titleEl=out.querySelector('.fep-title,.fep-exam-logo');
    var examTitle=_titleEl?_titleEl.textContent.trim():'ClipSAT Practice Exam';

    /* ── Complete print CSS ── */
    var CSS=[
      '@page{margin:20mm 18mm 22mm 18mm}',
      '@page:first{margin-top:18mm}',
      '*,*::before,*::after{box-sizing:border-box}',
      'body{margin:0;padding:0;background:#fff;font-family:Georgia,"Times New Roman",serif;color:#111;font-size:10.5pt;line-height:1.55}',
      /* Running brand header — position:fixed repeats on every printed page */
      '#print-brand{position:fixed;top:0;left:0;right:0;display:flex;align-items:center;gap:7pt;justify-content:space-between;background:#fff;border-bottom:1.5pt solid #1a1a2e;padding:3pt 18pt;font-family:sans-serif;font-size:8pt;color:#1a1a2e;-webkit-print-color-adjust:exact;print-color-adjust:exact}',
      '#print-brand .pb-left{display:flex;align-items:center;gap:7pt}',
      '.pb-logo-img{height:16pt;width:auto;object-fit:contain}',
      '.content-wrap{padding-top:22pt}',
      /* Full exam paper */
      '.full-exam-paper{font-family:Georgia,serif;color:#111;max-width:100%;font-size:10.5pt;line-height:1.55}',
      '.fep-cover-page{page-break-after:always;margin-bottom:24pt}',
      '.fep-logo-wrap{text-align:center;padding:8pt 0 3pt}',
      '.fep-logo-img{max-width:60pt;max-height:40pt}',
      '.fep-official-bar{background:#1a1a2e!important;color:#fff!important;padding:4pt 18pt;font-family:sans-serif;font-size:7pt;letter-spacing:.12em;text-transform:uppercase;margin-bottom:12pt;-webkit-print-color-adjust:exact;print-color-adjust:exact}',
      '.fep-header{border:2pt solid #000;margin-bottom:24pt;background:#fafafa;overflow:hidden;page-break-inside:avoid}',
      '.fep-top-bar{background:#1a1a2e!important;color:#fff!important;display:flex;justify-content:space-between;align-items:center;padding:8pt 18pt;margin-bottom:14pt;-webkit-print-color-adjust:exact;print-color-adjust:exact}',
      '.fep-exam-logo{font-family:Georgia,serif;font-size:10pt;font-weight:900;letter-spacing:.08em;color:#fff!important;text-transform:uppercase}',
      '.fep-logo-tag{font-family:sans-serif;font-size:7pt;letter-spacing:.15em;text-transform:uppercase;opacity:.85}',
      '.fep-badge{font-family:sans-serif;font-size:7pt;letter-spacing:.1em;text-transform:uppercase;background:#B8801F!important;color:#fff!important;padding:2pt 10pt;border-radius:2pt;-webkit-print-color-adjust:exact;print-color-adjust:exact}',
      '.fep-title{font-size:17pt;font-weight:700;color:#1a1a2e;margin:0 18pt 4pt;text-align:center}',
      '.fep-meta-grid{display:grid;grid-template-columns:1fr 1fr;gap:8pt 20pt;padding:10pt 18pt 0}',
      '.fep-meta-cell{display:flex;align-items:center;gap:8pt;font-size:8pt}',
      '.fep-mlabel{font-weight:700;white-space:nowrap;font-family:sans-serif;font-size:7pt;text-transform:uppercase;letter-spacing:.05em;color:#555;min-width:72pt}',
      '.fep-mline{flex:1;border-bottom:1pt solid #888}',
      '.fep-mval{flex:1;font-family:sans-serif;color:#333}',
      '.fep-score-cell{border:1.5pt solid #1a1a2e;padding:3pt 8pt}',
      '.fep-score-box-big{font-family:sans-serif;font-size:11pt;font-weight:700;color:#1a1a2e;margin-left:auto}',
      '.fep-instr-box{margin:12pt 18pt 0;background:#eef2fb!important;border-left:4pt solid #3b4fc8;padding:8pt 12pt;font-size:8pt;-webkit-print-color-adjust:exact;print-color-adjust:exact}',
      '.fep-instr-box strong{display:block;margin-bottom:4pt;font-family:sans-serif;text-transform:uppercase;font-size:7pt;letter-spacing:.06em;color:#3b4fc8!important}',
      '.fep-instr-list{margin:0;padding-left:16pt;line-height:1.65;color:#333}',
      '.fep-total-bar{display:flex;gap:20pt;padding:8pt 18pt;background:#f4f6fb;border:1.5pt solid #c5cde8;margin:10pt 0 0;font-family:sans-serif;font-size:8pt}',
      '.fep-total-item{display:flex;flex-direction:column;align-items:center;gap:2pt}',
      '.fep-total-val{font-size:11pt;font-weight:800;color:#1a1a2e}',
      '.fep-total-lbl{font-size:7pt;color:#888;text-transform:uppercase;letter-spacing:.06em}',
      '.fep-anssheet{border:1.5pt solid #ccc;padding:12pt 18pt;margin-bottom:24pt;background:#fff;page-break-after:always}',
      '.fep-anssheet-title{font-family:sans-serif;font-size:7pt;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:#555;margin-bottom:8pt;padding-bottom:5pt;border-bottom:1pt solid #ddd}',
      /* column = number slot + one bubble-plus-gap per choice (see main.css .fep-bubbles);
         a fixed 90pt was narrower than a 5-choice row, so rows overprinted each other */
      '.fep-bubbles{display:grid;grid-template-columns:repeat(auto-fill,minmax(calc(24pt + var(--fep-nopt,5) * 23pt),1fr));gap:7pt 16pt}',
      '.fep-bubble-row{display:flex;align-items:center;gap:5pt;font-size:8pt;font-family:sans-serif;break-inside:avoid}',
      '.fep-bnum{width:19pt;text-align:right;font-weight:700;color:#555;flex-shrink:0}',
      '.fep-bubble{width:18pt;height:18pt;border-radius:50%;border:1.5pt solid #000!important;display:flex;align-items:center;justify-content:center;font-size:7pt;font-weight:700;flex-shrink:0;background:#fff!important;-webkit-print-color-adjust:exact;print-color-adjust:exact}',
      '.fep-section{margin-bottom:28pt;page-break-inside:auto}',
      '.fep-section-head{display:flex;align-items:center;gap:12pt;background:#1a1a2e!important;color:#fff!important;padding:8pt 14pt;margin-bottom:5pt;-webkit-print-color-adjust:exact;print-color-adjust:exact}',
      '.fep-sec-label{font-family:sans-serif;font-size:7pt;text-transform:uppercase;letter-spacing:.08em;opacity:.7}',
      '.fep-sec-title{flex:1;font-family:sans-serif;font-size:9pt;font-weight:700}',
      '.fep-sec-time{font-family:sans-serif;font-size:7pt;background:rgba(255,255,255,.15)!important;padding:2pt 8pt;border-radius:2pt;white-space:nowrap;-webkit-print-color-adjust:exact;print-color-adjust:exact}',
      '.fep-sec-note{font-family:sans-serif;font-size:8pt;color:#555;background:#fff8ee!important;border-left:3pt solid #B8801F;padding:6pt 10pt;margin-bottom:8pt;-webkit-print-color-adjust:exact;print-color-adjust:exact}',
      '.fep-q-count{font-family:sans-serif;font-size:7pt;color:#888;margin-bottom:12pt;padding-bottom:5pt;border-bottom:1pt solid #e5e5e5}',
      '.fep-item{margin-bottom:18pt;padding-bottom:14pt;border-bottom:1pt dashed #ddd;page-break-inside:avoid}',
      '.fep-item:last-child{border-bottom:none}',
      '.fep-item-head{display:flex;align-items:center;gap:7pt;margin-bottom:7pt}',
      '.fep-inum{width:22pt;height:22pt;border-radius:50%;background:#1a1a2e!important;color:#fff!important;display:flex;align-items:center;justify-content:center;font-family:sans-serif;font-weight:700;font-size:8pt;flex-shrink:0;-webkit-print-color-adjust:exact;print-color-adjust:exact}',
      '.fep-domain-tag{font-family:sans-serif;font-size:7pt;color:#888;background:#f4f4f4;padding:1pt 6pt;border-radius:2pt;text-transform:uppercase;letter-spacing:.05em}',
      '.fep-type-tag{font-family:sans-serif;font-size:6pt;padding:1pt 5pt;border-radius:2pt;font-weight:700;text-transform:uppercase;letter-spacing:.06em}',
      /* Figures — constrain SVG size so they look like real test diagrams */
      '.fep-figure{margin:8pt 0 10pt 28pt}',
      '.fep-figure svg{width:auto!important;max-width:250pt!important;height:auto!important;display:block;max-height:180pt}',
      '.fep-qbody{margin-left:28pt;margin-bottom:10pt;font-size:9.5pt;line-height:1.65}',
      '.fep-choices{margin-left:28pt;display:grid;grid-template-columns:1fr 1fr;gap:5pt 16pt}',
      '.fep-choice{display:flex;align-items:baseline;gap:7pt;font-size:9pt;padding:4pt 7pt;border:1pt solid transparent;border-radius:3pt}',
      '.fep-cletter{font-weight:700;font-family:sans-serif;width:14pt;flex-shrink:0;color:#1a1a2e}',
      '.fep-ctext{flex:1}',
      '.fep-work-space{margin:8pt 28pt 0;border:1.5pt solid #ccc;padding:8pt 12pt;background:#fdfdfd}',
      '.fep-ws-label{font-family:sans-serif;font-size:7pt;text-transform:uppercase;letter-spacing:.06em;color:#888;display:block;margin-bottom:6pt}',
      '.fep-ws-line{border-bottom:1pt solid #ddd;height:28pt;margin-bottom:3pt}',
      '.fep-ws-ans{display:flex;align-items:center;gap:8pt;margin-top:8pt;font-family:sans-serif;font-size:8pt;font-weight:700}',
      '.fep-ws-ans-line{flex:1;border-bottom:2pt solid #1a1a2e}',
      '.fep-part-head{display:flex;align-items:center;gap:10pt;background:#2d3a6b!important;color:#fff!important;padding:6pt 14pt;margin:14pt 0 8pt;border-radius:2pt;-webkit-print-color-adjust:exact;print-color-adjust:exact}',
      '.fep-part-label{font-family:sans-serif;font-size:7pt;font-weight:700;text-transform:uppercase;letter-spacing:.1em}',
      '.fep-part-info{font-family:sans-serif;font-size:7pt;opacity:.85;flex:1}',
      '.fep-calc-badge{font-family:sans-serif;font-size:6pt;padding:2pt 7pt;border-radius:2pt;font-weight:700;text-transform:uppercase;letter-spacing:.05em;-webkit-print-color-adjust:exact;print-color-adjust:exact}',
      '.fep-calc-no{background:#e53935!important;color:#fff!important}',
      '.fep-calc-yes{background:#2e7d32!important;color:#fff!important}',
      '.fep-sol-block,.fep-key-section,.fep-key-toggle,.btn,.fep-key-grid{display:none!important}',
      '.fep-frq-full .fep-ws-line{height:38pt}',
      '.fep-frq-full .fep-work-space{min-height:180pt}',
      /* Practice test problems */
      '.problem{border:1pt solid #ccc;border-radius:4pt;padding:8pt;margin-bottom:10pt;page-break-inside:avoid}',
      '.pn{display:inline-flex;align-items:center;justify-content:center;width:22pt;height:22pt;border-radius:50%;background:#1a1a2e!important;color:#fff!important;font-weight:700;font-size:8pt;margin-right:6pt;vertical-align:middle;-webkit-print-color-adjust:exact;print-color-adjust:exact}',
      '.cq-figure{margin:6pt 0 8pt 18pt}',
      '.cq-figure svg{width:auto!important;max-width:250pt!important;height:auto!important;display:block;max-height:180pt}',
      '.solution{display:none}',
      '.sol-toggle{display:none}',
      '.exam-table{border-collapse:collapse;margin:8pt 0;font-size:9pt}',
      '.exam-table th,.exam-table td{border:1pt solid #999;padding:4pt 8pt}',
      '.exam-table th{background:#e8edf8!important;-webkit-print-color-adjust:exact;print-color-adjust:exact}',
      'mjx-container{display:inline!important}',
      'mjx-container[display="true"]{display:block!important;margin:6pt 0!important}'
    ].join('');

    var html='<!DOCTYPE html><html lang="en"><head>'+
      '<meta charset="utf-8">'+
      '<meta name="viewport" content="width=device-width,initial-scale=1">'+
      '<title>'+examTitle+'<\/title>'+
      /* examHTML (below) is out.innerHTML — already KaTeX-rendered markup, not
         raw "\(…\)" source. Without KaTeX's own stylesheet loaded in this blank
         popup document too, the screen-reader-only .katex-mathml annotation
         (normally hidden only by a rule in katex.min.css) has nothing hiding
         it and prints as a second, plain-text copy of every formula right
         next to the properly-styled one. See printCQ() for the same fix. */
      '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.11/katex.min.css" crossorigin="anonymous">'+
      '<script>window.MathJax={tex:{inlineMath:[["\\\\(","\\\\)"]],displayMath:[["\\\\[","\\\\]"]]},startup:{typeset:true}};<\/script>'+
      '<script async src="https://cdn.jsdelivr.net/npm/mathjax@3.2.2/es5/tex-svg.js"><\/script>'+
      '<style>'+CSS+'<\/style>'+
      '<\/head><body>'+
      '<div id="print-brand"><span class="pb-left">'+brandLogoTag+'<span><strong>ClipSAT<\/strong> &middot; Mr. Mohamed Abdallah<\/span><\/span><span>'+today+'<\/span><\/div>'+
      '<div class="content-wrap">'+examHTML+'<\/div>'+
      '<script>window.addEventListener("load",function(){'+
        'function doPrint(){'+
          'if(window.MathJax&&MathJax.typesetPromise){'+
            'MathJax.typesetPromise().then(function(){setTimeout(function(){window.print();},300);});'+
          '}else if(window.MathJax&&MathJax.startup){'+
            'MathJax.startup.promise.then(function(){setTimeout(function(){window.print();},300);});'+
          '}else{setTimeout(function(){window.print();},300);}}'+
        'var _t=0,_iv=setInterval(function(){_t++;'+
          'if((window.MathJax&&MathJax.startup)||_t>25){clearInterval(_iv);doPrint();}'+
        '},200);'+
      '});<\/script>'+
      '<\/body><\/html>';

    /* Blob URL — avoids document.write() which blocks async CDN script execution */
    var _blob=new Blob([html],{type:'text/html;charset=utf-8'});
    var _burl=URL.createObjectURL(_blob);
    var pw=window.open(_burl,'_blank','width=940,height=780');
    if(!pw){alert('Please allow pop-ups for this site, then try again.');URL.revokeObjectURL(_burl);return;}
    setTimeout(function(){URL.revokeObjectURL(_burl);},120000);
  };

  /* ===================== FULL EXAM QUESTION BANK ===================== */
  window.fullExamBank = {};
  window.CS_BANK_LOADED = {};
  window.CS_loadTrackBank = function(trackId){
    if(!trackId||trackId==='home') return Promise.resolve(null); // no question bank for the home page — skip the guaranteed-404 fetch
    if(window.CS_BANK_LOADED[trackId]) return window.CS_BANK_LOADED[trackId];
    var p = fetch('/bank-data/'+trackId+'.json')
      .then(function(r){ return r.ok ? r.json() : null; })
      .then(function(data){ if(data) window.fullExamBank[trackId]=data; return data; })
      .catch(function(){ return null; });
    window.CS_BANK_LOADED[trackId] = p;
    return p;
  };
  window.CS_bankReady = window.CS_loadTrackBank(window.CLIPSAT_TRACK);

  /* ===================== QB — Question Bank Module ===================== */
  window.QB = (function(){
    var _banks = {};
    function register(viewId, questions){
      _banks[viewId] = (_banks[viewId]||[]).concat(questions);
    }
    function get(viewId){ return _banks[viewId]||[]; }
    function getById(id){
      var parts=id.split('-'); var viewId=parts[0];
      var pool=get(viewId);
      for(var i=0;i<pool.length;i++){ if(pool[i].id===id) return pool[i]; }
      return null;
    }
    function filter(viewId, opts){
      return get(viewId).filter(function(q){
        if(opts.difficulty && q.difficulty!==opts.difficulty) return false;
        if(opts.domain && q.domain!==opts.domain) return false;
        if(opts.type && q.type!==opts.type) return false;
        if(opts.tags && opts.tags.length){
          var match=opts.tags.some(function(t){ return (q.tags||[]).indexOf(t)!==-1; });
          if(!match) return false;
        }
        return true;
      });
    }
    return {register:register, get:get, getById:getById, filter:filter};
  }());

  window.QB_migrate = function(){
    Object.keys(window.fullExamBank||{}).forEach(function(viewId){
      var bank=window.fullExamBank[viewId];
      var raw;
      if(bank.pool){ raw=bank.pool; }
      else{
        raw=[].concat(
          (bank.easy||[]).map(function(q){return Object.assign({},q,{difficulty:'easy'});}),
          (bank.medium||[]).map(function(q){return Object.assign({},q,{difficulty:'medium'});}),
          (bank.hard||[]).map(function(q){return Object.assign({},q,{difficulty:'hard'});})
        );
      }
      /* A handful of pool entries are null (pre-existing data gaps in a few
         tracks) — skip them rather than letting one bad entry abort migration
         for the whole track. */
      raw=raw.filter(Boolean);
      var questions=raw.map(function(q,i){
        var diff=q.difficulty||'medium';
        var domSlug=(q.domain||'gen').toLowerCase().replace(/\s+/g,'-').replace(/[^a-z0-9-]/g,'');
        return {
          id:         viewId+'-'+domSlug+'-'+String(i+1).padStart(3,'0'),
          viewId:     viewId,
          type:       q.type||'mcq',
          domain:     q.domain||'Mathematics',
          tags:       q.tags||[],
          difficulty: diff,
          text:       q.text||q.q||'',
          choices:    q.choices,
          answer:     q.answer,
          gridIn:     q.gridIn,
          sol:        q.sol||'',
          fig:        q.fig,
          src:        q.src||''
        };
      });
      window.QB.register(viewId, questions);
    });
  };
  window.CS_bankReady.then(function(){ window.QB_migrate(); });

  /* ===================== SM — Syllabus Map Module ===================== */
  window.SM = (function(){
    var _maps = {};
    function register(map){ _maps[map.viewId]=map; }
    function get(viewId){ return _maps[viewId]||null; }
    function topicForQuestion(q){
      var map=_maps[q.viewId]; if(!map) return null;
      for(var i=0;i<map.topics.length;i++){
        var t=map.topics[i]; var tags=q.tags||[];
        for(var j=0;j<tags.length;j++){ if(t.tags.indexOf(tags[j])!==-1) return t; }
      }
      return null;
    }
    return {register:register, get:get, topicForQuestion:topicForQuestion};
  }());

  /* ── Register all exam track syllabus maps ── */
  (function(){
    var R=window.SM.register.bind(window.SM);

    R({viewId:'sat', name:'Digital SAT Math', topics:[
      {id:'sat-algebra',   label:'Algebra',                    tags:['linear','inequality','system','slope'],        examWeight:35, chapterId:'sat-ch-algebra'},
      {id:'sat-advanced',  label:'Advanced Math',              tags:['quadratic','polynomial','rational','radical'],  examWeight:35, chapterId:'sat-ch-advanced'},
      {id:'sat-problem',   label:'Problem-Solving & Data',     tags:['ratio','percent','statistics','data'],          examWeight:15, chapterId:'sat-ch-data'},
      {id:'sat-geometry',  label:'Geometry & Trigonometry',    tags:['circle','triangle','trig','geometry'],          examWeight:15, chapterId:'sat-ch-geometry'}
    ]});

    R({viewId:'est', name:'EST I Math', topics:[
      {id:'est-number',    label:'Number & Operations',        tags:['number','integer','fraction'],                  examWeight:20, chapterId:'est-ch-number'},
      {id:'est-algebra',   label:'Algebra',                    tags:['linear','quadratic','equation'],                examWeight:30, chapterId:'est-ch-algebra'},
      {id:'est-functions', label:'Functions',                  tags:['function','domain','range','composite'],        examWeight:25, chapterId:'est-ch-functions'},
      {id:'est-geometry',  label:'Geometry & Measurement',     tags:['geometry','area','volume','trig'],              examWeight:25, chapterId:'est-ch-geometry'}
    ]});

    R({viewId:'act', name:'ACT Math', topics:[
      {id:'act-prepre',    label:'Preparing for HS Math',      tags:['number','fraction','integer'],                  examWeight:20, chapterId:'act-ch-prepre'},
      {id:'act-essential', label:'Essential Skills',           tags:['ratio','percent','proportion'],                  examWeight:15, chapterId:'act-ch-essential'},
      {id:'act-algebra',   label:'Algebra',                    tags:['linear','quadratic','polynomial'],              examWeight:15, chapterId:'act-ch-algebra'},
      {id:'act-functions', label:'Functions',                  tags:['function','exponential','logarithm'],           examWeight:15, chapterId:'act-ch-functions'},
      {id:'act-geometry',  label:'Geometry',                   tags:['geometry','circle','triangle'],                 examWeight:20, chapterId:'act-ch-geometry'},
      {id:'act-stats',     label:'Statistics & Probability',   tags:['statistics','probability','data'],              examWeight:15, chapterId:'act-ch-stats'}
    ]});

    R({viewId:'igcse', name:'Cambridge IGCSE 0580', topics:[
      {id:'igcse-number',  label:'Number',                     tags:['number','fraction','percentage','ratio'],       examWeight:30, chapterId:'ig-number'},
      {id:'igcse-algebra', label:'Algebra & Graphs',           tags:['algebra','quadratic','function','graph'],       examWeight:30, chapterId:'ig-algebra'},
      {id:'igcse-geometry',label:'Geometry',                   tags:['geometry','circle','angle','construction'],     examWeight:20, chapterId:'ig-geometry'},
      {id:'igcse-stats',   label:'Statistics & Probability',   tags:['statistics','probability','data'],              examWeight:20, chapterId:'ig-stats'}
    ]});

    R({viewId:'aslevel', name:'Cambridge AS Level 9709', topics:[
      {id:'as-pure1',      label:'Pure Mathematics 1',         tags:['functions','coordinate','sequence','trig','calculus'],  examWeight:40, chapterId:'as-ch-pure1'},
      {id:'as-mech',       label:'Mechanics',                  tags:['forces','kinematics','newton','energy'],               examWeight:30, chapterId:'as-ch-mech'},
      {id:'as-stats',      label:'Statistics',                 tags:['probability','distribution','binomial','normal'],      examWeight:30, chapterId:'as-ch-stats'}
    ]});

    R({viewId:'a2level', name:'Cambridge A2 Level 9709', topics:[
      {id:'a2-pure3',      label:'Pure Mathematics 3',         tags:['complex','differential','integration','vector'],       examWeight:40, chapterId:'a2-ch-pure3'},
      {id:'a2-mech',       label:'Mechanics',                  tags:['circular','momentum','rigid'],                         examWeight:30, chapterId:'a2-ch-mech'},
      {id:'a2-stats',      label:'Statistics',                 tags:['poisson','hypothesis','chi','regression'],             examWeight:30, chapterId:'a2-ch-stats'}
    ]});

    R({viewId:'ibsl', name:'IB SL Mathematics', topics:[
      {id:'ibsl-t1',       label:'Numbers & Algebra',          tags:['sequences','binomial','logarithm'],                    examWeight:16, chapterId:'ibsl-ch-t1'},
      {id:'ibsl-t2',       label:'Functions',                  tags:['function','inverse','exponential'],                    examWeight:16, chapterId:'ibsl-ch-t2'},
      {id:'ibsl-t3',       label:'Geometry & Trigonometry',    tags:['circle','vector','trig'],                              examWeight:16, chapterId:'ibsl-ch-t3'},
      {id:'ibsl-t4',       label:'Statistics & Probability',   tags:['statistics','normal','binomial','regression'],         examWeight:16, chapterId:'ibsl-ch-t4'},
      {id:'ibsl-t5',       label:'Calculus',                   tags:['derivative','integral','kinematics'],                  examWeight:36, chapterId:'ibsl-ch-t5'}
    ]});

    R({viewId:'ibhl', name:'IB HL Mathematics', topics:[
      {id:'ibhl-t1',       label:'Numbers & Algebra',          tags:['complex','induction','matrix'],                        examWeight:15, chapterId:'ibhl-ch-t1'},
      {id:'ibhl-t2',       label:'Functions',                  tags:['rational','odd-even','transformation'],                examWeight:15, chapterId:'ibhl-ch-t2'},
      {id:'ibhl-t3',       label:'Geometry & Trigonometry',    tags:['vector3d','planes','trig-identities'],                 examWeight:15, chapterId:'ibhl-ch-t3'},
      {id:'ibhl-t4',       label:'Statistics & Probability',   tags:['chi-squared','hypothesis','poisson'],                  examWeight:15, chapterId:'ibhl-ch-t4'},
      {id:'ibhl-t5',       label:'Calculus',                   tags:['limits','differential-equations','maclaurin'],         examWeight:40, chapterId:'ibhl-ch-t5'}
    ]});

    R({viewId:'appc', name:'AP Precalculus', topics:[
      {id:'appc-u1',       label:'Polynomial & Rational Functions',  tags:['polynomial','rational','rate-of-change'],        examWeight:30, chapterId:'appc-ch-u1'},
      {id:'appc-u2',       label:'Exponential & Logarithmic',        tags:['exponential','logarithm','half-life'],           examWeight:27, chapterId:'appc-ch-u2'},
      {id:'appc-u3',       label:'Trigonometric & Polar',            tags:['sinusoidal','polar','trig'],                     examWeight:30, chapterId:'appc-ch-u3'},
      {id:'appc-u4',       label:'Functions Involving Parameters',   tags:['parametric','vector','implicit'],                examWeight:13, chapterId:'appc-ch-u4'}
    ]});

    R({viewId:'apstats', name:'AP Statistics', topics:[
      {id:'aps-explore',   label:'Exploring Data',             tags:['distribution','summary','graph'],                      examWeight:22, chapterId:'aps-ch-explore'},
      {id:'aps-collect',   label:'Collecting Data',            tags:['sampling','experiment','bias'],                        examWeight:15, chapterId:'aps-ch-collect'},
      {id:'aps-prob',      label:'Probability & Distributions',tags:['probability','normal','binomial','geometric'],         examWeight:30, chapterId:'aps-ch-prob'},
      {id:'aps-inference', label:'Statistical Inference',      tags:['confidence','hypothesis','chi','regression'],          examWeight:33, chapterId:'aps-ch-inference'}
    ]});

    R({viewId:'qudrat', name:'Qudrat (GAT)', topics:[
      {id:'qud-arith',     label:'Arithmetic',                 tags:['number','fraction','percent','ratio'],                 examWeight:25, chapterId:'qud-ch-arith'},
      {id:'qud-algebra',   label:'Algebra',                    tags:['equation','inequality','polynomial'],                  examWeight:35, chapterId:'qud-ch-algebra'},
      {id:'qud-geometry',  label:'Geometry',                   tags:['geometry','angle','area','triangle'],                  examWeight:25, chapterId:'qud-ch-geometry'},
      {id:'qud-stats',     label:'Statistics & Probability',   tags:['statistics','probability','data'],                     examWeight:15, chapterId:'qud-ch-stats'}
    ]});

    R({viewId:'tahsili', name:'Tahsili (SAAT)', topics:[
      {id:'tah-algebra',   label:'Algebra',                    tags:['equation','quadratic','system'],                       examWeight:35, chapterId:'tah-ch-algebra'},
      {id:'tah-geometry',  label:'Geometry',                   tags:['geometry','circle','area','volume'],                   examWeight:30, chapterId:'tah-ch-geometry'},
      {id:'tah-trig',      label:'Trigonometry',               tags:['trig','angle','sine','cosine'],                        examWeight:20, chapterId:'tah-ch-trig'},
      {id:'tah-stats',     label:'Statistics',                 tags:['statistics','probability','mean'],                     examWeight:15, chapterId:'tah-ch-stats'}
    ]});

    R({viewId:'precalc', name:'Precalculus', topics:[
      {id:'pc-functions',  label:'Functions',                  tags:['function','composition','inverse'],                    examWeight:25, chapterId:'pc-ch-functions'},
      {id:'pc-trig',       label:'Trigonometry',               tags:['trig','unit-circle','identities'],                    examWeight:30, chapterId:'pc-ch-trig'},
      {id:'pc-advanced',   label:'Advanced Topics',            tags:['complex','polar','conics','vectors'],                  examWeight:45, chapterId:'pc-ch-advanced'}
    ]});
  }());
  /* EXAM SPECS: window.examSpecs now lives in 02b-bank-exam.js (see FULL EXAM GENERATOR below). */


  /* ===================== FIGURE RENDERER =====================
     window._renderFig (question-bank figures), window.renderMathFigure (the schema AI tests use)
     and the shared FIG_* palette ship as public/js/figures.js (02c-figures.js). They load the first
     time a chapter quiz or paper needs a figure, or when a chapter quiz is touched (Plan 5 Phase
     5.015, ADR 0045). A question-bank paper loads them with bank-exam.js (_ensureBankExam below). */
  var _figuresPromise=null;
  window._ensureFigures=function(){
    if(window._renderFig&&window.renderMathFigure) return Promise.resolve();
    if(_figuresPromise) return _figuresPromise;
    _figuresPromise=new Promise(function(resolve,reject){
      var s=document.createElement('script');
      s.src='/js/figures.js';
      s.onload=function(){ window._renderFig&&window.renderMathFigure?resolve():reject(new Error('figures.js did not register')); };
      s.onerror=function(){ _figuresPromise=null; reject(new Error('The figures could not load. Check your connection and try again.')); };
      document.head.appendChild(s);
    });
    return _figuresPromise;
  };
  ['pointerdown','focusin'].forEach(function(ev){
    document.addEventListener(ev,function(e){
      if(!window._renderFig&&e.target&&e.target.closest&&e.target.closest('.ch-quiz-wrap')) window._ensureFigures().catch(function(){});
    },true);
  });



  /* ===================== SHARED HELPERS ===================== */
  window._shuffle = function(arr){var a=arr.slice();for(var i=a.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1));var t=a[i];a[i]=a[j];a[j]=t;}return a;};

  /* Return a NEW question object with its choice order randomized and the
     correct-answer index remapped to match — question bank data conventionally
     lists the correct choice first, which without this made most rendered
     quiz/exam questions show "A" as the answer. Never mutates the original
     bank object (so the same bank entry can be reused/re-rendered safely).
     Handles both {choices,answer} and the assignment-generator's
     {options,correct} field-name variants. */
  window._shuffleQ = function(q){
    if(!q) return q;
    var choicesKey = q.choices ? 'choices' : (q.options ? 'options' : null);
    if(!choicesKey || !q[choicesKey] || q[choicesKey].length < 2) return q;
    var answerKey = (typeof q.answer!=='undefined') ? 'answer' : (typeof q.ans!=='undefined' ? 'ans' : (typeof q.correct!=='undefined' ? 'correct' : null));
    var origAns = answerKey ? q[answerKey] : 0;
    if(typeof origAns !== 'number') return q; /* non-index answer format — leave untouched */
    var order = window._shuffle(q[choicesKey].map(function(_,i){return i;}));
    var copy = {};
    for(var k in q) if(Object.prototype.hasOwnProperty.call(q,k)) copy[k]=q[k];
    copy[choicesKey] = order.map(function(i){return q[choicesKey][i];});
    var newAns = order.indexOf(origAns);
    if(answerKey) copy[answerKey] = newAns;
    if(typeof q.answer!=='undefined') copy.answer = newAns;
    if(typeof q.ans!=='undefined') copy.ans = newAns;
    return copy;
  };
  /* ===================== FULL EXAM GENERATOR =====================
     The question-bank full exam and window.examSpecs (the real exam configurations) ship as
     public/js/bank-exam.js (02b-bank-exam.js) and load the first time a paper is generated,
     or when a test generator is touched (Plan 5 Phase 5.015, ADR 0042). genFullExam stays a
     global here so the wrappers other modules add at load (05's AI path, 20a) still wrap it. */
  var _bankExamPromise=null;
  function _loadBankExam(){
    if(window.CSBankExam) return Promise.resolve();
    if(_bankExamPromise) return _bankExamPromise;
    _bankExamPromise=new Promise(function(resolve,reject){
      var s=document.createElement('script');
      s.src='/js/bank-exam.js';
      s.onload=function(){ window.CSBankExam?resolve():reject(new Error('bank-exam.js did not register')); };
      s.onerror=function(){ _bankExamPromise=null; reject(new Error('The exam generator could not load. Check your connection and try again.')); };
      document.head.appendChild(s);
    });
    return _bankExamPromise;
  }
  /* a question-bank paper draws figures, so the figure renderer loads with it */
  window._ensureBankExam=function(){ return Promise.all([_loadBankExam(),window._ensureFigures()]).then(function(){}); };
  ['pointerdown','focusin'].forEach(function(ev){
    document.addEventListener(ev,function(e){
      if(!window.CSBankExam&&e.target&&e.target.closest&&e.target.closest('.testgen')) window._ensureBankExam().catch(function(){});
    },true);
  });
  window.genFullExam=function(btn){
    var self=this, args=arguments;
    return window._ensureBankExam().then(function(){ return window.CSBankExam.genFullExam.apply(self,args); },function(err){
      var box=btn&&btn.closest&&btn.closest('.testgen'), out=box&&box.querySelector('.tg-out');
      if(out){ out.innerHTML=''; var p=document.createElement('p'); p.className='tg-empty'; p.style.color='#dc2626'; p.textContent=err.message; out.appendChild(p); }
    });
  };

  /* ===================== ROUTING / UI ===================== */
  var currentView=null;

  window.showView=function(name){
    var changed=(name!==currentView); currentView=name;
    if(window.CS_loadTrackBank) window.CS_loadTrackBank(name);
    document.querySelectorAll('.view').forEach(function(v){ v.classList.remove('active'); });
    var el=document.getElementById('view-'+name); if(el) el.classList.add('active');
    var sel=document.getElementById('navSelect');
    if(sel && sel.value!==name){
      // find the option; if not found (e.g. home), set 'home'
      var found=false;
      for(var i=0;i<sel.options.length;i++){if(sel.options[i].value===name){sel.selectedIndex=i;found=true;break;}}
      if(!found) sel.value='home';
    }
    var _nl=document.getElementById('navlinks'),_mb=document.getElementById('menuBtn');
    if(_nl){_nl.classList.remove('open');}
    if(_mb){_mb.setAttribute('aria-expanded','false');_mb.innerHTML='&#9776; Menu';}
    /* Skip while an OAuth redirect's hash (#access_token=...&...) is still
       present and unprocessed — Supabase's client needs to read that exact
       hash to establish the session, and this call used to run
       unconditionally, silently destroying it before that could happen.
       Confirmed live: the server-side Google sign-in succeeded every
       single time (a Google identity was created and linked correctly),
       but the browser never picked up the resulting session, because this
       showView() call — triggered by the router's own hash-based init on
       the very same page load the OAuth redirect landed on — overwrote
       location.hash first. cloud-sync.js's SIGNED_IN handler restores the
       real route afterward (see signInWithGoogle/restorePostSignInHash)
       once Supabase has actually consumed this hash. */
    if(history.replaceState && (location.hash||'').indexOf('access_token=')===-1) history.replaceState(null,'','#view/'+name);
    if(changed) window.scrollTo({top:0,behavior:reduceMotion?'auto':'smooth'});
    /* CLS/LCP fix: used to be setTimeout(...,70) for no documented reason —
       every .chapter starts display:none (main.css) until .ch-active is
       added, so on the overwhelmingly common case (no #view/track/chapter
       hash, i.e. no pending goChapter() call) this 70ms delay was pure
       unforced main-content-area invisibility: nothing else was racing to
       set .ch-active first, so there was nothing to wait for. Measured
       live: this was the dominant remaining cause of both a Lighthouse CLS
       of ~1.0 (main#view-{track} jumping from ~0 height to full height,
       late and all at once) AND why LCP wasn't finalizing even after
       resources/JS execution were both already fast (Chrome doesn't
       finalize an LCP candidate while the page is still visibly
       resizing). Now runs synchronously. The one case this delay used to
       matter for — init()'s own goChapter(chapId, viewId) at 120ms, for a
       direct link to a specific chapter — is unaffected in substance: the
       default chapter still shows briefly before goChapter() swaps to the
       requested one moments later, exactly as before, just starting
       sooner instead of at 70ms. */
    if(changed && el){
      var chs=el.querySelectorAll('.chapter');
      var hasActive=el.querySelector('.chapter.ch-active');
      if(!hasActive && chs.length){ chs[0].classList.add('ch-active'); }
      if(!hasActive){
        var rl=el.querySelectorAll('.rail a');
        if(rl.length){ rl.forEach(function(a){a.classList.remove('active');}); rl[0].classList.add('active'); }
      }
    }
    setTimeout(redrawAll,60); setTimeout(redrawAll,420);
    /* LCP fix: typeset only the active .chapter, not the whole view (`el`
       can hold every chapter of a multi-chapter track — 18 on calculus —
       each starting display:none until .ch-active is added, but still a
       real DOM subtree KaTeX would otherwise walk in full). The default-
       active-chapter block right above this now runs synchronously (used
       to be a 70ms setTimeout — see its own comment), so for a fresh page
       load .ch-active is already correct before this 80ms fires. It's
       still needed, unchanged, for goChapter()'s (this file) OWN 60ms
       timeout on a same-view chapter switch — 80 > 60 keeps this firing
       after THAT one sets the newly-clicked chapter active, not before.
       Re-typesetting an already-rendered chapter (revisiting one) is a
       cheap no-op scan — KaTeX auto-render only touches raw "\( \)"/"\[
       \]" delimiter text, which no longer exists once a chapter's math
       has been replaced with rendered <span class="katex"> output — so
       no per-chapter "already rendered" flag is needed. Pages with no
       .chapter at all (home, contact, …) fall back to the old whole-`el`
       behavior via the `|| el`. */
    if(el){ setTimeout(function(){ if(window.MathJax && MathJax.typesetPromise){ var _active=el.querySelector('.chapter.ch-active')||el; MathJax.typesetPromise([_active]).catch(function(){}); } },80); }
  };

  /* ===== arrow helper (pixel coords) for Calc III explorers ===== */
  function arrow(ctx,x1,y1,x2,y2,color,lw){
    ctx.save(); ctx.strokeStyle=color; ctx.fillStyle=color; ctx.lineWidth=lw||2;
    ctx.beginPath(); ctx.moveTo(x1,y1); ctx.lineTo(x2,y2); ctx.stroke();
    var ang=Math.atan2(y2-y1,x2-x1), s=Math.max(5,(lw||2)*2.6);
    ctx.beginPath(); ctx.moveTo(x2,y2);
    ctx.lineTo(x2-s*Math.cos(ang-0.42), y2-s*Math.sin(ang-0.42));
    ctx.lineTo(x2-s*Math.cos(ang+0.42), y2-s*Math.sin(ang+0.42));
    ctx.closePath(); ctx.fill(); ctx.restore();
  }

  /* CH 13 spike — Pillar 2 roadmap item: "prototype one WebGL 3D explorer,
     a single multivariable-calculus surface plot, built on the existing
     figure-renderer conventions, as a technical spike." Extends the 2D
     slice above rather than replacing it: same f(x,y), same c-slider, same
     x0=1 point — just adds the surface those numbers actually live on.
     Three.js loads from CDN ONLY on first click of the "View in 3D" button
     (never on page load), so this costs nothing for students who don't
     open it — the roadmap's explicit page-weight constraint for this work. */
  /* ── Shared 3D-explorer helper (Pillar 2 Scale-phase item: "a shared
     build3DSurface() helper instead of one-off code per explorer" +
     "OrbitControls for smoother rotation/zoom" + "apply the same pattern
     to the vector-field and double-integral explorers" — the three
     follow-ups this spike's own commit message named). Every "View in 3D"
     button below (partial derivatives, double Riemann sum, vector field)
     goes through this. Three.js and its OrbitControls addon are ES modules,
     resolved via the <script type="importmap"> in <head> (see build.js) —
     that import map is a few bytes of inert JSON, so nothing is actually
     fetched until ClipSAT3D.load() runs, which only happens on first click
     of a "View in 3D" button, never on page load, matching the original
     spike's page-weight discipline. OrbitControls ships with damping
     disabled and re-renders only on its own 'change' event (fired
     synchronously by drag/zoom/pan), so there's still no persistent
     requestAnimationFrame loop burning battery on an unchanged frame. */
  window.ClipSAT3D=(function(){
    var COLOR={INDIGO:0x1E3A6E, AMBER:0xC8902A, INK:0x0E1726, AXIS:0x8C97A8};
    var cached=null;
    function load(){
      if(!cached){
        cached=Promise.all([
          import('three'),
          import('https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/controls/OrbitControls.js')
        ]).then(function(mods){ return {THREE:mods[0], OrbitControls:mods[1].OrbitControls}; });
      }
      return cached;
    }
    function setup(wrapEl, mods, opts){
      opts=opts||{};
      var T=mods.THREE;
      var w=wrapEl.clientWidth||360, h=wrapEl.clientHeight||248;
      var scene=new T.Scene();
      var camera=new T.PerspectiveCamera(38, w/h, 0.1, 100);
      var renderer=new T.WebGLRenderer({antialias:true, alpha:true});
      renderer.setSize(w,h);
      renderer.setPixelRatio(Math.min(2, window.devicePixelRatio||1));
      wrapEl.appendChild(renderer.domElement);

      scene.add(new T.AmbientLight(0xffffff,0.85));
      var dl=new T.DirectionalLight(0xffffff,0.55); dl.position.set(3,6,4); scene.add(dl);

      var az=opts.az!=null?opts.az:0.9, el=opts.el!=null?opts.el:0.55, dist=opts.dist!=null?opts.dist:11;
      var target=opts.target||new T.Vector3(0,0,0);
      camera.position.set(
        target.x+dist*Math.cos(el)*Math.sin(az),
        target.y+dist*Math.sin(el),
        target.z+dist*Math.cos(el)*Math.cos(az)
      );
      camera.lookAt(target);

      var controls=new mods.OrbitControls(camera, renderer.domElement);
      controls.target.copy(target);
      controls.enableDamping=false;   // no persistent render loop — see note above
      controls.enablePan=false;       // rotate/zoom only, keeps the model centered
      controls.minDistance=opts.minDistance||dist*0.35;
      controls.maxDistance=opts.maxDistance||dist*2.2;
      controls.update();

      function render(){ renderer.render(scene,camera); }
      controls.addEventListener('change', render);

      if(opts.axisTicks!==false){
        var segs=opts.axisSegs||[[[-3.5,0,0],[3.5,0,0]],[[0,-1,0],[0,4,0]],[[0,0,-3.5],[0,0,3.5]]];
        var axMat=new T.LineBasicMaterial({color:COLOR.AXIS, transparent:true, opacity:0.5});
        segs.forEach(function(seg){
          var g2=new T.BufferGeometry().setFromPoints(seg.map(function(p){return new T.Vector3(p[0],p[1],p[2]);}));
          scene.add(new T.Line(g2,axMat));
        });
      }

      var rt;
      window.addEventListener('resize',function(){
        clearTimeout(rt);
        rt=setTimeout(function(){
          if(wrapEl.hidden) return;
          var nw=wrapEl.clientWidth||w, nh=wrapEl.clientHeight||h;
          camera.aspect=nw/nh; camera.updateProjectionMatrix();
          renderer.setSize(nw,nh);
          render();
        },150);
      });

      return {THREE:T, scene:scene, camera:camera, renderer:renderer, controls:controls, render:render};
    }
    return {COLOR:COLOR, load:load, setup:setup};
  })();










  window.goChapter=function(id, view){
    /* If no view supplied, detect the currently active view rather than
       defaulting to 'calculus' — fixes rail nav in all non-calculus tracks */
    var vn=view;
    if(!vn){
      var _av=document.querySelector('.view.active');
      vn=_av?_av.id.replace(/^view-/,''):'calculus';
    }
    /* Cross-track link: every track now lives on its own static page, so a
       chapter belonging to a DIFFERENT track's view isn't in this page's
       DOM at all — showView(vn) below would silently no-op. Same fix as
       CSSearch.go() uses for exactly this case: a real page navigation to
       that track's page with '?ch=' set, which base.njk's post-engine shim
       already reads on load to open the requested chapter there. */
    if(!document.getElementById('view-'+vn)){
      var dest='/'+(vn==='home'?'':vn+'/');
      window.location.href = id ? dest+'?ch='+encodeURIComponent(id) : dest;
      return;
    }
    showView(vn);
    /* CLS fix: used to be setTimeout(...,60) for the .ch-active assignment —
       same class of bug already fixed in showView's own default-chapter
       logic above (see that comment). Every .chapter starts display:none
       until .ch-active is added, and base.njk's post-engine shim calls
       window.goChapter() unconditionally on EVERY track-page load to open
       the first/requested chapter — so this 60ms delay meant the entire
       chapter content area (everything below the header) rendered empty
       for 60ms before suddenly revealing real, page-length content. Chrome
       intermittently caught this mid-paint (confirmed via a Lighthouse
       trace: the footer's rect jumped from y≈177, right after the header,
       down to its real position thousands of px lower), producing a large
       but flaky CLS hit — roughly 1 run in 6–8 in testing, which is why it
       wasn't obviously reproducible before. Now runs synchronously. */
    var av=document.querySelector('.view.active');
    if(av){
      av.querySelectorAll('.chapter').forEach(function(c){ c.classList.remove('ch-active'); });
      var t=document.getElementById(id);
      if(t){ t.classList.add('ch-active'); window.scrollTo(0,0); }
      av.querySelectorAll('.rail a').forEach(function(a){
        a.classList.toggle('active', a.getAttribute('data-target')===id);
      });
      if(history.replaceState) history.replaceState(null,'','#view/'+vn+'/'+id);
    }
  };
  window.goCatalog=function(){
    showView('home');
    setTimeout(function(){
      var t=document.getElementById('catalog');
      if(t) t.scrollIntoView({behavior:reduceMotion?'auto':'smooth', block:'start'});
    },80);
  };
  window.toggleSol=function(btn){
    var p=btn.closest('.problem'); var open=p.classList.toggle('open');
    btn.childNodes[1].textContent=' '+(open?'Hide solution':'Show solution');
    if(open && window.MathJax && MathJax.typesetPromise){ MathJax.typesetPromise([p.querySelector('.solution')]); }
  };

  // Bubble sheet interactivity — click to fill, click filled to clear
  document.addEventListener('click',function(e){
    var b=e.target.closest('.fep-bubble');
    if(!b) return;
    var row=b.closest('.fep-bubble-row');
    // unfill siblings, toggle self
    row.querySelectorAll('.fep-bubble').forEach(function(x){ x.classList.remove('filled'); });
    if(!b.classList.contains('filled-prev')){b.classList.add('filled');}
    // mark or unmark prev state
    row.querySelectorAll('.fep-bubble').forEach(function(x){ x.classList.remove('filled-prev'); });
    if(b.classList.contains('filled')) b.classList.add('filled-prev');
  });

  // Full-exam MCQ choice highlight
  document.addEventListener('click',function(e){
    var ch=e.target.closest('.fep-choice');
    if(!ch) return;
    var choices=ch.closest('.fep-choices');
    choices.querySelectorAll('.fep-choice').forEach(function(c){c.style.background=''; c.style.borderColor='transparent';});
    ch.style.background='#e8eeff'; ch.style.borderColor='#3b4fc8';
  });

  // scroll-spy: highlight the chapter rail of whichever subject view is active
  var spy=function(){}; // scroll-spy disabled — panel mode handles active state via goChapter

  /* ══════════════════════════════════════════════════════════════════
     PRECALCULUS & AP PRECALCULUS — one explorer for every chapter that
     had none. Each defaults to its chapter's own worked example so the
     explorer and the worked example agree on first load. Same shared
     Plot/register/redrawAll/fmt/wireDataToggle/renderDataRows/arrow
     helpers as every explorer above.
     ══════════════════════════════════════════════════════════════════ */
  function _slider(id,fn){ var el=document.getElementById(id); if(el) el.addEventListener('input',fn); return el; }
  function _set(id,txt){ var el=document.getElementById(id); if(el) el.textContent=txt; }
  function _deg(r){ return r*180/Math.PI; }
  function _num(k){ return k%1===0 ? String(k) : fmt(k,1); }
  /* expand a view so one x-unit and one y-unit cover the same pixels
     (circles stay round, right angles stay square, y = x stays at 45°) */
  function _fitView(xmin,xmax,ymin,ymax,w,h,pad){
    var pw=w-pad.l-pad.r, ph=h-pad.t-pad.b, sx=(xmax-xmin)/pw, sy=(ymax-ymin)/ph, s=Math.max(sx,sy);
    var cx=(xmin+xmax)/2, cy=(ymin+ymax)/2;
    return {xmin:cx-s*pw/2, xmax:cx+s*pw/2, ymin:cy-s*ph/2, ymax:cy+s*ph/2};
  }
  function _clip(P,fn){ var c=P.ctx,p=P.pad; c.save(); c.beginPath(); c.rect(p.l,p.t,P.w-p.l-p.r,P.h-p.t-p.b); c.clip(); fn(); c.restore(); }

  /* ---------- shared helpers for the per-track explorer files ----------
     Each track's canvas explorers live in src/scripts/explorers/{track}.js
     (public/js/ex/{track}.js), loaded only on that track's page (ADR 0039). */
  window.CSExplorerKit={
    register:register, reduceMotion:reduceMotion, drawExplorerOf:drawExplorerOf, fmt:fmt, Plot:Plot, redrawAll:redrawAll, wireDataToggle:wireDataToggle, renderDataRows:renderDataRows, dfdx:dfdx, integrate:integrate, arrow:arrow, _deg:_deg, _fitView:_fitView, _clip:_clip, _set:_set, _slider:_slider, _num:_num,
    colors:function(){ return {INK:INK, INDIGO:INDIGO, INDIGO2:INDIGO2, AMBER:AMBER, AMBER2:AMBER2, LINE:LINE, GRID:GRID, MUTED:MUTED, PAPER:PAPER, WHITE:WHITE, AXIS:AXIS, FONT:FONT}; }
  };

  /* ---------- init ---------- */
  function init(){
    var _rawHash=(location.hash||'').replace(/^#/,'');
    var _VIEWS=['home','calculus','algebra','alg2','apab','apbc','igcse','geo','qudrat','tahsili','sat','act','aslevel','a2level','est','est2','appc','apstats','precalc','linalg','mvc','ibslaa','ibhlaa','ibslai','ibhlai'];
    (function(){
      /* Support both #view/viewId/chapterId and legacy #viewId */
      var parts=_rawHash.split('/');
      // On dedicated track pages CLIPSAT_TRACK is set before engine runs.
      // Default to it instead of 'home' so init() doesn't trigger a redirect.
      var viewId=(window.CLIPSAT_TRACK&&window.CLIPSAT_TRACK!=='home')?window.CLIPSAT_TRACK:'home', chapId='';
      if(parts[0]==='view' && parts[1]){
        viewId=parts[1]; chapId=parts[2]||'';
      } else if(_VIEWS.indexOf(_rawHash)!==-1){
        viewId=_rawHash;
      }
      showView(viewId);
      if(chapId){
        setTimeout(function(){ window.goChapter(chapId, viewId); },120);
      }
    }());
    var y=document.getElementById('yr'); if(y) y.textContent=new Date().getFullYear();
    redrawAll(); spy();
  }
  if(document.readyState!=='loading') init(); else document.addEventListener('DOMContentLoaded',init);
  window.addEventListener('load',function(){ setTimeout(redrawAll,200); });
})();

/* ─────────────────────────────────────────────── */

