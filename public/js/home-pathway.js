/* ClipSAT Homepage Pathway Navigator & Catalog Filter */
function filterCatalog(cat, btn) {
  var pills = document.querySelectorAll('.cat-pill');
  for (var i = 0; i < pills.length; i++) {
    var p = pills[i];
    var active = (p === btn);
    p.classList.toggle('active', active);
    p.setAttribute('aria-selected', active ? 'true' : 'false');
  }
  var cards = document.querySelectorAll('#catalog .cards .card');
  for (var j = 0; j < cards.length; j++) {
    var c = cards[j];
    if (cat === 'all' || c.getAttribute('data-category') === cat) {
      c.style.display = '';
    } else {
      c.style.display = 'none';
    }
  }
}

/* ══ MENA School System Pathway Navigator ══ */
var PATHWAYS = {
  saudi: {
    name: 'Saudi Arabia & GCC National/Bilingual Pathway (المسار السعودي والخليجي)',
    grade: 'Grades 10–12 / الأول إلى الثالث الثانوي',
    desc: 'Designed for high school students in Saudi Arabia and the GCC taking Qiyas standardized admissions exams (GAT Qudrat & SAAT Tahsili) in either Arabic or English, alongside secondary school mathematics.',
    tracks: [
      { id: 'qudrat', code: 'GAT', name: 'GAT Qudrat Math', tag: 'قدرات عامة' },
      { id: 'tahsili', code: 'SAAT', name: 'SAAT Tahsili Math', tag: 'تحصيلي ثانوي' },
      { id: 'geo', code: 'GEOM', name: 'Geometry & Mensuration', tag: 'الهندسة والقياس' },
      { id: 'algebra', code: 'ALG-1', name: 'Algebra Foundations', tag: 'الجبر التأسيسي' }
    ],
    features: 'Non-calculator mental arithmetic drills, Quantitative Comparison (قارن بين القيمة الأولى والثانية) practice, and integrated Bilingual Math Glossary tooltips.',
    cat: 'national'
  },
  american: {
    name: 'American High School Diploma (SAT · AP · ACT · EST)',
    grade: 'Grades 9–12 / High School Diploma',
    desc: 'Comprehensive US curriculum pathway mapping to College Board Digital SAT, Advanced Placement (AP) courses, ACT, and the Egyptian Scholastic Test (EST I & II).',
    tracks: [
      { id: 'sat', code: 'SAT', name: 'Digital SAT Math', tag: 'College Board' },
      { id: 'apab', code: 'AP-AB', name: 'AP Calculus AB', tag: 'College Board' },
      { id: 'apbc', code: 'AP-BC', name: 'AP Calculus BC', tag: 'College Board' },
      { id: 'apstats', code: 'AP-STAT', name: 'AP Statistics', tag: 'College Board' },
      { id: 'act', code: 'ACT', name: 'ACT Mathematics', tag: 'Enhanced 4-Choice' },
      { id: 'est', code: 'EST-1', name: 'EST I Math', tag: 'Egypt Diploma' }
    ],
    features: 'Adaptive Digital SAT simulation, Desmos scientific/graphing calculator access, and authentic Student-Produced Response (SPR) grid-in problem sets.',
    cat: 'tests'
  },
  british: {
    name: 'British International (Cambridge & Pearson Edexcel IGCSE / A-Level)',
    grade: 'Years 10–13 / Key Stages 4 & 5',
    desc: 'Rigorous British syllabus alignment for Cambridge 0580 & 9709, and Pearson Edexcel 4MA1 International GCSE, widely taken in Egypt, Jordan, UAE, and Saudi Arabia.',
    tracks: [
      { id: 'igcse', code: '0580', name: 'Cambridge IGCSE Math', tag: 'Core & Extended' },
      { id: 'addmath', code: '0606', name: 'Additional Maths', tag: '0606 / 4PM1' },
      { id: 'aslevel', code: '9709-AS', name: 'Cambridge AS-Level', tag: 'Pure 1 & Stats' },
      { id: 'a2level', code: '9709-A2', name: 'Cambridge A2-Level', tag: 'Pure 3 & Mech' }
    ],
    features: 'Multi-part structured questions (a, b, c), official [M1/A1/B1] mark schemes, Paper 1 non-calculator vs. Paper 2 calculator guidance, and cumulative frequency ogives.',
    cat: 'intl'
  },
  ib: {
    name: 'International Baccalaureate (IB MYP & DP Mathematics)',
    grade: 'IB Middle Years (MYP) & Diploma (DP Years 1–2)',
    desc: 'Inquiry-led international mathematics covering both Analysis & Approaches (AA) and Applications & Interpretation (AI) at Standard and Higher Levels.',
    tracks: [
      { id: 'ibsl', code: 'IB-SL', name: 'IB Mathematics SL', tag: 'AA & AI SL' },
      { id: 'ibhl', code: 'IB-HL', name: 'IB Mathematics HL', tag: 'AA & AI HL' },
      { id: 'precalc', code: 'PRECALC', name: 'Precalculus & Functions', tag: 'Trigonometry' },
      { id: 'calculus', code: 'CALC', name: 'Differential Calculus', tag: 'Calculus' }
    ],
    features: 'Paper 1 (non-calculator) and Paper 2/3 (GDC) practice, deep conceptual proofs, Voronoi/geometric explorers, and official IB grade boundary rubrics.',
    cat: 'intl'
  },
  stem: {
    name: 'Advanced STEM, Olympiad (NSMO & KAUST) & AI / Data Science Foundations',
    grade: 'Advanced High School & University Prep',
    desc: 'Advanced mathematics for ambitious students competing in Saudi NSMO (أولمبياد نسما الوطني — موهبة), KAUST Mathematics Competition (KMC & KAUST Academy), AMC 10/12, or mastering Linear Algebra and AI foundations.',
    tracks: [
      { id: 'olympiad', code: 'OLYMP', name: 'Olympiad · NSMO & KAUST', tag: 'NSMO · KMC · IMO' },
      { id: 'linalg', code: '[A]', name: 'Linear Algebra', tag: 'Vectors & Matrices' },
      { id: 'mathai', code: 'AI', name: 'Math for AI', tag: 'Machine Learning' },
      { id: 'mvc', code: '∇', name: 'Multivariable Calculus', tag: 'Vector Fields' },
      { id: 'odes', code: 'dy/dx', name: 'Differential Equations', tag: 'Modeling' }
    ],
    features: 'Dedicated NSMO of KSA & KAUST KMC subsections, 15 interactive Olympiad labs, 3D vector fields, matrix transformation visualizers, and 1,440 Olympiad problems.',
    cat: 'univ'
  },
  foundation: {
    name: 'Middle School & Foundation Bridge (Pre-Algebra & Checkpoint)',
    grade: 'Grades 7–9 / Years 8–10 (Pre-IGCSE & Checkpoint)',
    desc: 'Master the core algebraic manipulation, Euclidean geometry, and arithmetic foundations before high-stakes exams. Directly addresses early gaps that hold students back in SAT and Calculus.',
    tracks: [
      { id: 'algebra', code: 'ALG-1', name: 'Algebra 1', tag: 'Equations & Quadratics' },
      { id: 'geo', code: 'GEOM', name: 'Euclidean Geometry', tag: 'Triangles & Proofs' },
      { id: 'alg2', code: 'ALG-2', name: 'Algebra 2 Foundations', tag: 'Functions & Radicals' },
      { id: 'igcse', code: '0580', name: 'Cambridge Checkpoint / IGCSE', tag: 'Core Foundation' }
    ],
    features: 'Interactive linear and parabolic graph manipulatives, tactile geometric angle discovery, and step-by-step algebraic derivation drills.',
    cat: 'core'
  }
};

function selectPathway(pathId, btn) {
  var tabs = document.querySelectorAll('.pathway-tab-btn');
  for (var i = 0; i < tabs.length; i++) {
    var t = tabs[i];
    var active = (t === btn || t.getAttribute('data-path') === pathId);
    t.classList.toggle('active', active);
    t.setAttribute('aria-selected', active ? 'true' : 'false');
  }

  var data = PATHWAYS[pathId] || PATHWAYS.saudi;
  var el = document.getElementById('pathwayDetails');
  if (!el) return;

  var h = '<div class="pathway-meta-row">'
    + '<div><h3 style="margin:0 0 4px;font-size:1.15rem;font-weight:750;color:var(--ink)">' + data.name + '</h3>'
    + '<span class="pathway-grade-badge">🎓 ' + data.grade + '</span></div>'
    + '<button type="button" class="btn primary" onclick="filterCatalogToPathway(\'' + data.cat + '\')" style="padding:7px 14px;font-size:.82rem;border-radius:8px">⚡ Filter Catalog to This Track Bundle</button>'
    + '</div>'
    + '<p style="margin:8px 0;font-size:.88rem;color:var(--muted);line-height:1.5">' + data.desc + '</p>'
    + '<div class="pathway-tracks-grid">';

  data.tracks.forEach(function(tr){
    h += '<div class="pathway-track-pill" onclick="showView(\'' + tr.id + '\')">'
      + '<div><b style="color:var(--indigo,#1e3e70);margin-right:6px">[' + tr.code + ']</b> ' + tr.name + '</div>'
      + '<span style="font-size:.75rem;color:var(--amber-text,#8a550c);font-weight:600">' + tr.tag + ' →</span>'
      + '</div>';
  });
  h += '</div>'
    + '<div style="margin-top:10px;padding-top:10px;border-top:1px dashed var(--border);font-size:.82rem;color:var(--faint)">'
    + '<strong>Key Pedagogical Features:</strong> ' + data.features
    + '</div>';

  el.innerHTML = h;
}

function filterCatalogToPathway(cat) {
  var catBtn = document.querySelector('.cat-pill[onclick*="\'' + cat + '\'"]');
  if (window.filterCatalog) window.filterCatalog(cat, catBtn);
  var catSec = document.getElementById('catalog');
  if (catSec && catSec.scrollIntoView) {
    catSec.scrollIntoView({ behavior: 'smooth' });
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', function(){
    selectPathway('saudi');
    renderPinnedPathwayTray();
  });
} else {
  selectPathway('saudi');
  renderPinnedPathwayTray();
}

// ─── 3-Step Pathway Matcher Wizard Engine (Pillar 4.1) ───────────
var wizardState = {
  step: 1,
  country: 'saudi',
  curriculum: 'american',
  grade: '11-12'
};

var TRACK_DESCRIPTORS = {
  sat: { code: 'SAT', icon: '🧮', name: 'Digital SAT Math', desc: 'Algebra, Advanced Math, Problem-Solving & Desmos tactics' },
  qudrat: { code: 'قدرات', icon: '⚡', name: 'GAT Qudrat (القدرات العامة)', desc: 'Speed tactics, quantitative reasoning, bilingual AR/EN modes' },
  tahsili: { code: 'تحصيلي', icon: '🎯', name: 'SAAT Tahsili (التحصيلي)', desc: 'High school math mastery, non-calculator speed' },
  apab: { code: 'AP-AB', icon: '∫', name: 'AP Calculus AB', desc: 'Limits, derivatives, integrals & Fundamental Theorem' },
  apbc: { code: 'AP-BC', icon: 'BC', name: 'AP Calculus BC', desc: 'Series, parametric/polar, vector calculus & Taylor polynomials' },
  appc: { code: 'AP-PC', icon: '📐', name: 'AP Precalculus', desc: 'Polynomial, rational, exponential & trigonometric models' },
  apstats: { code: 'AP-STAT', icon: '📊', name: 'AP Statistics', desc: 'Distributions, regression, probability & inference' },
  igcse: { code: '0580', icon: '📏', name: 'Cambridge & Edexcel IGCSE', desc: 'Core & Extended 0580 & 4MA1 Papers 1H & 2H' },
  aslevel: { code: '9709-AS', icon: '📐', name: 'Cambridge AS / Edexcel P1-P2', desc: 'Pure 1, Pure 2, Mechanics 1 & Probability/Stats 1' },
  a2level: { code: '9709-A2', icon: '∫²', name: 'Cambridge A2 / Edexcel P3-P4', desc: 'Pure 3, Mechanics 2 & Probability/Stats 2' },
  ibsl: { code: 'IB-SL', icon: '🌐', name: 'IB Mathematics SL (AA/AI)', desc: 'Analysis & Approaches and Applications & Interpretation SL' },
  ibhl: { code: 'IB-HL', icon: '🌐', name: 'IB Mathematics HL (AA/AI)', desc: 'Higher Level AA/AI with proof rigor & calculus depth' },
  algebra: { code: 'ALG-1', icon: 'x²', name: 'Algebra 1', desc: 'Linear equations, quadratics & polynomials' },
  geo: { code: 'GEOM', icon: '△', name: 'Euclidean Geometry', desc: 'Congruence, similarity, circles & trigonometry' },
  alg2: { code: 'ALG-2', icon: 'f(x)', name: 'Algebra 2', desc: 'Rational, radical, exponential/logarithmic functions' },
  precalc: { code: 'PRECALC', icon: 'sin', name: 'Pre-Calculus', desc: 'Unit circle, vectors, complex numbers & limits' },
  calculus: { code: 'CALC', icon: '∫', name: 'Calculus', desc: 'Differential & integral calculus foundations' },
  act: { code: 'ACT', icon: '36', name: 'ACT Math', desc: '60 questions in 60 minutes pacing & strategies' },
  est: { code: 'EST-1', icon: '🇪🇬', name: 'EST I Math', desc: 'Egyptian Scholastic Test Part 1 (Calc & Non-Calc)' },
  est2: { code: 'EST-2', icon: 'EST²', name: 'EST II Math (Level 1 & 2)', desc: 'Advanced subject tests in Math 1 & Math 2' },
  linalg: { code: '[A]', icon: ' матрицы', name: 'Linear Algebra', desc: 'Vectors, matrices, eigenvalues & linear maps' },
  mvc: { code: '∇', icon: '∂/∂x', name: 'Multivariable Calculus', desc: 'Partial derivatives, multiple integrals & vector fields' },
  odes: { code: 'dy/dx', icon: 'eˣ', name: 'Differential Equations', desc: 'First & second order ODEs, Laplace transforms & modeling' },
  addmath: { code: '0606', icon: '📐', name: 'Additional Maths (0606/4PM1)', desc: 'Advanced pure math bridging IGCSE to A-Level & IB HL' },
  mathai: { code: 'AI', icon: '🤖', name: 'Math for AI & Data Science', desc: 'Vectors, embeddings, gradient descent, Bayes & PCA' },
  edexcel: { code: '4MA1', icon: '🇬🇧', name: 'Pearson Edexcel IGCSE (4MA1)', desc: 'Higher Tier 4MA1 Paper 1H & 2H: surds, calculus, 3D trig & vectors' },
  gaten: { code: 'GAT-EN', icon: '🇸🇦', name: 'English GAT & SAAT (Qiyas)', desc: 'English-medium Quantitative Aptitude & Tahsili Math speed mastery' },
  olympiad: { code: 'OLYMP', icon: '🏆', name: 'Olympiad Math · NSMO & KAUST', desc: 'Saudi NSMO (Mawhiba), KAUST KMC & Academy, AMC 10/12 & IMO pillars' }
};

function getRecommendedPathway(country, curriculum, grade) {
  var rec = { title: '', tracks: [], note: '' };
  if (curriculum === 'american') {
    if (grade === '9-10') {
      rec.title = 'American High School (Grades 9–10)';
      rec.tracks = (country === 'saudi') ? ['qudrat', 'algebra', 'geo', 'alg2'] : ['algebra', 'geo', 'alg2', 'precalc'];
      rec.note = 'Build strong foundations in Algebra, Geometry and early standardized test readiness.';
    } else if (grade === 'advanced') {
      rec.title = 'Advanced STEM, Olympiad & AP Honors';
      rec.tracks = (country === 'saudi') ? ['olympiad', 'apbc', 'linalg', 'mvc'] : ['apbc', 'linalg', 'mvc', 'odes'];
      rec.note = 'Elite preparation for NSMO of KSA, KAUST KMC, AMC 10/12, and university STEM.';
    } else {
      if (country === 'saudi') {
        rec.title = 'American Diploma · Saudi Arabia (Grades 11–12)';
        rec.tracks = ['sat', 'qudrat', 'tahsili', 'apab'];
        rec.note = 'Target top scores on Digital SAT, Qiyas Qudrat & Tahsili, and AP Calculus.';
      } else if (country === 'egypt') {
        rec.title = 'American Diploma · Egypt (Grades 11–12)';
        rec.tracks = ['est', 'est2', 'act', 'sat'];
        rec.note = 'Optimized for Egyptian Scholastic Test (EST I & II), ACT, and Digital SAT.';
      } else {
        rec.title = 'American Diploma (Grades 11–12)';
        rec.tracks = ['sat', 'apab', 'apbc', 'apstats'];
        rec.note = 'Optimized for Digital SAT and AP Calculus/Statistics college credits.';
      }
    }
  } else if (curriculum === 'british') {
    if (grade === '9-10') {
      rec.title = 'British Curriculum · IGCSE (Years 10–11)';
      rec.tracks = (country === 'saudi') ? ['igcse', 'addmath', 'qudrat', 'algebra'] : ['igcse', 'addmath', 'algebra', 'geo'];
      rec.note = 'Complete preparation for Cambridge 0580/0606 & Pearson Edexcel 4MA1/4PM1.';
    } else if (grade === 'advanced') {
      rec.title = 'A-Level Further Math & University STEM';
      rec.tracks = ['a2level', 'addmath', 'linalg', 'mathai'];
      rec.note = 'Advanced pure mathematics, mechanics, and university AI foundations.';
    } else {
      rec.title = 'British Curriculum · A-Level (Years 12–13)';
      rec.tracks = (country === 'saudi') ? ['aslevel', 'a2level', 'qudrat', 'tahsili'] : ['aslevel', 'a2level', 'calculus', 'addmath'];
      rec.note = 'Target A* grades across Cambridge 9709 & Pearson Edexcel IAL units.';
    }
  } else if (curriculum === 'ib') {
    if (grade === '9-10') {
      rec.title = 'IB Middle Years Programme (MYP 4–5)';
      rec.tracks = ['precalc', 'algebra', 'geo', 'calculus'];
      rec.note = 'Deep conceptual understanding leading to IB DP Mathematics.';
    } else if (grade === 'advanced') {
      rec.title = 'IB DP Higher Level & STEM Olympiad';
      rec.tracks = ['ibhl', 'linalg', 'mvc', 'odes'];
      rec.note = 'Comprehensive preparation for IB HL AA/AI Paper 1, 2, 3 and contest math.';
    } else {
      rec.title = 'IB Diploma Programme (DP Years 1–2)';
      rec.tracks = (country === 'saudi') ? ['ibsl', 'ibhl', 'qudrat', 'calculus'] : ['ibsl', 'ibhl', 'calculus', 'precalc'];
      rec.note = 'Target level 7 in IB DP Mathematics (Analysis & Approaches / Applications).';
    }
  } else { // national
    if (country === 'saudi') {
      if (grade === '9-10') {
        rec.title = 'المسار الوطني السعودي (الأول الثانوي)';
        rec.tracks = ['qudrat', 'olympiad', 'algebra', 'geo'];
        rec.note = 'التأسيس المبكر لاختبار القدرات العامة وأولمبياد نسما الوطني (موهبة).';
      } else if (grade === 'advanced') {
        rec.title = 'المسار الوطني المتقدم وأولمبياد نسما وكاوست';
        rec.tracks = ['olympiad', 'tahsili', 'linalg', 'calculus'];
        rec.note = 'التأهيل لأولمبياد نسما الوطني (NSMO)، ومسابقة كاوست للرياضيات (KMC)، والجامعات البحثية.';
      } else {
        rec.title = 'المسار الوطني السعودي (الثاني والثالث الثانوي)';
        rec.tracks = ['qudrat', 'tahsili', 'sat', 'calculus'];
        rec.note = 'التركيز على تحقيق 95%+ في اختبارات قياس (القدرات والتحصيلي) والسات.';
      }
    } else if (country === 'egypt') {
      rec.title = 'الثانوية العامة والدبلومة (مصر)';
      rec.tracks = ['est', 'est2', 'calculus', 'algebra'];
      rec.note = 'التحضير للرياضيات التأسيسية والمتقدمة وامتحانات القبول الجامعي.';
    } else {
      rec.title = 'المسار الوطني والجامعي العام';
      rec.tracks = ['calculus', 'algebra', 'precalc', 'geo'];
      rec.note = 'إتقان المفاهيم الرياضية الأساسية والمتقدمة.';
    }
  }
  return rec;
}

window.openPathwayWizard = function() {
  var modal = document.getElementById('cs-pathway-modal');
  if (!modal) return;
  modal.classList.add('show');
  wizardState.step = 1;
  renderWizardStep(1);
};

window.closePathwayWizard = function() {
  var modal = document.getElementById('cs-pathway-modal');
  if (modal) modal.classList.remove('show');
};

function updateWizardPills(step) {
  for (var i = 1; i <= 4; i++) {
    var p = document.getElementById('pwPill' + i);
    if (!p) continue;
    p.classList.remove('active', 'done');
    if (i === step) p.classList.add('active');
    else if (i < step) p.classList.add('done');
  }
  var cnt = document.getElementById('csPwStepCounter');
  if (cnt) cnt.textContent = step <= 3 ? 'Step ' + step + ' of 3' : 'Your Customized Recommendation';
  var backBtn = document.getElementById('csPwBackBtn');
  if (backBtn) backBtn.style.display = step > 1 ? 'block' : 'none';
}

function renderWizardStep(step) {
  wizardState.step = step;
  updateWizardPills(step);
  var body = document.getElementById('csPwBody');
  if (!body) return;

  if (step === 1) {
    body.innerHTML = '<h3 style="margin:0 0 6px;font-size:1.15rem;font-weight:750">Where are you studying? / أين تدرس؟</h3>'
      + '<p style="margin:0 0 16px;font-size:.85rem;color:var(--muted)">Select your country or region to tailor local exam tracks and university requirements:</p>'
      + '<div class="cs-pw-options-grid">'
      + '  <div class="cs-pw-opt-btn' + (wizardState.country === 'saudi' ? ' selected' : '') + '" onclick="selectWizardOpt(\'country\', \'saudi\')">'
      + '    <div class="cs-pw-opt-title">🇸🇦 Saudi Arabia / السعودية</div>'
      + '    <div class="cs-pw-opt-desc">Qiyas Qudrat &amp; Tahsili, NSMO (Mawhiba), KAUST KMC, International Schools.</div>'
      + '  </div>'
      + '  <div class="cs-pw-opt-btn' + (wizardState.country === 'gulf' ? ' selected' : '') + '" onclick="selectWizardOpt(\'country\', \'gulf\')">'
      + '    <div class="cs-pw-opt-title">🇦🇪 UAE &amp; Gulf / الإمارات والخليج</div>'
      + '    <div class="cs-pw-opt-desc">Dubai/Abu Dhabi/Doha/Kuwait International Schools (SAT, AP, IGCSE, IB).</div>'
      + '  </div>'
      + '  <div class="cs-pw-opt-btn' + (wizardState.country === 'egypt' ? ' selected' : '') + '" onclick="selectWizardOpt(\'country\', \'egypt\')">'
      + '    <div class="cs-pw-opt-title">🇪🇬 Egypt &amp; Levant / مصر وبلاد الشام</div>'
      + '    <div class="cs-pw-opt-desc">EST I &amp; II, ACT, British IGCSE / A-Levels, Thanawiya Amma prep.</div>'
      + '  </div>'
      + '  <div class="cs-pw-opt-btn' + (wizardState.country === 'intl' ? ' selected' : '') + '" onclick="selectWizardOpt(\'country\', \'intl\')">'
      + '    <div class="cs-pw-opt-title">🌍 Global / مدارس دولية أخرى</div>'
      + '    <div class="cs-pw-opt-desc">Standardized college prep &amp; international university admissions worldwide.</div>'
      + '  </div>'
      + '</div>';
  } else if (step === 2) {
    body.innerHTML = '<h3 style="margin:0 0 6px;font-size:1.15rem;font-weight:750">Which educational curriculum? / ما هو نظامك التعليمي؟</h3>'
      + '<p style="margin:0 0 16px;font-size:.85rem;color:var(--muted)">Select the academic curriculum of your school:</p>'
      + '<div class="cs-pw-options-grid">'
      + '  <div class="cs-pw-opt-btn' + (wizardState.curriculum === 'american' ? ' selected' : '') + '" onclick="selectWizardOpt(\'curriculum\', \'american\')">'
      + '    <div class="cs-pw-opt-title">🇺🇸 American Diploma / الدبلومة الأمريكية</div>'
      + '    <div class="cs-pw-opt-desc">Digital SAT, AP Calculus/Statistics, ACT Math, EST I &amp; II.</div>'
      + '  </div>'
      + '  <div class="cs-pw-opt-btn' + (wizardState.curriculum === 'british' ? ' selected' : '') + '" onclick="selectWizardOpt(\'curriculum\', \'british\')">'
      + '    <div class="cs-pw-opt-title">🇬🇧 British System / البريطاني (IGCSE / A-Level)</div>'
      + '    <div class="cs-pw-opt-desc">Cambridge 0580 &amp; 9709, Pearson Edexcel 4MA1 &amp; IAL (P1–P4, M1, S1).</div>'
      + '  </div>'
      + '  <div class="cs-pw-opt-btn' + (wizardState.curriculum === 'ib' ? ' selected' : '') + '" onclick="selectWizardOpt(\'curriculum\', \'ib\')">'
      + '    <div class="cs-pw-opt-title">🌐 International Baccalaureate / البكالوريا الدولية</div>'
      + '    <div class="cs-pw-opt-desc">IB Middle Years (MYP) &amp; Diploma (DP AA / AI Standard &amp; Higher Level).</div>'
      + '  </div>'
      + '  <div class="cs-pw-opt-btn' + (wizardState.curriculum === 'national' ? ' selected' : '') + '" onclick="selectWizardOpt(\'curriculum\', \'national\')">'
      + '    <div class="cs-pw-opt-title">🏛️ National Curriculum &amp; Qiyas / الوطني وقياس</div>'
      + '    <div class="cs-pw-opt-desc">اختبارات قياس (القدرات العامة والتحصيلي)، الثانوية العامة، والرياضيات المدرسية.</div>'
      + '  </div>'
      + '</div>';
  } else if (step === 3) {
    body.innerHTML = '<h3 style="margin:0 0 6px;font-size:1.15rem;font-weight:750">What is your current grade/stage? / ما هي مرحلتك الدراسية؟</h3>'
      + '<p style="margin:0 0 16px;font-size:.85rem;color:var(--muted)">We will tailor subject depth and exam targets to your year:</p>'
      + '<div class="cs-pw-options-grid">'
      + '  <div class="cs-pw-opt-btn' + (wizardState.grade === '9-10' ? ' selected' : '') + '" onclick="selectWizardOpt(\'grade\', \'9-10\')">'
      + '    <div class="cs-pw-opt-title">📐 Grade 9–10 / Year 10–11 (المرحلة التأسيسية)</div>'
      + '    <div class="cs-pw-opt-desc">IGCSE Core/Extended, Algebra 1/2, Geometry, Early Qudrat foundations.</div>'
      + '  </div>'
      + '  <div class="cs-pw-opt-btn' + (wizardState.grade === '11-12' ? ' selected' : '') + '" onclick="selectWizardOpt(\'grade\', \'11-12\')">'
      + '    <div class="cs-pw-opt-title">🎯 Grade 11–12 / Year 12–13 (مرحلة التخرج والقبول)</div>'
      + '    <div class="cs-pw-opt-desc">Digital SAT, AP Exam, Cambridge AS/A2, IB DP, Qudrat &amp; Tahsili.</div>'
      + '  </div>'
      + '  <div class="cs-pw-opt-btn' + (wizardState.grade === 'advanced' ? ' selected' : '') + '" onclick="selectWizardOpt(\'grade\', \'advanced\')">'
      + '    <div class="cs-pw-opt-title">🚀 Advanced STEM &amp; Olympiad Prep (المرحلة المتقدمة والأولمبياد)</div>'
      + '    <div class="cs-pw-opt-desc">NSMO of KSA, KAUST KMC, AMC 10/12, Linear Algebra, Multivariable Calculus, ODEs.</div>'
      + '  </div>'
      + '</div>';
  } else if (step === 4) {
    var rec = getRecommendedPathway(wizardState.country, wizardState.curriculum, wizardState.grade);
    var cardsHtml = rec.tracks.map(function(tId) {
      var d = TRACK_DESCRIPTORS[tId] || { code: tId.toUpperCase(), icon: '📘', name: tId, desc: 'Interactive curriculum & exam prep' };
      return '<div style="background:var(--paper-2);border:1px solid var(--line);border-radius:10px;padding:12px;margin-bottom:8px;display:flex;align-items:center;gap:12px">'
        + '<span style="font-size:1.5rem">' + d.icon + '</span>'
        + '<div style="flex:1"><b style="color:var(--ink)">[' + d.code + '] ' + d.name + '</b><div style="font-size:.76rem;color:var(--muted)">' + d.desc + '</div></div>'
        + '</div>';
    }).join('');

    body.innerHTML = '<div style="text-align:center;margin-bottom:14px">'
      + '<div style="font-size:2rem">🎉</div>'
      + '<h3 style="margin:4px 0;font-size:1.25rem;font-weight:800;color:var(--ink)">' + rec.title + '</h3>'
      + '<p style="margin:0;font-size:.85rem;color:var(--muted)">' + rec.note + '</p>'
      + '</div>'
      + '<div style="margin-bottom:16px">' + cardsHtml + '</div>'
      + '<button type="button" class="btn primary" onclick="saveAndApplyPathway()" style="width:100%;padding:12px;font-size:.95rem;font-weight:750;border-radius:10px;box-shadow:0 4px 14px rgba(79,70,229,0.25)">'
      + '⭐ Save &amp; Pin to My Dashboard / حفظ وتثبيت مساري'
      + '</button>';
  }
}

window.selectWizardOpt = function(key, val) {
  wizardState[key] = val;
  renderWizardStep(wizardState.step + 1);
};

window.prevPathwayStep = function() {
  if (wizardState.step > 1) {
    renderWizardStep(wizardState.step - 1);
  }
};

window.saveAndApplyPathway = function() {
  var rec = getRecommendedPathway(wizardState.country, wizardState.curriculum, wizardState.grade);
  var saved = {
    country: wizardState.country,
    curriculum: wizardState.curriculum,
    grade: wizardState.grade,
    title: rec.title,
    note: rec.note,
    tracks: rec.tracks,
    updatedAt: Date.now()
  };
  try {
    localStorage.setItem('clipsat_user_pathway', JSON.stringify(saved));
  } catch(e) {}

  closePathwayWizard();
  renderPinnedPathwayTray();

  var tray = document.getElementById('my-pathway-tray');
  if (tray && tray.scrollIntoView) {
    tray.scrollIntoView({ behavior: 'smooth' });
  }
};

function renderPinnedPathwayTray() {
  var raw = null;
  try { raw = localStorage.getItem('clipsat_user_pathway'); } catch(e) {}
  var tray = document.getElementById('my-pathway-tray');
  if (!tray) return;

  if (!raw) {
    tray.style.display = 'none';
    return;
  }

  try {
    var data = JSON.parse(raw);
    if (!data || !data.tracks || !data.tracks.length) {
      tray.style.display = 'none';
      return;
    }

    var titleEl = document.getElementById('mptTitle');
    if (titleEl) titleEl.textContent = data.title || 'My Pinned Curriculum';

    var tracksContainer = document.getElementById('mptTracks');
    if (tracksContainer) {
      tracksContainer.innerHTML = data.tracks.map(function(tId) {
        var d = TRACK_DESCRIPTORS[tId] || { code: tId.toUpperCase(), icon: '📘', name: tId, desc: 'Interactive curriculum & exam prep' };
        return '<div class="mpt-track-card">'
          + '<div class="mpt-track-top">'
          + '  <span class="mpt-track-code">[' + d.code + ']</span>'
          + '  <span class="mpt-track-icon">' + d.icon + '</span>'
          + '</div>'
          + '<h3 class="mpt-track-name">' + d.name + '</h3>'
          + '<p class="mpt-track-desc">' + d.desc + '</p>'
          + '<div class="mpt-track-actions">'
          + '  <a href="/' + tId + '/" class="mpt-act-btn primary">📖 Open Subject</a>'
          + '  <button type="button" class="mpt-act-btn" onclick="openDiagnosticTest(\'' + tId + '\')">🎯 Diagnostic</button>'
          + '  <button type="button" class="mpt-act-btn" onclick="openMockExam(\'' + tId + '\', 0)">💻 CBT Exam</button>'
          + '</div>'
          + '</div>';
      }).join('');
    }

    tray.style.display = 'block';
  } catch(err) {
    tray.style.display = 'none';
  }
}
