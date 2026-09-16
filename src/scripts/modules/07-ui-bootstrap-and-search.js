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
      var v = sel.value;
      if(v === 'home') showView('home');
      else showView(v);
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
    if(btn) btn.textContent = LABELS[i];
    localStorage.setItem('clipsat_fs', String(i));
  }
  var saved = parseInt(localStorage.getItem('clipsat_fs'), 10);
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
    localStorage.setItem('clipsat_hc', on ? '1' : '0');
  }
  applyHC(localStorage.getItem('clipsat_hc') === '1');
  if(btn) btn.addEventListener('click', function(){ applyHC(!document.body.classList.contains('hc')); });
})();

/* ── PROGRESS TRACKING ── */
(function(){
  var visited = JSON.parse(localStorage.getItem('clipsat_visited')||'{}');
  function markVisited(name){
    if(!name || name==='home') return;
    visited[name] = (visited[name]||0)+1;
    localStorage.setItem('clipsat_visited', JSON.stringify(visited));
    var card = document.querySelector('.card[onclick*="\'' + name + '\'"]');
    if(card){ card.classList.add('cs-visited'); }
  }
  // Add progress badges to all cards
  document.querySelectorAll('.card[onclick*="showView"]').forEach(function(card){
    var span = document.createElement('span');
    span.className = 'prog-badge';
    span.textContent = '✓';
    card.appendChild(span);
    // check if already visited
    var m = card.getAttribute('onclick').match(/showView\('([^']+)'/);
    if(m && visited[m[1]]) card.classList.add('cs-visited');
  });
  // Patch showView
  var _orig = window.showView;
  window.showView = function(name){
    _orig.apply(this, arguments);
    markVisited(name);
    loadSidebarForView(name);
  };
  window._trackVisit = markVisited;
})();

/* ── SEARCH ── */
(function(){
  var input = document.getElementById('csSearch');
  if(!input) return;
  var noRes = document.createElement('div');
  noRes.className = 'cs-no-results';
  noRes.textContent = 'No matching topics found.';

  /* ── Global live search: build index across all views ── */
  var _searchIndex = [];
  var VIEW_NAMES = {
    'calculus':'Calculus','algebra':'Algebra','apab':'AP Calculus AB','apbc':'AP Calculus BC',
    'igcse':'IGCSE 0580','alg2':'Algebra 2','geo':'Geometry','qudrat':'GAT Qudrat',
    'tahsili':'SAAT Tahsili','sat':'Digital SAT','act':'ACT Math','aslevel':'AS Level',
    'a2level':'A2 Level','est':'EST Math','est2':'EST 2 Math Level 1','est2l2':'EST 2 Math Level 2','act2':'ACT 2 Math Level 1','act2l2':'ACT 2 Math Level 2',
    'precalc':'Pre-Calculus','appc':'AP Precalculus','apstats':'AP Statistics',
    'ibsl':'IB SL Math','ibhl':'IB HL Math'
  };
  window.VIEW_NAMES = VIEW_NAMES;
  function _buildSearchIndex(){
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
  setTimeout(_buildSearchIndex, 1200);

  /* ── Dropdown panel ── */
  var _sdrop = document.createElement('div');
  _sdrop.id = 'cs-search-drop';
  _sdrop.style.cssText = 'display:none;position:absolute;top:calc(100% + 6px);right:0;width:380px;max-height:400px;overflow-y:auto;background:var(--panel);border:1.5px solid var(--line);border-radius:12px;box-shadow:0 8px 28px rgba(0,0,0,.15);z-index:9999;padding:6px 0';
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
      _sdrop.innerHTML = '<div style="padding:14px 16px;color:var(--muted);font-size:.85rem;text-align:center">No results for &ldquo;'+q+'&rdquo;</div>';
      _sdrop.style.display = 'block';
      return;
    }
    /* Group by view */
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
        row.style.cssText = 'display:block;width:100%;text-align:left;padding:8px 16px;background:none;border:none;cursor:pointer;font-size:.85rem;color:var(--ink);border-bottom:1px solid var(--line);transition:background .12s';
        row.onmouseover = function(){ this.style.background='var(--surface-2,#f1f5f9)'; };
        row.onmouseout  = function(){ this.style.background='none'; };
        row.innerHTML = '<span style="font-size:.78rem;color:var(--muted)">' + item.viewName + ' &rsaquo;</span> ' + item.title;
        row.onclick = function(){
          _sdrop.style.display='none';
          input.value = '';
          if(window.goChapter){
            window.goChapter(item.secId, item.viewId);
          } else if(window.showView){
            window.showView(item.viewId);
            setTimeout(function(){
              var el=document.getElementById(item.secId);
              if(el) el.scrollIntoView({behavior:'smooth',block:'start'});
            }, 300);
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

  // Clear search when changing views
  var _orig = window.showView;
  window.showView = function(name){
    _orig.apply(this, arguments);
    input.value = '';
    _sdrop.style.display = 'none';
  };
})();

/* ── FORMULA SIDEBAR ── */
