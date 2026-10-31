(function(){
  /* ── CSS ── */
  var CSS=[
    '.ia-wrap{background:var(--paper-2,#f1f5f9);border:1.5px solid var(--line,#e2e8f0);border-radius:10px;padding:16px 18px;margin:12px 0;font-family:var(--sans,system-ui)}',
    '.ia-title{font-size:.9rem;font-weight:700;color:var(--indigo-700,#3730a3);margin:0 0 10px;letter-spacing:.02em}',
    '.ia-prompt{font-size:.82rem;color:var(--muted,#6b7280);margin:0 0 10px}',
    /* Fill-in-the-blank */
    '.ia-fib-wrap{display:flex;flex-direction:column;gap:10px}',
    '.ia-fib-item{display:flex;align-items:center;gap:8px;flex-wrap:wrap;font-size:.93rem}',
    '.ia-fib-input{border:2px solid var(--line,#e2e8f0);border-radius:6px;padding:4px 8px;font-size:.93rem;width:120px;max-width:100%;font-family:inherit;background:var(--paper,#fff);color:var(--ink,#111)}',
    '.ia-fib-input:focus{border-color:var(--indigo,#4f46e5);outline:none}',
    '.ia-fib-input.ia-correct{border-color:#16a34a;background:rgba(22,163,74,.12)}',
    '.ia-fib-input.ia-wrong{border-color:#ef4444;background:rgba(239,68,68,.12)}',
    /* Match */
    '.ia-match-wrap{display:grid;grid-template-columns:1fr 1fr;gap:8px}',
    '@media(max-width:520px){.ia-match-wrap{grid-template-columns:1fr}}',
    '.ia-match-col{display:flex;flex-direction:column;gap:6px}',
    '.ia-match-item{padding:8px 12px;border:2px solid var(--line,#e2e8f0);border-radius:8px;font-size:.85rem;cursor:pointer;background:var(--paper,#fff);color:var(--ink,#111);transition:border-color .15s,background .15s;user-select:none}',
    '.ia-match-item:focus-visible{outline:2px solid var(--indigo,#4f46e5);outline-offset:2px}',
    '.ia-match-item.ia-selected{border-color:var(--indigo,#4f46e5);background:rgba(79,70,229,.12)}',
    '.ia-match-item.ia-matched{border-color:#16a34a;background:rgba(22,163,74,.14);cursor:default}',
    '.ia-match-item.ia-wrong-match{border-color:#ef4444;background:rgba(239,68,68,.14)}',
    /* Buttons + feedback */
    '.ia-btn{margin-top:10px;padding:7px 18px;background:var(--indigo,#4f46e5);color:#fff;border:none;border-radius:8px;cursor:pointer;font-size:.85rem;font-weight:600;font-family:inherit}',
    '.ia-btn:hover{background:var(--indigo-700,#3730a3)}',
    '.ia-feedback{margin-top:8px;font-size:.82rem;font-weight:600;padding:6px 12px;border-radius:7px}',
    '.ia-feedback.ia-pass{background:rgba(22,163,74,.16);color:var(--ink,#166534)}',
    '.ia-feedback.ia-fail{background:rgba(239,68,68,.16);color:var(--ink,#991b1b)}'
  ].join('');
  var sty=document.createElement('style'); sty.id='ia-engine-css'; sty.textContent=CSS;
  document.head.appendChild(sty);

  function _norm(s){ return String(s||'').trim().toLowerCase().replace(/[^a-z0-9.+\-]/g,''); }

  /* ── Fill-in-the-blank renderer ── */
  function renderFIB(el){
    var title=el.dataset.title||'Fill in the Blanks';
    var prompt=el.dataset.prompt||'Complete each expression:';
    var pairsRaw=(el.dataset.pairs||'').split('|').map(function(p){return p.split('::');}).filter(function(p){return p.length>=2;});
    if(!pairsRaw.length) return;
    var html='<div class="ia-wrap"><p class="ia-title">✏️ '+title+'</p>'
      +'<p class="ia-prompt">'+prompt+'</p><div class="ia-fib-wrap">';
    pairsRaw.forEach(function(p,i){
      html+='<div class="ia-fib-item">'
        +'<span>'+p[0]+'</span>'
        +'<input class="ia-fib-input" type="text" data-ans="'+p[1].trim()+'" data-idx="'+i+'" placeholder="?">'
        +'</div>';
    });
    html+='</div><button class="ia-btn ia-check-fib" type="button">Check Answers</button>'
      +'<div class="ia-feedback" style="display:none"></div></div>';
    el.outerHTML=html;
  }

  /* ── Matching renderer ── */
  function renderMatch(el){
    var title=el.dataset.title||'Matching';
    var prompt=el.dataset.prompt||'Match each item on the left to its pair on the right.';
    var pairsRaw=(el.dataset.pairs||'').split('|').map(function(p){return p.split('::');}).filter(function(p){return p.length>=2;});
    if(!pairsRaw.length) return;
    /* Shuffle right column */
    var leftItems=pairsRaw.map(function(p,i){return {text:p[0].trim(),pairIdx:i};});
    var rightItems=pairsRaw.map(function(p,i){return {text:p[1].trim(),pairIdx:i};});
    function shuf(a){var b=a.slice();for(var i=b.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1));var t=b[i];b[i]=b[j];b[j]=t;}return b;}
    rightItems=shuf(rightItems);
    var uid='ia-m-'+Math.random().toString(36).slice(2);
    var lHtml=leftItems.map(function(it){return '<div class="ia-match-item ia-left" role="button" tabindex="0" data-uid="'+uid+'" data-pair="'+it.pairIdx+'" data-side="left">'+it.text+'</div>';}).join('');
    var rHtml=rightItems.map(function(it){return '<div class="ia-match-item ia-right" role="button" tabindex="0" data-uid="'+uid+'" data-pair="'+it.pairIdx+'" data-side="right">'+it.text+'</div>';}).join('');
    var html='<div class="ia-wrap"><p class="ia-title">🔗 '+title+'</p>'
      +'<p class="ia-prompt">'+prompt+'</p>'
      +'<div class="ia-match-wrap">'
      +'<div class="ia-match-col">'+lHtml+'</div>'
      +'<div class="ia-match-col">'+rHtml+'</div>'
      +'</div>'
      +'<button class="ia-btn ia-reset-match" type="button">↺ Reset</button>'
      +'<div class="ia-feedback" style="display:none"></div></div>';
    el.outerHTML=html;
  }

  /* ── Render all interactive blocks ── */
  function _render(){
    document.querySelectorAll('.ia-fib:not(.ia-done)').forEach(function(el){el.classList.add('ia-done');renderFIB(el);});
    document.querySelectorAll('.ia-match:not(.ia-done)').forEach(function(el){el.classList.add('ia-done');renderMatch(el);});
  }

  /* ── Event delegation for FIB check & Match ── */
  function _handleMatchSelect(itemEl){
    if(!itemEl||itemEl.classList.contains('ia-matched')) return;
    var uid=itemEl.dataset.uid;
    var side=itemEl.dataset.side;
    var otherSide=side==='left'?'right':'left';
    var otherSel=document.querySelector('.ia-match-item[data-uid="'+uid+'"][data-side="'+otherSide+'"].ia-selected');
    if(otherSel){
      var leftEl=side==='left'?itemEl:otherSel;
      var rightEl=side==='right'?itemEl:otherSel;
      leftEl.classList.remove('ia-selected','ia-wrong-match');
      rightEl.classList.remove('ia-selected','ia-wrong-match');
      if(leftEl.dataset.pair===rightEl.dataset.pair){
        leftEl.classList.add('ia-matched'); rightEl.classList.add('ia-matched');
        var wrap=leftEl.closest('.ia-wrap');
        var all=wrap.querySelectorAll('.ia-match-item[data-side="left"]');
        var matched=wrap.querySelectorAll('.ia-match-item[data-side="left"].ia-matched');
        if(matched.length===all.length){
          var fb=wrap.querySelector('.ia-feedback');
          fb.style.display=''; fb.className='ia-feedback ia-pass';
          fb.textContent='✓ Perfect! All pairs matched correctly.';
        }
      } else {
        leftEl.classList.add('ia-wrong-match'); rightEl.classList.add('ia-wrong-match');
        setTimeout(function(){leftEl.classList.remove('ia-wrong-match');rightEl.classList.remove('ia-wrong-match');},700);
      }
    } else {
      document.querySelectorAll('.ia-match-item[data-uid="'+uid+'"][data-side="'+side+'"].ia-selected').forEach(function(el){el.classList.remove('ia-selected');});
      itemEl.classList.add('ia-selected');
    }
  }

  document.addEventListener('click',function(e){
    if(!e.target||typeof e.target.closest!=='function') return;
    /* FIB check */
    var fibBtn=e.target.closest('.ia-check-fib');
    if(fibBtn){
      var wrap=fibBtn.closest('.ia-wrap');
      var inputs=wrap.querySelectorAll('.ia-fib-input');
      var correct=0;
      inputs.forEach(function(inp){
        inp.classList.remove('ia-correct','ia-wrong');
        if(window.ClipSATAnswerCheck?ClipSATAnswerCheck.equivalent(inp.value,inp.dataset.ans):_norm(inp.value)===_norm(inp.dataset.ans)){inp.classList.add('ia-correct');correct++;}
        else inp.classList.add('ia-wrong');
      });
      var fb=wrap.querySelector('.ia-feedback');
      fb.style.display='';
      if(correct===inputs.length){fb.className='ia-feedback ia-pass';fb.textContent='✓ All correct! Great work.';}
      else {fb.className='ia-feedback ia-fail';fb.textContent='✗ '+correct+' / '+inputs.length+' correct — check highlighted fields.';}
      return;
    }
    /* Match select */
    var matchItem=e.target.closest('.ia-match-item');
    if(matchItem){
      _handleMatchSelect(matchItem);
      return;
    }
    /* Match reset */
    var rstBtn=e.target.closest('.ia-reset-match');
    if(rstBtn){
      var wrapR=rstBtn.closest('.ia-wrap');
      wrapR.querySelectorAll('.ia-match-item').forEach(function(el){el.classList.remove('ia-selected','ia-matched','ia-wrong-match');});
      var fbR=wrapR.querySelector('.ia-feedback'); if(fbR) fbR.style.display='none';
    }
  });
  document.addEventListener('keydown',function(e){
    if(!e.target||typeof e.target.closest!=='function') return;
    if(e.key==='Enter'||e.key===' '){
      var matchItem=e.target.closest('.ia-match-item');
      if(matchItem){e.preventDefault();_handleMatchSelect(matchItem);}
    } else if(e.key==='Enter'&&e.target.classList&&e.target.classList.contains('ia-fib-input')){
      var wrap=e.target.closest('.ia-wrap');
      var btn=wrap&&wrap.querySelector('.ia-check-fib');
      if(btn)btn.click();
    }
  });

  /* ── Re-render on chapter change ── */
  new MutationObserver(function(muts){
    muts.forEach(function(m){
      if(m.type==='attributes'&&m.attributeName==='class'){
        var el=m.target;
        if(el.classList.contains('chapter')&&el.classList.contains('ch-active')) _render();
      }
    });
  }).observe(document.body,{attributes:true,subtree:true,attributeFilter:['class']});

  window.CSInteractive = { render: _render };
  _render();
}());

/* ─────────────────────────────────────────────── */

