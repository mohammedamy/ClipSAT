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
  'ix.sr.showFirst':'Show first step ▸','ix.sr.showNext':'Show next step ▸ ({n}/{m})','ix.sr.restart':'↺ Restart','ix.sr.showAll':'Reveal all steps',
  'ix.sr.predictPrompt':'Think: what is the next step?',
  'ix.mt.allMatched':'🎉 All pairs matched!',
  'ix.badge.tf':'True / False','ix.tf.trueCorrect':'✓ True — ','ix.tf.falseCorrect':'✓ False — ','ix.tf.true':'True','ix.tf.false':'False',
  'ix.badge.sb':'Step Builder','ix.sb.hintPrefix':'Hint: ','ix.sb.checkAnswers':'Check Answers','ix.sb.showAnswers':'Show answers',
  'ix.sb.allCorrect':'✓ All {n} steps correct!','ix.sb.someCorrect':'{ok}/{total} correct. Hints: ','ix.sb.stepN':'Step {n}: ',
  'ix.badge.num':'Numeric Entry','ix.num.check':'Check Answer','ix.num.showSol':'Show Solution','ix.num.hintPrefix':'Hint: ','ix.num.correct':'✓ Correct!','ix.num.incorrect':'✗ Incorrect. ','ix.num.close':'Almost! Check precision or rounding. ',
  'ix.badge.ord':'Order the Steps','ix.ord.check':'Check Order','ix.ord.allCorrect':'✓ Steps are in the correct sequence!','ix.ord.someCorrect':'{n} of {total} steps in the correct position.','ix.ord.showCorrect':'Show Correct Order','ix.ord.moveUp':'Move Up','ix.ord.moveDown':'Move Down',
  'ix.badge.cat':'Categorize','ix.cat.check':'Check Categories','ix.cat.allCorrect':'✓ All items correctly categorized!','ix.cat.someCorrect':'{n} of {total} items correctly placed.','ix.cat.showCorrect':'Show Correct Placement'};
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
      var whyText=(cfg.why&&cfg.why[item.origIdx])?('<em>'+cfg.why[item.origIdx]+'</em><br>'):'';
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

function _buildSB(cfg,box){
  box.innerHTML='<span class="ix-badge sb">'+_t('ix.badge.sb')+'</span>';
  var h=document.createElement('h3');h.innerHTML=_loc(cfg,'ti');box.appendChild(h);
  var inps=[];
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
    var body=document.createElement('div');body.className='ix-sr-body';body.innerHTML=stepsArr[idx];
    d.appendChild(n);d.appendChild(body);steps.appendChild(d);
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
}

function _buildORD(cfg,box){
  box.innerHTML='<span class="ix-badge ord">'+_t('ix.badge.ord')+'</span>';
  var h=document.createElement('h3');h.innerHTML=_loc(cfg,'ti');box.appendChild(h);
  if(cfg.q){
    var p=document.createElement('p');p.style.cssText='margin:.3rem 0 .65rem;font-size:.9rem';
    p.innerHTML=_loc(cfg,'q');box.appendChild(p);
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
  if(cfg.q){
    var p=document.createElement('p');p.style.cssText='margin:.3rem 0 .65rem;font-size:.9rem';
    p.innerHTML=_loc(cfg,'q');box.appendChild(p);
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
    var stmt=document.createElement('div');stmt.className='ix-cat-stmt';stmt.innerHTML=item.s;
    var pills=document.createElement('div');pills.className='ix-cat-pills';
    pills.setAttribute('role','group');
    pills.setAttribute('aria-label',String(item.s).replace(/<[^>]*>/g,'').trim()||('Item '+(iIdx+1)));

    cats.forEach(function(catName,cIdx){
      var btn=document.createElement('button');btn.type='button';btn.className='ix-cat-pill';
      btn.innerHTML=catName;btn.setAttribute('aria-pressed','false');
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

  _mjax(listWrap);

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
    if(correct===items.length){
      isFinished=true;
      res.className='ix-fb ok';
      res.innerHTML=_t('ix.cat.allCorrect');
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
    res.innerHTML=_t('ix.cat.allCorrect');
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
  var xStep=_niceStep(xSpan,7);
  var yStep=_niceStep(ySpan,5);

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
      var lab=document.createElement('label');lab.innerHTML=p.label+': <b class="ix-fn-val">'+p.default+'</b>';
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
   a re-translate of already-injected widgets when the user toggles locale,
   and test suites can exercise builder functions directly. */
window.ClipSATIX={
  refreshAll:_injectAll,
  _buildNUM:_buildNUM,
  _buildORD:_buildORD,
  _buildCAT:_buildCAT,
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
