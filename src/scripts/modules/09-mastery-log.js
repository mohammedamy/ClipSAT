/* ═══════════════════════════════════════════════════════════════════════════
   09-mastery-log.js — Spaced-Repetition & Leitner Mistake Log (window.ML)
   Tracks student mistakes with 4-Box Leitner progression, SM-2 ease factors,
   root-cause error tags (Concept Gap, Algebra/Sign Slip, Exam Trap, Time
   Pressure), and full choice/solution snapshots for Adaptive Deck re-testing.
   ═══════════════════════════════════════════════════════════════════════════ */
window.ML = (function(){
  var STORAGE_KEY = 'clipsat_mistakes_v2';
  var MAX_ENTRIES = 500;
  var BOX_INTERVALS_MS = {
    1: 0,                 /* Box 1: Due immediately / Re-test now */
    2: 1 * 86400000,      /* Box 2: 1-day review */
    3: 3 * 86400000,      /* Box 3: 3-day review */
    4: 7 * 86400000       /* Box 4: Mastered (7-day+ spacing) */
  };
  var _log = _load();

  function _normalizeEntry(m, i){
    var now = Date.now();
    var box = (typeof m.box === 'number' && m.box >= 1 && m.box <= 4) ? m.box : 1;
    return {
      id:         m.id || ('legacy-' + i),
      viewId:     m.viewId || '',
      q:          m.q || '',
      wrong:      m.wrong || '',
      right:      m.right || '',
      domain:     m.domain || m.src || '',
      src:        m.src || '',
      sol:        m.sol || '',
      choices:    Array.isArray(m.choices) ? m.choices : [],
      hints:      Array.isArray(m.hints) ? m.hints : undefined,
      box:        box,
      streak:     typeof m.streak === 'number' ? m.streak : 0,
      errorTag:   m.errorTag || '',
      ts:         m.ts || (now - i * 60000),
      reviewedAt: m.reviewedAt || 0,
      easeFactor: typeof m.easeFactor === 'number' ? m.easeFactor : 2.5,
      interval:   typeof m.interval === 'number' ? m.interval : 1,
      nextReview: typeof m.nextReview === 'number' ? m.nextReview : now
    };
  }

  function _load(){
    try{
      var legacy = localStorage.getItem('clipsat_mistakes');
      if(legacy && !localStorage.getItem(STORAGE_KEY)){
        var old = JSON.parse(legacy)||[];
        var migrated = old.map(function(m,i){ return _normalizeEntry(m, i); });
        localStorage.setItem(STORAGE_KEY, JSON.stringify(migrated));
      }
    }catch(e){}
    try{
      var raw = localStorage.getItem(STORAGE_KEY);
      var parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed) ? parsed.map(_normalizeEntry) : [];
    }catch(e){ return []; }
  }

  function _updateBadges(){
    var dueCount = dueForReview().length;
    var total = _log.length;
    var badge = document.getElementById('mistakeBadge');
    if(badge) badge.textContent = total > 0 ? (' (' + total + (dueCount > 0 ? ' · ' + dueCount + ' due' : '') + ')') : '';
    var btn = document.getElementById('mistakeBtn');
    if(btn) btn.textContent = total > 0 ? ('📋 Mistakes (' + total + ')') : '📋 Mistakes';
  }

  function _save(){
    if(_log.length > MAX_ENTRIES) _log = _log.slice(_log.length - MAX_ENTRIES);
    try{ localStorage.setItem(STORAGE_KEY, JSON.stringify(_log)); }catch(e){}
    try{
      localStorage.setItem('clipsat_mistakes', JSON.stringify(
        _log.map(function(m){ return {q:m.q, wrong:m.wrong, right:m.right, src:m.src, domain:m.domain}; })
      ));
    }catch(e){}
    _updateBadges();
  }

  function add(entry){
    if(!entry) return;
    var now = Date.now();
    var existingIdx = -1;
    for(var i = 0; i < _log.length; i++){
      if((entry.id && _log[i].id === entry.id && entry.id !== 'legacy-0') ||
         (entry.q && _log[i].q === entry.q.slice(0, 300))){
        existingIdx = i;
        break;
      }
    }
    if(existingIdx !== -1){
      /* Repeat mistake: reset Leitner box back to Box 1 (Due Now) and update latest wrong choice */
      var ex = _log[existingIdx];
      ex.wrong = entry.wrong || ex.wrong;
      ex.right = entry.right || ex.right;
      if(entry.sol) ex.sol = entry.sol;
      if(Array.isArray(entry.choices) && entry.choices.length) ex.choices = entry.choices;
      ex.box = 1;
      ex.streak = 0;
      ex.ts = now;
      ex.nextReview = now;
      ex.easeFactor = Math.max(1.3, (ex.easeFactor || 2.5) - 0.2);
      _save();
      return;
    }

    _log.push({
      id:         entry.id || ('q-' + now),
      viewId:     entry.viewId || '',
      q:          (entry.q || '').slice(0, 450),
      wrong:      entry.wrong || '',
      right:      entry.right || '',
      domain:     entry.domain || '',
      src:        entry.src || '',
      sol:        entry.sol || '',
      choices:    Array.isArray(entry.choices) ? entry.choices.slice(0, 6) : [],
      hints:      Array.isArray(entry.hints) ? entry.hints.slice(0, 3) : undefined,
      box:        1,
      streak:     0,
      errorTag:   entry.errorTag || '',
      ts:         now,
      reviewedAt: 0,
      easeFactor: 2.5,
      interval:   0,
      nextReview: now /* Box 1 is due immediately in the Adaptive Mistake Deck */
    });
    _save();
  }

  function getAll(){ return _log.slice(); }
  function clear(){ _log = []; _save(); }

  function removeById(id){
    _log = _log.filter(function(m){ return m.id !== id; });
    _save();
  }

  function setErrorTag(id, tag){
    for(var i = 0; i < _log.length; i++){
      if(_log[i].id === id){
        _log[i].errorTag = tag || '';
        _save();
        return _log[i];
      }
    }
    return null;
  }

  /* Leitner + SM-2 review transition:
     - Correct without hints -> promote box (+1 up to Box 4), schedule next review
     - Correct with hints -> promote from Box 1 to Box 2 (12h review), keep Box 2..4
     - Wrong -> demote to Box 1 (due immediately), reset streak */
  function recordReview(id, isCorrect, hintsUsed){
    var entry = null;
    for(var i = 0; i < _log.length; i++){
      if(_log[i].id === id){ entry = _log[i]; break; }
    }
    if(!entry) return null;
    var now = Date.now();
    var hUsed = parseInt(hintsUsed || 0, 10) || 0;
    entry.reviewedAt = now;

    if(isCorrect){
      entry.streak = (entry.streak || 0) + 1;
      if(hUsed === 0){
        entry.box = Math.min(4, (entry.box || 1) + 1);
        entry.easeFactor = Math.min(3.0, (entry.easeFactor || 2.5) + 0.1);
      } else {
        entry.box = Math.max(2, entry.box || 1);
      }
      var baseMs = BOX_INTERVALS_MS[entry.box] || 86400000;
      if(hUsed > 0) baseMs = Math.round(baseMs * 0.5);
      entry.interval = Math.max(1, Math.round(baseMs / 86400000));
      entry.nextReview = now + baseMs;
    } else {
      entry.box = 1;
      entry.streak = 0;
      entry.interval = 0;
      entry.easeFactor = Math.max(1.3, (entry.easeFactor || 2.5) - 0.25);
      entry.nextReview = now;
    }
    _save();
    return entry;
  }

  function updateSRS(id, quality){
    return recordReview(id, quality >= 3, quality === 3 ? 1 : 0);
  }

  function dueForReview(){
    var now = Date.now();
    return _log.filter(function(m){
      return (m.box || 1) === 1 || (m.nextReview || 0) <= now;
    });
  }

  function weakDomains(n){
    var cnt = {};
    _log.forEach(function(m){
      var d = m.domain || 'General Mathematics';
      /* Weight Box 1 mistakes higher than Box 4 mastered mistakes */
      var w = 5 - Math.min(4, m.box || 1);
      cnt[d] = (cnt[d] || 0) + w;
    });
    return Object.keys(cnt).sort(function(a,b){ return cnt[b] - cnt[a]; }).slice(0, n || 3);
  }

  function getDeckStats(){
    var now = Date.now();
    var boxCounts = { 1: 0, 2: 0, 3: 0, 4: 0 };
    var tagCounts = { concept: 0, algebra: 0, trap: 0, time: 0, untagged: 0 };
    var dueNow = 0;
    _log.forEach(function(m){
      var b = (m.box >= 1 && m.box <= 4) ? m.box : 1;
      boxCounts[b] = (boxCounts[b] || 0) + 1;
      if(b === 1 || (m.nextReview || 0) <= now) dueNow++;
      var t = m.errorTag || 'untagged';
      tagCounts[t] = (tagCounts[t] || 0) + 1;
    });
    return {
      total: _log.length,
      dueNow: dueNow,
      boxCounts: boxCounts,
      tagCounts: tagCounts,
      weakestDomains: weakDomains(4)
    };
  }

  /* Build prioritized Adaptive Mistake Deck queue */
  function getAdaptiveDeck(opts){
    opts = opts || {};
    var now = Date.now();
    var pool = _log.slice();
    if(opts.box){
      pool = pool.filter(function(m){ return (m.box || 1) === Number(opts.box); });
    }
    if(opts.errorTag){
      pool = pool.filter(function(m){ return (m.errorTag || '') === opts.errorTag; });
    }
    if(opts.viewId){
      pool = pool.filter(function(m){ return m.viewId === opts.viewId; });
    }
    if(opts.dueOnly){
      var due = pool.filter(function(m){ return (m.box || 1) === 1 || (m.nextReview || 0) <= now; });
      if(due.length) pool = due;
    }

    /* Sort by: (1) due status, (2) Leitner box ascending (Box 1 first), (3) oldest reviewed first */
    pool.sort(function(a, b){
      var aDue = ((a.box || 1) === 1 || (a.nextReview || 0) <= now) ? 0 : 1;
      var bDue = ((b.box || 1) === 1 || (b.nextReview || 0) <= now) ? 0 : 1;
      if(aDue !== bDue) return aDue - bDue;
      var aBox = a.box || 1, bBox = b.box || 1;
      if(aBox !== bBox) return aBox - bBox;
      return (a.reviewedAt || 0) - (b.reviewedAt || 0);
    });

    var limit = opts.limit || 12;
    return pool.slice(0, limit);
  }

  return {
    add: add,
    getAll: getAll,
    clear: clear,
    removeById: removeById,
    setErrorTag: setErrorTag,
    recordReview: recordReview,
    updateSRS: updateSRS,
    dueForReview: dueForReview,
    weakDomains: weakDomains,
    getDeckStats: getDeckStats,
    getAdaptiveDeck: getAdaptiveDeck
  };
}());
