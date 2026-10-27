/* Interactive Practice data for /appc/ - one entry per chapter section id.
   Shipped as public/js/ix/appc.js and loaded only on that track's page by the
   engine in src/scripts/modules/19-interactive-activities-engine-v1.js
   (Plan 5 Phase 5.015, ADR 0033). Entry shapes (qc/mt/tf/sb/sr/fn/num/ord/cat/gp/se/ms) are
   documented there. */
(window.__ixData = window.__ixData || []).push(function (D) {
D["appc-overview"] = [
  {
    "t": "qc",
    "ti": "Quick Check: AP Precalculus Conceptual Framework",
    "ti_ar": "فحص سريع: الإطار المفاهيمي لحساب التفاضل والتكامل التمهيدي (AP Precalculus)",
    "q": "What is the primary focus of the AP Precalculus framework designed by College Board?",
    "q_ar": "ما هو التركيز الأساسي لإطار مقرر AP Precalculus المصمم بواسطة College Board؟",
    "o": [
      "Modeling dynamic real-world phenomena using function families and rates of change",
      "Memorizing algebraic formulas and mechanical drills",
      "Rigorous epsilon-delta proofs and multi-variable calculus",
      "Euclidean geometric axiomatic systems"
    ],
    "o_ar": [
      "نمذجة الظواهر الديناميكية في العالم الحقيقي باستخدام عائلات الدوال ومعدلات التغير",
      "حفظ الصيغ الجبرية والتدريبات الآلية",
      "براهين إبسيلون-دلتا الصارمة وحساب التفاضل والتكامل متعدد المتغيرات",
      "الأنظمة البديهية للهندسة الإقليدية"
    ],
    "a": 0,
    "ex": "AP Precalculus emphasizes understanding rates of change, function behaviors, parametric representations, and mathematical modeling across polynomial, rational, exponential, logarithmic, and trigonometric families.",
    "ex_ar": "يركز AP Precalculus على فهم معدلات التغير، وسلوك الدوال، والتمثيلات الوسيطية (البارامترية)، والنمذجة الرياضية عبر عائلات الدوال الحدودية، والنسبية، والأسية، واللوغاريتمية، والمثلثية."
  },
  {
    "t": "tf",
    "ti": "Reasoning Lab: AP Precalculus Exam Format & Rules",
    "ti_ar": "مختبر التفكير: هيكل وقواعد اختبار AP Precalculus",
    "items": [
      {
        "s": "Section I Part A (28 questions, 80 minutes) prohibits any calculator.",
        "s_ar": "يمنع استخدام أي آلة حاسبة تماماً في القسم الأول الجزء أ (28 سؤالاً، 80 دقيقة).",
        "a": true,
        "ex": "Part A is strictly non-calculator.",
        "ex_ar": "الجزء أ ممنوع فيه استخدام الآلة الحاسبة تماماً."
      },
      {
        "s": "A graphing calculator is permitted on Section II Free Response Questions.",
        "s_ar": "يُسمح باستخدام آلة حاسبة بيانية في الأسئلة المقالية للقسم الثاني (FRQ).",
        "a": true,
        "ex": "All 4 FRQs permit an approved graphing calculator.",
        "ex_ar": "تسمح جميع الأسئلة المقالية الأربعة باستخدام آلة حاسبة بيانية معتمدة."
      },
      {
        "s": "Final answers to Free Response Questions should be rounded to 2 decimal places.",
        "s_ar": "يجب تقريب الإجابات النهائية للأسئلة المقالية إلى منزلتين عشريتين.",
        "a": false,
        "ex": "College Board standard requires 3 decimal places.",
        "ex_ar": "تشترط معايير College Board التقريب إلى 3 منازل عشرية."
      }
    ]
  },
  {
    "t": "num",
    "ti": "Pacing Check: Average Minutes per Question in Part A",
    "ti_ar": "فحص وتيرة الوقت: متوسط الدقائق المتاحة لكل سؤال في الجزء أ",
    "q": "Section I Part A contains 28 multiple-choice questions in 80 minutes. What is the average time available per question in minutes, rounded to one decimal place?",
    "q_ar": "يحتوي القسم الأول الجزء أ على 28 سؤال اختيار من متعدد في 80 دقيقة. ما هو متوسط الوقت المتاح لكل سؤال بالدقائق، مقرباً إلى منزلة عشرية واحدة؟",
    "a": 2.9,
    "tol": 0.1,
    "unit": "min/question",
    "h": "Divide 80 minutes by 28 questions.",
    "h_ar": "اقسم 80 دقيقة على 28 سؤالاً.",
    "sol": "\\(\\dfrac{80}{28} = \\dfrac{20}{7} \\approx 2.86 \\approx 2.9\\text{ minutes/question}\\).",
    "sol_ar": "\\(\\dfrac{80}{28} = \\dfrac{20}{7} \\approx 2.86 \\approx 2.9\\text{ دقيقة/سؤال}\\)."
  },
  {
    "t": "ord",
    "ti": "FRQ Protocol: Modeling Scenario Workflow",
    "ti_ar": "بروتوكول الأسئلة المقالية: خطوات نمذجة السيناريوهات",
    "q": "Arrange the sequence of steps for approaching an AP Precalculus FRQ modeling scenario:",
    "q_ar": "رتب خطوات التعامل مع سيناريو نمذجة مقالي في اختبار AP Precalculus:",
    "items": [
      "Read the problem context carefully and identify given variables, units, and rates of change.",
      "Examine given data values to determine the appropriate function family (linear, quadratic, or exponential).",
      "Write the general mathematical function setup with symbolic parameters before using the calculator.",
      "Use regression or system-solving on the graphing calculator to find specific parameter values.",
      "State the final model equation and answer the contextual question with correct 3-decimal precision and units."
    ],
    "items_ar": [
      "قراءة سياق المسألة بعناية وتحديد المتغيرات المعطاة، والوحدات، ومعدلات التغير.",
      "فحص قيم البيانات المعطاة لتحديد عائلة الدوال المناسبة (خطية، أو تربيعية، أو أسية).",
      "كتابة الصيغة الرياضية العامة للدالة بمعلمات رمزية قبل استخدام الآلة الحاسبة.",
      "استخدام الانحدار أو حل الأنظمة على الآلة الحاسبة البيانية لإيجاد قيم المعلمات المحددة.",
      "كتابة معادلة النموذج النهائية والإجابة عن سؤال السياق بدقة 3 منازل عشرية والوحدات الصحيحة."
    ]
  },
  {
    "t": "cat",
    "ti": "Categorize: Rate of Change Behaviors",
    "ti_ar": "تصنيف: سلوكيات معدل التغير",
    "categories": [
      "Constant Rate of Change (Linear)",
      "Linear Rate of Change (Quadratic)",
      "Proportional Rate of Change (Exponential)"
    ],
    "categories_ar": [
      "معدل تغير ثابت (خطي)",
      "معدل تغير خطي (تربيعي)",
      "معدل تغير نسبي متناسب (أسي)"
    ],
    "items": [
      {
        "s": "\\(f(x) = 4x - 7\\)",
        "s_ar": "\\(f(x) = 4x - 7\\)",
        "cat": 0
      },
      {
        "s": "First differences of outputs are constant for equal \\(\\Delta x\\)",
        "s_ar": "الفروق الأولى للمخرجات ثابتة عند قيم متساوية لـ \\(\\Delta x\\)",
        "cat": 0
      },
      {
        "s": "\\(g(x) = 3x^2 + 2x - 1\\)",
        "s_ar": "\\(g(x) = 3x^2 + 2x - 1\\)",
        "cat": 1
      },
      {
        "s": "Second differences of outputs are constant for equal \\(\\Delta x\\)",
        "s_ar": "الفروق الثانية للمخرجات ثابتة عند قيم متساوية لـ \\(\\Delta x\\)",
        "cat": 1
      },
      {
        "s": "\\(h(x) = 5 \\cdot (1.2)^x\\)",
        "s_ar": "\\(h(x) = 5 \\cdot (1.2)^x\\)",
        "cat": 2
      },
      {
        "s": "Ratios of consecutive outputs are constant for equal \\(\\Delta x\\)",
        "s_ar": "نسب المخرجات المتتالية ثابتة عند قيم متساوية لـ \\(\\Delta x\\)",
        "cat": 2
      }
    ]
  },
  {
    "t": "se",
    "ti": "Spot the Error: Implicit Differentiation & Product Rule (AP Precalculus Exam Format & Modeling Framework)",
    "q": "A student differentiates the implicit curve \\(x^2 + 2xy + y^2 = 35\\) with respect to \\(x\\). Identify the step with the mathematical flaw:",
    "steps": [
      "Differentiate \\(x^2\\) with respect to \\(x\\) to obtain \\(2x\\).",
      "Differentiate the middle term \\(2xy\\) with respect to \\(x\\) as \\(2\\dfrac{dy}{dx}\\).",
      "Differentiate \\(y^2\\) using the Chain Rule as \\(2y\\dfrac{dy}{dx}\\) and the constant \\(35\\) as \\(0\\).",
      "Collect \\(\\dfrac{dy}{dx}\\) terms and divide to isolate \\(\\dfrac{dy}{dx}\\)."
    ],
    "errorStep": 2,
    "reasons": [
      "The term \\(2xy\\) is a product of two functions of \\(x\\); by the Product Rule its derivative is \\(2y + 2x\\dfrac{dy}{dx}\\), not \\(2\\dfrac{dy}{dx}\\).",
      "The derivative of \\(y^2\\) with respect to \\(x\\) is simply \\(2y\\) without \\(\\dfrac{dy}{dx}\\).",
      "The constant \\(35\\) remains \\(35\\) after differentiation."
    ],
    "correctReason": 0,
    "h": "Look closely at how the product \\(2xy\\) was differentiated in Step 2.",
    "sol": "Applying the Product Rule to \\(2xy\\) gives \\(2y + 2x\\dfrac{dy}{dx}\\). Thus \\(2x + 2y + (2x + 2y)\\dfrac{dy}{dx} = 0 \\implies \\dfrac{dy}{dx} = -\\dfrac{2x + 2y}{2x + 2y}\\).",
    "ti_ar": "اكتشف الخطأ: الاشتقاق الضمني وقاعدة الضرب (AP Precalculus Exam Format & Modeling Framework)",
    "q_ar": "يقوم طالب باشتقاق العلاقة الضمنية \\(x^2 + 2xy + y^2 = 35\\) بالنسبة إلى \\(x\\). حدد الخطوة الخاطئة:",
    "steps_ar": [
      "اشتقاق \\(x^2\\) بالنسبة إلى \\(x\\) ليعطي \\(2x\\).",
      "اشتقاق الحد الأوسط \\(2xy\\) بالنسبة إلى \\(x\\) على أنه \\(2\\dfrac{dy}{dx}\\).",
      "اشتقاق \\(y^2\\) بقاعدة السلسلة ليعطي \\(2y\\dfrac{dy}{dx}\\) ومشتقة الثابت \\(0\\).",
      "تجميع حدود \\(\\dfrac{dy}{dx}\\) وقسمة الطرفين لعزل المشتقة."
    ],
    "reasons_ar": [
      "الحد \\(2xy\\) حاصل ضرب دالتين في \\(x\\)؛ وبقاعدة الضرب مشتقته هي \\(2y + 2x\\dfrac{dy}{dx}\\).",
      "مشتقة \\(y^2\\) هي \\(2y\\) فقط دون \\(\\dfrac{dy}{dx}\\).",
      "مشتقة الثابت تبقى كما هي."
    ],
    "h_ar": "راجع كيفية اشتقاق حاصل الضرب \\(2xy\\) في الخطوة الثانية.",
    "sol_ar": "بتطبيق قاعدة الضرب على \\(2xy\\) نحصل على \\(2y + 2x\\dfrac{dy}{dx}\\)، ومنه \\(\\dfrac{dy}{dx} = -\\dfrac{2x + 2y}{2x + 2y}\\)."
  },
  {
    "t": "ms",
    "ti": "Examiner Mode: Tangent, Normal & Stationary Points (AP Precalculus Exam Format & Modeling Framework)",
    "q": "Consider the curve \\(y = 2x^3 - 7x^2 + 4\\). (a) Find \\(\\dfrac{dy}{dx}\\) and the gradient of the tangent at \\(x = 2\\). (b) Find the \\(x\\)-coordinates of the stationary points.",
    "parts": [
      {
        "label": "Part (a) — First Derivative & Tangent Gradient",
        "marks": 3,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "Differentiate term by term using the power rule: \\(\\dfrac{dy}{dx} = 6x^2 - 14x\\)."
          },
          {
            "code": "M1",
            "marks": 1,
            "text": "Substitute \\(x = 2\\): \\(m = 6(2)^2 - 14(2)\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "Obtain exact tangent gradient \\(m = 10\\)."
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
            "text": "Set \\(\\dfrac{dy}{dx} = 0 \\implies x(6x - 14) = 0\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "State both stationary \\(x\\)-coordinates: \\(x = 0\\) and \\(x = \\dfrac{14}{6}\\)."
          }
        ]
      }
    ],
    "examinerTip": "Always show the explicit equation \\(\\dfrac{dy}{dx} = 0\\) before solving for stationary points—this earns the M1 method mark even if an arithmetic slip occurs.",
    "ti_ar": "وضع المصحح: المماس والنقاط الحرجة (AP Precalculus Exam Format & Modeling Framework)",
    "q_ar": "لمنحنى الدالة \\(y = 2x^3 - 7x^2 + 4\\): (أ) أوجد \\(\\dfrac{dy}{dx}\\) وميل المماس عند \\(x = 2\\). (ب) أوجد الإحداثيات السينية للنقاط الحرجة.",
    "examinerTip_ar": "اكتب دائماً شرط النقطة الحرجة \\(\\dfrac{dy}{dx} = 0\\) صراحةً لضمان الحصول على درجة الطريقة (M1)."
  },
  {
    "t": "sb",
    "ti": "Step Builder: Instantaneous Rate of Change (AP Precalculus Exam Format & Modeling Framework)",
    "steps": [
      {
        "l": "Given \\(f(x) = 2x^2 + 7x - 5\\), find the coefficient of \\(x\\) in \\(f'(x)\\):",
        "a": "4",
        "h": "Multiply power 2 by 2."
      },
      {
        "l": "Find the constant term in \\(f'(x)\\):",
        "a": "7",
        "h": "The derivative of 7x is 7."
      },
      {
        "l": "Evaluate the instantaneous rate of change \\(f'(2) =\\)",
        "a": "15",
        "h": "Compute 4(2) + 7."
      }
    ],
    "ti_ar": "بناء الخطوات: حساب المشتقة ومعدل التغير اللحظي (AP Precalculus Exam Format & Modeling Framework)",
    "steps_ar": [
      {
        "l": "للدالة \\(f(x) = 2x^2 + 7x - 5\\)، معامل \\(x\\) في \\(f'(x)\\) يساوي:",
        "a": "4",
        "h": "اضرب الأس 2 في 2."
      },
      {
        "l": "الحد الثابت في المشتقة \\(f'(x)\\) يساوي:",
        "a": "7",
        "h": "مشتقة 7x هي 7."
      },
      {
        "l": "احسب قيمة المشتقة \\(f'(2) =\\)",
        "a": "15",
        "h": "احسب 4(2) + 7."
      }
    ]
  },
  {
    "t": "mt",
    "ti": "Matching: Differentiation Rules & Analytic Criteria (AP Precalculus Exam Format & Modeling Framework)",
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
    "ti_ar": "مطابقة: قواعد الاشتقاق ومعايير القيم القصوى (AP Precalculus Exam Format & Modeling Framework)",
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

D["appc-u1"] = [
  {
    "t": "qc",
    "ti": "Quick Check: End Behavior",
    "ti_ar": "فحص سريع: السلوك الطرفي",
    "q": "What is the end behavior of \\(f(x) = -2x^3 + 5x\\)?",
    "q_ar": "ما هو السلوك الطرفي للدالة \\(f(x) = -2x^3 + 5x\\)؟",
    "o": [
      "Up left, down right",
      "Up left, up right",
      "Down left, up right",
      "Down left, down right"
    ],
    "o_ar": [
      "لأعلى يساراً، ولأسفل يميناً",
      "لأعلى يساراً، ولأعلى يميناً",
      "لأسفل يساراً، ولأعلى يميناً",
      "لأسفل يساراً، ولأسفل يميناً"
    ],
    "a": 0,
    "ex": "Odd degree with negative leading coefficient: as x → -∞, f(x) → +∞ (up left); as x → +∞, f(x) → -∞ (down right).",
    "ex_ar": "دالة من درجة فردية بمعامل رئيس سالب: عندما تقترب x من -∞، يقترب f(x) من +∞ (لأعلى يساراً)؛ وعندما تقترب x من +∞، يقترب f(x) من -∞ (لأسفل يميناً)."
  },
  {
    "t": "fn",
    "ti": "Explorer: End Behavior of \\(x^n\\)",
    "ti_ar": "مستكشف: السلوك الطرفي لـ \\(x^n\\)",
    "fns": [
      {
        "expr": "x^n",
        "color": "#1E3A6E",
        "label": "x^n"
      }
    ],
    "xrange": [
      -3,
      3
    ],
    "yrange": [
      -15,
      15
    ],
    "params": [
      {
        "name": "n",
        "label": "Power n",
        "min": 1,
        "max": 5,
        "step": 1,
        "default": 3
      }
    ]
  },
  {
    "t": "num",
    "ti": "Calculation Lab: Average Rate of Change",
    "ti_ar": "مختبر الحساب: متوسط معدل التغير",
    "q": "Find the average rate of change of \\(f(x) = 2x^2 - 3x + 1\\) over the interval \\([1, 4]\\).",
    "q_ar": "أوجد متوسط معدل التغير للدالة \\(f(x) = 2x^2 - 3x + 1\\) على الفترة \\([1, 4]\\).",
    "a": 7,
    "tol": 0.01,
    "h": "Compute [f(4) - f(1)] / (4 - 1).",
    "h_ar": "احسب [f(4) - f(1)] / (4 - 1).",
    "sol": "\\(f(4) = 2(16) - 12 + 1 = 21\\). \\(f(1) = 2(1) - 3 + 1 = 0\\). \\(\\text{AROC} = \\dfrac{21 - 0}{4 - 1} = \\dfrac{21}{3} = 7\\).",
    "sol_ar": "\\(f(4) = 2(16) - 12 + 1 = 21\\). \\(f(1) = 2(1) - 3 + 1 = 0\\). \\(\\text{متوسط معدل التغير} = \\dfrac{21 - 0}{4 - 1} = \\dfrac{21}{3} = 7\\)."
  },
  {
    "t": "ord",
    "ti": "Rational Functions Protocol: Graphing Workflow",
    "ti_ar": "بروتوكول الدوال النسبية: خطوات التمثيل البياني",
    "q": "Arrange the logical steps to analyze and sketch a rational function \\(R(x) = \\dfrac{P(x)}{Q(x)}\\):",
    "q_ar": "رتب الخطوات المنطقية لتحليل ورسم منحنى دالة نسبية \\(R(x) = \\dfrac{P(x)}{Q(x)}\\):",
    "items": [
      "Factor both the numerator and denominator completely.",
      "Identify common factors to locate removable discontinuities (holes).",
      "Set remaining denominator factors to zero to find vertical asymptotes.",
      "Compare degrees of numerator and denominator to determine horizontal or slant asymptotes.",
      "Find intercepts and test signs on each interval to sketch the curve."
    ],
    "items_ar": [
      "تحليل كل من البسط والمقام إلى عواملهما الأولية تماماً.",
      "تحديد العوامل المشتركة لتحديد مواقع نقاط الانفصال القابلة للإزالة (الفجوات).",
      "مساواة عوامل المقام المتبقية بالصفر لإيجاد خطوط التقارب الرأسية.",
      "مقارنة درجات البسط والمقام لتحديد خطوط التقارب الأفقية أو المائلة.",
      "إيجاد نقاط التقاطع مع المحاور واختبار الإشارات على كل فترة لرسم المنحنى."
    ]
  },
  {
    "t": "cat",
    "ti": "Classify Discontinuities of Rational Functions",
    "ti_ar": "تصنيف نقاط عدم الاتصال للدوال النسبية",
    "categories": [
      "Removable Discontinuity (Hole)",
      "Vertical Asymptote"
    ],
    "categories_ar": [
      "انفصال قابل للإزالة (فجوة)",
      "خط تقارب رأسي"
    ],
    "items": [
      {
        "s": "Factor \\((x - 3)\\) cancels completely from both numerator and denominator",
        "s_ar": "العامل \\((x - 3)\\) يُختصر تماماً من البسط والمقام",
        "cat": 0
      },
      {
        "s": "Factor \\((x + 1)\\) remains in the denominator after full simplification",
        "s_ar": "العامل \\((x + 1)\\) يتبقى في المقام بعد التبسيط الكامل",
        "cat": 1
      },
      {
        "s": "\\(f(x) = \\dfrac{x^2 - 4}{x - 2}\\) at \\(x = 2\\)",
        "s_ar": "\\(f(x) = \\dfrac{x^2 - 4}{x - 2}\\) عند \\(x = 2\\)",
        "cat": 0
      },
      {
        "s": "\\(f(x) = \\dfrac{x + 5}{x - 4}\\) at \\(x = 4\\)",
        "s_ar": "\\(f(x) = \\dfrac{x + 5}{x - 4}\\) عند \\(x = 4\\)",
        "cat": 1
      },
      {
        "s": "Limit \\(\\lim_{x \\to c} f(x)\\) exists as a finite real value",
        "s_ar": "النهاية \\(\\lim_{x \\to c} f(x)\\) موجودة وتساوي قيمة حقيقية منتهية",
        "cat": 0
      },
      {
        "s": "One-sided limits approach \\(\\pm\\infty\\) as \\(x \\to c\\)",
        "s_ar": "النهايات من جانب واحد تقترب من \\(\\pm\\infty\\) عندما تقترب \\(x\\) من \\(c\\)",
        "cat": 1
      }
    ]
  },
  {
    "t": "sr",
    "ti": "Worked Example: Holes vs. Vertical Asymptotes",
    "ti_ar": "مثال محلول: الفجوات مقابل خطوط التقارب الرأسية",
    "steps": [
      "Find the vertical asymptotes and holes of \\(f(x)=\\dfrac{(x-2)(x+3)}{(x-2)(x-1)}\\). The factor \\((x-2)\\) is common to numerator and denominator, so it cancels — this creates a hole at \\(x=2\\), not an asymptote.",
      "After cancelling, \\(f(x)=\\dfrac{x+3}{x-1}\\) for \\(x\\neq2\\).",
      "The remaining denominator zero, \\(x=1\\), doesn't cancel — it's a vertical asymptote."
    ],
    "steps_ar": [
      "أوجد خطوط التقارب الرأسية والفجوات للدالة \\(f(x)=\\dfrac{(x-2)(x+3)}{(x-2)(x-1)}\\). العامل \\((x-2)\\) مشترك بين البسط والمقام، لذا يُختصر — هذا ينشئ فجوة عند \\(x=2\\)، وليس خط تقارب.",
      "بعد الاختصار، تصبح \\(f(x)=\\dfrac{x+3}{x-1}\\) لكل \\(x\\neq2\\).",
      "صفر المقام المتبقي، \\(x=1\\)، لا يُختصر — وهو يمثل خط تقارب رأسي."
    ]
  },
  {
    "t": "se",
    "ti": "Spot the Error: Algebraic & Domain Verification (Unit 1 · Polynomial and Rational Functions)",
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
    "ti_ar": "اكتشف الخطأ: الجذور الدخيلة والتحقق من المجال (Unit 1 · Polynomial and Rational Functions)",
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
    "ti": "Examiner Mode: Multi-Step Structured Problem (Unit 1 · Polynomial and Rational Functions)",
    "q": "Let \\(f(x) = x^2 - 8x + 21\\) for \\(x \\ge 4\\). (a) Express \\(f(x)\\) in completed-square vertex form and state the range of \\(f\\). (b) Find an expression for the inverse function \\(f^{-1}(x)\\) and state its domain.",
    "parts": [
      {
        "label": "Part (a) — Vertex Form & Range",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "Complete the square: \\(f(x) = (x - 4)^2 - 16 + 21 = (x - 4)^2 + 5\\)."
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
            "text": "Set \\(y = (x - 4)^2 + 5 \\implies (x - 4)^2 = y - 5\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "Select positive branch (since \\(x \\ge 4\\)): \\(f^{-1}(x) = 4 + \\sqrt{x - 5}\\)."
          },
          {
            "code": "B1",
            "marks": 1,
            "text": "State domain of \\(f^{-1}\\): \\(x \\ge 5\\) (matching the range of \\(f\\))."
          }
        ]
      }
    ],
    "examinerTip": "Writing \\(\\pm\\sqrt{x - 5}\\) for \\(f^{-1}(x)\\) loses the final A1 mark because a function must be single-valued; use the domain restriction \\(x \\ge 4\\) to choose the \\(+\\) sign.",
    "ti_ar": "وضع المصحح: إكمال المربع والدالة العكسية (Unit 1 · Polynomial and Rational Functions)",
    "q_ar": "لتكن \\(f(x) = x^2 - 8x + 21\\) حيث \\(x \\ge 4\\). (أ) اكتب \\(f(x)\\) في صورة المربع الكامل وحدد مداها. (ب) أوجد قاعدة الدالة العكسية \\(f^{-1}(x)\\) ومجالها.",
    "examinerTip_ar": "الدالة العكسية يجب أن تكون وحيدة القيمة، لذا نختار الإشارة الموجبة للجذر \\(4 + \\sqrt{x - 5}\\) لأن \\(x \\ge 4\\)."
  },
  {
    "t": "sb",
    "ti": "Step Builder: Completing the Square & Vertex Analysis (Unit 1 · Polynomial and Rational Functions)",
    "steps": [
      {
        "l": "In \\(y = x^2 - 8x + 21\\), halve the \\(x\\)-coefficient to write \\((x - h)^2\\) where \\(h =\\)",
        "a": "4",
        "h": "Take half of 8."
      },
      {
        "l": "Compute the minimum value \\(k = 21 - 4^2 =\\)",
        "a": "5",
        "h": "Subtract 16 from 21."
      },
      {
        "l": "Evaluate \\(y\\) when \\(x = 6\\): \\(y =\\)",
        "a": "9",
        "h": "Compute \\((2)^2 + 5\\)."
      }
    ],
    "ti_ar": "بناء الخطوات: إكمال المربع وإيجاد القيمة الصغرى (Unit 1 · Polynomial and Rational Functions)",
    "steps_ar": [
      {
        "l": "في الدالة \\(y = x^2 - 8x + 21\\): قيمة \\(h\\) في \\((x - h)^2\\) تساوي:",
        "a": "4",
        "h": "اقسم معامل x وهو 8 على 2."
      },
      {
        "l": "احسب القيمة الصغرى \\(k = 21 - 4^2 =\\)",
        "a": "5",
        "h": "اطرح 16 من 21."
      },
      {
        "l": "احسب قيمة \\(y\\) عندما \\(x = 6\\):",
        "a": "9",
        "h": "احسب \\(4 + 5\\)."
      }
    ]
  },
  {
    "t": "mt",
    "ti": "Matching: Core Algebraic & Analytic Principles (Unit 1 · Polynomial and Rational Functions)",
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
    "ti_ar": "مطابقة: المبادئ الجبرية والتحليلية الأساسية (Unit 1 · Polynomial and Rational Functions)",
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

D["appc-u2"] = [
  {
    "t": "qc",
    "ti": "Quick Check: Exponential Base and Growth Factor",
    "ti_ar": "فحص سريع: الأساس الأسي وعامل النمو",
    "q": "If \\(f(x) = 500(1.08)^x\\), what is the continuous percentage growth rate per unit of \\(x\\)?",
    "q_ar": "إذا كانت \\(f(x) = 500(1.08)^x\\)، فما هي النسبة المئوية لمعدل النمو المستمر لكل وحدة زيادة في \\(x\\)؟",
    "o": [
      "8%",
      "108%",
      "0.08%",
      "1.08%"
    ],
    "o_ar": [
      "8%",
      "108%",
      "0.08%",
      "1.08%"
    ],
    "a": 0,
    "ex": "The base \\(b = 1.08 = 1 + 0.08\\), representing an 8% increase per unit increase in \\(x\\).",
    "ex_ar": "الأساس \\(b = 1.08 = 1 + 0.08\\)، وهو يمثل زيادة بنسبة 8% لكل زيادة مقدارها وحدة واحدة في \\(x\\)."
  },
  {
    "t": "fn",
    "ti": "Explorer: Shifted Log \\(\\ln(x-h)\\)",
    "ti_ar": "مستكشف: اللوغاريتم المزاح \\(\\ln(x-h)\\)",
    "fns": [
      {
        "expr": "ln(x-h)",
        "color": "#1E3A6E",
        "label": "ln(x-h)"
      }
    ],
    "xrange": [
      -2,
      8
    ],
    "yrange": [
      -3,
      3
    ],
    "params": [
      {
        "name": "h",
        "label": "Shift h",
        "min": -2,
        "max": 2,
        "step": 1,
        "default": 0
      }
    ]
  },
  {
    "t": "num",
    "ti": "Calculation Lab: Solve Logarithmic Equation",
    "ti_ar": "مختبر الحساب: حل معادلة لوغاريتمية",
    "q": "Solve for \\(x\\): \\(\\log_3(2x + 1) = 4\\).",
    "q_ar": "حل المعادلة بالنسبة إلى \\(x\\): \\(\\log_3(2x + 1) = 4\\).",
    "a": 40,
    "tol": 0.01,
    "h": "Rewrite in exponential form: 2x + 1 = 3^4 = 81.",
    "h_ar": "أعد كتابة المعادلة بالصيغة الأسية: 2x + 1 = 3^4 = 81.",
    "sol": "\\(2x + 1 = 81 \\implies 2x = 80 \\implies x = 40\\).",
    "sol_ar": "\\(2x + 1 = 81 \\implies 2x = 80 \\implies x = 40\\)."
  },
  {
    "t": "ord",
    "ti": "Algebra Protocol: Solving Exponential Equations via Natural Logs",
    "ti_ar": "بروتوكول الجبر: حل المعادلات الأسية باللوغاريتم الطبيعي",
    "q": "Arrange the steps for solving \\(4 \\cdot 3^{2x} = 36\\):",
    "q_ar": "رتب خطوات حل المعادلة \\(4 \\cdot 3^{2x} = 36\\):",
    "items": [
      "Divide both sides by 4 to isolate the exponential expression: \\(3^{2x} = 9\\).",
      "Take the natural logarithm of both sides: \\(\\ln(3^{2x}) = \\ln(9)\\).",
      "Apply the logarithm power rule to bring down the exponent: \\(2x \\ln(3) = \\ln(9)\\).",
      "Divide both sides by \\(2\\ln(3)\\): \\(x = \\dfrac{\\ln(9)}{2\\ln(3)}\\).",
      "Recognize that \\(\\ln(9) = \\ln(3^2) = 2\\ln(3)\\) to simplify to the exact integer solution \\(x = 1\\)."
    ],
    "items_ar": [
      "قسمة الطرفين على 4 لعزل المقدار الأسي: \\(3^{2x} = 9\\).",
      "أخذ اللوغاريتم الطبيعي للطرفين: \\(\\ln(3^{2x}) = \\ln(9)\\).",
      "تطبيق قاعدة قوة اللوغاريتم لإنزال الأس: \\(2x \\ln(3) = \\ln(9)\\).",
      "قسمة الطرفين على \\(2\\ln(3)\\): \\(x = \\dfrac{\\ln(9)}{2\\ln(3)}\\).",
      "ملاحظة أن \\(\\ln(9) = \\ln(3^2) = 2\\ln(3)\\) للتبسيط والوصول إلى الحل الصحيح التام \\(x = 1\\)."
    ]
  },
  {
    "t": "cat",
    "ti": "Categorize: Exponential vs Logarithmic Behaviors",
    "ti_ar": "تصنيف: سلوك الدوال الأسية مقابل الدوال اللوغاريتمية",
    "categories": [
      "Exponential Function f(x) = b^x (b > 1)",
      "Logarithmic Function g(x) = log_b(x) (b > 1)"
    ],
    "categories_ar": [
      "الدالة الأسية f(x) = b^x (حيث b > 1)",
      "الدالة اللوغاريتمية g(x) = log_b(x) (حيث b > 1)"
    ],
    "items": [
      {
        "s": "Domain is all real numbers \\((-\\infty, \\infty)\\)",
        "s_ar": "المجال هو جميع الأعداد الحقيقية \\((-\\infty, \\infty)\\)",
        "cat": 0
      },
      {
        "s": "Has horizontal asymptote \\(y = 0\\)",
        "s_ar": "لها خط تقارب أفقي \\(y = 0\\)",
        "cat": 0
      },
      {
        "s": "Passes through point \\((0, 1)\\)",
        "s_ar": "تمر بالنقطة \\((0, 1)\\)",
        "cat": 0
      },
      {
        "s": "Domain is strictly positive reals \\((0, \\infty)\\)",
        "s_ar": "المجال هو الأعداد الحقيقية الموجبة تماماً \\((0, \\infty)\\)",
        "cat": 1
      },
      {
        "s": "Has vertical asymptote \\(x = 0\\)",
        "s_ar": "لها خط تقارب رأسي \\(x = 0\\)",
        "cat": 1
      },
      {
        "s": "Passes through point \\((1, 0)\\)",
        "s_ar": "تمر بالنقطة \\((1, 0)\\)",
        "cat": 1
      }
    ]
  },
  {
    "t": "sr",
    "ti": "Worked Example: Half-Life Model",
    "ti_ar": "مثال محلول: نموذج عمر النصف",
    "steps": [
      "A substance decays as \\(A(t)=A_0e^{-0.1t}\\). Find the time to reach half its original amount: set \\(A(t)=\\dfrac{A_0}{2}\\), so \\(A_0e^{-0.1t}=\\dfrac{A_0}{2}\\).",
      "Divide by \\(A_0\\) and take the natural log: \\(-0.1t=\\ln\\left(\\dfrac12\\right)\\).",
      "Solve: \\(t=\\dfrac{\\ln(1/2)}{-0.1}=\\dfrac{-0.693}{-0.1}\\approx6.93\\)."
    ],
    "steps_ar": [
      "تتحلل مادة وفقاً لـ \\(A(t)=A_0e^{-0.1t}\\). أوجد الزمن اللازم للوصول إلى نصف كميتها الأصلية: نضع \\(A(t)=\\dfrac{A_0}{2}\\)، إذن \\(A_0e^{-0.1t}=\\dfrac{A_0}{2}\\).",
      "نقسم على \\(A_0\\) ونأخذ اللوغاريتم الطبيعي: \\(-0.1t=\\ln\\left(\\dfrac12\\right)\\).",
      "نحل المعادلة: \\(t=\\dfrac{\\ln(1/2)}{-0.1}=\\dfrac{-0.693}{-0.1}\\approx6.93\\)."
    ]
  },
  {
    "t": "se",
    "ti": "Spot the Error: Algebraic & Domain Verification (Unit 2 · Exponential and Logarithmic Functions)",
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
    "ti_ar": "اكتشف الخطأ: الجذور الدخيلة والتحقق من المجال (Unit 2 · Exponential and Logarithmic Functions)",
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
    "ti": "Examiner Mode: Multi-Step Structured Problem (Unit 2 · Exponential and Logarithmic Functions)",
    "q": "Let \\(f(x) = x^2 - 6x + 10\\) for \\(x \\ge 3\\). (a) Express \\(f(x)\\) in completed-square vertex form and state the range of \\(f\\). (b) Find an expression for the inverse function \\(f^{-1}(x)\\) and state its domain.",
    "parts": [
      {
        "label": "Part (a) — Vertex Form & Range",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "Complete the square: \\(f(x) = (x - 3)^2 - 9 + 10 = (x - 3)^2 + 1\\)."
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
            "text": "Set \\(y = (x - 3)^2 + 1 \\implies (x - 3)^2 = y - 1\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "Select positive branch (since \\(x \\ge 3\\)): \\(f^{-1}(x) = 3 + \\sqrt{x - 1}\\)."
          },
          {
            "code": "B1",
            "marks": 1,
            "text": "State domain of \\(f^{-1}\\): \\(x \\ge 1\\) (matching the range of \\(f\\))."
          }
        ]
      }
    ],
    "examinerTip": "Writing \\(\\pm\\sqrt{x - 1}\\) for \\(f^{-1}(x)\\) loses the final A1 mark because a function must be single-valued; use the domain restriction \\(x \\ge 3\\) to choose the \\(+\\) sign.",
    "ti_ar": "وضع المصحح: إكمال المربع والدالة العكسية (Unit 2 · Exponential and Logarithmic Functions)",
    "q_ar": "لتكن \\(f(x) = x^2 - 6x + 10\\) حيث \\(x \\ge 3\\). (أ) اكتب \\(f(x)\\) في صورة المربع الكامل وحدد مداها. (ب) أوجد قاعدة الدالة العكسية \\(f^{-1}(x)\\) ومجالها.",
    "examinerTip_ar": "الدالة العكسية يجب أن تكون وحيدة القيمة، لذا نختار الإشارة الموجبة للجذر \\(3 + \\sqrt{x - 1}\\) لأن \\(x \\ge 3\\)."
  },
  {
    "t": "sb",
    "ti": "Step Builder: Completing the Square & Vertex Analysis (Unit 2 · Exponential and Logarithmic Functions)",
    "steps": [
      {
        "l": "In \\(y = x^2 - 6x + 10\\), halve the \\(x\\)-coefficient to write \\((x - h)^2\\) where \\(h =\\)",
        "a": "3",
        "h": "Take half of 6."
      },
      {
        "l": "Compute the minimum value \\(k = 10 - 3^2 =\\)",
        "a": "1",
        "h": "Subtract 9 from 10."
      },
      {
        "l": "Evaluate \\(y\\) when \\(x = 5\\): \\(y =\\)",
        "a": "5",
        "h": "Compute \\((2)^2 + 1\\)."
      }
    ],
    "ti_ar": "بناء الخطوات: إكمال المربع وإيجاد القيمة الصغرى (Unit 2 · Exponential and Logarithmic Functions)",
    "steps_ar": [
      {
        "l": "في الدالة \\(y = x^2 - 6x + 10\\): قيمة \\(h\\) في \\((x - h)^2\\) تساوي:",
        "a": "3",
        "h": "اقسم معامل x وهو 6 على 2."
      },
      {
        "l": "احسب القيمة الصغرى \\(k = 10 - 3^2 =\\)",
        "a": "1",
        "h": "اطرح 9 من 10."
      },
      {
        "l": "احسب قيمة \\(y\\) عندما \\(x = 5\\):",
        "a": "5",
        "h": "احسب \\(4 + 1\\)."
      }
    ]
  },
  {
    "t": "mt",
    "ti": "Matching: Core Algebraic & Analytic Principles (Unit 2 · Exponential and Logarithmic Functions)",
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
    "ti_ar": "مطابقة: المبادئ الجبرية والتحليلية الأساسية (Unit 2 · Exponential and Logarithmic Functions)",
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

D["appc-u3"] = [
  {
    "t": "tf",
    "ti": "Reasoning Lab: Polar Coordinates",
    "ti_ar": "مختبر التفكير: الإحداثيات القطبية",
    "items": [
      {
        "s": "\\(x = r\\cos\\theta,\\ y = r\\sin\\theta\\)",
        "s_ar": "\\(x = r\\cos\\theta,\\ y = r\\sin\\theta\\)",
        "a": true,
        "ex": "Polar-to-Cartesian conversion.",
        "ex_ar": "التحويل من الإحداثيات القطبية إلى الديكارتية."
      },
      {
        "s": "\\(r^2 = x^2 + y^2\\)",
        "s_ar": "\\(r^2 = x^2 + y^2\\)",
        "a": true,
        "ex": "Pythagorean relation.",
        "ex_ar": "العلاقة الفيثاغورية في الإحداثيات القطبية."
      },
      {
        "s": "\\(r = a\\) is a straight line.",
        "s_ar": "\\(r = a\\) تمثل خطاً مستقيماً.",
        "a": false,
        "ex": "r = a is a circle centered at the origin of radius a.",
        "ex_ar": "r = a تمثل دائرة مركزها نقطة الأصل ونصف قطرها a."
      },
      {
        "s": "\\(\\tan\\theta = y / x\\)",
        "s_ar": "\\(\\tan\\theta = y / x\\)",
        "a": true,
        "ex": "Standard polar angle relation.",
        "ex_ar": "العلاقة القياسية لزاوية الإحداثي القطبي."
      }
    ]
  },
  {
    "t": "fn",
    "ti": "Explorer: Vertical Stretch \\(A\\cdot\\tan(x)\\)",
    "ti_ar": "مستكشف: التمدد الرأسي \\(A\\cdot\\tan(x)\\)",
    "fns": [
      {
        "expr": "A*tan(x)",
        "color": "#1E3A6E",
        "label": "A·tan(x)"
      }
    ],
    "xrange": [
      -3,
      3
    ],
    "yrange": [
      -5,
      5
    ],
    "params": [
      {
        "name": "A",
        "label": "Stretch A",
        "min": 0.5,
        "max": 2,
        "step": 0.5,
        "default": 1
      }
    ]
  },
  {
    "t": "num",
    "ti": "Calculation Lab: Period of Sinusoidal Function",
    "ti_ar": "مختبر الحساب: دورة الدالة الجيبية",
    "q": "Determine the period of the sinusoidal function \\(f(t) = 5\\cos(4\\pi t - \\pi) + 7\\). (Enter as a decimal)",
    "q_ar": "حدد دورة (زمن الدورة) الدالة الجيبية \\(f(t) = 5\\cos(4\\pi t - \\pi) + 7\\). (أدخل الإجابة في صورة عدد عشري)",
    "a": 0.5,
    "tol": 0.01,
    "h": "Period = 2π / B where B = 4π.",
    "h_ar": "الدورة = 2π / B حيث B = 4π.",
    "sol": "\\(\\text{Period} = \\dfrac{2\\pi}{4\\pi} = \\dfrac{1}{2} = 0.5\\).",
    "sol_ar": "\\(\\text{الدورة} = \\dfrac{2\\pi}{4\\pi} = \\dfrac{1}{2} = 0.5\\)."
  },
  {
    "t": "ord",
    "ti": "Trigonometry Protocol: Solving Trigonometric Equations",
    "ti_ar": "بروتوكول حساب المثلثات: حل المعادلات المثلثية",
    "q": "Arrange the steps to solve \\(2\\sin^2(\\theta) - \\sin(\\theta) - 1 = 0\\) for \\(\\theta \\in [0, 2\\pi)\\):",
    "q_ar": "رتب خطوات حل المعادلة \\(2\\sin^2(\\theta) - \\sin(\\theta) - 1 = 0\\) حيث \\(\\theta \\in [0, 2\\pi)\\):",
    "items": [
      "Treat as a quadratic in sin(θ) and factor into (2 sin(θ) + 1)(sin(θ) - 1) = 0.",
      "Set each factor to zero to obtain sin(θ) = -1/2 and sin(θ) = 1.",
      "Find reference angle π/6 for sin(θ) = -1/2 and quadrant angles.",
      "Determine the third and fourth quadrant solutions for sin(θ) = -1/2: 7π/6 and 11π/6.",
      "Combine with the solution for sin(θ) = 1 (θ = π/2) to form the complete solution set."
    ],
    "items_ar": [
      "التعامل مع المعادلة كمعادلة تربيعية في sin(θ) وتحليلها إلى (2 sin(θ) + 1)(sin(θ) - 1) = 0.",
      "مساواة كل عامل بالصفر للحصول على sin(θ) = -1/2 و sin(θ) = 1.",
      "إيجاد زاوية الإسناد π/6 لـ sin(θ) = -1/2 وزوايا الأرباع.",
      "تحديد حلول الربعين الثالث والرابع لـ sin(θ) = -1/2: وهما 7π/6 و 11π/6.",
      "دمجها مع حل sin(θ) = 1 (حيث θ = π/2) لتكوين مجموعة الحل الكاملة."
    ]
  },
  {
    "t": "cat",
    "ti": "Classify Polar and Cartesian Equations",
    "ti_ar": "تصنيف المعادلات القطبية والديكارتية",
    "categories": [
      "Represents a Circle",
      "Represents a Straight Line"
    ],
    "categories_ar": [
      "تمثل دائرة",
      "تمثل خطاً مستقيماً"
    ],
    "items": [
      {
        "s": "Polar equation \\(r = 5\\)",
        "s_ar": "المعادلة القطبية \\(r = 5\\)",
        "cat": 0
      },
      {
        "s": "Polar equation \\(\\theta = \\frac{\\pi}{4}\\)",
        "s_ar": "المعادلة القطبية \\(\\theta = \\frac{\\pi}{4}\\)",
        "cat": 1
      },
      {
        "s": "Cartesian equation \\(x^2 + y^2 = 16\\)",
        "s_ar": "المعادلة الديكارتية \\(x^2 + y^2 = 16\\)",
        "cat": 0
      },
      {
        "s": "Cartesian equation \\(y = 3x - 2\\)",
        "s_ar": "المعادلة الديكارتية \\(y = 3x - 2\\)",
        "cat": 1
      },
      {
        "s": "Polar equation \\(r = 6\\cos\\theta\\)",
        "s_ar": "المعادلة القطبية \\(r = 6\\cos\\theta\\)",
        "cat": 0
      },
      {
        "s": "Polar equation \\(r\\cos\\theta = 4\\)",
        "s_ar": "المعادلة القطبية \\(r\\cos\\theta = 4\\)",
        "cat": 1
      }
    ]
  },
  {
    "t": "sr",
    "ti": "Worked Example: Evaluate a Tangent Value",
    "ti_ar": "مثال محلول: حساب قيمة الظل",
    "steps": [
      "Evaluate \\(\\tan\\left(\\dfrac{5\\pi}{4}\\right)\\). This angle is in the third quadrant (\\(\\pi\\) to \\(\\frac{3\\pi}{2}\\)), where tangent is positive.",
      "The reference angle is \\(\\dfrac{5\\pi}{4}-\\pi=\\dfrac{\\pi}{4}\\).",
      "\\(\\tan\\left(\\dfrac{\\pi}{4}\\right)=1\\), so \\(\\tan\\left(\\dfrac{5\\pi}{4}\\right)=1\\)."
    ],
    "steps_ar": [
      "احسب \\(\\tan\\left(\\dfrac{5\\pi}{4}\\right)\\). تقع هذه الزاوية في الربع الثالث (من \\(\\pi\\) إلى \\(\\frac{3\\pi}{2}\\))، حيث تكون دالة الظل موجبة.",
      "زاوية الإسناد المرجعية هي \\(\\dfrac{5\\pi}{4}-\\pi=\\dfrac{\\pi}{4}\\).",
      "بما أن \\(\\tan\\left(\\dfrac{\\pi}{4}\\right)=1\\)، فإن \\(\\tan\\left(\\dfrac{5\\pi}{4}\\right)=1\\)."
    ]
  },
  {
    "t": "se",
    "ti": "Spot the Error: Algebraic & Domain Verification (Unit 3 · Trigonometric and Polar Functions)",
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
    "ti_ar": "اكتشف الخطأ: الجذور الدخيلة والتحقق من المجال (Unit 3 · Trigonometric and Polar Functions)",
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
    "ti": "Examiner Mode: Multi-Step Structured Problem (Unit 3 · Trigonometric and Polar Functions)",
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
    "ti_ar": "وضع المصحح: إكمال المربع والدالة العكسية (Unit 3 · Trigonometric and Polar Functions)",
    "q_ar": "لتكن \\(f(x) = x^2 - 10x + 28\\) حيث \\(x \\ge 5\\). (أ) اكتب \\(f(x)\\) في صورة المربع الكامل وحدد مداها. (ب) أوجد قاعدة الدالة العكسية \\(f^{-1}(x)\\) ومجالها.",
    "examinerTip_ar": "الدالة العكسية يجب أن تكون وحيدة القيمة، لذا نختار الإشارة الموجبة للجذر \\(5 + \\sqrt{x - 3}\\) لأن \\(x \\ge 5\\)."
  },
  {
    "t": "sb",
    "ti": "Step Builder: Completing the Square & Vertex Analysis (Unit 3 · Trigonometric and Polar Functions)",
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
    "ti_ar": "بناء الخطوات: إكمال المربع وإيجاد القيمة الصغرى (Unit 3 · Trigonometric and Polar Functions)",
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
    "ti": "Matching: Core Algebraic & Analytic Principles (Unit 3 · Trigonometric and Polar Functions)",
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
    "ti_ar": "مطابقة: المبادئ الجبرية والتحليلية الأساسية (Unit 3 · Trigonometric and Polar Functions)",
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

D["appc-u4"] = [
  {
    "t": "qc",
    "ti": "Quick Check: Matrix Invertibility",
    "ti_ar": "فحص سريع: قابلية عكس المصفوفة",
    "q": "For what value of \\(k\\) is the matrix \\(\\begin{pmatrix} 2 & k \\\\ 4 & 6 \\end{pmatrix}\\) non-invertible (singular)?",
    "q_ar": "ما قيمة \\(k\\) التي تجعل المصفوفة \\(\\begin{pmatrix} 2 & k \\\\ 4 & 6 \\end{pmatrix}\\) غير قابلة للعكس (منفردة)؟",
    "o": [
      "3",
      "2",
      "6",
      "12"
    ],
    "o_ar": [
      "3",
      "2",
      "6",
      "12"
    ],
    "a": 0,
    "ex": "\\(\\det = 2(6) - 4k = 12 - 4k = 0 \\implies 4k = 12 \\implies k = 3\\).",
    "ex_ar": "\\(\\det = 2(6) - 4k = 12 - 4k = 0 \\implies 4k = 12 \\implies k = 3\\)."
  },
  {
    "t": "fn",
    "ti": "Explorer: Parameters \\(a\\cdot\\sin(x)+c\\)",
    "ti_ar": "مستكشف: المعلمات \\(a\\cdot\\sin(x)+c\\)",
    "fns": [
      {
        "expr": "a*sin(x)+c",
        "color": "#1E3A6E",
        "label": "a·sin(x)+c"
      }
    ],
    "xrange": [
      -6.3,
      6.3
    ],
    "yrange": [
      -4,
      4
    ],
    "params": [
      {
        "name": "a",
        "label": "Amplitude a",
        "min": 0.5,
        "max": 2,
        "step": 0.5,
        "default": 1
      },
      {
        "name": "c",
        "label": "Vertical shift c",
        "min": -2,
        "max": 2,
        "step": 0.5,
        "default": 0
      }
    ]
  },
  {
    "t": "num",
    "ti": "Calculation Lab: Function Composition",
    "ti_ar": "مختبر الحساب: تركيب الدوال",
    "q": "If \\(f(x) = 3x - 2\\) and \\(g(x) = x^2 + 4\\), evaluate \\((g \\circ f)(3)\\).",
    "q_ar": "إذا كانت \\(f(x) = 3x - 2\\) و\\(g(x) = x^2 + 4\\)، فاحسب \\((g \\circ f)(3)\\).",
    "a": 53,
    "tol": 0.01,
    "h": "Find f(3) = 3(3) - 2 = 7, then evaluate g(7).",
    "h_ar": "أوجد أولاً f(3) = 3(3) - 2 = 7، ثم احسب g(7).",
    "sol": "\\(f(3) = 3(3) - 2 = 7\\). \\(g(7) = 7^2 + 4 = 49 + 4 = 53\\).",
    "sol_ar": "\\(f(3) = 3(3) - 2 = 7\\). \\(g(7) = 7^2 + 4 = 49 + 4 = 53\\)."
  },
  {
    "t": "ord",
    "ti": "Parametric Protocol: Eliminating a Parameter",
    "ti_ar": "بروتوكول المعادلات الوسيطية: حذف الوسيط (البارامتر)",
    "q": "Arrange the steps to eliminate the parameter \\(t\\) from \\(x(t) = 2\\cos(t)\\), \\(y(t) = 3\\sin(t)\\):",
    "q_ar": "رتب خطوات حذف الوسيط \\(t\\) من المعادلتين \\(x(t) = 2\\cos(t)\\) و\\(y(t) = 3\\sin(t)\\):",
    "items": [
      "Isolate the trigonometric terms: cos(t) = x/2 and sin(t) = y/3.",
      "Apply the Pythagorean identity cos²(t) + sin²(t) = 1.",
      "Substitute the expressions into the identity: (x/2)² + (y/3)² = 1.",
      "Simplify to obtain the standard ellipse equation x²/4 + y²/9 = 1."
    ],
    "items_ar": [
      "عزل الحدود المثلثية: cos(t) = x/2 و sin(t) = y/3.",
      "تطبيق المتطابقة الفيثاغورية: cos²(t) + sin²(t) = 1.",
      "تعويض المقدارين في المتطابقة: (x/2)² + (y/3)² = 1.",
      "التبسيط للوصول إلى معادلة القطع الناقص القياسية x²/4 + y²/9 = 1."
    ]
  },
  {
    "t": "cat",
    "ti": "Classify Mathematical Representations",
    "ti_ar": "تصنيف التمثيلات الرياضية",
    "categories": [
      "Parametric Representation",
      "Vector / Matrix Representation"
    ],
    "categories_ar": [
      "تمثيل وسيطي (بارامتري)",
      "تمثيل متجهات / مصفوفات"
    ],
    "items": [
      {
        "s": "Coordinate pair functions \\(x(t) = 3\\cos(t), y(t) = 3\\sin(t)\\)",
        "s_ar": "دوال الأزواج المرتبة للإحداثيات \\(x(t) = 3\\cos(t), y(t) = 3\\sin(t)\\)",
        "cat": 0
      },
      {
        "s": "Matrix transformation \\(\\begin{pmatrix} x' \\\\ y' \\end{pmatrix} = \\begin{pmatrix} 0 & -1 \\\\ 1 & 0 \\end{pmatrix}\\begin{pmatrix} x \\\\ y \\end{pmatrix}\\)",
        "s_ar": "تحويل المصفوفات \\(\\begin{pmatrix} x' \\\\ y' \\end{pmatrix} = \\begin{pmatrix} 0 & -1 \\\\ 1 & 0 \\end{pmatrix}\\begin{pmatrix} x \\\\ y \\end{pmatrix}\\)",
        "cat": 1
      },
      {
        "s": "Projectile motion path \\(x(t) = v_0 \\cos(\\theta) t, y(t) = v_0 \\sin(\\theta) t - \\frac{1}{2}gt^2\\)",
        "s_ar": "مسار حركة مقذوف \\(x(t) = v_0 \\cos(\\theta) t, y(t) = v_0 \\sin(\\theta) t - \\frac{1}{2}gt^2\\)",
        "cat": 0
      },
      {
        "s": "Vector dot product \\(\\mathbf{u} \\cdot \\mathbf{v} = u_1 v_1 + u_2 v_2\\)",
        "s_ar": "الضرب القياسي للمتجهات \\(\\mathbf{u} \\cdot \\mathbf{v} = u_1 v_1 + u_2 v_2\\)",
        "cat": 1
      },
      {
        "s": "Eliminating time \\(t\\) to find Cartesian path equation",
        "s_ar": "حذف الزمن \\(t\\) لإيجاد معادلة المسار الديكارتية",
        "cat": 0
      },
      {
        "s": "Determinant test \\(ad - bc \\neq 0\\) for invertibility",
        "s_ar": "اختبار المحدد \\(ad - bc \\neq 0\\) لقابلية العكس",
        "cat": 1
      }
    ]
  },
  {
    "t": "sr",
    "ti": "Worked Example: Effect of a Parameter",
    "ti_ar": "مثال محلول: تأثير المعلمة",
    "steps": [
      "How does changing \\(k\\) in \\(f(x)=a(x-h)^2+k\\) affect the graph? The parameter \\(k\\) is the constant added last, outside any transformation of \\(x\\).",
      "Adding a constant \\(k\\) to a function shifts the entire graph vertically.",
      "If \\(k>0\\) the graph shifts up by \\(k\\) units; if \\(k<0\\) it shifts down by \\(|k|\\) units."
    ],
    "steps_ar": [
      "كيف يؤثر تغيير \\(k\\) في \\(f(x)=a(x-h)^2+k\\) على التمثيل البياني؟ المعلمة \\(k\\) هي الثابت المضاف أخيراً، خارج أي تحويل لـ \\(x\\).",
      "إضافة ثابت \\(k\\) إلى الدالة يُزيح التمثيل البياني بأكمله رأسياً.",
      "إذا كانت \\(k>0\\) يزاح المنحنى لأعلى بمقدار \\(k\\) وحدة؛ وإذا كانت \\(k<0\\) يزاح لأسفل بمقدار \\(|k|\\) وحدة."
    ]
  },
  {
    "t": "se",
    "ti": "Spot the Error: Algebraic & Domain Verification (Unit 4 · Parameters, Vectors, and Matrices)",
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
    "ti_ar": "اكتشف الخطأ: الجذور الدخيلة والتحقق من المجال (Unit 4 · Parameters, Vectors, and Matrices)",
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
    "ti": "Examiner Mode: Multi-Step Structured Problem (Unit 4 · Parameters, Vectors, and Matrices)",
    "q": "Let \\(f(x) = x^2 - 6x + 8\\) for \\(x \\ge 3\\). (a) Express \\(f(x)\\) in completed-square vertex form and state the range of \\(f\\). (b) Find an expression for the inverse function \\(f^{-1}(x)\\) and state its domain.",
    "parts": [
      {
        "label": "Part (a) — Vertex Form & Range",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "Complete the square: \\(f(x) = (x - 3)^2 - 9 + 8 = (x - 3)^2 + -1\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "State exact range: \\(f(x) \\ge -1\\) (or \\([-1, \\infty)\\))."
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
            "text": "Set \\(y = (x - 3)^2 + -1 \\implies (x - 3)^2 = y - -1\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "Select positive branch (since \\(x \\ge 3\\)): \\(f^{-1}(x) = 3 + \\sqrt{x - -1}\\)."
          },
          {
            "code": "B1",
            "marks": 1,
            "text": "State domain of \\(f^{-1}\\): \\(x \\ge -1\\) (matching the range of \\(f\\))."
          }
        ]
      }
    ],
    "examinerTip": "Writing \\(\\pm\\sqrt{x - -1}\\) for \\(f^{-1}(x)\\) loses the final A1 mark because a function must be single-valued; use the domain restriction \\(x \\ge 3\\) to choose the \\(+\\) sign.",
    "ti_ar": "وضع المصحح: إكمال المربع والدالة العكسية (Unit 4 · Parameters, Vectors, and Matrices)",
    "q_ar": "لتكن \\(f(x) = x^2 - 6x + 8\\) حيث \\(x \\ge 3\\). (أ) اكتب \\(f(x)\\) في صورة المربع الكامل وحدد مداها. (ب) أوجد قاعدة الدالة العكسية \\(f^{-1}(x)\\) ومجالها.",
    "examinerTip_ar": "الدالة العكسية يجب أن تكون وحيدة القيمة، لذا نختار الإشارة الموجبة للجذر \\(3 + \\sqrt{x - -1}\\) لأن \\(x \\ge 3\\)."
  },
  {
    "t": "sb",
    "ti": "Step Builder: Completing the Square & Vertex Analysis (Unit 4 · Parameters, Vectors, and Matrices)",
    "steps": [
      {
        "l": "In \\(y = x^2 - 6x + 8\\), halve the \\(x\\)-coefficient to write \\((x - h)^2\\) where \\(h =\\)",
        "a": "3",
        "h": "Take half of 6."
      },
      {
        "l": "Compute the minimum value \\(k = 8 - 3^2 =\\)",
        "a": "-1",
        "h": "Subtract 9 from 8."
      },
      {
        "l": "Evaluate \\(y\\) when \\(x = 5\\): \\(y =\\)",
        "a": "3",
        "h": "Compute (2)^2 + -1."
      }
    ],
    "ti_ar": "بناء الخطوات: إكمال المربع وإيجاد القيمة الصغرى (Unit 4 · Parameters, Vectors, and Matrices)",
    "steps_ar": [
      {
        "l": "في الدالة \\(y = x^2 - 6x + 8\\): قيمة \\(h\\) في \\((x - h)^2\\) تساوي:",
        "a": "3",
        "h": "اقسم معامل x وهو 6 على 2."
      },
      {
        "l": "احسب القيمة الصغرى \\(k = 8 - 3^2 =\\)",
        "a": "-1",
        "h": "اطرح 9 من 8."
      },
      {
        "l": "احسب قيمة \\(y\\) عندما \\(x = 5\\):",
        "a": "3",
        "h": "احسب 4 + -1."
      }
    ]
  },
  {
    "t": "mt",
    "ti": "Matching: Core Algebraic & Analytic Principles (Unit 4 · Parameters, Vectors, and Matrices)",
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
    "ti_ar": "مطابقة: المبادئ الجبرية والتحليلية الأساسية (Unit 4 · Parameters, Vectors, and Matrices)",
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

D["appc-u1b"] = [
  {
    "t": "qc",
    "ti": "Quick Check: Vertex & Minimum Analysis (Unit 1B · Rational Functions, End Behavior, Asymptotes & Binomial Theorem)",
    "ti_ar": "فحص سريع: تحليل نقطة الرأس والقيمة الصغرى (الوحدة 1B · الدوال النسبية وسلوك الأطراف وخطوط التقارب ونظرية ذات الحدين)",
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
    "ti": "True / False: Core Mathematical Properties (Unit 1B · Rational Functions, End Behavior, Asymptotes & Binomial Theorem)",
    "ti_ar": "صح / خطأ: الخصائص الرياضية الأساسية (الوحدة 1B · الدوال النسبية وسلوك الأطراف وخطوط التقارب ونظرية ذات الحدين)",
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
    "ti": "Matching: Algebraic & Analytical Identities (Unit 1B · Rational Functions, End Behavior, Asymptotes & Binomial Theorem)",
    "ti_ar": "مطابقة: المتطابقات والعلاقات التحليلية (الوحدة 1B · الدوال النسبية وسلوك الأطراف وخطوط التقارب ونظرية ذات الحدين)",
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
    "ti": "Numeric Entry: Exact Evaluation (Unit 1B · Rational Functions, End Behavior, Asymptotes & Binomial Theorem)",
    "ti_ar": "إدخال رقمي: الحساب الدقيق (الوحدة 1B · الدوال النسبية وسلوك الأطراف وخطوط التقارب ونظرية ذات الحدين)",
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
    "ti": "Order the Steps: Systematic Derivation (Unit 1B · Rational Functions, End Behavior, Asymptotes & Binomial Theorem)",
    "ti_ar": "رتّب الخطوات: خطوات الاستنتاج المنظم (الوحدة 1B · الدوال النسبية وسلوك الأطراف وخطوط التقارب ونظرية ذات الحدين)",
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
    "ti": "Categorize: Discriminant Classification (Unit 1B · Rational Functions, End Behavior, Asymptotes & Binomial Theorem)",
    "ti_ar": "تصنيف: تصنيف المعادلات حسب المميز (الوحدة 1B · الدوال النسبية وسلوك الأطراف وخطوط التقارب ونظرية ذات الحدين)",
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
    "ti": "Spot the Error: Extraneous Root Check (Unit 1B · Rational Functions, End Behavior, Asymptotes & Binomial Theorem)",
    "ti_ar": "اكتشف الخطأ: التحقق من الجذور الدخيلة (الوحدة 1B · الدوال النسبية وسلوك الأطراف وخطوط التقارب ونظرية ذات الحدين)",
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
    "ti": "Examiner Mode: Multi-Step Rubric Problem (Unit 1B · Rational Functions, End Behavior, Asymptotes & Binomial Theorem)",
    "ti_ar": "وضع المصحح: مسألة متعددة الخطوات (الوحدة 1B · الدوال النسبية وسلوك الأطراف وخطوط التقارب ونظرية ذات الحدين)",
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
    "ti": "Step Builder: Guided Calculation (Unit 1B · Rational Functions, End Behavior, Asymptotes & Binomial Theorem)",
    "ti_ar": "بناء الخطوات: حساب موجه (الوحدة 1B · الدوال النسبية وسلوك الأطراف وخطوط التقارب ونظرية ذات الحدين)",
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

D["appc-u2b"] = [
  {
    "t": "qc",
    "ti": "Quick Check: Vertex & Minimum Analysis (Unit 2B · Logarithmic Modeling, Semi-Log Plots, Inverse & Competing Functions)",
    "ti_ar": "فحص سريع: تحليل نقطة الرأس والقيمة الصغرى (الوحدة 2B · النمذجة اللوغاريتمية والتمثيل شبه اللوغاريتمي والدوال العكسية)",
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
    "ti": "True / False: Core Mathematical Properties (Unit 2B · Logarithmic Modeling, Semi-Log Plots, Inverse & Competing Functions)",
    "ti_ar": "صح / خطأ: الخصائص الرياضية الأساسية (الوحدة 2B · النمذجة اللوغاريتمية والتمثيل شبه اللوغاريتمي والدوال العكسية)",
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
    "ti": "Matching: Algebraic & Analytical Identities (Unit 2B · Logarithmic Modeling, Semi-Log Plots, Inverse & Competing Functions)",
    "ti_ar": "مطابقة: المتطابقات والعلاقات التحليلية (الوحدة 2B · النمذجة اللوغاريتمية والتمثيل شبه اللوغاريتمي والدوال العكسية)",
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
    "ti": "Numeric Entry: Exact Evaluation (Unit 2B · Logarithmic Modeling, Semi-Log Plots, Inverse & Competing Functions)",
    "ti_ar": "إدخال رقمي: الحساب الدقيق (الوحدة 2B · النمذجة اللوغاريتمية والتمثيل شبه اللوغاريتمي والدوال العكسية)",
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
    "ti": "Order the Steps: Systematic Derivation (Unit 2B · Logarithmic Modeling, Semi-Log Plots, Inverse & Competing Functions)",
    "ti_ar": "رتّب الخطوات: خطوات الاستنتاج المنظم (الوحدة 2B · النمذجة اللوغاريتمية والتمثيل شبه اللوغاريتمي والدوال العكسية)",
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
    "ti": "Categorize: Discriminant Classification (Unit 2B · Logarithmic Modeling, Semi-Log Plots, Inverse & Competing Functions)",
    "ti_ar": "تصنيف: تصنيف المعادلات حسب المميز (الوحدة 2B · النمذجة اللوغاريتمية والتمثيل شبه اللوغاريتمي والدوال العكسية)",
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
    "ti": "Spot the Error: Extraneous Root Check (Unit 2B · Logarithmic Modeling, Semi-Log Plots, Inverse & Competing Functions)",
    "ti_ar": "اكتشف الخطأ: التحقق من الجذور الدخيلة (الوحدة 2B · النمذجة اللوغاريتمية والتمثيل شبه اللوغاريتمي والدوال العكسية)",
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
    "ti": "Examiner Mode: Multi-Step Rubric Problem (Unit 2B · Logarithmic Modeling, Semi-Log Plots, Inverse & Competing Functions)",
    "ti_ar": "وضع المصحح: مسألة متعددة الخطوات (الوحدة 2B · النمذجة اللوغاريتمية والتمثيل شبه اللوغاريتمي والدوال العكسية)",
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
    "ti": "Step Builder: Guided Calculation (Unit 2B · Logarithmic Modeling, Semi-Log Plots, Inverse & Competing Functions)",
    "ti_ar": "بناء الخطوات: حساب موجه (الوحدة 2B · النمذجة اللوغاريتمية والتمثيل شبه اللوغاريتمي والدوال العكسية)",
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

D["appc-u3b"] = [
  {
    "t": "qc",
    "ti": "Quick Check: Vertex & Minimum Analysis (Unit 3B · Sinusoidal Regression, Inverse Trig, Tangent & Polar Conics)",
    "ti_ar": "فحص سريع: تحليل نقطة الرأس والقيمة الصغرى (الوحدة 3B · الانحدار الجيبي والدوال المثلثية العكسية والدوال القطبية)",
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
    "ti": "True / False: Core Mathematical Properties (Unit 3B · Sinusoidal Regression, Inverse Trig, Tangent & Polar Conics)",
    "ti_ar": "صح / خطأ: الخصائص الرياضية الأساسية (الوحدة 3B · الانحدار الجيبي والدوال المثلثية العكسية والدوال القطبية)",
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
    "ti": "Matching: Algebraic & Analytical Identities (Unit 3B · Sinusoidal Regression, Inverse Trig, Tangent & Polar Conics)",
    "ti_ar": "مطابقة: المتطابقات والعلاقات التحليلية (الوحدة 3B · الانحدار الجيبي والدوال المثلثية العكسية والدوال القطبية)",
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
    "ti": "Numeric Entry: Exact Evaluation (Unit 3B · Sinusoidal Regression, Inverse Trig, Tangent & Polar Conics)",
    "ti_ar": "إدخال رقمي: الحساب الدقيق (الوحدة 3B · الانحدار الجيبي والدوال المثلثية العكسية والدوال القطبية)",
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
    "ti": "Order the Steps: Systematic Derivation (Unit 3B · Sinusoidal Regression, Inverse Trig, Tangent & Polar Conics)",
    "ti_ar": "رتّب الخطوات: خطوات الاستنتاج المنظم (الوحدة 3B · الانحدار الجيبي والدوال المثلثية العكسية والدوال القطبية)",
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
    "ti": "Categorize: Discriminant Classification (Unit 3B · Sinusoidal Regression, Inverse Trig, Tangent & Polar Conics)",
    "ti_ar": "تصنيف: تصنيف المعادلات حسب المميز (الوحدة 3B · الانحدار الجيبي والدوال المثلثية العكسية والدوال القطبية)",
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
    "ti": "Spot the Error: Extraneous Root Check (Unit 3B · Sinusoidal Regression, Inverse Trig, Tangent & Polar Conics)",
    "ti_ar": "اكتشف الخطأ: التحقق من الجذور الدخيلة (الوحدة 3B · الانحدار الجيبي والدوال المثلثية العكسية والدوال القطبية)",
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
    "ti": "Examiner Mode: Multi-Step Rubric Problem (Unit 3B · Sinusoidal Regression, Inverse Trig, Tangent & Polar Conics)",
    "ti_ar": "وضع المصحح: مسألة متعددة الخطوات (الوحدة 3B · الانحدار الجيبي والدوال المثلثية العكسية والدوال القطبية)",
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
    "ti": "Step Builder: Guided Calculation (Unit 3B · Sinusoidal Regression, Inverse Trig, Tangent & Polar Conics)",
    "ti_ar": "بناء الخطوات: حساب موجه (الوحدة 3B · الانحدار الجيبي والدوال المثلثية العكسية والدوال القطبية)",
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
