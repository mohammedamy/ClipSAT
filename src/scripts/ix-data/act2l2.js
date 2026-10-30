/* Interactive Practice data for /act2l2/ - one entry per chapter section id.
   Shipped as public/js/ix/act2l2.js and loaded only on that track's page by the
   engine in src/scripts/modules/19-interactive-activities-engine-v1.js
   (Plan 5 Phase 5.015, ADR 0033). Entry shapes (qc/mt/tf/sb/sr/fn/num/ord/cat/gp/se/ms) are
   documented there. */
(window.__ixData = window.__ixData || []).push(function (D) {
D["act2l2-about"] = [
  {
    "t": "qc",
    "ti": "Math Lab: ACT 2 Level 2 Pacing & Structure",
    "ti_ar": "مختبر الرياضيات: وتيرة وهيكل اختبار ACT 2 المستوى 2",
    "q": "The ACT Math 2 Level 2 exam contains 50 questions in 60 minutes. What is the average target time budget per question?",
    "q_ar": "يتكون اختبار ACT Math 2 Level 2 من 50 سؤالاً في 60 دقيقة. ما هو متوسط الميزانية الزمنية المستهدفة لكل سؤال؟",
    "o": [
      "72 seconds (1.2 min)",
      "60 seconds (1.0 min)",
      "84 seconds (1.4 min)",
      "45 seconds (0.75 min)"
    ],
    "o_ar": [
      "72 ثانية (1.2 دقيقة)",
      "60 ثانية (1.0 دقيقة)",
      "84 ثانية (1.4 دقيقة)",
      "45 ثانية (0.75 دقيقة)"
    ],
    "a": 0,
    "ex": "\\(\\dfrac{60\\text{ min}\\times60\\text{ s}}{50\\text{ questions}} = 72\\text{ seconds/question}\\). Keep an active pacing checkpoint at Q25 (30 min remaining).",
    "ex_ar": "\\(\\dfrac{60\\text{ دقيقة}\\times60\\text{ ثانية}}{50\\text{ سؤالاً}} = 72\\text{ ثانية/سؤال}\\). حافظ على وتيرة زمنية منضبطة عند السؤال 25 (30 دقيقة متبقية)."
  },
  {
    "t": "tf",
    "ti": "Reasoning Lab: ACT Subject Test Policies & Scoring",
    "ti_ar": "مختبر التفكير المنطقي: سياسات وقواعد درجات اختبار ACT التخصصي",
    "items": [
      {
        "s": "An approved scientific or graphing calculator is permitted throughout the entire exam.",
        "s_ar": "يُسمح باستخدام الآلة الحاسبة العلمية أو البيانية المعتمدة طوال مدة الاختبار بأكملها.",
        "a": true,
        "ex": "Unlike SAT Section 3, ACT Math Level 2 permits an approved calculator on every single question.",
        "ex_ar": "على عكس القسم 3 في SAT، يسمح اختبار ACT Math Level 2 باستخدام آلة حاسبة معتمدة في جميع الأسئلة."
      },
      {
        "s": "There is a negative penalty for incorrect answers.",
        "s_ar": "يوجد خصم درجات على الإجابات الخاطئة (عقوبة التخمين).",
        "a": false,
        "ex": "ACT Subject Tests do not penalize wrong answers; never leave any question blank.",
        "ex_ar": "اختبارات ACT التخصصية لا تخصم درجات على الإجابات الخاطئة؛ لذلك لا تترك أي سؤال فارغاً أبداً."
      },
      {
        "s": "Level 2 covers limits and polar coordinates, which do not appear on Level 1.",
        "s_ar": "يغطي المستوى 2 النهايات والإحداثيات القطبية، والتي لا تظهر في المستوى 1.",
        "a": true,
        "ex": "Level 2 extends trigonometry to polar equations and covers introductory limits and vectors.",
        "ex_ar": "يوسع المستوى 2 حساب المثلثات إلى المعادلات القطبية ويغطي مقدمة النهايات والمتجهات."
      },
      {
        "s": "Formulas for geometric series and trigonometry are printed at the start of the exam booklet.",
        "s_ar": "تُطبع قوانين المتسلسلات الهندسية وحساب المثلثات في بداية كراسة الاختبار.",
        "a": false,
        "ex": "Unlike the SAT, the ACT provides no reference formula sheet. Core identities must be memorized.",
        "ex_ar": "على عكس اختبار SAT، لا يوفر ACT ورقة قوانين مرجعية. لذا يجب حفظ المتطابقات الأساسية."
      }
    ]
  },
  {
    "t": "num",
    "ti": "Pacing Lab: Questions Remaining Budget",
    "ti_ar": "مختبر إدارة الوقت: ميزانية الأسئلة المتبقية",
    "q": "If you have 18 minutes remaining on the AIST Math 2 exam, how many questions should you have left to stay on the 72-second/question target pace?",
    "q_ar": "إذا تبقت لك 18 دقيقة في اختبار AIST Math 2، فكم سؤالاً ينبغي أن يتبقى لك للبقاء على وتيرة 72 ثانية/سؤال المستهدفة؟",
    "a": 15,
    "tol": 0.01,
    "unit": "questions",
    "h": "Convert 18 minutes to seconds: \\(18 \\times 60 = 1080\\text{ s}\\). Divide by 72 seconds per question.",
    "h_ar": "حوّل 18 دقيقة إلى ثوانٍ: \\(18 \\times 60 = 1080\\text{ ثانية}\\). اقسم على 72 ثانية لكل سؤال.",
    "sol": "\\(\\dfrac{18\\times 60\\text{ s}}{72\\text{ s/question}} = \\dfrac{1080}{72} = 15\\text{ questions}\\).",
    "sol_ar": "\\(\\dfrac{18\\times 60\\text{ ثانية}}{72\\text{ ثانية/سؤال}} = \\dfrac{1080}{72} = 15\\text{ سؤالاً}\\)."
  },
  {
    "t": "ord",
    "ti": "Exam Execution: Strategic Problem-Solving Workflow",
    "ti_ar": "تنفيذ الاختبار: مسار الحل الاستراتيجي للمسائل",
    "q": "Arrange the optimal workflow for high-difficulty AIST Math 2 questions:",
    "q_ar": "رتب المسار الأمثل لحل الأسئلة عالية الصعوبة في اختبار AIST Math 2:",
    "items": [
      "Read question carefully and identify the target variable or quantity.",
      "Check algebraic domain constraints (denominators ≠ 0, log arguments > 0).",
      "Execute algebraic solution using standard formulas.",
      "Substitute candidate answer back into the original equation to reject extraneous roots.",
      "Verify choice against options and bubble answer on sheet."
    ],
    "items_ar": [
      "قراءة السؤال بعناية وتحديد المتغير أو الكمية المستهدفة بدقة.",
      "التحقق من قيود المجال الجبري (المقامات ≠ 0، ما بداخل اللوغاريتم > 0).",
      "تنفيذ الحل الجبري باستخدام القوانين الرياضية القياسية.",
      "التعويض بالحل المرشح في المعادلة الأصلية لاستبعاد الحلول الدخيلة.",
      "مقارنة الإجابة بالخيارات وتظليل الدائرة الصحيحة في ورقة الإجابة."
    ]
  },
  {
    "t": "cat",
    "ti": "Content Area Classification: Algebra II vs Precalculus",
    "ti_ar": "تصنيف المجالات: الجبر 2 مقابل حساب ما قبل التفاضل والتكامل",
    "categories": [
      "Algebra II",
      "Precalculus"
    ],
    "categories_ar": [
      "الجبر 2",
      "ما قبل التفاضل والتكامل"
    ],
    "items": [
      {
        "s": "Arithmetic and geometric sequence formulas",
        "s_ar": "قوانين المتتابعات الحسابية والهندسية",
        "cat": 0
      },
      {
        "s": "Matrix multiplication and 2×2 determinants",
        "s_ar": "ضرب المصفوفات ومحددات مصفوفات 2×2",
        "cat": 0
      },
      {
        "s": "Complex number conjugates and powers of i",
        "s_ar": "مرافق العدد المركب وقوى i",
        "cat": 0
      },
      {
        "s": "Polar to rectangular coordinate conversions",
        "s_ar": "التحويل بين الإحداثيات القطبية والديكارتية",
        "cat": 1
      },
      {
        "s": "Indeterminate limit evaluation at infinity",
        "s_ar": "حساب النهايات غير المعينة عند اللانهاية",
        "cat": 1
      },
      {
        "s": "Law of Sines and Law of Cosines",
        "s_ar": "قانون الجيوب وقانون جيوب التمام",
        "cat": 1
      }
    ]
  },
  {
    "t": "se",
    "ti": "Spot the Error: Exam Pacing & Time Allocation (Test format & strategy)",
    "ti_ar": "اكتشف الخطأ: إدارة الوقت وتوزيع الدرجات (نظام اختبار ACT الموضوعي ٢ واستراتيجية الحل)",
    "q": "A student plans their timing for a 50-question, 75-minute section in ACT2L2. Which step in their strategy introduces a flaw?",
    "q_ar": "يخطط طالب لتوزيع وقته في قسم مكوّن من 50 سؤالاً خلال 75 دقيقة. أي خطوة تتضمن خللاً منهجياً؟",
    "steps": [
      "Compute average time budget per question: \\(\\frac{75\\times 60}{50} = 90\\) seconds.",
      "Complete a first pass of straightforward items in roughly \\(63\\) seconds each to bank time.",
      "Spend \\(9\\) minutes stuck on a single hard item before reading the remaining 25 questions.",
      "Reserve the final \\(4\\) minutes to verify flagged items and ensure no unanswered blanks remain."
    ],
    "steps_ar": [
      "حساب متوسط الزمن لكل سؤال: \\(\\frac{75\\times 60}{50} = 90\\) ثانية.",
      "إنجاز الجولة الأولى للأسئلة المباشرة خلال نحو \\(63\\) ثانية للسؤال لتوفير الوقت.",
      "قضاء \\(9\\) دقائق متواصلة على سؤال صعب واحد قبل قراءة بقية الأسئلة (25 سؤالاً).",
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
    "ti_ar": "وضع المصحح: خطة إدارة الوقت والدرجة المستهدفة (نظام اختبار ACT الموضوعي ٢ واستراتيجية الحل)",
    "q": "A practice section has \\(50\\) equal-weight questions in \\(75\\) minutes with no penalty for wrong guesses. A student answers \\(43\\) correctly on Pass 1–2. (a) Find the exact seconds-per-question budget and accuracy percentage. (b) State the optimal triage rule for the remaining \\(7\\) flagged questions.",
    "q_ar": "يتكون قسم تدريبي من \\(50\\) سؤالاً متساوية الوزن في \\(75\\) دقيقة دون خصم على الإجابات الخاطئة. أجاب طالب عن \\(43\\) سؤالاً بشكل صحيح. (أ) أوجد الزمن المخصص لكل سؤال بالثواني ونسبة الدقة المئوية. (ب) اذكر قاعدة الفرز المثلى للأسئلة المتبقية وعددها \\(7\\).",
    "parts": [
      {
        "label": "Part (a) — Time Budget & Raw Accuracy",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "Time per item: \\(\\frac{4500}{50} = 90\\text{ s}\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "Raw score percentage: \\(\\frac{43}{50} \\times 100\\% \\approx 86\\%\\)."
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
            "text": "Select the best remaining option on all \\(7\\) items before time expires (expected gain \\(> 0\\) with no guessing penalty)."
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
            "text": "الزمن لكل سؤال: \\(\\frac{4500}{50} = 90\\) ثانية."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "النسبة المئوية للدرجة الخام: \\(\\frac{43}{50} \\times 100\\% \\approx 86\\%\\)."
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
            "text": "اختيار أفضل إجابة لجميع الأسئلة المتبقية (7) قبل انتهاء الوقت لعدم وجود خصم."
          }
        ]
      }
    ]
  },
  {
    "t": "sb",
    "ti": "Step Builder: Exam Time & Score Budget (Test format & strategy)",
    "ti_ar": "بناء الخطوات: حساب ميزانية الوقت والدرجة (نظام اختبار ACT الموضوعي ٢ واستراتيجية الحل)",
    "steps": [
      {
        "l": "Convert \\(75\\) minutes into total seconds:",
        "a": "4500",
        "h": "Multiply 75 by 60."
      },
      {
        "l": "Divide by \\(50\\) questions to get seconds per question:",
        "a": "90",
        "h": "Compute 4500 / 50."
      },
      {
        "l": "If you answer \\(43\\) out of \\(50\\) correctly, how many items remain for review?",
        "a": "7",
        "h": "Subtract 43 from 50."
      }
    ],
    "steps_ar": [
      {
        "l": "حوّل \\(75\\) دقيقة إلى إجمالي الثواني:",
        "a": "4500",
        "h": "اضرب 75 في 60."
      },
      {
        "l": "اقسم على \\(50\\) سؤالاً لإيجاد عدد الثواني لكل سؤال:",
        "a": "90",
        "h": "احسب 4500 ÷ 50."
      },
      {
        "l": "إذا حللت \\(43\\) من أصل \\(50\\)، فكم سؤالاً يتبقى للمراجعة؟",
        "a": "7",
        "h": "اطرح 43 من 50."
      }
    ]
  },
  {
    "t": "mt",
    "ti": "Matching: High-Yield Exam Tactics (Test format & strategy)",
    "ti_ar": "مطابقة: تكتيكات الحل السريع والتحقق (نظام اختبار ACT الموضوعي ٢ واستراتيجية الحل)",
    "p": [
      {
        "l": "Pass 1 (63 s/item)",
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
        "l": "الجولة الأولى (63 ث/سؤال)",
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
D["act2l2-complex"] = [
  {
    "t": "sb",
    "ti": "Lab Step Builder: Converting Complex Number to Polar Form",
    "ti_ar": "بناء الخطوات: تحويل العدد المركب إلى الصورة القطبية",
    "steps": [
      {
        "l": "Find the modulus \\(r\\) of \\(z = 1 + i\\sqrt{3}\\): \\(r = \\sqrt{1^2 + (\\sqrt{3})^2} =\\)",
        "l_ar": "أوجد مقياس (طول) \\(r\\) للعدد \\(z = 1 + i\\sqrt{3}\\): \\(r = \\sqrt{1^2 + (\\sqrt{3})^2} =\\)",
        "a": "2",
        "h": "\\(\\sqrt{1+3} = \\sqrt{4} = 2\\)",
        "h_ar": "\\(\\sqrt{1+3} = \\sqrt{4} = 2\\)"
      },
      {
        "l": "Find the argument \\(\\theta\\) in radians (first quadrant, \\(\\tan\\theta = \\sqrt{3}\\)): \\(\\theta = \\pi /\\)",
        "l_ar": "أوجد السعة \\(\\theta\\) بالراديان (في الربع الأول، \\(\\tan\\theta = \\sqrt{3}\\)): \\(\\theta = \\pi /\\)",
        "a": "3",
        "h": "\\(\\tan(\\pi/3) = \\sqrt{3}\\), so denominator is 3",
        "h_ar": "\\(\\tan(\\pi/3) = \\sqrt{3}\\)، إذن المقام هو 3"
      },
      {
        "l": "Apply De Moivre to find \\(|z^6| = r^6 = 2^6 =\\)",
        "l_ar": "طبق نظرية ديموافر لإيجاد \\(|z^6| = r^6 = 2^6 =\\)",
        "a": "64",
        "h": "\\(2^6 = 64\\)",
        "h_ar": "\\(2^6 = 64\\)"
      }
    ]
  },
  {
    "t": "mt",
    "ti": "Matching Lab: Complex Number Properties & Operations",
    "ti_ar": "مطابقة: خصائص وعمليات الأعداد المركبة",
    "p": [
      {
        "l": "Modulus \\(|a+bi|\\)",
        "l_ar": "المقياس \\(|a+bi|\\)",
        "r": "√(a² + b²)",
        "r_ar": "√(a² + b²)"
      },
      {
        "l": "Conjugate product \\((a+bi)(a−bi)\\)",
        "l_ar": "ضرب المرافقين \\((a+bi)(a−bi)\\)",
        "r": "a² + b²",
        "r_ar": "a² + b²"
      },
      {
        "l": "Power of i: i⁴ᵏ⁺²",
        "l_ar": "قوى i: i⁴ᵏ⁺²",
        "r": "−1",
        "r_ar": "−1"
      },
      {
        "l": "De Moivre: (cos θ + i sin θ)ⁿ",
        "l_ar": "ديموافر: (cos θ + i sin θ)ⁿ",
        "r": "cos(nθ) + i sin(nθ)",
        "r_ar": "cos(nθ) + i sin(nθ)"
      }
    ]
  },
  {
    "t": "num",
    "ti": "Numeric Lab: Modulus of Complex Product",
    "ti_ar": "إدخال رقمي: مقياس حاصل ضرب عددين مركبين",
    "q": "Calculate the exact squared modulus \\(|z|^2\\) of \\(z = (3 - 4i)(1 + 2i)\\).",
    "q_ar": "احسب القيمة الدقيقة لمربع المقياس \\(|z|^2\\) للعدد المركب \\(z = (3 - 4i)(1 + 2i)\\).",
    "a": 125,
    "tol": 0.01,
    "h": "Use modulus product property: \\(|z_1 z_2|^2 = |z_1|^2 \\times |z_2|^2\\).",
    "h_ar": "استخدم خاصية مقياس حاصل الضرب: \\(|z_1 z_2|^2 = |z_1|^2 \\times |z_2|^2\\).",
    "sol": "\\(|3-4i|^2 = 3^2 + (-4)^2 = 25\\), and \\(|1+2i|^2 = 1^2 + 2^2 = 5\\). So \\(|z|^2 = 25 \\times 5 = 125\\).",
    "sol_ar": "\\(|3-4i|^2 = 3^2 + (-4)^2 = 25\\)، و \\(|1+2i|^2 = 1^2 + 2^2 = 5\\). إذن \\(|z|^2 = 25 \\times 5 = 125\\)."
  },
  {
    "t": "ord",
    "ti": "Complex Division: Ordering Conjugate Simplification",
    "ti_ar": "رتّب الخطوات: تبسيط قسمة الأعداد المركبة باستخدام المرافق",
    "q": "Arrange the steps to simplify the complex quotient \\(\\dfrac{5+i}{2-3i}\\):",
    "q_ar": "رتب خطوات تبسيط قسمة العددين المركبين \\(\\dfrac{5+i}{2-3i}\\):",
    "items": [
      "Identify the complex conjugate of the denominator: \\(2 + 3i\\).",
      "Multiply both numerator and denominator by \\((2 + 3i)\\).",
      "Expand denominator using \\((2-3i)(2+3i) = 2^2 - (3i)^2 = 4 + 9 = 13\\).",
      "Expand numerator using FOIL: \\((5+i)(2+3i) = 10 + 15i + 2i + 3i^2 = 7 + 17i\\).",
      "Separate into standard form \\(a + bi\\): \\(\\frac{7}{13} + \\frac{17}{13}i\\)."
    ],
    "items_ar": [
      "تحديد مرافق المقام المركب: \\(2 + 3i\\).",
      "ضرب كل من البسط والمقام في مرافق المقام \\((2 + 3i)\\).",
      "فك المقام باستخدام \\((2-3i)(2+3i) = 2^2 - (3i)^2 = 4 + 9 = 13\\).",
      "فك البسط بالتوزيع: \\((5+i)(2+3i) = 10 + 15i + 2i + 3i^2 = 7 + 17i\\).",
      "الفصل إلى الصورة القياسية \\(a + bi\\): \\(\\frac{7}{13} + \\frac{17}{13}i\\)."
    ]
  },
  {
    "t": "cat",
    "ti": "Classify Complex Quantities: Real, Purely Imaginary, or Neither",
    "ti_ar": "تصنيف المقادير المركبة: حقيقية بحتة، تخيلية بحتة، أو عامة",
    "categories": [
      "Purely Real",
      "Purely Imaginary",
      "General Complex (a + bi)"
    ],
    "categories_ar": [
      "حقيقي بحت",
      "تخيلي بحت",
      "مركب عام (a + bi)"
    ],
    "items": [
      {
        "s": "\\(z + \\bar{z}\\) for any complex number \\(z = a + bi\\)",
        "s_ar": "\\(z + \\bar{z}\\) لأي عدد مركب \\(z = a + bi\\)",
        "cat": 0
      },
      {
        "s": "\\(i^{40}\\)",
        "s_ar": "\\(i^{40}\\)",
        "cat": 0
      },
      {
        "s": "\\(z - \\bar{z}\\) for any \\(z = a + bi\\) with \\(b \\neq 0\\)",
        "s_ar": "\\(z - \\bar{z}\\) لأي \\(z = a + bi\\) حيث \\(b \\neq 0\\)",
        "cat": 1
      },
      {
        "s": "\\(i^{27}\\)",
        "s_ar": "\\(i^{27}\\)",
        "cat": 1
      },
      {
        "s": "\\((2 + 3i)^2\\)",
        "s_ar": "\\((2 + 3i)^2\\)",
        "cat": 2
      },
      {
        "s": "\\(\\dfrac{4 + i}{1 - i}\\)",
        "s_ar": "\\(\\dfrac{4 + i}{1 - i}\\)",
        "cat": 2
      }
    ]
  },
  {
    "t": "se",
    "ti": "Spot the Error: Complex Conjugate Division & \\(i^2\\) Sign (Complex Numbers)",
    "ti_ar": "اكتشف الخطأ: قسمة الأعداد المركبة وإشارة \\(i^2\\) (الأعداد المركبة ونظرية ديموافر)",
    "q": "A student simplifies \\(\\dfrac{100}{6 - 8i}\\). Which step introduces an algebraic error?",
    "q_ar": "يبسّط طالب الكسر المركب \\(\\dfrac{100}{6 - 8i}\\). أي خطوة تتضمن خطأ جبرياً؟",
    "steps": [
      "Multiply numerator and denominator by the conjugate \\(6 + 8i\\).",
      "Expand the denominator as \\((6)^2 - (8)^2 = -28\\) instead of \\(a^2 - b^2 i^2 = a^2 + b^2 = 100\\).",
      "Divide numerator by the wrong denominator."
    ],
    "steps_ar": [
      "ضرب البسط والمقام في المرافق \\(6 + 8i\\).",
      "فك المقام في صورة \\((6)^2 - (8)^2 = -28\\) بدلاً من \\(a^2 + b^2 = 100\\).",
      "قسمة البسط على المقام الخاطئ."
    ],
    "errorStep": 2,
    "reasons": [
      "Because \\(i^2 = -1\\), \\((a - bi)(a + bi) = a^2 - b^2 i^2 = a^2 + b^2 = 100\\), giving \\(6 + 8i\\).",
      "You should multiply by \\(6 - 8i\\) instead of the conjugate.",
      "\\(i^2\\) equals \\(+1\\)."
    ],
    "reasons_ar": [
      "لأن \\(i^2 = -1\\)، فإن \\((a - bi)(a + bi) = a^2 + b^2 = 100\\)، والناتج الصحيح هو \\(6 + 8i\\).",
      "يجب الضرب في \\(6 - 8i\\) بدلاً من المرافق.",
      "قيمة \\(i^2\\) تساوي \\(+1\\)."
    ],
    "correctReason": 0
  },
  {
    "t": "ms",
    "ti": "Examiner Mode: Modulus, Conjugate Division & De Moivre (Complex Numbers)",
    "ti_ar": "وضع المصحح: المقياس والمرافق ومبرهنة دي موافر (الأعداد المركبة ونظرية ديموافر)",
    "q": "Let \\(z = 6 - 8i\\). (a) Find \\(|z|\\), \\(\\bar{z}\\), and express \\(\\dfrac{100}{z}\\) in \\(x + yi\\) form. (b) Use De Moivre’s theorem to evaluate \\((2 e^{i\\pi/6})^3\\) in Cartesian form.",
    "q_ar": "ليكن \\(z = 6 - 8i\\). (أ) أوجد \\(|z|\\) و\\(\\bar{z}\\) وعبّر عن \\(\\dfrac{100}{z}\\) بالصورة \\(x + yi\\). (ب) استعمل مبرهنة دي موافر لحساب \\((2 e^{i\\pi/6})^3\\) بالصورة الديكارتية.",
    "parts": [
      {
        "label": "Part (a) — Modulus & Conjugate Division",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "\\(|z| = \\sqrt{6^2 + (-8)^2} = 10\\), \\(\\bar{z} = 6 + 8i\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "\\(\\dfrac{100}{z} = \\dfrac{100\\bar{z}}{|z|^2} = 6 + 8i\\)."
          }
        ]
      },
      {
        "label": "Part (b) — De Moivre Evaluation",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "\\((2 e^{i\\pi/6})^3 = 2^3 e^{i(3\\pi/6)} = 8 e^{i\\pi/2}\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "\\(8(\\cos\\frac{\\pi}{2} + i\\sin\\frac{\\pi}{2}) = 8i\\)."
          }
        ]
      }
    ],
    "parts_ar": [
      {
        "label": "الجزء (أ) — المقياس والقسمة بالمرافق",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "\\(|z| = 10\\) والمرافق \\(\\bar{z} = 6 + 8i\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "\\(\\dfrac{100}{z} = 6 + 8i\\)."
          }
        ]
      },
      {
        "label": "الجزء (ب) — تطبيق مبرهنة دي موافر",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "\\((2 e^{i\\pi/6})^3 = 8 e^{i\\pi/2}\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "بالصورة الديكارتية: \\(8(\\cos\\frac{\\pi}{2} + i\\sin\\frac{\\pi}{2}) = 8i\\)."
          }
        ]
      }
    ]
  },
  {
    "t": "qc",
    "ti": "Quick Check: Argand Loci & Complex Identities (Complex Numbers)",
    "ti_ar": "فحص سريع: المحال الهندسية في مستوى أرجاند والأعداد المركبة (الأعداد المركبة ونظرية ديموافر)",
    "q": "Which expression or condition accurately characterizes \\(z \\bar{z}\\) for \\(z = 6 + 8i\\)?",
    "q_ar": "أي عبارة أو شرط يصف بدقة: \\(z \\bar{z}\\) للعدد \\(z = 6 + 8i\\)؟",
    "o": [
      "\\(|z|^2 = 100\\)",
      "Circle centered at \\(z_0\\) with radius \\(R\\)",
      "Perpendicular bisector of segment \\(z_1 z_2\\)",
      "Counterclockwise rotation by \\(90^\\circ\\) (\\(\\pi/2\\) rad)"
    ],
    "o_ar": [
      "\\(|z|^2 = 100\\)",
      "دائرة مركزها \\(z_0\\) ونصف قطرها \\(R\\)",
      "العمود المنصّف للقطعة الواصلة بين \\(z_1\\) و\\(z_2\\)",
      "دوران عكس عقارب الساعة بزاوية \\(90^\\circ\\)"
    ],
    "a": 0,
    "ex": "\\(z \\bar{z}\\) for \\(z = 6 + 8i\\) matches \\(|z|^2 = 100\\).",
    "ex_ar": "\\(z \\bar{z}\\) للعدد \\(z = 6 + 8i\\) يطابق \\(|z|^2 = 100\\)."
  },
  {
    "t": "tf",
    "ti": "True / False: Complex Conjugates, Powers & Roots (Complex Numbers)",
    "ti_ar": "صح أم خطأ: خواص المرافق والقوى المركبة (الأعداد المركبة ونظرية ديموافر)",
    "items": [
      {
        "s": "For real-coefficient polynomials, non-real roots occur in conjugate pairs \\(a \\pm bi\\).",
        "a": true,
        "ex": "Complex Conjugate Root Theorem."
      },
      {
        "s": "\\(i^{4k+2} = -1\\) for every integer \\(k\\).",
        "a": true,
        "ex": "\\(i^{4k} \\cdot i^2 = 1 \\cdot (-1) = -1\\)."
      },
      {
        "s": "The principal argument \\(\\arg(-1 + i)\\) equals \\(-\\pi/4\\).",
        "a": false,
        "ex": "\\(-1 + i\\) lies in Quadrant II, so \\(\\arg(-1 + i) = \\frac{3\\pi}{4}\\)."
      }
    ],
    "items_ar": [
      {
        "s": "في كثيرات الحدود ذات المعاملات الحقيقية، تظهر الجذور المركبة في أزواج مترافقة \\(a \\pm bi\\).",
        "a": true,
        "ex": "مبرهنة الجذور المترافقة."
      },
      {
        "s": "\\(i^{4k+2} = -1\\) لكل عدد صحيح \\(k\\).",
        "a": true,
        "ex": "\\(i^{4k} \\cdot i^2 = 1 \\cdot (-1) = -1\\)."
      },
      {
        "s": "السعة الرئيسية للعدد \\(-1 + i\\) تساوي \\(-\\pi/4\\).",
        "a": false,
        "ex": "النقطة في الربع الثاني، لذا السعة تساوي \\(3\\pi/4\\)."
      }
    ]
  }
];
D["act2l2-matrices-vectors"] = [
  {
    "t": "sb",
    "ti": "Lab Step Builder: 2×2 Matrix Invertibility & Determinant",
    "ti_ar": "بناء الخطوات: قابلية العكس لمصفوفة 2×2 والمحدد",
    "steps": [
      {
        "l": "Compute \\(\\det\\begin{pmatrix}4 & 2 \\\\ 3 & 5\\end{pmatrix} = (4)(5) - (2)(3) =\\)",
        "l_ar": "احسب \\(\\det\\begin{pmatrix}4 & 2 \\\\ 3 & 5\\end{pmatrix} = (4)(5) - (2)(3) =\\)",
        "a": "14",
        "h": "\\(20 - 6 = 14\\)",
        "h_ar": "\\(20 - 6 = 14\\)"
      },
      {
        "l": "Compute the dot product of \\(\\mathbf{u}=\\langle 3, -4 \\rangle\\) and \\(\\mathbf{v}=\\langle 4, 3 \\rangle\\):",
        "l_ar": "احسب الضرب القياسي للمتجهين \\(\\mathbf{u}=\\langle 3, -4 \\rangle\\) و \\(\\mathbf{v}=\\langle 4, 3 \\rangle\\):",
        "a": "0",
        "h": "\\(3(4) + (-4)(3) = 12 - 12 = 0\\)",
        "h_ar": "\\(3(4) + (-4)(3) = 12 - 12 = 0\\)"
      },
      {
        "l": "Are vectors \\(\\mathbf{u}\\) and \\(\\mathbf{v}\\) orthogonal? (yes/no):",
        "l_ar": "هل المتجهان \\(\\mathbf{u}\\) و \\(\\mathbf{v}\\) متعامدان؟ (yes/no):",
        "a": "yes",
        "h": "Dot product is zero, so angle is 90°",
        "h_ar": "الضرب القياسي يساوي صفراً، إذن الزاوية بينهما 90°"
      }
    ]
  },
  {
    "t": "qc",
    "ti": "Lab Check: Vector Magnitude & Unit Vectors",
    "ti_ar": "فحص سريع: طول المتجه ومتجهات الوحدة",
    "q": "What is the unit vector in the direction of \\(\\mathbf{v} = \\langle 5, -12 \\rangle\\)?",
    "q_ar": "ما هو متجه الوحدة في اتجاه المتجه \\(\\mathbf{v} = \\langle 5, -12 \\rangle\\)؟",
    "o": [
      "\\(\\langle \\frac{5}{13}, -\\frac{12}{13} \\rangle\\)",
      "\\(\\langle \\frac{5}{17}, -\\frac{12}{17} \\rangle\\)",
      "\\(\\langle 5, -12 \\rangle\\)",
      "\\(\\langle \\frac{1}{5}, -\\frac{1}{12} \\rangle\\)"
    ],
    "o_ar": [
      "\\(\\langle \\frac{5}{13}, -\\frac{12}{13} \\rangle\\)",
      "\\(\\langle \\frac{5}{17}, -\\frac{12}{17} \\rangle\\)",
      "\\(\\langle 5, -12 \\rangle\\)",
      "\\(\\langle \\frac{1}{5}, -\\frac{1}{12} \\rangle\\)"
    ],
    "a": 0,
    "ex": "\\(|\\mathbf{v}| = \\sqrt{5^2 + (-12)^2} = \\sqrt{25+144} = 13\\). The unit vector is \\(\\mathbf{v}/|\\mathbf{v}| = \\langle 5/13, -12/13 \\rangle\\).",
    "ex_ar": "\\(|\\mathbf{v}| = \\sqrt{5^2 + (-12)^2} = \\sqrt{25+144} = 13\\). إذن متجه الوحدة هو \\(\\mathbf{v}/|\\mathbf{v}| = \\langle 5/13, -12/13 \\rangle\\)."
  },
  {
    "t": "num",
    "ti": "Numeric Lab: Dot Product & Orthogonality",
    "ti_ar": "إدخال رقمي: الضرب القياسي والتعامد",
    "q": "Find the dot product \\(\\mathbf{u}\\cdot\\mathbf{v}\\) for \\(\\mathbf{u} = \\langle 6, -3 \\rangle\\) and \\(\\mathbf{v} = \\langle 4, 8 \\rangle\\).",
    "q_ar": "أوجد حاصل الضرب القياسي \\(\\mathbf{u}\\cdot\\mathbf{v}\\) للمتجهين \\(\\mathbf{u} = \\langle 6, -3 \\rangle\\) و \\(\\mathbf{v} = \\langle 4, 8 \\rangle\\).",
    "a": 0,
    "tol": 0.01,
    "h": "\\(\\mathbf{u}\\cdot\\mathbf{v} = u_1 v_1 + u_2 v_2\\).",
    "h_ar": "\\(\\mathbf{u}\\cdot\\mathbf{v} = u_1 v_1 + u_2 v_2\\).",
    "sol": "\\(\\mathbf{u}\\cdot\\mathbf{v} = (6)(4) + (-3)(8) = 24 - 24 = 0\\). The vectors are orthogonal.",
    "sol_ar": "\\(\\mathbf{u}\\cdot\\mathbf{v} = (6)(4) + (-3)(8) = 24 - 24 = 0\\). المتجهان متعامدان."
  },
  {
    "t": "ord",
    "ti": "Matrix Inversion: Solving Matrix Equations",
    "ti_ar": "رتّب الخطوات: حل المعادلات المصفوفية باستخدام معكوس المصفوفة",
    "q": "Arrange the steps to solve the linear system \\(A\\mathbf{x} = \\mathbf{b}\\) using \\(A^{-1}\\):",
    "q_ar": "رتب خطوات حل النظام الخطي \\(A\\mathbf{x} = \\mathbf{b}\\) باستخدام \\(A^{-1}\\):",
    "items": [
      "Write the system in matrix-vector form \\(A\\mathbf{x} = \\mathbf{b}\\).",
      "Compute the determinant \\(\\det(A) = ad - bc\\) and verify \\(\\det(A) \\neq 0\\).",
      "Form \\(A^{-1} = \\frac{1}{\\det A}\\begin{pmatrix}d & -b \\\\ -c & a\\end{pmatrix}\\).",
      "Pre-multiply both sides: \\(\\mathbf{x} = A^{-1}\\mathbf{b}\\).",
      "Compute matrix-vector multiplication to find \\(x\\) and \\(y\\)."
    ],
    "items_ar": [
      "كتابة النظام الخطي على صورة معادلة مصفوفية \\(A\\mathbf{x} = \\mathbf{b}\\).",
      "حساب المحدد \\(\\det(A) = ad - bc\\) والتحقق من أن \\(\\det(A) \\neq 0\\).",
      "تكوين مصفوفة النظير الضربي \\(A^{-1} = \\frac{1}{\\det A}\\begin{pmatrix}d & -b \\\\ -c & a\\end{pmatrix}\\).",
      "الضرب في النظير الضربي من جهة اليسار لكلا الطرفين: \\(\\mathbf{x} = A^{-1}\\mathbf{b}\\).",
      "حساب ضرب المصفوفة في المتجه لإيجاد قيمتي \\(x\\) و \\(y\\)."
    ]
  },
  {
    "t": "cat",
    "ti": "Matrix Properties: Invertible vs Singular",
    "ti_ar": "تصنيف: المصفوفات القابلة للعكس (المنفردة وغير المنفردة)",
    "categories": [
      "Invertible (det ≠ 0)",
      "Singular (det = 0)"
    ],
    "categories_ar": [
      "لها نظير ضربي (محدد ≠ 0)",
      "منفردة ليس لها نظير (محدد = 0)"
    ],
    "items": [
      {
        "s": "\\(\\begin{pmatrix}3 & 2 \\\\ 1 & 4\\end{pmatrix}\\)",
        "s_ar": "\\(\\begin{pmatrix}3 & 2 \\\\ 1 & 4\\end{pmatrix}\\)",
        "cat": 0
      },
      {
        "s": "\\(\\begin{pmatrix}5 & -2 \\\\ -10 & 4\\end{pmatrix}\\)",
        "s_ar": "\\(\\begin{pmatrix}5 & -2 \\\\ -10 & 4\\end{pmatrix}\\)",
        "cat": 1
      },
      {
        "s": "\\(\\begin{pmatrix}6 & 3 \\\\ 4 & 2\\end{pmatrix}\\)",
        "s_ar": "\\(\\begin{pmatrix}6 & 3 \\\\ 4 & 2\\end{pmatrix}\\)",
        "cat": 1
      },
      {
        "s": "\\(\\begin{pmatrix}1 & 0 \\\\ 0 & 1\\end{pmatrix}\\)",
        "s_ar": "\\(\\begin{pmatrix}1 & 0 \\\\ 0 & 1\\end{pmatrix}\\)",
        "cat": 0
      },
      {
        "s": "\\(\\begin{pmatrix}2 & 7 \\\\ 1 & 3\\end{pmatrix}\\)",
        "s_ar": "\\(\\begin{pmatrix}2 & 7 \\\\ 1 & 3\\end{pmatrix}\\)",
        "cat": 0
      },
      {
        "s": "\\(\\begin{pmatrix}-4 & 6 \\\\ 2 & -3\\end{pmatrix}\\)",
        "s_ar": "\\(\\begin{pmatrix}-4 & 6 \\\\ 2 & -3\\end{pmatrix}\\)",
        "cat": 1
      }
    ]
  },
  {
    "t": "se",
    "ti": "Spot the Error: Matrix Inverse & Non-Commutative Product (Matrices & Vectors)",
    "ti_ar": "اكتشف الخطأ: معكوس المصفوفة وضرب المصفوفات (المصفوفات والمحددات والمتجهات)",
    "q": "A student inverts \\(A = \\begin{pmatrix} 2 & 1 \\\\ 2 & 3 \\end{pmatrix}\\). Which step contains an error?",
    "q_ar": "يحسب طالب معكوس المصفوفة \\(A = \\begin{pmatrix} 2 & 1 \\\\ 2 & 3 \\end{pmatrix}\\). أي خطوة تتضمن خطأ؟",
    "steps": [
      "Compute \\(\\det(A) = (2)(3) - (1)(2) = 4 \\neq 0\\).",
      "Swap main diagonal entries \\(2\\) and \\(3\\).",
      "Leave off-diagonal entries \\(1\\) and \\(2\\) with unchanged positive signs instead of negating them.",
      "Divide by \\(4\\)."
    ],
    "steps_ar": [
      "حساب المحدد \\(\\det(A) = (2)(3) - 2 = 4 \\neq 0\\).",
      "تبديل عنصري القطر الرئيس \\(2\\) و\\(3\\).",
      "ترك عنصري القطر الثانوي \\(1\\) و\\(2\\) بنفس إشارتهما دون تغيير الإشارة.",
      "القسمة على المحدد \\(4\\)."
    ],
    "errorStep": 3,
    "reasons": [
      "For \\(A = \\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix}\\), the adjugate requires swapping \\(a, d\\) AND negating \\(b, c\\): \\(A^{-1} = \\frac{1}{ad-bc}\\begin{pmatrix} d & -b \\\\ -c & a \\end{pmatrix}\\).",
      "You should divide by the trace \\(a + d\\) instead of \\(\\det(A)\\).",
      "\\(\\det(A)\\) is \\(ad + bc\\)."
    ],
    "reasons_ar": [
      "معكوس المصفوفة \\(2 \\times 2\\) يتطلب تبديل القطر الرئيس وتغيير إشارة القطر الثانوي: \\(\\begin{pmatrix} d & -b \\\\ -c & a \\end{pmatrix}\\).",
      "يجب القسمة على الأثر \\(a + d\\) بدلاً من المحدد.",
      "المحدد يساوي \\(ad + bc\\)."
    ],
    "correctReason": 0
  },
  {
    "t": "ms",
    "ti": "Examiner Mode: Dot Product Orthogonality, Determinant & Eigenvalues (Matrices & Vectors)",
    "ti_ar": "وضع المصحح: تعامد المتجهات والمحددات والقيم الذاتية (المصفوفات والمحددات والمتجهات)",
    "q": "Let \\(A = \\begin{pmatrix} 2 & 1 \\\\ 2 & 3 \\end{pmatrix}\\) and vectors \\(\\mathbf{u} = \\langle 2, -3 \\rangle,\\; \\mathbf{v} = \\langle 3, k \\rangle\\). (a) Find \\(k\\) so \\(\\mathbf{u} \\perp \\mathbf{v}\\). (b) Compute \\(\\text{tr}(A)\\), \\(\\det(A)\\), and write the characteristic polynomial \\(\\det(A - \\lambda I) = 0\\).",
    "q_ar": "لتكن \\(A = \\begin{pmatrix} 2 & 1 \\\\ 2 & 3 \\end{pmatrix}\\) والمتجهان \\(\\mathbf{u} = \\langle 2, -3 \\rangle,\\; \\mathbf{v} = \\langle 3, k \\rangle\\). (أ) أوجد \\(k\\) بحيث يتعامد المتجهان. (ب) احسب الأثر والمحدد واكتب المعادلة المميزة.",
    "parts": [
      {
        "label": "Part (a) — Orthogonality via Dot Product",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "Set \\(\\mathbf{u} \\cdot \\mathbf{v} = 6 - 3k = 0\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "\\(k = 2\\)."
          }
        ]
      },
      {
        "label": "Part (b) — Trace, Determinant & Characteristic Equation",
        "marks": 2,
        "rubric": [
          {
            "code": "A1",
            "marks": 1,
            "text": "\\(\\text{tr}(A) = 5\\) and \\(\\det(A) = 4\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "Characteristic polynomial: \\(\\lambda^2 - 5\\lambda + 4 = 0\\)."
          }
        ]
      }
    ],
    "parts_ar": [
      {
        "label": "الجزء (أ) — شرط التعامد بالضرب القياسي",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "وضع \\(\\mathbf{u} \\cdot \\mathbf{v} = 6 - 3k = 0\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "\\(k = 2\\)."
          }
        ]
      },
      {
        "label": "الجزء (ب) — الأثر والمحدد والمعادلة المميزة",
        "marks": 2,
        "rubric": [
          {
            "code": "A1",
            "marks": 1,
            "text": "الأثر \\(\\text{tr}(A) = 5\\) والمحدد \\(\\det(A) = 4\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "المعادلة المميزة: \\(\\lambda^2 - 5\\lambda + 4 = 0\\)."
          }
        ]
      }
    ]
  },
  {
    "t": "mt",
    "ti": "Matching: Vector & Linear Algebra Invariants (Matrices & Vectors)",
    "ti_ar": "مطابقة: أساسيات المتجهات والجبر الخطي (المصفوفات والمحددات والمتجهات)",
    "p": [
      {
        "l": "Orthogonal non-zero vectors \\(\\mathbf{u}, \\mathbf{v}\\)",
        "r": "Dot product \\(\\mathbf{u} \\cdot \\mathbf{v} = 0\\)"
      },
      {
        "l": "Singular (non-invertible) matrix \\(A\\)",
        "r": "\\(\\det(A) = 0\\)"
      },
      {
        "l": "Sum of eigenvalues \\(\\sum \\lambda_i\\)",
        "r": "\\(\\text{tr}(A) = 5\\) for \\(A\\)"
      },
      {
        "l": "Rank–Nullity Theorem (\\(m \\times n\\))",
        "r": "\\(\\text{rank}(A) + \\dim(\\ker A) = n\\)"
      }
    ],
    "p_ar": [
      {
        "l": "تعامد متجهين غير صفريين \\(\\mathbf{u}, \\mathbf{v}\\)",
        "r": "الضرب القياسي \\(\\mathbf{u} \\cdot \\mathbf{v} = 0\\)"
      },
      {
        "l": "مصفوفة منفردة (غير قابلة للعكس)",
        "r": "المحدد \\(\\det(A) = 0\\)"
      },
      {
        "l": "مجموع القيم الذاتية \\(\\sum \\lambda_i\\)",
        "r": "يساوي الأثر \\(\\text{tr}(A) = 5\\)"
      },
      {
        "l": "مبرهنة الرتبة والبطلان (\\(m \\times n\\))",
        "r": "\\(\\text{rank}(A) + \\dim(\\ker A) = n\\)"
      }
    ]
  },
  {
    "t": "qc",
    "ti": "Quick Check: Singular Matrix Parameter (Matrices & Vectors)",
    "ti_ar": "فحص سريع: شرط انعدام محدد المصفوفة (المصفوفات والمحددات والمتجهات)",
    "q": "For what value of \\(k\\) is the matrix \\(\\begin{pmatrix} 2 & 4 \\\\ 3 & k \\end{pmatrix}\\) singular (non-invertible)?",
    "q_ar": "ما قيمة \\(k\\) التي تجعل المصفوفة \\(\\begin{pmatrix} 2 & 4 \\\\ 3 & k \\end{pmatrix}\\) منفردة (غير قابلة للعكس)؟",
    "o": [
      "\\(6\\)",
      "\\(-6\\)",
      "\\(2\\)",
      "\\(0\\)"
    ],
    "o_ar": [
      "\\(6\\)",
      "\\(-6\\)",
      "\\(2\\)",
      "\\(0\\)"
    ],
    "a": 0,
    "ex": "\\(\\det = 2k - 3(4) = 0 \\implies k = 6\\).",
    "ex_ar": "ينعدم المحدد عندما \\(2k - 12 = 0 \\implies k = 6\\)."
  }
];
D["act2l2-sequences-series"] = [
  {
    "t": "fn",
    "ti": "Lab Explorer: Geometric Sequence & Infinite Series",
    "ti_ar": "مستكشف: المتتابعة الهندسية والمتسلسلة اللانهائية",
    "fns": [
      {
        "expr": "a*r^x",
        "color": "#2563eb",
        "label": "a·rˣ"
      }
    ],
    "xrange": [
      0,
      8
    ],
    "yrange": [
      -10,
      20
    ],
    "params": [
      {
        "name": "a",
        "label": "First term a",
        "min": 1,
        "max": 10,
        "step": 1,
        "default": 4
      },
      {
        "name": "r",
        "label": "Common ratio r",
        "min": -1.5,
        "max": 1.5,
        "step": 0.1,
        "default": 0.6
      }
    ]
  },
  {
    "t": "qc",
    "ti": "Lab Check: Infinite Geometric Series Convergence",
    "ti_ar": "فحص سريع: تقارب المتسلسلة الهندسية اللانهائية",
    "q": "Find the exact sum of the infinite series \\(18 + 6 + 2 + \\frac{2}{3} + \\cdots\\)",
    "q_ar": "أوجد المجموع الدقيق للمتسلسلة اللانهائية \\(18 + 6 + 2 + \\frac{2}{3} + \\cdots\\)",
    "o": [
      "27",
      "24",
      "36",
      "DoesNotExist"
    ],
    "o_ar": [
      "27",
      "24",
      "36",
      "غير موجود (متباعدة)"
    ],
    "a": 0,
    "ex": "\\(a_1=18\\), \\(r = 6/18 = 1/3\\). Since \\(|r| < 1\\), \\(S_\\infty = \\dfrac{a}{1-r} = \\dfrac{18}{1 - 1/3} = \\dfrac{18}{2/3} = 27\\).",
    "ex_ar": "\\(a_1=18\\)، و \\(r = 6/18 = 1/3\\). وبما أن \\(|r| < 1\\)، فإن \\(S_\\infty = \\dfrac{a}{1-r} = \\dfrac{18}{1 - 1/3} = \\dfrac{18}{2/3} = 27\\)."
  },
  {
    "t": "num",
    "ti": "Numeric Lab: Infinite Geometric Series Sum",
    "ti_ar": "إدخال رقمي: مجموع متسلسلة هندسية لانهائية متناوبة",
    "q": "Calculate the exact sum of the infinite series \\(36 - 12 + 4 - \\frac{4}{3} + \\cdots\\)",
    "q_ar": "احسب المجموع الدقيق للمتسلسلة الهندسية اللانهائية \\(36 - 12 + 4 - \\frac{4}{3} + \\cdots\\)",
    "a": 27,
    "tol": 0.01,
    "h": "Identify \\(a_1 = 36\\) and \\(r = -12/36 = -1/3\\). Formula: \\(S_\\infty = \\dfrac{a_1}{1 - r}\\).",
    "h_ar": "حدد \\(a_1 = 36\\) و \\(r = -12/36 = -1/3\\). القانون: \\(S_\\infty = \\dfrac{a_1}{1 - r}\\).",
    "sol": "\\(S_\\infty = \\dfrac{36}{1 - (-1/3)} = \\dfrac{36}{4/3} = 36 \\times \\dfrac{3}{4} = 27\\).",
    "sol_ar": "\\(S_\\infty = \\dfrac{36}{1 - (-1/3)} = \\dfrac{36}{4/3} = 36 \\times \\dfrac{3}{4} = 27\\)."
  },
  {
    "t": "ord",
    "ti": "Arithmetic Series: Sum Evaluation Sequence",
    "ti_ar": "رتّب الخطوات: حساب مجموع متسلسلة حسابية منتهية",
    "q": "Arrange the steps to find the sum of the finite arithmetic series \\(5 + 8 + 11 + \\cdots + 95\\):",
    "q_ar": "رتب خطوات إيجاد مجموع المتسلسلة الحسابية المنتهية \\(5 + 8 + 11 + \\cdots + 95\\):",
    "items": [
      "Identify first term \\(a_1 = 5\\), common difference \\(d = 3\\), and last term \\(a_n = 95\\).",
      "Set up the nth term equation: \\(95 = 5 + (n-1)(3)\\).",
      "Solve for number of terms \\(n\\): \\(90 = (n-1)(3) \\implies n - 1 = 30 \\implies n = 31\\).",
      "Apply sum formula \\(S_n = \\frac{n}{2}(a_1 + a_n)\\): \\(S_{31} = \\frac{31}{2}(5 + 95)\\).",
      "Compute final total: \\(S_{31} = \\frac{31}{2}(100) = 31 \\times 50 = 1550\\)."
    ],
    "items_ar": [
      "تحديد الحد الأول \\(a_1 = 5\\)، وأساس المتتابعة \\(d = 3\\)، والحد الأخير \\(a_n = 95\\).",
      "صياغة معادلة الحد النوني: \\(95 = 5 + (n-1)(3)\\).",
      "إيجاد عدد الحدود \\(n\\): \\(90 = (n-1)(3) \\implies n - 1 = 30 \\implies n = 31\\).",
      "تطبيق قانون المجموع \\(S_n = \\frac{n}{2}(a_1 + a_n)\\): \\(S_{31} = \\frac{31}{2}(5 + 95)\\).",
      "حساب المجموع النهائي: \\(S_{31} = \\frac{31}{2}(100) = 31 \\times 50 = 1550\\)."
    ]
  },
  {
    "t": "cat",
    "ti": "Series Classification: Convergent vs Divergent",
    "ti_ar": "تصنيف المتسلسلات: متقاربة مقابل متباعدة",
    "categories": [
      "Converges to Finite Sum",
      "Diverges (No Finite Sum)"
    ],
    "categories_ar": [
      "متقاربة ولها مجموع منتهٍ",
      "متباعدة (ليس لها مجموع منتهٍ)"
    ],
    "items": [
      {
        "s": "\\(\\sum_{k=1}^\\infty 10 \\cdot (0.8)^k\\)",
        "s_ar": "\\(\\sum_{k=1}^\\infty 10 \\cdot (0.8)^k\\)",
        "cat": 0
      },
      {
        "s": "\\(\\sum_{k=1}^\\infty 5 \\cdot (1.2)^k\\)",
        "s_ar": "\\(\\sum_{k=1}^\\infty 5 \\cdot (1.2)^k\\)",
        "cat": 1
      },
      {
        "s": "\\(\\sum_{k=1}^\\infty 12 \\cdot (-0.5)^k\\)",
        "s_ar": "\\(\\sum_{k=1}^\\infty 12 \\cdot (-0.5)^k\\)",
        "cat": 0
      },
      {
        "s": "\\(100 + 50 + 25 + 12.5 + \\cdots\\)",
        "s_ar": "\\(100 + 50 + 25 + 12.5 + \\cdots\\)",
        "cat": 0
      },
      {
        "s": "\\(3 + 6 + 9 + 12 + \\cdots\\) (Arithmetic with d > 0)",
        "s_ar": "\\(3 + 6 + 9 + 12 + \\cdots\\) (حسابية أساسها d > 0)",
        "cat": 1
      },
      {
        "s": "\\(\\sum_{k=1}^\\infty 4 \\cdot (-1)^k\\)",
        "s_ar": "\\(\\sum_{k=1}^\\infty 4 \\cdot (-1)^k\\)",
        "cat": 1
      }
    ]
  },
  {
    "t": "se",
    "ti": "Spot the Error: Infinite Geometric Series Convergence Check (Sequences & Series)",
    "ti_ar": "اكتشف الخطأ: شرط تقارب المتسلسلة الهندسية اللانهائية (المتتابعات والمتسلسلات الحسابية والهندسية)",
    "q": "A student applies \\(S_\\infty = \\dfrac{a}{1 - r}\\) to \\(18 + 36 + 72 + \\cdots\\). Where does the reasoning fail?",
    "q_ar": "يطبّق طالب صيغة \\(S_\\infty = \\dfrac{a}{1 - r}\\) على المتسلسلة \\(18 + 36 + 72 + \\cdots\\). أين موضع الخطأ؟",
    "steps": [
      "Identify first term \\(a = 18\\) and common ratio \\(r = 2\\).",
      "Substitute directly into \\(S_\\infty = \\frac{18}{1 - 2} = -18\\).",
      "Conclude the sum of positive growing terms equals \\(-18\\)."
    ],
    "steps_ar": [
      "تحديد الحد الأول \\(a = 18\\) والأساس \\(r = 2\\).",
      "التعويض المباشر في القانون \\(S_\\infty = \\frac{18}{1 - 2} = -18\\).",
      "استنتاج أن مجموع حدود موجبة متزايدة يساوي \\(-18\\)."
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
    "ti": "Examiner Mode: Convergent Geometric & Arithmetic Series (Sequences & Series)",
    "ti_ar": "وضع المصحح: المتتاليات الحسابية والهندسية المتقاربة (المتتابعات والمتسلسلات الحسابية والهندسية)",
    "q": "(a) A geometric series has first term \\(a = 18\\) and common ratio \\(r = \\frac{1}{3}\\). Verify convergence and find \\(S_\\infty\\). (b) An arithmetic progression has \\(u_1 = 18\\) and common difference \\(d = 4\\); find \\(u_{10}\\).",
    "q_ar": "(أ) متسلسلة هندسية حدها الأول \\(a = 18\\) وأساسها \\(r = \\frac{1}{3}\\). تحقق من التقارب وأوجد \\(S_\\infty\\). (ب) متتالية حسابية حدها الأول \\(18\\) وأساسها \\(d = 4\\)؛ أوجد الحد العاشر \\(u_{10}\\).",
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
            "text": "\\(S_\\infty = \\dfrac{18}{1 - 1/3} = \\dfrac{18}{2/3} = 27\\)."
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
            "text": "\\(u_{10} = 18 + 9(4) = 54\\)."
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
            "text": "\\(S_\\infty = \\dfrac{18}{1 - 1/3} = 27\\)."
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
            "text": "\\(u_{10} = 18 + 9(4) = 54\\)."
          }
        ]
      }
    ]
  },
  {
    "t": "sb",
    "ti": "Step Builder: Geometric Sum to Infinity & AP Term (Sequences & Series)",
    "ti_ar": "بناء الخطوات: مجموع اللانهاية والحد النوني (المتتابعات والمتسلسلات الحسابية والهندسية)",
    "steps": [
      {
        "l": "For \\(a = 18\\) and \\(r = \\frac{1}{3}\\), compute the second term \\(a r =\\)",
        "a": "6",
        "h": "Divide 18 by 3."
      },
      {
        "l": "Compute the sum to infinity \\(S_\\infty = \\frac{18}{1 - 1/3} =\\)",
        "a": "27",
        "h": "Multiply 18 by 3/2."
      },
      {
        "l": "In the AP with \\(u_1 = 18,\\; d = 4\\), find \\(u_{10} =\\)",
        "a": "54",
        "h": "Compute 18 + 9×4."
      }
    ],
    "steps_ar": [
      {
        "l": "لمتتالية هندسية فيها \\(a = 18\\) و\\(r = \\frac{1}{3}\\)، احسب الحد الثاني \\(ar =\\)",
        "a": "6",
        "h": "اقسم 18 على 3."
      },
      {
        "l": "احسب المجموع إلى اللانهاية \\(S_\\infty = \\frac{18}{1 - 1/3} =\\)",
        "a": "27",
        "h": "اضرب 18 في 3/2."
      },
      {
        "l": "في المتتالية الحسابية \\(u_1 = 18,\\; d = 4\\)، أوجد \\(u_{10} =\\)",
        "a": "54",
        "h": "احسب 18 + 9×4."
      }
    ]
  },
  {
    "t": "mt",
    "ti": "Matching: Sequence, Series & Expansion Formulas (Sequences & Series)",
    "ti_ar": "مطابقة: صيغ المتتاليات والمتسلسلات وذي الحدين (المتتابعات والمتسلسلات الحسابية والهندسية)",
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
D["act2l2-advanced-functions-equations"] = [
  {
    "t": "fn",
    "ti": "Lab Explorer: Rational Function & Asymptotes",
    "ti_ar": "مستكشف: الدوال النسبية وخطوط التقارب",
    "fns": [
      {
        "expr": "(a*x+2)/(x-c)",
        "color": "#0d9488",
        "label": "(ax+2)/(x-c)"
      }
    ],
    "xrange": [
      -8,
      8
    ],
    "yrange": [
      -10,
      10
    ],
    "params": [
      {
        "name": "a",
        "label": "Numerator slope a (horizontal asymptote)",
        "min": -3,
        "max": 3,
        "step": 1,
        "default": 2
      },
      {
        "name": "c",
        "label": "Denominator root c (vertical asymptote)",
        "min": -4,
        "max": 4,
        "step": 1,
        "default": 1
      }
    ]
  },
  {
    "t": "tf",
    "ti": "Reasoning Lab: Polynomial Roots & Graph Symmetries",
    "ti_ar": "مختبر التفكير المنطقي: أصفار كثيرات الحدود وتماثل المنحنيات",
    "items": [
      {
        "s": "A polynomial of degree 5 with real coefficients must have at least one real zero.",
        "s_ar": "أي كثيرة حدود من الدرجة 5 بمعاملات حقيقية يجب أن تمتلك جذراً حقيقياً واحداً على الأقل.",
        "a": true,
        "ex": "Non-real complex roots occur in conjugate pairs, so degree 5 has at least 1 real root.",
        "ex_ar": "الجذور المركبة غير الحقيقية تظهر في أزواج مترافقة، لذا فإن كثيرة الحدود الفردية الدرجة لها جذر حقيقي واحد على الأقل."
      },
      {
        "s": "An even function satisfies \\(f(-x) = -f(x)\\).",
        "s_ar": "الدالة الزوجية تحقق العلاقة \\(f(-x) = -f(x)\\).",
        "a": false,
        "ex": "Even functions satisfy \\(f(-x) = f(x)\\) and are symmetric about the y-axis.",
        "ex_ar": "الدوال الزوجية تحقق \\(f(-x) = f(x)\\) وتكون متماثلة حول المحور y."
      },
      {
        "s": "The graph of \\(y = \\log_b(x-3)\\) has a vertical asymptote at \\(x = 3\\).",
        "s_ar": "منحنى الدالة \\(y = \\log_b(x-3)\\) له خط تقارب رأسي عند \\(x = 3\\).",
        "a": true,
        "ex": "The argument must be strictly positive: \\(x-3 > 0 \\Rightarrow x > 3\\).",
        "ex_ar": "ما بداخل اللوغاريتم يجب أن يكون موجباً تماماً: \\(x-3 > 0 \\Rightarrow x > 3\\)."
      }
    ]
  },
  {
    "t": "num",
    "ti": "Numeric Lab: Evaluating Composite Functions",
    "ti_ar": "إدخال رقمي: حساب قيمة الدوال المركبة",
    "q": "Let \\(f(x) = 2x^2 - 3\\) and \\(g(x) = \\sqrt{x + 7}\\). Find the value of \\((f \\circ g)(9)\\).",
    "q_ar": "لتكن \\(f(x) = 2x^2 - 3\\) و \\(g(x) = \\sqrt{x + 7}\\). أوجد قيمة \\((f \\circ g)(9)\\).",
    "a": 29,
    "tol": 0.01,
    "h": "Compute inside first: \\(g(9) = \\sqrt{9+7} = \\sqrt{16} = 4\\). Then find \\(f(4)\\).",
    "h_ar": "احسب الدالة الداخلية أولاً: \\(g(9) = \\sqrt{9+7} = \\sqrt{16} = 4\\). ثم احسب \\(f(4)\\).",
    "sol": "\\(g(9) = \\sqrt{16} = 4\\). Then \\(f(4) = 2(4)^2 - 3 = 2(16) - 3 = 32 - 3 = 29\\).",
    "sol_ar": "\\(g(9) = \\sqrt{16} = 4\\). ومن ثم \\(f(4) = 2(4)^2 - 3 = 2(16) - 3 = 32 - 3 = 29\\)."
  },
  {
    "t": "ord",
    "ti": "Rational Equations: Eliminating Extraneous Solutions",
    "ti_ar": "رتّب الخطوات: استبعاد الحلول الدخيلة في المعادلات النسبية",
    "q": "Arrange the steps to solve \\(\\dfrac{x}{x-3} = \\dfrac{3}{x-3} + 2\\):",
    "q_ar": "رتب خطوات حل المعادلة النسبية \\(\\dfrac{x}{x-3} = \\dfrac{3}{x-3} + 2\\):",
    "items": [
      "Note domain restriction: \\(x - 3 \\neq 0 \\implies x \\neq 3\\).",
      "Multiply entire equation by LCD \\((x - 3)\\): \\(x = 3 + 2(x - 3)\\).",
      "Distribute and simplify: \\(x = 3 + 2x - 6 \\implies x = 2x - 3\\).",
      "Solve linear equation: \\(-x = -3 \\implies x = 3\\).",
      "Compare solution against restriction: \\(x = 3\\) is extraneous; conclusion is No Solution."
    ],
    "items_ar": [
      "تحديد قيود المجال: \\(x - 3 \\neq 0 \\implies x \\neq 3\\).",
      "ضرب المعادلة بأكملها في المضاعف المشترك الأصغر للمقامات \\((x - 3)\\): \\(x = 3 + 2(x - 3)\\).",
      "فك الأقواس والتبسيط: \\(x = 3 + 2x - 6 \\implies x = 2x - 3\\).",
      "حل المعادلة الخطية: \\(-x = -3 \\implies x = 3\\).",
      "مقارنة الحل بقيود المجال: القيمة \\(x = 3\\) حل دخيل؛ والنتيجة هي أنه لا يوجد حل حقيقي."
    ]
  },
  {
    "t": "cat",
    "ti": "Symmetry Classification: Even, Odd, or Neither",
    "ti_ar": "تصنيف التماثل: دالة زوجية، فردية، أو ليست أياً منهما",
    "categories": [
      "Even (f(-x) = f(x))",
      "Odd (f(-x) = -f(x))",
      "Neither"
    ],
    "categories_ar": [
      "زوجية (f(-x) = f(x))",
      "فردية (f(-x) = -f(x))",
      "ليست زوجية ولا فردية"
    ],
    "items": [
      {
        "s": "\\(f(x) = x^4 + 3x^2 - 5\\)",
        "s_ar": "\\(f(x) = x^4 + 3x^2 - 5\\)",
        "cat": 0
      },
      {
        "s": "\\(f(x) = x^3 - 4x\\)",
        "s_ar": "\\(f(x) = x^3 - 4x\\)",
        "cat": 1
      },
      {
        "s": "\\(f(x) = x^3 + x^2\\)",
        "s_ar": "\\(f(x) = x^3 + x^2\\)",
        "cat": 2
      },
      {
        "s": "\\(f(x) = \\cos(x)\\)",
        "s_ar": "\\(f(x) = \\cos(x)\\)",
        "cat": 0
      },
      {
        "s": "\\(f(x) = \\sin(x)\\)",
        "s_ar": "\\(f(x) = \\sin(x)\\)",
        "cat": 1
      },
      {
        "s": "\\(f(x) = 2^x\\)",
        "s_ar": "\\(f(x) = 2^x\\)",
        "cat": 2
      }
    ]
  },
  {
    "t": "se",
    "ti": "Spot the Error: Composite Order & Inverse Domain (Advanced Functions & Equations)",
    "ti_ar": "اكتشف الخطأ: ترتيب تركيب الدوال ومجال المعكوس (الدوال والمعادلات المتقدمة)",
    "q": "Let \\(f(x) = 4x + 4\\) and \\(g(x) = x^2 + 1\\). A student evaluates \\((f \\circ g)(4)\\). Which step is wrong?",
    "q_ar": "لتكن \\(f(x) = 4x + 4\\) و\\(g(x) = x^2 + 1\\). يحسب طالب \\((f \\circ g)(4)\\). أي خطوة خاطئة؟",
    "steps": [
      "Write \\((f \\circ g)(4) = g(f(4))\\) by applying \\(f\\) first instead of \\(g\\).",
      "Compute \\(f(4) = 20\\).",
      "Square and add \\(1\\) to get \\(401\\)."
    ],
    "steps_ar": [
      "كتابة \\((f \\circ g)(4) = g(f(4))\\) بتطبيق \\(f\\) أولاً بدلاً من \\(g\\).",
      "حساب \\(f(4) = 20\\).",
      "التربيع وإضافة \\(1\\) للحصول على \\(401\\)."
    ],
    "errorStep": 1,
    "reasons": [
      "By definition \\((f \\circ g)(x) = f(g(x))\\): evaluate the inner function \\(g(4) = 17\\) first, then \\(f(17) = 72\\).",
      "Function composition is always commutative.",
      "You must multiply \\(f(4)\\) by \\(g(4)\\)."
    ],
    "reasons_ar": [
      "حسب التعريف \\((f \\circ g)(x) = f(g(x))\\): نحسب الدالة الداخلية أولاً \\(g(4) = 17\\) ثم \\(f(17) = 72\\).",
      "تركيب الدوال عملية إبدالية دائماً.",
      "يجب ضرب \\(f(4)\\) في \\(g(4)\\)."
    ],
    "correctReason": 0
  },
  {
    "t": "ms",
    "ti": "Examiner Mode: One-to-One Domain Restriction & Inverse (Advanced Functions & Equations)",
    "ti_ar": "وضع المصحح: تقييد المجال وإيجاد الدالة العكسية (الدوال والمعادلات المتقدمة)",
    "q": "Let \\(h(x) = (x - 4)^2 + 4\\) for \\(x \\ge 4\\). (a) State the range of \\(h\\) and explain why \\(h^{-1}\\) exists on \\(x \\ge 4\\). (b) Find \\(h^{-1}(x)\\) and state its domain.",
    "q_ar": "لتكن \\(h(x) = (x - 4)^2 + 4\\) حيث \\(x \\ge 4\\). (أ) اذكر مدى \\(h\\) وفسّر سبب وجود معكوس لها. (ب) أوجد \\(h^{-1}(x)\\) وحدد مجالها.",
    "parts": [
      {
        "label": "Part (a) — Range & Injectivity",
        "marks": 2,
        "rubric": [
          {
            "code": "B1",
            "marks": 1,
            "text": "Range of \\(h\\) is \\([ 4, \\infty )\\) since \\((x - 4)^2 \\ge 0\\)."
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
            "text": "Solve \\(y = (x - 4)^2 + 4 \\implies x = 4 + \\sqrt{y - 4}\\) (choosing \\(+\\) branch for \\(x \\ge 4\\))."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "\\(h^{-1}(x) = 4 + \\sqrt{x - 4}\\) with domain \\(x \\ge 4\\)."
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
            "text": "مدى الدالة \\(h\\) هو \\([ 4, \\infty )\\) لأن \\((x - 4)^2 \\ge 0\\)."
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
            "text": "حل المعادلة بدلالة \\(x\\) مع اختيار الفرع الموجب: \\(x = 4 + \\sqrt{y - 4}\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "\\(h^{-1}(x) = 4 + \\sqrt{x - 4}\\) ومجالها \\(x \\ge 4\\)."
          }
        ]
      }
    ]
  },
  {
    "t": "sb",
    "ti": "Step Builder: Composite & Inverse Function Evaluation (Advanced Functions & Equations)",
    "ti_ar": "بناء الخطوات: حساب التركيب والمعكوس (الدوال والمعادلات المتقدمة)",
    "steps": [
      {
        "l": "For \\(f(x) = 4x + 4\\) and \\(g(x) = x^2 + 1\\), find \\(g(4) =\\)",
        "a": "17",
        "h": "Compute 4² + 1."
      },
      {
        "l": "Now evaluate \\(f(g(4)) = f(17) =\\)",
        "a": "72",
        "h": "Compute 4×17 + 4."
      },
      {
        "l": "Evaluate \\(f^{-1}(16) =\\)",
        "a": "3",
        "h": "Solve 4x + 4 = 16."
      }
    ],
    "steps_ar": [
      {
        "l": "للدالتين \\(f(x) = 4x + 4\\) و\\(g(x) = x^2 + 1\\)، أوجد \\(g(4) =\\)",
        "a": "17",
        "h": "احسب 4² + 1."
      },
      {
        "l": "الآن احسب \\(f(g(4)) = f(17) =\\)",
        "a": "72",
        "h": "احسب 4×17 + 4."
      },
      {
        "l": "أوجد قيمة المعكوس \\(f^{-1}(16) =\\)",
        "a": "3",
        "h": "حل المعادلة 4x + 4 = 16."
      }
    ]
  },
  {
    "t": "mt",
    "ti": "Matching: Function Transformations & Inverse Rules (Advanced Functions & Equations)",
    "ti_ar": "مطابقة: تحويلات الدوال وقواعد المعكوس (الدوال والمعادلات المتقدمة)",
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
        "l": "Transformation \\(y = f(x - 4) + 4\\)",
        "r": "Shift right \\(4\\) units and up \\(4\\) units"
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
        "l": "التحويل \\(y = f(x - 4) + 4\\)",
        "r": "إزاحة لليمين \\(4\\) وحدات ولأعلى \\(4\\) وحدات"
      },
      {
        "l": "منحنى القيمة المطلقة \\(y = |f(x)|\\)",
        "r": "يعكس الأجزاء السالبة \\(f(x) < 0\\) فوق محور السينات"
      }
    ]
  }
];
D["act2l2-trig-polar"] = [
  {
    "t": "fn",
    "ti": "Lab Explorer: Sinusoidal Amplitude & Frequency Lab",
    "ti_ar": "مستكشف: سعة وتردد الدوال الجيبية",
    "fns": [
      {
        "expr": "A*sin(B*x)",
        "color": "#7c3aed",
        "label": "A·sin(Bx)"
      }
    ],
    "xrange": [
      -3.14,
      6.28
    ],
    "yrange": [
      -5,
      5
    ],
    "params": [
      {
        "name": "A",
        "label": "Amplitude A",
        "min": 0.5,
        "max": 4,
        "step": 0.5,
        "default": 2
      },
      {
        "name": "B",
        "label": "Frequency B",
        "min": 0.5,
        "max": 3,
        "step": 0.5,
        "default": 1
      }
    ]
  },
  {
    "t": "mt",
    "ti": "Matching Lab: Polar-Rectangular Conversions & Trig Identities",
    "ti_ar": "مطابقة: التحويلات القطبية والديكارتية والمتطابقات المثلثية",
    "p": [
      {
        "l": "x in polar coordinates",
        "l_ar": "x بالإحداثيات القطبية",
        "r": "r cos θ",
        "r_ar": "r cos θ"
      },
      {
        "l": "y in polar coordinates",
        "l_ar": "y بالإحداثيات القطبية",
        "r": "r sin θ",
        "r_ar": "r sin θ"
      },
      {
        "l": "Double angle sin(2θ)",
        "l_ar": "ضعف الزاوية sin(2θ)",
        "r": "2 sin θ cos θ",
        "r_ar": "2 sin θ cos θ"
      },
      {
        "l": "Double angle cos(2θ)",
        "l_ar": "ضعف الزاوية cos(2θ)",
        "r": "cos² θ − sin² θ",
        "r_ar": "cos² θ − sin² θ"
      }
    ]
  },
  {
    "t": "num",
    "ti": "Numeric Lab: Polar Radius from Cartesian Coordinates",
    "ti_ar": "إدخال رقمي: نصف القطر القطبي من الإحداثيات الديكارتية",
    "q": "Convert the rectangular coordinates \\((-5, 12)\\) to polar coordinates \\((r, \\theta)\\). What is the exact value of \\(r\\)?",
    "q_ar": "حوّل الإحداثيات الديكارتية \\((-5, 12)\\) إلى إحداثيات قطبية \\((r, \\theta)\\). ما هي القيمة الدقيقة لنصف القطر \\(r\\)؟",
    "a": 13,
    "tol": 0.01,
    "h": "\\(r = \\sqrt{x^2 + y^2}\\).",
    "h_ar": "\\(r = \\sqrt{x^2 + y^2}\\).",
    "sol": "\\(r = \\sqrt{(-5)^2 + 12^2} = \\sqrt{25 + 144} = \\sqrt{169} = 13\\).",
    "sol_ar": "\\(r = \\sqrt{(-5)^2 + 12^2} = \\sqrt{25 + 144} = \\sqrt{169} = 13\\)."
  },
  {
    "t": "ord",
    "ti": "Oblique Triangles: Solving SAS with Law of Cosines",
    "ti_ar": "رتّب الخطوات: حل مثلث بمعلومية ضلعين وزاوية محصورة (SAS) بقانون جيوب التمام",
    "q": "Arrange the steps to solve an SAS triangle with sides \\(b, c\\) and included angle \\(A\\):",
    "q_ar": "رتب خطوات حل مثلث حالة SAS أطوال أضلاعه \\(b, c\\) والزاوية المحصورة بينهما \\(A\\):",
    "items": [
      "Identify the included angle \\(A\\) and opposite unknown side \\(a\\).",
      "Apply Law of Cosines: \\(a^2 = b^2 + c^2 - 2bc\\cos A\\).",
      "Evaluate right-hand side using given numerical values.",
      "Take positive square root to find side length \\(a = \\sqrt{a^2}\\).",
      "Use Law of Sines \\(\\frac{\\sin B}{b} = \\frac{\\sin A}{a}\\) to find remaining acute angle \\(B\\)."
    ],
    "items_ar": [
      "تحديد الزاوية المحصورة \\(A\\) والضلع المقابل المجهول \\(a\\).",
      "تطبيق قانون جيوب التمام: \\(a^2 = b^2 + c^2 - 2bc\\cos A\\).",
      "حساب الطرف الأيمن بالتعويض بالقيم العددية المعطاة.",
      "أخذ الجذر التربيعي الموجب لإيجاد طول الضلع \\(a = \\sqrt{a^2}\\).",
      "استخدام قانون الجيوب \\(\\frac{\\sin B}{b} = \\frac{\\sin A}{a}\\) لإيجاد الزاوية الحادة المتبقية \\(B\\)."
    ]
  },
  {
    "t": "cat",
    "ti": "Coordinate Form: Polar vs Cartesian Equations",
    "ti_ar": "تصنيف المعادلات: صيغة قطبية مقابل صيغة ديكارتية",
    "categories": [
      "Cartesian Equation",
      "Polar Equation"
    ],
    "categories_ar": [
      "معادلة ديكارتية (كارتيزية)",
      "معادلة قطبية"
    ],
    "items": [
      {
        "s": "\\(x^2 + y^2 = 25\\)",
        "s_ar": "\\(x^2 + y^2 = 25\\)",
        "cat": 0
      },
      {
        "s": "\\(r = 5\\)",
        "s_ar": "\\(r = 5\\)",
        "cat": 1
      },
      {
        "s": "\\(y = 3x - 2\\)",
        "s_ar": "\\(y = 3x - 2\\)",
        "cat": 0
      },
      {
        "s": "\\(r = 4\\cos\\theta\\)",
        "s_ar": "\\(r = 4\\cos\\theta\\)",
        "cat": 1
      },
      {
        "s": "\\(\\theta = \\frac{\\pi}{3}\\)",
        "s_ar": "\\(\\theta = \\frac{\\pi}{3}\\)",
        "cat": 1
      },
      {
        "s": "\\(\\frac{x^2}{9} + \\frac{y^2}{4} = 1\\)",
        "s_ar": "\\(\\frac{x^2}{9} + \\frac{y^2}{4} = 1\\)",
        "cat": 0
      }
    ]
  },
  {
    "t": "se",
    "ti": "Spot the Error: Parametric Second Derivative & Polar Area (Trigonometry & Polar Coordinates)",
    "ti_ar": "اكتشف الخطأ: المشتقة البارامترية ومساحة القطاع القطبي (حساب المثلثات والإحداثيات القطبية)",
    "q": "For \\(x(t) = t^2,\\; y(t) = t^3\\), a student computes \\(\\dfrac{d^2y}{dx^2}\\). Which step is invalid?",
    "q_ar": "للمنحنى البارامتري \\(x(t) = t^2,\\; y(t) = t^3\\)، يحسب طالب \\(\\dfrac{d^2y}{dx^2}\\). أي خطوة خاطئة؟",
    "steps": [
      "Compute \\(\\frac{dy}{dx} = \\frac{dy/dt}{dx/dt} = \\frac{3t^2}{2t} = \\frac{3}{2}t\\) for \\(t \\neq 0\\).",
      "Differentiate \\(\\frac{dy}{dx}\\) with respect to \\(t\\): \\(\\frac{d}{dt}\\left(\\frac{3}{2}t\\right) = \\frac{3}{2}\\).",
      "Claim \\(\\frac{d^2y}{dx^2} = \\frac{y''(t)}{x''(t)} = \\frac{6t}{2} = 3t\\) instead of dividing \\(\\frac{d}{dt}(dy/dx)\\) by \\(\\frac{dx}{dt}\\)."
    ],
    "steps_ar": [
      "حساب المشتقة الأولى \\(\\frac{dy}{dx} = \\frac{3t^2}{2t} = \\frac{3}{2}t\\) حيث \\(t \\neq 0\\).",
      "اشتقاق \\(\\frac{dy}{dx}\\) بالنسبة إلى \\(t\\): الناتج \\(\\frac{3}{2}\\).",
      "الادعاء بأن \\(\\frac{d^2y}{dx^2} = \\frac{y''(t)}{x''(t)} = 3t\\) بدلاً من قسمة \\(\\frac{d}{dt}(dy/dx)\\) على \\(\\frac{dx}{dt}\\)."
    ],
    "errorStep": 3,
    "reasons": [
      "By the Chain Rule, \\(\\frac{d^2y}{dx^2} = \\frac{\\frac{d}{dt}(dy/dx)}{dx/dt} = \\frac{3/2}{2t} = \\frac{3}{4t}\\), NOT \\(\\frac{y''(t)}{x''(t)}\\).",
      "\\(\\frac{dy}{dx}\\) equals \\(dx/dt\\) divided by \\(dy/dt\\).",
      "Parametric curves do not have second derivatives."
    ],
    "reasons_ar": [
      "بقاعدة السلسلة \\(\\frac{d^2y}{dx^2} = \\frac{\\frac{d}{dt}(dy/dx)}{dx/dt} = \\frac{3}{4t}\\) وليس خارج قسمة \\(y''(t)\\) على \\(x''(t)\\).",
      "المشتقة الأولى تساوي \\(dx/dt\\) مقسوماً على \\(dy/dt\\).",
      "المنحنيات البارامترية ليس لها مشتقة ثانية."
    ],
    "correctReason": 0
  },
  {
    "t": "ms",
    "ti": "Examiner Mode: Parametric Slope & Polar Conversion (Trigonometry & Polar Coordinates)",
    "ti_ar": "وضع المصحح: ميل المنحنى البارامتري والتحويل القطبي (حساب المثلثات والإحداثيات القطبية)",
    "q": "(a) A particle moves with \\(x(t) = t^2\\) and \\(y(t) = t^3 - 5t\\). Find \\(\\dfrac{dy}{dx}\\) at \\(t = 2\\). (b) Convert the polar point \\((r, \\theta) = (8, \\frac{\\pi}{3})\\) to exact Cartesian coordinates.",
    "q_ar": "(أ) يتحرك جسيم وفق \\(x(t) = t^2\\) و\\(y(t) = t^3 - 5t\\). أوجد \\(\\dfrac{dy}{dx}\\) عند \\(t = 2\\). (ب) حوّل النقطة القطبية \\((8, \\frac{\\pi}{3})\\) إلى الإحداثيات الديكارتية الدقيقة.",
    "parts": [
      {
        "label": "Part (a) — Parametric Tangent Slope",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "\\(x'(2) = 4,\\; y'(2) = 12 - 5 = 7\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "\\(\\left.\\dfrac{dy}{dx}\\right|_{t=2} = \\dfrac{7}{4}\\)."
          }
        ]
      },
      {
        "label": "Part (b) — Polar-to-Cartesian Coordinates",
        "marks": 2,
        "rubric": [
          {
            "code": "A1",
            "marks": 1,
            "text": "\\(x = 8\\cos(\\pi/3) = 4\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "\\(y = 8\\sin(\\pi/3) = 4\\sqrt{3}\\)."
          }
        ]
      }
    ],
    "parts_ar": [
      {
        "label": "الجزء (أ) — ميل المماس البارامتري",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "\\(x'(2) = 4,\\; y'(2) = 7\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "\\(\\left.\\dfrac{dy}{dx}\\right|_{t=2} = \\dfrac{7}{4}\\)."
          }
        ]
      },
      {
        "label": "الجزء (ب) — التحويل إلى الإحداثيات الديكارتية",
        "marks": 2,
        "rubric": [
          {
            "code": "A1",
            "marks": 1,
            "text": "\\(x = 8\\cos(\\pi/3) = 4\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "\\(y = 8\\sin(\\pi/3) = 4\\sqrt{3}\\)."
          }
        ]
      }
    ]
  },
  {
    "t": "sb",
    "ti": "Step Builder: Polar Coordinates & Parametric Speed (Trigonometry & Polar Coordinates)",
    "ti_ar": "بناء الخطوات: الإحداثيات القطبية والسرعة البارامترية (حساب المثلثات والإحداثيات القطبية)",
    "steps": [
      {
        "l": "For polar point \\((8, \\pi/3)\\), compute \\(x = r\\cos(\\pi/3) =\\)",
        "a": "4",
        "h": "cos(π/3) = 1/2."
      },
      {
        "l": "If \\(x'(t) = 3\\) and \\(y'(t) = 4\\), find instantaneous speed \\(\\|\\mathbf{v}\\| =\\)",
        "a": "5",
        "h": "Compute √(3² + 4²)."
      },
      {
        "l": "How many petals does the polar rose \\(r = \\sin(3\\theta)\\) have?",
        "a": "3",
        "h": "Odd k gives k petals."
      }
    ],
    "steps_ar": [
      {
        "l": "للنقطة القطبية \\((8, \\pi/3)\\)، احسب \\(x = r\\cos(\\pi/3) =\\)",
        "a": "4",
        "h": "cos(π/3) = 1/2."
      },
      {
        "l": "إذا كان \\(x'(t) = 3\\) و\\(y'(t) = 4\\)، فأوجد مقدار السرعة \\(\\|\\mathbf{v}\\| =\\)",
        "a": "5",
        "h": "احسب √(3² + 4²)."
      },
      {
        "l": "كم عدد بتلات الوردة القطبية \\(r = \\sin(3\\theta)\\)؟",
        "a": "3",
        "h": "عندما يكون k فردياً يكون عدد البتلات k."
      }
    ]
  },
  {
    "t": "qc",
    "ti": "Quick Check: Parametric & Polar Formulas (Trigonometry & Polar Coordinates)",
    "ti_ar": "فحص سريع: قوانين المعادلات البارامترية والقطبية (حساب المثلثات والإحداثيات القطبية)",
    "q": "Which expression or condition accurately characterizes Parametric slope \\(dy/dx\\)?",
    "q_ar": "أي عبارة أو شرط يصف بدقة: ميل المماس البارامتري \\(dy/dx\\)؟",
    "o": [
      "\\(\\dfrac{dy/dt}{dx/dt}\\)",
      "\\(\\sqrt{(dx/dt)^2 + (dy/dt)^2}\\)",
      "\\(\\dfrac{1}{2}\\int_{\\alpha}^{\\beta} [r(\\theta)]^2\\,d\\theta\\)",
      "Circle of diameter \\(8\\) centered at \\((4, 0)\\)"
    ],
    "o_ar": [
      "\\(\\dfrac{dy/dt}{dx/dt}\\)",
      "\\(\\sqrt{(dx/dt)^2 + (dy/dt)^2}\\)",
      "\\(\\dfrac{1}{2}\\int_{\\alpha}^{\\beta} [r(\\theta)]^2\\,d\\theta\\)",
      "دائرة قطرها \\(8\\) ومركزها \\((4, 0)\\)"
    ],
    "a": 0,
    "ex": "Parametric slope \\(dy/dx\\) matches \\(\\dfrac{dy/dt}{dx/dt}\\).",
    "ex_ar": "ميل المماس البارامتري \\(dy/dx\\) يطابق \\(\\dfrac{dy/dt}{dx/dt}\\)."
  }
];
D["act2l2-limits"] = [
  {
    "t": "sb",
    "ti": "Lab Step Builder: Evaluating Indeterminate Limits (0/0)",
    "ti_ar": "بناء الخطوات: حساب النهايات غير المعينة (0/0)",
    "steps": [
      {
        "l": "Evaluate \\(\\lim_{x\\to 3}\\dfrac{x^2-9}{x-3}\\). Factor numerator: \\((x-3)(x+\\text{?})\\):",
        "l_ar": "احسب \\(\\lim_{x\\to 3}\\dfrac{x^2-9}{x-3}\\). تحليل البسط: \\((x-3)(x+\\text{?})\\):",
        "a": "3",
        "h": "\\((x-3)(x+3)\\)",
        "h_ar": "\\((x-3)(x+3)\\)"
      },
      {
        "l": "Cancel the common factor \\((x-3)\\) for \\(x\\neq 3\\) to get \\(x + 3\\). Evaluate at \\(x=3\\):",
        "l_ar": "اختصر العامل المشترك \\((x-3)\\) حيث \\(x\\neq 3\\) لتحصل على \\(x + 3\\). احسب القيمة عند \\(x=3\\):",
        "a": "6",
        "h": "\\(3 + 3 = 6\\)",
        "h_ar": "\\(3 + 3 = 6\\)"
      }
    ]
  },
  {
    "t": "qc",
    "ti": "Lab Check: Limits at Infinity of Rational Functions",
    "ti_ar": "فحص سريع: نهايات الدوال النسبية عند اللانهاية",
    "q": "Find \\(\\lim_{x\\to\\infty}\\dfrac{5x^3 - 2x + 7}{2x^3 + 4x^2 - 1}\\):",
    "q_ar": "أوجد قيمة النهاية \\(\\lim_{x\\to\\infty}\\dfrac{5x^3 - 2x + 7}{2x^3 + 4x^2 - 1}\\):",
    "o": [
      "5/2",
      "0",
      "\\(\\infty\\)",
      "7/(-1) = -7"
    ],
    "o_ar": [
      "5/2",
      "0",
      "\\(\\infty\\)",
      "7/(-1) = -7"
    ],
    "a": 0,
    "ex": "Both numerator and denominator have highest degree 3. The limit at infinity is the ratio of leading coefficients: \\(5/2\\).",
    "ex_ar": "درجة كل من البسط والمقام هي 3. النهاية عند اللانهاية تساوي نسبة المعاملين الرئيسين: \\(5/2\\)."
  },
  {
    "t": "num",
    "ti": "Numeric Lab: Limit by Rationalization",
    "ti_ar": "إدخال رقمي: حساب النهاية بإنطاق البسط",
    "q": "Evaluate the exact limit: \\[ \\lim_{x\\to 9} \\frac{\\sqrt{x} - 3}{x - 9} \\]",
    "q_ar": "احسب القيمة الدقيقة للنهاية: \\[ \\lim_{x\\to 9} \\frac{\\sqrt{x} - 3}{x - 9} \\]",
    "a": "1/6",
    "tol": 0.001,
    "h": "Direct substitution yields 0/0. Multiply numerator and denominator by conjugate \\(\\sqrt{x} + 3\\).",
    "h_ar": "التعويض المباشر يعطي صيغة غير معينة 0/0. اضرب البسط والمقام في مرافق البسط \\(\\sqrt{x} + 3\\).",
    "sol": "\\(\\lim_{x\\to 9}\\dfrac{x - 9}{(x-9)(\\sqrt{x}+3)} = \\lim_{x\\to 9}\\dfrac{1}{\\sqrt{x}+3} = \\dfrac{1}{3+3} = \\dfrac{1}{6} \\approx 0.1667\\).",
    "sol_ar": "\\(\\lim_{x\\to 9}\\dfrac{x - 9}{(x-9)(\\sqrt{x}+3)} = \\lim_{x\\to 9}\\dfrac{1}{\\sqrt{x}+3} = \\dfrac{1}{3+3} = \\dfrac{1}{6} \\approx 0.1667\\)."
  },
  {
    "t": "ord",
    "ti": "Indeterminate Limits: Factor & Cancel Sequence",
    "ti_ar": "رتّب الخطوات: حساب النهايات غير المعينة بالتحليل والاختصار",
    "q": "Arrange the steps to evaluate \\(\\lim_{x\\to 2}\\dfrac{x^2 + x - 6}{x^2 - 4}\\):",
    "q_ar": "رتب خطوات حساب النهاية \\(\\lim_{x\\to 2}\\dfrac{x^2 + x - 6}{x^2 - 4}\\):",
    "items": [
      "Attempt direct substitution: evaluate at \\(x = 2\\) to get \\(\\frac{4 + 2 - 6}{4 - 4} = \\frac{0}{0}\\) (indeterminate).",
      "Factor the numerator: \\(x^2 + x - 6 = (x - 2)(x + 3)\\).",
      "Factor the denominator: \\(x^2 - 4 = (x - 2)(x + 2)\\).",
      "Cancel common non-zero factor \\((x - 2)\\) for \\(x \\neq 2\\): \\(\\frac{x + 3}{x + 2}\\).",
      "Substitute \\(x = 2\\) into reduced expression: \\(\\frac{2 + 3}{2 + 2} = \\frac{5}{4}\\)."
    ],
    "items_ar": [
      "محاولة التعويض المباشر: الحساب عند \\(x = 2\\) يعطي \\(\\frac{4 + 2 - 6}{4 - 4} = \\frac{0}{0}\\) (صيغة غير معينة).",
      "تحليل البسط إلى عوامل: \\(x^2 + x - 6 = (x - 2)(x + 3)\\).",
      "تحليل المقام إلى عوامل: \\(x^2 - 4 = (x - 2)(x + 2)\\).",
      "اختصار العامل المشترك غير الصفري \\((x - 2)\\) حيث \\(x \\neq 2\\): ينتج \\(\\frac{x + 3}{x + 2}\\).",
      "التعويض بـ \\(x = 2\\) في المقدار المختصر: \\(\\frac{2 + 3}{2 + 2} = \\frac{5}{4}\\)."
    ]
  },
  {
    "t": "cat",
    "ti": "Limit Behavior: Finite Value, Infinite Limit, or Does Not Exist",
    "ti_ar": "تصنيف سلوك النهايات: قيمة منتهية، نهاية لانهائية، أو غير موجودة",
    "categories": [
      "Finite Limit Value",
      "Infinite Limit (±∞)",
      "DNE (Left ≠ Right)"
    ],
    "categories_ar": [
      "قيمة نهاية منتهية",
      "نهاية لانهائية (±∞)",
      "غير موجودة (النهاية من اليمين ≠ النهاية من اليسار)"
    ],
    "items": [
      {
        "s": "\\(\\lim_{x\\to 3}\\frac{x^2 - 9}{x - 3}\\)",
        "s_ar": "\\(\\lim_{x\\to 3}\\frac{x^2 - 9}{x - 3}\\)",
        "cat": 0
      },
      {
        "s": "\\(\\lim_{x\\to 0}\\frac{1}{x^2}\\)",
        "s_ar": "\\(\\lim_{x\\to 0}\\frac{1}{x^2}\\)",
        "cat": 1
      },
      {
        "s": "\\(\\lim_{x\\to 0}\\frac{|x|}{x}\\)",
        "s_ar": "\\(\\lim_{x\\to 0}\\frac{|x|}{x}\\)",
        "cat": 2
      },
      {
        "s": "\\(\\lim_{x\\to\\infty}\\frac{4x^2 - 1}{2x^2 + 5}\\)",
        "s_ar": "\\(\\lim_{x\\to\\infty}\\frac{4x^2 - 1}{2x^2 + 5}\\)",
        "cat": 0
      },
      {
        "s": "\\(\\lim_{x\\to 1}\\frac{1}{x - 1}\\) (two-sided limit)",
        "s_ar": "\\(\\lim_{x\\to 1}\\frac{1}{x - 1}\\) (نهاية ثنائية الاتجاه)",
        "cat": 2
      },
      {
        "s": "\\(\\lim_{x\\to\\infty}(x^3 - 5x)\\)",
        "s_ar": "\\(\\lim_{x\\to\\infty}(x^3 - 5x)\\)",
        "cat": 1
      }
    ]
  },
  {
    "t": "se",
    "ti": "Spot the Error: Chain Rule & Product Rule Differentiation (Limits)",
    "ti_ar": "اكتشف الخطأ: قاعدتا السلسلة والضرب في الاشتقاق (النهايات والاتصال والمقاربات)",
    "q": "A student differentiates \\(f(x) = x^2 e^{2x}\\). Which step omits a required calculus rule?",
    "q_ar": "يشتق طالب الدالة \\(f(x) = x^2 e^{2x}\\). أي خطوة تغفل قاعدة أساسية في الاشتقاق؟",
    "steps": [
      "Identify the product of \\(u(x) = x^2\\) and \\(v(x) = e^{2x}\\).",
      "Compute \\(u'(x) = 2x\\) and \\(v'(x) = 2 e^{2x}\\) via the Chain Rule.",
      "Multiply the derivatives directly as \\(f'(x) = u'(x) v'(x) = 4x e^{2x}\\) instead of \\(u'v + uv'\\)."
    ],
    "steps_ar": [
      "تحديد حاصل ضرب الدالتين \\(u(x) = x^2\\) و\\(v(x) = e^{2x}\\).",
      "حساب \\(u'(x) = 2x\\) و\\(v'(x) = 2 e^{2x}\\) بقاعدة السلسلة.",
      "ضرب المشتقتين مباشرة \\(f'(x) = u'(x)v'(x)\\) بدلاً من تطبيق قاعدة الضرب \\(u'v + uv'\\)."
    ],
    "errorStep": 3,
    "reasons": [
      "By the Product Rule, \\((uv)' = u'v + uv' = 2x e^{2x} + 2x^2 e^{2x} = x(2 + 2x)e^{2x}\\).",
      "The derivative of \\(e^{2x}\\) is \\(e^{2x}\\) without factor \\(2\\).",
      "\\((uv)' = u'v - uv'\\)."
    ],
    "reasons_ar": [
      "حسب قاعدة الضرب \\((uv)' = u'v + uv' = x(2 + 2x)e^{2x}\\).",
      "مشتقة \\(e^{2x}\\) لا تُضرب في \\(2\\).",
      "قاعدة الضرب تتضمن طرح الحدين."
    ],
    "correctReason": 0
  },
  {
    "t": "ms",
    "ti": "Examiner Mode: Indeterminate Limit & Tangent Line (Limits)",
    "ti_ar": "وضع المصحح: النهايات غير المعينة ومعادلة المماس (النهايات والاتصال والمقاربات)",
    "q": "(a) Evaluate \\(\\lim_{x \\to 2} \\dfrac{x^2 - 4}{x - 2}\\). (b) Find the gradient and tangent line to \\(g(x) = x^3 + 4x\\) at \\(x = 2\\).",
    "q_ar": "(أ) احسب النهاية \\(\\lim_{x \\to 2} \\dfrac{x^2 - 4}{x - 2}\\). (ب) أوجد ميل ومعادلة المماس للدالة \\(g(x) = x^3 + 4x\\) عند \\(x = 2\\).",
    "parts": [
      {
        "label": "Part (a) — Resolving 0/0 Limit",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "Factor \\(\\dfrac{(x - 2)(x + 2)}{x - 2} = x + 2\\) for \\(x \\neq 2\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "Evaluate limit as \\(x \\to 2\\): \\(4\\)."
          }
        ]
      },
      {
        "label": "Part (b) — Derivative & Tangent Equation",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "\\(g'(x) = 3x^2 + 4 \\implies g'(2) = 16\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "With \\(g(2) = 16\\), tangent is \\(y - 16 = 16(x - 2)\\)."
          }
        ]
      }
    ],
    "parts_ar": [
      {
        "label": "الجزء (أ) — إزالة عدم التعيين 0/0",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "التحليل والاختصار \\(\\dfrac{(x - 2)(x + 2)}{x - 2} = x + 2\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "قيمة النهاية عند \\(x \\to 2\\) تساوي \\(4\\)."
          }
        ]
      },
      {
        "label": "الجزء (ب) — المشتقة ومعادلة المماس",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "\\(g'(x) = 3x^2 + 4 \\implies g'(2) = 16\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "معادلة المماس: \\(y - 16 = 16(x - 2)\\)."
          }
        ]
      }
    ]
  },
  {
    "t": "mt",
    "ti": "Matching: Continuity, Derivatives & Concavity Criteria (Limits)",
    "ti_ar": "مطابقة: شروط الاتصال والاشتقاق والتقعر (النهايات والاتصال والمقاربات)",
    "p": [
      {
        "l": "Continuity of \\(f\\) at \\(x = a\\)",
        "r": "\\(\\lim_{x \\to a^-} f(x) = \\lim_{x \\to a^+} f(x) = f(a)\\)"
      },
      {
        "l": "Chain Rule \\(\\frac{d}{dx}[f(g(x))]\\)",
        "r": "\\(f'(g(x)) \\cdot g'(x)\\)"
      },
      {
        "l": "Strict local minimum test",
        "r": "\\(f'(c) = 0\\) and \\(f''(c) > 0\\)"
      },
      {
        "l": "Newton–Raphson step",
        "r": "\\(x_{n+1} = x_n - \\dfrac{f(x_n)}{f'(x_n)}\\)"
      }
    ],
    "p_ar": [
      {
        "l": "شرط اتصال \\(f\\) عند \\(x = a\\)",
        "r": "\\(\\lim_{x \\to a^-} f(x) = \\lim_{x \\to a^+} f(x) = f(a)\\)"
      },
      {
        "l": "قاعدة السلسلة \\(\\frac{d}{dx}[f(g(x))]\\)",
        "r": "\\(f'(g(x)) \\cdot g'(x)\\)"
      },
      {
        "l": "اختبار النهاية الصغرى المحلية",
        "r": "\\(f'(c) = 0\\) و\\(f''(c) > 0\\)"
      },
      {
        "l": "تكرار نيوتن–رافسون العددي",
        "r": "\\(x_{n+1} = x_n - \\dfrac{f(x_n)}{f'(x_n)}\\)"
      }
    ]
  },
  {
    "t": "qc",
    "ti": "Quick Check: Standard Trigonometric Limit (Limits)",
    "ti_ar": "فحص سريع: النهاية المثلثية القياسية (النهايات والاتصال والمقاربات)",
    "q": "What is \\(\\lim_{x \\to 0} \\dfrac{\\sin(2x)}{x}\\)?",
    "q_ar": "ما قيمة النهاية \\(\\lim_{x \\to 0} \\dfrac{\\sin(2x)}{x}\\)؟",
    "o": [
      "\\(2\\)",
      "\\(1\\)",
      "\\(0\\)",
      "\\(\\dfrac{1}{2}\\)"
    ],
    "o_ar": [
      "\\(2\\)",
      "\\(1\\)",
      "\\(0\\)",
      "\\(\\dfrac{1}{2}\\)"
    ],
    "a": 0,
    "ex": "Rewrite as \\(2 \\cdot \\frac{\\sin(2x)}{2x} \\to 2 \\cdot 1 = 2\\).",
    "ex_ar": "نكتبها \\(2 \\cdot \\frac{\\sin(2x)}{2x} \\to 2\\)."
  }
];
D["act2l2-conics-3d-stats"] = [
  {
    "t": "qc",
    "ti": "Quick Check: Histogram Frequency Density (Conic Sections, 3D Coordinate Geometry, Combinatorics & Probability)",
    "ti_ar": "فحص سريع: كثافة التكرار في المدرج التكراري (القطوع المخروطية والهندسة ثلاثية الأبعاد والتوافيق والاحتمالات (ACT II L2))",
    "q": "In an unequal-width histogram, a class of width \\(5\\) has frequency \\(20\\). What bar height (frequency density) should be plotted?",
    "q_ar": "في مدرج تكراري غير متساوي الفئات، فئة طولها \\(5\\) وتكرارها \\(20\\). ما كثافة التكرار (ارتفاع العمود)؟",
    "o": [
      "\\(4\\)",
      "\\(20\\)",
      "\\(100\\)",
      "\\(1\\)"
    ],
    "o_ar": [
      "\\(4\\)",
      "\\(20\\)",
      "\\(100\\)",
      "\\(1\\)"
    ],
    "a": 0,
    "ex": "Frequency density \\(= \\text{frequency} \\div \\text{class width} = 20 \\div 5 = 4\\).",
    "ex_ar": "كثافة التكرار تساوي التكرار مقسوماً على طول الفئة."
  },
  {
    "t": "tf",
    "ti": "True / False: Statistical Measures & Outlier Robustness (Conic Sections, 3D Coordinate Geometry, Combinatorics & Probability)",
    "ti_ar": "صح أم خطأ: المقاييس الإحصائية ومقاومة القيم المتطرفة (القطوع المخروطية والهندسة ثلاثية الأبعاد والتوافيق والاحتمالات (ACT II L2))",
    "items": [
      {
        "s": "The median and IQR are resistant to extreme outliers, whereas the mean and standard deviation are sensitive.",
        "a": true,
        "ex": "Order statistics depend on middle ranks, not extreme tail values."
      },
      {
        "s": "If events \\(A\\) and \\(B\\) are mutually exclusive with positive probabilities, they are independent.",
        "a": false,
        "ex": "Mutually exclusive means \\(P(A \\cap B) = 0 \\neq P(A)P(B)\\), so they are strongly dependent."
      },
      {
        "s": "For a Poisson distribution \\(X \\sim \\text{Po}(\\lambda)\\), \\(E[X] = \\operatorname{Var}(X) = \\lambda\\).",
        "a": true,
        "ex": "Equal mean and variance is a defining property of the Poisson model."
      }
    ],
    "items_ar": [
      {
        "s": "الوسيط والمدى الربيعي يقاومان القيم المتطرفة، بينما يتأثر المتوسط والانحراف المعياري بها.",
        "a": true,
        "ex": "المقاييس الترتيبية لا تتأثر بالقيم البعيدة في الأطراف."
      },
      {
        "s": "إذا كان الحدثان \\(A, B\\) متنافيين باحتمال موجب فإنهما مستقلان.",
        "a": false,
        "ex": "التنافي يعني \\(P(A \\cap B) = 0 \\neq P(A)P(B)\\)، فهما غير مستقلين."
      },
      {
        "s": "في توزيع بواسون \\(\\text{Po}(\\lambda)\\)، يتساوى التوقع والتباين ويساويان \\(\\lambda\\).",
        "a": true,
        "ex": "خاصية أساسية لتوزيع بواسون."
      }
    ]
  },
  {
    "t": "mt",
    "ti": "Matching: Probability, Distributions & Inference Rules (Conic Sections, 3D Coordinate Geometry, Combinatorics & Probability)",
    "ti_ar": "مطابقة: قوانين الاحتمالات والتوزيعات والاستدلال (القطوع المخروطية والهندسة ثلاثية الأبعاد والتوافيق والاحتمالات (ACT II L2))",
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
  },
  {
    "t": "num",
    "ti": "Numeric Entry: Sampling Standard Error (Conic Sections, 3D Coordinate Geometry, Combinatorics & Probability)",
    "ti_ar": "إدخال رقمي: حساب الخطأ المعياري للمتوسط (القطوع المخروطية والهندسة ثلاثية الأبعاد والتوافيق والاحتمالات (ACT II L2))",
    "q": "A population has \\(\\sigma = 24\\). Compute the standard error \\(\\sigma_{\\bar{x}} = \\sigma / \\sqrt{n}\\) for sample size \\(n = 36\\).",
    "q_ar": "مجتمع انحرافه المعياري \\(\\sigma = 24\\). احسب الخطأ المعياري \\(\\sigma_{\\bar{x}} = \\sigma / \\sqrt{n}\\) لعينة حجمها \\(n = 36\\).",
    "a": "4",
    "ex": "\\(\\sigma_{\\bar{x}} = 24 / 6 = 4\\).",
    "ex_ar": "\\(\\sigma_{\\bar{x}} = 24 / 6 = 4\\)."
  },
  {
    "t": "ord",
    "ti": "Order the Steps: Significance Hypothesis Test (Conic Sections, 3D Coordinate Geometry, Combinatorics & Probability)",
    "ti_ar": "ترتيب الخطوات: إجراء اختبار الفروض الإحصائية (القطوع المخروطية والهندسة ثلاثية الأبعاد والتوافيق والاحتمالات (ACT II L2))",
    "prompt": "Place the four standard stages of a statistical significance test in logical order:",
    "prompt_ar": "رتّب المراحل الأربع لاختبار الدلالة الإحصائية ترتيباً منطقياً:",
    "items": [
      "State null \\(H_0\\) and alternative \\(H_a\\) hypotheses in terms of the population parameter.",
      "Verify random sampling and large-sample / normality conditions.",
      "Compute the test statistic and corresponding tail \\(p\\)-value.",
      "Compare \\(p\\)-value against \\(\\alpha\\) and state the conclusion in context."
    ],
    "items_ar": [
      "صياغة فرض العدم \\(H_0\\) والفرض البديل \\(H_a\\) بدلالة معلمة المجتمع.",
      "التحقق من العشوائية وشروط حجم العينة والاعتدالية.",
      "حساب إحصائية الاختبار والقيمة الاحتمالية \\(p\\)-value.",
      "مقارنة \\(p\\)-value بمستوى الدلالة \\(\\alpha\\) وكتابة القرار في سياق المسألة."
    ],
    "ex": "Hypotheses → conditions → test statistic & p-value → decision in context.",
    "ex_ar": "صياغة الفروض ← التحقق من الشروط ← إحصائية الاختبار ← القرار الإحصائي."
  },
  {
    "t": "cat",
    "ti": "Categorize: Resistant vs. Non-Resistant Summary Statistics (Conic Sections, 3D Coordinate Geometry, Combinatorics & Probability)",
    "ti_ar": "تصنيف: المقاييس المقاومة مقابل الحساسة للقيم المتطرفة (القطوع المخروطية والهندسة ثلاثية الأبعاد والتوافيق والاحتمالات (ACT II L2))",
    "categories": [
      "Resistant to Outliers",
      "Sensitive to Outliers"
    ],
    "categories_ar": [
      "مقاوم للقيم المتطرفة",
      "حساس للقيم المتطرفة"
    ],
    "items": [
      {
        "s": "Sample Median",
        "cat": 0
      },
      {
        "s": "Interquartile Range (\\(\\text{IQR} = Q_3 - Q_1\\))",
        "cat": 0
      },
      {
        "s": "Sample Mean (\\(\\bar{x}\\))",
        "cat": 1
      },
      {
        "s": "Sample Standard Deviation (\\(s\\))",
        "cat": 1
      }
    ],
    "items_ar": [
      {
        "s": "الوسيط الحسابي",
        "cat": 0
      },
      {
        "s": "المدى الربيعي (\\(\\text{IQR} = Q_3 - Q_1\\))",
        "cat": 0
      },
      {
        "s": "المتوسط الحسابي (\\(\\bar{x}\\))",
        "cat": 1
      },
      {
        "s": "الانحراف المعياري للعينة (\\(s\\))",
        "cat": 1
      }
    ],
    "ex": "Rank-based summaries (median, IQR) resist extreme tail values; moment-based summaries (mean, SD) shift strongly.",
    "ex_ar": "الوسيط والمدى الربيعي يعتمدان على الرتب فيقاومان التطرف، بعكس المتوسط والانحراف المعياري."
  },
  {
    "t": "se",
    "ti": "Spot the Error: Variance of Difference of Independent Variables (Conic Sections, 3D Coordinate Geometry, Combinatorics & Probability)",
    "ti_ar": "اكتشف الخطأ: تباين الفرق بين متغيرين عشوائيين مستقلين (القطوع المخروطية والهندسة ثلاثية الأبعاد والتوافيق والاحتمالات (ACT II L2))",
    "q": "Independent random variables \\(X\\) and \\(Y\\) have \\(\\operatorname{Var}(X) = 5\\) and \\(\\operatorname{Var}(Y) = 4\\). A student computes \\(\\operatorname{Var}(X - Y)\\). Which step is invalid?",
    "q_ar": "متغيران عشوائيان مستقلان \\(X\\) و\\(Y\\) تبايناهما \\(\\operatorname{Var}(X) = 5\\) و\\(\\operatorname{Var}(Y) = 4\\). يحسب طالب \\(\\operatorname{Var}(X - Y)\\). أي خطوة خاطئة؟",
    "steps": [
      "Verify that \\(X\\) and \\(Y\\) are statistically independent (\\(\\operatorname{Cov}(X,Y) = 0\\)).",
      "Subtract the variances directly: \\(\\operatorname{Var}(X - Y) = 5 - 4 = 1\\).",
      "Take square root for standard deviation."
    ],
    "steps_ar": [
      "التحقق من استقلال \\(X\\) و\\(Y\\) إحصائياً.",
      "طرح التباينين مباشرة: \\(\\operatorname{Var}(X - Y) = 5 - 4 = 1\\).",
      "أخذ الجذر التربيعي لإيجاد الانحراف المعياري."
    ],
    "errorStep": 2,
    "reasons": [
      "Because coefficients square in variance, \\(\\operatorname{Var}(X - Y) = 1^2\\operatorname{Var}(X) + (-1)^2\\operatorname{Var}(Y) = 5 + 4 = 9\\) — independent variances ALWAYS add.",
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
    "ti": "Examiner Mode: Standard Error, Variance & Conditional Probability (Conic Sections, 3D Coordinate Geometry, Combinatorics & Probability)",
    "ti_ar": "وضع المصحح: الخطأ المعياري والتباين والاحتمال الشرطي (القطوع المخروطية والهندسة ثلاثية الأبعاد والتوافيق والاحتمالات (ACT II L2))",
    "q": "(a) A population has standard deviation \\(\\sigma = 24\\). For a simple random sample of size \\(n = 36\\), find the standard error \\(\\sigma_{\\bar{x}}\\) and state what happens to \\(\\sigma_{\\bar{x}}\\) if \\(n\\) quadruples. (b) Independent \\(X, Y\\) have \\(\\operatorname{Var}(X) = 5,\\; \\operatorname{Var}(Y) = 4\\); compute \\(\\operatorname{Var}(2X - Y)\\).",
    "q_ar": "(أ) مجتمع انحرافه المعياري \\(\\sigma = 24\\). لعينة عشوائية حجمها \\(n = 36\\)، احسب الخطأ المعياري \\(\\sigma_{\\bar{x}}\\) واذكر ماذا يحدث له عند مضاعفة \\(n\\) أربع مرات. (ب) للمتغيرين المستقلين \\(X, Y\\) حيث \\(\\operatorname{Var}(X) = 5,\\; \\operatorname{Var}(Y) = 4\\)، احسب \\(\\operatorname{Var}(2X - Y)\\).",
    "parts": [
      {
        "label": "Part (a) — Sampling Distribution Standard Error",
        "marks": 2,
        "rubric": [
          {
            "code": "A1",
            "marks": 1,
            "text": "\\(\\sigma_{\\bar{x}} = \\dfrac{\\sigma}{\\sqrt{n}} = \\dfrac{24}{\\sqrt{36}} = \\dfrac{24}{6} = 4\\)."
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
            "text": "\\(4(5) + 4 = 24\\)."
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
            "text": "\\(\\sigma_{\\bar{x}} = \\dfrac{24}{\\sqrt{36}} = 4\\)."
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
            "text": "الناتج: \\(4(5) + 4 = 24\\)."
          }
        ]
      }
    ]
  },
  {
    "t": "sb",
    "ti": "Step Builder: Standard Error & Independent Variance (Conic Sections, 3D Coordinate Geometry, Combinatorics & Probability)",
    "ti_ar": "بناء الخطوات: الخطأ المعياري وتباين المتغيرات المستقلة (القطوع المخروطية والهندسة ثلاثية الأبعاد والتوافيق والاحتمالات (ACT II L2))",
    "steps": [
      {
        "l": "Compute \\(\\sqrt{n}\\) for sample size \\(n = 36\\):",
        "a": "6",
        "h": "Square root of 36."
      },
      {
        "l": "Find standard error \\(\\sigma / \\sqrt{n}\\) when \\(\\sigma = 24\\):",
        "a": "4",
        "h": "Divide 24 by 6."
      },
      {
        "l": "For independent \\(\\operatorname{Var}(X) = 5,\\; \\operatorname{Var}(Y) = 4\\), find \\(\\operatorname{Var}(X - Y) =\\)",
        "a": "9",
        "h": "Add 5 + 4."
      }
    ],
    "steps_ar": [
      {
        "l": "احسب \\(\\sqrt{n}\\) لحجم العينة \\(n = 36\\):",
        "a": "6",
        "h": "الجذر التربيعي للعدد 36."
      },
      {
        "l": "أوجد الخطأ المعياري \\(\\sigma / \\sqrt{n}\\) عندما \\(\\sigma = 24\\):",
        "a": "4",
        "h": "اقسم 24 على 6."
      },
      {
        "l": "للمتغيرين المستقلين \\(\\operatorname{Var}(X) = 5,\\; \\operatorname{Var}(Y) = 4\\)، احسب \\(\\operatorname{Var}(X - Y) =\\)",
        "a": "9",
        "h": "اجمع 5 + 4."
      }
    ]
  }
];
});
