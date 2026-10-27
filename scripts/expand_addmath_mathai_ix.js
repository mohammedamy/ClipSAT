#!/usr/bin/env node
/**
 * scripts/expand_addmath_mathai_ix.js
 * Expands src/scripts/ix-data/addmath.js and src/scripts/ix-data/mathai.js
 * so that all 8 chapters in each track have 9+ interactive activities (72+ per track)
 * across all active learning modes (qc, tf, mt, num, ord, cat, se, ms, sb) with 100% Arabic parity.
 */
'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const IX_DIR = path.join(ROOT, 'src', 'scripts', 'ix-data');

function loadIx(track) {
  const src = fs.readFileSync(path.join(IX_DIR, `${track}.js`), 'utf8');
  const win = {};
  new Function('window', src)(win);
  const D = {};
  (win.__ixData || []).forEach(fn => fn(D));
  return D;
}

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

// Supplemental activities for addmath chapters to reach 9 activities per chapter
const ADDMATH_EXTRA = {
  'am-functions-quadratics': [
    {
      t: 'num',
      ti: 'Numeric Entry: Discriminant Tangency Condition',
      ti_ar: 'إدخال رقمي: شرط التماس باستخدام المميز',
      q: 'Find the positive value of \\( k \\) for which the line \\( y = kx - 4 \\) is a tangent to the parabola \\( y = x^2 + 5 \\).',
      q_ar: 'أوجد القيمة الموجبة للثابت \\( k \\) التي تجعل المستقيم \\( y = kx - 4 \\) مماساً للقطع المكافئ \\( y = x^2 + 5 \\).',
      a: 6,
      h: 'Equate \\( x^2 + 5 = kx - 4 \\implies x^2 - kx + 9 = 0 \\) and set \\( b^2 - 4ac = 0 \\).',
      h_ar: 'ساوِ المعادلتين \\( x^2 - kx + 9 = 0 \\) واجعل المميز \\( b^2 - 4ac = 0 \\).',
      sol: 'Setting \\( \\Delta = (-k)^2 - 4(1)(9) = k^2 - 36 = 0 \\) with \\( k > 0 \\) gives \\( k = 6 \\).',
      sol_ar: 'بوضع المميز \\( k^2 - 36 = 0 \\) ومع كون \\( k > 0 \\) نحصل على \\( k = 6 \\).'
    },
    {
      t: 'ord',
      ti: 'Order the Steps: Finding an Inverse Function on a Restricted Domain',
      ti_ar: 'رتّب الخطوات: إيجاد الدالة العكسية على مجال مقيّد',
      prompt: 'Arrange the steps in order to find \\( f^{-1}(x) \\) for \\( f(x) = (x - 3)^2 + 2 \\) where \\( x \\ge 3 \\):',
      prompt_ar: 'رتب خطوات إيجاد الدالة العكسية \\( f^{-1}(x) \\) للدالة \\( f(x) = (x - 3)^2 + 2 \\) حيث \\( x \\ge 3 \\):',
      items: [
        'Write \\( y = (x - 3)^2 + 2 \\) and note that the range of \\( f \\) is \\( y \\ge 2 \\).',
        'Subtract 2 from both sides: \\( y - 2 = (x - 3)^2 \\).',
        'Take the positive square root (since \\( x \\ge 3 \\)): \\( x - 3 = +\\sqrt{y - 2} \\).',
        'Isolate \\( x \\) and swap variables: \\( f^{-1}(x) = 3 + \\sqrt{x - 2} \\) for \\( x \\ge 2 \\).'
      ],
      items_ar: [
        'اكتب \\( y = (x - 3)^2 + 2 \\) وحدد مدى الدالة \\( y \\ge 2 \\).',
        'اطرح 2 من الطرفين: \\( y - 2 = (x - 3)^2 \\).',
        'خذ الجذر التربيعي الموجب (لأن \\( x \\ge 3 \\)): \\( x - 3 = +\\sqrt{y - 2} \\).',
        'اعزل \\( x \\) وبدّل المتغيرين: \\( f^{-1}(x) = 3 + \\sqrt{x - 2} \\) لكل \\( x \\ge 2 \\).'
      ],
      ex: 'Always use the domain restriction of f to choose the correct sign of the square root.',
      ex_ar: 'استخدم دائماً شرط مجال الدالة الأصلية لاختيار الإشارة الصحيحة للجذر التربيعي.'
    },
    {
      t: 'cat',
      ti: 'Categorize: Nature of Roots by Discriminant',
      ti_ar: 'تصنيف: طبيعة الجذور حسب قيمة المميز',
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
        { s: '\\( x^2 - 6x + 9 = 0 \\)', s_ar: '\\( x^2 - 6x + 9 = 0 \\)', cat: 1 },
        { s: '\\( x^2 - 5x + 4 = 0 \\)', s_ar: '\\( x^2 - 5x + 4 = 0 \\)', cat: 0 },
        { s: '\\( 2x^2 + 3x + 5 = 0 \\)', s_ar: '\\( 2x^2 + 3x + 5 = 0 \\)', cat: 2 },
        { s: '\\( 4x^2 - 12x + 9 = 0 \\)', s_ar: '\\( 4x^2 - 12x + 9 = 0 \\)', cat: 1 }
      ],
      ex: 'Compute Δ = b² − 4ac for each quadratic equation.',
      ex_ar: 'احسب قيمة المميز Δ = b² − 4ac لكل معادلة تربيعية.'
    }
  ],
  'am-polynomials-binomial': [
    {
      t: 'num',
      ti: 'Numeric Entry: Term Independent of x in Binomial Expansion',
      ti_ar: 'إدخال رقمي: الحد الخالي من x في مفكوك ذات الحدين',
      q: 'Find the constant term (independent of \\( x \\)) in the binomial expansion of \\( \\left(2x + \\frac{1}{x}\\right)^4 \\).',
      q_ar: 'أوجد الحد الثابت (الخالي من \\( x \\)) في مفكوك ذات الحدين \\( \\left(2x + \\frac{1}{x}\\right)^4 \\).',
      a: 24,
      h: 'The general term is \\( \\binom{4}{r}(2x)^{4-r}(x^{-1})^r = \\binom{4}{r}2^{4-r}x^{4-2r} \\). Set \\( 4 - 2r = 0 \\).',
      h_ar: 'الحد العام هو \\( \\binom{4}{r}2^{4-r}x^{4-2r} \\). ضع \\( 4 - 2r = 0 \\) لإيجاد \\( r = 2 \\).',
      sol: 'For \\( r = 2 \\), the term is \\( \\binom{4}{2}(2)^{2} = 6 \\times 4 = 24 \\).',
      sol_ar: 'عند \\( r = 2 \\)، يكون الحد الثابت \\( \\binom{4}{2}(2)^{2} = 6 \\times 4 = 24 \\).'
    },
    {
      t: 'ord',
      ti: 'Order the Steps: Factorizing a Cubic Polynomial Completely',
      ti_ar: 'رتّب الخطوات: التحليل الكامل لكثيرة حدود تكعيبية',
      prompt: 'Arrange the steps to factorize \\( P(x) = x^3 - 4x^2 + x + 6 \\) completely:',
      prompt_ar: 'رتب خطوات تحليل كثيرة الحدود \\( P(x) = x^3 - 4x^2 + x + 6 \\) تحليلاً كاملاً:',
      items: [
        'Test integer divisors of 6 using the Factor Theorem: \\( P(-1) = (-1)^3 - 4(-1)^2 + (-1) + 6 = 0 \\).',
        'Conclude by the Factor Theorem that \\( (x + 1) \\) is a linear factor of \\( P(x) \\).',
        'Divide \\( P(x) \\) by \\( (x + 1) \\) to obtain the quadratic quotient \\( x^2 - 5x + 6 \\).',
        'Factor the quadratic quotient into \\( (x - 2)(x - 3) \\) to get \\( P(x) = (x + 1)(x - 2)(x - 3) \\).'
      ],
      items_ar: [
        'اختبر قواسم العدد 6 بنظرية العوامل: \\( P(-1) = (-1)^3 - 4(-1)^2 + (-1) + 6 = 0 \\).',
        'استنتج أن \\( (x + 1) \\) عامل خطي لكثيرة الحدود \\( P(x) \\).',
        'اقسم \\( P(x) \\) على \\( (x + 1) \\) للحصول على خارج القسمة التربيعي \\( x^2 - 5x + 6 \\).',
        'حلل العبارة التربيعية إلى \\( (x - 2)(x - 3) \\) فيكون \\( P(x) = (x + 1)(x - 2)(x - 3) \\).'
      ],
      ex: 'Find one linear root via the Factor Theorem, divide to reduce to a quadratic, then factorize the quadratic.',
      ex_ar: 'أوجد جذراً أولياً بنظرية العوامل، ثم اقسم لتقليص الدرجة إلى تربيعية، وحللها.'
    },
    {
      t: 'cat',
      ti: 'Categorize: Remainder & Factor Theorem Evaluations',
      ti_ar: 'تصنيف: تطبيقات نظريتي الباقي والعوامل',
      categories: [
        'Exact Factor (Remainder = 0)',
        'Non-Zero Remainder (Not a Factor)'
      ],
      categories_ar: [
        'عامل فعلي (الباقي = 0)',
        'باقي غير صفري (ليس عاملاً)'
      ],
      items: [
        { s: 'Dividing \\( x^3 - 8 \\) by \\( (x - 2) \\)', s_ar: 'قسمة \\( x^3 - 8 \\) على \\( (x - 2) \\)', cat: 0 },
        { s: 'Dividing \\( x^3 + 8 \\) by \\( (x - 2) \\)', s_ar: 'قسمة \\( x^3 + 8 \\) على \\( (x - 2) \\)', cat: 1 },
        { s: 'Dividing \\( x^3 - 3x + 2 \\) by \\( (x - 1) \\)', s_ar: 'قسمة \\( x^3 - 3x + 2 \\) على \\( (x - 1) \\)', cat: 0 },
        { s: 'Dividing \\( x^3 + x^2 + 1 \\) by \\( (x + 1) \\)', s_ar: 'قسمة \\( x^3 + x^2 + 1 \\) على \\( (x + 1) \\)', cat: 1 }
      ],
      ex: 'By the Factor Theorem, (x − a) is a factor of P(x) if and only if P(a) = 0.',
      ex_ar: 'وفق نظرية العوامل، يكون (x − a) عاملاً لـ P(x) إذا وفقط إذا كان P(a) = 0.'
    }
  ],
  'am-logs-exponentials': [
    {
      t: 'tf',
      ti: 'True / False: Laws of Logarithms & Straight-Line Reduction',
      ti_ar: 'صح / خطأ: قوانين اللوغاريتمات والتحويل للخط المستقيم',
      items: [
        { s: 'For any positive base a ≠ 1 and positive x, y, log_a(xy) = log_a(x) + log_a(y).', a: true },
        { s: 'The expression log_a(x + y) can be simplified directly to log_a(x) + log_a(y).', a: false },
        { s: 'When y = a x^n is linearized by plotting ln(y) against ln(x), the gradient of the line is n.', a: true }
      ],
      items_ar: [
        { s: 'لكل أساس موجب a ≠ 1 وعددين موجبين x, y يتحقق: log_a(xy) = log_a(x) + log_a(y).', a: true },
        { s: 'يمكن تبسيط المقدار log_a(x + y) مباشرة إلى log_a(x) + log_a(y).', a: false },
        { s: 'عند تحويل العلاقة y = a x^n برسم ln(y) مقابل ln(x)، يكون ميل الخط المستقيم مساوياً لـ n.', a: true }
      ]
    },
    {
      t: 'num',
      ti: 'Numeric Entry: Change of Base Formula',
      ti_ar: 'إدخال رقمي: قاعدة تغيير الأساس اللوغاريتمي',
      q: 'Evaluate the exact product \\( \\log_2(9) \\times \\log_3(8) \\).',
      q_ar: 'احسب القيمة الدقيقة لحاصل الضرب \\( \\log_2(9) \\times \\log_3(8) \\).',
      a: 6,
      h: 'Write \\( \\log_2(3^2) = 2\\log_2(3) \\) and \\( \\log_3(2^3) = 3\\log_3(2) \\), then use \\( \\log_2(3)\\log_3(2) = 1 \\).',
      h_ar: 'اكتب \\( \\log_2(3^2) = 2\\log_2(3) \\) و \\( \\log_3(2^3) = 3\\log_3(2) \\)، واستخدم \\( \\log_2(3)\\log_3(2) = 1 \\).',
      sol: '\\( 2\\log_2(3) \\times 3\\log_3(2) = 6 \\times \\frac{\\ln 3}{\\ln 2} \\times \\frac{\\ln 2}{\\ln 3} = 6 \\).',
      sol_ar: '\\( 2\\log_2(3) \\times 3\\log_3(2) = 6 \\times 1 = 6 \\).'
    },
    {
      t: 'ord',
      ti: 'Order the Steps: Solving a Logarithmic Equation',
      ti_ar: 'رتّب الخطوات: حل معادلة لوغاريتمية',
      prompt: 'Arrange the steps to solve \\( \\log_3(x) + \\log_3(x - 6) = 3 \\) for \\( x > 6 \\):',
      prompt_ar: 'رتب خطوات حل المعادلة \\( \\log_3(x) + \\log_3(x - 6) = 3 \\) حيث \\( x > 6 \\):',
      items: [
        'Combine logarithms using the product rule: \\( \\log_3(x(x - 6)) = 3 \\).',
        'Convert from logarithmic to exponential form: \\( x(x - 6) = 3^3 = 27 \\).',
        'Expand and factor the quadratic equation: \\( x^2 - 6x - 27 = (x - 9)(x + 3) = 0 \\).',
        'Reject \\( x = -3 \\) (outside domain \\( x > 6 \\)) and conclude \\( x = 9 \\).'
      ],
      items_ar: [
        'ادمج اللوغاريتمين بقاعدة الضرب: \\( \\log_3(x(x - 6)) = 3 \\).',
        'حوّل من الصيغة اللوغاريتمية إلى الأسية: \\( x(x - 6) = 3^3 = 27 \\).',
        'فك الأقواس وحلل المعادلة التربيعية: \\( x^2 - 6x - 27 = (x - 9)(x + 3) = 0 \\).',
        'ارفض \\( x = -3 \\) (خارج المجال \\( x > 6 \\)) واستنتج أن \\( x = 9 \\).'
      ],
      ex: 'Always verify that candidate roots make every original logarithmic argument strictly positive.',
      ex_ar: 'تحقق دائماً من أن الجذور الناتجة تجعل ما داخل كل لوغاريتم أصلي موجباً تماماً.'
    },
    {
      t: 'cat',
      ti: 'Categorize: Linear Law Transformations Y = mX + c',
      ti_ar: 'تصنيف: تحويلات الخط المستقيم Y = mX + c',
      categories: [
        'Plot ln(y) vs x',
        'Plot ln(y) vs ln(x)',
        'Plot y/x vs x'
      ],
      categories_ar: [
        'رسم ln(y) مقابل x',
        'رسم ln(y) مقابل ln(x)',
        'رسم y/x مقابل x'
      ],
      items: [
        { s: '\\( y = a b^x \\)', s_ar: '\\( y = a b^x \\)', cat: 0 },
        { s: '\\( y = a x^n \\)', s_ar: '\\( y = a x^n \\)', cat: 1 },
        { s: '\\( y = a x^2 + b x \\)', s_ar: '\\( y = a x^2 + b x \\)', cat: 2 },
        { s: '\\( y = y_0 e^{-kx} \\)', s_ar: '\\( y = y_0 e^{-kx} \\)', cat: 0 }
      ],
      ex: 'Exponential laws linearize with ln(y) vs x; power laws linearize with ln(y) vs ln(x).',
      ex_ar: 'العلاقات الأسية تتحول لخط مستقيم برسم ln(y) مقابل x، وعلاقات القوى برسم ln(y) مقابل ln(x).'
    }
  ],
  'am-trigonometry-circular': [
    {
      t: 'tf',
      ti: 'True / False: Circular Measure & Trigonometric Identities',
      ti_ar: 'صح / خطأ: القياس الدائري والمتطابقات المثلثية',
      items: [
        { s: 'In the arc length formula s = rθ, the angle θ must be measured in radians.', a: true },
        { s: 'For any angle θ where sec θ is defined, 1 + tan²θ = sec²θ.', a: true },
        { s: 'The period of the function y = 3 tan(2x) is π radians.', a: false }
      ],
      items_ar: [
        { s: 'في قانون طول القوس s = rθ، يجب أن تكون الزاوية θ مقاسة بالراديان.', a: true },
        { s: 'لأي زاوية θ يكون عندها قاطع التمام معرفاً، تتحقق المتطابقة 1 + tan²θ = sec²θ.', a: true },
        { s: 'طول الدورة للدالة y = 3 tan(2x) هو π راديان.', a: false }
      ]
    },
    {
      t: 'num',
      ti: 'Numeric Entry: Area of a Circular Sector',
      ti_ar: 'إدخال رقمي: مساحة القطاع الدائري',
      q: 'A circular sector has radius \\( r = 6\\text{ cm} \\) and central angle \\( \\theta = 1.5\\text{ rad} \\). Calculate its area in \\( \\text{cm}^2 \\).',
      q_ar: 'قطاع دائري نصف قطره \\( r = 6\\text{ cm} \\) وزاويته المركزية \\( \\theta = 1.5\\text{ rad} \\). احسب مساحته بوحدة \\( \\text{cm}^2 \\).',
      a: 27,
      h: 'Use the sector area formula \\( A = \\frac{1}{2} r^2 \\theta \\).',
      h_ar: 'استخدم قانون مساحة القطاع الدائري \\( A = \\frac{1}{2} r^2 \\theta \\).',
      sol: '\\( A = \\frac{1}{2}(6)^2(1.5) = 18 \\times 1.5 = 27\\text{ cm}^2 \\).',
      sol_ar: '\\( A = \\frac{1}{2}(6)^2(1.5) = 18 \\times 1.5 = 27\\text{ cm}^2 \\).'
    },
    {
      t: 'ord',
      ti: 'Order the Steps: Solving a Quadratic Trigonometric Equation',
      ti_ar: 'رتّب الخطوات: حل معادلة مثلثية تربيعية',
      prompt: 'Arrange the steps to solve \\( 2\\cos^2 x - \\sin x - 1 = 0 \\) for \\( 0 \\le x \\le \\pi \\):',
      prompt_ar: 'رتب خطوات حل المعادلة \\( 2\\cos^2 x - \\sin x - 1 = 0 \\) في الفترة \\( 0 \\le x \\le \\pi \\):',
      items: [
        'Substitute the Pythagorean identity \\( \\cos^2 x = 1 - \\sin^2 x \\) into the equation.',
        'Rearrange into standard quadratic form: \\( 2\\sin^2 x + \\sin x - 1 = 0 \\).',
        'Factor the quadratic in \\( \\sin x \\): \\( (2\\sin x - 1)(\\sin x + 1) = 0 \\).',
        'Solve \\( \\sin x = \\frac{1}{2} \\) on \\( [0, \\pi] \\) to obtain \\( x = \\frac{\\pi}{6} \\) and \\( x = \\frac{5\\pi}{6} \\).'
      ],
      items_ar: [
        'عوّض بالمتطابقة الفيثاغورسية \\( \\cos^2 x = 1 - \\sin^2 x \\) في المعادلة.',
        'رتب الحدود في الصيغة التربيعية القياسية: \\( 2\\sin^2 x + \\sin x - 1 = 0 \\).',
        'حلل المعادلة التربيعية بدلالة \\( \\sin x \\): \\( (2\\sin x - 1)(\\sin x + 1) = 0 \\).',
        'حل \\( \\sin x = \\frac{1}{2} \\) في الفترة \\( [0, \\pi] \\) لتحصل على \\( x = \\frac{\\pi}{6} \\) و \\( x = \\frac{5\\pi}{6} \\).'
      ],
      ex: 'Replace cos²x with 1 − sin²x so the equation involves a single trigonometric ratio.',
      ex_ar: 'استبدل cos²x بـ 1 − sin²x لتوحيد النسبة المثلثية في المعادلة.'
    },
    {
      t: 'cat',
      ti: 'Categorize: Signs of Trigonometric Functions by Quadrant (CAST)',
      ti_ar: 'تصنيف: إشارات الدوال المثلثية حسب الربع (قاعدة CAST)',
      categories: [
        'Quadrant II (π/2 < θ < π)',
        'Quadrant III (π < θ < 3π/2)',
        'Quadrant IV (3π/2 < θ < 2π)'
      ],
      categories_ar: [
        'الربع الثاني (π/2 < θ < π)',
        'الربع الثالث (π < θ < 3π/2)',
        'الربع الرابع (3π/2 < θ < 2π)'
      ],
      items: [
        { s: '\\( \\sin\\theta > 0 \\) and \\( \\cos\\theta < 0 \\)', s_ar: '\\( \\sin\\theta > 0 \\) و \\( \\cos\\theta < 0 \\)', cat: 0 },
        { s: '\\( \\tan\\theta > 0 \\) and \\( \\sin\\theta < 0 \\)', s_ar: '\\( \\tan\\theta > 0 \\) و \\( \\sin\\theta < 0 \\)', cat: 1 },
        { s: '\\( \\cos\\theta > 0 \\) and \\( \\tan\\theta < 0 \\)', s_ar: '\\( \\cos\\theta > 0 \\) و \\( \\tan\\theta < 0 \\)', cat: 2 },
        { s: '\\( \\csc\\theta > 0 \\) and \\( \\sec\\theta < 0 \\)', s_ar: '\\( \\csc\\theta > 0 \\) و \\( \\sec\\theta < 0 \\)', cat: 0 }
      ],
      ex: 'By the CAST rule: Sine is positive in QII, Tangent in QIII, and Cosine in QIV.',
      ex_ar: 'بحسب قاعدة الإشارات: الجيب موجب في الربع الثاني، والظل في الثالث، وجيب التمام في الرابع.'
    }
  ],
  'am-permutations-combinations': [
    {
      t: 'num',
      ti: 'Numeric Entry: Committee Selection with Restrictions',
      ti_ar: 'إدخال رقمي: اختيار لجنة بشروط محددة',
      q: 'In how many ways can a committee of 3 students be chosen from a group of 7 students?',
      q_ar: 'بكم طريقة يمكن اختيار لجنة مكونة من 3 طلاب من بين مجموعة تضم 7 طلاب؟',
      a: 35,
      h: 'Order does not matter in a committee, so compute \\( \\binom{7}{3} = \\frac{7 \\times 6 \\times 5}{3 \\times 2 \\times 1} \\).',
      h_ar: 'الترتيب غير مهم في اختيار اللجنة، لذا احسب التوافيق \\( \\binom{7}{3} \\).',
      sol: '\\( \\binom{7}{3} = \\frac{7 \\times 6 \\times 5}{6} = 35 \\).',
      sol_ar: '\\( \\binom{7}{3} = \\frac{7 \\times 6 \\times 5}{6} = 35 \\).'
    },
    {
      t: 'ord',
      ti: 'Order the Steps: Arrangements with Together & Separated Restrictions',
      ti_ar: 'رتّب الخطوات: الترتيب مع شرط التجاور',
      prompt: 'Arrange the steps to find the number of ways to seat 6 people in a row if two specific people (A and B) must sit together:',
      prompt_ar: 'رتب خطوات إيجاد عدد طرق جلوس 6 أشخاص في صف إذا وجب جلوس شخصين محددين (A و B) متجاورين:',
      items: [
        'Group the two restricted people (A and B) into a single combined block [AB].',
        'Count the total number of independent units to arrange: the block [AB] plus the other 4 people gives 5 units.',
        'Arrange the 5 units in a row in \\( 5! = 120 \\) ways.',
        'Multiply by the internal arrangements of A and B within their block (\\( 2! = 2 \\)) to get \\( 120 \\times 2 = 240 \\).'
      ],
      items_ar: [
        'ادمج الشخصين المشروط تجاورهما (A و B) في كتلة واحدة [AB].',
        'احسب عدد الوحدات الكلية المراد ترتيبها: الكتلة [AB] مع 4 أشخاص آخرين يساوي 5 وحدات.',
        'رتب الوحدات الخمس في صف بعدد طرق \\( 5! = 120 \\) طريقة.',
        'اضرب في عدد التباديل الداخلية للكتلة (\\( 2! = 2 \\)) لتحصل على \\( 120 \\times 2 = 240 \\).'
      ],
      ex: 'Use the bundle method for "together" constraints and multiply by internal permutations.',
      ex_ar: 'استخدم طريقة الحزمة الواحدة لشرط التجاور ثم اضرب في التباديل الداخلية للحزمة.'
    },
    {
      t: 'cat',
      ti: 'Categorize: Permutation (Order Matters) vs. Combination (Order Ignored)',
      ti_ar: 'تصنيف: التباديل (الترتيب مهم) مقابل التوافيق (الترتيب غير مهم)',
      categories: [
        'Permutation (nPr)',
        'Combination (nCr)'
      ],
      categories_ar: [
        'تباديل (nPr — الترتيب مهم)',
        'توافيق (nCr — الترتيب غير مهم)'
      ],
      items: [
        { s: 'Forming a 4-digit PIN code using distinct digits from 1 to 9', s_ar: 'تكوين رمز سري من 4 أرقام مختلفة من 1 إلى 9', cat: 0 },
        { s: 'Selecting 4 delegates from 10 candidates to attend a conference', s_ar: 'اختيار 4 مندوبين من بين 10 مرشحين لحضور مؤتمر', cat: 1 },
        { s: 'Awarding Gold, Silver, and Bronze medals to 8 finalists', s_ar: 'توزيع الميداليات الذهبية والفضية والبرونزية على 8 متسابقين', cat: 0 },
        { s: 'Choosing 5 questions to answer out of 8 on an exam paper', s_ar: 'اختيار 5 أسئلة للإجابة عنها من أصل 8 في ورقة اختبار', cat: 1 }
      ],
      ex: 'If swapping two selected items creates a new outcome, use Permutations; otherwise use Combinations.',
      ex_ar: 'إذا كان تبديل عنصرين مختارين ينتج حالة جديدة نستخدم التباديل، وإلا نستخدم التوافيق.'
    }
  ],
  'am-differentiation-rates': [
    {
      t: 'tf',
      ti: 'True / False: Stationary Points & Connected Rates of Change',
      ti_ar: 'صح / خطأ: النقاط الحرجة والمعدلات المرتبطة بالزمن',
      items: [
        { s: 'At a stationary point where dy/dx = 0, if d²y/dx² > 0 the point is a local minimum.', a: true },
        { s: 'The gradient of the normal to a curve is equal to the gradient of the tangent at that point.', a: false },
        { s: 'By the chain rule, dy/dt = (dy/dx) × (dx/dt).', a: true }
      ],
      items_ar: [
        { s: 'عند نقطة حرجة حيث dy/dx = 0، إذا كان d²y/dx² > 0 فإن النقطة تمثل نهاية صغرى محلية.', a: true },
        { s: 'ميل العمودي على المنحنى يساوي ميل المماس عند نفس النقطة.', a: false },
        { s: 'بحسب قاعدة السلسلة للمعدلات المرتبطة: dy/dt = (dy/dx) × (dx/dt).', a: true }
      ]
    },
    {
      t: 'num',
      ti: 'Numeric Entry: Connected Rates of Change',
      ti_ar: 'إدخال رقمي: المعدلات المرتبطة بالزمن',
      q: 'Given \\( y = x^3 + 2x \\) and \\( \\frac{dx}{dt} = 2\\text{ units/s} \\), find \\( \\frac{dy}{dt} \\) at the instant when \\( x = 2 \\).',
      q_ar: 'إذا كانت \\( y = x^3 + 2x \\) وكان \\( \\frac{dx}{dt} = 2\\text{ units/s} \\)، فأوجد \\( \\frac{dy}{dt} \\) عند اللحظة \\( x = 2 \\).',
      a: 28,
      h: 'Compute \\( \\frac{dy}{dx} = 3x^2 + 2 \\) at \\( x = 2 \\), then multiply by \\( \\frac{dx}{dt} = 2 \\).',
      h_ar: 'احسب \\( \\frac{dy}{dx} = 3x^2 + 2 \\) عند \\( x = 2 \\)، ثم اضرب الناتج في \\( \\frac{dx}{dt} = 2 \\).',
      sol: 'At \\( x = 2 \\), \\( \\frac{dy}{dx} = 3(2)^2 + 2 = 14 \\). Hence \\( \\frac{dy}{dt} = 14 \\times 2 = 28 \\).',
      sol_ar: 'عند \\( x = 2 \\)، \\( \\frac{dy}{dx} = 3(4) + 2 = 14 \\). ومنه \\( \\frac{dy}{dt} = 14 \\times 2 = 28 \\).'
    },
    {
      t: 'ord',
      ti: 'Order the Steps: Finding and Classifying Stationary Points',
      ti_ar: 'رتّب الخطوات: إيجاد وتصنيف النقاط الحرجة',
      prompt: 'Arrange the steps to find and classify the stationary points of \\( y = x^3 - 3x^2 + 5 \\):',
      prompt_ar: 'رتب خطوات إيجاد وتصنيف النقاط الحرجة للمنحنى \\( y = x^3 - 3x^2 + 5 \\):',
      items: [
        'Differentiate with respect to \\( x \\): \\( \\frac{dy}{dx} = 3x^2 - 6x \\).',
        'Set \\( \\frac{dy}{dx} = 0 \\) and factor: \\( 3x(x - 2) = 0 \\implies x = 0 \\) or \\( x = 2 \\).',
        'Compute the second derivative: \\( \\frac{d^2y}{dx^2} = 6x - 6 \\).',
        'Evaluate \\( \\frac{d^2y}{dx^2} \\): at \\( x=0 \\) it is \\( -6 < 0 \\) (maximum); at \\( x=2 \\) it is \\( +6 > 0 \\) (minimum).'
      ],
      items_ar: [
        'اشتق المعادلة بالنسبة إلى \\( x \\): \\( \\frac{dy}{dx} = 3x^2 - 6x \\).',
        'ضع \\( \\frac{dy}{dx} = 0 \\) وحلل: \\( 3x(x - 2) = 0 \\implies x = 0 \\) أو \\( x = 2 \\).',
        'أوجد المشتقة الثانية: \\( \\frac{d^2y}{dx^2} = 6x - 6 \\).',
        'عوّض في المشتقة الثانية: عند \\( x=0 \\) الناتج \\( -6 < 0 \\) (عظمى)، وعند \\( x=2 \\) الناتج \\( +6 > 0 \\) (صغرى).'
      ],
      ex: 'Stationary points occur where dy/dx = 0 and are classified by the sign of d²y/dx².',
      ex_ar: 'تقع النقاط الحرجة حيث dy/dx = 0 وتُصنّف حسب إشارة المشتقة الثانية d²y/dx².'
    },
    {
      t: 'cat',
      ti: 'Categorize: Differentiation Rules Selection',
      ti_ar: 'تصنيف: اختيار قاعدة الاشتقاق المناسبة',
      categories: [
        'Chain Rule',
        'Product Rule',
        'Quotient Rule'
      ],
      categories_ar: [
        'قاعدة السلسلة (Chain Rule)',
        'قاعدة الضرب (Product Rule)',
        'قاعدة القسمة (Quotient Rule)'
      ],
      items: [
        { s: '\\( y = (3x^2 - 5)^6 \\)', s_ar: '\\( y = (3x^2 - 5)^6 \\)', cat: 0 },
        { s: '\\( y = x^2 e^{3x} \\)', s_ar: '\\( y = x^2 e^{3x} \\)', cat: 1 },
        { s: '\\( y = \\frac{\\sin x}{2x + 1} \\)', s_ar: '\\( y = \\frac{\\sin x}{2x + 1} \\)', cat: 2 },
        { s: '\\( y = \\ln(4x^2 + 1) \\)', s_ar: '\\( y = \\ln(4x^2 + 1) \\)', cat: 0 }
      ],
      ex: 'Composite functions use the Chain Rule, products of two functions of x use the Product Rule, and ratios use the Quotient Rule.',
      ex_ar: 'الدوال المركبة تشتق بقاعدة السلسلة، وحاصل ضرب دالتين بقاعدة الضرب، وخارج قسمة دالتين بقاعدة القسمة.'
    }
  ],
  'am-integration-kinematics': [
    {
      t: 'tf',
      ti: 'True / False: Definite Integration & Kinematics',
      ti_ar: 'صح / خطأ: التكامل المحدود وعلم الحركة',
      items: [
        { s: 'Integrating velocity v(t) with respect to time gives displacement s(t).', a: true },
        { s: 'A particle is momentarily at rest when its acceleration a(t) = 0.', a: false },
        { s: 'The area enclosed between two curves y = f(x) and y = g(x) (where f ≥ g) on [a, b] is ∫_a^b (f(x) − g(x)) dx.', a: true }
      ],
      items_ar: [
        { s: 'تكامل دالة السرعة v(t) بالنسبة للزمن يعطي دالة الإزاحة s(t).', a: true },
        { s: 'يسكن الجسيم لحظياً عندما يكون تسارعه a(t) = 0.', a: false },
        { s: 'المساحة المحصورة بين منحنيين y = f(x) و y = g(x) (حيث f ≥ g) على [a, b] هي ∫_a^b (f(x) − g(x)) dx.', a: true }
      ]
    },
    {
      t: 'num',
      ti: 'Numeric Entry: Definite Integral & Area Under a Curve',
      ti_ar: 'إدخال رقمي: التكامل المحدود والمساحة تحت المنحنى',
      q: 'Evaluate the definite integral \\( \\int_0^3 (3x^2 + 2x)\\,dx \\).',
      q_ar: 'احسب قيمة التكامل المحدود \\( \\int_0^3 (3x^2 + 2x)\\,dx \\).',
      a: 36,
      h: 'Find the antiderivative \\( [x^3 + x^2]_0^3 \\).',
      h_ar: 'أوجد الدالة الأصلية \\( [x^3 + x^2]_0^3 \\) ثم عوّض بحدي التكامل.',
      sol: '\\( [x^3 + x^2]_0^3 = (3^3 + 3^2) - 0 = 27 + 9 = 36 \\).',
      sol_ar: '\\( [x^3 + x^2]_0^3 = (27 + 9) - 0 = 36 \\).'
    },
    {
      t: 'ord',
      ti: 'Order the Steps: Total Distance Traveled When Velocity Changes Sign',
      ti_ar: 'رتّب الخطوات: حساب المسافة الكلية عند تغير إشارة السرعة',
      prompt: 'Arrange the steps to find the total distance traveled in \\( 0 \\le t \\le 4 \\) when \\( v(t) = 2t - 4 \\):',
      prompt_ar: 'رتب خطوات إيجاد المسافة الكلية المقطوعة في الفترة \\( 0 \\le t \\le 4 \\) إذا كانت السرعة \\( v(t) = 2t - 4 \\):',
      items: [
        'Set \\( v(t) = 2t - 4 = 0 \\) to find the turning point at \\( t = 2\\text{ s} \\).',
        'Split the time interval \\( [0, 4] \\) at the turning point into \\( [0, 2] \\) and \\( [2, 4] \\).',
        'Integrate \\( v(t) \\) over each sub-interval: \\( \\int_0^2 (2t-4)\\,dt = -4 \\) and \\( \\int_2^4 (2t-4)\\,dt = +4 \\).',
        'Sum the absolute magnitudes of the displacements: \\( |-4| + |4| = 8\\text{ m} \\).'
      ],
      items_ar: [
        'ضع \\( v(t) = 2t - 4 = 0 \\) لتحديد لحظة السكون اللحظي عند \\( t = 2\\text{ s} \\).',
        'جزّئ فترة التكامل \\( [0, 4] \\) عند نقطة الانعكاس إلى فترتين \\( [0, 2] \\) و \\( [2, 4] \\).',
        'احسب الإزاحة في كل فترة جزئية: \\( \\int_0^2 (2t-4)\\,dt = -4 \\) و \\( \\int_2^4 (2t-4)\\,dt = +4 \\).',
        'اجمع القيم المطلقة للإزاحتين: \\( |-4| + |4| = 8\\text{ m} \\).'
      ],
      ex: 'Total distance requires splitting the integral wherever v(t) = 0 and taking absolute values.',
      ex_ar: 'لحساب المسافة الكلية يجب تجزئة التكامل عند أصفار السرعة وأخذ القيمة المطلقة لكل جزء.'
    },
    {
      t: 'cat',
      ti: 'Categorize: Kinematics Calculus Relationships',
      ti_ar: 'تصنيف: علاقات التفاضل والتكامل في الحركة المستقيمة',
      categories: [
        'Differentiate with respect to t',
        'Integrate with respect to t',
        'Set Equal to Zero'
      ],
      categories_ar: [
        'اشتقاق بالنسبة للزمن t',
        'تكامل بالنسبة للزمن t',
        'مساواة المقدار بالصفر'
      ],
      items: [
        { s: 'Finding acceleration \\( a(t) \\) from velocity \\( v(t) \\)', s_ar: 'إيجاد التسارع \\( a(t) \\) من دالة السرعة \\( v(t) \\)', cat: 0 },
        { s: 'Finding displacement \\( s(t) \\) from velocity \\( v(t) \\)', s_ar: 'إيجاد الإزاحة \\( s(t) \\) من دالة السرعة \\( v(t) \\)', cat: 1 },
        { s: 'Finding the instant when a particle reverses direction (momentarily at rest)', s_ar: 'إيجاد لحظة السكون اللحظي وانعكاس اتجاه الحركة (v = 0)', cat: 2 },
        { s: 'Finding velocity \\( v(t) \\) from acceleration \\( a(t) \\)', s_ar: 'إيجاد السرعة \\( v(t) \\) من دالة التسارع \\( a(t) \\)', cat: 1 }
      ],
      ex: 'Differentiate: s → v → a. Integrate: a → v → s.',
      ex_ar: ' بالاشتقاق ننتقل من الإزاحة للسرعة للتسارع، وبالتكامل ننتقل عكسياً من التسارع للسرعة للإزاحة.'
    }
  ],
  'am-vectors-2d': [
    {
      t: 'num',
      ti: 'Numeric Entry: Vector Magnitude in 2D',
      ti_ar: 'إدخال رقمي: مقدار المتجه في المستوى الثنائي',
      q: 'Find the magnitude \\( |\\mathbf{v}| \\) of the vector \\( \\mathbf{v} = 8\\mathbf{i} - 6\\mathbf{j} \\).',
      q_ar: 'أوجد طول (مقدار) المتجه \\( |\\mathbf{v}| \\) للمتجه \\( \\mathbf{v} = 8\\mathbf{i} - 6\\mathbf{j} \\).',
      a: 10,
      h: 'Use \\( |\\mathbf{v}| = \\sqrt{x^2 + y^2} \\).',
      h_ar: 'استخدم قانون طول المتجه \\( |\\mathbf{v}| = \\sqrt{x^2 + y^2} \\).',
      sol: '\\( |\\mathbf{v}| = \\sqrt{8^2 + (-6)^2} = \\sqrt{64 + 36} = \\sqrt{100} = 10 \\).',
      sol_ar: '\\( |\\mathbf{v}| = \\sqrt{64 + 36} = \\sqrt{100} = 10 \\).'
    },
    {
      t: 'ord',
      ti: 'Order the Steps: Proving Three Points are Collinear Using Vectors',
      ti_ar: 'رتّب الخطوات: إثبات وقوع ثلاث نقاط على استقامة واحدة بالمتجهات',
      prompt: 'Arrange the steps to prove that points \\( A, B, C \\) are collinear given position vectors \\( \\overrightarrow{OA}, \\overrightarrow{OB}, \\overrightarrow{OC} \\):',
      prompt_ar: 'رتب خطوات إثبات أن النقاط \\( A, B, C \\) تقع على استقامة واحدة بمعلومية متجهات الموضع:',
      items: [
        'Compute displacement vector \\( \\overrightarrow{AB} = \\overrightarrow{OB} - \\overrightarrow{OA} \\).',
        'Compute displacement vector \\( \\overrightarrow{BC} = \\overrightarrow{OC} - \\overrightarrow{OB} \\).',
        'Factor out a scalar constant \\( k \\) to show that \\( \\overrightarrow{BC} = k\\overrightarrow{AB} \\) (so they are parallel).',
        'State that since \\( \\overrightarrow{AB} \\) and \\( \\overrightarrow{BC} \\) are parallel and share the common point \\( B \\), \\( A, B, C \\) are collinear.'
      ],
      items_ar: [
        'احسب متجه الإزاحة الأول \\( \\overrightarrow{AB} = \\overrightarrow{OB} - \\overrightarrow{OA} \\).',
        'احسب متجه الإزاحة الثاني \\( \\overrightarrow{BC} = \\overrightarrow{OC} - \\overrightarrow{OB} \\).',
        'أخرج عاملاً مشتركاً \\( k \\) لإثبات أن \\( \\overrightarrow{BC} = k\\overrightarrow{AB} \\) (أي أنهما متوازيان).',
        'اذكر أنه بما أن المتجهين متوازيان ويشتركان في النقطة \\( B \\)، فإن النقاط \\( A, B, C \\) على استقامة واحدة.'
      ],
      ex: 'Collinearity proof requires two parts: scalar multiple (parallelism) AND a shared common point.',
      ex_ar: 'إثبات الاستقامة الواحدة يتطلب شرطين: التوازي (أحدهما مضاعف قياسي للآخر) ووجود نقطة مشتركة.'
    },
    {
      t: 'cat',
      ti: 'Categorize: Vector Operations & Geometric Meanings',
      ti_ar: 'تصنيف: العمليات على المتجهات ومعانيها الهندسية',
      categories: [
        'Position / Displacement Rule',
        'Unit Vector Normalization',
        'Collinearity / Parallelism Condition'
      ],
      categories_ar: [
        'قاعدة متجه الموضع والإزاحة',
        'متجه الوحدة في نفس الاتجاه',
        'شرط التوازي والاستقامة الواحدة'
      ],
      items: [
        { s: '\\( \\overrightarrow{AB} = \\overrightarrow{OB} - \\overrightarrow{OA} \\)', s_ar: '\\( \\overrightarrow{AB} = \\overrightarrow{OB} - \\overrightarrow{OA} \\)', cat: 0 },
        { s: '\\( \\hat{\\mathbf{u}} = \\frac{\\mathbf{u}}{|\\mathbf{u}|} \\)', s_ar: '\\( \\hat{\\mathbf{u}} = \\frac{\\mathbf{u}}{|\\mathbf{u}|} \\)', cat: 1 },
        { s: '\\( \\mathbf{a} = \\lambda \\mathbf{b} \\) for non-zero scalar \\( \\lambda \\)', s_ar: '\\( \\mathbf{a} = \\lambda \\mathbf{b} \\) لعدد حقيقي \\( \\lambda \\neq 0 \\)', cat: 2 },
        { s: '\\( \\overrightarrow{OP} = \\overrightarrow{OA} + t\\,\\mathbf{v} \\)', s_ar: '\\( \\overrightarrow{OP} = \\overrightarrow{OA} + t\\,\\mathbf{v} \\)', cat: 0 }
      ],
      ex: 'Displacement is head minus tail; unit vector divides by length; parallel vectors are scalar multiples.',
      ex_ar: 'متجه الإزاحة يساوي النهاية ناقص البداية؛ ومتجه الوحدة يقسم على الطول؛ والمتجهات المتوازية مضاعفات قياسية.'
    }
  ]
};

// Supplemental activities for mathai chapters to reach 9 activities per chapter
const MATHAI_EXTRA = {
  'ai-vectors-embeddings': [
    {
      t: 'tf',
      ti: 'True / False: Embeddings, Norms & Cosine Similarity',
      ti_ar: 'صح / خطأ: التضمينات المتجهة والمعايير وتشابه جيب التمام',
      items: [
        { s: 'Cosine similarity between two non-zero vectors always lies in the interval [-1, 1].', a: true },
        { s: 'Multiplying an embedding vector by a positive scalar c > 0 changes its cosine similarity with other vectors.', a: false },
        { s: 'The L1 (Manhattan) norm of v = (3, -4) is 7, while its L2 (Euclidean) norm is 5.', a: true }
      ],
      items_ar: [
        { s: 'تشابه جيب التمام بين أي متجهين غير صفريين يقع دائماً في الفترة [-1, 1].', a: true },
        { s: 'ضرب متجه التضمين في عدد موجب c > 0 يغيّر قيمة تشابه جيب التمام مع المتجهات الأخرى.', a: false },
        { s: 'معيار L1 للمتجه v = (3, -4) يساوي 7، بينما معيار L2 الإقليدي له يساوي 5.', a: true }
      ]
    },
    {
      t: 'num',
      ti: 'Numeric Entry: Dot Product of Embedding Vectors',
      ti_ar: 'إدخال رقمي: الضرب القياسي لمتجهات التضمين',
      q: 'Compute the dot product \\( \\mathbf{u} \\cdot \\mathbf{v} \\) for \\( \\mathbf{u} = [2, -1, 4] \\) and \\( \\mathbf{v} = [3, 5, 2] \\).',
      q_ar: 'احسب حاصل الضرب القياسي \\( \\mathbf{u} \\cdot \\mathbf{v} \\) للمتجهين \\( \\mathbf{u} = [2, -1, 4] \\) و \\( \\mathbf{v} = [3, 5, 2] \\).',
      a: 9,
      h: 'Multiply corresponding components and sum: \\( (2)(3) + (-1)(5) + (4)(2) \\).',
      h_ar: 'اضرب المركبات المتناظرة واجمعها: \\( (2)(3) + (-1)(5) + (4)(2) \\).',
      sol: '\\( \\mathbf{u} \\cdot \\mathbf{v} = 6 - 5 + 8 = 9 \\).',
      sol_ar: '\\( \\mathbf{u} \\cdot \\mathbf{v} = 6 - 5 + 8 = 9 \\).'
    },
    {
      t: 'ord',
      ti: 'Order the Steps: Computing Cosine Similarity',
      ti_ar: 'رتّب الخطوات: حساب تشابه جيب التمام (Cosine Similarity)',
      prompt: 'Arrange the steps to compute the cosine similarity between \\( \\mathbf{a} = [3, 4] \\) and \\( \\mathbf{b} = [6, 8] \\):',
      prompt_ar: 'رتب خطوات حساب تشابه جيب التمام بين المتجهين \\( \\mathbf{a} = [3, 4] \\) و \\( \\mathbf{b} = [6, 8] \\):',
      items: [
        'Compute the dot product: \\( \\mathbf{a} \\cdot \\mathbf{b} = (3)(6) + (4)(8) = 50 \\).',
        'Compute the Euclidean norms: \\( \\|\\mathbf{a}\\|_2 = 5 \\) and \\( \\|\\mathbf{b}\\|_2 = 10 \\).',
        'Multiply the two norms: \\( \\|\\mathbf{a}\\|_2 \\|\\mathbf{b}\\|_2 = 5 \\times 10 = 50 \\).',
        'Divide the dot product by the product of norms: \\( \\cos(\\theta) = \\frac{50}{50} = 1.0 \\).'
      ],
      items_ar: [
        'احسب الضرب القياسي: \\( \\mathbf{a} \\cdot \\mathbf{b} = (3)(6) + (4)(8) = 50 \\).',
        'احسب الطول الإقليدي لكل متجه: \\( \\|\\mathbf{a}\\|_2 = 5 \\) و \\( \\|\\mathbf{b}\\|_2 = 10 \\).',
        'اضرب المعيارين: \\( \\|\\mathbf{a}\\|_2 \\|\\mathbf{b}\\|_2 = 5 \\times 10 = 50 \\).',
        'اقسم الضرب القياسي على حاصل ضرب المعيارين: \\( \\cos(\\theta) = \\frac{50}{50} = 1.0 \\).'
      ],
      ex: 'Cosine similarity normalizes the dot product by the L2 lengths of both vectors.',
      ex_ar: 'تشابه جيب التمام يقسم الضرب القياسي على حاصل ضرب طولي المتجهين.'
    },
    {
      t: 'cat',
      ti: 'Categorize: Vector Alignment from Cosine Similarity',
      ti_ar: 'تصنيف: العلاقة الهندسية بين المتجهات حسب قيمة جيب التمام',
      categories: [
        'Aligned / Similar (cos θ > 0)',
        'Orthogonal / Unrelated (cos θ = 0)',
        'Opposite / Antonymic (cos θ < 0)'
      ],
      categories_ar: [
        'متقاربة بالمعنى (cos θ > 0)',
        'متعامدة / مستقلة (cos θ = 0)',
        'متعاكسة بالاتجاه (cos θ < 0)'
      ],
      items: [
        { s: '\\( \\mathbf{u} = [1, 2],\\; \\mathbf{v} = [2, 4] \\)', s_ar: '\\( \\mathbf{u} = [1, 2],\\; \\mathbf{v} = [2, 4] \\)', cat: 0 },
        { s: '\\( \\mathbf{u} = [2, 3],\\; \\mathbf{v} = [-3, 2] \\)', s_ar: '\\( \\mathbf{u} = [2, 3],\\; \\mathbf{v} = [-3, 2] \\)', cat: 1 },
        { s: '\\( \\mathbf{u} = [1, -1],\\; \\mathbf{v} = [-2, 2] \\)', s_ar: '\\( \\mathbf{u} = [1, -1],\\; \\mathbf{v} = [-2, 2] \\)', cat: 2 },
        { s: '\\( \\mathbf{u} = [1, 0],\\; \\mathbf{v} = [0, 5] \\)', s_ar: '\\( \\mathbf{u} = [1, 0],\\; \\mathbf{v} = [0, 5] \\)', cat: 1 }
      ],
      ex: 'Sign of the dot product determines whether the angle is acute (>0), right (=0), or obtuse (<0).',
      ex_ar: 'إشارة الضرب القياسي تحدد ما إذا كانت الزاوية حادة (>0) أو قائمة (=0) أو منفرجة (<0).'
    }
  ],
  'ai-matrices-linear-layers': [
    {
      t: 'tf',
      ti: 'True / False: Neural Network Layers & Activation Functions',
      ti_ar: 'صح / خطأ: طبقات الشبكات العصبية ودوال التنشيط',
      items: [
        { s: 'Without non-linear activation functions, stacking multiple dense layers collapses into a single linear transformation.', a: true },
        { s: 'If W has shape (16, 64) and x has shape (64, 1), the output Wx has shape (16, 1).', a: true },
        { s: 'The ReLU function ReLU(z) = max(0, z) outputs -5 when z = -5.', a: false }
      ],
      items_ar: [
        { s: 'بدون دوال تنشيط غير خطية، فإن تكديس عدة طبقات خطية يختزل إلى تحويل خطي واحد فقط.', a: true },
        { s: 'إذا كانت أبعاد W هي (16, 64) وأبعاد x هي (64, 1)، فإن أبعاد الناتج Wx هي (16, 1).', a: true },
        { s: 'دالة ReLU(z) = max(0, z) تعطي الناتج -5 عندما تكون z = -5.', a: false }
      ]
    },
    {
      t: 'num',
      ti: 'Numeric Entry: Forward Pass through a ReLU Neuron',
      ti_ar: 'إدخال رقمي: التمرير الأمامي عبر خلية عصبية بدالة ReLU',
      q: 'Compute \\( a = \\text{ReLU}(\\mathbf{w}^T\\mathbf{x} + b) \\) given \\( \\mathbf{w} = [2, -3] \\), \\( \\mathbf{x} = [5, 1] \\), and bias \\( b = 4 \\).',
      q_ar: 'احسب مخرج الخلية \\( a = \\text{ReLU}(\\mathbf{w}^T\\mathbf{x} + b) \\) إذا كان \\( \\mathbf{w} = [2, -3] \\) و \\( \\mathbf{x} = [5, 1] \\) والانحياز \\( b = 4 \\).',
      a: 11,
      h: 'First compute the pre-activation \\( z = (2)(5) + (-3)(1) + 4 \\), then apply \\( \\max(0, z) \\).',
      h_ar: 'احسب أولاً \\( z = (2)(5) + (-3)(1) + 4 \\)، ثم طبّق \\( \\max(0, z) \\).',
      sol: '\\( z = 10 - 3 + 4 = 11 \\). Since \\( 11 > 0 \\), \\( \\text{ReLU}(11) = 11 \\).',
      sol_ar: '\\( z = 10 - 3 + 4 = 11 \\)، وبما أن الناتج موجب فإن \\( \\text{ReLU}(11) = 11 \\).'
    },
    {
      t: 'ord',
      ti: 'Order the Steps: Dense Layer Forward Propagation',
      ti_ar: 'رتّب الخطوات: التمرير الأمامي في طبقة كثيفة (Dense Layer)',
      prompt: 'Arrange the steps to compute the activated output \\( \\mathbf{a} = \\sigma(W\\mathbf{x} + \\mathbf{b}) \\) of a neural layer:',
      prompt_ar: 'رتب خطوات حساب المخرج المنشط \\( \\mathbf{a} = \\sigma(W\\mathbf{x} + \\mathbf{b}) \\) لطبقة عصبية:',
      items: [
        'Verify dimension compatibility: weight matrix \\( W \\in \\mathbb{R}^{m \\times n} \\) matches input vector \\( \\mathbf{x} \\in \\mathbb{R}^{n \\times 1} \\).',
        'Compute the linear matrix-vector product \\( \\mathbf{u} = W\\mathbf{x} \\in \\mathbb{R}^{m \\times 1} \\).',
        'Add the bias vector \\( \\mathbf{b} \\in \\mathbb{R}^{m \\times 1} \\) to obtain pre-activation logits \\( \\mathbf{z} = \\mathbf{u} + \\mathbf{b} \\).',
        'Apply the non-linear activation function \\( \\sigma(\\cdot) \\) element-wise to produce \\( \\mathbf{a} = \\sigma(\\mathbf{z}) \\).'
      ],
      items_ar: [
        'تحقق من توافق الأبعاد: مصفوفة الأوزان \\( W \\in \\mathbb{R}^{m \\times n} \\) تتوافق مع المتجه \\( \\mathbf{x} \\in \\mathbb{R}^{n \\times 1} \\).',
        'احسب حاصل ضرب المصفوفة في المتجه \\( \\mathbf{u} = W\\mathbf{x} \\in \\mathbb{R}^{m \\times 1} \\).',
        'أضف متجه الانحياز \\( \\mathbf{b} \\) للحصول على متجه ما قبل التنشيط \\( \\mathbf{z} = \\mathbf{u} + \\mathbf{b} \\).',
        'طبّق دالة التنشيط غير الخطية \\( \\sigma(\\cdot) \\) على كل عنصر لإنتاج \\( \\mathbf{a} = \\sigma(\\mathbf{z}) \\).'
      ],
      ex: 'A dense layer performs an affine map z = Wx + b followed by an element-wise activation σ(z).',
      ex_ar: 'تنفذ الطبقة الكثيفة تحويلاً خطياً تآلفياً z = Wx + b متبوعاً بدالة تنشيط غير خطية σ(z).'
    },
    {
      t: 'cat',
      ti: 'Categorize: Activation Function Properties',
      ti_ar: 'تصنيف: خصائص دوال التنشيط في التعلم العميق',
      categories: [
        'ReLU(z) = max(0, z)',
        'Sigmoid σ(z) = 1/(1 + e^{-z})',
        'Softmax(z_i)'
      ],
      categories_ar: [
        'دالة ReLU(z) = max(0, z)',
        'دالة السيجمويد σ(z) = 1/(1 + e^{-z})',
        'دالة Softmax(z_i)'
      ],
      items: [
        { s: 'Outputs zero for all negative inputs and has derivative 1 for positive inputs', s_ar: 'تعطي صفراً للمدخلات السالبة ومشتقتها 1 للمدخلات الموجبة', cat: 0 },
        { s: 'Maps any real scalar into a single probability in (0, 1) for binary classification', s_ar: 'تحول أي عدد حقيقي إلى احتمال بين (0, 1) للتصنيف الثنائي', cat: 1 },
        { s: 'Converts a vector of K logits into a probability distribution summing to 1', s_ar: 'تحول متجهاً من K قيمة إلى توزيع احتمالي مجموعه 1 للتصنيف المتعدد', cat: 2 },
        { s: 'At z = 0, its output equals exactly 0.5 and its derivative is 0.25', s_ar: 'عند z = 0 يكون مخرجها 0.5 ومشتقتها 0.25 تماماً', cat: 1 }
      ],
      ex: 'ReLU is standard for hidden layers; Sigmoid for binary outputs; Softmax for multi-class distributions.',
      ex_ar: 'تُستخدم ReLU للطبقات الخفية، وSigmoid للتصنيف الثنائي، وSoftmax للتصنيف متعدد الفئات.'
    }
  ],
  'ai-gradient-descent': [
    {
      t: 'num',
      ti: 'Numeric Entry: Single Step of Gradient Descent',
      ti_ar: 'إدخال رقمي: خطوة تحديث واحدة في الانحدار التدريجي',
      q: 'Minimize \\( L(w) = (w - 3)^2 \\) starting from \\( w_0 = 7 \\) with learning rate \\( \\eta = 0.25 \\). Find the updated weight \\( w_1 \\).',
      q_ar: 'لتقليل دالة الخسارة \\( L(w) = (w - 3)^2 \\) بدءاً من \\( w_0 = 7 \\) بمعدل تعلم \\( \\eta = 0.25 \\)، أوجد الوزن المحدّث \\( w_1 \\).',
      a: 5,
      h: 'Compute \\( L\'(w_0) = 2(7 - 3) = 8 \\), then apply \\( w_1 = w_0 - \\eta L\'(w_0) \\).',
      h_ar: 'احسب المشتقة \\( L\'(7) = 2(7 - 3) = 8 \\)، ثم طبّق \\( w_1 = w_0 - \\eta L\'(w_0) \\).',
      sol: '\\( w_1 = 7 - 0.25(8) = 7 - 2 = 5 \\).',
      sol_ar: '\\( w_1 = 7 - 0.25(8) = 7 - 2 = 5 \\).'
    },
    {
      t: 'ord',
      ti: 'Order the Steps: Backpropagation & Weight Update Loop',
      ti_ar: 'رتّب الخطوات: حلقة الانتشار الخلفي وتحديث الأوزان',
      prompt: 'Arrange the four core phases of a single training iteration in gradient descent:',
      prompt_ar: 'رتب المراحل الأربع الأساسية لتكرار تدريبي واحد باستخدام الانحدار التدريجي:',
      items: [
        'Forward Pass: Compute model predictions \\( \\hat{y} = f_\\theta(x) \\) for the current batch.',
        'Loss Evaluation: Compute the scalar objective loss \\( \\mathcal{L}(\\hat{y}, y) \\).',
        'Backward Pass: Apply the chain rule to compute gradients \\( \\nabla_\\theta \\mathcal{L} \\).',
        'Parameter Update: Step opposite the gradient via \\( \\theta \\leftarrow \\theta - \\eta \\nabla_\\theta \\mathcal{L} \\).'
      ],
      items_ar: [
        'التمرير الأمامي: حساب توقعات النموذج \\( \\hat{y} = f_\\theta(x) \\) للدفعة الحالية.',
        'حساب الخسارة: تقييم دالة الخسارة القياسية \\( \\mathcal{L}(\\hat{y}, y) \\).',
        'الانتشار الخلفي: تطبيق قاعدة السلسلة لحساب متجه التدرج \\( \\nabla_\\theta \\mathcal{L} \\).',
        'تحديث المعاملات: التحرك عكس اتجاه التدرج وفق \\( \\theta \\leftarrow \\theta - \\eta \\nabla_\\theta \\mathcal{L} \\).'
      ],
      ex: 'Every neural network optimizer repeats Forward → Loss → Backward (Grad) → Step.',
      ex_ar: 'تكرر خوارزميات التدريب دائماً التسلسل: التمرير الأمامي ← حساب الخسارة ← حساب التدرج ← تحديث الأوزان.'
    },
    {
      t: 'cat',
      ti: 'Categorize: Learning Rate η Regime Diagnosis',
      ti_ar: 'تصنيف: تشخيص سلوك معدل التعلم η',
      categories: [
        'Learning Rate Too Small (η ≪ 1)',
        'Well-Tuned Learning Rate',
        'Learning Rate Too Large (Overshooting)'
      ],
      categories_ar: [
        'معدل تعلم صغير جداً (بطء شديد)',
        'معدل تعلم مثالي ومتوازن',
        'معدل تعلم كبير جداً (تذبذب وتباعد)'
      ],
      items: [
        { s: 'Loss decreases smoothly and converges rapidly to the global minimum', s_ar: 'تنخفض الخسارة بسلاسة وتتقارب سريعاً نحو النهاية الصغرى', cat: 1 },
        { s: 'Loss oscillates wildly across the valley and diverges to infinity', s_ar: 'تتذبذب الخسارة بشدة على جانبي القاع وتتباعد إلى ما لا نهاية', cat: 2 },
        { s: 'Loss decreases by tiny fractions per epoch, requiring millions of steps', s_ar: 'تنخفض الخسارة بمقدار ضئيل جداً في كل حقبة وتتطلب ملايين الخطوات', cat: 0 },
        { s: 'For L(w) = w², choosing η = 1.2 so that |1 − 2η| = 1.4 > 1', s_ar: 'في الدالة L(w) = w²، اختيار η = 1.2 بحيث يصبح معامل التحديث |1 − 2η| = 1.4 > 1', cat: 2 }
      ],
      ex: 'Too small η stalls training; too large η overshoots the valley walls and diverges.',
      ex_ar: 'معدل التعلم الصغير جداً يبطئ التدريب، والكبير جداً يتجاوز القاع ويؤدي للتباعد.'
    }
  ],
  'ai-probability-bayes': [
    {
      t: 'tf',
      ti: 'True / False: Conditional Probability & Bayes\' Rule',
      ti_ar: 'صح / خطأ: الاحتمال الشرطي وقاعدة بايز',
      items: [
        { s: 'In general, P(A | B) is not equal to P(B | A) unless the prior probabilities P(A) and P(B) are equal.', a: true },
        { s: 'If events A and B are independent with P(B) > 0, then P(A | B) = P(A).', a: true },
        { s: 'A Naive Bayes classifier assumes all input features are maximally correlated with one another.', a: false }
      ],
      items_ar: [
        { s: 'بشكل عام، P(A | B) لا يساوي P(B | A) إلا إذا تساوى الاحتمالان القبليان P(A) و P(B).', a: true },
        { s: 'إذا كان الحدثان A و B مستقلين وكان P(B) > 0، فإن P(A | B) = P(A).', a: true },
        { s: 'يفترض مصنف بايز الساذج (Naive Bayes) أن جميع الخصائص المدخلة مرتبطة ببعضها ارتباطاً تاماً.', a: false }
      ]
    },
    {
      t: 'num',
      ti: 'Numeric Entry: Bayes\' Theorem Posterior Probability (%)',
      ti_ar: 'إدخال رقمي: حساب الاحتمال البعدي بنظرية بايز (%)',
      q: 'Given prior \\( P(A) = 0.2 \\), likelihood \\( P(B|A) = 0.9 \\), and \\( P(B|\\neg A) = 0.15 \\), find the posterior probability \\( P(A|B) \\) as a percentage.',
      q_ar: 'إذا كان الاحتمال القبلي \\( P(A) = 0.2 \\)، و \\( P(B|A) = 0.9 \\)، و \\( P(B|\\neg A) = 0.15 \\)، فأوجد الاحتمال البعدي \\( P(A|B) \\) كنسبة مئوية.',
      a: 60,
      h: 'Compute \\( P(B) = (0.2)(0.9) + (0.8)(0.15) = 0.18 + 0.12 = 0.30 \\), then \\( P(A|B) = \\frac{0.18}{0.30} \\).',
      h_ar: 'احسب \\( P(B) = 0.18 + 0.12 = 0.30 \\)، ثم اقسم \\( \\frac{0.18}{0.30} \\) وحوّل لنسبة مئوية.',
      sol: '\\( P(A|B) = \\frac{0.18}{0.18 + 0.12} = \\frac{0.18}{0.30} = 0.60 = 60\\% \\).',
      sol_ar: '\\( P(A|B) = \\frac{0.18}{0.30} = 0.60 = 60\\% \\).'
    },
    {
      t: 'ord',
      ti: 'Order the Steps: Diagnostic Test Posterior Calculation',
      ti_ar: 'رتّب الخطوات: حساب الاحتمال البعدي في فحص تشخيصي',
      prompt: 'Arrange the steps to compute the posterior probability \\( P(D \\mid +) \\) using Bayes\' Theorem:',
      prompt_ar: 'رتب خطوات حساب الاحتمال البعدي للإصابة \\( P(D \\mid +) \\) باستخدام قانون بايز:',
      items: [
        'Identify the prior prevalence \\( P(D) \\) and complement \\( P(\\neg D) = 1 - P(D) \\).',
        'Compute the true-positive joint probability \\( P(+ \\cap D) = P(+ \\mid D)P(D) \\).',
        'Compute the total probability of a positive test \\( P(+) = P(+ \\mid D)P(D) + P(+ \\mid \\neg D)P(\\neg D) \\).',
        'Divide the true-positive probability by total positive probability: \\( P(D \\mid +) = \\frac{P(+ \\cap D)}{P(+)} \\).'
      ],
      items_ar: [
        'حدد الاحتمال القبلي \\( P(D) \\) والمكمل \\( P(\\neg D) = 1 - P(D) \\).',
        'احسب احتمال الإيجابية الحقيقية المشترك \\( P(+ \\cap D) = P(+ \\mid D)P(D) \\).',
        'احسب الاحتمال الكلي للنتيجة الموجبة \\( P(+) = P(+ \\mid D)P(D) + P(+ \\mid \\neg D)P(\\neg D) \\).',
        'اقسم احتمال الإيجابية الحقيقية على الاحتمال الكلي: \\( P(D \\mid +) = \\frac{P(+ \\cap D)}{P(+)} \\).'
      ],
      ex: 'Bayes\' rule divides the true-positive branch by the sum of all positive branches.',
      ex_ar: 'يقسم قانون بايز فرع الإيجابية الحقيقية على مجموع كافة الفروع الموجبة.'
    },
    {
      t: 'cat',
      ti: 'Categorize: Components of Bayes\' Theorem P(Y|X) = P(X|Y)P(Y)/P(X)',
      ti_ar: 'تصنيف: مكونات معادلة بايز P(Y|X) = P(X|Y)P(Y)/P(X)',
      categories: [
        'Prior Belief',
        'Likelihood / Generative Model',
        'Posterior / Evidence'
      ],
      categories_ar: [
        'الاحتمال القبلي (Prior)',
        'دالة المعقولية (Likelihood)',
        'الاحتمال البعدي / الدليل (Posterior / Evidence)'
      ],
      items: [
        { s: '\\( P(Y) \\): Baseline class probability before observing features \\( X \\)', s_ar: '\\( P(Y) \\): احتمال الفئة الأساسي قبل رصد البيانات \\( X \\)', cat: 0 },
        { s: '\\( P(X \\mid Y) \\): Probability of generating feature \\( X \\) given class \\( Y \\)', s_ar: '\\( P(X \\mid Y) \\): احتمال ظهور الخاصية \\( X \\) بشرط الفئة \\( Y \\)', cat: 1 },
        { s: '\\( P(Y \\mid X) \\): Updated class probability after observing \\( X \\)', s_ar: '\\( P(Y \\mid X) \\): احتمال الفئة المحدّث بعد رصد \\( X \\)', cat: 2 },
        { s: '\\( P(X) = \\sum_y P(X \\mid y)P(y) \\): Marginal normalizing constant', s_ar: '\\( P(X) = \\sum_y P(X \\mid y)P(y) \\): ثابت التطبيع الهامشي', cat: 2 }
      ],
      ex: 'Posterior ∝ Likelihood × Prior.',
      ex_ar: 'الاحتمال البعدي يتناسب طردياً مع حاصل ضرب المعقولية في الاحتمال القبلي.'
    }
  ],
  'ai-distributions-mle': [
    {
      t: 'num',
      ti: 'Numeric Entry: Maximum Likelihood Estimate (MLE) for Bernoulli p',
      ti_ar: 'إدخال رقمي: تقدير الإمكان الأعظم (MLE) لمعامل برنولي',
      q: 'In 20 independent Bernoulli trials, you observe 13 successes. What is the MLE \\( \\hat{p}_{\\text{MLE}} \\) expressed as a percentage?',
      q_ar: 'في 20 تجربة برنولي مستقلة، تم رصد 13 نجاحاً. ما قيمة مقدر الإمكان الأعظم \\( \\hat{p}_{\\text{MLE}} \\) كنسبة مئوية؟',
      a: 65,
      h: 'For Bernoulli trials, \\( \\hat{p}_{\\text{MLE}} = \\frac{k}{n} = \\frac{13}{20} \\).',
      h_ar: 'لتجارب برنولي، \\( \\hat{p}_{\\text{MLE}} = \\frac{k}{n} = \\frac{13}{20} \\).',
      sol: '\\( \\hat{p}_{\\text{MLE}} = \\frac{13}{20} = 0.65 = 65\\% \\).',
      sol_ar: '\\( \\hat{p}_{\\text{MLE}} = \\frac{13}{20} = 0.65 = 65\\% \\).'
    },
    {
      t: 'ord',
      ti: 'Order the Steps: Deriving an MLE Estimator',
      ti_ar: 'رتّب الخطوات: اشتقاق مقدر الإمكان الأعظم (MLE)',
      prompt: 'Arrange the mathematical steps to derive the Maximum Likelihood Estimator \\( \\hat{\\theta}_{\\text{MLE}} \\):',
      prompt_ar: 'رتب الخطوات الرياضية لاشتقاق مقدر الإمكان الأعظم \\( \\hat{\\theta}_{\\text{MLE}} \\):',
      items: [
        'Write the joint likelihood of independent samples as a product: \\( L(\\theta) = \\prod_{i=1}^n p(x_i \\mid \\theta) \\).',
        'Take the natural logarithm to convert the product into a sum: \\( \\ell(\\theta) = \\sum_{i=1}^n \\ln p(x_i \\mid \\theta) \\).',
        'Differentiate the log-likelihood \\( \\ell(\\theta) \\) with respect to \\( \\theta \\) and set \\( \\frac{d\\ell}{d\\theta} = 0 \\).',
        'Solve the critical-point equation for \\( \\hat{\\theta} \\) and verify \\( \\frac{d^2\\ell}{d\\theta^2} < 0 \\).'
      ],
      items_ar: [
        'اكتب دالة الإمكان المشتركة للعينات المستقلة كحاصل ضرب: \\( L(\\theta) = \\prod_{i=1}^n p(x_i \\mid \\theta) \\).',
        'خذ اللوغاريتم الطبيعي لتحويل الضرب إلى مجموع: \\( \\ell(\\theta) = \\sum_{i=1}^n \\ln p(x_i \\mid \\theta) \\).',
        'اشتق دالة الإمكان اللوغاريتمية \\( \\ell(\\theta) \\) بالنسبة إلى \\( \\theta \\) وضع \\( \\frac{d\\ell}{d\\theta} = 0 \\).',
        'حل المعادلة لإيجاد \\( \\hat{\\theta} \\) وتحقق من شرط القيمة العظمى \\( \\frac{d^2\\ell}{d\\theta^2} < 0 \\).'
      ],
      ex: 'Taking logs turns products of probabilities into sums, preventing numerical underflow and simplifying derivatives.',
      ex_ar: 'أخذ اللوغاريتم يحول ضرب الاحتمالات إلى جمع، مما يمنع التلاشي العددي ويسهل الاشتقاق.'
    },
    {
      t: 'cat',
      ti: 'Categorize: Probability Distributions in Machine Learning',
      ti_ar: 'تصنيف: التوزيعات الاحتمالية في تعلم الآلة',
      categories: [
        'Bernoulli / Categorical',
        'Gaussian (Normal) N(μ, σ²)',
        'Poisson(λ)'
      ],
      categories_ar: [
        'توزيع برنولي / الفئوي',
        'التوزيع الطبيعي (الجاوسي)',
        'توزيع بواسون Poisson(λ)'
      ],
      items: [
        { s: 'Models binary labels y ∈ {0, 1} and underpins Binary Cross-Entropy loss', s_ar: 'ينمذج التصنيف الثنائي y ∈ {0, 1} ويشكل أساس خسارة الإنتروبيا المتقاطعة', cat: 0 },
        { s: 'Continuous bell-shaped density whose negative log-likelihood yields Mean Squared Error (MSE)', s_ar: 'توزيع متصل متماثل يؤدي سالب لوغاريتم إمكانه إلى متوسط مربع الخطأ (MSE)', cat: 1 },
        { s: 'Models discrete event counts per fixed interval with mean equal to variance (λ)', s_ar: 'ينمذج عدد الأحداث المنفصلة في فترة زمنية ويتساوى فيه المتوسط والتباين (λ)', cat: 2 },
        { s: 'Parameterized by a single probability p with variance p(1 − p)', s_ar: 'يتحدد بمعامل احتمال واحد p وتباينه يساوي p(1 − p)', cat: 0 }
      ],
      ex: 'Gaussian noise → MSE loss; Bernoulli likelihood → Binary Cross-Entropy loss.',
      ex_ar: 'الضوضاء الجاوسية تقابل خسارة MSE، وإمكان برنولي يقابل خسارة الإنتروبيا المتقاطعة الثنائية.'
    }
  ],
  'ai-linear-regression': [
    {
      t: 'tf',
      ti: 'True / False: Ordinary Least Squares (OLS) & Residual Geometry',
      ti_ar: 'صح / خطأ: المربعات الصغرى العادية (OLS) وهندسة البواقي',
      items: [
        { s: 'The fitted OLS regression line ŷ = β₀ + β₁x always passes through the sample centroid (x̄, ȳ).', a: true },
        { s: 'In OLS, the residual vector e = y − Xβ̂ is orthogonal to every column of the design matrix X.', a: true },
        { s: 'A coefficient of determination R² = 0.85 means 15% of the variance in y is explained by the linear model.', a: false }
      ],
      items_ar: [
        { s: 'يمر خط انحدار المربعات الصغرى ŷ = β₀ + β₁x دائماً بنقطة المتوسط الحسابي للعينة (x̄, ȳ).', a: true },
        { s: 'في طريقة المربعات الصغرى، يكون متجه البواقي e = y − Xβ̂ عمودياً على كل عمود في مصفوفة التصميم X.', a: true },
        { s: 'معامل التحديد R² = 0.85 يعني أن 15% فقط من التباين في y يفسره النموذج الخطي.', a: false }
      ]
    },
    {
      t: 'num',
      ti: 'Numeric Entry: Computing R² (Coefficient of Determination)',
      ti_ar: 'إدخال رقمي: حساب معامل التحديد R²',
      q: 'A linear regression model has total sum of squares \\( \\text{TSS} = 200 \\) and residual sum of squares \\( \\text{RSS} = 30 \\). Find \\( R^2 \\) as a percentage.',
      q_ar: 'نموذج انحدار خطي مجموع مربعاته الكلي \\( \\text{TSS} = 200 \\) ومجموع مربعات البواقي \\( \\text{RSS} = 30 \\). أوجد قيمة \\( R^2 \\) كنسبة مئوية.',
      a: 85,
      h: 'Use \\( R^2 = 1 - \\frac{\\text{RSS}}{\\text{TSS}} \\).',
      h_ar: 'استخدم القانون \\( R^2 = 1 - \\frac{\\text{RSS}}{\\text{TSS}} \\).',
      sol: '\\( R^2 = 1 - \\frac{30}{200} = 1 - 0.15 = 0.85 = 85\\% \\).',
      sol_ar: '\\( R^2 = 1 - \\frac{30}{200} = 0.85 = 85\\% \\).'
    },
    {
      t: 'ord',
      ti: 'Order the Steps: Deriving the Normal Equations XᵀXβ̂ = Xᵀy',
      ti_ar: 'رتّب الخطوات: اشتقاق المعادلات الطبيعية للانحدار الخطي',
      prompt: 'Arrange the steps to derive the closed-form OLS estimator \\( \\hat{\\boldsymbol{\\beta}} = (X^T X)^{-1} X^T \\mathbf{y} \\):',
      prompt_ar: 'رتب خطوات اشتقاق الصيغة المغلقة لمقدر المربعات الصغرى \\( \\hat{\\boldsymbol{\\beta}} = (X^T X)^{-1} X^T \\mathbf{y} \\):',
      items: [
        'Express the Residual Sum of Squares in matrix form: \\( L(\\boldsymbol{\\beta}) = \\|\\mathbf{y} - X\\boldsymbol{\\beta}\\|_2^2 = (\\mathbf{y} - X\\boldsymbol{\\beta})^T(\\mathbf{y} - X\\boldsymbol{\\beta}) \\).',
        'Expand the quadratic form: \\( L(\\boldsymbol{\\beta}) = \\mathbf{y}^T\\mathbf{y} - 2\\boldsymbol{\\beta}^T X^T \\mathbf{y} + \\boldsymbol{\\beta}^T X^T X \\boldsymbol{\\beta} \\).',
        'Set the gradient with respect to \\( \\boldsymbol{\\beta} \\) to zero: \\( \\nabla_{\\boldsymbol{\\beta}} L = -2X^T\\mathbf{y} + 2X^T X\\hat{\\boldsymbol{\\beta}} = \\mathbf{0} \\).',
        'Left-multiply by \\( (X^T X)^{-1} \\) to isolate \\( \\hat{\\boldsymbol{\\beta}} = (X^T X)^{-1} X^T \\mathbf{y} \\).'
      ],
      items_ar: [
        'اكتب مجموع مربعات البواقي بصيغة المصفوفات: \\( L(\\boldsymbol{\\beta}) = (\\mathbf{y} - X\\boldsymbol{\\beta})^T(\\mathbf{y} - X\\boldsymbol{\\beta}) \\).',
        'فك الصيغة التربيعية: \\( L(\\boldsymbol{\\beta}) = \\mathbf{y}^T\\mathbf{y} - 2\\boldsymbol{\\beta}^T X^T \\mathbf{y} + \\boldsymbol{\\beta}^T X^T X \\boldsymbol{\\beta} \\).',
        'ساوِ التدرج بالنسبة إلى \\( \\boldsymbol{\\beta} \\) بالصفر: \\( -2X^T\\mathbf{y} + 2X^T X\\hat{\\boldsymbol{\\beta}} = \\mathbf{0} \\).',
        'اضرب من اليسار في المعكوس \\( (X^T X)^{-1} \\) لعزل \\( \\hat{\\boldsymbol{\\beta}} = (X^T X)^{-1} X^T \\mathbf{y} \\).'
      ],
      ex: 'Setting the gradient of the squared L2 residual norm to zero yields the Normal Equations.',
      ex_ar: 'مساواة تدرج مربع معيار البواقي بالصفر يعطي المعادلات الطبيعية مباشرة.'
    },
    {
      t: 'cat',
      ti: 'Categorize: Regularized Regression Objectives (OLS vs Ridge vs Lasso)',
      ti_ar: 'تصنيف: دوال الهدف في الانحدار المنتظم (OLS vs Ridge vs Lasso)',
      categories: [
        'Standard OLS',
        'Ridge Regression (L2 Penalty)',
        'Lasso Regression (L1 Penalty)'
      ],
      categories_ar: [
        'المربعات الصغرى القياسية (OLS)',
        'انحدار ريدج (عقوبة L2)',
        'انحدار لاسو (عقوبة L1)'
      ],
      items: [
        { s: 'Minimizes \\( \\|\\mathbf{y} - X\\boldsymbol{\\beta}\\|_2^2 \\) with no regularization penalty', s_ar: 'يقلل \\( \\|\\mathbf{y} - X\\boldsymbol{\\beta}\\|_2^2 \\) بدون أي حد عقوبة تنظيمي', cat: 0 },
        { s: 'Adds \\( \\lambda \\|\\boldsymbol{\\beta}\\|_2^2 \\) and gives closed-form \\( (X^T X + \\lambda I)^{-1}X^T\\mathbf{y} \\)', s_ar: 'يضيف \\( \\lambda \\|\\boldsymbol{\\beta}\\|_2^2 \\) ويعطي الحل \\( (X^T X + \\lambda I)^{-1}X^T\\mathbf{y} \\)', cat: 1 },
        { s: 'Adds \\( \\lambda \\|\\boldsymbol{\\beta}\\|_1 \\) to drive irrelevant feature weights to exact zero (sparsity)', s_ar: 'يضيف \\( \\lambda \\|\\boldsymbol{\\beta}\\|_1 \\) لتصفير أوزان الخصائص غير المهمة تماماً', cat: 2 },
        { s: 'Can fail if \\( X^T X \\) is singular due to collinear features', s_ar: 'قد يفشل إذا كانت المصفوفة \\( X^T X \\) منفردة بسبب التعدد الخطي للخصائص', cat: 0 }
      ],
      ex: 'Ridge (L2) shrinks weights smoothly and stabilizes inversion; Lasso (L1) induces exact feature sparsity.',
      ex_ar: 'انحدار ريدج (L2) يقلص الأوزان بسلاسة، بينما انحدار لاسو (L1) يصفر المعاملات غير المهمة.'
    }
  ],
  'ai-logistic-regression': [
    {
      t: 'num',
      ti: 'Numeric Entry: Sigmoid Probability from Log-Odds',
      ti_ar: 'إدخال رقمي: حساب احتمال السيجمويد من اللوجيت',
      q: 'If a logistic regression model produces a linear logit of \\( z = \\mathbf{w}^T\\mathbf{x} + b = 0 \\), what is the predicted probability \\( \\hat{p} = \\sigma(0) \\) expressed as a percentage?',
      q_ar: 'إذا أنتج نموذج الانحدار اللوجستي قيمة خطية \\( z = \\mathbf{w}^T\\mathbf{x} + b = 0 \\)، فما الاحتمال المتوقع \\( \\hat{p} = \\sigma(0) \\) كنسبة مئوية؟',
      a: 50,
      h: 'Substitute \\( z = 0 \\) into \\( \\sigma(z) = \\frac{1}{1 + e^{-z}} \\).',
      h_ar: 'عوّض \\( z = 0 \\) في دالة السيجمويد \\( \\sigma(z) = \\frac{1}{1 + e^{-z}} \\).',
      sol: '\\( \\sigma(0) = \\frac{1}{1 + e^0} = \\frac{1}{1 + 1} = 0.50 = 50\\% \\).',
      sol_ar: '\\( \\sigma(0) = \\frac{1}{1 + 1} = 0.50 = 50\\% \\).'
    },
    {
      t: 'ord',
      ti: 'Order the Steps: Finding the Linear Decision Boundary',
      ti_ar: 'رتّب الخطوات: إيجاد معادلة حد القرار الخطي',
      prompt: 'Arrange the steps to find the decision boundary at threshold \\( \\hat{p} = 0.5 \\) for \\( \\hat{p} = \\sigma(2x_1 - 4x_2 + 6) \\):',
      prompt_ar: 'رتب خطوات إيجاد معادلة حد القرار عند عتبة \\( \\hat{p} = 0.5 \\) للنموذج \\( \\hat{p} = \\sigma(2x_1 - 4x_2 + 6) \\):',
      items: [
        'Set the predicted probability equal to the threshold: \\( \\sigma(z) = \\frac{1}{1 + e^{-z}} = 0.5 \\).',
        'Solve for the logit \\( z \\): \\( 1 + e^{-z} = 2 \\implies e^{-z} = 1 \\implies z = 0 \\).',
        'Substitute the linear predictor into \\( z = 0 \\): \\( 2x_1 - 4x_2 + 6 = 0 \\).',
        'Rearrange into slope-intercept form: \\( x_2 = 0.5x_1 + 1.5 \\).'
      ],
      items_ar: [
        'ساوِ الاحتمال المتوقع بعتبة القرار: \\( \\sigma(z) = 0.5 \\).',
        'أوجد قيمة اللوجيت \\( z \\): \\( e^{-z} = 1 \\implies z = 0 \\).',
        'عوّض بالمقدار الخطي في \\( z = 0 \\): \\( 2x_1 - 4x_2 + 6 = 0 \\).',
        'رتب المعادلة في صيغة الميل والمقطع: \\( x_2 = 0.5x_1 + 1.5 \\).'
      ],
      ex: 'At the 0.5 probability threshold, the decision boundary is the hyperplane wᵀx + b = 0.',
      ex_ar: 'عند عتبة الاحتمال 0.5، يكون حد القرار هو المستوي الفائق الذي يحقق wᵀx + b = 0.'
    },
    {
      t: 'cat',
      ti: 'Categorize: Binary Classification Predictions by Logit Sign',
      ti_ar: 'تصنيف: قرار التصنيف الثنائي حسب إشارة اللوجيت z',
      categories: [
        'Predict Class 1 (p̂ > 0.5)',
        'On Decision Boundary (p̂ = 0.5)',
        'Predict Class 0 (p̂ < 0.5)'
      ],
      categories_ar: [
        'توقع الفئة 1 (p̂ > 0.5)',
        'على حد القرار تماماً (p̂ = 0.5)',
        'توقع الفئة 0 (p̂ < 0.5)'
      ],
      items: [
        { s: 'Logit \\( z = \\mathbf{w}^T\\mathbf{x} + b = +3.2 \\)', s_ar: 'قيمة اللوجيت \\( z = +3.2 \\)', cat: 0 },
        { s: 'Logit \\( z = \\mathbf{w}^T\\mathbf{x} + b = 0 \\)', s_ar: 'قيمة اللوجيت \\( z = 0 \\)', cat: 1 },
        { s: 'Logit \\( z = \\mathbf{w}^T\\mathbf{x} + b = -2.5 \\)', s_ar: 'قيمة اللوجيت \\( z = -2.5 \\)', cat: 2 },
        { s: 'Odds ratio \\( \\frac{\\hat{p}}{1 - \\hat{p}} = e^z > 1 \\)', s_ar: 'نسبة الأرجحية \\( \\frac{\\hat{p}}{1 - \\hat{p}} = e^z > 1 \\)', cat: 0 }
      ],
      ex: 'Positive logit z > 0 means p̂ > 0.5 (Class 1); negative logit z < 0 means p̂ < 0.5 (Class 0).',
      ex_ar: 'اللوجيت الموجب z > 0 يعني p̂ > 0.5 (الفئة 1)، واللوجيت السالب z < 0 يعني p̂ < 0.5 (الفئة 0).'
    }
  ],
  'ai-pca-dimensionality': [
    {
      t: 'tf',
      ti: 'True / False: Covariance Matrices & Principal Component Analysis',
      ti_ar: 'صح / خطأ: مصفوفة التغاير وتحليل المركبات الأساسية (PCA)',
      items: [
        { s: 'Every sample covariance matrix Σ is symmetric and positive semi-definite, so all its eigenvalues are ≥ 0.', a: true },
        { s: 'The sum of all eigenvalues of Σ equals the trace of Σ (the total variance of the dataset).', a: true },
        { s: 'Principal components corresponding to distinct eigenvalues of a symmetric covariance matrix are parallel.', a: false }
      ],
      items_ar: [
        { s: 'كل مصفوفة تغاير Σ هي مصفوفة متماثلة وشبه موجبة التحديد، لذا فإن جميع قيمها الذاتية غير سالبة (λ ≥ 0).', a: true },
        { s: 'مجموع القيم الذاتية لمصفوفة التغاير Σ يساوي أثر المصفوفة tr(Σ) (أي التباين الكلي للبيانات).', a: true },
        { s: 'المركبات الأساسية المناظرة لقيم ذاتية مختلفة في مصفوفة التغاير المتماثلة تكون متوازية.', a: false }
      ]
    },
    {
      t: 'num',
      ti: 'Numeric Entry: Proportion of Variance Explained in PCA',
      ti_ar: 'إدخال رقمي: نسبة التباين المفسر في تحليل PCA',
      q: 'A 3D dataset has covariance eigenvalues \\( \\lambda_1 = 12, \\lambda_2 = 5, \\lambda_3 = 3 \\). What percentage of total variance is captured by the first principal component \\( \\text{PC}_1 \\)?',
      q_ar: 'بيانات ثلاثية الأبعاد قيمها الذاتية لمصفوفة التغاير هي \\( \\lambda_1 = 12, \\lambda_2 = 5, \\lambda_3 = 3 \\). ما النسبة المئوية للتباين الكلي التي تفسرها المركبة الأولى \\( \\text{PC}_1 \\)؟',
      a: 60,
      h: 'Divide \\( \\lambda_1 \\) by the total variance \\( \\lambda_1 + \\lambda_2 + \\lambda_3 = 20 \\).',
      h_ar: 'اقسم \\( \\lambda_1 \\) على مجموع القيم الذاتية \\( 12 + 5 + 3 = 20 \\).',
      sol: '\\( \\frac{12}{12 + 5 + 3} = \\frac{12}{20} = 0.60 = 60\\% \\).',
      sol_ar: '\\( \\frac{12}{20} = 0.60 = 60\\% \\).'
    },
    {
      t: 'ord',
      ti: 'Order the Steps: Executing the PCA Algorithm',
      ti_ar: 'رتّب الخطوات: تنفيذ خوارزمية تحليل المركبات الأساسية (PCA)',
      prompt: 'Arrange the four standard steps to reduce an \\( n \\times d \\) data matrix \\( X \\) to \\( k \\) dimensions via PCA:',
      prompt_ar: 'رتب الخطوات الأربع القياسية لتقليص مصفوفة بيانات \\( X \\) إلى \\( k \\) أبعاد باستخدام PCA:',
      items: [
        'Mean-center each feature column so that \\( \\tilde{X} = X - \\mathbf{1}\\boldsymbol{\\mu}^T \\) has zero mean.',
        'Compute the \\( d \\times d \\) sample covariance matrix \\( \\Sigma = \\frac{1}{n-1}\\tilde{X}^T\\tilde{X} \\).',
        'Compute the eigenvalues and orthonormal eigenvectors of \\( \\Sigma \\) and sort them so \\( \\lambda_1 \\ge \\lambda_2 \\ge \\dots \\ge \\lambda_d \\).',
        'Form the projection matrix \\( W_k = [\\mathbf{v}_1, \\dots, \\mathbf{v}_k] \\) and project \\( Z = \\tilde{X} W_k \\).'
      ],
      items_ar: [
        'مركز البيانات بطرح المتوسط الحسابي لكل عمود بحيث يصبح متوسط \\( \\tilde{X} \\) صفراً.',
        'احسب مصفوفة التغاير للعينة \\( \\Sigma = \\frac{1}{n-1}\\tilde{X}^T\\tilde{X} \\).',
        'أوجد القيم الذاتية والمتجهات الذاتية المتعامدة لمصفوفة التغاير ورتبها تنازلياً \\( \\lambda_1 \\ge \\lambda_2 \\ge \\dots \\).',
        'كوّن مصفوفة الإسقاط من أول \\( k \\) متجهات ذاتية \\( W_k \\) وأسقط البيانات \\( Z = \\tilde{X} W_k \\).'
      ],
      ex: 'Center data → Covariance Σ → Eigendecomposition → Project onto top k eigenvectors.',
      ex_ar: 'مركزة البيانات ← حساب مصفوفة التغاير ← التحليل الطيفي للقيم الذاتية ← الإسقاط على أعلى k متجهات.'
    },
    {
      t: 'cat',
      ti: 'Categorize: Covariance Matrix Entries & Spectral Quantities',
      ti_ar: 'تصنيف: عناصر مصفوفة التغاير والمقادير الطيفية',
      categories: [
        'Diagonal Entries Σ_{ii}',
        'Off-Diagonal Entries Σ_{ij} (i ≠ j)',
        'Eigenpairs (λ_k, v_k)'
      ],
      categories_ar: [
        'عناصر القطر الرئيسي Σ_{ii}',
        'العناصر خارج القطر Σ_{ij}',
        'الأزواج الذاتية (λ_k, v_k)'
      ],
      items: [
        { s: 'Variance \\( \\text{Var}(X_i) \\) of the \\( i \\)-th individual feature', s_ar: 'التباين \\( \\text{Var}(X_i) \\) للخاصية رقم \\( i \\)', cat: 0 },
        { s: 'Linear covariance \\( \\text{Cov}(X_i, X_j) \\) measuring redundancy between features \\( i \\) and \\( j \\)', s_ar: 'التغاير الخطي \\( \\text{Cov}(X_i, X_j) \\) بين الخاصيتين \\( i \\) و \\( j \\)', cat: 1 },
        { s: 'Orthogonal principal axis direction and the variance captured along that axis', s_ar: 'اتجاه المحور الأساسي المتعامد ومقدار التباين المفسر على طوله', cat: 2 },
        { s: 'Equals zero when two centered features are uncorrelated', s_ar: 'تساوي صفراً عندما تكون خاصيتان غير مرتبطتين خطياً', cat: 1 }
      ],
      ex: 'Diagonals hold feature variances; off-diagonals hold pairwise covariances; eigenpairs give principal axes.',
      ex_ar: 'القطر الرئيسي يمثل تباين كل متغير، وخارج القطر يمثل التغاير المشترك، والمتجهات الذاتية تحدد المحاور الأساسية.'
    }
  ]
};

function expandTrack(track, extraMap) {
  const D = loadIx(track);
  let total = 0;
  for (const [chId, extras] of Object.entries(extraMap)) {
    const existing = D[chId] || [];
    const seenTitles = new Set(existing.map(a => a.ti));
    for (const item of extras) {
      if (!seenTitles.has(item.ti)) {
        existing.push(item);
        seenTitles.add(item.ti);
      }
    }
    D[chId] = existing;
    total += existing.length;
  }
  saveIx(track, D);
  console.log(`Expanded ${track}.js to ${total} interactive activities across ${Object.keys(D).length} chapters.`);
}

expandTrack('addmath', ADDMATH_EXTRA);
expandTrack('mathai', MATHAI_EXTRA);
