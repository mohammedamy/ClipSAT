#!/usr/bin/env node
/**
 * upgrade-qudrat-tahsili-chapters.js
 * ============================================================================
 * Comprehensive 2026 ETEC / Qiyas Syllabus & Tajmeeat Overhaul for:
 *   - GAT Qudrat (اختبار القدرات العامة - القسم الكمي: المحوسب والورقي) — 9 chapters + 50 practice items
 *   - SAAT Tahsili (الاختبار التحصيلي العلمي - نظام المسارات ١-٢-٣) — 10 chapters + 50 practice items
 *
 * Key upgrades:
 *   1. Replaces every generic placeholder figure ("Coordinate Curve & Tangent Analysis (2)",
 *      "Frequency Distribution (2)", "Harmonic Wave & Phase Profile (2)") with bespoke,
 *      topic-specific diagrams (shaded_region, conic_section, argand, triangle, circle, bar, etc.).
 *   2. Replaces every cloned "Worked Example A/B/C/D — Algebraic Structure & Vieta's Root Relations"
 *      callout with authentic ETEC/Qiyas Past-Paper (التجميعات) Golden Laws & Worked Examples.
 *   3. Wires the 6 new bespoke interactive explorers into their respective chapters:
 *      - qud-geometry -> qudShadedCanvas (Shaded Region Explorer)
 *      - qud-patterns -> qudClockCanvas (Clock Angle |30H - 5.5M| Explorer)
 *      - qud-word     -> qudMotionCanvas (Motion, Catch-up & Harmonic Speed Explorer)
 *      - tah-algebra  -> tahMatDetCanvas (2x2 Matrix Determinant & Singularity Explorer)
 *      - tah-geometry -> tahConicCanvas (Conic Sections & Eccentricity Explorer)
 *      - tah-stats    -> tahNormalCanvas (Normal Distribution 68-95-99.7% Explorer)
 *   4. Expands Tahsili chapters to cover 100% of the Saudi Secondary Pathways syllabus:
 *      - Year 1 (20%): Mathematical Logic & Conditional Statements (p -> q, contrapositive),
 *        Triangles, Polygons, Circle Theorems & Transformations.
 *      - Year 2 (30%): Matrices & Determinants & Cramer's Rule, Complex Numbers (i^n),
 *        Polynomials, Rational Functions, Sequences/Series & Trigonometry.
 *      - Year 3 (50%): Conic Sections (Parabola, Ellipse, Hyperbola, Eccentricity e=c/a),
 *        2D/3D Vectors & Dot/Cross Products, Polar Coordinates & De Moivre's Theorem,
 *        Normal Distribution (68-95-99.7%), Limits, Derivatives & Definite/Indefinite Integrals.
 *   5. Polishes all 50 Qudrat and 50 Tahsili practice-set items, stripping boilerplate filler
 *      and embedding 25+ rich, non-redundant diagrams in each set.
 */
'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const QUD_DIR = path.join(ROOT, 'content', 'qudrat');
const TAH_DIR = path.join(ROOT, 'content', 'tahsili');

// ── 1. Bespoke Chapter Figures (Replacing index-2 generic figures) ──────────
const CHAPTER_FIGURES = {
  'qud-about': {
    kind: 'figure',
    figure: {
      type: 'shaded_region',
      subtype: 'square_inscribed_circle',
      radius: 5,
      title: 'ETEC / Qiyas GAT Quantitative Blueprint (52 Q · 52 Min)'
    },
    caption: {
      en: 'Signature Qiyas Qudrat visual archetype: inscribed circle of radius r = 5 inside a square of side 10, where shaded corner area = r²(4 − π) = 25(4 − 3.14) = 21.5 cm².',
      ar: 'نموذج أصيل من رسوم قياس في القدرات: دائرة نصف قطرها r = 5 داخل مربع طول ضلعه 10، حيث مساحة الزوايا المظللة = نق²(4 − ط) = 25(4 − 3.14) = 21.5 سم².'
    }
  },
  'qud-arithmetic': {
    kind: 'figure',
    figure: {
      type: 'numberline',
      min: -2,
      max: 4,
      step: 1,
      title: 'Fractions, Powers & Radicals Ordering on the Real Number Line',
      points: [
        { x: -1.5, label: '-3/2', color: '#dc2626' },
        { x: 0.5, label: '1/2', color: '#2b5ba8' },
        { x: 0.75, label: '(√3)/2 ≈ 0.87', color: '#c8902a' },
        { x: 1.41, label: '√2 ≈ 1.41', color: '#10b981' },
        { x: 2.5, label: '5/2', color: '#2b5ba8' }
      ]
    },
    caption: {
      en: 'Ordering fractions, powers, and surds on the number line: for 0 < x < 1, squaring shrinks the value (x² < x < √x).',
      ar: 'ترتيب الكسور والقوى والجذور على خط الأعداد: للكسر الموجب الحقيقي 0 < س < 1، التربيع يصغّر القيمة والجذر يكبّرها (س² < س < √س).'
    }
  },
  'qud-ratio': {
    kind: 'figure',
    figure: {
      type: 'bar',
      title: 'Successive Percentage Changes & Zakat (2.5% = 1/40)',
      categories: ['Original (100%)', '+20% Markup (120)', '−20% Discount (96)', 'Zakat Base (40×Z)'],
      values: [100, 120, 96, 100]
    },
    caption: {
      en: 'A 20% increase followed by a 20% decrease yields 100 × 1.20 × 0.80 = 96 (a net 4% loss, never 0%).',
      ar: 'زيادة السعر ٢٠٪ ثم تخفيضه ٢٠٪ يعطي ١٠٠ × ١٫٢٠ × ٠٫٨٠ = ٩٦ (خسارة صافية ٤٪ وليس ثبات السعر).'
    }
  },
  'qud-algebra': {
    kind: 'figure',
    figure: {
      type: 'fn',
      title: 'Difference of Squares & Quadratic Identities: f(x) = x² − 4',
      xmin: -4,
      xmax: 4,
      ymin: -5,
      ymax: 6,
      fn: 'x*x - 4',
      fn2: 'x + 2',
      points: [
        { x: -2, y: 0, label: '(-2, 0)' },
        { x: 2, y: 0, label: '(2, 0)' },
        { x: 0, y: -4, label: 'Vertex (0, -4)' }
      ]
    },
    caption: {
      en: 'Geometric meaning of the golden identity x² − y² = (x − y)(x + y) and intersection of y = x² − 4 with y = x + 2 at x = −2 and x = 3.',
      ar: 'المعنى الهندسي لمتطابقة الفرق بين مربعين س² − ص² = (س − ص)(س + ص) وتقاطع المنحنى ص = س² − ٤ مع المستقيم ص = س + ٢.'
    }
  },
  'qud-geometry': {
    kind: 'figure',
    figure: {
      type: 'shaded_region',
      subtype: 'four_tangent_circles',
      radius: 6,
      title: 'Shaded Area Between Four Congruent Tangent Circles in a Square'
    },
    caption: {
      en: 'Four congruent tangent circles (each r = 3) inside a square of side 12: Shaded Area = 144 − 4(9π) = 144 − 36π = 36(4 − π) cm².',
      ar: 'أربع دوائر متطابقة ومتماسة (نصف قطر كل منها ٣) داخل مربع طول ضلعه ١٢: المساحة المظللة = ١٤٤ − ٣٦ط = ٣٦(٤ − ط) سم².'
    }
  },
  'qud-compare': {
    kind: 'figure',
    figure: {
      type: 'shaded_region',
      subtype: 'triangle_in_rectangle',
      base: 12,
      height: 8,
      title: 'Quantitative Comparison: Triangle Inscribed in Rectangle'
    },
    caption: {
      en: 'Classic Qiyas Comparison: A triangle sharing the base (12) and height (8) of a rectangle has Area = ½ × Rectangle Area (48 vs 48 → Option C: Equal).',
      ar: 'مقارنة هندسية شهيرة في قياس: مساحة المثلث المشترك مع المستطيل في القاعدة (١٢) والارتفاع (٨) تساوي نصف مساحة المستطيل تماماً (القيمتان متساويتان: ج).'
    }
  },
  'qud-patterns': {
    kind: 'figure',
    figure: {
      type: 'circle',
      radius: 6,
      labelR: 'Clock |30H − 5.5M|',
      chordAngle: 80,
      title: 'Clock Hands Angle at 3:20 → |30(3) − 5.5(20)| = 20°'
    },
    caption: {
      en: 'Clock angle formula: θ = |30H − 5.5M|. Every minute the minute hand advances 6° while the hour hand advances 0.5°.',
      ar: 'قانون زاوية الساعة في قياس: الزاوية = |٣٠ × الساعات − ٥٫٥ × الدقائق|. يتحرك عقرب الدقائق ٦ درجات في الدقيقة وعقرب الساعات نصف درجة.'
    }
  },
  'qud-data': {
    kind: 'figure',
    figure: {
      type: 'pie',
      title: 'Circular Sector Chart (Total = 360° = 100%)',
      slices: [
        { label: '90° (25%)', value: 25, color: '#2b5ba8' },
        { label: '108° (30%)', value: 30, color: '#c8902a' },
        { label: '72° (20%)', value: 20, color: '#10b981' },
        { label: '54° (15%)', value: 15, color: '#6366f1' },
        { label: '36° (10%)', value: 10, color: '#ec4899' }
      ]
    },
    caption: {
      en: 'Qiyas Pie Sector Conversion: 90° = 1/4 (25%), 72° = 1/5 (20%), 60° = 1/6, 54° = 15%, and 36° = 1/10 (10%).',
      ar: 'تحويلات القطاعات الدائرية في قياس: ٩٠° = الربع (٢٥٪)، ٧٢° = الخُمس (٢٠٪)، ٦٠° = السُدس، ٥٤° = ١٥٪، و ٣٦° = العُشر (١٠٪).'
    }
  },
  'qud-word': {
    kind: 'figure',
    figure: {
      type: 'fn',
      title: 'Uniform Motion: Catch-Up & Opposite-Direction Meeting',
      xmin: 0,
      xmax: 4,
      ymin: 0,
      ymax: 240,
      fn: '60*x + 60',
      fn2: '90*x',
      points: [
        { x: 0, y: 60, label: 'Head start 60 km' },
        { x: 2, y: 180, label: 'Catch-up (2 h, 180 km)' }
      ]
    },
    caption: {
      en: 'Catch-up geometry: Car 1 starts 60 km ahead at 60 km/h; Car 2 chases at 90 km/h and catches up at t = Δd / (v₂ − v₁) = 60 / 30 = 2 hours.',
      ar: 'تمثيل زمن اللحاق: السيارة الأولى متقدمة ٦٠ كم بسرعة ٦٠ كم/س، والثانية تطاردها بسرعة ٩٠ كم/س فتلحق بها بعد زمن = المسافة ÷ فرق السرعتين = ٦٠ ÷ ٣٠ = ساعتين.'
    }
  },
  'tah-about': {
    kind: 'figure',
    figure: {
      type: 'conic_section',
      subtype: 'ellipse',
      a: 5,
      b: 3,
      title: 'SAAT Tahsili Pathways Focus (50% Year 3 · 30% Year 2 · 20% Year 1)'
    },
    caption: {
      en: 'Year 3 Secondary topics (Conic Sections, Vectors, Polar Coordinates, Normal Distribution & Calculus) represent 50% of the SAAT Tahsili exam.',
      ar: 'تمثل موضوعات الصف الثالث الثانوي (القطوع المخروطية، المتجهات، الإحداثيات القطبية، التوزيع الطبيعي، والتفاضل والتكامل) ٥٠٪ من أسئلة الاختبار التحصيلي.'
    }
  },
  'tah-algebra': {
    kind: 'figure',
    figure: {
      type: 'argand',
      title: 'Complex Plane (Argand Diagram) & Powers of i',
      points: [
        { re: 3, im: 4, label: 'z = 3 + 4i (|z| = 5)', color: '#2b5ba8' },
        { re: 3, im: -4, label: 'z̄ = 3 − 4i', color: '#c8902a' },
        { re: 0, im: 1, label: 'i (90°)', color: '#10b981' },
        { re: -1, im: 0, label: 'i² = −1', color: '#dc2626' }
      ]
    },
    caption: {
      en: 'Complex conjugate pair z = 3 + 4i and z̄ = 3 − 4i with modulus |z| = 5, z·z̄ = 25, and the 4-cycle of imaginary powers i, −1, −i, 1.',
      ar: 'العددان المركبان المترافقان z = 3 + 4i و z̄ = 3 − 4i بمقياس |z| = 5 وحاصل ضرب z·z̄ = 25، ودورة قوى الوحدة التخيلية (i, −1, −i, 1).'
    }
  },
  'tah-functions': {
    kind: 'figure',
    figure: {
      type: 'fn',
      title: 'Rational Function Asymptotes & Holes: f(x) = (2x − 1)/(x − 2)',
      xmin: -4,
      xmax: 7,
      ymin: -6,
      ymax: 8,
      fn: '(2*x - 1)/(x - 2)',
      fn2: '2',
      asymptoteX: 2,
      points: [
        { x: 0.5, y: 0, label: 'Root (0.5, 0)' },
        { x: 0, y: 0.5, label: '(0, 0.5)' }
      ]
    },
    caption: {
      en: 'Rational function f(x) = (2x − 1)/(x − 2) showing vertical asymptote x = 2 (zero of denominator) and horizontal asymptote y = 2 (ratio of leading coefficients).',
      ar: 'الدالة النسبية f(x) = (2x − 1)/(x − 2) مع خط التقارب الرأسي x = 2 (أصفار المقام) وخط التقارب الأفقي y = 2 (نسبة المعاملين الرئيسيين).'
    }
  },
  'tah-sequences': {
    kind: 'figure',
    figure: {
      type: 'fn',
      title: 'Convergent Infinite Geometric Series (|r| = 1/2 < 1, S∞ = a₁/(1 − r))',
      xmin: 1,
      xmax: 7,
      ymin: 0,
      ymax: 17,
      fn: '16*(1 - Math.pow(0.5, x))',
      fn2: '16',
      points: [
        { x: 1, y: 8, label: 'S₁ = 8' },
        { x: 2, y: 12, label: 'S₂ = 12' },
        { x: 3, y: 14, label: 'S₃ = 14' },
        { x: 4, y: 15, label: 'S₄ = 15 → S∞ = 16' }
      ]
    },
    caption: {
      en: 'Partial sums Sₙ of 8 + 4 + 2 + 1 + ⋯ approaching the infinite geometric sum S∞ = 8 / (1 − 1/2) = 16.',
      ar: 'المجاميع الجزئية للمتسلسلة الهندسية اللانهائية المتقاربة 8 + 4 + 2 + 1 + ⋯ تقترب من المجموع اللانهائي S∞ = 8 / (1 − 1/2) = 16.'
    }
  },
  'tah-trig': {
    kind: 'figure',
    figure: {
      type: 'triangle',
      a: 5,
      b: 12,
      c: 13,
      angleA: 'θ',
      angleC: '90°',
      labelA: 'Opp = 5',
      labelB: 'Adj = 12',
      labelC: 'Hyp = 13',
      title: 'Pythagorean Trigonometric Triple (5-12-13) & ASTC Signs'
    },
    caption: {
      en: 'Classic Tahsili right-triangle ratio setup: if sin θ = 5/13 in Quadrant II, then cos θ = −12/13, tan θ = −5/12, and sin(2θ) = 2 sin θ cos θ = −120/169.',
      ar: 'مثلث النسب المثلثية الشهير (5-12-13) في التحصيلي: إذا كان sin θ = 5/13 في الربع الثاني فإن cos θ = −12/13 و sin(2θ) = 2 sin θ cos θ = −120/169.'
    }
  },
  'tah-geometry': {
    kind: 'figure',
    figure: {
      type: 'conic_section',
      subtype: 'hyperbola',
      a: 4,
      b: 3,
      title: 'Conic Sections: Hyperbola x²/16 − y²/9 = 1 (Foci c = 5, Asymptotes y = ±¾x)'
    },
    caption: {
      en: 'Hyperbola x²/16 − y²/9 = 1 with vertices (±4, 0), foci (±5, 0) where c² = a² + b² = 25, eccentricity e = 5/4, and asymptotes y = ±(3/4)x.',
      ar: 'القطع الزائد x²/16 − y²/9 = 1 برأسيه (±4, 0) وبؤرتيه (±5, 0) حيث c² = a² + b² = 25، واختلافه المركزي e = 5/4، وخطا تقاربه y = ±(3/4)x.'
    }
  },
  'tah-calc1': {
    kind: 'figure',
    figure: {
      type: 'fn',
      title: 'Critical Points, Local Extrema & Inflection of f(x) = x³ − 3x',
      xmin: -2.6,
      xmax: 2.6,
      ymin: -4,
      ymax: 4,
      fn: 'x*x*x - 3*x',
      fn2: '3*x*x - 3',
      points: [
        { x: -1, y: 2, label: 'Max (-1, 2)' },
        { x: 1, y: -2, label: 'Min (1, -2)' },
        { x: 0, y: 0, label: 'Inflection (0, 0)' }
      ]
    },
    caption: {
      en: 'Cubic f(x) = x³ − 3x (indigo) and its derivative f′(x) = 3x² − 3 (amber): critical points occur where f′(x) = 0 at x = −1 (local max 2) and x = 1 (local min −2).',
      ar: 'الدالة التكعيبية f(x) = x³ − 3x ومشتقتها f′(x) = 3x² − 3: النقاط الحرجة عند f′(x) = 0 هي x = −1 (عظمى محلية 2) و x = 1 (صغرى محلية −2).'
    }
  },
  'tah-calc2': {
    kind: 'figure',
    figure: {
      type: 'fn',
      title: 'Definite Integral & Area Enclosed: ∫₀³ (3x − x²) dx = 9/2',
      xmin: -0.5,
      xmax: 3.5,
      ymin: -1,
      ymax: 3,
      fn: '3*x - x*x',
      shade: { from: 0, to: 3 },
      points: [
        { x: 0, y: 0, label: '(0, 0)' },
        { x: 1.5, y: 2.25, label: 'Vertex (1.5, 2.25)' },
        { x: 3, y: 0, label: '(3, 0)' }
      ]
    },
    caption: {
      en: 'Area under y = 3x − x² from x = 0 to x = 3: by the Fundamental Theorem of Calculus, A = [3x²/2 − x³/3]₀³ = 27/2 − 9 = 9/2 = 4.5.',
      ar: 'المساحة المحصورة تحت المنحنى y = 3x − x² من x = 0 إلى x = 3: بالتكامل المحدد A = [3x²/2 − x³/3]₀³ = 27/2 − 9 = 4.5 وحدة مربعة.'
    }
  },
  'tah-explog': {
    kind: 'figure',
    figure: {
      type: 'fn',
      title: 'Exponential Growth y = 2ˣ & Logarithmic Inverse y = log₂(x)',
      xmin: -3,
      xmax: 5,
      ymin: -3,
      ymax: 5,
      fn: 'Math.pow(2, x)',
      fn2: 'x > 0 ? Math.log2(x) : NaN',
      points: [
        { x: 0, y: 1, label: '(0, 1)' },
        { x: 1, y: 0, label: '(1, 0)' },
        { x: 2, y: 4, label: '(2, 4)' },
        { x: 4, y: 2, label: '(4, 2)' }
      ]
    },
    caption: {
      en: 'Symmetry of y = 2ˣ (horizontal asymptote y = 0, domain ℝ) and y = log₂(x) (vertical asymptote x = 0, domain (0, ∞)) across y = x.',
      ar: 'تناظر الدالة الأسية y = 2ˣ (خط تقارب أفقي y = 0) والدالة اللوغاريتمية العكسية y = log₂(x) (خط تقارب رأسي x = 0 ومجالها x > 0) حول المستقيم y = x.'
    }
  },
  'tah-stats': {
    kind: 'figure',
    figure: {
      type: 'normal_curve',
      mean: 50,
      sd: 10,
      shadeFrom: 40,
      shadeTo: 60,
      title: 'Empirical Rule (68%–95%–99.7%) on Normal Distribution N(50, 10²)'
    },
    caption: {
      en: 'Normal distribution with μ = 50, σ = 10: 68% of values lie in [40, 60], 95% in [30, 70], 99.7% in [20, 80], and 16% exceed μ + σ = 60.',
      ar: 'التوزيع الطبيعي بمتوسط μ = 50 وانحراف معياري σ = 10: يقع 68% من البيانات في [40, 60]، و95% في [30, 70]، و99.7% في [20, 80]، بينما 16% أكبر من 60.'
    }
  }
};

// ── 2. Bespoke Interactive Explorer Blocks for the 6 Upgraded Chapters ──────
const NEW_EXPLORERS = {
  'qud-geometry': {
    kind: 'explorer',
    title: {
      en: '⊙ Explorer · Shaded Region Geometry Lab (مساحة الجزء المظلل)',
      ar: '⊙ مستكشف تفاعلي · مختبر مساحة الجزء المظلل في قياس'
    },
    canvasId: 'qudShadedCanvas',
    ariaLabel: {
      en: 'Interactive Qiyas shaded region explorer comparing square with inscribed circle, circle with inscribed square, and four tangent circles',
      ar: 'مستكشف تفاعلي لمساحات الأجزاء المظللة في اختبار القدرات (مربع بداخله دائرة، دائرة بداخلها مربع، وأربع دوائر متماسة)'
    },
    dataPanel: {
      btnId: 'qudShadedDataBtn',
      panelId: 'qudShadedDataPanel',
      descId: 'qudShadedDataDesc',
      rowsId: 'qudShadedDataRows',
      caption: {
        en: 'Exact and approximate (π ≈ 3.14) areas for the selected Qudrat shaded figure',
        ar: 'القيم الدقيقة والتقريبية (ط ≈ ٣٫١٤) لمساحة الجزء المظلل'
      },
      columns: [
        { en: 'Metric', ar: 'المعيار الهندسي' },
        { en: 'Value', ar: 'القيمة' }
      ]
    },
    controls: [
      {
        id: 'qudShadedR',
        valueDisplayId: 'qudShadedRV',
        label: { en: 'Radius <b>r =</b>', ar: 'نصف القطر <b>نق =</b>' },
        ariaLabel: { en: 'Radius r', ar: 'نصف القطر نق' },
        min: 2,
        max: 12,
        value: 6,
        step: 1
      },
      {
        id: 'qudShadedMode',
        valueDisplayId: 'qudShadedModeV',
        label: { en: 'Pattern <b>(1–3) =</b>', ar: 'الشكل الهندسي <b>(١–٣) =</b>' },
        ariaLabel: { en: 'Shaded configuration mode', ar: 'نمط الشكل الهندسي' },
        min: 1,
        max: 3,
        value: 1,
        step: 1
      }
    ],
    readouts: [
      {
        id: 'qudShadedExact',
        label: { en: 'Exact Formula', ar: 'الصيغة الدقيقة' },
        colorClass: 'indigo',
        value: '36(4 − π)'
      },
      {
        id: 'qudShadedApprox',
        label: { en: 'Shaded Area (π ≈ 3.14)', ar: 'المساحة المظللة (ط ≈ ٣٫١٤)' },
        colorClass: 'amber',
        value: '30.96'
      },
      {
        id: 'qudShadedOuter',
        label: { en: 'Outer Area', ar: 'المساحة الكلية الخارجية' },
        value: '144.0'
      }
    ],
    note: {
      en: 'Mode 1 (Square − Circle) and Mode 3 (Square − 4 Tangent Circles) both have shaded area \\( r^2(4-\\pi) \\approx 0.86\\,r^2 \\); Mode 2 (Circle − Inscribed Square) has shaded area \\( r^2(\\pi-2) \\approx 1.14\\,r^2 \\).',
      ar: 'النمط ١ (مربع بداخله دائرة) والنمط ٣ (مربع بداخله ٤ دوائر متماسة) كلاهما يعطي مساحة مظللة \\( r^2(4-\\pi) \\approx 0.86\\,r^2 \\)؛ أما النمط ٢ (دائرة بداخلها مربع) فيعطي \\( r^2(\\pi-2) \\approx 1.14\\,r^2 \\).'
    }
  },
  'qud-patterns': {
    kind: 'explorer',
    title: {
      en: '⊙ Explorer · Clock Hands Angle Lab |30H − 5.5M|',
      ar: '⊙ مستكشف تفاعلي · مختبر زاوية عقربي الساعة |30H − 5.5M|'
    },
    canvasId: 'qudClockCanvas',
    ariaLabel: {
      en: 'Interactive clock face calculating the minor and reflex angles between the hour and minute hands',
      ar: 'ساعة تفاعلية لحساب الزاوية الصغرى والكبرى بين عقربي الساعات والدقائق'
    },
    dataPanel: {
      btnId: 'qudClockDataBtn',
      panelId: 'qudClockDataPanel',
      descId: 'qudClockDataDesc',
      rowsId: 'qudClockDataRows',
      caption: {
        en: 'Clock hand positions and angles for the selected hour H and minute M',
        ar: 'مواقع العقارب والزوايا عند الساعة H والدقيقة M'
      },
      columns: [
        { en: 'Quantity', ar: 'المقدار' },
        { en: 'Angle / Value', ar: 'القيمة / الزاوية' }
      ]
    },
    controls: [
      {
        id: 'qudClkH',
        valueDisplayId: 'qudClkHV',
        label: { en: 'Hour <b>H =</b>', ar: 'الساعات <b>H =</b>' },
        ariaLabel: { en: 'Hour H', ar: 'الساعة H' },
        min: 1,
        max: 12,
        value: 3,
        step: 1
      },
      {
        id: 'qudClkM',
        valueDisplayId: 'qudClkMV',
        label: { en: 'Minute <b>M =</b>', ar: 'الدقائق <b>M =</b>' },
        ariaLabel: { en: 'Minute M', ar: 'الدقائق M' },
        min: 0,
        max: 55,
        value: 20,
        step: 5
      }
    ],
    readouts: [
      {
        id: 'qudClkTime',
        label: { en: 'Time', ar: 'الوقت' },
        value: '3:20'
      },
      {
        id: 'qudClkAngle',
        label: { en: 'Minor Angle', ar: 'الزاوية الصغرى' },
        colorClass: 'indigo',
        value: '20.0°'
      },
      {
        id: 'qudClkReflex',
        label: { en: 'Major (Reflex) Angle', ar: 'الزاوية الكبرى' },
        colorClass: 'amber',
        value: '340.0°'
      }
    ],
    note: {
      en: 'Qiyas Rule: \\( \\theta = |30H - 5.5M| \\). If the result exceeds \\( 180^\\circ \\), subtract from \\( 360^\\circ \\) to obtain the minor angle.',
      ar: 'قانون قياس السريع: \\( \\theta = |30H - 5.5M| \\). إذا زاد الناتج عن \\( 180^\\circ \\) نطرحه من \\( 360^\\circ \\) لإيجاد الزاوية الصغرى.'
    }
  },
  'qud-word': {
    kind: 'explorer',
    title: {
      en: '⊙ Explorer · Speed, Catch-Up & Harmonic Mean Lab',
      ar: '⊙ مستكشف تفاعلي · مختبر السرعة وزمن الالتقاء واللحاق'
    },
    canvasId: 'qudMotionCanvas',
    ariaLabel: {
      en: 'Interactive uniform motion explorer showing meeting time, catch-up time, and round-trip harmonic average speed',
      ar: 'مستكشف تفاعلي لحساب متوسط السرعة ذهاباً وإياباً وزمن الالتقاء وزمن اللحاق'
    },
    dataPanel: {
      btnId: 'qudMotionDataBtn',
      panelId: 'qudMotionDataPanel',
      descId: 'qudMotionDataDesc',
      rowsId: 'qudMotionDataRows',
      caption: {
        en: 'Uniform motion metrics for speeds v₁ and v₂ over a 180 km road',
        ar: 'مقاييس الحركة المنتظمة للسرعتين ع١ و ع٢ على طريق طوله ١٨٠ كم'
      },
      columns: [
        { en: 'Motion Metric', ar: 'المعيار الحركي' },
        { en: 'Value', ar: 'القيمة' }
      ]
    },
    controls: [
      {
        id: 'qudMotV1',
        valueDisplayId: 'qudMotV1V',
        label: { en: 'Speed <b>v₁ =</b>', ar: 'السرعة الأولى <b>ع₁ =</b>' },
        ariaLabel: { en: 'First vehicle speed v1', ar: 'السرعة الأولى' },
        min: 30,
        max: 120,
        value: 60,
        step: 10
      },
      {
        id: 'qudMotV2',
        valueDisplayId: 'qudMotV2V',
        label: { en: 'Speed <b>v₂ =</b>', ar: 'السرعة الثانية <b>ع₂ =</b>' },
        ariaLabel: { en: 'Second vehicle speed v2', ar: 'السرعة الثانية' },
        min: 40,
        max: 150,
        value: 90,
        step: 10
      }
    ],
    readouts: [
      {
        id: 'qudMotHarm',
        label: { en: 'Round-Trip Avg Speed', ar: 'متوسط السرعة ذهاباً وإياباً' },
        colorClass: 'indigo',
        value: '72.0 كم/س'
      },
      {
        id: 'qudMotMeet',
        label: { en: 'Opposite Meeting (180 km)', ar: 'زمن الالتقاء (١٨٠ كم)' },
        colorClass: 'amber',
        value: '1.20 ساعة'
      },
      {
        id: 'qudMotCatch',
        label: { en: 'Catch-Up (1h head start)', ar: 'زمن اللحاق (تقدم ساعة)' },
        value: '2.00 ساعة'
      }
    ],
    note: {
      en: 'Never average two speeds using \\( (v_1+v_2)/2 \\)! For an equal-distance round trip, average speed is the harmonic mean \\( \\frac{2v_1v_2}{v_1+v_2} \\).',
      ar: 'احذر من فخ حساب متوسط السرعة بالوسط الحسابي \\( (v_1+v_2)/2 \\)! القانون الصحيح ذهاباً وإياباً هو \\( \\frac{2v_1v_2}{v_1+v_2} \\).'
    }
  },
  'tah-algebra': {
    kind: 'explorer',
    title: {
      en: '⊙ Explorer · 2×2 Matrix Determinant & Singularity Lab',
      ar: '⊙ مستكشف تفاعلي · مختبر المصفوفات والمحددات والنظير الضربي'
    },
    canvasId: 'tahMatDetCanvas',
    ariaLabel: {
      en: 'Interactive 2x2 matrix column vector parallelogram showing determinant area and invertibility condition',
      ar: 'مستكشف تفاعلي لمحددة المصفوفة ٢×٢ ومساحة متوازي الأضلاع وشرط وجود النظير الضربي'
    },
    dataPanel: {
      btnId: 'tahMatDetDataBtn',
      panelId: 'tahMatDetDataPanel',
      descId: 'tahMatDetDataDesc',
      rowsId: 'tahMatDetDataRows',
      caption: {
        en: 'Matrix determinant det(A) = ad − bc and invertibility status for A = [[a, 2], [1, d]]',
        ar: 'قيمة المحددة det(A) = ad − bc وحالة النظير الضربي للمصفوفة A = [[a, 2], [1, d]]'
      },
      columns: [
        { en: 'Matrix Property', ar: 'الخاصية' },
        { en: 'Value', ar: 'القيمة' }
      ]
    },
    controls: [
      {
        id: 'tahMatA',
        valueDisplayId: 'tahMatAV',
        label: { en: 'Entry <b>a₁₁ =</b>', ar: 'العنصر <b>a₁₁ =</b>' },
        ariaLabel: { en: 'Matrix entry a', ar: 'العنصر a' },
        min: -4,
        max: 5,
        value: 3,
        step: 1
      },
      {
        id: 'tahMatD',
        valueDisplayId: 'tahMatDV',
        label: { en: 'Entry <b>a₂₂ =</b>', ar: 'العنصر <b>a₂₂ =</b>' },
        ariaLabel: { en: 'Matrix entry d', ar: 'العنصر d' },
        min: -4,
        max: 5,
        value: 2,
        step: 1
      }
    ],
    readouts: [
      {
        id: 'tahMatDet',
        label: { en: 'Determinant |A| = ad − bc', ar: 'المحددة |A| = ad − bc' },
        colorClass: 'indigo',
        value: '4'
      },
      {
        id: 'tahMatArea',
        label: { en: 'Parallelogram Area', ar: 'مساحة متوازي الأضلاع' },
        colorClass: 'amber',
        value: '4'
      },
      {
        id: 'tahMatInv',
        label: { en: 'Inverse Status', ar: 'حالة النظير الضربي' },
        value: 'لها نظير ضربي A⁻¹'
      }
    ],
    note: {
      en: 'Tahsili High-Yield Rule: A 2×2 matrix \\( A = \\begin{pmatrix}a & b\\\\c & d\\end{pmatrix} \\) has no multiplicative inverse (is singular) if and only if \\( |A| = ad - bc = 0 \\) (try setting \\( a_{11}=1, a_{22}=2 \\)).',
      ar: 'قاعدة ذهبية في التحصيلي: المصفوفة \\( A = \\begin{pmatrix}a & b\\\\c & d\\end{pmatrix} \\) ليس لها نظير ضربي (منفردة) إذا وفقط إذا كان \\( |A| = ad - bc = 0 \\) (جرّب ضبط \\( a_{11}=1, a_{22}=2 \\)).'
    }
  },
  'tah-geometry': {
    kind: 'explorer',
    title: {
      en: '⊙ Explorer · Conic Sections, Foci & Eccentricity Lab (القطوع المخروطية)',
      ar: '⊙ مستكشف تفاعلي · مختبر القطوع المخروطية والبؤر والاختلاف المركزي'
    },
    canvasId: 'tahConicCanvas',
    ariaLabel: {
      en: 'Interactive conic section explorer showing ellipse and hyperbola foci, vertices, asymptotes, and eccentricity e = c/a',
      ar: 'مستكشف تفاعلي للقطع الناقص والقطع الزائد يوضح البؤرتين والرأسين وخطي التقارب والاختلاف المركزي e = c/a'
    },
    dataPanel: {
      btnId: 'tahConicDataBtn',
      panelId: 'tahConicDataPanel',
      descId: 'tahConicDataDesc',
      rowsId: 'tahConicDataRows',
      caption: {
        en: 'Semi-axes a, b, focal distance c, and eccentricity e = c/a',
        ar: 'نصفا المحورين a و b، البعد البؤري c، والاختلاف المركزي e = c/a'
      },
      columns: [
        { en: 'Conic Parameter', ar: 'المعامل الهندسي' },
        { en: 'Value', ar: 'القيمة' }
      ]
    },
    controls: [
      {
        id: 'tahConicA',
        valueDisplayId: 'tahConicAV',
        label: { en: 'Semi-axis <b>a =</b>', ar: 'نصف المحور <b>a =</b>' },
        ariaLabel: { en: 'Semi-axis a', ar: 'نصف المحور a' },
        min: 2,
        max: 6,
        value: 4,
        step: 1
      },
      {
        id: 'tahConicB',
        valueDisplayId: 'tahConicBV',
        label: { en: 'Semi-axis <b>b =</b>', ar: 'نصف المحور <b>b =</b>' },
        ariaLabel: { en: 'Semi-axis b', ar: 'نصف المحور b' },
        min: 1,
        max: 5,
        value: 3,
        step: 1
      },
      {
        id: 'tahConicMode',
        valueDisplayId: 'tahConicModeV',
        label: { en: 'Type <b>(1=Ellipse, 2=Hyperbola)</b>', ar: 'النوع <b>(١=ناقص، ٢=زائد)</b>' },
        ariaLabel: { en: 'Conic type', ar: 'نوع القطع المخروطي' },
        min: 1,
        max: 2,
        value: 1,
        step: 1
      }
    ],
    readouts: [
      {
        id: 'tahConicC',
        label: { en: 'Focal Distance c', ar: 'البعد البؤري c' },
        colorClass: 'indigo',
        value: '2.65'
      },
      {
        id: 'tahConicEcc',
        label: { en: 'Eccentricity e = c/a', ar: 'الاختلاف المركزي e = c/a' },
        colorClass: 'amber',
        value: '0.66'
      },
      {
        id: 'tahConicType',
        label: { en: 'Classification', ar: 'تصنيف القطع' },
        value: 'قطع ناقص (0 < e < 1)'
      }
    ],
    note: {
      en: 'For an ellipse, \\( c^2 = a^2 - b^2 \\) and \\( 0 \\le e \\lt 1 \\) (circle when \\( a=b \\implies e=0 \\)). For a hyperbola, \\( c^2 = a^2 + b^2 \\), \\( e \\gt 1 \\), and asymptotes are \\( y = \\pm\\frac{b}{a}x \\).',
      ar: 'في القطع الناقص \\( c^2 = a^2 - b^2 \\) ويكون \\( 0 \\le e \\lt 1 \\) (ويتحول إلى دائرة عندما \\( a=b \\implies e=0 \\)). وفي القطع الزائد \\( c^2 = a^2 + b^2 \\) ويكون \\( e \\gt 1 \\) وخطا التقارب \\( y = \\pm\\frac{b}{a}x \\).'
    }
  },
  'tah-stats': {
    kind: 'explorer',
    title: {
      en: '⊙ Explorer · Normal Distribution & Empirical Rule (68–95–99.7%)',
      ar: '⊙ مستكشف تفاعلي · التوزيع الطبيعي والقاعدة التجريبية (٦٨–٩٥–٩٩٫٧٪)'
    },
    canvasId: 'tahNormalCanvas',
    ariaLabel: {
      en: 'Interactive normal distribution curve showing 1, 2, and 3 standard deviation intervals around the mean',
      ar: 'منحنى التوزيع الطبيعي التفاعلي يوضح فترات الانحراف المعياري حول المتوسط الحسابي'
    },
    dataPanel: {
      btnId: 'tahNormalDataBtn',
      panelId: 'tahNormalDataPanel',
      descId: 'tahNormalDataDesc',
      rowsId: 'tahNormalDataRows',
      caption: {
        en: 'Empirical Rule intervals for mean μ and standard deviation σ',
        ar: 'فترات القاعدة التجريبية للمتوسط الحسابي μ والانحراف المعياري σ'
      },
      columns: [
        { en: 'Interval / Band', ar: 'الفترة / النطاق' },
        { en: 'Range', ar: 'المدى العددي' }
      ]
    },
    controls: [
      {
        id: 'tahNormMu',
        valueDisplayId: 'tahNormMuV',
        label: { en: 'Mean <b>μ =</b>', ar: 'المتوسط <b>μ =</b>' },
        ariaLabel: { en: 'Mean mu', ar: 'المتوسط الحسابي' },
        min: 40,
        max: 100,
        value: 70,
        step: 5
      },
      {
        id: 'tahNormSig',
        valueDisplayId: 'tahNormSigV',
        label: { en: 'Std Dev <b>σ =</b>', ar: 'الانحراف المعياري <b>σ =</b>' },
        ariaLabel: { en: 'Standard deviation sigma', ar: 'الانحراف المعياري' },
        min: 2,
        max: 20,
        value: 10,
        step: 2
      }
    ],
    readouts: [
      {
        id: 'tahNorm68',
        label: { en: '68% Interval (μ ± σ)', ar: 'نطاق ٦٨٪ (μ ± σ)' },
        colorClass: 'indigo',
        value: '[60, 80]'
      },
      {
        id: 'tahNorm95',
        label: { en: '95% Interval (μ ± 2σ)', ar: 'نطاق ٩٥٪ (μ ± 2σ)' },
        colorClass: 'amber',
        value: '[50, 90]'
      },
      {
        id: 'tahNorm99',
        label: { en: '99.7% Interval (μ ± 3σ)', ar: 'نطاق ٩٩٫٧٪ (μ ± 3σ)' },
        value: '[40, 100]'
      }
    ],
    note: {
      en: 'Sub-interval breakdown memorized for Tahsili: 34% in \\( [\\mu,\\mu+\\sigma] \\), 13.5% in \\( [\\mu+\\sigma,\\mu+2\\sigma] \\), 2.35% in \\( [\\mu+2\\sigma,\\mu+3\\sigma] \\), and 0.15% in each tail beyond \\( \\mu\\pm 3\\sigma \\).',
      ar: 'تقسيم النسب المحفوظة في التحصيلي: ٣٤٪ بين \\( \\mu \\) و \\( \\mu+\\sigma \\)، و ١٣٫٥٪ بين \\( \\mu+\\sigma \\) و \\( \\mu+2\\sigma \\)، و ٢٫٣٥٪ بين \\( \\mu+2\\sigma \\) و \\( \\mu+3\\sigma \\)، و ٠٫١٥٪ في كل ذيل بعد \\( \\mu\\pm 3\\sigma \\).'
    }
  }
};

// ── 3. Authentic ETEC/Qiyas Past-Paper Callouts (Replacing cloned Worked Example D) ──
const QUDRAT_ABOUT_CALLOUTS = [
  {
    kind: 'callout',
    style: 'def',
    label: {
      en: 'Official ETEC / Qiyas Blueprint — Computerized (المحوسب) vs. Paper (الورقي)',
      ar: 'التوصيف الرسمي لهيئة تقويم التعليم والتدريب (قياس) — الاختبار المحوسب مقابل الورقي'
    },
    body: {
      en: '<ul><li><strong>Digital CBT Exam (الاختبار المحوسب):</strong> Administered year-round at Qiyas digital centers across 4–5 adaptive/timed sections (~96–120 total verbal & quantitative questions; ~48–52 quantitative items at ~1 minute per item). Once a section ends, you cannot return to previous sections.</li><li><strong>Paper-Based Exam (الاختبار الورقي):</strong> Administered in two annual windows with ~120 total items (52 quantitative items in 52 minutes) using an optical OMR bubble sheet.</li><li><strong>5 Official Quantitative Domains:</strong> Arithmetic & Number Sense (28%), Algebra & Identities (22%), Geometry & Shaded Regions (24%), Data Analysis & Probability (12%), and Fixed-Option Quantitative Comparisons (14%). Strictly <strong>No Calculator</strong>.</li></ul>',
      ar: '<ul><li><strong>الاختبار المحوسب (Digital CBT):</strong> يُعقد طوال العام في مقرات قياس الرقمية ويتكون من ٤ إلى ٥ أقسام موقّتة (نحو ٤٨–٥٢ سؤالاً كمياً بمعدل دقيقة واحدة لكل سؤال). لا يُسمح بالرجوع للقسم السابق بعد انتهاء وقته.</li><li><strong>الاختبار الورقي (Paper Booklet):</strong> يُعقد في فترتين سنوياً بواقع ٥٢ سؤالاً كمياً في ٥٢ دقيقة مع التظليل في ورقة الإجابة الضوئية.</li><li><strong>الأوزان النسبية للمحاور الخمسة:</strong> الحساب والأعداد (٢٨٪)، الجبر والمتطابقات (٢٢٪)، الهندسة ومساحة الجزء المظلل (٢٤٪)، الإحصاء وتحليل البيانات (١٢٪)، والمقارنات الكمية ذات الخيارات الثابتة (١٤٪). <strong>يُمنع استخدام الآلة الحاسبة منعاً باتاً</strong>.</li></ul>'
    }
  },
  {
    kind: 'callout',
    style: 'example',
    label: {
      en: 'Worked Example A — Mental Units-Digit & Cyclicity Shortcut (تجميعات المحوسب)',
      ar: 'مثال محلول أ — مهارة خانة الآحاد ودورية القوى (من تجميعات المحوسب)'
    },
    body: {
      en: '<p><strong>Problem:</strong> Without a calculator, find the units digit of \\( 3^{2026} + 7^{41} \\).</p><p><strong>Qiyas Shortcut:</strong> Powers of 3 cycle every 4 steps in units digit: \\( (3, 9, 7, 1) \\). Since \\( 2026 = 4(506) + 2 \\) (remainder 2), the units digit of \\( 3^{2026} \\) is \\( 9 \\). Powers of 7 cycle every 4 steps: \\( (7, 9, 3, 1) \\). Since \\( 41 = 4(10) + 1 \\) (remainder 1), the units digit of \\( 7^{41} \\) is \\( 7 \\). Adding units digits: \\( 9 + 7 = 16 \\implies \\mathbf{6} \\).</p>',
      ar: '<p><strong>المسألة:</strong> بدون آلة حاسبة، أوجد رقم الآحاد للمقدار \\( 3^{2026} + 7^{41} \\).</p><p><strong>طريقة قياس السريعة:</strong> دورة آحاد قوى العدد 3 تتكرر كل 4 مرات: \\( (3, 9, 7, 1) \\). باقي قسمة \\( 2026 \\) على 4 هو 2، فيكون آحاد \\( 3^{2026} \\) هو \\( 9 \\). ودورة آحاد قوى 7 هي \\( (7, 9, 3, 1) \\)، وباقي قسمة 41 على 4 هو 1، فيكون آحاد \\( 7^{41} \\) هو \\( 7 \\). بجمع الآحاد: \\( 9 + 7 = 16 \\implies \\) رقم الآحاد هو \\( \\mathbf{6} \\).</p>'
    }
  },
  {
    kind: 'callout',
    style: 'example',
    label: {
      en: 'Worked Example B — Shaded Region Golden Ratio (المساحات المظللة المشهورة)',
      ar: 'مثال محلول ب — القوانين الذهبية لمساحة الجزء المظلل في القدرات'
    },
    body: {
      en: '<p><strong>Problem:</strong> A square of side \\( 10\\text{ cm} \\) has an inscribed circle touching all four sides. What is the area of the four shaded corner regions?</p><p><strong>Qiyas Shortcut:</strong> For any square of side \\( 2r \\) with an inscribed circle of radius \\( r \\), \\( A_{\\text{shaded}} = r^2(4 - \\pi) \\). Here \\( r = 5 \\), so \\( A = 25(4 - 3.14) = 25 \\times 0.86 = \\mathbf{21.5\\text{ cm}^2} \\).</p>',
      ar: '<p><strong>المسألة:</strong> دائرة مرسومة داخل مربع طول ضلعه \\( 10\\text{ cm} \\) وتمس أضلاعه الأربعة. ما مساحة الزوايا الأربع المظللة؟</p><p><strong>قانون التجميعات الذهبي:</strong> المساحة المحصورة بين المربع والدائرة المماسة لأضلاعه هي \\( r^2(4 - \\pi) \\). وبما أن \\( r = 5 \\) فإن المساحة = \\( 25(4 - 3.14) = 25 \\times 0.86 = \\mathbf{21.5\\text{ cm}^2} \\).</p>'
    }
  },
  {
    kind: 'callout',
    style: 'example',
    label: {
      en: 'Worked Example C — Fixed-Option Quantitative Comparison Trap (فخ المقارنات الكمية)',
      ar: 'مثال محلول ج — فخ الإشارات والكسور في المقارنات الكمية (اختيار المعطيات غير كافية د)'
    },
    body: {
      en: '<p><strong>Problem:</strong> Given \\( x^2 = 25 \\), compare <strong>Quantity A:</strong> \\( x \\) and <strong>Quantity B:</strong> \\( 5 \\).</p><p><strong>Solution:</strong> Since \\( x^2 = 25 \\) yields \\( x = 5 \\) (making A = B) or \\( x = -5 \\) (making A &lt; B), the relationship changes depending on the sign of \\( x \\). Therefore, the correct choice is <strong>D (د: المعطيات غير كافية — The given information is insufficient)</strong>.</p>',
      ar: '<p><strong>المسألة:</strong> إذا كان \\( x^2 = 25 \\)، قارن بين: <strong>القيمة الأولى:</strong> \\( x \\) و <strong>القيمة الثانية:</strong> \\( 5 \\).</p><p><strong>الحل:</strong> المعادلة \\( x^2 = 25 \\) لها حلان: إما \\( x = 5 \\) (فتكون القيمتان متساويتين ج) وإما \\( x = -5 \\) (فتكون القيمة الثانية أكبر ب). وبما أن الإجابة تتغير بتغير الإشارة ولم يُذكر أن \\( x > 0 \\)، فالخيار الصحيح هو <strong>(د) المعطيات غير كافية</strong>.</p>'
    }
  }
];

const TAHSILI_ABOUT_CALLOUTS = [
  {
    kind: 'callout',
    style: 'def',
    label: {
      en: 'Official ETEC / Qiyas SAAT Tahsili Syllabus — Saudi Secondary Pathways (نظام المسارات ١-٢-٣)',
      ar: 'التوصيف الرسمي للاختبار التحصيلي العلمي (نظام المسارات: رياضيات ١، ٢، ٣)'
    },
    body: {
      en: '<ul><li><strong>Year 1 Secondary (أول ثانوي — 20% Weight):</strong> Mathematical Logic & Conditional Statements (converse, inverse, contrapositive \\( \\sim q \\to \\sim p \\)), Parallel Lines, Triangle Congruence/Similarity, Polygons & Quadrilaterals, Geometric Transformations, and Circle Angle/Segment Theorems.</li><li><strong>Year 2 Secondary (ثاني ثانوي — 30% Weight):</strong> Matrices, Determinants & Multiplicative Inverse \\( A^{-1} \\), Complex Numbers \\( i^n \\), Polynomials & Remainder/Factor Theorems, Rational Functions & Asymptotes, Arithmetic/Geometric Sequences & Infinite Series, Combinatorics, Binomial Theorem, and Trigonometry.</li><li><strong>Year 3 Secondary (ثالث ثانوي — 50% Weight):</strong> Function Analysis (Parity, Extrema, Average Rate of Change), Exponentials & Logarithms, Trigonometric Identities, <strong>Conic Sections (Parabola, Ellipse, Hyperbola & Eccentricity)</strong>, <strong>2D/3D Vectors & Dot/Cross Products</strong>, <strong>Polar Coordinates & De Moivre’s Theorem</strong>, Normal Distribution \\( (68\\text{–}95\\text{–}99.7\\%) \\), and <strong>Limits, Derivatives & Definite/Indefinite Integrals</strong>.</li></ul>',
      ar: '<ul><li><strong>الصف الأول الثانوي (رياضيات ١ — ٢٠٪ من الاختبار):</strong> التبرير والبرهان والمنطق الرياضي (العبارة الشرطية، العكس، المعكوس، المعاكس الإيجابي \\( \\sim q \\to \\sim p \\))، التوازي والتعامد، تطابق وتشابه المثلثات، المضلعات والأشكال الرباعية، التحويلات الهندسية، والدائرة.</li><li><strong>الصف الثاني الثانوي (رياضيات ٢ — ٣٠٪ من الاختبار):</strong> المصفوفات والمحددات والنظير الضربي، الأعداد المركبة وقوى \\( i \\)، كثيرات الحدود ونظريتا الباقي والعوامل، الدوال النسبية وخطوط التقارب، المتتابعات والمتسلسلات، نظرية ذات الحدين، وحساب المثلثات.</li><li><strong>الصف الثالث الثانوي (رياضيات ٣ — ٥٠٪ من الاختبار):</strong> تحليل الدوال، الأسس واللوغاريتمات، المتطابقات المثلثية، <strong>القطوع المخروطية (المكافئ، الناقص، الزائد، الاختلاف المركزي)</strong>، <strong>المتجهات في المستوى والفضاء</strong>، <strong>الإحداثيات القطبية ونظرية ديموافر</strong>، التوزيع الطبيعي، و<strong>النهايات والاشتقاق والتكامل</strong>.</li></ul>'
    }
  },
  {
    kind: 'callout',
    style: 'example',
    label: {
      en: 'Worked Example A — Year 1 Secondary (20%): Mathematical Logic & Contrapositive (المنطق الرياضي)',
      ar: 'مثال محلول أ — أول ثانوي (٢٠٪): العبارة الشرطية والمعاكس الإيجابي المكافئ منطقياً'
    },
    body: {
      en: '<p><strong>Problem:</strong> Which statement is logically equivalent to the conditional statement \\( p \\to q \\): <em>"If a polygon is a square, then it is a rectangle"</em>?</p><p><strong>Tahsili Rule:</strong> A conditional \\( p \\to q \\) is logically equivalent ONLY to its <strong>Contrapositive (المعاكس الإيجابي)</strong> \\( \\sim q \\to \\sim p \\) (negate and swap both hypothesis and conclusion): <em>"If a polygon is NOT a rectangle, then it is NOT a square."</em> Meanwhile, the Converse (العكس \\( q \\to p \\)) and Inverse (المعكوس \\( \\sim p \\to \\sim q \\)) are equivalent to each other.</p>',
      ar: '<p><strong>المسألة:</strong> ما العبارة المكافئة منطقياً للعبارة الشرطية \\( p \\to q \\): <em>«إذا كان الشكل مربعاً فإنه مستطيل»</em>؟</p><p><strong>قاعدة التحصيلي:</strong> العبارة الشرطية \\( p \\to q \\) تكافئ منطقياً <strong>معاكسها الإيجابي (Contrapositive)</strong> \\( \\sim q \\to \\sim p \\) (نفي الفرض والنتيجة مع تبديلهما): <em>«إذا لم يكن الشكل مستطيلاً فإنه ليس مربعاً»</em>. أما العكس \\( (q \\to p) \\) والمعكوس \\( (\\sim p \\to \\sim q) \\) فهما متكافئان فيما بينهما.</p>'
    }
  },
  {
    kind: 'callout',
    style: 'example',
    label: {
      en: 'Worked Example B — Year 2 Secondary (30%): Singular Matrix & Complex Powers (المصفوفات والأعداد المركبة)',
      ar: 'مثال محلول ب — ثاني ثانوي (٣٠٪): المصفوفة المنفردة وقوى الوحدة التخيلية'
    },
    body: {
      en: '<p><strong>Problem:</strong> For what value of \\( k \\) does the matrix \\( A = \\begin{pmatrix} k & 6 \\\\ 2 & 3 \\end{pmatrix} \\) have NO multiplicative inverse, and what is \\( i^{2027} \\)?</p><p><strong>Solution:</strong><br>1. A matrix has no inverse when \\( |A| = ad - bc = 0 \\implies 3k - 12 = 0 \\implies k = \\mathbf{4} \\).<br>2. Divide the exponent of \\( i \\) by 4: \\( 2027 = 4(506) + 3 \\) (remainder 3), so \\( i^{2027} = i^3 = \\mathbf{-i} \\).</p>',
      ar: '<p><strong>المسألة:</strong> ما قيمة \\( k \\) التي تجعل المصفوفة \\( A = \\begin{pmatrix} k & 6 \\\\ 2 & 3 \\end{pmatrix} \\) ليس لها نظير ضربي؟ وما قيمة \\( i^{2027} \\)؟</p><p><strong>الحل:</strong><br>1. تنعدم قابلية الانعكاس عندما \\( |A| = ad - bc = 0 \\implies 3k - 12 = 0 \\implies k = \\mathbf{4} \\).<br>2. باقي قسمة الأس \\( 2027 \\) على 4 هو 3، وبالتالي \\( i^{2027} = i^3 = \\mathbf{-i} \\).</p>'
    }
  },
  {
    kind: 'callout',
    style: 'example',
    label: {
      en: 'Worked Example C — Year 3 Secondary (50%): Conics, Vectors & Calculus (القطوع والمتجهات والتفاضل)',
      ar: 'مثال محلول ج — ثالث ثانوي (٥٠٪): القطوع المخروطية والمتجهات والتكامل'
    },
    body: {
      en: '<p><strong>Problem:</strong> Find (1) the eccentricity of \\( \\frac{(x-1)^2}{25} + \\frac{(y+2)^2}{9} = 1 \\), (2) the value of \\( m \\) making \\( \\mathbf{u} = \\langle 3, -6 \\rangle \\perp \\mathbf{v} = \\langle m, 4 \\rangle \\), and (3) \\( \\int_0^2 (3x^2 - 2x)\\,dx \\).</p><p><strong>Solution:</strong><br>1. Ellipse with \\( a = 5, b = 3 \\implies c = \\sqrt{25-9} = 4 \\implies e = \\frac{c}{a} = \\mathbf{\\frac{4}{5} = 0.8} \\).<br>2. Orthogonal vectors satisfy \\( \\mathbf{u}\\cdot\\mathbf{v} = 0 \\implies 3m - 24 = 0 \\implies m = \\mathbf{8} \\).<br>3. \\( [x^3 - x^2]_0^2 = 8 - 4 = \\mathbf{4} \\).</p>',
      ar: '<p><strong>المسألة:</strong> أوجد (١) الاختلاف المركزي للقطع \\( \\frac{(x-1)^2}{25} + \\frac{(y+2)^2}{9} = 1 \\)، و(٢) قيمة \\( m \\) التي تجعل المتجهين \\( \\mathbf{u} = \\langle 3, -6 \\rangle \\) و \\( \\mathbf{v} = \\langle m, 4 \\rangle \\) متعامدين، و(٣) \\( \\int_0^2 (3x^2 - 2x)\\,dx \\).</p><p><strong>الحل:</strong><br>1. قطع ناقص فيه \\( a = 5, b = 3 \\implies c = \\sqrt{25-9} = 4 \\implies e = \\frac{c}{a} = \\mathbf{\\frac{4}{5} = 0.8} \\).<br>2. شرط التعامد \\( \\mathbf{u}\\cdot\\mathbf{v} = 0 \\implies 3m - 24 = 0 \\implies m = \\mathbf{8} \\).<br>3. \\( [x^3 - x^2]_0^2 = 8 - 4 = \\mathbf{4} \\).</p>'
    }
  }
];

const CHAPTER_CALLOUT_D = {
  'qud-arithmetic': {
    kind: 'callout',
    style: 'example',
    label: {
      en: 'Worked Example 1.D — Tajmeeat Shortcut: Nested Radicals & Divisibility by 11',
      ar: 'مثال محلول 1.د — قوانين التجميعات: الجذور المتداخلة وقابلية القسمة على 11'
    },
    body: {
      en: '<p><strong>Problem 1:</strong> Evaluate \\( \\sqrt{19 + \\sqrt{30 + \\sqrt{36}}} \\).<br><strong>Solution:</strong> Work from the innermost radical outward: \\( \\sqrt{36} = 6 \\implies \\sqrt{30+6} = \\sqrt{36} = 6 \\implies \\sqrt{19+6} = \\sqrt{25} = \\mathbf{5} \\).</p><p><strong>Problem 2:</strong> For what digit \\( d \\) is the 4-digit number \\( 7d42 \\) divisible by 11?<br><strong>Solution:</strong> Alternating digit sum \\( (7 + 4) - (d + 2) = 9 - d \\) must be a multiple of 11, so \\( 9 - d = 0 \\implies d = \\mathbf{9} \\).</p>',
      ar: '<p><strong>المسألة ١:</strong> احسب قيمة \\( \\sqrt{19 + \\sqrt{30 + \\sqrt{36}}} \\).<br><strong>الحل:</strong> نبدأ من الجذر الداخلي نحو الخارج: \\( \\sqrt{36} = 6 \\implies \\sqrt{30+6} = \\sqrt{36} = 6 \\implies \\sqrt{19+6} = \\sqrt{25} = \\mathbf{5} \\).</p><p><strong>المسألة ٢:</strong> ما قيمة الرقم \\( d \\) التي تجعل العدد \\( 7d42 \\) يقبل القسمة على 11؟<br><strong>الحل:</strong> مجموع الخانات الفردية ناقص الزوجية \\( (7 + 4) - (d + 2) = 9 - d = 0 \\implies d = \\mathbf{9} \\).</p>'
    }
  },
  'qud-ratio': {
    kind: 'callout',
    style: 'example',
    label: {
      en: 'Worked Example 2.D — Tajmeeat Shortcut: Islamic Zakat (2.5% = 1/40) & Inverse Work Proportion',
      ar: 'مثال محلول 2.د — قوانين التجميعات: حساب الزكاة (ربع العشر = 1/40) والتناسب العكسي'
    },
    body: {
      en: '<p><strong>Golden Zakat Rule:</strong> Zakat is \\( 2.5\\% = \\frac{1}{40} \\) of capital.<ul><li>Given Capital \\( \\to \\) divide by \\( 40 \\) to find Zakat.</li><li>Given Zakat \\( \\to \\) multiply by \\( 40 \\) to find Capital.</li></ul><strong>Example:</strong> A merchant paid \\( 3{,}500\\text{ SAR} \\) in Zakat. His total wealth is \\( 3{,}500 \\times 40 = \\mathbf{140{,}000\\text{ SAR}} \\).</p>',
      ar: '<p><strong>القاعدة الذهبية للزكاة في القدرات:</strong> نسبة الزكاة \\( 2.5\\% = \\frac{1}{40} \\) (ربع العشر).<ul><li>إذا أُعطي المبلغ الكلي وطلب الزكاة \\( \\leftarrow \\) نقسم على \\( 40 \\).</li><li>إذا أُعطي مقدار الزكاة وطلب المبلغ الأصلي \\( \\leftarrow \\) نضرب في \\( 40 \\).</li></ul><strong>مثال:</strong> دفع رجل زكاة ماله \\( 3500 \\) ريال، فكم كان ماله الأصلي؟ الحل: \\( 3500 \\times 40 = \\mathbf{140{,}000} \\) ريال.</p>'
    }
  },
  'qud-algebra': {
    kind: 'callout',
    style: 'example',
    label: {
      en: 'Worked Example 3.D — Tajmeeat Shortcut: Reciprocal Sum Identity (x + 1/x)²',
      ar: 'مثال محلول 3.د — متطابقات التجميعات الشهيرة: (س + ١/س) وفرق المربعين'
    },
    body: {
      en: '<p><strong>Problem:</strong> If \\( x + \\frac{1}{x} = 5 \\), find the value of \\( x^2 + \\frac{1}{x^2} \\).<br><strong>Qiyas Identity Shortcut:</strong> Square both sides:<br>\\[ \\left(x + \\frac{1}{x}\\right)^2 = x^2 + 2(x)\\left(\\frac{1}{x}\\right) + \\frac{1}{x^2} = x^2 + \\frac{1}{x^2} + 2 \\]<br>Therefore, \\( x^2 + \\frac{1}{x^2} = 5^2 - 2 = 25 - 2 = \\mathbf{23} \\). (If given \\( x - \\frac{1}{x} = k \\), then \\( x^2 + \\frac{1}{x^2} = k^2 + 2 \\).)</p>',
      ar: '<p><strong>المسألة:</strong> إذا كان \\( x + \\frac{1}{x} = 5 \\)، فأوجد قيمة \\( x^2 + \\frac{1}{x^2} \\).<br><strong>قانون قياس السريع:</strong> بتربيع الطرفين:<br>\\[ \\left(x + \\frac{1}{x}\\right)^2 = x^2 + \\frac{1}{x^2} + 2 \\implies x^2 + \\frac{1}{x^2} = 5^2 - 2 = \\mathbf{23} \\]<br>(وإذا كان المعطى بالناقص \\( x - \\frac{1}{x} = k \\) فإن \\( x^2 + \\frac{1}{x^2} = k^2 + 2 \\)).</p>'
    }
  },
  'qud-geometry': {
    kind: 'callout',
    style: 'example',
    label: {
      en: 'Worked Example 4.D — Tajmeeat Atlas: The 5 Famous Shaded-Region Shortcuts',
      ar: 'مثال محلول 4.د — أطلس قوانين الجزء المظلل الخمسة الأكثر تكراراً في القدرات'
    },
    body: {
      en: '<ul><li><strong>1. Square (side \\( 2r \\)) minus Inscribed Circle (radius \\( r \\)):</strong> \\( A_{\\text{shaded}} = r^2(4 - \\pi) \\).</li><li><strong>2. Circle (radius \\( r \\)) minus Inscribed Square (diagonal \\( 2r \\)):</strong> Since \\( A_{\\text{square}} = \\frac{d^2}{2} = 2r^2 \\), \\( A_{\\text{shaded}} = r^2(\\pi - 2) \\).</li><li><strong>3. Three Tangent Circles of radius \\( r \\):</strong> Area enclosed between their arcs = \\( r^2\\left(\\sqrt{3} - \\frac{\\pi}{2}\\right) \\) (equilateral triangle of side \\( 2r \\) minus three \\( 60^\\circ \\) sectors).</li><li><strong>4. Triangle Inscribed in a Semicircle:</strong> Any angle inscribed in a semicircle is \\( 90^\\circ \\); for legs \\( 6, 8 \\), diameter \\( 2r = 10 \\implies r = 5 \\) and \\( A_{\\text{shaded}} = \\frac{25\\pi}{2} - 24 \\).</li><li><strong>5. Triangle Sharing Base & Height with Rectangle/Parallelogram:</strong> \\( A_{\\triangle} = \\frac{1}{2} A_{\\text{rect}} \\), so the unshaded remainder also equals \\( \\frac{1}{2} A_{\\text{rect}} \\).</li></ul>',
      ar: '<ul><li><strong>١. مربع طول ضلعه \\( 2r \\) بداخله دائرة مماسة نصف قطرها \\( r \\):</strong> المساحة المظللة = \\( r^2(4 - \\pi) \\).</li><li><strong>٢. دائرة نصف قطرها \\( r \\) بداخلها مربع رؤوسه على الدائرة:</strong> قطر المربع \\( 2r \\) ومساحته \\( 2r^2 \\)، فالمساحة المظللة = \\( r^2(\\pi - 2) \\).</li><li><strong>٣. ثلاث دوائر متطابقة ومتماسة نصف قطرها \\( r \\):</strong> مساحة الجزء المحصور بينها = مساحة المثلث المتطابق الأضلاع \\( (r^2\\sqrt{3}) \\) ناقص نصف دائرة \\( (\\frac{1}{2}\\pi r^2) \\).</li><li><strong>٤. مثلث مرسوم في نصف دائرة:</strong> زاويته المحيطية قائمة \\( 90^\\circ \\) دائماً، ووتره هو قطر الدائرة \\( 2r \\).</li><li><strong>٥. مثلث رأسه على ضلع مستطيل وقاعدته الضلع المقابل:</strong> مساحته = نصف مساحة المستطيل، والمنطقة المتبقية = النصف الآخر تماماً.</li></ul>'
    }
  },
  'qud-compare': {
    kind: 'callout',
    style: 'example',
    label: {
      en: 'Worked Example 5.D — Tajmeeat Shortcut: Comparing Large Exponents & Surds',
      ar: 'مثال محلول 5.د — مهارات المقارنة السريعة: القوى الكبيرة والجذور'
    },
    body: {
      en: '<p><strong>Problem 1 (Large Powers):</strong> Compare <strong>Quantity A:</strong> \\( 3^{44} \\) and <strong>Quantity B:</strong> \\( 2^{66} \\).<br><strong>Shortcut:</strong> Divide both exponents by \\( \\gcd(44, 66) = 22 \\): compare \\( 3^2 = 9 \\) vs. \\( 2^3 = 8 \\). Since \\( 9 > 8 \\), <strong>Quantity A is greater (أ)</strong>.</p><p><strong>Problem 2 (Sum of Roots vs. Root of Sum):</strong> Compare <strong>Quantity A:</strong> \\( \\sqrt{9} + \\sqrt{16} \\) and <strong>Quantity B:</strong> \\( \\sqrt{9 + 16} \\).<br><strong>Shortcut:</strong> For any positive \\( a, b > 0 \\), \\( \\sqrt{a} + \\sqrt{b} > \\sqrt{a+b} \\) (here \\( 3+4=7 > 5 \\)), so <strong>Quantity A is always greater (أ)</strong>.</p>',
      ar: '<p><strong>المسألة ١ (مقارنة الأسس الكبيرة):</strong> قارن بين <strong>القيمة الأولى:</strong> \\( 3^{44} \\) و <strong>القيمة الثانية:</strong> \\( 2^{66} \\).<br><strong>الحل السريع:</strong> نقسم الأسين على القاسم المشترك الأكبر \\( 22 \\): نقارن \\( 3^2 = 9 \\) مع \\( 2^3 = 8 \\). إذن <strong>القيمة الأولى أكبر (أ)</strong>.</p><p><strong>المسألة ٢ (جمع الجذور مقابل جذر المجموع):</strong> لأي عددين موجبين \\( a, b > 0 \\)، دائماً \\( \\sqrt{a} + \\sqrt{b} > \\sqrt{a+b} \\) (فمثلاً \\( \\sqrt{9}+\\sqrt{16} = 7 > \\sqrt{25} = 5 \\))، فتكون <strong>القيمة الأولى أكبر (أ)</strong>.</p>'
    }
  },
  'qud-patterns': {
    kind: 'callout',
    style: 'example',
    label: {
      en: 'Worked Example 6.D — Tajmeeat Shortcut: Handshakes, Page Counts, Queue Rank & Embedded Squares',
      ar: 'مثال محلول 6.د — القوانين السريعة: المصافحات، الصفحات، الطابور، وعدّ المربعات'
    },
    body: {
      en: '<ul><li><strong>Handshakes / Matches (المصافحات):</strong> Among \\( n \\) people, total handshakes = \\( \\frac{n(n-1)}{2} \\). (For \\( n=10 \\): \\( \\frac{10 \\times 9}{2} = 45 \\)).</li><li><strong>Inclusive Page Count (عدد الصفحات من أ إلى ب):</strong> \\( \\text{Pages} = b - a + 1 \\). (From page 15 to 42: \\( 42 - 15 + 1 = 28 \\) pages).</li><li><strong>Queue Position (الترتيب في الصف):</strong> Total people = \\( \\text{Front rank} + \\text{Back rank} - 1 \\).</li><li><strong>Squares in an \\( n \\times n \\) Grid (عدد المربعات في شبكة):</strong> \\( \\sum_{k=1}^n k^2 = \\frac{n(n+1)(2n+1)}{6} \\) (for \\( 3\\times 3 \\): \\( 1+4+9 = 14 \\); for \\( 4\\times 4 \\): \\( 30 \\)).</li></ul>',
      ar: '<ul><li><strong>قانون المصافحات والمباريات:</strong> لعدد \\( n \\) من الأشخاص، عدد المصافحات = \\( \\frac{n(n-1)}{2} \\) (لـ 10 أشخاص: \\( 45 \\) مصافحة).</li><li><strong>عدد الصفحات المحصورة من \\( a \\) إلى \\( b \\):</strong> \\( b - a + 1 \\) (من صفحة 15 إلى 42: \\( 42 - 15 + 1 = 28 \\) صفحة).</li><li><strong>عدد الأشخاص في طابور:</strong> الترتيب من البداية + الترتيب من النهاية \\( - 1 \\).</li><li><strong>عدد المربعات في شبكة \\( n \\times n \\):</strong> \\( 1^2 + 2^2 + \\dots + n^2 \\) (في شبكة \\( 3\\times 3 \\) يوجد \\( 14 \\) مربعاً، وفي \\( 4\\times 4 \\) يوجد \\( 30 \\) مربعاً).</li></ul>'
    }
  },
  'qud-data': {
    kind: 'callout',
    style: 'example',
    label: {
      en: 'Worked Example 7.D — Tajmeeat Shortcut: Consecutive Arithmetic Mean & Pie Angles',
      ar: 'مثال محلول 7.د — قوانين الإحصاء في قياس: متوسط الأعداد المتتالية والقطاعات الدائرية'
    },
    body: {
      en: '<p><strong>Consecutive Integers / Even / Odd Rule:</strong> In any evenly spaced sequence, <strong>Mean = Median = Middle Term = \\( \\frac{\\text{First} + \\text{Last}}{2} \\)</strong>.<br><strong>Example:</strong> The sum of 7 consecutive odd integers is 105. What is the largest integer?<br><strong>Shortcut:</strong> Middle (4th) term = \\( \\frac{105}{7} = 15 \\). The 3 odd integers after 15 are \\( 17, 19, \\mathbf{21} \\)!</p>',
      ar: '<p><strong>القاعدة الذهبية للأعداد المتتالية:</strong> في أي متتابعة منتظمة (أعداد متتالية أو زوجية متتالية أو فردية متتالية)، <strong>المتوسط الحسابي = الوسيط = الحد الأوسط = (الأول + الأخير) ÷ ٢</strong>.<br><strong>مثال:</strong> سبعة أعداد فردية متتالية مجموعها 105، فما أكبرها؟<br><strong>الحل الذهني:</strong> الحد الأوسط (الرابع) = \\( 105 \\div 7 = 15 \\). الأعداد الفردية الثلاثة التي تليه هي \\( 17, 19, \\mathbf{21} \\).</p>'
    }
  },
  'qud-word': {
    kind: 'callout',
    style: 'example',
    label: {
      en: 'Worked Example 8.D — Tajmeeat Shortcut: Combined Work / Pipes & Fence Trees',
      ar: 'مثال محلول 8.د — قوانين العمل المشترك (الحنفيات) والأشجار والأعمدة'
    },
    body: {
      en: '<p><strong>1. Combined Work / Two Pipes Formula:</strong> If Pipe A fills a tank in \\( t_1 \\) hours and Pipe B fills it in \\( t_2 \\) hours, together they take \\( T = \\frac{t_1 \\times t_2}{t_1 + t_2} \\). (Example: \\( 6\\text{ h} \\) and \\( 3\\text{ h} \\implies \\frac{6 \\times 3}{6+3} = \\mathbf{2\\text{ hours}} \\).)<br><strong>2. Trees & Poles Along a Straight Road:</strong> Number of trees = \\( \\frac{\\text{Total Length}}{\\text{Spacing}} + 1 \\). (On a closed perimeter/circle, trees = \\( \\frac{\\text{Perimeter}}{\\text{Spacing}} \\).)</p>',
      ar: '<p><strong>١. قانون العمل المشترك والحنفيات:</strong> إذا كانت الحنفية الأولى تملأ الخزان في \\( t_1 \\) ساعات والثانية في \\( t_2 \\) ساعات، فإنهما معاً تملآنه في زمن \\( T = \\frac{t_1 \\times t_2}{t_1 + t_2} \\) (مثال: 6 ساعات و3 ساعات \\( \\implies \\frac{18}{9} = \\mathbf{2} \\) ساعتان).<br><strong>٢. قانون الأشجار والأعمدة على طريق مستقيم:</strong> عدد الأشجار = \\( \\frac{\\text{المسافة الكلية}}{\\text{المسافة بين كل شجرتين}} + 1 \\).</p>'
    }
  },
  'tah-algebra': {
    kind: 'callout',
    style: 'example',
    label: {
      en: 'Worked Example 1.D — Year 1 & 2 Pathways: Mathematical Logic, Complex Numbers & Cramer’s Rule',
      ar: 'مثال محلول 1.د — المنطق الرياضي (أول ثانوي) والأعداد المركبة والمصفوفات (ثاني ثانوي)'
    },
    body: {
      en: '<ul><li><strong>Mathematical Logic (المنطق الرياضي):</strong> Conjunction \\( p \\land q \\) is true ONLY when both are true; Disjunction \\( p \\lor q \\) is false ONLY when both are false; Conditional \\( p \\to q \\) is false ONLY when \\( p \\) is True and \\( q \\) is False (T \\( \\to \\) F is F). Its contrapositive \\( \\sim q \\to \\sim p \\) has the exact same truth table.</li><li><strong>Complex Numbers (الأعداد المركبة):</strong> \\( i = \\sqrt{-1},\\ i^2 = -1,\\ i^3 = -i,\\ i^4 = 1 \\). Also \\( (1+i)^2 = 2i \\) and \\( (1-i)^2 = -2i \\), so \\( (1+i)^8 = ((1+i)^2)^4 = (2i)^4 = \\mathbf{16} \\).</li><li><strong>2×2 Inverse Matrix Formula:</strong> For \\( A = \\begin{pmatrix}a & b\\\\c & d\\end{pmatrix} \\) with \\( \\Delta = ad-bc \\neq 0 \\), \\( A^{-1} = \\frac{1}{\\Delta}\\begin{pmatrix}d & -b\\\\-c & a\\end{pmatrix} \\) (swap main diagonal, negate off-diagonal).</li></ul>',
      ar: '<ul><li><strong>المنطق الرياضي والعبارات الشرطية:</strong> عبارة الوصل \\( p \\land q \\) صائبة فقط إذا كانتا صائبتين معاً؛ وعبارة الفصل \\( p \\lor q \\) خاطئة فقط إذا كانتا خاطئتين معاً؛ والعبارة الشرطية \\( p \\to q \\) تكون خاطئة في حالة واحدة فقط (الفرض صائب T والنتيجة خاطئة F)، وتكافئ منطقياً معاكسها الإيجابي \\( \\sim q \\to \\sim p \\).</li><li><strong>اختصارات الأعداد المركبة في التحصيلي:</strong> \\( (1+i)^2 = 2i \\) و \\( (1-i)^2 = -2i \\). ومنه \\( (1+i)^8 = (2i)^4 = \\mathbf{16} \\).</li><li><strong>النظير الضربي للمصفوفة:</strong> \\( A^{-1} = \\frac{1}{ad-bc}\\begin{pmatrix}d & -b\\\\-c & a\\end{pmatrix} \\) (نبدل عناصر القطر الرئيس ونغير إشارات القطر الآخر).</li></ul>'
    }
  },
  'tah-functions': {
    kind: 'callout',
    style: 'example',
    label: {
      en: 'Worked Example 2.D — Tajmeeat Shortcut: Rational Asymptotes, Point Discontinuity & Direct/Inverse Variation',
      ar: 'مثال محلول 2.د — خطوط التقارب ونقطة الانفصال والتغير الطردي والعكسي والمشترك'
    },
    body: {
      en: '<p><strong>1. Point Discontinuity vs. Vertical Asymptote:</strong> For \\( f(x) = \\frac{x^2 - 9}{x - 3} = \\frac{(x-3)(x+3)}{x-3} \\), the factor \\( (x-3) \\) cancels, creating a <strong>point discontinuity (hole / نقطة انفصال)</strong> at \\( x = 3 \\) with \\( y = 3 + 3 = \\mathbf{6} \\), i.e. \\( (3, 6) \\).</p><p><strong>2. Variation Laws (قوانين التغير):</strong><ul><li><strong>Direct (طردي):</strong> \\( \\frac{y_1}{x_1} = \\frac{y_2}{x_2} \\).</li><li><strong>Inverse (عكسي):</strong> \\( x_1 y_1 = x_2 y_2 \\).</li><li><strong>Combined (مركب):</strong> If \\( y \\) varies directly with \\( x \\) and inversely with \\( z \\), then \\( \\frac{y_1 z_1}{x_1} = \\frac{y_2 z_2}{x_2} \\).</li></ul></p>',
      ar: '<p><strong>١. نقطة الانفصال مقابل خط التقارب الرأسي:</strong> في الدالة \\( f(x) = \\frac{x^2 - 9}{x - 3} \\)، باختصار العامل المشترك \\( (x-3) \\) نحصل على \\( x + 3 \\)، فتوجد <strong>نقطة انفصال (فجوة)</strong> عند \\( x = 3 \\) إحداثياتها \\( (3, 6) \\).</p><p><strong>٢. قوانين التغير في التحصيلي:</strong><ul><li><strong>التغير الطردي:</strong> \\( \\frac{y_1}{x_1} = \\frac{y_2}{x_2} \\).</li><li><strong>التغير العكسي:</strong> \\( x_1 y_1 = x_2 y_2 \\).</li><li><strong>التغير المركب:</strong> إذا كانت \\( y \\) تتغير طردياً مع \\( x \\) وعكسياً مع \\( z \\) فإن \\( \\frac{y_1 z_1}{x_1} = \\frac{y_2 z_2}{x_2} \\).</li></ul></p>'
    }
  },
  'tah-sequences': {
    kind: 'callout',
    style: 'example',
    label: {
      en: 'Worked Example 3.D — Tajmeeat Shortcut: Binomial Theorem General Term & Coefficient Sum',
      ar: 'مثال محلول 3.د — نظرية ذات الحدين: الحد العام وعدد الحدود ومجموع المعاملات'
    },
    body: {
      en: '<p><strong>Binomial Expansion \\( (a + b)^n \\) Rules:</strong><ul><li><strong>Number of terms:</strong> \\( n + 1 \\).</li><li><strong>Term \\( T_{k+1} \\):</strong> \\( T_{k+1} = \\binom{n}{k} a^{n-k} b^k \\).</li><li><strong>Sum of all binomial coefficients:</strong> Set \\( a=1, b=1 \\implies 2^n \\).</li></ul><strong>Example:</strong> Find the 4th term in \\( (x + 2)^6 \\). Here \\( n = 6, k = 3 \\): \\( T_4 = \\binom{6}{3} x^{6-3} (2)^3 = 20 \\cdot 8 x^3 = \\mathbf{160x^3} \\).</p>',
      ar: '<p><strong>قوانين مفكوك ذات الحدين \\( (a + b)^n \\) في التحصيلي:</strong><ul><li><strong>عدد الحدود:</strong> \\( n + 1 \\).</li><li><strong>الحد العام \\( T_{k+1} \\):</strong> \\( T_{k+1} = \\binom{n}{k} a^{n-k} b^k \\) (حيث \\( k \\) أقل من رتبة الحد بواحد).</li><li><strong>مجموع معاملات المفكوك:</strong> بالتعويض بـ 1 يساوي \\( 2^n \\).</li></ul><strong>مثال:</strong> أوجد الحد الرابع في مفكوك \\( (x + 2)^6 \\). نضع \\( n = 6, k = 3 \\): \\( T_4 = \\binom{6}{3} x^3 (2)^3 = 20 \\times 8 x^3 = \\mathbf{160x^3} \\).</p>'
    }
  },
  'tah-trig': {
    kind: 'callout',
    style: 'example',
    label: {
      en: 'Worked Example 4.D — Year 3 Pathways: Polar Coordinates & De Moivre’s Theorem',
      ar: 'مثال محلول 4.د — الإحداثيات القطبية والصورة القطبية للأعداد المركبة ونظرية ديموافر'
    },
    body: {
      en: '<p><strong>1. Polar-Cartesian Conversion (الإحداثيات القطبية):</strong> \\( x = r\\cos\\theta,\\ y = r\\sin\\theta,\\ r^2 = x^2 + y^2,\\ \\tan\\theta = \\frac{y}{x} \\).<ul><li>Equation \\( r = 5 \\iff x^2 + y^2 = 25 \\) (circle of radius 5).</li><li>Equation \\( r = 4\\cos\\theta \\implies r^2 = 4r\\cos\\theta \\iff x^2 + y^2 = 4x \\iff (x-2)^2 + y^2 = 4 \\).</li><li>Distance between polar points \\( P_1(r_1,\\theta_1) \\) and \\( P_2(r_2,\\theta_2) \\): \\( d = \\sqrt{r_1^2 + r_2^2 - 2r_1r_2\\cos(\\theta_2 - \\theta_1)} \\).</li></ul><strong>2. De Moivre’s Theorem (نظرية ديموافر):</strong> \\( [r(\\cos\\theta + i\\sin\\theta)]^n = r^n(\\cos(n\\theta) + i\\sin(n\\theta)) \\).<br><strong>Example:</strong> \\( [2(\\cos 15^\\circ + i\\sin 15^\\circ)]^4 = 2^4(\\cos 60^\\circ + i\\sin 60^\\circ) = 16\\left(\\frac{1}{2} + i\\frac{\\sqrt{3}}{2}\\right) = \\mathbf{8 + 8\\sqrt{3}\\,i} \\).</p>',
      ar: '<p><strong>١. التحويل بين الإحداثيات القطبية والديكارتية:</strong> \\( x = r\\cos\\theta,\\ y = r\\sin\\theta,\\ x^2 + y^2 = r^2 \\).<ul><li>المعادلة القطبية \\( r = 5 \\) تمثل دائرة معادلتها الديكارتية \\( x^2 + y^2 = 25 \\).</li><li>المسافة بين نقطتين قطبيتين \\( (r_1,\\theta_1) \\) و \\( (r_2,\\theta_2) \\): \\( d = \\sqrt{r_1^2 + r_2^2 - 2r_1r_2\\cos(\\theta_2 - \\theta_1)} \\).</li></ul><strong>٢. نظرية ديموافر (De Moivre):</strong> نرفع المقياس للقوة \\( n \\) ونضرب الزاوية في \\( n \\):<br>\\[ [2(\\cos 15^\\circ + i\\sin 15^\\circ)]^4 = 16(\\cos 60^\\circ + i\\sin 60^\\circ) = \\mathbf{8 + 8\\sqrt{3}\\,i} \\]</p>'
    }
  },
  'tah-geometry': {
    kind: 'callout',
    style: 'example',
    label: {
      en: 'Worked Example 5.D — Year 3 Pathways (High-Yield): Conic Sections & 2D/3D Vectors Master Reference',
      ar: 'مثال محلول 5.د — مرجع ثالث ثانوي الذهبي: القطوع المخروطية والمتجهات في المستوى والفضاء'
    },
    body: {
      en: '<p><strong>1. Conic Sections (القطوع المخروطية):</strong><ul><li><strong>Parabola (القطع المكافئ):</strong> \\( (x-h)^2 = 4c(y-k) \\) opens up/down with vertex \\( (h,k) \\), focus \\( (h, k+c) \\), directrix \\( y = k-c \\), and latus rectum length (طول الوتر البؤري) \\( = |4c| \\).</li><li><strong>Ellipse (القطع الناقص):</strong> \\( \\frac{(x-h)^2}{a^2} + \\frac{(y-k)^2}{b^2} = 1 \\) with \\( a > b \\), major axis length \\( 2a \\), minor axis \\( 2b \\), \\( c^2 = a^2 - b^2 \\), and eccentricity \\( e = \\frac{c}{a} \\in (0,1) \\).</li><li><strong>Hyperbola (القطع الزائد):</strong> \\( \\frac{(x-h)^2}{a^2} - \\frac{(y-k)^2}{b^2} = 1 \\), \\( c^2 = a^2 + b^2 \\), \\( e = \\frac{c}{a} > 1 \\), asymptotes \\( y - k = \\pm\\frac{b}{a}(x - h) \\).</li><li><strong>Discriminant \\( B^2 - 4AC \\):</strong> Circle if \\( B=0, A=C \\); Ellipse if \\( < 0 \\); Parabola if \\( = 0 \\); Hyperbola if \\( > 0 \\).</li></ul><strong>2. 2D & 3D Vectors (المتجهات):</strong><ul><li><strong>Unit Vector (متجه الوحدة):</strong> \\( \\mathbf{u} = \\frac{\\mathbf{v}}{|\\mathbf{v}|} \\). For \\( \\mathbf{v} = \\langle 3, 4 \\rangle \\), \\( \\mathbf{u} = \\langle \\frac{3}{5}, \\frac{4}{5} \\rangle \\).</li><li><strong>Dot Product & Orthogonality (الضرب الداخلي والتعامد):</strong> \\( \\mathbf{u}\\cdot\\mathbf{v} = u_1v_1 + u_2v_2 + u_3v_3 = |\\mathbf{u}||\\mathbf{v}|\\cos\\theta \\). Orthogonal \\( \\iff \\mathbf{u}\\cdot\\mathbf{v} = 0 \\).</li></ul></p>',
      ar: '<p><strong>١. خلاصة القطوع المخروطية (ثالث ثانوي):</strong><ul><li><strong>القطع المكافئ:</strong> \\( (x-h)^2 = 4c(y-k) \\) رأسه \\( (h,k) \\)، وطول وتره البؤري \\( |4c| \\)، والبعد بين الرأس والبؤرة \\( |c| \\).</li><li><strong>القطع الناقص:</strong> \\( c^2 = a^2 - b^2 \\)، طول المحور الأكبر \\( 2a \\) والأصغر \\( 2b \\)، والاختلاف المركزي \\( e = \\frac{c}{a} < 1 \\) (وللدائرة \\( e = 0 \\)).</li><li><strong>القطع الزائد:</strong> \\( c^2 = a^2 + b^2 \\)، والاختلاف المركزي \\( e = \\frac{c}{a} > 1 \\)، وخطا التقارب الأفقي \\( y - k = \\pm\\frac{b}{a}(x - h) \\).</li><li><strong>المميز \\( B^2 - 4AC \\):</strong> مكافئ إذا ساوى \\( 0 \\)، ناقص إذا كان \\( < 0 \\) (ودائرة إذا \\( A=C, B=0 \\))، وزائد إذا كان \\( > 0 \\).</li></ul><strong>٢. المتجهات في المستوى والفضاء الثلاثي:</strong><ul><li><strong>متجه الوحدة باتجاه \\( \\mathbf{v} \\):</strong> \\( \\mathbf{u} = \\frac{\\mathbf{v}}{|\\mathbf{v}|} \\).</li><li><strong>الضرب الداخلي والتعامد:</strong> يتعامد المتجهان إذا وفقط إذا كان \\( \\mathbf{u}\\cdot\\mathbf{v} = u_1v_1 + u_2v_2 + u_3v_3 = 0 \\).</li></ul></p>'
    }
  },
  'tah-calc1': {
    kind: 'callout',
    style: 'example',
    label: {
      en: 'Worked Example 6.D — Tajmeeat Shortcut: Rational Limits at Infinity & Instantaneous Velocity',
      ar: 'مثال محلول 6.د — اختصارات النهايات عند المالانهاية والسرعة اللحظية'
    },
    body: {
      en: '<p><strong>1. Limits at Infinity \\( \\lim_{x\\to\\infty} \\frac{a_n x^n + \\dots}{b_m x^m + \\dots} \\):</strong><ul><li>If \\( n < m \\) (bottom degree larger) \\( \\implies \\mathbf{0} \\).</li><li>If \\( n = m \\) (degrees equal) \\( \\implies \\mathbf{\\frac{a_n}{b_m}} \\).</li><li>If \\( n > m \\) (top degree larger) \\( \\implies \\pm\\infty \\).</li></ul><strong>2. Instantaneous Velocity & Max Height:</strong> Given height \\( h(t) = 40t - 5t^2 \\), velocity is \\( v(t) = h\'(t) = 40 - 10t \\). Maximum height occurs when \\( v(t) = 0 \\implies t = 4\\text{ s} \\), giving \\( h(4) = 40(4) - 5(16) = \\mathbf{80\\text{ m}} \\).</p>',
      ar: '<p><strong>١. قوانين النهايات عند المالانهاية للدوال النسبية:</strong><ul><li>درجة البسط &lt; درجة المقام \\( \\leftarrow \\) النهاية = \\( \\mathbf{0} \\).</li><li>درجة البسط = درجة المقام \\( \\leftarrow \\) النهاية = <strong>المعامل الرئيس للبسط ÷ المعامل الرئيس للمقام</strong>.</li><li>درجة البسط &gt; درجة المقام \\( \\leftarrow \\pm\\infty \\).</li></ul><strong>٢. السرعة اللحظية وأقصى ارتفاع:</strong> إذا كانت المسافة \\( h(t) = 40t - 5t^2 \\)، فالسرعة اللحظية \\( v(t) = h\'(t) = 40 - 10t \\). عند أقصى ارتفاع تنعدم السرعة \\( v(t) = 0 \\implies t = 4 \\) ثوانٍ، ويكون أقصى ارتفاع \\( h(4) = \\mathbf{80\\text{ m}} \\).</p>'
    }
  },
  'tah-calc2': {
    kind: 'callout',
    style: 'example',
    label: {
      en: 'Worked Example 7.D — Tajmeeat Shortcut: Solving for Unknown Upper Limit in Definite Integrals',
      ar: 'مثال محلول 7.د — إيجاد الحد العلوي المجهول في التكامل المحدد (سؤال تجميعات متكرر)'
    },
    body: {
      en: '<p><strong>Problem:</strong> Find the positive constant \\( k \\) such that \\( \\int_0^k (2x + 1)\\,dx = 12 \\).<br><strong>Solution:</strong> Antiderivative is \\( [x^2 + x]_0^k = k^2 + k \\). Setting \\( k^2 + k = 12 \\implies (k+4)(k-3) = 0 \\). Since \\( k > 0 \\), \\( k = \\mathbf{3} \\).</p>',
      ar: '<p><strong>المسألة:</strong> أوجد قيمة الثابت الموجب \\( k \\) إذا كان \\( \\int_0^k (2x + 1)\\,dx = 12 \\).<br><strong>الحل:</strong> الدالة الأصلية هي \\( [x^2 + x]_0^k = k^2 + k \\). بمساواتها بـ 12: \\( k^2 + k - 12 = 0 \\implies (k+4)(k-3) = 0 \\)، وبما أن \\( k > 0 \\) فإن \\( k = \\mathbf{3} \\).</p>'
    }
  },
  'tah-explog': {
    kind: 'callout',
    style: 'example',
    label: {
      en: 'Worked Example 8.D — Tajmeeat Shortcut: Telescoping Logarithms & Change of Base',
      ar: 'مثال محلول 8.د — اختصار اللوغاريتمات المتسلسلة وتغيير الأساس'
    },
    body: {
      en: '<p><strong>Problem:</strong> Evaluate \\( \\log_2 5 \\cdot \\log_5 8 \\) and find the domain of \\( f(x) = \\log_3(x - 4) \\).<br><strong>Solution:</strong><br>1. By the change-of-base chain rule \\( \\log_a b \\cdot \\log_b c = \\log_a c \\), we get \\( \\log_2 8 = \\log_2(2^3) = \\mathbf{3} \\).<br>2. The argument of a logarithm must be strictly positive: \\( x - 4 > 0 \\implies x > 4 \\), so the domain is \\( \\mathbf{(4, \\infty)} \\).</p>',
      ar: '<p><strong>المسألة:</strong> أوجد قيمة \\( \\log_2 5 \\cdot \\log_5 8 \\)، وحدد مجال الدالة \\( f(x) = \\log_3(x - 4) \\).<br><strong>الحل:</strong><br>1. بقاعدة سلسلة تغيير الأساس \\( \\log_a b \\cdot \\log_b c = \\log_a c \\) نحصل على \\( \\log_2 8 = \\log_2(2^3) = \\mathbf{3} \\).<br>2. يشترط أن يكون ما بداخل اللوغاريتم موجباً تماماً: \\( x - 4 > 0 \\implies x > 4 \\)، فالمجال هو \\( \\mathbf{(4, \\infty)} \\).</p>'
    }
  },
  'tah-stats': {
    kind: 'callout',
    style: 'example',
    label: {
      en: 'Worked Example 9.D — Tajmeeat Shortcut: Circular Permutations & Distinguishable Word Permutations',
      ar: 'مثال محلول 9.د — التباديل الدائرية (مع وبدون مرجع) والتباديل مع التكرار'
    },
    body: {
      en: '<ul><li><strong>Circular Permutation WITHOUT fixed reference (تباديل دائرية بدون نقطة مرجعية):</strong> \\( (n - 1)! \\). (5 people around a round table: \\( (5-1)! = 4! = \\mathbf{24} \\) ways.)</li><li><strong>Circular Permutation WITH fixed landmark/door/window (بوجود نقطة مرجعية ثابتة):</strong> Turns into a linear permutation \\( n! \\). (5 people around a table where the seat next to the window is fixed: \\( 5! = \\mathbf{120} \\) ways.)</li><li><strong>Permutations with Repetition (التباديل مع التكرار):</strong> Number of arrangements of the letters in \\( \\text{«الدمام»} \\) (6 letters, \\( \\text{ا} \\) repeated twice, \\( \\text{م} \\) repeated twice) = \\( \\frac{6!}{2!\\,2!} = \\frac{720}{4} = \\mathbf{180} \\).</li></ul>',
      ar: '<ul><li><strong>التباديل الدائرية بدون نقطة مرجعية:</strong> عدد طرق ترتيب \\( n \\) عناصر على دائرة = \\( (n - 1)! \\) (مثال: 5 أشخاص حول طاولة دائرية = \\( 4! = \\mathbf{24} \\) طريقة).</li><li><strong>التباديل الدائرية مع وجود نقطة مرجعية ثابتة (نافذة / باب / مقعد محدد):</strong> تتحول إلى تباديل خطية \\( n! \\) (لـ 5 أشخاص = \\( 5! = \\mathbf{120} \\) طريقة).</li><li><strong>التباديل مع التكرار:</strong> عدد طرق ترتيب حروف كلمة «الدمام» (6 حروف، الألف مكرر مرتين والميم مرتين) = \\( \\frac{6!}{2!\\times 2!} = \\frac{720}{4} = \\mathbf{180} \\) طريقة.</li></ul>'
    }
  }
};

function upgradeChapterFile(filePath, slug) {
  const ch = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const blocks = ch.content.blocks;

  // 1. Replace block[2] (or the generic figure block) with our bespoke CHAPTER_FIGURES[slug]
  if (CHAPTER_FIGURES[slug]) {
    const figIdx = blocks.findIndex(
      (b) =>
        b.kind === 'figure' &&
        (JSON.stringify(b).includes('Coordinate Curve & Tangent Analysis') ||
          JSON.stringify(b).includes('Frequency Distribution (2)') ||
          JSON.stringify(b).includes('Harmonic Wave & Phase Profile (2)') ||
          slug === 'qud-geometry' ||
          slug === 'tah-geometry')
    );
    if (figIdx !== -1) {
      blocks[figIdx] = CHAPTER_FIGURES[slug];
    }
  }

  // 2. Replace generic exAuto_* explorer in the 6 target chapters with NEW_EXPLORERS[slug]
  if (NEW_EXPLORERS[slug]) {
    const expIdx = blocks.findIndex((b) => b.kind === 'explorer');
    if (expIdx !== -1) {
      blocks[expIdx] = NEW_EXPLORERS[slug];
    }
  }

  // 3. Replace cloned Worked Example A/B/C/D in qud-about & tah-about, or Worked Example D in all other chapters
  if (slug === 'qud-about') {
    const firstCloneIdx = blocks.findIndex(
      (b) => b.kind === 'callout' && b.label && /^Worked Example [A-D] —/.test(b.label.en)
    );
    if (firstCloneIdx !== -1) {
      blocks.splice(firstCloneIdx, 4, ...QUDRAT_ABOUT_CALLOUTS);
    }
  } else if (slug === 'tah-about') {
    const firstCloneIdx = blocks.findIndex(
      (b) => b.kind === 'callout' && b.label && /^Worked Example [A-D] —/.test(b.label.en)
    );
    if (firstCloneIdx !== -1) {
      blocks.splice(firstCloneIdx, 4, ...TAHSILI_ABOUT_CALLOUTS);
    }
  } else if (CHAPTER_CALLOUT_D[slug]) {
    const dIdx = blocks.findIndex(
      (b) =>
        b.kind === 'callout' &&
        b.label &&
        (b.label.en.startsWith('Worked Example D —') || b.label.en.includes('Worked Example 1.D') || b.label.en.includes('Tajmeeat') || b.label.en.includes('Pathways'))
    );
    if (dIdx !== -1) {
      blocks[dIdx] = CHAPTER_CALLOUT_D[slug];
    }
  }

  fs.writeFileSync(filePath, JSON.stringify(ch, null, 2) + '\n', 'utf8');
  console.log(`  ✓ Upgraded chapter: ${slug}`);
}

for (const dir of [QUD_DIR, TAH_DIR]) {
  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.json') && !f.startsWith('_'));
  for (const f of files) {
    const slug = f.replace(/\.json$/, '');
    upgradeChapterFile(path.join(dir, f), slug);
  }
}

// ── 4. Upgrade Practice Sets (_practice-set.json) for Qudrat & Tahsili ──────
const BOILERPLATE_EN = /<p><strong>Key Mathematical Principle & Verification:<\/strong>[\s\S]*?<\/p>/g;
const BOILERPLATE_AR = /<p><strong>المبدأ الرياضي والتحقق من الحل:<\/strong>[\s\S]*?<\/p>/g;

const QUDRAT_PRACTICE_FIGS = {
  1: { type: 'numberline', min: 0, max: 1, step: 0.2, title: 'Comparing 2/3 ≈ 0.67 and 3/5 = 0.60', points: [{ x: 0.6, label: '3/5', color: '#c8902a' }, { x: 0.667, label: '2/3', color: '#2b5ba8' }] },
  2: { type: 'bar', title: 'Ratio Split 2:3 of 150 SAR', categories: ['First Share (2 parts)', 'Second Share (3 parts)'], values: [60, 90] },
  4: { type: 'bar', title: 'Successive +10% then −10% Change', categories: ['Start', 'After +10%', 'After −10%'], values: [100, 110, 99] },
  6: { type: 'fn', title: 'System x + y = 10 and x − y = 4', xmin: 0, xmax: 10, ymin: -2, ymax: 10, fn: '10 - x', fn2: 'x - 4', points: [{ x: 7, y: 3, label: '(7, 3)' }] },
  8: { type: 'triangle', a: 7, b: 8, c: 9, angleA: '50°', angleB: '60°', angleC: '70°', title: 'Triangle Angle Sum (50° + 60° + 70° = 180°)' },
  9: { type: 'circle', radius: 7, labelR: 'r = 7 (A = 154)', chordAngle: 90, title: 'Circle of Radius r = 7 (π ≈ 22/7)' },
  11: { type: 'triangle', a: 6, b: 8, c: 10, angleC: '90°', labelA: '6', labelB: '8', labelC: '10', title: 'Scaled 3-4-5 Right Triangle (6-8-10)' },
  13: { type: 'shaded_region', subtype: 'square_inscribed_circle', radius: 5, title: 'Square of Side 10 with Inscribed Circle (r = 5)' },
  15: { type: 'shaded_region', subtype: 'circle_inscribed_square', radius: 6, title: 'Circle with Inscribed Square' },
  18: { type: 'shaded_region', subtype: 'triangle_in_rectangle', base: 10, height: 6, title: 'Triangle Sharing Base & Height with Rectangle' },
  20: { type: 'numberline', min: -4, max: 6, step: 2, title: 'Quantitative Comparison Test Points', points: [{ x: -2, label: 'x = -2', color: '#dc2626' }, { x: 0, label: 'x = 0', color: '#c8902a' }, { x: 4, label: 'x = 4', color: '#2b5ba8' }] },
  22: { type: 'shaded_region', subtype: 'four_tangent_circles', radius: 4, title: 'Four Tangent Circles Inside Square' },
  25: { type: 'circle', radius: 6, labelR: 'Clock Angle', chordAngle: 75, title: 'Clock Hands Angle |30H − 5.5M|' },
  28: { type: 'bar', title: 'Arithmetic Sequence Progression', categories: ['a₁', 'a₂', 'a₃', 'a₄', 'a₅'], values: [4, 7, 10, 13, 16] },
  31: { type: 'pie', title: 'Circular Sector Distribution (360°)', slices: [{ label: 'Q1 (25%)', value: 25, color: '#2b5ba8' }, { label: 'Q2 (35%)', value: 35, color: '#c8902a' }, { label: 'Q3 (40%)', value: 40, color: '#10b981' }] },
  34: { type: 'bar', title: 'Dataset Values & Mean Balance Point', categories: ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'], values: [12, 15, 18, 21, 24] },
  37: { type: 'fn', title: 'Uniform Motion Distance-Time Profile', xmin: 0, xmax: 5, ymin: 0, ymax: 300, fn: '60*x', points: [{ x: 3, y: 180, label: '(3 h, 180 km)' }] },
  40: { type: 'shaded_region', subtype: 'semicircle_triangle', radius: 5, legA: 6, legB: 8, title: 'Right Triangle Inscribed in Semicircle' },
  42: { type: 'polygon', title: 'Rectangle Dimensions & Area', points: [{ x: 0, y: 0 }, { x: 12, y: 0 }, { x: 12, y: 5 }, { x: 0, y: 5 }], labels: [{ text: '12 cm', x: 6, y: -0.8 }, { text: '5 cm', x: 12.8, y: 2.5 }] },
  45: { type: 'fn', title: 'Opposite-Direction Meeting of Two Vehicles', xmin: 0, xmax: 3, ymin: 0, ymax: 240, fn: '70*x', fn2: '220 - 40*x', points: [{ x: 2, y: 140, label: 'Meet at t = 2 h' }] },
  48: { type: 'bar', title: 'Combined Work Rates (Pipes / Workers)', categories: ['Rate A (1/3)', 'Rate B (1/6)', 'Combined (1/2)'], values: [33.3, 16.7, 50] },
  50: { type: 'shaded_region', subtype: 'square_inscribed_circle', radius: 7, title: 'Concentric / Inscribed Area Challenge' }
};

const TAHSILI_PRACTICE_FIGS = {
  1: { type: 'fn', title: 'Quadratic Roots of x² − 5x + 6 = 0', xmin: 0, xmax: 5, ymin: -1, ymax: 4, fn: 'x*x - 5*x + 6', points: [{ x: 2, y: 0, label: '(2, 0)' }, { x: 3, y: 0, label: '(3, 0)' }] },
  3: { type: 'argand', title: 'Complex Number & Powers of i in Argand Plane', points: [{ re: 0, im: 1, label: 'i', color: '#2b5ba8' }, { re: -1, im: 0, label: 'i² = -1', color: '#dc2626' }, { re: 0, im: -1, label: 'i³ = -i', color: '#c8902a' }, { re: 1, im: 0, label: 'i⁴ = 1', color: '#10b981' }] },
  6: { type: 'fn', title: 'Domain of Radical Function √(x − 3)', xmin: 0, xmax: 12, ymin: -1, ymax: 4, fn: 'x >= 3 ? Math.sqrt(x - 3) : NaN', points: [{ x: 3, y: 0, label: '(3, 0)' }, { x: 7, y: 2, label: '(7, 2)' }] },
  8: { type: 'fn', title: 'Even Function Symmetry f(−x) = f(x)', xmin: -3, xmax: 3, ymin: -2, ymax: 6, fn: 'x*x - 1', points: [{ x: -2, y: 3, label: '(-2, 3)' }, { x: 2, y: 3, label: '(2, 3)' }] },
  10: { type: 'fn', title: 'Rational Function Asymptotes', xmin: -4, xmax: 6, ymin: -6, ymax: 8, fn: '(3*x + 1)/(x - 1)', asymptoteX: 1, fn2: '3' },
  13: { type: 'bar', title: 'Arithmetic Sequence Term Progression', categories: ['a₁', 'a₂', 'a₃', 'a₄', 'a₅'], values: [3, 7, 11, 15, 19] },
  15: { type: 'fn', title: 'Infinite Geometric Series Partial Sums', xmin: 1, xmax: 6, ymin: 0, ymax: 20, fn: '18*(1 - Math.pow(1/3, x))', fn2: '18' },
  18: { type: 'unit_circle', angle: 60, title: 'Unit Circle Reference Angle θ = 60° (π/3)' },
  20: { type: 'triangle', a: 3, b: 4, c: 5, angleA: 'θ', angleC: '90°', labelA: '3', labelB: '4', labelC: '5', title: 'Right Triangle Trigonometric Ratios (3-4-5)' },
  22: { type: 'fn', title: 'Sinusoidal Wave y = A sin(Bx)', xmin: 0, xmax: 6.28, ymin: -3.5, ymax: 3.5, fn: '3*Math.sin(2*x)' },
  25: { type: 'conic_section', subtype: 'ellipse', a: 5, b: 4, title: 'Ellipse x²/25 + y²/16 = 1 (c = 3, e = 3/5)' },
  27: { type: 'conic_section', subtype: 'parabola', c: 2, open: 'up', title: 'Parabola Focus, Vertex & Directrix' },
  29: { type: 'conic_section', subtype: 'hyperbola', a: 3, b: 4, title: 'Hyperbola x²/9 − y²/16 = 1 (c = 5, e = 5/3)' },
  32: { type: 'fn', title: 'Limit at Removable Discontinuity (x² − 4)/(x − 2)', xmin: -1, xmax: 4, ymin: 0, ymax: 6, fn: 'x + 2', points: [{ x: 2, y: 4, label: 'Limit (2, 4)' }] },
  35: { type: 'fn', title: 'Tangent Line Slope via Derivative f′(x)', xmin: -1, xmax: 3, ymin: -1, ymax: 9, fn: 'x*x', fn2: '4*x - 4', points: [{ x: 2, y: 4, label: 'Point (2, 4), m = 4' }] },
  38: { type: 'fn', title: 'Critical Points & Extrema of Cubic Polynomial', xmin: -2.5, xmax: 2.5, ymin: -4, ymax: 4, fn: 'x*x*x - 3*x', points: [{ x: -1, y: 2, label: 'Local Max' }, { x: 1, y: -2, label: 'Local Min' }] },
  41: { type: 'fn', title: 'Definite Integral Area Under Curve', xmin: 0, xmax: 3, ymin: 0, ymax: 9, fn: 'x*x', shade: { from: 0, to: 3 }, points: [{ x: 3, y: 9, label: '(3, 9)' }] },
  44: { type: 'fn', title: 'Logarithmic Curve y = log₂(x)', xmin: 0.1, xmax: 8, ymin: -3, ymax: 3.5, fn: 'Math.log2(x)', points: [{ x: 1, y: 0, label: '(1, 0)' }, { x: 4, y: 2, label: '(4, 2)' }, { x: 8, y: 3, label: '(8, 3)' }] },
  47: { type: 'normal_curve', mean: 60, sd: 5, shadeFrom: 55, shadeTo: 65, title: 'Normal Distribution N(60, 5²) — 68% Interval [55, 65]' },
  50: { type: 'argand', title: 'De Moivre Polar Complex Vector z = r(cos θ + i sin θ)', points: [{ re: 2, im: 2, label: 'z = 2 + 2i', color: '#2b5ba8' }, { re: 0, im: 8, label: 'z² = 8i', color: '#c8902a' }] }
};

function upgradePracticeSet(filePath, figMap, introText) {
  const ps = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  ps.introText = introText;
  for (const item of ps.items) {
    if (item.solution && item.solution.en) {
      item.solution.en = item.solution.en.replace(BOILERPLATE_EN, '').trim();
    }
    if (item.solution && item.solution.ar) {
      item.solution.ar = item.solution.ar.replace(BOILERPLATE_AR, '').trim();
    }
    if (figMap[item.number]) {
      item.fig = figMap[item.number];
    }
  }
  fs.writeFileSync(filePath, JSON.stringify(ps, null, 2) + '\n', 'utf8');
  console.log(`  ✓ Upgraded practice set: ${path.relative(ROOT, filePath)} (${Object.keys(figMap).length} figures attached)`);
}

upgradePracticeSet(
  path.join(QUD_DIR, '_practice-set.json'),
  QUDRAT_PRACTICE_FIGS,
  'Fifty high-yield ETEC/Qiyas GAT Qudrat problems (تجميعات المحوسب والورقي) across arithmetic, ratios & Zakat, algebra & identities, shaded-region geometry, quantitative comparisons, clock/pattern rules, data sectors, and motion/work problems. Click any problem to view the diagram and step-by-step bilingual solution.'
);

upgradePracticeSet(
  path.join(TAH_DIR, '_practice-set.json'),
  TAHSILI_PRACTICE_FIGS,
  'Fifty high-yield ETEC/Qiyas SAAT Tahsili problems (تجميعات التحصيلي — نظام المسارات ١-٢-٣) spanning Mathematical Logic, Matrices & Determinants, Complex Numbers, Rational Functions, Sequences & Infinite Series, Trigonometry, Conic Sections, 2D/3D Vectors, Polar Coordinates, Normal Distribution, Limits, Derivatives, and Integrals.'
);

console.log('\n✅ All 19 Qudrat & Tahsili chapters and 2 practice sets upgraded.');
