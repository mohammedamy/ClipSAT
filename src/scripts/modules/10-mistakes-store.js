var _mistakes = window.ML.getAll();
function _saveMistakes(){ /* no-op: ML.add() handles persistence */ }

/* ── AccuracyLog: right+wrong attempt counts, bucketed by track/domain/day ──
   ML only ever logs mistakes (no denominator), so there was no way to
   compute an accuracy trend or a per-chapter mastery heatmap (Pillar 3
   MVP). This is the missing piece — compact aggregates, not a raw event
   log, so it stays small in localStorage and in the cloud sync payload. */
window.AccuracyLog = (function(){
  var STORAGE_KEY = 'clipsat_accuracy_v1';
  var MAX_BUCKETS = 1500; // prune oldest days first if this is ever exceeded

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

  /* Per-domain mastery within one track, weakest first — feeds the heatmap. */
  function chapterMastery(track){
    var data = _load();
    var domains = data[track] || {};
    return Object.keys(domains).map(function(domain){
      var c=0,t=0;
      Object.keys(domains[domain]).forEach(function(day){ c+=domains[domain][day].c; t+=domains[domain][day].t; });
      return {domain:domain, correct:c, total:t, pct: t?Math.round(c/t*100):0};
    }).sort(function(a,b){ return a.pct-b.pct; });
  }

  /* Overall accuracy per track (all domains/days combined) — feeds the
     existing per-track Progress rows alongside review%/mastery%. */
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

  /* Last N days, across every track — feeds the trend row. Days with no
     activity come back with total:0 (rendered as a gap, not a 0%). */
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

/* Patch cqPick — record wrong answers into ML with stable IDs, and every
   attempt (right or wrong) into AccuracyLog for the mastery heatmap/trend */
(function(){
  var _orig = window.cqPick;
  window.cqPick = function(el){
    var item = el.closest('.cq-item');
    if(!item || item.classList.contains('cq-done')){ if(_orig) _orig(el); return; }
    var ans    = parseInt(item.getAttribute('data-ans'),10);
    var opts   = Array.prototype.indexOf.call ? Array.prototype.slice.call(item.querySelectorAll('.cq-opt')) : [];
    var chosen = opts.indexOf(el);
    if(_orig) _orig(el);
    var main    = item.closest('main[id^="view-"]');
    var viewId  = main ? main.id.replace('view-','') : '';
    var isRight = chosen === ans;
    if(window.AccuracyLog) window.AccuracyLog.record(viewId, item.getAttribute('data-domain') || '', isRight);
    if(!isRight){
      var qEl = item.querySelector('.cq-stem,.cq-q,.cq-qt');
      window.ML.add({
        id:     item.getAttribute('data-id') || ('q-'+Date.now()),
        viewId: viewId,
        q:      item.getAttribute('data-raw') || (qEl ? qEl.textContent.slice(0,200) : 'Question'),
        wrong:  el.getAttribute('data-raw') || (el.querySelector('.cq-ct') ? el.querySelector('.cq-ct').textContent : String.fromCharCode(65+chosen)),
        right:  opts[ans] ? (opts[ans].getAttribute('data-raw') || (opts[ans].querySelector('.cq-ct') ? opts[ans].querySelector('.cq-ct').textContent : String.fromCharCode(65+ans))) : String.fromCharCode(65+ans),
        domain: item.getAttribute('data-domain') || '',
        src:    item.getAttribute('data-src') || ''
      });
      /* keep legacy array in sync for openMistakes() display */
      _mistakes = window.ML.getAll();
    }
  };
}());

/* Bulletproof Mistakes panel — assigned to window to guarantee global scope */
window.openMistakes = function(){
  try {
    var ov   = document.getElementById('mistake-overlay');
    if(!ov){ console.warn('ClipSAT: #mistake-overlay not found'); return; }
    var list = document.getElementById('mistake-list');
    var cnt  = document.getElementById('mistake-count');
    /* Always fetch fresh data from ML module */
    var mistakes = (window.ML && typeof window.ML.getAll === 'function') ? window.ML.getAll() : (_mistakes || []);
    _mistakes = mistakes; /* keep legacy array in sync */
    if(cnt) cnt.textContent = mistakes.length + ' mistake' + (mistakes.length !== 1 ? 's' : '') + ' recorded';
    if(list){
      if(mistakes.length === 0){
        list.innerHTML = '<div id="mistake-empty">🎉 No mistakes yet! Keep it up.</div>';
      } else {
        var _esc = (typeof escHtml === 'function') ? escHtml : function(s){ return s ? String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;') : ''; };
        /* auto-wrap raw LaTeX (no delimiters), then HTML-escape — but tag-aware:
           quantitative-comparison mistakes (qudrat/tahsili) store real <strong>/
           <br>/<em> markup for bilingual formatting, which must render as actual
           tags, while bare "<"/">" used as math comparison operators (e.g.
           "0 < 5 < 11") in the SAME string must be entity-escaped so they don't
           get parsed as bogus tags and swallow the text after them. Blindly
           escaping every "<"/">" (the old behavior) broke the former case —
           same bug class as the inline-math angle-bracket fix (PR #54), but a
           4th sanitizer copy that sweep didn't reach since it's named _wm, not
           _maths(). Mirrors _maths()'s tag-detection algorithm exactly. */
        var _wm = function(s){
          if(!s) return '';
          s = String(s);
          if(s.indexOf('\\(')===-1 && s.indexOf('\\[')===-1 && /\\[a-zA-Z{([\\]/.test(s)) s='\\('+s+'\\)';
          var out='', i=0, L=s.length;
          while(i<L){
            if(s[i]==='<' && i+1<L && (s[i+1]==='/' || /[a-zA-Z]/.test(s[i+1]))){
              var tj=s.indexOf('>', i);
              if(tj!==-1){ out+=s.slice(i, tj+1); i=tj+1; continue; }
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
        var visible = mistakes.slice().reverse().slice(0, 50);
        list.innerHTML = visible.map(function(m, i){
          var realIdx  = mistakes.length - 1 - i;
          var aiPrompt = 'I got this question wrong. Please explain it step by step.\n\nQuestion: ' + m.q + '\n\nI answered: ' + m.wrong + '\nCorrect answer: ' + m.right;
          return '<div class="m-item">'
            + '<div class="mq">'  + _wm(m.q)     + '</div>'
            + '<div class="mw">&#x2717; Your answer: ' + _wm(m.wrong) + '</div>'
            + '<div class="mr">&#x2713; Correct: '    + _wm(m.right) + '</div>'
            + (m.src ? '<div class="ms">' + _esc(m.src) + '</div>' : '')
            + '<div class="m-btns">'
            + '<button class="m-explain-btn" onclick="closeMistakes();window.openChatWith(this.dataset.p)" data-p="' + aiPrompt.replace(/"/g, '&quot;') + '">&#129302; Explain this</button>'
            + '<button class="m-quiz-btn" onclick="reviewMistakeAt(' + realIdx + ')">&#128260; Quiz me on this</button>'
            + '</div></div>';
        }).join('');
        /* typeset LaTeX in the freshly rendered mistake list */
        if(window.MathJax && MathJax.typesetPromise){
          setTimeout(function(){ MathJax.typesetPromise([list]).catch(function(){}); }, 60);
          setTimeout(function(){ MathJax.typesetPromise([list]).catch(function(){}); }, 700);
        }
      }
    }
    ov.classList.add('show');
  } catch(e) {
    /* Last-resort fallback: force the overlay open */
    var ov2 = document.getElementById('mistake-overlay');
    if(ov2) ov2.classList.add('show');
    console.error('openMistakes error:', e);
  }
};
function openMistakes(){ window.openMistakes(); }
function closeMistakes(){ document.getElementById('mistake-overlay').classList.remove('show'); }

/* ── PROGRESS DASHBOARD ──
   Rolls up existing data into a per-track view — adds no new tracking.
   Sources: clipsat_mistakes_v2 (via window.ML — wrong-answer log, includes
   reviewedAt), clipsat_srs_state (flashcard SM-2-lite state, id "track:slug"),
   clipsat_visited (per-track visit counter). "Mastered" flashcard = interval
   >=6 days, i.e. survived at least two consecutive correct reviews. */
