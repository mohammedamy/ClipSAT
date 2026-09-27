(function(){
'use strict';

/* ── helpers ───────────────────────────────────────────────────── */
function esc(s){ return String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }

/* ── AI Settings ────────────────────────────────────────────────────
   Both this exam generator and the Ask Mr. Mohamed chat tutor call
   window._openrouterChatMessages() (defined earlier in this file). By
   default that routes through a signed-in-only Supabase proxy (see the
   "SHARED AI PROVIDER" block above); the only thing a visitor can
   configure here is an optional personal Groq key, which skips signing
   in entirely and calls Groq directly with their own key instead. */
window.openAISettings=function(){
  document.getElementById('aiKey').value=localStorage.getItem('clip_or_key')||'';
  document.getElementById('aiStatus').className='ai-status';
  document.getElementById('aiModal').classList.add('show');
};
window.closeAISettings=function(){ document.getElementById('aiModal').classList.remove('show'); };
window.saveAISettings=function(){
  var k=document.getElementById('aiKey').value.trim();
  if(k){
    localStorage.setItem('clip_or_key',k);
    showAIStatus('Saved! Using your own Groq key.','ok');
  } else {
    localStorage.removeItem('clip_or_key');
    showAIStatus('Cleared — back to the shared AI (requires sign-in).','ok');
  }
  setTimeout(window.closeAISettings,1200);
};
function showAIStatus(msg,cls){
  var el=document.getElementById('aiStatus');
  el.textContent=msg; el.className='ai-status '+cls;
}
window.aiEnabled=function(){ return window._openrouterEnabled?window._openrouterEnabled():false; };

/* AI generates the test when AI is available, unless the visitor picks
   "Question bank" in the .tg-source select (test-generator.njk). Every AI
   question is reviewed (05b-ai-question-verifier.js) before it is shown. */
function aiSourceChosen(btn){
  var box=btn&&btn.closest('.testgen');
  var sel=box&&box.querySelector('.tg-source');
  if(sel&&sel.value==='bank') return false;
  return window.aiEnabled();
}
/* The AI exam pipeline — AI tests and papers (05a), review (05b), blueprints (05c),
   assembler (05d) — ships as
   public/js/ai-exam.js and loads the first time an AI test or paper is generated
   (Plan 5 Phase 5.015, ADR 0037). Touching a test generator warms the load. */
var _aiExamPromise=null;
window._ensureAIExam=function(){
  if(window.CSAITest&&window.ClipSATAssembler&&window.ClipSATBlueprints&&window.ClipSATVerifyAI&&window.CSBankExam) return Promise.resolve();
  if(_aiExamPromise) return _aiExamPromise;
  /* the AI pipeline reads window.examSpecs, which ships in bank-exam.js (ADR 0042) */
  _aiExamPromise=window._ensureBankExam().then(function(){ return new Promise(function(resolve,reject){
    var s=document.createElement('script');
    s.src='/js/ai-exam.js';
    s.onload=function(){ (window.ClipSATAssembler&&window.CSAITest)?resolve():reject(new Error('ai-exam.js did not register')); };
    s.onerror=function(){ reject(new Error('The exam generator could not load. Check your connection and try again.')); };
    document.head.appendChild(s);
  }); }).catch(function(err){ _aiExamPromise=null; throw err; });
  return _aiExamPromise;
};
['pointerdown','focusin'].forEach(function(ev){
  document.addEventListener(ev,function(e){
    if(!window.ClipSATAssembler&&e.target&&e.target.closest&&e.target.closest('.testgen')&&window.aiEnabled&&window.aiEnabled())
      window._ensureAIExam().catch(function(){});
  },true);
});
/* The SVG figure renderers (window.renderMathFigure) ship in public/js/figures.js
   (02c-figures.js) with 02's _renderFig, and load on demand (ADR 0045). */

/* ── genTest: the question bank here; the AI path lives in 05a-ai-test.js, which ships
   inside public/js/ai-exam.js and loads the first time an AI test is generated (ADR 0041). ── */
function _runAI(btn,run){
  var out=btn.closest('.testgen')&&btn.closest('.testgen').querySelector('.tg-out');
  if(out&&!window.CSAITest) out.innerHTML='<div class="ai-gen-loading"><div class="ai-spinner"></div><p>Loading the exam generator…</p></div>';
  return window._ensureAIExam().then(run).catch(function(err){
    if(out) out.innerHTML='<p class="tg-empty" style="color:#dc2626">Error: '+esc(err.message)+'</p>';
  });
}
window.genTest=function(btn){
  var box=btn.closest('.testgen'); if(!box) return;
  if(!aiSourceChosen(btn)) return _genTestOriginal(btn);
  return _runAI(btn,function(){ return window.CSAITest.genTest(btn); });
};

// Keep original as fallback
function _genTestOriginal(btn){
  var box=btn.closest('.testgen'); if(!box) return;
  var view=btn.closest('main[id^="view-"]'); if(!view) return;
  var practice=view.querySelector('section[id$="-practice"]'); if(!practice) return;
  var pool=Array.prototype.slice.call(practice.querySelectorAll('.problem'));
  var n=parseInt(box.querySelector('.tg-count').value,10)||10;
  var lvl=box.querySelector('.tg-level').value;
  var filtered=(lvl==='all')?pool.slice():pool.filter(function(p){var L=p.querySelector('.lvl');return L&&L.textContent.trim().toLowerCase()===lvl.toLowerCase();});
  if(!filtered.length) filtered=pool.slice();
  // shuffle
  for(var i=filtered.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1));var t=filtered[i];filtered[i]=filtered[j];filtered[j]=t;}
  /* no repeated questions or ideas in one test (05e-redundancy-check.js) */
  var _ideas=window.ClipSATRedundancy?window.ClipSATRedundancy.tracker():null, pick=[];
  for(var _i=0;_i<filtered.length&&pick.length<n;_i++){
    var _body=filtered[_i].cloneNode(true); var _sol=_body.querySelector('.sol'); if(_sol) _sol.remove();
    if(!_ideas||_ideas.add(_body.textContent)) pick.push(filtered[_i]);
  }
  var out=box.querySelector('.tg-out'); out.innerHTML='';
  var head=document.createElement('div'); head.className='tg-head';
  var lvlLabel=(lvl==='all'?'all levels':lvl);
  head.innerHTML='<span class="tg-title">Generated test</span><span class="tg-meta">'+pick.length+' question'+(pick.length===1?'':'s')+' · '+lvlLabel+'</span>';
  out.appendChild(head);
  if(!pick.length){var e=document.createElement('p');e.className='tg-empty';e.textContent='No questions match that filter.';out.appendChild(e);return;}
  var _csCaptureQ=[];
  pick.forEach(function(p,idx){
    var c=p.cloneNode(true);c.classList.remove('open');
    var pn=c.querySelector('.pn');if(pn) pn.textContent=(idx+1);
    var st=c.querySelector('.sol-toggle');
    if(st){var tw=st.querySelector('.tw');if(tw) tw.textContent='▸';if(st.childNodes[1]) st.childNodes[1].textContent=' Show solution';}
    out.appendChild(c);
    /* Google Forms/Classroom capture — this legacy path never has MCQ
       choices/answers, only a free-text prompt + worked solution, so every
       question is captured as ungraded FRQ. See public/js/quiz-capture-ui.js
       for the honest "short-answer, no auto-grading" fallback this enables. */
    var pq=c.querySelector('.pq');
    _csCaptureQ.push({text:pq?pq.textContent:'',choices:[],correctIndex:null,type:'frq',points:1});
  });
  var ans=box.querySelector('.tg-ans');if(ans){ans.setAttribute('data-state','hidden');ans.textContent='Show all answers';}
  if(window.MathJax&&MathJax.typesetPromise) MathJax.typesetPromise([out]);
  out.scrollIntoView({behavior:'smooth',block:'nearest'});
  if(pick.length) document.dispatchEvent(new CustomEvent('clipsat:quiz-ready',{detail:{source:'genTest-legacy',title:'Generated test',trackId:(view&&view.id.replace('view-',''))||'',questions:_csCaptureQ,outEl:out}}));
}

/* ── tgReveal override (works with AI questions too) ── */
window.tgReveal=function(btn){
  var box=btn.closest('.testgen');
  var out=box.querySelector('.tg-out');
  var show=btn.getAttribute('data-state')!=='shown';
  // Standard problems
  out.querySelectorAll('.problem').forEach(function(p){
    p.classList.toggle('open',show);
    var st=p.querySelector('.sol-toggle');if(st&&st.childNodes[1]) st.childNodes[1].textContent=' '+(show?'Hide solution':'Show solution');
  });
  // AI questions
  out.querySelectorAll('.aiq-solution').forEach(function(sol){
    sol.classList.toggle('open',show);
    var tb=sol.previousElementSibling;
    if(tb&&tb.classList.contains('aiq-sol-toggle')) tb.textContent=show?'▾ Hide solution':'▸ Show solution';
  });
  btn.setAttribute('data-state',show?'shown':'hidden');
  btn.textContent=show?'Hide all answers':'Show all answers';
  if(show&&window.MathJax&&MathJax.typesetPromise) MathJax.typesetPromise([out]).catch(function(){});
};

/* ── genFullExam: the question bank in 02; the AI path in 05a-ai-test.js ───────────────────────── */
var _origGenFullExam=window.genFullExam;
window.genFullExam=function(btn,examName,viewId,sectionTitles,qPerSection){
  if(!aiSourceChosen(btn)) return _origGenFullExam&&_origGenFullExam(btn,examName,viewId,sectionTitles,qPerSection);
  return _runAI(btn,function(){ return window.CSAITest.genFullExam(btn,examName,viewId,sectionTitles,qPerSection); });
};

/* ── Show AI badge in nav when enabled ───────────────── */
(function(){
  var btn=document.querySelector('.ai-settings-btn');
  if(!btn) return;
  btn.textContent='⚙ AI ✓';
  btn.style.background='linear-gradient(135deg,#16a34a,#0891b2)';
})();

})(); // end IIFE

/* ─────────────────────────────────────────────── */

