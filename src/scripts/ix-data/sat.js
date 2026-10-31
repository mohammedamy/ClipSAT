/* Interactive Practice data for /sat/ - one entry per chapter section id.
   Shipped as public/js/ix/sat.js and loaded only on that track's page by the
   engine in src/scripts/modules/19-interactive-activities-engine-v1.js
   (Plan 5 Phase 5.015, ADR 0033). Entry shapes (qc/mt/tf/sb/sr/fn/num/ord/cat/gp/se/ms) are
   documented there. */
(window.__ixData = window.__ixData || []).push(function (D) {
D["sat-about"] = [
  {
    "t": "qc",
    "ti": "Quick Check: Digital SAT Math Structure",
    "ti_ar": "فحص سريع: هيكل اختبار SAT الرقمي في الرياضيات",
    "q": "How many total math questions and how much time are provided in the Digital SAT?",
    "q_ar": "كم عدد أسئلة الرياضيات والوقت المخصص في اختبار SAT الرقمي؟",
    "o": [
      "44 questions in 70 minutes (two 35-min modules of 22 questions)",
      "58 questions in 80 minutes",
      "60 questions in 60 minutes",
      "40 questions in 60 minutes"
    ],
    "o_ar": [
      "44 سؤالاً في 70 دقيقة (نموذجان تكيفيان مدة كل منهما 35 دقيقة بواقع 22 سؤالاً)",
      "58 سؤالاً في 80 دقيقة",
      "60 سؤالاً في 60 دقيقة",
      "40 سؤالاً في 60 دقيقة"
    ],
    "a": 0,
    "ex": "The Digital SAT Math section consists of 2 adaptive modules, each with 22 questions and 35 minutes (~95 seconds per question).",
    "ex_ar": "يتكون قسم الرياضيات في SAT الرقمي من نموذجين تكيفيين، كل نموذج به 22 سؤالاً و35 دقيقة (حوالي 95 ثانية لكل سؤال)."
  },
  {
    "t": "num",
    "ti": "Numeric Entry: Module Question Count",
    "ti_ar": "إدخال رقمي: عدد أسئلة النموذج",
    "q": "How many questions are in a single Digital SAT Math module?",
    "q_ar": "كم عدد الأسئلة في النموذج الواحد لقسم الرياضيات في اختبار SAT الرقمي؟",
    "a": 22,
    "ex": "Each math module contains exactly 22 questions (totalling 44 questions across both modules).",
    "ex_ar": "يحتوي كل نموذج رياضيات على 22 سؤالاً بالضبط (ليصبح المجموع 44 سؤالاً عبر النموذجين)."
  },
  {
    "t": "ord",
    "ti": "Order the Steps: Digital SAT Multistage Adaptive Strategy",
    "ti_ar": "ترتيب الخطوات: استراتيجية التكيف متعدد المراحل في SAT الرقمي",
    "prompt": "Arrange the stages of the Digital SAT adaptive experience in chronological order:",
    "prompt_ar": "رتّب مراحل التجربة التكيفية لاختبار SAT الرقمي حسب تسلسلها الزمني:",
    "items": [
      "Complete Module 1 containing a balanced mix of easy, medium, and hard math questions.",
      "Algorithm analyzes Module 1 accuracy to route you to either the easier or harder Module 2.",
      "Complete Module 2 (harder module required to unlock scores above ~600).",
      "Review all flagged questions before time expires in the active module."
    ],
    "items_ar": [
      "إكمال النموذج الأول الذي يحتوي على مزيج متوازن من الأسئلة السهلة والمتوسطة والصعبة.",
      "تحلل الخوارزمية دقة أدائك في النموذج الأول لتوجيهك إما للنموذج الثاني الأسهل أو الأصعب.",
      "إكمال النموذج الثاني (النموذج الأصعب مطلوب لفتح الدرجات التي تتجاوز ~600).",
      "مراجعة جميع الأسئلة المؤشرة بعلامة (Flagged) قبل انتهاء الوقت المخصص للنموذج النشط."
    ],
    "ex": "Take Module 1, receive adaptive routing based on performance, complete Module 2, and review answers.",
    "ex_ar": "أداء النموذج الأول، ثم التوجيه التكيفي حسب الأداء، ثم إكمال النموذج الثاني، ومراجعة الإجابات."
  },
  {
    "t": "mt",
    "ti": "Matching: Digital SAT Features & Rules",
    "ti_ar": "مطابقة: ميزات وقواعد اختبار SAT الرقمي",
    "p": [
      {
        "l": "Built-in Desmos Calculator",
        "r": "Available on all math questions"
      },
      {
        "l": "Guessing Penalty",
        "r": "None (never leave blanks)"
      },
      {
        "l": "Module 2 Difficulty",
        "r": "Adapts based on Module 1 performance"
      },
      {
        "l": "Student-Produced Responses",
        "r": "Grid-in numeric answers (no MCQ options)"
      }
    ],
    "p_ar": [
      {
        "l": "حاسبة ديسموس المدمجة",
        "r": "متاحة في جميع أسئلة الرياضيات"
      },
      {
        "l": "عقوبة التخمين الخاطئ",
        "r": "لا توجد عقوبة (لا تترك أي سؤال فارغاً)"
      },
      {
        "l": "صعوبة النموذج الثاني",
        "r": "تتكيف بناءً على مستوى أدائك في النموذج الأول"
      },
      {
        "l": "الاستجابات المنتجة من الطالب",
        "r": "إدخال رقمي مباشر (بدون خيارات متعددة)"
      }
    ]
  },
  {
    "t": "cat",
    "ti": "Categorize: Digital SAT Math Domain Weightings",
    "ti_ar": "تصنيف: أوزان مجالات الرياضيات في اختبار SAT الرقمي",
    "categories": [
      "Core High-Yield (35% each)",
      "Secondary Domains (15% each)"
    ],
    "categories_ar": [
      "المجالات الأساسية ذات الوزن الأعلى (35% لكل منها)",
      "المجالات الثانوية (15% لكل منها)"
    ],
    "items": [
      {
        "s": "Algebra (linear equations, systems, inequalities)",
        "cat": 0
      },
      {
        "s": "Advanced Math (quadratics, polynomials, exponentials)",
        "cat": 0
      },
      {
        "s": "Problem-Solving & Data Analysis (statistics, rates, percentages)",
        "cat": 1
      },
      {
        "s": "Geometry & Trigonometry (circles, triangles, solids)",
        "cat": 1
      }
    ],
    "items_ar": [
      {
        "s": "الجبر (المعادلات الخطية، أنظمة المعادلات، المتباينات)",
        "cat": 0
      },
      {
        "s": "الرياضيات المتقدمة (المعادلات التربيعية، كثيرات الحدود، الدوال الأسية)",
        "cat": 0
      },
      {
        "s": "حل المشكلات وتحليل البيانات (الإحصاء، المعدلات، النسب المئوية)",
        "cat": 1
      },
      {
        "s": "الهندسة وحساب المثلثات (الدوائر، المثلثات، المجسمات الفراغية)",
        "cat": 1
      }
    ],
    "ex": "Algebra and Advanced Math together constitute 70% of the entire exam.",
    "ex_ar": "يشكل الجبر والرياضيات المتقدمة معاً 70% من أسئلة الاختبار بأكمله."
  },
  {
    "t": "se",
    "ti": "Spot the Error: Exam Pacing & Time Allocation (Digital SAT Format & Adaptive Testing Strategy)",
    "ti_ar": "اكتشف الخطأ: إدارة الوقت وتوزيع الدرجات (نظام اختبار Digital SAT واستراتيجية الاختبار التكيّفي)",
    "q": "A student plans their timing for a 45-question, 68-minute section in SAT. Which step in their strategy introduces a flaw?",
    "q_ar": "يخطط طالب لتوزيع وقته في قسم مكوّن من 45 سؤالاً خلال 68 دقيقة. أي خطوة تتضمن خللاً منهجياً؟",
    "steps": [
      "Compute average time budget per question: \\(\\frac{68\\times 60}{45} = 91\\) seconds.",
      "Complete a first pass of straightforward items in roughly \\(64\\) seconds each to bank time.",
      "Spend \\(9\\) minutes stuck on a single hard item before reading the remaining 23 questions.",
      "Reserve the final \\(4\\) minutes to verify flagged items and ensure no unanswered blanks remain."
    ],
    "steps_ar": [
      "حساب متوسط الزمن لكل سؤال: \\(\\frac{68\\times 60}{45} = 91\\) ثانية.",
      "إنجاز الجولة الأولى للأسئلة المباشرة خلال نحو \\(64\\) ثانية للسؤال لتوفير الوقت.",
      "قضاء \\(9\\) دقائق متواصلة على سؤال صعب واحد قبل قراءة بقية الأسئلة (23 سؤالاً).",
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
    "ti": "Examiner Mode: Pacing Audit & Target Score Plan (Digital SAT Format & Adaptive Testing Strategy)",
    "ti_ar": "وضع المصحح: خطة إدارة الوقت والدرجة المستهدفة (نظام اختبار Digital SAT واستراتيجية الاختبار التكيّفي)",
    "q": "A practice section has \\(45\\) equal-weight questions in \\(68\\) minutes with no penalty for wrong guesses. A student answers \\(42\\) correctly on Pass 1–2. (a) Find the exact seconds-per-question budget and accuracy percentage. (b) State the optimal triage rule for the remaining \\(3\\) flagged questions.",
    "q_ar": "يتكون قسم تدريبي من \\(45\\) سؤالاً متساوية الوزن في \\(68\\) دقيقة دون خصم على الإجابات الخاطئة. أجاب طالب عن \\(42\\) سؤالاً بشكل صحيح. (أ) أوجد الزمن المخصص لكل سؤال بالثواني ونسبة الدقة المئوية. (ب) اذكر قاعدة الفرز المثلى للأسئلة المتبقية وعددها \\(3\\).",
    "parts": [
      {
        "label": "Part (a) — Time Budget & Raw Accuracy",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "Time per item: \\(\\frac{4080}{45} = 91\\text{ s}\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "Raw score percentage: \\(\\frac{42}{45} \\times 100\\% \\approx 93\\%\\)."
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
            "text": "Select the best remaining option on all \\(3\\) items before time expires (expected gain \\(> 0\\) with no guessing penalty)."
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
            "text": "الزمن لكل سؤال: \\(\\frac{4080}{45} = 91\\) ثانية."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "النسبة المئوية للدرجة الخام: \\(\\frac{42}{45} \\times 100\\% \\approx 93\\%\\)."
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
            "text": "اختيار أفضل إجابة لجميع الأسئلة المتبقية (3) قبل انتهاء الوقت لعدم وجود خصم."
          }
        ]
      }
    ]
  },
  {
    "t": "sb",
    "ti": "Step Builder: Exam Time & Score Budget (Digital SAT Format & Adaptive Testing Strategy)",
    "ti_ar": "بناء الخطوات: حساب ميزانية الوقت والدرجة (نظام اختبار Digital SAT واستراتيجية الاختبار التكيّفي)",
    "steps": [
      {
        "l": "Convert \\(68\\) minutes into total seconds:",
        "a": "4080",
        "h": "Multiply 68 by 60."
      },
      {
        "l": "Divide by \\(45\\) questions to get seconds per question:",
        "a": "91",
        "h": "Compute 4080 / 45."
      },
      {
        "l": "If you answer \\(42\\) out of \\(45\\) correctly, how many items remain for review?",
        "a": "3",
        "h": "Subtract 42 from 45."
      }
    ],
    "steps_ar": [
      {
        "l": "حوّل \\(68\\) دقيقة إلى إجمالي الثواني:",
        "a": "4080",
        "h": "اضرب 68 في 60."
      },
      {
        "l": "اقسم على \\(45\\) سؤالاً لإيجاد عدد الثواني لكل سؤال:",
        "a": "91",
        "h": "احسب 4080 ÷ 45."
      },
      {
        "l": "إذا حللت \\(42\\) من أصل \\(45\\)، فكم سؤالاً يتبقى للمراجعة؟",
        "a": "3",
        "h": "اطرح 42 من 45."
      }
    ]
  },
  {
    "t": "qc",
    "ti": "Quick Check: Two-Pass Exam Triage (Digital SAT Format & Adaptive Testing Strategy)",
    "ti_ar": "فحص سريع: استراتيجية الجولتين في الاختبار (نظام اختبار Digital SAT واستراتيجية الاختبار التكيّفي)",
    "q": "On a timed 45-question section (68 minutes, no guessing penalty), what is the highest-yield action when an item still resists solution after 121 seconds?",
    "q_ar": "في قسم موقوت من 45 سؤالاً (68 دقيقة دون خصم على التخمين)، ما الإجراء الأعلى كفاءة إذا استغرق سؤال أكثر من 121 ثانية دون حل؟",
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
    "ex": "Two-pass triage protects your 91 s/item pace while ensuring a tentative answer is always banked.",
    "ex_ar": "فرز الجولتين يحمي معدل 91 ثانية للسؤال ويضمن عدم ترك أي إجابة فارغة."
  }
];
D["sat-linear"] = [
  {
    "t": "qc",
    "ti": "Quick Check: Linear Functions",
    "ti_ar": "فحص سريع: الدوال الخطية",
    "q": "Slope of \\(3x-2y=12\\)?",
    "q_ar": "ميل المستقيم \\(3x-2y=12\\)؟",
    "o": [
      "−2",
      "3/2",
      "3",
      "−6"
    ],
    "o_ar": [
      "−2",
      "3/2",
      "3",
      "−6"
    ],
    "a": 1,
    "ex": "\\(y=\\frac{3}{2}x-6\\). Slope \\(=\\frac{3}{2}\\).",
    "ex_ar": "\\(y=\\frac{3}{2}x-6\\). الميل \\(=\\frac{3}{2}\\)."
  },
  {
    "t": "num",
    "ti": "Numeric Entry: Finding the x-Intercept",
    "ti_ar": "إدخال رقمي: إيجاد المقطع السيني",
    "q": "Find the x-intercept of the line \\(4x - 5y = 40\\). Enter the x-coordinate.",
    "q_ar": "أوجد المقطع السيني للمستقيم \\(4x - 5y = 40\\). أدخل الإحداثي السيني x.",
    "a": 10,
    "ex": "Set \\(y = 0\\): \\(4x - 5(0) = 40 \\Rightarrow 4x = 40 \\Rightarrow x = 10\\).",
    "ex_ar": "عوّض \\(y = 0\\): \\(4x - 5(0) = 40 \\Rightarrow 4x = 40 \\Rightarrow x = 10\\)."
  },
  {
    "t": "cat",
    "ti": "Categorize: Linear System Solutions",
    "ti_ar": "تصنيف: حلول أنظمة المعادلات الخطية",
    "categories": [
      "One Unique Solution",
      "No Solution (Parallel)",
      "Infinitely Many Solutions"
    ],
    "categories_ar": [
      "حل وحيد فريد",
      "لا يوجد حل (متوازيان)",
      "عدد لا نهائي من الحلول"
    ],
    "items": [
      {
        "s": "\\(y = 3x + 1\\) and \\(y = 3x - 5\\)",
        "cat": 1
      },
      {
        "s": "\\(2x + y = 6\\) and \\(4x + 2y = 12\\)",
        "cat": 2
      },
      {
        "s": "\\(y = 2x - 4\\) and \\(y = -x + 5\\)",
        "cat": 0
      },
      {
        "s": "Same slope, different y-intercepts",
        "cat": 1
      },
      {
        "s": "Different slopes",
        "cat": 0
      }
    ],
    "items_ar": [
      {
        "s": "\\(y = 3x + 1\\) و \\(y = 3x - 5\\)",
        "cat": 1
      },
      {
        "s": "\\(2x + y = 6\\) و \\(4x + 2y = 12\\)",
        "cat": 2
      },
      {
        "s": "\\(y = 2x - 4\\) و \\(y = -x + 5\\)",
        "cat": 0
      },
      {
        "s": "نفس الميل ومقاطع صادية مختلفة",
        "cat": 1
      },
      {
        "s": "ميول مختلفة",
        "cat": 0
      }
    ],
    "ex": "Different slopes meet once; equal slopes with different intercepts never meet; identical lines intersect everywhere.",
    "ex_ar": "الميول المختلفة تتقاطع مرة واحدة؛ والميول المتساوية مع مقاطع مختلفة لا تتقاطع أبداً؛ والمستقيمات المتطابقة تشترك في جميع النقاط."
  },
  {
    "t": "ord",
    "ti": "Order the Steps: Solving a Linear System by Elimination",
    "ti_ar": "ترتيب الخطوات: حل نظام خطي بطريقة الحذف",
    "prompt": "Arrange the steps to solve \\(2x + 3y = 12\\) and \\(4x - y = 10\\):",
    "prompt_ar": "رتّب خطوات حل النظام \\(2x + 3y = 12\\) و \\(4x - y = 10\\):",
    "items": [
      "Multiply the second equation by 3 to align y-coefficients: \\(12x - 3y = 30\\).",
      "Add the equations to eliminate y: \\((2x + 3y) + (12x - 3y) = 12 + 30 \\Rightarrow 14x = 42\\).",
      "Divide to isolate x: \\(x = 3\\).",
      "Substitute x = 3 into the original equation: \\(4(3) - y = 10 \\Rightarrow 12 - y = 10\\).",
      "Solve for y to obtain the solution point: \\(y = 2\\), so \\((x, y) = (3, 2)\\)."
    ],
    "items_ar": [
      "اضرب المعادلة الثانية في 3 لمطابقة معاملي y: \\(12x - 3y = 30\\).",
      "اجمع المعادلتين لحذف y: \\((2x + 3y) + (12x - 3y) = 12 + 30 \\Rightarrow 14x = 42\\).",
      "اقسم لعزل x: \\(x = 3\\).",
      "عوّض بقيمة x = 3 في إحدى المعادلتين الأصليتين: \\(4(3) - y = 10 \\Rightarrow 12 - y = 10\\).",
      "أوجد قيمة y لتحصل على نقطة الحل: \\(y = 2\\)، إذن \\((x, y) = (3, 2)\\)."
    ],
    "ex": "Aligning opposite coefficients allows straightforward addition to eliminate a variable.",
    "ex_ar": "توحيد المعاملات المتعاكسة يتيح الجمع المباشر لحذف أحد المتغيرين."
  },
  {
    "t": "mt",
    "ti": "Matching: Slopes and Line Relations",
    "ti_ar": "مطابقة: الميول وعلاقات المستقيمات",
    "p": [
      {
        "l": "Parallel lines",
        "r": "Equal slopes"
      },
      {
        "l": "Perpendicular lines",
        "r": "Negative reciprocal slopes"
      },
      {
        "l": "Horizontal line",
        "r": "Slope = 0"
      },
      {
        "l": "Vertical line",
        "r": "Slope undefined"
      }
    ],
    "p_ar": [
      {
        "l": "مستقيمان متوازيان",
        "r": "ميلان متساويان"
      },
      {
        "l": "مستقيمان متعامدان",
        "r": "معكوس مقلوب الميل"
      },
      {
        "l": "مستقيم أفقي",
        "r": "الميل = 0"
      },
      {
        "l": "مستقيم رأسي",
        "r": "الميل غير معرّف"
      }
    ]
  },
  {
    "t": "sr",
    "ti": "Worked Example: Solve a Linear System by Elimination",
    "ti_ar": "مثال محلول: حل نظام خطي بالحذف",
    "steps": [
      "Solve \\(2x+3y=12\\) and \\(x-y=1\\). From the second equation, \\(x=y+1\\).",
      "Substitute into the first: \\(2(y+1)+3y=12\\Rightarrow2y+2+3y=12\\).",
      "Combine: \\(5y=10\\Rightarrow y=2\\).",
      "Back-substitute: \\(x=2+1=3\\). Solution: \\((3,2)\\)."
    ],
    "steps_ar": [
      "حل المعادلتين \\(2x+3y=12\\) و\\(x-y=1\\). من المعادلة الثانية، \\(x=y+1\\).",
      "عوّض في الأولى: \\(2(y+1)+3y=12\\Rightarrow2y+2+3y=12\\).",
      "جمّع الحدود: \\(5y=10\\Rightarrow y=2\\).",
      "عوّض عكسيًا: \\(x=2+1=3\\). الحل: \\((3,2)\\)."
    ]
  },
  {
    "t": "se",
    "ti": "Spot the Error: Perpendicular Gradient & Inequality Sign (Linear Equations in One Variable & Systems of Equations)",
    "ti_ar": "اكتشف الخطأ: ميل المستقيم المتعامد وإشارة المتباينة (المعادلات الخطية في متغير واحد وأنظمة المعادلات الخطية)",
    "q": "Given \\(A(3, 3)\\) and \\(B(5, 9)\\), a student finds the gradient of the line perpendicular to \\(AB\\). Which step is wrong?",
    "q_ar": "مُعطى النقطتان \\(A(3, 3)\\) و\\(B(5, 9)\\)، يحسب طالب ميل العمودي على \\(AB\\). أي خطوة خاطئة؟",
    "steps": [
      "Compute gradient of \\(AB\\): \\(m_{AB} = \\frac{9 - 3}{5 - 3} = \\frac{6}{2} = 3\\).",
      "Compute midpoint of \\(AB\\): \\(M = (4, 6)\\).",
      "Take the perpendicular gradient as the positive reciprocal \\(m_{\\perp} = \\frac{1}{3}\\) without negating the sign.",
      "Substitute \\(M(4, 6)\\) into point-slope form."
    ],
    "steps_ar": [
      "حساب ميل القطعة \\(AB\\): \\(m_{AB} = \\frac{9 - 3}{5 - 3} = 3\\).",
      "حساب نقطة المنتصف: \\(M = (4, 6)\\).",
      "أخذ ميل العمودي كمقلوب موجب \\(m_{\\perp} = \\frac{1}{3}\\) دون عكس الإشارة.",
      "التعويض بالنقطة \\(M(4, 6)\\) في معادلة المستقيم."
    ],
    "errorStep": 3,
    "reasons": [
      "Perpendicular non-vertical lines satisfy \\(m_1 m_2 = -1\\), so \\(m_{\\perp} = -\\frac{1}{3}\\) (negative reciprocal, not positive reciprocal).",
      "Perpendicular lines have equal slopes \\(m_1 = m_2\\).",
      "Slope is run divided by rise."
    ],
    "reasons_ar": [
      "المستقيمان المتعامدان يحققان \\(m_1 m_2 = -1\\)، لذا ميل العمودي هو المقلوب السالب \\(m_{\\perp} = -\\frac{1}{3}\\).",
      "المستقيمان المتعامدان لهما نفس الميل.",
      "الميل يساوي فرق السينات على فرق الصادات."
    ],
    "correctReason": 0
  },
  {
    "t": "ms",
    "ti": "Examiner Mode: Line Equation & Perpendicular Bisector (Linear Equations in One Variable & Systems of Equations)",
    "ti_ar": "وضع المصحح: معادلة المستقيم والعمود المنصّف (المعادلات الخطية في متغير واحد وأنظمة المعادلات الخطية)",
    "q": "Points \\(A(3, 3)\\) and \\(B(5, 9)\\) lie in the coordinate plane. (a) Find the equation of line \\(AB\\) in \\(y = mx + c\\) form. (b) Find the midpoint \\(M\\) and the gradient of the perpendicular bisector of \\(AB\\).",
    "q_ar": "النقطتان \\(A(3, 3)\\) و\\(B(5, 9)\\) في المستوى الإحداثي. (أ) أوجد معادلة المستقيم \\(AB\\) بصيغة \\(y = mx + c\\). (ب) أوجد نقطة المنتصف \\(M\\) وميل العمود المنصّف للقطعة \\(AB\\).",
    "parts": [
      {
        "label": "Part (a) — Gradient & Line Equation",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "Gradient \\(m = \\frac{9 - 3}{5 - 3} = 3\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "Intercept \\(c = 3 - 3(3) = -6\\), giving \\(y = 3x - 6\\)."
          }
        ]
      },
      {
        "label": "Part (b) — Midpoint & Orthogonal Gradient",
        "marks": 2,
        "rubric": [
          {
            "code": "B1",
            "marks": 1,
            "text": "Midpoint \\(M = \\left(\\frac{3+5}{2}, \\frac{3+9}{2}\\right) = (4, 6)\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "Perpendicular gradient \\(m_{\\perp} = -\\frac{1}{3}\\)."
          }
        ]
      }
    ],
    "parts_ar": [
      {
        "label": "الجزء (أ) — الميل ومعادلة المستقيم",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "الميل \\(m = \\frac{9 - 3}{5 - 3} = 3\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "المقطع الصادي \\(c = -6\\)، والمعادلة \\(y = 3x - 6\\)."
          }
        ]
      },
      {
        "label": "الجزء (ب) — نقطة المنتصف وميل العمود المنصّف",
        "marks": 2,
        "rubric": [
          {
            "code": "B1",
            "marks": 1,
            "text": "نقطة المنتصف \\(M = (4, 6)\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "ميل العمود المنصّف \\(m_{\\perp} = -\\frac{1}{3}\\)."
          }
        ]
      }
    ]
  },
  {
    "t": "sb",
    "ti": "Step Builder: Coordinate Slope, Intercept & Midpoint (Linear Equations in One Variable & Systems of Equations)",
    "ti_ar": "بناء الخطوات: الميل والمقطع ونقطة المنتصف (المعادلات الخطية في متغير واحد وأنظمة المعادلات الخطية)",
    "steps": [
      {
        "l": "Find the slope \\(m\\) through \\((3, 3)\\) and \\((5, 9)\\): \\(m =\\)",
        "a": "3",
        "h": "Compute (9 − 3) / (5 − 3)."
      },
      {
        "l": "Find the \\(y\\)-intercept \\(c\\) in \\(y = mx + c\\): \\(c =\\)",
        "a": "-6",
        "h": "Compute 3 − 3×3."
      },
      {
        "l": "Find the \\(y\\)-coordinate of the midpoint \\(M\\): \\(y_M =\\)",
        "a": "6",
        "h": "Average 3 and 9."
      }
    ],
    "steps_ar": [
      {
        "l": "أوجد الميل \\(m\\) للمستقيم المار بـ \\((3, 3)\\) و\\((5, 9)\\): \\(m =\\)",
        "a": "3",
        "h": "احسب (9 − 3) ÷ (5 − 3)."
      },
      {
        "l": "أوجد المقطع الصادي \\(c\\) في \\(y = mx + c\\): \\(c =\\)",
        "a": "-6",
        "h": "احسب 3 − 3×3."
      },
      {
        "l": "أوجد الإحداثي الصادي لنقطة المنتصف \\(M\\): \\(y_M =\\)",
        "a": "6",
        "h": "متوسط 3 و9."
      }
    ]
  }
];
D["sat-linfun"] = [
  {
    "t": "num",
    "ti": "Numeric Entry: Interpreting Rate of Change",
    "ti_ar": "إدخال رقمي: تفسير معدل التغير",
    "q": "A technician charges an upfront diagnostic fee of $45 plus $30 per hour of labor. If the total bill is $195, how many hours of labor were performed?",
    "q_ar": "يتقاضى فني رسوم فحص أولية قدرها 45 دولاراً بالإضافة إلى 30 دولاراً لكل ساعة عمل. إذا كانت الفاتورة الإجمالية 195 دولاراً، فكم ساعة عمل استغرقت المهمة؟",
    "a": 5,
    "ex": "Set up linear model \\(C = 30h + 45\\). Then \\(30h + 45 = 195 \\Rightarrow 30h = 150 \\Rightarrow h = 5\\).",
    "ex_ar": "أنشئ النموذج الخطي \\(C = 30h + 45\\). إذن \\(30h + 45 = 195 \\Rightarrow 30h = 150 \\Rightarrow h = 5\\)."
  },
  {
    "t": "ord",
    "ti": "Order the Steps: Writing a Linear Equation from Two Points",
    "ti_ar": "ترتيب الخطوات: كتابة معادلة المستقيم من نقطتين",
    "prompt": "Arrange the steps to determine the equation \\(y = mx + b\\) passing through \\((2, 7)\\) and \\((4, 13)\\):",
    "prompt_ar": "رتّب الخطوات لإيجاد معادلة المستقيم \\(y = mx + b\\) المار بالنقطتين \\((2, 7)\\) و \\((4, 13)\\):",
    "items": [
      "Calculate slope: \\(m = \\frac{13 - 7}{4 - 2} = \\frac{6}{2} = 3\\).",
      "Substitute slope and point \\((2, 7)\\) into point-slope form: \\(y - 7 = 3(x - 2)\\).",
      "Distribute: \\(y - 7 = 3x - 6\\).",
      "Isolate y to obtain slope-intercept form: \\(y = 3x + 1\\)."
    ],
    "items_ar": [
      "احسب الميل: \\(m = \\frac{13 - 7}{4 - 2} = \\frac{6}{2} = 3\\).",
      "عوّض بالميل والنقطة \\((2, 7)\\) في صيغة الميل ونقطة: \\(y - 7 = 3(x - 2)\\).",
      "فك القوس: \\(y - 7 = 3x - 6\\).",
      "اعزل y للحصول على صيغة الميل والمقطع: \\(y = 3x + 1\\)."
    ],
    "ex": "Find the slope, substitute a point into point-slope form, expand, and isolate y.",
    "ex_ar": "احسب الميل، ثم عوّض بنقطة في صيغة الميل ونقطة، وفك المقدار واعزل y."
  },
  {
    "t": "cat",
    "ti": "Categorize: Linear Graph Features",
    "ti_ar": "تصنيف: خصائص الرسوم البيانية الخطية",
    "categories": [
      "Slope-Intercept Form",
      "Point-Slope Form",
      "Horizontal / Vertical Lines"
    ],
    "categories_ar": [
      "صيغة الميل والمقطع",
      "صيغة الميل ونقطة",
      "المستقيمات الأفقية والرأسية"
    ],
    "items": [
      {
        "s": "\\(y = mx + b\\) where m is slope and (0,b) is y-intercept",
        "cat": 0
      },
      {
        "s": "\\(y - y_1 = m(x - x_1)\\)",
        "cat": 1
      },
      {
        "s": "\\(y = c\\) with slope 0",
        "cat": 2
      },
      {
        "s": "\\(x = c\\) with undefined slope",
        "cat": 2
      },
      {
        "s": "Directly reading rate of change and initial starting value",
        "cat": 0
      }
    ],
    "items_ar": [
      {
        "s": "\\(y = mx + b\\) حيث m هو الميل و (0,b) هو المقطع الصادي",
        "cat": 0
      },
      {
        "s": "\\(y - y_1 = m(x - x_1)\\)",
        "cat": 1
      },
      {
        "s": "\\(y = c\\) بميل يساوي 0",
        "cat": 2
      },
      {
        "s": "\\(x = c\\) بميل غير معرّف",
        "cat": 2
      },
      {
        "s": "قراءة معدل التغير والقيمة الابتدائية مباشرة",
        "cat": 0
      }
    ],
    "ex": "Slope-intercept displays rate and initial value; point-slope is best when given a slope and arbitrary point; vertical lines have undefined slope.",
    "ex_ar": "صيغة الميل والمقطع توضح المعدل والقيمة الأولية؛ وصيغة الميل ونقطة مثالية عند معرفة نقطة وميل؛ وللمستقيمات الرأسية ميل غير معرّف."
  },
  {
    "t": "fn",
    "ti": "Explorer: Line Through Two Points, Slope m",
    "ti_ar": "مستكشف: مستقيم يمر بنقطتين، الميل m",
    "fns": [
      {
        "expr": "m*x+3",
        "color": "#1E3A6E",
        "label": "y=mx+3"
      }
    ],
    "xrange": [
      -5,
      5
    ],
    "yrange": [
      -5,
      10
    ],
    "params": [
      {
        "name": "m",
        "label": "Slope m",
        "min": -3,
        "max": 3,
        "step": 0.5,
        "default": 2
      }
    ]
  },
  {
    "t": "sr",
    "ti": "Worked Example: Equation of a Line Through Two Points",
    "ti_ar": "مثال محلول: معادلة مستقيم يمر بنقطتين",
    "steps": [
      "Find the equation of the line through \\((1,3)\\) and \\((4,9)\\). Find the slope: \\(m=\\dfrac{9-3}{4-1}=\\dfrac63=2\\).",
      "Use point-slope form with \\((1,3)\\): \\(y-3=2(x-1)\\).",
      "Simplify: \\(y=2x+1\\)."
    ],
    "steps_ar": [
      "أوجد معادلة المستقيم المار بالنقطتين \\((1,3)\\) و\\((4,9)\\). احسب الميل: \\(m=\\dfrac{9-3}{4-1}=\\dfrac63=2\\).",
      "استخدم صيغة الميل ونقطة مع \\((1,3)\\): \\(y-3=2(x-1)\\).",
      "بسّط: \\(y=2x+1\\)."
    ]
  },
  {
    "t": "qc",
    "ti": "Quick Check: Linear Inequalities",
    "ti_ar": "فحص سريع: متباينات خطية",
    "q": "Solve \\(3x-5>10\\)",
    "q_ar": "حل \\(3x-5>10\\)",
    "o": [
      "\\(x>5\\)",
      "\\(x>15\\)",
      "\\(x<5\\)",
      "\\(x>5/3\\)"
    ],
    "o_ar": [
      "\\(x>5\\)",
      "\\(x>15\\)",
      "\\(x<5\\)",
      "\\(x>5/3\\)"
    ],
    "a": 0,
    "ex": "\\(3x>15\\Rightarrow x>5\\).",
    "ex_ar": "\\(3x>15\\Rightarrow x>5\\)."
  },
  {
    "t": "se",
    "ti": "Spot the Error: Perpendicular Gradient & Inequality Sign (Linear Functions & Linear Inequalities)",
    "ti_ar": "اكتشف الخطأ: ميل المستقيم المتعامد وإشارة المتباينة (الدوال الخطية والمتباينات الخطية)",
    "q": "Given \\(A(4, 4)\\) and \\(B(6, 12)\\), a student finds the gradient of the line perpendicular to \\(AB\\). Which step is wrong?",
    "q_ar": "مُعطى النقطتان \\(A(4, 4)\\) و\\(B(6, 12)\\)، يحسب طالب ميل العمودي على \\(AB\\). أي خطوة خاطئة؟",
    "steps": [
      "Compute gradient of \\(AB\\): \\(m_{AB} = \\frac{12 - 4}{6 - 4} = \\frac{8}{2} = 4\\).",
      "Compute midpoint of \\(AB\\): \\(M = (5, 8)\\).",
      "Take the perpendicular gradient as the positive reciprocal \\(m_{\\perp} = \\frac{1}{4}\\) without negating the sign.",
      "Substitute \\(M(5, 8)\\) into point-slope form."
    ],
    "steps_ar": [
      "حساب ميل القطعة \\(AB\\): \\(m_{AB} = \\frac{12 - 4}{6 - 4} = 4\\).",
      "حساب نقطة المنتصف: \\(M = (5, 8)\\).",
      "أخذ ميل العمودي كمقلوب موجب \\(m_{\\perp} = \\frac{1}{4}\\) دون عكس الإشارة.",
      "التعويض بالنقطة \\(M(5, 8)\\) في معادلة المستقيم."
    ],
    "errorStep": 3,
    "reasons": [
      "Perpendicular non-vertical lines satisfy \\(m_1 m_2 = -1\\), so \\(m_{\\perp} = -\\frac{1}{4}\\) (negative reciprocal, not positive reciprocal).",
      "Perpendicular lines have equal slopes \\(m_1 = m_2\\).",
      "Slope is run divided by rise."
    ],
    "reasons_ar": [
      "المستقيمان المتعامدان يحققان \\(m_1 m_2 = -1\\)، لذا ميل العمودي هو المقلوب السالب \\(m_{\\perp} = -\\frac{1}{4}\\).",
      "المستقيمان المتعامدان لهما نفس الميل.",
      "الميل يساوي فرق السينات على فرق الصادات."
    ],
    "correctReason": 0
  },
  {
    "t": "ms",
    "ti": "Examiner Mode: Line Equation & Perpendicular Bisector (Linear Functions & Linear Inequalities)",
    "ti_ar": "وضع المصحح: معادلة المستقيم والعمود المنصّف (الدوال الخطية والمتباينات الخطية)",
    "q": "Points \\(A(4, 4)\\) and \\(B(6, 12)\\) lie in the coordinate plane. (a) Find the equation of line \\(AB\\) in \\(y = mx + c\\) form. (b) Find the midpoint \\(M\\) and the gradient of the perpendicular bisector of \\(AB\\).",
    "q_ar": "النقطتان \\(A(4, 4)\\) و\\(B(6, 12)\\) في المستوى الإحداثي. (أ) أوجد معادلة المستقيم \\(AB\\) بصيغة \\(y = mx + c\\). (ب) أوجد نقطة المنتصف \\(M\\) وميل العمود المنصّف للقطعة \\(AB\\).",
    "parts": [
      {
        "label": "Part (a) — Gradient & Line Equation",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "Gradient \\(m = \\frac{12 - 4}{6 - 4} = 4\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "Intercept \\(c = 4 - 4(4) = -12\\), giving \\(y = 4x - 12\\)."
          }
        ]
      },
      {
        "label": "Part (b) — Midpoint & Orthogonal Gradient",
        "marks": 2,
        "rubric": [
          {
            "code": "B1",
            "marks": 1,
            "text": "Midpoint \\(M = \\left(\\frac{4+6}{2}, \\frac{4+12}{2}\\right) = (5, 8)\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "Perpendicular gradient \\(m_{\\perp} = -\\frac{1}{4}\\)."
          }
        ]
      }
    ],
    "parts_ar": [
      {
        "label": "الجزء (أ) — الميل ومعادلة المستقيم",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "الميل \\(m = \\frac{12 - 4}{6 - 4} = 4\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "المقطع الصادي \\(c = -12\\)، والمعادلة \\(y = 4x - 12\\)."
          }
        ]
      },
      {
        "label": "الجزء (ب) — نقطة المنتصف وميل العمود المنصّف",
        "marks": 2,
        "rubric": [
          {
            "code": "B1",
            "marks": 1,
            "text": "نقطة المنتصف \\(M = (5, 8)\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "ميل العمود المنصّف \\(m_{\\perp} = -\\frac{1}{4}\\)."
          }
        ]
      }
    ]
  },
  {
    "t": "sb",
    "ti": "Step Builder: Coordinate Slope, Intercept & Midpoint (Linear Functions & Linear Inequalities)",
    "ti_ar": "بناء الخطوات: الميل والمقطع ونقطة المنتصف (الدوال الخطية والمتباينات الخطية)",
    "steps": [
      {
        "l": "Find the slope \\(m\\) through \\((4, 4)\\) and \\((6, 12)\\): \\(m =\\)",
        "a": "4",
        "h": "Compute (12 − 4) / (6 − 4)."
      },
      {
        "l": "Find the \\(y\\)-intercept \\(c\\) in \\(y = mx + c\\): \\(c =\\)",
        "a": "-12",
        "h": "Compute 4 − 4×4."
      },
      {
        "l": "Find the \\(y\\)-coordinate of the midpoint \\(M\\): \\(y_M =\\)",
        "a": "8",
        "h": "Average 4 and 12."
      }
    ],
    "steps_ar": [
      {
        "l": "أوجد الميل \\(m\\) للمستقيم المار بـ \\((4, 4)\\) و\\((6, 12)\\): \\(m =\\)",
        "a": "4",
        "h": "احسب (12 − 4) ÷ (6 − 4)."
      },
      {
        "l": "أوجد المقطع الصادي \\(c\\) في \\(y = mx + c\\): \\(c =\\)",
        "a": "-12",
        "h": "احسب 4 − 4×4."
      },
      {
        "l": "أوجد الإحداثي الصادي لنقطة المنتصف \\(M\\): \\(y_M =\\)",
        "a": "8",
        "h": "متوسط 4 و12."
      }
    ]
  },
  {
    "t": "mt",
    "ti": "Matching: Linear & Coordinate Geometry Criteria (Linear Functions & Linear Inequalities)",
    "ti_ar": "مطابقة: علاقات المستقيمات والهندسة الإحداثية (الدوال الخطية والمتباينات الخطية)",
    "p": [
      {
        "l": "Parallel distinct lines",
        "r": "\\(m_1 = m_2\\) and \\(c_1 \\neq c_2\\) (0 intersections)"
      },
      {
        "l": "Perpendicular lines",
        "r": "\\(m_1 m_2 = -1\\) (e.g. \\(4\\) and \\(-1/4\\))"
      },
      {
        "l": "Euclidean distance \\(|AB|\\)",
        "r": "\\(\\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}\\)"
      },
      {
        "l": "Multiplying an inequality by \\(-1\\)",
        "r": "Reverses the inequality direction (\\(< \\;\\to\\; >\\))"
      }
    ],
    "p_ar": [
      {
        "l": "مستقيمان متوازيان مختلفان",
        "r": "\\(m_1 = m_2\\) و\\(c_1 \\neq c_2\\) (لا يوجد تقاطع)"
      },
      {
        "l": "مستقيمان متعامدان",
        "r": "\\(m_1 m_2 = -1\\) (مثل \\(4\\) و\\(-1/4\\))"
      },
      {
        "l": "المسافة الإقليدية \\(|AB|\\)",
        "r": "\\(\\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}\\)"
      },
      {
        "l": "ضرب طرفي متباينة في عدد سالب",
        "r": "يعكس اتجاه علامة التباين (\\(< \\;\\to\\; >\\))"
      }
    ]
  }
];
D["sat-quad"] = [
  {
    "t": "num",
    "ti": "Numeric Entry: Sum of Roots via Vieta’s Formulas",
    "ti_ar": "إدخال رقمي: مجموع الجذور باستخدام صيغ فييتا",
    "q": "What is the sum of the solutions to \\(3x^2 - 18x + 7 = 0\\)?",
    "q_ar": "ما مجموع حلول المعادلة \\(3x^2 - 18x + 7 = 0\\)؟",
    "a": 6,
    "ex": "By Vieta’s formulas, the sum of the roots is \\(-\\frac{b}{a} = -\\frac{-18}{3} = 6\\).",
    "ex_ar": "وفق صيغ فييتا، مجموع الجذرين هو \\(-\\frac{b}{a} = -\\frac{-18}{3} = 6\\)."
  },
  {
    "t": "cat",
    "ti": "Categorize: Discriminant and Root Types",
    "ti_ar": "تصنيف: المميز وأنواع الجذور",
    "categories": [
      "Two Distinct Real Roots",
      "One Repeated Real Root",
      "No Real Roots (Complex)"
    ],
    "categories_ar": [
      "جذران حقيقيان مختلفان",
      "جذر حقيقي واحد مكرر",
      "لا توجد جذور حقيقية (مركبة)"
    ],
    "items": [
      {
        "s": "\\(b^2 - 4ac = 49\\)",
        "cat": 0
      },
      {
        "s": "\\(b^2 - 4ac = 0\\)",
        "cat": 1
      },
      {
        "s": "\\(b^2 - 4ac = -16\\)",
        "cat": 2
      },
      {
        "s": "\\(x^2 - 6x + 9 = 0\\)",
        "cat": 1
      },
      {
        "s": "\\(x^2 + 2x + 5 = 0\\)",
        "cat": 2
      },
      {
        "s": "\\(x^2 - 5x + 4 = 0\\)",
        "cat": 0
      }
    ],
    "items_ar": [
      {
        "s": "\\(b^2 - 4ac = 49\\)",
        "cat": 0
      },
      {
        "s": "\\(b^2 - 4ac = 0\\)",
        "cat": 1
      },
      {
        "s": "\\(b^2 - 4ac = -16\\)",
        "cat": 2
      },
      {
        "s": "\\(x^2 - 6x + 9 = 0\\)",
        "cat": 1
      },
      {
        "s": "\\(x^2 + 2x + 5 = 0\\)",
        "cat": 2
      },
      {
        "s": "\\(x^2 - 5x + 4 = 0\\)",
        "cat": 0
      }
    ],
    "ex": "Positive discriminant gives 2 real roots, zero gives 1 repeated real root, and negative gives complex roots.",
    "ex_ar": "المميز الموجب يعطي جذرين حقيقيين، والصفر يعطي جذراً مكرراً، والسالب يعطي جذوراً مركبة."
  },
  {
    "t": "ord",
    "ti": "Order the Steps: Finding Vertex by Completing the Square",
    "ti_ar": "ترتيب الخطوات: إيجاد رأس المنحنى بإكمال المربع",
    "prompt": "Arrange the steps to find the vertex of \\(y = x^2 - 6x + 11\\):",
    "prompt_ar": "رتّب خطوات إيجاد رأس القطع المكافئ \\(y = x^2 - 6x + 11\\):",
    "items": [
      "Group the quadratic and linear terms: \\(y = (x^2 - 6x) + 11\\).",
      "Calculate the square term: \\((-6/2)^2 = 9\\).",
      "Add and subtract 9 inside the expression: \\(y = (x^2 - 6x + 9) - 9 + 11\\).",
      "Factor the perfect square trinomial: \\(y = (x - 3)^2 + 2\\).",
      "Identify vertex \\((h, k) = (3, 2)\\) and minimum value 2."
    ],
    "items_ar": [
      "تجميع الحدين التربيعي والخطي: \\(y = (x^2 - 6x) + 11\\).",
      "حساب المقدار المكمل للمربع: \\((-6/2)^2 = 9\\).",
      "إضافة وطرح 9 داخل المقدار: \\(y = (x^2 - 6x + 9) - 9 + 11\\).",
      "تحليل ثلاثية الحدود كمربع كامل: \\(y = (x - 3)^2 + 2\\).",
      "تحديد نقطة الرأس \\((h, k) = (3, 2)\\) والقيمة الصغرى 2."
    ],
    "ex": "Writing a quadratic in vertex form \\(y = a(x - h)^2 + k\\) gives the vertex \\((h, k)\\) directly.",
    "ex_ar": "كتابة الدالة التربيعية بصيغة الرأس \\(y = a(x - h)^2 + k\\) تعطي إحداثيات الرأس \\((h, k)\\) مباشرة."
  },
  {
    "t": "mt",
    "ti": "Matching: Discriminant",
    "ti_ar": "مطابقة: المميز",
    "p": [
      {
        "l": "b²−4ac > 0",
        "r": "2 real roots"
      },
      {
        "l": "b²−4ac = 0",
        "r": "1 repeated root"
      },
      {
        "l": "b²−4ac < 0",
        "r": "No real roots"
      },
      {
        "l": "Sum of roots",
        "r": "−b/a"
      }
    ],
    "p_ar": [
      {
        "l": "b²−4ac > 0",
        "r": "جذران حقيقيان"
      },
      {
        "l": "b²−4ac = 0",
        "r": "جذر مكرر"
      },
      {
        "l": "b²−4ac < 0",
        "r": "لا توجد جذور حقيقية"
      },
      {
        "l": "مجموع الجذور",
        "r": "−b/a"
      }
    ]
  },
  {
    "t": "sb",
    "ti": "Step Builder: Find vertex of \\(y=x^2-6x+11\\)",
    "ti_ar": "باني الخطوات: إيجاد رأس المنحنى \\(y=x^2-6x+11\\)",
    "steps": [
      {
        "l": "\\(h = -b/(2a) = -(-6)/(2\\cdot 1) =\\)",
        "a": "3",
        "h": "Evaluate the expression \\(6 / 2\\)."
      },
      {
        "l": "\\(k = 3^2 - 6(3) + 11 = 9 - 18 + 11 =\\)",
        "a": "2",
        "h": "Evaluate the expression \\(9 - 18 + 11\\)."
      },
      {
        "l": "Vertex \\((h,k) =\\)",
        "a": "(3,2)",
        "h": "Perform the calculation in \\((h,k)\\) to find the result."
      }
    ],
    "steps_ar": [
      {
        "l": "\\(h = -b/(2a) = -(-6)/(2\\cdot 1) =\\)",
        "a": "3",
        "h": "احسب قيمة المقدار \\(6 / 2\\)."
      },
      {
        "l": "\\(k = 3^2 - 6(3) + 11 = 9 - 18 + 11 =\\)",
        "a": "2",
        "h": "احسب قيمة المقدار \\(9 - 18 + 11\\)."
      },
      {
        "l": "الرأس \\((h,k) =\\)",
        "a": "(3,2)",
        "h": "أجرِ العملية الحسابية في المقدار \\((h,k)\\) للوصول إلى النتيجة."
      }
    ]
  },
  {
    "t": "sr",
    "ti": "Worked Example: Solve a Quadratic by Factoring",
    "ti_ar": "مثال محلول: حل معادلة تربيعية بالتحليل",
    "steps": [
      "Solve \\(x^2-6x+8=0\\). Look for two numbers multiplying to 8 and summing to −6: −2 and −4.",
      "\\(x^2-6x+8=(x-2)(x-4)\\).",
      "Set each factor to zero: \\(x=2\\) or \\(x=4\\)."
    ],
    "steps_ar": [
      "حل \\(x^2-6x+8=0\\). ابحث عن عددين حاصل ضربهما 8 ومجموعهما −6: −2 و−4.",
      "\\(x^2-6x+8=(x-2)(x-4)\\).",
      "ساوِ كل عامل بالصفر: \\(x=2\\) أو \\(x=4\\)."
    ]
  },
  {
    "t": "gp",
    "ti": "Interactive Graph Plotter: Quadratic Roots & Vertex",
    "ti_ar": "مخطط الدوال التفاعلي: جذور ورأس القطع المكافئ",
    "q": "Plot the vertex and both x-intercepts of the parabola \\(f(x) = x^2 - 4x + 3\\) on the coordinate plane.",
    "q_ar": "حدد الرأس وكلا المقطعين السينيين للقطع المكافئ \\(f(x) = x^2 - 4x + 3\\) على المستوى الإحداثي.",
    "xrange": [
      -2,
      6
    ],
    "yrange": [
      -3,
      6
    ],
    "targets": [
      {
        "label": "Vertex (2, -1)",
        "label_ar": "الرأس (2, -1)",
        "target": [
          2,
          -1
        ],
        "tol": 0.45
      },
      {
        "label": "Root (1, 0)",
        "label_ar": "الجذر (1, 0)",
        "target": [
          1,
          0
        ],
        "tol": 0.45
      },
      {
        "label": "Root (3, 0)",
        "label_ar": "الجذر (3, 0)",
        "target": [
          3,
          0
        ],
        "tol": 0.45
      }
    ],
    "targets_ar": [
      {
        "label": "الرأس (2, -1)",
        "target": [
          2,
          -1
        ],
        "tol": 0.45
      },
      {
        "label": "الجذر (1, 0)",
        "target": [
          1,
          0
        ],
        "tol": 0.45
      },
      {
        "label": "الجذر (3, 0)",
        "target": [
          3,
          0
        ],
        "tol": 0.45
      }
    ],
    "curve": "x**2 - 4*x + 3",
    "sol": "Vertex is at \\(h = -b/(2a) = 2\\), \\(k = f(2) = -1\\). The roots are at \\(x = 1\\) and \\(x = 3\\).",
    "sol_ar": "الرأس عند \\(h = -b/(2a) = 2\\) و \\(k = f(2) = -1\\). الجذور عند \\(x = 1\\) و \\(x = 3\\)."
  },
  {
    "t": "se",
    "ti": "Spot the Error: Extraneous Solutions in Radical Equations",
    "ti_ar": "اكتشف الخطأ: الحلول الدخيلة في المعادلات الجذرية",
    "q": "A student attempts to solve \\(\\sqrt{x + 7} = x - 5\\). Inspect their steps below:",
    "q_ar": "حاول طالب حل المعادلة \\(\\sqrt{x + 7} = x - 5\\). افحص خطوات الحل التالية:",
    "steps": [
      {
        "s": "Square both sides: \\(x + 7 = (x - 5)^2\\)"
      },
      {
        "s": "Expand the right side: \\(x + 7 = x^2 - 10x + 25\\)"
      },
      {
        "s": "Rearrange into standard quadratic: \\(x^2 - 11x + 18 = 0\\)"
      },
      {
        "s": "Factor: \\((x - 9)(x - 2) = 0 \\implies x = 9\\) or \\(x = 2\\)"
      },
      {
        "s": "Conclusion: The equation has two valid solutions, \\(x = 2\\) and \\(x = 9\\)"
      }
    ],
    "steps_ar": [
      {
        "s": "تربيع الطرفين: \\(x + 7 = (x - 5)^2\\)"
      },
      {
        "s": "فك الطرف الأيمن: \\(x + 7 = x^2 - 10x + 25\\)"
      },
      {
        "s": "الترتيب بالصيغة القياسية: \\(x^2 - 11x + 18 = 0\\)"
      },
      {
        "s": "التحليل: \\((x - 9)(x - 2) = 0 \\implies x = 9\\) أو \\(x = 2\\)"
      },
      {
        "s": "الاستنتاج: المعادلة لها حلان صحيحان هما \\(x = 2\\) و \\(x = 9\\)"
      }
    ],
    "errorStep": 5,
    "reasons": [
      "Squaring both sides can introduce extraneous solutions; x = 2 does not satisfy the original equation",
      "Factoring x² - 11x + 18 was incorrect",
      "Expanding (x - 5)² should give x² - 25"
    ],
    "reasons_ar": [
      "تربيع الطرفين قد يُدخل حلولاً دخيلة؛ والعدد x = 2 لا يحقق المعادلة الأصلية",
      "تحليل المعادلة التربيعية كان خاطئاً",
      "فك المربع الكامل كان غير صحيح"
    ],
    "correctReason": 0,
    "sol": "Step 5 is invalid! When checking \\(x = 2\\) in the original equation: LHS \\(= \\sqrt{2+7} = 3\\), but RHS \\(= 2 - 5 = -3\\). Since \\(3 \\ne -3\\), \\(x = 2\\) is an extraneous solution. The only true solution is \\(x = 9\\).",
    "sol_ar": "الخطوة 5 خاطئة! بالتعويض عن \\(x = 2\\) في المعادلة الأصلية: الطرف الأيمن يعطي \\(-3\\) بينما الطرف الأيسر موجب 3. لذا \\(x = 2\\) حل دخيل، والحل الوحيد هو \\(x = 9\\)."
  },
  {
    "t": "ms",
    "ti": "Examiner Mode: Discriminant, Vieta & Factor Theorem (Equivalent Expressions & Quadratic Equations)",
    "ti_ar": "وضع المصحح: المميز وعلاقات فييت ونظرية العامل (العبارات المتكافئة والمعادلات والدوال التربيعية)",
    "q": "Consider \\(P(x) = x^2 - 4x + 3\\) with roots \\(\\alpha, \\beta\\). (a) Compute the discriminant \\(\\Delta\\) and verify \\(P(1) = 0\\). (b) Evaluate \\(\\alpha^2 + \\beta^2\\) using symmetric sums.",
    "q_ar": "لتكن \\(P(x) = x^2 - 4x + 3\\) وجذراها \\(\\alpha, \\beta\\). (أ) احسب المميز \\(\\Delta\\) وتحقق أن \\(P(1) = 0\\). (ب) أوجد قيمة \\(\\alpha^2 + \\beta^2\\) باستعمال المجاميع المتماثلة.",
    "parts": [
      {
        "label": "Part (a) — Discriminant & Factor Check",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "\\(\\Delta = (-4)^2 - 4(1)(3) = 4 > 0\\) (two distinct real roots)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "\\(P(1) = 1 - 4 + 3 = 0\\), confirming \\((x - 1)\\) is a factor."
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
            "text": "\\(\\alpha + \\beta = 4,\\; \\alpha\\beta = 3\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "\\(\\alpha^2 + \\beta^2 = 4^2 - 2(3) = 10\\)."
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
            "text": "\\(\\Delta = (-4)^2 - 4(1)(3) = 4 > 0\\) (جذران حقيقيان مختلفان)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "\\(P(1) = 0\\)، مما يؤكد أن \\((x - 1)\\) عامل لكثيرة الحدود."
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
            "text": "\\(\\alpha + \\beta = 4,\\; \\alpha\\beta = 3\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "\\(\\alpha^2 + \\beta^2 = 4^2 - 2(3) = 10\\)."
          }
        ]
      }
    ]
  }
];
D["sat-expoly"] = [
  {
    "t": "num",
    "ti": "Numeric Entry: Exponential Decay Factor",
    "ti_ar": "إدخال رقمي: معامل الاضمحلال الأسي",
    "q": "A car purchased for $24,000 depreciates by 15% each year. What is the value of the decay factor b in \\(V(t) = a \\cdot b^t\\)?",
    "q_ar": "سيارة تم شراؤها بمبلغ 24,000 دولار تتناقص قيمتها بنسبة 15% سنوياً. ما قيمة معامل الاضمحلال b في الدالة \\(V(t) = a \\cdot b^t\\)؟",
    "a": 0.85,
    "ex": "The decay factor is \\(b = 1 - r = 1 - 0.15 = 0.85\\).",
    "ex_ar": "معامل الاضمحلال هو \\(b = 1 - r = 1 - 0.15 = 0.85\\)."
  },
  {
    "t": "cat",
    "ti": "Categorize: Growth Models",
    "ti_ar": "تصنيف: نماذج النمو والتغير",
    "categories": [
      "Linear Growth",
      "Exponential Growth",
      "Exponential Decay"
    ],
    "categories_ar": [
      "نمو خطي",
      "نمو أسي",
      "اضمحلال أسي"
    ],
    "items": [
      {
        "s": "A population increases by 500 individuals each year",
        "cat": 0
      },
      {
        "s": "An investment account grows by 7% per year",
        "cat": 1
      },
      {
        "s": "A radioactive substance loses 12% of its mass each hour",
        "cat": 2
      },
      {
        "s": "Water drains from a tank at a constant rate of 4 gallons/min",
        "cat": 0
      },
      {
        "s": "\\(f(x) = 150(1.08)^x\\)",
        "cat": 1
      }
    ],
    "items_ar": [
      {
        "s": "عدد السكان يزداد بمقدار 500 فرد كل عام",
        "cat": 0
      },
      {
        "s": "حساب استثماري ينمو بنسبة 7% سنوياً",
        "cat": 1
      },
      {
        "s": "مادة مشعة تفقد 12% من كتلتها كل ساعة",
        "cat": 2
      },
      {
        "s": "يتسرب الماء من خزان بمعدل ثابت قدره 4 جالونات في الدقيقة",
        "cat": 0
      },
      {
        "s": "\\(f(x) = 150(1.08)^x\\)",
        "cat": 1
      }
    ],
    "ex": "Linear changes by a constant amount each step; exponential changes by a constant percentage/factor.",
    "ex_ar": "التغير الخطي يزداد أو ينقص بمقدار ثابت في كل خطوة؛ بينما التغير الأسي يتغير بنسبة مئوية أو معامل ضرب ثابت."
  },
  {
    "t": "ord",
    "ti": "Order the Steps: Simplifying a Rational Expression",
    "ti_ar": "ترتيب الخطوات: تبسيط مقدار نسبي كسرى",
    "prompt": "Arrange the steps to simplify \\(\\dfrac{x^2 - 9}{x^2 + 5x + 6}\\):",
    "prompt_ar": "رتّب خطوات تبسيط المقدار الكسري \\(\\dfrac{x^2 - 9}{x^2 + 5x + 6}\\):",
    "items": [
      "Factor the numerator as a difference of squares: \\((x - 3)(x + 3)\\).",
      "Factor the denominator trinomial: \\((x + 2)(x + 3)\\).",
      "Identify restrictions on the domain: \\(x \\neq -2\\) and \\(x \\neq -3\\).",
      "Cancel the common factor \\((x + 3)\\) from numerator and denominator.",
      "Write the simplified expression: \\(\\dfrac{x - 3}{x + 2}\\)."
    ],
    "items_ar": [
      "تحليل البسط كفرق بين مربعين: \\((x - 3)(x + 3)\\).",
      "تحليل المقام كثلاثية حدود: \\((x + 2)(x + 3)\\).",
      "تحديد قيود المجال (القيم المستبعدة): \\(x \\neq -2\\) و \\(x \\neq -3\\).",
      "اختصار العامل المشترك \\((x + 3)\\) من البسط والمقام.",
      "كتابة المقدار المبسّط النهائي: \\(\\dfrac{x - 3}{x + 2}\\)."
    ],
    "ex": "Factoring both polynomials identifies common linear factors and domain restrictions.",
    "ex_ar": "تحليل كل من البسط والمقام يحدد العوامل المشتركة والقيود على المجال."
  },
  {
    "t": "fn",
    "ti": "Explorer: Cubic Family \\(x^3+k\\)",
    "ti_ar": "مستكشف: عائلة الدوال التكعيبية \\(x^3+k\\)",
    "fns": [
      {
        "expr": "x^3+k",
        "color": "#1E3A6E",
        "label": "x^3+k"
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
        "name": "k",
        "label": "Shift k",
        "min": -5,
        "max": 5,
        "step": 1,
        "default": 0
      }
    ]
  },
  {
    "t": "sr",
    "ti": "Worked Example: Simplify a Rational Expression",
    "ti_ar": "مثال محلول: تبسيط كسر جبري",
    "steps": [
      "Simplify \\(\\dfrac{x^2+5x+6}{x+2}\\). Factor the numerator: \\(x^2+5x+6=(x+2)(x+3)\\).",
      "Cancel the common factor \\((x+2)\\): \\(x+3\\), for \\(x\\neq-2\\)."
    ],
    "steps_ar": [
      "بسّط \\(\\dfrac{x^2+5x+6}{x+2}\\). حلل البسط: \\(x^2+5x+6=(x+2)(x+3)\\).",
      "احذف العامل المشترك \\((x+2)\\): \\(x+3\\)، حيث \\(x\\neq-2\\)."
    ]
  },
  {
    "t": "qc",
    "ti": "Quick Check: Multiplying Monomials",
    "ti_ar": "فحص سريع: ضرب وحيدات الحد",
    "q": "Simplify \\((3x^2)(2x^3)\\)",
    "q_ar": "بسّط \\((3x^2)(2x^3)\\)",
    "o": [
      "\\(6x^5\\)",
      "\\(5x^6\\)",
      "\\(6x^6\\)",
      "\\(5x^5\\)"
    ],
    "o_ar": [
      "\\(6x^5\\)",
      "\\(5x^6\\)",
      "\\(6x^6\\)",
      "\\(5x^5\\)"
    ],
    "a": 0,
    "ex": "Multiply coefficients (\\(3\\times2=6\\)) and add exponents (\\(2+3=5\\)).",
    "ex_ar": "اضرب المعاملات (\\(3\\times2=6\\)) واجمع الأسس (\\(2+3=5\\))."
  },
  {
    "t": "se",
    "ti": "Spot the Error: Logarithm Law Misapplication (Exponentials, Radicals, Polynomials & Rational Expressions)",
    "ti_ar": "اكتشف الخطأ: التطبيق الخاطئ لقوانين اللوغاريتمات (الأسس والجذور وكثيرات الحدود والعبارات النسبية)",
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
    "ti": "Examiner Mode: Logarithmic Equation & Continuous Growth (Exponentials, Radicals, Polynomials & Rational Expressions)",
    "ti_ar": "وضع المصحح: المعادلات اللوغاريتمية والنمو الأسي (الأسس والجذور وكثيرات الحدود والعبارات النسبية)",
    "q": "(a) Solve \\(\\log_{3}(x - 2) = 3\\), stating the domain restriction. (b) A culture grows via \\(P(t) = P_0 e^{rt}\\); find the exact doubling time \\(T_d\\) in terms of \\(r\\).",
    "q_ar": "(أ) حل المعادلة \\(\\log_{3}(x - 2) = 3\\) مع ذكر شرط المجال. (ب) تنمو عينة وفق \\(P(t) = P_0 e^{rt}\\)؛ أوجد زمن التضاعف \\(T_d\\) بدلالة \\(r\\).",
    "parts": [
      {
        "label": "Part (a) — Domain & Exponential Conversion",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "Domain \\(x > 2\\); convert to \\(x - 2 = 3^{3} = 27\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "\\(x = 29\\) (valid since \\(29 > 2\\))."
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
            "text": "المجال \\(x > 2\\)؛ والتحويل يعطي \\(x - 2 = 3^{3} = 27\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "\\(x = 29\\) (يحقق شرط المجال)."
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
    "ti": "Step Builder: Solving Logarithmic Equations (Exponentials, Radicals, Polynomials & Rational Expressions)",
    "ti_ar": "بناء الخطوات: حل المعادلة اللوغاريتمية (الأسس والجذور وكثيرات الحدود والعبارات النسبية)",
    "steps": [
      {
        "l": "Evaluate \\(3^{3} =\\)",
        "a": "27",
        "h": "Multiply 3 by itself 3 times."
      },
      {
        "l": "Solve \\(\\log_{3}(x - 2) = 3\\) for \\(x =\\)",
        "a": "29",
        "h": "Add 2 to 27."
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
        "l": "حل المعادلة \\(\\log_{3}(x - 2) = 3\\) لإيجاد \\(x =\\)",
        "a": "29",
        "h": "اجمع 2 مع 27."
      },
      {
        "l": "احسب قيمة \\(\\log_{3}(1) =\\)",
        "a": "0",
        "h": "أي أساس مرفوع للأس صفر يساوي 1."
      }
    ]
  },
  {
    "t": "mt",
    "ti": "Matching: Logarithm Laws & Asymptotes (Exponentials, Radicals, Polynomials & Rational Expressions)",
    "ti_ar": "مطابقة: قوانين اللوغاريتمات وخطوط التقارب (الأسس والجذور وكثيرات الحدود والعبارات النسبية)",
    "p": [
      {
        "l": "\\(\\log_b(MN)\\)",
        "r": "\\(\\log_b M + \\log_b N\\)"
      },
      {
        "l": "\\(\\log_b(M^k)\\)",
        "r": "\\(k \\log_b M\\)"
      },
      {
        "l": "Change of base \\(\\log_a x\\)",
        "r": "\\(\\dfrac{\\ln x}{\\ln a}\\)"
      },
      {
        "l": "Vertical asymptote of \\(\\ln(x - 2)\\)",
        "r": "\\(x = 2\\)"
      }
    ],
    "p_ar": [
      {
        "l": "\\(\\log_b(MN)\\)",
        "r": "\\(\\log_b M + \\log_b N\\)"
      },
      {
        "l": "\\(\\log_b(M^k)\\)",
        "r": "\\(k \\log_b M\\)"
      },
      {
        "l": "تغيير الأساس \\(\\log_a x\\)",
        "r": "\\(\\dfrac{\\ln x}{\\ln a}\\)"
      },
      {
        "l": "خط التقارب الرأسي للدالة \\(\\ln(x - 2)\\)",
        "r": "\\(x = 2\\)"
      }
    ]
  }
];
D["sat-data"] = [
  {
    "t": "tf",
    "ti": "True or False: Data",
    "ti_ar": "صحيح أم خطأ: البيانات الإحصائية",
    "items": [
      {
        "s": "Mean always equals median",
        "a": false,
        "ex": "They differ in skewed data."
      },
      {
        "s": "Correlation proves causation",
        "a": false,
        "ex": "Correlation ≠ causation."
      },
      {
        "s": "SD measures spread from the mean",
        "a": true,
        "ex": "Correct definition."
      },
      {
        "s": "Negative correlation: as x↑, y↓",
        "a": true,
        "ex": "Correct."
      }
    ],
    "items_ar": [
      {
        "s": "المتوسط دائمًا يساوي الوسيط",
        "a": false,
        "ex": "يختلفان في البيانات الملتوية."
      },
      {
        "s": "الارتباط يثبت السببية",
        "a": false,
        "ex": "الارتباط ≠ السببية."
      },
      {
        "s": "الانحراف المعياري يقيس التشتت حول المتوسط",
        "a": true,
        "ex": "تعريف صحيح."
      },
      {
        "s": "الارتباط السالب: بازدياد x، ينقص y",
        "a": true,
        "ex": "صحيح."
      }
    ]
  },
  {
    "t": "num",
    "ti": "Numeric Entry: Finding the Median",
    "ti_ar": "إدخال رقمي: إيجاد الوسيط الحسابي",
    "q": "Find the median of the dataset: 12, 18, 5, 23, 14, 9, 31.",
    "q_ar": "أوجد الوسيط لمجموعة البيانات: 12، 18، 5، 23، 14، 9، 31.",
    "a": 14,
    "ex": "Order the 7 values: 5, 9, 12, 14, 18, 23, 31. The middle (4th) value is 14.",
    "ex_ar": "رتّب القيم السبع تصاعدياً: 5، 9، 12، 14، 18، 23، 31. القيمة الوسطى (الرابعة) هي 14."
  },
  {
    "t": "cat",
    "ti": "Categorize: Statistical Study Types",
    "ti_ar": "تصنيف: أنواع الدراسات الإحصائية",
    "categories": [
      "Sample Survey",
      "Observational Study",
      "Randomized Experiment"
    ],
    "categories_ar": [
      "استطلاع عينة",
      "دراسة قائمة على الملاحظة",
      "تجربة عشوائية مضبوطة"
    ],
    "items": [
      {
        "s": "Participants randomly assigned to drug or placebo groups to test efficacy",
        "cat": 2
      },
      {
        "s": "Tracking dietary habits and heart health over 20 years without intervening",
        "cat": 1
      },
      {
        "s": "Polling 1,000 randomly selected registered voters before an election",
        "cat": 0
      },
      {
        "s": "Only study type that can establish cause-and-effect relationships",
        "cat": 2
      }
    ],
    "items_ar": [
      {
        "s": "توزيع المشاركين عشوائياً على مجموعتي الدواء والعقار الوهمي لاختبار الفاعلية",
        "cat": 2
      },
      {
        "s": "تتبع العادات الغذائية وصحة القلب على مدى 20 عاماً دون أي تدخل علاجي",
        "cat": 1
      },
      {
        "s": "استطلاع رأي 1,000 ناخب مسجل تم اختيارهم عشوائياً قبل الانتخابات",
        "cat": 0
      },
      {
        "s": "النوع الوحيد من الدراسات الذي يمكنه إثبات علاقة السبب والنتيجة (السببية)",
        "cat": 2
      }
    ],
    "ex": "Only randomized experiments establish causation; observational studies show association; surveys estimate population parameters.",
    "ex_ar": "التجارب العشوائية فقط تثبت السببية؛ والدراسات القائمة على الملاحظة تبيّن الارتباط؛ والاستطلاعات تقدّر معالم المجتمع."
  },
  {
    "t": "ord",
    "ti": "Order the Steps: Successive Percentage Change",
    "ti_ar": "ترتيب الخطوات: التغير بالنسبة المئوية المتعاقبة",
    "prompt": "Arrange the steps to find the final price of a $200 item discounted by 20% then discounted an additional 10%:",
    "prompt_ar": "رتّب خطوات حساب السعر النهائي لسلعة بقيمة 200 دولار بعد خصم 20% ثم خصم إضافي بنسبة 10%:",
    "items": [
      "Convert the first discount to a multiplier: \\(1 - 0.20 = 0.80\\).",
      "Calculate the intermediate price: \\(200 \\times 0.80 = 160\\).",
      "Convert the second discount to a multiplier: \\(1 - 0.10 = 0.90\\).",
      "Multiply the intermediate price by the second factor: \\(160 \\times 0.90 = 144\\).",
      "Verify compound multiplier: \\(200 \\times (0.80 \\times 0.90) = 200 \\times 0.72 = 144\\)."
    ],
    "items_ar": [
      "تحويل الخصم الأول إلى معامل ضرب: \\(1 - 0.20 = 0.80\\).",
      "حساب السعر بعد الخصم الأول: \\(200 \\times 0.80 = 160\\).",
      "تحويل الخصم الثاني إلى معامل ضرب: \\(1 - 0.10 = 0.90\\).",
      "ضرب السعر المرحلي في المعامل الثاني: \\(160 \\times 0.90 = 144\\).",
      "التحقق باستخدام المعامل المركّب: \\(200 \\times (0.80 \\times 0.90) = 200 \\times 0.72 = 144\\)."
    ],
    "ex": "Never add percentages directly (20% + 10% ≠ 30%). Multiply the individual decay factors.",
    "ex_ar": "لا تجمع النسب المئوية مباشرة أبداً (20% + 10% ≠ 30%). اضرب معاملات التغير الفردية."
  },
  {
    "t": "qc",
    "ti": "Quick Check: Two-Way Table Probability",
    "ti_ar": "فحص سريع: احتمال من جدول تكراري",
    "q": "In a group of 100 students, 60 study Spanish and 40 study French, with 20 studying both. How many study neither?",
    "q_ar": "في مجموعة من 100 طالب، 60 يدرسون الإسبانية و40 الفرنسية، و20 يدرسون كلتيهما. كم طالبًا لا يدرس أيًا منهما؟",
    "o": [
      "20",
      "10",
      "0",
      "30"
    ],
    "o_ar": [
      "20",
      "10",
      "0",
      "30"
    ],
    "a": 0,
    "ex": "By Inclusion-Exclusion, \\(60+40-20=80\\) study at least one. Thus \\(100-80=20\\) study neither.",
    "ex_ar": "بمبدأ الشمول والاستبعاد، \\(60+40-20=80\\) يدرسون لغة واحدة على الأقل. إذن \\(100-80=20\\) لا يدرسون أيًا منهما."
  },
  {
    "t": "sb",
    "ti": "Step Builder: Range & Mean of a Data Set",
    "ti_ar": "باني الخطوات: المدى والمتوسط الحسابي لمجموعة بيانات",
    "steps": [
      {
        "l": "For the data set \\(12, 15, 19, 24, 30\\), find the range (\\(\\text{Max} - \\text{Min} = 30 - 12\\)):",
        "a": "18",
        "h": "Perform the calculation in \\(\\text{Max} - \\text{Min} = 30 - 12\\) to find the result."
      },
      {
        "l": "Find the arithmetic mean \\(\\frac{12+15+19+24+30}{5} = \\frac{100}{5} =\\)",
        "a": "20",
        "h": "Perform the calculation in \\(\\frac{100}{5}\\) to find the result."
      }
    ],
    "steps_ar": [
      {
        "l": "لمجموعة البيانات \\(12, 15, 19, 24, 30\\)، أوجد المدى (\\(30 - 12\\)):",
        "a": "18",
        "h": "أجرِ العملية الحسابية في المقدار \\(30 - 12\\) للوصول إلى النتيجة."
      },
      {
        "l": "أوجد المتوسط الحسابي \\(\\frac{12+15+19+24+30}{5} = \\frac{100}{5} =\\)",
        "a": "20",
        "h": "أجرِ العملية الحسابية في المقدار \\(\\frac{100}{5}\\) للوصول إلى النتيجة."
      }
    ]
  },
  {
    "t": "se",
    "ti": "Spot the Error: Successive Percentage Multipliers (Ratios, Rates, Proportions, Percentages & Scatterplots)",
    "ti_ar": "اكتشف الخطأ: النسب المئوية المتتالية (النسب والمعدلات والتناسب والنسب المئوية ومخططات الانتشار)",
    "q": "An item priced at \\(250\\) rises by \\(50\\%\\) and is then discounted by \\(50\\%\\). Which step in the calculation is wrong?",
    "q_ar": "سلعة سعرها \\(250\\) زاد سعرها بنسبة \\(50\\%\\) ثم خُفِّض بنسبة \\(50\\%\\). أي خطوة تحتوي على خطأ؟",
    "steps": [
      "Apply the \\(50\\%\\) increase multiplier: \\(250 \\times 1.50 = 375\\).",
      "Recognize that the \\(50\\%\\) discount applies to the new price \\(375\\).",
      "Add the percentage changes directly: \\(+50\\% - 50\\% = 0\\%\\), claiming the final price returns to \\(250\\).",
      "Verify final price via product of multipliers."
    ],
    "steps_ar": [
      "تطبيق معامل الزيادة \\(50\\%\\): \\(250 \\times 1.50 = 375\\).",
      "ملاحظة أن خصم \\(50\\%\\) يُطبَّق على السعر الجديد \\(375\\).",
      "جمع النسبتين مباشرة \\(+50\\% - 50\\% = 0\\%\\) والادعاء بأن السعر النهائي يعود إلى \\(250\\).",
      "التحقق من السعر النهائي بضرب المعاملات."
    ],
    "errorStep": 3,
    "reasons": [
      "Successive percentages multiply rather than add: \\(375 \\times 0.50 = 188\\) (a net \\(25\\%\\) decrease).",
      "The final price is actually greater than \\(250\\).",
      "Discounts must be divided rather than multiplied."
    ],
    "reasons_ar": [
      "النسب المتتالية تُضرب كمعاملات ولا تُجمع: \\(375 \\times 0.50 = 188\\) (بانخفاض صافي قدره \\(25\\%\\)).",
      "السعر النهائي أكبر من \\(250\\).",
      "الخصم يُحسب بالقسمة لا بالضرب."
    ],
    "correctReason": 0
  },
  {
    "t": "ms",
    "ti": "Examiner Mode: Harmonic Round-Trip Speed, Combined Work Rate & Ratio Partition",
    "ti_ar": "وضع المصحح: السرعة المتوسطة التوافقية ومعدل العمل المشترك وتقسيم النسب",
    "q": "(a) A car drives from A to B at \\(60\\text{ km/h}\\) and returns along the same route at \\(40\\text{ km/h}\\). Find the average speed for the entire round trip. (b) Pump A fills a tank in \\(6\\text{ h}\\) and Pump B fills it in \\(12\\text{ h}\\); how long do they take working together?",
    "q_ar": "(أ) تسير سيارة من A إلى B بسرعة \\(60\\text{ كم/س}\\) وتعود على نفس الطريق بسرعة \\(40\\text{ كم/س}\\). أوجد السرعة المتوسطة للرحلة كاملة. (ب) تملأ المضخة A خزاناً في \\(6\\) ساعات وتملؤه B في \\(12\\) ساعة؛ كم تستغرقان معاً؟",
    "parts": [
      {
        "label": "Part (a) — Equal-Distance Harmonic Mean Speed",
        "marks": 3,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "Let one-way distance be \\(d\\); total time is \\(\\dfrac{d}{60} + \\dfrac{d}{40} = \\dfrac{5d}{120} = \\dfrac{d}{24}\\)."
          },
          {
            "code": "M1",
            "marks": 1,
            "text": "Divide total distance \\(2d\\) by total time (or apply \\(\\dfrac{2 v_1 v_2}{v_1 + v_2}\\))."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "Obtain \\(v_{\\text{avg}} = \\dfrac{2(60)(40)}{60 + 40} = 48\\text{ km/h}\\) (not \\(50\\))."
          }
        ]
      },
      {
        "label": "Part (b) — Reciprocal Combined Work Rate",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "Add hourly rates: \\(\\dfrac{1}{T} = \\dfrac{1}{6} + \\dfrac{1}{12} = \\dfrac{3}{12} = \\dfrac{1}{4}\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "Invert combined rate: \\(T = 4\\text{ hours}\\)."
          }
        ]
      }
    ],
    "parts_ar": [
      {
        "label": "الجزء (أ) — الوسط التوافقي للسرعة المتوسطة ذهاباً وإياباً",
        "marks": 3,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "الزمن الكلي لمسافة \\(d\\) هو \\(\\dfrac{d}{60} + \\dfrac{d}{40} = \\dfrac{d}{24}\\)."
          },
          {
            "code": "M1",
            "marks": 1,
            "text": "قسمة المسافة الكلية \\(2d\\) على الزمن الكلي أو تطبيق \\(\\dfrac{2v_1v_2}{v_1+v_2}\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "السرعة المتوسطة \\(= 48\\text{ كم/س}\\) (وليست \\(50\\))."
          }
        ]
      },
      {
        "label": "الجزء (ب) — جمع معدلات العمل المتوازية",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "جمع المعدلين: \\(\\dfrac{1}{T} = \\dfrac{1}{6} + \\dfrac{1}{12} = \\dfrac{1}{4}\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "الزمن المشترك \\(T = 4\\) ساعات."
          }
        ]
      }
    ]
  },
  {
    "t": "mt",
    "ti": "Matching: Percentages, Proportions, Harmonic Speed & Work-Rate Models",
    "ti_ar": "مطابقة: النسب المئوية والتناسب والسرعة التوافقية ومعدلات العمل",
    "p": [
      {
        "l": "\\(+25\\%\\) increase followed by \\(-20\\%\\) decrease",
        "r": "Net multiplier \\(1.25 \\times 0.80 = 1.00\\) (\\(0\\%\\) net change)"
      },
      {
        "l": "Equal-distance round-trip average speed",
        "r": "\\(v_{\\text{avg}} = \\dfrac{2 v_1 v_2}{v_1 + v_2}\\)"
      },
      {
        "l": "Combined time \\(T\\) for workers taking \\(t_1\\) and \\(t_2\\)",
        "r": "\\(T = \\dfrac{t_1 t_2}{t_1 + t_2}\\)"
      },
      {
        "l": "Inverse proportion between speed \\(v\\) and travel time \\(t\\)",
        "r": "\\(v_1 t_1 = v_2 t_2\\) (fixed distance)"
      }
    ],
    "p_ar": [
      {
        "l": "زيادة \\(25\\%\\) متبوعة بخصم \\(20\\%\\)",
        "r": "المعامل الصافي \\(1.25 \\times 0.80 = 1.00\\) (تغير \\(0\\%\\))"
      },
      {
        "l": "السرعة المتوسطة لرحلة ذهاب وإياب متساوية المسافة",
        "r": "\\(v_{\\text{avg}} = \\dfrac{2 v_1 v_2}{v_1 + v_2}\\)"
      },
      {
        "l": "الزمن المشترك لعاملين يستغرقان \\(t_1\\) و\\(t_2\\)",
        "r": "\\(T = \\dfrac{t_1 t_2}{t_1 + t_2}\\)"
      },
      {
        "l": "التناسب العكسي بين السرعة \\(v\\) والزمن \\(t\\)",
        "r": "\\(v_1 t_1 = v_2 t_2\\) عند ثبات المسافة"
      }
    ]
  }
];
D["sat-geo"] = [
  {
    "t": "num",
    "ti": "Numeric Entry: Circle Radius from Equation",
    "ti_ar": "إدخال رقمي: نصف قطر الدائرة من المعادلة",
    "q": "What is the radius of the circle with equation \\((x - 4)^2 + (y + 7)^2 = 64\\)?",
    "q_ar": "ما نصف قطر الدائرة التي معادلتها \\((x - 4)^2 + (y + 7)^2 = 64\\)؟",
    "a": 8,
    "ex": "In standard form \\((x-h)^2 + (y-k)^2 = r^2\\), \\(r^2 = 64 \\Rightarrow r = \\sqrt{64} = 8\\).",
    "ex_ar": "في الصيغة القياسية \\((x-h)^2 + (y-k)^2 = r^2\\)، نجد \\(r^2 = 64 \\Rightarrow r = \\sqrt{64} = 8\\)."
  },
  {
    "t": "ord",
    "ti": "Order the Steps: Completing the Square for a Circle",
    "ti_ar": "ترتيب الخطوات: إكمال المربع لمعادلة الدائرة",
    "prompt": "Arrange the steps to find the radius of \\(x^2 - 6x + y^2 + 8y = 24\\):",
    "prompt_ar": "رتّب الخطوات لإيجاد نصف قطر الدائرة \\(x^2 - 6x + y^2 + 8y = 24\\):",
    "items": [
      "Group x-terms and y-terms: \\((x^2 - 6x) + (y^2 + 8y) = 24\\).",
      "Calculate squares to complete: \\((-6/2)^2 = 9\\) and \\((8/2)^2 = 16\\).",
      "Add 9 and 16 to both sides: \\((x^2 - 6x + 9) + (y^2 + 8y + 16) = 24 + 9 + 16 = 49\\).",
      "Rewrite in standard form: \\((x - 3)^2 + (y + 4)^2 = 7^2\\), so radius \\(r = 7\\)."
    ],
    "items_ar": [
      "تجميع حدود x وحدود y معاً: \\((x^2 - 6x) + (y^2 + 8y) = 24\\).",
      "حساب المربعات لإكمال المربعين: \\((-6/2)^2 = 9\\) و \\((8/2)^2 = 16\\).",
      "إضافة 9 و 16 لكلا الطرفين: \\((x^2 - 6x + 9) + (y^2 + 8y + 16) = 24 + 9 + 16 = 49\\).",
      "إعادة الكتابة بالصيغة القياسية: \\((x - 3)^2 + (y + 4)^2 = 7^2\\)، إذن نصف القطر \\(r = 7\\)."
    ],
    "ex": "Group variables, find (b/2)^2 for each, add to both sides, and factor into standard form.",
    "ex_ar": "جمّع المتغيرات، واحسب مربع نصف المعامل لكل منهما، وأضفهما للطرفين، وحلل إلى الصيغة القياسية."
  },
  {
    "t": "cat",
    "ti": "Categorize: Geometric Formulas & Relations",
    "ti_ar": "تصنيف: القوانين والعلاقات الهندسية",
    "categories": [
      "Right Triangle Trig",
      "Circle Geometry",
      "3D Solid Volume"
    ],
    "categories_ar": [
      "حساب مثلثات المثلث القائم",
      "هندسة الدوائر",
      "حجوم المجسمات الفراغية"
    ],
    "items": [
      {
        "s": "\\(\\sin\\theta = \\text{opp}/\\text{hyp}\\) and \\(\\cos\\theta = \\text{adj}/\\text{hyp}\\)",
        "cat": 0
      },
      {
        "s": "Cofunction identity: \\(\\sin(x^\\circ) = \\cos(90^\\circ - x^\\circ)\\)",
        "cat": 0
      },
      {
        "s": "Equation of circle: \\((x - h)^2 + (y - k)^2 = r^2\\)",
        "cat": 1
      },
      {
        "s": "Arc length \\(s = r\\theta\\) where \\(\\theta\\) is in radians",
        "cat": 1
      },
      {
        "s": "Cone volume: \\(V = \\frac{1}{3}\\pi r^2 h\\)",
        "cat": 2
      },
      {
        "s": "Sphere volume: \\(V = \\frac{4}{3}\\pi r^3\\)",
        "cat": 2
      }
    ],
    "items_ar": [
      {
        "s": "\\(\\sin\\theta = \\text{opp}/\\text{hyp}\\) و \\(\\cos\\theta = \\text{adj}/\\text{hyp}\\)",
        "cat": 0
      },
      {
        "s": "متطابقة الدوال المتممة: \\(\\sin(x^\\circ) = \\cos(90^\\circ - x^\\circ)\\)",
        "cat": 0
      },
      {
        "s": "معادلة الدائرة: \\((x - h)^2 + (y - k)^2 = r^2\\)",
        "cat": 1
      },
      {
        "s": "طول القوس \\(s = r\\theta\\) حيث \\(\\theta\\) بالراديان",
        "cat": 1
      },
      {
        "s": "حجم المخروط: \\(V = \\frac{1}{3}\\pi r^2 h\\)",
        "cat": 2
      },
      {
        "s": "حجم الكرة: \\(V = \\frac{4}{3}\\pi r^3\\)",
        "cat": 2
      }
    ],
    "ex": "Right triangles use trig ratios and cofunction rules; circles use center-radius and arc length formulas; solids use 3D cubic formulas.",
    "ex_ar": "المثلثات القائمة تستخدم النسب المثلثية والمتتامات؛ والدوائر تستخدم صيغ المركز ونصف القطر وطول القوس؛ والمجسمات تستخدم قوانين الحجوم التكعيبية."
  },
  {
    "t": "sb",
    "ti": "Step Builder: Circle, center \\((2,3)\\), radius \\(5\\)",
    "ti_ar": "باني الخطوات: معادلة الدائرة، المركز \\((2,3)\\)، نصف القطر \\(5\\)",
    "steps": [
      {
        "l": "Standard form: \\((x-h)^2+(y-k)^2=r^2\\). Substitute \\(h=2,k=3,r=5\\). \\(r^2=\\)",
        "a": "25",
        "h": "Square the radius \\(r = 5\\) to find \\(r^2 = 5^2\\)."
      },
      {
        "l": "Full equation:",
        "a": "(x-2)^2+(y-3)^2=25",
        "h": "Substitute \\(h=2\\), \\(k=3\\), and \\(r^2\\) into \\((x-h)^2 + (y-k)^2 = r^2\\)."
      }
    ],
    "steps_ar": [
      {
        "l": "الصيغة القياسية: \\((x-h)^2+(y-k)^2=r^2\\). بالتعويض عن \\(h=2,k=3,r=5\\). \\(r^2=\\)",
        "a": "25",
        "h": "ربّع نصف القطر \\(r = 5\\) لإيجاد \\(r^2 = 5^2\\)."
      },
      {
        "l": "المعادلة الكاملة:",
        "a": "(x-2)^2+(y-3)^2=25",
        "h": "عوّض عن \\(h=2\\) و\\(k=3\\) وقيمة \\(r^2\\) في الصيغة \\((x-h)^2 + (y-k)^2 = r^2\\)."
      }
    ]
  },
  {
    "t": "sr",
    "ti": "Worked Example: Area of a Triangle Using Sine (SAS)",
    "ti_ar": "مثال محلول: مساحة المثلث باستخدام الجيب (SAS)",
    "steps": [
      "Find the area of a triangle with two sides 8 and 10 and included angle 30°. Formula: \\(\\text{Area}=\\dfrac12ab\\sin C\\).",
      "Substitute \\(a=8\\), \\(b=10\\), \\(C=30°\\): \\(\\text{Area}=\\dfrac12(8)(10)\\sin30°\\).",
      "\\(\\sin30°=\\dfrac12\\), so \\(\\text{Area}=\\dfrac12(80)\\left(\\dfrac12\\right)=20\\)."
    ],
    "steps_ar": [
      "أوجد مساحة مثلث ضلعاه 8 و10 والزاوية المحصورة 30°. القانون: \\(\\text{المساحة}=\\dfrac12ab\\sin C\\).",
      "عوّض \\(a=8\\)، \\(b=10\\)، \\(C=30°\\): \\(\\text{المساحة}=\\dfrac12(8)(10)\\sin30°\\).",
      "\\(\\sin30°=\\dfrac12\\)، إذن \\(\\text{المساحة}=\\dfrac12(80)\\left(\\dfrac12\\right)=20\\)."
    ]
  },
  {
    "t": "mt",
    "ti": "Matching: Special Triangles & Circles",
    "ti_ar": "مطابقة: المثلثات الخاصة والدوائر",
    "p": [
      {
        "l": "30°-60°-90° hypotenuse (short leg x)",
        "r": "2x"
      },
      {
        "l": "45°-45°-90° hypotenuse (leg x)",
        "r": "x√2"
      },
      {
        "l": "Arc length for angle θ (radians)",
        "r": "rθ"
      },
      {
        "l": "Sector area for angle θ (radians)",
        "r": "½r²θ"
      }
    ],
    "p_ar": [
      {
        "l": "وتر المثلث 30°-60°-90° (الضلع القصير x)",
        "r": "2x"
      },
      {
        "l": "وتر المثلث 45°-45°-90° (الضلع x)",
        "r": "x√2"
      },
      {
        "l": "طول القوس للزاوية θ بالراديان",
        "r": "rθ"
      },
      {
        "l": "مساحة القطاع الدائري للزاوية θ بالراديان",
        "r": "½r²θ"
      }
    ]
  },
  {
    "t": "se",
    "ti": "Spot the Error: Quadrant Sign & Dividing by \\(\\sin\\theta\\) (Area, Volume, Triangles, Circles & Trigonometry)",
    "ti_ar": "اكتشف الخطأ: إشارة الربع والقسمة على \\(\\sin\\theta\\) (المساحة والحجم والمثلثات والدوائر وحساب المثلثات)",
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
    "ti": "Examiner Mode: Quadrant Identities & Cosine Rule (Area, Volume, Triangles, Circles & Trigonometry)",
    "ti_ar": "وضع المصحح: المتطابقات المثلثية وقانون جيب التمام (المساحة والحجم والمثلثات والدوائر وحساب المثلثات)",
    "q": "Suppose \\(\\sin\\theta = \\dfrac{3}{5}\\) with \\(\\theta \\in \\left(\\frac{\\pi}{2}, \\pi\\right)\\) (Quadrant II). (a) Find exact values of \\(\\cos\\theta\\) and \\(\\tan\\theta\\). (b) Evaluate \\(\\sin(2\\theta)\\).",
    "q_ar": "إذا كان \\(\\sin\\theta = \\dfrac{3}{5}\\) حيث \\(\\theta \\in \\left(\\frac{\\pi}{2}, \\pi\\right)\\) (الربع الثاني). (أ) أوجد القيمة الدقيقة لكل من \\(\\cos\\theta\\) و\\(\\tan\\theta\\). (ب) احسب \\(\\sin(2\\theta)\\).",
    "parts": [
      {
        "label": "Part (a) — Quadrant II Cosine & Tangent",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "\\(\\cos^2\\theta = 1 - \\frac{9}{25} = \\frac{16}{25}\\), negative in QII \\(\\implies \\cos\\theta = -\\frac{4}{5}\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "\\(\\tan\\theta = \\frac{\\sin\\theta}{\\cos\\theta} = -\\frac{3}{4}\\)."
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
            "text": "\\(\\sin(2\\theta) = 2\\left(\\frac{3}{5}\\right)\\left(-\\frac{4}{5}\\right) = -\\frac{24}{25}\\)."
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
            "text": "في الربع الثاني \\(\\cos\\theta < 0\\) ومن متطابقة فيثاغورس \\(\\cos\\theta = -\\frac{4}{5}\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "\\(\\tan\\theta = -\\frac{3}{4}\\)."
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
            "text": "\\(\\sin(2\\theta) = -\\frac{24}{25}\\)."
          }
        ]
      }
    ]
  },
  {
    "t": "qc",
    "ti": "Quick Check: Period of a Transformed Sinusoid (Area, Volume, Triangles, Circles & Trigonometry)",
    "ti_ar": "فحص سريع: دورة الدالة الجيبية (المساحة والحجم والمثلثات والدوائر وحساب المثلثات)",
    "q": "What is the fundamental period of \\(f(x) = 6\\sin(2x - \\pi) + 1\\)?",
    "q_ar": "ما الدورة الأساسية للدالة \\(f(x) = 6\\sin(2x - \\pi) + 1\\)؟",
    "o": [
      "\\(\\dfrac{2\\pi}{2}\\)",
      "\\(4\\pi\\)",
      "\\(\\dfrac{\\pi}{2}\\)",
      "\\(6\\pi\\)"
    ],
    "o_ar": [
      "\\(\\dfrac{2\\pi}{2}\\)",
      "\\(4\\pi\\)",
      "\\(\\dfrac{\\pi}{2}\\)",
      "\\(6\\pi\\)"
    ],
    "a": 0,
    "ex": "For \\(A\\sin(Bx + C) + D\\), the period is \\(\\frac{2\\pi}{|B|} = \\frac{2\\pi}{2}\\).",
    "ex_ar": "دورة الدالة \\(A\\sin(Bx + C) + D\\) تساوي \\(\\frac{2\\pi}{|B|} = \\frac{2\\pi}{2}\\)."
  }
];
D["sat-desmos"] = [
  {
    "t": "num",
    "ti": "Numeric Entry: Solution via Desmos Intersection",
    "ti_ar": "إدخال رقمي: الحل عبر تقاطع ديسموس",
    "q": "Graphing \\(y = 2x + 7\\) and \\(y = -x^2 + 6x + 2\\) shows an intersection at \\((5, 17)\\). What is the value of x at this intersection?",
    "q_ar": "تمثيل \\(y = 2x + 7\\) و \\(y = -x^2 + 6x + 2\\) بيانيًا يظهر تقاطعاً عند \\((5, 17)\\). ما قيمة x عند نقطة التقاطع هذه؟",
    "a": 5,
    "ex": "The x-coordinate at the intersection point \\((5, 17)\\) is 5.",
    "ex_ar": "الإحداثي السيني x عند نقطة التقاطع \\((5, 17)\\) هو 5."
  },
  {
    "t": "cat",
    "ti": "Categorize: Optimal Desmos Techniques on SAT",
    "ti_ar": "تصنيف: أفضل استراتيجيات ديسموس في اختبار SAT",
    "categories": [
      "Find Intersections (Graph Both Sides)",
      "Add Slider for Parameter",
      "Table Regression (~)",
      "Direct Arithmetic Calculation"
    ],
    "categories_ar": [
      "إيجاد التقاطعات (تمثيل الطرفين)",
      "إضافة شريط تمرير للمجهول",
      "الانحدار الإحصائي بالجداول (~)",
      "الحساب العددي المباشر"
    ],
    "items": [
      {
        "s": "Solve \\(3x^2 - 5x = 2x + 1\\) by graphing \\(y=3x^2-5x\\) and \\(y=2x+1\\)",
        "cat": 0
      },
      {
        "s": "Find value of k such that \\(x^2 + kx + 9 = 0\\) has one root",
        "cat": 1
      },
      {
        "s": "Find exponential curve through (1, 6) and (3, 24)",
        "cat": 2
      },
      {
        "s": "Compute \\(\\frac{17.4^3 - \\sqrt{512}}{3.2}\\)",
        "cat": 3
      }
    ],
    "items_ar": [
      {
        "s": "حل \\(3x^2 - 5x = 2x + 1\\) بتمثيل \\(y=3x^2-5x\\) و \\(y=2x+1\\)",
        "cat": 0
      },
      {
        "s": "إيجاد قيمة k التي تجعل للمعادلة \\(x^2 + kx + 9 = 0\\) جذراً واحداً",
        "cat": 1
      },
      {
        "s": "إيجاد الدالة الأسية المارة بالنقطتين (1, 6) و (3, 24)",
        "cat": 2
      },
      {
        "s": "حساب المقدار \\(\\frac{17.4^3 - \\sqrt{512}}{3.2}\\)",
        "cat": 3
      }
    ],
    "ex": "Desmos offers intersections for equations, sliders for parameter exploration, regression for curve fitting, and instant arithmetic.",
    "ex_ar": "يوفر ديسموس نقاط التقاطع للمعادلات، وأشرطة التمرير للثوابت، ونماذج الانحدار لملائمة المنحنيات، والحساب الفوري."
  },
  {
    "t": "ord",
    "ti": "Order the Steps: Solving a System via Desmos",
    "ti_ar": "ترتيب الخطوات: حل نظام معادلات عبر ديسموس",
    "prompt": "Arrange the steps to find all intersection points of \\(y = x^2 - 4x + 3\\) and \\(y = 2x - 6\\):",
    "prompt_ar": "رتّب الخطوات لإيجاد جميع نقاط تقاطع \\(y = x^2 - 4x + 3\\) و \\(y = 2x - 6\\):",
    "items": [
      "Type the first equation into Desmos: \\(y = x^2 - 4x + 3\\).",
      "Type the second equation into the next line: \\(y = 2x - 6\\).",
      "Locate the intersection points displayed as gray clickable dots on the graph.",
      "Click the gray dots to inspect coordinates: tangency occurs at \\((3, 0)\\).",
      "Read the required coordinate: \\(x = 3\\) is the single solution."
    ],
    "items_ar": [
      "اكتب المعادلة الأولى في ديسموس: \\(y = x^2 - 4x + 3\\).",
      "اكتب المعادلة الثانية في السطر التالي: \\(y = 2x - 6\\).",
      "حدد نقاط التقاطع التي تظهر كنقاط رمادية قابلة للنقر على الرسم البياني.",
      "انقر على النقطة الرمادية لقراءة الإحداثيات: نقطة التماس عند \\((3, 0)\\).",
      "اقرأ الإحداثي المطلوب: \\(x = 3\\) هو الحل الوحيد."
    ],
    "ex": "Entering both equations reveals intersections immediately without manual algebraic elimination.",
    "ex_ar": "إدخال المعادلتين يكشف نقاط التقاطع مباشرة دون الحاجة للحذف الجبري اليدوي."
  },
  {
    "t": "sr",
    "ti": "Worked Example: Solve Graphically Instead of Algebraically",
    "ti_ar": "مثال محلول: الحل بيانيًا بدلًا من الجبر",
    "steps": [
      "To solve \\(x^2-4=2x-1\\) graphically, graph both sides as separate functions: \\(y_1=x^2-4\\) and \\(y_2=2x-1\\).",
      "The solutions to the original equation are the x-coordinates where the two graphs intersect.",
      "This avoids algebra entirely — just find the intersection point(s) on your calculator."
    ],
    "steps_ar": [
      "لحل المعادلة \\(x^2-4=2x-1\\) بيانيًا، مثل كل طرف كدالة منفصلة: \\(y_1=x^2-4\\) و\\(y_2=2x-1\\).",
      "حلول المعادلة الأصلية هي الإحداثيات السينية (x) لنقاط تقاطع المنحنيين.",
      "هذا يجنبك الجبر كليًا — ما عليك سوى العثور على نقاط التقاطع عبر الحاسبة."
    ]
  },
  {
    "t": "qc",
    "ti": "Quick Check: Graphical System Solution",
    "ti_ar": "فحص سريع: حل النظام بيانيًا",
    "q": "Graphing \\(y = 2x + 1\\) and \\(y = -x + 7\\) gives an intersection at \\((2, 5)\\). What is the value of \\(x\\)?",
    "q_ar": "تمثيل \\(y = 2x + 1\\) و\\(y = -x + 7\\) بيانيًا يتقاطعان عند \\((2, 5)\\). ما قيمة \\(x\\)؟",
    "o": [
      "2",
      "5",
      "7",
      "1"
    ],
    "o_ar": [
      "2",
      "5",
      "7",
      "1"
    ],
    "a": 0,
    "ex": "The solution for \\(x\\) is the x-coordinate of the intersection point, which is 2.",
    "ex_ar": "حل المعادلة بالنسبة لـ x هو الإحداثي السيني لنقطة التقاطع، وهو 2."
  },
  {
    "t": "se",
    "ti": "Spot the Error: Exam Pacing & Time Allocation (Desmos Graphing Calculator Tactics)",
    "ti_ar": "اكتشف الخطأ: إدارة الوقت وتوزيع الدرجات (تكتيكات حاسبة Desmos البيانية لحل مسائل SAT بسرعة)",
    "q": "A student plans their timing for a 25-question, 38-minute section in SAT. Which step in their strategy introduces a flaw?",
    "q_ar": "يخطط طالب لتوزيع وقته في قسم مكوّن من 25 سؤالاً خلال 38 دقيقة. أي خطوة تتضمن خللاً منهجياً؟",
    "steps": [
      "Compute average time budget per question: \\(\\frac{38\\times 60}{25} = 91\\) seconds.",
      "Complete a first pass of straightforward items in roughly \\(64\\) seconds each to bank time.",
      "Spend \\(9\\) minutes stuck on a single hard item before reading the remaining 13 questions.",
      "Reserve the final \\(4\\) minutes to verify flagged items and ensure no unanswered blanks remain."
    ],
    "steps_ar": [
      "حساب متوسط الزمن لكل سؤال: \\(\\frac{38\\times 60}{25} = 91\\) ثانية.",
      "إنجاز الجولة الأولى للأسئلة المباشرة خلال نحو \\(64\\) ثانية للسؤال لتوفير الوقت.",
      "قضاء \\(9\\) دقائق متواصلة على سؤال صعب واحد قبل قراءة بقية الأسئلة (13 سؤالاً).",
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
    "ti": "Examiner Mode: Pacing Audit & Target Score Plan (Desmos Graphing Calculator Tactics)",
    "ti_ar": "وضع المصحح: خطة إدارة الوقت والدرجة المستهدفة (تكتيكات حاسبة Desmos البيانية لحل مسائل SAT بسرعة)",
    "q": "A practice section has \\(25\\) equal-weight questions in \\(38\\) minutes with no penalty for wrong guesses. A student answers \\(22\\) correctly on Pass 1–2. (a) Find the exact seconds-per-question budget and accuracy percentage. (b) State the optimal triage rule for the remaining \\(3\\) flagged questions.",
    "q_ar": "يتكون قسم تدريبي من \\(25\\) سؤالاً متساوية الوزن في \\(38\\) دقيقة دون خصم على الإجابات الخاطئة. أجاب طالب عن \\(22\\) سؤالاً بشكل صحيح. (أ) أوجد الزمن المخصص لكل سؤال بالثواني ونسبة الدقة المئوية. (ب) اذكر قاعدة الفرز المثلى للأسئلة المتبقية وعددها \\(3\\).",
    "parts": [
      {
        "label": "Part (a) — Time Budget & Raw Accuracy",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "Time per item: \\(\\frac{2280}{25} = 91\\text{ s}\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "Raw score percentage: \\(\\frac{22}{25} \\times 100\\% \\approx 88\\%\\)."
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
            "text": "Select the best remaining option on all \\(3\\) items before time expires (expected gain \\(> 0\\) with no guessing penalty)."
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
            "text": "الزمن لكل سؤال: \\(\\frac{2280}{25} = 91\\) ثانية."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "النسبة المئوية للدرجة الخام: \\(\\frac{22}{25} \\times 100\\% \\approx 88\\%\\)."
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
            "text": "اختيار أفضل إجابة لجميع الأسئلة المتبقية (3) قبل انتهاء الوقت لعدم وجود خصم."
          }
        ]
      }
    ]
  },
  {
    "t": "sb",
    "ti": "Step Builder: Exam Time & Score Budget (Desmos Graphing Calculator Tactics)",
    "ti_ar": "بناء الخطوات: حساب ميزانية الوقت والدرجة (تكتيكات حاسبة Desmos البيانية لحل مسائل SAT بسرعة)",
    "steps": [
      {
        "l": "Convert \\(38\\) minutes into total seconds:",
        "a": "2280",
        "h": "Multiply 38 by 60."
      },
      {
        "l": "Divide by \\(25\\) questions to get seconds per question:",
        "a": "91",
        "h": "Compute 2280 / 25."
      },
      {
        "l": "If you answer \\(22\\) out of \\(25\\) correctly, how many items remain for review?",
        "a": "3",
        "h": "Subtract 22 from 25."
      }
    ],
    "steps_ar": [
      {
        "l": "حوّل \\(38\\) دقيقة إلى إجمالي الثواني:",
        "a": "2280",
        "h": "اضرب 38 في 60."
      },
      {
        "l": "اقسم على \\(25\\) سؤالاً لإيجاد عدد الثواني لكل سؤال:",
        "a": "91",
        "h": "احسب 2280 ÷ 25."
      },
      {
        "l": "إذا حللت \\(22\\) من أصل \\(25\\)، فكم سؤالاً يتبقى للمراجعة؟",
        "a": "3",
        "h": "اطرح 22 من 25."
      }
    ]
  },
  {
    "t": "mt",
    "ti": "Matching: High-Yield Exam Tactics (Desmos Graphing Calculator Tactics)",
    "ti_ar": "مطابقة: تكتيكات الحل السريع والتحقق (تكتيكات حاسبة Desmos البيانية لحل مسائل SAT بسرعة)",
    "p": [
      {
        "l": "Pass 1 (64 s/item)",
        "r": "Solve direct items immediately to bank guaranteed marks"
      },
      {
        "l": "Boundary / Sign Sanity Check",
        "r": "Eliminate options with impossible signs, units, or limiting values"
      },
      {
        "l": "Back-Solving from Choices",
        "r": "Substitute middle option first when algebraic setup is slow"
      },
      {
        "l": "Final 3-Minute Sweep",
        "r": "Verify flagged items and confirm zero unanswered questions"
      }
    ],
    "p_ar": [
      {
        "l": "الجولة الأولى (64 ث/سؤال)",
        "r": "حل الأسئلة المباشرة فوراً لتأمين الدرجات المضمونة"
      },
      {
        "l": "فحص الإشارة والقيم الحدية",
        "r": "استبعاد الخيارات ذات الإشارات أو الوحدات المستحيلة رياضياً"
      },
      {
        "l": "التجريب العكسي للخيارات",
        "r": "تعويض الخيار الأوسط أولاً عندما يكون البناء الجبري طويلاً"
      },
      {
        "l": "مراجعة الدقائق الثلاث الأخيرة",
        "r": "مراجعة الأسئلة المعلّمة والتأكد من عدم ترك أي فراغ"
      }
    ]
  }
];
D["sat-functions"] = [
  {
    "t": "num",
    "ti": "Numeric Entry: Composite Function Evaluation",
    "ti_ar": "إدخال رقمي: حساب قيمة دالة مركبة",
    "q": "If \\(f(x) = 3x - 4\\) and \\(g(x) = x^2 + 2\\), what is the value of \\(f(g(3))\\)?",
    "q_ar": "إذا كانت \\(f(x) = 3x - 4\\) و \\(g(x) = x^2 + 2\\)، فما قيمة \\(f(g(3))\\)؟",
    "a": 29,
    "ex": "First compute \\(g(3) = 3^2 + 2 = 9 + 2 = 11\\). Then \\(f(11) = 3(11) - 4 = 33 - 4 = 29\\).",
    "ex_ar": "أولاً احسب \\(g(3) = 3^2 + 2 = 9 + 2 = 11\\). ثم احسب \\(f(11) = 3(11) - 4 = 33 - 4 = 29\\)."
  },
  {
    "t": "cat",
    "ti": "Categorize: Function Transformations",
    "ti_ar": "تصنيف: تحويلات الدوال الهندسية",
    "categories": [
      "Vertical Shift",
      "Horizontal Shift",
      "Reflection across Axis"
    ],
    "categories_ar": [
      "إزاحة رأسية",
      "إزاحة أفقية",
      "انعكاس حول محور"
    ],
    "items": [
      {
        "s": "\\(f(x) + 5\\)",
        "cat": 0
      },
      {
        "s": "\\(f(x - 3)\\)",
        "cat": 1
      },
      {
        "s": "\\(-f(x)\\)",
        "cat": 2
      },
      {
        "s": "\\(f(x) - 7\\)",
        "cat": 0
      },
      {
        "s": "\\(f(x + 4)\\)",
        "cat": 1
      },
      {
        "s": "\\(f(-x)\\)",
        "cat": 2
      }
    ],
    "items_ar": [
      {
        "s": "\\(f(x) + 5\\)",
        "cat": 0
      },
      {
        "s": "\\(f(x - 3)\\)",
        "cat": 1
      },
      {
        "s": "\\(-f(x)\\)",
        "cat": 2
      },
      {
        "s": "\\(f(x) - 7\\)",
        "cat": 0
      },
      {
        "s": "\\(f(x + 4)\\)",
        "cat": 1
      },
      {
        "s": "\\(f(-x)\\)",
        "cat": 2
      }
    ],
    "ex": "f(x)+k is vertical, f(x-h) is horizontal, -f(x) reflects over x-axis, and f(-x) reflects over y-axis.",
    "ex_ar": "f(x)+k إزاحة رأسية، و f(x-h) إزاحة أفقية، و -f(x) انعكاس حول المحور السيني، و f(-x) انعكاس حول المحور الصادي."
  },
  {
    "t": "ord",
    "ti": "Order the Steps: Evaluating Nested Functions",
    "ti_ar": "ترتيب الخطوات: حساب قيم الدوال المتداخلة",
    "prompt": "Arrange the steps to evaluate \\(f(g(2))\\) given \\(f(x) = 3x - 4\\) and \\(g(x) = x^2 + 5\\):",
    "prompt_ar": "رتّب خطوات حساب \\(f(g(2))\\) إذا علمت أن \\(f(x) = 3x - 4\\) و \\(g(x) = x^2 + 5\\):",
    "items": [
      "Identify the innermost input: evaluate \\(g(2)\\) first.",
      "Substitute 2 into \\(g(x)\\): \\(g(2) = 2^2 + 5 = 4 + 5 = 9\\).",
      "Substitute the inner result (9) into the outer function \\(f\\): \\(f(9)\\).",
      "Compute the final expression: \\(f(9) = 3(9) - 4 = 27 - 4 = 23\\)."
    ],
    "items_ar": [
      "تحديد المدخل الداخلي أولاً: حساب \\(g(2)\\).",
      "التعويض بالعدد 2 في الدالة \\(g(x)\\): \\(g(2) = 2^2 + 5 = 4 + 5 = 9\\).",
      "التعويض بالناتج الداخلي (9) في الدالة الخارجية \\(f\\): \\(f(9)\\).",
      "حساب القيمة النهائية: \\(f(9) = 3(9) - 4 = 27 - 4 = 23\\)."
    ],
    "ex": "Always work from inside outward when evaluating composite functions.",
    "ex_ar": "ابدأ دائماً من الداخل إلى الخارج عند حساب قيم الدوال المركبة."
  },
  {
    "t": "fn",
    "ti": "Explorer: Function Shift \\((x-h)^2-3\\)",
    "ti_ar": "مستكشف: إزاحة الدالة \\((x-h)^2-3\\)",
    "fns": [
      {
        "expr": "(x-h)^2-3",
        "color": "#1E3A6E",
        "label": "(x-h)^2-3"
      }
    ],
    "xrange": [
      -5,
      5
    ],
    "yrange": [
      -4,
      8
    ],
    "params": [
      {
        "name": "h",
        "label": "Shift h",
        "min": -3,
        "max": 3,
        "step": 1,
        "default": 0
      }
    ]
  },
  {
    "t": "sr",
    "ti": "Worked Example: Evaluate a Composite Function",
    "ti_ar": "مثال محلول: إيجاد قيمة دالة مركّبة",
    "steps": [
      "If \\(f(x)=2x-1\\) and \\(g(x)=x^2\\), find \\(f(g(3))\\). Compute the inner function first: \\(g(3)=3^2=9\\).",
      "Now apply \\(f\\) to that result: \\(f(9)=2(9)-1\\).",
      "\\(f(9)=17\\)."
    ],
    "steps_ar": [
      "إذا كانت \\(f(x)=2x-1\\) و\\(g(x)=x^2\\)، فأوجد \\(f(g(3))\\). احسب الدالة الداخلية أولًا: \\(g(3)=3^2=9\\).",
      "طبّق الدالة \\(f\\) على الناتج: \\(f(9)=2(9)-1\\).",
      "\\(f(9)=17\\)."
    ]
  },
  {
    "t": "qc",
    "ti": "Quick Check: Function Evaluation",
    "ti_ar": "فحص سريع: حساب قيمة الدالة",
    "q": "If \\(f(x)=x^2+1\\), find \\(f(-2)\\)",
    "q_ar": "إذا كانت \\(f(x)=x^2+1\\)، فأوجد \\(f(-2)\\)",
    "o": [
      "5",
      "3",
      "−3",
      "4"
    ],
    "o_ar": [
      "5",
      "3",
      "−3",
      "4"
    ],
    "a": 0,
    "ex": "\\((-2)^2+1=4+1=5\\).",
    "ex_ar": "\\((-2)^2+1=4+1=5\\)."
  },
  {
    "t": "se",
    "ti": "Spot the Error: Composite Order & Inverse Domain (Nonlinear Functions & Function Notation)",
    "ti_ar": "اكتشف الخطأ: ترتيب تركيب الدوال ومجال المعكوس (الدوال غير الخطية وترميز الدوال والتحويلات)",
    "q": "Let \\(f(x) = 4x + 1\\) and \\(g(x) = x^2 + 1\\). A student evaluates \\((f \\circ g)(4)\\). Which step is wrong?",
    "q_ar": "لتكن \\(f(x) = 4x + 1\\) و\\(g(x) = x^2 + 1\\). يحسب طالب \\((f \\circ g)(4)\\). أي خطوة خاطئة؟",
    "steps": [
      "Write \\((f \\circ g)(4) = g(f(4))\\) by applying \\(f\\) first instead of \\(g\\).",
      "Compute \\(f(4) = 17\\).",
      "Square and add \\(1\\) to get \\(290\\)."
    ],
    "steps_ar": [
      "كتابة \\((f \\circ g)(4) = g(f(4))\\) بتطبيق \\(f\\) أولاً بدلاً من \\(g\\).",
      "حساب \\(f(4) = 17\\).",
      "التربيع وإضافة \\(1\\) للحصول على \\(290\\)."
    ],
    "errorStep": 1,
    "reasons": [
      "By definition \\((f \\circ g)(x) = f(g(x))\\): evaluate the inner function \\(g(4) = 17\\) first, then \\(f(17) = 69\\).",
      "Function composition is always commutative.",
      "You must multiply \\(f(4)\\) by \\(g(4)\\)."
    ],
    "reasons_ar": [
      "حسب التعريف \\((f \\circ g)(x) = f(g(x))\\): نحسب الدالة الداخلية أولاً \\(g(4) = 17\\) ثم \\(f(17) = 69\\).",
      "تركيب الدوال عملية إبدالية دائماً.",
      "يجب ضرب \\(f(4)\\) في \\(g(4)\\)."
    ],
    "correctReason": 0
  },
  {
    "t": "ms",
    "ti": "Examiner Mode: One-to-One Domain Restriction & Inverse (Nonlinear Functions & Function Notation)",
    "ti_ar": "وضع المصحح: تقييد المجال وإيجاد الدالة العكسية (الدوال غير الخطية وترميز الدوال والتحويلات)",
    "q": "Let \\(h(x) = (x - 4)^2 + 1\\) for \\(x \\ge 4\\). (a) State the range of \\(h\\) and explain why \\(h^{-1}\\) exists on \\(x \\ge 4\\). (b) Find \\(h^{-1}(x)\\) and state its domain.",
    "q_ar": "لتكن \\(h(x) = (x - 4)^2 + 1\\) حيث \\(x \\ge 4\\). (أ) اذكر مدى \\(h\\) وفسّر سبب وجود معكوس لها. (ب) أوجد \\(h^{-1}(x)\\) وحدد مجالها.",
    "parts": [
      {
        "label": "Part (a) — Range & Injectivity",
        "marks": 2,
        "rubric": [
          {
            "code": "B1",
            "marks": 1,
            "text": "Range of \\(h\\) is \\([ 1, \\infty )\\) since \\((x - 4)^2 \\ge 0\\)."
          },
          {
            "code": "B1",
            "marks": 1,
            "text": "For \\(x \\ge 4\\), \\(h\\) is strictly increasing (one-to-one / passes horizontal line test)."
          }
        ]
      },
      {
        "label": "Part (b) — Inverse Formula & Domain",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "Solve \\(y = (x - 4)^2 + 1 \\implies x = 4 + \\sqrt{y - 1}\\) (choosing \\(+\\) branch for \\(x \\ge 4\\))."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "\\(h^{-1}(x) = 4 + \\sqrt{x - 1}\\) with domain \\(x \\ge 1\\)."
          }
        ]
      }
    ],
    "parts_ar": [
      {
        "label": "الجزء (أ) — المدى وشرط التباين (واحد لواحد)",
        "marks": 2,
        "rubric": [
          {
            "code": "B1",
            "marks": 1,
            "text": "مدى الدالة \\(h\\) هو \\([ 1, \\infty )\\) لأن \\((x - 4)^2 \\ge 0\\)."
          },
          {
            "code": "B1",
            "marks": 1,
            "text": "على الفترة \\(x \\ge 4\\) الدالة متزايدة تماماً (واحد لواحد)."
          }
        ]
      },
      {
        "label": "الجزء (ب) — قاعدة المعكوس ومجاله",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "حل المعادلة بدلالة \\(x\\) مع اختيار الفرع الموجب: \\(x = 4 + \\sqrt{y - 1}\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "\\(h^{-1}(x) = 4 + \\sqrt{x - 1}\\) ومجالها \\(x \\ge 1\\)."
          }
        ]
      }
    ]
  },
  {
    "t": "sb",
    "ti": "Step Builder: Composite & Inverse Function Evaluation (Nonlinear Functions & Function Notation)",
    "ti_ar": "بناء الخطوات: حساب التركيب والمعكوس (الدوال غير الخطية وترميز الدوال والتحويلات)",
    "steps": [
      {
        "l": "For \\(f(x) = 4x + 1\\) and \\(g(x) = x^2 + 1\\), find \\(g(4) =\\)",
        "a": "17",
        "h": "Compute 4² + 1."
      },
      {
        "l": "Now evaluate \\(f(g(4)) = f(17) =\\)",
        "a": "69",
        "h": "Compute 4×17 + 1."
      },
      {
        "l": "Evaluate \\(f^{-1}(13) =\\)",
        "a": "3",
        "h": "Solve 4x + 1 = 13."
      }
    ],
    "steps_ar": [
      {
        "l": "للدالتين \\(f(x) = 4x + 1\\) و\\(g(x) = x^2 + 1\\)، أوجد \\(g(4) =\\)",
        "a": "17",
        "h": "احسب 4² + 1."
      },
      {
        "l": "الآن احسب \\(f(g(4)) = f(17) =\\)",
        "a": "69",
        "h": "احسب 4×17 + 1."
      },
      {
        "l": "أوجد قيمة المعكوس \\(f^{-1}(13) =\\)",
        "a": "3",
        "h": "حل المعادلة 4x + 1 = 13."
      }
    ]
  },
  {
    "t": "mt",
    "ti": "Matching: Function Transformations & Inverse Rules (Nonlinear Functions & Function Notation)",
    "ti_ar": "مطابقة: تحويلات الدوال وقواعد المعكوس (الدوال غير الخطية وترميز الدوال والتحويلات)",
    "p": [
      {
        "l": "Graph of \\(y = f^{-1}(x)\\)",
        "r": "Reflection of \\(y = f(x)\\) across \\(y = x\\)"
      },
      {
        "l": "Domain of \\(f^{-1}\\)",
        "r": "Exact range of \\(f\\)"
      },
      {
        "l": "Transformation \\(y = f(x - 4) + 1\\)",
        "r": "Shift right \\(4\\) units and up \\(1\\) units"
      },
      {
        "l": "Modulus graph \\(y = |f(x)|\\)",
        "r": "Reflects portions where \\(f(x) < 0\\) above the \\(x\\)-axis"
      }
    ],
    "p_ar": [
      {
        "l": "منحنى المعكوس \\(y = f^{-1}(x)\\)",
        "r": "انعكاس منحنى \\(y = f(x)\\) حول المستقيم \\(y = x\\)"
      },
      {
        "l": "مجال الدالة العكسية \\(f^{-1}\\)",
        "r": "يساوي مدى الدالة الأصلية \\(f\\) تماماً"
      },
      {
        "l": "التحويل \\(y = f(x - 4) + 1\\)",
        "r": "إزاحة لليمين \\(4\\) وحدات ولأعلى \\(1\\) وحدات"
      },
      {
        "l": "منحنى القيمة المطلقة \\(y = |f(x)|\\)",
        "r": "يعكس الأجزاء السالبة \\(f(x) < 0\\) فوق محور السينات"
      }
    ]
  }
];
D["sat-stats"] = [
  {
    "t": "num",
    "ti": "Numeric Entry: Range of a Data Set",
    "ti_ar": "إدخال رقمي: مدى مجموعة البيانات",
    "q": "A dataset has a minimum value of \\(28\\), a median of \\(36\\), and a maximum value of \\(45\\). What is the range of the dataset?",
    "q_ar": "مجموعة بيانات قيمتها الصغرى \\(28\\) ووسيطها \\(36\\) وقيمتها العظمى \\(45\\). ما مدى مجموعة البيانات؟",
    "a": 17,
    "ex": "\\(\\text{Range} = \\text{Maximum} - \\text{Minimum} = 45 - 28 = 17\\).",
    "ex_ar": "\\(\\text{المدى} = \\text{القيمة العظمى} - \\text{القيمة الصغرى} = 45 - 28 = 17\\)."
  },
  {
    "t": "cat",
    "ti": "Categorize: Center vs Spread Measures",
    "ti_ar": "تصنيف: مقاييس النزعة المركزية ومقاييس التشتت",
    "categories": [
      "Measures of Center",
      "Measures of Spread (Variability)"
    ],
    "categories_ar": [
      "مقاييس النزعة المركزية",
      "مقاييس التشتت والتباين"
    ],
    "items": [
      {
        "s": "Mean",
        "cat": 0
      },
      {
        "s": "Median",
        "cat": 0
      },
      {
        "s": "Standard Deviation",
        "cat": 1
      },
      {
        "s": "Variance (\\(\\sigma^2\\))",
        "cat": 1
      },
      {
        "s": "Range (Max - Min)",
        "cat": 1
      },
      {
        "s": "Mode",
        "cat": 0
      }
    ],
    "items_ar": [
      {
        "s": "المتوسط الحسابي (Mean)",
        "cat": 0
      },
      {
        "s": "الوسيط (Median)",
        "cat": 0
      },
      {
        "s": "الانحراف المعياري (Standard Deviation)",
        "cat": 1
      },
      {
        "s": "التباين (\\(\\sigma^2\\))",
        "cat": 1
      },
      {
        "s": "المدى (الأكبر - الأصغر)",
        "cat": 1
      },
      {
        "s": "المنوال (Mode)",
        "cat": 0
      }
    ],
    "ex": "Mean, median, and mode measure center/typical value; standard deviation, variance, and range measure spread/variability.",
    "ex_ar": "المتوسط والوسيط والمنوال تقيس المركز؛ بينما الانحراف المعياري والتباين والمدى تقيس التشتت."
  },
  {
    "t": "ord",
    "ti": "Order the Steps: Constructing a Margin of Error Interval",
    "ti_ar": "ترتيب الخطوات: إنشاء فترة هامش الخطأ",
    "prompt": "Arrange the steps to compute and interpret a confidence interval from a survey estimate of 54% with margin of error 3%:",
    "prompt_ar": "رتّب خطوات حساب وتفسير فترة الثقة من تقدير استطلاع رأي بنسبة 54% بهامش خطأ 3%:",
    "items": [
      "Identify the point estimate from the sample: \\(\\hat{p} = 54\\%\\).",
      "Identify the reported margin of error: \\(MOE = 3\\%\\).",
      "Subtract the margin of error for the lower bound: \\(54\\% - 3\\% = 51\\%\\).",
      "Add the margin of error for the upper bound: \\(54\\% + 3\\% = 57\\%\\).",
      "Conclude that the plausible interval for the TRUE population percentage is \\([51\\%, 57\\%]\\)."
    ],
    "items_ar": [
      "تحديد التقدير النقطي للعينة: \\(\\hat{p} = 54\\%\\).",
      "تحديد هامش الخطأ المذكور: \\(MOE = 3\\%\\).",
      "طرح هامش الخطأ للحد الأدنى: \\(54\\% - 3\\% = 51\\%\\).",
      "إضافة هامش الخطأ للحد الأعلى: \\(54\\% + 3\\% = 57\\%\\).",
      "الاستنتاج أن الفترة المعقولة لنسبة المجتمع الحقيقية هي \\([51\\%, 57\\%]\\)."
    ],
    "ex": "The margin of error interval [estimate - MOE, estimate + MOE] bounds the true population proportion.",
    "ex_ar": "فترة هامش الخطأ [التقدير - الهامش، التقدير + الهامش] تحدد نسبة المجتمع الحقيقية."
  },
  {
    "t": "sr",
    "ti": "Worked Example: Interpreting Margin of Error",
    "ti_ar": "مثال محلول: تفسير هامش الخطأ",
    "steps": [
      "A survey estimates 45% support with margin of error 3%. Interval: \\(45\\%\\pm3\\%\\), giving \\([42\\%,48\\%]\\).",
      "This interval is the best estimate range for the TRUE population percentage — not the sample percentage (which we already know is exactly 45%).",
      "A smaller margin of error means more precision, usually from a larger sample size."
    ],
    "steps_ar": [
      "يقدّر استطلاع نسبة التأييد بـ 45% بهامش خطأ 3%. الفترة: \\(45\\%\\pm3\\%\\)، أي \\([42\\%,48\\%]\\).",
      "هذه الفترة هي النطاق التقديري لنسبة المجتمع الحقيقية — وليست نسبة العينة (المعروف أنها 45% بالضبط).",
      "هامش الخطأ الأصغر يعني دقة أعلى، وينتج عادةً من عينة أكبر."
    ]
  },
  {
    "t": "qc",
    "ti": "Quick Check: Margin of Error",
    "ti_ar": "فحص سريع: هامش الخطأ",
    "q": "Which factor most reduces margin of error?",
    "q_ar": "أي عامل يقلل هامش الخطأ أكثر؟",
    "o": [
      "Larger sample size",
      "Smaller sample size",
      "Higher confidence level",
      "Fewer survey questions"
    ],
    "o_ar": [
      "حجم عينة أكبر",
      "حجم عينة أصغر",
      "مستوى ثقة أعلى",
      "أسئلة استطلاع أقل"
    ],
    "a": 0,
    "ex": "Larger samples give more precise (smaller margin of error) estimates.",
    "ex_ar": "العينات الأكبر تعطي تقديرات أكثر دقة (هامش خطأ أصغر)."
  },
  {
    "t": "tf",
    "ti": "True or False: Sampling & Statistical Inference",
    "ti_ar": "صحيح أم خطأ: المعاينة والاستدلال الإحصائي",
    "items": [
      {
        "s": "A random sample from a population allows generalisation to the entire population.",
        "a": true,
        "ex": "Random sampling prevents selection bias and allows inference to the target population."
      },
      {
        "s": "An observational study can establish that variable X causes variable Y.",
        "a": false,
        "ex": "Observational studies show correlation, not causation. Only randomized controlled experiments can establish causation."
      },
      {
        "s": "Increasing sample size decreases margin of error and narrows confidence intervals.",
        "a": true,
        "ex": "Margin of error is inversely proportional to √n."
      },
      {
        "s": "A 95% confidence interval means 95% of individual values in the population fall in that range.",
        "a": false,
        "ex": "It means 95% confidence that the population parameter falls in that interval, not individual data points."
      }
    ],
    "items_ar": [
      {
        "s": "العينة العشوائية من المجتمع تتيح تعميم النتائج على المجتمع بأكمله.",
        "a": true,
        "ex": "المعاينة العشوائية تمنع التحيز وتسمح بالاستدلال على المجتمع المستهدف."
      },
      {
        "s": "الدراسة القائمة على الملاحظة كافية لإثبات أن المتغير X يسبب المتغير Y.",
        "a": false,
        "ex": "الدراسات القائمة على الملاحظة تبيّن الارتباط فقط وليس السببية. التجارب العشوائية المضبوطة وحدها تثبت السببية."
      },
      {
        "s": "زيادة حجم العينة تقلل هامش الخطأ وتضيّق فترات الثقة.",
        "a": true,
        "ex": "هامش الخطأ يتناسب عكسيًا مع الجذر التربيعي لحجم العينة."
      },
      {
        "s": "فترة ثقة 95% تعني أن 95% من قيم أفراد المجتمع تقع داخل تلك الفترة.",
        "a": false,
        "ex": "تعني أننا واثقون بنسبة 95% أن مَعْلمة المجتمع (المتوسط أو النسبة) تقع في الفترة، وليس كل قيمة فردية."
      }
    ]
  },
  {
    "t": "se",
    "ti": "Spot the Error: Variance of Difference of Independent Variables (One-Variable Statistics, Distributions & Margin of Error)",
    "ti_ar": "اكتشف الخطأ: تباين الفرق بين متغيرين عشوائيين مستقلين (إحصاء المتغير الواحد والتوزيعات وهامش الخطأ)",
    "q": "Independent random variables \\(X\\) and \\(Y\\) have \\(\\operatorname{Var}(X) = 6\\) and \\(\\operatorname{Var}(Y) = 3\\). A student computes \\(\\operatorname{Var}(X - Y)\\). Which step is invalid?",
    "q_ar": "متغيران عشوائيان مستقلان \\(X\\) و\\(Y\\) تبايناهما \\(\\operatorname{Var}(X) = 6\\) و\\(\\operatorname{Var}(Y) = 3\\). يحسب طالب \\(\\operatorname{Var}(X - Y)\\). أي خطوة خاطئة؟",
    "steps": [
      "Verify that \\(X\\) and \\(Y\\) are statistically independent (\\(\\operatorname{Cov}(X,Y) = 0\\)).",
      "Subtract the variances directly: \\(\\operatorname{Var}(X - Y) = 6 - 3 = 3\\).",
      "Take square root for standard deviation."
    ],
    "steps_ar": [
      "التحقق من استقلال \\(X\\) و\\(Y\\) إحصائياً.",
      "طرح التباينين مباشرة: \\(\\operatorname{Var}(X - Y) = 6 - 3 = 3\\).",
      "أخذ الجذر التربيعي لإيجاد الانحراف المعياري."
    ],
    "errorStep": 2,
    "reasons": [
      "Because coefficients square in variance, \\(\\operatorname{Var}(X - Y) = 1^2\\operatorname{Var}(X) + (-1)^2\\operatorname{Var}(Y) = 6 + 3 = 9\\) — independent variances ALWAYS add.",
      "\\(\\operatorname{Var}(X - Y)\\) equals \\(\\operatorname{Var}(X) \\cdot \\operatorname{Var}(Y)\\).",
      "Expected values cannot be subtracted."
    ],
    "reasons_ar": [
      "لأن المعاملات تُربَّع في التباين: \\(\\operatorname{Var}(X - Y) = \\operatorname{Var}(X) + (-1)^2\\operatorname{Var}(Y) = 9\\) — التباينات المستقلة تُجمع دائماً.",
      "التباين يساوي حاصل ضرب التباينين.",
      "لا يجوز طرح التوقعات الرياضية."
    ],
    "correctReason": 0
  },
  {
    "t": "ms",
    "ti": "Examiner Mode: Standard Error, Variance & Conditional Probability (One-Variable Statistics, Distributions & Margin of Error)",
    "ti_ar": "وضع المصحح: الخطأ المعياري والتباين والاحتمال الشرطي (إحصاء المتغير الواحد والتوزيعات وهامش الخطأ)",
    "q": "(a) A population has standard deviation \\(\\sigma = 12\\). For a simple random sample of size \\(n = 16\\), find the standard error \\(\\sigma_{\\bar{x}}\\) and state what happens to \\(\\sigma_{\\bar{x}}\\) if \\(n\\) quadruples. (b) Independent \\(X, Y\\) have \\(\\operatorname{Var}(X) = 6,\\; \\operatorname{Var}(Y) = 3\\); compute \\(\\operatorname{Var}(2X - Y)\\).",
    "q_ar": "(أ) مجتمع انحرافه المعياري \\(\\sigma = 12\\). لعينة عشوائية حجمها \\(n = 16\\)، احسب الخطأ المعياري \\(\\sigma_{\\bar{x}}\\) واذكر ماذا يحدث له عند مضاعفة \\(n\\) أربع مرات. (ب) للمتغيرين المستقلين \\(X, Y\\) حيث \\(\\operatorname{Var}(X) = 6,\\; \\operatorname{Var}(Y) = 3\\)، احسب \\(\\operatorname{Var}(2X - Y)\\).",
    "parts": [
      {
        "label": "Part (a) — Sampling Distribution Standard Error",
        "marks": 2,
        "rubric": [
          {
            "code": "A1",
            "marks": 1,
            "text": "\\(\\sigma_{\\bar{x}} = \\dfrac{\\sigma}{\\sqrt{n}} = \\dfrac{12}{\\sqrt{16}} = \\dfrac{12}{4} = 3\\)."
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
            "text": "\\(4(6) + 3 = 27\\)."
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
            "text": "\\(\\sigma_{\\bar{x}} = \\dfrac{12}{\\sqrt{16}} = 3\\)."
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
            "text": "الناتج: \\(4(6) + 3 = 27\\)."
          }
        ]
      }
    ]
  },
  {
    "t": "sb",
    "ti": "Step Builder: Standard Error & Independent Variance (One-Variable Statistics, Distributions & Margin of Error)",
    "ti_ar": "بناء الخطوات: الخطأ المعياري وتباين المتغيرات المستقلة (إحصاء المتغير الواحد والتوزيعات وهامش الخطأ)",
    "steps": [
      {
        "l": "Compute \\(\\sqrt{n}\\) for sample size \\(n = 16\\):",
        "a": "4",
        "h": "Square root of 16."
      },
      {
        "l": "Find standard error \\(\\sigma / \\sqrt{n}\\) when \\(\\sigma = 12\\):",
        "a": "3",
        "h": "Divide 12 by 4."
      },
      {
        "l": "For independent \\(\\operatorname{Var}(X) = 6,\\; \\operatorname{Var}(Y) = 3\\), find \\(\\operatorname{Var}(X - Y) =\\)",
        "a": "9",
        "h": "Add 6 + 3."
      }
    ],
    "steps_ar": [
      {
        "l": "احسب \\(\\sqrt{n}\\) لحجم العينة \\(n = 16\\):",
        "a": "4",
        "h": "الجذر التربيعي للعدد 16."
      },
      {
        "l": "أوجد الخطأ المعياري \\(\\sigma / \\sqrt{n}\\) عندما \\(\\sigma = 12\\):",
        "a": "3",
        "h": "اقسم 12 على 4."
      },
      {
        "l": "للمتغيرين المستقلين \\(\\operatorname{Var}(X) = 6,\\; \\operatorname{Var}(Y) = 3\\)، احسب \\(\\operatorname{Var}(X - Y) =\\)",
        "a": "9",
        "h": "اجمع 6 + 3."
      }
    ]
  },
  {
    "t": "mt",
    "ti": "Matching: Probability, Distributions & Inference Rules (One-Variable Statistics, Distributions & Margin of Error)",
    "ti_ar": "مطابقة: قوانين الاحتمالات والتوزيعات والاستدلال (إحصاء المتغير الواحد والتوزيعات وهامش الخطأ)",
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
D["sat-condprob"] = [
  {
    "t": "num",
    "ti": "Numeric Entry: Probability of Independent Events",
    "ti_ar": "إدخال رقمي: احتمال الحوادث المستقلة",
    "q": "Events A and B are independent with \\(P(A) = 0.4\\) and \\(P(B) = 0.5\\). What is \\(P(A \\text{ and } B)\\)?",
    "q_ar": "الحدثان A و B مستقلان حيث \\(P(A) = 0.4\\) و \\(P(B) = 0.5\\). ما قيمة \\(P(A \\text{ and } B)\\)؟",
    "a": 0.2,
    "ex": "For independent events, \\(P(A \\cap B) = P(A) \\times P(B) = 0.4 \\times 0.5 = 0.2\\).",
    "ex_ar": "في الحوادث المستقلة، \\(P(A \\cap B) = P(A) \\times P(B) = 0.4 \\times 0.5 = 0.2\\)."
  },
  {
    "t": "ord",
    "ti": "Order the Steps: Computing Conditional Probability from a Table",
    "ti_ar": "ترتيب الخطوات: حساب الاحتمال المشروط من جدول",
    "prompt": "Arrange the steps to compute \\(P(\\text{Junior} \\mid \\text{Pass})\\) from a two-way table:",
    "prompt_ar": "رتّب خطوات حساب \\(P(\\text{Junior} \\mid \\text{Pass})\\) من جدول التوافق المزدوج:",
    "items": [
      "Identify the given condition: restrict attention only to the column or row for \"Pass\".",
      "Find the total count for the condition: \\(\\text{Total Pass}\\) serves as the denominator.",
      "Find the joint count: number of students who are BOTH \"Junior\" and \"Pass\" for the numerator.",
      "Divide: \\(P = \\frac{\\text{Junior and Pass}}{\\text{Total Pass}}\\)."
    ],
    "items_ar": [
      "تحديد الشرط المعطى: حصر الانتباه في عمود أو صف \"Pass\" فقط.",
      "إيجاد المجموع الكلي للشرط: يصبح \\(\\text{Total Pass}\\) هو المقام.",
      "إيجاد العدد المشترك: عدد الطلاب الذين يجمعون بين \"Junior\" و \"Pass\" ليكون البسط.",
      "القسمة: \\(P = \\frac{\\text{Junior and Pass}}{\\text{Total Pass}}\\)."
    ],
    "ex": "Restrict to the condition subtotal for the denominator, count matching individuals for the numerator, and divide.",
    "ex_ar": "احصر المقام في المجموع الفرعي للشرط، وضع في البسط عدد الحالات المطابقة، واقسم."
  },
  {
    "t": "cat",
    "ti": "Categorize: Probability Rules & Conditions",
    "ti_ar": "تصنيف: قواعد وشروط الاحتمالات",
    "categories": [
      "Multiplication Rule (Independent)",
      "Addition Rule (General)",
      "Complement Rule"
    ],
    "categories_ar": [
      "قاعدة الضرب (للمستقلة)",
      "قاعدة الجمع (العامة)",
      "قاعدة المتممة"
    ],
    "items": [
      {
        "s": "\\(P(A \\cap B) = P(A) \\times P(B)\\)",
        "cat": 0
      },
      {
        "s": "\\(P(A \\cup B) = P(A) + P(B) - P(A \\cap B)\\)",
        "cat": 1
      },
      {
        "s": "\\(P(\\text{at least one}) = 1 - P(\\text{none})\\)",
        "cat": 2
      },
      {
        "s": "Rolling two 6s on consecutive die rolls: \\(1/6 \\times 1/6\\)",
        "cat": 0
      },
      {
        "s": "Probability of event not occurring: \\(1 - P(A)\\)",
        "cat": 2
      }
    ],
    "items_ar": [
      {
        "s": "\\(P(A \\cap B) = P(A) \\times P(B)\\)",
        "cat": 0
      },
      {
        "s": "\\(P(A \\cup B) = P(A) + P(B) - P(A \\cap B)\\)",
        "cat": 1
      },
      {
        "s": "\\(P(\\text{at least one}) = 1 - P(\\text{none})\\)",
        "cat": 2
      },
      {
        "s": "الحصول على العدد 6 مرتين متتاليتين في رمي النرد: \\(1/6 \\times 1/6\\)",
        "cat": 0
      },
      {
        "s": "احتمال عدم وقوع الحدث: \\(1 - P(A)\\)",
        "cat": 2
      }
    ],
    "ex": "Independent events multiply probabilities; inclusive unions subtract the overlap; complement rules simplify at-least-one computations.",
    "ex_ar": "الحوادث المستقلة تُضرب احتمالاتها؛ والاتحاد يطرح التقاطع؛ وقاعدة المتممة تسهّل حساب احتمالات \"على الأقل واحد\"."
  },
  {
    "t": "sr",
    "ti": "Worked Example: Conditional Probability from a Table",
    "ti_ar": "مثال محلول: الاحتمال المشروط من جدول",
    "steps": [
      "60 people like tea; of those, 25 also like coffee. Find \\(P(\\text{coffee}\\mid\\text{tea})\\). Formula: \\(P(\\text{coffee}\\mid\\text{tea})=\\dfrac{\\text{both}}{\\text{tea total}}\\).",
      "Substitute: \\(\\dfrac{25}{60}\\).",
      "Simplify: \\(\\dfrac{25}{60}=\\dfrac{5}{12}\\approx0.417\\)."
    ],
    "steps_ar": [
      "60 شخصًا يفضلون الشاي؛ ومنهم 25 يفضلون القهوة أيضًا. أوجد \\(P(\\text{coffee}\\mid\\text{tea})\\). القانون: \\(P(\\text{coffee}\\mid\\text{tea})=\\dfrac{\\text{كلاهما}}{\\text{إجمالي الشاي}}\\).",
      "بالتعويض: \\(\\dfrac{25}{60}\\).",
      "بالتبسيط: \\(\\dfrac{25}{60}=\\dfrac{5}{12}\\approx0.417\\)."
    ]
  },
  {
    "t": "qc",
    "ti": "Quick Check: Conditional Probability",
    "ti_ar": "فحص سريع: الاحتمال المشروط",
    "q": "\\(P(A\\mid B)\\) is defined as:",
    "q_ar": "\\(P(A\\mid B)\\) يُعرّف بـ:",
    "o": [
      "\\(P(A\\cap B)/P(B)\\)",
      "\\(P(A\\cap B)/P(A)\\)",
      "\\(P(A)+P(B)\\)",
      "\\(P(A)\\times P(B)\\)"
    ],
    "o_ar": [
      "\\(P(A\\cap B)/P(B)\\)",
      "\\(P(A\\cap B)/P(A)\\)",
      "\\(P(A)+P(B)\\)",
      "\\(P(A)\\times P(B)\\)"
    ],
    "a": 0,
    "ex": "Conditional probability: \\(P(A\\mid B)=\\dfrac{P(A\\cap B)}{P(B)}\\).",
    "ex_ar": "الاحتمال المشروط: \\(P(A\\mid B)=\\dfrac{P(A\\cap B)}{P(B)}\\)."
  },
  {
    "t": "sb",
    "ti": "Step Builder: Two-Way Table Conditional Probability",
    "ti_ar": "باني الخطوات: الاحتمال المشروط من جدول التكرار المزدوج",
    "steps": [
      {
        "l": "Given 30 freshmen (12 sports, 18 none) and 50 sophomores (20 sports, 30 none). Total playing sports: \\(12 + 20 =\\)",
        "a": "32",
        "h": "Perform the calculation in \\(12 + 20\\) to find the result."
      },
      {
        "l": "Freshmen who play sports: \\(n =\\)",
        "a": "12",
        "h": "Read the count of freshmen who play sports directly from the prompt."
      },
      {
        "l": "\\(P(\\text{freshman} \\mid \\text{sports}) = \\frac{12}{32} = \\frac{3}{?}\\)",
        "a": "8",
        "h": "Perform the calculation in \\(P(\\text{freshman} \\mid \\text{sports}) = \\frac{12}{32} = \\frac{3}{?}\\) to find the result."
      },
      {
        "l": "As a decimal, \\(3 \\div 8 =\\)",
        "a": "0.375",
        "h": "Perform the calculation in \\(3 \\div 8\\) to find the result."
      }
    ],
    "steps_ar": [
      {
        "l": "في استطلاع شمل 30 طالب مستجد (12 رياضي، 18 غير رياضي) و50 طالب سنة ثانية (20 رياضي، 30 غير رياضي). إجمالي الرياضيين: \\(12 + 20 =\\)",
        "a": "32",
        "h": "أجرِ العملية الحسابية في المقدار \\(12 + 20\\) للوصول إلى النتيجة."
      },
      {
        "l": "الطلاب المستجدون الرياضيون: \\(n =\\)",
        "a": "12",
        "h": "استخرج عدد الطلاب المستجدين الرياضيين مباشرة من نص المسألة."
      },
      {
        "l": "\\(P(\\text{مستجد} \\mid \\text{رياضي}) = \\frac{12}{32} = \\frac{3}{?}\\)",
        "a": "8",
        "h": "أجرِ العملية الحسابية في المقدار \\(P(\\text{مستجد} \\mid \\text{رياضي}) = \\frac{12}{32} = \\frac{3}{?}\\) للوصول إلى النتيجة."
      },
      {
        "l": "بالصيغة العشرية، \\(3 \\div 8 =\\)",
        "a": "0.375",
        "h": "أجرِ العملية الحسابية في المقدار \\(3 \\div 8\\) للوصول إلى النتيجة."
      }
    ]
  },
  {
    "t": "se",
    "ti": "Spot the Error: Treating Without-Replacement Draws as Independent",
    "ti_ar": "اكتشف الخطأ: افتراض الاستقلال عند السحب بدون إرجاع",
    "q": "A bag contains \\(5\\) red and \\(3\\) blue marbles (\\(8\\) total). Two marbles are drawn WITHOUT replacement. A student computes \\(P(\\text{both red})\\). Which step is wrong?",
    "q_ar": "يحتوي كيس على \\(5\\) كرات حمراء و\\(3\\) زرقاء (المجموع \\(8\\)). سُحبت كرتان بدون إرجاع لحساب \\(P(\\text{حمراوان})\\). أي خطوة خاطئة؟",
    "steps": [
      "Find the probability the first marble is red: \\(P(R_1) = \\dfrac{5}{8}\\).",
      "Assume the second draw has the same denominator and numerator: \\(P(R_2 \\mid R_1) = \\dfrac{5}{8}\\).",
      "Multiply \\(\\dfrac{5}{8} \\times \\dfrac{5}{8} = \\dfrac{25}{64}\\).",
      "Report \\(\\dfrac{25}{64}\\) as the without-replacement probability."
    ],
    "steps_ar": [
      "حساب احتمال أن تكون الكرة الأولى حمراء: \\(P(R_1) = \\dfrac{5}{8}\\).",
      "افتراض بقاء البسط والمقام كما هما في السحبة الثانية: \\(P(R_2 \\mid R_1) = \\dfrac{5}{8}\\).",
      "ضرب \\(\\dfrac{5}{8} \\times \\dfrac{5}{8} = \\dfrac{25}{64}\\).",
      "كتابة الناتج \\(\\dfrac{25}{64}\\)."
    ],
    "errorStep": 2,
    "reasons": [
      "Without replacement, after drawing one red marble only \\(4\\) red marbles remain out of \\(7\\), so \\(P(R_2 \\mid R_1) = \\dfrac{4}{7}\\) and \\(P(R_1 \\cap R_2) = \\dfrac{5}{8} \\cdot \\dfrac{4}{7} = \\dfrac{5}{14}\\).",
      "Probabilities on consecutive branches of a tree diagram should be added, not multiplied.",
      "Without replacement reduces the denominator to \\(7\\) while keeping \\(5\\) red marbles."
    ],
    "reasons_ar": [
      "بدون إرجاع يتبقى \\(4\\) كرات حمراء من أصل \\(7\\)، لذا \\(P(R_2 \\mid R_1) = \\dfrac{4}{7}\\) ويكون الاحتمال \\(\\dfrac{5}{8} \\times \\dfrac{4}{7} = \\dfrac{5}{14}\\).",
      "تُجمع احتمالات الفروع المتتالية في الشجرة ولا تُضرب.",
      "ينقص المقام إلى \\(7\\) مع بقاء \\(5\\) كرات حمراء."
    ],
    "correctReason": 0
  },
  {
    "t": "ms",
    "ti": "Examiner Mode: Tree Diagrams Without Replacement & Two-Way Conditional Probability",
    "ti_ar": "وضع المصحح: الشجرة الاحتمالية بدون إرجاع والاحتمال الشرطي",
    "q": "(a) A box holds \\(6\\) green and \\(4\\) yellow counters. Two are chosen at random without replacement; find \\(P(\\text{one of each color})\\). (b) Events \\(A, B\\) satisfy \\(P(A) = 0.5\\), \\(P(B) = 0.4\\), and \\(P(A \\cup B) = 0.7\\); find \\(P(A \\mid B)\\) and test independence.",
    "q_ar": "(أ) صندوق به \\(6\\) أقراص خضراء و\\(4\\) صفراء. سُحب قرصان بدون إرجاع؛ أوجد احتمال اختلاف اللونين. (ب) إذا كان \\(P(A)=0.5\\) و\\(P(B)=0.4\\) و\\(P(A \\cup B)=0.7\\)، فأوجد \\(P(A \\mid B)\\) واختبر الاستقلال.",
    "parts": [
      {
        "label": "Part (a) — Both Mutually Exclusive Orderings (GY + YG)",
        "marks": 3,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "Compute \\(P(G_1 \\cap Y_2) = \\dfrac{6}{10} \\times \\dfrac{4}{9} = \\dfrac{24}{90}\\)."
          },
          {
            "code": "M1",
            "marks": 1,
            "text": "Include reverse order \\(P(Y_1 \\cap G_2) = \\dfrac{4}{10} \\times \\dfrac{6}{9} = \\dfrac{24}{90}\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "Add disjoint paths: \\(\\dfrac{48}{90} = \\dfrac{8}{15}\\)."
          }
        ]
      },
      {
        "label": "Part (b) — Conditional Probability & Independence Check",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "Find \\(P(A \\cap B) = 0.5 + 0.4 - 0.7 = 0.20\\), so \\(P(A \\mid B) = \\dfrac{0.20}{0.40} = 0.50\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "Since \\(P(A \\mid B) = 0.50 = P(A)\\) (equivalently \\(P(A)P(B) = 0.20\\)), \\(A\\) and \\(B\\) ARE independent."
          }
        ]
      }
    ],
    "parts_ar": [
      {
        "label": "الجزء (أ) — جمع المسارين المتنافيين (أخضر ثم أصفر + أصفر ثم أخضر)",
        "marks": 3,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "حساب \\(P(G_1 \\cap Y_2) = \\dfrac{6}{10} \\times \\dfrac{4}{9} = \\dfrac{24}{90}\\)."
          },
          {
            "code": "M1",
            "marks": 1,
            "text": "إضافة الترتيب العكسي \\(P(Y_1 \\cap G_2) = \\dfrac{24}{90}\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "المجموع \\(\\dfrac{48}{90} = \\dfrac{8}{15}\\)."
          }
        ]
      },
      {
        "label": "الجزء (ب) — الاحتمال الشرطي واختبار الاستقلال",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "حساب \\(P(A \\cap B) = 0.20\\) ومنه \\(P(A \\mid B) = \\dfrac{0.20}{0.40} = 0.50\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "بما أن \\(P(A \\mid B) = P(A) = 0.50\\)، فالحدثان مستقلان."
          }
        ]
      }
    ]
  },
  {
    "t": "mt",
    "ti": "Matching: Addition Rule, Conditional Probability, Independence & Counting",
    "ti_ar": "مطابقة: قواعد الجمع والاحتمال الشرطي والاستقلال وطرق العد",
    "p": [
      {
        "l": "General Addition Rule for \\(P(A \\cup B)\\)",
        "r": "\\(P(A) + P(B) - P(A \\cap B)\\)"
      },
      {
        "l": "Conditional probability \\(P(A \\mid B)\\)",
        "r": "\\(\\dfrac{P(A \\cap B)}{P(B)}\\) for \\(P(B) > 0\\)"
      },
      {
        "l": "Criterion for independent events \\(A, B\\)",
        "r": "\\(P(A \\cap B) = P(A)\\cdot P(B)\\)"
      },
      {
        "l": "Probability of \"at least one success\"",
        "r": "\\(1 - P(\\text{zero successes})\\)"
      }
    ],
    "p_ar": [
      {
        "l": "قاعدة الجمع العامة \\(P(A \\cup B)\\)",
        "r": "\\(P(A) + P(B) - P(A \\cap B)\\)"
      },
      {
        "l": "الاحتمال الشرطي \\(P(A \\mid B)\\)",
        "r": "\\(\\dfrac{P(A \\cap B)}{P(B)}\\) بشرط \\(P(B) > 0\\)"
      },
      {
        "l": "شرط استقلال الحدثين \\(A, B\\)",
        "r": "\\(P(A \\cap B) = P(A)\\cdot P(B)\\)"
      },
      {
        "l": "احتمال نجاح واحد على الأقل",
        "r": "\\(1 - P(\\text{عدم تحقق أي نجاح})\\)"
      }
    ]
  }
];
});
