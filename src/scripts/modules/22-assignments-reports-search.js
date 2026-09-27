(function(){
'use strict';

/* ── A. Metadata maps ── */
var VIEW_META = {
  home:{label:'Home',board:''},
  calculus:{label:'Calculus',board:'Core Course'},
  algebra:{label:'Algebra I',board:'Core Course'},
  alg2:{label:'Algebra II',board:'Core Course'},
  geo:{label:'Geometry',board:'Core Course'},
  precalc:{label:'Pre-Calculus',board:'Core Course'},
  sat:{label:'Digital SAT Math',board:'College Board'},
  act:{label:'ACT Math',board:'ACT'},
  act2:{label:'ACT 2 Math Level 1',board:'ACT'},
  act2l2:{label:'ACT 2 Math Level 2',board:'ACT'},
  est:{label:'EST I Math',board:'EST'},
  est2:{label:'EST 2 Math Level 1',board:'EST'},
  est2l2:{label:'EST 2 Math Level 2',board:'EST'},
  qudrat:{label:'Qudrat (قدرات)',board:'Qiyas'},
  tahsili:{label:'Tahsili (تحصيلي)',board:'Qiyas'},
  igcse:{label:'IGCSE 0580',board:'Cambridge'},
  aslevel:{label:'AS Level Math',board:'Cambridge'},
  a2level:{label:'A2 Level Math',board:'Cambridge'},
  ibsl:{label:'IB Math SL (AA/AI)',board:'IB'},
  ibhl:{label:'IB Math HL (AA/AI)',board:'IB'},
  apab:{label:'AP Calculus AB',board:'College Board'},
  apbc:{label:'AP Calculus BC',board:'College Board'},
  appc:{label:'AP Pre-Calculus',board:'College Board'},
  apstats:{label:'AP Statistics',board:'College Board'},
};

var CHAPTER_META = {
  'sat/sat-about':    {domain:'Problem Solving', topic:'Test Structure & Strategy',      diff:'All'},
  'sat/sat-linear':   {domain:'Algebra',         topic:'Linear Equations & Systems',     diff:'Medium'},
  'sat/sat-linfun':   {domain:'Algebra',         topic:'Linear Functions & Inequalities',diff:'Medium'},
  'sat/sat-quad':     {domain:'Advanced Math',   topic:'Quadratics & Nonlinear',         diff:'Hard'},
  'sat/sat-expoly':   {domain:'Advanced Math',   topic:'Exponentials & Polynomials',     diff:'Hard'},
  'sat/sat-data':     {domain:'Problem Solving', topic:'Data Analysis & Word Problems',  diff:'Medium'},
  'sat/sat-geo':      {domain:'Geometry',        topic:'Geometry & Trigonometry',        diff:'Medium'},
  'sat/sat-desmos':   {domain:'Problem Solving', topic:'Calculator Strategy & Desmos',   diff:'Easy'},
  'sat/sat-functions':{domain:'Advanced Math',   topic:'Functions',                      diff:'Hard'},
  'sat/sat-stats':    {domain:'Problem Solving', topic:'Statistics & Sampling',          diff:'Medium'},
  'sat/sat-condprob': {domain:'Problem Solving', topic:'Conditional Probability',        diff:'Hard'},
  'igcse/igcse-number':  {domain:'Number',      topic:'Number & Calculation',   diff:'Easy'},
  'igcse/igcse-algebra': {domain:'Algebra',     topic:'Algebra & Graphs',       diff:'Medium'},
  'igcse/igcse-geometry':{domain:'Geometry',    topic:'Geometry & Mensuration', diff:'Medium'},
  'igcse/igcse-trig':    {domain:'Trigonometry',topic:'Trigonometry',           diff:'Medium'},
  'igcse/igcse-stats':   {domain:'Statistics',  topic:'Statistics & Probability',diff:'Easy'},
  'igcse/igcse-vectors': {domain:'Vectors',     topic:'Vectors & Transformations',diff:'Hard'},
  'ibsl/ibsl-numbers':   {domain:'Number & Algebra',topic:'Sequences, Logs & Binomial',diff:'Medium'},
  'ibsl/ibsl-functions': {domain:'Functions',      topic:'Transformations & Inverses',  diff:'Medium'},
  'ibsl/ibsl-trig':      {domain:'Geometry & Trig',topic:'Unit Circle & Identities',    diff:'Hard'},
  'ibsl/ibsl-stats':     {domain:'Statistics',     topic:'Probability Distributions',   diff:'Hard'},
  'ibsl/ibsl-calculus':  {domain:'Calculus',       topic:'Differentiation & Integration',diff:'Hard'},
};

var CHAPTER_OBJECTIVES = {
  'sat-about':   ['Understand the digital, adaptive SAT format and timing','Know the section structure and adaptive scoring system','Identify question types: multiple choice and student-produced response','Plan a personal strategy using the built-in Desmos calculator'],
  'sat-linear':  ['Set up and solve linear equations with one or two variables','Solve systems of linear equations by substitution and elimination','Interpret slope and intercept in real-world contexts','Recognise and handle special cases: no solution, infinitely many solutions'],
  'sat-linfun':  ['Graph linear functions and identify slope and y-intercept','Write linear models from tables, graphs, and descriptions','Solve and graph linear inequalities in one and two variables','Interpret linear models in applied contexts'],
  'sat-quad':    ['Solve quadratic equations by factoring, completing the square, and the quadratic formula','Interpret vertex form a(x−h)²+k and identify axis of symmetry and extrema','Use the discriminant to determine the number and nature of solutions','Match an equation to its parabola and identify key features'],
  'sat-expoly':  ['Evaluate and interpret exponential growth and decay models','Apply properties of exponents and radical expressions','Factor and evaluate polynomial expressions','Identify end behaviour and roots of polynomial functions'],
  'sat-geo':     ['Apply the Pythagorean theorem and properties of special right triangles','Calculate area, surface area, and volume of standard solids','Use trigonometric ratios in right triangles','Convert between degrees and radians; apply arc length and sector area'],
  'sat-functions':['Evaluate function notation and interpret function composition','Identify transformations: translation, reflection, dilation','Determine domain and range from graphs and equations','Solve equations involving absolute value and piecewise functions'],
  'sat-stats':   ['Calculate and interpret mean, median, and spread measures','Read and draw inferences from tables, scatterplots, and bar charts','Distinguish between correlation and causation','Apply basic probability rules and expected value'],
  'igcse-algebra':['Expand, factorise, and simplify algebraic expressions','Solve linear and quadratic equations and simultaneous equations','Rearrange formulae and construct equations from word problems','Sketch and interpret straight-line and quadratic graphs'],
  'igcse-trig':  ['Apply SOHCAHTOA in right-angled triangles','Use the sine rule and cosine rule for non-right triangles','Calculate area of a triangle using ½ab sinC','Identify and apply bearings in trigonometric contexts'],
};

var _currentView    = 'home';
var _currentChapter = '';
window._csCurrentView = 'home';

/* ── B. Breadcrumb ── */
function _updateBreadcrumb(viewId, chapterId) {
  var bar      = document.getElementById('cs-breadcrumb');
  var bCourse  = document.getElementById('bc-course');
  var bChapter = document.getElementById('bc-chapter');
  var bSep     = bar && bar.querySelector('.bc-sep');
  if (!bar) return;
  if (!viewId || viewId === 'home') {
    bar.classList.add('bc-hidden');
    document.body.classList.add('view-home');
    return;
  }
  document.body.classList.remove('view-home');
  bar.classList.remove('bc-hidden');
  var meta = VIEW_META[viewId] || {label:viewId, board:''};
  if (meta.board) {
    bCourse.innerHTML = '<small style="opacity:.65;margin-right:5px;font-size:.68rem;letter-spacing:.12em;text-transform:uppercase">'
      + _esc(meta.board) + ' ›</small>' + _esc(meta.label);
  } else {
    bCourse.textContent = meta.label;
  }
  if (chapterId) {
    var chEl = document.getElementById(chapterId);
    var h2   = chEl && chEl.querySelector('.chead h2');
    bChapter.textContent = h2 ? h2.textContent.trim() : '';
    if (bChapter.textContent) {
      bChapter.style.display = ''; if (bSep) bSep.style.display = '';
    } else {
      bChapter.style.display = 'none'; if (bSep) bSep.style.display = 'none';
    }
  } else {
    bChapter.style.display = 'none'; if (bSep) bSep.style.display = 'none';
  }
}

(function(){
  var _origSV = window.showView;
  window.showView = function(name) {
    _currentView = name; window._csCurrentView = name; _currentChapter = '';
    if (_origSV) _origSV.apply(this, arguments);
    _updateBreadcrumb(name, '');
    document.body.classList.remove.apply(document.body.classList,
      Array.from(document.body.classList).filter(function(c){ return /^view-/.test(c); }));
    if (name) document.body.classList.add('view-' + name);
  };
}());

(function(){
  var _origGC = window.goChapter;
  window.goChapter = function(chId, view) {
    _currentChapter = chId; if (view) { _currentView = view; window._csCurrentView = view; }
    if (_origGC) _origGC.apply(this, arguments);
    /* CLS fix: used to be setTimeout(...,90) — #cs-breadcrumb starts
       height:0 (main.css's .bc-hidden) until this reveals it, and (unlike
       _renderChapterTeacherMeta below, genuinely opt-in Teacher Mode UI)
       the breadcrumb is on by default for every visitor on every track
       page. _origGC.apply just above is synchronous (see goChapter's own
       fix), so _currentView/chId are already valid — no reason left to
       delay this. */
    _updateBreadcrumb(_currentView, chId);
    setTimeout(function(){ _renderChapterTeacherMeta(chId, _currentView); }, 110);
  };
}());

/* ── C. Chapter objectives ── */
function _injectObjectives() {
  document.querySelectorAll('section.chapter').forEach(function(sec) {
    if (sec.querySelector('.chapter-objectives')) return;
    var id    = sec.id;
    var items = [];
    var raw = sec.getAttribute('data-objectives');
    if (raw) items = raw.split('|');
    else if (CHAPTER_OBJECTIVES[id]) items = CHAPTER_OBJECTIVES[id];
    if (!items.length) return;
    var ul = document.createElement('ul');
    ul.className = 'chapter-objectives';
    items.forEach(function(txt) {
      var li = document.createElement('li'); li.textContent = txt.trim(); ul.appendChild(li);
    });
    var chead = sec.querySelector('.chead');
    if (chead && chead.nextSibling) sec.insertBefore(ul, chead.nextSibling);
    else if (chead) sec.appendChild(ul);
  });
}

/* ── D. Difficulty pills ── */
function _upgradeDifficultyControls() {
  document.querySelectorAll('.ch-quiz-wrap').forEach(function(wrap, i) {
    if (wrap.querySelector('.cq-difficulty')) return;
    var lvlSelect = wrap.querySelector('.cq-level');
    var controls  = wrap.querySelector('.ch-quiz-controls') || wrap.querySelector('.ch-quiz-bar');
    if (!controls) return;
    if (lvlSelect && lvlSelect.closest('label')) lvlSelect.closest('label').style.display = 'none';
    else if (lvlSelect) lvlSelect.style.display = 'none';
    var chId = (wrap.closest('section') || {}).id || ('cq-' + i);
    var groupName = 'diff-' + chId;
    var pills = document.createElement('span');
    pills.className = 'cq-difficulty';
    [{value:'all',label:'All'},{value:'Easy',label:'Easy'},{value:'Medium',label:'Medium'},{value:'Hard',label:'Hard'}]
    .forEach(function(opt) {
      var lbl   = document.createElement('label');
      var radio = document.createElement('input');
      radio.type = 'radio'; radio.name = groupName; radio.value = opt.value;
      if (opt.value === 'all') radio.checked = true;
      radio.addEventListener('change', function() {
        if (lvlSelect) lvlSelect.value = opt.value === 'all' ? 'all' : opt.value;
        wrap.setAttribute('data-diff', opt.value);
      });
      var span = document.createElement('span');
      span.className = 'diff-pill'; span.textContent = opt.label;
      lbl.appendChild(radio); lbl.appendChild(span); pills.appendChild(lbl);
    });
    var genBtn = controls.querySelector('.cq-btn, button[onclick]');
    if (genBtn) controls.insertBefore(pills, genBtn);
    else controls.appendChild(pills);
  });
}

(function(){
  var _orig = window.genChapterQuiz;
  if (!_orig) return;
  window.genChapterQuiz = function(btn) {
    var wrap = btn.closest('.ch-quiz-wrap');
    if (wrap) {
      var diff = wrap.getAttribute('data-diff');
      var lvlSel = wrap.querySelector('.cq-level');
      if (diff && lvlSel) lvlSel.value = diff === 'all' ? 'all' : diff;
    }
    return _orig.apply(this, arguments);
  };
}());

/* ── E. Mobile rail ── */
function _setupMobileRail() {
  document.querySelectorAll('.view').forEach(function(view) {
    var body = view.querySelector('.wrap.calc-body, .calc-body');
    if (!body) return;
    var rail = body.querySelector('aside.rail');
    if (!rail || body.querySelector('#rail-toggle-btn')) return;
    var overlay = document.createElement('div');
    overlay.className = 'rail-overlay';
    overlay.addEventListener('click', closeRail);
    // Appended into the SAME container as `rail` (.wrap.calc-body), not
    // document.body: `.view.active` runs a fade-in animation touching
    // transform/opacity (see main.css's clipsat-fadein keyframes), and per
    // spec an animated transform/opacity creates a new stacking context +
    // containing block for fixed-position descendants for as long as the
    // animation's fill-mode ("both") persists — i.e. indefinitely. That
    // trapped `rail` (z-index 210, position:fixed, a descendant of the
    // animated <main>) underneath this overlay (z-index 200, but rooted at
    // the real document body, outside the trap): a tap on a chapter link
    // was hitting the overlay instead and just closing the menu — the menu
    // "did nothing" on mobile. Keeping both elements in the same stacking
    // context (both inside .wrap.calc-body) lets their existing z-index
    // values resolve correctly instead of fighting an ancestor's animation.
    body.appendChild(overlay);
    var btn = document.createElement('button');
    btn.id = 'rail-toggle-btn';
    btn.setAttribute('aria-expanded', 'false');
    btn.innerHTML = '<svg viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"/></svg> Chapters';
    function openRail()  { rail.classList.add('rail-open'); overlay.classList.add('open'); btn.setAttribute('aria-expanded','true'); }
    function closeRail() { rail.classList.remove('rail-open'); overlay.classList.remove('open'); btn.setAttribute('aria-expanded','false'); }
    btn.addEventListener('click', function() {
      rail.classList.contains('rail-open') ? closeRail() : openRail();
    });
    rail.querySelectorAll('a').forEach(function(a){ a.addEventListener('click', closeRail); });
    body.insertBefore(btn, body.firstChild);
  });
}

/* ── F. Teacher chapter meta panel ── */
function _renderChapterTeacherMeta(chId, viewId) {
  document.querySelectorAll('.tm-chapter-panel').forEach(function(el){ el.remove(); });
  if (!document.body.classList.contains('tm-on')) return;
  var key  = (viewId||_currentView) + '/' + chId;
  var meta = CHAPTER_META[key]; if (!meta) return;
  var chEl = document.getElementById(chId); if (!chEl) return;
  var vm   = VIEW_META[viewId||_currentView] || {};
  var panel = document.createElement('div');
  panel.className = 'tm-chapter-panel';
  panel.innerHTML =
    '<strong style="color:var(--amber-700);letter-spacing:.08em;text-transform:uppercase;font-size:10px;font-family:var(--sans)">Teacher</strong>' +
    '<span class="tm-tag">'+ _esc(vm.board||viewId) +'</span>' +
    '<span class="tm-tag">'+ _esc(meta.domain) +'</span>' +
    '<span style="font-family:var(--sans)">'+ _esc(meta.topic) +'</span>' +
    '<span class="tm-tag tm-diff-'+(meta.diff||'').toLowerCase()+'">'+ _esc(meta.diff) +'</span>';
  var chead = chEl.querySelector('.chead');
  if (chead) chead.insertAdjacentElement('afterend', panel);
}

/* window.TeacherMode (20b-teacher-mode.js, Plan 5 Phase 5.015) is lazy-loaded
   on demand, not present in the eager bundle this file ships in — so this
   decoration can't just run once at this file's own load time the way it
   used to (TeacherMode would never be here yet). Exposed as a named,
   idempotent function instead: called once below (a no-op today, kept for
   robustness if TeacherMode is ever eager again), and called a second time
   by the lazy-loader (08b-teacher-mode-loader.js) right after TeacherMode's
   script finishes loading — that's the real trigger path now. */
var _tmDecorated = false;
function _applyTeacherModeDecoration() {
  if (_tmDecorated || !window.TeacherMode) return;
  _tmDecorated = true;
  var _origToggle = window.TeacherMode.toggle;
  window.TeacherMode.toggle = function() {
    if (_origToggle) _origToggle.apply(this, arguments);
    var isOn = window.TeacherMode.isActive && window.TeacherMode.isActive();
    document.body.classList.toggle('tm-on', isOn);
    var btn = document.getElementById('teacherModeBtn');
    if (btn) btn.classList.toggle('tm-active', isOn);
    if (isOn) _renderChapterTeacherMeta(_currentChapter, _currentView);
    else document.querySelectorAll('.tm-chapter-panel').forEach(function(el){ el.remove(); });
  };
}
window._applyTeacherModeDecoration = _applyTeacherModeDecoration;
_applyTeacherModeDecoration();

/* ── G. Topic search ── */
/* ── Topic search index — built from DOM at load time so ALL chapters appear ──
   On the multi-page build, this page's DOM only ever contains its OWN
   <main id="view-X"> — a student on /sat/ can't have /calculus/'s chapters
   in the document to scan. window.SEARCH_CHAPTER_INDEX (injected by build.js,
   which is the only place in the pipeline that sees all 21 tracks' raw HTML
   at once) supplies the complete cross-track list; the DOM scan below still
   runs as a belt-and-suspenders fallback for the current page. */
var SEARCH_INDEX = [];
(function _buildIdx(){
  function _run(){
    var idx=[], seen={};
    /* Precomputed, build-time-complete chapter index across all tracks */
    (window.SEARCH_CHAPTER_INDEX||[]).forEach(function(e){
      if(seen[e.chapter]) return;
      seen[e.chapter]=1;
      var vm=(window.VIEW_META&&VIEW_META[e.view])||{};
      /* e.keywords (build-time-harvested rule/definition/worked-example names —
         see build.js "Generate search index") let a query like "chain rule" or
         "law of cosines" match a chapter even when that phrase never appears in
         its title, without bloating the visible result card. */
      var tags=[e.view,vm.label||'',vm.board||'',e.title,e.chapter].concat(e.keywords||[]).map(function(t){return t.toLowerCase();});
      idx.push({title:e.title,sub:vm.label||e.view,board:vm.board||'',view:e.view,chapter:e.chapter,
        keywords:e.keywords||[],tags:tags});
    });
    /* Primary: scan nav rail links (has real chapter titles + view context) */
    document.querySelectorAll('.view').forEach(function(viewEl){
      var vid=viewEl.id.replace(/^view-/,'');
      var vm=(window.VIEW_META&&VIEW_META[vid])||{};
      viewEl.querySelectorAll('a[data-target]').forEach(function(a){
        var chId=a.getAttribute('data-target');
        if(!chId||seen[chId]) return;
        seen[chId]=1;
        var clone=a.cloneNode(true);
        var ns=clone.querySelector('.num,.ch-num,.number,.accuracy-badge');
        if(ns) ns.remove();
        var title=clone.textContent.replace(/[✓●☆★🔒🔓]/g,'').trim();
        if(!title||title.length<2) return;
        idx.push({title:title,sub:vm.label||vid,board:vm.board||'',view:vid,chapter:chId,
          tags:[vid,vm.label||'',vm.board||'',title,chId].map(function(t){return t.toLowerCase();})});
      });
    });
    /* Fallback: scan section.chapter elements if rail scan was too sparse */
    if(idx.length<20){
      document.querySelectorAll('section.chapter[id]').forEach(function(sec){
        var chId=sec.id; if(seen[chId]) return;
        var viewEl=sec.closest('.view'); if(!viewEl) return;
        var vid=viewEl.id.replace(/^view-/,'');
        var vm=(window.VIEW_META&&VIEW_META[vid])||{};
        var h=sec.querySelector('h2,h3,.ch-title');
        var title=h?h.textContent.trim():chId.replace(/-/g,' ');
        idx.push({title:title,sub:vm.label||vid,board:vm.board||'',view:vid,chapter:chId,
          tags:[vid,vm.label||'',vm.board||'',title,chId].map(function(t){return t.toLowerCase();})});
      });
    }
    /* Also add course-level entries (e.g. "Calculus" navigates to view) */
    Object.keys(VIEW_META||{}).forEach(function(vid){
      if(vid==='home') return;
      var vm=VIEW_META[vid];
      idx.push({title:vm.label||vid,sub:'Course — '+(vm.board||''),board:vm.board||'',
        view:vid,chapter:'',
        tags:[vid,vm.label||'',vm.board||''].map(function(t){return t.toLowerCase();})});
    });
    SEARCH_INDEX=idx;
    console.log('[CSSearch] index built: '+idx.length+' entries');
  }
  _buildSearchIndex=_run;
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',_run);
  else _run();
}());
/* The cross-track chapter index (window.SEARCH_CHAPTER_INDEX, ~70KB) ships as
   public/js/search-index.js and loads the first time the search box is used (ADR 0044).
   Until then the index holds this page's own chapters (the rail scan above) and every
   course; once the file arrives the index is rebuilt and the current query re-run. */
var _buildSearchIndex, _searchIdxPromise=null; /* _buildSearchIndex is set by _buildIdx above */
function _ensureSearchIndex(){
  if(_searchIdxPromise) return _searchIdxPromise;
  _searchIdxPromise=new Promise(function(resolve){
    var s=document.createElement('script');
    s.src='/js/search-index.js';
    s.onload=function(){ if(_buildSearchIndex) _buildSearchIndex(); resolve(true); };
    s.onerror=function(){ _searchIdxPromise=null; resolve(false); };
    document.head.appendChild(s);
  });
  return _searchIdxPromise;
}
/* CSAssign (assignments) and CSReport (progress reports) are reachable only from Teacher
   Mode's panel, so they ship inside public/js/teacher-mode.js (22b-assign-report.js,
   ADR 0043). CSAssign's course list reads VIEW_META through window.CSViewMeta. */
window.CSViewMeta = VIEW_META;


window.CSSearch = {
  _q:'',_active:-1,
  /* Diacritic/punctuation-insensitive matching — a query like "hopital" (no
     accent, no apostrophe — how most people actually type it on a plain
     keyboard) used to return nothing for content indexed as "L'Hôpital's
     Rule", even though that content exists and is indexed under that exact
     accented keyword. NFD-decomposing and stripping combining marks folds
     ô→o, é→e, etc.; stripping the apostrophe separately handles
     "l'hopital"/"lhopital" both landing on the same comparable string.
     Applied identically to the query and every indexed field being
     compared against it, so it's purely a matching-time normalization —
     display text (item.title etc.) is untouched, still shows "L'Hôpital's
     Rule" properly accented in the results. */
  _norm:function(s){
    return String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/['’]/g,'').toLowerCase();
  },
  /* Plain iterative Levenshtein (single-row DP) -- short strings only
     (index words, not whole titles), so the O(len_a*len_b) cost per
     comparison is trivial; see _fuzzyMatches for why this only ever runs
     on an otherwise-empty result set, not on every keystroke. */
  _editDistance:function(a,b){
    var m=a.length, n=b.length;
    if(!m) return n; if(!n) return m;
    var prev=[], cur=[], i, j, cost;
    for(j=0;j<=n;j++) prev[j]=j;
    for(i=1;i<=m;i++){
      cur[0]=i;
      for(j=1;j<=n;j++){
        cost = a.charAt(i-1)===b.charAt(j-1) ? 0 : 1;
        cur[j]=Math.min(prev[j]+1, cur[j-1]+1, prev[j-1]+cost);
      }
      prev=cur.slice();
    }
    return prev[n];
  },
  /* Typo-tolerant fallback for an otherwise-empty result set (e.g.
     "quadratik"/"quadractic" for "Quadratic Functions") -- deliberately
     NOT blended into the main score()/substring pass below: it only ever
     runs once that pass has already found nothing, so a good exact/
     prefix/substring match is never outranked or diluted by a fuzzy one,
     and the per-keystroke cost of scanning every index word stays off the
     common "results already found" path. Threshold scales with word
     length -- the same 1-edit/2-edit split Elasticsearch's fuzzy "AUTO"
     uses -- so a short query like "trig" can't fuzzy-match half the
     index. */
  _fuzzyMatches:function(q){
    var self=this, norm=this._norm;
    var maxDist = q.length<=5 ? 1 : 2;
    var results=[];
    SEARCH_INDEX.forEach(function(item){
      var words = norm(item.title).split(/[^a-z0-9]+/).filter(Boolean);
      (item.keywords||[]).forEach(function(k){
        words = words.concat(norm(k).split(/[^a-z0-9]+/).filter(Boolean));
      });
      var best = null;
      words.forEach(function(w){
        if(Math.abs(w.length-q.length) > maxDist) return;
        var d = self._editDistance(q, w);
        if(d<=maxDist && (best===null || d<best)) best=d;
      });
      if(best!==null) results.push({item:item, dist:best});
    });
    return results.sort(function(a,b){ return a.dist-b.dist; }).slice(0,5).map(function(x){ return x.item; });
  },
  onInput:function(val){
    if(!_searchIdxPromise){
      var self=this;
      _ensureSearchIndex().then(function(ok){
        var inp=document.getElementById('topic-search');
        if(ok&&inp&&document.activeElement===inp&&inp.value.trim().length>=2) self.onInput(inp.value);
      });
    }
    this._active=-1;
    this._q = this._norm((val||'').trim());
    var res = document.getElementById('topic-search-results'); if (!res) return;
    if (!this._q || this._q.length < 2) { this.close(); return; }
    var q = this._q, norm = this._norm;
    /* Score + rank instead of taking matches in arbitrary index order — an
       exact/prefix title match should always outrank one buried mid-string,
       and a title match should always outrank a match that only hit a
       keyword or a tag like the view id/board name. */
    var qRe;
    try { qRe = new RegExp('\\b' + q.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')); } catch(e) { qRe = null; }
    function score(item){
      var title = norm(item.title), s = 0;
      if (title === q) s = 100;
      else if (title.indexOf(q) === 0) s = 80;
      else if (qRe && qRe.test(title)) s = 60;
      else if (title.indexOf(q) !== -1) s = 40;
      (item.keywords||[]).forEach(function(k){
        k = norm(k);
        if (k === q) s = Math.max(s, 55);
        else if (k.indexOf(q) === 0) s = Math.max(s, 45);
        else if (k.indexOf(q) !== -1) s = Math.max(s, 30);
      });
      if (item.sub && norm(item.sub).indexOf(q) !== -1) s = Math.max(s, 15);
      if (!s && item.tags.some(function(t){ return norm(t).indexOf(q) !== -1; })) s = 10;
      return s;
    }
    var matches = SEARCH_INDEX.map(function(item){ return {item:item, score:score(item)}; })
      .filter(function(x){ return x.score > 0; })
      .sort(function(a,b){ return b.score - a.score; })
      .slice(0,8)
      .map(function(x){ return x.item; });
    var fuzzy = false;
    if (!matches.length) {
      matches = this._fuzzyMatches(q);
      fuzzy = matches.length > 0;
    }
    if (!matches.length) {
      res.innerHTML = '<div class="ts-item"><span class="ts-item-title" style="color:var(--text-3)">No results — try another term</span></div>';
    } else {
      res.innerHTML = (fuzzy ? '<div class="ts-fuzzy-hint" style="padding:6px 12px;font-size:.76rem;font-style:italic;color:var(--text-3)">Showing close matches for “'+_esc(val)+'”</div>' : '')
        + matches.map(function(m){
        return '<div class="ts-item" onclick="window.CSSearch.go(\''+m.view+'\',\''+m.chapter+'\')" role="option" tabindex="0">' +
          '<span class="ts-item-title"><span class="ts-item-tag">'+_esc(m.board||m.view)+'</span>'+_esc(m.title)+'</span>' +
          '<span class="ts-item-meta">'+_esc(m.sub)+'</span></div>';
      }).join('');
    }
    /* Position as fixed so nav overflow:hidden can't clip it */
    var _inp=document.getElementById('topic-search');
    if(_inp){var _r=_inp.getBoundingClientRect();res.style.cssText='position:fixed!important;top:'+(Math.round(_r.bottom)+4)+'px;left:'+Math.round(_r.left)+'px;width:'+Math.max(280,Math.round(_r.width))+'px;z-index:9999';}
    res.classList.add('open');
  },
  onKey:function(e){
    if(e.key==='Escape'){this.close();var inp=document.getElementById('topic-search');if(inp)inp.blur();return;}
    var items=document.querySelectorAll('#topic-search-results .ts-item');
    if(e.key==='ArrowDown'){
      e.preventDefault();
      this._active=Math.min(this._active+1,items.length-1);
      var self=this;
      items.forEach(function(el,i){el.classList.toggle('active',i===self._active);});
      return;
    }
    if(e.key==='ArrowUp'){
      e.preventDefault();
      this._active=Math.max(this._active-1,-1);
      var self=this;
      items.forEach(function(el,i){el.classList.toggle('active',i===self._active);});
      return;
    }
    if(e.key==='Enter'){
      var act=document.querySelector('#topic-search-results .ts-item.active')||document.querySelector('#topic-search-results .ts-item');
      if(act) act.click();
      return;
    }
  },
  close:function(){
    var res=document.getElementById('topic-search-results'); if(res) res.classList.remove('open');
  },
  go:function(viewId, chapterId){
    this.close();
    var inp=document.getElementById('topic-search'); if(inp) inp.value='';
    /* Multi-page build: a chapter that belongs to a DIFFERENT track than the
       current page isn't in this page's DOM at all — goChapter would silently
       no-op. Do a real page navigation and pass the target chapter along so
       the destination page can open it on load (see base.njk's post-engine
       shim, which checks for this ?ch= param). Same-track / single-page
       (index.html-only) behavior is unchanged. */
    var current = window.CLIPSAT_TRACK;
    if(current && viewId !== current){
      var dest = '/' + (viewId === 'home' ? '' : viewId + '/');
      window.location.href = chapterId ? dest + '?ch=' + encodeURIComponent(chapterId) : dest;
      return;
    }
    if(chapterId&&window.goChapter) window.goChapter(chapterId, viewId);
    else if(window.showView) window.showView(viewId);
  }
};

/* ── H. Lazy initialisation ── */
var _lazyInitted = {};
function _lazyInitChapter(sec) {
  sec.querySelectorAll('canvas[data-lazy-init]').forEach(function(c){
    if (_lazyInitted[c.id]) return;
    _lazyInitted[c.id] = true;
    var fn = window[c.getAttribute('data-lazy-init')];
    if (typeof fn === 'function') try{ fn(c); }catch(e){ console.warn('LazyInit:',c.id,e); }
  });
  if (window.MathJax && MathJax.typesetPromise) MathJax.typesetPromise([sec]).catch(function(){});
}
(function(){
  var mo = new MutationObserver(function(muts){
    muts.forEach(function(m){
      if (m.type==='attributes' && m.attributeName==='class') {
        var el=m.target;
        if (el.classList.contains('chapter') && el.classList.contains('ch-active')) _lazyInitChapter(el);
      }
    });
  });
  document.querySelectorAll('.chapter').forEach(function(c){ mo.observe(c,{attributes:true,attributeFilter:['class']}); });
}());

/* ── Utility ── */
function _esc(s){ return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }

/* ── Boot ── */
function _boot(){
  _injectObjectives();
  _upgradeDifficultyControls();
  _setupMobileRail();
  var hash = location.hash.replace('#','');
  /* Skip entirely while an OAuth redirect's hash (access_token=...&...) is
     still present and unprocessed — this used to run unconditionally and
     pass the raw hash straight into _updateBreadcrumb(), which (since it
     doesn't match any real view id) fell through to displaying it
     VERBATIM as page text (the breadcrumb's course-name field) — the
     actual access/refresh tokens rendered right into the page, visible
     and selectable. Confirmed live. Same guard reasoning as showView()
     above: Supabase's client needs this hash intact to establish the
     session; cloud-sync.js's SIGNED_IN handler triggers a real
     showView()/breadcrumb update once it's done with it. */
  if (hash.indexOf('access_token=')!==-1) { /* no-op: leave body classes/breadcrumb alone until sign-in settles */ }
  else if (hash && hash !== 'home') {
    /* Same bug, smaller version: goChapter() leaves the URL as
       #view/track/chapterId (see its own history.replaceState call), so a
       reload or back/forward navigation lands here with that COMPOUND hash
       still in place. Passing it to _updateBreadcrumb() whole hits the
       exact same "unknown view id" fallback as the access_token case above
       — it doesn't crash, but VIEW_META[viewId] misses and the fallback
       {label:viewId} briefly renders the raw hash string itself
       ("view/calculus/ch-foundations") as breadcrumb text, and the
       body class becomes the equally-meaningless "view-view/calculus/...".
       Parse out just the view id first, matching how init() already
       parses this exact hash shape a few hundred lines up. */
    var _hashViewId = hash;
    var _hashParts = hash.split('/');
    if (_hashParts[0] === 'view' && _hashParts[1]) _hashViewId = _hashParts[1];
    _updateBreadcrumb(_hashViewId,'');
    document.body.classList.add('view-'+_hashViewId);
  } else {
    document.body.classList.add('view-home');
  }
  // Observe future DOM additions (dynamically generated content)
  new MutationObserver(function(){ _injectObjectives(); _upgradeDifficultyControls(); })
    .observe(document.body, {childList:true, subtree:true});
}

if (document.readyState==='loading') document.addEventListener('DOMContentLoaded',_boot);
else _boot();

}()); /* end ClipSAT UX v5.1 */

/* ══ Interactive Activities Engine (CSInteractive) ════════════════ */
