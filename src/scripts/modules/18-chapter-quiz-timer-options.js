(function(){
  /* Time options: [label, seconds] */
  var TIME_OPTS=[
    ['No limit', 0],
    ['5 min',  300],
    ['10 min', 600],
    ['15 min', 900],
    ['20 min',1200],
    ['30 min',1800],
    ['45 min',2700],
    ['1 hour',3600],
    ['1.5 h', 5400],
    ['2 hours',7200]
  ];

  /* Inject selector into every quiz bar */
  function injectTimerSelectors(){
    document.querySelectorAll('.ch-quiz-bar').forEach(function(bar){
      if(bar.querySelector('.cq-time-sel-wrap')) return; /* already done */
      var wrap = document.createElement('label');
      wrap.className = 'cq-time-sel-wrap';
      wrap.innerHTML = 'Timer ';
      var sel = document.createElement('select');
      sel.className = 'cq-timer-sel';
      TIME_OPTS.forEach(function(o){
        var opt = document.createElement('option');
        opt.value = o[1];
        opt.textContent = o[0];
        sel.appendChild(opt);
      });
      wrap.appendChild(sel);
      /* insert before the Generate button (btn is nested inside
         .ch-quiz-controls, not a direct child of bar, so insert
         relative to its real parent) */
      var btn = bar.querySelector('.cq-btn');
      if(btn && btn.parentNode) btn.parentNode.insertBefore(wrap, btn);
      else bar.appendChild(wrap);
    });
  }

  /* Active timer state */
  var _cqTimer = null;  /* interval */
  var _cqSecs  = 0;
  var _cqTotal = 0;

  function clearCqTimer(){
    if(_cqTimer){ clearInterval(_cqTimer); _cqTimer=null; }
  }

  function startCqTimer(out, secs){
    clearCqTimer();
    _cqSecs  = secs;
    _cqTotal = secs;

    /* Build timer bar at the top of the quiz output */
    var bar = document.createElement('div');
    bar.className = 'cq-timer-bar';
    bar.id = 'cq-active-timer';
    bar.innerHTML = '<span>&#9201; Time remaining:</span>'
      + '<span class="cq-timer-digits" id="cq-tdigits"></span>'
      + '<div class="cq-timer-track"><div class="cq-timer-fill" id="cq-tfill" style="width:100%"></div></div>';
    var paper = out.querySelector('.cq-paper');
    if(paper) paper.insertBefore(bar, paper.firstChild);

    function tick(){
      _cqSecs--;
      var m=Math.floor(Math.max(0,_cqSecs)/60), s=Math.max(0,_cqSecs)%60;
      var digs = document.getElementById('cq-tdigits');
      var fill = document.getElementById('cq-tfill');
      var tbar = document.getElementById('cq-active-timer');
      if(digs) digs.textContent = (m<10?'0':'')+m+':'+(s<10?'0':'')+s;
      if(fill) fill.style.width = Math.max(0,(_cqSecs/_cqTotal*100))+'%';
      if(tbar && _cqSecs <= 60) tbar.classList.add('warn');
      if(_cqSecs <= 0){
        clearCqTimer();
        /* auto-lock: mark all unanswered items */
        out.querySelectorAll('.cq-item:not(.cq-done)').forEach(function(item){
          item.classList.add('cq-done');
          var ans=parseInt(item.getAttribute('data-ans'),10);
          var opts=item.querySelectorAll('.cq-opt');
          if(opts[ans]) opts[ans].classList.add('cq-correct');
          item.querySelectorAll('.cq-opt').forEach(function(o){o.style.pointerEvents='none';});
          var sol=item.querySelector('.cq-sol-box');
          if(sol) sol.style.display='block';
        });
        if(tbar){ tbar.style.background='#7f1d1d'; tbar.innerHTML='<span>&#9201; Time\'s up! Exam auto-submitted.</span>'; }
        /* recalculate score */
        var paper2=out.querySelector('.cq-paper');
        if(paper2){
          var total2=paper2.querySelectorAll('.cq-item').length;
          var correct2=paper2.querySelectorAll('.cq-item.cq-done .cq-correct:not(.cq-wrong)').length;
          var sv=paper2.querySelector('.cq-sv');
          if(sv) sv.textContent=correct2;
          var av=paper2.querySelector('.cq-ans-v');
          if(av) av.textContent=total2;
        }
      }
    }
    tick(); /* immediate first tick display */
    _cqTimer = setInterval(tick, 1000);
  }

  /* Patch genChapterQuiz to start timer after rendering */
  var _origGenCQ = window.genChapterQuiz;
  window.genChapterQuiz = function(btn){
    clearCqTimer(); /* cancel any running timer */
    _origGenCQ(btn);
    /* read timer value */
    var bar = btn.closest('.ch-quiz-bar');
    var sel = bar && bar.querySelector('.cq-timer-sel');
    var secs = sel ? parseInt(sel.value,10) : 0;
    if(secs > 0){
      var wrap = btn.closest('.ch-quiz-wrap');
      var out  = wrap && wrap.querySelector('.cq-out');
      if(out){
        /* Wait for MathJax render then start */
        setTimeout(function(){ startCqTimer(out, secs); }, 600);
      }
    }
  };

  /* Run on load + after every showView (navigation) */
  function init(){
    injectTimerSelectors();
  }
  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded', init);
  } else {
    setTimeout(init, 300);
  }
  /* Re-inject after view changes */
  var _origSV = window.showView;
  window.showView = function(name){
    if(_origSV) _origSV(name);
    setTimeout(injectTimerSelectors, 300);
  };
})();

/* ─────────────────────────────────────────────── */

/* ═══ ClipSAT Interactive Activities Engine v1.0 ═══ */
