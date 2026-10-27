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
    "ti": "Spot the Error: Algebraic & Domain Verification (Test format & strategy)",
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
    "ti_ar": "اكتشف الخطأ: الجذور الدخيلة والتحقق من المجال (Test format & strategy)",
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
    "ti": "Examiner Mode: Multi-Step Structured Problem (Test format & strategy)",
    "q": "Let \\(f(x) = x^2 - 8x + 16\\) for \\(x \\ge 4\\). (a) Express \\(f(x)\\) in completed-square vertex form and state the range of \\(f\\). (b) Find an expression for the inverse function \\(f^{-1}(x)\\) and state its domain.",
    "parts": [
      {
        "label": "Part (a) — Vertex Form & Range",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "Complete the square: \\(f(x) = (x - 4)^2 - 16 + 16 = (x - 4)^2 + 0\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "State exact range: \\(f(x) \\ge 0\\) (or \\([0, \\infty)\\))."
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
            "text": "Set \\(y = (x - 4)^2 + 0 \\implies (x - 4)^2 = y - 0\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "Select positive branch (since \\(x \\ge 4\\)): \\(f^{-1}(x) = 4 + \\sqrt{x - 0}\\)."
          },
          {
            "code": "B1",
            "marks": 1,
            "text": "State domain of \\(f^{-1}\\): \\(x \\ge 0\\) (matching the range of \\(f\\))."
          }
        ]
      }
    ],
    "examinerTip": "Writing \\(\\pm\\sqrt{x - 0}\\) for \\(f^{-1}(x)\\) loses the final A1 mark because a function must be single-valued; use the domain restriction \\(x \\ge 4\\) to choose the \\(+\\) sign.",
    "ti_ar": "وضع المصحح: إكمال المربع والدالة العكسية (Test format & strategy)",
    "q_ar": "لتكن \\(f(x) = x^2 - 8x + 16\\) حيث \\(x \\ge 4\\). (أ) اكتب \\(f(x)\\) في صورة المربع الكامل وحدد مداها. (ب) أوجد قاعدة الدالة العكسية \\(f^{-1}(x)\\) ومجالها.",
    "examinerTip_ar": "الدالة العكسية يجب أن تكون وحيدة القيمة، لذا نختار الإشارة الموجبة للجذر \\(4 + \\sqrt{x - 0}\\) لأن \\(x \\ge 4\\)."
  },
  {
    "t": "sb",
    "ti": "Step Builder: Completing the Square & Vertex Analysis (Test format & strategy)",
    "steps": [
      {
        "l": "In \\(y = x^2 - 8x + 16\\), halve the \\(x\\)-coefficient to write \\((x - h)^2\\) where \\(h =\\)",
        "a": "4",
        "h": "Take half of 8."
      },
      {
        "l": "Compute the minimum value \\(k = 16 - 4^2 =\\)",
        "a": "0",
        "h": "Subtract 16 from 16."
      },
      {
        "l": "Evaluate \\(y\\) when \\(x = 6\\): \\(y =\\)",
        "a": "4",
        "h": "Compute \\((2)^2 + 0\\)."
      }
    ],
    "ti_ar": "بناء الخطوات: إكمال المربع وإيجاد القيمة الصغرى (Test format & strategy)",
    "steps_ar": [
      {
        "l": "في الدالة \\(y = x^2 - 8x + 16\\): قيمة \\(h\\) في \\((x - h)^2\\) تساوي:",
        "a": "4",
        "h": "اقسم معامل x وهو 8 على 2."
      },
      {
        "l": "احسب القيمة الصغرى \\(k = 16 - 4^2 =\\)",
        "a": "0",
        "h": "اطرح 16 من 16."
      },
      {
        "l": "احسب قيمة \\(y\\) عندما \\(x = 6\\):",
        "a": "4",
        "h": "احسب \\(4 + 0\\)."
      }
    ]
  },
  {
    "t": "qc",
    "ti": "Quick Check: Vertex & Minimum Analysis (Test format & strategy)",
    "ti_ar": "فحص سريع: تحليل نقطة الرأس والقيمة الصغرى (Test format & strategy)",
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
    "ti": "Spot the Error: Algebraic & Domain Verification (Numbers, Percents & Ratios)",
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
    "ti_ar": "اكتشف الخطأ: الجذور الدخيلة والتحقق من المجال (Numbers, Percents & Ratios)",
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
    "ti": "Examiner Mode: Multi-Step Structured Problem (Numbers, Percents & Ratios)",
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
    "ti_ar": "وضع المصحح: إكمال المربع والدالة العكسية (Numbers, Percents & Ratios)",
    "q_ar": "لتكن \\(f(x) = x^2 - 6x + 10\\) حيث \\(x \\ge 3\\). (أ) اكتب \\(f(x)\\) في صورة المربع الكامل وحدد مداها. (ب) أوجد قاعدة الدالة العكسية \\(f^{-1}(x)\\) ومجالها.",
    "examinerTip_ar": "الدالة العكسية يجب أن تكون وحيدة القيمة، لذا نختار الإشارة الموجبة للجذر \\(3 + \\sqrt{x - 1}\\) لأن \\(x \\ge 3\\)."
  },
  {
    "t": "sb",
    "ti": "Step Builder: Completing the Square & Vertex Analysis (Numbers, Percents & Ratios)",
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
    "ti_ar": "بناء الخطوات: إكمال المربع وإيجاد القيمة الصغرى (Numbers, Percents & Ratios)",
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
    "ti": "Matching: Core Algebraic & Analytic Principles (Numbers, Percents & Ratios)",
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
    "ti_ar": "مطابقة: المبادئ الجبرية والتحليلية الأساسية (Numbers, Percents & Ratios)",
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
    "ti": "Spot the Error: Algebraic & Domain Verification (Elementary & Intermediate Algebra)",
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
    "ti_ar": "اكتشف الخطأ: الجذور الدخيلة والتحقق من المجال (Elementary & Intermediate Algebra)",
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
    "ti": "Examiner Mode: Multi-Step Structured Problem (Elementary & Intermediate Algebra)",
    "q": "Let \\(f(x) = x^2 - 8x + 17\\) for \\(x \\ge 4\\). (a) Express \\(f(x)\\) in completed-square vertex form and state the range of \\(f\\). (b) Find an expression for the inverse function \\(f^{-1}(x)\\) and state its domain.",
    "parts": [
      {
        "label": "Part (a) — Vertex Form & Range",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "Complete the square: \\(f(x) = (x - 4)^2 - 16 + 17 = (x - 4)^2 + 1\\)."
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
            "text": "Set \\(y = (x - 4)^2 + 1 \\implies (x - 4)^2 = y - 1\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "Select positive branch (since \\(x \\ge 4\\)): \\(f^{-1}(x) = 4 + \\sqrt{x - 1}\\)."
          },
          {
            "code": "B1",
            "marks": 1,
            "text": "State domain of \\(f^{-1}\\): \\(x \\ge 1\\) (matching the range of \\(f\\))."
          }
        ]
      }
    ],
    "examinerTip": "Writing \\(\\pm\\sqrt{x - 1}\\) for \\(f^{-1}(x)\\) loses the final A1 mark because a function must be single-valued; use the domain restriction \\(x \\ge 4\\) to choose the \\(+\\) sign.",
    "ti_ar": "وضع المصحح: إكمال المربع والدالة العكسية (Elementary & Intermediate Algebra)",
    "q_ar": "لتكن \\(f(x) = x^2 - 8x + 17\\) حيث \\(x \\ge 4\\). (أ) اكتب \\(f(x)\\) في صورة المربع الكامل وحدد مداها. (ب) أوجد قاعدة الدالة العكسية \\(f^{-1}(x)\\) ومجالها.",
    "examinerTip_ar": "الدالة العكسية يجب أن تكون وحيدة القيمة، لذا نختار الإشارة الموجبة للجذر \\(4 + \\sqrt{x - 1}\\) لأن \\(x \\ge 4\\)."
  },
  {
    "t": "sb",
    "ti": "Step Builder: Completing the Square & Vertex Analysis (Elementary & Intermediate Algebra)",
    "steps": [
      {
        "l": "In \\(y = x^2 - 8x + 17\\), halve the \\(x\\)-coefficient to write \\((x - h)^2\\) where \\(h =\\)",
        "a": "4",
        "h": "Take half of 8."
      },
      {
        "l": "Compute the minimum value \\(k = 17 - 4^2 =\\)",
        "a": "1",
        "h": "Subtract 16 from 17."
      },
      {
        "l": "Evaluate \\(y\\) when \\(x = 6\\): \\(y =\\)",
        "a": "5",
        "h": "Compute \\((2)^2 + 1\\)."
      }
    ],
    "ti_ar": "بناء الخطوات: إكمال المربع وإيجاد القيمة الصغرى (Elementary & Intermediate Algebra)",
    "steps_ar": [
      {
        "l": "في الدالة \\(y = x^2 - 8x + 17\\): قيمة \\(h\\) في \\((x - h)^2\\) تساوي:",
        "a": "4",
        "h": "اقسم معامل x وهو 8 على 2."
      },
      {
        "l": "احسب القيمة الصغرى \\(k = 17 - 4^2 =\\)",
        "a": "1",
        "h": "اطرح 16 من 17."
      },
      {
        "l": "احسب قيمة \\(y\\) عندما \\(x = 6\\):",
        "a": "5",
        "h": "احسب \\(4 + 1\\)."
      }
    ]
  },
  {
    "t": "qc",
    "ti": "Quick Check: Vertex & Minimum Analysis (Elementary & Intermediate Algebra)",
    "ti_ar": "فحص سريع: تحليل نقطة الرأس والقيمة الصغرى (Elementary & Intermediate Algebra)",
    "q": "What is the minimum value of \\( f(x) = (x - 5)^2 + 7 \\) over all real \\( x \\)?",
    "q_ar": "ما هي القيمة الصغرى للدالة \\( f(x) = (x - 5)^2 + 7 \\) لكل \\( x \\in \\mathbb{R} \\)؟",
    "o": [
      "\\( 7 \\)",
      "\\( 5 \\)",
      "\\( -5 \\)",
      "\\( 32 \\)"
    ],
    "o_ar": [
      "\\( 7 \\)",
      "\\( 5 \\)",
      "\\( -5 \\)",
      "\\( 32 \\)"
    ],
    "a": 0,
    "ex": "Since \\( (x - 5)^2 \\ge 0 \\), the minimum value is \\( 7 \\) achieved at \\( x = 5 \\).",
    "ex_ar": "بما أن المربع الكامل غير سالب، فإن القيمة الصغرى هي \\( 7 \\) عند \\( x = 5 \\)."
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
    "ti": "Spot the Error: Algebraic & Domain Verification (Coordinate Geometry)",
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
    "ti_ar": "اكتشف الخطأ: الجذور الدخيلة والتحقق من المجال (Coordinate Geometry)",
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
    "ti": "Examiner Mode: Multi-Step Structured Problem (Coordinate Geometry)",
    "q": "Let \\(f(x) = x^2 - 4x + 7\\) for \\(x \\ge 2\\). (a) Express \\(f(x)\\) in completed-square vertex form and state the range of \\(f\\). (b) Find an expression for the inverse function \\(f^{-1}(x)\\) and state its domain.",
    "parts": [
      {
        "label": "Part (a) — Vertex Form & Range",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "Complete the square: \\(f(x) = (x - 2)^2 - 4 + 7 = (x - 2)^2 + 3\\)."
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
            "text": "Set \\(y = (x - 2)^2 + 3 \\implies (x - 2)^2 = y - 3\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "Select positive branch (since \\(x \\ge 2\\)): \\(f^{-1}(x) = 2 + \\sqrt{x - 3}\\)."
          },
          {
            "code": "B1",
            "marks": 1,
            "text": "State domain of \\(f^{-1}\\): \\(x \\ge 3\\) (matching the range of \\(f\\))."
          }
        ]
      }
    ],
    "examinerTip": "Writing \\(\\pm\\sqrt{x - 3}\\) for \\(f^{-1}(x)\\) loses the final A1 mark because a function must be single-valued; use the domain restriction \\(x \\ge 2\\) to choose the \\(+\\) sign.",
    "ti_ar": "وضع المصحح: إكمال المربع والدالة العكسية (Coordinate Geometry)",
    "q_ar": "لتكن \\(f(x) = x^2 - 4x + 7\\) حيث \\(x \\ge 2\\). (أ) اكتب \\(f(x)\\) في صورة المربع الكامل وحدد مداها. (ب) أوجد قاعدة الدالة العكسية \\(f^{-1}(x)\\) ومجالها.",
    "examinerTip_ar": "الدالة العكسية يجب أن تكون وحيدة القيمة، لذا نختار الإشارة الموجبة للجذر \\(2 + \\sqrt{x - 3}\\) لأن \\(x \\ge 2\\)."
  },
  {
    "t": "sb",
    "ti": "Step Builder: Completing the Square & Vertex Analysis (Coordinate Geometry)",
    "steps": [
      {
        "l": "In \\(y = x^2 - 4x + 7\\), halve the \\(x\\)-coefficient to write \\((x - h)^2\\) where \\(h =\\)",
        "a": "2",
        "h": "Take half of 4."
      },
      {
        "l": "Compute the minimum value \\(k = 7 - 2^2 =\\)",
        "a": "3",
        "h": "Subtract 4 from 7."
      },
      {
        "l": "Evaluate \\(y\\) when \\(x = 4\\): \\(y =\\)",
        "a": "7",
        "h": "Compute \\((2)^2 + 3\\)."
      }
    ],
    "ti_ar": "بناء الخطوات: إكمال المربع وإيجاد القيمة الصغرى (Coordinate Geometry)",
    "steps_ar": [
      {
        "l": "في الدالة \\(y = x^2 - 4x + 7\\): قيمة \\(h\\) في \\((x - h)^2\\) تساوي:",
        "a": "2",
        "h": "اقسم معامل x وهو 4 على 2."
      },
      {
        "l": "احسب القيمة الصغرى \\(k = 7 - 2^2 =\\)",
        "a": "3",
        "h": "اطرح 4 من 7."
      },
      {
        "l": "احسب قيمة \\(y\\) عندما \\(x = 4\\):",
        "a": "7",
        "h": "احسب \\(4 + 3\\)."
      }
    ]
  },
  {
    "t": "mt",
    "ti": "Matching: Core Algebraic & Analytic Principles (Coordinate Geometry)",
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
    "ti_ar": "مطابقة: المبادئ الجبرية والتحليلية الأساسية (Coordinate Geometry)",
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
    "ti": "Spot the Error: Algebraic & Domain Verification (Plane Geometry)",
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
    "ti_ar": "اكتشف الخطأ: الجذور الدخيلة والتحقق من المجال (Plane Geometry)",
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
    "ti": "Examiner Mode: Multi-Step Structured Problem (Plane Geometry)",
    "q": "Let \\(f(x) = x^2 - 10x + 27\\) for \\(x \\ge 5\\). (a) Express \\(f(x)\\) in completed-square vertex form and state the range of \\(f\\). (b) Find an expression for the inverse function \\(f^{-1}(x)\\) and state its domain.",
    "parts": [
      {
        "label": "Part (a) — Vertex Form & Range",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "Complete the square: \\(f(x) = (x - 5)^2 - 25 + 27 = (x - 5)^2 + 2\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "State exact range: \\(f(x) \\ge 2\\) (or \\([2, \\infty)\\))."
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
            "text": "Set \\(y = (x - 5)^2 + 2 \\implies (x - 5)^2 = y - 2\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "Select positive branch (since \\(x \\ge 5\\)): \\(f^{-1}(x) = 5 + \\sqrt{x - 2}\\)."
          },
          {
            "code": "B1",
            "marks": 1,
            "text": "State domain of \\(f^{-1}\\): \\(x \\ge 2\\) (matching the range of \\(f\\))."
          }
        ]
      }
    ],
    "examinerTip": "Writing \\(\\pm\\sqrt{x - 2}\\) for \\(f^{-1}(x)\\) loses the final A1 mark because a function must be single-valued; use the domain restriction \\(x \\ge 5\\) to choose the \\(+\\) sign.",
    "ti_ar": "وضع المصحح: إكمال المربع والدالة العكسية (Plane Geometry)",
    "q_ar": "لتكن \\(f(x) = x^2 - 10x + 27\\) حيث \\(x \\ge 5\\). (أ) اكتب \\(f(x)\\) في صورة المربع الكامل وحدد مداها. (ب) أوجد قاعدة الدالة العكسية \\(f^{-1}(x)\\) ومجالها.",
    "examinerTip_ar": "الدالة العكسية يجب أن تكون وحيدة القيمة، لذا نختار الإشارة الموجبة للجذر \\(5 + \\sqrt{x - 2}\\) لأن \\(x \\ge 5\\)."
  },
  {
    "t": "sb",
    "ti": "Step Builder: Completing the Square & Vertex Analysis (Plane Geometry)",
    "steps": [
      {
        "l": "In \\(y = x^2 - 10x + 27\\), halve the \\(x\\)-coefficient to write \\((x - h)^2\\) where \\(h =\\)",
        "a": "5",
        "h": "Take half of 10."
      },
      {
        "l": "Compute the minimum value \\(k = 27 - 5^2 =\\)",
        "a": "2",
        "h": "Subtract 25 from 27."
      },
      {
        "l": "Evaluate \\(y\\) when \\(x = 7\\): \\(y =\\)",
        "a": "6",
        "h": "Compute \\((2)^2 + 2\\)."
      }
    ],
    "ti_ar": "بناء الخطوات: إكمال المربع وإيجاد القيمة الصغرى (Plane Geometry)",
    "steps_ar": [
      {
        "l": "في الدالة \\(y = x^2 - 10x + 27\\): قيمة \\(h\\) في \\((x - h)^2\\) تساوي:",
        "a": "5",
        "h": "اقسم معامل x وهو 10 على 2."
      },
      {
        "l": "احسب القيمة الصغرى \\(k = 27 - 5^2 =\\)",
        "a": "2",
        "h": "اطرح 25 من 27."
      },
      {
        "l": "احسب قيمة \\(y\\) عندما \\(x = 7\\):",
        "a": "6",
        "h": "احسب \\(4 + 2\\)."
      }
    ]
  },
  {
    "t": "mt",
    "ti": "Matching: Core Algebraic & Analytic Principles (Plane Geometry)",
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
    "ti_ar": "مطابقة: المبادئ الجبرية والتحليلية الأساسية (Plane Geometry)",
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
    "ti": "Spot the Error: Algebraic & Domain Verification (Functions & Graphs)",
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
    "ti_ar": "اكتشف الخطأ: الجذور الدخيلة والتحقق من المجال (Functions & Graphs)",
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
    "ti": "Examiner Mode: Multi-Step Structured Problem (Functions & Graphs)",
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
    "ti_ar": "وضع المصحح: إكمال المربع والدالة العكسية (Functions & Graphs)",
    "q_ar": "لتكن \\(f(x) = x^2 - 10x + 29\\) حيث \\(x \\ge 5\\). (أ) اكتب \\(f(x)\\) في صورة المربع الكامل وحدد مداها. (ب) أوجد قاعدة الدالة العكسية \\(f^{-1}(x)\\) ومجالها.",
    "examinerTip_ar": "الدالة العكسية يجب أن تكون وحيدة القيمة، لذا نختار الإشارة الموجبة للجذر \\(5 + \\sqrt{x - 4}\\) لأن \\(x \\ge 5\\)."
  },
  {
    "t": "sb",
    "ti": "Step Builder: Completing the Square & Vertex Analysis (Functions & Graphs)",
    "steps": [
      {
        "l": "In \\(y = x^2 - 10x + 29\\), halve the \\(x\\)-coefficient to write \\((x - h)^2\\) where \\(h =\\)",
        "a": "5",
        "h": "Take half of 10."
      },
      {
        "l": "Compute the minimum value \\(k = 29 - 5^2 =\\)",
        "a": "4",
        "h": "Subtract 25 from 29."
      },
      {
        "l": "Evaluate \\(y\\) when \\(x = 7\\): \\(y =\\)",
        "a": "8",
        "h": "Compute \\((2)^2 + 4\\)."
      }
    ],
    "ti_ar": "بناء الخطوات: إكمال المربع وإيجاد القيمة الصغرى (Functions & Graphs)",
    "steps_ar": [
      {
        "l": "في الدالة \\(y = x^2 - 10x + 29\\): قيمة \\(h\\) في \\((x - h)^2\\) تساوي:",
        "a": "5",
        "h": "اقسم معامل x وهو 10 على 2."
      },
      {
        "l": "احسب القيمة الصغرى \\(k = 29 - 5^2 =\\)",
        "a": "4",
        "h": "اطرح 25 من 29."
      },
      {
        "l": "احسب قيمة \\(y\\) عندما \\(x = 7\\):",
        "a": "8",
        "h": "احسب \\(4 + 4\\)."
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
    "ti": "Spot the Error: Algebraic & Domain Verification (Trigonometry)",
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
    "ti_ar": "اكتشف الخطأ: الجذور الدخيلة والتحقق من المجال (Trigonometry)",
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
    "ti": "Examiner Mode: Multi-Step Structured Problem (Trigonometry)",
    "q": "Let \\(f(x) = x^2 - 4x + 7\\) for \\(x \\ge 2\\). (a) Express \\(f(x)\\) in completed-square vertex form and state the range of \\(f\\). (b) Find an expression for the inverse function \\(f^{-1}(x)\\) and state its domain.",
    "parts": [
      {
        "label": "Part (a) — Vertex Form & Range",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "Complete the square: \\(f(x) = (x - 2)^2 - 4 + 7 = (x - 2)^2 + 3\\)."
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
            "text": "Set \\(y = (x - 2)^2 + 3 \\implies (x - 2)^2 = y - 3\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "Select positive branch (since \\(x \\ge 2\\)): \\(f^{-1}(x) = 2 + \\sqrt{x - 3}\\)."
          },
          {
            "code": "B1",
            "marks": 1,
            "text": "State domain of \\(f^{-1}\\): \\(x \\ge 3\\) (matching the range of \\(f\\))."
          }
        ]
      }
    ],
    "examinerTip": "Writing \\(\\pm\\sqrt{x - 3}\\) for \\(f^{-1}(x)\\) loses the final A1 mark because a function must be single-valued; use the domain restriction \\(x \\ge 2\\) to choose the \\(+\\) sign.",
    "ti_ar": "وضع المصحح: إكمال المربع والدالة العكسية (Trigonometry)",
    "q_ar": "لتكن \\(f(x) = x^2 - 4x + 7\\) حيث \\(x \\ge 2\\). (أ) اكتب \\(f(x)\\) في صورة المربع الكامل وحدد مداها. (ب) أوجد قاعدة الدالة العكسية \\(f^{-1}(x)\\) ومجالها.",
    "examinerTip_ar": "الدالة العكسية يجب أن تكون وحيدة القيمة، لذا نختار الإشارة الموجبة للجذر \\(2 + \\sqrt{x - 3}\\) لأن \\(x \\ge 2\\)."
  },
  {
    "t": "mt",
    "ti": "Matching: Core Algebraic & Analytic Principles (Trigonometry)",
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
    "ti_ar": "مطابقة: المبادئ الجبرية والتحليلية الأساسية (Trigonometry)",
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
    "ti": "Quick Check: Vertex & Minimum Analysis (Trigonometry)",
    "ti_ar": "فحص سريع: تحليل نقطة الرأس والقيمة الصغرى (Trigonometry)",
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
    "ti": "Spot the Error: Algebraic & Domain Verification (Statistics & Probability)",
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
    "ti_ar": "اكتشف الخطأ: الجذور الدخيلة والتحقق من المجال (Statistics & Probability)",
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
    "ti": "Examiner Mode: Multi-Step Structured Problem (Statistics & Probability)",
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
    "ti_ar": "وضع المصحح: إكمال المربع والدالة العكسية (Statistics & Probability)",
    "q_ar": "لتكن \\(f(x) = x^2 - 10x + 32\\) حيث \\(x \\ge 5\\). (أ) اكتب \\(f(x)\\) في صورة المربع الكامل وحدد مداها. (ب) أوجد قاعدة الدالة العكسية \\(f^{-1}(x)\\) ومجالها.",
    "examinerTip_ar": "الدالة العكسية يجب أن تكون وحيدة القيمة، لذا نختار الإشارة الموجبة للجذر \\(5 + \\sqrt{x - 7}\\) لأن \\(x \\ge 5\\)."
  },
  {
    "t": "sb",
    "ti": "Step Builder: Completing the Square & Vertex Analysis (Statistics & Probability)",
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
    "ti_ar": "بناء الخطوات: إكمال المربع وإيجاد القيمة الصغرى (Statistics & Probability)",
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
    "ti": "Matching: Core Algebraic & Analytic Principles (Statistics & Probability)",
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
    "ti_ar": "مطابقة: المبادئ الجبرية والتحليلية الأساسية (Statistics & Probability)",
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
    "ti": "Spot the Error: Algebraic & Domain Verification (Matrices, Vectors & Complex Numbers)",
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
    "ti_ar": "اكتشف الخطأ: الجذور الدخيلة والتحقق من المجال (Matrices, Vectors & Complex Numbers)",
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
    "ti": "Examiner Mode: Multi-Step Structured Problem (Matrices, Vectors & Complex Numbers)",
    "q": "Let \\(f(x) = x^2 - 8x + 15\\) for \\(x \\ge 4\\). (a) Express \\(f(x)\\) in completed-square vertex form and state the range of \\(f\\). (b) Find an expression for the inverse function \\(f^{-1}(x)\\) and state its domain.",
    "parts": [
      {
        "label": "Part (a) — Vertex Form & Range",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "Complete the square: \\(f(x) = (x - 4)^2 - 16 + 15 = (x - 4)^2 + -1\\)."
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
            "text": "Set \\(y = (x - 4)^2 + -1 \\implies (x - 4)^2 = y - -1\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "Select positive branch (since \\(x \\ge 4\\)): \\(f^{-1}(x) = 4 + \\sqrt{x - -1}\\)."
          },
          {
            "code": "B1",
            "marks": 1,
            "text": "State domain of \\(f^{-1}\\): \\(x \\ge -1\\) (matching the range of \\(f\\))."
          }
        ]
      }
    ],
    "examinerTip": "Writing \\(\\pm\\sqrt{x - -1}\\) for \\(f^{-1}(x)\\) loses the final A1 mark because a function must be single-valued; use the domain restriction \\(x \\ge 4\\) to choose the \\(+\\) sign.",
    "ti_ar": "وضع المصحح: إكمال المربع والدالة العكسية (Matrices, Vectors & Complex Numbers)",
    "q_ar": "لتكن \\(f(x) = x^2 - 8x + 15\\) حيث \\(x \\ge 4\\). (أ) اكتب \\(f(x)\\) في صورة المربع الكامل وحدد مداها. (ب) أوجد قاعدة الدالة العكسية \\(f^{-1}(x)\\) ومجالها.",
    "examinerTip_ar": "الدالة العكسية يجب أن تكون وحيدة القيمة، لذا نختار الإشارة الموجبة للجذر \\(4 + \\sqrt{x - -1}\\) لأن \\(x \\ge 4\\)."
  },
  {
    "t": "sb",
    "ti": "Step Builder: Completing the Square & Vertex Analysis (Matrices, Vectors & Complex Numbers)",
    "steps": [
      {
        "l": "In \\(y = x^2 - 8x + 15\\), halve the \\(x\\)-coefficient to write \\((x - h)^2\\) where \\(h =\\)",
        "a": "4",
        "h": "Take half of 8."
      },
      {
        "l": "Compute the minimum value \\(k = 15 - 4^2 =\\)",
        "a": "-1",
        "h": "Subtract 16 from 15."
      },
      {
        "l": "Evaluate \\(y\\) when \\(x = 6\\): \\(y =\\)",
        "a": "3",
        "h": "Compute (2)^2 + -1."
      }
    ],
    "ti_ar": "بناء الخطوات: إكمال المربع وإيجاد القيمة الصغرى (Matrices, Vectors & Complex Numbers)",
    "steps_ar": [
      {
        "l": "في الدالة \\(y = x^2 - 8x + 15\\): قيمة \\(h\\) في \\((x - h)^2\\) تساوي:",
        "a": "4",
        "h": "اقسم معامل x وهو 8 على 2."
      },
      {
        "l": "احسب القيمة الصغرى \\(k = 15 - 4^2 =\\)",
        "a": "-1",
        "h": "اطرح 16 من 15."
      },
      {
        "l": "احسب قيمة \\(y\\) عندما \\(x = 6\\):",
        "a": "3",
        "h": "احسب 4 + -1."
      }
    ]
  },
  {
    "t": "mt",
    "ti": "Matching: Core Algebraic & Analytic Principles (Matrices, Vectors & Complex Numbers)",
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
    "ti_ar": "مطابقة: المبادئ الجبرية والتحليلية الأساسية (Matrices, Vectors & Complex Numbers)",
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
});
