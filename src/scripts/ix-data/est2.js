/* Interactive Practice data for /est2/ - one entry per chapter section id.
   Shipped as public/js/ix/est2.js and loaded only on that track's page by the
   engine in src/scripts/modules/19-interactive-activities-engine-v1.js
   (Plan 5 Phase 5.015, ADR 0033). Entry shapes (qc/mt/tf/sb/sr/fn/num/ord/cat/gp/se/ms) are
   documented there. */
(window.__ixData = window.__ixData || []).push(function (D) {
D["est2-about"] = [
  {
    "t": "qc",
    "ti": "Quick Check: EST II Subject Test Format",
    "ti_ar": "فحص سريع: هيكل اختبار EST II التخصصي",
    "q": "What are the question count and timing specifications for the EST II Math Subject Exam?",
    "q_ar": "ما هو عدد الأسئلة والمواصفات الزمنية لاختبار EST II التخصصي في الرياضيات؟",
    "o": [
      "50 multiple-choice questions in 60 minutes",
      "60 questions in 90 minutes",
      "40 questions in 45 minutes",
      "30 questions in 60 minutes"
    ],
    "o_ar": [
      "50 سؤال اختيار من متعدد في 60 دقيقة",
      "60 سؤالاً في 90 دقيقة",
      "40 سؤالاً في 45 دقيقة",
      "30 سؤالاً في 60 دقيقة"
    ],
    "a": 0,
    "ex": "The EST II Math Subject Test consists of 50 multiple-choice questions in 60 minutes (average of 72 seconds per question), covering advanced algebra, geometry, trigonometry, functions, and introductory precalculus.",
    "ex_ar": "يتكون اختبار EST II في الرياضيات من 50 سؤال اختيار من متعدد في 60 دقيقة (بمتوسط 72 ثانية لكل سؤال)، ويغطي الجبر المتقدم والهندسة وحساب المثلثات والدوال ومقدمة ما قبل التفاضل والتكامل."
  },
  {
    "t": "num",
    "ti": "Numeric Entry: EST II Target Pace",
    "ti_ar": "إدخال رقمي: وتيرة الوقت المستهدفة في EST II",
    "q": "On the EST II Math test, you have 60 minutes for 50 questions. How many seconds do you have per question on average?",
    "q_ar": "في اختبار EST II للرياضيات، لديك 60 دقيقة لحل 50 سؤالاً. كم ثانية تتاح لك لكل سؤال في المتوسط؟",
    "a": 72,
    "ex": "(60 minutes × 60 seconds/minute) ÷ 50 questions = 3600 ÷ 50 = 72 seconds per question.",
    "ex_ar": "(60 دقيقة × 60 ثانية/دقيقة) ÷ 50 سؤالاً = 3600 ÷ 50 = 72 ثانية لكل سؤال."
  },
  {
    "t": "mt",
    "ti": "Matching: EST II Key Strategy Rules",
    "ti_ar": "مطابقة: قواعد الاستراتيجية الأساسية لاختبار EST II",
    "p": [
      {
        "l": "Time Management",
        "l_ar": "إدارة الوقت",
        "r": "72 seconds per question average",
        "r_ar": "متوسط 72 ثانية لكل سؤال"
      },
      {
        "l": "Calculator Use",
        "l_ar": "استخدام الحاسبة",
        "r": "Permitted throughout the 60-minute test",
        "r_ar": "مسموح بها طوال مدة الاختبار (60 دقيقة)"
      },
      {
        "l": "Trig & Coordinates",
        "l_ar": "المثلثات والإحداثيات",
        "r": "High focus on unit circle, conic sections, and vectors",
        "r_ar": "تركيز عالٍ على دائرة الوحدة والقطوع المخروطية والمتجهات"
      },
      {
        "l": "Negative Marking",
        "l_ar": "عقوبة التخمين",
        "r": "Zero penalty — answer every question",
        "r_ar": "لا توجد عقوبة — أجب عن جميع الأسئلة دون ترك فراغات"
      }
    ]
  },
  {
    "t": "ord",
    "ti": "Order the Steps: Three-Pass Strategy for EST II Math",
    "ti_ar": "رتّب الخطوات: استراتيجية الجولات الثلاث لاختبار EST II Math",
    "prompt": "Arrange the recommended sequence to tackle the 50-question EST II Math exam:",
    "prompt_ar": "رتب التسلسل الموصى به للتعامل مع أسئلة اختبار EST II Math الخمسين:",
    "items": [
      "Pass 1 (Questions 1–25, ~20 min): bank routine algebra, linear functions, and arithmetic fast.",
      "Pass 2 (Questions 26–45, ~25 min): solve conic equations, solid geometry, and multi-step probability.",
      "Pass 3 (Questions 46–50, ~12 min): tackle non-routine proofs, vectors, and complex number manipulations.",
      "Final Review (~3 min): verify all flagged items and confirm zero answers are left blank."
    ],
    "items_ar": [
      "الجولة 1 (الأسئلة 1–25، ~20 دقيقة): حصد درجات الجبر الروتيني والدوال الخطية والحسابيات بسرعة.",
      "الجولة 2 (الأسئلة 26–45، ~25 دقيقة): حل معادلات القطوع والهندسة المجسمة والاحتمالات متعددة الخطوات.",
      "الجولة 3 (الأسئلة 46–50، ~12 دقيقة): التعامل مع الإثباتات غير النمطية والمتجهات والأعداد المركبة.",
      "المراجعة النهائية (~3 دقائق): تدقيق الأسئلة المؤشرة والتأكد من عدم ترك أي سؤال فارغاً."
    ],
    "ex": "A disciplined three-pass execution secures all accessible points early while leaving buffer time for harder discrimination items.",
    "ex_ar": "التنفيذ المنضبط للجولات الثلاث يضمن حصد كافة النقاط السهلة مبكراً مع إتاحة وقت كافٍ للأسئلة المتقدمة."
  },
  {
    "t": "cat",
    "ti": "Categorize: EST II Domain Weightings",
    "ti_ar": "تصنيف: الأوزان النسبية لمجالات اختبار EST II",
    "categories": [
      "High-Yield (15–20%)",
      "Core Foundations (10%)",
      "Specialized (5%)"
    ],
    "categories_ar": [
      "أعلى تركيزاً (15–20%)",
      "أساسيات محورية (10%)",
      "تخصصية (5%)"
    ],
    "items": [
      {
        "s": "Advanced Algebra (polynomials, logs, rationals)",
        "s_ar": "الجبر المتقدم (كثيرات الحدود، اللوغاريتمات، الدوال النسبية)",
        "cat": 0
      },
      {
        "s": "Functions & Transformations",
        "s_ar": "الدوال والتحويلات الهندسية",
        "cat": 0
      },
      {
        "s": "Trigonometry & Unit Circle",
        "s_ar": "حساب المثلثات ودائرة الوحدة",
        "cat": 0
      },
      {
        "s": "Sequences, Series & Complex Numbers",
        "s_ar": "المتتابعات والمتسلسلات والأعداد المركبة",
        "cat": 1
      },
      {
        "s": "Circles & Coordinate Geometry",
        "s_ar": "الدوائر والهندسة الإحداثية",
        "cat": 1
      },
      {
        "s": "Statistics & Probability",
        "s_ar": "الإحصاء والاحتمالات",
        "cat": 1
      },
      {
        "s": "Geometry (Lines, Triangles & Polygons)",
        "s_ar": "الهندسة المستوية (المستقيمات والمثلثات والمضلعات)",
        "cat": 1
      },
      {
        "s": "Solid Geometry & 3D Similarity",
        "s_ar": "الهندسة الفراغية وتناسب المجسمات ثلاثية الأبعاد",
        "cat": 2
      }
    ],
    "ex": "Advanced Algebra, Functions, and Trigonometry account for 55% of the total test weight.",
    "ex_ar": "يمثل الجبر المتقدم والدوال وحساب المثلثات نحو 55% من إجمالي وزن الاختبار."
  },
  {
    "t": "se",
    "ti": "Spot the Error: Exam Pacing & Time Allocation (Test format & strategy)",
    "ti_ar": "اكتشف الخطأ: إدارة الوقت وتوزيع الدرجات (نظام اختبار EST II الرياضيات ١ واستراتيجية الحل)",
    "q": "A student plans their timing for a 20-question, 30-minute section in EST2. Which step in their strategy introduces a flaw?",
    "q_ar": "يخطط طالب لتوزيع وقته في قسم مكوّن من 20 سؤالاً خلال 30 دقيقة. أي خطوة تتضمن خللاً منهجياً؟",
    "steps": [
      "Compute average time budget per question: \\(\\frac{30\\times 60}{20} = 90\\) seconds.",
      "Complete a first pass of straightforward items in roughly \\(63\\) seconds each to bank time.",
      "Spend \\(9\\) minutes stuck on a single hard item before reading the remaining 10 questions.",
      "Reserve the final \\(4\\) minutes to verify flagged items and ensure no unanswered blanks remain."
    ],
    "steps_ar": [
      "حساب متوسط الزمن لكل سؤال: \\(\\frac{30\\times 60}{20} = 90\\) ثانية.",
      "إنجاز الجولة الأولى للأسئلة المباشرة خلال نحو \\(63\\) ثانية للسؤال لتوفير الوقت.",
      "قضاء \\(9\\) دقائق متواصلة على سؤال صعب واحد قبل قراءة بقية الأسئلة (10 سؤالاً).",
      "تخصيص آخر \\(4\\) دقائق لمراجعة الأسئلة المعلّمة والتأكد من عدم ترك أي إجابة فارغة."
    ],
    "errorStep": 3,
    "reasons": [
      "Sinking 9 minutes into one question sacrifices 5–6 solvable equal-weight items later in the section; hard items should be flagged for Pass 2.",
      "Average time per question should be computed by multiplying minutes by questions.",
      "You should leave unanswered blanks when there is no guessing penalty."
    ],
    "reasons_ar": [
      "استنزاف 9 دقائق في سؤال واحد يضيع 5–6 أسئلة قابلة للحل بنفس الوزن لاحقاً؛ يجب تعليم السؤال الصعب والعودة إليه في الجولة الثانية.",
      "يُحسب متوسط الزمن بضرب الدقائق في عدد الأسئلة.",
      "يفضّل ترك الأسئلة الصعبة فارغة حتى عند عدم وجود خصم على التخمين."
    ],
    "correctReason": 0
  },
  {
    "t": "ms",
    "ti": "Examiner Mode: Pacing Audit & Target Score Plan (Test format & strategy)",
    "ti_ar": "وضع المصحح: خطة إدارة الوقت والدرجة المستهدفة (نظام اختبار EST II الرياضيات ١ واستراتيجية الحل)",
    "q": "A practice section has \\(20\\) equal-weight questions in \\(30\\) minutes with no penalty for wrong guesses. A student answers \\(16\\) correctly on Pass 1–2. (a) Find the exact seconds-per-question budget and accuracy percentage. (b) State the optimal triage rule for the remaining \\(4\\) flagged questions.",
    "q_ar": "يتكون قسم تدريبي من \\(20\\) سؤالاً متساوية الوزن في \\(30\\) دقيقة دون خصم على الإجابات الخاطئة. أجاب طالب عن \\(16\\) سؤالاً بشكل صحيح. (أ) أوجد الزمن المخصص لكل سؤال بالثواني ونسبة الدقة المئوية. (ب) اذكر قاعدة الفرز المثلى للأسئلة المتبقية وعددها \\(4\\).",
    "parts": [
      {
        "label": "Part (a) — Time Budget & Raw Accuracy",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "Time per item: \\(\\frac{1800}{20} = 90\\text{ s}\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "Raw score percentage: \\(\\frac{16}{20} \\times 100\\% \\approx 80\\%\\)."
          }
        ]
      },
      {
        "label": "Part (b) — Elimination & Zero-Blank Rule",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "Eliminate clearly invalid distractors using dimensional/sign/boundary checks."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "Select the best remaining option on all \\(4\\) items before time expires (expected gain \\(> 0\\) with no guessing penalty)."
          }
        ]
      }
    ],
    "parts_ar": [
      {
        "label": "الجزء (أ) — ميزانية الوقت ونسبة الدقة",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "الزمن لكل سؤال: \\(\\frac{1800}{20} = 90\\) ثانية."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "النسبة المئوية للدرجة الخام: \\(\\frac{16}{20} \\times 100\\% \\approx 80\\%\\)."
          }
        ]
      },
      {
        "label": "الجزء (ب) — استبعاد البدائل وعدم ترك فراغات",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "استبعاد الخيارات المستحيلة عبر فحص الإشارة أو القيم الحدية."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "اختيار أفضل إجابة لجميع الأسئلة المتبقية (4) قبل انتهاء الوقت لعدم وجود خصم."
          }
        ]
      }
    ]
  },
  {
    "t": "sb",
    "ti": "Step Builder: Exam Time & Score Budget (Test format & strategy)",
    "ti_ar": "بناء الخطوات: حساب ميزانية الوقت والدرجة (نظام اختبار EST II الرياضيات ١ واستراتيجية الحل)",
    "steps": [
      {
        "l": "Convert \\(30\\) minutes into total seconds:",
        "a": "1800",
        "h": "Multiply 30 by 60."
      },
      {
        "l": "Divide by \\(20\\) questions to get seconds per question:",
        "a": "90",
        "h": "Compute 1800 / 20."
      },
      {
        "l": "If you answer \\(16\\) out of \\(20\\) correctly, how many items remain for review?",
        "a": "4",
        "h": "Subtract 16 from 20."
      }
    ],
    "steps_ar": [
      {
        "l": "حوّل \\(30\\) دقيقة إلى إجمالي الثواني:",
        "a": "1800",
        "h": "اضرب 30 في 60."
      },
      {
        "l": "اقسم على \\(20\\) سؤالاً لإيجاد عدد الثواني لكل سؤال:",
        "a": "90",
        "h": "احسب 1800 ÷ 20."
      },
      {
        "l": "إذا حللت \\(16\\) من أصل \\(20\\)، فكم سؤالاً يتبقى للمراجعة؟",
        "a": "4",
        "h": "اطرح 16 من 20."
      }
    ]
  },
  {
    "t": "qc",
    "ti": "Quick Check: Two-Pass Exam Triage (Test format & strategy)",
    "ti_ar": "فحص سريع: استراتيجية الجولتين في الاختبار (نظام اختبار EST II الرياضيات ١ واستراتيجية الحل)",
    "q": "On a timed 20-question section (30 minutes, no guessing penalty), what is the highest-yield action when an item still resists solution after 120 seconds?",
    "q_ar": "في قسم موقوت من 20 سؤالاً (30 دقيقة دون خصم على التخمين)، ما الإجراء الأعلى كفاءة إذا استغرق سؤال أكثر من 120 ثانية دون حل؟",
    "o": [
      "Record a tentative answer, flag the item for Pass 2, and advance immediately to secure easier marks",
      "Leave the answer blank and spend another 5 minutes deriving from scratch",
      "Restart the entire section from Question 1",
      "Skip reading all remaining word problems"
    ],
    "o_ar": [
      "تسجيل إجابة مبدئية وتعليم السؤال للجولة الثانية والانتقال فوراً لحصد الدرجات الأسهل",
      "ترك السؤال فارغاً وقضاء 5 دقائق إضافية في اشتقاق مطوّل",
      "إعادة قراءة القسم من السؤال الأول",
      "تجاهل جميع المسائل اللفظية المتبقية دون قراءتها"
    ],
    "a": 0,
    "ex": "Two-pass triage protects your 90 s/item pace while ensuring a tentative answer is always banked.",
    "ex_ar": "فرز الجولتين يحمي معدل 90 ثانية للسؤال ويضمن عدم ترك أي إجابة فارغة."
  }
];
D["est2-algebra"] = [
  {
    "t": "qc",
    "ti": "Quick Check: Simplifying",
    "ti_ar": "فحص سريع: التبسيط",
    "q": "Simplify \\(\\frac{2x^2+6x}{2x}\\), \\(x\\neq0\\)",
    "q_ar": "بسط المقدار \\(\\frac{2x^2+6x}{2x}\\)، حيث \\(x\\neq0\\)",
    "o": [
      "x+3",
      "x²+3",
      "2x+3",
      "x+6"
    ],
    "o_ar": [
      "x+3",
      "x²+3",
      "2x+3",
      "x+6"
    ],
    "a": 0,
    "ex": "\\(\\frac{2x(x+3)}{2x}=x+3\\).",
    "ex_ar": "\\(\\frac{2x(x+3)}{2x}=x+3\\)."
  },
  {
    "t": "num",
    "ti": "Numeric Entry: Remainder Theorem",
    "ti_ar": "إدخال رقمي: نظرية الباقي",
    "q": "If \\(P(x) = 2x^3 - 5x^2 + 4x - 7\\), what is the remainder when \\(P(x)\\) is divided by \\(x - 2\\)?",
    "q_ar": "إذا كانت \\(P(x) = 2x^3 - 5x^2 + 4x - 7\\)، فما هو باقي قسمة \\(P(x)\\) على \\(x - 2\\)؟",
    "a": -3,
    "ex": "By the Remainder Theorem, remainder is P(2) = 2(2)³ - 5(2)² + 4(2) - 7 = 16 - 20 + 8 - 7 = -3.",
    "ex_ar": "وفقاً لنظرية الباقي، الباقي هو P(2) = 2(2)³ - 5(2)² + 4(2) - 7 = 16 - 20 + 8 - 7 = -3."
  },
  {
    "t": "ord",
    "ti": "Order the Steps: Solving a Rational Equation",
    "ti_ar": "رتّب الخطوات: حل معادلة كسرية نسبية",
    "prompt": "Arrange the steps to solve \\(\\dfrac{x}{x-2} + \\dfrac{1}{x+2} = \\dfrac{8}{x^2-4}\\):",
    "prompt_ar": "رتب خطوات حل المعادلة الكسرية \\(\\dfrac{x}{x-2} + \\dfrac{1}{x+2} = \\dfrac{8}{x^2-4}\\):",
    "items": [
      "Factor all denominators: x² - 4 = (x - 2)(x + 2).",
      "Multiply both sides by the LCD (x - 2)(x + 2) to eliminate fractions.",
      "Expand and collect terms: x(x + 2) + (x - 2) = 8 ⇒ x² + 3x - 10 = 0.",
      "Factor the quadratic equation: (x + 5)(x - 2) = 0.",
      "Reject extraneous solution x = 2 (denominator zero) and conclude x = -5."
    ],
    "items_ar": [
      "تحليل جميع المقامات إلى عوامل: x² - 4 = (x - 2)(x + 2).",
      "ضرب كلا الطرفين في المضاعف المشترك الأصغر (x - 2)(x + 2) للتخلص من المقامات.",
      "فك الأقواس وتجميع الحدود: x(x + 2) + (x - 2) = 8 ⇒ x² + 3x - 10 = 0.",
      "تحليل المعادلة التربيعية: (x + 5)(x - 2) = 0.",
      "استبعاد الحل الدخيل x = 2 (يجعل المقام صفراً) واعتماد الحل الوحيد الصحيح x = -5."
    ],
    "ex": "Clearing the LCD, solving the resulting quadratic, and filtering out extraneous roots gives the single valid solution x = -5.",
    "ex_ar": "التخلص من المقامات، وحل المعادلة التربيعية الناتجة، واستبعاد الجذور الدخيلة يثبت أن الحل الصحيح الوحيد هو x = -5."
  },
  {
    "t": "sr",
    "ti": "Worked Example: Solve a Rational Equation",
    "ti_ar": "مثال محلول: حل معادلة نسبية",
    "steps": [
      "Solve \\(\\dfrac3x+2=5\\). Isolate the fraction: \\(\\dfrac3x=3\\).",
      "Multiply both sides by \\(x\\): \\(3=3x\\).",
      "Solve: \\(x=1\\)."
    ],
    "steps_ar": [
      "حل المعادلة \\(\\dfrac3x+2=5\\). اعزل الكسر: \\(\\dfrac3x=3\\).",
      "اضرب كلا الطرفين في \\(x\\): \\(3=3x\\).",
      "الحل: \\(x=1\\)."
    ]
  },
  {
    "t": "cat",
    "ti": "Categorize: Polynomial Theorems & Solutions",
    "ti_ar": "تصنيف: نظريات وحلول كثيرات الحدود",
    "categories": [
      "Factor Theorem",
      "Remainder Theorem",
      "Extraneous Root Condition"
    ],
    "categories_ar": [
      "نظرية العوامل",
      "نظرية الباقي",
      "حالة الجذر الدخيل"
    ],
    "items": [
      {
        "s": "If P(3) = 0, then (x - 3) divides P(x) with no remainder",
        "s_ar": "إذا كان P(3) = 0، فإن (x - 3) يقسم P(x) دون باقٍ",
        "cat": 0
      },
      {
        "s": "Dividing P(x) by (x + 4) yields a remainder equal to P(-4)",
        "s_ar": "قسمة P(x) على (x + 4) تعطي باقياً يساوي P(-4)",
        "cat": 1
      },
      {
        "s": "A candidate root makes an original denominator in a rational equation zero",
        "s_ar": "قيمة مرشحة تجعل مقاماً أصلياً في المعادلة الكسرية مساوياً للصفر",
        "cat": 2
      },
      {
        "s": "(x - c) is a factor of P(x) if and only if P(c) = 0",
        "s_ar": "(x - c) عامل لـ P(x) إذا وفقط إذا كان P(c) = 0",
        "cat": 0
      },
      {
        "s": "Evaluating P(2) determines the remainder of P(x) ÷ (x - 2)",
        "s_ar": "حساب P(2) يحدد باقي قسمة P(x) ÷ (x - 2)",
        "cat": 1
      }
    ],
    "ex": "The Factor Theorem tests divisibility, the Remainder Theorem gives remainder P(c), and extraneous roots are disqualified when denominators vanish.",
    "ex_ar": "تحدد نظرية العوامل قابلية القسمة، وتعطي نظرية الباقي قيمة الباقي P(c)، وتستبعد الحلول الدخيلة عند انعدام المقامات."
  },
  {
    "t": "se",
    "ti": "Spot the Error: Vieta's Sum of Squares Identity (Advanced Algebra)",
    "ti_ar": "اكتشف الخطأ: متطابقة فييت لمجموع مربعي الجذرين (الجبر المتقدم والمعادلات)",
    "q": "For \\(x^2 - 8x + 15 = 0\\) with roots \\(\\alpha, \\beta\\), a student computes \\(\\alpha^2 + \\beta^2\\). Where is the error?",
    "q_ar": "للمعادلة \\(x^2 - 8x + 15 = 0\\) ذات الجذرين \\(\\alpha, \\beta\\)، يحسب طالب \\(\\alpha^2 + \\beta^2\\). أين الخطأ؟",
    "steps": [
      "Read Vieta's relations: \\(\\alpha + \\beta = 8\\) and \\(\\alpha\\beta = 15\\).",
      "Claim \\(\\alpha^2 + \\beta^2 = (\\alpha + \\beta)^2 = 64\\), omitting \\(-2\\alpha\\beta\\).",
      "State \\(64\\) as the value of \\(\\alpha^2 + \\beta^2\\)."
    ],
    "steps_ar": [
      "استخراج علاقات فييت: \\(\\alpha + \\beta = 8\\) و\\(\\alpha\\beta = 15\\).",
      "الادعاء بأن \\(\\alpha^2 + \\beta^2 = (\\alpha + \\beta)^2 = 64\\) وإغفال الحد \\(-2\\alpha\\beta\\).",
      "اعتماد \\(64\\) قيمة نهائية."
    ],
    "errorStep": 2,
    "reasons": [
      "Because \\((\\alpha + \\beta)^2 = \\alpha^2 + 2\\alpha\\beta + \\beta^2\\), the exact identity is \\(\\alpha^2 + \\beta^2 = (\\alpha + \\beta)^2 - 2\\alpha\\beta = 64 - 30 = 34\\).",
      "Vieta gives \\(\\alpha + \\beta = -8\\).",
      "\\(\\alpha\\beta\\) must be squared before subtracting."
    ],
    "reasons_ar": [
      "لأن \\((\\alpha + \\beta)^2 = \\alpha^2 + 2\\alpha\\beta + \\beta^2\\)، فالمتطابقة الصحيحة هي \\(\\alpha^2 + \\beta^2 = (\\alpha + \\beta)^2 - 2\\alpha\\beta = 34\\).",
      "مجموع الجذرين يساوي \\(-8\\).",
      "يجب تربيع \\(\\alpha\\beta\\) قبل الطرح."
    ],
    "correctReason": 0
  },
  {
    "t": "ms",
    "ti": "Examiner Mode: Discriminant, Vieta & Factor Theorem (Advanced Algebra)",
    "ti_ar": "وضع المصحح: المميز وعلاقات فييت ونظرية العامل (الجبر المتقدم والمعادلات)",
    "q": "Consider \\(P(x) = x^2 - 8x + 15\\) with roots \\(\\alpha, \\beta\\). (a) Compute the discriminant \\(\\Delta\\) and verify \\(P(3) = 0\\). (b) Evaluate \\(\\alpha^2 + \\beta^2\\) using symmetric sums.",
    "q_ar": "لتكن \\(P(x) = x^2 - 8x + 15\\) وجذراها \\(\\alpha, \\beta\\). (أ) احسب المميز \\(\\Delta\\) وتحقق أن \\(P(3) = 0\\). (ب) أوجد قيمة \\(\\alpha^2 + \\beta^2\\) باستعمال المجاميع المتماثلة.",
    "parts": [
      {
        "label": "Part (a) — Discriminant & Factor Check",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "\\(\\Delta = (-8)^2 - 4(1)(15) = 4 > 0\\) (two distinct real roots)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "\\(P(3) = 9 - 24 + 15 = 0\\), confirming \\((x - 3)\\) is a factor."
          }
        ]
      },
      {
        "label": "Part (b) — Symmetric Sum of Squares",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "\\(\\alpha + \\beta = 8,\\; \\alpha\\beta = 15\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "\\(\\alpha^2 + \\beta^2 = 8^2 - 2(15) = 34\\)."
          }
        ]
      }
    ],
    "parts_ar": [
      {
        "label": "الجزء (أ) — المميز والتحقق من العامل",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "\\(\\Delta = (-8)^2 - 4(1)(15) = 4 > 0\\) (جذران حقيقيان مختلفان)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "\\(P(3) = 0\\)، مما يؤكد أن \\((x - 3)\\) عامل لكثيرة الحدود."
          }
        ]
      },
      {
        "label": "الجزء (ب) — مجموع مربعي الجذرين",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "\\(\\alpha + \\beta = 8,\\; \\alpha\\beta = 15\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "\\(\\alpha^2 + \\beta^2 = 8^2 - 2(15) = 34\\)."
          }
        ]
      }
    ]
  },
  {
    "t": "sb",
    "ti": "Step Builder: Vieta Relations & Remainder Theorem (Advanced Algebra)",
    "ti_ar": "بناء الخطوات: علاقات فييت ونظرية الباقي (الجبر المتقدم والمعادلات)",
    "steps": [
      {
        "l": "For \\(x^2 - 8x + 15 = 0\\), find \\(\\alpha + \\beta =\\)",
        "a": "8",
        "h": "Use −b/a."
      },
      {
        "l": "Find the product of roots \\(\\alpha\\beta =\\)",
        "a": "15",
        "h": "Use c/a."
      },
      {
        "l": "Compute \\(\\alpha^2 + \\beta^2 = (\\alpha + \\beta)^2 - 2\\alpha\\beta =\\)",
        "a": "34",
        "h": "Compute 64 − 30."
      }
    ],
    "steps_ar": [
      {
        "l": "للمعادلة \\(x^2 - 8x + 15 = 0\\)، أوجد \\(\\alpha + \\beta =\\)",
        "a": "8",
        "h": "استعمل −b/a."
      },
      {
        "l": "أوجد حاصل ضرب الجذرين \\(\\alpha\\beta =\\)",
        "a": "15",
        "h": "استعمل c/a."
      },
      {
        "l": "احسب \\(\\alpha^2 + \\beta^2 = (\\alpha + \\beta)^2 - 2\\alpha\\beta =\\)",
        "a": "34",
        "h": "احسب 64 − 30."
      }
    ]
  },
  {
    "t": "mt",
    "ti": "Matching: Polynomial & Quadratic Theorems (Advanced Algebra)",
    "ti_ar": "مطابقة: نظريات المعادلات التربيعية وكثيرات الحدود (الجبر المتقدم والمعادلات)",
    "p": [
      {
        "l": "Remainder when \\(P(x)\\) is divided by \\((x - 3)\\)",
        "r": "\\(P(3)\\)"
      },
      {
        "l": "Tangent line–parabola condition",
        "r": "System discriminant \\(\\Delta = b^2 - 4ac = 0\\)"
      },
      {
        "l": "Sum & product in \\(x^2 - 8x + 15 = 0\\)",
        "r": "\\(\\alpha + \\beta = 8,\\; \\alpha\\beta = 15\\)"
      },
      {
        "l": "Axis of symmetry of \\(ax^2 + bx + c\\)",
        "r": "\\(x = -\\frac{b}{2a}\\)"
      }
    ],
    "p_ar": [
      {
        "l": "باقي قسمة \\(P(x)\\) على \\((x - 3)\\)",
        "r": "\\(P(3)\\)"
      },
      {
        "l": "شرط تماس مستقيم مع قطع مكافئ",
        "r": "مميز النظام المشترك \\(\\Delta = b^2 - 4ac = 0\\)"
      },
      {
        "l": "مجموع وضرب جذري \\(x^2 - 8x + 15 = 0\\)",
        "r": "\\(\\alpha + \\beta = 8,\\; \\alpha\\beta = 15\\)"
      },
      {
        "l": "معادلة محور التماثل لـ \\(ax^2 + bx + c\\)",
        "r": "\\(x = -\\frac{b}{2a}\\)"
      }
    ]
  }
];
D["est2-functions"] = [
  {
    "t": "mt",
    "ti": "Matching: Function Operations",
    "ti_ar": "مطابقة: العمليات على الدوال",
    "p": [
      {
        "l": "(f+g)(x)",
        "l_ar": "(f+g)(x)",
        "r": "f(x)+g(x)",
        "r_ar": "f(x)+g(x)"
      },
      {
        "l": "(fg)(x)",
        "l_ar": "(fg)(x)",
        "r": "f(x)·g(x)",
        "r_ar": "f(x)·g(x)"
      },
      {
        "l": "(f∘g)(x)",
        "l_ar": "(f∘g)(x)",
        "r": "f(g(x))",
        "r_ar": "f(g(x))"
      },
      {
        "l": "Range of f⁻¹",
        "l_ar": "مدى f⁻¹",
        "r": "Domain of f",
        "r_ar": "مجال f"
      }
    ]
  },
  {
    "t": "num",
    "ti": "Numeric Entry: Value of Inverse Function",
    "ti_ar": "إدخال رقمي: قيمة الدالة العكسية",
    "q": "If \\(f(x) = \\dfrac{3x - 5}{2}\\), evaluate \\(f^{-1}(8)\\).",
    "q_ar": "إذا كانت \\(f(x) = \\dfrac{3x - 5}{2}\\)، فاحسب قيمة \\(f^{-1}(8)\\).",
    "a": 7,
    "ex": "Setting f(x) = 8: (3x - 5)/2 = 8 ⇒ 3x - 5 = 16 ⇒ 3x = 21 ⇒ x = 7. Thus f⁻¹(8) = 7.",
    "ex_ar": "بمساواة f(x) = 8: (3x - 5)/2 = 8 ⇒ 3x - 5 = 16 ⇒ 3x = 21 ⇒ x = 7. إذن f⁻¹(8) = 7."
  },
  {
    "t": "cat",
    "ti": "Categorize: Function Symmetry",
    "ti_ar": "تصنيف: تماثل الدوال",
    "categories": [
      "Even Function",
      "Odd Function",
      "Neither"
    ],
    "categories_ar": [
      "دالة زوجية",
      "دالة فردية",
      "ليست زوجية ولا فردية"
    ],
    "items": [
      {
        "s": "f(x) = x⁴ - 3x² + 5",
        "s_ar": "f(x) = x⁴ - 3x² + 5",
        "cat": 0
      },
      {
        "s": "f(x) = \\cos(x)",
        "s_ar": "f(x) = \\cos(x)",
        "cat": 0
      },
      {
        "s": "f(x) = x³ - 4x",
        "s_ar": "f(x) = x³ - 4x",
        "cat": 1
      },
      {
        "s": "f(x) = \\sin(x)",
        "s_ar": "f(x) = \\sin(x)",
        "cat": 1
      },
      {
        "s": "f(x) = x³ + x²",
        "s_ar": "f(x) = x³ + x²",
        "cat": 2
      },
      {
        "s": "f(x) = e^x",
        "s_ar": "f(x) = e^x",
        "cat": 2
      }
    ],
    "ex": "Even functions satisfy f(-x) = f(x) (reflection across y-axis). Odd functions satisfy f(-x) = -f(x) (180° rotational symmetry about origin).",
    "ex_ar": "الدوال الزوجية تحقق f(-x) = f(x) (تماثل انعكاسي حول محور y). والدوال الفردية تحقق f(-x) = -f(x) (تماثل دوراني بزاوية 180° حول نقطة الأصل)."
  },
  {
    "t": "ord",
    "ti": "Order the Steps: Finding an Inverse Function",
    "ti_ar": "رتّب الخطوات: إيجاد قاعدة الدالة العكسية",
    "prompt": "Arrange the steps to find the inverse of \\(f(x) = \\dfrac{2x + 1}{x - 3}\\):",
    "prompt_ar": "رتب خطوات إيجاد الدالة العكسية للدالة \\(f(x) = \\dfrac{2x + 1}{x - 3}\\):",
    "items": [
      "Replace f(x) with y: y = (2x + 1)/(x - 3).",
      "Swap x and y: x = (2y + 1)/(y - 3).",
      "Multiply across by (y - 3): x(y - 3) = 2y + 1.",
      "Expand and group all y terms on one side: xy - 2y = 3x + 1.",
      "Factor out y: y(x - 2) = 3x + 1.",
      "Divide to isolate y: f⁻¹(x) = (3x + 1)/(x - 2)."
    ],
    "items_ar": [
      "استبدال f(x) بالمتغير y: y = (2x + 1)/(x - 3).",
      "تبديل المتغيرين x و y: x = (2y + 1)/(y - 3).",
      "الضرب التبادلي في (y - 3): x(y - 3) = 2y + 1.",
      "فك الأقواس وتجميع جميع حدود y في طرف واحد: xy - 2y = 3x + 1.",
      "إخراج y كعامل مشترك: y(x - 2) = 3x + 1.",
      "القسمة لعزل y: f⁻¹(x) = (3x + 1)/(x - 2)."
    ],
    "ex": "Swapping variables and collecting all y-terms on one side yields f⁻¹(x) = (3x + 1)/(x - 2).",
    "ex_ar": "تبديل المتغيرين وتجميع حدود y في طرف واحد ينتج الدالة العكسية: f⁻¹(x) = (3x + 1)/(x - 2)."
  },
  {
    "t": "sr",
    "ti": "Worked Example: Find an Inverse Function",
    "ti_ar": "مثال محلول: إيجاد الدالة العكسية",
    "steps": [
      "Find the inverse of \\(f(x)=3x-4\\). Replace \\(f(x)\\) with \\(y\\): \\(y=3x-4\\).",
      "Swap \\(x\\) and \\(y\\), then solve for \\(y\\): \\(x=3y-4\\Rightarrow y=\\dfrac{x+4}{3}\\).",
      "\\(f^{-1}(x)=\\dfrac{x+4}{3}\\)."
    ],
    "steps_ar": [
      "أوجد معكوس الدالة \\(f(x)=3x-4\\). استبدل \\(f(x)\\) بـ \\(y\\): \\(y=3x-4\\).",
      "بدّل \\(x\\) و \\(y\\)، ثم حل المعادلة بالنسبة لـ \\(y\\): \\(x=3y-4\\Rightarrow y=\\dfrac{x+4}{3}\\).",
      "\\(f^{-1}(x)=\\dfrac{x+4}{3}\\)."
    ]
  },
  {
    "t": "se",
    "ti": "Spot the Error: Logarithm Law Misapplication (Functions: Composite, Inverse & Logarithmic)",
    "ti_ar": "اكتشف الخطأ: التطبيق الخاطئ لقوانين اللوغاريتمات (الدوال المركبة والعكسية واللوغاريتمية)",
    "q": "A student attempts to solve \\(\\log_{3}(x) + \\log_{3}(3) = 4\\). Which step introduces an invalid rule?",
    "q_ar": "يحاول طالب حل المعادلة \\(\\log_{3}(x) + \\log_{3}(3) = 4\\). أي خطوة تتضمن قانوناً خاطئاً؟",
    "steps": [
      "Note the domain requirement \\(x > 0\\).",
      "Combine the sum of logarithms as \\(\\log_{3}(x + 3) = 4\\) instead of multiplying arguments.",
      "Exponentiate base \\(3\\) to write \\(x + 3 = 81\\).",
      "Subtract \\(3\\) to report \\(x = 78\\)."
    ],
    "steps_ar": [
      "تحديد شرط مجال اللوغاريتم \\(x > 0\\).",
      "دمج مجموع اللوغاريتمين في صورة \\(\\log_{3}(x + 3) = 4\\) بدلاً من ضرب ما بداخل اللوغاريتم.",
      "التحويل للصورة الأسية: \\(x + 3 = 81\\).",
      "طرح \\(3\\) للوصول إلى الناتج."
    ],
    "errorStep": 2,
    "reasons": [
      "The product rule states \\(\\log_b(M) + \\log_b(N) = \\log_b(MN)\\), NOT \\(\\log_b(M + N)\\); thus \\(\\log_{3}(3x) = 4 \\implies x = 27\\).",
      "The domain of \\(\\log(x)\\) is all real numbers.",
      "\\(\\log_{3}(3) = 0\\)."
    ],
    "reasons_ar": [
      "قاعدة الضرب تنص على أن \\(\\log_b(M) + \\log_b(N) = \\log_b(MN)\\) وليس جمع المداخل؛ ومنه \\(x = 27\\).",
      "مجال الدالة اللوغاريتمية هو جميع الأعداد الحقيقية.",
      "قيمة \\(\\log_{3}(3) = 0\\)."
    ],
    "correctReason": 0
  },
  {
    "t": "ms",
    "ti": "Examiner Mode: Logarithmic Equation & Continuous Growth (Functions: Composite, Inverse & Logarithmic)",
    "ti_ar": "وضع المصحح: المعادلات اللوغاريتمية والنمو الأسي (الدوال المركبة والعكسية واللوغاريتمية)",
    "q": "(a) Solve \\(\\log_{3}(x - 4) = 3\\), stating the domain restriction. (b) A culture grows via \\(P(t) = P_0 e^{rt}\\); find the exact doubling time \\(T_d\\) in terms of \\(r\\).",
    "q_ar": "(أ) حل المعادلة \\(\\log_{3}(x - 4) = 3\\) مع ذكر شرط المجال. (ب) تنمو عينة وفق \\(P(t) = P_0 e^{rt}\\)؛ أوجد زمن التضاعف \\(T_d\\) بدلالة \\(r\\).",
    "parts": [
      {
        "label": "Part (a) — Domain & Exponential Conversion",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "Domain \\(x > 4\\); convert to \\(x - 4 = 3^{3} = 27\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "\\(x = 31\\) (valid since \\(31 > 4\\))."
          }
        ]
      },
      {
        "label": "Part (b) — Exact Doubling Time",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "Set \\(2P_0 = P_0 e^{r T_d} \\implies e^{r T_d} = 2\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "Take natural logs: \\(T_d = \\dfrac{\\ln 2}{r}\\)."
          }
        ]
      }
    ],
    "parts_ar": [
      {
        "label": "الجزء (أ) — شرط المجال والتحويل للصورة الأسية",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "المجال \\(x > 4\\)؛ والتحويل يعطي \\(x - 4 = 3^{3} = 27\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "\\(x = 31\\) (يحقق شرط المجال)."
          }
        ]
      },
      {
        "label": "الجزء (ب) — زمن التضاعف الدقيق",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "وضع \\(2P_0 = P_0 e^{r T_d} \\implies e^{r T_d} = 2\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "بأخذ اللوغاريتم الطبيعي: \\(T_d = \\dfrac{\\ln 2}{r}\\)."
          }
        ]
      }
    ]
  },
  {
    "t": "sb",
    "ti": "Step Builder: Solving Logarithmic Equations (Functions: Composite, Inverse & Logarithmic)",
    "ti_ar": "بناء الخطوات: حل المعادلة اللوغاريتمية (الدوال المركبة والعكسية واللوغاريتمية)",
    "steps": [
      {
        "l": "Evaluate \\(3^{3} =\\)",
        "a": "27",
        "h": "Multiply 3 by itself 3 times."
      },
      {
        "l": "Solve \\(\\log_{3}(x - 4) = 3\\) for \\(x =\\)",
        "a": "31",
        "h": "Add 4 to 27."
      },
      {
        "l": "Evaluate \\(\\log_{3}(1) =\\)",
        "a": "0",
        "h": "Any base raised to 0 equals 1."
      }
    ],
    "steps_ar": [
      {
        "l": "احسب \\(3^{3} =\\)",
        "a": "27",
        "h": "اضرب 3 في نفسه 3 مرات."
      },
      {
        "l": "حل المعادلة \\(\\log_{3}(x - 4) = 3\\) لإيجاد \\(x =\\)",
        "a": "31",
        "h": "اجمع 4 مع 27."
      },
      {
        "l": "احسب قيمة \\(\\log_{3}(1) =\\)",
        "a": "0",
        "h": "أي أساس مرفوع للأس صفر يساوي 1."
      }
    ]
  },
  {
    "t": "qc",
    "ti": "Quick Check: Domain of a Shifted Logarithm (Functions: Composite, Inverse & Logarithmic)",
    "ti_ar": "فحص سريع: مجال الدالة اللوغاريتمية المزاحة (الدوال المركبة والعكسية واللوغاريتمية)",
    "q": "What is the maximal real domain of \\(f(x) = \\ln(3x - 12)\\)?",
    "q_ar": "ما أوسع مجال حقيقي للدالة \\(f(x) = \\ln(3x - 12)\\)؟",
    "o": [
      "\\(x > 4\\)",
      "\\(x \\ge 4\\)",
      "\\(x > 0\\)",
      "\\(x \\neq 4\\)"
    ],
    "o_ar": [
      "\\(x > 4\\)",
      "\\(x \\ge 4\\)",
      "\\(x > 0\\)",
      "\\(x \\neq 4\\)"
    ],
    "a": 0,
    "ex": "Require strict positivity: \\(3x - 12 > 0 \\implies x > 4\\).",
    "ex_ar": "يشترط أن يكون ما داخل اللوغاريتم موجباً تماماً: \\(x > 4\\)."
  }
];
D["est2-sequences"] = [
  {
    "t": "fn",
    "ti": "Explorer: Geometric Sequence \\(3\\cdot r^x\\)",
    "ti_ar": "مستكشف: المتتابعة الهندسية \\(3\\cdot r^x\\)",
    "fns": [
      {
        "expr": "3*r^x",
        "color": "#1E3A6E",
        "label": "3·r^x"
      }
    ],
    "xrange": [
      0,
      5
    ],
    "yrange": [
      0,
      30
    ],
    "params": [
      {
        "name": "r",
        "label": "Ratio r",
        "min": 0.5,
        "max": 2,
        "step": 0.25,
        "default": 1.5
      }
    ]
  },
  {
    "t": "num",
    "ti": "Numeric Entry: Sum of Infinite Geometric Series",
    "ti_ar": "إدخال رقمي: مجموع متسلسلة هندسية لانهائية",
    "q": "Evaluate the sum of the infinite geometric series \\(18 + 6 + 2 + \\dfrac{2}{3} + \\cdots\\).",
    "q_ar": "احسب مجموع المتسلسلة الهندسية اللانهائية \\(18 + 6 + 2 + \\dfrac{2}{3} + \\cdots\\).",
    "a": 27,
    "ex": "First term a₁ = 18, common ratio r = 6/18 = 1/3. Since |r| < 1, S_∞ = a₁ / (1 - r) = 18 / (1 - 1/3) = 18 / (2/3) = 27.",
    "ex_ar": "الحد الأول a₁ = 18، والأساس المشترك r = 6/18 = 1/3. وبما أن |r| < 1، فإن S_∞ = a₁ / (1 - r) = 18 / (1 - 1/3) = 18 / (2/3) = 27."
  },
  {
    "t": "num",
    "ti": "Numeric Entry: Power of the Imaginary Unit",
    "ti_ar": "إدخال رقمي: قوى الوحدة التخيلية",
    "q": "Evaluate \\(i^{78}\\). Enter 1, -1, 0, or the integer value.",
    "q_ar": "احسب قيمة \\(i^{78}\\). أدخل 1 أو -1 أو 0 أو القيمة العددية الصحيحة.",
    "a": -1,
    "ex": "78 mod 4 = 2. Since i² = -1, i⁷⁸ = (i⁴)¹⁹ · i² = (1)¹⁹ · (-1) = -1.",
    "ex_ar": "باقي قسمة 78 على 4 هو 2. وبما أن i² = -1، فإن i⁷⁸ = (i⁴)¹⁹ · i² = (1)¹⁹ · (-1) = -1."
  },
  {
    "t": "ord",
    "ti": "Order the Steps: Infinite Geometric Series Evaluation",
    "ti_ar": "رتّب الخطوات: حساب مجموع المتسلسلة الهندسية اللانهائية",
    "prompt": "Arrange the steps to find the sum of \\(12 - 4 + \\dfrac{4}{3} - \\dfrac{4}{9} + \\cdots\\):",
    "prompt_ar": "رتب خطوات إيجاد مجموع المتسلسلة \\(12 - 4 + \\dfrac{4}{3} - \\dfrac{4}{9} + \\cdots\\):",
    "items": [
      "Identify the first term: a₁ = 12.",
      "Calculate the common ratio: r = -4 / 12 = -1/3.",
      "Verify convergence condition: |-1/3| = 1/3 < 1, so the series converges.",
      "Apply the sum formula: S_∞ = a₁ / (1 - r) = 12 / (1 - (-1/3)).",
      "Simplify denominator and evaluate: 12 / (4/3) = 12 · (3/4) = 9."
    ],
    "items_ar": [
      "تحديد الحد الأول: a₁ = 12.",
      "حساب الأساس المشترك: r = -4 / 12 = -1/3.",
      "التحقق من شرط التقارب: |-1/3| = 1/3 < 1، إذن المتسلسلة متقاربة.",
      "تطبيق قانون المجموع اللانهائي: S_∞ = a₁ / (1 - r) = 12 / (1 - (-1/3)).",
      "تبسيط المقام وإيجاد الناتج النهائي: 12 / (4/3) = 12 · (3/4) = 9."
    ],
    "ex": "Checking |r| < 1 guarantees convergence, giving S_∞ = 12 / (4/3) = 9.",
    "ex_ar": "التحقق من أن |r| < 1 يضمن التقارب، معطياً S_∞ = 12 / (4/3) = 9."
  },
  {
    "t": "cat",
    "ti": "Categorize: Sequences & Complex Numbers",
    "ti_ar": "تصنيف: المتتابعات والأعداد المركبة",
    "categories": [
      "Arithmetic Sequence",
      "Geometric Series",
      "Complex Arithmetic"
    ],
    "categories_ar": [
      "متتابعة حسابية",
      "متسلسلة هندسية",
      "حساب الأعداد المركبة"
    ],
    "items": [
      {
        "s": "Constant common difference d between consecutive terms",
        "s_ar": "فرق مشترك ثابت d بين الحدود المتتالية",
        "cat": 0
      },
      {
        "s": "Sum to infinity formula S_∞ = a₁ / (1 - r) for |r| < 1",
        "s_ar": "قانون المجموع اللانهائي S_∞ = a₁ / (1 - r) عندما |r| < 1",
        "cat": 1
      },
      {
        "s": "Multiplying by the conjugate (c - di) to divide fractions",
        "s_ar": "الضرب في المرافق (c - di) لقسمة الكسور المركبة",
        "cat": 2
      },
      {
        "s": "aₙ = a₁ + (n - 1)d",
        "s_ar": "aₙ = a₁ + (n - 1)d",
        "cat": 0
      },
      {
        "s": "Powers repeat in a 4-cycle: i, -1, -i, 1",
        "s_ar": "القوى تتكرر دورياً كل 4: i, -1, -i, 1",
        "cat": 2
      },
      {
        "s": "Ratio r between consecutive terms is constant",
        "s_ar": "النسبة r بين الحدود المتتالية ثابتة",
        "cat": 1
      }
    ],
    "ex": "Arithmetic uses a common difference, geometric uses a common ratio, and complex numbers rely on i² = -1 and conjugates.",
    "ex_ar": "تعتمد المتتابعة الحسابية على الفرق المشترك، والهندسية على النسبة المشتركة، والأعداد المركبة على i² = -1 والمرافق."
  },
  {
    "t": "sr",
    "ti": "Worked Example: Sum of a Finite Geometric Series",
    "ti_ar": "مثال محلول: مجموع متسلسلة هندسية منتهية",
    "steps": [
      "Find the sum of \\(2+6+18+54+162\\). Identify \\(a=2\\), \\(r=3\\), \\(n=5\\) terms.",
      "Use the formula \\(S_n=\\dfrac{a(r^n-1)}{r-1}\\).",
      "Substitute: \\(S_5=\\dfrac{2(3^5-1)}{3-1}=\\dfrac{2(242)}{2}=242\\)."
    ],
    "steps_ar": [
      "أوجد مجموع \\(2+6+18+54+162\\). حدد المعطيات: \\(a=2\\)، \\(r=3\\)، عدد الحدود \\(n=5\\).",
      "استخدم قانون المجموع \\(S_n=\\dfrac{a(r^n-1)}{r-1}\\).",
      "التعويض: \\(S_5=\\dfrac{2(3^5-1)}{3-1}=\\dfrac{2(242)}{2}=242\\)."
    ]
  },
  {
    "t": "qc",
    "ti": "Quick Check: Complex Number Addition",
    "ti_ar": "فحص سريع: جمع الأعداد المركبة",
    "q": "Simplify \\((2+3i)+(1-i)\\)",
    "q_ar": "بسط المقدار \\((2+3i)+(1-i)\\)",
    "o": [
      "\\(3+2i\\)",
      "\\(3+4i\\)",
      "\\(1+2i\\)",
      "\\(3-2i\\)"
    ],
    "o_ar": [
      "\\(3+2i\\)",
      "\\(3+4i\\)",
      "\\(1+2i\\)",
      "\\(3-2i\\)"
    ],
    "a": 0,
    "ex": "Add real and imaginary parts separately: \\((2+1)+(3-1)i=3+2i\\).",
    "ex_ar": "اجمع الجزأين الحقيقيين والتخيليين كلاً على حدة: \\((2+1)+(3-1)i=3+2i\\)."
  },
  {
    "t": "se",
    "ti": "Spot the Error: Infinite Geometric Series Convergence Check (Sequences, Series & Complex Numbers)",
    "ti_ar": "اكتشف الخطأ: شرط تقارب المتسلسلة الهندسية اللانهائية (المتتابعات والمتسلسلات والأعداد المركبة)",
    "q": "A student applies \\(S_\\infty = \\dfrac{a}{1 - r}\\) to \\(30 + 60 + 120 + \\cdots\\). Where does the reasoning fail?",
    "q_ar": "يطبّق طالب صيغة \\(S_\\infty = \\dfrac{a}{1 - r}\\) على المتسلسلة \\(30 + 60 + 120 + \\cdots\\). أين موضع الخطأ؟",
    "steps": [
      "Identify first term \\(a = 30\\) and common ratio \\(r = 2\\).",
      "Substitute directly into \\(S_\\infty = \\frac{30}{1 - 2} = -30\\).",
      "Conclude the sum of positive growing terms equals \\(-30\\)."
    ],
    "steps_ar": [
      "تحديد الحد الأول \\(a = 30\\) والأساس \\(r = 2\\).",
      "التعويض المباشر في القانون \\(S_\\infty = \\frac{30}{1 - 2} = -30\\).",
      "استنتاج أن مجموع حدود موجبة متزايدة يساوي \\(-30\\)."
    ],
    "errorStep": 2,
    "reasons": [
      "The sum-to-infinity formula \\(S_\\infty = \\frac{a}{1 - r}\\) is valid ONLY when \\(|r| < 1\\); since \\(|2| \\ge 1\\), the series diverges to \\(+\\infty\\).",
      "The formula should be \\(\\frac{a}{r - 1}\\).",
      "\\(r\\) equals \\(\\frac{1}{2}\\) here."
    ],
    "reasons_ar": [
      "صيغة المجموع إلى اللانهاية صالحة فقط عندما \\(|r| < 1\\)؛ وبما أن \\(|2| \\ge 1\\) فالمتسلسلة متباعدة إلى \\(+\\infty\\).",
      "القانون الصحيح هو \\(\\frac{a}{r - 1}\\).",
      "قيمة الأساس هنا \\(\\frac{1}{2}\\)."
    ],
    "correctReason": 0
  },
  {
    "t": "ms",
    "ti": "Examiner Mode: Convergent Geometric & Arithmetic Series (Sequences, Series & Complex Numbers)",
    "ti_ar": "وضع المصحح: المتتاليات الحسابية والهندسية المتقاربة (المتتابعات والمتسلسلات والأعداد المركبة)",
    "q": "(a) A geometric series has first term \\(a = 30\\) and common ratio \\(r = \\frac{1}{3}\\). Verify convergence and find \\(S_\\infty\\). (b) An arithmetic progression has \\(u_1 = 30\\) and common difference \\(d = 3\\); find \\(u_{10}\\).",
    "q_ar": "(أ) متسلسلة هندسية حدها الأول \\(a = 30\\) وأساسها \\(r = \\frac{1}{3}\\). تحقق من التقارب وأوجد \\(S_\\infty\\). (ب) متتالية حسابية حدها الأول \\(30\\) وأساسها \\(d = 3\\)؛ أوجد الحد العاشر \\(u_{10}\\).",
    "parts": [
      {
        "label": "Part (a) — Convergence Criterion & Sum to Infinity",
        "marks": 2,
        "rubric": [
          {
            "code": "B1",
            "marks": 1,
            "text": "Since \\(|r| = \\frac{1}{3} < 1\\), the infinite geometric series converges."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "\\(S_\\infty = \\dfrac{30}{1 - 1/3} = \\dfrac{30}{2/3} = 45\\)."
          }
        ]
      },
      {
        "label": "Part (b) — 10th Arithmetic Term",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "Use \\(u_n = u_1 + (n - 1)d\\) with \\(n = 10\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "\\(u_{10} = 30 + 9(3) = 57\\)."
          }
        ]
      }
    ],
    "parts_ar": [
      {
        "label": "الجزء (أ) — شرط التقارب والمجموع إلى ما لا نهاية",
        "marks": 2,
        "rubric": [
          {
            "code": "B1",
            "marks": 1,
            "text": "بما أن \\(|r| = \\frac{1}{3} < 1\\)، فالمتسلسلة الهندسية متقاربة."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "\\(S_\\infty = \\dfrac{30}{1 - 1/3} = 45\\)."
          }
        ]
      },
      {
        "label": "الجزء (ب) — الحد العاشر في المتتالية الحسابية",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "بتطبيق القانون \\(u_n = u_1 + (n - 1)d\\) عند \\(n = 10\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "\\(u_{10} = 30 + 9(3) = 57\\)."
          }
        ]
      }
    ]
  },
  {
    "t": "sb",
    "ti": "Step Builder: Geometric Sum to Infinity & AP Term (Sequences, Series & Complex Numbers)",
    "ti_ar": "بناء الخطوات: مجموع اللانهاية والحد النوني (المتتابعات والمتسلسلات والأعداد المركبة)",
    "steps": [
      {
        "l": "For \\(a = 30\\) and \\(r = \\frac{1}{3}\\), compute the second term \\(a r =\\)",
        "a": "10",
        "h": "Divide 30 by 3."
      },
      {
        "l": "Compute the sum to infinity \\(S_\\infty = \\frac{30}{1 - 1/3} =\\)",
        "a": "45",
        "h": "Multiply 30 by 3/2."
      },
      {
        "l": "In the AP with \\(u_1 = 30,\\; d = 3\\), find \\(u_{10} =\\)",
        "a": "57",
        "h": "Compute 30 + 9×3."
      }
    ],
    "steps_ar": [
      {
        "l": "لمتتالية هندسية فيها \\(a = 30\\) و\\(r = \\frac{1}{3}\\)، احسب الحد الثاني \\(ar =\\)",
        "a": "10",
        "h": "اقسم 30 على 3."
      },
      {
        "l": "احسب المجموع إلى اللانهاية \\(S_\\infty = \\frac{30}{1 - 1/3} =\\)",
        "a": "45",
        "h": "اضرب 30 في 3/2."
      },
      {
        "l": "في المتتالية الحسابية \\(u_1 = 30,\\; d = 3\\)، أوجد \\(u_{10} =\\)",
        "a": "57",
        "h": "احسب 30 + 9×3."
      }
    ]
  },
  {
    "t": "mt",
    "ti": "Matching: Sequence, Series & Expansion Formulas (Sequences, Series & Complex Numbers)",
    "ti_ar": "مطابقة: صيغ المتتاليات والمتسلسلات وذي الحدين (المتتابعات والمتسلسلات والأعداد المركبة)",
    "p": [
      {
        "l": "Arithmetic sum \\(S_n\\)",
        "r": "\\(\\frac{n}{2}[2a + (n - 1)d]\\)"
      },
      {
        "l": "Convergent GP sum \\(S_\\infty\\) (\\(|r| < 1\\))",
        "r": "\\(\\dfrac{a}{1 - r}\\)"
      },
      {
        "l": "Binomial general term in \\((a + b)^n\\)",
        "r": "\\(\\binom{n}{r} a^{n - r} b^r\\)"
      },
      {
        "l": "\\(p\\)-series \\(\\sum_{n=1}^{\\infty} n^{-p}\\) convergence",
        "r": "Converges iff \\(p > 1\\)"
      }
    ],
    "p_ar": [
      {
        "l": "مجموع المتتالية الحسابية \\(S_n\\)",
        "r": "\\(\\frac{n}{2}[2a + (n - 1)d]\\)"
      },
      {
        "l": "مجموع المتسلسلة الهندسية اللانهائية (\\(|r| < 1\\))",
        "r": "\\(\\dfrac{a}{1 - r}\\)"
      },
      {
        "l": "الحد العام في مفكوك ذي الحدين \\((a + b)^n\\)",
        "r": "\\(\\binom{n}{r} a^{n - r} b^r\\)"
      },
      {
        "l": "تقارب متسلسلة القوى \\(\\sum_{n=1}^{\\infty} n^{-p}\\)",
        "r": "تتقارب إذا وفقط إذا كان \\(p > 1\\)"
      }
    ]
  }
];
D["est2-geometry"] = [
  {
    "t": "tf",
    "ti": "True or False: Solid Geometry",
    "ti_ar": "صح أم خطأ: الهندسة المجسمة (الفراغية)",
    "items": [
      {
        "s": "Volume of sphere \\(=\\frac{4}{3}\\pi r^3\\)",
        "s_ar": "حجم الكرة \\(=\\frac{4}{3}\\pi r^3\\)",
        "a": true,
        "ex": "Standard formula.",
        "ex_ar": "الصيغة القياسية لحجم الكرة."
      },
      {
        "s": "Surface area of cube with side \\(s\\) is \\(4s^2\\)",
        "s_ar": "المساحة الكلية لسطح مكعب طول ضلعه \\(s\\) هي \\(4s^2\\)",
        "a": false,
        "ex": "SA of cube \\(=6s^2\\).",
        "ex_ar": "المساحة الكلية لسطح المكعب \\(=6s^2\\)."
      },
      {
        "s": "Volume of cone \\(=\\frac{1}{3}\\pi r^2 h\\)",
        "s_ar": "حجم المخروط \\(=\\frac{1}{3}\\pi r^2 h\\)",
        "a": true,
        "ex": "Correct.",
        "ex_ar": "صحيح."
      },
      {
        "s": "Volume of cylinder \\(=\\pi r^2 h\\)",
        "s_ar": "حجم الأسطوانة \\(=\\pi r^2 h\\)",
        "a": true,
        "ex": "Correct.",
        "ex_ar": "صحيح."
      }
    ]
  },
  {
    "t": "num",
    "ti": "Numeric Entry: Regular Polygon Exterior Angle",
    "ti_ar": "إدخال رقمي: الزاوية الخارجية للمضلع المنتظم",
    "q": "What is the measure in degrees of one exterior angle of a regular octagon (8 sides)?",
    "q_ar": "ما هو قياس الزاوية الخارجية بالدرجات لمضلع ثماني منتظم (8 أضلاع)؟",
    "a": 45,
    "ex": "The exterior angle of any regular n-gon is 360° / n. For an octagon, 360° / 8 = 45°.",
    "ex_ar": "الزاوية الخارجية لأي مضلع منتظم ذي n ضلعاً هي 360° ÷ n. وللثماني المنتظم: 360° ÷ 8 = 45°."
  },
  {
    "t": "ord",
    "ti": "Order the Steps: Area of an Oblique Triangle by Law of Cosines",
    "ti_ar": "رتّب الخطوات: حساب مساحة مثلث غير قائم بصيغة هيرون",
    "prompt": "Arrange the steps to find the area of \\(\\triangle ABC\\) given sides \\(a = 5, b = 7, c = 8\\):",
    "prompt_ar": "رتب خطوات حساب مساحة المثلث \\(\\triangle ABC\\) الذي أطوال أضلاعه \\(a = 5, b = 7, c = 8\\):",
    "items": [
      "Calculate the semi-perimeter: s = (5 + 7 + 8)/2 = 10.",
      "Apply Heron's formula: A = √[s(s - a)(s - b)(s - c)].",
      "Substitute side lengths: A = √[10(10 - 5)(10 - 7)(10 - 8)].",
      "Simplify under the radical: A = √[10 · 5 · 3 · 2] = √300.",
      "Factor perfect squares: A = 10√3."
    ],
    "items_ar": [
      "حساب نصف المحيط: s = (5 + 7 + 8)/2 = 10.",
      "تطبيق صيغة هيرون: A = √[s(s - a)(s - b)(s - c)].",
      "التعويض بأطوال الأضلاع: A = √[10(10 - 5)(10 - 7)(10 - 8)].",
      "تبسيط ما تحت الجذر: A = √[10 · 5 · 3 · 2] = √300.",
      "إخراج المربعات الكاملة خارج الجذر: A = 10√3."
    ],
    "ex": "Using Heron's formula s = 10 gives √[10(5)(3)(2)] = √300 = 10√3.",
    "ex_ar": "استخدام صيغة هيرون عند s = 10 يعطي √[10(5)(3)(2)] = √300 = 10√3."
  },
  {
    "t": "cat",
    "ti": "Categorize: Triangle & Polygon Properties",
    "ti_ar": "تصنيف: خصائص وقوانين المثلثات والمضلعات",
    "categories": [
      "Angles in Polygons",
      "Right Triangle Relations",
      "Oblique Triangle Formulas"
    ],
    "categories_ar": [
      "زوايا المضلعات",
      "علاقات المثلث القائم",
      "قوانين المثلثات المائلة"
    ],
    "items": [
      {
        "s": "Sum of interior angles = (n - 2) × 180°",
        "s_ar": "مجموع الزوايا الداخلية = (n - 2) × 180°",
        "cat": 0
      },
      {
        "s": "Exterior angles of any convex polygon sum to 360°",
        "s_ar": "مجموع الزوايا الخارجية لأي مضلع محدب يساوي 360°",
        "cat": 0
      },
      {
        "s": "Pythagorean theorem a² + b² = c²",
        "s_ar": "نظرية فيثاغورس a² + b² = c²",
        "cat": 1
      },
      {
        "s": "Law of Cosines: c² = a² + b² - 2ab cos(C)",
        "s_ar": "قانون جيوب التمام: c² = a² + b² - 2ab cos(C)",
        "cat": 2
      },
      {
        "s": "Heron's formula for area: √[s(s - a)(s - b)(s - c)]",
        "s_ar": "صيغة هيرون للمساحة: √[s(s - a)(s - b)(s - c)]",
        "cat": 2
      },
      {
        "s": "Trigonometric ratios: sin = opp/hyp, cos = adj/hyp",
        "s_ar": "النسب المثلثية: sin = المقابل/الوتر، cos = المجاور/الوتر",
        "cat": 1
      }
    ],
    "ex": "Polygon angle sums depend on n, right triangles use Pythagorean relations, and oblique triangles use the Law of Cosines and Heron's formula.",
    "ex_ar": "يعتمد مجموع زوايا المضلع على n، وتستخدم المثلثات القائمة علاقات فيثاغورس، وتستخدم المثلثات المائلة قانون جيوب التمام وصيغة هيرون."
  },
  {
    "t": "sr",
    "ti": "Worked Example: Interior Angle of a Regular Polygon",
    "ti_ar": "مثال محلول: الزاوية الداخلية لمضلع منتظم",
    "steps": [
      "A regular pentagon has 5 equal interior angles. Sum of interior angles: \\((5-2)\\times180°=540°\\).",
      "Since the pentagon is regular, divide equally: \\(\\dfrac{540°}{5}\\).",
      "Each angle measures \\(108°\\)."
    ],
    "steps_ar": [
      "المضلع الخماسي المنتظم له 5 زوايا داخلية متطابقة. مجموع الزوايا الداخلية: \\((5-2)\\times180°=540°\\).",
      "بما أن الخماسي منتظم، نقسم المجموع بالتساوي: \\(\\dfrac{540°}{5}\\).",
      "قياس كل زاوية هو \\(108°\\)."
    ]
  },
  {
    "t": "se",
    "ti": "Spot the Error: Area & Volume Similarity Scaling (Lines, Triangles & Polygons)",
    "ti_ar": "اكتشف الخطأ: معامل تشابه المساحات والحجوم (المستقيمات والمثلثات والمضلعات)",
    "q": "Two similar solids have linear scale factor \\(k = 2\\). The smaller solid has surface area \\(10\\text{ cm}^2\\). Where is the error?",
    "q_ar": "مجسمان متشابهان معامل التشابه الخطي بينهما \\(k = 2\\)، ومساحة سطح الأصغر \\(10\\text{ cm}^2\\). أين الخطأ؟",
    "steps": [
      "Identify the linear ratio of corresponding edges as \\(1 : 2\\).",
      "Multiply the surface area directly by \\(2\\) instead of \\(2^2\\): \\(A_{\\text{large}} = 10 \\times 2 = 20\\text{ cm}^2\\).",
      "Report \\(20\\text{ cm}^2\\) as the larger surface area."
    ],
    "steps_ar": [
      "تحديد نسبة التشابه الخطي للأضلاع المتناظرة \\(1 : 2\\).",
      "ضرب المساحة السطحية في \\(2\\) مباشرة بدلاً من \\(2^2\\): \\(A = 20\\text{ cm}^2\\).",
      "اعتماد الناتج كمساحة للمجسم الأكبر."
    ],
    "errorStep": 2,
    "reasons": [
      "Areas of similar figures scale by \\(k^2 = 4\\) (giving \\(40\\text{ cm}^2\\)), and volumes scale by \\(k^3 = 8\\).",
      "Areas scale by \\(\\sqrt{k}\\).",
      "Similar solids always have equal surface areas."
    ],
    "reasons_ar": [
      "نسبة المساحات تساوي مربع معامل التشابه \\(k^2 = 4\\) (أي \\(40\\text{ cm}^2\\))، ونسبة الحجوم \\(k^3 = 8\\).",
      "المساحات تتناسب مع \\(\\sqrt{k}\\).",
      "المجسمات المتشابهة متساوية المساحة دائماً."
    ],
    "correctReason": 0
  },
  {
    "t": "ms",
    "ti": "Examiner Mode: Circle Theorems, Sectors & Similarity (Lines, Triangles & Polygons)",
    "ti_ar": "وضع المصحح: نظريات الدائرة والقطاعات والتشابه (المستقيمات والمثلثات والمضلعات)",
    "q": "A circle has equation \\((x - 2)^2 + (y + 2)^2 = 36\\). (a) State its center and radius \\(r\\). (b) A sector of this circle subtends \\(\\theta = \\frac{\\pi}{2}\\) radians; find exact arc length and sector area in terms of \\(\\pi\\).",
    "q_ar": "دائرة معادلتها \\((x - 2)^2 + (y + 2)^2 = 36\\). (أ) اذكر المركز ونصف القطر \\(r\\). (ب) قطاع في هذه الدائرة زاويته المركزية \\(\\theta = \\frac{\\pi}{2}\\) راديان؛ أوجد طول القوس ومساحة القطاع بدلالة \\(\\pi\\).",
    "parts": [
      {
        "label": "Part (a) — Circle Center & Radius",
        "marks": 2,
        "rubric": [
          {
            "code": "B1",
            "marks": 1,
            "text": "Center \\((h, k) = (2, -2)\\)."
          },
          {
            "code": "B1",
            "marks": 1,
            "text": "Radius \\(r = \\sqrt{36} = 6\\)."
          }
        ]
      },
      {
        "label": "Part (b) — Radian Arc Length & Sector Area",
        "marks": 2,
        "rubric": [
          {
            "code": "A1",
            "marks": 1,
            "text": "Arc length \\(s = r\\theta = 6 \\cdot \\frac{\\pi}{2} = 3\\pi\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "Sector area \\(A = \\frac{1}{2} r^2 \\theta = \\frac{1}{2}(36)\\frac{\\pi}{2} = 9\\pi\\)."
          }
        ]
      }
    ],
    "parts_ar": [
      {
        "label": "الجزء (أ) — مركز الدائرة ونصف قطرها",
        "marks": 2,
        "rubric": [
          {
            "code": "B1",
            "marks": 1,
            "text": "المركز \\((2, -2)\\)."
          },
          {
            "code": "B1",
            "marks": 1,
            "text": "نصف القطر \\(r = \\sqrt{36} = 6\\)."
          }
        ]
      },
      {
        "label": "الجزء (ب) — طول القوس ومساحة القطاع بالراديان",
        "marks": 2,
        "rubric": [
          {
            "code": "A1",
            "marks": 1,
            "text": "طول القوس \\(s = r\\theta = 3\\pi\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "مساحة القطاع \\(A = \\frac{1}{2} r^2 \\theta = 9\\pi\\)."
          }
        ]
      }
    ]
  },
  {
    "t": "sb",
    "ti": "Step Builder: Circle Radius, Polygon Angles & Similarity (Lines, Triangles & Polygons)",
    "ti_ar": "بناء الخطوات: الدائرة وزوايا المضلعات والتشابه (المستقيمات والمثلثات والمضلعات)",
    "steps": [
      {
        "l": "From \\((x - 2)^2 + (y + 2)^2 = 36\\), find the radius \\(r =\\)",
        "a": "6",
        "h": "Take the square root of 36."
      },
      {
        "l": "With linear similarity ratio \\(1 : 2\\), find the volume ratio \\(1 : k^3\\) where \\(k^3 =\\)",
        "a": "8",
        "h": "Cube 2."
      },
      {
        "l": "Find one exterior angle (in degrees) of a regular \\(6\\)-sided hexagon:",
        "a": "60",
        "h": "Compute 360 / 6."
      }
    ],
    "steps_ar": [
      {
        "l": "من المعادلة \\((x - 2)^2 + (y + 2)^2 = 36\\)، أوجد نصف القطر \\(r =\\)",
        "a": "6",
        "h": "خذ الجذر التربيعي للعدد 36."
      },
      {
        "l": "إذا كانت نسبة التشابه الخطي \\(1 : 2\\)، فإن نسبة الحجوم \\(k^3 =\\)",
        "a": "8",
        "h": "احسب مكعب 2."
      },
      {
        "l": "أوجد قياس الزاوية الخارجية بالدرجات لمضلع سداسي منتظم:",
        "a": "60",
        "h": "احسب 360 ÷ 6."
      }
    ]
  },
  {
    "t": "mt",
    "ti": "Matching: Circle Theorems & Solid Mensuration (Lines, Triangles & Polygons)",
    "ti_ar": "مطابقة: نظريات الدائرة وقوانين القياس الهندسي (المستقيمات والمثلثات والمضلعات)",
    "p": [
      {
        "l": "Inscribed angle in a semicircle",
        "r": "Always \\(90^\\circ\\) (Thales’ theorem)"
      },
      {
        "l": "Opposite angles of a cyclic quadrilateral",
        "r": "Supplementary (\\(\\alpha + \\gamma = 180^\\circ\\))"
      },
      {
        "l": "Cone volume vs. Cylinder volume (same \\(r, h\\))",
        "r": "\\(V_{\\text{cone}} = \\frac{1}{3} \\pi r^2 h\\)"
      },
      {
        "l": "Power of a Point (intersecting chords)",
        "r": "\\(PA \\cdot PB = PC \\cdot PD\\)"
      }
    ],
    "p_ar": [
      {
        "l": "الزاوية المحيطية المرسومة في نصف دائرة",
        "r": "تساوي دائماً \\(90^\\circ\\) (مبرهنة طاليس)"
      },
      {
        "l": "الزاويتان المتقابلتان في الرباعي الدائري",
        "r": "متكاملتان ومجموعهما \\(180^\\circ\\)"
      },
      {
        "l": "حجم المخروط مقارنة بالأسطوانة (لنفس \\(r, h\\))",
        "r": "\\(V_{\\text{cone}} = \\frac{1}{3} \\pi r^2 h\\)"
      },
      {
        "l": "قوة نقطة بالنسبة لدائرة (الأوتار المتقاطعة)",
        "r": "\\(PA \\cdot PB = PC \\cdot PD\\)"
      }
    ]
  }
];
D["est2-trig"] = [
  {
    "t": "sb",
    "ti": "Step Builder: Solve \\(2\\sin\\theta=\\sqrt{3}\\), \\(0°\\le\\theta\\le360°\\)",
    "ti_ar": "بناء الخطوات: حل \\(2\\sin\\theta=\\sqrt{3}\\) حيث \\(0°\\le\\theta\\le360°\\)",
    "steps": [
      {
        "l": "\\(\\sin\\theta=\\)",
        "l_ar": "\\(\\sin\\theta=\\)",
        "a": "sqrt(3)/2",
        "h": "Divide both sides of \\(2\\sin\\theta = \\sqrt{3}\\) by \\(2\\).",
        "h_ar": "اقسم طرفي المعادلة \\(2\\sin\\theta = \\sqrt{3}\\) على \\(2\\)."
      },
      {
        "l": "Reference angle: \\(\\arcsin(\\sqrt{3}/2)=\\)",
        "l_ar": "زاوية الإسناد: \\(\\arcsin(\\sqrt{3}/2)=\\)",
        "a": "60",
        "h": "Identify the acute special angle in degrees whose sine equals \\(\\frac{\\sqrt{3}}{2}\\).",
        "h_ar": "حدد الزاوية الحادة القياسية بالدرجات التي جيبها يساوي \\(\\frac{\\sqrt{3}}{2}\\)."
      },
      {
        "l": "2nd solution \\(=180°-60°=\\)",
        "l_ar": "الحل الثاني \\(=180°-60°=\\)",
        "a": "120",
        "h": "Perform the calculation in \\(180°-60°\\) to find the result.",
        "h_ar": "أجرِ العملية الحسابية في المقدار \\(180°-60°\\) للوصول إلى النتيجة."
      },
      {
        "l": "Both solutions: 60° and",
        "l_ar": "الحلان هما: 60° و",
        "a": "120",
        "h": "Enter the second-quadrant angle found in the previous step.",
        "h_ar": "اكتب زاوية الربع الثاني التي حسبتها في الخطوة السابقة."
      }
    ]
  },
  {
    "t": "num",
    "ti": "Numeric Entry: Sinusoidal Period",
    "ti_ar": "إدخال رقمي: دورة الدالة الجيبية",
    "q": "Find the period of the function \\(f(x) = 3\\sin(4x - \\pi) + 2\\) in terms of \\(\\pi\\). Enter the denominator \\(k\\) if the period is \\(\\pi / k\\).",
    "q_ar": "أوجد دورة الدالة \\(f(x) = 3\\sin(4x - \\pi) + 2\\) بدلالة \\(\\pi\\). أدخل المقام \\(k\\) إذا كانت الدورة هي \\(\\pi / k\\).",
    "a": 2,
    "ex": "For y = A sin(Bx - C) + D, Period = 2π / B. Here B = 4, so Period = 2π / 4 = π / 2. Thus k = 2.",
    "ex_ar": "في الدالة y = A sin(Bx - C) + D، الدورة = 2π / B. هنا B = 4، إذن الدورة = 2π / 4 = π / 2. وبالتالي k = 2."
  },
  {
    "t": "cat",
    "ti": "Categorize: Signs of Trig Functions by Quadrant",
    "ti_ar": "تصنيف: إشارات الدوال المثلثية حسب الأرباع",
    "categories": [
      "Quadrant I",
      "Quadrant II",
      "Quadrant III",
      "Quadrant IV"
    ],
    "categories_ar": [
      "الربع الأول",
      "الربع الثاني",
      "الربع الثالث",
      "الربع الرابع"
    ],
    "items": [
      {
        "s": "\\sin > 0,\\; \\cos > 0",
        "s_ar": "\\sin > 0,\\; \\cos > 0",
        "cat": 0
      },
      {
        "s": "\\sin > 0,\\; \\cos < 0",
        "s_ar": "\\sin > 0,\\; \\cos < 0",
        "cat": 1
      },
      {
        "s": "\\sin < 0,\\; \\cos < 0,\\; \\tan > 0",
        "s_ar": "\\sin < 0,\\; \\cos < 0,\\; \\tan > 0",
        "cat": 2
      },
      {
        "s": "\\sin < 0,\\; \\cos > 0,\\; \\tan < 0",
        "s_ar": "\\sin < 0,\\; \\cos > 0,\\; \\tan < 0",
        "cat": 3
      }
    ],
    "ex": "By the ASTC (All Students Take Calculus) rule: All positive in Q I; Sine positive in Q II; Tangent positive in Q III; Cosine positive in Q IV.",
    "ex_ar": "وفق قاعدة الإشارات ASTC: الكل موجب في الربع الأول؛ الجيب موجب في الربع الثاني؛ الظل موجب في الربع الثالث؛ جيب التمام موجب في الربع الرابع."
  },
  {
    "t": "ord",
    "ti": "Order the Steps: Verifying a Trigonometric Identity",
    "ti_ar": "رتّب الخطوات: إثبات صحة متطابقة مثلثية",
    "prompt": "Arrange the steps to prove \\(\\dfrac{\\sin^2\\theta}{1 - \\cos\\theta} = 1 + \\cos\\theta\\):",
    "prompt_ar": "رتب خطوات إثبات صحة المتطابقة \\(\\dfrac{\\sin^2\\theta}{1 - \\cos\\theta} = 1 + \\cos\\theta\\):",
    "items": [
      "Start with the left-hand side: sin²(θ) / (1 - cos(θ)).",
      "Apply the Pythagorean identity: replace sin²(θ) with 1 - cos²(θ).",
      "Factor the numerator as a difference of squares: (1 - cos(θ))(1 + cos(θ)).",
      "Cancel the common nonzero factor (1 - cos(θ)) from numerator and denominator.",
      "Conclude with the simplified right-hand side: 1 + cos(θ)."
    ],
    "items_ar": [
      "البدء بالطرف الأيسر: sin²(θ) / (1 - cos(θ)).",
      "تطبيق متطابقة فيثاغورس: استبدال sin²(θ) بـ 1 - cos²(θ).",
      "تحليل البسط كفرق بين مربعين: (1 - cos(θ))(1 + cos(θ)).",
      "اختصار العامل المشترك غير الصفري (1 - cos(θ)) من البسط والمقام.",
      "الوصول إلى الطرف الأيمن المطلوب: 1 + cos(θ)."
    ],
    "ex": "Using sin²(θ) = 1 - cos²(θ) and factoring as a difference of squares establishes the identity algebraically.",
    "ex_ar": "استخدام sin²(θ) = 1 - cos²(θ) والتحليل كفرق بين مربعين يثبت المتطابقة جبرياً."
  },
  {
    "t": "sr",
    "ti": "Worked Example: Law of Cosines",
    "ti_ar": "مثال محلول: قانون جيوب التمام",
    "steps": [
      "Find side \\(c\\) with \\(a=7\\), \\(b=10\\), included angle \\(C=60°\\). Law of Cosines: \\(c^2=a^2+b^2-2ab\\cos C\\).",
      "Substitute: \\(c^2=49+100-2(7)(10)\\cos60°=149-140(0.5)\\).",
      "\\(c^2=149-70=79\\Rightarrow c=\\sqrt{79}\\approx8.89\\)."
    ],
    "steps_ar": [
      "أوجد الضلع \\(c\\) إذا كان \\(a=7\\)، \\(b=10\\)، والزاوية المحصورة \\(C=60°\\). قانون جيوب التمام: \\(c^2=a^2+b^2-2ab\\cos C\\).",
      "التعويض: \\(c^2=49+100-2(7)(10)\\cos60°=149-140(0.5)\\).",
      "\\(c^2=149-70=79\\Rightarrow c=\\sqrt{79}\\approx8.89\\)."
    ]
  },
  {
    "t": "se",
    "ti": "Spot the Error: Quadrant Sign & Dividing by \\(\\sin\\theta\\) (Trigonometry)",
    "ti_ar": "اكتشف الخطأ: إشارة الربع والقسمة على \\(\\sin\\theta\\) (حساب المثلثات والقوانين المثلثية)",
    "q": "Solve \\(2\\sin\\theta\\cos\\theta = \\sin\\theta\\) for \\(0 \\le \\theta < 2\\pi\\). Which step loses valid roots?",
    "q_ar": "عند حل المعادلة \\(2\\sin\\theta\\cos\\theta = \\sin\\theta\\) على الفترة \\(0 \\le \\theta < 2\\pi\\)، أي خطوة تضيع حلولاً صحيحة؟",
    "steps": [
      "Divide both sides by \\(\\sin\\theta\\) without checking \\(\\sin\\theta = 0\\), obtaining \\(2\\cos\\theta = 1\\).",
      "Solve \\(\\cos\\theta = \\frac{1}{2}\\) to find \\(\\theta = \\frac{\\pi}{3}, \\frac{5\\pi}{3}\\).",
      "State \\(\\left\\{\\frac{\\pi}{3}, \\frac{5\\pi}{3}\\right\\}\\) as the complete solution set."
    ],
    "steps_ar": [
      "قسمة الطرفين على \\(\\sin\\theta\\) دون فحص حالة \\(\\sin\\theta = 0\\) للحصول على \\(2\\cos\\theta = 1\\).",
      "حل \\(\\cos\\theta = \\frac{1}{2}\\) لإيجاد \\(\\theta = \\frac{\\pi}{3}, \\frac{5\\pi}{3}\\).",
      "كتابة هاتين الزاويتين فقط كمجموعة حل كاملة."
    ],
    "errorStep": 1,
    "reasons": [
      "Dividing by \\(\\sin\\theta\\) discards the roots where \\(\\sin\\theta = 0\\) (\\(\\theta = 0, \\pi\\)); instead factor \\(\\sin\\theta(2\\cos\\theta - 1) = 0\\).",
      "\\(\\cos\\theta = \\frac{1}{2}\\) has no solutions in Quadrant IV.",
      "\\(\\sin\\theta\\) can never equal zero."
    ],
    "reasons_ar": [
      "القسمة على \\(\\sin\\theta\\) تحذف الجذور التي تجعل \\(\\sin\\theta = 0\\) (وهي \\(0, \\pi\\))؛ الصواب نقل الحدود والتحليل \\(\\sin\\theta(2\\cos\\theta - 1) = 0\\).",
      "لا يوجد حل لمعادلة \\(\\cos\\theta = \\frac{1}{2}\\) في الربع الرابع.",
      "لا يمكن أن يساوي \\(\\sin\\theta\\) صفراً."
    ],
    "correctReason": 0
  },
  {
    "t": "ms",
    "ti": "Examiner Mode: Quadrant Identities & Cosine Rule (Trigonometry)",
    "ti_ar": "وضع المصحح: المتطابقات المثلثية وقانون جيب التمام (حساب المثلثات والقوانين المثلثية)",
    "q": "Suppose \\(\\sin\\theta = \\dfrac{5}{13}\\) with \\(\\theta \\in \\left(\\frac{\\pi}{2}, \\pi\\right)\\) (Quadrant II). (a) Find exact values of \\(\\cos\\theta\\) and \\(\\tan\\theta\\). (b) Evaluate \\(\\sin(2\\theta)\\).",
    "q_ar": "إذا كان \\(\\sin\\theta = \\dfrac{5}{13}\\) حيث \\(\\theta \\in \\left(\\frac{\\pi}{2}, \\pi\\right)\\) (الربع الثاني). (أ) أوجد القيمة الدقيقة لكل من \\(\\cos\\theta\\) و\\(\\tan\\theta\\). (ب) احسب \\(\\sin(2\\theta)\\).",
    "parts": [
      {
        "label": "Part (a) — Quadrant II Cosine & Tangent",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "\\(\\cos^2\\theta = 1 - \\frac{25}{169} = \\frac{144}{169}\\), negative in QII \\(\\implies \\cos\\theta = -\\frac{12}{13}\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "\\(\\tan\\theta = \\frac{\\sin\\theta}{\\cos\\theta} = -\\frac{5}{12}\\)."
          }
        ]
      },
      {
        "label": "Part (b) — Double-Angle Sine",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "Apply \\(\\sin(2\\theta) = 2\\sin\\theta\\cos\\theta\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "\\(\\sin(2\\theta) = 2\\left(\\frac{5}{13}\\right)\\left(-\\frac{12}{13}\\right) = -\\frac{120}{169}\\)."
          }
        ]
      }
    ],
    "parts_ar": [
      {
        "label": "الجزء (أ) — جيب التمام والظل في الربع الثاني",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "في الربع الثاني \\(\\cos\\theta < 0\\) ومن متطابقة فيثاغورس \\(\\cos\\theta = -\\frac{12}{13}\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "\\(\\tan\\theta = -\\frac{5}{12}\\)."
          }
        ]
      },
      {
        "label": "الجزء (ب) — جيب ضعف الزاوية",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "تطبيق المتطابقة \\(\\sin(2\\theta) = 2\\sin\\theta\\cos\\theta\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "\\(\\sin(2\\theta) = -\\frac{120}{169}\\)."
          }
        ]
      }
    ]
  },
  {
    "t": "mt",
    "ti": "Matching: Trigonometric & Inverse-Trig Identities (Trigonometry)",
    "ti_ar": "مطابقة: المتطابقات المثلثية والفروع العكسية (حساب المثلثات والقوانين المثلثية)",
    "p": [
      {
        "l": "\\(1 + \\tan^2\\theta\\)",
        "r": "\\(\\sec^2\\theta\\)"
      },
      {
        "l": "Cosine Rule for side \\(c\\)",
        "r": "\\(c^2 = a^2 + b^2 - 2ab\\cos C\\)"
      },
      {
        "l": "Principal range of \\(\\arccos x\\)",
        "r": "\\([0, \\pi]\\)"
      },
      {
        "l": "Period of \\(3\\sin(3x)\\)",
        "r": "\\(\\dfrac{2\\pi}{3}\\)"
      }
    ],
    "p_ar": [
      {
        "l": "\\(1 + \\tan^2\\theta\\)",
        "r": "\\(\\sec^2\\theta\\)"
      },
      {
        "l": "قانون جيب التمام للضلع \\(c\\)",
        "r": "\\(c^2 = a^2 + b^2 - 2ab\\cos C\\)"
      },
      {
        "l": "المدى الرئيسي للدالة \\(\\arccos x\\)",
        "r": "\\([0, \\pi]\\)"
      },
      {
        "l": "دورة الدالة \\(3\\sin(3x)\\)",
        "r": "\\(\\dfrac{2\\pi}{3}\\)"
      }
    ]
  },
  {
    "t": "qc",
    "ti": "Quick Check: Period of a Transformed Sinusoid (Trigonometry)",
    "ti_ar": "فحص سريع: دورة الدالة الجيبية (حساب المثلثات والقوانين المثلثية)",
    "q": "What is the fundamental period of \\(f(x) = 3\\sin(3x - \\pi) + 1\\)?",
    "q_ar": "ما الدورة الأساسية للدالة \\(f(x) = 3\\sin(3x - \\pi) + 1\\)؟",
    "o": [
      "\\(\\dfrac{2\\pi}{3}\\)",
      "\\(6\\pi\\)",
      "\\(\\dfrac{\\pi}{3}\\)",
      "\\(3\\pi\\)"
    ],
    "o_ar": [
      "\\(\\dfrac{2\\pi}{3}\\)",
      "\\(6\\pi\\)",
      "\\(\\dfrac{\\pi}{3}\\)",
      "\\(3\\pi\\)"
    ],
    "a": 0,
    "ex": "For \\(A\\sin(Bx + C) + D\\), the period is \\(\\frac{2\\pi}{|B|} = \\frac{2\\pi}{3}\\).",
    "ex_ar": "دورة الدالة \\(A\\sin(Bx + C) + D\\) تساوي \\(\\frac{2\\pi}{|B|} = \\frac{2\\pi}{3}\\)."
  }
];
D["est2-circles"] = [
  {
    "t": "fn",
    "ti": "Explorer: Circle \\(x^2+y^2=r^2\\)",
    "ti_ar": "مستكشف: الدائرة \\(x^2+y^2=r^2\\)",
    "fns": [
      {
        "expr": "sqrt(r^2-x^2)",
        "color": "#1E3A6E",
        "label": "upper"
      },
      {
        "expr": "-sqrt(r^2-x^2)",
        "color": "#B8801F",
        "label": "lower"
      }
    ],
    "xrange": [
      -5,
      5
    ],
    "yrange": [
      -5,
      5
    ],
    "params": [
      {
        "name": "r",
        "label": "Radius r",
        "min": 1,
        "max": 4,
        "step": 1,
        "default": 2
      }
    ]
  },
  {
    "t": "num",
    "ti": "Numeric Entry: Tangent Segment Length",
    "ti_ar": "إدخال رقمي: طول قطعة المماس",
    "q": "A point \\(P\\) is located 13 units from the center of a circle with radius 5. What is the length of the tangent segment from \\(P\\) to the point of tangency on the circle?",
    "q_ar": "تقع النقطة \\(P\\) على بعد 13 وحدة من مركز دائرة نصف قطرها 5. ما هو طول قطعة المماس المرسومة من \\(P\\) إلى نقطة التماس على الدائرة؟",
    "a": 12,
    "ex": "The radius to the point of tangency forms a right triangle with hypotenuse 13 and leg 5. By the Pythagorean theorem: tangent length = √(13² - 5²) = √(169 - 25) = √144 = 12.",
    "ex_ar": "نصف القطر الواصل إلى نقطة التماس يعامد المماس، مكوّناً مثلثاً قائماً وتره 13 وضلعه 5. بنظرية فيثاغورس: طول المماس = √(13² - 5²) = √(169 - 25) = √144 = 12."
  },
  {
    "t": "cat",
    "ti": "Categorize: Conic Sections from Standard Equations",
    "ti_ar": "تصنيف: القطوع المخروطية من معادلاتها القياسية",
    "categories": [
      "Circle",
      "Ellipse",
      "Hyperbola",
      "Parabola"
    ],
    "categories_ar": [
      "دائرة",
      "قطع ناقص",
      "قطع زائد",
      "قطع مكافئ"
    ],
    "items": [
      {
        "s": "\\((x - 2)^2 + (y + 3)^2 = 16\\)",
        "s_ar": "\\((x - 2)^2 + (y + 3)^2 = 16\\)",
        "cat": 0
      },
      {
        "s": "\\(\\dfrac{(x - 1)^2}{25} + \\dfrac{(y + 2)^2}{9} = 1\\)",
        "s_ar": "\\(\\dfrac{(x - 1)^2}{25} + \\dfrac{(y + 2)^2}{9} = 1\\)",
        "cat": 1
      },
      {
        "s": "\\(\\dfrac{(x + 4)^2}{16} - \\dfrac{(y - 1)^2}{9} = 1\\)",
        "s_ar": "\\(\\dfrac{(x + 4)^2}{16} - \\dfrac{(y - 1)^2}{9} = 1\\)",
        "cat": 2
      },
      {
        "s": "\\((y - 3)^2 = 8(x + 1)\\)",
        "s_ar": "\\((y - 3)^2 = 8(x + 1)\\)",
        "cat": 3
      }
    ],
    "ex": "Equal coefficients on squared terms indicate a circle; unequal positive coefficients indicate an ellipse; opposite signs indicate a hyperbola; only one squared variable indicates a parabola.",
    "ex_ar": "المعاملات المتساوية للحدود المربعة تدل على دائرة؛ والمعاملات الموجبة المختلفة تدل على قطع ناقص؛ والإشارات المتعاكسة تدل على قطع زائد؛ ووجود متغير تربيعي واحد فقط يدل على قطع مكافئ."
  },
  {
    "t": "ord",
    "ti": "Order the Steps: Completing the Square for Circle Equation",
    "ti_ar": "رتّب الخطوات: إكمال المربع لمعادلة الدائرة",
    "prompt": "Arrange the steps to find the center and radius of \\(x^2 + y^2 - 6x + 8y = 0\\):",
    "prompt_ar": "رتب خطوات إيجاد مركز ونصف قطر الدائرة \\(x^2 + y^2 - 6x + 8y = 0\\):",
    "items": [
      "Rearrange terms grouping variables: (x² - 6x) + (y² + 8y) = 0.",
      "Complete the square for x: add (-6/2)² = 9 to both sides.",
      "Complete the square for y: add (8/2)² = 16 to both sides.",
      "Write in factored form: (x - 3)² + (y + 4)² = 25.",
      "Identify center (h, k) = (3, -4) and radius r = √25 = 5."
    ],
    "items_ar": [
      "إعادة ترتيب وتجميع الحدود المتشابهة: (x² - 6x) + (y² + 8y) = 0.",
      "إكمال المربع لـ x: إضافة (-6/2)² = 9 إلى كلا الطرفين.",
      "إكمال المربع لـ y: إضافة (8/2)² = 16 إلى كلا الطرفين.",
      "الكتابة في صورة مربعات كاملة: (x - 3)² + (y + 4)² = 25.",
      "تحديد المركز (h, k) = (3, -4) ونصف القطر r = √25 = 5."
    ],
    "ex": "Completing the square on both x and y puts the equation into standard form (x - h)² + (y - k)² = r².",
    "ex_ar": "إكمال المربع لـ x و y يحول المعادلة إلى الصورة القياسية للدائرة (x - h)² + (y - k)² = r²."
  },
  {
    "t": "sr",
    "ti": "Worked Example: Equation of a Circle",
    "ti_ar": "مثال محلول: معادلة الدائرة",
    "steps": [
      "Write the equation of a circle with center \\((-1,2)\\) and radius 5. Standard form: \\((x-h)^2+(y-k)^2=r^2\\).",
      "Substitute \\(h=-1\\), \\(k=2\\), \\(r=5\\): \\((x-(-1))^2+(y-2)^2=5^2\\).",
      "Simplify: \\((x+1)^2+(y-2)^2=25\\)."
    ],
    "steps_ar": [
      "اكتب معادلة الدائرة التي مركزها \\((-1,2)\\) ونصف قطرها 5. الصيغة القياسية: \\((x-h)^2+(y-k)^2=r^2\\).",
      "التعويض بـ \\(h=-1\\)، \\(k=2\\)، \\(r=5\\): \\((x-(-1))^2+(y-2)^2=5^2\\).",
      "التبسيط: \\((x+1)^2+(y-2)^2=25\\)."
    ]
  },
  {
    "t": "qc",
    "ti": "Quick Check: Circle Center",
    "ti_ar": "فحص سريع: مركز الدائرة",
    "q": "The center of \\((x-3)^2+(y+4)^2=16\\) is:",
    "q_ar": "مركز الدائرة \\((x-3)^2+(y+4)^2=16\\) هو:",
    "o": [
      "\\((3,-4)\\)",
      "\\((-3,4)\\)",
      "\\((3,4)\\)",
      "\\((-3,-4)\\)"
    ],
    "o_ar": [
      "\\((3,-4)\\)",
      "\\((-3,4)\\)",
      "\\((3,4)\\)",
      "\\((-3,-4)\\)"
    ],
    "a": 0,
    "ex": "Standard form \\((x-h)^2+(y-k)^2=r^2\\) has center \\((h,k)=(3,-4)\\).",
    "ex_ar": "الصيغة القياسية \\((x-h)^2+(y-k)^2=r^2\\) مركزها \\((h,k)=(3,-4)\\)."
  },
  {
    "t": "se",
    "ti": "Spot the Error: Area & Volume Similarity Scaling (Circles & Conic Sections)",
    "ti_ar": "اكتشف الخطأ: معامل تشابه المساحات والحجوم (الدوائر والقطوع المخروطية)",
    "q": "Two similar solids have linear scale factor \\(k = 4\\). The smaller solid has surface area \\(10\\text{ cm}^2\\). Where is the error?",
    "q_ar": "مجسمان متشابهان معامل التشابه الخطي بينهما \\(k = 4\\)، ومساحة سطح الأصغر \\(10\\text{ cm}^2\\). أين الخطأ؟",
    "steps": [
      "Identify the linear ratio of corresponding edges as \\(1 : 4\\).",
      "Multiply the surface area directly by \\(4\\) instead of \\(4^2\\): \\(A_{\\text{large}} = 10 \\times 4 = 40\\text{ cm}^2\\).",
      "Report \\(40\\text{ cm}^2\\) as the larger surface area."
    ],
    "steps_ar": [
      "تحديد نسبة التشابه الخطي للأضلاع المتناظرة \\(1 : 4\\).",
      "ضرب المساحة السطحية في \\(4\\) مباشرة بدلاً من \\(4^2\\): \\(A = 40\\text{ cm}^2\\).",
      "اعتماد الناتج كمساحة للمجسم الأكبر."
    ],
    "errorStep": 2,
    "reasons": [
      "Areas of similar figures scale by \\(k^2 = 16\\) (giving \\(160\\text{ cm}^2\\)), and volumes scale by \\(k^3 = 64\\).",
      "Areas scale by \\(\\sqrt{k}\\).",
      "Similar solids always have equal surface areas."
    ],
    "reasons_ar": [
      "نسبة المساحات تساوي مربع معامل التشابه \\(k^2 = 16\\) (أي \\(160\\text{ cm}^2\\))، ونسبة الحجوم \\(k^3 = 64\\).",
      "المساحات تتناسب مع \\(\\sqrt{k}\\).",
      "المجسمات المتشابهة متساوية المساحة دائماً."
    ],
    "correctReason": 0
  },
  {
    "t": "ms",
    "ti": "Examiner Mode: Circle Theorems, Sectors & Similarity (Circles & Conic Sections)",
    "ti_ar": "وضع المصحح: نظريات الدائرة والقطاعات والتشابه (الدوائر والقطوع المخروطية)",
    "q": "A circle has equation \\((x - 4)^2 + (y + 4)^2 = 100\\). (a) State its center and radius \\(r\\). (b) A sector of this circle subtends \\(\\theta = \\frac{\\pi}{2}\\) radians; find exact arc length and sector area in terms of \\(\\pi\\).",
    "q_ar": "دائرة معادلتها \\((x - 4)^2 + (y + 4)^2 = 100\\). (أ) اذكر المركز ونصف القطر \\(r\\). (ب) قطاع في هذه الدائرة زاويته المركزية \\(\\theta = \\frac{\\pi}{2}\\) راديان؛ أوجد طول القوس ومساحة القطاع بدلالة \\(\\pi\\).",
    "parts": [
      {
        "label": "Part (a) — Circle Center & Radius",
        "marks": 2,
        "rubric": [
          {
            "code": "B1",
            "marks": 1,
            "text": "Center \\((h, k) = (4, -4)\\)."
          },
          {
            "code": "B1",
            "marks": 1,
            "text": "Radius \\(r = \\sqrt{100} = 10\\)."
          }
        ]
      },
      {
        "label": "Part (b) — Radian Arc Length & Sector Area",
        "marks": 2,
        "rubric": [
          {
            "code": "A1",
            "marks": 1,
            "text": "Arc length \\(s = r\\theta = 10 \\cdot \\frac{\\pi}{2} = 5\\pi\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "Sector area \\(A = \\frac{1}{2} r^2 \\theta = \\frac{1}{2}(100)\\frac{\\pi}{2} = 25\\pi\\)."
          }
        ]
      }
    ],
    "parts_ar": [
      {
        "label": "الجزء (أ) — مركز الدائرة ونصف قطرها",
        "marks": 2,
        "rubric": [
          {
            "code": "B1",
            "marks": 1,
            "text": "المركز \\((4, -4)\\)."
          },
          {
            "code": "B1",
            "marks": 1,
            "text": "نصف القطر \\(r = \\sqrt{100} = 10\\)."
          }
        ]
      },
      {
        "label": "الجزء (ب) — طول القوس ومساحة القطاع بالراديان",
        "marks": 2,
        "rubric": [
          {
            "code": "A1",
            "marks": 1,
            "text": "طول القوس \\(s = r\\theta = 5\\pi\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "مساحة القطاع \\(A = \\frac{1}{2} r^2 \\theta = 25\\pi\\)."
          }
        ]
      }
    ]
  },
  {
    "t": "sb",
    "ti": "Step Builder: Circle Radius, Polygon Angles & Similarity (Circles & Conic Sections)",
    "ti_ar": "بناء الخطوات: الدائرة وزوايا المضلعات والتشابه (الدوائر والقطوع المخروطية)",
    "steps": [
      {
        "l": "From \\((x - 4)^2 + (y + 4)^2 = 100\\), find the radius \\(r =\\)",
        "a": "10",
        "h": "Take the square root of 100."
      },
      {
        "l": "With linear similarity ratio \\(1 : 4\\), find the volume ratio \\(1 : k^3\\) where \\(k^3 =\\)",
        "a": "64",
        "h": "Cube 4."
      },
      {
        "l": "Find one exterior angle (in degrees) of a regular \\(6\\)-sided hexagon:",
        "a": "60",
        "h": "Compute 360 / 6."
      }
    ],
    "steps_ar": [
      {
        "l": "من المعادلة \\((x - 4)^2 + (y + 4)^2 = 100\\)، أوجد نصف القطر \\(r =\\)",
        "a": "10",
        "h": "خذ الجذر التربيعي للعدد 100."
      },
      {
        "l": "إذا كانت نسبة التشابه الخطي \\(1 : 4\\)، فإن نسبة الحجوم \\(k^3 =\\)",
        "a": "64",
        "h": "احسب مكعب 4."
      },
      {
        "l": "أوجد قياس الزاوية الخارجية بالدرجات لمضلع سداسي منتظم:",
        "a": "60",
        "h": "احسب 360 ÷ 6."
      }
    ]
  },
  {
    "t": "mt",
    "ti": "Matching: Circle Theorems & Solid Mensuration (Circles & Conic Sections)",
    "ti_ar": "مطابقة: نظريات الدائرة وقوانين القياس الهندسي (الدوائر والقطوع المخروطية)",
    "p": [
      {
        "l": "Inscribed angle in a semicircle",
        "r": "Always \\(90^\\circ\\) (Thales’ theorem)"
      },
      {
        "l": "Opposite angles of a cyclic quadrilateral",
        "r": "Supplementary (\\(\\alpha + \\gamma = 180^\\circ\\))"
      },
      {
        "l": "Cone volume vs. Cylinder volume (same \\(r, h\\))",
        "r": "\\(V_{\\text{cone}} = \\frac{1}{3} \\pi r^2 h\\)"
      },
      {
        "l": "Power of a Point (intersecting chords)",
        "r": "\\(PA \\cdot PB = PC \\cdot PD\\)"
      }
    ],
    "p_ar": [
      {
        "l": "الزاوية المحيطية المرسومة في نصف دائرة",
        "r": "تساوي دائماً \\(90^\\circ\\) (مبرهنة طاليس)"
      },
      {
        "l": "الزاويتان المتقابلتان في الرباعي الدائري",
        "r": "متكاملتان ومجموعهما \\(180^\\circ\\)"
      },
      {
        "l": "حجم المخروط مقارنة بالأسطوانة (لنفس \\(r, h\\))",
        "r": "\\(V_{\\text{cone}} = \\frac{1}{3} \\pi r^2 h\\)"
      },
      {
        "l": "قوة نقطة بالنسبة لدائرة (الأوتار المتقاطعة)",
        "r": "\\(PA \\cdot PB = PC \\cdot PD\\)"
      }
    ]
  }
];
D["est2-solids"] = [
  {
    "t": "num",
    "ti": "Numeric Entry: Sphere Volume Scaling",
    "ti_ar": "إدخال رقمي: معامل تمدد حجم الكرة",
    "q": "If the radius of a sphere is multiplied by 3, by what factor is its volume multiplied?",
    "q_ar": "إذا ضُرب نصف قطر كرة في 3، فما المعامل الذي يتضاعف به حجمها؟",
    "a": 27,
    "ex": "Volume scales as the cube of the linear dimension: 3³ = 27.",
    "ex_ar": "يتناسب الحجم مع مكعب البعد الخطي: 3³ = 27."
  },
  {
    "t": "ord",
    "ti": "Order the Steps: Volume of a Frustum of a Cone",
    "ti_ar": "رتّب الخطوات: حجم المخروط الناقص",
    "prompt": "Arrange the steps to find the volume of a cone frustum with lower radius R, upper radius r, and height h:",
    "prompt_ar": "رتب خطوات حساب حجم مخروط ناقص نصف قطر قاعدته الكبرى R، وقاعدته الصغرى r، وارتفاعه h:",
    "items": [
      "Complete the full cone by extending sides to find apex height H using similar triangles: H / (H - h) = R / r.",
      "Calculate the volume of the entire large cone: V_large = (1/3)π R² H.",
      "Calculate the volume of the removed top cone: V_small = (1/3)π r² (H - h).",
      "Subtract top cone from large cone: V_frustum = V_large - V_small.",
      "Verify with standard frustum formula: V = (1/3)π h (R² + Rr + r²)."
    ],
    "items_ar": [
      "إكمال المخروط الأكبر بمد الراسم لإيجاد الارتفاع الكلي H بتشابه المثلثات: H / (H - h) = R / r.",
      "حساب حجم المخروط الأكبر كاملاً: V_large = (1/3)π R² H.",
      "حساب حجم المخروط الأصغر المقتطع في الأعلى: V_small = (1/3)π r² (H - h).",
      "طرح حجم المخروط الأصغر من المخروط الأكبر: V_frustum = V_large - V_small.",
      "التحقق باستخدام صيغة المخروط الناقص القياسية: V = (1/3)π h (R² + Rr + r²)."
    ],
    "ex": "The volume of a frustum is found by subtracting the removed cone from the larger cone, resulting in (1/3)π h (R² + Rr + r²).",
    "ex_ar": "يُحسب حجم المخروط الناقص بطرح المخروط الصغير المقتطع من المخروط الكبير، وينتج (1/3)π h (R² + Rr + r²)."
  },
  {
    "t": "cat",
    "ti": "Categorize: 3D Solid Geometric Formulas",
    "ti_ar": "تصنيف: قوانين المجسمات ثلاثية الأبعاد",
    "categories": [
      "Volume Formulas",
      "Surface Area Formulas"
    ],
    "categories_ar": [
      "قوانين الحجوم",
      "قوانين المساحات السطحية"
    ],
    "items": [
      {
        "s": "Sphere: V = (4/3)π r³",
        "s_ar": "الكرة: V = (4/3)π r³",
        "cat": 0
      },
      {
        "s": "Cone: V = (1/3)π r² h",
        "s_ar": "المخروط: V = (1/3)π r² h",
        "cat": 0
      },
      {
        "s": "Cylinder: V = π r² h",
        "s_ar": "الأسطوانة: V = π r² h",
        "cat": 0
      },
      {
        "s": "Sphere: A = 4π r²",
        "s_ar": "الكرة: A = 4π r²",
        "cat": 1
      },
      {
        "s": "Cylinder (total): A = 2π r² + 2π r h",
        "s_ar": "الأسطوانة (الكلية): A = 2π r² + 2π r h",
        "cat": 1
      },
      {
        "s": "Cone (lateral): A = π r l",
        "s_ar": "المخروط (الجانبية): A = π r l",
        "cat": 1
      }
    ],
    "ex": "Volumes involve 3D cubic dimensional relationships, while surface areas involve 2D square units.",
    "ex_ar": "تتعامل الحجوم مع أبعاد تكعيبية ثلاثية، بينما تتعامل المساحات السطحية مع وحدات مربعة ثنائية الأبعاد."
  },
  {
    "t": "sr",
    "ti": "Worked Example: Volume of a Cone",
    "ti_ar": "مثال محلول: حجم المخروط",
    "steps": [
      "Find the volume of a cone with radius 3 and height 8. Formula: \\(V=\\dfrac13\\pi r^2h\\).",
      "Substitute \\(r=3\\), \\(h=8\\): \\(V=\\dfrac13\\pi(9)(8)\\).",
      "\\(V=24\\pi\\)."
    ],
    "steps_ar": [
      "أوجد حجم مخروط نصف قطر قاعدته 3 وارتفاعه 8. القانون: \\(V=\\dfrac13\\pi r^2h\\).",
      "التعويض: \\(r=3\\)، \\(h=8\\): \\(V=\\dfrac13\\pi(9)(8)\\).",
      "\\(V=24\\pi\\)."
    ]
  },
  {
    "t": "qc",
    "ti": "Quick Check: Similar Solids",
    "ti_ar": "فحص سريع: المجسمات المتشابهة",
    "q": "If two similar solids have a scale factor of 2, their volumes scale by:",
    "q_ar": "إذا كان معامل مقياس التشابه بين مجسمين يساوي 2، فإن حجميهما يتناسبان بمعامل:",
    "o": [
      "8",
      "2",
      "4",
      "16"
    ],
    "o_ar": [
      "8",
      "2",
      "4",
      "16"
    ],
    "a": 0,
    "ex": "Volume scales by the cube of the linear scale factor: \\(2^3=8\\).",
    "ex_ar": "يتناسب الحجم مع مكعب معامل المقياس الخطي: \\(2^3=8\\)."
  },
  {
    "t": "se",
    "ti": "Spot the Error: Area & Volume Similarity Scaling (Solid Geometry & Similarity)",
    "ti_ar": "اكتشف الخطأ: معامل تشابه المساحات والحجوم (الهندسة الفراغية والتشابه)",
    "q": "Two similar solids have linear scale factor \\(k = 2\\). The smaller solid has surface area \\(10\\text{ cm}^2\\). Where is the error?",
    "q_ar": "مجسمان متشابهان معامل التشابه الخطي بينهما \\(k = 2\\)، ومساحة سطح الأصغر \\(10\\text{ cm}^2\\). أين الخطأ؟",
    "steps": [
      "Identify the linear ratio of corresponding edges as \\(1 : 2\\).",
      "Multiply the surface area directly by \\(2\\) instead of \\(2^2\\): \\(A_{\\text{large}} = 10 \\times 2 = 20\\text{ cm}^2\\).",
      "Report \\(20\\text{ cm}^2\\) as the larger surface area."
    ],
    "steps_ar": [
      "تحديد نسبة التشابه الخطي للأضلاع المتناظرة \\(1 : 2\\).",
      "ضرب المساحة السطحية في \\(2\\) مباشرة بدلاً من \\(2^2\\): \\(A = 20\\text{ cm}^2\\).",
      "اعتماد الناتج كمساحة للمجسم الأكبر."
    ],
    "errorStep": 2,
    "reasons": [
      "Areas of similar figures scale by \\(k^2 = 4\\) (giving \\(40\\text{ cm}^2\\)), and volumes scale by \\(k^3 = 8\\).",
      "Areas scale by \\(\\sqrt{k}\\).",
      "Similar solids always have equal surface areas."
    ],
    "reasons_ar": [
      "نسبة المساحات تساوي مربع معامل التشابه \\(k^2 = 4\\) (أي \\(40\\text{ cm}^2\\))، ونسبة الحجوم \\(k^3 = 8\\).",
      "المساحات تتناسب مع \\(\\sqrt{k}\\).",
      "المجسمات المتشابهة متساوية المساحة دائماً."
    ],
    "correctReason": 0
  },
  {
    "t": "ms",
    "ti": "Examiner Mode: Circle Theorems, Sectors & Similarity (Solid Geometry & Similarity)",
    "ti_ar": "وضع المصحح: نظريات الدائرة والقطاعات والتشابه (الهندسة الفراغية والتشابه)",
    "q": "A circle has equation \\((x - 1)^2 + (y + 2)^2 = 16\\). (a) State its center and radius \\(r\\). (b) A sector of this circle subtends \\(\\theta = \\frac{\\pi}{2}\\) radians; find exact arc length and sector area in terms of \\(\\pi\\).",
    "q_ar": "دائرة معادلتها \\((x - 1)^2 + (y + 2)^2 = 16\\). (أ) اذكر المركز ونصف القطر \\(r\\). (ب) قطاع في هذه الدائرة زاويته المركزية \\(\\theta = \\frac{\\pi}{2}\\) راديان؛ أوجد طول القوس ومساحة القطاع بدلالة \\(\\pi\\).",
    "parts": [
      {
        "label": "Part (a) — Circle Center & Radius",
        "marks": 2,
        "rubric": [
          {
            "code": "B1",
            "marks": 1,
            "text": "Center \\((h, k) = (1, -2)\\)."
          },
          {
            "code": "B1",
            "marks": 1,
            "text": "Radius \\(r = \\sqrt{16} = 4\\)."
          }
        ]
      },
      {
        "label": "Part (b) — Radian Arc Length & Sector Area",
        "marks": 2,
        "rubric": [
          {
            "code": "A1",
            "marks": 1,
            "text": "Arc length \\(s = r\\theta = 4 \\cdot \\frac{\\pi}{2} = 2\\pi\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "Sector area \\(A = \\frac{1}{2} r^2 \\theta = \\frac{1}{2}(16)\\frac{\\pi}{2} = 4\\pi\\)."
          }
        ]
      }
    ],
    "parts_ar": [
      {
        "label": "الجزء (أ) — مركز الدائرة ونصف قطرها",
        "marks": 2,
        "rubric": [
          {
            "code": "B1",
            "marks": 1,
            "text": "المركز \\((1, -2)\\)."
          },
          {
            "code": "B1",
            "marks": 1,
            "text": "نصف القطر \\(r = \\sqrt{16} = 4\\)."
          }
        ]
      },
      {
        "label": "الجزء (ب) — طول القوس ومساحة القطاع بالراديان",
        "marks": 2,
        "rubric": [
          {
            "code": "A1",
            "marks": 1,
            "text": "طول القوس \\(s = r\\theta = 2\\pi\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "مساحة القطاع \\(A = \\frac{1}{2} r^2 \\theta = 4\\pi\\)."
          }
        ]
      }
    ]
  },
  {
    "t": "sb",
    "ti": "Step Builder: Circle Radius, Polygon Angles & Similarity (Solid Geometry & Similarity)",
    "ti_ar": "بناء الخطوات: الدائرة وزوايا المضلعات والتشابه (الهندسة الفراغية والتشابه)",
    "steps": [
      {
        "l": "From \\((x - 1)^2 + (y + 2)^2 = 16\\), find the radius \\(r =\\)",
        "a": "4",
        "h": "Take the square root of 16."
      },
      {
        "l": "With linear similarity ratio \\(1 : 2\\), find the volume ratio \\(1 : k^3\\) where \\(k^3 =\\)",
        "a": "8",
        "h": "Cube 2."
      },
      {
        "l": "Find one exterior angle (in degrees) of a regular \\(6\\)-sided hexagon:",
        "a": "60",
        "h": "Compute 360 / 6."
      }
    ],
    "steps_ar": [
      {
        "l": "من المعادلة \\((x - 1)^2 + (y + 2)^2 = 16\\)، أوجد نصف القطر \\(r =\\)",
        "a": "4",
        "h": "خذ الجذر التربيعي للعدد 16."
      },
      {
        "l": "إذا كانت نسبة التشابه الخطي \\(1 : 2\\)، فإن نسبة الحجوم \\(k^3 =\\)",
        "a": "8",
        "h": "احسب مكعب 2."
      },
      {
        "l": "أوجد قياس الزاوية الخارجية بالدرجات لمضلع سداسي منتظم:",
        "a": "60",
        "h": "احسب 360 ÷ 6."
      }
    ]
  },
  {
    "t": "mt",
    "ti": "Matching: Circle Theorems & Solid Mensuration (Solid Geometry & Similarity)",
    "ti_ar": "مطابقة: نظريات الدائرة وقوانين القياس الهندسي (الهندسة الفراغية والتشابه)",
    "p": [
      {
        "l": "Inscribed angle in a semicircle",
        "r": "Always \\(90^\\circ\\) (Thales’ theorem)"
      },
      {
        "l": "Opposite angles of a cyclic quadrilateral",
        "r": "Supplementary (\\(\\alpha + \\gamma = 180^\\circ\\))"
      },
      {
        "l": "Cone volume vs. Cylinder volume (same \\(r, h\\))",
        "r": "\\(V_{\\text{cone}} = \\frac{1}{3} \\pi r^2 h\\)"
      },
      {
        "l": "Power of a Point (intersecting chords)",
        "r": "\\(PA \\cdot PB = PC \\cdot PD\\)"
      }
    ],
    "p_ar": [
      {
        "l": "الزاوية المحيطية المرسومة في نصف دائرة",
        "r": "تساوي دائماً \\(90^\\circ\\) (مبرهنة طاليس)"
      },
      {
        "l": "الزاويتان المتقابلتان في الرباعي الدائري",
        "r": "متكاملتان ومجموعهما \\(180^\\circ\\)"
      },
      {
        "l": "حجم المخروط مقارنة بالأسطوانة (لنفس \\(r, h\\))",
        "r": "\\(V_{\\text{cone}} = \\frac{1}{3} \\pi r^2 h\\)"
      },
      {
        "l": "قوة نقطة بالنسبة لدائرة (الأوتار المتقاطعة)",
        "r": "\\(PA \\cdot PB = PC \\cdot PD\\)"
      }
    ]
  }
];
D["est2-stats"] = [
  {
    "t": "num",
    "ti": "Numeric Entry: Permutations of Distinct Roles",
    "ti_ar": "إدخال رقمي: التباديل لمناصب متمايزة",
    "q": "In how many ways can a president, vice president, and treasurer be chosen from a club of 10 members?",
    "q_ar": "بكم طريقة يمكن اختيار رئيس ونائب رئيس وأمين صندوق من بين 10 أعضاء في نادٍ؟",
    "a": 720,
    "ex": "Since distinct offices represent ordered positions, use permutations: ₁₀P₃ = 10 × 9 × 8 = 720.",
    "ex_ar": "بما أن المناصب المختلفة تمثل مواقع محددة الترتيب، نستخدم التباديل: ₁₀P₃ = 10 × 9 × 8 = 720."
  },
  {
    "t": "cat",
    "ti": "Categorize: Counting Principle Selection",
    "ti_ar": "تصنيف: اختيار مبدأ العد المناسب",
    "categories": [
      "Permutations (Order Matters)",
      "Combinations (Order Does Not Matter)"
    ],
    "categories_ar": [
      "تباديل (الترتيب مهم)",
      "توافيق (الترتيب غير مهم)"
    ],
    "items": [
      {
        "s": "Assigning 1st, 2nd, and 3rd place medals in a race",
        "s_ar": "توزيع ميداليات المراكز الأول والثاني والثالث في سباق",
        "cat": 0
      },
      {
        "s": "Selecting a 4-digit PIN code without repetition",
        "s_ar": "اختيار رمز سري (PIN) من 4 أرقام دون تكرار",
        "cat": 0
      },
      {
        "s": "Choosing 5 players to start a basketball game",
        "s_ar": "اختيار 5 لاعبين لبدء مباراة كرة سلة",
        "cat": 1
      },
      {
        "s": "Selecting a committee of 3 from a class of 20",
        "s_ar": "اختيار لجنة من 3 طلاب من فصل به 20 طالباً",
        "cat": 1
      },
      {
        "s": "Dealing a 5-card poker hand from a standard deck",
        "s_ar": "توزيع يد من 5 بطاقات من أوراق اللعب",
        "cat": 1
      }
    ],
    "ex": "Permutations are used when order or role distinction is significant; combinations are used when subsets are unordered.",
    "ex_ar": "تُستخدم التباديل عندما يكون الترتيب أو تحديد المناصب ذا أهمية؛ وتُستخدم التوافيق عند اختيار مجموعات دون ترتيب."
  },
  {
    "t": "ord",
    "ti": "Order the Steps: At Least One Probability with Complement Rule",
    "ti_ar": "رتّب الخطوات: احتمال وقوع حدث على الأقل باستخدام قاعدة المتممة",
    "prompt": "Arrange the steps to find the probability of getting at least one head in 4 fair coin flips:",
    "prompt_ar": "رتب خطوات حساب احتمال الحصول على صورة واحدة على الأقل عند رمي قطعة نقود عادلة 4 مرات:",
    "items": [
      "Identify the total number of coin flips: n = 4.",
      "Identify the complement event: getting zero heads (all tails).",
      "Calculate the probability of the complement: P(all tails) = (1/2)⁴ = 1/16.",
      "Apply the complement rule: P(at least 1 head) = 1 - P(all tails).",
      "Evaluate: 1 - 1/16 = 15/16."
    ],
    "items_ar": [
      "تحديد العدد الإجمالي لإلقاءات قطعة النقود: n = 4.",
      "تحديد الحدث المتمم: عدم ظهور أي صورة (الحصول على كتابة في جميع الرميات).",
      "حساب احتمال الحدث المتمم: P(كلها كتابة) = (1/2)⁴ = 1/16.",
      "تطبيق قاعدة الحدث المتمم: P(صورة واحدة على الأقل) = 1 - P(كلها كتابة).",
      "الحساب: 1 - 1/16 = 15/16."
    ],
    "ex": "Using P(at least 1) = 1 - P(none) simplifies multi-step binomial probability computations.",
    "ex_ar": "استخدام P(واحد على الأقل) = 1 - P(لا شيء) يبسط حسابات الاحتمال ذي الحدين."
  },
  {
    "t": "sr",
    "ti": "Worked Example: Combinations",
    "ti_ar": "مثال محلول: التوافيق",
    "steps": [
      "How many ways can you choose 3 books from a shelf of 8 different books? Since order doesn't matter, use combinations: \\(\\binom{n}{r}=\\dfrac{n!}{r!(n-r)!}\\).",
      "Substitute \\(n=8\\), \\(r=3\\): \\(\\binom83=\\dfrac{8!}{3!5!}\\).",
      "Compute: \\(\\dfrac{8\\times7\\times6}{3\\times2\\times1}=56\\)."
    ],
    "steps_ar": [
      "بكم طريقة يمكنك اختيار 3 كتب من رف يحتوي على 8 كتب مختلفة؟ بما أن الترتيب غير مهم، نستخدم التوافيق: \\(\\binom{n}{r}=\\dfrac{n!}{r!(n-r)!}\\).",
      "التعويض: \\(n=8\\)، \\(r=3\\): \\(\\binom83=\\dfrac{8!}{3!5!}\\).",
      "الحساب: \\(\\dfrac{8\\times7\\times6}{3\\times2\\times1}=56\\)."
    ]
  },
  {
    "t": "qc",
    "ti": "Quick Check: Factorials",
    "ti_ar": "فحص سريع: مضروب العدد",
    "q": "\\(5!\\) equals:",
    "q_ar": "قيمة \\(5!\\) تساوي:",
    "o": [
      "120",
      "20",
      "25",
      "60"
    ],
    "o_ar": [
      "120",
      "20",
      "25",
      "60"
    ],
    "a": 0,
    "ex": "\\(5\\times4\\times3\\times2\\times1=120\\).",
    "ex_ar": "\\(5\\times4\\times3\\times2\\times1=120\\)."
  },
  {
    "t": "se",
    "ti": "Spot the Error: Variance of Difference of Independent Variables (Statistics & Probability)",
    "ti_ar": "اكتشف الخطأ: تباين الفرق بين متغيرين عشوائيين مستقلين (الإحصاء والاحتمالات والتوافيق)",
    "q": "Independent random variables \\(X\\) and \\(Y\\) have \\(\\operatorname{Var}(X) = 8\\) and \\(\\operatorname{Var}(Y) = 4\\). A student computes \\(\\operatorname{Var}(X - Y)\\). Which step is invalid?",
    "q_ar": "متغيران عشوائيان مستقلان \\(X\\) و\\(Y\\) تبايناهما \\(\\operatorname{Var}(X) = 8\\) و\\(\\operatorname{Var}(Y) = 4\\). يحسب طالب \\(\\operatorname{Var}(X - Y)\\). أي خطوة خاطئة؟",
    "steps": [
      "Verify that \\(X\\) and \\(Y\\) are statistically independent (\\(\\operatorname{Cov}(X,Y) = 0\\)).",
      "Subtract the variances directly: \\(\\operatorname{Var}(X - Y) = 8 - 4 = 4\\).",
      "Take square root for standard deviation."
    ],
    "steps_ar": [
      "التحقق من استقلال \\(X\\) و\\(Y\\) إحصائياً.",
      "طرح التباينين مباشرة: \\(\\operatorname{Var}(X - Y) = 8 - 4 = 4\\).",
      "أخذ الجذر التربيعي لإيجاد الانحراف المعياري."
    ],
    "errorStep": 2,
    "reasons": [
      "Because coefficients square in variance, \\(\\operatorname{Var}(X - Y) = 1^2\\operatorname{Var}(X) + (-1)^2\\operatorname{Var}(Y) = 8 + 4 = 12\\) — independent variances ALWAYS add.",
      "\\(\\operatorname{Var}(X - Y)\\) equals \\(\\operatorname{Var}(X) \\cdot \\operatorname{Var}(Y)\\).",
      "Expected values cannot be subtracted."
    ],
    "reasons_ar": [
      "لأن المعاملات تُربَّع في التباين: \\(\\operatorname{Var}(X - Y) = \\operatorname{Var}(X) + (-1)^2\\operatorname{Var}(Y) = 12\\) — التباينات المستقلة تُجمع دائماً.",
      "التباين يساوي حاصل ضرب التباينين.",
      "لا يجوز طرح التوقعات الرياضية."
    ],
    "correctReason": 0
  },
  {
    "t": "ms",
    "ti": "Examiner Mode: Standard Error, Variance & Conditional Probability (Statistics & Probability)",
    "ti_ar": "وضع المصحح: الخطأ المعياري والتباين والاحتمال الشرطي (الإحصاء والاحتمالات والتوافيق)",
    "q": "(a) A population has standard deviation \\(\\sigma = 18\\). For a simple random sample of size \\(n = 36\\), find the standard error \\(\\sigma_{\\bar{x}}\\) and state what happens to \\(\\sigma_{\\bar{x}}\\) if \\(n\\) quadruples. (b) Independent \\(X, Y\\) have \\(\\operatorname{Var}(X) = 8,\\; \\operatorname{Var}(Y) = 4\\); compute \\(\\operatorname{Var}(2X - Y)\\).",
    "q_ar": "(أ) مجتمع انحرافه المعياري \\(\\sigma = 18\\). لعينة عشوائية حجمها \\(n = 36\\)، احسب الخطأ المعياري \\(\\sigma_{\\bar{x}}\\) واذكر ماذا يحدث له عند مضاعفة \\(n\\) أربع مرات. (ب) للمتغيرين المستقلين \\(X, Y\\) حيث \\(\\operatorname{Var}(X) = 8,\\; \\operatorname{Var}(Y) = 4\\)، احسب \\(\\operatorname{Var}(2X - Y)\\).",
    "parts": [
      {
        "label": "Part (a) — Sampling Distribution Standard Error",
        "marks": 2,
        "rubric": [
          {
            "code": "A1",
            "marks": 1,
            "text": "\\(\\sigma_{\\bar{x}} = \\dfrac{\\sigma}{\\sqrt{n}} = \\dfrac{18}{\\sqrt{36}} = \\dfrac{18}{6} = 3\\)."
          },
          {
            "code": "B1",
            "marks": 1,
            "text": "Quadrupling \\(n\\) divides \\(\\sigma_{\\bar{x}}\\) by \\(\\sqrt{4} = 2\\) (halves the standard error)."
          }
        ]
      },
      {
        "label": "Part (b) — Linear Combination Variance",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "\\(\\operatorname{Var}(2X - Y) = 2^2 \\operatorname{Var}(X) + (-1)^2 \\operatorname{Var}(Y)\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "\\(4(8) + 4 = 36\\)."
          }
        ]
      }
    ],
    "parts_ar": [
      {
        "label": "الجزء (أ) — الخطأ المعياري لتوزيع المعاينة",
        "marks": 2,
        "rubric": [
          {
            "code": "A1",
            "marks": 1,
            "text": "\\(\\sigma_{\\bar{x}} = \\dfrac{18}{\\sqrt{36}} = 3\\)."
          },
          {
            "code": "B1",
            "marks": 1,
            "text": "مضاعفة \\(n\\) أربع مرات تقسم الخطأ المعياري على \\(\\sqrt{4} = 2\\) (ينصفه)."
          }
        ]
      },
      {
        "label": "الجزء (ب) — تباين التركيبة الخطية",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "\\(\\operatorname{Var}(2X - Y) = 4\\operatorname{Var}(X) + \\operatorname{Var}(Y)\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "الناتج: \\(4(8) + 4 = 36\\)."
          }
        ]
      }
    ]
  },
  {
    "t": "sb",
    "ti": "Step Builder: Standard Error & Independent Variance (Statistics & Probability)",
    "ti_ar": "بناء الخطوات: الخطأ المعياري وتباين المتغيرات المستقلة (الإحصاء والاحتمالات والتوافيق)",
    "steps": [
      {
        "l": "Compute \\(\\sqrt{n}\\) for sample size \\(n = 36\\):",
        "a": "6",
        "h": "Square root of 36."
      },
      {
        "l": "Find standard error \\(\\sigma / \\sqrt{n}\\) when \\(\\sigma = 18\\):",
        "a": "3",
        "h": "Divide 18 by 6."
      },
      {
        "l": "For independent \\(\\operatorname{Var}(X) = 8,\\; \\operatorname{Var}(Y) = 4\\), find \\(\\operatorname{Var}(X - Y) =\\)",
        "a": "12",
        "h": "Add 8 + 4."
      }
    ],
    "steps_ar": [
      {
        "l": "احسب \\(\\sqrt{n}\\) لحجم العينة \\(n = 36\\):",
        "a": "6",
        "h": "الجذر التربيعي للعدد 36."
      },
      {
        "l": "أوجد الخطأ المعياري \\(\\sigma / \\sqrt{n}\\) عندما \\(\\sigma = 18\\):",
        "a": "3",
        "h": "اقسم 18 على 6."
      },
      {
        "l": "للمتغيرين المستقلين \\(\\operatorname{Var}(X) = 8,\\; \\operatorname{Var}(Y) = 4\\)، احسب \\(\\operatorname{Var}(X - Y) =\\)",
        "a": "12",
        "h": "اجمع 8 + 4."
      }
    ]
  },
  {
    "t": "mt",
    "ti": "Matching: Probability, Distributions & Inference Rules (Statistics & Probability)",
    "ti_ar": "مطابقة: قوانين الاحتمالات والتوزيعات والاستدلال (الإحصاء والاحتمالات والتوافيق)",
    "p": [
      {
        "l": "Conditional probability \\(P(A \\mid B)\\)",
        "r": "\\(\\dfrac{P(A \\cap B)}{P(B)}\\)"
      },
      {
        "l": "Binomial variance \\(X \\sim B(n, p)\\)",
        "r": "\\(np(1 - p)\\)"
      },
      {
        "l": "Standard \\(z\\)-score of observation \\(x\\)",
        "r": "\\(\\dfrac{x - \\mu}{\\sigma}\\)"
      },
      {
        "l": "Reject \\(H_0\\) at significance \\(\\alpha\\)",
        "r": "When \\(p\\text{-value} < \\alpha\\)"
      }
    ],
    "p_ar": [
      {
        "l": "الاحتمال الشرطي \\(P(A \\mid B)\\)",
        "r": "\\(\\dfrac{P(A \\cap B)}{P(B)}\\)"
      },
      {
        "l": "تباين التوزيع ذي الحدين \\(X \\sim B(n, p)\\)",
        "r": "\\(np(1 - p)\\)"
      },
      {
        "l": "الدرجة المعيارية \\(z\\) للمفردة \\(x\\)",
        "r": "\\(\\dfrac{x - \\mu}{\\sigma}\\)"
      },
      {
        "l": "رفض فرض العدم \\(H_0\\) عند مستوى \\(\\alpha\\)",
        "r": "عندما تكون \\(p\\text{-value} < \\alpha\\)"
      }
    ]
  }
];
});
