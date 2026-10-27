/* Interactive Practice data for /apbc/ - one entry per chapter section id.
   Shipped as public/js/ix/apbc.js and loaded only on that track's page by the
   engine in src/scripts/modules/19-interactive-activities-engine-v1.js
   (Plan 5 Phase 5.015, ADR 0033). Entry shapes (qc/mt/tf/sb/sr/fn/num/ord/cat/gp/se/ms) are
   documented there. */
(window.__ixData = window.__ixData || []).push(function (D) {
D["apbc-overview"] = [
  {
    "t": "qc",
    "ti": "Quick Check: AP Calculus BC Distinct Units",
    "ti_ar": "فحص سريع: الوحدات المتمايزة في مقرر AP Calculus BC",
    "q": "Which major curriculum topics are covered in AP Calculus BC but NOT in AP Calculus AB?",
    "q_ar": "ما هي الموضوعات الرئيسية في المنهج التي يغطيها مقرر AP Calculus BC ولا يشملها مقرر AP Calculus AB؟",
    "o": [
      "Infinite series (Unit 10), polar/parametric vector calculus (Unit 9), and advanced integration techniques",
      "Related rates, optimization, and implicit differentiation",
      "Limits at infinity and continuity",
      "The Fundamental Theorem of Calculus Parts 1 & 2"
    ],
    "o_ar": [
      "المتسلسلات اللانهائية (الوحدة 10)، وحساب تفاضل وتكامل المنحنيات القطبية/الوسيطية والمتجهات (الوحدة 9)، وتقنيات التكامل المتقدمة",
      "المعدلات المرتبطة بالزمن، وتطبيقات القيم القصوى، والاشتقاق الضمني",
      "النهايات عند اللانهاية والاتصال",
      "النظرية الأساسية للتفاضل والتكامل الجزآن 1 و2"
    ],
    "a": 0,
    "ex": "AP Calculus BC includes everything in AB plus Unit 9 (Parametric, Polar, and Vector-valued functions), Unit 10 (Infinite Sequences and Series), and techniques like integration by parts and partial fractions.",
    "ex_ar": "يشمل AP Calculus BC كل موضوعات AB بالإضافة إلى الوحدة 9 (الدوال الوسيطية والقطبية ومتجهة القيمة)، والوحدة 10 (المتتابعات والمتسلسلات اللانهائية)، وتقنيات مثل التكامل بالتجزيء والكسور الجزئية."
  },
  {
    "t": "mt",
    "ti": "Matching: AP Calculus BC Convergence Tests",
    "ti_ar": "مطابقة: اختبارات التقارب في AP Calculus BC",
    "p": [
      {
        "l": "Geometric Series",
        "r": "Converges if and only if |r| < 1"
      },
      {
        "l": "p-Series",
        "r": "Converges if and only if p > 1"
      },
      {
        "l": "Ratio Test",
        "r": "Inconclusive if limit of ratio equals 1"
      },
      {
        "l": "Alternating Series Test",
        "r": "Terms alternate, decrease in absolute value, and limit is 0"
      }
    ],
    "p_ar": [
      {
        "l": "المتسلسلة الهندسية",
        "r": "تتقارب إذا وفقط إذا كان |r| < 1"
      },
      {
        "l": "متسلسلة p",
        "r": "تتقارب إذا وفقط إذا كان p > 1"
      },
      {
        "l": "اختبار النسبة",
        "r": "غير حاسم إذا كانت نهاية النسبة تساوي 1"
      },
      {
        "l": "اختبار المتسلسلة المتناوبة",
        "r": "الحدود متناوبة، وتتناقص في قيمتها المطلقة، ونهايتها تساوي صفر"
      }
    ]
  },
  {
    "t": "num",
    "ti": "AP Calculus BC Composite Score Calculation",
    "ti_ar": "حساب الدرجة المركبة لاختبار AP Calculus BC",
    "q": "On the AP Calculus BC exam, Section I (45 MCQs) is weighted by 1.20 and Section II (6 FRQs) is weighted by 1.00 (108 composite points total). If a student scores 35 on Section I and 33 on Section II, compute their composite score.",
    "q_ar": "في اختبار AP Calculus BC، يُضرب القسم الأول (45 سؤال اختيار من متعدد) في المعامل 1.20 والقسم الثاني (6 أسئلة مقالية) في المعامل 1.00 (إجمالي 108 درجات مركبة). إذا حصل طالب على 35 درجة في القسم الأول و33 في القسم الثاني، فاحسب درجته المركبة.",
    "a": 75,
    "tol": 0.01,
    "h": "Composite = (35 × 1.20) + (33 × 1.00).",
    "h_ar": "الدرجة المركبة = (35 × 1.20) + (33 × 1.00).",
    "sol": "Section I contributes 35 × 1.2 = 42 points. Section II contributes 33 points. Total composite = 42 + 33 = 75 points (comfortably an AP 5).",
    "sol_ar": "يساهم القسم الأول بـ 35 × 1.2 = 42 درجة. ويساهم القسم الثاني بـ 33 درجة. الدرجة المركبة الإجمالية = 42 + 33 = 75 درجة (وهي درجة تؤهل بجدارة للحصول على 5 في AP)."
  },
  {
    "t": "ord",
    "ti": "Order of Operations for Section II FRQ Strategy",
    "ti_ar": "ترتيب استراتيجية إدارة الوقت والآلة في أسئلة القسم الثاني المقالية",
    "q": "Arrange the recommended time and tool strategy for Section II (Free Response):",
    "q_ar": "رتب الاستراتيجية الموصى بها لإدارة الوقت والأدوات في القسم الثاني (الأسئلة المقالية):",
    "items": [
      "Read both Part A questions during the opening minutes to identify familiar physical or geometric models",
      "Execute Part A (Questions 1 & 2, 30 min) leveraging graphing calculator capabilities (numerical derivatives, definite integrals, equation solvers)",
      "Store all calculator functions in Y1/Y2 and avoid rounding intermediate numerical values before the final 3 decimal places",
      "Transition to Part B (Questions 3 through 6, 60 min, non-calculator)",
      "Pace ~15 minutes each for Questions 3, 4, 5, and reserve a full 15 minutes for Question 6 (Taylor series & error bounds)"
    ],
    "items_ar": [
      "قراءة كلا سؤالي الجزء أ خلال الدقائق الأولى لتحديد النماذج الفيزيائية أو الهندسية المألوفة",
      "تنفيذ الجزء أ (السؤالان 1 و2، 30 دقيقة) بالاستفادة الكاملة من إمكانيات الآلة الحاسبة البيانية (المشتقات العددية، التكاملات المحدودة، حل المعادلات)",
      "تخزين جميع دوال الآلة الحاسبة في Y1/Y2 وتجنب تقريب القيم العددية الوسيطية قبل المنزلة العشرية الثالثة في الناتج النهائي",
      "الانتقال إلى الجزء ب (الأسئلة من 3 إلى 6، 60 دقيقة، بدون آلة حاسبة)",
      "تخصيص حوالي 15 دقيقة لكل من الأسئلة 3 و4 و5، وتخصيص 15 دقيقة كاملة للسؤال 6 (متسلسلات تايلور وحدود الخطأ)"
    ],
    "sol": "Part A requires calculator precision and intermediate storage; Part B requires careful analytical algebra and disciplined pacing.",
    "sol_ar": "يتطلب الجزء أ دقة في استخدام الآلة الحاسبة وتخزين القيم؛ بينما يتطلب الجزء ب مهارات جبرية تحليلية دقيقة وانضباطاً في الوقت."
  },
  {
    "t": "cat",
    "ti": "Classify AP Exam Section Attributes",
    "ti_ar": "تصنيف سمات أقسام اختبار AP",
    "categories": [
      "Section I (Multiple Choice)",
      "Section II (Free Response)"
    ],
    "categories_ar": [
      "القسم الأول (اختيار من متعدد)",
      "القسم الثاني (أسئلة مقالية)"
    ],
    "items": [
      {
        "s": "45 questions total in 105 minutes",
        "s_ar": "45 سؤالاً في المجموع خلال 105 دقائق",
        "cat": 0
      },
      {
        "s": "6 multi-part questions in 90 minutes",
        "s_ar": "6 أسئلة متعددة الأجزاء خلال 90 دقيقة",
        "cat": 1
      },
      {
        "s": "Machine scored with no partial credit for incorrect choices",
        "s_ar": "تصحيح آلي بالكامل دون درجات جزئية للخيارات غير الصحيحة",
        "cat": 0
      },
      {
        "s": "Scored by AP readers on standard 9-point rubrics with method points",
        "s_ar": "يصححها مقيّمو AP وفق نموذج درجات قياسي من 9 درجات مع درجات على الخطوات",
        "cat": 1
      },
      {
        "s": "Part A has 30 non-calculator questions in 60 minutes",
        "s_ar": "يضم الجزء أ 30 سؤالاً بدون حاسبة في 60 دقيقة",
        "cat": 0
      },
      {
        "s": "Question 6 is dedicated to Taylor Series and error bounding",
        "s_ar": "يُخصص السؤال 6 لمتسلسلات تايلور وحساب حدود الخطأ",
        "cat": 1
      }
    ],
    "sol": "Section I consists of 45 MCQs (50% score). Section II consists of 6 FRQs (50% score, 54 raw points).",
    "sol_ar": "يتكون القسم الأول من 45 سؤال اختيار من متعدد (50% من الدرجة). ويتكون القسم الثاني من 6 أسئلة مقالية (50% من الدرجة، 54 درجة خام)."
  },
  {
    "t": "se",
    "ti": "Spot the Error: Implicit Differentiation & Product Rule (AP Calculus BC Exam Format & Units Overview)",
    "q": "A student differentiates the implicit curve \\(x^2 + 5xy + y^2 = 5\\) with respect to \\(x\\). Identify the step with the mathematical flaw:",
    "steps": [
      "Differentiate \\(x^2\\) with respect to \\(x\\) to obtain \\(2x\\).",
      "Differentiate the middle term \\(5xy\\) with respect to \\(x\\) as \\(5\\dfrac{dy}{dx}\\).",
      "Differentiate \\(y^2\\) using the Chain Rule as \\(2y\\dfrac{dy}{dx}\\) and the constant \\(5\\) as \\(0\\).",
      "Collect \\(\\dfrac{dy}{dx}\\) terms and divide to isolate \\(\\dfrac{dy}{dx}\\)."
    ],
    "errorStep": 2,
    "reasons": [
      "The term \\(5xy\\) is a product of two functions of \\(x\\); by the Product Rule its derivative is \\(5y + 5x\\dfrac{dy}{dx}\\), not \\(5\\dfrac{dy}{dx}\\).",
      "The derivative of \\(y^2\\) with respect to \\(x\\) is simply \\(2y\\) without \\(\\dfrac{dy}{dx}\\).",
      "The constant \\(5\\) remains \\(5\\) after differentiation."
    ],
    "correctReason": 0,
    "h": "Look closely at how the product \\(5xy\\) was differentiated in Step 2.",
    "sol": "Applying the Product Rule to \\(5xy\\) gives \\(5y + 5x\\dfrac{dy}{dx}\\). Thus \\(2x + 5y + (5x + 2y)\\dfrac{dy}{dx} = 0 \\implies \\dfrac{dy}{dx} = -\\dfrac{2x + 5y}{5x + 2y}\\).",
    "ti_ar": "اكتشف الخطأ: الاشتقاق الضمني وقاعدة الضرب (AP Calculus BC Exam Format & Units Overview)",
    "q_ar": "يقوم طالب باشتقاق العلاقة الضمنية \\(x^2 + 5xy + y^2 = 5\\) بالنسبة إلى \\(x\\). حدد الخطوة الخاطئة:",
    "steps_ar": [
      "اشتقاق \\(x^2\\) بالنسبة إلى \\(x\\) ليعطي \\(2x\\).",
      "اشتقاق الحد الأوسط \\(5xy\\) بالنسبة إلى \\(x\\) على أنه \\(5\\dfrac{dy}{dx}\\).",
      "اشتقاق \\(y^2\\) بقاعدة السلسلة ليعطي \\(2y\\dfrac{dy}{dx}\\) ومشتقة الثابت \\(0\\).",
      "تجميع حدود \\(\\dfrac{dy}{dx}\\) وقسمة الطرفين لعزل المشتقة."
    ],
    "reasons_ar": [
      "الحد \\(5xy\\) حاصل ضرب دالتين في \\(x\\)؛ وبقاعدة الضرب مشتقته هي \\(5y + 5x\\dfrac{dy}{dx}\\).",
      "مشتقة \\(y^2\\) هي \\(2y\\) فقط دون \\(\\dfrac{dy}{dx}\\).",
      "مشتقة الثابت تبقى كما هي."
    ],
    "h_ar": "راجع كيفية اشتقاق حاصل الضرب \\(5xy\\) في الخطوة الثانية.",
    "sol_ar": "بتطبيق قاعدة الضرب على \\(5xy\\) نحصل على \\(5y + 5x\\dfrac{dy}{dx}\\)، ومنه \\(\\dfrac{dy}{dx} = -\\dfrac{2x + 5y}{5x + 2y}\\)."
  },
  {
    "t": "ms",
    "ti": "Examiner Mode: Tangent, Normal & Stationary Points (AP Calculus BC Exam Format & Units Overview)",
    "q": "Consider the curve \\(y = 5x^3 - x^2 + 4\\). (a) Find \\(\\dfrac{dy}{dx}\\) and the gradient of the tangent at \\(x = 0\\). (b) Find the \\(x\\)-coordinates of the stationary points.",
    "parts": [
      {
        "label": "Part (a) — First Derivative & Tangent Gradient",
        "marks": 3,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "Differentiate term by term using the power rule: \\(\\dfrac{dy}{dx} = 15x^2 - 2x\\)."
          },
          {
            "code": "M1",
            "marks": 1,
            "text": "Substitute \\(x = 0\\): \\(m = 15(0)^2 - 2(0)\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "Obtain exact tangent gradient \\(m = -2\\)."
          }
        ]
      },
      {
        "label": "Part (b) — Stationary Points Condition",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "Set \\(\\dfrac{dy}{dx} = 0 \\implies x(15x - 2) = 0\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "State both stationary \\(x\\)-coordinates: \\(x = 0\\) and \\(x = \\dfrac{2}{15}\\)."
          }
        ]
      }
    ],
    "examinerTip": "Always show the explicit equation \\(\\dfrac{dy}{dx} = 0\\) before solving for stationary points—this earns the M1 method mark even if an arithmetic slip occurs.",
    "ti_ar": "وضع المصحح: المماس والنقاط الحرجة (AP Calculus BC Exam Format & Units Overview)",
    "q_ar": "لمنحنى الدالة \\(y = 5x^3 - x^2 + 4\\): (أ) أوجد \\(\\dfrac{dy}{dx}\\) وميل المماس عند \\(x = 0\\). (ب) أوجد الإحداثيات السينية للنقاط الحرجة.",
    "examinerTip_ar": "اكتب دائماً شرط النقطة الحرجة \\(\\dfrac{dy}{dx} = 0\\) صراحةً لضمان الحصول على درجة الطريقة (M1)."
  },
  {
    "t": "sb",
    "ti": "Step Builder: Instantaneous Rate of Change (AP Calculus BC Exam Format & Units Overview)",
    "steps": [
      {
        "l": "Given \\(f(x) = 5x^2 + x - 5\\), find the coefficient of \\(x\\) in \\(f'(x)\\):",
        "a": "10",
        "h": "Multiply power 2 by 5."
      },
      {
        "l": "Find the constant term in \\(f'(x)\\):",
        "a": "1",
        "h": "The derivative of x is 1."
      },
      {
        "l": "Evaluate the instantaneous rate of change \\(f'(0) =\\)",
        "a": "1",
        "h": "Compute 10(0) + 1."
      }
    ],
    "ti_ar": "بناء الخطوات: حساب المشتقة ومعدل التغير اللحظي (AP Calculus BC Exam Format & Units Overview)",
    "steps_ar": [
      {
        "l": "للدالة \\(f(x) = 5x^2 + x - 5\\)، معامل \\(x\\) في \\(f'(x)\\) يساوي:",
        "a": "10",
        "h": "اضرب الأس 2 في 5."
      },
      {
        "l": "الحد الثابت في المشتقة \\(f'(x)\\) يساوي:",
        "a": "1",
        "h": "مشتقة x هي 1."
      },
      {
        "l": "احسب قيمة المشتقة \\(f'(0) =\\)",
        "a": "1",
        "h": "احسب 10(0) + 1."
      }
    ]
  },
  {
    "t": "qc",
    "ti": "Quick Check: Vertex & Minimum Analysis (AP Calculus BC Exam Format & Units Overview)",
    "ti_ar": "فحص سريع: تحليل نقطة الرأس والقيمة الصغرى (AP Calculus BC Exam Format & Units Overview)",
    "q": "What is the minimum value of \\( f(x) = (x - 3)^2 + 5 \\) over all real \\( x \\)?",
    "q_ar": "ما هي القيمة الصغرى للدالة \\( f(x) = (x - 3)^2 + 5 \\) لكل \\( x \\in \\mathbb{R} \\)؟",
    "o": [
      "\\( 5 \\)",
      "\\( 3 \\)",
      "\\( -3 \\)",
      "\\( 14 \\)"
    ],
    "o_ar": [
      "\\( 5 \\)",
      "\\( 3 \\)",
      "\\( -3 \\)",
      "\\( 14 \\)"
    ],
    "a": 0,
    "ex": "Since \\( (x - 3)^2 \\ge 0 \\), the minimum value is \\( 5 \\) achieved at \\( x = 3 \\).",
    "ex_ar": "بما أن المربع الكامل غير سالب، فإن القيمة الصغرى هي \\( 5 \\) عند \\( x = 3 \\)."
  }
];

D["apbc-beyond"] = [
  {
    "t": "sr",
    "ti": "Worked Example: Improper Integral",
    "ti_ar": "مثال محلول: التكامل المعتل",
    "steps": [
      "Evaluate \\(\\displaystyle\\int_1^{\\infty}\\dfrac{1}{x^2}\\,dx\\). Rewrite as a limit: \\(\\displaystyle\\lim_{b\\to\\infty}\\int_1^b x^{-2}\\,dx\\).",
      "Antiderivative: \\(\\left[-\\dfrac1x\\right]_1^b=-\\dfrac1b+1\\).",
      "Take the limit as \\(b\\to\\infty\\): \\(-\\dfrac1b\\to0\\), so the integral converges to \\(1\\)."
    ],
    "steps_ar": [
      "احسب \\(\\displaystyle\\int_1^{\\infty}\\dfrac{1}{x^2}\\,dx\\). أعد كتابته بصيغة نهاية: \\(\\displaystyle\\lim_{b\\to\\infty}\\int_1^b x^{-2}\\,dx\\).",
      "المشتقة العكسية: \\(\\left[-\\dfrac1x\\right]_1^b=-\\dfrac1b+1\\).",
      "احسب النهاية عندما \\(b\\to\\infty\\): يقترب \\(-\\dfrac1b\\to0\\)، وبالتالي يتقارب التكامل إلى \\(1\\)."
    ]
  },
  {
    "t": "cat",
    "ti": "Classify Topics: AP Calculus AB vs. AP Calculus BC",
    "ti_ar": "تصنيف الموضوعات: AP Calculus AB مقابل AP Calculus BC",
    "categories": [
      "Both AB & BC",
      "BC Only"
    ],
    "categories_ar": [
      "مشترك بين AB و BC",
      "خاص بـ BC فقط"
    ],
    "items": [
      {
        "s": "Mean Value Theorem & L'Hôpital's Rule",
        "s_ar": "نظرية القيمة المتوسطة وقاعدة لوبيتال",
        "cat": 0
      },
      {
        "s": "Integration by Parts & Partial Fractions",
        "s_ar": "التكامل بالتجزيء والكسور الجزئية",
        "cat": 1
      },
      {
        "s": "Euler's Method & Logistic Differential Equations",
        "s_ar": "طريقة أويلر والمعادلات التفاضلية اللوجستية",
        "cat": 1
      },
      {
        "s": "Related Rates & Analytical Optimization",
        "s_ar": "المعدلات المرتبطة بالزمن وتطبيقات القيم القصوى التحليلية",
        "cat": 0
      },
      {
        "s": "Taylor Polynomials & Lagrange Error Bound",
        "s_ar": "كثيرات حدود تايلور وحد خطأ لاغرانج",
        "cat": 1
      },
      {
        "s": "Parametric Arc Length & Polar Area",
        "s_ar": "طول القوس بالمعادلات الوسيطية ومساحة المنحنيات القطبية",
        "cat": 1
      }
    ],
    "sol": "Units 1–8 are common to both exams. Integration by parts, partial fractions, Euler's method, logistic growth, parametric/polar calculus, and infinite series are BC-exclusive.",
    "sol_ar": "الوحدات من 1 إلى 8 مشتركة بين الاختبارين. أما التكامل بالتجزيء، والكسور الجزئية، وطريقة أويلر، والنمو اللوجستي، وتفاضل وتكامل المنحنيات الوسيطية والقطبية، والمتسلسلات اللانهائية فهي موضوعات حصرية لـ BC."
  },
  {
    "t": "qc",
    "ti": "Quick Check: Improper Integrals",
    "ti_ar": "فحص سريع: التكاملات المعتلة",
    "q": "An improper integral \\(\\int_1^\\infty\\frac1{x^p}\\,dx\\) converges when:",
    "q_ar": "يتقارب التكامل المعتل \\(\\int_1^\\infty\\frac1{x^p}\\,dx\\) عندما يكون:",
    "o": [
      "\\(p>1\\)",
      "\\(p<1\\)",
      "\\(p=1\\)",
      "\\(p=0\\)"
    ],
    "o_ar": [
      "\\(p>1\\)",
      "\\(p<1\\)",
      "\\(p=1\\)",
      "\\(p=0\\)"
    ],
    "a": 0,
    "ex": "The p-integral test: convergence requires \\(p>1\\).",
    "ex_ar": "اختبار تكامل p: التقارب يتطلب \\(p>1\\)."
  },
  {
    "t": "num",
    "ti": "Parametric Slope Evaluation",
    "ti_ar": "حساب ميل المنحنى الوسيطي",
    "q": "A curve is given parametrically by \\(x(t) = t^2 + 3t\\) and \\(y(t) = 4t^3 - t\\). Find the slope of the curve \\(\\frac{dy}{dx}\\) at \\(t = 1\\).",
    "q_ar": "منحنى معطى وسيطياً بالمعادلتين \\(x(t) = t^2 + 3t\\) و\\(y(t) = 4t^3 - t\\). أوجد ميل المنحنى \\(\\frac{dy}{dx}\\) عند \\(t = 1\\).",
    "a": 2.2,
    "tol": 0.01,
    "h": "Compute \\(\\frac{dx}{dt}\\) and \\(\\frac{dy}{dt}\\) at \\(t = 1\\), then find \\(\\frac{dy/dt}{dx/dt}\\).",
    "h_ar": "احسب \\(\\frac{dx}{dt}\\) و\\(\\frac{dy}{dt}\\) عند \\(t = 1\\)، ثم اقسم \\(\\frac{dy/dt}{dx/dt}\\).",
    "sol": "\\(\\frac{dx}{dt} = 2t + 3\\Big|_{t=1} = 5\\). \\(\\frac{dy}{dt} = 12t^2 - 1\\Big|_{t=1} = 11\\). The slope is \\(\\frac{dy}{dx} = \\frac{11}{5} = 2.2\\).",
    "sol_ar": "\\(\\frac{dx}{dt} = 2t + 3\\Big|_{t=1} = 5\\). \\(\\frac{dy}{dt} = 12t^2 - 1\\Big|_{t=1} = 11\\). الميل هو \\(\\frac{dy}{dx} = \\frac{11}{5} = 2.2\\)."
  },
  {
    "t": "ord",
    "ti": "Order the Steps: Evaluating an Improper Integral",
    "ti_ar": "ترتيب الخطوات: حساب التكامل المعتل",
    "q": "Arrange the sequence to evaluate \\(\\int_1^\\infty \\frac{1}{x^2}\\,dx\\) with full AP rubric justification:",
    "q_ar": "رتب خطوات حساب التكامل \\(\\int_1^\\infty \\frac{1}{x^2}\\,dx\\) مع التبرير الكامل لنموذج درجات AP:",
    "items": [
      "Identify the unbounded infinite upper limit of integration",
      "Replace \\(\\infty\\) with a dummy variable \\(b\\) and apply limit notation: \\(\\lim_{b\\to\\infty}\\int_1^b x^{-2}\\,dx\\)",
      "Find the antiderivative: \\(\\int x^{-2}\\,dx = -\\frac{1}{x}\\)",
      "Evaluate the definite integral expression between limits: \\(\\left[-\\frac{1}{b} - (-1)\\right] = 1 - \\frac{1}{b}\\)",
      "Compute the limit as \\(b \\to \\infty\\): since \\(\\lim_{b\\to\\infty}\\frac{1}{b} = 0\\), the integral converges to 1"
    ],
    "items_ar": [
      "تحديد الحد العلوي اللانهائي غير المحدود للتكامل",
      "استبدال \\(\\infty\\) بمتغير وسيط \\(b\\) وكتابة صيغة النهاية: \\(\\lim_{b\\to\\infty}\\int_1^b x^{-2}\\,dx\\)",
      "إيجاد المشتقة العكسية: \\(\\int x^{-2}\\,dx = -\\frac{1}{x}\\)",
      "حساب مقدار التكامل المحدود بين الحدين: \\(\\left[-\\frac{1}{b} - (-1)\\right] = 1 - \\frac{1}{b}\\)",
      "حساب النهاية عندما \\(b \\to \\infty\\): بما أن \\(\\lim_{b\\to\\infty}\\frac{1}{b} = 0\\)، فإن التكامل يتقارب إلى 1"
    ],
    "sol": "AP readers require explicit limit notation when working with improper integrals.",
    "sol_ar": "يشترط مقيمو AP كتابة رمز النهاية صراحة عند التعامل مع التكاملات المعتلة."
  },
  {
    "t": "se",
    "ti": "Spot the Error: Algebraic & Domain Verification (Beyond AB — Core BC Topics Overview)",
    "q": "A student solves the equation \\(\\sqrt{2x + 4} = x - 2\\) step by step. Which step introduces an invalid conclusion?",
    "steps": [
      "Square both sides to eliminate the radical: \\(2x + 4 = (x - 2)^2\\).",
      "Expand the right-hand side: \\(2x + 4 = x^2 - 4x + 4\\).",
      "Rearrange and factor: \\(x^2 - 6x = 0 \\implies x(x - 6) = 0\\).",
      "Conclude that both \\(x = 0\\) and \\(x = 6\\) are valid real solutions."
    ],
    "errorStep": 4,
    "reasons": [
      "Substituting \\(x = 0\\) into the original equation gives \\(\\sqrt{4} = -2\\) (\\(2 = -2\\)), which is false because the principal square root is non-negative (\\(x - 2 \\ge 0\\) requires \\(x \\ge 2\\)).",
      "Expanding \\((x - 2)^2\\) should give \\(x^2 - 4\\) with no middle term.",
      "Factoring \\(x^2 - 6x = 0\\) only yields \\(x = 6\\)."
    ],
    "correctReason": 0,
    "h": "Test \\(x = 0\\) in the original equation \\(\\sqrt{2x + 4} = x - 2\\).",
    "sol": "Squaring both sides is a non-reversible step unless \\(x - 2 \\ge 0 \\iff x \\ge 2\\). Therefore \\(x = 0\\) is an extraneous root and \\(x = 6\\) is the unique solution.",
    "ti_ar": "اكتشف الخطأ: الجذور الدخيلة والتحقق من المجال (Beyond AB — Core BC Topics Overview)",
    "q_ar": "يحل طالب المعادلة \\(\\sqrt{2x + 4} = x - 2\\) خطوة بخطوة. أي خطوة تتضمن استنتاجاً خاطئاً؟",
    "steps_ar": [
      "تربيع الطرفين للتخلص من الجذر: \\(2x + 4 = (x - 2)^2\\).",
      "فك المربع الكامل: \\(2x + 4 = x^2 - 4x + 4\\).",
      "الترتيب والتحليل: \\(x^2 - 6x = 0 \\implies x(x - 6) = 0\\).",
      "استنتاج أن كلاً من \\(x = 0\\) و \\(x = 6\\) حلان صحيحان للمعادلة الأصلية."
    ],
    "reasons_ar": [
      "التعويض عن \\(x = 0\\) في المعادلة الأصلية يعطي \\(2 = -2\\) وهو مستحيل لأن الجذر التربيعي الأساسي غير سالب (يجب أن يتحقق \\(x \\ge 2\\)).",
      "فك التربيع غير صحيح.",
      "التحليل بإخراج العامل المشترك غير صحيح."
    ],
    "h_ar": "عوّض عن \\(x = 0\\) في المعادلة الأصلية للتحقق من إشارة الطرف الأيمن.",
    "sol_ar": "الشرط اللازم هو \\(x - 2 \\ge 0 \\implies x \\ge 2\\)، لذا يُرفض الجذر الدخيل \\(x = 0\\) ويبقى \\(x = 6\\) فقط."
  },
  {
    "t": "ms",
    "ti": "Examiner Mode: Multi-Step Structured Problem (Beyond AB — Core BC Topics Overview)",
    "q": "Let \\(f(x) = x^2 - 4x + 9\\) for \\(x \\ge 2\\). (a) Express \\(f(x)\\) in completed-square vertex form and state the range of \\(f\\). (b) Find an expression for the inverse function \\(f^{-1}(x)\\) and state its domain.",
    "parts": [
      {
        "label": "Part (a) — Vertex Form & Range",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "Complete the square: \\(f(x) = (x - 2)^2 - 4 + 9 = (x - 2)^2 + 5\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "State exact range: \\(f(x) \\ge 5\\) (or \\([5, \\infty)\\))."
          }
        ]
      },
      {
        "label": "Part (b) — Inverse Function & Domain",
        "marks": 3,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "Set \\(y = (x - 2)^2 + 5 \\implies (x - 2)^2 = y - 5\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "Select positive branch (since \\(x \\ge 2\\)): \\(f^{-1}(x) = 2 + \\sqrt{x - 5}\\)."
          },
          {
            "code": "B1",
            "marks": 1,
            "text": "State domain of \\(f^{-1}\\): \\(x \\ge 5\\) (matching the range of \\(f\\))."
          }
        ]
      }
    ],
    "examinerTip": "Writing \\(\\pm\\sqrt{x - 5}\\) for \\(f^{-1}(x)\\) loses the final A1 mark because a function must be single-valued; use the domain restriction \\(x \\ge 2\\) to choose the \\(+\\) sign.",
    "ti_ar": "وضع المصحح: إكمال المربع والدالة العكسية (Beyond AB — Core BC Topics Overview)",
    "q_ar": "لتكن \\(f(x) = x^2 - 4x + 9\\) حيث \\(x \\ge 2\\). (أ) اكتب \\(f(x)\\) في صورة المربع الكامل وحدد مداها. (ب) أوجد قاعدة الدالة العكسية \\(f^{-1}(x)\\) ومجالها.",
    "examinerTip_ar": "الدالة العكسية يجب أن تكون وحيدة القيمة، لذا نختار الإشارة الموجبة للجذر \\(2 + \\sqrt{x - 5}\\) لأن \\(x \\ge 2\\)."
  },
  {
    "t": "sb",
    "ti": "Step Builder: Completing the Square & Vertex Analysis (Beyond AB — Core BC Topics Overview)",
    "steps": [
      {
        "l": "In \\(y = x^2 - 4x + 9\\), halve the \\(x\\)-coefficient to write \\((x - h)^2\\) where \\(h =\\)",
        "a": "2",
        "h": "Take half of 4."
      },
      {
        "l": "Compute the minimum value \\(k = 9 - 2^2 =\\)",
        "a": "5",
        "h": "Subtract 4 from 9."
      },
      {
        "l": "Evaluate \\(y\\) when \\(x = 4\\): \\(y =\\)",
        "a": "9",
        "h": "Compute \\((2)^2 + 5\\)."
      }
    ],
    "ti_ar": "بناء الخطوات: إكمال المربع وإيجاد القيمة الصغرى (Beyond AB — Core BC Topics Overview)",
    "steps_ar": [
      {
        "l": "في الدالة \\(y = x^2 - 4x + 9\\): قيمة \\(h\\) في \\((x - h)^2\\) تساوي:",
        "a": "2",
        "h": "اقسم معامل x وهو 4 على 2."
      },
      {
        "l": "احسب القيمة الصغرى \\(k = 9 - 2^2 =\\)",
        "a": "5",
        "h": "اطرح 4 من 9."
      },
      {
        "l": "احسب قيمة \\(y\\) عندما \\(x = 4\\):",
        "a": "9",
        "h": "احسب \\(4 + 5\\)."
      }
    ]
  },
  {
    "t": "mt",
    "ti": "Matching: Core Algebraic & Analytic Principles (Beyond AB — Core BC Topics Overview)",
    "p": [
      {
        "l": "\\(b^2 - 4ac = 0\\)",
        "r": "Line is tangent to the quadratic curve (1 repeated root)"
      },
      {
        "l": "\\(\\text{dom}(f^{-1})\\)",
        "r": "Equals \\(\\text{ran}(f)\\) (Range of original function)"
      },
      {
        "l": "\\(f(x - h) + k\\)",
        "r": "Translation by vector \\(\\binom{h}{k}\\)"
      },
      {
        "l": "\\(x_1 + x_2 = -b/a,\\; x_1 x_2 = c/a\\)",
        "r": "Vieta's root-coefficient relations"
      }
    ],
    "ti_ar": "مطابقة: المبادئ الجبرية والتحليلية الأساسية (Beyond AB — Core BC Topics Overview)",
    "p_ar": [
      {
        "l": "\\(b^2 - 4ac = 0\\)",
        "r": "المستقيم مماس للمنحنى التربيعي (جذر حقيقي مكرر)"
      },
      {
        "l": "\\(\\text{dom}(f^{-1})\\)",
        "r": "يساوي مدى الدالة الأصلية \\(\\text{ran}(f)\\)"
      },
      {
        "l": "\\(f(x - h) + k\\)",
        "r": "إزاحة هندسية بالمتجه \\(\\binom{h}{k}\\)"
      },
      {
        "l": "\\(x_1 + x_2 = -b/a,\\; x_1 x_2 = c/a\\)",
        "r": "علاقات فييت بين الجذور والمعاملات"
      }
    ]
  }
];

D["apbc-c1"] = [
  {
    "t": "num",
    "ti": "Evaluate Definite Integral by Parts",
    "ti_ar": "حساب التكامل المحدود بالتجزيء",
    "q": "Evaluate \\(\\displaystyle\\int_0^1 x e^x\\,dx\\).",
    "q_ar": "احسب قيمة التكامل \\(\\displaystyle\\int_0^1 x e^x\\,dx\\).",
    "a": 1,
    "tol": 0.001,
    "h": "Antiderivative is \\(xe^x - e^x = (x-1)e^x\\). Evaluate between 0 and 1.",
    "h_ar": "المشتقة العكسية هي \\(xe^x - e^x = (x-1)e^x\\). احسب القيمة بين 0 و 1.",
    "sol": "\\([(1-1)e^1] - [(0-1)e^0] = 0 - (-1) = 1\\).",
    "sol_ar": "\\([(1-1)e^1] - [(0-1)e^0] = 0 - (-1) = 1\\)."
  },
  {
    "t": "qc",
    "ti": "Quick Check: Integration Techniques",
    "ti_ar": "فحص سريع: تقنيات التكامل",
    "q": "\\(\\displaystyle\\int\\frac{1}{1+x^2}\\,dx=\\)",
    "q_ar": "\\(\\displaystyle\\int\\frac{1}{1+x^2}\\,dx=\\)",
    "o": [
      "ln|1+x²|+C",
      "arctan x+C",
      "arcsin x+C",
      "½ln|1+x²|+C"
    ],
    "o_ar": [
      "ln|1+x²|+C",
      "arctan x+C",
      "arcsin x+C",
      "½ln|1+x²|+C"
    ],
    "a": 1,
    "ex": "Standard: \\(\\int\\frac{dx}{1+x^2}=\\arctan x+C\\).",
    "ex_ar": "صيغة قياسية: \\(\\int\\frac{dx}{1+x^2}=\\arctan x+C\\)."
  },
  {
    "t": "sr",
    "ti": "Worked Example: Partial Fractions",
    "ti_ar": "مثال محلول: الكسور الجزئية",
    "steps": [
      "Decompose \\(\\dfrac{1}{x^2-1}\\). Factor the denominator: \\(x^2-1=(x-1)(x+1)\\).",
      "Write \\(\\dfrac{1}{(x-1)(x+1)}=\\dfrac{A}{x-1}+\\dfrac{B}{x+1}\\).",
      "Multiply through: \\(1=A(x+1)+B(x-1)\\). Let \\(x=1\\): \\(1=2A\\Rightarrow A=\\dfrac12\\). Let \\(x=-1\\): \\(1=-2B\\Rightarrow B=-\\dfrac12\\).",
      "Result: \\(\\dfrac{1}{x^2-1}=\\dfrac{1/2}{x-1}-\\dfrac{1/2}{x+1}\\)."
    ],
    "steps_ar": [
      "فكك الكسر \\(\\dfrac{1}{x^2-1}\\). حلل المقام: \\(x^2-1=(x-1)(x+1)\\).",
      "اكتب \\(\\dfrac{1}{(x-1)(x+1)}=\\dfrac{A}{x-1}+\\dfrac{B}{x+1}\\).",
      "اضرب في المقام المشترك: \\(1=A(x+1)+B(x-1)\\). عند \\(x=1\\): \\(1=2A\\Rightarrow A=\\dfrac12\\). وعند \\(x=-1\\): \\(1=-2B\\Rightarrow B=-\\dfrac12\\).",
      "النتيجة: \\(\\dfrac{1}{x^2-1}=\\dfrac{1/2}{x-1}-\\dfrac{1/2}{x+1}\\)."
    ]
  },
  {
    "t": "ord",
    "ti": "Order the Steps: Integration by Parts for \\(\\int x\\cos(2x)\\,dx\\)",
    "ti_ar": "ترتيب الخطوات: التكامل بالتجزيء لـ \\(\\int x\\cos(2x)\\,dx\\)",
    "q": "Arrange the steps to evaluate \\(\\int x\\cos(2x)\\,dx\\) via LIATE:",
    "q_ar": "رتب خطوات حساب \\(\\int x\\cos(2x)\\,dx\\) باستخدام قاعدة LIATE:",
    "items": [
      "Assign parts using LIATE: choose algebraic \\(u = x\\) and trigonometric \\(dv = \\cos(2x)\\,dx\\)",
      "Differentiate \\(u\\) to obtain \\(du = dx\\), and integrate \\(dv\\) to obtain \\(v = \\frac{1}{2}\\sin(2x)\\)",
      "Apply the parts formula: \\(uv - \\int v\\,du = \\frac{1}{2}x\\sin(2x) - \\frac{1}{2}\\int\\sin(2x)\\,dx\\)",
      "Integrate the remaining sine term: \\(-\\frac{1}{2}\\left(-\\frac{1}{2}\\cos(2x)\\right) = \\frac{1}{4}\\cos(2x)\\)",
      "Combine terms and attach the constant of integration: \\(\\frac{1}{2}x\\sin(2x) + \\frac{1}{4}\\cos(2x) + C\\)"
    ],
    "items_ar": [
      "تحديد الأجزاء وفق قاعدة LIATE: اختيار الجزء الجبري \\(u = x\\) والجزء المثلثي \\(dv = \\cos(2x)\\,dx\\)",
      "اشتقاق \\(u\\) للحصول على \\(du = dx\\)، وتكامل \\(dv\\) للحصول على \\(v = \\frac{1}{2}\\sin(2x)\\)",
      "تطبيق صيغة التجزيء: \\(uv - \\int v\\,du = \\frac{1}{2}x\\sin(2x) - \\frac{1}{2}\\int\\sin(2x)\\,dx\\)",
      "مكاملة حد الجيب المتبقي: \\(-\\frac{1}{2}\\left(-\\frac{1}{2}\\cos(2x)\\right) = \\frac{1}{4}\\cos(2x)\\)",
      "تجميع الحدود وإضافة ثابت التكامل: \\(\\frac{1}{2}x\\sin(2x) + \\frac{1}{4}\\cos(2x) + C\\)"
    ],
    "sol": "Choose u by LIATE priority, integrate dv carefully accounting for inner coefficients, and parenthesize signs.",
    "sol_ar": "اختر u بأولوية LIATE، وكامل dv بعناية مع مراعاة المعامل الداخلي، وانتبه للإشارات."
  },
  {
    "t": "cat",
    "ti": "Classify Integration Strategy by Integrand Structure",
    "ti_ar": "تصنيف استراتيجية التكامل حسب بنية الدالة المكاملة",
    "categories": [
      "Integration by Parts",
      "Partial Fractions",
      "Simple u-Substitution"
    ],
    "categories_ar": [
      "التكامل بالتجزيء",
      "الكسور الجزئية",
      "التعويض البسيط u"
    ],
    "items": [
      {
        "s": "\\(\\int x e^{3x}\\,dx\\)",
        "s_ar": "\\(\\int x e^{3x}\\,dx\\)",
        "cat": 0
      },
      {
        "s": "\\(\\int \\frac{3x+1}{x^2-x-6}\\,dx\\)",
        "s_ar": "\\(\\int \\frac{3x+1}{x^2-x-6}\\,dx\\)",
        "cat": 1
      },
      {
        "s": "\\(\\int x\\sqrt{x^2+1}\\,dx\\)",
        "s_ar": "\\(\\int x\\sqrt{x^2+1}\\,dx\\)",
        "cat": 2
      },
      {
        "s": "\\(\\int x^2\\ln(x)\\,dx\\)",
        "s_ar": "\\(\\int x^2\\ln(x)\\,dx\\)",
        "cat": 0
      },
      {
        "s": "\\(\\int \\frac{5}{(x-2)(x+3)}\\,dx\\)",
        "s_ar": "\\(\\int \\frac{5}{(x-2)(x+3)}\\,dx\\)",
        "cat": 1
      },
      {
        "s": "\\(\\int \\frac{\\cos x}{\\sin x + 2}\\,dx\\)",
        "s_ar": "\\(\\int \\frac{\\cos x}{\\sin x + 2}\\,dx\\)",
        "cat": 2
      }
    ],
    "sol": "Product of disparate function families requires IBP; rational expressions with factorable denominators use partial fractions; presence of an inside function and its derivative derivative uses u-sub.",
    "sol_ar": "حاصل ضرب عائلات دوال متباينة يتطلب تكاملاً بالتجزيء؛ والمقادير النسبية ذات المقامات القابلة للتحليل تستخدم الكسور الجزئية؛ ووجود دالة داخلية مع مشتقتها يستخدم التعويض بـ u."
  },
  {
    "t": "se",
    "ti": "Spot the Error: Separable Differential Equation & Constant of Integration (Unit 6BC · Advanced Integration Techniques)",
    "q": "A student solves the initial value problem \\(\\dfrac{dy}{dx} = 5xy\\) with \\(y(0) = 4\\). Which step contains the mathematical flaw?",
    "steps": [
      "Separate variables: \\(\\int \\dfrac{1}{y}\\,dy = \\int 5x\\,dx\\).",
      "Integrate both sides: \\(\\ln|y| = \\dfrac{5}{2}x^2 + C\\).",
      "Exponentiate both sides to write \\(y = e^{5x^2/2} + C\\).",
      "Substitute \\(x = 0, y = 4\\) to solve for \\(C\\)."
    ],
    "errorStep": 3,
    "reasons": [
      "Exponentiating \\(\\ln|y| = \\tfrac{5}{2}x^2 + C\\) yields \\(y = e^{\\frac{5}{2}x^2 + C} = Ae^{5x^2/2}\\) (where \\(A = \\pm e^C\\)), NOT \\(e^{5x^2/2} + C\\).",
      "The integral of \\(1/y\\) is \\(y^{-2}\\), not \\(\\ln|y|\\).",
      "Variables cannot be separated when \\(x\\) and \\(y\\) are multiplied."
    ],
    "correctReason": 0,
    "h": "Check how the exponent law \\(e^{a + C} = e^a \\cdot e^C\\) behaves in Step 3.",
    "sol": "By index laws, \\(|y| = e^{5x^2/2 + C} = e^C e^{5x^2/2} \\implies y = Ae^{5x^2/2}\\). Using \\(y(0) = 4\\) gives \\(A = 4\\), so \\(y = 4e^{5x^2/2}\\).",
    "ti_ar": "اكتشف الخطأ: حل المعادلات التفاضلية وثابت التكامل (Unit 6BC · Advanced Integration Techniques)",
    "q_ar": "يحل طالب مسألة القيمة الابتدائية \\(\\dfrac{dy}{dx} = 5xy\\) مع الشرط \\(y(0) = 4\\). أي خطوة تتضمن الخطأ الرياضي؟",
    "steps_ar": [
      "فصل المتغيرات: \\(\\int \\dfrac{1}{y}\\,dy = \\int 5x\\,dx\\).",
      "تكامل الطرفين: \\(\\ln|y| = \\dfrac{5}{2}x^2 + C\\).",
      "أخذ الدالة الأسية للطرفين لكتابة \\(y = e^{5x^2/2} + C\\).",
      "التعويض عن \\(x = 0, y = 4\\) لإيجاد \\(C\\)."
    ],
    "reasons_ar": [
      "أخذ الدالة الأسية للعلاقة \\(\\ln|y| = \\tfrac{5}{2}x^2 + C\\) يعطي \\(y = e^{\\frac{5}{2}x^2 + C} = Ae^{5x^2/2}\\) وليس \\(e^{5x^2/2} + C\\).",
      "تكامل \\(1/y\\) يساوي \\(-1/y^2\\).",
      "لا يمكن فصل المتغيرات في حالة الضرب."
    ],
    "h_ar": "تذكّر أن \\(e^{u+C} = e^C \\cdot e^u = Ae^u\\).",
    "sol_ar": "الصورة الصحيحة بعد أخذ الدالة الأسية هي \\(y = Ae^{5x^2/2}\\)، وبالتعويض عن \\(y(0)=4\\) نجد \\(y = 4e^{5x^2/2}\\)."
  },
  {
    "t": "ms",
    "ti": "Examiner Mode: Definite Integration & Area Under a Curve (Unit 6BC · Advanced Integration Techniques)",
    "q": "Evaluate the exact area bounded by \\(y = 3x^2 + 10x\\), the \\(x\\)-axis, \\(x = 0\\), and \\(x = 2\\).",
    "parts": [
      {
        "label": "Part (a) — Antiderivative Construction",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "Set up definite integral \\(A = \\int_0^{2} (3x^2 + 10x)\\,dx\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "Find correct antiderivative \\(\\left[x^3 + 5x^2\\right]_0^{2}\\)."
          }
        ]
      },
      {
        "label": "Part (b) — Fundamental Theorem Evaluation",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "Substitute upper and lower limits: \\((2^3 + 5(2)^2) - (0)\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "Obtain exact area \\(28\\)."
          }
        ]
      }
    ],
    "examinerTip": "When a question says \"Hence find the exact area,\" calculator-only decimal answers with no antiderivative working shown receive 0/4 marks.",
    "ti_ar": "وضع المصحح: التكامل المحدد والمساحة تحت المنحنى (Unit 6BC · Advanced Integration Techniques)",
    "q_ar": "أوجد المساحة المحصورة بين المنحنى \\(y = 3x^2 + 10x\\) ومحور السينات والمستقيمين \\(x = 0\\) و \\(x = 2\\).",
    "examinerTip_ar": "يجب كتابة الدالة الأصلية صراحةً قبل تعويض حدود التكامل للحصول على درجات الطريقة كاملة."
  },
  {
    "t": "sb",
    "ti": "Step Builder: Definite Integral via FTC (Unit 6BC · Advanced Integration Techniques)",
    "steps": [
      {
        "l": "Find the antiderivative \\(F(x)\\) of \\(f(x) = 2x + 5\\) with \\(F(0) = 0\\): \\(F(x) =\\)",
        "a": "x^2 + 5x",
        "h": "Integrate 2x to x^2 and 5 to 5x."
      },
      {
        "l": "Evaluate at the upper bound \\(F(2) =\\)",
        "a": "14",
        "h": "Compute \\((2)^2 + 5\\)(2)."
      },
      {
        "l": "Hence state \\(\\int_0^{2} (2x + 5)\\,dx =\\)",
        "a": "14",
        "h": "Compute F(2) - F(0)."
      }
    ],
    "ti_ar": "بناء الخطوات: حساب التكامل المحدد (Unit 6BC · Advanced Integration Techniques)",
    "steps_ar": [
      {
        "l": "أوجد الدالة الأصلية \\(F(x)\\) للدالة \\(2x + 5\\) بحيث \\(F(0)=0\\):",
        "a": "x^2 + 5x",
        "h": "كامل 2x إلى x^2 و 5 إلى 5x."
      },
      {
        "l": "احسب القيمة عند الحد العلوي \\(F(2) =\\)",
        "a": "14",
        "h": "احسب (2)^2 + 5(2)."
      },
      {
        "l": "إذن قيمة التكامل \\(\\int_0^{2} (2x + 5)\\,dx =\\)",
        "a": "14",
        "h": "اطرح F(2) - F(0)."
      }
    ]
  },
  {
    "t": "mt",
    "ti": "Matching: Standard Antiderivatives & ODE Forms (Unit 6BC · Advanced Integration Techniques)",
    "p": [
      {
        "l": "\\(\\int e^{kx}\\,dx\\)",
        "r": "\\(\\dfrac{1}{k}e^{kx} + C\\)"
      },
      {
        "l": "\\(\\int \\dfrac{f'(x)}{f(x)}\\,dx\\)",
        "r": "\\(\\ln|f(x)| + C\\)"
      },
      {
        "l": "\\(\\int u\\,dv\\)",
        "r": "\\(uv - \\int v\\,du\\) (Integration by Parts)"
      },
      {
        "l": "\\(y' + P(x)y = Q(x)\\)",
        "r": "Multiply by integrating factor \\(\\mu(x) = e^{\\int P(x)\\,dx}\\)"
      }
    ],
    "ti_ar": "مطابقة: التكاملات القياسية والمعادلات التفاضلية (Unit 6BC · Advanced Integration Techniques)",
    "p_ar": [
      {
        "l": "\\(\\int e^{kx}\\,dx\\)",
        "r": "\\(\\dfrac{1}{k}e^{kx} + C\\)"
      },
      {
        "l": "\\(\\int \\dfrac{f'(x)}{f(x)}\\,dx\\)",
        "r": "\\(\\ln|f(x)| + C\\)"
      },
      {
        "l": "\\(\\int u\\,dv\\)",
        "r": "\\(uv - \\int v\\,du\\) (التكامل بالتجزيء)"
      },
      {
        "l": "\\(y' + P(x)y = Q(x)\\)",
        "r": "الضرب في عامل التكامل \\(\\mu(x) = e^{\\int P(x)\\,dx}\\)"
      }
    ]
  }
];

D["apbc-c2"] = [
  {
    "t": "mt",
    "ti": "Matching: Euler's Method & Logistic",
    "ti_ar": "مطابقة: طريقة أويلر والنموذج اللوجستي",
    "p": [
      {
        "l": "Euler step",
        "r": "y_n + h·f(x_n,y_n)"
      },
      {
        "l": "Logistic DE",
        "r": "kP(1−P/M)"
      },
      {
        "l": "Carrying capacity",
        "r": "M"
      },
      {
        "l": "Separable DE",
        "r": "dy/dx=g(x)h(y)"
      }
    ],
    "p_ar": [
      {
        "l": "خطوة أويلر",
        "r": "y_n + h·f(x_n,y_n)"
      },
      {
        "l": "المعادلة التفاضلية اللوجستية",
        "r": "kP(1−P/M)"
      },
      {
        "l": "السعة الاستيعابية (القصوى)",
        "r": "M"
      },
      {
        "l": "معادلة تفاضلية قابلة للفصل",
        "r": "dy/dx=g(x)h(y)"
      }
    ]
  },
  {
    "t": "num",
    "ti": "Euler's Method Two-Step Calculation",
    "ti_ar": "حساب خطوتين بطريقة أويلر",
    "q": "Given \\(\\frac{dy}{dx} = x + y\\) with \\(y(0) = 1\\), use Euler's method with step \\(h = 0.5\\) to estimate \\(y(1.0)\\).",
    "q_ar": "بمعلومية \\(\\frac{dy}{dx} = x + y\\) مع \\(y(0) = 1\\)، استخدم طريقة أويلر بطول خطوة \\(h = 0.5\\) لتقدير \\(y(1.0)\\).",
    "a": 2.5,
    "tol": 0.01,
    "h": "Step 1 gives y(0.5) = 1 + 0.5(0+1) = 1.5. Step 2 computes y(1.0) = 1.5 + 0.5(0.5+1.5).",
    "h_ar": "الخطوة 1 تعطي y(0.5) = 1 + 0.5(0+1) = 1.5. والخطوة 2 تحسب y(1.0) = 1.5 + 0.5(0.5+1.5).",
    "sol": "At \\((0,1)\\), slope is 1, so \\(y(0.5) = 1 + 0.5(1) = 1.5\\). At \\((0.5, 1.5)\\), slope is \\(0.5+1.5 = 2.0\\), so \\(y(1.0) = 1.5 + 0.5(2.0) = 2.5\\).",
    "sol_ar": "عند \\((0,1)\\)، الميل 1، إذن \\(y(0.5) = 1 + 0.5(1) = 1.5\\). وعند \\((0.5, 1.5)\\)، الميل هو \\(0.5+1.5 = 2.0\\)، إذن \\(y(1.0) = 1.5 + 0.5(2.0) = 2.5\\)."
  },
  {
    "t": "sr",
    "ti": "Worked Example: One Step of Euler's Method",
    "ti_ar": "مثال محلول: خطوة واحدة بطريقة أويلر",
    "steps": [
      "Use Euler's Method with step size \\(h=0.5\\) to estimate \\(y(0.5)\\) if \\(\\dfrac{dy}{dx}=x+y\\), \\(y(0)=1\\). Euler's formula: \\(y_{n+1}=y_n+h\\cdot f(x_n,y_n)\\).",
      "At \\((x_0,y_0)=(0,1)\\): \\(f(0,1)=0+1=1\\).",
      "\\(y_1=1+0.5(1)=1.5\\)."
    ],
    "steps_ar": [
      "استخدم طريقة أويلر بحجم خطوة \\(h=0.5\\) لتقدير \\(y(0.5)\\) إذا كانت \\(\\dfrac{dy}{dx}=x+y\\)، و\\(y(0)=1\\). صيغة أويلر: \\(y_{n+1}=y_n+h\\cdot f(x_n,y_n)\\).",
      "عند \\((x_0,y_0)=(0,1)\\): \\(f(0,1)=0+1=1\\).",
      "\\(y_1=1+0.5(1)=1.5\\)."
    ]
  },
  {
    "t": "ord",
    "ti": "Order the Steps: Solving a Logistic Differential Equation",
    "ti_ar": "ترتيب الخطوات: حل المعادلة التفاضلية اللوجستية",
    "q": "Arrange the sequence to analytically solve \\(\\frac{dP}{dt} = kP\\left(1 - \\frac{P}{M}\\right)\\):",
    "q_ar": "رتب الخطوات لحل المعادلة \\(\\frac{dP}{dt} = kP\\left(1 - \\frac{P}{M}\\right)\\) تحليلياً:",
    "items": [
      "Separate variables: \\(\\frac{dP}{P(1 - P/M)} = k\\,dt\\)",
      "Decompose the left-hand integrand into partial fractions: \\(\\left(\\frac{1}{P} + \\frac{1/M}{1 - P/M}\\right)dP = k\\,dt\\)",
      "Integrate both sides: \\(\\ln|P| - \\ln|M - P| = kt + C_0\\)",
      "Combine logarithms: \\(\\ln\\left|\\frac{P}{M - P}\\right| = kt + C_0\\)",
      "Exponentiate and solve for \\(P(t)\\): \\(P(t) = \\frac{M}{1 + A e^{-kt}}\\)",
      "Apply the initial condition \\(P(0) = P_0\\) to evaluate \\(A = \\frac{M - P_0}{P_0}\\)"
    ],
    "items_ar": [
      "فصل المتغيرات: \\(\\frac{dP}{P(1 - P/M)} = k\\,dt\\)",
      "تفكيك الدالة في الطرف الأيسر إلى كسور جزئية: \\(\\left(\\frac{1}{P} + \\frac{1/M}{1 - P/M}\\right)dP = k\\,dt\\)",
      "تكامل الطرفين: \\(\\ln|P| - \\ln|M - P| = kt + C_0\\)",
      "دمج اللوغاريتمات: \\(\\ln\\left|\\frac{P}{M - P}\\right| = kt + C_0\\)",
      "أخذ الدالة الأسية وحل المعادلة لإيجاد \\(P(t)\\): \\(P(t) = \\frac{M}{1 + A e^{-kt}}\\)",
      "تطبيق الشرط الابتدائي \\(P(0) = P_0\\) لإيجاد قيمة الثابت \\(A = \\frac{M - P_0}{P_0}\\)"
    ],
    "sol": "Logistic DE analytical solution requires separation of variables, partial fraction integration, and solving for P(t).",
    "sol_ar": "يتطلب الحل التحليلي للمعادلة التفاضلية اللوجستية فصل المتغيرات، والتكامل بالكسور الجزئية، وحل المعادلة لعزل P(t)."
  },
  {
    "t": "cat",
    "ti": "Classify Logistic Growth Model Milestones",
    "ti_ar": "تصنيف محطات نموذج النمو اللوجستي",
    "categories": [
      "Carrying Capacity (P = M)",
      "Maximum Growth Rate (P = M/2)",
      "Point of Diminishing Returns"
    ],
    "categories_ar": [
      "السعة الاستيعابية (P = M)",
      "أقصى معدل نمو (P = M/2)",
      "نقطة تناقص العوائد"
    ],
    "items": [
      {
        "s": "\\(\\lim_{t\\to\\infty} P(t)\\) as \\(t \\to \\infty\\)",
        "s_ar": "\\(\\lim_{t\\to\\infty} P(t)\\) عندما \\(t \\to \\infty\\)",
        "cat": 0
      },
      {
        "s": "Population value where the inflection point of \\(P(t)\\) occurs",
        "s_ar": "قيمة المجتمع التي تقع عندها نقطة الانقلاب في منحنى \\(P(t)\\)",
        "cat": 1
      },
      {
        "s": "Population level where \\(\\frac{dP}{dt}\\) achieves its maximum",
        "s_ar": "مستوى المجتمع الذي يصل عنده معدل النمو \\(\\frac{dP}{dt}\\) إلى أقصاه",
        "cat": 1
      },
      {
        "s": "Horizontal asymptote of the logistic solution curve",
        "s_ar": "خط التقارب الأفقي لمنحنى الحل اللوجستي",
        "cat": 0
      },
      {
        "s": "Interval \\(\\frac{M}{2} < P < M\\) where \\(\\frac{d^2P}{dt^2} < 0\\)",
        "s_ar": "الفترة \\(\\frac{M}{2} < P < M\\) حيث تكون \\(\\frac{d^2P}{dt^2} < 0\\)",
        "cat": 2
      },
      {
        "s": "Rate \\(\\frac{dP}{dt}\\) begins to decelerate towards 0",
        "s_ar": "المعدل \\(\\frac{dP}{dt}\\) يبدأ في التباطؤ مقترباً من الصفر",
        "cat": 2
      }
    ],
    "sol": "Carrying capacity is the horizontal asymptote M; the fastest growth rate occurs at the inflection point P = M/2; above M/2 the second derivative is negative.",
    "sol_ar": "السعة الاستيعابية هي خط التقارب الأفقي M؛ وأسرع معدل نمو يحدث عند نقطة الانقلاب P = M/2؛ وفوق M/2 تكون المشتقة الثانية سالبة."
  },
  {
    "t": "se",
    "ti": "Spot the Error: Separable Differential Equation & Constant of Integration (Unit 7BC · Logistic Models & Euler's Method)",
    "q": "A student solves the initial value problem \\(\\dfrac{dy}{dx} = 3xy\\) with \\(y(0) = 1\\). Which step contains the mathematical flaw?",
    "steps": [
      "Separate variables: \\(\\int \\dfrac{1}{y}\\,dy = \\int 3x\\,dx\\).",
      "Integrate both sides: \\(\\ln|y| = \\dfrac{3}{2}x^2 + C\\).",
      "Exponentiate both sides to write \\(y = e^{3x^2/2} + C\\).",
      "Substitute \\(x = 0, y = 1\\) to solve for \\(C\\)."
    ],
    "errorStep": 3,
    "reasons": [
      "Exponentiating \\(\\ln|y| = \\tfrac{3}{2}x^2 + C\\) yields \\(y = e^{\\frac{3}{2}x^2 + C} = Ae^{3x^2/2}\\) (where \\(A = \\pm e^C\\)), NOT \\(e^{3x^2/2} + C\\).",
      "The integral of \\(1/y\\) is \\(y^{-2}\\), not \\(\\ln|y|\\).",
      "Variables cannot be separated when \\(x\\) and \\(y\\) are multiplied."
    ],
    "correctReason": 0,
    "h": "Check how the exponent law \\(e^{a + C} = e^a \\cdot e^C\\) behaves in Step 3.",
    "sol": "By index laws, \\(|y| = e^{3x^2/2 + C} = e^C e^{3x^2/2} \\implies y = Ae^{3x^2/2}\\). Using \\(y(0) = 1\\) gives \\(A = 1\\), so \\(y = 1e^{3x^2/2}\\).",
    "ti_ar": "اكتشف الخطأ: حل المعادلات التفاضلية وثابت التكامل (Unit 7BC · Logistic Models & Euler's Method)",
    "q_ar": "يحل طالب مسألة القيمة الابتدائية \\(\\dfrac{dy}{dx} = 3xy\\) مع الشرط \\(y(0) = 1\\). أي خطوة تتضمن الخطأ الرياضي؟",
    "steps_ar": [
      "فصل المتغيرات: \\(\\int \\dfrac{1}{y}\\,dy = \\int 3x\\,dx\\).",
      "تكامل الطرفين: \\(\\ln|y| = \\dfrac{3}{2}x^2 + C\\).",
      "أخذ الدالة الأسية للطرفين لكتابة \\(y = e^{3x^2/2} + C\\).",
      "التعويض عن \\(x = 0, y = 1\\) لإيجاد \\(C\\)."
    ],
    "reasons_ar": [
      "أخذ الدالة الأسية للعلاقة \\(\\ln|y| = \\tfrac{3}{2}x^2 + C\\) يعطي \\(y = e^{\\frac{3}{2}x^2 + C} = Ae^{3x^2/2}\\) وليس \\(e^{3x^2/2} + C\\).",
      "تكامل \\(1/y\\) يساوي \\(-1/y^2\\).",
      "لا يمكن فصل المتغيرات في حالة الضرب."
    ],
    "h_ar": "تذكّر أن \\(e^{u+C} = e^C \\cdot e^u = Ae^u\\).",
    "sol_ar": "الصورة الصحيحة بعد أخذ الدالة الأسية هي \\(y = Ae^{3x^2/2}\\)، وبالتعويض عن \\(y(0)=1\\) نجد \\(y = 1e^{3x^2/2}\\)."
  },
  {
    "t": "ms",
    "ti": "Examiner Mode: Definite Integration & Area Under a Curve (Unit 7BC · Logistic Models & Euler's Method)",
    "q": "Evaluate the exact area bounded by \\(y = 3x^2 + 6x\\), the \\(x\\)-axis, \\(x = 0\\), and \\(x = 0\\).",
    "parts": [
      {
        "label": "Part (a) — Antiderivative Construction",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "Set up definite integral \\(A = \\int_0^{0} (3x^2 + 6x)\\,dx\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "Find correct antiderivative \\(\\left[x^3 + 3x^2\\right]_0^{0}\\)."
          }
        ]
      },
      {
        "label": "Part (b) — Fundamental Theorem Evaluation",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "Substitute upper and lower limits: \\((0^3 + 3(0)^2) - (0)\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "Obtain exact area \\(0\\)."
          }
        ]
      }
    ],
    "examinerTip": "When a question says \"Hence find the exact area,\" calculator-only decimal answers with no antiderivative working shown receive 0/4 marks.",
    "ti_ar": "وضع المصحح: التكامل المحدد والمساحة تحت المنحنى (Unit 7BC · Logistic Models & Euler's Method)",
    "q_ar": "أوجد المساحة المحصورة بين المنحنى \\(y = 3x^2 + 6x\\) ومحور السينات والمستقيمين \\(x = 0\\) و \\(x = 0\\).",
    "examinerTip_ar": "يجب كتابة الدالة الأصلية صراحةً قبل تعويض حدود التكامل للحصول على درجات الطريقة كاملة."
  },
  {
    "t": "sb",
    "ti": "Step Builder: Definite Integral via FTC (Unit 7BC · Logistic Models & Euler's Method)",
    "steps": [
      {
        "l": "Find the antiderivative \\(F(x)\\) of \\(f(x) = 2x + 3\\) with \\(F(0) = 0\\): \\(F(x) =\\)",
        "a": "x^2 + 3x",
        "h": "Integrate 2x to x^2 and 3 to 3x."
      },
      {
        "l": "Evaluate at the upper bound \\(F(0) =\\)",
        "a": "0",
        "h": "Compute \\((0)^2 + 3\\)(0)."
      },
      {
        "l": "Hence state \\(\\int_0^{0} (2x + 3)\\,dx =\\)",
        "a": "0",
        "h": "Compute F(0) - F(0)."
      }
    ],
    "ti_ar": "بناء الخطوات: حساب التكامل المحدد (Unit 7BC · Logistic Models & Euler's Method)",
    "steps_ar": [
      {
        "l": "أوجد الدالة الأصلية \\(F(x)\\) للدالة \\(2x + 3\\) بحيث \\(F(0)=0\\):",
        "a": "x^2 + 3x",
        "h": "كامل 2x إلى x^2 و 3 إلى 3x."
      },
      {
        "l": "احسب القيمة عند الحد العلوي \\(F(0) =\\)",
        "a": "0",
        "h": "احسب (0)^2 + 3(0)."
      },
      {
        "l": "إذن قيمة التكامل \\(\\int_0^{0} (2x + 3)\\,dx =\\)",
        "a": "0",
        "h": "اطرح F(0) - F(0)."
      }
    ]
  },
  {
    "t": "qc",
    "ti": "Quick Check: Vertex & Minimum Analysis (Unit 7BC · Logistic Models & Euler's Method)",
    "ti_ar": "فحص سريع: تحليل نقطة الرأس والقيمة الصغرى (Unit 7BC · Logistic Models & Euler's Method)",
    "q": "What is the minimum value of \\( f(x) = (x - 6)^2 + 8 \\) over all real \\( x \\)?",
    "q_ar": "ما هي القيمة الصغرى للدالة \\( f(x) = (x - 6)^2 + 8 \\) لكل \\( x \\in \\mathbb{R} \\)؟",
    "o": [
      "\\( 8 \\)",
      "\\( 6 \\)",
      "\\( -6 \\)",
      "\\( 44 \\)"
    ],
    "o_ar": [
      "\\( 8 \\)",
      "\\( 6 \\)",
      "\\( -6 \\)",
      "\\( 44 \\)"
    ],
    "a": 0,
    "ex": "Since \\( (x - 6)^2 \\ge 0 \\), the minimum value is \\( 8 \\) achieved at \\( x = 6 \\).",
    "ex_ar": "بما أن المربع الكامل غير سالب، فإن القيمة الصغرى هي \\( 8 \\) عند \\( x = 6 \\)."
  }
];

D["apbc-c3"] = [
  {
    "t": "tf",
    "ti": "True or False: Parametric Calculus",
    "ti_ar": "صح أم خطأ: حساب التفاضل والتكامل للمعادلات الوسيطية",
    "items": [
      {
        "s": "\\(\\frac{dy}{dx}=\\frac{dy/dt}{dx/dt}\\)",
        "s_ar": "\\(\\frac{dy}{dx}=\\frac{dy/dt}{dx/dt}\\)",
        "a": true,
        "ex": "Standard parametric slope formula.",
        "ex_ar": "صيغة ميل المنحنى الوسيطي القياسية."
      },
      {
        "s": "Speed \\(=\\frac{dx}{dt}+\\frac{dy}{dt}\\)",
        "s_ar": "السرعة القياسية \\(=\\frac{dx}{dt}+\\frac{dy}{dt}\\)",
        "a": false,
        "ex": "Speed \\(=\\sqrt{(dx/dt)^2+(dy/dt)^2}\\).",
        "ex_ar": "السرعة القياسية \\(=\\sqrt{(dx/dt)^2+(dy/dt)^2}\\)."
      },
      {
        "s": "Arc length \\(=\\int_a^b\\sqrt{(\\dot x)^2+(\\dot y)^2}\\,dt\\)",
        "s_ar": "طول القوس \\(=\\int_a^b\\sqrt{(\\dot x)^2+(\\dot y)^2}\\,dt\\)",
        "a": true,
        "ex": "Correct arc length formula.",
        "ex_ar": "صيغة طول القوس الصحيحة."
      },
      {
        "s": "A vector has only magnitude",
        "s_ar": "المتجه له مقدار فقط",
        "a": false,
        "ex": "Vectors have both magnitude and direction.",
        "ex_ar": "المتجهات لها مقدار واتجاه معاً."
      }
    ]
  },
  {
    "t": "ord",
    "ti": "Order the Steps: Parametric Second Derivative",
    "ti_ar": "ترتيب الخطوات: المشتقة الثانية في المعادلات الوسيطية",
    "q": "Arrange the sequence to compute \\(\\frac{d^2y}{dx^2}\\) for parametric functions \\(x(t)\\) and \\(y(t)\\):",
    "q_ar": "رتب خطوات حساب المشتقة الثانية \\(\\frac{d^2y}{dx^2}\\) للدالتين الوسيطيتين \\(x(t)\\) و\\(y(t)\\):",
    "items": [
      "Differentiate \\(x(t)\\) and \\(y(t)\\) with respect to \\(t\\) to find \\(\\frac{dx}{dt}\\) and \\(\\frac{dy}{dt}\\)",
      "Form the first derivative: \\(\\frac{dy}{dx} = \\frac{dy/dt}{dx/dt}\\)",
      "Differentiate the first derivative expression with respect to \\(t\\): \\(\\frac{d}{dt}\\left[\\frac{dy}{dx}\\right]\\)",
      "Divide the result by \\(\\frac{dx}{dt}\\): \\(\\frac{d^2y}{dx^2} = \\frac{\\frac{d}{dt}[dy/dx]}{dx/dt}\\)"
    ],
    "items_ar": [
      "اشتقاق \\(x(t)\\) و\\(y(t)\\) بالنسبة إلى \\(t\\) لإيجاد \\(\\frac{dx}{dt}\\) و\\(\\frac{dy}{dt}\\)",
      "تكوين المشتقة الأولى: \\(\\frac{dy}{dx} = \\frac{dy/dt}{dx/dt}\\)",
      "اشتقاق مقدار المشتقة الأولى بالنسبة إلى \\(t\\): \\(\\frac{d}{dt}\\left[\\frac{dy}{dx}\\right]\\)",
      "قسمة الناتج على \\(\\frac{dx}{dt}\\): \\(\\frac{d^2y}{dx^2} = \\frac{\\frac{d}{dt}[dy/dx]}{dx/dt}\\)"
    ],
    "sol": "The second derivative with respect to x requires differentiating dy/dx with respect to t and then dividing by dx/dt. It is never y''(t)/x''(t).",
    "sol_ar": "تتطلب المشتقة الثانية بالنسبة إلى x اشتقاق dy/dx بالنسبة إلى t ثم القسمة على dx/dt. وليست أبداً y''(t)/x''(t)."
  },
  {
    "t": "sr",
    "ti": "Worked Example: Arc Length of a Parametric Curve",
    "ti_ar": "مثال محلول: طول قوس منحنى وسيطي",
    "steps": [
      "Find the arc length of \\(x=3t,\\ y=4t\\) for \\(0\\le t\\le2\\). Compute \\(\\dfrac{dx}{dt}=3\\) and \\(\\dfrac{dy}{dt}=4\\).",
      "Arc length formula: \\(L=\\displaystyle\\int_0^2\\sqrt{3^2+4^2}\\,dt=\\int_0^2 5\\,dt\\).",
      "Evaluate: \\(L=5(2)=10\\)."
    ],
    "steps_ar": [
      "أوجد طول قوس المنحنى \\(x=3t,\\ y=4t\\) على الفترة \\(0\\le t\\le2\\). نحسب \\(\\dfrac{dx}{dt}=3\\) و\\(\\dfrac{dy}{dt}=4\\).",
      "صيغة طول القوس: \\(L=\\displaystyle\\int_0^2\\sqrt{3^2+4^2}\\,dt=\\int_0^2 5\\,dt\\).",
      "الحساب: \\(L=5(2)=10\\)."
    ]
  },
  {
    "t": "num",
    "ti": "Parametric Speed Calculation",
    "ti_ar": "حساب السرعة القياسية في المعادلات الوسيطية",
    "q": "A particle moves in the plane with position vector \\(\\vec{r}(t) = \\langle 1.5t^2, 2t^2 \\rangle\\). Compute the scalar speed of the particle at time \\(t = 2\\).",
    "q_ar": "يتحرك جسيم في المستوى بمتجه موضع \\(\\vec{r}(t) = \\langle 1.5t^2, 2t^2 \\rangle\\). احسب السرعة القياسية للجسيم عند الزمن \\(t = 2\\).",
    "a": 10,
    "tol": 0.001,
    "h": "Velocity components are \\(x'(t) = 3t\\) and \\(y'(t) = 4t\\). Speed is \\(\\sqrt{(x')^2 + (y')^2}\\).",
    "h_ar": "مركبتا السرعة المتجهة هما \\(x'(t) = 3t\\) و\\(y'(t) = 4t\\). والسرعة القياسية هي \\(\\sqrt{(x')^2 + (y')^2}\\).",
    "sol": "At \\(t = 2\\), \\(x'(2) = 6\\) and \\(y'(2) = 8\\). \\(\\text{Speed} = \\sqrt{6^2 + 8^2} = \\sqrt{36 + 64} = 10\\).",
    "sol_ar": "عند \\(t = 2\\)، يكون \\(x'(2) = 6\\) و\\(y'(2) = 8\\). \\(\\text{السرعة} = \\sqrt{6^2 + 8^2} = \\sqrt{36 + 64} = 10\\)."
  },
  {
    "t": "cat",
    "ti": "Classify Parametric & Vector Quantities",
    "ti_ar": "تصنيف الكميات الوسيطية والمتجهة",
    "categories": [
      "Scalar Quantity",
      "Vector Quantity"
    ],
    "categories_ar": [
      "كمية قياسية (عددية)",
      "كمية متجهة"
    ],
    "items": [
      {
        "s": "Velocity \\(\\vec{v}(t) = \\langle x'(t), y'(t) \\rangle\\)",
        "s_ar": "السرعة المتجهة \\(\\vec{v}(t) = \\langle x'(t), y'(t) \\rangle\\)",
        "cat": 1
      },
      {
        "s": "Speed \\(\\|\\vec{v}(t)\\| = \\sqrt{(x')^2 + (y')^2}\\)",
        "s_ar": "السرعة القياسية \\(\\|\\vec{v}(t)\\| = \\sqrt{(x')^2 + (y')^2}\\)",
        "cat": 0
      },
      {
        "s": "Acceleration \\(\\vec{a}(t) = \\langle x''(t), y''(t) \\rangle\\)",
        "s_ar": "التسارع \\(\\vec{a}(t) = \\langle x''(t), y''(t) \\rangle\\)",
        "cat": 1
      },
      {
        "s": "Total distance traveled \\(\\int_{t_1}^{t_2} \\|\\vec{v}(t)\\|\\,dt\\)",
        "s_ar": "المسافة الكلية المقطوعة \\(\\int_{t_1}^{t_2} \\|\\vec{v}(t)\\|\\,dt\\)",
        "cat": 0
      },
      {
        "s": "Displacement \\(\\int_{t_1}^{t_2} \\vec{v}(t)\\,dt\\)",
        "s_ar": "الإزاحة \\(\\int_{t_1}^{t_2} \\vec{v}(t)\\,dt\\)",
        "cat": 1
      },
      {
        "s": "Slope of trajectory \\(\\frac{dy}{dx} = \\frac{y'(t)}{x'(t)}\\)",
        "s_ar": "ميل المسار \\(\\frac{dy}{dx} = \\frac{y'(t)}{x'(t)}\\)",
        "cat": 0
      }
    ],
    "sol": "Vectors have magnitude and direction (ordered pairs in 2D); speed, slope, and total distance are real-valued scalars.",
    "sol_ar": "المتجهات لها مقدار واتجاه (أزواج مرتبة في 2D)؛ بينما السرعة القياسية والميل والمسافة الكلية كميات قياسية حقيقية."
  },
  {
    "t": "se",
    "ti": "Spot the Error: Algebraic & Domain Verification (Unit 9 · Parametric Equations & Vector-Valued Functions)",
    "q": "A student solves the equation \\(\\sqrt{2x + 25} = x - 5\\) step by step. Which step introduces an invalid conclusion?",
    "steps": [
      "Square both sides to eliminate the radical: \\(2x + 25 = (x - 5)^2\\).",
      "Expand the right-hand side: \\(2x + 25 = x^2 - 10x + 25\\).",
      "Rearrange and factor: \\(x^2 - 12x = 0 \\implies x(x - 12) = 0\\).",
      "Conclude that both \\(x = 0\\) and \\(x = 12\\) are valid real solutions."
    ],
    "errorStep": 4,
    "reasons": [
      "Substituting \\(x = 0\\) into the original equation gives \\(\\sqrt{25} = -5\\) (\\(5 = -5\\)), which is false because the principal square root is non-negative (\\(x - 5 \\ge 0\\) requires \\(x \\ge 5\\)).",
      "Expanding \\((x - 5)^2\\) should give \\(x^2 - 25\\) with no middle term.",
      "Factoring \\(x^2 - 12x = 0\\) only yields \\(x = 12\\)."
    ],
    "correctReason": 0,
    "h": "Test \\(x = 0\\) in the original equation \\(\\sqrt{2x + 25} = x - 5\\).",
    "sol": "Squaring both sides is a non-reversible step unless \\(x - 5 \\ge 0 \\iff x \\ge 5\\). Therefore \\(x = 0\\) is an extraneous root and \\(x = 12\\) is the unique solution.",
    "ti_ar": "اكتشف الخطأ: الجذور الدخيلة والتحقق من المجال (Unit 9 · Parametric Equations & Vector-Valued Functions)",
    "q_ar": "يحل طالب المعادلة \\(\\sqrt{2x + 25} = x - 5\\) خطوة بخطوة. أي خطوة تتضمن استنتاجاً خاطئاً؟",
    "steps_ar": [
      "تربيع الطرفين للتخلص من الجذر: \\(2x + 25 = (x - 5)^2\\).",
      "فك المربع الكامل: \\(2x + 25 = x^2 - 10x + 25\\).",
      "الترتيب والتحليل: \\(x^2 - 12x = 0 \\implies x(x - 12) = 0\\).",
      "استنتاج أن كلاً من \\(x = 0\\) و \\(x = 12\\) حلان صحيحان للمعادلة الأصلية."
    ],
    "reasons_ar": [
      "التعويض عن \\(x = 0\\) في المعادلة الأصلية يعطي \\(5 = -5\\) وهو مستحيل لأن الجذر التربيعي الأساسي غير سالب (يجب أن يتحقق \\(x \\ge 5\\)).",
      "فك التربيع غير صحيح.",
      "التحليل بإخراج العامل المشترك غير صحيح."
    ],
    "h_ar": "عوّض عن \\(x = 0\\) في المعادلة الأصلية للتحقق من إشارة الطرف الأيمن.",
    "sol_ar": "الشرط اللازم هو \\(x - 5 \\ge 0 \\implies x \\ge 5\\)، لذا يُرفض الجذر الدخيل \\(x = 0\\) ويبقى \\(x = 12\\) فقط."
  },
  {
    "t": "ms",
    "ti": "Examiner Mode: Multi-Step Structured Problem (Unit 9 · Parametric Equations & Vector-Valued Functions)",
    "q": "Let \\(f(x) = x^2 - 10x + 28\\) for \\(x \\ge 5\\). (a) Express \\(f(x)\\) in completed-square vertex form and state the range of \\(f\\). (b) Find an expression for the inverse function \\(f^{-1}(x)\\) and state its domain.",
    "parts": [
      {
        "label": "Part (a) — Vertex Form & Range",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "Complete the square: \\(f(x) = (x - 5)^2 - 25 + 28 = (x - 5)^2 + 3\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "State exact range: \\(f(x) \\ge 3\\) (or \\([3, \\infty)\\))."
          }
        ]
      },
      {
        "label": "Part (b) — Inverse Function & Domain",
        "marks": 3,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "Set \\(y = (x - 5)^2 + 3 \\implies (x - 5)^2 = y - 3\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "Select positive branch (since \\(x \\ge 5\\)): \\(f^{-1}(x) = 5 + \\sqrt{x - 3}\\)."
          },
          {
            "code": "B1",
            "marks": 1,
            "text": "State domain of \\(f^{-1}\\): \\(x \\ge 3\\) (matching the range of \\(f\\))."
          }
        ]
      }
    ],
    "examinerTip": "Writing \\(\\pm\\sqrt{x - 3}\\) for \\(f^{-1}(x)\\) loses the final A1 mark because a function must be single-valued; use the domain restriction \\(x \\ge 5\\) to choose the \\(+\\) sign.",
    "ti_ar": "وضع المصحح: إكمال المربع والدالة العكسية (Unit 9 · Parametric Equations & Vector-Valued Functions)",
    "q_ar": "لتكن \\(f(x) = x^2 - 10x + 28\\) حيث \\(x \\ge 5\\). (أ) اكتب \\(f(x)\\) في صورة المربع الكامل وحدد مداها. (ب) أوجد قاعدة الدالة العكسية \\(f^{-1}(x)\\) ومجالها.",
    "examinerTip_ar": "الدالة العكسية يجب أن تكون وحيدة القيمة، لذا نختار الإشارة الموجبة للجذر \\(5 + \\sqrt{x - 3}\\) لأن \\(x \\ge 5\\)."
  },
  {
    "t": "sb",
    "ti": "Step Builder: Completing the Square & Vertex Analysis (Unit 9 · Parametric Equations & Vector-Valued Functions)",
    "steps": [
      {
        "l": "In \\(y = x^2 - 10x + 28\\), halve the \\(x\\)-coefficient to write \\((x - h)^2\\) where \\(h =\\)",
        "a": "5",
        "h": "Take half of 10."
      },
      {
        "l": "Compute the minimum value \\(k = 28 - 5^2 =\\)",
        "a": "3",
        "h": "Subtract 25 from 28."
      },
      {
        "l": "Evaluate \\(y\\) when \\(x = 7\\): \\(y =\\)",
        "a": "7",
        "h": "Compute \\((2)^2 + 3\\)."
      }
    ],
    "ti_ar": "بناء الخطوات: إكمال المربع وإيجاد القيمة الصغرى (Unit 9 · Parametric Equations & Vector-Valued Functions)",
    "steps_ar": [
      {
        "l": "في الدالة \\(y = x^2 - 10x + 28\\): قيمة \\(h\\) في \\((x - h)^2\\) تساوي:",
        "a": "5",
        "h": "اقسم معامل x وهو 10 على 2."
      },
      {
        "l": "احسب القيمة الصغرى \\(k = 28 - 5^2 =\\)",
        "a": "3",
        "h": "اطرح 25 من 28."
      },
      {
        "l": "احسب قيمة \\(y\\) عندما \\(x = 7\\):",
        "a": "7",
        "h": "احسب \\(4 + 3\\)."
      }
    ]
  },
  {
    "t": "mt",
    "ti": "Matching: Core Algebraic & Analytic Principles (Unit 9 · Parametric Equations & Vector-Valued Functions)",
    "p": [
      {
        "l": "\\(b^2 - 4ac = 0\\)",
        "r": "Line is tangent to the quadratic curve (1 repeated root)"
      },
      {
        "l": "\\(\\text{dom}(f^{-1})\\)",
        "r": "Equals \\(\\text{ran}(f)\\) (Range of original function)"
      },
      {
        "l": "\\(f(x - h) + k\\)",
        "r": "Translation by vector \\(\\binom{h}{k}\\)"
      },
      {
        "l": "\\(x_1 + x_2 = -b/a,\\; x_1 x_2 = c/a\\)",
        "r": "Vieta's root-coefficient relations"
      }
    ],
    "ti_ar": "مطابقة: المبادئ الجبرية والتحليلية الأساسية (Unit 9 · Parametric Equations & Vector-Valued Functions)",
    "p_ar": [
      {
        "l": "\\(b^2 - 4ac = 0\\)",
        "r": "المستقيم مماس للمنحنى التربيعي (جذر حقيقي مكرر)"
      },
      {
        "l": "\\(\\text{dom}(f^{-1})\\)",
        "r": "يساوي مدى الدالة الأصلية \\(\\text{ran}(f)\\)"
      },
      {
        "l": "\\(f(x - h) + k\\)",
        "r": "إزاحة هندسية بالمتجه \\(\\binom{h}{k}\\)"
      },
      {
        "l": "\\(x_1 + x_2 = -b/a,\\; x_1 x_2 = c/a\\)",
        "r": "علاقات فييت بين الجذور والمعاملات"
      }
    ]
  }
];

D["apbc-c4"] = [
  {
    "t": "num",
    "ti": "Compute Polar Area of a Sector",
    "ti_ar": "حساب المساحة القطبية لقطاع",
    "q": "A polar curve is given by \\(r = \\sqrt{\\theta}\\). Find the area swept out from \\(\\theta = 0\\) to \\(\\theta = 4\\).",
    "q_ar": "منحنى قطبي معطى بالمعادلة \\(r = \\sqrt{\\theta}\\). أوجد المساحة الممسوحة من \\(\\theta = 0\\) إلى \\(\\theta = 4\\).",
    "a": 4,
    "tol": 0.001,
    "h": "Polar area formula is \\(\\frac{1}{2}\\int_0^4 r^2\\,d\\theta = \\frac{1}{2}\\int_0^4 \\theta\\,d\\theta\\).",
    "h_ar": "صيغة المساحة القطبية هي \\(\\frac{1}{2}\\int_0^4 r^2\\,d\\theta = \\frac{1}{2}\\int_0^4 \\theta\\,d\\theta\\).",
    "sol": "\\(\\frac{1}{2}\\left[\\frac{\\theta^2}{2}\\right]_0^4 = \\frac{1}{2}\\left(\\frac{16}{2}\\right) = 4\\).",
    "sol_ar": "\\(\\frac{1}{2}\\left[\\frac{\\theta^2}{2}\\right]_0^4 = \\frac{1}{2}\\left(\\frac{16}{2}\\right) = 4\\)."
  },
  {
    "t": "sb",
    "ti": "Step Builder: Polar area \\(r=2\\cos\\theta\\), \\(0\\le\\theta\\le\\pi/2\\)",
    "ti_ar": "بناء الخطوات: المساحة القطبية لـ \\(r=2\\cos\\theta\\)، \\(0\\le\\theta\\le\\pi/2\\)",
    "steps": [
      {
        "l": "Formula: \\(A=\\frac{1}{2}\\int r^2\\,d\\theta\\). Here \\(r^2=\\)",
        "a": "4cos^2θ",
        "h": "\\((2\\cos\\theta)^2=4\\cos^2\\theta\\)"
      },
      {
        "l": "Evaluate \\(A=\\frac{1}{2}\\int_0^{\\pi/2}4\\cos^2\\theta\\,d\\theta=\\)",
        "a": "pi/2",
        "h": "Use half-angle identity → \\(\\pi/2\\)"
      }
    ],
    "steps_ar": [
      {
        "l": "الصيغة: \\(A=\\frac{1}{2}\\int r^2\\,d\\theta\\). هنا \\(r^2=\\)",
        "a": "4cos^2θ",
        "h": "\\((2\\cos\\theta)^2=4\\cos^2\\theta\\)"
      },
      {
        "l": "احسب \\(A=\\frac{1}{2}\\int_0^{\\pi/2}4\\cos^2\\theta\\,d\\theta=\\)",
        "a": "pi/2",
        "h": "استخدم متطابقة نصف الزاوية ← \\(\\pi/2\\)"
      }
    ]
  },
  {
    "t": "qc",
    "ti": "Quick Check: Polar Coordinates",
    "ti_ar": "فحص سريع: الإحداثيات القطبية",
    "q": "Convert \\((r,\\theta)=(4, \\pi/3)\\) to rectangular \\((x,y)\\):",
    "q_ar": "حول النقطة \\((r,\\theta)=(4, \\pi/3)\\) إلى الإحداثيات المتعامدة \\((x,y)\\):",
    "o": [
      "\\((2, 2\\sqrt{3})\\)",
      "\\((2\\sqrt{3}, 2)\\)",
      "\\((4, 4\\sqrt{3})\\)",
      "\\((2, 2)\\)"
    ],
    "o_ar": [
      "\\((2, 2\\sqrt{3})\\)",
      "\\((2\\sqrt{3}, 2)\\)",
      "\\((4, 4\\sqrt{3})\\)",
      "\\((2, 2)\\)"
    ],
    "a": 0,
    "ex": "\\(x=r\\cos\\theta=4\\cos(\\pi/3)=4(1/2)=2\\) and \\(y=r\\sin\\theta=4\\sin(\\pi/3)=4(\\sqrt{3}/2)=2\\sqrt{3}\\).",
    "ex_ar": "\\(x=r\\cos\\theta=4\\cos(\\pi/3)=4(1/2)=2\\) و \\(y=r\\sin\\theta=4\\sin(\\pi/3)=4(\\sqrt{3}/2)=2\\sqrt{3}\\)."
  },
  {
    "t": "ord",
    "ti": "Order the Steps: Polar Area Between Two Curves",
    "ti_ar": "ترتيب الخطوات: المساحة القطبية المحصورة بين منحنيين",
    "q": "Arrange the procedure to calculate the area bounded between outer curve \\(r_2(\\theta)\\) and inner curve \\(r_1(\\theta)\\):",
    "q_ar": "رتب خطوات حساب المساحة المحصورة بين المنحنى الخارجي \\(r_2(\\theta)\\) والمنحنى الداخلي \\(r_1(\\theta)\\):",
    "items": [
      "Set \\(r_1(\\theta) = r_2(\\theta)\\) and solve for the angular intersection limits \\(\\alpha\\) and \\(\\beta\\)",
      "Verify which curve is farther from the origin (\\(r_2\\)) and which is closer (\\(r_1\\)) on the interval \\([\\alpha, \\beta]\\)",
      "Square each function individually: \\([r_2(\\theta)]^2\\) and \\([r_1(\\theta)]^2\\)",
      "Form the difference of squares: \\([r_2]^2 - [r_1]^2\\) (never \\((r_2 - r_1)^2\\))",
      "Set up the area integral with the factor \\(\\frac{1}{2}\\): \\(A = \\frac{1}{2}\\int_\\alpha^\\beta \\left([r_2]^2 - [r_1]^2\\right)d\\theta\\)",
      "Evaluate the definite integral analytically or with calculator numerical integration"
    ],
    "items_ar": [
      "مساواة \\(r_1(\\theta) = r_2(\\theta)\\) وحل المعادلة لإيجاد حدود الزاوية للتقاطع \\(\\alpha\\) و\\(\\beta\\)",
      "التحقق من المنحنى الأبعد عن نقطة الأصل (\\(r_2\\)) والمنحنى الأقرب (\\(r_1\\)) على الفترة \\([\\alpha, \\beta]\\)",
      "تربيع كل دالة على حدة: \\([r_2(\\theta)]^2\\) و\\([r_1(\\theta)]^2\\)",
      "تكوين فرق المربعين: \\([r_2]^2 - [r_1]^2\\) (وليس أبداً \\((r_2 - r_1)^2\\))",
      "إعداد تكامل المساحة مع المعامل \\(\\frac{1}{2}\\): \\(A = \\frac{1}{2}\\int_\\alpha^\\beta \\left([r_2]^2 - [r_1]^2\\right)d\\theta\\)",
      "حساب التكامل المحدود تحليلياً أو بالتكامل العددي على الآلة الحاسبة"
    ],
    "sol": "Polar area between curves always uses the difference of squares [r_outer]² - [r_inner]², multiplied by 1/2.",
    "sol_ar": "تستخدم المساحة القطبية بين منحنيين دائماً فرق المربعين [r_outer]² - [r_inner]²، مضروباً في 1/2."
  },
  {
    "t": "cat",
    "ti": "Classify Polar Curves by Equation Type",
    "ti_ar": "تصنيف المنحنيات القطبية حسب نوع المعادلة",
    "categories": [
      "Circle",
      "Cardioid / Limaçon",
      "Rose Curve"
    ],
    "categories_ar": [
      "دائرة",
      "منحنى قلبي / ليماسون",
      "منحنى وردي"
    ],
    "items": [
      {
        "s": "\\(r = 4\\cos\\theta\\)",
        "s_ar": "\\(r = 4\\cos\\theta\\)",
        "cat": 0
      },
      {
        "s": "\\(r = 2 + 2\\sin\\theta\\)",
        "s_ar": "\\(r = 2 + 2\\sin\\theta\\)",
        "cat": 1
      },
      {
        "s": "\\(r = 3\\sin(2\\theta)\\)",
        "s_ar": "\\(r = 3\\sin(2\\theta)\\)",
        "cat": 2
      },
      {
        "s": "\\(r = 6\\sin\\theta\\)",
        "s_ar": "\\(r = 6\\sin\\theta\\)",
        "cat": 0
      },
      {
        "s": "\\(r = 3 - 2\\cos\\theta\\)",
        "s_ar": "\\(r = 3 - 2\\cos\\theta\\)",
        "cat": 1
      },
      {
        "s": "\\(r = 5\\cos(3\\theta)\\)",
        "s_ar": "\\(r = 5\\cos(3\\theta)\\)",
        "cat": 2
      }
    ],
    "sol": "r = a cosθ or a sinθ are circles through the pole; r = a ± b cos/sin θ are cardioids/limaçons; r = a cos(nθ) or a sin(nθ) are rose curves.",
    "sol_ar": "r = a cosθ أو a sinθ دوائر تمر بالقطب؛ r = a ± b cos/sin θ منحنيات قلبية أو ليماسون؛ r = a cos(nθ) أو a sin(nθ) منحنيات وردية."
  },
  {
    "t": "se",
    "ti": "Spot the Error: Algebraic & Domain Verification (Unit 9 · Polar Coordinates & Polar Area)",
    "q": "A student solves the equation \\(\\sqrt{2x + 25} = x - 5\\) step by step. Which step introduces an invalid conclusion?",
    "steps": [
      "Square both sides to eliminate the radical: \\(2x + 25 = (x - 5)^2\\).",
      "Expand the right-hand side: \\(2x + 25 = x^2 - 10x + 25\\).",
      "Rearrange and factor: \\(x^2 - 12x = 0 \\implies x(x - 12) = 0\\).",
      "Conclude that both \\(x = 0\\) and \\(x = 12\\) are valid real solutions."
    ],
    "errorStep": 4,
    "reasons": [
      "Substituting \\(x = 0\\) into the original equation gives \\(\\sqrt{25} = -5\\) (\\(5 = -5\\)), which is false because the principal square root is non-negative (\\(x - 5 \\ge 0\\) requires \\(x \\ge 5\\)).",
      "Expanding \\((x - 5)^2\\) should give \\(x^2 - 25\\) with no middle term.",
      "Factoring \\(x^2 - 12x = 0\\) only yields \\(x = 12\\)."
    ],
    "correctReason": 0,
    "h": "Test \\(x = 0\\) in the original equation \\(\\sqrt{2x + 25} = x - 5\\).",
    "sol": "Squaring both sides is a non-reversible step unless \\(x - 5 \\ge 0 \\iff x \\ge 5\\). Therefore \\(x = 0\\) is an extraneous root and \\(x = 12\\) is the unique solution.",
    "ti_ar": "اكتشف الخطأ: الجذور الدخيلة والتحقق من المجال (Unit 9 · Polar Coordinates & Polar Area)",
    "q_ar": "يحل طالب المعادلة \\(\\sqrt{2x + 25} = x - 5\\) خطوة بخطوة. أي خطوة تتضمن استنتاجاً خاطئاً؟",
    "steps_ar": [
      "تربيع الطرفين للتخلص من الجذر: \\(2x + 25 = (x - 5)^2\\).",
      "فك المربع الكامل: \\(2x + 25 = x^2 - 10x + 25\\).",
      "الترتيب والتحليل: \\(x^2 - 12x = 0 \\implies x(x - 12) = 0\\).",
      "استنتاج أن كلاً من \\(x = 0\\) و \\(x = 12\\) حلان صحيحان للمعادلة الأصلية."
    ],
    "reasons_ar": [
      "التعويض عن \\(x = 0\\) في المعادلة الأصلية يعطي \\(5 = -5\\) وهو مستحيل لأن الجذر التربيعي الأساسي غير سالب (يجب أن يتحقق \\(x \\ge 5\\)).",
      "فك التربيع غير صحيح.",
      "التحليل بإخراج العامل المشترك غير صحيح."
    ],
    "h_ar": "عوّض عن \\(x = 0\\) في المعادلة الأصلية للتحقق من إشارة الطرف الأيمن.",
    "sol_ar": "الشرط اللازم هو \\(x - 5 \\ge 0 \\implies x \\ge 5\\)، لذا يُرفض الجذر الدخيل \\(x = 0\\) ويبقى \\(x = 12\\) فقط."
  },
  {
    "t": "ms",
    "ti": "Examiner Mode: Multi-Step Structured Problem (Unit 9 · Polar Coordinates & Polar Area)",
    "q": "Let \\(f(x) = x^2 - 10x + 29\\) for \\(x \\ge 5\\). (a) Express \\(f(x)\\) in completed-square vertex form and state the range of \\(f\\). (b) Find an expression for the inverse function \\(f^{-1}(x)\\) and state its domain.",
    "parts": [
      {
        "label": "Part (a) — Vertex Form & Range",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "Complete the square: \\(f(x) = (x - 5)^2 - 25 + 29 = (x - 5)^2 + 4\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "State exact range: \\(f(x) \\ge 4\\) (or \\([4, \\infty)\\))."
          }
        ]
      },
      {
        "label": "Part (b) — Inverse Function & Domain",
        "marks": 3,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "Set \\(y = (x - 5)^2 + 4 \\implies (x - 5)^2 = y - 4\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "Select positive branch (since \\(x \\ge 5\\)): \\(f^{-1}(x) = 5 + \\sqrt{x - 4}\\)."
          },
          {
            "code": "B1",
            "marks": 1,
            "text": "State domain of \\(f^{-1}\\): \\(x \\ge 4\\) (matching the range of \\(f\\))."
          }
        ]
      }
    ],
    "examinerTip": "Writing \\(\\pm\\sqrt{x - 4}\\) for \\(f^{-1}(x)\\) loses the final A1 mark because a function must be single-valued; use the domain restriction \\(x \\ge 5\\) to choose the \\(+\\) sign.",
    "ti_ar": "وضع المصحح: إكمال المربع والدالة العكسية (Unit 9 · Polar Coordinates & Polar Area)",
    "q_ar": "لتكن \\(f(x) = x^2 - 10x + 29\\) حيث \\(x \\ge 5\\). (أ) اكتب \\(f(x)\\) في صورة المربع الكامل وحدد مداها. (ب) أوجد قاعدة الدالة العكسية \\(f^{-1}(x)\\) ومجالها.",
    "examinerTip_ar": "الدالة العكسية يجب أن تكون وحيدة القيمة، لذا نختار الإشارة الموجبة للجذر \\(5 + \\sqrt{x - 4}\\) لأن \\(x \\ge 5\\)."
  },
  {
    "t": "mt",
    "ti": "Matching: Core Algebraic & Analytic Principles (Unit 9 · Polar Coordinates & Polar Area)",
    "p": [
      {
        "l": "\\(b^2 - 4ac = 0\\)",
        "r": "Line is tangent to the quadratic curve (1 repeated root)"
      },
      {
        "l": "\\(\\text{dom}(f^{-1})\\)",
        "r": "Equals \\(\\text{ran}(f)\\) (Range of original function)"
      },
      {
        "l": "\\(f(x - h) + k\\)",
        "r": "Translation by vector \\(\\binom{h}{k}\\)"
      },
      {
        "l": "\\(x_1 + x_2 = -b/a,\\; x_1 x_2 = c/a\\)",
        "r": "Vieta's root-coefficient relations"
      }
    ],
    "ti_ar": "مطابقة: المبادئ الجبرية والتحليلية الأساسية (Unit 9 · Polar Coordinates & Polar Area)",
    "p_ar": [
      {
        "l": "\\(b^2 - 4ac = 0\\)",
        "r": "المستقيم مماس للمنحنى التربيعي (جذر حقيقي مكرر)"
      },
      {
        "l": "\\(\\text{dom}(f^{-1})\\)",
        "r": "يساوي مدى الدالة الأصلية \\(\\text{ran}(f)\\)"
      },
      {
        "l": "\\(f(x - h) + k\\)",
        "r": "إزاحة هندسية بالمتجه \\(\\binom{h}{k}\\)"
      },
      {
        "l": "\\(x_1 + x_2 = -b/a,\\; x_1 x_2 = c/a\\)",
        "r": "علاقات فييت بين الجذور والمعاملات"
      }
    ]
  },
  {
    "t": "qc",
    "ti": "Quick Check: Vertex & Minimum Analysis (Unit 9 · Polar Coordinates & Polar Area)",
    "ti_ar": "فحص سريع: تحليل نقطة الرأس والقيمة الصغرى (Unit 9 · Polar Coordinates & Polar Area)",
    "q": "What is the minimum value of \\( f(x) = (x - 8)^2 + 5 \\) over all real \\( x \\)?",
    "q_ar": "ما هي القيمة الصغرى للدالة \\( f(x) = (x - 8)^2 + 5 \\) لكل \\( x \\in \\mathbb{R} \\)؟",
    "o": [
      "\\( 5 \\)",
      "\\( 8 \\)",
      "\\( -8 \\)",
      "\\( 69 \\)"
    ],
    "o_ar": [
      "\\( 5 \\)",
      "\\( 8 \\)",
      "\\( -8 \\)",
      "\\( 69 \\)"
    ],
    "a": 0,
    "ex": "Since \\( (x - 8)^2 \\ge 0 \\), the minimum value is \\( 5 \\) achieved at \\( x = 8 \\).",
    "ex_ar": "بما أن المربع الكامل غير سالب، فإن القيمة الصغرى هي \\( 5 \\) عند \\( x = 8 \\)."
  }
];

D["apbc-c5"] = [
  {
    "t": "cat",
    "ti": "Classify Series Convergence Behavior",
    "ti_ar": "تصنيف سلوك تقارب المتسلسلات",
    "categories": [
      "Converges Absolutely",
      "Converges Conditionally",
      "Diverges"
    ],
    "categories_ar": [
      "تتقارب مطلقاً",
      "تتقارب مشروطاً",
      "تتباعد"
    ],
    "items": [
      {
        "s": "\\(\\sum_{n=1}^\\infty \\frac{(-1)^n}{n^2}\\)",
        "s_ar": "\\(\\sum_{n=1}^\\infty \\frac{(-1)^n}{n^2}\\)",
        "cat": 0
      },
      {
        "s": "\\(\\sum_{n=1}^\\infty \\frac{(-1)^n}{n}\\)",
        "s_ar": "\\(\\sum_{n=1}^\\infty \\frac{(-1)^n}{n}\\)",
        "cat": 1
      },
      {
        "s": "\\(\\sum_{n=1}^\\infty \\frac{1}{n}\\)",
        "s_ar": "\\(\\sum_{n=1}^\\infty \\frac{1}{n}\\)",
        "cat": 2
      },
      {
        "s": "\\(\\sum_{n=1}^\\infty \\left(\\frac{2}{3}\\right)^n\\)",
        "s_ar": "\\(\\sum_{n=1}^\\infty \\left(\\frac{2}{3}\\right)^n\\)",
        "cat": 0
      },
      {
        "s": "\\(\\sum_{n=1}^\\infty \\frac{n}{n+1}\\)",
        "s_ar": "\\(\\sum_{n=1}^\\infty \\frac{n}{n+1}\\)",
        "cat": 2
      }
    ],
    "sol": "\\(\\sum 1/n^2\\) converges absolutely (p=2). The alternating harmonic series converges conditionally. \\(\\sum 1/n\\) diverges (harmonic). Geometric series with |r|=2/3 converges absolutely. \\(\\sum n/(n+1)\\) diverges by the n-th term test.",
    "sol_ar": "\\(\\sum 1/n^2\\) تتقارب مطلقاً (p=2). المتسلسلة التوافقية المتناوبة تتقارب مشروطاً. \\(\\sum 1/n\\) تتباعد (توافقية). المتسلسلة الهندسية ذات |r|=2/3 تتقارب مطلقاً. \\(\\sum n/(n+1)\\) تتباعد باختبار الحد النوني."
  },
  {
    "t": "sr",
    "ti": "Worked Example: Alternating Series Test",
    "ti_ar": "مثال محلول: اختبار المتسلسلة المتناوبة",
    "steps": [
      "Determine if \\(\\displaystyle\\sum_{n=1}^{\\infty}\\dfrac{(-1)^{n+1}}{n}\\) converges. Check the Alternating Series Test conditions: the terms \\(a_n=\\dfrac1n\\) must be decreasing and approach \\(0\\).",
      "Since \\(\\dfrac1n\\) is decreasing and \\(\\dfrac1n\\to0\\) as \\(n\\to\\infty\\), both conditions hold.",
      "By the Alternating Series Test, the series converges (this is the alternating harmonic series)."
    ],
    "steps_ar": [
      "حدد ما إذا كانت \\(\\displaystyle\\sum_{n=1}^{\\infty}\\dfrac{(-1)^{n+1}}{n}\\) متقاربة. تحقق من شروط اختبار المتسلسلة المتناوبة: الحدود \\(a_n=\\dfrac1n\\) يجب أن تكون متناقصة وتقترب من \\(0\\).",
      "بما أن \\(\\dfrac1n\\) متناقصة و\\(\\dfrac1n\\to0\\) عندما \\(n\\to\\infty\\)، يتحقق كلا الشرطين.",
      "وفق اختبار المتسلسلة المتناوبة، تتقارب المتسلسلة (وهذه هي المتسلسلة التوافقية المتناوبة)."
    ]
  },
  {
    "t": "qc",
    "ti": "Quick Check: Power Series",
    "ti_ar": "فحص سريع: متسلسلات القوى",
    "q": "The interval of convergence for a power series is centered at:",
    "q_ar": "فترة التقارب لمتسلسلة القوى يكون مركزها عند:",
    "o": [
      "The center of the series, \\(a\\)",
      "\\(x=0\\) always",
      "The radius of convergence",
      "Infinity"
    ],
    "o_ar": [
      "مركز المتسلسلة، \\(a\\)",
      "\\(x=0\\) دائماً",
      "نصف قطر التقارب",
      "اللانهاية"
    ],
    "a": 0,
    "ex": "A power series \\(\\sum c_n(x-a)^n\\) is always centered at \\(x=a\\).",
    "ex_ar": "متسلسلة القوى \\(\\sum c_n(x-a)^n\\) دائماً يكون مركزها عند \\(x=a\\)."
  },
  {
    "t": "num",
    "ti": "Sum of an Infinite Geometric Series",
    "ti_ar": "مجموع متسلسلة هندسية لانهائية",
    "q": "Evaluate the sum of the convergent geometric series \\(\\sum_{n=0}^\\infty 6\\left(\\frac{1}{3}\\right)^n\\).",
    "q_ar": "احسب مجموع المتسلسلة الهندسية المتقاربة \\(\\sum_{n=0}^\\infty 6\\left(\\frac{1}{3}\\right)^n\\).",
    "a": 9,
    "tol": 0.001,
    "h": "Geometric series sum formula is \\(S = \\frac{a}{1 - r}\\) where \\(a = 6\\) and \\(r = 1/3\\).",
    "h_ar": "صيغة مجموع المتسلسلة الهندسية هي \\(S = \\frac{a}{1 - r}\\) حيث \\(a = 6\\) و \\(r = 1/3\\).",
    "sol": "\\(S = \\frac{6}{1 - 1/3} = \\frac{6}{2/3} = 9\\).",
    "sol_ar": "\\(S = \\frac{6}{1 - 1/3} = \\frac{6}{2/3} = 9\\)."
  },
  {
    "t": "ord",
    "ti": "Order the Series Convergence Decision Hierarchy",
    "ti_ar": "ترتيب خطوات التسلسل الهرمي لاتخاذ قرار تقارب المتسلسلات",
    "q": "Arrange the standard decision sequence for analyzing \\(\\sum a_n\\):",
    "q_ar": "رتب التسلسل القياسي لتحليل تقارب المتسلسلة \\(\\sum a_n\\):",
    "items": [
      "Apply the n-th Term Test for Divergence: compute \\(\\lim_{n\\to\\infty} a_n\\); if non-zero, it diverges immediately",
      "Inspect for recognizable geometric series \\(\\sum c r^n\\) or p-series \\(\\sum 1/n^p\\)",
      "If alternating with \\((-1)^n\\), verify decreasing magnitude and limit zero using Alternating Series Test (AST)",
      "If factorials \\(n!\\) or variable powers \\(c^n\\) appear, apply the Ratio Test: compute \\(L = \\lim |a_{n+1}/a_n|\\)",
      "If algebraic ratios resemble p-series, apply the Limit Comparison Test (LCT) with \\(b_n = 1/n^p\\)",
      "If readily integrable as a continuous decreasing positive function, evaluate \\(\\int_1^\\infty f(x)\\,dx\\)"
    ],
    "items_ar": [
      "تطبيق اختبار الحد النوني للتباعد: حساب \\(\\lim_{n\\to\\infty} a_n\\)؛ إذا كانت لا تساوي صفراً، فهي متباعدة فوراً",
      "فحص ما إذا كانت المتسلسلة هندسية معروفة \\(\\sum c r^n\\) أو متسلسلة p بالصيغة \\(\\sum 1/n^p\\)",
      "إذا كانت متناوبة بوجود \\((-1)^n\\)، التحقق من تناقص المقدار واقتراب النهاية من الصفر باختبار المتسلسلة المتناوبة (AST)",
      "إذا ظهرت المضاريب \\(n!\\) أو القوى المتغيرة \\(c^n\\)، تطبيق اختبار النسبة: حساب \\(L = \\lim |a_{n+1}/a_n|\\)",
      "إذا كانت النسب الجبرية تشبه متسلسلة p، تطبيق اختبار مقارنة النهايات (LCT) مع \\(b_n = 1/n^p\\)",
      "إذا كانت قابلة للتكامل كدالة موجبة متصلة متناقصة، حساب التكامل المعتل \\(\\int_1^\\infty f(x)\\,dx\\)"
    ],
    "sol": "Always start with the n-th term test, check geometric/p-series, then move to AST, Ratio, LCT, or Integral tests.",
    "sol_ar": "ابدأ دائماً باختبار الحد النوني، ثم افحص المتسلسلات الهندسية ومتسلسلات p، ثم انتقل إلى اختبارات AST أو النسبة أو مقارنة النهايات أو التكامل."
  },
  {
    "t": "se",
    "ti": "Spot the Error: Algebraic & Domain Verification (Unit 10 · Infinite Sequences & Series — Convergence Tests)",
    "q": "A student solves the equation \\(\\sqrt{2x + 9} = x - 3\\) step by step. Which step introduces an invalid conclusion?",
    "steps": [
      "Square both sides to eliminate the radical: \\(2x + 9 = (x - 3)^2\\).",
      "Expand the right-hand side: \\(2x + 9 = x^2 - 6x + 9\\).",
      "Rearrange and factor: \\(x^2 - 8x = 0 \\implies x(x - 8) = 0\\).",
      "Conclude that both \\(x = 0\\) and \\(x = 8\\) are valid real solutions."
    ],
    "errorStep": 4,
    "reasons": [
      "Substituting \\(x = 0\\) into the original equation gives \\(\\sqrt{9} = -3\\) (\\(3 = -3\\)), which is false because the principal square root is non-negative (\\(x - 3 \\ge 0\\) requires \\(x \\ge 3\\)).",
      "Expanding \\((x - 3)^2\\) should give \\(x^2 - 9\\) with no middle term.",
      "Factoring \\(x^2 - 8x = 0\\) only yields \\(x = 8\\)."
    ],
    "correctReason": 0,
    "h": "Test \\(x = 0\\) in the original equation \\(\\sqrt{2x + 9} = x - 3\\).",
    "sol": "Squaring both sides is a non-reversible step unless \\(x - 3 \\ge 0 \\iff x \\ge 3\\). Therefore \\(x = 0\\) is an extraneous root and \\(x = 8\\) is the unique solution.",
    "ti_ar": "اكتشف الخطأ: الجذور الدخيلة والتحقق من المجال (Unit 10 · Infinite Sequences & Series — Convergence Tests)",
    "q_ar": "يحل طالب المعادلة \\(\\sqrt{2x + 9} = x - 3\\) خطوة بخطوة. أي خطوة تتضمن استنتاجاً خاطئاً؟",
    "steps_ar": [
      "تربيع الطرفين للتخلص من الجذر: \\(2x + 9 = (x - 3)^2\\).",
      "فك المربع الكامل: \\(2x + 9 = x^2 - 6x + 9\\).",
      "الترتيب والتحليل: \\(x^2 - 8x = 0 \\implies x(x - 8) = 0\\).",
      "استنتاج أن كلاً من \\(x = 0\\) و \\(x = 8\\) حلان صحيحان للمعادلة الأصلية."
    ],
    "reasons_ar": [
      "التعويض عن \\(x = 0\\) في المعادلة الأصلية يعطي \\(3 = -3\\) وهو مستحيل لأن الجذر التربيعي الأساسي غير سالب (يجب أن يتحقق \\(x \\ge 3\\)).",
      "فك التربيع غير صحيح.",
      "التحليل بإخراج العامل المشترك غير صحيح."
    ],
    "h_ar": "عوّض عن \\(x = 0\\) في المعادلة الأصلية للتحقق من إشارة الطرف الأيمن.",
    "sol_ar": "الشرط اللازم هو \\(x - 3 \\ge 0 \\implies x \\ge 3\\)، لذا يُرفض الجذر الدخيل \\(x = 0\\) ويبقى \\(x = 8\\) فقط."
  },
  {
    "t": "ms",
    "ti": "Examiner Mode: Multi-Step Structured Problem (Unit 10 · Infinite Sequences & Series — Convergence Tests)",
    "q": "Let \\(f(x) = x^2 - 6x + 14\\) for \\(x \\ge 3\\). (a) Express \\(f(x)\\) in completed-square vertex form and state the range of \\(f\\). (b) Find an expression for the inverse function \\(f^{-1}(x)\\) and state its domain.",
    "parts": [
      {
        "label": "Part (a) — Vertex Form & Range",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "Complete the square: \\(f(x) = (x - 3)^2 - 9 + 14 = (x - 3)^2 + 5\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "State exact range: \\(f(x) \\ge 5\\) (or \\([5, \\infty)\\))."
          }
        ]
      },
      {
        "label": "Part (b) — Inverse Function & Domain",
        "marks": 3,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "Set \\(y = (x - 3)^2 + 5 \\implies (x - 3)^2 = y - 5\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "Select positive branch (since \\(x \\ge 3\\)): \\(f^{-1}(x) = 3 + \\sqrt{x - 5}\\)."
          },
          {
            "code": "B1",
            "marks": 1,
            "text": "State domain of \\(f^{-1}\\): \\(x \\ge 5\\) (matching the range of \\(f\\))."
          }
        ]
      }
    ],
    "examinerTip": "Writing \\(\\pm\\sqrt{x - 5}\\) for \\(f^{-1}(x)\\) loses the final A1 mark because a function must be single-valued; use the domain restriction \\(x \\ge 3\\) to choose the \\(+\\) sign.",
    "ti_ar": "وضع المصحح: إكمال المربع والدالة العكسية (Unit 10 · Infinite Sequences & Series — Convergence Tests)",
    "q_ar": "لتكن \\(f(x) = x^2 - 6x + 14\\) حيث \\(x \\ge 3\\). (أ) اكتب \\(f(x)\\) في صورة المربع الكامل وحدد مداها. (ب) أوجد قاعدة الدالة العكسية \\(f^{-1}(x)\\) ومجالها.",
    "examinerTip_ar": "الدالة العكسية يجب أن تكون وحيدة القيمة، لذا نختار الإشارة الموجبة للجذر \\(3 + \\sqrt{x - 5}\\) لأن \\(x \\ge 3\\)."
  },
  {
    "t": "sb",
    "ti": "Step Builder: Completing the Square & Vertex Analysis (Unit 10 · Infinite Sequences & Series — Convergence Tests)",
    "steps": [
      {
        "l": "In \\(y = x^2 - 6x + 14\\), halve the \\(x\\)-coefficient to write \\((x - h)^2\\) where \\(h =\\)",
        "a": "3",
        "h": "Take half of 6."
      },
      {
        "l": "Compute the minimum value \\(k = 14 - 3^2 =\\)",
        "a": "5",
        "h": "Subtract 9 from 14."
      },
      {
        "l": "Evaluate \\(y\\) when \\(x = 5\\): \\(y =\\)",
        "a": "9",
        "h": "Compute \\((2)^2 + 5\\)."
      }
    ],
    "ti_ar": "بناء الخطوات: إكمال المربع وإيجاد القيمة الصغرى (Unit 10 · Infinite Sequences & Series — Convergence Tests)",
    "steps_ar": [
      {
        "l": "في الدالة \\(y = x^2 - 6x + 14\\): قيمة \\(h\\) في \\((x - h)^2\\) تساوي:",
        "a": "3",
        "h": "اقسم معامل x وهو 6 على 2."
      },
      {
        "l": "احسب القيمة الصغرى \\(k = 14 - 3^2 =\\)",
        "a": "5",
        "h": "اطرح 9 من 14."
      },
      {
        "l": "احسب قيمة \\(y\\) عندما \\(x = 5\\):",
        "a": "9",
        "h": "احسب \\(4 + 5\\)."
      }
    ]
  },
  {
    "t": "mt",
    "ti": "Matching: Core Algebraic & Analytic Principles (Unit 10 · Infinite Sequences & Series — Convergence Tests)",
    "p": [
      {
        "l": "\\(b^2 - 4ac = 0\\)",
        "r": "Line is tangent to the quadratic curve (1 repeated root)"
      },
      {
        "l": "\\(\\text{dom}(f^{-1})\\)",
        "r": "Equals \\(\\text{ran}(f)\\) (Range of original function)"
      },
      {
        "l": "\\(f(x - h) + k\\)",
        "r": "Translation by vector \\(\\binom{h}{k}\\)"
      },
      {
        "l": "\\(x_1 + x_2 = -b/a,\\; x_1 x_2 = c/a\\)",
        "r": "Vieta's root-coefficient relations"
      }
    ],
    "ti_ar": "مطابقة: المبادئ الجبرية والتحليلية الأساسية (Unit 10 · Infinite Sequences & Series — Convergence Tests)",
    "p_ar": [
      {
        "l": "\\(b^2 - 4ac = 0\\)",
        "r": "المستقيم مماس للمنحنى التربيعي (جذر حقيقي مكرر)"
      },
      {
        "l": "\\(\\text{dom}(f^{-1})\\)",
        "r": "يساوي مدى الدالة الأصلية \\(\\text{ran}(f)\\)"
      },
      {
        "l": "\\(f(x - h) + k\\)",
        "r": "إزاحة هندسية بالمتجه \\(\\binom{h}{k}\\)"
      },
      {
        "l": "\\(x_1 + x_2 = -b/a,\\; x_1 x_2 = c/a\\)",
        "r": "علاقات فييت بين الجذور والمعاملات"
      }
    ]
  }
];

D["apbc-c6"] = [
  {
    "t": "ord",
    "ti": "Order the Steps: Interval of Convergence for a Power Series",
    "ti_ar": "ترتيب الخطوات: فترة تقارب متسلسلة القوى",
    "q": "Arrange the complete procedure to determine the interval of convergence for \\(\\sum c_n(x-a)^n\\):",
    "q_ar": "رتب الخطوات الكاملة لتحديد فترة التقارب لمتسلسلة القوى \\(\\sum c_n(x-a)^n\\):",
    "items": [
      "Set up the Ratio Test limit: \\(L = \\lim_{n\\to\\infty}\\left|\\frac{a_{n+1}}{a_n}\\right|\\)",
      "Solve the inequality \\(L < 1\\) for \\(|x - a| < R\\) to determine the radius of convergence \\(R\\)",
      "Identify the open interval of convergence \\((a - R, a + R)\\)",
      "Substitute the left endpoint \\(x = a - R\\) into the original series and test for convergence",
      "Substitute the right endpoint \\(x = a + R\\) into the original series and test for convergence",
      "Combine the interior and valid endpoints using brackets or parentheses for the final interval"
    ],
    "items_ar": [
      "إعداد نهاية اختبار النسبة: \\(L = \\lim_{n\\to\\infty}\\left|\\frac{a_{n+1}}{a_n}\\right|\\)",
      "حل المتباينة \\(L < 1\\) للحصول على \\(|x - a| < R\\) وتحديد نصف قطر التقارب \\(R\\)",
      "تحديد فترة التقارب المفتوحة \\((a - R, a + R)\\)",
      "التعويض بالطرف الأيسر \\(x = a - R\\) في المتسلسلة الأصلية واختبار التقارب",
      "التعويض بالطرف الأيمن \\(x = a + R\\) في المتسلسلة الأصلية واختبار التقارب",
      "دمج الفترة الداخلية مع الأطراف المتقاربة باستخدام الأقواس المناسبة لكتابة الفترة النهائية"
    ],
    "sol": "Finding the interval of convergence requires applying the Ratio Test to find the radius R, and then independently testing both boundary endpoints.",
    "sol_ar": "يتطلب إيجاد فترة التقارب تطبيق اختبار النسبة لإيجاد نصف القطر R، ثم اختبار طرفي الفترة بشكل مستقل."
  },
  {
    "t": "num",
    "ti": "Taylor Polynomial Coefficient Calculation",
    "ti_ar": "حساب معامل كثير حدود تايلور",
    "q": "If \\(f^{(4)}(0) = 72\\), what is the coefficient of \\(x^4\\) in the Maclaurin series for \\(f(x)\\)?",
    "q_ar": "إذا كانت \\(f^{(4)}(0) = 72\\)، فما هو معامل \\(x^4\\) في متسلسلة ماكلورين للدالة \\(f(x)\\)؟",
    "a": 3,
    "tol": 0.001,
    "h": "The Maclaurin coefficient for \\(x^n\\) is \\(\\frac{f^{(n)}(0)}{n!}\\). Evaluate with \\(n = 4\\).",
    "h_ar": "معامل ماكلورين لـ \\(x^n\\) هو \\(\\frac{f^{(n)}(0)}{n!}\\). احسب القيمة مع \\(n = 4\\).",
    "sol": "The coefficient is \\(\\frac{f^{(4)}(0)}{4!} = \\frac{72}{24} = 3\\).",
    "sol_ar": "المعامل هو \\(\\frac{f^{(4)}(0)}{4!} = \\frac{72}{24} = 3\\)."
  },
  {
    "t": "sr",
    "ti": "Worked Example: Build a Maclaurin Series",
    "ti_ar": "مثال محلول: إنشاء متسلسلة ماكلورين",
    "steps": [
      "Find the first three terms of the Maclaurin series for \\(f(x)=e^x\\). Formula: \\(f(x)=f(0)+f'(0)x+\\dfrac{f''(0)}{2!}x^2+\\cdots\\).",
      "Every derivative of \\(e^x\\) is \\(e^x\\), and \\(e^0=1\\), so \\(f(0)=f'(0)=f''(0)=1\\).",
      "First three terms: \\(1+x+\\dfrac{x^2}{2}\\)."
    ],
    "steps_ar": [
      "أوجد الحدود الثلاثة الأولى لمتسلسلة ماكلورين للدالة \\(f(x)=e^x\\). الصيغة: \\(f(x)=f(0)+f'(0)x+\\dfrac{f''(0)}{2!}x^2+\\cdots\\).",
      "كل مشتقة لـ \\(e^x\\) هي \\(e^x\\)، و\\(e^0=1\\)، إذن \\(f(0)=f'(0)=f''(0)=1\\).",
      "الحدود الثلاثة الأولى: \\(1+x+\\dfrac{x^2}{2}\\)."
    ]
  },
  {
    "t": "qc",
    "ti": "Quick Check: Maclaurin Series",
    "ti_ar": "فحص سريع: متسلسلة ماكلورين",
    "q": "The Maclaurin series is a Taylor series centered at:",
    "q_ar": "متسلسلة ماكلورين هي متسلسلة تايلور مركزها عند:",
    "o": [
      "\\(x=0\\)",
      "\\(x=1\\)",
      "\\(x=e\\)",
      "\\(x=\\infty\\)"
    ],
    "o_ar": [
      "\\(x=0\\)",
      "\\(x=1\\)",
      "\\(x=e\\)",
      "\\(x=\\infty\\)"
    ],
    "a": 0,
    "ex": "A Maclaurin series is a Taylor series expanded about \\(x=0\\).",
    "ex_ar": "متسلسلة ماكلورين هي مفكوك متسلسلة تايلور حول \\(x=0\\)."
  },
  {
    "t": "cat",
    "ti": "Classify Standard Maclaurin Expansions",
    "ti_ar": "تصنيف مفكوكات ماكلورين القياسية",
    "categories": [
      "f(x) = e^x",
      "f(x) = sin(x)",
      "f(x) = cos(x)",
      "f(x) = 1/(1-x)"
    ],
    "categories_ar": [
      "f(x) = e^x",
      "f(x) = sin(x)",
      "f(x) = cos(x)",
      "f(x) = 1/(1-x)"
    ],
    "items": [
      {
        "s": "\\(1 + x + \\frac{x^2}{2!} + \\frac{x^3}{3!} + \\dots\\)",
        "s_ar": "\\(1 + x + \\frac{x^2}{2!} + \\frac{x^3}{3!} + \\dots\\)",
        "cat": 0
      },
      {
        "s": "\\(x - \\frac{x^3}{3!} + \\frac{x^5}{5!} - \\dots\\)",
        "s_ar": "\\(x - \\frac{x^3}{3!} + \\frac{x^5}{5!} - \\dots\\)",
        "cat": 1
      },
      {
        "s": "\\(1 - \\frac{x^2}{2!} + \\frac{x^4}{4!} - \\dots\\)",
        "s_ar": "\\(1 - \\frac{x^2}{2!} + \\frac{x^4}{4!} - \\dots\\)",
        "cat": 2
      },
      {
        "s": "\\(1 + x + x^2 + x^3 + \\dots\\)",
        "s_ar": "\\(1 + x + x^2 + x^3 + \\dots\\)",
        "cat": 3
      },
      {
        "s": "Odd powers only, alternating signs: \\(\\sum \\frac{(-1)^n x^{2n+1}}{(2n+1)!}\\)",
        "s_ar": "قوى فردية فقط بإشارات متناوبة: \\(\\sum \\frac{(-1)^n x^{2n+1}}{(2n+1)!}\\)",
        "cat": 1
      },
      {
        "s": "Even powers only, alternating signs: \\(\\sum \\frac{(-1)^n x^{2n}}{(2n)!}\\)",
        "s_ar": "قوى زوجية فقط بإشارات متناوبة: \\(\\sum \\frac{(-1)^n x^{2n}}{(2n)!}\\)",
        "cat": 2
      }
    ],
    "sol": "The 4 foundational series must be memorized: e^x has all positive terms, sin has odd terms, cos has even terms, 1/(1-x) is geometric.",
    "sol_ar": "يجب حفظ المتسلسلات الأساسية الأربع: e^x جميع حدودها موجبة، sin حدودها فردية، cos حدودها زوجية، 1/(1-x) متسلسلة هندسية."
  },
  {
    "t": "se",
    "ti": "Spot the Error: Algebraic & Domain Verification (Unit 10 · Power Series, Taylor & Maclaurin Series)",
    "q": "A student solves the equation \\(\\sqrt{2x + 9} = x - 3\\) step by step. Which step introduces an invalid conclusion?",
    "steps": [
      "Square both sides to eliminate the radical: \\(2x + 9 = (x - 3)^2\\).",
      "Expand the right-hand side: \\(2x + 9 = x^2 - 6x + 9\\).",
      "Rearrange and factor: \\(x^2 - 8x = 0 \\implies x(x - 8) = 0\\).",
      "Conclude that both \\(x = 0\\) and \\(x = 8\\) are valid real solutions."
    ],
    "errorStep": 4,
    "reasons": [
      "Substituting \\(x = 0\\) into the original equation gives \\(\\sqrt{9} = -3\\) (\\(3 = -3\\)), which is false because the principal square root is non-negative (\\(x - 3 \\ge 0\\) requires \\(x \\ge 3\\)).",
      "Expanding \\((x - 3)^2\\) should give \\(x^2 - 9\\) with no middle term.",
      "Factoring \\(x^2 - 8x = 0\\) only yields \\(x = 8\\)."
    ],
    "correctReason": 0,
    "h": "Test \\(x = 0\\) in the original equation \\(\\sqrt{2x + 9} = x - 3\\).",
    "sol": "Squaring both sides is a non-reversible step unless \\(x - 3 \\ge 0 \\iff x \\ge 3\\). Therefore \\(x = 0\\) is an extraneous root and \\(x = 8\\) is the unique solution.",
    "ti_ar": "اكتشف الخطأ: الجذور الدخيلة والتحقق من المجال (Unit 10 · Power Series, Taylor & Maclaurin Series)",
    "q_ar": "يحل طالب المعادلة \\(\\sqrt{2x + 9} = x - 3\\) خطوة بخطوة. أي خطوة تتضمن استنتاجاً خاطئاً؟",
    "steps_ar": [
      "تربيع الطرفين للتخلص من الجذر: \\(2x + 9 = (x - 3)^2\\).",
      "فك المربع الكامل: \\(2x + 9 = x^2 - 6x + 9\\).",
      "الترتيب والتحليل: \\(x^2 - 8x = 0 \\implies x(x - 8) = 0\\).",
      "استنتاج أن كلاً من \\(x = 0\\) و \\(x = 8\\) حلان صحيحان للمعادلة الأصلية."
    ],
    "reasons_ar": [
      "التعويض عن \\(x = 0\\) في المعادلة الأصلية يعطي \\(3 = -3\\) وهو مستحيل لأن الجذر التربيعي الأساسي غير سالب (يجب أن يتحقق \\(x \\ge 3\\)).",
      "فك التربيع غير صحيح.",
      "التحليل بإخراج العامل المشترك غير صحيح."
    ],
    "h_ar": "عوّض عن \\(x = 0\\) في المعادلة الأصلية للتحقق من إشارة الطرف الأيمن.",
    "sol_ar": "الشرط اللازم هو \\(x - 3 \\ge 0 \\implies x \\ge 3\\)، لذا يُرفض الجذر الدخيل \\(x = 0\\) ويبقى \\(x = 8\\) فقط."
  },
  {
    "t": "ms",
    "ti": "Examiner Mode: Multi-Step Structured Problem (Unit 10 · Power Series, Taylor & Maclaurin Series)",
    "q": "Let \\(f(x) = x^2 - 6x + 16\\) for \\(x \\ge 3\\). (a) Express \\(f(x)\\) in completed-square vertex form and state the range of \\(f\\). (b) Find an expression for the inverse function \\(f^{-1}(x)\\) and state its domain.",
    "parts": [
      {
        "label": "Part (a) — Vertex Form & Range",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "Complete the square: \\(f(x) = (x - 3)^2 - 9 + 16 = (x - 3)^2 + 7\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "State exact range: \\(f(x) \\ge 7\\) (or \\([7, \\infty)\\))."
          }
        ]
      },
      {
        "label": "Part (b) — Inverse Function & Domain",
        "marks": 3,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "Set \\(y = (x - 3)^2 + 7 \\implies (x - 3)^2 = y - 7\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "Select positive branch (since \\(x \\ge 3\\)): \\(f^{-1}(x) = 3 + \\sqrt{x - 7}\\)."
          },
          {
            "code": "B1",
            "marks": 1,
            "text": "State domain of \\(f^{-1}\\): \\(x \\ge 7\\) (matching the range of \\(f\\))."
          }
        ]
      }
    ],
    "examinerTip": "Writing \\(\\pm\\sqrt{x - 7}\\) for \\(f^{-1}(x)\\) loses the final A1 mark because a function must be single-valued; use the domain restriction \\(x \\ge 3\\) to choose the \\(+\\) sign.",
    "ti_ar": "وضع المصحح: إكمال المربع والدالة العكسية (Unit 10 · Power Series, Taylor & Maclaurin Series)",
    "q_ar": "لتكن \\(f(x) = x^2 - 6x + 16\\) حيث \\(x \\ge 3\\). (أ) اكتب \\(f(x)\\) في صورة المربع الكامل وحدد مداها. (ب) أوجد قاعدة الدالة العكسية \\(f^{-1}(x)\\) ومجالها.",
    "examinerTip_ar": "الدالة العكسية يجب أن تكون وحيدة القيمة، لذا نختار الإشارة الموجبة للجذر \\(3 + \\sqrt{x - 7}\\) لأن \\(x \\ge 3\\)."
  },
  {
    "t": "sb",
    "ti": "Step Builder: Completing the Square & Vertex Analysis (Unit 10 · Power Series, Taylor & Maclaurin Series)",
    "steps": [
      {
        "l": "In \\(y = x^2 - 6x + 16\\), halve the \\(x\\)-coefficient to write \\((x - h)^2\\) where \\(h =\\)",
        "a": "3",
        "h": "Take half of 6."
      },
      {
        "l": "Compute the minimum value \\(k = 16 - 3^2 =\\)",
        "a": "7",
        "h": "Subtract 9 from 16."
      },
      {
        "l": "Evaluate \\(y\\) when \\(x = 5\\): \\(y =\\)",
        "a": "11",
        "h": "Compute \\((2)^2 + 7\\)."
      }
    ],
    "ti_ar": "بناء الخطوات: إكمال المربع وإيجاد القيمة الصغرى (Unit 10 · Power Series, Taylor & Maclaurin Series)",
    "steps_ar": [
      {
        "l": "في الدالة \\(y = x^2 - 6x + 16\\): قيمة \\(h\\) في \\((x - h)^2\\) تساوي:",
        "a": "3",
        "h": "اقسم معامل x وهو 6 على 2."
      },
      {
        "l": "احسب القيمة الصغرى \\(k = 16 - 3^2 =\\)",
        "a": "7",
        "h": "اطرح 9 من 16."
      },
      {
        "l": "احسب قيمة \\(y\\) عندما \\(x = 5\\):",
        "a": "11",
        "h": "احسب \\(4 + 7\\)."
      }
    ]
  },
  {
    "t": "mt",
    "ti": "Matching: Core Algebraic & Analytic Principles (Unit 10 · Power Series, Taylor & Maclaurin Series)",
    "p": [
      {
        "l": "\\(b^2 - 4ac = 0\\)",
        "r": "Line is tangent to the quadratic curve (1 repeated root)"
      },
      {
        "l": "\\(\\text{dom}(f^{-1})\\)",
        "r": "Equals \\(\\text{ran}(f)\\) (Range of original function)"
      },
      {
        "l": "\\(f(x - h) + k\\)",
        "r": "Translation by vector \\(\\binom{h}{k}\\)"
      },
      {
        "l": "\\(x_1 + x_2 = -b/a,\\; x_1 x_2 = c/a\\)",
        "r": "Vieta's root-coefficient relations"
      }
    ],
    "ti_ar": "مطابقة: المبادئ الجبرية والتحليلية الأساسية (Unit 10 · Power Series, Taylor & Maclaurin Series)",
    "p_ar": [
      {
        "l": "\\(b^2 - 4ac = 0\\)",
        "r": "المستقيم مماس للمنحنى التربيعي (جذر حقيقي مكرر)"
      },
      {
        "l": "\\(\\text{dom}(f^{-1})\\)",
        "r": "يساوي مدى الدالة الأصلية \\(\\text{ran}(f)\\)"
      },
      {
        "l": "\\(f(x - h) + k\\)",
        "r": "إزاحة هندسية بالمتجه \\(\\binom{h}{k}\\)"
      },
      {
        "l": "\\(x_1 + x_2 = -b/a,\\; x_1 x_2 = c/a\\)",
        "r": "علاقات فييت بين الجذور والمعاملات"
      }
    ]
  }
];

D["apbc-frq"] = [
  {
    "t": "sr",
    "ti": "Worked Example: FRQ Taylor Series & Error Bound",
    "ti_ar": "مثال محلول: متسلسلة تايلور وحد الخطأ في الأسئلة المقالية",
    "steps": [
      "Write the Taylor polynomial: \\(P_n(x) = f(c) + f'(c)(x-c) + \\dots + \\frac{f^{(n)}(c)}{n!}(x-c)^n\\).",
      "To approximate a value, substitute \\(x\\) into \\(P_n(x)\\).",
      "For an alternating series, the error bound is bounded by the first omitted term: \\(|f(x) - P_n(x)| \\le |a_{n+1}|\\).",
      "For Lagrange Error Bound, \\(|R_n(x)| \\le \\frac{M}{(n+1)!}|x-c|^{n+1}\\), where \\(M\\) is the maximum of \\(|f^{(n+1)}(t)|\\) on the interval."
    ],
    "steps_ar": [
      "كتابة كثير حدود تايلور: \\(P_n(x) = f(c) + f'(c)(x-c) + \\dots + \\frac{f^{(n)}(c)}{n!}(x-c)^n\\).",
      "لتقريب قيمة معينة، نعوض بـ \\(x\\) في \\(P_n(x)\\).",
      "في المتسلسلة المتناوبة، يكون حد الخطأ محصوراً بالقيمة المطلقة للحد الأول المحذوف: \\(|f(x) - P_n(x)| \\le |a_{n+1}|\\).",
      "وفي حد خطأ لاغرانج، \\(|R_n(x)| \\le \\frac{M}{(n+1)!}|x-c|^{n+1}\\)، حيث \\(M\\) هي القيمة العظمى لـ \\(|f^{(n+1)}(t)|\\) على الفترة."
    ]
  },
  {
    "t": "qc",
    "ti": "Quick Check: Polar Area FRQ Formula",
    "ti_ar": "فحص سريع: صيغة المساحة القطبية في الأسئلة المقالية",
    "q": "The area enclosed by a polar curve \\(r = f(\\theta)\\) from \\(\\theta = \\alpha\\) to \\(\\theta = \\beta\\) is given by:",
    "q_ar": "المساحة المحصورة بمنحنى قطبي \\(r = f(\\theta)\\) من \\(\\theta = \\alpha\\) إلى \\(\\theta = \\beta\\) تُعطى بالصيغة:",
    "o": [
      "\\(\\frac{1}{2}\\int_\\alpha^\\beta [f(\\theta)]^2\\,d\\theta\\)",
      "\\(\\int_\\alpha^\\beta f(\\theta)\\,d\\theta\\)",
      "\\(2\\pi\\int_\\alpha^\\beta [f(\\theta)]^2\\,d\\theta\\)",
      "\\(\\frac{1}{2}\\int_\\alpha^\\beta f(\\theta)\\,d\\theta\\)"
    ],
    "o_ar": [
      "\\(\\frac{1}{2}\\int_\\alpha^\\beta [f(\\theta)]^2\\,d\\theta\\)",
      "\\(\\int_\\alpha^\\beta f(\\theta)\\,d\\theta\\)",
      "\\(2\\pi\\int_\\alpha^\\beta [f(\\theta)]^2\\,d\\theta\\)",
      "\\(\\frac{1}{2}\\int_\\alpha^\\beta f(\\theta)\\,d\\theta\\)"
    ],
    "a": 0,
    "ex": "The differential polar sector has area \\(dA = \\frac{1}{2} r^2\\,d\\theta = \\frac{1}{2} [f(\\theta)]^2\\,d\\theta\\).",
    "ex_ar": "القطاع القطبي التفاضلي له مساحة \\(dA = \\frac{1}{2} r^2\\,d\\theta = \\frac{1}{2} [f(\\theta)]^2\\,d\\theta\\)."
  },
  {
    "t": "num",
    "ti": "Alternating Series Error Bound Calculation",
    "ti_ar": "حساب حد الخطأ للمتسلسلة المتناوبة",
    "q": "The alternating series \\(S = \\sum_{n=1}^\\infty \\frac{(-1)^{n+1}}{n^2}\\) is approximated by its fourth partial sum \\(S_4\\). By the Alternating Series Estimation Theorem, what is the maximum possible absolute error \\(|S - S_4|\\)?",
    "q_ar": "المتسلسلة المتناوبة \\(S = \\sum_{n=1}^\\infty \\frac{(-1)^{n+1}}{n^2}\\) تم تقريبها بجمع حدودها الأربعة الأولى \\(S_4\\). وفق نظرية تقدير المتسلسلة المتناوبة، ما هو أقصى خطأ مطلق ممكن \\(|S - S_4|\\)؟",
    "a": 0.04,
    "tol": 0.001,
    "h": "The error bound for an alternating series is bounded by the absolute value of the first omitted term, \\(a_5 = \\frac{1}{5^2}\\).",
    "h_ar": "حد الخطأ للمتسلسلة المتناوبة محصور بالقيمة المطلقة للحد الأول المحذوف، \\(a_5 = \\frac{1}{5^2}\\).",
    "sol": "\\(|S - S_4| \\le a_5 = \\frac{1}{5^2} = \\frac{1}{25} = 0.04\\).",
    "sol_ar": "\\(|S - S_4| \\le a_5 = \\frac{1}{5^2} = \\frac{1}{25} = 0.04\\)."
  },
  {
    "t": "ord",
    "ti": "Order the AP Rubric Scoring Steps for FRQ 6 (Series)",
    "ti_ar": "ترتيب خطوات حصد درجات نموذج تصحيح السؤال المقالي 6 (المتسلسلات)",
    "q": "Arrange the step sequence to secure all 9 points on Question 6 (Taylor Series):",
    "q_ar": "رتب تسلسل الخطوات لضمان الحصول على كامل الدرجات التسع في السؤال 6 (متسلسلات تايلور):",
    "items": [
      "State the general Taylor polynomial formula \\(P_n(x) = \\sum_{k=0}^n \\frac{f^{(k)}(c)}{k!}(x-c)^k\\)",
      "Compute required derivatives \\(f'(c), f''(c), \\dots\\) and evaluate each at the specified center \\(c\\)",
      "Assemble the polynomial with explicit factorial denominators before simplifying",
      "Substitute the approximation coordinate into the polynomial expression",
      "Quote the appropriate error theorem (Lagrange bound \\(\\frac{M}{(n+1)!}|x-c|^{n+1}\\) or Alternating Series bound \\(|a_{n+1}|\\)) to justify accuracy"
    ],
    "items_ar": [
      "كتابة الصيغة العامة لكثير حدود تايلور \\(P_n(x) = \\sum_{k=0}^n \\frac{f^{(k)}(c)}{k!}(x-c)^k\\)",
      "حساب المشتقات المطلوبة \\(f'(c), f''(c), \\dots\\) وحساب قيمة كل منها عند المركز المحدد \\(c\\)",
      "تركيب كثير الحدود مع كتابة مقامات المضاريب الصريحة قبل التبسيط",
      "التعويض بإحداثي نقطة التقريب في مقدار كثير الحدود",
      "ذكر نص نظرية الخطأ المناسبة (حد لاغرانج \\(\\frac{M}{(n+1)!}|x-c|^{n+1}\\) أو حد المتسلسلة المتناوبة \\(|a_{n+1}|\\)) لتبرير الدقة"
    ],
    "sol": "AP scoring guidelines award separate points for the derivative evaluation, polynomial construction, approximation, and error bound justification.",
    "sol_ar": "تمنح إرشادات تصحيح AP درجات منفصلة لحساب المشتقات، وبناء كثير الحدود، والتقريب، وتبرير حد الخطأ."
  },
  {
    "t": "cat",
    "ti": "Classify BC FRQ Topics by Standard Section II Placement",
    "ti_ar": "تصنيف موضوعات الأسئلة المقالية لـ BC حسب موضعها في القسم الثاني",
    "categories": [
      "Part A (Graphing Calculator Active)",
      "Part B (No Calculator Allowed)"
    ],
    "categories_ar": [
      "الجزء أ (تتطلب آلة حاسبة بيانية)",
      "الجزء ب (ممنوع استخدام الآلة الحاسبة)"
    ],
    "items": [
      {
        "s": "Question 1: Physical Rate In / Rate Out Accumulation",
        "s_ar": "السؤال 1: تراكم معدل الدخول ومعدل الخروج الفيزيائي",
        "cat": 0
      },
      {
        "s": "Question 2: Parametric / Vector Particle Motion & Total Distance",
        "s_ar": "السؤال 2: حركة الجسيم بالمتجهات والمنحنيات الوسيطية والمسافة الكلية",
        "cat": 0
      },
      {
        "s": "Question 3: Graph of f' Analysis & Fundamental Theorem of Calculus",
        "s_ar": "السؤال 3: تحليل رسم المشتقة f' والنظرية الأساسية للتفاضل والتكامل",
        "cat": 1
      },
      {
        "s": "Question 4: Differential Equations, Separation of Variables & Slope Fields",
        "s_ar": "السؤال 4: المعادلات التفاضلية، وفصل المتغيرات، وحقول الميل",
        "cat": 1
      },
      {
        "s": "Question 5: Polar Curve Area & Angular Rates of Change",
        "s_ar": "السؤال 5: مساحة المنحنيات القطبية ومعدلات التغير الزاوية",
        "cat": 1
      },
      {
        "s": "Question 6: Taylor Series, Radius of Convergence & Error Bounding",
        "s_ar": "السؤال 6: متسلسلات تايلور، ونصف قطر التقارب، وحدود الخطأ",
        "cat": 1
      }
    ],
    "sol": "Part A consists of Questions 1 and 2 (30 min, graphing calculator required). Part B consists of Questions 3 through 6 (60 min, non-calculator).",
    "sol_ar": "يتكون الجزء أ من السؤالين 1 و2 (30 دقيقة، تتطلب آلة حاسبة بيانية). ويتكون الجزء ب من الأسئلة من 3 إلى 6 (60 دقيقة، بدون حاسبة)."
  },
  {
    "t": "se",
    "ti": "Spot the Error: Implicit Differentiation & Product Rule (AP Calculus BC Free-Response Questions (FRQs))",
    "q": "A student differentiates the implicit curve \\(x^2 + 3xy + y^2 = 0\\) with respect to \\(x\\). Identify the step with the mathematical flaw:",
    "steps": [
      "Differentiate \\(x^2\\) with respect to \\(x\\) to obtain \\(2x\\).",
      "Differentiate the middle term \\(3xy\\) with respect to \\(x\\) as \\(3\\dfrac{dy}{dx}\\).",
      "Differentiate \\(y^2\\) using the Chain Rule as \\(2y\\dfrac{dy}{dx}\\) and the constant \\(0\\) as \\(0\\).",
      "Collect \\(\\dfrac{dy}{dx}\\) terms and divide to isolate \\(\\dfrac{dy}{dx}\\)."
    ],
    "errorStep": 2,
    "reasons": [
      "The term \\(3xy\\) is a product of two functions of \\(x\\); by the Product Rule its derivative is \\(3y + 3x\\dfrac{dy}{dx}\\), not \\(3\\dfrac{dy}{dx}\\).",
      "The derivative of \\(y^2\\) with respect to \\(x\\) is simply \\(2y\\) without \\(\\dfrac{dy}{dx}\\).",
      "The constant \\(0\\) remains \\(0\\) after differentiation."
    ],
    "correctReason": 0,
    "h": "Look closely at how the product \\(3xy\\) was differentiated in Step 2.",
    "sol": "Applying the Product Rule to \\(3xy\\) gives \\(3y + 3x\\dfrac{dy}{dx}\\). Thus \\(2x + 3y + (3x + 2y)\\dfrac{dy}{dx} = 0 \\implies \\dfrac{dy}{dx} = -\\dfrac{2x + 3y}{3x + 2y}\\).",
    "ti_ar": "اكتشف الخطأ: الاشتقاق الضمني وقاعدة الضرب (AP Calculus BC Free-Response Questions (FRQs))",
    "q_ar": "يقوم طالب باشتقاق العلاقة الضمنية \\(x^2 + 3xy + y^2 = 0\\) بالنسبة إلى \\(x\\). حدد الخطوة الخاطئة:",
    "steps_ar": [
      "اشتقاق \\(x^2\\) بالنسبة إلى \\(x\\) ليعطي \\(2x\\).",
      "اشتقاق الحد الأوسط \\(3xy\\) بالنسبة إلى \\(x\\) على أنه \\(3\\dfrac{dy}{dx}\\).",
      "اشتقاق \\(y^2\\) بقاعدة السلسلة ليعطي \\(2y\\dfrac{dy}{dx}\\) ومشتقة الثابت \\(0\\).",
      "تجميع حدود \\(\\dfrac{dy}{dx}\\) وقسمة الطرفين لعزل المشتقة."
    ],
    "reasons_ar": [
      "الحد \\(3xy\\) حاصل ضرب دالتين في \\(x\\)؛ وبقاعدة الضرب مشتقته هي \\(3y + 3x\\dfrac{dy}{dx}\\).",
      "مشتقة \\(y^2\\) هي \\(2y\\) فقط دون \\(\\dfrac{dy}{dx}\\).",
      "مشتقة الثابت تبقى كما هي."
    ],
    "h_ar": "راجع كيفية اشتقاق حاصل الضرب \\(3xy\\) في الخطوة الثانية.",
    "sol_ar": "بتطبيق قاعدة الضرب على \\(3xy\\) نحصل على \\(3y + 3x\\dfrac{dy}{dx}\\)، ومنه \\(\\dfrac{dy}{dx} = -\\dfrac{2x + 3y}{3x + 2y}\\)."
  },
  {
    "t": "ms",
    "ti": "Examiner Mode: Tangent, Normal & Stationary Points (AP Calculus BC Free-Response Questions (FRQs))",
    "q": "Consider the curve \\(y = 3x^3 - 0x^2 + 4\\). (a) Find \\(\\dfrac{dy}{dx}\\) and the gradient of the tangent at \\(x = 2\\). (b) Find the \\(x\\)-coordinates of the stationary points.",
    "parts": [
      {
        "label": "Part (a) — First Derivative & Tangent Gradient",
        "marks": 3,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "Differentiate term by term using the power rule: \\(\\dfrac{dy}{dx} = 9x^2 - 0x\\)."
          },
          {
            "code": "M1",
            "marks": 1,
            "text": "Substitute \\(x = 2\\): \\(m = 9(2)^2 - 0(2)\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "Obtain exact tangent gradient \\(m = 36\\)."
          }
        ]
      },
      {
        "label": "Part (b) — Stationary Points Condition",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "Set \\(\\dfrac{dy}{dx} = 0 \\implies x(9x - 0) = 0\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "State both stationary \\(x\\)-coordinates: \\(x = 0\\) and \\(x = \\dfrac{0}{9}\\)."
          }
        ]
      }
    ],
    "examinerTip": "Always show the explicit equation \\(\\dfrac{dy}{dx} = 0\\) before solving for stationary points—this earns the M1 method mark even if an arithmetic slip occurs.",
    "ti_ar": "وضع المصحح: المماس والنقاط الحرجة (AP Calculus BC Free-Response Questions (FRQs))",
    "q_ar": "لمنحنى الدالة \\(y = 3x^3 - 0x^2 + 4\\): (أ) أوجد \\(\\dfrac{dy}{dx}\\) وميل المماس عند \\(x = 2\\). (ب) أوجد الإحداثيات السينية للنقاط الحرجة.",
    "examinerTip_ar": "اكتب دائماً شرط النقطة الحرجة \\(\\dfrac{dy}{dx} = 0\\) صراحةً لضمان الحصول على درجة الطريقة (M1)."
  },
  {
    "t": "sb",
    "ti": "Step Builder: Instantaneous Rate of Change (AP Calculus BC Free-Response Questions (FRQs))",
    "steps": [
      {
        "l": "Given \\(f(x) = 3x^2 + 0x - 5\\), find the coefficient of \\(x\\) in \\(f'(x)\\):",
        "a": "6",
        "h": "Multiply power 2 by 3."
      },
      {
        "l": "Find the constant term in \\(f'(x)\\):",
        "a": "0",
        "h": "The derivative of 0x is 0."
      },
      {
        "l": "Evaluate the instantaneous rate of change \\(f'(2) =\\)",
        "a": "12",
        "h": "Compute 6(2) + 0."
      }
    ],
    "ti_ar": "بناء الخطوات: حساب المشتقة ومعدل التغير اللحظي (AP Calculus BC Free-Response Questions (FRQs))",
    "steps_ar": [
      {
        "l": "للدالة \\(f(x) = 3x^2 + 0x - 5\\)، معامل \\(x\\) في \\(f'(x)\\) يساوي:",
        "a": "6",
        "h": "اضرب الأس 2 في 3."
      },
      {
        "l": "الحد الثابت في المشتقة \\(f'(x)\\) يساوي:",
        "a": "0",
        "h": "مشتقة 0x هي 0."
      },
      {
        "l": "احسب قيمة المشتقة \\(f'(2) =\\)",
        "a": "12",
        "h": "احسب 6(2) + 0."
      }
    ]
  },
  {
    "t": "mt",
    "ti": "Matching: Differentiation Rules & Analytic Criteria (AP Calculus BC Free-Response Questions (FRQs))",
    "p": [
      {
        "l": "\\(f'(c) = 0\\) and \\(f''(c) < 0\\)",
        "r": "Strict local maximum at \\(x = c\\)"
      },
      {
        "l": "\\(f'(c) = 0\\) and \\(f''(c) > 0\\)",
        "r": "Strict local minimum at \\(x = c\\)"
      },
      {
        "l": "\\(\\dfrac{d}{dx}[u(x)v(x)]\\)",
        "r": "\\(u'(x)v(x) + u(x)v'(x)\\) (Product Rule)"
      },
      {
        "l": "\\(\\dfrac{d}{dx}[f(g(x))]\\)",
        "r": "\\(f'(g(x))\\cdot g'(x)\\) (Chain Rule)"
      }
    ],
    "ti_ar": "مطابقة: قواعد الاشتقاق ومعايير القيم القصوى (AP Calculus BC Free-Response Questions (FRQs))",
    "p_ar": [
      {
        "l": "\\(f'(c) = 0\\) و \\(f''(c) < 0\\)",
        "r": "نقطة عظمى محلية عند \\(x = c\\)"
      },
      {
        "l": "\\(f'(c) = 0\\) و \\(f''(c) > 0\\)",
        "r": "نقطة صغرى محلية عند \\(x = c\\)"
      },
      {
        "l": "\\(\\dfrac{d}{dx}[u(x)v(x)]\\)",
        "r": "\\(u'(x)v(x) + u(x)v'(x)\\) (قاعدة الضرب)"
      },
      {
        "l": "\\(\\dfrac{d}{dx}[f(g(x))]\\)",
        "r": "\\(f'(g(x))\\cdot g'(x)\\) (قاعدة السلسلة)"
      }
    ]
  }
];
});
