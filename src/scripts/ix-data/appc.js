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
    "ti": "Spot the Error: Exam Pacing & Time Allocation (AP Precalculus Exam Format & Modeling Framework)",
    "ti_ar": "اكتشف الخطأ: إدارة الوقت وتوزيع الدرجات (نظام اختبار AP Precalculus وإطار النمذجة الرياضية)",
    "q": "A student plans their timing for a 25-question, 38-minute section in APPC. Which step in their strategy introduces a flaw?",
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
    "ti": "Examiner Mode: Pacing Audit & Target Score Plan (AP Precalculus Exam Format & Modeling Framework)",
    "ti_ar": "وضع المصحح: خطة إدارة الوقت والدرجة المستهدفة (نظام اختبار AP Precalculus وإطار النمذجة الرياضية)",
    "q": "A practice section has \\(25\\) equal-weight questions in \\(38\\) minutes with no penalty for wrong guesses. A student answers \\(20\\) correctly on Pass 1–2. (a) Find the exact seconds-per-question budget and accuracy percentage. (b) State the optimal triage rule for the remaining \\(5\\) flagged questions.",
    "q_ar": "يتكون قسم تدريبي من \\(25\\) سؤالاً متساوية الوزن في \\(38\\) دقيقة دون خصم على الإجابات الخاطئة. أجاب طالب عن \\(20\\) سؤالاً بشكل صحيح. (أ) أوجد الزمن المخصص لكل سؤال بالثواني ونسبة الدقة المئوية. (ب) اذكر قاعدة الفرز المثلى للأسئلة المتبقية وعددها \\(5\\).",
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
            "text": "Raw score percentage: \\(\\frac{20}{25} \\times 100\\% \\approx 80\\%\\)."
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
            "text": "Select the best remaining option on all \\(5\\) items before time expires (expected gain \\(> 0\\) with no guessing penalty)."
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
            "text": "النسبة المئوية للدرجة الخام: \\(\\frac{20}{25} \\times 100\\% \\approx 80\\%\\)."
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
            "text": "اختيار أفضل إجابة لجميع الأسئلة المتبقية (5) قبل انتهاء الوقت لعدم وجود خصم."
          }
        ]
      }
    ]
  },
  {
    "t": "sb",
    "ti": "Step Builder: Exam Time & Score Budget (AP Precalculus Exam Format & Modeling Framework)",
    "ti_ar": "بناء الخطوات: حساب ميزانية الوقت والدرجة (نظام اختبار AP Precalculus وإطار النمذجة الرياضية)",
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
        "l": "If you answer \\(20\\) out of \\(25\\) correctly, how many items remain for review?",
        "a": "5",
        "h": "Subtract 20 from 25."
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
        "l": "إذا حللت \\(20\\) من أصل \\(25\\)، فكم سؤالاً يتبقى للمراجعة؟",
        "a": "5",
        "h": "اطرح 20 من 25."
      }
    ]
  },
  {
    "t": "mt",
    "ti": "Matching: High-Yield Exam Tactics (AP Precalculus Exam Format & Modeling Framework)",
    "ti_ar": "مطابقة: تكتيكات الحل السريع والتحقق (نظام اختبار AP Precalculus وإطار النمذجة الرياضية)",
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
    "ti": "Spot the Error: Rational Cancelling & Asymptote Check (Unit 1 · Polynomial and Rational Functions)",
    "ti_ar": "اكتشف الخطأ: اختصار العبارات النسبية وخطوط التقارب (الوحدة ١ · الدوال كثيرة الحدود والدوال النسبية)",
    "q": "A student simplifies \\(R(x) = \\dfrac{x^2 - 4}{x - 2}\\) and describes its graph. Which step contains a flaw?",
    "q_ar": "يبسّط طالب الدالة النسبية \\(R(x) = \\dfrac{x^2 - 4}{x - 2}\\) ويصف تمثيلها البياني. أي خطوة تتضمن خطأ؟",
    "steps": [
      "Note denominator restriction \\(x \\neq 2\\).",
      "Factor numerator as difference of squares: \\((x - 2)(x + 2)\\).",
      "Cancel \\((x - 2)\\) for \\(x \\neq 2\\) to get \\(y = x + 2\\).",
      "Conclude the graph has a vertical asymptote at \\(x = 2\\) rather than a removable hole at \\((2, 4)\\)."
    ],
    "steps_ar": [
      "تحديد شرط المقام \\(x \\neq 2\\).",
      "تحليل البسط كفرق بين مربعين \\((x - 2)(x + 2)\\).",
      "اختصار \\((x - 2)\\) بشرط \\(x \\neq 2\\) للحصول على \\(y = x + 2\\).",
      "الاستنتاج بوجود خط تقارب رأسي عند \\(x = 2\\) بدلاً من فجوة قابلة للإزالة عند \\((2, 4)\\)."
    ],
    "errorStep": 4,
    "reasons": [
      "Because the factor \\((x - 2)\\) cancels completely from the denominator, \\(x = 2\\) is a removable point discontinuity (hole) at \\((2, 4)\\), NOT a vertical asymptote.",
      "You cannot factor \\(x^2 - 4\\).",
      "The domain includes \\(x = 2\\)."
    ],
    "reasons_ar": [
      "لأن العامل \\((x - 2)\\) اختُصر بالكامل من المقام، فإن \\(x = 2\\) تمثل فجوة عند \\((2, 4)\\) وليست خط تقارب رأسي.",
      "لا يمكن تحليل \\(x^2 - 4\\).",
      "المجال يشمل \\(x = 2\\)."
    ],
    "correctReason": 0
  },
  {
    "t": "ms",
    "ti": "Examiner Mode: Partial Fractions Cover-Up Decomposition (Unit 1 · Polynomial and Rational Functions)",
    "ti_ar": "وضع المصحح: تجزئة الكسور الجزئية (الوحدة ١ · الدوال كثيرة الحدود والدوال النسبية)",
    "q": "Express \\(\\dfrac{4x + 4}{(x - 2)(x + 4)}\\) in partial fractions \\(\\dfrac{A}{x - 2} + \\dfrac{B}{x + 4}\\). (a) Set up the polynomial identity. (b) Determine \\(A\\) and \\(B\\) by substitution.",
    "q_ar": "عبّر عن \\(\\dfrac{4x + 4}{(x - 2)(x + 4)}\\) في صورة كسور جزئية \\(\\dfrac{A}{x - 2} + \\dfrac{B}{x + 4}\\). (أ) اكتب المتطابقة المكافئة للبسط. (ب) أوجد قيمتي \\(A\\) و\\(B\\).",
    "parts": [
      {
        "label": "Part (a) — Clearing Denominators",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "Multiply through by \\((x - 2)(x + 4)\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "Identity: \\(4x + 4 \\equiv A(x + 4) + B(x - 2)\\)."
          }
        ]
      },
      {
        "label": "Part (b) — Root Substitution",
        "marks": 2,
        "rubric": [
          {
            "code": "A1",
            "marks": 1,
            "text": "Set \\(x = 2\\): \\(12 = A(6) \\implies A = 2\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "Set \\(x = -4\\): \\(-12 = B(-6) \\implies B = 2\\)."
          }
        ]
      }
    ],
    "parts_ar": [
      {
        "label": "الجزء (أ) — توحيد المقامات وكتابة المتطابقة",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "الضرب في \\((x - 2)(x + 4)\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "المتطابقة: \\(4x + 4 \\equiv A(x + 4) + B(x - 2)\\)."
          }
        ]
      },
      {
        "label": "الجزء (ب) — التعويض بأصفار المقام",
        "marks": 2,
        "rubric": [
          {
            "code": "A1",
            "marks": 1,
            "text": "بوضع \\(x = 2\\): نجد \\(A = 2\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "بوضع \\(x = -4\\): نجد \\(B = 2\\)."
          }
        ]
      }
    ]
  },
  {
    "t": "sb",
    "ti": "Step Builder: Partial Fractions & Radical Exponents (Unit 1 · Polynomial and Rational Functions)",
    "ti_ar": "بناء الخطوات: الكسور الجزئية والأسس الكسرية (الوحدة ١ · الدوال كثيرة الحدود والدوال النسبية)",
    "steps": [
      {
        "l": "In \\(4x + 4 \\equiv A(x + 4) + B(x - 2)\\), substitute \\(x = 2\\) to find \\(A =\\)",
        "a": "2",
        "h": "Divide (12) by (6)."
      },
      {
        "l": "Substitute \\(x = -4\\) to find \\(B =\\)",
        "a": "2",
        "h": "Divide (-12) by (−6)."
      },
      {
        "l": "Evaluate the rational exponent \\(8^{2/3} =\\)",
        "a": "4",
        "h": "(cube root of 8)² = 2²."
      }
    ],
    "steps_ar": [
      {
        "l": "في المتطابقة \\(4x + 4 \\equiv A(x + 4) + B(x - 2)\\)، عوّض \\(x = 2\\) لإيجاد \\(A =\\)",
        "a": "2",
        "h": "اقسم 12 على 6."
      },
      {
        "l": "عوّض \\(x = -4\\) لإيجاد \\(B =\\)",
        "a": "2",
        "h": "اقسم -12 على (−6)."
      },
      {
        "l": "احسب قيمة الأس الكسري \\(8^{2/3} =\\)",
        "a": "4",
        "h": "(الجذر التكعيبي للعدد 8)² = 2²."
      }
    ]
  },
  {
    "t": "mt",
    "ti": "Matching: Rational Asymptotes & Exponent Laws (Unit 1 · Polynomial and Rational Functions)",
    "ti_ar": "مطابقة: خطوط التقارب وقوانين الأسس والجذور (الوحدة ١ · الدوال كثيرة الحدود والدوال النسبية)",
    "p": [
      {
        "l": "Horizontal asymptote of \\(\\frac{4x^2 + 1}{x^2 - 2}\\)",
        "r": "\\(y = 4\\) (ratio of leading coefficients)"
      },
      {
        "l": "Vertical asymptote of \\(\\frac{1}{x - 2}\\)",
        "r": "\\(x = 2\\) (non-cancelled denominator zero)"
      },
      {
        "l": "Fractional power \\(x^{m/n}\\)",
        "r": "\\((\\sqrt[n]{x})^m\\)"
      },
      {
        "l": "Improper rational \\(\\deg(P) \\ge \\deg(Q)\\)",
        "r": "Perform polynomial long division before partial fractions"
      }
    ],
    "p_ar": [
      {
        "l": "خط التقارب الأفقي للدالة \\(\\frac{4x^2 + 1}{x^2 - 2}\\)",
        "r": "\\(y = 4\\) (نسبة المعاملين الرئيسين)"
      },
      {
        "l": "خط التقارب الرأسي للدالة \\(\\frac{1}{x - 2}\\)",
        "r": "\\(x = 2\\) (صفر المقام غير المختصر)"
      },
      {
        "l": "الأس الكسري \\(x^{m/n}\\)",
        "r": "\\((\\sqrt[n]{x})^m\\)"
      },
      {
        "l": "كسر غير فعلي \\(\\deg(P) \\ge \\deg(Q)\\)",
        "r": "إجراء القسمة المطولة قبل تجزئة الكسور"
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
    "ti": "Spot the Error: Logarithm Law Misapplication (Unit 2 · Exponential and Logarithmic Functions)",
    "ti_ar": "اكتشف الخطأ: التطبيق الخاطئ لقوانين اللوغاريتمات (الوحدة ٢ · الدوال الأسية واللوغاريتمية)",
    "q": "A student attempts to solve \\(\\log_{3}(x) + \\log_{3}(3) = 3\\). Which step introduces an invalid rule?",
    "q_ar": "يحاول طالب حل المعادلة \\(\\log_{3}(x) + \\log_{3}(3) = 3\\). أي خطوة تتضمن قانوناً خاطئاً؟",
    "steps": [
      "Note the domain requirement \\(x > 0\\).",
      "Combine the sum of logarithms as \\(\\log_{3}(x + 3) = 3\\) instead of multiplying arguments.",
      "Exponentiate base \\(3\\) to write \\(x + 3 = 27\\).",
      "Subtract \\(3\\) to report \\(x = 24\\)."
    ],
    "steps_ar": [
      "تحديد شرط مجال اللوغاريتم \\(x > 0\\).",
      "دمج مجموع اللوغاريتمين في صورة \\(\\log_{3}(x + 3) = 3\\) بدلاً من ضرب ما بداخل اللوغاريتم.",
      "التحويل للصورة الأسية: \\(x + 3 = 27\\).",
      "طرح \\(3\\) للوصول إلى الناتج."
    ],
    "errorStep": 2,
    "reasons": [
      "The product rule states \\(\\log_b(M) + \\log_b(N) = \\log_b(MN)\\), NOT \\(\\log_b(M + N)\\); thus \\(\\log_{3}(3x) = 3 \\implies x = 9\\).",
      "The domain of \\(\\log(x)\\) is all real numbers.",
      "\\(\\log_{3}(3) = 0\\)."
    ],
    "reasons_ar": [
      "قاعدة الضرب تنص على أن \\(\\log_b(M) + \\log_b(N) = \\log_b(MN)\\) وليس جمع المداخل؛ ومنه \\(x = 9\\).",
      "مجال الدالة اللوغاريتمية هو جميع الأعداد الحقيقية.",
      "قيمة \\(\\log_{3}(3) = 0\\)."
    ],
    "correctReason": 0
  },
  {
    "t": "ms",
    "ti": "Examiner Mode: Logarithmic Equation & Continuous Growth (Unit 2 · Exponential and Logarithmic Functions)",
    "ti_ar": "وضع المصحح: المعادلات اللوغاريتمية والنمو الأسي (الوحدة ٢ · الدوال الأسية واللوغاريتمية)",
    "q": "(a) Solve \\(\\log_{3}(x - 3) = 2\\), stating the domain restriction. (b) A culture grows via \\(P(t) = P_0 e^{rt}\\); find the exact doubling time \\(T_d\\) in terms of \\(r\\).",
    "q_ar": "(أ) حل المعادلة \\(\\log_{3}(x - 3) = 2\\) مع ذكر شرط المجال. (ب) تنمو عينة وفق \\(P(t) = P_0 e^{rt}\\)؛ أوجد زمن التضاعف \\(T_d\\) بدلالة \\(r\\).",
    "parts": [
      {
        "label": "Part (a) — Domain & Exponential Conversion",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "Domain \\(x > 3\\); convert to \\(x - 3 = 3^{2} = 9\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "\\(x = 12\\) (valid since \\(12 > 3\\))."
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
            "text": "المجال \\(x > 3\\)؛ والتحويل يعطي \\(x - 3 = 3^{2} = 9\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "\\(x = 12\\) (يحقق شرط المجال)."
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
    "ti": "Step Builder: Solving Logarithmic Equations (Unit 2 · Exponential and Logarithmic Functions)",
    "ti_ar": "بناء الخطوات: حل المعادلة اللوغاريتمية (الوحدة ٢ · الدوال الأسية واللوغاريتمية)",
    "steps": [
      {
        "l": "Evaluate \\(3^{2} =\\)",
        "a": "9",
        "h": "Multiply 3 by itself 2 times."
      },
      {
        "l": "Solve \\(\\log_{3}(x - 3) = 2\\) for \\(x =\\)",
        "a": "12",
        "h": "Add 3 to 9."
      },
      {
        "l": "Evaluate \\(\\log_{3}(1) =\\)",
        "a": "0",
        "h": "Any base raised to 0 equals 1."
      }
    ],
    "steps_ar": [
      {
        "l": "احسب \\(3^{2} =\\)",
        "a": "9",
        "h": "اضرب 3 في نفسه 2 مرات."
      },
      {
        "l": "حل المعادلة \\(\\log_{3}(x - 3) = 2\\) لإيجاد \\(x =\\)",
        "a": "12",
        "h": "اجمع 3 مع 9."
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
    "ti": "Matching: Logarithm Laws & Asymptotes (Unit 2 · Exponential and Logarithmic Functions)",
    "ti_ar": "مطابقة: قوانين اللوغاريتمات وخطوط التقارب (الوحدة ٢ · الدوال الأسية واللوغاريتمية)",
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
        "l": "Vertical asymptote of \\(\\ln(x - 3)\\)",
        "r": "\\(x = 3\\)"
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
        "l": "خط التقارب الرأسي للدالة \\(\\ln(x - 3)\\)",
        "r": "\\(x = 3\\)"
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
    "ti": "Spot the Error: Polar-to-Rectangular Conversion & Quadrant Angle",
    "ti_ar": "اكتشف الخطأ: التحويل من الإحداثيات القطبية إلى الديكارتية وزاوية الربع",
    "q": "A student converts the rectangular point \\((-3, 3)\\) (Quadrant II) into polar coordinates \\((r, \\theta)\\) with \\(r > 0\\) and \\(0 \\le \\theta < 2\\pi\\). Which step is invalid?",
    "q_ar": "يحوّل طالب النقطة الديكارتية \\((-3, 3)\\) (الربع الثاني) إلى إحداثيات قطبية \\((r, \\theta)\\) مع \\(r > 0\\) و\\(0 \\le \\theta < 2\\pi\\). أي خطوة غير صحيحة؟",
    "steps": [
      "Compute the radial distance \\(r = \\sqrt{(-3)^2 + 3^2} = \\sqrt{18} = 3\\sqrt{2}\\).",
      "Compute \\(\\tan\\theta = \\dfrac{y}{x} = \\dfrac{3}{-3} = -1\\).",
      "Conclude directly from \\(\\arctan(-1)\\) that \\(\\theta = -\\dfrac{\\pi}{4}\\), which is coterminal with \\(\\dfrac{7\\pi}{4}\\).",
      "Write the polar coordinates as \\(\\left(3\\sqrt{2}, \\dfrac{7\\pi}{4}\\right)\\)."
    ],
    "steps_ar": [
      "حساب البعد القطبي \\(r = \\sqrt{(-3)^2 + 3^2} = 3\\sqrt{2}\\).",
      "حساب \\(\\tan\\theta = \\dfrac{y}{x} = \\dfrac{3}{-3} = -1\\).",
      "الاستنتاج مباشرة من \\(\\arctan(-1)\\) أن \\(\\theta = -\\dfrac{\\pi}{4}\\) المكافئة لـ \\(\\dfrac{7\\pi}{4}\\).",
      "كتابة الإحداثيات القطبية \\(\\left(3\\sqrt{2}, \\dfrac{7\\pi}{4}\\right)\\)."
    ],
    "errorStep": 3,
    "reasons": [
      "Since \\(x = -3 < 0\\) and \\(y = 3 > 0\\), the point lies in Quadrant II, so \\(\\theta = \\pi + \\arctan(-1) = \\dfrac{3\\pi}{4}\\), not \\(\\dfrac{7\\pi}{4}\\) (Quadrant IV).",
      "The radius \\(r\\) should be negative whenever \\(x < 0\\).",
      "\\(\\tan\\theta\\) is defined as \\(x / y\\) rather than \\(y / x\\)."
    ],
    "reasons_ar": [
      "بما أن \\(x < 0\\) و\\(y > 0\\) تقع النقطة في الربع الثاني، لذا \\(\\theta = \\pi - \\dfrac{\\pi}{4} = \\dfrac{3\\pi}{4}\\) وليس \\(\\dfrac{7\\pi}{4}\\).",
      "يجب أن يكون نصف القطر \\(r\\) سالباً دائماً عندما تكون \\(x < 0\\).",
      "تعريف \\(\\tan\\theta\\) هو \\(x / y\\) وليس \\(y / x\\)."
    ],
    "correctReason": 0
  },
  {
    "t": "ms",
    "ti": "Examiner Mode: Parametric Slope & Polar Conversion (Unit 3 · Trigonometric and Polar Functions)",
    "ti_ar": "وضع المصحح: ميل المنحنى البارامتري والتحويل القطبي (الوحدة ٣ · الدوال المثلثية والدوال القطبية)",
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
    "ti": "Step Builder: Polar Coordinates & Parametric Speed (Unit 3 · Trigonometric and Polar Functions)",
    "ti_ar": "بناء الخطوات: الإحداثيات القطبية والسرعة البارامترية (الوحدة ٣ · الدوال المثلثية والدوال القطبية)",
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
    "t": "mt",
    "ti": "Matching: Polar Coordinates & Trigonometric Identities",
    "ti_ar": "مطابقة: الإحداثيات القطبية والمتطابقات المثلثية",
    "p": [
      {
        "l": "Polar-to-rectangular coordinates",
        "r": "\\(x = r\\cos\\theta,\\; y = r\\sin\\theta\\)"
      },
      {
        "l": "Polar circle symmetric about the polar axis",
        "r": "\\(r = 2a\\cos\\theta\\)"
      },
      {
        "l": "Sinusoidal period of \\(y = A\\sin(Bx - C) + D\\)",
        "r": "\\(T = \\dfrac{2\\pi}{|B|}\\)"
      },
      {
        "l": "Double-angle identity for \\(\\cos(2\\theta)\\)",
        "r": "\\(\\cos^2\\theta - \\sin^2\\theta = 1 - 2\\sin^2\\theta\\)"
      }
    ],
    "p_ar": [
      {
        "l": "التحويل من القطبي إلى الديكارتي",
        "r": "\\(x = r\\cos\\theta,\\; y = r\\sin\\theta\\)"
      },
      {
        "l": "دائرة قطبية متماثلة حول المحور القطبي",
        "r": "\\(r = 2a\\cos\\theta\\)"
      },
      {
        "l": "طول الدورة للدالة \\(y = A\\sin(Bx - C) + D\\)",
        "r": "\\(T = \\dfrac{2\\pi}{|B|}\\)"
      },
      {
        "l": "متطابقة ضعف الزاوية \\(\\cos(2\\theta)\\)",
        "r": "\\(\\cos^2\\theta - \\sin^2\\theta = 1 - 2\\sin^2\\theta\\)"
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
    "ti": "Explorer: Parametric Projectile Trajectory \\(x(t)=u t,\\; y(t)=v t - 0.5 t^2\\)",
    "ti_ar": "مستكشف: المسار الوسيطي للمقذوف \\(x(t)=u t,\\; y(t)=v t - 0.5 t^2\\)",
    "fns": [
      {
        "expr": "(v/u)*x - 0.5*(x/u)^2",
        "color": "#1E3A6E",
        "label": "y(x) trajectory"
      }
    ],
    "xrange": [
      0,
      20
    ],
    "yrange": [
      -2,
      20
    ],
    "params": [
      {
        "name": "u",
        "label": "Horizontal speed u",
        "min": 1,
        "max": 4,
        "step": 0.5,
        "default": 2
      },
      {
        "name": "v",
        "label": "Vertical launch v",
        "min": 2,
        "max": 6,
        "step": 0.5,
        "default": 4
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
    "ti": "Spot the Error: Eliminating the Parameter & Matrix Multiplication",
    "ti_ar": "اكتشف الخطأ: حذف الوسيط البارامتري وضرب المصفوفات",
    "q": "Given parametric curve \\(x(t) = 2\\cos t,\\; y(t) = 3\\sin t\\) for \\(0 \\le t \\le \\pi\\), a student eliminates \\(t\\). Which step loses domain information or makes an algebraic error?",
    "q_ar": "للمنحنى الوسيطي \\(x(t) = 2\\cos t,\\; y(t) = 3\\sin t\\) حيث \\(0 \\le t \\le \\pi\\)، يحذف طالب الوسيط \\(t\\). أي خطوة تتضمن خطأ؟",
    "steps": [
      "Isolate trig ratios: \\(\\cos t = \\dfrac{x}{2}\\) and \\(\\sin t = \\dfrac{y}{3}\\).",
      "Apply the Pythagorean identity \\(\\cos^2 t + \\sin^2 t = 1\\) to get \\(\\dfrac{x^2}{4} + \\dfrac{y^2}{9} = 1\\).",
      "State that for \\(0 \\le t \\le \\pi\\), the curve traces the entire closed ellipse including negative \\(y\\)-values.",
      "Identify vertices at \\((2, 0)\\) for \\(t = 0\\) and \\((-2, 0)\\) for \\(t = \\pi\\)."
    ],
    "steps_ar": [
      "عزل النسب المثلثية: \\(\\cos t = \\dfrac{x}{2}\\) و\\(\\sin t = \\dfrac{y}{3}\\).",
      "تطبيق متطابقة فيثاغورس للحصول على \\(\\dfrac{x^2}{4} + \\dfrac{y^2}{9} = 1\\).",
      "استنتاج أن المنحنى يرسم القطع الناقص المغلق كاملاً شاملاً قيم \\(y\\) السالبة على الفترة \\(0 \\le t \\le \\pi\\).",
      "تحديد نقطتي البداية والنهاية \\((2, 0)\\) عند \\(t = 0\\) و\\((-2, 0)\\) عند \\(t = \\pi\\)."
    ],
    "errorStep": 3,
    "reasons": [
      "On \\(0 \\le t \\le \\pi\\), \\(\\sin t \\ge 0\\), so \\(y = 3\\sin t \\ge 0\\) traces ONLY the upper semi-ellipse counter-clockwise from \\((2,0)\\) to \\((-2,0)\\).",
      "Squaring \\(x/2\\) gives \\(x^2/2\\), not \\(x^2/4\\).",
      "\\(\\cos^2 t + \\sin^2 t\\) equals \\(-1\\) on \\([0, \\pi]\\)."
    ],
    "reasons_ar": [
      "على الفترة \\(0 \\le t \\le \\pi\\) يكون \\(\\sin t \\ge 0\\)، لذا \\(y \\ge 0\\) ويرسم المنحنى النصف العلوي فقط من القطع الناقص.",
      "تربيع \\(x/2\\) يعطي \\(x^2/2\\) وليس \\(x^2/4\\).",
      "مجموع \\(\\cos^2 t + \\sin^2 t\\) يساوي \\(-1\\)."
    ],
    "correctReason": 0
  },
  {
    "t": "ms",
    "ti": "Examiner Mode: Parametric Slope & Polar Conversion (Unit 4 · Parameters, Vectors, and Matrices)",
    "ti_ar": "وضع المصحح: ميل المنحنى البارامتري والتحويل القطبي (الوحدة ٤ · المعادلات البارامترية والمتجهات والمصفوفات)",
    "q": "(a) A particle moves with \\(x(t) = t^2\\) and \\(y(t) = t^3 - 2t\\). Find \\(\\dfrac{dy}{dx}\\) at \\(t = 2\\). (b) Convert the polar point \\((r, \\theta) = (2, \\frac{\\pi}{3})\\) to exact Cartesian coordinates.",
    "q_ar": "(أ) يتحرك جسيم وفق \\(x(t) = t^2\\) و\\(y(t) = t^3 - 2t\\). أوجد \\(\\dfrac{dy}{dx}\\) عند \\(t = 2\\). (ب) حوّل النقطة القطبية \\((2, \\frac{\\pi}{3})\\) إلى الإحداثيات الديكارتية الدقيقة.",
    "parts": [
      {
        "label": "Part (a) — Parametric Tangent Slope",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "\\(x'(2) = 4,\\; y'(2) = 12 - 2 = 10\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "\\(\\left.\\dfrac{dy}{dx}\\right|_{t=2} = \\dfrac{10}{4}\\)."
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
            "text": "\\(x = 2\\cos(\\pi/3) = 1\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "\\(y = 2\\sin(\\pi/3) = 1\\sqrt{3}\\)."
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
            "text": "\\(x'(2) = 4,\\; y'(2) = 10\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "\\(\\left.\\dfrac{dy}{dx}\\right|_{t=2} = \\dfrac{10}{4}\\)."
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
            "text": "\\(x = 2\\cos(\\pi/3) = 1\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "\\(y = 2\\sin(\\pi/3) = 1\\sqrt{3}\\)."
          }
        ]
      }
    ]
  },
  {
    "t": "sb",
    "ti": "Step Builder: Polar Coordinates & Parametric Speed (Unit 4 · Parameters, Vectors, and Matrices)",
    "ti_ar": "بناء الخطوات: الإحداثيات القطبية والسرعة البارامترية (الوحدة ٤ · المعادلات البارامترية والمتجهات والمصفوفات)",
    "steps": [
      {
        "l": "For polar point \\((2, \\pi/3)\\), compute \\(x = r\\cos(\\pi/3) =\\)",
        "a": "1",
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
        "l": "للنقطة القطبية \\((2, \\pi/3)\\)، احسب \\(x = r\\cos(\\pi/3) =\\)",
        "a": "1",
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
    "t": "mt",
    "ti": "Matching: Parametric Curves, Vectors & Linear Transformations",
    "ti_ar": "مطابقة: المنحنيات الوسيطية والمتجهات والتحويلات المصفوفية",
    "p": [
      {
        "l": "Parametric circle of radius \\(R\\) centered at \\((h, k)\\)",
        "r": "\\(x(t) = h + R\\cos t,\\; y(t) = k + R\\sin t\\)"
      },
      {
        "l": "Dot product \\(\\mathbf{u} \\cdot \\mathbf{v}\\) of orthogonal vectors",
        "r": "Equals \\(0\\) when \\(\\theta = 90^\\circ\\)"
      },
      {
        "l": "Determinant \\(\\det(A)\\) of \\(2 \\times 2\\) matrix \\(\\begin{pmatrix}a & b\\\\c & d\\end{pmatrix}\\)",
        "r": "Signed area scale factor \\(ad - bc\\)"
      },
      {
        "l": "Counter-clockwise rotation matrix by \\(90^\\circ\\)",
        "r": "\\(\\begin{pmatrix}0 & -1\\\\1 & 0\\end{pmatrix}\\)"
      }
    ],
    "p_ar": [
      {
        "l": "معادلة دائرة وسيطية نصف قطرها \\(R\\) ومركزها \\((h, k)\\)",
        "r": "\\(x(t) = h + R\\cos t,\\; y(t) = k + R\\sin t\\)"
      },
      {
        "l": "الضرب القياسي \\(\\mathbf{u} \\cdot \\mathbf{v}\\) لمتجهين متعامدين",
        "r": "يساوي \\(0\\) عند \\(\\theta = 90^\\circ\\)"
      },
      {
        "l": "محدد مصفوفة \\(2 \\times 2\\)",
        "r": "معامل مقياس المساحة الموجه \\(ad - bc\\)"
      },
      {
        "l": "مصفوفة الدوران بزاوية \\(90^\\circ\\) عكس عقارب الساعة",
        "r": "\\(\\begin{pmatrix}0 & -1\\\\1 & 0\\end{pmatrix}\\)"
      }
    ]
  }
];
D["appc-u1b"] = [
  {
    "t": "qc",
    "ti": "Quick Check: Horizontal Asymptote Degree Test (Unit 1B · Rational Functions, End Behavior, Asymptotes & Binomial Theorem)",
    "ti_ar": "فحص سريع: اختبار درجة البسط والمقام لخط التقارب الأفقي (الوحدة 1B · الدوال النسبية وسلوك الأطراف وخطوط التقارب ونظرية ذات الحدين)",
    "q": "What is the horizontal asymptote of \\(f(x) = \\dfrac{7x^2 - 5}{2x^2 + 4}\\) as \\(x \\to \\pm\\infty\\)?",
    "q_ar": "ما معادلة خط التقارب الأفقي للدالة \\(f(x) = \\dfrac{7x^2 - 5}{2x^2 + 4}\\) عندما \\(x \\to \\pm\\infty\\)؟",
    "o": [
      "\\(y = \\frac{7}{2}\\)",
      "\\(y = 0\\)",
      "\\(x = \\frac{7}{2}\\)",
      "No horizontal asymptote"
    ],
    "o_ar": [
      "\\(y = \\frac{7}{2}\\)",
      "\\(y = 0\\)",
      "\\(x = \\frac{7}{2}\\)",
      "لا يوجد خط تقارب أفقي"
    ],
    "a": 0,
    "ex": "Equal degrees in numerator and denominator give horizontal asymptote \\(y = \\frac{7}{2}\\).",
    "ex_ar": "تساوي درجتي البسط والمقام يعطي خط تقارب أفقي \\(y = \\frac{7}{2}\\)."
  },
  {
    "t": "tf",
    "ti": "True / False: Rational Asymptotes & Exponent Laws (Unit 1B · Rational Functions, End Behavior, Asymptotes & Binomial Theorem)",
    "ti_ar": "صح أم خطأ: خطوط التقارب وقوانين الأسس والجذور (الوحدة 1B · الدوال النسبية وسلوك الأطراف وخطوط التقارب ونظرية ذات الحدين)",
    "items": [
      {
        "s": "Horizontal asymptote of \\(\\frac{6x^2 + 1}{x^2 - 2}\\) corresponds to \\(y = 6\\) (ratio of leading coefficients).",
        "a": true,
        "ex": "Verified identity: \\(y = 6\\) (ratio of leading coefficients)."
      },
      {
        "s": "Vertical asymptote of \\(\\frac{1}{x - 2}\\) corresponds to \\((\\sqrt[n]{x})^m\\).",
        "a": false,
        "ex": "Actually, Vertical asymptote of \\(\\frac{1}{x - 2}\\) corresponds to \\(x = 2\\) (non-cancelled denominator zero)."
      },
      {
        "s": "Improper rational \\(\\deg(P) \\ge \\deg(Q)\\) corresponds to Perform polynomial long division before partial fractions.",
        "a": true,
        "ex": "Correct: Perform polynomial long division before partial fractions."
      }
    ],
    "items_ar": [
      {
        "s": "خط التقارب الأفقي للدالة \\(\\frac{6x^2 + 1}{x^2 - 2}\\) يكافئ \\(y = 6\\) (نسبة المعاملين الرئيسين).",
        "a": true,
        "ex": "علاقة صحيحة: \\(y = 6\\) (نسبة المعاملين الرئيسين)."
      },
      {
        "s": "خط التقارب الرأسي للدالة \\(\\frac{1}{x - 2}\\) يكافئ \\((\\sqrt[n]{x})^m\\).",
        "a": false,
        "ex": "الصواب أن خط التقارب الرأسي للدالة \\(\\frac{1}{x - 2}\\) يكافئ \\(x = 2\\) (صفر المقام غير المختصر)."
      },
      {
        "s": "كسر غير فعلي \\(\\deg(P) \\ge \\deg(Q)\\) يكافئ إجراء القسمة المطولة قبل تجزئة الكسور.",
        "a": true,
        "ex": "صحيح: إجراء القسمة المطولة قبل تجزئة الكسور."
      }
    ]
  },
  {
    "t": "mt",
    "ti": "Matching: Rational Asymptotes & Exponent Laws (Unit 1B · Rational Functions, End Behavior, Asymptotes & Binomial Theorem)",
    "ti_ar": "مطابقة: خطوط التقارب وقوانين الأسس والجذور (الوحدة 1B · الدوال النسبية وسلوك الأطراف وخطوط التقارب ونظرية ذات الحدين)",
    "p": [
      {
        "l": "Horizontal asymptote of \\(\\frac{6x^2 + 1}{x^2 - 2}\\)",
        "r": "\\(y = 6\\) (ratio of leading coefficients)"
      },
      {
        "l": "Vertical asymptote of \\(\\frac{1}{x - 2}\\)",
        "r": "\\(x = 2\\) (non-cancelled denominator zero)"
      },
      {
        "l": "Fractional power \\(x^{m/n}\\)",
        "r": "\\((\\sqrt[n]{x})^m\\)"
      },
      {
        "l": "Improper rational \\(\\deg(P) \\ge \\deg(Q)\\)",
        "r": "Perform polynomial long division before partial fractions"
      }
    ],
    "p_ar": [
      {
        "l": "خط التقارب الأفقي للدالة \\(\\frac{6x^2 + 1}{x^2 - 2}\\)",
        "r": "\\(y = 6\\) (نسبة المعاملين الرئيسين)"
      },
      {
        "l": "خط التقارب الرأسي للدالة \\(\\frac{1}{x - 2}\\)",
        "r": "\\(x = 2\\) (صفر المقام غير المختصر)"
      },
      {
        "l": "الأس الكسري \\(x^{m/n}\\)",
        "r": "\\((\\sqrt[n]{x})^m\\)"
      },
      {
        "l": "كسر غير فعلي \\(\\deg(P) \\ge \\deg(Q)\\)",
        "r": "إجراء القسمة المطولة قبل تجزئة الكسور"
      }
    ]
  },
  {
    "t": "num",
    "ti": "Numeric Entry: Partial Fractions & Radical Exponents (Unit 1B · Rational Functions, End Behavior, Asymptotes & Binomial Theorem)",
    "ti_ar": "إدخال رقمي: الكسور الجزئية والأسس الكسرية (الوحدة 1B · الدوال النسبية وسلوك الأطراف وخطوط التقارب ونظرية ذات الحدين)",
    "q": "In \\(6x + 6 \\equiv A(x + 4) + B(x - 2)\\), substitute \\(x = 2\\) to find \\(A =\\)",
    "q_ar": "في المتطابقة \\(6x + 6 \\equiv A(x + 4) + B(x - 2)\\)، عوّض \\(x = 2\\) لإيجاد \\(A =\\)",
    "a": "3",
    "ex": "Divide (18) by (6). Answer: \\(3\\).",
    "ex_ar": "اقسم 18 على 6. الإجابة: \\(3\\)."
  },
  {
    "t": "ord",
    "ti": "Order the Steps: Partial Fractions & Radical Exponents (Unit 1B · Rational Functions, End Behavior, Asymptotes & Binomial Theorem)",
    "ti_ar": "ترتيب الخطوات: الكسور الجزئية والأسس الكسرية (الوحدة 1B · الدوال النسبية وسلوك الأطراف وخطوط التقارب ونظرية ذات الحدين)",
    "prompt": "Arrange the sequential calculation steps in logical order:",
    "prompt_ar": "رتّب خطوات الحل المتسلسلة ترتيباً منطقياً:",
    "items": [
      "In \\(6x + 6 \\equiv A(x + 4) + B(x - 2)\\), substitute \\(x = 2\\) to find \\(A =\\) \\(3\\).",
      "Substitute \\(x = -4\\) to find \\(B =\\) \\(3\\).",
      "Evaluate the rational exponent \\(8^{2/3} =\\) \\(4\\)."
    ],
    "items_ar": [
      "في المتطابقة \\(6x + 6 \\equiv A(x + 4) + B(x - 2)\\)، عوّض \\(x = 2\\) لإيجاد \\(A =\\) \\(3\\).",
      "عوّض \\(x = -4\\) لإيجاد \\(B =\\) \\(3\\).",
      "احسب قيمة الأس الكسري \\(8^{2/3} =\\) \\(4\\)."
    ],
    "ex": "Execute each intermediate stage sequentially to reach the final verified result.",
    "ex_ar": "نفّذ كل مرحلة بالترتيب للوصول إلى النتيجة النهائية."
  },
  {
    "t": "cat",
    "ti": "Categorize: Rational Asymptotes & Exponent Laws (Unit 1B · Rational Functions, End Behavior, Asymptotes & Binomial Theorem)",
    "ti_ar": "تصنيف: خطوط التقارب وقوانين الأسس والجذور (الوحدة 1B · الدوال النسبية وسلوك الأطراف وخطوط التقارب ونظرية ذات الحدين)",
    "categories": [
      "Horizontal asymptote of \\(\\frac{6x^2 + 1}{x^2 - 2}\\)",
      "Vertical asymptote of \\(\\frac{1}{x - 2}\\)"
    ],
    "categories_ar": [
      "خط التقارب الأفقي للدالة \\(\\frac{6x^2 + 1}{x^2 - 2}\\)",
      "خط التقارب الرأسي للدالة \\(\\frac{1}{x - 2}\\)"
    ],
    "items": [
      {
        "s": "\\(y = 6\\) (ratio of leading coefficients)",
        "cat": 0
      },
      {
        "s": "\\(x = 2\\) (non-cancelled denominator zero)",
        "cat": 1
      }
    ],
    "items_ar": [
      {
        "s": "\\(y = 6\\) (نسبة المعاملين الرئيسين)",
        "cat": 0
      },
      {
        "s": "\\(x = 2\\) (صفر المقام غير المختصر)",
        "cat": 1
      }
    ],
    "ex": "Horizontal asymptote of \\(\\frac{6x^2 + 1}{x^2 - 2}\\) → \\(y = 6\\) (ratio of leading coefficients); Vertical asymptote of \\(\\frac{1}{x - 2}\\) → \\(x = 2\\) (non-cancelled denominator zero).",
    "ex_ar": "خط التقارب الأفقي للدالة \\(\\frac{6x^2 + 1}{x^2 - 2}\\) ← \\(y = 6\\) (نسبة المعاملين الرئيسين)."
  },
  {
    "t": "se",
    "ti": "Spot the Error: Rational Cancelling & Asymptote Check (Unit 1B · Rational Functions, End Behavior, Asymptotes & Binomial Theorem)",
    "ti_ar": "اكتشف الخطأ: اختصار العبارات النسبية وخطوط التقارب (الوحدة 1B · الدوال النسبية وسلوك الأطراف وخطوط التقارب ونظرية ذات الحدين)",
    "q": "A student simplifies \\(R(x) = \\dfrac{x^2 - 4}{x - 2}\\) and describes its graph. Which step contains a flaw?",
    "q_ar": "يبسّط طالب الدالة النسبية \\(R(x) = \\dfrac{x^2 - 4}{x - 2}\\) ويصف تمثيلها البياني. أي خطوة تتضمن خطأ؟",
    "steps": [
      "Note denominator restriction \\(x \\neq 2\\).",
      "Factor numerator as difference of squares: \\((x - 2)(x + 2)\\).",
      "Cancel \\((x - 2)\\) for \\(x \\neq 2\\) to get \\(y = x + 2\\).",
      "Conclude the graph has a vertical asymptote at \\(x = 2\\) rather than a removable hole at \\((2, 4)\\)."
    ],
    "steps_ar": [
      "تحديد شرط المقام \\(x \\neq 2\\).",
      "تحليل البسط كفرق بين مربعين \\((x - 2)(x + 2)\\).",
      "اختصار \\((x - 2)\\) بشرط \\(x \\neq 2\\) للحصول على \\(y = x + 2\\).",
      "الاستنتاج بوجود خط تقارب رأسي عند \\(x = 2\\) بدلاً من فجوة قابلة للإزالة عند \\((2, 4)\\)."
    ],
    "errorStep": 4,
    "reasons": [
      "Because the factor \\((x - 2)\\) cancels completely from the denominator, \\(x = 2\\) is a removable point discontinuity (hole) at \\((2, 4)\\), NOT a vertical asymptote.",
      "You cannot factor \\(x^2 - 4\\).",
      "The domain includes \\(x = 2\\)."
    ],
    "reasons_ar": [
      "لأن العامل \\((x - 2)\\) اختُصر بالكامل من المقام، فإن \\(x = 2\\) تمثل فجوة عند \\((2, 4)\\) وليست خط تقارب رأسي.",
      "لا يمكن تحليل \\(x^2 - 4\\).",
      "المجال يشمل \\(x = 2\\)."
    ],
    "correctReason": 0
  },
  {
    "t": "ms",
    "ti": "Examiner Mode: Partial Fractions Cover-Up Decomposition (Unit 1B · Rational Functions, End Behavior, Asymptotes & Binomial Theorem)",
    "ti_ar": "وضع المصحح: تجزئة الكسور الجزئية (الوحدة 1B · الدوال النسبية وسلوك الأطراف وخطوط التقارب ونظرية ذات الحدين)",
    "q": "Express \\(\\dfrac{6x + 6}{(x - 2)(x + 4)}\\) in partial fractions \\(\\dfrac{A}{x - 2} + \\dfrac{B}{x + 4}\\). (a) Set up the polynomial identity. (b) Determine \\(A\\) and \\(B\\) by substitution.",
    "q_ar": "عبّر عن \\(\\dfrac{6x + 6}{(x - 2)(x + 4)}\\) في صورة كسور جزئية \\(\\dfrac{A}{x - 2} + \\dfrac{B}{x + 4}\\). (أ) اكتب المتطابقة المكافئة للبسط. (ب) أوجد قيمتي \\(A\\) و\\(B\\).",
    "parts": [
      {
        "label": "Part (a) — Clearing Denominators",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "Multiply through by \\((x - 2)(x + 4)\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "Identity: \\(6x + 6 \\equiv A(x + 4) + B(x - 2)\\)."
          }
        ]
      },
      {
        "label": "Part (b) — Root Substitution",
        "marks": 2,
        "rubric": [
          {
            "code": "A1",
            "marks": 1,
            "text": "Set \\(x = 2\\): \\(18 = A(6) \\implies A = 3\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "Set \\(x = -4\\): \\(-18 = B(-6) \\implies B = 3\\)."
          }
        ]
      }
    ],
    "parts_ar": [
      {
        "label": "الجزء (أ) — توحيد المقامات وكتابة المتطابقة",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "الضرب في \\((x - 2)(x + 4)\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "المتطابقة: \\(6x + 6 \\equiv A(x + 4) + B(x - 2)\\)."
          }
        ]
      },
      {
        "label": "الجزء (ب) — التعويض بأصفار المقام",
        "marks": 2,
        "rubric": [
          {
            "code": "A1",
            "marks": 1,
            "text": "بوضع \\(x = 2\\): نجد \\(A = 3\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "بوضع \\(x = -4\\): نجد \\(B = 3\\)."
          }
        ]
      }
    ]
  },
  {
    "t": "sb",
    "ti": "Step Builder: Partial Fractions & Radical Exponents (Unit 1B · Rational Functions, End Behavior, Asymptotes & Binomial Theorem)",
    "ti_ar": "بناء الخطوات: الكسور الجزئية والأسس الكسرية (الوحدة 1B · الدوال النسبية وسلوك الأطراف وخطوط التقارب ونظرية ذات الحدين)",
    "steps": [
      {
        "l": "In \\(6x + 6 \\equiv A(x + 4) + B(x - 2)\\), substitute \\(x = 2\\) to find \\(A =\\)",
        "a": "3",
        "h": "Divide (18) by (6)."
      },
      {
        "l": "Substitute \\(x = -4\\) to find \\(B =\\)",
        "a": "3",
        "h": "Divide (-18) by (−6)."
      },
      {
        "l": "Evaluate the rational exponent \\(8^{2/3} =\\)",
        "a": "4",
        "h": "(cube root of 8)² = 2²."
      }
    ],
    "steps_ar": [
      {
        "l": "في المتطابقة \\(6x + 6 \\equiv A(x + 4) + B(x - 2)\\)، عوّض \\(x = 2\\) لإيجاد \\(A =\\)",
        "a": "3",
        "h": "اقسم 18 على 6."
      },
      {
        "l": "عوّض \\(x = -4\\) لإيجاد \\(B =\\)",
        "a": "3",
        "h": "اقسم -18 على (−6)."
      },
      {
        "l": "احسب قيمة الأس الكسري \\(8^{2/3} =\\)",
        "a": "4",
        "h": "(الجذر التكعيبي للعدد 8)² = 2²."
      }
    ]
  }
];
D["appc-u2b"] = [
  {
    "t": "qc",
    "ti": "Quick Check: Domain of a Shifted Logarithm (Unit 2B · Logarithmic Modeling, Semi-Log Plots, Inverse & Competing Functions)",
    "ti_ar": "فحص سريع: مجال الدالة اللوغاريتمية المزاحة (الوحدة 2B · النمذجة اللوغاريتمية والتمثيل شبه اللوغاريتمي والدوال العكسية)",
    "q": "What is the maximal real domain of \\(f(x) = \\ln(5x - 15)\\)?",
    "q_ar": "ما أوسع مجال حقيقي للدالة \\(f(x) = \\ln(5x - 15)\\)؟",
    "o": [
      "\\(x > 3\\)",
      "\\(x \\ge 3\\)",
      "\\(x > 0\\)",
      "\\(x \\neq 3\\)"
    ],
    "o_ar": [
      "\\(x > 3\\)",
      "\\(x \\ge 3\\)",
      "\\(x > 0\\)",
      "\\(x \\neq 3\\)"
    ],
    "a": 0,
    "ex": "Require strict positivity: \\(5x - 15 > 0 \\implies x > 3\\).",
    "ex_ar": "يشترط أن يكون ما داخل اللوغاريتم موجباً تماماً: \\(x > 3\\)."
  },
  {
    "t": "tf",
    "ti": "True / False: Exponential & Logarithmic Identities (Unit 2B · Logarithmic Modeling, Semi-Log Plots, Inverse & Competing Functions)",
    "ti_ar": "صح أم خطأ: متطابقات الأسس واللوغاريتمات (الوحدة 2B · النمذجة اللوغاريتمية والتمثيل شبه اللوغاريتمي والدوال العكسية)",
    "items": [
      {
        "s": "\\(\\ln(e^{5}) = 5\\).",
        "a": true,
        "ex": "\\(\\ln\\) and \\(e^x\\) are inverse functions."
      },
      {
        "s": "\\(\\ln(A + B) = \\ln A + \\ln B\\) for all \\(A, B > 0\\).",
        "a": false,
        "ex": "\\(\\ln(AB) = \\ln A + \\ln B\\); sums inside \\(\\ln\\) do NOT split."
      },
      {
        "s": "The domain of \\(f(x) = \\ln(x - 3)\\) is \\(x > 3\\).",
        "a": true,
        "ex": "Logarithm arguments must be strictly positive."
      }
    ],
    "items_ar": [
      {
        "s": "\\(\\ln(e^{5}) = 5\\).",
        "a": true,
        "ex": "اللوغاريتم الطبيعي والدالة الأسية متعاكسان."
      },
      {
        "s": "\\(\\ln(A + B) = \\ln A + \\ln B\\) لكل \\(A, B > 0\\).",
        "a": false,
        "ex": "القانون الصحيح هو \\(\\ln(AB) = \\ln A + \\ln B\\)."
      },
      {
        "s": "مجال الدالة \\(f(x) = \\ln(x - 3)\\) هو \\(x > 3\\).",
        "a": true,
        "ex": "ما بداخل اللوغاريتم يجب أن يكون موجباً تماماً."
      }
    ]
  },
  {
    "t": "mt",
    "ti": "Matching: Logarithm Laws & Asymptotes (Unit 2B · Logarithmic Modeling, Semi-Log Plots, Inverse & Competing Functions)",
    "ti_ar": "مطابقة: قوانين اللوغاريتمات وخطوط التقارب (الوحدة 2B · النمذجة اللوغاريتمية والتمثيل شبه اللوغاريتمي والدوال العكسية)",
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
        "l": "Vertical asymptote of \\(\\ln(x - 3)\\)",
        "r": "\\(x = 3\\)"
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
        "l": "خط التقارب الرأسي للدالة \\(\\ln(x - 3)\\)",
        "r": "\\(x = 3\\)"
      }
    ]
  },
  {
    "t": "num",
    "ti": "Numeric Entry: Exact Logarithmic Solution (Unit 2B · Logarithmic Modeling, Semi-Log Plots, Inverse & Competing Functions)",
    "ti_ar": "إدخال رقمي: حل معادلة لوغاريتمية (الوحدة 2B · النمذجة اللوغاريتمية والتمثيل شبه اللوغاريتمي والدوال العكسية)",
    "q": "Solve \\(\\log_{5}(x - 3) = 2\\) for \\(x\\).",
    "q_ar": "أوجد قيمة \\(x\\) التي تحقق \\(\\log_{5}(x - 3) = 2\\).",
    "a": "28",
    "ex": "\\(x - 3 = 5^{2} = 25 \\implies x = 28\\).",
    "ex_ar": "\\(x - 3 = 5^{2} = 25 \\implies x = 28\\)."
  },
  {
    "t": "ord",
    "ti": "Order the Steps: Linearizing Power Law via Logs (Unit 2B · Logarithmic Modeling, Semi-Log Plots, Inverse & Competing Functions)",
    "ti_ar": "ترتيب الخطوات: تحويل العلاقة الأسية إلى خط مستقيم (الوحدة 2B · النمذجة اللوغاريتمية والتمثيل شبه اللوغاريتمي والدوال العكسية)",
    "prompt": "Order the steps to linearize \\(y = A x^n\\) into straight-line form \\(Y = mX + c\\):",
    "prompt_ar": "رتّب خطوات تحويل العلاقة \\(y = A x^n\\) إلى الصيغة الخطية \\(Y = mX + c\\):",
    "items": [
      "Take logarithms of both sides: \\(\\ln y = \\ln(A x^n)\\).",
      "Apply the product rule: \\(\\ln y = \\ln A + \\ln(x^n)\\).",
      "Apply the power rule: \\(\\ln y = n \\ln x + \\ln A\\).",
      "Plot \\(Y = \\ln y\\) against \\(X = \\ln x\\) to read gradient \\(n\\) and intercept \\(\\ln A\\)."
    ],
    "items_ar": [
      "أخذ اللوغاريتم الطبيعي للطرفين: \\(\\ln y = \\ln(A x^n)\\).",
      "تطبيق قاعدة الضرب: \\(\\ln y = \\ln A + \\ln(x^n)\\).",
      "تطبيق قاعدة القوة: \\(\\ln y = n \\ln x + \\ln A\\).",
      "تمثيل \\(Y = \\ln y\\) مقابل \\(X = \\ln x\\) لقراءة الميل \\(n\\) والمقطع \\(\\ln A\\)."
    ],
    "ex": "Log both sides → split product → bring power down → match linear slope & intercept.",
    "ex_ar": "أخذ اللوغاريتم ← فصل الضرب ← إنزال الأس ← مطابقة الميل والمقطع."
  },
  {
    "t": "cat",
    "ti": "Categorize: Exponential Growth vs. Exponential Decay (Unit 2B · Logarithmic Modeling, Semi-Log Plots, Inverse & Competing Functions)",
    "ti_ar": "تصنيف: النمو الأسي مقابل الاضمحلال الأسي (الوحدة 2B · النمذجة اللوغاريتمية والتمثيل شبه اللوغاريتمي والدوال العكسية)",
    "categories": [
      "Exponential Growth",
      "Exponential Decay"
    ],
    "categories_ar": [
      "نمو أسي",
      "اضمحلال أسي"
    ],
    "items": [
      {
        "s": "\\(y = 5(1.25)^t\\)",
        "cat": 0
      },
      {
        "s": "\\(y = 3 e^{0.4t}\\)",
        "cat": 0
      },
      {
        "s": "\\(y = 10(0.75)^t\\)",
        "cat": 1
      },
      {
        "s": "\\(y = 8 e^{-0.2t}\\)",
        "cat": 1
      }
    ],
    "items_ar": [
      {
        "s": "\\(y = 5(1.25)^t\\)",
        "cat": 0
      },
      {
        "s": "\\(y = 3 e^{0.4t}\\)",
        "cat": 0
      },
      {
        "s": "\\(y = 10(0.75)^t\\)",
        "cat": 1
      },
      {
        "s": "\\(y = 8 e^{-0.2t}\\)",
        "cat": 1
      }
    ],
    "ex": "Base \\(> 1\\) (or rate \\(k > 0\\)) grows; base in \\((0,1)\\) (or \\(k < 0\\)) decays.",
    "ex_ar": "الأساس الأكبر من 1 (أو الأس الموجب) يمثل نمواً، والأساس بين 0 و1 يمثل اضمحلالاً."
  },
  {
    "t": "se",
    "ti": "Spot the Error: Logarithm Law Misapplication (Unit 2B · Logarithmic Modeling, Semi-Log Plots, Inverse & Competing Functions)",
    "ti_ar": "اكتشف الخطأ: التطبيق الخاطئ لقوانين اللوغاريتمات (الوحدة 2B · النمذجة اللوغاريتمية والتمثيل شبه اللوغاريتمي والدوال العكسية)",
    "q": "A student attempts to solve \\(\\log_{5}(x) + \\log_{5}(5) = 3\\). Which step introduces an invalid rule?",
    "q_ar": "يحاول طالب حل المعادلة \\(\\log_{5}(x) + \\log_{5}(5) = 3\\). أي خطوة تتضمن قانوناً خاطئاً؟",
    "steps": [
      "Note the domain requirement \\(x > 0\\).",
      "Combine the sum of logarithms as \\(\\log_{5}(x + 5) = 3\\) instead of multiplying arguments.",
      "Exponentiate base \\(5\\) to write \\(x + 5 = 125\\).",
      "Subtract \\(5\\) to report \\(x = 120\\)."
    ],
    "steps_ar": [
      "تحديد شرط مجال اللوغاريتم \\(x > 0\\).",
      "دمج مجموع اللوغاريتمين في صورة \\(\\log_{5}(x + 5) = 3\\) بدلاً من ضرب ما بداخل اللوغاريتم.",
      "التحويل للصورة الأسية: \\(x + 5 = 125\\).",
      "طرح \\(5\\) للوصول إلى الناتج."
    ],
    "errorStep": 2,
    "reasons": [
      "The product rule states \\(\\log_b(M) + \\log_b(N) = \\log_b(MN)\\), NOT \\(\\log_b(M + N)\\); thus \\(\\log_{5}(5x) = 3 \\implies x = 25\\).",
      "The domain of \\(\\log(x)\\) is all real numbers.",
      "\\(\\log_{5}(5) = 0\\)."
    ],
    "reasons_ar": [
      "قاعدة الضرب تنص على أن \\(\\log_b(M) + \\log_b(N) = \\log_b(MN)\\) وليس جمع المداخل؛ ومنه \\(x = 25\\).",
      "مجال الدالة اللوغاريتمية هو جميع الأعداد الحقيقية.",
      "قيمة \\(\\log_{5}(5) = 0\\)."
    ],
    "correctReason": 0
  },
  {
    "t": "ms",
    "ti": "Examiner Mode: Logarithmic Equation & Continuous Growth (Unit 2B · Logarithmic Modeling, Semi-Log Plots, Inverse & Competing Functions)",
    "ti_ar": "وضع المصحح: المعادلات اللوغاريتمية والنمو الأسي (الوحدة 2B · النمذجة اللوغاريتمية والتمثيل شبه اللوغاريتمي والدوال العكسية)",
    "q": "(a) Solve \\(\\log_{5}(x - 3) = 2\\), stating the domain restriction. (b) A culture grows via \\(P(t) = P_0 e^{rt}\\); find the exact doubling time \\(T_d\\) in terms of \\(r\\).",
    "q_ar": "(أ) حل المعادلة \\(\\log_{5}(x - 3) = 2\\) مع ذكر شرط المجال. (ب) تنمو عينة وفق \\(P(t) = P_0 e^{rt}\\)؛ أوجد زمن التضاعف \\(T_d\\) بدلالة \\(r\\).",
    "parts": [
      {
        "label": "Part (a) — Domain & Exponential Conversion",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "Domain \\(x > 3\\); convert to \\(x - 3 = 5^{2} = 25\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "\\(x = 28\\) (valid since \\(28 > 3\\))."
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
            "text": "المجال \\(x > 3\\)؛ والتحويل يعطي \\(x - 3 = 5^{2} = 25\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "\\(x = 28\\) (يحقق شرط المجال)."
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
    "ti": "Step Builder: Solving Logarithmic Equations (Unit 2B · Logarithmic Modeling, Semi-Log Plots, Inverse & Competing Functions)",
    "ti_ar": "بناء الخطوات: حل المعادلة اللوغاريتمية (الوحدة 2B · النمذجة اللوغاريتمية والتمثيل شبه اللوغاريتمي والدوال العكسية)",
    "steps": [
      {
        "l": "Evaluate \\(5^{2} =\\)",
        "a": "25",
        "h": "Multiply 5 by itself 2 times."
      },
      {
        "l": "Solve \\(\\log_{5}(x - 3) = 2\\) for \\(x =\\)",
        "a": "28",
        "h": "Add 3 to 25."
      },
      {
        "l": "Evaluate \\(\\log_{5}(1) =\\)",
        "a": "0",
        "h": "Any base raised to 0 equals 1."
      }
    ],
    "steps_ar": [
      {
        "l": "احسب \\(5^{2} =\\)",
        "a": "25",
        "h": "اضرب 5 في نفسه 2 مرات."
      },
      {
        "l": "حل المعادلة \\(\\log_{5}(x - 3) = 2\\) لإيجاد \\(x =\\)",
        "a": "28",
        "h": "اجمع 3 مع 25."
      },
      {
        "l": "احسب قيمة \\(\\log_{5}(1) =\\)",
        "a": "0",
        "h": "أي أساس مرفوع للأس صفر يساوي 1."
      }
    ]
  }
];
D["appc-u3b"] = [
  {
    "t": "qc",
    "ti": "Quick Check: Polar Conics & Sinusoidal Phase Shift",
    "ti_ar": "فحص سريع: القطوع القطبية وإزاحة الطور الجيبية",
    "q": "For the sinusoidal model \\(f(t) = 4\\sin\\!\\big(2t - \\tfrac{\\pi}{3}\\big) + 5\\), what are its period and horizontal phase shift?",
    "q_ar": "للنموذج الجيبي \\(f(t) = 4\\sin\\!\\big(2t - \\tfrac{\\pi}{3}\\big) + 5\\)، ما طول دورته ومقدار إزاحة الطور الأفقية؟",
    "o": [
      "Period \\(\\pi\\), phase shift \\(\\dfrac{\\pi}{6}\\) to the right",
      "Period \\(2\\pi\\), phase shift \\(\\dfrac{\\pi}{3}\\) to the right",
      "Period \\(\\pi\\), phase shift \\(\\dfrac{\\pi}{3}\\) to the left",
      "Period \\(4\\pi\\), phase shift \\(\\dfrac{\\pi}{6}\\) to the left"
    ],
    "o_ar": [
      "الدورة \\(\\pi\\)، وإزاحة الطور \\(\\dfrac{\\pi}{6}\\) لليمين",
      "الدورة \\(2\\pi\\)، وإزاحة الطور \\(\\dfrac{\\pi}{3}\\) لليمين",
      "الدورة \\(\\pi\\)، وإزاحة الطور \\(\\dfrac{\\pi}{3}\\) لليسار",
      "الدورة \\(4\\pi\\)، وإزاحة الطور \\(\\dfrac{\\pi}{6}\\) لليسار"
    ],
    "a": 0,
    "ex": "Factor \\(2t - \\frac{\\pi}{3} = 2\\big(t - \\frac{\\pi}{6}\\big)\\): period \\(T = \\frac{2\\pi}{2} = \\pi\\) and phase shift is \\(+\\frac{\\pi}{6}\\) (right).",
    "ex_ar": "بإخراج العامل المشترك \\(2\\big(t - \\frac{\\pi}{6}\\big)\\) تكون الدورة \\(T = \\frac{2\\pi}{2} = \\pi\\) وإزاحة الطور \\(\\frac{\\pi}{6}\\) لليمين."
  },
  {
    "t": "tf",
    "ti": "True / False: Inverse Trig Domains & Polar Conics",
    "ti_ar": "صح أم خطأ: نطاقات الدوال المثلثية العكسية والقطوع القطبية",
    "items": [
      {
        "s": "The principal range of \\(y = \\arccos(x)\\) is \\([0, \\pi]\\), whereas the range of \\(y = \\arcsin(x)\\) is \\([-\\frac{\\pi}{2}, \\frac{\\pi}{2}]\\).",
        "s_ar": "المدى الرئيسي للدالة \\(y = \\arccos(x)\\) هو \\([0, \\pi]\\)، بينما مدى \\(y = \\arcsin(x)\\) هو \\([-\\frac{\\pi}{2}, \\frac{\\pi}{2}]\\).",
        "a": true,
        "ex": "Restricting cosine to \\([0, \\pi]\\) and sine to \\([-\\pi/2, \\pi/2]\\) makes each one-to-one across \\([-1, 1]\\).",
        "ex_ar": "تقييد جيب التمام على \\([0, \\pi]\\) والجيب على \\([-\\pi/2, \\pi/2]\\) يجعل كل دالة متباينة وتغطي \\([-1, 1]\\)."
      },
      {
        "s": "The function \\(y = \\tan(2x)\\) has period \\(\\pi\\) because \\(\\tan(x)\\) has base period \\(2\\pi\\).",
        "s_ar": "للدالة \\(y = \\tan(2x)\\) دورة طولها \\(\\pi\\) لأن دورة الظل الأساسية \\(2\\pi\\).",
        "a": false,
        "ex": "Tangent has base period \\(\\pi\\), so \\(\\tan(2x)\\) has period \\(\\pi / 2\\).",
        "ex_ar": "الدورة الأساسية لدالة الظل هي \\(\\pi\\)، لذا فإن دورة \\(\\tan(2x)\\) هي \\(\\pi / 2\\)."
      },
      {
        "s": "A polar conic \\(r = \\dfrac{ep}{1 + e\\cos\\theta}\\) represents an ellipse when \\(0 < e < 1\\) and a hyperbola when \\(e > 1\\).",
        "s_ar": "تمثل المعادلة القطبية \\(r = \\dfrac{ep}{1 + e\\cos\\theta}\\) قطعاً ناقصاً عندما \\(0 < e < 1\\) وقطعاً زائداً عندما \\(e > 1\\).",
        "a": true,
        "ex": "Eccentricity \\(e\\) classifies all non-degenerate conics: \\(0 < e < 1\\) ellipse, \\(e = 1\\) parabola, \\(e > 1\\) hyperbola.",
        "ex_ar": "يصنف الاختلاف المركزي \\(e\\) القطوع المخروطية: \\(0 < e < 1\\) ناقص، \\(e = 1\\) مكافئ، \\(e > 1\\) زائد."
      }
    ]
  },
  {
    "t": "mt",
    "ti": "Matching: Polar Coordinates & Trigonometric Identities",
    "ti_ar": "مطابقة: الإحداثيات القطبية والمتطابقات المثلثية",
    "p": [
      {
        "l": "Polar-to-rectangular coordinates",
        "r": "\\(x = r\\cos\\theta,\\; y = r\\sin\\theta\\)"
      },
      {
        "l": "Polar circle symmetric about the polar axis",
        "r": "\\(r = 2a\\cos\\theta\\)"
      },
      {
        "l": "Sinusoidal period of \\(y = A\\sin(Bx - C) + D\\)",
        "r": "\\(T = \\dfrac{2\\pi}{|B|}\\)"
      },
      {
        "l": "Double-angle identity for \\(\\cos(2\\theta)\\)",
        "r": "\\(\\cos^2\\theta - \\sin^2\\theta = 1 - 2\\sin^2\\theta\\)"
      }
    ],
    "p_ar": [
      {
        "l": "التحويل من القطبي إلى الديكارتي",
        "r": "\\(x = r\\cos\\theta,\\; y = r\\sin\\theta\\)"
      },
      {
        "l": "دائرة قطبية متماثلة حول المحور القطبي",
        "r": "\\(r = 2a\\cos\\theta\\)"
      },
      {
        "l": "طول الدورة للدالة \\(y = A\\sin(Bx - C) + D\\)",
        "r": "\\(T = \\dfrac{2\\pi}{|B|}\\)"
      },
      {
        "l": "متطابقة ضعف الزاوية \\(\\cos(2\\theta)\\)",
        "r": "\\(\\cos^2\\theta - \\sin^2\\theta = 1 - 2\\sin^2\\theta\\)"
      }
    ]
  },
  {
    "t": "num",
    "ti": "Numeric Entry: Polar-to-Cartesian x-Coordinate (Unit 3B · Sinusoidal Regression, Inverse Trig, Tangent & Polar Conics)",
    "ti_ar": "إدخال رقمي: الإحداثي السيني لنقطة قطبية (الوحدة 3B · الانحدار الجيبي والدوال المثلثية العكسية والدوال القطبية)",
    "q": "Find the Cartesian \\(x\\)-coordinate of the polar point \\((r, \\theta) = (8, \\frac{\\pi}{3})\\).",
    "q_ar": "أوجد الإحداثي السيني \\(x\\) للنقطة القطبية \\((r, \\theta) = (8, \\frac{\\pi}{3})\\).",
    "a": "4",
    "ex": "\\(x = r\\cos(\\pi/3) = 8 \\cdot \\frac{1}{2} = 4\\).",
    "ex_ar": "\\(x = r\\cos(\\pi/3) = 8 \\cdot \\frac{1}{2} = 4\\)."
  },
  {
    "t": "ord",
    "ti": "Order the Steps: Setting Up Polar Petal Area (Unit 3B · Sinusoidal Regression, Inverse Trig, Tangent & Polar Conics)",
    "ti_ar": "ترتيب الخطوات: إعداد تكامل مساحة بتلة قطبية (الوحدة 3B · الانحدار الجيبي والدوال المثلثية العكسية والدوال القطبية)",
    "prompt": "Order the steps to find the area of one petal of \\(r = 5\\cos(3\\theta)\\):",
    "prompt_ar": "رتّب خطوات إيجاد مساحة بتلة واحدة للمنحنى القطبي \\(r = 5\\cos(3\\theta)\\):",
    "items": [
      "Solve \\(r = 0 \\implies \\cos(3\\theta) = 0\\) to find adjacent pole tangents \\(\\theta = -\\frac{\\pi}{6}, \\frac{\\pi}{6}\\).",
      "Set up the polar area integral \\(A = \\frac{1}{2}\\int_{-\\pi/6}^{\\pi/6} (5\\cos 3\\theta)^2\\,d\\theta\\).",
      "Apply the half-angle identity \\(\\cos^2(3\\theta) = \\frac{1 + \\cos 6\\theta}{2}\\).",
      "Integrate and evaluate at the bounds to obtain \\(A = \\frac{25\\pi}{12}\\)."
    ],
    "items_ar": [
      "حل \\(r = 0 \\implies \\cos(3\\theta) = 0\\) لتحديد حدي البتلة \\(\\theta = -\\frac{\\pi}{6}, \\frac{\\pi}{6}\\).",
      "كتابة تكامل المساحة القطبية \\(A = \\frac{1}{2}\\int_{-\\pi/6}^{\\pi/6} (5\\cos 3\\theta)^2\\,d\\theta\\).",
      "تطبيق متطابقة خفض القوة \\(\\cos^2(3\\theta) = \\frac{1 + \\cos 6\\theta}{2}\\).",
      "إجراء التكامل والتعويض بالحدين للحصول على \\(A = \\frac{25\\pi}{12}\\)."
    ],
    "ex": "Pole bounds → \\(\\frac{1}{2}\\int r^2 d\\theta\\) → power-reduction identity → evaluate.",
    "ex_ar": "حدود القطب ← صيغة المساحة القطبية ← متطابقة ضعف الزاوية ← التعويض."
  },
  {
    "t": "cat",
    "ti": "Categorize: Polar Curve Families (Unit 3B · Sinusoidal Regression, Inverse Trig, Tangent & Polar Conics)",
    "ti_ar": "تصنيف: عائلات المنحنيات القطبية (الوحدة 3B · الانحدار الجيبي والدوال المثلثية العكسية والدوال القطبية)",
    "categories": [
      "Circle Through Origin",
      "Rose Curve",
      "Cardioid"
    ],
    "categories_ar": [
      "دائرة تمر بنقطة الأصل",
      "وردة قطبية",
      "منحنى قلبي (Cardioid)"
    ],
    "items": [
      {
        "s": "\\(r = 8\\sin\\theta\\)",
        "cat": 0
      },
      {
        "s": "\\(r = 5\\cos(3\\theta)\\)",
        "cat": 1
      },
      {
        "s": "\\(r = 5(1 + \\cos\\theta)\\)",
        "cat": 2
      }
    ],
    "items_ar": [
      {
        "s": "\\(r = 8\\sin\\theta\\)",
        "cat": 0
      },
      {
        "s": "\\(r = 5\\cos(3\\theta)\\)",
        "cat": 1
      },
      {
        "s": "\\(r = 5(1 + \\cos\\theta)\\)",
        "cat": 2
      }
    ],
    "ex": "\\(a\\sin\\theta\\) is a circle, \\(a\\cos(k\\theta)\\) (\\(k \\ge 2\\)) is a rose, and \\(a(1 \\pm \\cos\\theta)\\) is a cardioid.",
    "ex_ar": "\\(a\\sin\\theta\\) دائرة، و\\(a\\cos(k\\theta)\\) وردة قطبية، و\\(a(1 \\pm \\cos\\theta)\\) منحنى قلبي."
  },
  {
    "t": "se",
    "ti": "Spot the Error: Polar-to-Rectangular Conversion & Quadrant Angle",
    "ti_ar": "اكتشف الخطأ: التحويل من الإحداثيات القطبية إلى الديكارتية وزاوية الربع",
    "q": "A student converts the rectangular point \\((-3, 3)\\) (Quadrant II) into polar coordinates \\((r, \\theta)\\) with \\(r > 0\\) and \\(0 \\le \\theta < 2\\pi\\). Which step is invalid?",
    "q_ar": "يحوّل طالب النقطة الديكارتية \\((-3, 3)\\) (الربع الثاني) إلى إحداثيات قطبية \\((r, \\theta)\\) مع \\(r > 0\\) و\\(0 \\le \\theta < 2\\pi\\). أي خطوة غير صحيحة؟",
    "steps": [
      "Compute the radial distance \\(r = \\sqrt{(-3)^2 + 3^2} = \\sqrt{18} = 3\\sqrt{2}\\).",
      "Compute \\(\\tan\\theta = \\dfrac{y}{x} = \\dfrac{3}{-3} = -1\\).",
      "Conclude directly from \\(\\arctan(-1)\\) that \\(\\theta = -\\dfrac{\\pi}{4}\\), which is coterminal with \\(\\dfrac{7\\pi}{4}\\).",
      "Write the polar coordinates as \\(\\left(3\\sqrt{2}, \\dfrac{7\\pi}{4}\\right)\\)."
    ],
    "steps_ar": [
      "حساب البعد القطبي \\(r = \\sqrt{(-3)^2 + 3^2} = 3\\sqrt{2}\\).",
      "حساب \\(\\tan\\theta = \\dfrac{y}{x} = \\dfrac{3}{-3} = -1\\).",
      "الاستنتاج مباشرة من \\(\\arctan(-1)\\) أن \\(\\theta = -\\dfrac{\\pi}{4}\\) المكافئة لـ \\(\\dfrac{7\\pi}{4}\\).",
      "كتابة الإحداثيات القطبية \\(\\left(3\\sqrt{2}, \\dfrac{7\\pi}{4}\\right)\\)."
    ],
    "errorStep": 3,
    "reasons": [
      "Since \\(x = -3 < 0\\) and \\(y = 3 > 0\\), the point lies in Quadrant II, so \\(\\theta = \\pi + \\arctan(-1) = \\dfrac{3\\pi}{4}\\), not \\(\\dfrac{7\\pi}{4}\\) (Quadrant IV).",
      "The radius \\(r\\) should be negative whenever \\(x < 0\\).",
      "\\(\\tan\\theta\\) is defined as \\(x / y\\) rather than \\(y / x\\)."
    ],
    "reasons_ar": [
      "بما أن \\(x < 0\\) و\\(y > 0\\) تقع النقطة في الربع الثاني، لذا \\(\\theta = \\pi - \\dfrac{\\pi}{4} = \\dfrac{3\\pi}{4}\\) وليس \\(\\dfrac{7\\pi}{4}\\).",
      "يجب أن يكون نصف القطر \\(r\\) سالباً دائماً عندما تكون \\(x < 0\\).",
      "تعريف \\(\\tan\\theta\\) هو \\(x / y\\) وليس \\(y / x\\)."
    ],
    "correctReason": 0
  },
  {
    "t": "ms",
    "ti": "Examiner Mode: Parametric Slope & Polar Conversion (Unit 3B · Sinusoidal Regression, Inverse Trig, Tangent & Polar Conics)",
    "ti_ar": "وضع المصحح: ميل المنحنى البارامتري والتحويل القطبي (الوحدة 3B · الانحدار الجيبي والدوال المثلثية العكسية والدوال القطبية)",
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
    "ti": "Step Builder: Polar Coordinates & Parametric Speed (Unit 3B · Sinusoidal Regression, Inverse Trig, Tangent & Polar Conics)",
    "ti_ar": "بناء الخطوات: الإحداثيات القطبية والسرعة البارامترية (الوحدة 3B · الانحدار الجيبي والدوال المثلثية العكسية والدوال القطبية)",
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
  }
];
});
