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

function _tex(s){
  if(s == null) return s;
  if(typeof s !== 'string') return s;
  var out = s;
  if(out.indexOf('$') !== -1){
    out = out.replace(/\\\$/g, '\uE000');
    out = out.replace(/\$(?!\s)([^\$\n]+?)(?<!\s)\$/g, function(m, inner){
      if(/^\d[\d,]*(?:\.\d+)?(?:$|\s*[,.;:!?)%]|\s+[a-zA-Z\u0600-\u06FF]{2,})/.test(inner)) return m;
      var stripped = inner.replace(/\\(?:text|textbf|textit|mathrm|mathbf|operatorname|mbox)\s*\{[^}]*\}/g, '').replace(/\\[a-zA-Z]+/g, '');
      if(/[a-zA-Z]{3,}\s+[a-zA-Z]{2,}/.test(stripped) || /[\u0600-\u06FF]{2,}\s+[\u0600-\u06FF]{2,}/.test(stripped)) return m;
      return '\\(' + inner + '\\)';
    });
    out = out.replace(/\uE000/g, '$');
  }
  if(typeof window.CSAutoMath === 'function') out = window.CSAutoMath(out);
  else if(typeof window.CSFormatExplorerMath === 'function' && out.indexOf('\\(') === -1 && out.indexOf('\\[') === -1 && out.indexOf('katex') === -1){
    out = window.CSFormatExplorerMath(out, false);
  } else if(out.indexOf('\\(') === -1 && out.indexOf('\\[') === -1 && out.indexOf('\\') !== -1){
    out = '\\(' + out + '\\)';
  }
  return typeof window.CSRenderMathString === 'function' ? window.CSRenderMathString(out) : out;
}

/* Picks the Arabic variant of a D[] field (e.g. cfg.ti_ar) when the current
   locale is 'ar' and that chapter has been given one, else falls back to the
   default (English) field — so reviewed chapters can carry real Arabic quiz
   content while every other chapter keeps working unchanged. */
function _loc(cfg,key){
  var loc=window.i18n?window.i18n.getLocale():'en';
  var val=(loc==='ar'&&cfg[key+'_ar']!=null)?cfg[key+'_ar']:cfg[key];
  if(key==='a') return val;
  if(typeof val==='string') return _tex(val);
  if(Array.isArray(val)){
    return val.map(function(v){
      if(typeof v==='string') return _tex(v);
      if(v && typeof v==='object'){
        var copy=Object.assign({},v);
        if(typeof copy.s==='string') copy.s=_tex(copy.s);
        if(typeof copy.l==='string') copy.l=_tex(copy.l);
        if(typeof copy.r==='string') copy.r=_tex(copy.r);
        if(typeof copy.h==='string') copy.h=_tex(copy.h);
        if(typeof copy.label==='string') copy.label=_tex(copy.label);
        if(typeof copy.text==='string') copy.text=_tex(copy.text);
        if(typeof copy.ex==='string') copy.ex=_tex(copy.ex);
        return copy;
      }
      return v;
    });
  }
  return val;
}
var _IX_EN_FALLBACK={'ix.badge.qc':'Quick Check','ix.badge.sr':'Worked Example','ix.badge.mt':'Matching','ix.badge.fn':'Explorer','ix.tryAgain':'Try again',
  'ix.correct':'✓ Correct! ','ix.incorrect':'✗ Not quite. ','ix.head':'Interactive Practice',
  'ix.sr.showFirst':'Show first step ▸','ix.sr.showNext':'Show next step ▸ ({n}/{m})','ix.sr.restart':'↺ Restart','ix.sr.showAll':'Reveal all steps',
  'ix.sr.predictPrompt':'Think: what is the next step?',
  'ix.mt.allMatched':'🎉 All pairs matched!',
  'ix.badge.tf':'True / False','ix.tf.trueCorrect':'✓ True — ','ix.tf.falseCorrect':'✓ False — ','ix.tf.true':'True','ix.tf.false':'False',
  'ix.badge.sb':'Step Builder','ix.sb.hintPrefix':'Hint: ','ix.sb.checkAnswers':'Check Answers','ix.sb.showAnswers':'Show answers',
  'ix.sb.allCorrect':'✓ All {n} steps correct!','ix.sb.someCorrect':'{ok}/{total} correct. Hints: ','ix.sb.stepN':'Step {n}: ',
  'ix.badge.num':'Numeric Entry','ix.num.check':'Check Answer','ix.num.showSol':'Show Solution','ix.num.hintPrefix':'Hint: ','ix.num.correct':'✓ Correct!','ix.num.incorrect':'✗ Incorrect. ','ix.num.close':'Almost! Check precision or rounding. ',
  'ix.badge.ord':'Order the Steps','ix.ord.check':'Check Order','ix.ord.allCorrect':'✓ Steps are in the correct sequence!','ix.ord.someCorrect':'{n} of {total} steps in the correct position.','ix.ord.showCorrect':'Show Correct Order','ix.ord.moveUp':'Move Up','ix.ord.moveDown':'Move Down',
  'ix.badge.cat':'Categorize','ix.cat.check':'Check Categories','ix.cat.allCorrect':'✓ All items correctly categorized!','ix.cat.someCorrect':'{n} of {total} items correctly placed.','ix.cat.showCorrect':'Show Correct Placement',
  'ix.mp.toggle':'Math Keyboard','ix.mp.hide':'Hide Keyboard',
  'ix.mp.tab123':'123 & Algebra','ix.mp.tabFunc':'Functions & Trig','ix.mp.tabSym':'Symbols & Calculus',
  'ix.mp.preview':'Math Preview:','ix.mp.previewEmpty':'Type or tap keys below',
  'ix.mp.check':'Check','ix.mp.clear':'Clear','ix.mp.backspace':'Backspace',
  'ix.mp.left':'Move left','ix.mp.right':'Move right','ix.mp.close':'Close keyboard',
  'ix.badge.gp':'Graph Plotter','ix.gp.check':'Check Points','ix.gp.clear':'Clear Points','ix.gp.showSol':'Show Target Points',
  'ix.gp.allCorrect':'✓ All key features accurately plotted!','ix.gp.someCorrect':'{n} of {total} features placed correctly.',
  'ix.gp.hint':'Tap or click on the grid to plot points. Click an existing point to remove it.',
  'ix.badge.se':'Spot the Error','ix.se.check':'Check Step','ix.se.showSol':'Reveal Flaw & Solution','ix.se.stepN':'Step {n}: ',
  'ix.se.noError':'✓ No Error: The solution is mathematically sound',
  'ix.se.correctFlaw':'✓ Correct! You spotted the flaw in Step {n}.',
  'ix.se.incorrect':'✗ Not quite. The selected step is valid. Check again!',
  'ix.se.whyPrompt':'Why is this step invalid?',
  'ix.badge.ms':'Examiner Mode','ix.ms.openRubric':'📋 Open Official Mark Scheme & Rubric','ix.ms.hideRubric':'Hide Mark Scheme',
  'ix.ms.totalMarks':'Total: {n} marks','ix.ms.score':'Earned: {earned} / {total} marks ({pct}%)','ix.ms.grade':'Projected: {grade}',
  'ix.ms.examinerTip':'💡 Examiner Report & Common Mistakes:'};
function _t(key,vars){
  if(window.i18n){
    var r=window.i18n.t(key,vars);
    if(r && r!==key) return r;
  }
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

  var rawOpts=_loc(cfg,'o')||[];
  var optItems=rawOpts.map(function(opt,idx){return {text:opt,origIdx:idx};});
  /* Shuffle options so answer position varies predictably across interactions */
  for(var s=optItems.length-1;s>0;s--){
    var r=Math.floor(Math.random()*(s+1));
    var tmp=optItems[s];optItems[s]=optItems[r];optItems[r]=tmp;
  }

  optItems.forEach(function(item,displayIdx){
    var b=document.createElement('button');b.type='button';b.className='ix-opt';b.innerHTML=item.text;
    var optText=String(item.text).replace(/<[^>]*>/g,'').trim();
    b.setAttribute('aria-label',optText||('Option '+(displayIdx+1)));
    b.addEventListener('click',function(){
      if(done)return;done=true;
      od.querySelectorAll('.ix-opt').forEach(function(btn,j){
        btn.disabled=true;
        if(optItems[j].origIdx===cfg.a)btn.classList.add('correct');
        else if(j===displayIdx)btn.classList.add('wrong');
      });
      var isCorrect=(item.origIdx===cfg.a);
      var fb=document.createElement('div');fb.className='ix-fb '+(isCorrect?'ok':'no');
      fb.setAttribute('role','status');fb.setAttribute('aria-live','polite');
      var whyText=(cfg.why&&cfg.why[item.origIdx])?('<em>'+_tex(cfg.why[item.origIdx])+'</em><br>'):'';
      fb.innerHTML=(isCorrect?_t('ix.correct'):_t('ix.incorrect'))+whyText+_loc(cfg,'ex');
      box.appendChild(fb);
      var rb=document.createElement('button');rb.type='button';rb.className='ix-again';rb.textContent=_t('ix.tryAgain');
      rb.addEventListener('click',function(){
        done=false;
        od.querySelectorAll('.ix-opt').forEach(function(btn){btn.disabled=false;btn.classList.remove('correct','wrong');});
        fb.remove();rb.remove();
        var firstBtn=od.querySelector('.ix-opt');if(firstBtn)firstBtn.focus();
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
  var pairs=_loc(cfg,'p')||[];
  var rItems=pairs.map(function(p,i){return{h:p.r,i:i};});
  rItems.sort(function(){return Math.random()-.5;});

  var liveRegion=document.createElement('div');
  liveRegion.className='sr-only';
  liveRegion.setAttribute('role','status');
  liveRegion.setAttribute('aria-live','polite');
  box.appendChild(liveRegion);

  pairs.forEach(function(p,i){
    var el=document.createElement('button');
    el.type='button';el.className='ix-mt-item';el.innerHTML=p.l;el.dataset.i=String(i);
    el.setAttribute('aria-pressed','false');
    var plain=String(p.l).replace(/<[^>]*>/g,'').trim();
    el.setAttribute('aria-label',plain||('Item '+(i+1)));
    el.addEventListener('click',function(){
      if(el.classList.contains('ok'))return;
      if(selL===el){
        selL.classList.remove('sel');selL.setAttribute('aria-pressed','false');selL=null;
        return;
      }
      if(selL){selL.classList.remove('sel');selL.setAttribute('aria-pressed','false');}
      selL=el;el.classList.add('sel');el.setAttribute('aria-pressed','true');_chkMT();
    });
    lc.appendChild(el);
  });
  rItems.forEach(function(item,idx){
    var el=document.createElement('button');
    el.type='button';el.className='ix-mt-item';el.innerHTML=item.h;el.dataset.i=String(item.i);
    el.setAttribute('aria-pressed','false');
    var plain=String(item.h).replace(/<[^>]*>/g,'').trim();
    el.setAttribute('aria-label',plain||('Match '+(idx+1)));
    el.addEventListener('click',function(){
      if(el.classList.contains('ok'))return;
      if(selR===el){
        selR.classList.remove('sel');selR.setAttribute('aria-pressed','false');selR=null;
        return;
      }
      if(selR){selR.classList.remove('sel');selR.setAttribute('aria-pressed','false');}
      selR=el;el.classList.add('sel');el.setAttribute('aria-pressed','true');_chkMT();
    });
    rc.appendChild(el);
  });
  function _chkMT(){
    if(!selL||!selR)return;
    var l=selL,r=selR;selL=null;selR=null;
    if(l.dataset.i===r.dataset.i){
      l.classList.remove('sel');l.classList.add('ok');l.disabled=true;l.setAttribute('aria-pressed','false');
      r.classList.remove('sel');r.classList.add('ok');r.disabled=true;r.setAttribute('aria-pressed','false');
      matched++;
      liveRegion.textContent='Match correct ('+matched+'/'+pairs.length+')';
      if(matched===pairs.length){
        var sc=document.createElement('div');sc.className='ix-mt-score';
        sc.setAttribute('role','status');sc.setAttribute('aria-live','polite');
        sc.textContent=_t('ix.mt.allMatched');box.appendChild(sc);
      }
    } else {
      l.classList.add('bad');r.classList.add('bad');
      liveRegion.textContent='Not a match, try again.';
      setTimeout(function(){
        l.classList.remove('bad','sel');l.setAttribute('aria-pressed','false');
        r.classList.remove('bad','sel');r.setAttribute('aria-pressed','false');
      },500);
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
    ex.setAttribute('role','status');ex.setAttribute('aria-live','polite');
    ex.innerHTML=(item.a?_t('ix.tf.trueCorrect'):_t('ix.tf.falseCorrect'))+item.ex;
    var plainStmt=String(item.s).replace(/<[^>]*>/g,'').trim();
    [_t('ix.tf.true'),_t('ix.tf.false')].forEach(function(label,idx){
      var btn=document.createElement('button');btn.type='button';btn.className='ix-tf-btn';btn.textContent=label;
      btn.setAttribute('aria-label',label+': '+plainStmt);
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

function _toLatexPreview(s){
  if(!s)return '';
  var str=String(s).trim();
  for(var k=0;k<4;k++){
    var prev=str;
    str=str.replace(/\(([^()]+)\)\s*\/\s*\(([^()]+)\)/g,'\\frac{$1}{$2}');
    str=str.replace(/\(([^()]+)\)\s*\/\s*([a-zA-Z0-9.]+)/g,'\\frac{$1}{$2}');
    str=str.replace(/([a-zA-Z0-9.]+)\s*\/\s*\(([^()]+)\)/g,'\\frac{$1}{$2}');
    str=str.replace(/\b([a-zA-Z0-9.]+)\s*\/\s*([a-zA-Z0-9.]+)\b/g,'\\frac{$1}{$2}');
    if(str===prev)break;
  }
  str=str.replace(/\bsqrt\(([^()]+)\)/g,'\\sqrt{$1}')
         .replace(/\bcbrt\(([^()]+)\)/g,'\\sqrt[3]{$1}')
         .replace(/\babs\(([^()]+)\)/g,'|$1|')
         .replace(/\bpi\b/g,'\\pi')
         .replace(/\btheta\b/g,'\\theta')
         .replace(/\balpha\b/g,'\\alpha')
         .replace(/\bbeta\b/g,'\\beta')
         .replace(/\blambda\b/g,'\\lambda')
         .replace(/\bmu\b/g,'\\mu')
         .replace(/\bsigma\b/g,'\\sigma')
         .replace(/<=/g,'\\le ')
         .replace(/>=/g,'\\ge ')
         .replace(/!=/g,'\\ne ')
         .replace(/(\+-|±)/g,'\\pm ')
         .replace(/\binf(ty)?\b/g,'\\infty')
         .replace(/\bin\b/g,'\\in ')
         .replace(/\bnotin\b/g,'\\notin ')
         .replace(/\bintersect\b/g,'\\cap ')
         .replace(/\bempty\b/g,'\\emptyset')
         .replace(/\*/g,' \\cdot ')
         .replace(/\b(sin|cos|tan|sec|csc|cot|ln|log|arcsin|arccos|arctan)\b/g,'\\$1 ')
         .replace(/\^([0-9a-zA-Z]+)/g,'^{$1}')
         .replace(/\^\(([^()]+)\)/g,'^{$1}');
  return str;
}

function _attachMathPalette(container, getTargetInp, opts){
  opts=opts||{};
  var pal=document.createElement('div');pal.className='ix-math-palette';
  pal.setAttribute('role','region');pal.setAttribute('aria-label',_t('ix.mp.toggle'));

  var toggleRow=document.createElement('div');toggleRow.className='ix-mp-toggle-row';
  var toggleBtn=document.createElement('button');toggleBtn.type='button';toggleBtn.className='ix-mp-toggle-btn';
  toggleBtn.innerHTML='<span class="ix-mp-icon">⌨️</span> <span>'+_t('ix.mp.toggle')+'</span>';
  toggleBtn.setAttribute('aria-expanded','false');
  toggleRow.appendChild(toggleBtn);
  pal.appendChild(toggleRow);

  var body=document.createElement('div');body.className='ix-mp-body';body.style.display='none';

  // 1. Header with Tab Switcher & Close button
  var header=document.createElement('div');header.className='ix-mp-header';
  var tabsWrap=document.createElement('div');tabsWrap.className='ix-mp-tabs';

  var tabDefs=[
    {id:'123',label:_t('ix.mp.tab123')},
    {id:'func',label:_t('ix.mp.tabFunc')},
    {id:'sym',label:_t('ix.mp.tabSym')}
  ];
  var tabBtns={};
  var tabGrids={};
  var curTab='123';

  tabDefs.forEach(function(td,idx){
    var tb=document.createElement('button');tb.type='button';
    tb.className='ix-mp-tab-btn'+(idx===0?' active':'');
    tb.textContent=td.label;
    tb.setAttribute('aria-selected',idx===0?'true':'false');
    tb.addEventListener('click',function(e){
      e.preventDefault();
      switchTab(td.id);
    });
    tabBtns[td.id]=tb;
    tabsWrap.appendChild(tb);
  });

  var closeBtn=document.createElement('button');closeBtn.type='button';closeBtn.className='ix-mp-close-btn';
  closeBtn.textContent='✕';closeBtn.title=_t('ix.mp.close');closeBtn.setAttribute('aria-label',_t('ix.mp.close'));
  closeBtn.addEventListener('click',function(e){
    e.preventDefault();
    closeKeypad();
  });

  header.appendChild(tabsWrap);header.appendChild(closeBtn);
  body.appendChild(header);

  // 2. Real-time Math Preview Bar
  var prevBar=document.createElement('div');prevBar.className='ix-mp-preview-bar';
  var prevLbl=document.createElement('span');prevLbl.className='ix-mp-preview-lbl';prevLbl.textContent=_t('ix.mp.preview');
  var prevCnt=document.createElement('span');prevCnt.className='ix-mp-preview-cnt';
  prevCnt.innerHTML='<span class="ix-mp-ph">'+_t('ix.mp.previewEmpty')+'</span>';
  prevBar.appendChild(prevLbl);prevBar.appendChild(prevCnt);
  body.appendChild(prevBar);

  function updatePreview(val){
    if(!prevCnt)return;
    var raw=String(val==null?'':val).trim();
    if(!raw){
      prevCnt.innerHTML='<span class="ix-mp-ph">'+_t('ix.mp.previewEmpty')+'</span>';
      return;
    }
    var tex=_toLatexPreview(raw);
    if(window.katex&&typeof window.katex.renderToString==='function'){
      try{
        prevCnt.innerHTML=window.katex.renderToString(tex,{throwOnError:false,displayMode:false});
        return;
      }catch(e){}
    }
    prevCnt.textContent=raw;
  }

  // 3. Tab Panels with Keypad Grids
  var panels=document.createElement('div');panels.className='ix-mp-panels';

  var tabKeys={
    '123':[
      {l:'x²',ins:'^2',wrap:'^2',t:'Square (x²)'},
      {l:'xⁿ',ins:'^',t:'Power (xⁿ)'},
      {l:'√x',ins:'sqrt()',wrap:'sqrt',off:-1,t:'Square root (√)'},
      {l:'a/b',ins:'()/()',wrap:'frac',off:-4,t:'Fraction (a/b)'},
      {l:'( )',ins:'()',wrap:'paren',off:-1,t:'Parentheses'},
      {l:'|x|',ins:'abs()',wrap:'abs',off:-1,t:'Absolute value'},
      {l:'π',ins:'π',t:'Pi (π)'},

      {l:'7',ins:'7',t:'7'},
      {l:'8',ins:'8',t:'8'},
      {l:'9',ins:'9',t:'9'},
      {l:'÷',ins:'/',t:'Divide (÷)'},
      {l:'x',ins:'x',t:'Variable x'},
      {l:'y',ins:'y',t:'Variable y'},
      {l:'e',ins:'e',t:"Euler's number e"},

      {l:'4',ins:'4',t:'4'},
      {l:'5',ins:'5',t:'5'},
      {l:'6',ins:'6',t:'6'},
      {l:'×',ins:'*',t:'Multiply (×)'},
      {l:'n',ins:'n',t:'Variable n'},
      {l:'t',ins:'t',t:'Variable t'},
      {l:'θ',ins:'θ',t:'Theta (θ)'},

      {l:'1',ins:'1',t:'1'},
      {l:'2',ins:'2',t:'2'},
      {l:'3',ins:'3',t:'3'},
      {l:'−',ins:'-',t:'Minus (−)'},
      {l:'+',ins:'+',t:'Plus (+)'},
      {l:'=',ins:'=',t:'Equals (=)'},
      {l:'±',ins:'±',t:'Plus or minus (±)'},

      {l:'0',ins:'0',t:'0'},
      {l:'.',ins:'.',t:'Decimal point (.)'},
      {l:'◄',act:'left',t:_t('ix.mp.left')},
      {l:'►',act:'right',t:_t('ix.mp.right')},
      {l:'⌫',act:'backspace',t:_t('ix.mp.backspace')},
      {l:'C',act:'clear',t:_t('ix.mp.clear')}
    ],
    'func':[
      {l:'sin',ins:'sin()',wrap:'func',off:-1,t:'Sine'},
      {l:'cos',ins:'cos()',wrap:'func',off:-1,t:'Cosine'},
      {l:'tan',ins:'tan()',wrap:'func',off:-1,t:'Tangent'},
      {l:'sin⁻¹',ins:'arcsin()',wrap:'func',off:-1,t:'Arcsine (sin⁻¹)'},
      {l:'cos⁻¹',ins:'arccos()',wrap:'func',off:-1,t:'Arccosine (cos⁻¹)'},
      {l:'tan⁻¹',ins:'arctan()',wrap:'func',off:-1,t:'Arctangent (tan⁻¹)'},
      {l:'sec',ins:'sec()',wrap:'func',off:-1,t:'Secant (sec)'},

      {l:'csc',ins:'csc()',wrap:'func',off:-1,t:'Cosecant (csc)'},
      {l:'cot',ins:'cot()',wrap:'func',off:-1,t:'Cotangent (cot)'},
      {l:'ln',ins:'ln()',wrap:'func',off:-1,t:'Natural log (ln)'},
      {l:'log',ins:'log()',wrap:'func',off:-1,t:'Log base 10'},
      {l:'eˣ',ins:'e^',t:'Exponential (eˣ)'},
      {l:'10ˣ',ins:'10^',t:'Power of 10 (10ˣ)'},
      {l:'∛x',ins:'cbrt()',wrap:'func',off:-1,t:'Cube root (∛)'},

      {l:'θ',ins:'θ',t:'Theta (θ)'},
      {l:'α',ins:'α',t:'Alpha (α)'},
      {l:'β',ins:'β',t:'Beta (β)'},
      {l:'λ',ins:'λ',t:'Lambda (λ)'},
      {l:'μ',ins:'μ',t:'Mu (μ)'},
      {l:'σ',ins:'σ',t:'Sigma (σ)'},
      {l:'n!',ins:'!',t:'Factorial (n!)'},

      {l:'◄',act:'left',t:_t('ix.mp.left')},
      {l:'►',act:'right',t:_t('ix.mp.right')},
      {l:'⌫',act:'backspace',t:_t('ix.mp.backspace')},
      {l:'C',act:'clear',t:_t('ix.mp.clear')}
    ],
    'sym':[
      {l:'<',ins:'<',t:'Less than (<)'},
      {l:'>',ins:'>',t:'Greater than (>)'},
      {l:'≤',ins:'<=',t:'Less than or equal (≤)'},
      {l:'≥',ins:'>=',t:'Greater than or equal (≥)'},
      {l:'≠',ins:'!=',t:'Not equal (≠)'},
      {l:'≈',ins:'≈',t:'Approximately equal (≈)'},
      {l:'±',ins:'±',t:'Plus or minus (±)'},

      {l:'∞',ins:'inf',t:'Infinity (∞)'},
      {l:'∈',ins:' in ',t:'Element of (∈)'},
      {l:'∉',ins:' notin ',t:'Not element of (∉)'},
      {l:'∪',ins:' U ',t:'Union (∪)'},
      {l:'∩',ins:' intersect ',t:'Intersection (∩)'},
      {l:'∅',ins:'empty',t:'Empty set (∅)'},
      {l:'%',ins:'%',t:'Percent (%)'},

      {l:'d/dx',ins:'d/dx ',t:'Derivative (d/dx)'},
      {l:'∫',ins:'int ',t:'Integral (∫)'},
      {l:'lim',ins:'lim ',t:'Limit (lim)'},
      {l:'∑',ins:'sum ',t:'Summation (∑)'},
      {l:'[',ins:'[',t:'Left bracket ['},
      {l:']',ins:']',t:'Right bracket ]'},
      {l:',',ins:', ',t:'Comma (,)'},

      {l:'◄',act:'left',t:_t('ix.mp.left')},
      {l:'►',act:'right',t:_t('ix.mp.right')},
      {l:'⌫',act:'backspace',t:_t('ix.mp.backspace')},
      {l:'C',act:'clear',t:_t('ix.mp.clear')}
    ]
  };

  Object.keys(tabKeys).forEach(function(tId){
    var g=document.createElement('div');g.className='ix-mp-grid';
    if(tId!=='123')g.style.display='none';
    tabKeys[tId].forEach(function(k){
      var btn=document.createElement('button');btn.type='button';
      var isAct=(k.act==='backspace'||k.act==='clear');
      var isNav=(k.act==='left'||k.act==='right');
      btn.className='ix-mp-key'+(isAct?' ix-mp-act':(isNav?' ix-mp-nav':''));
      btn.textContent=k.l;btn.title=k.t;btn.setAttribute('aria-label',k.t);
      btn.addEventListener('mousedown',function(e){
        e.preventDefault();
        handleKey(k);
      });
      g.appendChild(btn);
    });
    tabGrids[tId]=g;
    panels.appendChild(g);
  });
  body.appendChild(panels);

  // 4. Footer with Check button
  var footer=document.createElement('div');footer.className='ix-mp-footer';
  if(typeof opts.onCheck==='function'){
    var checkBtn=document.createElement('button');checkBtn.type='button';
    checkBtn.className='ix-mp-check-btn';
    checkBtn.innerHTML='✓ '+_t('ix.mp.check');
    checkBtn.addEventListener('click',function(e){
      e.preventDefault();
      opts.onCheck();
    });
    footer.appendChild(checkBtn);
  }
  body.appendChild(footer);
  pal.appendChild(body);

  function switchTab(newTab){
    curTab=newTab;
    Object.keys(tabBtns).forEach(function(id){
      var isActive=(id===curTab);
      tabBtns[id].classList.toggle('active',isActive);
      tabBtns[id].setAttribute('aria-selected',isActive?'true':'false');
      if(tabGrids[id])tabGrids[id].style.display=isActive?'grid':'none';
    });
  }

  function handleKey(k){
    var target=typeof getTargetInp==='function'?getTargetInp():getTargetInp;
    if(!target)return;

    var val=target.value||'';
    var start=Math.min(val.length,Math.max(0,(target.selectionStart!=null)?target.selectionStart:val.length));
    var end=Math.min(val.length,Math.max(0,(target.selectionEnd!=null)?target.selectionEnd:val.length));
    var selected=val.substring(start,end);

    if(k.act==='clear'){
      target.value='';
      if(target.setSelectionRange)target.setSelectionRange(0,0);
      target.dispatchEvent(new Event('input',{bubbles:true}));
      target.dispatchEvent(new Event('change',{bubbles:true}));
      target.focus();
      updatePreview('');
      return;
    }

    if(k.act==='backspace'){
      if(start===end&&start>0){
        target.value=val.substring(0,start-1)+val.substring(start);
        target.setSelectionRange(start-1,start-1);
      }else if(start!==end){
        target.value=val.substring(0,start)+val.substring(end);
        target.setSelectionRange(start,start);
      }
      target.dispatchEvent(new Event('input',{bubbles:true}));
      target.dispatchEvent(new Event('change',{bubbles:true}));
      target.focus();
      updatePreview(target.value);
      return;
    }

    if(k.act==='left'){
      var newPos=Math.max(0,start-1);
      target.focus();
      target.setSelectionRange(newPos,newPos);
      return;
    }

    if(k.act==='right'){
      var newPos=Math.min(val.length,end+1);
      target.focus();
      target.setSelectionRange(newPos,newPos);
      return;
    }

    if(selected.length>0&&k.wrap){
      var repl='';
      var newCursor=start;
      if(k.wrap==='frac'){
        repl='('+selected+')/()';
        newCursor=start+repl.length-1;
      }else if(k.wrap==='sqrt'){
        repl='sqrt('+selected+')';
        newCursor=start+repl.length;
      }else if(k.wrap==='paren'){
        repl='('+selected+')';
        newCursor=start+repl.length;
      }else if(k.wrap==='abs'){
        repl='abs('+selected+')';
        newCursor=start+repl.length;
      }else if(k.wrap==='^2'){
        repl='('+selected+')^2';
        newCursor=start+repl.length;
      }else if(k.wrap==='func'){
        repl=k.ins.replace('()','('+selected+')');
        newCursor=start+repl.length;
      }else{
        repl=k.ins;
        newCursor=start+repl.length+(k.off||0);
      }
      target.value=val.substring(0,start)+repl+val.substring(end);
      if(target.setSelectionRange){
        target.focus();
        target.setSelectionRange(newCursor,newCursor);
      }
    }else{
      target.value=val.substring(0,start)+k.ins+val.substring(end);
      var newCursor=start+k.ins.length+(k.off||0);
      if(target.setSelectionRange){
        target.focus();
        target.setSelectionRange(newCursor,newCursor);
      }
    }

    target.dispatchEvent(new Event('input',{bubbles:true}));
    target.dispatchEvent(new Event('change',{bubbles:true}));
    updatePreview(target.value);
  }

  function openKeypad(){
    body.style.display='block';
    pal.classList.add('open');
    toggleBtn.setAttribute('aria-expanded','true');
    var labelEl=toggleBtn.querySelector('span:last-child');
    if(labelEl)labelEl.textContent=_t('ix.mp.hide');
    var target=typeof getTargetInp==='function'?getTargetInp():getTargetInp;
    if(target)updatePreview(target.value);
  }

  function closeKeypad(){
    body.style.display='none';
    pal.classList.remove('open');
    toggleBtn.setAttribute('aria-expanded','false');
    var labelEl=toggleBtn.querySelector('span:last-child');
    if(labelEl)labelEl.textContent=_t('ix.mp.toggle');
  }

  toggleBtn.addEventListener('click',function(e){
    e.preventDefault();
    if(body.style.display==='none')openKeypad();
    else closeKeypad();
  });

  // Sync preview when student types manually into input
  container.addEventListener('input',function(e){
    if(e.target&&(e.target.tagName==='INPUT'||e.target.tagName==='TEXTAREA')){
      updatePreview(e.target.value);
    }
  });

  pal.updatePreview=updatePreview;
  pal.open=openKeypad;
  pal.close=closeKeypad;
  pal.switchTab=switchTab;

  container.appendChild(pal);
  return pal;
}
window.ClipSATMathPalette=_attachMathPalette;
window.ClipSATVirtualKeypad=_attachMathPalette;

function _buildSB(cfg,box){
  box.innerHTML='<span class="ix-badge sb">'+_t('ix.badge.sb')+'</span>';
  var h=document.createElement('h3');h.innerHTML=_loc(cfg,'ti');box.appendChild(h);
  var inps=[];
  var activeInp=null;
  var attempts=0;
  var go=document.createElement('button');go.type='button';go.className='ix-sb-go';go.textContent=_t('ix.sb.checkAnswers');
  var revealBtn=document.createElement('button');revealBtn.type='button';revealBtn.className='ix-sb-show-ans';revealBtn.textContent=_t('ix.sb.showAnswers');
  revealBtn.style.display='none';

  _loc(cfg,'steps').forEach(function(step,i){
    var d=document.createElement('div');d.className='ix-sb-step';
    var n=document.createElement('div');n.className='ix-sb-n';n.textContent=(i+1)+'.';
    var body=document.createElement('div');body.className='ix-sb-body';
    var labelSpan=document.createElement('span');labelSpan.innerHTML=step.l+' ';
    var inp=document.createElement('input');inp.className='ix-sb-inp';inp.type='text';
    inp.placeholder='?';
    var plainLabel=String(step.l).replace(/<[^>]*>/g,'').trim();
    inp.setAttribute('aria-label',plainLabel||('Step '+(i+1)));
    inp.title=_t('ix.sb.hintPrefix')+step.h;
    inp.addEventListener('keydown',function(e){if(e.key==='Enter')go.click();});
    inp.addEventListener('focus',function(){activeInp=inp;});

    var statusIcon=document.createElement('span');statusIcon.className='ix-sb-status';
    statusIcon.setAttribute('aria-hidden','true');

    var hintBox=document.createElement('div');hintBox.className='ix-sb-hint-box';
    hintBox.style.display='none';
    hintBox.innerHTML='<em>'+_t('ix.sb.hintPrefix')+step.h+'</em>';

    inps.push({stepEl:d,inp:inp,ans:step.a,hint:step.h,statusIcon:statusIcon,hintBox:hintBox});
    body.appendChild(labelSpan);body.appendChild(inp);body.appendChild(hintBox);
    d.appendChild(n);d.appendChild(body);d.appendChild(statusIcon);
    box.appendChild(d);
  });

  var res=document.createElement('div');res.className='ix-sb-res';
  res.setAttribute('role','status');res.setAttribute('aria-live','polite');

  revealBtn.addEventListener('click',function(){
    inps.forEach(function(item){
      item.inp.value=item.ans;
      item.stepEl.classList.remove('bad');
      item.stepEl.classList.add('ok');
      item.statusIcon.className='ix-sb-status ok';
      item.statusIcon.textContent='✓';
      item.hintBox.style.display='none';
    });
    res.className='ix-sb-res show ok';
    res.innerHTML=_t('ix.sb.allCorrect',{n:inps.length});
    revealBtn.style.display='none';
    _mjax(box);
  });

  go.addEventListener('click',function(){
    var ok=0;
    attempts++;
    inps.forEach(function(item){
      /* Plan 10: stripping symbols accepted 2x-1 for 2x+1, -3 for 3, x<5 for x>5 (19a-ix-answer-check.js) */
      var isStepOk=window.ClipSATAnswerCheck?ClipSATAnswerCheck.equivalent(item.inp.value,item.ans):_norm(item.inp.value)===_norm(item.ans);
      item.stepEl.classList.remove('ok','bad');
      item.statusIcon.classList.remove('ok','bad');
      if(isStepOk){
        ok++;
        item.stepEl.classList.add('ok');
        item.statusIcon.classList.add('ok');
        item.statusIcon.textContent='✓';
        item.hintBox.style.display='none';
      } else {
        item.stepEl.classList.add('bad');
        item.statusIcon.classList.add('bad');
        item.statusIcon.textContent='✗';
        item.hintBox.style.display='block';
        _mjax(item.hintBox);
      }
    });

    res.className='ix-sb-res show '+(ok===inps.length?'ok':'no');
    if(ok===inps.length){
      res.innerHTML=_t('ix.sb.allCorrect',{n:inps.length});
      revealBtn.style.display='none';
    } else {
      var hints=inps.map(function(it,i){return '<small>'+_t('ix.sb.stepN',{n:i+1})+'<em>'+it.hint+'</em></small>';}).join(' &nbsp;|&nbsp; ');
      res.innerHTML=_t('ix.sb.someCorrect',{ok:ok,total:inps.length})+hints;
      if(attempts>=2){
        revealBtn.style.display='inline-block';
      }
    }
    _mjax(res);
  });

  _attachMathPalette(box,function(){return activeInp||(inps[0]&&inps[0].inp);},{
    onCheck:function(){go.click();}
  });

  var btnRow=document.createElement('div');btnRow.style.cssText='display:flex;gap:.5rem;align-items:center;flex-wrap:wrap;';
  btnRow.appendChild(go);btnRow.appendChild(revealBtn);
  box.appendChild(btnRow);box.appendChild(res);
}

function _buildSR(cfg,box){
  box.innerHTML='<span class="ix-badge sr">'+_t('ix.badge.sr')+'</span>';
  var h=document.createElement('h3');h.innerHTML=_loc(cfg,'ti');box.appendChild(h);
  var steps=document.createElement('div');steps.className='ix-sr-steps';
  steps.setAttribute('aria-live','polite');
  box.appendChild(steps);
  var revealed=0;
  var stepsArr=_loc(cfg,'steps')||[];

  var prompt=document.createElement('div');
  prompt.className='ix-sr-prompt';
  prompt.textContent='💡 ' + _t('ix.sr.predictPrompt');
  box.appendChild(prompt);

  var btnRow=document.createElement('div');btnRow.style.cssText='display:flex;gap:.5rem;align-items:center;flex-wrap:wrap;';
  var btn=document.createElement('button');btn.type='button';btn.className='ix-sr-btn';btn.textContent=_t('ix.sr.showFirst');
  var allBtn=document.createElement('button');allBtn.type='button';allBtn.className='ix-sr-all-btn';allBtn.textContent=_t('ix.sr.showAll');

  function renderStep(idx){
    var d=document.createElement('div');d.className='ix-sr-step';
    var n=document.createElement('div');n.className='ix-sr-n';n.textContent=String(idx+1);
    var body=document.createElement('div');body.className='ix-sr-body';body.style.flex='1';body.innerHTML=stepsArr[idx];
    var vBtn=document.createElement('button');vBtn.type='button';vBtn.className='cs-voice-btn cs-voice-btn-sm no-print';
    vBtn.title='Listen to Step '+(idx+1);vBtn.setAttribute('aria-label','Listen to Step '+(idx+1));
    vBtn.innerHTML='<span>🔊</span>';
    vBtn.addEventListener('click',function(e){
      e.stopPropagation();
      if(window.CSVoiceTutor) window.CSVoiceTutor.toggleSpeak(vBtn, body);
    });
    d.appendChild(n);d.appendChild(body);d.appendChild(vBtn);steps.appendChild(d);
    _mjax(d);
  }

  btn.addEventListener('click',function(){
    if(revealed<stepsArr.length){
      renderStep(revealed);
      revealed++;
      if(revealed<stepsArr.length){
        btn.textContent=_t('ix.sr.showNext',{n:revealed,m:stepsArr.length});
        prompt.style.display='flex';
      } else {
        btn.textContent=_t('ix.sr.restart');
        prompt.style.display='none';
        allBtn.style.display='none';
      }
    } else {
      steps.innerHTML='';revealed=0;
      btn.textContent=_t('ix.sr.showFirst');
      prompt.style.display='flex';
      allBtn.style.display='inline-block';
    }
  });

  allBtn.addEventListener('click',function(){
    while(revealed<stepsArr.length){
      renderStep(revealed);
      revealed++;
    }
    btn.textContent=_t('ix.sr.restart');
    prompt.style.display='none';
    allBtn.style.display='none';
  });

  btnRow.appendChild(btn);btnRow.appendChild(allBtn);
  box.appendChild(btnRow);
}

function _buildNUM(cfg,box){
  box.innerHTML='<span class="ix-badge num">'+_t('ix.badge.num')+'</span>';
  var h=document.createElement('h3');h.innerHTML=_loc(cfg,'ti');box.appendChild(h);
  if(cfg.q){
    var p=document.createElement('p');p.style.cssText='margin:.3rem 0 .65rem;font-size:.9rem';
    p.innerHTML=_loc(cfg,'q');box.appendChild(p);
  }
  var wrap=document.createElement('div');wrap.className='ix-num-wrap';
  var row=document.createElement('div');row.className='ix-num-row';
  var inp=document.createElement('input');inp.type='text';inp.className='ix-num-inp';inp.placeholder='?';
  var plainTitle=String(cfg.ti||'Answer').replace(/<[^>]*>/g,'').trim();
  inp.setAttribute('aria-label',plainTitle);
  row.appendChild(inp);

  if(cfg.unit){
    var uSpan=document.createElement('span');uSpan.className='ix-num-unit';
    uSpan.innerHTML=_loc(cfg,'unit');row.appendChild(uSpan);
  }

  var go=document.createElement('button');go.type='button';go.className='ix-sb-go';go.textContent=_t('ix.num.check');
  var revealBtn=document.createElement('button');revealBtn.type='button';revealBtn.className='ix-sb-show-ans';
  revealBtn.textContent=_t('ix.num.showSol');revealBtn.style.display='none';
  row.appendChild(go);row.appendChild(revealBtn);wrap.appendChild(row);
  _attachMathPalette(wrap,function(){return inp;},{
    onCheck:function(){go.click();}
  });

  var res=document.createElement('div');res.className='ix-fb';res.style.display='none';
  res.setAttribute('role','status');res.setAttribute('aria-live','polite');
  wrap.appendChild(res);

  var attempts=0;
  function parseVal(v){
    if(typeof v==='number')return v;
    var s=String(v==null?'':v).trim().toLowerCase().replace(/,/g,'');
    if(cfg.unit){
      var u=String(cfg.unit).trim().toLowerCase();
      if(s.length>u.length&&s.slice(-u.length)===u)s=s.slice(0,-u.length).trim();
    }
    if(/^[+-]?\d+\.?\d*$/.test(s))return parseFloat(s);
    if(/^[+-]?\d+\.?\d*\/[+-]?\d+\.?\d*$/.test(s)){
      var pt=s.split('/'),den=parseFloat(pt[1]);
      if(den!==0)return parseFloat(pt[0])/den;
    }
    return NaN;
  }

  function doCheck(){
    var raw=inp.value.trim();
    if(!raw)return;
    attempts++;
    var target=_loc(cfg,'a');
    var targetStr=String(target);
    var tol=(typeof cfg.tol==='number'&&cfg.tol>=0)?cfg.tol:1e-4;

    var ok=false,isClose=false;
    if(window.ClipSATAnswerCheck&&ClipSATAnswerCheck.equivalent(raw,targetStr)){
      ok=true;
    } else {
      var uN=parseVal(raw),tN=parseVal(target);
      if(!isNaN(uN)&&!isNaN(tN)){
        var diff=Math.abs(uN-tN);
        if(diff<=tol){
          ok=true;
        } else if(diff<=tol*5||(tN!==0&&diff/Math.abs(tN)<=0.05)){
          isClose=true;
        }
      }
    }

    res.style.display='block';
    if(ok){
      inp.classList.remove('bad');inp.classList.add('ok');inp.disabled=true;
      go.disabled=true;revealBtn.style.display='none';
      res.className='ix-fb ok';
      var solHtml=(cfg.sol||cfg.ex)?('<div class="ix-num-sol">'+_loc(cfg,cfg.sol?'sol':'ex')+'</div>'):'';
      res.innerHTML=_t('ix.num.correct')+solHtml;
    } else {
      inp.classList.remove('ok');inp.classList.add('bad');
      res.className='ix-fb no';
      var msg=isClose?_t('ix.num.close'):_t('ix.num.incorrect');
      if(cfg.h){
        msg+='<span class="ix-num-hint">'+_t('ix.num.hintPrefix')+'<em>'+_loc(cfg,'h')+'</em></span>';
      }
      res.innerHTML=msg;
      if(attempts>=2){
        revealBtn.style.display='inline-block';
      }
    }
    _mjax(res);
  }

  revealBtn.addEventListener('click',function(){
    var target=_loc(cfg,'a');
    inp.value=String(target);
    inp.classList.remove('bad');inp.classList.add('ok');inp.disabled=true;
    go.disabled=true;revealBtn.style.display='none';
    res.style.display='block';res.className='ix-fb ok';
    var solHtml=(cfg.sol||cfg.ex)?('<div class="ix-num-sol">'+_loc(cfg,cfg.sol?'sol':'ex')+'</div>'):'';
    res.innerHTML='<strong>'+target+'</strong>'+solHtml;
    _mjax(res);
  });

  go.addEventListener('click',doCheck);
  inp.addEventListener('keydown',function(e){if(e.key==='Enter')doCheck();});
  box.appendChild(wrap);
  _mjax(box);
}

function _buildORD(cfg,box){
  box.innerHTML='<span class="ix-badge ord">'+_t('ix.badge.ord')+'</span>';
  var h=document.createElement('h3');h.innerHTML=_loc(cfg,'ti');box.appendChild(h);
  if(cfg.q||cfg.prompt){
    var p=document.createElement('p');p.style.cssText='margin:.3rem 0 .65rem;font-size:.9rem';
    p.innerHTML=_loc(cfg,cfg.q?'q':'prompt');box.appendChild(p);
  }
  var rawSteps=_loc(cfg,'items')||_loc(cfg,'steps')||[];
  var items=rawSteps.map(function(s,i){return {text:s,origIdx:i};});

  /* Permute initially so it is not already in sorted order */
  for(var s=items.length-1;s>0;s--){
    var r=Math.floor(Math.random()*(s+1));
    var tmp=items[s];items[s]=items[r];items[r]=tmp;
  }
  var isIdent=true;
  for(var k=0;k<items.length;k++){if(items[k].origIdx!==k){isIdent=false;break;}}
  if(isIdent&&items.length>1){var sw=items[0];items[0]=items[1];items[1]=sw;}

  var list=document.createElement('ol');list.className='ix-ord-list';
  box.appendChild(list);

  var attempts=0,isFinished=false;
  var btnRow=document.createElement('div');btnRow.style.cssText='display:flex;gap:.5rem;align-items:center;flex-wrap:wrap;margin-top:.6rem';
  var go=document.createElement('button');go.type='button';go.className='ix-sb-go';go.textContent=_t('ix.ord.check');
  var revealBtn=document.createElement('button');revealBtn.type='button';revealBtn.className='ix-sb-show-ans';
  revealBtn.textContent=_t('ix.ord.showCorrect');revealBtn.style.display='none';
  btnRow.appendChild(go);btnRow.appendChild(revealBtn);box.appendChild(btnRow);

  var res=document.createElement('div');res.className='ix-fb';res.style.display='none';
  res.setAttribute('role','status');res.setAttribute('aria-live','polite');
  box.appendChild(res);

  function renderList(){
    list.innerHTML='';
    items.forEach(function(item,idx){
      var li=document.createElement('li');li.className='ix-ord-item';li.dataset.origIdx=item.origIdx;
      var handle=document.createElement('span');handle.className='ix-ord-handle';
      handle.setAttribute('aria-hidden','true');handle.textContent='⠿';

      var body=document.createElement('div');body.className='ix-ord-body';body.innerHTML=item.text;

      var ctrls=document.createElement('div');ctrls.className='ix-ord-ctrls';

      var upBtn=document.createElement('button');upBtn.type='button';upBtn.className='ix-ord-btn up';
      upBtn.textContent='▲';upBtn.setAttribute('aria-label',_t('ix.ord.moveUp')+': Step '+(idx+1));
      if(idx===0||isFinished)upBtn.disabled=true;
      upBtn.addEventListener('click',function(){
        if(idx>0&&!isFinished){
          var t=items[idx];items[idx]=items[idx-1];items[idx-1]=t;
          renderList();
          _focusBtn(idx-1,'up');
        }
      });

      var dnBtn=document.createElement('button');dnBtn.type='button';dnBtn.className='ix-ord-btn dn';
      dnBtn.textContent='▼';dnBtn.setAttribute('aria-label',_t('ix.ord.moveDown')+': Step '+(idx+1));
      if(idx===items.length-1||isFinished)dnBtn.disabled=true;
      dnBtn.addEventListener('click',function(){
        if(idx<items.length-1&&!isFinished){
          var t=items[idx];items[idx]=items[idx+1];items[idx+1]=t;
          renderList();
          _focusBtn(idx+1,'dn');
        }
      });

      ctrls.appendChild(upBtn);ctrls.appendChild(dnBtn);
      li.appendChild(handle);li.appendChild(body);li.appendChild(ctrls);
      list.appendChild(li);
    });
    _mjax(list);
  }

  function _focusBtn(pos,dir){
    var lis=list.querySelectorAll('.ix-ord-item');
    if(lis[pos]){
      var btn=lis[pos].querySelector('.ix-ord-btn.'+(dir==='up'?'up':'dn'));
      if(btn&&!btn.disabled)btn.focus();
    }
  }

  renderList();
  _mjax(box);

  go.addEventListener('click',function(){
    if(isFinished)return;
    attempts++;
    var correct=0;
    var lis=list.querySelectorAll('.ix-ord-item');
    lis.forEach(function(li,idx){
      li.classList.remove('ok','bad');
      if(items[idx].origIdx===idx){
        correct++;li.classList.add('ok');
      } else {
        li.classList.add('bad');
      }
    });

    res.style.display='block';
    if(correct===items.length){
      isFinished=true;
      res.className='ix-fb ok';
      res.innerHTML=_t('ix.ord.allCorrect');
      go.disabled=true;revealBtn.style.display='none';
      renderList();
    } else {
      res.className='ix-fb no';
      res.innerHTML=_t('ix.ord.someCorrect',{n:correct,total:items.length});
      if(attempts>=2){
        revealBtn.style.display='inline-block';
      }
    }
    _mjax(res);
  });

  revealBtn.addEventListener('click',function(){
    items.sort(function(a,b){return a.origIdx-b.origIdx;});
    isFinished=true;
    renderList();
    var lis=list.querySelectorAll('.ix-ord-item');
    lis.forEach(function(li){li.classList.add('ok');});
    res.style.display='block';res.className='ix-fb ok';
    res.innerHTML=_t('ix.ord.allCorrect');
    go.disabled=true;revealBtn.style.display='none';
    _mjax(res);
  });
}

function _buildCAT(cfg,box){
  box.innerHTML='<span class="ix-badge cat">'+_t('ix.badge.cat')+'</span>';
  var h=document.createElement('h3');h.innerHTML=_loc(cfg,'ti');box.appendChild(h);
  if(cfg.q||cfg.prompt){
    var p=document.createElement('p');p.style.cssText='margin:.3rem 0 .65rem;font-size:.9rem';
    p.innerHTML=_loc(cfg,cfg.q?'q':'prompt');box.appendChild(p);
  }

  var cats=_loc(cfg,'categories')||[];
  var rawItems=_loc(cfg,'items')||[];
  var items=rawItems.map(function(it){
    var catIdx=typeof it.cat==='number'?it.cat:cats.indexOf(it.cat);
    return {s:it.s||it.text||it,targetCat:catIdx,selectedCat:null};
  });

  var listWrap=document.createElement('div');listWrap.className='ix-cat-list';
  box.appendChild(listWrap);

  var attempts=0,isFinished=false;
  var btnRow=document.createElement('div');btnRow.style.cssText='display:flex;gap:.5rem;align-items:center;flex-wrap:wrap;margin-top:.6rem';
  var go=document.createElement('button');go.type='button';go.className='ix-sb-go';go.textContent=_t('ix.cat.check');
  var revealBtn=document.createElement('button');revealBtn.type='button';revealBtn.className='ix-sb-show-ans';
  revealBtn.textContent=_t('ix.cat.showCorrect');revealBtn.style.display='none';
  btnRow.appendChild(go);btnRow.appendChild(revealBtn);box.appendChild(btnRow);

  var res=document.createElement('div');res.className='ix-fb';res.style.display='none';
  res.setAttribute('role','status');res.setAttribute('aria-live','polite');
  box.appendChild(res);

  items.forEach(function(item,iIdx){
    var d=document.createElement('div');d.className='ix-cat-item';
    var stmt=document.createElement('div');stmt.className='ix-cat-stmt';stmt.innerHTML=_tex(item.s);
    var pills=document.createElement('div');pills.className='ix-cat-pills';
    pills.setAttribute('role','group');
    pills.setAttribute('aria-label',String(item.s).replace(/\\\(|\\\)/g,'').replace(/\$/g,'').replace(/<[^>]*>/g,'').trim()||('Item '+(iIdx+1)));

    cats.forEach(function(catName,cIdx){
      var btn=document.createElement('button');btn.type='button';btn.className='ix-cat-pill';
      btn.innerHTML=_tex(catName);btn.setAttribute('aria-pressed','false');
      var cleanCatLabel = String(catName).replace(/\\\(|\\\)/g,'').replace(/\$/g,'').replace(/<[^>]*>/g,'').trim();
      btn.setAttribute('aria-label', cleanCatLabel || ('Category ' + (cIdx + 1)));
      btn.addEventListener('click',function(){
        if(isFinished)return;
        item.selectedCat=cIdx;
        pills.querySelectorAll('.ix-cat-pill').forEach(function(b,idx){
          var isSel=(idx===cIdx);
          b.classList.toggle('sel',isSel);
          b.setAttribute('aria-pressed',isSel?'true':'false');
        });
      });
      pills.appendChild(btn);
    });

    d.appendChild(stmt);d.appendChild(pills);listWrap.appendChild(d);
  });

  _mjax(box);

  go.addEventListener('click',function(){
    if(isFinished)return;
    var allAnswered=items.every(function(it){return it.selectedCat!=null;});
    if(!allAnswered){
      res.style.display='block';res.className='ix-fb no';
      res.textContent='Please categorize all items before checking.';
      return;
    }
    attempts++;
    var correct=0;
    var itemEls=listWrap.querySelectorAll('.ix-cat-item');
    itemEls.forEach(function(el,idx){
      el.classList.remove('ok','bad');
      if(items[idx].selectedCat===items[idx].targetCat){
        correct++;el.classList.add('ok');
      } else {
        el.classList.add('bad');
      }
    });

    res.style.display='block';
    var solHtml=(cfg.sol||cfg.ex)?('<div class="ix-cat-sol" style="margin-top:.4rem;font-size:.85rem;color:var(--ink)">'+_loc(cfg,cfg.sol?'sol':'ex')+'</div>'):'';
    if(correct===items.length){
      isFinished=true;
      res.className='ix-fb ok';
      res.innerHTML=_t('ix.cat.allCorrect')+solHtml;
      go.disabled=true;revealBtn.style.display='none';
      listWrap.querySelectorAll('.ix-cat-pill').forEach(function(b){b.disabled=true;});
    } else {
      res.className='ix-fb no';
      res.innerHTML=_t('ix.cat.someCorrect',{n:correct,total:items.length});
      if(attempts>=2){
        revealBtn.style.display='inline-block';
      }
    }
    _mjax(res);
  });

  revealBtn.addEventListener('click',function(){
    isFinished=true;
    var itemEls=listWrap.querySelectorAll('.ix-cat-item');
    itemEls.forEach(function(el,idx){
      el.classList.remove('bad');el.classList.add('ok');
      items[idx].selectedCat=items[idx].targetCat;
      var pills=el.querySelectorAll('.ix-cat-pill');
      pills.forEach(function(btn,cIdx){
        var isTarget=(cIdx===items[idx].targetCat);
        btn.classList.toggle('sel',isTarget);
        btn.setAttribute('aria-pressed',isTarget?'true':'false');
        btn.disabled=true;
      });
    });
    res.style.display='block';res.className='ix-fb ok';
    var solHtml=(cfg.sol||cfg.ex)?('<div class="ix-cat-sol" style="margin-top:.4rem;font-size:.85rem;color:var(--ink)">'+_loc(cfg,cfg.sol?'sol':'ex')+'</div>'):'';
    res.innerHTML=_t('ix.cat.allCorrect')+solHtml;
    go.disabled=true;revealBtn.style.display='none';
    _mjax(res);
  });
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

function _niceStep(span,maxTicks){
  var rough=span/(maxTicks||6);
  var pow=Math.pow(10,Math.floor(Math.log10(rough)));
  var frac=rough/pow;
  var mult=1;
  if(frac>=5)mult=5;
  else if(frac>=2)mult=2;
  else mult=1;
  return mult*pow;
}

function _drawFnPlot(canvas,cfg,params){
  var dpr=window.devicePixelRatio||1, rect=canvas.getBoundingClientRect();
  if(rect.width<2||rect.height<2)return;
  canvas.width=Math.round(rect.width*dpr);canvas.height=Math.round(rect.height*dpr);
  var ctx=canvas.getContext('2d');ctx.setTransform(dpr,0,0,dpr,0,0);
  var w=rect.width,h=rect.height,pad={l:36,r:16,t:14,b:22};
  var xmin=cfg.xrange[0],xmax=cfg.xrange[1],ymin=cfg.yrange[0],ymax=cfg.yrange[1];
  function X(x){return pad.l+(x-xmin)/(xmax-xmin)*(w-pad.l-pad.r);}
  function Y(y){return h-pad.b-(y-ymin)/(ymax-ymin)*(h-pad.t-pad.b);}

  var isDark=document.body.classList.contains('dark');
  ctx.clearRect(0,0,w,h);

  var xSpan=xmax-xmin;
  var ySpan=ymax-ymin;
  var isSquare=Boolean(cfg.square||cfg.isometric);
  if(isSquare){
    var pw=w-pad.l-pad.r, ph=h-pad.t-pad.b;
    if(pw>0&&ph>0){
      var baseSpanX=cfg.xrange[1]-cfg.xrange[0], baseSpanY=cfg.yrange[1]-cfg.yrange[0];
      var s=Math.max(baseSpanX/pw, baseSpanY/ph);
      var cx=(cfg.xrange[0]+cfg.xrange[1])/2, cy=(cfg.yrange[0]+cfg.yrange[1])/2;
      xmin=cx-s*pw/2; xmax=cx+s*pw/2;
      ymin=cy-s*ph/2; ymax=cy+s*ph/2;
      xSpan=xmax-xmin; ySpan=ymax-ymin;
    }
  }

  var xStep, yStep;
  if(isSquare||Math.abs(xSpan-ySpan)<1e-6){
    var commonStep=cfg.step||_niceStep(Math.min(xSpan,ySpan),6);
    xStep=commonStep;
    yStep=commonStep;
  } else {
    xStep=_niceStep(xSpan,7);
    yStep=_niceStep(ySpan,5);
  }

  /* Subtle background grid */
  ctx.strokeStyle=isDark?'rgba(255,255,255,0.07)':'rgba(0,0,0,0.06)';
  ctx.lineWidth=1;
  var firstX=Math.ceil(xmin/xStep)*xStep;
  for(var gx=firstX;gx<=xmax+1e-9;gx+=xStep){
    var cx=X(gx);
    if(cx<pad.l||cx>w-pad.r)continue;
    ctx.beginPath();ctx.moveTo(cx,pad.t);ctx.lineTo(cx,h-pad.b);ctx.stroke();
  }
  var firstY=Math.ceil(ymin/yStep)*yStep;
  for(var gy=firstY;gy<=ymax+1e-9;gy+=yStep){
    var cy=Y(gy);
    if(cy<pad.t||cy>h-pad.b)continue;
    ctx.beginPath();ctx.moveTo(pad.l,cy);ctx.lineTo(w-pad.r,cy);ctx.stroke();
  }

  /* Axes (x=0 and y=0, or clamped to edge if 0 is out of range) */
  ctx.strokeStyle=isDark?'#64748b':'#94a3b8';
  ctx.lineWidth=1.4;
  var axisY=(0>=ymin&&0<=ymax)?Y(0):(h-pad.b);
  ctx.beginPath();ctx.moveTo(pad.l,axisY);ctx.lineTo(w-pad.r,axisY);ctx.stroke();
  var axisX=(0>=xmin&&0<=xmax)?X(0):pad.l;
  ctx.beginPath();ctx.moveTo(axisX,pad.t);ctx.lineTo(axisX,h-pad.b);ctx.stroke();

  /* Ticks and numeric labels */
  ctx.font='10px ui-monospace, SFMono-Regular, Menlo, monospace';
  ctx.fillStyle=isDark?'#94a3b8':'#64748b';

  ctx.textAlign='center';ctx.textBaseline='top';
  for(var tx=firstX;tx<=xmax+1e-9;tx+=xStep){
    if(Math.abs(tx)<1e-9&&(0>=xmin&&0<=xmax)&&(0>=ymin&&0<=ymax))continue;
    var tcx=X(tx);
    if(tcx<pad.l+10||tcx>w-pad.r-10)continue;
    var xlbl=Number(tx.toFixed(4)).toString();
    var ty=axisY+3;
    if(ty>h-13)ty=h-13;
    ctx.fillText(xlbl,tcx,ty);
  }

  ctx.textAlign='right';ctx.textBaseline='middle';
  for(var tyVal=firstY;tyVal<=ymax+1e-9;tyVal+=yStep){
    if(Math.abs(tyVal)<1e-9)continue;
    var tcy=Y(tyVal);
    if(tcy<pad.t+8||tcy>h-pad.b-8)continue;
    var ylbl=Number(tyVal.toFixed(4)).toString();
    var txPos=axisX-4;
    if(txPos<20)txPos=20;
    ctx.fillText(ylbl,txPos,tcy);
  }

  /* Function curves */
  (cfg.fns||[]).forEach(function(fn){
    var col=fn.color||'#1E3A6E';
    if(isDark){
      if(col.toLowerCase()==='#1e3a6e'||col==='#1E3A6E')col='#60a5fa';
      else if(col.toLowerCase()==='#b8801f'||col==='#B8801F')col='#fbbf24';
    }
    ctx.strokeStyle=col;ctx.lineWidth=2.4;ctx.beginPath();
    var started=false,steps=Math.max(80,Math.round(w-pad.l-pad.r));
    for(var i=0;i<=steps;i++){
      var xv=xmin+(i/steps)*(xmax-xmin);
      var yv=_fnEval(fn.expr,xv,params);
      if(!isFinite(yv)){started=false;continue;}
      var cx=X(xv),cy=Y(yv);
      if(cy<pad.t-80||cy>h-pad.b+80){started=false;continue;}
      if(!started){ctx.moveTo(cx,cy);started=true;}else{ctx.lineTo(cx,cy);}
    }
    ctx.stroke();
  });

  /* Optional legend if labeled functions exist */
  var labeledFns=(cfg.fns||[]).filter(function(f){return Boolean(f.label);});
  if(labeledFns.length>0){
    ctx.textAlign='right';ctx.textBaseline='top';
    var legX=w-pad.r-6,legY=pad.t+4;
    labeledFns.forEach(function(fn,idx){
      var col=fn.color||'#1E3A6E';
      if(isDark){
        if(col.toLowerCase()==='#1e3a6e'||col==='#1E3A6E')col='#60a5fa';
        else if(col.toLowerCase()==='#b8801f'||col==='#B8801F')col='#fbbf24';
      }
      ctx.fillStyle=col;
      ctx.font='600 11px system-ui, -apple-system, sans-serif';
      ctx.fillText(fn.label,legX,legY+idx*14);
    });
  }
}

function _buildFN(cfg,box){
  box.innerHTML='<span class="ix-badge fn">'+_t('ix.badge.fn')+'</span>';
  var h=document.createElement('h3');h.innerHTML=_loc(cfg,'ti');box.appendChild(h);
  var wrap=document.createElement('div');wrap.className='ix-fn-wrap';
  var canvas=document.createElement('canvas');canvas.className='ix-fn-canvas';
  canvas.setAttribute('role','img');
  wrap.appendChild(canvas);box.appendChild(wrap);
  var params={};

  function updateAriaLabel(){
    var pStr=Object.keys(params).map(function(k){return k+'='+params[k];}).join(', ');
    var fStr=(cfg.fns||[]).map(function(f){return f.label||f.expr;}).join(', ');
    var lbl=(cfg.ti?String(cfg.ti).replace(/<[^>]*>/g,'').trim():'Graph')+': '+fStr+(pStr?' with '+pStr:'')+' on ['+cfg.xrange[0]+', '+cfg.xrange[1]+']';
    canvas.setAttribute('aria-label',lbl);
  }

  if(cfg.params&&cfg.params.length){
    var controls=document.createElement('div');controls.className='ix-fn-controls';
    cfg.params.forEach(function(p){
      params[p.name]=p.default;
      var row=document.createElement('div');row.className='ix-fn-ctrl';
      var lab=document.createElement('label');lab.innerHTML=_tex(p.label)+': <b class="ix-fn-val">'+p.default+'</b>';
      var slider=document.createElement('input');slider.type='range';
      slider.min=p.min;slider.max=p.max;slider.step=p.step||1;slider.value=p.default;
      slider.setAttribute('aria-label',String(p.label).replace(/<[^>]*>/g,'').trim()||'Value');
      slider.addEventListener('input',function(){
        params[p.name]=parseFloat(slider.value);
        lab.querySelector('.ix-fn-val').textContent=slider.value;
        redraw();
        updateAriaLabel();
      });
      row.appendChild(lab);row.appendChild(slider);controls.appendChild(row);
    });
    box.appendChild(controls);
  }
  updateAriaLabel();

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

  if(window.MutationObserver){
    var themeObs=new MutationObserver(function(mutations){
      for(var i=0;i<mutations.length;i++){
        if(mutations[i].attributeName==='class'){redraw();break;}
      }
    });
    themeObs.observe(document.body,{attributes:true,attributeFilter:['class']});
  }
}

function _buildGP(cfg,box){
  box.innerHTML='<span class="ix-badge gp">'+_t('ix.badge.gp')+'</span>';
  var h=document.createElement('h3');h.innerHTML=_loc(cfg,'ti');box.appendChild(h);
  var p=document.createElement('p');p.style.cssText='margin:.3rem 0 .65rem;font-size:.9rem';p.innerHTML=_loc(cfg,'q');box.appendChild(p);

  var xrange=cfg.xrange||[-5,5];
  var yrange=cfg.yrange||[-5,5];
  var rawTargets=_loc(cfg,'targets')||[];
  var targets=rawTargets.map(function(t,i){
    var pt=Array.isArray(t.target)?t.target:[0,0];
    return {
      idx:i,
      label:t.label||('Point '+(i+1)),
      target:[pt[0],pt[1]],
      tol:(typeof t.tol==='number'&&t.tol>0)?t.tol:0.45,
      type:t.type||'point'
    };
  });

  // Target status chips
  var targetsWrap=document.createElement('div');targetsWrap.className='ix-gp-targets';
  var targetPills=[];
  targets.forEach(function(tgt){
    var pill=document.createElement('span');pill.className='ix-gp-target-pill';
    pill.innerHTML='• '+_tex(tgt.label);
    pill.setAttribute('data-tgt-idx',String(tgt.idx));
    targetsWrap.appendChild(pill);
    targetPills.push(pill);
  });
  box.appendChild(targetsWrap);

  // Canvas wrap + canvas
  var wrap=document.createElement('div');wrap.className='ix-gp-wrap';
  var canvas=document.createElement('canvas');canvas.className='ix-gp-canvas';
  canvas.setAttribute('role','img');canvas.setAttribute('tabindex','0');
  var hud=document.createElement('div');hud.className='ix-gp-hud';hud.textContent='(x: 0, y: 0)';
  wrap.appendChild(canvas);wrap.appendChild(hud);box.appendChild(wrap);

  var hint=document.createElement('div');hint.className='ix-gp-hint';hint.textContent=_t('ix.gp.hint');
  box.appendChild(hint);

  // Controls row
  var ctrls=document.createElement('div');ctrls.className='ix-sb-ctrls';ctrls.style.marginTop='.8rem';
  var checkBtn=document.createElement('button');checkBtn.type='button';checkBtn.className='ix-sb-go';checkBtn.textContent=_t('ix.gp.check');
  var clearBtn=document.createElement('button');clearBtn.type='button';clearBtn.className='ix-gp-btn-clear';clearBtn.textContent=_t('ix.gp.clear');
  var revealBtn=document.createElement('button');revealBtn.type='button';revealBtn.className='ix-sb-show-ans';revealBtn.style.display='none';revealBtn.textContent=_t('ix.gp.showSol');
  ctrls.appendChild(checkBtn);ctrls.appendChild(clearBtn);ctrls.appendChild(revealBtn);box.appendChild(ctrls);

  var res=document.createElement('div');res.className='ix-fb';res.style.display='none';box.appendChild(res);

  var placedPoints=[];
  var attempts=0;
  var isFinished=false;
  var showTargetSolution=false;

  function _viewBounds(w,h,pad){
    var xmin=xrange[0],xmax=xrange[1],ymin=yrange[0],ymax=yrange[1];
    var isSquare=Boolean(cfg.square||cfg.isometric||(Math.abs((xrange[1]-xrange[0])-(yrange[1]-yrange[0]))<1e-6));
    if(isSquare){
      var pw=w-pad.l-pad.r, ph=h-pad.t-pad.b;
      if(pw>0&&ph>0){
        var baseSpanX=xrange[1]-xrange[0], baseSpanY=yrange[1]-yrange[0];
        var s=Math.max(baseSpanX/pw, baseSpanY/ph);
        var cx=(xrange[0]+xrange[1])/2, cy=(yrange[0]+yrange[1])/2;
        xmin=cx-s*pw/2; xmax=cx+s*pw/2;
        ymin=cy-s*ph/2; ymax=cy+s*ph/2;
      }
    }
    return {xmin:xmin,xmax:xmax,ymin:ymin,ymax:ymax,isSquare:isSquare};
  }

  function redraw(){
    var dpr=window.devicePixelRatio||1;
    var rect=(canvas.getBoundingClientRect&&canvas.getBoundingClientRect())||{width:480,height:320};
    if(rect.width<2||rect.height<2)return;
    canvas.width=Math.round(rect.width*dpr);canvas.height=Math.round(rect.height*dpr);
    if(!canvas.getContext)return;
    var ctx=canvas.getContext('2d');
    if(!ctx)return;
    ctx.setTransform(dpr,0,0,dpr,0,0);
    var w=rect.width,h=rect.height,pad={l:38,r:20,t:20,b:26};
    var vb=_viewBounds(w,h,pad);
    var xmin=vb.xmin,xmax=vb.xmax,ymin=vb.ymin,ymax=vb.ymax;
    function X(x){return pad.l+(x-xmin)/(xmax-xmin)*(w-pad.l-pad.r);}
    function Y(y){return h-pad.b-(y-ymin)/(ymax-ymin)*(h-pad.t-pad.b);}

    var isDark=document.body&&document.body.classList&&document.body.classList.contains('dark');
    ctx.clearRect(0,0,w,h);

    var xSpan=xmax-xmin;var ySpan=ymax-ymin;
    var xStep, yStep;
    if(vb.isSquare||Math.abs(xSpan-ySpan)<1e-6){
      var commonStep=cfg.step||_niceStep(Math.min(xSpan,ySpan),6);
      xStep=commonStep;
      yStep=commonStep;
    } else {
      xStep=_niceStep(xSpan,8);
      yStep=_niceStep(ySpan,6);
    }

    // Grid lines
    ctx.strokeStyle=isDark?'rgba(255,255,255,0.08)':'rgba(0,0,0,0.06)';
    ctx.lineWidth=1;
    var firstX=Math.ceil(xmin/xStep)*xStep;
    for(var gx=firstX;gx<=xmax+1e-9;gx+=xStep){
      var cx=X(gx);if(cx<pad.l||cx>w-pad.r)continue;
      ctx.beginPath();ctx.moveTo(cx,pad.t);ctx.lineTo(cx,h-pad.b);ctx.stroke();
    }
    var firstY=Math.ceil(ymin/yStep)*yStep;
    for(var gy=firstY;gy<=ymax+1e-9;gy+=yStep){
      var cy=Y(gy);if(cy<pad.t||cy>h-pad.b)continue;
      ctx.beginPath();ctx.moveTo(pad.l,cy);ctx.lineTo(w-pad.r,cy);ctx.stroke();
    }

    // Axes
    ctx.strokeStyle=isDark?'#64748b':'#94a3b8';ctx.lineWidth=1.5;
    var axisY=(0>=ymin&&0<=ymax)?Y(0):(h-pad.b);
    ctx.beginPath();ctx.moveTo(pad.l,axisY);ctx.lineTo(w-pad.r,axisY);ctx.stroke();
    var axisX=(0>=xmin&&0<=xmax)?X(0):pad.l;
    ctx.beginPath();ctx.moveTo(axisX,pad.t);ctx.lineTo(axisX,h-pad.b);ctx.stroke();

    // Axis numbers
    ctx.font='10px ui-monospace, SFMono-Regular, Menlo, monospace';
    ctx.fillStyle=isDark?'#94a3b8':'#64748b';
    ctx.textAlign='center';ctx.textBaseline='top';
    for(var tx=firstX;tx<=xmax+1e-9;tx+=xStep){
      if(Math.abs(tx)<1e-9&&(0>=xmin&&0<=xmax)&&(0>=ymin&&0<=ymax))continue;
      var tcx=X(tx);if(tcx<pad.l+8||tcx>w-pad.r-8)continue;
      ctx.fillText(Number(tx.toFixed(2)).toString(),tcx,Math.min(axisY+3,h-13));
    }
    ctx.textAlign='right';ctx.textBaseline='middle';
    for(var tyVal=firstY;tyVal<=ymax+1e-9;tyVal+=yStep){
      if(Math.abs(tyVal)<1e-9)continue;
      var tcy=Y(tyVal);if(tcy<pad.t+8||tcy>h-pad.b-8)continue;
      ctx.fillText(Number(tyVal.toFixed(2)).toString(),Math.max(axisX-4,22),tcy);
    }

    // Target function curve (if completed or revealed)
    if((isFinished||showTargetSolution)&&cfg.curve){
      ctx.strokeStyle=isDark?'#34d399':'#10b981';ctx.lineWidth=2.5;ctx.beginPath();
      var started=false,steps=Math.max(80,Math.round(w-pad.l-pad.r));
      for(var i=0;i<=steps;i++){
        var xv=xmin+(i/steps)*(xmax-xmin);
        var yv=_fnEval(cfg.curve,xv);
        if(!isFinite(yv)){started=false;continue;}
        var scx=X(xv),scy=Y(yv);
        if(scy<pad.t-60||scy>h-pad.b+60){started=false;continue;}
        if(!started){ctx.moveTo(scx,scy);started=true;}else{ctx.lineTo(scx,scy);}
      }
      ctx.stroke();
    }

    // Points to draw
    var ptsToDraw=placedPoints;
    if(showTargetSolution){
      ptsToDraw=targets.map(function(tgt){return {x:tgt.target[0],y:tgt.target[1],label:tgt.label,targetOk:true};});
    }

    ptsToDraw.forEach(function(pt){
      var px=X(pt.x),py=Y(pt.y);
      var col=pt.targetOk?(isDark?'#34d399':'#16a34a'):(isDark?'#60a5fa':'#2563eb');
      if(pt.bad)col=(isDark?'#f87171':'#dc2626');

      // Halo
      ctx.beginPath();ctx.arc(px,py,8,0,Math.PI*2);
      ctx.fillStyle=pt.targetOk?'rgba(52,211,153,0.25)':'rgba(59,130,246,0.2)';
      ctx.fill();

      // Point circle
      ctx.beginPath();ctx.arc(px,py,4.5,0,Math.PI*2);
      ctx.fillStyle=col;ctx.fill();
      ctx.strokeStyle='#fff';ctx.lineWidth=1.5;ctx.stroke();

      // Coordinate text
      ctx.font='600 11px system-ui, -apple-system, sans-serif';
      ctx.fillStyle=col;ctx.textAlign='center';ctx.textBaseline='bottom';
      var lbl=(pt.label?(pt.label+' '):'')+'('+pt.x+','+pt.y+')';
      ctx.fillText(lbl,px,py-9);
    });
  }

  // Pointer snapping helper
  function snapCoord(val,step){
    return Math.round(val/step)*step;
  }

  canvas.addEventListener('click',function(e){
    if(isFinished)return;
    var rect=canvas.getBoundingClientRect();
    var dpr=window.devicePixelRatio||1;
    var mx=e.clientX-rect.left,my=e.clientY-rect.top;
    var w=rect.width,h=rect.height,pad={l:38,r:20,t:20,b:26};
    var vb=_viewBounds(w,h,pad);
    var xmin=vb.xmin,xmax=vb.xmax,ymin=vb.ymin,ymax=vb.ymax;
    var rawX=xmin+((mx-pad.l)/(w-pad.l-pad.r))*(xmax-xmin);
    var rawY=ymin+((h-pad.b-my)/(h-pad.t-pad.b))*(ymax-ymin);

    // Check if clicked close to an existing point to remove it
    var removeIdx=-1;
    for(var i=0;i<placedPoints.length;i++){
      var pt=placedPoints[i];
      var px=pad.l+(pt.x-xmin)/(xmax-xmin)*(w-pad.l-pad.r);
      var py=h-pad.b-(pt.y-ymin)/(ymax-ymin)*(h-pad.t-pad.b);
      if(Math.hypot(mx-px,my-py)<=14){removeIdx=i;break;}
    }
    if(removeIdx>=0){
      placedPoints.splice(removeIdx,1);
      redraw();
      return;
    }

    if(placedPoints.length>=targets.length+2)return;

    // Snap to nearest 0.5 or integer
    var snapX=snapCoord(rawX,0.5);
    var snapY=snapCoord(rawY,0.5);
    var distPixel=Math.hypot(
      mx-(pad.l+(snapX-xmin)/(xmax-xmin)*(w-pad.l-pad.r)),
      my-(h-pad.b-(snapY-ymin)/(ymax-ymin)*(h-pad.t-pad.b))
    );
    var finalX=distPixel<16?snapX:Number(rawX.toFixed(1));
    var finalY=distPixel<16?snapY:Number(rawY.toFixed(1));

    placedPoints.push({x:finalX,y:finalY});
    redraw();
  });

  canvas.addEventListener('mousemove',function(e){
    var rect=canvas.getBoundingClientRect();
    var mx=e.clientX-rect.left,my=e.clientY-rect.top;
    var w=rect.width,h=rect.height,pad={l:38,r:20,t:20,b:26};
    var vb=_viewBounds(w,h,pad);
    var xmin=vb.xmin,xmax=vb.xmax,ymin=vb.ymin,ymax=vb.ymax;
    var rawX=xmin+((mx-pad.l)/(w-pad.l-pad.r))*(xmax-xmin);
    var rawY=ymin+((h-pad.b-my)/(h-pad.t-pad.b))*(ymax-ymin);
    hud.textContent='(x: '+rawX.toFixed(1)+', y: '+rawY.toFixed(1)+')';
  });

  clearBtn.addEventListener('click',function(){
    if(isFinished)return;
    placedPoints=[];
    targetPills.forEach(function(p){p.classList.remove('ok','bad');});
    res.style.display='none';
    redraw();
  });

  checkBtn.addEventListener('click',function(){
    if(isFinished)return;
    attempts++;
    var matchedTargets=0;
    var usedPoints=new Set();

    targets.forEach(function(tgt,tIdx){
      var foundPoint=null;
      for(var i=0;i<placedPoints.length;i++){
        if(usedPoints.has(i))continue;
        var p=placedPoints[i];
        var dist=Math.hypot(p.x-tgt.target[0],p.y-tgt.target[1]);
        if(dist<=tgt.tol){
          foundPoint=p;usedPoints.add(i);break;
        }
      }
      var pill=targetPills[tIdx];
      if(foundPoint){
        matchedTargets++;
        foundPoint.targetOk=true;
        if(pill){pill.classList.remove('bad');pill.classList.add('ok');}
      } else {
        if(pill){pill.classList.remove('ok');pill.classList.add('bad');}
      }
    });

    res.style.display='block';
    var solHtml=(cfg.sol||cfg.ex)?('<div class="ix-gp-sol" style="margin-top:.4rem;font-size:.85rem;color:var(--ink)">'+_loc(cfg,cfg.sol?'sol':'ex')+'</div>'):'';

    if(matchedTargets===targets.length){
      isFinished=true;
      res.className='ix-fb ok';
      res.innerHTML=_t('ix.gp.allCorrect')+solHtml;
      checkBtn.disabled=true;clearBtn.disabled=true;revealBtn.style.display='none';
      redraw();
    } else {
      res.className='ix-fb no';
      res.innerHTML=_t('ix.gp.someCorrect',{n:matchedTargets,total:targets.length});
      if(attempts>=2){
        revealBtn.style.display='inline-block';
      }
      redraw();
    }
    _mjax(res);
  });

  revealBtn.addEventListener('click',function(){
    isFinished=true;showTargetSolution=true;
    targetPills.forEach(function(p){p.classList.remove('bad');p.classList.add('ok');});
    res.style.display='block';res.className='ix-fb ok';
    var solHtml=(cfg.sol||cfg.ex)?('<div class="ix-gp-sol" style="margin-top:.4rem;font-size:.85rem;color:var(--ink)">'+_loc(cfg,cfg.sol?'sol':'ex')+'</div>'):'';
    res.innerHTML=_t('ix.gp.allCorrect')+solHtml;
    checkBtn.disabled=true;clearBtn.disabled=true;revealBtn.style.display='none';
    redraw();
    _mjax(res);
  });

  redraw();
  setTimeout(redraw,60);
}

function _buildSE(cfg,box){
  box.innerHTML='<span class="ix-badge se">'+_t('ix.badge.se')+'</span>';
  var h=document.createElement('h3');h.innerHTML=_loc(cfg,'ti');box.appendChild(h);
  var p=document.createElement('p');p.style.cssText='margin:.3rem 0 .65rem;font-size:.9rem';p.innerHTML=_loc(cfg,'q');box.appendChild(p);

  var rawSteps=_loc(cfg,'steps')||[];
  var steps=rawSteps.map(function(st,i){
    var stmt=typeof st==='string'?st:(st.s||'');
    return {idx:i+1,s:stmt};
  });
  var targetError=(typeof cfg.errorStep==='number')?cfg.errorStep:0;

  var stepsList=document.createElement('div');stepsList.className='ix-se-steps';
  var stepBtns=[];

  steps.forEach(function(st){
    var btn=document.createElement('button');btn.type='button';btn.className='ix-se-step';
    btn.setAttribute('data-step-idx',String(st.idx));
    btn.innerHTML='<span class="ix-se-step-badge">'+_t('ix.se.stepN',{n:st.idx})+'</span>'
      +'<span class="ix-se-step-body">'+_tex(st.s)+'</span>'
      +'<span class="ix-se-status" aria-hidden="true"></span>';
    stepsList.appendChild(btn);
    stepBtns.push(btn);
  });

  if(cfg.allowNoFlaw!==false){
    var noErrBtn=document.createElement('button');noErrBtn.type='button';noErrBtn.className='ix-se-step ix-se-no-err';
    noErrBtn.setAttribute('data-step-idx','0');
    noErrBtn.innerHTML='<span class="ix-se-step-badge">✓</span>'
      +'<span class="ix-se-step-body">'+_t('ix.se.noError')+'</span>'
      +'<span class="ix-se-status" aria-hidden="true"></span>';
    stepsList.appendChild(noErrBtn);
    stepBtns.push(noErrBtn);
  }
  box.appendChild(stepsList);

  // Reasons section if provided
  var rawReasons=_loc(cfg,'reasons');
  var reasonsWrap=null;
  var reasonBtns=[];
  var selectedReason=null;

  if(Array.isArray(rawReasons)&&rawReasons.length>0){
    reasonsWrap=document.createElement('div');reasonsWrap.className='ix-se-reasons-wrap';
    reasonsWrap.style.display='none';
    var whyPrompt=document.createElement('div');whyPrompt.className='ix-se-why-prompt';
    whyPrompt.textContent=_t('ix.se.whyPrompt');reasonsWrap.appendChild(whyPrompt);
    var reasonsList=document.createElement('div');reasonsList.className='ix-se-reasons-list';
    rawReasons.forEach(function(rStr,rIdx){
      var rBtn=document.createElement('button');rBtn.type='button';rBtn.className='ix-se-reason-btn';
      rBtn.setAttribute('data-reason-idx',String(rIdx));
      rBtn.innerHTML=_tex(rStr);
      rBtn.addEventListener('click',function(){
        if(isFinished)return;
        selectedReason=rIdx;
        reasonBtns.forEach(function(b){b.classList.remove('sel');b.setAttribute('aria-pressed','false');});
        rBtn.classList.add('sel');rBtn.setAttribute('aria-pressed','true');
      });
      reasonsList.appendChild(rBtn);
      reasonBtns.push(rBtn);
    });
    reasonsWrap.appendChild(reasonsList);
    box.appendChild(reasonsWrap);
  }

  // Controls row
  var ctrls=document.createElement('div');ctrls.className='ix-sb-ctrls';ctrls.style.marginTop='.8rem';
  var checkBtn=document.createElement('button');checkBtn.type='button';checkBtn.className='ix-sb-go';checkBtn.textContent=_t('ix.se.check');
  var revealBtn=document.createElement('button');revealBtn.type='button';revealBtn.className='ix-sb-show-ans';revealBtn.style.display='none';revealBtn.textContent=_t('ix.se.showSol');
  ctrls.appendChild(checkBtn);ctrls.appendChild(revealBtn);box.appendChild(ctrls);

  var res=document.createElement('div');res.className='ix-fb';res.style.display='none';box.appendChild(res);

  var selectedStep=null;
  var attempts=0;
  var isFinished=false;

  stepBtns.forEach(function(btn){
    btn.addEventListener('click',function(){
      if(isFinished)return;
      var sIdx=parseInt(btn.getAttribute('data-step-idx'),10);
      selectedStep=sIdx;
      stepBtns.forEach(function(b){b.classList.remove('sel');b.setAttribute('aria-pressed','false');});
      btn.classList.add('sel');btn.setAttribute('aria-pressed','true');
      if(reasonsWrap){
        reasonsWrap.style.display=(sIdx>0)?'block':'none';
      }
    });
  });

  checkBtn.addEventListener('click',function(){
    if(isFinished)return;
    if(selectedStep===null){
      res.style.display='block';res.className='ix-fb no';
      res.textContent='Please select a step first.';
      return;
    }
    attempts++;
    var solHtml=(cfg.sol||cfg.ex)?('<div class="ix-se-sol" style="margin-top:.4rem;font-size:.85rem;color:var(--ink)">'+_loc(cfg,cfg.sol?'sol':'ex')+'</div>'):'';

    var isStepCorrect=(selectedStep===targetError);
    var isReasonCorrect=true;
    if(isStepCorrect&&reasonsWrap&&typeof cfg.correctReason==='number'&&targetError>0){
      if(selectedReason!==cfg.correctReason)isReasonCorrect=false;
    }

    if(isStepCorrect&&isReasonCorrect){
      isFinished=true;
      stepBtns.forEach(function(b){
        b.disabled=true;
        var sIdx=parseInt(b.getAttribute('data-step-idx'),10);
        if(sIdx===targetError){
          b.classList.add(targetError>0?'err':'ok');
          var st=b.querySelector('.ix-se-status');
          if(st)st.textContent=targetError>0?'✗ Flaw':'✓ Correct';
        }
      });
      reasonBtns.forEach(function(rb){rb.disabled=true;});
      res.style.display='block';res.className='ix-fb ok';
      res.innerHTML=(targetError>0?_t('ix.se.correctFlaw',{n:targetError}):_t('ix.correct'))+solHtml;
      checkBtn.disabled=true;revealBtn.style.display='none';
    } else {
      stepBtns.forEach(function(b){
        var sIdx=parseInt(b.getAttribute('data-step-idx'),10);
        if(sIdx===selectedStep)b.classList.add('bad');
      });
      res.style.display='block';res.className='ix-fb no';
      if(isStepCorrect&&!isReasonCorrect){
        res.innerHTML='Step '+selectedStep+' is indeed the flaw, but check the reason chosen.';
      } else {
        res.innerHTML=_t('ix.se.incorrect')+(cfg.h?('<div class="ix-sb-hint-box" style="margin-top:.4rem;font-size:.82rem">'+_t('ix.num.hintPrefix')+_loc(cfg,'h')+'</div>'):'');
      }
      if(attempts>=2){
        revealBtn.style.display='inline-block';
      }
    }
    _mjax(res);
  });

  revealBtn.addEventListener('click',function(){
    isFinished=true;
    stepBtns.forEach(function(b){
      b.disabled=true;
      var sIdx=parseInt(b.getAttribute('data-step-idx'),10);
      if(sIdx===targetError){
        b.classList.add(targetError>0?'err':'ok');
        var st=b.querySelector('.ix-se-status');
        if(st)st.textContent=targetError>0?'✗ Flaw':'✓ Correct';
      } else {
        b.classList.remove('sel','bad');
      }
    });
    if(reasonsWrap&&typeof cfg.correctReason==='number'){
      reasonsWrap.style.display='block';
      reasonBtns.forEach(function(rb,i){
        rb.disabled=true;
        if(i===cfg.correctReason)rb.classList.add('sel','ok');
      });
    }
    res.style.display='block';res.className='ix-fb ok';
    var solHtml=(cfg.sol||cfg.ex)?('<div class="ix-se-sol" style="margin-top:.4rem;font-size:.85rem;color:var(--ink)">'+_loc(cfg,cfg.sol?'sol':'ex')+'</div>'):'';
    res.innerHTML=(targetError>0?_t('ix.se.correctFlaw',{n:targetError}):_t('ix.correct'))+solHtml;
    checkBtn.disabled=true;revealBtn.style.display='none';
    _mjax(res);
  });
}

function _buildMS(cfg,box){
  box.innerHTML='<span class="ix-badge ms">'+_t('ix.badge.ms')+'</span>';
  var h=document.createElement('h3');h.innerHTML=_loc(cfg,'ti');box.appendChild(h);
  var p=document.createElement('p');p.style.cssText='margin:.3rem 0 .65rem;font-size:.9rem';p.innerHTML=_loc(cfg,'q');box.appendChild(p);

  var rawParts=_loc(cfg,'parts')||[];
  var totalMarks=0;
  var allRubricItems=[];
  rawParts.forEach(function(pt,ptIdx){
    var pMarks=pt.marks||(pt.rubric?pt.rubric.length:0);
    totalMarks+=pMarks;
    (pt.rubric||[]).forEach(function(item,iIdx){
      allRubricItems.push({
        partIdx:ptIdx,
        itemIdx:iIdx,
        code:item.code||'M1',
        text:_tex(item.text||''),
        marks:item.marks||1
      });
    });
  });

  var metaWrap=document.createElement('div');metaWrap.className='ix-ms-meta';
  var chip=document.createElement('span');chip.className='ix-ms-total-chip';
  chip.textContent=_t('ix.ms.totalMarks',{n:totalMarks});
  metaWrap.appendChild(chip);box.appendChild(metaWrap);

  var toggleBtn=document.createElement('button');toggleBtn.type='button';toggleBtn.className='ix-ms-btn-toggle';
  toggleBtn.textContent=_t('ix.ms.openRubric');
  box.appendChild(toggleBtn);

  var rubricWrap=document.createElement('div');rubricWrap.className='ix-ms-rubric';
  rubricWrap.style.display='none';

  // Live Score Card
  var scoreCard=document.createElement('div');scoreCard.className='ix-ms-score-card';
  var scoreHeader=document.createElement('div');scoreHeader.className='ix-ms-score-header';
  var scoreLabel=document.createElement('span');scoreLabel.className='ix-ms-score-label';scoreLabel.textContent='Examiner Score:';
  var scoreNum=document.createElement('span');scoreNum.className='ix-ms-score-num';scoreNum.textContent='0 / '+totalMarks+' (0%)';
  scoreHeader.appendChild(scoreLabel);scoreHeader.appendChild(scoreNum);scoreCard.appendChild(scoreHeader);

  var progressTrack=document.createElement('div');progressTrack.className='ix-ms-progress';
  var progressFill=document.createElement('div');progressFill.className='ix-ms-progress-fill';progressFill.style.width='0%';
  progressTrack.appendChild(progressFill);scoreCard.appendChild(progressTrack);

  var gradePill=document.createElement('div');gradePill.className='ix-ms-grade-pill';gradePill.textContent=_t('ix.ms.grade',{grade:'—'});
  scoreCard.appendChild(gradePill);rubricWrap.appendChild(scoreCard);

  // Parts
  var markButtons=[];
  var earnedMarks=0;

  function updateScore(){
    earnedMarks=0;
    markButtons.forEach(function(b){
      if(b.getAttribute('data-earned')==='1')earnedMarks+=parseInt(b.getAttribute('data-marks')||'1',10);
    });
    var pct=totalMarks>0?Math.round((earnedMarks/totalMarks)*100):0;
    scoreNum.textContent=earnedMarks+' / '+totalMarks+' ('+pct+'%)';
    progressFill.style.width=pct+'%';

    if(pct>=80){progressFill.style.backgroundColor='#10b981';}
    else if(pct>=50){progressFill.style.backgroundColor='#2563eb';}
    else {progressFill.style.backgroundColor='#f59e0b';}

    var projGrade='—';
    if(cfg.boundaries&&Array.isArray(cfg.boundaries)){
      for(var i=0;i<cfg.boundaries.length;i++){
        var b=cfg.boundaries[i];
        if(earnedMarks>=b.min){
          projGrade=_loc(b,'grade');break;
        }
      }
    } else {
      if(pct>=90)projGrade='Grade 9 / A* (Exceptional)';
      else if(pct>=75)projGrade='Grade 8 / A (Excellent)';
      else if(pct>=60)projGrade='Grade 6 / B (Proficient)';
      else if(pct>=45)projGrade='Grade 4 / C (Passing)';
      else projGrade='Needs Practice';
    }
    gradePill.textContent=_t('ix.ms.grade',{grade:projGrade});
  }

  rawParts.forEach(function(pt,ptIdx){
    var partEl=document.createElement('div');partEl.className='ix-ms-part';
    var head=document.createElement('div');head.className='ix-ms-part-head';
    head.innerHTML='<b>'+_tex(pt.label||('Part '+(ptIdx+1)))+'</b> <span class="ix-ms-part-marks">['+(pt.marks||(pt.rubric?pt.rubric.length:0))+' marks]</span>';
    partEl.appendChild(head);

    var itemList=document.createElement('div');itemList.className='ix-ms-rubric-items';
    (pt.rubric||[]).forEach(function(rb){
      var row=document.createElement('div');row.className='ix-ms-item';
      var codeChip=document.createElement('span');codeChip.className='ix-ms-code '+String(rb.code||'M1').toLowerCase().slice(0,1);
      codeChip.textContent=rb.code||'M1';

      var desc=document.createElement('div');desc.className='ix-ms-desc';desc.innerHTML=_tex(_loc(rb,'text'));

      var mBtn=document.createElement('button');mBtn.type='button';mBtn.className='ix-ms-mark-btn';
      mBtn.setAttribute('data-earned','0');
      mBtn.setAttribute('data-marks',String(rb.marks||1));
      mBtn.setAttribute('aria-pressed','false');
      mBtn.textContent='+'+(rb.marks||1)+' Mark';

      mBtn.addEventListener('click',function(){
        var cur=mBtn.getAttribute('data-earned')==='1';
        mBtn.setAttribute('data-earned',cur?'0':'1');
        mBtn.setAttribute('aria-pressed',cur?'false':'true');
        mBtn.classList.toggle('earned',!cur);
        mBtn.textContent=cur?('+'+(rb.marks||1)+' Mark'):('✓ '+(rb.marks||1)+' Mark');
        row.classList.toggle('ok',!cur);
        updateScore();
      });

      row.appendChild(codeChip);row.appendChild(desc);row.appendChild(mBtn);
      itemList.appendChild(row);
      markButtons.push(mBtn);
    });
    partEl.appendChild(itemList);
    rubricWrap.appendChild(partEl);
  });

  // Examiner Report Tip box
  if(cfg.examinerTip||cfg.examinerTip_ar){
    var tipBox=document.createElement('div');tipBox.className='ix-ms-tip-box';
    tipBox.innerHTML='<strong>'+_t('ix.ms.examinerTip')+'</strong><div style="margin-top:.3rem;line-height:1.45">'+_tex(_loc(cfg,'examinerTip'))+'</div>';
    rubricWrap.appendChild(tipBox);
  }

  box.appendChild(rubricWrap);

  var isOpen=false;
  toggleBtn.addEventListener('click',function(){
    isOpen=!isOpen;
    rubricWrap.style.display=isOpen?'block':'none';
    toggleBtn.textContent=isOpen?_t('ix.ms.hideRubric'):_t('ix.ms.openRubric');
    if(isOpen){
      updateScore();
      _mjax(rubricWrap);
    }
  });
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
    else if(c.t==='num')_buildNUM(c,box);
    else if(c.t==='ord')_buildORD(c,box);
    else if(c.t==='cat')_buildCAT(c,box);
    else if(c.t==='gp')_buildGP(c,box);
    else if(c.t==='se')_buildSE(c,box);
    else if(c.t==='ms')_buildMS(c,box);
    var badgeEl=box.querySelector('.ix-badge');
    if(badgeEl){
      var vBtn=document.createElement('button');
      vBtn.type='button';
      vBtn.className='cs-voice-btn no-print';
      vBtn.style.marginLeft='8px';
      vBtn.title=(loc==='ar'?'استمع إلى شرح النشاط التفاعلي':'Listen to interactive activity walkthrough');
      vBtn.setAttribute('aria-label',vBtn.title);
      vBtn.innerHTML='<span>🔊</span><span>'+(loc==='ar'?'اشرح صوتياً':'Explain')+'</span>';
      vBtn.setAttribute('onclick','window.CSVoiceTutor&&window.CSVoiceTutor.explainIxBox(this)');
      badgeEl.insertAdjacentElement('afterend',vBtn);
    }
    wrap.appendChild(box);
  });
  var qWrap = sec.querySelector('.ch-quiz-wrap');
  if (qWrap) sec.insertBefore(wrap, qWrap);
  else sec.appendChild(wrap);
  _mjax(wrap);setTimeout(function(){_mjax(wrap);},900);
}

/* Inject every chapter on this page that has data */
function _injectAll(){
  Object.keys(D).forEach(function(id){ _inject(id); });
}
/* Exposed so the i18n module (defined later, outside this IIFE) can trigger
   a re-translate of already-injected widgets when the user toggles locale,
   and test suites can exercise builder functions directly. */
window.ClipSATIX={
  refreshAll:_injectAll,
  _buildNUM:_buildNUM,
  _buildORD:_buildORD,
  _buildCAT:_buildCAT,
  _buildGP:_buildGP,
  _buildSE:_buildSE,
  _buildMS:_buildMS,
  _buildQC:_buildQC,
  _buildMT:_buildMT,
  _buildTF:_buildTF,
  _buildSB:_buildSB,
  _buildSR:_buildSR,
  _buildFN:_buildFN
};

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
  sc.src='/js/ix/'+m[1]+'.js?v=20261026b';
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
