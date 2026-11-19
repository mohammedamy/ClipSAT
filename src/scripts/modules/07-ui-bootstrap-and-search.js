document.addEventListener('click',function(e){
    var nl=document.getElementById('navlinks');
    var mb=document.getElementById('menuBtn');
    if(!nl||!mb) return;
    if(nl.classList.contains('open')&&!nl.contains(e.target)&&!mb.contains(e.target)){
      nl.classList.remove('open');
      mb.setAttribute('aria-expanded','false');
      mb.innerHTML='&#9776; Menu';
    }
  });
  window.navSelectChange = function(sel){
      var v = typeof sel === 'string' ? sel : (sel && sel.value);
      if(v && window.showView){
        if(v === 'home') window.showView('home');
        else window.showView(v);
      }
    };
  window.shareToClassroom = function(){
    var track = window.CLIPSAT_TRACK || 'home';
    var url = 'https://clipsat.org' + (track === 'home' ? '/' : '/' + track + '/');
    var title = document.title || 'ClipSAT';
    var shareUrl = 'https://classroom.google.com/share?url=' + encodeURIComponent(url) + '&title=' + encodeURIComponent(title);
    window.open(shareUrl, '_blank', 'noopener,noreferrer,width=650,height=550');
  };

/* Splash screen removed (product decision, 2026-08-20 — also closed out the
   CLS 0.535 finding in docs/DECISIONS/0024, since the splash settling was
   what Lighthouse's fresh-profile runs were measuring). See git history
   before this commit for the old 3D-hyperspace intro implementation. */

/* ─────────────────────────────────────────────── */

/* ═══════════════════════════════════════════════
   ClipSAT FEATURES v2 — Dark Mode, Search, Progress,
   Mistake Log, Exam Timer, Formula Sidebar, PWA
═══════════════════════════════════════════════ */

/* ── DARK MODE ── */
(function(){
  var btn = document.getElementById('dmToggle');
  function applyDark(on){
    document.body.classList.toggle('dark', on);
    if(btn) btn.textContent = on ? '☀️' : '🌙';
    localStorage.setItem('clipsat_dark', on ? '1' : '0');
    /* The canvas "Explorer" graphs (hero, polar rose, Riemann sums, …) cache
       their grid/curve colors in JS vars rather than re-reading CSS each
       frame, so toggling here — or applying a saved preference on load,
       below — wouldn't otherwise repaint them; CSPlotRefresh() re-reads the
       theme's CSS custom properties and redraws every widget that's already
       been drawn at least once. */
    if(window.CSPlotRefresh) window.CSPlotRefresh();
  }
  var saved = localStorage.getItem('clipsat_dark');
  if(saved === '1' || (saved === null && window.matchMedia('(prefers-color-scheme:dark)').matches)) applyDark(true);
  if(btn) btn.addEventListener('click', function(){ applyDark(!document.body.classList.contains('dark')); });
})();

/* ── TEXT SIZE (Pillar 4 MVP: "adjustable text size … site-wide") ── */
(function(){
  var STEPS = ['', 'fs-lg', 'fs-xl'];
  var LABELS = ['A', 'A+', 'A++'];
  var btn = document.getElementById('fsToggle');
  function applyStep(i){
    STEPS.forEach(function(c){ if(c) document.documentElement.classList.remove(c); });
    if(STEPS[i]) document.documentElement.classList.add(STEPS[i]);
    if(btn){
      btn.textContent = LABELS[i];
      btn.setAttribute('aria-label', LABELS[i] + ' — Adjust text size');
    }
    try { localStorage.setItem('clipsat_fs', String(i)); } catch(e){}
  }
  var saved = 0;
  try { saved = parseInt(localStorage.getItem('clipsat_fs'), 10); } catch(e){}
  var idx = (saved >= 0 && saved < STEPS.length) ? saved : 0;
  applyStep(idx);
  if(btn) btn.addEventListener('click', function(){ idx = (idx + 1) % STEPS.length; applyStep(idx); });
})();

/* ── HIGH CONTRAST (Pillar 4 MVP: "high-contrast theme toggle site-wide") ── */
(function(){
  var btn = document.getElementById('hcToggle');
  function applyHC(on){
    document.body.classList.toggle('hc', on);
    if(btn) btn.setAttribute('aria-pressed', on ? 'true' : 'false');
    try { localStorage.setItem('clipsat_hc', on ? '1' : '0'); } catch(e){}
  }
  var initHc = false;
  try { initHc = localStorage.getItem('clipsat_hc') === '1'; } catch(e){}
  applyHC(initHc);
  if(btn) btn.addEventListener('click', function(){ applyHC(!document.body.classList.contains('hc')); });
})();

/* ── STICKY READING PROGRESS BAR (WP-27) ── */
(function(){
  var bar = document.getElementById('csReadingProgressBar');
  if(!bar) return;
  var ticking = false;
  function updateReadingProgress(){
    ticking = false;
    var docEl = document.documentElement;
    var scrollTop = window.scrollY || docEl.scrollTop || 0;
    var maxScroll = Math.max(1, (docEl.scrollHeight || 0) - (window.innerHeight || 0));
    var pct = Math.max(0, Math.min(100, (scrollTop / maxScroll) * 100));
    bar.style.width = pct.toFixed(1) + '%';
  }
  window.addEventListener('scroll', function(){
    if(!ticking){
      ticking = true;
      window.requestAnimationFrame(updateReadingProgress);
    }
  }, { passive: true });
  document.addEventListener('clipsat:chapter-change', updateReadingProgress);
  document.addEventListener('clipsat:view-change', updateReadingProgress);
})();

/* ── PROGRESS TRACKING ── */
(function(){
  var visited = {};
  try { visited = JSON.parse(localStorage.getItem('clipsat_visited')||'{}') || {}; } catch(e){}
  var CANONICAL_TRACKS = {
    calculus:1,algebra:1,apab:1,apbc:1,igcse:1,alg2:1,geo:1,qudrat:1,tahsili:1,
    sat:1,act:1,aslevel:1,a2level:1,est:1,est2:1,est2l2:1,act2:1,act2l2:1,
    precalc:1,appc:1,apstats:1,ibsl:1,ibhl:1,linalg:1,mvc:1,odes:1,
    addmath:1,mathai:1,edexcel:1,gaten:1,olympiad:1
  };
  window.CLIPSAT_CANONICAL_TRACKS = CANONICAL_TRACKS;
  function markVisited(name){
    if(!name || !CANONICAL_TRACKS[name]) return;
    visited[name] = (visited[name]||0)+1;
    try { localStorage.setItem('clipsat_visited', JSON.stringify(visited)); } catch(e){}
    var card = document.querySelector('.card[onclick*="\'' + name + '\'"]');
    if(card){ card.classList.add('cs-visited'); }
  }
  // Add progress badges to all cards
  document.querySelectorAll('.card[onclick*="showView"], .card[href]').forEach(function(card){
    if(!card.querySelector('.prog-badge')){
      var span = document.createElement('span');
      span.className = 'prog-badge';
      span.textContent = '✓';
      card.appendChild(span);
    }
    var oc = card.getAttribute('onclick') || '';
    var m = oc.match(/showView\('([^']+)'/);
    var h = (card.getAttribute('href') || '').replace(/^\/(?:ar\/)?|\/$/g, '');
    var tid = (m && m[1]) || h;
    if(tid && visited[tid]) card.classList.add('cs-visited');
  });
  // Record visit on current SSG track page and subscribe to clipsat:view-change
  if(window.CLIPSAT_TRACK && CANONICAL_TRACKS[window.CLIPSAT_TRACK]) markVisited(window.CLIPSAT_TRACK);
  document.addEventListener('clipsat:view-change', function(ev){
    var name = ev && ev.detail && (ev.detail.viewId || ev.detail.view);
    if(name){
      markVisited(name);
      if(typeof loadSidebarForView === 'function') loadSidebarForView(name);
    }
  });
  window._trackVisit = markVisited;
})();

/* ── SEARCH (canonical VIEW_NAMES registry; #csSearch handled securely with escaped DOM) ── */
(function(){
  var VIEW_NAMES = {
    'calculus':'Calculus','algebra':'Algebra','apab':'AP Calculus AB','apbc':'AP Calculus BC',
    'igcse':'IGCSE 0580','alg2':'Algebra 2','geo':'Geometry','qudrat':'GAT Qudrat',
    'tahsili':'SAAT Tahsili','sat':'Digital SAT','act':'ACT Math','aslevel':'AS Level',
    'a2level':'A2 Level','est':'EST Math','est2':'EST 2 Math Level 1','est2l2':'EST 2 Math Level 2','act2':'ACT 2 Math Level 1','act2l2':'ACT 2 Math Level 2',
    'precalc':'Pre-Calculus','appc':'AP Precalculus','apstats':'AP Statistics',
    'ibsl':'IB SL Math','ibhl':'IB HL Math','linalg':'Linear Algebra','mvc':'Multivariable Calculus','odes':'Differential Equations',
    'addmath':'Additional Mathematics (0606/4PM1)','mathai':'Math for AI & Data Science',
    'edexcel':'Pearson Edexcel IGCSE (4MA1)','gaten':'English GAT & SAAT (Qiyas)','olympiad':'Olympiad Math (NSMO & KAUST)'
  };
  window.VIEW_NAMES = VIEW_NAMES;
  var input = document.getElementById('csSearch');
  if(!input || window.CSSearch) return;
  function escS(s){ return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }
  var _searchIndex = [];
  function _buildSearchIndex(){
    if(window.CLIPSAT_CHAPTER_ID) return;
    document.querySelectorAll('main[id^="view-"]').forEach(function(view){
      var vid = view.id.replace('view-','');
      if(vid === 'home') return;
      var vname = VIEW_NAMES[vid] || vid;
      view.querySelectorAll('section[id]').forEach(function(sec){
        var hEl = sec.querySelector('h1,h2,h3,h4');
        var title = hEl ? hEl.textContent.trim() : sec.id;
        var body = sec.textContent.toLowerCase();
        _searchIndex.push({viewId:vid, viewName:vname, secId:sec.id, title:title, body:body});
      });
    });
  }
  if(!window.CLIPSAT_CHAPTER_ID) setTimeout(_buildSearchIndex, 1200);
  var _sdrop = document.createElement('div');
  _sdrop.id = 'cs-search-drop';
  _sdrop.style.cssText = 'display:none;position:absolute;top:calc(100% + 6px);inset-inline-end:0;width:380px;max-height:400px;overflow-y:auto;background:var(--panel);border:1.5px solid var(--line);border-radius:12px;box-shadow:0 8px 28px rgba(0,0,0,.15);z-index:9999;padding:6px 0';
  input.parentElement.style.position = 'relative';
  input.parentElement.appendChild(_sdrop);
  function _runSearch(q){
    var terms = q.trim().toLowerCase().split(/\s+/).filter(Boolean);
    _sdrop.innerHTML = '';
    if(!terms.length){ _sdrop.style.display='none'; return; }
    var hits = _searchIndex.filter(function(r){
      return terms.every(function(t){ return r.body.includes(t) || r.title.toLowerCase().includes(t); });
    }).slice(0, 30);
    if(!hits.length){
      var empty = document.createElement('div');
      empty.style.cssText = 'padding:14px 16px;color:var(--muted);font-size:.85rem;text-align:center';
      empty.textContent = 'No results for \u201C' + q + '\u201D';
      _sdrop.appendChild(empty);
      _sdrop.style.display = 'block';
      return;
    }
    var groups = {};
    hits.forEach(function(h){
      if(!groups[h.viewId]) groups[h.viewId] = {name:h.viewName, items:[]};
      groups[h.viewId].items.push(h);
    });
    Object.keys(groups).forEach(function(vid){
      var g = groups[vid];
      var hdr = document.createElement('div');
      hdr.style.cssText = 'padding:6px 14px 2px;font-size:.7rem;font-weight:800;text-transform:uppercase;letter-spacing:.07em;color:var(--indigo,#4f46e5);background:var(--surface-2,#f8fafc);';
      hdr.textContent = g.name;
      _sdrop.appendChild(hdr);
      g.items.forEach(function(item){
        var row = document.createElement('button');
        row.type = 'button';
        row.style.cssText = 'display:block;width:100%;text-align:start;padding:8px 16px;background:none;border:none;cursor:pointer;font-size:.85rem;color:var(--ink);border-bottom:1px solid var(--line);transition:background .12s';
        row.onmouseover = function(){ this.style.background='var(--surface-2,#f1f5f9)'; };
        row.onmouseout  = function(){ this.style.background='none'; };
        row.innerHTML = '<span style="font-size:.78rem;color:var(--muted)">' + escS(item.viewName) + ' &rsaquo;</span> ' + escS(item.title);
        row.onclick = function(){
          _sdrop.style.display='none';
          input.value = '';
          if(window.goChapter){
            window.goChapter(item.secId, item.viewId);
          } else if(window.showView){
            window.showView(item.viewId);
          }
        };
        _sdrop.appendChild(row);
      });
    });
    _sdrop.style.display = 'block';
  }
  input.addEventListener('input', function(){ _runSearch(this.value); });
  input.addEventListener('focus',  function(){ if(this.value) _runSearch(this.value); });
  document.addEventListener('click', function(e){ if(!input.contains(e.target)&&!_sdrop.contains(e.target)) _sdrop.style.display='none'; });
  input.addEventListener('keydown', function(e){ if(e.key==='Escape'){ _sdrop.style.display='none'; this.value=''; } });
  document.addEventListener('clipsat:view-change', function(){ input.value=''; _sdrop.style.display='none'; });
})();

/* ── FORMULA SIDEBAR ── */
