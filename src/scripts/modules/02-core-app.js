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

  /* ===================== HERO ===================== */
  var hero=(function(){
    var canvas=document.getElementById('heroCanvas'); if(!canvas) return {};
    var f=function(x){ return 2.15+1.35*Math.sin(0.85*x); };
    var view={xmin:0,xmax:7,ymin:0,ymax:4.2};
    var a=2.2, showArea=true, showTan=true, animating=!reduceMotion, t0=null;
    function draw(ctx,w,h){
      var P=new Plot(ctx,w,h,view,{l:30,r:12,t:14,b:26}); P.clear(); P.grid();
      if(showArea) P.areaUnder(f,0,a,'rgba(200,144,42,0.20)');
      P.curve(f,INDIGO,2.8);
      if(showArea){ P.segment(a,0,a,f(a),AMBER,1.4,[4,4]); }
      if(showTan){
        var m=dfdx(f,a), fa=f(a), L=1.7;
        P.segment(a-L,fa-m*L, a+L, fa+m*L, INDIGO2, 2.4);
      }
      P.dot(a,f(a),INDIGO,5.5);
      document.getElementById('hSlope').textContent=fmt(dfdx(f,a));
      document.getElementById('hArea').textContent=fmt(integrate(f,0,a,400));
    }
    register(canvas,draw);
    function loop(ts){
      if(!animating) return;
      if(t0===null) t0=ts; var p=Math.min(1,(ts-t0)/2600);
      a=0.6+(6.4-0.6)*(0.5-0.5*Math.cos(Math.PI*p)); // ease across
      redrawAll();
      if(p<1) requestAnimationFrame(loop); else animating=false;
    }
    // interaction
    function setFromEvent(e){
      var rect=canvas.getBoundingClientRect();
      var cx=(e.touches?e.touches[0].clientX:e.clientX)-rect.left;
      var P=new Plot(canvas.getContext('2d'),rect.width,rect.height,view,{l:30,r:12,t:14,b:26});
      var x=view.xmin+(cx-P.pad.l)/(rect.width-P.pad.l-P.pad.r)*(view.xmax-view.xmin);
      a=Math.max(0.4,Math.min(6.6,x)); animating=false; redrawAll();
    }
    var down=false;
    canvas.addEventListener('pointerdown',function(e){ down=true; animating=false; setFromEvent(e); canvas.setPointerCapture(e.pointerId); });
    canvas.addEventListener('pointermove',function(e){ if(down) setFromEvent(e); });
    canvas.addEventListener('pointerup',function(){ down=false; });
    if(!reduceMotion) requestAnimationFrame(loop);
    return {
      toggleArea:function(){ showArea=!showArea; document.getElementById('hToggleArea').classList.toggle('on',showArea); redrawAll(); },
      toggleTan:function(){ showTan=!showTan; document.getElementById('hToggleTan').classList.toggle('on',showTan); redrawAll(); }
    };
  })();
  window.hero=hero;

  /* ===================== SHARED PRESETS (homepage explorers) =====================
     Real closed-form antiderivatives (F) so the Riemann explorer can show an
     exact value alongside the numeric approximation, not just another sum. */
  var EXPLORER_PRESETS={
    quad:  { f:function(x){ return x*x-2; },        F:function(x){ return x*x*x/3-2*x; },     label:'x^{2}-2',        view:{xmin:-1,xmax:4,ymin:-3,ymax:8} },
    cubic: { f:function(x){ return x*x*x/3-x; },     F:function(x){ return x*x*x*x/12-x*x/2; }, label:'\\tfrac{1}{3}x^{3}-x', view:{xmin:-2.4,xmax:2.4,ymin:-2,ymax:2} },
    sine:  { f:function(x){ return 2*Math.sin(x); }, F:function(x){ return -2*Math.cos(x); },   label:'2\\sin x',       view:{xmin:-0.5,xmax:6.5,ymin:-2.4,ymax:2.4} },
    exp:   { f:function(x){ return Math.exp(x)/3; }, F:function(x){ return Math.exp(x)/3; },    label:'\\tfrac{1}{3}e^{x}', view:{xmin:-2,xmax:2,ymin:-0.2,ymax:2.6} }
  };
  function typesetIfReady(el){ if(window.MathJax&&window.MathJax.typesetPromise) window.MathJax.typesetPromise([el]).catch(function(){}); }

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

  /* ===================== DERIVATIVE & TANGENT EXPLORER (homepage) ===================== */
  (function(){
    var canvas=document.getElementById('derivCanvas'),
        aRange=document.getElementById('derivARange'), aNum=document.getElementById('derivANum'),
        hRange=document.getElementById('derivHRange'), resetBtn=document.getElementById('derivReset'),
        presetWrap=document.getElementById('derivPresets'),
        faOut=document.getElementById('derivFa'), secOut=document.getElementById('derivSecant'),
        dOut=document.getElementById('derivDeriv'), eqOut=document.getElementById('derivEqOut'),
        hVal=document.getElementById('derivHval'), aVal=document.getElementById('derivAval'),
        dataBtn=document.getElementById('derivDataBtn'), dataPanel=document.getElementById('derivDataPanel'),
        dataDesc=document.getElementById('derivDataDesc'), dataRows=document.getElementById('derivDataRows');
    if(!canvas||!aRange||!aNum||!hRange||!resetBtn||!presetWrap||!faOut||!secOut||!dOut||!eqOut||!hVal||!aVal) return;

    var DEFAULTS={ key:'quad', a:1.2, hOff:1 };
    var key=DEFAULTS.key, a=DEFAULTS.a, hOff=DEFAULTS.hOff;
    var FN_LABEL={ quad:'x² − 2', cubic:'⅓x³ − x', sine:'2 sin x', exp:'⅓ eˣ' };
    function cur(){ return EXPLORER_PRESETS[key]; }
    function clampA(v){ var view=cur().view, pad=(view.xmax-view.xmin)*0.08; return Math.max(view.xmin+pad,Math.min(view.xmax-pad,v)); }

    /* Non-visual equivalent (Pillar 4 scale): a sampled data table + plain-language
       description of the same curve/tangent/secant the canvas draws, so a screen-reader
       user gets the actual shape and numbers, not just a static alt tag. */
    if(dataBtn&&dataPanel){
      dataBtn.addEventListener('click',function(){
        var opening=dataPanel.hasAttribute('hidden');
        if(opening){ drawExplorerOf(dataBtn); dataPanel.removeAttribute('hidden'); } else dataPanel.setAttribute('hidden','');
        dataBtn.setAttribute('aria-expanded', opening?'true':'false');
      });
    }
    function updateDataView(f,view,fa,m,hasSecant,ms,a2){
      if(!dataDesc||!dataRows) return;
      var desc='Function: '+(FN_LABEL[key]||key)+'. At a = '+fmt(a)+', f(a) = '+fmt(fa)+', tangent slope f′(a) = '+fmt(m)+'.';
      desc += hasSecant
        ? (' Secant through a and a+h ('+fmt(a2)+') has slope '+fmt(ms)+'.')
        : ' Secant offset h is 0, so the secant line coincides with the tangent.';
      dataDesc.textContent=desc;
      var N=9, rows='';
      for(var i=0;i<N;i++){
        var x=view.xmin+(view.xmax-view.xmin)*i/(N-1);
        var fx=f(x), ty=fa+m*(x-a), sy=hasSecant?(fa+ms*(x-a)):null;
        rows+='<tr><td>'+fmt(x)+'</td><td>'+fmt(fx)+'</td><td>'+fmt(ty)+'</td><td>'+(sy===null?'—':fmt(sy))+'</td></tr>';
      }
      dataRows.innerHTML=rows;
    }

    function draw(ctx,w,hpx){
      var c=cur(), f=c.f, view=c.view;
      var P=new Plot(ctx,w,hpx,view,{l:34,r:12,t:14,b:26}); P.clear(); P.grid();
      P.curve(f,INDIGO,2.6);
      var fa=f(a), m=dfdx(f,a), Lx=(view.xmax-view.xmin)*0.32;
      P.segment(a-Lx,fa-m*Lx,a+Lx,fa+m*Lx,INDIGO2,2.4);
      var hasSecant=Math.abs(hOff)>1e-6, a2=a+hOff, ms=0;
      if(hasSecant){
        var fa2=f(a2); ms=(fa2-fa)/hOff;
        P.segment(a-Lx,fa-ms*Lx,a+Lx,fa+ms*Lx,AMBER2,1.8,[6,4]);
        P.dot(a2,fa2,AMBER2,5);
        secOut.textContent=fmt(ms);
      } else {
        secOut.textContent='→ f′(a)';
      }
      P.dot(a,fa,INDIGO,5.5);

      faOut.textContent=fmt(fa);
      dOut.textContent=fmt(m);
      eqOut.innerHTML='Tangent at \\(a='+fmt(a)+'\\): \\( y = '+fmt(fa)+' + ('+fmt(m)+')(x - '+fmt(a)+') \\)';
      typesetIfReady(eqOut);
      updateDataView(f,view,fa,m,hasSecant,ms,a2);
    }
    register(canvas,draw);

    function applyPresetRange(){
      var view=cur().view, pad=(view.xmax-view.xmin)*0.08;
      aRange.min=view.xmin+pad; aRange.max=view.xmax-pad;
    }
    function syncFromRange(){ a=clampA(parseFloat(aRange.value)); aNum.value=fmt(a,2); aVal.textContent=fmt(a,2); redrawAll(); }
    function syncFromNum(){ var v=parseFloat(aNum.value); if(isFinite(v)){ a=clampA(v); aRange.value=a; aVal.textContent=fmt(a,2); redrawAll(); } }
    aRange.addEventListener('input',syncFromRange);
    aNum.addEventListener('input',syncFromNum);
    hRange.addEventListener('input',function(){ hOff=parseFloat(hRange.value); hVal.textContent=fmt(hOff,2); redrawAll(); });

    presetWrap.querySelectorAll('button').forEach(function(btn){
      btn.addEventListener('click',function(){
        presetWrap.querySelectorAll('button').forEach(function(b){ b.classList.remove('on'); });
        btn.classList.add('on'); key=btn.getAttribute('data-fn');
        applyPresetRange(); a=clampA(a); aRange.value=a; aNum.value=fmt(a,2); aVal.textContent=fmt(a,2);
        redrawAll();
      });
    });

    resetBtn.addEventListener('click',function(){
      key=DEFAULTS.key; a=DEFAULTS.a; hOff=DEFAULTS.hOff;
      presetWrap.querySelectorAll('button').forEach(function(b){ b.classList.toggle('on', b.getAttribute('data-fn')===key); });
      applyPresetRange(); aRange.value=a; aNum.value=fmt(a,2); aVal.textContent=fmt(a,2);
      hRange.value=hOff; hVal.textContent=fmt(hOff,2);
      redrawAll();
    });

    applyPresetRange(); aRange.value=a; aNum.value=fmt(a,2); hRange.value=hOff;
    redrawAll();
  })();

  /* ===================== RIEMANN SUM & DEFINITE INTEGRAL EXPLORER (homepage) ===================== */
  (function(){
    var canvas=document.getElementById('riemannCanvas'),
        aNum=document.getElementById('riemannANum'), bNum=document.getElementById('riemannBNum'),
        nRange=document.getElementById('riemannNRange'), nNum=document.getElementById('riemannNNum'),
        methodWrap=document.getElementById('riemannMethod'), presetWrap=document.getElementById('riemannPresets'),
        resetBtn=document.getElementById('riemannReset'),
        approxOut=document.getElementById('riemannApprox'), exactOut=document.getElementById('riemannExact'),
        eqOut=document.getElementById('riemannEqOut'), abVal=document.getElementById('riemannABval'),
        nVal=document.getElementById('riemannNval'),
        dataBtn=document.getElementById('riemannDataBtn'), dataPanel=document.getElementById('riemannDataPanel'),
        dataDesc=document.getElementById('riemannDataDesc'), dataRows=document.getElementById('riemannDataRows');
    if(!canvas||!aNum||!bNum||!nRange||!nNum||!methodWrap||!presetWrap||!resetBtn||!approxOut||!exactOut||!eqOut||!abVal||!nVal) return;

    var DEFAULTS={ key:'quad', a:0, b:3, n:8, rule:'left' };
    var key=DEFAULTS.key, a=DEFAULTS.a, b=DEFAULTS.b, n=DEFAULTS.n, rule=DEFAULTS.rule;
    var RULE_NAME={ left:'Left', right:'Right', mid:'Midpoint', trap:'Trapezoidal' };
    var FN_LABEL={ quad:'x² − 2', cubic:'⅓x³ − x', sine:'2 sin x', exp:'⅓ eˣ' };
    function cur(){ return EXPLORER_PRESETS[key]; }

    /* Non-visual equivalent (Pillar 4 scale): same pattern as the Derivative
       Explorer's data view — a plain-language description plus a table of the
       exact subintervals the picture draws, so a screen-reader user gets the
       real partition (not a re-sampled approximation of it). */
    if(dataBtn&&dataPanel){
      dataBtn.addEventListener('click',function(){
        var opening=dataPanel.hasAttribute('hidden');
        if(opening){ drawExplorerOf(dataBtn); dataPanel.removeAttribute('hidden'); } else dataPanel.setAttribute('hidden','');
        dataBtn.setAttribute('aria-expanded', opening?'true':'false');
      });
    }
    function updateDataView(fn,ap,ex){
      if(!dataDesc||!dataRows) return;
      var dx=(b-a)/n;
      var desc='Function: '+(FN_LABEL[key]||key)+'. Interval ['+fmt(a,2)+', '+fmt(b,2)+'], partitioned into '+n+' subintervals of width '+fmt(dx,3)+' using the '+RULE_NAME[rule]+' rule. '
        +RULE_NAME[rule]+' sum ≈ '+fmt(ap,3)+'. Exact value = '+fmt(ex,3)+' (error '+fmt(Math.abs(ex-ap),3)+').';
      dataDesc.textContent=desc;
      var rows='', i;
      for(i=0;i<n;i++){
        var x0=a+i*dx, x1=a+(i+1)*dx, xs, height, area;
        if(rule==='trap'){
          var f0=fn(x0), f1=fn(x1);
          xs='avg('+fmt(x0)+', '+fmt(x1)+')'; height=0.5*(f0+f1); area=height*dx;
        } else {
          var sx=sampleX(i,dx); height=fn(sx); xs=fmt(sx); area=height*dx;
        }
        rows+='<tr><td>'+(i+1)+'</td><td>['+fmt(x0)+', '+fmt(x1)+']</td><td>'+xs+'</td><td>'+fmt(height)+'</td><td>'+fmt(area)+'</td></tr>';
      }
      dataRows.innerHTML=rows;
    }
    function sampleX(i,dx){
      if(rule==='right') return a+(i+1)*dx;
      if(rule==='mid') return a+(i+0.5)*dx;
      return a+i*dx; // left (and unused for trap)
    }
    function approx(){
      var f=cur().f, dx=(b-a)/n, s=0, i;
      if(rule==='trap'){
        for(i=0;i<n;i++){ var x0=a+i*dx, x1=a+(i+1)*dx; s+=0.5*(f(x0)+f(x1))*dx; }
        return s;
      }
      for(i=0;i<n;i++){ s+=f(sampleX(i,dx))*dx; }
      return s;
    }
    function exact(){ var F=cur().F; return F(b)-F(a); }
    function clampAB(){
      var view=cur().view, minGap=(view.xmax-view.xmin)*0.06;
      a=Math.max(view.xmin,Math.min(a,b-minGap));
      b=Math.min(view.xmax,Math.max(b,a+minGap));
    }

    function draw(ctx,w,hpx){
      var c=cur(), fn=c.f, view=c.view;
      var P=new Plot(ctx,w,hpx,view,{l:34,r:12,t:14,b:26}); P.clear(); P.grid();
      var dx=(b-a)/n, i;
      for(i=0;i<n;i++){
        var x0v=a+i*dx, x1v=a+(i+1)*dx, x0=P.X(x0v), x1=P.X(x1v), yb=P.Y(0);
        if(rule==='trap'){
          var y0=fn(x0v), y1=fn(x1v);
          ctx.beginPath(); ctx.moveTo(x0,yb); ctx.lineTo(x0,P.Y(y0)); ctx.lineTo(x1,P.Y(y1)); ctx.lineTo(x1,yb); ctx.closePath();
          ctx.fillStyle='rgba(200,144,42,0.22)'; ctx.fill();
          ctx.strokeStyle=AMBER; ctx.lineWidth=1; ctx.stroke();
        } else {
          var xs=sampleX(i,dx), hgt=fn(xs), yt=P.Y(hgt);
          ctx.fillStyle='rgba(200,144,42,0.22)'; ctx.fillRect(x0, Math.min(yb,yt), (x1-x0), Math.abs(yb-yt));
          ctx.strokeStyle=AMBER; ctx.lineWidth=1; ctx.strokeRect(x0+0.5, Math.min(yb,yt)+0.5, (x1-x0)-1, Math.abs(yb-yt)-1);
        }
      }
      P.curve(fn,INDIGO,2.6);
      P.dot(a,0,INDIGO2,6); P.dot(b,0,INDIGO2,6);

      var ap=approx(), ex=exact();
      approxOut.textContent=fmt(ap,3);
      exactOut.textContent=fmt(ex,3);
      abVal.textContent='['+fmt(a,2)+', '+fmt(b,2)+']';
      eqOut.innerHTML=RULE_NAME[rule]+' sum, \\(n='+n+'\\): \\[ \\lim_{n\\to\\infty}\\sum_{i=1}^{n} f(x_i^{*})\\,\\Delta x \\;=\\; \\int_{'+fmt(a,2)+'}^{\\,'+fmt(b,2)+'} f(x)\\,dx \\;=\\; '+fmt(ex,3)+' \\]';
      typesetIfReady(eqOut);
      updateDataView(fn,ap,ex);
    }
    register(canvas,draw);

    function xToData(clientX){
      var rect=canvas.getBoundingClientRect(), view=cur().view;
      var P=new Plot(canvas.getContext('2d'),rect.width,rect.height,view,{l:34,r:12,t:14,b:26});
      var cx=clientX-rect.left;
      return view.xmin+(cx-P.pad.l)/(rect.width-P.pad.l-P.pad.r)*(view.xmax-view.xmin);
    }
    var dragging=null;
    canvas.addEventListener('pointerdown',function(e){
      var x=xToData(e.clientX);
      dragging = Math.abs(x-a)<=Math.abs(x-b) ? 'a' : 'b';
      canvas.setPointerCapture(e.pointerId);
    });
    canvas.addEventListener('pointermove',function(e){
      if(!dragging) return;
      var x=xToData(e.clientX);
      if(dragging==='a') a=x; else b=x;
      clampAB(); aNum.value=fmt(a,2); bNum.value=fmt(b,2);
      redrawAll();
    });
    canvas.addEventListener('pointerup',function(){ dragging=null; });

    function syncFromNums(){
      var av=parseFloat(aNum.value), bv=parseFloat(bNum.value);
      if(isFinite(av)) a=av; if(isFinite(bv)) b=bv;
      clampAB(); redrawAll();
    }
    aNum.addEventListener('input',syncFromNums);
    bNum.addEventListener('input',syncFromNums);

    function syncN(v){
      v=Math.max(1,Math.min(80,Math.round(v)));
      n=v; nRange.value=v; nNum.value=v; nVal.textContent=v;
      redrawAll();
    }
    nRange.addEventListener('input',function(){ syncN(parseInt(nRange.value,10)); });
    nNum.addEventListener('input',function(){ syncN(parseInt(nNum.value,10)||1); });

    methodWrap.querySelectorAll('button').forEach(function(btn){
      btn.addEventListener('click',function(){
        methodWrap.querySelectorAll('button').forEach(function(b){ b.classList.remove('on'); });
        btn.classList.add('on'); rule=btn.getAttribute('data-rule'); redrawAll();
      });
    });
    presetWrap.querySelectorAll('button').forEach(function(btn){
      btn.addEventListener('click',function(){
        presetWrap.querySelectorAll('button').forEach(function(b){ b.classList.remove('on'); });
        btn.classList.add('on'); key=btn.getAttribute('data-fn');
        var view=cur().view;
        a=view.xmin+(view.xmax-view.xmin)*0.15; b=view.xmin+(view.xmax-view.xmin)*0.65;
        clampAB(); aNum.value=fmt(a,2); bNum.value=fmt(b,2);
        redrawAll();
      });
    });

    resetBtn.addEventListener('click',function(){
      key=DEFAULTS.key; a=DEFAULTS.a; b=DEFAULTS.b; n=DEFAULTS.n; rule=DEFAULTS.rule;
      presetWrap.querySelectorAll('button').forEach(function(b){ b.classList.toggle('on', b.getAttribute('data-fn')===key); });
      methodWrap.querySelectorAll('button').forEach(function(b){ b.classList.toggle('on', b.getAttribute('data-rule')===rule); });
      aNum.value=fmt(a,2); bNum.value=fmt(b,2);
      nRange.value=n; nNum.value=n; nVal.textContent=n;
      redrawAll();
    });

    aNum.value=fmt(a,2); bNum.value=fmt(b,2); nRange.value=n; nNum.value=n;
    redrawAll();
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

  /* ===================== TEST GENERATOR ===================== */
  function tgShuffle(a){ for(var i=a.length-1;i>0;i--){ var j=Math.floor(Math.random()*(i+1)); var t=a[i]; a[i]=a[j]; a[j]=t; } return a; }
  window.genTest=function(btn){
    var box=btn.closest('.testgen'); if(!box) return;
    var view=btn.closest('main[id^="view-"]'); if(!view) return;
    var practice=view.querySelector('section[id$="-practice"]'); if(!practice) return;
    var pool=Array.prototype.slice.call(practice.querySelectorAll('.problem'));
    var n=parseInt(box.querySelector('.tg-count').value,10)||10;
    var lvl=box.querySelector('.tg-level').value;
    var filtered = (lvl==='all') ? pool.slice() : pool.filter(function(p){
      var L=p.querySelector('.lvl'); return L && L.textContent.trim().toLowerCase()===lvl.toLowerCase();
    });
    if(!filtered.length) filtered=pool.slice();
    tgShuffle(filtered);
    /* no repeated questions or ideas in one test (05e-redundancy-check.js) */
    var _ideas=window.ClipSATRedundancy?window.ClipSATRedundancy.tracker():null, pick=[];
    for(var _i=0;_i<filtered.length&&pick.length<n;_i++){
      var _body=filtered[_i].cloneNode(true); var _sol=_body.querySelector('.sol'); if(_sol) _sol.remove();
      if(!_ideas||_ideas.add(_body.textContent)) pick.push(filtered[_i]);
    }
    var out=box.querySelector('.tg-out'); out.innerHTML='';
    var head=document.createElement('div'); head.className='tg-head';
    var lvlLabel = (lvl==='all'?'all levels':lvl);
    head.innerHTML='<span class="tg-title">Generated test</span><span class="tg-meta">'+pick.length+' question'+(pick.length===1?'':'s')+' \u00b7 '+lvlLabel+'</span>';
    out.appendChild(head);
    if(!pick.length){ var e=document.createElement('p'); e.className='tg-empty'; e.textContent='No questions match that filter.'; out.appendChild(e); return; }
    pick.forEach(function(p,idx){
      var c=p.cloneNode(true);
      c.classList.remove('open');
      var pn=c.querySelector('.pn'); if(pn) pn.textContent=(idx+1);
      var st=c.querySelector('.sol-toggle');
      if(st){ var tw=st.querySelector('.tw'); if(tw) tw.textContent='\u25b8'; if(st.childNodes[1]) st.childNodes[1].textContent=' Show solution'; }
      out.appendChild(c);
    });
    var ans=box.querySelector('.tg-ans'); if(ans){ ans.setAttribute('data-state','hidden'); ans.textContent='Show all answers'; }
    if(window.MathJax && MathJax.typesetPromise){
      MathJax.typesetPromise([out]).catch(function(){});
      setTimeout(function(){ if(window.MathJax && MathJax.typesetPromise) MathJax.typesetPromise([out]).catch(function(){}); }, 500);
    }
    out.scrollIntoView({behavior:reduceMotion?'auto':'smooth', block:'nearest'});
  };
  window.tgReveal=function(btn){
    var box=btn.closest('.testgen'); var out=box.querySelector('.tg-out');
    var probs=out.querySelectorAll('.problem'); if(!probs.length){ alert('Generate a test first.'); return; }
    var show = btn.getAttribute('data-state')!=='shown';
    probs.forEach(function(p){
      p.classList.toggle('open', show);
      var st=p.querySelector('.sol-toggle'); if(st && st.childNodes[1]) st.childNodes[1].textContent=' '+(show?'Hide solution':'Show solution');
    });
    btn.setAttribute('data-state', show?'shown':'hidden');
    btn.textContent = show?'Hide all answers':'Show all answers';
    if(show && window.MathJax && MathJax.typesetPromise){ MathJax.typesetPromise([out]); }
  };
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


  /* ===================== EXAM SPECS (real exam configurations) ===================== */
  window.examSpecs={
    /* AP Calculus AB/BC, AP Precalculus and AP Statistics follow the formats College Board set for the
       May 2027 exams (course content unchanged for Calculus and Precalculus; AP Statistics is the revised
       five-unit course). AP multiple-choice questions have four options. */
    apab:{
      title:'AP Calculus AB',totalTime:'3 hr 10 min',
      logo:'AP® Calculus AB',org:'College Board',letters:['A','B','C','D'],
      instructions:['This exam has two sections. Budget your time carefully.',
        'Section I: 42 multiple-choice questions (four options each). Wrong answers are NOT penalised.',
        'Section II: 6 free-response questions. Show ALL work to earn full credit.',
        'Unless stated otherwise, assume the domain of ƒ is all real numbers.',
        'Decimal answers correct to three decimal places unless otherwise specified.',
        'The average of a finite set of values is their arithmetic mean.'],
      sections:[
        {title:'Section I — Multiple Choice',time:'1 hr 40 min',
         note:'50% of the exam score. Answered in the Bluebook app on the real exam.',
         parts:[
          {label:'Part A',q:29,time:'62 min',calc:false,type:'mcq',note:'No calculator permitted.'},
          {label:'Part B',q:13,time:'38 min',calc:true,type:'mcq',note:'Graphing calculator required for some questions.'}]},
        {title:'Section II — Free Response',time:'1 hr 30 min',
         note:'50% of the exam score. Show all your work. Clearly indicate the methods used, as you are graded on correctness of method as well as accuracy of answer.',
         parts:[
          {label:'Part A',q:2,time:'30 min',calc:true,type:'frq',note:'Graphing calculator required. Write work in the exam booklet.'},
          {label:'Part B',q:4,time:'60 min',calc:false,type:'frq',note:'No calculator permitted. Write work in the exam booklet.'}]}]},

    apbc:{
      title:'AP Calculus BC',totalTime:'3 hr 10 min',
      logo:'AP® Calculus BC',org:'College Board',letters:['A','B','C','D'],
      instructions:['This exam has two sections. Budget your time carefully.',
        'Section I: 42 multiple-choice questions (four options each). Wrong answers are NOT penalised.',
        'Section II: 6 free-response questions. Show ALL work to earn full credit.',
        'Unless stated otherwise, assume the domain of ƒ is all real numbers.',
        'Decimal answers correct to three decimal places unless otherwise specified.'],
      sections:[
        {title:'Section I — Multiple Choice',time:'1 hr 40 min',
         note:'50% of the exam score. Answered in the Bluebook app on the real exam.',
         parts:[
          {label:'Part A',q:29,time:'62 min',calc:false,type:'mcq',note:'No calculator permitted.'},
          {label:'Part B',q:13,time:'38 min',calc:true,type:'mcq',note:'Graphing calculator required for some questions.'}]},
        {title:'Section II — Free Response',time:'1 hr 30 min',
         note:'50% of the exam score. Show all your work for full credit.',
         parts:[
          {label:'Part A',q:2,time:'30 min',calc:true,type:'frq',note:'Graphing calculator required.'},
          {label:'Part B',q:4,time:'60 min',calc:false,type:'frq',note:'No calculator permitted.'}]}]},

    appc:{
      title:'AP Precalculus',totalTime:'2 hr 55 min',
      logo:'AP® Precalculus',org:'College Board',letters:['A','B','C','D'],
      instructions:['This exam has two sections.',
        'Section I: 42 multiple-choice questions (Parts A & B), four options each.',
        'Section II: 4 free-response questions.',
        'Show all work for free-response questions.'],
      sections:[
        {title:'Section I — Multiple Choice',time:'1 hr 45 min',
         note:'Answered in the Bluebook app on the real exam.',
         parts:[
          {label:'Part A',q:29,time:'65 min',calc:false,type:'mcq',note:'No calculator permitted.'},
          {label:'Part B',q:13,time:'40 min',calc:true,type:'mcq',note:'Graphing calculator required for some questions (radian mode).'}]},
        {title:'Section II — Free Response',time:'1 hr 10 min',
         note:'Show all work. Answers without supporting work may not receive full credit.',
         parts:[
          {label:'Part A',q:2,time:'35 min',calc:true,type:'frq',note:'Graphing calculator required.'},
          {label:'Part B',q:2,time:'35 min',calc:false,type:'frq',note:'No calculator permitted.'}]}]},

    apstats:{
      title:'AP Statistics',totalTime:'3 hr',
      logo:'AP® Statistics',org:'College Board',letters:['A','B','C','D'],
      instructions:['This exam has two sections, both completed in the Bluebook app on the real exam.',
        'Section I: 42 multiple-choice questions (four options each), 90 minutes.',
        'Section II: 4 free-response questions, 10 points each, 90 minutes.',
        'Show all work. Answers without appropriate supporting work will not receive full credit.',
        'A formula sheet and probability and statistics tables are provided. A graphing calculator is allowed throughout.'],
      sections:[
        {title:'Section I — Multiple Choice',time:'1 hr 30 min',
         note:'42 questions. 50% of the exam score. No penalty for incorrect answers.',
         parts:[{label:'',q:42,time:'90 min',calc:true,type:'mcq',note:''}]},
        {title:'Section II — Free Response',time:'1 hr 30 min',
         note:'4 questions, 10 points each. 50% of the exam score. Clearly communicate your statistical reasoning.',
         parts:[{label:'',q:4,time:'90 min',calc:true,type:'frq',note:'About 22 minutes per question.'}]}]},

    /* Digital SAT: 22 questions per module, about 75% multiple choice and 25% student-produced
       response (the real test mixes them; ClipSAT groups them within each module). */
    sat:{
      title:'Digital SAT® — Math',totalTime:'70 min',
      logo:'SAT®',org:'College Board',
      instructions:['Math section has two modules, each 35 minutes.',
        'Question types: multiple-choice (4 options) and student-produced response (grid-in).',
        'Calculator is permitted on ALL math questions.',
        'Reference sheet with formulas is provided at the start of each module.',
        'Module 2 difficulty adapts based on your Module 1 performance.'],
      sections:[
        {title:'Math — Module 1',time:'35 min',
         note:'This module contains multiple-choice and student-produced response questions.',
         parts:[{label:'Multiple choice',q:17,time:'',calc:true,type:'mcq',note:'Four answer choices.'},
          {label:'Student-produced response',q:5,time:'',calc:true,type:'frq',note:'Enter your own answer (an integer, decimal or fraction).'}]},
        {title:'Math — Module 2 (Adaptive)',time:'35 min',
         note:'This module adapts to your performance on Module 1.',
         parts:[{label:'Multiple choice',q:17,time:'',calc:true,type:'mcq',note:'Four answer choices.'},
          {label:'Student-produced response',q:5,time:'',calc:true,type:'frq',note:'Enter your own answer (an integer, decimal or fraction).'}]}]},

    /* Enhanced ACT (national paper and online tests from September 2025): 45 questions in 50 minutes,
       four answer choices, calculator allowed throughout. On the real test 41 are scored and 4 are
       unscored field-test questions; ClipSAT scores all 45. */
    act:{
      title:'ACT Mathematics',totalTime:'50 min',
      logo:'ACT®',org:'ACT, Inc.',letters:['A','B','C','D'],
      instructions:['45 questions — 50 minutes.',
        'Each question has four answer choices.',
        'Choose the BEST answer. Fill in the corresponding bubble on your answer sheet.',
        'Do not spend too long on any one problem. Return to difficult problems if time permits.',
        'Calculator permitted on every question. Assumed: figures not to scale unless stated; all geometry in a plane; "line" means straight line; "average" means arithmetic mean.'],
      sections:[
        {title:'Mathematics Test',time:'50 min',note:'45 Questions — 50 Minutes',
         parts:[{label:'',q:45,time:'50 min',calc:true,type:'mcq',note:'Four answer choices per question.',letters:['A','B','C','D']}]}]},

    /* ACT International Subject Test — Mathematics 1: 50 multiple-choice questions in 60 minutes,
       calculator allowed, reference sheet provided; about half Algebra II and half precalculus. */
    act2:{
      title:'ACT International Subject Test — Mathematics 1',totalTime:'60 min',
      logo:'ACT®',org:'ACT, Inc.',letters:['A','B','C','D'],
      instructions:['50 questions — 60 minutes.',
        'Choose the best answer for each question.',
        'Calculator permitted. A reference sheet of common formulas is provided.',
        'Assumed: figures not to scale unless stated.'],
      sections:[
        {title:'Mathematics 1',time:'60 min',note:'50 Questions — 60 Minutes',
         parts:[{label:'',q:50,time:'60 min',calc:true,type:'mcq',note:'',letters:['A','B','C','D']}]}]},

    est:{
      /* EST I papers from January, October and December 2024 (supplied by the maintainer) all have a
         20-question no-calculator section and a 38-question calculator section of four-option MCQs. */
      title:'EST I — Mathematics',totalTime:'1 hr 20 min',
      logo:'EST',org:'Academic Assessment Ltd.',letters:['A','B','C','D'],
      instructions:['The Mathematics test has two sections.',
        'No-calculator section: 20 questions, 25 minutes.',
        'Calculator section: 38 questions, 55 minutes.',
        'Every question is multiple choice with four answer choices. Mark the best answer on the answer sheet.',
        'No penalty for incorrect answers.'],
      sections:[
        {title:'Section 3 — Mathematics: No Calculator',time:'25 min',
         note:'Calculator use is NOT permitted in this section.',
         parts:[{label:'',q:20,time:'25 min',calc:false,type:'mcq',note:''}]},
        {title:'Section 4 — Mathematics: Calculator Permitted',time:'55 min',
         note:'A scientific or graphing calculator may be used in this section.',
         parts:[{label:'',q:38,time:'55 min',calc:true,type:'mcq',note:''}]}]},

    /* EST II Mathematics Level 1 (subject test): 50 multiple-choice questions in 60 minutes, calculator
       allowed, surface-area and volume formulas provided. */
    est2:{
      title:'EST II — Mathematics Level 1',totalTime:'60 min',
      logo:'EST II',org:'Academic Assessment Ltd.',
      instructions:['50 questions — 60 minutes.',
        'Choose the best answer for each question.',
        'A calculator is allowed; check whether it should be in degree or radian mode.',
        'Formulas for the surface area and volume of solids are provided.',
        'No penalty for incorrect answers.'],
      sections:[
        {title:'Mathematics Level 1',time:'60 min',
         note:'50 questions. A scientific or graphing calculator may be used.',
         parts:[{label:'',q:50,time:'60 min',calc:true,type:'mcq',note:''}]}]},

    igcse:{
      /* 0580 syllabus 2025–2027 and 2028–2030, Extended tier: two balanced papers (2 h, 100 marks, 50% each),
         Paper 2 non-calculator, Paper 4 calculator, List of formulas on page 2 of each paper. The syllabus does
         not fix a question count; the counts below are ClipSAT's layout for a 100-mark paper. */
      title:'Cambridge IGCSE Mathematics 0580 (Extended)',totalTime:'4 hr',
      logo:'Cambridge IGCSE™',org:'Cambridge Assessment International Education',
      instructions:['Answer ALL questions.',
        'Show all necessary working clearly. Answers without working may not gain full marks.',
        'A List of formulas is provided on page 2 of each paper.',
        'Give non-exact numerical answers correct to 3 significant figures, or 1 decimal place for angles in degrees, unless the question says otherwise.',
        'For π, use either your calculator value or 3.142 (Paper 4).',
        'Diagrams are not necessarily drawn to scale.'],
      sections:[
        {title:'Paper 2 — Non-calculator (Extended)',time:'2 hr',
         note:'100 marks. Calculators must not be used. Structured and unstructured questions. Answer ALL questions.',
         parts:[{label:'',q:20,time:'120 min',calc:false,type:'frq',note:'Non-calculator paper. Show all working.'}]},
        {title:'Paper 4 — Calculator (Extended)',time:'2 hr',
         note:'100 marks. A scientific calculator is required. Structured and unstructured questions. Answer ALL questions.',
         parts:[{label:'',q:20,time:'120 min',calc:true,type:'frq',note:'Calculator paper. Show all necessary working.'}]}]},

    aslevel:{
      /* 9709 syllabus 2026–2027 and 2028–2030: Paper 1 is 1 h 50 min, 75 marks, 10–12 structured questions. */
      title:'Cambridge AS Level Mathematics 9709',totalTime:'1 hr 50 min',
      logo:'Cambridge International AS & A Level',org:'Cambridge Assessment International Education',
      instructions:['Answer ALL questions.',
        'If working is needed, show it below the question.',
        'Omission of essential working will result in loss of marks.',
        'Electronic calculators should be used where appropriate.',
        'Give non-exact answers correct to 3 significant figures, or 1 decimal place for angles in degrees, unless stated otherwise.',
        'A list of formulae and statistical tables (MF19) is provided. Graphical calculators are not permitted.'],
      sections:[
        {title:'Paper 1 — Pure Mathematics 1',time:'1 hr 50 min',
         note:'75 marks. Answer ALL questions. Electronic calculator required.',
         parts:[{label:'',q:11,time:'110 min',calc:true,type:'frq',note:'Show all working. Partial marks are awarded.'}]}]},

    a2level:{
      /* 9709 syllabus 2026–2027 and 2028–2030: Paper 3 is 1 h 50 min, 75 marks, 9–11 structured questions. */
      title:'Cambridge A Level Mathematics 9709',totalTime:'1 hr 50 min',
      logo:'Cambridge International AS & A Level',org:'Cambridge Assessment International Education',
      instructions:['Answer ALL questions.',
        'Show all necessary working. Omission of working results in loss of marks.',
        'Electronic calculators should be used where appropriate.',
        'Give non-exact answers correct to 3 significant figures, or 1 decimal place for angles in degrees, unless stated otherwise.',
        'A list of formulae and statistical tables (MF19) is provided. Graphical calculators are not permitted.'],
      sections:[
        {title:'Paper 3 — Pure Mathematics 3',time:'1 hr 50 min',
         note:'75 marks. Answer ALL questions. Electronic calculator required.',
         parts:[{label:'',q:10,time:'110 min',calc:true,type:'frq',note:'Show all working.'}]}]},

    qudrat:{
      title:'GAT Qudrat — Quantitative Reasoning',totalTime:'52 min',
      logo:'GAT',org:'National Center for Assessment (Qiyas)',
      instructions:['52 questions — 52 minutes.',
        'Choose the best answer for each question.',
        'There is no penalty for wrong answers.',
        'Work quickly and carefully.',
        'No calculator permitted.'],
      sections:[
        {title:'Quantitative Reasoning',time:'52 min',
         note:'52 questions — one per minute on average.',
         parts:[{label:'',q:52,time:'52 min',calc:false,type:'mcq',note:''}]}]},

    tahsili:{
      title:'SAAT Tahsili — Mathematics',totalTime:'50 min',
      logo:'Tahsili',org:'National Center for Assessment (Qiyas)',
      instructions:['50 questions — 50 minutes.',
        'Choose the best answer for each question from the four options.',
        'No penalty for wrong answers.',
        'No calculator permitted.'],
      sections:[
        {title:'Mathematics Section',time:'50 min',
         note:'50 questions — answer all questions.',
         parts:[{label:'',q:50,time:'50 min',calc:false,type:'mcq',note:''}]}]},
    /* IB Mathematics: analysis and approaches, guide for first assessment 2021 (assessed until the new
       guide's first exams in May 2029). Every paper is written: Section A short-response and Section B
       extended-response questions. There is no multiple choice. */
    ibsl:{
      title:'IB Mathematics: Analysis and Approaches SL',totalTime:'3 hr',
      logo:'IB Mathematics SL',org:'International Baccalaureate Organization',
      instructions:['Answer ALL questions in both papers.',
        'Paper 1 (no technology): 80 marks, 90 minutes.',
        'Paper 2 (graphic display calculator required): 80 marks, 90 minutes.',
        'Each paper has Section A (short-response) and Section B (extended-response) questions.',
        'Answers should be given exactly or correct to 3 significant figures unless stated otherwise.',
        'Full marks are not necessarily awarded for a correct answer with no working.'],
      sections:[
        {title:'Paper 1 — No technology',time:'90 min',
         note:'80 marks. No calculator allowed.',
         parts:[{label:'Sections A and B',q:9,time:'90 min',calc:false,type:'frq',note:'Short-response then extended-response questions. Answer all questions.'}]},
        {title:'Paper 2 — Technology required',time:'90 min',
         note:'80 marks. Graphic display calculator required.',
         parts:[{label:'Sections A and B',q:9,time:'90 min',calc:true,type:'frq',note:'Short-response then extended-response questions. Answer all questions.'}]}
      ]
    },
    ibhl:{
      title:'IB Mathematics: Analysis and Approaches HL',totalTime:'5 hr',
      logo:'IB Mathematics HL',org:'International Baccalaureate Organization',
      instructions:['Answer ALL questions in all papers.',
        'Paper 1 (no technology): 110 marks, 120 minutes.',
        'Paper 2 (graphic display calculator required): 110 marks, 120 minutes.',
        'Paper 3 (graphic display calculator required): two extended problem-solving questions, 55 marks, 60 minutes.',
        'Answers should be given exactly or correct to 3 significant figures unless stated otherwise.',
        'Full marks are not necessarily awarded for a correct answer with no working.'],
      sections:[
        {title:'Paper 1 — No technology',time:'120 min',
         note:'110 marks. No calculator allowed.',
         parts:[{label:'Sections A and B',q:10,time:'120 min',calc:false,type:'frq',note:'Short-response then extended-response questions. Answer all questions.'}]},
        {title:'Paper 2 — Technology required',time:'120 min',
         note:'110 marks. Graphic display calculator required.',
         parts:[{label:'Sections A and B',q:10,time:'120 min',calc:true,type:'frq',note:'Short-response then extended-response questions. Answer all questions.'}]},
        {title:'Paper 3 — Technology required',time:'60 min',
         note:'55 marks. Two compulsory extended-response problem-solving questions.',
         parts:[{label:'',q:2,time:'60 min',calc:true,type:'frq',note:'Answer both questions.'}]}
      ]
    }
  };


  /* ===================== FIGURE RENDERER ===================== */
  /* ── Shared figure-rendering palette — brand-consistent across every quiz/exam/worksheet
     figure (mirrors the INDIGO/AMBER/TEAL system already used by the PDF worksheet generator
     in tools/worksheet_gen/generate.py, so a diagram looks the same whether it's on a live
     quiz page or a downloaded worksheet). ── */
  /* declared on window (not a local var) so both this closure and the private
     renderMathFigure/renderGeom2D/renderGeom3D/etc. closure elsewhere in this
     script can see the same palette without needing a second declaration. */
  window.FIG_INDIGO='#1E3A6E'; window.FIG_INDIGO2='#2B5BA8'; window.FIG_INDIGO_FILL='rgba(30,58,110,0.08)';
  window.FIG_INDIGO_FILL2='rgba(43,91,168,0.16)'; window.FIG_AMBER='#C8902A'; window.FIG_AMBER_TEXT='#8A6017';
  window.FIG_AMBER_FILL='rgba(200,144,42,0.16)'; window.FIG_TEAL='#0e9f8f'; window.FIG_INK='#0E1726';
  window.FIG_MUTED='#5a6577'; window.FIG_GRID='#c9d4e8'; window.FIG_BORDER='#dde4f0'; window.FIG_BG='#fbfcfe';
  window.FIG_SERIES=[window.FIG_INDIGO2,window.FIG_AMBER,window.FIG_TEAL,'#8B5CF6','#DB5C6B'];
  var FIG_INDIGO=window.FIG_INDIGO, FIG_INDIGO2=window.FIG_INDIGO2, FIG_INDIGO_FILL=window.FIG_INDIGO_FILL,
      FIG_INDIGO_FILL2=window.FIG_INDIGO_FILL2, FIG_AMBER=window.FIG_AMBER, FIG_AMBER_TEXT=window.FIG_AMBER_TEXT,
      FIG_AMBER_FILL=window.FIG_AMBER_FILL, FIG_TEAL=window.FIG_TEAL, FIG_INK=window.FIG_INK,
      FIG_MUTED=window.FIG_MUTED, FIG_GRID=window.FIG_GRID, FIG_BORDER=window.FIG_BORDER, FIG_BG=window.FIG_BG,
      FIG_SERIES=window.FIG_SERIES;

  window._renderFig=function(fig){
    try{
    if(!fig) return '';
    if(typeof fig==='string') return fig;
    /* one shared entry point: figures authored in the richer renderMathFigure schema
       (function_graph / geometry_2d / geometry_3d / bar_chart / pie / number_line) are
       routed to the same renderers used by the AI test generator, so every figure —
       regardless of which schema authored it — renders through one call surface. */
    if(typeof window.renderMathFigure==='function' &&
       (fig.type==='function_graph'||fig.type==='geometry_2d'||fig.type==='geometry_3d'||
        fig.type==='bar_chart'||fig.type==='pie'||fig.type==='number_line')){
      /* Those renderers emit class="mfig-svg", which is width:100% — sized for the
         AI-test generator's full-width .mfig card. Dropped straight into a
         .cq-figure (chapter quiz) it has no width cap and stretches to the whole
         question column. Wrap it so the figure's own `width` is honored as a cap,
         while still shrinking on narrow screens. */
      var inner=window.renderMathFigure(fig);
      if(!inner) return '';
      var capW=fig.width||260;
      return '<span style="display:inline-block;width:100%;max-width:'+capW+'px">'+inner+'</span>';
    }
    var W=fig.w||260,H=fig.h||200;
    var s='<svg width="'+W+'" height="'+H+'" viewBox="0 0 '+W+' '+H+'" xmlns="http://www.w3.org/2000/svg" style="display:block;max-width:100%;font-family:sans-serif;background:'+FIG_BG+';border-radius:6px;border:1px solid '+FIG_BORDER+'">';
    /* ── coordinate axes + function plots ── */
    if(fig.type==='fn'||fig.type==='axes'){
      var xl=fig.xrange||[-5,5],yl=fig.yrange||[-5,5];
      var pad=38,gw=W-2*pad,gh=H-2*pad;
      var sx=gw/(xl[1]-xl[0]),sy=gh/(yl[1]-yl[0]);
      var ox=pad+(-xl[0])*sx,oy=pad+(yl[1])*sy;
      /* grid */
      s+='<g stroke="'+FIG_GRID+'" stroke-width="0.5">';
      for(var gx=Math.ceil(xl[0]);gx<=xl[1];gx++){var px=pad+(gx-xl[0])*sx;s+='<line x1="'+px+'" y1="'+pad+'" x2="'+px+'" y2="'+(H-pad)+'"/>';}
      for(var gy=Math.ceil(yl[0]);gy<=yl[1];gy++){var py=pad+(yl[1]-gy)*sy;s+='<line x1="'+pad+'" y1="'+py+'" x2="'+(W-pad)+'" y2="'+py+'"/>';}
      s+='</g>';
      /* axes */
      s+='<line x1="'+pad+'" y1="'+oy+'" x2="'+(W-pad)+'" y2="'+oy+'" stroke="'+FIG_INK+'" stroke-width="1.5" marker-end="url(#arr)"/>';
      s+='<line x1="'+ox+'" y1="'+(H-pad)+'" x2="'+ox+'" y2="'+pad+'" stroke="'+FIG_INK+'" stroke-width="1.5" marker-end="url(#arr2)"/>';
      s+='<defs><marker id="arr" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="'+FIG_INK+'"/></marker><marker id="arr2" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto"><path d="M0,6 L3,0 L6,6 Z" fill="'+FIG_INK+'"/></marker></defs>';
      /* tick labels — thinned to a round step so a wide window (e.g. -11..11 on a
         240px canvas) doesn't smear 23 overlapping numbers along each axis. The
         GRID stays at every unit; only the labels/ticks step. */
      var _step=function(span,px){
        var room=Math.max(3,Math.floor(px/24));           /* ~24px per label */
        var raw=Math.ceil(span/room);
        return [1,2,5,10,20,25,50,100].find(function(n){return n>=raw;})||Math.ceil(raw/10)*10;
      };
      var stepX=_step(xl[1]-xl[0],gw), stepY=_step(yl[1]-yl[0],gh);
      s+='<g font-size="8" fill="'+FIG_MUTED+'" text-anchor="middle">';
      for(var tx=Math.ceil(xl[0]);tx<=Math.floor(xl[1]);tx++){if(tx===0||tx%stepX!==0)continue;var tpx=pad+(tx-xl[0])*sx;if(tpx<pad+4||tpx>W-pad-4)continue;s+='<text x="'+tpx+'" y="'+(oy+13)+'">'+tx+'</text><line x1="'+tpx+'" y1="'+(oy-3)+'" x2="'+tpx+'" y2="'+(oy+3)+'" stroke="'+FIG_MUTED+'" stroke-width="1"/>';}
      s+='</g><g font-size="8" fill="'+FIG_MUTED+'" text-anchor="end">';
      for(var ty=Math.ceil(yl[0]);ty<=Math.floor(yl[1]);ty++){if(ty===0||ty%stepY!==0)continue;var tpy=pad+(yl[1]-ty)*sy;if(tpy<pad+4||tpy>H-pad-4)continue;s+='<text x="'+(ox-5)+'" y="'+(tpy+3)+'">'+ty+'</text><line x1="'+(ox-3)+'" y1="'+tpy+'" x2="'+(ox+3)+'" y2="'+tpy+'" stroke="'+FIG_MUTED+'" stroke-width="1"/>';}
      s+='</g>';
      /* axis labels */
      s+='<text x="'+(W-pad+10)+'" y="'+(oy+4)+'" font-size="11" fill="'+FIG_INK+'" font-style="italic">x</text>';
      s+='<text x="'+(ox+5)+'" y="'+(pad-8)+'" font-size="11" fill="'+FIG_INK+'" font-style="italic">y</text>';
      /* function curves */
      var COLS=FIG_SERIES;
      (fig.fns||[]).forEach(function(f,fi){
        var col=f.color||COLS[fi%COLS.length];
        var pts=[],steps=300;
        for(var si=0;si<=steps;si++){
          var xx=xl[0]+(xl[1]-xl[0])*si/steps;
          var yy;try{yy=eval(f.fn.replace(/x/g,'('+xx+')'));}catch(e){continue;}
          if(!isFinite(yy)||yy<yl[0]-0.5||yy>yl[1]+0.5){if(pts.length){s+='<polyline points="'+pts.join(' ')+'" fill="none" stroke="'+col+'" stroke-width="2.2" stroke-linejoin="round"/>';pts=[];}continue;}
          pts.push((pad+(xx-xl[0])*sx).toFixed(1)+','+(pad+(yl[1]-yy)*sy).toFixed(1));
        }
        if(pts.length)s+='<polyline points="'+pts.join(' ')+'" fill="none" stroke="'+col+'" stroke-width="2.2" stroke-linejoin="round"/>';
        if(f.label)s+='<text x="'+(pad+(f.lx!==undefined?f.lx:xl[1]*0.7-xl[0])*sx+pad*(f.lx!==undefined?0:0))+'" y="'+(pad+(yl[1]-(f.ly!==undefined?f.ly:eval(f.fn.replace(/x/g,'('+xl[1]*0.7+')'))))*sy-6)+'" font-size="10" fill="'+col+'" font-style="italic">'+f.label+'</text>';
      });
      /* points */
      (fig.points||[]).forEach(function(p){
        var px=pad+(p.x-xl[0])*sx,py=pad+(yl[1]-p.y)*sy;
        s+='<circle cx="'+px+'" cy="'+py+'" r="'+(p.r||4)+'" fill="'+(p.open?'#fff':(p.color||FIG_INDIGO2))+'" stroke="'+(p.color||FIG_INDIGO2)+'" stroke-width="1.8"/>';
        if(p.label){
          /* flip the label inward for points in the right half, otherwise it
             runs off the canvas and collides with the x-axis label */
          var rh=p.x>(xl[0]+xl[1])/2, aut=p.dx===undefined;
          var ldx=aut?(rh?-8:8):p.dx, anc=(aut&&rh)?'end':'start';
          s+='<text x="'+(px+ldx)+'" y="'+(py+(p.dy||-6))+'" font-size="10" fill="'+FIG_INK+'" text-anchor="'+anc+'">'+p.label+'</text>';
        }
      });
      /* shaded regions */
      (fig.shade||[]).forEach(function(r){
        var steps2=80,pts2=[];
        if(r.fn2){
          /* shade between two curves */
          for(var si2=0;si2<=steps2;si2++){var xx2=r.x1+(r.x2-r.x1)*si2/steps2;var yy2;try{yy2=eval(r.fn.replace(/x/g,'('+xx2+')'));}catch(e){continue;}pts2.push((pad+(xx2-xl[0])*sx).toFixed(1)+','+(pad+(yl[1]-yy2)*sy).toFixed(1));}
          for(var si3=steps2;si3>=0;si3--){var xx3=r.x1+(r.x2-r.x1)*si3/steps2;var yy3;try{yy3=eval(r.fn2.replace(/x/g,'('+xx3+')'));}catch(e){continue;}pts2.push((pad+(xx3-xl[0])*sx).toFixed(1)+','+(pad+(yl[1]-yy3)*sy).toFixed(1));}
        } else {
          for(var si2=0;si2<=steps2;si2++){var xx2=r.x1+(r.x2-r.x1)*si2/steps2;var yy2;try{yy2=eval(r.fn.replace(/x/g,'('+xx2+')'));}catch(e){continue;}pts2.push((pad+(xx2-xl[0])*sx).toFixed(1)+','+(pad+(yl[1]-yy2)*sy).toFixed(1));}
          pts2.push((pad+(r.x2-xl[0])*sx)+','+oy);pts2.push((pad+(r.x1-xl[0])*sx)+','+oy);
        }
        s+='<polygon points="'+pts2.join(' ')+'" fill="'+(r.color||FIG_INDIGO_FILL2)+'"/>';
      });
      /* horizontal/vertical ref lines */
      (fig.hlines||[]).forEach(function(hl){var py2=pad+(yl[1]-hl.y)*sy;s+='<line x1="'+pad+'" y1="'+py2+'" x2="'+(W-pad)+'" y2="'+py2+'" stroke="'+(hl.color||FIG_MUTED)+'" stroke-width="1" stroke-dasharray="'+(hl.dash||'4,3')+'"/>';if(hl.label)s+='<text x="'+(W-pad+4)+'" y="'+(py2+4)+'" font-size="9" fill="'+(hl.color||FIG_MUTED)+'">'+hl.label+'</text>';});
    }
    /* ── triangle ── */
    else if(fig.type==='triangle'){
      var verts=fig.vertices;
      var pad3=32;
      /* if an exterior-angle construction is requested, its extension point(s)
         must be included in the bbox BEFORE scaling, or the auxiliary ray gets
         clipped off canvas. Computed in DATA space, same as the vertices. */
      var extDataPts=[];
      if(fig.ext_angle){
        var eaD=fig.ext_angle, atD=eaD.at;
        if(eaD.mode==='side'){
          var fromD=eaD.from, AD=verts[fromD], BD=verts[atD];
          var dxD=BD[0]-AD[0], dyD=BD[1]-AD[1], lenD=Math.sqrt(dxD*dxD+dyD*dyD)||1, extLenD=lenD*0.65;
          extDataPts.push([BD[0]+dxD/lenD*extLenD, BD[1]+dyD/lenD*extLenD]);
        } else if(eaD.mode==='parallel'){
          var spanD=(Math.max(verts[0][0],verts[1][0],verts[2][0])-Math.min(verts[0][0],verts[1][0],verts[2][0]))*0.55||3;
          extDataPts.push([verts[atD][0]-spanD, verts[atD][1]], [verts[atD][0]+spanD, verts[atD][1]]);
        }
      }
      var bboxPts=[verts[0],verts[1],verts[2]].concat(extDataPts);
      var minx2=Math.min.apply(null,bboxPts.map(function(p){return p[0];})),maxx2=Math.max.apply(null,bboxPts.map(function(p){return p[0];}));
      var miny2=Math.min.apply(null,bboxPts.map(function(p){return p[1];})),maxy2=Math.max.apply(null,bboxPts.map(function(p){return p[1];}));
      var sc3=Math.min((W-2*pad3)/(maxx2-minx2||1),(H-2*pad3)/(maxy2-miny2||1));
      var toS=function(v){return [(v[0]-minx2)*sc3+pad3,H-(v[1]-miny2)*sc3-pad3];};
      var p0=toS(verts[0]),p1=toS(verts[1]),p2=toS(verts[2]);
      var pts3=[p0,p1,p2].map(function(p){return p[0]+','+p[1];}).join(' ');
      s+='<polygon points="'+pts3+'" fill="'+FIG_INDIGO_FILL+'" stroke="'+FIG_INDIGO+'" stroke-width="2"/>';
      /* exterior-angle construction: a dashed auxiliary ray plus the resulting
         exterior angle, marked and labelled. 'side' extends an existing side
         past a vertex (classic exterior-angle-theorem figure); 'parallel'
         draws a line through a vertex parallel to the OPPOSITE side (always
         horizontal here, since every triangle in this schema has its base
         v0-v1 laid horizontal by construction) — the alternate-interior-angle
         proof of the same theorem. */
      if(fig.ext_angle){
        var eaP=[p0,p1,p2];
        if(fig.ext_angle.mode==='side'){
          var atP=eaP[fig.ext_angle.at], throughOther=eaP[fig.ext_angle.at===2?(fig.ext_angle.from===0?1:0):(fig.ext_angle.at===0?1:2)];
          var extScreen=toS(extDataPts[0]);
          s+='<line x1="'+atP[0].toFixed(1)+'" y1="'+atP[1].toFixed(1)+'" x2="'+extScreen[0].toFixed(1)+'" y2="'+extScreen[1].toFixed(1)+'" stroke="'+FIG_INK+'" stroke-width="1.4" stroke-dasharray="5,3"/>';
          /* exterior-angle arc: between the extension ray and the side NOT used to extend */
          var thirdIdx=3-fig.ext_angle.at-fig.ext_angle.from;
          var thirdP=eaP[thirdIdx];
          var vA=[extScreen[0]-atP[0],extScreen[1]-atP[1]], vB=[thirdP[0]-atP[0],thirdP[1]-atP[1]];
          var lA=Math.hypot(vA[0],vA[1])||1, lB=Math.hypot(vB[0],vB[1])||1;
          var angA=Math.atan2(vA[1],vA[0]), angB=Math.atan2(vB[1],vB[0]);
          var arR=16, sA=atP[0]+arR*Math.cos(angA), sY=atP[1]+arR*Math.sin(angA);
          var eA=atP[0]+arR*Math.cos(angB), eY=atP[1]+arR*Math.sin(angB);
          var crossD=vA[0]/lA*vB[1]/lB-vA[1]/lA*vB[0]/lB, sweepD=crossD>0?1:0;
          s+='<path d="M'+sA.toFixed(1)+','+sY.toFixed(1)+' A'+arR+','+arR+' 0 0,'+sweepD+' '+eA.toFixed(1)+','+eY.toFixed(1)+'" fill="none" stroke="'+FIG_AMBER+'" stroke-width="1.3"/>';
          var diffD=angB-angA;while(diffD>Math.PI)diffD-=2*Math.PI;while(diffD<-Math.PI)diffD+=2*Math.PI;
          var midD=angA+(crossD>0?1:-1)*Math.abs(diffD)/2;
          s+='<text x="'+(atP[0]+(arR+11)*Math.cos(midD)).toFixed(1)+'" y="'+(atP[1]+(arR+11)*Math.sin(midD)+3).toFixed(1)+'" font-size="9" fill="'+FIG_AMBER_TEXT+'" text-anchor="middle">'+(fig.ext_angle.label||'?')+'</text>';
        } else if(fig.ext_angle.mode==='parallel'){
          var e1=toS(extDataPts[0]), e2=toS(extDataPts[1]);
          s+='<line x1="'+e1[0].toFixed(1)+'" y1="'+e1[1].toFixed(1)+'" x2="'+e2[0].toFixed(1)+'" y2="'+e2[1].toFixed(1)+'" stroke="'+FIG_INK+'" stroke-width="1.4" stroke-dasharray="5,3"/>';
          var atPp=eaP[fig.ext_angle.at];
          s+='<text x="'+atPp[0].toFixed(1)+'" y="'+(atPp[1]-10).toFixed(1)+'" font-size="9" fill="'+FIG_AMBER_TEXT+'" text-anchor="middle">'+(fig.ext_angle.label||'?')+'</text>';
        }
      }
      /* right angle */
      if(fig.right!==undefined){
        var ri=fig.right,rv=[p0,p1,p2][ri],others=[[p0,p1,p2][(ri+1)%3],[p0,p1,p2][(ri+2)%3]];
        var v1=[others[0][0]-rv[0],others[0][1]-rv[1]],v2=[others[1][0]-rv[0],others[1][1]-rv[1]];
        var l1=Math.sqrt(v1[0]*v1[0]+v1[1]*v1[1])||1,l2=Math.sqrt(v2[0]*v2[0]+v2[1]*v2[1])||1;
        var u1=[v1[0]/l1*10,v1[1]/l1*10],u2=[v2[0]/l2*10,v2[1]/l2*10];
        s+='<polyline points="'+(rv[0]+u1[0]).toFixed(1)+','+(rv[1]+u1[1]).toFixed(1)+' '+(rv[0]+u1[0]+u2[0]).toFixed(1)+','+(rv[1]+u1[1]+u2[1]).toFixed(1)+' '+(rv[0]+u2[0]).toFixed(1)+','+(rv[1]+u2[1]).toFixed(1)+'" fill="none" stroke="'+FIG_INDIGO+'" stroke-width="1.5"/>';
      }
      /* equal-side tick marks (optional list of side indices, mirrors the geometry_2d schema) */
      (fig.equal_sides||[]).forEach(function(si){
        var pts9=[p0,p1,p2],a9=pts9[si%3],b9=pts9[(si+1)%3];
        var mx9=(a9[0]+b9[0])/2,my9=(a9[1]+b9[1])/2;
        var ang9=Math.atan2(b9[1]-a9[1],b9[0]-a9[0]),perp9=ang9+Math.PI/2,t9=5;
        s+='<line x1="'+(mx9+Math.cos(perp9)*t9).toFixed(1)+'" y1="'+(my9+Math.sin(perp9)*t9).toFixed(1)+'" x2="'+(mx9-Math.cos(perp9)*t9).toFixed(1)+'" y2="'+(my9-Math.sin(perp9)*t9).toFixed(1)+'" stroke="'+FIG_INDIGO+'" stroke-width="1.4"/>';
      });
      /* vertex labels */
      var cx3=(p0[0]+p1[0]+p2[0])/3,cy3=(p0[1]+p1[1]+p2[1])/3;
      (fig.labels||[]).forEach(function(lbl,i){
        if(!lbl)return;
        var pt=[p0,p1,p2][i],dx=pt[0]-cx3,dy=pt[1]-cy3,len=Math.sqrt(dx*dx+dy*dy)||1;
        s+='<text x="'+(pt[0]+dx/len*15)+'" y="'+(pt[1]+dy/len*15+4)+'" font-size="12" font-weight="bold" fill="'+FIG_INK+'" text-anchor="middle">'+lbl+'</text>';
      });
      /* side labels */
      (fig.sides||[]).forEach(function(side,i){
        if(!side)return;
        var pts4=[p0,p1,p2],a=pts4[i],b=pts4[(i+1)%3];
        var mx=(a[0]+b[0])/2,my=(a[1]+b[1])/2;
        var dx=b[0]-a[0],dy=b[1]-a[1],len=Math.sqrt(dx*dx+dy*dy)||1;
        var nx=-dy/len*14,ny=dx/len*14;
        s+='<text x="'+(mx+nx).toFixed(1)+'" y="'+(my+ny+3).toFixed(1)+'" font-size="10" fill="'+FIG_AMBER_TEXT+'" text-anchor="middle">'+side+'</text>';
      });
      /* angle arcs with labels */
      (fig.angles||[]).forEach(function(ang,i){
        if(!ang)return;
        var pts5=[p0,p1,p2],rv2=pts5[i];
        var oth1=pts5[(i+1)%3],oth2=pts5[(i+2)%3];
        var v1=[oth1[0]-rv2[0],oth1[1]-rv2[1]],v2=[oth2[0]-rv2[0],oth2[1]-rv2[1]];
        var l1=Math.sqrt(v1[0]*v1[0]+v1[1]*v1[1])||1,l2=Math.sqrt(v2[0]*v2[0]+v2[1]*v2[1])||1;
        var a1=Math.atan2(v1[1],v1[0]),a2=Math.atan2(v2[1],v2[0]);
        var ar=14;
        var sx2=(rv2[0]+ar*Math.cos(a1)).toFixed(1),sy2=(rv2[1]+ar*Math.sin(a1)).toFixed(1);
        var ex2=(rv2[0]+ar*Math.cos(a2)).toFixed(1),ey2=(rv2[1]+ar*Math.sin(a2)).toFixed(1);
        var cross=v1[0]/l1*v2[1]/l2-v1[1]/l1*v2[0]/l2;
        var sweep=cross>0?1:0;
        s+='<path d="M'+sx2+','+sy2+' A'+ar+','+ar+' 0 0,'+sweep+' '+ex2+','+ey2+'" fill="none" stroke="'+FIG_AMBER+'" stroke-width="1.3"/>';
        var diff=a2-a1;while(diff>Math.PI)diff-=2*Math.PI;while(diff<-Math.PI)diff+=2*Math.PI;
        var midA=a1+(cross>0?1:-1)*Math.abs(diff)/2;
        var lx2=(rv2[0]+(ar+9)*Math.cos(midA)).toFixed(1),ly2=(rv2[1]+(ar+9)*Math.sin(midA)+3).toFixed(1);
        s+='<text x="'+lx2+'" y="'+ly2+'" font-size="9" fill="'+FIG_AMBER_TEXT+'" text-anchor="middle">'+ang+'</text>';
      });
      /* a segment DE parallel to the base, D on side v0-v1 and E on v0-v2 —
         drawn at a FIXED schematic parameter (not the real AD/AB ratio,
         which the question usually gives while leaving EC/AE to solve for)
         so the picture illustrates the Triangle Proportionality Theorem
         setup without its own proportions revealing the unknown length. */
      if(fig.cevian_parallel){
        var cpT=fig.cevian_parallel.t!==undefined?fig.cevian_parallel.t:0.55;
        var cpD=[p0[0]+(p1[0]-p0[0])*cpT, p0[1]+(p1[1]-p0[1])*cpT];
        var cpE=[p0[0]+(p2[0]-p0[0])*cpT, p0[1]+(p2[1]-p0[1])*cpT];
        s+='<line x1="'+cpD[0].toFixed(1)+'" y1="'+cpD[1].toFixed(1)+'" x2="'+cpE[0].toFixed(1)+'" y2="'+cpE[1].toFixed(1)+'" stroke="'+FIG_TEAL+'" stroke-width="1.8"/>';
        s+='<circle cx="'+cpD[0].toFixed(1)+'" cy="'+cpD[1].toFixed(1)+'" r="2.6" fill="'+FIG_INK+'"/>';
        s+='<circle cx="'+cpE[0].toFixed(1)+'" cy="'+cpE[1].toFixed(1)+'" r="2.6" fill="'+FIG_INK+'"/>';
        var cpLbl=fig.cevian_parallel.labels||{};
        if(cpLbl.d)s+='<text x="'+cpD[0].toFixed(1)+'" y="'+(cpD[1]+13).toFixed(1)+'" font-size="10" font-weight="bold" fill="'+FIG_INK+'" text-anchor="middle">D</text>';
        if(cpLbl.e)s+='<text x="'+(cpE[0]+11).toFixed(1)+'" y="'+cpE[1].toFixed(1)+'" font-size="10" font-weight="bold" fill="'+FIG_INK+'" text-anchor="middle">E</text>';
        var cpMid=function(a,b){return [(a[0]+b[0])/2,(a[1]+b[1])/2];};
        var cpAD=cpMid(p0,cpD), cpDB=cpMid(cpD,p1), cpAE=cpMid(p0,cpE), cpEC=cpMid(cpE,p2);
        [[cpAD,cpLbl.ad],[cpDB,cpLbl.db],[cpAE,cpLbl.ae],[cpEC,cpLbl.ec]].forEach(function(pr){
          if(!pr[1])return;
          s+='<text x="'+pr[0][0].toFixed(1)+'" y="'+(pr[0][1]-6).toFixed(1)+'" font-size="9" fill="'+FIG_AMBER_TEXT+'" text-anchor="middle">'+pr[1]+'</text>';
        });
      }
    }
    /* ── circle ── */
    /* ── two SIMILAR shapes side by side ──
       Both shapes share one `vertices` list and differ only by `ratio`, so they
       are guaranteed genuinely similar rather than two drawings that merely look
       alike — that similarity IS the mathematical content of these questions.
       Each side carries its own side-labels and caption. */
    else if(fig.type==='similar'){
      var vsim=fig.vertices||[[0,0],[10,0],[0,10]];
      var rt=fig.ratio||0.55, capH=15, padS=16;
      var xsS=vsim.map(function(v){return v[0];}), ysS=vsim.map(function(v){return v[1];});
      var mnx=Math.min.apply(null,xsS), mxx=Math.max.apply(null,xsS);
      var mny=Math.min.apply(null,ysS), mxy=Math.max.apply(null,ysS);
      var bw=(mxx-mnx)||1, bh=(mxy-mny)||1;
      var scS=Math.min((W/2-2*padS)/bw, (H-2*padS-capH)/bh);
      var baseY=H-padS-capH;
      var drawOne=function(cfg,cxc,scale){
        if(!cfg) return '';
        var out='', pts=vsim.map(function(v){
          return [cxc+(v[0]-(mnx+mxx)/2)*scale, baseY-(v[1]-mny)*scale];
        });
        out+='<polygon points="'+pts.map(function(p){return p[0].toFixed(1)+','+p[1].toFixed(1);}).join(' ')+'" fill="'+FIG_INDIGO_FILL+'" stroke="'+FIG_INDIGO+'" stroke-width="2"/>';
        if(fig.right_angle!==undefined&&fig.right_angle!==null){
          var ri=fig.right_angle, v0=pts[ri], vp=pts[(ri+2)%pts.length], vn=pts[(ri+1)%pts.length];
          var n1=[vp[0]-v0[0],vp[1]-v0[1]], n2=[vn[0]-v0[0],vn[1]-v0[1]];
          var l1=Math.hypot(n1[0],n1[1])||1, l2=Math.hypot(n2[0],n2[1])||1, q=8;
          n1=[n1[0]/l1*q,n1[1]/l1*q]; n2=[n2[0]/l2*q,n2[1]/l2*q];
          out+='<polyline points="'+(v0[0]+n1[0]).toFixed(1)+','+(v0[1]+n1[1]).toFixed(1)+' '+(v0[0]+n1[0]+n2[0]).toFixed(1)+','+(v0[1]+n1[1]+n2[1]).toFixed(1)+' '+(v0[0]+n2[0]).toFixed(1)+','+(v0[1]+n2[1]).toFixed(1)+'" fill="none" stroke="'+FIG_INK+'" stroke-width="1.1"/>';
        }
        var cen=[pts.reduce(function(a,p){return a+p[0];},0)/pts.length, pts.reduce(function(a,p){return a+p[1];},0)/pts.length];
        (cfg.sides||[]).forEach(function(sd,i){
          if(!sd) return;
          var a=pts[i], b=pts[(i+1)%pts.length];
          var mx=(a[0]+b[0])/2, my=(a[1]+b[1])/2;
          var ex=b[0]-a[0], ey=b[1]-a[1], el=Math.hypot(ex,ey)||1;
          var nx=-ey/el, ny=ex/el;
          if((mx+nx-cen[0])*nx+(my+ny-cen[1])*ny<0){nx=-nx;ny=-ny;}
          out+='<text x="'+(mx+nx*12).toFixed(1)+'" y="'+(my+ny*12+3).toFixed(1)+'" font-size="10" fill="'+FIG_AMBER_TEXT+'" text-anchor="middle">'+sd+'</text>';
        });
        /* vertex letter labels (e.g. A,B,C on one shape, D,E,F on the other) */
        (cfg.labels||[]).forEach(function(lbl,i){
          if(!lbl) return;
          var pt=pts[i], dx=pt[0]-cen[0], dy=pt[1]-cen[1], len=Math.hypot(dx,dy)||1;
          out+='<text x="'+(pt[0]+dx/len*14).toFixed(1)+'" y="'+(pt[1]+dy/len*14+4).toFixed(1)+'" font-size="10" font-weight="bold" fill="'+FIG_INK+'" text-anchor="middle">'+lbl+'</text>';
        });
        /* vertex angle arcs with a value/expression label (mirrors the `triangle` type's `angles`) */
        (cfg.angles||[]).forEach(function(ang,i){
          if(!ang) return;
          var v0=pts[i], oth1=pts[(i+1)%pts.length], oth2=pts[(i+2)%pts.length];
          var v1=[oth1[0]-v0[0],oth1[1]-v0[1]], v2=[oth2[0]-v0[0],oth2[1]-v0[1]];
          var l1=Math.hypot(v1[0],v1[1])||1, l2=Math.hypot(v2[0],v2[1])||1;
          var a1=Math.atan2(v1[1],v1[0]), a2=Math.atan2(v2[1],v2[0]);
          var ar=11;
          var sx=(v0[0]+ar*Math.cos(a1)).toFixed(1), sy=(v0[1]+ar*Math.sin(a1)).toFixed(1);
          var ex2=(v0[0]+ar*Math.cos(a2)).toFixed(1), ey2=(v0[1]+ar*Math.sin(a2)).toFixed(1);
          var cross=v1[0]/l1*v2[1]/l2-v1[1]/l1*v2[0]/l2, sweep=cross>0?1:0;
          out+='<path d="M'+sx+','+sy+' A'+ar+','+ar+' 0 0,'+sweep+' '+ex2+','+ey2+'" fill="none" stroke="'+FIG_AMBER+'" stroke-width="1.2"/>';
          var diff=a2-a1; while(diff>Math.PI)diff-=2*Math.PI; while(diff<-Math.PI)diff+=2*Math.PI;
          var midA=a1+(cross>0?1:-1)*Math.abs(diff)/2;
          var lx=(v0[0]+(ar+10)*Math.cos(midA)).toFixed(1), ly=(v0[1]+(ar+10)*Math.sin(midA)+3).toFixed(1);
          out+='<text x="'+lx+'" y="'+ly+'" font-size="9" fill="'+FIG_AMBER_TEXT+'" text-anchor="middle">'+ang+'</text>';
        });
        /* congruence tick marks — a side/angle carries n perpendicular ticks (or
           n stacked arcs) so a matching count on BOTH shapes shows which parts
           were given congruent; since both shapes share the same `vertices`
           list, index i means the same side/vertex on each, so one fig-level
           list applied identically to both draws is exactly the correspondence
           marking a congruence-postulate figure needs. */
        (fig.tick_sides||[]).forEach(function(ts){
          var i=ts.i, n=ts.n||1;
          var a=pts[i%pts.length], b=pts[(i+1)%pts.length];
          var ex=b[0]-a[0], ey=b[1]-a[1], el=Math.hypot(ex,ey)||1;
          var ux=ex/el, uy=ey/el, px=-uy, py=ux;
          for(var k=0;k<n;k++){
            var t=0.5+(k-(n-1)/2)*0.11;
            var tx=a[0]+ex*t, ty=a[1]+ey*t;
            out+='<line x1="'+(tx-px*5).toFixed(1)+'" y1="'+(ty-py*5).toFixed(1)+'" x2="'+(tx+px*5).toFixed(1)+'" y2="'+(ty+py*5).toFixed(1)+'" stroke="'+FIG_INDIGO+'" stroke-width="1.6"/>';
          }
        });
        (fig.tick_angles||[]).forEach(function(ta){
          var i=ta.i, n=ta.n||1;
          var v0=pts[i%pts.length], oth1=pts[(i+1)%pts.length], oth2=pts[(i+2)%pts.length];
          var v1=[oth1[0]-v0[0],oth1[1]-v0[1]], v2=[oth2[0]-v0[0],oth2[1]-v0[1]];
          var l1=Math.hypot(v1[0],v1[1])||1, l2=Math.hypot(v2[0],v2[1])||1;
          var a1=Math.atan2(v1[1],v1[0]), a2=Math.atan2(v2[1],v2[0]);
          var cross=v1[0]/l1*v2[1]/l2-v1[1]/l1*v2[0]/l2, sweep=cross>0?1:0;
          for(var k2=0;k2<n;k2++){
            var ar2=8+k2*4;
            var sx2=(v0[0]+ar2*Math.cos(a1)).toFixed(1), sy2=(v0[1]+ar2*Math.sin(a1)).toFixed(1);
            var ex3=(v0[0]+ar2*Math.cos(a2)).toFixed(1), ey3=(v0[1]+ar2*Math.sin(a2)).toFixed(1);
            out+='<path d="M'+sx2+','+sy2+' A'+ar2+','+ar2+' 0 0,'+sweep+' '+ex3+','+ey3+'" fill="none" stroke="'+FIG_AMBER+'" stroke-width="1.3"/>';
          }
        });
        if(cfg.caption) out+='<text x="'+cxc.toFixed(1)+'" y="'+(H-3)+'" font-size="10" fill="'+FIG_MUTED+'" text-anchor="middle">'+cfg.caption+'</text>';
        return out;
      };
      s+=drawOne(fig.left, W*0.26, scS*rt);
      s+=drawOne(fig.right, W*0.74, scS);
      if(fig.tilde) s+='<text x="'+(W/2)+'" y="'+(baseY-8)+'" font-size="13" fill="'+FIG_MUTED+'" text-anchor="middle">~</text>';
      s+='</svg>';
      return s;
    }
    /* ── a single-vertex angle relationship: vertical / linear pair / complementary ──
       These are GEOMETRIC FACTS independent of the specific numbers (vertical
       angles are ALWAYS equal by position, a linear pair ALWAYS sums to 180 by
       construction, a complementary split ALWAYS sums to 90 by construction) —
       so a fixed, arbitrary split is truthful for ANY labels, including
       algebraic expressions whose numeric value isn't known until solved. */
    else if(fig.type==='vertex_angles'){
      var vaCx=W/2, vaCy=fig.mode==='complementary'?H*0.82:H/2, vaLen=Math.min(W,H)*0.42;
      var lbv=fig.labels||{};
      /* a line through the centre spanning direction ang1 to direction ang2
         (each endpoint independently placed by the standard polar formula —
         both must use the SAME sign convention or the two ends don't align
         into one straight line through the centre). */
      var vaLine=function(ang1,ang2,col,dash){
        var a1=ang1*Math.PI/180, a2=ang2*Math.PI/180;
        s+='<line x1="'+(vaCx+vaLen*Math.cos(a1)).toFixed(1)+'" y1="'+(vaCy-vaLen*Math.sin(a1)).toFixed(1)+'" x2="'+(vaCx+vaLen*Math.cos(a2)).toFixed(1)+'" y2="'+(vaCy-vaLen*Math.sin(a2)).toFixed(1)+'" stroke="'+(col||FIG_INDIGO)+'" stroke-width="2"'+(dash?' stroke-dasharray="5,3"':'')+'/>';
      };
      var vaLabel=function(midDeg,key,rad){
        if(!lbv[key])return;
        var t=midDeg*Math.PI/180, lx=vaCx+(rad||30)*Math.cos(t), ly=vaCy-(rad||30)*Math.sin(t);
        s+='<text x="'+lx.toFixed(1)+'" y="'+ly.toFixed(1)+'" font-size="10" fill="'+FIG_AMBER_TEXT+'" text-anchor="middle" dominant-baseline="middle" font-weight="600">'+lbv[key]+'</text>';
      };
      if(fig.mode==='vertical'){
        var sl=fig.slant!==undefined?fig.slant:32;
        vaLine(180,0);                                    /* first line, full width, horizontal */
        vaLine(180+sl,sl);                                /* second line through the same centre, slanted */
        s+='<circle cx="'+vaCx+'" cy="'+vaCy+'" r="2.5" fill="'+FIG_INK+'"/>';
        vaLabel(sl/2,'1',26); vaLabel(180+sl/2,'2',26);     /* top / bottom wedge = a true vertical pair */
        vaLabel(90+sl/2,'3',26); vaLabel(270+sl/2,'4',26);  /* the other (also vertical) pair, if labelled */
      } else if(fig.mode==='linear'){
        var sl2=fig.slant!==undefined?fig.slant:55;
        vaLine(180,0);                                    /* the straight line, full width */
        var a3=sl2*Math.PI/180;
        s+='<line x1="'+vaCx.toFixed(1)+'" y1="'+vaCy.toFixed(1)+'" x2="'+(vaCx+vaLen*0.85*Math.cos(a3)).toFixed(1)+'" y2="'+(vaCy-vaLen*0.85*Math.sin(a3)).toFixed(1)+'" stroke="'+FIG_INDIGO+'" stroke-width="2"/>';
        s+='<circle cx="'+vaCx+'" cy="'+vaCy+'" r="2.5" fill="'+FIG_INK+'"/>';
        vaLabel(sl2/2,'1',24);            /* wedge from 0 to sl2 */
        vaLabel((sl2+180)/2,'2',24);      /* wedge from sl2 to 180 — the two always sum to 180 */
      } else { /* complementary: a right-angle corner (tick-marked) split into two */
        s+='<line x1="'+(vaCx-vaLen*0.85).toFixed(1)+'" y1="'+vaCy.toFixed(1)+'" x2="'+vaCx.toFixed(1)+'" y2="'+vaCy.toFixed(1)+'" stroke="'+FIG_INDIGO+'" stroke-width="2"/>';
        s+='<line x1="'+vaCx.toFixed(1)+'" y1="'+vaCy.toFixed(1)+'" x2="'+vaCx.toFixed(1)+'" y2="'+(vaCy-vaLen*0.85).toFixed(1)+'" stroke="'+FIG_INDIGO+'" stroke-width="2"/>';
        var sl4=fig.slant!==undefined?fig.slant:38, a4=sl4*Math.PI/180;
        s+='<line x1="'+vaCx.toFixed(1)+'" y1="'+vaCy.toFixed(1)+'" x2="'+(vaCx+vaLen*0.7*Math.cos(a4)).toFixed(1)+'" y2="'+(vaCy-vaLen*0.7*Math.sin(a4)).toFixed(1)+'" stroke="'+FIG_INDIGO2+'" stroke-width="1.8"/>';
        s+='<rect x="'+(vaCx-9).toFixed(1)+'" y="'+(vaCy-9).toFixed(1)+'" width="9" height="9" fill="none" stroke="'+FIG_INK+'" stroke-width="1"/>';
        s+='<circle cx="'+vaCx+'" cy="'+vaCy+'" r="2.5" fill="'+FIG_INK+'"/>';
        vaLabel(sl4/2,'1',22);            /* wedge from 0 to sl4 */
        vaLabel((sl4+90)/2,'2',22);       /* wedge from sl4 to 90 — the two always sum to 90 */
      }
      s+='</svg>';
      return s;
    }
    /* ── two parallel lines cut by a transversal ──
       Angles use the standard textbook numbering: 1-4 at the upper
       intersection, 5-8 at the lower, each as upper-left, upper-right,
       lower-left, lower-right. Label positions are computed from the actual
       region BISECTORS rather than fixed offsets, so a label always lands
       inside its own wedge whatever the transversal's slant. */
    else if(fig.type==='transversal'){
      var tAng=fig.angle||72, yA=62, yB=146, mL=22;
      var tdy=yB-yA, tdx=tdy/Math.tan(tAng*Math.PI/180);
      var IA=[W/2-tdx/2, yA], IB=[W/2+tdx/2, yB];
      var tlen=Math.sqrt(tdx*tdx+tdy*tdy), ux=tdx/tlen, uy=tdy/tlen, ext=30;
      /* the two parallel lines */
      [yA,yB].forEach(function(yy){
        s+='<line x1="'+mL+'" y1="'+yy+'" x2="'+(W-mL)+'" y2="'+yy+'" stroke="'+FIG_INDIGO+'" stroke-width="2"/>';
        /* matching chevrons = the standard "these are parallel" mark */
        var mx=W-mL-30;
        s+='<polyline points="'+(mx-5)+','+(yy-5)+' '+mx+','+yy+' '+(mx-5)+','+(yy+5)+'" fill="none" stroke="'+FIG_INDIGO+'" stroke-width="1.6"/>';
      });
      /* the transversal */
      s+='<line x1="'+(IA[0]-ux*ext).toFixed(1)+'" y1="'+(IA[1]-uy*ext).toFixed(1)+'" x2="'+(IB[0]+ux*ext).toFixed(1)+'" y2="'+(IB[1]+uy*ext).toFixed(1)+'" stroke="'+FIG_TEAL+'" stroke-width="2"/>';
      var _bis=function(a,b){var n=[a[0]+b[0],a[1]+b[1]],m=Math.sqrt(n[0]*n[0]+n[1]*n[1])||1;return [n[0]/m,n[1]/m];};
      var L=[-1,0], R=[1,0], U=[-ux,-uy], D=[ux,uy];
      var dirs={UL:_bis(L,U), UR:_bis(U,R), LR:_bis(R,D), LL:_bis(D,L)};
      var slot={1:['UL',IA],2:['UR',IA],3:['LL',IA],4:['LR',IA],
                5:['UL',IB],6:['UR',IB],7:['LL',IB],8:['LR',IB]};
      var lbs=fig.labels||{};
      Object.keys(lbs).forEach(function(k){
        var sl=slot[k]; if(!sl) return;
        var dv=dirs[sl[0]], base=sl[1], rad=fig.lrad||26;
        var hot=(fig.highlight||[]).indexOf(+k)>=0;
        s+='<text x="'+(base[0]+dv[0]*rad).toFixed(1)+'" y="'+(base[1]+dv[1]*rad).toFixed(1)+'" font-size="10" fill="'+(hot?FIG_AMBER_TEXT:FIG_INK)+'" text-anchor="middle" dominant-baseline="middle" font-weight="'+(hot?'700':'400')+'">'+lbs[k]+'</text>';
      });
      s+='</svg>';
      return s;
    }
    else if(fig.type==='circle'){
      /* external-point secant figures need extra room BELOW the circle for the
         external point, so they're anchored high rather than dead-centre. */
      var cx4=W/2,cy4=fig.secant_lines?Math.min(H-40,110):H/2;
      /* when the external point is very far from the circle (large `r`
         multiplier), shrink the circle itself to fit rather than letting the
         point run off the canvas — better a smaller circle than a truncated
         construction. */
      var r=fig.secant_lines?Math.min(Math.min(W,H)/2-30,(H-cy4-24)/(+fig.secant_lines.r)):Math.min(W,H)/2-30;
      /* polar helper: math-convention angles (CCW, 0deg = east) mapped onto the
         SVG's y-down screen space. Because y is flipped, an INCREASING math
         angle sweeps counter-clockwise on screen, which is SVG sweep-flag 0. */
      var _pol=function(a,rad){var t=a*Math.PI/180;return [cx4+(rad===undefined?r:rad)*Math.cos(t), cy4-(rad===undefined?r:rad)*Math.sin(t)];};
      var _span=function(a1,a2){return ((a2-a1)%360+360)%360;};
      /* concentric rings — geometric-probability targets (dartboard, annulus).
         Radii are scaled so the LARGEST maps to the canvas circle, preserving
         their true ratio, which is exactly what the area comparison turns on.
         Drawn largest-first so inner rings layer on top; an inner ring filled
         'base' over an 'amber' one leaves a visible amber annulus between them. */
      if(fig.rings&&fig.rings.length){
        var rmaxR=Math.max.apply(null,fig.rings.map(function(x){return +x.r;}))||1;
        fig.rings.slice().sort(function(a,b){return (+b.r)-(+a.r);}).forEach(function(rg,ri){
          var rr=r*(+rg.r)/rmaxR;
          var fc=rg.fill==='amber'?FIG_AMBER_FILL:(rg.fill==='base'?FIG_INDIGO_FILL:(ri===0?FIG_INDIGO_FILL:'none'));
          s+='<circle cx="'+cx4+'" cy="'+cy4+'" r="'+rr.toFixed(1)+'" fill="'+fc+'" stroke="'+FIG_INDIGO+'" stroke-width="1.7"/>';
          if(rg.label) s+='<text x="'+cx4+'" y="'+(cy4-rr-4).toFixed(1)+'" font-size="10" fill="'+FIG_INDIGO+'" text-anchor="middle" font-weight="600">'+rg.label+'</text>';
        });
      }
      else s+='<circle cx="'+cx4+'" cy="'+cy4+'" r="'+r+'" fill="'+FIG_INDIGO_FILL+'" stroke="'+FIG_INDIGO+'" stroke-width="2"/>';
      /* sector wedge (central angle) */
      if(fig.sector){
        var sa=+fig.sector.start_deg||0, sb=(fig.sector.end_deg===undefined?90:+fig.sector.end_deg);
        var sp=_span(sa,sb), pA=_pol(sa), pB=_pol(sb), lg=sp>180?1:0;
        s+='<path d="M'+cx4+','+cy4+' L'+pA[0].toFixed(1)+','+pA[1].toFixed(1)+' A'+r+','+r+' 0 '+lg+' 0 '+pB[0].toFixed(1)+','+pB[1].toFixed(1)+' Z" fill="'+FIG_AMBER_FILL+'" stroke="'+FIG_AMBER+'" stroke-width="1.6"/>';
        if(fig.sector.label){var lm=_pol(sa+sp/2, r*0.52);s+='<text x="'+lm[0].toFixed(1)+'" y="'+lm[1].toFixed(1)+'" font-size="11" fill="'+FIG_AMBER_TEXT+'" text-anchor="middle" dominant-baseline="middle" font-weight="600">'+fig.sector.label+'</text>';}
      }
      /* highlighted arc(s) — accepts one {start_deg,end_deg,label} or an array */
      [].concat(fig.arc||[]).forEach(function(ac){
        var aa=+ac.start_deg||0, ab=(ac.end_deg===undefined?90:+ac.end_deg);
        var asp=_span(aa,ab), qA=_pol(aa), qB=_pol(ab), alg=asp>180?1:0;
        s+='<path d="M'+qA[0].toFixed(1)+','+qA[1].toFixed(1)+' A'+r+','+r+' 0 '+alg+' 0 '+qB[0].toFixed(1)+','+qB[1].toFixed(1)+'" fill="none" stroke="'+(ac.color||FIG_AMBER)+'" stroke-width="3.6" stroke-linecap="round"/>';
        if(ac.label){var am=_pol(aa+asp/2, r+14);s+='<text x="'+am[0].toFixed(1)+'" y="'+am[1].toFixed(1)+'" font-size="10" fill="'+(ac.color||FIG_AMBER_TEXT)+'" text-anchor="middle" dominant-baseline="middle">'+ac.label+'</text>';}
      });
      /* chords: [[a1,a2],...] — several chords (e.g. an inscribed angle's two rays) */
      (fig.chords||[]).forEach(function(cd){
        var c1=_pol(+cd[0]),c2=_pol(+cd[1]);
        s+='<line x1="'+c1[0].toFixed(1)+'" y1="'+c1[1].toFixed(1)+'" x2="'+c2[0].toFixed(1)+'" y2="'+c2[1].toFixed(1)+'" stroke="'+FIG_INDIGO2+'" stroke-width="1.8"/>';
      });
      /* two crossing chords with their four sub-segments labelled — the
         intersecting-chords length relation (AX*XC = BX*XD). Chord AC crosses
         chord BD at their real geometric intersection X; each half is labelled.*/
      if(fig.chord_segs){
        var cs=fig.chord_segs, A=_pol(+cs.c1[0]),C=_pol(+cs.c1[1]),B=_pol(+cs.c2[0]),D=_pol(+cs.c2[1]);
        /* intersection X of segment AC with segment BD */
        var d1x=C[0]-A[0],d1y=C[1]-A[1],d2x=D[0]-B[0],d2y=D[1]-B[1];
        var den=d1x*d2y-d1y*d2x, tX=den?((B[0]-A[0])*d2y-(B[1]-A[1])*d2x)/den:0.5;
        var X=[A[0]+tX*d1x, A[1]+tX*d1y];
        [[A,C],[B,D]].forEach(function(pr){
          s+='<line x1="'+pr[0][0].toFixed(1)+'" y1="'+pr[0][1].toFixed(1)+'" x2="'+pr[1][0].toFixed(1)+'" y2="'+pr[1][1].toFixed(1)+'" stroke="'+FIG_INDIGO2+'" stroke-width="1.8"/>';
        });
        s+='<circle cx="'+X[0].toFixed(1)+'" cy="'+X[1].toFixed(1)+'" r="2.5" fill="'+FIG_INK+'"/>';
        var lbl=cs.labels||{};
        [['a',A],['c',C],['b',B],['d',D]].forEach(function(pl){
          if(!lbl[pl[0]])return;
          var m=[(pl[1][0]+X[0])/2,(pl[1][1]+X[1])/2];   /* midpoint of the half-chord */
          var ox=(m[0]-cx4), oy=(m[1]-cy4), ol=Math.sqrt(ox*ox+oy*oy)||1;
          s+='<text x="'+(m[0]+ox/ol*9).toFixed(1)+'" y="'+(m[1]+oy/ol*9+3).toFixed(1)+'" font-size="10" fill="'+FIG_AMBER_TEXT+'" text-anchor="middle">'+lbl[pl[0]]+'</text>';
        });
      }
      /* labelled points ON the circle */
      (fig.points||[]).forEach(function(p){
        var pp=_pol(+p.angle);
        s+='<circle cx="'+pp[0].toFixed(1)+'" cy="'+pp[1].toFixed(1)+'" r="3.4" fill="'+FIG_INK+'"/>';
        if(p.label){var lp=_pol(+p.angle, r+13);s+='<text x="'+lp[0].toFixed(1)+'" y="'+lp[1].toFixed(1)+'" font-size="10" fill="'+FIG_INK+'" text-anchor="middle" dominant-baseline="middle" font-weight="600">'+p.label+'</text>';}
      });
      /* two secants from a real external point — 'through' gives the exact FAR
         intersection angle of each secant; the NEAR intersection lies on the
         same ray by construction (the point's distance r*rmult and the two
         through-angles come from solving the actual two-secant geometry in
         the enrichment script, not placed independently — that's what makes
         this truthful where the earlier, reverted `secant` type wasn't). */
      if(fig.secant_lines){
        var slx=fig.secant_lines, spR=r*(+slx.r), pAng=270*Math.PI/180;
        var pXY=[cx4+spR*Math.cos(pAng), cy4-spR*Math.sin(pAng)];
        s+='<circle cx="'+pXY[0].toFixed(1)+'" cy="'+pXY[1].toFixed(1)+'" r="3" fill="'+FIG_INK+'"/>';
        if(slx.label)s+='<text x="'+pXY[0].toFixed(1)+'" y="'+(pXY[1]+16).toFixed(1)+'" font-size="10" fill="'+FIG_INK+'" text-anchor="middle">'+slx.label+'</text>';
        (slx.through||[]).forEach(function(fa){
          var fp=_pol(+fa);
          s+='<line x1="'+pXY[0].toFixed(1)+'" y1="'+pXY[1].toFixed(1)+'" x2="'+fp[0].toFixed(1)+'" y2="'+fp[1].toFixed(1)+'" stroke="'+FIG_INDIGO+'" stroke-width="1.6" stroke-dasharray="5,3"/>';
        });
      }
      if(fig.center){s+='<circle cx="'+cx4+'" cy="'+cy4+'" r="3" fill="'+FIG_INDIGO+'"/>';s+='<text x="'+(cx4+7)+'" y="'+(cy4-6)+'" font-size="11" fill="'+FIG_INK+'">'+fig.center+'</text>';}
      if(fig.radius){s+='<line x1="'+cx4+'" y1="'+cy4+'" x2="'+(cx4+r)+'" y2="'+cy4+'" stroke="'+FIG_AMBER+'" stroke-width="1.8" stroke-dasharray="5,3"/>';s+='<text x="'+(cx4+r/2)+'" y="'+(cy4-8)+'" font-size="11" fill="'+FIG_AMBER_TEXT+'" text-anchor="middle">'+fig.radius+'</text>';}
      if(fig.diameter){s+='<line x1="'+(cx4-r)+'" y1="'+cy4+'" x2="'+(cx4+r)+'" y2="'+cy4+'" stroke="'+FIG_INDIGO2+'" stroke-width="1.8" stroke-dasharray="5,3"/>';s+='<text x="'+cx4+'" y="'+(cy4-10)+'" font-size="11" fill="'+FIG_INDIGO2+'" text-anchor="middle">'+fig.diameter+'</text>';}
      if(fig.chord){var ca=fig.chord;s+='<line x1="'+(cx4+r*Math.cos(ca[0]*Math.PI/180))+'" y1="'+(cy4-r*Math.sin(ca[0]*Math.PI/180))+'" x2="'+(cx4+r*Math.cos(ca[1]*Math.PI/180))+'" y2="'+(cy4-r*Math.sin(ca[1]*Math.PI/180))+'" stroke="'+FIG_TEAL+'" stroke-width="1.8"/>';}
      if(fig.label)s+='<text x="'+cx4+'" y="'+(cy4+r+18)+'" font-size="11" fill="'+FIG_MUTED+'" text-anchor="middle">'+fig.label+'</text>';
    }
    /* ── bar chart ── */
    else if(fig.type==='bar'){
      var data=fig.data||[],maxv=Math.max.apply(null,data.map(function(d){return d.val||0;}));
      var padL=38,padB=32,padT=12,padR=8,bw=(W-padL-padR)/data.length,barMaxH=H-padT-padB;
      /* y-axis */
      s+='<line x1="'+padL+'" y1="'+padT+'" x2="'+padL+'" y2="'+(H-padB)+'" stroke="'+FIG_INK+'" stroke-width="1.5"/>';
      s+='<line x1="'+padL+'" y1="'+(H-padB)+'" x2="'+(W-padR)+'" y2="'+(H-padB)+'" stroke="'+FIG_INK+'" stroke-width="1.5"/>';
      /* y grid & labels */
      var ySteps=4;
      for(var ys=0;ys<=ySteps;ys++){var yv=maxv*ys/ySteps,yp=H-padB-(yv/maxv*barMaxH);s+='<line x1="'+(padL-3)+'" y1="'+yp+'" x2="'+(W-padR)+'" y2="'+yp+'" stroke="'+(ys===0?FIG_INK:FIG_GRID)+'" stroke-width="'+(ys===0?'1.5':'0.5')+'"/>';s+='<text x="'+(padL-6)+'" y="'+(yp+3)+'" font-size="8" fill="'+FIG_MUTED+'" text-anchor="end">'+Math.round(yv)+'</text>';}
      data.forEach(function(d,i){
        var bh=(d.val/maxv)*barMaxH,bx=padL+i*bw+bw*0.12,by=H-padB-bh;
        s+='<rect x="'+bx+'" y="'+by+'" width="'+(bw*0.76).toFixed(1)+'" height="'+bh.toFixed(1)+'" fill="'+(d.color||FIG_SERIES[i%FIG_SERIES.length])+'" rx="2" opacity="0.92"/>';
        s+='<text x="'+(padL+(i+0.5)*bw).toFixed(1)+'" y="'+(H-padB+12)+'" font-size="9" fill="'+FIG_INK+'" text-anchor="middle">'+d.label+'</text>';
        s+='<text x="'+(bx+(bw*0.38)).toFixed(1)+'" y="'+(by-4)+'" font-size="8" fill="'+FIG_INK+'" text-anchor="middle">'+d.val+'</text>';
      });
      if(fig.ylabel)s+='<text x="12" y="'+(H/2)+'" font-size="9" fill="'+FIG_MUTED+'" text-anchor="middle" transform="rotate(-90 12,'+(H/2)+')">'+fig.ylabel+'</text>';
      if(fig.title)s+='<text x="'+(W/2)+'" y="'+(padT+8)+'" font-size="10" fill="'+FIG_INK+'" text-anchor="middle" font-weight="bold">'+fig.title+'</text>';
    }
    /* ── a grid of dots (marbles/objects in a bag) — `groups` are drawn in
       order so the FIRST `groups[0].n` dots are colored group 0, etc.; this
       is a literal restatement of counts already given in the question text
       (e.g. "18 marbles, 12 red"), not a new computation, so it never
       spoils a probability-from-counts answer. ── */
    else if(fig.type==='dots'){
      var totalD=fig.total||0, groupsD=fig.groups||[];
      var hD=fig.label?H-20:H;
      var colsD=Math.ceil(Math.sqrt(totalD*(W/hD)))||1, rowsD=Math.ceil(totalD/colsD);
      var padD=28, cellW=(W-2*padD)/colsD, cellH=(hD-2*padD)/rowsD, rD=Math.min(cellW,cellH)*0.34;
      if(fig.bag){
        s+='<rect x="'+(padD*0.4)+'" y="'+(padD*0.5)+'" width="'+(W-padD*0.8)+'" height="'+(hD-padD*0.8)+'" rx="16" fill="none" stroke="'+FIG_MUTED+'" stroke-width="1.5" stroke-dasharray="4,3"/>';
      }
      var idxD=0, seqColor=[];
      groupsD.forEach(function(g){for(var k=0;k<g.n;k++)seqColor.push(g.color||FIG_INDIGO2);});
      for(var i=0;i<totalD;i++){
        var col=i%colsD, row=Math.floor(i/colsD);
        var cx=padD+cellW*(col+0.5), cy=padD+cellH*(row+0.5);
        s+='<circle cx="'+cx.toFixed(1)+'" cy="'+cy.toFixed(1)+'" r="'+rD.toFixed(1)+'" fill="'+(seqColor[i]||FIG_GRID)+'" stroke="'+FIG_INK+'" stroke-width="0.8"/>';
      }
      if(fig.label)s+='<text x="'+(W/2)+'" y="'+(H-6)+'" font-size="10" fill="'+FIG_MUTED+'" text-anchor="middle">'+fig.label+'</text>';
    }
    /* ── two-circle Venn diagram, GENERIC fixed overlap (not scaled to the
       real P(A and B)) — for independent-event problems where the whole
       point is applying a rule (P(A)*P(B) or P(A)+P(B)-P(A and B)) rather
       than reading an answer off the picture; drawing the true overlap area
       would visually pre-compute the intersection, so like `vertex_angles`
       the fixed shape carries no numeric truth, only the labels do. ── */
    else if(fig.type==='venn'){
      var vcx=W/2, vcy=H/2, vr=Math.min(W,H)*0.28, voff=vr*0.62;
      s+='<circle cx="'+(vcx-voff)+'" cy="'+vcy+'" r="'+vr+'" fill="'+FIG_INDIGO_FILL2+'" stroke="'+FIG_INDIGO+'" stroke-width="2"/>';
      s+='<circle cx="'+(vcx+voff)+'" cy="'+vcy+'" r="'+vr+'" fill="'+FIG_AMBER_FILL+'" stroke="'+FIG_AMBER+'" stroke-width="2"/>';
      s+='<text x="'+(vcx-voff-vr*0.55).toFixed(1)+'" y="'+(vcy-vr*0.55).toFixed(1)+'" font-size="12" font-weight="bold" fill="'+FIG_INDIGO+'" text-anchor="middle">A</text>';
      s+='<text x="'+(vcx+voff+vr*0.55).toFixed(1)+'" y="'+(vcy-vr*0.55).toFixed(1)+'" font-size="12" font-weight="bold" fill="'+FIG_AMBER_TEXT+'" text-anchor="middle">B</text>';
      if(fig.textA)s+='<text x="'+(vcx-voff-vr*0.3).toFixed(1)+'" y="'+(vcy+4).toFixed(1)+'" font-size="10" fill="'+FIG_INK+'" text-anchor="middle">'+fig.textA+'</text>';
      if(fig.textB)s+='<text x="'+(vcx+voff+vr*0.3).toFixed(1)+'" y="'+(vcy+4).toFixed(1)+'" font-size="10" fill="'+FIG_INK+'" text-anchor="middle">'+fig.textB+'</text>';
      if(fig.title)s+='<text x="'+(W/2)+'" y="16" font-size="10" fill="'+FIG_MUTED+'" text-anchor="middle">'+fig.title+'</text>';
    }
    /* ── scatter plot ── */
    else if(fig.type==='scatter'){
      var pts6=fig.pts||[],padS=38;
      var xs=pts6.map(function(p){return p[0];}),ys=pts6.map(function(p){return p[1];});
      var xmin=Math.min.apply(null,xs),xmax=Math.max.apply(null,xs),ymin=Math.min.apply(null,ys),ymax=Math.max.apply(null,ys);
      var xpad=(xmax-xmin)*0.1||1,ypad=(ymax-ymin)*0.1||1;
      xmin-=xpad;xmax+=xpad;ymin-=ypad;ymax+=ypad;
      var scx2=(W-2*padS)/(xmax-xmin),scy2=(H-2*padS)/(ymax-ymin);
      s+='<line x1="'+padS+'" y1="'+(H-padS)+'" x2="'+(W-padS)+'" y2="'+(H-padS)+'" stroke="'+FIG_INK+'" stroke-width="1.5"/>';
      s+='<line x1="'+padS+'" y1="'+padS+'" x2="'+padS+'" y2="'+(H-padS)+'" stroke="'+FIG_INK+'" stroke-width="1.5"/>';
      pts6.forEach(function(p){var px=(p[0]-xmin)*scx2+padS,py=H-padS-(p[1]-ymin)*scy2;s+='<circle cx="'+px.toFixed(1)+'" cy="'+py.toFixed(1)+'" r="4" fill="'+(fig.color||FIG_INDIGO2)+'" opacity="0.8"/>';});
      if(fig.line){var lx1=xmin,ly1=fig.line.m*lx1+fig.line.b,lx2=xmax,ly2=fig.line.m*lx2+fig.line.b;var spx1=(lx1-xmin)*scx2+padS,spy1=H-padS-(ly1-ymin)*scy2,spx2=(lx2-xmin)*scx2+padS,spy2=H-padS-(ly2-ymin)*scy2;s+='<line x1="'+spx1+'" y1="'+spy1+'" x2="'+spx2+'" y2="'+spy2+'" stroke="'+FIG_AMBER+'" stroke-width="1.5" stroke-dasharray="5,3"/>';}
      if(fig.xlabel)s+='<text x="'+(W/2)+'" y="'+(H-padS+20)+'" font-size="9" fill="'+FIG_MUTED+'" text-anchor="middle">'+fig.xlabel+'</text>';
      if(fig.ylabel)s+='<text x="12" y="'+(H/2)+'" font-size="9" fill="'+FIG_MUTED+'" text-anchor="middle" transform="rotate(-90 12,'+(H/2)+')">'+fig.ylabel+'</text>';
    }
    /* ── number line ── */
    else if(fig.type==='numberline'){
      var nl=fig.range||[-5,5],padN=30;
      var nlW=W-2*padN,scnl=nlW/(nl[1]-nl[0]);
      var my=H/2;
      s+='<line x1="'+padN+'" y1="'+my+'" x2="'+(W-padN)+'" y2="'+my+'" stroke="'+FIG_INK+'" stroke-width="2"/>';
      /* shaded sub-intervals (favourable region for a length-probability question) */
      (fig.shade||[]).forEach(function(sh){
        var a=padN+(sh[0]-nl[0])*scnl, b=padN+(sh[1]-nl[0])*scnl;
        s+='<line x1="'+a.toFixed(1)+'" y1="'+my+'" x2="'+b.toFixed(1)+'" y2="'+my+'" stroke="'+FIG_AMBER+'" stroke-width="7" stroke-linecap="butt" opacity="0.9"/>';
      });
      for(var ni=Math.ceil(nl[0]);ni<=nl[1];ni++){var npx=padN+(ni-nl[0])*scnl;s+='<line x1="'+npx+'" y1="'+(my-6)+'" x2="'+npx+'" y2="'+(my+6)+'" stroke="'+FIG_INK+'" stroke-width="1.5"/>';s+='<text x="'+npx+'" y="'+(my+18)+'" font-size="10" fill="'+FIG_INK+'" text-anchor="middle">'+ni+'</text>';}
      (fig.points||[]).forEach(function(p){var px=padN+(p.x-nl[0])*scnl;s+='<circle cx="'+px+'" cy="'+my+'" r="6" fill="'+(p.open?'#fff':(p.color||FIG_AMBER))+'" stroke="'+(p.color||FIG_AMBER)+'" stroke-width="2"/>';if(p.label)s+='<text x="'+px+'" y="'+(my-14)+'" font-size="10" fill="'+(p.color||FIG_AMBER_TEXT)+'" text-anchor="middle">'+p.label+'</text>';});
      (fig.arrows||[]).forEach(function(a){var ax1=padN+(a.x1-nl[0])*scnl,ax2=padN+(a.x2-nl[0])*scnl;var col=a.color||FIG_INDIGO2;s+='<line x1="'+ax1+'" y1="'+my+'" x2="'+ax2+'" y2="'+my+'" stroke="'+col+'" stroke-width="3" marker-end="url(#nlarr'+a.x2+')"/><defs><marker id="nlarr'+a.x2+'" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="'+col+'"/></marker></defs>';});
    }
    /* ── rectangle / polygon ── */
    else if(fig.type==='rect'||fig.type==='polygon'){
      var verts2=fig.vertices||[[0,0],[fig.w2||4,0],[fig.w2||4,fig.h2||3],[0,fig.h2||3]];
      var padP=30;
      /* if a semicircle is attached, its outward bulge must be included in the
         bbox BEFORE scaling, or it overflows the canvas edge on any side that
         isn't already the polygon's own widest extent (e.g. a wide, short
         rectangle with the semicircle on its narrow end). */
      var bboxSrc=verts2;
      if(fig.semicircle){
        var scI=fig.semicircle.side||0, scN=verts2.length;
        var scA=verts2[scI], scB=verts2[(scI+1)%scN];
        var scDx=scB[0]-scA[0], scDy=scB[1]-scA[1], scLen=Math.sqrt(scDx*scDx+scDy*scDy)||1, scRad=scLen/2;
        var scMx=(scA[0]+scB[0])/2, scMy=(scA[1]+scB[1])/2;
        var scCent=verts2.reduce(function(a,v){return [a[0]+v[0],a[1]+v[1]];},[0,0]);
        scCent=[scCent[0]/scN, scCent[1]/scN];
        var scNx=-scDy/scLen, scNy=scDx/scLen;
        if((scMx+scNx-scCent[0])*scNx+(scMy+scNy-scCent[1])*scNy<0){scNx=-scNx;scNy=-scNy;}
        bboxSrc=verts2.concat([[scMx+scNx*scRad, scMy+scNy*scRad]]);
      }
      var minxP=Math.min.apply(null,bboxSrc.map(function(v){return v[0];})),maxxP=Math.max.apply(null,bboxSrc.map(function(v){return v[0];}));
      var minyP=Math.min.apply(null,bboxSrc.map(function(v){return v[1];})),maxyP=Math.max.apply(null,bboxSrc.map(function(v){return v[1];}));
      var scP=Math.min((W-2*padP)/(maxxP-minxP||1),(H-2*padP)/(maxyP-minyP||1));
      var toSP=function(v){return [(v[0]-minxP)*scP+padP,H-(v[1]-minyP)*scP-padP];};
      var ptsP=verts2.map(function(v){var sv=toSP(v);return sv[0]+','+sv[1];}).join(' ');
      s+='<polygon points="'+ptsP+'" fill="'+FIG_INDIGO_FILL+'" stroke="'+FIG_INDIGO+'" stroke-width="2"/>';
      /* an inner region drawn in the SAME data space as the outer polygon, so
         their true area ratio is preserved — the point of a
         "random point lands in the smaller shape" probability question. */
      if(fig.inner&&fig.inner.vertices){
        var ipts=fig.inner.vertices.map(function(v){var sv=toSP(v);return sv[0].toFixed(1)+','+sv[1].toFixed(1);}).join(' ');
        s+='<polygon points="'+ipts+'" fill="'+FIG_AMBER_FILL+'" stroke="'+FIG_AMBER+'" stroke-width="1.7"/>';
        if(fig.inner.label){
          var ic=fig.inner.vertices.reduce(function(a,v){return [a[0]+v[0],a[1]+v[1]];},[0,0]);
          var icm=toSP([ic[0]/fig.inner.vertices.length, ic[1]/fig.inner.vertices.length]);
          s+='<text x="'+icm[0].toFixed(1)+'" y="'+(icm[1]+3).toFixed(1)+'" font-size="10" fill="'+FIG_AMBER_TEXT+'" text-anchor="middle">'+fig.inner.label+'</text>';
        }
      }
      if(fig.labels){fig.labels.forEach(function(lbl,i){var sv=toSP(verts2[i]);s+='<text x="'+(sv[0]+(i%2===0?-14:14))+'" y="'+(sv[1]+(i<2?14:-14))+'" font-size="11" font-weight="bold" fill="'+FIG_INK+'" text-anchor="middle">'+lbl+'</text>';});}
      /* per-vertex interior-angle VALUE labels (text only, no arc) — for
         "quadrilateral has three angles X,Y,Z, find the fourth" style
         questions; positioned slightly inward from each vertex toward the
         polygon's centroid so they read as belonging to that corner. */
      if(fig.vertex_angle_labels){
        var vaCenter=verts2.reduce(function(a,v){return [a[0]+v[0],a[1]+v[1]];},[0,0]).map(function(c){return c/verts2.length;});
        var vaCenterS=toSP(vaCenter);
        fig.vertex_angle_labels.forEach(function(lbl,i){
          if(!lbl)return;
          var sv=toSP(verts2[i]);
          var dx=vaCenterS[0]-sv[0], dy=vaCenterS[1]-sv[1], dl=Math.hypot(dx,dy)||1;
          s+='<text x="'+(sv[0]+dx/dl*20).toFixed(1)+'" y="'+(sv[1]+dy/dl*20+3).toFixed(1)+'" font-size="10" fill="'+FIG_AMBER_TEXT+'" text-anchor="middle">'+lbl+'</text>';
        });
      }
      if(fig.sides){var vl=verts2.length;fig.sides.forEach(function(side,i){if(!side)return;var a=toSP(verts2[i]),b=toSP(verts2[(i+1)%vl]);var mx=(a[0]+b[0])/2,my2=(a[1]+b[1])/2;var dx=b[0]-a[0],dy=b[1]-a[1],len=Math.sqrt(dx*dx+dy*dy)||1;var nx=-dy/len*14,ny=dx/len*14;s+='<text x="'+(mx+nx).toFixed(1)+'" y="'+(my2+ny+3).toFixed(1)+'" font-size="10" fill="'+FIG_AMBER_TEXT+'" text-anchor="middle">'+side+'</text>';});}
      /* a semicircle attached to one side (diameter = that side's real length,
         since it shares the SAME uniform toSP() scale as the polygon — this is
         what lets a composite-area figure (rectangle + semicircle) stay
         proportionally truthful rather than an arbitrary decorative bump). */
      if(fig.semicircle){
        var scSide=fig.semicircle.side||0, vlS=verts2.length;
        var aS=toSP(verts2[scSide]), bS=toSP(verts2[(scSide+1)%vlS]);
        var dxS=bS[0]-aS[0], dyS=bS[1]-aS[1], dlenS=Math.hypot(dxS,dyS)||1, radS=dlenS/2;
        var midxS=(aS[0]+bS[0])/2, midyS=(aS[1]+bS[1])/2;
        var centS=verts2.reduce(function(acc,v){var sv=toSP(v);return [acc[0]+sv[0],acc[1]+sv[1]];},[0,0]);
        centS=[centS[0]/vlS, centS[1]/vlS];
        var nxS=-dyS/dlenS, nyS=dxS/dlenS;
        if((midxS+nxS-centS[0])*nxS+(midyS+nyS-centS[1])*nyS<0){nxS=-nxS;nyS=-nyS;}
        var sweepS=(dxS*nyS-dyS*nxS)>0?0:1;
        s+='<path d="M'+aS[0].toFixed(1)+','+aS[1].toFixed(1)+' A'+radS.toFixed(1)+','+radS.toFixed(1)+' 0 0,'+sweepS+' '+bS[0].toFixed(1)+','+bS[1].toFixed(1)+'" fill="'+FIG_INDIGO_FILL2+'" stroke="'+FIG_INDIGO+'" stroke-width="2"/>';
        if(fig.semicircle.label){
          var lxS=midxS+nxS*radS*0.55, lyS=midyS+nyS*radS*0.55;
          s+='<text x="'+lxS.toFixed(1)+'" y="'+(lyS+3).toFixed(1)+'" font-size="9" fill="'+FIG_INDIGO+'" text-anchor="middle">'+fig.semicircle.label+'</text>';
        }
      }
      /* Interior dimension lines in DATA coords (unlike `aux`, which is raw screen
         space and so can't follow an auto-scaled polygon). This is what lets a
         trapezoid/triangle show its height, or a regular n-gon its apothem —
         quantities that are given in the question but are not edges of the shape,
         so without this the figure would silently omit half the given data. */
      (fig.dlines||[]).forEach(function(dl){
        var a=toSP(dl.from),b=toSP(dl.to);
        s+='<line x1="'+a[0].toFixed(1)+'" y1="'+a[1].toFixed(1)+'" x2="'+b[0].toFixed(1)+'" y2="'+b[1].toFixed(1)+'" stroke="'+FIG_AMBER+'" stroke-width="1.4" stroke-dasharray="5,3"/>';
        if(dl.right){ /* right-angle tick where the dimension line meets the base */
          var ux=(a[0]-b[0]),uy=(a[1]-b[1]),ul=Math.sqrt(ux*ux+uy*uy)||1;ux/=ul;uy/=ul;
          var px=-uy,py=ux,sz=7;
          s+='<polyline points="'+(b[0]+px*sz).toFixed(1)+','+(b[1]+py*sz).toFixed(1)+' '+(b[0]+px*sz+ux*sz).toFixed(1)+','+(b[1]+py*sz+uy*sz).toFixed(1)+' '+(b[0]+ux*sz).toFixed(1)+','+(b[1]+uy*sz).toFixed(1)+'" fill="none" stroke="'+FIG_INK+'" stroke-width="1"/>';
        }
        if(dl.label){var lx=(a[0]+b[0])/2,ly=(a[1]+b[1])/2;s+='<text x="'+(lx+(dl.dx==null?6:dl.dx)).toFixed(1)+'" y="'+(ly+(dl.dy==null?-3:dl.dy)).toFixed(1)+'" font-size="10" fill="'+FIG_AMBER_TEXT+'" text-anchor="start">'+dl.label+'</text>';}
      });
    }
    /* auxiliary dashed lines (drawn on top of everything) */
    (fig.aux||[]).forEach(function(ln){
      s+='<line x1="'+ln.x1+'" y1="'+ln.y1+'" x2="'+ln.x2+'" y2="'+ln.y2+'" stroke="'+(ln.color||FIG_MUTED)+'" stroke-width="'+(ln.w||1.2)+'" stroke-dasharray="'+(ln.dash||'5,3')+'"/>';
      if(ln.label){var mx=(+ln.x1+(+ln.x2))/2,myl=(+ln.y1+(+ln.y2))/2;s+='<text x="'+(mx+(ln.dx||0))+'" y="'+(myl+(ln.dy||-8))+'" font-size="9" fill="'+(ln.color||FIG_MUTED)+'" text-anchor="middle">'+ln.label+'</text>';}
    });
    s+='</svg>';
    return s;
    }catch(e){console.warn('_renderFig:',e);return '';}
  };



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

  /* ===================== FULL EXAM GENERATOR ===================== */
  window.genFullExam=function(btn,examName,viewId,sectionTitles,qPerSection){
    var spec=window.examSpecs&&window.examSpecs[viewId];
    var bank=window.fullExamBank&&window.fullExamBank[viewId];
    if(!bank){alert('Question bank not found for '+viewId);return;}

    /* ── helpers ── */
    function _maths(s){var AENV=['align','aligned','matrix','pmatrix','bmatrix','vmatrix','array','cases','eqnarray','split','gather','gathered','smallmatrix'];var out='',inM=false,aD=0,i=0,L=s.length;while(i<L){if(!inM&&s.slice(i,i+2)==='\\('){out+='\\(';i+=2;inM=true;aD=0;continue;}if(!inM&&s.slice(i,i+2)==='\\['){out+='\\[';i+=2;inM=true;aD=0;continue;}if(inM&&s.slice(i,i+2)==='\\)'){out+='\\)';i+=2;inM=false;aD=0;continue;}if(inM&&s.slice(i,i+2)==='\\]'){out+='\\]';i+=2;inM=false;aD=0;continue;}if(inM&&s.slice(i,i+6)==='\\begin'){var b1=s.indexOf('{',i+6),e1=s.indexOf('}',b1+1);if(b1!==-1&&e1!==-1&&AENV.some(function(v){return s.slice(b1+1,e1).indexOf(v)!==-1;}))aD++;}if(inM&&s.slice(i,i+4)==='\\end'){var b2=s.indexOf('{',i+4),e2=s.indexOf('}',b2+1);if(b2!==-1&&e2!==-1&&AENV.some(function(v){return s.slice(b2+1,e2).indexOf(v)!==-1;})&&aD>0)aD--;}if(!inM&&s[i]==='<'&&i+1<L&&(s[i+1]==='/'||/[a-zA-Z]/.test(s[i+1]))){var tj=s.indexOf('>',i);if(tj!==-1){out+=s.slice(i,tj+1);i=tj+1;continue;}}var c=s[i];if(c==='&'){var sm=s.indexOf(';',i+1);if(sm!==-1&&sm-i<=8&&/^&[a-zA-Z#0-9]+;/.test(s.slice(i,sm+1))){var ent=s.slice(i,sm+1);if(ent==='&amp;'){if(inM&&aD>0)out+='&';else if(inM)out+='\\&';else out+='&amp;';}else out+=ent;i=sm+1;continue;}if(inM&&aD>0)out+='&';else if(inM)out+='\\&';else out+='&amp;';}else if(c==='<')out+='&lt;';else if(c==='>')out+='&gt;';else out+=c;i++;}return out;}
    function _mjRun(el){if(!el)return;function _t(){try{if(window.MathJax){if(typeof MathJax.typesetPromise==='function')MathJax.typesetPromise([el]).catch(function(){});else if(typeof MathJax.typeset==='function')MathJax.typeset([el]);else setTimeout(_t,400);}else{setTimeout(_t,400);}}catch(e){}}setTimeout(_t,80);setTimeout(_t,800);}
    var shuffle=window._shuffle;
    /* Track questions already drawn by an earlier section/part of THIS exam
       (fresh per genFullExam call) so the same question can never appear
       twice in one generated paper — previously each call re-shuffled the
       whole pool independently with no memory of prior draws. Also shuffle
       each drawn question's own choice order/answer index here, once, so
       every consumer of drawQ's result (fallback layout, spec-driven layout,
       and the answer key built from the same objects) automatically gets a
       randomized correct-answer position instead of always "A". */
    var _usedQFullExam=new Set();
    /* …and no two questions in the paper repeat a question or idea (05e-redundancy-check.js). */
    var _ideas=window.ClipSATRedundancy?window.ClipSATRedundancy.tracker():null;
    function drawQ(pool,n){
      var avail=shuffle(pool.filter(function(q){return !_usedQFullExam.has(q);})), picked=[];
      for(var i=0;i<avail.length&&picked.length<n;i++){ if(!_ideas||_ideas.add(avail[i])) picked.push(avail[i]); }
      picked.forEach(function(q){_usedQFullExam.add(q);});
      return picked.map(function(q){return window._shuffleQ?window._shuffleQ(q):q;});
    }
    /* A written-answer part takes the bank's free-response items first, then MCQ items that still
       make sense without their options; an MCQ part takes only MCQ items. */
    var _needsOptions=/which of the following|which (one|statement|expression|equation|graph|table|value|point|option)/i;
    function drawForPart(pool,part){
      if(part.type==='frq'){
        var got=drawQ(pool.filter(function(q){return q.type==='frq';}),part.q);
        if(got.length<part.q) got=got.concat(drawQ(pool.filter(function(q){return q.type!=='frq'&&!_needsOptions.test(q.text||q.q||'');}),part.q-got.length));
        return got;
      }
      if(part.type==='mcq'){
        /* prefer items with exactly the exam's option count (4-option exams skip old 5-option items) */
        var nOpt=(part.letters||globalLetters).length, mcq=pool.filter(function(q){return q.type!=='frq';});
        var got2=drawQ(mcq.filter(function(q){return !q.choices||q.choices.length===nOpt;}),part.q);
        if(got2.length<part.q) got2=got2.concat(drawQ(mcq,part.q-got2.length));
        return got2;
      }
      return drawQ(pool,part.q);
    }
    function esc(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');}

    var d=new Date();
    var dateStr=d.toLocaleDateString('en-GB',{day:'2-digit',month:'long',year:'numeric'});
    /* build pool from easy/medium/hard if bank has no pool */
    if(!bank.pool && (bank.easy||bank.medium||bank.hard)){
      var _cvt=function(a){return (a||[]).map(function(q){return {type:'mcq',domain:q.domain||'Mathematics',text:q.q||q.text||'',choices:q.choices||[],answer:q.answer,sol:q.sol||''};});};
      bank.pool=_cvt(bank.easy).concat(_cvt(bank.medium)).concat(_cvt(bank.hard));
    }
    var globalLetters=(spec&&spec.letters)||(bank.letters)||['A','B','C','D'];

    /* ── FALLBACK: no spec → flat legacy layout ── */
    if(!spec){
      var totalQ=sectionTitles.length*qPerSection;
      var h='<div class="full-exam-paper">';
      h+='<div class="fep-header"><div class="fep-top-bar"><span class="fep-logo-tag">ClipSAT</span><span class="fep-badge">Practice Examination</span></div>';
      h+='<h1 class="fep-title">'+esc(examName)+'</h1>';
      h+='<div class="fep-meta-grid"><div class="fep-meta-cell"><span class="fep-mlabel">Student Name</span><span class="fep-mline"></span></div>';
      h+='<div class="fep-meta-cell"><span class="fep-mlabel">Date</span><span class="fep-mval">'+dateStr+'</span></div>';
      h+='<div class="fep-meta-cell"><span class="fep-mlabel">School / Centre</span><span class="fep-mline"></span></div>';
      h+='<div class="fep-meta-cell fep-score-cell"><span class="fep-mlabel">Score</span><span class="fep-score-box-big">____&nbsp;/&nbsp;'+totalQ+'</span></div></div></div>';
      h+='<div class="fep-anssheet"><div class="fep-anssheet-title">Answer Sheet</div><div class="fep-bubbles" style="--fep-nopt:'+globalLetters.length+'">';
      for(var qi=1;qi<=totalQ;qi++){h+='<div class="fep-bubble-row"><span class="fep-bnum">'+qi+'</span>';globalLetters.forEach(function(l){h+='<span class="fep-bubble">'+l+'</span>';});h+='</div>';}
      h+='</div></div>';
      var qNum=1;var ak=[];
      /* Structured capture for the Google Forms/Classroom integration — see
         public/js/quiz-capture-ui.js. Mirrors ak[] but keeps the full
         choices array + a zero-based correctIndex instead of a display
         letter, and is fired as a DOM event once rendering completes so
         nothing outside this function needs to know the internal shape. */
      var _csCaptureQ=[];
      sectionTitles.forEach(function(secTitle,si){
        var sq=drawQ(bank.pool,qPerSection);
        h+='<div class="fep-section" style="page-break-before:'+(si>0?'always':'auto')+'">';
        h+='<div class="fep-section-head"><span class="fep-sec-label">Section '+(si+1)+'</span><span class="fep-sec-title">'+esc(secTitle)+'</span></div>';
        sq.forEach(function(q){
          var isMCQ=(q.type==='mcq'||q.type==='data');
          ak.push({n:qNum,type:q.type,domain:q.domain,answer:isMCQ?globalLetters[q.answer]:null,sol:q.sol||''});
          _csCaptureQ.push({text:q.text||q.q||'',choices:isMCQ?(q.choices||[]).slice():[],correctIndex:isMCQ?q.answer:null,type:isMCQ?'mcq':'frq',points:1});
          h+='<div class="fep-item '+(q.type==='frq'?'fep-frq':'fep-mcq')+'">';
          h+='<div class="fep-item-head"><span class="fep-inum">'+qNum+'</span><span class="fep-domain-tag">'+esc(q.domain)+'</span></div>';
          if(q.figure||q.fig)h+='<div class="fep-figure">'+(q.figure||(window._renderFig&&window._renderFig(q.fig))||'')+'</div>';
          h+='<div class="fep-qbody">'+_maths(q.text||q.q||'')+'</div>';
          if(isMCQ&&q.choices){h+='<div class="fep-choices">';q.choices.forEach(function(ch,ci){var s=String(ch||'');if(s.indexOf('\\(')===-1&&s.indexOf('\\[')===-1&&/\\[a-zA-Z{([\\]/.test(s)){s='\\('+s+'\\)';}h+='<div class="fep-choice"><span class="fep-cletter">'+globalLetters[ci]+'.</span><span class="fep-ctext">'+_maths(s)+'</span></div>';});h+='</div>';}
          if(q.type==='frq'){h+='<div class="fep-work-space"><span class="fep-ws-label">Working:</span>';for(var l=0;l<5;l++)h+='<div class="fep-ws-line"></div>';h+='<div class="fep-ws-ans"><span>Answer:</span><span class="fep-ws-ans-line"></span></div></div>';}
          h+='<div class="fep-sol-block" style="display:none"><strong>Answer'+(isMCQ?' ('+globalLetters[q.answer]+')':'')+': </strong>'+_maths(q.sol||'')+'</div></div>';
          qNum++;
        });
        h+='</div>';
      });
      h+='<div class="fep-key-section"><button class="btn fep-key-toggle" onclick="this.nextElementSibling.style.display=this.nextElementSibling.style.display===\'none\'?\'block\':\'none\';this.textContent=this.textContent.includes(\'Show\')?\'Hide Answer Key ▴\':\'Show Answer Key ▾\'">Show Answer Key ▾</button><div class="fep-key-grid" style="display:none">';
      ak.forEach(function(k){h+='<div class="fep-key-item '+(k.type==='frq'?'fep-key-frq':'')+'""><span class="fep-knum">'+k.n+'</span><span class="fep-kans">'+(k.answer||'FRQ')+'</span><span class="fep-kdomain">'+esc(k.domain)+'</span></div>';});
      h+='</div></div></div>';
      var _tgF=btn.closest('.testgen');
      var out=_tgF?_tgF.querySelector('.tg-out'):null;
      if(!out){var _secF=btn.closest('section');if(_secF){var _outsF=_secF.querySelectorAll('.tg-out');out=_outsF[_outsF.length-1]||null;}}
      if(!out){console.warn('genFullExam: no .tg-out found for',viewId);return;}
      out.innerHTML=h;
      _mjRun(out);
      document.dispatchEvent(new CustomEvent('clipsat:quiz-ready',{detail:{source:'genFullExam-static',title:examName,trackId:viewId,questions:_csCaptureQ,outEl:out}}));
      return;
    }

    /* ── SPEC-DRIVEN PATH — real exam standards ── */
    var totalMCQ=0,totalFRQ=0;
    spec.sections.forEach(function(sec){sec.parts.forEach(function(p){
      if(p.type==='mcq')totalMCQ+=p.q; else if(p.type==='frq')totalFRQ+=p.q;
    });});
    var totalQ=totalMCQ+totalFRQ;

    /* COVER PAGE */
    var h='<div class="full-exam-paper">';
    h+='<div class="fep-cover-page">';
    h+='<div class="fep-official-bar">'+esc(spec.org||'ClipSAT Practice')+'</div>';
    h+='<div class="fep-header">';
    h+='<div class="fep-logo-wrap" style="text-align:center;padding:10px 0 4px">'+'<img src="'+(document.getElementById('site-logo-img')||{src:''}).src+'" class="fep-logo-img" alt="ClipSAT Logo"></div>';
    h+='<div class="fep-top-bar"><span class="fep-exam-logo">'+esc(spec.logo||spec.title)+'</span><span class="fep-badge">Practice Examination</span></div>';
    h+='<h1 class="fep-title">'+esc(spec.title)+'</h1>';
    h+='<div class="fep-total-bar">';
    h+='<div class="fep-total-item"><span class="fep-total-val">'+totalQ+'</span><span class="fep-total-lbl">Total Questions</span></div>';
    h+='<div class="fep-total-item"><span class="fep-total-val">'+esc(spec.totalTime)+'</span><span class="fep-total-lbl">Total Time</span></div>';
    if(totalMCQ>0)h+='<div class="fep-total-item"><span class="fep-total-val">'+totalMCQ+'</span><span class="fep-total-lbl">Multiple Choice</span></div>';
    if(totalFRQ>0)h+='<div class="fep-total-item"><span class="fep-total-val">'+totalFRQ+'</span><span class="fep-total-lbl">Free Response</span></div>';
    h+='</div>';
    h+='<div class="fep-meta-grid">';
    h+='<div class="fep-meta-cell"><span class="fep-mlabel">Student Name</span><span class="fep-mline"></span></div>';
    h+='<div class="fep-meta-cell"><span class="fep-mlabel">Date</span><span class="fep-mval">'+dateStr+'</span></div>';
    h+='<div class="fep-meta-cell"><span class="fep-mlabel">School / Centre</span><span class="fep-mline"></span></div>';
    h+='<div class="fep-meta-cell fep-score-cell"><span class="fep-mlabel">Total Score</span><span class="fep-score-box-big">____&nbsp;/&nbsp;'+totalQ+'</span></div>';
    h+='</div>';
    h+='<div class="fep-instr-box"><strong>General Instructions</strong><ul class="fep-instr-list">';
    spec.instructions.forEach(function(ins){h+='<li>'+esc(ins)+'</li>';});
    h+='</ul></div>';
    h+='</div>';
    /* overview table */
    h+='<div class="fep-instr-box" style="margin-top:16px"><strong>Exam Overview</strong>';
    h+='<table style="width:100%;border-collapse:collapse;font-family:var(--sans);font-size:.82rem;margin-top:8px">';
    h+='<tr style="background:#f0f4fc"><th style="padding:5px 8px;text-align:left;border:1px solid #c5cde8">Section / Part</th><th style="padding:5px 8px;text-align:left;border:1px solid #c5cde8">Time</th><th style="padding:5px 8px;text-align:center;border:1px solid #c5cde8">Q\'s</th><th style="padding:5px 8px;text-align:center;border:1px solid #c5cde8">Calc</th></tr>';
    spec.sections.forEach(function(sec){
      sec.parts.forEach(function(p){
        var rowTitle=sec.parts.length>1&&p.label?(esc(sec.title)+' — '+esc(p.label)):esc(sec.title);
        h+='<tr><td style="padding:5px 8px;border:1px solid #c5cde8">'+rowTitle+(p.note?'<br><small style="color:#666">'+esc(p.note)+'</small>':'')+'</td>';
        h+='<td style="padding:5px 8px;border:1px solid #c5cde8;white-space:nowrap">'+esc(p.time)+'</td>';
        h+='<td style="padding:5px 8px;border:1px solid #c5cde8;text-align:center">'+p.q+'</td>';
        h+='<td style="padding:5px 8px;border:1px solid #c5cde8;text-align:center"><span class="fep-calc-badge '+(p.calc?'fep-calc-yes':'fep-calc-no')+'">'+(p.calc?'Yes':'No')+'</span></td></tr>';
      });
    });
    h+='</table></div></div>';

    /* ANSWER SHEET (MCQ only) */
    if(totalMCQ>0){
      h+='<div class="fep-anssheet" style="page-break-before:always"><div class="fep-anssheet-title">Answer Sheet — Multiple Choice ('+totalMCQ+' questions)</div>';
      h+='<p style="font-family:var(--sans);font-size:.78rem;color:#555;margin:0 0 10px">Fill in the bubble for your chosen answer. Erase completely if you change an answer.</p>';
      var maxOpt=globalLetters.length;
      spec.sections.forEach(function(sec){sec.parts.forEach(function(p){if(p.type==='mcq'&&p.letters&&p.letters.length>maxOpt)maxOpt=p.letters.length;});});
      h+='<div class="fep-bubbles" style="--fep-nopt:'+maxOpt+'">';
      var mcqN=0;
      spec.sections.forEach(function(sec){sec.parts.forEach(function(p){
        if(p.type!=='mcq')return;
        var pL=p.letters||globalLetters;
        for(var i=0;i<p.q;i++){mcqN++;h+='<div class="fep-bubble-row"><span class="fep-bnum">'+mcqN+'</span>';pL.forEach(function(l){h+='<span class="fep-bubble">'+l+'</span>';});h+='</div>';}
      });});
      h+='</div></div>';
    }

    /* SECTIONS & PARTS */
    var qNum=1;var answerKey=[];
    var _csCaptureQ=[]; /* see the fallback branch above for what this feeds */
    spec.sections.forEach(function(sec,si){
      h+='<div class="fep-section" style="page-break-before:always">';
      h+='<div class="fep-section-head">';
      h+='<span class="fep-sec-label">Section '+(si+1)+' of '+spec.sections.length+'</span>';
      h+='<span class="fep-sec-title">'+esc(sec.title)+'</span>';
      h+='<span class="fep-sec-time">&#9201; '+esc(sec.time)+'</span>';
      h+='</div>';
      if(sec.note)h+='<div class="fep-sec-note">'+esc(sec.note)+'</div>';

      sec.parts.forEach(function(part){
        var pL=part.letters||globalLetters;
        var isMCQPart=(part.type==='mcq');
        var isFRQPart=(part.type==='frq');

        if(part.label){
          h+='<div class="fep-part-head">';
          h+='<span class="fep-part-label">'+esc(part.label)+'</span>';
          h+='<span class="fep-part-info">'+part.q+' Question'+(part.q!==1?'s':'')+(part.time?' &nbsp;·&nbsp; &#9201; '+esc(part.time):'')+'</span>';
          h+='<span class="fep-calc-badge '+(part.calc?'fep-calc-yes':'fep-calc-no')+'">'+(part.calc?'Calculator Permitted':'No Calculator')+'</span>';
          h+='</div>';
        }
        if(part.note){h+='<div class="fep-sec-note">'+esc(part.note)+'</div>';}

        var partStart=qNum;
        var qs=drawForPart(bank.pool,part);
        if(part.q>1)h+='<div class="fep-q-count">Questions '+partStart+'–'+(partStart+part.q-1)+'</div>';

        qs.forEach(function(q){
          var isMCQ=isMCQPart||(q.type==='mcq'||q.type==='data');
          var isFRQ=isFRQPart||(q.type==='frq');
          if(isMCQPart){isFRQ=false;isMCQ=true;}
          if(isFRQPart){isMCQ=false;isFRQ=true;}

          answerKey.push({n:qNum,type:(isFRQ?'frq':'mcq'),domain:q.domain,
            answer:(isMCQ?pL[q.answer]:null),sol:q.sol||''});
          _csCaptureQ.push({text:q.text||q.q||'',choices:isMCQ?(q.choices||[]).slice():[],correctIndex:isMCQ?q.answer:null,type:isFRQ?'frq':'mcq',points:1});

          h+='<div class="fep-item '+(isFRQ?'fep-frq fep-frq-full':'fep-mcq')+'">';
          h+='<div class="fep-item-head"><span class="fep-inum">'+qNum+'</span>';
          h+='<span class="fep-domain-tag">'+esc(q.domain||'')+'</span>';
          if(isFRQ)h+='<span class="fep-type-tag frq-tag">FRQ</span>';
          h+='</div>';
          if(q.figure)h+='<div class="fep-figure">'+q.figure+'</div>';
          h+='<div class="fep-qbody">'+_maths(q.text||q.q||'')+'</div>';
          if(isMCQ&&q.choices){
            h+='<div class="fep-choices">';
            q.choices.forEach(function(ch,ci){var s=String(ch||'');if(s.indexOf('\\(')===-1&&s.indexOf('\\[')===-1&&/\\[a-zA-Z{([\\]/.test(s)){s='\\('+s+'\\)';}h+='<div class="fep-choice"><span class="fep-cletter">'+pL[ci]+'.</span><span class="fep-ctext">'+_maths(s)+'</span></div>';});
            h+='</div>';
          }
          if(isFRQ){
            h+='<div class="fep-work-space"><span class="fep-ws-label">Working Space:</span>';
            for(var ln=0;ln<8;ln++)h+='<div class="fep-ws-line"></div>';
            h+='<div class="fep-ws-ans"><span>Answer:</span><span class="fep-ws-ans-line"></span></div></div>';
          }
          h+='<div class="fep-sol-block" style="display:none"><strong>Answer'+(isMCQ?' ('+pL[q.answer]+')':'')+': </strong>'+_maths(q.sol||'')+'</div>';
          h+='</div>';
          qNum++;
        });
      });
      h+='</div>';
    });

    /* ANSWER KEY */
    h+='<div class="fep-key-section">';
    h+='<button class="btn fep-key-toggle" onclick="this.nextElementSibling.style.display=this.nextElementSibling.style.display===\'none\'?\'block\':\'none\';this.textContent=this.textContent.includes(\'Show\')?\'Hide Answer Key ▴\':\'Show Answer Key ▾\'">Show Answer Key ▾</button>';
    h+='<div class="fep-key-grid" style="display:none">';
    answerKey.forEach(function(k){
      h+='<div class="fep-key-item '+(k.type==='frq'?'fep-key-frq':'')+'">';
      h+='<span class="fep-knum">'+k.n+'</span>';
      h+='<span class="fep-kans">'+(k.answer||'FRQ')+'</span>';
      h+='<span class="fep-kdomain">'+esc(k.domain)+'</span>';
      h+='</div>';
    });
    h+='</div></div>';
    h+='</div>';

    /* find nearest .tg-out whether inside .testgen or as a following sibling */
    var _tg=btn.closest('.testgen');
    var out=_tg?_tg.querySelector('.tg-out'):null;
    if(!out){
      /* button outside .testgen: look for next .tg-out sibling or cousin */
      var _p=btn.parentElement;
      var _sib=_p?_p.nextElementSibling:null;
      if(_sib&&(_sib.classList.contains('tg-out')||_sib.querySelector('.tg-out')))
        out=_sib.classList.contains('tg-out')?_sib:_sib.querySelector('.tg-out');
      if(!out){
        var _sec=btn.closest('section');
        if(_sec){var _outs=_sec.querySelectorAll('.tg-out');out=_outs[_outs.length-1];}
      }
    }
    if(!out){out=document.createElement('div');out.className='tg-out';btn.insertAdjacentElement('afterend',out);}
    out.innerHTML=h;
    _mjRun(out);
    document.dispatchEvent(new CustomEvent('clipsat:quiz-ready',{detail:{source:'genFullExam-static',title:spec.title||examName,trackId:viewId,questions:_csCaptureQ,outEl:out}}));
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
    register:register, fmt:fmt, Plot:Plot, redrawAll:redrawAll, wireDataToggle:wireDataToggle, renderDataRows:renderDataRows, dfdx:dfdx, integrate:integrate, arrow:arrow, _deg:_deg, _fitView:_fitView, _clip:_clip, _set:_set, _slider:_slider, _num:_num,
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

