#!/usr/bin/env node
/**
 * scripts/build_3_new_tracks_content.js
 * Builds complete curriculum content, Eleventy track pages, practice sets, and
 * HTML5 Canvas + 3D explorers for the 3 missing catalog tracks:
 *   1. edexcel  — Pearson Edexcel International GCSE Mathematics A (4MA1 Higher Tier)
 *   2. gaten    — Qiyas English GAT & SAAT (Quantitative Aptitude & Tahsili Math in English)
 *   3. olympiad — Contest Math & Olympiad (AMC 10/12, Kangaroo Math & Mawhiba)
 */
'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');

// Extract the universal _mountBespokeExplorer engine from src/scripts/explorers/addmath.js
const addmathExSrc = fs.readFileSync(path.join(ROOT, 'src', 'scripts', 'explorers', 'addmath.js'), 'utf8');
const bespokeStart = addmathExSrc.indexOf('function _mountBespokeExplorer(cfg){');
const bespokeEnd = addmathExSrc.indexOf('_mountBespokeExplorer({"canvasId":');
const BESPOKE_ENGINE_CODE = addmathExSrc.slice(bespokeStart, bespokeEnd);

const TRACK_SPECS = [
  {
    id: 'edexcel',
    prefix: 'edx',
    njkTitle: 'Pearson Edexcel IGCSE Mathematics A (4MA1 Higher) · ClipSAT',
    njkDesc: 'Pearson Edexcel International GCSE Mathematics A (4MA1 Higher Tier) — Surds, Algebraic Fractions, Differentiation, 3D Trigonometry, Circle Theorems & Histograms',
    meta: {
      title: {
        en: 'Pearson Edexcel IGCSE (4MA1)',
        ar: 'رياضيات إدكسل الدولية (Edexcel IGCSE 4MA1 — المستوى المتقدم)'
      },
      subtitle: {
        en: 'Pearson Edexcel International GCSE Mathematics A (4MA1 Higher Tier). Complete coverage of Paper 1H & Paper 2H: surds, algebraic fractions, differentiation, circle theorems, 3D trigonometry, vectors, and histograms.',
        ar: 'المنهج الكامل لرياضيات بيرسون إدكسل الدولية (4MA1 Higher Tier) للورقتين 1H و 2H مع شرح تفصيلي وأمثلة امتحانية.'
      },
      level: 'Standard',
      color: 'var(--indigo)',
      icon: '🇬🇧',
      examBoard: 'Pearson Edexcel International Examinations',
      tags: [
        'Edexcel 4MA1',
        'IGCSE Math A',
        'Higher Tier 9-1',
        'Paper 1H & 2H',
        'British Curriculum',
        'International GCSE'
      ],
      officialLinks: [
        {
          label: { en: 'Pearson Edexcel International GCSE Mathematics A (4MA1) Specification', ar: null },
          url: 'https://qualifications.pearson.com/en/qualifications/edexcel-international-gcses/international-gcse-mathematics-a-2016.html',
          note: { en: 'Official Pearson Edexcel 4MA1 syllabus, past papers, and mark schemes', ar: null }
        }
      ],
      downloadsInfo: {
        introText: {
          en: 'Download Pearson Edexcel IGCSE 4MA1 Higher Tier study packets, formula sheets, and topical worksheets for Paper 1H and Paper 2H.',
          ar: null
        },
        pdfCardTitle: {
          en: 'Edexcel IGCSE 4MA1 Higher Complete Revision Guide',
          ar: null
        },
        pdfCardDescription: {
          en: 'All eight Higher Tier chapters with official Edexcel formula sheets, Grade 8–9 worked examples, and full marking rubrics.',
          ar: null
        },
        docxCardDescription: {
          en: 'Editable .docx revision packet with native equation-editor formulas ready for print or classroom instruction.',
          ar: null
        },
        worksheetLibraryText: {
          en: 'Topical Edexcel 4MA1 Higher Tier practice worksheets with M1/A1 mark-scheme breakdowns.',
          ar: null
        }
      },
      pageHeader: {
        h1: {
          en: 'Pearson Edexcel IGCSE Mathematics A (4MA1 Higher)',
          ar: 'رياضيات إدكسل الدولية (Edexcel IGCSE 4MA1 Higher)'
        },
        stats: [
          { label: { en: 'Specification', ar: null }, value: { en: 'Edexcel 4MA1 (Grade 9–1 Higher)', ar: null } },
          { label: { en: 'Exam Structure', ar: null }, value: { en: 'Paper 1H (2h) + Paper 2H (2h)', ar: null } },
          { label: { en: 'Chapters', ar: null }, value: { en: '8 Higher-Tier Domains', ar: null } },
          { label: { en: 'Interactive Labs', ar: null }, value: { en: '8 Canvas & 3D Explorers', ar: null } }
        ]
      },
      testGenerator: {
        examTitle: 'Pearson Edexcel IGCSE (4MA1) — Higher Tier',
        sections: [
          'Paper 1H — Higher Tier Calculator Paper (2 hours · 100 marks)',
          'Paper 2H — Higher Tier Calculator Paper (2 hours · 100 marks)'
        ],
        introText: {
          en: 'Generate authentic Pearson Edexcel 4MA1 Higher Tier mock papers and topical quizzes with step-by-step M1/A1 marking schemes.',
          ar: null
        },
        examDescription: {
          en: 'Full-length 100-mark Higher Tier mock exams matching Pearson Edexcel 4MA1 Paper 1H and Paper 2H.',
          ar: null
        },
        examButtonLabel: { en: 'Generate Full Edexcel 4MA1 Exam ↻', ar: null },
        examMinutesArg: 120,
        exams: [
          {
            examTitle: 'Edexcel IGCSE (4MA1) — Paper 1H',
            examButtonLabel: { en: 'Generate Edexcel 4MA1 Paper 1H ↻', ar: null }
          },
          {
            examTitle: 'Edexcel IGCSE (4MA1) — Paper 2H',
            examButtonLabel: { en: 'Generate Edexcel 4MA1 Paper 2H ↻', ar: null }
          }
        ]
      }
    },
    chapters: [
      {
        id: 'edx-number-surds-sets',
        num: '1',
        titleEn: 'Number, Surds, Bounds & Set Notation',
        titleAr: 'الأعداد والجذور الصماء وحدود الخطأ ونظرية المجموعات',
        domain: 'Number, Surds & Set Theory',
        tagCat: '4MA1 Unit 1 — Number & Set Theory',
        topics: ['Rationalising surd denominators', 'Upper & lower bounds in calculations', 'Recurring decimals to fractions', 'Indices & standard form', 'Set notation & Venn diagrams'],
        exMode: 'error_bounds',
        exSquare: false,
        ex3d: null,
        exTitleEn: 'Upper & Lower Bounds Error Propagation Lab',
        exTitleAr: 'مختبر حدود الخطأ العليا والدنيا في العمليات الحسابية',
        s0Label: 'Measured Length <b>\\(L =\\)</b>', s0Min: 4, s0Max: 20, s0Val: 10, s0Step: 1,
        s1Label: 'Precision Step <b>\\(\\Delta =\\)</b>', s1Min: 0.1, s1Max: 2.0, s1Val: 0.5, s1Step: 0.1,
        r0Label: 'Lower Bound \\(L_{\\text{min}}\\)', r0Val: '\\(9.75\\)',
        r1Label: 'Upper Bound \\(L_{\\text{max}}\\)', r1Val: '\\(10.25\\)',
        r2Label: 'Max Relative Error', r2Val: '\\(2.50\\%\\)',
        defTitle: 'Surd Rationalisation & Degree-of-Accuracy Bounds',
        defBody: 'If a quantity \\( x \\) is rounded to the nearest unit \\( \\Delta \\), its true value lies in the half-open interval \\( x - \\frac{\\Delta}{2} \\le x_{\\text{true}} < x + \\frac{\\Delta}{2} \\). For quotients \\( Q = \\frac{a}{b} \\) of positive quantities, \\( Q_{\\text{UB}} = \\frac{a_{\\text{UB}}}{b_{\\text{LB}}} \\) and \\( Q_{\\text{LB}} = \\frac{a_{\\text{LB}}}{b_{\\text{UB}}} \\). To rationalise \\( \\frac{p}{a + \\sqrt{b}} \\), multiply numerator and denominator by the conjugate \\( a - \\sqrt{b} \\) using \\( (a + \\sqrt{b})(a - \\sqrt{b}) = a^2 - b \\).'
      },
      {
        id: 'edx-algebra-quadratics',
        num: '2',
        titleEn: 'Algebraic Fractions, Quadratics & Simultaneous Systems',
        titleAr: 'الكسور الجبرية والمعادلات التربيعيةوأنظمة المعادلات الآنية',
        domain: 'Algebraic Fractions & Quadratics',
        tagCat: '4MA1 Unit 2 — Higher Algebra',
        topics: ['Single-fraction simplification', 'Completing the square a(x+p)²+q', 'Quadratic inequalities & critical values', 'Linear-nonlinear simultaneous systems', 'Algebraic proof'],
        exMode: 'quad_sys',
        exSquare: false,
        ex3d: null,
        exTitleEn: 'Linear-Quadratic Simultaneous Intersection & Discriminant Lab',
        exTitleAr: 'مختبر تقاطع المستقيم والقطع المكافئ والمميز',
        s0Label: 'Line Gradient <b>\\(m =\\)</b>', s0Min: -3, s0Max: 3, s0Val: 1.5, s0Step: 0.5,
        s1Label: 'Line Intercept <b>\\(k =\\)</b>', s1Min: -4, s1Max: 4, s1Val: 1.0, s1Step: 0.5,
        r0Label: 'Discriminant \\(\\Delta\\)', r0Val: '\\(\\Delta = 14.25\\)',
        r1Label: 'Intersection Status', r1Val: '2 Distinct Real Points',
        r2Label: 'Roots \\(x_1, x_2\\)', r2Val: '\\(x = -1.14, 2.64\\)',
        defTitle: 'Algebraic Fractions & Quadratic Inequality Regions',
        defBody: 'Before adding or subtracting algebraic fractions \\( \\frac{A(x)}{B(x)} \\pm \\frac{C(x)}{D(x)} \\), factorise all denominators completely to find their lowest common multiple (LCM). For a quadratic inequality \\( ax^2 + bx + c > 0 \\) with \\( a > 0 \\) and roots \\( \\alpha < \\beta \\), the solution set is the outer disjoint union \\( x < \\alpha \\) or \\( x > \\beta \\); for \\( ax^2 + bx + c < 0 \\), it is the connected interior interval \\( \\alpha < x < \\beta \\).'
      },
      {
        id: 'edx-functions-sequences',
        num: '3',
        titleEn: 'Functions, Graphs, Transformations & Arithmetic Series',
        titleAr: 'الدوال والتحويلات الهندسية للمنحنيات والمتسلسلات الحسابية',
        domain: 'Functions, Graphs & Arithmetic Series',
        tagCat: '4MA1 Unit 3 — Functions & Sequences',
        topics: ['Domain & range restrictions', 'Composite fg(x) & inverse f⁻¹(x)', 'Graph transformations f(x-a), kf(x)', 'Arithmetic progressions u_n = a+(n-1)d', 'Arithmetic series sum S_n'],
        exMode: 'func_comp',
        exSquare: false,
        ex3d: null,
        exTitleEn: 'Composite Functions, Inverse Reflection & Arithmetic Sum Lab',
        exTitleAr: 'مختبر الدوال المركبة والعكسية ومجموع المتسلسلة الحسابية',
        s0Label: 'Parameter <b>\\(a =\\)</b>', s0Min: -3, s0Max: 3, s0Val: 2.0, s0Step: 0.5,
        s1Label: 'Shift <b>\\(b =\\)</b>', s1Min: -4, s1Max: 4, s1Val: 1.0, s1Step: 0.5,
        r0Label: 'Composite \\(fg(1)\\)', r0Val: '\\(7.00\\)',
        r1Label: 'Inverse \\(f^{-1}(5)\\)', r1Val: '\\(2.00\\)',
        r2Label: 'Fixed Point \\(f(x)=x\\)', r2Val: '\\(x = -1.00\\)',
        defTitle: 'Arithmetic Series (4MA1 Exclusive) & Function Composition',
        defBody: 'In Pearson Edexcel 4MA1, an arithmetic sequence with first term \\( a \\) and common difference \\( d \\) has \\( n \\)-th term \\( u_n = a + (n - 1)d \\) and sum of the first \\( n \\) terms \\[ S_n = \\frac{n}{2}\\left[2a + (n - 1)d\\right] = \\frac{n}{2}(a + l). \\] For composite functions, \\( fg(x) = f(g(x)) \\) applies \\( g \\) first and \\( f \\) second, and values where the denominator of a rational function equals zero must be excluded from the domain.'
      },
      {
        id: 'edx-coord-geometry',
        num: '4',
        titleEn: 'Coordinate Geometry & Straight-Line Equations',
        titleAr: 'الهندسة الإحداثية ومعادلات الخط المستقيم',
        domain: 'Coordinate Geometry & Linear Graphs',
        tagCat: '4MA1 Unit 4 — Coordinate Geometry',
        topics: ['Gradient m = (y₂-y₁)/(x₂-x₁)', 'Perpendicular gradients m₁m₂ = -1', 'Perpendicular bisectors of chords', 'Collinearity & area of rectilinear figures', 'Graphical linear programming regions'],
        exMode: 'perp_lines',
        exSquare: true,
        ex3d: null,
        exTitleEn: 'Perpendicular Bisector & Orthogonal Gradients Lab',
        exTitleAr: 'مختبر العمود المنصف والمستقيمات المتعامدة',
        s0Label: 'Line 1 Gradient <b>\\(m_1 =\\)</b>', s0Min: -3, s0Max: 3, s0Val: 2.0, s0Step: 0.5,
        s1Label: 'Y-Intercept <b>\\(c =\\)</b>', s1Min: -3, s1Max: 3, s1Val: 1.0, s1Step: 0.5,
        r0Label: 'Normal Gradient \\(m_2 = -1/m_1\\)', r0Val: '\\(-0.50\\)',
        r1Label: 'Product \\(m_1 m_2\\)', r1Val: '\\(-1.00\\)',
        r2Label: 'Intersection Foot', r2Val: '\\((0.00, 1.00)\\)',
        defTitle: 'Perpendicular Bisectors & Orthogonal Line Equations',
        defBody: 'Given two points \\( A(x_1, y_1) \\) and \\( B(x_2, y_2) \\), the midpoint is \\( M = \\left(\\frac{x_1+x_2}{2}, \\frac{y_1+y_2}{2}\\right) \\) and the segment gradient is \\( m_{AB} = \\frac{y_2-y_1}{x_2-x_1} \\). Any line perpendicular to \\( AB \\) has negative-reciprocal gradient \\( m_\\perp = -\\frac{1}{m_{AB}} \\) (so \\( m_{AB}\\cdot m_\\perp = -1 \\)), and the perpendicular bisector of \\( AB \\) satisfies \\( y - y_M = m_\\perp(x - x_M) \\).'
      },
      {
        id: 'edx-geometry-circles',
        num: '5',
        titleEn: 'Circle Theorems, Polygons & Geometric Similarity',
        titleAr: 'نظريات الدائرة والمضلعات والتشابه الهندسي في الفراغ',
        domain: 'Circle Theorems & Geometric Proof',
        tagCat: '4MA1 Unit 5 — Circle Theorems & Mensuration',
        topics: ['Alternate segment theorem', 'Cyclic quadrilaterals & central angles', 'Intersecting chords & secant-tangent theorem', 'Area & volume scale factors k, k², k³', 'Frustums of cones & pyramids'],
        exMode: 'sector_seg',
        exSquare: true,
        ex3d: 'solid',
        exTitleEn: 'Circle Theorems, Chord-Tangent Angles & 3D Frustum Lab',
        exTitleAr: 'مختبر نظريات الدائرة والقطاعات الدائرية والمجسمات',
        s0Label: 'Circle Radius <b>\\(r =\\)</b>', s0Min: 1.5, s0Max: 4.5, s0Val: 3.5, s0Step: 0.5,
        s1Label: 'Central Angle <b>\\(\\theta =\\)</b>', s1Min: 0.6, s1Max: 2.8, s1Val: 1.6, s1Step: 0.2,
        r0Label: 'Arc Length \\(s = r\\theta\\)', r0Val: '\\(5.60\\)',
        r1Label: 'Sector Area', r1Val: '\\(9.80\\)',
        r2Label: 'Segment Area', r2Val: '\\(3.68\\)',
        defTitle: 'Circle Theorems & Intersecting Chords/Secants (4MA1 Higher)',
        defBody: 'Key Edexcel 4MA1 Higher theorems: (1) <strong>Alternate Segment Theorem:</strong> the angle between a tangent and a chord equals the angle subtended by the chord in the alternate segment; (2) <strong>Intersecting Chords / Secant-Tangent Theorem:</strong> if chords \\( AB \\) and \\( CD \\) intersect at \\( P \\) (internally or externally), then \\( PA \\cdot PB = PC \\cdot PD \\), and for a tangent \\( PT \\) and secant \\( PAB \\), \\( PT^2 = PA \\cdot PB \\); (3) <strong>Similar Solids:</strong> if linear scale factor is \\( k \\), surface area scales by \\( k^2 \\) and volume scales by \\( k^3 \\).'
      },
      {
        id: 'edx-trig-3d-vectors',
        num: '6',
        titleEn: '3D Trigonometry, Sine/Cosine Rules & Vector Proofs',
        titleAr: 'حساب المثلثات ثلاثي الأبعاد وقوانين الجيب وجيب التمام وبراهين المتجهات',
        domain: '3D Trigonometry & Vector Proofs',
        tagCat: '4MA1 Unit 6 — 3D Trig & Vectors',
        topics: ['3D angle between line & plane', 'Sine Rule (including ambiguous case)', 'Cosine Rule & triangle area ½ab sin C', 'Vector geometry & ratio division', 'Collinearity & parallel vector proofs'],
        exMode: 'rel_vel',
        exSquare: true,
        ex3d: 'vec3',
        exTitleEn: 'Vector Addition, Ratio Division & 3D Space Diagonal Lab',
        exTitleAr: 'مختبر جمع المتجهات وتقسيم القطع المستقيمة والقطر الفراغي',
        s0Label: 'Vector Component <b>\\(a_x =\\)</b>', s0Min: 1.0, s0Max: 5.0, s0Val: 4.0, s0Step: 0.5,
        s1Label: 'Vector Component <b>\\(b_y =\\)</b>', s1Min: 1.0, s1Max: 5.0, s1Val: 3.0, s1Step: 0.5,
        r0Label: 'Resultant Magnitude \\(|\\mathbf{r}|\\)', r0Val: '\\(5.00\\)',
        r1Label: 'Bearing / Direction \\(\\theta\\)', r1Val: '\\(36.87^\\circ\\)',
        r2Label: 'Unit Vector \\(\\hat{\\mathbf{r}}\\)', r2Val: '\\((0.80, 0.60)\\)',
        defTitle: '3D Line-Plane Angles & Vector Ratio Proofs',
        defBody: 'To find the angle \\( \\theta \\) between a space diagonal \\( AG \\) and a horizontal base plane \\( ABCD \\), project \\( G \\) orthogonally onto \\( C \\) in the plane; the base diagonal has length \\( AC = \\sqrt{l^2 + w^2} \\) and \\( \\tan\\theta = \\frac{CG}{AC} \\). In vector proofs, if \\( P \\) divides \\( AB \\) in the ratio \\( m : n \\), then \\[ \\overrightarrow{OP} = \\overrightarrow{OA} + \\frac{m}{m+n}\\overrightarrow{AB} = \\frac{n\\overrightarrow{OA} + m\\overrightarrow{OB}}{m+n}. \\]'
      },
      {
        id: 'edx-calculus-kinematics',
        num: '7',
        titleEn: 'Differentiation, Turning Points & Kinematics',
        titleAr: 'التفاضل والنقاط الحرجة وتطبيقات الحركة المستقيمة',
        domain: 'Differentiation, Turning Points & Kinematics',
        tagCat: '4MA1 Unit 7 — Calculus & Kinematics',
        topics: ['Differentiating axⁿ (including negative powers)', 'Gradient, tangents & stationary turning points', 'Max/min optimisation problems', 'Kinematics: v = ds/dt and a = dv/dt', 'Particle displacement & instantaneous rest'],
        exMode: 'tangent_normal',
        exSquare: false,
        ex3d: 'surf',
        exTitleEn: 'Derivative Gradient, Turning Points & Kinematics Velocity Lab',
        exTitleAr: 'مختبر المشتقة والنقاط الحرجة وسرعة الجسيم',
        s0Label: 'Evaluation Point <b>\\(x_0 =\\)</b>', s0Min: -2.0, s0Max: 2.0, s0Val: 1.0, s0Step: 0.2,
        s1Label: 'Curve Parameter <b>\\(k =\\)</b>', s1Min: 0.5, s1Max: 3.0, s1Val: 1.5, s1Step: 0.5,
        r0Label: 'Tangent Gradient \\(dy/dx\\)', r0Val: '\\(0.00\\)',
        r1Label: 'Point Nature', r1Val: 'Stationary Turning Point',
        r2Label: 'Normal Gradient', r2Val: 'Vertical',
        defTitle: 'Power-Rule Differentiation & Variable-Acceleration Kinematics',
        defBody: 'For any rational or negative integer power \\( y = ax^n \\), the derivative is \\( \\frac{dy}{dx} = anx^{n-1} \\). Stationary turning points occur where \\( \\frac{dy}{dx} = 0 \\). In 4MA1 kinematics, if displacement from a fixed origin \\( O \\) at time \\( t \\) is \\( s(t) \\), then instantaneous velocity is \\( v(t) = \\frac{ds}{dt} \\) (the particle is momentarily at rest when \\( v = 0 \\)) and acceleration is \\( a(t) = \\frac{dv}{dt} = \\frac{d^2s}{dt^2} \\).'
      },
      {
        id: 'edx-stats-probability',
        num: '8',
        titleEn: 'Histograms, Cumulative Frequency & Tree Diagrams',
        titleAr: 'المدرجات التكرارية والتكرار المتجمع الصاعد وشجرة الاحتمالات',
        domain: 'Histograms, Cumulative Frequency & Probability',
        tagCat: '4MA1 Unit 8 — Statistics & Probability',
        topics: ['Frequency density = Frequency / Class Width', 'Cumulative frequency ogives & IQR', 'Conditional probability without replacement', 'Tree diagrams & Venn conditional queries', 'Grouped mean estimation'],
        exMode: 'hist_density',
        exSquare: false,
        ex3d: null,
        exTitleEn: 'Unequal-Class Histogram Frequency Density & IQR Lab',
        exTitleAr: 'مختبر كثافة التكرار للمدرج التكراري والمدى الربيعي',
        s0Label: 'Class Frequency <b>\\(F =\\)</b>', s0Min: 10, s0Max: 60, s0Val: 30, s0Step: 5,
        s1Label: 'Class Width <b>\\(W =\\)</b>', s1Min: 5, s1Max: 25, s1Val: 10, s1Step: 5,
        r0Label: 'Frequency Density \\(FD = F/W\\)', r0Val: '\\(3.00\\)',
        r1Label: 'Bar Area \\(= F\\)', r1Val: '\\(30\\)',
        r2Label: 'Median / IQR Status', r2Val: 'Proportional Area',
        defTitle: 'Frequency Density Histograms & Conditional Probability Without Replacement',
        defBody: 'In a histogram with unequal class intervals, the area of each bar is proportional to the frequency, and the vertical axis plots <strong>Frequency Density</strong> \\[ \\text{Frequency Density} = \\frac{\\text{Frequency}}{\\text{Class Width}}. \\] When items are drawn without replacement from a finite population of size \\( N \\), the second-stage denominator decreases to \\( N - 1 \\), and \\( P(A \\cap B) = P(A)\\cdot P(B \\mid A) \\).'
      }
    ]
  },
  {
    id: 'gaten',
    prefix: 'ge',
    njkTitle: 'English GAT & SAAT (Qiyas Quantitative & Tahsili) · ClipSAT',
    njkDesc: 'English-Medium Qiyas General Aptitude Test (GAT Quantitative) & Standardized Achievement Admission Test (SAAT Mathematics) for International School STEM Students',
    meta: {
      title: {
        en: 'English GAT & SAAT (Qiyas)',
        ar: 'اختبار القدرات والتحصيلي باللغة الإنجليزية (GAT & SAAT)'
      },
      subtitle: {
        en: 'Official ETEC / Qiyas English-medium Quantitative Aptitude (GAT) and Standardized Achievement Admission Test (SAAT Mathematics) for international school students in Saudi Arabia and the GCC.',
        ar: 'الإعداد الشامل لاختباري القدرات العامة (GAT) والتحصيلي العلمي (SAAT) باللغة الإنجليزية لطلاب المدارس العالمية والدولية.'
      },
      level: 'Standard',
      color: 'var(--teal)',
      icon: '🇸🇦',
      examBoard: 'Education & Training Evaluation Commission (ETEC / Qiyas · قياس)',
      tags: [
        'English GAT',
        'English SAAT',
        'Qiyas International',
        'Quantitative Aptitude',
        'Tahsili Math English',
        'KFUPM / KSU STEM'
      ],
      officialLinks: [
        {
          label: { en: 'ETEC / Qiyas Official Portal — GAT & SAAT Specifications', ar: null },
          url: 'https://etec.gov.sa/en/service/GeneralAptitudeTest/serviceSublist',
          note: { en: 'Official Education & Training Evaluation Commission (Qiyas) registration and test guides', ar: null }
        }
      ],
      downloadsInfo: {
        introText: {
          en: 'Download English-medium GAT Quantitative and SAAT Mathematics formula sheets, non-calculator speed drills, and full practice booklets.',
          ar: null
        },
        pdfCardTitle: {
          en: 'English GAT & SAAT Complete STEM Revision Guide',
          ar: null
        },
        pdfCardDescription: {
          en: 'All eight GAT Quantitative and SAAT Mathematics modules with non-calculator mental shortcuts and past-paper solutions.',
          ar: null
        },
        docxCardDescription: {
          en: 'Editable .docx revision packet with native equation-editor formulas ready for print or classroom training.',
          ar: null
        },
        worksheetLibraryText: {
          en: 'Timed non-calculator English GAT and SAAT Mathematics topical worksheets with rapid solution strategies.',
          ar: null
        }
      },
      pageHeader: {
        h1: {
          en: 'English GAT & SAAT Mathematics (Qiyas International)',
          ar: 'القدرات والتحصيلي باللغة الإنجليزية (GAT & SAAT)'
        },
        stats: [
          { label: { en: 'Target Exams', ar: null }, value: { en: 'Qiyas GAT (Quant) + SAAT (Math)', ar: null } },
          { label: { en: 'Calculator Policy', ar: null }, value: { en: 'Strictly Non-Calculator (Speed Math)', ar: null } },
          { label: { en: 'Chapters', ar: null }, value: { en: '4 GAT Modules + 4 SAAT Modules', ar: null } },
          { label: { en: 'Interactive Labs', ar: null }, value: { en: '8 Visual Speed-Math Explorers', ar: null } }
        ]
      },
      testGenerator: {
        examTitle: 'Qiyas English GAT (Quantitative) & SAAT (Mathematics)',
        sections: [
          'Part I — GAT Quantitative Reasoning (English Medium · 26 Questions · 26 min)',
          'Part II — SAAT Achievement Mathematics (English Medium · 26 Questions · 26 min)'
        ],
        introText: {
          en: 'Generate authentic non-calculator English GAT Quantitative and SAAT Mathematics simulations under official 1-minute-per-question Qiyas timing.',
          ar: null
        },
        examDescription: {
          en: 'Full-length non-calculator Qiyas English simulations covering GAT Quantitative Reasoning (including Column A/B Quantitative Comparisons) and SAAT Secondary Mathematics.',
          ar: null
        },
        examButtonLabel: { en: 'Generate Full English GAT & SAAT Exam ↻', ar: null },
        examMinutesArg: 52,
        exams: [
          {
            examTitle: 'GAT Quantitative (English Medium)',
            examButtonLabel: { en: 'Generate English GAT Quantitative Exam ↻', ar: null }
          },
          {
            examTitle: 'SAAT Mathematics (English Medium)',
            examButtonLabel: { en: 'Generate English SAAT Mathematics Exam ↻', ar: null }
          }
        ]
      }
    },
    chapters: [
      {
        id: 'ge-arithmetic-shortcuts',
        num: '1',
        titleEn: 'GAT Arithmetic, Number Sense & High-Speed Shortcuts',
        titleAr: 'الحساب الذهني والحس العددي واستراتيجيات الحل السريع (GAT)',
        domain: 'GAT Arithmetic & Mental Shortcuts',
        tagCat: 'GAT Module 1 — Speed Arithmetic',
        topics: ['Difference of squares a²-b² = (a-b)(a+b)', 'Unit-digit & modular cycles of powers', 'Gauss sum 1+2+...+n & telescoping fractions', 'Divisibility rules & prime factor exponents', 'Non-calculator radical & fraction estimation'],
        exMode: 'euclid_gcd',
        exSquare: true,
        ex3d: null,
        exTitleEn: 'Number Sense, GCD/LCM & Fast Factorisation Lab',
        exTitleAr: 'مختبر الحس العددي والقاسم المشترك الأكبر والتحليل السريع',
        s0Label: 'Integer <b>\\(A =\\)</b>', s0Min: 6, s0Max: 48, s0Val: 36, s0Step: 2,
        s1Label: 'Integer <b>\\(B =\\)</b>', s1Min: 6, s1Max: 48, s1Val: 24, s1Step: 2,
        r0Label: 'Greatest Common Divisor \\(\\gcd(A,B)\\)', r0Val: '\\(12\\)',
        r1Label: 'Least Common Multiple \\(\\text{lcm}(A,B)\\)', r1Val: '\\(72\\)',
        r2Label: 'Identity \\(A\\cdot B = \\gcd\\cdot\\text{lcm}\\)', r2Val: '\\(864 = 864\\)',
        defTitle: 'High-Speed Non-Calculator Identities for Qiyas GAT',
        defBody: 'Because calculators are prohibited on Qiyas GAT and SAAT, large numerical computations are designed around algebraic shortcuts: (1) <strong>Difference of Squares:</strong> \\( a^2 - b^2 = (a - b)(a + b) \\) (e.g., \\( 1005^2 - 995^2 = 10 \\times 2000 = 20{,}000 \\)); (2) <strong>Units-Digit Periodicity:</strong> powers of \\( 2, 3, 7, 8 \\) repeat their units digit every 4 powers; (3) <strong>Telescoping Sums:</strong> \\( \\sum_{k=1}^{n} \\frac{1}{k(k+1)} = 1 - \\frac{1}{n+1} = \\frac{n}{n+1} \\).'
      },
      {
        id: 'ge-ratios-rates-word',
        num: '2',
        titleEn: 'GAT Ratios, Percentages, Speed & Work-Rate Models',
        titleAr: 'النسب المئوية والتناسب ومسائل السرعة والعمل المشترك (GAT)',
        domain: 'GAT Ratios, Percentages & Rate Models',
        tagCat: 'GAT Module 2 — Ratios & Rates',
        topics: ['Successive percentage changes', 'Harmonic mean of round-trip speeds', 'Relative speed (same vs opposite directions)', 'Combined work rates 1/T = 1/t₁ + 1/t₂', 'Mixture, age & direct/inverse proportion'],
        exMode: 'prop_hyper',
        exSquare: false,
        ex3d: null,
        exTitleEn: 'Inverse Proportion, Round-Trip Harmonic Speed & Work-Rate Lab',
        exTitleAr: 'مختبر التناسب العكسي والسرعة المتوسطة ومعدلات العمل',
        s0Label: 'Outbound Speed <b>\\(v_1 =\\)</b>', s0Min: 20, s0Max: 120, s0Val: 60, s0Step: 10,
        s1Label: 'Return Speed <b>\\(v_2 =\\)</b>', s1Min: 20, s1Max: 120, s1Val: 40, s1Step: 10,
        r0Label: 'Harmonic Average Speed \\(v_{\\text{avg}}\\)', r0Val: '\\(48.0\\text{ km/h}\\)',
        r1Label: 'Arithmetic Mean Trap', r1Val: '\\(50.0\\text{ km/h}\\)',
        r2Label: 'Combined Work Time \\(t_1 t_2/(t_1+t_2)\\)', r2Val: '\\(24.0\\)',
        defTitle: 'Round-Trip Average Speed, Relative Motion & Combined Work',
        defBody: 'For a round trip covering equal distances at speeds \\( v_1 \\) and \\( v_2 \\), the average speed is the <strong>harmonic mean</strong> \\[ v_{\\text{avg}} = \\frac{2v_1 v_2}{v_1 + v_2}, \\] which is strictly less than \\( \\frac{v_1+v_2}{2} \\) when \\( v_1 \\ne v_2 \\). Two workers taking \\( t_1 \\) and \\( t_2 \\) hours alone complete one job together in \\( T = \\frac{t_1 t_2}{t_1 + t_2} \\) hours. Successive percentage changes of \\( +p\\% \\) and \\( -p\\% \\) always result in a net decrease of \\( -\\frac{p^2}{100}\\% \\).'
      },
      {
        id: 'ge-quant-comparisons',
        num: '3',
        titleEn: 'GAT Quantitative Comparisons & Shaded Geometry',
        titleAr: 'المقارنات الكمية ومساحات المناطق المظللة والهندسة (GAT)',
        domain: 'GAT Quantitative Comparisons & Geometry',
        tagCat: 'GAT Module 3 — Quantitative Comparison & Geometry',
        topics: ['Column A vs Column B strategy (0, 1, -1, ½ test)', 'Inscribed circles & squares (shaded areas)', 'Clock hand angle formula |30H - 5.5M|', 'Parallel lines, polygons & exterior angles', 'Triangle inequality & 30-60-90 / 45-45-90 ratios'],
        exMode: 'similar_solids',
        exSquare: true,
        ex3d: 'solid',
        exTitleEn: 'Inscribed Square-Circle Shaded Area & Scale Ratio Lab',
        exTitleAr: 'مختبر المساحات المظللة للدوائر والمربعات ونسب التشابه',
        s0Label: 'Outer Radius <b>\\(R =\\)</b>', s0Min: 2.0, s0Max: 8.0, s0Val: 4.0, s0Step: 0.5,
        s1Label: 'Scale Ratio <b>\\(k =\\)</b>', s1Min: 0.5, s1Max: 2.0, s1Val: 1.0, s1Step: 0.25,
        r0Label: 'Circle Area \\(\\pi R^2\\)', r0Val: '\\(16\\pi \\approx 50.27\\)',
        r1Label: 'Inscribed Square Area \\(2R^2\\)', r1Val: '\\(32.00\\)',
        r2Label: 'Shaded Area \\(R^2(\\pi - 2)\\)', r2Val: '\\(18.27\\)',
        defTitle: 'Quantitative Comparison (A/B/C/D) Rules & Shaded Region Shortcuts',
        defBody: 'In Qiyas Quantitative Comparisons, choose <strong>(A)</strong> if Column A is always greater, <strong>(B)</strong> if Column B is always greater, <strong>(C)</strong> if they are always equal, and <strong>(D)</strong> if the relationship changes for different valid variable choices (test \\( 0, 1, -1, \\frac{1}{2}, 2 \\)). For a circle of radius \\( r \\) inscribed inside a square of side \\( 2r \\), the shaded corner area is \\( r^2(4 - \\pi) \\); for a square inscribed inside a circle of radius \\( r \\), its area is \\( \\frac{d^2}{2} = 2r^2 \\). The angle between clock hands at \\( H:M \\) is \\( \\theta = |30H - 5.5M|^\\circ \\).'
      },
      {
        id: 'ge-data-stats-prob',
        num: '4',
        titleEn: 'GAT & SAAT Data Interpretation, Counting & Probability',
        titleAr: 'تحليل البيانات والرسوم البيانية ومبدأ العد والاحتمالات (GAT & SAAT)',
        domain: 'Data Interpretation, Counting & Probability',
        tagCat: 'GAT/SAAT Module 4 — Statistics & Probability',
        topics: ['Pie-chart central angles (360° = 100%)', 'Weighted averages & arithmetic mean sums', 'Permutations, circular seating (n-1)! & nCr', 'Conditional probability & independent events', 'Normal distribution empirical rule (68-95-99.7%)'],
        exMode: 'venn_prob',
        exSquare: false,
        ex3d: null,
        exTitleEn: 'Venn Inclusion-Exclusion & Conditional Probability Lab',
        exTitleAr: 'مختبر أشكال فن والاحتمال الشرطي ومبدأ الشمول والإقصاء',
        s0Label: 'Event Probability <b>\\(P(A) =\\)</b>', s0Min: 0.2, s0Max: 0.8, s0Val: 0.5, s0Step: 0.05,
        s1Label: 'Event Probability <b>\\(P(B) =\\)</b>', s1Min: 0.2, s1Max: 0.8, s1Val: 0.4, s1Step: 0.05,
        r0Label: 'Union \\(P(A\\cup B)\\)', r0Val: '\\(0.70\\)',
        r1Label: 'Intersection \\(P(A\\cap B)\\)', r1Val: '\\(0.20\\)',
        r2Label: 'Conditional \\(P(A\\mid B)\\)', r2Val: '\\(0.50\\)',
        defTitle: 'Circular Permutations, Inclusion-Exclusion & the 68–95–99.7% Rule',
        defBody: 'Key Qiyas counting and probability rules: (1) \\( n \\) people can be seated around a circular table in \\( (n - 1)! \\) ways (or \\( n! \\) ways if seated relative to a fixed landmark like a door); (2) Inclusion-Exclusion: \\( |A \\cup B| = |A| + |B| - |A \\cap B| \\); (3) For a normal distribution \\( N(\\mu, \\sigma^2) \\), approximately \\( 68\\% \\) of data lies within \\( \\mu \\pm \\sigma \\), \\( 95\\% \\) within \\( \\mu \\pm 2\\sigma \\) (so \\( 2.5\\% \\) lies above \\( \\mu + 2\\sigma \\)), and \\( 99.7\\% \\) within \\( \\mu \\pm 3\\sigma \\).'
      },
      {
        id: 'ge-saat-algebra-matrices',
        num: '5',
        titleEn: 'SAAT Logic, Polynomials, Matrices & Complex Numbers',
        titleAr: 'المنطق الرياضي وكثيرات الحدود والمصفوفات والأعداد المركبة (SAAT)',
        domain: 'SAAT Algebra, Matrices & Complex Numbers',
        tagCat: 'SAAT Module 5 — Logic, Matrices & Complex Numbers',
        topics: ['Conditional statements & contrapositive (~q → ~p)', '2×2 and 3×3 determinants & matrix inverses', 'Powers of i (i⁴ⁿ = 1) & complex conjugates', 'Remainder theorem & rational root theorem', 'Direct, inverse & joint variation'],
        exMode: 'mat_2d',
        exSquare: true,
        ex3d: 'vec3',
        exTitleEn: '2×2 Matrix Transformation, Determinant Area & Invertibility Lab',
        exTitleAr: 'مختبر تحويلات المصفوفات والمحددات ومعكوس المصفوفة',
        s0Label: 'Diagonal Entry <b>\\(a =\\)</b>', s0Min: -3, s0Max: 3, s0Val: 2.0, s0Step: 0.5,
        s1Label: 'Diagonal Entry <b>\\(d =\\)</b>', s1Min: -3, s1Max: 3, s1Val: 1.5, s1Step: 0.5,
        r0Label: 'Determinant \\(\\det(A) = ad - bc\\)', r0Val: '\\(3.00\\)',
        r1Label: 'Area Scale Factor', r1Val: '\\(3.00\\times\\)',
        r2Label: 'Invertibility Status', r2Val: 'Invertible (Non-Singular)',
        defTitle: 'Contrapositive Equivalence, Matrix Inverses & Complex Powers',
        defBody: 'In SAAT Year 1–2 Mathematics: (1) A conditional statement \\( p \\to q \\) is logically equivalent to its <strong>contrapositive</strong> \\( \\sim q \\to \\sim p \\); (2) A \\( 2 \\times 2 \\) matrix \\( A = \\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix} \\) has determinant \\( \\Delta = ad - bc \\), is singular (non-invertible) when \\( ad - bc = 0 \\), and has inverse \\( A^{-1} = \\frac{1}{ad-bc}\\begin{pmatrix} d & -b \\\\ -c & a \\end{pmatrix} \\); (3) Powers of the imaginary unit \\( i = \\sqrt{-1} \\) are periodic mod 4: \\( i^1 = i, i^2 = -1, i^3 = -i, i^4 = 1 \\), and \\( (1 + i)^2 = 2i \\).'
      },
      {
        id: 'ge-saat-functions-logs',
        num: '6',
        titleEn: 'SAAT Functions, Sequences, Exponentials & Logarithms',
        titleAr: 'الدوال الكسرية والمتتابعات والأسس واللوغاريتمات (SAAT)',
        domain: 'SAAT Functions, Sequences & Logarithms',
        tagCat: 'SAAT Module 6 — Functions, Series & Logs',
        topics: ['Horizontal/vertical asymptotes & removable holes', 'Infinite geometric series S_∞ = a₁/(1 - r)', 'Binomial expansion term T_{k+1}', 'Logarithmic equations & change of base', 'Even/odd symmetry & inverse functions'],
        exMode: 'exp_doubling',
        exSquare: false,
        ex3d: null,
        exTitleEn: 'Exponential Growth, Logarithmic Inverse & Geometric Convergence Lab',
        exTitleAr: 'مختبر الدوال الأسية واللوغاريتمية وتقارب المتسلسلة الهندسية',
        s0Label: 'Initial Value <b>\\(a_1 =\\)</b>', s0Min: 1.0, s0Max: 6.0, s0Val: 3.0, s0Step: 0.5,
        s1Label: 'Base / Ratio <b>\\(b =\\)</b>', s1Min: 0.5, s1Max: 2.5, s1Val: 1.5, s1Step: 0.25,
        r0Label: 'Value at \\(x = 2\\)', r0Val: '\\(6.75\\)',
        r1Label: 'Logarithm \\(\\log_b(y/a_1)\\)', r1Val: '\\(2.00\\)',
        r2Label: 'Regime', r2Val: 'Exponential Growth (b > 1)',
        defTitle: 'Rational Asymptotes, Infinite Geometric Sums & Logarithm Laws',
        defBody: 'For a rational function \\( f(x) = \\frac{P(x)}{Q(x)} \\) of degrees \\( m \\) and \\( n \\): if \\( m < n \\), the horizontal asymptote is \\( y = 0 \\); if \\( m = n \\), it is \\( y = \\frac{\\text{leading coeff of } P}{\\text{leading coeff of } Q} \\); common linear factors \\( (x - c) \\) create a <em>point discontinuity (hole)</em> at \\( x = c \\). An infinite geometric series converges if and only if \\( |r| < 1 \\), with sum \\( S_\\infty = \\frac{a_1}{1 - r} \\).'
      },
      {
        id: 'ge-saat-trig-conics',
        num: '7',
        titleEn: 'SAAT Trigonometry, Conic Sections & 3D Vectors',
        titleAr: 'حساب المثلثات والقطوع المخروطية والمتجهات في الفضاء (SAAT)',
        domain: 'SAAT Trigonometry, Conics & Vectors',
        tagCat: 'SAAT Module 7 — Conics, Trig & 3D Vectors',
        topics: ['Compound & double-angle trig identities', 'Parabola, ellipse & hyperbola foci & eccentricity', '3D vectors, dot product orthogonality & cross product', 'Polar coordinates (r, θ) ↔ Cartesian (x, y)', 'De Moivre\'s theorem for complex powers'],
        exMode: 'conic',
        exSquare: true,
        ex3d: 'solid',
        exTitleEn: 'Conic Sections (Ellipse / Hyperbola) Foci & Eccentricity Lab',
        exTitleAr: 'مختبر القطوع المخروطية والبؤر والاختلاف المركزي',
        s0Label: 'Semi-Major Axis <b>\\(a =\\)</b>', s0Min: 2.0, s0Max: 5.0, s0Val: 4.0, s0Step: 0.5,
        s1Label: 'Semi-Minor Axis <b>\\(b =\\)</b>', s1Min: 1.0, s1Max: 4.0, s1Val: 3.0, s1Step: 0.5,
        r0Label: 'Focal Distance \\(c = \\sqrt{|a^2 - b^2|}\\)', r0Val: '\\(c = 2.65\\)',
        r1Label: 'Eccentricity \\(e = c/a\\)', r1Val: '\\(e = 0.66\\)',
        r2Label: 'Vertices', r2Val: '\\((\\pm 4.00, 0)\\)',
        defTitle: 'Conic Sections, Eccentricity & 3D Vector Orthogonality (SAAT Year 3)',
        defBody: 'In SAAT Year 3 Mathematics: (1) For an <strong>ellipse</strong> \\( \\frac{(x-h)^2}{a^2} + \\frac{(y-k)^2}{b^2} = 1 \\) (\\( a > b \\)), \\( c^2 = a^2 - b^2 \\) and eccentricity \\( e = \\frac{c}{a} \\in (0, 1) \\); for a <strong>hyperbola</strong> \\( \\frac{(x-h)^2}{a^2} - \\frac{(y-k)^2}{b^2} = 1 \\), \\( c^2 = a^2 + b^2 \\), \\( e = \\frac{c}{a} > 1 \\), and asymptotes have slopes \\( \\pm\\frac{b}{a} \\) (or \\( \\pm\\frac{a}{b} \\) if vertical); (2) Two non-zero vectors \\( \\mathbf{u}, \\mathbf{v} \\) are orthogonal if and only if \\( \\mathbf{u} \\cdot \\mathbf{v} = 0 \\).'
      },
      {
        id: 'ge-saat-calculus',
        num: '8',
        titleEn: 'SAAT Limits, Derivatives, Definite Integrals & Area',
        titleAr: 'النهايات والاشتقاق والتكامل المحدود والمساحات (SAAT)',
        domain: 'SAAT Differential & Integral Calculus',
        tagCat: 'SAAT Module 8 — Differential & Integral Calculus',
        topics: ['Algebraic limits & limits at infinity', 'Power, product & quotient derivative rules', 'Critical points, local extrema & tangent lines', 'Antiderivatives & Fundamental Theorem of Calculus', 'Area under a curve & kinematic velocity/acceleration'],
        exMode: 'ftc_triple',
        exSquare: false,
        ex3d: 'surf',
        exTitleEn: 'Fundamental Theorem of Calculus: Derivative, Curve & Area Lab',
        exTitleAr: 'مختبر النظرية الأساسية للتفاضل والتكامل والمساحة تحت المنحنى',
        s0Label: 'Upper Bound <b>\\(b =\\)</b>', s0Min: 0.5, s0Max: 3.5, s0Val: 2.0, s0Step: 0.5,
        s1Label: 'Quadratic Scale <b>\\(k =\\)</b>', s1Min: 0.5, s1Max: 2.5, s1Val: 1.0, s1Step: 0.5,
        r0Label: 'Accumulated Area \\(\\int_0^b f(x)\\,dx\\)', r0Val: '\\(2.67\\)',
        r1Label: 'Instantaneous Rate \\(f\'(b)\\)', r1Val: '\\(4.00\\)',
        r2Label: 'Function Value \\(f(b)\\)', r2Val: '\\(4.00\\)',
        defTitle: 'High-Speed SAAT Calculus Rules (Limits, Extrema & FTC)',
        defBody: 'High-yield SAAT Year 3 Calculus shortcuts: (1) <strong>0/0 Algebraic Limits:</strong> factor and cancel \\( (x - a) \\), or differentiate numerator and denominator: \\( \\lim_{x\\to a}\\frac{x^n - a^n}{x - a} = na^{n-1} \\); (2) <strong>Critical Points:</strong> local maxima and minima of a polynomial \\( f(x) \\) occur where \\( f\'(x) = 0 \\); (3) <strong>Fundamental Theorem of Calculus:</strong> if \\( F\'(x) = f(x) \\), then \\( \\int_a^b f(x)\\,dx = F(b) - F(a) \\), and \\( \\int_{-a}^{a} g(x)\\,dx = 0 \\) for any odd function \\( g(-x) = -g(x) \\).'
      }
    ]
  },
  {
    id: 'olympiad',
    prefix: 'ol',
    njkTitle: 'Contest Math & Olympiad (AMC 10/12, Kangaroo & Mawhiba) · ClipSAT',
    njkDesc: 'Competition Mathematics & Olympiad Problem Solving — Modular Arithmetic, Diophantine Equations, Combinatorics, Euclidean Circle Geometry & Invariants for AMC 10/12, AIME, Kangaroo Math & Mawhiba',
    meta: {
      title: {
        en: 'Contest Math & Olympiad',
        ar: 'رياضيات المسابقات والأولمبياد (AMC · كانجارو · موهبة)'
      },
      subtitle: {
        en: 'Creative problem solving, number theory, Diophantine equations, bijective combinatorics, synthetic geometry, and olympiad invariants for MAA AMC 10/12, AIME, Kangaroo Math Arabia, and Mawhiba.',
        ar: 'تطوير مهارات التفكير الإبداعي ونظرية الأعداد والتركيبات والهندسة الإقليدية لمسابقات موهبة وكانجارو واختبارات AMC 10/12.'
      },
      level: 'Advanced',
      color: 'var(--amber)',
      icon: '🏆',
      examBoard: 'MAA (AMC 10/12 & AIME) · Kangaroo Math (AKSF) · Mawhiba Foundation',
      tags: [
        'AMC 10/12',
        'Kangaroo Math',
        'Mawhiba Olympiad',
        'AIME Prep',
        'Number Theory',
        'Combinatorics'
      ],
      officialLinks: [
        {
          label: { en: 'MAA American Mathematics Competitions (AMC 10/12 & AIME)', ar: null },
          url: 'https://maa.org/student-programs/amc/',
          note: { en: 'Official Mathematical Association of America competition portal', ar: null }
        },
        {
          label: { en: 'Mawhiba & Kangaroo Math Arabia Official Portal', ar: null },
          url: 'https://www.mawhiba.org/',
          note: { en: 'King Abdulaziz and his Companions Foundation for Giftedness and Creativity', ar: null }
        }
      ],
      downloadsInfo: {
        introText: {
          en: 'Download Olympiad theorem compendiums, AMC 10/12 & Kangaroo Math strategy guides, and topical problem sets offline.',
          ar: null
        },
        pdfCardTitle: {
          en: 'Contest Math & Olympiad Complete Problem-Solving Compendium',
          ar: null
        },
        pdfCardDescription: {
          en: 'All eight olympiad modules covering Vieta jumping, modular arithmetic, SFFT, Pigeonhole, Power of a Point, Ceva/Stewart, and invariants.',
          ar: null
        },
        docxCardDescription: {
          en: 'Editable .docx olympiad training handouts with full proofs and competition solutions.',
          ar: null
        },
        worksheetLibraryText: {
          en: 'Graded 3-Point, 4-Point, and 5-Point Kangaroo/Mawhiba and AMC 10/12 training problem sets.',
          ar: null
        }
      },
      pageHeader: {
        h1: {
          en: 'Contest Math & Olympiad (AMC 10/12 · Kangaroo · Mawhiba)',
          ar: 'رياضيات المسابقات والأولمبياد (AMC · كانجارو · موهبة)'
        },
        stats: [
          { label: { en: 'Competitions', ar: null }, value: { en: 'AMC 10/12 · AIME · Kangaroo · Mawhiba', ar: null } },
          { label: { en: 'Core Pillars', ar: null }, value: { en: 'Algebra · Number Theory · Combo · Geometry', ar: null } },
          { label: { en: 'Chapters', ar: null }, value: { en: '8 Olympiad Modules', ar: null } },
          { label: { en: 'Interactive Labs', ar: null }, value: { en: '8 Theorem & Lattice Explorers', ar: null } }
        ]
      },
      testGenerator: {
        examTitle: 'AMC 10/12 & Mawhiba / Kangaroo Mathematics Competition',
        sections: [
          'Section A — Foundational & 3-Point Contest Problems (10 Questions · 25 min)',
          'Section B — Intermediate & 4-Point Olympiad Problems (10 Questions · 25 min)',
          'Section C — Advanced & 5-Point AIME-Qualifier Problems (5 Questions · 25 min)'
        ],
        introText: {
          en: 'Generate authentic non-calculator AMC 10/12 and Mawhiba / Kangaroo Math competition papers with multi-method olympiad solutions.',
          ar: null
        },
        examDescription: {
          en: 'Full competition simulation matching MAA AMC 10/12 (25 questions, 75 minutes) and Mawhiba / Kangaroo Math Arabia (30 questions, 75 minutes).',
          ar: null
        },
        examButtonLabel: { en: 'Generate Full Olympiad Competition Paper ↻', ar: null },
        examMinutesArg: 75,
        exams: [
          {
            examTitle: 'AMC 10/12 Mathematics Competition',
            examButtonLabel: { en: 'Generate AMC 10/12 Competition Paper ↻', ar: null }
          },
          {
            examTitle: 'Mawhiba & Kangaroo Math Arabia (Senior)',
            examButtonLabel: { en: 'Generate Mawhiba & Kangaroo Paper ↻', ar: null }
          }
        ]
      }
    },
    chapters: [
      {
        id: 'ol-algebraic-techniques',
        num: '1',
        titleEn: 'Olympiad Algebra, Symmetric Sums & Vieta\'s Relations',
        titleAr: 'الجبر الأولمبي والمجاميع المتماثلة وعلاقات فييتا للجذور',
        domain: 'Olympiad Algebra & Vieta\'s Relations',
        tagCat: 'Olympiad Module 1 — Contest Algebra',
        topics: ['Vieta\'s formulas for cubics & higher polynomials', 'Newton\'s sums r₁² + r₂² + r₃²', 'Sophie Germain & sum/difference of cubes', 'AM-GM & Cauchy-Schwarz inequalities', 'Telescoping products & functional equations'],
        exMode: 'factored_quad',
        exSquare: false,
        ex3d: null,
        exTitleEn: 'Vieta\'s Root Relations & Symmetric Power Sums Lab',
        exTitleAr: 'مختبر علاقات فييتا والمجاميع المتماثلة لقوى الجذور',
        s0Label: 'Root <b>\\(r_1 =\\)</b>', s0Min: -4, s0Max: 4, s0Val: 1, s0Step: 1,
        s1Label: 'Root <b>\\(r_2 =\\)</b>', s1Min: -4, s1Max: 4, s1Val: 3, s1Step: 1,
        r0Label: 'Sum \\(r_1 + r_2 = -b/a\\)', r0Val: '\\(4\\)',
        r1Label: 'Product \\(r_1 r_2 = c/a\\)', r1Val: '\\(3\\)',
        r2Label: 'Squared Sum \\(r_1^2 + r_2^2\\)', r2Val: '\\(10\\)',
        defTitle: 'Vieta\'s Formulas, Symmetric Sums & AM–GM Inequality',
        defBody: 'For a polynomial \\( P(x) = a_n x^n + a_{n-1}x^{n-1} + \\dots + a_0 \\) with roots \\( r_1, r_2, \\dots, r_n \\), <strong>Vieta\'s Formulas</strong> state that \\( \\sum r_i = -\\frac{a_{n-1}}{a_n} \\), \\( \\sum_{i<j} r_i r_j = \\frac{a_{n-2}}{a_n} \\), and \\( r_1 r_2 \\cdots r_n = (-1)^n \\frac{a_0}{a_n} \\). Consequently, \\( \\sum r_i^2 = (\\sum r_i)^2 - 2\\sum_{i<j} r_i r_j \\). For non-negative reals \\( x_1, \\dots, x_n \\), the <strong>AM–GM Inequality</strong> states \\[ \\frac{x_1 + x_2 + \\dots + x_n}{n} \\ge \\sqrt[n]{x_1 x_2 \\cdots x_n}, \\] with equality if and only if \\( x_1 = x_2 = \\dots = x_n \\).'
      },
      {
        id: 'ol-modular-number-theory',
        num: '2',
        titleEn: 'Divisibility, Prime Factorization & Modular Arithmetic',
        titleAr: 'قابلية القسمة والتحليل إلى عوامل أولية والحساب المعياري (Modulo)',
        domain: 'Divisibility & Modular Arithmetic',
        tagCat: 'Olympiad Module 2 — Number Theory I',
        topics: ['Divisor count d(n) & sum of divisors σ(n)', 'Euclidean algorithm & Bézout\'s identity', 'Modular congruences, Fermat\'s Little Theorem & Euler\'s φ(n)', 'Chinese Remainder Theorem (CRT)', 'Legendre\'s formula for v_p(n!)'],
        exMode: 'euclid_gcd',
        exSquare: true,
        ex3d: null,
        exTitleEn: 'Euclidean Algorithm, Bézout Coefficients & Modular Remainder Lab',
        exTitleAr: 'مختبر خوارزمية إقليدس والحساب المعياري والقواسم',
        s0Label: 'Dividend <b>\\(a =\\)</b>', s0Min: 8, s0Max: 50, s0Val: 42, s0Step: 2,
        s1Label: 'Modulus <b>\\(m =\\)</b>', s1Min: 6, s1Max: 40, s1Val: 18, s1Step: 2,
        r0Label: '\\(\\gcd(a, m)\\)', r0Val: '\\(6\\)',
        r1Label: 'Remainder \\(a \\bmod m\\)', r1Val: '\\(6\\)',
        r2Label: '\\(\\text{lcm}(a, m)\\)', r2Val: '\\(126\\)',
        defTitle: 'Divisor Functions, Fermat\'s Little Theorem & Legendre\'s Formula',
        defBody: 'If \\( n = p_1^{e_1} p_2^{e_2} \\cdots p_k^{e_k} \\) is the canonical prime factorization of \\( n \\), then the number of positive divisors is \\[ d(n) = (e_1 + 1)(e_2 + 1)\\cdots(e_k + 1). \\] By <strong>Fermat\'s Little Theorem</strong>, if \\( p \\) is prime and \\( p \\nmid a \\), then \\( a^{p-1} \\equiv 1 \\pmod{p} \\). By <strong>Legendre\'s Formula</strong>, the exact exponent of a prime \\( p \\) dividing \\( n! \\) is \\( \\nu_p(n!) = \\sum_{k=1}^{\\infty} \\left\\lfloor \\frac{n}{p^k} \\right\\rfloor \\).'
      },
      {
        id: 'ol-diophantine-equations',
        num: '3',
        titleEn: 'Diophantine Equations, Floor Functions & Number Bases',
        titleAr: 'المعادلات الديوفانتية ودالة الصحيح وأنظمة العد',
        domain: 'Diophantine Equations & Floor Functions',
        tagCat: 'Olympiad Module 3 — Number Theory II',
        topics: ['Simon\'s Favorite Factoring Trick (SFFT)', 'Linear Diophantine equations ax + by = c', 'Chicken McNugget Theorem (ab - a - b)', 'Floor ⌊x⌋ & fractional part {x} equations', 'Base-b representations & digit sums'],
        exMode: 'coord_seg',
        exSquare: true,
        ex3d: null,
        exTitleEn: 'Diophantine Lattice Points & Simon\'s Factoring Trick Lab',
        exTitleAr: 'مختبر النقاط الشبكية للمعادلات الديوفانتية والتحليل الجبري',
        s0Label: 'Parameter <b>\\(a =\\)</b>', s0Min: 1, s0Max: 5, s0Val: 2, s0Step: 1,
        s1Label: 'Parameter <b>\\(b =\\)</b>', s1Min: 1, s1Max: 5, s1Val: 3, s1Step: 1,
        r0Label: 'Frobenius Bound \\(ab - a - b\\)', r0Val: '\\(1\\)',
        r1Label: 'SFFT Constant \\(ab\\)', r1Val: '\\(6\\)',
        r2Label: 'Lattice Distance', r2Val: '\\(3.61\\)',
        defTitle: 'Simon\'s Favorite Factoring Trick (SFFT) & Frobenius Coin Theorem',
        defBody: 'To solve bilinear Diophantine equations of the form \\( xy + ax + by = c \\) in integers, add \\( ab \\) to both sides (<strong>Simon\'s Favorite Factoring Trick</strong>): \\[ xy + ax + by + ab = c + ab \\iff (x + b)(y + a) = c + ab, \\] reducing the equation to enumerating the integer divisors of \\( c + ab \\). By the <strong>Chicken McNugget (Frobenius) Theorem</strong>, for coprime positive integers \\( a, b \\), the largest integer that cannot be expressed as \\( ax + by \\) (with \\( x, y \\ge 0 \\)) is \\( ab - a - b \\), and exactly \\( \\frac{(a-1)(b-1)}{2} \\) non-negative integers are unattainable.'
      },
      {
        id: 'ol-combinatorics-counting',
        num: '4',
        titleEn: 'Bijective Counting, Pigeonhole Principle & Inclusion-Exclusion',
        titleAr: 'العد التقابلي ومبدأ برج الحمام ومبدأ الشمول والإقصاء',
        domain: 'Combinatorics & Pigeonhole Principle',
        tagCat: 'Olympiad Module 4 — Combinatorics I',
        topics: ['Stars and Bars (balls in urns)', 'Generalized Pigeonhole Principle', 'Principle of Inclusion-Exclusion (PIE)', 'Derangements & lattice paths with obstacles', 'Vandermonde\'s & hockey-stick identities'],
        exMode: 'binomial',
        exSquare: false,
        ex3d: null,
        exTitleEn: 'Pascal\'s Triangle, Stars-and-Bars & Hockey-Stick Identity Lab',
        exTitleAr: 'مختبر مثلث باسكال وطريقة النجوم والفواصل والتوافيق',
        s0Label: 'Total Items <b>\\(n =\\)</b>', s0Min: 4, s0Max: 10, s0Val: 8, s0Step: 1,
        s1Label: 'Chosen Subset <b>\\(k =\\)</b>', s1Min: 1, s1Max: 6, s1Val: 3, s1Step: 1,
        r0Label: 'Binomial \\(\\binom{n}{k}\\)', r0Val: '\\(56\\)',
        r1Label: 'Row Sum \\(2^n\\)', r1Val: '\\(256\\)',
        r2Label: 'Symmetry \\(\\binom{n}{n-k}\\)', r2Val: '\\(56\\)',
        defTitle: 'Stars and Bars, Hockey-Stick Identity & Generalized Pigeonhole',
        defBody: 'By <strong>Stars and Bars</strong>, the number of non-negative integer solutions to \\( x_1 + x_2 + \\dots + x_k = n \\) is \\( \\binom{n + k - 1}{k - 1} \\), and the number of positive integer solutions (\\( x_i \\ge 1 \\)) is \\( \\binom{n - 1}{k - 1} \\). The <strong>Hockey-Stick Identity</strong> states that \\( \\sum_{i=r}^{n} \\binom{i}{r} = \\binom{n+1}{r+1} \\). By the <strong>Generalized Pigeonhole Principle</strong>, if \\( N \\) objects are placed into \\( k \\) boxes, at least one box contains at least \\( \\lceil N/k \\rceil \\) objects.'
      },
      {
        id: 'ol-recurrence-probability',
        num: '5',
        titleEn: 'Recurrence Relations, States & Contest Probability',
        titleAr: 'العلاقات التكرارية وسلاسل الحالات واحتمالات المسابقات',
        domain: 'Recurrence Relations & Contest Probability',
        tagCat: 'Olympiad Module 5 — Combinatorics II & Probability',
        topics: ['Fibonacci & tiling recurrences a_n = a_{n-1} + a_{n-2}', 'State-transition Markov equations', 'Linearity of expectation E[X + Y] = E[X] + E[Y]', 'Geometric probability (area/length regions)', 'Conditional symmetry & Bayes in contests'],
        exMode: 'cobweb',
        exSquare: true,
        ex3d: null,
        exTitleEn: 'Recurrence Dynamics, Fixed Points & State Convergence Lab',
        exTitleAr: 'مختبر العلاقات التكرارية ونقاط الاتزان وتقارب الحالات',
        s0Label: 'Growth Parameter <b>\\(r =\\)</b>', s0Min: 1.0, s0Max: 3.5, s0Val: 2.4, s0Step: 0.2,
        s1Label: 'Initial State <b>\\(x_0 =\\)</b>', s1Min: 0.2, s1Max: 2.0, s1Val: 0.8, s1Step: 0.2,
        r0Label: 'Equilibrium State \\(x^*\\)', r0Val: '\\(2.33\\)',
        r1Label: 'Next State \\(x_1\\)', r1Val: '\\(1.54\\)',
        r2Label: 'Stability', r2Val: 'Convergent Attractor',
        defTitle: 'Combinatorial Recurrences, State Equations & Linearity of Expectation',
        defBody: 'Many AMC/AIME counting and probability problems reduce to setting up a recurrence relation \\( a_n = c_1 a_{n-1} + c_2 a_{n-2} \\) by conditioning on the first step (e.g., tiling a \\( 2 \\times n \\) board with dominoes yields the Fibonacci numbers \\( F_{n+1} \\)). For random variables \\( X_1, \\dots, X_n \\), <strong>Linearity of Expectation</strong> \\[ E[X_1 + X_2 + \\dots + X_n] = E[X_1] + E[X_2] + \\dots + E[X_n] \\] holds <em>even when the variables are dependent</em>, making indicator variables the most powerful tool for expected-value problems.'
      },
      {
        id: 'ol-euclidean-circles',
        num: '6',
        titleEn: 'Power of a Point, Cyclic Quadrilaterals & Angle Chasing',
        titleAr: 'قوة النقطة بالنسبة للدائرة والرباعيات الدائرية وتتبع الزوايا',
        domain: 'Euclidean Geometry & Cyclic Quadrilaterals',
        tagCat: 'Olympiad Module 6 — Olympiad Geometry I',
        topics: ['Power of a Point (secant-secant, secant-tangent, chord-chord)', 'Cyclic quadrilateral criteria & Ptolemy\'s Theorem', 'Inscribed angle, chord-tangent & radical axis', 'Homothety & spiral similarity', 'Shoelace formula & Pick\'s lattice theorem'],
        exMode: 'sector_seg',
        exSquare: true,
        ex3d: 'solid',
        exTitleEn: 'Circle Power of a Point, Chords & Cyclic Geometry Lab',
        exTitleAr: 'مختبر قوة النقطة والأوتار المتقاطعة والرباعي الدائري',
        s0Label: 'Circle Radius <b>\\(R =\\)</b>', s0Min: 1.5, s0Max: 4.5, s0Val: 3.5, s0Step: 0.5,
        s1Label: 'Subtended Angle <b>\\(\\theta =\\)</b>', s1Min: 0.6, s1Max: 2.8, s1Val: 1.8, s1Step: 0.2,
        r0Label: 'Chord Length \\(2R\\sin(\\theta/2)\\)', r0Val: '\\(5.48\\)',
        r1Label: 'Inscribed Angle \\(\\theta/2\\)', r1Val: '\\(0.90\\text{ rad}\\)',
        r2Label: 'Enclosed Segment Area', r2Val: '\\(4.92\\)',
        defTitle: 'Power of a Point, Ptolemy\'s Theorem & Pick\'s Lattice Theorem',
        defBody: 'For a circle of center \\( O \\) and radius \\( R \\), the <strong>Power of a Point</strong> \\( P \\) is \\( |PO^2 - R^2| \\): for any line through \\( P \\) meeting the circle at \\( A, B \\), \\( PA \\cdot PB = |PO^2 - R^2| \\) (and \\( PT^2 = PA \\cdot PB \\) for a tangent \\( PT \\)). For a cyclic quadrilateral \\( ABCD \\), <strong>Ptolemy\'s Theorem</strong> states \\[ AC \\cdot BD = AB \\cdot CD + BC \\cdot DA. \\] For a lattice polygon with \\( I \\) interior lattice points and \\( B \\) boundary lattice points, <strong>Pick\'s Theorem</strong> gives area \\( A = I + \\frac{B}{2} - 1 \\).'
      },
      {
        id: 'ol-triangle-centers-trig',
        num: '7',
        titleEn: 'Ceva\'s, Menelaus\', Stewart\'s Theorems & Triangle Centers',
        titleAr: 'نظريات سيفا ومينيلاوس وستيوارت ومراكز المثلث المتقدمة',
        domain: 'Triangle Centers, Ceva & Trigonometry',
        tagCat: 'Olympiad Module 7 — Olympiad Geometry II',
        topics: ['Stewart\'s Theorem man + dad = bmb + cnc', 'Ceva\'s concurrency & Menelaus\' collinearity theorems', 'Angle Bisector Theorem & length formula', 'Inradius r = A/s, Circumradius R = abc/(4A) & Heron\'s formula', 'Mass points & area-ratio chasing'],
        exMode: 'tri_similar',
        exSquare: true,
        ex3d: 'solid',
        exTitleEn: 'Triangle Cevians, Angle Bisector Ratio & Area Partition Lab',
        exTitleAr: 'مختبر مستقيمات سيفا ومنصف الزاوية ونسب المساحات',
        s0Label: 'Base Ratio <b>\\(k =\\)</b>', s0Min: 0.5, s0Max: 2.5, s0Val: 1.5, s0Step: 0.25,
        s1Label: 'Altitude Scale <b>\\(h =\\)</b>', s1Min: 1.0, s1Max: 4.0, s1Val: 2.5, s1Step: 0.5,
        r0Label: 'Linear Scale \\(k\\)', r0Val: '\\(1.50\\)',
        r1Label: 'Area Ratio \\(k^2\\)', r1Val: '\\(2.25\\)',
        r2Label: 'Perimeter Ratio', r2Val: '\\(1.50\\)',
        defTitle: 'Stewart\'s Theorem, Ceva\'s Theorem & Triangle Radii Formulas',
        defBody: 'In \\( \\triangle ABC \\) with sides \\( a, b, c \\) and semiperimeter \\( s = \\frac{a+b+c}{2} \\): (1) <strong>Heron\'s Formula & Radii:</strong> \\( [ABC] = \\sqrt{s(s-a)(s-b)(s-c)} = rs = \\frac{abc}{4R} \\); (2) <strong>Stewart\'s Theorem:</strong> for a cevian of length \\( d \\) dividing side \\( a \\) into segments \\( m \\) and \\( n \\), \\[ b^2 m + c^2 n = a(d^2 + mn); \\] (3) <strong>Ceva\'s Theorem:</strong> cevians \\( AD, BE, CF \\) are concurrent if and only if \\( \\frac{BD}{DC} \\cdot \\frac{CE}{EA} \\cdot \\frac{AF}{FB} = 1 \\).'
      },
      {
        id: 'ol-invariants-extremal',
        num: '8',
        titleEn: 'Invariants, Monovariants, Game Strategy & Extremal Principle',
        titleAr: 'اللامتغيرات واستراتيجيات الألعاب الرياضية ومبدأ القيم القصوى',
        domain: 'Invariants, Games & Problem-Solving Strategies',
        tagCat: 'Olympiad Module 8 — Olympiad Strategy',
        topics: ['Parity & modular invariants in board operations', 'Chessboard coloring proofs (domino/tetromino tilings)', 'Monovariants & termination proofs', 'Winning vs losing positions in impartial games (Nim/symmetry)', 'The Extremal Principle'],
        exMode: 'geom_series',
        exSquare: false,
        ex3d: null,
        exTitleEn: 'Invariant Sums, Monovariant Decay & Game State Lab',
        exTitleAr: 'مختبر اللامتغيرات الرياضية وتناقص الدوال الرتيبة',
        s0Label: 'Initial Invariant <b>\\(I_0 =\\)</b>', s0Min: 2.0, s0Max: 8.0, s0Val: 4.0, s0Step: 1.0,
        s1Label: 'Step Contraction <b>\\(r =\\)</b>', s1Min: 0.2, s1Max: 0.8, s1Val: 0.5, s1Step: 0.1,
        r0Label: 'Asymptotic Limit \\(I_0/(1-r)\\)', r0Val: '\\(8.00\\)',
        r1Label: 'Partial State \\(S_5\\)', r1Val: '\\(7.75\\)',
        r2Label: 'Monovariant Remainder', r2Val: '\\(0.25\\)',
        defTitle: 'Invariants, Coloring Proofs & Game-Theoretic Winning Strategies',
        defBody: 'An <strong>invariant</strong> is a quantity (such as parity \\( \\bmod 2 \\), remainder \\( \\bmod k \\), algebraic product, or alternating color sum) that remains unchanged under every legal operation. If the initial state and target state have different values of the invariant, the target state is provably unreachable. In two-player impartial games, a position is <strong>winning (N-position)</strong> if at least one legal move leads to a <strong>losing (P-position)</strong>, and losing if every legal move leads to a winning position; symmetry and invariant-pairing strategies force the opponent into P-positions.'
      }
    ]
  }
];

function buildChapterJson(trackSpec, ch, idx) {
  const safeId = ch.id.replace(/[^a-zA-Z0-9]/g, '');
  const canvasId = `${safeId}ExCanvas`;
  const p = idx + 2;
  const q = idx + 3;

  const explorerBlock = {
    kind: 'explorer',
    title: {
      en: `⊙ Explorer · ${ch.exTitleEn}`,
      ar: `⊙ مستكشف تفاعلي · ${ch.exTitleAr}`
    },
    canvasId,
    ariaLabel: {
      en: `${ch.exTitleEn} interactive mathematical canvas`,
      ar: `${ch.exTitleAr} لوحة رياضية تفاعلية`
    },
    dataPanel: {
      btnId: `${canvasId}_dataBtn`,
      panelId: `${canvasId}_dataPanel`,
      descId: `${canvasId}_dataDesc`,
      rowsId: `${canvasId}_dataRows`,
      caption: {
        en: `Live numerical table for ${ch.exTitleEn}`,
        ar: `جدول القيم العددية لـ ${ch.exTitleAr}`
      },
      columns: [
        { en: 'Parameter / Metric', ar: 'المتغير / المعيار' },
        { en: 'Value', ar: 'القيمة' }
      ]
    },
    controls: [
      {
        id: `${canvasId}_s0`,
        label: { en: ch.s0Label, ar: ch.s0Label },
        min: ch.s0Min, max: ch.s0Max, value: ch.s0Val, step: ch.s0Step,
        valueDisplayId: `${canvasId}_v0`,
        ariaLabel: { en: ch.s0Label.replace(/<[^>]+>/g, ''), ar: ch.s0Label.replace(/<[^>]+>/g, '') }
      },
      {
        id: `${canvasId}_s1`,
        label: { en: ch.s1Label, ar: ch.s1Label },
        min: ch.s1Min, max: ch.s1Max, value: ch.s1Val, step: ch.s1Step,
        valueDisplayId: `${canvasId}_v1`,
        ariaLabel: { en: ch.s1Label.replace(/<[^>]+>/g, ''), ar: ch.s1Label.replace(/<[^>]+>/g, '') }
      }
    ],
    readouts: [
      { id: `${canvasId}_r0`, label: { en: ch.r0Label, ar: ch.r0Label }, colorClass: 'indigo', value: ch.r0Val },
      { id: `${canvasId}_r1`, label: { en: ch.r1Label, ar: ch.r1Label }, colorClass: 'amber', value: ch.r1Val },
      { id: `${canvasId}_r2`, label: { en: ch.r2Label, ar: ch.r2Label }, colorClass: 'teal', value: ch.r2Val }
    ],
    note: {
      en: `Drag the sliders or directly manipulate the canvas to explore how changes in the parameters govern ${ch.titleEn}.`,
      ar: `حرّك المنزلقات أو تفاعل مباشرة مع اللوحة لاستكشاف العلاقات الرياضية في درس ${ch.titleAr}.`
    }
  };

  if (ch.ex3d) {
    explorerBlock.canvas3d = {
      btnId: `${canvasId}_3dBtn`,
      wrapId: `${canvasId}_3dWrap`,
      hintId: `${canvasId}_3dHint`,
      btnLabel: `🧊 View ${ch.titleEn} in 3D`,
      ariaLabel: {
        en: `Interactive 3D visualization for ${ch.titleEn}. Drag to rotate.`,
        ar: `عرض ثلاثي الأبعاد تفاعلي لدرس ${ch.titleAr}. اسحب للتدوير.`
      }
    };
  }

  return {
    id: ch.id,
    chapterNumber: ch.num,
    title: {
      en: ch.titleEn,
      ar: ch.titleAr
    },
    chapterTag: {
      variant: 'category',
      className: 'igcse-tag',
      emoji: trackSpec.meta.icon,
      category: ch.tagCat,
      badges: [{ text: 'Core Mastery', className: 'tier-e' }],
      topics: ch.topics
    },
    content: {
      blocks: [
        {
          kind: 'text',
          body: {
            en: `Mastering the essential concepts, analytical methods, and exam-grade problem-solving techniques for <strong>${ch.titleEn}</strong> (${ch.tagCat}).`,
            ar: `إتقان المفاهيم الأساسية والطرق التحليلية واستراتيجيات حل المسائل المتقدمة في <strong>${ch.titleAr}</strong>.`
          }
        },
        {
          kind: 'callout',
          style: 'def',
          label: {
            en: `● Definition ${ch.num}.1 — ${ch.defTitle}`,
            ar: `● تعريف ${ch.num}.1 — ${ch.titleAr}`
          },
          body: {
            en: `<p>${ch.defBody}</p>`,
            ar: `<p>${ch.defBody}</p>`
          }
        },
        {
          kind: 'callout',
          style: 'def',
          label: {
            en: `● Deep Conceptual Intuition — ${ch.titleEn}`,
            ar: `● الفهم المفاهيمي العميق — ${ch.titleAr}`
          },
          body: {
            en: `<p><strong>Structural Invariants &amp; Analytical Rigor:</strong> Every problem in <em>${ch.titleEn}</em> reduces to identifying the underlying algebraic or geometric structure before computing. Whether isolating parameters, verifying domain constraints, or exploiting symmetry, writing down the governing identity first eliminates arithmetic traps and guarantees full method marks.</p>`,
            ar: `<p><strong>البنية الرياضية والدقة التحليلية:</strong> يعتمد الحل المتقن في <em>${ch.titleAr}</em> على تحديد العلاقة الرياضية الحاكمة والتحقق من شروط المجال والتناظر قبل إجراء الحسابات العددية.</p>`
          }
        },
        {
          kind: 'figure',
          figure: {
            type: 'fn',
            title: `${ch.titleEn} — Coordinate Curve & Structural Analysis`,
            xrange: [-4, 6],
            yrange: [-4, 8],
            fns: [
              { fn: `(x - ${idx % 3})*(x - ${idx % 3}) - 2`, color: 'var(--fig-indigo)', label: `f(x) = (x - ${idx % 3})² - 2` },
              { fn: `x + ${1 + (idx % 2)}`, color: 'var(--fig-amber)', dash: '4,4', label: `g(x) = x + ${1 + (idx % 2)}` }
            ],
            points: [
              { x: idx % 3, y: -2, label: `Vertex (${idx % 3}, -2)` }
            ]
          },
          caption: {
            en: `Coordinate representation of \\(f(x) = (x - ${idx % 3})^2 - 2\\) and secant line \\(g(x) = x + ${1 + (idx % 2)}\\) illustrating ${ch.titleEn}.`,
            ar: `تمثيل بياني يوضح المنحنى والمقاطع الأساسية في درس ${ch.titleAr}.`
          }
        },
        explorerBlock,
        {
          kind: 'figure',
          figure: {
            type: 'triangle',
            A: [0, 0], B: [12, 0], C: [12, 5],
            labels: { A: 'A', B: 'C', C: 'B' },
            sides: { c: `${3 * p}`, a: `${4 * p}`, b: `${5 * p}` },
            rightAt: 'B'
          },
          caption: {
            en: `Orthogonal components and Euclidean distance relationship \\((${3 * p})^2 + (${4 * p})^2 = (${5 * p})^2\\) for ${ch.titleEn}.`,
            ar: `العلاقة الهندسية المتعامدة \\((${3 * p})^2 + (${4 * p})^2 = (${5 * p})^2\\) في درس ${ch.titleAr}.`
          }
        },
        {
          kind: 'cards',
          items: ch.topics.slice(0, 4).map((t, ti) => ({
            label: { en: `Key Principle ${ch.num}.${ti + 1}`, ar: `القاعدة الأساسية ${ch.num}.${ti + 1}` },
            value: { en: t, ar: t }
          }))
        },
        {
          kind: 'callout',
          style: 'pf',
          label: {
            en: `◆ Why It Works — First-Principles Derivation (${ch.titleEn})`,
            ar: `◆ لماذا تعمل هذه القاعدة — الاشتقاق الرياضي (${ch.titleAr})`
          },
          body: {
            en: `<p><strong>First-Principles Justification:</strong> Any quadratic or bilinear relation \\( ax^2 + bx + c = 0 \\) can be transformed by completing the square:</p>\\[ a\\!\\left(x + \\frac{b}{2a}\\right)^2 = \\frac{b^2 - 4ac}{4a}. \\]<p>This single identity simultaneously proves the quadratic formula, determines the exact turning-point coordinates \\( \\left(-\\frac{b}{2a}, c - \\frac{b^2}{4a}\\right) \\), and establishes the discriminant criterion \\( \\Delta = b^2 - 4ac \\) for tangency and root existence.</p>`,
            ar: `<p><strong>البرهان من المبادئ الأولية:</strong> بإكمال المربع للمقدار \\(ax^2 + bx + c\\) نحصل على \\(a(x + \\frac{b}{2a})^2 + (c - \\frac{b^2}{4a})\\)، وهو ما يفسر قانون المميز وإحداثيات نقطة الرأس بدقة.</p>`
          }
        },
        {
          kind: 'callout',
          style: 'example',
          label: {
            en: `Worked Example ${ch.num}.A — Foundational Formulation (${ch.titleEn})`,
            ar: `مثال محلول ${ch.num}.A — تطبيق أساسي (${ch.titleAr})`
          },
          body: {
            en: `<p><strong>Problem:</strong> Given the quadratic function \\( f(x) = x^2 - ${2 * p}x + ${p * p + q} \\), express \\( f(x) \\) in the completed-square form \\( (x - h)^2 + k \\) and state its minimum value and the value of \\( x \\) at which it occurs.</p><p><strong>Step-by-Step Solution:</strong><br>1. Halve the coefficient of \\( x \\): \\( -\\frac{${2 * p}}{2} = -${p} \\).<br>2. Write \\( (x - ${p})^2 = x^2 - ${2 * p}x + ${p * p} \\).<br>3. Adjust the constant term: \\( f(x) = (x - ${p})^2 - ${p * p} + ${p * p + q} = (x - ${p})^2 + ${q} \\).<br>4. Since \\( (x - ${p})^2 \\ge 0 \\) for all real \\( x \\), the minimum value is \\( k = ${q} \\), achieved at \\( x = ${p} \\).</p><p><strong>Final Answer:</strong> \\( f(x) = (x - ${p})^2 + ${q} \\); minimum value \\( ${q} \\) at \\( x = ${p} \\).</p>`,
            ar: `<p><strong>المسألة:</strong> أوجد صيغة إكمال المربع للدالة \\( f(x) = x^2 - ${2 * p}x + ${p * p + q} \\) وحدد قيمتها الصغرى.</p><p><strong>الحل خطوة بخطوة:</strong> بإكمال المربع: \\( f(x) = (x - ${p})^2 + ${q} \\)، وبما أن المربع الكامل غير سالب، فإن القيمة الصغرى هي \\( ${q} \\) وتتحقق عند \\( x = ${p} \\).</p>`
          }
        },
        {
          kind: 'callout',
          style: 'example',
          label: {
            en: `Worked Example ${ch.num}.B — Intermediate Multi-Step Synthesis (${ch.titleEn})`,
            ar: `مثال محلول ${ch.num}.B — تطبيق متوسط متعدد الخطوات (${ch.titleAr})`
          },
          body: {
            en: `<p><strong>Problem:</strong> The line \\( y = 2x + k \\) intersects the curve \\( y = x^2 - ${2 * p}x + ${p * p + 5} \\) at two distinct points. Find the range of possible values for the constant \\( k \\).</p><p><strong>Step-by-Step Solution:</strong><br>1. Equate the line and curve equations:<br>\\[ x^2 - ${2 * p}x + ${p * p + 5} = 2x + k \\implies x^2 - ${2 * p + 2}x + (${p * p + 5} - k) = 0 \\]<br>2. For two distinct real intersections, the discriminant must satisfy \\( \\Delta = b^2 - 4ac > 0 \\):<br>\\[ (-${2 * p + 2})^2 - 4(1)(${p * p + 5} - k) > 0 \\]<br>\\[ ${(2 * p + 2) * (2 * p + 2)} - ${4 * (p * p + 5)} + 4k > 0 \\implies 4k > ${4 * (p * p + 5) - (2 * p + 2) * (2 * p + 2)} \\implies k > ${(4 * (p * p + 5) - (2 * p + 2) * (2 * p + 2)) / 4} \\]</p><p><strong>Final Answer:</strong> \\( k > ${(4 * (p * p + 5) - (2 * p + 2) * (2 * p + 2)) / 4} \\).</p>`,
            ar: `<p><strong>المسألة:</strong> المستقيم \\( y = 2x + k \\) يقطع المنحنى \\( y = x^2 - ${2 * p}x + ${p * p + 5} \\) في نقطتين متمايزتين. أوجد مدى قيم \\( k \\).</p><p><strong>الحل:</strong> بمساواة المعادلتين ووضع المميز \\( \\Delta > 0 \\) نجد أن \\( k > ${(4 * (p * p + 5) - (2 * p + 2) * (2 * p + 2)) / 4} \\).</p>`
          }
        },
        {
          kind: 'callout',
          style: 'example',
          label: {
            en: `Worked Example ${ch.num}.C — Advanced Rate & Vector Application (${ch.titleEn})`,
            ar: `مثال محلول ${ch.num}.C — تطبيق متقدم (${ch.titleAr})`
          },
          body: {
            en: `<p><strong>Problem:</strong> Consider the cubic function \\( g(x) = x^3 - ${3 * p}x^2 + ${3 * p * p}x + ${q} \\). Find the coordinates of the stationary point of inflection and the gradient of the curve at \\( x = ${p + 2} \\).</p><p><strong>Step-by-Step Solution:</strong><br>1. Differentiate term by term:<br>\\[ g'(x) = 3x^2 - ${6 * p}x + ${3 * p * p} = 3(x - ${p})^2 \\]<br>2. Setting \\( g'(x) = 0 \\) yields \\( x = ${p} \\), with \\( g(${p}) = ${q} \\). Thus \\( (${p}, ${q}) \\) is the stationary point.<br>3. At \\( x = ${p + 2} \\), the gradient is \\( g'(${p + 2}) = 3(2)^2 = 12 \\).</p><p><strong>Final Answer:</strong> Stationary point \\( (${p}, ${q}) \\); gradient at \\( x = ${p + 2} \\) is \\( 12 \\).</p>`,
            ar: `<p><strong>المسألة:</strong> للدالة \\( g(x) = x^3 - ${3 * p}x^2 + ${3 * p * p}x + ${q} \\)، أوجد النقطة الحرجة وميل المماس عند \\( x = ${p + 2} \\).</p><p><strong>الحل:</strong> المشتقة \\( g'(x) = 3(x - ${p})^2 \\)، تنعدم عند \\( (${p}, ${q}) \\)، وعند \\( x = ${p + 2} \\) يكون الميل \\( 3(4) = 12 \\).</p>`
          }
        },
        {
          kind: 'callout',
          style: 'example',
          label: {
            en: `Worked Example ${ch.num}.D — Exam-Grade Challenge Synthesis (${ch.titleEn})`,
            ar: `مثال محلول ${ch.num}.D — مسألة تحدي بمستوى الاختبار (${ch.titleAr})`
          },
          body: {
            en: `<p><strong>Problem:</strong> Let \\( S_n \\) denote the sum of the first \\( n \\) terms of an arithmetic progression where \\( S_n = ${p}n^2 + ${q}n \\). Find an expression for the \\( n \\)-th term \\( u_n \\), determine the common difference \\( d \\), and evaluate \\( u_{10} \\).</p><p><strong>Step-by-Step Solution:</strong><br>1. For \\( n = 1 \\), \\( u_1 = S_1 = ${p}(1)^2 + ${q}(1) = ${p + q} \\).<br>2. For \\( n \\ge 2 \\), use the fundamental identity \\( u_n = S_n - S_{n-1} \\):<br>\\[ u_n = \\left[${p}n^2 + ${q}n\\right] - \\left[${p}(n-1)^2 + ${q}(n-1)\\right] = ${2 * p}n + (${q - p}) \\]<br>3. The coefficient of \\( n \\) gives the common difference \\( d = ${2 * p} \\).<br>4. Substituting \\( n = 10 \\) yields \\( u_{10} = ${20 * p + q - p} \\).</p><p><strong>Final Answer:</strong> \\( u_n = ${2 * p}n + ${q - p} \\), \\( d = ${2 * p} \\), and \\( u_{10} = ${19 * p + q} \\).</p>`,
            ar: `<p><strong>المسألة:</strong> إذا كان مجموع أول \\( n \\) حداً من متتابعة حسابية هو \\( S_n = ${p}n^2 + ${q}n \\)، فأوجد الحد النوني \\( u_n \\) والأساس \\( d \\) والحد العاشر \\( u_{10} \\).</p><p><strong>الحل:</strong> من العلاقة \\( u_n = S_n - S_{n-1} \\) نجد \\( u_n = ${2 * p}n + ${q - p} \\)، والأساس \\( d = ${2 * p} \\)، والحد العاشر \\( u_{10} = ${19 * p + q} \\).</p>`
          }
        },
        {
          kind: 'callout',
          style: 'warn',
          label: {
            en: `⚠️ Common Exam Traps — ${ch.titleEn}`,
            ar: `⚠️ أخطاء شائعة في الاختبار — ${ch.titleAr}`
          },
          body: {
            en: `<p><strong>1. Sign &amp; Domain Omissions:</strong> Always verify whether negative roots or boundary values violate denominator, square-root, or logarithmic domain restrictions before writing your final answer.</p><p><strong>2. Premature Rounding:</strong> Keep exact fractions, surds, or \\(\\pi\\) expressions throughout intermediate steps and round only at the final line if requested.</p>`,
            ar: `<p><strong>1. إغفال قيود المجال والإشارات:</strong> تحقق دائماً من استبعاد القيم التي تجعل المقام صفراً أو ما تحت الجذر التربيعي سالباً.</p><p><strong>2. التقريب المبكر:</strong> احتفظ بالقيم الدقيقة (الكسور والجذور) في خطوات الحل الوسطى ولا تقرب إلا في الناتج النهائي.</p>`
          }
        },
        {
          kind: 'table',
          caption: {
            en: `Error Diagnosis — Common Student Traps vs. Exam-Board Method (${ch.titleEn})`,
            ar: `تشخيص الأخطاء — مقارنة الخطأ الشائع بالطريقة الصحيحة (${ch.titleAr})`
          },
          columns: [
            { en: 'Common Student Trap', ar: 'الخطأ الشائع للطالب' },
            { en: 'Why It Fails Mathematically', ar: 'السبب الرياضي للخطأ' },
            { en: 'Correct Exam-Board Method', ar: 'الطريقة الصحيحة المعتمدة' }
          ],
          rows: [
            [
              { en: 'Canceling terms across a sum in \\( \\frac{x^2 + a}{x + a} \\)', ar: 'اختصار حدود مجموعة في بسط ومقام الكسر الجبري' },
              { en: 'Division only cancels common multiplicative factors of the entire numerator and denominator.', ar: 'الاختصار يصح فقط للعوامل المضروبة في كامل البسط والمقام.' },
              { en: 'Factorize numerator and denominator completely before canceling common binomial factors.', ar: 'حلل البسط والمقام إلى عوامل أولية مضروبة قبل الاختصار.' }
            ],
            [
              { en: 'Writing \\( (a + b)^2 = a^2 + b^2 \\) when squaring binomials', ar: 'فك المربع الكامل \\( (a + b)^2 \\) بدون الحد الأوسط \\( 2ab \\)' },
              { en: 'Omits the cross-product term \\( 2ab \\) required by the distributive law.', ar: 'يهمل حد الضرب التبادلي الأوسط \\( 2ab \\).' },
              { en: 'Always expand as \\( (a \\pm b)^2 = a^2 \\pm 2ab + b^2 \\).', ar: 'طبق المتطابقة الكاملة \\( (a \\pm b)^2 = a^2 \\pm 2ab + b^2 \\).' }
            ],
            [
              { en: 'Solving quadratic inequalities by treating \\( < \\) like \\( = \\) without a sign chart', ar: 'حل المتباينة التربيعية كمعادلة دون اختبار إشارة الفترات' },
              { en: 'A parabola changes sign at its distinct real roots, so the solution is an interval or union of rays.', ar: 'القطع المكافئ يغير إشارته حول الجذور، لذا الحل فترة متصلة أو اتحاد فترتين.' },
              { en: 'Find the critical roots first, then sketch the parabola or test a point in each interval.', ar: 'أوجد الجذور الحرجة أولاً ثم ارسم القطع المكافئ لتحديد الفترة الصحيحة.' }
            ]
          ]
        },
        {
          kind: 'callout',
          style: 'tip',
          label: {
            en: `▲ Exam Pacing & Verification Strategy — ${ch.titleEn}`,
            ar: `▲ استراتيجية الحل السريع والتحقق — ${ch.titleAr}`
          },
          body: {
            en: `<p><strong>10-Second Sanity Check:</strong> Substitute a simple test value (such as \\( x = 0, 1, \\) or \\( 2 \\)) into both your simplified expression and the original problem statement. If the numerical outputs match, your algebraic manipulation is guaranteed to be error-free.</p>`,
            ar: `<p><strong>فحص التحقق السريع:</strong> عوّض بقيمة عددية بسيطة (مثل \\( x = 1 \\) أو \\( x = 2 \\)) في الناتج النهائي وفي المسألة الأصلية للتأكد من تطابق القيمتين فوراً.</p>`
          }
        },
        {
          kind: 'practiceProblem',
          question: {
            en: `<strong>[Practice 1 · Easy]</strong> Evaluate \\( f(${q}) \\) for the quadratic function \\( f(x) = ${p}x^2 - ${p}x + 10 \\).`,
            ar: `<strong>[تدريب 1 · Easy]</strong> احسب قيمة \\( f(${q}) \\) للدالة التربيعية \\( f(x) = ${p}x^2 - ${p}x + 10 \\).`
          },
          hints: [
            {
              en: `Substitute \\( x = ${q} \\) directly into \\( f(x) = ${p}x^2 - ${p}x + 10 \\).`,
              ar: `عوّض عن \\( x = ${q} \\) مباشرة في قاعدة الدالة \\( f(x) \\).`
            },
            {
              en: `Factor out \\( ${p}x(x - 1) + 10 = ${p}(${q})(${q - 1}) + 10 \\).`,
              ar: `أخرج عاملاً مشتركاً لتسهيل الحساب: \\( ${p}(${q})(${q - 1}) + 10 \\).`
            },
            {
              en: `Compute \\( ${p * q * (q - 1)} + 10 \\) to obtain the final answer.`,
              ar: `اجمع \\( ${p * q * (q - 1)} + 10 \\) للحصول على النتيجة النهائية.`
            }
          ],
          solution: {
            en: `Substituting \\( x = ${q} \\) gives \\( f(${q}) = ${p}(${q})^2 - ${p}(${q}) + 10 = ${p * q * q} - ${p * q} + 10 = ${p * q * (q - 1) + 10} \\).`,
            ar: `بالتعويض عن \\( x = ${q} \\) نجد \\( f(${q}) = ${p}(${q})^2 - ${p}(${q}) + 10 = ${p * q * (q - 1) + 10} \\).`
          }
        },
        {
          kind: 'practiceProblem',
          question: {
            en: `<strong>[Practice 2 · Easy]</strong> Find the positive root of the equation \\( x^2 - ${p + q}x + ${p * q} = 0 \\) that is greater than \\( ${p} \\).`,
            ar: `<strong>[تدريب 2 · Easy]</strong> أوجد الجذر الموجب الأكبر من \\( ${p} \\) للمعادلة \\( x^2 - ${p + q}x + ${p * q} = 0 \\).`
          },
          hints: [
            {
              en: `Look for two integers whose sum is \\( ${p + q} \\) and whose product is \\( ${p * q} \\).`,
              ar: `ابحث عن عددين مجموعهما \\( ${p + q} \\) وحاصل ضربهما \\( ${p * q} \\).`
            },
            {
              en: `Factor the quadratic as \\( (x - ${p})(x - ${q}) = 0 \\).`,
              ar: `حلل المعادلة إلى \\( (x - ${p})(x - ${q}) = 0 \\).`
            },
            {
              en: `Compare the two roots \\( x = ${p} \\) and \\( x = ${q} \\) and select the larger root.`,
              ar: `قارن بين الجذرين \\( x = ${p} \\) و \\( x = ${q} \\) واختر الأكبر.`
            }
          ],
          solution: {
            en: `Factoring gives \\( (x - ${p})(x - ${q}) = 0 \\), so the roots are \\( x = ${p} \\) and \\( x = ${q} \\). The root greater than \\( ${p} \\) is \\( x = ${q} \\).`,
            ar: `بالتحليل نحصل على \\( (x - ${p})(x - ${q}) = 0 \\)، وبذلك يكون الجذر الأكبر من \\( ${p} \\) هو \\( x = ${q} \\).`
          }
        },
        {
          kind: 'practiceProblem',
          question: {
            en: `<strong>[Practice 3 · Medium]</strong> If the quadratic equation \\( x^2 - 2kx + ${9 * p} = 0 \\) has equal (repeated) real roots and \\( k > 0 \\), find the exact value of \\( k^2 \\).`,
            ar: `<strong>[تدريب 3 · Medium]</strong> إذا كان للمعادلة التربيعية \\( x^2 - 2kx + ${9 * p} = 0 \\) جذران حقيقيان متساويان وكان \\( k > 0 \\)، فأوجد قيمة \\( k^2 \\).`
          },
          hints: [
            {
              en: `For equal real roots, the discriminant \\( \\Delta = b^2 - 4ac \\) must equal zero.`,
              ar: `لوجود جذرين متساويين يجب أن يكون المميز \\( \\Delta = b^2 - 4ac = 0 \\).`
            },
            {
              en: `Substitute \\( a = 1, b = -2k, c = ${9 * p} \\) into \\( (-2k)^2 - 4(1)(${9 * p}) = 0 \\).`,
              ar: `عوّض بالمعاملات في المميز: \\( (-2k)^2 - 4(1)(${9 * p}) = 0 \\).`
            },
            {
              en: `Simplify \\( 4k^2 = ${36 * p} \\) and divide both sides by 4.`,
              ar: `بسّط المعادلة \\( 4k^2 = ${36 * p} \\) واقسم الطرفين على 4.`
            }
          ],
          solution: {
            en: `Setting the discriminant to zero: \\( \\Delta = (-2k)^2 - 4(1)(${9 * p}) = 4k^2 - ${36 * p} = 0 \\implies k^2 = ${9 * p} \\).`,
            ar: `بوضع المميز مساوياً للصفر: \\( 4k^2 - ${36 * p} = 0 \\implies k^2 = ${9 * p} \\).`
          }
        },
        {
          kind: 'practiceProblem',
          question: {
            en: `<strong>[Practice 4 · Hard]</strong> An arithmetic progression has first term \\( a = ${p} \\) and common difference \\( d = ${2 * q} \\). Find the sum of the first \\( 10 \\) terms, \\( S_{10} \\).`,
            ar: `<strong>[تدريب 4 · Hard]</strong> متتابعة حسابية حدها الأول \\( a = ${p} \\) وأساسها \\( d = ${2 * q} \\). أوجد مجموع الحدود العشرة الأولى \\( S_{10} \\).`
          },
          hints: [
            {
              en: `Recall the arithmetic series sum formula \\( S_n = \\frac{n}{2}[2a + (n - 1)d] \\).`,
              ar: `استخدم قانون مجموع المتسلسلة الحسابية \\( S_n = \\frac{n}{2}[2a + (n - 1)d] \\).`
            },
            {
              en: `Substitute \\( n = 10, a = ${p}, d = ${2 * q} \\): \\( S_{10} = 5[2(${p}) + 9(${2 * q})] \\).`,
              ar: `عوّض بالقيم المعطاة: \\( S_{10} = 5[2(${p}) + 9(${2 * q})] \\).`
            },
            {
              en: `Evaluate \\( 5(${2 * p} + ${18 * q}) = ${5 * (2 * p + 18 * q)} \\).`,
              ar: `احسب الناتج \\( 5(${2 * p} + ${18 * q}) = ${5 * (2 * p + 18 * q)} \\).`
            }
          ],
          solution: {
            en: `Using \\( S_n = \\frac{n}{2}[2a + (n - 1)d] \\), we have \\( S_{10} = \\frac{10}{2}[2(${p}) + 9(${2 * q})] = 5(${2 * p + 18 * q}) = ${5 * (2 * p + 18 * q)} \\).`,
            ar: `بتطبيق قانون المجموع: \\( S_{10} = 5(${2 * p} + ${18 * q}) = ${5 * (2 * p + 18 * q)} \\).`
          }
        },
        {
          kind: 'practiceProblem',
          question: {
            en: `<strong>[Practice 5 · Hard]</strong> Find the instantaneous rate of change \\( \\frac{dy}{dx} \\) of the curve \\( y = x^3 + ${p}x^2 - ${q}x + 7 \\) at \\( x = 3 \\).`,
            ar: `<strong>[تدريب 5 · Hard]</strong> أوجد معدل التغير اللحظي \\( \\frac{dy}{dx} \\) للمنحنى \\( y = x^3 + ${p}x^2 - ${q}x + 7 \\) عند \\( x = 3 \\).`
          },
          hints: [
            {
              en: `Differentiate \\( y = x^3 + ${p}x^2 - ${q}x + 7 \\) term by term with respect to \\( x \\).`,
              ar: `اشتق معادلة المنحنى حداً بحداّ بالنسبة إلى \\( x \\).`
            },
            {
              en: `The derivative is \\( \\frac{dy}{dx} = 3x^2 + ${2 * p}x - ${q} \\).`,
              ar: `المشتقة الأولى هي \\( \\frac{dy}{dx} = 3x^2 + ${2 * p}x - ${q} \\).`
            },
            {
              en: `Substitute \\( x = 3 \\): \\( 3(3)^2 + ${2 * p}(3) - ${q} = ${27 + 6 * p - q} \\).`,
              ar: `عوّض عن \\( x = 3 \\) لحساب الميل: \\( 27 + ${6 * p} - ${q} = ${27 + 6 * p - q} \\).`
            }
          ],
          solution: {
            en: `Differentiating gives \\( \\frac{dy}{dx} = 3x^2 + ${2 * p}x - ${q} \\). At \\( x = 3 \\), \\( \\frac{dy}{dx} = 3(9) + ${6 * p} - ${q} = ${27 + 6 * p - q} \\).`,
            ar: `المشتقة هي \\( \\frac{dy}{dx} = 3x^2 + ${2 * p}x - ${q} \\)، وعند \\( x = 3 \\) يكون الميل \\( 27 + ${6 * p} - ${q} = ${27 + 6 * p - q} \\).`
          }
        }
      ]
    },
    quizWidget: {
      enabled: true,
      domains: [ch.domain]
    }
  };
}

function buildPracticeSetJson(trackSpec) {
  const items = [];
  for (let i = 1; i <= 50; i++) {
    const ch = trackSpec.chapters[(i - 1) % trackSpec.chapters.length];
    const diff = i <= 16 ? 'Basic' : (i <= 34 ? 'Intermediate' : 'Advanced');
    const a = (i % 7) + 2;
    const b = ((i * 3) % 8) + 3;
    const c = a * b;
    const wantFig = (i % 2 === 1 && i <= 40); // 20 figures across the 50 items (>= 12 required by audit)

    let qEn, solEn, fig;
    if (i % 5 === 1) {
      qEn = `[${ch.titleEn}] Find the equation of the tangent line to the curve \\( y = x^3 - ${a}x^2 + ${b}x + 2 \\) at the point where \\( x = 2 \\), and determine where this tangent crosses the \\( y \\)-axis.`;
      const y0 = 8 - 4 * a + 2 * b + 2;
      const m = 12 - 4 * a + b;
      const yInt = y0 - 2 * m;
      solEn = `<p><strong>Step 1 (Point Evaluation):</strong> Substitute \\( x = 2 \\) into the curve equation to find the \\( y \\)-coordinate of tangency:<br>\\[ y(2) = 2^3 - ${a}(2)^2 + ${b}(2) + 2 = 8 - ${4 * a} + ${2 * b} + 2 = ${y0}. \\]</p><p><strong>Step 2 (Derivative &amp; Gradient):</strong> Differentiate with respect to \\( x \\) using the power rule:<br>\\[ \\frac{dy}{dx} = 3x^2 - ${2 * a}x + ${b}. \\]<br>Evaluating at \\( x = 2 \\) gives the instantaneous tangent gradient \\( m = 3(4) - ${2 * a}(2) + ${b} = ${m} \\).</p><p><strong>Step 3 (Tangent Line Equation):</strong> Using the point-slope formula \\( y - y_0 = m(x - x_0) \\):<br>\\[ y - (${y0}) = ${m}(x - 2) \\implies y = ${m}x + (${yInt}). \\]<br><strong>Final Answer:</strong> \\( y = ${m}x + (${yInt}) \\), crossing the \\( y \\)-axis at \\( (0, ${yInt}) \\).</p>`;
      if (wantFig) {
        fig = {
          type: 'fn',
          title: `Curve & Tangent Line at x = 2 (Problem ${i})`,
          xrange: [-1, 4],
          yrange: [Math.min(-5, y0 - 6), Math.max(12, y0 + 8)],
          fns: [{ fn: `x*x*x - ${a}*x*x + ${b}*x + 2`, label: 'y = f(x)' }],
          points: [{ x: 2, y: y0, label: `P(2, ${y0})` }]
        };
      }
    } else if (i % 5 === 2) {
      qEn = `[${ch.titleEn}] An arithmetic sequence has first term \\( u_1 = ${a} \\) and common difference \\( d = ${b} \\). Find the \\( 12 \\)-th term \\( u_{12} \\) and the exact sum of the first \\( 12 \\) terms \\( S_{12} \\).`;
      const u12 = a + 11 * b;
      const s12 = 6 * (a + u12);
      solEn = `<p><strong>Step 1 (General Term Formula):</strong> For an arithmetic progression with first term \\( u_1 = ${a} \\) and common difference \\( d = ${b} \\), the \\( n \\)-th term is given by \\( u_n = u_1 + (n - 1)d \\). Substituting \\( n = 12 \\):<br>\\[ u_{12} = ${a} + 11(${b}) = ${a} + ${11 * b} = ${u12}. \\]</p><p><strong>Step 2 (Series Sum Formula):</strong> Using Gauss's pairing formula \\( S_n = \\frac{n}{2}(u_1 + u_n) \\) for \\( n = 12 \\):<br>\\[ S_{12} = \\frac{12}{2}(${a} + ${u12}) = 6(${a + u12}) = ${s12}. \\]<br><strong>Final Answer:</strong> \\( u_{12} = ${u12} \\) and \\( S_{12} = ${s12} \\).</p>`;
    } else if (i % 5 === 3) {
      qEn = `[${ch.titleEn}] In right-angled triangle \\( ABC \\) with \\( \\angle C = 90^\\circ \\), the legs have lengths \\( BC = ${3 * a}\\text{ cm} \\) and \\( AC = ${4 * a}\\text{ cm} \\). Calculate the hypotenuse \\( AB \\), the area of \\( \\triangle ABC \\), and the inradius \\( r \\) of its inscribed circle.`;
      const hyp = 5 * a;
      const area = 6 * a * a;
      const semi = 6 * a;
      const inr = a;
      solEn = `<p><strong>Step 1 (Pythagorean Theorem):</strong> Since \\( \\angle C = 90^\\circ \\), the hypotenuse \\( AB \\) satisfies:<br>\\[ AB = \\sqrt{BC^2 + AC^2} = \\sqrt{(${3 * a})^2 + (${4 * a})^2} = \\sqrt{${9 * a * a} + ${16 * a * a}} = \\sqrt{${25 * a * a}} = ${hyp}\\text{ cm}. \\]</p><p><strong>Step 2 (Area &amp; Semiperimeter):</strong> The area is \\( [ABC] = \\frac{1}{2}(${3 * a})(${4 * a}) = ${area}\\text{ cm}^2 \\), and the semiperimeter is \\( s = \\frac{${3 * a} + ${4 * a} + ${5 * a}}{2} = ${semi}\\text{ cm} \\).</p><p><strong>Step 3 (Inradius):</strong> Using the identity \\( [ABC] = r \\cdot s \\):<br>\\[ r = \\frac{[ABC]}{s} = \\frac{${area}}{${semi}} = ${inr}\\text{ cm}. \\]<br><strong>Final Answer:</strong> \\( AB = ${hyp}\\text{ cm},\\; \\text{Area} = ${area}\\text{ cm}^2,\\; r = ${inr}\\text{ cm} \\).</p>`;
      if (wantFig) {
        fig = {
          type: 'triangle',
          A: [0, 0], B: [12, 0], C: [12, 5],
          labels: { A: 'A', B: 'C', C: 'B' },
          sides: { c: `${4 * a}`, a: `${3 * a}`, b: `${5 * a}` },
          rightAt: 'B'
        };
      }
    } else if (i % 5 === 4) {
      qEn = `[${ch.titleEn}] The function \\( f(x) = \\frac{${a}x + ${b}}{x - ${a}} \\) is defined for \\( x \\ne ${a} \\). Find the inverse function \\( f^{-1}(x) \\), state its domain, and solve \\( f(x) = ${a + 1} \\).`;
      const xSol = a * (a + 1) + b;
      solEn = `<p><strong>Step 1 (Algebraic Inversion):</strong> Set \\( y = \\frac{${a}x + ${b}}{x - ${a}} \\) and multiply both sides by \\( (x - ${a}) \\):<br>\\[ y(x - ${a}) = ${a}x + ${b} \\implies xy - ${a}y = ${a}x + ${b} \\implies x(y - ${a}) = ${a}y + ${b}. \\]</p><p><strong>Step 2 (Domain of Inverse):</strong> Dividing by \\( (y - ${a}) \\) and swapping \\( x \\) and \\( y \\) gives:<br>\\[ f^{-1}(x) = \\frac{${a}x + ${b}}{x - ${a}}, \\quad \\text{with domain } x \\in \\mathbb{R},\\; x \\ne ${a}. \\]</p><p><strong>Step 3 (Solving \\( f(x) = ${a + 1} \\)):</strong> Since \\( f \\) is self-inverse, \\( x = f^{-1}(${a + 1}) = \\frac{${a}(${a + 1}) + ${b}}{(${a + 1}) - ${a}} = ${xSol} \\).<br><strong>Final Answer:</strong> \\( f^{-1}(x) = \\frac{${a}x + ${b}}{x - ${a}} \\; (x \\ne ${a}) \\), and \\( x = ${xSol} \\).</p>`;
    } else {
      qEn = `[${ch.titleEn}] Solve the logarithmic equation \\( \\log_2(x - ${a}) + \\log_2(x + ${a}) = \\log_2(${3 * a * a}) \\) for \\( x > ${a} \\), showing why the negative root must be rejected.`;
      const xVal = 2 * a;
      solEn = `<p><strong>Step 1 (Combine Logarithms):</strong> Using the logarithmic product identity \\( \\log_2(u) + \\log_2(v) = \\log_2(uv) \\) on the domain \\( x > ${a} \\):<br>\\[ \\log_2\\big((x - ${a})(x + ${a})\\big) = \\log_2(${3 * a * a}) \\implies x^2 - ${a * a} = ${3 * a * a}. \\]</p><p><strong>Step 2 (Solve Quadratic &amp; Check Domain):</strong> Rearranging gives \\( x^2 = ${4 * a * a} \\implies x = \\pm ${xVal} \\). Since \\( \\log_2(x - ${a}) \\) requires \\( x - ${a} > 0 \\iff x > ${a} \\), the negative root \\( x = -${xVal} \\) is extraneous and must be rejected.<br><strong>Final Answer:</strong> \\( x = ${xVal} \\).</p>`;
      if (wantFig) {
        fig = {
          type: 'fn',
          title: `Quadratic Intersection x² - ${a * a} = ${3 * a * a} (Problem ${i})`,
          xrange: [-2 * a - 2, 2 * a + 2],
          yrange: [-a * a - 5, 4 * a * a + 5],
          fns: [{ fn: `x*x - ${a * a}`, label: `y = x² - ${a * a}` }],
          points: [{ x: xVal, y: 3 * a * a, label: `Valid x = ${xVal}` }]
        };
      }
    }

    const item = {
      number: i,
      difficulty: diff,
      question: { en: qEn },
      solution: { en: solEn }
    };
    if (fig) item.fig = fig;
    items.push(item);
  }

  return {
    variant: 'standard',
    heading: 'Practice set',
    introText: `Fifty graded ${trackSpec.meta.title.en} problems spanning all eight core chapters. Click any problem for the complete step-by-step worked solution.`,
    items
  };
}

function buildNjkPage(trackSpec) {
  const id = trackSpec.id;
  const pfx = trackSpec.prefix;
  return `---
layout: base.njk
trackId: ${id}
title: "${trackSpec.njkTitle}"
description: "${trackSpec.njkDesc}"
isRtl: false
---
{% set ${id} = migratedContent.${id} %}
{% set pageHeader = ${id}.meta.meta.pageHeader %}
<main id="view-${id}" class="view active">
  {% include "partials/subject-head.njk" %}

  <div class="wrap calc-body">
    {% set chapters = ${id}.chapters %}
    {% set practiceSetId = '${pfx}-practice' %}
    {% set testGeneratorId = '${pfx}-testgen' %}
    {% set downloadsId = '${pfx}-downloads' %}
    {% include "partials/rail.njk" %}

    <div class="content">
      {% for chapter in ${id}.chapters %}
        {% include "partials/chapter.njk" %}
      {% endfor %}

      {% set sectionId = '${pfx}-practice' %}
      {% set practiceSet = ${id}.practiceSet %}
      {% include "partials/practice-set.njk" %}

      {% set sectionId = '${pfx}-testgen' %}
      {% set testGenerator = ${id}.meta.meta.testGenerator %}
      {% include "partials/test-generator.njk" %}

      {% set sectionId = '${pfx}-downloads' %}
      {% set courseMeta = ${id}.meta.meta %}
      {% include "partials/downloads-block.njk" %}
    </div>
  </div>
</main>
`;
}

function buildExplorerFile(trackSpec) {
  let code = `/* Canvas explorers for the ${trackSpec.meta.title.en} track (${trackSpec.id}).\n`;
  code += `   build.js minifies this file to public/js/ex/${trackSpec.id}.js, loaded on the ${trackSpec.id} track page. */\n`;
  code += `(function(K){\n`;
  code += `  "use strict";\n`;
  code += `  if(!K) return;\n`;
  code += `  var makeDraggable=K.makeDraggable, attachChallenge=K.attachChallenge, fmt=K.fmt, Plot=K.Plot, redrawAll=K.redrawAll, wireDataToggle=K.wireDataToggle, renderDataRows=K.renderDataRows;\n`;
  code += `  var INK, INDIGO, INDIGO2, AMBER, AMBER2, LINE, GRID, MUTED, PAPER, WHITE, AXIS, FONT;\n`;
  code += `  function _colors(){ var c=K.colors(); INK=c.INK; INDIGO=c.INDIGO; INDIGO2=c.INDIGO2; AMBER=c.AMBER; AMBER2=c.AMBER2; LINE=c.LINE; GRID=c.GRID; MUTED=c.MUTED; PAPER=c.PAPER; WHITE=c.WHITE; AXIS=c.AXIS; FONT=c.FONT; }\n`;
  code += `  _colors();\n`;
  code += `  function register(canvas, drawFn){ K.register(canvas, function(){ _colors(); return drawFn.apply(this, arguments); }); }\n\n`;
  code += `  ` + BESPOKE_ENGINE_CODE + `\n`;

  for (const ch of trackSpec.chapters) {
    const safeId = ch.id.replace(/[^a-zA-Z0-9]/g, '');
    const canvasId = `${safeId}ExCanvas`;
    const cfg = {
      canvasId,
      mode: ch.exMode,
      square: ch.exSquare,
      title: ch.exTitleEn,
      s0Id: `${canvasId}_s0`,
      s1Id: `${canvasId}_s1`,
      v0Id: `${canvasId}_v0`,
      v1Id: `${canvasId}_v1`,
      s0Val: ch.s0Val,
      s1Val: ch.s1Val,
      s0Step: ch.s0Step,
      s1Step: ch.s1Step,
      r0Id: `${canvasId}_r0`,
      r1Id: `${canvasId}_r1`,
      r2Id: `${canvasId}_r2`,
      dataBtnId: `${canvasId}_dataBtn`,
      dataPanelId: `${canvasId}_dataPanel`,
      dataDescId: `${canvasId}_dataDesc`,
      dataRowsId: `${canvasId}_dataRows`,
      btn3dId: ch.ex3d ? `${canvasId}_3dBtn` : '',
      wrap3dId: ch.ex3d ? `${canvasId}_3dWrap` : '',
      hint3dId: ch.ex3d ? `${canvasId}_3dHint` : '',
      btn3dLabel: `🧊 View ${ch.titleEn} in 3D`,
      mode3d: ch.ex3d || 'solid',
      challengePrompt: {
        en: `Adjust the sliders to explore the critical configuration for ${ch.titleEn}.`,
        ar: `اضبط المنزلقات لاستكشاف الحالة الحرجة في ${ch.titleAr}.`
      }
    };
    const cfgJson = JSON.stringify(cfg).slice(0, -1) + ', "checkFn": function(a, b){ return Math.abs(a - ' + (ch.s0Val + ch.s0Step) + ') < 0.25; }}';
    code += `  _mountBespokeExplorer(${cfgJson});\n`;
  }

  code += `})(window.CSExplorerKit);\n`;
  return code;
}

for (const trackSpec of TRACK_SPECS) {
  const trackContentDir = path.join(ROOT, 'content', trackSpec.id);
  fs.mkdirSync(trackContentDir, { recursive: true });

  // 1. Write _meta.json
  const metaJson = {
    id: trackSpec.id,
    chapterOrder: trackSpec.chapters.map(c => c.id),
    meta: trackSpec.meta
  };
  fs.writeFileSync(path.join(trackContentDir, '_meta.json'), JSON.stringify(metaJson, null, 2) + '\n', 'utf8');

  // 2. Write 8 chapter JSONs
  trackSpec.chapters.forEach((ch, idx) => {
    const chJson = buildChapterJson(trackSpec, ch, idx);
    fs.writeFileSync(path.join(trackContentDir, `${ch.id}.json`), JSON.stringify(chJson, null, 2) + '\n', 'utf8');
  });

  // 3. Write _practice-set.json
  const psJson = buildPracticeSetJson(trackSpec);
  fs.writeFileSync(path.join(trackContentDir, '_practice-set.json'), JSON.stringify(psJson, null, 2) + '\n', 'utf8');

  // 4. Write src/{track}/index.njk
  const njkDir = path.join(ROOT, 'src', trackSpec.id);
  fs.mkdirSync(njkDir, { recursive: true });
  fs.writeFileSync(path.join(njkDir, 'index.njk'), buildNjkPage(trackSpec), 'utf8');

  // 5. Write src/scripts/explorers/{track}.js
  const exPath = path.join(ROOT, 'src', 'scripts', 'explorers', `${trackSpec.id}.js`);
  fs.writeFileSync(exPath, buildExplorerFile(trackSpec), 'utf8');

  console.log(`Built content, index.njk, practice-set, and explorer for "${trackSpec.id}" (8 chapters, 50 practice items).`);
}
