/* Interactive Practice data for /apab/ - one entry per chapter section id.
   Shipped as public/js/ix/apab.js and loaded only on that track's page by the
   engine in src/scripts/modules/19-interactive-activities-engine-v1.js
   (Plan 5 Phase 5.015, ADR 0033). Entry shapes (qc/mt/tf/sb/sr/fn/num/ord/cat/gp/se/ms) are
   documented there. */
(window.__ixData = window.__ixData || []).push(function (D) {
D["apab-overview"] = [
  {
    "t": "qc",
    "ti": "Quick Check: AP Calculus AB Unit Weights",
    "ti_ar": "فحص سريع: أوزان وحدات مقرر AP Calculus AB",
    "q": "Which areas carry the heaviest weighting on the AP Calculus AB exam?",
    "q_ar": "ما هي الموضوعات التي تحمل الوزن الأكبر في اختبار AP Calculus AB؟",
    "o": [
      "Integration & Accumulation (Unit 6) and Contextual Applications of Differentiation & Integration",
      "Limits and Continuity only",
      "Infinite series and Taylor polynomials",
      "Vector-valued functions and polar coordinates"
    ],
    "o_ar": [
      "التكامل والتراكم (الوحدة 6) وتطبيقات التفاضل والتكامل في السياقات الواقعية",
      "النهايات والاتصال فقط",
      "المتسلسلات اللانهائية وكثيرات حدود تايلور",
      "الدوال متجهة القيمة والإحداثيات القطبية"
    ],
    "a": 0,
    "ex": "Units 6 (Integration & Accumulation of Change) along with Applications of Derivatives and Integrals form ~35-40% of the entire AP AB exam.",
    "ex_ar": "تشكل الوحدة 6 (التكامل وتراكم التغير) جنباً إلى جنب مع تطبيقات المشتقات والتكاملات ما يقرب من 35-40% من اختبار AP AB بأكمله."
  },
  {
    "t": "mt",
    "ti": "Matching: The Big Ideas of AP Calculus AB",
    "ti_ar": "مطابقة: الأفكار الكبرى لحساب التفاضل والتكامل AP Calculus AB",
    "p": [
      {
        "l": "Limits & Continuity",
        "r": "Foundational behavior of functions near points"
      },
      {
        "l": "Derivatives",
        "r": "Instantaneous rate of change & local linearity"
      },
      {
        "l": "Integrals",
        "r": "Accumulation of net change & Riemann sums"
      },
      {
        "l": "FTC",
        "r": "Bridges differentiation and integration"
      }
    ],
    "p_ar": [
      {
        "l": "النهايات والاتصال",
        "r": "السلوك التأسيسي للدوال بالقرب من النقاط"
      },
      {
        "l": "المشتقات",
        "r": "معدل التغير اللحظي والخطية المحلية"
      },
      {
        "l": "التكاملات",
        "r": "تراكم صافي التغير ومجاميع ريمان"
      },
      {
        "l": "النظرية الأساسية للتفاضل والتكامل (FTC)",
        "r": "الجسر الرابط بين التفاضل والتكامل"
      }
    ]
  },
  {
    "t": "num",
    "ti": "Exam Weighting: Section I Percentage",
    "ti_ar": "وزن الاختبار: النسبة المئوية للقسم الأول",
    "q": "What percentage of the composite AP Calculus AB score is contributed by Section I (Multiple Choice)?",
    "q_ar": "ما هي النسبة المئوية التي يساهم بها القسم الأول (اختيار من متعدد) في الدرجة المركبة لاختبار AP Calculus AB؟",
    "a": 50,
    "tol": 0.001,
    "h": "Section I (MCQ) and Section II (FRQ) contribute equal weights to the composite score.",
    "h_ar": "يساهم القسم الأول (MCQ) والقسم الثاني (FRQ) بأوزان متساوية في الدرجة المركبة.",
    "sol": "Each section contributes exactly 50% of the total scaled composite score.",
    "sol_ar": "يساهم كل قسم بنسبة 50% بالضبط من مجموع الدرجة المركبة المعيارية."
  },
  {
    "t": "ord",
    "ti": "Order of Course Flow: Early AP Calculus AB Units",
    "ti_ar": "ترتيب مسار المنهج: الوحدات الأولى لـ AP Calculus AB",
    "q": "Arrange the first four AP Calculus AB units in standard College Board curriculum sequence:",
    "q_ar": "رتب وحدات AP Calculus AB الأربع الأولى وفق التسلسل القياسي لمنهج College Board:",
    "items": [
      "Unit 1: Limits & Continuity",
      "Unit 2: Differentiation — Definition & Rules",
      "Unit 3: Composite, Implicit & Inverse Derivatives",
      "Unit 4: Contextual Applications of Differentiation"
    ],
    "items_ar": [
      "الوحدة 1: النهايات والاتصال",
      "الوحدة 2: التفاضل — التعريف والقواعد",
      "الوحدة 3: المشتقات المركبة والضمنية والعكسية",
      "الوحدة 4: التطبيقات السياقية للتفاضل"
    ],
    "sol": "The curriculum begins with limits/continuity (U1), introduces derivatives (U2), extends to advanced differentiation rules (U3), and applies derivatives to real-world contexts (U4).",
    "sol_ar": "يبدأ المنهج بالنهايات والاتصال (U1)، ثم يقدم المشتقات (U2)، ويمتد إلى قواعد التفاضل المتقدمة (U3)، ثم يطبق المشتقات في سياقات واقعية (U4)."
  },
  {
    "t": "cat",
    "ti": "Classify AP Units: Differential vs. Integral Calculus Focus",
    "ti_ar": "تصنيف وحدات AP: التركيز على حساب التفاضل مقابل حساب التكامل",
    "categories": [
      "Differential Calculus Focus",
      "Integral Calculus Focus"
    ],
    "categories_ar": [
      "التركيز على حساب التفاضل",
      "التركيز على حساب التكامل"
    ],
    "items": [
      {
        "s": "Unit 2: Differentiation Definition & Rules",
        "s_ar": "الوحدة 2: تعريف وقواعد التفاضل",
        "cat": 0
      },
      {
        "s": "Unit 3: Composite, Implicit & Inverse",
        "s_ar": "الوحدة 3: الدوال المركبة والضمنية والعكسية",
        "cat": 0
      },
      {
        "s": "Unit 4: Contextual Applications of Derivatives",
        "s_ar": "الوحدة 4: التطبيقات السياقية للمشتقات",
        "cat": 0
      },
      {
        "s": "Unit 6: Integration & Accumulation",
        "s_ar": "الوحدة 6: التكامل وتراكم التغير",
        "cat": 1
      },
      {
        "s": "Unit 8: Applications of Integration",
        "s_ar": "الوحدة 8: تطبيقات التكامل",
        "cat": 1
      }
    ],
    "sol": "Units 2, 3, and 4 develop and apply derivatives; Units 6 and 8 develop and apply integration.",
    "sol_ar": "تطور الوحدات 2 و3 و4 المشتقات وتطبيقاتها؛ بينما تطور الوحدتان 6 و8 التكامل وتطبيقاته."
  },
  {
    "t": "se",
    "ti": "Spot the Error: Implicit Differentiation & Product Rule (AP Calculus AB Exam Format & Units Overview)",
    "q": "A student differentiates the implicit curve \\(x^2 + 4xy + y^2 = 25\\) with respect to \\(x\\). Identify the step with the mathematical flaw:",
    "steps": [
      "Differentiate \\(x^2\\) with respect to \\(x\\) to obtain \\(2x\\).",
      "Differentiate the middle term \\(4xy\\) with respect to \\(x\\) as \\(4\\dfrac{dy}{dx}\\).",
      "Differentiate \\(y^2\\) using the Chain Rule as \\(2y\\dfrac{dy}{dx}\\) and the constant \\(25\\) as \\(0\\).",
      "Collect \\(\\dfrac{dy}{dx}\\) terms and divide to isolate \\(\\dfrac{dy}{dx}\\)."
    ],
    "errorStep": 2,
    "reasons": [
      "The term \\(4xy\\) is a product of two functions of \\(x\\); by the Product Rule its derivative is \\(4y + 4x\\dfrac{dy}{dx}\\), not \\(4\\dfrac{dy}{dx}\\).",
      "The derivative of \\(y^2\\) with respect to \\(x\\) is simply \\(2y\\) without \\(\\dfrac{dy}{dx}\\).",
      "The constant \\(25\\) remains \\(25\\) after differentiation."
    ],
    "correctReason": 0,
    "h": "Look closely at how the product \\(4xy\\) was differentiated in Step 2.",
    "sol": "Applying the Product Rule to \\(4xy\\) gives \\(4y + 4x\\dfrac{dy}{dx}\\). Thus \\(2x + 4y + (4x + 2y)\\dfrac{dy}{dx} = 0 \\implies \\dfrac{dy}{dx} = -\\dfrac{2x + 4y}{4x + 2y}\\).",
    "ti_ar": "اكتشف الخطأ: الاشتقاق الضمني وقاعدة الضرب (AP Calculus AB Exam Format & Units Overview)",
    "q_ar": "يقوم طالب باشتقاق العلاقة الضمنية \\(x^2 + 4xy + y^2 = 25\\) بالنسبة إلى \\(x\\). حدد الخطوة الخاطئة:",
    "steps_ar": [
      "اشتقاق \\(x^2\\) بالنسبة إلى \\(x\\) ليعطي \\(2x\\).",
      "اشتقاق الحد الأوسط \\(4xy\\) بالنسبة إلى \\(x\\) على أنه \\(4\\dfrac{dy}{dx}\\).",
      "اشتقاق \\(y^2\\) بقاعدة السلسلة ليعطي \\(2y\\dfrac{dy}{dx}\\) ومشتقة الثابت \\(0\\).",
      "تجميع حدود \\(\\dfrac{dy}{dx}\\) وقسمة الطرفين لعزل المشتقة."
    ],
    "reasons_ar": [
      "الحد \\(4xy\\) حاصل ضرب دالتين في \\(x\\)؛ وبقاعدة الضرب مشتقته هي \\(4y + 4x\\dfrac{dy}{dx}\\).",
      "مشتقة \\(y^2\\) هي \\(2y\\) فقط دون \\(\\dfrac{dy}{dx}\\).",
      "مشتقة الثابت تبقى كما هي."
    ],
    "h_ar": "راجع كيفية اشتقاق حاصل الضرب \\(4xy\\) في الخطوة الثانية.",
    "sol_ar": "بتطبيق قاعدة الضرب على \\(4xy\\) نحصل على \\(4y + 4x\\dfrac{dy}{dx}\\)، ومنه \\(\\dfrac{dy}{dx} = -\\dfrac{2x + 4y}{4x + 2y}\\)."
  },
  {
    "t": "ms",
    "ti": "Examiner Mode: Tangent, Normal & Stationary Points (AP Calculus AB Exam Format & Units Overview)",
    "q": "Consider the curve \\(y = 4x^3 - 5x^2 + 4\\). (a) Find \\(\\dfrac{dy}{dx}\\) and the gradient of the tangent at \\(x = 2\\). (b) Find the \\(x\\)-coordinates of the stationary points.",
    "parts": [
      {
        "label": "Part (a) — First Derivative & Tangent Gradient",
        "marks": 3,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "Differentiate term by term using the power rule: \\(\\dfrac{dy}{dx} = 12x^2 - 10x\\)."
          },
          {
            "code": "M1",
            "marks": 1,
            "text": "Substitute \\(x = 2\\): \\(m = 12(2)^2 - 10(2)\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "Obtain exact tangent gradient \\(m = 38\\)."
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
            "text": "Set \\(\\dfrac{dy}{dx} = 0 \\implies x(12x - 10) = 0\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "State both stationary \\(x\\)-coordinates: \\(x = 0\\) and \\(x = \\dfrac{10}{12}\\)."
          }
        ]
      }
    ],
    "examinerTip": "Always show the explicit equation \\(\\dfrac{dy}{dx} = 0\\) before solving for stationary points—this earns the M1 method mark even if an arithmetic slip occurs.",
    "ti_ar": "وضع المصحح: المماس والنقاط الحرجة (AP Calculus AB Exam Format & Units Overview)",
    "q_ar": "لمنحنى الدالة \\(y = 4x^3 - 5x^2 + 4\\): (أ) أوجد \\(\\dfrac{dy}{dx}\\) وميل المماس عند \\(x = 2\\). (ب) أوجد الإحداثيات السينية للنقاط الحرجة.",
    "examinerTip_ar": "اكتب دائماً شرط النقطة الحرجة \\(\\dfrac{dy}{dx} = 0\\) صراحةً لضمان الحصول على درجة الطريقة (M1)."
  },
  {
    "t": "sb",
    "ti": "Step Builder: Instantaneous Rate of Change (AP Calculus AB Exam Format & Units Overview)",
    "steps": [
      {
        "l": "Given \\(f(x) = 4x^2 + 5x - 5\\), find the coefficient of \\(x\\) in \\(f'(x)\\):",
        "a": "8",
        "h": "Multiply power 2 by 4."
      },
      {
        "l": "Find the constant term in \\(f'(x)\\):",
        "a": "5",
        "h": "The derivative of 5x is 5."
      },
      {
        "l": "Evaluate the instantaneous rate of change \\(f'(2) =\\)",
        "a": "21",
        "h": "Compute 8(2) + 5."
      }
    ],
    "ti_ar": "بناء الخطوات: حساب المشتقة ومعدل التغير اللحظي (AP Calculus AB Exam Format & Units Overview)",
    "steps_ar": [
      {
        "l": "للدالة \\(f(x) = 4x^2 + 5x - 5\\)، معامل \\(x\\) في \\(f'(x)\\) يساوي:",
        "a": "8",
        "h": "اضرب الأس 2 في 4."
      },
      {
        "l": "الحد الثابت في المشتقة \\(f'(x)\\) يساوي:",
        "a": "5",
        "h": "مشتقة 5x هي 5."
      },
      {
        "l": "احسب قيمة المشتقة \\(f'(2) =\\)",
        "a": "21",
        "h": "احسب 8(2) + 5."
      }
    ]
  }
];

D["apab-exam"] = [
  {
    "t": "qc",
    "ti": "Quick Check: AP Calculus AB Exam Structure",
    "ti_ar": "فحص سريع: هيكل اختبار AP Calculus AB",
    "q": "How is Section I (Multiple Choice) divided on the AP Calculus AB exam?",
    "q_ar": "كيف ينقسم القسم الأول (اختيار من متعدد) في اختبار AP Calculus AB؟",
    "o": [
      "Part A: 30 non-calc (60 min); Part B: 15 calc (45 min)",
      "Part A: 25 calc (50 min); Part B: 20 non-calc (40 min)",
      "Part A: 45 calc (90 min); Part B: 10 non-calc (15 min)",
      "Part A: 20 non-calc (45 min); Part B: 25 calc (60 min)"
    ],
    "o_ar": [
      "الجزء أ: 30 سؤالاً بدون حاسبة (60 دقيقة)؛ الجزء ب: 15 سؤالاً مع حاسبة (45 دقيقة)",
      "الجزء أ: 25 سؤالاً مع حاسبة (50 دقيقة)؛ الجزء ب: 20 سؤالاً بدون حاسبة (40 دقيقة)",
      "الجزء أ: 45 سؤالاً مع حاسبة (90 دقيقة)؛ الجزء ب: 10 أسئلة بدون حاسبة (15 دقيقة)",
      "الجزء أ: 20 سؤالاً بدون حاسبة (45 دقيقة)؛ الجزء ب: 25 سؤالاً مع حاسبة (60 دقيقة)"
    ],
    "a": 0,
    "ex": "Section I has 45 multiple-choice questions total: Part A has 30 questions (60 min, no calculator allowed), and Part B has 15 questions (45 min, graphing calculator required).",
    "ex_ar": "يتكون القسم الأول من 45 سؤال اختيار من متعدد إجمالاً: الجزء أ يضم 30 سؤالاً (60 دقيقة، ممنوع استخدام الآلة الحاسبة)، والجزء ب يضم 15 سؤالاً (45 دقيقة، تتطلب آلة حاسبة بيانية)."
  },
  {
    "t": "tf",
    "ti": "True or False: AP Calculus Exam Rules & Policies",
    "ti_ar": "صح أم خطأ: قواعد وسياسات اختبار AP Calculus",
    "items": [
      {
        "s": "On calculator-active sections, non-exact decimal answers must be rounded or truncated to at least 3 decimal places.",
        "s_ar": "في الأقسام المسموح فيها بالآلة الحاسبة، يجب تقريب أو قطع الإجابات العشرية غير الدقيقة إلى 3 منازل عشرية على الأقل.",
        "a": true,
        "ex": "College Board standard requires accuracy to 3 places after the decimal point.",
        "ex_ar": "تشترط معايير College Board الدقة إلى 3 منازل بعد الفاصلة العشرية."
      },
      {
        "s": "Scratch work on FRQ pages does not need to show the mathematical setup as long as the calculator value is given.",
        "s_ar": "لا يلزم كتابة خطوات الإعداد الرياضي في صفحات الأسئلة المقالية (FRQ) طالما تم إعطاء القيمة الناتجة من الآلة الحاسبة.",
        "a": false,
        "ex": "You MUST write down the complete calculus setup (e.g. integral or derivative expression) to earn credit.",
        "ex_ar": "يجب عليك كتابة الإعداد الرياضي الكامل للتفاضل أو التكامل للحصول على الدرجة."
      },
      {
        "s": "Units of measure must be included in FRQ answers whenever requested.",
        "s_ar": "يجب تضمين وحدات القياس في إجابات الأسئلة المقالية كلما طُلب ذلك.",
        "a": true,
        "ex": "FRQ parts often include a dedicated unit point.",
        "ex_ar": "غالباً ما تتضمن أجزاء الأسئلة المقالية درجة مخصصة لوحدة القياس."
      },
      {
        "s": "You are permitted to use a graphing calculator on all 6 Free Response Questions.",
        "s_ar": "يُسمح باستخدام آلة حاسبة بيانية في جميع الأسئلة المقالية الستة (FRQ).",
        "a": false,
        "ex": "Only Questions 1 and 2 allow a graphing calculator; Questions 3 through 6 are strictly no calculator.",
        "ex_ar": "يسمح فقط في السؤالين 1 و2 باستخدام الآلة الحاسبة البيانية؛ أما الأسئلة من 3 إلى 6 فممنوع فيها استخدام الآلة الحاسبة تماماً."
      }
    ]
  },
  {
    "t": "num",
    "ti": "Free Response Count",
    "ti_ar": "عدد الأسئلة المقالية",
    "q": "How many total Free Response Questions (FRQs) appear on Section II of the AP Calculus AB exam?",
    "q_ar": "كم عدد الأسئلة المقالية (FRQs) الإجمالي في القسم الثاني من اختبار AP Calculus AB؟",
    "a": 6,
    "tol": 0.001,
    "h": "Section II consists of Part A (2 calculator questions) and Part B (4 no-calculator questions).",
    "h_ar": "يتكون القسم الثاني من الجزء أ (سؤالان بالحاسبة) والجزء ب (4 أسئلة بدون حاسبة).",
    "sol": "2 + 4 = 6 questions in total on Section II.",
    "sol_ar": "2 + 4 = 6 أسئلة إجمالاً في القسم الثاني."
  },
  {
    "t": "ord",
    "ti": "Order the Exam Parts",
    "ti_ar": "ترتيب أجزاء الاختبار",
    "q": "Arrange the four parts of the AP Calculus AB exam in chronological order of test administration:",
    "q_ar": "رتب أجزاء اختبار AP Calculus AB الأربعة حسب التسلسل الزمني لإجراء الاختبار:",
    "items": [
      "Section I Part A (30 MCQ · 60 min · No Calculator)",
      "Section I Part B (15 MCQ · 45 min · Graphing Calculator Required)",
      "Section II Part A (2 FRQ · 30 min · Graphing Calculator Required)",
      "Section II Part B (4 FRQ · 60 min · No Calculator)"
    ],
    "items_ar": [
      "القسم الأول الجزء أ (30 سؤال اختيار من متعدد · 60 دقيقة · بدون حاسبة)",
      "القسم الأول الجزء ب (15 سؤال اختيار من متعدد · 45 دقيقة · تتطلب آلة حاسبة بيانية)",
      "القسم الثاني الجزء أ (سؤالان مقاليان · 30 دقيقة · تتطلب آلة حاسبة بيانية)",
      "القسم الثاني الجزء ب (4 أسئلة مقالية · 60 دقيقة · بدون حاسبة)"
    ],
    "sol": "The exam begins with Section I MCQ (no-calc then calc), followed by Section II FRQ (calc then no-calc).",
    "sol_ar": "يبدأ الاختبار بالقسم الأول MCQ (بدون حاسبة ثم بحاسبة)، يليه القسم الثاني FRQ (بحاسبة ثم بدون حاسبة)."
  },
  {
    "t": "cat",
    "ti": "Classify Exam Sections: Calculator Allowed vs. Strictly Prohibited",
    "ti_ar": "تصنيف أقسام الاختبار: الحاسبة مسموحة مقابل ممنوعة تماماً",
    "categories": [
      "Calculator Permitted / Required",
      "No Calculator Allowed"
    ],
    "categories_ar": [
      "الحاسبة مسموحة / مطلوبة",
      "ممنوع استخدام الآلة الحاسبة"
    ],
    "items": [
      {
        "s": "Section I Part A (30 Multiple Choice questions)",
        "s_ar": "القسم الأول الجزء أ (30 سؤال اختيار من متعدد)",
        "cat": 1
      },
      {
        "s": "Section I Part B (15 Multiple Choice questions)",
        "s_ar": "القسم الأول الجزء ب (15 سؤال اختيار من متعدد)",
        "cat": 0
      },
      {
        "s": "Section II Part A (2 Free Response questions)",
        "s_ar": "القسم الثاني الجزء أ (سؤالان مقاليان)",
        "cat": 0
      },
      {
        "s": "Section II Part B (4 Free Response questions)",
        "s_ar": "القسم الثاني الجزء ب (4 أسئلة مقالية)",
        "cat": 1
      }
    ],
    "sol": "Only Section I Part B and Section II Part A permit the use of an approved graphing calculator.",
    "sol_ar": "فقط القسم الأول الجزء ب والقسم الثاني الجزء أ يسمحان باستخدام آلة حاسبة بيانية معتمدة."
  },
  {
    "t": "se",
    "ti": "Spot the Error: Implicit Differentiation & Product Rule (AP Calculus AB Exam Pacing & Scoring Strategy)",
    "q": "A student differentiates the implicit curve \\(x^2 + 3xy + y^2 = 30\\) with respect to \\(x\\). Identify the step with the mathematical flaw:",
    "steps": [
      "Differentiate \\(x^2\\) with respect to \\(x\\) to obtain \\(2x\\).",
      "Differentiate the middle term \\(3xy\\) with respect to \\(x\\) as \\(3\\dfrac{dy}{dx}\\).",
      "Differentiate \\(y^2\\) using the Chain Rule as \\(2y\\dfrac{dy}{dx}\\) and the constant \\(30\\) as \\(0\\).",
      "Collect \\(\\dfrac{dy}{dx}\\) terms and divide to isolate \\(\\dfrac{dy}{dx}\\)."
    ],
    "errorStep": 2,
    "reasons": [
      "The term \\(3xy\\) is a product of two functions of \\(x\\); by the Product Rule its derivative is \\(3y + 3x\\dfrac{dy}{dx}\\), not \\(3\\dfrac{dy}{dx}\\).",
      "The derivative of \\(y^2\\) with respect to \\(x\\) is simply \\(2y\\) without \\(\\dfrac{dy}{dx}\\).",
      "The constant \\(30\\) remains \\(30\\) after differentiation."
    ],
    "correctReason": 0,
    "h": "Look closely at how the product \\(3xy\\) was differentiated in Step 2.",
    "sol": "Applying the Product Rule to \\(3xy\\) gives \\(3y + 3x\\dfrac{dy}{dx}\\). Thus \\(2x + 3y + (3x + 2y)\\dfrac{dy}{dx} = 0 \\implies \\dfrac{dy}{dx} = -\\dfrac{2x + 3y}{3x + 2y}\\).",
    "ti_ar": "اكتشف الخطأ: الاشتقاق الضمني وقاعدة الضرب (AP Calculus AB Exam Pacing & Scoring Strategy)",
    "q_ar": "يقوم طالب باشتقاق العلاقة الضمنية \\(x^2 + 3xy + y^2 = 30\\) بالنسبة إلى \\(x\\). حدد الخطوة الخاطئة:",
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
    "ti": "Examiner Mode: Tangent, Normal & Stationary Points (AP Calculus AB Exam Pacing & Scoring Strategy)",
    "q": "Consider the curve \\(y = 3x^3 - 6x^2 + 4\\). (a) Find \\(\\dfrac{dy}{dx}\\) and the gradient of the tangent at \\(x = 4\\). (b) Find the \\(x\\)-coordinates of the stationary points.",
    "parts": [
      {
        "label": "Part (a) — First Derivative & Tangent Gradient",
        "marks": 3,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "Differentiate term by term using the power rule: \\(\\dfrac{dy}{dx} = 9x^2 - 12x\\)."
          },
          {
            "code": "M1",
            "marks": 1,
            "text": "Substitute \\(x = 4\\): \\(m = 9(4)^2 - 12(4)\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "Obtain exact tangent gradient \\(m = 132\\)."
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
            "text": "Set \\(\\dfrac{dy}{dx} = 0 \\implies x(9x - 12) = 0\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "State both stationary \\(x\\)-coordinates: \\(x = 0\\) and \\(x = \\dfrac{12}{9}\\)."
          }
        ]
      }
    ],
    "examinerTip": "Always show the explicit equation \\(\\dfrac{dy}{dx} = 0\\) before solving for stationary points—this earns the M1 method mark even if an arithmetic slip occurs.",
    "ti_ar": "وضع المصحح: المماس والنقاط الحرجة (AP Calculus AB Exam Pacing & Scoring Strategy)",
    "q_ar": "لمنحنى الدالة \\(y = 3x^3 - 6x^2 + 4\\): (أ) أوجد \\(\\dfrac{dy}{dx}\\) وميل المماس عند \\(x = 4\\). (ب) أوجد الإحداثيات السينية للنقاط الحرجة.",
    "examinerTip_ar": "اكتب دائماً شرط النقطة الحرجة \\(\\dfrac{dy}{dx} = 0\\) صراحةً لضمان الحصول على درجة الطريقة (M1)."
  },
  {
    "t": "sb",
    "ti": "Step Builder: Instantaneous Rate of Change (AP Calculus AB Exam Pacing & Scoring Strategy)",
    "steps": [
      {
        "l": "Given \\(f(x) = 3x^2 + 6x - 5\\), find the coefficient of \\(x\\) in \\(f'(x)\\):",
        "a": "6",
        "h": "Multiply power 2 by 3."
      },
      {
        "l": "Find the constant term in \\(f'(x)\\):",
        "a": "6",
        "h": "The derivative of 6x is 6."
      },
      {
        "l": "Evaluate the instantaneous rate of change \\(f'(4) =\\)",
        "a": "30",
        "h": "Compute 6(4) + 6."
      }
    ],
    "ti_ar": "بناء الخطوات: حساب المشتقة ومعدل التغير اللحظي (AP Calculus AB Exam Pacing & Scoring Strategy)",
    "steps_ar": [
      {
        "l": "للدالة \\(f(x) = 3x^2 + 6x - 5\\)، معامل \\(x\\) في \\(f'(x)\\) يساوي:",
        "a": "6",
        "h": "اضرب الأس 2 في 3."
      },
      {
        "l": "الحد الثابت في المشتقة \\(f'(x)\\) يساوي:",
        "a": "6",
        "h": "مشتقة 6x هي 6."
      },
      {
        "l": "احسب قيمة المشتقة \\(f'(4) =\\)",
        "a": "30",
        "h": "احسب 6(4) + 6."
      }
    ]
  },
  {
    "t": "mt",
    "ti": "Matching: Differentiation Rules & Analytic Criteria (AP Calculus AB Exam Pacing & Scoring Strategy)",
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
    "ti_ar": "مطابقة: قواعد الاشتقاق ومعايير القيم القصوى (AP Calculus AB Exam Pacing & Scoring Strategy)",
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

D["apab-frq"] = [
  {
    "t": "sr",
    "ti": "Worked Example: FRQ Rate In / Rate Out Accumulation Model",
    "ti_ar": "مثال محلول: نموذج تراكم معدل الدخول ومعدل الخروج في الأسئلة المقالية",
    "steps": [
      "Given rate in \\(E(t)\\) and rate out \\(L(t)\\), total amount \\(A(t) = A(0) + \\int_0^t [E(u) - L(u)]\\,du\\).",
      "To find when the amount is maximized on \\([0, T]\\), find critical points where \\(A'(t) = E(t) - L(t) = 0\\).",
      "Test candidates: check \\(t = 0\\), critical points where \\(E(t) = L(t)\\), and endpoint \\(t = T\\).",
      "State the absolute maximum value with appropriate units and justification using the Candidates Test."
    ],
    "steps_ar": [
      "بمعلومية معدل الدخول \\(E(t)\\) ومعدل الخروج \\(L(t)\\)، تكون الكمية الإجمالية \\(A(t) = A(0) + \\int_0^t [E(u) - L(u)]\\,du\\).",
      "لإيجاد متى تصل الكمية إلى أقصاها على الفترة \\([0, T]\\)، نوجد النقاط الحرجة حيث \\(A'(t) = E(t) - L(t) = 0\\).",
      "اختبار القيم المرشحة: فحص \\(t = 0\\)، والنقاط الحرجة حيث \\(E(t) = L(t)\\)، وطرف الفترة \\(t = T\\).",
      "ذكر القيمة العظمى المطلقة مع الوحدات المناسبة والتبرير باستخدام اختبار القيم المرشحة (Candidates Test)."
    ]
  },
  {
    "t": "qc",
    "ti": "Quick Check: FRQ Theorem Conditions",
    "ti_ar": "فحص سريع: شروط النظريات في الأسئلة المقالية",
    "q": "To apply the Mean Value Theorem (MVT) for \\(f\\) on \\([a, b]\\), which hypotheses must be verified and stated?",
    "q_ar": "لتطبيق نظرية القيمة المتوسطة (MVT) للدالة \\(f\\) على الفترة \\([a, b]\\)، ما هي الشروط التي يجب التحقق منها وذكرها؟",
    "o": [
      "f is continuous on [a, b] and differentiable on (a, b)",
      "f is differentiable on [a, b] only",
      "f(a) = f(b) on [a, b]",
      "f''(x) exists and is positive on [a, b]"
    ],
    "o_ar": [
      "أن تكون f متصلة على الفترة المغلقة [a, b] وقابلة للاشتقاق على الفترة المفتوحة (a, b)",
      "أن تكون f قابلة للاشتقاق على الفترة المغلقة [a, b] فقط",
      "أن يكون f(a) = f(b) على [a, b]",
      "أن تكون المشتقة الثانية f''(x) موجودة وموجبة على [a, b]"
    ],
    "a": 0,
    "ex": "MVT requires confirming two distinct conditions: continuity on the closed interval [a, b], and differentiability on the open interval (a, b).",
    "ex_ar": "تتطلب نظرية القيمة المتوسطة تأكيد شرطين متمايزين: الاتصال على الفترة المغلقة [a, b]، وقابلية الاشتقاق على الفترة المفتوحة (a, b)."
  },
  {
    "t": "num",
    "ti": "Points Per Free Response Question",
    "ti_ar": "درجات السؤال المقالي الواحد",
    "q": "How many raw points is each Free Response Question worth on the AP Calculus AB exam?",
    "q_ar": "كم درجة خام يستحقها كل سؤال مقالي (FRQ) في اختبار AP Calculus AB؟",
    "a": 9,
    "tol": 0.001,
    "h": "All 6 FRQs have identical total point values.",
    "h_ar": "تحمل جميع الأسئلة المقالية الستة نفس قيمة الدرجات الإجمالية.",
    "sol": "Each FRQ is scored on a rubric out of 9 points, yielding 54 raw points total for Section II.",
    "sol_ar": "يُصحح كل سؤال مقالي وفق نموذج درجات من 9 درجات، مما يعطي 54 درجة خام إجمالاً للقسم الثاني."
  },
  {
    "t": "ord",
    "ti": "Order the Steps: Candidates Test for Absolute Extrema on [a, b]",
    "ti_ar": "ترتيب الخطوات: اختبار القيم المرشحة للقيم القصوى المطلقة على [a, b]",
    "q": "Arrange the steps to find and justify the absolute maximum of a continuous function f on [a, b]:",
    "q_ar": "رتب خطوات إيجاد وتبرير القيمة العظمى المطلقة لدالة متصلة f على الفترة [a, b]:",
    "items": [
      "Find f'(x) and determine all critical numbers where f'(x) = 0 or f' does not exist",
      "Discard any critical numbers that lie outside the closed interval [a, b]",
      "Evaluate f(x) at each remaining interior critical number",
      "Evaluate f(x) at both interval endpoints x = a and x = b",
      "Compare all evaluated values and state the largest value as the absolute maximum"
    ],
    "items_ar": [
      "إيجاد المشتقة f'(x) وتحديد جميع الأعداد الحرجة حيث f'(x) = 0 أو f' غير موجودة",
      "استبعاد أي أعداد حرجة تقع خارج الفترة المغلقة [a, b]",
      "حساب قيمة f(x) عند كل عدد حرج داخلي متبقٍ",
      "حساب قيمة f(x) عند طرفي الفترة x = a و x = b",
      "مقارنة جميع القيم المحسوبة وتحديد القيمة الكبرى كقيمة عظمى مطلقة"
    ],
    "sol": "The Candidates Test requires evaluating f at all interior critical numbers and both boundary endpoints.",
    "sol_ar": "يتطلب اختبار المرشحين حساب قيمة f عند جميع الأعداد الحرجة الداخلية وعند طرفي الفترة."
  },
  {
    "t": "cat",
    "ti": "Classify FRQ Question Styles: Calculator-Active vs. No-Calculator",
    "ti_ar": "تصنيف نمط الأسئلة المقالية: تتطلب حاسبة مقابل بدون حاسبة",
    "categories": [
      "Calculator-Active (Part A: Q1–Q2)",
      "No-Calculator (Part B: Q3–Q6)"
    ],
    "categories_ar": [
      "تتطلب آلة حاسبة (الجزء أ: السؤلان 1–2)",
      "بدون آلة حاسبة (الجزء ب: الأسئلة 3–6)"
    ],
    "items": [
      {
        "s": "Rate In / Rate Out with non-elementary transcendental rate models",
        "s_ar": "معدل الدخول والخروج بنماذج معدلات متسامية غير أولية",
        "cat": 0
      },
      {
        "s": "Area & volume with non-polynomial boundary intersection finding",
        "s_ar": "المساحة والحجم مع إيجاد نقاط تقاطع حدود غير متعددة الحدود",
        "cat": 0
      },
      {
        "s": "Slope field sketching and separable differential equation solving",
        "s_ar": "رسم حقول الميل وحل المعادلات التفاضلية القابلة للفصل",
        "cat": 1
      },
      {
        "s": "Analysis of accumulation function g(x) = ∫ f(t) dt from a geometric piece graph",
        "s_ar": "تحليل دالة التراكم g(x) = ∫ f(t) dt من رسم بياني لقطع هندسية",
        "cat": 1
      }
    ],
    "sol": "Questions 1 and 2 require numerical integration and equation solving on a graphing calculator; Questions 3 through 6 test analytical and geometric calculus by hand.",
    "sol_ar": "يتطلب السؤالان 1 و2 تكاملاً عددياً وحل معادلات بالآلة البيانية؛ بينما تختبر الأسئلة 3 إلى 6 التفاضل والتكامل التحليلي والهندسي يدوياً."
  },
  {
    "t": "se",
    "ti": "Spot the Error: Implicit Differentiation & Product Rule (AP Calculus AB Free-Response Questions (FRQs))",
    "q": "A student differentiates the implicit curve \\(x^2 + 4xy + y^2 = 10\\) with respect to \\(x\\). Identify the step with the mathematical flaw:",
    "steps": [
      "Differentiate \\(x^2\\) with respect to \\(x\\) to obtain \\(2x\\).",
      "Differentiate the middle term \\(4xy\\) with respect to \\(x\\) as \\(4\\dfrac{dy}{dx}\\).",
      "Differentiate \\(y^2\\) using the Chain Rule as \\(2y\\dfrac{dy}{dx}\\) and the constant \\(10\\) as \\(0\\).",
      "Collect \\(\\dfrac{dy}{dx}\\) terms and divide to isolate \\(\\dfrac{dy}{dx}\\)."
    ],
    "errorStep": 2,
    "reasons": [
      "The term \\(4xy\\) is a product of two functions of \\(x\\); by the Product Rule its derivative is \\(4y + 4x\\dfrac{dy}{dx}\\), not \\(4\\dfrac{dy}{dx}\\).",
      "The derivative of \\(y^2\\) with respect to \\(x\\) is simply \\(2y\\) without \\(\\dfrac{dy}{dx}\\).",
      "The constant \\(10\\) remains \\(10\\) after differentiation."
    ],
    "correctReason": 0,
    "h": "Look closely at how the product \\(4xy\\) was differentiated in Step 2.",
    "sol": "Applying the Product Rule to \\(4xy\\) gives \\(4y + 4x\\dfrac{dy}{dx}\\). Thus \\(2x + 4y + (4x + 2y)\\dfrac{dy}{dx} = 0 \\implies \\dfrac{dy}{dx} = -\\dfrac{2x + 4y}{4x + 2y}\\).",
    "ti_ar": "اكتشف الخطأ: الاشتقاق الضمني وقاعدة الضرب (AP Calculus AB Free-Response Questions (FRQs))",
    "q_ar": "يقوم طالب باشتقاق العلاقة الضمنية \\(x^2 + 4xy + y^2 = 10\\) بالنسبة إلى \\(x\\). حدد الخطوة الخاطئة:",
    "steps_ar": [
      "اشتقاق \\(x^2\\) بالنسبة إلى \\(x\\) ليعطي \\(2x\\).",
      "اشتقاق الحد الأوسط \\(4xy\\) بالنسبة إلى \\(x\\) على أنه \\(4\\dfrac{dy}{dx}\\).",
      "اشتقاق \\(y^2\\) بقاعدة السلسلة ليعطي \\(2y\\dfrac{dy}{dx}\\) ومشتقة الثابت \\(0\\).",
      "تجميع حدود \\(\\dfrac{dy}{dx}\\) وقسمة الطرفين لعزل المشتقة."
    ],
    "reasons_ar": [
      "الحد \\(4xy\\) حاصل ضرب دالتين في \\(x\\)؛ وبقاعدة الضرب مشتقته هي \\(4y + 4x\\dfrac{dy}{dx}\\).",
      "مشتقة \\(y^2\\) هي \\(2y\\) فقط دون \\(\\dfrac{dy}{dx}\\).",
      "مشتقة الثابت تبقى كما هي."
    ],
    "h_ar": "راجع كيفية اشتقاق حاصل الضرب \\(4xy\\) في الخطوة الثانية.",
    "sol_ar": "بتطبيق قاعدة الضرب على \\(4xy\\) نحصل على \\(4y + 4x\\dfrac{dy}{dx}\\)، ومنه \\(\\dfrac{dy}{dx} = -\\dfrac{2x + 4y}{4x + 2y}\\)."
  },
  {
    "t": "ms",
    "ti": "Examiner Mode: Tangent, Normal & Stationary Points (AP Calculus AB Free-Response Questions (FRQs))",
    "q": "Consider the curve \\(y = 4x^3 - 2x^2 + 4\\). (a) Find \\(\\dfrac{dy}{dx}\\) and the gradient of the tangent at \\(x = 0\\). (b) Find the \\(x\\)-coordinates of the stationary points.",
    "parts": [
      {
        "label": "Part (a) — First Derivative & Tangent Gradient",
        "marks": 3,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "Differentiate term by term using the power rule: \\(\\dfrac{dy}{dx} = 12x^2 - 4x\\)."
          },
          {
            "code": "M1",
            "marks": 1,
            "text": "Substitute \\(x = 0\\): \\(m = 12(0)^2 - 4(0)\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "Obtain exact tangent gradient \\(m = -4\\)."
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
            "text": "Set \\(\\dfrac{dy}{dx} = 0 \\implies x(12x - 4) = 0\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "State both stationary \\(x\\)-coordinates: \\(x = 0\\) and \\(x = \\dfrac{4}{12}\\)."
          }
        ]
      }
    ],
    "examinerTip": "Always show the explicit equation \\(\\dfrac{dy}{dx} = 0\\) before solving for stationary points—this earns the M1 method mark even if an arithmetic slip occurs.",
    "ti_ar": "وضع المصحح: المماس والنقاط الحرجة (AP Calculus AB Free-Response Questions (FRQs))",
    "q_ar": "لمنحنى الدالة \\(y = 4x^3 - 2x^2 + 4\\): (أ) أوجد \\(\\dfrac{dy}{dx}\\) وميل المماس عند \\(x = 0\\). (ب) أوجد الإحداثيات السينية للنقاط الحرجة.",
    "examinerTip_ar": "اكتب دائماً شرط النقطة الحرجة \\(\\dfrac{dy}{dx} = 0\\) صراحةً لضمان الحصول على درجة الطريقة (M1)."
  },
  {
    "t": "sb",
    "ti": "Step Builder: Instantaneous Rate of Change (AP Calculus AB Free-Response Questions (FRQs))",
    "steps": [
      {
        "l": "Given \\(f(x) = 4x^2 + 2x - 5\\), find the coefficient of \\(x\\) in \\(f'(x)\\):",
        "a": "8",
        "h": "Multiply power 2 by 4."
      },
      {
        "l": "Find the constant term in \\(f'(x)\\):",
        "a": "2",
        "h": "The derivative of 2x is 2."
      },
      {
        "l": "Evaluate the instantaneous rate of change \\(f'(0) =\\)",
        "a": "2",
        "h": "Compute 8(0) + 2."
      }
    ],
    "ti_ar": "بناء الخطوات: حساب المشتقة ومعدل التغير اللحظي (AP Calculus AB Free-Response Questions (FRQs))",
    "steps_ar": [
      {
        "l": "للدالة \\(f(x) = 4x^2 + 2x - 5\\)، معامل \\(x\\) في \\(f'(x)\\) يساوي:",
        "a": "8",
        "h": "اضرب الأس 2 في 4."
      },
      {
        "l": "الحد الثابت في المشتقة \\(f'(x)\\) يساوي:",
        "a": "2",
        "h": "مشتقة 2x هي 2."
      },
      {
        "l": "احسب قيمة المشتقة \\(f'(0) =\\)",
        "a": "2",
        "h": "احسب 8(0) + 2."
      }
    ]
  },
  {
    "t": "mt",
    "ti": "Matching: Differentiation Rules & Analytic Criteria (AP Calculus AB Free-Response Questions (FRQs))",
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
    "ti_ar": "مطابقة: قواعد الاشتقاق ومعايير القيم القصوى (AP Calculus AB Free-Response Questions (FRQs))",
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

D["apab-u1"] = [
  {
    "t": "qc",
    "ti": "Quick Check: Limits",
    "ti_ar": "فحص سريع: النهايات",
    "q": "\\(\\displaystyle\\lim_{x\\to 2}\\frac{x^2-4}{x-2}=\\)",
    "q_ar": "\\(\\displaystyle\\lim_{x\\to 2}\\frac{x^2-4}{x-2}=\\)",
    "o": [
      "0",
      "2",
      "4",
      "undefined"
    ],
    "o_ar": [
      "0",
      "2",
      "4",
      "غير معرفة"
    ],
    "a": 2,
    "ex": "Factor: \\(\\frac{(x+2)(x-2)}{x-2}=x+2\\to4\\).",
    "ex_ar": "التحليل إلى عوامل: \\(\\frac{(x+2)(x-2)}{x-2}=x+2\\to4\\)."
  },
  {
    "t": "num",
    "ti": "Evaluate Limit with Indeterminate Form",
    "ti_ar": "حساب نهاية بصيغة غير معينة",
    "q": "Evaluate \\(\\displaystyle\\lim_{x\\to 3}\\frac{x^2 - 9}{x - 3}\\).",
    "q_ar": "احسب قيمة النهاية \\(\\displaystyle\\lim_{x\\to 3}\\frac{x^2 - 9}{x - 3}\\).",
    "a": 6,
    "tol": 0.001,
    "h": "Factor the numerator as a difference of squares: \\((x-3)(x+3)\\).",
    "h_ar": "حلل البسط كفرق بين مربعين: \\((x-3)(x+3)\\).",
    "sol": "\\(\\frac{(x-3)(x+3)}{x-3} = x+3\\). As \\(x\\to 3\\), \\(3+3 = 6\\).",
    "sol_ar": "\\(\\frac{(x-3)(x+3)}{x-3} = x+3\\). عندما \\(x\\to 3\\)، نحصل على \\(3+3 = 6\\)."
  },
  {
    "t": "sr",
    "ti": "Worked Example: L'Hôpital's Rule",
    "ti_ar": "مثال محلول: قاعدة لوبيتال",
    "steps": [
      "Evaluate \\(\\displaystyle\\lim_{x\\to0}\\dfrac{\\sin x}{x}\\). Direct substitution gives \\(\\frac00\\), an indeterminate form — L'Hôpital's Rule applies.",
      "Differentiate numerator and denominator separately: \\(\\dfrac{\\cos x}{1}\\).",
      "Evaluate at \\(x=0\\): \\(\\cos(0)=1\\).",
      "So \\(\\displaystyle\\lim_{x\\to0}\\dfrac{\\sin x}{x}=1\\)."
    ],
    "steps_ar": [
      "احسب \\(\\displaystyle\\lim_{x\\to0}\\dfrac{\\sin x}{x}\\). يعطي التعويض المباشر \\(\\frac00\\)، وهي صيغة غير معينة — تنطبق قاعدة لوبيتال.",
      "اشتق البسط والمقام كلّاً على حدة: \\(\\dfrac{\\cos x}{1}\\).",
      "احسب القيمة عند \\(x=0\\): \\(\\cos(0)=1\\).",
      "إذن \\(\\displaystyle\\lim_{x\\to0}\\dfrac{\\sin x}{x}=1\\)."
    ]
  },
  {
    "t": "ord",
    "ti": "Order the Steps: Proving a Root via Intermediate Value Theorem (IVT)",
    "ti_ar": "ترتيب الخطوات: إثبات وجود جذر بنظرية القيمة المتوسطة (IVT)",
    "q": "Arrange the steps to prove that \\(f(x) = x^3 - 2\\) has a zero on \\([1, 2]\\):",
    "q_ar": "رتب خطوات إثبات أن للدالة \\(f(x) = x^3 - 2\\) صفراً (جذراً) على الفترة \\([1, 2]\\):",
    "items": [
      "State that \\(f(x) = x^3 - 2\\) is a polynomial and therefore continuous on \\([1, 2]\\)",
      "Evaluate \\(f\\) at the left endpoint: \\(f(1) = 1 - 2 = -1 < 0\\)",
      "Evaluate \\(f\\) at the right endpoint: \\(f(2) = 8 - 2 = 6 > 0\\)",
      "Note that \\(0\\) lies strictly between \\(f(1)\\) and \\(f(2)\\)",
      "Conclude by IVT that there exists \\(c \\in (1, 2)\\) such that \\(f(c) = 0\\)"
    ],
    "items_ar": [
      "ذكر أن \\(f(x) = x^3 - 2\\) كثيرة حدود وبالتالي فهي متصلة على \\([1, 2]\\)",
      "حساب قيمة \\(f\\) عند الطرف الأيسر: \\(f(1) = 1 - 2 = -1 < 0\\)",
      "حساب قيمة \\(f\\) عند الطرف الأيمن: \\(f(2) = 8 - 2 = 6 > 0\\)",
      "ملاحظة أن العدد \\(0\\) يقع بين \\(f(1)\\) و\\(f(2)\\)",
      "الاستنتاج بنظرية القيمة المتوسطة (IVT) أنه يوجد عدد \\(c \\in (1, 2)\\) بحيث \\(f(c) = 0\\)"
    ],
    "sol": "IVT requires explicitly establishing continuity on the closed interval, verifying the sign change, and concluding existence of \\(c\\).",
    "sol_ar": "تتطلب نظرية القيمة المتوسطة صراحة إثبات الاتصال على الفترة المغلقة، والتحقق من تغير الإشارة، واستنتاج وجود \\(c\\)."
  },
  {
    "t": "cat",
    "ti": "Classify Discontinuities at \\(x = 0\\)",
    "ti_ar": "تصنيف نقاط الانفصال عند \\(x = 0\\)",
    "categories": [
      "Removable Discontinuity",
      "Non-Removable / Infinite / Jump"
    ],
    "categories_ar": [
      "انفصال قابل للإزالة (فجوة)",
      "انفصال غير قابل للإزالة / لانهائي / قفزي"
    ],
    "items": [
      {
        "s": "\\(f(x) = \\dfrac{x^2 - 2x}{x}\\)",
        "s_ar": "\\(f(x) = \\dfrac{x^2 - 2x}{x}\\)",
        "cat": 0
      },
      {
        "s": "\\(f(x) = \\dfrac{\\sin x}{x}\\)",
        "s_ar": "\\(f(x) = \\dfrac{\\sin x}{x}\\)",
        "cat": 0
      },
      {
        "s": "\\(f(x) = \\dfrac{1}{x}\\)",
        "s_ar": "\\(f(x) = \\dfrac{1}{x}\\)",
        "cat": 1
      },
      {
        "s": "\\(f(x) = \\dfrac{|x|}{x}\\)",
        "s_ar": "\\(f(x) = \\dfrac{|x|}{x}\\)",
        "cat": 1
      }
    ],
    "sol": "\\(\\dfrac{x^2-2x}{x}\\) has limit \\(-2\\) and \\(\\dfrac{\\sin x}{x}\\) has limit \\(1\\) (both removable holes); \\(\\dfrac{1}{x}\\) has an infinite asymptote and \\(\\dfrac{|x|}{x}\\) has a jump discontinuity.",
    "sol_ar": "\\(\\dfrac{x^2-2x}{x}\\) لها نهاية \\(-2\\) و\\(\\dfrac{\\sin x}{x}\\) لها نهاية \\(1\\) (كلاهما فجوات قابلة للإزالة)؛ أما \\(\\dfrac{1}{x}\\) فلها خط تقارب لانهائي و\\(\\dfrac{|x|}{x}\\) لها انفصال قفزي."
  },
  {
    "t": "se",
    "ti": "Spot the Error: Implicit Differentiation & Product Rule (Unit 1 · Limits & Continuity)",
    "q": "A student differentiates the implicit curve \\(x^2 + 3xy + y^2 = 5\\) with respect to \\(x\\). Identify the step with the mathematical flaw:",
    "steps": [
      "Differentiate \\(x^2\\) with respect to \\(x\\) to obtain \\(2x\\).",
      "Differentiate the middle term \\(3xy\\) with respect to \\(x\\) as \\(3\\dfrac{dy}{dx}\\).",
      "Differentiate \\(y^2\\) using the Chain Rule as \\(2y\\dfrac{dy}{dx}\\) and the constant \\(5\\) as \\(0\\).",
      "Collect \\(\\dfrac{dy}{dx}\\) terms and divide to isolate \\(\\dfrac{dy}{dx}\\)."
    ],
    "errorStep": 2,
    "reasons": [
      "The term \\(3xy\\) is a product of two functions of \\(x\\); by the Product Rule its derivative is \\(3y + 3x\\dfrac{dy}{dx}\\), not \\(3\\dfrac{dy}{dx}\\).",
      "The derivative of \\(y^2\\) with respect to \\(x\\) is simply \\(2y\\) without \\(\\dfrac{dy}{dx}\\).",
      "The constant \\(5\\) remains \\(5\\) after differentiation."
    ],
    "correctReason": 0,
    "h": "Look closely at how the product \\(3xy\\) was differentiated in Step 2.",
    "sol": "Applying the Product Rule to \\(3xy\\) gives \\(3y + 3x\\dfrac{dy}{dx}\\). Thus \\(2x + 3y + (3x + 2y)\\dfrac{dy}{dx} = 0 \\implies \\dfrac{dy}{dx} = -\\dfrac{2x + 3y}{3x + 2y}\\).",
    "ti_ar": "اكتشف الخطأ: الاشتقاق الضمني وقاعدة الضرب (Unit 1 · Limits & Continuity)",
    "q_ar": "يقوم طالب باشتقاق العلاقة الضمنية \\(x^2 + 3xy + y^2 = 5\\) بالنسبة إلى \\(x\\). حدد الخطوة الخاطئة:",
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
    "ti": "Examiner Mode: Tangent, Normal & Stationary Points (Unit 1 · Limits & Continuity)",
    "q": "Consider the curve \\(y = 3x^3 - x^2 + 4\\). (a) Find \\(\\dfrac{dy}{dx}\\) and the gradient of the tangent at \\(x = 2\\). (b) Find the \\(x\\)-coordinates of the stationary points.",
    "parts": [
      {
        "label": "Part (a) — First Derivative & Tangent Gradient",
        "marks": 3,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "Differentiate term by term using the power rule: \\(\\dfrac{dy}{dx} = 9x^2 - 2x\\)."
          },
          {
            "code": "M1",
            "marks": 1,
            "text": "Substitute \\(x = 2\\): \\(m = 9(2)^2 - 2(2)\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "Obtain exact tangent gradient \\(m = 34\\)."
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
            "text": "Set \\(\\dfrac{dy}{dx} = 0 \\implies x(9x - 2) = 0\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "State both stationary \\(x\\)-coordinates: \\(x = 0\\) and \\(x = \\dfrac{2}{9}\\)."
          }
        ]
      }
    ],
    "examinerTip": "Always show the explicit equation \\(\\dfrac{dy}{dx} = 0\\) before solving for stationary points—this earns the M1 method mark even if an arithmetic slip occurs.",
    "ti_ar": "وضع المصحح: المماس والنقاط الحرجة (Unit 1 · Limits & Continuity)",
    "q_ar": "لمنحنى الدالة \\(y = 3x^3 - x^2 + 4\\): (أ) أوجد \\(\\dfrac{dy}{dx}\\) وميل المماس عند \\(x = 2\\). (ب) أوجد الإحداثيات السينية للنقاط الحرجة.",
    "examinerTip_ar": "اكتب دائماً شرط النقطة الحرجة \\(\\dfrac{dy}{dx} = 0\\) صراحةً لضمان الحصول على درجة الطريقة (M1)."
  },
  {
    "t": "sb",
    "ti": "Step Builder: Instantaneous Rate of Change (Unit 1 · Limits & Continuity)",
    "steps": [
      {
        "l": "Given \\(f(x) = 3x^2 + x - 5\\), find the coefficient of \\(x\\) in \\(f'(x)\\):",
        "a": "6",
        "h": "Multiply power 2 by 3."
      },
      {
        "l": "Find the constant term in \\(f'(x)\\):",
        "a": "1",
        "h": "The derivative of x is 1."
      },
      {
        "l": "Evaluate the instantaneous rate of change \\(f'(2) =\\)",
        "a": "13",
        "h": "Compute 6(2) + 1."
      }
    ],
    "ti_ar": "بناء الخطوات: حساب المشتقة ومعدل التغير اللحظي (Unit 1 · Limits & Continuity)",
    "steps_ar": [
      {
        "l": "للدالة \\(f(x) = 3x^2 + x - 5\\)، معامل \\(x\\) في \\(f'(x)\\) يساوي:",
        "a": "6",
        "h": "اضرب الأس 2 في 3."
      },
      {
        "l": "الحد الثابت في المشتقة \\(f'(x)\\) يساوي:",
        "a": "1",
        "h": "مشتقة x هي 1."
      },
      {
        "l": "احسب قيمة المشتقة \\(f'(2) =\\)",
        "a": "13",
        "h": "احسب 6(2) + 1."
      }
    ]
  },
  {
    "t": "mt",
    "ti": "Matching: Differentiation Rules & Analytic Criteria (Unit 1 · Limits & Continuity)",
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
    "ti_ar": "مطابقة: قواعد الاشتقاق ومعايير القيم القصوى (Unit 1 · Limits & Continuity)",
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

D["apab-u2"] = [
  {
    "t": "mt",
    "ti": "Matching: Trig Derivatives",
    "ti_ar": "مطابقة: مشتقات الدوال المثلثية",
    "p": [
      {
        "l": "\\(\\frac{d}{dx}\\sin x\\)",
        "r": "cos x"
      },
      {
        "l": "\\(\\frac{d}{dx}\\cos x\\)",
        "r": "−sin x"
      },
      {
        "l": "\\(\\frac{d}{dx}\\tan x\\)",
        "r": "sec²x"
      },
      {
        "l": "\\(\\frac{d}{dx}\\ln x\\)",
        "r": "1/x"
      }
    ],
    "p_ar": [
      {
        "l": "\\(\\frac{d}{dx}\\sin x\\)",
        "r": "cos x"
      },
      {
        "l": "\\(\\frac{d}{dx}\\cos x\\)",
        "r": "−sin x"
      },
      {
        "l": "\\(\\frac{d}{dx}\\tan x\\)",
        "r": "sec²x"
      },
      {
        "l": "\\(\\frac{d}{dx}\\ln x\\)",
        "r": "1/x"
      }
    ]
  },
  {
    "t": "num",
    "ti": "Find Derivative at a Point",
    "ti_ar": "إيجاد المشتقة عند نقطة",
    "q": "Given \\(f(x) = 2x^3 - 5x + 4\\), find \\(f'(2)\\).",
    "q_ar": "إذا كانت \\(f(x) = 2x^3 - 5x + 4\\)، فأوجد \\(f'(2)\\).",
    "a": 19,
    "tol": 0.001,
    "h": "Find \\(f'(x) = 6x^2 - 5\\), then evaluate at \\(x = 2\\).",
    "h_ar": "أوجد أولاً \\(f'(x) = 6x^2 - 5\\)، ثم احسب القيمة عند \\(x = 2\\).",
    "sol": "\\(f'(2) = 6(2)^2 - 5 = 6(4) - 5 = 19\\).",
    "sol_ar": "\\(f'(2) = 6(2)^2 - 5 = 6(4) - 5 = 19\\)."
  },
  {
    "t": "qc",
    "ti": "Quick Check: Product Rule",
    "ti_ar": "فحص سريع: قاعدة ضرب دالتين",
    "q": "Differentiate \\(f(x)=x^3\\cos x\\):",
    "q_ar": "اشتق الدالة \\(f(x)=x^3\\cos x\\):",
    "o": [
      "\\(3x^2\\cos x - x^3\\sin x\\)",
      "\\(3x^2\\cos x + x^3\\sin x\\)",
      "\\(-3x^2\\sin x\\)",
      "\\(3x^2-\\sin x\\)"
    ],
    "o_ar": [
      "\\(3x^2\\cos x - x^3\\sin x\\)",
      "\\(3x^2\\cos x + x^3\\sin x\\)",
      "\\(-3x^2\\sin x\\)",
      "\\(3x^2-\\sin x\\)"
    ],
    "a": 0,
    "ex": "Product rule: \\((uv)' = u'v + uv' = (3x^2)(\\cos x) + (x^3)(-\\sin x) = 3x^2\\cos x - x^3\\sin x\\).",
    "ex_ar": "قاعدة الضرب: \\((uv)' = u'v + uv' = (3x^2)(\\cos x) + (x^3)(-\\sin x) = 3x^2\\cos x - x^3\\sin x\\)."
  },
  {
    "t": "ord",
    "ti": "Order the Steps: Quotient Rule Differentiation",
    "ti_ar": "ترتيب الخطوات: الاشتقاق بقاعدة قسمة دالتين",
    "q": "Arrange the steps to differentiate \\(f(x) = \\dfrac{2x - 1}{x^2 + 3}\\):",
    "q_ar": "رتب خطوات اشتقاق الدالة \\(f(x) = \\dfrac{2x - 1}{x^2 + 3}\\):",
    "items": [
      "Identify \\(u = 2x - 1\\) and \\(v = x^2 + 3\\)",
      "Compute individual derivatives: \\(u' = 2\\) and \\(v' = 2x\\)",
      "Apply quotient rule formula: \\(\\dfrac{u'v - uv'}{v^2}\\)",
      "Substitute: \\(\\dfrac{2(x^2 + 3) - (2x - 1)(2x)}{(x^2 + 3)^2}\\)",
      "Expand and simplify numerator: \\(\\dfrac{-2x^2 + 2x + 6}{(x^2 + 3)^2}\\)"
    ],
    "items_ar": [
      "تحديد \\(u = 2x - 1\\) و \\(v = x^2 + 3\\)",
      "حساب المشتقات الفردية: \\(u' = 2\\) و \\(v' = 2x\\)",
      "تطبيق صيغة قاعدة القسمة: \\(\\dfrac{u'v - uv'}{v^2}\\)",
      "التعويض: \\(\\dfrac{2(x^2 + 3) - (2x - 1)(2x)}{(x^2 + 3)^2}\\)",
      "فك الأقواس وتبسيط البسط: \\(\\dfrac{-2x^2 + 2x + 6}{(x^2 + 3)^2}\\)"
    ],
    "sol": "Low d-high minus high d-low over the square of what is below.",
    "sol_ar": "المقام في مشتقة البسط ناقص البسط في مشتقة المقام على مربع المقام."
  },
  {
    "t": "cat",
    "ti": "Classify Differentiability at \\(x = 0\\)",
    "ti_ar": "تصنيف قابلية الاشتقاق عند \\(x = 0\\)",
    "categories": [
      "Differentiable at \\(x = 0\\)",
      "Not Differentiable at \\(x = 0\\)"
    ],
    "categories_ar": [
      "قابلة للاشتقاق عند \\(x = 0\\)",
      "غير قابلة للاشتقاق عند \\(x = 0\\)"
    ],
    "items": [
      {
        "s": "\\(f(x) = x^2\\)",
        "s_ar": "\\(f(x) = x^2\\)",
        "cat": 0
      },
      {
        "s": "\\(f(x) = \\sin x\\)",
        "s_ar": "\\(f(x) = \\sin x\\)",
        "cat": 0
      },
      {
        "s": "\\(f(x) = |x|\\) (sharp corner)",
        "s_ar": "\\(f(x) = |x|\\) (رأس حاد / زاوية)",
        "cat": 1
      },
      {
        "s": "\\(f(x) = x^{1/3}\\) (vertical tangent)",
        "s_ar": "\\(f(x) = x^{1/3}\\) (مماس رأسي)",
        "cat": 1
      }
    ],
    "sol": "Smooth curves with finite slopes are differentiable; corners, cusps, and vertical tangents fail to have a derivative.",
    "sol_ar": "المنحنيات الملساء ذات الميول المنتهية قابلة للاشتقاق؛ بينما الرؤوس الحادة والنتوءات والمماسات الرأسية تفشل في امتلاك مشتقة."
  },
  {
    "t": "se",
    "ti": "Spot the Error: Implicit Differentiation & Product Rule (Unit 2 · Differentiation — Definition and Fundamental Properties)",
    "q": "A student differentiates the implicit curve \\(x^2 + 4xy + y^2 = 5\\) with respect to \\(x\\). Identify the step with the mathematical flaw:",
    "steps": [
      "Differentiate \\(x^2\\) with respect to \\(x\\) to obtain \\(2x\\).",
      "Differentiate the middle term \\(4xy\\) with respect to \\(x\\) as \\(4\\dfrac{dy}{dx}\\).",
      "Differentiate \\(y^2\\) using the Chain Rule as \\(2y\\dfrac{dy}{dx}\\) and the constant \\(5\\) as \\(0\\).",
      "Collect \\(\\dfrac{dy}{dx}\\) terms and divide to isolate \\(\\dfrac{dy}{dx}\\)."
    ],
    "errorStep": 2,
    "reasons": [
      "The term \\(4xy\\) is a product of two functions of \\(x\\); by the Product Rule its derivative is \\(4y + 4x\\dfrac{dy}{dx}\\), not \\(4\\dfrac{dy}{dx}\\).",
      "The derivative of \\(y^2\\) with respect to \\(x\\) is simply \\(2y\\) without \\(\\dfrac{dy}{dx}\\).",
      "The constant \\(5\\) remains \\(5\\) after differentiation."
    ],
    "correctReason": 0,
    "h": "Look closely at how the product \\(4xy\\) was differentiated in Step 2.",
    "sol": "Applying the Product Rule to \\(4xy\\) gives \\(4y + 4x\\dfrac{dy}{dx}\\). Thus \\(2x + 4y + (4x + 2y)\\dfrac{dy}{dx} = 0 \\implies \\dfrac{dy}{dx} = -\\dfrac{2x + 4y}{4x + 2y}\\).",
    "ti_ar": "اكتشف الخطأ: الاشتقاق الضمني وقاعدة الضرب (Unit 2 · Differentiation — Definition and Fundamental Properties)",
    "q_ar": "يقوم طالب باشتقاق العلاقة الضمنية \\(x^2 + 4xy + y^2 = 5\\) بالنسبة إلى \\(x\\). حدد الخطوة الخاطئة:",
    "steps_ar": [
      "اشتقاق \\(x^2\\) بالنسبة إلى \\(x\\) ليعطي \\(2x\\).",
      "اشتقاق الحد الأوسط \\(4xy\\) بالنسبة إلى \\(x\\) على أنه \\(4\\dfrac{dy}{dx}\\).",
      "اشتقاق \\(y^2\\) بقاعدة السلسلة ليعطي \\(2y\\dfrac{dy}{dx}\\) ومشتقة الثابت \\(0\\).",
      "تجميع حدود \\(\\dfrac{dy}{dx}\\) وقسمة الطرفين لعزل المشتقة."
    ],
    "reasons_ar": [
      "الحد \\(4xy\\) حاصل ضرب دالتين في \\(x\\)؛ وبقاعدة الضرب مشتقته هي \\(4y + 4x\\dfrac{dy}{dx}\\).",
      "مشتقة \\(y^2\\) هي \\(2y\\) فقط دون \\(\\dfrac{dy}{dx}\\).",
      "مشتقة الثابت تبقى كما هي."
    ],
    "h_ar": "راجع كيفية اشتقاق حاصل الضرب \\(4xy\\) في الخطوة الثانية.",
    "sol_ar": "بتطبيق قاعدة الضرب على \\(4xy\\) نحصل على \\(4y + 4x\\dfrac{dy}{dx}\\)، ومنه \\(\\dfrac{dy}{dx} = -\\dfrac{2x + 4y}{4x + 2y}\\)."
  },
  {
    "t": "ms",
    "ti": "Examiner Mode: Tangent, Normal & Stationary Points (Unit 2 · Differentiation — Definition and Fundamental Properties)",
    "q": "Consider the curve \\(y = 4x^3 - x^2 + 4\\). (a) Find \\(\\dfrac{dy}{dx}\\) and the gradient of the tangent at \\(x = 2\\). (b) Find the \\(x\\)-coordinates of the stationary points.",
    "parts": [
      {
        "label": "Part (a) — First Derivative & Tangent Gradient",
        "marks": 3,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "Differentiate term by term using the power rule: \\(\\dfrac{dy}{dx} = 12x^2 - 2x\\)."
          },
          {
            "code": "M1",
            "marks": 1,
            "text": "Substitute \\(x = 2\\): \\(m = 12(2)^2 - 2(2)\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "Obtain exact tangent gradient \\(m = 46\\)."
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
            "text": "Set \\(\\dfrac{dy}{dx} = 0 \\implies x(12x - 2) = 0\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "State both stationary \\(x\\)-coordinates: \\(x = 0\\) and \\(x = \\dfrac{2}{12}\\)."
          }
        ]
      }
    ],
    "examinerTip": "Always show the explicit equation \\(\\dfrac{dy}{dx} = 0\\) before solving for stationary points—this earns the M1 method mark even if an arithmetic slip occurs.",
    "ti_ar": "وضع المصحح: المماس والنقاط الحرجة (Unit 2 · Differentiation — Definition and Fundamental Properties)",
    "q_ar": "لمنحنى الدالة \\(y = 4x^3 - x^2 + 4\\): (أ) أوجد \\(\\dfrac{dy}{dx}\\) وميل المماس عند \\(x = 2\\). (ب) أوجد الإحداثيات السينية للنقاط الحرجة.",
    "examinerTip_ar": "اكتب دائماً شرط النقطة الحرجة \\(\\dfrac{dy}{dx} = 0\\) صراحةً لضمان الحصول على درجة الطريقة (M1)."
  },
  {
    "t": "sb",
    "ti": "Step Builder: Instantaneous Rate of Change (Unit 2 · Differentiation — Definition and Fundamental Properties)",
    "steps": [
      {
        "l": "Given \\(f(x) = 4x^2 + x - 5\\), find the coefficient of \\(x\\) in \\(f'(x)\\):",
        "a": "8",
        "h": "Multiply power 2 by 4."
      },
      {
        "l": "Find the constant term in \\(f'(x)\\):",
        "a": "1",
        "h": "The derivative of x is 1."
      },
      {
        "l": "Evaluate the instantaneous rate of change \\(f'(2) =\\)",
        "a": "17",
        "h": "Compute 8(2) + 1."
      }
    ],
    "ti_ar": "بناء الخطوات: حساب المشتقة ومعدل التغير اللحظي (Unit 2 · Differentiation — Definition and Fundamental Properties)",
    "steps_ar": [
      {
        "l": "للدالة \\(f(x) = 4x^2 + x - 5\\)، معامل \\(x\\) في \\(f'(x)\\) يساوي:",
        "a": "8",
        "h": "اضرب الأس 2 في 4."
      },
      {
        "l": "الحد الثابت في المشتقة \\(f'(x)\\) يساوي:",
        "a": "1",
        "h": "مشتقة x هي 1."
      },
      {
        "l": "احسب قيمة المشتقة \\(f'(2) =\\)",
        "a": "17",
        "h": "احسب 8(2) + 1."
      }
    ]
  }
];

D["apab-u3"] = [
  {
    "t": "tf",
    "ti": "True or False: Chain & Implicit",
    "ti_ar": "صح أم خطأ: قاعدة السلسلة والاشتقاق الضمني",
    "items": [
      {
        "s": "\\(\\frac{d}{dx}[f(g(x))]=f'(g(x))\\cdot g'(x)\\)",
        "s_ar": "\\(\\frac{d}{dx}[f(g(x))]=f'(g(x))\\cdot g'(x)\\)",
        "a": true,
        "ex": "Chain Rule.",
        "ex_ar": "قاعدة السلسلة."
      },
      {
        "s": "\\(\\frac{d}{dx}[f(g(x))]=f'(x)\\cdot g'(x)\\)",
        "s_ar": "\\(\\frac{d}{dx}[f(g(x))]=f'(x)\\cdot g'(x)\\)",
        "a": false,
        "ex": "Must evaluate \\(f'\\) at \\(g(x)\\).",
        "ex_ar": "يجب حساب \\(f'\\) عند \\(g(x)\\)."
      },
      {
        "s": "For \\(x^2+y^2=1\\): \\(\\frac{dy}{dx}=-\\frac{x}{y}\\)",
        "s_ar": "بالنسبة إلى \\(x^2+y^2=1\\): \\(\\frac{dy}{dx}=-\\frac{x}{y}\\)",
        "a": true,
        "ex": "Implicit diff: \\(2x+2y\\frac{dy}{dx}=0\\).",
        "ex_ar": "التفاضل الضمني: \\(2x+2y\\frac{dy}{dx}=0\\)."
      },
      {
        "s": "\\((f^{-1})'(a)=f'(a)\\)",
        "s_ar": "\\((f^{-1})'(a)=f'(a)\\)",
        "a": false,
        "ex": "\\((f^{-1})'(a)=\\frac{1}{f'(f^{-1}(a))}\\).",
        "ex_ar": "\\((f^{-1})'(a)=\\frac{1}{f'(f^{-1}(a))}\\)."
      }
    ]
  },
  {
    "t": "ord",
    "ti": "Order the Steps: Implicit Differentiation",
    "ti_ar": "ترتيب الخطوات: الاشتقاق الضمني",
    "q": "Arrange the steps to find \\(\\frac{dy}{dx}\\) for \\(x^2 + 3xy + y^2 = 11\\):",
    "q_ar": "رتب خطوات إيجاد \\(\\frac{dy}{dx}\\) للمعادلة \\(x^2 + 3xy + y^2 = 11\\):",
    "items": [
      "Differentiate both sides with respect to \\(x\\): \\(2x + \\frac{d}{dx}[3xy] + 2y\\frac{dy}{dx} = 0\\)",
      "Apply the product rule to \\(3xy\\): \\(2x + 3y + 3x\\frac{dy}{dx} + 2y\\frac{dy}{dx} = 0\\)",
      "Collect all terms containing \\(\\frac{dy}{dx}\\) on the left: \\((3x + 2y)\\frac{dy}{dx} = -2x - 3y\\)",
      "Solve for \\(\\frac{dy}{dx}\\): \\(\\frac{dy}{dx} = \\frac{-2x - 3y}{3x + 2y}\\)"
    ],
    "items_ar": [
      "اشتقاق الطرفين بالنسبة إلى \\(x\\): \\(2x + \\frac{d}{dx}[3xy] + 2y\\frac{dy}{dx} = 0\\)",
      "تطبيق قاعدة الضرب على الحد \\(3xy\\): \\(2x + 3y + 3x\\frac{dy}{dx} + 2y\\frac{dy}{dx} = 0\\)",
      "تجميع كل الحدود التي تحتوي على \\(\\frac{dy}{dx}\\) في الطرف الأيسر: \\((3x + 2y)\\frac{dy}{dx} = -2x - 3y\\)",
      "حل المعادلة لإيجاد \\(\\frac{dy}{dx}\\): \\(\\frac{dy}{dx} = \\frac{-2x - 3y}{3x + 2y}\\)"
    ],
    "sol": "Product rule on \\(3xy\\) produces \\(3y + 3x\\frac{dy}{dx}\\). Factoring \\(\\frac{dy}{dx}\\) isolates the derivative.",
    "sol_ar": "قاعدة الضرب على \\(3xy\\) تنتج \\(3y + 3x\\frac{dy}{dx}\\). إخراج \\(\\frac{dy}{dx}\\) كعامل مشترك يعزل المشتقة."
  },
  {
    "t": "sr",
    "ti": "Worked Example: Implicit Differentiation",
    "ti_ar": "مثال محلول: الاشتقاق الضمني",
    "steps": [
      "Find \\(\\dfrac{dy}{dx}\\) for \\(x^2+y^2=25\\). Differentiate both sides with respect to \\(x\\), remembering \\(y\\) is a function of \\(x\\): \\(2x+2y\\dfrac{dy}{dx}=0\\).",
      "Solve for \\(\\dfrac{dy}{dx}\\): \\(2y\\dfrac{dy}{dx}=-2x\\).",
      "\\(\\dfrac{dy}{dx}=-\\dfrac{x}{y}\\)."
    ],
    "steps_ar": [
      "أوجد \\(\\dfrac{dy}{dx}\\) للمعادلة \\(x^2+y^2=25\\). اشتق الطرفين بالنسبة إلى \\(x\\)، مع تذكر أن \\(y\\) دالة في \\(x\\): \\(2x+2y\\dfrac{dy}{dx}=0\\).",
      "حل المعادلة لإيجاد \\(\\dfrac{dy}{dx}\\): \\(2y\\dfrac{dy}{dx}=-2x\\).",
      "\\(\\dfrac{dy}{dx}=-\\dfrac{x}{y}\\)."
    ]
  },
  {
    "t": "num",
    "ti": "Composite Derivative Evaluation (Chain Rule)",
    "ti_ar": "حساب مشتقة دالة مركبة (قاعدة السلسلة)",
    "q": "If \\(f(2) = 5\\), \\(f'(2) = 4\\), \\(g(3) = 2\\), and \\(g'(3) = -6\\), find the value of \\((f \\circ g)'(3)\\).",
    "q_ar": "إذا كان \\(f(2) = 5\\)، و\\(f'(2) = 4\\)، و\\(g(3) = 2\\)، و\\(g'(3) = -6\\)، فاحسب قيمة \\((f \\circ g)'(3)\\).",
    "a": -24,
    "tol": 0.001,
    "h": "By the Chain Rule, \\((f \\circ g)'(3) = f'(g(3)) \\cdot g'(3)\\).",
    "h_ar": "وفق قاعدة السلسلة، \\((f \\circ g)'(3) = f'(g(3)) \\cdot g'(3)\\).",
    "sol": "\\((f \\circ g)'(3) = f'(2) \\cdot g'(3) = 4 \\cdot (-6) = -24\\).",
    "sol_ar": "\\((f \\circ g)'(3) = f'(2) \\cdot g'(3) = 4 \\cdot (-6) = -24\\)."
  },
  {
    "t": "cat",
    "ti": "Classify Differentiation Method",
    "ti_ar": "تصنيف طريقة الاشتقاق",
    "categories": [
      "Explicit Chain / Power Rule",
      "Implicit Differentiation Required"
    ],
    "categories_ar": [
      "قاعدة السلسلة / القوة الصريحة",
      "تتطلب اشتقاقاً ضمنياً"
    ],
    "items": [
      {
        "s": "\\(y = \\sin(3x^2 + 1)\\)",
        "s_ar": "\\(y = \\sin(3x^2 + 1)\\)",
        "cat": 0
      },
      {
        "s": "\\(y = (2x - 5)^4\\)",
        "s_ar": "\\(y = (2x - 5)^4\\)",
        "cat": 0
      },
      {
        "s": "\\(x^2 + 2xy + y^3 = 5\\)",
        "s_ar": "\\(x^2 + 2xy + y^3 = 5\\)",
        "cat": 1
      },
      {
        "s": "\\(\\sin(x + y) = y^2\\)",
        "s_ar": "\\(\\sin(x + y) = y^2\\)",
        "cat": 1
      }
    ],
    "sol": "Explicit functions where y is isolated use the standard chain rule; coupled relations with mixed x and y terms require implicit differentiation.",
    "sol_ar": "الدوال الصريحة التي تكون فيها y معزولة تستخدم قاعدة السلسلة القياسية؛ بينما العلاقات المترابطة ذات الحدود المختلطة من x وy تتطلب اشتقاقاً ضمنياً."
  },
  {
    "t": "se",
    "ti": "Spot the Error: Implicit Differentiation & Product Rule (Unit 3 · Differentiation — Composite, Implicit, and Inverse Functions)",
    "q": "A student differentiates the implicit curve \\(x^2 + 2xy + y^2 = -5\\) with respect to \\(x\\). Identify the step with the mathematical flaw:",
    "steps": [
      "Differentiate \\(x^2\\) with respect to \\(x\\) to obtain \\(2x\\).",
      "Differentiate the middle term \\(2xy\\) with respect to \\(x\\) as \\(2\\dfrac{dy}{dx}\\).",
      "Differentiate \\(y^2\\) using the Chain Rule as \\(2y\\dfrac{dy}{dx}\\) and the constant \\(-5\\) as \\(0\\).",
      "Collect \\(\\dfrac{dy}{dx}\\) terms and divide to isolate \\(\\dfrac{dy}{dx}\\)."
    ],
    "errorStep": 2,
    "reasons": [
      "The term \\(2xy\\) is a product of two functions of \\(x\\); by the Product Rule its derivative is \\(2y + 2x\\dfrac{dy}{dx}\\), not \\(2\\dfrac{dy}{dx}\\).",
      "The derivative of \\(y^2\\) with respect to \\(x\\) is simply \\(2y\\) without \\(\\dfrac{dy}{dx}\\).",
      "The constant \\(-5\\) remains \\(-5\\) after differentiation."
    ],
    "correctReason": 0,
    "h": "Look closely at how the product \\(2xy\\) was differentiated in Step 2.",
    "sol": "Applying the Product Rule to \\(2xy\\) gives \\(2y + 2x\\dfrac{dy}{dx}\\). Thus \\(2x + 2y + (2x + 2y)\\dfrac{dy}{dx} = 0 \\implies \\dfrac{dy}{dx} = -\\dfrac{2x + 2y}{2x + 2y}\\).",
    "ti_ar": "اكتشف الخطأ: الاشتقاق الضمني وقاعدة الضرب (Unit 3 · Differentiation — Composite, Implicit, and Inverse Functions)",
    "q_ar": "يقوم طالب باشتقاق العلاقة الضمنية \\(x^2 + 2xy + y^2 = -5\\) بالنسبة إلى \\(x\\). حدد الخطوة الخاطئة:",
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
    "ti": "Examiner Mode: Tangent, Normal & Stationary Points (Unit 3 · Differentiation — Composite, Implicit, and Inverse Functions)",
    "q": "Consider the curve \\(y = 2x^3 + x^2 + 4\\). (a) Find \\(\\dfrac{dy}{dx}\\) and the gradient of the tangent at \\(x = 0\\). (b) Find the \\(x\\)-coordinates of the stationary points.",
    "parts": [
      {
        "label": "Part (a) — First Derivative & Tangent Gradient",
        "marks": 3,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "Differentiate term by term using the power rule: \\(\\dfrac{dy}{dx} = 6x^2 - -2x\\)."
          },
          {
            "code": "M1",
            "marks": 1,
            "text": "Substitute \\(x = 0\\): \\(m = 6(0)^2 - -2(0)\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "Obtain exact tangent gradient \\(m = 2\\)."
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
            "text": "Set \\(\\dfrac{dy}{dx} = 0 \\implies x(6x - -2) = 0\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "State both stationary \\(x\\)-coordinates: \\(x = 0\\) and \\(x = \\dfrac{-2}{6}\\)."
          }
        ]
      }
    ],
    "examinerTip": "Always show the explicit equation \\(\\dfrac{dy}{dx} = 0\\) before solving for stationary points—this earns the M1 method mark even if an arithmetic slip occurs.",
    "ti_ar": "وضع المصحح: المماس والنقاط الحرجة (Unit 3 · Differentiation — Composite, Implicit, and Inverse Functions)",
    "q_ar": "لمنحنى الدالة \\(y = 2x^3 + x^2 + 4\\): (أ) أوجد \\(\\dfrac{dy}{dx}\\) وميل المماس عند \\(x = 0\\). (ب) أوجد الإحداثيات السينية للنقاط الحرجة.",
    "examinerTip_ar": "اكتب دائماً شرط النقطة الحرجة \\(\\dfrac{dy}{dx} = 0\\) صراحةً لضمان الحصول على درجة الطريقة (M1)."
  },
  {
    "t": "sb",
    "ti": "Step Builder: Instantaneous Rate of Change (Unit 3 · Differentiation — Composite, Implicit, and Inverse Functions)",
    "steps": [
      {
        "l": "Given \\(f(x) = 2x^2 - x - 5\\), find the coefficient of \\(x\\) in \\(f'(x)\\):",
        "a": "4",
        "h": "Multiply power 2 by 2."
      },
      {
        "l": "Find the constant term in \\(f'(x)\\):",
        "a": "-1",
        "h": "The derivative of -x is -1."
      },
      {
        "l": "Evaluate the instantaneous rate of change \\(f'(0) =\\)",
        "a": "-1",
        "h": "Compute 4(0) + -1."
      }
    ],
    "ti_ar": "بناء الخطوات: حساب المشتقة ومعدل التغير اللحظي (Unit 3 · Differentiation — Composite, Implicit, and Inverse Functions)",
    "steps_ar": [
      {
        "l": "للدالة \\(f(x) = 2x^2 - x - 5\\)، معامل \\(x\\) في \\(f'(x)\\) يساوي:",
        "a": "4",
        "h": "اضرب الأس 2 في 2."
      },
      {
        "l": "الحد الثابت في المشتقة \\(f'(x)\\) يساوي:",
        "a": "-1",
        "h": "مشتقة -x هي -1."
      },
      {
        "l": "احسب قيمة المشتقة \\(f'(0) =\\)",
        "a": "-1",
        "h": "احسب 4(0) + -1."
      }
    ]
  },
  {
    "t": "mt",
    "ti": "Matching: Differentiation Rules & Analytic Criteria (Unit 3 · Differentiation — Composite, Implicit, and Inverse Functions)",
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
    "ti_ar": "مطابقة: قواعد الاشتقاق ومعايير القيم القصوى (Unit 3 · Differentiation — Composite, Implicit, and Inverse Functions)",
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

D["apab-u4"] = [
  {
    "t": "sb",
    "ti": "Step Builder: Related Rates — circle with \\(\\frac{dr}{dt}=3\\), \\(r=5\\), find \\(\\frac{dA}{dt}\\)",
    "ti_ar": "بناء الخطوات: المعدلات المرتبطة بالزمن — دائرة فيها \\(\\frac{dr}{dt}=3\\)، و\\(r=5\\)، أوجد \\(\\frac{dA}{dt}\\)",
    "steps": [
      {
        "l": "Area: \\(A=\\pi r^2\\). Differentiate: \\(\\frac{dA}{dt}=\\)",
        "a": "2*pi*r*dr/dt",
        "h": "\\(2\\pi r\\frac{dr}{dt}\\)"
      },
      {
        "l": "Substitute \\(r=5,\\frac{dr}{dt}=3\\): \\(\\frac{dA}{dt}=2\\pi(5)(3)=\\)",
        "a": "30pi",
        "h": "\\(30\\pi\\)"
      }
    ],
    "steps_ar": [
      {
        "l": "المساحة: \\(A=\\pi r^2\\). اشتق بالنسبة للزمن: \\(\\frac{dA}{dt}=\\)",
        "a": "2*pi*r*dr/dt",
        "h": "\\(2\\pi r\\frac{dr}{dt}\\)"
      },
      {
        "l": "عوض بـ \\(r=5,\\frac{dr}{dt}=3\\): \\(\\frac{dA}{dt}=2\\pi(5)(3)=\\)",
        "a": "30pi",
        "h": "\\(30\\pi\\)"
      }
    ]
  },
  {
    "t": "cat",
    "ti": "Categorize Particle Motion: Speeding Up vs. Slowing Down",
    "ti_ar": "تصنيف حركة الجسيم: تسارع (زيادة السرعة) مقابل تباطؤ",
    "categories": [
      "Speeding Up",
      "Slowing Down"
    ],
    "categories_ar": [
      "تزداد سرعته (تسارع)",
      "تتباطأ سرعته (تباطؤ)"
    ],
    "items": [
      {
        "s": "\\(v(t) = 4,\\ a(t) = 3\\)",
        "s_ar": "\\(v(t) = 4,\\ a(t) = 3\\)",
        "cat": 0
      },
      {
        "s": "\\(v(t) = -5,\\ a(t) = -2\\)",
        "s_ar": "\\(v(t) = -5,\\ a(t) = -2\\)",
        "cat": 0
      },
      {
        "s": "\\(v(t) = -3,\\ a(t) = 4\\)",
        "s_ar": "\\(v(t) = -3,\\ a(t) = 4\\)",
        "cat": 1
      },
      {
        "s": "\\(v(t) = 6,\\ a(t) = -1\\)",
        "s_ar": "\\(v(t) = 6,\\ a(t) = -1\\)",
        "cat": 1
      }
    ],
    "sol": "A particle is speeding up when velocity and acceleration have matching signs, and slowing down when they have opposite signs.",
    "sol_ar": "تزداد سرعة الجسيم عندما تكون إشارتا السرعة المتجهة والتسارع متطابقتين، وتتباطأ سرعته عندما تكون إشارتاهما متعاكستين."
  },
  {
    "t": "sr",
    "ti": "Worked Example: Related Rates — Expanding Sphere",
    "ti_ar": "مثال محلول: المعدلات المرتبطة بالزمن — كرة تتمدد",
    "steps": [
      "A spherical balloon is inflated so its radius increases at \\(2\\text{ cm/s}\\). Volume: \\(V=\\dfrac43\\pi r^3\\). Differentiate with respect to time: \\(\\dfrac{dV}{dt}=4\\pi r^2\\dfrac{dr}{dt}\\).",
      "Substitute \\(r=5\\), \\(\\dfrac{dr}{dt}=2\\): \\(\\dfrac{dV}{dt}=4\\pi(25)(2)\\).",
      "Compute: \\(\\dfrac{dV}{dt}=200\\pi\\text{ cm}^3/\\text{s}\\)."
    ],
    "steps_ar": [
      "بالون كروي يُنفخ بحيث يزداد نصف قطره بمعدل \\(2\\text{ cm/s}\\). الحجم: \\(V=\\dfrac43\\pi r^3\\). نشتق بالنسبة إلى الزمن: \\(\\dfrac{dV}{dt}=4\\pi r^2\\dfrac{dr}{dt}\\).",
      "نعوض بـ \\(r=5\\) و\\(\\dfrac{dr}{dt}=2\\): \\(\\dfrac{dV}{dt}=4\\pi(25)(2)\\).",
      "الحساب: \\(\\dfrac{dV}{dt}=200\\pi\\text{ cm}^3/\\text{s}\\)."
    ]
  },
  {
    "t": "num",
    "ti": "L'Hôpital's Rule Evaluation",
    "ti_ar": "حساب النهاية بقاعدة لوبيتال",
    "q": "Evaluate \\(\\displaystyle\\lim_{x\\to 0} \\frac{e^{2x} - 1}{4x}\\).",
    "q_ar": "احسب قيمة النهاية \\(\\displaystyle\\lim_{x\\to 0} \\frac{e^{2x} - 1}{4x}\\).",
    "a": 0.5,
    "tol": 0.001,
    "h": "Direct substitution yields 0/0. Differentiate numerator and denominator with respect to x.",
    "h_ar": "التعويض المباشر يعطي 0/0. اشتق كلاً من البسط والمقام بالنسبة إلى x.",
    "sol": "Numerator derivative is 2e^(2x); denominator derivative is 4. Evaluating at x=0 gives 2/4 = 0.5.",
    "sol_ar": "مشتقة البسط هي 2e^(2x)؛ ومشتقة المقام هي 4. بالتعويض عند x=0 نحصل على 2/4 = 0.5."
  },
  {
    "t": "ord",
    "ti": "Order the Steps: Related Rates Problem Solving",
    "ti_ar": "ترتيب الخطوات: حل مسائل المعدلات المرتبطة بالزمن",
    "q": "Arrange the standard protocol to solve a Related Rates scenario:",
    "q_ar": "رتب البروتوكول القياسي لحل مسألة المعدلات المرتبطة بالزمن:",
    "items": [
      "Draw a sketch, define variables, and identify given rates and desired rate",
      "Write a mathematical equation connecting the variables",
      "Differentiate both sides with respect to time t using the Chain Rule",
      "Substitute given numerical values and instantaneous measurements",
      "Solve algebraically for the requested rate of change and label with units"
    ],
    "items_ar": [
      "رسم مخطط توضيحي، وتعريف المتغيرات، وتحديد المعدلات المعطاة والمعدل المطلوب",
      "كتابة معادلة رياضية تربط بين المتغيرات",
      "اشتقاق طرفي المعادلة بالنسبة إلى الزمن t باستخدام قاعدة السلسلة",
      "التعويض بالقيم العددية المعطاة والقياسات اللحظية",
      "حل المعادلة جبرياً لإيجاد معدل التغير المطلوب وكتابة وحدة القياس"
    ],
    "sol": "Always differentiate with respect to time before substituting instantaneous measurements.",
    "sol_ar": "اشتق دائماً بالنسبة إلى الزمن قبل التعويض بالقياسات اللحظية."
  },
  {
    "t": "se",
    "ti": "Spot the Error: Implicit Differentiation & Product Rule (Unit 4 · Contextual Applications of Differentiation)",
    "q": "A student differentiates the implicit curve \\(x^2 + 4xy + y^2 = 15\\) with respect to \\(x\\). Identify the step with the mathematical flaw:",
    "steps": [
      "Differentiate \\(x^2\\) with respect to \\(x\\) to obtain \\(2x\\).",
      "Differentiate the middle term \\(4xy\\) with respect to \\(x\\) as \\(4\\dfrac{dy}{dx}\\).",
      "Differentiate \\(y^2\\) using the Chain Rule as \\(2y\\dfrac{dy}{dx}\\) and the constant \\(15\\) as \\(0\\).",
      "Collect \\(\\dfrac{dy}{dx}\\) terms and divide to isolate \\(\\dfrac{dy}{dx}\\)."
    ],
    "errorStep": 2,
    "reasons": [
      "The term \\(4xy\\) is a product of two functions of \\(x\\); by the Product Rule its derivative is \\(4y + 4x\\dfrac{dy}{dx}\\), not \\(4\\dfrac{dy}{dx}\\).",
      "The derivative of \\(y^2\\) with respect to \\(x\\) is simply \\(2y\\) without \\(\\dfrac{dy}{dx}\\).",
      "The constant \\(15\\) remains \\(15\\) after differentiation."
    ],
    "correctReason": 0,
    "h": "Look closely at how the product \\(4xy\\) was differentiated in Step 2.",
    "sol": "Applying the Product Rule to \\(4xy\\) gives \\(4y + 4x\\dfrac{dy}{dx}\\). Thus \\(2x + 4y + (4x + 2y)\\dfrac{dy}{dx} = 0 \\implies \\dfrac{dy}{dx} = -\\dfrac{2x + 4y}{4x + 2y}\\).",
    "ti_ar": "اكتشف الخطأ: الاشتقاق الضمني وقاعدة الضرب (Unit 4 · Contextual Applications of Differentiation)",
    "q_ar": "يقوم طالب باشتقاق العلاقة الضمنية \\(x^2 + 4xy + y^2 = 15\\) بالنسبة إلى \\(x\\). حدد الخطوة الخاطئة:",
    "steps_ar": [
      "اشتقاق \\(x^2\\) بالنسبة إلى \\(x\\) ليعطي \\(2x\\).",
      "اشتقاق الحد الأوسط \\(4xy\\) بالنسبة إلى \\(x\\) على أنه \\(4\\dfrac{dy}{dx}\\).",
      "اشتقاق \\(y^2\\) بقاعدة السلسلة ليعطي \\(2y\\dfrac{dy}{dx}\\) ومشتقة الثابت \\(0\\).",
      "تجميع حدود \\(\\dfrac{dy}{dx}\\) وقسمة الطرفين لعزل المشتقة."
    ],
    "reasons_ar": [
      "الحد \\(4xy\\) حاصل ضرب دالتين في \\(x\\)؛ وبقاعدة الضرب مشتقته هي \\(4y + 4x\\dfrac{dy}{dx}\\).",
      "مشتقة \\(y^2\\) هي \\(2y\\) فقط دون \\(\\dfrac{dy}{dx}\\).",
      "مشتقة الثابت تبقى كما هي."
    ],
    "h_ar": "راجع كيفية اشتقاق حاصل الضرب \\(4xy\\) في الخطوة الثانية.",
    "sol_ar": "بتطبيق قاعدة الضرب على \\(4xy\\) نحصل على \\(4y + 4x\\dfrac{dy}{dx}\\)، ومنه \\(\\dfrac{dy}{dx} = -\\dfrac{2x + 4y}{4x + 2y}\\)."
  },
  {
    "t": "ms",
    "ti": "Examiner Mode: Tangent, Normal & Stationary Points (Unit 4 · Contextual Applications of Differentiation)",
    "q": "Consider the curve \\(y = 4x^3 - 3x^2 + 4\\). (a) Find \\(\\dfrac{dy}{dx}\\) and the gradient of the tangent at \\(x = 4\\). (b) Find the \\(x\\)-coordinates of the stationary points.",
    "parts": [
      {
        "label": "Part (a) — First Derivative & Tangent Gradient",
        "marks": 3,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "Differentiate term by term using the power rule: \\(\\dfrac{dy}{dx} = 12x^2 - 6x\\)."
          },
          {
            "code": "M1",
            "marks": 1,
            "text": "Substitute \\(x = 4\\): \\(m = 12(4)^2 - 6(4)\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "Obtain exact tangent gradient \\(m = 186\\)."
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
            "text": "Set \\(\\dfrac{dy}{dx} = 0 \\implies x(12x - 6) = 0\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "State both stationary \\(x\\)-coordinates: \\(x = 0\\) and \\(x = \\dfrac{6}{12}\\)."
          }
        ]
      }
    ],
    "examinerTip": "Always show the explicit equation \\(\\dfrac{dy}{dx} = 0\\) before solving for stationary points—this earns the M1 method mark even if an arithmetic slip occurs.",
    "ti_ar": "وضع المصحح: المماس والنقاط الحرجة (Unit 4 · Contextual Applications of Differentiation)",
    "q_ar": "لمنحنى الدالة \\(y = 4x^3 - 3x^2 + 4\\): (أ) أوجد \\(\\dfrac{dy}{dx}\\) وميل المماس عند \\(x = 4\\). (ب) أوجد الإحداثيات السينية للنقاط الحرجة.",
    "examinerTip_ar": "اكتب دائماً شرط النقطة الحرجة \\(\\dfrac{dy}{dx} = 0\\) صراحةً لضمان الحصول على درجة الطريقة (M1)."
  },
  {
    "t": "mt",
    "ti": "Matching: Differentiation Rules & Analytic Criteria (Unit 4 · Contextual Applications of Differentiation)",
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
    "ti_ar": "مطابقة: قواعد الاشتقاق ومعايير القيم القصوى (Unit 4 · Contextual Applications of Differentiation)",
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

D["apab-u5"] = [
  {
    "t": "ord",
    "ti": "Order the Steps: Candidates Test for Absolute Extrema",
    "ti_ar": "ترتيب الخطوات: اختبار المرشحين للقيم القصوى المطلقة",
    "q": "Arrange the procedure to find the absolute maximum of a continuous function \\(f(x)\\) on \\([a, b]\\):",
    "q_ar": "رتب خطوات إيجاد القيمة العظمى المطلقة لدالة متصلة \\(f(x)\\) على الفترة \\([a, b]\\):",
    "items": [
      "Find derivative \\(f'(x)\\) and locate all critical points in \\((a, b)\\) where \\(f'(x) = 0\\) or \\(f'\\) does not exist",
      "Discard any critical points that lie strictly outside the closed interval \\([a, b]\\)",
      "Evaluate \\(f(x)\\) at each remaining interior critical point",
      "Evaluate \\(f(x)\\) at both interval endpoints \\(x = a\\) and \\(x = b\\)",
      "Compare all evaluated values: the greatest value is the absolute maximum"
    ],
    "items_ar": [
      "إيجاد المشتقة \\(f'(x)\\) وتحديد جميع النقاط الحرجة في \\((a, b)\\) حيث \\(f'(x) = 0\\) أو \\(f'\\) غير موجودة",
      "استبعاد أي نقاط حرجة تقع خارج الفترة المغلقة \\([a, b]\\)",
      "حساب قيمة \\(f(x)\\) عند كل نقطة حرجة داخلية متبقية",
      "حساب قيمة \\(f(x)\\) عند طرفي الفترة \\(x = a\\) و \\(x = b\\)",
      "مقارنة جميع القيم المحسوبة: القيمة الكبرى هي القيمة العظمى المطلقة"
    ],
    "sol": "The Candidates Test requires evaluating \\(f\\) at all interior critical numbers and both boundary endpoints.",
    "sol_ar": "يتطلب اختبار المرشحين حساب قيمة \\(f\\) عند جميع الأعداد الحرجة الداخلية وعند طرفي الفترة."
  },
  {
    "t": "sr",
    "ti": "Worked Example: First Derivative Test",
    "ti_ar": "مثال محلول: اختبار المشتقة الأولى",
    "steps": [
      "Find and classify the critical points of \\(f(x)=x^3-3x\\). Find \\(f'(x)=3x^2-3\\) and set it to zero: \\(3x^2-3=0\\Rightarrow x=\\pm1\\).",
      "Test the sign of \\(f'\\) around each point: for \\(x < -1\\), \\(f' > 0\\); for \\(-1 < x < 1\\), \\(f' < 0\\); for \\(x > 1\\), \\(f' > 0\\).",
      "Since \\(f'\\) changes \\(+\\to-\\) at \\(x=-1\\), that's a local max. Since it changes \\(-\\to+\\) at \\(x=1\\), that's a local min."
    ],
    "steps_ar": [
      "أوجد وصنف النقاط الحرجة للدالة \\(f(x)=x^3-3x\\). نوجد \\(f'(x)=3x^2-3\\) ونساويها بالصفر: \\(3x^2-3=0\\Rightarrow x=\\pm1\\).",
      "نختبر إشارة \\(f'\\) حول كل نقطة: عندما \\(x < -1\\)، تكون \\(f' > 0\\)؛ وعندما \\(-1 < x < 1\\)، تكون \\(f' < 0\\)؛ وعندما \\(x > 1\\)، تكون \\(f' > 0\\).",
      "بما أن \\(f'\\) تغير إشارتها من \\(+\\) إلى \\(-\\) عند \\(x=-1\\)، فتلك نقطة عظمى محلية. وبما أنها تتغير من \\(-\\) إلى \\(+\\) عند \\(x=1\\)، فتلك نقطة صغرى محلية."
    ]
  },
  {
    "t": "qc",
    "ti": "Quick Check: Concavity",
    "ti_ar": "فحص سريع: التقعر",
    "q": "If \\(f''(x)>0\\) on an interval, the graph of \\(f\\) is:",
    "q_ar": "إذا كانت \\(f''(x)>0\\) على فترة معينة، فإن التمثيل البياني لـ \\(f\\) يكون:",
    "o": [
      "Concave up",
      "Concave down",
      "Increasing",
      "Decreasing"
    ],
    "o_ar": [
      "مقعراً لأعلى",
      "مقعراً لأسفل",
      "متزايداً",
      "متناقصاً"
    ],
    "a": 0,
    "ex": "A positive second derivative means the function is concave up.",
    "ex_ar": "المشتقة الثانية الموجبة تعني أن الدالة مقعرة لأعلى."
  },
  {
    "t": "num",
    "ti": "Local Minimum Value",
    "ti_ar": "قيمة الصغرى المحلية",
    "q": "The function \\(f(x) = x^3 - 3x\\) has a local minimum at \\(x = 1\\). What is the value of \\(f(1)\\)?",
    "q_ar": "للدالة \\(f(x) = x^3 - 3x\\) قيمة صغرى محلية عند \\(x = 1\\). ما هي قيمة \\(f(1)\\)؟",
    "a": -2,
    "tol": 0.001,
    "h": "Evaluate \\(f(1) = 1^3 - 3(1)\\).",
    "h_ar": "احسب قيمة \\(f(1) = 1^3 - 3(1)\\).",
    "sol": "\\(f(1) = 1 - 3 = -2\\).",
    "sol_ar": "\\(f(1) = 1 - 3 = -2\\)."
  },
  {
    "t": "cat",
    "ti": "Classify Function Behavior from Derivatives",
    "ti_ar": "تصنيف سلوك الدالة من مشتقاتها",
    "categories": [
      "Increasing & Concave Up",
      "Decreasing & Concave Down"
    ],
    "categories_ar": [
      "متزايدة ومقعرة لأعلى",
      "متناقصة ومقعرة لأسفل"
    ],
    "items": [
      {
        "s": "\\(f'(x) > 0\\) and \\(f''(x) > 0\\)",
        "s_ar": "\\(f'(x) > 0\\) و \\(f''(x) > 0\\)",
        "cat": 0
      },
      {
        "s": "\\(f'(x) < 0\\) and \\(f''(x) < 0\\)",
        "s_ar": "\\(f'(x) < 0\\) و \\(f''(x) < 0\\)",
        "cat": 1
      },
      {
        "s": "Graph is rising with tangent slopes getting steeper",
        "s_ar": "المنحنى في صعود مع زيادة ميل المماسات",
        "cat": 0
      },
      {
        "s": "Graph is falling with tangent slopes getting steeper downward",
        "s_ar": "المنحنى في هبوط مع زيادة انحدار المماسات لأسفل",
        "cat": 1
      }
    ],
    "sol": "\\(f' > 0\\) means increasing; \\(f'' > 0\\) means concave up. \\(f' < 0\\) means decreasing; \\(f'' < 0\\) means concave down.",
    "sol_ar": "\\(f' > 0\\) تعني متزايدة؛ \\(f'' > 0\\) تعني مقعرة لأعلى. \\(f' < 0\\) تعني متناقصة؛ \\(f'' < 0\\) تعني مقعرة لأسفل."
  },
  {
    "t": "se",
    "ti": "Spot the Error: Implicit Differentiation & Product Rule (Unit 5 · Analytical Applications of Differentiation)",
    "q": "A student differentiates the implicit curve \\(x^2 + 2xy + y^2 = 25\\) with respect to \\(x\\). Identify the step with the mathematical flaw:",
    "steps": [
      "Differentiate \\(x^2\\) with respect to \\(x\\) to obtain \\(2x\\).",
      "Differentiate the middle term \\(2xy\\) with respect to \\(x\\) as \\(2\\dfrac{dy}{dx}\\).",
      "Differentiate \\(y^2\\) using the Chain Rule as \\(2y\\dfrac{dy}{dx}\\) and the constant \\(25\\) as \\(0\\).",
      "Collect \\(\\dfrac{dy}{dx}\\) terms and divide to isolate \\(\\dfrac{dy}{dx}\\)."
    ],
    "errorStep": 2,
    "reasons": [
      "The term \\(2xy\\) is a product of two functions of \\(x\\); by the Product Rule its derivative is \\(2y + 2x\\dfrac{dy}{dx}\\), not \\(2\\dfrac{dy}{dx}\\).",
      "The derivative of \\(y^2\\) with respect to \\(x\\) is simply \\(2y\\) without \\(\\dfrac{dy}{dx}\\).",
      "The constant \\(25\\) remains \\(25\\) after differentiation."
    ],
    "correctReason": 0,
    "h": "Look closely at how the product \\(2xy\\) was differentiated in Step 2.",
    "sol": "Applying the Product Rule to \\(2xy\\) gives \\(2y + 2x\\dfrac{dy}{dx}\\). Thus \\(2x + 2y + (2x + 2y)\\dfrac{dy}{dx} = 0 \\implies \\dfrac{dy}{dx} = -\\dfrac{2x + 2y}{2x + 2y}\\).",
    "ti_ar": "اكتشف الخطأ: الاشتقاق الضمني وقاعدة الضرب (Unit 5 · Analytical Applications of Differentiation)",
    "q_ar": "يقوم طالب باشتقاق العلاقة الضمنية \\(x^2 + 2xy + y^2 = 25\\) بالنسبة إلى \\(x\\). حدد الخطوة الخاطئة:",
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
    "ti": "Examiner Mode: Tangent, Normal & Stationary Points (Unit 5 · Analytical Applications of Differentiation)",
    "q": "Consider the curve \\(y = 2x^3 - 5x^2 + 4\\). (a) Find \\(\\dfrac{dy}{dx}\\) and the gradient of the tangent at \\(x = 2\\). (b) Find the \\(x\\)-coordinates of the stationary points.",
    "parts": [
      {
        "label": "Part (a) — First Derivative & Tangent Gradient",
        "marks": 3,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "Differentiate term by term using the power rule: \\(\\dfrac{dy}{dx} = 6x^2 - 10x\\)."
          },
          {
            "code": "M1",
            "marks": 1,
            "text": "Substitute \\(x = 2\\): \\(m = 6(2)^2 - 10(2)\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "Obtain exact tangent gradient \\(m = 14\\)."
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
            "text": "Set \\(\\dfrac{dy}{dx} = 0 \\implies x(6x - 10) = 0\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "State both stationary \\(x\\)-coordinates: \\(x = 0\\) and \\(x = \\dfrac{10}{6}\\)."
          }
        ]
      }
    ],
    "examinerTip": "Always show the explicit equation \\(\\dfrac{dy}{dx} = 0\\) before solving for stationary points—this earns the M1 method mark even if an arithmetic slip occurs.",
    "ti_ar": "وضع المصحح: المماس والنقاط الحرجة (Unit 5 · Analytical Applications of Differentiation)",
    "q_ar": "لمنحنى الدالة \\(y = 2x^3 - 5x^2 + 4\\): (أ) أوجد \\(\\dfrac{dy}{dx}\\) وميل المماس عند \\(x = 2\\). (ب) أوجد الإحداثيات السينية للنقاط الحرجة.",
    "examinerTip_ar": "اكتب دائماً شرط النقطة الحرجة \\(\\dfrac{dy}{dx} = 0\\) صراحةً لضمان الحصول على درجة الطريقة (M1)."
  },
  {
    "t": "sb",
    "ti": "Step Builder: Instantaneous Rate of Change (Unit 5 · Analytical Applications of Differentiation)",
    "steps": [
      {
        "l": "Given \\(f(x) = 2x^2 + 5x - 5\\), find the coefficient of \\(x\\) in \\(f'(x)\\):",
        "a": "4",
        "h": "Multiply power 2 by 2."
      },
      {
        "l": "Find the constant term in \\(f'(x)\\):",
        "a": "5",
        "h": "The derivative of 5x is 5."
      },
      {
        "l": "Evaluate the instantaneous rate of change \\(f'(2) =\\)",
        "a": "13",
        "h": "Compute 4(2) + 5."
      }
    ],
    "ti_ar": "بناء الخطوات: حساب المشتقة ومعدل التغير اللحظي (Unit 5 · Analytical Applications of Differentiation)",
    "steps_ar": [
      {
        "l": "للدالة \\(f(x) = 2x^2 + 5x - 5\\)، معامل \\(x\\) في \\(f'(x)\\) يساوي:",
        "a": "4",
        "h": "اضرب الأس 2 في 2."
      },
      {
        "l": "الحد الثابت في المشتقة \\(f'(x)\\) يساوي:",
        "a": "5",
        "h": "مشتقة 5x هي 5."
      },
      {
        "l": "احسب قيمة المشتقة \\(f'(2) =\\)",
        "a": "13",
        "h": "احسب 4(2) + 5."
      }
    ]
  },
  {
    "t": "mt",
    "ti": "Matching: Differentiation Rules & Analytic Criteria (Unit 5 · Analytical Applications of Differentiation)",
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
    "ti_ar": "مطابقة: قواعد الاشتقاق ومعايير القيم القصوى (Unit 5 · Analytical Applications of Differentiation)",
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

D["apab-u6"] = [
  {
    "t": "num",
    "ti": "Definite Integral Evaluation",
    "ti_ar": "حساب التكامل المحدود",
    "q": "Evaluate \\(\\displaystyle\\int_1^3 (3x^2 - 2x)\\,dx\\).",
    "q_ar": "احسب قيمة التكامل \\(\\displaystyle\\int_1^3 (3x^2 - 2x)\\,dx\\).",
    "a": 18,
    "tol": 0.001,
    "h": "Find antiderivative \\(F(x) = x^3 - x^2\\), then calculate \\(F(3) - F(1)\\).",
    "h_ar": "أوجد المشتقة العكسية \\(F(x) = x^3 - x^2\\)، ثم احسب \\(F(3) - F(1)\\).",
    "sol": "\\(F(3) = 27 - 9 = 18\\); \\(F(1) = 1 - 1 = 0\\); \\(18 - 0 = 18\\).",
    "sol_ar": "\\(F(3) = 27 - 9 = 18\\)؛ \\(F(1) = 1 - 1 = 0\\)؛ \\(18 - 0 = 18\\)."
  },
  {
    "t": "sr",
    "ti": "Worked Example: FTC and Accumulation Functions",
    "ti_ar": "مثال محلول: النظرية الأساسية للتفاضل والتكامل ودوال التراكم",
    "steps": [
      "If \\(g(x)=\\displaystyle\\int_0^x t^2\\,dt\\), find \\(g'(3)\\). By the Fundamental Theorem of Calculus, \\(g'(x)=x^2\\) — the derivative of the accumulation function is the integrand evaluated at \\(x\\).",
      "Substitute \\(x=3\\): \\(g'(3)=3^2\\).",
      "\\(g'(3)=9\\)."
    ],
    "steps_ar": [
      "إذا كانت \\(g(x)=\\displaystyle\\int_0^x t^2\\,dt\\)، فأوجد \\(g'(3)\\). وفق النظرية الأساسية للتفاضل والتكامل، \\(g'(x)=x^2\\) — مشتقة دالة التراكم هي الدالة المكاملة محسوبة عند \\(x\\).",
      "بالتعويض عن \\(x=3\\): \\(g'(3)=3^2\\).",
      "\\(g'(3)=9\\)."
    ]
  },
  {
    "t": "qc",
    "ti": "Quick Check: Definite Integrals",
    "ti_ar": "فحص سريع: التكاملات المحدودة",
    "q": "Evaluate \\(\\displaystyle\\int_0^1 4x^3\\,dx\\)",
    "q_ar": "احسب قيمة \\(\\displaystyle\\int_0^1 4x^3\\,dx\\)",
    "o": [
      "1",
      "4",
      "0",
      "2"
    ],
    "o_ar": [
      "1",
      "4",
      "0",
      "2"
    ],
    "a": 0,
    "ex": "Antiderivative is \\(x^4\\); evaluate: \\(1^4-0^4=1\\).",
    "ex_ar": "المشتقة العكسية هي \\(x^4\\)؛ نحسب: \\(1^4-0^4=1\\)."
  },
  {
    "t": "ord",
    "ti": "Order the Steps: Definite Integral by u-Substitution",
    "ti_ar": "ترتيب الخطوات: التكامل المحدود بالتعويض u",
    "q": "Arrange the steps to evaluate \\(\\int_0^1 2x(x^2 + 1)^3\\,dx\\):",
    "q_ar": "رتب خطوات حساب التكامل \\(\\int_0^1 2x(x^2 + 1)^3\\,dx\\):",
    "items": [
      "Choose substitution u = x^2 + 1 and compute du = 2x dx",
      "Convert lower and upper limits: when x = 0, u = 1; when x = 1, u = 2",
      "Rewrite integral completely in terms of u: ∫_1^2 u^3 du",
      "Find antiderivative: [u^4 / 4]_1^2",
      "Evaluate: (16 / 4) - (1 / 4) = 15/4 = 3.75"
    ],
    "items_ar": [
      "اختيار متغير التعويض u = x^2 + 1 وحساب تفاضله du = 2x dx",
      "تحويل حدي التكامل السفلي والعلوي: عندما x = 0 تصبح u = 1؛ وعندما x = 1 تصبح u = 2",
      "إعادة كتابة التكامل بالكامل بدلالة u: ∫_1^2 u^3 du",
      "إيجاد المشتقة العكسية: [u^4 / 4]_1^2",
      "حساب القيمة: (16 / 4) - (1 / 4) = 15/4 = 3.75"
    ],
    "sol": "Transforming limits during substitution avoids needing to back-substitute x.",
    "sol_ar": "تحويل حدود التكامل أثناء التعويض يغني عن الحاجة للتعويض العكسي بدلالة x."
  },
  {
    "t": "cat",
    "ti": "Classify Integration Method Needed",
    "ti_ar": "تصنيف طريقة التكامل المطلوبة",
    "categories": [
      "Basic Antiderivative / Power Rule",
      "u-Substitution Required"
    ],
    "categories_ar": [
      "مشتقة عكسية أساسية / قاعدة القوة",
      "تتطلب التعويض u"
    ],
    "items": [
      {
        "s": "\\(\\int (3x^2 - 4x + 5)\\,dx\\)",
        "s_ar": "\\(\\int (3x^2 - 4x + 5)\\,dx\\)",
        "cat": 0
      },
      {
        "s": "\\(\\int e^x\\,dx\\)",
        "s_ar": "\\(\\int e^x\\,dx\\)",
        "cat": 0
      },
      {
        "s": "\\(\\int 2x e^{x^2}\\,dx\\)",
        "s_ar": "\\(\\int 2x e^{x^2}\\,dx\\)",
        "cat": 1
      },
      {
        "s": "\\(\\int \\dfrac{x}{x^2 + 4}\\,dx\\)",
        "s_ar": "\\(\\int \\dfrac{x}{x^2 + 4}\\,dx\\)",
        "cat": 1
      }
    ],
    "sol": "Integrals with an inner function and its derivative factor require u-substitution; polynomial/exponential sums use basic antiderivative rules.",
    "sol_ar": "التكاملات التي تحتوي على دالة داخلية مضروبة في مشتقتها تتطلب التعويض بـ u؛ بينما تستخدم حدود كثيرات الحدود أو الدوال الأسية المباشرة قواعد المشتقة العكسية الأساسية."
  },
  {
    "t": "se",
    "ti": "Spot the Error: Separable Differential Equation & Constant of Integration (Unit 6 · Integration and Accumulation of Change)",
    "q": "A student solves the initial value problem \\(\\dfrac{dy}{dx} = 4xy\\) with \\(y(0) = 6\\). Which step contains the mathematical flaw?",
    "steps": [
      "Separate variables: \\(\\int \\dfrac{1}{y}\\,dy = \\int 4x\\,dx\\).",
      "Integrate both sides: \\(\\ln|y| = \\dfrac{4}{2}x^2 + C\\).",
      "Exponentiate both sides to write \\(y = e^{4x^2/2} + C\\).",
      "Substitute \\(x = 0, y = 6\\) to solve for \\(C\\)."
    ],
    "errorStep": 3,
    "reasons": [
      "Exponentiating \\(\\ln|y| = \\tfrac{4}{2}x^2 + C\\) yields \\(y = e^{\\frac{4}{2}x^2 + C} = Ae^{4x^2/2}\\) (where \\(A = \\pm e^C\\)), NOT \\(e^{4x^2/2} + C\\).",
      "The integral of \\(1/y\\) is \\(y^{-2}\\), not \\(\\ln|y|\\).",
      "Variables cannot be separated when \\(x\\) and \\(y\\) are multiplied."
    ],
    "correctReason": 0,
    "h": "Check how the exponent law \\(e^{a + C} = e^a \\cdot e^C\\) behaves in Step 3.",
    "sol": "By index laws, \\(|y| = e^{4x^2/2 + C} = e^C e^{4x^2/2} \\implies y = Ae^{4x^2/2}\\). Using \\(y(0) = 6\\) gives \\(A = 6\\), so \\(y = 6e^{4x^2/2}\\).",
    "ti_ar": "اكتشف الخطأ: حل المعادلات التفاضلية وثابت التكامل (Unit 6 · Integration and Accumulation of Change)",
    "q_ar": "يحل طالب مسألة القيمة الابتدائية \\(\\dfrac{dy}{dx} = 4xy\\) مع الشرط \\(y(0) = 6\\). أي خطوة تتضمن الخطأ الرياضي؟",
    "steps_ar": [
      "فصل المتغيرات: \\(\\int \\dfrac{1}{y}\\,dy = \\int 4x\\,dx\\).",
      "تكامل الطرفين: \\(\\ln|y| = \\dfrac{4}{2}x^2 + C\\).",
      "أخذ الدالة الأسية للطرفين لكتابة \\(y = e^{4x^2/2} + C\\).",
      "التعويض عن \\(x = 0, y = 6\\) لإيجاد \\(C\\)."
    ],
    "reasons_ar": [
      "أخذ الدالة الأسية للعلاقة \\(\\ln|y| = \\tfrac{4}{2}x^2 + C\\) يعطي \\(y = e^{\\frac{4}{2}x^2 + C} = Ae^{4x^2/2}\\) وليس \\(e^{4x^2/2} + C\\).",
      "تكامل \\(1/y\\) يساوي \\(-1/y^2\\).",
      "لا يمكن فصل المتغيرات في حالة الضرب."
    ],
    "h_ar": "تذكّر أن \\(e^{u+C} = e^C \\cdot e^u = Ae^u\\).",
    "sol_ar": "الصورة الصحيحة بعد أخذ الدالة الأسية هي \\(y = Ae^{4x^2/2}\\)، وبالتعويض عن \\(y(0)=6\\) نجد \\(y = 6e^{4x^2/2}\\)."
  },
  {
    "t": "ms",
    "ti": "Examiner Mode: Definite Integration & Area Under a Curve (Unit 6 · Integration and Accumulation of Change)",
    "q": "Evaluate the exact area bounded by \\(y = 3x^2 + 8x\\), the \\(x\\)-axis, \\(x = 0\\), and \\(x = 2\\).",
    "parts": [
      {
        "label": "Part (a) — Antiderivative Construction",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "Set up definite integral \\(A = \\int_0^{2} (3x^2 + 8x)\\,dx\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "Find correct antiderivative \\(\\left[x^3 + 4x^2\\right]_0^{2}\\)."
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
            "text": "Substitute upper and lower limits: \\((2^3 + 4(2)^2) - (0)\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "Obtain exact area \\(24\\)."
          }
        ]
      }
    ],
    "examinerTip": "When a question says \"Hence find the exact area,\" calculator-only decimal answers with no antiderivative working shown receive 0/4 marks.",
    "ti_ar": "وضع المصحح: التكامل المحدد والمساحة تحت المنحنى (Unit 6 · Integration and Accumulation of Change)",
    "q_ar": "أوجد المساحة المحصورة بين المنحنى \\(y = 3x^2 + 8x\\) ومحور السينات والمستقيمين \\(x = 0\\) و \\(x = 2\\).",
    "examinerTip_ar": "يجب كتابة الدالة الأصلية صراحةً قبل تعويض حدود التكامل للحصول على درجات الطريقة كاملة."
  },
  {
    "t": "sb",
    "ti": "Step Builder: Definite Integral via FTC (Unit 6 · Integration and Accumulation of Change)",
    "steps": [
      {
        "l": "Find the antiderivative \\(F(x)\\) of \\(f(x) = 2x + 4\\) with \\(F(0) = 0\\): \\(F(x) =\\)",
        "a": "x^2 + 4x",
        "h": "Integrate 2x to x^2 and 4 to 4x."
      },
      {
        "l": "Evaluate at the upper bound \\(F(2) =\\)",
        "a": "12",
        "h": "Compute \\((2)^2 + 4\\)(2)."
      },
      {
        "l": "Hence state \\(\\int_0^{2} (2x + 4)\\,dx =\\)",
        "a": "12",
        "h": "Compute F(2) - F(0)."
      }
    ],
    "ti_ar": "بناء الخطوات: حساب التكامل المحدد (Unit 6 · Integration and Accumulation of Change)",
    "steps_ar": [
      {
        "l": "أوجد الدالة الأصلية \\(F(x)\\) للدالة \\(2x + 4\\) بحيث \\(F(0)=0\\):",
        "a": "x^2 + 4x",
        "h": "كامل 2x إلى x^2 و 4 إلى 4x."
      },
      {
        "l": "احسب القيمة عند الحد العلوي \\(F(2) =\\)",
        "a": "12",
        "h": "احسب (2)^2 + 4(2)."
      },
      {
        "l": "إذن قيمة التكامل \\(\\int_0^{2} (2x + 4)\\,dx =\\)",
        "a": "12",
        "h": "اطرح F(2) - F(0)."
      }
    ]
  },
  {
    "t": "mt",
    "ti": "Matching: Standard Antiderivatives & ODE Forms (Unit 6 · Integration and Accumulation of Change)",
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
    "ti_ar": "مطابقة: التكاملات القياسية والمعادلات التفاضلية (Unit 6 · Integration and Accumulation of Change)",
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

D["apab-u7"] = [
  {
    "t": "fn",
    "ti": "Explorer: Solution Family \\(y=Ce^{0.5x}\\) for \\(\\frac{dy}{dx}=0.5y\\)",
    "ti_ar": "مستكشف: عائلة حلول \\(y=Ce^{0.5x}\\) للمعادلة \\(\\frac{dy}{dx}=0.5y\\)",
    "fns": [
      {
        "expr": "C*exp(0.5*x)",
        "color": "#1E3A6E",
        "label": "Ce^{0.5x}"
      }
    ],
    "xrange": [
      -2,
      3
    ],
    "yrange": [
      -8,
      8
    ],
    "params": [
      {
        "name": "C",
        "label": "Constant C",
        "min": -2,
        "max": 2,
        "step": 0.5,
        "default": 1
      }
    ]
  },
  {
    "t": "cat",
    "ti": "Classify Differential Equations as Separable or Non-Separable",
    "ti_ar": "تصنيف المعادلات التفاضلية: قابلة للفصل أم غير قابلة للفصل",
    "categories": [
      "Separable",
      "Non-Separable"
    ],
    "categories_ar": [
      "قابلة للفصل",
      "غير قابلة للفصل"
    ],
    "items": [
      {
        "s": "\\(\\frac{dy}{dx} = x^2 y\\)",
        "s_ar": "\\(\\frac{dy}{dx} = x^2 y\\)",
        "cat": 0
      },
      {
        "s": "\\(\\frac{dy}{dx} = x + y\\)",
        "s_ar": "\\(\\frac{dy}{dx} = x + y\\)",
        "cat": 1
      },
      {
        "s": "\\(\\frac{dy}{dx} = \\frac{e^x}{y^2}\\)",
        "s_ar": "\\(\\frac{dy}{dx} = \\frac{e^x}{y^2}\\)",
        "cat": 0
      },
      {
        "s": "\\(\\frac{dy}{dx} = xy + 2y\\)",
        "s_ar": "\\(\\frac{dy}{dx} = xy + 2y\\)",
        "cat": 0
      },
      {
        "s": "\\(\\frac{dy}{dx} = \\sin(xy)\\)",
        "s_ar": "\\(\\frac{dy}{dx} = \\sin(xy)\\)",
        "cat": 1
      }
    ],
    "sol": "Separable equations can be rewritten in the form \\(g(y)\\,dy = h(x)\\,dx\\). Equations with mixed additive terms like \\(x + y\\) or composite functions like \\(\\sin(xy)\\) cannot be separated.",
    "sol_ar": "المعادلات القابلة للفصل يمكن كتابتها على الصورة \\(g(y)\\,dy = h(x)\\,dx\\). أما المعادلات ذات الحدود المجموعة المختلطة مثل \\(x + y\\) أو الدوال المركبة مثل \\(\\sin(xy)\\) فلا يمكن فصلها."
  },
  {
    "t": "sr",
    "ti": "Worked Example: Separable Differential Equation",
    "ti_ar": "مثال محلول: معادلة تفاضلية قابلة للفصل",
    "steps": [
      "Solve \\(\\dfrac{dy}{dx}=\\dfrac{x}{y}\\), \\(y(0)=3\\). Separate variables: \\(y\\,dy=x\\,dx\\).",
      "Integrate both sides: \\(\\dfrac{y^2}{2}=\\dfrac{x^2}{2}+C\\).",
      "Apply the initial condition \\(y(0)=3\\): \\(\\dfrac92=0+C\\Rightarrow C=\\dfrac92\\).",
      "Solution: \\(y^2=x^2+9\\)."
    ],
    "steps_ar": [
      "حل المعادلة \\(\\dfrac{dy}{dx}=\\dfrac{x}{y}\\)، بشرط ابتدائي \\(y(0)=3\\). نفصل المتغيرات: \\(y\\,dy=x\\,dx\\).",
      "نكامل الطرفين: \\(\\dfrac{y^2}{2}=\\dfrac{x^2}{2}+C\\).",
      "نطبق الشرط الابتدائي \\(y(0)=3\\): \\(\\dfrac92=0+C\\Rightarrow C=\\dfrac92\\).",
      "الحل: \\(y^2=x^2+9\\)."
    ]
  },
  {
    "t": "qc",
    "ti": "Quick Check: Slope Fields",
    "ti_ar": "فحص سريع: حقول الميل",
    "q": "A slope field shows horizontal tangent lines wherever:",
    "q_ar": "يُظهر حقل الميل مماسات أفقية عند جميع النقاط التي يكون عندها:",
    "o": [
      "\\(dy/dx=0\\)",
      "\\(dy/dx=1\\)",
      "\\(x=0\\)",
      "\\(y=0\\)"
    ],
    "o_ar": [
      "\\(dy/dx=0\\)",
      "\\(dy/dx=1\\)",
      "\\(x=0\\)",
      "\\(y=0\\)"
    ],
    "a": 0,
    "ex": "A horizontal tangent line has slope 0, so \\(dy/dx=0\\) at those points.",
    "ex_ar": "المماس الأفقي ميله صفر، لذا يكون \\(dy/dx=0\\) عند تلك النقاط."
  },
  {
    "t": "num",
    "ti": "Slope Field Tangent Slope",
    "ti_ar": "ميل المماس في حقل الميل",
    "q": "Given the differential equation \\(\\frac{dy}{dx} = 2x - y\\), find the slope of the solution curve at the point (3, 2).",
    "q_ar": "بمعلومية المعادلة التفاضلية \\(\\frac{dy}{dx} = 2x - y\\)، أوجد ميل منحنى الحل عند النقطة (3, 2).",
    "a": 4,
    "tol": 0.001,
    "h": "Substitute x = 3 and y = 2 into the differential equation.",
    "h_ar": "عوض بـ x = 3 و y = 2 في المعادلة التفاضلية.",
    "sol": "dy/dx = 2(3) - 2 = 6 - 2 = 4.",
    "sol_ar": "dy/dx = 2(3) - 2 = 6 - 2 = 4."
  },
  {
    "t": "ord",
    "ti": "Order the Steps: Solving a Separable Differential Equation",
    "ti_ar": "ترتيب الخطوات: حل معادلة تفاضلية قابلة للفصل",
    "q": "Arrange the steps to solve \\(\\frac{dy}{dx} = \\frac{x}{y}\\) with initial condition \\(y(0) = 3\\):",
    "q_ar": "رتب خطوات حل المعادلة \\(\\frac{dy}{dx} = \\frac{x}{y}\\) مع الشرط الابتدائي \\(y(0) = 3\\):",
    "items": [
      "Separate variables by cross-multiplying: \\(y\\,dy = x\\,dx\\)",
      "Integrate both sides: \\(\\int y\\,dy = \\int x\\,dx\\)",
      "Perform antiderivatives and add constant of integration: \\(\\frac{y^2}{2} = \\frac{x^2}{2} + C_1\\)",
      "Multiply by 2 and let \\(C = 2C_1\\): \\(y^2 = x^2 + C\\)",
      "Substitute initial condition \\((0, 3)\\) to find \\(C = 9\\): \\(y = \\sqrt{x^2 + 9}\\)"
    ],
    "items_ar": [
      "فصل المتغيرات بالضرب التبادلي: \\(y\\,dy = x\\,dx\\)",
      "تكامل الطرفين: \\(\\int y\\,dy = \\int x\\,dx\\)",
      "إجراء التكامل وإضافة ثابت التكامل مباشرة: \\(\\frac{y^2}{2} = \\frac{x^2}{2} + C_1\\)",
      "الضرب في 2 ووضع \\(C = 2C_1\\): \\(y^2 = x^2 + C\\)",
      "التعويض بالشرط الابتدائي \\((0, 3)\\) لإيجاد \\(C = 9\\): \\(y = \\sqrt{x^2 + 9}\\)"
    ],
    "sol": "Separate, integrate, include +C immediately, and apply initial conditions to solve for the constant.",
    "sol_ar": "افصل المتغيرات، كامل، أضف +C فوراً، وطبق الشروط الابتدائية لإيجاد قيمة الثابت."
  },
  {
    "t": "se",
    "ti": "Spot the Error: Separable Differential Equation & Constant of Integration (Unit 7 · Differential Equations)",
    "q": "A student solves the initial value problem \\(\\dfrac{dy}{dx} = 5xy\\) with \\(y(0) = 3\\). Which step contains the mathematical flaw?",
    "steps": [
      "Separate variables: \\(\\int \\dfrac{1}{y}\\,dy = \\int 5x\\,dx\\).",
      "Integrate both sides: \\(\\ln|y| = \\dfrac{5}{2}x^2 + C\\).",
      "Exponentiate both sides to write \\(y = e^{5x^2/2} + C\\).",
      "Substitute \\(x = 0, y = 3\\) to solve for \\(C\\)."
    ],
    "errorStep": 3,
    "reasons": [
      "Exponentiating \\(\\ln|y| = \\tfrac{5}{2}x^2 + C\\) yields \\(y = e^{\\frac{5}{2}x^2 + C} = Ae^{5x^2/2}\\) (where \\(A = \\pm e^C\\)), NOT \\(e^{5x^2/2} + C\\).",
      "The integral of \\(1/y\\) is \\(y^{-2}\\), not \\(\\ln|y|\\).",
      "Variables cannot be separated when \\(x\\) and \\(y\\) are multiplied."
    ],
    "correctReason": 0,
    "h": "Check how the exponent law \\(e^{a + C} = e^a \\cdot e^C\\) behaves in Step 3.",
    "sol": "By index laws, \\(|y| = e^{5x^2/2 + C} = e^C e^{5x^2/2} \\implies y = Ae^{5x^2/2}\\). Using \\(y(0) = 3\\) gives \\(A = 3\\), so \\(y = 3e^{5x^2/2}\\).",
    "ti_ar": "اكتشف الخطأ: حل المعادلات التفاضلية وثابت التكامل (Unit 7 · Differential Equations)",
    "q_ar": "يحل طالب مسألة القيمة الابتدائية \\(\\dfrac{dy}{dx} = 5xy\\) مع الشرط \\(y(0) = 3\\). أي خطوة تتضمن الخطأ الرياضي؟",
    "steps_ar": [
      "فصل المتغيرات: \\(\\int \\dfrac{1}{y}\\,dy = \\int 5x\\,dx\\).",
      "تكامل الطرفين: \\(\\ln|y| = \\dfrac{5}{2}x^2 + C\\).",
      "أخذ الدالة الأسية للطرفين لكتابة \\(y = e^{5x^2/2} + C\\).",
      "التعويض عن \\(x = 0, y = 3\\) لإيجاد \\(C\\)."
    ],
    "reasons_ar": [
      "أخذ الدالة الأسية للعلاقة \\(\\ln|y| = \\tfrac{5}{2}x^2 + C\\) يعطي \\(y = e^{\\frac{5}{2}x^2 + C} = Ae^{5x^2/2}\\) وليس \\(e^{5x^2/2} + C\\).",
      "تكامل \\(1/y\\) يساوي \\(-1/y^2\\).",
      "لا يمكن فصل المتغيرات في حالة الضرب."
    ],
    "h_ar": "تذكّر أن \\(e^{u+C} = e^C \\cdot e^u = Ae^u\\).",
    "sol_ar": "الصورة الصحيحة بعد أخذ الدالة الأسية هي \\(y = Ae^{5x^2/2}\\)، وبالتعويض عن \\(y(0)=3\\) نجد \\(y = 3e^{5x^2/2}\\)."
  },
  {
    "t": "ms",
    "ti": "Examiner Mode: Definite Integration & Area Under a Curve (Unit 7 · Differential Equations)",
    "q": "Evaluate the exact area bounded by \\(y = 3x^2 + 10x\\), the \\(x\\)-axis, \\(x = 0\\), and \\(x = 0\\).",
    "parts": [
      {
        "label": "Part (a) — Antiderivative Construction",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "Set up definite integral \\(A = \\int_0^{0} (3x^2 + 10x)\\,dx\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "Find correct antiderivative \\(\\left[x^3 + 5x^2\\right]_0^{0}\\)."
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
            "text": "Substitute upper and lower limits: \\((0^3 + 5(0)^2) - (0)\\)."
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
    "ti_ar": "وضع المصحح: التكامل المحدد والمساحة تحت المنحنى (Unit 7 · Differential Equations)",
    "q_ar": "أوجد المساحة المحصورة بين المنحنى \\(y = 3x^2 + 10x\\) ومحور السينات والمستقيمين \\(x = 0\\) و \\(x = 0\\).",
    "examinerTip_ar": "يجب كتابة الدالة الأصلية صراحةً قبل تعويض حدود التكامل للحصول على درجات الطريقة كاملة."
  },
  {
    "t": "sb",
    "ti": "Step Builder: Definite Integral via FTC (Unit 7 · Differential Equations)",
    "steps": [
      {
        "l": "Find the antiderivative \\(F(x)\\) of \\(f(x) = 2x + 5\\) with \\(F(0) = 0\\): \\(F(x) =\\)",
        "a": "x^2 + 5x",
        "h": "Integrate 2x to x^2 and 5 to 5x."
      },
      {
        "l": "Evaluate at the upper bound \\(F(0) =\\)",
        "a": "0",
        "h": "Compute \\((0)^2 + 5\\)(0)."
      },
      {
        "l": "Hence state \\(\\int_0^{0} (2x + 5)\\,dx =\\)",
        "a": "0",
        "h": "Compute F(0) - F(0)."
      }
    ],
    "ti_ar": "بناء الخطوات: حساب التكامل المحدد (Unit 7 · Differential Equations)",
    "steps_ar": [
      {
        "l": "أوجد الدالة الأصلية \\(F(x)\\) للدالة \\(2x + 5\\) بحيث \\(F(0)=0\\):",
        "a": "x^2 + 5x",
        "h": "كامل 2x إلى x^2 و 5 إلى 5x."
      },
      {
        "l": "احسب القيمة عند الحد العلوي \\(F(0) =\\)",
        "a": "0",
        "h": "احسب (0)^2 + 5(0)."
      },
      {
        "l": "إذن قيمة التكامل \\(\\int_0^{0} (2x + 5)\\,dx =\\)",
        "a": "0",
        "h": "اطرح F(0) - F(0)."
      }
    ]
  },
  {
    "t": "mt",
    "ti": "Matching: Standard Antiderivatives & ODE Forms (Unit 7 · Differential Equations)",
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
    "ti_ar": "مطابقة: التكاملات القياسية والمعادلات التفاضلية (Unit 7 · Differential Equations)",
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

D["apab-u8"] = [
  {
    "t": "fn",
    "ti": "Explorer: Region Between \\(y=x\\) and \\(y=x^n\\)",
    "ti_ar": "مستكشف: المنطقة المحصورة بين \\(y=x\\) و\\(y=x^n\\)",
    "fns": [
      {
        "expr": "x",
        "color": "#1E3A6E",
        "label": "y=x"
      },
      {
        "expr": "x^n",
        "color": "#B8801F",
        "label": "y=x^n"
      }
    ],
    "xrange": [
      0,
      1.5
    ],
    "yrange": [
      0,
      2
    ],
    "params": [
      {
        "name": "n",
        "label": "Power n",
        "min": 1.5,
        "max": 3,
        "step": 0.5,
        "default": 2
      }
    ]
  },
  {
    "t": "num",
    "ti": "Average Value of a Function",
    "ti_ar": "القيمة المتوسطة لدالة",
    "q": "Find the average value of \\(f(x) = 3x^2\\) on the interval \\([0, 2]\\).",
    "q_ar": "أوجد القيمة المتوسطة للدالة \\(f(x) = 3x^2\\) على الفترة \\([0, 2]\\).",
    "a": 4,
    "tol": 0.001,
    "h": "Average value is \\(\\frac{1}{b-a}\\int_a^b f(x)\\,dx = \\frac{1}{2-0}\\int_0^2 3x^2\\,dx\\).",
    "h_ar": "القيمة المتوسطة هي \\(\\frac{1}{b-a}\\int_a^b f(x)\\,dx = \\frac{1}{2-0}\\int_0^2 3x^2\\,dx\\).",
    "sol": "\\(\\int_0^2 3x^2\\,dx = [x^3]_0^2 = 8\\). Average value is \\(\\frac{1}{2}(8) = 4\\).",
    "sol_ar": "\\(\\int_0^2 3x^2\\,dx = [x^3]_0^2 = 8\\). القيمة المتوسطة هي \\(\\frac{1}{2}(8) = 4\\)."
  },
  {
    "t": "sr",
    "ti": "Worked Example: Volume by Disk Method",
    "ti_ar": "مثال محلول: الحجم بطريقة الأقراص",
    "steps": [
      "Find the volume when the region under \\(y=\\sqrt{x}\\) from \\(x=0\\) to \\(x=4\\) is revolved about the x-axis. Disk method: \\(V=\\pi\\displaystyle\\int_0^4[\\sqrt{x}]^2\\,dx=\\pi\\displaystyle\\int_0^4 x\\,dx\\).",
      "Antiderivative: \\(\\pi\\left[\\dfrac{x^2}{2}\\right]_0^4\\).",
      "Evaluate: \\(\\pi\\left(\\dfrac{16}{2}-0\\right)=8\\pi\\)."
    ],
    "steps_ar": [
      "أوجد الحجم عندما تدور المنطقة تحت \\(y=\\sqrt{x}\\) من \\(x=0\\) إلى \\(x=4\\) حول محور x. طريقة الأقراص: \\(V=\\pi\\displaystyle\\int_0^4[\\sqrt{x}]^2\\,dx=\\pi\\displaystyle\\int_0^4 x\\,dx\\).",
      "المشتقة العكسية: \\(\\pi\\left[\\dfrac{x^2}{2}\\right]_0^4\\).",
      "حساب القيمة: \\(\\pi\\left(\\dfrac{16}{2}-0\\right)=8\\pi\\)."
    ]
  },
  {
    "t": "qc",
    "ti": "Quick Check: Disk Method",
    "ti_ar": "فحص سريع: طريقة الأقراص",
    "q": "The disk method formula for volume about the x-axis is:",
    "q_ar": "صيغة طريقة الأقراص لإيجاد الحجم بالدوران حول محور x هي:",
    "o": [
      "\\(\\pi\\int[f(x)]^2\\,dx\\)",
      "\\(\\pi\\int f(x)\\,dx\\)",
      "\\(2\\pi\\int xf(x)\\,dx\\)",
      "\\(\\int[f(x)]^2\\,dx\\)"
    ],
    "o_ar": [
      "\\(\\pi\\int[f(x)]^2\\,dx\\)",
      "\\(\\pi\\int f(x)\\,dx\\)",
      "\\(2\\pi\\int xf(x)\\,dx\\)",
      "\\(\\int[f(x)]^2\\,dx\\)"
    ],
    "a": 0,
    "ex": "Each disk has radius \\(f(x)\\), so its area is \\(\\pi[f(x)]^2\\), integrated across the interval.",
    "ex_ar": "كل قرص نصف قطره \\(f(x)\\)، فتكون مساحته \\(\\pi[f(x)]^2\\)، وتكامل على طول الفترة."
  },
  {
    "t": "ord",
    "ti": "Order the Steps: Volume by the Washer Method",
    "ti_ar": "ترتيب الخطوات: الحجم بطريقة الحلقات (الواشر)",
    "q": "Arrange the steps to compute the volume of a solid of revolution using the Washer Method:",
    "q_ar": "رتب خطوات حساب حجم المجسم الدوراني باستخدام طريقة الحلقات:",
    "items": [
      "Sketch the bounded region and draw the axis of revolution",
      "Identify outer radius \\(R(x)\\) and inner radius \\(r(x)\\) from the axis of revolution",
      "Determine limits of integration \\([a, b]\\) from intersection points",
      "Set up the washer volume integral: \\(V = \\pi \\int_a^b ([R(x)]^2 - [r(x)]^2)\\,dx\\)",
      "Evaluate the definite integral using the Fundamental Theorem of Calculus"
    ],
    "items_ar": [
      "رسم المنطقة المحددة ورسم محور الدوران",
      "تحديد نصف القطر الخارجي \\(R(x)\\) ونصف القطر الداخلي \\(r(x)\\) انطلاقاً من محور الدوران",
      "تحديد حدود التكامل \\([a, b]\\) من نقاط التقاطع",
      "إعداد تكامل حجم الحلقات: \\(V = \\pi \\int_a^b ([R(x)]^2 - [r(x)]^2)\\,dx\\)",
      "حساب التكامل المحدود باستخدام النظرية الأساسية للتفاضل والتكامل"
    ],
    "sol": "Washer method requires squaring the outer and inner radii separately before subtracting.",
    "sol_ar": "تتطلب طريقة الحلقات تربيع نصفي القطرين الخارجي والداخلي كلّاً على حدة قبل الطرح."
  },
  {
    "t": "cat",
    "ti": "Classify Solid of Revolution Method (Revolving About x-Axis)",
    "ti_ar": "تصنيف طريقة المجسم الدوراني (الدوران حول محور x)",
    "categories": [
      "Disk Method (Solid Cross Section)",
      "Washer Method (Hollow Cross Section)"
    ],
    "categories_ar": [
      "طريقة الأقراص (مقطع عرضي مصمت)",
      "طريقة الحلقات (مقطع عرضي مجوف)"
    ],
    "items": [
      {
        "s": "Region bounded by \\(y = x^2\\) and \\(y = 0\\) from \\(x = 0\\) to \\(2\\)",
        "s_ar": "المنطقة المحصورة بين \\(y = x^2\\) و \\(y = 0\\) من \\(x = 0\\) إلى \\(2\\)",
        "cat": 0
      },
      {
        "s": "Region under \\(y = \\sqrt{x}\\) and above \\(y = 0\\) from \\(x = 0\\) to \\(4\\)",
        "s_ar": "المنطقة تحت \\(y = \\sqrt{x}\\) وفوق \\(y = 0\\) من \\(x = 0\\) إلى \\(4\\)",
        "cat": 0
      },
      {
        "s": "Region enclosed between \\(y = x\\) and \\(y = x^2\\)",
        "s_ar": "المنطقة المحصورة بين \\(y = x\\) و \\(y = x^2\\)",
        "cat": 1
      },
      {
        "s": "Region between \\(y = 4\\) and \\(y = x^2\\) from \\(x = 0\\) to \\(2\\)",
        "s_ar": "المنطقة بين \\(y = 4\\) و \\(y = x^2\\) من \\(x = 0\\) إلى \\(2\\)",
        "cat": 1
      }
    ],
    "sol": "When the region touches the axis of revolution along the entire boundary, cross sections are solid disks; when there is a gap, cross sections are washers.",
    "sol_ar": "عندما تلامس المنطقة محور الدوران على طول حدودها، تكون المقاطع العرضية أقراصاً مصمتة؛ وعندما توجد فجوة، تكون المقاطع العرضية حلقات مجوفة."
  },
  {
    "t": "se",
    "ti": "Spot the Error: Separable Differential Equation & Constant of Integration (Unit 8 · Applications of Integration)",
    "q": "A student solves the initial value problem \\(\\dfrac{dy}{dx} = 3xy\\) with \\(y(0) = 3\\). Which step contains the mathematical flaw?",
    "steps": [
      "Separate variables: \\(\\int \\dfrac{1}{y}\\,dy = \\int 3x\\,dx\\).",
      "Integrate both sides: \\(\\ln|y| = \\dfrac{3}{2}x^2 + C\\).",
      "Exponentiate both sides to write \\(y = e^{3x^2/2} + C\\).",
      "Substitute \\(x = 0, y = 3\\) to solve for \\(C\\)."
    ],
    "errorStep": 3,
    "reasons": [
      "Exponentiating \\(\\ln|y| = \\tfrac{3}{2}x^2 + C\\) yields \\(y = e^{\\frac{3}{2}x^2 + C} = Ae^{3x^2/2}\\) (where \\(A = \\pm e^C\\)), NOT \\(e^{3x^2/2} + C\\).",
      "The integral of \\(1/y\\) is \\(y^{-2}\\), not \\(\\ln|y|\\).",
      "Variables cannot be separated when \\(x\\) and \\(y\\) are multiplied."
    ],
    "correctReason": 0,
    "h": "Check how the exponent law \\(e^{a + C} = e^a \\cdot e^C\\) behaves in Step 3.",
    "sol": "By index laws, \\(|y| = e^{3x^2/2 + C} = e^C e^{3x^2/2} \\implies y = Ae^{3x^2/2}\\). Using \\(y(0) = 3\\) gives \\(A = 3\\), so \\(y = 3e^{3x^2/2}\\).",
    "ti_ar": "اكتشف الخطأ: حل المعادلات التفاضلية وثابت التكامل (Unit 8 · Applications of Integration)",
    "q_ar": "يحل طالب مسألة القيمة الابتدائية \\(\\dfrac{dy}{dx} = 3xy\\) مع الشرط \\(y(0) = 3\\). أي خطوة تتضمن الخطأ الرياضي؟",
    "steps_ar": [
      "فصل المتغيرات: \\(\\int \\dfrac{1}{y}\\,dy = \\int 3x\\,dx\\).",
      "تكامل الطرفين: \\(\\ln|y| = \\dfrac{3}{2}x^2 + C\\).",
      "أخذ الدالة الأسية للطرفين لكتابة \\(y = e^{3x^2/2} + C\\).",
      "التعويض عن \\(x = 0, y = 3\\) لإيجاد \\(C\\)."
    ],
    "reasons_ar": [
      "أخذ الدالة الأسية للعلاقة \\(\\ln|y| = \\tfrac{3}{2}x^2 + C\\) يعطي \\(y = e^{\\frac{3}{2}x^2 + C} = Ae^{3x^2/2}\\) وليس \\(e^{3x^2/2} + C\\).",
      "تكامل \\(1/y\\) يساوي \\(-1/y^2\\).",
      "لا يمكن فصل المتغيرات في حالة الضرب."
    ],
    "h_ar": "تذكّر أن \\(e^{u+C} = e^C \\cdot e^u = Ae^u\\).",
    "sol_ar": "الصورة الصحيحة بعد أخذ الدالة الأسية هي \\(y = Ae^{3x^2/2}\\)، وبالتعويض عن \\(y(0)=3\\) نجد \\(y = 3e^{3x^2/2}\\)."
  },
  {
    "t": "ms",
    "ti": "Examiner Mode: Definite Integration & Area Under a Curve (Unit 8 · Applications of Integration)",
    "q": "Evaluate the exact area bounded by \\(y = 3x^2 + 6x\\), the \\(x\\)-axis, \\(x = 0\\), and \\(x = 1\\).",
    "parts": [
      {
        "label": "Part (a) — Antiderivative Construction",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "Set up definite integral \\(A = \\int_0^{1} (3x^2 + 6x)\\,dx\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "Find correct antiderivative \\(\\left[x^3 + 3x^2\\right]_0^{1}\\)."
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
            "text": "Substitute upper and lower limits: \\((1^3 + 3(1)^2) - (0)\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "Obtain exact area \\(4\\)."
          }
        ]
      }
    ],
    "examinerTip": "When a question says \"Hence find the exact area,\" calculator-only decimal answers with no antiderivative working shown receive 0/4 marks.",
    "ti_ar": "وضع المصحح: التكامل المحدد والمساحة تحت المنحنى (Unit 8 · Applications of Integration)",
    "q_ar": "أوجد المساحة المحصورة بين المنحنى \\(y = 3x^2 + 6x\\) ومحور السينات والمستقيمين \\(x = 0\\) و \\(x = 1\\).",
    "examinerTip_ar": "يجب كتابة الدالة الأصلية صراحةً قبل تعويض حدود التكامل للحصول على درجات الطريقة كاملة."
  },
  {
    "t": "sb",
    "ti": "Step Builder: Definite Integral via FTC (Unit 8 · Applications of Integration)",
    "steps": [
      {
        "l": "Find the antiderivative \\(F(x)\\) of \\(f(x) = 2x + 3\\) with \\(F(0) = 0\\): \\(F(x) =\\)",
        "a": "x^2 + 3x",
        "h": "Integrate 2x to x^2 and 3 to 3x."
      },
      {
        "l": "Evaluate at the upper bound \\(F(1) =\\)",
        "a": "4",
        "h": "Compute \\((1)^2 + 3\\)(1)."
      },
      {
        "l": "Hence state \\(\\int_0^{1} (2x + 3)\\,dx =\\)",
        "a": "4",
        "h": "Compute F(1) - F(0)."
      }
    ],
    "ti_ar": "بناء الخطوات: حساب التكامل المحدد (Unit 8 · Applications of Integration)",
    "steps_ar": [
      {
        "l": "أوجد الدالة الأصلية \\(F(x)\\) للدالة \\(2x + 3\\) بحيث \\(F(0)=0\\):",
        "a": "x^2 + 3x",
        "h": "كامل 2x إلى x^2 و 3 إلى 3x."
      },
      {
        "l": "احسب القيمة عند الحد العلوي \\(F(1) =\\)",
        "a": "4",
        "h": "احسب (1)^2 + 3(1)."
      },
      {
        "l": "إذن قيمة التكامل \\(\\int_0^{1} (2x + 3)\\,dx =\\)",
        "a": "4",
        "h": "اطرح F(1) - F(0)."
      }
    ]
  },
  {
    "t": "mt",
    "ti": "Matching: Standard Antiderivatives & ODE Forms (Unit 8 · Applications of Integration)",
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
    "ti_ar": "مطابقة: التكاملات القياسية والمعادلات التفاضلية (Unit 8 · Applications of Integration)",
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

});
