/* Interactive Practice data for /ibsl/ - one entry per chapter section id.
   Shipped as public/js/ix/ibsl.js and loaded only on that track's page by the
   engine in src/scripts/modules/19-interactive-activities-engine-v1.js
   (Plan 5 Phase 5.015, ADR 0033). Entry shapes (qc/mt/tf/sb/sr/fn/num/ord/cat) are
   documented there. */
(window.__ixData = window.__ixData || []).push(function (D) {

D['ibsl-overview'] = [
  {
    t: 'qc',
    ti: 'Quick Check: IB Math Analysis & Approaches SL Exams',
    ti_ar: 'فحص سريع: اختبارات رياضيات البكالوريا الدولية AA SL',
    q: 'How are the external written examinations structured for IB AA SL?',
    q_ar: 'كيف يُهيكل التقييم الكتابي الخارجي لمادة IB Math AA SL؟',
    o: [
      'Paper 1 (non-calc, 90 min, 80 marks) and Paper 2 (calc, 90 min, 80 marks)',
      'Paper 1 only (calculator, 3 hr, 100 marks)',
      'Paper 1 (multiple choice, 60 min) and Paper 2 (free response, 120 min)',
      'Paper 1, Paper 2, and Paper 3 (60 min each)'
    ],
    o_ar: [
      'الورقة 1 (بدون حاسبة، 90 دقيقة، 80 درجة) والورقة 2 (بالحاسبة، 90 دقيقة، 80 درجة)',
      'الورقة 1 فقط (بالحاسبة، 3 ساعات، 100 درجة)',
      'الورقة 1 (اختيار من متعدد، 60 دقيقة) والورقة 2 (إجابة حرة، 120 دقيقة)',
      'الورقة 1، والورقة 2، والورقة 3 (60 دقيقة لكل منها)'
    ],
    a: 0,
    ex: 'IB AA SL external assessment consists of Paper 1 (no calculator, 90 minutes, 80 marks) and Paper 2 (graphic display calculator required, 90 minutes, 80 marks), plus the IA exploration (20%).',
    ex_ar: 'يتكون التقييم الخارجي لـ IB AA SL من الورقة 1 (بدون آلة حاسبة، 90 دقيقة، 80 درجة) والورقة 2 (تتطلب آلة حاسبة بيانية، 90 دقيقة، 80 درجة)، بالإضافة إلى مشروع الاستكشاف الفردي IA بنسبة 20%.'
  },
  {
    t: 'tf',
    ti: 'Reasoning Lab: IB Mathematics SL Assessment Rules',
    ti_ar: 'مختبر التفكير المنطقي: قواعد تقييم رياضيات IB SL',
    items: [
      { s: 'A graphic display calculator is permitted on Paper 1 of the IB SL exam.', s_ar: 'يُسمح باستخدام الآلة الحاسبة البيانية في الورقة 1 من اختبار IB SL.', a: false, ex: 'Paper 1 strictly forbids any calculator.', ex_ar: 'الورقة 1 تمنع استخدام أي نوع من الآلات الحاسبة منعاً باتاً.' },
      { s: 'Non-exact numerical answers must be given to 3 significant figures unless specified otherwise.', s_ar: 'يجب كتابة الإجابات العددية غير الدقيقة مقربة إلى 3 أرقام معنوية ما لم يُنص على خلاف ذلك.', a: true, ex: 'The standard IB accuracy rule is 3 s.f.', ex_ar: 'القاعدة القياسية لدقة الإجابات في IB هي 3 أرقام معنوية (3 s.f.).' },
      { s: 'The internal assessment exploration accounts for 20% of the final subject grade.', s_ar: 'يمثل استكشاف التقييم الداخلي (IA) نسبة 20% من الدرجة النهائية للمادة.', a: true, ex: 'The individual IA mathematical exploration contributes 20%.', ex_ar: 'يسهم الاستكشاف الرياضي الفردي (IA) بنسبة 20% في الدرجة النهائية.' }
    ]
  },
  {
    t: 'num',
    ti: 'Scoring Lab: IB SL Final Percentage Score',
    ti_ar: 'مختبر الدرجات: النسبة المئوية النهائية في IB SL',
    q: 'A student earns 64/80 on Paper 1 (40% weight), 72/80 on Paper 2 (40% weight), and 16/20 on the IA (20% weight). What is the student\'s final overall percentage?',
    q_ar: 'حصل طالب على 64/80 في الورقة 1 (وزنها 40%)، و 72/80 في الورقة 2 (وزنها 40%)، و 16/20 في التقييم الداخلي IA (وزنه 20%). ما هي النسبة المئوية الإجمالية النهائية للطالب؟',
    a: 84,
    tol: 0.1,
    unit: '%',
    h: 'Calculate individual component percentages: 64/80 = 80%, 72/80 = 90%, 16/20 = 80%, then apply weights 0.40, 0.40, 0.20.',
    h_ar: 'احسب نسبة كل مكوّن: 64/80 = 80%، 72/80 = 90%، 16/20 = 80%، ثم طبق الأوزان 0.40 و 0.40 و 0.20.',
    sol: '\\(0.40(80) + 0.40(90) + 0.20(80) = 32 + 36 + 16 = 84\\%\\).',
    sol_ar: '\\(0.40(80) + 0.40(90) + 0.20(80) = 32 + 36 + 16 = 84\\%\\).'
  },
  {
    t: 'ord',
    ti: 'Strategy Protocol: Exam Day Strategy for Paper 1',
    ti_ar: 'بروتوكول الاستراتيجية: خطة يوم الامتحان للورقة 1',
    q: 'Order the strategic steps for completing an 80-mark, 90-minute Paper 1 exam:',
    q_ar: 'رتب الخطوات الاستراتيجية لإنجاز اختبار الورقة 1 (80 درجة في 90 دقيقة):',
    items: [
      'Use the 5-minute reading time to preview Section A short questions and identify familiar topics.',
      'Tackle Section A questions in order, writing exact expressions with simplified surds and fractions.',
      'Reach Section B extended-response questions by the 45-minute mark.',
      'Follow "Hence" directives strictly in multi-part questions to reuse earlier results.',
      'Spend the final 5 minutes checking for missed units, 3 s.f. compliance, and sign errors.'
    ],
    items_ar: [
      'استغلال فترة القراءة (5 دقائق) لمعاينة أسئلة القسم A القصيرة وتحديد المسائل المألوفة.',
      'حل أسئلة القسم A بترتيبها، مع كتابة القيم الدقيقة بالجذور والكسور المبسطة.',
      'الانتقال إلى أسئلة القسم B المقالية المطولة عند الدقيقة 45 من زمن الامتحان.',
      'الالتزام الصارم بكلمة "Hence" (ومن ثم) في الأسئلة متعددة الأجزاء لإعادة استخدام النتائج السابقة.',
      'تخصيص آخر 5 دقائق للتدقيق في الوحدات والتقريب لـ 3 أرقام معنوية وإشارات الأعداد.'
    ]
  },
  {
    t: 'cat',
    ti: 'Classify Syllabus Topics by Course Stream',
    ti_ar: 'تصنيف موضوعات المنهج حسب مسار المادة',
    categories: ['Analysis & Approaches SL (AA)', 'Applications & Interpretation SL (AI)'],
    categories_ar: ['التحليل والطرائق (AA SL)', 'التطبيقات والتأويل (AI SL)'],
    items: [
      { s: 'Binomial theorem algebraic expansions \\((a+b)^n\\)', s_ar: 'مفكوك ذات الحدين الجبري \\((a+b)^n\\)', cat: 0 },
      { s: 'Voronoi diagrams and nearest-site analysis', s_ar: 'مخططات فورونوي وتحليل الموقع الأقرب', cat: 1 },
      { s: 'Kinematics integration with initial conditions', s_ar: 'تكامل الحركة والحركيات مع الشروط الابتدائية', cat: 0 },
      { s: 'Chi-squared test for independence contingency tables', s_ar: 'اختبار مربع كاي للاستقلالية في جداول التوافق', cat: 1 },
      { s: 'Exact trigonometric identities and radian circle sectors', s_ar: 'المتطابقات المثلثية الدقيقة وقطاعات الدائرة بالراديان', cat: 0 },
      { s: 'Spearman\'s rank correlation coefficient \\(r_s\\)', s_ar: 'معامل ارتباط الرتب لسبيرمان \\(r_s\\)', cat: 1 }
    ]
  }
];

D['ibsl-t1'] = [
  {
    t: 'qc',
    ti: 'Quick Check: Arithmetic Sequence Term',
    ti_ar: 'فحص سريع: حد المتتابعة الحسابية',
    q: 'What is the 12th term of the arithmetic sequence \\(4, 9, 14, 19, \\ldots\\)?',
    q_ar: 'ما هو الحد الثاني عشر للمتتابعة الحسابية \\(4, 9, 14, 19, \\ldots\\)؟',
    o: ['59', '64', '54', '69'],
    o_ar: ['59', '64', '54', '69'],
    a: 0,
    ex: '\\(u_n = u_1 + (n - 1)d = 4 + (11)(5) = 4 + 55 = 59\\).',
    ex_ar: '\\(u_n = u_1 + (n - 1)d = 4 + (11)(5) = 4 + 55 = 59\\).'
  },
  {
    t: 'tf',
    ti: 'Reasoning Lab: Sequences and Logarithms Properties',
    ti_ar: 'مختبر التفكير المنطقي: خصائص المتتابعات واللوغاريتمات',
    items: [
      { s: 'A geometric series converges to a finite sum to infinity if and only if \\(|r| < 1\\).', s_ar: 'تتقارب المتسلسلة الهندسية إلى مجموع لانهائي منتهٍ إذا وفقط إذا كان \\(|r| < 1\\).', a: true, ex: 'When |r| < 1, r^n approaches 0 as n approaches infinity.', ex_ar: 'عندما يكون |r| < 1، فإن r^n تقترب من الصفر عندما تقترب n من اللانهاية.' },
      { s: '\\(\\log_b(x + y) = \\log_b(x) + \\log_b(y)\\) for all positive \\(x, y\\).', s_ar: '\\(\\log_b(x + y) = \\log_b(x) + \\log_b(y)\\) لجميع قيم x و y الموجبة.', a: false, ex: 'The log of a product is the sum of logs: \\(\\log_b(xy) = \\log_b(x) + \\log_b(y)\\).', ex_ar: 'لوغاريتم حاصل الضرب هو مجموع اللوغاريتمات: \\(\\log_b(xy) = \\log_b(x) + \\log_b(y)\\).' },
      { s: 'The binomial coefficient \\(\\binom{n}{r}\\) equals \\(\\frac{n!}{r!(n-r)!}\\).', s_ar: 'معامل ذات الحدين \\(\\binom{n}{r}\\) يساوي \\(\\frac{n!}{r!(n-r)!}\\).', a: true, ex: 'Standard definition of n choose r.', ex_ar: 'التعريف القياسي للتوافيق n فوق r.' }
    ]
  },
  {
    t: 'num',
    ti: 'Calculation Lab: Geometric Series Sum to Infinity',
    ti_ar: 'مختبر الحساب: مجموع المتسلسلة الهندسية اللانهائية',
    q: 'Find the sum to infinity \\(S_\\infty\\) of the geometric series \\(18 + 6 + 2 + \\frac{2}{3} + \\cdots\\).',
    q_ar: 'أوجد المجموع إلى اللانهاية \\(S_\\infty\\) للمتسلسلة الهندسية \\(18 + 6 + 2 + \\frac{2}{3} + \\cdots\\).',
    a: 27,
    tol: 0.01,
    h: 'Identify first term \\(u_1 = 18\\) and common ratio \\(r = 6/18 = 1/3\\). Use \\(S_\\infty = \\frac{u_1}{1 - r}\\).',
    h_ar: 'حدد الحد الأول \\(u_1 = 18\\) والأساس المشترك \\(r = 6/18 = 1/3\\). استخدم \\(S_\\infty = \\frac{u_1}{1 - r}\\).',
    sol: '\\(S_\\infty = \\dfrac{18}{1 - 1/3} = \\dfrac{18}{2/3} = 27\\).',
    sol_ar: '\\(S_\\infty = \\dfrac{18}{1 - 1/3} = \\dfrac{18}{2/3} = 27\\).'
  },
  {
    t: 'ord',
    ti: 'Algebra Protocol: Solving Logarithmic Equations',
    ti_ar: 'بروتوكول الجبر: حل المعادلات اللوغاريتمية',
    q: 'Order the steps for solving \\(\\log_2(x) + \\log_2(x - 2) = 3\\):',
    q_ar: 'رتب خطوات حل المعادلة \\(\\log_2(x) + \\log_2(x - 2) = 3\\):',
    items: [
      'State the domain restrictions: \\(x > 0\\) and \\(x - 2 > 0 \\implies x > 2\\).',
      'Combine the logarithmic terms using product rule: \\(\\log_2[x(x - 2)] = 3\\).',
      'Convert from logarithmic to exponential form: \\(x(x - 2) = 2^3 = 8\\).',
      'Expand and rearrange into a standard quadratic: \\(x^2 - 2x - 8 = 0\\).',
      'Factor into \\((x - 4)(x + 2) = 0\\) and reject the extraneous solution \\(x = -2\\), leaving \\(x = 4\\).'
    ],
    items_ar: [
      'تحديد قيود المجال: \\(x > 0\\) و \\(x - 2 > 0 \\implies x > 2\\).',
      'دمج الحدود اللوغاريتمية باستخدام قاعدة الضرب: \\(\\log_2[x(x - 2)] = 3\\).',
      'التحويل من الصورة اللوغاريتمية إلى الصورة الأسية: \\(x(x - 2) = 2^3 = 8\\).',
      'فك الأقواس والترتيب في صورة معادلة تربيعية قياسية: \\(x^2 - 2x - 8 = 0\\).',
      'التحليل إلى \\((x - 4)(x + 2) = 0\\) واستبعاد الحل الدخيل \\(x = -2\\)، ليتبقى الحل الصحيح \\(x = 4\\).'
    ]
  },
  {
    t: 'cat',
    ti: 'Classify Sequence and Series Formulas',
    ti_ar: 'تصنيف قوانين المتتابعات والمتسلسلات',
    categories: ['Arithmetic Sequence/Series', 'Geometric Sequence/Series'],
    categories_ar: ['متتابعة/متسلسلة حسابية', 'متتابعة/متسلسلة هندسية'],
    items: [
      { s: '\\(u_n = u_1 + (n - 1)d\\)', s_ar: '\\(u_n = u_1 + (n - 1)d\\)', cat: 0 },
      { s: '\\(u_n = u_1 r^{n-1}\\)', s_ar: '\\(u_n = u_1 r^{n-1}\\)', cat: 1 },
      { s: '\\(S_n = \\frac{n}{2}(2u_1 + (n-1)d)\\)', s_ar: '\\(S_n = \\frac{n}{2}(2u_1 + (n-1)d)\\)', cat: 0 },
      { s: '\\(S_\\infty = \\frac{u_1}{1 - r}\\) for \\(|r| < 1\\)', s_ar: '\\(S_\\infty = \\frac{u_1}{1 - r}\\) عندما \\(|r| < 1\\)', cat: 1 },
      { s: 'Common difference \\(d = u_{k+1} - u_k\\)', s_ar: 'الفرق المشترك \\(d = u_{k+1} - u_k\\)', cat: 0 },
      { s: 'Common ratio \\(r = u_{k+1} / u_k\\)', s_ar: 'النسبة المشتركة \\(r = u_{k+1} / u_k\\)', cat: 1 }
    ]
  }
];

D['ibsl-t2'] = [
  {
    t: 'qc',
    ti: 'Quick Check: Composite Function Evaluation',
    ti_ar: 'فحص سريع: إيجاد قيمة تركيب دالتين',
    q: 'Given \\(f(x) = 2x - 5\\) and \\(g(x) = x^2 + 1\\), what is \\((g \\circ f)(3)\\)?',
    q_ar: 'إذا كانت \\(f(x) = 2x - 5\\) و \\(g(x) = x^2 + 1\\)، فما هي قيمة \\((g \\circ f)(3)\\)؟',
    o: ['2', '10', '7', '1'],
    o_ar: ['2', '10', '7', '1'],
    a: 0,
    ex: 'First find \\(f(3) = 2(3) - 5 = 1\\). Then evaluate \\(g(1) = 1^2 + 1 = 2\\).',
    ex_ar: 'أولاً نحسب \\(f(3) = 2(3) - 5 = 1\\). ثم نحسب \\(g(1) = 1^2 + 1 = 2\\).'
  },
  {
    t: 'tf',
    ti: 'Reasoning Lab: Graph Transformations and Inverses',
    ti_ar: 'مختبر التفكير المنطقي: تحويلات المنحنيات والدوال العكسية',
    items: [
      { s: 'The graph of \\(y = f(x - 3) + 2\\) translates \\(y = f(x)\\) right by 3 units and up by 2 units.', s_ar: 'منحنى \\(y = f(x - 3) + 2\\) يزيح منحنى \\(y = f(x)\\) إلى اليمين بمقدار 3 وحدات وإلى الأعلى بمقدار وحدتين.', a: true, ex: 'Inside subtraction moves right; outside addition moves up.', ex_ar: 'الطرح داخل الدالة يزيح لليمين، والجمع خارجها يزيح للأعلى.' },
      { s: 'The vertical asymptote of \\(f(x) = \\frac{3x - 1}{x - 4}\\) is \\(x = 4\\).', s_ar: 'خط التقارب الرأسي للدالة \\(f(x) = \\frac{3x - 1}{x - 4}\\) هو \\(x = 4\\).', a: true, ex: 'Denominator equals zero at x = 4.', ex_ar: 'المقام يساوي صفراً عند x = 4.' },
      { s: 'The graph of \\(y = f^{-1}(x)\\) is obtained by reflecting \\(y = f(x)\\) in the y-axis.', s_ar: 'يتم الحصول على منحنى \\(y = f^{-1}(x)\\) بانعكاس منحنى \\(y = f(x)\\) حول محور y.', a: false, ex: 'It is a reflection across the line \\(y = x\\).', ex_ar: 'الانعكاس يكون حول المستقيم القطري \\(y = x\\).' }
    ]
  },
  {
    t: 'num',
    ti: 'Calculation Lab: Quadratic Vertex Value',
    ti_ar: 'مختبر الحساب: القيمة الصغرى لرأس القطع المكافئ',
    q: 'Find the minimum value (the y-coordinate of the vertex) of \\(f(x) = 2x^2 - 12x + 23\\).',
    q_ar: 'أوجد القيمة الصغرى (الإحداثي y للرأس) للدالة \\(f(x) = 2x^2 - 12x + 23\\).',
    a: 5,
    tol: 0.01,
    h: 'Vertex x-coordinate is \\(x = -b/(2a) = 12/4 = 3\\). Evaluate \\(f(3)\\).',
    h_ar: 'إحداثي x للرأس هو \\(x = -b/(2a) = 12/4 = 3\\). احسب \\(f(3)\\).',
    sol: '\\(x_v = 3\\). \\(f(3) = 2(9) - 12(3) + 23 = 18 - 36 + 23 = 5\\).',
    sol_ar: '\\(x_v = 3\\). \\(f(3) = 2(9) - 12(3) + 23 = 18 - 36 + 23 = 5\\).'
  },
  {
    t: 'ord',
    ti: 'Algebra Protocol: Finding the Inverse Function',
    ti_ar: 'بروتوكول الجبر: إيجاد الدالة العكسية',
    q: 'Order the steps for finding the inverse of \\(f(x) = \\dfrac{3x - 4}{2}\\):',
    q_ar: 'رتب خطوات إيجاد الدالة العكسية للدالة \\(f(x) = \\dfrac{3x - 4}{2}\\):',
    items: [
      'Write the equation as \\(y = \\dfrac{3x - 4}{2}\\).',
      'Swap the roles of variables \\(x\\) and \\(y\\): \\(x = \\dfrac{3y - 4}{2}\\).',
      'Multiply both sides by 2 to clear the fraction: \\(2x = 3y - 4\\).',
      'Add 4 to both sides: \\(3y = 2x + 4\\).',
      'Divide by 3 to isolate \\(f^{-1}(x) = \\dfrac{2x + 4}{3}\\).'
    ],
    items_ar: [
      'كتابة المعادلة على الصورة \\(y = \\dfrac{3x - 4}{2}\\).',
      'تبديل دوري المتغيرين \\(x\\) و \\(y\\): \\(x = \\dfrac{3y - 4}{2}\\).',
      'ضرب كلا الطرفين في 2 للتخلص من المقام: \\(2x = 3y - 4\\).',
      'إضافة 4 إلى كلا الطرفين: \\(3y = 2x + 4\\).',
      'القسمة على 3 لعزل \\(f^{-1}(x) = \\dfrac{2x + 4}{3}\\).'
    ]
  },
  {
    t: 'cat',
    ti: 'Classify Graph Transformation Effects',
    ti_ar: 'تصنيف تأثيرات التحويلات الهندسية على المنحنى',
    categories: ['Horizontal Transformation', 'Vertical Transformation'],
    categories_ar: ['تحويل أفقي', 'تحويل رأسي'],
    items: [
      { s: '\\(y = f(x + 5)\\) (shift left 5)', s_ar: '\\(y = f(x + 5)\\) (إزاحة لليسار 5)', cat: 0 },
      { s: '\\(y = f(x) - 7\\) (shift down 7)', s_ar: '\\(y = f(x) - 7\\) (إزاحة للأسفل 7)', cat: 1 },
      { s: '\\(y = f(3x)\\) (horizontal compression by 1/3)', s_ar: '\\(y = f(3x)\\) (انضغاط أفقي بمعامل 1/3)', cat: 0 },
      { s: '\\(y = 4f(x)\\) (vertical stretch by 4)', s_ar: '\\(y = 4f(x)\\) (تمدد رأسي بمعامل 4)', cat: 1 },
      { s: '\\(y = f(-x)\\) (reflection across y-axis)', s_ar: '\\(y = f(-x)\\) (انعكاس حول محور y)', cat: 0 },
      { s: '\\(y = -f(x)\\) (reflection across x-axis)', s_ar: '\\(y = -f(x)\\) (انعكاس حول محور x)', cat: 1 }
    ]
  }
];

D['ibsl-t3'] = [
  {
    t: 'qc',
    ti: 'Quick Check: Radian Arc Length',
    ti_ar: 'فحص سريع: طول القوس بالراديان',
    q: 'A circular sector has radius \\(r = 8\\text{ cm}\\) and central angle \\(\\theta = 0.75\\text{ radians}\\). What is the arc length \\(s\\)?',
    q_ar: 'قطاع دائري نصف قطره \\(r = 8\\text{ cm}\\) وزاويته المركزية \\(\\theta = 0.75\\text{ راديان}\\). ما هو طول القوس \\(s\\)؟',
    o: ['6 cm', '12 cm', '4.5 cm', '16 cm'],
    o_ar: ['6 cm', '12 cm', '4.5 cm', '16 cm'],
    a: 0,
    ex: '\\(s = r\\theta = 8(0.75) = 6\\text{ cm}\\).',
    ex_ar: '\\(s = r\\theta = 8(0.75) = 6\\text{ cm}\\).'
  },
  {
    t: 'tf',
    ti: 'Reasoning Lab: Trigonometric Rules and Radians',
    ti_ar: 'مختبر التفكير المنطقي: قوانين حساب المثلثات والراديان',
    items: [
      { s: 'The sine rule \\(\\frac{a}{\\sin A} = \\frac{b}{\\sin B}\\) can be applied to any triangle, not just right-angled triangles.', s_ar: 'قانون الجيوب \\(\\frac{a}{\\sin A} = \\frac{b}{\\sin B}\\) يمكن تطبيقه على أي مثلث، وليس المثلثات القائمة فقط.', a: true, ex: 'The sine rule applies to all oblique triangles.', ex_ar: 'قانون الجيوب ينطبق على جميع المثلثات العامة.' },
      { s: '\\(\\cos(180^\\circ - \\theta) = \\cos\\theta\\).', s_ar: '\\(\\cos(180^\\circ - \\theta) = \\cos\\theta\\).', a: false, ex: 'Cosine of an obtuse angle is negative: \\(\\cos(180^\\circ - \\theta) = -\\cos\\theta\\).', ex_ar: 'جيب تمام الزاوية المنفرجة سالب: \\(\\cos(180^\\circ - \\theta) = -\\cos\\theta\\).' },
      { s: 'Two non-zero 2D vectors are perpendicular if and only if their dot product \\(\\mathbf{u} \\cdot \\mathbf{v} = 0\\).', s_ar: 'يكون المتجهان غير الصفريين متعامدين إذا وفقط إذا كان حاصل ضربهما القياسي \\(\\mathbf{u} \\cdot \\mathbf{v} = 0\\).', a: true, ex: 'Zero dot product implies angle is 90 degrees.', ex_ar: 'الضرب القياسي الصفري يعني أن الزاوية بينهما 90 درجة.' }
    ]
  },
  {
    t: 'num',
    ti: 'Calculation Lab: Sector Area Calculation',
    ti_ar: 'مختبر الحساب: مساحة القطاع الدائري',
    q: 'Find the area of a sector of a circle of radius \\(r = 6\\text{ cm}\\) with central angle \\(\\theta = \\frac{\\pi}{3}\\text{ radians}\\). Express your answer as a decimal to 3 significant figures. (Use \\(\\pi \\approx 3.1416\\))',
    q_ar: 'أوجد مساحة قطاع دائري نصف قطره \\(r = 6\\text{ cm}\\) وزاويته المركزية \\(\\theta = \\frac{\\pi}{3}\\text{ راديان}\\). قرّب إجابتك إلى 3 أرقام معنوية (استخدم \\(\\pi \\approx 3.1416\\)).',
    a: 18.8,
    tol: 0.2,
    unit: 'cm²',
    h: 'Use \\(A = \\frac{1}{2}r^2\\theta = \\frac{1}{2}(36)(\\pi/3) = 6\\pi\\).',
    h_ar: 'استخدم \\(A = \\frac{1}{2}r^2\\theta = \\frac{1}{2}(36)(\\pi/3) = 6\\pi\\).',
    sol: '\\(A = \\frac{1}{2}(6^2)\\left(\\frac{\\pi}{3}\\right) = 6\\pi \\approx 18.8\\text{ cm}^2\\).',
    sol_ar: '\\(A = \\frac{1}{2}(6^2)\\left(\\frac{\\pi}{3}\\right) = 6\\pi \\approx 18.8\\text{ cm}^2\\).'
  },
  {
    t: 'ord',
    ti: 'Trigonometry Protocol: Solving Non-Right Triangles with the Cosine Rule',
    ti_ar: 'بروتوكول المثلثات: حل المثلثات المائلة بقانون جيوب التمام',
    q: 'Order the steps to find side \\(c\\) in a triangle with sides \\(a = 5\\), \\(b = 7\\) and included angle \\(C = 60^\\circ\\):',
    q_ar: 'رتب خطوات إيجاد طول الضلع \\(c\\) في مثلث أطوال أضلاعه \\(a = 5\\) و \\(b = 7\\) والزاوية المحصورة بينهما \\(C = 60^\\circ\\):',
    items: [
      'State the cosine rule formula: \\(c^2 = a^2 + b^2 - 2ab\\cos C\\).',
      'Substitute values: \\(c^2 = 5^2 + 7^2 - 2(5)(7)\\cos 60^\\circ\\).',
      'Evaluate trigonometric constant: \\(\\cos 60^\\circ = 0.5\\).',
      'Compute: \\(c^2 = 25 + 49 - 70(0.5) = 74 - 35 = 39\\).',
      'Take square root: \\(c = \\sqrt{39} \\approx 6.24\\).'
    ],
    items_ar: [
      'صياغة قانون جيوب التمام: \\(c^2 = a^2 + b^2 - 2ab\\cos C\\).',
      'التعويض بالقيم المعطاة: \\(c^2 = 5^2 + 7^2 - 2(5)(7)\\cos 60^\\circ\\).',
      'حساب النسبة المثلثية: \\(\\cos 60^\\circ = 0.5\\).',
      'الحساب العددي: \\(c^2 = 25 + 49 - 70(0.5) = 74 - 35 = 39\\).',
      'أخذ الجذر التربيعي: \\(c = \\sqrt{39} \\approx 6.24\\).'
    ]
  },
  {
    t: 'cat',
    ti: 'Classify Trigonometric Properties by Quadrant',
    ti_ar: 'تصنيف إشارات النسب المثلثية في الربع الثاني',
    categories: ['Positive in Quadrant II (90° to 180°)', 'Negative in Quadrant II (90° to 180°)'],
    categories_ar: ['موجبة في الربع الثاني (90° إلى 180°)', 'سالبة في الربع الثاني (90° إلى 180°)'],
    items: [
      { s: '\\(\\sin\\theta\\)', s_ar: '\\(\\sin\\theta\\)', cat: 0 },
      { s: '\\(\\cos\\theta\\)', s_ar: '\\(\\cos\\theta\\)', cat: 1 },
      { s: '\\(\\tan\\theta\\)', s_ar: '\\(\\tan\\theta\\)', cat: 1 },
      { s: '\\(\\sin(180^\\circ - \\theta)\\)', s_ar: '\\(\\sin(180^\\circ - \\theta)\\)', cat: 0 },
      { s: '\\(\\cos(180^\\circ - \\theta)\\)', s_ar: '\\(\\cos(180^\\circ - \\theta)\\)', cat: 1 },
      { s: '\\(\\tan(180^\\circ - \\theta)\\)', s_ar: '\\(\\tan(180^\\circ - \\theta)\\)', cat: 1 }
    ]
  }
];

D['ibsl-t4'] = [
  {
    t: 'qc',
    ti: 'Quick Check: Expected Value of a Binomial Distribution',
    ti_ar: 'فحص سريع: القيمة المتوقعة للتوزيع ذي الحدين',
    q: 'A fair 6-sided die is rolled 60 times. What is the expected number of times a 4 will appear?',
    q_ar: 'أُلقي نرد منتظم ذو 6 أوجه 60 مرة. ما هو العدد المتوقع لمرات ظهور الرقم 4؟',
    o: ['10', '6', '12', '15'],
    o_ar: ['10', '6', '12', '15'],
    a: 0,
    ex: '\\(X \\sim B(60, 1/6) \\implies E(X) = np = 60(1/6) = 10\\).',
    ex_ar: '\\(X \\sim B(60, 1/6) \\implies E(X) = np = 60(1/6) = 10\\).'
  },
  {
    t: 'tf',
    ti: 'Reasoning Lab: Probability and Normal Distribution',
    ti_ar: 'مختبر التفكير المنطقي: الاحتمالات والتوزيع الطبيعي',
    items: [
      { s: 'For independent events \\(A\\) and \\(B\\), \\(P(A \\cap B) = P(A) \\cdot P(B)\\).', s_ar: 'للحادثتين المستقلتين A و B، يكون \\(P(A \\cap B) = P(A) \\cdot P(B)\\).', a: true, ex: 'Multiplication rule for independence.', ex_ar: 'قاعدة الضرب للحوادث المستقلة.' },
      { s: 'In a normal distribution, approximately 95% of data falls within 1 standard deviation of the mean.', s_ar: 'في التوزيع الطبيعي، يقع حوالي 95% من البيانات ضمن انحراف معياري واحد من المتوسط.', a: false, ex: 'Approximately 68% lies within 1 s.d., and 95% lies within 2 s.d.', ex_ar: 'حوالي 68% يقع ضمن انحراف معياري واحد، بينما 95% يقع ضمن انحرافين معياريين.' },
      { s: 'For mutually exclusive events, \\(P(A \\cap B) = 0\\).', s_ar: 'للحوادث المتنافية، يكون \\(P(A \\cap B) = 0\\).', a: true, ex: 'Mutually exclusive events cannot occur simultaneously.', ex_ar: 'الحوادث المتنافية يستحيل وقوعها معاً في الوقت ذاته.' }
    ]
  },
  {
    t: 'num',
    ti: 'Calculation Lab: Probability Union Calculation',
    ti_ar: 'مختبر الحساب: احتمال اتحاد حادثتين',
    q: 'Events \\(A\\) and \\(B\\) satisfy \\(P(A) = 0.6\\), \\(P(B) = 0.5\\), and \\(P(A \\cap B) = 0.3\\). Find \\(P(A \\cup B)\\).',
    q_ar: 'حادثتان A و B تحققان \\(P(A) = 0.6\\) و \\(P(B) = 0.5\\) و \\(P(A \\cap B) = 0.3\\). أوجد \\(P(A \\cup B)\\).',
    a: 0.8,
    tol: 0.01,
    h: 'Use the addition rule: \\(P(A \\cup B) = P(A) + P(B) - P(A \\cap B)\\).',
    h_ar: 'استخدم قاعدة الجمع: \\(P(A \\cup B) = P(A) + P(B) - P(A \\cap B)\\).',
    sol: '\\(P(A \\cup B) = 0.6 + 0.5 - 0.3 = 0.8\\).',
    sol_ar: '\\(P(A \\cup B) = 0.6 + 0.5 - 0.3 = 0.8\\).'
  },
  {
    t: 'ord',
    ti: 'Inference Protocol: Normal Distribution Probability Workflow',
    ti_ar: 'بروتوكول الاستدلال: مسار حساب احتمالات التوزيع الطبيعي',
    q: 'Order the steps for finding \\(P(X \\le 85)\\) for \\(X \\sim N(70, 10^2)\\):',
    q_ar: 'رتب خطوات إيجاد الاحتمال \\(P(X \\le 85)\\) للمتغير \\(X \\sim N(70, 10^2)\\):',
    items: [
      'Identify the parameters: mean \\(\\mu = 70\\) and standard deviation \\(\\sigma = 10\\).',
      'Calculate the standardized z-score: \\(z = \\dfrac{x - \\mu}{\\sigma} = \\dfrac{85 - 70}{10} = 1.5\\).',
      'Write the probability in standardized form: \\(P(Z \\le 1.5) = \\Phi(1.5)\\).',
      'Look up \\(\\Phi(1.5)\\) in the standard normal table or enter into GDC \\(\\text{normcdf}(-10^{99}, 1.5, 0, 1)\\).',
      'State the final probability: \\(P(X \\le 85) \\approx 0.933\\).'
    ],
    items_ar: [
      'تحديد المعلمات: المتوسط الحسابي \\(\\mu = 70\\) والانحراف المعياري \\(\\sigma = 10\\).',
      'حساب الدرجة المعيارية z: \\(z = \\dfrac{x - \\mu}{\\sigma} = \\dfrac{85 - 70}{10} = 1.5\\).',
      'كتابة الاحتمال بالصيغة المعيارية: \\(P(Z \\le 1.5) = \\Phi(1.5)\\).',
      'إيجاد قيمة \\(\\Phi(1.5)\\) من جدول التوزيع الطبيعي المعياري أو بإدخال \\(\\text{normcdf}(-10^{99}, 1.5, 0, 1)\\) في الحاسبة.',
      'كتابة الاحتمال النهائي: \\(P(X \\le 85) \\approx 0.933\\).'
    ]
  },
  {
    t: 'cat',
    ti: 'Classify Statistical Variables',
    ti_ar: 'تصنيف المتغيرات الإحصائية: متقطعة (منفصلة) مقابل متصلة',
    categories: ['Discrete Random Variable', 'Continuous Random Variable'],
    categories_ar: ['متغير عشوائي متقطع (منفصل)', 'متغير عشوائي متصل'],
    items: [
      { s: 'Number of defects in a manufactured batch', s_ar: 'عدد العيوب في دفعة إنتاجية مصنعة', cat: 0 },
      { s: 'Time taken to run a 400-meter race', s_ar: 'الزمن المستغرق لقطع سباق 400 متر', cat: 1 },
      { s: 'Number of goals scored in a football match', s_ar: 'عدد الأهداف المسجلة في مباراة كرة قدم', cat: 0 },
      { s: 'Weight of an apple chosen from an orchard', s_ar: 'وزن تفاحة تم اختيارها من بستان', cat: 1 },
      { s: 'Number of students passing an examination', s_ar: 'عدد الطلاب الناجحين في الامتحان', cat: 0 },
      { s: 'Height of a tree measured in meters', s_ar: 'طول شجرة مقاساً بالأمتار', cat: 1 }
    ]
  }
];

D['ibsl-t5'] = [
  {
    t: 'qc',
    ti: 'Quick Check: Derivative via Power & Chain Rule',
    ti_ar: 'فحص سريع: المشتقة باستخدام قاعدتي القوة والسلسلة',
    q: 'Find the derivative of \\(f(x) = (2x + 1)^4\\).',
    q_ar: 'أوجد مشتقة الدالة \\(f(x) = (2x + 1)^4\\).',
    o: ['\\(8(2x + 1)^3\\)', '\\(4(2x + 1)^3\\)', '\\(2(2x + 1)^3\\)', '\\(8x(2x + 1)^3\\)'],
    o_ar: ['\\(8(2x + 1)^3\\)', '\\(4(2x + 1)^3\\)', '\\(2(2x + 1)^3\\)', '\\(8x(2x + 1)^3\\)'],
    a: 0,
    ex: 'Chain rule: \\(f\'(x) = 4(2x + 1)^3 \\cdot \\frac{d}{dx}(2x + 1) = 4(2x + 1)^3 \\cdot 2 = 8(2x + 1)^3\\).',
    ex_ar: 'قاعدة السلسلة: \\(f\'(x) = 4(2x + 1)^3 \\cdot \\frac{d}{dx}(2x + 1) = 4(2x + 1)^3 \\cdot 2 = 8(2x + 1)^3\\).'
  },
  {
    t: 'tf',
    ti: 'Reasoning Lab: Calculus Theorems and Kinematics',
    ti_ar: 'مختبر التفكير المنطقي: نظريات التفاضل والتكامل والحركيات',
    items: [
      { s: 'If \\(f\'(c) = 0\\) and \\(f\'\'(c) > 0\\), then \\(f(x)\\) has a local minimum at \\(x = c\\).', s_ar: 'إذا كان \\(f\'(c) = 0\\) و \\(f\'\'(c) > 0\\)، فإن للدالة \\(f(x)\\) قيمة صغرى محلية عند \\(x = c\\).', a: true, ex: 'Second derivative test for a local minimum.', ex_ar: 'اختبار المشتقة الثانية لتحديد القيم الصغرى المحلية.' },
      { s: 'Displacement is equal to the integral of speed over time.', s_ar: 'الإزاحة تساوي تكامل السرعة القياسية (speed) بالنسبة للزمن.', a: false, ex: 'Displacement is the integral of velocity; total distance is the integral of speed (|v(t)|).', ex_ar: 'الإزاحة هي تكامل السرعة المتجهة (velocity)؛ بينما المسافة الكلية هي تكامل السرعة القياسية (|v(t)|).' },
      { s: 'The derivative of \\(\\sin(2x)\\) is \\(2\\cos(2x)\\).', s_ar: 'مشتقة الدالة \\(\\sin(2x)\\) هي \\(2\\cos(2x)\\).', a: true, ex: 'Chain rule multiplies by 2.', ex_ar: 'قاعدة السلسلة تقتضي الضرب في مشتقة ما بداخل الجيب (2).' }
    ]
  },
  {
    t: 'num',
    ti: 'Calculation Lab: Definite Integral Evaluation',
    ti_ar: 'مختبر الحساب: حساب التكامل المحدد',
    q: 'Evaluate the definite integral \\(\\displaystyle\\int_0^3 (2x + 1)\\,dx\\).',
    q_ar: 'احسب قيمة التكامل المحدد \\(\\displaystyle\\int_0^3 (2x + 1)\\,dx\\).',
    a: 12,
    tol: 0.01,
    h: 'Integrate term by term: \\([x^2 + x]_0^3\\).',
    h_ar: 'كامل حداً بحر: \\([x^2 + x]_0^3\\).',
    sol: '\\([x^2 + x]_0^3 = (3^2 + 3) - (0) = 9 + 3 = 12\\).',
    sol_ar: '\\([x^2 + x]_0^3 = (3^2 + 3) - (0) = 9 + 3 = 12\\).'
  },
  {
    t: 'ord',
    ti: 'Calculus Protocol: Finding Tangent Line Equation',
    ti_ar: 'بروتوكول التفاضل: إيجاد معادلة خط المماس',
    q: 'Order the steps to find the equation of the tangent line to \\(y = x^2 - 3x\\) at \\(x = 4\\):',
    q_ar: 'رتب خطوات إيجاد معادلة خط المماس لمنحنى \\(y = x^2 - 3x\\) عند \\(x = 4\\):',
    items: [
      'Find the y-coordinate of the point: \\(y(4) = 4^2 - 3(4) = 16 - 12 = 4\\), so point is \\((4, 4)\\).',
      'Find the derivative of the function: \\(y\' = 2x - 3\\).',
      'Evaluate the gradient at \\(x = 4\\): \\(m = y\'(4) = 2(4) - 3 = 5\\).',
      'Substitute into point-slope formula: \\(y - 4 = 5(x - 4)\\).',
      'Expand and simplify into slope-intercept form: \\(y = 5x - 16\\).'
    ],
    items_ar: [
      'إيجاد الإحداثي y لنقطة التماس: \\(y(4) = 4^2 - 3(4) = 16 - 12 = 4\\)، إذن النقطة هي \\((4, 4)\\).',
      'إيجاد مشتقة الدالة: \\(y\' = 2x - 3\\).',
      'حساب الميل عند \\(x = 4\\): \\(m = y\'(4) = 2(4) - 3 = 5\\).',
      'التعويض في صيغة الميل ونقطة: \\(y - 4 = 5(x - 4)\\).',
      'فك الأقواس والتبسيط لصيغة الميل والمقطع: \\(y = 5x - 16\\).'
    ]
  },
  {
    t: 'cat',
    ti: 'Classify Calculus Concepts',
    ti_ar: 'تصنيف مفاهيم التفاضل والتكامل',
    categories: ['Differential Calculus', 'Integral Calculus'],
    categories_ar: ['حساب التفاضل', 'حساب التكامل'],
    items: [
      { s: 'Rate of change and tangent gradients', s_ar: 'معدل التغير وميول المماسات', cat: 0 },
      { s: 'Area enclosed between two curves', s_ar: 'المساحة المحصورة بين منحنيين', cat: 1 },
      { s: 'Finding stationary points and inflection points', s_ar: 'إيجاد النقاط الحرجة ونقاط الانقلاب', cat: 0 },
      { s: 'Recovering displacement from a velocity function', s_ar: 'استنتاج دالة الإزاحة من دالة السرعة المتجهة', cat: 1 },
      { s: 'Chain rule, product rule, and quotient rule', s_ar: 'قواعد السلسلة والضرب والقسمة للمشتقات', cat: 0 },
      { s: 'Definite integrals and anti-derivatives', s_ar: 'التكاملات المحددة والدوال الأصلية (عكس المشتقة)', cat: 1 }
    ]
  },
  {
    t: 'gp',
    ti: 'Interactive Graph Plotter: Cubic Extrema & Inflection Point',
    ti_ar: 'مخطط الدوال التفاعلي: القيم القصوى ونقطة الانقلاب للدالة التكعيبية',
    q: 'Plot the local maximum, local minimum, and inflection point of \\(f(x) = x^3 - 3x^2\\) on the grid.',
    q_ar: 'حدد القيمة العظمى المحلية، والقيمة الصغرى المحلية، ونقطة الانقلاب للدالة \\(f(x) = x^3 - 3x^2\\) على الشبكة الإحداثية.',
    xrange: [-2, 4],
    yrange: [-6, 3],
    targets: [
      { label: 'Local Maximum (0, 0)', label_ar: 'عظمى محلية (0, 0)', target: [0, 0], tol: 0.45 },
      { label: 'Local Minimum (2, -4)', label_ar: 'صغرى محلية (2, -4)', target: [2, -4], tol: 0.45 },
      { label: 'Inflection Point (1, -2)', label_ar: 'نقطة انقلاب (1, -2)', target: [1, -2], tol: 0.45 }
    ],
    targets_ar: [
      { label: 'عظمى محلية (0, 0)', target: [0, 0], tol: 0.45 },
      { label: 'صغرى محلية (2, -4)', target: [2, -4], tol: 0.45 },
      { label: 'نقطة انقلاب (1, -2)', target: [1, -2], tol: 0.45 }
    ],
    curve: 'x**3 - 3*x**2',
    sol: 'Differentiating: \\(f\'(x) = 3x^2 - 6x = 3x(x - 2) = 0 \\implies x = 0, 2\\). At \\(x = 0\\), \\(f(0) = 0\\) (local max); at \\(x = 2\\), \\(f(2) = -4\\) (local min). Inflection occurs at \\(f\'\'(x) = 6x - 6 = 0 \\implies x = 1, y = -2\\).',
    sol_ar: 'باشتقاق الدالة: \\(f\'(x) = 3x(x - 2) = 0 \\implies x = 0, 2\\). عند \\(x = 0\\) عظمى محلية عند \\((0, 0)\\)، وعند \\(x = 2\\) صغرى محلية عند \\((2, -4)\\). نقطة الانقلاب عند \\(f\'\'(x) = 6x - 6 = 0 \\implies (1, -2)\\).'
  },
  {
    t: 'se',
    ti: 'Spot the Error: Extraneous Solutions in Logarithmic Equations',
    ti_ar: 'اكتشف الخطأ: الحلول الدخيلة في المعادلات اللوغاريتمية',
    q: 'A student solves \\(\\log_2(x) + \\log_2(x - 2) = 3\\). Review their steps below:',
    q_ar: 'قام طالب بحل المعادلة \\(\\log_2(x) + \\log_2(x - 2) = 3\\). افحص خطوات الحل التالية:',
    steps: [
      { s: 'Combine logs using product property: \\(\\log_2[x(x - 2)] = 3\\)' },
      { s: 'Convert to exponential form: \\(x(x - 2) = 2^3 = 8\\)' },
      { s: 'Expand and rearrange into standard quadratic: \\(x^2 - 2x - 8 = 0\\)' },
      { s: 'Factor: \\((x - 4)(x + 2) = 0 \\implies x = 4\\) or \\(x = -2\\)' },
      { s: 'Conclude both \\(x = 4\\) and \\(x = -2\\) are valid solutions' }
    ],
    steps_ar: [
      { s: 'دمج اللوغاريتمات باستخدام خاصية الضرب: \\(\\log_2[x(x - 2)] = 3\\)' },
      { s: 'التحويل للصيغة الأسية: \\(x(x - 2) = 2^3 = 8\\)' },
      { s: 'الترتيب بالصيغة القياسية: \\(x^2 - 2x - 8 = 0\\)' },
      { s: 'التحليل: \\((x - 4)(x + 2) = 0 \\implies x = 4\\) أو \\(x = -2\\)' },
      { s: 'الاستنتاج أن كلاً من \\(x = 4\\) و \\(x = -2\\) حلان صحيحان' }
    ],
    errorStep: 5,
    reasons: [
      'Logarithms require strictly positive arguments; x = -2 is an extraneous solution because log₂(-2) is undefined',
      'The exponential form should have been 3² = 9',
      'Factoring x² - 2x - 8 was incorrect'
    ],
    reasons_ar: [
      'اللوغاريتم يشترط أعداداً موجبة تماماً؛ والعدد x = -2 حل دخيل لأن log₂(-2) غير معرّف',
      'التحويل للصيغة الأسية كان يجب أن يكون 3² = 9',
      'تحليل المقدار كان غير صحيح'
    ],
    correctReason: 0,
    sol: 'Step 5 is erroneous! The domain of \\(\\log_2(x)\\) and \\(\\log_2(x - 2)\\) requires \\(x > 2\\). Since \\(-2 \\le 2\\), \\(x = -2\\) is an extraneous solution. The sole valid solution is \\(x = 4\\).',
    sol_ar: 'الخطوة 5 خاطئة! مجال المعادلة يشترط \\(x > 2\\). العدد \\(x = -2\\) حل دخيل، والحل الوحيد المقبول هو \\(x = 4\\).'
  },
  {
    t: 'ms',
    ti: 'IB Math AA SL Paper 1: Kinematics Multi-Part Exam Question',
    ti_ar: 'ورقة اختبار IB Math AA SL 1: مسألة الحركيات متعددة الأجزاء',
    q: 'A particle moves along a horizontal straight line such that its velocity at time \\(t\\) seconds is given by \\(v(t) = 6t - 3t^2\\) for \\(t \\ge 0\\).<br><b>(a)</b> Find the acceleration of the particle at \\(t = 2\\). [2 marks]<br><b>(b)</b> Find the values of \\(t\\) when the particle is instantaneously at rest. [2 marks]<br><b>(c)</b> Given that the particle starts at displacement \\(s(0) = 4\\text{ m}\\), find its displacement at \\(t = 3\\). [3 marks]',
    parts: [
      {
        label: 'Part (a)',
        marks: 2,
        rubric: [
          { code: 'M1', text: 'Recognise \\(a(t) = v\'(t)\\) and differentiate: \\(a(t) = 6 - 6t\\)', text_ar: 'إدراك أن التسارع هو مشتقة السرعة والاشتقاق: 6 - 6t' },
          { code: 'A1', text: 'Substitute \\(t = 2\\): \\(a(2) = 6 - 12 = -6\\text{ m s}^{-2}\\)', text_ar: 'التعويض عن t = 2 للحصول على -6 م/ث²' }
        ]
      },
      {
        label: 'Part (b)',
        marks: 2,
        rubric: [
          { code: 'M1', text: 'Set velocity to zero: \\(6t - 3t^2 = 0 \\implies 3t(2 - t) = 0\\)', text_ar: 'مساواة السرعة بالصفر والتحليل' },
          { code: 'A1', text: 'State both non-negative solutions: \\(t = 0\\) and \\(t = 2\\text{ s}\\)', text_ar: 'كتابة قيمتي الزمن: t = 0 و t = 2 ثانية' }
        ]
      },
      {
        label: 'Part (c)',
        marks: 3,
        rubric: [
          { code: 'M1', text: 'Integrate velocity with respect to time: \\(s(t) = \\int (6t - 3t^2)\\,dt = 3t^2 - t^3 + C\\)', text_ar: 'تكامل السرعة بالنسبة للزمن' },
          { code: 'A1', text: 'Use initial condition \\(s(0) = 4\\implies C = 4\\), so \\(s(t) = 3t^2 - t^3 + 4\\)', text_ar: 'إيجاد ثابت التكامل C = 4' },
          { code: 'A1', text: 'Evaluate at \\(t = 3\\): \\(s(3) = 3(9) - 27 + 4 = 4\\text{ m}\\)', text_ar: 'حساب الإزاحة عند t = 3 وتساوي 4 أمتار' }
        ]
      }
    ],
    boundaries: [
      { min: 7, grade: 'IB Grade 7 (Maximum Mastery)', grade_ar: 'درجة البكالوريا الدولية 7 (إتقان تام)' },
      { min: 5, grade: 'IB Grade 6 (Excellent)', grade_ar: 'درجة البكالوريا الدولية 6 (ممتاز)' },
      { min: 4, grade: 'IB Grade 5 (Good)', grade_ar: 'درجة البكالوريا الدولية 5 (جيد جداً)' },
      { min: 3, grade: 'IB Grade 4 (Satisfactory Pass)', grade_ar: 'درجة البكالوريا الدولية 4 (ناجح)' },
      { min: 0, grade: 'Needs Practice', grade_ar: 'يحتاج تدريب' }
    ],
    examinerTip: 'Examiner Advice: Full method marks require showing the integration constant +C explicitly before solving for s(0) = 4.',
    examinerTip_ar: 'نصيحة المصحح: تتطلب علامة الطريقة إظهار ثابت التكامل +C صراحة قبل التعويض بالشرط الابتدائي.'
  }
];

D['ibsl-ai'] = [
  {
    t: 'qc',
    ti: 'Quick Check: Euler\'s Method Step Formula',
    ti_ar: 'فحص سريع: صيغة خطوة طريقة أويلر',
    q: 'In Euler\'s method for \\(\\frac{dy}{dx} = f(x, y)\\) with step size \\(h\\), how is \\(y_{n+1}\\) computed from \\(y_n\\)?',
    q_ar: 'في طريقة أويلر للمعادلة التفاضلية \\(\\frac{dy}{dx} = f(x, y)\\) بطول خطوة \\(h\\)، كيف تُحسب \\(y_{n+1}\\) بدلالة \\(y_n\\)؟',
    o: [
      '\\(y_{n+1} = y_n + h \\cdot f(x_n, y_n)\\)',
      '\\(y_{n+1} = y_n + \\frac{h}{2} \\cdot f(x_n, y_n)\\)',
      '\\(y_{n+1} = y_n + f(x_n, y_n)\\)',
      '\\(y_{n+1} = x_n + h \\cdot y_n\\)'
    ],
    o_ar: [
      '\\(y_{n+1} = y_n + h \\cdot f(x_n, y_n)\\)',
      '\\(y_{n+1} = y_n + \\frac{h}{2} \\cdot f(x_n, y_n)\\)',
      '\\(y_{n+1} = y_n + f(x_n, y_n)\\)',
      '\\(y_{n+1} = x_n + h \\cdot y_n\\)'
    ],
    a: 0,
    ex: 'Euler\'s recurrence formula is \\(y_{n+1} = y_n + h \\cdot f(x_n, y_n)\\).',
    ex_ar: 'صيغة أويلر التكرارية هي \\(y_{n+1} = y_n + h \\cdot f(x_n, y_n)\\).'
  },
  {
    t: 'tf',
    ti: 'Reasoning Lab: Voronoi Diagrams & AI SL Statistics',
    ti_ar: 'مختبر التفكير المنطقي: مخططات فورونوي وإحصاء AI SL',
    items: [
      { s: 'In a Voronoi diagram, every point inside a cell is closer to that cell\'s site than to any other site.', s_ar: 'في مخطط فورونوي، أي نقطة داخل خلية معينة تكون أقرب إلى موقع تلك الخلية من أي موقع آخر.', a: true, ex: 'Definition of a Voronoi region.' , ex_ar: 'التعريف الأساسي لمنطقة فورونوي.' },
      { s: 'A Voronoi vertex is equidistant from at least three sites.', s_ar: 'رأس فورونوي يبعد مسافات متساوية عن ثلاثة مواقع على الأقل.', a: true, ex: 'Vertices are circumcenters of adjacent sites.', ex_ar: 'رؤوس فورونوي تمثل مراكز الدوائر المحيطة بالمواقع المتجاورة.' },
      { s: 'A chi-squared test for independence is valid even when expected cell frequencies are less than 1.', s_ar: 'يكون اختبار مربع كاي للاستقلالية صالحاً حتى لو كانت التكرارات المتوقعة في الخلايا أقل من 1.', a: false, ex: 'Every expected cell frequency must be at least 5.', ex_ar: 'يجب أن يكون التكرار المتوقع في كل خلية 5 على الأقل.' }
    ]
  },
  {
    t: 'num',
    ti: 'Calculation Lab: Euler\'s Method Single Step Estimation',
    ti_ar: 'مختبر الحساب: تقدير خطوة واحدة بطريقة أويلر',
    q: 'Given \\(\\frac{dy}{dx} = 2x + y\\) with \\(y(0) = 3\\), use Euler\'s method with step size \\(h = 0.2\\) to estimate \\(y(0.2)\\).',
    q_ar: 'إذا كان \\(\\frac{dy}{dx} = 2x + y\\) مع الشرط الابتدائي \\(y(0) = 3\\)، استخدم طريقة أويلر بطول خطوة \\(h = 0.2\\) لتقدير قيمة \\(y(0.2)\\).',
    a: 3.6,
    tol: 0.01,
    h: 'Compute \\(f(x_0, y_0) = 2(0) + 3 = 3\\). Then \\(y_1 = y_0 + h \\cdot f(0, 3)\\).',
    h_ar: 'احسب \\(f(x_0, y_0) = 2(0) + 3 = 3\\). ثم \\(y_1 = y_0 + h \\cdot f(0, 3)\\).',
    sol: '\\(y_1 = 3 + 0.2(3) = 3 + 0.6 = 3.6\\).',
    sol_ar: '\\(y_1 = 3 + 0.2(3) = 3 + 0.6 = 3.6\\).'
  },
  {
    t: 'ord',
    ti: 'Inference Protocol: Executing a Chi-Squared Independence Test',
    ti_ar: 'بروتوكول الاستدلال: تنفيذ اختبار مربع كاي للاستقلالية',
    q: 'Order the steps for conducting a \\(\\chi^2\\) test for independence on a two-way contingency table:',
    q_ar: 'رتب خطوات إجراء اختبار \\(\\chi^2\\) للاستقلالية على جدول توافق ثنائي:',
    items: [
      'State the null hypothesis \\(H_0\\) (variables are independent) and alternative \\(H_1\\) (variables are dependent).',
      'Calculate expected frequencies for every cell: \\(f_e = \\frac{\\text{row total} \\times \\text{column total}}{\\text{grand total}}\\).',
      'Verify that all expected frequencies satisfy \\(f_e \\ge 5\\).',
      'Compute the test statistic: \\(\\chi^2 = \\sum \\frac{(f_o - f_e)^2}{f_e}\\) and degrees of freedom \\((r - 1)(c - 1)\\).',
      'Compare \\(\\chi^2\\) with the critical value (or p-value with \\(\\alpha\\)) and state the conclusion.'
    ],
    items_ar: [
      'صياغة فرضية العدم \\(H_0\\) (المتغيران مستقلان) والفرضية البديلة \\(H_1\\) (المتغيران غير مستقلين/مرتبطان).',
      'حساب التكرارات المتوقعة لكل خلية: \\(f_e = \\frac{\\text{مجموع الصف} \\times \\text{مجموع العمود}}{\\text{المجموع الكلي}}\\).',
      'التحقق من أن جميع التكرارات المتوقعة تحقق الشرط \\(f_e \\ge 5\\).',
      'حساب إحصائية الاختبار: \\(\\chi^2 = \\sum \\frac{(f_o - f_e)^2}{f_e}\\) ودرجات الحرية \\((r - 1)(c - 1)\\).',
      'مقارنة قيمة \\(\\chi^2\\) المحسوبة بالقيمة الحرجة (أو p-value مع مستوى الدلالة \\(\\alpha\\)) واستخلاص القرار.'
    ]
  },
  {
    t: 'cat',
    ti: 'Classify AI SL Analytical Methods',
    ti_ar: 'تصنيف الطرائق التحليلية في AI SL',
    categories: ['Geometric / Network Modelling', 'Statistical Inference'],
    categories_ar: ['النمذجة الهندسية والشبكية', 'الاستدلال الإحصائي'],
    items: [
      { s: 'Voronoi diagrams and toxic waste dump placement', s_ar: 'مخططات فورونوي وتحديد مواقع مكبات النفايات', cat: 0 },
      { s: 'Chi-squared test for independence', s_ar: 'اختبار مربع كاي للاستقلالية', cat: 1 },
      { s: 'Perpendicular bisectors between two coordinate sites', s_ar: 'المنصفات العمودية بين موقعين إحداثيين', cat: 0 },
      { s: 'Spearman\'s rank correlation coefficient \\(r_s\\)', s_ar: 'معامل ارتباط الرتب لسبيرمان \\(r_s\\)', cat: 1 },
      { s: 'Euler\'s numerical method for differential equations', s_ar: 'طريقة أويلر العددية للمعادلات التفاضلية', cat: 0 },
      { s: 'Pearson product-moment correlation coefficient \\(r\\)', s_ar: 'معامل ارتباط بيرسون \\(r\\)', cat: 1 }
    ]
  }
];

});
