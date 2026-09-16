(function(){
var _tmr=null,_secs=0;
var PAPERS={
  aslevel:[
    {name:'Paper 1 — Pure Maths 1',minutes:105,domains:['pure','algebra','quadratic','polynomial','trigonometry','logarithm','coordinate','sequence','series','differentiation','integration','function','binomial theorem','completing','parametric','surds']},
    {name:'Paper 4 — Mechanics 1',minutes:75,domains:['mechanic','forces','newton','energy','kinematics','work','power','friction','equilibrium','momentum']},
    {name:'Paper 5 — Statistics 1',minutes:75,domains:['statistic','normal','binomial','permutation','combination','representation','data','probability','discrete random','drv','sampling','hypothesis']}
  ],
  a2level:[
    {name:'Paper 3 — Pure Maths 3',minutes:110,domains:['pure','complex','vector','differential equation','integration','series','numerical','maclaurin','parametric','polar','hyperbolic','algebra','trigonometry']},
    {name:'Paper 6 — Statistics 2',minutes:75,domains:['poisson','continuous random','sampling','hypothesis','estimation','distribution']}
  ]
};
window.openMockExam=function(viewId,pidx){
  var bank=window.fullExamBank&&window.fullExamBank[viewId];
  if(!bank){alert('No question bank for this course.');return;}
  var papers=PAPERS[viewId]||[{name:'Mock Exam',minutes:60}];
  var paper=papers[pidx||0];
  var domainFilter=paper.domains||null;
  var allPool=(bank.pool||[]).slice();
  // Filter to relevant domains for this paper
  var pool=allPool;
  if(domainFilter && domainFilter.length){
    var filtered=allPool.filter(function(q){
      var d=(q.domain||'').toLowerCase();
      return domainFilter.some(function(f){return d.indexOf(f.toLowerCase())!==-1;});
    });
    pool=filtered.length>=4?filtered:allPool; // fallback if too few
  }
  for(var i=pool.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1));var t=pool[i];pool[i]=pool[j];pool[j]=t;}
  pool=pool.slice(0,Math.min(12,pool.length));
  pool=pool.map(function(q){return window._shuffleQ?window._shuffleQ(q):q;}); /* randomize correct-answer position */
  if(!pool.length){alert('No questions available.');return;}
  document.getElementById('mock-exam-title').textContent=paper.name;
  _secs=paper.minutes*60;
  var body=document.getElementById('mock-exam-body');
  var h='';
  pool.forEach(function(q,i){
    h+='<div class="mock-q"><div class="mq-num">Question '+(i+1)+' of '+pool.length+'</div>';
    h+='<div class="mq-text">'+(q.text||q.q||'')+'</div>';
    if(q.choices&&q.choices.length){
      q.choices.forEach(function(c,ci){
        var s=String(c||'');
        if(s.indexOf('\\(')===-1&&s.indexOf('\\[')===-1&&/\\[a-zA-Z{([\\]/.test(s)){s='\\('+s+'\\)';}
        h+='<label style="display:block;padding:4px 0;cursor:pointer"><input type="radio" name="mq'+i+'" value="'+ci+'"> '+s+'</label>';
      });
    } else {
      h+='<textarea placeholder="Write your solution here..."></textarea>';
    }
    h+='</div>';
  });
  body.innerHTML=h;
  body.setAttribute('data-pool',JSON.stringify(pool.map(function(q){return {answer:q.answer,sol:q.sol||''};})));
  document.getElementById('mock-exam-overlay').classList.add('show');
  if(window.MathJax&&MathJax.typesetPromise)MathJax.typesetPromise([body]).catch(function(){});
  if(_tmr)clearInterval(_tmr);
  _renderTimer();
  _tmr=setInterval(function(){_secs--;_renderTimer();if(_secs<=0){clearInterval(_tmr);submitMockExam();}},1000);
};
function _renderTimer(){
  var el=document.getElementById('mock-exam-timer');if(!el)return;
  var m=Math.floor(Math.max(0,_secs)/60),s=Math.max(0,_secs)%60;
  el.textContent=(m<10?'0':'')+m+':'+(s<10?'0':'')+s;
  el.style.color=_secs<300?'#fca5a5':'#fff';
}
window.submitMockExam=function(){
  if(_tmr){clearInterval(_tmr);_tmr=null;}
  var body=document.getElementById('mock-exam-body');
  var pool=JSON.parse(body.getAttribute('data-pool')||'[]');
  var qs=body.querySelectorAll('.mock-q'),correct=0;
  qs.forEach(function(qEl,i){
    var meta=pool[i]||{};
    var radios=qEl.querySelectorAll('input[type=radio]');
    if(radios.length){
      var chosen=-1;radios.forEach(function(r){if(r.checked)chosen=parseInt(r.value,10);});
      if(chosen===meta.answer)correct++;
      if(meta.sol)qEl.innerHTML+='<div style="margin-top:8px;padding:8px;background:#f0fdf4;border-radius:6px;font-size:.82rem"><strong>Solution:</strong> '+meta.sol+'</div>';
    }
  });
  var title=document.getElementById('mock-exam-title');
  if(title)title.textContent+=' — Score: '+correct+'/'+qs.length;
  document.getElementById('mock-exam-footer').innerHTML='<button class="mock-exit-btn" onclick="exitMockExam()">Close</button>';
  if(window.MathJax&&MathJax.typesetPromise)MathJax.typesetPromise([body]).catch(function(){});
};
window.exitMockExam=function(){if(_tmr){clearInterval(_tmr);_tmr=null;}document.getElementById('mock-exam-overlay').classList.remove('show');};

window.addEventListener('load',function(){
  var viewPapers={aslevel:['Paper 1 — Pure Maths 1','Paper 4 — Mechanics','Paper 5 — Statistics 1'],a2level:['Paper 3 — Pure Maths 3','Paper 6 — Statistics 2']};
  Object.keys(viewPapers).forEach(function(vid){
    var sec=document.getElementById(vid==='aslevel'?'as-about':'a2l-about');
    if(!sec)return;
    var wrap=sec.querySelector('.subject-cta')||sec.querySelector('p');if(!wrap)return;
    var div=document.createElement('div');div.style.cssText='display:flex;gap:8px;flex-wrap:wrap;margin-top:12px';
    viewPapers[vid].forEach(function(name,idx){
      var btn=document.createElement('button');
      btn.textContent='📝 Sit: '+name;
      btn.style.cssText='padding:6px 14px;border:1.5px solid var(--indigo);border-radius:8px;background:rgba(30,58,110,.08);color:var(--indigo);cursor:pointer;font-size:.8rem;font-weight:600';
      btn.onclick=function(){openMockExam(vid,idx);};
      div.appendChild(btn);
    });
    wrap.after(div);
  });
});
})();

/* ─────────────────────────────────────────────── */

/* ═══════════════════════════════════════════
   GLOBAL QUIZ TIMER — injects into all quiz bars
   ═══════════════════════════════════════════ */
