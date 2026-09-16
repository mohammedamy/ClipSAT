window.ML = (function(){
  var STORAGE_KEY = 'clipsat_mistakes_v2';
  var MAX_ENTRIES = 500;
  var _log = _load();

  function _load(){
    /* migrate from old key on first run */
    try{
      var legacy = localStorage.getItem('clipsat_mistakes');
      if(legacy && !localStorage.getItem(STORAGE_KEY)){
        var old = JSON.parse(legacy)||[];
        var migrated = old.map(function(m,i){
          return {
            id: 'legacy-'+i, viewId:'', q:m.q||'', wrong:m.wrong||'', right:m.right||'',
            domain:m.domain||m.src||'', src:m.src||'', ts:Date.now()-(old.length-i)*60000,
            reviewedAt:0, easeFactor:2.5, interval:1, nextReview:Date.now()+86400000
          };
        });
        localStorage.setItem(STORAGE_KEY, JSON.stringify(migrated));
      }
    }catch(e){}
    try{
      var raw=localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    }catch(e){ return []; }
  }

  function _save(){
    if(_log.length>MAX_ENTRIES) _log=_log.slice(_log.length-MAX_ENTRIES);
    try{ localStorage.setItem(STORAGE_KEY, JSON.stringify(_log)); }catch(e){}
    /* keep legacy key in sync for openMistakes() UI compatibility */
    try{ localStorage.setItem('clipsat_mistakes', JSON.stringify(
      _log.map(function(m){ return {q:m.q,wrong:m.wrong,right:m.right,src:m.src,domain:m.domain}; })
    )); }catch(e){}
    var btn=document.getElementById('mistakeBtn');
    if(btn) btn.textContent='📋 Mistakes ('+_log.length+')';
  }

  function add(entry){
    var now=Date.now();
    var dup=_log.some(function(m){ return m.id===entry.id && m.id!=='legacy-0' && (now-m.ts)<600000; });
    if(dup) return;
    _log.push({
      id:         entry.id||('q-'+now),
      viewId:     entry.viewId||'',
      q:          (entry.q||'').slice(0,300),
      wrong:      entry.wrong||'',
      right:      entry.right||'',
      domain:     entry.domain||'',
      src:        entry.src||'',
      ts:         now,
      reviewedAt: 0,
      easeFactor: 2.5,
      interval:   1,
      nextReview: now+86400000
    });
    _save();
  }

  function getAll(){ return _log.slice(); }
  function clear(){ _log=[]; _save(); }

  function updateSRS(id, quality){
    var entry=null;
    for(var i=0;i<_log.length;i++){ if(_log[i].id===id){ entry=_log[i]; break; } }
    if(!entry) return;
    var ef=Math.max(1.3, entry.easeFactor+0.1-(5-quality)*(0.08+(5-quality)*0.02));
    var interval=quality<3 ? 1 : Math.round(entry.interval*ef);
    entry.easeFactor=ef; entry.interval=interval;
    entry.reviewedAt=Date.now();
    entry.nextReview=Date.now()+interval*86400000;
    _save();
  }

  function dueForReview(){
    var now=Date.now();
    return _log.filter(function(m){ return m.nextReview<=now; });
  }

  function weakDomains(n){
    var cnt={};
    _log.forEach(function(m){ var d=m.domain||'Unknown'; cnt[d]=(cnt[d]||0)+1; });
    return Object.keys(cnt).sort(function(a,b){ return cnt[b]-cnt[a]; }).slice(0,n||3);
  }

  return {add:add, getAll:getAll, clear:clear, updateSRS:updateSRS, dueForReview:dueForReview, weakDomains:weakDomains};
}());

/* keep backward-compat: _mistakes array mirrors ML for openMistakes() */
