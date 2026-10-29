(function(){
'use strict';

/* ── 60: EXAM DATE COUNTDOWN ── */
var EXAM_KEY='clipsat_exam_date';
function _daysTo(d){if(!d)return null;var dt=new Date(d),now=new Date();now.setHours(0,0,0,0);return Math.ceil((dt-now)/86400000);}
function _renderCountdown(){
  var bar=document.getElementById('exam-countdown-bar');if(!bar)return;
  var date=localStorage.getItem(EXAM_KEY),days=_daysTo(date);
  if(days===null){bar.classList.remove('show');return;}
  bar.classList.add('show');
  if(days<0){bar.innerHTML='<span>Your exam was <b>'+Math.abs(days)+'</b> days ago</span><button onclick="openExamDateModal()">Update</button><button onclick="clearExamDate()">\xd7</button>';return;}
  if(days===0){bar.innerHTML='<span>★ Exam day! Good luck! ★</span>';return;}
  bar.innerHTML='<span>Exam in <b>'+days+'</b> day'+(days!==1?'s':'')+' — '+date+'</span>'
    +'<button onclick="openStudyPlanner()">📋 Plan</button>'
    +'<button onclick="openExamDateModal()">Edit</button>'
    +'<button onclick="clearExamDate()" style="opacity:.6">\xd7</button>';
}
function openExamDateModal(){var m=document.getElementById('exam-date-modal');var inp=document.getElementById('exam-date-input');if(inp){var ex=localStorage.getItem(EXAM_KEY);if(ex)inp.value=ex;}if(m)m.classList.add('show');}
function closeExamDateModal(){var m=document.getElementById('exam-date-modal');if(m)m.classList.remove('show');}
window.openExamDateModal=openExamDateModal;
window.closeExamDateModal=closeExamDateModal;
window.saveExamDate=function(){var inp=document.getElementById('exam-date-input');if(inp&&inp.value){localStorage.setItem(EXAM_KEY,inp.value);_renderCountdown();}closeExamDateModal();};
window.clearExamDate=function(){localStorage.removeItem(EXAM_KEY);_renderCountdown();};

/* ── 61: DAILY GOAL ── */
var DG_KEY='clipsat_daily_goal',DG_TODAY_KEY='clipsat_dg_today',DG_STREAK_KEY='clipsat_dg_streak',DG_LAST_KEY='clipsat_dg_last';
var _dgDismissed=false;
window.dismissDailyGoal=function(){_dgDismissed=true;var bar=document.getElementById('daily-goal-bar');if(bar)bar.style.display='none';};
var _dgGoal=parseInt(localStorage.getItem(DG_KEY)||'10',10);
function _todayStr(){return new Date().toISOString().slice(0,10);}
function _dgToday(){var rec=JSON.parse(localStorage.getItem(DG_TODAY_KEY)||'{}');return rec.date===_todayStr()?rec.count||0:0;}
function _dgStreak(){return parseInt(localStorage.getItem(DG_STREAK_KEY)||'0',10);}
function _recordAnswer(){
  var rec=JSON.parse(localStorage.getItem(DG_TODAY_KEY)||'{}'),today=_todayStr();
  if(rec.date!==today)rec={date:today,count:0};
  rec.count++;
  localStorage.setItem(DG_TODAY_KEY,JSON.stringify(rec));
  if(rec.count>=_dgGoal){
    var yesterday=new Date();yesterday.setDate(yesterday.getDate()-1);
    var yStr=yesterday.toISOString().slice(0,10);
    var streak=_dgStreak(),last=localStorage.getItem(DG_LAST_KEY);
    if(last===yStr||last===null){streak++;localStorage.setItem(DG_STREAK_KEY,streak);localStorage.setItem(DG_LAST_KEY,today);}
  }
  _renderDailyGoal();
}
function _renderDailyGoal(){
  var bar=document.getElementById('daily-goal-bar');if(!bar)return;
  if(_dgDismissed){bar.style.display='none';return;}
  bar.style.display='flex';
  var done=_dgToday(),pct=Math.min(100,Math.round(done/_dgGoal*100)),streak=_dgStreak();
  var isAr=(document.documentElement.lang==='ar')||(window.i18n&&typeof window.i18n.getLocale==='function'&&window.i18n.getLocale()==='ar');
  bar.innerHTML='<span class="dg-label">&#128218; '+(isAr?'اليوم':'Today')+'</span>'
    +'<span class="dg-count">'+done+'/'+_dgGoal+'</span>'
    +'<div class="dg-track"><div class="dg-fill" style="width:'+pct+'%"></div></div>'
    +(done>=_dgGoal?'<span style="color:#16a34a;font-weight:700">&#x2713; '+(isAr?'اكتمل الهدف!':'Goal met!')+'</span>':'')
    +'<span class="dg-streak">'+(streak>0?'&#128293; '+streak+(isAr?' يوم متواصل':' day streak'):'')+'</span>'
    +'<button type="button" onclick="window.CSDailyPlan&&window.CSDailyPlan.open()" style="margin-left:auto;background:#1d4ed8;color:#ffffff;border:none;border-radius:6px;padding:3px 10px;font-weight:700;cursor:pointer">&#128197; '+(isAr?'خطة ١٥ دقيقة':'15-Min Plan')+'</button>'
    +'<button type="button" onclick="setDailyGoal()">'+(isAr?'الهدف: ':'Goal: ')+_dgGoal+'</button>'
    +'<button type="button" onclick="dismissDailyGoal()" title="Dismiss" style="padding:2px 7px;font-size:.85rem;background:transparent;border:1px solid var(--line);border-radius:5px;cursor:pointer;color:var(--muted)">&#x2715;</button>';
}
window.setDailyGoal=function(){var n=parseInt(prompt('Daily question target:',_dgGoal),10);if(n&&n>0){_dgGoal=n;localStorage.setItem(DG_KEY,n);_renderDailyGoal();}};
var _origCqPick=window.cqPick;
window.cqPick=function(el){if(_origCqPick)_origCqPick(el);var item=el.closest('.cq-item');if(item&&!item.classList.contains('_dg_counted')){item.classList.add('_dg_counted');_recordAnswer();}};

/* ── 62: MASTERY MODULE (window.Mastery) ── */
window.Mastery = (function(){

  function levelFor(domain){
    var all=window.ML.getAll();
    var recent=all.filter(function(m){ return m.domain===domain; });
    if(!recent.length) return 0;
    return Math.max(1, 4-Math.min(4, Math.floor(recent.length/3)));
  }

  function weakAreas(n){ return window.ML.weakDomains(n||3); }

  function mistakeQuizPool(n){
    var due=window.ML.dueForReview();
    if(due.length<(n||10)) due=window.ML.getAll();
    return window._shuffle(due).slice(0,n||10).map(function(m){
      var orig=window.QB ? window.QB.getById(m.id) : null;
      if(orig) return orig;
      /* reconstruct minimal question from log */
      var choices=[m.right, m.wrong];
      window._shuffle(choices);
      var ansIdx=choices.indexOf(m.right);
      return {
        id:m.id, viewId:m.viewId, type:'mcq', domain:m.domain,
        difficulty:'review', text:m.q, choices:choices,
        answer:ansIdx>=0?ansIdx:0, sol:'Correct answer: '+m.right, src:m.src
      };
    });
  }

  function renderWeakRecs(){
    var el=document.getElementById('weak-recs'); if(!el) return;
    var areas=weakAreas(3);
    if(!areas.length){ el.classList.remove('show'); return; }
    el.classList.add('show');
    var STARS=['☆☆☆☆','★☆☆☆','★★☆☆','★★★☆','★★★★'];
    var chips=areas.map(function(a){
      var esc=a.replace(/[&"'<>]/g,function(c){return{'&':'&amp;','"':'&quot;',"'":'&#39;','<':'&lt;','>':'&gt;'}[c];});
      var lvl=levelFor(a);
      return '<button class="wr-chip" onclick="window.Mastery.quizArea(\''+esc+'\')" title="Quiz this area">'
        +'<span class="wr-domain">'+a+'</span>'
        +'<span class="wr-stars" title="Mastery '+lvl+'/4">'+STARS[lvl]+'</span>'
        +'</button>';
    }).join('');
    el.innerHTML='<div style="display:flex;align-items:center;justify-content:space-between;gap:8px">'
      +'<h4 style="margin:0">⚠ Focus areas (from mistakes)</h4>'
      +'<button onclick="document.getElementById(\'weak-recs\').classList.remove(\'show\')" '
      +'style="background:none;border:none;cursor:pointer;font-size:1.1rem;color:#92400e;line-height:1;padding:0 4px" '
      +'title="Dismiss">✕</button></div>'
      +'<div class="wr-items" style="margin-top:6px">'+chips+'</div>'
      +'<button class="wr-all-btn" onclick="window.Mastery.startMistakeQuiz()" style="margin-top:8px;font-size:12px;background:var(--indigo);color:#fff;border:none;border-radius:8px;padding:6px 14px;cursor:pointer">🔁 Quiz me on mistakes</button>';
  }

  function quizArea(domain){
    /* Navigate to the chapter that covers this domain using SM */
    var allViews=['sat','est','est2','est2l2','act','act2','act2l2','igcse','edexcel','addmath','aslevel','a2level','ibsl','ibhl','apab','apbc','appc','apstats','precalc','qudrat','tahsili','gaten','olympiad','calculus','algebra','geo','alg2','linalg','mvc','odes','mathai'];
    for(var i=0;i<allViews.length;i++){
      var map=window.SM&&window.SM.get(allViews[i]); if(!map) continue;
      for(var j=0;j<map.topics.length;j++){
        var t=map.topics[j];
        if(t.label===domain){
          if(window.showView) window.showView(allViews[i]);
          /* try to scroll to chapter */
          setTimeout(function(cid){ var el=document.getElementById(cid); if(el) el.scrollIntoView({behavior:'smooth'}); }.bind(null,t.chapterId), 400);
          return;
        }
      }
    }
    /* fallback: old substring map */
    if(window._computeWeakAreas_legacy) window._computeWeakAreas_legacy(domain);
  }

  function startMistakeQuiz(){
    var pool=mistakeQuizPool(15);
    if(!pool.length){ alert('No mistakes to review yet!'); return; }
    /* Render quiz in a standalone overlay */
    var existing=document.getElementById('mistake-quiz-overlay');
    if(existing) existing.remove();
    var ov=document.createElement('div');
    ov.id='mistake-quiz-overlay';
    ov.style.cssText='position:fixed;inset:0;background:#0009;z-index:9999;overflow:auto;padding:24px;display:flex;align-items:flex-start;justify-content:center;';
    var letters=['A','B','C','D','E'];
    var html=pool.map(function(q,qi){
      q=window._shuffleQ?window._shuffleQ(q):q; /* randomize correct-answer position */
      var qId=q.id||('mq-'+qi);
      var opts=(q.choices||[]).map(function(c,ci){
        var s=typeof window.CSAutoMath==='function'?window.CSAutoMath(c):String(c||'');
        return '<button class="cq-opt" onclick="cqPick(this)">'
          +'<span class="cq-lbl">'+letters[ci]+'</span>'
          +'<span class="cq-ct">'+(typeof _maths==='function'?_maths(s):s)+'</span>'
          +'</button>';
      }).join('');
      return '<div class="cq-item" data-ans="'+q.answer+'" data-id="'+qId+'" data-domain="'+(q.domain||'')+'" data-src="'+(q.src||'')+'">'
        +'<div class="cq-stem">'+(typeof _maths==='function'?_maths(q.text||q.q||''):q.text||q.q||'')+'</div>'
        +'<div class="cq-opts">'+opts+'</div>'
        +'<div class="cq-sol" style="display:none">'+(q.sol||'')+'</div>'
        +'</div>';
    }).join('');
    ov.innerHTML='<div style="background:var(--panel,#fff);border-radius:16px;padding:24px;max-width:720px;width:100%;box-shadow:0 8px 40px #0003">'
      +'<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px">'
      +'<h3 style="margin:0">🔁 Mistake Review — '+pool.length+' questions</h3>'
      +'<button onclick="document.getElementById(\'mistake-quiz-overlay\').remove()" aria-label="Close" style="font-size:20px;background:none;border:none;cursor:pointer">✕</button>'
      +'</div>'+html+'</div>';
    document.body.appendChild(ov);
    if(window.MathJax&&MathJax.typesetPromise) MathJax.typesetPromise([ov]).catch(function(){});
  }

  /* expose renderWeakRecs as the primary renderer */
  return {levelFor:levelFor, weakAreas:weakAreas, mistakeQuizPool:mistakeQuizPool,
          renderWeakRecs:renderWeakRecs, quizArea:quizArea, startMistakeQuiz:startMistakeQuiz};
}());

/* wire existing _computeWeakAreas and _renderWeakRecs calls to Mastery */
function _computeWeakAreas(){ return window.Mastery.weakAreas(3); }
function _renderWeakRecs(){ window.Mastery.renderWeakRecs(); }
/* quizWeakArea kept for any legacy onclick= attributes */
window.quizWeakArea = function(domain){ window.Mastery.quizArea(domain); };


/* ── 65: STICKY NOTES ── */
var NOTE_KEY='clipsat_notes';
function _loadNotes(){try{return JSON.parse(localStorage.getItem(NOTE_KEY)||'{}');}catch(e){return {};}}
function _saveNote(id,text){var n=_loadNotes();if(text)n[id]=text;else delete n[id];localStorage.setItem(NOTE_KEY,JSON.stringify(n));}
window.toggleNote=function(id){var a=document.getElementById('note-area-'+id);if(!a)return;var open=a.classList.toggle('open');if(open)a.querySelector('textarea').value=_loadNotes()[id]||'';};
window.saveNote=function(id){
  var a=document.getElementById('note-area-'+id);if(!a)return;
  var text=a.querySelector('textarea').value.trim();
  _saveNote(id,text);
  var btn=document.querySelector('.ch-note-btn[data-id="'+id+'"]');
  if(btn){btn.textContent=text?'📝 Note ✓':'📝 Add note';btn.classList.toggle('has-note',!!text);}
  a.classList.remove('open');
};
function _injectNoteButtons(){
  var notes=_loadNotes();
  document.querySelectorAll('section.chapter').forEach(function(sec){
    var id=sec.id;if(!id||document.querySelector('.ch-note-btn[data-id="'+id+'"]'))return;
    var chead=sec.querySelector('.chead');if(!chead)return;
    var hasNote=!!notes[id];
    var btn=document.createElement('button');
    btn.className='ch-note-btn'+(hasNote?' has-note':'');
    btn.setAttribute('data-id',id);
    btn.textContent=hasNote?'📝 Note ✓':'📝 Add note';
    btn.setAttribute('onclick','toggleNote("'+id+'")');
    chead.appendChild(btn);
    var areaDiv=document.createElement('div');
    areaDiv.className='ch-note-area';areaDiv.id='note-area-'+id;
    areaDiv.innerHTML='<textarea placeholder="Add your notes for this chapter..."></textarea>'
      +'<button class="note-save" onclick="saveNote(\''+id+'\')">Save</button>';
    chead.after(areaDiv);
  });
}

/* ── 67: ACCURACY BADGES ── */
function _renderAccBadges(){
  var scores=JSON.parse(localStorage.getItem('clipsat_scores')||'{}');
  document.querySelectorAll('.rail a[data-target]').forEach(function(a){
    var tgt=a.getAttribute('data-target');
    if(!tgt||a.querySelector('.ch-acc-badge'))return;
    var s=scores[tgt];if(!s||!s.total)return;
    var pct=Math.round(s.correct/s.total*100);
    var cls=pct>=80?'ch-acc-g':pct>=60?'ch-acc-y':'ch-acc-r';
    var badge=document.createElement('span');
    badge.className='ch-acc-badge '+cls;badge.textContent=pct+'%';
    a.appendChild(badge);
  });
}

/* ── 66: STUDY PLANNER & PERSONALIZED 15-MINUTE DAILY PLAN ── */
window.CSDailyPlan = (function(){
  function _isAr(){
    return (document.documentElement.lang === 'ar') ||
           (window.i18n && typeof window.i18n.getLocale === 'function' && window.i18n.getLocale() === 'ar');
  }
  function _esc(s){
    return String(s == null ? '' : s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  }
  function getPlanSummary(){
    var trackId = window.CLIPSAT_TRACK || window._csCurrentView || 'sat';
    if(trackId === 'home') trackId = 'sat';
    var dueMistakes = (window.ML && typeof window.ML.dueForReview === 'function') ? window.ML.dueForReview().length : 0;
    var totalMistakes = (window.ML && typeof window.ML.getAll === 'function') ? window.ML.getAll().length : 0;
    var weakDomains = (window.Mastery && typeof window.Mastery.weakAreas === 'function') ? window.Mastery.weakAreas(2) : [];
    var catWeak = null;
    try {
      var catHist = JSON.parse(localStorage.getItem('clipsat_cat_history') || '[]');
      if(Array.isArray(catHist) && catHist.length){
        var latest = catHist[catHist.length - 1];
        if(latest && latest.weakestDomain) catWeak = latest.weakestDomain;
      }
    } catch(e){}
    var activeCh = document.querySelector('section.chapter.ch-active') || document.querySelector('section.chapter');
    var activeChId = activeCh ? activeCh.id : '';
    var activeChTitle = activeCh && activeCh.querySelector('.chead h2') ? activeCh.querySelector('.chead h2').textContent.trim() : (activeChId || trackId.toUpperCase());
    var focusTopic = catWeak || (weakDomains.length ? weakDomains[0] : activeChTitle);
    var explorerEl = (activeCh && activeCh.querySelector('.explorer')) || document.querySelector('.explorer');
    var explorerTitle = explorerEl && explorerEl.querySelector('.ex-title, h3, h4')
      ? explorerEl.querySelector('.ex-title, h3, h4').textContent.trim()
      : (_isAr() ? 'المختبر التفاعلي للفصل' : 'Interactive Chapter Lab');

    return {
      trackId: trackId,
      dueMistakes: dueMistakes,
      totalMistakes: totalMistakes,
      focusTopic: focusTopic,
      activeChId: activeChId,
      activeChTitle: activeChTitle,
      hasExplorer: !!explorerEl,
      explorerTitle: explorerTitle,
      doneToday: _dgToday(),
      dailyGoal: _dgGoal,
      streak: _dgStreak()
    };
  }

  function startTopicDrill(){
    var modal = document.getElementById('cs-daily-plan-modal');
    if(modal) modal.remove();
    var overlay = document.getElementById('study-planner-overlay');
    if(overlay) overlay.classList.remove('show');
    var activeCh = document.querySelector('section.chapter.ch-active') || document.querySelector('section.chapter');
    if(activeCh){
      var cqBtn = activeCh.querySelector('.cq-btn');
      if(cqBtn){
        var cntSel = activeCh.querySelector('.cq-count');
        if(cntSel) cntSel.value = '5';
        if(typeof window.genChapterQuiz === 'function') window.genChapterQuiz(cqBtn);
        var wrap = activeCh.querySelector('.ch-quiz-wrap');
        if(wrap && wrap.scrollIntoView) wrap.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return;
      }
    }
    if(window.Mastery && typeof window.Mastery.startMistakeQuiz === 'function' && window.ML && window.ML.getAll().length){
      window.Mastery.startMistakeQuiz();
    } else if(typeof window.startAdaptiveDiagnostic === 'function'){
      window.startAdaptiveDiagnostic(window.CLIPSAT_TRACK || 'sat');
    }
  }

  function jumpToExplorer(){
    var modal = document.getElementById('cs-daily-plan-modal');
    if(modal) modal.remove();
    var overlay = document.getElementById('study-planner-overlay');
    if(overlay) overlay.classList.remove('show');
    var activeCh = document.querySelector('section.chapter.ch-active') || document.querySelector('section.chapter');
    var ex = (activeCh && activeCh.querySelector('.explorer')) || document.querySelector('.explorer');
    if(ex){
      if(ex.scrollIntoView) ex.scrollIntoView({ behavior: 'smooth', block: 'center' });
      ex.style.boxShadow = '0 0 0 3px var(--indigo,#4f46e5)';
      setTimeout(function(){ ex.style.boxShadow = ''; }, 2400);
    }
  }

  function open(){
    var existing = document.getElementById('cs-daily-plan-modal');
    if(existing) existing.remove();
    var ar = _isAr();
    var s = getPlanSummary();
    var examDate = localStorage.getItem(EXAM_KEY) || '';
    var days = _daysTo(examDate);

    var weeksHtml = '';
    if(days && days > 0){
      var weeks = Math.max(1, Math.ceil(days / 7));
      var weak = _computeWeakAreas();
      var all = ['Algebra & Functions','Equations & Inequalities','Geometry & Trigonometry','Calculus & Rates','Data & Statistics','Past Paper Timed Drill'];
      var plan = weak.concat(all.filter(function(t){ return weak.indexOf(t) === -1; }));
      for(var w = 0; w < Math.min(weeks, 6); w++){
        var ds = new Date(); ds.setDate(ds.getDate() + w * 7);
        var de = new Date(ds); de.setDate(de.getDate() + 6);
        var lbl = (ar ? 'الأسبوع ' : 'Week ') + (w + 1) + ' (' + ds.toLocaleDateString('en-GB',{day:'numeric',month:'short'}) + ' – ' + de.toLocaleDateString('en-GB',{day:'numeric',month:'short'}) + ')';
        var topic = plan[w % plan.length];
        weeksHtml += '<div style="padding:8px 12px;border-left:3px solid var(--indigo,#4f46e5);background:var(--paper-2,#f8fafc);border-radius:6px;margin-bottom:6px;font-size:.84rem">'
          + '<strong>' + _esc(lbl) + ':</strong> ' + _esc(topic) + ' — ' + s.dailyGoal + (ar ? ' سؤال/يوم + مراجعة الأخطاء' : ' questions/day + mistake review')
          + '</div>';
      }
    }

    var ov = document.createElement('div');
    ov.id = 'cs-daily-plan-modal';
    ov.dir = ar ? 'rtl' : 'ltr';
    ov.style.cssText = 'position:fixed;inset:0;background:rgba(15,23,42,.6);z-index:10005;display:flex;align-items:center;justify-content:center;padding:16px;overflow-y:auto';
    ov.innerHTML = '<div style="background:var(--panel,#ffffff);color:var(--ink,#0f172a);border-radius:16px;max-width:600px;width:100%;padding:24px;box-shadow:0 20px 50px rgba(0,0,0,.3);border:1px solid var(--border,#e2e8f0)">'
      + '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px">'
      + '<div><span style="font-size:.75rem;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:var(--indigo,#4f46e5)">' + (ar ? 'خطة ذكية مخصصة' : 'Personalized Smart Routine') + '</span>'
      + '<h3 style="margin:2px 0 0;font-size:1.25rem">' + (ar ? '📅 خطة الدراسة اليومية (١٥ دقيقة)' : '📅 Today\'s 15-Minute Study Plan') + '</h3></div>'
      + '<button type="button" onclick="document.getElementById(\'cs-daily-plan-modal\').remove()" aria-label="Close" style="background:none;border:none;font-size:1.3rem;cursor:pointer;color:var(--muted,#64748b)">✕</button>'
      + '</div>'
      + '<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-bottom:16px;text-align:center">'
      + '<div style="background:var(--paper-2,#f8fafc);padding:10px;border-radius:10px;border:1px solid var(--border,#e2e8f0)"><div style="font-size:1.2rem;font-weight:800;color:var(--indigo,#4f46e5)">' + s.doneToday + '/' + s.dailyGoal + '</div><div style="font-size:.75rem;color:var(--muted,#64748b)">' + (ar ? 'أسئلة اليوم' : 'Today\'s Goal') + '</div></div>'
      + '<div style="background:var(--paper-2,#f8fafc);padding:10px;border-radius:10px;border:1px solid var(--border,#e2e8f0)"><div style="font-size:1.2rem;font-weight:800;color:#d97706">🔥 ' + s.streak + '</div><div style="font-size:.75rem;color:var(--muted,#64748b)">' + (ar ? 'أيام متتالية' : 'Day Streak') + '</div></div>'
      + '<div style="background:var(--paper-2,#f8fafc);padding:10px;border-radius:10px;border:1px solid var(--border,#e2e8f0)"><div style="font-size:1.2rem;font-weight:800;color:#dc2626">' + s.dueMistakes + '</div><div style="font-size:.75rem;color:var(--muted,#64748b)">' + (ar ? 'أخطاء مستحقة للمراجعة' : 'Due Mistakes') + '</div></div>'
      + '</div>'
      /* Step 1 */
      + '<div style="border:1px solid var(--border,#e2e8f0);border-radius:12px;padding:12px 14px;margin-bottom:10px;display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap">'
      + '<div><div style="font-weight:700;font-size:.95rem">1️⃣ ' + (ar ? '٥ دقائق: التكرار المتباعد ومراجعة الأخطاء' : '5 Min: Spaced Repetition & Mistake Deck') + '</div>'
      + '<div style="font-size:.82rem;color:var(--muted,#64748b)">' + (s.dueMistakes > 0 ? (s.dueMistakes + (ar ? ' بطاقة مستحقة في صندوق لايتنر' : ' Leitner cards due for active recall')) : (ar ? 'راجع بطاقات القوانين والمفاهيم الأساسية' : 'Review key formula flashcards for this chapter')) + '</div></div>'
      + (s.totalMistakes > 0
          ? '<button type="button" onclick="document.getElementById(\'cs-daily-plan-modal\').remove();window.Mastery.startMistakeQuiz()" style="background:var(--indigo,#4f46e5);color:#fff;border:none;border-radius:8px;padding:7px 14px;font-size:.82rem;font-weight:700;cursor:pointer">🔁 ' + (ar ? 'ابدأ المراجعة' : 'Review Mistakes') + '</button>'
          : '<button type="button" onclick="document.getElementById(\'cs-daily-plan-modal\').remove();if(window.CSGamify&&window.CSGamify.toggleFlashcards)window.CSGamify.toggleFlashcards()" style="background:var(--indigo,#4f46e5);color:#fff;border:none;border-radius:8px;padding:7px 14px;font-size:.82rem;font-weight:700;cursor:pointer">🃏 ' + (ar ? 'بطاقات القوانين' : 'Open Flashcards') + '</button>')
      + '</div>'
      /* Step 2 */
      + '<div style="border:1px solid var(--border,#e2e8f0);border-radius:12px;padding:12px 14px;margin-bottom:10px;display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap">'
      + '<div><div style="font-weight:700;font-size:.95rem">2️⃣ ' + (ar ? '٥ دقائق: تدريب مركّز على الموضوع ذي الأولوية' : '5 Min: Priority Topic Quick Drill (5 Qs)') + '</div>'
      + '<div style="font-size:.82rem;color:var(--muted,#64748b)">' + (ar ? 'التركيز الموصى به: ' : 'Recommended focus: ') + '<strong>' + _esc(s.focusTopic) + '</strong></div></div>'
      + '<button type="button" onclick="window.CSDailyPlan.startTopicDrill()" style="background:#16a34a;color:#fff;border:none;border-radius:8px;padding:7px 14px;font-size:.82rem;font-weight:700;cursor:pointer">📝 ' + (ar ? 'ابدأ تدريب ٥ أسئلة' : 'Start 5-Q Drill') + '</button>'
      + '</div>'
      /* Step 3 */
      + '<div style="border:1px solid var(--border,#e2e8f0);border-radius:12px;padding:12px 14px;margin-bottom:14px;display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap">'
      + '<div><div style="font-weight:700;font-size:.95rem">3️⃣ ' + (ar ? '٥ دقائق: استكشاف بصري تفاعلي' : '5 Min: Interactive Visual Explorer Challenge') + '</div>'
      + '<div style="font-size:.82rem;color:var(--muted,#64748b)">' + _esc(s.explorerTitle) + '</div></div>'
      + '<button type="button" onclick="window.CSDailyPlan.jumpToExplorer()" style="background:#0284c7;color:#fff;border:none;border-radius:8px;padding:7px 14px;font-size:.82rem;font-weight:700;cursor:pointer">🧪 ' + (ar ? 'افتح المختبر' : 'Launch Explorer') + '</button>'
      + '</div>'
      /* Exam Date Roadmap */
      + '<div style="border-top:1px solid var(--border,#e2e8f0);padding-top:12px">'
      + '<div style="display:flex;align-items:center;justify-content:space-between;gap:8px;flex-wrap:wrap;margin-bottom:8px">'
      + '<label style="font-size:.82rem;font-weight:700">' + (ar ? '🎯 تاريخ الاختبار المستهدف:' : '🎯 Target Exam Date:') + '</label>'
      + '<div style="display:flex;gap:6px;align-items:center">'
      + '<input type="date" id="cs-dp-exam-date" value="' + _esc(examDate) + '" style="padding:5px 8px;border:1px solid var(--border,#cbd5e1);border-radius:6px;font-size:.82rem">'
      + '<button type="button" onclick="var v=document.getElementById(\'cs-dp-exam-date\').value;if(v){localStorage.setItem(\'clipsat_exam_date\',v);window.CSDailyPlan.open();}" style="background:var(--paper-2,#f1f5f9);border:1px solid var(--border,#cbd5e1);border-radius:6px;padding:5px 10px;font-size:.8rem;font-weight:600;cursor:pointer">' + (ar ? 'حفظ وتحديث الجدول' : 'Save Date') + '</button>'
      + '</div></div>'
      + (weeksHtml ? '<div style="max-height:150px;overflow-y:auto;margin-top:6px">' + weeksHtml + '</div>' : '<div style="font-size:.8rem;color:var(--muted,#64748b)">' + (ar ? 'حدد تاريخ اختبارك أعلاه لتوليد جدول مراجعة أسبوعي تلقائي.' : 'Set your target exam date above to auto-generate a week-by-week revision schedule.') + '</div>')
      + '</div>'
      + '</div>';
    document.body.appendChild(ov);
  }

  return {
    open: open,
    getPlanSummary: getPlanSummary,
    startTopicDrill: startTopicDrill,
    jumpToExplorer: jumpToExplorer
  };
})();

window.openStudyPlanner=function(){
  var days=_daysTo(localStorage.getItem(EXAM_KEY));
  var spContent=document.getElementById('study-planner-content');
  var spOverlay=document.getElementById('study-planner-overlay');
  if(days&&days>0&&spContent&&spOverlay){
    var weeks=Math.max(1,Math.ceil(days/7));
    var weak=_computeWeakAreas();
    var all=['Pure Maths (Core)','Algebra & Functions','Trigonometry','Calculus','Statistics','Mechanics','Past Paper Practice'];
    var plan=weak.concat(all.filter(function(t){return weak.indexOf(t)===-1;}));
    var html='';
    for(var w=0;w<Math.min(weeks,8);w++){
      var ds=new Date();ds.setDate(ds.getDate()+w*7);
      var de=new Date(ds);de.setDate(de.getDate()+6);
      var lbl='Week '+(w+1)+' ('+ds.toLocaleDateString('en-GB',{day:'numeric',month:'short'})+' – '+de.toLocaleDateString('en-GB',{day:'numeric',month:'short'})+')';
      var topic=plan[w%plan.length];
      html+='<div class="sp-week"><strong>'+lbl+'</strong><ul><li>'+topic+' — 10 questions/day + review mistakes</li>';
      if(w===Math.min(weeks,8)-1)html+='<li>🎯 Final revision + timed past paper</li>';
      html+='</ul></div>';
    }
    spContent.innerHTML=html;
    spOverlay.classList.add('show');
    return;
  }
  window.CSDailyPlan.open();
};

/* ── 68: WORKED EXAMPLE "TRY A SIMILAR PROBLEM" (window.CSTwinProblem) ── */
window.CSTwinProblem = (function(){
  var _seenByTopic = {};
  var _activeQuestions = {};
  var _seq = 0;

  function _isAr(){
    return (document.documentElement.lang === 'ar') ||
           (window.i18n && typeof window.i18n.getLocale === 'function' && window.i18n.getLocale() === 'ar');
  }
  function _esc(s){
    return String(s == null ? '' : s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  }
  function _fmtMath(s){
    if(s == null) return '';
    var str = String(s);
    if(typeof window.CSAutoMath === 'function') str = window.CSAutoMath(str);
    if(typeof window.CSQuizMath === 'function') return window.CSQuizMath(str);
    if(typeof window._maths === 'function') return window._maths(str);
    return str;
  }

  function _getBankPool(trackId, chapterId){
    var b = window.fullExamBank && window.fullExamBank[trackId];
    if(b){
      var full = Array.isArray(b) ? b : (b.pool || [].concat(b.easy || [], b.medium || [], b.hard || []));
      if(full.length) return full;
    }
    if(chapterId && window.CS_SHARD_CACHE && window.CS_SHARD_CACHE[trackId + ':' + chapterId]){
      var sh = window.CS_SHARD_CACHE[trackId + ':' + chapterId];
      if(sh && Array.isArray(sh.pool)) return sh.pool;
    }
    return [];
  }

  function findMatchingQuestion(trackId, chapterId, domains){
    var pool = _getBankPool(trackId, chapterId);
    if(!pool.length) return null;
    var matches = [];
    if(chapterId){
      matches = pool.filter(function(q){ return q.topic_id === chapterId; });
    }
    if(!matches.length && Array.isArray(domains) && domains.length){
      matches = pool.filter(function(q){
        return q.domain && domains.indexOf(q.domain) !== -1;
      });
    }
    if(!matches.length) matches = pool;

    var key = trackId + ':' + (chapterId || 'all');
    if(!_seenByTopic[key]) _seenByTopic[key] = [];
    var unseen = matches.filter(function(q){
      var qid = q.id || (q.text || q.q || '').slice(0, 40);
      return _seenByTopic[key].indexOf(qid) === -1;
    });
    if(!unseen.length){
      _seenByTopic[key] = [];
      unseen = matches;
    }
    var picked = unseen[Math.floor(Math.random() * unseen.length)];
    var pid = picked.id || (picked.text || picked.q || '').slice(0, 40);
    _seenByTopic[key].push(pid);
    return window._shuffleQ ? window._shuffleQ(picked) : picked;
  }

  function _renderTwinCard(cardEl, trackId, chapterId, domains){
    var ar = _isAr();
    var q = findMatchingQuestion(trackId, chapterId, domains);
    if(!q){
      cardEl.innerHTML = '<div style="padding:10px;color:var(--muted,#64748b);font-size:.85rem">'
        + (ar ? 'تعذر العثور على مسألة مشابهة في البنك.' : 'Could not load a matching question from the bank.')
        + '</div>';
      return;
    }
    var uid = 'twin-' + (++_seq);
    var hints = (window.CSHintEngine && typeof window.CSHintEngine.getHints === 'function')
      ? window.CSHintEngine.getHints(q)
      : (Array.isArray(q.hints) && q.hints.length ? q.hints : [
          ar ? 'حدد المعطيات والمطلوب في المسألة أولًا.' : 'Identify the given quantities and target expression first.',
          ar ? 'طبّق نفس القاعدة المستخدمة في المثال المحلول أعلاه.' : 'Apply the same formula or method shown in the worked example above.',
          (q.sol || q.explanation || '').slice(0, 140)
        ]);
    _activeQuestions[uid] = {
      q: q,
      trackId: trackId,
      chapterId: chapterId,
      domains: domains,
      hints: hints,
      hintIdx: 0,
      answered: false
    };

    var stem = _fmtMath(q.text || q.q || q.stem || '');
    var diff = String(q.difficulty || q.diff || 'Medium');
    var figHtml = '';
    var figSpec = q.figure || q.fig;
    if(figSpec){
      if(typeof figSpec === 'string') figHtml = '<div class="cq-figure" style="margin:8px auto;text-align:center">' + figSpec + '</div>';
      else if(typeof window._renderFig === 'function') figHtml = '<div class="cq-figure" style="margin:8px auto;text-align:center">' + window._renderFig(figSpec) + '</div>';
    }

    var choices = Array.isArray(q.choices) ? q.choices : (Array.isArray(q.options) ? q.options : []);
    var isMcq = choices.length > 0 && typeof q.answer === 'number';
    var letters = ['A','B','C','D','E','F'];
    var inputHtml = '';
    if(isMcq){
      inputHtml = '<div class="cs-twin-opts" style="display:grid;gap:6px;margin-top:10px">'
        + choices.map(function(c, idx){
          return '<button type="button" class="cs-twin-opt" data-idx="' + idx + '" onclick="window.CSTwinProblem.pickOption(\'' + uid + '\',' + idx + ',this)" '
            + 'style="text-align:' + (ar ? 'right' : 'left') + ';padding:8px 12px;border:1.5px solid var(--border,#cbd5e1);border-radius:8px;background:var(--panel,#fff);color:var(--ink,#0f172a);cursor:pointer;font-size:.88rem;display:flex;align-items:center;gap:8px;transition:all .15s">'
            + '<span style="font-weight:700;color:var(--indigo,#4f46e5);min-width:20px">' + letters[idx] + '.</span>'
            + '<span>' + _fmtMath(c) + '</span>'
            + '</button>';
        }).join('')
        + '</div>';
    } else {
      inputHtml = '<div style="display:flex;gap:8px;margin-top:10px;align-items:center;flex-wrap:wrap">'
        + '<input type="text" id="' + uid + '-inp" placeholder="' + (ar ? 'أدخل إجابتك...' : 'Enter your answer...') + '" style="padding:7px 10px;border:1.5px solid var(--border,#cbd5e1);border-radius:8px;font-size:.88rem;flex:1;min-width:140px" dir="ltr">'
        + '<button type="button" onclick="window.CSTwinProblem.checkSpr(\'' + uid + '\')" style="background:var(--indigo,#4f46e5);color:#fff;border:none;border-radius:8px;padding:7px 14px;font-size:.84rem;font-weight:700;cursor:pointer">' + (ar ? 'تحقق' : 'Check') + '</button>'
        + '</div>';
    }

    cardEl.setAttribute('data-twin-uid', uid);
    cardEl.dir = ar ? 'rtl' : 'ltr';
    cardEl.innerHTML = '<div style="margin-top:12px;padding:14px 16px;border:1.5px solid var(--indigo,#4f46e5);border-radius:12px;background:var(--paper-2,#f8fafc)">'
      + '<div style="display:flex;align-items:center;justify-content:space-between;gap:8px;flex-wrap:wrap;margin-bottom:8px">'
      + '<div style="display:flex;align-items:center;gap:8px">'
      + '<span style="font-weight:800;font-size:.82rem;color:var(--indigo,#4f46e5)">🔄 ' + (ar ? 'مسألة تدريبية مشابهة' : 'Similar Practice Problem') + '</span>'
      + '<span style="font-size:.72rem;padding:2px 7px;border-radius:99px;background:#e0e7ff;color:#3730a3;font-weight:700">' + _esc(diff) + '</span>'
      + '</div>'
      + '<div style="display:flex;gap:6px;align-items:center">'
      + '<button type="button" onclick="window.CSTwinProblem.showHint(\'' + uid + '\')" id="' + uid + '-hint-btn" style="background:#fef3c7;color:#92400e;border:1px solid #fde68a;border-radius:6px;padding:3px 9px;font-size:.76rem;font-weight:700;cursor:pointer">💡 ' + (ar ? 'تلميح (0/3)' : 'Hint (0/3)') + '</button>'
      + '<button type="button" onclick="window.CSTwinProblem.next(\'' + uid + '\')" style="background:var(--panel,#fff);color:var(--ink,#0f172a);border:1px solid var(--border,#cbd5e1);border-radius:6px;padding:3px 9px;font-size:.76rem;font-weight:600;cursor:pointer">↻ ' + (ar ? 'مسألة أخرى' : 'Another') + '</button>'
      + '<button type="button" onclick="window.CSTwinProblem.close(\'' + uid + '\')" aria-label="Close" style="background:none;border:none;font-size:1rem;cursor:pointer;color:var(--muted,#64748b);padding:0 4px">✕</button>'
      + '</div></div>'
      + '<div class="cs-twin-stem" style="font-size:.92rem;line-height:1.55">' + stem + '</div>'
      + figHtml
      + inputHtml
      + '<div id="' + uid + '-hints" style="margin-top:8px;display:none"></div>'
      + '<div id="' + uid + '-sol" style="margin-top:10px;padding:10px 12px;border-radius:8px;background:var(--panel,#fff);border-left:3px solid #16a34a;font-size:.86rem;display:none"></div>'
      + '</div>';

    if(window.MathJax && MathJax.typesetPromise) MathJax.typesetPromise([cardEl]).catch(function(){});
  }

  function open(btnEl){
    if(!btnEl) return;
    var exBox = btnEl.closest('.example, .fcard, .callout') || btnEl.parentElement;
    var chEl = btnEl.closest('section.chapter');
    var chapterId = chEl ? chEl.id : '';
    var qw = chEl ? chEl.querySelector('.ch-quiz-wrap') : null;
    var domains = (qw && qw.getAttribute('data-quiz-domains') ? qw.getAttribute('data-quiz-domains') : '').split('|').filter(Boolean);
    var trackId = window.CLIPSAT_TRACK || window._csCurrentView || 'sat';
    if(trackId === 'home') trackId = 'sat';

    var cardEl = exBox.querySelector('.cs-twin-container');
    if(!cardEl){
      cardEl = document.createElement('div');
      cardEl.className = 'cs-twin-container no-print';
      exBox.appendChild(cardEl);
    }
    var ar = _isAr();
    cardEl.innerHTML = '<div style="margin-top:10px;padding:10px;font-size:.84rem;color:var(--muted,#64748b)">⏳ '
      + (ar ? 'جاري تحميل مسألة مشابهة من بنك الأسئلة...' : 'Loading a matching problem from the verified bank...')
      + '</div>';

    var loadPromise = (chapterId && typeof window.CS_loadTopicShard === 'function' && !(window.fullExamBank && window.fullExamBank[trackId]))
      ? window.CS_loadTopicShard(trackId, chapterId)
      : ((typeof window.CS_loadTrackBank === 'function') ? window.CS_loadTrackBank(trackId) : Promise.resolve());
    loadPromise.then(function(){
      _renderTwinCard(cardEl, trackId, chapterId, domains);
    }).catch(function(){
      _renderTwinCard(cardEl, trackId, chapterId, domains);
    });
  }

  function next(uid){
    var st = _activeQuestions[uid];
    if(!st) return;
    var cardEl = document.querySelector('.cs-twin-container[data-twin-uid="' + uid + '"]');
    if(cardEl) _renderTwinCard(cardEl, st.trackId, st.chapterId, st.domains);
  }

  function close(uid){
    var cardEl = document.querySelector('.cs-twin-container[data-twin-uid="' + uid + '"]');
    if(cardEl) cardEl.remove();
    delete _activeQuestions[uid];
  }

  function showHint(uid){
    var st = _activeQuestions[uid];
    if(!st || !st.hints || !st.hints.length) return;
    if(st.hintIdx >= st.hints.length) return;
    var ar = _isAr();
    var hBox = document.getElementById(uid + '-hints');
    var hBtn = document.getElementById(uid + '-hint-btn');
    if(!hBox) return;
    hBox.style.display = 'block';
    var tier = st.hintIdx + 1;
    var item = document.createElement('div');
    item.style.cssText = 'padding:6px 10px;margin-top:4px;background:#fffbeb;border:1px solid #fde68a;border-radius:6px;font-size:.82rem;color:#92400e';
    item.innerHTML = '<strong>' + (ar ? 'تلميح ' : 'Hint ') + tier + ':</strong> ' + _fmtMath(st.hints[st.hintIdx]);
    hBox.appendChild(item);
    st.hintIdx++;
    if(hBtn) hBtn.textContent = '💡 ' + (ar ? 'تلميح (' : 'Hint (') + st.hintIdx + '/' + st.hints.length + ')';
    if(window.MathJax && MathJax.typesetPromise) MathJax.typesetPromise([item]).catch(function(){});
  }

  function _revealSolution(uid, isCorrect, chosenText){
    var st = _activeQuestions[uid];
    if(!st) return;
    var ar = _isAr();
    var q = st.q;
    var solBox = document.getElementById(uid + '-sol');
    if(solBox){
      var solText = _fmtMath(q.sol || q.explanation || '');
      solBox.style.display = 'block';
      solBox.style.borderLeftColor = isCorrect ? '#16a34a' : '#dc2626';
      solBox.innerHTML = '<div style="font-weight:700;color:' + (isCorrect ? '#16a34a' : '#dc2626') + ';margin-bottom:4px">'
        + (isCorrect ? (ar ? '✓ إجابة صحيحة! (+10 XP)' : '✓ Correct! (+10 XP)') : (ar ? '✗ إجابة غير صحيحة — راجع الحل خطوة بخطوة:' : '✗ Not quite — review the step-by-step solution:'))
        + '</div>'
        + '<div>' + solText + '</div>';
      if(window.MathJax && MathJax.typesetPromise) MathJax.typesetPromise([solBox]).catch(function(){});
    }
    if(!st.answered){
      st.answered = true;
      _recordAnswer();
      if(isCorrect && window.CSGamify && typeof window.CSGamify.addXP === 'function'){
        window.CSGamify.addXP(10);
      } else if(!isCorrect && window.ML && typeof window.ML.add === 'function'){
        var choices = q.choices || q.options || [];
        var rightTxt = typeof q.answer === 'number' && choices[q.answer] != null ? choices[q.answer] : String(q.answer || '');
        window.ML.add({
          id: q.id || ('twin-' + Date.now()),
          viewId: st.trackId,
          domain: q.domain || st.chapterId || 'General',
          q: q.text || q.q || '',
          wrong: chosenText || '',
          right: rightTxt
        });
      }
    }
  }

  function pickOption(uid, idx, btnEl){
    var st = _activeQuestions[uid];
    if(!st || st.answered) return;
    var q = st.q;
    var isCorrect = (idx === q.answer);
    var cardEl = document.querySelector('.cs-twin-container[data-twin-uid="' + uid + '"]');
    if(cardEl){
      cardEl.querySelectorAll('.cs-twin-opt').forEach(function(b, i){
        b.style.pointerEvents = 'none';
        if(i === q.answer){
          b.style.borderColor = '#16a34a';
          b.style.background = '#dcfce7';
        } else if(i === idx && !isCorrect){
          b.style.borderColor = '#dc2626';
          b.style.background = '#fee2e2';
        }
      });
    }
    var choices = q.choices || q.options || [];
    _revealSolution(uid, isCorrect, choices[idx] || String(idx));
  }

  function checkSpr(uid){
    var st = _activeQuestions[uid];
    if(!st || st.answered) return;
    var inp = document.getElementById(uid + '-inp');
    if(!inp) return;
    var val = inp.value.trim();
    if(!val) return;
    var expected = String(st.q.answer != null ? st.q.answer : (st.q.correct || '')).trim();
    var isCorrect = false;
    if(window.CSAnswerCheck && typeof window.CSAnswerCheck.check === 'function'){
      isCorrect = window.CSAnswerCheck.check(val, expected);
    } else {
      isCorrect = (val === expected || parseFloat(val) === parseFloat(expected));
    }
    inp.style.borderColor = isCorrect ? '#16a34a' : '#dc2626';
    _revealSolution(uid, isCorrect, val);
  }

  return {
    open: open,
    next: next,
    close: close,
    showHint: showHint,
    pickOption: pickOption,
    checkSpr: checkSpr,
    findMatchingQuestion: findMatchingQuestion
  };
})();

/* ── 69: WORKED EXAMPLE GRAPH IN CALCULATOR (window.CSExampleGrapher) ── */
window.CSExampleGrapher = (function(){
  function _cleanLatexForDesmos(raw){
    if(!raw) return '';
    var s = String(raw)
      .replace(/\\(?:displaystyle|textstyle|tfrac|dfrac)/g, function(m){ return m.indexOf('frac') !== -1 ? '\\frac' : ''; })
      .replace(/\\left/g, '')
      .replace(/\\right/g, '')
      .replace(/\s+/g, ' ')
      .trim();
    /* Replace f(x) =, g(x) =, h(x) =, P(x) = with y = */
    s = s.replace(/^[fghpqvFs]\s*\(\s*[xt]\s*\)\s*=/i, 'y =');
    if(s.indexOf('t') !== -1 && s.indexOf('x') === -1){
      s = s.replace(/\bt\b/g, 'x');
    }
    /* Strip trailing prose words after equation */
    s = s.replace(/\s+(?:where|for|when|if|and|at|on|in|with|as|to|find|is)\b.*$/i, '').trim();
    s = s.replace(/[.,;:?!]+$/, '').trim();
    return s;
  }

  function extractExpressions(containerEl){
    if(!containerEl) return ['y = x^2'];
    var candidates = [];
    /* 1. Check KaTeX MathML annotations, SSR data-tex, or data-latex attributes */
    containerEl.querySelectorAll('annotation[encoding="application/x-tex"], [data-latex], [data-tex]').forEach(function(el){
      var tex = el.getAttribute('data-latex') || el.getAttribute('data-tex') || el.textContent || '';
      if(tex) candidates.push(tex);
    });
    /* 2. Also scan plain text of the example */
    var rawText = containerEl.textContent || '';
    candidates.push(rawText);

    var found = [];
    var seen = {};
    function addExpr(e){
      var c = _cleanLatexForDesmos(e);
      if(!c || c.length < 3 || c.length > 90) return;
      if(!/[xy]/.test(c)) return;
      if(seen[c]) return;
      seen[c] = true;
      found.push(c);
    }

    candidates.forEach(function(chunk){
      /* Split on prose connectors so multiple equations in one sentence are matched individually */
      var subChunks = String(chunk).split(/\s+(?:and|or|where|with|for|when|if|then)\s+|[,;\n]/i);
      subChunks.forEach(function(part){
        var reFn = /(?:[fghpqvFs]\s*\(\s*[xt]\s*\)|y)\s*=\s*([^,.;\n<>|=]+)/g;
        var m;
        while((m = reFn.exec(part)) !== null){
          var rhs = m[1].trim();
          if(/[0-9x\\^+\-*/()]/.test(rhs)){
            addExpr('y = ' + rhs);
          }
        }
        /* Match implicit x & y equations like x^2 + y^2 = 25 or 2x + 3y = 12 */
        var reEq = /([0-9xXyY^+\-*/()\s\\{}]+=[0-9xXyY^+\-*/()\s\\{}]+)/g;
        while((m = reEq.exec(part)) !== null){
          var eq = m[1].trim();
          if(/[xX]/.test(eq) && /[yY]/.test(eq) && !/^\(\s*[xt]\s*\)\s*=/.test(eq)){
            if(eq.indexOf('=') === eq.lastIndexOf('=')){
              var eqParts = eq.split('=');
              if(eqParts[0].trim() && eqParts[1].trim()){
                addExpr(eq);
              }
            }
          }
        }
      });
    });

    if(!found.length){
      /* Fallback: look for any polynomial/trig expression in x */
      var mPoly = rawText.match(/([+-]?\d*x(?:\^\d+)?(?:\s*[+-]\s*\d*x?(?:\^\d+)?)+)/);
      if(mPoly) addExpr('y = ' + mPoly[1]);
    }
    if(!found.length) found.push('y = x^2 - 4');
    return found.slice(0, 3);
  }

  function graphFromExample(btnEl){
    var box = btnEl && btnEl.closest ? (btnEl.closest('.example, .fcard, .callout') || btnEl.parentElement) : document.body;
    var exprs = extractExpressions(box);
    var colors = ['#2563eb', '#dc2626', '#16a34a'];
    if(typeof window.clearFloatingCalc === 'function') window.clearFloatingCalc();
    exprs.forEach(function(latex, i){
      if(typeof window.setFloatingCalcExpression === 'function'){
        window.setFloatingCalcExpression(latex, 'ex_graph_' + (i + 1), colors[i % colors.length]);
      }
    });
    return exprs;
  }

  return {
    extractExpressions: extractExpressions,
    graphFromExample: graphFromExample
  };
})();

/* ── INIT ── */
/* CLS fix: used to be window.addEventListener('load', ...) — the `load`
   event waits for EVERY resource on the page, including the render-blocking
   KaTeX CDN script, which is routinely the slowest thing on the page. None
   of these five calls need anything but the DOM + localStorage (no image/
   font/external-script dependency), so there's no reason to wait that long
   — doing so just maximizes the odds Chrome has already painted a frame
   before #daily-goal-bar/#cs-breadcrumb (both display:none/height:0 until
   JS reveals them) get their real content, producing a late, avoidable
   layout shift. DOMContentLoaded fires as soon as the document — including
   this very script and the post-engine shim after it — finishes parsing,
   which is as early as this content can possibly be ready anyway. Same
   readyState guard as engine.js's own init() above, for the same reason:
   defensive in case this ever runs after DOMContentLoaded has already
   fired. */
function _renderDeferredChrome(){
  _renderCountdown();
  _renderDailyGoal();
  _renderWeakRecs();
  _injectNoteButtons();
  _renderAccBadges();
  var _sv0=window.showView;
  window.showView=function(name){if(_sv0)_sv0(name);setTimeout(function(){_injectNoteButtons();_renderAccBadges();_renderWeakRecs();},200);};
}
if(document.readyState!=='loading') _renderDeferredChrome();
else document.addEventListener('DOMContentLoaded',_renderDeferredChrome);

})();

/* ════ 59: MOCK EXAM MODE ════ */
