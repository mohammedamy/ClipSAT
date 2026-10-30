/* Interactive Practice data for /act/ - one entry per chapter section id.
   Shipped as public/js/ix/act.js and loaded only on that track's page by the
   engine in src/scripts/modules/19-interactive-activities-engine-v1.js
   (Plan 5 Phase 5.015, ADR 0033). Entry shapes (qc/mt/tf/sb/sr/fn/num/ord/cat/gp/se/ms) are
   documented there. */
(window.__ixData = window.__ixData || []).push(function (D) {
D["act-about"] = [
  {
    "t": "qc",
    "ti": "Quick Check: ACT Math Exam Timing",
    "ti_ar": "فحص سريع: توقيت اختبار الرياضيات في ACT المطور",
    "q": "What is the structure of the enhanced ACT Math test (all test dates from September 2025)?",
    "q_ar": "ما هيكل اختبار الرياضيات في اختبار ACT المطور (لجميع مواعيد الاختبار بدءاً من سبتمبر 2025)؟",
    "o": [
      "45 questions in 50 minutes (about 67 seconds each)",
      "60 questions in 60 minutes (1 minute each)",
      "44 questions in 70 minutes (two adaptive modules)",
      "50 questions in 60 minutes (72 seconds each)"
    ],
    "o_ar": [
      "45 سؤالاً في 50 دقيقة (حوالي 67 ثانية لكل سؤال)",
      "60 سؤالاً في 60 دقيقة (دقيقة واحدة لكل سؤال)",
      "44 سؤالاً في 70 دقيقة (وحدتان تكيفيتان)",
      "50 سؤالاً في 60 دقيقة (72 ثانية لكل سؤال)"
    ],
    "a": 0,
    "ex": "The enhanced ACT Math test is 45 multiple-choice questions in 50 minutes, 4 answer choices each, calculator allowed throughout. 60 questions in 60 minutes was the old format; 44 in 70 minutes is the Digital SAT.",
    "ex_ar": "اختبار ACT المطور يتكون من 45 سؤال اختيار من متعدد في 50 دقيقة، مع 4 خيارات لكل سؤال، والآلة الحاسبة مسموحة طوال الوقت. (60 سؤالاً في 60 دقيقة كان النظام القديم؛ و 44 سؤالاً في 70 دقيقة هو Digital SAT)."
  },
  {
    "t": "mt",
    "ti": "Matching: ACT Math Test Strategies",
    "ti_ar": "مطابقة: استراتيجيات اختبار ACT في الرياضيات",
    "p": [
      {
        "l": "Pacing Target",
        "r": "About 67 seconds per question"
      },
      {
        "l": "Guessing Policy",
        "r": "No negative marking (answer every question)"
      },
      {
        "l": "Answer Choices",
        "r": "4 per question (enhanced ACT)"
      },
      {
        "l": "Field-Test Items",
        "r": "4 unscored questions you cannot identify"
      },
      {
        "l": "Formula Sheet",
        "r": "None provided (memorize key geometry formulas)"
      }
    ],
    "p_ar": [
      {
        "l": "الهدف الزمني للإجابة",
        "r": "حوالي 67 ثانية لكل سؤال"
      },
      {
        "l": "سياسة التخمين",
        "r": "لا يوجد خصم درجات (أجب عن كل الأسئلة)"
      },
      {
        "l": "خيارات الإجابة",
        "r": "4 خيارات لكل سؤال (في ACT المطور)"
      },
      {
        "l": "الأسئلة التجريبية",
        "r": "4 أسئلة غير محسوبة لا يمكنك تمييزها"
      },
      {
        "l": "ورقة القوانين",
        "r": "لا توجد ورقة قوانين (احفظ القوانين الهندسية)"
      }
    ]
  },
  {
    "t": "cat",
    "ti": "Categorize: ACT Exam Facts vs. Misconceptions",
    "ti_ar": "تصنيف: حقائق اختبار ACT مقابل المفاهيم الخاطئة",
    "prompt": "Classify each statement about the enhanced ACT Math section:",
    "prompt_ar": "صنّف كل عبارة تتعلق بقسم الرياضيات في اختبار ACT المطور:",
    "categories": [
      "True ACT Fact",
      "False Misconception"
    ],
    "categories_ar": [
      "حقيقة صحيحة عن ACT",
      "مفهوم خاطئ"
    ],
    "items": [
      {
        "s": "There are 45 questions in 50 minutes",
        "cat": 0
      },
      {
        "s": "There is a penalty for wrong answers",
        "cat": 1
      },
      {
        "s": "A formula sheet is provided inside the test booklet",
        "cat": 1
      },
      {
        "s": "Calculators are allowed on all math questions",
        "cat": 0
      },
      {
        "s": "Each question has 4 multiple-choice options",
        "cat": 0
      },
      {
        "s": "Blank answers receive partial credit",
        "cat": 1
      }
    ],
    "items_ar": [
      {
        "s": "الاختبار يتكون من 45 سؤالاً في 50 دقيقة",
        "cat": 0
      },
      {
        "s": "توجد عقوبة وخصم درجات للإجابات الخاطئة",
        "cat": 1
      },
      {
        "s": "تُرفق ورقة قوانين داخل كتيب الاختبار",
        "cat": 1
      },
      {
        "s": "الآلة الحاسبة مسموحة في جميع أسئلة الرياضيات",
        "cat": 0
      },
      {
        "s": "كل سؤال يحتوي على 4 خيارات اختيار من متعدد",
        "cat": 0
      },
      {
        "s": "تمنح الإجابات المتروكة فارغة درجات جزئية",
        "cat": 1
      }
    ],
    "sol": "The enhanced ACT features 45 questions in 50 min, no formula sheet, 4 options, and zero guessing penalty.",
    "sol_ar": "يتميز ACT المطور بـ 45 سؤالاً في 50 دقيقة، بدون ورقة قوانين، و4 خيارات، وبدون أي خصم على التخمين."
  },
  {
    "t": "num",
    "ti": "ACT Math Pacing Calculation",
    "ti_ar": "إدخال رقمي: حساب معدل الوقت في ACT",
    "q": "On the enhanced ACT Math test, there are 45 questions in 50 minutes. How many total seconds on average are available per question? (Round to nearest integer)",
    "q_ar": "في اختبار ACT المطور للرياضيات، هناك 45 سؤالاً في 50 دقيقة. كم ثانية في المتوسط تتاح لكل سؤال؟ (قرّب لأقرب عدد صحيح)",
    "a": 67,
    "tol": 1,
    "h": "Total seconds = 50 × 60 = 3000 seconds. Divide by 45.",
    "h_ar": "إجمالي الثواني = 50 × 60 = 3000 ثانية. اقسم على 45.",
    "sol": "3000 / 45 = 66.67 seconds, or approximately 67 seconds per question.",
    "sol_ar": "3000 ÷ 45 = 66.67 ثانية، أي حوالي 67 ثانية لكل سؤال."
  },
  {
    "t": "ord",
    "ti": "Order the ACT Math Exam Attack Strategy",
    "ti_ar": "ترتيب استراتيجية التعامل مع أقسام اختبار ACT",
    "q": "Arrange the sequence to maximize your score on the enhanced ACT Math section:",
    "q_ar": "رتّب تسلسل الخطوات لتحقيق أعلى درجة في قسم الرياضيات في ACT المطور:",
    "items": [
      "Tackle Questions 1–15 swiftly in ~10 minutes, securing easy foundational points",
      "Work through Questions 16–30 in ~16 minutes, keeping an eye out for word problems and multi-step algebra",
      "Flag difficult or time-consuming items immediately without spending more than 90 seconds on a single pass",
      "Spend ~21 minutes on Questions 31–45 (advanced geometry, trig, and matrices)",
      "Use the final 3 minutes to verify flagged problems and bubble an answer for every single question"
    ],
    "items_ar": [
      "حل الأسئلة من 1 إلى 15 بسرعة في نحو 10 دقائق لضمان النقاط السهلة الأساسية",
      "التعامل مع الأسئلة من 16 إلى 30 في نحو 16 دقيقة مع الانتباه للمسائل اللفظية والجبر متعدد الخطوات",
      "تمييز الأسئلة الصعبة أو المستهلكة للوقت بعلم فوراً دون قضاء أكثر من 90 ثانية في المحاولة الأولى",
      "تخصيص نحو 21 دقيقة للأسئلة من 31 إلى 45 (الهندسة المتقدمة، وحساب المثلثات، والمصفوفات)",
      "استغلال الدقائق الثلاث الأخيرة لمراجعة الأسئلة المعلمة بعلم والتأكد من تظليل إجابة لكل سؤال"
    ],
    "sol": "Pace by difficulty tier, flag difficult questions early, and guarantee no bubble is left empty.",
    "sol_ar": "قسّم وقتك بحسب مستوى الصعوبة، وعلم الأسئلة المعقدة بعلم، وتأكد من تظليل كل الأسئلة."
  },
  {
    "t": "se",
    "ti": "Spot the Error: Exam Pacing & Time Allocation (Test format & strategy)",
    "ti_ar": "اكتشف الخطأ: إدارة الوقت وتوزيع الدرجات (نظام اختبار ACT واستراتيجيات الحل السريع)",
    "q": "A student plans their timing for a 30-question, 45-minute section in ACT. Which step in their strategy introduces a flaw?",
    "q_ar": "يخطط طالب لتوزيع وقته في قسم مكوّن من 30 سؤالاً خلال 45 دقيقة. أي خطوة تتضمن خللاً منهجياً؟",
    "steps": [
      "Compute average time budget per question: \\(\\frac{45\\times 60}{30} = 90\\) seconds.",
      "Complete a first pass of straightforward items in roughly \\(63\\) seconds each to bank time.",
      "Spend \\(9\\) minutes stuck on a single hard item before reading the remaining 15 questions.",
      "Reserve the final \\(4\\) minutes to verify flagged items and ensure no unanswered blanks remain."
    ],
    "steps_ar": [
      "حساب متوسط الزمن لكل سؤال: \\(\\frac{45\\times 60}{30} = 90\\) ثانية.",
      "إنجاز الجولة الأولى للأسئلة المباشرة خلال نحو \\(63\\) ثانية للسؤال لتوفير الوقت.",
      "قضاء \\(9\\) دقائق متواصلة على سؤال صعب واحد قبل قراءة بقية الأسئلة (15 سؤالاً).",
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
    "ti_ar": "وضع المصحح: خطة إدارة الوقت والدرجة المستهدفة (نظام اختبار ACT واستراتيجيات الحل السريع)",
    "q": "A practice section has \\(30\\) equal-weight questions in \\(45\\) minutes with no penalty for wrong guesses. A student answers \\(26\\) correctly on Pass 1–2. (a) Find the exact seconds-per-question budget and accuracy percentage. (b) State the optimal triage rule for the remaining \\(4\\) flagged questions.",
    "q_ar": "يتكون قسم تدريبي من \\(30\\) سؤالاً متساوية الوزن في \\(45\\) دقيقة دون خصم على الإجابات الخاطئة. أجاب طالب عن \\(26\\) سؤالاً بشكل صحيح. (أ) أوجد الزمن المخصص لكل سؤال بالثواني ونسبة الدقة المئوية. (ب) اذكر قاعدة الفرز المثلى للأسئلة المتبقية وعددها \\(4\\).",
    "parts": [
      {
        "label": "Part (a) — Time Budget & Raw Accuracy",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "Time per item: \\(\\frac{2700}{30} = 90\\text{ s}\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "Raw score percentage: \\(\\frac{26}{30} \\times 100\\% \\approx 87\\%\\)."
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
            "text": "الزمن لكل سؤال: \\(\\frac{2700}{30} = 90\\) ثانية."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "النسبة المئوية للدرجة الخام: \\(\\frac{26}{30} \\times 100\\% \\approx 87\\%\\)."
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
    "ti_ar": "بناء الخطوات: حساب ميزانية الوقت والدرجة (نظام اختبار ACT واستراتيجيات الحل السريع)",
    "steps": [
      {
        "l": "Convert \\(45\\) minutes into total seconds:",
        "a": "2700",
        "h": "Multiply 45 by 60."
      },
      {
        "l": "Divide by \\(30\\) questions to get seconds per question:",
        "a": "90",
        "h": "Compute 2700 / 30."
      },
      {
        "l": "If you answer \\(26\\) out of \\(30\\) correctly, how many items remain for review?",
        "a": "4",
        "h": "Subtract 26 from 30."
      }
    ],
    "steps_ar": [
      {
        "l": "حوّل \\(45\\) دقيقة إلى إجمالي الثواني:",
        "a": "2700",
        "h": "اضرب 45 في 60."
      },
      {
        "l": "اقسم على \\(30\\) سؤالاً لإيجاد عدد الثواني لكل سؤال:",
        "a": "90",
        "h": "احسب 2700 ÷ 30."
      },
      {
        "l": "إذا حللت \\(26\\) من أصل \\(30\\)، فكم سؤالاً يتبقى للمراجعة؟",
        "a": "4",
        "h": "اطرح 26 من 30."
      }
    ]
  },
  {
    "t": "qc",
    "ti": "Quick Check: Two-Pass Exam Triage (Test format & strategy)",
    "ti_ar": "فحص سريع: استراتيجية الجولتين في الاختبار (نظام اختبار ACT واستراتيجيات الحل السريع)",
    "q": "On a timed 30-question section (45 minutes, no guessing penalty), what is the highest-yield action when an item still resists solution after 120 seconds?",
    "q_ar": "في قسم موقوت من 30 سؤالاً (45 دقيقة دون خصم على التخمين)، ما الإجراء الأعلى كفاءة إذا استغرق سؤال أكثر من 120 ثانية دون حل؟",
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
D["act-numbers"] = [
  {
    "t": "qc",
    "ti": "Quick Check: Percent",
    "ti_ar": "فحص سريع: النسبة المئوية",
    "q": "Jacket costs $80 after 20% off. Original price?",
    "q_ar": "سترة سعرها $80 بعد خصم 20%. ما هو سعرها الأصلي؟",
    "o": [
      "$96",
      "$100",
      "$90",
      "$110"
    ],
    "o_ar": [
      "$96",
      "$100",
      "$90",
      "$110"
    ],
    "a": 1,
    "ex": "\\(0.8P=80\\Rightarrow P=\\$100\\).",
    "ex_ar": "\\(0.8P=80\\Rightarrow P=\\$100\\)."
  },
  {
    "t": "tf",
    "ti": "True or False: Number Properties",
    "ti_ar": "صحيح أم خطأ: خصائص الأعداد",
    "items": [
      {
        "s": "2 is the only even prime number.",
        "a": true,
        "ex": "Any even number greater than 2 is divisible by 2 and thus composite."
      },
      {
        "s": "The product of two irrational numbers is always irrational.",
        "a": false,
        "ex": "For example, \\(\\sqrt{2}\\times\\sqrt{2}=2\\), which is rational."
      },
      {
        "s": "Zero is an even integer.",
        "a": true,
        "ex": "0 is divisible by 2 with remainder 0 (\\(0=2\\times0\\))."
      },
      {
        "s": "Every integer is a rational number.",
        "a": true,
        "ex": "Any integer \\(n\\) can be written as \\(n/1\\)."
      }
    ],
    "items_ar": [
      {
        "s": "العدد 2 هو العدد الأولي الزوجي الوحيد.",
        "a": true,
        "ex": "أي عدد زوجي أكبر من 2 يقبل القسمة على 2 وبالتالي فهو عدد مؤلف غير أولي."
      },
      {
        "s": "حاصل ضرب عددين غير نسبيين هو دائماً عدد غير نسبي.",
        "a": false,
        "ex": "على سبيل المثال: \\(\\sqrt{2}\\times\\sqrt{2}=2\\)، وهو عدد نسبي."
      },
      {
        "s": "الصفر عدد صحيح زوجي.",
        "a": true,
        "ex": "الصفر يقبل القسمة على 2 بدون باقٍ (\\(0=2\\times0\\))."
      },
      {
        "s": "كل عدد صحيح هو عدد نسبي.",
        "a": true,
        "ex": "أي عدد صحيح \\(n\\) يمكن كتابته في صورة كسر \\(n/1\\)."
      }
    ]
  },
  {
    "t": "num",
    "ti": "Numeric Entry: Successive Discounts",
    "ti_ar": "إدخال رقمي: الخصومات المتتالية",
    "q": "An item is marked down 20%, and then an additional 10% discount is applied to the discounted price. What is the total percent discount from the original price?",
    "q_ar": "سلعة تم تخفيض سعرها بنسبة 20%، ثم طُبق خصم إضافي بنسبة 10% على السعر المخفض. ما النسبة المئوية الكلية للخصم من السعر الأصلي؟",
    "a": 28,
    "tol": 0.1,
    "h": "Multiplier is (1 - 0.20)(1 - 0.10) = 0.80 × 0.90 = 0.72.",
    "h_ar": "المعامل هو (1 - 0.20)(1 - 0.10) = 0.80 × 0.90 = 0.72.",
    "sol": "The multiplier is 0.72. The total discount is 1 - 0.72 = 0.28 or 28%.",
    "sol_ar": "معامل السعر هو 0.72. إذن الخصم الإجمالي = 1 - 0.72 = 0.28 أي 28%."
  },
  {
    "t": "sr",
    "ti": "Worked Example: Percent Increase",
    "ti_ar": "مثال محلول: النسبة المئوية للزيادة",
    "steps": [
      "A price increases from $80 to $92. Find the change: \\(92-80=12\\).",
      "Percent change \\(=\\dfrac{\\text{change}}{\\text{original}}\\times100\\%=\\dfrac{12}{80}\\times100\\%\\).",
      "\\(=15\\%\\)."
    ],
    "steps_ar": [
      "زاد السعر من $80 إلى $92. احسب مقدار التغير: \\(92-80=12\\).",
      "النسبة المئوية للتغير \\(=\\dfrac{\\text{التغير}}{\\text{الأصلي}}\\times100\\%=\\dfrac{12}{80}\\times100\\%\\).",
      "\\(=15\\%\\)."
    ]
  },
  {
    "t": "ord",
    "ti": "Order the Steps: Order of Operations (PEMDAS)",
    "ti_ar": "ترتيب الخطوات: ترتيب العمليات الحسابية (PEMDAS)",
    "q": "Arrange the standard order of operations to evaluate algebraic and numeric expressions:",
    "q_ar": "رتّب الترتيب القياسي للعمليات الحسابية لتقييم المقادير الجبرية والعددية:",
    "items": [
      "Parentheses & Grouping symbols (innermost first)",
      "Exponents & Radicals from left to right",
      "Multiplication & Division from left to right",
      "Addition & Subtraction from left to right"
    ],
    "items_ar": [
      "الأقواس ورموز التجميع (الأقواس الداخلية أولاً)",
      "الأسس والجذور من اليسار إلى اليمين",
      "الضرب والقسمة من اليسار إلى اليمين",
      "الجمع والطرح من اليسار إلى اليمين"
    ],
    "sol": "PEMDAS evaluates Parentheses, Exponents, Multiplication & Division (left to right), Addition & Subtraction (left to right).",
    "sol_ar": "ترتيب PEMDAS يبدأ بالأقواس، ثم الأسس، ثم الضرب والقسمة (من اليسار لليمين)، ثم الجمع والطرح (من اليسار لليمين)."
  },
  {
    "t": "cat",
    "ti": "Classify Numbers by Mathematical Set",
    "ti_ar": "تصنيف الأعداد حسب المجموعات العددية",
    "categories": [
      "Rational Number",
      "Irrational Number"
    ],
    "categories_ar": [
      "عدد نسبي",
      "عدد غير نسبي"
    ],
    "items": [
      {
        "s": "\\(0.75 = \\frac{3}{4}\\)",
        "cat": 0
      },
      {
        "s": "\\(\\sqrt{2}\\)",
        "cat": 1
      },
      {
        "s": "\\(\\pi\\)",
        "cat": 1
      },
      {
        "s": "\\(-8\\)",
        "cat": 0
      },
      {
        "s": "\\(0.333\\dots = \\frac{1}{3}\\)",
        "cat": 0
      },
      {
        "s": "\\(\\sqrt{49} = 7\\)",
        "cat": 0
      }
    ],
    "items_ar": [
      {
        "s": "\\(0.75 = \\frac{3}{4}\\)",
        "cat": 0
      },
      {
        "s": "\\(\\sqrt{2}\\)",
        "cat": 1
      },
      {
        "s": "\\(\\pi\\)",
        "cat": 1
      },
      {
        "s": "\\(-8\\)",
        "cat": 0
      },
      {
        "s": "\\(0.333\\dots = \\frac{1}{3}\\)",
        "cat": 0
      },
      {
        "s": "\\(\\sqrt{49} = 7\\)",
        "cat": 0
      }
    ],
    "sol": "Rational numbers can be written as a ratio of integers; irrational numbers have non-terminating, non-repeating decimal expansions.",
    "sol_ar": "الأعداد النسبية يمكن كتابتها في صورة نسبة بين عددين صحيحين؛ بينما الأعداد غير النسبية تمثيلها العشري غير منتهٍ وغير دوري."
  },
  {
    "t": "se",
    "ti": "Spot the Error: Successive Percentage Multipliers (Numbers, Percents & Ratios)",
    "ti_ar": "اكتشف الخطأ: النسب المئوية المتتالية (الأعداد والنسب المئوية والتناسب)",
    "q": "An item priced at \\(350\\) rises by \\(30\\%\\) and is then discounted by \\(30\\%\\). Which step in the calculation is wrong?",
    "q_ar": "سلعة سعرها \\(350\\) زاد سعرها بنسبة \\(30\\%\\) ثم خُفِّض بنسبة \\(30\\%\\). أي خطوة تحتوي على خطأ؟",
    "steps": [
      "Apply the \\(30\\%\\) increase multiplier: \\(350 \\times 1.30 = 455\\).",
      "Recognize that the \\(30\\%\\) discount applies to the new price \\(455\\).",
      "Add the percentage changes directly: \\(+30\\% - 30\\% = 0\\%\\), claiming the final price returns to \\(350\\).",
      "Verify final price via product of multipliers."
    ],
    "steps_ar": [
      "تطبيق معامل الزيادة \\(30\\%\\): \\(350 \\times 1.30 = 455\\).",
      "ملاحظة أن خصم \\(30\\%\\) يُطبَّق على السعر الجديد \\(455\\).",
      "جمع النسبتين مباشرة \\(+30\\% - 30\\% = 0\\%\\) والادعاء بأن السعر النهائي يعود إلى \\(350\\).",
      "التحقق من السعر النهائي بضرب المعاملات."
    ],
    "errorStep": 3,
    "reasons": [
      "Successive percentages multiply rather than add: \\(455 \\times 0.70 = 319\\) (a net \\(9\\%\\) decrease).",
      "The final price is actually greater than \\(350\\).",
      "Discounts must be divided rather than multiplied."
    ],
    "reasons_ar": [
      "النسب المتتالية تُضرب كمعاملات ولا تُجمع: \\(455 \\times 0.70 = 319\\) (بانخفاض صافي قدره \\(9\\%\\)).",
      "السعر النهائي أكبر من \\(350\\).",
      "الخصم يُحسب بالقسمة لا بالضرب."
    ],
    "correctReason": 0
  },
  {
    "t": "ms",
    "ti": "Examiner Mode: Harmonic Round-Trip Speed & Bounds (Numbers, Percents & Ratios)",
    "ti_ar": "وضع المصحح: السرعة المتوسطة التوافقية والحدود (الأعداد والنسب المئوية والتناسب)",
    "q": "A vehicle travels a fixed distance \\(d\\) outbound at \\(80\\text{ km/h}\\) and returns the same distance \\(d\\) at \\(120\\text{ km/h}\\). (a) Express total time in terms of \\(d\\) and find the exact round-trip average speed. (b) If a length \\(L = 18\\text{ cm}\\) is rounded to the nearest \\(1\\text{ cm}\\), state its lower and upper bounds.",
    "q_ar": "تقطع مركبة مسافة \\(d\\) ذهاباً بسرعة \\(80\\text{ km/h}\\) وتعود المسافة نفسها بسرعة \\(120\\text{ km/h}\\). (أ) عبّر عن الزمن الكلي بدلالة \\(d\\) وأوجد السرعة المتوسطة للرحلة كاملة. (ب) إذا قُرِّب الطول \\(L = 18\\text{ cm}\\) لأقرب \\(1\\text{ cm}\\)، فاكتب الحد الأدنى والحد الأعلى.",
    "parts": [
      {
        "label": "Part (a) — Harmonic Average Speed",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "Total distance \\(= 2d\\), total time \\(= \\frac{d}{80} + \\frac{d}{120}\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "Average speed \\(= \\frac{2 \\cdot 80 \\cdot 120}{80 + 120} = 96\\text{ km/h}\\)."
          }
        ]
      },
      {
        "label": "Part (b) — Error Interval Bounds",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "Half-unit tolerance \\(\\pm 0.5\\text{ cm}\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "Error interval: \\(17.5 \\le L < 18.5\\)."
          }
        ]
      }
    ],
    "parts_ar": [
      {
        "label": "الجزء (أ) — السرعة المتوسطة التوافقية",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "المسافة الكلية \\(= 2d\\)، والزمن الكلي \\(= \\frac{d}{80} + \\frac{d}{120}\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "السرعة المتوسطة \\(= \\frac{2 \\cdot 80 \\cdot 120}{80 + 120} = 96\\text{ km/h}\\)."
          }
        ]
      },
      {
        "label": "الجزء (ب) — فترة الخطأ والحدود",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "نصف وحدة الدقة يساوي \\(\\pm 0.5\\text{ cm}\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "فترة القيمة الحقيقية: \\(17.5 \\le L < 18.5\\)."
          }
        ]
      }
    ]
  },
  {
    "t": "sb",
    "ti": "Step Builder: Successive Multipliers & Net Change (Numbers, Percents & Ratios)",
    "ti_ar": "بناء الخطوات: المعاملات المتتالية وصافي التغير (الأعداد والنسب المئوية والتناسب)",
    "steps": [
      {
        "l": "Increase \\(350\\) by \\(30\\%\\): new value \\(=\\)",
        "a": "455",
        "h": "Compute 350 × 1.30."
      },
      {
        "l": "Now discount \\(455\\) by \\(30\\%\\): final value \\(=\\)",
        "a": "319",
        "h": "Compute 455 × 0.70."
      },
      {
        "l": "Find the net decrease \\(350 - 319 =\\)",
        "a": "31",
        "h": "Subtract 319 from 350."
      }
    ],
    "steps_ar": [
      {
        "l": "زد العدد \\(350\\) بنسبة \\(30\\%\\): القيمة الجديدة \\(=\\)",
        "a": "455",
        "h": "احسب 350 × 1.30."
      },
      {
        "l": "طبّق خصم \\(30\\%\\) على \\(455\\): القيمة النهائية \\(=\\)",
        "a": "319",
        "h": "احسب 455 × 0.70."
      },
      {
        "l": "أوجد مقدار النقصان الصافي \\(350 - 319 =\\)",
        "a": "31",
        "h": "اطرح 319 من 350."
      }
    ]
  },
  {
    "t": "mt",
    "ti": "Matching: Number, Bounds & Set Principles (Numbers, Percents & Ratios)",
    "ti_ar": "مطابقة: قوانين الأعداد والحدود والمجموعات (الأعداد والنسب المئوية والتناسب)",
    "p": [
      {
        "l": "Upper bound of \\(a / b\\) (positive)",
        "r": "\\(a_{\\text{upper}} / b_{\\text{lower}}\\)"
      },
      {
        "l": "Inclusion–Exclusion \\(|A \\cup B|\\)",
        "r": "\\(|A| + |B| - |A \\cap B|\\)"
      },
      {
        "l": "Equal-distance round-trip speed",
        "r": "\\(\\frac{2 v_1 v_2}{v_1 + v_2} = 96\\) for \\(80, 120\\)"
      },
      {
        "l": "Rationalising \\(\\frac{1}{\\sqrt{a} - \\sqrt{b}}\\)",
        "r": "Multiply numerator & denominator by \\(\\sqrt{a} + \\sqrt{b}\\)"
      }
    ],
    "p_ar": [
      {
        "l": "الحد الأعلى للقسمة \\(a / b\\) (موجبة)",
        "r": "\\(a_{\\text{الأعلى}} / b_{\\text{الأدنى}}\\)"
      },
      {
        "l": "مبدأ الشمول والإقصاء \\(|A \\cup B|\\)",
        "r": "\\(|A| + |B| - |A \\cap B|\\)"
      },
      {
        "l": "السرعة المتوسطة ذهاباً وإياباً",
        "r": "\\(\\frac{2 v_1 v_2}{v_1 + v_2} = 96\\) للسرعتين \\(80, 120\\)"
      },
      {
        "l": "إنطاق مقام \\(\\frac{1}{\\sqrt{a} - \\sqrt{b}}\\)",
        "r": "الضرب في المرافق \\(\\sqrt{a} + \\sqrt{b}\\) بسطاً ومقاماً"
      }
    ]
  }
];
D["act-algebra"] = [
  {
    "t": "mt",
    "ti": "Matching: Factoring",
    "ti_ar": "مطابقة: التحليل إلى عوامل",
    "p": [
      {
        "l": "a²−b²",
        "r": "(a+b)(a−b)"
      },
      {
        "l": "a²+2ab+b²",
        "r": "(a+b)²"
      },
      {
        "l": "a²−2ab+b²",
        "r": "(a−b)²"
      },
      {
        "l": "a(b+c)",
        "r": "ab+ac"
      }
    ],
    "p_ar": [
      {
        "l": "a²−b²",
        "r": "(a+b)(a−b)"
      },
      {
        "l": "a²+2ab+b²",
        "r": "(a+b)²"
      },
      {
        "l": "a²−2ab+b²",
        "r": "(a−b)²"
      },
      {
        "l": "a(b+c)",
        "r": "ab+ac"
      }
    ]
  },
  {
    "t": "num",
    "ti": "Numeric Entry: Sum of Quadratic Solutions",
    "ti_ar": "إدخال رقمي: مجموع حلول المعادلة التربيعية",
    "q": "What is the sum of the solutions of \\(2x^2 - 14x + 9 = 0\\)?",
    "q_ar": "ما مجموع حلي المعادلة \\(2x^2 - 14x + 9 = 0\\)؟",
    "a": 7,
    "tol": 0.01,
    "h": "Vieta's formulas give sum = -b/a.",
    "h_ar": "صيغ فييتا تعطي المجموع = -b/a.",
    "sol": "By Vieta's formulas, for \\(ax^2+bx+c=0\\), sum of solutions = \\(-b/a = -(-14)/2 = 7\\).",
    "sol_ar": "باستخدام صيغ فييتا، للمعادلة \\(ax^2+bx+c=0\\)، مجموع الحلين = \\(-b/a = -(-14)/2 = 7\\)."
  },
  {
    "t": "ord",
    "ti": "Order the Steps: Solve by Completing the Square",
    "ti_ar": "ترتيب الخطوات: الحل بإكمال المربع",
    "prompt": "Arrange the steps to solve \\(x^2 - 6x - 7 = 0\\) by completing the square:",
    "prompt_ar": "رتّب خطوات حل المعادلة \\(x^2 - 6x - 7 = 0\\) بإكمال المربع:",
    "items": [
      "Add 7 to both sides: \\(x^2 - 6x = 7\\)",
      "Add \\((-6/2)^2 = 9\\) to both sides: \\(x^2 - 6x + 9 = 16\\)",
      "Factor the left side into a binomial square: \\((x - 3)^2 = 16\\)",
      "Take the square root of both sides: \\(x - 3 = \\pm 4\\)",
      "Solve for \\(x\\): \\(x = 3 \\pm 4\\), giving \\(x = 7\\) or \\(x = -1\\)"
    ],
    "items_ar": [
      "إضافة 7 إلى كلا الطرفين: \\(x^2 - 6x = 7\\)",
      "إضافة \\((-6/2)^2 = 9\\) إلى الطرفين: \\(x^2 - 6x + 9 = 16\\)",
      "تحليل الطرف الأيسر إلى مربع كامل: \\((x - 3)^2 = 16\\)",
      "أخذ الجذر التربيعي للطرفين: \\(x - 3 = \\pm 4\\)",
      "إيجاد قيمة \\(x\\): \\(x = 3 \\pm 4\\)، مما يعطي \\(x = 7\\) أو \\(x = -1\\)"
    ],
    "sol": "Isolate constant, add (b/2)², factor perfect square, extract square root, isolate x.",
    "sol_ar": "اعزل الحد الثابت، أضف (b/2)²، حلل إلى مربع كامل، خذ الجذر التربيعي، ثم اعزل x."
  },
  {
    "t": "sr",
    "ti": "Worked Example: Solve a Literal Equation",
    "ti_ar": "مثال محلول: حل معادلة حرفية لعزل متغير",
    "steps": [
      "Solve \\(A=\\dfrac12bh\\) for \\(h\\). Multiply both sides by 2: \\(2A=bh\\).",
      "Divide both sides by \\(b\\): \\(h=\\dfrac{2A}{b}\\)."
    ],
    "steps_ar": [
      "حل المعادلة \\(A=\\dfrac12bh\\) بالنسبة للمتغير \\(h\\). اضرب كلا الطرفين في 2: \\(2A=bh\\).",
      "اقسم كلا الطرفين على \\(b\\): \\(h=\\dfrac{2A}{b}\\)."
    ]
  },
  {
    "t": "cat",
    "ti": "Classify Systems of Linear Equations by Number of Solutions",
    "ti_ar": "تصنيف أنظمة المعادلات الخطية حسب عدد الحلول",
    "categories": [
      "Unique Solution (Intersecting)",
      "No Solution (Parallel)",
      "Infinitely Many Solutions (Coincident)"
    ],
    "categories_ar": [
      "حل وحيد (متقاطعان)",
      "لا يوجد حل (متوازيان)",
      "عدد لا نهائي من الحلول (متطابقان)"
    ],
    "items": [
      {
        "s": "\\(y = 2x + 1\\) and \\(y = -x + 4\\)",
        "cat": 0
      },
      {
        "s": "\\(y = 3x - 5\\) and \\(y = 3x + 2\\)",
        "cat": 1
      },
      {
        "s": "\\(2x + 4y = 8\\) and \\(x + 2y = 4\\)",
        "cat": 2
      },
      {
        "s": "Lines with different slopes",
        "cat": 0
      },
      {
        "s": "Same slope with distinct y-intercepts",
        "cat": 1
      },
      {
        "s": "Same slope with identical y-intercepts",
        "cat": 2
      }
    ],
    "items_ar": [
      {
        "s": "\\(y = 2x + 1\\) و \\(y = -x + 4\\)",
        "cat": 0
      },
      {
        "s": "\\(y = 3x - 5\\) و \\(y = 3x + 2\\)",
        "cat": 1
      },
      {
        "s": "\\(2x + 4y = 8\\) و \\(x + 2y = 4\\)",
        "cat": 2
      },
      {
        "s": "مستقيمان لهما ميلان مختلفان",
        "cat": 0
      },
      {
        "s": "الميل نفسه مع مقطعين صاديين مختلفين",
        "cat": 1
      },
      {
        "s": "الميل نفسه مع المقطع الصادي نفسه",
        "cat": 2
      }
    ],
    "sol": "Intersecting lines have 1 solution; parallel lines have 0 solutions; coincident lines have infinitely many solutions.",
    "sol_ar": "المستقيمان المتقاطعان لهما حل واحد، والمتوازيان ليس لهما حل، والمتطابقان لهما عدد لا نهائي من الحلول."
  },
  {
    "t": "se",
    "ti": "Spot the Error: Vieta's Sum of Squares Identity (Elementary & Intermediate Algebra)",
    "ti_ar": "اكتشف الخطأ: متطابقة فييت لمجموع مربعي الجذرين (الجبر الأساسي والمتوسط)",
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
    "ti": "Examiner Mode: Discriminant, Vieta & Factor Theorem (Elementary & Intermediate Algebra)",
    "ti_ar": "وضع المصحح: المميز وعلاقات فييت ونظرية العامل (الجبر الأساسي والمتوسط)",
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
    "ti": "Step Builder: Vieta Relations & Remainder Theorem (Elementary & Intermediate Algebra)",
    "ti_ar": "بناء الخطوات: علاقات فييت ونظرية الباقي (الجبر الأساسي والمتوسط)",
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
    "t": "qc",
    "ti": "Quick Check: Remainder Theorem Direct Evaluation (Elementary & Intermediate Algebra)",
    "ti_ar": "فحص سريع: تطبيق نظرية الباقي (الجبر الأساسي والمتوسط)",
    "q": "What is the remainder when \\(P(x) = x^3 - 2x + 3\\) is divided by \\((x - 2)\\)?",
    "q_ar": "ما باقي قسمة \\(P(x) = x^3 - 2x + 3\\) على \\((x - 2)\\)؟",
    "o": [
      "\\(7\\)",
      "\\(3\\)",
      "\\(11\\)",
      "\\(-1\\)"
    ],
    "o_ar": [
      "\\(7\\)",
      "\\(3\\)",
      "\\(11\\)",
      "\\(-1\\)"
    ],
    "a": 0,
    "ex": "By the Remainder Theorem, \\(P(2) = 8 - 4 + 3 = 7\\).",
    "ex_ar": "بنظرية الباقي نعوّض \\(x = 2\\): \\(P(2) = 8 - 4 + 3 = 7\\)."
  }
];
D["act-coordgeo"] = [
  {
    "t": "sr",
    "ti": "Worked Example: Slope of a Perpendicular Line",
    "ti_ar": "مثال محلول: ميل المستقيم العمودي",
    "steps": [
      "Find the slope of a line perpendicular to \\(y=\\dfrac23x+1\\). The original line has slope \\(m=\\dfrac23\\).",
      "Perpendicular lines have slopes that are negative reciprocals of each other.",
      "The perpendicular slope is \\(-\\dfrac32\\)."
    ],
    "steps_ar": [
      "أوجد ميل المستقيم العمودي على \\(y=\\dfrac23x+1\\). ميل المستقيم المعطى هو \\(m=\\dfrac23\\).",
      "المستقيمان المتعامدان ميلهما مقلوب سالب معكوس كل منهما للآخر.",
      "ميل المستقيم العمودي هو \\(-\\dfrac32\\)."
    ]
  },
  {
    "t": "qc",
    "ti": "Quick Check: Slopes",
    "ti_ar": "فحص سريع: الميول",
    "q": "Slope of a horizontal line:",
    "q_ar": "ميل الخط الأفقي هو:",
    "o": [
      "0",
      "Undefined",
      "1",
      "−1"
    ],
    "o_ar": [
      "0",
      "غير معرّف",
      "1",
      "−1"
    ],
    "a": 0,
    "ex": "Horizontal lines have slope 0.",
    "ex_ar": "الخطوط الأفقية ميلها يساوي 0 دائماً."
  },
  {
    "t": "num",
    "ti": "Numeric Entry: Radius of a Circle",
    "ti_ar": "إدخال رقمي: نصف قطر الدائرة",
    "q": "What is the radius of the circle given by \\((x - 3)^2 + (y + 4)^2 = 49\\)?",
    "q_ar": "ما نصف قطر الدائرة المعطاة بالمعادلة \\((x - 3)^2 + (y + 4)^2 = 49\\)؟",
    "a": 7,
    "tol": 0.01,
    "h": "Compare with standard form (x - h)² + (y - k)² = r².",
    "h_ar": "قارن بالصورة القياسية (x - h)² + (y - k)² = r².",
    "sol": "In standard form \\((x - h)^2 + (y - k)^2 = r^2\\), \\(r^2 = 49\\), so radius \\(r = 7\\).",
    "sol_ar": "في الصورة القياسية \\((x - h)^2 + (y - k)^2 = r^2\\)، \\(r^2 = 49\\)، إذن نصف القطر \\(r = 7\\)."
  },
  {
    "t": "cat",
    "ti": "Categorize: Slopes of Lines",
    "ti_ar": "تصنيف: ميول المستقيمات",
    "prompt": "Classify each line or description by its slope characteristic:",
    "prompt_ar": "صنّف كل مستقيم أو وصف بحسب خاصية ميله:",
    "categories": [
      "Zero Slope (Horizontal)",
      "Undefined Slope (Vertical)",
      "Positive Slope",
      "Negative Slope"
    ],
    "categories_ar": [
      "ميل صفري (أفقي)",
      "ميل غير معرّف (رأسي)",
      "ميل موجب",
      "ميل سالب"
    ],
    "items": [
      {
        "s": "Line \\(y = 5\\)",
        "cat": 0
      },
      {
        "s": "Line \\(x = -2\\)",
        "cat": 1
      },
      {
        "s": "Line through \\((1, 2)\\) and \\((3, 8)\\)",
        "cat": 2
      },
      {
        "s": "Line perpendicular to \\(y = 2x + 1\\)",
        "cat": 3
      },
      {
        "s": "Line with equation \\(3x + 4y = 12\\)",
        "cat": 3
      },
      {
        "s": "Line perpendicular to \\(x = 4\\)",
        "cat": 0
      }
    ],
    "items_ar": [
      {
        "s": "المستقيم \\(y = 5\\)",
        "cat": 0
      },
      {
        "s": "المستقيم \\(x = -2\\)",
        "cat": 1
      },
      {
        "s": "المستقيم المار بالنقطتين \\((1, 2)\\) و \\((3, 8)\\)",
        "cat": 2
      },
      {
        "s": "المستقيم العمودي على \\(y = 2x + 1\\)",
        "cat": 3
      },
      {
        "s": "المستقيم ذو المعادلة \\(3x + 4y = 12\\)",
        "cat": 3
      },
      {
        "s": "المستقيم العمودي على \\(x = 4\\)",
        "cat": 0
      }
    ],
    "sol": "Horizontal lines have m=0; vertical lines have undefined m; rising lines have m>0; falling lines have m<0.",
    "sol_ar": "المستقيمات الأفقية m=0؛ والرأسية غير معرّفة؛ والصاعدة m>0؛ والهابطة m<0."
  },
  {
    "t": "ord",
    "ti": "Order the Steps: Distance Between Two Coordinate Points",
    "ti_ar": "ترتيب الخطوات: حساب المسافة بين نقطتين في المستوى الإحداثي",
    "q": "Arrange the sequence to compute the distance between \\((1, 2)\\) and \\((4, 6)\\):",
    "q_ar": "رتّب تسلسل خطوات حساب المسافة بين النقطتين \\((1, 2)\\) و \\((4, 6)\\):",
    "items": [
      "Identify coordinates: \\((x_1, y_1) = (1, 2)\\) and \\((x_2, y_2) = (4, 6)\\)",
      "Compute coordinate differences: \\(\\Delta x = 4 - 1 = 3\\) and \\(\\Delta y = 6 - 2 = 4\\)",
      "Square each difference: \\(3^2 = 9\\) and \\(4^2 = 16\\)",
      "Sum the squared values: \\(9 + 16 = 25\\)",
      "Take the square root: \\(d = \\sqrt{25} = 5\\)"
    ],
    "items_ar": [
      "تحديد الإحداثيات: \\((x_1, y_1) = (1, 2)\\) و \\((x_2, y_2) = (4, 6)\\)",
      "حساب الفروق الإحداثية: \\(\\Delta x = 4 - 1 = 3\\) و \\(\\Delta y = 6 - 2 = 4\\)",
      "تربيع كل فرق: \\(3^2 = 9\\) و \\(4^2 = 16\\)",
      "جمع القيم المربعة: \\(9 + 16 = 25\\)",
      "أخذ الجذر التربيعي: \\(d = \\sqrt{25} = 5\\)"
    ],
    "sol": "Distance formula is derived directly from the Pythagorean theorem: d = √((x₂ - x₁)² + (y₂ - y₁)²).",
    "sol_ar": "قانون المسافة مشتق مباشرة من مبرهنة فيثاغورس: d = √((x₂ - x₁)² + (y₂ - y₁)²)."
  },
  {
    "t": "se",
    "ti": "Spot the Error: Perpendicular Gradient & Inequality Sign (Coordinate Geometry)",
    "ti_ar": "اكتشف الخطأ: ميل المستقيم المتعامد وإشارة المتباينة (الهندسة الإحداثية ومعادلات المستقيم)",
    "q": "Given \\(A(1, 4)\\) and \\(B(3, 12)\\), a student finds the gradient of the line perpendicular to \\(AB\\). Which step is wrong?",
    "q_ar": "مُعطى النقطتان \\(A(1, 4)\\) و\\(B(3, 12)\\)، يحسب طالب ميل العمودي على \\(AB\\). أي خطوة خاطئة؟",
    "steps": [
      "Compute gradient of \\(AB\\): \\(m_{AB} = \\frac{12 - 4}{3 - 1} = \\frac{8}{2} = 4\\).",
      "Compute midpoint of \\(AB\\): \\(M = (2, 8)\\).",
      "Take the perpendicular gradient as the positive reciprocal \\(m_{\\perp} = \\frac{1}{4}\\) without negating the sign.",
      "Substitute \\(M(2, 8)\\) into point-slope form."
    ],
    "steps_ar": [
      "حساب ميل القطعة \\(AB\\): \\(m_{AB} = \\frac{12 - 4}{3 - 1} = 4\\).",
      "حساب نقطة المنتصف: \\(M = (2, 8)\\).",
      "أخذ ميل العمودي كمقلوب موجب \\(m_{\\perp} = \\frac{1}{4}\\) دون عكس الإشارة.",
      "التعويض بالنقطة \\(M(2, 8)\\) في معادلة المستقيم."
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
    "ti": "Examiner Mode: Line Equation & Perpendicular Bisector (Coordinate Geometry)",
    "ti_ar": "وضع المصحح: معادلة المستقيم والعمود المنصّف (الهندسة الإحداثية ومعادلات المستقيم)",
    "q": "Points \\(A(1, 4)\\) and \\(B(3, 12)\\) lie in the coordinate plane. (a) Find the equation of line \\(AB\\) in \\(y = mx + c\\) form. (b) Find the midpoint \\(M\\) and the gradient of the perpendicular bisector of \\(AB\\).",
    "q_ar": "النقطتان \\(A(1, 4)\\) و\\(B(3, 12)\\) في المستوى الإحداثي. (أ) أوجد معادلة المستقيم \\(AB\\) بصيغة \\(y = mx + c\\). (ب) أوجد نقطة المنتصف \\(M\\) وميل العمود المنصّف للقطعة \\(AB\\).",
    "parts": [
      {
        "label": "Part (a) — Gradient & Line Equation",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "Gradient \\(m = \\frac{12 - 4}{3 - 1} = 4\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "Intercept \\(c = 4 - 4(1) = 0\\), giving \\(y = 4x + 0\\)."
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
            "text": "Midpoint \\(M = \\left(\\frac{1+3}{2}, \\frac{4+12}{2}\\right) = (2, 8)\\)."
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
            "text": "الميل \\(m = \\frac{12 - 4}{3 - 1} = 4\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "المقطع الصادي \\(c = 0\\)، والمعادلة \\(y = 4x + 0\\)."
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
            "text": "نقطة المنتصف \\(M = (2, 8)\\)."
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
    "ti": "Step Builder: Coordinate Slope, Intercept & Midpoint (Coordinate Geometry)",
    "ti_ar": "بناء الخطوات: الميل والمقطع ونقطة المنتصف (الهندسة الإحداثية ومعادلات المستقيم)",
    "steps": [
      {
        "l": "Find the slope \\(m\\) through \\((1, 4)\\) and \\((3, 12)\\): \\(m =\\)",
        "a": "4",
        "h": "Compute (12 − 4) / (3 − 1)."
      },
      {
        "l": "Find the \\(y\\)-intercept \\(c\\) in \\(y = mx + c\\): \\(c =\\)",
        "a": "0",
        "h": "Compute 4 − 4×1."
      },
      {
        "l": "Find the \\(y\\)-coordinate of the midpoint \\(M\\): \\(y_M =\\)",
        "a": "8",
        "h": "Average 4 and 12."
      }
    ],
    "steps_ar": [
      {
        "l": "أوجد الميل \\(m\\) للمستقيم المار بـ \\((1, 4)\\) و\\((3, 12)\\): \\(m =\\)",
        "a": "4",
        "h": "احسب (12 − 4) ÷ (3 − 1)."
      },
      {
        "l": "أوجد المقطع الصادي \\(c\\) في \\(y = mx + c\\): \\(c =\\)",
        "a": "0",
        "h": "احسب 4 − 4×1."
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
    "ti": "Matching: Linear & Coordinate Geometry Criteria (Coordinate Geometry)",
    "ti_ar": "مطابقة: علاقات المستقيمات والهندسة الإحداثية (الهندسة الإحداثية ومعادلات المستقيم)",
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
D["act-planegeo"] = [
  {
    "t": "sr",
    "ti": "Worked Example: Exterior Angle Theorem",
    "ti_ar": "مثال محلول: مبرهنة الزاوية الخارجية للمثلث",
    "steps": [
      "A triangle has two interior angles of 50° and 65°. By the Exterior Angle Theorem, the exterior angle at the third vertex equals the sum of the two non-adjacent interior angles.",
      "Sum: \\(50°+65°=115°\\).",
      "The exterior angle is \\(115°\\)."
    ],
    "steps_ar": [
      "مثلث فيه زاويتان داخليتان قياسهما 50° و 65°. وفقاً لمبرهنة الزاوية الخارجية، قياس الزاوية الخارجية عند الرأس الثالث يساوي مجموع قياسي الزاويتين الداخليتين البعيدتين.",
      "المجموع: \\(50°+65°=115°\\).",
      "قياس الزاوية الخارجية هو \\(115°\\)."
    ]
  },
  {
    "t": "qc",
    "ti": "Quick Check: Polygon Angles",
    "ti_ar": "فحص سريع: زوايا المضلع",
    "q": "Sum of interior angles of a pentagon:",
    "q_ar": "مجموع قياسات الزوايا الداخلية للشكل الخماسي:",
    "o": [
      "540°",
      "360°",
      "720°",
      "450°"
    ],
    "o_ar": [
      "540°",
      "360°",
      "720°",
      "450°"
    ],
    "a": 0,
    "ex": "\\((5-2)\\times180°=540°\\).",
    "ex_ar": "\\((5-2)\\times180°=540°\\)."
  },
  {
    "t": "num",
    "ti": "Numeric Entry: Interior Angle of a Regular Polygon",
    "ti_ar": "إدخال رقمي: الزاوية الداخلية لمضلع منتظم",
    "q": "What is the measure in degrees of one interior angle of a regular octagon (8 sides)?",
    "q_ar": "ما قياس كل زاوية داخلية في الثماني المنتظم (8 أضلاع) بالدرجات؟",
    "a": 135,
    "tol": 0.1,
    "h": "Formula: (n - 2) × 180° / n.",
    "h_ar": "القانون: (n - 2) × 180° / n.",
    "sol": "Each interior angle of an n-gon is \\((n - 2) \\times 180^\\circ / n\\). For \\(n = 8\\), \\(6 \\times 180^\\circ / 8 = 1080^\\circ / 8 = 135^\\circ\\).",
    "sol_ar": "كل زاوية داخلية في مضلع ذي n ضلعاً قياسها \\((n - 2) \\times 180^\\circ / n\\). حيث \\(n = 8\\): \\(6 \\times 180^\\circ / 8 = 1080^\\circ / 8 = 135^\\circ\\)."
  },
  {
    "t": "ord",
    "ti": "Order the Steps: Hypotenuse of a 30-60-90 Triangle",
    "ti_ar": "ترتيب الخطوات: حساب وتر المثلث الثلاثيني الستيني",
    "prompt": "Arrange the steps to find the hypotenuse if the side opposite the 30° angle is 5:",
    "prompt_ar": "رتّب خطوات إيجاد طول الوتر إذا كان طول الضلع المقابل للزاوية 30° يساوي 5:",
    "items": [
      "Identify that the side opposite 30° is the shortest leg: \\(x = 5\\)",
      "Recall the side length ratio \\(1 : \\sqrt{3} : 2\\) for 30°-60°-90° triangles",
      "Multiply the shortest leg by 2 to find the hypotenuse: \\(2x = 2(5)\\)",
      "Conclude that the hypotenuse length is 10"
    ],
    "items_ar": [
      "تحديد أن الضلع المقابل للزاوية 30° هو الساق الأقصر: \\(x = 5\\)",
      "تذكر نسبة أطوال أضلاع المثلث 30°-60°-90° وهي \\(1 : \\sqrt{3} : 2\\)",
      "ضرب طول الساق الأقصر في 2 لإيجاد الوتر: \\(2x = 2(5)\\)",
      "استنتاج أن طول الوتر يساوي 10"
    ],
    "sol": "Hypotenuse in 30-60-90 triangle is always twice the shorter leg.",
    "sol_ar": "الوتر في المثلث الثلاثيني الستيني يساوي دائماً ضعف طول الساق الأقصر المقابلة للزاوية 30°."
  },
  {
    "t": "cat",
    "ti": "Classify Triangles by Side and Angle Properties",
    "ti_ar": "تصنيف المثلثات حسب خصائص الأضلاع والزوايا",
    "categories": [
      "Equilateral",
      "Isosceles (Not Equilateral)",
      "Scalene"
    ],
    "categories_ar": [
      "متطابق الأضلاع",
      "متطابق الضلعين (غير متطابق الأضلاع)",
      "مختلف الأضلاع"
    ],
    "items": [
      {
        "s": "Triangle with angles 60°, 60°, 60°",
        "cat": 0
      },
      {
        "s": "Triangle with sides 5, 5, 8",
        "cat": 1
      },
      {
        "s": "Triangle with sides 3, 4, 5",
        "cat": 2
      },
      {
        "s": "Triangle with angles 40°, 40°, 100°",
        "cat": 1
      },
      {
        "s": "Triangle with all three sides of equal length",
        "cat": 0
      },
      {
        "s": "Triangle with angles 30°, 60°, 90°",
        "cat": 2
      }
    ],
    "items_ar": [
      {
        "s": "مثلث زواياه 60°، 60°، 60°",
        "cat": 0
      },
      {
        "s": "مثلث أطوال أضلاعه 5، 5، 8",
        "cat": 1
      },
      {
        "s": "مثلث أطوال أضلاعه 3، 4، 5",
        "cat": 2
      },
      {
        "s": "مثلث قياسات زواياه 40°، 40°، 100°",
        "cat": 1
      },
      {
        "s": "مثلث جميع أضلاعه الثلاثة متساوية في الطول",
        "cat": 0
      },
      {
        "s": "مثلث قياسات زواياه 30°، 60°، 90°",
        "cat": 2
      }
    ],
    "sol": "Equilateral has 3 equal sides and 60° angles; isosceles has 2 equal sides; scalene has all distinct sides and angles.",
    "sol_ar": "متطابق الأضلاع فيه 3 أضلاع متساوية وزوايا 60°؛ ومتطابق الضلعين فيه ضلعان متساويان؛ ومختلف الأضلاع أضلاعه وزواياه مختلفة."
  },
  {
    "t": "se",
    "ti": "Spot the Error: Area & Volume Similarity Scaling (Plane Geometry)",
    "ti_ar": "اكتشف الخطأ: معامل تشابه المساحات والحجوم (الهندسة المستوية والأشكال الهندسية)",
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
    "ti": "Examiner Mode: Circle Theorems, Sectors & Similarity (Plane Geometry)",
    "ti_ar": "وضع المصحح: نظريات الدائرة والقطاعات والتشابه (الهندسة المستوية والأشكال الهندسية)",
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
    "ti": "Step Builder: Circle Radius, Polygon Angles & Similarity (Plane Geometry)",
    "ti_ar": "بناء الخطوات: الدائرة وزوايا المضلعات والتشابه (الهندسة المستوية والأشكال الهندسية)",
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
    "ti": "Matching: Circle Theorems & Solid Mensuration (Plane Geometry)",
    "ti_ar": "مطابقة: نظريات الدائرة وقوانين القياس الهندسي (الهندسة المستوية والأشكال الهندسية)",
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
D["act-functions"] = [
  {
    "t": "tf",
    "ti": "True or False: Functions",
    "ti_ar": "صحيح أم خطأ: الدوال",
    "items": [
      {
        "s": "Vertical line test identifies functions",
        "a": true,
        "ex": "Correct."
      },
      {
        "s": "\\(f(x)=x^2\\) is one-to-one",
        "a": false,
        "ex": "\\(f(-2)=f(2)\\), fails 1-1 test."
      },
      {
        "s": "Domain of \\(\\sqrt{x}\\) is all reals",
        "a": false,
        "ex": "Domain: \\(x\\geq0\\)."
      },
      {
        "s": "\\((f\\circ g)(x)\\): apply \\(g\\) first, then \\(f\\)",
        "a": true,
        "ex": "Correct order."
      }
    ],
    "items_ar": [
      {
        "s": "اختبار الخط الرأسي يحدد ما إذا كانت العلاقة تمثل دالة",
        "a": true,
        "ex": "صحيح، إذا قطع أي خط رأسي المنحنى في أكثر من نقطة فالعلاقة ليست دالة."
      },
      {
        "s": "الدالة \\(f(x)=x^2\\) دالة متباينة (واحد لواحد)",
        "a": false,
        "ex": "خطأ، لأن \\(f(-2)=f(2)=4\\)، فتفشل في اختبار الخط الأفقي."
      },
      {
        "s": "مجال الدالة \\(\\sqrt{x}\\) هو مجموعة كل الأعداد الحقيقية",
        "a": false,
        "ex": "خطأ، المجال هو الأعداد الحقيقية غير السالبة: \\(x\\geq0\\)."
      },
      {
        "s": "في تركيب الدوال \\((f\\circ g)(x)\\): نطبق الدالة \\(g\\) أولاً ثم الدالة \\(f\\)",
        "a": true,
        "ex": "صحيح، تطبق الدالة الداخلية أولاً."
      }
    ]
  },
  {
    "t": "mt",
    "ti": "Matching: Function Rules & Notation",
    "ti_ar": "مطابقة: قواعد ورموز الدوال",
    "p": [
      {
        "l": "(f ∘ g)(x)",
        "r": "f(g(x)) — evaluate g first"
      },
      {
        "l": "f⁻¹(x)",
        "r": "Inverse reflection across y = x"
      },
      {
        "l": "f(-x) = f(x)",
        "r": "Even function (y-axis symmetry)"
      },
      {
        "l": "f(-x) = -f(x)",
        "r": "Odd function (origin symmetry)"
      }
    ],
    "p_ar": [
      {
        "l": "(f ∘ g)(x)",
        "r": "f(g(x)) — تطبيق دالة g أولاً"
      },
      {
        "l": "f⁻¹(x)",
        "r": "الدالة العكسية بانعكاس حول y = x"
      },
      {
        "l": "f(-x) = f(x)",
        "r": "دالة زوجية (تماثل حول محور الصادات)"
      },
      {
        "l": "f(-x) = -f(x)",
        "r": "دالة فردية (تماثل حول نقطة الأصل)"
      }
    ]
  },
  {
    "t": "qc",
    "ti": "Quick Check: Function Composition",
    "ti_ar": "فحص سريع: تركيب الدوال",
    "q": "If \\(f(x)=2x+3\\) and \\(g(x)=x^2\\), find \\((f\\circ g)(2)\\):",
    "q_ar": "إذا كانت \\(f(x)=2x+3\\) و \\(g(x)=x^2\\)، احسب \\((f\\circ g)(2)\\):",
    "o": [
      "11",
      "14",
      "19",
      "7"
    ],
    "o_ar": [
      "11",
      "14",
      "19",
      "7"
    ],
    "a": 0,
    "ex": "\\(g(2)=2^2=4\\). Then \\(f(4)=2(4)+3=11\\).",
    "ex_ar": "\\(g(2)=2^2=4\\). ثم \\(f(4)=2(4)+3=11\\)."
  },
  {
    "t": "num",
    "ti": "Numeric Entry: Nested Composition",
    "ti_ar": "إدخال رقمي: التركيب المتداخل للدوال",
    "q": "If \\(f(x) = 2x - 3\\) and \\(g(x) = x^2 + 1\\), find \\(f(g(3))\\).",
    "q_ar": "إذا كانت \\(f(x) = 2x - 3\\) و \\(g(x) = x^2 + 1\\)، احسب \\(f(g(3))\\).",
    "a": 17,
    "tol": 0.01,
    "h": "Evaluate g(3) first, then plug that result into f.",
    "h_ar": "احسب g(3) أولاً، ثم عوض بالناتج داخل f.",
    "sol": "First evaluate inside: \\(g(3) = 3^2 + 1 = 10\\). Then evaluate outside: \\(f(10) = 2(10) - 3 = 17\\).",
    "sol_ar": "أولاً نحسب القيمة الداخلية: \\(g(3) = 3^2 + 1 = 10\\). ثم نعوض في الدالة الخارجية: \\(f(10) = 2(10) - 3 = 17\\)."
  },
  {
    "t": "cat",
    "ti": "Categorize: Function Symmetry",
    "ti_ar": "تصنيف: تماثل الدوال",
    "prompt": "Classify each function by its algebraic symmetry:",
    "prompt_ar": "صنّف كل دالة بحسب تماثلها الجبري:",
    "categories": [
      "Even (y-axis symmetry)",
      "Odd (origin symmetry)",
      "Neither"
    ],
    "categories_ar": [
      "زوجية (تماثل حول محور الصادات)",
      "فردية (تماثل حول نقطة الأصل)",
      "ليست زوجية ولا فردية"
    ],
    "items": [
      {
        "s": "\\(f(x) = x^4 - 2x^2\\)",
        "cat": 0
      },
      {
        "s": "\\(f(x) = x^3 - 5x\\)",
        "cat": 1
      },
      {
        "s": "\\(f(x) = \\cos(x)\\)",
        "cat": 0
      },
      {
        "s": "\\(f(x) = \\sin(x)\\)",
        "cat": 1
      },
      {
        "s": "\\(f(x) = x^2 + 3x\\)",
        "cat": 2
      }
    ],
    "items_ar": [
      {
        "s": "\\(f(x) = x^4 - 2x^2\\)",
        "cat": 0
      },
      {
        "s": "\\(f(x) = x^3 - 5x\\)",
        "cat": 1
      },
      {
        "s": "\\(f(x) = \\cos(x)\\)",
        "cat": 0
      },
      {
        "s": "\\(f(x) = \\sin(x)\\)",
        "cat": 1
      },
      {
        "s": "\\(f(x) = x^2 + 3x\\)",
        "cat": 2
      }
    ],
    "sol": "Even functions satisfy f(-x) = f(x); odd functions satisfy f(-x) = -f(x).",
    "sol_ar": "الدوال الزوجية تحقق f(-x) = f(x)؛ والدوال الفردية تحقق f(-x) = -f(x)."
  },
  {
    "t": "ord",
    "ti": "Order the Steps: Finding the Inverse Function",
    "ti_ar": "ترتيب الخطوات: إيجاد الدالة العكسية",
    "q": "Arrange the algebraic steps to find the inverse \\(f^{-1}(x)\\) of \\(f(x) = 3x - 5\\):",
    "q_ar": "رتّب الخطوات الجبرية لإيجاد الدالة العكسية \\(f^{-1}(x)\\) للدالة \\(f(x) = 3x - 5\\):",
    "items": [
      "Replace \\(f(x)\\) with \\(y\\): \\(y = 3x - 5\\)",
      "Swap the variables \\(x\\) and \\(y\\): \\(x = 3y - 5\\)",
      "Isolate the \\(y\\) term by adding 5 to both sides: \\(x + 5 = 3y\\)",
      "Divide both sides by 3: \\(y = \\frac{x + 5}{3}\\)",
      "Rewrite using inverse notation: \\(f^{-1}(x) = \\frac{x + 5}{3}\\)"
    ],
    "items_ar": [
      "استبدال \\(f(x)\\) بالمتغير \\(y\\): \\(y = 3x - 5\\)",
      "تبديل المتغيرين \\(x\\) و \\(y\\): \\(x = 3y - 5\\)",
      "عزل الحد المحتوي على \\(y\\) بإضافة 5 للطرفين: \\(x + 5 = 3y\\)",
      "قسمة كلا الطرفين على 3: \\(y = \\frac{x + 5}{3}\\)",
      "إعادة الكتابة باستخدام رمز الدالة العكسية: \\(f^{-1}(x) = \\frac{x + 5}{3}\\)"
    ],
    "sol": "Swap x and y, then solve for y to construct the inverse function.",
    "sol_ar": "بدل x و y، ثم حل المعادلة بالنسبة لـ y لبناء الدالة العكسية."
  },
  {
    "t": "se",
    "ti": "Spot the Error: Composite Order & Inverse Domain (Functions & Graphs)",
    "ti_ar": "اكتشف الخطأ: ترتيب تركيب الدوال ومجال المعكوس (الدوال والتمثيل البياني)",
    "q": "Let \\(f(x) = 5x + 5\\) and \\(g(x) = x^2 + 1\\). A student evaluates \\((f \\circ g)(3)\\). Which step is wrong?",
    "q_ar": "لتكن \\(f(x) = 5x + 5\\) و\\(g(x) = x^2 + 1\\). يحسب طالب \\((f \\circ g)(3)\\). أي خطوة خاطئة؟",
    "steps": [
      "Write \\((f \\circ g)(3) = g(f(3))\\) by applying \\(f\\) first instead of \\(g\\).",
      "Compute \\(f(3) = 20\\).",
      "Square and add \\(1\\) to get \\(401\\)."
    ],
    "steps_ar": [
      "كتابة \\((f \\circ g)(3) = g(f(3))\\) بتطبيق \\(f\\) أولاً بدلاً من \\(g\\).",
      "حساب \\(f(3) = 20\\).",
      "التربيع وإضافة \\(1\\) للحصول على \\(401\\)."
    ],
    "errorStep": 1,
    "reasons": [
      "By definition \\((f \\circ g)(x) = f(g(x))\\): evaluate the inner function \\(g(3) = 10\\) first, then \\(f(10) = 55\\).",
      "Function composition is always commutative.",
      "You must multiply \\(f(3)\\) by \\(g(3)\\)."
    ],
    "reasons_ar": [
      "حسب التعريف \\((f \\circ g)(x) = f(g(x))\\): نحسب الدالة الداخلية أولاً \\(g(3) = 10\\) ثم \\(f(10) = 55\\).",
      "تركيب الدوال عملية إبدالية دائماً.",
      "يجب ضرب \\(f(3)\\) في \\(g(3)\\)."
    ],
    "correctReason": 0
  },
  {
    "t": "ms",
    "ti": "Examiner Mode: One-to-One Domain Restriction & Inverse (Functions & Graphs)",
    "ti_ar": "وضع المصحح: تقييد المجال وإيجاد الدالة العكسية (الدوال والتمثيل البياني)",
    "q": "Let \\(h(x) = (x - 5)^2 + 5\\) for \\(x \\ge 5\\). (a) State the range of \\(h\\) and explain why \\(h^{-1}\\) exists on \\(x \\ge 5\\). (b) Find \\(h^{-1}(x)\\) and state its domain.",
    "q_ar": "لتكن \\(h(x) = (x - 5)^2 + 5\\) حيث \\(x \\ge 5\\). (أ) اذكر مدى \\(h\\) وفسّر سبب وجود معكوس لها. (ب) أوجد \\(h^{-1}(x)\\) وحدد مجالها.",
    "parts": [
      {
        "label": "Part (a) — Range & Injectivity",
        "marks": 2,
        "rubric": [
          {
            "code": "B1",
            "marks": 1,
            "text": "Range of \\(h\\) is \\([ 5, \\infty )\\) since \\((x - 5)^2 \\ge 0\\)."
          },
          {
            "code": "B1",
            "marks": 1,
            "text": "For \\(x \\ge 5\\), \\(h\\) is strictly increasing (one-to-one / passes horizontal line test)."
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
            "text": "Solve \\(y = (x - 5)^2 + 5 \\implies x = 5 + \\sqrt{y - 5}\\) (choosing \\(+\\) branch for \\(x \\ge 5\\))."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "\\(h^{-1}(x) = 5 + \\sqrt{x - 5}\\) with domain \\(x \\ge 5\\)."
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
            "text": "مدى الدالة \\(h\\) هو \\([ 5, \\infty )\\) لأن \\((x - 5)^2 \\ge 0\\)."
          },
          {
            "code": "B1",
            "marks": 1,
            "text": "على الفترة \\(x \\ge 5\\) الدالة متزايدة تماماً (واحد لواحد)."
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
            "text": "حل المعادلة بدلالة \\(x\\) مع اختيار الفرع الموجب: \\(x = 5 + \\sqrt{y - 5}\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "\\(h^{-1}(x) = 5 + \\sqrt{x - 5}\\) ومجالها \\(x \\ge 5\\)."
          }
        ]
      }
    ]
  },
  {
    "t": "sb",
    "ti": "Step Builder: Composite & Inverse Function Evaluation (Functions & Graphs)",
    "ti_ar": "بناء الخطوات: حساب التركيب والمعكوس (الدوال والتمثيل البياني)",
    "steps": [
      {
        "l": "For \\(f(x) = 5x + 5\\) and \\(g(x) = x^2 + 1\\), find \\(g(3) =\\)",
        "a": "10",
        "h": "Compute 3² + 1."
      },
      {
        "l": "Now evaluate \\(f(g(3)) = f(10) =\\)",
        "a": "55",
        "h": "Compute 5×10 + 5."
      },
      {
        "l": "Evaluate \\(f^{-1}(20) =\\)",
        "a": "3",
        "h": "Solve 5x + 5 = 20."
      }
    ],
    "steps_ar": [
      {
        "l": "للدالتين \\(f(x) = 5x + 5\\) و\\(g(x) = x^2 + 1\\)، أوجد \\(g(3) =\\)",
        "a": "10",
        "h": "احسب 3² + 1."
      },
      {
        "l": "الآن احسب \\(f(g(3)) = f(10) =\\)",
        "a": "55",
        "h": "احسب 5×10 + 5."
      },
      {
        "l": "أوجد قيمة المعكوس \\(f^{-1}(20) =\\)",
        "a": "3",
        "h": "حل المعادلة 5x + 5 = 20."
      }
    ]
  }
];
D["act-trig"] = [
  {
    "t": "sb",
    "ti": "Step Builder: Find \\(\\cos60°\\) using 30-60-90 triangle",
    "ti_ar": "بناء الحل خطوة بخطوة: إيجاد \\(\\cos60°\\) باستخدام المثلث 30-60-90",
    "steps": [
      {
        "l": "Side adjacent to 60° in triangle with hyp=2:",
        "l_ar": "الضلع المجاور للزاوية 60° في مثلث وتره 2:",
        "a": "1",
        "h": "Sides: 1, √3, 2",
        "h_ar": "الأضلاع: 1، √3، 2"
      },
      {
        "l": "\\(\\cos60°=\\text{adj}/\\text{hyp}=1/2=\\)",
        "l_ar": "\\(\\cos60°=\\text{المجاور}/\\text{الوتر}=1/2=\\)",
        "a": "0.5",
        "h": "Perform the calculation in \\(1/2\\) to find the result.",
        "h_ar": "أجرِ العملية الحسابية في المقدار \\(1/2\\) للوصول إلى النتيجة."
      }
    ]
  },
  {
    "t": "qc",
    "ti": "Quick Check: Right Triangle Trig",
    "ti_ar": "فحص سريع: حساب المثلثات في المثلث القائم",
    "q": "If \\(\\sin\\theta=\\frac{3}{5}\\) for an acute angle \\(\\theta\\), what is \\(\\tan\\theta\\)?",
    "q_ar": "إذا كانت \\(\\sin\\theta=\\frac{3}{5}\\) لزاوية حادة \\(\\theta\\)، فما قيمة \\(\\tan\\theta\\)؟",
    "o": [
      "3/4",
      "4/5",
      "4/3",
      "3/8"
    ],
    "o_ar": [
      "3/4",
      "4/5",
      "4/3",
      "3/8"
    ],
    "a": 0,
    "ex": "In a 3-4-5 right triangle with \\(\\text{opp}=3\\) and \\(\\text{hyp}=5\\), \\(\\text{adj}=4\\). Thus \\(\\tan\\theta=\\frac{\\text{opp}}{\\text{adj}}=\\frac{3}{4}\\).",
    "ex_ar": "في المثلث القائم 3-4-5 حيث \\(\\text{المقابل}=3\\) و \\(\\text{الوتر}=5\\)، يكون \\(\\text{المجاور}=4\\). وبالتالي \\(\\tan\\theta=\\frac{\\text{المقابل}}{\\text{المجاور}}=\\frac{3}{4}\\)."
  },
  {
    "t": "num",
    "ti": "Numeric Entry: Evaluate Trig Value",
    "ti_ar": "إدخال رقمي: حساب قيمة دالة مثلثة",
    "q": "What is the exact value of \\(\\sin(150^\\circ)\\)? (Enter as decimal)",
    "q_ar": "ما القيمة الدقيقة لـ \\(\\sin(150^\\circ)\\)؟ (أدخل الإجابة ككسر عشري)",
    "a": 0.5,
    "tol": 0.001,
    "h": "Use the reference angle in Quadrant II: 180° - 150° = 30°.",
    "h_ar": "استخدم الزاوية المرجعية في الربع الثاني: 180° - 150° = 30°.",
    "sol": "\\(\\sin(150^\\circ) = \\sin(180^\\circ - 30^\\circ) = \\sin(30^\\circ) = 0.5\\).",
    "sol_ar": "\\(\\sin(150^\\circ) = \\sin(180^\\circ - 30^\\circ) = \\sin(30^\\circ) = 0.5\\)."
  },
  {
    "t": "ord",
    "ti": "Order the Steps: Solve for Hypotenuse",
    "ti_ar": "رتّب الخطوات: إيجاد طول الوتر",
    "prompt": "In a right triangle with acute angle 30° and opposite leg 6, arrange the steps to find hypotenuse h:",
    "prompt_ar": "في مثلث قائم به زاوية حادة قياسها 30° والضلع المقابل لها طوله 6، رتب خطوات إيجاد طول الوتر h:",
    "items": [
      "Set up trig ratio: \\(\\sin(30^\\circ) = \\dfrac{\\text{opposite}}{\\text{hypotenuse}}\\)",
      "Substitute known values: \\(\\sin(30^\\circ) = \\dfrac{6}{h}\\)",
      "Substitute \\(\\sin(30^\\circ) = \\dfrac{1}{2}\\): \\(\\dfrac{1}{2} = \\dfrac{6}{h}\\)",
      "Cross-multiply and solve: \\(h = 12\\)"
    ],
    "items_ar": [
      "كتابة النسبة المثلثية: \\(\\sin(30^\\circ) = \\dfrac{\\text{المقابل}}{\\text{الوتر}}\\)",
      "التعويض بالقيم المعلومة: \\(\\sin(30^\\circ) = \\dfrac{6}{h}\\)",
      "التعويض بـ \\(\\sin(30^\\circ) = \\dfrac{1}{2}\\): \\(\\dfrac{1}{2} = \\dfrac{6}{h}\\)",
      "الضرب التبادلي وحل المعادلة: \\(h = 12\\)"
    ],
    "sol": "Set up definition, substitute, solve for h.",
    "sol_ar": "ابدأ بتعريف النسبة، ثم عوض بالقيم، وحل لإيجاد h."
  },
  {
    "t": "cat",
    "ti": "Classify Trigonometric Function Signs in Quadrants",
    "ti_ar": "تصنيف إشارات الدوال المثلثية في الأرباع",
    "categories": [
      "Positive in Quadrant II",
      "Positive in Quadrant III",
      "Positive in Quadrant IV"
    ],
    "categories_ar": [
      "موجبة في الربع الثاني",
      "موجبة في الربع الثالث",
      "موجبة في الربع الرابع"
    ],
    "items": [
      {
        "s": "Sine and Cosecant: \\(\\sin\\theta > 0\\)",
        "s_ar": "الجيب وقاطع التمام: \\(\\sin\\theta > 0\\)",
        "cat": 0
      },
      {
        "s": "Tangent and Cotangent: \\(\\tan\\theta > 0\\)",
        "s_ar": "الظل وظل التمام: \\(\\tan\\theta > 0\\)",
        "cat": 1
      },
      {
        "s": "Cosine and Secant: \\(\\cos\\theta > 0\\)",
        "s_ar": "جيب التمام والقاطع: \\(\\cos\\theta > 0\\)",
        "cat": 2
      },
      {
        "s": "Angle \\(\\theta = 120^\\circ\\)",
        "s_ar": "الزاوية \\(\\theta = 120^\\circ\\)",
        "cat": 0
      },
      {
        "s": "Angle \\(\\theta = 225^\\circ\\)",
        "s_ar": "الزاوية \\(\\theta = 225^\\circ\\)",
        "cat": 1
      },
      {
        "s": "Angle \\(\\theta = 315^\\circ\\)",
        "s_ar": "الزاوية \\(\\theta = 315^\\circ\\)",
        "cat": 2
      }
    ],
    "sol": "Remember ASTC: All in QI, Sine in QII, Tangent in QIII, Cosine in QIV.",
    "sol_ar": "تذكر قاعدة إشارات الأرباع (كل - جا - ظا - جتا): الكل في الربع الأول، الجيب في الثاني، الظل في الثالث، وجيب التمام في الرابع."
  },
  {
    "t": "se",
    "ti": "Spot the Error: Quadrant Sign & Dividing by \\(\\sin\\theta\\) (Trigonometry)",
    "ti_ar": "اكتشف الخطأ: إشارة الربع والقسمة على \\(\\sin\\theta\\) (حساب المثلثات والدوال المثلثية)",
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
    "ti_ar": "وضع المصحح: المتطابقات المثلثية وقانون جيب التمام (حساب المثلثات والدوال المثلثية)",
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
    "ti_ar": "مطابقة: المتطابقات المثلثية والفروع العكسية (حساب المثلثات والدوال المثلثية)",
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
        "l": "Period of \\(4\\sin(3x)\\)",
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
        "l": "دورة الدالة \\(4\\sin(3x)\\)",
        "r": "\\(\\dfrac{2\\pi}{3}\\)"
      }
    ]
  },
  {
    "t": "qc",
    "ti": "Quick Check: Period of a Transformed Sinusoid (Trigonometry)",
    "ti_ar": "فحص سريع: دورة الدالة الجيبية (حساب المثلثات والدوال المثلثية)",
    "q": "What is the fundamental period of \\(f(x) = 4\\sin(3x - \\pi) + 1\\)?",
    "q_ar": "ما الدورة الأساسية للدالة \\(f(x) = 4\\sin(3x - \\pi) + 1\\)؟",
    "o": [
      "\\(\\dfrac{2\\pi}{3}\\)",
      "\\(6\\pi\\)",
      "\\(\\dfrac{\\pi}{3}\\)",
      "\\(4\\pi\\)"
    ],
    "o_ar": [
      "\\(\\dfrac{2\\pi}{3}\\)",
      "\\(6\\pi\\)",
      "\\(\\dfrac{\\pi}{3}\\)",
      "\\(4\\pi\\)"
    ],
    "a": 0,
    "ex": "For \\(A\\sin(Bx + C) + D\\), the period is \\(\\frac{2\\pi}{|B|} = \\frac{2\\pi}{3}\\).",
    "ex_ar": "دورة الدالة \\(A\\sin(Bx + C) + D\\) تساوي \\(\\frac{2\\pi}{|B|} = \\frac{2\\pi}{3}\\)."
  }
];
D["act-stats"] = [
  {
    "t": "sr",
    "ti": "Worked Example: Expected Value",
    "ti_ar": "مثال محلول: القيمة المتوقعة",
    "steps": [
      "A game costs $2 to play. You win $10 with probability 0.1, otherwise nothing. Expected winnings: \\(10\\times0.1+0\\times0.9=1\\).",
      "Expected profit \\(=\\text{expected winnings}-\\text{cost}=1-2=-1\\).",
      "The expected profit is \\(-\\$1\\) — on average you lose a dollar per play."
    ],
    "steps_ar": [
      "تكلفة الاشتراك في لعبة 2 دولار. تربح 10 دولارات باحتمال 0.1، وإلا فلا تربح شيئاً. الأرباح المتوقعة: \\(10\\times0.1+0\\times0.9=1\\).",
      "الربح الصافي المتوقع \\(=\\text{الأرباح المتوقعة}-\\text{التكلفة}=1-2=-1\\).",
      "الربح المتوقع هو \\(-1\\$\\) — أي تخسر دولاراً واحداً في المتوسط في كل جولة."
    ]
  },
  {
    "t": "qc",
    "ti": "Quick Check: Mutually Exclusive Events",
    "ti_ar": "فحص سريع: الأحداث المتنافية (مانعة للجمع)",
    "q": "If two events are mutually exclusive, \\(P(A\\text{ and }B)=\\)",
    "q_ar": "إذا كان الحدثان متنافيين، فإن \\(P(A\\text{ و }B)=\\)",
    "o": [
      "0",
      "1",
      "\\(P(A)\\times P(B)\\)",
      "\\(P(A)+P(B)\\)"
    ],
    "o_ar": [
      "0",
      "1",
      "\\(P(A)\\times P(B)\\)",
      "\\(P(A)+P(B)\\)"
    ],
    "a": 0,
    "ex": "Mutually exclusive events cannot occur together, so \\(P(A\\cap B)=0\\).",
    "ex_ar": "الأحداث المتنافية يستحيل وقوعها معاً في نفس الوقت، ولذلك \\(P(A\\cap B)=0\\)."
  },
  {
    "t": "num",
    "ti": "Numeric Entry: Interquartile Range (IQR)",
    "ti_ar": "إدخال رقمي: المدى الربيعي (IQR)",
    "q": "For a dataset with first quartile \\(Q_1 = 22\\) and third quartile \\(Q_3 = 35\\), what is the IQR?",
    "q_ar": "لمجموعة بيانات ربيعها الأدنى \\(Q_1 = 22\\) وربيعها الأعلى \\(Q_3 = 35\\)، ما قيمة المدى الربيعي (IQR)؟",
    "a": 13,
    "tol": 0.01,
    "h": "IQR = Q3 - Q1.",
    "h_ar": "المدى الربيعي = الربيع الأعلى - الربيع الأدنى (Q3 - Q1).",
    "sol": "\\(\\text{IQR} = Q_3 - Q_1 = 35 - 22 = 13\\).",
    "sol_ar": "\\(\\text{IQR} = Q_3 - Q_1 = 35 - 22 = 13\\)."
  },
  {
    "t": "cat",
    "ti": "Categorize: Permutations vs. Combinations",
    "ti_ar": "تصنيف: التباديل مقابل التوافيق",
    "prompt": "Determine whether each scenario requires permutations (order matters) or combinations (order does not matter):",
    "prompt_ar": "حدد ما إذا كان كل سيناريو يتطلب التباديل (الترتيب مهم) أم التوافيق (الترتيب غير مهم):",
    "categories": [
      "Permutation (Order Matters)",
      "Combination (Order Does Not Matter)"
    ],
    "categories_ar": [
      "تباديل (الترتيب مهم)",
      "توافيق (الترتيب غير مهم)"
    ],
    "items": [
      {
        "s": "Electing a President, Vice President, and Treasurer from 10 members",
        "s_ar": "انتخاب رئيس ونائب رئيس وأمين صندوق من بين 10 أعضاء",
        "cat": 0
      },
      {
        "s": "Choosing 4 toppings for a pizza from 12 choices",
        "s_ar": "اختيار 4 إضافات للبيتزا من بين 12 خياراً",
        "cat": 1
      },
      {
        "s": "Selecting a committee of 3 students from a class of 20",
        "s_ar": "اختيار لجنة مكونة من 3 طلاب من فصل يضم 20 طالباً",
        "cat": 1
      },
      {
        "s": "Assigning runners to 1st, 2nd, and 3rd place in a race",
        "s_ar": "تحديد المراكز الأول والثاني والثالث للعدائين في سباق",
        "cat": 0
      }
    ],
    "sol": "Permutations are used when titles, ranks, or positions make order count; combinations are used for unordered sets.",
    "sol_ar": "تُستخدم التباديل عند وجود مناصب أو ترتيب أو مراكز تجعل الترتيب مهماً؛ بينما تُستخدم التوافيق للمجموعات غير المرتبة."
  },
  {
    "t": "ord",
    "ti": "Order the Steps: Calculating the Median of a Data Set",
    "ti_ar": "رتّب الخطوات: حساب الوسيط لمجموعة بيانات",
    "q": "Arrange the steps to find the median of the list \\([12, 5, 9, 18, 7, 14]\\):",
    "q_ar": "رتب الخطوات لإيجاد الوسيط للقائمة \\([12, 5, 9, 18, 7, 14]\\):",
    "items": [
      "Count the total number of data values: \\(n = 6\\) (an even count)",
      "Sort the data values in ascending order: \\([5, 7, 9, 12, 14, 18]\\)",
      "Identify the two middle positions at \\(n/2 = 3\\) and \\(n/2 + 1 = 4\\): values 9 and 12",
      "Compute the average of the two middle values: \\(\\frac{9 + 12}{2} = 10.5\\)",
      "Conclude the median of the data set is 10.5"
    ],
    "items_ar": [
      "عد إجمالي القيم: \\(n = 6\\) (عدد زوجي)",
      "ترتيب قيم البيانات تصاعدياً: \\([5, 7, 9, 12, 14, 18]\\)",
      "تحديد موضعي القيمتين الأوسطين عند \\(n/2 = 3\\) و \\(n/2 + 1 = 4\\): القيمتان هما 9 و 12",
      "حساب الوسط الحسابي للقيمتين الأوسطين: \\(\\frac{9 + 12}{2} = 10.5\\)",
      "استنتاج أن وسيط مجموعة البيانات هو 10.5"
    ],
    "sol": "Sorting the data first is mandatory; for even n, average the two middle values.",
    "sol_ar": "ترتيب البيانات أولاً أمر إلزامي؛ وعندما يكون n زوجياً، نأخذ متوسط القيمتين الأوسطين."
  },
  {
    "t": "se",
    "ti": "Spot the Error: Variance of Difference of Independent Variables (Statistics & Probability)",
    "ti_ar": "اكتشف الخطأ: تباين الفرق بين متغيرين عشوائيين مستقلين (الإحصاء والاحتمالات وتحليل البيانات)",
    "q": "Independent random variables \\(X\\) and \\(Y\\) have \\(\\operatorname{Var}(X) = 7\\) and \\(\\operatorname{Var}(Y) = 6\\). A student computes \\(\\operatorname{Var}(X - Y)\\). Which step is invalid?",
    "q_ar": "متغيران عشوائيان مستقلان \\(X\\) و\\(Y\\) تبايناهما \\(\\operatorname{Var}(X) = 7\\) و\\(\\operatorname{Var}(Y) = 6\\). يحسب طالب \\(\\operatorname{Var}(X - Y)\\). أي خطوة خاطئة؟",
    "steps": [
      "Verify that \\(X\\) and \\(Y\\) are statistically independent (\\(\\operatorname{Cov}(X,Y) = 0\\)).",
      "Subtract the variances directly: \\(\\operatorname{Var}(X - Y) = 7 - 6 = 1\\).",
      "Take square root for standard deviation."
    ],
    "steps_ar": [
      "التحقق من استقلال \\(X\\) و\\(Y\\) إحصائياً.",
      "طرح التباينين مباشرة: \\(\\operatorname{Var}(X - Y) = 7 - 6 = 1\\).",
      "أخذ الجذر التربيعي لإيجاد الانحراف المعياري."
    ],
    "errorStep": 2,
    "reasons": [
      "Because coefficients square in variance, \\(\\operatorname{Var}(X - Y) = 1^2\\operatorname{Var}(X) + (-1)^2\\operatorname{Var}(Y) = 7 + 6 = 13\\) — independent variances ALWAYS add.",
      "\\(\\operatorname{Var}(X - Y)\\) equals \\(\\operatorname{Var}(X) \\cdot \\operatorname{Var}(Y)\\).",
      "Expected values cannot be subtracted."
    ],
    "reasons_ar": [
      "لأن المعاملات تُربَّع في التباين: \\(\\operatorname{Var}(X - Y) = \\operatorname{Var}(X) + (-1)^2\\operatorname{Var}(Y) = 13\\) — التباينات المستقلة تُجمع دائماً.",
      "التباين يساوي حاصل ضرب التباينين.",
      "لا يجوز طرح التوقعات الرياضية."
    ],
    "correctReason": 0
  },
  {
    "t": "ms",
    "ti": "Examiner Mode: Standard Error, Variance & Conditional Probability (Statistics & Probability)",
    "ti_ar": "وضع المصحح: الخطأ المعياري والتباين والاحتمال الشرطي (الإحصاء والاحتمالات وتحليل البيانات)",
    "q": "(a) A population has standard deviation \\(\\sigma = 40\\). For a simple random sample of size \\(n = 100\\), find the standard error \\(\\sigma_{\\bar{x}}\\) and state what happens to \\(\\sigma_{\\bar{x}}\\) if \\(n\\) quadruples. (b) Independent \\(X, Y\\) have \\(\\operatorname{Var}(X) = 7,\\; \\operatorname{Var}(Y) = 6\\); compute \\(\\operatorname{Var}(2X - Y)\\).",
    "q_ar": "(أ) مجتمع انحرافه المعياري \\(\\sigma = 40\\). لعينة عشوائية حجمها \\(n = 100\\)، احسب الخطأ المعياري \\(\\sigma_{\\bar{x}}\\) واذكر ماذا يحدث له عند مضاعفة \\(n\\) أربع مرات. (ب) للمتغيرين المستقلين \\(X, Y\\) حيث \\(\\operatorname{Var}(X) = 7,\\; \\operatorname{Var}(Y) = 6\\)، احسب \\(\\operatorname{Var}(2X - Y)\\).",
    "parts": [
      {
        "label": "Part (a) — Sampling Distribution Standard Error",
        "marks": 2,
        "rubric": [
          {
            "code": "A1",
            "marks": 1,
            "text": "\\(\\sigma_{\\bar{x}} = \\dfrac{\\sigma}{\\sqrt{n}} = \\dfrac{40}{\\sqrt{100}} = \\dfrac{40}{10} = 4\\)."
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
            "text": "\\(4(7) + 6 = 34\\)."
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
            "text": "\\(\\sigma_{\\bar{x}} = \\dfrac{40}{\\sqrt{100}} = 4\\)."
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
            "text": "الناتج: \\(4(7) + 6 = 34\\)."
          }
        ]
      }
    ]
  },
  {
    "t": "sb",
    "ti": "Step Builder: Standard Error & Independent Variance (Statistics & Probability)",
    "ti_ar": "بناء الخطوات: الخطأ المعياري وتباين المتغيرات المستقلة (الإحصاء والاحتمالات وتحليل البيانات)",
    "steps": [
      {
        "l": "Compute \\(\\sqrt{n}\\) for sample size \\(n = 100\\):",
        "a": "10",
        "h": "Square root of 100."
      },
      {
        "l": "Find standard error \\(\\sigma / \\sqrt{n}\\) when \\(\\sigma = 40\\):",
        "a": "4",
        "h": "Divide 40 by 10."
      },
      {
        "l": "For independent \\(\\operatorname{Var}(X) = 7,\\; \\operatorname{Var}(Y) = 6\\), find \\(\\operatorname{Var}(X - Y) =\\)",
        "a": "13",
        "h": "Add 7 + 6."
      }
    ],
    "steps_ar": [
      {
        "l": "احسب \\(\\sqrt{n}\\) لحجم العينة \\(n = 100\\):",
        "a": "10",
        "h": "الجذر التربيعي للعدد 100."
      },
      {
        "l": "أوجد الخطأ المعياري \\(\\sigma / \\sqrt{n}\\) عندما \\(\\sigma = 40\\):",
        "a": "4",
        "h": "اقسم 40 على 10."
      },
      {
        "l": "للمتغيرين المستقلين \\(\\operatorname{Var}(X) = 7,\\; \\operatorname{Var}(Y) = 6\\)، احسب \\(\\operatorname{Var}(X - Y) =\\)",
        "a": "13",
        "h": "اجمع 7 + 6."
      }
    ]
  },
  {
    "t": "mt",
    "ti": "Matching: Probability, Distributions & Inference Rules (Statistics & Probability)",
    "ti_ar": "مطابقة: قوانين الاحتمالات والتوزيعات والاستدلال (الإحصاء والاحتمالات وتحليل البيانات)",
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
D["act-advanced"] = [
  {
    "t": "sr",
    "ti": "Worked Example: Multiply Complex Numbers",
    "ti_ar": "مثال محلول: ضرب الأعداد المركبة",
    "steps": [
      "Simplify \\((3+2i)(1-i)\\). Expand using FOIL: \\(3(1)+3(-i)+2i(1)+2i(-i)\\).",
      "Simplify: \\(3-3i+2i-2i^2\\).",
      "Since \\(i^2=-1\\): \\(3-3i+2i+2=5-i\\)."
    ],
    "steps_ar": [
      "بسط المقدار \\((3+2i)(1-i)\\). فك الأقواس بالتوزيع: \\(3(1)+3(-i)+2i(1)+2i(-i)\\).",
      "بسط الحدود: \\(3-3i+2i-2i^2\\).",
      "بما أن \\(i^2=-1\\): \\(3-3i+2i+2=5-i\\)."
    ]
  },
  {
    "t": "qc",
    "ti": "Quick Check: Powers of i",
    "ti_ar": "فحص سريع: قوى الوحدة التخيلية i",
    "q": "\\(i^2\\) equals:",
    "q_ar": "قيمة \\(i^2\\) تساوي:",
    "o": [
      "−1",
      "1",
      "\\(i\\)",
      "\\(-i\\)"
    ],
    "o_ar": [
      "−1",
      "1",
      "\\(i\\)",
      "\\(-i\\)"
    ],
    "a": 0,
    "ex": "By definition, \\(i^2=-1\\).",
    "ex_ar": "بحسب التعريف الرياضي، \\(i^2=-1\\)."
  },
  {
    "t": "num",
    "ti": "Numeric Entry: 2x2 Matrix Determinant",
    "ti_ar": "إدخال رقمي: محدد مصفوفة 2×2",
    "q": "What is the determinant of the matrix \\(\\begin{pmatrix} 4 & 2 \\\\ 3 & 5 \\end{pmatrix}\\)?",
    "q_ar": "ما قيمة محدد المصفوفة \\(\\begin{pmatrix} 4 & 2 \\\\ 3 & 5 \\end{pmatrix}\\)؟",
    "a": 14,
    "tol": 0.01,
    "h": "For [[a,b],[c,d]], determinant is ad - bc.",
    "h_ar": "للمصفوفة ذات العناصر [[a,b],[c,d]]، المحدد هو ad - bc.",
    "sol": "\\(\\det = (4)(5) - (2)(3) = 20 - 6 = 14\\).",
    "sol_ar": "\\(\\det = (4)(5) - (2)(3) = 20 - 6 = 14\\)."
  },
  {
    "t": "ord",
    "ti": "Order the Steps: Simplify i⁷⁵",
    "ti_ar": "رتّب الخطوات: تبسيط i⁷⁵",
    "prompt": "Arrange the steps to simplify \\(i^{75}\\):",
    "prompt_ar": "رتب الخطوات لتبسيط المقدار \\(i^{75}\\):",
    "items": [
      "Identify exponent: \\(n = 75\\)",
      "Divide exponent by 4: \\(75 = 4(18) + 3\\) (remainder 3)",
      "Rewrite using powers of 4: \\(i^{75} = (i^4)^{18} \\cdot i^3\\)",
      "Substitute \\(i^4 = 1\\): \\((1)^{18} \\cdot i^3 = 1 \\cdot i^3 = i^3\\)",
      "Evaluate \\(i^3 = -i\\)"
    ],
    "items_ar": [
      "تحديد الأس: \\(n = 75\\)",
      "قسمة الأس على 4: \\(75 = 4(18) + 3\\) (الباقي 3)",
      "إعادة الكتابة باستخدام قوى العدد 4: \\(i^{75} = (i^4)^{18} \\cdot i^3\\)",
      "التعويض بـ \\(i^4 = 1\\): \\((1)^{18} \\cdot i^3 = 1 \\cdot i^3 = i^3\\)",
      "حساب الناتج النهائي: \\(i^3 = -i\\)"
    ],
    "sol": "Divide exponent by 4, isolate remainder, i³ = -i.",
    "sol_ar": "اقسم الأس على 4، وحدد الباقي، ثم احسب \\(i^3 = -i\\)."
  },
  {
    "t": "cat",
    "ti": "Classify Powers of the Imaginary Unit i",
    "ti_ar": "تصنيف قوى الوحدة التخيلية i",
    "categories": [
      "Equals 1",
      "Equals i",
      "Equals -1",
      "Equals -i"
    ],
    "categories_ar": [
      "تساوي 1",
      "تساوي i",
      "تساوي -1",
      "تساوي -i"
    ],
    "items": [
      {
        "s": "\\(i^4\\) and \\(i^{20}\\)",
        "s_ar": "\\(i^4\\) و \\(i^{20}\\)",
        "cat": 0
      },
      {
        "s": "\\(i^1\\) and \\(i^{17}\\)",
        "s_ar": "\\(i^1\\) و \\(i^{17}\\)",
        "cat": 1
      },
      {
        "s": "\\(i^2\\) and \\(i^{10}\\)",
        "s_ar": "\\(i^2\\) و \\(i^{10}\\)",
        "cat": 2
      },
      {
        "s": "\\(i^3\\) and \\(i^{15}\\)",
        "s_ar": "\\(i^3\\) و \\(i^{15}\\)",
        "cat": 3
      },
      {
        "s": "\\(i^{100}\\)",
        "s_ar": "\\(i^{100}\\)",
        "cat": 0
      },
      {
        "s": "\\(i^{99}\\)",
        "s_ar": "\\(i^{99}\\)",
        "cat": 3
      }
    ],
    "sol": "Powers of i cycle with period 4: i^1 = i, i^2 = -1, i^3 = -i, i^4 = 1.",
    "sol_ar": "تتكرر قوى i بشكل دوري كل 4 قوى: i^1 = i، و i^2 = -1، و i^3 = -i، و i^4 = 1."
  },
  {
    "t": "se",
    "ti": "Spot the Error: Complex Conjugate Division & \\(i^2\\) Sign (Matrices, Vectors & Complex Numbers)",
    "ti_ar": "اكتشف الخطأ: قسمة الأعداد المركبة وإشارة \\(i^2\\) (المصفوفات والمتجهات والأعداد المركبة)",
    "q": "A student simplifies \\(\\dfrac{25}{3 - 4i}\\). Which step introduces an algebraic error?",
    "q_ar": "يبسّط طالب الكسر المركب \\(\\dfrac{25}{3 - 4i}\\). أي خطوة تتضمن خطأ جبرياً؟",
    "steps": [
      "Multiply numerator and denominator by the conjugate \\(3 + 4i\\).",
      "Expand the denominator as \\((3)^2 - (4)^2 = -7\\) instead of \\(a^2 - b^2 i^2 = a^2 + b^2 = 25\\).",
      "Divide numerator by the wrong denominator."
    ],
    "steps_ar": [
      "ضرب البسط والمقام في المرافق \\(3 + 4i\\).",
      "فك المقام في صورة \\((3)^2 - (4)^2 = -7\\) بدلاً من \\(a^2 + b^2 = 25\\).",
      "قسمة البسط على المقام الخاطئ."
    ],
    "errorStep": 2,
    "reasons": [
      "Because \\(i^2 = -1\\), \\((a - bi)(a + bi) = a^2 - b^2 i^2 = a^2 + b^2 = 25\\), giving \\(3 + 4i\\).",
      "You should multiply by \\(3 - 4i\\) instead of the conjugate.",
      "\\(i^2\\) equals \\(+1\\)."
    ],
    "reasons_ar": [
      "لأن \\(i^2 = -1\\)، فإن \\((a - bi)(a + bi) = a^2 + b^2 = 25\\)، والناتج الصحيح هو \\(3 + 4i\\).",
      "يجب الضرب في \\(3 - 4i\\) بدلاً من المرافق.",
      "قيمة \\(i^2\\) تساوي \\(+1\\)."
    ],
    "correctReason": 0
  },
  {
    "t": "ms",
    "ti": "Examiner Mode: Modulus, Conjugate Division & De Moivre (Matrices, Vectors & Complex Numbers)",
    "ti_ar": "وضع المصحح: المقياس والمرافق ومبرهنة دي موافر (المصفوفات والمتجهات والأعداد المركبة)",
    "q": "Let \\(z = 3 - 4i\\). (a) Find \\(|z|\\), \\(\\bar{z}\\), and express \\(\\dfrac{25}{z}\\) in \\(x + yi\\) form. (b) Use De Moivre’s theorem to evaluate \\((2 e^{i\\pi/6})^3\\) in Cartesian form.",
    "q_ar": "ليكن \\(z = 3 - 4i\\). (أ) أوجد \\(|z|\\) و\\(\\bar{z}\\) وعبّر عن \\(\\dfrac{25}{z}\\) بالصورة \\(x + yi\\). (ب) استعمل مبرهنة دي موافر لحساب \\((2 e^{i\\pi/6})^3\\) بالصورة الديكارتية.",
    "parts": [
      {
        "label": "Part (a) — Modulus & Conjugate Division",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "\\(|z| = \\sqrt{3^2 + (-4)^2} = 5\\), \\(\\bar{z} = 3 + 4i\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "\\(\\dfrac{25}{z} = \\dfrac{25\\bar{z}}{|z|^2} = 3 + 4i\\)."
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
            "text": "\\(|z| = 5\\) والمرافق \\(\\bar{z} = 3 + 4i\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "\\(\\dfrac{25}{z} = 3 + 4i\\)."
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
    "t": "sb",
    "ti": "Step Builder: Complex Modulus & Powers of i (Matrices, Vectors & Complex Numbers)",
    "ti_ar": "بناء الخطوات: مقياس العدد المركب وقوى i (المصفوفات والمتجهات والأعداد المركبة)",
    "steps": [
      {
        "l": "Compute \\(|3 - 4i| =\\)",
        "a": "5",
        "h": "Compute √(9 + 16)."
      },
      {
        "l": "Compute \\((3 - 4i)(3 + 4i) =\\)",
        "a": "25",
        "h": "Use a² + b²."
      },
      {
        "l": "Evaluate \\(i^{12} =\\)",
        "a": "1",
        "h": "12 is a multiple of 4."
      }
    ],
    "steps_ar": [
      {
        "l": "احسب المقياس \\(|3 - 4i| =\\)",
        "a": "5",
        "h": "احسب √(9 + 16)."
      },
      {
        "l": "احسب حاصل الضرب في المرافق \\((3 - 4i)(3 + 4i) =\\)",
        "a": "25",
        "h": "استعمل a² + b²."
      },
      {
        "l": "احسب قيمة \\(i^{12} =\\)",
        "a": "1",
        "h": "الأس 12 من مضاعفات 4."
      }
    ]
  },
  {
    "t": "mt",
    "ti": "Matching: Argand Loci & Complex Identities (Matrices, Vectors & Complex Numbers)",
    "ti_ar": "مطابقة: المحال الهندسية في مستوى أرجاند والأعداد المركبة (المصفوفات والمتجهات والأعداد المركبة)",
    "p": [
      {
        "l": "\\(z \\bar{z}\\) for \\(z = 3 + 4i\\)",
        "r": "\\(|z|^2 = 25\\)"
      },
      {
        "l": "Argand locus \\(|z - z_0| = R\\)",
        "r": "Circle centered at \\(z_0\\) with radius \\(R\\)"
      },
      {
        "l": "Argand locus \\(|z - z_1| = |z - z_2|\\)",
        "r": "Perpendicular bisector of segment \\(z_1 z_2\\)"
      },
      {
        "l": "Multiplication by \\(i\\)",
        "r": "Counterclockwise rotation by \\(90^\\circ\\) (\\(\\pi/2\\) rad)"
      }
    ],
    "p_ar": [
      {
        "l": "\\(z \\bar{z}\\) للعدد \\(z = 3 + 4i\\)",
        "r": "\\(|z|^2 = 25\\)"
      },
      {
        "l": "المحل الهندسي \\(|z - z_0| = R\\)",
        "r": "دائرة مركزها \\(z_0\\) ونصف قطرها \\(R\\)"
      },
      {
        "l": "المحل الهندسي \\(|z - z_1| = |z - z_2|\\)",
        "r": "العمود المنصّف للقطعة الواصلة بين \\(z_1\\) و\\(z_2\\)"
      },
      {
        "l": "الضرب في الوحدة التخيلية \\(i\\)",
        "r": "دوران عكس عقارب الساعة بزاوية \\(90^\\circ\\)"
      }
    ]
  }
];
});
