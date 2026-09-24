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

  /* ===================== LIMIT EXPLORER ===================== */
  (function(){
    var canvas=document.getElementById('limCanvas'); if(!canvas) return;
    var f=function(x){ return x+1; }; // (x^2-1)/(x-1) simplified, hole at 1
    var view={xmin:-0.2,xmax:2.4,ymin:0,ymax:3.6};
    var x=0.5;
    var dataBtn=document.getElementById('limDataBtn'), dataPanel=document.getElementById('limDataPanel'),
        dataDesc=document.getElementById('limDataDesc'), dataRows=document.getElementById('limDataRows');
    wireDataToggle(dataBtn,dataPanel);
    function updateDataView(){
      if(!dataDesc) return;
      dataDesc.textContent='f(x) = (x² − 1)/(x − 1), which simplifies to x + 1 everywhere except x = 1, where f is undefined (an open circle/hole). At the current x = '+fmt(x,3)+', f(x) = '+fmt(f(x),3)+'. As x → 1, f(x) → 2.';
      var N=9, rows=[];
      for(var i=0;i<N;i++){ var xv=view.xmin+(view.xmax-view.xmin)*i/(N-1); rows.push([fmt(xv), Math.abs(xv-1)<1e-9?'undefined (hole)':fmt(f(xv))]); }
      renderDataRows(dataRows,rows);
    }
    function draw(ctx,w,h){
      var P=new Plot(ctx,w,h,view,{l:30,r:12,t:14,b:26}); P.clear(); P.grid();
      P.curve(f,INDIGO,2.6);
      P.ring(1,2,INDIGO,5.5);            // the hole
      P.vline(x,'rgba(184,128,31,.5)',[4,4]);
      P.dot(x,f(x),AMBER2,5);
      P.segment(x,0,x,f(x),'rgba(184,128,31,.35)',1.2,[3,3]);
      updateDataView();
    }
    register(canvas,draw);
    var slider=document.getElementById('limSlider');
    function upd(){
      var t=parseInt(slider.value,10)/100; // -0.5..0.5
      x=1+t*0.9; if(Math.abs(x-1)<0.012) x=(t<0?0.988:1.012);
      document.getElementById('limX').textContent=fmt(x,3);
      document.getElementById('limXv').textContent=fmt(x,3);
      document.getElementById('limFv').textContent=fmt(f(x),3);
      redrawAll();
    }
    slider.addEventListener('input',upd); upd();
  })();

  /* ===================== TANGENT EXPLORER ===================== */
  (function(){
    var fns={
      quad:{f:function(x){return 0.5*x*x;}, view:{xmin:-3.4,xmax:3.4,ymin:-1,ymax:6}},
      sin:{f:function(x){return Math.sin(x);}, view:{xmin:-1,xmax:7.3,ymin:-1.6,ymax:1.6}},
      cubic:{f:function(x){return x*x*x/3 - x;}, view:{xmin:-2.4,xmax:2.4,ymin:-1.6,ymax:1.6}}
    };
    var key='quad', a=null;
    var canvas=document.getElementById('tanCanvas'); if(!canvas) return;
    var sel=document.getElementById('tanFn'), slider=document.getElementById('tanSlider'),
        trace=document.getElementById('tanTrace');
    var dataBtn=document.getElementById('tanDataBtn'), dataPanel=document.getElementById('tanDataPanel'),
        dataDesc=document.getElementById('tanDataDesc'), dataRows=document.getElementById('tanDataRows');
    wireDataToggle(dataBtn,dataPanel);
    var FN_LABEL={ quad:'½x²', sin:'sin x', cubic:'⅓x³ − x' };
    function cur(){ return fns[key]; }
    function aFromSlider(){ var v=cur().view; return v.xmin+0.12*(v.xmax-v.xmin)+(parseInt(slider.value,10)/100)*0.76*(v.xmax-v.xmin); }
    function updateDataView(f,v,fa,m,tangent){
      if(!dataDesc) return;
      dataDesc.textContent='f(x) = '+FN_LABEL[key]+'. At a = '+fmt(a)+', f(a) = '+fmt(fa)+', tangent slope f′(a) = '+fmt(m)+'.'+(trace.checked?' The derivative curve f′(x) is also shown.':'');
      var N=9, rows=[];
      for(var i=0;i<N;i++){ var x=v.xmin+(v.xmax-v.xmin)*i/(N-1); rows.push([fmt(x),fmt(f(x)),fmt(tangent(x))]); }
      renderDataRows(dataRows,rows);
    }
    function draw(ctx,w,h){
      var c=cur(), f=c.f, v=c.view;
      var P=new Plot(ctx,w,h,v,{l:34,r:12,t:14,b:26}); P.clear(); P.grid();
      if(trace.checked) P.curve(function(x){return dfdx(f,x);}, AMBER2, 2, [6,4]);
      P.curve(f,INDIGO,2.8);
      var m=dfdx(f,a), fa=f(a), L=(v.xmax-v.xmin)*0.28;
      var tangent=function(x){ return fa+m*(x-a); };
      P.segment(a-L,fa-m*L,a+L,fa+m*L,INDIGO2,2.4);
      if(trace.checked) P.dot(a,m,AMBER2,4.5);
      P.dot(a,fa,INDIGO,5.5);
      document.getElementById('tanF').textContent=fmt(fa);
      document.getElementById('tanD').textContent=fmt(m);
      document.getElementById('tanAv').textContent=fmt(a);
      updateDataView(f,v,fa,m,tangent);
    }
    register(canvas,draw);
    function upd(){ a=aFromSlider(); draw_safe(); }
    function draw_safe(){ document.getElementById('tanAv').textContent=fmt(aFromSlider()); redrawAll(); }
    sel.addEventListener('change',function(){ key=sel.value; a=aFromSlider(); redrawAll(); });
    slider.addEventListener('input',function(){ a=aFromSlider(); redrawAll(); });
    trace.addEventListener('change',redrawAll);
    a=aFromSlider();
  })();

  /* ===================== RIEMANN EXPLORER ===================== */
  (function(){
    var fns={
      parab:{f:function(x){return 0.25*x*x+0.5;}},
      sin:{f:function(x){return Math.sin(x)+1.2;}},
      line:{f:function(x){return 3-0.5*x;}}
    };
    var a=0,b=4, key='parab', n=6, rule='left';
    var view={xmin:-0.3,xmax:4.4,ymin:0,ymax:5};
    var canvas=document.getElementById('riCanvas'); if(!canvas) return;
    var sel=document.getElementById('riFn'), slider=document.getElementById('riSlider');
    var dataBtn=document.getElementById('riDataBtn'), dataPanel=document.getElementById('riDataPanel'),
        dataDesc=document.getElementById('riDataDesc'), dataRows=document.getElementById('riDataRows');
    wireDataToggle(dataBtn,dataPanel);
    var RULE_NAME={ left:'Left', right:'Right', mid:'Midpoint' };
    function f(){ return fns[key].f; }
    function sampleX(i,dx){ if(rule==='left') return a+i*dx; if(rule==='right') return a+(i+1)*dx; return a+(i+0.5)*dx; }
    function approx(){ var dx=(b-a)/n, s=0; for(var i=0;i<n;i++){ s+=f()(sampleX(i,dx))*dx; } return s; }
    function updateDataView(ap,ex){
      if(!dataDesc) return;
      var dx=(b-a)/n;
      dataDesc.textContent='Interval ['+fmt(a)+', '+fmt(b)+'] partitioned into '+n+' rectangles of width '+fmt(dx,3)+' using the '+(RULE_NAME[rule]||rule)+' rule. Approximate sum ≈ '+fmt(ap,3)+'. Exact value = '+fmt(ex,3)+' (error '+fmt(Math.abs(ex-ap),3)+').';
      var fn=f(), rows=[];
      for(var i=0;i<n;i++){ var xl=a+i*dx, xr=xl+dx, xs=sampleX(i,dx), hgt=fn(xs); rows.push([(i+1),'['+fmt(xl)+', '+fmt(xr)+']',fmt(xs),fmt(hgt),fmt(hgt*dx)]); }
      renderDataRows(dataRows,rows);
    }
    function draw(ctx,w,h){
      var P=new Plot(ctx,w,h,view,{l:30,r:12,t:14,b:26}); P.clear(); P.grid();
      var dx=(b-a)/n, fn=f();
      for(var i=0;i<n;i++){
        var xs=sampleX(i,dx), hgt=fn(xs), x0=P.X(a+i*dx), x1=P.X(a+(i+1)*dx), yb=P.Y(0), yt=P.Y(hgt);
        ctx.fillStyle='rgba(200,144,42,0.22)'; ctx.fillRect(x0, Math.min(yb,yt), (x1-x0), Math.abs(yb-yt));
        ctx.strokeStyle=AMBER; ctx.lineWidth=1; ctx.strokeRect(x0+0.5, Math.min(yb,yt)+0.5, (x1-x0)-1, Math.abs(yb-yt)-1);
      }
      P.curve(fn,INDIGO,2.8);
      var ex=integrate(fn,a,b,3000), ap=approx();
      document.getElementById('riApprox').textContent=fmt(ap,3);
      document.getElementById('riExact').textContent=fmt(ex,3);
      document.getElementById('riErr').textContent=fmt(Math.abs(ex-ap),3);
      document.getElementById('riNv').textContent=n;
      updateDataView(ap,ex);
    }
    register(canvas,draw);
    sel.addEventListener('change',function(){ key=sel.value; redrawAll(); });
    slider.addEventListener('input',function(){ n=parseInt(slider.value,10); redrawAll(); });
    document.querySelectorAll('#riCanvas')&&document.querySelectorAll('.radios button').forEach(function(btn){
      if(!btn.closest('.ex-controls').querySelector('#riSlider')) return;
      btn.addEventListener('click',function(){
        btn.parentNode.querySelectorAll('button').forEach(function(x){x.classList.remove('on');});
        btn.classList.add('on'); rule=btn.getAttribute('data-rule'); redrawAll();
      });
    });
  })();

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
  function wireDataToggle(btn,panel){
    if(!btn||!panel) return;
    btn.addEventListener('click',function(){
      var opening=panel.hasAttribute('hidden');
      if(opening) panel.removeAttribute('hidden'); else panel.setAttribute('hidden','');
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
        if(opening) dataPanel.removeAttribute('hidden'); else dataPanel.setAttribute('hidden','');
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
        if(opening) dataPanel.removeAttribute('hidden'); else dataPanel.setAttribute('hidden','');
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

  /* ===================== ACCUMULATION (FTC) ===================== */
  (function(){
    var f=function(t){ return 1.1+0.9*Math.sin(0.9*t); };
    var a0=0, b0=6.3, x=1.5;
    var topV={xmin:-0.2,xmax:6.6,ymin:0,ymax:2.4};
    var Amax;
    function A(xx){ return integrate(f,a0,xx,800); }
    var top=document.getElementById('accTop'), bot=document.getElementById('accBot');
    var slider=document.getElementById('accSlider');
    if(!top||!bot||!slider) return; /* only present on the Calculus page — every
      other track's page has no accTop/accBot/accSlider, so slider.addEventListener
      below threw "Cannot read properties of null" and killed the rest of this
      script block before window.goChapter (defined later in the same block) ever
      got assigned, leaving every non-Calculus track's chapter pane blank */
    var dataBtn=document.getElementById('accDataBtn'), dataPanel=document.getElementById('accDataPanel'),
        dataDesc=document.getElementById('accDataDesc'), dataRows=document.getElementById('accDataRows');
    wireDataToggle(dataBtn,dataPanel);
    function updateDataView(){
      if(!dataDesc) return;
      dataDesc.textContent='f(t) = 1.1 + 0.9 sin(0.9t). A(x) = ∫₀ˣ f(t) dt, the accumulated area. At x = '+fmt(x)+', A(x) = '+fmt(A(x),3)+' and A′(x) = f(x) = '+fmt(f(x),3)+'.';
      var N=9, rows=[];
      for(var i=0;i<N;i++){ var t=a0+(b0-a0)*i/(N-1); rows.push([fmt(t),fmt(f(t)),fmt(A(t),3)]); }
      renderDataRows(dataRows,rows);
    }
    function botView(){ return {xmin:-0.2,xmax:6.6,ymin:0,ymax:Amax*1.1}; }
    function drawTop(ctx,w,h){
      var P=new Plot(ctx,w,h,topV,{l:30,r:12,t:12,b:22}); P.clear(); P.grid();
      P.areaUnder(f,a0,x,'rgba(200,144,42,0.24)');
      P.curve(f,INDIGO,2.6);
      P.vline(x,'rgba(184,128,31,.55)',[4,4]);
      P.dot(x,f(x),AMBER2,4.5);
    }
    function drawBot(ctx,w,h){
      var P=new Plot(ctx,w,h,botView(),{l:30,r:12,t:12,b:22}); P.clear(); P.grid();
      P.curve(A,INDIGO2,2.6);
      var Ax=A(x), m=f(x), L=1.3;
      P.segment(x-L,Ax-m*L,x+L,Ax+m*L,AMBER,2,[5,4]); // slope of A equals f(x)
      P.vline(x,'rgba(184,128,31,.4)',[4,4]);
      P.dot(x,Ax,INDIGO,5);
      document.getElementById('accArea').textContent=fmt(Ax,3);
      document.getElementById('accSlope').textContent=fmt(m,3);
      document.getElementById('accXv').textContent=fmt(x);
      updateDataView();
    }
    register(top,drawTop); register(bot,drawBot);
    Amax=A(b0);
    slider.addEventListener('input',function(){ x=a0+(parseInt(slider.value,10)/100)*(b0-a0); x=Math.max(0.05,x); redrawAll(); });
    x=a0+0.35*(b0-a0);
  })();

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

  /* ===================== OPTIMIZATION (Calculus) ===================== */
  (function(){
    var canvas=document.getElementById('optCanvas'); if(!canvas) return;
    var L=10, W=8, xm=Math.min(L,W)/2;
    function V(x){ return x*(L-2*x)*(W-2*x); }
    var xstar=0, vstar=-Infinity;
    for(var t=0;t<=2000;t++){ var xx=xm*t/2000, vv=V(xx); if(vv>vstar){ vstar=vv; xstar=xx; } }
    var view={xmin:-0.15,xmax:xm+0.2,ymin:0,ymax:vstar*1.18}, x=1;
    var slider=document.getElementById('optX');
    var dataBtn=document.getElementById('optDataBtn'), dataPanel=document.getElementById('optDataPanel'),
        dataDesc=document.getElementById('optDataDesc'), dataRows=document.getElementById('optDataRows');
    wireDataToggle(dataBtn,dataPanel);
    function updateDataView(){
      if(!dataDesc) return;
      dataDesc.textContent='V(x) = x(10 − 2x)(8 − 2x), the volume of a box folded from a '+L+'×'+W+' sheet with corner squares of side x cut out. Maximum V ≈ '+fmt(vstar,1)+' at x ≈ '+fmt(xstar,2)+'. At the current x = '+fmt(x,2)+', V = '+fmt(V(x),2)+'.';
      var N=9, rows=[];
      for(var i=0;i<N;i++){ var xv=view.xmin+(view.xmax-view.xmin)*i/(N-1); rows.push([fmt(xv),fmt(V(xv),2)]); }
      renderDataRows(dataRows,rows);
    }
    function draw(ctx,w,h){
      var P=new Plot(ctx,w,h,view,{l:36,r:12,t:14,b:26}); P.clear(); P.grid();
      P.curve(V,INDIGO,2.8);
      P.vline(xstar,'rgba(184,128,31,.4)',[4,4]);
      P.dot(xstar,vstar,AMBER2,5.5);
      P.dot(x,V(x),INDIGO,5);
      document.getElementById('optXv').textContent=fmt(x,2);
      document.getElementById('optV').textContent=fmt(V(x),2);
      document.getElementById('optMax').textContent='V ≈ '+fmt(vstar,1)+' at x ≈ '+fmt(xstar,2);
      updateDataView();
    }
    register(canvas,draw);
    slider.addEventListener('input',function(){ x=(parseInt(slider.value,10)/100)*xm; redrawAll(); });
    x=(25/100)*xm;
  })();

  /* ===================== AREA BETWEEN CURVES (Calculus) ===================== */
  (function(){
    var canvas=document.getElementById('abcCanvas'); if(!canvas) return;
    var c=2;
    function f(x){ return 4-x*x; }
    function g(x){ return x+c; }
    var view={xmin:-4,xmax:4,ymin:-3,ymax:5};
    var slider=document.getElementById('abcC');
    var dataBtn=document.getElementById('abcDataBtn'), dataPanel=document.getElementById('abcDataPanel'),
        dataDesc=document.getElementById('abcDataDesc'), dataRows=document.getElementById('abcDataRows');
    wireDataToggle(dataBtn,dataPanel);
    function updateDataView(r,area){
      if(!dataDesc) return;
      dataDesc.textContent='f(x) = 4 − x² and g(x) = x '+(c>=0?'+ '+fmt(c,1):'− '+fmt(Math.abs(c),1))+'. '+(r?'They intersect at x = '+fmt(r[0],2)+' and x = '+fmt(r[1],2)+'. Enclosed area = '+fmt(area,3)+'.':'They do not intersect — no enclosed region.');
      var N=9, rows=[];
      for(var i=0;i<N;i++){ var x=view.xmin+(view.xmax-view.xmin)*i/(N-1); rows.push([fmt(x),fmt(f(x)),fmt(g(x))]); }
      renderDataRows(dataRows,rows);
    }
    function roots(){ var disc=17-4*c; if(disc<0) return null; var s=Math.sqrt(disc); return [(-1-s)/2,(-1+s)/2]; }
    function fillBetween(P,ctx,a,b){
      ctx.save(); var pad=P.pad;
      ctx.beginPath(); ctx.rect(pad.l,pad.t,P.w-pad.l-pad.r,P.h-pad.t-pad.b); ctx.clip();
      ctx.beginPath(); var N=160; ctx.moveTo(P.X(a),P.Y(f(a)));
      for(var i=1;i<=N;i++){ var x=a+(b-a)*i/N; ctx.lineTo(P.X(x),P.Y(f(x))); }
      for(var j=N;j>=0;j--){ var x2=a+(b-a)*j/N; ctx.lineTo(P.X(x2),P.Y(g(x2))); }
      ctx.closePath(); ctx.fillStyle='rgba(200,144,42,0.22)'; ctx.fill(); ctx.restore();
    }
    function draw(ctx,w,h){
      var P=new Plot(ctx,w,h,view,{l:30,r:12,t:14,b:26}); P.clear(); P.grid();
      var r=roots(), area=0;
      if(r) fillBetween(P,ctx,r[0],r[1]);
      P.curve(f,INDIGO,2.8); P.curve(g,INDIGO2,2.4);
      if(r){
        P.dot(r[0],f(r[0]),AMBER2,5); P.dot(r[1],f(r[1]),AMBER2,5);
        area=integrate(function(x){ return f(x)-g(x); }, r[0], r[1], 2000);
        document.getElementById('abcLo').textContent='x = '+fmt(r[0],2)+' to '+fmt(r[1],2);
        document.getElementById('abcArea').textContent=fmt(area,3);
      } else { document.getElementById('abcLo').textContent='none'; document.getElementById('abcArea').textContent='0'; }
      document.getElementById('abcCv').textContent=fmt(c,1);
      document.getElementById('abcEq').textContent='y = 4 − x²   and   y = x '+(c>=0?'+ '+fmt(c,1):'− '+fmt(Math.abs(c),1));
      updateDataView(r, area);
    }
    register(canvas,draw);
    slider.addEventListener('input',function(){ c=parseFloat(slider.value); redrawAll(); });
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

  /* ===================== SLOPE FIELD (Calculus) ===================== */
  (function(){
    var canvas=document.getElementById('slopeCanvas'); if(!canvas) return;
    var fns={
      y:{f:function(x,y){return y;}, eq:'dy/dx = y', note:function(y0){return 'y = '+fmt(y0,2)+'·eˣ';}},
      x:{f:function(x,y){return x;}, eq:'dy/dx = x', note:function(y0){return 'y = x²/2 + '+fmt(y0,2);}},
      xmy:{f:function(x,y){return x-y;}, eq:'dy/dx = x − y', note:function(){return 'approaches y = x − 1';}}
    };
    var key='y', y0=1, view={xmin:-4,xmax:4,ymin:-4,ymax:4};
    var sel=document.getElementById('slopeFn'), sl=document.getElementById('slopeY0');
    var dataBtn=document.getElementById('slopeDataBtn'), dataPanel=document.getElementById('slopeDataPanel'),
        dataDesc=document.getElementById('slopeDataDesc'), dataRows=document.getElementById('slopeDataRows');
    wireDataToggle(dataBtn,dataPanel);
    function f(x,y){ return fns[key].f(x,y); }
    /* Numerically steps the exact same solution curve drawSolution() draws
       (same Euler step hs), recording y at N evenly spaced target x's along
       the way — so the table matches the picture's own curve exactly,
       rather than being a separate re-derivation of it. */
    function sampleSolution(){
      var hs=0.03, N=9, targets=[], out={};
      for(var i=0;i<N;i++) targets.push(view.xmin+(view.xmax-view.xmin)*i/(N-1));
      function record(x,y){
        targets.forEach(function(t){ if(out[t]===undefined && Math.abs(x-t)<=hs/2) out[t]=y; });
      }
      var x=0, y=y0; record(x,y);
      while(x<view.xmax){ y+=f(x,y)*hs; x+=hs; record(x,y); if(Math.abs(y)>40) break; }
      x=0; y=y0;
      while(x>view.xmin){ y-=f(x,y)*hs; x-=hs; record(x,y); if(Math.abs(y)>40) break; }
      return targets.map(function(t){ return [t, out[t]]; });
    }
    function updateDataView(){
      if(!dataDesc) return;
      dataDesc.textContent='Slope field for '+fns[key].eq+', solution curve through (0, '+fmt(y0,1)+'): '+fns[key].note(y0)+'.';
      var samples=sampleSolution(), rows=[];
      for(var i=0;i<samples.length;i++){ rows.push([fmt(samples[i][0]), samples[i][1]===undefined?'—':fmt(samples[i][1])]); }
      renderDataRows(dataRows,rows);
    }
    function drawSolution(P,ctx,start){
      ctx.save(); var pad=P.pad;
      ctx.beginPath(); ctx.rect(pad.l,pad.t,P.w-pad.l-pad.r,P.h-pad.t-pad.b); ctx.clip();
      var hs=0.03, x, y;
      ctx.beginPath();
      x=0; y=start; ctx.moveTo(P.X(x),P.Y(y));
      while(x<view.xmax){ y+=f(x,y)*hs; x+=hs; ctx.lineTo(P.X(x),P.Y(y)); if(Math.abs(y)>40) break; }
      x=0; y=start; ctx.moveTo(P.X(x),P.Y(y));
      while(x>view.xmin){ y-=f(x,y)*hs; x-=hs; ctx.lineTo(P.X(x),P.Y(y)); if(Math.abs(y)>40) break; }
      ctx.strokeStyle=AMBER2; ctx.lineWidth=2.6; ctx.lineJoin='round'; ctx.stroke(); ctx.restore();
    }
    function draw(ctx,w,h){
      var P=new Plot(ctx,w,h,view,{l:30,r:12,t:14,b:26}); P.clear(); P.grid();
      var L=0.17;
      for(var gx=-4;gx<=4.001;gx+=0.5){
        for(var gy=-4;gy<=4.001;gy+=0.5){
          var ang=Math.atan(f(gx,gy)), dx=L*Math.cos(ang), dy=L*Math.sin(ang);
          P.segment(gx-dx,gy-dy,gx+dx,gy+dy,'#9FB0C7',1.2);
        }
      }
      drawSolution(P,ctx,y0);
      P.dot(0,y0,AMBER2,5);
      document.getElementById('slopeY0v').textContent=fmt(y0,1);
      document.getElementById('slopeEq').textContent=fns[key].eq;
      document.getElementById('slopeNote').textContent=fns[key].note(y0);
      updateDataView();
    }
    register(canvas,draw);
    sel.addEventListener('change',function(){ key=sel.value; redrawAll(); });
    sl.addEventListener('input',function(){ y0=parseFloat(sl.value); redrawAll(); });
  })();

  /* ===================== PARAMETRIC & POLAR (Calculus) ===================== */
  (function(){
    var canvas=document.getElementById('paramCanvas'); if(!canvas) return;
    var curves={
      ellipse:{ tmax:2*Math.PI, p:function(t){ return {x:2.5*Math.cos(t), y:1.6*Math.sin(t)}; } },
      cardioid:{ tmax:2*Math.PI, p:function(t){ var r=1.5*(1+Math.cos(t)); return {x:r*Math.cos(t), y:r*Math.sin(t)}; } },
      rose:{ tmax:2*Math.PI, p:function(t){ var r=2*Math.sin(3*t); return {x:r*Math.cos(t), y:r*Math.sin(t)}; } }
    };
    var key='ellipse', frac=0.42, view={xmin:-4,xmax:4,ymin:-3.2,ymax:3.2};
    var sel=document.getElementById('paramCurve'), sl=document.getElementById('paramT');
    var dataBtn=document.getElementById('paramDataBtn'), dataPanel=document.getElementById('paramDataPanel'),
        dataDesc=document.getElementById('paramDataDesc'), dataRows=document.getElementById('paramDataRows');
    wireDataToggle(dataBtn,dataPanel);
    var CURVE_LABEL={ ellipse:'ellipse ⟨2.5cos t, 1.6sin t⟩', cardioid:'cardioid r = 1.5(1+cos t)', rose:'rose r = 2sin(3t)' };
    function updateDataView(tcur,pt){
      if(!dataDesc) return;
      dataDesc.textContent='Tracing the '+CURVE_LABEL[key]+' from t = 0 to t = '+fmt(tcur,2)+'. Current point ('+fmt(pt.x,2)+', '+fmt(pt.y,2)+').';
      var N=9, rows=[], c=curves[key];
      for(var i=0;i<N;i++){ var t=tcur*i/(N-1), p=c.p(t); rows.push([fmt(t),fmt(p.x),fmt(p.y)]); }
      renderDataRows(dataRows,rows);
    }
    function poly(P,ctx,t0,t1,color,width){
      ctx.save(); var pad=P.pad;
      ctx.beginPath(); ctx.rect(pad.l,pad.t,P.w-pad.l-pad.r,P.h-pad.t-pad.b); ctx.clip();
      ctx.beginPath(); var N=400, c=curves[key];
      for(var i=0;i<=N;i++){ var t=t0+(t1-t0)*i/N, pt=c.p(t);
        if(i===0) ctx.moveTo(P.X(pt.x),P.Y(pt.y)); else ctx.lineTo(P.X(pt.x),P.Y(pt.y)); }
      ctx.strokeStyle=color; ctx.lineWidth=width; ctx.lineJoin='round'; ctx.stroke(); ctx.restore();
    }
    function draw(ctx,w,h){
      var P=new Plot(ctx,w,h,view,{l:30,r:12,t:14,b:26}); P.clear(); P.grid();
      var c=curves[key], tcur=frac*c.tmax;
      poly(P,ctx,0,c.tmax,'#C2CCDA',1.6);
      poly(P,ctx,0,tcur,INDIGO,2.8);
      var pt=c.p(tcur); P.dot(pt.x,pt.y,AMBER2,5.5);
      document.getElementById('paramTv').textContent=fmt(tcur,2);
      document.getElementById('paramPt').textContent='('+fmt(pt.x,2)+', '+fmt(pt.y,2)+')';
      updateDataView(tcur,pt);
    }
    register(canvas,draw);
    sel.addEventListener('change',function(){ key=sel.value; redrawAll(); });
    sl.addEventListener('input',function(){ frac=parseInt(sl.value,10)/100; redrawAll(); });
  })();

  /* ===================== TAYLOR POLYNOMIALS (Calculus) ===================== */
  (function(){
    var canvas=document.getElementById('taylorCanvas'); if(!canvas) return;
    var N=2, view={xmin:-7,xmax:7,ymin:-2.6,ymax:2.6};
    var slider=document.getElementById('taylorN');
    var dataBtn=document.getElementById('taylorDataBtn'), dataPanel=document.getElementById('taylorDataPanel'),
        dataDesc=document.getElementById('taylorDataDesc'), dataRows=document.getElementById('taylorDataRows');
    wireDataToggle(dataBtn,dataPanel);
    function fact(n){ var f=1; for(var i=2;i<=n;i++) f*=i; return f; }
    function taylor(x){ var s=0; for(var k=0;k<N;k++){ s+=Math.pow(-1,k)*Math.pow(x,2*k+1)/fact(2*k+1); } return s; }
    function updateDataView(){
      if(!dataDesc) return;
      dataDesc.textContent='Taylor polynomial for sin(x), degree '+(2*N-1)+' ('+N+' term'+(N===1?'':'s')+'), plotted against the real sin(x).';
      var Nn=9, rows=[];
      for(var i=0;i<Nn;i++){ var x=view.xmin+(view.xmax-view.xmin)*i/(Nn-1); rows.push([fmt(x),fmt(Math.sin(x)),fmt(taylor(x))]); }
      renderDataRows(dataRows,rows);
    }
    function draw(ctx,w,h){
      var P=new Plot(ctx,w,h,view,{l:30,r:12,t:14,b:26}); P.clear(); P.grid();
      P.curve(taylor,AMBER2,2.6);
      P.curve(Math.sin,INDIGO,2.8);
      document.getElementById('taylorNv').textContent=N;
      document.getElementById('taylorDeg').textContent='degree '+(2*N-1);
      updateDataView();
    }
    register(canvas,draw);
    slider.addEventListener('input',function(){ N=parseInt(slider.value,10); redrawAll(); });
  })();

  /* ===================== IGCSE · CIRCLE THEOREMS ===================== */
  (function(){
    var canvas=document.getElementById('circleCanvas'); if(!canvas) return;
    var R=3, Adeg=200, Bdeg=340, frac=0.5;
    var view={xmin:-4,xmax:4,ymin:-4,ymax:4};
    var s=document.getElementById('circleP');
    var dataBtn=document.getElementById('circleDataBtn'), dataPanel=document.getElementById('circleDataPanel'),
        dataDesc=document.getElementById('circleDataDesc'), dataRows=document.getElementById('circleDataRows');
    wireDataToggle(dataBtn,dataPanel);
    function rad(d){ return d*Math.PI/180; }
    function pt(deg){ return {x:R*Math.cos(rad(deg)), y:R*Math.sin(rad(deg))}; }
    function angleAt(vx,vy,p1,p2){
      var a1x=p1.x-vx,a1y=p1.y-vy,a2x=p2.x-vx,a2y=p2.y-vy;
      var c=(a1x*a2x+a1y*a2y)/(Math.hypot(a1x,a1y)*Math.hypot(a2x,a2y));
      c=Math.max(-1,Math.min(1,c));
      return Math.acos(c)*180/Math.PI;
    }
    function updateDataView(O,A,B,Pp,central,inscribed){
      if(!dataDesc) return;
      dataDesc.textContent='Circle of radius '+fmt(R,1)+' centred at O. Chord AB is fixed; P moves around the circle. Central angle AOB = '+fmt(central,0)+'°. Inscribed angle APB = '+fmt(inscribed,0)+'°. (Circle theorem: the inscribed angle is half the central angle — here half of '+fmt(central,0)+'° is '+fmt(central/2,0)+'°.)';
      renderDataRows(dataRows,[
        ['O',fmt(O.x),fmt(O.y)],
        ['A',fmt(A.x),fmt(A.y)],
        ['B',fmt(B.x),fmt(B.y)],
        ['P',fmt(Pp.x),fmt(Pp.y)]
      ]);
    }
    function draw(ctx,w,h){
      var P=new Plot(ctx,w,h,view,{l:22,r:12,t:12,b:20}); P.clear(); P.grid();
      ctx.save(); ctx.beginPath();
      for(var i=0;i<=120;i++){ var a=rad(i*3), X=P.X(R*Math.cos(a)), Y=P.Y(R*Math.sin(a)); if(i===0) ctx.moveTo(X,Y); else ctx.lineTo(X,Y); }
      ctx.strokeStyle='#C2CCDA'; ctx.lineWidth=2; ctx.stroke(); ctx.restore();
      var A=pt(Adeg), B=pt(Bdeg), Pp=pt(Bdeg+(0.05+0.90*frac)*220);
      P.segment(0,0,A.x,A.y,'#9FB0C7',1.6); P.segment(0,0,B.x,B.y,'#9FB0C7',1.6);
      P.segment(Pp.x,Pp.y,A.x,A.y,INDIGO,2.2); P.segment(Pp.x,Pp.y,B.x,B.y,INDIGO,2.2);
      P.dot(A.x,A.y,AMBER2,5); P.dot(B.x,B.y,AMBER2,5); P.dot(Pp.x,Pp.y,INDIGO,5.5); P.dot(0,0,'#9FB0C7',3.5);
      ctx.fillStyle=MUTED; ctx.font='12px ui-sans-serif, system-ui, sans-serif';
      ctx.fillText('A',P.X(A.x)-12,P.Y(A.y)+4); ctx.fillText('B',P.X(B.x)+6,P.Y(B.y)+4);
      ctx.fillText('P',P.X(Pp.x)+6,P.Y(Pp.y)-6); ctx.fillText('O',P.X(0)+6,P.Y(0)-6);
      var central=angleAt(0,0,A,B), inscribed=angleAt(Pp.x,Pp.y,A,B);
      document.getElementById('circleCentral').textContent=central.toFixed(0)+'°';
      document.getElementById('circleInscribed').textContent=inscribed.toFixed(0)+'°';
      updateDataView({x:0,y:0},A,B,Pp,central,inscribed);
    }
    register(canvas,draw);
    s.addEventListener('input',function(){ frac=parseInt(s.value,10)/100; redrawAll(); });
  })();

  /* ===================== IGCSE · RIGHT-TRIANGLE TRIG ===================== */
  (function(){
    var canvas=document.getElementById('trigCanvas'); if(!canvas) return;
    var H=4, deg=35, view={xmin:-0.6,xmax:4.6,ymin:-0.6,ymax:4.6};
    var s=document.getElementById('trigAngle');
    var dataBtn=document.getElementById('trigDataBtn'), dataPanel=document.getElementById('trigDataPanel'),
        dataDesc=document.getElementById('trigDataDesc'), dataRows=document.getElementById('trigDataRows');
    wireDataToggle(dataBtn,dataPanel);
    function updateDataView(adj,opp,r){
      if(!dataDesc) return;
      dataDesc.textContent='Right triangle with angle θ = '+deg+'° and hypotenuse '+fmt(H,1)+'. Opposite = '+fmt(opp,3)+', adjacent = '+fmt(adj,3)+'.';
      renderDataRows(dataRows,[
        ['θ',deg+'°'],
        ['hypotenuse',fmt(H,3)],
        ['adjacent',fmt(adj,3)],
        ['opposite',fmt(opp,3)],
        ['sin θ',fmt(Math.sin(r),3)],
        ['cos θ',fmt(Math.cos(r),3)],
        ['tan θ',fmt(Math.tan(r),3)]
      ]);
    }
    function draw(ctx,w,h){
      var P=new Plot(ctx,w,h,view,{l:22,r:12,t:12,b:20}); P.clear(); P.grid();
      var r=deg*Math.PI/180, adj=H*Math.cos(r), opp=H*Math.sin(r);
      P.segment(0,0,adj,0,INDIGO,2.4);
      P.segment(adj,0,adj,opp,INDIGO,2.4);
      P.segment(0,0,adj,opp,AMBER2,2.6);
      // right-angle marker
      var m=0.22; P.segment(adj-m,0,adj-m,m,'#9FB0C7',1.4); P.segment(adj-m,m,adj,m,'#9FB0C7',1.4);
      P.dot(0,0,INDIGO,4); P.dot(adj,0,INDIGO,4); P.dot(adj,opp,INDIGO,4);
      ctx.fillStyle=MUTED; ctx.font='12px ui-sans-serif, system-ui, sans-serif';
      ctx.fillText('θ',P.X(0.32),P.Y(0.14));
      ctx.fillText('adj',P.X(adj/2)-8,P.Y(-0.18));
      ctx.fillText('opp',P.X(adj)+6,P.Y(opp/2));
      ctx.fillText('hyp',P.X(adj/2)-22,P.Y(opp/2)-2);
      document.getElementById('trigA').textContent=deg+'°';
      document.getElementById('trigSin').textContent=Math.sin(r).toFixed(3);
      document.getElementById('trigCos').textContent=Math.cos(r).toFixed(3);
      document.getElementById('trigTan').textContent=Math.tan(r).toFixed(3);
      updateDataView(adj,opp,r);
    }
    register(canvas,draw);
    s.addEventListener('input',function(){ deg=parseInt(s.value,10); redrawAll(); });
  })();

  /* ===================== IGCSE · TRANSFORMATIONS ===================== */
  (function(){
    var canvas=document.getElementById('igTransCanvas'); if(!canvas) return;
    var T=[[1,1],[3,1],[1,2]];
    var maps={
      rx:{f:function(p){return [p[0],-p[1]];}, rule:'(x, y) → (x, −y)   ·   reflection in the x-axis'},
      ry:{f:function(p){return [-p[0],p[1]];}, rule:'(x, y) → (−x, y)   ·   reflection in the y-axis'},
      ryx:{f:function(p){return [p[1],p[0]];}, rule:'(x, y) → (y, x)   ·   reflection in y = x'},
      r90:{f:function(p){return [-p[1],p[0]];}, rule:'(x, y) → (−y, x)   ·   rotation 90° anticlockwise about O'},
      r180:{f:function(p){return [-p[0],-p[1]];}, rule:'(x, y) → (−x, −y)   ·   rotation 180° about O'},
      e2:{f:function(p){return [2*p[0],2*p[1]];}, rule:'(x, y) → (2x, 2y)   ·   enlargement scale factor 2, centre O'}
    };
    var key='rx', view={xmin:-6.5,xmax:6.5,ymin:-6.5,ymax:6.5};
    var sel=document.getElementById('igTransSel');
    var dataBtn=document.getElementById('igTransDataBtn'), dataPanel=document.getElementById('igTransDataPanel'),
        dataDesc=document.getElementById('igTransDataDesc'), dataRows=document.getElementById('igTransDataRows');
    wireDataToggle(dataBtn,dataPanel);
    function updateDataView(img){
      if(!dataDesc) return;
      dataDesc.textContent='Rule: '+maps[key].rule+'.';
      var rows=[];
      for(var i=0;i<T.length;i++){ rows.push(['vertex '+(i+1),'('+T[i][0]+', '+T[i][1]+')','('+fmt(img[i][0])+', '+fmt(img[i][1])+')']); }
      renderDataRows(dataRows,rows);
    }
    function poly(P,ctx,pts,color,width,dash){
      ctx.save(); ctx.beginPath();
      for(var i=0;i<pts.length;i++){ var X=P.X(pts[i][0]),Y=P.Y(pts[i][1]); if(i===0) ctx.moveTo(X,Y); else ctx.lineTo(X,Y); }
      ctx.closePath(); ctx.strokeStyle=color; ctx.lineWidth=width; if(dash) ctx.setLineDash(dash); ctx.lineJoin='round'; ctx.stroke(); ctx.restore();
    }
    function draw(ctx,w,h){
      var P=new Plot(ctx,w,h,view,{l:22,r:12,t:12,b:20}); P.clear(); P.grid();
      poly(P,ctx,T,'#B7C0CE',1.8,[5,4]);
      var img=T.map(maps[key].f);
      poly(P,ctx,img,INDIGO,2.6,null);
      img.forEach(function(p){ P.dot(p[0],p[1],AMBER2,4.5); });
      document.getElementById('igTransRule').textContent=maps[key].rule;
      updateDataView(img);
    }
    register(canvas,draw);
    sel.addEventListener('change',function(){ key=sel.value; redrawAll(); });
  })();

  /* ===================== ALGEBRA 2 · POLYNOMIAL END BEHAVIOUR ===================== */
  (function(){
    var canvas=document.getElementById('polyCanvas'); if(!canvas) return;
    var avals=[-2,-1,1,2], aIdx=2, deg=3;
    var view={xmin:-3,xmax:3,ymin:-6,ymax:6};
    var selN=document.getElementById('polyDeg'), sA=document.getElementById('polyA');
    var dataBtn=document.getElementById('polyDataBtn'), dataPanel=document.getElementById('polyDataPanel'),
        dataDesc=document.getElementById('polyDataDesc'), dataRows=document.getElementById('polyDataRows');
    wireDataToggle(dataBtn,dataPanel);
    var base={
      2:{f:function(x){return x*x-2;}, s:1.6, tp:1},
      3:{f:function(x){return x*x*x-3*x;}, s:1.4, tp:2},
      4:{f:function(x){return x*x*x*x-4*x*x;}, s:0.7, tp:3},
      5:{f:function(x){return Math.pow(x,5)-5*x*x*x+4*x;}, s:0.45, tp:4}
    };
    function updateDataView(f,a,right,left){
      if(!dataDesc) return;
      dataDesc.textContent='Degree '+deg+' polynomial, leading coefficient sign a = '+(a>0?'positive':'negative')+'. As x → +∞, '+right+'. As x → −∞, '+left+'.';
      var N=9, rows=[];
      for(var i=0;i<N;i++){ var x=view.xmin+(view.xmax-view.xmin)*i/(N-1); rows.push([fmt(x),fmt(f(x))]); }
      renderDataRows(dataRows,rows);
    }
    function draw(ctx,w,h){
      var P=new Plot(ctx,w,h,view,{l:26,r:12,t:12,b:22}); P.clear(); P.grid();
      var a=avals[aIdx], b=base[deg];
      var f=function(x){ return a*b.s*b.f(x); };
      P.curve(f, INDIGO, 2.8);
      var right=a>0?'y → +∞':'y → −∞';
      var left=(deg%2===0)?right:(a>0?'y → −∞':'y → +∞');
      document.getElementById('polyAv').textContent=a;
      document.getElementById('polyEndR').textContent=right;
      document.getElementById('polyEndL').textContent=left;
      document.getElementById('polyTp').textContent=b.tp;
      updateDataView(f,a,right,left);
    }
    register(canvas,draw);
    selN.addEventListener('change',function(){ deg=parseInt(selN.value,10); redrawAll(); });
    sA.addEventListener('input',function(){ aIdx=parseInt(sA.value,10); redrawAll(); });
  })();

  /* ===================== ALGEBRA 2 · RATIONAL FUNCTION & ASYMPTOTES ===================== */
  (function(){
    var canvas=document.getElementById('ratCanvas'); if(!canvas) return;
    var hh=1, kk=0, view={xmin:-6,xmax:6,ymin:-6,ymax:6};
    var sH=document.getElementById('ratH'), sK=document.getElementById('ratK');
    var dataBtn=document.getElementById('ratDataBtn'), dataPanel=document.getElementById('ratDataPanel'),
        dataDesc=document.getElementById('ratDataDesc'), dataRows=document.getElementById('ratDataRows');
    wireDataToggle(dataBtn,dataPanel);
    function updateDataView(f,eq){
      if(!dataDesc) return;
      dataDesc.textContent='Function '+eq+'. Vertical asymptote x = '+hh+'. Horizontal asymptote y = '+kk+'.';
      var N=9, rows=[];
      for(var i=0;i<N;i++){ var x=view.xmin+(view.xmax-view.xmin)*i/(N-1); var y=f(x); rows.push([fmt(x), isFinite(y)?fmt(y):'undefined (asymptote)']); }
      renderDataRows(dataRows,rows);
    }
    function draw(ctx,w,h){
      var P=new Plot(ctx,w,h,view,{l:26,r:12,t:12,b:22}); P.clear(); P.grid();
      P.vline(hh, AMBER2, [5,4]);
      P.segment(view.xmin,kk,view.xmax,kk, AMBER2,1.4,[5,4]);
      var f=function(x){ return (Math.abs(x-hh)<0.07)?NaN:1/(x-hh)+kk; };
      P.curve(f, INDIGO, 2.6);
      var den=hh>=0?('x − '+hh):('x + '+(-hh));
      var ks=kk===0?'':(kk>0?(' + '+kk):(' − '+(-kk)));
      var eq='y = 1 / ('+den+')'+ks;
      document.getElementById('ratVA').textContent='x = '+hh;
      document.getElementById('ratHA').textContent='y = '+kk;
      document.getElementById('ratEq').textContent=eq;
      updateDataView(f,eq);
    }
    register(canvas,draw);
    sH.addEventListener('input',function(){ hh=parseInt(sH.value,10); redrawAll(); });
    sK.addEventListener('input',function(){ kk=parseInt(sK.value,10); redrawAll(); });
  })();

  /* ===================== ALGEBRA 2 · CONIC SECTIONS ===================== */
  (function(){
    var canvas=document.getElementById('conicCanvas'); if(!canvas) return;
    var kind='ellipse', p=3, view={xmin:-6,xmax:6,ymin:-6,ymax:6};
    var sel=document.getElementById('conicSel'), sP=document.getElementById('conicP');
    var dataBtn=document.getElementById('conicDataBtn'), dataPanel=document.getElementById('conicDataPanel'),
        dataDesc=document.getElementById('conicDataDesc'), dataRows=document.getElementById('conicDataRows');
    wireDataToggle(dataBtn,dataPanel);
    function updateDataView(eq){
      if(!dataDesc) return;
      var KIND_LABEL={circle:'Circle',ellipse:'Ellipse',parabola:'Parabola',hyperbola:'Hyperbola'};
      dataDesc.textContent=KIND_LABEL[kind]+': '+eq+'. Sampled points on the curve:';
      var rows=[], i, t;
      if(kind==='circle'){ var r=p; for(i=0;i<12;i++){ t=i/12*2*Math.PI; rows.push([fmt(r*Math.cos(t)),fmt(r*Math.sin(t))]); } }
      else if(kind==='ellipse'){ var a=4,b=p; for(i=0;i<12;i++){ t=i/12*2*Math.PI; rows.push([fmt(a*Math.cos(t)),fmt(b*Math.sin(t))]); } }
      else if(kind==='parabola'){ var c=p; for(i=0;i<9;i++){ var x=-5.6+11.2*i/8; rows.push([fmt(x),fmt(x*x/(2*c))]); } }
      else { var ah=2,bh=p; for(i=0;i<6;i++){ var u=-1.7+3.4*i/5; rows.push([fmt(-ah*Math.cosh(u)),fmt(bh*Math.sinh(u))]); } for(i=0;i<6;i++){ var u2=-1.7+3.4*i/5; rows.push([fmt(ah*Math.cosh(u2)),fmt(bh*Math.sinh(u2))]); } }
      renderDataRows(dataRows,rows);
    }
    function path(P,ctx,pts){ ctx.beginPath(); for(var i=0;i<pts.length;i++){ var X=P.X(pts[i][0]),Y=P.Y(pts[i][1]); if(i===0)ctx.moveTo(X,Y); else ctx.lineTo(X,Y);} }
    function draw(ctx,w,h){
      var P=new Plot(ctx,w,h,view,{l:26,r:12,t:12,b:22}); P.clear(); P.grid();
      ctx.save();
      ctx.beginPath(); ctx.rect(P.pad.l,P.pad.t,w-P.pad.l-P.pad.r,h-P.pad.t-P.pad.b); ctx.clip();
      ctx.strokeStyle=INDIGO; ctx.lineWidth=2.6; ctx.lineJoin='round';
      var eq='', i, t, pts;
      if(kind==='circle'){ var r=p; pts=[]; for(t=0;t<=360;t+=3) pts.push([r*Math.cos(t*Math.PI/180), r*Math.sin(t*Math.PI/180)]); path(P,ctx,pts); ctx.closePath(); ctx.stroke(); eq='x² + y² = '+(r*r); ctx.restore(); P.dot(0,0,AMBER2,4); }
      else if(kind==='ellipse'){ var a=4,b=p; pts=[]; for(t=0;t<=360;t+=3) pts.push([a*Math.cos(t*Math.PI/180), b*Math.sin(t*Math.PI/180)]); path(P,ctx,pts); ctx.closePath(); ctx.stroke(); eq='x²/'+(a*a)+' + y²/'+(b*b)+' = 1'; ctx.restore(); P.dot(a,0,AMBER2,4); P.dot(-a,0,AMBER2,4); P.dot(0,b,AMBER2,4); P.dot(0,-b,AMBER2,4); }
      else if(kind==='parabola'){ var c=p; pts=[]; for(var x=-5.6;x<=5.6;x+=0.1) pts.push([x, x*x/(2*c)]); path(P,ctx,pts); ctx.stroke(); eq='y = x² / '+(2*c); ctx.restore(); P.dot(0,0,AMBER2,4); }
      else { var ah=2,bh=p, L=[], Rr=[], u; for(u=-1.7;u<=1.7;u+=0.05){ L.push([-ah*Math.cosh(u), bh*Math.sinh(u)]); Rr.push([ah*Math.cosh(u), bh*Math.sinh(u)]); } path(P,ctx,L); ctx.stroke(); path(P,ctx,Rr); ctx.stroke(); eq='x²/'+(ah*ah)+' − y²/'+(bh*bh)+' = 1'; ctx.restore(); P.dot(ah,0,AMBER2,4); P.dot(-ah,0,AMBER2,4); }
      document.getElementById('conicEq').textContent=eq;
      updateDataView(eq);
    }
    register(canvas,draw);
    sel.addEventListener('change',function(){ kind=sel.value; redrawAll(); });
    sP.addEventListener('input',function(){ p=parseInt(sP.value,10); redrawAll(); });
  })();

  /* ===================== GEOMETRY · PARALLEL LINES & TRANSVERSAL ===================== */
  (function(){
    var canvas=document.getElementById('geoParCanvas'); if(!canvas) return;
    var deg=55, view={xmin:-6,xmax:6,ymin:-4,ymax:4};
    var s=document.getElementById('geoParA');
    var dataBtn=document.getElementById('geoParDataBtn'), dataPanel=document.getElementById('geoParDataPanel'),
        dataDesc=document.getElementById('geoParDataDesc'), dataRows=document.getElementById('geoParDataRows');
    wireDataToggle(dataBtn,dataPanel);
    function updateDataView(){
      if(!dataDesc) return;
      dataDesc.textContent='A transversal crosses two parallel lines at angle '+deg+'° to them. By the parallel-line angle theorems, both intersections share the same acute angle ('+deg+'°) and the same obtuse angle ('+(180-deg)+'°) — corresponding angles are equal, and each pair is supplementary.';
      renderDataRows(dataRows,[
        ['top line',deg+'°',(180-deg)+'°'],
        ['bottom line',deg+'°',(180-deg)+'°']
      ]);
    }
    function draw(ctx,w,h){
      var P=new Plot(ctx,w,h,view,{l:18,r:12,t:12,b:18}); P.clear(); P.grid();
      var yT=1.6, yB=-1.6;
      P.segment(-6,yT,6,yT,'#9FB0C7',2); P.segment(-6,yB,6,yB,'#9FB0C7',2);
      var m=Math.tan(deg*Math.PI/180);
      // transversal through origin, slope m: x = y/m
      var x1=(4)/m, x2=(-4)/m;
      P.segment(x2,-4,x1,4,INK,2.4);
      var xT=yT/m, xB=yB/m;
      P.dot(xT,yT,AMBER2,5); P.dot(xB,yB,AMBER2,5);
      ctx.fillStyle=MUTED; ctx.font='12px ui-sans-serif, system-ui, sans-serif';
      ctx.fillText(deg+'°', P.X(xT)+8, P.Y(yT)-6);
      ctx.fillText(deg+'°', P.X(xB)+8, P.Y(yB)-6);
      document.getElementById('geoParAcute').textContent=deg+'°';
      document.getElementById('geoParObtuse').textContent=(180-deg)+'°';
      updateDataView();
    }
    register(canvas,draw);
    s.addEventListener('input',function(){ deg=parseInt(s.value,10); redrawAll(); });
  })();

  /* ===================== GEOMETRY · TRIANGLE ANGLE SUM ===================== */
  (function(){
    var canvas=document.getElementById('geoTriCanvas'); if(!canvas) return;
    var cx=0, view={xmin:-4,xmax:4,ymin:-2.4,ymax:2.8};
    var s=document.getElementById('geoTriX');
    var dataBtn=document.getElementById('geoTriDataBtn'), dataPanel=document.getElementById('geoTriDataPanel'),
        dataDesc=document.getElementById('geoTriDataDesc'), dataRows=document.getElementById('geoTriDataRows');
    wireDataToggle(dataBtn,dataPanel);
    function ang(p,q,r){ // angle at p
      var u=[q[0]-p[0],q[1]-p[1]], v=[r[0]-p[0],r[1]-p[1]];
      var c=(u[0]*v[0]+u[1]*v[1])/(Math.hypot(u[0],u[1])*Math.hypot(v[0],v[1]));
      return Math.acos(Math.max(-1,Math.min(1,c)))*180/Math.PI;
    }
    function updateDataView(A,B,C,a,b,c){
      if(!dataDesc) return;
      dataDesc.textContent='Triangle with vertices A, B, C. Interior angles: '+Math.round(a)+'° + '+Math.round(b)+'° + '+Math.round(c)+'° = '+Math.round(a+b+c)+'° (the Triangle Angle Sum Theorem: always 180°).';
      renderDataRows(dataRows,[
        ['A','('+fmt(A[0])+', '+fmt(A[1])+')',Math.round(a)+'°'],
        ['B','('+fmt(B[0])+', '+fmt(B[1])+')',Math.round(b)+'°'],
        ['C','('+fmt(C[0])+', '+fmt(C[1])+')',Math.round(c)+'°']
      ]);
    }
    function draw(ctx,w,h){
      var P=new Plot(ctx,w,h,view,{l:18,r:12,t:12,b:18}); P.clear(); P.grid();
      var A=[-2.4,-1.2], B=[2.4,-1.2], C=[cx,1.9];
      P.segment(A[0],A[1],B[0],B[1],INDIGO,2.4);
      P.segment(B[0],B[1],C[0],C[1],INDIGO,2.4);
      P.segment(C[0],C[1],A[0],A[1],INDIGO,2.4);
      P.dot(A[0],A[1],AMBER2,5); P.dot(B[0],B[1],AMBER2,5); P.dot(C[0],C[1],AMBER2,5);
      var a=ang(A,B,C), b=ang(B,A,C), c=ang(C,A,B);
      ctx.fillStyle=MUTED; ctx.font='12px ui-sans-serif, system-ui, sans-serif';
      ctx.fillText(Math.round(a)+'°', P.X(A[0])+6, P.Y(A[1])-6);
      ctx.fillText(Math.round(b)+'°', P.X(B[0])-22, P.Y(B[1])-6);
      ctx.fillText(Math.round(c)+'°', P.X(C[0])-8, P.Y(C[1])+16);
      document.getElementById('geoTriA').textContent=Math.round(a)+'°';
      document.getElementById('geoTriB').textContent=Math.round(b)+'°';
      document.getElementById('geoTriC').textContent=Math.round(c)+'°';
      document.getElementById('geoTriSum').textContent=Math.round(a+b+c)+'°';
      updateDataView(A,B,C,a,b,c);
    }
    register(canvas,draw);
    s.addEventListener('input',function(){ cx=parseInt(s.value,10)/10; redrawAll(); });
  })();

  /* ===================== GEOMETRY · PYTHAGORAS (SQUARES) ===================== */
  (function(){
    var canvas=document.getElementById('geoPythCanvas'); if(!canvas) return;
    var a=3, b=4, view={xmin:-4.5,xmax:8.5,ymin:-4.5,ymax:8.5};
    var sa=document.getElementById('geoPa'), sb=document.getElementById('geoPb');
    var dataBtn=document.getElementById('geoPythDataBtn'), dataPanel=document.getElementById('geoPythDataPanel'),
        dataDesc=document.getElementById('geoPythDataDesc'), dataRows=document.getElementById('geoPythDataRows');
    wireDataToggle(dataBtn,dataPanel);
    function updateDataView(){
      var cSq=a*a+b*b, cLen=Math.sqrt(cSq);
      if(!dataDesc) return;
      dataDesc.textContent='Right triangle with legs a = '+a+' and b = '+b+'. a² + b² = '+(a*a)+' + '+(b*b)+' = '+cSq+' = c², so c = '+fmt(cLen,3)+'.';
      renderDataRows(dataRows,[
        ['a',a],['b',b],['a²',a*a],['b²',b*b],['a² + b²',cSq],['c (= √(a²+b²))',fmt(cLen,3)],['c²',cSq]
      ]);
    }
    function fillpoly(P,ctx,pts,stroke,fill){
      ctx.save(); ctx.beginPath();
      for(var i=0;i<pts.length;i++){ var X=P.X(pts[i][0]),Y=P.Y(pts[i][1]); if(i===0) ctx.moveTo(X,Y); else ctx.lineTo(X,Y); }
      ctx.closePath(); if(fill){ ctx.fillStyle=fill; ctx.fill(); } ctx.strokeStyle=stroke; ctx.lineWidth=2; ctx.lineJoin='round'; ctx.stroke(); ctx.restore();
    }
    function draw(ctx,w,h){
      var P=new Plot(ctx,w,h,view,{l:18,r:12,t:12,b:18}); P.clear(); P.grid();
      // square on horizontal leg (below)
      fillpoly(P,ctx,[[0,0],[a,0],[a,-a],[0,-a]],'#9FB0C7','rgba(184,128,31,0.10)');
      // square on vertical leg (left)
      fillpoly(P,ctx,[[0,0],[0,b],[-b,b],[-b,0]],'#9FB0C7','rgba(184,128,31,0.10)');
      // square on hypotenuse
      fillpoly(P,ctx,[[a,0],[0,b],[b,a+b],[a+b,a]],INDIGO,'rgba(30,58,110,0.10)');
      // triangle
      fillpoly(P,ctx,[[0,0],[a,0],[0,b]],INK,null);
      P.dot(0,0,INK,3.5);
      ctx.fillStyle=MUTED; ctx.font='12px ui-sans-serif, system-ui, sans-serif';
      ctx.fillText('a²='+(a*a), P.X(a/2)-14, P.Y(-a/2));
      ctx.fillText('b²='+(b*b), P.X(-b/2)-10, P.Y(b/2));
      ctx.fillText('c²='+(a*a+b*b), P.X((a+b)/2)+4, P.Y((a+b)/2)+6);
      document.getElementById('geoPa2').textContent=(a*a);
      document.getElementById('geoPb2').textContent=(b*b);
      document.getElementById('geoPc2').textContent=(a*a+b*b);
      updateDataView();
    }
    function upd(){ a=parseInt(sa.value,10); b=parseInt(sb.value,10);
      document.getElementById('geoPav').textContent=a; document.getElementById('geoPbv').textContent=b; redrawAll(); }
    register(canvas,draw);
    sa.addEventListener('input',upd); sb.addEventListener('input',upd);
  })();

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

  /* ===================== TAHSILI · TRIG WAVE ===================== */
  (function(){
    var canvas=document.getElementById('tahWaveCanvas'); if(!canvas) return;
    var A=2, B=1, sa=document.getElementById('tahAmp'), sb=document.getElementById('tahFreq');
    var view={xmin:-6.5,xmax:6.5,ymin:-3.4,ymax:3.4};
    var dataBtn=document.getElementById('tahWaveDataBtn'), dataPanel=document.getElementById('tahWaveDataPanel'),
        dataDesc=document.getElementById('tahWaveDataDesc'), dataRows=document.getElementById('tahWaveDataRows');
    wireDataToggle(dataBtn,dataPanel);
    function updateDataView(f,period){
      if(!dataDesc) return;
      dataDesc.textContent='Function y = '+A+' sin('+B+'x). Amplitude = '+A+'. Period = 2π/'+B+' = '+fmt(period,2)+'.';
      var N=9, rows=[];
      for(var i=0;i<N;i++){ var x=view.xmin+(view.xmax-view.xmin)*i/(N-1); rows.push([fmt(x),fmt(f(x))]); }
      renderDataRows(dataRows,rows);
    }
    function draw(ctx,w,h){
      var P=new Plot(ctx,w,h,view,{l:22,r:12,t:12,b:18}); P.clear(); P.grid();
      P.segment(view.xmin,A,view.xmax,A,AMBER2,1.2,[5,4]);
      P.segment(view.xmin,-A,view.xmax,-A,AMBER2,1.2,[5,4]);
      var f=function(x){return A*Math.sin(B*x);};
      P.curve(f, INDIGO, 2.6);
      document.getElementById('tahWAmp').textContent=A;
      var period=2*Math.PI/B;
      document.getElementById('tahWPeriod').textContent=period.toFixed(2);
      updateDataView(f,period);
    }
    function upd(){ A=parseInt(sa.value,10); B=parseInt(sb.value,10);
      document.getElementById('tahAmpV').textContent=A; document.getElementById('tahFreqV').textContent=B; redrawAll(); }
    register(canvas,draw); sa.addEventListener('input',upd); sb.addEventListener('input',upd);
  })();

  /* ===================== TAHSILI · FUNCTION TRANSFORMATION ===================== */
  (function(){
    var canvas=document.getElementById('tahTransCanvas'); if(!canvas) return;
    var hh=0, kk=0, sh=document.getElementById('tahH'), sk=document.getElementById('tahK');
    var view={xmin:-8,xmax:8,ymin:-5,ymax:7};
    var dataBtn=document.getElementById('tahTransDataBtn'), dataPanel=document.getElementById('tahTransDataPanel'),
        dataDesc=document.getElementById('tahTransDataDesc'), dataRows=document.getElementById('tahTransDataRows');
    wireDataToggle(dataBtn,dataPanel);
    function updateDataView(base,g){
      if(!dataDesc) return;
      dataDesc.textContent='g(x) = |x − '+hh+'| + '+kk+'. Vertex at ('+hh+', '+kk+').';
      var N=9, rows=[];
      for(var i=0;i<N;i++){ var x=view.xmin+(view.xmax-view.xmin)*i/(N-1); rows.push([fmt(x),fmt(base(x)),fmt(g(x))]); }
      renderDataRows(dataRows,rows);
    }
    function draw(ctx,w,h){
      var P=new Plot(ctx,w,h,view,{l:22,r:12,t:12,b:18}); P.clear(); P.grid();
      var base=function(x){return Math.abs(x-0)+0;};
      P.curve(base, '#C2CCDA', 1.6);
      var g=function(x){return Math.abs(x-hh)+kk;};
      P.curve(g, INDIGO, 2.6);
      P.dot(hh,kk,AMBER2,5);
      document.getElementById('tahVertex').textContent='('+hh+', '+kk+')';
      updateDataView(base,g);
    }
    function upd(){ hh=parseInt(sh.value,10); kk=parseInt(sk.value,10);
      document.getElementById('tahHV').textContent=hh; document.getElementById('tahKV').textContent=kk; redrawAll(); }
    register(canvas,draw); sh.addEventListener('input',upd); sk.addEventListener('input',upd);
  })();

  /* ===================== TAHSILI · SECANT → TANGENT ===================== */
  (function(){
    var canvas=document.getElementById('tahDerivCanvas'); if(!canvas) return;
    var dh=2, s=document.getElementById('tahDh');
    var view={xmin:-0.6,xmax:3.4,ymin:-1,ymax:9.6};
    var dataBtn=document.getElementById('tahDerivDataBtn'), dataPanel=document.getElementById('tahDerivDataPanel'),
        dataDesc=document.getElementById('tahDerivDataDesc'), dataRows=document.getElementById('tahDerivDataRows');
    wireDataToggle(dataBtn,dataPanel);
    function f(x){ return x*x; }
    function updateDataView(a,b,m){
      if(!dataDesc) return;
      dataDesc.textContent='f(x) = x². Secant through a = '+a+' and a+h = '+fmt(b,2)+' (h = '+fmt(dh,2)+') has slope '+fmt(m,2)+'. As h → 0, this slope approaches the tangent slope f′(1) = 2.';
      var N=9, rows=[];
      for(var i=0;i<N;i++){ var x=view.xmin+(view.xmax-view.xmin)*i/(N-1); rows.push([fmt(x),fmt(f(x))]); }
      renderDataRows(dataRows,rows);
    }
    function draw(ctx,w,h){
      var P=new Plot(ctx,w,h,view,{l:24,r:12,t:12,b:18}); P.clear(); P.grid();
      P.curve(f, INDIGO, 2.6);
      // tangent at x=1 (slope 2) for reference
      P.segment(view.xmin, 1+2*(view.xmin-1), view.xmax, 1+2*(view.xmax-1), '#C2CCDA', 1.4, [5,4]);
      var a=1, b=a+dh, m=(f(b)-f(a))/dh;
      // secant line through (a,f(a)) and (b,f(b))
      P.segment(view.xmin, f(a)+m*(view.xmin-a), view.xmax, f(a)+m*(view.xmax-a), INK, 2);
      P.dot(a,f(a),AMBER2,5); P.dot(b,f(b),AMBER2,5);
      document.getElementById('tahSecSlope').textContent=m.toFixed(2);
      updateDataView(a,b,m);
    }
    register(canvas,draw);
    s.addEventListener('input',function(){ dh=parseFloat(s.value); document.getElementById('tahDhV').textContent=dh.toFixed(2); redrawAll(); });
  })();

  /* ===================== AP AB · FUNCTION & ITS DERIVATIVE ===================== */
  (function(){
    var canvas=document.getElementById('apDerivCanvas'); if(!canvas) return;
    var xv=1, s=document.getElementById('apDerivX');
    var view={xmin:-2.8,xmax:2.8,ymin:-4,ymax:6};
    var dataBtn=document.getElementById('apDerivDataBtn'), dataPanel=document.getElementById('apDerivDataPanel'),
        dataDesc=document.getElementById('apDerivDataDesc'), dataRows=document.getElementById('apDerivDataRows');
    wireDataToggle(dataBtn,dataPanel);
    function f(x){ return x*x*x/3 - x; }
    function fp(x){ return x*x - 1; }
    function updateDataView(){
      if(!dataDesc) return;
      dataDesc.textContent='Function f(x) = x³/3 − x, with its derivative f′(x) = x² − 1 plotted alongside it. At x = '+fmt(xv,2)+', f(x) = '+fmt(f(xv),2)+' and f′(x) = '+fmt(fp(xv),2)+'.';
      var N=9, rows=[];
      for(var i=0;i<N;i++){ var x=view.xmin+(view.xmax-view.xmin)*i/(N-1); rows.push([fmt(x),fmt(f(x)),fmt(fp(x))]); }
      renderDataRows(dataRows,rows);
    }
    function draw(ctx,w,h){
      var P=new Plot(ctx,w,h,view,{l:26,r:12,t:12,b:20}); P.clear(); P.grid();
      P.curve(f, INDIGO, 2.6);
      P.curve(fp, AMBER2, 2.2);
      P.vline(xv, '#9FB0C7', [4,4]);
      var m=fp(xv);
      P.segment(xv-0.85, f(xv)-m*0.85, xv+0.85, f(xv)+m*0.85, INDIGO2, 2);
      P.dot(xv, f(xv), INDIGO, 5);
      P.dot(xv, fp(xv), AMBER2, 5);
      document.getElementById('apDerivFx').textContent=f(xv).toFixed(2);
      document.getElementById('apDerivSlope').textContent=m.toFixed(2);
      updateDataView();
    }
    register(canvas,draw);
    s.addEventListener('input',function(){ xv=parseFloat(s.value); document.getElementById('apDerivXV').textContent=xv.toFixed(1); redrawAll(); });
  })();

  /* ===================== AP AB · MEAN VALUE THEOREM ===================== */
  (function(){
    var canvas=document.getElementById('apMvtCanvas'); if(!canvas) return;
    var bb=6, s=document.getElementById('apMvtB');
    var view={xmin:-0.6,xmax:8.6,ymin:-1.6,ymax:3.6};
    var dataBtn=document.getElementById('apMvtDataBtn'), dataPanel=document.getElementById('apMvtDataPanel'),
        dataDesc=document.getElementById('apMvtDataDesc'), dataRows=document.getElementById('apMvtDataRows');
    wireDataToggle(dataBtn,dataPanel);
    function f(x){ return -0.15*x*x + x + 1; }
    function fp(x){ return -0.3*x + 1; }
    function updateDataView(a,m,c){
      if(!dataDesc) return;
      dataDesc.textContent='Curve f(x) = −0.15x² + x + 1 on [0, '+fmt(bb,2)+']. Secant slope = (f(b)−f(a))/(b−a) = '+fmt(m,2)+'. By the Mean Value Theorem, f′(c) = '+fmt(m,2)+' at c = '+fmt(c,2)+' (confirmed: f′(c) = '+fmt(fp(c),2)+').';
      var N=9, rows=[];
      for(var i=0;i<N;i++){ var x=a+(bb-a)*i/(N-1); rows.push([fmt(x),fmt(f(x))]); }
      renderDataRows(dataRows,rows);
    }
    function draw(ctx,w,h){
      var P=new Plot(ctx,w,h,view,{l:24,r:12,t:12,b:20}); P.clear(); P.grid();
      P.curve(f, INDIGO, 2.6);
      var a=0, m=(f(bb)-f(a))/(bb-a), c=bb/2; // quadratic: MVT point is midpoint
      P.segment(a, f(a), bb, f(bb), AMBER2, 2);          // secant
      P.segment(c-1.6, f(c)-m*1.6, c+1.6, f(c)+m*1.6, INDIGO2, 2.4, [6,4]); // parallel tangent
      P.dot(a,f(a),AMBER2,5); P.dot(bb,f(bb),AMBER2,5);
      P.ring(c,f(c),INDIGO,6);
      document.getElementById('apMvtSlope').textContent=m.toFixed(2);
      document.getElementById('apMvtC').textContent=c.toFixed(2);
      updateDataView(a,m,c);
    }
    register(canvas,draw);
    s.addEventListener('input',function(){ bb=parseFloat(s.value); document.getElementById('apMvtBV').textContent=bb; redrawAll(); });
  })();

  /* ===================== AP AB · RIEMANN SUMS ===================== */
  (function(){
    var canvas=document.getElementById('apRiemCanvas'); if(!canvas) return;
    var n=6, type='left', sn=document.getElementById('apRiemN'), st=document.getElementById('apRiemType');
    var a=0,b=4, view={xmin:-0.4,xmax:4.4,ymin:-0.6,ymax:8};
    var dataBtn=document.getElementById('apRiemDataBtn'), dataPanel=document.getElementById('apRiemDataPanel'),
        dataDesc=document.getElementById('apRiemDataDesc'), dataRows=document.getElementById('apRiemDataRows');
    wireDataToggle(dataBtn,dataPanel);
    function f(x){ return 0.4*x*x + 1; }
    var exact=0.4*Math.pow(b,3)/3 + (b-a); // ∫0^4 (0.4x^2+1) dx
    var TYPE_NAME={ left:'Left', right:'Right', mid:'Midpoint' };
    function updateDataView(approx){
      if(!dataDesc) return;
      var dx=(b-a)/n;
      dataDesc.textContent='Function f(x) = 0.4x² + 1 on ['+a+', '+b+'], partitioned into '+n+' rectangles of width '+fmt(dx,3)+' using the '+TYPE_NAME[type]+' rule. Approximate sum ≈ '+fmt(approx,3)+'. Exact value = '+fmt(exact,3)+' (error '+fmt(Math.abs(exact-approx),3)+').';
      var rows=[];
      for(var i=0;i<n;i++){
        var xl=a+i*dx, xr=xl+dx, xs= type==='left'?xl : (type==='right'?xr : xl+dx/2);
        var hh=f(xs);
        rows.push([(i+1),'['+fmt(xl)+', '+fmt(xr)+']',fmt(xs),fmt(hh),fmt(hh*dx)]);
      }
      renderDataRows(dataRows,rows);
    }
    function draw(ctx,w,h){
      var P=new Plot(ctx,w,h,view,{l:24,r:12,t:12,b:20}); P.clear(); P.grid();
      var dx=(b-a)/n, approx=0;
      for(var i=0;i<n;i++){
        var xl=a+i*dx, xs= type==='left'?xl : (type==='right'?xl+dx : xl+dx/2);
        var hh=f(xs); approx+=hh*dx;
        var X0=P.X(xl), X1=P.X(xl+dx), Y0=P.Y(0), Y1=P.Y(hh);
        ctx.fillStyle='rgba(184,128,31,0.18)'; ctx.fillRect(X0, Y1, X1-X0, Y0-Y1);
        ctx.strokeStyle=AMBER2; ctx.lineWidth=1; ctx.strokeRect(X0, Y1, X1-X0, Y0-Y1);
      }
      P.curve(f, INDIGO, 2.6);
      document.getElementById('apRiemApprox').textContent=approx.toFixed(3);
      document.getElementById('apRiemExact').textContent=exact.toFixed(3);
      updateDataView(approx);
    }
    register(canvas,draw);
    sn.addEventListener('input',function(){ n=parseInt(sn.value,10); document.getElementById('apRiemNV').textContent=n; redrawAll(); });
    st.addEventListener('change',function(){ type=st.value; redrawAll(); });
  })();

  /* ===================== AP BC · POLAR ROSE ===================== */
  (function(){
    var canvas=document.getElementById('bcPolarCanvas'); if(!canvas) return;
    var k=3, s=document.getElementById('bcPolarK');
    var view={xmin:-1.3,xmax:1.3,ymin:-1.3,ymax:1.3};
    var dataBtn=document.getElementById('bcPolarDataBtn'), dataPanel=document.getElementById('bcPolarDataPanel'),
        dataDesc=document.getElementById('bcPolarDataDesc'), dataRows=document.getElementById('bcPolarDataRows');
    wireDataToggle(dataBtn,dataPanel);
    function updateDataView(petals){
      if(!dataDesc) return;
      dataDesc.textContent='Polar rose r = sin('+k+'θ), k = '+k+' ('+(k%2===1?'odd':'even')+'), giving '+petals+' petals. Sampled every 30° around one full turn:';
      var N=12, rows=[];
      for(var i=0;i<N;i++){ var th=i/N*2*Math.PI, r=Math.sin(k*th); rows.push([fmt(th),fmt(r),'('+fmt(r*Math.cos(th))+', '+fmt(r*Math.sin(th))+')']); }
      renderDataRows(dataRows,rows);
    }
    function draw(ctx,w,h){
      var P=new Plot(ctx,w,h,view,{l:18,r:12,t:12,b:18}); P.clear(); P.grid();
      ctx.beginPath();
      for(var i=0;i<=720;i++){ var th=i/720*2*Math.PI, r=Math.sin(k*th); var X=P.X(r*Math.cos(th)), Y=P.Y(r*Math.sin(th)); if(i===0)ctx.moveTo(X,Y); else ctx.lineTo(X,Y); }
      ctx.strokeStyle=INDIGO; ctx.lineWidth=2.2; ctx.lineJoin='round'; ctx.stroke();
      var petals=(k%2===1? k : 2*k);
      document.getElementById('bcPolarPetals').textContent=petals;
      updateDataView(petals);
    }
    register(canvas,draw);
    s.addEventListener('input',function(){ k=parseInt(s.value,10); document.getElementById('bcPolarKV').textContent=k; redrawAll(); });
  })();

  /* ===================== AP BC · SERIES PARTIAL SUMS ===================== */
  (function(){
    var canvas=document.getElementById('bcSeriesCanvas'); if(!canvas) return;
    var N=4, s=document.getElementById('bcSeriesN');
    var view={xmin:0,xmax:13,ymin:0,ymax:1.2};
    var dataBtn=document.getElementById('bcSeriesDataBtn'), dataPanel=document.getElementById('bcSeriesDataPanel'),
        dataDesc=document.getElementById('bcSeriesDataDesc'), dataRows=document.getElementById('bcSeriesDataRows');
    wireDataToggle(dataBtn,dataPanel);
    function S(n){ return 1-Math.pow(0.5,n); }
    function updateDataView(){
      if(!dataDesc) return;
      dataDesc.textContent='Series Σ(1/2)ⁿ, partial sums S(n) = 1 − (1/2)ⁿ. Limit as n→∞ is 1. At n = '+N+', S(n) = '+fmt(S(N),4)+' (distance from limit: '+fmt(1-S(N),4)+').';
      var rows=[];
      for(var nn=1;nn<=N;nn++){ rows.push([nn,fmt(S(nn),4)]); }
      renderDataRows(dataRows,rows);
    }
    function draw(ctx,w,h){
      var P=new Plot(ctx,w,h,view,{l:26,r:12,t:12,b:20}); P.clear(); P.grid();
      P.segment(0,1,13,1, AMBER2, 1.6, [6,4]); // limit
      var prevX=null, prevY=null;
      for(var nn=1;nn<=N;nn++){ var y=S(nn);
        if(prevX!==null) P.segment(prevX,prevY,nn,y,INDIGO2,1.6);
        P.dot(nn,y,INDIGO,4); prevX=nn; prevY=y;
      }
      document.getElementById('bcSeriesSn').textContent=S(N).toFixed(4);
      updateDataView();
    }
    register(canvas,draw);
    s.addEventListener('input',function(){ N=parseInt(s.value,10); document.getElementById('bcSeriesNV').textContent=N; redrawAll(); });
  })();

  /* ===================== AP BC · TAYLOR POLYNOMIAL ===================== */
  (function(){
    var canvas=document.getElementById('bcTaylorCanvas'); if(!canvas) return;
    var terms=3, s=document.getElementById('bcTaylorN');
    var view={xmin:-6.6,xmax:6.6,ymin:-2.4,ymax:2.4};
    var dataBtn=document.getElementById('bcTaylorDataBtn'), dataPanel=document.getElementById('bcTaylorDataPanel'),
        dataDesc=document.getElementById('bcTaylorDataDesc'), dataRows=document.getElementById('bcTaylorDataRows');
    wireDataToggle(dataBtn,dataPanel);
    function fact(k){ var r=1; for(var i=2;i<=k;i++) r*=i; return r; }
    function T(x){ var sum=0; for(var k=0;k<terms;k++){ sum += Math.pow(-1,k)*Math.pow(x,2*k+1)/fact(2*k+1); } return sum; }
    function updateDataView(deg){
      if(!dataDesc) return;
      dataDesc.textContent='Maclaurin polynomial of sin(x), degree '+deg+' ('+terms+' term'+(terms===1?'':'s')+'), plotted against the real sin(x).';
      var N=9, rows=[];
      for(var i=0;i<N;i++){ var x=view.xmin+(view.xmax-view.xmin)*i/(N-1); rows.push([fmt(x),fmt(Math.sin(x)),fmt(T(x))]); }
      renderDataRows(dataRows,rows);
    }
    function draw(ctx,w,h){
      var P=new Plot(ctx,w,h,view,{l:24,r:12,t:12,b:20}); P.clear(); P.grid();
      P.curve(function(x){return Math.sin(x);}, INDIGO, 2.4);
      P.curve(T, AMBER2, 2.4);
      var deg=(2*terms-1);
      document.getElementById('bcTaylorDeg').textContent=deg;
      updateDataView(deg);
    }
    register(canvas,draw);
    s.addEventListener('input',function(){ terms=parseInt(s.value,10); document.getElementById('bcTaylorNV').textContent=terms; redrawAll(); });
  })();

  /* ===================== SAT · LINEAR FUNCTION ===================== */
  (function(){
    var canvas=document.getElementById('satLineCanvas'); if(!canvas) return;
    var m=1, b=1, sm=document.getElementById('satM'), sb=document.getElementById('satB');
    var view={xmin:-6,xmax:6,ymin:-7,ymax:7};
    var dataBtn=document.getElementById('satLineDataBtn'), dataPanel=document.getElementById('satLineDataPanel'),
        dataDesc=document.getElementById('satLineDataDesc'), dataRows=document.getElementById('satLineDataRows');
    wireDataToggle(dataBtn,dataPanel);
    function updateDataView(f){
      if(!dataDesc) return;
      dataDesc.textContent='Line y = '+m+'x '+(b>=0?'+ '+b:'− '+(-b))+'. Slope = '+m+'. y-intercept (0, '+b+').';
      var N=9, rows=[];
      for(var i=0;i<N;i++){ var x=view.xmin+(view.xmax-view.xmin)*i/(N-1); rows.push([fmt(x),fmt(f(x))]); }
      renderDataRows(dataRows,rows);
    }
    function draw(ctx,w,h){
      var P=new Plot(ctx,w,h,view,{l:24,r:12,t:12,b:20}); P.clear(); P.grid();
      var f=function(x){return m*x+b;};
      P.curve(f, INDIGO, 2.6);
      P.dot(0,b,AMBER2,5);
      if(Math.abs(m)>1e-9) P.dot(-b/m,0,AMBER2,5);
      document.getElementById('satLineSlope').textContent=m;
      document.getElementById('satLineYint').textContent='(0, '+b+')';
      document.getElementById('satLineXint').textContent=(Math.abs(m)<1e-9?'none':'('+(-b/m).toFixed(2)+', 0)');
      updateDataView(f);
    }
    function upd(){ m=parseFloat(sm.value); b=parseFloat(sb.value);
      document.getElementById('satMV').textContent=m; document.getElementById('satBV').textContent=b; redrawAll(); }
    register(canvas,draw); sm.addEventListener('input',upd); sb.addEventListener('input',upd);
  })();

  /* ===================== SAT · LINE OF BEST FIT ===================== */
  (function(){
    var canvas=document.getElementById('satFitCanvas'); if(!canvas) return;
    var pts=[[1,2],[2,3],[3,5],[4,4],[5,6],[6,8],[7,7],[8,9]];
    var mx=4.5, my=5.5; // centroid
    var s=0.5, sl=document.getElementById('satFitSlope');
    var view={xmin:0,xmax:9,ymin:0,ymax:10};
    var dataBtn=document.getElementById('satFitDataBtn'), dataPanel=document.getElementById('satFitDataPanel'),
        dataDesc=document.getElementById('satFitDataDesc'), dataRows=document.getElementById('satFitDataRows');
    wireDataToggle(dataBtn,dataPanel);
    function updateDataView(ssr){
      if(!dataDesc) return;
      dataDesc.textContent='Trend line through the centroid ('+mx+', '+my+') with slope '+fmt(s,2)+': y = '+fmt(my,2)+' + '+fmt(s,2)+'(x − '+mx+'). Sum of squared residuals (SSR) = '+fmt(ssr,1)+' — drag the slope to try to minimize it.';
      var rows=[];
      for(var i=0;i<pts.length;i++){ var yp=my+s*(pts[i][0]-mx), res=pts[i][1]-yp; rows.push([pts[i][0],pts[i][1],fmt(yp,2),fmt(res,2),fmt(res*res,2)]); }
      renderDataRows(dataRows,rows);
    }
    function draw(ctx,w,h){
      var P=new Plot(ctx,w,h,view,{l:24,r:12,t:12,b:20}); P.clear(); P.grid();
      // line through centroid with slope s
      P.curve(function(x){return my+s*(x-mx);}, INDIGO, 2.4);
      var ssr=0;
      for(var i=0;i<pts.length;i++){ var yp=my+s*(pts[i][0]-mx); ssr+=(pts[i][1]-yp)*(pts[i][1]-yp);
        P.segment(pts[i][0],pts[i][1],pts[i][0],yp,'rgba(184,128,31,.45)',1.2);
        P.dot(pts[i][0],pts[i][1],AMBER2,4.5);
      }
      document.getElementById('satFitSSR').textContent=ssr.toFixed(1);
      updateDataView(ssr);
    }
    register(canvas,draw);
    sl.addEventListener('input',function(){ s=parseFloat(sl.value); document.getElementById('satFitSlopeV').textContent=s.toFixed(2); redrawAll(); });
  })();

  /* ===================== SAT · EXPONENTIAL MODEL ===================== */
  (function(){
    var canvas=document.getElementById('satExpCanvas'); if(!canvas) return;
    var bb=1.5, s=document.getElementById('satBase'), A=2;
    var view={xmin:-3,xmax:3,ymin:-1,ymax:12};
    var dataBtn=document.getElementById('satExpDataBtn'), dataPanel=document.getElementById('satExpDataPanel'),
        dataDesc=document.getElementById('satExpDataDesc'), dataRows=document.getElementById('satExpDataRows');
    wireDataToggle(dataBtn,dataPanel);
    function updateDataView(f){
      if(!dataDesc) return;
      var type=(bb>1.0001?'growth':(bb<0.9999?'decay':'constant'));
      dataDesc.textContent='Function y = '+A+'·'+fmt(bb,1)+'ˣ ('+type+'). y-intercept (0, '+A+').';
      var N=9, rows=[];
      for(var i=0;i<N;i++){ var x=view.xmin+(view.xmax-view.xmin)*i/(N-1); rows.push([fmt(x),fmt(f(x))]); }
      renderDataRows(dataRows,rows);
    }
    function draw(ctx,w,h){
      var P=new Plot(ctx,w,h,view,{l:24,r:12,t:12,b:20}); P.clear(); P.grid();
      var f=function(x){return A*Math.pow(bb,x);};
      P.curve(f, INDIGO, 2.6);
      P.dot(0,A,AMBER2,5);
      document.getElementById('satExpType').textContent=(bb>1.0001?'growth':(bb<0.9999?'decay':'constant'));
      document.getElementById('satExpY1').textContent=(A*bb).toFixed(2);
      updateDataView(f);
    }
    register(canvas,draw);
    s.addEventListener('input',function(){ bb=parseFloat(s.value); document.getElementById('satBaseV').textContent=bb.toFixed(1); redrawAll(); });
  })();

  /* ===================== ACT · VERTEX-FORM PARABOLA ===================== */
  (function(){
    var canvas=document.getElementById('actFuncCanvas'); if(!canvas) return;
    var h=0,k=0, sh=document.getElementById('actFuncH'), sk=document.getElementById('actFuncK');
    var view={xmin:-6,xmax:6,ymin:-4,ymax:8};
    var dataBtn=document.getElementById('actFuncDataBtn'), dataPanel=document.getElementById('actFuncDataPanel'),
        dataDesc=document.getElementById('actFuncDataDesc'), dataRows=document.getElementById('actFuncDataRows');
    wireDataToggle(dataBtn,dataPanel);
    function updateDataView(f){
      if(!dataDesc) return;
      dataDesc.textContent='y = (x − '+h+')² + '+k+'. Vertex ('+h+', '+k+'). Axis of symmetry x = '+h+'.';
      var N=9, rows=[];
      for(var i=0;i<N;i++){ var x=view.xmin+(view.xmax-view.xmin)*i/(N-1); rows.push([fmt(x),fmt(f(x))]); }
      renderDataRows(dataRows,rows);
    }
    function draw(ctx,w,ht){ var P=new Plot(ctx,w,ht,view,{l:24,r:12,t:12,b:20}); P.clear(); P.grid();
      var f=function(x){return (x-h)*(x-h)+k;};
      P.curve(f, INDIGO, 2.6);
      P.vline(h,'#C2CCDA',[4,4]); P.dot(h,k,AMBER2,5.5);
      document.getElementById('actFuncVertex').textContent='('+h+', '+k+')';
      document.getElementById('actFuncAxis').textContent='x = '+h;
      updateDataView(f);
    }
    function upd(){ h=parseFloat(sh.value); k=parseFloat(sk.value); document.getElementById('actFuncHV').textContent=h; document.getElementById('actFuncKV').textContent=k; redrawAll(); }
    register(canvas,draw); sh.addEventListener('input',upd); sk.addEventListener('input',upd);
  })();

  /* ===================== ACT · LINE SLOPE & INTERCEPTS ===================== */
  (function(){
    var canvas=document.getElementById('actLineCanvas'); if(!canvas) return;
    var m=1,b=0, sm=document.getElementById('actM'), sb=document.getElementById('actB');
    var view={xmin:-6,xmax:6,ymin:-7,ymax:7};
    var dataBtn=document.getElementById('actLineDataBtn'), dataPanel=document.getElementById('actLineDataPanel'),
        dataDesc=document.getElementById('actLineDataDesc'), dataRows=document.getElementById('actLineDataRows');
    wireDataToggle(dataBtn,dataPanel);
    function updateDataView(f){
      if(!dataDesc) return;
      dataDesc.textContent='Line y = '+m+'x '+(b>=0?'+ '+b:'− '+(-b))+'. Slope = '+m+'. y-intercept (0, '+b+').';
      var N=9, rows=[];
      for(var i=0;i<N;i++){ var x=view.xmin+(view.xmax-view.xmin)*i/(N-1); rows.push([fmt(x),fmt(f(x))]); }
      renderDataRows(dataRows,rows);
    }
    function draw(ctx,w,ht){ var P=new Plot(ctx,w,ht,view,{l:24,r:12,t:12,b:20}); P.clear(); P.grid();
      var f=function(x){return m*x+b;};
      P.curve(f, INDIGO, 2.6);
      P.dot(0,b,AMBER2,5); if(Math.abs(m)>1e-9) P.dot(-b/m,0,AMBER2,5);
      document.getElementById('actLineSlope').textContent=m;
      document.getElementById('actLineYint').textContent='(0, '+b+')';
      document.getElementById('actLineXint').textContent=(Math.abs(m)<1e-9?'none':'('+(-b/m).toFixed(2)+', 0)');
      updateDataView(f);
    }
    function upd(){ m=parseFloat(sm.value); b=parseFloat(sb.value); document.getElementById('actMV').textContent=m; document.getElementById('actBV').textContent=b; redrawAll(); }
    register(canvas,draw); sm.addEventListener('input',upd); sb.addEventListener('input',upd);
  })();

  /* ===================== ACT · SINE & RIGHT-TRIANGLE RATIOS ===================== */
  (function(){
    var canvas=document.getElementById('actTrigCanvas'); if(!canvas) return;
    var deg=30, s=document.getElementById('actAngle');
    var view={xmin:0,xmax:360,ymin:-1.3,ymax:1.3};
    var dataBtn=document.getElementById('actTrigDataBtn'), dataPanel=document.getElementById('actTrigDataPanel'),
        dataDesc=document.getElementById('actTrigDataDesc'), dataRows=document.getElementById('actTrigDataRows');
    wireDataToggle(dataBtn,dataPanel);
    function updateDataView(y){
      if(!dataDesc) return;
      dataDesc.textContent='Marker at θ = '+deg+'°: sin(θ) = '+y.toFixed(3)+', cos(θ) = '+Math.cos(deg*Math.PI/180).toFixed(3)+'.';
      var rows=[];
      for(var t=0;t<=360;t+=45){ rows.push([t+'°',fmt(Math.sin(t*Math.PI/180),3)]); }
      renderDataRows(dataRows,rows);
    }
    function draw(ctx,w,ht){ var P=new Plot(ctx,w,ht,view,{l:30,r:12,t:12,b:22}); P.clear(); P.grid();
      P.curve(function(x){return Math.sin(x*Math.PI/180);}, INDIGO, 2.4);
      var y=Math.sin(deg*Math.PI/180);
      P.vline(deg,'#C2CCDA',[4,4]); P.dot(deg,y,AMBER2,5.5);
      document.getElementById('actSin').textContent=y.toFixed(3);
      document.getElementById('actCos').textContent=Math.cos(deg*Math.PI/180).toFixed(3);
      updateDataView(y);
    }
    register(canvas,draw);
    s.addEventListener('input',function(){ deg=parseFloat(s.value); document.getElementById('actAngleV').textContent=deg+'\u00B0'; redrawAll(); });
  })();

  /* ===================== AS · LINE SLOPE & INTERCEPTS ===================== */
  (function(){
    var canvas=document.getElementById('asLineCanvas'); if(!canvas) return;
    var m=1,b=0, sm=document.getElementById('asM'), sb=document.getElementById('asB');
    var view={xmin:-6,xmax:6,ymin:-7,ymax:7};
    var dataBtn=document.getElementById('asLineDataBtn'), dataPanel=document.getElementById('asLineDataPanel'),
        dataDesc=document.getElementById('asLineDataDesc'), dataRows=document.getElementById('asLineDataRows');
    wireDataToggle(dataBtn,dataPanel);
    function updateDataView(f){
      if(!dataDesc) return;
      dataDesc.textContent='Line y = '+m+'x '+(b>=0?'+ '+b:'− '+(-b))+'. Gradient = '+m+'. y-intercept (0, '+b+').';
      var N=9, rows=[];
      for(var i=0;i<N;i++){ var x=view.xmin+(view.xmax-view.xmin)*i/(N-1); rows.push([fmt(x),fmt(f(x))]); }
      renderDataRows(dataRows,rows);
    }
    function draw(ctx,w,ht){ var P=new Plot(ctx,w,ht,view,{l:24,r:12,t:12,b:20}); P.clear(); P.grid();
      var f=function(x){return m*x+b;};
      P.curve(f, INDIGO, 2.6);
      P.dot(0,b,AMBER2,5); if(Math.abs(m)>1e-9) P.dot(-b/m,0,AMBER2,5);
      document.getElementById('asLineSlope').textContent=m;
      document.getElementById('asLineYint').textContent='(0, '+b+')';
      document.getElementById('asLineXint').textContent=(Math.abs(m)<1e-9?'none':'('+(-b/m).toFixed(2)+', 0)');
      updateDataView(f);
    }
    function upd(){ m=parseFloat(sm.value); b=parseFloat(sb.value); document.getElementById('asMV').textContent=m; document.getElementById('asBV').textContent=b; redrawAll(); }
    register(canvas,draw); sm.addEventListener('input',upd); sb.addEventListener('input',upd);
  })();

  /* ===================== AS · GRAPH TRANSLATION (SINE) ===================== */
  (function(){
    var canvas=document.getElementById('asTransCanvas'); if(!canvas) return;
    var h=0,k=0, sh=document.getElementById('asTransH'), sk=document.getElementById('asTransK');
    var view={xmin:0,xmax:360,ymin:-2.5,ymax:2.5};
    var dataBtn=document.getElementById('asTransDataBtn'), dataPanel=document.getElementById('asTransDataPanel'),
        dataDesc=document.getElementById('asTransDataDesc'), dataRows=document.getElementById('asTransDataRows');
    wireDataToggle(dataBtn,dataPanel);
    function updateDataView(base,g){
      if(!dataDesc) return;
      dataDesc.textContent='y = sin(x \u2212 '+h+'\u00B0) + '+k+'. Shift ('+h+'\u00B0, '+k+') from the parent sin(x).';
      var rows=[];
      for(var t=0;t<=360;t+=45){ rows.push([t+'\u00B0',fmt(base(t),3),fmt(g(t),3)]); }
      renderDataRows(dataRows,rows);
    }
    function draw(ctx,w,ht){ var P=new Plot(ctx,w,ht,view,{l:30,r:12,t:12,b:22}); P.clear(); P.grid();
      var base=function(x){return Math.sin(x*Math.PI/180);};
      P.curve(base, '#C2CCDA', 1.6);
      var g=function(x){return Math.sin((x-h)*Math.PI/180)+k;};
      P.curve(g, INDIGO, 2.6);
      document.getElementById('asTransShift').textContent='('+h+'\u00B0, '+k+')';
      updateDataView(base,g);
    }
    function upd(){ h=parseFloat(sh.value); k=parseFloat(sk.value); document.getElementById('asTransHV').textContent=h+'\u00B0'; document.getElementById('asTransKV').textContent=k; redrawAll(); }
    register(canvas,draw); sh.addEventListener('input',upd); sk.addEventListener('input',upd);
  })();

  /* ===================== AS · SECANT → TANGENT ===================== */
  (function(){
    var canvas=document.getElementById('asDerivCanvas'); if(!canvas) return;
    var hh=2, s=document.getElementById('asDerivH'), f=function(x){return x*x;};
    var view={xmin:-1,xmax:5,ymin:-1,ymax:12};
    var dataBtn=document.getElementById('asDerivDataBtn'), dataPanel=document.getElementById('asDerivDataPanel'),
        dataDesc=document.getElementById('asDerivDataDesc'), dataRows=document.getElementById('asDerivDataRows');
    wireDataToggle(dataBtn,dataPanel);
    function updateDataView(x0,x1,slope){
      if(!dataDesc) return;
      dataDesc.textContent='f(x) = x². Secant through x = '+x0+' and x = '+fmt(x1,2)+' (h = '+fmt(hh,2)+') has slope '+fmt(slope,3)+'. As h → 0, this approaches the tangent slope f′(1) = 2.';
      var N=9, rows=[];
      for(var i=0;i<N;i++){ var x=view.xmin+(view.xmax-view.xmin)*i/(N-1); rows.push([fmt(x),fmt(f(x))]); }
      renderDataRows(dataRows,rows);
    }
    function draw(ctx,w,ht){ var P=new Plot(ctx,w,ht,view,{l:26,r:12,t:12,b:20}); P.clear(); P.grid();
      P.curve(f, INDIGO, 2.4);
      var x0=1, x1=1+hh, y0=f(x0), y1=f(x1), slope=(y1-y0)/hh;
      P.curve(function(x){return y0+slope*(x-x0);}, AMBER2, 2);
      P.dot(x0,y0,INDIGO,5); P.dot(x1,y1,AMBER2,5);
      document.getElementById('asDerivSlope').textContent=slope.toFixed(3);
      updateDataView(x0,x1,slope);
    }
    register(canvas,draw);
    s.addEventListener('input',function(){ hh=parseFloat(s.value); document.getElementById('asDerivHV').textContent=hh.toFixed(1); redrawAll(); });
  })();

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
    var view={xmin:-6,xmax:6,ymin:-6,ymax:6};
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
    var pick=filtered.slice(0, Math.min(n, filtered.length));
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
    apab:{
      title:'AP Calculus AB',totalTime:'3 hr 15 min',
      logo:'AP® Calculus AB',org:'College Board',
      instructions:['This exam has two sections. Budget your time carefully.',
        'Section I: 45 multiple-choice questions. Wrong answers are NOT penalised.',
        'Section II: 6 free-response questions. Show ALL work to earn full credit.',
        'Unless stated otherwise, assume the domain of ƒ is all real numbers.',
        'Decimal answers correct to three decimal places unless otherwise specified.',
        'The average of a finite set of values is their arithmetic mean.'],
      sections:[
        {title:'Section I — Multiple Choice',time:'1 hr 45 min',
         note:'Responses are machine-scored. Mark answers on the separate answer sheet.',
         parts:[
          {label:'Part A',q:30,time:'60 min',calc:false,type:'mcq',note:'No calculator permitted.'},
          {label:'Part B',q:15,time:'45 min',calc:true,type:'mcq',note:'Graphing calculator required.'}]},
        {title:'Section II — Free Response',time:'1 hr 30 min',
         note:'Show all your work. Clearly indicate the methods used, as you are graded on correctness of method as well as accuracy of answer.',
         parts:[
          {label:'Part A',q:2,time:'30 min',calc:true,type:'frq',note:'Graphing calculator required. Write work in the exam booklet.'},
          {label:'Part B',q:4,time:'60 min',calc:false,type:'frq',note:'No calculator permitted. Write work in the exam booklet.'}]}]},

    apbc:{
      title:'AP Calculus BC',totalTime:'3 hr 15 min',
      logo:'AP® Calculus BC',org:'College Board',
      instructions:['This exam has two sections. Budget your time carefully.',
        'Section I: 45 multiple-choice questions. Wrong answers are NOT penalised.',
        'Section II: 6 free-response questions. Show ALL work to earn full credit.',
        'Unless stated otherwise, assume the domain of ƒ is all real numbers.',
        'Decimal answers correct to three decimal places unless otherwise specified.'],
      sections:[
        {title:'Section I — Multiple Choice',time:'1 hr 45 min',
         note:'Responses are machine-scored.',
         parts:[
          {label:'Part A',q:30,time:'60 min',calc:false,type:'mcq',note:'No calculator permitted.'},
          {label:'Part B',q:15,time:'45 min',calc:true,type:'mcq',note:'Graphing calculator required.'}]},
        {title:'Section II — Free Response',time:'1 hr 30 min',
         note:'Show all your work for full credit.',
         parts:[
          {label:'Part A',q:2,time:'30 min',calc:true,type:'frq',note:'Graphing calculator required.'},
          {label:'Part B',q:4,time:'60 min',calc:false,type:'frq',note:'No calculator permitted.'}]}]},

    appc:{
      title:'AP Precalculus',totalTime:'3 hr 15 min',
      logo:'AP® Precalculus',org:'College Board',
      instructions:['This exam has two sections.',
        'Section I: 40 multiple-choice questions (Parts A & B).',
        'Section II: 4 free-response questions.',
        'Show all work for free-response questions.'],
      sections:[
        {title:'Section I — Multiple Choice',time:'2 hr 15 min',
         note:'Mark answers on the answer sheet.',
         parts:[
          {label:'Part A',q:28,time:'80 min',calc:false,type:'mcq',note:'No calculator permitted.'},
          {label:'Part B',q:12,time:'55 min',calc:true,type:'mcq',note:'Graphing calculator required.'}]},
        {title:'Section II — Free Response',time:'1 hr',
         note:'Show all work. Answers without supporting work may not receive full credit.',
         parts:[
          {label:'Part A',q:2,time:'30 min',calc:false,type:'frq',note:'No calculator permitted.'},
          {label:'Part B',q:2,time:'30 min',calc:true,type:'frq',note:'Graphing calculator required.'}]}]},

    apstats:{
      title:'AP Statistics',totalTime:'3 hr',
      logo:'AP® Statistics',org:'College Board',
      instructions:['This exam has two sections.',
        'Section I: 40 multiple-choice questions, 90 minutes.',
        'Section II: 6 free-response questions (5 short + 1 investigative task), 90 minutes.',
        'Show all work. Answers without appropriate supporting work will not receive full credit.',
        'Probability and statistics tables are provided.'],
      sections:[
        {title:'Section I — Multiple Choice',time:'1 hr 30 min',
         note:'40 questions. No penalty for incorrect answers.',
         parts:[{label:'',q:40,time:'90 min',calc:true,type:'mcq',note:''}]},
        {title:'Section II — Free Response',time:'1 hr 30 min',
         note:'Show all work. Clearly communicate your statistical reasoning.',
         parts:[
          {label:'Part A',q:5,time:'65 min',calc:true,type:'frq',note:'Short free-response questions. Approximately 13 minutes each.'},
          {label:'Part B',q:1,time:'25 min',calc:true,type:'frq',note:'Investigative Task. Worth more points than a short free-response question.'}]}]},

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
         parts:[{label:'',q:22,time:'35 min',calc:true,type:'mcq',note:''}]},
        {title:'Math — Module 2 (Adaptive)',time:'35 min',
         note:'This module adapts to your performance on Module 1.',
         parts:[{label:'',q:22,time:'35 min',calc:true,type:'mcq',note:''}]}]},

    act:{
      title:'ACT Mathematics',totalTime:'60 min',
      logo:'ACT®',org:'ACT, Inc.',letters:['A','B','C','D','E'],
      instructions:['60 questions — 60 minutes.',
        'Each question has five answer choices (A–E or F–K for even-numbered questions).',
        'Choose the BEST answer. Fill in the corresponding bubble on your answer sheet.',
        'Do not spend too long on any one problem. Return to difficult problems if time permits.',
        'Calculator permitted. Assumed: figures not to scale unless stated; all geometry in a plane; "line" means straight line; "average" means arithmetic mean.'],
      sections:[
        {title:'Mathematics Test',time:'60 min',note:'60 Questions — 60 Minutes',
         parts:[{label:'',q:60,time:'60 min',calc:true,type:'mcq',note:'Five answer choices per question.',letters:['A','B','C','D','E']}]}]},

    act2:{
      title:'ACT Mathematics',totalTime:'60 min',
      logo:'ACT®',org:'ACT, Inc.',letters:['A','B','C','D','E'],
      instructions:['60 questions — 60 minutes.',
        'Each question has five answer choices.',
        'Calculator permitted.',
        'Assumed: figures not to scale unless stated.'],
      sections:[
        {title:'Mathematics Test',time:'60 min',note:'60 Questions — 60 Minutes',
         parts:[{label:'',q:60,time:'60 min',calc:true,type:'mcq',note:'',letters:['A','B','C','D','E']}]}]},

    est:{
      title:'EST I — Mathematics',totalTime:'1 hr 20 min',
      logo:'EST',org:'Qiyas / National Center for Assessment',
      instructions:['The Mathematics section has two parts.',
        'Section 3 (No Calculator): 20 questions, 25 minutes.',
        'Section 4 (Calculator): 38 questions, 55 minutes.',
        'For multiple-choice questions, mark the best answer on the answer sheet.',
        'For student-produced responses (grid-in), write and bubble your answer.',
        'No penalty for incorrect answers.'],
      sections:[
        {title:'Section 3 — Mathematics: No Calculator',time:'25 min',
         note:'Calculator use is NOT permitted in this section.',
         parts:[{label:'',q:20,time:'25 min',calc:false,type:'mcq',note:''}]},
        {title:'Section 4 — Mathematics: Calculator Permitted',time:'55 min',
         note:'A scientific or graphing calculator may be used in this section.',
         parts:[{label:'',q:38,time:'55 min',calc:true,type:'mcq',note:''}]}]},

    est2:{
      title:'EST II — Mathematics',totalTime:'1 hr 20 min',
      logo:'EST II',org:'Qiyas / National Center for Assessment',
      instructions:['The Mathematics section has two parts.',
        'Section 3 (No Calculator): 20 questions, 25 minutes.',
        'Section 4 (Calculator): 38 questions, 55 minutes.',
        'No penalty for incorrect answers.'],
      sections:[
        {title:'Section 3 — Mathematics: No Calculator',time:'25 min',
         note:'Calculator use is NOT permitted in this section.',
         parts:[{label:'',q:20,time:'25 min',calc:false,type:'mcq',note:''}]},
        {title:'Section 4 — Mathematics: Calculator Permitted',time:'55 min',
         note:'A scientific or graphing calculator may be used.',
         parts:[{label:'',q:38,time:'55 min',calc:true,type:'mcq',note:''}]}]},

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
      title:'Cambridge AS Level Mathematics 9709',totalTime:'1 hr 45 min',
      logo:'Cambridge International AS & A Level',org:'Cambridge Assessment International Education',
      instructions:['Answer ALL questions.',
        'If working is needed, show it below the question.',
        'Omission of essential working will result in loss of marks.',
        'Electronic calculators should be used where appropriate.',
        'Give non-exact answers correct to 3 significant figures.',
        'Use a π button or 3.142 unless stated otherwise.'],
      sections:[
        {title:'Paper 1 — Pure Mathematics 1',time:'1 hr 45 min',
         note:'75 marks. Answer ALL questions. Electronic calculator required.',
         parts:[{label:'',q:10,time:'105 min',calc:true,type:'frq',note:'Show all working. Partial marks are awarded.'}]}]},

    a2level:{
      title:'Cambridge A Level Mathematics 9709',totalTime:'1 hr 50 min',
      logo:'Cambridge International AS & A Level',org:'Cambridge Assessment International Education',
      instructions:['Answer ALL questions.',
        'Show all necessary working. Omission of working results in loss of marks.',
        'Electronic calculators should be used where appropriate.',
        'Give non-exact answers correct to 3 significant figures.'],
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
    ibsl:{
      title:'IB Mathematics SL (AA / AI)',totalTime:'3 hr',
      logo:'IB Mathematics SL',org:'International Baccalaureate Organization',
      letters:['A','B','C','D'],
      instructions:['Answer ALL questions in both papers.',
        'Paper 1 (no GDC): short-response questions, 80 marks, 90 minutes.',
        'Paper 2 (GDC required): short-response questions, 80 marks, 90 minutes.',
        'Answers should be given to 3 significant figures unless stated otherwise.',
        'Full marks require working to be shown clearly.'],
      sections:[
        {title:'Paper 1 — No GDC',time:'90 min',
         note:'No graphic display calculator allowed.',
         parts:[{label:'Questions',q:9,time:'90 min',calc:false,type:'mcq',note:'Answer all questions.'}]},
        {title:'Paper 2 — GDC Required',time:'90 min',
         note:'Graphic display calculator required.',
         parts:[{label:'Questions',q:9,time:'90 min',calc:true,type:'mcq',note:'Answer all questions.'}]}
      ]
    },
    ibhl:{
      title:'IB Mathematics HL (AA / AI)',totalTime:'4 hr',
      logo:'IB Mathematics HL',org:'International Baccalaureate Organization',
      letters:['A','B','C','D'],
      instructions:['Answer ALL questions in all papers.',
        'Paper 1 (no GDC): short-response questions, 110 marks, 120 minutes.',
        'Paper 2 (GDC required): short-response questions, 110 marks, 120 minutes.',
        'Answers should be given to 3 significant figures unless stated otherwise.',
        'Full marks require ALL working to be shown clearly.'],
      sections:[
        {title:'Paper 1 — No GDC',time:'120 min',
         note:'No graphic display calculator allowed.',
         parts:[{label:'Questions',q:10,time:'120 min',calc:false,type:'mcq',note:'Answer all questions.'}]},
        {title:'Paper 2 — GDC Required',time:'120 min',
         note:'Graphic display calculator required.',
         parts:[{label:'Questions',q:10,time:'120 min',calc:true,type:'mcq',note:'Answer all questions.'}]}
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
    function drawQ(pool,n){
      var avail=pool.filter(function(q){return !_usedQFullExam.has(q);});
      var picked=shuffle(avail).slice(0,Math.min(n,avail.length));
      picked.forEach(function(q){_usedQFullExam.add(q);});
      return picked.map(function(q){return window._shuffleQ?window._shuffleQ(q):q;});
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
        var qs=drawQ(bank.pool,part.q);
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

  /* CH 0 — transform a parent function */
  (function(){
    var canvas=document.getElementById('fxnCanvas'); if(!canvas) return;
    var view={xmin:-5,xmax:5,ymin:-3,ymax:9}, a=1, h=0;
    function parent(x){ return x*x; }
    function g(x){ return a*(x-h)*(x-h); }
    var dataBtn=document.getElementById('fxnDataBtn'), dataPanel=document.getElementById('fxnDataPanel'),
        dataDesc=document.getElementById('fxnDataDesc'), dataRows=document.getElementById('fxnDataRows');
    wireDataToggle(dataBtn,dataPanel);
    function updateDataView(){
      if(!dataDesc) return;
      dataDesc.textContent='g(x) = '+fmt(a,1)+'(x − '+fmt(h,1)+')². Vertex ('+fmt(h,1)+', 0), parabola '+(a>=0?'opens up':'opens down')+'.';
      var N=9, rows=[];
      for(var i=0;i<N;i++){ var x=view.xmin+(view.xmax-view.xmin)*i/(N-1); rows.push([fmt(x),fmt(parent(x)),fmt(g(x))]); }
      renderDataRows(dataRows,rows);
    }
    function draw(ctx,w,ht){
      var P=new Plot(ctx,w,ht,view,{l:32,r:12,t:14,b:26}); P.clear(); P.grid();
      P.curve(parent,'rgba(86,97,115,.45)',1.6);
      P.curve(g,INDIGO,2.8);
      P.dot(h,g(h),AMBER2,5.5);
      document.getElementById('fxnVtx').textContent='('+fmt(h,1)+', 0)';
      document.getElementById('fxnDir').textContent=(a>=0?'opens up':'opens down');
      updateDataView();
    }
    register(canvas,draw);
    var sa=document.getElementById('fxnA'), sh=document.getElementById('fxnH');
    function upd(){
      a=parseInt(sa.value,10)/10; h=parseInt(sh.value,10)/10;
      document.getElementById('fxnAval').textContent=fmt(a,1);
      document.getElementById('fxnHval').textContent=fmt(h,1);
      redrawAll();
    }
    sa.addEventListener('input',upd); sh.addEventListener('input',upd); upd();
  })();

  /* CH 11 — partial sums of a geometric series */
  (function(){
    var canvas=document.getElementById('seriesCanvas'); if(!canvas) return;
    var N=6, NMAX=30, L=1;
    function partial(n){ return 1-Math.pow(0.5,n); }
    var view={xmin:0,xmax:NMAX,ymin:0,ymax:1.2};
    var dataBtn=document.getElementById('seriesDataBtn'), dataPanel=document.getElementById('seriesDataPanel'),
        dataDesc=document.getElementById('seriesDataDesc'), dataRows=document.getElementById('seriesDataRows');
    wireDataToggle(dataBtn,dataPanel);
    function updateDataView(){
      if(!dataDesc) return;
      dataDesc.textContent='Series Σ(1/2)ⁿ, partial sums S(n) = 1 − (1/2)ⁿ. Limit as n→∞ is 1. At n = '+N+', S(n) = '+fmt(partial(N),4)+' (remaining distance to the limit: '+fmt(L-partial(N),4)+').';
      var rows=[];
      for(var n=1;n<=N;n++){ rows.push([n,fmt(partial(n),4)]); }
      renderDataRows(dataRows,rows);
    }
    function draw(ctx,w,h){
      var P=new Plot(ctx,w,h,view,{l:34,r:12,t:14,b:26}); P.clear(); P.grid();
      P.segment(0,L,NMAX,L,'rgba(184,128,31,.7)',1.6,[5,5]);
      var c=P.ctx, n;
      c.strokeStyle='rgba(30,58,110,.35)'; c.lineWidth=1;
      for(n=2;n<=N;n++){ c.beginPath(); c.moveTo(P.X(n-1),P.Y(partial(n-1))); c.lineTo(P.X(n),P.Y(partial(n))); c.stroke(); }
      c.fillStyle=INDIGO;
      for(n=1;n<=N;n++){ c.beginPath(); c.arc(P.X(n),P.Y(partial(n)),3.2,0,7); c.fill(); }
      document.getElementById('serN').textContent=N;
      document.getElementById('serSv').textContent=fmt(partial(N),4);
      document.getElementById('serRv').textContent=fmt(L-partial(N),4);
      updateDataView();
    }
    register(canvas,draw);
    var s=document.getElementById('seriesN');
    function upd(){ N=parseInt(s.value,10); redrawAll(); }
    s.addEventListener('input',upd); upd();
  })();

  /* CH 12 — vector addition */
  (function(){
    var canvas=document.getElementById('vecCanvas'); if(!canvas) return;
    var ux=3, uy=1, vmag=2.6, ang=50*Math.PI/180;
    var view={xmin:-3,xmax:6,ymin:-3,ymax:6};
    var dataBtn=document.getElementById('vecDataBtn'), dataPanel=document.getElementById('vecDataPanel'),
        dataDesc=document.getElementById('vecDataDesc'), dataRows=document.getElementById('vecDataRows');
    wireDataToggle(dataBtn,dataPanel);
    function updateDataView(vx,vy,rx,ry){
      if(!dataDesc) return;
      var rmag=Math.sqrt(rx*rx+ry*ry);
      dataDesc.textContent='u = ⟨'+ux+', '+uy+'⟩ (fixed). v = ⟨'+fmt(vx,2)+', '+fmt(vy,2)+'⟩. Resultant u + v = ⟨'+fmt(rx,2)+', '+fmt(ry,2)+'⟩, magnitude '+fmt(rmag,3)+', angle '+fmt(Math.atan2(ry,rx)*180/Math.PI,1)+'°.';
      renderDataRows(dataRows,[
        ['u','⟨'+ux+', '+uy+'⟩',fmt(Math.sqrt(ux*ux+uy*uy),3)],
        ['v','⟨'+fmt(vx,2)+', '+fmt(vy,2)+'⟩',fmt(vmag,3)],
        ['u + v','⟨'+fmt(rx,2)+', '+fmt(ry,2)+'⟩',fmt(rmag,3)]
      ]);
    }
    function draw(ctx,w,h){
      var P=new Plot(ctx,w,h,view,{l:30,r:12,t:14,b:26}); P.clear(); P.grid();
      var vx=vmag*Math.cos(ang), vy=vmag*Math.sin(ang), rx=ux+vx, ry=uy+vy;
      var ox=P.X(0), oy=P.Y(0), c=P.ctx;
      c.strokeStyle='rgba(86,97,115,.30)'; c.setLineDash([4,4]); c.lineWidth=1;
      c.beginPath(); c.moveTo(P.X(ux),P.Y(uy)); c.lineTo(P.X(rx),P.Y(ry)); c.lineTo(P.X(vx),P.Y(vy)); c.stroke(); c.setLineDash([]);
      arrow(c,ox,oy,P.X(ux),P.Y(uy),INDIGO,2.6);
      arrow(c,ox,oy,P.X(vx),P.Y(vy),AMBER2,2.6);
      arrow(c,ox,oy,P.X(rx),P.Y(ry),INK,3);
      document.getElementById('vcVx').textContent='\u27e8'+fmt(vx,2)+', '+fmt(vy,2)+'\u27e9';
      document.getElementById('vcMag').textContent=fmt(Math.sqrt(rx*rx+ry*ry),3);
      document.getElementById('vcAng').textContent=fmt(Math.atan2(ry,rx)*180/Math.PI,1)+'\u00b0';
      updateDataView(vx,vy,rx,ry);
    }
    register(canvas,draw);
    var s=document.getElementById('vecAng');
    function upd(){ ang=parseInt(s.value,10)*Math.PI/180; document.getElementById('vcA').textContent=parseInt(s.value,10)+'\u00b0'; redrawAll(); }
    s.addEventListener('input',upd); upd();
  })();

  /* CH 13 — slicing a surface (partial derivative) */
  (function(){
    var canvas=document.getElementById('partialCanvas'); if(!canvas) return;
    var c=0, x0=1;
    function f(x,y){ return 3-0.2*x*x-0.15*y*y+0.25*x*y; }
    function g(x){ return f(x,c); }
    function fx(x,y){ return -0.4*x+0.25*y; }
    var view={xmin:-3.5,xmax:3.5,ymin:-1,ymax:4};
    var dataBtn=document.getElementById('partialDataBtn'), dataPanel=document.getElementById('partialDataPanel'),
        dataDesc=document.getElementById('partialDataDesc'), dataRows=document.getElementById('partialDataRows');
    wireDataToggle(dataBtn,dataPanel);
    function updateDataView(m,y0,tangent){
      if(!dataDesc) return;
      dataDesc.textContent='f(x, y) = 3 − 0.2x² − 0.15y² + 0.25xy, sliced at y = c = '+fmt(c,1)+', giving g(x) = f(x, c). At x₀ = '+x0+', g(x₀) = '+fmt(y0,3)+', partial derivative fₓ(x₀, c) = '+fmt(m,3)+'.';
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
      document.getElementById('paF').textContent=fmt(g(x0),3);
      document.getElementById('paFx').textContent=fmt(m,3);
      updateDataView(m,y0,tangent);
    }
    register(canvas,draw);
    var s=document.getElementById('partialC');
    function upd(){ c=parseInt(s.value,10)/10; document.getElementById('paCval').textContent=fmt(c,1); redrawAll(); }
    s.addEventListener('input',upd); upd();
  })();

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

  /* CH 12 — 3D helix view: the exact curve from Worked example 12.B,
     r(t) = <cos t, sin t, t>, with a point and velocity vector moving
     along it as t varies. Independent of the 2D vector-addition explorer
     above (a different topic in the same chapter) — same lazy-load-on-click
     discipline as the other ClipSAT3D explorers below. */
  (function(){
    var btn=document.getElementById('vec3dBtn'); if(!btn) return;
    var wrap=document.getElementById('vec3dWrap');
    var hint=document.getElementById('vec3dHint');
    var slider=document.getElementById('vec3dT');
    var tlab=document.getElementById('vh3dTlab');
    var rOut=document.getElementById('vh3dR');
    var speedOut=document.getElementById('vh3dSpeed');
    var built=false, H=null, pointMesh, velLine;
    var TMAX=4*Math.PI, HSCALE=4/TMAX, VLEN=1.4;
    var t=0;

    // r(t) exactly as printed in Example 12.B — x=cos t, y=sin t, z=t.
    // Rendered with world-Y as "up" (matching every other 3D explorer
    // here), so the rise (originally the z-component, t) climbs the Y
    // axis and the circle (x,y) lies flat in the X/Z plane.
    function rMath(tt){ return [Math.cos(tt), Math.sin(tt), tt]; }
    function worldPos(tt){ var p=rMath(tt); return [p[0], p[2]*HSCALE, p[1]]; }
    function worldVel(tt){ return [-Math.sin(tt), HSCALE, Math.cos(tt)]; }

    function buildCurveGeometry(T){
      var N=180, pts=[], i, tt, p;
      for(i=0;i<=N;i++){
        tt=TMAX*i/N; p=worldPos(tt);
        pts.push(new T.Vector3(p[0],p[1],p[2]));
      }
      return new T.BufferGeometry().setFromPoints(pts);
    }

    function build(mods){
      var T=mods.THREE, COLOR=ClipSAT3D.COLOR;
      H=ClipSAT3D.setup(wrap, mods, {az:0.8, el:0.4, dist:8.5, target:new T.Vector3(0,2,0)});

      var curveMat=new T.LineBasicMaterial({color:COLOR.INDIGO});
      H.scene.add(new T.Line(buildCurveGeometry(T), curveMat));

      var velGeo=new T.BufferGeometry();
      velGeo.setAttribute('position', new T.BufferAttribute(new Float32Array(6),3));
      velLine=new T.Line(velGeo, new T.LineBasicMaterial({color:COLOR.AMBER, linewidth:2}));
      H.scene.add(velLine);

      pointMesh=new T.Mesh(new T.SphereGeometry(0.09,16,16), new T.MeshBasicMaterial({color:COLOR.INK}));
      H.scene.add(pointMesh);

      updateScene();
      H.render();
    }

    function updateScene(){
      if(!H) return;
      var p=worldPos(t), v=worldVel(t);
      var vlen=Math.sqrt(v[0]*v[0]+v[1]*v[1]+v[2]*v[2]);
      pointMesh.position.set(p[0],p[1],p[2]);
      var pos=velLine.geometry.attributes.position;
      pos.setXYZ(0, p[0], p[1], p[2]);
      pos.setXYZ(1, p[0]+v[0]/vlen*VLEN, p[1]+v[1]/vlen*VLEN, p[2]+v[2]/vlen*VLEN);
      pos.needsUpdate=true;
      velLine.geometry.computeBoundingSphere();
    }

    function updateReadout(){
      var p=rMath(t), speed=Math.sqrt(Math.sin(t)*Math.sin(t)+Math.cos(t)*Math.cos(t)+1);
      tlab.textContent=fmt(t,2);
      rOut.textContent='⟨'+fmt(p[0],3)+', '+fmt(p[1],3)+', '+fmt(p[2],3)+'⟩';
      speedOut.textContent=fmt(speed,3);
    }

    function open3d(){
      wrap.hidden=false; hint.hidden=false;
      btn.setAttribute('aria-expanded','true');
      btn.textContent='🧊 Hide the 3D helix';
      if(built){ updateScene(); H.render(); return; }
      built=true;
      btn.disabled=true; btn.textContent='Loading 3D…';
      ClipSAT3D.load().then(function(mods){
        btn.disabled=false; btn.textContent='🧊 Hide the 3D helix';
        build(mods);
      }).catch(function(){
        built=false; // let a retry click actually retry, instead of re-showing an empty wrap forever
        btn.disabled=false; btn.textContent='🧊 View the helix from Example 12.B in 3D';
        wrap.hidden=true; hint.hidden=true;
        btn.setAttribute('aria-expanded','false');
        wrap.textContent='3D view failed to load — check your connection and try again.';
        wrap.hidden=false;
      });
    }
    function close3d(){
      wrap.hidden=true; hint.hidden=true;
      btn.setAttribute('aria-expanded','false');
      btn.textContent='🧊 View the helix from Example 12.B in 3D';
    }

    btn.addEventListener('click',function(){
      if(wrap.hidden) open3d(); else close3d();
    });
    slider.addEventListener('input',function(){
      t=parseInt(slider.value,10)/100;
      updateReadout();
      if(built){ updateScene(); H.render(); }
    });
    updateReadout();
  })();

  /* CH 13 — 3D surface view, refactored onto ClipSAT3D (was the one-off
     spike). Same f(x,y), same c-slider, same x0=1 point as the 2D slice
     above — just adds the surface those numbers actually live on. */
  (function(){
    var btn=document.getElementById('partial3dBtn'); if(!btn) return;
    var wrap=document.getElementById('partial3dWrap');
    var hint=document.getElementById('partial3dHint');
    var slider=document.getElementById('partialC');
    var built=false, H=null, surfaceMesh, planeMesh, tangentLine, pointMesh;
    var c=0, x0=1;
    function f(x,y){ return 3-0.2*x*x-0.15*y*y+0.25*x*y; }
    function fx(x,y){ return -0.4*x+0.25*y; }

    function buildSurfaceGeometry(T){
      var N=44, xmin=-3.5,xmax=3.5, ymin=-3.5,ymax=3.5;
      var geo=new T.PlaneGeometry(xmax-xmin, ymax-ymin, N, N);
      geo.rotateX(-Math.PI/2); // plane starts in XY; rotate so its "up" axis becomes world Z (height)
      var pos=geo.attributes.position;
      for(var i=0;i<pos.count;i++){
        /* BUGFIX (found while building the MVC track's own 3D explorers,
           which use this exact pattern correctly): rotateX(-PI/2) maps a
           vertex's pre-rotation local y to world z = -(local y), so
           reading domain_y back out as "-pos.getZ(i)" — the pre-fix
           formula — actually returns "local y" again, i.e. domain_y sits
           at world Z = -domain_y once you also account for how that
           local y was assigned in the first place, NOT world Z =
           domain_y like every other object in this same explorer
           (planeMesh/tangentLine/pointMesh below all place themselves at
           world Z = c, the raw slider value, unshifted). A concrete
           check: at x0=1, c=2, pointMesh sits at world Z=2 with height
           f(1,2)=2.7 (computed straight from c=2) — but the pre-fix
           surface showed height f(1,-2)=1.7 at that same world position,
           so the marker floated off the rendered surface everywhere
           except c=0. Dropping the negation (domain_y = pos.getZ(i)
           directly, matching the symmetric zero-shift domain here) makes
           the surface agree with where the plane/point/line already are. */
        var x=pos.getX(i), y=pos.getZ(i);
        pos.setY(i, f(x,y));
      }
      pos.needsUpdate=true;
      geo.computeVertexNormals();
      return geo;
    }

    function build(mods){
      var T=mods.THREE, COLOR=ClipSAT3D.COLOR;
      H=ClipSAT3D.setup(wrap, mods, {az:0.9, el:0.55, dist:11, target:new T.Vector3(0,1,0)});

      // Surface — schematic, not photorealistic: translucent fill + visible wireframe,
      // matching the "schematic, truthful, load-bearing only" figure convention used
      // everywhere else on the site.
      var surfGeo=buildSurfaceGeometry(T);
      var surfMat=new T.MeshLambertMaterial({color:COLOR.INDIGO, transparent:true, opacity:0.55, side:T.DoubleSide});
      surfaceMesh=new T.Mesh(surfGeo,surfMat);
      H.scene.add(surfaceMesh);
      var wireMat=new T.MeshBasicMaterial({color:COLOR.INDIGO, wireframe:true, transparent:true, opacity:0.25});
      H.scene.add(new T.Mesh(surfGeo,wireMat));

      // Slicing plane at y = c (amber, translucent) — the plane whose intersection
      // with the surface is exactly the curve g(x)=f(x,c) drawn in the 2D canvas.
      var planeGeo=new T.PlaneGeometry(7,5);
      var planeMat=new T.MeshBasicMaterial({color:COLOR.AMBER, transparent:true, opacity:0.22, side:T.DoubleSide});
      planeMesh=new T.Mesh(planeGeo,planeMat);
      planeMesh.rotation.x=Math.PI/2; // vertical plane, normal along world Y (the "c" axis)
      H.scene.add(planeMesh);

      // Tangent line + point, same numbers as the 2D readouts (#paF / #paFx).
      var tanGeo=new T.BufferGeometry();
      tanGeo.setAttribute('position', new T.BufferAttribute(new Float32Array(6),3));
      var tanMat=new T.LineBasicMaterial({color:COLOR.AMBER, linewidth:2});
      tangentLine=new T.Line(tanGeo,tanMat);
      H.scene.add(tangentLine);
      pointMesh=new T.Mesh(new T.SphereGeometry(0.07,16,16), new T.MeshBasicMaterial({color:COLOR.INK}));
      H.scene.add(pointMesh);

      update();
      H.render();
    }

    function update(){
      if(!H) return;
      c=parseInt(slider.value,10)/10;
      planeMesh.position.set(0, 1.5, c);
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
        built=false; // let a retry click actually retry, instead of re-showing an empty wrap forever
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

    btn.addEventListener('click',function(){
      if(wrap.hidden) open3d(); else close3d();
    });
    slider.addEventListener('input',function(){ if(built){ update(); H.render(); } });
  })();

  /* CH 14 — double Riemann sum (heatmap grid) */
  (function(){
    var canvas=document.getElementById('doubleCanvas'); if(!canvas) return;
    var n=4, A=2, fmax=4, exact=8;
    function f(x,y){ return x+y; }
    var view={xmin:0,xmax:2,ymin:0,ymax:2};
    var dataBtn=document.getElementById('doubleDataBtn'), dataPanel=document.getElementById('doubleDataPanel'),
        dataDesc=document.getElementById('doubleDataDesc'), dataRows=document.getElementById('doubleDataRows');
    wireDataToggle(dataBtn,dataPanel);
    function updateDataView(sum){
      if(!dataDesc) return;
      var dx=A/n;
      dataDesc.textContent='f(x, y) = x + y over ['+0+', '+A+']×['+0+', '+A+'], partitioned into an '+n+'×'+n+' grid ('+(n*n)+' cells, each '+fmt(dx,3)+'×'+fmt(dx,3)+', sampled at its midpoint). Riemann sum ≈ '+fmt(sum,3)+'. Exact double integral = '+exact+' (error '+fmt(Math.abs(exact-sum),3)+'). Too many cells to list individually at this n — this is the same sum the heatmap shades, not a re-derivation.';
      renderDataRows(dataRows,[
        ['grid',n+' × '+n],
        ['cells',n*n],
        ['cell size',fmt(dx,3)+' × '+fmt(dx,3)],
        ['Riemann sum (approx)',fmt(sum,3)],
        ['exact value',exact],
        ['error',fmt(Math.abs(exact-sum),3)]
      ]);
    }
    function draw(ctx,w,h){
      var P=new Plot(ctx,w,h,view,{l:30,r:12,t:14,b:26}); P.clear();
      var dx=A/n, sum=0, i, j, c=P.ctx;
      for(i=0;i<n;i++){ for(j=0;j<n;j++){
        var mx=(i+0.5)*dx, my=(j+0.5)*dx, val=f(mx,my); sum+=val*dx*dx;
        var al=0.12+0.6*(val/fmax);
        c.fillStyle='rgba(30,58,110,'+al.toFixed(3)+')';
        var px=P.X(i*dx), py=P.Y((j+1)*dx), pw=P.X((i+1)*dx)-px, ph=P.Y(j*dx)-py;
        c.fillRect(px,py,pw,ph);
      }}
      c.strokeStyle='rgba(255,255,255,.85)'; c.lineWidth=1;
      var k;
      for(k=0;k<=n;k++){
        var gx=P.X(k*dx); c.beginPath(); c.moveTo(gx,P.Y(0)); c.lineTo(gx,P.Y(A)); c.stroke();
        var gy=P.Y(k*dx); c.beginPath(); c.moveTo(P.X(0),gy); c.lineTo(P.X(A),gy); c.stroke();
      }
      document.getElementById('dbCells').textContent=(n*n);
      document.getElementById('dbApprox').textContent=fmt(sum,3);
      document.getElementById('dbExact').textContent=exact;
      document.getElementById('dbNlab').textContent=n;
      updateDataView(sum);
    }
    register(canvas,draw);
    var s=document.getElementById('doubleN');
    function upd(){ n=parseInt(s.value,10); redrawAll(); }
    s.addEventListener('input',upd); upd();
  })();

  /* CH 14 — 3D view: the same Riemann-sum boxes as stacked prisms of height
     f(midpoint), plus the exact plane z = x + y they approximate — the
     double integral IS the volume under that plane, and this is the volume.
     Shares n with the 2D grid slider (#doubleN) and ClipSAT3D with the
     partial-derivatives explorer above. Indigo = approximation (boxes),
     amber = exact (plane) — the same color coding the 2D readouts already
     use (.readrow.indigo for "approx", .readrow.amber for "exact"). */
  (function(){
    var btn=document.getElementById('double3dBtn'); if(!btn) return;
    var wrap=document.getElementById('double3dWrap');
    var hint=document.getElementById('double3dHint');
    var slider=document.getElementById('doubleN');
    var built=false, H=null, boxGroup=null, planeMesh=null;
    var A=2;
    function f(x,y){ return x+y; }

    function buildBoxes(T, COLOR, n){
      var group=new T.Group();
      var dx=A/n, shrink=0.92;
      var boxGeo=new T.BoxGeometry(1,1,1);
      var edgesGeo=new T.EdgesGeometry(boxGeo);
      var fillMat=new T.MeshLambertMaterial({color:COLOR.INDIGO, transparent:true, opacity:0.5, side:T.DoubleSide});
      var lineMat=new T.LineBasicMaterial({color:COLOR.INDIGO, transparent:true, opacity:0.55});
      for(var i=0;i<n;i++){ for(var j=0;j<n;j++){
        var mx=(i+0.5)*dx, my=(j+0.5)*dx, val=f(mx,my);
        if(val<=0) continue; // f>0 on [0,2]^2 always, but guard degenerate n/height anyway
        var mesh=new T.Mesh(boxGeo, fillMat);
        mesh.scale.set(dx*shrink, val, dx*shrink);
        mesh.position.set(mx-1, val/2, my-1); // domain [0,2]^2 shifted to center at origin
        group.add(mesh);
        var edges=new T.LineSegments(edgesGeo, lineMat);
        edges.scale.copy(mesh.scale); edges.position.copy(mesh.position);
        group.add(edges);
      }}
      return group;
    }

    function build(mods){
      var T=mods.THREE, COLOR=ClipSAT3D.COLOR;
      H=ClipSAT3D.setup(wrap, mods, {az:0.7, el:0.5, dist:6.5, target:new T.Vector3(0,0.8,0),
        axisSegs:[[[-1.3,0,0],[1.3,0,0]],[[0,-0.2,0],[0,3,0]],[[0,0,-1.3],[0,0,1.3]]]});

      // Exact surface — flat here since f(x,y)=x+y is linear, which is exactly
      // the point: the boxes' staircase top approaches this plane as n grows.
      var planeGeo=new T.PlaneGeometry(2,2,1,1);
      planeGeo.rotateX(-Math.PI/2);
      var pos=planeGeo.attributes.position;
      // BUGFIX: see the matching comment in the partial-derivatives 3D
      // explorer above — domain_y must be pos.getZ(k)+shift (not
      // -pos.getZ(k)+shift) to agree with where buildBoxes() below
      // already places each box (mesh.position.set(mx-1, val/2, my-1) —
      // i.e. world Z = domain_y - 1, the same shift used here).
      for(var k=0;k<pos.count;k++){ pos.setY(k, f(pos.getX(k)+1, pos.getZ(k)+1)); }
      pos.needsUpdate=true; planeGeo.computeVertexNormals();
      var planeMat=new T.MeshLambertMaterial({color:COLOR.AMBER, transparent:true, opacity:0.35, side:T.DoubleSide});
      planeMesh=new T.Mesh(planeGeo, planeMat);
      H.scene.add(planeMesh);
      var wireMat=new T.MeshBasicMaterial({color:COLOR.AMBER, wireframe:true, transparent:true, opacity:0.3});
      H.scene.add(new T.Mesh(planeGeo, wireMat));

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

  /* CH 15 — vector field, divergence & curl */
  (function(){
    var canvas=document.getElementById('fieldCanvas'); if(!canvas) return;
    var t=1;
    function F(x,y){ return { x:-t*y+(1-t)*x, y:t*x+(1-t)*y }; }
    var view={xmin:-2.2,xmax:2.2,ymin:-2.2,ymax:2.2};
    var dataBtn=document.getElementById('fieldDataBtn'), dataPanel=document.getElementById('fieldDataPanel'),
        dataDesc=document.getElementById('fieldDataDesc'), dataRows=document.getElementById('fieldDataRows');
    wireDataToggle(dataBtn,dataPanel);
    function updateDataView(div,curl,type){
      if(!dataDesc) return;
      dataDesc.textContent='F(x, y) = '+fmt(t,2)+'⟨−y, x⟩ + '+fmt(1-t,2)+'⟨x, y⟩, blend t = '+fmt(t,2)+'. Divergence ∇·F = '+fmt(div,2)+'. Curl ∇×F = '+fmt(curl,2)+'. Field is '+type+'.';
      var rows=[], step=1.1;
      for(var x=-2.2;x<=2.2001;x+=step){ for(var y=-2.2;y<=2.2001;y+=step){
        var v=F(x,y); rows.push(['('+fmt(x,1)+', '+fmt(y,1)+')','⟨'+fmt(v.x,2)+', '+fmt(v.y,2)+'⟩']);
      }}
      renderDataRows(dataRows,rows);
    }
    function draw(ctx,w,h){
      var P=new Plot(ctx,w,h,view,{l:28,r:12,t:12,b:24}); P.clear(); P.grid();
      var step=0.7, scale=0.16, x, y, c=P.ctx;
      for(x=-2;x<=2.0001;x+=step){ for(y=-2;y<=2.0001;y+=step){
        var v=F(x,y), mag=Math.sqrt(v.x*v.x+v.y*v.y)||1e-6, len=Math.min(0.5,scale*mag);
        arrow(c,P.X(x),P.Y(y),P.X(x+v.x/mag*len),P.Y(y+v.y/mag*len),'rgba(30,58,110,.85)',1.5);
      }}
      document.getElementById('fdDiv').textContent=fmt(2*(1-t),2);
      document.getElementById('fdCurl').textContent=fmt(2*t,2);
      var type=(t>0.5?'rotational':'source-like');
      document.getElementById('fdType').textContent=type;
      document.getElementById('fdTlab').textContent=fmt(t,2);
      updateDataView(2*(1-t),2*t,type);
    }
    register(canvas,draw);
    var s=document.getElementById('fieldT');
    function upd(){ t=parseInt(s.value,10)/100; redrawAll(); }
    s.addEventListener('input',upd); upd();
  })();

  /* CH 15 — 3D view: the same field F(x,y) = t·⟨-y,x⟩ + (1-t)·⟨x,y⟩ drawn
     as arrows lying flat in the plane (world Y = 0 — this field genuinely
     has no z-component, it lives in the plane), plus one vertical arrow at
     the origin whose length is the curl ∇×F = 2t — the thing a flat 2D
     picture structurally cannot show: curl points OUT of the plane the
     field lives in. Same blend slider (#fieldT), same F(x,y), same
     divergence/curl numbers as the 2D readouts (#fdDiv/#fdCurl). Indigo =
     the field (matches .readrow.indigo for divergence), amber = curl
     (matches .readrow.amber for curl). */
  (function(){
    var btn=document.getElementById('field3dBtn'); if(!btn) return;
    var wrap=document.getElementById('field3dWrap');
    var hint=document.getElementById('field3dHint');
    var slider=document.getElementById('fieldT');
    var built=false, H=null, fieldGroup=null, curlArrow=null;
    var t=1;
    function F(x,y){ return {x:-t*y+(1-t)*x, y:t*x+(1-t)*y}; }

    function build(mods){
      var T=mods.THREE;
      H=ClipSAT3D.setup(wrap, mods, {az:0.75, el:0.5, dist:7.5, target:new T.Vector3(0,0.4,0),
        axisSegs:[[[-2.2,0,0],[2.2,0,0]],[[0,-0.2,0],[0,2.4,0]],[[0,0,-2.2],[0,0,2.2]]]});
      update();
      H.render();
    }

    function update(){
      if(!H) return;
      var T=H.THREE, COLOR=ClipSAT3D.COLOR;
      t=parseInt(slider.value,10)/100;

      if(fieldGroup) H.scene.remove(fieldGroup);
      fieldGroup=new T.Group();
      var step=0.8, scale=0.5;
      for(var x=-2;x<=2.0001;x+=step){ for(var y=-2;y<=2.0001;y+=step){
        var v=F(x,y), mag=Math.sqrt(v.x*v.x+v.y*v.y)||1e-6;
        var len=Math.min(0.9, 0.25+scale*mag);
        // Field lies flat in the plane: x-component -> world X, y-component -> world Z, world Y = 0.
        var dir=new T.Vector3(v.x/mag, 0, v.y/mag);
        var origin=new T.Vector3(x, 0, y);
        var ah=new T.ArrowHelper(dir, origin, len, COLOR.INDIGO, len*0.28, len*0.18);
        fieldGroup.add(ah);
      }}
      H.scene.add(fieldGroup);

      if(curlArrow) H.scene.remove(curlArrow);
      var curl=2*t; // matches #fdCurl exactly
      if(Math.abs(curl)>1e-4){
        curlArrow=new T.ArrowHelper(
          new T.Vector3(0, curl>=0?1:-1, 0), new T.Vector3(0,0,0),
          Math.max(0.4, Math.abs(curl)*0.75), COLOR.AMBER, 0.28, 0.18
        );
        H.scene.add(curlArrow);
      } else {
        curlArrow=null;
      }
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
        btn.disabled=false; btn.textContent='🧊 View in 3D — watch curl lift out of the plane';
        wrap.hidden=true; hint.hidden=true;
        btn.setAttribute('aria-expanded','false');
        wrap.textContent='3D view failed to load — check your connection and try again.';
        wrap.hidden=false;
      });
    }
    function close3d(){
      wrap.hidden=true; hint.hidden=true;
      btn.setAttribute('aria-expanded','false');
      btn.textContent='🧊 View in 3D — watch curl lift out of the plane';
    }

    btn.addEventListener('click',function(){ if(wrap.hidden) open3d(); else close3d(); });
    slider.addEventListener('input',function(){ if(built){ update(); H.render(); } });
  })();

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
      dataDesc.textContent='The n-th roots of unity (unit circle, r = 1), with n = '+n+', are equally spaced 360°/'+n+' = '+fmt(360/n,1)+'° apart. z has |z| = r = '+fmt(rMod,2)+', so |z^n| = r^n = '+fmt(Math.pow(rMod,n),3)+' — '+(Math.abs(rMod-1)<1e-9?'on the unit circle like the roots themselves.':(rMod>1?'outside the unit circle, growing fast with n.':'inside the unit circle, shrinking with n.'));
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


  /* ══════════════════════════════════════════════════════════════════
     AP STATISTICS — Pillar 2 MVP retrofit continued (track 6 of 8).
     Same shared Plot/register/redrawAll/fmt helpers.
     ══════════════════════════════════════════════════════════════════ */

  /* AP STATS UNIT 1 — mean vs median, resistance to an outlier */
  (function(){
    var canvas=document.getElementById('apsMeanCanvas'); if(!canvas) return;
    var view={xmin:0,xmax:160,ymin:-1.3,ymax:2.2};
    var fixed=[12,15,18,21,24];
    var outlier=100;
    var dataBtn=document.getElementById('apsMeanDataBtn'), dataPanel=document.getElementById('apsMeanDataPanel'),
        dataDesc=document.getElementById('apsMeanDataDesc'), dataRows=document.getElementById('apsMeanDataRows');
    wireDataToggle(dataBtn,dataPanel);
    function updateDataView(sorted,mean,median){
      if(!dataDesc) return;
      dataDesc.textContent='Data: '+fixed.join(', ')+', and outlier '+outlier+'. Mean = '+fmt(mean,2)+' (pulled toward the outlier). Median = '+fmt(median,1)+' (resistant to the outlier).';
      renderDataRows(dataRows,[
        ['sorted data',sorted.join(', ')],
        ['mean',fmt(mean,2)],
        ['median',fmt(median,1)],
        ['mean − median',fmt(mean-median,2)]
      ]);
    }
    function draw(ctx,w,h){
      var P=new Plot(ctx,w,h,view,{l:20,r:16,t:12,b:26}); P.clear();
      var c=P.ctx;
      c.strokeStyle=AXIS; c.lineWidth=1;
      c.beginPath(); c.moveTo(P.X(view.xmin),P.Y(0)); c.lineTo(P.X(view.xmax),P.Y(0)); c.stroke();
      fixed.forEach(function(v){ P.dot(v,0,INK,4.5); });
      P.dot(outlier,0,AMBER2,5.5);
      var all=fixed.concat([outlier]);
      var mean=all.reduce(function(s,v){ return s+v; },0)/all.length;
      var sorted=all.slice().sort(function(a,b){ return a-b; });
      var median=(sorted[2]+sorted[3])/2;
      P.segment(mean,0,mean,1.4,INDIGO,2.2);
      P.dot(mean,1.5,INDIGO,4);
      P.segment(median,0,median,-0.9,AMBER,2.2);
      P.dot(median,-1,AMBER,4);
      document.getElementById('apsMean').textContent=fmt(mean,2);
      document.getElementById('apsMedian').textContent=fmt(median,1);
      updateDataView(sorted,mean,median);
    }
    register(canvas,draw);
    var s=document.getElementById('apsOutlier');
    function upd(){ outlier=parseInt(s.value,10); document.getElementById('apsOutlierLab').textContent=outlier; redrawAll(); }
    s.addEventListener('input',upd); upd();
  })();

  /* AP STATS UNIT 3 — the standard normal curve, shaded area = P(Z<z) */
  (function(){
    var canvas=document.getElementById('apsNormCanvas'); if(!canvas) return;
    var view={xmin:-4,xmax:4,ymin:0,ymax:0.45};
    var z=1.5;
    var dataBtn=document.getElementById('apsNormDataBtn'), dataPanel=document.getElementById('apsNormDataPanel'),
        dataDesc=document.getElementById('apsNormDataDesc'), dataRows=document.getElementById('apsNormDataRows');
    wireDataToggle(dataBtn,dataPanel);
    function erf(x){
      var sign=x<0?-1:1; x=Math.abs(x);
      var a1=0.254829592,a2=-0.284496736,a3=1.421413741,a4=-1.453152027,a5=1.061405429,p=0.3275911;
      var t=1/(1+p*x);
      var y=1-(((((a5*t+a4)*t)+a3)*t+a2)*t+a1)*t*Math.exp(-x*x);
      return sign*y;
    }
    function Phi(zz){ return 0.5*(1+erf(zz/Math.SQRT2)); }
    function phi(zz){ return Math.exp(-zz*zz/2)/Math.sqrt(2*Math.PI); }
    function updateDataView(){
      if(!dataDesc) return;
      dataDesc.textContent='Standard normal curve φ(x). At z = '+fmt(z,2)+', the shaded area to the left is P(Z < z) = Φ(z) = '+fmt(Phi(z),4)+'.';
      var N=9, rows=[];
      for(var i=0;i<N;i++){ var x=view.xmin+(view.xmax-view.xmin)*i/(N-1); rows.push([fmt(x),fmt(phi(x),4)]); }
      renderDataRows(dataRows,rows);
    }
    function draw(ctx,w,h){
      var P=new Plot(ctx,w,h,view,{l:28,r:12,t:12,b:24}); P.clear(); P.grid();
      P.areaUnder(phi, view.xmin, z, 'rgba(200,144,42,0.25)');
      P.curve(phi, INDIGO, 2.4);
      P.dot(z, phi(z), AMBER2, 4);
      document.getElementById('apsPz').textContent=fmt(Phi(z),4);
      updateDataView();
    }
    register(canvas,draw);
    var s=document.getElementById('apsZ');
    function upd(){ z=parseInt(s.value,10)/100; document.getElementById('apsZlab').textContent=fmt(z,2); redrawAll(); }
    s.addEventListener('input',upd); upd();
  })();

  /* AP STATS UNIT 4 — margin of error shrinks as n grows */
  (function(){
    var canvas=document.getElementById('apsMoeCanvas'); if(!canvas) return;
    var view={xmin:55,xmax:95,ymin:-1,ymax:2};
    var n=25, xbar=74, s=12, zstar=1.96;
    var dataBtn=document.getElementById('apsMoeDataBtn'), dataPanel=document.getElementById('apsMoeDataPanel'),
        dataDesc=document.getElementById('apsMoeDataDesc'), dataRows=document.getElementById('apsMoeDataRows');
    wireDataToggle(dataBtn,dataPanel);
    function updateDataView(se,me){
      if(!dataDesc) return;
      dataDesc.textContent='Sample: x̄ = '+xbar+', s = '+s+', n = '+n+', z* = '+zstar+'. Standard error = s/√n = '+fmt(se,3)+'. Margin of error = z*·SE = '+fmt(me,2)+'. Confidence interval = ('+fmt(xbar-me,2)+', '+fmt(xbar+me,2)+').';
      renderDataRows(dataRows,[
        ['x̄',xbar],['s',s],['n',n],['z*',zstar],
        ['standard error (s/√n)',fmt(se,3)],
        ['margin of error (z*·SE)',fmt(me,2)],
        ['CI lower',fmt(xbar-me,2)],
        ['CI upper',fmt(xbar+me,2)]
      ]);
    }
    function draw(ctx,w,h){
      var P=new Plot(ctx,w,h,view,{l:24,r:16,t:12,b:24}); P.clear();
      var c=P.ctx;
      c.strokeStyle=AXIS; c.lineWidth=1;
      c.beginPath(); c.moveTo(P.X(view.xmin),P.Y(0)); c.lineTo(P.X(view.xmax),P.Y(0)); c.stroke();
      var se=s/Math.sqrt(n), me=zstar*se;
      P.segment(xbar-me,0,xbar+me,0,INDIGO,5);
      P.dot(xbar,0,INK,5);
      P.dot(xbar-me,0,AMBER2,4);
      P.dot(xbar+me,0,AMBER2,4);
      document.getElementById('apsSE').textContent=fmt(se,3);
      document.getElementById('apsME').textContent=fmt(me,2);
      document.getElementById('apsCI').textContent='('+fmt(xbar-me,2)+', '+fmt(xbar+me,2)+')';
      updateDataView(se,me);
    }
    register(canvas,draw);
    var sn=document.getElementById('apsN');
    function upd(){ n=parseInt(sn.value,10); document.getElementById('apsNlab').textContent=n; redrawAll(); }
    sn.addEventListener('input',upd); upd();
  })();




  /* ══════════════════════════════════════════════════════════════════
     AP PRECALCULUS — Pillar 2 MVP retrofit continued (track 5 of 8).
     Same shared Plot/register/redrawAll/fmt helpers.
     ══════════════════════════════════════════════════════════════════ */

  /* APPC UNIT 1 — average rate of change & concavity, f(x)=x^3/3-x */
  (function(){
    var canvas=document.getElementById('appcArocCanvas'); if(!canvas) return;
    var view={xmin:-3.2,xmax:3.2,ymin:-2.4,ymax:2.4};
    var a=-2, b=0;
    function f(x){ return x*x*x/3-x; }
    var dataBtn=document.getElementById('appcArocDataBtn'), dataPanel=document.getElementById('appcArocDataPanel'),
        dataDesc=document.getElementById('appcArocDataDesc'), dataRows=document.getElementById('appcArocDataRows');
    wireDataToggle(dataBtn,dataPanel);
    function updateDataView(aroc){
      if(!dataDesc) return;
      dataDesc.textContent='f(x) = x³/3 − x. Average rate of change on ['+fmt(Math.min(a,b),1)+', '+fmt(Math.max(a,b),1)+'] = (f(b) − f(a))/(b − a) = '+(isNaN(aroc)?'undefined (a = b)':fmt(aroc,3))+'.';
      var N=9, rows=[];
      for(var i=0;i<N;i++){ var x=view.xmin+(view.xmax-view.xmin)*i/(N-1); rows.push([fmt(x),fmt(f(x))]); }
      renderDataRows(dataRows,rows);
    }
    function draw(ctx,w,h){
      var P=new Plot(ctx,w,h,view,{l:28,r:12,t:12,b:24}); P.clear(); P.grid();
      P.curve(f,INDIGO,2.4);
      var fa=f(a), fb=f(b);
      P.segment(a,fa,b,fb,AMBER2,2.6);
      P.dot(a,fa,INK,4.5); P.dot(b,fb,INK,4.5);
      var aroc=(b-a)!==0 ? (fb-fa)/(b-a) : NaN;
      document.getElementById('appcArocVal').textContent = isNaN(aroc) ? '—' : fmt(aroc,3);
      document.getElementById('appcArocNote').textContent = (a+b)>0 ? 'up' : 'down';
      updateDataView(aroc);
    }
    register(canvas,draw);
    var sa=document.getElementById('appcArocA'), sb=document.getElementById('appcArocB');
    function upd(){
      a=parseInt(sa.value,10)/10; b=parseInt(sb.value,10)/10;
      document.getElementById('appcArocAlab').textContent=fmt(a,1);
      document.getElementById('appcArocBlab').textContent=fmt(b,1);
      redrawAll();
    }
    sa.addEventListener('input',upd); sb.addEventListener('input',upd); upd();
  })();

  /* APPC UNIT 2 — exponential growth & decay, continuous form */
  (function(){
    var canvas=document.getElementById('appcGdCanvas'); if(!canvas) return;
    var view={xmin:0,xmax:18,ymin:0,ymax:8};
    var r=0.12;
    var dataBtn=document.getElementById('appcGdDataBtn'), dataPanel=document.getElementById('appcGdDataPanel'),
        dataDesc=document.getElementById('appcGdDataDesc'), dataRows=document.getElementById('appcGdDataRows');
    wireDataToggle(dataBtn,dataPanel);
    function updateDataView(f,model){
      if(!dataDesc) return;
      var desc='P(t) = e^('+fmt(r,3)+'t), continuous rate r = '+(r>=0?'+':'')+fmt(r*100,1)+'% ('+model+'). P(10) = '+fmt(f(10),3)+'.';
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
      document.getElementById('appcGdP10').textContent=fmt(f(10),3);
      var model = r>0.001?'growth': r<-0.001?'decay':'constant';
      document.getElementById('appcGdModel').textContent = model;
      var lab=document.getElementById('appcGdDblLab'), val=document.getElementById('appcGdDbl');
      if(Math.abs(r)<0.001){ lab.textContent='—'; val.textContent='—'; }
      else if(r>0){ lab.textContent='doubling time'; val.textContent=fmt(Math.LN2/r,2); }
      else { lab.textContent='half-life'; val.textContent=fmt(Math.LN2/-r,2); }
      updateDataView(f,model);
    }
    register(canvas,draw);
    var s=document.getElementById('appcGdR');
    function upd(){ r=parseInt(s.value,10)/100; document.getElementById('appcGdRlab').textContent=(r>=0?'+':'')+fmt(r*100,1)+'%'; redrawAll(); }
    s.addEventListener('input',upd); upd();
  })();

  /* APPC UNIT 3 — polar rose r = a cos(n theta) */
  (function(){
    var canvas=document.getElementById('appcPolarCanvas'); if(!canvas) return;
    var view={xmin:-4,xmax:4,ymin:-2.75,ymax:2.75};
    var n=3, A=3;
    var dataBtn=document.getElementById('appcPolarDataBtn'), dataPanel=document.getElementById('appcPolarDataPanel'),
        dataDesc=document.getElementById('appcPolarDataDesc'), dataRows=document.getElementById('appcPolarDataRows');
    wireDataToggle(dataBtn,dataPanel);
    function updateDataView(petals){
      if(!dataDesc) return;
      dataDesc.textContent='Polar rose r = '+A+' cos('+n+'θ), n = '+n+' ('+(n%2===1?'odd':'even')+'), giving '+petals+' petals. Sampled every 30° around one full turn:';
      var N=12, rows=[];
      for(var i=0;i<N;i++){ var th=i/N*2*Math.PI, r=A*Math.cos(n*th); rows.push([fmt(th),fmt(r),'('+fmt(r*Math.cos(th))+', '+fmt(r*Math.sin(th))+')']); }
      renderDataRows(dataRows,rows);
    }
    function draw(ctx,w,h){
      var P=new Plot(ctx,w,h,view,{l:20,r:10,t:10,b:20}); P.clear();
      var c=P.ctx, N=400, i, theta, r, x, y, px, py;
      c.beginPath();
      for(i=0;i<=N;i++){
        theta=2*Math.PI*i/N; r=A*Math.cos(n*theta);
        x=r*Math.cos(theta); y=r*Math.sin(theta);
        px=P.X(x); py=P.Y(y);
        if(i===0) c.moveTo(px,py); else c.lineTo(px,py);
      }
      c.lineWidth=2.4; c.strokeStyle=INDIGO; c.stroke();
      var petals = (n%2===1) ? n : 2*n;
      document.getElementById('appcPetals').textContent = petals;
      updateDataView(petals);
    }
    register(canvas,draw);
    var s=document.getElementById('appcPolarN');
    function upd(){ n=parseInt(s.value,10); document.getElementById('appcPolarNlab').textContent=n; redrawAll(); }
    s.addEventListener('input',upd); upd();
  })();



  /* ══════════════════════════════════════════════════════════════════
     ACT2 — Pillar 2 MVP retrofit continued (track 4 of 8). Same shared
     Plot/register/redrawAll/fmt helpers as every other track.
     ══════════════════════════════════════════════════════════════════ */

  /* ACT2 CH 3 — rational function asymptotes: f(x) = 2/(x-p) + q */
  (function(){
    var canvas=document.getElementById('act2RatCanvas'); if(!canvas) return;
    var view={xmin:-8,xmax:8,ymin:-8,ymax:8};
    var p=1, q=0;
    var dataBtn=document.getElementById('act2RatDataBtn'), dataPanel=document.getElementById('act2RatDataPanel'),
        dataDesc=document.getElementById('act2RatDataDesc'), dataRows=document.getElementById('act2RatDataRows');
    wireDataToggle(dataBtn,dataPanel);
    function updateDataView(f){
      if(!dataDesc) return;
      dataDesc.textContent='f(x) = 2/(x − '+p+') + '+q+'. Vertical asymptote x = '+p+'. Horizontal asymptote y = '+q+'.';
      var N=9, rows=[];
      for(var i=0;i<N;i++){ var x=view.xmin+(view.xmax-view.xmin)*i/(N-1); var y=f(x); rows.push([fmt(x), isNaN(y)?'undefined (asymptote)':fmt(y)]); }
      renderDataRows(dataRows,rows);
    }
    function draw(ctx,w,h){
      var P=new Plot(ctx,w,h,view,{l:28,r:12,t:12,b:24}); P.clear(); P.grid();
      var f=function(x){ return Math.abs(x-p)<0.06 ? NaN : 2/(x-p)+q; };
      P.curve(f, INDIGO, 2.4);
      P.segment(p,view.ymin,p,view.ymax,AMBER2,1.4,[4,4]);
      P.segment(view.xmin,q,view.xmax,q,AMBER2,1.4,[4,4]);
      document.getElementById('act2VAsym').textContent='x = '+p;
      document.getElementById('act2HAsym').textContent='y = '+q;
      updateDataView(f);
    }
    register(canvas,draw);
    var sp=document.getElementById('act2RatP'), sq=document.getElementById('act2RatQ');
    function upd(){
      p=parseInt(sp.value,10); q=parseInt(sq.value,10);
      document.getElementById('act2RatPlab').textContent=p;
      document.getElementById('act2RatQlab').textContent=q;
      redrawAll();
    }
    sp.addEventListener('input',upd); sq.addEventListener('input',upd); upd();
  })();

  /* ACT2 CH 4 — Law of Cosines */
  (function(){
    var canvas=document.getElementById('act2LawCanvas'); if(!canvas) return;
    var view={xmin:-11,xmax:12,ymin:-2,ymax:11};
    var a=7, b=10, Cdeg=60;
    var dataBtn=document.getElementById('act2LawDataBtn'), dataPanel=document.getElementById('act2LawDataPanel'),
        dataDesc=document.getElementById('act2LawDataDesc'), dataRows=document.getElementById('act2LawDataRows');
    wireDataToggle(dataBtn,dataPanel);
    function updateDataView(cc){
      if(!dataDesc) return;
      dataDesc.textContent='Triangle with sides a = '+a+', b = '+b+', included angle C = '+Cdeg+'°. Law of Cosines: c² = a² + b² − 2ab·cos(C) = '+fmt(cc*cc,2)+', so c = '+fmt(cc,2)+'.';
      renderDataRows(dataRows,[
        ['a',a],['b',b],['C',Cdeg+'°'],['c (Law of Cosines)',fmt(cc,2)]
      ]);
    }
    function draw(ctx,w,h){
      var P=new Plot(ctx,w,h,view,{l:28,r:12,t:12,b:24}); P.clear();
      var c=P.ctx, Crad=Cdeg*Math.PI/180;
      var Ax=a*Math.cos(Crad), Ay=a*Math.sin(Crad), Bx=b, By=0;
      c.beginPath(); c.moveTo(P.X(0),P.Y(0)); c.lineTo(P.X(Bx),P.Y(By)); c.lineTo(P.X(Ax),P.Y(Ay)); c.closePath();
      c.fillStyle='rgba(14,23,38,0.06)'; c.fill(); c.lineWidth=2; c.strokeStyle=INK; c.stroke();
      P.segment(0,0,Bx,By,AMBER2,2.6);
      P.segment(0,0,Ax,Ay,INDIGO,2.6);
      P.segment(Ax,Ay,Bx,By,INK,2.2);
      var cc=Math.sqrt(a*a+b*b-2*a*b*Math.cos(Crad));
      document.getElementById('act2SideC').textContent=fmt(cc,2);
      updateDataView(cc);
    }
    register(canvas,draw);
    var sa=document.getElementById('act2LawA'), sb=document.getElementById('act2LawB'), sC=document.getElementById('act2LawC');
    function upd(){
      a=parseInt(sa.value,10); b=parseInt(sb.value,10); Cdeg=parseInt(sC.value,10);
      document.getElementById('act2LawAlab').textContent=a;
      document.getElementById('act2LawBlab').textContent=b;
      document.getElementById('act2LawClab').textContent=Cdeg+'°';
      redrawAll();
    }
    sa.addEventListener('input',upd); sb.addEventListener('input',upd); sC.addEventListener('input',upd); upd();
  })();

  /* ACT2 CH 7 — inscribed angle theorem: angle at centre = 2 x angle at circumference */
  (function(){
    var canvas=document.getElementById('act2IncCanvas'); if(!canvas) return;
    var view={xmin:-6.4,xmax:6.4,ymin:-4.4,ymax:4.4};
    var R=4, thetaDeg=140;
    var dataBtn=document.getElementById('act2IncDataBtn'), dataPanel=document.getElementById('act2IncDataPanel'),
        dataDesc=document.getElementById('act2IncDataDesc'), dataRows=document.getElementById('act2IncDataRows');
    wireDataToggle(dataBtn,dataPanel);
    function updateDataView(A,B,C,inscribed){
      if(!dataDesc) return;
      dataDesc.textContent='Central angle AOB = '+fmt(thetaDeg,1)+'°. Inscribed angle ACB (from point C on the major arc) = '+fmt(inscribed,1)+'°. (Inscribed Angle Theorem: the inscribed angle is always half the central angle — half of '+fmt(thetaDeg,1)+'° is '+fmt(thetaDeg/2,1)+'°.)';
      renderDataRows(dataRows,[
        ['O',fmt(0),fmt(0)],
        ['A',fmt(A[0]),fmt(A[1])],
        ['B',fmt(B[0]),fmt(B[1])],
        ['C',fmt(C[0]),fmt(C[1])]
      ]);
    }
    function draw(ctx,w,h){
      var P=new Plot(ctx,w,h,view,{l:20,r:10,t:10,b:20}); P.clear();
      var c=P.ctx, N=120, i, a;
      c.beginPath();
      for(i=0;i<=N;i++){ a=2*Math.PI*i/N; var px=P.X(R*Math.cos(a)), py=P.Y(R*Math.sin(a)); if(i===0) c.moveTo(px,py); else c.lineTo(px,py); }
      c.closePath(); c.lineWidth=1.4; c.strokeStyle='#B8C3D6'; c.stroke();
      var half=thetaDeg/2*Math.PI/180;
      var angA=Math.PI/2+half, angB=Math.PI/2-half;
      var Ax=R*Math.cos(angA), Ay=R*Math.sin(angA);
      var Bx=R*Math.cos(angB), By=R*Math.sin(angB);
      var Cx=R*Math.cos(-Math.PI/2), Cy=R*Math.sin(-Math.PI/2);
      P.segment(0,0,Ax,Ay,'#AEB8C7',1.4);
      P.segment(0,0,Bx,By,'#AEB8C7',1.4);
      P.segment(Cx,Cy,Ax,Ay,INDIGO,2.2);
      P.segment(Cx,Cy,Bx,By,INDIGO,2.2);
      P.dot(Ax,Ay,INK,4); P.dot(Bx,By,INK,4); P.dot(Cx,Cy,AMBER2,4.5); P.dot(0,0,INK,3);
      var v1x=Ax-Cx, v1y=Ay-Cy, v2x=Bx-Cx, v2y=By-Cy;
      var dp=v1x*v2x+v1y*v2y, m1=Math.sqrt(v1x*v1x+v1y*v1y), m2=Math.sqrt(v2x*v2x+v2y*v2y);
      var inscribed=Math.acos(Math.max(-1,Math.min(1,dp/(m1*m2))))*180/Math.PI;
      document.getElementById('act2Central').textContent=fmt(thetaDeg,1)+'°';
      document.getElementById('act2Inscribed').textContent=fmt(inscribed,1)+'°';
      updateDataView([Ax,Ay],[Bx,By],[Cx,Cy],inscribed);
    }
    register(canvas,draw);
    var s=document.getElementById('act2IncTheta');
    function upd(){ thetaDeg=parseInt(s.value,10); document.getElementById('act2IncThetalab').textContent=thetaDeg+'°'; redrawAll(); }
    s.addEventListener('input',upd); upd();
  })();



  /* ══════════════════════════════════════════════════════════════════
     EST II — Pillar 2 MVP retrofit continued (track 3 of 8). Same
     shared Plot/register/redrawAll/fmt helpers as every other track.
     ══════════════════════════════════════════════════════════════════ */

  /* EST II CH 2 — a function and its inverse: f(x)=2^x, f^-1(x)=log2(x) */
  (function(){
    var canvas=document.getElementById('est2InvCanvas'); if(!canvas) return;
    var view={xmin:-1,xmax:6,ymin:-1,ymax:6};
    var x0=1;
    var dataBtn=document.getElementById('est2InvDataBtn'), dataPanel=document.getElementById('est2InvDataPanel'),
        dataDesc=document.getElementById('est2InvDataDesc'), dataRows=document.getElementById('est2InvDataRows');
    wireDataToggle(dataBtn,dataPanel);
    function updateDataView(fx0){
      if(!dataDesc) return;
      dataDesc.textContent='f(x) = 2ˣ and its inverse f⁻¹(x) = log₂x, reflections of each other across y = x. At x₀ = '+fmt(x0,2)+', f(x₀) = '+fmt(fx0,3)+', and f⁻¹(f(x₀)) = '+fmt(Math.log2(fx0),3)+' (recovers x₀, confirming the inverse relationship).';
      var N=8, rows=[];
      for(var i=1;i<=N;i++){ var x=view.xmin+(view.xmax-view.xmin)*i/(N+1); var inv=x>0?Math.log2(x):NaN; rows.push([fmt(x),fmt(Math.pow(2,x)),isNaN(inv)?'—':fmt(inv)]); }
      renderDataRows(dataRows,rows);
    }
    function draw(ctx,w,h){
      var P=new Plot(ctx,w,h,view,{l:28,r:12,t:12,b:24}); P.clear(); P.grid();
      P.curve(function(x){ return Math.pow(2,x); }, INDIGO, 2.4);
      P.curve(function(x){ return x>0 ? Math.log2(x) : NaN; }, AMBER2, 2.4);
      P.segment(view.xmin,view.xmin,view.xmax,view.xmax,'#AEB8C7',1,[4,4]);
      var fx0=Math.pow(2,x0);
      P.dot(x0,fx0,INK,5);
      P.dot(fx0,x0,INK,5);
      P.segment(x0,fx0,fx0,x0,'#AEB8C7',1,[2,2]);
      document.getElementById('est2FX0').textContent=fmt(fx0,3);
      document.getElementById('est2Identity').textContent=fmt(Math.log2(fx0),3);
      updateDataView(fx0);
    }
    register(canvas,draw);
    var s=document.getElementById('est2X0');
    function upd(){ x0=parseInt(s.value,10)/100; document.getElementById('est2X0lab').textContent=fmt(x0,2); redrawAll(); }
    s.addEventListener('input',upd); upd();
  })();

  /* EST II CH 5 — the unit circle, angle in radians */
  (function(){
    var canvas=document.getElementById('est2UcCanvas'); if(!canvas) return;
    var view={xmin:-1.6,xmax:1.6,ymin:-1.1,ymax:1.1};
    var theta=0.79;
    var dataBtn=document.getElementById('est2UcDataBtn'), dataPanel=document.getElementById('est2UcDataPanel'),
        dataDesc=document.getElementById('est2UcDataDesc'), dataRows=document.getElementById('est2UcDataRows');
    wireDataToggle(dataBtn,dataPanel);
    function updateDataView(cx,cy,tanv){
      if(!dataDesc) return;
      dataDesc.textContent='Point on the unit circle at θ = '+fmt(theta,2)+' rad, coordinates ('+fmt(cx,3)+', '+fmt(cy,3)+').';
      renderDataRows(dataRows,[
        ['θ',fmt(theta,2)+' rad'],
        ['x = cos θ',fmt(cx,3)],
        ['y = sin θ',fmt(cy,3)],
        ['tan θ',isNaN(tanv)?'undefined':fmt(tanv,3)]
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
      var cx=Math.cos(theta), cy=Math.sin(theta);
      P.segment(0,0,cx,0,INDIGO,3);
      P.segment(cx,0,cx,cy,AMBER2,2.4,[4,3]);
      P.segment(0,0,cx,cy,INK,2);
      P.dot(cx,cy,INK,5.5);
      document.getElementById('est2UcCos').textContent=fmt(cx,3);
      document.getElementById('est2UcSin').textContent=fmt(cy,3);
      var tanv = Math.abs(cx)<1e-6 ? NaN : cy/cx;
      document.getElementById('est2UcTan').textContent = isNaN(tanv) ? 'undefined' : fmt(tanv,3);
      updateDataView(cx,cy,tanv);
    }
    register(canvas,draw);
    var s=document.getElementById('est2UcT');
    function upd(){ theta=parseInt(s.value,10)/100; document.getElementById('est2UcTlab').textContent=fmt(theta,2)+' rad'; redrawAll(); }
    s.addEventListener('input',upd); upd();
  })();

  /* EST II CH 6 — circle equation, centre-radius */
  (function(){
    var canvas=document.getElementById('est2CircCanvas'); if(!canvas) return;
    var view={xmin:-10,xmax:10,ymin:-7,ymax:7};
    var h=3, k=-2, r=5;
    var dataBtn=document.getElementById('est2CircDataBtn'), dataPanel=document.getElementById('est2CircDataPanel'),
        dataDesc=document.getElementById('est2CircDataDesc'), dataRows=document.getElementById('est2CircDataRows');
    wireDataToggle(dataBtn,dataPanel);
    function updateDataView(eq){
      if(!dataDesc) return;
      dataDesc.textContent='Circle: '+eq+'. Centre ('+h+', '+k+'), radius '+r+'.';
      var N=12, rows=[];
      for(var i=0;i<N;i++){ var a=2*Math.PI*i/N; rows.push([fmt(h+r*Math.cos(a)),fmt(k+r*Math.sin(a))]); }
      renderDataRows(dataRows,rows);
    }
    function draw(ctx,w,h2){
      var P=new Plot(ctx,w,h2,view,{l:28,r:12,t:12,b:24}); P.clear(); P.grid();
      var c=P.ctx, N=120, i, a;
      c.beginPath();
      for(i=0;i<=N;i++){ a=2*Math.PI*i/N; var px=P.X(h+r*Math.cos(a)), py=P.Y(k+r*Math.sin(a)); if(i===0) c.moveTo(px,py); else c.lineTo(px,py); }
      c.closePath(); c.lineWidth=2.4; c.strokeStyle=INDIGO; c.fillStyle='rgba(30,58,110,0.10)'; c.fill(); c.stroke();
      P.dot(h,k,INK,4);
      var eq='(x'+(h>=0?'-'+fmt(h,0):'+'+fmt(-h,0))+')² + (y'+(k>=0?'-'+fmt(k,0):'+'+fmt(-k,0))+')² = '+fmt(r*r,0);
      document.getElementById('est2CircEq').textContent=eq;
      updateDataView(eq);
    }
    register(canvas,draw);
    var sh=document.getElementById('est2CircH'), sk=document.getElementById('est2CircK'), sr=document.getElementById('est2CircR');
    function upd(){
      h=parseInt(sh.value,10); k=parseInt(sk.value,10); r=parseInt(sr.value,10);
      document.getElementById('est2CircHlab').textContent=h;
      document.getElementById('est2CircKlab').textContent=k;
      document.getElementById('est2CircRlab').textContent=r;
      redrawAll();
    }
    sh.addEventListener('input',upd); sk.addEventListener('input',upd); sr.addEventListener('input',upd); upd();
  })();



  /* ══════════════════════════════════════════════════════════════════
     EST — Pillar 2 MVP roadmap item continued: retrofitting the 8
     zero-explorer tracks, one at a time. Precalc got its 3 in a prior
     PR; these are EST's 3. Same shared Plot/register/redrawAll/fmt
     helpers, guarded by `if(!canvas) return`.
     ══════════════════════════════════════════════════════════════════ */

  /* EST CH 2 — parabola in vertex form */
  (function(){
    var canvas=document.getElementById('estParabCanvas'); if(!canvas) return;
    var view={xmin:-8,xmax:8,ymin:-8,ymax:8};
    var a=1, h=1, k=-2;
    var dataBtn=document.getElementById('estParabDataBtn'), dataPanel=document.getElementById('estParabDataPanel'),
        dataDesc=document.getElementById('estParabDataDesc'), dataRows=document.getElementById('estParabDataRows');
    wireDataToggle(dataBtn,dataPanel);
    function updateDataView(f){
      if(!dataDesc) return;
      dataDesc.textContent='y = '+fmt(a,1)+'(x − '+h+')² + '+k+'.'+(Math.abs(a)>1e-9?' Vertex ('+h+', '+k+').':' a = 0, so this is the horizontal line y = '+k+'.');
      var N=9, rows=[];
      for(var i=0;i<N;i++){ var x=view.xmin+(view.xmax-view.xmin)*i/(N-1); rows.push([fmt(x),fmt(f(x))]); }
      renderDataRows(dataRows,rows);
    }
    function draw(ctx,w,h2){
      var P=new Plot(ctx,w,h2,view,{l:28,r:12,t:12,b:24}); P.clear(); P.grid();
      if(Math.abs(a)<1e-9){
        var flat=function(){ return k; };
        P.curve(flat, INDIGO, 2.6);
        document.getElementById('estVertex').textContent='—';
        document.getElementById('estRoots').textContent = Math.abs(k)<1e-9 ? 'all x' : 'none (a=0)';
        updateDataView(flat);
        return;
      }
      var f=function(x){ return a*(x-h)*(x-h)+k; };
      P.curve(f, INDIGO, 2.6);
      P.segment(h,view.ymin,h,view.ymax,'#AEB8C7',1,[4,4]);
      P.dot(h,k,INK,5);
      document.getElementById('estVertex').textContent='('+fmt(h,0)+', '+fmt(k,0)+')';
      var disc=-k/a, rt=document.getElementById('estRoots');
      if(disc<0){ rt.textContent='no real roots'; }
      else if(disc===0){ rt.textContent=fmt(h,2); P.dot(h,0,AMBER2,4); }
      else { var r1=h-Math.sqrt(disc), r2=h+Math.sqrt(disc); rt.textContent=fmt(Math.min(r1,r2),2)+', '+fmt(Math.max(r1,r2),2); P.dot(r1,0,AMBER2,4); P.dot(r2,0,AMBER2,4); }
      updateDataView(f);
    }
    register(canvas,draw);
    var sa=document.getElementById('estParabA'), sh=document.getElementById('estParabH'), sk=document.getElementById('estParabK');
    function upd(){
      a=parseInt(sa.value,10)/10; h=parseInt(sh.value,10); k=parseInt(sk.value,10);
      document.getElementById('estParabAlab').textContent=fmt(a,1);
      document.getElementById('estParabHlab').textContent=h;
      document.getElementById('estParabKlab').textContent=k;
      redrawAll();
    }
    sa.addEventListener('input',upd); sh.addEventListener('input',upd); sk.addEventListener('input',upd); upd();
  })();

  /* EST CH 6 — the Pythagorean theorem, visual proof via squares on each side */
  (function(){
    var canvas=document.getElementById('estPythCanvas'); if(!canvas) return;
    var view={xmin:-9,xmax:15,ymin:-9,ymax:15};
    var a=6, b=8;
    var dataBtn=document.getElementById('estPythDataBtn'), dataPanel=document.getElementById('estPythDataPanel'),
        dataDesc=document.getElementById('estPythDataDesc'), dataRows=document.getElementById('estPythDataRows');
    wireDataToggle(dataBtn,dataPanel);
    function updateDataView(c2,cc){
      if(!dataDesc) return;
      dataDesc.textContent='Right triangle with legs a = '+a+' and b = '+b+'. a² + b² = '+(a*a)+' + '+(b*b)+' = '+c2+' = c², so c = '+fmt(cc,2)+'.';
      renderDataRows(dataRows,[
        ['a',a],['b',b],['a²',a*a],['b²',b*b],['a² + b²',c2],['c (= √(a²+b²))',fmt(cc,2)],['c²',c2]
      ]);
    }
    function draw(ctx,w,h){
      var P=new Plot(ctx,w,h,view,{l:28,r:12,t:12,b:24}); P.clear();
      var c=P.ctx;
      c.beginPath(); c.moveTo(P.X(0),P.Y(0)); c.lineTo(P.X(a),P.Y(0)); c.lineTo(P.X(0),P.Y(b)); c.closePath();
      c.fillStyle='rgba(14,23,38,0.06)'; c.fill(); c.lineWidth=2; c.strokeStyle=INK; c.stroke();
      c.beginPath(); c.moveTo(P.X(0),P.Y(0)); c.lineTo(P.X(a),P.Y(0)); c.lineTo(P.X(a),P.Y(-a)); c.lineTo(P.X(0),P.Y(-a)); c.closePath();
      c.fillStyle='rgba(30,58,110,0.18)'; c.fill(); c.lineWidth=1.6; c.strokeStyle=INDIGO; c.stroke();
      c.beginPath(); c.moveTo(P.X(0),P.Y(0)); c.lineTo(P.X(0),P.Y(b)); c.lineTo(P.X(-b),P.Y(b)); c.lineTo(P.X(-b),P.Y(0)); c.closePath();
      c.fillStyle='rgba(200,144,42,0.18)'; c.fill(); c.lineWidth=1.6; c.strokeStyle=AMBER2; c.stroke();
      var hx=a, hy=0, hx2=0, hy2=b, dx=hx2-hx, dy=hy2-hy, len=Math.sqrt(dx*dx+dy*dy);
      var nx=-dy/len, ny=dx/len;
      var midx=(hx+hx2)/2, midy=(hy+hy2)/2, tx=midx+nx*0.01, ty=midy+ny*0.01;
      if(tx*tx+ty*ty < midx*midx+midy*midy){ nx=-nx; ny=-ny; }
      var p1x=hx+nx*len, p1y=hy+ny*len, p2x=hx2+nx*len, p2y=hy2+ny*len;
      c.beginPath(); c.moveTo(P.X(hx),P.Y(hy)); c.lineTo(P.X(hx2),P.Y(hy2)); c.lineTo(P.X(p2x),P.Y(p2y)); c.lineTo(P.X(p1x),P.Y(p1y)); c.closePath();
      c.fillStyle='rgba(14,23,38,0.10)'; c.fill(); c.lineWidth=1.6; c.strokeStyle=INK; c.stroke();
      var c2=a*a+b*b, cc=Math.sqrt(c2);
      document.getElementById('estA2B2').textContent=fmt(c2,0);
      document.getElementById('estC2').textContent=fmt(c2,0);
      document.getElementById('estHyp').textContent=fmt(cc,2);
      updateDataView(c2,cc);
    }
    register(canvas,draw);
    var sa=document.getElementById('estLegA'), sb=document.getElementById('estLegB');
    function upd(){
      a=parseInt(sa.value,10); b=parseInt(sb.value,10);
      document.getElementById('estLegAlab').textContent=a;
      document.getElementById('estLegBlab').textContent=b;
      redrawAll();
    }
    sa.addEventListener('input',upd); sb.addEventListener('input',upd); upd();
  })();

  /* EST CH 7 — SOH-CAH-TOA, hypotenuse fixed at 10 */
  (function(){
    var canvas=document.getElementById('estTrigCanvas'); if(!canvas) return;
    var view={xmin:-1,xmax:11,ymin:-1,ymax:11};
    var thetaDeg=30, HYP=10;
    var dataBtn=document.getElementById('estTrigDataBtn'), dataPanel=document.getElementById('estTrigDataPanel'),
        dataDesc=document.getElementById('estTrigDataDesc'), dataRows=document.getElementById('estTrigDataRows');
    wireDataToggle(dataBtn,dataPanel);
    function updateDataView(opp,adj,theta){
      if(!dataDesc) return;
      dataDesc.textContent='Right triangle with hypotenuse '+HYP+' and angle θ = '+thetaDeg+'°. Opposite = '+fmt(opp,2)+', adjacent = '+fmt(adj,2)+'.';
      renderDataRows(dataRows,[
        ['θ',thetaDeg+'°'],
        ['hypotenuse',HYP],
        ['opposite',fmt(opp,2)],
        ['adjacent',fmt(adj,2)],
        ['sin θ',fmt(Math.sin(theta),3)],
        ['cos θ',fmt(Math.cos(theta),3)],
        ['tan θ',fmt(Math.tan(theta),3)]
      ]);
    }
    function draw(ctx,w,h){
      var P=new Plot(ctx,w,h,view,{l:28,r:12,t:12,b:24}); P.clear();
      var c=P.ctx, theta=thetaDeg*Math.PI/180;
      var opp=HYP*Math.sin(theta), adj=HYP*Math.cos(theta);
      c.beginPath(); c.moveTo(P.X(0),P.Y(0)); c.lineTo(P.X(adj),P.Y(0)); c.lineTo(P.X(adj),P.Y(opp)); c.closePath();
      c.fillStyle='rgba(14,23,38,0.06)'; c.fill(); c.lineWidth=2; c.strokeStyle=INK; c.stroke();
      P.segment(0,0,adj,0,AMBER2,3);
      P.segment(adj,0,adj,opp,INDIGO,3);
      P.segment(0,0,adj,opp,INK,2);
      document.getElementById('estOpp').textContent=fmt(opp,2);
      document.getElementById('estAdj').textContent=fmt(adj,2);
      document.getElementById('estRatios').textContent=fmt(Math.sin(theta),3)+' / '+fmt(Math.cos(theta),3)+' / '+fmt(Math.tan(theta),3);
      updateDataView(opp,adj,theta);
    }
    register(canvas,draw);
    var s=document.getElementById('estAngle');
    function upd(){ thetaDeg=parseInt(s.value,10); document.getElementById('estAnglelab').textContent=thetaDeg+'°'; redrawAll(); }
    s.addEventListener('input',upd); upd();
  })();

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
        cLab.textContent='c (focus distance)';
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
        cLab.textContent='c (focus distance)';
        P.dot(cc2,0,AMBER2,4); P.dot(-cc2,0,AMBER2,4);
        document.getElementById('cnShape').textContent='hyperbola';
        document.getElementById('cnC').textContent=fmt(cc2,3);
        updateDataView('hyperbola',cc2);
      } else {
        var p=A/2;
        P.curve(function(x){ return (x*x)/(4*p); }, INDIGO, 2.6);
        P.dot(0,p,AMBER2,4);
        cLab.textContent='p (focal length)';
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
      if(Math.abs(r)<0.001){ lab.textContent='—'; val.textContent='—'; }
      else if(r>0){ lab.textContent='doubling time'; val.textContent=fmt(Math.LN2/r,2); }
      else { lab.textContent='half-life'; val.textContent=fmt(Math.LN2/-r,2); }
      updateDataView(f,model);
    }
    register(canvas,draw);
    var s=document.getElementById('gdR');
    function upd(){ r=parseFloat(s.value)/100; document.getElementById('gdRlab').textContent=(r>=0?'+':'')+fmt(r*100,1)+'%'; redrawAll(); }
    s.addEventListener('input',upd); upd();
  })();

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

  /* ═══════════════════ LINEAR ALGEBRA TRACK EXPLORERS (Pillar 2 MVP —
     same retrofit as MVC above; linalg/ also launched with 0 explorers).
     Flagship item: la-matrices' transformation sandbox is the exact
     roadmap line "a linear-algebra transformation sandbox (matrix in,
     live-warped grid out)". */

  /* LINALG CH 1 — dot product, norm & Cauchy–Schwarz. u is fixed at the
     Worked example 1.B vector (1,2); v keeps the same length (√5) as
     example 1.B's v = (2,1) but rotates freely, so dragging finds the
     equality case (v parallel to u) the proof singles out. */
  (function(){
    var canvas=document.getElementById('laVecCanvas'); if(!canvas) return;
    var ux=1, uy=2, vmag=Math.sqrt(5), theta=27*Math.PI/180;
    var view={xmin:-3,xmax:3,ymin:-3,ymax:3};
    var dataBtn=document.getElementById('laVecDataBtn'), dataPanel=document.getElementById('laVecDataPanel'),
        dataDesc=document.getElementById('laVecDataDesc'), dataRows=document.getElementById('laVecDataRows');
    wireDataToggle(dataBtn,dataPanel);
    function updateDataView(vx,vy,dot,umag){
      if(!dataDesc) return;
      dataDesc.textContent='u = ⟨1, 2⟩ (fixed). v = ⟨'+fmt(vx,2)+', '+fmt(vy,2)+'⟩, same length as u (|v| = √5). u·v = '+fmt(dot,3)+'. |u||v| = '+fmt(umag*vmag,3)+'. Cauchy–Schwarz: |u·v| ≤ |u||v| always holds — equality exactly when v is parallel to u.';
      renderDataRows(dataRows,[
        ['u','⟨1, 2⟩',fmt(umag,3)],
        ['v','⟨'+fmt(vx,2)+', '+fmt(vy,2)+'⟩',fmt(vmag,3)],
        ['u · v',fmt(dot,3)],
        ['|u| |v|',fmt(umag*vmag,3)]
      ]);
    }
    function draw(ctx,w,h){
      var P=new Plot(ctx,w,h,view,{l:30,r:12,t:14,b:26}); P.clear(); P.grid();
      var vx=vmag*Math.cos(theta), vy=vmag*Math.sin(theta);
      var dot=ux*vx+uy*vy, umag=Math.sqrt(ux*ux+uy*uy);
      var c=P.ctx;
      arrow(c,P.X(0),P.Y(0),P.X(ux),P.Y(uy),INDIGO,2.8);
      arrow(c,P.X(0),P.Y(0),P.X(vx),P.Y(vy),AMBER2,2.8);
      document.getElementById('laVecDot').textContent=fmt(dot,3);
      document.getElementById('laVecBound').textContent=fmt(umag*vmag,3);
      updateDataView(vx,vy,dot,umag);
    }
    register(canvas,draw);
    var s=document.getElementById('laVecTheta');
    function upd(){ theta=parseInt(s.value,10)*Math.PI/180; document.getElementById('laVecThetaVal').textContent=s.value+'°'; redrawAll(); }
    s.addEventListener('input',upd); upd();
  })();

  /* LINALG CH 2 — two linear equations, one intersection (or none/
     infinite). Eq. 1 is fixed at x + y = 5; Eq. 2 defaults to x − y = 1,
     matching Worked example 2.A exactly (solution (3,2)) — dragging its
     sliders finds the dependent (a2 = −1, c2 = −5) and inconsistent
     (a2 = −1, c2 ≠ −5) cases from the chapter's own "how many solutions"
     cards. */
  (function(){
    var canvas=document.getElementById('laSysCanvas'); if(!canvas) return;
    var a2=1, c2=1;
    var view={xmin:-4,xmax:8,ymin:-4,ymax:10};
    var dataBtn=document.getElementById('laSysDataBtn'), dataPanel=document.getElementById('laSysDataPanel'),
        dataDesc=document.getElementById('laSysDataDesc'), dataRows=document.getElementById('laSysDataRows');
    wireDataToggle(dataBtn,dataPanel);
    function line1(x){ return 5-x; }
    function line2(x){ return a2*x-c2; }
    function solve(){
      if(Math.abs(a2+1)<1e-9){
        if(Math.abs(-c2-5)<1e-9) return {type:'dependent'};
        return {type:'inconsistent'};
      }
      var x=(5+c2)/(a2+1), y=5-x;
      return {type:'unique', x:x, y:y};
    }
    function updateDataView(sol){
      if(!dataDesc) return;
      var desc='Eq. 1 (fixed): x + y = 5. Eq. 2: '+fmt(a2,2)+'x − y = '+fmt(c2,2)+'. ';
      if(sol.type==='unique') desc+='Unique solution (x, y) = ('+fmt(sol.x,3)+', '+fmt(sol.y,3)+') — consistent, independent.';
      else if(sol.type==='dependent') desc+='The two equations describe the same line — infinitely many solutions (consistent, dependent).';
      else desc+='The two lines are parallel and distinct — no solution (inconsistent).';
      dataDesc.textContent=desc;
      renderDataRows(dataRows,[
        ['Eq. 1','x + y = 5'],
        ['Eq. 2',fmt(a2,2)+'x − y = '+fmt(c2,2)],
        ['type',sol.type],
        ['solution', sol.type==='unique' ? '('+fmt(sol.x,3)+', '+fmt(sol.y,3)+')' : (sol.type==='dependent'?'infinitely many':'none')]
      ]);
    }
    function draw(ctx,w,h){
      var P=new Plot(ctx,w,h,view,{l:30,r:12,t:14,b:26}); P.clear(); P.grid();
      P.curve(line1,INDIGO,2.6);
      P.curve(line2,AMBER2,2.6);
      var sol=solve();
      if(sol.type==='unique') P.dot(sol.x,sol.y,INK,5.5);
      document.getElementById('laSysType').textContent=
        sol.type==='unique' ? 'unique solution' : sol.type==='dependent' ? 'infinitely many (dependent)' : 'no solution (inconsistent)';
      document.getElementById('laSysSol').textContent= sol.type==='unique' ? '('+fmt(sol.x,3)+', '+fmt(sol.y,3)+')' : '—';
      updateDataView(sol);
    }
    register(canvas,draw);
    var sa=document.getElementById('laSysA2'), sc=document.getElementById('laSysC2');
    function upd(){
      a2=parseFloat(sa.value); c2=parseFloat(sc.value);
      document.getElementById('laSysA2val').textContent=fmt(a2,1);
      document.getElementById('laSysC2val').textContent=fmt(c2,1);
      redrawAll();
    }
    sa.addEventListener('input',upd); sc.addEventListener('input',upd); upd();
  })();

  /* LINALG CH 3 — matrix transformation sandbox: matrix in, live-warped
     grid out. Presets snap to Identity/Rotate 90°/Scale ×2/Shear/Reflect;
     the filled parallelogram is the image of the unit square, amber
     instead of indigo exactly when det < 0 (orientation reversed) —
     foreshadowing CH 4's signed area. */
  (function(){
    var canvas=document.getElementById('laMatCanvas'); if(!canvas) return;
    var a=1,b=0,c=0,d=1;
    var view={xmin:-6,xmax:6,ymin:-6,ymax:6};
    var GRID_EXT=2, GRID_STEP=0.5;
    var dataBtn=document.getElementById('laMatDataBtn'), dataPanel=document.getElementById('laMatDataPanel'),
        dataDesc=document.getElementById('laMatDataDesc'), dataRows=document.getElementById('laMatDataRows');
    wireDataToggle(dataBtn,dataPanel);
    function tf(x,y){ return {x:a*x+b*y, y:c*x+d*y}; }
    function updateDataView(det){
      if(!dataDesc) return;
      dataDesc.textContent='A = [['+fmt(a,2)+', '+fmt(b,2)+'], ['+fmt(c,2)+', '+fmt(d,2)+']]. det(A) = '+fmt(det,3)+'. The unit square’s image has area |det(A)| = '+fmt(Math.abs(det),3)+', '+(det<0?'with orientation reversed (flipped).':'preserving orientation.');
      renderDataRows(dataRows,[
        ['A','[['+fmt(a,2)+', '+fmt(b,2)+'], ['+fmt(c,2)+', '+fmt(d,2)+']]'],
        ['A e₁ (column 1)','('+fmt(a,2)+', '+fmt(c,2)+')'],
        ['A e₂ (column 2)','('+fmt(b,2)+', '+fmt(d,2)+')'],
        ['det(A)',fmt(det,3)],
        ['area scale factor',fmt(Math.abs(det),3)],
        ['orientation', det<0?'reversed':(det>0?'preserved':'collapsed (singular)')]
      ]);
    }
    function draw(ctx,wpx,hpx){
      var P=new Plot(ctx,wpx,hpx,view,{l:30,r:12,t:14,b:26}); P.clear();
      var cx=P.ctx, k;
      cx.strokeStyle='rgba(140,151,168,.35)'; cx.lineWidth=1;
      for(k=-GRID_EXT;k<=GRID_EXT+1e-9;k+=GRID_STEP){
        cx.beginPath(); cx.moveTo(P.X(k),P.Y(-GRID_EXT)); cx.lineTo(P.X(k),P.Y(GRID_EXT)); cx.stroke();
        cx.beginPath(); cx.moveTo(P.X(-GRID_EXT),P.Y(k)); cx.lineTo(P.X(GRID_EXT),P.Y(k)); cx.stroke();
      }
      var det=a*d-b*c;
      var s00=tf(0,0), s10=tf(1,0), s11=tf(1,1), s01=tf(0,1);
      cx.beginPath(); cx.moveTo(P.X(s00.x),P.Y(s00.y)); cx.lineTo(P.X(s10.x),P.Y(s10.y));
      cx.lineTo(P.X(s11.x),P.Y(s11.y)); cx.lineTo(P.X(s01.x),P.Y(s01.y)); cx.closePath();
      cx.fillStyle = det<0 ? 'rgba(200,144,42,.22)' : 'rgba(30,58,110,.18)';
      cx.fill();
      cx.strokeStyle = det<0 ? AMBER2 : INDIGO2; cx.lineWidth=1.4;
      for(k=-GRID_EXT;k<=GRID_EXT+1e-9;k+=GRID_STEP){
        var p1=tf(k,-GRID_EXT), p2=tf(k,GRID_EXT);
        cx.beginPath(); cx.moveTo(P.X(p1.x),P.Y(p1.y)); cx.lineTo(P.X(p2.x),P.Y(p2.y)); cx.stroke();
        var q1=tf(-GRID_EXT,k), q2=tf(GRID_EXT,k);
        cx.beginPath(); cx.moveTo(P.X(q1.x),P.Y(q1.y)); cx.lineTo(P.X(q2.x),P.Y(q2.y)); cx.stroke();
      }
      P.grid();
      arrow(cx,P.X(0),P.Y(0),P.X(a),P.Y(c),INDIGO,2.8);
      arrow(cx,P.X(0),P.Y(0),P.X(b),P.Y(d),AMBER2,2.8);
      document.getElementById('laMatDet').textContent=fmt(det,3);
      document.getElementById('laMatArea').textContent=fmt(Math.abs(det),3);
      updateDataView(det);
    }
    register(canvas,draw);
    var sa=document.getElementById('laMatA'), sb=document.getElementById('laMatB'),
        sc=document.getElementById('laMatC'), sd=document.getElementById('laMatD');
    function syncLabels(){
      document.getElementById('laMatAval').textContent=fmt(a,2);
      document.getElementById('laMatBval').textContent=fmt(b,2);
      document.getElementById('laMatCval').textContent=fmt(c,2);
      document.getElementById('laMatDval').textContent=fmt(d,2);
    }
    function upd(){ a=parseFloat(sa.value); b=parseFloat(sb.value); c=parseFloat(sc.value); d=parseFloat(sd.value); syncLabels(); redrawAll(); }
    [sa,sb,sc,sd].forEach(function(el){ el.addEventListener('input',upd); });
    upd();
    var PRESETS={ identity:[1,0,0,1], rot90:[0,-1,1,0], scale2:[2,0,0,2], shear:[1,1,0,1], reflect:[1,0,0,-1] };
    document.querySelectorAll('.radios button').forEach(function(btn){
      if(!btn.closest('.ex-controls')||!btn.closest('.ex-controls').querySelector('#laMatA')) return;
      btn.addEventListener('click',function(){
        btn.parentNode.querySelectorAll('button').forEach(function(x){x.classList.remove('on');});
        btn.classList.add('on');
        var p=PRESETS[btn.getAttribute('data-rule')]; if(!p) return;
        sa.value=p[0]; sb.value=p[1]; sc.value=p[2]; sd.value=p[3];
        upd();
      });
    });
  })();

  /* LINALG CH 4 — determinant as a signed area. Default u=(3,1), v=(1,2)
     (det = 5) — a fresh non-degenerate pair, distinct from CH 3's matrix
     so both explorers stay independently meaningful. Fill flips indigo →
     amber when det < 0, matching CH 3's own orientation-flip convention. */
  (function(){
    var canvas=document.getElementById('laDetCanvas'); if(!canvas) return;
    var ux=3, uy=1, vx=1, vy=2;
    var view={xmin:-3,xmax:8,ymin:-3,ymax:8};
    var dataBtn=document.getElementById('laDetDataBtn'), dataPanel=document.getElementById('laDetDataPanel'),
        dataDesc=document.getElementById('laDetDataDesc'), dataRows=document.getElementById('laDetDataRows');
    wireDataToggle(dataBtn,dataPanel);
    function updateDataView(det){
      if(!dataDesc) return;
      dataDesc.textContent='u = ('+fmt(ux,2)+', '+fmt(uy,2)+'), v = ('+fmt(vx,2)+', '+fmt(vy,2)+'). det([u v]) = uₓvy − uyvx = '+fmt(det,3)+'. |det| = area of the parallelogram spanned by u and v = '+fmt(Math.abs(det),3)+'. '+(Math.abs(det)<1e-9?'u and v are linearly dependent (parallel, or one is the zero vector) — the matrix [u v] is singular (not invertible).':'The matrix [u v] is invertible (det ≠ 0).');
      renderDataRows(dataRows,[
        ['u','('+fmt(ux,2)+', '+fmt(uy,2)+')'],
        ['v','('+fmt(vx,2)+', '+fmt(vy,2)+')'],
        ['det = uₓvy − uyvx',fmt(ux*vy-uy*vx,3)],
        ['area = |det|',fmt(Math.abs(ux*vy-uy*vx),3)],
        ['invertible?', Math.abs(ux*vy-uy*vx)<1e-9 ? 'no (singular)' : 'yes']
      ]);
    }
    function draw(ctx,w,h){
      var P=new Plot(ctx,w,h,view,{l:30,r:12,t:14,b:26}); P.clear(); P.grid();
      var det=ux*vy-uy*vx, c=P.ctx;
      c.beginPath(); c.moveTo(P.X(0),P.Y(0)); c.lineTo(P.X(ux),P.Y(uy));
      c.lineTo(P.X(ux+vx),P.Y(uy+vy)); c.lineTo(P.X(vx),P.Y(vy)); c.closePath();
      c.fillStyle = det<0 ? 'rgba(200,144,42,.25)' : 'rgba(30,58,110,.20)';
      c.fill();
      arrow(c,P.X(0),P.Y(0),P.X(ux),P.Y(uy),INDIGO,2.8);
      arrow(c,P.X(0),P.Y(0),P.X(vx),P.Y(vy),AMBER2,2.8);
      document.getElementById('laDetVal').textContent=fmt(det,3);
      document.getElementById('laDetArea').textContent=fmt(Math.abs(det),3);
      document.getElementById('laDetInv').textContent = Math.abs(det)<1e-9 ? 'singular' : 'invertible';
      updateDataView(det);
    }
    register(canvas,draw);
    var su=document.getElementById('laDetUx'), suy=document.getElementById('laDetUy'),
        sv=document.getElementById('laDetVx'), svy=document.getElementById('laDetVy');
    function upd(){
      ux=parseFloat(su.value); uy=parseFloat(suy.value); vx=parseFloat(sv.value); vy=parseFloat(svy.value);
      document.getElementById('laDetUxval').textContent=fmt(ux,2);
      document.getElementById('laDetUyval').textContent=fmt(uy,2);
      document.getElementById('laDetVxval').textContent=fmt(vx,2);
      document.getElementById('laDetVyval').textContent=fmt(vy,2);
      redrawAll();
    }
    [su,suy,sv,svy].forEach(function(el){ el.addEventListener('input',upd); });
    upd();
  })();

  /* ══════════════════════════════════════════════════════════════════
     LINEAR ALGEBRA — chapters 5-8 (vector spaces, eigenvalues, linear
     transformations, orthogonality/least squares). Same shared Plot/
     register/redrawAll/fmt/wireDataToggle/renderDataRows/arrow helpers.
     ══════════════════════════════════════════════════════════════════ */

  /* LA CH 5 — span of two vectors in R^2, u fixed, v's angle adjustable */
  (function(){
    var canvas=document.getElementById('laSpanCanvas'); if(!canvas) return;
    var view={xmin:-6,xmax:6,ymin:-6,ymax:6};
    var u=[2,0];
    var angleDeg=60, c1=1, c2=1;
    var dataBtn=document.getElementById('laSpanDataBtn'), dataPanel=document.getElementById('laSpanDataPanel'),
        dataDesc=document.getElementById('laSpanDataDesc'), dataRows=document.getElementById('laSpanDataRows');
    wireDataToggle(dataBtn,dataPanel);
    function vOf(){
      var rad=angleDeg*Math.PI/180, len=Math.sqrt(u[0]*u[0]+u[1]*u[1]);
      return [len*Math.cos(rad), len*Math.sin(rad)];
    }
    function updateDataView(v,result,dependent){
      if(!dataDesc) return;
      dataDesc.textContent='u = ⟨'+fmt(u[0],2)+', '+fmt(u[1],2)+'⟩, v = ⟨'+fmt(v[0],2)+', '+fmt(v[1],2)+'⟩. c₁u + c₂v = ⟨'+fmt(result[0],2)+', '+fmt(result[1],2)+'⟩. '+(dependent ? 'u and v are parallel here — linearly dependent, span is just a line.' : 'u and v are linearly independent here — span is all of ℝ².');
      renderDataRows(dataRows,[
        ['u','⟨'+fmt(u[0],2)+', '+fmt(u[1],2)+'⟩'],
        ['v','⟨'+fmt(v[0],2)+', '+fmt(v[1],2)+'⟩'],
        ['c₁u + c₂v','⟨'+fmt(result[0],2)+', '+fmt(result[1],2)+'⟩']
      ]);
    }
    function draw(ctx,w,h){
      var P=new Plot(ctx,w,h,view,{l:30,r:12,t:14,b:26}); P.clear(); P.grid();
      var c=P.ctx, v=vOf();
      var det=u[0]*v[1]-u[1]*v[0];
      var dependent=Math.abs(det)<1e-6;
      // faint dots sampling span(u,v)
      c.fillStyle='rgba(86,97,115,0.28)';
      for(var i=0;i<180;i++){
        var rc1=(Math.random()*6-3), rc2=(Math.random()*6-3);
        var px=rc1*u[0]+rc2*v[0], py=rc1*u[1]+rc2*v[1];
        if(px<view.xmin||px>view.xmax||py<view.ymin||py>view.ymax) continue;
        c.beginPath(); c.arc(P.X(px),P.Y(py),1.4,0,2*Math.PI); c.fill();
      }
      arrow(c,P.X(0),P.Y(0),P.X(u[0]),P.Y(u[1]),INDIGO,2.6);
      arrow(c,P.X(0),P.Y(0),P.X(v[0]),P.Y(v[1]),AMBER2,2.6);
      var result=[c1*u[0]+c2*v[0], c1*u[1]+c2*v[1]];
      P.dot(result[0],result[1],INK,5);
      document.getElementById('laSpanResult').textContent='⟨'+fmt(result[0],2)+', '+fmt(result[1],2)+'⟩';
      document.getElementById('laSpanStatus').textContent = dependent ? 'only a line' : 'all of ℝ²';
      updateDataView(v,result,dependent);
    }
    register(canvas,draw);
    var sAngle=document.getElementById('laSpanVx'), sC1=document.getElementById('laSpanC1'), sC2=document.getElementById('laSpanC2');
    function upd(){
      angleDeg=parseFloat(sAngle.value); c1=parseFloat(sC1.value); c2=parseFloat(sC2.value);
      document.getElementById('laSpanVxVal').textContent=fmt(angleDeg,0)+'°';
      document.getElementById('laSpanC1Val').textContent=fmt(c1,2);
      document.getElementById('laSpanC2Val').textContent=fmt(c2,2);
      redrawAll();
    }
    sAngle.addEventListener('input',upd); sC1.addEventListener('input',upd); sC2.addEventListener('input',upd); upd();
  })();

  /* LA CH 6 — eigenvectors: unit circle vs its image ellipse under A */
  (function(){
    var canvas=document.getElementById('laEigCanvas'); if(!canvas) return;
    var a=4, b=1, cM=2, d=3;
    var dataBtn=document.getElementById('laEigDataBtn'), dataPanel=document.getElementById('laEigDataPanel'),
        dataDesc=document.getElementById('laEigDataDesc'), dataRows=document.getElementById('laEigDataRows');
    wireDataToggle(dataBtn,dataPanel);
    function eigen(){
      var T=a+d, D=a*d-b*cM, disc=T*T-4*D;
      if(disc<0) return null;
      var s=Math.sqrt(disc), l1=(T+s)/2, l2=(T-s)/2;
      function vecFor(l){
        if(Math.abs(b)>1e-9) return [b, l-a];
        if(Math.abs(cM)>1e-9) return [l-d, cM];
        return Math.abs(l-a)<1e-6 ? [1,0] : [0,1];
      }
      return {l1:l1,l2:l2,v1:vecFor(l1),v2:vecFor(l2)};
    }
    function updateDataView(eig){
      if(!dataDesc) return;
      if(!eig){ dataDesc.textContent='A = [['+fmt(a,2)+', '+fmt(b,2)+'], ['+fmt(cM,2)+', '+fmt(d,2)+']]. The characteristic equation has no real roots here (complex eigenvalues) — no real eigenvector direction exists.'; renderDataRows(dataRows,[['λ','complex — no real eigenvector']]); return; }
      dataDesc.textContent='A = [['+fmt(a,2)+', '+fmt(b,2)+'], ['+fmt(cM,2)+', '+fmt(d,2)+']]. λ₁ = '+fmt(eig.l1,3)+' with eigenvector ⟨'+fmt(eig.v1[0],2)+', '+fmt(eig.v1[1],2)+'⟩; λ₂ = '+fmt(eig.l2,3)+' with eigenvector ⟨'+fmt(eig.v2[0],2)+', '+fmt(eig.v2[1],2)+'⟩.';
      renderDataRows(dataRows,[
        ['λ₁',fmt(eig.l1,3),'⟨'+fmt(eig.v1[0],2)+', '+fmt(eig.v1[1],2)+'⟩'],
        ['λ₂',fmt(eig.l2,3),'⟨'+fmt(eig.v2[0],2)+', '+fmt(eig.v2[1],2)+'⟩']
      ]);
    }
    function draw(ctx,w,h){
      var view={xmin:-3,xmax:3,ymin:-3,ymax:3};
      var P=new Plot(ctx,w,h,view,{l:26,r:10,t:10,b:20}); P.clear();
      var c=P.ctx, N=120, i, ang, px, py;
      c.beginPath();
      for(i=0;i<=N;i++){ ang=2*Math.PI*i/N; px=P.X(Math.cos(ang)); py=P.Y(Math.sin(ang)); if(i===0) c.moveTo(px,py); else c.lineTo(px,py); }
      c.closePath(); c.strokeStyle='#B8C3D6'; c.lineWidth=1.4; c.stroke();
      c.beginPath();
      for(i=0;i<=N;i++){
        ang=2*Math.PI*i/N;
        var ux=Math.cos(ang), uy=Math.sin(ang);
        var ix=a*ux+b*uy, iy=cM*ux+d*uy;
        px=P.X(ix); py=P.Y(iy);
        if(i===0) c.moveTo(px,py); else c.lineTo(px,py);
      }
      c.closePath(); c.strokeStyle=INDIGO; c.lineWidth=2.4; c.stroke();
      var eig=eigen();
      if(eig){
        [[eig.v1,AMBER2],[eig.v2,'#0e9f8f']].forEach(function(pair){
          var vec=pair[0], color=pair[1];
          var mag=Math.sqrt(vec[0]*vec[0]+vec[1]*vec[1]);
          if(mag<1e-9) return;
          var ux=vec[0]/mag, uy=vec[1]/mag, L=2.8;
          P.segment(-L*ux,-L*uy,L*ux,L*uy,color,2,[6,4]);
        });
        document.getElementById('laEigL1').textContent=fmt(eig.l1,3);
        document.getElementById('laEigL2').textContent=fmt(eig.l2,3);
      } else {
        document.getElementById('laEigL1').textContent='complex';
        document.getElementById('laEigL2').textContent='complex';
      }
      updateDataView(eig);
    }
    register(canvas,draw);
    var sA=document.getElementById('laEigA'), sB=document.getElementById('laEigB'), sC=document.getElementById('laEigC'), sD=document.getElementById('laEigD');
    function upd(){
      a=parseFloat(sA.value); b=parseFloat(sB.value); cM=parseFloat(sC.value); d=parseFloat(sD.value);
      document.getElementById('laEigAval').textContent=fmt(a,2);
      document.getElementById('laEigBval').textContent=fmt(b,2);
      document.getElementById('laEigCval').textContent=fmt(cM,2);
      document.getElementById('laEigDval').textContent=fmt(d,2);
      redrawAll();
    }
    [sA,sB,sC,sD].forEach(function(el){ el.addEventListener('input',upd); });
    upd();
  })();

  /* LA CH 8 — least squares: candidate line vs the four data points */
  (function(){
    var canvas=document.getElementById('laLSQCanvas'); if(!canvas) return;
    var points=[[1,1],[2,3],[3,4],[4,6]];
    var view={xmin:0,xmax:5,ymin:-1,ymax:8};
    var m=1, b=0;
    var dataBtn=document.getElementById('laLSQDataBtn'), dataPanel=document.getElementById('laLSQDataPanel'),
        dataDesc=document.getElementById('laLSQDataDesc'), dataRows=document.getElementById('laLSQDataRows');
    wireDataToggle(dataBtn,dataPanel);
    function sse(){
      var s=0;
      points.forEach(function(p){ var r=p[1]-(m*p[0]+b); s+=r*r; });
      return s;
    }
    function updateDataView(){
      if(!dataDesc) return;
      dataDesc.textContent='Candidate line y = '+fmt(m,2)+'x + '+fmt(b,2)+'. Sum of squared residuals = '+fmt(sse(),3)+'. The least-squares optimum is m = 1.6, b = -0.5 (Worked example 8.B).';
      var rows=[];
      points.forEach(function(p){ var pred=m*p[0]+b, res=p[1]-pred; rows.push([fmt(p[0],0),fmt(p[1],0),fmt(pred,2),fmt(res,2)]); });
      renderDataRows(dataRows,rows);
    }
    function draw(ctx,w,h){
      var P=new Plot(ctx,w,h,view,{l:28,r:12,t:12,b:24}); P.clear(); P.grid();
      P.curve(function(x){ return m*x+b; }, INDIGO, 2.4);
      points.forEach(function(p){
        var pred=m*p[0]+b;
        P.segment(p[0],p[1],p[0],pred,AMBER2,2,[4,3]);
        P.dot(p[0],p[1],INK,5);
      });
      var s=sse();
      document.getElementById('laLSQSSE').textContent=fmt(s,3);
      updateDataView();
    }
    register(canvas,draw);
    var sM=document.getElementById('laLSQm'), sB2=document.getElementById('laLSQb');
    function upd(){
      m=parseInt(sM.value,10)/10; b=parseInt(sB2.value,10)/10;
      document.getElementById('laLSQmVal').textContent=fmt(m,1);
      document.getElementById('laLSQbVal').textContent=fmt(b,1);
      redrawAll();
    }
    sM.addEventListener('input',upd); sB2.addEventListener('input',upd); upd();
  })();

  /* ═══════════════════ EXPLORERS PAST THE MVP FLOOR — Algebra 2,
     Geometry, Digital SAT (Pillar 2 scale). Every live track already has
     the roadmap's MVP floor of >=3 explorers each (verified before this
     work started — the "6 zero-explorer tracks" from the Phase-0 audit
     were already retrofitted in an earlier session); this batch pushes
     three specific tracks past that floor with a few more, same rigor
     and conventions as every explorer above. */

  /* ALG2 CH 9 — unit circle */
  (function(){
    var canvas=document.getElementById('a2TrigCanvas'); if(!canvas) return;
    var theta=60*Math.PI/180;
    var view={xmin:-1.5,xmax:1.5,ymin:-1.5,ymax:1.5};
    var dataBtn=document.getElementById('a2TrigDataBtn'), dataPanel=document.getElementById('a2TrigDataPanel'),
        dataDesc=document.getElementById('a2TrigDataDesc'), dataRows=document.getElementById('a2TrigDataRows');
    wireDataToggle(dataBtn,dataPanel);
    function updateDataView(){
      if(!dataDesc) return;
      var deg=Math.round(theta*180/Math.PI);
      dataDesc.textContent='θ = '+deg+'° = '+fmt(theta,3)+' rad. Point on the unit circle: (cos θ, sin θ) = ('+fmt(Math.cos(theta),3)+', '+fmt(Math.sin(theta),3)+').';
      var rows=[], degs=[0,30,45,60,90,180,270];
      for(var i=0;i<degs.length;i++){ var t=degs[i]*Math.PI/180; rows.push([degs[i],fmt(Math.cos(t),3),fmt(Math.sin(t),3)]); }
      renderDataRows(dataRows,rows);
    }
    function draw(ctx,w,h){
      var P=new Plot(ctx,w,h,view,{l:28,r:12,t:12,b:24}); P.clear(); P.grid();
      var c=P.ctx;
      c.strokeStyle=LINE; c.lineWidth=1.4; c.beginPath(); c.arc(P.X(0),P.Y(0),(P.X(1)-P.X(0)),0,2*Math.PI); c.stroke();
      var px=Math.cos(theta), py=Math.sin(theta);
      arrow(c,P.X(0),P.Y(0),P.X(px),P.Y(py),INDIGO,2.6);
      P.dot(px,py,AMBER2,5.5);
      document.getElementById('a2TrigCos').textContent=fmt(px,3);
      document.getElementById('a2TrigSin').textContent=fmt(py,3);
      document.getElementById('a2TrigRad').textContent=fmt(theta,3);
      updateDataView();
    }
    register(canvas,draw);
    var s=document.getElementById('a2TrigTheta');
    function upd(){ theta=parseInt(s.value,10)*Math.PI/180; document.getElementById('a2TrigThetaV').textContent=s.value+'°'; redrawAll(); }
    s.addEventListener('input',upd); upd();
  })();

  /* ALG2 CH 2 — discriminant & the parabola's roots (real vs complex) */
  (function(){
    var canvas=document.getElementById('a2QuadCanvas'); if(!canvas) return;
    var b=2, c=5;
    function f(x){ return x*x+b*x+c; }
    var view={xmin:-10,xmax:10,ymin:-20,ymax:30};
    var dataBtn=document.getElementById('a2QuadDataBtn'), dataPanel=document.getElementById('a2QuadDataPanel'),
        dataDesc=document.getElementById('a2QuadDataDesc'), dataRows=document.getElementById('a2QuadDataRows');
    wireDataToggle(dataBtn,dataPanel);
    function updateDataView(D,vx,vy){
      if(!dataDesc) return;
      var type = D>0?'two real roots':(D===0?'one repeated real root':'no real roots — a complex-conjugate pair');
      dataDesc.textContent='f(x) = x² + '+fmt(b,1)+'x + '+fmt(c,1)+'. Discriminant D = b² − 4c = '+fmt(D,2)+'. Vertex ('+fmt(vx,2)+', '+fmt(vy,2)+'). '+type+'.';
      var N=9, rows=[];
      for(var i=0;i<N;i++){ var x=view.xmin+(view.xmax-view.xmin)*i/(N-1); rows.push([fmt(x),fmt(f(x))]); }
      renderDataRows(dataRows,rows);
    }
    function draw(ctx,w,h){
      var P=new Plot(ctx,w,h,view,{l:32,r:12,t:14,b:26}); P.clear(); P.grid();
      P.curve(f,INDIGO,2.8);
      var D=b*b-4*c, vx=-b/2, vy=f(vx);
      P.dot(vx,vy,INK,5);
      var typeShort;
      if(D>=0){
        var r1=(-b+Math.sqrt(D))/2, r2=(-b-Math.sqrt(D))/2;
        P.dot(r1,0,AMBER2,5); if(Math.abs(r1-r2)>1e-6) P.dot(r2,0,AMBER2,5);
        typeShort = D>0?'Two real roots':'One repeated real root';
        document.getElementById('a2QuadRoots').textContent = D>0 ? fmt(r1,2)+', '+fmt(r2,2) : fmt(r1,2);
      } else {
        var re=-b/2, im=Math.sqrt(-D)/2;
        typeShort='No real roots (complex)';
        document.getElementById('a2QuadRoots').textContent = fmt(re,2)+' ± '+fmt(im,2)+'i';
      }
      document.getElementById('a2QuadD').textContent=fmt(D,2);
      document.getElementById('a2QuadType').textContent=typeShort;
      updateDataView(D,vx,vy);
    }
    register(canvas,draw);
    var sb=document.getElementById('a2QuadB'), sc=document.getElementById('a2QuadC');
    function upd(){
      b=parseFloat(sb.value); c=parseFloat(sc.value);
      document.getElementById('a2QuadBval').textContent=fmt(b,1);
      document.getElementById('a2QuadCval').textContent=fmt(c,1);
      redrawAll();
    }
    sb.addEventListener('input',upd); sc.addEventListener('input',upd); upd();
  })();

  /* GEO CH 7 — sector area & arc length */
  (function(){
    var canvas=document.getElementById('geoSectorCanvas'); if(!canvas) return;
    var r=4, theta=90;
    var view={xmin:-9,xmax:9,ymin:-9,ymax:9};
    var dataBtn=document.getElementById('geoSectorDataBtn'), dataPanel=document.getElementById('geoSectorDataPanel'),
        dataDesc=document.getElementById('geoSectorDataDesc'), dataRows=document.getElementById('geoSectorDataRows');
    wireDataToggle(dataBtn,dataPanel);
    function updateDataView(arcLen,area){
      if(!dataDesc) return;
      dataDesc.textContent='Circle of radius r = '+fmt(r,1)+', sector angle θ = '+theta+'°. Arc length = (θ/360)·2πr = '+fmt(arcLen,3)+'. Sector area = (θ/360)·πr² = '+fmt(area,3)+'.';
      renderDataRows(dataRows,[
        ['radius r', fmt(r,1)],
        ['angle θ', theta+'°'],
        ['arc length', fmt(arcLen,3)],
        ['sector area', fmt(area,3)]
      ]);
    }
    function draw(ctx,w,h){
      var P=new Plot(ctx,w,h,view,{l:28,r:12,t:12,b:24}); P.clear(); P.grid();
      var c=P.ctx, rad=theta*Math.PI/180;
      var rp=P.X(r)-P.X(0);
      c.fillStyle='rgba(30,58,110,.16)';
      c.beginPath(); c.moveTo(P.X(0),P.Y(0)); c.arc(P.X(0),P.Y(0),rp,-0,-rad,true); c.closePath(); c.fill();
      c.strokeStyle=INDIGO; c.lineWidth=1.6;
      c.beginPath(); c.arc(P.X(0),P.Y(0),rp,0,2*Math.PI); c.stroke();
      arrow(c,P.X(0),P.Y(0),P.X(r),P.Y(0),AMBER2,2.2);
      arrow(c,P.X(0),P.Y(0),P.X(r*Math.cos(rad)),P.Y(r*Math.sin(rad)),AMBER2,2.2);
      var arcLen=(theta/360)*2*Math.PI*r, area=(theta/360)*Math.PI*r*r;
      document.getElementById('geoSectorArc').textContent=fmt(arcLen,3);
      document.getElementById('geoSectorArea').textContent=fmt(area,3);
      updateDataView(arcLen,area);
    }
    register(canvas,draw);
    var sr=document.getElementById('geoSectorR'), st=document.getElementById('geoSectorTheta');
    function upd(){
      r=parseFloat(sr.value); theta=parseInt(st.value,10);
      document.getElementById('geoSectorRval').textContent=fmt(r,1);
      document.getElementById('geoSectorThetaV').textContent=theta+'°';
      redrawAll();
    }
    sr.addEventListener('input',upd); st.addEventListener('input',upd); upd();
  })();

  /* GEO CH 10 — distance, midpoint & slope */
  (function(){
    var canvas=document.getElementById('geoDistCanvas'); if(!canvas) return;
    var x1=0,y1=0,x2=6,y2=8;
    var view={xmin:-10,xmax:10,ymin:-10,ymax:10};
    var dataBtn=document.getElementById('geoDistDataBtn'), dataPanel=document.getElementById('geoDistDataPanel'),
        dataDesc=document.getElementById('geoDistDataDesc'), dataRows=document.getElementById('geoDistDataRows');
    wireDataToggle(dataBtn,dataPanel);
    function updateDataView(dist,mx,my,slope){
      if(!dataDesc) return;
      dataDesc.textContent='A = ('+fmt(x1,1)+', '+fmt(y1,1)+'), B = ('+fmt(x2,1)+', '+fmt(y2,1)+'). Distance AB = '+fmt(dist,3)+'. Midpoint = ('+fmt(mx,2)+', '+fmt(my,2)+'). Slope = '+(isFinite(slope)?fmt(slope,3):'undefined (vertical)')+'.';
      renderDataRows(dataRows,[
        ['A','('+fmt(x1,1)+', '+fmt(y1,1)+')'],
        ['B','('+fmt(x2,1)+', '+fmt(y2,1)+')'],
        ['distance', fmt(dist,3)],
        ['midpoint', '('+fmt(mx,2)+', '+fmt(my,2)+')'],
        ['slope', isFinite(slope)?fmt(slope,3):'undefined']
      ]);
    }
    function draw(ctx,w,h){
      var P=new Plot(ctx,w,h,view,{l:30,r:12,t:14,b:26}); P.clear(); P.grid();
      var c=P.ctx;
      c.strokeStyle='rgba(30,58,110,.55)'; c.lineWidth=2; c.setLineDash([5,4]);
      c.beginPath(); c.moveTo(P.X(x1),P.Y(y1)); c.lineTo(P.X(x2),P.Y(y2)); c.stroke(); c.setLineDash([]);
      P.dot(x1,y1,INDIGO,5.5); P.dot(x2,y2,INDIGO,5.5);
      var dist=Math.sqrt((x2-x1)*(x2-x1)+(y2-y1)*(y2-y1)), mx=(x1+x2)/2, my=(y1+y2)/2, slope=(x2-x1)!==0?(y2-y1)/(x2-x1):Infinity;
      P.dot(mx,my,AMBER2,5);
      document.getElementById('geoDistD').textContent=fmt(dist,3);
      document.getElementById('geoDistMid').textContent='('+fmt(mx,2)+', '+fmt(my,2)+')';
      updateDataView(dist,mx,my,slope);
    }
    register(canvas,draw);
    var s1=document.getElementById('geoDistX1'), s2=document.getElementById('geoDistY1'),
        s3=document.getElementById('geoDistX2'), s4=document.getElementById('geoDistY2');
    function upd(){
      x1=parseFloat(s1.value); y1=parseFloat(s2.value); x2=parseFloat(s3.value); y2=parseFloat(s4.value);
      document.getElementById('geoDistX1val').textContent=fmt(x1,1);
      document.getElementById('geoDistY1val').textContent=fmt(y1,1);
      document.getElementById('geoDistX2val').textContent=fmt(x2,1);
      document.getElementById('geoDistY2val').textContent=fmt(y2,1);
      redrawAll();
    }
    [s1,s2,s3,s4].forEach(function(el){ el.addEventListener('input',upd); });
    upd();
  })();

  /* GEO CH 9 — dilation: length scales by k, area by k^2 */
  (function(){
    var canvas=document.getElementById('geoDilateCanvas'); if(!canvas) return;
    var k=3;
    var A=[0,0], B=[4,0], C=[0,3]; // 3-4-5 triangle; AB has length 4 (Worked example 9.A's side)
    var view={xmin:-2,xmax:16,ymin:-2,ymax:14};
    var dataBtn=document.getElementById('geoDilateDataBtn'), dataPanel=document.getElementById('geoDilateDataPanel'),
        dataDesc=document.getElementById('geoDilateDataDesc'), dataRows=document.getElementById('geoDilateDataRows');
    wireDataToggle(dataBtn,dataPanel);
    function updateDataView(imgLen,areaOrig,areaImg){
      if(!dataDesc) return;
      dataDesc.textContent='Dilating by scale factor k = '+fmt(k,2)+' about the origin: side AB (length 4) maps to length '+fmt(imgLen,2)+'. Area scales by k² = '+fmt(k*k,3)+': '+fmt(areaOrig,2)+' → '+fmt(areaImg,3)+'.';
      renderDataRows(dataRows,[
        ['scale factor k', fmt(k,2)],
        ['|AB| (original)', '4'],
        ["|A'B'| (image)", fmt(imgLen,2)],
        ['area (original)', fmt(areaOrig,2)],
        ['area (image)', fmt(areaImg,3)]
      ]);
    }
    function tri(ctx,P,pts,color,width,fill){
      var c=ctx;
      c.beginPath(); c.moveTo(P.X(pts[0][0]),P.Y(pts[0][1]));
      c.lineTo(P.X(pts[1][0]),P.Y(pts[1][1])); c.lineTo(P.X(pts[2][0]),P.Y(pts[2][1])); c.closePath();
      if(fill){ c.fillStyle=fill; c.fill(); }
      c.strokeStyle=color; c.lineWidth=width; c.stroke();
    }
    function draw(ctx,w,h){
      var P=new Plot(ctx,w,h,view,{l:28,r:12,t:12,b:24}); P.clear(); P.grid();
      tri(ctx,P,[A,B,C],'rgba(140,151,168,.6)',1.6,null);
      var Ai=[A[0]*k,A[1]*k], Bi=[B[0]*k,B[1]*k], Ci=[C[0]*k,C[1]*k];
      tri(ctx,P,[Ai,Bi,Ci],INDIGO2,2.4,'rgba(30,58,110,.12)');
      P.segment(A[0],A[1],B[0],B[1],AMBER2,2.4);
      P.segment(Ai[0],Ai[1],Bi[0],Bi[1],AMBER2,2.4);
      var imgLen=4*k, areaOrig=0.5*4*3, areaImg=areaOrig*k*k;
      document.getElementById('geoDilateLen').textContent=fmt(imgLen,2);
      document.getElementById('geoDilateArea').textContent=fmt(areaImg,3);
      updateDataView(imgLen,areaOrig,areaImg);
    }
    register(canvas,draw);
    var s=document.getElementById('geoDilateK');
    function upd(){ k=parseFloat(s.value); document.getElementById('geoDilateKval').textContent=fmt(k,2); redrawAll(); }
    s.addEventListener('input',upd); upd();
  })();

  /* SAT CH 3 — line–parabola system: 0, 1, or 2 intersections */
  (function(){
    var canvas=document.getElementById('satQuadLineCanvas'); if(!canvas) return;
    var m=1, k=2;
    function parab(x){ return x*x; }
    function line(x){ return m*x+k; }
    var view={xmin:-4,xmax:4,ymin:-2,ymax:16};
    var dataBtn=document.getElementById('satQuadLineDataBtn'), dataPanel=document.getElementById('satQuadLineDataPanel'),
        dataDesc=document.getElementById('satQuadLineDataDesc'), dataRows=document.getElementById('satQuadLineDataRows');
    wireDataToggle(dataBtn,dataPanel);
    function updateDataView(D,pts){
      if(!dataDesc) return;
      var desc='y = x² and y = '+fmt(m,1)+'x + '+fmt(k,1)+'. Substituting: x² − '+fmt(m,1)+'x − '+fmt(k,1)+' = 0, discriminant D = '+fmt(D,2)+'. ';
      desc += pts.length===0?'No real intersections.':pts.length===1?'One intersection (tangent).':'Two intersections.';
      dataDesc.textContent=desc;
      var rows=pts.map(function(p){ return [fmt(p[0],3), fmt(p[1],3)]; });
      if(!rows.length) rows=[['—','no real solutions']];
      renderDataRows(dataRows,rows);
    }
    function draw(ctx,w,h){
      var P=new Plot(ctx,w,h,view,{l:30,r:12,t:14,b:26}); P.clear(); P.grid();
      P.curve(parab,INDIGO,2.6);
      P.curve(line,AMBER2,2.4);
      var D=m*m+4*k, pts=[];
      if(D>=0){
        var sq=Math.sqrt(D), x1=(m+sq)/2, x2=(m-sq)/2;
        pts.push([x1,parab(x1)]);
        if(Math.abs(x1-x2)>1e-6) pts.push([x2,parab(x2)]);
      }
      pts.forEach(function(p){ P.dot(p[0],p[1],INK,5.5); });
      document.getElementById('satQuadLineD').textContent=fmt(D,2);
      document.getElementById('satQuadLineN').textContent = D>1e-9?'2':(D>-1e-9?'1':'0');
      updateDataView(D,pts);
    }
    register(canvas,draw);
    var sm=document.getElementById('satQuadLineM'), sk=document.getElementById('satQuadLineK');
    function upd(){
      m=parseFloat(sm.value); k=parseFloat(sk.value);
      document.getElementById('satQuadLineMval').textContent=fmt(m,1);
      document.getElementById('satQuadLineKval').textContent=fmt(k,1);
      redrawAll();
    }
    sm.addEventListener('input',upd); sk.addEventListener('input',upd); upd();
  })();

  /* SAT CH 8 — piecewise function evaluator (exact Worked example 8.B) */
  (function(){
    var canvas=document.getElementById('satPieceCanvas'); if(!canvas) return;
    var xv=-1;
    function f(x){ return x<2 ? x*x : 3*x-1; }
    var view={xmin:-4,xmax:6,ymin:-4,ymax:18};
    var dataBtn=document.getElementById('satPieceDataBtn'), dataPanel=document.getElementById('satPieceDataPanel'),
        dataDesc=document.getElementById('satPieceDataDesc'), dataRows=document.getElementById('satPieceDataRows');
    wireDataToggle(dataBtn,dataPanel);
    function updateDataView(){
      if(!dataDesc) return;
      var piece = xv<2 ? 'x² (since x < 2)' : '3x − 1 (since x ≥ 2)';
      dataDesc.textContent='f(x) = x² if x<2, 3x−1 if x≥2. At x = '+fmt(xv,2)+', the active piece is '+piece+', so f('+fmt(xv,2)+') = '+fmt(f(xv),3)+'.';
      var N=9, rows=[];
      for(var i=0;i<N;i++){ var x=view.xmin+(view.xmax-view.xmin)*i/(N-1); rows.push([fmt(x),fmt(f(x)), x<2?'x²':'3x−1']); }
      renderDataRows(dataRows,rows);
    }
    function draw(ctx,w,h){
      var P=new Plot(ctx,w,h,view,{l:30,r:12,t:14,b:26}); P.clear(); P.grid();
      var c=P.ctx;
      c.save(); c.beginPath(); c.rect(P.pad.l,P.pad.t,P.X(2)-P.pad.l,P.h-P.pad.t-P.pad.b); c.clip();
      P.curve(function(x){return x*x;},INDIGO,2.6); c.restore();
      c.save(); c.beginPath(); c.rect(P.X(2),P.pad.t,P.w-P.pad.r-P.X(2),P.h-P.pad.t-P.pad.b); c.clip();
      P.curve(function(x){return 3*x-1;},AMBER2,2.6); c.restore();
      if(xv<2) P.ring(2,4,INDIGO,4.5); else P.dot(2,5,AMBER2,4.5); // boundary markers show the pieces don't meet (discontinuity)
      P.dot(xv,f(xv),INK,5.5);
      document.getElementById('satPieceF').textContent=fmt(f(xv),3);
      document.getElementById('satPiecePiece').textContent = xv<2?'x²':'3x − 1';
      updateDataView();
    }
    register(canvas,draw);
    var s=document.getElementById('satPieceX');
    function upd(){ xv=parseFloat(s.value); document.getElementById('satPieceXval').textContent=fmt(xv,2); redrawAll(); }
    s.addEventListener('input',upd); upd();
  })();

  /* SAT CH 9 — mean vs median under a moving outlier (exact Worked example 9.A) */
  (function(){
    var canvas=document.getElementById('satOutlierCanvas'); if(!canvas) return;
    var FIXED=[30,32,35,36,37,38,40];
    var outlier=120;
    var view={xmin:25,xmax:130,ymin:0,ymax:1};
    var dataBtn=document.getElementById('satOutlierDataBtn'), dataPanel=document.getElementById('satOutlierDataPanel'),
        dataDesc=document.getElementById('satOutlierDataDesc'), dataRows=document.getElementById('satOutlierDataRows');
    wireDataToggle(dataBtn,dataPanel);
    function stats(){
      var all=FIXED.concat([outlier]).slice().sort(function(a,b){return a-b;});
      var mean=all.reduce(function(a,b){return a+b;},0)/all.length;
      var mid=all.length/2, median=(all[mid-1]+all[mid])/2;
      return {mean:mean, median:median, all:all};
    }
    function updateDataView(st){
      if(!dataDesc) return;
      dataDesc.textContent='Salaries (thousands): 30, 32, 35, 36, 37, 38, 40, and an eighth value = '+fmt(outlier,0)+'. Mean = '+fmt(st.mean,2)+', median = '+fmt(st.median,2)+'. '+(outlier>50?'The high value pulls the mean above the median — the median better represents a typical salary.':'With the eighth value this close to the rest, mean and median stay close together.');
      renderDataRows(dataRows,[
        ['data (sorted)', st.all.join(', ')],
        ['mean', fmt(st.mean,2)],
        ['median', fmt(st.median,2)]
      ]);
    }
    function draw(ctx,w,h){
      var P=new Plot(ctx,w,h,view,{l:20,r:12,t:12,b:26}); P.clear();
      var c=P.ctx, y=0.35;
      c.strokeStyle=AXIS; c.lineWidth=1; c.beginPath(); c.moveTo(P.X(view.xmin),P.Y(0.15)); c.lineTo(P.X(view.xmax),P.Y(0.15)); c.stroke();
      var xt=view.xmin; for(;xt<=view.xmax;xt+=25){ c.fillStyle=MUTED; c.font=FONT; c.textAlign='center'; c.fillText(String(xt),P.X(xt),P.Y(0.15)+16); }
      FIXED.forEach(function(v){ P.dot(v,y,'rgba(86,97,115,.55)',4.5); });
      P.dot(outlier,y,AMBER2,6);
      var st=stats();
      P.vline(st.mean,INDIGO,[4,3]);
      P.vline(st.median,'rgba(200,144,42,.9)',[2,2]);
      document.getElementById('satOutlierMean').textContent=fmt(st.mean,2);
      document.getElementById('satOutlierMedian').textContent=fmt(st.median,2);
      updateDataView(st);
    }
    register(canvas,draw);
    var s=document.getElementById('satOutlierV');
    function upd(){ outlier=parseFloat(s.value); document.getElementById('satOutlierVval').textContent=fmt(outlier,0); redrawAll(); }
    s.addEventListener('input',upd); upd();
  })();

  /* ===================== ODE SLOPE FIELD EXPLORER (odes) =====================
     dy/dx = k*y — the exact equation behind ode-separable's Worked examples
     1.A (dy/dx=2y) and 1.C (radioactive decay, dy/dx=-kN). The solution
     y=y0*e^{kx} is exact and closed-form (verified: substituting into the
     ODE gives y'=k*y0*e^{kx}=k*y, matching Theorem 1.1's separable-equation
     method from that same chapter), so this draws the true solution curve,
     not a numerical approximation — consistent with every other explorer on
     this site only ever visualizing already-proven math. */
  (function(){
    var canvas=document.getElementById('odeSlopeCanvas'); if(!canvas) return;
    var view={xmin:-2,xmax:2,ymin:-6,ymax:6};
    var k=0.5, y0=1;
    var dataBtn=document.getElementById('odeSlopeDataBtn'), dataPanel=document.getElementById('odeSlopeDataPanel'),
        dataDesc=document.getElementById('odeSlopeDataDesc'), dataRows=document.getElementById('odeSlopeDataRows');
    wireDataToggle(dataBtn,dataPanel);
    function yOf(x){ return y0*Math.exp(k*x); }
    function updateDataView(){
      if(!dataDesc) return;
      dataDesc.textContent='Solution of dy/dx = '+fmt(k,2)+'y with y(0) = '+fmt(y0,2)+': y(x) = '+fmt(y0,2)+'e^{'+fmt(k,2)+'x}. Every arrow drawn is the field’s own slope k·y at that point — the curve is tangent to the field everywhere, not fitted to it.';
      var N=9, rows=[];
      for(var i=0;i<N;i++){ var x=view.xmin+(view.xmax-view.xmin)*i/(N-1); var y=yOf(x); rows.push([fmt(x),fmt(y,3),fmt(k*y,3)]); }
      renderDataRows(dataRows,rows);
    }
    function drawField(P){
      var c=P.ctx, nx=17, ny=13, Lpx=9;
      var pxPerX=(P.w-P.pad.l-P.pad.r)/(view.xmax-view.xmin);
      var pxPerY=(P.h-P.pad.t-P.pad.b)/(view.ymax-view.ymin);
      c.save(); c.beginPath(); c.rect(P.pad.l,P.pad.t,P.w-P.pad.l-P.pad.r,P.h-P.pad.t-P.pad.b); c.clip();
      c.strokeStyle=AXIS; c.globalAlpha=0.6; c.lineWidth=1.3;
      for(var i=0;i<nx;i++){
        var x=view.xmin+(view.xmax-view.xmin)*i/(nx-1);
        for(var j=0;j<ny;j++){
          var y=view.ymin+(view.ymax-view.ymin)*j/(ny-1);
          var m=k*y; // dy/dx at (x,y) for this field — doesn't actually depend on x here, but the grid is drawn in (x,y) regardless, since the method generalizes to fields that do
          var dxS=pxPerX, dyS=-m*pxPerY, len=Math.sqrt(dxS*dxS+dyS*dyS)||1;
          var ux=dxS/len, uy=dyS/len, cx=P.X(x), cy=P.Y(y);
          c.beginPath(); c.moveTo(cx-ux*Lpx,cy-uy*Lpx); c.lineTo(cx+ux*Lpx,cy+uy*Lpx); c.stroke();
        }
      }
      c.globalAlpha=1; c.restore();
    }
    function draw(ctx,w,h){
      var P=new Plot(ctx,w,h,view,{l:34,r:12,t:14,b:26}); P.clear(); P.grid();
      drawField(P);
      P.curve(yOf,INDIGO,2.6);
      P.dot(0,y0,AMBER,5.5);
      document.getElementById('odeSlopeSlope').textContent=fmt(k*y0,3);
      document.getElementById('odeSlopeY1').textContent=fmt(yOf(1),3);
      updateDataView();
    }
    register(canvas,draw);
    var kSlider=document.getElementById('odeSlopeK'), y0Slider=document.getElementById('odeSlopeY0');
    function upd(){
      k=parseFloat(kSlider.value); y0=parseFloat(y0Slider.value);
      document.getElementById('odeSlopeKVal').textContent=fmt(k,1);
      document.getElementById('odeSlopeY0Val').textContent=fmt(y0,1);
      redrawAll();
    }
    kSlider.addEventListener('input',upd); y0Slider.addEventListener('input',upd); upd();
  })();

  /* ===================== ODE LINEAR EXPLORER (odes, Ch.2) =====================
     dy/dx + k*y = b, the constant-coefficient special case of Theorem 2.1
     (P(x)=k, Q(x)=b) — the same shape as Worked Example 2.C's filling tank,
     just with a constant rather than time-varying P. Solving the theorem's
     own formula y=(1/μ)(∫μQ dx + C) with μ=e^{kx} and y(0)=y0 gives the
     closed form y = b/k + (y0-b/k)e^{-kx} (verified against sympy's dsolve),
     so this plots the exact solution, not a numerical approximation. */
  (function(){
    var canvas=document.getElementById('odeLinearCanvas'); if(!canvas) return;
    var view={xmin:-0.3,xmax:6,ymin:-6,ymax:6};
    var k=0.5, b=2, y0=1;
    var dataBtn=document.getElementById('odeLinearDataBtn'), dataPanel=document.getElementById('odeLinearDataPanel'),
        dataDesc=document.getElementById('odeLinearDataDesc'), dataRows=document.getElementById('odeLinearDataRows');
    wireDataToggle(dataBtn,dataPanel);
    function steady(){ return b/k; }
    function yOf(x){ return steady()+(y0-steady())*Math.exp(-k*x); }
    function updateDataView(){
      if(!dataDesc) return;
      dataDesc.textContent='Solution of dy/dx + '+fmt(k,2)+'y = '+fmt(b,2)+' with y(0) = '+fmt(y0,2)+': y(x) = '+fmt(steady(),2)+' + ('+fmt(y0,2)+' − '+fmt(steady(),2)+')e^{−'+fmt(k,2)+'x}, approaching the steady state '+fmt(steady(),2)+' as x grows.';
      var N=9, rows=[];
      for(var i=0;i<N;i++){ var x=view.xmin+(view.xmax-view.xmin)*i/(N-1); rows.push([fmt(x),fmt(yOf(x),3)]); }
      renderDataRows(dataRows,rows);
    }
    function draw(ctx,w,h){
      var P=new Plot(ctx,w,h,view,{l:34,r:12,t:14,b:26}); P.clear(); P.grid();
      var st=steady();
      if(st>=view.ymin && st<=view.ymax) P.segment(view.xmin,st,view.xmax,st,'rgba(86,97,115,.55)',1.4,[5,4]);
      P.curve(yOf,INDIGO,2.6);
      P.dot(0,y0,AMBER,5.5);
      document.getElementById('odeLinearSteady').textContent=fmt(st,3);
      document.getElementById('odeLinearY3').textContent=fmt(yOf(3),3);
      updateDataView();
    }
    register(canvas,draw);
    var kSlider=document.getElementById('odeLinearK'), bSlider=document.getElementById('odeLinearB'), y0Slider=document.getElementById('odeLinearY0');
    function upd(){
      k=parseFloat(kSlider.value); b=parseFloat(bSlider.value); y0=parseFloat(y0Slider.value);
      document.getElementById('odeLinearKVal').textContent=fmt(k,1);
      document.getElementById('odeLinearBVal').textContent=fmt(b,1);
      document.getElementById('odeLinearY0Val').textContent=fmt(y0,1);
      redrawAll();
    }
    kSlider.addEventListener('input',upd); bSlider.addEventListener('input',upd); y0Slider.addEventListener('input',upd); upd();
  })();

  /* ===================== ODE AUXILIARY-EQUATION EXPLORER (odes, Ch.3) =====================
     y''+by'+cy=0 (a=1), y(0)=1, y'(0)=0 — Theorem 3.2's three cases, read off
     the sign of the discriminant b^2-4c, each solved in closed form for
     these specific initial conditions (the same ones Worked Example 3.C
     uses) and verified against sympy's dsolve for representative points in
     all three regimes:
       D>0 (real, distinct r1,r2):  y = C1 e^{r1 x} + C2 e^{r2 x},
         C1 = r2/(r2-r1), C2 = 1-C1  (from y(0)=1, y'(0)=0)
       D=0 (repeated r=-b/2):       y = (1 - r x) e^{r x}
       D<0 (complex a=-b/2, w=sqrt(4c-b^2)/2): y = e^{ax}(cos(wx) - (a/w)sin(wx))
     b is restricted to >=0 (physical non-negative damping), which keeps
     every case bounded or decaying, matching Worked Example 3.C's remark
     that alpha<=0 never grows. */
  (function(){
    var canvas=document.getElementById('odeAuxCanvas'); if(!canvas) return;
    var view={xmin:-0.3,xmax:6,ymin:-2.2,ymax:2.2};
    var b=2, c=5;
    var dataBtn=document.getElementById('odeAuxDataBtn'), dataPanel=document.getElementById('odeAuxDataPanel'),
        dataDesc=document.getElementById('odeAuxDataDesc'), dataRows=document.getElementById('odeAuxDataRows');
    wireDataToggle(dataBtn,dataPanel);
    function disc(){ return b*b-4*c; }
    function yOf(x){
      var D=disc();
      if(D>1e-9){
        var r1=(-b+Math.sqrt(D))/2, r2=(-b-Math.sqrt(D))/2;
        var C1=r2/(r2-r1), C2=1-C1;
        return C1*Math.exp(r1*x)+C2*Math.exp(r2*x);
      } else if(D<-1e-9){
        var a=-b/2, w=Math.sqrt(4*c-b*b)/2;
        return Math.exp(a*x)*(Math.cos(w*x)-(a/w)*Math.sin(w*x));
      } else {
        var r=-b/2;
        return (1-r*x)*Math.exp(r*x);
      }
    }
    function caseLabel(){
      var D=disc();
      if(D>1e-9){
        var r1=(-b+Math.sqrt(D))/2, r2=(-b-Math.sqrt(D))/2;
        return fmt(D,2)+', real r₁='+fmt(r1,2)+', r₂='+fmt(r2,2);
      } else if(D<-1e-9){
        var a=-b/2, w=Math.sqrt(4*c-b*b)/2;
        return fmt(D,2)+', complex α='+fmt(a,2)+'±'+fmt(w,2)+'i';
      } else {
        return fmt(D,2)+', repeated r='+fmt(-b/2,2);
      }
    }
    function updateDataView(){
      if(!dataDesc) return;
      dataDesc.textContent='Solution of y″+'+fmt(b,2)+'y′+'+fmt(c,2)+'y=0 with y(0)=1, y′(0)=0. Discriminant b²−4c = '+fmt(disc(),2)+' — '+caseLabel();
      var N=9, rows=[];
      for(var i=0;i<N;i++){ var x=view.xmin+(view.xmax-view.xmin)*i/(N-1); rows.push([fmt(x),fmt(yOf(x),3)]); }
      renderDataRows(dataRows,rows);
    }
    function draw(ctx,w,h){
      var P=new Plot(ctx,w,h,view,{l:34,r:12,t:14,b:26}); P.clear(); P.grid();
      P.curve(yOf,INDIGO,2.6);
      P.dot(0,1,AMBER,5.5);
      P.vline(2,'rgba(184,128,31,.5)',[4,4]);
      P.dot(2,yOf(2),AMBER2,5);
      document.getElementById('odeAuxRoots').textContent=caseLabel();
      document.getElementById('odeAuxY2').textContent=fmt(yOf(2),3);
      updateDataView();
    }
    register(canvas,draw);
    var bSlider=document.getElementById('odeAuxB'), cSlider=document.getElementById('odeAuxC');
    function upd(){
      b=parseFloat(bSlider.value); c=parseFloat(cSlider.value);
      document.getElementById('odeAuxBVal').textContent=fmt(b,1);
      document.getElementById('odeAuxCVal').textContent=fmt(c,1);
      redrawAll();
    }
    bSlider.addEventListener('input',upd); cSlider.addEventListener('input',upd); upd();
  })();

  /* ══════════════════════════════════════════════════════════════════
     DIFFERENTIAL EQUATIONS — chapters 7 and 9 (systems phase portrait,
     Euler's method vs exact). Same shared Plot/register/redrawAll/fmt/
     wireDataToggle/renderDataRows/arrow helpers.
     ══════════════════════════════════════════════════════════════════ */

  /* ODE CH 7 — phase portrait of x' = Ax: direction field + two RK4
     trajectories from symmetric initial points, plus eigenvalue-based
     classification (node/saddle/spiral/center). */
  (function(){
    var canvas=document.getElementById('odeSysCanvas'); if(!canvas) return;
    var view={xmin:-3,xmax:3,ymin:-3,ymax:3};
    var a=1, b=1, cM=4, d=-2;
    var dataBtn=document.getElementById('odeSysDataBtn'), dataPanel=document.getElementById('odeSysDataPanel'),
        dataDesc=document.getElementById('odeSysDataDesc'), dataRows=document.getElementById('odeSysDataRows');
    wireDataToggle(dataBtn,dataPanel);
    function fx(x,y){ return a*x+b*y; }
    function fy(x,y){ return cM*x+d*y; }
    function rk4(x,y,h){
      var k1x=fx(x,y), k1y=fy(x,y);
      var k2x=fx(x+h/2*k1x,y+h/2*k1y), k2y=fy(x+h/2*k1x,y+h/2*k1y);
      var k3x=fx(x+h/2*k2x,y+h/2*k2y), k3y=fy(x+h/2*k2x,y+h/2*k2y);
      var k4x=fx(x+h*k3x,y+h*k3y), k4y=fy(x+h*k3x,y+h*k3y);
      return [x+h/6*(k1x+2*k2x+2*k3x+k4x), y+h/6*(k1y+2*k2y+2*k3y+k4y)];
    }
    function eigenInfo(){
      var T=a+d, D=a*d-b*cM, disc=T*T-4*D;
      if(disc>1e-9){
        var s=Math.sqrt(disc), l1=(T+s)/2, l2=(T-s)/2;
        if(D<-1e-9){ return {kind:'saddle', label:'Saddle', l1:l1, l2:l2}; }
        return {kind:'node', label:(T<0?'Stable node':'Unstable node'), l1:l1, l2:l2};
      } else if(disc<-1e-9){
        var alpha=T/2, beta=Math.sqrt(-disc)/2;
        if(Math.abs(alpha)<1e-9){ return {kind:'center', label:'Center', alpha:alpha, beta:beta}; }
        return {kind:'spiral', label:(alpha<0?'Stable spiral':'Unstable spiral'), alpha:alpha, beta:beta};
      } else {
        var r=T/2;
        return {kind:'node', label:(T<0?'Stable node (repeated)':'Unstable node (repeated)'), l1:r, l2:r};
      }
    }
    function eigenText(info){
      if(info.kind==='spiral'||info.kind==='center'){ return fmt(info.alpha,3)+' ± '+fmt(info.beta,3)+'i'; }
      return fmt(info.l1,3)+', '+fmt(info.l2,3);
    }
    function updateDataView(info){
      if(!dataDesc) return;
      dataDesc.textContent='A = [['+fmt(a,2)+', '+fmt(b,2)+'], ['+fmt(cM,2)+', '+fmt(d,2)+']]. Eigenvalues: '+eigenText(info)+'. Classification: '+info.label+'.';
      renderDataRows(dataRows,[['eigenvalues',eigenText(info)],['classification',info.label]]);
    }
    function trajectory(x0,y0){
      var pts=[[x0,y0]], x=x0, y=y0, h=0.02;
      for(var i=0;i<300;i++){
        var p=rk4(x,y,h);
        x=p[0]; y=p[1];
        if(!isFinite(x)||!isFinite(y)||Math.abs(x)>view.xmax*1.5||Math.abs(y)>view.ymax*1.5) break;
        pts.push([x,y]);
      }
      return pts;
    }
    function draw(ctx,w,h){
      var P=new Plot(ctx,w,h,view,{l:30,r:12,t:14,b:26}); P.clear(); P.grid();
      var c=P.ctx, N=6, gx, gy, arrowLen=0.28;
      for(gx=-N;gx<=N;gx++){
        for(gy=-N;gy<=N;gy++){
          var x=gx*(view.xmax/N)*0.85, y=gy*(view.ymax/N)*0.85;
          var vx=fx(x,y), vy=fy(x,y);
          var mag=Math.sqrt(vx*vx+vy*vy);
          if(mag<1e-6) continue;
          var ux=vx/mag, uy=vy/mag;
          arrow(c,P.X(x),P.Y(y),P.X(x+arrowLen*ux),P.Y(y+arrowLen*uy),'#B8C3D6',1.3);
        }
      }
      [[1.5,0.5],[-1.5,-0.5]].forEach(function(start){
        var pts=trajectory(start[0],start[1]);
        for(var i=0;i<pts.length-1;i++){
          P.segment(pts[i][0],pts[i][1],pts[i+1][0],pts[i+1][1],AMBER2,2.2);
        }
        if(pts.length){ P.dot(pts[0][0],pts[0][1],INK,4); }
      });
      var info=eigenInfo();
      document.getElementById('odeSysEig').textContent=eigenText(info);
      document.getElementById('odeSysType').textContent=info.label;
      updateDataView(info);
    }
    register(canvas,draw);
    var sA=document.getElementById('odeSysA'), sB=document.getElementById('odeSysB'),
        sC=document.getElementById('odeSysC'), sD=document.getElementById('odeSysD');
    function upd(){
      a=parseFloat(sA.value); b=parseFloat(sB.value); cM=parseFloat(sC.value); d=parseFloat(sD.value);
      document.getElementById('odeSysAval').textContent=fmt(a,2);
      document.getElementById('odeSysBval').textContent=fmt(b,2);
      document.getElementById('odeSysCval').textContent=fmt(cM,2);
      document.getElementById('odeSysDval').textContent=fmt(d,2);
      redrawAll();
    }
    [sA,sB,sC,sD].forEach(function(el){ el.addEventListener('input',upd); });
    upd();
  })();

  /* ODE CH 9 — Euler's method vs exact solution for y' = y - x^2 + 1,
     y(0) = 0.5, exact y = (x+1)^2 - 0.5 e^x. Adjustable step size h,
     optional improved-Euler (Heun's) toggle. */
  (function(){
    var canvas=document.getElementById('odeEulerCanvas'); if(!canvas) return;
    var view={xmin:0,xmax:2,ymin:0,ymax:6};
    var xEnd=2, y0=0.5;
    var h=0.2, improved=false;
    var dataBtn=document.getElementById('odeEulerDataBtn'), dataPanel=document.getElementById('odeEulerDataPanel'),
        dataDesc=document.getElementById('odeEulerDataDesc'), dataRows=document.getElementById('odeEulerDataRows');
    wireDataToggle(dataBtn,dataPanel);
    function f(x,y){ return y-x*x+1; }
    function exact(x){ return (x+1)*(x+1)-0.5*Math.exp(x); }
    function computePath(){
      var n=Math.max(1,Math.round(xEnd/h)), hh=xEnd/n;
      var xs=[0], ys=[y0], x=0, y=y0;
      for(var i=0;i<n;i++){
        var f0=f(x,y), yNew;
        if(improved){
          var yPred=y+hh*f0, f1=f(x+hh,yPred);
          yNew=y+hh/2*(f0+f1);
        } else {
          yNew=y+hh*f0;
        }
        x=x+hh; y=yNew;
        xs.push(x); ys.push(y);
      }
      return {xs:xs, ys:ys};
    }
    function updateDataView(path){
      if(!dataDesc) return;
      var yEnd=path.ys[path.ys.length-1];
      dataDesc.textContent=(improved?'Improved Euler':'Euler’s method')+' with h = '+fmt(h,2)+' for y′ = y − x² + 1, y(0) = 0.5. Approx y('+xEnd+') = '+fmt(yEnd,3)+'; exact = '+fmt(exact(xEnd),3)+'; error = '+fmt(Math.abs(exact(xEnd)-yEnd),3)+'.';
      var rows=[];
      for(var i=0;i<path.xs.length;i++){ rows.push([fmt(path.xs[i],2),fmt(path.ys[i],3),fmt(exact(path.xs[i]),3)]); }
      renderDataRows(dataRows,rows);
    }
    function draw(ctx,w,h2){
      var P=new Plot(ctx,w,h2,view,{l:30,r:12,t:14,b:26}); P.clear(); P.grid();
      P.curve(exact,INDIGO,2.4);
      var path=computePath();
      for(var i=0;i<path.xs.length-1;i++){
        P.segment(path.xs[i],path.ys[i],path.xs[i+1],path.ys[i+1],AMBER2,2.2);
      }
      for(i=0;i<path.xs.length;i++){ P.dot(path.xs[i],path.ys[i],AMBER2,3.5); }
      var yEnd=path.ys[path.ys.length-1], ex=exact(xEnd);
      document.getElementById('odeEulerApprox').textContent=fmt(yEnd,3);
      document.getElementById('odeEulerExact').textContent=fmt(ex,3);
      document.getElementById('odeEulerErr').textContent=fmt(Math.abs(ex-yEnd),3);
      updateDataView(path);
    }
    register(canvas,draw);
    var sH=document.getElementById('odeEulerH'), cbImp=document.getElementById('odeEulerImproved');
    function upd(){
      h=parseInt(sH.value,10)/100;
      if(cbImp){ improved=cbImp.checked; }
      document.getElementById('odeEulerHVal').textContent=fmt(h,2);
      redrawAll();
    }
    sH.addEventListener('input',upd);
    if(cbImp){ cbImp.addEventListener('change',upd); }
    upd();
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
     ACT 2 MATH LEVEL 2 & EST 2 MATH LEVEL 2 — full-density explorer
     build-out. Same shared Plot/register/redrawAll/fmt/wireDataToggle/
     renderDataRows/arrow helpers as every explorer above.
     ══════════════════════════════════════════════════════════════════ */

  /* ACT2L2 CH 2 — determinant as a signed area, tied to Theorem 2.1's
     2×2 inverse formula. Default matrix matches Worked example 2.C
     (a=2,b=3,c=1,d=-1, det=-5) so the explorer and the worked example
     agree on first load. */
  (function(){
    var canvas=document.getElementById('act2l2DetCanvas'); if(!canvas) return;
    var a=2, b=3, c=1, d=-1;
    var view={xmin:-4,xmax:6,ymin:-4,ymax:6};
    var dataBtn=document.getElementById('act2l2DetDataBtn'), dataPanel=document.getElementById('act2l2DetDataPanel'),
        dataDesc=document.getElementById('act2l2DetDataDesc'), dataRows=document.getElementById('act2l2DetDataRows');
    wireDataToggle(dataBtn,dataPanel);
    function updateDataView(det){
      if(!dataDesc) return;
      var inv = Math.abs(det)<1e-9 ? 'not invertible (det = 0)' : 'invertible';
      dataDesc.textContent='A has rows ('+fmt(a,2)+', '+fmt(b,2)+') and ('+fmt(c,2)+', '+fmt(d,2)+'). det A = ad − bc = '+fmt(det,3)+'. Column 1 image u = ('+fmt(a,2)+', '+fmt(c,2)+'), column 2 image v = ('+fmt(b,2)+', '+fmt(d,2)+'). |det A| = area of the parallelogram they span = '+fmt(Math.abs(det),3)+'. A is '+inv+'.';
      renderDataRows(dataRows,[
        ['A (rows)','('+fmt(a,2)+', '+fmt(b,2)+'), ('+fmt(c,2)+', '+fmt(d,2)+')'],
        ['det A = ad − bc',fmt(det,3)],
        ['area = |det A|',fmt(Math.abs(det),3)],
        ['invertible?', Math.abs(det)<1e-9 ? 'no (singular)' : 'yes']
      ]);
    }
    function draw(ctx,w,h){
      var P=new Plot(ctx,w,h,view,{l:30,r:12,t:14,b:26}); P.clear(); P.grid();
      var det=a*d-b*c, ctxc=P.ctx;
      var ux=a, uy=c, vx=b, vy=d;
      ctxc.beginPath(); ctxc.moveTo(P.X(0),P.Y(0)); ctxc.lineTo(P.X(ux),P.Y(uy));
      ctxc.lineTo(P.X(ux+vx),P.Y(uy+vy)); ctxc.lineTo(P.X(vx),P.Y(vy)); ctxc.closePath();
      ctxc.fillStyle = det<0 ? 'rgba(200,144,42,.25)' : 'rgba(30,58,110,.20)';
      ctxc.fill();
      arrow(ctxc,P.X(0),P.Y(0),P.X(ux),P.Y(uy),INDIGO,2.8);
      arrow(ctxc,P.X(0),P.Y(0),P.X(vx),P.Y(vy),AMBER2,2.8);
      document.getElementById('act2l2DetVal').textContent=fmt(det,3);
      document.getElementById('act2l2DetInv').textContent = Math.abs(det)<1e-9 ? 'singular' : 'invertible';
      if(Math.abs(det)>1e-9){
        document.getElementById('act2l2DetInvMatrix').textContent =
          '('+fmt(d/det,3)+', '+fmt(-b/det,3)+'), ('+fmt(-c/det,3)+', '+fmt(a/det,3)+')';
      } else {
        document.getElementById('act2l2DetInvMatrix').textContent = 'none';
      }
      updateDataView(det);
    }
    register(canvas,draw);
    var sa=document.getElementById('act2l2DetA'), sb=document.getElementById('act2l2DetB'),
        sc=document.getElementById('act2l2DetC'), sd=document.getElementById('act2l2DetD');
    function upd(){
      a=parseFloat(sa.value); b=parseFloat(sb.value); c=parseFloat(sc.value); d=parseFloat(sd.value);
      document.getElementById('act2l2DetAval').textContent=fmt(a,1);
      document.getElementById('act2l2DetBval').textContent=fmt(b,1);
      document.getElementById('act2l2DetCval').textContent=fmt(c,1);
      document.getElementById('act2l2DetDval').textContent=fmt(d,1);
      redrawAll();
    }
    [sa,sb,sc,sd].forEach(function(el){ el.addEventListener('input',upd); });
    upd();
  })();

  /* ACT2L2 CH 5 — double-angle identities on the unit circle: a single
     angle slider θ drives a point at θ AND a second point at 2θ, so
     Theorem 5.1's sin2x/cos2x fall directly out of the picture. */
  (function(){
    var canvas=document.getElementById('act2l2TrigCanvas'); if(!canvas) return;
    var theta=30*Math.PI/180;
    var view={xmin:-1.5,xmax:1.5,ymin:-1.5,ymax:1.5};
    var dataBtn=document.getElementById('act2l2TrigDataBtn'), dataPanel=document.getElementById('act2l2TrigDataPanel'),
        dataDesc=document.getElementById('act2l2TrigDataDesc'), dataRows=document.getElementById('act2l2TrigDataRows');
    wireDataToggle(dataBtn,dataPanel);
    function updateDataView(){
      if(!dataDesc) return;
      var deg=Math.round(theta*180/Math.PI);
      dataDesc.textContent='θ = '+deg+'°. (cos θ, sin θ) = ('+fmt(Math.cos(theta),3)+', '+fmt(Math.sin(theta),3)+'). 2θ = '+(2*deg)+'°, with (cos 2θ, sin 2θ) = ('+fmt(Math.cos(2*theta),3)+', '+fmt(Math.sin(2*theta),3)+'), matching Theorem 5.1: sin 2θ = 2 sin θ cos θ and cos 2θ = cos²θ − sin²θ.';
      renderDataRows(dataRows,[
        ['θ',Math.round(theta*180/Math.PI)+'°'],
        ['sin θ, cos θ',fmt(Math.sin(theta),3)+', '+fmt(Math.cos(theta),3)],
        ['2 sin θ cos θ (= sin 2θ)',fmt(2*Math.sin(theta)*Math.cos(theta),3)],
        ['cos²θ − sin²θ (= cos 2θ)',fmt(Math.cos(theta)*Math.cos(theta)-Math.sin(theta)*Math.sin(theta),3)]
      ]);
    }
    function draw(ctx,w,h){
      var P=new Plot(ctx,w,h,view,{l:28,r:12,t:12,b:24}); P.clear(); P.grid();
      var c=P.ctx;
      c.strokeStyle=LINE; c.lineWidth=1.4; c.beginPath(); c.arc(P.X(0),P.Y(0),(P.X(1)-P.X(0)),0,2*Math.PI); c.stroke();
      var px=Math.cos(theta), py=Math.sin(theta);
      var qx=Math.cos(2*theta), qy=Math.sin(2*theta);
      arrow(c,P.X(0),P.Y(0),P.X(px),P.Y(py),INDIGO,2.6);
      P.dot(px,py,INDIGO,5.5);
      arrow(c,P.X(0),P.Y(0),P.X(qx),P.Y(qy),AMBER2,2.2);
      P.dot(qx,qy,AMBER2,5.5);
      document.getElementById('act2l2TrigSin').textContent=fmt(py,3);
      document.getElementById('act2l2TrigCos').textContent=fmt(px,3);
      document.getElementById('act2l2TrigSin2').textContent=fmt(qy,3);
      document.getElementById('act2l2TrigCos2').textContent=fmt(qx,3);
      updateDataView();
    }
    register(canvas,draw);
    var s=document.getElementById('act2l2TrigTheta');
    function upd(){ theta=parseInt(s.value,10)*Math.PI/180; document.getElementById('act2l2TrigThetaV').textContent=s.value+'°'; redrawAll(); }
    s.addEventListener('input',upd); upd();
  })();

  /* ACT2L2 CH 1 — z on the Argand plane with its conjugate, tied to
     Theorem 1.1 (z z̄ = |z|²). Default z=3+4i matches Worked example
     1.B's division problem's numerator-conjugate arithmetic. */
  (function(){
    var canvas=document.getElementById('act2l2ComplexCanvas'); if(!canvas) return;
    var view={xmin:-6,xmax:6,ymin:-6,ymax:6};
    var a=3, b=4;
    var dataBtn=document.getElementById('act2l2ComplexDataBtn'), dataPanel=document.getElementById('act2l2ComplexDataPanel'),
        dataDesc=document.getElementById('act2l2ComplexDataDesc'), dataRows=document.getElementById('act2l2ComplexDataRows');
    wireDataToggle(dataBtn,dataPanel);
    function updateDataView(mod2){
      if(!dataDesc) return;
      dataDesc.textContent='z = '+fmt(a,2)+(b>=0?' + ':' − ')+fmt(Math.abs(b),2)+'i, z̄ = '+fmt(a,2)+(b>=0?' − ':' + ')+fmt(Math.abs(b),2)+'i. z·z̄ = '+fmt(mod2,3)+' = |z|², confirming Theorem 1.1.';
      renderDataRows(dataRows,[
        ['z', fmt(a,2)+(b>=0?' + ':' − ')+fmt(Math.abs(b),2)+'i'],
        ['z̄', fmt(a,2)+(b>=0?' − ':' + ')+fmt(Math.abs(b),2)+'i'],
        ['|z|', fmt(Math.sqrt(a*a+b*b),3)],
        ['z · z̄ (= |z|²)', fmt(a*a+b*b,3)]
      ]);
    }
    function draw(ctx,w,h){
      var extent=Math.max(6, Math.abs(a)*1.3, Math.abs(b)*1.3);
      view.xmin=-extent; view.xmax=extent; view.ymin=-extent; view.ymax=extent;
      var P=new Plot(ctx,w,h,view,{l:28,r:12,t:12,b:24}); P.clear(); P.grid();
      var mod=Math.sqrt(a*a+b*b);
      arrow(P.ctx,P.X(0),P.Y(0),P.X(a),P.Y(b),INDIGO,2.4);
      P.dot(a,b,INDIGO,5.5);
      arrow(P.ctx,P.X(0),P.Y(0),P.X(a),P.Y(-b),AMBER,2.2);
      P.dot(a,-b,AMBER,5.5);
      document.getElementById('act2l2ComplexMod').textContent=fmt(mod,3);
      document.getElementById('act2l2ComplexConj').textContent=fmt(a,2)+(b>=0?' − ':' + ')+fmt(Math.abs(b),2)+'i';
      document.getElementById('act2l2ComplexProd').textContent=fmt(a*a+b*b,3);
      updateDataView(a*a+b*b);
    }
    register(canvas,draw);
    var sA=document.getElementById('act2l2ComplexA'), sB=document.getElementById('act2l2ComplexB');
    function upd(){
      a=parseFloat(sA.value); b=parseFloat(sB.value);
      document.getElementById('act2l2ComplexAVal').textContent=fmt(a,1);
      document.getElementById('act2l2ComplexBVal').textContent=fmt(b,1);
      redrawAll();
    }
    sA.addEventListener('input',upd); sB.addEventListener('input',upd);
    upd();
  })();

  /* EST2L2 CH 3 — transformations of y=f(x), base f(x)=x^2, tied to
     Definition 3.1 (shift/stretch/reflect order). */
  (function(){
    var canvas=document.getElementById('est2l2TransCanvas'); if(!canvas) return;
    var view={xmin:-8,xmax:8,ymin:-8,ymax:8};
    var a=1, h=0, k=0;
    function base(x){ return x*x; }
    var dataBtn=document.getElementById('est2l2TransDataBtn'), dataPanel=document.getElementById('est2l2TransDataPanel'),
        dataDesc=document.getElementById('est2l2TransDataDesc'), dataRows=document.getElementById('est2l2TransDataRows');
    wireDataToggle(dataBtn,dataPanel);
    function updateDataView(g,eq){
      if(!dataDesc) return;
      dataDesc.textContent='y = '+eq+'.';
      var N=9, rows=[];
      for(var i=0;i<N;i++){ var x=view.xmin+(view.xmax-view.xmin)*i/(N-1); rows.push([fmt(x),fmt(base(x)),fmt(g(x))]); }
      renderDataRows(dataRows,rows);
    }
    function draw(ctx,w,h2){
      var P=new Plot(ctx,w,h2,view,{l:28,r:12,t:12,b:24}); P.clear(); P.grid();
      P.curve(base, '#B8C3D6', 2);
      var g=function(x){ return a*base(x-h)+k; };
      P.curve(g, INDIGO, 2.6);
      var eq=fmt(a,1)+'(x'+(h>=0?'-'+h:'+'+(-h))+')²'+(k>=0?' + '+k:' - '+(-k));
      document.getElementById('est2l2TransEq').textContent='y = '+eq;
      updateDataView(g,eq);
    }
    register(canvas,draw);
    var sa=document.getElementById('est2l2TransA'), sh=document.getElementById('est2l2TransH'), sk=document.getElementById('est2l2TransK');
    function upd(){
      a=parseInt(sa.value,10)/10; h=parseInt(sh.value,10); k=parseInt(sk.value,10);
      document.getElementById('est2l2TransAlab').textContent=fmt(a,1);
      document.getElementById('est2l2TransHlab').textContent=h;
      document.getElementById('est2l2TransKlab').textContent=k;
      redrawAll();
    }
    sa.addEventListener('input',upd); sh.addEventListener('input',upd); sk.addEventListener('input',upd);
    upd();
  })();

  /* EST2L2 CH 4 — angle between two 2D vectors via the dot product,
     tied to Theorem 4.2. */
  (function(){
    var canvas=document.getElementById('est2l2VecAngCanvas'); if(!canvas) return;
    var view={xmin:-6,xmax:6,ymin:-6,ymax:6};
    var uAng=37, uLen=5, vAng=127, vLen=5.5;
    var dataBtn=document.getElementById('est2l2VecAngDataBtn'), dataPanel=document.getElementById('est2l2VecAngDataPanel'),
        dataDesc=document.getElementById('est2l2VecAngDataDesc'), dataRows=document.getElementById('est2l2VecAngDataRows');
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
      document.getElementById('est2l2VecAngDot').textContent=fmt(s.dot,3);
      document.getElementById('est2l2VecAngTheta').textContent=fmt(s.theta,1)+'°';
      updateDataView(s);
    }
    register(canvas,draw);
    var sUa=document.getElementById('est2l2VecAngUang'), sUl=document.getElementById('est2l2VecAngUlen'),
        sVa=document.getElementById('est2l2VecAngVang'), sVl=document.getElementById('est2l2VecAngVlen');
    function upd(){
      uAng=parseInt(sUa.value,10); uLen=parseFloat(sUl.value);
      vAng=parseInt(sVa.value,10); vLen=parseFloat(sVl.value);
      document.getElementById('est2l2VecAngUangVal').textContent=uAng+'°';
      document.getElementById('est2l2VecAngUlenVal').textContent=fmt(uLen,1);
      document.getElementById('est2l2VecAngVangVal').textContent=vAng+'°';
      document.getElementById('est2l2VecAngVlenVal').textContent=fmt(vLen,1);
      redrawAll();
    }
    sUa.addEventListener('input',upd); sUl.addEventListener('input',upd);
    sVa.addEventListener('input',upd); sVl.addEventListener('input',upd);
    upd();
  })();

  /* EST2L2 CH 5 — tangent line to f(x)=x² at a movable point, tied
     directly to Theorem 5.1 (f'(x) = 2x). */
  (function(){
    var canvas=document.getElementById('est2l2DerivCanvas'); if(!canvas) return;
    var x0=3, s=document.getElementById('est2l2DerivX');
    var f=function(x){return x*x;}, df=function(x){return 2*x;};
    var view={xmin:-6,xmax:6,ymin:-2,ymax:16};
    var dataBtn=document.getElementById('est2l2DerivDataBtn'), dataPanel=document.getElementById('est2l2DerivDataPanel'),
        dataDesc=document.getElementById('est2l2DerivDataDesc'), dataRows=document.getElementById('est2l2DerivDataRows');
    wireDataToggle(dataBtn,dataPanel);
    function updateDataView(y0,m,tangent){
      if(!dataDesc) return;
      dataDesc.textContent='f(x) = x². At x₀ = '+fmt(x0,1)+', f(x₀) = '+fmt(y0,2)+', tangent slope f′(x₀) = 2x₀ = '+fmt(m,2)+' (Theorem 5.1).';
      var N=9, rows=[];
      for(var i=0;i<N;i++){ var x=view.xmin+(view.xmax-view.xmin)*i/(N-1); rows.push([fmt(x),fmt(f(x)),fmt(tangent(x))]); }
      renderDataRows(dataRows,rows);
    }
    function draw(ctx,w,ht){ var P=new Plot(ctx,w,ht,view,{l:26,r:12,t:12,b:20}); P.clear(); P.grid();
      P.curve(f, INDIGO, 2.4);
      var y0=f(x0), m=df(x0);
      var tangent=function(x){return y0+m*(x-x0);};
      P.curve(tangent, AMBER2, 2); P.dot(x0,y0,AMBER2,5.5);
      document.getElementById('est2l2DerivSlope').textContent=m.toFixed(2);
      updateDataView(y0,m,tangent);
    }
    register(canvas,draw);
    s.addEventListener('input',function(){ x0=parseFloat(s.value); document.getElementById('est2l2DerivXV').textContent=x0.toFixed(1); redrawAll(); });
  })();

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

  /* APPC UNIT 4 (appc-u4) — inverse as a reflection in y = x, Function
     composition and inverses box. Default f(x)=(3x−1)/(x+2) = Worked
     Example 4.1, whose inverse is (2x+1)/(3−x). */
  (function(){
    var canvas=document.getElementById('appcInvCanvas'); if(!canvas) return;
    var FNS={
      rat:{f:function(x){ return (3*x-1)/(x+2); }, fi:function(x){ return (2*x+1)/(3-x); }, pole:-2, ipole:3, txt:'(2x + 1)/(3 − x)'},
      exp:{f:function(x){ return Math.pow(2,x); }, fi:function(x){ return x>0 ? Math.log(x)/Math.LN2 : NaN; }, txt:'log₂ x'},
      cub:{f:function(x){ return x*x*x/4+1; }, fi:function(x){ return Math.cbrt(4*(x-1)); }, txt:'∛(4(x − 1))'}
    };
    var key='rat', a=1;
    wireDataToggle(document.getElementById('appcInvDataBtn'),document.getElementById('appcInvDataPanel'));
    function draw(ctx,w,h){
      var F=FNS[key], pad={l:30,r:12,t:14,b:26};
      var view=_fitView(-6,6,-6,6,w,h,pad);
      var P=new Plot(ctx,w,h,view,pad); P.clear(); P.grid();
      var gap=(view.xmax-view.xmin)/320*1.2;
      function guard(fn,pole){ return function(x){ return (pole!=null && Math.abs(x-pole)<gap) ? NaN : fn(x); }; }
      _clip(P,function(){ P.segment(-20,-20,20,20,MUTED,1.3,[6,4]); });
      P.curve(guard(F.f,F.pole),INDIGO,2.6);
      P.curve(guard(F.fi,F.ipole),AMBER2,2.6);
      var fa=F.f(a), ok=isFinite(fa);
      if(ok){
        P.segment(a,fa,fa,a,LINE,1.4,[3,3]);
        P.dot(a,fa,INDIGO,5); P.dot(fa,a,AMBER2,5);
      }
      _set('appcInvFa', ok ? '('+fmt(a,2)+', '+fmt(fa,3)+')' : 'f('+fmt(a,1)+') undefined');
      _set('appcInvRef', ok ? '('+fmt(fa,3)+', '+fmt(a,2)+')' : '—');
      _set('appcInvChk', ok ? fmt(F.fi(fa),3) : '—');
      _set('appcInvFormula',F.txt);
      var desc=document.getElementById('appcInvDataDesc');
      if(desc) desc.textContent='f⁻¹(x) = '+F.txt+'. '+(ok ? 'The point ('+fmt(a,2)+', '+fmt(fa,3)+') on f reflects across y = x to ('+fmt(fa,3)+', '+fmt(a,2)+') on f⁻¹, and f⁻¹(f(a)) = '+fmt(F.fi(fa),3)+' = a.' : 'a = '+fmt(a,1)+' is not in the domain of f.');
      var rows=[]; [-3,-1,0,1,2,3].forEach(function(x){ var y=F.f(x); rows.push([String(x), isFinite(y)?fmt(y,3):'undefined', isFinite(y)?'('+fmt(y,3)+', '+x+')':'—']); });
      renderDataRows(document.getElementById('appcInvDataRows'),rows);
    }
    register(canvas,draw);
    var sel=document.getElementById('appcInvF'), sa=document.getElementById('appcInvA');
    function upd(){ key=sel.value; a=parseFloat(sa.value); _set('appcInvAV',fmt(a,1)); redrawAll(); }
    if(sel) sel.addEventListener('change',upd);
    if(sa) sa.addEventListener('input',upd);
    upd();
  })();

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

