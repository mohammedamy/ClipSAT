/**
 * ClipSAT Computerized Adaptive Diagnostic (CAT) Engine  v2.0
 * ════════════════════════════════════════════════════════════════════════
 * Generates an authentic Computerized Adaptive Testing (CAT) assessment
 * drawn from bank-data/{track}.json.
 *
 * Pillar 4.4 Enhancements:
 *   - 3-tier dynamic difficulty routing (starts Medium, promotes to Hard
 *     on correct, demotes to Easy on incorrect)
 *   - Domain-balanced sampling (excludes meta-strategy domains)
 *   - Real-time adaptive level badge (Foundation, Standard, Advanced)
 *   - Scaled ability estimate (Theta/Proficiency) & projected exam score
 *   - Actionable 7-Day & 30-Day Personalized Study Schedule with direct
 *     deep-links to chapters & interactive explorers
 *   - Dual-Language (AR & EN) diagnostic report toggle for students & parents
 *   - "Export / Print Report (PDF)" & direct 1:1 WhatsApp tutoring share
 *   - Full worked solutions review
 */
(function() {
  'use strict';

  window._diagnosticLoaded = true;
  var _diagState = null;

  var TRACK_NAMES = {
    a2level: 'A2 Level Mathematics', act: 'ACT Math', act2: 'ACT Math Level 1',
    act2l2: 'ACT Math Level 2', addmath: 'IGCSE Add Math (0606 / 4PM1)',
    alg2: 'Algebra 2', algebra: 'Algebra 1', apab: 'AP Calculus AB',
    apbc: 'AP Calculus BC', appc: 'AP Precalculus', apstats: 'AP Statistics',
    aslevel: 'AS Level Mathematics', calculus: 'Calculus',
    edexcel: 'Edexcel IGCSE Math A (4MA1)', est: 'EST I Math',
    est2: 'EST II Math Level 1', est2l2: 'EST II Math Level 2',
    gaten: 'English GAT & SAAT (Qiyas)', geo: 'Geometry',
    ibhl: 'IB Math HL (AA/AI)', ibsl: 'IB Math SL (AA/AI)',
    igcse: 'IGCSE 0580 & 4MA1', linalg: 'Linear Algebra',
    mathai: 'Math for AI & Data Science', mvc: 'Multivariable Calculus',
    odes: 'Differential Equations', olympiad: 'Olympiad Math (NSMO · KAUST · AMC)',
    precalc: 'Pre-Calculus', qudrat: 'GAT Qudrat (قدرات)', sat: 'Digital SAT Math',
    tahsili: 'SAAT Tahsili (تحصيلي)'
  };

  var TRACK_NAMES_AR = {
    a2level: 'الرياضيات المستوى المتقدم A2', act: 'رياضيات ACT', act2: 'رياضيات ACT المستوى الأول',
    act2l2: 'رياضيات ACT المستوى الثاني', addmath: 'الرياضيات الإضافية (0606 / 4PM1)',
    alg2: 'الجبر 2 (المستوى المتقدم)', algebra: 'الجبر 1 (التأسيسي)', apab: 'تفاضل وتكامل AP Calculus AB',
    apbc: 'تفاضل وتكامل AP Calculus BC', appc: 'الرياضيات التمهيدية AP Precalculus', apstats: 'الإحصاء AP Statistics',
    aslevel: 'الرياضيات المستوى المتقدم التكميلي AS', calculus: 'حساب التفاضل والتكامل',
    edexcel: 'رياضيات إدكسل الدولية IGCSE 4MA1', est: 'رياضيات EST I (مصر)',
    est2: 'رياضيات EST II المستوى الأول', est2l2: 'رياضيات EST II المستوى الثاني',
    gaten: 'القدرات والتحصيلي باللغة الإنجليزية (GAT & SAAT)', geo: 'الهندسة الإقليدية',
    ibhl: 'رياضيات البكالوريا الدولية المستوى العالي IB HL',
    ibsl: 'رياضيات البكالوريا الدولية المستوى القياسي IB SL', igcse: 'كامبريدج IGCSE 0580',
    linalg: 'الجبر الخطي والمصفوفات', mathai: 'رياضيات الذكاء الاصطناعي وعلوم البيانات',
    mvc: 'حساب التفاضل والتكامل متعدد المتغيرات', odes: 'المعادلات التفاضلية',
    olympiad: 'أولمبياد الرياضيات (نسما NSMO · مسابقة كاوست KMC · AMC)',
    precalc: 'الرياضيات التمهيدية والتحليلية', qudrat: 'اختبار القدرات العامة (قياس)', sat: 'السات الرقمي Digital SAT Math',
    tahsili: 'اختبار التحصيلي (قياس)'
  };

  var TRACK_CHAPTER_MAP = {
    sat: [
      { domain: /advanced|quad|poly|function|nonlinear/i, title: 'Quadratics & Nonlinear Functions', titleAr: 'الدوال غير الخطية والتربيعية', url: '/sat/?ch=sat-quad', ix: 'Parabola Explorer' },
      { domain: /\blinear\b|algebra/i, title: 'Linear Equations & Systems', titleAr: 'المعادلات الخطية وأنظمة المعادلات', url: '/sat/?ch=sat-linear', ix: 'Interactive Line Explorer' },
      { domain: /data|problem|stat|prob/i, title: 'Problem Solving & Statistics', titleAr: 'حل المشكلات والإحصاء والاحتمالات', url: '/sat/?ch=sat-data', ix: 'Data & Probability Tools' },
      { domain: /geo|trig/i, title: 'Geometry & Trigonometry', titleAr: 'الهندسة وحساب المثلثات', url: '/sat/?ch=sat-geo', ix: 'Unit Circle Explorer' }
    ],
    qudrat: [
      { domain: /جبر|algebra|arith|حساب/i, title: 'الجبر والعمليات الحسابية والأسس', titleAr: 'الجبر والعمليات الحسابية والأسس', url: '/qudrat/?ch=qud-arith', ix: 'مستكشف الأسس والجذور' },
      { domain: /هندسة|geo/i, title: 'الهندسة والزوايا والأشكال الرباعية', titleAr: 'الهندسة والزوايا والأشكال الرباعية', url: '/qudrat/?ch=qud-geo', ix: 'مستكشف الدائرة والمثلث' },
      { domain: /نسب|كسور|percent|ratio/i, title: 'النسب المئوية والتناسب والكسور', titleAr: 'النسب المئوية والتناسب والكسور', url: '/qudrat/?ch=qud-ratios', ix: 'حساب النسب السريع' },
      { domain: /إحصاء|احتمال|مقارن|stat|comp/i, title: 'الإحصاء والاحتمالات والمقارنات', titleAr: 'الإحصاء والاحتمالات والمقارنات', url: '/qudrat/?ch=qud-comp', ix: 'استراتيجيات المقارنة السريعة' }
    ],
    tahsili: [
      { domain: /جبر|دوال|مصفوف|alg|func/i, title: 'الجبر والدوال والمصفوفات', titleAr: 'الجبر والدوال والمصفوفات', url: '/tahsili/?ch=tah-alg', ix: 'محددات ونظير المصفوفات' },
      { domain: /هندسة|مثلث|geo|trig/i, title: 'الهندسة وحساب المثلثات', titleAr: 'الهندسة وحساب المثلثات', url: '/tahsili/?ch=tah-trig', ix: 'دائرة الوحدة والمتطابقات' },
      { domain: /متجه|قطوع|vector|conic/i, title: 'المتجهات والقطوع المخروطية', titleAr: 'المتجهات والقطوع المخروطية', url: '/tahsili/?ch=tah-vectors', ix: 'القطع المكافئ والناقص' },
      { domain: /تفاضل|تكامل|احتمال|calc|stat/i, title: 'التفاضل والتكامل والاحتمالات', titleAr: 'التفاضل والتكامل والاحتمالات', url: '/tahsili/?ch=tah-calc', ix: 'قواعد الاشتقاق والتكامل' }
    ],
    igcse: [
      { domain: /number/i, title: 'Number & Estimation', titleAr: 'الأعداد والحسابات', url: '/igcse/?ch=igcse-number', ix: 'Fractions & Bounds' },
      { domain: /algebra|graph/i, title: 'Algebra & Graphs', titleAr: 'الجبر والتمثيل البياني', url: '/igcse/?ch=igcse-algebra', ix: 'Linear & Quadratic Graphs' },
      { domain: /coordinate|trig/i, title: 'Coordinate Geometry & Trigonometry', titleAr: 'الهندسة الإحداثية والمثلثات', url: '/igcse/?ch=igcse-trig', ix: 'Sine/Cosine Rules' },
      { domain: /geometry|mensuration/i, title: 'Geometry & Mensuration', titleAr: 'الهندسة والقياس والحجوم', url: '/igcse/?ch=igcse-geometry', ix: 'Circle Theorems' },
      { domain: /prob|stat/i, title: 'Probability & Statistics', titleAr: 'الاحتمالات والإحصاء', url: '/igcse/?ch=igcse-stats', ix: 'Ogives & Boxplots' }
    ],
    aslevel: [
      { domain: /pure|algebra|quad|diff|integ|trig/i, title: 'Pure Mathematics (P1/P2)', titleAr: 'الرياضيات البحتة', url: '/aslevel/?ch=as-quad', ix: 'Calculus & Functions' },
      { domain: /mech|force|kinemat/i, title: 'Mechanics (Paper 4 / M1)', titleAr: 'الميكانيكا وحركة الأجسام', url: '/aslevel/?ch=as-kinematics', ix: 'Forces & Newton Laws' },
      { domain: /prob|stat/i, title: 'Probability & Statistics (Paper 5 / S1)', titleAr: 'الإحصاء والاحتمالات', url: '/aslevel/?ch=as-stats', ix: 'Normal Distribution' }
    ],
    a2level: [
      { domain: /alg|func|log|exp|trig/i, title: 'Algebra, Logs & Advanced Trig', titleAr: 'الجبر واللوغاريتمات والمثلثات', url: '/a2level/?ch=a2-alg', ix: 'Modulus & Trig Explorer' },
      { domain: /diff|integ|calc|de/i, title: 'Differentiation, Integration & DEs', titleAr: 'التفاضل والتكامل والمعادلات التفاضلية', url: '/a2level/?ch=a2-integ', ix: 'Calculus Explorer' },
      { domain: /vec|complex|stat|poisson/i, title: 'Vectors, Complex Numbers & S2', titleAr: 'المتجهات والأعداد المركبة والإحصاء', url: '/a2level/?ch=a2-complex', ix: 'Argand Diagram Explorer' }
    ],
    calculus: [
      { domain: /limit|cont/i, title: 'Limits & Continuity', titleAr: 'النهايات والاتصال', url: '/calculus/?ch=ch-limits', ix: 'Limits & Tangent Visualizer' },
      { domain: /deriv|diff|app/i, title: 'Derivatives & Applications', titleAr: 'الاشتقاق وتطبيقاته', url: '/calculus/?ch=ch-derivatives', ix: 'Slope & Tangent Line' },
      { domain: /integ|ftc|series/i, title: 'Integrals & Fundamental Theorem', titleAr: 'التكامل والنظرية الأساسية', url: '/calculus/?ch=ch-integrals', ix: 'Riemann Sums & Area' }
    ],
    edexcel: [
      { domain: /number|surd|bound|set/i, title: 'Number, Surds, Bounds & Set Theory', titleAr: 'الأعداد والجذور والحدود والمجموعات', url: '/edexcel/?ch=edx-number', ix: 'Bounds & Venn Explorer' },
      { domain: /algebra|quad|function|series/i, title: 'Algebra, Functions & Series', titleAr: 'الجبر والدوال والمتسلسلات', url: '/edexcel/?ch=edx-algebra', ix: 'Quadratic & Function Explorer' },
      { domain: /circle|trig|vector|coord/i, title: 'Geometry, Circle Theorems & Vectors', titleAr: 'الهندسة ونظريات الدائرة والمتجهات', url: '/edexcel/?ch=edx-geometry', ix: 'Circle & 3D Trig Explorer' },
      { domain: /diff|kinemat|stat|prob|hist/i, title: 'Calculus, Kinematics & Statistics', titleAr: 'التفاضل والحركة والإحصاء', url: '/edexcel/?ch=edx-calculus', ix: 'Kinematics & Histogram Explorer' }
    ],
    gaten: [
      { domain: /arithmetic|ratio|percent|work|motion/i, title: 'GAT Arithmetic, Ratios & Speed Shortcuts', titleAr: 'الحساب والنسب والسرعة (GAT)', url: '/gaten/?ch=gaten-arith', ix: 'Speed & Ratio Explorer' },
      { domain: /comparison|geometry|data|average/i, title: 'GAT Comparisons, Geometry & Data', titleAr: 'المقارنات الكمية والهندسة والبيانات', url: '/gaten/?ch=gaten-qc-geo', ix: 'QC & Shaded Area Explorer' },
      { domain: /logic|matrix|complex|function|seq|log/i, title: 'SAAT Algebra, Matrices & Functions', titleAr: 'الجبر والمصفوفات والدوال (SAAT)', url: '/gaten/?ch=gaten-saat-alg', ix: 'Matrix & Function Explorer' },
      { domain: /trig|conic|vector|calc|limit|deriv|integ/i, title: 'SAAT Trig, Conics & Calculus', titleAr: 'المثلثات والقطوع والتفاضل والتكامل (SAAT)', url: '/gaten/?ch=gaten-saat-calc', ix: 'Conics & Calculus Explorer' }
    ],
    olympiad: [
      { domain: /nsmo|mawhiba|lte|screening/i, title: 'NSMO of KSA (Mawhiba Stages 1–3)', titleAr: 'الأولمبياد الوطني نسما (موهبة 1–3)', url: '/olympiad/?ch=ol-nsmo-stage1-2', ix: 'NSMO Pacing & LTE Lab' },
      { domain: /kaust|kmc|relay|academy/i, title: 'KAUST Mathematics Competition (KMC)', titleAr: 'مسابقة كاوست للرياضيات وأكاديمية كاوست', url: '/olympiad/?ch=ol-kaust-kmc-qualifier', ix: 'KAUST Roots & Relay Simulator' },
      { domain: /algebra|vieta|inequal|diophant|modular|prime/i, title: 'Olympiad Algebra & Number Theory', titleAr: 'جبر الأولمبياد ونظرية الأعداد', url: '/olympiad/?ch=ol-algebraic-techniques', ix: 'Vieta & Modular Explorer' },
      { domain: /count|pigeon|recurrence|prob|invariant|game/i, title: 'Combinatorics, Recurrences & Invariants', titleAr: 'التوافيق والعلاقات التكرارية والثوابت', url: '/olympiad/?ch=ol-combinatorics-counting', ix: 'Stars & Bars / Nim Lab' },
      { domain: /circle|power|triangle|ceva|menelaus|stewart/i, title: 'Olympiad Circle & Triangle Geometry', titleAr: 'هندسة الدوائر والمثلثات الأولمبية', url: '/olympiad/?ch=ol-euclidean-circles', ix: 'Power of a Point & Ceva Lab' }
    ],
    addmath: [
      { domain: /func|quad|poly|binomial|log|exp/i, title: 'Functions, Quadratics, Polynomials & Logs', titleAr: 'الدوال والتربيعيات واللوغاريتمات', url: '/addmath/?ch=addmath-functions', ix: 'Composite & Log Explorer' },
      { domain: /trig|circular|perm|comb|vector/i, title: 'Circular Measure, Trig, Combinatorics & Vectors', titleAr: 'القياس الدائري والمثلثات والمتجهات', url: '/addmath/?ch=addmath-trig', ix: 'Radian & Vector Explorer' },
      { domain: /diff|integ|kinemat|rate/i, title: 'Calculus & Kinematics (0606 / 4PM1)', titleAr: 'التفاضل والتكامل والديناميكا', url: '/addmath/?ch=addmath-diff', ix: 'Kinematics Explorer' }
    ],
    mathai: [
      { domain: /vector|norm|embed|matrix|transform/i, title: 'Vectors, Embeddings & Matrix Transformations', titleAr: 'المتجهات والتضمينات والمصفوفات', url: '/mathai/?ch=mathai-vectors', ix: 'Cosine Similarity Explorer' },
      { domain: /gradient|optim|loss|regress/i, title: 'Gradient Descent & Regression Models', titleAr: 'الانحدار التدريجي ونماذج الانحدار', url: '/mathai/?ch=mathai-grad', ix: 'Loss Landscape Explorer' },
      { domain: /prob|bayes|dist|mle|pca|eigen/i, title: 'Bayesian Probability, Distributions & PCA', titleAr: 'احتمالات بايز والتوزيعات وتحليل المكونات', url: '/mathai/?ch=mathai-pca', ix: 'PCA Projection Explorer' }
    ],
    act: [
      { domain: /pre|elem|inter|algebra|function/i, title: 'ACT Algebra & Functions', titleAr: 'الجبر والدوال في اختبار ACT', url: '/act/?ch=act-alg', ix: 'Algebra Explorer' },
      { domain: /coord|plane|geo|trig/i, title: 'ACT Geometry & Trigonometry', titleAr: 'الهندسة والمثلثات في اختبار ACT', url: '/act/?ch=act-geo', ix: 'Geometry Explorer' },
      { domain: /stat|prob|num|matrix|complex/i, title: 'ACT Statistics, Matrices & Number', titleAr: 'الإحصاء والمصفوفات والأعداد', url: '/act/?ch=act-stats', ix: 'Probability Explorer' }
    ],
    act2: [
      { domain: /alg|func|poly|rat|exp|log/i, title: 'ACT Subject Test 1 — Algebra & Functions', titleAr: 'الجبر والدوال (ACT 2 L1)', url: '/act2/', ix: 'Function Explorer' },
      { domain: /geo|trig|conic|seq|lim|stat/i, title: 'ACT Subject Test 1 — Geometry, Trig & Precalc', titleAr: 'الهندسة والمثلثات (ACT 2 L1)', url: '/act2/', ix: 'Trig & Conic Explorer' }
    ],
    act2l2: [
      { domain: /complex|matrix|vector|seq/i, title: 'ACT Subject Test 2 — Complex, Matrices & Vectors', titleAr: 'الأعداد المركبة والمصفوفات والمتجهات', url: '/act2l2/', ix: 'Matrix & Vector Explorer' },
      { domain: /func|trig|polar|conic|limit/i, title: 'ACT Subject Test 2 — Advanced Functions, Polar & Limits', titleAr: 'الدوال المتقدمة والإحداثيات القطبية والنهايات', url: '/act2l2/', ix: 'Polar & Limit Explorer' }
    ],
    est: [
      { domain: /linear|algebra|system|ineq/i, title: 'EST I — Heart of Algebra & Linear Systems', titleAr: 'الجبر والمعادلات الخطية (EST I)', url: '/est/', ix: 'Linear Explorer' },
      { domain: /quad|poly|func|exp|data|geo|trig/i, title: 'EST I — Advanced Math, Data & Geometry', titleAr: 'الرياضيات المتقدمة والبيانات والهندسة (EST I)', url: '/est/', ix: 'Parabola & Data Explorer' }
    ],
    est2: [
      { domain: /alg|func|coord|seq/i, title: 'EST II Level 1 — Algebra, Functions & Coordinate Geometry', titleAr: 'الجبر والدوال والهندسة الإحداثية (EST 2 L1)', url: '/est2/', ix: 'Coordinate Explorer' },
      { domain: /geo|trig|stat|prob/i, title: 'EST II Level 1 — Geometry, Trig & Statistics', titleAr: 'الهندسة والمثلثات والإحصاء (EST 2 L1)', url: '/est2/', ix: 'Trig Explorer' }
    ],
    est2l2: [
      { domain: /complex|matrix|vector|seq|alg|func/i, title: 'EST II Level 2 — Complex Numbers, Vectors & Functions', titleAr: 'الأعداد المركبة والمتجهات والدوال (EST 2 L2)', url: '/est2l2/', ix: 'Vector Explorer' },
      { domain: /trig|conic|calc|deriv|integ|stat/i, title: 'EST II Level 2 — Trig, Conics, Calculus & Probability', titleAr: 'المثلثات والقطوع والتفاضل والاحتمالات (EST 2 L2)', url: '/est2l2/', ix: 'Calculus Explorer' }
    ],
    apab: [
      { domain: /limit|deriv|diff|rate|opt/i, title: 'AP Calculus AB — Limits & Differential Calculus', titleAr: 'النهايات وحساب التفاضل (AP AB)', url: '/apab/', ix: 'Derivative Explorer' },
      { domain: /integ|ftc|de|area|vol/i, title: 'AP Calculus AB — Integrals, DEs & Volumes', titleAr: 'التكامل والمعادلات التفاضلية والحجوم (AP AB)', url: '/apab/', ix: 'Riemann & Volume Explorer' }
    ],
    apbc: [
      { domain: /limit|deriv|integ|de/i, title: 'AP Calculus BC — Core AB & Advanced Integration', titleAr: 'التفاضل والتكامل المتقدم (AP BC)', url: '/apbc/', ix: 'Integration Explorer' },
      { domain: /param|polar|vector|series|taylor/i, title: 'AP Calculus BC — Parametric, Polar & Infinite Series', titleAr: 'المنحنيات القطبية ومتسلسلات تايلور (AP BC)', url: '/apbc/', ix: 'Taylor & Polar Explorer' }
    ],
    appc: [
      { domain: /poly|rat|exp|log/i, title: 'AP Precalculus — Polynomial, Rational, Exp & Log', titleAr: 'كثيرات الحدود والدوال الأسية واللوغاريتمية', url: '/appc/', ix: 'Function Explorer' },
      { domain: /trig|sin|polar|param|vector|matrix/i, title: 'AP Precalculus — Trig, Polar, Vectors & Matrices', titleAr: 'الدوال المثلثية والقطبية والمصفوفات', url: '/appc/', ix: 'Sinusoidal & Polar Explorer' }
    ],
    apstats: [
      { domain: /explor|data|sampl|exper|prob|dist/i, title: 'AP Statistics — Exploring Data, Sampling & Probability', titleAr: 'استكشاف البيانات والمعاينة والاحتمالات', url: '/apstats/', ix: 'Distribution Explorer' },
      { domain: /infer|conf|hypoth|chi|regress/i, title: 'AP Statistics — Statistical Inference & Regression', titleAr: 'الاستدلال الإحصائي واختبارات الفرضيات', url: '/apstats/', ix: 'Inference Explorer' }
    ],
    ibsl: [
      { domain: /number|alg|func|trig/i, title: 'IB Math SL — Number, Functions & Trigonometry', titleAr: 'الأعداد والدوال وحساب المثلثات (IB SL)', url: '/ibsl/', ix: 'Functions & Trig Explorer' },
      { domain: /stat|prob|calc|deriv|integ/i, title: 'IB Math SL — Statistics, Probability & Calculus', titleAr: 'الإحصاء والاحتمالات والتفاضل والتكامل (IB SL)', url: '/ibsl/', ix: 'Calculus & Normal Explorer' }
    ],
    ibhl: [
      { domain: /alg|complex|proof|func|trig|vector/i, title: 'IB Math HL — Complex Numbers, Proof & 3D Vectors', titleAr: 'الأعداد المركبة والبرهان والمتجهات (IB HL)', url: '/ibhl/', ix: '3D Vector & Complex Explorer' },
      { domain: /stat|prob|bayes|calc|de|maclaurin/i, title: 'IB Math HL — Advanced Calculus, DEs & Distributions', titleAr: 'التفاضل والتكامل المتقدم ومتسلسلات ماكلورين (IB HL)', url: '/ibhl/', ix: 'Maclaurin & DE Explorer' }
    ],
    algebra: [
      { domain: /linear|ineq|system|func/i, title: 'Algebra 1 — Linear Equations, Systems & Functions', titleAr: 'المعادلات الخطية والأنظمة والدوال', url: '/algebra/', ix: 'Linear Explorer' },
      { domain: /exp|poly|quad|radical|data/i, title: 'Algebra 1 — Exponents, Polynomials & Quadratics', titleAr: 'الأسس وكثيرات الحدود والمعادلات التربيعية', url: '/algebra/', ix: 'Parabola Explorer' }
    ],
    geo: [
      { domain: /angle|parallel|triang|congru|simil/i, title: 'Geometry — Proof, Triangles, Congruence & Similarity', titleAr: 'البرهان والمثلثات والتطابق والتشابه', url: '/geo/', ix: 'Triangle Explorer' },
      { domain: /trig|circle|coord|area|vol/i, title: 'Geometry — Right-Triangle Trig, Circles & 3D Solids', titleAr: 'حساب المثلثات والدوائر والمجسمات', url: '/geo/', ix: 'Circle & Volume Explorer' }
    ],
    alg2: [
      { domain: /func|quad|complex|poly|rat/i, title: 'Algebra 2 — Quadratics, Complex, Polynomials & Rationals', titleAr: 'التربيعيات والأعداد المركبة وكثيرات الحدود', url: '/alg2/', ix: 'Polynomial Explorer' },
      { domain: /exp|log|radical|seq|conic|trig/i, title: 'Algebra 2 — Exponentials, Logs, Series & Conics', titleAr: 'الدوال الأسية واللوغاريتمية والقطوع', url: '/alg2/', ix: 'Conics & Log Explorer' }
    ],
    precalc: [
      { domain: /func|trig|ident|analytic/i, title: 'Pre-Calculus — Functions & Analytical Trigonometry', titleAr: 'الدوال وحساب المثلثات التحليلي', url: '/precalc/', ix: 'Unit Circle Explorer' },
      { domain: /vector|polar|param|conic|matrix|seq|limit/i, title: 'Pre-Calculus — Vectors, Polar, Conics & Limits', titleAr: 'المتجهات والإحداثيات القطبية والقطوع والنهايات', url: '/precalc/', ix: 'Polar & Conics Explorer' }
    ],
    linalg: [
      { domain: /vector|system|matrix|det|subspace/i, title: 'Linear Algebra — Systems, Matrices, Determinants & Subspaces', titleAr: 'الأنظمة الخطية والمصفوفات والفضاءات المتجهة', url: '/linalg/', ix: 'Matrix Transformation Explorer' },
      { domain: /transform|eigen|orthog|svd|symm/i, title: 'Linear Algebra — Eigenvalues, Orthogonality & SVD', titleAr: 'القيم الذاتية والتعامد وتحليل القيم المفردة', url: '/linalg/', ix: 'Eigenvector Explorer' }
    ],
    mvc: [
      { domain: /vector|curve|partial|grad|opt/i, title: 'Multivariable Calculus — 3D Vectors, Partial Derivatives & Gradients', titleAr: 'المتجهات ثلاثية الأبعاد والمشتقات الجزئية والتدرج', url: '/mvc/', ix: 'Gradient Explorer' },
      { domain: /double|triple|integ|line|green|stokes|div/i, title: 'Multivariable Calculus — Multiple Integrals & Vector Fields', titleAr: 'التكاملات المتعددة وحساب المتجهات', url: '/mvc/', ix: 'Vector Field Explorer' }
    ],
    odes: [
      { domain: /first|separ|linear|exact|second/i, title: 'Differential Equations — First & Second Order ODEs', titleAr: 'المعادلات التفاضلية من الرتبة الأولى والثانية', url: '/odes/', ix: 'Slope Field Explorer' },
      { domain: /laplace|system|phase|series|bvp|fourier/i, title: 'Differential Equations — Laplace, Systems & Series', titleAr: 'تحويل لابلاس والأنظمة الخطية ومتسلسلات فورييه', url: '/odes/', ix: 'Phase Portrait Explorer' }
    ]
  };

  function escT(s) {
    return s ? String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;') : '';
  }

  function parseAnswerIndex(q) {
    if (typeof q.answer === 'number') return q.answer;
    if (typeof q.answer === 'string') {
      var trimmed = q.answer.trim().toUpperCase();
      if (/^[A-D]$/.test(trimmed)) return trimmed.charCodeAt(0) - 65;
      if (q.choices && q.choices.length) {
        for (var i = 0; i < q.choices.length; i++) {
          if (String(q.choices[i]).trim() === q.answer.trim()) return i;
        }
      }
    }
    return 0;
  }

  function getOrCreateModal() {
    var overlay = document.getElementById('cs-diagnostic-overlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = 'cs-diagnostic-overlay';
      overlay.className = 'cs-diag-overlay';
      overlay.setAttribute('role', 'dialog');
      overlay.setAttribute('aria-modal', 'true');
      overlay.setAttribute('aria-label', 'Diagnostic Assessment');
      document.body.appendChild(overlay);
    }
    return overlay;
  }

  var SKIP_DIAG_DOMAINS = /test format|strategy|overview|exam format/i;

  function normalizeDiff(q) {
    var d = (q.difficulty || q.level || '').toLowerCase();
    if (d === 'easy' || d === 'foundation' || d === 'basic' || d === '1') return 'easy';
    if (d === 'hard' || d === 'advanced' || d === '3') return 'hard';
    return 'medium';
  }

  function shuffle(arr) {
    var a = arr.slice();
    for (var j = a.length - 1; j > 0; j--) {
      var k = Math.floor(Math.random() * (j + 1));
      var temp = a[j]; a[j] = a[k]; a[k] = temp;
    }
    return a;
  }

  function _autoMath(s) {
    if (window.CSAutoMath) return window.CSAutoMath(s);
    if (!s && s !== 0) return '';
    s = String(s).trim();
    if (s.indexOf('\\(') !== -1 || s.indexOf('\\[') !== -1 || s.indexOf('$$') !== -1) return s;
    if (s.startsWith('$') && s.endsWith('$') && s.length > 2) return '\\(' + s.slice(1, -1).trim() + '\\)';
    if (/<[a-z/][\s\S]*>/i.test(s) || /[\u0600-\u06FF]/.test(s)) return s;
    if (s.indexOf('\\') !== -1) return '\\(' + s + '\\)';
    if (/[\^_{}±≤≥≠≈√πθ∞×÷·°]/.test(s) && !/[^\\]%|^%/.test(s)) return '\\(' + s + '\\)';
    if (/^[-+]?\d+(?:\.\d+)?%?$/.test(s)) return '\\(' + s + '\\)';
    var fracMatch = /^([-+]?)\s*([0-9a-zA-Z]+)\s*\/\s*([0-9a-zA-Z]+)$/.exec(s);
    if (fracMatch) return '\\(' + (fracMatch[1]||'') + '\\frac{' + fracMatch[2] + '}{' + fracMatch[3] + '}\\)';
    if (/^\(\s*[-+]?[0-9a-zA-Z.]+\s*,\s*[-+]?[0-9a-zA-Z.]+\s*\)$/.test(s)) return '\\(' + s + '\\)';
    if (/^[(\[]\s*[-+]?[0-9a-zA-Z.]+\s*,\s*[-+]?[0-9a-zA-Z.]+\s*[)\]]$/.test(s)) return '\\(' + s + '\\)';
    if (/^[-+]?\d*[a-zA-Z]$/.test(s)) return '\\(' + s + '\\)';
    var mathFns = {sin:1, cos:1, tan:1, sec:1, csc:1, cot:1, log:1, ln:1, lim:1, exp:1, det:1, deg:1, rad:1};
    var words = s.match(/[a-zA-Z]{2,}/g) || [];
    if (words.some(function(w){ return !mathFns[w.toLowerCase()]; })){
      if (/^[a-zA-Z](?:\([a-zA-Z0-9]+\))?\s*(=|<|>|<=|>=)\s*[-+]?[0-9a-zA-Z]/.test(s) && !/[^\\]%|^%/.test(s)){
        return '\\(' + s.replace(/\b(or|and)\b/g, '\\text{ $1 }') + '\\)';
      }
      return s;
    }
    if (/[-+*/=<>|()]/.test(s) && /^[-+*/=<>()0-9a-zA-Z.,\s|]+$/.test(s)) return '\\(' + s + '\\)';
    return s;
  }

  function formatMath(s) {
    if (!s && s !== 0) return '';
    s = String(s);
    s = s.replace(/\$\$([\s\S]+?)\$\$/g, '\\[$1\\]');
    s = s.replace(/\\\$/g, '\uE000');
    s = s.replace(/\$(?!\s)([^$\n]+?)(?<!\s)\$/g, function(m, inner){
      if (/^\d[\d,]*(?:\.\d+)?(?:$|\s*[,.;:!?)%]|\s+[a-zA-Z\u0600-\u06FF]{2,})/.test(inner)) return m;
      var stripped = inner.replace(/\\(?:text|textbf|textit|mathrm|mathbf|operatorname|mbox)\s*\{[^}]*\}/g, '').replace(/\\[a-zA-Z]+/g, '');
      if (/[a-zA-Z]{3,}\s+[a-zA-Z]{2,}\s+[a-zA-Z]{2,}/.test(stripped) || /[\u0600-\u06FF]{2,}\s+[\u0600-\u06FF]{2,}/.test(stripped)) return m;
      return '\\(' + inner + '\\)';
    });
    s = s.replace(/\uE000/g, '\\$');
    s = _autoMath(s);
    var out = '', inM = false, i = 0, L = s.length;
    while (i < L) {
      if (!inM && s.slice(i, i + 2) === '\\(') { out += '\\('; i += 2; inM = true; continue; }
      if (!inM && s.slice(i, i + 2) === '\\[') { out += '\\['; i += 2; inM = true; continue; }
      if (inM && s.slice(i, i + 2) === '\\)') { out += '\\)'; i += 2; inM = false; continue; }
      if (inM && s.slice(i, i + 2) === '\\]') { out += '\\]'; i += 2; inM = false; continue; }
      if (s[i] === '<' && i + 1 < L && (s[i + 1] === '/' || /[a-zA-Z]/.test(s[i + 1]))) {
        var tj = s.indexOf('>', i);
        if (tj !== -1) { out += s.slice(i, tj + 1); i = tj + 1; continue; }
      }
      if (!inM && s[i] === '\\' && i + 1 < L && (s[i + 1] === '%' || s[i + 1] === '$')) {
        out += s[i + 1]; i += 2; continue;
      }
      var c = s[i];
      if (c === '&') {
        var sm = s.indexOf(';', i + 1);
        if (sm !== -1 && sm - i <= 8 && /^&[a-zA-Z#0-9]+;/.test(s.slice(i, sm + 1))) {
          out += s.slice(i, sm + 1); i = sm + 1; continue;
        }
        out += '&amp;';
      } else if (c === '<') { out += '&lt;'; }
      else if (c === '>') { out += '&gt;'; }
      else if (c === '"') { out += '&quot;'; }
      else { out += c; }
      i++;
    }
    return out;
  }

  function renderFig(q) {
    var f = q.figure || q.fig || q.table;
    if (!f) return '';
    if (typeof f === 'string') return '<div class="cs-diag-figure">' + f + '</div>';
    if (f.type === 'table' || f.headers || f.rows) {
      var hdrs = (f.headers || []).map(function(th) { return '<th>' + formatMath(th != null ? String(th) : '') + '</th>'; }).join('');
      var rws = (f.rows || f.data || []).map(function(r) {
        return '<tr>' + (Array.isArray(r) ? r.map(function(c) { return '<td>' + formatMath(c != null ? String(c) : '') + '</td>'; }).join('') : '<td>' + formatMath(r != null ? String(r) : '') + '</td>') + '</tr>';
      }).join('');
      return '<div class="cs-diag-figure"><table class="exam-table">' + (hdrs ? '<thead><tr>' + hdrs + '</tr></thead>' : '') + '<tbody>' + rws + '</tbody></table></div>';
    }
    if (window._renderFig) return '<div class="cs-diag-figure">' + window._renderFig(f) + '</div>';
    if (window.renderMathFigure) return '<div class="cs-diag-figure">' + window.renderMathFigure(f) + '</div>';
    return '';
  }

  // ── Computerized Adaptive Testing (CAT) Routing ─────────────────────────────
  function pickNextAdaptiveQuestion(state) {
    var targetDiff = state.currentDifficulty || 'medium';

    // Domain balance: count questions already picked per domain
    var domainCounts = {};
    state.domains.forEach(function(d) { domainCounts[d] = 0; });
    state.questions.forEach(function(q) {
      var d = q.domain || 'General Mathematics';
      domainCounts[d] = (domainCounts[d] || 0) + 1;
    });

    // Sort domains by lowest frequency
    var sortedDomains = state.domains.slice().sort(function(a, b) {
      return (domainCounts[a] || 0) - (domainCounts[b] || 0);
    });

    var picked = null;
    var pickedDomain = null;

    // Try finding unused question in least represented domains at target difficulty
    for (var di = 0; di < sortedDomains.length; di++) {
      var d = sortedDomains[di];
      var diffMap = state.byDomainAndDiff[d];
      if (!diffMap) continue;

      var diffPool = diffMap[targetDiff] || [];
      for (var pi = 0; pi < diffPool.length; pi++) {
        var candidate = diffPool[pi];
        var qId = (candidate.text || candidate.q || '') + '|' + d;
        if (!state.usedIndices[qId]) {
          picked = candidate;
          pickedDomain = d;
          state.usedIndices[qId] = true;
          break;
        }
      }
      if (picked) break;
    }

    // Fallback: search adjacent difficulty levels in least represented domains
    if (!picked) {
      var fallbackOrder = targetDiff === 'medium' ? ['hard', 'easy'] : ['medium', targetDiff === 'easy' ? 'hard' : 'easy'];
      for (var fi = 0; fi < fallbackOrder.length; fi++) {
        var altDiff = fallbackOrder[fi];
        for (var di2 = 0; di2 < sortedDomains.length; di2++) {
          var d2 = sortedDomains[di2];
          var diffMap2 = state.byDomainAndDiff[d2];
          if (!diffMap2) continue;
          var altPool = diffMap2[altDiff] || [];
          for (var pj = 0; pj < altPool.length; pj++) {
            var cand = altPool[pj];
            var qId2 = (cand.text || cand.q || '') + '|' + d2;
            if (!state.usedIndices[qId2]) {
              picked = cand;
              pickedDomain = d2;
              state.usedIndices[qId2] = true;
              break;
            }
          }
          if (picked) break;
        }
        if (picked) break;
      }
    }

    // Ultimate fallback: any unused question in pool
    if (!picked && state.pool.length) {
      for (var k = 0; k < state.pool.length; k++) {
        var anyQ = state.pool[k];
        var anyId = (anyQ.text || anyQ.q || '') + '|' + (anyQ.domain || '');
        if (!state.usedIndices[anyId]) {
          picked = anyQ;
          state.usedIndices[anyId] = true;
          break;
        }
      }
    }

    if (picked) {
      picked._adaptiveDiff = targetDiff;
      state.questions.push(picked);
      state.difficultyHistory.push(targetDiff);
    }
    return picked;
  }

  function renderQuestion() {
    var overlay = getOrCreateModal();
    var state = _diagState;
    if (!state) return;

    var q = state.questions[state.currentIdx];
    var total = state.targetCount;
    var progressPct = Math.round(((state.currentIdx + 1) / total) * 100);
    var trackLabel = TRACK_NAMES[state.trackId] || state.trackId.toUpperCase();
    var userAns = state.userAnswers[state.currentIdx];
    var figHtml = renderFig(q);

    var curDiff = q._adaptiveDiff || state.currentDifficulty || 'medium';
    var diffBadgeHtml = '';
    if (curDiff === 'easy') {
      diffBadgeHtml = '<span class="cs-diag-cat-badge easy">🌱 Foundation / Level 1</span>';
    } else if (curDiff === 'hard') {
      diffBadgeHtml = '<span class="cs-diag-cat-badge hard">🔥 Advanced / Level 3</span>';
    } else {
      diffBadgeHtml = '<span class="cs-diag-cat-badge medium">⚖️ Standard / Level 2</span>';
    }

    var choicesHtml = (q.choices || []).map(function(choice, cIdx) {
      var letter = String.fromCharCode(65 + cIdx);
      var isSelected = userAns === cIdx;
      return '<button type="button" class="cs-diag-choice' + (isSelected ? ' selected' : '') + '" onclick="window.selectDiagChoice(' + cIdx + ')">'
        + '<span class="cs-diag-letter">' + letter + '</span>'
        + '<span class="cs-diag-choice-text">' + formatMath(choice) + '</span>'
        + '</button>';
    }).join('');

    var isLast = state.currentIdx === total - 1;

    overlay.innerHTML = '<div class="cs-diag-card">'
      + '<div class="cs-diag-head">'
      + '  <div class="cs-diag-meta">'
      + '    <span class="cs-diag-track-badge">🎯 ' + escT(trackLabel) + ' CAT</span>'
      + '    <span class="cs-diag-counter">Question ' + (state.currentIdx + 1) + ' of ' + total + '</span>'
      + '    ' + diffBadgeHtml
      + '  </div>'
      + '  <button type="button" class="cs-diag-close" onclick="window.closeDiagnosticTest()" aria-label="Close diagnostic">✕</button>'
      + '</div>'
      + '<div class="cs-diag-progress-bar"><div class="cs-diag-progress-fill" style="width:' + progressPct + '%"></div></div>'
      + '<div class="cs-diag-body">'
      + '  <div class="cs-diag-domain-tag">' + escT(q.domain || 'Core Mathematics') + '</div>'
      + (figHtml ? '<div class="cs-diag-fig-wrap">' + figHtml + '</div>' : '')
      + '  <div class="cs-diag-q-text">' + formatMath(q.text || q.q || '') + '</div>'
      + '  <div class="cs-diag-choices">' + choicesHtml + '</div>'
      + '</div>'
      + '<div class="cs-diag-footer">'
      + '  <button type="button" class="cs-diag-nav-btn" onclick="window.prevDiagQuestion()"' + (state.currentIdx === 0 ? ' disabled' : '') + '>← Previous</button>'
      + '  <div class="cs-diag-footer-spacer"></div>'
      + '  <button type="button" class="btn cs-diag-next-btn" onclick="' + (isLast ? 'window.finishDiagnosticTest()' : 'window.nextDiagQuestion()') + '">'
      + (isLast ? 'Submit Diagnostic ✓' : 'Next Question →')
      + '  </button>'
      + '</div>'
      + '</div>';

    typesetMath(overlay);
  }

  function getProjectedScore(trackId, pct) {
    if (trackId === 'sat' || trackId === 'est' || trackId === 'est2' || trackId === 'est2l2') {
      var s = 420 + Math.round((pct / 100) * 380);
      var low = Math.max(400, s - 30);
      var high = Math.min(800, s + 30);
      return low + '–' + high + (trackId === 'sat' ? ' (SAT Math)' : ' (EST Math)');
    }
    if (trackId === 'act' || trackId === 'act2' || trackId === 'act2l2') {
      var actScore = Math.min(36, Math.max(14, Math.round(14 + (pct / 100) * 22)));
      return actScore + ' / 36 (ACT Scale)';
    }
    if (trackId === 'qudrat' || trackId === 'tahsili' || trackId === 'gaten') {
      var qScore = Math.round(55 + (pct / 100) * 44);
      return qScore + '%+ (Percentile)';
    }
    if (trackId === 'igcse' || trackId === 'edexcel' || trackId === 'aslevel' || trackId === 'a2level' || trackId === 'addmath') {
      if (pct >= 85) return '9 / A* (Distinction)';
      if (pct >= 72) return '8 / A (Merit)';
      if (pct >= 58) return '6–7 / B (Proficient)';
      if (pct >= 45) return '4–5 / C (Passing)';
      return 'Developing';
    }
    if (trackId === 'olympiad') {
      var amc = Math.round((pct / 100) * 150);
      return amc + '/150 (' + (amc >= 100 ? 'AIME Qualifier' : 'Contest Level') + ')';
    }
    if (trackId === 'mathai') {
      if (pct >= 80) return 'Mastery (Level 4)';
      if (pct >= 65) return 'Proficient (Level 3)';
      if (pct >= 50) return 'Basic (Level 2)';
      return 'Emerging (Level 1)';
    }
    if (trackId === 'ibsl' || trackId === 'ibhl') {
      var g = Math.min(7, Math.max(2, Math.round(1 + (pct / 100) * 6)));
      return 'Grade ' + g + ' of 7';
    }
    if (trackId === 'apab' || trackId === 'apbc' || trackId === 'appc' || trackId === 'apstats') {
      var ap = pct >= 80 ? 5 : (pct >= 65 ? 4 : (pct >= 50 ? 3 : (pct >= 35 ? 2 : 1)));
      return 'Score ' + ap + ' on AP';
    }
    return pct + '% Proficiency';
  }

  function renderResults() {
    var overlay = getOrCreateModal();
    var state = _diagState;
    if (!state) return;

    var total = state.questions.length;
    var correct = 0;
    var weightedScore = 0;
    var maxWeightedScore = 0;
    var domainStats = {};

    state.questions.forEach(function(q, i) {
      var d = q.domain || 'General Mathematics';
      if (!domainStats[d]) domainStats[d] = { correct: 0, total: 0 };
      domainStats[d].total++;

      var diff = q._adaptiveDiff || 'medium';
      var weight = diff === 'hard' ? 3.2 : (diff === 'medium' ? 2.0 : 1.0);
      maxWeightedScore += weight;

      var targetAns = parseAnswerIndex(q);
      var userAns = state.userAnswers[i];
      if (userAns !== undefined && userAns === targetAns) {
        correct++;
        weightedScore += weight;
        domainStats[d].correct++;
      }
    });

    var rawPct = Math.round((correct / total) * 100);
    var catPct = Math.min(99, Math.max(25, Math.round((weightedScore / maxWeightedScore) * 100)));
    var isArabic = (state.lang === 'ar');
    var trackLabel = isArabic ? (TRACK_NAMES_AR[state.trackId] || state.trackId) : (TRACK_NAMES[state.trackId] || state.trackId.toUpperCase());
    var projScore = getProjectedScore(state.trackId, catPct);

    // Persist diagnostic result
    try {
      localStorage.setItem('clipsat_diagnostic_' + state.trackId, JSON.stringify({
        date: Date.now(),
        score: correct,
        total: total,
        rawPct: rawPct,
        catPct: catPct,
        projectedScore: projScore,
        domains: domainStats
      }));
    } catch(e) {}

    // Track analytics event
    if (window.ClipSATAnalytics) {
      window.ClipSATAnalytics.track('diagnostic_complete', {
        track: state.trackId,
        score: correct,
        total: total,
        catPct: catPct
      });
    }

    // Identify weak domains
    var weakDomains = Object.keys(domainStats).map(function(k) {
      var ds = domainStats[k];
      return { domain: k, correct: ds.correct, total: ds.total, pct: Math.round((ds.correct / ds.total) * 100) };
    }).sort(function(a, b) { return a.pct - b.pct; });

    var topWeak = weakDomains.filter(function(d) { return d.pct < 75; }).slice(0, 3);
    if (!topWeak.length && weakDomains.length) topWeak = [weakDomains[0]];

    // WhatsApp Message
    var weakSummaryStr = topWeak.map(function(d) { return d.domain + ' (' + d.pct + '%)'; }).join(', ');
    var waMsg = isArabic
      ? ('مرحباً أستاذ محمد، أتممت تقييم ClipSAT التشخيصي لمادة ' + trackLabel + '.\n'
        + 'النتيجة: ' + correct + '/' + total + ' (' + catPct + '%)\n'
        + 'التقدير المتوقع: ' + projScore + '\n'
        + 'المجالات ذات الأولوية: ' + (weakSummaryStr || 'جميع المجالات فوق 75%') + '\n'
        + 'أرغب في خطة دراسية موجهة لرفع درجتي!')
      : ('Hello Mr. Mohamed! I just finished the ClipSAT ' + trackLabel + ' Adaptive Diagnostic.\n'
        + 'My Score: ' + correct + '/' + total + ' (' + catPct + '% proficiency)\n'
        + 'Projected Target: ' + projScore + '\n'
        + 'Priority Focus Areas: ' + (weakSummaryStr || 'All areas above 75%') + '\n'
        + 'I would like your guidance on a study plan!');

    var waUrl = 'https://wa.me/966597688647?text=' + encodeURIComponent(waMsg);

    // Domain breakdown bars
    var domainBarsHtml = Object.keys(domainStats).map(function(d) {
      var st = domainStats[d];
      var dpct = Math.round((st.correct / st.total) * 100);
      var barClass = dpct >= 75 ? 'high' : (dpct >= 50 ? 'med' : 'low');
      return '<div class="cs-diag-domain-row">'
        + '<div class="cs-diag-domain-header">'
        + '  <span class="cs-diag-domain-name">' + escT(d) + '</span>'
        + '  <span class="cs-diag-domain-score ' + barClass + '">' + dpct + '% (' + st.correct + '/' + st.total + ')</span>'
        + '</div>'
        + '<div class="cs-diag-mini-bar"><div class="cs-diag-mini-fill ' + barClass + '" style="width:' + dpct + '%"></div></div>'
        + '</div>';
    }).join('');

    // Study Schedule Generator (Pillar 4.4)
    var trackMapList = TRACK_CHAPTER_MAP[state.trackId] || [];
    function findChapterForDomain(domName) {
      for (var mi = 0; mi < trackMapList.length; mi++) {
        if (trackMapList[mi].domain.test(domName)) {
          return trackMapList[mi];
        }
      }
      return null;
    }

    var planTab = state.planTab || '7day';
    var planItemsHtml = '';

    if (planTab === '7day') {
      var d1 = topWeak[0] ? topWeak[0].domain : (state.domains[0] || 'Core Algebra');
      var d2 = topWeak[1] ? topWeak[1].domain : (state.domains[1] || 'Functions & Geometry');
      var d3 = topWeak[2] ? topWeak[2].domain : (state.domains[2] || 'Advanced Problem Solving');

      var c1 = findChapterForDomain(d1);
      var c2 = findChapterForDomain(d2);
      var c3 = findChapterForDomain(d3);

      var items = [
        {
          day: isArabic ? 'اليوم 1–2' : 'Days 1–2',
          task: isArabic ? ('مراجعة التأسيس والمفاهيم لـ: ' + d1) : ('Foundational review & interactive explorer: ' + d1),
          link: c1 ? '<a href="' + c1.url + '" class="cs-diag-schedule-link" target="_blank">' + (isArabic ? '📖 فتح الدرس' : '📖 View Notes') + ' →</a>' : '<a href="/' + state.trackId + '/" class="cs-diag-schedule-link">' + (isArabic ? 'المنهج' : 'Syllabus') + ' →</a>'
        },
        {
          day: isArabic ? 'اليوم 3–4' : 'Days 3–4',
          task: isArabic ? ('حل تدريبات مكثفة على: ' + d2) : ('Targeted practice problems & error spotting: ' + d2),
          link: c2 ? '<a href="' + c2.url + '" class="cs-diag-schedule-link" target="_blank">' + (isArabic ? '🎛️ المستكشف' : '🎛️ Explorer') + ' →</a>' : '<a href="/' + state.trackId + '/" class="cs-diag-schedule-link">' + (isArabic ? 'التمارين' : 'Practice') + ' →</a>'
        },
        {
          day: isArabic ? 'اليوم 5–6' : 'Days 5–6',
          task: isArabic ? ('تمارين متقدمة على المسائل المركبة: ' + d3) : ('Timed section drills & question bank variations: ' + d3),
          link: c3 ? '<a href="' + c3.url + '" class="cs-diag-schedule-link" target="_blank">' + (isArabic ? '📝 اختبار' : '📝 Quiz') + ' →</a>' : '<a href="/' + state.trackId + '/" class="cs-diag-schedule-link">' + (isArabic ? 'التمارين' : 'Practice') + ' →</a>'
        },
        {
          day: isArabic ? 'اليوم 7' : 'Day 7',
          task: isArabic ? 'خوض محاكاة اختبار كامل في بيئة CBT الرسمية' : 'Full-length authentic timed CBT exam simulation',
          link: '<button type="button" class="cs-diag-schedule-link" onclick="window.closeDiagnosticTest(); window.openMockExam(\'' + state.trackId + '\', 0);">' + (isArabic ? '💻 محاكي CBT' : '💻 Launch CBT') + ' ↗</button>'
        }
      ];

      planItemsHtml = items.map(function(it) {
        return '<div class="cs-diag-schedule-item">'
          + '<span class="cs-diag-schedule-day">' + it.day + '</span>'
          + '<span class="cs-diag-schedule-task">' + it.task + '</span>'
          + it.link
          + '</div>';
      }).join('');
    } else {
      var wItems = [
        {
          day: isArabic ? 'الأسبوع 1' : 'Week 1',
          task: isArabic ? 'إتقان المجال الأضعف بالكامل من خلال الشروحات المرئية والمستكشفات' : 'Deep dive into weakest domain with interactive figures & notes',
          link: '<a href="/' + state.trackId + '/" class="cs-diag-schedule-link" target="_blank">' + (isArabic ? 'ابدأ' : 'Begin') + ' →</a>'
        },
        {
          day: isArabic ? 'الأسبوع 2' : 'Week 2',
          task: isArabic ? 'التركيز على حل بنوك الأسئلة للمستوى المتوسط والمتقدم وسجل الأخطاء' : 'Solve intermediate/hard question banks & review mistake journal',
          link: '<a href="/' + state.trackId + '/" class="cs-diag-schedule-link" target="_blank">' + (isArabic ? 'تمارين' : 'Drills') + ' →</a>'
        },
        {
          day: isArabic ? 'الأسبوع 3' : 'Week 3',
          task: isArabic ? 'إدارة الوقت والتكتيكات غير المعتمدة على الآلة الحاسبة وأساليب السرعة' : 'Pacing strategies, mental math shortcuts, and speed drills',
          link: '<button type="button" class="cs-diag-schedule-link" onclick="window.closeDiagnosticTest(); window.openMockExam(\'' + state.trackId + '\', 0);">' + (isArabic ? 'محاكاة' : 'Simulate') + ' →</button>'
        },
        {
          day: isArabic ? 'الأسبوع 4' : 'Week 4',
          task: isArabic ? 'خوض 3 امتحانات تجريبية كاملة تحت الضغط الزمني الفعلي' : 'Take 3 full-length timed mock exams under realistic test conditions',
          link: '<button type="button" class="cs-diag-schedule-link" onclick="window.closeDiagnosticTest(); window.openMockExam(\'' + state.trackId + '\', 0);">' + (isArabic ? '💻 محاكي CBT' : '💻 Launch CBT') + ' ↗</button>'
        }
      ];

      planItemsHtml = wItems.map(function(it) {
        return '<div class="cs-diag-schedule-item">'
          + '<span class="cs-diag-schedule-day">' + it.day + '</span>'
          + '<span class="cs-diag-schedule-task">' + it.task + '</span>'
          + it.link
          + '</div>';
      }).join('');
    }

    // Solutions review accordion
    var solutionsHtml = state.questions.map(function(q, i) {
      var targetAns = parseAnswerIndex(q);
      var userAns = state.userAnswers[i];
      var isCorrect = userAns !== undefined && userAns === targetAns;
      var userLetter = userAns !== undefined ? String.fromCharCode(65 + userAns) : (isArabic ? 'بدون إجابة' : 'None');
      var targetLetter = String.fromCharCode(65 + targetAns);
      var userChoiceText = userAns !== undefined && q.choices ? q.choices[userAns] : (isArabic ? 'لم تتم الإجابة' : 'Not answered');
      var targetChoiceText = q.choices ? q.choices[targetAns] : '';
      var figHtml = renderFig(q);
      var qDiff = q._adaptiveDiff || 'medium';

      return '<div class="cs-diag-sol-card ' + (isCorrect ? 'correct' : 'incorrect') + '">'
        + '<div class="cs-diag-sol-head">'
        + '  <span class="cs-diag-sol-badge ' + (isCorrect ? 'correct' : 'incorrect') + '">' + (isCorrect ? (isArabic ? '✓ إجابة صحيحة' : '✓ Correct') : (isArabic ? '✗ إجابة غير صحيحة' : '✗ Incorrect')) + '</span>'
        + '  <span class="cs-diag-sol-num">' + (isArabic ? 'سؤال ' : 'Question ') + (i + 1) + ' · ' + escT(q.domain || '') + ' (' + qDiff + ')</span>'
        + '</div>'
        + (figHtml ? '<div class="cs-diag-fig-wrap">' + figHtml + '</div>' : '')
        + '<div class="cs-diag-sol-q">' + formatMath(q.text || q.q || '') + '</div>'
        + '<div class="cs-diag-sol-answers">'
        + '  <div>' + (isArabic ? 'إجابتك: ' : 'Your Answer: ') + '<b class="' + (isCorrect ? 'text-correct' : 'text-incorrect') + '">' + userLetter + ' (' + formatMath(userChoiceText) + ')</b></div>'
        + (!isCorrect ? '<div>' + (isArabic ? 'الإجابة الصحيحة: ' : 'Correct Answer: ') + '<b class="text-correct">' + targetLetter + ' (' + formatMath(targetChoiceText) + ')</b></div>' : '')
        + '</div>'
        + (q.sol ? '<div class="cs-diag-sol-expl"><b>' + (isArabic ? 'الشرح والتوضيح: ' : 'Explanation: ') + '</b>' + formatMath(q.sol) + '</div>' : '')
        + '</div>';
    }).join('');

    overlay.innerHTML = '<div class="cs-diag-card cs-diag-results-card">'
      + '<div class="cs-diag-head">'
      + '  <div class="cs-diag-meta">'
      + '    <span class="cs-diag-track-badge">📊 ' + (isArabic ? 'نتائج التقييم التشخيصي' : 'Diagnostic Results') + '</span>'
      + '    <span class="cs-diag-counter">' + escT(trackLabel) + '</span>'
      + '  </div>'
      + '  <div style="display:flex;align-items:center;gap:10px">'
      + '    <div class="cs-diag-lang-toggle">'
      + '      <button type="button" class="cs-diag-lang-btn' + (!isArabic ? ' active' : '') + '" onclick="window.setDiagReportLang(\'en\')">EN</button>'
      + '      <button type="button" class="cs-diag-lang-btn' + (isArabic ? ' active' : '') + '" onclick="window.setDiagReportLang(\'ar\')">عربي</button>'
      + '    </div>'
      + '    <button type="button" class="cs-diag-close" onclick="window.closeDiagnosticTest()" aria-label="Close diagnostic">✕</button>'
      + '  </div>'
      + '</div>'
      + '<div class="cs-diag-results-body">'
      + '  <div class="cs-diag-score-banner">'
      + '    <div class="cs-diag-score-circle">'
      + '      <span class="cs-diag-score-num">' + catPct + '%</span>'
      + '      <span class="cs-diag-score-sub">' + correct + ' / ' + total + '</span>'
      + '    </div>'
      + '    <div class="cs-diag-score-text">'
      + '      <h3>' + (isArabic
                ? (catPct >= 80 ? 'إتقان ممتاز وتمكن أكاديمي!' : (catPct >= 60 ? 'أساس صلب مع فرص تميز' : 'فرصة تدريبية واعدة للتحسن'))
                : (catPct >= 80 ? 'Exceptional Mastery!' : (catPct >= 60 ? 'Solid Foundation' : 'High Growth Potential'))) + '</h3>'
      + '      <p>' + (isArabic
                ? ('التقدير المتوقع: <strong>' + projScore + '</strong>. ركز على المجالات ذات الأولوية الموضحة أدناه لضمان تحقيق أعلى تصنيف.')
                : ('Projected Target: <strong>' + projScore + '</strong>. Targeting the focus areas below will yield the fastest score elevation.'))
      + '      </p>'
      + '    </div>'
      + '  </div>'
      + '  <div class="cs-diag-section-title">' + (isArabic ? 'تحليل المجالات الدراسية' : 'Domain Breakdown') + '</div>'
      + '  <div class="cs-diag-domains-grid">' + domainBarsHtml + '</div>'
      + '  <div class="cs-diag-section-title">' + (isArabic ? '🗓️ الخطة الدراسية المخصصة المقترحة' : '🗓️ Actionable Study Roadmap') + '</div>'
      + '  <div class="cs-diag-plan-tabs">'
      + '    <button type="button" class="cs-diag-plan-tab' + (planTab === '7day' ? ' active' : '') + '" onclick="window.setDiagPlanTab(\'7day\')">' + (isArabic ? '⚡ خطة 7 أيام مكثفة' : '⚡ 7-Day Intensive Plan') + '</button>'
      + '    <button type="button" class="cs-diag-plan-tab' + (planTab === '30day' ? ' active' : '') + '" onclick="window.setDiagPlanTab(\'30day\')">' + (isArabic ? '📅 خطة 30 يوم شاملة' : '📅 30-Day Mastery Plan') + '</button>'
      + '  </div>'
      + '  <div class="cs-diag-schedule-list">' + planItemsHtml + '</div>'
      + '  <div class="cs-diag-wa-card" style="margin-top:20px">'
      + '    <div class="cs-diag-wa-info">'
      + '      <div class="cs-diag-wa-badge">1:1 Mentorship · الأستاذ محمد عبد الله</div>'
      + '      <h4>' + (isArabic ? 'مناقشة خطتك الدراسية مباشرة مع الأستاذ محمد' : 'Discuss Your Custom Prep Plan with Mr. Mohamed') + '</h4>'
      + '      <p>' + (isArabic
                ? 'هل ترغب في توجيه مخصص لرفع درجتك؟ تواصل عبر واتساب لمراجعة نقاط قوتك وخطة المذاكرة.'
                : 'Have questions about your diagnostic breakdown? Chat with Mr. Mohamed directly on WhatsApp to get tailored study advice and recommendations.')
      + '      </p>'
      + '    </div>'
      + '    <div style="display:flex;gap:10px;flex-wrap:wrap">'
      + '      <a href="' + waUrl + '" target="_blank" rel="noopener noreferrer" class="btn cs-diag-wa-action" onclick="if(window.ClipSATAnalytics)window.ClipSATAnalytics.track(\'whatsapp_click\',{source:\'diagnostic\',track:\'' + state.trackId + '\'})">'
      + '        <span>💬 ' + (isArabic ? 'مراسلة عبر واتساب (+966 59 768 8647)' : 'Chat on WhatsApp (+966 59 768 8647)') + '</span> ↗'
      + '      </a>'
      + '      <button type="button" class="btn cs-diag-nav-btn" onclick="window.printDiagReport()" style="display:inline-flex;align-items:center;gap:6px">'
      + '        <span>📄 ' + (isArabic ? 'طباعة / حفظ التقرير (PDF)' : 'Print / Save PDF') + '</span>'
      + '      </button>'
      + '    </div>'
      + '  </div>'
      + '  <div class="cs-diag-solutions-wrap">'
      + '    <button type="button" class="cs-diag-toggle-sol-btn" onclick="document.getElementById(\'cs-diag-sols\').classList.toggle(\'show\')">' + (isArabic ? '📖 مراجعة جميع الأسئلة والحلول بالتفصيل ▾' : '📖 Review All Questions &amp; Worked Solutions ▾') + '</button>'
      + '    <div id="cs-diag-sols" class="cs-diag-solutions-list">' + solutionsHtml + '</div>'
      + '  </div>'
      + '</div>'
      + '<div class="cs-diag-footer">'
      + '  <button type="button" class="btn cs-diag-retake-btn" onclick="window.openDiagnosticTest(\'' + state.trackId + '\')">↺ ' + (isArabic ? 'إعادة التقييم' : 'Retake Diagnostic') + '</button>'
      + '  <div class="cs-diag-footer-spacer"></div>'
      + '  <button type="button" class="cs-diag-nav-btn" onclick="window.closeDiagnosticTest()">' + (isArabic ? 'إغلاق' : 'Close') + '</button>'
      + '</div>'
      + '</div>';

    typesetMath(overlay);
  }

  function typesetMath(el) {
    if (!el) return;
    var delimiters = [
      { left: '$$', right: '$$', display: true },
      { left: '\\[', right: '\\]', display: true },
      { left: '\\(', right: '\\)', display: false }
    ];

    function _run() {
      try {
        if (window.renderMathInElement && typeof window.renderMathInElement === 'function') {
          window.renderMathInElement(el, { delimiters: delimiters, throwOnError: false });
        }
        if (window.MathJax && typeof window.MathJax.typesetPromise === 'function') {
          window.MathJax.typesetPromise([el]).catch(function() {});
        }
      } catch (e) {}
    }

    _run();
    setTimeout(_run, 60);
    setTimeout(_run, 350);
  }

  // ── Public Global Diagnostic Methods ─────────────────────────────────
  window.openDiagnosticTest = function(trackId) {
    trackId = trackId || window.CLIPSAT_TRACK || 'sat';
    var overlay = getOrCreateModal();
    overlay.classList.add('show');
    overlay.innerHTML = '<div class="cs-diag-card cs-diag-loading">'
      + '<div class="cs-diag-spinner"></div>'
      + '<p>Preparing your Computerized Adaptive (CAT) ' + escT(TRACK_NAMES[trackId] || trackId) + ' diagnostic…</p>'
      + '</div>';

    var loadPromise = (window.CS_loadTrackBank && typeof window.CS_loadTrackBank === 'function')
      ? window.CS_loadTrackBank(trackId)
      : Promise.resolve();

    loadPromise.then(function() {
      var bank = window.fullExamBank && window.fullExamBank[trackId];
      var rawPool = (bank && bank.pool) ? bank.pool : [];
      if (!rawPool.length) {
        overlay.innerHTML = '<div class="cs-diag-card">'
          + '<div class="cs-diag-head"><b>Diagnostic Assessment</b><button type="button" class="cs-diag-close" onclick="window.closeDiagnosticTest()">✕</button></div>'
          + '<div class="cs-diag-body"><p class="tv-empty">Questions for this track are being synchronized. Please check back shortly!</p></div>'
          + '</div>';
        return;
      }

      // Filter and group by domain and difficulty
      var byDomainAndDiff = {};
      var validPool = [];
      for (var i = 0; i < rawPool.length; i++) {
        var item = rawPool[i];
        var d = item.domain || 'Core Mathematics';
        if (SKIP_DIAG_DOMAINS.test(d)) continue;
        var diff = normalizeDiff(item);
        if (!byDomainAndDiff[d]) {
          byDomainAndDiff[d] = { easy: [], medium: [], hard: [] };
        }
        byDomainAndDiff[d][diff].push(item);
        validPool.push(item);
      }

      var allDomains = Object.keys(byDomainAndDiff);
      allDomains.forEach(function(d) {
        byDomainAndDiff[d].easy = shuffle(byDomainAndDiff[d].easy);
        byDomainAndDiff[d].medium = shuffle(byDomainAndDiff[d].medium);
        byDomainAndDiff[d].hard = shuffle(byDomainAndDiff[d].hard);
      });

      _diagState = {
        trackId: trackId,
        catMode: true,
        targetCount: 12,
        currentIdx: 0,
        currentDifficulty: 'medium', // Start at Medium!
        pool: validPool,
        byDomainAndDiff: byDomainAndDiff,
        domains: allDomains,
        questions: [],
        userAnswers: {},
        answersCorrect: {},
        difficultyHistory: [],
        usedIndices: {},
        lang: 'en',
        planTab: '7day'
      };

      pickNextAdaptiveQuestion(_diagState);
      renderQuestion();
    }).catch(function(err) {
      overlay.innerHTML = '<div class="cs-diag-card">'
        + '<div class="cs-diag-head"><b>Error</b><button type="button" class="cs-diag-close" onclick="window.closeDiagnosticTest()">✕</button></div>'
        + '<div class="cs-diag-body"><p style="color:#dc2626">Failed to load question bank: ' + escT(err.message || 'Network error') + '</p></div>'
        + '</div>';
    });
  };

  window.closeDiagnosticTest = function() {
    var overlay = document.getElementById('cs-diagnostic-overlay');
    if (overlay) overlay.classList.remove('show');
  };

  window.selectDiagChoice = function(choiceIdx) {
    if (!_diagState) return;
    _diagState.userAnswers[_diagState.currentIdx] = choiceIdx;
    var overlay = document.getElementById('cs-diagnostic-overlay');
    var btns = overlay ? overlay.querySelectorAll('.cs-diag-choice') : null;
    if (btns && btns.length) {
      for (var bIdx = 0; bIdx < btns.length; bIdx++) {
        if (bIdx === choiceIdx) {
          btns[bIdx].classList.add('selected');
        } else {
          btns[bIdx].classList.remove('selected');
        }
      }
    } else {
      renderQuestion();
    }
  };

  window.nextDiagQuestion = function() {
    if (!_diagState) return;
    var currentQ = _diagState.questions[_diagState.currentIdx];
    var userAns = _diagState.userAnswers[_diagState.currentIdx];
    var targetAns = parseAnswerIndex(currentQ);
    var isCorrect = (userAns !== undefined && userAns === targetAns);
    _diagState.answersCorrect[_diagState.currentIdx] = isCorrect;

    // CAT Step Routing: promote on correct, demote on mistake
    var prevDiff = _diagState.currentDifficulty || 'medium';
    if (isCorrect) {
      _diagState.currentDifficulty = (prevDiff === 'easy' ? 'medium' : 'hard');
    } else {
      _diagState.currentDifficulty = (prevDiff === 'hard' ? 'medium' : 'easy');
    }

    if (_diagState.currentIdx < _diagState.targetCount - 1) {
      _diagState.currentIdx++;
      if (_diagState.questions.length <= _diagState.currentIdx) {
        pickNextAdaptiveQuestion(_diagState);
      }
      renderQuestion();
    } else {
      renderResults();
    }
  };

  window.prevDiagQuestion = function() {
    if (!_diagState) return;
    if (_diagState.currentIdx > 0) {
      _diagState.currentIdx--;
      renderQuestion();
    }
  };

  window.finishDiagnosticTest = function() {
    if (!_diagState) return;
    var currentQ = _diagState.questions[_diagState.currentIdx];
    var userAns = _diagState.userAnswers[_diagState.currentIdx];
    var targetAns = parseAnswerIndex(currentQ);
    _diagState.answersCorrect[_diagState.currentIdx] = (userAns !== undefined && userAns === targetAns);
    renderResults();
  };

  window.setDiagReportLang = function(lang) {
    if (!_diagState) return;
    _diagState.lang = lang;
    renderResults();
  };

  window.setDiagPlanTab = function(tab) {
    if (!_diagState) return;
    _diagState.planTab = tab;
    renderResults();
  };

  window.printDiagReport = function() {
    window.print();
  };

  // Video facade global click handler
  window.playVideoFacade = function(el) {
    if (!el) return;
    var vid = el.getAttribute('data-video-id');
    var label = el.getAttribute('aria-label') || 'Video lesson';
    if (!vid) return;
    el.innerHTML = '<iframe src="https://www.youtube-nocookie.com/embed/' + escT(vid) + '?autoplay=1&rel=0" title="' + escT(label) + '" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
    el.classList.add('cs-video-playing');
    if (window.ClipSATAnalytics) {
      window.ClipSATAnalytics.track('video_play', { video_id: vid });
    }
  };

})();
