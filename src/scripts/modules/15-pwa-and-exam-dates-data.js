if('serviceWorker' in navigator){
  // Must be an absolute URL, not './sw.js' — this file runs on every page,
  // including subject-track pages nested one level below the site root
  // (e.g. /qudrat/). A relative './sw.js' from a page at that depth
  // resolves to /qudrat/sw.js (404), so registration silently failed
  // (swallowed by .catch) for any visitor whose first-ever page load was a
  // track page rather than the homepage — a real gap for anyone landing
  // directly on a track via search/a shared link, since the fix only ever
  // took effect retroactively if they later happened to visit the homepage
  // itself. sw.js only exists at the site root (see .eleventy.js's
  // passthrough copy), so hardcode that root the same way the rest of this
  // file already hardcodes absolute site-root paths for
  // bank-data/downloads/navigation.
  navigator.serviceWorker.register('/sw.js').then(function(reg) {
    // ── A real gap behind "it works in incognito, not in my normal
    // window" bug reports (see cloud-sync.js's own long comment on this
    // exact symptom for the other two confirmed causes) ──
    // sw.js caches its own shell assets — main.css, engine.js,
    // cloud-sync.js — cache-first (see sw.js's SHELL_ASSETS). That's
    // correct for performance, but it also means a browser tab that
    // already had this SW installed keeps serving whatever JS/CSS was
    // cached under the OLD SW_VERSION until the browser gets around to
    // noticing sw.js's own bytes changed — which, left to its own
    // devices, only happens on navigation and is throttled to at most
    // once per 24h per spec. A returning visitor in a normal (non-
    // incognito) window can sit on a stale, already-fixed-elsewhere bug
    // — including a sign-in fix shipped in cloud-sync.js — for a long
    // time this way, while a fresh incognito session (no prior SW/cache
    // at all) always gets the current code immediately. Proactively
    // asking for an update check here — on load, and again whenever the
    // tab regains focus — closes most of that gap without ever forcing
    // a reload (which would be actively harmful mid-lesson, e.g. wiping
    // an in-progress Teacher Mode whiteboard): the new SW installs and
    // activates in the background per the normal SW lifecycle, and
    // simply takes over on whatever the visitor's own next natural
    // reload/navigation turns out to be.
    if (!reg) return;
    reg.update()['catch'](function(){});
    document.addEventListener('visibilitychange', function() {
      if (document.visibilityState === 'visible') reg.update()['catch'](function(){});
    });
  })['catch'](function(){});
}

/* ══════════════════════════════════════════════
   EXAM COUNTDOWN TIMERS  (auto-refreshes daily)
══════════════════════════════════════════════ */
(function(){
  /* ── Upcoming official exam dates ──────────────────────────────────────
     Each key matches the showView() name used on the home card.
     Dates are sorted ascending. System picks the nearest future date.
     "Approx." dates (Saudi exams) are best-available estimates and may
     shift slightly — check qiyas.org for the official schedule.
  ─────────────────────────────────────────────────────────────────────── */
  var DATES = {
    // ── College Board: SAT
    sat:     ['2026-08-22','2026-10-03','2026-11-07','2026-12-05',
               '2027-03-13','2027-05-01','2027-06-05'],
    // ── ACT (same schedule for all ACT tracks)
    act:     ['2026-07-11','2026-09-12','2026-10-24','2026-12-12',
               '2027-02-06','2027-04-17','2027-06-12'],
    act2:    ['2026-07-11','2026-09-12','2026-10-24','2026-12-12',
               '2027-02-06','2027-04-17','2027-06-12'],
    act2l2:  ['2026-07-11','2026-09-12','2026-10-24','2026-12-12',
               '2027-02-06','2027-04-17','2027-06-12'],
    // ── College Board: AP (May exam week — exact dates vary ±1 day each year)
    apab:    ['2027-05-03'],
    apbc:    ['2027-05-10'],
    appc:    ['2027-05-09'],
    apstats: ['2027-05-14'],
    // ── Cambridge International & Pearson Edexcel (Oct/Nov session & next May/Jun)
    igcse:   ['2026-10-28','2027-05-05','2027-11-03'],
    edexcel: ['2026-11-04','2027-05-18','2027-11-03'],
    addmath: ['2026-10-29','2027-05-06','2027-11-04'],
    aslevel: ['2026-10-14','2027-05-12','2027-10-13'],
    a2level: ['2026-10-14','2027-05-12','2027-10-13'],
    // ── IB (Nov session starts late Oct; May session starts late April)
    ibsl:    ['2026-10-28','2027-04-28','2027-10-27'],
    ibhl:    ['2026-10-28','2027-04-28','2027-10-27'],
    // ── Saudi / Qiyas: EST (approx. — verify at qiyas.org)
    est:     ['2026-08-15','2026-11-21','2027-02-20','2027-05-15','2027-08-14'],
    est2:    ['2026-08-15','2026-11-21','2027-02-20','2027-05-15','2027-08-14'],
    est2l2:  ['2026-08-15','2026-11-21','2027-02-20','2027-05-15','2027-08-14'],
    // ── Saudi / Qiyas: GAT Qudrat & English GAT/SAAT (approx.)
    qudrat:  ['2026-07-25','2026-10-17','2027-01-16','2027-04-17','2027-07-24'],
    tahsili: ['2026-07-18','2026-10-10','2027-01-09','2027-04-10','2027-07-17'],
    gaten:   ['2026-11-14','2027-01-16','2027-04-17','2027-07-24'],
    // ── Contest Math & Olympiad (AMC 10/12 November & Kangaroo March)
    olympiad:['2026-11-05','2026-11-11','2027-03-18','2027-11-10'],
    // ── School & University Semester Finals (Fall Dec & Spring May)
    algebra: ['2026-12-14','2027-05-24','2027-12-13'],
    geo:     ['2026-12-15','2027-05-25','2027-12-14'],
    alg2:    ['2026-12-16','2027-05-26','2027-12-15'],
    precalc: ['2026-12-17','2027-05-27','2027-12-16'],
    calculus:['2026-12-18','2027-05-28','2027-12-17'],
    linalg:  ['2026-12-14','2027-05-17','2027-12-13'],
    mvc:     ['2026-12-15','2027-05-18','2027-12-14'],
    odes:    ['2026-12-16','2027-05-19','2027-12-15'],
    mathai:  ['2026-12-17','2027-05-20','2027-12-16']
  };

  /* Label shown beside the number */
  var LABEL = {
    sat:'Digital SAT', act:'ACT', act2:'ACT Subject', act2l2:'ACT Math 2',
    apab:'AP Calc AB', apbc:'AP Calc BC', appc:'AP Precalc', apstats:'AP Stats',
    igcse:'Cambridge IGCSE', edexcel:'Edexcel 4MA1', addmath:'Add Math 0606',
    aslevel:'AS Level', a2level:'A2 Level',
    ibsl:'IB May/Nov', ibhl:'IB May/Nov',
    est:'EST (approx.)', est2:'EST II (approx.)', est2l2:'EST II L2 (approx.)',
    qudrat:'Qudrat (approx.)', tahsili:'Tahsili (approx.)', gaten:'GAT/SAAT (approx.)',
    olympiad:'AMC / Kangaroo',
    algebra:'Semester Final', geo:'Semester Final', alg2:'Semester Final',
    precalc:'Semester Final', calculus:'Semester Final',
    linalg:'Univ Final', mvc:'Univ Final', odes:'Univ Final', mathai:'Univ Final'
  };

  function todayMidnight(){ var d=new Date(); d.setHours(0,0,0,0); return d; }

  function nextDate(arr){
    var t=todayMidnight();
    for(var i=0;i<arr.length;i++){
      var d=new Date(arr[i]+'T00:00:00');
      if(d>=t) return d;
    }
    return null;
  }

  function fmtDate(d){
    return d.toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'});
  }

  function renderAll(){
    // Remove any existing badges
    document.querySelectorAll('.exam-cd').forEach(function(el){ el.remove(); });

    var today = todayMidnight();

    document.querySelectorAll('.card[onclick], .card[href]').forEach(function(card){
      var key = null;
      var onc = card.getAttribute('onclick') || '';
      var m = onc.match(/showView\('([^']+)'\)/);
      if(m) key = m[1];
      if(!key){
        var href = card.getAttribute('href') || '';
        var hm = href.match(/^\/([a-z0-9]+)\/?$/i);
        if(hm) key = hm[1].toLowerCase();
      }
      if(!key || !DATES[key]) return;

      var next = nextDate(DATES[key]);
      if(!next) return;

      var days = Math.round((next - today) / 86400000);
      var isApprox = (LABEL[key]||'').indexOf('approx')>-1;

      // Colour: red ≤14, orange ≤30, yellow ≤60, green >60
      // (CSS vars so the shade adapts for light/dark-mode contrast — see .exam-cd rules)
      var col = days<=14 ? 'var(--cd-red)' : days<=30 ? 'var(--cd-orange)' : days<=60 ? 'var(--cd-yellow)' : 'var(--cd-green)';

      var badge = document.createElement('div');
      badge.className = 'exam-cd';
      if(days<=14) badge.classList.add('ec-urgent');

      badge.innerHTML =
        '<span class="ec-n" style="color:'+col+'">'+days+'d</span>'+
        '<span class="ec-lbl">'+
          (LABEL[key]||key)+'<br>'+
          (isApprox?'~':'')+fmtDate(next)+
        '</span>';

      card.appendChild(badge);
    });
  }

  renderAll();

  /* Refresh exactly at midnight each day */
  function scheduleRefresh(){
    var now = new Date();
    var msUntilMidnight = new Date(
      now.getFullYear(), now.getMonth(), now.getDate()+1, 0, 0, 2
    ) - now;
    setTimeout(function(){ renderAll(); scheduleRefresh(); }, msUntilMidnight);
  }
  scheduleRefresh();

})();

/* ══════════════════════════════════════════════════════════════════════════
   ONE-CLICK OFFLINE TRACK STUDY PACK (window.CSOfflinePack)
   Pre-caches the active track's notes HTML, interactive practice (js/ix/),
   HTML5 canvas explorers (js/ex/), verified question bank (bank-data/),
   worksheet manifest, and core simulation bundles for 100% offline study.
══════════════════════════════════════════════════════════════════════════ */
window.CSOfflinePack = (function(){
  var STORAGE_KEY = 'clipsat_offline_tracks';
  var CACHE_NAME = 'clipsat-offline-packs-v1';

  function _isAr(){
    return (document.documentElement.lang === 'ar') ||
           (window.i18n && typeof window.i18n.getLocale === 'function' && window.i18n.getLocale() === 'ar');
  }

  function _getSavedMap(){
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}'); }
    catch(e){ return {}; }
  }

  function _setSaved(trackId){
    var m = _getSavedMap();
    m[trackId] = { savedAt: new Date().toISOString() };
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(m)); } catch(e){}
  }

  function isTrackSaved(trackId){
    return Boolean(trackId && _getSavedMap()[trackId]);
  }

  function getUrlsForTrack(trackId){
    if(!trackId || trackId === 'home') return [];
    return [
      '/' + trackId + '/',
      '/' + trackId + '/index.html',
      '/js/ix/' + trackId + '.js',
      '/js/ex/' + trackId + '.js',
      '/bank-data/' + trackId + '.json',
      '/downloads/' + trackId + '/manifest.json',
      '/js/figures.js',
      '/js/bank-exam.js',
      '/js/practice-quiz.js',
      '/js/diagnostic-test.js'
    ];
  }

  function _updateBtnUI(btn, state){
    if(!btn) btn = document.getElementById('cs-offline-pack-btn');
    if(!btn) return;
    var ar = _isAr();
    if(state === 'saving'){
      btn.disabled = true;
      btn.innerHTML = '<span>⏳</span><span>' + (ar ? 'جاري الحفظ دون إنترنت...' : 'Saving Offline Pack...') + '</span>';
    } else if(state === 'saved'){
      btn.disabled = false;
      btn.style.background = 'rgba(22,163,74,.28)';
      btn.style.borderColor = 'rgba(134,239,172,.6)';
      btn.innerHTML = '<span>✓</span><span data-bilingual><span class="i18n-en"' + (ar ? ' hidden' : '') + '>Saved Offline</span><span class="i18n-ar" dir="rtl" lang="ar"' + (ar ? '' : ' hidden') + '>محفوظ دون إنترنت</span></span>';
    }
  }

  function saveTrack(trackId, btnEl){
    trackId = trackId || window.CLIPSAT_TRACK || 'sat';
    if(trackId === 'home') return Promise.resolve(false);
    _updateBtnUI(btnEl, 'saving');
    var urls = getUrlsForTrack(trackId);

    /* Notify Service Worker as well */
    if(typeof navigator !== 'undefined' && navigator.serviceWorker && navigator.serviceWorker.controller){
      try {
        navigator.serviceWorker.controller.postMessage({
          type: 'PRECACHE_TRACK',
          trackId: trackId,
          urls: urls
        });
      } catch(e){}
    }

    var cachePromise;
    if(typeof caches !== 'undefined' && typeof caches.open === 'function'){
      cachePromise = caches.open(CACHE_NAME).then(function(cache){
        return Promise.all(urls.map(function(u){
          return fetch(u).then(function(res){
            if(res && res.ok) return cache.put(u, res);
          }).catch(function(){});
        }));
      }).catch(function(){});
    } else {
      _setSaved(trackId);
      _updateBtnUI(btnEl, 'saved');
      cachePromise = Promise.resolve(true);
    }

    return cachePromise.then(function(){
      _setSaved(trackId);
      _updateBtnUI(btnEl, 'saved');
      return true;
    });
  }

  function hydrateButton(){
    var btn = document.getElementById('cs-offline-pack-btn');
    if(!btn) return;
    var tr = btn.getAttribute('data-track') || window.CLIPSAT_TRACK;
    if(isTrackSaved(tr)) _updateBtnUI(btn, 'saved');
  }

  if(typeof document !== 'undefined'){
    if(document.readyState !== 'loading') hydrateButton();
    else document.addEventListener('DOMContentLoaded', hydrateButton);
  }

  return {
    getUrlsForTrack: getUrlsForTrack,
    isTrackSaved: isTrackSaved,
    saveTrack: saveTrack,
    hydrateButton: hydrateButton
  };
})();

/* ─────────────────────────────────────────────── */

/* ════ ClipSAT Enhancement Features (59-67) ════ */
