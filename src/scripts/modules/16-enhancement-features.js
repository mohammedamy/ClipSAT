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
window.openExamDateModal=function(){var m=document.getElementById('exam-date-modal');var inp=document.getElementById('exam-date-input');if(inp){var ex=localStorage.getItem(EXAM_KEY);if(ex)inp.value=ex;}if(m)m.classList.add('show');};
window.closeExamDateModal=function(){var m=document.getElementById('exam-date-modal');if(m)m.classList.remove('show');};
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
  bar.innerHTML='<span class="dg-label">&#128218; Today</span>'
    +'<span class="dg-count">'+done+'/'+_dgGoal+'</span>'
    +'<div class="dg-track"><div class="dg-fill" style="width:'+pct+'%"></div></div>'
    +(done>=_dgGoal?'<span style="color:#16a34a;font-weight:700">&#x2713; Goal met!</span>':'')
    +'<span class="dg-streak">'+(streak>0?'&#128293; '+streak+' day streak':'')+'</span>'
    +'<button onclick="setDailyGoal()" style="margin-left:auto">Goal: '+_dgGoal+'</button>'
    +'<button onclick="dismissDailyGoal()" title="Dismiss" style="padding:2px 7px;font-size:.85rem;background:transparent;border:1px solid var(--line);border-radius:5px;cursor:pointer;color:var(--muted)">&#x2715;</button>';
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
    var allViews=['sat','est','act','igcse','aslevel','a2level','ibsl','ibhl','appc','apstats','precalc','qudrat','tahsili','calculus','algebra'];
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
        var s=String(c||'');
        if(s.indexOf('\\(')===-1&&s.indexOf('\\[')===-1&&/\\[a-zA-Z{([\\]/.test(s)){s='\\('+s+'\\)';}
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

/* ── 66: STUDY PLANNER ── */
window.openStudyPlanner=function(){
  var days=_daysTo(localStorage.getItem(EXAM_KEY));
  if(!days||days<=0){alert('Please set your exam date first.');openExamDateModal();return;}
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
  document.getElementById('study-planner-content').innerHTML=html;
  document.getElementById('study-planner-overlay').classList.add('show');
};

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
