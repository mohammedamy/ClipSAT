/* Interactive Practice data for /est2l2/ - one entry per chapter section id.
   Shipped as public/js/ix/est2l2.js and loaded only on that track's page by the
   engine in src/scripts/modules/19-interactive-activities-engine-v1.js
   (Plan 5 Phase 5.015, ADR 0033). Entry shapes (qc/mt/tf/sb/sr/fn/num/ord/cat/gp/se/ms) are
   documented there. */
(window.__ixData = window.__ixData || []).push(function (D) {
D["est2l2-about"] = [
  {
    "t": "qc",
    "ti": "Math Lab: EST II Level 2 Structure & Timing",
    "ti_ar": "مختبر الرياضيات: هيكل وتوقيت اختبار EST II المستوى 2",
    "q": "The EST II Math Level 2 exam contains 50 questions in 60 minutes. What pacing is required to finish on time with a 5-minute review buffer?",
    "q_ar": "يتكون اختبار EST II Math Level 2 من 50 سؤالاً في 60 دقيقة. ما هي الوتيرة الزمنية المطلوبة لإتمام الحل مع الاحتفاظ بـ 5 دقائق للمراجعة؟",
    "o": [
      "66 seconds per question",
      "72 seconds per question",
      "90 seconds per question",
      "48 seconds per question"
    ],
    "o_ar": [
      "66 ثانية لكل سؤال",
      "72 ثانية لكل سؤال",
      "90 ثانية لكل سؤال",
      "48 ثانية لكل سؤال"
    ],
    "a": 0,
    "ex": "\\(55\\text{ minutes} \\times 60\\text{ seconds} / 50\\text{ questions} = 66\\text{ seconds/question}\\). Keep an eye on the clock every 10 questions (11 minutes per block).",
    "ex_ar": "\\(55\\text{ دقيقة} \\times 60\\text{ ثانية} \\div 50\\text{ سؤالاً} = 66\\text{ ثانية/سؤال}\\). راقب الساعة كل 10 أسئلة (11 دقيقة لكل مجموعة أسئلة)."
  },
  {
    "t": "tf",
    "ti": "Reasoning Lab: EST II Exam Rules & Calculator Usage",
    "ti_ar": "مختبر التفكير المنطقي: قواعد اختبار EST II واستخدام الحاسبة",
    "items": [
      {
        "s": "A scientific calculator is allowed for the full duration of EST II Math.",
        "s_ar": "يُسمح بالآلة الحاسبة العلمية طوال مدة اختبار EST II للرياضيات بأكملها.",
        "a": true,
        "ex": "Scientific calculators meeting exam criteria are permitted on all questions.",
        "ex_ar": "الآلات الحاسبة العلمية التي تطابق معايير الاختبار مسموح بها في كافة الأسئلة."
      },
      {
        "s": "Wrong answers deduct 0.25 points from your raw score.",
        "s_ar": "تخصم الإجابات الخاطئة 0.25 نقطة من درجتك الخام.",
        "a": false,
        "ex": "EST II uses raw scoring with no negative guessing penalty.",
        "ex_ar": "يستخدم EST II الدرجات الخام دون أي خصم درجات على التخمين الخاطئ."
      },
      {
        "s": "EST II Math Level 2 includes differential calculus and combinatorics.",
        "s_ar": "يتضمن اختبار EST II Math Level 2 التفاضل والتوافيق والتباديل.",
        "a": true,
        "ex": "Level 2 adds introductory derivatives, tangents, combinatorics, and complex numbers.",
        "ex_ar": "يضيف المستوى 2 مبادئ المشتقات، ومعادلات المماس، والتوافيق والتباديل، والأعداد المركبة."
      }
    ]
  },
  {
    "t": "num",
    "ti": "Pacing Check: Average Seconds Per Problem",
    "ti_ar": "فحص الوتيرة: متوسط الثواني لكل مسألة",
    "q": "On the EST II Math Level 2 exam (50 questions in 60 minutes), how many total seconds are allocated per question on average?",
    "q_ar": "في اختبار EST II Math Level 2 (المكون من 50 سؤالاً في 60 دقيقة)، كم ثانية تخصص في المتوسط لكل سؤال؟",
    "a": 72,
    "tol": 0.01,
    "unit": "seconds",
    "h": "Multiply 60 minutes by 60 seconds, then divide by 50 questions.",
    "h_ar": "اضرب 60 دقيقة في 60 ثانية، ثم اقسم على 50 سؤالاً.",
    "sol": "\\(\\dfrac{60 \\times 60}{50} = \\dfrac{3600}{50} = 72\\text{ seconds/question}\\).",
    "sol_ar": "\\(\\dfrac{60 \\times 60}{50} = \\dfrac{3600}{50} = 72\\text{ ثانية/سؤال}\\)."
  },
  {
    "t": "ord",
    "ti": "Exam Protocol: Timed Section Strategy",
    "ti_ar": "بروتوكول الاختبار: استراتيجية إدارة وقت القسم",
    "q": "Arrange the steps for managing a 50-question EST II Math section:",
    "q_ar": "رتب خطوات إدارة قسم الرياضيات في اختبار EST II المكون من 50 سؤالاً:",
    "items": [
      "Scan the section and solve rapid, recognizable questions first.",
      "Maintain an active pacing checkpoint at 25 questions (30 minutes remaining).",
      "Flag high-algebra problems with potential extraneous roots for second pass.",
      "Return to flagged questions and eliminate distractors.",
      "Verify that all 50 answer bubbles are filled before time expires."
    ],
    "items_ar": [
      "مسح القسم وحل الأسئلة السريعة المألوفة أولاً.",
      "الحفاظ على وتيرة زمنية واضحة عند السؤال 25 (30 دقيقة متبقية).",
      "تأشير مسائل الجبر المتقدم التي قد تتضمن حلولاً دخيلة للجولة الثانية.",
      "العودة للأسئلة المؤشرة واستبعاد الخيارات الخاطئة بتركيز.",
      "التأكد من تظليل جميع الدوائر الخمسين بالكامل قبل انتهاء الوقت."
    ]
  },
  {
    "t": "cat",
    "ti": "Classify EST II Topics by Domain",
    "ti_ar": "تصنيف موضوعات EST II حسب المجال الرياضي",
    "categories": [
      "Advanced Algebra",
      "Calculus & Probability"
    ],
    "categories_ar": [
      "الجبر المتقدم",
      "التفاضل والاحتمالات"
    ],
    "items": [
      {
        "s": "Matrix inversion and determinant tests",
        "s_ar": "معكوس المصفوفات واختبارات المحددات",
        "cat": 0
      },
      {
        "s": "Tangent line slope from the derivative",
        "s_ar": "ميل خط المماس باستخدام المشتقة الأولى",
        "cat": 1
      },
      {
        "s": "Geometric series infinite sum convergence",
        "s_ar": "تقارب مجموع المتسلسلة الهندسية اللانهائية",
        "cat": 0
      },
      {
        "s": "Combinations and permutations of sets",
        "s_ar": "التوافيق والتباديل للمجموعات",
        "cat": 1
      },
      {
        "s": "Complex roots and imaginary conjugates",
        "s_ar": "الجذور المركبة والمرافقات التخيلية",
        "cat": 0
      },
      {
        "s": "Evaluating limits of indeterminate forms (0/0)",
        "s_ar": "حساب النهايات للصيغ غير المعينة (0/0)",
        "cat": 1
      }
    ]
  },
  {
    "t": "se",
    "ti": "Spot the Error: Exam Pacing & Time Allocation (Test format & strategy)",
    "ti_ar": "اكتشف الخطأ: إدارة الوقت وتوزيع الدرجات (نظام اختبار EST II الرياضيات ٢ واستراتيجية الحل)",
    "q": "A student plans their timing for a 30-question, 45-minute section in EST2L2. Which step in their strategy introduces a flaw?",
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
    "ti_ar": "وضع المصحح: خطة إدارة الوقت والدرجة المستهدفة (نظام اختبار EST II الرياضيات ٢ واستراتيجية الحل)",
    "q": "A practice section has \\(30\\) equal-weight questions in \\(45\\) minutes with no penalty for wrong guesses. A student answers \\(27\\) correctly on Pass 1–2. (a) Find the exact seconds-per-question budget and accuracy percentage. (b) State the optimal triage rule for the remaining \\(3\\) flagged questions.",
    "q_ar": "يتكون قسم تدريبي من \\(30\\) سؤالاً متساوية الوزن في \\(45\\) دقيقة دون خصم على الإجابات الخاطئة. أجاب طالب عن \\(27\\) سؤالاً بشكل صحيح. (أ) أوجد الزمن المخصص لكل سؤال بالثواني ونسبة الدقة المئوية. (ب) اذكر قاعدة الفرز المثلى للأسئلة المتبقية وعددها \\(3\\).",
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
            "text": "Raw score percentage: \\(\\frac{27}{30} \\times 100\\% \\approx 90\\%\\)."
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
            "text": "الزمن لكل سؤال: \\(\\frac{2700}{30} = 90\\) ثانية."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "النسبة المئوية للدرجة الخام: \\(\\frac{27}{30} \\times 100\\% \\approx 90\\%\\)."
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
    "ti": "Step Builder: Exam Time & Score Budget (Test format & strategy)",
    "ti_ar": "بناء الخطوات: حساب ميزانية الوقت والدرجة (نظام اختبار EST II الرياضيات ٢ واستراتيجية الحل)",
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
        "l": "If you answer \\(27\\) out of \\(30\\) correctly, how many items remain for review?",
        "a": "3",
        "h": "Subtract 27 from 30."
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
        "l": "إذا حللت \\(27\\) من أصل \\(30\\)، فكم سؤالاً يتبقى للمراجعة؟",
        "a": "3",
        "h": "اطرح 27 من 30."
      }
    ]
  },
  {
    "t": "mt",
    "ti": "Matching: High-Yield Exam Tactics (Test format & strategy)",
    "ti_ar": "مطابقة: تكتيكات الحل السريع والتحقق (نظام اختبار EST II الرياضيات ٢ واستراتيجية الحل)",
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
D["est2l2-complex"] = [
  {
    "t": "sb",
    "ti": "Lab Step Builder: Powers of i and Complex Arithmetic",
    "ti_ar": "بناء الخطوات: قوى i وعمليات الأعداد المركبة",
    "steps": [
      {
        "l": "Evaluate \\(i^{27}\\). Divide 27 by 4: remainder is:",
        "l_ar": "احسب قيمة \\(i^{27}\\). اقسم 27 على 4: الباقي هو:",
        "a": "3",
        "h": "\\(27 = 4 \\times 6 + 3\\)",
        "h_ar": "\\(27 = 4 \\times 6 + 3\\)"
      },
      {
        "l": "Therefore \\(i^{27} = i^3 =\\)",
        "l_ar": "بناء على ذلك \\(i^{27} = i^3 =\\)",
        "a": "-i",
        "h": "\\(i^3 = -i\\)",
        "h_ar": "\\(i^3 = -i\\)"
      },
      {
        "l": "Compute the modulus of \\(z = 6 - 8i\\): \\(|z| =\\)",
        "l_ar": "احسب مقياس \\(z = 6 - 8i\\): \\(|z| =\\)",
        "a": "10",
        "h": "\\(\\sqrt{6^2 + (-8)^2} = \\sqrt{36+64} = 10\\)",
        "h_ar": "\\(\\sqrt{6^2 + (-8)^2} = \\sqrt{36+64} = 10\\)"
      }
    ]
  },
  {
    "t": "qc",
    "ti": "Lab Check: Complex Conjugates & Division",
    "ti_ar": "فحص سريع: مرافق العدد المركب والقسمة",
    "q": "Simplify \\(\\dfrac{5+i}{2-i}\\) by multiplying numerator and denominator by the conjugate:",
    "q_ar": "بسط المقدار \\(\\dfrac{5+i}{2-i}\\) بضرب البسط والمقام في مرافق المقام:",
    "o": [
      "\\(\\frac{9}{5} + \\frac{7}{5}i\\)",
      "\\(\\frac{9}{5} - \\frac{7}{5}i\\)",
      "\\(\\frac{11}{3} + \\frac{7}{3}i\\)",
      "\\(3 + 2i\\)"
    ],
    "o_ar": [
      "\\(\\frac{9}{5} + \\frac{7}{5}i\\)",
      "\\(\\frac{9}{5} - \\frac{7}{5}i\\)",
      "\\(\\frac{11}{3} + \\frac{7}{3}i\\)",
      "\\(3 + 2i\\)"
    ],
    "a": 0,
    "ex": "\\(\\dfrac{(5+i)(2+i)}{(2-i)(2+i)} = \\dfrac{10 + 5i + 2i - 1}{4 + 1} = \\dfrac{9 + 7i}{5} = \\dfrac{9}{5} + \\dfrac{7}{5}i\\).",
    "ex_ar": "\\(\\dfrac{(5+i)(2+i)}{(2-i)(2+i)} = \\dfrac{10 + 5i + 2i - 1}{4 + 1} = \\dfrac{9 + 7i}{5} = \\dfrac{9}{5} + \\dfrac{7}{5}i\\)."
  },
  {
    "t": "num",
    "ti": "Numeric Lab: Modulus of Complex Conjugate",
    "ti_ar": "إدخال رقمي: مقياس العدد المركب",
    "q": "Compute the modulus \\(|z|\\) of the complex number \\(z = -5 + 12i\\).",
    "q_ar": "احسب مقياس \\(|z|\\) للعدد المركب \\(z = -5 + 12i\\).",
    "a": 13,
    "tol": 0.01,
    "h": "\\(|z| = \\sqrt{a^2 + b^2} = \\sqrt{(-5)^2 + 12^2}\\).",
    "h_ar": "\\(|z| = \\sqrt{a^2 + b^2} = \\sqrt{(-5)^2 + 12^2}\\).",
    "sol": "\\(|z| = \\sqrt{25 + 144} = \\sqrt{169} = 13\\).",
    "sol_ar": "\\(|z| = \\sqrt{25 + 144} = \\sqrt{169} = 13\\)."
  },
  {
    "t": "ord",
    "ti": "Quadratic Formula: Solving Negative Discriminants",
    "ti_ar": "رتّب الخطوات: حل المعادلات ذات المميز السالب بالأعداد المركبة",
    "q": "Arrange the steps to solve \\(x^2 - 6x + 25 = 0\\) for complex roots:",
    "q_ar": "رتب خطوات حل المعادلة \\(x^2 - 6x + 25 = 0\\) لإيجاد الجذور المركبة:",
    "items": [
      "Identify coefficients: \\(a = 1, b = -6, c = 25\\).",
      "Compute discriminant: \\(\\Delta = (-6)^2 - 4(1)(25) = 36 - 100 = -64\\).",
      "Rewrite square root using imaginary unit: \\(\\sqrt{-64} = 8i\\).",
      "Apply quadratic formula: \\(x = \\frac{6 \\pm 8i}{2}\\).",
      "Simplify to standard form: \\(x = 3 \\pm 4i\\)."
    ],
    "items_ar": [
      "تحديد المعاملات: \\(a = 1, b = -6, c = 25\\).",
      "حساب المميز: \\(\\Delta = (-6)^2 - 4(1)(25) = 36 - 100 = -64\\).",
      "إعادة كتابة الجذر التربيعي باستخدام الوحدة التخيلية: \\(\\sqrt{-64} = 8i\\).",
      "تطبيق القانون العام: \\(x = \\frac{6 \\pm 8i}{2}\\).",
      "التبسيط إلى الصورة القياسية: \\(x = 3 \\pm 4i\\)."
    ]
  },
  {
    "t": "cat",
    "ti": "Evaluate Powers of i",
    "ti_ar": "تصنيف: حساب قيم قوى i",
    "categories": [
      "Value is 1",
      "Value is -1",
      "Value is i",
      "Value is -i"
    ],
    "categories_ar": [
      "القيمة هي 1",
      "القيمة هي -1",
      "القيمة هي i",
      "القيمة هي -i"
    ],
    "items": [
      {
        "s": "\\(i^{16}\\)",
        "s_ar": "\\(i^{16}\\)",
        "cat": 0
      },
      {
        "s": "\\(i^{18}\\)",
        "s_ar": "\\(i^{18}\\)",
        "cat": 1
      },
      {
        "s": "\\(i^{21}\\)",
        "s_ar": "\\(i^{21}\\)",
        "cat": 2
      },
      {
        "s": "\\(i^{35}\\)",
        "s_ar": "\\(i^{35}\\)",
        "cat": 3
      },
      {
        "s": "\\(i^{100}\\)",
        "s_ar": "\\(i^{100}\\)",
        "cat": 0
      },
      {
        "s": "\\(i^{50}\\)",
        "s_ar": "\\(i^{50}\\)",
        "cat": 1
      }
    ]
  },
  {
    "t": "se",
    "ti": "Spot the Error: Complex Conjugate Division & \\(i^2\\) Sign (Complex Numbers)",
    "ti_ar": "اكتشف الخطأ: قسمة الأعداد المركبة وإشارة \\(i^2\\) (الأعداد المركبة والصورة القطبية)",
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
    "ti": "Examiner Mode: Modulus, Conjugate Division & De Moivre (Complex Numbers)",
    "ti_ar": "وضع المصحح: المقياس والمرافق ومبرهنة دي موافر (الأعداد المركبة والصورة القطبية)",
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
    "t": "mt",
    "ti": "Matching: Argand Loci & Complex Identities (Complex Numbers)",
    "ti_ar": "مطابقة: المحال الهندسية في مستوى أرجاند والأعداد المركبة (الأعداد المركبة والصورة القطبية)",
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
  },
  {
    "t": "qc",
    "ti": "Quick Check: Argand Loci & Complex Identities (Complex Numbers)",
    "ti_ar": "فحص سريع: المحال الهندسية في مستوى أرجاند والأعداد المركبة (الأعداد المركبة والصورة القطبية)",
    "q": "Which expression or condition accurately characterizes \\(z \\bar{z}\\) for \\(z = 3 + 4i\\)?",
    "q_ar": "أي عبارة أو شرط يصف بدقة: \\(z \\bar{z}\\) للعدد \\(z = 3 + 4i\\)؟",
    "o": [
      "\\(|z|^2 = 25\\)",
      "Circle centered at \\(z_0\\) with radius \\(R\\)",
      "Perpendicular bisector of segment \\(z_1 z_2\\)",
      "Counterclockwise rotation by \\(90^\\circ\\) (\\(\\pi/2\\) rad)"
    ],
    "o_ar": [
      "\\(|z|^2 = 25\\)",
      "دائرة مركزها \\(z_0\\) ونصف قطرها \\(R\\)",
      "العمود المنصّف للقطعة الواصلة بين \\(z_1\\) و\\(z_2\\)",
      "دوران عكس عقارب الساعة بزاوية \\(90^\\circ\\)"
    ],
    "a": 0,
    "ex": "\\(z \\bar{z}\\) for \\(z = 3 + 4i\\) matches \\(|z|^2 = 25\\).",
    "ex_ar": "\\(z \\bar{z}\\) للعدد \\(z = 3 + 4i\\) يطابق \\(|z|^2 = 25\\)."
  }
];
D["est2l2-sequences-series"] = [
  {
    "t": "fn",
    "ti": "Lab Explorer: Arithmetic Progression Generator \\(a_n = a_1 + (n-1)d\\)",
    "ti_ar": "مستكشف: مولد المتتابعة الحسابية \\(a_n = a_1 + (n-1)d\\)",
    "fns": [
      {
        "expr": "a + (x-1)*d",
        "color": "#16a34a",
        "label": "a + (x-1)d"
      }
    ],
    "xrange": [
      1,
      10
    ],
    "yrange": [
      -10,
      40
    ],
    "params": [
      {
        "name": "a",
        "label": "First term a₁",
        "min": -5,
        "max": 15,
        "step": 1,
        "default": 3
      },
      {
        "name": "d",
        "label": "Common difference d",
        "min": -4,
        "max": 6,
        "step": 0.5,
        "default": 3.5
      }
    ]
  },
  {
    "t": "mt",
    "ti": "Matching Lab: Sequence & Series Formulas",
    "ti_ar": "مطابقة: قوانين المتتابعات والمتسلسلات",
    "p": [
      {
        "l": "Arithmetic nth term aₙ",
        "l_ar": "الحد النوني الحسابي aₙ",
        "r": "a₁ + (n−1)d",
        "r_ar": "a₁ + (n−1)d"
      },
      {
        "l": "Arithmetic sum Sₙ",
        "l_ar": "مجموع المتتابعة الحسابية Sₙ",
        "r": "n/2 · (a₁ + aₙ)",
        "r_ar": "n/2 · (a₁ + aₙ)"
      },
      {
        "l": "Geometric nth term aₙ",
        "l_ar": "الحد النوني الهندسي aₙ",
        "r": "a₁ · rⁿ⁻¹",
        "r_ar": "a₁ · rⁿ⁻¹"
      },
      {
        "l": "Infinite geometric sum",
        "l_ar": "المجموع اللانهائي الهندسي",
        "r": "a₁ / (1 − r), |r| < 1",
        "r_ar": "a₁ / (1 − r), |r| < 1"
      }
    ]
  },
  {
    "t": "num",
    "ti": "Numeric Lab: Infinite Geometric Sum",
    "ti_ar": "إدخال رقمي: مجموع متسلسلة هندسية لانهائية",
    "q": "Find the exact sum of the infinite series \\(40 - 20 + 10 - 5 + \\cdots\\)",
    "q_ar": "أوجد المجموع الدقيق للمتسلسلة الهندسية اللانهائية \\(40 - 20 + 10 - 5 + \\cdots\\)",
    "a": "80/3",
    "tol": 0.01,
    "h": "Identify \\(a_1 = 40\\) and \\(r = -20/40 = -1/2\\). Use \\(S_\\infty = \\dfrac{a_1}{1 - r}\\).",
    "h_ar": "حدد \\(a_1 = 40\\) و \\(r = -20/40 = -1/2\\). استخدم \\(S_\\infty = \\dfrac{a_1}{1 - r}\\).",
    "sol": "\\(S_\\infty = \\dfrac{40}{1 - (-1/2)} = \\dfrac{40}{3/2} = 40 \\times \\dfrac{2}{3} = \\dfrac{80}{3} \\approx 26.67\\).",
    "sol_ar": "\\(S_\\infty = \\dfrac{40}{1 - (-1/2)} = \\dfrac{40}{3/2} = 40 \\times \\dfrac{2}{3} = \\dfrac{80}{3} \\approx 26.67\\)."
  },
  {
    "t": "ord",
    "ti": "Geometric Sequence: Finding Specific Terms",
    "ti_ar": "رتّب الخطوات: إيجاد حدود معينة في متتابعة هندسية",
    "q": "Arrange the steps to find the 6th term of a geometric sequence with \\(a_2 = 6\\) and \\(a_4 = 24\\) (\\(r > 0\\)):",
    "q_ar": "رتب خطوات إيجاد الحد السادس لمتتابعة هندسية فيها \\(a_2 = 6\\) و \\(a_4 = 24\\) (حيث \\(r > 0\\)):",
    "items": [
      "Express terms algebraically: \\(a_2 = a_1 r = 6\\) and \\(a_4 = a_1 r^3 = 24\\).",
      "Divide \\(a_4\\) by \\(a_2\\): \\(\\frac{a_1 r^3}{a_1 r} = r^2 = \\frac{24}{6} = 4\\).",
      "Determine common ratio: \\(r = 2\\) (since \\(r > 0\\)).",
      "Find first term: \\(a_1 = \\frac{6}{2} = 3\\).",
      "Compute 6th term: \\(a_6 = a_1 r^5 = 3(2^5) = 3(32) = 96\\)."
    ],
    "items_ar": [
      "كتابة الحدود جبرياً: \\(a_2 = a_1 r = 6\\) و \\(a_4 = a_1 r^3 = 24\\).",
      "قسمة \\(a_4\\) على \\(a_2\\): \\(\\frac{a_1 r^3}{a_1 r} = r^2 = \\frac{24}{6} = 4\\).",
      "تحديد الأساس المشترك: \\(r = 2\\) (لأن \\(r > 0\\)).",
      "إيجاد الحد الأول: \\(a_1 = \\frac{6}{2} = 3\\).",
      "حساب الحد السادس: \\(a_6 = a_1 r^5 = 3(2^5) = 3(32) = 96\\)."
    ]
  },
  {
    "t": "cat",
    "ti": "Sequence Type Classification",
    "ti_ar": "تصنيف: أنواع المتتابعات",
    "categories": [
      "Arithmetic Sequence",
      "Geometric Sequence",
      "Neither"
    ],
    "categories_ar": [
      "متتابعة حسابية",
      "متتابعة هندسية",
      "ليست حسابية ولا هندسية"
    ],
    "items": [
      {
        "s": "\\(7, 11, 15, 19, \\dots\\)",
        "s_ar": "\\(7, 11, 15, 19, \\dots\\)",
        "cat": 0
      },
      {
        "s": "\\(3, 6, 12, 24, \\dots\\)",
        "s_ar": "\\(3, 6, 12, 24, \\dots\\)",
        "cat": 1
      },
      {
        "s": "\\(1, 4, 9, 16, \\dots\\)",
        "s_ar": "\\(1, 4, 9, 16, \\dots\\)",
        "cat": 2
      },
      {
        "s": "\\(50, 45, 40, 35, \\dots\\)",
        "s_ar": "\\(50, 45, 40, 35, \\dots\\)",
        "cat": 0
      },
      {
        "s": "\\(81, 27, 9, 3, \\dots\\)",
        "s_ar": "\\(81, 27, 9, 3, \\dots\\)",
        "cat": 1
      },
      {
        "s": "\\(2, 3, 5, 8, \\dots\\)",
        "s_ar": "\\(2, 3, 5, 8, \\dots\\)",
        "cat": 2
      }
    ]
  },
  {
    "t": "se",
    "ti": "Spot the Error: Infinite Geometric Series Convergence Check (Sequences & Series)",
    "ti_ar": "اكتشف الخطأ: شرط تقارب المتسلسلة الهندسية اللانهائية (المتتابعات والمتسلسلات اللانهائية)",
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
    "ti_ar": "وضع المصحح: المتتاليات الحسابية والهندسية المتقاربة (المتتابعات والمتسلسلات اللانهائية)",
    "q": "(a) A geometric series has first term \\(a = 18\\) and common ratio \\(r = \\frac{1}{3}\\). Verify convergence and find \\(S_\\infty\\). (b) An arithmetic progression has \\(u_1 = 18\\) and common difference \\(d = 3\\); find \\(u_{10}\\).",
    "q_ar": "(أ) متسلسلة هندسية حدها الأول \\(a = 18\\) وأساسها \\(r = \\frac{1}{3}\\). تحقق من التقارب وأوجد \\(S_\\infty\\). (ب) متتالية حسابية حدها الأول \\(18\\) وأساسها \\(d = 3\\)؛ أوجد الحد العاشر \\(u_{10}\\).",
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
            "text": "\\(u_{10} = 18 + 9(3) = 45\\)."
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
            "text": "\\(u_{10} = 18 + 9(3) = 45\\)."
          }
        ]
      }
    ]
  },
  {
    "t": "sb",
    "ti": "Step Builder: Geometric Sum to Infinity & AP Term (Sequences & Series)",
    "ti_ar": "بناء الخطوات: مجموع اللانهاية والحد النوني (المتتابعات والمتسلسلات اللانهائية)",
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
        "l": "In the AP with \\(u_1 = 18,\\; d = 3\\), find \\(u_{10} =\\)",
        "a": "45",
        "h": "Compute 18 + 9×3."
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
        "l": "في المتتالية الحسابية \\(u_1 = 18,\\; d = 3\\)، أوجد \\(u_{10} =\\)",
        "a": "45",
        "h": "احسب 18 + 9×3."
      }
    ]
  },
  {
    "t": "qc",
    "ti": "Quick Check: Geometric Convergence Radius (Sequences & Series)",
    "ti_ar": "فحص سريع: شرط تقارب المتسلسلة الهندسية (المتتابعات والمتسلسلات اللانهائية)",
    "q": "For which values of \\(x\\) does the geometric series \\(\\sum_{n=0}^{\\infty} \\left(\\dfrac{x}{3}\\right)^n\\) converge?",
    "q_ar": "لأي قيم \\(x\\) تتقارب المتسلسلة الهندسية \\(\\sum_{n=0}^{\\infty} \\left(\\dfrac{x}{3}\\right)^n\\)؟",
    "o": [
      "\\(|x| < 3\\)",
      "\\(|x| \\le 3\\)",
      "\\(x > 3\\)",
      "All real \\(x\\)"
    ],
    "o_ar": [
      "\\(|x| < 3\\)",
      "\\(|x| \\le 3\\)",
      "\\(x > 3\\)",
      "جميع الأعداد الحقيقية"
    ],
    "a": 0,
    "ex": "Geometric convergence requires \\(\\left|\\frac{x}{3}\\right| < 1 \\iff |x| < 3\\).",
    "ex_ar": "يتطلب التقارب أن يكون \\(\\left|\\frac{x}{3}\\right| < 1 \\iff |x| < 3\\)."
  }
];
D["est2l2-functions-graphs"] = [
  {
    "t": "fn",
    "ti": "Lab Explorer: Function Transformations \\(y = A f(x-h) + k\\)",
    "ti_ar": "مستكشف: تحويلات الدوال \\(y = A f(x-h) + k\\)",
    "fns": [
      {
        "expr": "A*abs(x-h)+k",
        "color": "#ea580c",
        "label": "A|x-h|+k"
      }
    ],
    "xrange": [
      -8,
      8
    ],
    "yrange": [
      -6,
      8
    ],
    "params": [
      {
        "name": "A",
        "label": "Vertical stretch/flip A",
        "min": -3,
        "max": 3,
        "step": 0.5,
        "default": 1.5
      },
      {
        "name": "h",
        "label": "Horizontal translation h",
        "min": -5,
        "max": 5,
        "step": 1,
        "default": 2
      },
      {
        "name": "k",
        "label": "Vertical translation k",
        "min": -4,
        "max": 4,
        "step": 1,
        "default": -1
      }
    ]
  },
  {
    "t": "tf",
    "ti": "Reasoning Lab: Inverses & Domain Restrictions",
    "ti_ar": "مختبر التفكير المنطقي: الدوال العكسية وقيود المجال",
    "items": [
      {
        "s": "A function possesses an inverse function if and only if it is strictly one-to-one.",
        "s_ar": "تمتلك الدالة دالة عكسية إذا وفقط إذا كانت متباينة (واحد لواحد).",
        "a": true,
        "ex": "It must pass the horizontal line test so that each output corresponds to exactly one input.",
        "ex_ar": "يجب أن تجتاز اختبار الخط الأفقي بحيث يرتبط كل مخرج بمدخل واحد فقط."
      },
      {
        "s": "The graph of \\(f^{-1}(x)\\) is the reflection of \\(f(x)\\) across the line \\(y = -x\\).",
        "s_ar": "منحنى الدالة العكسية \\(f^{-1}(x)\\) هو انعكاس لمنحنى \\(f(x)\\) حول المستقيم \\(y = -x\\).",
        "a": false,
        "ex": "The reflection is across the diagonal line \\(y = x\\).",
        "ex_ar": "الانعكاس يكون حول المستقيم القطري \\(y = x\\)."
      },
      {
        "s": "The domain of \\(f(x) = \\sqrt{9 - x^2}\\) is \\([-3, 3]\\).",
        "s_ar": "مجال الدالة \\(f(x) = \\sqrt{9 - x^2}\\) هو الفترة \\([-3, 3]\\).",
        "a": true,
        "ex": "\\(9 - x^2 \\geq 0 \\iff x^2 \\leq 9 \\iff -3 \\leq x \\leq 3\\).",
        "ex_ar": "\\(9 - x^2 \\geq 0 \\iff x^2 \\leq 9 \\iff -3 \\leq x \\leq 3\\)."
      }
    ]
  },
  {
    "t": "num",
    "ti": "Numeric Lab: Evaluating Inverses",
    "ti_ar": "إدخال رقمي: إيجاد قيمة الدالة العكسية",
    "q": "If \\(f(x) = 3x - 7\\), what is the value of \\(f^{-1}(11)\\)?",
    "q_ar": "إذا كانت \\(f(x) = 3x - 7\\)، فما هي قيمة \\(f^{-1}(11)\\)؟",
    "a": 6,
    "tol": 0.01,
    "h": "Set \\(f(x) = 11\\) and solve for \\(x\\): \\(3x - 7 = 11\\).",
    "h_ar": "ساوِ \\(f(x) = 11\\) وحل بالنسبة لـ \\(x\\): \\(3x - 7 = 11\\).",
    "sol": "\\(3x - 7 = 11 \\implies 3x = 18 \\implies x = 6\\). So \\(f^{-1}(11) = 6\\).",
    "sol_ar": "\\(3x - 7 = 11 \\implies 3x = 18 \\implies x = 6\\). إذن \\(f^{-1}(11) = 6\\)."
  },
  {
    "t": "ord",
    "ti": "Function Transformation Workflow",
    "ti_ar": "رتّب الخطوات: مسار التحويلات الهندسية للدالة",
    "q": "Arrange the sequence of transformations from \\(y = x^2\\) to \\(y = -2(x + 3)^2 + 5\\):",
    "q_ar": "رتب تسلسل التحويلات الهندسية من الدالة الأم \\(y = x^2\\) إلى \\(y = -2(x + 3)^2 + 5\\):",
    "items": [
      "Start with parent function \\(y = x^2\\).",
      "Shift horizontally left by 3 units: \\(y = (x + 3)^2\\).",
      "Stretch vertically by factor of 2: \\(y = 2(x + 3)^2\\).",
      "Reflect across the x-axis: \\(y = -2(x + 3)^2\\).",
      "Shift vertically upward by 5 units: \\(y = -2(x + 3)^2 + 5\\)."
    ],
    "items_ar": [
      "البدء بالدالة الأم (الرئيسة) \\(y = x^2\\).",
      "إزاحة أفقية إلى اليسار بمقدار 3 وحدات: \\(y = (x + 3)^2\\).",
      "تمدد رأسي بمعامل 2: \\(y = 2(x + 3)^2\\).",
      "انعكاس حول المحور x: \\(y = -2(x + 3)^2\\).",
      "إزاحة رأسية إلى الأعلى بمقدار 5 وحدات: \\(y = -2(x + 3)^2 + 5\\)."
    ]
  },
  {
    "t": "cat",
    "ti": "Function Symmetry: Even, Odd, or Neither",
    "ti_ar": "تصنيف تماثل الدوال: زوجية، فردية، أو ليست أياً منهما",
    "categories": [
      "Even (y-axis symmetry)",
      "Odd (origin symmetry)",
      "Neither"
    ],
    "categories_ar": [
      "زوجية (تماثل حول محور y)",
      "فردية (تماثل حول نقطة الأصل)",
      "ليست زوجية ولا فردية"
    ],
    "items": [
      {
        "s": "\\(f(x) = x^4 - 2x^2 + 1\\)",
        "s_ar": "\\(f(x) = x^4 - 2x^2 + 1\\)",
        "cat": 0
      },
      {
        "s": "\\(f(x) = 5x^3 - x\\)",
        "s_ar": "\\(f(x) = 5x^3 - x\\)",
        "cat": 1
      },
      {
        "s": "\\(f(x) = x^2 + 3x\\)",
        "s_ar": "\\(f(x) = x^2 + 3x\\)",
        "cat": 2
      },
      {
        "s": "\\(f(x) = \\cos(2x)\\)",
        "s_ar": "\\(f(x) = \\cos(2x)\\)",
        "cat": 0
      },
      {
        "s": "\\(f(x) = \\sin(3x)\\)",
        "s_ar": "\\(f(x) = \\sin(3x)\\)",
        "cat": 1
      },
      {
        "s": "\\(f(x) = e^x\\)",
        "s_ar": "\\(f(x) = e^x\\)",
        "cat": 2
      }
    ]
  },
  {
    "t": "se",
    "ti": "Spot the Error: Composite Order & Inverse Domain (Functions & Graphs)",
    "ti_ar": "اكتشف الخطأ: ترتيب تركيب الدوال ومجال المعكوس (الدوال المتقدمة والتمثيلات البيانية)",
    "q": "Let \\(f(x) = 3x + 4\\) and \\(g(x) = x^2 + 1\\). A student evaluates \\((f \\circ g)(4)\\). Which step is wrong?",
    "q_ar": "لتكن \\(f(x) = 3x + 4\\) و\\(g(x) = x^2 + 1\\). يحسب طالب \\((f \\circ g)(4)\\). أي خطوة خاطئة؟",
    "steps": [
      "Write \\((f \\circ g)(4) = g(f(4))\\) by applying \\(f\\) first instead of \\(g\\).",
      "Compute \\(f(4) = 16\\).",
      "Square and add \\(1\\) to get \\(257\\)."
    ],
    "steps_ar": [
      "كتابة \\((f \\circ g)(4) = g(f(4))\\) بتطبيق \\(f\\) أولاً بدلاً من \\(g\\).",
      "حساب \\(f(4) = 16\\).",
      "التربيع وإضافة \\(1\\) للحصول على \\(257\\)."
    ],
    "errorStep": 1,
    "reasons": [
      "By definition \\((f \\circ g)(x) = f(g(x))\\): evaluate the inner function \\(g(4) = 17\\) first, then \\(f(17) = 55\\).",
      "Function composition is always commutative.",
      "You must multiply \\(f(4)\\) by \\(g(4)\\)."
    ],
    "reasons_ar": [
      "حسب التعريف \\((f \\circ g)(x) = f(g(x))\\): نحسب الدالة الداخلية أولاً \\(g(4) = 17\\) ثم \\(f(17) = 55\\).",
      "تركيب الدوال عملية إبدالية دائماً.",
      "يجب ضرب \\(f(4)\\) في \\(g(4)\\)."
    ],
    "correctReason": 0
  },
  {
    "t": "ms",
    "ti": "Examiner Mode: One-to-One Domain Restriction & Inverse (Functions & Graphs)",
    "ti_ar": "وضع المصحح: تقييد المجال وإيجاد الدالة العكسية (الدوال المتقدمة والتمثيلات البيانية)",
    "q": "Let \\(h(x) = (x - 3)^2 + 4\\) for \\(x \\ge 3\\). (a) State the range of \\(h\\) and explain why \\(h^{-1}\\) exists on \\(x \\ge 3\\). (b) Find \\(h^{-1}(x)\\) and state its domain.",
    "q_ar": "لتكن \\(h(x) = (x - 3)^2 + 4\\) حيث \\(x \\ge 3\\). (أ) اذكر مدى \\(h\\) وفسّر سبب وجود معكوس لها. (ب) أوجد \\(h^{-1}(x)\\) وحدد مجالها.",
    "parts": [
      {
        "label": "Part (a) — Range & Injectivity",
        "marks": 2,
        "rubric": [
          {
            "code": "B1",
            "marks": 1,
            "text": "Range of \\(h\\) is \\([ 4, \\infty )\\) since \\((x - 3)^2 \\ge 0\\)."
          },
          {
            "code": "B1",
            "marks": 1,
            "text": "For \\(x \\ge 3\\), \\(h\\) is strictly increasing (one-to-one / passes horizontal line test)."
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
            "text": "Solve \\(y = (x - 3)^2 + 4 \\implies x = 3 + \\sqrt{y - 4}\\) (choosing \\(+\\) branch for \\(x \\ge 3\\))."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "\\(h^{-1}(x) = 3 + \\sqrt{x - 4}\\) with domain \\(x \\ge 4\\)."
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
            "text": "مدى الدالة \\(h\\) هو \\([ 4, \\infty )\\) لأن \\((x - 3)^2 \\ge 0\\)."
          },
          {
            "code": "B1",
            "marks": 1,
            "text": "على الفترة \\(x \\ge 3\\) الدالة متزايدة تماماً (واحد لواحد)."
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
            "text": "حل المعادلة بدلالة \\(x\\) مع اختيار الفرع الموجب: \\(x = 3 + \\sqrt{y - 4}\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "\\(h^{-1}(x) = 3 + \\sqrt{x - 4}\\) ومجالها \\(x \\ge 4\\)."
          }
        ]
      }
    ]
  },
  {
    "t": "sb",
    "ti": "Step Builder: Composite & Inverse Function Evaluation (Functions & Graphs)",
    "ti_ar": "بناء الخطوات: حساب التركيب والمعكوس (الدوال المتقدمة والتمثيلات البيانية)",
    "steps": [
      {
        "l": "For \\(f(x) = 3x + 4\\) and \\(g(x) = x^2 + 1\\), find \\(g(4) =\\)",
        "a": "17",
        "h": "Compute 4² + 1."
      },
      {
        "l": "Now evaluate \\(f(g(4)) = f(17) =\\)",
        "a": "55",
        "h": "Compute 3×17 + 4."
      },
      {
        "l": "Evaluate \\(f^{-1}(13) =\\)",
        "a": "3",
        "h": "Solve 3x + 4 = 13."
      }
    ],
    "steps_ar": [
      {
        "l": "للدالتين \\(f(x) = 3x + 4\\) و\\(g(x) = x^2 + 1\\)، أوجد \\(g(4) =\\)",
        "a": "17",
        "h": "احسب 4² + 1."
      },
      {
        "l": "الآن احسب \\(f(g(4)) = f(17) =\\)",
        "a": "55",
        "h": "احسب 3×17 + 4."
      },
      {
        "l": "أوجد قيمة المعكوس \\(f^{-1}(13) =\\)",
        "a": "3",
        "h": "حل المعادلة 3x + 4 = 13."
      }
    ]
  },
  {
    "t": "mt",
    "ti": "Matching: Function Transformations & Inverse Rules (Functions & Graphs)",
    "ti_ar": "مطابقة: تحويلات الدوال وقواعد المعكوس (الدوال المتقدمة والتمثيلات البيانية)",
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
        "l": "Transformation \\(y = f(x - 3) + 4\\)",
        "r": "Shift right \\(3\\) units and up \\(4\\) units"
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
        "l": "التحويل \\(y = f(x - 3) + 4\\)",
        "r": "إزاحة لليمين \\(3\\) وحدات ولأعلى \\(4\\) وحدات"
      },
      {
        "l": "منحنى القيمة المطلقة \\(y = |f(x)|\\)",
        "r": "يعكس الأجزاء السالبة \\(f(x) < 0\\) فوق محور السينات"
      }
    ]
  }
];
D["est2l2-matrices-vectors"] = [
  {
    "t": "sb",
    "ti": "Lab Step Builder: Matrix Multiplication (2×2)",
    "ti_ar": "بناء الخطوات: ضرب المصفوفات (2×2)",
    "steps": [
      {
        "l": "Multiply \\(\\begin{pmatrix}2 & 1 \\\\ 0 & 3\\end{pmatrix}\\begin{pmatrix}1 & 4 \\\\ 5 & 2\\end{pmatrix}\\). Top-left entry: \\(2(1) + 1(5) =\\)",
        "l_ar": "اضرب المصفوفات. العنصر أعلى اليسار: \\(2(1) + 1(5) =\\)",
        "a": "7",
        "h": "\\(2 + 5 = 7\\)",
        "h_ar": "\\(2 + 5 = 7\\)"
      },
      {
        "l": "Top-right entry: \\(2(4) + 1(2) =\\)",
        "l_ar": "العنصر أعلى اليمين: \\(2(4) + 1(2) =\\)",
        "a": "10",
        "h": "\\(8 + 2 = 10\\)",
        "h_ar": "\\(8 + 2 = 10\\)"
      },
      {
        "l": "Bottom-left entry: \\(0(1) + 3(5) =\\)",
        "l_ar": "العنصر أسفل اليسار: \\(0(1) + 3(5) =\\)",
        "a": "15",
        "h": "\\(0 + 15 = 15\\)",
        "h_ar": "\\(0 + 15 = 15\\)"
      },
      {
        "l": "Bottom-right entry: \\(0(4) + 3(2) =\\)",
        "l_ar": "العنصر أسفل اليمين: \\(0(4) + 3(2) =\\)",
        "a": "6",
        "h": "\\(0 + 6 = 6\\)",
        "h_ar": "\\(0 + 6 = 6\\)"
      }
    ]
  },
  {
    "t": "qc",
    "ti": "Lab Check: Angle Between Vectors",
    "ti_ar": "فحص سريع: الزاوية بين متجهين",
    "q": "Find the angle \\(\\theta\\) between vectors \\(\\mathbf{a} = \\langle 1, 0 \\rangle\\) and \\(\\mathbf{b} = \\langle 1, 1 \\rangle\\):",
    "q_ar": "أوجد الزاوية \\(\\theta\\) بين المتجهين \\(\\mathbf{a} = \\langle 1, 0 \\rangle\\) و \\(\\mathbf{b} = \\langle 1, 1 \\rangle\\):",
    "o": [
      "45°",
      "30°",
      "60°",
      "90°"
    ],
    "o_ar": [
      "45°",
      "30°",
      "60°",
      "90°"
    ],
    "a": 0,
    "ex": "\\(\\cos\\theta = \\dfrac{\\mathbf{a}\\cdot\\mathbf{b}}{|\\mathbf{a}||\\mathbf{b}|} = \\dfrac{1(1)+0(1)}{1\\cdot\\sqrt{2}} = \\dfrac{1}{\\sqrt{2}} \\Rightarrow \\theta = 45°\\).",
    "ex_ar": "\\(\\cos\\theta = \\dfrac{\\mathbf{a}\\cdot\\mathbf{b}}{|\\mathbf{a}||\\mathbf{b}|} = \\dfrac{1(1)+0(1)}{1\\cdot\\sqrt{2}} = \\dfrac{1}{\\sqrt{2}} \\Rightarrow \\theta = 45°\\)."
  },
  {
    "t": "num",
    "ti": "Numeric Lab: Determinant of 2×2 Matrix",
    "ti_ar": "إدخال رقمي: محدد مصفوفة 2×2",
    "q": "Compute the determinant of \\(A = \\begin{pmatrix}7 & -3\\\\ 4 & 5\\end{pmatrix}\\).",
    "q_ar": "احسب محدد المصفوفة \\(A = \\begin{pmatrix}7 & -3\\\\ 4 & 5\\end{pmatrix}\\).",
    "a": 47,
    "tol": 0.01,
    "h": "\\(\\det(A) = ad - bc = (7)(5) - (-3)(4)\\).",
    "h_ar": "\\(\\det(A) = ad - bc = (7)(5) - (-3)(4)\\).",
    "sol": "\\(\\det(A) = 35 - (-12) = 35 + 12 = 47\\).",
    "sol_ar": "\\(\\det(A) = 35 - (-12) = 35 + 12 = 47\\)."
  },
  {
    "t": "ord",
    "ti": "Matrix Equation: Solving \\(A\\mathbf{x} = \\mathbf{b}\\)",
    "ti_ar": "رتّب الخطوات: حل المعادلة المصفوفية \\(A\\mathbf{x} = \\mathbf{b}\\)",
    "q": "Arrange the steps to solve a \\(2\\times 2\\) matrix system \\(A\\mathbf{x} = \\mathbf{b}\\):",
    "q_ar": "رتب خطوات حل النظام المصفوفي \\(2\\times 2\\) \\(A\\mathbf{x} = \\mathbf{b}\\):",
    "items": [
      "Compute determinant \\(\\det(A) = ad - bc\\).",
      "Confirm invertibility: verify \\(\\det(A) \\neq 0\\).",
      "Construct inverse matrix \\(A^{-1} = \\frac{1}{\\det A}\\begin{pmatrix}d & -b \\\\ -c & a\\end{pmatrix}\\).",
      "Multiply \\(A^{-1}\\) by vector \\(\\mathbf{b}\\).",
      "State the unique solution vector \\(\\mathbf{x} = \\langle x, y \\rangle\\)."
    ],
    "items_ar": [
      "حساب المحدد \\(\\det(A) = ad - bc\\).",
      "التأكد من قابلية العكس: التحقق من أن \\(\\det(A) \\neq 0\\).",
      "تكوين مصفوفة النظير الضربي \\(A^{-1} = \\frac{1}{\\det A}\\begin{pmatrix}d & -b \\\\ -c & a\\end{pmatrix}\\).",
      "ضرب \\(A^{-1}\\) في متجه الثوابت \\(\\mathbf{b}\\).",
      "تحديد متجه الحل الفريد \\(\\mathbf{x} = \\langle x, y \\rangle\\)."
    ]
  },
  {
    "t": "cat",
    "ti": "Vector Relationships",
    "ti_ar": "تصنيف: العلاقات بين المتجهات",
    "categories": [
      "Perpendicular (u·v = 0)",
      "Parallel (u = k·v)",
      "Neither"
    ],
    "categories_ar": [
      "متعامدان (u·v = 0)",
      "متوازيان (u = k·v)",
      "غير ذلك"
    ],
    "items": [
      {
        "s": "\\(\\mathbf{u} = \\langle 2, 5 \\rangle, \\mathbf{v} = \\langle -5, 2 \\rangle\\)",
        "s_ar": "\\(\\mathbf{u} = \\langle 2, 5 \\rangle, \\mathbf{v} = \\langle -5, 2 \\rangle\\)",
        "cat": 0
      },
      {
        "s": "\\(\\mathbf{u} = \\langle 3, -6 \\rangle, \\mathbf{v} = \\langle -1, 2 \\rangle\\)",
        "s_ar": "\\(\\mathbf{u} = \\langle 3, -6 \\rangle, \\mathbf{v} = \\langle -1, 2 \\rangle\\)",
        "cat": 1
      },
      {
        "s": "\\(\\mathbf{u} = \\langle 4, 1 \\rangle, \\mathbf{v} = \\langle 1, 4 \\rangle\\)",
        "s_ar": "\\(\\mathbf{u} = \\langle 4, 1 \\rangle, \\mathbf{v} = \\langle 1, 4 \\rangle\\)",
        "cat": 2
      },
      {
        "s": "\\(\\mathbf{u} = \\langle 0, 7 \\rangle, \\mathbf{v} = \\langle 4, 0 \\rangle\\)",
        "s_ar": "\\(\\mathbf{u} = \\langle 0, 7 \\rangle, \\mathbf{v} = \\langle 4, 0 \\rangle\\)",
        "cat": 0
      },
      {
        "s": "\\(\\mathbf{u} = \\langle 2, 3 \\rangle, \\mathbf{v} = \\langle 6, 9 \\rangle\\)",
        "s_ar": "\\(\\mathbf{u} = \\langle 2, 3 \\rangle, \\mathbf{v} = \\langle 6, 9 \\rangle\\)",
        "cat": 1
      },
      {
        "s": "\\(\\mathbf{u} = \\langle 1, 2 \\rangle, \\mathbf{v} = \\langle 2, 3 \\rangle\\)",
        "s_ar": "\\(\\mathbf{u} = \\langle 1, 2 \\rangle, \\mathbf{v} = \\langle 2, 3 \\rangle\\)",
        "cat": 2
      }
    ]
  },
  {
    "t": "se",
    "ti": "Spot the Error: Matrix Inverse & Non-Commutative Product (Matrices & Vectors)",
    "ti_ar": "اكتشف الخطأ: معكوس المصفوفة وضرب المصفوفات (المصفوفات والمحددات والمتجهات)",
    "q": "A student inverts \\(A = \\begin{pmatrix} 4 & 1 \\\\ 2 & 3 \\end{pmatrix}\\). Which step contains an error?",
    "q_ar": "يحسب طالب معكوس المصفوفة \\(A = \\begin{pmatrix} 4 & 1 \\\\ 2 & 3 \\end{pmatrix}\\). أي خطوة تتضمن خطأ؟",
    "steps": [
      "Compute \\(\\det(A) = (4)(3) - (1)(2) = 10 \\neq 0\\).",
      "Swap main diagonal entries \\(4\\) and \\(3\\).",
      "Leave off-diagonal entries \\(1\\) and \\(2\\) with unchanged positive signs instead of negating them.",
      "Divide by \\(10\\)."
    ],
    "steps_ar": [
      "حساب المحدد \\(\\det(A) = (4)(3) - 2 = 10 \\neq 0\\).",
      "تبديل عنصري القطر الرئيس \\(4\\) و\\(3\\).",
      "ترك عنصري القطر الثانوي \\(1\\) و\\(2\\) بنفس إشارتهما دون تغيير الإشارة.",
      "القسمة على المحدد \\(10\\)."
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
    "q": "Let \\(A = \\begin{pmatrix} 4 & 1 \\\\ 2 & 3 \\end{pmatrix}\\) and vectors \\(\\mathbf{u} = \\langle 2, -3 \\rangle,\\; \\mathbf{v} = \\langle 3, k \\rangle\\). (a) Find \\(k\\) so \\(\\mathbf{u} \\perp \\mathbf{v}\\). (b) Compute \\(\\text{tr}(A)\\), \\(\\det(A)\\), and write the characteristic polynomial \\(\\det(A - \\lambda I) = 0\\).",
    "q_ar": "لتكن \\(A = \\begin{pmatrix} 4 & 1 \\\\ 2 & 3 \\end{pmatrix}\\) والمتجهان \\(\\mathbf{u} = \\langle 2, -3 \\rangle,\\; \\mathbf{v} = \\langle 3, k \\rangle\\). (أ) أوجد \\(k\\) بحيث يتعامد المتجهان. (ب) احسب الأثر والمحدد واكتب المعادلة المميزة.",
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
            "text": "\\(\\text{tr}(A) = 7\\) and \\(\\det(A) = 10\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "Characteristic polynomial: \\(\\lambda^2 - 7\\lambda + 10 = 0\\)."
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
            "text": "الأثر \\(\\text{tr}(A) = 7\\) والمحدد \\(\\det(A) = 10\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "المعادلة المميزة: \\(\\lambda^2 - 7\\lambda + 10 = 0\\)."
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
        "r": "\\(\\text{tr}(A) = 7\\) for \\(A\\)"
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
        "r": "يساوي الأثر \\(\\text{tr}(A) = 7\\)"
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
    "q": "For what value of \\(k\\) is the matrix \\(\\begin{pmatrix} 4 & 8 \\\\ 3 & k \\end{pmatrix}\\) singular (non-invertible)?",
    "q_ar": "ما قيمة \\(k\\) التي تجعل المصفوفة \\(\\begin{pmatrix} 4 & 8 \\\\ 3 & k \\end{pmatrix}\\) منفردة (غير قابلة للعكس)؟",
    "o": [
      "\\(6\\)",
      "\\(-6\\)",
      "\\(4\\)",
      "\\(0\\)"
    ],
    "o_ar": [
      "\\(6\\)",
      "\\(-6\\)",
      "\\(4\\)",
      "\\(0\\)"
    ],
    "a": 0,
    "ex": "\\(\\det = 4k - 3(8) = 0 \\implies k = 6\\).",
    "ex_ar": "ينعدم المحدد عندما \\(4k - 24 = 0 \\implies k = 6\\)."
  }
];
D["est2l2-intro-calculus"] = [
  {
    "t": "fn",
    "ti": "Lab Explorer: Derivative & Tangent Line Secant Slope",
    "ti_ar": "مستكشف: المشتقة وميل خط المماس",
    "fns": [
      {
        "expr": "x^2 - 2*x",
        "color": "#2563eb",
        "label": "f(x) = x² - 2x"
      },
      {
        "expr": "(2*a - 2)*(x - a) + (a^2 - 2*a)",
        "color": "#dc2626",
        "label": "Tangent at x=a"
      }
    ],
    "xrange": [
      -2,
      5
    ],
    "yrange": [
      -4,
      8
    ],
    "params": [
      {
        "name": "a",
        "label": "Point of tangency a",
        "min": -1,
        "max": 4,
        "step": 0.5,
        "default": 2
      }
    ]
  },
  {
    "t": "sb",
    "ti": "Lab Step Builder: Power Rule & Tangent Equation",
    "ti_ar": "بناء الخطوات: قاعدة القوة ومعادلة المماس",
    "steps": [
      {
        "l": "Differentiate \\(f(x) = 3x^2 - 5x + 4\\): \\(f'(x) = 6x -\\)",
        "l_ar": "اشتق \\(f(x) = 3x^2 - 5x + 4\\): \\(f'(x) = 6x -\\)",
        "a": "5",
        "h": "Power rule: d/dx(3x²) = 6x, d/dx(-5x) = -5",
        "h_ar": "قاعدة القوة: d/dx(3x²) = 6x, d/dx(-5x) = -5"
      },
      {
        "l": "Evaluate slope of tangent line at \\(x = 2\\): \\(f'(2) = 6(2) - 5 =\\)",
        "l_ar": "احسب ميل خط المماس عند \\(x = 2\\): \\(f'(2) = 6(2) - 5 =\\)",
        "a": "7",
        "h": "\\(12 - 5 = 7\\)",
        "h_ar": "\\(12 - 5 = 7\\)"
      }
    ]
  },
  {
    "t": "num",
    "ti": "Numeric Lab: Evaluating Tangent Slope",
    "ti_ar": "إدخال رقمي: حساب ميل المماس",
    "q": "Given \\(f(x) = 4x^2 - 6x + 2\\), what is the slope of the tangent line at \\(x = 3\\)?",
    "q_ar": "لتكن \\(f(x) = 4x^2 - 6x + 2\\)، ما هو ميل خط المماس للمنحنى عند \\(x = 3\\)؟",
    "a": 18,
    "tol": 0.01,
    "h": "Compute \\(f'(x) = 8x - 6\\), then substitute \\(x = 3\\).",
    "h_ar": "احسب \\(f'(x) = 8x - 6\\)، ثم عوض بـ \\(x = 3\\).",
    "sol": "\\(f'(x) = 8x - 6\\). At \\(x = 3\\), \\(f'(3) = 8(3) - 6 = 24 - 6 = 18\\).",
    "sol_ar": "\\(f'(x) = 8x - 6\\). وعند \\(x = 3\\): \\(f'(3) = 8(3) - 6 = 24 - 6 = 18\\)."
  },
  {
    "t": "ord",
    "ti": "Indeterminate Limit: Rational Expression",
    "ti_ar": "رتّب الخطوات: حساب نهاية نسبية غير معينة",
    "q": "Arrange the steps to evaluate \\(\\lim_{x\\to 5}\\dfrac{x^2 - 25}{x - 5}\\):",
    "q_ar": "رتب خطوات حساب النهاية \\(\\lim_{x\\to 5}\\dfrac{x^2 - 25}{x - 5}\\):",
    "items": [
      "Substitute \\(x = 5\\) to identify the indeterminate form \\(\\frac{0}{0}\\).",
      "Factor difference of squares in numerator: \\((x - 5)(x + 5)\\).",
      "Cancel common factor \\((x - 5)\\) for \\(x \\neq 5\\).",
      "Obtain reduced expression: \\(x + 5\\).",
      "Substitute \\(x = 5\\): \\(5 + 5 = 10\\)."
    ],
    "items_ar": [
      "التعويض بـ \\(x = 5\\) لتحديد الصيغة غير المعينة \\(\\frac{0}{0}\\).",
      "تحليل الفرق بين مربعين في البسط: \\((x - 5)(x + 5)\\).",
      "اختصار العامل المشترك \\((x - 5)\\) حيث \\(x \\neq 5\\).",
      "الحصول على المقدار المبسط: \\(x + 5\\).",
      "التعويض بـ \\(x = 5\\): \\(5 + 5 = 10\\)."
    ]
  },
  {
    "t": "cat",
    "ti": "Derivative Operations: Find f'(x)",
    "ti_ar": "تصنيف المشتقات: طبيعة الدالة المشتقة f'(x)",
    "categories": [
      "Constant Derivative",
      "Linear Derivative",
      "Quadratic Derivative"
    ],
    "categories_ar": [
      "مشتقة ثابتة",
      "مشتقة خطية",
      "مشتقة تربيعية"
    ],
    "items": [
      {
        "s": "\\(f(x) = 5x - 8\\)",
        "s_ar": "\\(f(x) = 5x - 8\\)",
        "cat": 0
      },
      {
        "s": "\\(f(x) = 3x^2 + 4x\\)",
        "s_ar": "\\(f(x) = 3x^2 + 4x\\)",
        "cat": 1
      },
      {
        "s": "\\(f(x) = x^3 - 6x\\)",
        "s_ar": "\\(f(x) = x^3 - 6x\\)",
        "cat": 2
      },
      {
        "s": "\\(f(x) = -12x + 100\\)",
        "s_ar": "\\(f(x) = -12x + 100\\)",
        "cat": 0
      },
      {
        "s": "\\(f(x) = -x^2 + 9\\)",
        "s_ar": "\\(f(x) = -x^2 + 9\\)",
        "cat": 1
      },
      {
        "s": "\\(f(x) = 2x^3 - 5x^2 + 1\\)",
        "s_ar": "\\(f(x) = 2x^3 - 5x^2 + 1\\)",
        "cat": 2
      }
    ]
  },
  {
    "t": "se",
    "ti": "Spot the Error: Chain Rule & Product Rule Differentiation (Introductory Calculus)",
    "ti_ar": "اكتشف الخطأ: قاعدتا السلسلة والضرب في الاشتقاق (مقدمة في التفاضل والتكامل والنهايات)",
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
    "ti": "Examiner Mode: Indeterminate Limit & Tangent Line (Introductory Calculus)",
    "ti_ar": "وضع المصحح: النهايات غير المعينة ومعادلة المماس (مقدمة في التفاضل والتكامل والنهايات)",
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
    "ti": "Matching: Continuity, Derivatives & Concavity Criteria (Introductory Calculus)",
    "ti_ar": "مطابقة: شروط الاتصال والاشتقاق والتقعر (مقدمة في التفاضل والتكامل والنهايات)",
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
    "ti": "Quick Check: Standard Trigonometric Limit (Introductory Calculus)",
    "ti_ar": "فحص سريع: النهاية المثلثية القياسية (مقدمة في التفاضل والتكامل والنهايات)",
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
D["est2l2-probability"] = [
  {
    "t": "sb",
    "ti": "Lab Step Builder: Permutations & Combinations",
    "ti_ar": "بناء الخطوات: التباديل والتوافيق",
    "steps": [
      {
        "l": "Number of ways to choose a committee of 3 from 7 people \\(\\binom{7}{3} = \\dfrac{7\\times6\\times5}{3\\times2\\times1} =\\)",
        "l_ar": "عدد طرق اختيار لجنة من 3 أفراد من بين 7 أشخاص \\(\\binom{7}{3} = \\dfrac{7\\times6\\times5}{3\\times2\\times1} =\\)",
        "a": "35",
        "h": "\\(210 / 6 = 35\\)",
        "h_ar": "\\(210 / 6 = 35\\)"
      },
      {
        "l": "Number of ways to arrange 4 distinct books on a shelf: \\(4! =\\)",
        "l_ar": "عدد طرق ترتيب 4 كتب متمايزة على رف: \\(4! =\\)",
        "a": "24",
        "h": "\\(4\\times3\\times2\\times1 = 24\\)",
        "h_ar": "\\(4\\times3\\times2\\times1 = 24\\)"
      }
    ]
  },
  {
    "t": "qc",
    "ti": "Lab Check: Conditional Probability",
    "ti_ar": "فحص سريع: الاحتمال المشروط",
    "q": "If \\(P(A) = 0.4\\), \\(P(B) = 0.5\\), and \\(P(A \\cap B) = 0.2\\), find \\(P(A \\mid B)\\):",
    "q_ar": "إذا كان \\(P(A) = 0.4\\) و \\(P(B) = 0.5\\) و \\(P(A \\cap B) = 0.2\\)، فأوجد \\(P(A \\mid B)\\):",
    "o": [
      "0.4",
      "0.5",
      "0.2",
      "0.8"
    ],
    "o_ar": [
      "0.4",
      "0.5",
      "0.2",
      "0.8"
    ],
    "a": 0,
    "ex": "\\(P(A \\mid B) = \\dfrac{P(A \\cap B)}{P(B)} = \\dfrac{0.2}{0.5} = 0.4\\). Since \\(P(A \\mid B) = P(A)\\), events \\(A\\) and \\(B\\) are independent.",
    "ex_ar": "\\(P(A \\mid B) = \\dfrac{P(A \\cap B)}{P(B)} = \\dfrac{0.2}{0.5} = 0.4\\). وبما أن \\(P(A \\mid B) = P(A)\\)، فإن الحادثتين \\(A\\) و \\(B\\) مستقلتان."
  },
  {
    "t": "num",
    "ti": "Numeric Lab: Combination Calculation",
    "ti_ar": "إدخال رقمي: حساب التوافيق",
    "q": "How many distinct 3-person subcommittees can be selected from a board of 8 members?",
    "q_ar": "كم لجنة فرعية متمايزة مكونة من 3 أعضاء يمكن اختيارها من مجلس يضم 8 أعضاء؟",
    "a": 56,
    "tol": 0.01,
    "h": "\\(\\binom{8}{3} = \\dfrac{8 \\times 7 \\times 6}{3 \\times 2 \\times 1}\\).",
    "h_ar": "\\(\\binom{8}{3} = \\dfrac{8 \\times 7 \\times 6}{3 \\times 2 \\times 1}\\).",
    "sol": "\\(\\binom{8}{3} = \\dfrac{8 \\times 7 \\times 6}{6} = 8 \\times 7 = 56\\).",
    "sol_ar": "\\(\\binom{8}{3} = \\dfrac{8 \\times 7 \\times 6}{6} = 8 \\times 7 = 56\\)."
  },
  {
    "t": "ord",
    "ti": "Probability: Addition Rule Sequence",
    "ti_ar": "رتّب الخطوات: قاعدة جمع الاحتمالات",
    "q": "Arrange the steps to find \\(P(A \\cup B)\\) for events \\(A\\) and \\(B\\):",
    "q_ar": "رتب خطوات إيجاد احتمال الاتحاد \\(P(A \\cup B)\\) للحادثتين \\(A\\) و \\(B\\):",
    "items": [
      "Determine individual probability \\(P(A)\\).",
      "Determine individual probability \\(P(B)\\).",
      "Identify overlap probability \\(P(A \\cap B)\\).",
      "Apply formula: \\(P(A \\cup B) = P(A) + P(B) - P(A \\cap B)\\).",
      "Simplify the resulting fraction to lowest terms."
    ],
    "items_ar": [
      "تحديد الاحتمال الفردي للحادثة \\(P(A)\\).",
      "تحديد الاحتمال الفردي للحادثة \\(P(B)\\).",
      "تحديد احتمال التقاطع المشترك \\(P(A \\cap B)\\).",
      "تطبيق القانون: \\(P(A \\cup B) = P(A) + P(B) - P(A \\cap B)\\).",
      "تبسيط الكسر الناتج إلى أبسط صورة."
    ]
  },
  {
    "t": "cat",
    "ti": "Counting Techniques: Permutation vs Combination",
    "ti_ar": "تصنيف: التباديل مقابل التوافيق",
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
        "s": "Assigning 1st, 2nd, and 3rd place in a race",
        "s_ar": "تحديد المراكز الأول والثاني والثالث في سباق",
        "cat": 0
      },
      {
        "s": "Selecting a committee of 4 students",
        "s_ar": "اختيار لجنة من 4 طلاب",
        "cat": 1
      },
      {
        "s": "Creating a 4-digit PIN code without repetition",
        "s_ar": "إنشاء رمز سري (PIN) من 4 أرقام دون تكرار",
        "cat": 0
      },
      {
        "s": "Choosing 3 toppings for a pizza",
        "s_ar": "اختيار 3 إضافات لبيتزا",
        "cat": 1
      },
      {
        "s": "Electing a President, Vice President, and Secretary",
        "s_ar": "انتخاب رئيس ونائب رئيس وأمين سر",
        "cat": 0
      },
      {
        "s": "Drawing a hand of 5 cards from a deck",
        "s_ar": "سحب يد من 5 بطاقات من أوراق اللعب",
        "cat": 1
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
  },
  {
    "t": "qc",
    "ti": "Quick Check: Normal Empirical Rule (68–95–99.7%) & Binomial Trials",
    "ti_ar": "فحص سريع: القاعدة التجريبية للتوزيع الطبيعي وتجارب ذات الحدين",
    "q": "Test scores are approximately normal with mean \\(\\mu = 500\\) and standard deviation \\(\\sigma = 100\\). By the 68–95–99.7% rule, approximately what percentage of scores lie above \\(700\\)?",
    "q_ar": "تتبع درجات اختبار توزيعاً طبيعياً بمتوسط \\(\\mu = 500\\) وانحراف معياري \\(\\sigma = 100\\). بحسب قاعدة 68–95–99.7%، ما النسبة التقريبية للدرجات الأعلى من \\(700\\)؟",
    "o": [
      "\\(2.5\\%\\)",
      "\\(5\\%\\)",
      "\\(16\\%\\)",
      "\\(0.15\\%\\)"
    ],
    "o_ar": [
      "\\(2.5\\%\\)",
      "\\(5\\%\\)",
      "\\(16\\%\\)",
      "\\(0.15\\%\\)"
    ],
    "a": 0,
    "ex": "\\(700 = \\mu + 2\\sigma\\). Since \\(95\\%\\) of normal data lies within \\(\\mu \\pm 2\\sigma\\), the remaining \\(5\\%\\) is split symmetrically between the two tails, leaving \\(2.5\\%\\) above \\(700\\).",
    "ex_ar": "الدرجة \\(700 = \\mu + 2\\sigma\\). بما أن \\(95\\%\\) تقع ضمن \\(\\pm 2\\sigma\\)، تتوزع \\(5\\%\\) بالتساوي على الذيلين، فيقع \\(2.5\\%\\) فوق \\(700\\)."
  }
];
D["est2l2-trig-polar-conics"] = [
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
    "ti": "Numeric Entry: Polar-to-Cartesian x-Coordinate (Trigonometry, Polar Coordinates, Conic Sections & 3D Geometry)",
    "ti_ar": "إدخال رقمي: الإحداثي السيني لنقطة قطبية (حساب المثلثات والإحداثيات القطبية والقطوع المخروطية والهندسة الفراغية (EST II L2))",
    "q": "Find the Cartesian \\(x\\)-coordinate of the polar point \\((r, \\theta) = (4, \\frac{\\pi}{3})\\).",
    "q_ar": "أوجد الإحداثي السيني \\(x\\) للنقطة القطبية \\((r, \\theta) = (4, \\frac{\\pi}{3})\\).",
    "a": "2",
    "ex": "\\(x = r\\cos(\\pi/3) = 4 \\cdot \\frac{1}{2} = 2\\).",
    "ex_ar": "\\(x = r\\cos(\\pi/3) = 4 \\cdot \\frac{1}{2} = 2\\)."
  },
  {
    "t": "ord",
    "ti": "Order the Steps: Finding Foci & Eccentricity of an Ellipse from General Form",
    "ti_ar": "ترتيب الخطوات: إيجاد البؤرتين والاختلاف المركزي للقطع الناقص",
    "q": "Order the algebraic steps to find the foci and eccentricity of \\(9x^2 + 25y^2 - 36x + 36 - 225 = 0\\):",
    "q_ar": "رتّب الخطوات الجبرية لإيجاد البؤرتين والاختلاف المركزي للقطع الناقص:",
    "items": [
      "Group x-terms and y-terms and factor out leading coefficients 9 and 25",
      "Complete the square inside the x-group and balance the constant on the right-hand side",
      "Divide both sides by 225 to obtain standard form (x - h)² / a² + (y - k)² / b² = 1",
      "Compute focal distance c = √(a² - b²) and locate foci at (h ± c, k) with eccentricity e = c / a"
    ],
    "items_ar": [
      "تجميع حدود x وحدود y وإخراج المعاملين الرئيسيين 9 و25 عاملاً مشتركاً",
      "إكمال المربع لحدود x وموازنة الثابت في الطرف الأيمن",
      "قسمة الطرفين على 225 للوصول إلى الصورة القياسية للقطع الناقص",
      "حساب البعد البؤري c = √(a² - b²) وتحديد البؤرتين والاختلاف المركزي e = c / a"
    ]
  },
  {
    "t": "cat",
    "ti": "Categorize: Polar Curve Families (Trigonometry, Polar Coordinates, Conic Sections & 3D Geometry)",
    "ti_ar": "تصنيف: عائلات المنحنيات القطبية (حساب المثلثات والإحداثيات القطبية والقطوع المخروطية والهندسة الفراغية (EST II L2))",
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
        "s": "\\(r = 4\\sin\\theta\\)",
        "cat": 0
      },
      {
        "s": "\\(r = 3\\cos(3\\theta)\\)",
        "cat": 1
      },
      {
        "s": "\\(r = 3(1 + \\cos\\theta)\\)",
        "cat": 2
      }
    ],
    "items_ar": [
      {
        "s": "\\(r = 4\\sin\\theta\\)",
        "cat": 0
      },
      {
        "s": "\\(r = 3\\cos(3\\theta)\\)",
        "cat": 1
      },
      {
        "s": "\\(r = 3(1 + \\cos\\theta)\\)",
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
    "ti": "Examiner Mode: Parametric Slope & Polar Conversion (Trigonometry, Polar Coordinates, Conic Sections & 3D Geometry)",
    "ti_ar": "وضع المصحح: ميل المنحنى البارامتري والتحويل القطبي (حساب المثلثات والإحداثيات القطبية والقطوع المخروطية والهندسة الفراغية (EST II L2))",
    "q": "(a) A particle moves with \\(x(t) = t^2\\) and \\(y(t) = t^3 - 3t\\). Find \\(\\dfrac{dy}{dx}\\) at \\(t = 2\\). (b) Convert the polar point \\((r, \\theta) = (4, \\frac{\\pi}{3})\\) to exact Cartesian coordinates.",
    "q_ar": "(أ) يتحرك جسيم وفق \\(x(t) = t^2\\) و\\(y(t) = t^3 - 3t\\). أوجد \\(\\dfrac{dy}{dx}\\) عند \\(t = 2\\). (ب) حوّل النقطة القطبية \\((4, \\frac{\\pi}{3})\\) إلى الإحداثيات الديكارتية الدقيقة.",
    "parts": [
      {
        "label": "Part (a) — Parametric Tangent Slope",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "\\(x'(2) = 4,\\; y'(2) = 12 - 3 = 9\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "\\(\\left.\\dfrac{dy}{dx}\\right|_{t=2} = \\dfrac{9}{4}\\)."
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
            "text": "\\(x = 4\\cos(\\pi/3) = 2\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "\\(y = 4\\sin(\\pi/3) = 2\\sqrt{3}\\)."
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
            "text": "\\(x'(2) = 4,\\; y'(2) = 9\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "\\(\\left.\\dfrac{dy}{dx}\\right|_{t=2} = \\dfrac{9}{4}\\)."
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
            "text": "\\(x = 4\\cos(\\pi/3) = 2\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "\\(y = 4\\sin(\\pi/3) = 2\\sqrt{3}\\)."
          }
        ]
      }
    ]
  },
  {
    "t": "sb",
    "ti": "Step Builder: Polar Coordinates & Parametric Speed (Trigonometry, Polar Coordinates, Conic Sections & 3D Geometry)",
    "ti_ar": "بناء الخطوات: الإحداثيات القطبية والسرعة البارامترية (حساب المثلثات والإحداثيات القطبية والقطوع المخروطية والهندسة الفراغية (EST II L2))",
    "steps": [
      {
        "l": "For polar point \\((4, \\pi/3)\\), compute \\(x = r\\cos(\\pi/3) =\\)",
        "a": "2",
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
        "l": "للنقطة القطبية \\((4, \\pi/3)\\)، احسب \\(x = r\\cos(\\pi/3) =\\)",
        "a": "2",
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
