#!/usr/bin/env node
/**
 * scripts/build_3_new_tracks_ix.js
 * Generates src/scripts/ix-data/edexcel.js, src/scripts/ix-data/gaten.js, and src/scripts/ix-data/olympiad.js
 * with 9 bilingual interactive activities per chapter (8 chapters × 9 = 72 activities per track)
 * across all 9 active learning modes: qc, tf, mt, se, ms, sb, num, ord, cat.
 */
'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const IX_DIR = path.join(ROOT, 'src', 'scripts', 'ix-data');

function saveIx(track, D) {
  let out = `/* Interactive Practice data for /${track}/ - one entry per chapter section id.\n`;
  out += `   Shipped as public/js/ix/${track}.js and loaded only on that track's page by the\n`;
  out += `   engine in src/scripts/modules/19-interactive-activities-engine-v1.js\n`;
  out += `   (Plan 5 Phase 5.015, ADR 0033). Entry shapes (qc/mt/tf/sb/sr/fn/num/ord/cat/gp/se/ms) are\n`;
  out += `   documented there. */\n`;
  out += `(window.__ixData = window.__ixData || []).push(function (D) {\n`;
  const keys = Object.keys(D);
  keys.forEach((k, idx) => {
    out += `D[${JSON.stringify(k)}] = ${JSON.stringify(D[k], null, 2)};\n`;
    if (idx < keys.length - 1) out += '\n';
  });
  out += `});\n`;
  fs.writeFileSync(path.join(IX_DIR, `${track}.js`), out, 'utf8');
}

const CHAPTER_IX_SPECS = {
  edexcel: [
    {
      id: 'edx-number-surds-sets',
      titleEn: 'Number, Surds, Bounds & Set Notation',
      titleAr: 'الأعداد والجذور الصماء وحدود الدقة والمجموعات',
      qcQ: 'When calculating the upper bound of the quotient \\( R = \\frac{x}{y} \\) where \\( x \\) and \\( y \\) are positive rounded measurements, which combination must be used?',
      qcQAr: 'عند حساب الحد الأعلى للقسمة \\( R = \\frac{x}{y} \\) حيث \\( x \\) و \\( y \\) قياسان مقربان موجبان، أي تركيبة يجب استخدامها؟',
      qcO: [
        '\\( R_{\\max} = \\frac{x_{\\text{UB}}}{y_{\\text{LB}}} \\)',
        '\\( R_{\\max} = \\frac{x_{\\text{UB}}}{y_{\\text{UB}}} \\)',
        '\\( R_{\\max} = \\frac{x_{\\text{LB}}}{y_{\\text{UB}}} \\)',
        '\\( R_{\\max} = \\frac{x_{\\text{LB}}}{y_{\\text{LB}}} \\)'
      ],
      qcEx: 'To maximize a fraction with positive terms, maximize the numerator (UB) and minimize the denominator (LB).',
      qcExAr: 'لتعظيم كسر حدوده موجبة، نختار الحد الأعلى للبسط (UB) والحد الأدنى للمقام (LB).',
      tfItems: [
        { s: 'To rationalize the denominator of \\( \\frac{6}{3 - \\sqrt{2}} \\), multiply numerator and denominator by the conjugate \\( 3 + \\sqrt{2} \\).', s_ar: 'لإنطاق مقام الكسر \\( \\frac{6}{3 - \\sqrt{2}} \\)، نضرب البسط والمقام في المرافق \\( 3 + \\sqrt{2} \\).', a: true },
        { s: 'For two finite sets \\( A \\) and \\( B \\), \\( n(A \\cup B) = n(A) + n(B) - n(A \\cap B) \\).', s_ar: 'لأي مجموعتين منتهيتين \\( A \\) و \\( B \\) يتحقق \\( n(A \\cup B) = n(A) + n(B) - n(A \\cap B) \\).', a: true },
        { s: 'A length measured as \\( 14\\text{ cm} \\) to the nearest centimetre has upper bound \\( 14.4\\text{ cm} \\).', s_ar: 'طول مقاس قدره \\( 14\\text{ cm} \\) لأقرب سنتيمتر يكون حده الأعلى \\( 14.4\\text{ cm} \\).', a: false }
      ],
      mtPairs: [
        { l: '\\( (a - b\\sqrt{n})(a + b\\sqrt{n}) \\)', r: '\\( a^2 - b^2 n \\) (Rational difference of squares)', r_ar: '\\( a^2 - b^2 n \\) (عدد نسبي بفرق المربعين)' },
        { l: '\\( x = 0.\\dot{4}\\dot{5} \\)', r: '\\( \\frac{45}{99} = \\frac{5}{11} \\) (Recurring decimal fraction)', r_ar: '\\( \\frac{45}{99} = \\frac{5}{11} \\) (كسر عشري دوري)' },
        { l: '\\( (A \\cup B)\' \\)', r: '\\( A\' \\cap B\' \\) (De Morgan\'s Law)', r_ar: '\\( A\' \\cap B\' \\) (قانون دي مورغان)' },
        { l: '\\( 27^{-2/3} \\)', r: '\\( (\\sqrt[3]{27})^{-2} = \\frac{1}{9} \\) (Fractional negative index)', r_ar: '\\( (\\sqrt[3]{27})^{-2} = \\frac{1}{9} \\) (أس كسري سالب)' }
      ],
      numQ: 'Evaluate \\( n(A \\cup B) \\) given \\( n(A) = 24 \\), \\( n(B) = 19 \\), and \\( n(A \\cap B) = 8 \\).',
      numQAr: 'احسب \\( n(A \\cup B) \\) إذا علمت أن \\( n(A) = 24 \\) و \\( n(B) = 19 \\) و \\( n(A \\cap B) = 8 \\).',
      numA: 35,
      numH: 'Apply Inclusion-Exclusion: \\( n(A \\cup B) = n(A) + n(B) - n(A \\cap B) \\).',
      numHAr: 'طبق مبدأ الشمول والإقصاء: \\( n(A \\cup B) = n(A) + n(B) - n(A \\cap B) \\).',
      numSol: '\\( n(A \\cup B) = 24 + 19 - 8 = 35 \\).'
    },
    {
      id: 'edx-algebra-quadratics',
      titleEn: 'Algebraic Fractions, Quadratics & Simultaneous Systems',
      titleAr: 'الكسور الجبرية والمعادلات التربيعية والأنظمة الآنية',
      qcQ: 'When simplifying the algebraic fraction \\( \\frac{2x^2 - 18}{x^2 - 5x + 6} \\), what is the fully simplified expression for \\( x \\neq 2, 3 \\)?',
      qcQAr: 'عند تبسيط الكسر الجبري \\( \\frac{2x^2 - 18}{x^2 - 5x + 6} \\)، ما هي الصورة المبسطة النهائية حيث \\( x \\neq 2, 3 \\)؟',
      qcO: [
        '\\( \\frac{2(x + 3)}{x - 2} \\)',
        '\\( \\frac{2(x - 3)}{x - 2} \\)',
        '\\( \\frac{x + 3}{x - 2} \\)',
        '\\( \\frac{2(x + 3)}{x + 2} \\)'
      ],
      qcEx: 'Factor numerator as \\( 2(x - 3)(x + 3) \\) and denominator as \\( (x - 2)(x - 3) \\), then cancel \\( (x - 3) \\).',
      qcExAr: 'حلل البسط إلى \\( 2(x - 3)(x + 3) \\) والمقام إلى \\( (x - 2)(x - 3) \\) ثم اختصر \\( (x - 3) \\).',
      tfItems: [
        { s: 'The quadratic inequality \\( (x - 1)(x - 5) < 0 \\) has solution set \\( 1 < x < 5 \\).', s_ar: 'المتباينة التربيعية \\( (x - 1)(x - 5) < 0 \\) مجموعة حلها هي \\( 1 < x < 5 \\).', a: true },
        { s: 'Completing the square on \\( x^2 - 6x + 13 \\) yields \\( (x - 3)^2 + 4 \\), which has minimum value \\( 4 \\).', s_ar: 'إكمال المربع للمقدار \\( x^2 - 6x + 13 \\) يعطي \\( (x - 3)^2 + 4 \\) وقيمته الصغرى \\( 4 \\).', a: true },
        { s: 'To solve \\( x^2 + y^2 = 25 \\) and \\( y = x + 1 \\), you can add the two equations directly to eliminate \\( x \\).', s_ar: 'لحل النظام \\( x^2 + y^2 = 25 \\) و \\( y = x + 1 \\)، يمكن جمع المعادلتين مباشرة لحذف \\( x \\).', a: false }
      ],
      mtPairs: [
        { l: '\\( x^2 - 9 < 0 \\)', r: 'Inside interval: \\( -3 < x < 3 \\)', r_ar: 'الفترة الداخلية: \\( -3 < x < 3 \\)' },
        { l: '\\( x^2 - 9 > 0 \\)', r: 'Outside intervals: \\( x < -3 \\) or \\( x > 3 \\)', r_ar: 'الفترتان الخارجيتان: \\( x < -3 \\) أو \\( x > 3 \\)' },
        { l: '\\( a(x - h)^2 + k \\)', r: 'Turning point at \\( (h, k) \\), axis \\( x = h \\)', r_ar: 'نقطة الرأس \\( (h, k) \\) ومحور التماثل \\( x = h \\)' },
        { l: '\\( b^2 - 4ac = 0 \\)', r: 'Line is tangent to the quadratic curve', r_ar: 'المستقيم مماس للمنحنى التربيعي' }
      ],
      numQ: 'Find the minimum value of the quadratic expression \\( x^2 - 10x + 32 \\) for real \\( x \\).',
      numQAr: 'أوجد القيمة الصغرى للمقدار التربيعي \\( x^2 - 10x + 32 \\) لكل \\( x \\) حقيقي.',
      numA: 7,
      numH: 'Complete the square: \\( (x - 5)^2 - 25 + 32 \\).',
      numHAr: 'أكمل المربع: \\( (x - 5)^2 - 25 + 32 \\).',
      numSol: 'Since \\( x^2 - 10x + 32 = (x - 5)^2 + 7 \\) and \\( (x - 5)^2 \\ge 0 \\), the minimum value is \\( 7 \\).'
    },
    {
      id: 'edx-functions-sequences',
      titleEn: 'Functions, Transformations & Arithmetic Series',
      titleAr: 'الدوال والتحويلات الهندسية والمتسلسلات الحسابية',
      qcQ: 'If \\( f(x) = 3x - 2 \\) and \\( g(x) = x^2 + 1 \\), what is the composite function \\( fg(x) \\)?',
      qcQAr: 'إذا كانت \\( f(x) = 3x - 2 \\) و \\( g(x) = x^2 + 1 \\)، فما هي الدالة المركبة \\( fg(x) \\)؟',
      qcO: [
        '\\( 3x^2 + 1 \\)',
        '\\( 9x^2 - 12x + 5 \\)',
        '\\( 3x^2 - 1 \\)',
        '\\( 3x^3 - 2x^2 + 3x - 2 \\)'
      ],
      qcEx: 'Apply \\( g \\) first, then substitute into \\( f \\): \\( f(g(x)) = 3(x^2 + 1) - 2 = 3x^2 + 1 \\).',
      qcExAr: 'طبّق \\( g \\) أولاً ثم عوّض في \\( f \\): \\( f(g(x)) = 3(x^2 + 1) - 2 = 3x^2 + 1 \\).',
      tfItems: [
        { s: 'The graph of \\( y = f(x - 4) \\) is a horizontal translation of \\( y = f(x) \\) by \\( 4 \\) units to the right.', s_ar: 'منحنى \\( y = f(x - 4) \\) هو إزاحة أفقية لمنحنى \\( y = f(x) \\) بمقدار \\( 4 \\) وحدات لليمين.', a: true },
        { s: 'The sum of the first \\( n \\) terms of an arithmetic series with first term \\( a \\) and common difference \\( d \\) is \\( S_n = \\frac{n}{2}[2a + (n - 1)d] \\).', s_ar: 'مجموع أول \\( n \\) حداً في متتابعة حسابية هو \\( S_n = \\frac{n}{2}[2a + (n - 1)d] \\).', a: true },
        { s: 'For \\( f(x) = \\frac{5}{x - 3} \\), the value \\( x = 3 \\) must be excluded because it makes the numerator zero.', s_ar: 'في الدالة \\( f(x) = \\frac{5}{x - 3} \\)، تُستبعد القيمة \\( x = 3 \\) لأنها تجعل البسط صفراً.', a: false }
      ],
      mtPairs: [
        { l: '\\( y = f(x) + k \\)', r: 'Vertical translation by vector \\( \\binom{0}{k} \\)', r_ar: 'إزاحة رأسية بالمتجه \\( \\binom{0}{k} \\)' },
        { l: '\\( y = f(x - h) \\)', r: 'Horizontal translation by vector \\( \\binom{h}{0} \\)', r_ar: 'إزاحة أفقية بالمتجه \\( \\binom{h}{0} \\)' },
        { l: '\\( u_n = a + (n - 1)d \\)', r: 'General \\( n \\)th term of an arithmetic sequence', r_ar: 'الحد النوني العام للمتتابعة الحسابية' },
        { l: '\\( f^{-1}(x) \\)', r: 'Reflection of \\( y = f(x) \\) across the line \\( y = x \\)', r_ar: 'انعكاس منحنى \\( y = f(x) \\) حول المستقيم \\( y = x \\)' }
      ],
      numQ: 'Find the sum of the first \\( 20 \\) terms of the arithmetic series \\( 5 + 8 + 11 + 14 + \\dots \\)',
      numQAr: 'أوجد مجموع أول \\( 20 \\) حداً من المتسلسلة الحسابية \\( 5 + 8 + 11 + 14 + \\dots \\)',
      numA: 670,
      numH: 'Use \\( S_{20} = \\frac{20}{2}[2(5) + (20 - 1)(3)] \\).',
      numHAr: 'استخدم القانون \\( S_{20} = \\frac{20}{2}[2(5) + (20 - 1)(3)] \\).',
      numSol: '\\( S_{20} = 10 \\times (10 + 57) = 10 \\times 67 = 670 \\).'
    },
    {
      id: 'edx-coord-geometry',
      titleEn: 'Coordinate Geometry, Perpendicular Bisectors & Linear Programming',
      titleAr: 'الهندسة الإحداثية والمنصفات العمودية والبرمجة الخطية',
      qcQ: 'What is the gradient of the perpendicular bisector of the line segment joining \\( A(1, 2) \\) and \\( B(5, 10) \\)?',
      qcQAr: 'ما هو ميل المنصف العمودي للقطعة المستقيمة الواصلة بين \\( A(1, 2) \\) و \\( B(5, 10) \\)؟',
      qcO: [
        '\\( -\\frac{1}{2} \\)',
        '\\( 2 \\)',
        '\\( \\frac{1}{2} \\)',
        '\\( -2 \\)'
      ],
      qcEx: 'The gradient of \\( AB \\) is \\( m_{AB} = \\frac{10 - 2}{5 - 1} = 2 \\), so the perpendicular gradient is \\( m_\\perp = -\\frac{1}{2} \\).',
      qcExAr: 'ميل القطعة \\( AB \\) هو \\( m_{AB} = \\frac{10 - 2}{5 - 1} = 2 \\)، وبالتالي ميل العمودي هو \\( -\\frac{1}{2} \\).',
      tfItems: [
        { s: 'Two non-vertical lines with gradients \\( m_1 \\) and \\( m_2 \\) are perpendicular if and only if \\( m_1 m_2 = -1 \\).', s_ar: 'يتعامد مستقيمان غير رأسيين ميلاهما \\( m_1 \\) و \\( m_2 \\) إذا وفقط إذا كان \\( m_1 m_2 = -1 \\).', a: true },
        { s: 'In Edexcel IGCSE diagrams, a strict inequality such as \\( y < 2x + 3 \\) is drawn with a dashed boundary line.', s_ar: 'في رسومات Edexcel IGCSE، تُمثّل المتباينة الصارمة مثل \\( y < 2x + 3 \\) بخط حدودي متقطع.', a: true },
        { s: 'The midpoint of \\( (x_1, y_1) \\) and \\( (x_2, y_2) \\) is \\( \\left(\\frac{x_2 - x_1}{2}, \\frac{y_2 - y_1}{2}\\right) \\).', s_ar: 'نقطة المنتصف بين نقطتين تُحسب بطرح الإحداثيات وقسمتها على 2.', a: false }
      ],
      mtPairs: [
        { l: '\\( m_1 = m_2 \\)', r: 'Parallel lines in the Cartesian plane', r_ar: 'مستقيمان متوازيان في المستوى الإحداثي' },
        { l: '\\( m_1 m_2 = -1 \\)', r: 'Perpendicular lines meeting at \\( 90^\\circ \\)', r_ar: 'مستقيمان متعامدان بزاوية \\( 90^\\circ \\)' },
        { l: '\\( \\sqrt{(x_2-x_1)^2 + (y_2-y_1)^2} \\)', r: 'Exact Euclidean distance between two points', r_ar: 'المسافة الإقليدية الدقيقة بين نقطتين' },
        { l: '\\( y - y_1 = m(x - x_1) \\)', r: 'Point-gradient form of a straight line', r_ar: 'صيغة الميل ونقطة لمعادلة المستقيم' }
      ],
      numQ: 'Find the exact distance between the points \\( P(-2, 1) \\) and \\( Q(6, 7) \\).',
      numQAr: 'أوجد المسافة الدقيقة بين النقطتين \\( P(-2, 1) \\) و \\( Q(6, 7) \\).',
      numA: 10,
      numH: 'Compute \\( \\sqrt{(6 - (-2))^2 + (7 - 1)^2} \\).',
      numHAr: 'احسب \\( \\sqrt{(6 - (-2))^2 + (7 - 1)^2} \\).',
      numSol: '\\( d = \\sqrt{8^2 + 6^2} = \\sqrt{64 + 36} = \\sqrt{100} = 10 \\).'
    },
    {
      id: 'edx-geometry-circles',
      titleEn: 'Circle Theorems, Intersecting Chords & Mensuration',
      titleAr: 'نظريات الدائرة والأوتار المتقاطعة وقياس الأشكال والمجسمات',
      qcQ: 'Two chords \\( AB \\) and \\( CD \\) intersect internally at \\( P \\) inside a circle. Given \\( AP = 4\\text{ cm} \\), \\( PB = 9\\text{ cm} \\), and \\( CP = 3\\text{ cm} \\), find \\( PD \\).',
      qcQAr: 'وتران \\( AB \\) و \\( CD \\) يتقاطعان داخلياً في النقطة \\( P \\) داخل دائرة. إذا كان \\( AP = 4 \\) و \\( PB = 9 \\) و \\( CP = 3 \\)، فأوجد \\( PD \\).',
      qcO: [
        '\\( 12\\text{ cm} \\)',
        '\\( 6\\text{ cm} \\)',
        '\\( 10\\text{ cm} \\)',
        '\\( 15\\text{ cm} \\)'
      ],
      qcEx: 'By the intersecting chords theorem, \\( AP \\cdot PB = CP \\cdot PD \\implies 4 \\times 9 = 3 \\times PD \\implies PD = 12\\text{ cm} \\).',
      qcExAr: 'من نظرية الأوتار المتقاطعة: \\( AP \\cdot PB = CP \\cdot PD \\implies 4 \\times 9 = 3 \\times PD \\implies PD = 12 \\).',
      tfItems: [
        { s: 'By the Alternate Segment Theorem, the angle between a tangent and a chord equals the angle subtended by the chord in the alternate segment.', s_ar: 'حسب نظرية القطعة المتبادلة، الزاوية بين المماس والوتر تساوي الزاوية المحيطية المرسومة على الوتر في الجهة المقابلة.', a: true },
        { s: 'If two similar solids have linear scale factor \\( k \\), then the ratio of their volumes is \\( k^3 \\).', s_ar: 'إذا كان معامل التشابه الخطي لمجسمين متشابهين هو \\( k \\)، فإن نسبة حجميهما هي \\( k^3 \\).', a: true },
        { s: 'Opposite angles of a cyclic quadrilateral are always equal to each other.', s_ar: 'الزاويتان المتقابلتان في الشكل الرباعي الدائري متساويتان دائماً.', a: false }
      ],
      mtPairs: [
        { l: 'Tangent-Secant Theorem', r: '\\( PT^2 = PA \\cdot PB \\)', r_ar: '\\( PT^2 = PA \\cdot PB \\)' },
        { l: 'Cyclic Quadrilateral', r: 'Opposite angles sum to \\( 180^\\circ \\)', r_ar: 'مجموع كل زاويتين متقابلتين \\( 180^\\circ \\)' },
        { l: 'Similar Solids (Linear Ratio \\( k \\))', r: 'Area ratio \\( k^2 \\), Volume ratio \\( k^3 \\)', r_ar: 'نسبة المساحة \\( k^2 \\) ونسبة الحجم \\( k^3 \\)' },
        { l: 'Angle at the Centre', r: 'Twice the angle at the circumference on the same arc', r_ar: 'ضعف الزاوية المحيطية المشتركة معها في القوس' }
      ],
      numQ: 'From an external point \\( P \\), a tangent \\( PT \\) and a secant \\( PAB \\) are drawn to a circle. If \\( PA = 4\\text{ cm} \\) and \\( AB = 5\\text{ cm} \\), find the length of the tangent \\( PT \\) in cm.',
      numQAr: 'من نقطة خارجية \\( P \\)، رُسم مماس \\( PT \\) وقاطع \\( PAB \\) لدائرة. إذا كان \\( PA = 4 \\) و \\( AB = 5 \\)، فأوجد طول المماس \\( PT \\).',
      numA: 6,
      numH: 'Note that \\( PB = PA + AB = 4 + 5 = 9 \\), then use \\( PT^2 = PA \\cdot PB \\).',
      numHAr: 'لاحظ أن \\( PB = PA + AB = 4 + 5 = 9 \\)، ثم طبق \\( PT^2 = PA \\cdot PB \\).',
      numSol: '\\( PT^2 = 4 \\times (4 + 5) = 4 \\times 9 = 36 \\implies PT = 6\\text{ cm} \\).'
    },
    {
      id: 'edx-trig-3d-vectors',
      titleEn: 'Sine & Cosine Rules, 3D Trigonometry & Vector Proofs',
      titleAr: 'قانونا الجيب وجيب التمام وحساب المثلثات ثلاثي الأبعاد والمتجهات',
      qcQ: 'What is the length of the space diagonal of a rectangular box (cuboid) with dimensions \\( 3\\text{ cm} \\times 4\\text{ cm} \\times 12\\text{ cm} \\)?',
      qcQAr: 'ما هو طول القطر الفراغي لمتوازي مستطيلات أبعاده \\( 3 \\times 4 \\times 12\\text{ cm} \\)؟',
      qcO: [
        '\\( 13\\text{ cm} \\)',
        '\\( 15\\text{ cm} \\)',
        '\\( 17\\text{ cm} \\)',
        '\\( 19\\text{ cm} \\)'
      ],
      qcEx: 'By 3D Pythagoras, \\( D = \\sqrt{3^2 + 4^2 + 12^2} = \\sqrt{9 + 16 + 144} = \\sqrt{169} = 13\\text{ cm} \\).',
      qcExAr: 'بتطبيق فيثاغورس ثلاثي الأبعاد: \\( D = \\sqrt{3^2 + 4^2 + 12^2} = \\sqrt{169} = 13 \\).',
      tfItems: [
        { s: 'The area of any triangle with sides \\( a, b \\) and included angle \\( C \\) is \\( \\frac{1}{2}ab\\sin C \\).', s_ar: 'مساحة أي مثلث علم فيه ضلعان \\( a, b \\) والزاوية المحصورة \\( C \\) هي \\( \\frac{1}{2}ab\\sin C \\).', a: true },
        { s: 'If \\( \\overrightarrow{AB} = k\\overrightarrow{BC} \\) for a non-zero scalar \\( k \\), then points \\( A, B, C \\) are collinear.', s_ar: 'إذا كان \\( \\overrightarrow{AB} = k\\overrightarrow{BC} \\) لثابت غير صفري \\( k \\)، فإن النقاط \\( A, B, C \\) تقع على استقامة واحدة.', a: true },
        { s: 'In the Cosine Rule \\( c^2 = a^2 + b^2 - 2ab\\cos C \\), if \\( C \\) is obtuse (\\( 90^\\circ < C < 180^\\circ \\)), then \\( \\cos C \\) is positive.', s_ar: 'في قانون جيب التمام، إذا كانت الزاوية \\( C \\) منفرجة فإن \\( \\cos C \\) يكون موجباً.', a: false }
      ],
      mtPairs: [
        { l: '\\( c^2 = a^2 + b^2 - 2ab\\cos C \\)', r: 'Cosine Rule for side length (SAS) or angle (SSS)', r_ar: 'قانون جيب التمام لإيجاد ضلع أو زاوية' },
        { l: '\\( \\frac{a}{\\sin A} = \\frac{b}{\\sin B} \\)', r: 'Sine Rule for matching opposite side-angle pairs', r_ar: 'قانون الجيب للأضلاع والزوايا المتقابلة' },
        { l: '\\( \\overrightarrow{AB} = \\mathbf{b} - \\mathbf{a} \\)', r: 'Displacement vector from position vectors', r_ar: 'متجه الإزاحة بدلالة متجهي الموضع' },
        { l: '\\( \\tan\\theta = \\frac{h}{\\sqrt{l^2 + w^2}} \\)', r: 'Angle between space diagonal and horizontal base', r_ar: 'الزاوية بين القطر الفراغي والقاعدة الأفقية' }
      ],
      numQ: 'Find the area (in \\( \\text{cm}^2 \\)) of a triangle with sides \\( a = 8\\text{ cm} \\), \\( b = 10\\text{ cm} \\), and included angle \\( C = 30^\\circ \\).',
      numQAr: 'أوجد مساحة مثلث (بوحدة \\( \\text{cm}^2 \\)) طول ضلعين فيه \\( 8 \\) و \\( 10 \\) والزاوية المحصورة بينهما \\( 30^\\circ \\).',
      numA: 20,
      numH: 'Use \\( \\text{Area} = \\frac{1}{2}ab\\sin C \\) with \\( \\sin 30^\\circ = 0.5 \\).',
      numHAr: 'استخدم \\( \\text{Area} = \\frac{1}{2}ab\\sin C \\) مع \\( \\sin 30^\\circ = 0.5 \\).',
      numSol: '\\( \\text{Area} = \\frac{1}{2} \\times 8 \\times 10 \\times \\sin 30^\\circ = 40 \\times 0.5 = 20\\text{ cm}^2 \\).'
    },
    {
      id: 'edx-calculus-kinematics',
      titleEn: 'Differentiation, Stationary Points & Kinematics',
      titleAr: 'التفاضل والنقاط الحرجة وتطبيقات الحركة (الكينماتيكا)',
      qcQ: 'A particle moves along a straight line with displacement \\( s(t) = t^3 - 6t^2 + 9t + 2 \\) metres at time \\( t \\ge 0 \\) seconds. At what times is the particle instantaneously at rest?',
      qcQAr: 'يتحرك جسيم في خط مستقيم بحيث إزاحته \\( s(t) = t^3 - 6t^2 + 9t + 2 \\) متر عند الزمن \\( t \\ge 0 \\). متى يسكن الجسيم لحظياً؟',
      qcO: [
        '\\( t = 1\\text{ s} \\) and \\( t = 3\\text{ s} \\)',
        '\\( t = 2\\text{ s} \\) only',
        '\\( t = 0\\text{ s} \\) and \\( t = 6\\text{ s} \\)',
        '\\( t = 3\\text{ s} \\) only'
      ],
      qcEx: 'Set velocity \\( v(t) = \\frac{ds}{dt} = 3t^2 - 12t + 9 = 3(t - 1)(t - 3) = 0 \\implies t = 1\\text{ s}, 3\\text{ s} \\).',
      qcExAr: 'بوضع السرعة \\( v(t) = \\frac{ds}{dt} = 3t^2 - 12t + 9 = 3(t - 1)(t - 3) = 0 \\) نجد \\( t = 1, 3 \\).',
      tfItems: [
        { s: 'If \\( \\frac{dy}{dx} = 0 \\) and \\( \\frac{d^2y}{dx^2} < 0 \\) at \\( x = x_0 \\), then the curve has a local maximum at \\( x = x_0 \\).', s_ar: 'إذا كان \\( \\frac{dy}{dx} = 0 \\) و \\( \\frac{d^2y}{dx^2} < 0 \\) عند \\( x_0 \\)، فإن للمنحنى نهاية عظمى محلية عند \\( x_0 \\).', a: true },
        { s: 'Instantaneous acceleration \\( a(t) \\) is the derivative of velocity \\( \\frac{dv}{dt} \\), which equals \\( \\frac{d^2s}{dt^2} \\).', s_ar: 'العجلة اللحظية \\( a(t) \\) هي مشتقة السرعة \\( \\frac{dv}{dt} \\) وتساوي المشتقة الثانية للإزاحة \\( \\frac{d^2s}{dt^2} \\).', a: true },
        { s: 'The derivative of \\( y = \\frac{4}{x^2} \\) with respect to \\( x \\) is \\( \\frac{dy}{dx} = \\frac{4}{2x} \\).', s_ar: 'مشتقة الدالة \\( y = \\frac{4}{x^2} \\) بالنسبة إلى \\( x \\) هي \\( \\frac{4}{2x} \\).', a: false }
      ],
      mtPairs: [
        { l: '\\( \\frac{d}{dx}(ax^n) \\)', r: '\\( nax^{n-1} \\) (Power rule of differentiation)', r_ar: '\\( nax^{n-1} \\) (قاعدة القوى في الاشتقاق)' },
        { l: '\\( v(t) = \\frac{ds}{dt} = 0 \\)', r: 'Particle is instantaneously at rest', r_ar: 'الجسيم في حالة سكون لحظي' },
        { l: '\\( \\frac{d^2y}{dx^2} > 0 \\) at stationary point', r: 'Local minimum turning point', r_ar: 'نقطة حرجة صغرى محلية' },
        { l: '\\( a(t) = \\frac{dv}{dt} \\)', r: 'Instantaneous rate of change of velocity', r_ar: 'معدل التغير اللحظي للسرعة (التسارع)' }
      ],
      numQ: 'Find the gradient of the curve \\( y = 2x^3 - 5x + 4 \\) at the point where \\( x = 2 \\).',
      numQAr: 'أوجد ميل المنحنى \\( y = 2x^3 - 5x + 4 \\) عند النقطة التي فيها \\( x = 2 \\).',
      numA: 19,
      numH: 'Differentiate \\( \\frac{dy}{dx} = 6x^2 - 5 \\) and substitute \\( x = 2 \\).',
      numHAr: 'اشتق \\( \\frac{dy}{dx} = 6x^2 - 5 \\) ثم عوّض عن \\( x = 2 \\).',
      numSol: 'At \\( x = 2 \\), \\( \\frac{dy}{dx} = 6(2)^2 - 5 = 24 - 5 = 19 \\).'
    },
    {
      id: 'edx-stats-probability',
      titleEn: 'Histograms, Cumulative Frequency & Conditional Probability',
      titleAr: 'المدرجات التكرارية والتكرار المتجمع والاحتمال الشرطي',
      qcQ: 'In a histogram with unequal class intervals, a class \\( 20 < t \\le 35 \\) has frequency \\( 45 \\). What is its Frequency Density?',
      qcQAr: 'في مدرج تكراري غير متساوي الفئات، الفئة \\( 20 < t \\le 35 \\) تكرارها \\( 45 \\). ما هي كثافة التكرار لها؟',
      qcO: [
        '\\( 3 \\)',
        '\\( 2.25 \\)',
        '\\( 15 \\)',
        '\\( 675 \\)'
      ],
      qcEx: 'Class width is \\( 35 - 20 = 15 \\), so \\( \\text{Frequency Density} = \\frac{45}{15} = 3 \\).',
      qcExAr: 'طول الفئة هو \\( 35 - 20 = 15 \\)، وبالتالي كثافة التكرار \\( = \\frac{45}{15} = 3 \\).',
      tfItems: [
        { s: 'In a histogram, the area of each bar is proportional to the frequency of that class interval.', s_ar: 'في المدرج التكراري، تتناسب مساحة كل عمود طردياً مع تكرار تلك الفئة.', a: true },
        { s: 'The interquartile range (IQR) is defined as \\( Q_3 - Q_1 \\), measuring the spread of the middle \\( 50\\% \\) of the data.', s_ar: 'المدى الربيعي (IQR) يُعرّف بأنه \\( Q_3 - Q_1 \\) ويقيس تشتت النصف الأوسط (\\( 50\\% \\)) من البيانات.', a: true },
        { s: 'When drawing 2 counters without replacement from a bag of 10 counters, the denominator of the second draw remains 10.', s_ar: 'عند سحب كرتين بدون إرجاع من كيس به 10 كرات، يبقى مقام السحبة الثانية 10.', a: false }
      ],
      mtPairs: [
        { l: '\\( \\text{Frequency Density} \\)', r: '\\( \\frac{\\text{Frequency}}{\\text{Class Width}} \\)', r_ar: '\\( \\frac{\\text{التكرار}}{\\text{طول الفئة}} \\)' },
        { l: '\\( \\text{IQR} = Q_3 - Q_1 \\)', r: 'Spread between 75th and 25th percentiles on an ogive', r_ar: 'الفرق بين المئين 75 والمئين 25 على المنحنى المتجمع' },
        { l: '\\( P(A \\cap B) = P(A)P(B \\mid A) \\)', r: 'Multiplication rule for dependent events (no replacement)', r_ar: 'قاعدة الضرب للأحداث غير المستقلة (بدون إرجاع)' },
        { l: '\\( 1 - P(\\text{none}) \\)', r: 'Complement shortcut for \\( P(\\text{at least one}) \\)', r_ar: 'طريقة الحدث المتمم لحساب \\( P(\\text{واحد على الأقل}) \\)' }
      ],
      numQ: 'A class interval \\( 10 < x \\le 30 \\) in a histogram has a frequency density of \\( 2.4 \\). Find the frequency of this class.',
      numQAr: 'فئة \\( 10 < x \\le 30 \\) في مدرج تكراري كثافة تكرارها \\( 2.4 \\). أوجد التكرار الفعلي لهذه الفئة.',
      numA: 48,
      numH: 'Multiply the class width \\( (30 - 10 = 20) \\) by the frequency density \\( 2.4 \\).',
      numHAr: 'اضرب طول الفئة \\( (30 - 10 = 20) \\) في كثافة التكرار \\( 2.4 \\).',
      numSol: '\\( \\text{Frequency} = \\text{Width} \\times \\text{FD} = 20 \\times 2.4 = 48 \\).'
    }
  ],
  gaten: [
    {
      id: 'ge-arithmetic-shortcuts',
      titleEn: 'GAT Mental Arithmetic, Divisibility, Cyclicity & Surds',
      titleAr: 'الحساب الذهني السريع وقابلية القسمة ودورية الآحاد والجذور (GAT)',
      qcQ: 'Without a calculator, evaluate \\( 503^2 - 497^2 \\) using a GAT mental shortcut.',
      qcQAr: 'بدون آلة حاسبة، احسب قيمة \\( 503^2 - 497^2 \\) باستخدام مهارات الحل السريع للقدرات.',
      qcO: [
        '\\( 6000 \\)',
        '\\( 3600 \\)',
        '\\( 1000 \\)',
        '\\( 600 \\)'
      ],
      qcEx: 'By difference of squares, \\( (503 - 497)(503 + 497) = 6 \\times 1000 = 6000 \\).',
      qcExAr: 'بفرق المربعين: \\( (503 - 497)(503 + 497) = 6 \\times 1000 = 6000 \\).',
      tfItems: [
        { s: 'The units digit of \\( 7^n \\) repeats in a 4-cycle \\( (7, 9, 3, 1) \\), so \\( 7^{100} \\) ends in \\( 1 \\).', s_ar: 'رقم آحاد \\( 7^n \\) يتكرر في دورة رباعية \\( (7, 9, 3, 1) \\)، وبالتالي \\( 7^{100} \\) آحاده \\( 1 \\).', a: true },
        { s: 'In telescoping products, \\( \\left(1 + \\frac{1}{2}\\right)\\left(1 + \\frac{1}{3}\\right)\\cdots\\left(1 + \\frac{1}{9}\\right) = \\frac{10}{2} = 5 \\).', s_ar: 'في الضرب التلسكوبي: \\( \\left(1 + \\frac{1}{2}\\right)\\left(1 + \\frac{1}{3}\\right)\\cdots\\left(1 + \\frac{1}{9}\\right) = \\frac{10}{2} = 5 \\).', a: true },
        { s: '\\( \\sqrt{36 + 64} = \\sqrt{36} + \\sqrt{64} = 6 + 8 = 14 \\).', s_ar: 'قيمة \\( \\sqrt{36 + 64} \\) تساوي \\( 6 + 8 = 14 \\).', a: false }
      ],
      mtPairs: [
        { l: '\\( a^2 - b^2 \\)', r: '\\( (a - b)(a + b) \\) (Instant mental factoring)', r_ar: '\\( (a - b)(a + b) \\) (تحليل فرق المربعين السريع)' },
        { l: 'Units digit of \\( 3^{4k+2} \\)', r: 'Always \\( 9 \\) (since \\( 3^2 = 9 \\) in the 4-cycle)', r_ar: 'دائماً \\( 9 \\) (من دورة قوى العدد 3)' },
        { l: '\\( 2^x + 2^x + 2^x + 2^x \\)', r: '\\( 4 \\cdot 2^x = 2^{x+2} \\) (Factoring equal powers)', r_ar: '\\( 4 \\cdot 2^x = 2^{x+2} \\) (جمع القوى المتماثلة)' },
        { l: 'Divisibility by \\( 9 \\)', r: 'Sum of the digits is a multiple of \\( 9 \\)', r_ar: 'مجموع أرقام العدد يقبل القسمة على \\( 9 \\)' }
      ],
      numQ: 'What is the units digit (ones digit) of \\( 3^{41} \\)?',
      numQAr: 'ما هو رقم الآحاد للعدد \\( 3^{41} \\)؟',
      numA: 3,
      numH: 'Divide the exponent \\( 41 \\) by the cycle length \\( 4 \\) and find the remainder.',
      numHAr: 'اقسم الأس \\( 41 \\) على طول الدورة \\( 4 \\) وخذ الباقي.',
      numSol: 'Since \\( 41 = 4 \\times 10 + 1 \\), the remainder is \\( 1 \\), so the units digit is \\( 3^1 = 3 \\).'
    },
    {
      id: 'ge-ratios-rates-word',
      titleEn: 'GAT Ratios, Percentages, Mixtures, Work & Motion Problems',
      titleAr: 'النسب المئوية والتناسب والخلطات ومسائل العمل والحركة (GAT)',
      qcQ: 'A car travels from city A to city B at \\( 60\\text{ km/h} \\) and returns along the same route at \\( 40\\text{ km/h} \\). What is its average speed for the entire round trip?',
      qcQAr: 'تقطع سيارة المسافة بين مدينتين بسرعة \\( 60\\text{ km/h} \\) ذهاباً وبسرعة \\( 40\\text{ km/h} \\) إياباً. ما هي السرعة المتوسطة للرحلة كاملة؟',
      qcO: [
        '\\( 48\\text{ km/h} \\)',
        '\\( 50\\text{ km/h} \\)',
        '\\( 45\\text{ km/h} \\)',
        '\\( 52\\text{ km/h} \\)'
      ],
      qcEx: 'Use the harmonic mean formula: \\( v_{\\text{avg}} = \\frac{2v_1 v_2}{v_1 + v_2} = \\frac{2(60)(40)}{60 + 40} = \\frac{4800}{100} = 48\\text{ km/h} \\).',
      qcExAr: 'استخدم قانون الوسط التوافقي للسرعة المتوسطة: \\( v_{\\text{avg}} = \\frac{2(60)(40)}{60 + 40} = 48\\text{ km/h} \\).',
      tfItems: [
        { s: 'A \\( 20\\% \\) price increase followed by a \\( 20\\% \\) discount results in a net \\( 4\\% \\) decrease (\\( 1.2 \\times 0.8 = 0.96 \\)).', s_ar: 'زيادة السعر بنسبة \\( 20\\% \\) ثم تخفيضه بنسبة \\( 20\\% \\) يؤدي إلى نقصان صافي قدره \\( 4\\% \\).', a: true },
        { s: 'If Worker A takes 3 hours and Worker B takes 6 hours, together they finish in \\( \\frac{3 \\times 6}{3 + 6} = 2 \\) hours.', s_ar: 'إذا أنجز الأول العمل في 3 ساعات والثاني في 6 ساعات، فإنهما ينجزانه معاً في \\( \\frac{3 \\times 6}{3 + 6} = 2 \\) ساعة.', a: true },
        { s: 'When two trains move in opposite directions toward each other, their relative closing speed is the difference of their speeds.', s_ar: 'عندما يتحرك قطاران في اتجاهين متعاكسين، فإن سرعتهما النسبية هي الفرق بين سرعتيهما.', a: false }
      ],
      mtPairs: [
        { l: '\\( \\frac{2v_1 v_2}{v_1 + v_2} \\)', r: 'Average speed over equal-distance round trip', r_ar: 'السرعة المتوسطة لرحلة ذهاب وإياب متساوية المسافة' },
        { l: '\\( \\frac{t_1 t_2}{t_1 + t_2} \\)', r: 'Combined time for two workers acting together', r_ar: 'الزمن المشترك لإنجاز عمل معاً' },
        { l: '\\( x + y + \\frac{xy}{100} \\)', r: 'Net percentage change after \\( x\\% \\) and \\( y\\% \\)', r_ar: 'النسبة المئوية الصافية للتغير المتتالي' },
        { l: '\\( v_1 + v_2 \\)', r: 'Relative speed for opposite-direction motion', r_ar: 'السرعة النسبية للحركة في اتجاهين متعاكسين' }
      ],
      numQ: 'Pipe A fills a tank in \\( 12 \\) minutes and Pipe B fills the same tank in \\( 6 \\) minutes. How many minutes does it take to fill the tank when both pipes are open together?',
      numQAr: 'يملأ الصنبور الأول خزاناً في \\( 12 \\) دقيقة ويملؤه الثاني في \\( 6 \\) دقائق. كم دقيقة يستغرق ملء الخزان عند فتحهما معاً؟',
      numA: 4,
      numH: 'Compute \\( T = \\frac{12 \\times 6}{12 + 6} \\).',
      numHAr: 'احسب \\( T = \\frac{12 \\times 6}{12 + 6} \\).',
      numSol: '\\( T = \\frac{72}{18} = 4 \\) minutes.'
    },
    {
      id: 'ge-quant-comparisons',
      titleEn: 'GAT Quantitative Comparisons (Choices A/B/C/D) & Fast Geometry',
      titleAr: 'المقارنات الكمية (الخيارات أ/ب/ج/د) والهندسة السريعة (GAT)',
      qcQ: 'Given \\( x^2 = 25 \\) with no sign restriction on \\( x \\), compare Quantity A: \\( x \\) and Quantity B: \\( 5 \\).',
      qcQAr: 'إذا كان \\( x^2 = 25 \\) دون تحديد إشارة \\( x \\)، قارن بين القيمة الأولى: \\( x \\) والقيمة الثانية: \\( 5 \\).',
      qcO: [
        'Choice D — The given information is insufficient (since \\( x = 5 \\) gives C and \\( x = -5 \\) gives B)',
        'Choice C — The two quantities are equal',
        'Choice A — Quantity A is greater',
        'Choice B — Quantity B is greater'
      ],
      qcEx: 'Because \\( x \\) can be \\( +5 \\) (equal) or \\( -5 \\) (less than 5), the relationship changes, making Choice D correct.',
      qcExAr: 'بما أن \\( x \\) قد تساوي \\( +5 \\) أو \\( -5 \\)، تختلف نتيجة المقارنة فيكون الخيار الصحيح هو (د) المعطيات غير كافية.',
      tfItems: [
        { s: 'For any real number \\( x \\in (0, 1) \\), \\( x > x^2 > x^3 \\).', s_ar: 'لأي عدد حقيقي كسري موجب \\( x \\in (0, 1) \\) يتحقق \\( x > x^2 > x^3 \\).', a: true },
        { s: 'At \\( 4{:}20 \\), the acute angle between the hour and minute hands of a clock is \\( |30(4) - 5.5(20)| = 10^\\circ \\).', s_ar: 'عند الساعة \\( 4{:}20 \\)، الزاوية بين عقربي الساعة والدقائق هي \\( |30(4) - 5.5(20)| = 10^\\circ \\).', a: true },
        { s: 'If a square is inscribed in a circle of radius \\( r \\), its area is \\( 4r^2 \\).', s_ar: 'إذا رُسم مربع داخل دائرة نصف قطرها \\( r \\)، فإن مساحته تساوي \\( 4r^2 \\).', a: false }
      ],
      mtPairs: [
        { l: '\\( |30H - 5.5M| \\)', r: 'Angle between clock hands at \\( H{:}M \\)', r_ar: 'الزاوية بين عقربي الساعة عند \\( H{:}M \\)' },
        { l: 'Square inscribed in circle of radius \\( r \\)', r: 'Diagonal \\( 2r \\), area \\( 2r^2 \\)', r_ar: 'القطر \\( 2r \\) والمساحة \\( 2r^2 \\)' },
        { l: 'Test \\( x \\in \\{-1, 0, \\frac{1}{2}, 2\\} \\)', r: 'Four-zone test to detect Choice D traps', r_ar: 'اختبار المناطق الأربع لكشف فخ الخيار (د)' },
        { l: 'Exterior angle of a triangle', r: 'Sum of the two remote interior angles', r_ar: 'مجموع الزاويتين الداخليتين البعيدتين' }
      ],
      numQ: 'Find the acute angle (in degrees) between the hour and minute hands of a clock at \\( 3{:}30 \\).',
      numQAr: 'أوجد قياس الزاوية الحادة (بالدرجات) بين عقربي الساعات والدقائق عند الساعة \\( 3{:}30 \\).',
      numA: 75,
      numH: 'Use \\( \\theta = |30(3) - 5.5(30)| \\).',
      numHAr: 'استخدم القانون \\( \\theta = |30(3) - 5.5(30)| \\).',
      numSol: '\\( \\theta = |90 - 165| = 75^\\circ \\).'
    },
    {
      id: 'ge-data-stats-prob',
      titleEn: 'GAT Data Interpretation, Weighted Averages & Counting',
      titleAr: 'تحليل البيانات والرسوم البيانية والمتوسطات ومبدأ العد (GAT)',
      qcQ: 'The arithmetic mean of \\( 7 \\) consecutive integers is \\( 24 \\). What is the largest of these \\( 7 \\) integers?',
      qcQAr: 'المتوسط الحسابي لسبعة أعداد صحيحة متتالية هو \\( 24 \\). ما هو أكبر هذه الأعداد؟',
      qcO: [
        '\\( 27 \\)',
        '\\( 26 \\)',
        '\\( 28 \\)',
        '\\( 30 \\)'
      ],
      qcEx: 'For an odd number of consecutive integers, the mean equals the middle (4th) term \\( 24 \\), so the 7th term is \\( 24 + 3 = 27 \\).',
      qcExAr: 'في الأعداد المتتالية الفردية العدد، المتوسط هو الوسيط (الحد الرابع = 24)، فيكون الحد السابع \\( 24 + 3 = 27 \\).',
      tfItems: [
        { s: 'In a pie chart, a sector of central angle \\( 72^\\circ \\) represents \\( \\frac{72}{360} = 20\\% \\) of the total.', s_ar: 'في القطاعات الدائرية، القطاع الذي زاويته المركزية \\( 72^\\circ \\) يمثل \\( 20\\% \\) من الإجمالي.', a: true },
        { s: 'The number of handshakes among \\( n \\) people where everyone shakes hands once is \\( \\binom{n}{2} = \\frac{n(n-1)}{2} \\).', s_ar: 'عدد المصافحات بين \\( n \\) أشخاص يصافح كل منهم الآخر مرة واحدة هو \\( \\frac{n(n-1)}{2} \\).', a: true },
        { s: 'The number of ways to seat \\( n \\) people around a circular table is \\( n! \\).', s_ar: 'عدد طرق جلوس \\( n \\) أشخاص حول طاولة دائرية هو \\( n! \\).', a: false }
      ],
      mtPairs: [
        { l: '\\( \\frac{\\theta}{360^\\circ} \\times \\text{Total} \\)', r: 'Value of a pie-chart sector with angle \\( \\theta \\)', r_ar: 'قيمة قطاع دائري زاويته المركزية \\( \\theta \\)' },
        { l: '\\( (n - 1)! \\)', r: 'Circular permutations of \\( n \\) distinct people', r_ar: 'التباديل الدائرية لعدد \\( n \\) من الأشخاص' },
        { l: '\\( \\frac{\\text{First} + \\text{Last}}{2} \\)', r: 'Mean and median of any arithmetic sequence', r_ar: 'المتوسط والوسيط لأي متتابعة حسابية' },
        { l: '\\( \\frac{n(n-1)}{2} \\)', r: 'Number of handshakes or segments among \\( n \\) points', r_ar: 'عدد المصافحات أو القطع المستقيمة بين \\( n \\) نقاط' }
      ],
      numQ: 'In a conference room of \\( 10 \\) delegates, each delegate shakes hands once with every other delegate. How many handshakes occur in total?',
      numQAr: 'في قاعة اجتماعات تضم \\( 10 \\) مندوبين، صافح كل مندوب بقية المندوبين مرة واحدة. كم عدد المصافحات الكلي؟',
      numA: 45,
      numH: 'Calculate \\( \\binom{10}{2} = \\frac{10 \\times 9}{2} \\).',
      numHAr: 'احسب \\( \\frac{10 \\times 9}{2} \\).',
      numSol: '\\( \\frac{10 \\times 9}{2} = 45 \\) handshakes.'
    },
    {
      id: 'ge-saat-algebra-matrices',
      titleEn: 'SAAT Mathematical Logic, Matrices, Determinants & Complex Numbers',
      titleAr: 'المنطق الرياضي والمصفوفات والمحددات والأعداد المركبة (SAAT)',
      qcQ: 'For what value of \\( k \\) is the matrix \\( A = \\begin{pmatrix} 3 & 6 \\\\ k & 8 \\end{pmatrix} \\) singular (non-invertible)?',
      qcQAr: 'ما قيمة \\( k \\) التي تجعل المصفوفة \\( A = \\begin{pmatrix} 3 & 6 \\\\ k & 8 \\end{pmatrix} \\) منفردة (ليس لها نظير ضربي)؟',
      qcO: [
        '\\( 4 \\)',
        '\\( -4 \\)',
        '\\( 16 \\)',
        '\\( 2 \\)'
      ],
      qcEx: 'A matrix is singular when \\( \\det(A) = 3(8) - 6k = 24 - 6k = 0 \\implies k = 4 \\).',
      qcExAr: 'تكون المصفوفة منفردة عندما \\( \\det(A) = 24 - 6k = 0 \\implies k = 4 \\).',
      tfItems: [
        { s: 'The contrapositive \\( \\neg q \\to \\neg p \\) is always logically equivalent to the conditional statement \\( p \\to q \\).', s_ar: 'المعاكس الإيجابي \\( \\neg q \\to \\neg p \\) يكافئ منطقياً دائماً العبارة الشرطية \\( p \\to q \\).', a: true },
        { s: 'Since \\( i^4 = 1 \\), the complex power \\( i^{2026} = i^{2} = -1 \\).', s_ar: 'بما أن \\( i^4 = 1 \\)، فإن \\( i^{2026} = i^2 = -1 \\).', a: true },
        { s: 'By Remainder Theorem, the remainder when \\( P(x) \\) is divided by \\( (x - c) \\) is \\( P(-c) \\).', s_ar: 'حسب نظرية الباقي، باقي قسمة \\( P(x) \\) على \\( (x - c) \\) هو \\( P(-c) \\).', a: false }
      ],
      mtPairs: [
        { l: '\\( \\neg q \\to \\neg p \\)', r: 'Contrapositive (logically equivalent to \\( p \\to q \\))', r_ar: 'المعاكس الإيجابي (مكافئ منطقياً لـ \\( p \\to q \\))' },
        { l: '\\( ad - bc = 0 \\)', r: '\\( 2 \\times 2 \\) matrix has no multiplicative inverse', r_ar: 'المصفوفة \\( 2 \\times 2 \\) ليس لها نظير ضربي' },
        { l: '\\( (a + bi)(a - bi) \\)', r: '\\( a^2 + b^2 \\) (product of complex conjugates)', r_ar: '\\( a^2 + b^2 \\) (حاصل ضرب العددين المركبين المترافقين)' },
        { l: '\\( P(c) = 0 \\)', r: '\\( (x - c) \\) is a linear factor of polynomial \\( P(x) \\)', r_ar: '\\( (x - c) \\) عامل خطي لكثيرة الحدود \\( P(x) \\)' }
      ],
      numQ: 'Evaluate the product of complex conjugates \\( (3 + 4i)(3 - 4i) \\).',
      numQAr: 'أوجد حاصل ضرب العددين المركبين المترافقين \\( (3 + 4i)(3 - 4i) \\).',
      numA: 25,
      numH: 'Use \\( (a + bi)(a - bi) = a^2 + b^2 \\).',
      numHAr: 'استخدم القاعدة \\( (a + bi)(a - bi) = a^2 + b^2 \\).',
      numSol: '\\( 3^2 + 4^2 = 9 + 16 = 25 \\).'
    },
    {
      id: 'ge-saat-functions-logs',
      titleEn: 'SAAT Rational Functions, Sequences, Series & Logarithms',
      titleAr: 'الدوال الكسرية والمتتابعات والأسس واللوغاريتمات (SAAT)',
      qcQ: 'What is the horizontal asymptote of the rational function \\( f(x) = \\frac{6x^2 - 5x + 1}{2x^2 + 9} \\)?',
      qcQAr: 'ما هي معادلة خط التقارب الأفقي للدالة النسبية \\( f(x) = \\frac{6x^2 - 5x + 1}{2x^2 + 9} \\)؟',
      qcO: [
        '\\( y = 3 \\)',
        '\\( y = 0 \\)',
        '\\( y = \\frac{1}{9} \\)',
        'No horizontal asymptote'
      ],
      qcEx: 'Since numerator and denominator both have degree 2, the horizontal asymptote is the ratio of leading coefficients \\( y = \\frac{6}{2} = 3 \\).',
      qcExAr: 'بما أن درجة البسط تساوي درجة المقام (2)، فإن خط التقارب الأفقي هو نسبة المعاملين الرئيسيين \\( y = \\frac{6}{2} = 3 \\).',
      tfItems: [
        { s: 'An infinite geometric series with first term \\( a_1 \\) and common ratio \\( r \\) converges if and only if \\( |r| < 1 \\), with sum \\( S_\\infty = \\frac{a_1}{1 - r} \\).', s_ar: 'تتقارب المتسلسلة الهندسية اللانهائية إذا وفقط إذا كان \\( |r| < 1 \\) ومجموعها \\( S_\\infty = \\frac{a_1}{1 - r} \\).', a: true },
        { s: 'For any base \\( b > 0, b \\neq 1 \\), \\( \\log_b(xy) = \\log_b x + \\log_b y \\) for positive \\( x, y \\).', s_ar: 'لأي أساس صالح \\( b \\)، يتحقق \\( \\log_b(xy) = \\log_b x + \\log_b y \\) لكل \\( x, y > 0 \\).', a: true },
        { s: 'A rational function \\( \\frac{(x - 2)(x + 3)}{x - 2} \\) has a vertical asymptote at \\( x = 2 \\).', s_ar: 'الدالة النسبية \\( \\frac{(x - 2)(x + 3)}{x - 2} \\) لها خط تقارب رأسي عند \\( x = 2 \\).', a: false }
      ],
      mtPairs: [
        { l: '\\( \\text{deg}(P) < \\text{deg}(Q) \\)', r: 'Horizontal asymptote is \\( y = 0 \\)', r_ar: 'خط التقارب الأفقي هو \\( y = 0 \\)' },
        { l: 'Common factor \\( (x - c) \\) in \\( P/Q \\)', r: 'Point discontinuity (removable hole) at \\( x = c \\)', r_ar: 'نقطة انفصال (فجوة قابلة للإزالة) عند \\( x = c \\)' },
        { l: '\\( S_\\infty = \\frac{a_1}{1 - r} \\)', r: 'Sum of a convergent infinite geometric series (\\( |r| < 1 \\))', r_ar: 'مجموع المتسلسلة الهندسية اللانهائية المتقاربة' },
        { l: '\\( \\log_b(a) = c \\)', r: 'Equivalent exponential statement \\( b^c = a \\)', r_ar: 'الصورة الأسية المكافئة \\( b^c = a \\)' }
      ],
      numQ: 'Find the sum to infinity of the convergent geometric series \\( 12 + 6 + 3 + 1.5 + \\dots \\)',
      numQAr: 'أوجد مجموع المتسلسلة الهندسية اللانهائية المتقاربة \\( 12 + 6 + 3 + 1.5 + \\dots \\)',
      numA: 24,
      numH: 'Here \\( a_1 = 12 \\) and \\( r = 0.5 \\); use \\( S_\\infty = \\frac{a_1}{1 - r} \\).',
      numHAr: 'هنا \\( a_1 = 12 \\) و \\( r = 0.5 \\)؛ طبق القانون \\( S_\\infty = \\frac{a_1}{1 - r} \\).',
      numSol: '\\( S_\\infty = \\frac{12}{1 - 0.5} = \\frac{12}{0.5} = 24 \\).'
    },
    {
      id: 'ge-saat-trig-conics',
      titleEn: 'SAAT Trigonometry, Conic Sections & 3D Vectors',
      titleAr: 'حساب المثلثات والقطوع المخروطية والمتجهات في الفضاء (SAAT)',
      qcQ: 'What is the eccentricity \\( e = \\frac{c}{a} \\) of the ellipse \\( \\frac{x^2}{25} + \\frac{y^2}{9} = 1 \\)?',
      qcQAr: 'ما هو الاختلاف المركزي \\( e = \\frac{c}{a} \\) للقطع الناقص \\( \\frac{x^2}{25} + \\frac{y^2}{9} = 1 \\)؟',
      qcO: [
        '\\( \\frac{4}{5} \\)',
        '\\( \\frac{3}{5} \\)',
        '\\( \\frac{\\sqrt{34}}{5} \\)',
        '\\( \\frac{16}{25} \\)'
      ],
      qcEx: 'In an ellipse, \\( a = 5, b = 3 \\), and \\( c = \\sqrt{a^2 - b^2} = \\sqrt{25 - 9} = 4 \\), so \\( e = \\frac{c}{a} = \\frac{4}{5} \\).',
      qcExAr: 'في القطع الناقص: \\( a = 5, b = 3 \\) و \\( c = \\sqrt{25 - 9} = 4 \\)، فيكون \\( e = \\frac{c}{a} = \\frac{4}{5} \\).',
      tfItems: [
        { s: 'Two 3D vectors \\( \\mathbf{u} \\) and \\( \\mathbf{v} \\) are orthogonal (perpendicular) if and only if their dot product \\( \\mathbf{u} \\cdot \\mathbf{v} = 0 \\).', s_ar: 'يتعامد متجهان في الفضاء إذا وفقط إذا كان حاصل ضربهما الداخلي \\( \\mathbf{u} \\cdot \\mathbf{v} = 0 \\).', a: true },
        { s: 'For any hyperbola, the focal distance satisfies \\( c^2 = a^2 + b^2 \\) and the eccentricity satisfies \\( e > 1 \\).', s_ar: 'في أي قطع زائد يتحقق \\( c^2 = a^2 + b^2 \\) ويكون الاختلاف المركزي \\( e > 1 \\).', a: true },
        { s: 'By the double-angle identity, \\( \\sin(2\\theta) = 2\\sin\\theta \\) for all real angles \\( \\theta \\).', s_ar: 'من متطابقة ضعف الزاوية: \\( \\sin(2\\theta) = 2\\sin\\theta \\) لجميع الزوايا.', a: false }
      ],
      mtPairs: [
        { l: '\\( c^2 = a^2 - b^2 \\) (\\( 0 < e < 1 \\))', r: 'Ellipse focal parameter relation', r_ar: 'العلاقة البؤرية في القطع الناقص' },
        { l: '\\( c^2 = a^2 + b^2 \\) (\\( e > 1 \\))', r: 'Hyperbola focal parameter relation', r_ar: 'العلاقة البؤرية في القطع الزائد' },
        { l: '\\( \\mathbf{u} \\cdot \\mathbf{v} = 0 \\)', r: 'Orthogonal (perpendicular) vectors in \\( \\mathbb{R}^3 \\)', r_ar: 'متجهان متعامدان في الفضاء الثلاثي' },
        { l: '\\( \\cos(2\\theta) = \\cos^2\\theta - \\sin^2\\theta \\)', r: 'Double-angle cosine identity', r_ar: 'متطابقة جيب تمام ضعف الزاوية' }
      ],
      numQ: 'Find the value of \\( k \\) for which the 3D vectors \\( \\mathbf{u} = \\langle 2, -3, 4 \\rangle \\) and \\( \\mathbf{v} = \\langle 5, 6, k \\rangle \\) are orthogonal.',
      numQAr: 'أوجد قيمة \\( k \\) التي تجعل المتجهين \\( \\mathbf{u} = \\langle 2, -3, 4 \\rangle \\) و \\( \\mathbf{v} = \\langle 5, 6, k \\rangle \\) متعامدين.',
      numA: 2,
      numH: 'Set the dot product \\( 2(5) + (-3)(6) + 4k = 0 \\).',
      numHAr: 'ضع حاصل الضرب الداخلي \\( 2(5) + (-3)(6) + 4k = 0 \\).',
      numSol: '\\( 10 - 18 + 4k = 0 \\implies 4k = 8 \\implies k = 2 \\).'
    },
    {
      id: 'ge-saat-calculus',
      titleEn: 'SAAT Limits, Derivatives, Definite Integrals & Area',
      titleAr: 'النهايات والاشتقاق والتكامل المحدود والمساحات (SAAT)',
      qcQ: 'Evaluate the limit \\( \\lim_{x \\to 3} \\frac{x^2 - 9}{x - 3} \\).',
      qcQAr: 'احسب قيمة النهاية \\( \\lim_{x \\to 3} \\frac{x^2 - 9}{x - 3} \\).',
      qcO: [
        '\\( 6 \\)',
        '\\( 0 \\)',
        '\\( 3 \\)',
        'Does not exist'
      ],
      qcEx: 'Factor \\( \\frac{(x - 3)(x + 3)}{x - 3} = x + 3 \\) for \\( x \\neq 3 \\); substituting \\( x = 3 \\) gives \\( 6 \\).',
      qcExAr: 'بحساب \\( \\frac{(x - 3)(x + 3)}{x - 3} = x + 3 \\) ثم التعويض عن \\( x = 3 \\) نحصل على \\( 6 \\).',
      tfItems: [
        { s: 'By the Fundamental Theorem of Calculus, \\( \\int_a^b f(x)\\,dx = F(b) - F(a) \\) where \\( F\'(x) = f(x) \\).', s_ar: 'حسب النظرية الأساسية للتفاضل والتكامل، \\( \\int_a^b f(x)\\,dx = F(b) - F(a) \\) حيث \\( F\'(x) = f(x) \\).', a: true },
        { s: 'If \\( f(x) \\) is a polynomial, the slope of the tangent line at \\( x = a \\) is \\( f\'(a) \\).', s_ar: 'ميل المماس لمنحنى الدالة \\( f(x) \\) عند \\( x = a \\) يساوي \\( f\'(a) \\).', a: true },
        { s: '\\( \\lim_{x \\to \\infty} \\frac{4x^2 + 1}{2x^3 - 5} = 2 \\).', s_ar: 'قيمة النهاية \\( \\lim_{x \\to \\infty} \\frac{4x^2 + 1}{2x^3 - 5} \\) تساوي \\( 2 \\).', a: false }
      ],
      mtPairs: [
        { l: '\\( \\lim_{x \\to a} \\frac{f(x) - f(a)}{x - a} \\)', r: 'Limit definition of the derivative \\( f\'(a) \\)', r_ar: 'تعريف المشتقة \\( f\'(a) \\) باستخدام النهايات' },
        { l: '\\( \\int x^n\\,dx \\) (\\( n \\neq -1 \\))', r: '\\( \\frac{x^{n+1}}{n+1} + C \\) (Power rule of integration)', r_ar: '\\( \\frac{x^{n+1}}{n+1} + C \\) (قاعدة القوى في التكامل)' },
        { l: '\\( f\'(c) = 0 \\)', r: 'Critical point (candidate for local extremum)', r_ar: 'نقطة حرجة (مرشحة لقيمة قصوى محلية)' },
        { l: '\\( \\int_a^b v(t)\\,dt \\)', r: 'Net displacement of a particle from \\( t = a \\) to \\( t = b \\)', r_ar: 'الإزاحة الصافية للجسيم في الفترة \\( [a, b] \\)' }
      ],
      numQ: 'Evaluate the definite integral \\( \\int_0^3 (3x^2 + 2x)\\,dx \\).',
      numQAr: 'احسب قيمة التكامل المحدود \\( \\int_0^3 (3x^2 + 2x)\\,dx \\).',
      numA: 36,
      numH: 'Find the antiderivative \\( [x^3 + x^2]_0^3 \\).',
      numHAr: 'أوجد الدالة الأصلية \\( [x^3 + x^2]_0^3 \\) وعوّض بحدي التكامل.',
      numSol: '\\( [x^3 + x^2]_0^3 = (27 + 9) - 0 = 36 \\).'
    }
  ],
  olympiad: [
    {
      id: 'ol-algebraic-techniques',
      titleEn: 'Olympiad Algebraic Manipulation, Vieta\'s Formulas & Inequalities',
      titleAr: 'المهارات الجبرية الأولمبية وعلاقات فييت والمتباينات',
      qcQ: 'If \\( \\alpha \\) and \\( \\beta \\) are the roots of \\( x^2 - 6x + 4 = 0 \\), what is the exact value of \\( \\alpha^2 + \\beta^2 \\) without solving for the roots?',
      qcQAr: 'إذا كان \\( \\alpha, \\beta \\) جذري المعادلة \\( x^2 - 6x + 4 = 0 \\)، فما قيمة \\( \\alpha^2 + \\beta^2 \\) دون إيجاد الجذرين؟',
      qcO: [
        '\\( 28 \\)',
        '\\( 36 \\)',
        '\\( 32 \\)',
        '\\( 44 \\)'
      ],
      qcEx: 'By Vieta\'s formulas, \\( \\alpha + \\beta = 6 \\) and \\( \\alpha\\beta = 4 \\), so \\( \\alpha^2 + \\beta^2 = (\\alpha + \\beta)^2 - 2\\alpha\\beta = 36 - 8 = 28 \\).',
      qcExAr: 'من علاقات فييت: \\( \\alpha + \\beta = 6 \\) و \\( \\alpha\\beta = 4 \\)، إذن \\( \\alpha^2 + \\beta^2 = 6^2 - 2(4) = 28 \\).',
      tfItems: [
        { s: 'By the AM-GM inequality, for any positive real number \\( x > 0 \\), \\( x + \\frac{9}{x} \\ge 2\\sqrt{x \\cdot \\frac{9}{x}} = 6 \\).', s_ar: 'حسب متباينة الوسط الحسابي والهندسي (AM-GM)، لكل \\( x > 0 \\) يتحقق \\( x + \\frac{9}{x} \\ge 6 \\).', a: true },
        { s: 'For a cubic \\( ax^3 + bx^2 + cx + d = 0 \\) with roots \\( r_1, r_2, r_3 \\), the sum of roots is \\( -\\frac{b}{a} \\) and the product is \\( -\\frac{d}{a} \\).', s_ar: 'في المعادلة التكعيبية \\( ax^3 + bx^2 + cx + d = 0 \\)، مجموع الجذور \\( -\\frac{b}{a} \\) وحاصل ضربها \\( -\\frac{d}{a} \\).', a: true },
        { s: 'Equality in \\( \\frac{a + b}{2} \\ge \\sqrt{ab} \\) holds for any positive \\( a \\neq b \\).', s_ar: 'تتحقق المساواة في متباينة AM-GM لأي عددين موجبين مختلفين \\( a \\neq b \\).', a: false }
      ],
      mtPairs: [
        { l: '\\( \\alpha^2 + \\beta^2 \\)', r: '\\( (\\alpha + \\beta)^2 - 2\\alpha\\beta \\) (Symmetric power sum)', r_ar: '\\( (\\alpha + \\beta)^2 - 2\\alpha\\beta \\) (مجموع القوى المتماثل)' },
        { l: '\\( \\frac{a_1 + \\dots + a_n}{n} \\ge (a_1\\cdots a_n)^{1/n} \\)', r: 'AM-GM Inequality for non-negative reals', r_ar: 'متباينة الوسط الحسابي والهندسي (AM-GM)' },
        { l: '\\( (\\sum a_i^2)(\\sum b_i^2) \\ge (\\sum a_i b_i)^2 \\)', r: 'Cauchy-Schwarz Inequality', r_ar: 'متباينة كوشي-شوارتز' },
        { l: '\\( \\frac{1}{k(k+1)} = \\frac{1}{k} - \\frac{1}{k+1} \\)', r: 'Telescoping partial-fraction decomposition', r_ar: 'التفكيك التلسكوبي للكسور الجزئية' }
      ],
      numQ: 'Find the minimum value of \\( f(x) = 4x + \\frac{25}{x} \\) for \\( x > 0 \\).',
      numQAr: 'أوجد القيمة الصغرى للدالة \\( f(x) = 4x + \\frac{25}{x} \\) حيث \\( x > 0 \\).',
      numA: 20,
      numH: 'Apply AM-GM: \\( 4x + \\frac{25}{x} \\ge 2\\sqrt{4x \\cdot \\frac{25}{x}} \\).',
      numHAr: 'طبق متباينة AM-GM: \\( 4x + \\frac{25}{x} \\ge 2\\sqrt{4x \\cdot \\frac{25}{x}} \\).',
      numSol: 'By AM-GM, \\( 4x + \\frac{25}{x} \\ge 2\\sqrt{100} = 20 \\), achieved when \\( 4x = \\frac{25}{x} \\implies x = 2.5 \\).'
    },
    {
      id: 'ol-modular-number-theory',
      titleEn: 'Modular Arithmetic, Divisibility, Primes & Euler\'s Totient',
      titleAr: 'الحساب المعياري وقابلية القسمة والأعداد الأولية ودالة أويلر',
      qcQ: 'If a positive integer has prime factorization \\( N = 2^3 \\cdot 3^2 \\cdot 5^1 = 360 \\), how many positive divisors \\( \\tau(N) \\) does \\( N \\) have?',
      qcQAr: 'إذا كان التحليل الأولي للعدد \\( N = 360 \\) هو \\( 2^3 \\cdot 3^2 \\cdot 5^1 \\)، فكم عدد قواسمه الموجبة \\( \\tau(N) \\)؟',
      qcO: [
        '\\( 24 \\)',
        '\\( 18 \\)',
        '\\( 12 \\)',
        '\\( 30 \\)'
      ],
      qcEx: 'Add 1 to each prime exponent and multiply: \\( \\tau(360) = (3 + 1)(2 + 1)(1 + 1) = 4 \\times 3 \\times 2 = 24 \\).',
      qcExAr: 'أضف 1 لكل أس في التحليل الأولي واضرب: \\( (3 + 1)(2 + 1)(1 + 1) = 24 \\).',
      tfItems: [
        { s: 'By Fermat\'s Little Theorem, if \\( p \\) is prime and \\( p \\nmid a \\), then \\( a^{p-1} \\equiv 1 \\pmod{p} \\).', s_ar: 'حسب مبرهنة فيرما الصغرى، إذا كان \\( p \\) أولياً ولا يقسم \\( a \\)، فإن \\( a^{p-1} \\equiv 1 \\pmod{p} \\).', a: true },
        { s: 'A positive integer \\( N \\) has an odd number of positive divisors if and only if \\( N \\) is a perfect square.', s_ar: 'يكون للعدد الصحيح الموجب \\( N \\) عدد فردي من القواسم الموجبة إذا وفقط إذا كان \\( N \\) مربعاً كاملاً.', a: true },
        { s: 'By Wilson\'s Theorem, for any prime \\( p \\), \\( (p - 1)! \\equiv 1 \\pmod{p} \\).', s_ar: 'حسب مبرهنة ويلسون، لأي عدد أولي \\( p \\) يتحقق \\( (p - 1)! \\equiv 1 \\pmod{p} \\).', a: false }
      ],
      mtPairs: [
        { l: '\\( a^{p-1} \\equiv 1 \\pmod p \\)', r: 'Fermat\'s Little Theorem (\\( p \\) prime, \\( p \\nmid a \\))', r_ar: 'مبرهنة فيرما الصغرى' },
        { l: '\\( a^{\\varphi(m)} \\equiv 1 \\pmod m \\)', r: 'Euler\'s Totient Theorem (\\( \\gcd(a, m) = 1 \\))', r_ar: 'مبرهنة أويلر للأعداد الأولية نسبياً' },
        { l: '\\( (p - 1)! \\equiv -1 \\pmod p \\)', r: 'Wilson\'s Theorem for prime \\( p \\)', r_ar: 'مبرهنة ويلسون للأعداد الأولية' },
        { l: '\\( \\prod (e_i + 1) \\)', r: 'Total number of positive divisors \\( \\tau(N) \\)', r_ar: 'عدد القواسم الموجبة \\( \\tau(N) \\)' }
      ],
      numQ: 'Evaluate Euler\'s totient function \\( \\varphi(72) \\), the count of integers in \\( \\{1, 2, \\dots, 72\\} \\) coprime to \\( 72 \\).',
      numQAr: 'احسب قيمة دالة أويلر \\( \\varphi(72) \\)، وهي عدد الأعداد الصحيحة في \\( \\{1, \\dots, 72\\} \\) الأولية نسبياً مع \\( 72 \\).',
      numA: 24,
      numH: 'Since \\( 72 = 2^3 \\cdot 3^2 \\), compute \\( 72\\left(1 - \\frac{1}{2}\\right)\\left(1 - \\frac{1}{3}\\right) \\).',
      numHAr: 'بما أن \\( 72 = 2^3 \\cdot 3^2 \\)، احسب \\( 72\\left(1 - \\frac{1}{2}\\right)\\left(1 - \\frac{1}{3}\\right) \\).',
      numSol: '\\( \\varphi(72) = 72 \\times \\frac{1}{2} \\times \\frac{2}{3} = 24 \\).'
    },
    {
      id: 'ol-diophantine-equations',
      titleEn: 'Diophantine Equations, SFFT, Bezout\'s Identity & Floor Functions',
      titleAr: 'المعادلات الديوفانتية وتحليل SFFT وهوية بيزو ودالة الصحيح',
      qcQ: 'Using Simon\'s Favorite Factoring Trick (SFFT), rewrite \\( xy + 3x + 5y = 20 \\) into factored form.',
      qcQAr: 'باستخدام حيلة التحليل المفضلة لسيمون (SFFT)، أعد كتابة المعادلة \\( xy + 3x + 5y = 20 \\) في صورة حاصل ضرب عاملين.',
      qcO: [
        '\\( (x + 5)(y + 3) = 35 \\)',
        '\\( (x + 3)(y + 5) = 35 \\)',
        '\\( (x + 5)(y + 3) = 20 \\)',
        '\\( (x - 5)(y - 3) = 35 \\)'
      ],
      qcEx: 'Add \\( 3 \\times 5 = 15 \\) to both sides: \\( xy + 3x + 5y + 15 = 35 \\implies (x + 5)(y + 3) = 35 \\).',
      qcExAr: 'أضف \\( 3 \\times 5 = 15 \\) للطرفين: \\( (x + 5)(y + 3) = 20 + 15 = 35 \\).',
      tfItems: [
        { s: 'A linear Diophantine equation \\( ax + by = c \\) has integer solutions if and only if \\( \\gcd(a, b) \\) divides \\( c \\).', s_ar: 'يكون للمعادلة الديوفانتية الخطية \\( ax + by = c \\) حلول صحيحة إذا وفقط إذا كان \\( \\gcd(a, b) \\) يقسم \\( c \\).', a: true },
        { s: 'By the Chicken McNugget Theorem, for coprime \\( m, n > 1 \\), the largest integer not expressible as \\( am + bn \\) (\\( a, b \\ge 0 \\)) is \\( mn - m - n \\).', s_ar: 'لعددين أوليين نسبياً \\( m, n > 1 \\)، أكبر عدد لا يمكن تمثيله بالصورة \\( am + bn \\) هو \\( mn - m - n \\).', a: true },
        { s: 'By Legendre\'s formula, the exponent of \\( 5 \\) in \\( 25! \\) is \\( \\lfloor 25/5 \\rfloor = 5 \\).', s_ar: 'أس العدد الأولي \\( 5 \\) في تحليل \\( 25! \\) يساوي \\( 5 \\) فقط.', a: false }
      ],
      mtPairs: [
        { l: '\\( xy + ax + by + ab \\)', r: '\\( (x + b)(y + a) \\) (Simon\'s Favorite Factoring Trick)', r_ar: '\\( (x + b)(y + a) \\) (تحليل سيمون SFFT)' },
        { l: '\\( mn - m - n \\)', r: 'Frobenius coin number for coprime \\( m, n \\)', r_ar: 'أكبر عدد غير قابل للتمثيل (مبرهنة فروبينيوس)' },
        { l: '\\( \\sum_{k \\ge 1} \\lfloor n/p^k \\rfloor \\)', r: 'Legendre\'s formula for \\( v_p(n!) \\)', r_ar: 'صيغة ليجاندر لأس العامل الأولي في \\( n! \\)' },
        { l: '\\( \\gcd(a, b) \\mid c \\)', r: 'Solvability criterion for \\( ax + by = c \\) in \\( \\mathbb{Z} \\)', r_ar: 'شرط وجود حلول صحيحة للمعادلة \\( ax + by = c \\)' }
      ],
      numQ: 'How many trailing zeros does \\( 100! \\) have in base 10?',
      numQAr: 'كم عدد الأصفار في يمين العدد \\( 100! \\) عند كتابته في النظام العشري؟',
      numA: 24,
      numH: 'Apply Legendre\'s formula for \\( p = 5 \\): \\( \\lfloor 100/5 \\rfloor + \\lfloor 100/25 \\rfloor \\).',
      numHAr: 'طبق صيغة ليجاندر للعدد \\( p = 5 \\): \\( \\lfloor 100/5 \\rfloor + \\lfloor 100/25 \\rfloor \\).',
      numSol: '\\( v_5(100!) = \\lfloor 100/5 \\rfloor + \\lfloor 100/25 \\rfloor = 20 + 4 = 24 \\).'
    },
    {
      id: 'ol-combinatorics-counting',
      titleEn: 'Bijective Counting, Stars & Bars, Inclusion-Exclusion & Pigeonhole',
      titleAr: 'العد التقابلي وطريقة النجوم والفواصل والشمول والإقصاء ومبدأ برج الحمام',
      qcQ: 'How many non-negative integer solutions \\( (x_1, x_2, x_3, x_4) \\) with \\( x_i \\ge 0 \\) satisfy \\( x_1 + x_2 + x_3 + x_4 = 9 \\)?',
      qcQAr: 'كم عدد الحلول الصحيحة غير السالبة \\( (x_1, x_2, x_3, x_4) \\) حيث \\( x_i \\ge 0 \\) للمعادلة \\( x_1 + x_2 + x_3 + x_4 = 9 \\)؟',
      qcO: [
        '\\( 220 \\)',
        '\\( 165 \\)',
        '\\( 84 \\)',
        '\\( 120 \\)'
      ],
      qcEx: 'By Stars and Bars, \\( \\binom{n + k - 1}{k - 1} = \\binom{9 + 4 - 1}{4 - 1} = \\binom{12}{3} = \\frac{12 \\times 11 \\times 10}{6} = 220 \\).',
      qcExAr: 'بطريقة النجوم والفواصل: \\( \\binom{9 + 4 - 1}{4 - 1} = \\binom{12}{3} = 220 \\).',
      tfItems: [
        { s: 'The number of positive integer solutions (\\( x_i \\ge 1 \\)) to \\( x_1 + \\dots + x_k = n \\) is \\( \\binom{n - 1}{k - 1} \\).', s_ar: 'عدد الحلول الصحيحة الموجبة (\\( x_i \\ge 1 \\)) للمعادلة \\( x_1 + \\dots + x_k = n \\) هو \\( \\binom{n - 1}{k - 1} \\).', a: true },
        { s: 'For \\( n = 4 \\), the number of derangements (permutations with no fixed points) is \\( D_4 = 9 \\).', s_ar: 'للمجموعة ذات \\( 4 \\) عناصر، عدد التباديل الخالية من النقاط الثابتة (Derangements) هو \\( D_4 = 9 \\).', a: true },
        { s: 'If \\( 25 \\) objects are placed into \\( 6 \\) boxes, the Pigeonhole Principle guarantees only that some box has at least \\( 4 \\) objects.', s_ar: 'عند توزيع 25 عنصراً على 6 صناديق، يضمن مبدأ برج الحمام وجود صندوق به 4 عناصر فقط على الأقل.', a: false }
      ],
      mtPairs: [
        { l: '\\( \\binom{n + k - 1}{k - 1} \\)', r: 'Stars & Bars for non-negative integers \\( x_i \\ge 0 \\)', r_ar: 'النجوم والفواصل للأعداد غير السالبة \\( x_i \\ge 0 \\)' },
        { l: '\\( \\binom{n - 1}{k - 1} \\)', r: 'Stars & Bars for strictly positive integers \\( x_i \\ge 1 \\)', r_ar: 'النجوم والفواصل للأعداد الموجبة \\( x_i \\ge 1 \\)' },
        { l: '\\( \\lceil N / k \\rceil \\)', r: 'Generalized Pigeonhole minimum in at least one box', r_ar: 'الحد الأدنى المضمون بمبدأ برج الحمام المعمم' },
        { l: '\\( \\binom{m + n}{m} \\)', r: 'Monotonic lattice paths from \\( (0,0) \\) to \\( (m,n) \\)', r_ar: 'عدد مسارات الشبكة من \\( (0,0) \\) إلى \\( (m,n) \\)' }
      ],
      numQ: 'Find the number of monotonic lattice paths from \\( (0, 0) \\) to \\( (4, 3) \\) moving only Right and Up.',
      numQAr: 'أوجد عدد مسارات الشبكة من \\( (0, 0) \\) إلى \\( (4, 3) \\) بالتحرك يميناً وأعلى فقط.',
      numA: 35,
      numH: 'Compute \\( \\binom{4 + 3}{3} = \\binom{7}{3} \\).',
      numHAr: 'احسب \\( \\binom{4 + 3}{3} = \\binom{7}{3} \\).',
      numSol: '\\( \\binom{7}{3} = \\frac{7 \\times 6 \\times 5}{3 \\times 2 \\times 1} = 35 \\).'
    },
    {
      id: 'ol-recurrence-probability',
      titleEn: 'Recurrence Relations, State Markov Chains & Geometric Probability',
      titleAr: 'العلاقات التكرارية وسلاسل الحالات والاحتمال الهندسي',
      qcQ: 'Two numbers \\( X, Y \\) are chosen independently and uniformly at random from \\( [0, 1] \\). What is the geometric probability that \\( |X - Y| \\le \\frac{1}{2} \\)?',
      qcQAr: 'اختير عددان \\( X, Y \\) عشوائياً وبانتظام من الفترة \\( [0, 1] \\). ما هو الاحتمال الهندسي لتحقق \\( |X - Y| \\le \\frac{1}{2} \\)؟',
      qcO: [
        '\\( \\frac{3}{4} \\)',
        '\\( \\frac{1}{2} \\)',
        '\\( \\frac{2}{3} \\)',
        '\\( \\frac{7}{8} \\)'
      ],
      qcEx: 'The two excluded corner triangles each have leg \\( \\frac{1}{2} \\), so their combined area is \\( 2 \\times \\frac{1}{2}\\left(\\frac{1}{2}\\right)^2 = \\frac{1}{4} \\), leaving \\( 1 - \\frac{1}{4} = \\frac{3}{4} \\).',
      qcExAr: 'مساحة المثلثين المستبعدين في ركني المربع هي \\( 2 \\times \\frac{1}{2}\\left(\\frac{1}{2}\\right)^2 = \\frac{1}{4} \\)، فيكون الاحتمال \\( 1 - \\frac{1}{4} = \\frac{3}{4} \\).',
      tfItems: [
        { s: 'Linearity of expectation \\( E[X + Y] = E[X] + E[Y] \\) holds even when random variables \\( X \\) and \\( Y \\) are dependent.', s_ar: 'خاصية خطية التوقع \\( E[X + Y] = E[X] + E[Y] \\) تظل صحيحة حتى لو كان المتغيران \\( X, Y \\) غير مستقلين.', a: true },
        { s: 'The number of ways to tile a \\( 2 \\times n \\) board with \\( 1 \\times 2 \\) dominoes satisfies the Fibonacci recurrence \\( T_n = T_{n-1} + T_{n-2} \\).', s_ar: 'عدد طرق تبليط لوحة \\( 2 \\times n \\) بقطع دومينو \\( 1 \\times 2 \\) يحقق علاقة فيبوناتشي \\( T_n = T_{n-1} + T_{n-2} \\).', a: true },
        { s: 'If a fair coin has probability \\( p = \\frac{1}{2} \\) of Heads, the expected number of flips to get two consecutive Heads (HH) is \\( 4 \\).', s_ar: 'العدد المتوقع لرميات عملة متزنة للحصول على صورتين متتاليتين (HH) هو \\( 4 \\).', a: false }
      ],
      mtPairs: [
        { l: '\\( E[\\sum X_i] = \\sum E[X_i] \\)', r: 'Linearity of Expectation (no independence required)', r_ar: 'خطية التوقع الرياضي (لا تشترط الاستقلال)' },
        { l: '\\( T_n = T_{n-1} + T_{n-2} \\)', r: 'Fibonacci recurrence for \\( 2 \\times n \\) domino tilings', r_ar: 'علاقة فيبوناتشي لتبليط الدومينو' },
        { l: '\\( C_n = \\frac{1}{n+1}\\binom{2n}{n} \\)', r: 'Catalan number (dyck paths & triangulations)', r_ar: 'عدد كاتالان (المسارات القطرية وتثليث المضلعات)' },
        { l: '\\( 1 - (1 - \\tau)^2 \\)', r: 'Geometric probability of meeting within wait time \\( \\tau \\)', r_ar: 'الاحتمال الهندسي للالتقاء خلال زمن انتظار \\( \\tau \\)' }
      ],
      numQ: 'In how many ways can a \\( 2 \\times 6 \\) rectangle be tiled completely by \\( 1 \\times 2 \\) dominoes?',
      numQAr: 'بكم طريقة يمكن تبليط مستطيل أبعاده \\( 2 \\times 6 \\) بالكامل باستخدام قطع دومينو \\( 1 \\times 2 \\)؟',
      numA: 13,
      numH: 'Use \\( T_1 = 1, T_2 = 2, T_n = T_{n-1} + T_{n-2} \\) up to \\( n = 6 \\).',
      numHAr: 'استخدم المتتابعة \\( T_1 = 1, T_2 = 2, T_n = T_{n-1} + T_{n-2} \\) حتى \\( n = 6 \\).',
      numSol: 'The sequence is \\( T_1=1, T_2=2, T_3=3, T_4=5, T_5=8, T_6=13 \\).'
    },
    {
      id: 'ol-euclidean-circles',
      titleEn: 'Olympiad Circle Geometry, Power of a Point & Radical Axes',
      titleAr: 'هندسة الدوائر الأولمبية وقوة النقطة والمحور الأساسي والرباعي الدائري',
      qcQ: 'In cyclic quadrilateral \\( ABCD \\), diagonals \\( AC = 10 \\) and \\( BD = 12 \\), while opposite sides satisfy \\( AB = 6, CD = 8 \\), and \\( BC = 6 \\). By Ptolemy\'s Theorem, find \\( AD \\).',
      qcQAr: 'في الرباعي الدائري \\( ABCD \\)، طولا القطرين \\( AC = 10 \\) و \\( BD = 12 \\)، وأضلاعه \\( AB = 6, CD = 8, BC = 6 \\). باستخدام مبرهنة بطليموس، أوجد \\( AD \\).',
      qcO: [
        '\\( 12 \\)',
        '\\( 10 \\)',
        '\\( 8 \\)',
        '\\( 14 \\)'
      ],
      qcEx: 'By Ptolemy\'s Theorem, \\( AC \\cdot BD = AB \\cdot CD + BC \\cdot AD \\implies 10(12) = 6(8) + 6 \\cdot AD \\implies 120 = 48 + 6\\,AD \\implies AD = 12 \\).',
      qcExAr: 'من مبرهنة بطليموس: \\( 10(12) = 6(8) + 6 \\cdot AD \\implies 120 - 48 = 6\\,AD \\implies AD = 12 \\).',
      tfItems: [
        { s: 'By Ptolemy\'s Theorem, a quadrilateral \\( ABCD \\) is cyclic if and only if \\( AC \\cdot BD = AB \\cdot CD + BC \\cdot AD \\).', s_ar: 'حسب مبرهنة بطليموس، يكون الرباعي \\( ABCD \\) دائرياً إذا وفقط إذا كان \\( AC \\cdot BD = AB \\cdot CD + BC \\cdot AD \\).', a: true },
        { s: 'The radical axis of two circles is the locus of points having equal power with respect to both circles, and is perpendicular to their line of centers.', s_ar: 'المحور الأساسي لدائرتين هو المحل الهندسي للنقاط المتساوية القوة بالنسبة للدائرتين ويكون عمودياً على خط المركزين.', a: true },
        { s: 'For an external point \\( P \\) at distance \\( d \\) from the center of a circle of radius \\( R \\), the power of \\( P \\) is \\( R^2 + d^2 \\).', s_ar: 'قوة النقطة الخارجية \\( P \\) التي تبعد \\( d \\) عن مركز دائرة نصف قطرها \\( R \\) تساوي \\( R^2 + d^2 \\).', a: false }
      ],
      mtPairs: [
        { l: '\\( AC \\cdot BD = AB \\cdot CD + BC \\cdot AD \\)', r: 'Ptolemy\'s Theorem for cyclic quadrilaterals', r_ar: 'مبرهنة بطليموس للرباعي الدائري' },
        { l: '\\( \\text{Pow}(P) = d^2 - R^2 = PT^2 \\)', r: 'Power of an external point \\( P \\) to a circle', r_ar: 'قوة نقطة خارجية \\( P \\) بالنسبة لدائرة' },
        { l: '\\( \\sqrt{(s-a)(s-b)(s-c)(s-d)} \\)', r: 'Brahmagupta\'s area formula for cyclic quadrilaterals', r_ar: 'صيغة براهماغوبتا لمساحة الرباعي الدائري' },
        { l: 'Radical Center of 3 Circles', r: 'Concurrency point of the three pairwise radical axes', r_ar: 'نقطة تلاقي المحاور الأساسية الثلاثة' }
      ],
      numQ: 'Point \\( P \\) lies outside a circle of radius \\( R = 5 \\) at distance \\( d = 13 \\) from its center. What is the length of the tangent segment \\( PT \\) from \\( P \\) to the circle?',
      numQAr: 'تقع النقطة \\( P \\) خارج دائرة نصف قطرها \\( R = 5 \\) على بُعد \\( d = 13 \\) من مركزها. ما طول القطعة المماسة \\( PT \\)؟',
      numA: 12,
      numH: 'Use Power of a Point: \\( PT^2 = d^2 - R^2 = 13^2 - 5^2 \\).',
      numHAr: 'استخدم قوة النقطة: \\( PT^2 = d^2 - R^2 = 13^2 - 5^2 \\).',
      numSol: '\\( PT = \\sqrt{169 - 25} = \\sqrt{144} = 12 \\).'
    },
    {
      id: 'ol-triangle-centers-trig',
      titleEn: 'Triangle Centers, Ceva, Menelaus, Stewart\'s Theorem & Area Lemmas',
      titleAr: 'مراكز المثلث ومبرهنات سيفا ومينيلاوس وستيوارت وعلاقات المساحة',
      qcQ: 'What is the inradius \\( r \\) of a triangle with side lengths \\( 13, 14, 15 \\)?',
      qcQAr: 'ما هو طول نصف قطر الدائرة الداخلية \\( r \\) للمثلث الذي أطوال أضلاعه \\( 13, 14, 15 \\)؟',
      qcO: [
        '\\( 4 \\)',
        '\\( 3.5 \\)',
        '\\( 5 \\)',
        '\\( 4.5 \\)'
      ],
      qcEx: 'Semiperimeter \\( s = \\frac{13 + 14 + 15}{2} = 21 \\); by Heron\'s formula \\( [ABC] = \\sqrt{21 \\cdot 8 \\cdot 7 \\cdot 6} = 84 \\), so \\( r = \\frac{[ABC]}{s} = \\frac{84}{21} = 4 \\).',
      qcExAr: 'نصف المحيط \\( s = 21 \\) والمساحة بصيغة هيرون \\( [ABC] = 84 \\)، إذن \\( r = \\frac{84}{21} = 4 \\).',
      tfItems: [
        { s: 'Stewart\'s Theorem states that for a cevian of length \\( d \\) dividing side \\( a \\) into \\( m \\) and \\( n \\), \\( b^2 m + c^2 n = a(d^2 + mn) \\).', s_ar: 'تنص مبرهنة ستيوارت على أنه لقطعة سيفا بطول \\( d \\) تقسم الضلع \\( a \\) إلى \\( m, n \\) يتحقق \\( b^2 m + c^2 n = a(d^2 + mn) \\).', a: true },
        { s: 'On the Euler line of any triangle, the centroid \\( G \\) divides the segment from orthocenter \\( H \\) to circumcenter \\( O \\) in the ratio \\( HG : GO = 2 : 1 \\).', s_ar: 'على خط أويلر لأي مثلث، يقسم مركز الثقل \\( G \\) المسافة بين ملتقى الارتفاعات \\( H \\) ومركز الدائرة المحيطة \\( O \\) بنسبة \\( 2 : 1 \\).', a: true },
        { s: 'Ceva\'s Theorem tests collinearity of three points, whereas Menelaus\'s Theorem tests concurrency of three cevians.', s_ar: 'تختبر مبرهنة سيفا وقوع ثلاث نقاط على استقامة واحدة بينما تختبر مينيلاوس تلاقي ثلاث قطع.', a: false }
      ],
      mtPairs: [
        { l: '\\( b^2 m + c^2 n = a(d^2 + mn) \\)', r: 'Stewart\'s Theorem for any cevian length \\( d \\)', r_ar: 'مبرهنة ستيوارت لطول أي قطعة سيفا \\( d \\)' },
        { l: '\\( [ABC] = r \\cdot s = \\frac{abc}{4R} \\)', r: 'Inradius \\( r \\) and circumradius \\( R \\) area formulas', r_ar: 'علاقتا المساحة بنصفي قطري الدائرتين الداخلية والمحيطة' },
        { l: '\\( \\frac{BD}{DC}\\cdot\\frac{CE}{EA}\\cdot\\frac{AF}{FB} = 1 \\)', r: 'Ceva\'s Theorem for concurrent cevians', r_ar: 'مبرهنة سيفا لتلاقي القطع في نقطة واحدة' },
        { l: '\\( \\frac{BD}{DC} = \\frac{AB}{AC} \\)', r: 'Internal Angle Bisector Theorem', r_ar: 'مبرهنة منصف الزاوية الداخلي' }
      ],
      numQ: 'In \\( \\triangle ABC \\), angle bisector \\( AD \\) meets \\( BC \\) at \\( D \\). Given \\( AB = 10 \\), \\( AC = 15 \\), and \\( BD = 6 \\), find \\( DC \\).',
      numQAr: 'في المثلث \\( ABC \\)، منصف الزاوية \\( AD \\) يقطع \\( BC \\) في \\( D \\). إذا كان \\( AB = 10, AC = 15, BD = 6 \\)، فأوجد طول \\( DC \\).',
      numA: 9,
      numH: 'By the Angle Bisector Theorem, \\( \\frac{BD}{DC} = \\frac{AB}{AC} \\).',
      numHAr: 'طبق مبرهنة منصف الزاوية: \\( \\frac{BD}{DC} = \\frac{AB}{AC} \\).',
      numSol: '\\( \\frac{6}{DC} = \\frac{10}{15} = \\frac{2}{3} \\implies DC = 9 \\).'
    },
    {
      id: 'ol-invariants-extremal',
      titleEn: 'Invariants, Monovariants, Coloring Proofs & Extremal Combinatorial Games',
      titleAr: 'الثوابت وشبه الثوابت وبراهين التلوين والمبدأ المتطرف والألعاب الرياضية',
      qcQ: 'An \\( 8 \\times 8 \\) chessboard has two opposite corner squares removed, leaving \\( 62 \\) squares. Why can it NEVER be tiled by \\( 31 \\) dominoes of size \\( 1 \\times 2 \\)?',
      qcQAr: 'لوحة شطرنج \\( 8 \\times 8 \\) حُذف منها مربعان متقابلان قطرياً في الركنين فبقي \\( 62 \\) مربعاً. لماذا يستحيل تبليطها بـ \\( 31 \\) قطعة دومينو \\( 1 \\times 2 \\)؟',
      qcO: [
        'Each domino covers 1 black and 1 white square, but opposite corners have the same color, leaving 32 of one color and 30 of the other',
        'Because 62 is not divisible by 4',
        'Because the perimeter of the remaining board is odd',
        'Because 31 is a prime number'
      ],
      qcEx: 'Under standard checkerboard coloring, opposite corners share the same color, so the mutilated board has 32 squares of one color and 30 of the other, violating the 1-black-1-white domino invariant.',
      qcExAr: 'في تلوين الشطرنج القياسي، الركنان المتقابلان قطرياً لهما نفس اللون، فيتبقى 32 مربعاً من لون و30 من اللون الآخر، بينما كل دومينو يغطي مربعين مختلفين في اللون.',
      tfItems: [
        { s: 'By Pick\'s Theorem, the area of a lattice polygon with \\( I \\) interior points and \\( B \\) boundary lattice points is \\( A = I + \\frac{B}{2} - 1 \\).', s_ar: 'حسب مبرهنة بيك، مساحة مضلع شبكي بداخله \\( I \\) نقطة وعلى حدوده \\( B \\) نقطة هي \\( A = I + \\frac{B}{2} - 1 \\).', a: true },
        { s: 'In standard 2-pile Nim, a position \\( (a, b) \\) is a second-player winning position (P-position) if and only if \\( a = b \\) (so \\( a \\oplus b = 0 \\)).', s_ar: 'في لعبة نيم ذات الكومتين، تكون الوضعية \\( (a, b) \\) رابحة للاعب الثاني إذا وفقط إذا كان \\( a = b \\).', a: true },
        { s: 'When two numbers \\( a, b \\) on a board are replaced by \\( a + b - 1 \\), the sum of all numbers on the board is invariant.', s_ar: 'عند استبدال العددين \\( a, b \\) بالعدد \\( a + b - 1 \\)، يبقى مجموع الأعداد ثابتاً لا يتغير.', a: false }
      ],
      mtPairs: [
        { l: '\\( A = I + \\frac{B}{2} - 1 \\)', r: 'Pick\'s Theorem for lattice polygon area', r_ar: 'مبرهنة بيك لمساحة المضلعات الشبكية' },
        { l: '\\( n_1 \\oplus n_2 \\oplus \\dots \\oplus n_k = 0 \\)', r: 'Bouton\'s Theorem P-position in Nim', r_ar: 'شرط الوضعية الصفرية في لعبة نيم (XOR = 0)' },
        { l: 'Replace \\( (a, b) \\to ab + a + b \\)', r: 'Invariant quantity \\( \\prod (x_i + 1) \\)', r_ar: 'الثابت الجبري \\( \\prod (x_i + 1) \\)' },
        { l: 'Strictly decreasing integer monovariant', r: 'Guarantees process must terminate in finitely many steps', r_ar: 'يضمن انتهاء العملية في عدد منتهٍ من الخطوات' }
      ],
      numQ: 'A lattice polygon has \\( I = 14 \\) interior lattice points and \\( B = 10 \\) boundary lattice points. Find its exact area by Pick\'s Theorem.',
      numQAr: 'مضلع شبكي يحتوي بداخله على \\( I = 14 \\) نقطة شبكية وعلى حدوده \\( B = 10 \\) نقاط شبكية. أوجد مساحته الدقيقة باستخدام مبرهنة بيك.',
      numA: 18,
      numH: 'Use \\( A = I + \\frac{B}{2} - 1 \\).',
      numHAr: 'طبق قانون بيك: \\( A = I + \\frac{B}{2} - 1 \\).',
      numSol: '\\( A = 14 + \\frac{10}{2} - 1 = 14 + 5 - 1 = 18 \\).'
    }
  ]
};

for (const [track, chapters] of Object.entries(CHAPTER_IX_SPECS)) {
  const D = {};
  chapters.forEach((ch, idx) => {
    const p = idx + 2;
    D[ch.id] = [
      // 1. qc
      {
        t: 'qc',
        ti: `Quick Check: ${ch.titleEn}`,
        ti_ar: `فحص سريع: ${ch.titleAr}`,
        q: ch.qcQ,
        q_ar: ch.qcQAr,
        o: ch.qcO,
        o_ar: ch.qcO,
        a: 0,
        ex: ch.qcEx,
        ex_ar: ch.qcExAr
      },
      // 2. tf
      {
        t: 'tf',
        ti: `True / False: Core Theorems (${ch.titleEn})`,
        ti_ar: `صح / خطأ: النظريات الأساسية (${ch.titleAr})`,
        items: ch.tfItems.map(it => ({ s: it.s, a: it.a })),
        items_ar: ch.tfItems.map(it => ({ s: it.s_ar, a: it.a }))
      },
      // 3. mt
      {
        t: 'mt',
        ti: `Matching: Identities & Principles (${ch.titleEn})`,
        ti_ar: `مطابقة: القوانين والمفاهيم (${ch.titleAr})`,
        p: ch.mtPairs.map(pair => ({ l: pair.l, r: pair.r })),
        p_ar: ch.mtPairs.map(pair => ({ l: pair.l, r: pair.r_ar }))
      },
      // 4. se
      {
        t: 'se',
        ti: `Spot the Error: Algebraic & Domain Verification (${ch.titleEn})`,
        ti_ar: `اكتشف الخطأ: التحقق الجبري والمنطقي (${ch.titleAr})`,
        q: `A student solves \\( \\sqrt{2x + ${2 * p * p}} = x - ${p} \\) step by step. Which step introduces an invalid conclusion?`,
        q_ar: `يحل طالب المعادلة \\( \\sqrt{2x + ${2 * p * p}} = x - ${p} \\) خطوة بخطوة. أي خطوة تتضمن استنتاجاً خاطئاً؟`,
        steps: [
          `Square both sides: \\( 2x + ${2 * p * p} = (x - ${p})^2 \\).`,
          `Expand the right-hand side: \\( 2x + ${2 * p * p} = x^2 - ${2 * p}x + ${p * p} \\).`,
          `Rearrange and factor: \\( x^2 - ${2 * p + 2}x - ${p * p} = 0 \\).`,
          `Accept both roots without checking the non-negativity condition \\( x - ${p} \\ge 0 \\).`
        ],
        steps_ar: [
          `تربيع الطرفين: \\( 2x + ${2 * p * p} = (x - ${p})^2 \\).`,
          `فك المربع الكامل: \\( 2x + ${2 * p * p} = x^2 - ${2 * p}x + ${p * p} \\).`,
          `إعادة الترتيب في الصورة القياسية: \\( x^2 - ${2 * p + 2}x - ${p * p} = 0 \\).`,
          `قبول الجذرين معاً دون التحقق من شرط عدم السالبية \\( x - ${p} \\ge 0 \\).`
        ],
        errorStep: 4,
        reasons: [
          `The principal square root \\( \\sqrt{\\cdot} \\) is always non-negative, so any solution must satisfy \\( x - ${p} \\ge 0 \\iff x \\ge ${p} \\); the negative root is extraneous.`,
          `Expanding \\( (x - ${p})^2 \\) should not have a middle term.`,
          `Squaring both sides is never allowed for radical equations.`
        ],
        reasons_ar: [
          `الجذر التربيعي الأساسي غير سالب دائماً، لذا يجب تحقق الشرط \\( x \\ge ${p} \\) واستبعاد الجذر الدخيل السالب.`,
          `فك المربع الكامل غير صحيح.`,
          `لا يجوز تربيع الطرفين مطلقاً.`
        ],
        correctReason: 0,
        h: `Check the sign of the right-hand side \\( x - ${p} \\) for the negative root.`,
        h_ar: `تحقق من إشارة الطرف الأيمن \\( x - ${p} \\) عند التعويض بالجذر السالب.`,
        sol: `Squaring introduces an extraneous root whenever \\( x - ${p} < 0 \\). Only the root satisfying \\( x \\ge ${p} \\) is valid.`,
        sol_ar: `التربيع يدخل جذراً دخيلاً يجعل الطرف الأيمن سالباً؛ يُقبل فقط الجذر الذي يحقق \\( x \\ge ${p} \\).`
      },
      // 5. ms
      {
        t: 'ms',
        ti: `Examiner Mode: Multi-Step Structured Problem (${ch.titleEn})`,
        ti_ar: `وضع المصحح: مسألة هيكلية متعددة الخطوات (${ch.titleAr})`,
        q: `Consider \\( f(x) = x^2 - ${2 * p}x + ${p * p + 4} \\) for \\( x \\ge ${p} \\). (a) Express \\( f(x) \\) in completed-square vertex form and state its range. (b) Find \\( f^{-1}(x) \\) and state its domain.`,
        q_ar: `لتكن \\( f(x) = x^2 - ${2 * p}x + ${p * p + 4} \\) حيث \\( x \\ge ${p} \\). (أ) اكتب \\( f(x) \\) في صورة المربع الكامل وحدد مداها. (ب) أوجد \\( f^{-1}(x) \\) وحدد مجالها.`,
        parts: [
          {
            label: 'Part (a) — Completed Square & Range',
            marks: 2,
            rubric: [
              { code: 'M1', marks: 1, text: `Complete the square: \\( f(x) = (x - ${p})^2 + 4 \\).` },
              { code: 'A1', marks: 1, text: `State exact range: \\( f(x) \\ge 4 \\).` }
            ]
          },
          {
            label: 'Part (b) — Inverse Function & Domain',
            marks: 3,
            rubric: [
              { code: 'M1', marks: 1, text: `Write \\( y = (x - ${p})^2 + 4 \\implies (x - ${p})^2 = y - 4 \\).` },
              { code: 'A1', marks: 1, text: `Select positive root (since \\( x \\ge ${p} \\)): \\( f^{-1}(x) = ${p} + \\sqrt{x - 4} \\).` },
              { code: 'B1', marks: 1, text: `State domain of \\( f^{-1} \\): \\( x \\ge 4 \\).` }
            ]
          }
        ],
        examinerTip: `Always match the domain of \\( f^{-1} \\) to the range of \\( f \\), and use \\( x \\ge ${p} \\) to select the positive branch of the square root.`,
        examinerTip_ar: `مجال الدالة العكسية \\( f^{-1} \\) هو مدى الدالة الأصلية \\( f \\)، ويُختار الجذر الموجب لأن \\( x \\ge ${p} \\).`
      },
      // 6. sb
      {
        t: 'sb',
        ti: `Step Builder: Guided Calculation (${ch.titleEn})`,
        ti_ar: `بناء الخطوات: حساب موجه خطوة بخطوة (${ch.titleAr})`,
        steps: [
          {
            l: `In \\( y = x^2 - ${2 * p}x + ${p * p + 5} \\), halve the \\( x \\)-coefficient to write \\( (x - h)^2 \\) where \\( h = \\)`,
            a: `${p}`,
            h: `Divide ${2 * p} by 2.`
          },
          {
            l: `Find the minimum value \\( k = ${p * p + 5} - ${p}^2 = \\)`,
            a: '5',
            h: `Subtract ${p * p} from ${p * p + 5}.`
          },
          {
            l: `Evaluate \\( y \\) when \\( x = ${p + 3} \\): \\( y = \\)`,
            a: '14',
            h: `Calculate \\( 3^2 + 5 \\).`
          }
        ],
        steps_ar: [
          {
            l: `في الدالة \\( y = x^2 - ${2 * p}x + ${p * p + 5} \\)، قيمة \\( h \\) في \\( (x - h)^2 \\) تساوي:`,
            a: `${p}`,
            h: `اقسم ${2 * p} على 2.`
          },
          {
            l: `أوجد القيمة الصغرى \\( k = ${p * p + 5} - ${p}^2 = \\)`,
            a: '5',
            h: `اطرح ${p * p} من ${p * p + 5}.`
          },
          {
            l: `احسب قيمة \\( y \\) عندما \\( x = ${p + 3} \\):`,
            a: '14',
            h: `احسب \\( 3^2 + 5 \\).`
          }
        ]
      },
      // 7. num
      {
        t: 'num',
        ti: `Numeric Entry: ${ch.titleEn}`,
        ti_ar: `إدخال رقمي: ${ch.titleAr}`,
        q: ch.numQ,
        q_ar: ch.numQAr,
        a: ch.numA,
        h: ch.numH,
        h_ar: ch.numHAr,
        sol: ch.numSol,
        sol_ar: ch.numSol
      },
      // 8. ord
      {
        t: 'ord',
        ti: `Order the Steps: Systematic Solution (${ch.titleEn})`,
        ti_ar: `رتّب الخطوات: خطوات الحل المنظم (${ch.titleAr})`,
        prompt: `Arrange the logical steps in order to solve the intersection and tangency problem for \\( y = x^2 - ${2 * p}x + ${p * p + 4} \\) and \\( y = 2x + k \\):`,
        prompt_ar: `رتب الخطوات المنطقية لحل مسألة التماس بين المنحنى \\( y = x^2 - ${2 * p}x + ${p * p + 4} \\) والمستقيم \\( y = 2x + k \\):`,
        items: [
          `Equate the curve and line equations: \\( x^2 - ${2 * p}x + ${p * p + 4} = 2x + k \\).`,
          `Rearrange into standard quadratic form: \\( x^2 - ${2 * p + 2}x + (${p * p + 4} - k) = 0 \\).`,
          `Set the discriminant \\( \\Delta = b^2 - 4ac = (-${2 * p + 2})^2 - 4(1)(${p * p + 4} - k) = 0 \\) for tangency.`,
          `Solve the resulting linear equation for the exact value of the parameter \\( k \\).`
        ],
        items_ar: [
          `ساوِ معادلة المنحنى بمعادلة المستقيم: \\( x^2 - ${2 * p}x + ${p * p + 4} = 2x + k \\).`,
          `أعد الترتيب في الصورة القياسية: \\( x^2 - ${2 * p + 2}x + (${p * p + 4} - k) = 0 \\).`,
          `ضع المميز مساوياً للصفر لشرط التماس: \\( \\Delta = (-${2 * p + 2})^2 - 4(${p * p + 4} - k) = 0 \\).`,
          `حل المعادلة الخطية الناتجة لإيجاد القيمة الدقيقة للثابت \\( k \\).`
        ],
        ex: 'Equate the two equations first, collect terms into ax² + bx + c = 0, then apply Δ = 0.',
        ex_ar: 'ساوِ المعادلتين أولاً، ثم رتب الحدود في الصورة القياسية، ثم طبق شرط التماس Δ = 0.'
      },
      // 9. cat
      {
        t: 'cat',
        ti: `Categorize: Mathematical Classification (${ch.titleEn})`,
        ti_ar: `تصنيف: التصنيف الرياضي (${ch.titleAr})`,
        categories: [
          'Two Distinct Real Roots (Δ > 0)',
          'One Repeated Tangent Root (Δ = 0)',
          'No Real Roots (Δ < 0)'
        ],
        categories_ar: [
          'جذران حقيقيان متمايزان (Δ > 0)',
          'جذر حقيقي مكرر / تماس (Δ = 0)',
          'لا توجد جذور حقيقية (Δ < 0)'
        ],
        items: [
          { s: `\\( x^2 - ${2 * p}x + ${p * p} = 0 \\)`, s_ar: `\\( x^2 - ${2 * p}x + ${p * p} = 0 \\)`, cat: 1 },
          { s: `\\( x^2 - ${2 * p + 1}x + ${p} = 0 \\)`, s_ar: `\\( x^2 - ${2 * p + 1}x + ${p} = 0 \\)`, cat: 0 },
          { s: `\\( x^2 + ${p}x + ${p * p + 3} = 0 \\)`, s_ar: `\\( x^2 + ${p}x + ${p * p + 3} = 0 \\)`, cat: 2 },
          { s: `\\( 4x^2 - ${4 * p}x + ${p * p} = 0 \\)`, s_ar: `\\( 4x^2 - ${4 * p}x + ${p * p} = 0 \\)`, cat: 1 }
        ],
        ex: 'Compute Δ = b² − 4ac to classify each quadratic equation.',
        ex_ar: 'احسب قيمة المميز Δ = b² − 4ac لتصنيف كل معادلة تربيعية.'
      }
    ];
  });
  saveIx(track, D);
  console.log(`Generated src/scripts/ix-data/${track}.js (${Object.keys(D).length} chapters, ${Object.values(D).reduce((s, a) => s + a.length, 0)} activities)`);
}
