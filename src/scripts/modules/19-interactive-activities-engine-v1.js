(function(){
'use strict';
var D={};

/* Per-track data (Plan 5 Phase 5.015, ADR 0033). The chapter configs used to live
   here, inline, for every track at once: ~140KB of engine.js that every page
   parsed, although each page only has its own track's chapters (each of the 197
   entries belongs to exactly one track). They now live in
   src/scripts/ix-data/{track}.js, which build.js minifies to public/js/ix/{track}.js.
   This engine loads the current track's file (from <body class="track-{id}">) and
   injects once both the data and the DOM are ready. IX_TRACKS is filled in by
   build.js with the tracks that actually have a data file, so a track without one
   never requests a file that isn't there. */
var IX_TRACKS=/*@IX_TRACKS@*/[];
/* ══════════ ENGINE ══════════ */
function _mjax(el){
  setTimeout(function(){
    try{
      if(!window.MathJax) return;
      if(typeof MathJax.typesetPromise==='function') MathJax.typesetPromise([el]).catch(function(){});
      else if(typeof MathJax.typeset==='function') MathJax.typeset([el]);
    }catch(e){}
  },150);
}

function _norm(s){
  return String(s).trim().toLowerCase()
    .replace(/\s+/g,'')
    .replace(/²/g,'2').replace(/³/g,'3')
    .replace(/π/g,'pi').replace(/√/g,'sqrt')
    .replace(/[×·]/g,'*').replace(/÷/g,'/');
}

/* Picks the Arabic variant of a D[] field (e.g. cfg.ti_ar) when the current
   locale is 'ar' and that chapter has been given one, else falls back to the
   default (English) field — so reviewed chapters can carry real Arabic quiz
   content while every other chapter keeps working unchanged. */
function _loc(cfg,key){
  var loc=window.i18n?window.i18n.getLocale():'en';
  if(loc==='ar'&&cfg[key+'_ar']!=null)return cfg[key+'_ar'];
  return cfg[key];
}
var _IX_EN_FALLBACK={'ix.badge.qc':'Quick Check','ix.badge.sr':'Worked Example','ix.badge.mt':'Matching','ix.badge.fn':'Explorer','ix.tryAgain':'Try again',
  'ix.correct':'✓ Correct! ','ix.incorrect':'✗ Not quite. ','ix.head':'Interactive Practice',
  'ix.sr.showFirst':'Show first step ▸','ix.sr.showNext':'Show next step ▸ ({n}/{m})','ix.sr.restart':'↺ Restart',
  'ix.mt.allMatched':'🎉 All pairs matched!',
  'ix.badge.tf':'True / False','ix.tf.trueCorrect':'✓ True — ','ix.tf.falseCorrect':'✓ False — ','ix.tf.true':'True','ix.tf.false':'False',
  'ix.badge.sb':'Step Builder','ix.sb.hintPrefix':'Hint: ','ix.sb.checkAnswers':'Check Answers',
  'ix.sb.allCorrect':'✓ All {n} steps correct!','ix.sb.someCorrect':'{ok}/{total} correct. Hints: ','ix.sb.stepN':'Step {n}: '};
function _t(key,vars){
  if(window.i18n)return window.i18n.t(key,vars);
  var s=_IX_EN_FALLBACK[key]||key;
  if(vars)Object.keys(vars).forEach(function(k){s=s.replace('{'+k+'}',vars[k]);});
  return s;
}

function _buildQC(cfg,box){
  box.innerHTML='<span class="ix-badge qc">'+_t('ix.badge.qc')+'</span>';
  var h=document.createElement('h3');h.innerHTML=_loc(cfg,'ti');box.appendChild(h);
  var p=document.createElement('p');p.style.cssText='margin:.3rem 0 .65rem;font-size:.9rem';p.innerHTML=_loc(cfg,'q');box.appendChild(p);
  var od=document.createElement('div');od.className='ix-opts';
  var done=false;
  _loc(cfg,'o').forEach(function(opt,i){
    var b=document.createElement('button');b.className='ix-opt';b.innerHTML=opt;
    var optText=String(opt).replace(/<[^>]*>/g,'').trim();
    b.setAttribute('aria-label',optText||('Option '+(i+1)));
    b.addEventListener('click',function(){
      if(done)return;done=true;
      od.querySelectorAll('.ix-opt').forEach(function(btn,j){
        btn.disabled=true;
        if(j===cfg.a)btn.classList.add('correct');
        else if(j===i)btn.classList.add('wrong');
      });
      var fb=document.createElement('div');fb.className='ix-fb '+(i===cfg.a?'ok':'no');
      fb.innerHTML=(i===cfg.a?_t('ix.correct'):_t('ix.incorrect'))+_loc(cfg,'ex');
      box.appendChild(fb);
      var rb=document.createElement('button');rb.className='ix-again';rb.textContent=_t('ix.tryAgain');
      rb.addEventListener('click',function(){
        done=false;
        od.querySelectorAll('.ix-opt').forEach(function(b){b.disabled=false;b.classList.remove('correct','wrong');});
        fb.remove();rb.remove();
      });
      box.appendChild(rb);
      _mjax(box);
    });
    od.appendChild(b);
  });
  box.appendChild(od);
}

function _buildMT(cfg,box){
  box.innerHTML='<span class="ix-badge mt">'+_t('ix.badge.mt')+'</span>';
  var h=document.createElement('h3');h.innerHTML=_loc(cfg,'ti');box.appendChild(h);
  var cols=document.createElement('div');cols.className='ix-mt-cols';
  var lc=document.createElement('div');lc.className='ix-mt-col';
  var rc=document.createElement('div');rc.className='ix-mt-col';
  var matched=0,selL=null,selR=null;
  var pairs=_loc(cfg,'p');
  var rItems=pairs.map(function(p,i){return{h:p.r,i:i};});
  rItems.sort(function(){return Math.random()-.5;});
  pairs.forEach(function(p,i){
    var el=document.createElement('div');el.className='ix-mt-item';el.innerHTML=p.l;el.dataset.i=String(i);
    el.addEventListener('click',function(){
      if(el.classList.contains('ok'))return;
      if(selL)selL.classList.remove('sel');
      selL=el;el.classList.add('sel');_chkMT();
    });
    lc.appendChild(el);
  });
  rItems.forEach(function(item){
    var el=document.createElement('div');el.className='ix-mt-item';el.innerHTML=item.h;el.dataset.i=String(item.i);
    el.addEventListener('click',function(){
      if(el.classList.contains('ok'))return;
      if(selR)selR.classList.remove('sel');
      selR=el;el.classList.add('sel');_chkMT();
    });
    rc.appendChild(el);
  });
  function _chkMT(){
    if(!selL||!selR)return;
    var l=selL,r=selR;selL=null;selR=null;
    if(l.dataset.i===r.dataset.i){
      l.classList.remove('sel');l.classList.add('ok');
      r.classList.remove('sel');r.classList.add('ok');
      matched++;
      if(matched===pairs.length){
        var sc=document.createElement('div');sc.className='ix-mt-score';
        sc.textContent=_t('ix.mt.allMatched');box.appendChild(sc);
      }
    } else {
      l.classList.add('bad');r.classList.add('bad');
      setTimeout(function(){l.classList.remove('bad','sel');r.classList.remove('bad','sel');},500);
    }
  }
  cols.appendChild(lc);cols.appendChild(rc);box.appendChild(cols);
}

function _buildTF(cfg,box){
  box.innerHTML='<span class="ix-badge tf">'+_t('ix.badge.tf')+'</span>';
  var h=document.createElement('h3');h.innerHTML=_loc(cfg,'ti');box.appendChild(h);
  _loc(cfg,'items').forEach(function(item){
    var d=document.createElement('div');d.className='ix-tf-item';
    var st=document.createElement('div');st.className='ix-tf-stmt';st.innerHTML=item.s;
    var row=document.createElement('div');row.className='ix-tf-row';
    var ex=document.createElement('div');ex.className='ix-tf-exp';
    ex.innerHTML=(item.a?_t('ix.tf.trueCorrect'):_t('ix.tf.falseCorrect'))+item.ex;
    [_t('ix.tf.true'),_t('ix.tf.false')].forEach(function(label,idx){
      var btn=document.createElement('button');btn.className='ix-tf-btn';btn.textContent=label;
      var isT=(idx===0);
      btn.addEventListener('click',function(){
        if(d.querySelector('.ok,.no'))return;
        row.querySelectorAll('.ix-tf-btn').forEach(function(b){b.disabled=true;});
        var ok=(isT===item.a);
        btn.classList.add(ok?'ok':'no');
        if(!ok)row.querySelectorAll('.ix-tf-btn')[item.a?0:1].classList.add('ok');
        ex.classList.add('show');_mjax(ex);
      });
      row.appendChild(btn);
    });
    d.appendChild(st);d.appendChild(row);d.appendChild(ex);box.appendChild(d);
  });
}

function _buildSB(cfg,box){
  box.innerHTML='<span class="ix-badge sb">'+_t('ix.badge.sb')+'</span>';
  var h=document.createElement('h3');h.innerHTML=_loc(cfg,'ti');box.appendChild(h);
  var inps=[];
  _loc(cfg,'steps').forEach(function(step,i){
    var d=document.createElement('div');d.className='ix-sb-step';
    var n=document.createElement('div');n.className='ix-sb-n';n.textContent=(i+1)+'.';
    var body=document.createElement('div');body.className='ix-sb-body';body.innerHTML=step.l+' ';
    var inp=document.createElement('input');inp.className='ix-sb-inp';inp.type='text';
    inp.placeholder='?';inp.title=_t('ix.sb.hintPrefix')+step.h;
    inps.push({inp:inp,ans:step.a,hint:step.h});
    body.appendChild(inp);d.appendChild(n);d.appendChild(body);box.appendChild(d);
  });
  var go=document.createElement('button');go.className='ix-sb-go';go.textContent=_t('ix.sb.checkAnswers');
  var res=document.createElement('div');res.className='ix-sb-res';
  go.addEventListener('click',function(){
    var ok=0;
    inps.forEach(function(item){
      var u=_norm(item.inp.value),a=_norm(item.ans);
      if(u===a||u.replace(/[^a-z0-9]/g,'')===a.replace(/[^a-z0-9]/g,''))ok++;
    });
    res.className='ix-sb-res show '+(ok===inps.length?'ok':'no');
    if(ok===inps.length){
      res.innerHTML=_t('ix.sb.allCorrect',{n:inps.length});
    } else {
      var hints=inps.map(function(it,i){return '<small>'+_t('ix.sb.stepN',{n:i+1})+'<em>'+it.hint+'</em></small>';}).join(' &nbsp;|&nbsp; ');
      res.innerHTML=_t('ix.sb.someCorrect',{ok:ok,total:inps.length})+hints;
    }
    _mjax(res);
  });
  box.appendChild(go);box.appendChild(res);
}

function _buildSR(cfg,box){
  box.innerHTML='<span class="ix-badge sr">'+_t('ix.badge.sr')+'</span>';
  var h=document.createElement('h3');h.innerHTML=_loc(cfg,'ti');box.appendChild(h);
  var steps=document.createElement('div');steps.className='ix-sr-steps';box.appendChild(steps);
  var revealed=0;
  var stepsArr=_loc(cfg,'steps');
  var btn=document.createElement('button');btn.className='ix-sr-btn';btn.textContent=_t('ix.sr.showFirst');
  btn.addEventListener('click',function(){
    if(revealed<stepsArr.length){
      var i=revealed;
      var d=document.createElement('div');d.className='ix-sr-step';
      var n=document.createElement('div');n.className='ix-sr-n';n.textContent=String(i+1);
      var body=document.createElement('div');body.className='ix-sr-body';body.innerHTML=stepsArr[i];
      d.appendChild(n);d.appendChild(body);steps.appendChild(d);
      _mjax(d);
      revealed++;
      btn.textContent=revealed<stepsArr.length?_t('ix.sr.showNext',{n:revealed,m:stepsArr.length}):_t('ix.sr.restart');
    } else {
      steps.innerHTML='';revealed=0;btn.textContent=_t('ix.sr.showFirst');
    }
  });
  box.appendChild(btn);
}

/* ── Self-contained mini expression evaluator + plotter for the fn (Function
   Explorer) activity type. Deliberately independent of the site's main
   Plot/register/evalFn (those live inside a *different* top-level IIFE and
   aren't reachable from here) — keeps this new feature isolated so it can't
   regress the 58 existing canvas explorers. ── */
function _fnEval(expr,x,params){
  try{
    var e=String(expr);
    Object.keys(params||{}).forEach(function(k){
      e=e.replace(new RegExp('\\b'+k+'\\b','g'),'('+params[k]+')');
    });
    e=e.replace(/\^/g,'**')
      .replace(/sin\(/g,'Math.sin(').replace(/cos\(/g,'Math.cos(').replace(/tan\(/g,'Math.tan(')
      .replace(/sqrt\(/g,'Math.sqrt(').replace(/abs\(/g,'Math.abs(').replace(/ln\(/g,'Math.log(')
      .replace(/exp\(/g,'Math.exp(').replace(/\bpi\b/g,'Math.PI');
    /* eslint-disable no-new-func */
    return (new Function('x','return ('+e+')'))(x);
  }catch(err){return NaN;}
}
function _drawFnPlot(canvas,cfg,params){
  var dpr=window.devicePixelRatio||1, rect=canvas.getBoundingClientRect();
  if(rect.width<2||rect.height<2)return;
  canvas.width=Math.round(rect.width*dpr);canvas.height=Math.round(rect.height*dpr);
  var ctx=canvas.getContext('2d');ctx.setTransform(dpr,0,0,dpr,0,0);
  var w=rect.width,h=rect.height,pad={l:30,r:10,t:10,b:20};
  var xmin=cfg.xrange[0],xmax=cfg.xrange[1],ymin=cfg.yrange[0],ymax=cfg.yrange[1];
  function X(x){return pad.l+(x-xmin)/(xmax-xmin)*(w-pad.l-pad.r);}
  function Y(y){return h-pad.b-(y-ymin)/(ymax-ymin)*(h-pad.t-pad.b);}
  ctx.clearRect(0,0,w,h);
  ctx.strokeStyle='#D6DCE6';ctx.lineWidth=1;
  ctx.beginPath();ctx.moveTo(pad.l,Y(0));ctx.lineTo(w-pad.r,Y(0));ctx.stroke();
  ctx.beginPath();ctx.moveTo(X(0),pad.t);ctx.lineTo(X(0),h-pad.b);ctx.stroke();
  (cfg.fns||[]).forEach(function(fn){
    ctx.strokeStyle=fn.color||'#1E3A6E';ctx.lineWidth=2.4;ctx.beginPath();
    var started=false,steps=Math.max(60,Math.round(w-pad.l-pad.r));
    for(var i=0;i<=steps;i++){
      var xv=xmin+(i/steps)*(xmax-xmin);
      var yv=_fnEval(fn.expr,xv,params);
      if(!isFinite(yv)){started=false;continue;}
      var cx=X(xv),cy=Y(yv);
      if(cy<pad.t-60||cy>h-pad.b+60){started=false;continue;}
      if(!started){ctx.moveTo(cx,cy);started=true;}else{ctx.lineTo(cx,cy);}
    }
    ctx.stroke();
  });
}
function _buildFN(cfg,box){
  box.innerHTML='<span class="ix-badge fn">'+_t('ix.badge.fn')+'</span>';
  var h=document.createElement('h3');h.innerHTML=_loc(cfg,'ti');box.appendChild(h);
  var wrap=document.createElement('div');wrap.className='ix-fn-wrap';
  var canvas=document.createElement('canvas');canvas.className='ix-fn-canvas';
  wrap.appendChild(canvas);box.appendChild(wrap);
  var params={};
  if(cfg.params&&cfg.params.length){
    var controls=document.createElement('div');controls.className='ix-fn-controls';
    cfg.params.forEach(function(p){
      params[p.name]=p.default;
      var row=document.createElement('div');row.className='ix-fn-ctrl';
      var lab=document.createElement('label');lab.innerHTML=p.label+': <b class="ix-fn-val">'+p.default+'</b>';
      var slider=document.createElement('input');slider.type='range';
      slider.min=p.min;slider.max=p.max;slider.step=p.step||1;slider.value=p.default;
      slider.setAttribute('aria-label',String(p.label).replace(/<[^>]*>/g,'').trim()||'Value');
      slider.addEventListener('input',function(){
        params[p.name]=parseFloat(slider.value);
        lab.querySelector('.ix-fn-val').textContent=slider.value;
        redraw();
      });
      row.appendChild(lab);row.appendChild(slider);controls.appendChild(row);
    });
    box.appendChild(controls);
  }
  function redraw(){_drawFnPlot(canvas,cfg,params);}
  if(window.IntersectionObserver){
    var obs=new IntersectionObserver(function(entries){
      entries.forEach(function(e){if(e.isIntersecting)redraw();});
    },{threshold:0.05});
    obs.observe(canvas);
  } else {
    setTimeout(redraw,50);
  }
  var rt;window.addEventListener('resize',function(){clearTimeout(rt);rt=setTimeout(redraw,150);});
}

function _inject(chId){
  var cfg=D[chId];if(!cfg)return;
  var sec=document.getElementById(chId);if(!sec)return;
  var loc=window.i18n?window.i18n.getLocale():'en';
  var existing=sec.querySelector('.ix-section');
  if(existing){
    /* already built — rebuild only if the locale changed since (so a live
       toggle re-translates chrome + any reviewed-chapter Arabic content) */
    if(existing.getAttribute('data-ix-locale')===loc)return;
    existing.remove();
  }
  var list=Array.isArray(cfg)?cfg:[cfg]; /* D entries may be one config object (legacy) or an array of several */
  var wrap=document.createElement('div');wrap.className='ix-section';
  wrap.setAttribute('data-ix-locale',loc);
  var hd=document.createElement('div');hd.className='ix-head';
  hd.textContent='✦ '+_t('ix.head');
  wrap.appendChild(hd);
  list.forEach(function(c){
    var box=document.createElement('div');box.className='ix-box';
    if(c.t==='qc')_buildQC(c,box);
    else if(c.t==='mt')_buildMT(c,box);
    else if(c.t==='tf')_buildTF(c,box);
    else if(c.t==='sb')_buildSB(c,box);
    else if(c.t==='sr')_buildSR(c,box);
    else if(c.t==='fn')_buildFN(c,box);
    wrap.appendChild(box);
  });
  sec.appendChild(wrap);
  _mjax(wrap);setTimeout(function(){_mjax(wrap);},900);
}

/* Inject every chapter on this page that has data */
function _injectAll(){
  Object.keys(D).forEach(function(id){ _inject(id); });
}
/* Exposed so the i18n module (defined later, outside this IIFE) can trigger
   a re-translate of already-injected widgets when the user toggles locale. */
window.ClipSATIX={refreshAll:_injectAll};

/* Also inject via IntersectionObserver when chapters scroll into view */
var _observed=false;
function _observe(){
  if(_observed||!window.IntersectionObserver)return;
  _observed=true;
  var obs=new IntersectionObserver(function(entries){
    entries.forEach(function(e){if(e.isIntersecting)_inject(e.target.id);});
  },{rootMargin:'0px 0px 200px 0px',threshold:0.05});
  Object.keys(D).forEach(function(id){
    var el=document.getElementById(id);
    if(el)obs.observe(el);
  });
}

/* Inject once BOTH the track's data has arrived and the DOM has settled (the
   same 800ms-after-DOMContentLoaded point the inline data used to inject at). */
var _domReady=false,_hasData=false;
function _go(){ if(_domReady&&_hasData){ _injectAll(); _observe(); } }
function _register(fn){ fn(D); _hasData=true; _go(); }
/* Data files push a function onto window.__ixData; one that ran before this
   engine is queued, and later pushes register directly. */
var _queued=window.__ixData||[];
window.__ixData={push:_register};
_queued.forEach(_register);

function _loadTrackData(){
  var m=/(?:^|\s)track-([\w-]+)/.exec(document.body.className||'');
  if(!m||IX_TRACKS.indexOf(m[1])<0)return;
  var sc=document.createElement('script');
  sc.src='/js/ix/'+m[1]+'.js';
  sc.async=true;
  document.head.appendChild(sc);
}
function _onDomReady(){
  _loadTrackData();
  setTimeout(function(){_domReady=true;_go();},800);
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',_onDomReady);
else _onDomReady();

/* Hook into goChapter */
var _ogc=window.goChapter;
window.goChapter=function(chId,view){
  if(_ogc)_ogc.apply(this,arguments);
  setTimeout(function(){_inject(chId);},600);
};

})();

/* ─────────────────────────────────────────────── */

/* ══════════════════════════════════════════════════════
   MATH VOCABULARY — global underline + definition popup
   ══════════════════════════════════════════════════════ */
