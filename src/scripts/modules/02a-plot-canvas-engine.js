/* ═══════════════════════════════════════════════════════════════════════════
   02a-plot-canvas-engine.js — Core 2D Plot & 3D WebGL Canvas Engine
   Extracted from 02-core-app.js (Pillar 5 Modularization).
   Provides theme-aware Plot(), lazy IntersectionObserver widget registry,
   pointer direct-drag (makeDraggable), Discovery Challenges (attachChallenge),
   ClipSAT3D (Three.js + OrbitControls lazy loader), and window.CSExplorerKit.
   ═══════════════════════════════════════════════════════════════════════════ */
(function(){
  "use strict";
  var INK='#0E1726', INDIGO='#1E3A6E', INDIGO2='#2B5BA8', AMBER='#B8801F', AMBER2='#C8902A',
      LINE='#D6DCE6', GRID='#E9EDF3', MUTED='#566173', PAPER='#FFFFFF', WHITE='#FFFFFF', AXIS='#AEB8C7';
  var FONT='13px ui-sans-serif, system-ui, -apple-system, sans-serif';

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
    WHITE  = PAPER;
    AXIS   = v('--faint', '#AEB8C7');
  }
  refreshPlotColors();
  window.CSPlotRefresh = function(){ refreshPlotColors(); if(typeof redrawAll==='function') redrawAll(); };
  window.esc = function(s){ return String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); };
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- numeric & geometry helpers ---------- */
  function dfdx(f,x){ var h=1e-4; return (f(x+h)-f(x-h))/(2*h); }
  function integrate(f,a,b,N){ N=N||2000; var dx=(b-a)/N, s=0; for(var i=0;i<N;i++){ s+=f(a+(i+0.5)*dx); } return s*dx; }
  function fmt(v,d){ d=(d==null)?2:d; if(!isFinite(v)) return '—'; return v.toFixed(d); }
  function niceStep(range,target){
    var raw=range/target, mag=Math.pow(10,Math.floor(Math.log10(raw))), n=raw/mag;
    var s = n<1.5?1 : n<3?2 : n<7?5 : 10; return s*mag;
  }

  function arrow(ctx,x1,y1,x2,y2,color,lw){
    if(typeof color==='number' && typeof lw==='string'){ color=lw; lw=2.2; }
    ctx.save(); ctx.strokeStyle=color; ctx.fillStyle=color; ctx.lineWidth=lw||2;
    ctx.beginPath(); ctx.moveTo(x1,y1); ctx.lineTo(x2,y2); ctx.stroke();
    var ang=Math.atan2(y2-y1,x2-x1), s=Math.max(5,(lw||2)*2.6);
    ctx.beginPath(); ctx.moveTo(x2,y2);
    ctx.lineTo(x2-s*Math.cos(ang-0.42), y2-s*Math.sin(ang-0.42));
    ctx.lineTo(x2-s*Math.cos(ang+0.42), y2-s*Math.sin(ang+0.42));
    ctx.closePath(); ctx.fill(); ctx.restore();
  }

  /* expand a view so one x-unit and one y-unit cover the same pixels */
  function _fitView(xmin,xmax,ymin,ymax,w,h,pad){
    pad=pad||{l:38,r:14,t:14,b:30};
    var pw=w-pad.l-pad.r, ph=h-pad.t-pad.b;
    if(pw<=0||ph<=0) return {xmin:xmin,xmax:xmax,ymin:ymin,ymax:ymax,square:true};
    var sx=(xmax-xmin)/pw, sy=(ymax-ymin)/ph, s=Math.max(sx,sy);
    var cx=(xmin+xmax)/2, cy=(ymin+ymax)/2;
    return {xmin:cx-s*pw/2, xmax:cx+s*pw/2, ymin:cy-s*ph/2, ymax:cy+s*ph/2, square:true};
  }

  var SQUARE_CANVAS_IDS = {
    'geoParCanvas': true, 'geoTriCanvas': true, 'geoPythCanvas': true, 'geoSectorCanvas': true,
    'geoDistCanvas': true, 'geoDilateCanvas': true, 'estPythCanvas': true, 'estTrigCanvas': true,
    'est2UcCanvas': true, 'est2CircCanvas': true, 'est2l2TransCanvas': true, 'est2l2VecAngCanvas': true,
    'ucCanvas': true, 'pcConicCanvas': true, 'pcSsaCanvas': true, 'pcLimaconCanvas': true,
    'pcProjCanvas': true, 'circleCanvas': true, 'trigCanvas': true, 'igTransCanvas': true,
    'a2TrigCanvas': true, 'conicCanvas': true, 'laVecCanvas': true, 'laMatCanvas': true,
    'laDetCanvas': true, 'laSpanCanvas': true, 'laEigCanvas': true, 'ibslTriCanvas': true,
    'ibslVecAngCanvas': true, 'ibslVorCanvas': true, 'ibhlArgandCanvas': true, 'ibhlDeMoivreCanvas': true,
    'ibhlPhaseCanvas': true, 'act2LawCanvas': true, 'act2IncCanvas': true, 'act2l2DetCanvas': true,
    'act2l2TrigCanvas': true, 'act2l2ComplexCanvas': true, 'a2VecCanvas': true, 'amCircularCanvas': true,
    'aiCosineCanvas': true, 'mvcVFCanvas': true, 'mvcGradCanvas': true, 'mvcCritCanvas': true,
    'odeSysCanvas': true, 'vecCanvas': true, 'fieldCanvas': true, 'bcPolarCanvas': true,
    'lineCanvas': true, 'sysCanvas': true, 'satLineCanvas': true, 'actLineCanvas': true,
    'asLineCanvas': true, 'tahTransCanvas': true, 'qudShadedCanvas': true, 'qudClockCanvas': true,
    'qudIdentitiesCanvas': true, 'tahConicCanvas': true, 'tahMatDetCanvas': true, 'tahExpLogCanvas': true
  };

  /* ---------- Plot helper (works in CSS pixels) ---------- */
  function Plot(ctx,w,h,view,pad){
    this.ctx=ctx; this.w=w; this.h=h;
    this.pad=pad||{l:38,r:14,t:14,b:30};
    this.origView=view;
    var canvasId = (ctx && ctx.canvas && ctx.canvas.id) || '';
    var isSquareReq = (view && (view.square || view.isometric)) ||
                      (this.pad && (this.pad.square || this.pad.isometric)) ||
                      (canvasId && SQUARE_CANVAS_IDS[canvasId]);
    if(view && isSquareReq){
      this.square = true;
      var pw = this.w - this.pad.l - this.pad.r;
      var ph = this.h - this.pad.t - this.pad.b;
      if(pw > 0 && ph > 0){
        var xmin = (view.baseXmin != null) ? view.baseXmin : view.xmin;
        var xmax = (view.baseXmax != null) ? view.baseXmax : view.xmax;
        var ymin = (view.baseYmin != null) ? view.baseYmin : view.ymin;
        var ymax = (view.baseYmax != null) ? view.baseYmax : view.ymax;
        var sx = (xmax - xmin) / pw;
        var sy = (ymax - ymin) / ph;
        var s = Math.max(sx, sy);
        var cx = (xmin + xmax) / 2;
        var cy = (ymin + ymax) / 2;
        this.v = {
          xmin: cx - s * pw / 2,
          xmax: cx + s * pw / 2,
          ymin: cy - s * ph / 2,
          ymax: cy + s * ph / 2,
          square: true,
          step: view.step,
          baseXmin: xmin,
          baseXmax: xmax,
          baseYmin: ymin,
          baseYmax: ymax
        };
      } else {
        this.v = Object.assign({}, view, {square: true});
      }
    } else {
      this.v = view;
    }
  }
  Plot.prototype.X=function(x){ var p=this.pad; return p.l+(x-this.v.xmin)/(this.v.xmax-this.v.xmin)*(this.w-p.l-p.r); };
  Plot.prototype.Y=function(y){ var p=this.pad; return this.h-p.b-(y-this.v.ymin)/(this.v.ymax-this.v.ymin)*(this.h-p.t-p.b); };
  Plot.prototype.invX=function(px){ var p=this.pad, span=this.w-p.l-p.r; return this.v.xmin + ((px - p.l)/span) * (this.v.xmax - this.v.xmin); };
  Plot.prototype.invY=function(py){ var p=this.pad, span=this.h-p.t-p.b; return this.v.ymin + ((this.h - p.b - py)/span) * (this.v.ymax - this.v.ymin); };
  Plot.prototype.x=Plot.prototype.X;
  Plot.prototype.y=Plot.prototype.Y;
  Plot.prototype.arrow=function(x1,y1,x2,y2,color,w){ arrow(this.ctx, this.X(x1), this.Y(y1), this.X(x2), this.Y(y2), color, w); };
  Plot.prototype.text=function(str,x,y,opts){
    opts = opts || {};
    var c = this.ctx; c.save();
    c.font = (opts.bold?'bold ':'') + (opts.size||12) + 'px ui-sans-serif, system-ui, sans-serif';
    c.fillStyle = opts.color || INK;
    c.textAlign = opts.align || 'left';
    c.textBaseline = opts.baseline || 'middle';
    c.fillText(str, this.X(x), this.Y(y));
    c.restore();
  };
  Plot.prototype.clear=function(){ this.ctx.clearRect(0,0,this.w,this.h); };
  Plot.prototype.grid=function(){
    var c=this.ctx,v=this.v,p=this.pad;
    var sx, sy;
    if(this.square || (v && v.square)){
      var spanMin = Math.min(v.xmax - v.xmin, v.ymax - v.ymin);
      var s = (v && v.step) ? v.step : niceStep(spanMin, 6);
      sx = s; sy = s;
    } else {
      sx = niceStep(v.xmax-v.xmin,7);
      sy = niceStep(v.ymax-v.ymin,5);
    }
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
    var x0=Math.min(a,b), x1=Math.max(a,b);
    c.beginPath(); var y0=this.Y(0), N=200; c.moveTo(this.X(x0),y0);
    for(var i=0;i<=N;i++){ var x=x0+(x1-x0)*i/N, y=f(x); if(isFinite(y)) c.lineTo(this.X(x),this.Y(y)); }
    c.lineTo(this.X(x1),y0); c.closePath(); c.fillStyle=fill||'rgba(30,58,110,0.16)'; c.fill(); c.restore();
  };
  Plot.prototype.shadedArea=Plot.prototype.areaUnder;
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
  Plot.prototype.vline=function(x,color,dash,width){
    var c=this.ctx,p=this.pad; c.save(); c.beginPath(); c.moveTo(this.X(x),p.t); c.lineTo(this.X(x),this.h-p.b);
    c.lineWidth=width||1.4; c.strokeStyle=color; if(dash) c.setLineDash(dash); c.stroke(); c.restore();
  };
  Plot.prototype.hline=function(y,color,dash,width){
    var c=this.ctx,p=this.pad; c.save(); var py=this.Y(y); c.beginPath(); c.moveTo(p.l,py); c.lineTo(this.w-p.r,py);
    c.lineWidth=width||1.4; c.strokeStyle=color; if(dash) c.setLineDash(dash); c.stroke(); c.restore();
  };
  Plot.prototype.parametric=function(fx,fy,tmin,tmax,color,width,dash){
    var c=this.ctx,p=this.pad; c.save(); c.beginPath();
    c.rect(p.l,p.t,this.w-p.l-p.r,this.h-p.t-p.b); c.clip();
    c.beginPath(); var started=false, N=320;
    for(var i=0;i<=N;i++){
      var t=tmin+(tmax-tmin)*i/N, x=fx(t), y=fy(t);
      if(!isFinite(x)||!isFinite(y)){ started=false; continue; }
      var px=this.X(x), py=this.Y(y);
      if(!started){ c.moveTo(px,py); started=true; } else c.lineTo(px,py);
    }
    c.lineWidth=width||2.4; c.strokeStyle=color||INDIGO; c.lineJoin='round';
    if(dash) c.setLineDash(dash); c.stroke(); c.restore();
  };
  Plot.prototype.label=function(x,y,str,color,align){
    var c=this.ctx; c.save();
    c.font='600 11.5px ui-sans-serif, system-ui, sans-serif';
    c.textAlign=align||'left'; c.textBaseline='middle';
    var px=this.X(x), py=this.Y(y);
    c.lineWidth=3; c.strokeStyle=PAPER||WHITE; c.strokeText(String(str),px,py);
    c.fillStyle=color||INK; c.fillText(String(str),px,py);
    c.restore();
  };
  Plot.prototype.polygon=function(pts,fill,stroke,width){
    if(!pts||!pts.length) return;
    var c=this.ctx,p=this.pad; c.save();
    c.beginPath(); c.rect(p.l,p.t,this.w-p.l-p.r,this.h-p.t-p.b); c.clip();
    c.beginPath();
    for(var i=0;i<pts.length;i++){
      var px=this.X(pts[i][0]), py=this.Y(pts[i][1]);
      if(i===0) c.moveTo(px,py); else c.lineTo(px,py);
    }
    c.closePath();
    if(fill){ c.fillStyle=fill; c.fill(); }
    if(stroke){ c.strokeStyle=stroke; c.lineWidth=width||2; c.lineJoin='round'; c.stroke(); }
    c.restore();
  };

  /* ---------- Explorer Runtime Math Formatter & KaTeX Renderer ---------- */
  var _SUP_MAP = {'⁰':'0','¹':'1','²':'2','³':'3','⁴':'4','⁵':'5','⁶':'6','⁷':'7','⁸':'8','⁹':'9','⁺':'+','⁻':'-','⁼':'=','⁽':'(','⁾':')','ⁿ':'n','ˣ':'x','ʸ':'y','ᵗ':'t','ʳ':'r','ᵏ':'k','ᵐ':'m','ᵖ':'p','ᵃ':'a','ᵇ':'b','ᶜ':'c','ᵈ':'d'};
  var _SUB_MAP = {'₀':'0','₁':'1','₂':'2','₃':'3','₄':'4','₅':'5','₆':'6','₇':'7','₈':'8','₉':'9','₊':'+','₋':'-','₌':'=','₍':'(','₎':')','ₐ':'a','ₑ':'e','ₕ':'h','ᵢ':'i','ⱼ':'j','ₖ':'k','ₗ':'l','ₘ':'m','ₙ':'n','ₒ':'o','ₚ':'p','ᵣ':'r','ₛ':'s','ₜ':'t','ᵤ':'u','ᵥ':'v','ₓ':'x'};
  var _GREEK_MAP = {
    'α':'\\alpha','β':'\\beta','γ':'\\gamma','δ':'\\delta','ε':'\\varepsilon','ζ':'\\zeta','η':'\\eta','θ':'\\theta','κ':'\\kappa','λ':'\\lambda','μ':'\\mu','ν':'\\nu','ξ':'\\xi','π':'\\pi','ρ':'\\rho','σ':'\\sigma','τ':'\\tau','φ':'\\varphi','χ':'\\chi','ψ':'\\psi','ω':'\\omega',
    'Γ':'\\Gamma','Δ':'\\Delta','Θ':'\\Theta','Λ':'\\Lambda','Π':'\\Pi','Σ':'\\Sigma','Φ':'\\Phi','Ψ':'\\Ψ','Ω':'\\Omega'
  };
  _GREEK_MAP['Ψ'] = '\\Psi';
  var _VULGAR_FRACS = {
    '½':'\\tfrac{1}{2}','⅓':'\\tfrac{1}{3}','⅔':'\\tfrac{2}{3}','¼':'\\tfrac{1}{4}','¾':'\\tfrac{3}{4}',
    '⅕':'\\tfrac{1}{5}','⅖':'\\tfrac{2}{5}','⅗':'\\tfrac{3}{5}','⅘':'\\tfrac{4}{5}','⅙':'\\tfrac{1}{6}',
    '⅚':'\\tfrac{5}{6}','⅛':'\\tfrac{1}{8}','⅜':'\\tfrac{3}{8}','⅝':'\\tfrac{5}{8}','⅞':'\\tfrac{7}{8}'
  };
  var _MATH_FUNCS = {
    'sin':1,'cos':1,'tan':1,'csc':1,'sec':1,'cot':1,
    'arcsin':1,'arccos':1,'arctan':1,'arccsc':1,'arcsec':1,'arccot':1,
    'sinh':1,'cosh':1,'tanh':1,'ln':1,'log':1,'exp':1,'lim':1,
    'det':1,'gcd':1,'lcm':1,'min':1,'max':1,'arg':1,'Re':1,'Im':1,'mod':1,'nCr':1,'nPr':1
  };
  var _MATH_NOUN_BEFORE_A = /\b(?:coefficient|parameter|constant|base|slope|radius|side|semi-ax[ie]s|bound|point|vertex|angle|vector|matrix|Residue|event|set|line|curve|function|variable|term|factor|root|value|origin)\s*$/i;

  function _exprToLatex(s){
    var out = String(s || '');
    out = out.replace(/([a-zA-Zα-ωΓ-Ω])\u0304/g, '\\bar{$1}');
    out = out.replace(/([a-zA-Zα-ωΓ-Ω])\u0302/g, '\\hat{$1}');
    out = out.replace(/([a-zA-Zα-ωΓ-Ω])\u20D7/g, '\\vec{$1}');
    out = out.replace(/[½⅓⅔¼¾⅕⅖⅗⅘⅙⅚⅛⅜⅝⅞]/g, function(c){ return _VULGAR_FRACS[c] || c; });
    out = out.replace(/\b([n0-9]+)C([r0-9]+)\b/g, '{}_{$1}C_{$2}');
    out = out.replace(/\b([n0-9]+)P([r0-9]+)\b/g, '{}_{$1}P_{$2}');
    out = out.replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹⁺⁻⁼⁽⁾ⁿˣʸᵗʳᵏᵐᵖᵃᵇᶜᵈ]+/g, function(m){
      return '^{' + m.split('').map(function(c){ return _SUP_MAP[c] || c; }).join('') + '}';
    });
    out = out.replace(/[₀₁₂₃₄₅₆₇₈₉₊₋₌₍₎ₐₑₕᵢⱼₖₗₘₙₒₚᵣₛₜᵤᵥₓ]+/g, function(m){
      return '_{' + m.split('').map(function(c){ return _SUB_MAP[c] || c; }).join('') + '}';
    });
    out = out.replace(/∫/g, '\\int ');
    for(var i=0;i<3;i++){
      out = out.replace(/\^\(([^()]+)\)/g, '^{$1}');
      out = out.replace(/_\(([^()]+)\)/g, '_{$1}');
    }
    out = out.replace(/√\(([^()]+)\)/g, '\\sqrt{$1}');
    out = out.replace(/∛\(([^()]+)\)/g, '\\sqrt[3]{$1}');
    out = out.replace(/√([a-zA-Z0-9^{}+-]+)/g, '\\sqrt{$1}');
    out = out.replace(/\bd(\^\{2\})?([yztfuvx])\/d([xztuv])(\^\{2\})?\b/g, '\\frac{d$1$2}{d$3$4}');
    out = out.replace(/(^|[^\\a-zA-Z_])\b(arcsin|arccos|arctan|sinh|cosh|tanh|sin|cos|tan|csc|sec|cot|ln|log|exp|det|gcd|min|max|arg)\b/g, '$1\\$2 ');
    out = out.replace(/(^|[^\\a-zA-Z_])\b(arccsc|arcsec|arccot|Re|Im)\b/g, '$1\\operatorname{$2}');
    out = out.replace(/(^|[^\\a-zA-Z_])\blim\s+([a-zA-Z0-9]+)\s*(?:→|\\to)\s*([^\s,;:)]+)/g, '$1\\lim_{$2 \\to $3}');
    out = out.replace(/(^|[^\\a-zA-Z_])\blim_\{([^}]+)\}/g, '$1\\lim_{$2}');
    out = out.replace(/_([a-zA-Z]{2,})\b/g, '_{\\text{$1}}');
    out = out.replace(/(\d|\bpi\b|π|\})\s+rad\b/g, '$1\\text{ rad}');
    out = out.replace(/[α-ωΓΔΘΛΠΣΦΨΩ]/g, function(c){ return (_GREEK_MAP[c] || c) + ' '; });
    out = out.replace(/\\([a-zA-Z]+)\s+([\^_])/g, '\\$1$2');
    out = out.replace(/\\([a-zA-Z]+)\s+([),\]!])/g, '\\$1$2');
    out = out.replace(/\\(arcsin|arccos|arctan|sin|cos|tan|csc|sec|cot|ln|log|exp|gcd|min|max|arg)\s+\(/g, '\\$1(');
    out = out.replace(/≤/g, ' \\le ')
             .replace(/≥/g, ' \\ge ')
             .replace(/≠/g, ' \\ne ')
             .replace(/≈/g, ' \\approx ')
             .replace(/±/g, ' \\pm ')
             .replace(/∓/g, ' \\mp ')
             .replace(/×/g, ' \\times ')
             .replace(/÷/g, ' \\div ')
             .replace(/·/g, ' \\cdot ')
             .replace(/−/g, '-')
             .replace(/∞/g, '\\infty ')
             .replace(/→/g, ' \\to ')
             .replace(/↔/g, ' \\leftrightarrow ')
             .replace(/⇒/g, ' \\implies ')
             .replace(/∈/g, ' \\in ')
             .replace(/∉/g, ' \\notin ')
             .replace(/∪/g, ' \\cup ')
             .replace(/∩/g, ' \\cap ')
             .replace(/∅/g, '\\emptyset ')
             .replace(/⊥/g, ' \\perp ')
             .replace(/∥/g, ' \\parallel ')
             .replace(/‖/g, '\\|')
             .replace(/∠/g, '\\angle ')
             .replace(/△/g, '\\triangle ')
             .replace(/⟨/g, '\\langle ')
             .replace(/⟩/g, '\\rangle ')
             .replace(/′/g, "'")
             .replace(/″/g, "''")
             .replace(/°/g, '^\\circ ')
             .replace(/([^\\])%/g, '$1\\%')
             .replace(/^%/, '\\%')
             .replace(/([^\\])&/g, '$1\\&')
             .replace(/^&/, '\\&');
    return out.replace(/\s+/g, ' ').trim();
  }

  function _isPureMathContent(s, saved){
    var unwrapped = saved ? s.replace(/\uE000(\d+)\uE001/g, function(_, idx){ return saved[Number(idx)]; }) : s;
    if(/[\u0600-\u06FF]/.test(unwrapped)) return false;
    var words = unwrapped.match(/[a-zA-Z]{2,}/g) || [];
    for(var i=0;i<words.length;i++){
      var w = words[i];
      if(_MATH_FUNCS[w]) continue;
      if(/^(?:dx|dy|dt|du|dv|dr|ds|dz|pi|inf|infty|obs|crit|max|min|tot|net|avg|std|rad|MLE|MAP|OLS|SSR|SSE|SST|IQR|pdf|cdf|pmf)$/.test(w)) continue;
      if(unwrapped.indexOf('_' + w) !== -1) continue;
      return false;
    }
    return true;
  }

  function _wrapChunkMath(rawChunk, isValueMode){
    if(!rawChunk || typeof rawChunk !== 'string') return rawChunk;
    if(rawChunk.indexOf('\\(') !== -1 || rawChunk.indexOf('\\[') !== -1 || rawChunk.indexOf('$$') !== -1) return rawChunk;
    var trimmed = rawChunk.trim();
    if(!trimmed || trimmed === '—' || trimmed === '-') return rawChunk;

    if(isValueMode){
      var sepParts = trimmed.split(/\s+(\||&)\s+/);
      if(sepParts.length >= 1){
        var exprs = sepParts.filter(function(_, i){ return i % 2 === 0; });
        var allPure = exprs.every(function(p){
          return _isPureMathContent(p) && /[0-9=<>≤≥≠≈±∓×÷·−∞→∈∪∩⟨⟩‖√∫α-ωΓ-Ω⁰-⁹₀-₉^_()\[\]½⅓⅔¼¾]/.test(p);
        });
        if(allPure){
          var res = '';
          for(var k=0;k<sepParts.length;k++){
            if(k % 2 === 0) res += '\\(' + _exprToLatex(sepParts[k]) + '\\)';
            else res += (sepParts[k] === '|' ? ' \\;|\\; ' : ' & ');
          }
          return res;
        }
      }
    }

    var s = rawChunk;
    var saved = [];
    function unwrap(str){
      var out = str, prev;
      do {
        prev = out;
        out = out.replace(/\uE000(\d+)\uE001/g, function(_, idx){ return saved[Number(idx)]; });
      } while(out !== prev);
      return out;
    }
    function save(raw){
      var clean = unwrap(raw);
      var id = '\uE000' + saved.length + '\uE001';
      saved.push(clean);
      return id;
    }

    var protectedWords = [];
    s = s.replace(/\b([xyztrn])-([Ii]ntercepts?|[Aa]x[ie]s|[Cc]oordinates?|[Vv]alues?|[Cc]omponents?|[Ss]hifts?|[Ss]teps?|[Ss]trips?)\b/g,
      function(_, v, word){
        var pid = '\uE002' + protectedWords.length + '\uE003';
        protectedWords.push('\\(' + v + '\\)-' + word);
        return pid;
      });

    s = s.replace(/⟨[^⟩]+⟩/g, function(m){ return save(m); });
    s = s.replace(/‖([^‖\n]+)‖/g, function(m, inner){
      if(inner.trim() && _isPureMathContent(inner, saved)) return save(m);
      return m;
    });
    s = s.replace(/\|([^|\n]+)\|/g, function(m, inner){
      if(inner.trim() && _isPureMathContent(inner, saved)) return save(m);
      return m;
    });
    s = s.replace(/\bd(?:²|\^2)?[yztfuvx]\/d[xztuv](?:²|\^2)?(?:\|_\{[^}]+\}|\|_[0-9a-zA-Z+-]+)?/g, function(m){ return save(m); });
    s = s.replace(/∫[₀-₉⁰-⁹ᵃ-ᶻₐ-ₓ_{}^0-9a-zA-Z+\-−]*(?:\s*[a-zA-Z0-9α-ω()+\-−·^_⁰-⁹₀-₉/]+\s*)*d[xztuvθ]/g, function(m){ return save(m); });
    s = s.replace(/[√∛]\([^()]+\)|[√∛][a-zA-Z0-9α-ω⁰-⁹₀-₉^_+-]+/g, function(m){ return save(m); });
    s = s.replace(/(?:[a-zA-Z0-9α-ω\u0304\u0302\uE000-\uE001]+|\([^()\n]+\))(?:[⁰¹²³⁴⁵⁶⁷⁸⁹⁺⁻⁼⁽⁾ⁿˣʸᵗʳᵏᵐᵖᵃᵇᶜᵈ]+|\^\([^()]+\)|\^[a-zA-Z0-9+-]+)/g, function(m){
      if(_isPureMathContent(m, saved)) return save(m);
      return m;
    });
    for(var pass=0;pass<3;pass++){
      s = s.replace(/([a-zA-Zα-ωΓ-Ω\uE000][a-zA-Z0-9₀-₉⁰-⁹⁺⁻ⁿˣʸᵗʳᵏᵐᵖᵃᵇᶜᵈ′″'_\u0304\u0302\uE000-\uE001]*)\(([^()]*)\)/g, function(m, fn, args){
        var unwrappedFn = unwrap(fn);
        var cleanFn = unwrappedFn.replace(/[₀-₉⁰-⁹⁺⁻ⁿˣʸᵗʳᵏᵐᵖᵃᵇᶜᵈ′″'_\u0304\u0302^].*$/, '');
        if((cleanFn.length === 1 || _MATH_FUNCS[cleanFn] || unwrappedFn !== cleanFn) && _isPureMathContent(args, saved)){
          return save(m);
        }
        return m;
      });
    }
    s = s.replace(/[(\[]\s*[-−+±]?[^()\[\],\n]+,\s*[-−+±]?[^()\[\]\n]+[)\]]/g, function(m){
      var inner = m.slice(1, -1);
      if(_isPureMathContent(inner, saved) && /[0-9a-zA-Zα-ω∞π\uE000]/.test(inner)) return save(m);
      return m;
    });
    s = s.replace(/\(([^()\n]+)\)/g, function(m, inner){
      if(_isPureMathContent(inner, saved) && /[=<>≤≥≠≈±∓×÷·−+*/^⁰-⁹₀-₉α-ωΓ-Ω\uE000]/.test(inner)) return save(m);
      return m;
    });
    s = s.replace(/\blim\s+[a-zA-Z0-9]+\s*(?:→|\\to)\s*[^\s,;:.)]+/g, function(m){ return save(m); });
    s = s.replace(/\b(?:arcsin|arccos|arctan|sin|cos|tan|csc|sec|cot|ln|log|det)(?:[⁰-⁹⁺⁻]+|\^[0-9+-]+|\uE000\d+\uE001)?\s+(?:[0-9]*[a-zA-Zα-ωΓ-Ω\uE000][0-9a-zA-Z₀-₉⁰-⁹′″\uE000-\uE001]*)/g, function(m){ return save(m); });
    s = s.replace(/[a-zA-Z0-9α-ωΓ-Ω]+(?:[\u0304\u0302′″]|[₀-₉₊₋₌₍₎ₐₑₕᵢⱼₖₗₘₙₒₚᵣₛₜᵤᵥₓ⁰¹²³⁴⁵⁶⁷⁸⁹⁺⁻⁼⁽⁾ⁿˣʸᵗʳᵏᵐᵖᵃᵇᶜᵈ]+|_[a-zA-Z0-9+-]+)+/g, function(m){ return save(m); });
    s = s.replace(/\b[a-zA-Z]'{1,3}(?![a-zA-Z])/g, function(m){ return save(m); });
    s = s.replace(/\b[a-zA-Z]!/g, function(m){ return save(m); });
    s = s.replace(/[-−+]?\d+(?:\.\d+)?\s*°/g, function(m){ return save(m); });
    s = s.replace(/[½⅓⅔¼¾⅕⅖⅗⅘⅙⅚⅛⅜⅝⅞][a-zA-Zα-ω⁰-⁹₀-₉]*/g, function(m){ return save(m); });
    s = s.replace(/(?:^|[\s(,;:[−+-])([-−+]?\d+(?:\.\d+)?(?:[a-zA-Zα-ω]|ac|ab|bc|xy|dx|dy|dt))\b/g, function(m, mon){
      if(/^\d+(?:st|nd|rd|th|px|pt|em|ms|hr|yr|min|sec|d)$/i.test(mon.trim())) return m;
      var pre = m.slice(0, m.length - mon.length);
      return pre + save(mon);
    });
    s = s.replace(/\b(?:iz|ai|bi|ax|bx|by|cx|cy|dx|dy|dt|du|dv|dr|ds|dz|mx|nx|kx|ab|bc|ac|ad|bd|cd|pq|mn|xy|xz|yz)\b/g, function(m){ return save(m); });
    s = s.replace(/[α-ωΓΔΘΛΠΣΦΨΩ][a-zA-Z0-9]*/g, function(m){ return save(m); });
    s = s.replace(/(^|[\s(,;:[<>=≤≥≠±·+\-−/])([b-hj-zB-HJ-Z])(?=$|[\s).,;:\]!?<>=≤≥≠±·+\-−/])/g, function(m, pre, ch){
      return pre + save(ch);
    });
    s = s.replace(/(^|[\s(,;:])([aA])(?=\s*(?:[=<>≤≥≠≈±∓×÷·/]|−\s*[0-9a-zA-Z\uE000]|\+\s*(?:[0-9b-zB-Z\uE000]))|\uE000)/g, function(m, pre, ch){ return pre + save(ch); });
    s = s.replace(/([=<>≤≥≠≈±∓×÷·−/]\s*)([aA])(?=$|[\s).,;:!?+\-−·/])/g, function(m, pre, ch){ return pre + save(ch); });
    s = s.replace(/([a-zA-Z]+\s+)([aA])(?=\s+(?:and|or|,)\s+\uE000|\s*[=<>≤≥≠±·+\-−/]|[\s.,;:!?)]|$)/g, function(m, pre, ch){
      if(_MATH_NOUN_BEFORE_A.test(pre)) return pre + save(ch);
      return m;
    });

    var prev;
    do {
      prev = s;
      s = s.replace(/(\uE000\d+\uE001|[-−+]?\d+(?:\.\d+)?%?)\s*([=<>≤≥≠≈±∓×÷·+−*\/→↔⇒⇔∈∉∪∩]|-(?=\s*(?:\uE000|\d)))\s*(\uE000\d+\uE001|[-−+]?\d+(?:\.\d+)?%?)/g, function(m, L, op, R){
        return save(unwrap(L) + ' ' + op + ' ' + unwrap(R));
      });
      s = s.replace(/(\uE000\d+\uE001|[-−+]?\d+(?:\.\d+)?)\s*(\uE000\d+\uE001)/g, function(m, L, R){
        return save(unwrap(L) + (m.indexOf(' ') !== -1 ? ' ' : '') + unwrap(R));
      });
      s = s.replace(/(\uE000\d+\uE001)\s*=\s*$/g, function(_, L){ return save(unwrap(L) + ' ='); });
      s = s.replace(/(^|[\s(,;:[=<>≤≥≠])([−±])\s*(\uE000\d+\uE001)/g, function(m, pre, sgn, R){
        return pre + save(sgn + unwrap(R));
      });
    } while(s !== prev);

    s = s.replace(/\uE000(\d+)\uE001/g, function(_, idx){ return '\\(' + _exprToLatex(saved[Number(idx)]) + '\\)'; });
    s = s.replace(/\uE002(\d+)\uE003/g, function(_, idx){ return protectedWords[Number(idx)]; });
    return s;
  }

  function CSFormatExplorerMath(str, isValueMode){
    if(!str || typeof str !== 'string') return str;
    if(str.indexOf('\\(') !== -1 || str.indexOf('\\[') !== -1 || str.indexOf('$$') !== -1 || str.indexOf('katex') !== -1) return str;
    var pre = str.replace(/<b>\s*([a-zA-Z])\s*(=\s*)?<\/b>/g, function(_, v, eq){ return '<b>\\(' + v + (eq ? ' =' : '') + '\\)</b>'; });
    var parts = pre.split(/(<b>\\\(.*?\\\)<\/b>|<[^>]+>)/g);
    return parts.map(function(p){ return (p.charAt(0) === '<' && p.charAt(p.length - 1) === '>') ? p : _wrapChunkMath(p, isValueMode); }).join('');
  }
  window.CSFormatExplorerMath = CSFormatExplorerMath;

  function renderExplorerEl(el, isValueMode){
    if(!el || el.nodeType !== 1) return;
    if(el.querySelector && el.querySelector('.katex')) return;
    if(!window.katex || typeof window.CSRenderMathString !== 'function') return;
    if(el.children && el.children.length === 0){
      var raw = el.textContent;
      if(!raw || !raw.trim()) return;
      var formatted = CSFormatExplorerMath(raw, isValueMode);
      if(formatted.indexOf('\\(') === -1 && formatted.indexOf('\\[') === -1 && formatted.indexOf('$$') === -1) return;
      var safeHtml = formatted.split(/(\\\([\s\S]*?\\\))/g).map(function(part, idx){
        return idx % 2 === 1 ? part : window.esc(part);
      }).join('');
      el.innerHTML = window.CSRenderMathString(safeHtml);
    } else {
      var html = el.innerHTML;
      var fmtHtml = CSFormatExplorerMath(html, isValueMode);
      if(fmtHtml.indexOf('\\(') !== -1 || fmtHtml.indexOf('\\[') !== -1 || fmtHtml.indexOf('$$') !== -1){
        el.innerHTML = window.CSRenderMathString(fmtHtml);
      }
    }
  }

  function renderExplorerContainer(ex){
    if(!ex || !ex.querySelectorAll || !window.katex || typeof window.CSRenderMathString !== 'function') return;
    var vals = ex.querySelectorAll('.readrow .v, .ex-controls > .mono, .ctrl label .mono, .ex-data-panel td');
    for(var i=0;i<vals.length;i++) renderExplorerEl(vals[i], true);
    var prose = ex.querySelectorAll('.readrow > span:first-child, .ex-data-panel p[id], .callout.note p, .ex-ch-prompt');
    for(var j=0;j<prose.length;j++) renderExplorerEl(prose[j], false);
  }

  window.CSRenderAllExplorers = function(){
    if(!document.querySelectorAll) return;
    var exList = document.querySelectorAll('.explorer');
    for(var i=0;i<exList.length;i++) renderExplorerContainer(exList[i]);
  };

  function _patchCanvasMathText(ctx){
    if(!ctx || ctx._csMathPatched) return;
    ctx._csMathPatched = true;
    var origFill = ctx.fillText;
    var origStroke = ctx.strokeText;
    function drawSegmented(origFn, str, x, y, maxW){
      var s = String(str == null ? '' : str);
      if(s.indexOf('^') === -1 && s.indexOf('_') === -1){
        if(maxW !== undefined) origFn.call(ctx, s, x, y, maxW);
        else origFn.call(ctx, s, x, y);
        return;
      }
      var tokens = [];
      var re = /\^(\([^()]+\)|[a-zA-Z0-9+\-−.\/]+)|_(\([^()]+\)|[a-zA-Z0-9∞+\-−]+)/g;
      var last = 0, m;
      while((m = re.exec(s)) !== null){
        if(m.index > last) tokens.push({type:'norm', text:s.slice(last, m.index)});
        if(m[1] != null){
          var supTxt = m[1].charAt(0) === '(' && m[1].charAt(m[1].length - 1) === ')' ? m[1].slice(1, -1) : m[1];
          tokens.push({type:'sup', text:supTxt});
        } else if(m[2] != null){
          var subTxt = m[2].charAt(0) === '(' && m[2].charAt(m[2].length - 1) === ')' ? m[2].slice(1, -1) : m[2];
          tokens.push({type:'sub', text:subTxt});
        }
        last = re.lastIndex;
      }
      if(last < s.length) tokens.push({type:'norm', text:s.slice(last)});
      if(tokens.length <= 1){
        if(maxW !== undefined) origFn.call(ctx, s, x, y, maxW);
        else origFn.call(ctx, s, x, y);
        return;
      }
      var baseFont = ctx.font || FONT;
      var baseAlign = ctx.textAlign || 'left';
      var szMatch = baseFont.match(/(\d+(?:\.\d+)?)px/);
      var baseSize = szMatch ? parseFloat(szMatch[1]) : 12;
      var subFont = baseFont.replace(/(\d+(?:\.\d+)?)px/, (baseSize * 0.78).toFixed(1) + 'px');
      var totalW = 0;
      for(var i=0;i<tokens.length;i++){
        ctx.font = tokens[i].type === 'norm' ? baseFont : subFont;
        tokens[i].w = ctx.measureText(tokens[i].text).width;
        totalW += tokens[i].w;
      }
      var curX = x;
      if(baseAlign === 'center') curX = x - totalW / 2;
      else if(baseAlign === 'right' || baseAlign === 'end') curX = x - totalW;
      ctx.textAlign = 'left';
      for(var j=0;j<tokens.length;j++){
        var tk = tokens[j];
        ctx.font = tk.type === 'norm' ? baseFont : subFont;
        var dy = tk.type === 'sup' ? -baseSize * 0.36 : (tk.type === 'sub' ? baseSize * 0.24 : 0);
        origFn.call(ctx, tk.text, curX, y + dy);
        curX += tk.w;
      }
      ctx.font = baseFont;
      ctx.textAlign = baseAlign;
    }
    ctx.fillText = function(str, x, y, maxW){ drawSegmented(origFill, str, x, y, maxW); };
    ctx.strokeText = function(str, x, y, maxW){ drawSegmented(origStroke, str, x, y, maxW); };
  }

  /* ---------- canvas registry & sizing ---------- */
  var widgets=[];
  function sizeOf(canvas){
    var dpr=window.devicePixelRatio||1, rect=canvas.getBoundingClientRect();
    if(rect.width<2||rect.height<2) return null;
    canvas.width=Math.round(rect.width*dpr); canvas.height=Math.round(rect.height*dpr);
    var ctx=canvas.getContext('2d'); ctx.setTransform(dpr,0,0,dpr,0,0);
    _patchCanvasMathText(ctx);
    return {ctx:ctx, w:rect.width, h:rect.height};
  }
  function drawWidget(wd){
    if(!wd || !wd.canvas || wd.canvas.offsetParent===null) return false;
    var s=sizeOf(wd.canvas); if(!s) return false;
    try {
      wd.draw(s.ctx, s.w, s.h);
    } catch(err) {
      if(window.console && console.warn) console.warn('Explorer draw error:', wd.canvas.id, err);
    }
    if(wd.canvas.closest) renderExplorerContainer(wd.canvas.closest('.explorer'));
    wd.seen=true;
    if(_io){ try { _io.unobserve(wd.canvas); } catch(_){} }
    return true;
  }
  var _io = ('IntersectionObserver' in window) ? new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if(!entry.isIntersecting) return;
      var wd=entry.target._cswd;
      if(wd && !wd.seen) drawWidget(wd);
    });
  }, {rootMargin:'200px 0px'}) : null;
  function register(canvas, drawFn){
    var wd={canvas:canvas, draw:drawFn, seen:false};
    canvas._cswd=wd;
    widgets.push(wd);
    if(!_io){ drawWidget(wd); return; }
    var rect=canvas.getBoundingClientRect();
    if(rect.top<window.innerHeight && rect.bottom>0 && canvas.offsetParent!==null){
      drawWidget(wd);
    } else {
      _io.observe(canvas);
    }
  }
  function redrawAll(){
    widgets.forEach(function(wd){
      drawWidget(wd);
    });
  }
  var rt; window.addEventListener('resize',function(){ clearTimeout(rt); rt=setTimeout(redrawAll,120); });

  if(typeof document !== 'undefined' && document.addEventListener){
    var _exEvtHandler = function(e){
      var t = e && e.target;
      var ex = t && t.closest && t.closest('.explorer');
      if(ex){
        setTimeout(function(){ renderExplorerContainer(ex); }, 0);
      }
    };
    document.addEventListener('input', _exEvtHandler, true);
    document.addEventListener('change', _exEvtHandler, true);
    document.addEventListener('click', _exEvtHandler, true);
  }

  /* ---------- Shared "View as Data" helpers ---------- */
  function drawExplorerOf(btn){
    var ex=btn.closest&&btn.closest('.explorer');
    if(!ex) return;
    Array.prototype.forEach.call(ex.querySelectorAll('canvas'),function(cv){
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
      for(j=0;j<rows[i].length;j++){
        var cell = String(rows[i][j]==null ? '' : rows[i][j]);
        var fmtCell = CSFormatExplorerMath(cell, true);
        var safeCell = fmtCell.split(/(\\\([\s\S]*?\\\))/g).map(function(part, idx){
          return idx % 2 === 1 ? part : window.esc(part);
        }).join('');
        var outCell = (window.katex && typeof window.CSRenderMathString === 'function' && safeCell.indexOf('\\(') !== -1)
          ? window.CSRenderMathString(safeCell)
          : window.esc(cell);
        html+='<td>'+outCell+'</td>';
      }
      html+='</tr>';
    }
    rowsEl.innerHTML=html;
  }

  /* ---------- Explorer Kit micro-helpers ---------- */
  function _slider(id,fn){
    var el=document.getElementById(id);
    if(el){
      var h=function(e){ fn(parseFloat(el.value), e); redrawAll(); };
      el.addEventListener('input',h);
      el.addEventListener('change',h);
    }
    return el;
  }
  function _set(id,txt){
    var el=document.getElementById(id);
    if(!el) return;
    el.textContent=txt;
    renderExplorerEl(el, true);
  }
  function _deg(r){ return r*180/Math.PI; }
  function _num(k){ return k%1===0 ? String(k) : fmt(k,1); }
  function _clip(P,fn){ var c=P.ctx,p=P.pad; c.save(); c.beginPath(); c.rect(p.l,p.t,P.w-p.l-p.r,P.h-p.t-p.b); c.clip(); fn(); c.restore(); }

  /* Pointer direct-drag interaction helper for interactive canvas explorers */
  function makeDraggable(canvas, opts){
    if(!canvas) return;
    opts = opts || {};
    var dragging = null;
    function getPos(e){
      var rect = canvas.getBoundingClientRect();
      var clientX = e.clientX, clientY = e.clientY;
      return {
        x: (clientX - rect.left) * (canvas.width / (rect.width || 1)),
        y: (clientY - rect.top) * (canvas.height / (rect.height || 1))
      };
    }
    canvas.style.touchAction = 'none';
    canvas.addEventListener('pointerdown', function(e){
      var pos = getPos(e);
      if(typeof opts.hitTest === 'function'){
        dragging = opts.hitTest(pos.x, pos.y);
        if(dragging){
          canvas.setPointerCapture(e.pointerId);
          if(opts.onStart) opts.onStart(dragging, pos.x, pos.y);
          redrawAll();
        }
      }
    });
    canvas.addEventListener('pointermove', function(e){
      var pos = getPos(e);
      if(dragging){
        if(opts.onDrag) opts.onDrag(dragging, pos.x, pos.y);
        redrawAll();
      } else if(typeof opts.hitTest === 'function'){
        var hit = opts.hitTest(pos.x, pos.y);
        canvas.style.cursor = hit ? 'grab' : 'default';
      }
    });
    function end(e){
      if(dragging){
        if(opts.onEnd) opts.onEnd(dragging);
        dragging = null;
        try{ canvas.releasePointerCapture(e.pointerId); }catch(_){}
        canvas.style.cursor = 'default';
        redrawAll();
      }
    }
    canvas.addEventListener('pointerup', end);
    canvas.addEventListener('pointercancel', end);
  }

  /* ---------- Discovery Challenge Controller ---------- */
  function attachChallenge(canvasId, spec){
    if(!spec || !canvasId) return null;
    var canvas = typeof canvasId === 'string' ? document.getElementById(canvasId) : canvasId;
    if(!canvas) return null;
    var container = canvas.closest('.explorer') || canvas.parentElement;
    if(!container) return null;
    var id = 'cs-ch-' + (canvas.id || canvasId);
    var existing = document.getElementById(id);
    if(existing && existing._challengeApi) return existing._challengeApi;

    var controls = container.querySelector('.ex-controls') || container;
    var card = document.createElement('div');
    card.id = id;
    card.className = 'ex-challenge-card';

    var storageKey = 'clipsat_ch_' + (canvas.id || canvasId);
    var wasSolved = false;
    try { wasSolved = localStorage.getItem(storageKey) === '1'; } catch(_) {}

    var isAr = document.documentElement.lang === 'ar';
    var promptText = (spec.prompt && typeof spec.prompt === 'object')
      ? (isAr && spec.prompt.ar ? spec.prompt.ar : spec.prompt.en)
      : String(spec.prompt || '');

    var titleText = isAr ? 'تحدي استكشافي' : 'Discovery Challenge';
    var statusWaiting = isAr ? '⏳ جاري الاستكشاف...' : '⏳ In Progress...';
    var statusSuccess = isAr ? '🎉 أحسنت! تم تحقيق الهدف' : '🎉 Goal Achieved!';

    card.innerHTML =
      '<div class="ex-ch-header">' +
        '<div class="ex-ch-tag"><span class="ex-ch-icon">🎯</span> <strong class="ex-ch-title">' + titleText + '</strong></div>' +
        '<span class="ex-ch-status' + (wasSolved ? ' solved' : '') + '">' + (wasSolved ? statusSuccess : statusWaiting) + '</span>' +
      '</div>' +
      '<p class="ex-ch-prompt">' + promptText + '</p>';

    if(wasSolved) card.classList.add('is-solved');
    controls.appendChild(card);
    renderExplorerEl(card.querySelector('.ex-ch-prompt'), false);

    var api = {
      card: card,
      check: function(state){
        if(card.classList.contains('is-solved')) return true;
        try {
          if(spec.check && spec.check(state)){
            card.classList.add('is-solved');
            var statusEl = card.querySelector('.ex-ch-status');
            if(statusEl){
              statusEl.className = 'ex-ch-status solved';
              statusEl.textContent = statusSuccess;
            }
            try { localStorage.setItem(storageKey, '1'); } catch(_) {}
            return true;
          }
        } catch(_) {}
        return false;
      },
      reset: function(){
        card.classList.remove('is-solved');
        var statusEl = card.querySelector('.ex-ch-status');
        if(statusEl){
          statusEl.className = 'ex-ch-status';
          statusEl.textContent = statusWaiting;
        }
        try { localStorage.removeItem(storageKey); } catch(_) {}
      }
    };
    card._challengeApi = api;
    return api;
  }

  /* ---------- Shared 3D-explorer helper (Three.js + OrbitControls lazy loader) ---------- */
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
      controls.enableDamping=false;
      controls.enablePan=false;
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

      var rt3d;
      window.addEventListener('resize',function(){
        clearTimeout(rt3d);
        rt3d=setTimeout(function(){
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

  /* ---------- Export shared ExplorerKit for per-track explorer files & router ---------- */
  window.CSExplorerKit={
    register:register, reduceMotion:reduceMotion, drawExplorerOf:drawExplorerOf, fmt:fmt, Plot:Plot, redrawAll:redrawAll, wireDataToggle:wireDataToggle, renderDataRows:renderDataRows, dfdx:dfdx, integrate:integrate, arrow:arrow, _deg:_deg, _fitView:_fitView, _clip:_clip, _set:_set, _slider:_slider, _num:_num, makeDraggable:makeDraggable, attachChallenge:attachChallenge,
    colors:function(){ return {INK:INK, INDIGO:INDIGO, INDIGO2:INDIGO2, AMBER:AMBER, AMBER2:AMBER2, LINE:LINE, GRID:GRID, MUTED:MUTED, PAPER:PAPER, WHITE:WHITE, AXIS:AXIS, FONT:FONT}; }
  };
})();
