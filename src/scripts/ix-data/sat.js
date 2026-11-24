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
      "مراجعة جميع الأسئلة المؤشّرة للمراجعة قبل انتهاء الوقت المخصص للنموذج النشط."
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
    "ti": "Spot the Error: Exam Pacing & Module Time Allocation (Digital SAT Adaptive Format)",
    "ti_ar": "اكتشف الخطأ: إدارة الوقت وتوزيع الدقائق (هيكل SAT الرقمي التكيفي)",
    "q": "A student plans their timing for a single 22-question, 35-minute Digital SAT Math module. Which step in their strategy introduces a flaw?",
    "q_ar": "يخطط طالب لتوزيع وقته في نموذج واحد للرياضيات في SAT الرقمي مكون من 22 سؤالاً خلال 35 دقيقة. أي خطوة تتضمن خللاً؟",
    "steps": [
      "Compute the average budget per question: \\(\\frac{35 \\times 60}{22} \\approx 95\\) seconds.",
      "Solve straightforward Pass 1 items in roughly \\(65\\) seconds each to bank extra time.",
      "Spend \\(10\\) minutes stuck on one hard question before reading the remaining \\(8\\) items.",
      "Use the last \\(3\\) minutes to review flagged items and enter a response for every blank."
    ],
    "steps_ar": [
      "حساب متوسط الزمن لكل سؤال: \\(\\frac{35 \\times 60}{22} \\approx 95\\) ثانية.",
      "حل أسئلة الجولة الأولى المباشرة خلال نحو \\(65\\) ثانية لتوفير وقت إضافي.",
      "قضاء \\(10\\) دقائق متواصلة على سؤال صعب واحد قبل قراءة بقية الأسئلة (8 أسئلة).",
      "استخدام الدقائق الثلاث الأخيرة لمراجعة الأسئلة المؤشرة والتأكد من عدم ترك فراغات."
    ],
    "errorStep": 3,
    "reasons": [
      "Spending 10 minutes on one question risks missing several accessible equal-weight questions later in the module; hard questions should be flagged for Pass 2.",
      "Average time per question is computed by dividing questions by minutes.",
      "On the Digital SAT you lose points for incorrect guesses, so blanks are best."
    ],
    "reasons_ar": [
      "قضاء 10 دقائق في سؤال واحد يضيع أسئلة سهلة لاحقاً لها نفس الوزن؛ يجب تأشير السؤال الصعب والعودة إليه في الجولة الثانية.",
      "يُحسب متوسط الزمن بقسمة عدد الأسئلة على الدقائق.",
      "يوجد خصم على الإجابات الخاطئة في اختبار SAT الرقمي لذا يُفضّل ترك فراغات."
    ],
    "correctReason": 0
  },
  {
    "t": "ms",
    "ti": "Examiner Mode: Module Time Budget & Two-Pass Review (Digital SAT Adaptive Format)",
    "ti_ar": "وضع المصحح: ميزانية وقت النموذج والمراجعة على مرحلتين (هيكل SAT الرقمي)",
    "q": "A Digital SAT Math module has \\(22\\) equal-weight questions in \\(35\\) minutes with no guessing penalty. A student solves \\(19\\) cleanly on Pass 1–2. (a) Find total seconds in the module and raw accuracy percentage to the nearest integer. (b) State the optimal rule for the remaining \\(3\\) flagged items.",
    "q_ar": "يحتوي نموذج الرياضيات في SAT الرقمي على \\(22\\) سؤالاً متساوية الوزن في \\(35\\) دقيقة دون خصم على التخمين. حلّ طالب \\(19\\) سؤالاً بدقة. (أ) أوجد إجمالي الثواني في النموذج ونسبة الدقة لأقرب عدد صحيح. (ب) اذكر القاعدة المثلى للأسئلة الثلاثة المؤشرة.",
    "parts": [
      {
        "label": "Part (a) — Total Seconds & Raw Accuracy",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "Total time: \\(35 \\times 60 = 2100\\text{ s}\\) (\\(\\approx 95\\text{ s/question}\\))."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "Accuracy: \\(\\frac{19}{22} \\times 100\\% \\approx 86\\%\\)."
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
            "text": "Check Desmos intersection/table or test sign/size constraints to eliminate impossible choices."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "Ensure every one of the \\(3\\) items has an entered answer before time expires."
          }
        ]
      }
    ],
    "parts_ar": [
      {
        "label": "الجزء (أ) — إجمالي الثواني ونسبة الدقة",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "إجمالي الوقت: \\(35 \\times 60 = 2100\\) ثانية (نحو \\(95\\) ثانية للسؤال)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "الدقة: \\(\\frac{19}{22} \\times 100\\% \\approx 86\\%\\)."
          }
        ]
      },
      {
        "label": "الجزء (ب) — الاستبعاد وعدم ترك فراغات",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "استخدام ديسموس أو فحص الإشارة والحجم لاستبعاد البدائل المستحيلة."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "التأكد من إدخال إجابة لكل سؤال من الأسئلة الثلاثة قبل انتهاء الوقت."
          }
        ]
      }
    ]
  },
  {
    "t": "sb",
    "ti": "Step Builder: Digital SAT Two-Module Time & Item Budget",
    "ti_ar": "بناء الخطوات: حساب ميزانية الوقت والأسئلة في SAT الرقمي",
    "steps": [
      {
        "l": "Convert a \\(35\\)-minute math module into seconds:",
        "a": "2100",
        "h": "Multiply 35 by 60."
      },
      {
        "l": "Total questions across both adaptive math modules (\\(22\\) each):",
        "a": "44",
        "h": "Add 22 + 22."
      },
      {
        "l": "If \\(19\\) of \\(22\\) items in Module 1 are complete, how many remain flagged?",
        "a": "3",
        "h": "Subtract 19 from 22."
      }
    ],
    "steps_ar": [
      {
        "l": "حوّل مدة النموذج (\\(35\\) دقيقة) إلى ثوانٍ:",
        "a": "2100",
        "h": "اضرب 35 في 60."
      },
      {
        "l": "إجمالي الأسئلة في النموذجين التكيفيين (\\(22\\) في كل نموذج):",
        "a": "44",
        "h": "اجمع 22 + 22."
      },
      {
        "l": "إذا أُنجز \\(19\\) من أصل \\(22\\) سؤالاً في النموذج الأول، فكم سؤالاً يتبقى للمراجعة؟",
        "a": "3",
        "h": "اطرح 19 من 22."
      }
    ]
  },
  {
    "t": "qc",
    "ti": "Quick Check: Two-Pass Exam Triage (Digital SAT Adaptive Format)",
    "ti_ar": "فحص سريع: استراتيجية الجولتين في SAT الرقمي",
    "q": "During a 22-question, 35-minute Digital SAT Math module (no guessing penalty), what is the best action if one item still resists solution after 2 minutes?",
    "q_ar": "خلال نموذج SAT الرقمي (22 سؤالاً في 35 دقيقة دون خصم على التخمين)، ما أفضل تصرف إذا استغرق سؤال أكثر من دقيقتين دون حل؟",
    "o": [
      "Enter a tentative best answer, flag the item for Pass 2, and move on to secure accessible marks",
      "Leave it blank and spend 6 more minutes re-deriving algebra from scratch",
      "Restart the module from Question 1",
      "Close Desmos for the rest of the test"
    ],
    "o_ar": [
      "إدخال أفضل إجابة مبدئية وتأشير السؤال للجولة الثانية والانتقال لحصد الدرجات السهلة",
      "تركه فارغاً وقضاء 6 دقائق إضافية في إعادة الاشتقاق من البداية",
      "إعادة قراءة النموذج من السؤال الأول",
      "إغلاق حاسبة ديسموس لبقية الاختبار"
    ],
    "a": 0,
    "ex": "Protecting the ~95 seconds/question pace across 22 questions avoids losing easy points near the end of the module.",
    "ex_ar": "الحفاظ على معدل ~95 ثانية للسؤال عبر 22 سؤالاً يحمي الدرجات السهلة في نهاية النموذج."
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
    "ti": "Spot the Error: No Solution vs. Infinitely Many Solutions in a System",
    "ti_ar": "اكتشف الخطأ: التمييز بين انعدام الحلول والحلول اللانهائية في النظام الخطي",
    "q": "For what value of \\(k\\) does the system \\(3x + ky = 8\\) and \\(6x + 15y = 12\\) have NO solution? A student evaluates \\(k\\); which step is flawed?",
    "q_ar": "لأي قيمة للثابت \\(k\\) لا يكون للنظام \\(3x + ky = 8\\) و\\(6x + 15y = 12\\) أي حل؟ أي خطوة في حل الطالب خاطئة؟",
    "steps": [
      "Match the coefficient ratios on the left: \\(\\frac{3}{6} = \\frac{k}{15}\\).",
      "Compare constants: \\(\\frac{8}{12} = \\frac{2}{3} \\neq \\frac{3}{6}\\).",
      "Conclude no value of \\(k\\) works because \\(\\frac{8}{12} \\neq \\frac{1}{2}\\).",
      "Set \\(k = 0\\) instead."
    ],
    "steps_ar": [
      "مطابقة نسب معاملات الطرف الأيسر: \\(\\frac{3}{6} = \\frac{k}{15}\\).",
      "مقارنة نسبة الثوابت: \\(\\frac{8}{12} = \\frac{2}{3} \\neq \\frac{3}{6}\\).",
      "استنتاج أنه لا توجد قيمة للثابت \\(k\\) لأن \\(\\frac{8}{12} \\neq \\frac{1}{2}\\).",
      "تعويض \\(k = 0\\) بدلاً من ذلك."
    ],
    "errorStep": 3,
    "reasons": [
      "Having \\(\\frac{a_1}{a_2} = \\frac{b_1}{b_2} \\neq \\frac{c_1}{c_2}\\) is the EXACT condition for parallel lines (NO solution), so \\(\\frac{k}{15} = \\frac{1}{2} \\implies k = 7.5\\) gives zero solutions.",
      "Infinitely many solutions require unequal ratios of constants.",
      "Systems have no solution only when \\(k = 15\\)."
    ],
    "reasons_ar": [
      "تحقق \\(\\frac{a_1}{a_2} = \\frac{b_1}{b_2} \\neq \\frac{c_1}{c_2}\\) هو بالضبط شرط المستقيمين المتوازيين (لا يوجد حل)، ومنه \\(k = 7.5\\).",
      "الحلول اللانهائية تتطلب عدم تساوي نسب الثوابت.",
      "لا يكون للنظام حل فقط عندما \\(k = 15\\)."
    ],
    "correctReason": 0
  },
  {
    "t": "ms",
    "ti": "Examiner Mode: Infinite-Solution Parameters & Target Combinations",
    "ti_ar": "وضع المصحح: ثوابت الحلول اللانهائية وتركيب العبارات في الأنظمة",
    "q": "(a) The system \\(4x - 6y = 10\\) and \\(kx + 9y = -15\\) has infinitely many solutions; find \\(k\\). (b) Given \\(7x + 2y = 31\\) and \\(3x + 8y = 19\\), find the exact value of \\(2x + 2y\\) without solving for \\(x\\) and \\(y\\) individually.",
    "q_ar": "(أ) النظام \\(4x - 6y = 10\\) و\\(kx + 9y = -15\\) له عدد لا نهائي من الحلول؛ أوجد \\(k\\). (ب) إذا كان \\(7x + 2y = 31\\) و\\(3x + 8y = 19\\)، فأوجد قيمة \\(2x + 2y\\) دون إيجاد \\(x\\) و\\(y\\) منفردين.",
    "parts": [
      {
        "label": "Part (a) — Equal Ratios Condition",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "Check constant-to-\\(y\\) ratio: \\(\\frac{9}{-6} = -\\frac{3}{2}\\) and \\(\\frac{-15}{10} = -\\frac{3}{2}\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "Multiply the first \\(x\\)-coefficient: \\(k = 4\\left(-\\frac{3}{2}\\right) = -6\\)."
          }
        ]
      },
      {
        "label": "Part (b) — Direct Equation Combination",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "Add both equations: \\((7x + 3x) + (2y + 8y) = 31 + 19 \\implies 10x + 10y = 50\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "Divide both sides by \\(5\\): \\(2x + 2y = 10\\)."
          }
        ]
      }
    ],
    "parts_ar": [
      {
        "label": "الجزء (أ) — شرط تساوي النسب الثلاث",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "نسبة معاملَي \\(y\\) والثابتين: \\(\\frac{9}{-6} = -\\frac{3}{2}\\) و\\(\\frac{-15}{10} = -\\frac{3}{2}\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "بالمثل \\(k = 4\\left(-\\frac{3}{2}\\right) = -6\\)."
          }
        ]
      },
      {
        "label": "الجزء (ب) — الجمع المباشر للمعادلتين",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "جمع المعادلتين: \\(10x + 10y = 50\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "بالقسمة على \\(5\\) نجد \\(2x + 2y = 10\\)."
          }
        ]
      }
    ]
  },
  {
    "t": "sb",
    "ti": "Step Builder: Direct Target Combination in a Linear System",
    "ti_ar": "بناء الخطوات: إيجاد عبارة مركبة مباشرة من نظام خطي",
    "steps": [
      {
        "l": "Add \\(5x + 2y = 21\\) and \\(x + 4y = 15\\) to evaluate \\(6x + 6y =\\)",
        "a": "36",
        "h": "Add 21 and 15."
      },
      {
        "l": "Divide by \\(2\\) to obtain \\(3x + 3y =\\)",
        "a": "18",
        "h": "Compute 36 / 2."
      },
      {
        "l": "Divide by \\(6\\) to isolate \\(x + y =\\)",
        "a": "6",
        "h": "Compute 36 / 6."
      }
    ],
    "steps_ar": [
      {
        "l": "اجمع \\(5x + 2y = 21\\) و\\(x + 4y = 15\\) لإيجاد \\(6x + 6y =\\)",
        "a": "36",
        "h": "اجمع 21 و15."
      },
      {
        "l": "اقسم على \\(2\\) لإيجاد \\(3x + 3y =\\)",
        "a": "18",
        "h": "احسب 36 ÷ 2."
      },
      {
        "l": "اقسم على \\(6\\) لإيجاد \\(x + y =\\)",
        "a": "6",
        "h": "احسب 36 ÷ 6."
      }
    ]
  },
  {
    "t": "gp",
    "ti": "Interactive Graph Plotter: Line Intercepts",
    "ti_ar": "مخطط الدوال التفاعلي: مقاطع المستقيم",
    "q": "Plot the x-intercept and y-intercept of the line \\(2x + 3y = 6\\) on the coordinate grid.",
    "q_ar": "عيّن المقطع السيني والمقطع الصادي للمستقيم \\(2x + 3y = 6\\) على الشبكة الإحداثية.",
    "xrange": [
      -5,
      5
    ],
    "yrange": [
      -5,
      5
    ],
    "targets": [
      {
        "label": "x-intercept (3, 0)",
        "label_ar": "المقطع السيني (3, 0)",
        "target": [
          3,
          0
        ],
        "tol": 0.45
      },
      {
        "label": "y-intercept (0, 2)",
        "label_ar": "المقطع الصادي (0, 2)",
        "target": [
          0,
          2
        ],
        "tol": 0.45
      }
    ],
    "sol": "Set \\(y=0\\) to get \\(2x=6 \\Rightarrow x=3\\), giving \\((3,0)\\). Set \\(x=0\\) to get \\(3y=6 \\Rightarrow y=2\\), giving \\((0,2)\\).",
    "sol_ar": "بوضع \\(y=0\\) نجد \\(2x=6 \\Rightarrow x=3\\) أي \\((3,0)\\)، وبوضع \\(x=0\\) نجد \\(3y=6 \\Rightarrow y=2\\) أي \\((0,2)\\)."
  },
  {
    "t": "gp",
    "ti": "Graph Plotter: Line Intercepts & Slope (Linear Equations in One Variable & Systems of Equations)",
    "ti_ar": "مخطط التمثيل البياني: المقاطع والميل (المعادلات الخطية وأنظمتها)",
    "q": "Plot the x-intercept and y-intercept of \\(2x + 3y = 6\\), plus the midpoint between them.",
    "q_ar": "عيّن المقطع السيني والمقطع الصادي للمستقيم \\(2x + 3y = 6\\)، بالإضافة إلى نقطة المنتصف بينهما.",
    "xrange": [
      -5,
      5
    ],
    "yrange": [
      -5,
      5
    ],
    "targets": [
      {
        "label": "x-intercept (3, 0)",
        "label_ar": "المقطع السيني (3, 0)",
        "target": [
          3,
          0
        ],
        "tol": 0.45
      },
      {
        "label": "y-intercept (0, 2)",
        "label_ar": "المقطع الصادي (0, 2)",
        "target": [
          0,
          2
        ],
        "tol": 0.45
      },
      {
        "label": "Midpoint (1.5, 1)",
        "label_ar": "نقطة المنتصف (1.5, 1)",
        "target": [
          1.5,
          1
        ],
        "tol": 0.5
      }
    ],
    "ex": "Set \\(y = 0\\) for the x-intercept and \\(x = 0\\) for the y-intercept, or substitute \\(x = 2\\) directly into the linear equation.",
    "ex_ar": "عوّض \\(y = 0\\) لإيجاد المقطع السيني و\\(x = 0\\) للمقطع الصادي، أو عوّض \\(x = 2\\) مباشرة في المعادلة الخطية."
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
    "ti": "Spot the Error: Perpendicular Slope & Inequality Sign (Linear Functions & Linear Inequalities)",
    "ti_ar": "اكتشف الخطأ: ميل المستقيم المتعامد وإشارة المتباينة (الدوال الخطية والمتباينات الخطية)",
    "q": "Given \\(A(4, 4)\\) and \\(B(6, 12)\\), a student finds the slope of the line perpendicular to \\(AB\\). Which step is wrong?",
    "q_ar": "مُعطى النقطتان \\(A(4, 4)\\) و\\(B(6, 12)\\)، يحسب طالب ميل العمودي على \\(AB\\). أي خطوة خاطئة؟",
    "steps": [
      "Compute slope of \\(AB\\): \\(m_{AB} = \\frac{12 - 4}{6 - 4} = \\frac{8}{2} = 4\\).",
      "Compute midpoint of \\(AB\\): \\(M = (5, 8)\\).",
      "Take the perpendicular slope as the positive reciprocal \\(m_{\\perp} = \\frac{1}{4}\\) without negating the sign.",
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
    "q": "Points \\(A(4, 4)\\) and \\(B(6, 12)\\) lie in the coordinate plane. (a) Find the equation of line \\(AB\\) in \\(y = mx + b\\) form. (b) Find the midpoint \\(M\\) and the slope of the perpendicular bisector of \\(AB\\).",
    "q_ar": "النقطتان \\(A(4, 4)\\) و\\(B(6, 12)\\) في المستوى الإحداثي. (أ) أوجد معادلة المستقيم \\(AB\\) بصيغة \\(y = mx + b\\). (ب) أوجد نقطة المنتصف \\(M\\) وميل العمود المنصّف للقطعة \\(AB\\).",
    "parts": [
      {
        "label": "Part (a) — Slope & Line Equation",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "Slope \\(m = \\frac{12 - 4}{6 - 4} = 4\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "y-Intercept \\(b = 4 - 4(4) = -12\\), giving \\(y = 4x - 12\\)."
          }
        ]
      },
      {
        "label": "Part (b) — Midpoint & Perpendicular Slope",
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
            "text": "Perpendicular slope \\(m_{\\perp} = -\\frac{1}{4}\\)."
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
            "text": "المقطع الصادي \\(b = -12\\)، والمعادلة \\(y = 4x - 12\\)."
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
        "l": "Find the \\(y\\)-intercept \\(b\\) in \\(y = mx + b\\): \\(c =\\)",
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
        "l": "أوجد المقطع الصادي \\(b\\) في \\(y = mx + b\\): \\(c =\\)",
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
  },
  {
    "t": "fn",
    "ti": "Explorer: Linear Slope & Intercept Shifts",
    "ti_ar": "مستكشف: الميل والمقطع الصادي للدالة الخطية",
    "fns": [
      {
        "expr": "M*x + B",
        "color": "#1E3A6E",
        "label": "f(x) = mx + b"
      }
    ],
    "xrange": [
      -5,
      5
    ],
    "yrange": [
      -6,
      8
    ],
    "params": [
      {
        "name": "M",
        "label": "Slope m",
        "label_ar": "الميل m",
        "min": -3,
        "max": 3,
        "step": 0.5,
        "default": 1.5
      },
      {
        "name": "B",
        "label": "y-Intercept b",
        "label_ar": "المقطع الصادي b",
        "min": -4,
        "max": 4,
        "step": 1,
        "default": 2
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
      "Zero Real Solutions"
    ],
    "categories_ar": [
      "جذران حقيقيان مختلفان",
      "جذر حقيقي واحد مكرر",
      "لا توجد حلول حقيقية"
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
    "ex": "Positive discriminant gives 2 distinct real solutions, zero gives 1 repeated real solution, and negative gives zero real solutions.",
    "ex_ar": "المميز الموجب يعطي حلين حقيقيين مختلفين، والصفر يعطي حلاً حقيقياً واحداً مكرراً، والسالب لا يعطي أي حلول حقيقية."
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
  },
  {
    "t": "fn",
    "ti": "Function Lab: Vertex Form Parabola \\(y = a(x - h)^2 + k\\)",
    "ti_ar": "مختبر الدوال: القطع المكافئ بصيغة الرأس \\(y = a(x - h)^2 + k\\)",
    "fns": [
      {
        "expr": "a*(x - h)^2 + k",
        "color": "#1E3A6E",
        "label": "a(x−h)² + k"
      }
    ],
    "xrange": [
      -6,
      6
    ],
    "yrange": [
      -6,
      8
    ],
    "params": [
      {
        "name": "a",
        "label": "Stretch a",
        "min": -2,
        "max": 2,
        "step": 0.5,
        "default": 1
      },
      {
        "name": "h",
        "label": "Vertex x (h)",
        "min": -3,
        "max": 3,
        "step": 1,
        "default": 1
      },
      {
        "name": "k",
        "label": "Vertex y (k)",
        "min": -4,
        "max": 4,
        "step": 1,
        "default": -2
      }
    ]
  },
  {
    "t": "gp",
    "ti": "Graph Plotter: Parabola Vertex & x-Intercepts",
    "ti_ar": "مخطط التمثيل البياني: رأس القطع المكافئ والمقاطع السينية",
    "q": "Plot the vertex and both x-intercepts of \\(f(x) = -(x - 1)^2 + 4\\).",
    "q_ar": "عيّن رأس القطع المكافئ والمقطعين السينيين للدالة \\(f(x) = -(x - 1)^2 + 4\\).",
    "xrange": [
      -3,
      5
    ],
    "yrange": [
      -2,
      6
    ],
    "targets": [
      {
        "label": "Vertex (1, 4)",
        "label_ar": "الرأس (1, 4)",
        "target": [
          1,
          4
        ],
        "tol": 0.45
      },
      {
        "label": "x-intercept (-1, 0)",
        "label_ar": "المقطع السيني (-1, 0)",
        "target": [
          -1,
          0
        ],
        "tol": 0.45
      },
      {
        "label": "x-intercept (3, 0)",
        "label_ar": "المقطع السيني (3, 0)",
        "target": [
          3,
          0
        ],
        "tol": 0.45
      }
    ],
    "ex": "In vertex form \\(a(x - h)^2 + k\\), the vertex is \\((1, 4)\\), and setting \\((x - 1)^2 = 4\\) yields \\(x = -1\\) and \\(x = 3\\).",
    "ex_ar": "من صيغة الرأس يكون الرأس \\((1, 4)\\)، وحل \\((x - 1)^2 = 4\\) يعطي \\(x = -1\\) و\\(x = 3\\)."
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
    "ti": "Spot the Error: Extraneous Solution in a Radical Equation",
    "ti_ar": "اكتشف الخطأ: الحل الدخيل في المعادلة الجذرية",
    "q": "A student solves \\(\\sqrt{x + 7} = x - 5\\). Which step introduces an invalid conclusion?",
    "q_ar": "يحل طالب المعادلة الجذرية \\(\\sqrt{x + 7} = x - 5\\). أي خطوة تتضمن استنتاجاً خاطئاً؟",
    "steps": [
      "Square both sides cleanly: \\(x + 7 = (x - 5)^2 = x^2 - 10x + 25\\).",
      "Rearrange into standard quadratic form: \\(x^2 - 11x + 18 = 0\\).",
      "Factor cleanly as \\((x - 2)(x - 9) = 0\\), finding candidates \\(x = 2\\) and \\(x = 9\\).",
      "Report both \\(x = 2\\) and \\(x = 9\\) as valid solutions without testing the original principal root."
    ],
    "steps_ar": [
      "تربيع الطرفين بدقة: \\(x + 7 = (x - 5)^2 = x^2 - 10x + 25\\).",
      "إعادة الترتيب للصيغة القياسية: \\(x^2 - 11x + 18 = 0\\).",
      "التحليل \\((x - 2)(x - 9) = 0\\) لإيجاد \\(x = 2\\) و\\(x = 9\\).",
      "اعتماد \\(x = 2\\) و\\(x = 9\\) معاً دون التحقق من المعادلة الأصلية."
    ],
    "errorStep": 4,
    "reasons": [
      "Principal square root \\(\\sqrt{x + 7} \\ge 0\\) requires \\(x - 5 \\ge 0\\); substituting \\(x = 2\\) gives \\(\\sqrt{9} = -3\\), which is false. Only \\(x = 9\\) is valid.",
      "Squaring both sides is never allowed for radical equations.",
      "\\((x - 5)^2\\) equals \\(x^2 - 25\\)."
    ],
    "reasons_ar": [
      "الجذر التربيعي الموجب يشترط \\(x - 5 \\ge 0\\)؛ وعند \\(x = 2\\) ينتج \\(\\sqrt{9} = -3\\) وهو خاطئ، لذا \\(x = 9\\) فقط حل صحيح.",
      "لا يجوز تربيع الطرفين في المعادلات الجذرية.",
      "مفكوك \\((x - 5)^2\\) يساوي \\(x^2 - 25\\)."
    ],
    "correctReason": 0
  },
  {
    "t": "ms",
    "ti": "Examiner Mode: Exponential Time Scaling & Rational Exponents",
    "ti_ar": "وضع المصحح: مقياس الزمن في الدوال الأسية والأسس الكسرية",
    "q": "(a) An investment grows via \\(P(t) = 500(1.08)^{t/4}\\), where \\(t\\) is in years. Interpret \\(1.08\\) and the exponent \\(t/4\\) in context. (b) Write \\(\\dfrac{x^{5/2}\\sqrt{x}}{x^{-1}}\\) as a single power \\(x^k\\) for \\(x > 0\\).",
    "q_ar": "(أ) ينمو استثمار وفق الدالة \\(P(t) = 500(1.08)^{t/4}\\) حيث \\(t\\) بالسنوات. فسّر العدد \\(1.08\\) والأس \\(t/4\\) في السياق. (ب) بسّط العبارة \\(\\dfrac{x^{5/2}\\sqrt{x}}{x^{-1}}\\) في صورة \\(x^k\\) حيث \\(x > 0\\).",
    "parts": [
      {
        "label": "Part (a) — Exponential Compounding Period Interpretation",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "Initial amount at \\(t = 0\\) is \\(500\\); factor \\(1.08\\) corresponds to an \\(8\\%\\) increase per compounding interval."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "Exponent \\(t/4\\) equals \\(1\\) when \\(t = 4\\), so the value increases by \\(8\\%\\) every \\(4\\) years."
          }
        ]
      },
      {
        "label": "Part (b) — Rational Exponent Simplification",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "Rewrite \\(\\sqrt{x} = x^{1/2}\\); numerator becomes \\(x^{5/2 + 1/2} = x^3\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "Subtract negative denominator exponent: \\(x^{3 - (-1)} = x^4\\) (\\(k = 4\\))."
          }
        ]
      }
    ],
    "parts_ar": [
      {
        "label": "الجزء (أ) — تفسير فترة التضاعف والنسبة",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "القيمة الابتدائية هي \\(500\\)، ومعامل النمو \\(1.08\\) يمثل زيادة بنسبة \\(8\\%\\) لكل فترة."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "يصبح الأس \\(t/4 = 1\\) عندما \\(t = 4\\)، أي يزداد المبلغ بنسبة \\(8\\%\\) كل \\(4\\) سنوات."
          }
        ]
      },
      {
        "label": "الجزء (ب) — تبسيط الأسس الكسرية",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "تحويل الجذر \\(\\sqrt{x} = x^{1/2}\\) فيصبح البسط \\(x^{5/2 + 1/2} = x^3\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "طرح أس المقام السالب: \\(x^{3 - (-1)} = x^4\\)."
          }
        ]
      }
    ]
  },
  {
    "t": "sb",
    "ti": "Step Builder: Rational Exponents & Exponential Decay Factor",
    "ti_ar": "بناء الخطوات: الأسس الكسرية ومعامل الاضمحلال الأسي",
    "steps": [
      {
        "l": "Evaluate \\(27^{2/3} =\\)",
        "a": "9",
        "h": "Cube root of 27 is 3; then square 3."
      },
      {
        "l": "If a substance loses \\(15\\%\\) of its mass daily, enter the multiplier base \\(b =\\)",
        "a": "0.85",
        "h": "Compute 1 − 0.15."
      },
      {
        "l": "Solve \\(x\\) in \\(x^4 \\cdot x^{-1} = 125\\) for real \\(x =\\)",
        "a": "5",
        "h": "Simplify to x³ = 125."
      }
    ],
    "steps_ar": [
      {
        "l": "احسب قيمة \\(27^{2/3} =\\)",
        "a": "9",
        "h": "الجذر التكعيبي للعدد 27 هو 3 ثم نربع الناتج."
      },
      {
        "l": "إذا فقدت مادة \\(15\\%\\) من كتلتها يومياً، فأدخل معامل البقاء الأساسي \\(b =\\)",
        "a": "0.85",
        "h": "احسب 1 − 0.15."
      },
      {
        "l": "أوجد قيمة \\(x\\) الحقيقية في \\(x^4 \\cdot x^{-1} = 125\\):",
        "a": "5",
        "h": "بسّط إلى x³ = 125."
      }
    ]
  },
  {
    "t": "mt",
    "ti": "Matching: Exponent Laws, Radicals & Exponential Models",
    "ti_ar": "مطابقة: قوانين الأسس والجذور والنماذج الأسية",
    "p": [
      {
        "l": "Fractional power \\(a^{m/n}\\)",
        "r": "\\((\\sqrt[n]{a})^m\\)"
      },
      {
        "l": "Negative exponent \\(a^{-k}\\)",
        "r": "\\(\\dfrac{1}{a^k}\\) (\\(a \\neq 0\\))"
      },
      {
        "l": "Percent growth by \\(p\\%\\) per step",
        "r": "\\(P_0\\left(1 + \\dfrac{p}{100}\\right)^t\\)"
      },
      {
        "l": "Percent decrease by \\(p\\%\\) every \\(k\\) years",
        "r": "\\(P_0\\left(1 - \\dfrac{p}{100}\\right)^{t/k}\\)"
      }
    ],
    "p_ar": [
      {
        "l": "الأس الكسري \\(a^{m/n}\\)",
        "r": "\\((\\sqrt[n]{a})^m\\)"
      },
      {
        "l": "الأس السالب \\(a^{-k}\\)",
        "r": "\\(\\dfrac{1}{a^k}\\) (\\(a \\neq 0\\))"
      },
      {
        "l": "نمو بنسبة \\(p\\%\\) كل فترة",
        "r": "\\(P_0\\left(1 + \\dfrac{p}{100}\\right)^t\\)"
      },
      {
        "l": "نقصان بنسبة \\(p\\%\\) كل \\(k\\) سنوات",
        "r": "\\(P_0\\left(1 - \\dfrac{p}{100}\\right)^{t/k}\\)"
      }
    ]
  },
  {
    "t": "fn",
    "ti": "Explorer: Discrete Exponential Growth & Decay",
    "ti_ar": "مستكشف: النمو والاضمحلال الأسي",
    "fns": [
      {
        "expr": "A*(B^x)",
        "color": "#1E3A6E",
        "label": "y = a * b^x"
      }
    ],
    "xrange": [
      -3,
      4
    ],
    "yrange": [
      -1,
      10
    ],
    "params": [
      {
        "name": "A",
        "label": "Initial Value a",
        "label_ar": "القيمة الابتدائية a",
        "min": 0.5,
        "max": 3,
        "step": 0.5,
        "default": 1.5
      },
      {
        "name": "B",
        "label": "Base b (Growth/Decay)",
        "label_ar": "الأساس b (النمو أو الاضمحلال)",
        "min": 0.5,
        "max": 2,
        "step": 0.25,
        "default": 1.5
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
  },
  {
    "t": "fn",
    "ti": "Explorer: Scatterplot Line of Best Fit",
    "ti_ar": "مستكشف: خط المطابقة الأفضل للبيانات",
    "fns": [
      {
        "expr": "M*x + B",
        "color": "#1E3A6E",
        "label": "y = mx + b (Model)"
      }
    ],
    "xrange": [
      0,
      8
    ],
    "yrange": [
      0,
      14
    ],
    "params": [
      {
        "name": "M",
        "label": "Predicted Rate m",
        "label_ar": "معدل التغير المتوقع m",
        "min": 0.5,
        "max": 2.5,
        "step": 0.25,
        "default": 1.25
      },
      {
        "name": "B",
        "label": "Baseline Intercept b",
        "label_ar": "القيمة الابتدائية b",
        "min": 0,
        "max": 5,
        "step": 0.5,
        "default": 2
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
    "ti": "Worked Example: Radian Arc Length & Circle Sector Area",
    "ti_ar": "مثال محلول: طول القوس بالراديان ومساحة القطاع الدائري",
    "steps": [
      "A circle of radius \\(r = 12\\) has a central angle of \\(\\theta = \\frac{\\pi}{3}\\) radians. Arc length: \\(s = r\\theta\\).",
      "Substitute \\(r = 12\\) and \\(\\theta = \\frac{\\pi}{3}\\): \\(s = 12 \\cdot \\frac{\\pi}{3} = 4\\pi\\).",
      "Sector area: \\(A = \\frac{1}{2}r^2\\theta = \\frac{1}{2}(144)\\left(\\frac{\\pi}{3}\\right) = 24\\pi\\)."
    ],
    "steps_ar": [
      "دائرة نصف قطرها \\(r = 12\\) وزاويتها المركزية \\(\\theta = \\frac{\\pi}{3}\\) راديان. طول القوس: \\(s = r\\theta\\).",
      "عوّض \\(r = 12\\) و\\(\\theta = \\frac{\\pi}{3}\\): \\(s = 12 \\cdot \\frac{\\pi}{3} = 4\\pi\\).",
      "مساحة القطاع: \\(A = \\frac{1}{2}r^2\\theta = \\frac{1}{2}(144)\\left(\\frac{\\pi}{3}\\right) = 24\\pi\\)."
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
    "ti": "Spot the Error: Circle Center & Radius via Completing the Square",
    "ti_ar": "اكتشف الخطأ: إيجاد مركز الدائرة ونصف قطرها بإكمال المربع",
    "q": "A circle has equation \\(x^2 + 6x + y^2 - 8y = 11\\). A student finds the radius; which step contains the error?",
    "q_ar": "معادلة دائرة هي \\(x^2 + 6x + y^2 - 8y = 11\\). يحاول طالب إيجاد نصف القطر؛ أي خطوة تتضمن خطأ؟",
    "steps": [
      "Compute half-coefficients: \\((6/2)^2 = 9\\) and \\((-8/2)^2 = 16\\).",
      "Rewrite left side cleanly as \\((x + 3)^2 + (y - 4)^2\\).",
      "Keep the right-hand side unchanged at \\(11\\) and report radius \\(r = \\sqrt{11}\\)."
    ],
    "steps_ar": [
      "حساب مربعي نصف المعاملين: \\((6/2)^2 = 9\\) و\\((-8/2)^2 = 16\\).",
      "كتابة الطرف الأيسر في صورة \\((x + 3)^2 + (y - 4)^2\\).",
      "إبقاء الطرف الأيمن مساوياً للعدد \\(11\\) واستنتاج أن نصف القطر \\(r = \\sqrt{11}\\)."
    ],
    "errorStep": 3,
    "reasons": [
      "Adding \\(9 + 16 = 25\\) on the left requires adding \\(25\\) on the right too: \\(r^2 = 11 + 25 = 36\\), so \\(r = 6\\) with center \\((-3, 4)\\).",
      "The center must always be \\((3, -4)\\).",
      "Completing the square requires subtracting \\(25\\) from the right side."
    ],
    "reasons_ar": [
      "إضافة \\(9 + 16 = 25\\) للطرف الأيسر تستوجب إضافتها للطرف الأيمن: \\(r^2 = 11 + 25 = 36\\)، فيكون \\(r = 6\\) والمركز \\((-3, 4)\\).",
      "يكون المركز دائماً \\((3, -4)\\).",
      "إكمال المربع يتطلب طرح \\(25\\) من الطرف الأيمن."
    ],
    "correctReason": 0
  },
  {
    "t": "ms",
    "ti": "Examiner Mode: Right-Triangle Complementary Trig & Special Ratios",
    "ti_ar": "وضع المصحح: الزوايا المتتامة في المثلث القائم والنسب الخاصة",
    "q": "(a) In right triangle \\(ABC\\) with \\(\\angle C = 90^\\circ\\), \\(\\cos(A) = \\frac{5}{13}\\). Find exact values of \\(\\sin(B)\\) and \\(\\tan(A)\\). (b) A \\(30^\\circ\\text{-}60^\\circ\\text{-}90^\\circ\\) right triangle has hypotenuse \\(16\\); find its exact perimeter.",
    "q_ar": "(أ) في المثلث القائم \\(ABC\\) حيث \\(\\angle C = 90^\\circ\\)، إذا كان \\(\\cos(A) = \\frac{5}{13}\\)، فأوجد القيمة الدقيقة لكل من \\(\\sin(B)\\) و\\(\\tan(A)\\). (ب) مثلث قائم \\(30^\\circ\\text{-}60^\\circ\\text{-}90^\\circ\\) طول وتره \\(16\\)؛ أوجد محيطه الدقيق.",
    "parts": [
      {
        "label": "Part (a) — Cofunction & SOHCAHTOA Ratio",
        "marks": 2,
        "rubric": [
          {
            "code": "B1",
            "marks": 1,
            "text": "Complementary acute angles satisfy \\(A + B = 90^\\circ\\), so \\(\\sin(B) = \\cos(A) = \\frac{5}{13}\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "By Pythagorean triple \\(5\\text{-}12\\text{-}13\\), opposite side is \\(12\\), giving \\(\\tan(A) = \\frac{12}{5}\\)."
          }
        ]
      },
      {
        "label": "Part (b) — Special Right Triangle Perimeter",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "Short leg opposite \\(30^\\circ\\) is \\(16/2 = 8\\); long leg is \\(8\\sqrt{3}\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "Perimeter: \\(8 + 16 + 8\\sqrt{3} = 24 + 8\\sqrt{3}\\)."
          }
        ]
      }
    ],
    "parts_ar": [
      {
        "label": "الجزء (أ) — الزوايا المتتامة والنسب المثلثية",
        "marks": 2,
        "rubric": [
          {
            "code": "B1",
            "marks": 1,
            "text": "بما أن \\(A + B = 90^\\circ\\)، فإن \\(\\sin(B) = \\cos(A) = \\frac{5}{13}\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "من ثلاثية فيثاغورس \\(5\\text{-}12\\text{-}13\\)، الضلع المقابل \\(12\\)، ومنه \\(\\tan(A) = \\frac{12}{5}\\)."
          }
        ]
      },
      {
        "label": "الجزء (ب) — محيط المثلث الخاص",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "الضلع المقابل للزاوية \\(30^\\circ\\) يساوي \\(8\\)، والضلع الآخر \\(8\\sqrt{3}\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "المحيط: \\(8 + 16 + 8\\sqrt{3} = 24 + 8\\sqrt{3}\\)."
          }
        ]
      }
    ]
  },
  {
    "t": "qc",
    "ti": "Quick Check: Complementary Right-Triangle Identity",
    "ti_ar": "فحص سريع: متطابقة الزاويتين المتتامتين في المثلث القائم",
    "q": "If \\(x\\) and \\(y\\) are the measures of the two acute angles in a right triangle and \\(\\sin(x^\\circ) = \\frac{4}{7}\\), what is \\(\\cos(y^\\circ)\\)?",
    "q_ar": "إذا كانت \\(x\\) و\\(y\\) قياسي الزاويتين الحادتين في مثلث قائم وكان \\(\\sin(x^\\circ) = \\frac{4}{7}\\)، فما قيمة \\(\\cos(y^\\circ)\\)؟",
    "o": [
      "\\(\\frac{4}{7}\\)",
      "\\(\\frac{3}{7}\\)",
      "\\(\\frac{\\sqrt{33}}{7}\\)",
      "\\(\\frac{7}{4}\\)"
    ],
    "o_ar": [
      "\\(\\frac{4}{7}\\)",
      "\\(\\frac{3}{7}\\)",
      "\\(\\frac{\\sqrt{33}}{7}\\)",
      "\\(\\frac{7}{4}\\)"
    ],
    "a": 0,
    "ex": "Since \\(x + y = 90^\\circ\\), the side opposite \\(x\\) is adjacent to \\(y\\), so \\(\\cos(y^\\circ) = \\sin(x^\\circ) = \\frac{4}{7}\\).",
    "ex_ar": "بما أن \\(x + y = 90^\\circ\\)، فإن الضلع المقابل للزاوية \\(x\\) هو المجاور للزاوية \\(y\\)، لذا \\(\\cos(y^\\circ) = \\sin(x^\\circ) = \\frac{4}{7}\\)."
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
    "ti": "Spot the Error: Solving Equations via Intersection in Desmos",
    "ti_ar": "اكتشف الخطأ: حل المعادلات عبر نقاط التقاطع في حاسبة ديسموس",
    "q": "A student uses Desmos to find all real solutions of \\(x^2 + 12 = 16x - 43\\). Which step misses a valid solution?",
    "q_ar": "يستخدم طالب حاسبة ديسموس لإيجاد الحلول الحقيقية للمعادلة \\(x^2 + 12 = 16x - 43\\). أي خطوة تتسبب في إغفال أحد الحلول؟",
    "steps": [
      "Enter Line 1: \\(y = x^2 + 12\\).",
      "Enter Line 2: \\(y = 16x - 43\\).",
      "Inspect only the default \\([-10, 10] \\times [-10, 10]\\) window, see one dot at \\(x = 5\\), and stop without zooming out."
    ],
    "steps_ar": [
      "إدخال السطر الأول: \\(y = x^2 + 12\\).",
      "إدخال السطر الثاني: \\(y = 16x - 43\\).",
      "فحص نافذة العرض الافتراضية \\([-10, 10]\\) فقط ورؤية تقاطع واحد عند \\(x = 5\\) ثم التوقف دون تصغير العرض."
    ],
    "errorStep": 3,
    "reasons": [
      "Solving gives \\((x - 5)(x - 11) = 0\\); the second intersection occurs at \\((11, 133)\\), which sits above the default viewport.",
      "Desmos cannot plot linear and quadratic expressions simultaneously.",
      "You must take the \\(y\\)-coordinate instead of the \\(x\\)-coordinate."
    ],
    "reasons_ar": [
      "بحل المعادلة \\((x - 5)(x - 11) = 0\\) نجد نقطة تقاطع ثانية عند \\((11, 133)\\) خارج الإطار الافتراضي.",
      "لا تستطيع ديسموس تمثيل دالة خطية وتربيعية معاً.",
      "يجب قراءة الإحداثي الصادي بدلاً من الإحداثي السيني."
    ],
    "correctReason": 0
  },
  {
    "t": "ms",
    "ti": "Examiner Mode: Desmos Linear Regression (~) & Slider Tangency",
    "ti_ar": "وضع المصحح: الانحدار الخطي (~) وأشرطة التمرير في ديسموس",
    "q": "(a) A table has pairs \\((2, 11)\\) and \\((6, 23)\\). Describe how to recover \\(m\\) and \\(b\\) in \\(y = mx + b\\) using Desmos regression. (b) Describe how to use a Desmos slider for \\(k\\) to find when \\(y = x^2 - 6x + k\\) intersects \\(y = 2\\) at exactly one point.",
    "q_ar": "(أ) جدول يحتوي على النقطتين \\((2, 11)\\) و\\((6, 23)\\). صف خطوات استخراج \\(m\\) و\\(b\\) باستخدام الانحدار في ديسموس. (ب) صف استخدام شريط التمرير \\(k\\) لإيجاد قيمة التماس بين \\(y = x^2 - 6x + k\\) و\\(y = 2\\).",
    "parts": [
      {
        "label": "Part (a) — Table & Tilde Regression Syntax",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "Insert a Table (+), enter \\((2, 11)\\) and \\((6, 23)\\) into columns \\(x_1\\) and \\(y_1\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "Type \\(y_1 \\sim m x_1 + b\\); Desmos outputs \\(m = 3\\) and \\(b = 5\\)."
          }
        ]
      },
      {
        "label": "Part (b) — Tangency Slider Condition",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "Graph \\(y = x^2 - 6x + k\\) (accepting slider \\(k\\)) alongside \\(y = 2\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "Adjust \\(k\\) until the vertex sits directly on \\(y = 2\\), yielding \\(k = 11\\) (since vertex \\(y = 9 - 18 + 11 = 2\\))."
          }
        ]
      }
    ],
    "parts_ar": [
      {
        "label": "الجزء (أ) — الجدول وصيغة الانحدار (~)",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "إدراج جدول وإدخال النقطتين \\((2, 11)\\) و\\((6, 23)\\) في العمودين \\(x_1, y_1\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "كتابة \\(y_1 \\sim m x_1 + b\\) فتخرج ديسموس \\(m = 3\\) و\\(b = 5\\)."
          }
        ]
      },
      {
        "label": "الجزء (ب) — التماس عبر شريط التمرير",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "تمثيل \\(y = x^2 - 6x + k\\) مع شريط تمرير \\(k\\) بجانب \\(y = 2\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "ضبط \\(k\\) حتى يلامس الرأس المستقيم \\(y = 2\\)، فتنتج القيمة \\(k = 11\\)."
          }
        ]
      }
    ]
  },
  {
    "t": "sb",
    "ti": "Step Builder: Desmos System Intersection & Expression Check",
    "ti_ar": "بناء الخطوات: تقاطع الأنظمة والتحقق من العبارات في ديسموس",
    "steps": [
      {
        "l": "In \\(y = x^2 - 6x + k\\), enter slider value \\(k\\) so the vertex touches \\(y = 2\\): \\(k =\\)",
        "a": "11",
        "h": "Vertex occurs at x = 3: 3² − 6(3) + k = 2."
      },
      {
        "l": "Using regression \\(y_1 \\sim m x_1 + b\\) on \\((2, 11)\\) and \\((6, 23)\\), find \\(m =\\)",
        "a": "3",
        "h": "Slope = (23 − 11) / (6 − 2)."
      },
      {
        "l": "Using the same regression line, find \\(y\\)-intercept \\(b =\\)",
        "a": "5",
        "h": "Compute 11 − 3(2)."
      }
    ],
    "steps_ar": [
      {
        "l": "في \\(y = x^2 - 6x + k\\)، أدخل قيمة \\(k\\) التي تجعل الرأس يلامس \\(y = 2\\): \\(k =\\)",
        "a": "11",
        "h": "الرأس عند x = 3: عوّض 9 − 18 + k = 2."
      },
      {
        "l": "باستخدام الانحدار \\(y_1 \\sim m x_1 + b\\) على \\((2, 11)\\) و\\((6, 23)\\)، أوجد \\(m =\\)",
        "a": "3",
        "h": "الميل = (23 − 11) ÷ (6 − 2)."
      },
      {
        "l": "من نفس خط الانحدار، أوجد المقطع الصادي \\(b =\\)",
        "a": "5",
        "h": "احسب 11 − 3(2)."
      }
    ]
  },
  {
    "t": "mt",
    "ti": "Matching: High-Yield Desmos Tactics for Digital SAT",
    "ti_ar": "مطابقة: تكتيكات ديسموس الأساسية لاختبار SAT الرقمي",
    "p": [
      {
        "l": "System of equations in \\(x, y\\)",
        "r": "Graph both equations and click the gray intersection dot"
      },
      {
        "l": "Table of 2 or 3 points",
        "r": "Enter table and run \\(y_1 \\sim m x_1 + b\\) or quadratic regression"
      },
      {
        "l": "Unknown constant \\(k\\) in no-solution system",
        "r": "Graph with slider \\(k\\) and adjust until lines are parallel"
      },
      {
        "l": "Equivalent expression check",
        "r": "Evaluate target and answer options at a non-special test value like \\(x = 1.7\\)"
      }
    ],
    "p_ar": [
      {
        "l": "نظام معادلتين بمتغيرين \\(x, y\\)",
        "r": "مثّل المعادلتين والنقر على نقطة التقاطع الرمادية"
      },
      {
        "l": "جدول من نقطتين أو 3 نقاط",
        "r": "إدخال الجدول وتشغيل الانحدار \\(y_1 \\sim m x_1 + b\\) أو التربيعي"
      },
      {
        "l": "ثابت مجهول \\(k\\) في نظام بلا حلول",
        "r": "استخدام شريط التمرير \\(k\\) وضبطه حتى يتوازى المستقيمان"
      },
      {
        "l": "التحقق من العبارات المكافئة",
        "r": "مقارنة القيمة عند عدد غير خاص مثل \\(x = 1.7\\)"
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
    "ti": "Spot the Error: Composite Function Evaluation Order (Nonlinear Functions & Transformations)",
    "ti_ar": "اكتشف الخطأ: ترتيب تركيب الدوال (الدوال غير الخطية والتحويلات)",
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
    "ti": "Examiner Mode: Vertex Transformations & Horizontal/Vertical Shifts",
    "ti_ar": "وضع المصحح: تحويلات الرأس والإزاحة الأفقية والرأسية",
    "q": "(a) State the vertex and range of \\(g(x) = 2(x - 3)^2 - 8\\). (b) If the graph of \\(f\\) passes through \\((6, 9)\\), what point must lie on the graph of \\(h(x) = f(x + 4) - 5\\)?",
    "q_ar": "(أ) حدد الرأس ومدى الدالة \\(g(x) = 2(x - 3)^2 - 8\\). (ب) إذا مرّ منحنى \\(f\\) بالنقطة \\((6, 9)\\)، فما النقطة الواقعة على منحنى \\(h(x) = f(x + 4) - 5\\)؟",
    "parts": [
      {
        "label": "Part (a) — Vertex & Range",
        "marks": 2,
        "rubric": [
          {
            "code": "B1",
            "marks": 1,
            "text": "From \\(a(x - h)^2 + k\\), vertex is \\((3, -8)\\)."
          },
          {
            "code": "B1",
            "marks": 1,
            "text": "Since \\(a = 2 > 0\\), parabola opens upward so range is \\(g(x) \\ge -8\\), or \\([-8, \\infty)\\)."
          }
        ]
      },
      {
        "label": "Part (b) — Coordinate Transformation Rule",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "Set inner input \\(x + 4 = 6 \\implies x = 2\\) (shift left \\(4\\) units)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "Compute \\(h(2) = f(6) - 5 = 9 - 5 = 4\\), giving point \\((2, 4)\\)."
          }
        ]
      }
    ],
    "parts_ar": [
      {
        "label": "الجزء (أ) — الرأس والمدى",
        "marks": 2,
        "rubric": [
          {
            "code": "B1",
            "marks": 1,
            "text": "من صيغة الرأس يكون الرأس \\((3, -8)\\)."
          },
          {
            "code": "B1",
            "marks": 1,
            "text": "بما أن \\(a = 2 > 0\\)، يفتح القطع لأعلى والمدى \\(g(x) \\ge -8\\)."
          }
        ]
      },
      {
        "label": "الجزء (ب) — قاعدة تحويل الإحداثيات",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "وضع المدخل الداخلي \\(x + 4 = 6 \\implies x = 2\\) (إزاحة لليسار 4 وحدات)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "حساب \\(h(2) = f(6) - 5 = 4\\)، فتكون النقطة \\((2, 4)\\)."
          }
        ]
      }
    ]
  },
  {
    "t": "sb",
    "ti": "Step Builder: Composite Function Evaluation (Nonlinear Functions & Transformations)",
    "ti_ar": "بناء الخطوات: حساب قيم الدوال المركبة (الدوال غير الخطية والتحويلات)",
    "steps": [
      {
        "l": "For \\(f(x) = 4x + 1\\) and \\(g(x) = x^2 + 1\\), find \\(g(4) =\\)",
        "a": "17",
        "h": "Compute 4² + 1."
      },
      {
        "l": "Now evaluate \\(f(g(4)) = f(17) =\\)",
        "a": "69",
        "h": "Compute 4 × 17 + 1."
      },
      {
        "l": "Evaluate the reverse order \\(g(f(1)) = g(5) =\\)",
        "a": "26",
        "h": "First f(1) = 5, then 5² + 1."
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
        "h": "احسب 4 × 17 + 1."
      },
      {
        "l": "احسب التركيب العكسي \\(g(f(1)) = g(5) =\\)",
        "a": "26",
        "h": "أولاً f(1) = 5 ثم 5² + 1."
      }
    ]
  },
  {
    "t": "mt",
    "ti": "Matching: Coordinate Graph Transformations (Nonlinear Functions & Transformations)",
    "ti_ar": "مطابقة: قواعد التحويلات الهندسية للدوال (الدوال غير الخطية والتحويلات)",
    "p": [
      {
        "l": "Vertical shift \\(y = f(x) + 5\\)",
        "r": "Shifts the entire graph \\(5\\) units upward"
      },
      {
        "l": "Horizontal shift \\(y = f(x - 4)\\)",
        "r": "Shifts the entire graph \\(4\\) units to the right"
      },
      {
        "l": "Horizontal shift \\(y = f(x + 3)\\)",
        "r": "Shifts the entire graph \\(3\\) units to the left"
      },
      {
        "l": "Reflection \\(y = -f(x)\\)",
        "r": "Reflects the graph across the \\(x\\)-axis"
      }
    ],
    "p_ar": [
      {
        "l": "الإزاحة الرأسية \\(y = f(x) + 5\\)",
        "r": "تزيح المنحنى \\(5\\) وحدات لأعلى"
      },
      {
        "l": "الإزاحة الأفقية \\(y = f(x - 4)\\)",
        "r": "تزيح المنحنى \\(4\\) وحدات لليمين"
      },
      {
        "l": "الإزاحة الأفقية \\(y = f(x + 3)\\)",
        "r": "تزيح المنحنى \\(3\\) وحدات لليسار"
      },
      {
        "l": "الانعكاس \\(y = -f(x)\\)",
        "r": "يعكس المنحنى حول محور السينات"
      }
    ]
  },
  {
    "t": "gp",
    "ti": "Graph Plotter: Parabola Vertex & Zeros (Nonlinear Functions & Function Notation)",
    "ti_ar": "مخطط التمثيل البياني: الرأس والأصفار (الدوال غير الخطية والتحويلات)",
    "q": "Plot the vertex and both zeros of \\(f(x) = (x - 2)^2 - 4\\).",
    "q_ar": "عيّن رأس القطع المكافئ وجذريه للدالة \\(f(x) = (x - 2)^2 - 4\\).",
    "xrange": [
      -4,
      6
    ],
    "yrange": [
      -5,
      5
    ],
    "targets": [
      {
        "label": "Vertex (2, -4)",
        "label_ar": "الرأس (2, -4)",
        "target": [
          2,
          -4
        ],
        "tol": 0.45
      },
      {
        "label": "Zero (0, 0)",
        "label_ar": "الجذر الأول (0, 0)",
        "target": [
          0,
          0
        ],
        "tol": 0.45
      },
      {
        "label": "Zero (4, 0)",
        "label_ar": "الجذر الثاني (4, 0)",
        "target": [
          4,
          0
        ],
        "tol": 0.45
      }
    ],
    "ex": "In vertex form \\((x - h)^2 + k\\), the vertex is \\((2, -4)\\), and \\((x - 2)^2 = 4\\) yields roots \\(x = 0\\) and \\(x = 4\\).",
    "ex_ar": "في صيغة الرأس \\((x - h)^2 + k\\)، يكون الرأس \\((2, -4)\\)، وحل \\((x - 2)^2 = 4\\) يعطي الجذرين \\(x = 0\\) و\\(x = 4\\)."
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
    "ti": "Categorize: Center vs. Spread Measures",
    "ti_ar": "تصنيف: مقاييس النزعة المركزية ومقاييس التشتت",
    "categories": [
      "Measures of Center",
      "Measures of Spread (Variability)"
    ],
    "categories_ar": [
      "مقاييس النزعة المركزية",
      "مقاييس التشتت"
    ],
    "items": [
      {
        "s": "Mean (Arithmetic Average)",
        "cat": 0
      },
      {
        "s": "Median (Middle Value)",
        "cat": 0
      },
      {
        "s": "Standard Deviation (Spread Around Mean)",
        "cat": 1
      },
      {
        "s": "Range (Max − Min)",
        "cat": 1
      },
      {
        "s": "Mode (Most Frequent Value)",
        "cat": 0
      }
    ],
    "items_ar": [
      {
        "s": "المتوسط الحسابي",
        "cat": 0
      },
      {
        "s": "الوسيط",
        "cat": 0
      },
      {
        "s": "الانحراف المعياري",
        "cat": 1
      },
      {
        "s": "المدى (الأكبر − الأصغر)",
        "cat": 1
      },
      {
        "s": "المنوال",
        "cat": 0
      }
    ],
    "ex": "Mean, median, and mode describe typical center; range and standard deviation measure variability or spread.",
    "ex_ar": "المتوسط والوسيط والمنوال تقيس النزعة المركزية؛ بينما المدى والانحراف المعياري يقيسان التشتت."
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
    "ti": "Spot the Error: Sample Generalizability & Causation Claims",
    "ti_ar": "اكتشف الخطأ: تعميم العينات المتحيزة وادعاء السببية",
    "q": "A researcher surveys \\(300\\) randomly selected members of one fitness club and finds regular swimmers report lower stress. Which conclusion is invalid?",
    "q_ar": "استطلع باحث آراء \\(300\\) عضو مختارين عشوائياً من نادٍ رياضي واحد، ووجد أن السباحين المنتظمين أقل توتراً. أي استنتاج غير صحيح؟",
    "steps": [
      "Restrict generalization to members of that fitness club.",
      "Treat the survey as an observational study because members were not randomly assigned to swim.",
      "Conclude that swimming causes lower stress among all residents in the entire city."
    ],
    "steps_ar": [
      "قصر تعميم النتيجة على أعضاء ذلك النادي الرياضي فقط.",
      "تصنيف الدراسة كدراسة قائمة على الملاحظة لعدم وجود توزيع عشوائي للمعالجة.",
      "الاستنتاج أن السباحة تسبب انخفاض التوتر لدى جميع سكان المدينة بأكملها."
    ],
    "errorStep": 3,
    "reasons": [
      "Results from a single club sample cannot generalize to all city residents, and observational studies without random assignment cannot prove causation.",
      "A sample of 300 is always sufficient for citywide causal claims.",
      "Observational studies prove causation whenever sample size exceeds 100."
    ],
    "reasons_ar": [
      "عينة من نادٍ واحد لا تُعمم على جميع سكان المدينة، والدراسات القائمة على الملاحظة دون توزيع عشوائي لا تثبت السببية.",
      "حجم العينة 300 يكفي دائماً لإثبات السببية على مستوى المدينة.",
      "الدراسات القائمة على الملاحظة تثبت السببية عندما تتجاوز العينة 100 مشارك."
    ],
    "correctReason": 0
  },
  {
    "t": "ms",
    "ti": "Examiner Mode: Outlier Effect on Mean/Median & Plausible Values Interval",
    "ti_ar": "وضع المصحح: أثر القيم المتطرفة وتفسير هامش الخطأ",
    "q": "(a) Dataset A is \\(\\{10, 12, 14, 15, 19\\}\\) and Dataset B replaces \\(19\\) with outlier \\(69\\). Compute both medians and state which center changes more. (b) A random poll reports \\(58\\%\\) support with a \\(4\\%\\) margin of error; find the plausible interval for the population proportion and state how doubling sample size affects margin of error.",
    "q_ar": "(أ) المجموعة الأولى \\(\\{10, 12, 14, 15, 19\\}\\) والثانية تستبدل \\(19\\) بالقيمة المتطرفة \\(69\\). أوجد الوسيط لكل منهما واذكر أي مقياس مركز يتأثر أكثر. (ب) أفاد استطلاع عشوائي بتأييد \\(58\\%\\) بهامش خطأ \\(4\\%\\)؛ أوجد الفترة المعقولة لنسبة المجتمع وأثر مضاعفة حجم العينة على هامش الخطأ.",
    "parts": [
      {
        "label": "Part (a) — Median Resistance vs. Mean Sensitivity",
        "marks": 2,
        "rubric": [
          {
            "code": "B1",
            "marks": 1,
            "text": "Both datasets have median \\(14\\) (unchanged by the upper outlier)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "The mean increases substantially from \\(14\\) to \\(24\\); thus the mean shifts while the median resists the outlier."
          }
        ]
      },
      {
        "label": "Part (b) — Plausible Population Range & Sample Size",
        "marks": 2,
        "rubric": [
          {
            "code": "B1",
            "marks": 1,
            "text": "Plausible population percentage lies between \\(58\\% - 4\\% = 54\\%\\) and \\(58\\% + 4\\% = 62\\%\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "Increasing (doubling) sample size decreases the margin of error."
          }
        ]
      }
    ],
    "parts_ar": [
      {
        "label": "الجزء (أ) — مقاومة الوسيط مقابل تأثر المتوسط",
        "marks": 2,
        "rubric": [
          {
            "code": "B1",
            "marks": 1,
            "text": "وسيط كلتا المجموعتين هو \\(14\\) دون تغيير رغم القيمة المتطرفة."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "يرتفع المتوسط الحسابي من \\(14\\) إلى \\(24\\)، لذا يتأثر المتوسط أكثر بكثير."
          }
        ]
      },
      {
        "label": "الجزء (ب) — الفترة المعقولة وحجم العينة",
        "marks": 2,
        "rubric": [
          {
            "code": "B1",
            "marks": 1,
            "text": "الفترة المعقولة لنسبة المجتمع هي من \\(54\\%\\) إلى \\(62\\%\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "زيادة حجم العينة تقلل هامش الخطأ وتزيد الدقة."
          }
        ]
      }
    ]
  },
  {
    "t": "sb",
    "ti": "Step Builder: Mean, Median & Range with an Extreme Value",
    "ti_ar": "بناء الخطوات: المتوسط والوسيط والمدى مع قيمة متطرفة",
    "steps": [
      {
        "l": "Find the median of \\(\\{4, 6, 6, 8, 26\\}\\):",
        "a": "6",
        "h": "Pick the middle (3rd) ordered value."
      },
      {
        "l": "Compute the arithmetic mean of \\(\\{4, 6, 6, 8, 26\\}\\):",
        "a": "10",
        "h": "Sum = 50; divide by 5."
      },
      {
        "l": "Compute the range of \\(\\{4, 6, 6, 8, 26\\}\\):",
        "a": "22",
        "h": "Subtract minimum 4 from maximum 26."
      }
    ],
    "steps_ar": [
      {
        "l": "أوجد الوسيط للمجموعة \\(\\{4, 6, 6, 8, 26\\}\\):",
        "a": "6",
        "h": "اختر القيمة الوسطى (الثالثة)."
      },
      {
        "l": "احسب المتوسط الحسابي للمجموعة \\(\\{4, 6, 6, 8, 26\\}\\):",
        "a": "10",
        "h": "المجموع 50 مقسوماً على 5."
      },
      {
        "l": "احسب المدى للمجموعة \\(\\{4, 6, 6, 8, 26\\}\\):",
        "a": "22",
        "h": "اطرح القيمة الصغرى 4 من العظمى 26."
      }
    ]
  },
  {
    "t": "mt",
    "ti": "Matching: Digital SAT Sampling, Spread & Margin of Error Rules",
    "ti_ar": "مطابقة: قواعد المعاينة والتشتت وهامش الخطأ في SAT الرقمي",
    "p": [
      {
        "l": "Random sample from target population",
        "r": "Allows generalizing conclusions to that sampled population"
      },
      {
        "l": "Random assignment to treatment/control",
        "r": "Allows drawing a cause-and-effect conclusion"
      },
      {
        "l": "Larger sample size \\(n\\)",
        "r": "Produces a smaller margin of error"
      },
      {
        "l": "Values clustered tightly near the mean",
        "r": "Produces a smaller standard deviation"
      }
    ],
    "p_ar": [
      {
        "l": "عينة عشوائية من المجتمع المستهدف",
        "r": "تسمح بتعميم النتائج على ذلك المجتمع فقط"
      },
      {
        "l": "توزيع عشوائي لمجموعتي التجربة والضبط",
        "r": "يتيح استنتاج علاقة سبب ونتيجة"
      },
      {
        "l": "زيادة حجم العينة \\(n\\)",
        "r": "تؤدي إلى هامش خطأ أصغر"
      },
      {
        "l": "قيم متقاربة ومتركزة حول المتوسط",
        "r": "تؤدي إلى انحراف معياري أصغر"
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
    "ti_ar": "ترتيب الخطوات: حساب الاحتمال المشروط من جدول توافقي",
    "prompt": "Arrange the steps to compute \\(P(J \\mid P)\\), the probability a passing student (\\(P\\)) is a junior (\\(J\\)), from a two-way table:",
    "prompt_ar": "رتّب خطوات حساب \\(P(J \\mid P)\\)، أي احتمال أن يكون الطالب من الصف الحادي عشر (\\(J\\)) بشرط أنه ناجح (\\(P\\)):",
    "items": [
      "Restrict attention strictly to the row or column for condition \\(P\\) (passing students).",
      "Use the marginal subtotal of condition \\(P\\) as the denominator.",
      "Read the joint cell count of individuals who are in BOTH \\(J\\) and \\(P\\) as the numerator.",
      "Divide the joint cell count by the marginal condition subtotal."
    ],
    "items_ar": [
      "حصر الانتباه تماماً في صف أو عمود الشرط \\(P\\) (الطلاب الناجحون).",
      "اعتماد المجموع الفرعي لصف أو عمود الشرط \\(P\\) مقاماً للكسر.",
      "قراءة الخلية المشتركة للأفراد الذين يحققون \\(J\\) و\\(P\\) معاً كبسط للكسر.",
      "قسمة عدد الخلية المشتركة على المجموع الفرعي للشرط المعطى."
    ],
    "ex": "Restrict to the given condition subtotal for the denominator and use the matching joint cell for the numerator.",
    "ex_ar": "اجعل المجموع الفرعي للشرط مقاماً والخلية المشتركة بسطاً ثم اقسم."
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
    "ti": "Spot the Error: Wrong Denominator in Two-Way Table Conditional Probability",
    "ti_ar": "اكتشف الخطأ: اختيار مقام خاطئ في جدول التوافق المزدوج",
    "q": "A survey of \\(200\\) students shows \\(80\\) study Biology, and of those \\(80\\), \\(32\\) prefer Lab Work. A student calculates the probability that a randomly selected Biology student prefers Lab Work. Which step is wrong?",
    "q_ar": "شمل مسح \\(200\\) طالب، يدرس منهم \\(80\\) مادة الأحياء، ويفضّل \\(32\\) من دارسي الأحياء العمل المخبري. يحسب طالب احتمال أن يفضّل طالب أحياء مختار عشوائياً العمل المخبري. أي خطوة خاطئة؟",
    "steps": [
      "Identify the numerator as the \\(32\\) students who study Biology AND prefer Lab Work.",
      "Divide \\(32\\) by the grand total \\(200\\) to report \\(0.16\\).",
      "Conclude \\(16\\%\\) of Biology students prefer Lab Work."
    ],
    "steps_ar": [
      "تحديد البسط بعدد الطلاب المشتركين \\(32\\) طالباً (أحياء ومخبري).",
      "قسمة \\(32\\) على المجموع الكلي \\(200\\) للحصول على \\(0.16\\).",
      "الاستنتاج أن \\(16\\%\\) من طلاب الأحياء يفضلون العمل المخبري."
    ],
    "errorStep": 2,
    "reasons": [
      "The given condition restricts the sample space to the \\(80\\) Biology students, so the true conditional probability is \\(\\frac{32}{80} = 0.40\\) (\\(40\\%\\)), NOT \\(\\frac{32}{200}\\).",
      "You must add \\(32 + 80\\) for the denominator.",
      "Grand total \\(200\\) should always be multiplied by \\(32\\)."
    ],
    "reasons_ar": [
      "الشرط يقصر المقام على طلاب الأحياء فقط (\\(80\\))، لذا الاحتمال الشرطي هو \\(\\frac{32}{80} = 0.40\\) أي \\(40\\%\\) وليس \\(\\frac{32}{200}\\).",
      "يجب جمع \\(32 + 80\\) في المقام.",
      "يجب ضرب المجموع الكلي في \\(32\\)."
    ],
    "correctReason": 0
  },
  {
    "t": "ms",
    "ti": "Examiner Mode: Two-Way Frequency Table Conditional Probability & Scaling",
    "ti_ar": "وضع المصحح: الاحتمال الشرطي من جدول التوافق وتقدير أعداد المجتمع",
    "q": "A random sample of \\(120\\) eleventh graders includes \\(75\\) on-campus students, of whom \\(45\\) ride the school bus (the other \\(45\\) students study remotely). (a) If one on-campus student is chosen at random, find the exact probability they ride the bus. (b) If the school district has \\(1,500\\) similar on-campus eleventh graders, predict how many ride the bus.",
    "q_ar": "تضم عينة عشوائية من \\(120\\) طالباً في الصف الحادي عشر \\(75\\) طالباً بالحضور الشخصي، منهم \\(45\\) يستخدمون الحافلة المدرسية. (أ) إذا اختير طالب حضور شخصي عشوائياً، فأوجد احتمال استخدامه للحافلة. (ب) إذا كان بالمنطقة \\(1500\\) طالب حضور شخصي مماثل، فتوقّع عدد مستخدمي الحافلة.",
    "parts": [
      {
        "label": "Part (a) — Conditional Probability on Subgroup",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "Restrict denominator to the \\(75\\) on-campus students; numerator is \\(45\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "Compute \\(\\frac{45}{75} = \\frac{3}{5} = 0.60\\) (\\(60\\%\\))."
          }
        ]
      },
      {
        "label": "Part (b) — Expected Count in Target Population",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "Multiply the conditional proportion \\(0.60\\) by \\(1,500\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "Expected number riding the bus: \\(0.60 \\times 1500 = 900\\) students."
          }
        ]
      }
    ],
    "parts_ar": [
      {
        "label": "الجزء (أ) — الاحتمال الشرطي للمجموعة الفرعية",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "حصر المقام في طلاب الحضور الشخصي (\\(75\\)) والبسط \\(45\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "الناتج: \\(\\frac{45}{75} = \\frac{3}{5} = 0.60\\)."
          }
        ]
      },
      {
        "label": "الجزء (ب) — العدد المتوقع في المجتمع",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "ضرب النسبة الشرطية \\(0.60\\) في \\(1500\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "العدد المتوقع: \\(0.60 \\times 1500 = 900\\) طالباً."
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
