/* Interactive Practice data for /odes/ - one entry per chapter section id.
   Shipped as public/js/ix/odes.js and loaded only on that track's page by the
   engine in src/scripts/modules/19-interactive-activities-engine-v1.js
   (Plan 5 Phase 5.015, ADR 0033). Entry shapes (qc/mt/tf/sb/sr/fn/num/ord/cat) are
   documented there. */
(window.__ixData = window.__ixData || []).push(function (D) {

D['ode-separable'] = [
  {
    t: 'sb',
    ti: 'Lab Step Builder: Solving a Separable ODE',
    ti_ar: 'بناء خطوات المعمل: حل معادلة تفاضلية قابلة للفصل',
    steps: [
      { l: 'Separate variables in \\(\\dfrac{dy}{dx} = 3x^2 y\\): write \\(\\dfrac{1}{y}\\,dy = 3x^2\\,dx\\). Integrate left side: \\(\\int \\frac{1}{y}\\,dy = \\ln|y|\\). Integrate right side: \\(\\int 3x^2\\,dx = x^{\\text{?}} + C\\):', a: '3', h: '\\(\\int 3x^2 dx = x^3\\)' },
      { l: 'Exponentiate both sides: \\(y = A e^{x^3}\\). Given initial condition \\(y(0) = 5\\), find constant \\(A =\\)', a: '5', h: '\\(5 = A e^0 = A\\)' }
    ],
    steps_ar: [
      { l: 'افصل المتغيرات في \\(\\dfrac{dy}{dx} = 3x^2 y\\): اكتب \\(\\dfrac{1}{y}\\,dy = 3x^2\\,dx\\). كامل الطرف الأيسر: \\(\\int \\frac{1}{y}\\,dy = \\ln|y|\\). كامل الطرف الأيمن: \\(\\int 3x^2\\,dx = x^{\\text{?}} + C\\):', a: '3', h: '\\(\\int 3x^2 dx = x^3\\)' },
      { l: 'خذ الدالة الأسية للطرفين: \\(y = A e^{x^3}\\). بالنظر إلى الشرط الابتدائي \\(y(0) = 5\\)، أوجد الثابت \\(A =\\)', a: '5', h: '\\(5 = A e^0 = A\\)' }
    ]
  },
  {
    t: 'qc',
    ti: 'Lab Check: Identifying Separable Equations',
    ti_ar: 'فحص المعمل: تحديد المعادلات القابلة للفصل',
    q: 'Which of the following first-order differential equations is separable?',
    q_ar: 'أي من المعادلات التفاضلية التالية من الرتبة الأولى قابلة للفصل؟',
    o: ['\\(\\dfrac{dy}{dx} = x^2 y - x^2\\)', '\\(\\dfrac{dy}{dx} = x + y\\)', '\\(\\dfrac{dy}{dx} = \\sin(x + y)\\)', '\\(\\dfrac{dy}{dx} = x^2 + y^2\\)'],
    o_ar: ['\\(\\dfrac{dy}{dx} = x^2 y - x^2\\)', '\\(\\dfrac{dy}{dx} = x + y\\)', '\\(\\dfrac{dy}{dx} = \\sin(x + y)\\)', '\\(\\dfrac{dy}{dx} = x^2 + y^2\\)'],
    a: 0,
    ex: 'Factor the right-hand side: \\(x^2 y - x^2 = x^2(y - 1)\\). This can be separated into \\(\\frac{1}{y-1}\\,dy = x^2\\,dx\\).',
    ex_ar: 'حلل الطرف الأيمن إلى عوامل: \\(x^2 y - x^2 = x^2(y - 1)\\). يمكن فصل هذه المعادلة إلى \\(\\frac{1}{y-1}\\,dy = x^2\\,dx\\).'
  },
  {
    t: 'num',
    ti: 'Initial Value Problem with Separation',
    ti_ar: 'مسألة القيمة الابتدائية بفصل المتغيرات',
    q: 'Solve the initial value problem \\(\\frac{dy}{dx} = 2x y^2\\) with \\(y(0) = \\frac{1}{2}\\). Evaluate \\(y(1)\\):',
    q_ar: 'حل مسألة القيمة الابتدائية \\(\\frac{dy}{dx} = 2x y^2\\) مع \\(y(0) = \\frac{1}{2}\\). احسب \\(y(1)\\):',
    a: 1,
    tol: 0.001,
    h: '-y⁻¹ = x² + C. At (0, 1/2), -2 = C. Then -y⁻¹ = x² - 2 => y = 1 / (2 - x²). Evaluate at x = 1.',
    h_ar: '-y⁻¹ = x² + C. عند (0, 1/2)، نجد -2 = C. إذن -y⁻¹ = x² - 2 => y = 1 / (2 - x²). احسب القيمة عند x = 1.',
    sol: 'y(1) = 1 / (2 - 1²) = 1.',
    sol_ar: 'y(1) = 1 / (2 - 1²) = 1.'
  },
  {
    t: 'ord',
    ti: 'Order the Steps: Solving Separable Differential Equations',
    ti_ar: 'ترتيب الخطوات: حل المعادلات التفاضلية القابلة للفصل',
    q: 'Order the steps to solve a separable equation dy/dx = g(y)h(x):',
    q_ar: 'رتّب خطوات حل المعادلة التفاضلية القابلة للفصل dy/dx = g(y)h(x):',
    items: [
      'Identify any equilibrium constant solutions where g(y) = 0',
      'Algebraically separate variables: (1 / g(y)) dy = h(x) dx',
      'Integrate both sides: ∫ (1 / g(y)) dy = ∫ h(x) dx + C',
      'Apply any given initial conditions to determine integration constant C',
      'Solve explicitly for y as a function of x where feasible'
    ],
    items_ar: [
      'تحديد أي حلول اتزان ثابتة تجعل g(y) = 0',
      'فصل المتغيرات جبرياً: (1 / g(y)) dy = h(x) dx',
      'مكاملة الطرفين: ∫ (1 / g(y)) dy = ∫ h(x) dx + C',
      'تطبيق الشروط الابتدائية المعطاة لتحديد ثابت التكامل C',
      'حل المعادلة صراحة لإيجاد y كدالة في x إن أمكن'
    ],
    sol: 'Separable equations isolate y on one side and x on the other before integrating.',
    sol_ar: 'تعزل المعادلات القابلة للفصل المتغير y في طرف و x في الطرف الآخر قبل إجراء التكامل.'
  },
  {
    t: 'cat',
    ti: 'Classify Differential Equations: Separable vs. Non-Separable',
    ti_ar: 'تصنيف المعادلات التفاضلية: قابلة للفصل مقابل غير قابلة للفصل',
    categories: ['Separable Differential Equation', 'Non-Separable Differential Equation'],
    categories_ar: ['معادلة تفاضلية قابلة للفصل', 'معادلة تفاضلية غير قابلة للفصل'],
    items: [
      { s: '\\(\\dfrac{dy}{dx} = x^2 y - x^2\\)', cat: 0 },
      { s: '\\(\\dfrac{dy}{dx} = x + y\\)', cat: 1 },
      { s: '\\(\\dfrac{dy}{dx} = e^{2x - 3y}\\)', cat: 0 },
      { s: '\\(\\dfrac{dy}{dx} = x^2 + y^2\\)', cat: 1 },
      { s: '\\(\\dfrac{dy}{dx} = \\dfrac{xy + 2y}{x + 1}\\)', cat: 0 }
    ],
    items_ar: [
      { s: '\\(\\dfrac{dy}{dx} = x^2 y - x^2\\)', cat: 0 },
      { s: '\\(\\dfrac{dy}{dx} = x + y\\)', cat: 1 },
      { s: '\\(\\dfrac{dy}{dx} = e^{2x - 3y}\\)', cat: 0 },
      { s: '\\(\\dfrac{dy}{dx} = x^2 + y^2\\)', cat: 1 },
      { s: '\\(\\dfrac{dy}{dx} = \\dfrac{xy + 2y}{x + 1}\\)', cat: 0 }
    ],
    sol: 'Separable equations can be factored into a pure function of x times a pure function of y.',
    sol_ar: 'يمكن تحليل المعادلات القابلة للفصل إلى حاصل ضرب دالة في x فقط ودالة في y فقط.'
  }
];

D['ode-linear'] = [
  {
    t: 'sb',
    ti: 'Lab Step Builder: Integrating Factor Method \\(y\' + P(x)y = Q(x)\\)',
    ti_ar: 'بناء خطوات المعمل: طريقة معامل التكامل \\(y\' + P(x)y = Q(x)\\)',
    steps: [
      { l: 'For \\(y\' + 2y = 4\\), identify \\(P(x) = 2\\). Compute integrating factor \\(\mu(x) = e^{\\int 2\\,dx} = e^{\\text{?}}\\):', a: '2x', h: '\\(e^{2x}\\)' },
      { l: 'Multiply through: \\(\\dfrac{d}{dx}[y e^{2x}] = 4e^{2x}\\). Integrate right side: \\(\int 4e^{2x}\\,dx =\\) ? \\(e^{2x} + C\\):', a: '2', h: '\\(4/2 = 2\\)' },
      { l: 'Divide by \\(e^{2x}\\): \\(y = 2 + C e^{-2x}\\). As \\(x\\to\\infty\\), the transient term decays to:', a: '0', h: '\\(e^{-2x} \\to 0\\) as x grows large' }
    ],
    steps_ar: [
      { l: 'للمعادلة \\(y\' + 2y = 4\\)، حدد \\(P(x) = 2\\). احسب معامل التكامل \\(\mu(x) = e^{\\int 2\\,dx} = e^{\\text{?}}\\):', a: '2x', h: '\\(e^{2x}\\)' },
      { l: 'اضرب الطرفين: \\(\\dfrac{d}{dx}[y e^{2x}] = 4e^{2x}\\). كامل الطرف الأيمن: \\(\int 4e^{2x}\\,dx =\\) ؟ \\(e^{2x} + C\\):', a: '2', h: '\\(4/2 = 2\\)' },
      { l: 'اقسم على \\(e^{2x}\\): \\(y = 2 + C e^{-2x}\\). عندما \\(x\\to\\infty\\)، يتلاشى الحد العابر إلى:', a: '0', h: '\\(e^{-2x} \\to 0\\) عندما تكبر قيمة x' }
    ]
  },
  {
    t: 'mt',
    ti: 'Matching Lab: Linear ODE Terminology & Roles',
    ti_ar: 'معمل المطابقة: مصطلحات وأدوار المعادلات التفاضلية الخطية',
    p: [
      { l: 'Integrating factor μ(x)', r: 'exp(∫ P(x) dx)' },
      { l: 'Homogeneous equation', r: 'y\' + P(x)y = 0' },
      { l: 'Transient solution', r: 'Terms decaying to zero as t → ∞' },
      { l: 'Steady-state solution', r: 'Long-term asymptotic behavior' }
    ],
    p_ar: [
      { l: 'معامل التكامل μ(x)', r: 'exp(∫ P(x) dx)' },
      { l: 'معادلة متجانسة', r: 'y\' + P(x)y = 0' },
      { l: 'الحل العابر (Transient)', r: 'حدود تتلاشى إلى الصفر عندما t → ∞' },
      { l: 'حل الحالة المستقرة (Steady-state)', r: 'السلوك التقاربي طويل الأمد' }
    ]
  },
  {
    t: 'qc',
    ti: 'Quick Check: Standard Form Requirement',
    ti_ar: 'فحص سريع: متطلب الصورة القياسية',
    q: 'Before calculating the integrating factor \\(I(x) = e^{\\int P(x)dx}\\) for \\(x y\' + 3y = x^2\\), what must be done first?',
    q_ar: 'قبل حساب معامل التكامل \\(I(x) = e^{\\int P(x)dx}\\) للمعادلة \\(x y\' + 3y = x^2\\)، ما الذي يجب فعله أولاً؟',
    o: ['Divide the entire equation by x so the leading coefficient is 1', 'Integrate directly with P(x) = 3', 'Multiply by x²', 'Set the right-hand side to 0'],
    o_ar: ['قسمة المعادلة بأكملها على x بحيث يصبح المعامل الرئيسي 1', 'التكامل مباشرة مع P(x) = 3', 'الضرب في x²', 'مساواة الطرف الأيمن بالصفر'],
    a: 0,
    ex: 'The integrating factor formula applies only when the coefficient of y\' is strictly 1: y\' + (3/x)y = x.',
    ex_ar: 'لا تنطبق صيغة معامل التكامل إلا عندما يكون معامل y\' يساوي 1 تماماً: y\' + (3/x)y = x.'
  },
  {
    t: 'num',
    ti: 'Asymptotic Steady-State Response Calculation',
    ti_ar: 'حساب استجابة الحالة المستقرة المقاربة',
    q: 'Solve \\(y\' + 3y = 6\\) with \\(y(0) = 5\\). What is the asymptotic steady-state limit \\(\\lim_{t\\to\\infty} y(t)\\)?',
    q_ar: 'حل \\(y\' + 3y = 6\\) مع \\(y(0) = 5\\). ما هي نهاية الحالة المستقرة المقاربة \\(\\lim_{t\\to\\infty} y(t)\\)$؟',
    a: 2,
    tol: 0.001,
    h: 'General solution is y(t) = 2 + 3e^(-3t). As t -> infinity, the exponential term vanishes.',
    h_ar: 'الحل العام هو y(t) = 2 + 3e^(-3t). عندما يقترب t من اللانهاية، يتلاشى الحد الأسي.',
    sol: 'lim_{t->inf} (2 + 3e^(-3t)) = 2.',
    sol_ar: 'lim_{t->inf} (2 + 3e^(-3t)) = 2.'
  },
  {
    t: 'ord',
    ti: 'Order the Steps: Integrating Factor Algorithm',
    ti_ar: 'ترتيب الخطوات: خوارزمية معامل التكامل',
    q: 'Order the steps to solve a first-order linear ODE using an integrating factor:',
    q_ar: 'رتّب خطوات حل معادلة تفاضلية خطية من الرتبة الأولى باستخدام معامل التكامل:',
    items: [
      'Write equation in standard form: y\' + P(x)y = Q(x)',
      'Calculate integrating factor: I(x) = exp(∫ P(x) dx)',
      'Multiply entire equation by I(x) to yield d/dx[I(x) y] = I(x) Q(x)',
      'Integrate both sides: I(x) y = ∫ I(x) Q(x) dx + C',
      'Divide by I(x) to isolate the general solution y(x)'
    ],
    items_ar: [
      'كتابة المعادلة في صورتها القياسية: y\' + P(x)y = Q(x)',
      'حساب معامل التكامل: I(x) = exp(∫ P(x) dx)',
      'ضرب المعادلة بأكملها في I(x) للحصول على d/dx[I(x) y] = I(x) Q(x)',
      'مكاملة الطرفين: I(x) y = ∫ I(x) Q(x) dx + C',
      'القسمة على I(x) لعزل الحل العام y(x)'
    ],
    sol: 'Integrating factor condenses the left side into the derivative of a product via the product rule.',
    sol_ar: 'يكثف معامل التكامل الطرف الأيسر ليصبح مشتقة حاصل ضرب دالتين وفق قاعدة الضرب.'
  },
  {
    t: 'cat',
    ti: 'Classify Response Components of Linear Systems',
    ti_ar: 'تصنيف مركبات الاستجابة للأنظمة الخطية',
    categories: ['Transient Component (Decays to 0 as t → ∞)', 'Steady-State Component (Persists as t → ∞)'],
    categories_ar: ['المركبة العابرة (تتلاشى إلى 0 عندما t → ∞)', 'مركبة الحالة المستقرة (تستمر عندما t → ∞)'],
    items: [
      { s: 'Ce^(-3t) in y(t) = 4 + Ce^(-3t)', cat: 0 },
      { s: 'Constant 4 in y(t) = 4 + Ce^(-3t)', cat: 1 },
      { s: 'Exponential terms e^(-at) with a > 0', cat: 0 },
      { s: 'Persistent sinusoid A cos(ωt) + B sin(ωt)', cat: 1 },
      { s: 'Complementary homogeneous solution y_h when P(t) > 0', cat: 0 }
    ],
    items_ar: [
      { s: 'Ce^(-3t) في y(t) = 4 + Ce^(-3t)', cat: 0 },
      { s: 'الثابت 4 في y(t) = 4 + Ce^(-3t)', cat: 1 },
      { s: 'الحدود الأسية e^(-at) مع a > 0', cat: 0 },
      { s: 'الدالة الجيبية المستمرة A cos(ωt) + B sin(ωt)', cat: 1 },
      { s: 'الحل المتجانس المتمم y_h عندما P(t) > 0', cat: 0 }
    ],
    sol: 'Transient solutions decay exponentially to zero; steady-state solutions represent the forced asymptotic state.',
    sol_ar: 'تتلاشى الحلول العابرة أسياً إلى الصفر؛ بينما تمثل حلول الحالة المستقرة الحالة القسرية المقاربة الدائمة.'
  }
];

D['ode-second-order'] = [
  {
    t: 'sb',
    ti: 'Lab Step Builder: Characteristic Equation of \\(a y\'\' + b y\' + c y = 0\\)',
    ti_ar: 'بناء خطوات المعمل: المعادلة المميزة لـ \\(a y\'\' + b y\' + c y = 0\\)',
    steps: [
      { l: 'For \\(y\'\' - 6y\' + 9y = 0\\), the characteristic equation is \\(r^2 - 6r + 9 = 0\\). The repeated root is \\(r =\\)', a: '3', h: '\\((r-3)^2 = 0\\)' },
      { l: 'For a repeated root \\(r\\), the two linearly independent solutions are \\(e^{rx}\\) and \\(x\\,e^{rx}\\). The general solution has how many arbitrary constants?', a: '2', h: 'Second-order linear ODEs have exactly 2 arbitrary constants' }
    ],
    steps_ar: [
      { l: 'للمعادلة \\(y\'\' - 6y\' + 9y = 0\\)، المعادلة المميزة هي \\(r^2 - 6r + 9 = 0\\). الجذر المكرر هو \\(r =\\)', a: '3', h: '\\((r-3)^2 = 0\\)' },
      { l: 'لجذر مكرر \\(r\\)، الحلان المستقلان خطياً هما \\(e^{rx}\\) و \\(x\\,e^{rx}\\). كم ثابتاً اختيارياً يحتوي الحل العام؟', a: '2', h: 'تحتوي المعادلات التفاضلية الخطية من الرتبة الثانية على ثابتين اختياريين بالضبط' }
    ]
  },
  {
    t: 'mt',
    ti: 'Matching Lab: Characteristic Roots & Solution Behavior',
    ti_ar: 'معمل المطابقة: الجذور المميزة وسلوك الحل',
    p: [
      { l: 'Distinct real roots r₁, r₂', r: 'c₁ e^{r₁x} + c₂ e^{r₂x}' },
      { l: 'Repeated real root r', r: '(c₁ + c₂ x) e^{rx}' },
      { l: 'Complex roots α ± iβ', r: 'e^{αx} (c₁ cos βx + c₂ sin βx)' },
      { l: 'Pure imaginary roots ± iω', r: 'c₁ cos ωx + c₂ sin ωx (undamped)' }
    ],
    p_ar: [
      { l: 'جذران حقيقيان مختلفان r₁, r₂', r: 'c₁ e^{r₁x} + c₂ e^{r₂x}' },
      { l: 'جذر حقيقي مكرر r', r: '(c₁ + c₂ x) e^{rx}' },
      { l: 'جذران مركبان مترافقان α ± iβ', r: 'e^{αx} (c₁ cos βx + c₂ sin βx)' },
      { l: 'جذران تخيليان بحتان ± iω', r: 'c₁ cos ωx + c₂ sin ωx (بدون تخميد)' }
    ]
  },
  {
    t: 'qc',
    ti: 'Quick Check: Critical Damping Condition',
    ti_ar: 'فحص سريع: شرط التخميد الحرج',
    q: 'In the damped spring-mass equation \\(a y\'\' + b y\' + c y = 0\\), what condition produces critical damping?',
    q_ar: 'في معادلة النابض والكتلة المخمدة \\(a y\'\' + b y\' + c y = 0\\)، ما الشرط الذي ينتج تخميداً حرجاً؟',
    o: ['\\(b^2 - 4ac = 0\\)', '\\(b^2 - 4ac > 0\\)', '\\(b^2 - 4ac < 0\\)', '\\(b = 0\\)'],
    o_ar: ['\\(b^2 - 4ac = 0\\)', '\\(b^2 - 4ac > 0\\)', '\\(b^2 - 4ac < 0\\)', '\\(b = 0\\)'],
    a: 0,
    ex: 'Critical damping corresponds to a repeated real characteristic root (discriminant = 0), returning to rest in minimal time without oscillating.',
    ex_ar: 'يتوافق التخميد الحرج مع جذر مميز حقيقي مكرر (المميز = 0)، حيث تعود الحركة إلى موضع السكون في أقل وقت ممكن دون أي تذبذب.'
  },
  {
    t: 'num',
    ti: 'Natural Angular Frequency Calculation',
    ti_ar: 'حساب التردد الزاوي الطبيعي',
    q: 'Find the natural angular frequency \\(\omega\\) in radians/second for the undamped harmonic oscillator \\(y\'\' + 25y = 0\\):',
    q_ar: 'أوجد التردد الزاوي الطبيعي \\(\omega\\) بالراديان/ثانية للمتذبذب التوافقي غير المخمد \\(y\'\' + 25y = 0\\):',
    a: 5,
    tol: 0.001,
    h: 'r² + 25 = 0 => r = ± 5i. Angular frequency ω = 5.',
    h_ar: 'r² + 25 = 0 => r = ± 5i. التردد الزاوي ω = 5.',
    sol: 'r = ± 5i, giving natural frequency ω = 5 rad/s.',
    sol_ar: 'r = ± 5i، مما يعطي التردد الطبيعي ω = 5 rad/s.'
  },
  {
    t: 'ord',
    ti: 'Order the Steps: Solving a Second-Order Homogeneous ODE',
    ti_ar: 'ترتيب الخطوات: حل معادلة متجانسة من الرتبة الثانية',
    q: 'Order the steps to solve a y\'\' + b y\' + c y = 0 with constant coefficients:',
    q_ar: 'رتّب خطوات حل المعادلة a y\'\' + b y\' + c y = 0 ذات المعاملات الثابتة:',
    items: [
      'Substitute y = e^(rt) to form characteristic polynomial a r² + b r + c = 0',
      'Solve for roots r₁, r₂ using factoring or the quadratic formula',
      'Classify roots: distinct real, repeated real, or complex conjugate pair',
      'Write general solution y(t) with two arbitrary constants c₁ and c₂',
      'Differentiate and apply initial conditions y(0) and y\'(0) to determine c₁ and c₂'
    ],
    items_ar: [
      'التعويض بـ y = e^(rt) لتكوين كثيرة الحدود المميزة a r² + b r + c = 0',
      'حل المعادلة لإيجاد الجذور r₁ و r₂ باستخدام التحليل أو القانون العام',
      'تصنيف الجذور: حقيقية مختلفة، حقيقية مكررة، أو زوج مركب مترافق',
      'كتابة الحل العام y(t) متضمناً الثابتين الاختياريين c₁ و c₂',
      'الاشتقاق وتطبيق الشروط الابتدائية y(0) و y\'(0) لتحديد c₁ و c₂'
    ],
    sol: 'Constant-coefficient homogeneous equations reduce to solving a quadratic characteristic equation.',
    sol_ar: 'تؤول المعادلات المتجانسة ذات المعاملات الثابتة إلى حل معادلة تربيعية مميزة.'
  },
  {
    t: 'cat',
    ti: 'Classify Damped Oscillator Regimes',
    ti_ar: 'تصنيف أنظمة المتذبذب المخمد',
    categories: ['Overdamped (b² - 4ac > 0)', 'Critically Damped (b² - 4ac = 0)', 'Underdamped (b² - 4ac < 0)'],
    categories_ar: ['فوق التخميد / زائد (b² - 4ac > 0)', 'تخميد حرج (b² - 4ac = 0)', 'تحت التخميد / ناقص (b² - 4ac < 0)'],
    items: [
      { s: 'Two distinct real negative roots with no oscillation', cat: 0 },
      { s: 'Repeated real root returning to equilibrium fastest without oscillating', cat: 1 },
      { s: 'Complex conjugate roots α ± iβ yielding decaying oscillations', cat: 2 },
      { s: 'y(t) = (c₁ + c₂ t) e^(-2t)', cat: 1 },
      { s: 'y(t) = e^(-t)(c₁ cos(3t) + c₂ sin(3t))', cat: 2 }
    ],
    items_ar: [
      { s: 'جذران حقيقيان سالبان مختلفان دون أي تذبذب', cat: 0 },
      { s: 'جذر حقيقي مكرر يعود للاتزان بأسرع ما يمكن دون تذبذب', cat: 1 },
      { s: 'جذور مركبة مترافقة α ± iβ تنتج تذبذبات متضائلة', cat: 2 },
      { s: 'y(t) = (c₁ + c₂ t) e^(-2t)', cat: 1 },
      { s: 'y(t) = e^(-t)(c₁ cos(3t) + c₂ sin(3t))', cat: 2 }
    ],
    sol: 'Discriminant determines whether motion decays purely monotonically (overdamped/critically damped) or with oscillation (underdamped).',
    sol_ar: 'يحدد المميز ما إذا كانت الحركة تتلاشى رتابة فقط (تخميد زائد/حرج) أو مصحوبة بتذبذبات (تخميد ناقص).'
  }
];

D['ode-undetermined-coefficients'] = [
  {
    t: 'sb',
    ti: 'Lab Step Builder: Selecting the Particular Trial Form \\(y_p\\)',
    ti_ar: 'بناء خطوات المعمل: اختيار الصيغة التجريبية للحل الخاص \\(y_p\\)',
    steps: [
      { l: 'For \\(y\'\' + 4y = 8e^{3x}\\), trial form is \\(y_p = A e^{3x}\\). Compute \\(y_p\'\' = 9A e^{3x}\\). Substitute: \\(9A e^{3x} + 4(A e^{3x}) = 8e^{3x} \\Rightarrow 13A = 8 \\Rightarrow A = 8/\\)', a: '13', h: '\\(9A + 4A = 13A\\)' }
    ],
    steps_ar: [
      { l: 'للمعادلة \\(y\'\' + 4y = 8e^{3x}\\)، الصيغة التجريبية هي \\(y_p = A e^{3x}\\). احسب \\(y_p\'\' = 9A e^{3x}\\). بالتعويض: \\(9A e^{3x} + 4(A e^{3x}) = 8e^{3x} \\Rightarrow 13A = 8 \\Rightarrow A = 8/\\)', a: '13', h: '\\(9A + 4A = 13A\\)' }
    ]
  },
  {
    t: 'qc',
    ti: 'Lab Check: The Resonance / Modification Rule',
    ti_ar: 'فحص المعمل: قاعدة الرنين والتعديل',
    q: 'When solving \\(y\'\' + y = \\cos x\\), the complementary solution is \\(y_c = c_1\\cos x + c_2\\sin x\\). What trial form must be used for \\(y_p\\)?',
    q_ar: 'عند حل \\(y\'\' + y = \\cos x\\)، الحل المتمم هو \\(y_c = c_1\\cos x + c_2\\sin x\\). ما هي الصيغة التجريبية الواجب استخدامها لـ \\(y_p\\)؟',
    o: ['\\(y_p = x(A\\cos x + B\\sin x)\\)', '\\(y_p = A\\cos x + B\\sin x\\)', '\\(y_p = A\\cos x\\)', '\\(y_p = x^2(A\\cos x + B\\sin x)\\)'],
    o_ar: ['\\(y_p = x(A\\cos x + B\\sin x)\\)', '\\(y_p = A\\cos x + B\\sin x\\)', '\\(y_p = A\\cos x\\)', '\\(y_p = x^2(A\\cos x + B\\sin x)\\)'],
    a: 0,
    ex: 'Because \\(\cos x\\) already satisfies the homogeneous equation, we must multiply by \\(x\\) (the resonance modification rule) to obtain a non-colliding particular solution.',
    ex_ar: 'نظراً لأن \\(\cos x\\) يحقق بالفعل المعادلة المتجانسة، يجب الضرب في \\(x\\) (قاعدة تعديل الرنين) لتجنب التطابق والحصول على حل خاص غير صفري.'
  },
  {
    t: 'mt',
    ti: 'Matching: Standard Trial Forms y_p',
    ti_ar: 'معمل المطابقة: الصيغ التجريبية القياسية لـ y_p',
    p: [
      { l: 'Driving g(x) = e^(kx)', r: 'A e^(kx)' },
      { l: 'Driving g(x) = cos(ωx) or sin(ωx)', r: 'A cos(ωx) + B sin(ωx)' },
      { l: 'Driving g(x) = x²', r: 'A x² + B x + C' },
      { l: 'Resonance with homogeneous term', r: 'Multiply trial form by x^s' }
    ],
    p_ar: [
      { l: 'الدالة المحركة g(x) = e^(kx)', r: 'A e^(kx)' },
      { l: 'الدالة المحركة g(x) = cos(ωx) أو sin(ωx)', r: 'A cos(ωx) + B sin(ωx)' },
      { l: 'الدالة المحركة g(x) = x²', r: 'A x² + B x + C' },
      { l: 'الرنين مع حد من الحل المتجانس', r: 'ضرب الصيغة التجريبية في x^s' }
    ]
  },
  {
    t: 'num',
    ti: 'Coefficient Evaluation for Exponential Driving',
    ti_ar: 'حساب المعامل في حالة الدالة الأسية المحركة',
    q: 'For the equation \\(y\'\' - y = 6e^{2x}\\), the particular solution is \\(y_p = A e^{2x}\\). Find the numerical value of \\(A\\):',
    q_ar: 'للمعادلة \\(y\'\' - y = 6e^{2x}\\)، الحل الخاص هو \\(y_p = A e^{2x}\\). أوجد القيمة العددية للمعامل \\(A\\):',
    a: 2,
    tol: 0.001,
    h: 'y_p\'\' - y_p = 4A e^(2x) - A e^(2x) = 3A e^(2x) = 6e^(2x). Solve 3A = 6.',
    h_ar: 'y_p\'\' - y_p = 4A e^(2x) - A e^(2x) = 3A e^(2x) = 6e^(2x). حل المعادلة 3A = 6.',
    sol: '3A = 6 => A = 2.',
    sol_ar: '3A = 6 => A = 2.'
  },
  {
    t: 'ord',
    ti: 'Order the Steps: Method of Undetermined Coefficients',
    ti_ar: 'ترتيب الخطوات: طريقة المعاملات غير المحددة',
    q: 'Order the steps to find the complete general solution y = y_c + y_p to a non-homogeneous ODE:',
    q_ar: 'رتّب خطوات إيجاد الحل العام الكامل y = y_c + y_p لمعادلة تفاضلية غير متجانسة:',
    items: [
      'Solve the homogeneous equation L[y] = 0 to obtain complementary solution y_c',
      'Select initial trial form y_p based on the form of the driving function g(x)',
      'Compare y_p to y_c: multiply terms by x if they duplicate any part of y_c',
      'Differentiate y_p and substitute into the non-homogeneous equation',
      'Equate coefficients of like terms to solve for unknown coefficients in y_p'
    ],
    items_ar: [
      'حل المعادلة المتجانسة L[y] = 0 للحصول على الحل المتمم y_c',
      'اختيار الصيغة التجريبية الأولية y_p بناءً على شكل دالة القوة المحركة g(x)',
      'مقارنة y_p مع y_c: ضرب الحدود في x إذا كانت تكرر أي جزء من y_c',
      'اشتقاق y_p والتعويض بها في المعادلة غير المتجانسة',
      'مساواة معاملات الحدود المتشابهة لحل المعاملات المجهولة في y_p'
    ],
    sol: 'Always determine y_c first to detect resonance and avoid invalid duplicate trial forms.',
    sol_ar: 'حدد دائماً y_c أولاً لاكتشاف الرنين وتجنب الصيغ التجريبية المكررة غير الصالحة.'
  },
  {
    t: 'cat',
    ti: 'Classify Driving Functions: Undetermined Coefficients Applicability',
    ti_ar: 'تصنيف الدوال المحركة: مدى انطباق طريقة المعاملات غير المحددة',
    categories: ['Solvable via Undetermined Coefficients', 'Requires Variation of Parameters'],
    categories_ar: ['قابلة للحل بطريقة المعاملات غير المحددة', 'تتطلب طريقة تغير الثوابت (Variation of Parameters)'],
    items: [
      { s: 'g(x) = 3x² - 5x + 2', cat: 0 },
      { s: 'g(x) = 4e^(3x) sin(2x)', cat: 0 },
      { s: 'g(x) = sec(x)', cat: 1 },
      { s: 'g(x) = ln(x)', cat: 1 },
      { s: 'g(x) = 1 / (1 + x²)', cat: 1 }
    ],
    items_ar: [
      { s: 'g(x) = 3x² - 5x + 2', cat: 0 },
      { s: 'g(x) = 4e^(3x) sin(2x)', cat: 0 },
      { s: 'g(x) = sec(x)', cat: 1 },
      { s: 'g(x) = ln(x)', cat: 1 },
      { s: 'g(x) = 1 / (1 + x²)', cat: 1 }
    ],
    sol: 'Undetermined coefficients requires functions with finite-dimensional derivative families (polynomials, exponentials, sines, cosines).',
    sol_ar: 'تتطلب طريقة المعاملات غير المحددة دوالاً لها عائلات مشتقات ذات أبعاد محدودة (كثيرات الحدود، الدوال الأسية، الجيب، وجيب التمام).'
  }
];

D['ode-variation-of-parameters'] = [
  {
    t: 'sb',
    ti: 'Lab Step Builder: Wronskian Determinant',
    ti_ar: 'بناء خطوات المعمل: محدد فرونسكي',
    steps: [
      { l: 'Compute the Wronskian \\(W(y_1, y_2) = y_1 y_2\' - y_1\' y_2\\) for \\(y_1 = \\cos x, y_2 = \\sin x\\). \\(y_1 y_2\' = \\cos^2 x\\), \\(- y_1\' y_2 = -(-\\sin x)(\\sin x) = \\sin^2 x\\). \\(W = \\cos^2 x + \\sin^2 x =\\)', a: '1', h: 'Pythagorean identity: cos² x + sin² x = 1' }
    ],
    steps_ar: [
      { l: 'احسب محدد فرونسكي \\(W(y_1, y_2) = y_1 y_2\' - y_1\' y_2\\) لـ \\(y_1 = \\cos x, y_2 = \\sin x\\). \\(y_1 y_2\' = \\cos^2 x\\)، و \\(- y_1\' y_2 = -(-\\sin x)(\\sin x) = \\sin^2 x\\). \\(W = \\cos^2 x + \\sin^2 x =\\)', a: '1', h: 'متطابقة فيثاغورس: cos² x + sin² x = 1' }
    ]
  },
  {
    t: 'tf',
    ti: 'Reasoning Lab: Variation of Parameters vs Undetermined Coefficients',
    ti_ar: 'معمل الاستنتاج: تغير الثوابت مقابل المعاملات غير المحددة',
    items: [
      { s: 'Variation of Parameters applies to any forcing function g(x) where integrals can be evaluated (e.g., tan x, sec x).', a: true, ex: 'Unlike undetermined coefficients (limited to polynomials, exponentials, sines/cosines), variation of parameters works for any continuous g(x).' },
      { s: 'The Wronskian of two linearly independent solutions to a homogeneous linear ODE can change signs.', a: false, ex: 'By Abel\'s theorem, the Wronskian is either identically zero or never zero on an interval.' }
    ],
    items_ar: [
      { s: 'تنطبق طريقة تغير الثوابت على أي دالة محركة g(x) يمكن حساب تكاملاتها (مثل tan x و sec x).', ex: 'على عكس طريقة المعاملات غير المحددة (المقتصرة على كثيرات الحدود والدوال الأسية والجيبية)، تعمل طريقة تغير الثوابت مع أي دالة متصلة g(x).' },
      { s: 'يمكن لمحدد فرونسكي لحلين مستقلين خطياً لمعادلة تفاضلية خطية متجانسة أن يغير إشارته.', ex: 'وفقاً لمبرهنة آبل، إما أن يكون محدد فرونسكي صفراً في كل مكان أو لا يساوي صفراً أبداً على أي فترة متصلة.' }
    ]
  },
  {
    t: 'qc',
    ti: 'Lab Check: Formula for Parameter Derivative u₁\'',
    ti_ar: 'فحص المعمل: صيغة مشتقة الوسيط u₁\'',
    q: 'In variation of parameters for \\(y\'\' + p(x)y\' + q(x)y = g(x)\\), what is the formula for \\(u_1\'\\)?',
    q_ar: 'في طريقة تغير الثوابت للمعادلة \\(y\'\' + p(x)y\' + q(x)y = g(x)\\)، ما هي صيغة \\(u_1\'\\)؟',
    o: ['\\(\\dfrac{-y_2 g(x)}{W}\\)', '\\(\\dfrac{y_2 g(x)}{W}\\)', '\\(\\dfrac{y_1 g(x)}{W}\\)', '\\(\\dfrac{-y_1 g(x)}{W}\\)'],
    o_ar: ['\\(\\dfrac{-y_2 g(x)}{W}\\)', '\\(\\dfrac{y_2 g(x)}{W}\\)', '\\(\\dfrac{y_1 g(x)}{W}\\)', '\\(\\dfrac{-y_1 g(x)}{W}\\)'],
    a: 0,
    ex: 'By Cramer\'s rule on the parameter derivative system, u₁\' = -y₂ g(x) / W and u₂\' = y₁ g(x) / W.',
    ex_ar: 'باستخدام قاعدة كرامر على نظام مشتقات الثوابت، نجد أن u₁\' = -y₂ g(x) / W و u₂\' = y₁ g(x) / W.'
  },
  {
    t: 'num',
    ti: 'Evaluate Wronskian Determinant at a Point',
    ti_ar: 'حساب قيمة محدد فرونسكي عند نقطة',
    q: 'Compute the Wronskian \\(W(y_1, y_2)\\) at \\(x = 1\\) for \\(y_1 = x^2\\) and \\(y_2 = x^3\\):',
    q_ar: 'احسب قيمة محدد فرونسكي \\(W(y_1, y_2)\\) عند \\(x = 1\\) للدالتين \\(y_1 = x^2\\) و \\(y_2 = x^3\\):',
    a: 1,
    tol: 0.001,
    h: 'W = x²(3x²) - 2x(x³) = 3x⁴ - 2x⁴ = x⁴. Evaluate at x = 1.',
    h_ar: 'W = x²(3x²) - 2x(x³) = 3x⁴ - 2x⁴ = x⁴. احسب القيمة عند x = 1.',
    sol: 'W = x⁴. At x = 1, W = 1⁴ = 1.',
    sol_ar: 'W = x⁴. عند x = 1، W = 1⁴ = 1.'
  },
  {
    t: 'ord',
    ti: 'Order the Steps: Variation of Parameters',
    ti_ar: 'ترتيب الخطوات: طريقة تغير الثوابت',
    q: 'Order the steps to find a particular solution y_p using variation of parameters:',
    q_ar: 'رتّب خطوات إيجاد الحل الخاص y_p باستخدام طريقة تغير الثوابت:',
    items: [
      'Write ODE in standard form y\'\' + p(x)y\' + q(x)y = g(x) with leading coefficient 1',
      'Obtain fundamental solutions y₁, y₂ to the associated homogeneous equation',
      'Compute the Wronskian determinant W(y₁, y₂) = y₁ y₂\' - y₁\' y₂',
      'Integrate parameter derivatives: u₁ = ∫ (-y₂ g / W) dx and u₂ = ∫ (y₁ g / W) dx',
      'Assemble the particular solution: y_p = u₁ y₁ + u₂ y₂'
    ],
    items_ar: [
      'كتابة المعادلة بالصورة القياسية y\'\' + p(x)y\' + q(x)y = g(x) بمعامل رئيسي يساوي 1',
      'إيجاد الحلين الأساسيين y₁ و y₂ للمعادلة المتجانسة المرتبطة',
      'حساب محدد فرونسكي W(y₁, y₂) = y₁ y₂\' - y₁\' y₂',
      'مكاملة مشتقات الوسائط: u₁ = ∫ (-y₂ g / W) dx و u₂ = ∫ (y₁ g / W) dx',
      'تركيب الحل الخاص: y_p = u₁ y₁ + u₂ y₂'
    ],
    sol: 'Variation of parameters integrates projected components using the Wronskian determinant.',
    sol_ar: 'تعتمد طريقة تغير الثوابت على مكاملة المركبات المسقطة باستخدام محدد فرونسكي.'
  },
  {
    t: 'cat',
    ti: 'Classify Pairs of Functions: Linearly Independent vs. Dependent on ℝ',
    ti_ar: 'تصنيف أزواج الدوال: مستقلة خطياً مقابل مرتبطة خطياً على ℝ',
    categories: ['Linearly Independent (W ≠ 0)', 'Linearly Dependent (W = 0)'],
    categories_ar: ['مستقلة خطياً (W ≠ 0)', 'مرتبطة خطياً (W = 0)'],
    items: [
      { s: 'y₁ = e^(2x) and y₂ = e^(-2x)', cat: 0 },
      { s: 'y₁ = 3x and y₂ = 6x', cat: 1 },
      { s: 'y₁ = cos(x) and y₂ = sin(x)', cat: 0 },
      { s: 'y₁ = x² and y₂ = -4x²', cat: 1 },
      { s: 'y₁ = 1 and y₂ = x', cat: 0 }
    ],
    items_ar: [
      { s: 'y₁ = e^(2x) و y₂ = e^(-2x)', cat: 0 },
      { s: 'y₁ = 3x و y₂ = 6x', cat: 1 },
      { s: 'y₁ = cos(x) و y₂ = sin(x)', cat: 0 },
      { s: 'y₁ = x² و y₂ = -4x²', cat: 1 },
      { s: 'y₁ = 1 و y₂ = x', cat: 0 }
    ],
    sol: 'Functions are linearly dependent if one is a constant multiple of the other, yielding a zero Wronskian.',
    sol_ar: 'تكون الدوال مرتبطة خطياً إذا كانت إحداهما مضاعفاً ثابتاً للأخرى، مما يؤدي إلى محدد فرونسكي يساوي صفراً.'
  }
];

D['ode-laplace-transforms'] = [
  {
    t: 'mt',
    ti: 'Matching Lab: Standard Laplace Transforms \\(\mathcal{L}\\{f(t)\\}\\)',
    ti_ar: 'معمل المطابقة: تحويلات لابلاس القياسية \\(\mathcal{L}\\{f(t)\\}\\)',
    p: [
      { l: 'L{1}', r: '1 / s' },
      { l: 'L{e^{at}}', r: '1 / (s − a)' },
      { l: 'L{sin(ωt)}', r: 'ω / (s² + ω²)' },
      { l: 'L{cos(ωt)}', r: 's / (s² + ω²)' }
    ],
    p_ar: [
      { l: 'L{1}', r: '1 / s' },
      { l: 'L{e^{at}}', r: '1 / (s − a)' },
      { l: 'L{sin(ωt)}', r: 'ω / (s² + ω²)' },
      { l: 'L{cos(ωt)}', r: 's / (s² + ω²)' }
    ]
  },
  {
    t: 'sb',
    ti: 'Lab Step Builder: Derivative Transform Property',
    ti_ar: 'بناء خطوات المعمل: خاصية تحويل المشتقة',
    steps: [
      { l: 'Recall \\(\mathcal{L}\\{y\'(t)\\} = s Y(s) - y(0)\\). If \\(y(0) = 4\\), the transform of \\(y\'\\) is \\(s Y(s) -\\)', a: '4', h: 'Substituted y(0) = 4' }
    ],
    steps_ar: [
      { l: 'تذكر أن \\(\mathcal{L}\\{y\'(t)\\} = s Y(s) - y(0)\\). إذا كان \\(y(0) = 4\\)، فإن تحويل \\(y\'\\) هو \\(s Y(s) -\\)', a: '4', h: 'بالتعويض عن y(0) = 4' }
    ]
  },
  {
    t: 'qc',
    ti: 'Quick Check: First Shift Theorem',
    ti_ar: 'فحص سريع: نظرية الإزاحة الأولى',
    q: 'If \\(\mathcal{L}\\{f(t)\\} = F(s)\\), what is \\(\mathcal{L}\\{e^{at}f(t)\\}\\)?',
    q_ar: 'إذا كان \\(\mathcal{L}\\{f(t)\\} = F(s)\\)، فما هو \\(\mathcal{L}\\{e^{at}f(t)\\}\\)؟',
    o: ['\\(F(s - a)\\)', '\\(F(s + a)\\)', '\\(e^{-as} F(s)\\)', '\\(a F(s)\\)'],
    o_ar: ['\\(F(s - a)\\)', '\\(F(s + a)\\)', '\\(e^{-as} F(s)\\)', '\\(a F(s)\\)'],
    a: 0,
    ex: 'Multiplying by e^(at) in the time domain corresponds to an algebraic frequency shift s -> s - a in the s-domain.',
    ex_ar: 'الضرب في e^(at) في النطاق الزمني يتوافق مع إزاحة ترددية جبرية s -> s - a في نطاق s.'
  },
  {
    t: 'num',
    ti: 'Evaluate Transformed Frequency Value',
    ti_ar: 'حساب قيمة التردد المحول',
    q: 'Find the value of \\(F(3)\\) for the Laplace transform \\(F(s) = \\mathcal{L}\\{e^{2t}\\}\\):',
    q_ar: 'أوجد قيمة \\(F(3)\\) لتحويل لابلاس \\(F(s) = \\mathcal{L}\\{e^{2t}\\}\\):',
    a: 1,
    tol: 0.001,
    h: 'F(s) = 1 / (s - 2). Evaluate at s = 3: 1 / (3 - 2).',
    h_ar: 'F(s) = 1 / (s - 2). احسب القيمة عند s = 3: 1 / (3 - 2).',
    sol: 'F(3) = 1 / (3 - 2) = 1.',
    sol_ar: 'F(3) = 1 / (3 - 2) = 1.'
  },
  {
    t: 'ord',
    ti: 'Order the Steps: Solving Initial Value Problems via Laplace Transform',
    ti_ar: 'ترتيب الخطوات: حل مسائل القيمة الابتدائية بتحويل لابلاس',
    q: 'Order the steps to solve an initial value problem using the Laplace transform:',
    q_ar: 'رتّب خطوات حل مسألة القيمة الابتدائية باستخدام تحويل لابلاس:',
    items: [
      'Take the Laplace transform of both sides of the differential equation',
      'Substitute initial conditions y(0) and y\'(0) into transformed derivative terms',
      'Algebraically isolate Y(s) = L{y(t)}',
      'Decompose Y(s) into partial fractions matching standard transform table entries',
      'Apply the inverse Laplace transform to recover the solution y(t)'
    ],
    items_ar: [
      'أخذ تحويل لابلاس لطرفي المعادلة التفاضلية',
      'تعويض الشروط الابتدائية y(0) و y\'(0) في حدود المشتقات المحولة',
      'عزل دالة Y(s) = L{y(t)} جبرياً',
      'تفكيك Y(s) باستخدام الكسور الجزئية لتتطابق مع جداول تحويل لابلاس القياسية',
      'تطبيق تحويل لابلاس العكسي لاستعادة دالة الحل y(t)'
    ],
    sol: 'Laplace transform converts differential equations into algebraic problems, solving initial values automatically.',
    sol_ar: 'يحول تحويل لابلاس المعادلات التفاضلية إلى مسائل جبرية، ويدمج الشروط الابتدائية تلقائياً.'
  },
  {
    t: 'cat',
    ti: 'Classify Laplace Transforms by Function Family',
    ti_ar: 'تصنيف تحويلات لابلاس حسب عائلة الدوال',
    categories: ['Power / Polynomial tⁿ', 'Exponential e^(at)', 'Sinusoid cos(ωt) or sin(ωt)'],
    categories_ar: ['قوى / كثيرات الحدود tⁿ', 'الدالة الأسية e^(at)', 'الدوال الجيبية cos(ωt) أو sin(ωt)'],
    items: [
      { s: 'n! / s^(n+1)', cat: 0 },
      { s: '1 / (s - a)', cat: 1 },
      { s: 's / (s² + ω²)', cat: 2 },
      { s: 'ω / (s² + ω²)', cat: 2 },
      { s: '1 / s²', cat: 0 }
    ],
    items_ar: [
      { s: 'n! / s^(n+1)', cat: 0 },
      { s: '1 / (s - a)', cat: 1 },
      { s: 's / (s² + ω²)', cat: 2 },
      { s: 'ω / (s² + ω²)', cat: 2 },
      { s: '1 / s²', cat: 0 }
    ],
    sol: 'Polynomials yield powers in the denominator; exponentials shift the pole; sinusoids generate quadratic denominators (s² + ω²).',
    sol_ar: 'تنتج كثيرات الحدود قوى في المقام؛ بينما تزيح الدوال الأسية القطب؛ وتنتج الدوال الجيبية مقامات تربيعية (s² + ω²).'
  }
];

D['ode-systems'] = [
  {
    t: 'sb',
    ti: 'Lab Step Builder: Phase Plane Eigenvalues for \\(\\mathbf{x}\' = A\\mathbf{x}\\)',
    ti_ar: 'بناء خطوات المعمل: القيم الذاتية في مستوى الطور لـ \\(\\mathbf{x}\' = A\\mathbf{x}\\)',
    steps: [
      { l: 'For \\(A = \\begin{pmatrix}0 & 1 \\\\ -4 & 0\\end{pmatrix}\\), compute \\(\det(A - \\lambda I) = \\lambda^2 +\\)', a: '4', h: '\\(\lambda^2 - 0\\lambda + 4 = 0\\)' },
      { l: 'The eigenvalues are purely imaginary: \\(\lambda = \\pm 2i\\). The equilibrium at the origin is a stable: (center/spiral/node)', a: 'center', h: 'Pure imaginary eigenvalues produce concentric closed elliptical orbits, which is a center.' }
    ],
    steps_ar: [
      { l: 'للمصفوفة \\(A = \\begin{pmatrix}0 & 1 \\\\ -4 & 0\\end{pmatrix}\\)، احسب \\(\det(A - \\lambda I) = \\lambda^2 +\\)', a: '4', h: '\\(\lambda^2 - 0\\lambda + 4 = 0\\)' },
      { l: 'القيم الذاتية تخيلية بحتة: \\(\lambda = \\pm 2i\\). نقطة الاتزان عند الأصل هي: (center/spiral/node)', a: 'center', h: 'تنتج القيم الذاتية التخيلية البحتة مدارات إهليلجية مغلقة متحدة المركز، وهي تمثل مركزاً (Center).' }
    ]
  },
  {
    t: 'mt',
    ti: 'Matching Lab: 2D System Phase Portraits & Eigenvalues',
    ti_ar: 'معمل المطابقة: صور الطور والقيم الذاتية للأنظمة ثنائية الأبعاد',
    p: [
      { l: 'Real roots, same sign (both negative)', r: 'Stable nodal sink' },
      { l: 'Real roots, opposite signs (+ and −)', r: 'Saddle point (unstable)' },
      { l: 'Complex roots with negative real part', r: 'Stable spiral sink' },
      { l: 'Pure imaginary roots (zero real part)', r: 'Center (closed periodic orbits)' }
    ],
    p_ar: [
      { l: 'جذور حقيقية من نفس الإشارة (كلاهما سالب)', r: 'عقدة بئر مستقرة (Stable nodal sink)' },
      { l: 'جذور حقيقية بإشارات مختلفة (+ و −)', r: 'نقطة سرج غير مستقرة (Saddle point)' },
      { l: 'جذور مركبة بجزء حقيقي سالب', r: 'بؤرة لولبية مستقرة (Stable spiral sink)' },
      { l: 'جذور تخيلية بحتة (جزء حقيقي صفري)', r: 'مركز (مدارات دورية مغلقة)' }
    ]
  },
  {
    t: 'qc',
    ti: 'Quick Check: Trace-Determinant Stability Criterion',
    ti_ar: 'فحص سريع: معيار الاستقرار للأثر والمحدد',
    q: 'For a 2D linear system \\(\mathbf{x}\' = A\\mathbf{x}\\), if \\(\text{tr}(A) < 0\\) and \\(\det(A) > 0\\), the origin is:',
    q_ar: 'لنظام خطي ثنائي الأبعاد \\(\mathbf{x}\' = A\\mathbf{x}\\)، إذا كان \\(\text{tr}(A) < 0\\) و \\(\det(A) > 0\\)، فإن نقطة الأصل تكون:',
    o: ['Asymptotically stable (sink)', 'Unstable (saddle or source)', 'Neutrally stable center', 'Inconclusive'],
    o_ar: ['مستقرة تقاربياً (بئر/مصب)', 'غير مستقرة (سرج أو منبع)', 'مركز مستقر محايداً', 'غير حاسم'],
    a: 0,
    ex: 'When tr(A) < 0 and det(A) > 0, the eigenvalues must either be both real negative or complex with negative real part, ensuring asymptotic stability.',
    ex_ar: 'عندما يكون tr(A) < 0 و det(A) > 0، تكون القيم الذاتية إما سالبة حقيقية أو مركبة بجزء حقيقي سالب، مما يضمن الاستقرار التقاربي.'
  },
  {
    t: 'num',
    ti: 'Find Larger Eigenvalue from Matrix Invariants',
    ti_ar: 'إيجاد القيمة الذاتية الكبرى من لامتغيرات المصفوفة',
    q: 'A 2×2 matrix A has trace \\(\text{tr}(A) = -5\\) and determinant \\(\det(A) = 6\\). What is the larger eigenvalue \\(\lambda\\)?',
    q_ar: 'مصفوفة 2×2 اسمها A لها أثر \\(\text{tr}(A) = -5\\) ومحدد \\(\det(A) = 6\\). ما هي القيمة الذاتية الكبرى \\(\lambda\\)؟',
    a: -2,
    tol: 0.001,
    h: 'λ² - (-5)λ + 6 = 0 => (λ + 2)(λ + 3) = 0. The eigenvalues are -2 and -3. Which is larger?',
    h_ar: 'λ² - (-5)λ + 6 = 0 => (λ + 2)(λ + 3) = 0. القيم الذاتية هي -2 و -3. أيهما أكبر؟',
    sol: 'Roots are -2 and -3. The larger eigenvalue is -2.',
    sol_ar: 'الجذور هي -2 و -3. القيمة الذاتية الكبرى هي -2.'
  },
  {
    t: 'ord',
    ti: 'Order the Steps: Solving x\' = Ax for Distinct Eigenvalues',
    ti_ar: 'ترتيب الخطوات: حل x\' = Ax للقيم الذاتية المختلفة',
    q: 'Order the steps to solve a system x\' = Ax when matrix A has distinct real eigenvalues:',
    q_ar: 'رتّب خطوات حل النظام x\' = Ax عندما تمتلك المصفوفة A قيماً ذاتية حقيقية مختلفة:',
    items: [
      'Solve characteristic polynomial det(A - λI) = 0 for eigenvalues λ₁, λ₂',
      'For each eigenvalue, solve (A - λ_i I)v_i = 0 for linearly independent eigenvector v_i',
      'Construct fundamental vector solutions x_i(t) = e^(λ_i t) v_i',
      'Form general solution via superposition: x(t) = c₁ e^(λ₁ t) v₁ + c₂ e^(λ₂ t) v₂',
      'Apply initial vector condition x(0) = x₀ to solve for scalar constants c₁ and c₂'
    ],
    items_ar: [
      'حل المعادلة المميزة det(A - λI) = 0 لإيجاد القيم الذاتية λ₁ و λ₂',
      'حل المعادلة (A - λ_i I)v_i = 0 لكل قيمة ذاتية لإيجاد المتجه الذاتي المستقل خطياً v_i',
      'بناء حلول المتجهات الأساسية x_i(t) = e^(λ_i t) v_i',
      'تكوين الحل العام عن طريق التراكب: x(t) = c₁ e^(λ₁ t) v₁ + c₂ e^(λ₂ t) v₂',
      'تطبيق شرط المتجه الابتدائي x(0) = x₀ لحساب الثوابت القياسية c₁ و c₂'
    ],
    sol: 'Eigenvalues provide exponential growth/decay rates, and eigenvectors determine invariant straight-line trajectories.',
    sol_ar: 'توفر القيم الذاتية معدلات النمو/التلاشي الأسي، بينما تحدد المتجهات الذاتية المسارات الخطية المستقيمة الثابتة.'
  },
  {
    t: 'cat',
    ti: 'Classify Phase Plane Equilibria by Trajectory Behavior',
    ti_ar: 'تصنيف نقاط اتزان مستوى الطور حسب سلوك المسارات',
    categories: ['Asymptotically Stable Sink', 'Unstable Saddle or Source', 'Neutrally Stable Center'],
    categories_ar: ['بئر مستقر تقاربياً (Sink)', 'سرج أو منبع غير مستقر', 'مركز مستقر محايداً (Center)'],
    items: [
      { s: 'Both eigenvalues are real and negative', cat: 0 },
      { s: 'One positive real eigenvalue and one negative real eigenvalue', cat: 1 },
      { s: 'Pure imaginary eigenvalues ± iω with zero real part', cat: 2 },
      { s: 'Complex eigenvalues -α ± iβ with α > 0', cat: 0 },
      { s: 'Both eigenvalues are real and positive', cat: 1 }
    ],
    items_ar: [
      { s: 'كلتا القيمتين الذاتيتين حقيقية وسالبة', cat: 0 },
      { s: 'قيمة ذاتية حقيقية موجبة وقيمة ذاتية حقيقية سالبة', cat: 1 },
      { s: 'قيم ذاتية تخيلية بحتة ± iω بجزء حقيقي صفري', cat: 2 },
      { s: 'قيم ذاتية مركبة -α ± iβ مع α > 0', cat: 0 },
      { s: 'كلتا القيمتين الذاتيتين حقيقية وموجبة', cat: 1 }
    ],
    sol: 'Negative real parts draw trajectories inward (stable sink); positive real parts drive trajectories outward; pure imaginary creates closed orbits (center).',
    sol_ar: 'تجذب الأجزاء الحقيقية السالبة المسارات نحو الداخل (بئر مستقر)؛ بينما تدفع الأجزاء الموجبة المسارات للخارج؛ وتنتج القيم التخيلية البحتة مدارات مغلقة (مركز).'
  }
];

D['ode-series-solutions'] = [
  {
    t: 'sb',
    ti: 'Lab Step Builder: Power Series Index Shifting',
    ti_ar: 'بناء خطوات المعمل: إزاحة دليل متسلسلات القوى',
    steps: [
      { l: 'If \\(y = \\sum_{n=0}^\\infty c_n x^n\\), then \\(y\' = \\sum_{n=1}^\\infty n c_n x^{n-1}\\). Shift index by letting \\(k = n-1\\): the sum becomes \\(\sum_{k=0}^\\infty (k+1) c_{k+1} x^k\\). The coefficient of \\(x^0\\) is:', a: 'c_1', h: 'For k=0, (0+1)c_1 = c_1' }
    ],
    steps_ar: [
      { l: 'إذا كانت \\(y = \\sum_{n=0}^\\infty c_n x^n\\)، فإن \\(y\' = \\sum_{n=1}^\\infty n c_n x^{n-1}\\). بإزاحة الدليل بوضع \\(k = n-1\\): يصبح المجموع \\(\sum_{k=0}^\\infty (k+1) c_{k+1} x^k\\). معامل \\(x^0\\) هو:', a: 'c_1', h: 'لـ k=0، نجد (0+1)c_1 = c_1' }
    ]
  },
  {
    t: 'qc',
    ti: 'Lab Check: Ordinary vs Singular Points',
    ti_ar: 'فحص المعمل: النقاط العادية مقابل النقاط الشاذة',
    q: 'For the equation \\(x^2 y\'\' + x y\' + (x^2 - 4)y = 0\\), the point \\(x = 0\\) is:',
    q_ar: 'للمعادلة \\(x^2 y\'\' + x y\' + (x^2 - 4)y = 0\\)، النقطة \\(x = 0\\) هي:',
    o: ['A regular singular point', 'An ordinary point', 'An irregular singular point', 'Not a critical point'],
    o_ar: ['نقطة شاذة منتظمة', 'نقطة عادية', 'نقطة شاذة غير منتظمة', 'ليست نقطة حرجة'],
    a: 0,
    ex: 'Dividing by \\(x^2\\) gives \\(P(x) = 1/x\\) and \\(Q(x) = 1 - 4/x^2\\). Both \\(x P(x) = 1\\) and \\(x^2 Q(x) = x^2 - 4\\) are analytic at \\(x=0\\), making \\(x=0\\) a regular singular point.',
    ex_ar: 'القسمة على \\(x^2\\) تعطي \\(P(x) = 1/x\\) و \\(Q(x) = 1 - 4/x^2\\). كل من \\(x P(x) = 1\\) و \\(x^2 Q(x) = x^2 - 4\\) دالتان تحليليتان عند \\(x=0\\)، مما يجعل \\(x=0\\) نقطة شاذة منتظمة.'
  },
  {
    t: 'mt',
    ti: 'Matching: Series Solution Concepts',
    ti_ar: 'معمل المطابقة: مفاهيم حلول المتسلسلات',
    p: [
      { l: 'Ordinary point x₀', r: 'Coefficients P(x) and Q(x) are analytic at x₀' },
      { l: 'Regular singular point', r: '(x - x₀)P(x) and (x - x₀)²Q(x) are analytic' },
      { l: 'Recurrence relation', r: 'Expresses higher-order coefficient a_{n+k} in terms of earlier terms' },
      { l: 'Indicial equation', r: 'Quadratic equation determining powers r in Frobenius method' }
    ],
    p_ar: [
      { l: 'نقطة عادية x₀', r: 'المعاملان P(x) و Q(x) تحليليان عند x₀' },
      { l: 'نقطة شاذة منتظمة', r: '(x - x₀)P(x) و (x - x₀)²Q(x) تحليليان' },
      { l: 'علاقة تكرارية (Recurrence)', r: 'تعبر عن المعامل a_{n+k} بدلالة المعاملات السابقة' },
      { l: 'معادلة دليلية (Indicial)', r: 'معادلة تربيعية تحدد القوى r في طريقة فروبنيوس' }
    ]
  },
  {
    t: 'num',
    ti: 'Recurrence Relation Coefficient Evaluation',
    ti_ar: 'حساب معامل العلاقة التكرارية',
    q: 'For \\(y\'\' + y = 0\\), substituting \\(y = \\sum a_n x^n\\) gives \\(a_{n+2} = -\\frac{a_n}{(n+2)(n+1)}\\). If \\(a_0 = 12\\), compute \\(a_2\\):',
    q_ar: 'للمعادلة \\(y\'\' + y = 0\\)، التعويض بـ \\(y = \\sum a_n x^n\\) يعطي \\(a_{n+2} = -\\frac{a_n}{(n+2)(n+1)}\\). إذا كان \\(a_0 = 12\\)، فاحسب \\(a_2\\):',
    a: -6,
    tol: 0.001,
    h: 'For n = 0: a₂ = -a₀ / ((2)(1)) = -12 / 2.',
    h_ar: 'عند n = 0: a₂ = -a₀ / ((2)(1)) = -12 / 2.',
    sol: 'a₂ = -12 / 2 = -6.',
    sol_ar: 'a₂ = -12 / 2 = -6.'
  },
  {
    t: 'ord',
    ti: 'Order the Steps: Series Solution about an Ordinary Point',
    ti_ar: 'ترتيب الخطوات: الحل بالمتسلسلات حول نقطة عادية',
    q: 'Order the steps to find a power series solution y = ∑ a_n xⁿ about x₀ = 0:',
    q_ar: 'رتّب خطوات إيجاد حل بمتسلسلة قوى y = ∑ a_n xⁿ حول x₀ = 0:',
    items: [
      'Confirm that x₀ = 0 is an ordinary point where P(x) and Q(x) are analytic',
      'Assume power series y = ∑ a_n xⁿ and differentiate to obtain y\' and y\'\'',
      'Substitute expansions into the ODE and distribute any polynomial coefficients',
      'Shift summation indices so that all sums share the common power xⁿ',
      'Equate coefficients of like powers to zero to derive the recurrence relation'
    ],
    items_ar: [
      'التحقق من أن x₀ = 0 نقطة عادية حيث P(x) و Q(x) تحليليتان عندها',
      'افتراض متسلسلة القوى y = ∑ a_n xⁿ والاشتقاق للحصول على y\' و y\'\'',
      'تعويض المفكوكات في المعادلة وتوزيع معاملات كثيرات الحدود',
      'إزاحة أدلة الجمع بحيث تشترك جميع المتسلسلات في القوة المشتركة xⁿ',
      'مساواة معاملات القوى المتشابهة بالصفر لاستنتاج العلاقة التكرارية'
    ],
    sol: 'Power series solutions align exponents across all series terms to extract recurrence relations.',
    sol_ar: 'توحد حلول متسلسلات القوى الأسس عبر جميع حدود المتسلسلة لاستخراج العلاقات التكرارية.'
  },
  {
    t: 'cat',
    ti: 'Classify Differential Equation Points',
    ti_ar: 'تصنيف نقاط المعادلات التفاضلية',
    categories: ['Ordinary Point', 'Regular Singular Point', 'Irregular Singular Point'],
    categories_ar: ['نقطة عادية', 'نقطة شاذة منتظمة', 'نقطة شاذة غير منتظمة'],
    items: [
      { s: 'x = 0 for y\'\' + x y\' + y = 0', cat: 0 },
      { s: 'x = 0 for x² y\'\' + x y\' + (x² - 1)y = 0', cat: 1 },
      { s: 'x = 0 for x³ y\'\' + y = 0', cat: 2 },
      { s: 'x = 2 for (x - 2) y\'\' + y = 0', cat: 1 },
      { s: 'Any point where the leading coefficient does not vanish', cat: 0 }
    ],
    items_ar: [
      { s: 'x = 0 للمعادلة y\'\' + x y\' + y = 0', cat: 0 },
      { s: 'x = 0 للمعادلة x² y\'\' + x y\' + (x² - 1)y = 0', cat: 1 },
      { s: 'x = 0 للمعادلة x³ y\'\' + y = 0', cat: 2 },
      { s: 'x = 2 للمعادلة (x - 2) y\'\' + y = 0', cat: 1 },
      { s: 'أي نقطة لا ينعدم عندها المعامل الرئيسي', cat: 0 }
    ],
    sol: 'Ordinary points have non-zero leading coefficient; regular singular points have poles removable by (x-x₀) and (x-x₀)².',
    sol_ar: 'النقاط العادية لا ينعدم عندها المعامل الرئيسي؛ بينما النقاط الشاذة المنتظمة تمتلك أقطاباً يمكن إزالتها بـ (x-x₀) و (x-x₀)².'
  }
];

D['ode-numerical-methods'] = [
  {
    t: 'sb',
    ti: 'Lab Step Builder: Euler\'s Method Single Step',
    ti_ar: 'بناء خطوات المعمل: خطوة واحدة بطريقة أويلر',
    steps: [
      { l: 'Given \\(y\' = x + y\\), \\(y(0) = 1\\), step size \\(h = 0.1\\). Compute initial slope \\(f(0, 1) = 0 + 1 =\\)', a: '1', h: '\\(0 + 1 = 1\\)' },
      { l: 'Euler formula: \\(y_1 = y_0 + h\\cdot f(x_0, y_0) = 1 + 0.1(1) =\\)', a: '1.1', h: '\\(1 + 0.1 = 1.1\\)' },
      { l: 'New x-coordinate is \\(x_1 = x_0 + h =\\)', a: '0.1', h: '\\(0 + 0.1 = 0.1\\)' }
    ],
    steps_ar: [
      { l: 'بالمعادلة \\(y\' = x + y\\)، و \\(y(0) = 1\\)، وحجم الخطوة \\(h = 0.1\\). احسب الميل الابتدائي \\(f(0, 1) = 0 + 1 =\\)', a: '1', h: '\\(0 + 1 = 1\\)' },
      { l: 'صيغة أويلر: \\(y_1 = y_0 + h\\cdot f(x_0, y_0) = 1 + 0.1(1) =\\)', a: '1.1', h: '\\(1 + 0.1 = 1.1\\)' },
      { l: 'الإحداثي السيني الجديد هو \\(x_1 = x_0 + h =\\)', a: '0.1', h: '\\(0 + 0.1 = 0.1\\)' }
    ]
  },
  {
    t: 'qc',
    ti: 'Lab Check: Error Order Comparison',
    ti_ar: 'فحص المعمل: مقارنة رتبة الخطأ',
    q: 'The global truncation error of standard Euler\'s method is \\(O(h)\\). What is the global truncation error of the classical Runge–Kutta (RK4) method?',
    q_ar: 'خطأ البتر الكلي لطريقة أويلر القياسية هو \\(O(h)\\). ما هو خطأ البتر الكلي لطريقة رونج-كوتا التقليدية (RK4)؟',
    o: ['\\(O(h^4)\\)', '\\(O(h^2)\\)', '\\(O(h)\\)', '\\(O(h^3)\\)'],
    o_ar: ['\\(O(h^4)\\)', '\\(O(h^2)\\)', '\\(O(h)\\)', '\\(O(h^3)\\)'],
    a: 0,
    ex: 'RK4 is a 4th-order method, meaning halving the step size \\(h\\) reduces global error by approximately a factor of \\(2^4 = 16\\).',
    ex_ar: 'طريقة RK4 هي طريقة من الرتبة الرابعة، مما يعني أن تنصيف حجم الخطوة \\(h\\) يقلل الخطأ الكلي بمعامل يقارب \\(2^4 = 16\\).'
  },
  {
    t: 'mt',
    ti: 'Matching: Numerical Solvers and Error Orders',
    ti_ar: 'معمل المطابقة: طرق الحل العددية ورتب الخطأ',
    p: [
      { l: 'Standard Euler\'s Method', r: '1st order: Global error O(h)' },
      { l: 'Improved Euler / Heun\'s', r: '2nd order: Global error O(h²)' },
      { l: 'Classical Runge–Kutta (RK4)', r: '4th order: Global error O(h⁴)' },
      { l: 'Stiff Equation instability', r: 'Requires tiny step size h in explicit schemes' }
    ],
    p_ar: [
      { l: 'طريقة أويلر القياسية', r: 'رتبة أولى: خطأ كلي O(h)' },
      { l: 'طريقة أويلر المعدلة / هيون (Heun)', r: 'رتبة ثانية: خطأ كلي O(h²)' },
      { l: 'طريقة رونج-كوتا التقليدية (RK4)', r: 'رتبة رابعة: خطأ كلي O(h⁴)' },
      { l: 'عدم استقرار المعادلات المتصلبة (Stiff)', r: 'تتطلب خطوة h متناهية الصغر في الطرق الصريحة' }
    ]
  },
  {
    t: 'num',
    ti: 'Two-Step Euler Approximation',
    ti_ar: 'تقريب أويلر بخطوتين',
    q: 'Given \\(y\' = 2x\\) with \\(y(0) = 0\\), compute the Euler estimate \\(y_2\\) after 2 steps with step size \\(h = 0.5\\):',
    q_ar: 'بالمعادلة \\(y\' = 2x\\) مع \\(y(0) = 0\\)، احسب تقدير أويلر \\(y_2\\) بعد خطوتين بحجم خطوة \\(h = 0.5\\):',
    a: 0.5,
    tol: 0.001,
    h: 'Step 1: y₁ = 0 + 0.5(2·0) = 0 at x₁ = 0.5. Step 2: y₂ = 0 + 0.5(2·0.5) = 0 + 0.5(1) = 0.5.',
    h_ar: 'الخطوة 1: y₁ = 0 + 0.5(2·0) = 0 عند x₁ = 0.5. الخطوة 2: y₂ = 0 + 0.5(2·0.5) = 0 + 0.5(1) = 0.5.',
    sol: 'y₁ = 0; slope at x₁ = 0.5 is 2(0.5) = 1. y₂ = 0 + 0.5(1) = 0.5.',
    sol_ar: 'y₁ = 0؛ الميل عند x₁ = 0.5 هو 2(0.5) = 1. إذن y₂ = 0 + 0.5(1) = 0.5.'
  },
  {
    t: 'ord',
    ti: 'Order the Steps: Single Iteration of RK4 Algorithm',
    ti_ar: 'ترتيب الخطوات: تكرار واحد لخوارزمية RK4',
    q: 'Order the steps to compute y_{n+1} from y_n using the 4th-order Runge–Kutta (RK4) method:',
    q_ar: 'رتّب خطوات حساب y_{n+1} من y_n باستخدام طريقة رونج-كوتا من الرتبة الرابعة (RK4):',
    items: [
      'Evaluate initial slope: k₁ = f(x_n, y_n)',
      'Evaluate midpoint slope with k₁: k₂ = f(x_n + h/2, y_n + h k₁ / 2)',
      'Evaluate refined midpoint slope with k₂: k₃ = f(x_n + h/2, y_n + h k₂ / 2)',
      'Evaluate endpoint slope with k₃: k₄ = f(x_n + h, y_n + h k₃)',
      'Compute weighted average update: y_{n+1} = y_n + (h/6)(k₁ + 2k₂ + 2k₃ + k₄)'
    ],
    items_ar: [
      'حساب الميل الابتدائي: k₁ = f(x_n, y_n)',
      'حساب ميل نقطة المنتصف باستخدام k₁: k₂ = f(x_n + h/2, y_n + h k₁ / 2)',
      'حساب ميل نقطة المنتصف المحسّن باستخدام k₂: k₃ = f(x_n + h/2, y_n + h k₂ / 2)',
      'حساب ميل نقطة النهاية باستخدام k₃: k₄ = f(x_n + h, y_n + h k₃)',
      'حساب التحديث المتوسط المرجح: y_{n+1} = y_n + (h/6)(k₁ + 2k₂ + 2k₃ + k₄)'
    ],
    sol: 'RK4 takes two midpoint evaluations and one endpoint evaluation to cancel error up to order h⁴.',
    sol_ar: 'تأخذ طريقة RK4 تقييمين عند المنتصف وتقييماً عند النهاية لإلغاء الخطأ حتى الرتبة h⁴.'
  },
  {
    t: 'cat',
    ti: 'Classify Numerical Solvers: First-Order vs. Fourth-Order',
    ti_ar: 'تصنيف طرق الحل العددية: الرتبة الأولى مقابل الرتبة الرابعة',
    categories: ['First-Order Solver (Euler: O(h) Global Error)', 'Fourth-Order Solver (RK4: O(h⁴) Global Error)'],
    categories_ar: ['طريقة حل من الرتبة الأولى (أويلر: خطأ كلي O(h))', 'طريقة حل من الرتبة الرابعة (RK4: خطأ كلي O(h⁴))'],
    items: [
      { s: 'y_{n+1} = y_n + h f(x_n, y_n)', cat: 0 },
      { s: 'Four function evaluations per time step (k₁, k₂, k₃, k₄)', cat: 1 },
      { s: 'Halving step size h reduces global error by factor of 16', cat: 1 },
      { s: 'Halving step size h reduces global error by only a factor of 2', cat: 0 },
      { s: 'Update formula uses weighted slope sum (k₁ + 2k₂ + 2k₃ + k₄)/6', cat: 1 }
    ],
    items_ar: [
      { s: 'y_{n+1} = y_n + h f(x_n, y_n)', cat: 0 },
      { s: 'أربعة تقييمات للدالة لكل خطوة زمنية (k₁, k₂, k₃, k₄)', cat: 1 },
      { s: 'تنصيف حجم الخطوة h يقلل الخطأ الكلي بمعامل 16', cat: 1 },
      { s: 'تنصيف حجم الخطوة h يقلل الخطأ الكلي بمعامل 2 فقط', cat: 0 },
      { s: 'تستخدم صيغة التحديث مجموع ميول مرجح (k₁ + 2k₂ + 2k₃ + k₄)/6', cat: 1 }
    ],
    sol: 'Euler is 1st-order with single evaluation; RK4 is 4th-order using four evaluations per step to achieve O(h⁴) convergence.',
    sol_ar: 'طريقة أويلر من الرتبة الأولى بتقييم واحد؛ بينما RK4 من الرتبة الرابعة بأربعة تقييمات لكل خطوة لتحقيق تقارب من الرتبة O(h⁴).'
  }
];

});
