/* Interactive Practice data for /est2l2/ - one entry per chapter section id.
   Shipped as public/js/ix/est2l2.js and loaded only on that track's page by the
   engine in src/scripts/modules/19-interactive-activities-engine-v1.js
   (Plan 5 Phase 5.015, ADR 0033). Entry shapes (qc/mt/tf/sb/sr/fn/num/ord/cat) are
   documented there. */
(window.__ixData = window.__ixData || []).push(function (D) {

D['est2l2-about'] = [
  {
    t: 'qc',
    ti: 'Math Lab: EST II Level 2 Structure & Timing',
    ti_ar: 'مختبر الرياضيات: هيكل وتوقيت اختبار EST II المستوى 2',
    q: 'The EST II Math Level 2 exam contains 50 questions in 60 minutes. What pacing is required to finish on time with a 5-minute review buffer?',
    q_ar: 'يتكون اختبار EST II Math Level 2 من 50 سؤالاً في 60 دقيقة. ما هي الوتيرة الزمنية المطلوبة لإتمام الحل مع الاحتفاظ بـ 5 دقائق للمراجعة؟',
    o: ['66 seconds per question', '72 seconds per question', '90 seconds per question', '48 seconds per question'],
    o_ar: ['66 ثانية لكل سؤال', '72 ثانية لكل سؤال', '90 ثانية لكل سؤال', '48 ثانية لكل سؤال'],
    a: 0,
    ex: '\\(55\\text{ minutes} \\times 60\\text{ seconds} / 50\\text{ questions} = 66\\text{ seconds/question}\\). Keep an eye on the clock every 10 questions (11 minutes per block).',
    ex_ar: '\\(55\\text{ دقيقة} \\times 60\\text{ ثانية} \\div 50\\text{ سؤالاً} = 66\\text{ ثانية/سؤال}\\). راقب الساعة كل 10 أسئلة (11 دقيقة لكل مجموعة أسئلة).'
  },
  {
    t: 'tf',
    ti: 'Reasoning Lab: EST II Exam Rules & Calculator Usage',
    ti_ar: 'مختبر التفكير المنطقي: قواعد اختبار EST II واستخدام الحاسبة',
    items: [
      { s: 'A scientific calculator is allowed for the full duration of EST II Math.', s_ar: 'يُسمح بالآلة الحاسبة العلمية طوال مدة اختبار EST II للرياضيات بأكملها.', a: true, ex: 'Scientific calculators meeting exam criteria are permitted on all questions.', ex_ar: 'الآلات الحاسبة العلمية التي تطابق معايير الاختبار مسموح بها في كافة الأسئلة.' },
      { s: 'Wrong answers deduct 0.25 points from your raw score.', s_ar: 'تخصم الإجابات الخاطئة 0.25 نقطة من درجتك الخام.', a: false, ex: 'EST II uses raw scoring with no negative guessing penalty.', ex_ar: 'يستخدم EST II الدرجات الخام دون أي خصم درجات على التخمين الخاطئ.' },
      { s: 'EST II Math Level 2 includes differential calculus and combinatorics.', s_ar: 'يتضمن اختبار EST II Math Level 2 التفاضل والتوافيق والتباديل.', a: true, ex: 'Level 2 adds introductory derivatives, tangents, combinatorics, and complex numbers.', ex_ar: 'يضيف المستوى 2 مبادئ المشتقات، ومعادلات المماس، والتوافيق والتباديل، والأعداد المركبة.' }
    ]
  },
  {
    t: 'num',
    ti: 'Pacing Check: Average Seconds Per Problem',
    ti_ar: 'فحص الوتيرة: متوسط الثواني لكل مسألة',
    q: 'On the EST II Math Level 2 exam (50 questions in 60 minutes), how many total seconds are allocated per question on average?',
    q_ar:'في اختبار EST II Math Level 2 (المكون من 50 سؤالاً في 60 دقيقة)، كم ثانية تخصص في المتوسط لكل سؤال؟',
    a: 72,
    tol: 0.01,
    unit: 'seconds',
    h: 'Multiply 60 minutes by 60 seconds, then divide by 50 questions.',
    h_ar: 'اضرب 60 دقيقة في 60 ثانية، ثم اقسم على 50 سؤالاً.',
    sol: '\\(\\dfrac{60 \\times 60}{50} = \\dfrac{3600}{50} = 72\\text{ seconds/question}\\).',
    sol_ar: '\\(\\dfrac{60 \\times 60}{50} = \\dfrac{3600}{50} = 72\\text{ ثانية/سؤال}\\).'
  },
  {
    t: 'ord',
    ti: 'Exam Protocol: Timed Section Strategy',
    ti_ar: 'بروتوكول الاختبار: استراتيجية إدارة وقت القسم',
    q: 'Arrange the steps for managing a 50-question EST II Math section:',
    q_ar: 'رتب خطوات إدارة قسم الرياضيات في اختبار EST II المكون من 50 سؤالاً:',
    items: [
      'Scan the section and solve rapid, recognizable questions first.',
      'Maintain an active pacing checkpoint at 25 questions (30 minutes remaining).',
      'Flag high-algebra problems with potential extraneous roots for second pass.',
      'Return to flagged questions and eliminate distractors.',
      'Verify that all 50 answer bubbles are filled before time expires.'
    ],
    items_ar: [
      'مسح القسم وحل الأسئلة السريعة المألوفة أولاً.',
      'الحفاظ على وتيرة زمنية واضحة عند السؤال 25 (30 دقيقة متبقية).',
      'تأشير مسائل الجبر المتقدم التي قد تتضمن حلولاً دخيلة للجولة الثانية.',
      'العودة للأسئلة المؤشرة واستبعاد الخيارات الخاطئة بتركيز.',
      'التأكد من تظليل جميع الدوائر الخمسين بالكامل قبل انتهاء الوقت.'
    ]
  },
  {
    t: 'cat',
    ti: 'Classify EST II Topics by Domain',
    ti_ar: 'تصنيف موضوعات EST II حسب المجال الرياضي',
    categories: ['Advanced Algebra', 'Calculus & Probability'],
    categories_ar: ['الجبر المتقدم', 'التفاضل والاحتمالات'],
    items: [
      { s: 'Matrix inversion and determinant tests', s_ar: 'معكوس المصفوفات واختبارات المحددات', cat: 0 },
      { s: 'Tangent line slope from the derivative', s_ar: 'ميل خط المماس باستخدام المشتقة الأولى', cat: 1 },
      { s: 'Geometric series infinite sum convergence', s_ar: 'تقارب مجموع المتسلسلة الهندسية اللانهائية', cat: 0 },
      { s: 'Combinations and permutations of sets', s_ar: 'التوافيق والتباديل للمجموعات', cat: 1 },
      { s: 'Complex roots and imaginary conjugates', s_ar: 'الجذور المركبة والمرافقات التخيلية', cat: 0 },
      { s: 'Evaluating limits of indeterminate forms (0/0)', s_ar: 'حساب النهايات للصيغ غير المعينة (0/0)', cat: 1 }
    ]
  }
];

D['est2l2-complex'] = [
  {
    t: 'sb',
    ti: 'Lab Step Builder: Powers of i and Complex Arithmetic',
    ti_ar: 'بناء الخطوات: قوى i وعمليات الأعداد المركبة',
    steps: [
      { l: 'Evaluate \\(i^{27}\\). Divide 27 by 4: remainder is:', l_ar: 'احسب قيمة \\(i^{27}\\). اقسم 27 على 4: الباقي هو:', a: '3', h: '\\(27 = 4 \\times 6 + 3\\)', h_ar: '\\(27 = 4 \\times 6 + 3\\)' },
      { l: 'Therefore \\(i^{27} = i^3 =\\)', l_ar: 'بناء على ذلك \\(i^{27} = i^3 =\\)', a: '-i', h: '\\(i^3 = -i\\)', h_ar: '\\(i^3 = -i\\)' },
      { l: 'Compute the modulus of \\(z = 6 - 8i\\): \\(|z| =\\)', l_ar: 'احسب مقياس \\(z = 6 - 8i\\): \\(|z| =\\)', a: '10', h: '\\(\\sqrt{6^2 + (-8)^2} = \\sqrt{36+64} = 10\\)', h_ar: '\\(\\sqrt{6^2 + (-8)^2} = \\sqrt{36+64} = 10\\)' }
    ]
  },
  {
    t: 'qc',
    ti: 'Lab Check: Complex Conjugates & Division',
    ti_ar: 'فحص سريع: مرافق العدد المركب والقسمة',
    q: 'Simplify \\(\\dfrac{5+i}{2-i}\\) by multiplying numerator and denominator by the conjugate:',
    q_ar: 'بسط المقدار \\(\\dfrac{5+i}{2-i}\\) بضرب البسط والمقام في مرافق المقام:',
    o: ['\\(\\frac{9}{5} + \\frac{7}{5}i\\)', '\\(\\frac{9}{5} - \\frac{7}{5}i\\)', '\\(\\frac{11}{3} + \\frac{7}{3}i\\)', '\\(3 + 2i\\)'],
    o_ar: ['\\(\\frac{9}{5} + \\frac{7}{5}i\\)', '\\(\\frac{9}{5} - \\frac{7}{5}i\\)', '\\(\\frac{11}{3} + \\frac{7}{3}i\\)', '\\(3 + 2i\\)'],
    a: 0,
    ex: '\\(\\dfrac{(5+i)(2+i)}{(2-i)(2+i)} = \\dfrac{10 + 5i + 2i - 1}{4 + 1} = \\dfrac{9 + 7i}{5} = \\dfrac{9}{5} + \\dfrac{7}{5}i\\).',
    ex_ar: '\\(\\dfrac{(5+i)(2+i)}{(2-i)(2+i)} = \\dfrac{10 + 5i + 2i - 1}{4 + 1} = \\dfrac{9 + 7i}{5} = \\dfrac{9}{5} + \\dfrac{7}{5}i\\).'
  },
  {
    t: 'num',
    ti: 'Numeric Lab: Modulus of Complex Conjugate',
    ti_ar: 'إدخال رقمي: مقياس العدد المركب',
    q: 'Compute the modulus \\(|z|\\) of the complex number \\(z = -5 + 12i\\).',
    q_ar: 'احسب مقياس \\(|z|\\) للعدد المركب \\(z = -5 + 12i\\).',
    a: 13,
    tol: 0.01,
    h: '\\(|z| = \\sqrt{a^2 + b^2} = \\sqrt{(-5)^2 + 12^2}\\).',
    h_ar: '\\(|z| = \\sqrt{a^2 + b^2} = \\sqrt{(-5)^2 + 12^2}\\).',
    sol: '\\(|z| = \\sqrt{25 + 144} = \\sqrt{169} = 13\\).',
    sol_ar: '\\(|z| = \\sqrt{25 + 144} = \\sqrt{169} = 13\\).'
  },
  {
    t: 'ord',
    ti: 'Quadratic Formula: Solving Negative Discriminants',
    ti_ar: 'رتّب الخطوات: حل المعادلات ذات المميز السالب بالأعداد المركبة',
    q: 'Arrange the steps to solve \\(x^2 - 6x + 25 = 0\\) for complex roots:',
    q_ar: 'رتب خطوات حل المعادلة \\(x^2 - 6x + 25 = 0\\) لإيجاد الجذور المركبة:',
    items: [
      'Identify coefficients: \\(a = 1, b = -6, c = 25\\).',
      'Compute discriminant: \\(\\Delta = (-6)^2 - 4(1)(25) = 36 - 100 = -64\\).',
      'Rewrite square root using imaginary unit: \\(\\sqrt{-64} = 8i\\).',
      'Apply quadratic formula: \\(x = \\frac{6 \\pm 8i}{2}\\).',
      'Simplify to standard form: \\(x = 3 \\pm 4i\\).'
    ],
    items_ar: [
      'تحديد المعاملات: \\(a = 1, b = -6, c = 25\\).',
      'حساب المميز: \\(\\Delta = (-6)^2 - 4(1)(25) = 36 - 100 = -64\\).',
      'إعادة كتابة الجذر التربيعي باستخدام الوحدة التخيلية: \\(\\sqrt{-64} = 8i\\).',
      'تطبيق القانون العام: \\(x = \\frac{6 \\pm 8i}{2}\\).',
      'التبسيط إلى الصورة القياسية: \\(x = 3 \\pm 4i\\).'
    ]
  },
  {
    t: 'cat',
    ti: 'Evaluate Powers of i',
    ti_ar: 'تصنيف: حساب قيم قوى i',
    categories: ['Value is 1', 'Value is -1', 'Value is i', 'Value is -i'],
    categories_ar: ['القيمة هي 1', 'القيمة هي -1', 'القيمة هي i', 'القيمة هي -i'],
    items: [
      { s: '\\(i^{16}\\)', s_ar: '\\(i^{16}\\)', cat: 0 },
      { s: '\\(i^{18}\\)', s_ar: '\\(i^{18}\\)', cat: 1 },
      { s: '\\(i^{21}\\)', s_ar: '\\(i^{21}\\)', cat: 2 },
      { s: '\\(i^{35}\\)', s_ar: '\\(i^{35}\\)', cat: 3 },
      { s: '\\(i^{100}\\)', s_ar: '\\(i^{100}\\)', cat: 0 },
      { s: '\\(i^{50}\\)', s_ar: '\\(i^{50}\\)', cat: 1 }
    ]
  }
];

D['est2l2-sequences-series'] = [
  {
    t: 'fn',
    ti: 'Lab Explorer: Arithmetic Progression Generator \\(a_n = a_1 + (n-1)d\\)',
    ti_ar: 'مستكشف: مولد المتتابعة الحسابية \\(a_n = a_1 + (n-1)d\\)',
    fns: [{ expr: 'a + (x-1)*d', color: '#16a34a', label: 'a + (x-1)d' }],
    xrange: [1, 10],
    yrange: [-10, 40],
    params: [
      { name: 'a', label: 'First term a₁', min: -5, max: 15, step: 1, default: 3 },
      { name: 'd', label: 'Common difference d', min: -4, max: 6, step: 0.5, default: 3.5 }
    ]
  },
  {
    t: 'mt',
    ti: 'Matching Lab: Sequence & Series Formulas',
    ti_ar: 'مطابقة: قوانين المتتابعات والمتسلسلات',
    p: [
      { l: 'Arithmetic nth term aₙ', l_ar: 'الحد النوني الحسابي aₙ', r: 'a₁ + (n−1)d', r_ar: 'a₁ + (n−1)d' },
      { l: 'Arithmetic sum Sₙ', l_ar: 'مجموع المتتابعة الحسابية Sₙ', r: 'n/2 · (a₁ + aₙ)', r_ar: 'n/2 · (a₁ + aₙ)' },
      { l: 'Geometric nth term aₙ', l_ar: 'الحد النوني الهندسي aₙ', r: 'a₁ · rⁿ⁻¹', r_ar: 'a₁ · rⁿ⁻¹' },
      { l: 'Infinite geometric sum', l_ar: 'المجموع اللانهائي الهندسي', r: 'a₁ / (1 − r), |r| < 1', r_ar: 'a₁ / (1 − r), |r| < 1' }
    ]
  },
  {
    t: 'num',
    ti: 'Numeric Lab: Infinite Geometric Sum',
    ti_ar: 'إدخال رقمي: مجموع متسلسلة هندسية لانهائية',
    q: 'Find the exact sum of the infinite series \\(40 - 20 + 10 - 5 + \\cdots\\)',
    q_ar: 'أوجد المجموع الدقيق للمتسلسلة الهندسية اللانهائية \\(40 - 20 + 10 - 5 + \\cdots\\)',
    a: '80/3',
    tol: 0.01,
    h: 'Identify \\(a_1 = 40\\) and \\(r = -20/40 = -1/2\\). Use \\(S_\\infty = \\dfrac{a_1}{1 - r}\\).',
    h_ar: 'حدد \\(a_1 = 40\\) و \\(r = -20/40 = -1/2\\). استخدم \\(S_\\infty = \\dfrac{a_1}{1 - r}\\).',
    sol: '\\(S_\\infty = \\dfrac{40}{1 - (-1/2)} = \\dfrac{40}{3/2} = 40 \\times \\dfrac{2}{3} = \\dfrac{80}{3} \\approx 26.67\\).',
    sol_ar: '\\(S_\\infty = \\dfrac{40}{1 - (-1/2)} = \\dfrac{40}{3/2} = 40 \\times \\dfrac{2}{3} = \\dfrac{80}{3} \\approx 26.67\\).'
  },
  {
    t: 'ord',
    ti: 'Geometric Sequence: Finding Specific Terms',
    ti_ar: 'رتّب الخطوات: إيجاد حدود معينة في متتابعة هندسية',
    q: 'Arrange the steps to find the 6th term of a geometric sequence with \\(a_2 = 6\\) and \\(a_4 = 24\\) (\\(r > 0\\)):',
    q_ar: 'رتب خطوات إيجاد الحد السادس لمتتابعة هندسية فيها \\(a_2 = 6\\) و \\(a_4 = 24\\) (حيث \\(r > 0\\)):',
    items: [
      'Express terms algebraically: \\(a_2 = a_1 r = 6\\) and \\(a_4 = a_1 r^3 = 24\\).',
      'Divide \\(a_4\\) by \\(a_2\\): \\(\\frac{a_1 r^3}{a_1 r} = r^2 = \\frac{24}{6} = 4\\).',
      'Determine common ratio: \\(r = 2\\) (since \\(r > 0\\)).',
      'Find first term: \\(a_1 = \\frac{6}{2} = 3\\).',
      'Compute 6th term: \\(a_6 = a_1 r^5 = 3(2^5) = 3(32) = 96\\).'
    ],
    items_ar: [
      'كتابة الحدود جبرياً: \\(a_2 = a_1 r = 6\\) و \\(a_4 = a_1 r^3 = 24\\).',
      'قسمة \\(a_4\\) على \\(a_2\\): \\(\\frac{a_1 r^3}{a_1 r} = r^2 = \\frac{24}{6} = 4\\).',
      'تحديد الأساس المشترك: \\(r = 2\\) (لأن \\(r > 0\\)).',
      'إيجاد الحد الأول: \\(a_1 = \\frac{6}{2} = 3\\).',
      'حساب الحد السادس: \\(a_6 = a_1 r^5 = 3(2^5) = 3(32) = 96\\).'
    ]
  },
  {
    t: 'cat',
    ti: 'Sequence Type Classification',
    ti_ar: 'تصنيف: أنواع المتتابعات',
    categories: ['Arithmetic Sequence', 'Geometric Sequence', 'Neither'],
    categories_ar: ['متتابعة حسابية', 'متتابعة هندسية', 'ليست حسابية ولا هندسية'],
    items: [
      { s: '\\(7, 11, 15, 19, \\dots\\)', s_ar: '\\(7, 11, 15, 19, \\dots\\)', cat: 0 },
      { s: '\\(3, 6, 12, 24, \\dots\\)', s_ar: '\\(3, 6, 12, 24, \\dots\\)', cat: 1 },
      { s: '\\(1, 4, 9, 16, \\dots\\)', s_ar: '\\(1, 4, 9, 16, \\dots\\)', cat: 2 },
      { s: '\\(50, 45, 40, 35, \\dots\\)', s_ar: '\\(50, 45, 40, 35, \\dots\\)', cat: 0 },
      { s: '\\(81, 27, 9, 3, \\dots\\)', s_ar: '\\(81, 27, 9, 3, \\dots\\)', cat: 1 },
      { s: '\\(2, 3, 5, 8, \\dots\\)', s_ar: '\\(2, 3, 5, 8, \\dots\\)', cat: 2 }
    ]
  }
];

D['est2l2-functions-graphs'] = [
  {
    t: 'fn',
    ti: 'Lab Explorer: Function Transformations \\(y = A f(x-h) + k\\)',
    ti_ar: 'مستكشف: تحويلات الدوال \\(y = A f(x-h) + k\\)',
    fns: [{ expr: 'A*abs(x-h)+k', color: '#ea580c', label: 'A|x-h|+k' }],
    xrange: [-8, 8],
    yrange: [-6, 8],
    params: [
      { name: 'A', label: 'Vertical stretch/flip A', min: -3, max: 3, step: 0.5, default: 1.5 },
      { name: 'h', label: 'Horizontal translation h', min: -5, max: 5, step: 1, default: 2 },
      { name: 'k', label: 'Vertical translation k', min: -4, max: 4, step: 1, default: -1 }
    ]
  },
  {
    t: 'tf',
    ti: 'Reasoning Lab: Inverses & Domain Restrictions',
    ti_ar: 'مختبر التفكير المنطقي: الدوال العكسية وقيود المجال',
    items: [
      { s: 'A function possesses an inverse function if and only if it is strictly one-to-one.', s_ar: 'تمتلك الدالة دالة عكسية إذا وفقط إذا كانت متباينة (واحد لواحد).', a: true, ex: 'It must pass the horizontal line test so that each output corresponds to exactly one input.', ex_ar: 'يجب أن تجتاز اختبار الخط الأفقي بحيث يرتبط كل مخرج بمدخل واحد فقط.' },
      { s: 'The graph of \\(f^{-1}(x)\\) is the reflection of \\(f(x)\\) across the line \\(y = -x\\).', s_ar: 'منحنى الدالة العكسية \\(f^{-1}(x)\\) هو انعكاس لمنحنى \\(f(x)\\) حول المستقيم \\(y = -x\\).', a: false, ex: 'The reflection is across the diagonal line \\(y = x\\).', ex_ar: 'الانعكاس يكون حول المستقيم القطري \\(y = x\\).' },
      { s: 'The domain of \\(f(x) = \\sqrt{9 - x^2}\\) is \\([-3, 3]\\).', s_ar: 'مجال الدالة \\(f(x) = \\sqrt{9 - x^2}\\) هو الفترة \\([-3, 3]\\).', a: true, ex: '\\(9 - x^2 \\geq 0 \\iff x^2 \\leq 9 \\iff -3 \\leq x \\leq 3\\).', ex_ar: '\\(9 - x^2 \\geq 0 \\iff x^2 \\leq 9 \\iff -3 \\leq x \\leq 3\\).' }
    ]
  },
  {
    t: 'num',
    ti: 'Numeric Lab: Evaluating Inverses',
    ti_ar: 'إدخال رقمي: إيجاد قيمة الدالة العكسية',
    q: 'If \\(f(x) = 3x - 7\\), what is the value of \\(f^{-1}(11)\\)?',
    q_ar: 'إذا كانت \\(f(x) = 3x - 7\\)، فما هي قيمة \\(f^{-1}(11)\\)؟',
    a: 6,
    tol: 0.01,
    h: 'Set \\(f(x) = 11\\) and solve for \\(x\\): \\(3x - 7 = 11\\).',
    h_ar: 'ساوِ \\(f(x) = 11\\) وحل بالنسبة لـ \\(x\\): \\(3x - 7 = 11\\).',
    sol: '\\(3x - 7 = 11 \\implies 3x = 18 \\implies x = 6\\). So \\(f^{-1}(11) = 6\\).',
    sol_ar: '\\(3x - 7 = 11 \\implies 3x = 18 \\implies x = 6\\). إذن \\(f^{-1}(11) = 6\\).'
  },
  {
    t: 'ord',
    ti: 'Function Transformation Workflow',
    ti_ar: 'رتّب الخطوات: مسار التحويلات الهندسية للدالة',
    q: 'Arrange the sequence of transformations from \\(y = x^2\\) to \\(y = -2(x + 3)^2 + 5\\):',
    q_ar: 'رتب تسلسل التحويلات الهندسية من الدالة الأم \\(y = x^2\\) إلى \\(y = -2(x + 3)^2 + 5\\):',
    items: [
      'Start with parent function \\(y = x^2\\).',
      'Shift horizontally left by 3 units: \\(y = (x + 3)^2\\).',
      'Stretch vertically by factor of 2: \\(y = 2(x + 3)^2\\).',
      'Reflect across the x-axis: \\(y = -2(x + 3)^2\\).',
      'Shift vertically upward by 5 units: \\(y = -2(x + 3)^2 + 5\\).'
    ],
    items_ar: [
      'البدء بالدالة الأم (الرئيسة) \\(y = x^2\\).',
      'إزاحة أفقية إلى اليسار بمقدار 3 وحدات: \\(y = (x + 3)^2\\).',
      'تمدد رأسي بمعامل 2: \\(y = 2(x + 3)^2\\).',
      'انعكاس حول المحور x: \\(y = -2(x + 3)^2\\).',
      'إزاحة رأسية إلى الأعلى بمقدار 5 وحدات: \\(y = -2(x + 3)^2 + 5\\).'
    ]
  },
  {
    t: 'cat',
    ti: 'Function Symmetry: Even, Odd, or Neither',
    ti_ar: 'تصنيف تماثل الدوال: زوجية، فردية، أو ليست أياً منهما',
    categories: ['Even (y-axis symmetry)', 'Odd (origin symmetry)', 'Neither'],
    categories_ar: ['زوجية (تماثل حول محور y)', 'فردية (تماثل حول نقطة الأصل)', 'ليست زوجية ولا فردية'],
    items: [
      { s: '\\(f(x) = x^4 - 2x^2 + 1\\)', s_ar: '\\(f(x) = x^4 - 2x^2 + 1\\)', cat: 0 },
      { s: '\\(f(x) = 5x^3 - x\\)', s_ar: '\\(f(x) = 5x^3 - x\\)', cat: 1 },
      { s: '\\(f(x) = x^2 + 3x\\)', s_ar: '\\(f(x) = x^2 + 3x\\)', cat: 2 },
      { s: '\\(f(x) = \\cos(2x)\\)', s_ar: '\\(f(x) = \\cos(2x)\\)', cat: 0 },
      { s: '\\(f(x) = \\sin(3x)\\)', s_ar: '\\(f(x) = \\sin(3x)\\)', cat: 1 },
      { s: '\\(f(x) = e^x\\)', s_ar: '\\(f(x) = e^x\\)', cat: 2 }
    ]
  }
];

D['est2l2-matrices-vectors'] = [
  {
    t: 'sb',
    ti: 'Lab Step Builder: Matrix Multiplication (2×2)',
    ti_ar: 'بناء الخطوات: ضرب المصفوفات (2×2)',
    steps: [
      { l: 'Multiply \\(\\begin{pmatrix}2 & 1 \\\\ 0 & 3\\end{pmatrix}\\begin{pmatrix}1 & 4 \\\\ 5 & 2\\end{pmatrix}\\). Top-left entry: \\(2(1) + 1(5) =\\)', l_ar: 'اضرب المصفوفات. العنصر أعلى اليسار: \\(2(1) + 1(5) =\\)', a: '7', h: '\\(2 + 5 = 7\\)', h_ar: '\\(2 + 5 = 7\\)' },
      { l: 'Top-right entry: \\(2(4) + 1(2) =\\)', l_ar: 'العنصر أعلى اليمين: \\(2(4) + 1(2) =\\)', a: '10', h: '\\(8 + 2 = 10\\)', h_ar: '\\(8 + 2 = 10\\)' },
      { l: 'Bottom-left entry: \\(0(1) + 3(5) =\\)', l_ar: 'العنصر أسفل اليسار: \\(0(1) + 3(5) =\\)', a: '15', h: '\\(0 + 15 = 15\\)', h_ar: '\\(0 + 15 = 15\\)' },
      { l: 'Bottom-right entry: \\(0(4) + 3(2) =\\)', l_ar: 'العنصر أسفل اليمين: \\(0(4) + 3(2) =\\)', a: '6', h: '\\(0 + 6 = 6\\)', h_ar: '\\(0 + 6 = 6\\)' }
    ]
  },
  {
    t: 'qc',
    ti: 'Lab Check: Angle Between Vectors',
    ti_ar: 'فحص سريع: الزاوية بين متجهين',
    q: 'Find the angle \\(\\theta\\) between vectors \\(\\mathbf{a} = \\langle 1, 0 \\rangle\\) and \\(\\mathbf{b} = \\langle 1, 1 \\rangle\\):',
    q_ar: 'أوجد الزاوية \\(\\theta\\) بين المتجهين \\(\\mathbf{a} = \\langle 1, 0 \\rangle\\) و \\(\\mathbf{b} = \\langle 1, 1 \\rangle\\):',
    o: ['45°', '30°', '60°', '90°'],
    o_ar: ['45°', '30°', '60°', '90°'],
    a: 0,
    ex: '\\(\\cos\\theta = \\dfrac{\\mathbf{a}\\cdot\\mathbf{b}}{|\\mathbf{a}||\\mathbf{b}|} = \\dfrac{1(1)+0(1)}{1\\cdot\\sqrt{2}} = \\dfrac{1}{\\sqrt{2}} \\Rightarrow \\theta = 45°\\).',
    ex_ar: '\\(\\cos\\theta = \\dfrac{\\mathbf{a}\\cdot\\mathbf{b}}{|\\mathbf{a}||\\mathbf{b}|} = \\dfrac{1(1)+0(1)}{1\\cdot\\sqrt{2}} = \\dfrac{1}{\\sqrt{2}} \\Rightarrow \\theta = 45°\\).'
  },
  {
    t: 'num',
    ti: 'Numeric Lab: Determinant of 2×2 Matrix',
    ti_ar: 'إدخال رقمي: محدد مصفوفة 2×2',
    q: 'Compute the determinant of \\(A = \\begin{pmatrix}7 & -3\\\\ 4 & 5\\end{pmatrix}\\).',
    q_ar: 'احسب محدد المصفوفة \\(A = \\begin{pmatrix}7 & -3\\\\ 4 & 5\\end{pmatrix}\\).',
    a: 47,
    tol: 0.01,
    h: '\\(\\det(A) = ad - bc = (7)(5) - (-3)(4)\\).',
    h_ar: '\\(\\det(A) = ad - bc = (7)(5) - (-3)(4)\\).',
    sol: '\\(\\det(A) = 35 - (-12) = 35 + 12 = 47\\).',
    sol_ar: '\\(\\det(A) = 35 - (-12) = 35 + 12 = 47\\).'
  },
  {
    t: 'ord',
    ti: 'Matrix Equation: Solving \\(A\\mathbf{x} = \\mathbf{b}\\)',
    ti_ar: 'رتّب الخطوات: حل المعادلة المصفوفية \\(A\\mathbf{x} = \\mathbf{b}\\)',
    q: 'Arrange the steps to solve a \\(2\\times 2\\) matrix system \\(A\\mathbf{x} = \\mathbf{b}\\):',
    q_ar: 'رتب خطوات حل النظام المصفوفي \\(2\\times 2\\) \\(A\\mathbf{x} = \\mathbf{b}\\):',
    items: [
      'Compute determinant \\(\\det(A) = ad - bc\\).',
      'Confirm invertibility: verify \\(\\det(A) \\neq 0\\).',
      'Construct inverse matrix \\(A^{-1} = \\frac{1}{\\det A}\\begin{pmatrix}d & -b \\\\ -c & a\\end{pmatrix}\\).',
      'Multiply \\(A^{-1}\\) by vector \\(\\mathbf{b}\\).',
      'State the unique solution vector \\(\\mathbf{x} = \\langle x, y \\rangle\\).'
    ],
    items_ar: [
      'حساب المحدد \\(\\det(A) = ad - bc\\).',
      'التأكد من قابلية العكس: التحقق من أن \\(\\det(A) \\neq 0\\).',
      'تكوين مصفوفة النظير الضربي \\(A^{-1} = \\frac{1}{\\det A}\\begin{pmatrix}d & -b \\\\ -c & a\\end{pmatrix}\\).',
      'ضرب \\(A^{-1}\\) في متجه الثوابت \\(\\mathbf{b}\\).',
      'تحديد متجه الحل الفريد \\(\\mathbf{x} = \\langle x, y \\rangle\\).'
    ]
  },
  {
    t: 'cat',
    ti: 'Vector Relationships',
    ti_ar: 'تصنيف: العلاقات بين المتجهات',
    categories: ['Perpendicular (u·v = 0)', 'Parallel (u = k·v)', 'Neither'],
    categories_ar: ['متعامدان (u·v = 0)', 'متوازيان (u = k·v)', 'غير ذلك'],
    items: [
      { s: '\\(\\mathbf{u} = \\langle 2, 5 \\rangle, \\mathbf{v} = \\langle -5, 2 \\rangle\\)', s_ar: '\\(\\mathbf{u} = \\langle 2, 5 \\rangle, \\mathbf{v} = \\langle -5, 2 \\rangle\\)', cat: 0 },
      { s: '\\(\\mathbf{u} = \\langle 3, -6 \\rangle, \\mathbf{v} = \\langle -1, 2 \\rangle\\)', s_ar: '\\(\\mathbf{u} = \\langle 3, -6 \\rangle, \\mathbf{v} = \\langle -1, 2 \\rangle\\)', cat: 1 },
      { s: '\\(\\mathbf{u} = \\langle 4, 1 \\rangle, \\mathbf{v} = \\langle 1, 4 \\rangle\\)', s_ar: '\\(\\mathbf{u} = \\langle 4, 1 \\rangle, \\mathbf{v} = \\langle 1, 4 \\rangle\\)', cat: 2 },
      { s: '\\(\\mathbf{u} = \\langle 0, 7 \\rangle, \\mathbf{v} = \\langle 4, 0 \\rangle\\)', s_ar: '\\(\\mathbf{u} = \\langle 0, 7 \\rangle, \\mathbf{v} = \\langle 4, 0 \\rangle\\)', cat: 0 },
      { s: '\\(\\mathbf{u} = \\langle 2, 3 \\rangle, \\mathbf{v} = \\langle 6, 9 \\rangle\\)', s_ar: '\\(\\mathbf{u} = \\langle 2, 3 \\rangle, \\mathbf{v} = \\langle 6, 9 \\rangle\\)', cat: 1 },
      { s: '\\(\\mathbf{u} = \\langle 1, 2 \\rangle, \\mathbf{v} = \\langle 2, 3 \\rangle\\)', s_ar: '\\(\\mathbf{u} = \\langle 1, 2 \\rangle, \\mathbf{v} = \\langle 2, 3 \\rangle\\)', cat: 2 }
    ]
  }
];

D['est2l2-intro-calculus'] = [
  {
    t: 'fn',
    ti: 'Lab Explorer: Derivative & Tangent Line Secant Slope',
    ti_ar: 'مستكشف: المشتقة وميل خط المماس',
    fns: [
      { expr: 'x^2 - 2*x', color: '#2563eb', label: 'f(x) = x² - 2x' },
      { expr: '(2*a - 2)*(x - a) + (a^2 - 2*a)', color: '#dc2626', label: 'Tangent at x=a' }
    ],
    xrange: [-2, 5],
    yrange: [-4, 8],
    params: [
      { name: 'a', label: 'Point of tangency a', min: -1, max: 4, step: 0.5, default: 2 }
    ]
  },
  {
    t: 'sb',
    ti: 'Lab Step Builder: Power Rule & Tangent Equation',
    ti_ar: 'بناء الخطوات: قاعدة القوة ومعادلة المماس',
    steps: [
      { l: 'Differentiate \\(f(x) = 3x^2 - 5x + 4\\): \\(f\'(x) = 6x -\\)', l_ar: 'اشتق \\(f(x) = 3x^2 - 5x + 4\\): \\(f\'(x) = 6x -\\)', a: '5', h: 'Power rule: d/dx(3x²) = 6x, d/dx(-5x) = -5', h_ar: 'قاعدة القوة: d/dx(3x²) = 6x, d/dx(-5x) = -5' },
      { l: 'Evaluate slope of tangent line at \\(x = 2\\): \\(f\'(2) = 6(2) - 5 =\\)', l_ar: 'احسب ميل خط المماس عند \\(x = 2\\): \\(f\'(2) = 6(2) - 5 =\\)', a: '7', h: '\\(12 - 5 = 7\\)', h_ar: '\\(12 - 5 = 7\\)' }
    ]
  },
  {
    t: 'num',
    ti: 'Numeric Lab: Evaluating Tangent Slope',
    ti_ar: 'إدخال رقمي: حساب ميل المماس',
    q: 'Given \\(f(x) = 4x^2 - 6x + 2\\), what is the slope of the tangent line at \\(x = 3\\)?',
    q_ar: 'لتكن \\(f(x) = 4x^2 - 6x + 2\\)، ما هو ميل خط المماس للمنحنى عند \\(x = 3\\)؟',
    a: 18,
    tol: 0.01,
    h: 'Compute \\(f\'(x) = 8x - 6\\), then substitute \\(x = 3\\).',
    h_ar: 'احسب \\(f\'(x) = 8x - 6\\)، ثم عوض بـ \\(x = 3\\).',
    sol: '\\(f\'(x) = 8x - 6\\). At \\(x = 3\\), \\(f\'(3) = 8(3) - 6 = 24 - 6 = 18\\).',
    sol_ar: '\\(f\'(x) = 8x - 6\\). وعند \\(x = 3\\): \\(f\'(3) = 8(3) - 6 = 24 - 6 = 18\\).'
  },
  {
    t: 'ord',
    ti: 'Indeterminate Limit: Rational Expression',
    ti_ar: 'رتّب الخطوات: حساب نهاية نسبية غير معينة',
    q: 'Arrange the steps to evaluate \\(\\lim_{x\\to 5}\\dfrac{x^2 - 25}{x - 5}\\):',
    q_ar: 'رتب خطوات حساب النهاية \\(\\lim_{x\\to 5}\\dfrac{x^2 - 25}{x - 5}\\):',
    items: [
      'Substitute \\(x = 5\\) to identify the indeterminate form \\(\\frac{0}{0}\\).',
      'Factor difference of squares in numerator: \\((x - 5)(x + 5)\\).',
      'Cancel common factor \\((x - 5)\\) for \\(x \\neq 5\\).',
      'Obtain reduced expression: \\(x + 5\\).',
      'Substitute \\(x = 5\\): \\(5 + 5 = 10\\).'
    ],
    items_ar: [
      'التعويض بـ \\(x = 5\\) لتحديد الصيغة غير المعينة \\(\\frac{0}{0}\\).',
      'تحليل الفرق بين مربعين في البسط: \\((x - 5)(x + 5)\\).',
      'اختصار العامل المشترك \\((x - 5)\\) حيث \\(x \\neq 5\\).',
      'الحصول على المقدار المبسط: \\(x + 5\\).',
      'التعويض بـ \\(x = 5\\): \\(5 + 5 = 10\\).'
    ]
  },
  {
    t: 'cat',
    ti: 'Derivative Operations: Find f\'(x)',
    ti_ar: 'تصنيف المشتقات: طبيعة الدالة المشتقة f\'(x)',
    categories: ['Constant Derivative', 'Linear Derivative', 'Quadratic Derivative'],
    categories_ar: ['مشتقة ثابتة', 'مشتقة خطية', 'مشتقة تربيعية'],
    items: [
      { s: '\\(f(x) = 5x - 8\\)', s_ar: '\\(f(x) = 5x - 8\\)', cat: 0 },
      { s: '\\(f(x) = 3x^2 + 4x\\)', s_ar: '\\(f(x) = 3x^2 + 4x\\)', cat: 1 },
      { s: '\\(f(x) = x^3 - 6x\\)', s_ar: '\\(f(x) = x^3 - 6x\\)', cat: 2 },
      { s: '\\(f(x) = -12x + 100\\)', s_ar: '\\(f(x) = -12x + 100\\)', cat: 0 },
      { s: '\\(f(x) = -x^2 + 9\\)', s_ar: '\\(f(x) = -x^2 + 9\\)', cat: 1 },
      { s: '\\(f(x) = 2x^3 - 5x^2 + 1\\)', s_ar: '\\(f(x) = 2x^3 - 5x^2 + 1\\)', cat: 2 }
    ]
  }
];

D['est2l2-probability'] = [
  {
    t: 'sb',
    ti: 'Lab Step Builder: Permutations & Combinations',
    ti_ar: 'بناء الخطوات: التباديل والتوافيق',
    steps: [
      { l: 'Number of ways to choose a committee of 3 from 7 people \\(\\binom{7}{3} = \\dfrac{7\\times6\\times5}{3\\times2\\times1} =\\)', l_ar: 'عدد طرق اختيار لجنة من 3 أفراد من بين 7 أشخاص \\(\\binom{7}{3} = \\dfrac{7\\times6\\times5}{3\\times2\\times1} =\\)', a: '35', h: '\\(210 / 6 = 35\\)', h_ar: '\\(210 / 6 = 35\\)' },
      { l: 'Number of ways to arrange 4 distinct books on a shelf: \\(4! =\\)', l_ar: 'عدد طرق ترتيب 4 كتب متمايزة على رف: \\(4! =\\)', a: '24', h: '\\(4\\times3\\times2\\times1 = 24\\)', h_ar: '\\(4\\times3\\times2\\times1 = 24\\)' }
    ]
  },
  {
    t: 'qc',
    ti: 'Lab Check: Conditional Probability',
    ti_ar: 'فحص سريع: الاحتمال المشروط',
    q: 'If \\(P(A) = 0.4\\), \\(P(B) = 0.5\\), and \\(P(A \\cap B) = 0.2\\), find \\(P(A \\mid B)\\):',
    q_ar: 'إذا كان \\(P(A) = 0.4\\) و \\(P(B) = 0.5\\) و \\(P(A \\cap B) = 0.2\\)، فأوجد \\(P(A \\mid B)\\):',
    o: ['0.4', '0.5', '0.2', '0.8'],
    o_ar: ['0.4', '0.5', '0.2', '0.8'],
    a: 0,
    ex: '\\(P(A \\mid B) = \\dfrac{P(A \\cap B)}{P(B)} = \\dfrac{0.2}{0.5} = 0.4\\). Since \\(P(A \\mid B) = P(A)\\), events \\(A\\) and \\(B\\) are independent.',
    ex_ar: '\\(P(A \\mid B) = \\dfrac{P(A \\cap B)}{P(B)} = \\dfrac{0.2}{0.5} = 0.4\\). وبما أن \\(P(A \\mid B) = P(A)\\)، فإن الحادثتين \\(A\\) و \\(B\\) مستقلتان.'
  },
  {
    t: 'num',
    ti: 'Numeric Lab: Combination Calculation',
    ti_ar: 'إدخال رقمي: حساب التوافيق',
    q: 'How many distinct 3-person subcommittees can be selected from a board of 8 members?',
    q_ar: 'كم لجنة فرعية متمايزة مكونة من 3 أعضاء يمكن اختيارها من مجلس يضم 8 أعضاء؟',
    a: 56,
    tol: 0.01,
    h: '\\(\\binom{8}{3} = \\dfrac{8 \\times 7 \\times 6}{3 \\times 2 \\times 1}\\).',
    h_ar: '\\(\\binom{8}{3} = \\dfrac{8 \\times 7 \\times 6}{3 \\times 2 \\times 1}\\).',
    sol: '\\(\\binom{8}{3} = \\dfrac{8 \\times 7 \\times 6}{6} = 8 \\times 7 = 56\\).',
    sol_ar: '\\(\\binom{8}{3} = \\dfrac{8 \\times 7 \\times 6}{6} = 8 \\times 7 = 56\\).'
  },
  {
    t: 'ord',
    ti: 'Probability: Addition Rule Sequence',
    ti_ar: 'رتّب الخطوات: قاعدة جمع الاحتمالات',
    q: 'Arrange the steps to find \\(P(A \\cup B)\\) for events \\(A\\) and \\(B\\):',
    q_ar: 'رتب خطوات إيجاد احتمال الاتحاد \\(P(A \\cup B)\\) للحادثتين \\(A\\) و \\(B\\):',
    items: [
      'Determine individual probability \\(P(A)\\).',
      'Determine individual probability \\(P(B)\\).',
      'Identify overlap probability \\(P(A \\cap B)\\).',
      'Apply formula: \\(P(A \\cup B) = P(A) + P(B) - P(A \\cap B)\\).',
      'Simplify the resulting fraction to lowest terms.'
    ],
    items_ar: [
      'تحديد الاحتمال الفردي للحادثة \\(P(A)\\).',
      'تحديد الاحتمال الفردي للحادثة \\(P(B)\\).',
      'تحديد احتمال التقاطع المشترك \\(P(A \\cap B)\\).',
      'تطبيق القانون: \\(P(A \\cup B) = P(A) + P(B) - P(A \\cap B)\\).',
      'تبسيط الكسر الناتج إلى أبسط صورة.'
    ]
  },
  {
    t: 'cat',
    ti: 'Counting Techniques: Permutation vs Combination',
    ti_ar: 'تصنيف: التباديل مقابل التوافيق',
    categories: ['Permutation (Order Matters)', 'Combination (Order Does Not Matter)'],
    categories_ar: ['تباديل (الترتيب مهم)', 'توافيق (الترتيب غير مهم)'],
    items: [
      { s: 'Assigning 1st, 2nd, and 3rd place in a race', s_ar: 'تحديد المراكز الأول والثاني والثالث في سباق', cat: 0 },
      { s: 'Selecting a committee of 4 students', s_ar: 'اختيار لجنة من 4 طلاب', cat: 1 },
      { s: 'Creating a 4-digit PIN code without repetition', s_ar: 'إنشاء رمز سري (PIN) من 4 أرقام دون تكرار', cat: 0 },
      { s: 'Choosing 3 toppings for a pizza', s_ar: 'اختيار 3 إضافات لبيتزا', cat: 1 },
      { s: 'Electing a President, Vice President, and Secretary', s_ar: 'انتخاب رئيس ونائب رئيس وأمين سر', cat: 0 },
      { s: 'Drawing a hand of 5 cards from a deck', s_ar: 'سحب يد من 5 بطاقات من أوراق اللعب', cat: 1 }
    ]
  }
];

});
