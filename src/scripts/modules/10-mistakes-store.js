/* ═══════════════════════════════════════════════════════════════════════════
   10-mistakes-store.js — AccuracyLog, cqPick Mistake Capture & Adaptive Deck
   Dashboard inside #mistake-overlay.
   ═══════════════════════════════════════════════════════════════════════════ */
var _mistakes = window.ML.getAll();
function _saveMistakes(){ /* no-op: ML handles persistence */ }

/* ── AccuracyLog: right+wrong attempt counts, bucketed by track/domain/day ── */
window.AccuracyLog = (function(){
  var STORAGE_KEY = 'clipsat_accuracy_v1';
  var MAX_BUCKETS = 1500;

  function _load(){
    try{ var raw = localStorage.getItem(STORAGE_KEY); return raw ? JSON.parse(raw) : {}; }
    catch(e){ return {}; }
  }
  function _save(data){ try{ localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); }catch(e){} }
  function _today(){ return new Date().toISOString().slice(0,10); }

  function _prune(data){
    var leaves = [];
    Object.keys(data).forEach(function(track){
      Object.keys(data[track]).forEach(function(domain){
        Object.keys(data[track][domain]).forEach(function(day){
          leaves.push({track:track, domain:domain, day:day});
        });
      });
    });
    if(leaves.length<=MAX_BUCKETS) return data;
    leaves.sort(function(a,b){ return a.day<b.day?-1:(a.day>b.day?1:0); });
    leaves.slice(0, leaves.length-MAX_BUCKETS).forEach(function(l){
      delete data[l.track][l.domain][l.day];
      if(!Object.keys(data[l.track][l.domain]).length) delete data[l.track][l.domain];
      if(!Object.keys(data[l.track]).length) delete data[l.track];
    });
    return data;
  }

  function record(track, domain, correct){
    if(!track) return;
    domain = domain || 'General';
    var data = _load();
    var day = _today();
    data[track] = data[track] || {};
    data[track][domain] = data[track][domain] || {};
    var b = data[track][domain][day] || {c:0, t:0};
    b.t++; if(correct) b.c++;
    data[track][domain][day] = b;
    _save(_prune(data));
  }

  function chapterMastery(track){
    var data = _load();
    var domains = data[track] || {};
    return Object.keys(domains).map(function(domain){
      var c=0,t=0;
      Object.keys(domains[domain]).forEach(function(day){ c+=domains[domain][day].c; t+=domains[domain][day].t; });
      return {domain:domain, correct:c, total:t, pct: t?Math.round(c/t*100):0};
    }).sort(function(a,b){ return a.pct-b.pct; });
  }

  function trackAccuracy(){
    var data = _load();
    var out = {};
    Object.keys(data).forEach(function(track){
      var c=0,t=0;
      Object.keys(data[track]).forEach(function(domain){
        Object.keys(data[track][domain]).forEach(function(day){ c+=data[track][domain][day].c; t+=data[track][domain][day].t; });
      });
      out[track] = {correct:c, total:t, pct: t?Math.round(c/t*100):0};
    });
    return out;
  }

  function dailyTrend(days){
    days = days || 14;
    var data = _load();
    var byDay = {};
    Object.keys(data).forEach(function(track){
      Object.keys(data[track]).forEach(function(domain){
        Object.keys(data[track][domain]).forEach(function(day){
          var b = data[track][domain][day];
          byDay[day] = byDay[day] || {c:0,t:0};
          byDay[day].c += b.c; byDay[day].t += b.t;
        });
      });
    });
    var out = [];
    for(var i=days-1;i>=0;i--){
      var d = new Date(Date.now()-i*86400000).toISOString().slice(0,10);
      var b = byDay[d] || {c:0,t:0};
      out.push({date:d, correct:b.c, total:b.t, pct: b.t?Math.round(b.c/b.t*100):null});
    }
    return out;
  }

  return {record:record, chapterMastery:chapterMastery, trackAccuracy:trackAccuracy, dailyTrend:dailyTrend};
}());

/* Patch cqPick — record wrong answers into ML with full choices + solution for Adaptive Mistake Deck */
(function(){
  var _orig = window.cqPick;
  window.cqPick = function(el){
    var item = el.closest('.cq-item');
    if(!item || item.classList.contains('cq-done')){ if(_orig) _orig(el); return; }
    var ans    = parseInt(item.getAttribute('data-ans'),10);
    var opts   = Array.prototype.slice.call(item.querySelectorAll('.cq-opt'));
    var chosen = opts.indexOf(el);
    if(_orig) _orig(el);
    var main    = item.closest('main[id^="view-"]');
    var viewId  = main ? main.id.replace('view-','') : (window.CLIPSAT_TRACK || '');
    var isRight = chosen === ans;
    if(window.AccuracyLog) window.AccuracyLog.record(viewId, item.getAttribute('data-domain') || '', isRight);
    if(!isRight){
      var qEl = item.querySelector('.cq-stem,.cq-q,.cq-qt');
      var solEl = item.querySelector('.cq-sol-box,.cq-sol');
      var rawChoices = [];
      var chAttr = item.getAttribute('data-choices');
      if(chAttr){
        try{ rawChoices = JSON.parse(decodeURIComponent(chAttr)); }catch(e){}
      }
      if(!rawChoices.length){
        rawChoices = opts.map(function(o){
          return o.getAttribute('data-raw') || (o.querySelector('.cq-ct') ? o.querySelector('.cq-ct').textContent : o.textContent);
        });
      }
      window.ML.add({
        id:      item.getAttribute('data-id') || ('q-' + Date.now()),
        viewId:  viewId,
        q:       item.getAttribute('data-raw') || (qEl ? qEl.textContent.slice(0,300) : 'Question'),
        wrong:   el.getAttribute('data-raw') || (el.querySelector('.cq-ct') ? el.querySelector('.cq-ct').textContent : String.fromCharCode(65+chosen)),
        right:   opts[ans] ? (opts[ans].getAttribute('data-raw') || (opts[ans].querySelector('.cq-ct') ? opts[ans].querySelector('.cq-ct').textContent : String.fromCharCode(65+ans))) : String.fromCharCode(65+ans),
        domain:  item.getAttribute('data-domain') || '',
        src:     item.getAttribute('data-src') || '',
        sol:     solEl ? (solEl.getAttribute('data-raw') || solEl.textContent.replace(/^Solution:\s*/i,'')) : '',
        choices: rawChoices
      });
      _mistakes = window.ML.getAll();
    } else {
      /* If this question was in the Mistake Log, record a successful review! */
      var qId = item.getAttribute('data-id');
      var hintsUsed = parseInt(item.getAttribute('data-hints-used') || '0', 10);
      if(qId && window.ML && typeof window.ML.recordReview === 'function'){
        window.ML.recordReview(qId, true, hintsUsed);
        _mistakes = window.ML.getAll();
      }
    }
  };
}());

var _activeMistakeBoxFilter = 0; /* 0 = All, 1..4 = Leitner Box 1..4 */

window.filterMistakesByBox = function(boxNum){
  _activeMistakeBoxFilter = (_activeMistakeBoxFilter === boxNum) ? 0 : boxNum;
  window.openMistakes();
};

window.tagMistakeError = function(id, tag){
  if(window.ML && typeof window.ML.setErrorTag === 'function'){
    window.ML.setErrorTag(id, tag);
    window.openMistakes();
  }
};

/* Bulletproof Mistakes panel — renders Leitner 4-Box Adaptive Deck summary & error tags */
window.openMistakes = function(){
  try {
    var ov   = document.getElementById('mistake-overlay');
    if(!ov){ console.warn('ClipSAT: #mistake-overlay not found'); return; }
    var list = document.getElementById('mistake-list');
    var cnt  = document.getElementById('mistake-count');
    var mistakes = (window.ML && typeof window.ML.getAll === 'function') ? window.ML.getAll() : (_mistakes || []);
    _mistakes = mistakes;
    var stats = (window.ML && typeof window.ML.getDeckStats === 'function')
      ? window.ML.getDeckStats()
      : { total: mistakes.length, dueNow: mistakes.length, boxCounts: {1:mistakes.length, 2:0, 3:0, 4:0} };

    if(cnt){
      cnt.textContent = mistakes.length + ' mistake' + (mistakes.length !== 1 ? 's' : '')
        + ' recorded' + (stats.dueNow > 0 ? (' · ⚡ ' + stats.dueNow + ' due for review') : '');
    }

    if(list){
      if(mistakes.length === 0){
        list.innerHTML = '<div id="mistake-empty">🎉 No mistakes yet! Keep it up.</div>';
      } else {
        var _esc = (typeof escHtml === 'function') ? escHtml : function(s){ return s ? String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;') : ''; };
        var _wm = function(s){
          if(!s) return '';
          s = typeof window.CSAutoMath==='function' ? window.CSAutoMath(s) : String(s);
          if(s.indexOf('\\(')===-1 && s.indexOf('\\[')===-1 && s.indexOf('\\')!==-1) s='\\('+s+'\\)';
          var out='', inM=false, i=0, L=s.length;
          while(i<L){
            if(!inM && s.slice(i,i+2)==='\\('){out+='\\(';i+=2;inM=true;continue;}
            if(!inM && s.slice(i,i+2)==='\\['){out+='\\[';i+=2;inM=true;continue;}
            if(inM && s.slice(i,i+2)==='\\)'){out+='\\)';i+=2;inM=false;continue;}
            if(inM && s.slice(i,i+2)==='\\]'){out+='\\]';i+=2;inM=false;continue;}
            if(s[i]==='<' && i+1<L && (s[i+1]==='/' || /[a-zA-Z]/.test(s[i+1]))){
              var tj=s.indexOf('>', i);
              if(tj!==-1){ out+=s.slice(i, tj+1); i=tj+1; continue; }
            }
            if(!inM && s[i]==='\\' && i+1<L && (s[i+1]==='%' || s[i+1]==='$')){
              out+=s[i+1]; i+=2; continue;
            }
            var c=s[i];
            if(c==='&') out+='&amp;';
            else if(c==='<') out+='&lt;';
            else if(c==='>') out+='&gt;';
            else out+=c;
            i++;
          }
          return out;
        };

        var BOX_META = [
          { box: 1, label: 'Box 1 · Due Now', color: '#dc2626', bg: '#fef2f2', border: '#fecaca' },
          { box: 2, label: 'Box 2 · 1d Review', color: '#d97706', bg: '#fffbeb', border: '#fde68a' },
          { box: 3, label: 'Box 3 · 3d Review', color: '#2563eb', bg: '#eff6ff', border: '#bfdbfe' },
          { box: 4, label: 'Box 4 · Mastered', color: '#16a34a', bg: '#f0fdf4', border: '#bbf7d0' }
        ];

        var deckHeaderHtml = '<div class="cs-adaptive-deck-banner" style="background:var(--paper-2,#f8fafc);border:1.5px solid var(--line,#e2e8f0);border-radius:12px;padding:12px 14px;margin-bottom:14px">'
          + '<div style="display:flex;align-items:center;justify-content:space-between;gap:10px;flex-wrap:wrap;margin-bottom:10px">'
          + '  <div>'
          + '    <div style="font-weight:800;font-size:.9rem;color:var(--indigo,#1e3a6e)">🧠 Leitner Spaced-Repetition Mistake Deck</div>'
          + '    <div style="font-size:.76rem;color:var(--muted,#64748b)">Active recall with 3-tier progressive hints &amp; error root-cause tagging</div>'
          + '  </div>'
          + '  <button type="button" onclick="window.launchAdaptiveMistakeDeck&&window.launchAdaptiveMistakeDeck({dueOnly:true})" '
          + '    style="padding:7px 14px;border-radius:8px;border:none;background:linear-gradient(135deg,#1e3a6e,#2b5ba8);color:#fff;font-weight:700;font-size:.8rem;cursor:pointer;box-shadow:0 2px 8px rgba(30,58,110,.2)">'
          + '    ⚡ Practice Adaptive Deck (' + (stats.dueNow || mistakes.length) + ')'
          + '  </button>'
          + '</div>'
          + '<div style="display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:6px">'
          + BOX_META.map(function(bm){
              var active = (_activeMistakeBoxFilter === bm.box);
              var count = (stats.boxCounts && stats.boxCounts[bm.box]) || 0;
              return '<button type="button" onclick="window.filterMistakesByBox(' + bm.box + ')" '
                + 'style="padding:6px 8px;border-radius:8px;border:' + (active ? ('2px solid ' + bm.color) : ('1px solid ' + bm.border)) + ';background:' + bm.bg + ';color:' + bm.color + ';cursor:pointer;text-align:center;font-family:inherit">'
                + '<div style="font-size:.95rem;font-weight:800">' + count + '</div>'
                + '<div style="font-size:.68rem;font-weight:700">' + bm.label + '</div>'
                + '</button>';
            }).join('')
          + '</div>'
          + '</div>';

        var filtered = mistakes.slice().reverse().filter(function(m){
          if(!_activeMistakeBoxFilter) return true;
          return (m.box || 1) === _activeMistakeBoxFilter;
        }).slice(0, 50);

        var ERROR_TAGS = [
          { key: 'concept', label: '🧠 Concept Gap' },
          { key: 'algebra', label: '➕ Sign/Algebra' },
          { key: 'trap',    label: '🪤 Exam Trap' },
          { key: 'time',    label: '⏱️ Time Rush' }
        ];

        var itemsHtml = filtered.map(function(m){
          var realIdx = mistakes.indexOf(m);
          var b = (m.box >= 1 && m.box <= 4) ? m.box : 1;
          var bm = BOX_META[b - 1];
          var safeId = String(m.id || '').replace(/'/g, "\\'");
          var aiPrompt = 'I got this question wrong. Please explain it step by step.\n\nQuestion: ' + m.q + '\n\nI answered: ' + m.wrong + '\nCorrect answer: ' + m.right;
          var tagPills = ERROR_TAGS.map(function(et){
            var isSel = (m.errorTag === et.key);
            return '<button type="button" onclick="window.tagMistakeError(\'' + safeId + '\',\'' + (isSel ? '' : et.key) + '\')" '
              + 'style="padding:2px 8px;border-radius:999px;font-size:.7rem;font-weight:600;cursor:pointer;border:1px solid '
              + (isSel ? '#1e3a6e;background:#1e3a6e;color:#fff' : 'var(--line,#cbd5e1);background:var(--paper,#fff);color:var(--muted,#64748b)') + '">'
              + et.label + '</button>';
          }).join('');

          return '<div class="m-item">'
            + '<div style="display:flex;align-items:center;justify-content:space-between;gap:6px;margin-bottom:6px;flex-wrap:wrap">'
            + '  <span style="font-size:.7rem;font-weight:700;padding:2px 8px;border-radius:999px;background:' + bm.bg + ';color:' + bm.color + ';border:1px solid ' + bm.border + '">' + bm.label + '</span>'
            + (m.domain ? '<span style="font-size:.72rem;color:var(--muted,#64748b);font-weight:600">' + _esc(m.domain) + '</span>' : '')
            + '</div>'
            + '<div class="mq">'  + _wm(m.q)     + '</div>'
            + '<div class="mw">&#x2717; Your answer: ' + _wm(m.wrong) + '</div>'
            + '<div class="mr">&#x2713; Correct: '    + _wm(m.right) + '</div>'
            + (m.src ? '<div class="ms">' + _esc(m.src) + '</div>' : '')
            + '<div style="display:flex;align-items:center;gap:4px;flex-wrap:wrap;margin:8px 0">'
            + '  <span style="font-size:.7rem;color:var(--muted,#64748b);margin-right:2px">Why missed:</span>'
            + tagPills
            + '</div>'
            + '<div class="m-btns">'
            + '<button class="m-explain-btn" onclick="closeMistakes();window.openChatWith(this.dataset.p)" data-p="' + aiPrompt.replace(/"/g, '&quot;') + '">&#129302; Explain this</button>'
            + '<button class="m-quiz-btn" onclick="reviewMistakeAt(' + realIdx + ')">⚡ Re-test with Hints</button>'
            + '</div></div>';
        }).join('');

        list.innerHTML = deckHeaderHtml + (itemsHtml || '<div style="text-align:center;padding:18px;color:var(--muted)">No mistakes in this Leitner box filter.</div>');
        if(window.MathJax && MathJax.typesetPromise){
          setTimeout(function(){ MathJax.typesetPromise([list]).catch(function(){}); }, 60);
          setTimeout(function(){ MathJax.typesetPromise([list]).catch(function(){}); }, 700);
        }
      }
    }
    ov.classList.add('show');
  } catch(e) {
    var ov2 = document.getElementById('mistake-overlay');
    if(ov2) ov2.classList.add('show');
    console.error('openMistakes error:', e);
  }
};
function openMistakes(){ window.openMistakes(); }
function closeMistakes(){ document.getElementById('mistake-overlay').classList.remove('show'); }
