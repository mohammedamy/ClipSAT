/* Interactive Practice data for /apstats/ - one entry per chapter section id.
   Shipped as public/js/ix/apstats.js and loaded only on that track's page by the
   engine in src/scripts/modules/19-interactive-activities-engine-v1.js
   (Plan 5 Phase 5.015, ADR 0033). Entry shapes (qc/mt/tf/sb/sr/fn/num/ord/cat/gp/se/ms) are
   documented there. */
(window.__ixData = window.__ixData || []).push(function (D) {
D["aps-overview"] = [
  {
    "t": "qc",
    "ti": "Quick Check: AP Statistics Four Core Areas",
    "ti_ar": "فحص سريع: المحاور الأربعة الأساسية لإحصاء AP",
    "q": "What are the four foundational pillars of the AP Statistics curriculum?",
    "q_ar": "ما هي المحاور التأسيسية الأربعة لمنهج إحصاء AP؟",
    "o": [
      "Exploring Data, Sampling & Experimentation, Probability & Simulation, and Statistical Inference",
      "Derivatives, Integrals, Series, and Vector Fields",
      "Euclidean Geometry, Axioms, Logic, and Proofs",
      "Boolean Logic, Algorithms, Combinatorics, and Sorting"
    ],
    "o_ar": [
      "استكشاف البيانات، وأخذ العينات والتجريب، والاحتمالات والمحاكاة، والاستدلال الإحصائي",
      "المشتقات، والتكاملات، والمتسلسلات، والمجالات الاتجاهية",
      "الهندسة الإقليدية، والبديهيات، والمنطق، والبراهين",
      "المنطق البولياني، والخوارزميات، والتوافقيات، وخوارزميات الترتيب"
    ],
    "a": 0,
    "ex": "AP Statistics is structured around four themes: (1) Exploring Data, (2) Sampling and Experimentation, (3) Anticipating Patterns (Probability & Simulation), and (4) Statistical Inference.",
    "ex_ar": "ينتظم إحصاء AP حول أربعة موضوعات محورية: (1) استكشاف البيانات، (2) أخذ العينات والتجريب، (3) توقع الأنماط (الاحتمالات والمحاكاة)، و(4) الاستدلال الإحصائي."
  },
  {
    "t": "tf",
    "ti": "Reasoning Lab: AP Statistics Exam Format & Rules",
    "ti_ar": "مختبر التفكير: هيكل وقواعد اختبار إحصاء AP",
    "items": [
      {
        "s": "A graphing calculator with statistical distribution functions is permitted on both Section I and Section II.",
        "s_ar": "يُسمح باستخدام آلة حاسبة بيانية مزودة بدوال التوزيعات الإحصائية في كل من القسم الأول والقسم الثاني.",
        "a": true,
        "ex": "Graphing calculators are allowed throughout the entire exam.",
        "ex_ar": "يُسمح بالآلات الحاسبة البيانية طوال جميع أجزاء الاختبار."
      },
      {
        "s": "Writing \"accept the null hypothesis\" is acceptable phrasing when the p-value is greater than alpha.",
        "s_ar": "تعتبر عبارة \"قبول فرضية العدم\" صياغة مقبولة عندما تكون القيمة الاحتمالية p-value أكبر من مستوى المعنوية ألفا.",
        "a": false,
        "ex": "We never accept H₀; we only \"fail to reject H₀\" due to lack of convincing evidence.",
        "ex_ar": "نحن لا نقبل أبداً فرضية العدم H₀؛ بل نقول \"نفشل في رفض H₀\" لعدم توفر أدلة كافية ومقنعة."
      },
      {
        "s": "Question 6 (the Investigative Task) accounts for 25% of the total Section II Free Response score.",
        "s_ar": "يمثل السؤال 6 (المهمة الاستقصائية) نسبة 25% من مجموع درجات الأسئلة المقالية للقسم الثاني.",
        "a": true,
        "ex": "Question 6 is weighted as 25% of Section II.",
        "ex_ar": "يُعطى السؤال السادس وزناً قدره 25% من إجمالي درجات القسم الثاني."
      }
    ]
  },
  {
    "t": "num",
    "ti": "Pacing Check: Average Minutes per Question for Questions 1 to 5",
    "ti_ar": "فحص وتيرة الوقت: متوسط الدقائق المتاحة لكل سؤال من الأسئلة 1 إلى 5",
    "q": "Section II lasts 90 minutes. If 25 minutes are reserved for Question 6, how many average minutes are available per question for Questions 1 through 5?",
    "q_ar": "يستغرق القسم الثاني 90 دقيقة. إذا تم تخصيص 25 دقيقة للسؤال 6، فما هو متوسط عدد الدقائق المتاحة لكل سؤال من الأسئلة 1 إلى 5؟",
    "a": 13,
    "tol": 0.1,
    "unit": "min/question",
    "h": "Subtract 25 from 90, then divide by 5.",
    "h_ar": "اطرح 25 من 90، ثم اقسم الناتج على 5.",
    "sol": "\\(\\dfrac{90 - 25}{5} = \\dfrac{65}{5} = 13\\text{ minutes/question}\\).",
    "sol_ar": "\\(\\dfrac{90 - 25}{5} = \\dfrac{65}{5} = 13\\text{ دقيقة/سؤال}\\)."
  },
  {
    "t": "ord",
    "ti": "Exam Protocol: Section II Free Response Strategy",
    "ti_ar": "بروتوكول الاختبار: استراتيجية إجابة الأسئلة المقالية في القسم الثاني",
    "q": "Arrange the sequence of steps for managing the 90-minute Section II Free Response:",
    "q_ar": "رتب تسلسل خطوات إدارة الوقت في القسم الثاني (الأسئلة المقالية مدة 90 دقيقة):",
    "items": [
      "Take 2 minutes to skim Questions 1 through 5 and identify the most familiar scenarios.",
      "Answer Questions 1 through 5 cleanly with full context and units within the first 65 minutes.",
      "Transition to Question 6 (Investigative Task) with at least 25 minutes remaining.",
      "Read the unfamiliar statistical concept introduced in Question 6 and relate it to foundational principles.",
      "Review all answers to confirm that every interpretation references the real-world context."
    ],
    "items_ar": [
      "استغلال دقيقتين للمرور السريع على الأسئلة من 1 إلى 5 وتحديد السيناريوهات الأكثر ألفة.",
      "إجابة الأسئلة من 1 إلى 5 بدقة مع كتابة السياق الكامل والوحدات خلال أول 65 دقيقة.",
      "الانتقال إلى السؤال 6 (المهمة الاستقصائية) مع تبقي 25 دقيقة على الأقل.",
      "قراءة المفهوم الإحصائي غير المألوف المقدم في السؤال 6 وربطه بالمبادئ التأسيسية.",
      "مراجعة جميع الإجابات للتأكد من أن كل تفسير واستنتاج يشير صراحة إلى سياق العالم الحقيقي."
    ]
  },
  {
    "t": "cat",
    "ti": "Classify Topics by Primary Curriculum Theme",
    "ti_ar": "تصنيف الموضوعات حسب المحور الأساسي للمنهج",
    "categories": [
      "Exploring Data & Sampling",
      "Probability & Inference"
    ],
    "categories_ar": [
      "استكشاف البيانات وأخذ العينات",
      "الاحتمالات والاستدلال الإحصائي"
    ],
    "items": [
      {
        "s": "Boxplots, five-number summary, and IQR outlier fences",
        "s_ar": "التمثيل بالصندوق وطرفيه، والملخص الخماسي، وسياج القيم الشاذة بالمدى الربيعي (IQR)",
        "cat": 0
      },
      {
        "s": "Two-sample t-test for difference between means",
        "s_ar": "اختبار t لعينتين للفرق بين المتوسطات",
        "cat": 1
      },
      {
        "s": "Simple random sampling and stratified selection",
        "s_ar": "المعاينة العشوائية البسيطة والاختيار الطبقي",
        "cat": 0
      },
      {
        "s": "Binomial distribution formula and cumulative probabilities",
        "s_ar": "صيغة توزيع ذات الحدين والاحتمالات التراكمية",
        "cat": 1
      },
      {
        "s": "Confounding variables and randomized block design",
        "s_ar": "المتغيرات المربكة والتصميم بقطاعات عشوائية",
        "cat": 0
      },
      {
        "s": "Type I and Type II errors and statistical power",
        "s_ar": "أخطاء النوع الأول والنوع الثاني وقوة الاختبار الإحصائي",
        "cat": 1
      }
    ]
  },
  {
    "t": "se",
    "ti": "Spot the Error: Algebraic & Domain Verification (AP Statistics Exam Format & Study Design)",
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
    "ti_ar": "اكتشف الخطأ: الجذور الدخيلة والتحقق من المجال (AP Statistics Exam Format & Study Design)",
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
    "ti": "Examiner Mode: Multi-Step Structured Problem (AP Statistics Exam Format & Study Design)",
    "q": "Let \\(f(x) = x^2 - 4x + 10\\) for \\(x \\ge 2\\). (a) Express \\(f(x)\\) in completed-square vertex form and state the range of \\(f\\). (b) Find an expression for the inverse function \\(f^{-1}(x)\\) and state its domain.",
    "parts": [
      {
        "label": "Part (a) — Vertex Form & Range",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "Complete the square: \\(f(x) = (x - 2)^2 - 4 + 10 = (x - 2)^2 + 6\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "State exact range: \\(f(x) \\ge 6\\) (or \\([6, \\infty)\\))."
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
            "text": "Set \\(y = (x - 2)^2 + 6 \\implies (x - 2)^2 = y - 6\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "Select positive branch (since \\(x \\ge 2\\)): \\(f^{-1}(x) = 2 + \\sqrt{x - 6}\\)."
          },
          {
            "code": "B1",
            "marks": 1,
            "text": "State domain of \\(f^{-1}\\): \\(x \\ge 6\\) (matching the range of \\(f\\))."
          }
        ]
      }
    ],
    "examinerTip": "Writing \\(\\pm\\sqrt{x - 6}\\) for \\(f^{-1}(x)\\) loses the final A1 mark because a function must be single-valued; use the domain restriction \\(x \\ge 2\\) to choose the \\(+\\) sign.",
    "ti_ar": "وضع المصحح: إكمال المربع والدالة العكسية (AP Statistics Exam Format & Study Design)",
    "q_ar": "لتكن \\(f(x) = x^2 - 4x + 10\\) حيث \\(x \\ge 2\\). (أ) اكتب \\(f(x)\\) في صورة المربع الكامل وحدد مداها. (ب) أوجد قاعدة الدالة العكسية \\(f^{-1}(x)\\) ومجالها.",
    "examinerTip_ar": "الدالة العكسية يجب أن تكون وحيدة القيمة، لذا نختار الإشارة الموجبة للجذر \\(2 + \\sqrt{x - 6}\\) لأن \\(x \\ge 2\\)."
  },
  {
    "t": "sb",
    "ti": "Step Builder: Completing the Square & Vertex Analysis (AP Statistics Exam Format & Study Design)",
    "steps": [
      {
        "l": "In \\(y = x^2 - 4x + 10\\), halve the \\(x\\)-coefficient to write \\((x - h)^2\\) where \\(h =\\)",
        "a": "2",
        "h": "Take half of 4."
      },
      {
        "l": "Compute the minimum value \\(k = 10 - 2^2 =\\)",
        "a": "6",
        "h": "Subtract 4 from 10."
      },
      {
        "l": "Evaluate \\(y\\) when \\(x = 4\\): \\(y =\\)",
        "a": "10",
        "h": "Compute \\((2)^2 + 6\\)."
      }
    ],
    "ti_ar": "بناء الخطوات: إكمال المربع وإيجاد القيمة الصغرى (AP Statistics Exam Format & Study Design)",
    "steps_ar": [
      {
        "l": "في الدالة \\(y = x^2 - 4x + 10\\): قيمة \\(h\\) في \\((x - h)^2\\) تساوي:",
        "a": "2",
        "h": "اقسم معامل x وهو 4 على 2."
      },
      {
        "l": "احسب القيمة الصغرى \\(k = 10 - 2^2 =\\)",
        "a": "6",
        "h": "اطرح 4 من 10."
      },
      {
        "l": "احسب قيمة \\(y\\) عندما \\(x = 4\\):",
        "a": "10",
        "h": "احسب \\(4 + 6\\)."
      }
    ]
  },
  {
    "t": "mt",
    "ti": "Matching: Core Algebraic & Analytic Principles (AP Statistics Exam Format & Study Design)",
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
    "ti_ar": "مطابقة: المبادئ الجبرية والتحليلية الأساسية (AP Statistics Exam Format & Study Design)",
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

D["aps-u1"] = [
  {
    "t": "qc",
    "ti": "Quick Check: Summary Statistics Resistance",
    "ti_ar": "فحص سريع: مناعة المقاييس الإحصائية الملخصة",
    "q": "Which numerical summary of center is resistant to extreme outliers and skewed distributions?",
    "q_ar": "أي مقياس عددي للنزعة المركزية يُعد منيعاً (مقاوماً) تجاه القيم الشاذة المتطرفة والتوزيعات الملتوية؟",
    "o": [
      "Median",
      "Mean",
      "Standard Deviation",
      "Range"
    ],
    "o_ar": [
      "الوسيط",
      "المتوسط الحسابي",
      "الانحراف المعياري",
      "المدى"
    ],
    "a": 0,
    "ex": "The median is resistant to outliers because it depends on order rather than magnitude. Mean, range, and standard deviation are non-resistant.",
    "ex_ar": "الوسيط منيع ومقاوم للقيم الشاذة لأنه يعتمد على الترتيب وليس على الحجم العددي. أما المتوسط والمدى والانحراف المعياري فكلها مقاييس غير منيعة."
  },
  {
    "t": "sr",
    "ti": "Worked Example: Standard Deviation of a Small Data Set",
    "ti_ar": "مثال محلول: الانحراف المعياري لمجموعة بيانات صغيرة",
    "steps": [
      "Find the standard deviation of \\(2,4,6,8\\) (as a population). Find the mean: \\(\\dfrac{2+4+6+8}{4}=5\\).",
      "Find squared deviations from the mean: \\((2-5)^2=9\\), \\((4-5)^2=1\\), \\((6-5)^2=1\\), \\((8-5)^2=9\\).",
      "Average the squared deviations: \\(\\dfrac{9+1+1+9}{4}=5\\) — this is the variance.",
      "Standard deviation \\(=\\sqrt5\\approx2.24\\)."
    ],
    "steps_ar": [
      "أوجد الانحراف المعياري للقيم \\(2,4,6,8\\) (باعتبارها مجتمعاً إحصائياً). نحسب المتوسط: \\(\\dfrac{2+4+6+8}{4}=5\\).",
      "احسب مربعات الانحرافات عن المتوسط: \\((2-5)^2=9\\)، \\((4-5)^2=1\\)، \\((6-5)^2=1\\)، \\((8-5)^2=9\\).",
      "احسب متوسط مربعات الانحرافات: \\(\\dfrac{9+1+1+9}{4}=5\\) — هذا هو التباين.",
      "الانحراف المعياري \\(=\\sqrt5\\approx2.24\\)."
    ]
  },
  {
    "t": "num",
    "ti": "Calculation Lab: Upper Fence for Outliers",
    "ti_ar": "مختبر الحساب: السياج العلوي للقيم الشاذة",
    "q": "A dataset has \\(Q_1 = 15\\) and \\(Q_3 = 24\\). What is the value of the upper fence \\(Q_3 + 1.5 \\times \\text{IQR}\\) above which points are considered outliers?",
    "q_ar": "مجموعة بيانات لها \\(Q_1 = 15\\) و\\(Q_3 = 24\\). ما هي قيمة السياج العلوي \\(Q_3 + 1.5 \\times \\text{IQR}\\) التي تُعتبر النقاط فوقها قيماً شاذة؟",
    "a": 37.5,
    "tol": 0.1,
    "h": "Find IQR = Q3 - Q1, then compute Q3 + 1.5(IQR).",
    "h_ar": "أوجد المدى الربيعي IQR = Q3 - Q1، ثم احسب Q3 + 1.5(IQR).",
    "sol": "\\(\\text{IQR} = 24 - 15 = 9\\). \\(\\text{Upper fence} = 24 + 1.5(9) = 24 + 13.5 = 37.5\\).",
    "sol_ar": "\\(\\text{IQR} = 24 - 15 = 9\\). \\(\\text{السياج العلوي} = 24 + 1.5(9) = 24 + 13.5 = 37.5\\)."
  },
  {
    "t": "ord",
    "ti": "Data Protocol: Constructing a Modified Boxplot",
    "ti_ar": "بروتوكول البيانات: إنشاء مخطط الصندوق المعدل",
    "q": "Arrange the sequence of steps for drawing a modified boxplot showing outliers:",
    "q_ar": "رتب خطوات رسم مخطط الصندوق المعدل الذي يُظهر القيم الشاذة:",
    "items": [
      "Order data values and determine the five-number summary: Min, Q₁, Median, Q₃, and Max.",
      "Calculate the interquartile range: \\(\\text{IQR} = Q_3 - Q_1\\).",
      "Calculate outlier cutoff fences: lower fence \\(Q_1 - 1.5(\\text{IQR})\\) and upper fence \\(Q_3 + 1.5(\\text{IQR})\\).",
      "Draw the central box from Q₁ to Q₃ with a vertical line marking the Median.",
      "Extend whiskers to the most extreme data values inside the fences, and plot any points beyond fences as individual asterisks."
    ],
    "items_ar": [
      "ترتيب قيم البيانات وتحديد الملخص الخماسي: القيمة الصغرى (Min)، وQ₁، والوسيط، وQ₃، والقيمة العظمى (Max).",
      "حساب المدى الربيعي: \\(\\text{IQR} = Q_3 - Q_1\\).",
      "حساب أسوار حد القيم الشاذة: السياج السفلي \\(Q_1 - 1.5(\\text{IQR})\\) والسياج العلوي \\(Q_3 + 1.5(\\text{IQR})\\).",
      "رسم الصندوق المركزي من Q₁ إلى Q₃ مع رسم خط رأسي يحدد موضع الوسيط.",
      "مد العارضتين (الشاربين) إلى أبعد قيم بيانات داخل حدود الأسوار، ورسم أي نقاط خارج الأسوار كعلامات نجمية منفصلة."
    ]
  },
  {
    "t": "cat",
    "ti": "Classify Variables as Categorical or Quantitative",
    "ti_ar": "تصنيف المتغيرات كمتغيرات فئوية أو كمية",
    "categories": [
      "Categorical Variable",
      "Quantitative Variable"
    ],
    "categories_ar": [
      "متغير فئوي (نوعي)",
      "متغير كمي (عددي)"
    ],
    "items": [
      {
        "s": "ZIP code of a household",
        "s_ar": "الرمز البريدي للأسرة",
        "cat": 0
      },
      {
        "s": "Annual household income in dollars",
        "s_ar": "الدخل السنوي للأسرة بالدولار",
        "cat": 1
      },
      {
        "s": "Hair color",
        "s_ar": "لون الشعر",
        "cat": 0
      },
      {
        "s": "Number of siblings",
        "s_ar": "عدد الأشقاء",
        "cat": 1
      },
      {
        "s": "Preferred streaming platform",
        "s_ar": "منصة البث المفضلة",
        "cat": 0
      },
      {
        "s": "Commute distance in miles",
        "s_ar": "مسافة التنقل اليومي بالميل",
        "cat": 1
      }
    ]
  },
  {
    "t": "se",
    "ti": "Spot the Error: Algebraic & Domain Verification (Unit 1 · Exploring One-Variable & Two-Variable Data)",
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
    "ti_ar": "اكتشف الخطأ: الجذور الدخيلة والتحقق من المجال (Unit 1 · Exploring One-Variable & Two-Variable Data)",
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
    "ti": "Examiner Mode: Multi-Step Structured Problem (Unit 1 · Exploring One-Variable & Two-Variable Data)",
    "q": "Let \\(f(x) = x^2 - 10x + 32\\) for \\(x \\ge 5\\). (a) Express \\(f(x)\\) in completed-square vertex form and state the range of \\(f\\). (b) Find an expression for the inverse function \\(f^{-1}(x)\\) and state its domain.",
    "parts": [
      {
        "label": "Part (a) — Vertex Form & Range",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "Complete the square: \\(f(x) = (x - 5)^2 - 25 + 32 = (x - 5)^2 + 7\\)."
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
            "text": "Set \\(y = (x - 5)^2 + 7 \\implies (x - 5)^2 = y - 7\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "Select positive branch (since \\(x \\ge 5\\)): \\(f^{-1}(x) = 5 + \\sqrt{x - 7}\\)."
          },
          {
            "code": "B1",
            "marks": 1,
            "text": "State domain of \\(f^{-1}\\): \\(x \\ge 7\\) (matching the range of \\(f\\))."
          }
        ]
      }
    ],
    "examinerTip": "Writing \\(\\pm\\sqrt{x - 7}\\) for \\(f^{-1}(x)\\) loses the final A1 mark because a function must be single-valued; use the domain restriction \\(x \\ge 5\\) to choose the \\(+\\) sign.",
    "ti_ar": "وضع المصحح: إكمال المربع والدالة العكسية (Unit 1 · Exploring One-Variable & Two-Variable Data)",
    "q_ar": "لتكن \\(f(x) = x^2 - 10x + 32\\) حيث \\(x \\ge 5\\). (أ) اكتب \\(f(x)\\) في صورة المربع الكامل وحدد مداها. (ب) أوجد قاعدة الدالة العكسية \\(f^{-1}(x)\\) ومجالها.",
    "examinerTip_ar": "الدالة العكسية يجب أن تكون وحيدة القيمة، لذا نختار الإشارة الموجبة للجذر \\(5 + \\sqrt{x - 7}\\) لأن \\(x \\ge 5\\)."
  },
  {
    "t": "sb",
    "ti": "Step Builder: Completing the Square & Vertex Analysis (Unit 1 · Exploring One-Variable & Two-Variable Data)",
    "steps": [
      {
        "l": "In \\(y = x^2 - 10x + 32\\), halve the \\(x\\)-coefficient to write \\((x - h)^2\\) where \\(h =\\)",
        "a": "5",
        "h": "Take half of 10."
      },
      {
        "l": "Compute the minimum value \\(k = 32 - 5^2 =\\)",
        "a": "7",
        "h": "Subtract 25 from 32."
      },
      {
        "l": "Evaluate \\(y\\) when \\(x = 7\\): \\(y =\\)",
        "a": "11",
        "h": "Compute \\((2)^2 + 7\\)."
      }
    ],
    "ti_ar": "بناء الخطوات: إكمال المربع وإيجاد القيمة الصغرى (Unit 1 · Exploring One-Variable & Two-Variable Data)",
    "steps_ar": [
      {
        "l": "في الدالة \\(y = x^2 - 10x + 32\\): قيمة \\(h\\) في \\((x - h)^2\\) تساوي:",
        "a": "5",
        "h": "اقسم معامل x وهو 10 على 2."
      },
      {
        "l": "احسب القيمة الصغرى \\(k = 32 - 5^2 =\\)",
        "a": "7",
        "h": "اطرح 25 من 32."
      },
      {
        "l": "احسب قيمة \\(y\\) عندما \\(x = 7\\):",
        "a": "11",
        "h": "احسب \\(4 + 7\\)."
      }
    ]
  },
  {
    "t": "mt",
    "ti": "Matching: Core Algebraic & Analytic Principles (Unit 1 · Exploring One-Variable & Two-Variable Data)",
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
    "ti_ar": "مطابقة: المبادئ الجبرية والتحليلية الأساسية (Unit 1 · Exploring One-Variable & Two-Variable Data)",
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

D["aps-u2"] = [
  {
    "t": "qc",
    "ti": "Quick Check: Establishing Causation",
    "ti_ar": "فحص سريع: إثبات السببية",
    "q": "Which study design is necessary to establish a cause-and-effect relationship between variables?",
    "q_ar": "أي تصميم دراسة يُعد ضرورياً لإثبات علاقة سبب ونتيجة بين المتغيرات؟",
    "o": [
      "A well-designed randomized controlled experiment",
      "A large voluntary response sample survey",
      "An observational longitudinal cohort study",
      "A census of the entire target population"
    ],
    "o_ar": [
      "تجربة محكمة ذات تعيين عشوائي ومصممة جيداً",
      "مسح عيني كبير قائم على الاستجابة التطوعية",
      "دراسة أترابية طولية قائمة على الملاحظة",
      "تعداد شامل لكامل المجتمع المستهدف"
    ],
    "a": 0,
    "ex": "Only a randomized experiment with random assignment of treatments to experimental units can balance confounding variables and prove causation.",
    "ex_ar": "التجربة العشوائية ذات التعيين العشوائي للمعالجات على الوحدات التجريبية هي الوحيدة القادرة على موازنة المتغيرات المربكة وإثبات السببية."
  },
  {
    "t": "sr",
    "ti": "Worked Example: Designing a True Experiment",
    "ti_ar": "مثال محلول: تصميم تجربة حقيقية",
    "steps": [
      "A researcher wants to know if a new fertilizer increases crop yield. An observational study would just record yields from farms already using different fertilizers — this can't establish causation, since other factors (soil quality, sunlight) may differ between farms too.",
      "A true experiment requires random assignment: randomly assign plots of land to receive the new fertilizer or a control fertilizer.",
      "Random assignment balances out confounding variables between groups, so any yield difference can be attributed to the fertilizer itself."
    ],
    "steps_ar": [
      "يريد باحث معرفة ما إذا كان سماد جديد يزيد محصول المحاصيل. الدراسة القائمة على الملاحظة تسجل فقط محاصيل المزارع التي تستخدم بالفعل أسمدة مختلفة — وهذا لا يمكنه إثبات السببية، لأن عوامل أخرى (جودة التربة، ضوء الشمس) قد تختلف بين المزارع أيضاً.",
      "تتطلب التجربة الحقيقية تعييناً عشوائياً: تعيين قطع الأرض عشوائياً لتلقي السماد الجديد أو سماد المقارنة الضابط.",
      "يوازن التعيين العشوائي المتغيرات المربكة بين المجموعتين، وبالتالي يمكن أن يُعزى أي فرق في المحصول إلى السماد نفسه."
    ]
  },
  {
    "t": "num",
    "ti": "Calculation Lab: Stratified Sample Allocation",
    "ti_ar": "مختبر الحساب: توزيع العينة الطبقية",
    "q": "A high school has 400 seniors, 500 juniors, 500 sophomores, and 600 freshmen (2000 students total). If a proportional stratified sample of 100 students is chosen, how many freshmen should be sampled?",
    "q_ar": "مدرسة ثانوية تضم 400 طالب في الصف الثاني عشر، و500 في الحادي عشر، و500 في العاشر، و600 في التاسع (إجمالي 2000 طالب). إذا اختيرت عينة طبقية نسبية من 100 طالب، فكم طالباً من الصف التاسع يجب تضمينهم في العينة؟",
    "a": 30,
    "tol": 0.1,
    "h": "Find the proportion of freshmen (600/2000 = 0.30) and multiply by the total sample size 100.",
    "h_ar": "أوجد نسبة طلاب الصف التاسع (600/2000 = 0.30) واضربها في حجم العينة الكلي 100.",
    "sol": "\\(\\dfrac{600}{2000} \\times 100 = 0.30 \\times 100 = 30\\text{ freshmen}\\).",
    "sol_ar": "\\(\\dfrac{600}{2000} \\times 100 = 0.30 \\times 100 = 30\\text{ طالباً}\\)."
  },
  {
    "t": "ord",
    "ti": "Experimental Protocol: Completely Randomized Experiment",
    "ti_ar": "بروتوكول التجريب: تجربة تامة التعشية",
    "q": "Arrange the sequence of steps to design a completely randomized experiment testing an insomnia medication:",
    "q_ar": "رتب خطوات تصميم تجربة تامة التعشية لاختبار دواء للأرق:",
    "items": [
      "Recruit a volunteer group of insomnia patients and obtain informed consent.",
      "Randomly assign subjects into two equal groups (treatment and placebo control).",
      "Administer the medication or placebo in a double-blind manner for 4 weeks.",
      "Measure sleep quality scores objectively for all subjects in both groups.",
      "Compare mean sleep quality improvement between treatment and control groups using a two-sample t-test."
    ],
    "items_ar": [
      "استقطاب مجموعة متطوعين من مرضى الأرق والحصول على موافقتهم المستنيرة.",
      "تعيين الأفراد عشوائياً في مجموعتين متساويتين (مجموعة العلاج ومجموعة المقارنة بالدواء الوهمي).",
      "إعطاء الدواء أو الدواء الوهمي بطريقة مزدوجة التعمية لمدة 4 أسابيع.",
      "قياس درجات جودة النوم بموضوعية لجميع المشاركين في المجموعتين.",
      "مقارنة متوسط تحسن جودة النوم بين مجموعة العلاج والمجموعة الضابطة باستخدام اختبار t لعينتين."
    ]
  },
  {
    "t": "cat",
    "ti": "Classify Study Design Terminology",
    "ti_ar": "تصنيف مصطلحات تصميم الدراسات",
    "categories": [
      "Sampling Design Concept",
      "Experimental Design Concept"
    ],
    "categories_ar": [
      "مفهوم في تصميم المعاينة",
      "مفهوم في تصميم التجارب"
    ],
    "items": [
      {
        "s": "Stratified selection across geographic strata",
        "s_ar": "الاختيار الطبقي عبر طبقات جغرافية",
        "cat": 0
      },
      {
        "s": "Double-blinding of evaluators and subjects",
        "s_ar": "التعمية المزدوجة للمقيمين والمشاركين",
        "cat": 1
      },
      {
        "s": "Placebo control group to control psychological effects",
        "s_ar": "المجموعة الضابطة بالدواء الوهمي للتحكم في التأثيرات النفسية",
        "cat": 1
      },
      {
        "s": "Undercoverage and nonresponse bias",
        "s_ar": "تحيز نقص التغطية وعدم الاستجابة",
        "cat": 0
      },
      {
        "s": "Randomized block design blocking by age",
        "s_ar": "التصميم بقطاعات عشوائية مع التقسيم حسب الفئة العمرية",
        "cat": 1
      },
      {
        "s": "Cluster sampling of entire school homerooms",
        "s_ar": "المعاينة العنقودية للفصول المدرسية الكاملة",
        "cat": 0
      }
    ]
  },
  {
    "t": "se",
    "ti": "Spot the Error: Algebraic & Domain Verification (Unit 2 · Collecting Data, Sampling & Experimental Design)",
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
    "ti_ar": "اكتشف الخطأ: الجذور الدخيلة والتحقق من المجال (Unit 2 · Collecting Data, Sampling & Experimental Design)",
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
    "ti": "Examiner Mode: Multi-Step Structured Problem (Unit 2 · Collecting Data, Sampling & Experimental Design)",
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
    "ti_ar": "وضع المصحح: إكمال المربع والدالة العكسية (Unit 2 · Collecting Data, Sampling & Experimental Design)",
    "q_ar": "لتكن \\(f(x) = x^2 - 4x + 9\\) حيث \\(x \\ge 2\\). (أ) اكتب \\(f(x)\\) في صورة المربع الكامل وحدد مداها. (ب) أوجد قاعدة الدالة العكسية \\(f^{-1}(x)\\) ومجالها.",
    "examinerTip_ar": "الدالة العكسية يجب أن تكون وحيدة القيمة، لذا نختار الإشارة الموجبة للجذر \\(2 + \\sqrt{x - 5}\\) لأن \\(x \\ge 2\\)."
  },
  {
    "t": "sb",
    "ti": "Step Builder: Completing the Square & Vertex Analysis (Unit 2 · Collecting Data, Sampling & Experimental Design)",
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
    "ti_ar": "بناء الخطوات: إكمال المربع وإيجاد القيمة الصغرى (Unit 2 · Collecting Data, Sampling & Experimental Design)",
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
    "ti": "Matching: Core Algebraic & Analytic Principles (Unit 2 · Collecting Data, Sampling & Experimental Design)",
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
    "ti_ar": "مطابقة: المبادئ الجبرية والتحليلية الأساسية (Unit 2 · Collecting Data, Sampling & Experimental Design)",
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

D["aps-u3"] = [
  {
    "t": "tf",
    "ti": "Reasoning Lab: Probability Rules",
    "ti_ar": "مختبر التفكير: قواعد الاحتمالات",
    "items": [
      {
        "s": "\\(P(A \\cup B) = P(A) + P(B) - P(A \\cap B)\\) for any two events.",
        "s_ar": "\\(P(A \\cup B) = P(A) + P(B) - P(A \\cap B)\\) لأي حدثين.",
        "a": true,
        "ex": "The general addition rule.",
        "ex_ar": "قاعدة الجمع العامة للاحتمالات."
      },
      {
        "s": "If events \\(A\\) and \\(B\\) are independent, \\(P(A \\cap B) = P(A) \\cdot P(B)\\).",
        "s_ar": "إذا كان الحدثان \\(A\\) و\\(B\\) مستقلين، فإن \\(P(A \\cap B) = P(A) \\cdot P(B)\\).",
        "a": true,
        "ex": "The multiplication rule for independent events.",
        "ex_ar": "قاعدة الضرب للأحداث المستقلة."
      },
      {
        "s": "Two mutually exclusive events with non-zero probabilities can also be independent.",
        "s_ar": "يمكن لحدثين متنافيين باحتمالات غير صفرية أن يكونا مستقلين أيضاً.",
        "a": false,
        "ex": "If A occurs, B cannot occur (P(B|A) = 0 ≠ P(B)), so mutually exclusive events are always dependent.",
        "ex_ar": "إذا وقع A، فلا يمكن أن يقع B (أي أن P(B|A) = 0 ≠ P(B))، وبالتالي فإن الأحداث المتنافية تكون دائماً تابعة وليست مستقلة."
      }
    ]
  },
  {
    "t": "fn",
    "ti": "Explorer: Normal Distribution Shape",
    "ti_ar": "مستكشف: شكل التوزيع الطبيعي",
    "fns": [
      {
        "expr": "exp(-(x^2)/(2*s^2))",
        "color": "#1E3A6E",
        "label": "normal(σ)"
      }
    ],
    "xrange": [
      -6,
      6
    ],
    "yrange": [
      0,
      1.2
    ],
    "params": [
      {
        "name": "s",
        "label": "Standard deviation σ",
        "min": 0.5,
        "max": 2.5,
        "step": 0.5,
        "default": 1
      }
    ]
  },
  {
    "t": "num",
    "ti": "Calculation Lab: Binomial Expected Value",
    "ti_ar": "مختبر الحساب: القيمة المتوقعة لذات الحدين",
    "q": "For a binomial random variable \\(X \\sim B(40, 0.25)\\), what is the expected value \\(\\mu = np\\)?",
    "q_ar": "لمتغير عشوائي ذي حدين \\(X \\sim B(40, 0.25)\\)، ما هي القيمة المتوقعة (المتوسط) \\(\\mu = np\\)؟",
    "a": 10,
    "tol": 0.01,
    "h": "Multiply n by p.",
    "h_ar": "اضرب n في p.",
    "sol": "\\(\\mu = np = 40 \\times 0.25 = 10\\).",
    "sol_ar": "\\(\\mu = np = 40 \\times 0.25 = 10\\)."
  },
  {
    "t": "ord",
    "ti": "Normal Distribution Protocol: Standardization Workflow",
    "ti_ar": "بروتوكول التوزيع الطبيعي: خطة المعايرة والتحويل المعياري",
    "q": "Arrange the steps to find \\(P(X < 65)\\) where \\(X \\sim N(50, 10^2)\\):",
    "q_ar": "رتب خطوات إيجاد \\(P(X < 65)\\) حيث \\(X \\sim N(50, 10^2)\\):",
    "items": [
      "Identify distribution parameters: mean \\(\\mu = 50\\) and standard deviation \\(\\sigma = 10\\).",
      "Calculate the standardized z-score: \\(z = \\dfrac{65 - 50}{10} = 1.5\\).",
      "Look up \\(z = 1.5\\) on the standard normal table or evaluate \\(\\Phi(1.5)\\).",
      "State the cumulative probability: \\(P(X < 65) = P(Z < 1.5) \\approx 0.9332\\)."
    ],
    "items_ar": [
      "تحديد معلمات التوزيع: المتوسط \\(\\mu = 50\\) والانحراف المعياري \\(\\sigma = 10\\).",
      "حساب الدرجة المعيارية z: \\(z = \\dfrac{65 - 50}{10} = 1.5\\).",
      "البحث عن قيمة \\(z = 1.5\\) في جدول التوزيع الطبيعي المعياري أو حساب \\(\\Phi(1.5)\\).",
      "كتابة الاحتمال التراكمي النهائي: \\(P(X < 65) = P(Z < 1.5) \\approx 0.9332\\)."
    ]
  },
  {
    "t": "cat",
    "ti": "Classify Probability Models by Setting",
    "ti_ar": "تصنيف النماذج الاحتمالية حسب بيئة التجربة",
    "categories": [
      "Binomial Distribution Setting",
      "Geometric Distribution Setting"
    ],
    "categories_ar": [
      "بيئة توزيع ذات الحدين",
      "بيئة التوزيع الهندسي"
    ],
    "items": [
      {
        "s": "Counting the number of successes in a fixed number \\(n\\) of independent trials",
        "s_ar": "عدّ عدد النجاحات في عدد ثابت \\(n\\) من المحاولات المستقلة",
        "cat": 0
      },
      {
        "s": "Counting the number of trials until the first success occurs",
        "s_ar": "عدّ عدد المحاولات حتى يتحقق أول نجاح",
        "cat": 1
      },
      {
        "s": "Probability mass function \\(P(X = k) = \\binom{n}{k}p^k(1-p)^{n-k}\\)",
        "s_ar": "دالة الكتلة الاحتمالية \\(P(X = k) = \\binom{n}{k}p^k(1-p)^{n-k}\\)",
        "cat": 0
      },
      {
        "s": "Probability formula \\(P(Y = k) = (1-p)^{k-1}p\\)",
        "s_ar": "صيغة الاحتمال \\(P(Y = k) = (1-p)^{k-1}p\\)",
        "cat": 1
      },
      {
        "s": "Expected value is \\(\\mu = np\\)",
        "s_ar": "القيمة المتوقعة هي \\(\\mu = np\\)",
        "cat": 0
      },
      {
        "s": "Expected value is \\(\\mu = 1/p\\)",
        "s_ar": "القيمة المتوقعة هي \\(\\mu = 1/p\\)",
        "cat": 1
      }
    ]
  },
  {
    "t": "sr",
    "ti": "Worked Example: Binomial Probability",
    "ti_ar": "مثال محلول: احتمال ذات الحدين",
    "steps": [
      "A fair coin is flipped 4 times. Find \\(P(\\text{exactly 3 heads})\\). Binomial formula: \\(P(X=k)=\\binom{n}{k}p^k(1-p)^{n-k}\\).",
      "Here \\(n=4\\), \\(k=3\\), \\(p=0.5\\): \\(P(X=3)=\\binom43(0.5)^3(0.5)^1\\).",
      "Compute: \\(\\binom43=4\\), so \\(P=4\\times0.125\\times0.5=0.25\\)."
    ],
    "steps_ar": [
      "أُلقيت قطعة نقود متزنة 4 مرات. أوجد \\(P(\\text{ظهور الصورة 3 مرات بالضبط})\\). صيغة ذات الحدين: \\(P(X=k)=\\binom{n}{k}p^k(1-p)^{n-k}\\).",
      "هنا \\(n=4\\)، \\(k=3\\)، \\(p=0.5\\): \\(P(X=3)=\\binom43(0.5)^3(0.5)^1\\).",
      "الحساب: \\(\\binom43=4\\)، إذن \\(P=4\\times0.125\\times0.5=0.25\\)."
    ]
  },
  {
    "t": "se",
    "ti": "Spot the Error: Algebraic & Domain Verification (Unit 3 · Probability, Random Variables & Distributions)",
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
    "ti_ar": "اكتشف الخطأ: الجذور الدخيلة والتحقق من المجال (Unit 3 · Probability, Random Variables & Distributions)",
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
    "ti": "Examiner Mode: Multi-Step Structured Problem (Unit 3 · Probability, Random Variables & Distributions)",
    "q": "Let \\(f(x) = x^2 - 4x + 5\\) for \\(x \\ge 2\\). (a) Express \\(f(x)\\) in completed-square vertex form and state the range of \\(f\\). (b) Find an expression for the inverse function \\(f^{-1}(x)\\) and state its domain.",
    "parts": [
      {
        "label": "Part (a) — Vertex Form & Range",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "Complete the square: \\(f(x) = (x - 2)^2 - 4 + 5 = (x - 2)^2 + 1\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "State exact range: \\(f(x) \\ge 1\\) (or \\([1, \\infty)\\))."
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
            "text": "Set \\(y = (x - 2)^2 + 1 \\implies (x - 2)^2 = y - 1\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "Select positive branch (since \\(x \\ge 2\\)): \\(f^{-1}(x) = 2 + \\sqrt{x - 1}\\)."
          },
          {
            "code": "B1",
            "marks": 1,
            "text": "State domain of \\(f^{-1}\\): \\(x \\ge 1\\) (matching the range of \\(f\\))."
          }
        ]
      }
    ],
    "examinerTip": "Writing \\(\\pm\\sqrt{x - 1}\\) for \\(f^{-1}(x)\\) loses the final A1 mark because a function must be single-valued; use the domain restriction \\(x \\ge 2\\) to choose the \\(+\\) sign.",
    "ti_ar": "وضع المصحح: إكمال المربع والدالة العكسية (Unit 3 · Probability, Random Variables & Distributions)",
    "q_ar": "لتكن \\(f(x) = x^2 - 4x + 5\\) حيث \\(x \\ge 2\\). (أ) اكتب \\(f(x)\\) في صورة المربع الكامل وحدد مداها. (ب) أوجد قاعدة الدالة العكسية \\(f^{-1}(x)\\) ومجالها.",
    "examinerTip_ar": "الدالة العكسية يجب أن تكون وحيدة القيمة، لذا نختار الإشارة الموجبة للجذر \\(2 + \\sqrt{x - 1}\\) لأن \\(x \\ge 2\\)."
  },
  {
    "t": "sb",
    "ti": "Step Builder: Completing the Square & Vertex Analysis (Unit 3 · Probability, Random Variables & Distributions)",
    "steps": [
      {
        "l": "In \\(y = x^2 - 4x + 5\\), halve the \\(x\\)-coefficient to write \\((x - h)^2\\) where \\(h =\\)",
        "a": "2",
        "h": "Take half of 4."
      },
      {
        "l": "Compute the minimum value \\(k = 5 - 2^2 =\\)",
        "a": "1",
        "h": "Subtract 4 from 5."
      },
      {
        "l": "Evaluate \\(y\\) when \\(x = 4\\): \\(y =\\)",
        "a": "5",
        "h": "Compute \\((2)^2 + 1\\)."
      }
    ],
    "ti_ar": "بناء الخطوات: إكمال المربع وإيجاد القيمة الصغرى (Unit 3 · Probability, Random Variables & Distributions)",
    "steps_ar": [
      {
        "l": "في الدالة \\(y = x^2 - 4x + 5\\): قيمة \\(h\\) في \\((x - h)^2\\) تساوي:",
        "a": "2",
        "h": "اقسم معامل x وهو 4 على 2."
      },
      {
        "l": "احسب القيمة الصغرى \\(k = 5 - 2^2 =\\)",
        "a": "1",
        "h": "اطرح 4 من 5."
      },
      {
        "l": "احسب قيمة \\(y\\) عندما \\(x = 4\\):",
        "a": "5",
        "h": "احسب \\(4 + 1\\)."
      }
    ]
  },
  {
    "t": "mt",
    "ti": "Matching: Core Algebraic & Analytic Principles (Unit 3 · Probability, Random Variables & Distributions)",
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
    "ti_ar": "مطابقة: المبادئ الجبرية والتحليلية الأساسية (Unit 3 · Probability, Random Variables & Distributions)",
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

D["aps-u4"] = [
  {
    "t": "qc",
    "ti": "Quick Check: Interpreting P-values",
    "ti_ar": "فحص سريع: تفسير القيم الاحتمالية (P-values)",
    "q": "In a hypothesis test for a population mean, a p-value of 0.03 means:",
    "q_ar": "في اختبار الفرضيات لمتوسط المجتمع، ماذا تعني القيمة الاحتمالية p-value = 0.03؟",
    "o": [
      "If the null hypothesis is true, the probability of obtaining a sample mean as or more extreme than observed is 0.03",
      "The probability that the null hypothesis is true is 0.03",
      "The probability that the alternative hypothesis is false is 0.03",
      "There is a 97% probability that the null hypothesis should be accepted"
    ],
    "o_ar": [
      "بافتراض صحة فرضية العدم، فإن احتمال الحصول على متوسط عينة بنفس درجة التطرف الملاحظة أو أشد منها هو 0.03",
      "احتمال أن تكون فرضية العدم صحيحة هو 0.03",
      "احتمال أن تكون الفرضية البديلة خاطئة هو 0.03",
      "هناك احتمال بنسبة 97% بوجوب قبول فرضية العدم"
    ],
    "a": 0,
    "ex": "A p-value is the conditional probability of observing test results at least as extreme as the sample data, assuming H₀ is true.",
    "ex_ar": "القيمة الاحتمالية p-value هي الاحتمال الشرطي لملاحظة نتائج اختبار متطرفة بمقدار نتائج العينة على الأقل أو أشد منها، بافتراض أن فرضية العدم H₀ صحيحة."
  },
  {
    "t": "sr",
    "ti": "Worked Example: Interpreting a Confidence Interval",
    "ti_ar": "مثال محلول: تفسير فترة الثقة",
    "steps": [
      "A poll of 400 people finds 60% support a policy, with a margin of error of 4%. The confidence interval is the sample proportion plus or minus the margin of error: \\(60\\%\\pm4\\%\\).",
      "This gives the interval \\([56\\%,64\\%]\\).",
      "Interpretation: we are confident the <em>true population proportion</em> supporting the policy lies between 56% and 64% — not that 56–64% of THIS sample supports it (we already know that's 60%)."
    ],
    "steps_ar": [
      "أظهر استطلاع شمل 400 شخص أن 60% يؤيدون سياسة معينة، مع هامش خطأ قدره 4%. فترة الثقة هي نسبة العينة زائد أو ناقص هامش الخطأ: \\(60\\%\\pm4\\%\\).",
      "يعطي هذا الفترة \\([56\\%,64\\%]\\).",
      "التفسير: نحن واثقون من أن <em>نسبة المجتمع الحقيقية</em> المؤيدة للسياسة تقع بين 56% و64% — وليس أن 56–64% من هذه العينة يؤيدونها (فنحن نعلم بالفعل أنها 60%)."
    ]
  },
  {
    "t": "num",
    "ti": "Calculation Lab: Chi-Square Expected Cell Count",
    "ti_ar": "مختبر الحساب: التكرار المتوقع لخلية كاي تربيع",
    "q": "In a 2x2 contingency table, Row 1 total is 60, Column 1 total is 50, and the grand total is 200. What is the expected cell count \\(E\\) for Cell (1,1)?",
    "q_ar": "في جدول توافق 2×2، مجموع الصف الأول هو 60 ومجموع العمود الأول هو 50، والمجموع الكلي العام هو 200. ما هو التكرار المتوقع للخلية \\(E\\) في الخلية (1,1)؟",
    "a": 15,
    "tol": 0.01,
    "h": "Multiply row total by column total and divide by grand total: (60 * 50) / 200.",
    "h_ar": "اضرب مجموع الصف في مجموع العمود واقسم الناتج على المجموع الكلي: (60 * 50) / 200.",
    "sol": "\\(E = \\dfrac{60 \\times 50}{200} = \\dfrac{3000}{200} = 15\\).",
    "sol_ar": "\\(E = \\dfrac{60 \\times 50}{200} = \\dfrac{3000}{200} = 15\\)."
  },
  {
    "t": "ord",
    "ti": "Inference Protocol: 4-Step Hypothesis Testing Workflow",
    "ti_ar": "بروتوكول الاستدلال: الخطوات الأربع لاختبار الفرضيات",
    "q": "Arrange the standard College Board 4-step hypothesis testing sequence:",
    "q_ar": "رتب التسلسل القياسي للخطوات الأربع لاختبار الفرضيات المعتمد من College Board:",
    "items": [
      "State: Define population parameters, state H₀ and Hₐ, and specify significance level α.",
      "Plan: Identify the inference procedure and verify Random, 10%, and Large Counts conditions.",
      "Do: Calculate sample statistics, test statistic (z or t), and corresponding p-value.",
      "Conclude: Compare p-value to α and interpret rejection or failure to reject in real-world context."
    ],
    "items_ar": [
      "التصريح (State): تعريف معلمات المجتمع، وصياغة H₀ وHₐ، وتحديد مستوى المعنوية α.",
      "التخطيط (Plan): تحديد إجراء الاستدلال والتحقق من شروط العشوائية، و10%، والأعداد الكبيرة (Large Counts).",
      "التنفيذ (Do): حساب إحصاءات العينة، وإحصائية الاختبار (z أو t)، والقيمة الاحتمالية (p-value) المقابلة.",
      "الاستنتاج (Conclude): مقارنة القيمة الاحتمالية مع α وتفسير الرفض أو الفشل في الرفض في سياق العالم الحقيقي."
    ]
  },
  {
    "t": "cat",
    "ti": "Categorize: Statistical Errors & Power",
    "ti_ar": "تصنيف: الأخطاء الإحصائية وقوة الاختبار",
    "categories": [
      "Type I Error (α)",
      "Type II Error (β)",
      "Statistical Power (1 - β)"
    ],
    "categories_ar": [
      "خطأ من النوع الأول (α)",
      "خطأ من النوع الثاني (β)",
      "قوة الاختبار الإحصائي (1 - β)"
    ],
    "items": [
      {
        "s": "Rejecting a true null hypothesis (false positive)",
        "s_ar": "رفض فرضية العدم وهي صحيحة (إيجابية كاذبة)",
        "cat": 0
      },
      {
        "s": "Failing to reject a false null hypothesis (false negative)",
        "s_ar": "الفشل في رفض فرضية العدم وهي خاطئة (سلبية كاذبة)",
        "cat": 1
      },
      {
        "s": "Probability of correctly rejecting a false null hypothesis",
        "s_ar": "احتمال الرفض الصحيح لفرضية عدم خاطئة",
        "cat": 2
      },
      {
        "s": "Directly set by the chosen significance level α",
        "s_ar": "يُحدد مباشرة بمستوى المعنوية المختار α",
        "cat": 0
      },
      {
        "s": "Increases when sample size n increases",
        "s_ar": "تزداد قيمتها عند زيادة حجم العينة n",
        "cat": 2
      }
    ]
  },
  {
    "t": "se",
    "ti": "Spot the Error: Algebraic & Domain Verification (Unit 4 · Statistical Inference: Proportions, Means & Slopes)",
    "q": "A student solves the equation \\(\\sqrt{2x + 16} = x - 4\\) step by step. Which step introduces an invalid conclusion?",
    "steps": [
      "Square both sides to eliminate the radical: \\(2x + 16 = (x - 4)^2\\).",
      "Expand the right-hand side: \\(2x + 16 = x^2 - 8x + 16\\).",
      "Rearrange and factor: \\(x^2 - 10x = 0 \\implies x(x - 10) = 0\\).",
      "Conclude that both \\(x = 0\\) and \\(x = 10\\) are valid real solutions."
    ],
    "errorStep": 4,
    "reasons": [
      "Substituting \\(x = 0\\) into the original equation gives \\(\\sqrt{16} = -4\\) (\\(4 = -4\\)), which is false because the principal square root is non-negative (\\(x - 4 \\ge 0\\) requires \\(x \\ge 4\\)).",
      "Expanding \\((x - 4)^2\\) should give \\(x^2 - 16\\) with no middle term.",
      "Factoring \\(x^2 - 10x = 0\\) only yields \\(x = 10\\)."
    ],
    "correctReason": 0,
    "h": "Test \\(x = 0\\) in the original equation \\(\\sqrt{2x + 16} = x - 4\\).",
    "sol": "Squaring both sides is a non-reversible step unless \\(x - 4 \\ge 0 \\iff x \\ge 4\\). Therefore \\(x = 0\\) is an extraneous root and \\(x = 10\\) is the unique solution.",
    "ti_ar": "اكتشف الخطأ: الجذور الدخيلة والتحقق من المجال (Unit 4 · Statistical Inference: Proportions, Means & Slopes)",
    "q_ar": "يحل طالب المعادلة \\(\\sqrt{2x + 16} = x - 4\\) خطوة بخطوة. أي خطوة تتضمن استنتاجاً خاطئاً؟",
    "steps_ar": [
      "تربيع الطرفين للتخلص من الجذر: \\(2x + 16 = (x - 4)^2\\).",
      "فك المربع الكامل: \\(2x + 16 = x^2 - 8x + 16\\).",
      "الترتيب والتحليل: \\(x^2 - 10x = 0 \\implies x(x - 10) = 0\\).",
      "استنتاج أن كلاً من \\(x = 0\\) و \\(x = 10\\) حلان صحيحان للمعادلة الأصلية."
    ],
    "reasons_ar": [
      "التعويض عن \\(x = 0\\) في المعادلة الأصلية يعطي \\(4 = -4\\) وهو مستحيل لأن الجذر التربيعي الأساسي غير سالب (يجب أن يتحقق \\(x \\ge 4\\)).",
      "فك التربيع غير صحيح.",
      "التحليل بإخراج العامل المشترك غير صحيح."
    ],
    "h_ar": "عوّض عن \\(x = 0\\) في المعادلة الأصلية للتحقق من إشارة الطرف الأيمن.",
    "sol_ar": "الشرط اللازم هو \\(x - 4 \\ge 0 \\implies x \\ge 4\\)، لذا يُرفض الجذر الدخيل \\(x = 0\\) ويبقى \\(x = 10\\) فقط."
  },
  {
    "t": "ms",
    "ti": "Examiner Mode: Multi-Step Structured Problem (Unit 4 · Statistical Inference: Proportions, Means & Slopes)",
    "q": "Let \\(f(x) = x^2 - 8x + 19\\) for \\(x \\ge 4\\). (a) Express \\(f(x)\\) in completed-square vertex form and state the range of \\(f\\). (b) Find an expression for the inverse function \\(f^{-1}(x)\\) and state its domain.",
    "parts": [
      {
        "label": "Part (a) — Vertex Form & Range",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "Complete the square: \\(f(x) = (x - 4)^2 - 16 + 19 = (x - 4)^2 + 3\\)."
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
            "text": "Set \\(y = (x - 4)^2 + 3 \\implies (x - 4)^2 = y - 3\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "Select positive branch (since \\(x \\ge 4\\)): \\(f^{-1}(x) = 4 + \\sqrt{x - 3}\\)."
          },
          {
            "code": "B1",
            "marks": 1,
            "text": "State domain of \\(f^{-1}\\): \\(x \\ge 3\\) (matching the range of \\(f\\))."
          }
        ]
      }
    ],
    "examinerTip": "Writing \\(\\pm\\sqrt{x - 3}\\) for \\(f^{-1}(x)\\) loses the final A1 mark because a function must be single-valued; use the domain restriction \\(x \\ge 4\\) to choose the \\(+\\) sign.",
    "ti_ar": "وضع المصحح: إكمال المربع والدالة العكسية (Unit 4 · Statistical Inference: Proportions, Means & Slopes)",
    "q_ar": "لتكن \\(f(x) = x^2 - 8x + 19\\) حيث \\(x \\ge 4\\). (أ) اكتب \\(f(x)\\) في صورة المربع الكامل وحدد مداها. (ب) أوجد قاعدة الدالة العكسية \\(f^{-1}(x)\\) ومجالها.",
    "examinerTip_ar": "الدالة العكسية يجب أن تكون وحيدة القيمة، لذا نختار الإشارة الموجبة للجذر \\(4 + \\sqrt{x - 3}\\) لأن \\(x \\ge 4\\)."
  },
  {
    "t": "sb",
    "ti": "Step Builder: Completing the Square & Vertex Analysis (Unit 4 · Statistical Inference: Proportions, Means & Slopes)",
    "steps": [
      {
        "l": "In \\(y = x^2 - 8x + 19\\), halve the \\(x\\)-coefficient to write \\((x - h)^2\\) where \\(h =\\)",
        "a": "4",
        "h": "Take half of 8."
      },
      {
        "l": "Compute the minimum value \\(k = 19 - 4^2 =\\)",
        "a": "3",
        "h": "Subtract 16 from 19."
      },
      {
        "l": "Evaluate \\(y\\) when \\(x = 6\\): \\(y =\\)",
        "a": "7",
        "h": "Compute \\((2)^2 + 3\\)."
      }
    ],
    "ti_ar": "بناء الخطوات: إكمال المربع وإيجاد القيمة الصغرى (Unit 4 · Statistical Inference: Proportions, Means & Slopes)",
    "steps_ar": [
      {
        "l": "في الدالة \\(y = x^2 - 8x + 19\\): قيمة \\(h\\) في \\((x - h)^2\\) تساوي:",
        "a": "4",
        "h": "اقسم معامل x وهو 8 على 2."
      },
      {
        "l": "احسب القيمة الصغرى \\(k = 19 - 4^2 =\\)",
        "a": "3",
        "h": "اطرح 16 من 19."
      },
      {
        "l": "احسب قيمة \\(y\\) عندما \\(x = 6\\):",
        "a": "7",
        "h": "احسب \\(4 + 3\\)."
      }
    ]
  },
  {
    "t": "mt",
    "ti": "Matching: Core Algebraic & Analytic Principles (Unit 4 · Statistical Inference: Proportions, Means & Slopes)",
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
    "ti_ar": "مطابقة: المبادئ الجبرية والتحليلية الأساسية (Unit 4 · Statistical Inference: Proportions, Means & Slopes)",
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

D["aps-u5"] = [
  {
    "t": "qc",
    "ti": "Quick Check: Vertex & Minimum Analysis (Unit 5 · Sampling Distributions, Central Limit Theorem & Point Estimators)",
    "ti_ar": "فحص سريع: تحليل نقطة الرأس والقيمة الصغرى (الوحدة 5 · توزيعات المعاينة ونظرية النهاية المركزية والمقدرات النقطية)",
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
  },
  {
    "t": "tf",
    "ti": "True / False: Core Mathematical Properties (Unit 5 · Sampling Distributions, Central Limit Theorem & Point Estimators)",
    "ti_ar": "صح / خطأ: الخصائص الرياضية الأساسية (الوحدة 5 · توزيعات المعاينة ونظرية النهاية المركزية والمقدرات النقطية)",
    "items": [
      {
        "s": "The quadratic \\( (x - 8)^2 + 2 \\) attains its minimum value \\( 2 \\) at \\( x = 8 \\).",
        "a": true
      },
      {
        "s": "If the discriminant \\( b^2 - 4ac = 0 \\), the line is tangent to the parabola at a single repeated point.",
        "a": true
      },
      {
        "s": "The derivative of \\( x^3 - 24x \\) at \\( x = 8 \\) is zero.",
        "a": false
      }
    ],
    "items_ar": [
      {
        "s": "المقدار التربيعي \\( (x - 8)^2 + 2 \\) يبلغ قيمته الصغرى \\( 2 \\) عند \\( x = 8 \\).",
        "a": true
      },
      {
        "s": "إذا كان المميز \\( b^2 - 4ac = 0 \\)، فإن المستقيم يمس القطع المكافئ في نقطة واحدة مكررة.",
        "a": true
      },
      {
        "s": "مشتقة \\( x^3 - 24x \\) عند \\( x = 8 \\) تساوي صفراً.",
        "a": false
      }
    ]
  },
  {
    "t": "mt",
    "ti": "Matching: Algebraic & Analytical Identities (Unit 5 · Sampling Distributions, Central Limit Theorem & Point Estimators)",
    "ti_ar": "مطابقة: المتطابقات والعلاقات التحليلية (الوحدة 5 · توزيعات المعاينة ونظرية النهاية المركزية والمقدرات النقطية)",
    "p": [
      {
        "l": "\\( (x - 8)^2 + 2 \\)",
        "r": "Turning point at \\( (8, 2) \\)"
      },
      {
        "l": "\\( b^2 - 4ac > 0 \\)",
        "r": "Two distinct real roots / intersections"
      },
      {
        "l": "\\( b^2 - 4ac = 0 \\)",
        "r": "One repeated tangent root"
      },
      {
        "l": "\\( b^2 - 4ac < 0 \\)",
        "r": "No real roots (strictly separated)"
      }
    ],
    "p_ar": [
      {
        "l": "\\( (x - 8)^2 + 2 \\)",
        "r": "نقطة الرأس عند \\( (8, 2) \\)"
      },
      {
        "l": "\\( b^2 - 4ac > 0 \\)",
        "r": "جذران حقيقيان متمايزان"
      },
      {
        "l": "\\( b^2 - 4ac = 0 \\)",
        "r": "جذر حقيقي مكرر (حالة التماس)"
      },
      {
        "l": "\\( b^2 - 4ac < 0 \\)",
        "r": "لا توجد جذور حقيقية"
      }
    ]
  },
  {
    "t": "num",
    "ti": "Numeric Entry: Exact Evaluation (Unit 5 · Sampling Distributions, Central Limit Theorem & Point Estimators)",
    "ti_ar": "إدخال رقمي: الحساب الدقيق (الوحدة 5 · توزيعات المعاينة ونظرية النهاية المركزية والمقدرات النقطية)",
    "q": "Evaluate \\( f(11) \\) given \\( f(x) = (x - 8)^2 + 2 \\).",
    "q_ar": "احسب قيمة \\( f(11) \\) إذا علمت أن \\( f(x) = (x - 8)^2 + 2 \\).",
    "a": 11,
    "h": "Substitute \\( x = 11 \\) so \\( x - 8 = 3 \\).",
    "h_ar": "عوّض عن \\( x = 11 \\) بحيث يصبح \\( x - 8 = 3 \\).",
    "sol": "\\( f(11) = 3^2 + 2 = 11 \\).",
    "sol_ar": "\\( f(11) = 3^2 + 2 = 11 \\)."
  },
  {
    "t": "ord",
    "ti": "Order the Steps: Systematic Derivation (Unit 5 · Sampling Distributions, Central Limit Theorem & Point Estimators)",
    "ti_ar": "رتّب الخطوات: خطوات الاستنتاج المنظم (الوحدة 5 · توزيعات المعاينة ونظرية النهاية المركزية والمقدرات النقطية)",
    "prompt": "Arrange the steps in order to complete the square and find the minimum of \\( f(x) = x^2 - 16x + 66 \\):",
    "prompt_ar": "رتب خطوات إكمال المربع وإيجاد القيمة الصغرى للدالة \\( f(x) = x^2 - 16x + 66 \\):",
    "items": [
      "Identify the coefficient of \\( x \\) as \\( -16 \\) and halve it to get \\( -8 \\).",
      "Write the squared binomial \\( (x - 8)^2 = x^2 - 16x + 64 \\).",
      "Adjust the constant term: \\( f(x) = (x - 8)^2 - 64 + 66 = (x - 8)^2 + 2 \\).",
      "Conclude that the minimum value is \\( 2 \\), attained when \\( x = 8 \\)."
    ],
    "items_ar": [
      "حدد معامل \\( x \\) وهو \\( -16 \\) واقسمه على 2 لتحصل على \\( -8 \\).",
      "اكتب المربع الكامل \\( (x - 8)^2 = x^2 - 16x + 64 \\).",
      "عدّل الحد الثابت: \\( f(x) = (x - 8)^2 + 2 \\).",
      "استنتج أن القيمة الصغرى هي \\( 2 \\) وتتحقق عند \\( x = 8 \\)."
    ],
    "ex": "Halve the linear coefficient, form the square, subtract h², and read off the vertex.",
    "ex_ar": "اقسم معامل x على 2، كوّن المربع الكامل، اطرح مربع النصف، ثم استنتج الرأس."
  },
  {
    "t": "cat",
    "ti": "Categorize: Discriminant Classification (Unit 5 · Sampling Distributions, Central Limit Theorem & Point Estimators)",
    "ti_ar": "تصنيف: تصنيف المعادلات حسب المميز (الوحدة 5 · توزيعات المعاينة ونظرية النهاية المركزية والمقدرات النقطية)",
    "categories": [
      "Two Distinct Real Roots (Δ > 0)",
      "One Repeated Tangent Root (Δ = 0)",
      "No Real Roots (Δ < 0)"
    ],
    "categories_ar": [
      "جذران حقيقيان متمايزان (Δ > 0)",
      "جذر حقيقي مكرر / تماس (Δ = 0)",
      "لا توجد جذور حقيقية (Δ < 0)"
    ],
    "items": [
      {
        "s": "\\( x^2 - 16x + 64 = 0 \\)",
        "s_ar": "\\( x^2 - 16x + 64 = 0 \\)",
        "cat": 1
      },
      {
        "s": "\\( x^2 - 17x + 8 = 0 \\)",
        "s_ar": "\\( x^2 - 17x + 8 = 0 \\)",
        "cat": 0
      },
      {
        "s": "\\( x^2 + 8x + 68 = 0 \\)",
        "s_ar": "\\( x^2 + 8x + 68 = 0 \\)",
        "cat": 2
      },
      {
        "s": "\\( 4x^2 - 32x + 64 = 0 \\)",
        "s_ar": "\\( 4x^2 - 32x + 64 = 0 \\)",
        "cat": 1
      }
    ],
    "ex": "Compute Δ = b² − 4ac for each quadratic equation.",
    "ex_ar": "احسب قيمة المميز Δ = b² − 4ac لكل معادلة تربيعية."
  },
  {
    "t": "se",
    "ti": "Spot the Error: Extraneous Root Check (Unit 5 · Sampling Distributions, Central Limit Theorem & Point Estimators)",
    "ti_ar": "اكتشف الخطأ: التحقق من الجذور الدخيلة (الوحدة 5 · توزيعات المعاينة ونظرية النهاية المركزية والمقدرات النقطية)",
    "q": "A student solves \\( \\sqrt{2x + 128} = x - 8 \\). Which step introduces an invalid conclusion?",
    "q_ar": "يحل طالب المعادلة \\( \\sqrt{2x + 128} = x - 8 \\). أي خطوة تتضمن استنتاجاً خاطئاً؟",
    "steps": [
      "Square both sides: \\( 2x + 128 = (x - 8)^2 \\).",
      "Expand the right-hand side: \\( 2x + 128 = x^2 - 16x + 64 \\).",
      "Rearrange into standard form: \\( x^2 - 18x - 64 = 0 \\).",
      "Accept both algebraic roots without checking \\( x - 8 \\ge 0 \\)."
    ],
    "steps_ar": [
      "تربيع الطرفين: \\( 2x + 128 = (x - 8)^2 \\).",
      "فك التربيع: \\( 2x + 128 = x^2 - 16x + 64 \\).",
      "إعادة الترتيب: \\( x^2 - 18x - 64 = 0 \\).",
      "قبول الجذرين معاً دون التحقق من الشرط \\( x - 8 \\ge 0 \\)."
    ],
    "errorStep": 4,
    "reasons": [
      "Because \\( \\sqrt{\\cdot} \\ge 0 \\), any valid root must satisfy \\( x \\ge 8 \\); the negative root is extraneous.",
      "Expanding \\( (x - 8)^2 \\) should omit the middle term.",
      "Squaring both sides is never valid."
    ],
    "reasons_ar": [
      "لأن الجذر التربيعي غير سالب، يجب أن يتحقق \\( x \\ge 8 \\) ويُرفض الجذر السالب الدخيل.",
      "فك المربع الكامل غير صحيح.",
      "لا يجوز تربيع الطرفين."
    ],
    "correctReason": 0,
    "h": "Test whether \\( x - 8 \\ge 0 \\) holds for both roots.",
    "h_ar": "تحقق من شرط \\( x - 8 \\ge 0 \\) لكلا الجذرين.",
    "sol": "Only the root satisfying \\( x \\ge 8 \\) is a valid solution to the radical equation.",
    "sol_ar": "يُقبل فقط الجذر الذي يحقق الشرط \\( x \\ge 8 \\)."
  },
  {
    "t": "ms",
    "ti": "Examiner Mode: Multi-Step Rubric Problem (Unit 5 · Sampling Distributions, Central Limit Theorem & Point Estimators)",
    "ti_ar": "وضع المصحح: مسألة متعددة الخطوات (الوحدة 5 · توزيعات المعاينة ونظرية النهاية المركزية والمقدرات النقطية)",
    "q": "Let \\( f(x) = x^2 - 16x + 66 \\) for \\( x \\ge 8 \\). (a) Write \\( f(x) \\) in vertex form and state its range. (b) Find \\( f^{-1}(x) \\) and its domain.",
    "q_ar": "لتكن \\( f(x) = x^2 - 16x + 66 \\) حيث \\( x \\ge 8 \\). (أ) اكتب \\( f(x) \\) في صيغة الرأس وحدد مداها. (ب) أوجد \\( f^{-1}(x) \\) ومجالها.",
    "parts": [
      {
        "label": "Part (a) — Vertex Form & Range",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "Complete the square: \\( f(x) = (x - 8)^2 + 2 \\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "State range: \\( f(x) \\ge 2 \\)."
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
            "text": "Set \\( y = (x - 8)^2 + 2 \\implies (x - 8)^2 = y - 2 \\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "Choose positive root: \\( f^{-1}(x) = 8 + \\sqrt{x - 2} \\)."
          },
          {
            "code": "B1",
            "marks": 1,
            "text": "State domain of \\( f^{-1} \\): \\( x \\ge 2 \\)."
          }
        ]
      }
    ],
    "examinerTip": "Use the domain restriction \\( x \\ge 8 \\) to select the positive square root branch.",
    "examinerTip_ar": "استخدم شرط المجال \\( x \\ge 8 \\) لاختيار الفرع الموجب للجذر التربيعي."
  },
  {
    "t": "sb",
    "ti": "Step Builder: Guided Calculation (Unit 5 · Sampling Distributions, Central Limit Theorem & Point Estimators)",
    "ti_ar": "بناء الخطوات: حساب موجه (الوحدة 5 · توزيعات المعاينة ونظرية النهاية المركزية والمقدرات النقطية)",
    "steps": [
      {
        "l": "In \\( y = x^2 - 16x + 66 \\), find \\( h \\) in \\( (x - h)^2 + k \\):",
        "a": "8",
        "h": "Divide 16 by 2."
      },
      {
        "l": "Find the minimum value \\( k = 66 - 8^2 = \\)",
        "a": "2",
        "h": "Subtract 64 from 66."
      },
      {
        "l": "Evaluate \\( y \\) at \\( x = 10 \\):",
        "a": "6",
        "h": "Compute \\( 2^2 + 2 \\)."
      }
    ],
    "steps_ar": [
      {
        "l": "في الدالة \\( y = x^2 - 16x + 66 \\)، أوجد قيمة \\( h \\):",
        "a": "8",
        "h": "اقسم 16 على 2."
      },
      {
        "l": "أوجد القيمة الصغرى \\( k = \\)",
        "a": "2",
        "h": "اطرح 64 من 66."
      },
      {
        "l": "احسب قيمة \\( y \\) عند \\( x = 10 \\):",
        "a": "6",
        "h": "احسب \\( 2^2 + 2 \\)."
      }
    ]
  }
];

D["aps-u6"] = [
  {
    "t": "qc",
    "ti": "Quick Check: Vertex & Minimum Analysis (Unit 6 · Inference for Categorical Data: Proportions & Chi-Square Tests)",
    "ti_ar": "فحص سريع: تحليل نقطة الرأس والقيمة الصغرى (الوحدة 6 · الاستدلال للبيانات الفئوية: فترات الثقة واختبارات النسب ومربع كاي)",
    "q": "What is the minimum value of \\( f(x) = (x - 9)^2 + 6 \\) over all real \\( x \\)?",
    "q_ar": "ما هي القيمة الصغرى للدالة \\( f(x) = (x - 9)^2 + 6 \\) لكل \\( x \\in \\mathbb{R} \\)؟",
    "o": [
      "\\( 6 \\)",
      "\\( 9 \\)",
      "\\( -9 \\)",
      "\\( 87 \\)"
    ],
    "o_ar": [
      "\\( 6 \\)",
      "\\( 9 \\)",
      "\\( -9 \\)",
      "\\( 87 \\)"
    ],
    "a": 0,
    "ex": "Since \\( (x - 9)^2 \\ge 0 \\), the minimum value is \\( 6 \\) achieved at \\( x = 9 \\).",
    "ex_ar": "بما أن المربع الكامل غير سالب، فإن القيمة الصغرى هي \\( 6 \\) عند \\( x = 9 \\)."
  },
  {
    "t": "tf",
    "ti": "True / False: Core Mathematical Properties (Unit 6 · Inference for Categorical Data: Proportions & Chi-Square Tests)",
    "ti_ar": "صح / خطأ: الخصائص الرياضية الأساسية (الوحدة 6 · الاستدلال للبيانات الفئوية: فترات الثقة واختبارات النسب ومربع كاي)",
    "items": [
      {
        "s": "The quadratic \\( (x - 9)^2 + 3 \\) attains its minimum value \\( 3 \\) at \\( x = 9 \\).",
        "a": true
      },
      {
        "s": "If the discriminant \\( b^2 - 4ac = 0 \\), the line is tangent to the parabola at a single repeated point.",
        "a": true
      },
      {
        "s": "The derivative of \\( x^3 - 27x \\) at \\( x = 9 \\) is zero.",
        "a": false
      }
    ],
    "items_ar": [
      {
        "s": "المقدار التربيعي \\( (x - 9)^2 + 3 \\) يبلغ قيمته الصغرى \\( 3 \\) عند \\( x = 9 \\).",
        "a": true
      },
      {
        "s": "إذا كان المميز \\( b^2 - 4ac = 0 \\)، فإن المستقيم يمس القطع المكافئ في نقطة واحدة مكررة.",
        "a": true
      },
      {
        "s": "مشتقة \\( x^3 - 27x \\) عند \\( x = 9 \\) تساوي صفراً.",
        "a": false
      }
    ]
  },
  {
    "t": "mt",
    "ti": "Matching: Algebraic & Analytical Identities (Unit 6 · Inference for Categorical Data: Proportions & Chi-Square Tests)",
    "ti_ar": "مطابقة: المتطابقات والعلاقات التحليلية (الوحدة 6 · الاستدلال للبيانات الفئوية: فترات الثقة واختبارات النسب ومربع كاي)",
    "p": [
      {
        "l": "\\( (x - 9)^2 + 3 \\)",
        "r": "Turning point at \\( (9, 3) \\)"
      },
      {
        "l": "\\( b^2 - 4ac > 0 \\)",
        "r": "Two distinct real roots / intersections"
      },
      {
        "l": "\\( b^2 - 4ac = 0 \\)",
        "r": "One repeated tangent root"
      },
      {
        "l": "\\( b^2 - 4ac < 0 \\)",
        "r": "No real roots (strictly separated)"
      }
    ],
    "p_ar": [
      {
        "l": "\\( (x - 9)^2 + 3 \\)",
        "r": "نقطة الرأس عند \\( (9, 3) \\)"
      },
      {
        "l": "\\( b^2 - 4ac > 0 \\)",
        "r": "جذران حقيقيان متمايزان"
      },
      {
        "l": "\\( b^2 - 4ac = 0 \\)",
        "r": "جذر حقيقي مكرر (حالة التماس)"
      },
      {
        "l": "\\( b^2 - 4ac < 0 \\)",
        "r": "لا توجد جذور حقيقية"
      }
    ]
  },
  {
    "t": "num",
    "ti": "Numeric Entry: Exact Evaluation (Unit 6 · Inference for Categorical Data: Proportions & Chi-Square Tests)",
    "ti_ar": "إدخال رقمي: الحساب الدقيق (الوحدة 6 · الاستدلال للبيانات الفئوية: فترات الثقة واختبارات النسب ومربع كاي)",
    "q": "Evaluate \\( f(12) \\) given \\( f(x) = (x - 9)^2 + 3 \\).",
    "q_ar": "احسب قيمة \\( f(12) \\) إذا علمت أن \\( f(x) = (x - 9)^2 + 3 \\).",
    "a": 12,
    "h": "Substitute \\( x = 12 \\) so \\( x - 9 = 3 \\).",
    "h_ar": "عوّض عن \\( x = 12 \\) بحيث يصبح \\( x - 9 = 3 \\).",
    "sol": "\\( f(12) = 3^2 + 3 = 12 \\).",
    "sol_ar": "\\( f(12) = 3^2 + 3 = 12 \\)."
  },
  {
    "t": "ord",
    "ti": "Order the Steps: Systematic Derivation (Unit 6 · Inference for Categorical Data: Proportions & Chi-Square Tests)",
    "ti_ar": "رتّب الخطوات: خطوات الاستنتاج المنظم (الوحدة 6 · الاستدلال للبيانات الفئوية: فترات الثقة واختبارات النسب ومربع كاي)",
    "prompt": "Arrange the steps in order to complete the square and find the minimum of \\( f(x) = x^2 - 18x + 84 \\):",
    "prompt_ar": "رتب خطوات إكمال المربع وإيجاد القيمة الصغرى للدالة \\( f(x) = x^2 - 18x + 84 \\):",
    "items": [
      "Identify the coefficient of \\( x \\) as \\( -18 \\) and halve it to get \\( -9 \\).",
      "Write the squared binomial \\( (x - 9)^2 = x^2 - 18x + 81 \\).",
      "Adjust the constant term: \\( f(x) = (x - 9)^2 - 81 + 84 = (x - 9)^2 + 3 \\).",
      "Conclude that the minimum value is \\( 3 \\), attained when \\( x = 9 \\)."
    ],
    "items_ar": [
      "حدد معامل \\( x \\) وهو \\( -18 \\) واقسمه على 2 لتحصل على \\( -9 \\).",
      "اكتب المربع الكامل \\( (x - 9)^2 = x^2 - 18x + 81 \\).",
      "عدّل الحد الثابت: \\( f(x) = (x - 9)^2 + 3 \\).",
      "استنتج أن القيمة الصغرى هي \\( 3 \\) وتتحقق عند \\( x = 9 \\)."
    ],
    "ex": "Halve the linear coefficient, form the square, subtract h², and read off the vertex.",
    "ex_ar": "اقسم معامل x على 2، كوّن المربع الكامل، اطرح مربع النصف، ثم استنتج الرأس."
  },
  {
    "t": "cat",
    "ti": "Categorize: Discriminant Classification (Unit 6 · Inference for Categorical Data: Proportions & Chi-Square Tests)",
    "ti_ar": "تصنيف: تصنيف المعادلات حسب المميز (الوحدة 6 · الاستدلال للبيانات الفئوية: فترات الثقة واختبارات النسب ومربع كاي)",
    "categories": [
      "Two Distinct Real Roots (Δ > 0)",
      "One Repeated Tangent Root (Δ = 0)",
      "No Real Roots (Δ < 0)"
    ],
    "categories_ar": [
      "جذران حقيقيان متمايزان (Δ > 0)",
      "جذر حقيقي مكرر / تماس (Δ = 0)",
      "لا توجد جذور حقيقية (Δ < 0)"
    ],
    "items": [
      {
        "s": "\\( x^2 - 18x + 81 = 0 \\)",
        "s_ar": "\\( x^2 - 18x + 81 = 0 \\)",
        "cat": 1
      },
      {
        "s": "\\( x^2 - 19x + 9 = 0 \\)",
        "s_ar": "\\( x^2 - 19x + 9 = 0 \\)",
        "cat": 0
      },
      {
        "s": "\\( x^2 + 9x + 85 = 0 \\)",
        "s_ar": "\\( x^2 + 9x + 85 = 0 \\)",
        "cat": 2
      },
      {
        "s": "\\( 4x^2 - 36x + 81 = 0 \\)",
        "s_ar": "\\( 4x^2 - 36x + 81 = 0 \\)",
        "cat": 1
      }
    ],
    "ex": "Compute Δ = b² − 4ac for each quadratic equation.",
    "ex_ar": "احسب قيمة المميز Δ = b² − 4ac لكل معادلة تربيعية."
  },
  {
    "t": "se",
    "ti": "Spot the Error: Extraneous Root Check (Unit 6 · Inference for Categorical Data: Proportions & Chi-Square Tests)",
    "ti_ar": "اكتشف الخطأ: التحقق من الجذور الدخيلة (الوحدة 6 · الاستدلال للبيانات الفئوية: فترات الثقة واختبارات النسب ومربع كاي)",
    "q": "A student solves \\( \\sqrt{2x + 162} = x - 9 \\). Which step introduces an invalid conclusion?",
    "q_ar": "يحل طالب المعادلة \\( \\sqrt{2x + 162} = x - 9 \\). أي خطوة تتضمن استنتاجاً خاطئاً؟",
    "steps": [
      "Square both sides: \\( 2x + 162 = (x - 9)^2 \\).",
      "Expand the right-hand side: \\( 2x + 162 = x^2 - 18x + 81 \\).",
      "Rearrange into standard form: \\( x^2 - 20x - 81 = 0 \\).",
      "Accept both algebraic roots without checking \\( x - 9 \\ge 0 \\)."
    ],
    "steps_ar": [
      "تربيع الطرفين: \\( 2x + 162 = (x - 9)^2 \\).",
      "فك التربيع: \\( 2x + 162 = x^2 - 18x + 81 \\).",
      "إعادة الترتيب: \\( x^2 - 20x - 81 = 0 \\).",
      "قبول الجذرين معاً دون التحقق من الشرط \\( x - 9 \\ge 0 \\)."
    ],
    "errorStep": 4,
    "reasons": [
      "Because \\( \\sqrt{\\cdot} \\ge 0 \\), any valid root must satisfy \\( x \\ge 9 \\); the negative root is extraneous.",
      "Expanding \\( (x - 9)^2 \\) should omit the middle term.",
      "Squaring both sides is never valid."
    ],
    "reasons_ar": [
      "لأن الجذر التربيعي غير سالب، يجب أن يتحقق \\( x \\ge 9 \\) ويُرفض الجذر السالب الدخيل.",
      "فك المربع الكامل غير صحيح.",
      "لا يجوز تربيع الطرفين."
    ],
    "correctReason": 0,
    "h": "Test whether \\( x - 9 \\ge 0 \\) holds for both roots.",
    "h_ar": "تحقق من شرط \\( x - 9 \\ge 0 \\) لكلا الجذرين.",
    "sol": "Only the root satisfying \\( x \\ge 9 \\) is a valid solution to the radical equation.",
    "sol_ar": "يُقبل فقط الجذر الذي يحقق الشرط \\( x \\ge 9 \\)."
  },
  {
    "t": "ms",
    "ti": "Examiner Mode: Multi-Step Rubric Problem (Unit 6 · Inference for Categorical Data: Proportions & Chi-Square Tests)",
    "ti_ar": "وضع المصحح: مسألة متعددة الخطوات (الوحدة 6 · الاستدلال للبيانات الفئوية: فترات الثقة واختبارات النسب ومربع كاي)",
    "q": "Let \\( f(x) = x^2 - 18x + 84 \\) for \\( x \\ge 9 \\). (a) Write \\( f(x) \\) in vertex form and state its range. (b) Find \\( f^{-1}(x) \\) and its domain.",
    "q_ar": "لتكن \\( f(x) = x^2 - 18x + 84 \\) حيث \\( x \\ge 9 \\). (أ) اكتب \\( f(x) \\) في صيغة الرأس وحدد مداها. (ب) أوجد \\( f^{-1}(x) \\) ومجالها.",
    "parts": [
      {
        "label": "Part (a) — Vertex Form & Range",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "Complete the square: \\( f(x) = (x - 9)^2 + 3 \\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "State range: \\( f(x) \\ge 3 \\)."
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
            "text": "Set \\( y = (x - 9)^2 + 3 \\implies (x - 9)^2 = y - 3 \\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "Choose positive root: \\( f^{-1}(x) = 9 + \\sqrt{x - 3} \\)."
          },
          {
            "code": "B1",
            "marks": 1,
            "text": "State domain of \\( f^{-1} \\): \\( x \\ge 3 \\)."
          }
        ]
      }
    ],
    "examinerTip": "Use the domain restriction \\( x \\ge 9 \\) to select the positive square root branch.",
    "examinerTip_ar": "استخدم شرط المجال \\( x \\ge 9 \\) لاختيار الفرع الموجب للجذر التربيعي."
  },
  {
    "t": "sb",
    "ti": "Step Builder: Guided Calculation (Unit 6 · Inference for Categorical Data: Proportions & Chi-Square Tests)",
    "ti_ar": "بناء الخطوات: حساب موجه (الوحدة 6 · الاستدلال للبيانات الفئوية: فترات الثقة واختبارات النسب ومربع كاي)",
    "steps": [
      {
        "l": "In \\( y = x^2 - 18x + 84 \\), find \\( h \\) in \\( (x - h)^2 + k \\):",
        "a": "9",
        "h": "Divide 18 by 2."
      },
      {
        "l": "Find the minimum value \\( k = 84 - 9^2 = \\)",
        "a": "3",
        "h": "Subtract 81 from 84."
      },
      {
        "l": "Evaluate \\( y \\) at \\( x = 11 \\):",
        "a": "7",
        "h": "Compute \\( 2^2 + 3 \\)."
      }
    ],
    "steps_ar": [
      {
        "l": "في الدالة \\( y = x^2 - 18x + 84 \\)، أوجد قيمة \\( h \\):",
        "a": "9",
        "h": "اقسم 18 على 2."
      },
      {
        "l": "أوجد القيمة الصغرى \\( k = \\)",
        "a": "3",
        "h": "اطرح 81 من 84."
      },
      {
        "l": "احسب قيمة \\( y \\) عند \\( x = 11 \\):",
        "a": "7",
        "h": "احسب \\( 2^2 + 3 \\)."
      }
    ]
  }
];

D["aps-u7"] = [
  {
    "t": "qc",
    "ti": "Quick Check: Vertex & Minimum Analysis (Unit 7 · Inference for Quantitative Data: Means, Paired t & Regression Slope)",
    "ti_ar": "فحص سريع: تحليل نقطة الرأس والقيمة الصغرى (الوحدة 7 · الاستدلال للبيانات الكمية: اختبارات t للمتوسطات وميل خط الانحدار)",
    "q": "What is the minimum value of \\( f(x) = (x - 3)^2 + 7 \\) over all real \\( x \\)?",
    "q_ar": "ما هي القيمة الصغرى للدالة \\( f(x) = (x - 3)^2 + 7 \\) لكل \\( x \\in \\mathbb{R} \\)؟",
    "o": [
      "\\( 7 \\)",
      "\\( 3 \\)",
      "\\( -3 \\)",
      "\\( 16 \\)"
    ],
    "o_ar": [
      "\\( 7 \\)",
      "\\( 3 \\)",
      "\\( -3 \\)",
      "\\( 16 \\)"
    ],
    "a": 0,
    "ex": "Since \\( (x - 3)^2 \\ge 0 \\), the minimum value is \\( 7 \\) achieved at \\( x = 3 \\).",
    "ex_ar": "بما أن المربع الكامل غير سالب، فإن القيمة الصغرى هي \\( 7 \\) عند \\( x = 3 \\)."
  },
  {
    "t": "tf",
    "ti": "True / False: Core Mathematical Properties (Unit 7 · Inference for Quantitative Data: Means, Paired t & Regression Slope)",
    "ti_ar": "صح / خطأ: الخصائص الرياضية الأساسية (الوحدة 7 · الاستدلال للبيانات الكمية: اختبارات t للمتوسطات وميل خط الانحدار)",
    "items": [
      {
        "s": "The quadratic \\( (x - 3)^2 + 4 \\) attains its minimum value \\( 4 \\) at \\( x = 3 \\).",
        "a": true
      },
      {
        "s": "If the discriminant \\( b^2 - 4ac = 0 \\), the line is tangent to the parabola at a single repeated point.",
        "a": true
      },
      {
        "s": "The derivative of \\( x^3 - 9x \\) at \\( x = 3 \\) is zero.",
        "a": false
      }
    ],
    "items_ar": [
      {
        "s": "المقدار التربيعي \\( (x - 3)^2 + 4 \\) يبلغ قيمته الصغرى \\( 4 \\) عند \\( x = 3 \\).",
        "a": true
      },
      {
        "s": "إذا كان المميز \\( b^2 - 4ac = 0 \\)، فإن المستقيم يمس القطع المكافئ في نقطة واحدة مكررة.",
        "a": true
      },
      {
        "s": "مشتقة \\( x^3 - 9x \\) عند \\( x = 3 \\) تساوي صفراً.",
        "a": false
      }
    ]
  },
  {
    "t": "mt",
    "ti": "Matching: Algebraic & Analytical Identities (Unit 7 · Inference for Quantitative Data: Means, Paired t & Regression Slope)",
    "ti_ar": "مطابقة: المتطابقات والعلاقات التحليلية (الوحدة 7 · الاستدلال للبيانات الكمية: اختبارات t للمتوسطات وميل خط الانحدار)",
    "p": [
      {
        "l": "\\( (x - 3)^2 + 4 \\)",
        "r": "Turning point at \\( (3, 4) \\)"
      },
      {
        "l": "\\( b^2 - 4ac > 0 \\)",
        "r": "Two distinct real roots / intersections"
      },
      {
        "l": "\\( b^2 - 4ac = 0 \\)",
        "r": "One repeated tangent root"
      },
      {
        "l": "\\( b^2 - 4ac < 0 \\)",
        "r": "No real roots (strictly separated)"
      }
    ],
    "p_ar": [
      {
        "l": "\\( (x - 3)^2 + 4 \\)",
        "r": "نقطة الرأس عند \\( (3, 4) \\)"
      },
      {
        "l": "\\( b^2 - 4ac > 0 \\)",
        "r": "جذران حقيقيان متمايزان"
      },
      {
        "l": "\\( b^2 - 4ac = 0 \\)",
        "r": "جذر حقيقي مكرر (حالة التماس)"
      },
      {
        "l": "\\( b^2 - 4ac < 0 \\)",
        "r": "لا توجد جذور حقيقية"
      }
    ]
  },
  {
    "t": "num",
    "ti": "Numeric Entry: Exact Evaluation (Unit 7 · Inference for Quantitative Data: Means, Paired t & Regression Slope)",
    "ti_ar": "إدخال رقمي: الحساب الدقيق (الوحدة 7 · الاستدلال للبيانات الكمية: اختبارات t للمتوسطات وميل خط الانحدار)",
    "q": "Evaluate \\( f(6) \\) given \\( f(x) = (x - 3)^2 + 4 \\).",
    "q_ar": "احسب قيمة \\( f(6) \\) إذا علمت أن \\( f(x) = (x - 3)^2 + 4 \\).",
    "a": 13,
    "h": "Substitute \\( x = 6 \\) so \\( x - 3 = 3 \\).",
    "h_ar": "عوّض عن \\( x = 6 \\) بحيث يصبح \\( x - 3 = 3 \\).",
    "sol": "\\( f(6) = 3^2 + 4 = 13 \\).",
    "sol_ar": "\\( f(6) = 3^2 + 4 = 13 \\)."
  },
  {
    "t": "ord",
    "ti": "Order the Steps: Systematic Derivation (Unit 7 · Inference for Quantitative Data: Means, Paired t & Regression Slope)",
    "ti_ar": "رتّب الخطوات: خطوات الاستنتاج المنظم (الوحدة 7 · الاستدلال للبيانات الكمية: اختبارات t للمتوسطات وميل خط الانحدار)",
    "prompt": "Arrange the steps in order to complete the square and find the minimum of \\( f(x) = x^2 - 6x + 13 \\):",
    "prompt_ar": "رتب خطوات إكمال المربع وإيجاد القيمة الصغرى للدالة \\( f(x) = x^2 - 6x + 13 \\):",
    "items": [
      "Identify the coefficient of \\( x \\) as \\( -6 \\) and halve it to get \\( -3 \\).",
      "Write the squared binomial \\( (x - 3)^2 = x^2 - 6x + 9 \\).",
      "Adjust the constant term: \\( f(x) = (x - 3)^2 - 9 + 13 = (x - 3)^2 + 4 \\).",
      "Conclude that the minimum value is \\( 4 \\), attained when \\( x = 3 \\)."
    ],
    "items_ar": [
      "حدد معامل \\( x \\) وهو \\( -6 \\) واقسمه على 2 لتحصل على \\( -3 \\).",
      "اكتب المربع الكامل \\( (x - 3)^2 = x^2 - 6x + 9 \\).",
      "عدّل الحد الثابت: \\( f(x) = (x - 3)^2 + 4 \\).",
      "استنتج أن القيمة الصغرى هي \\( 4 \\) وتتحقق عند \\( x = 3 \\)."
    ],
    "ex": "Halve the linear coefficient, form the square, subtract h², and read off the vertex.",
    "ex_ar": "اقسم معامل x على 2، كوّن المربع الكامل، اطرح مربع النصف، ثم استنتج الرأس."
  },
  {
    "t": "cat",
    "ti": "Categorize: Discriminant Classification (Unit 7 · Inference for Quantitative Data: Means, Paired t & Regression Slope)",
    "ti_ar": "تصنيف: تصنيف المعادلات حسب المميز (الوحدة 7 · الاستدلال للبيانات الكمية: اختبارات t للمتوسطات وميل خط الانحدار)",
    "categories": [
      "Two Distinct Real Roots (Δ > 0)",
      "One Repeated Tangent Root (Δ = 0)",
      "No Real Roots (Δ < 0)"
    ],
    "categories_ar": [
      "جذران حقيقيان متمايزان (Δ > 0)",
      "جذر حقيقي مكرر / تماس (Δ = 0)",
      "لا توجد جذور حقيقية (Δ < 0)"
    ],
    "items": [
      {
        "s": "\\( x^2 - 6x + 9 = 0 \\)",
        "s_ar": "\\( x^2 - 6x + 9 = 0 \\)",
        "cat": 1
      },
      {
        "s": "\\( x^2 - 7x + 3 = 0 \\)",
        "s_ar": "\\( x^2 - 7x + 3 = 0 \\)",
        "cat": 0
      },
      {
        "s": "\\( x^2 + 3x + 13 = 0 \\)",
        "s_ar": "\\( x^2 + 3x + 13 = 0 \\)",
        "cat": 2
      },
      {
        "s": "\\( 4x^2 - 12x + 9 = 0 \\)",
        "s_ar": "\\( 4x^2 - 12x + 9 = 0 \\)",
        "cat": 1
      }
    ],
    "ex": "Compute Δ = b² − 4ac for each quadratic equation.",
    "ex_ar": "احسب قيمة المميز Δ = b² − 4ac لكل معادلة تربيعية."
  },
  {
    "t": "se",
    "ti": "Spot the Error: Extraneous Root Check (Unit 7 · Inference for Quantitative Data: Means, Paired t & Regression Slope)",
    "ti_ar": "اكتشف الخطأ: التحقق من الجذور الدخيلة (الوحدة 7 · الاستدلال للبيانات الكمية: اختبارات t للمتوسطات وميل خط الانحدار)",
    "q": "A student solves \\( \\sqrt{2x + 18} = x - 3 \\). Which step introduces an invalid conclusion?",
    "q_ar": "يحل طالب المعادلة \\( \\sqrt{2x + 18} = x - 3 \\). أي خطوة تتضمن استنتاجاً خاطئاً؟",
    "steps": [
      "Square both sides: \\( 2x + 18 = (x - 3)^2 \\).",
      "Expand the right-hand side: \\( 2x + 18 = x^2 - 6x + 9 \\).",
      "Rearrange into standard form: \\( x^2 - 8x - 9 = 0 \\).",
      "Accept both algebraic roots without checking \\( x - 3 \\ge 0 \\)."
    ],
    "steps_ar": [
      "تربيع الطرفين: \\( 2x + 18 = (x - 3)^2 \\).",
      "فك التربيع: \\( 2x + 18 = x^2 - 6x + 9 \\).",
      "إعادة الترتيب: \\( x^2 - 8x - 9 = 0 \\).",
      "قبول الجذرين معاً دون التحقق من الشرط \\( x - 3 \\ge 0 \\)."
    ],
    "errorStep": 4,
    "reasons": [
      "Because \\( \\sqrt{\\cdot} \\ge 0 \\), any valid root must satisfy \\( x \\ge 3 \\); the negative root is extraneous.",
      "Expanding \\( (x - 3)^2 \\) should omit the middle term.",
      "Squaring both sides is never valid."
    ],
    "reasons_ar": [
      "لأن الجذر التربيعي غير سالب، يجب أن يتحقق \\( x \\ge 3 \\) ويُرفض الجذر السالب الدخيل.",
      "فك المربع الكامل غير صحيح.",
      "لا يجوز تربيع الطرفين."
    ],
    "correctReason": 0,
    "h": "Test whether \\( x - 3 \\ge 0 \\) holds for both roots.",
    "h_ar": "تحقق من شرط \\( x - 3 \\ge 0 \\) لكلا الجذرين.",
    "sol": "Only the root satisfying \\( x \\ge 3 \\) is a valid solution to the radical equation.",
    "sol_ar": "يُقبل فقط الجذر الذي يحقق الشرط \\( x \\ge 3 \\)."
  },
  {
    "t": "ms",
    "ti": "Examiner Mode: Multi-Step Rubric Problem (Unit 7 · Inference for Quantitative Data: Means, Paired t & Regression Slope)",
    "ti_ar": "وضع المصحح: مسألة متعددة الخطوات (الوحدة 7 · الاستدلال للبيانات الكمية: اختبارات t للمتوسطات وميل خط الانحدار)",
    "q": "Let \\( f(x) = x^2 - 6x + 13 \\) for \\( x \\ge 3 \\). (a) Write \\( f(x) \\) in vertex form and state its range. (b) Find \\( f^{-1}(x) \\) and its domain.",
    "q_ar": "لتكن \\( f(x) = x^2 - 6x + 13 \\) حيث \\( x \\ge 3 \\). (أ) اكتب \\( f(x) \\) في صيغة الرأس وحدد مداها. (ب) أوجد \\( f^{-1}(x) \\) ومجالها.",
    "parts": [
      {
        "label": "Part (a) — Vertex Form & Range",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "Complete the square: \\( f(x) = (x - 3)^2 + 4 \\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "State range: \\( f(x) \\ge 4 \\)."
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
            "text": "Set \\( y = (x - 3)^2 + 4 \\implies (x - 3)^2 = y - 4 \\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "Choose positive root: \\( f^{-1}(x) = 3 + \\sqrt{x - 4} \\)."
          },
          {
            "code": "B1",
            "marks": 1,
            "text": "State domain of \\( f^{-1} \\): \\( x \\ge 4 \\)."
          }
        ]
      }
    ],
    "examinerTip": "Use the domain restriction \\( x \\ge 3 \\) to select the positive square root branch.",
    "examinerTip_ar": "استخدم شرط المجال \\( x \\ge 3 \\) لاختيار الفرع الموجب للجذر التربيعي."
  },
  {
    "t": "sb",
    "ti": "Step Builder: Guided Calculation (Unit 7 · Inference for Quantitative Data: Means, Paired t & Regression Slope)",
    "ti_ar": "بناء الخطوات: حساب موجه (الوحدة 7 · الاستدلال للبيانات الكمية: اختبارات t للمتوسطات وميل خط الانحدار)",
    "steps": [
      {
        "l": "In \\( y = x^2 - 6x + 13 \\), find \\( h \\) in \\( (x - h)^2 + k \\):",
        "a": "3",
        "h": "Divide 6 by 2."
      },
      {
        "l": "Find the minimum value \\( k = 13 - 3^2 = \\)",
        "a": "4",
        "h": "Subtract 9 from 13."
      },
      {
        "l": "Evaluate \\( y \\) at \\( x = 5 \\):",
        "a": "8",
        "h": "Compute \\( 2^2 + 4 \\)."
      }
    ],
    "steps_ar": [
      {
        "l": "في الدالة \\( y = x^2 - 6x + 13 \\)، أوجد قيمة \\( h \\):",
        "a": "3",
        "h": "اقسم 6 على 2."
      },
      {
        "l": "أوجد القيمة الصغرى \\( k = \\)",
        "a": "4",
        "h": "اطرح 9 من 13."
      },
      {
        "l": "احسب قيمة \\( y \\) عند \\( x = 5 \\):",
        "a": "8",
        "h": "احسب \\( 2^2 + 4 \\)."
      }
    ]
  }
];
});
