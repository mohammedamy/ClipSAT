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
    "ti_ar": "وضع المصحح: إكمال المربع والدالة العكسية (Test format & strategy)",
    "q_ar": "لتكن \\(f(x) = x^2 - 8x + 15\\) حيث \\(x \\ge 4\\). (أ) اكتب \\(f(x)\\) في صورة المربع الكامل وحدد مداها. (ب) أوجد قاعدة الدالة العكسية \\(f^{-1}(x)\\) ومجالها.",
    "examinerTip_ar": "الدالة العكسية يجب أن تكون وحيدة القيمة، لذا نختار الإشارة الموجبة للجذر \\(4 + \\sqrt{x - -1}\\) لأن \\(x \\ge 4\\)."
  },
  {
    "t": "sb",
    "ti": "Step Builder: Completing the Square & Vertex Analysis (Test format & strategy)",
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
    "ti_ar": "بناء الخطوات: إكمال المربع وإيجاد القيمة الصغرى (Test format & strategy)",
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
    "ti": "Matching: Core Algebraic & Analytic Principles (Test format & strategy)",
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
    "ti_ar": "مطابقة: المبادئ الجبرية والتحليلية الأساسية (Test format & strategy)",
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
    "ti": "Spot the Error: Algebraic & Domain Verification (Complex Numbers)",
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
    "ti_ar": "اكتشف الخطأ: الجذور الدخيلة والتحقق من المجال (Complex Numbers)",
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
    "ti": "Examiner Mode: Multi-Step Structured Problem (Complex Numbers)",
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
    "ti_ar": "وضع المصحح: إكمال المربع والدالة العكسية (Complex Numbers)",
    "q_ar": "لتكن \\(f(x) = x^2 - 6x + 10\\) حيث \\(x \\ge 3\\). (أ) اكتب \\(f(x)\\) في صورة المربع الكامل وحدد مداها. (ب) أوجد قاعدة الدالة العكسية \\(f^{-1}(x)\\) ومجالها.",
    "examinerTip_ar": "الدالة العكسية يجب أن تكون وحيدة القيمة، لذا نختار الإشارة الموجبة للجذر \\(3 + \\sqrt{x - 1}\\) لأن \\(x \\ge 3\\)."
  },
  {
    "t": "mt",
    "ti": "Matching: Core Algebraic & Analytic Principles (Complex Numbers)",
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
    "ti_ar": "مطابقة: المبادئ الجبرية والتحليلية الأساسية (Complex Numbers)",
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
    "ti": "Quick Check: Vertex & Minimum Analysis (Complex Numbers)",
    "ti_ar": "فحص سريع: تحليل نقطة الرأس والقيمة الصغرى (Complex Numbers)",
    "q": "What is the minimum value of \\( f(x) = (x - 4)^2 + 6 \\) over all real \\( x \\)?",
    "q_ar": "ما هي القيمة الصغرى للدالة \\( f(x) = (x - 4)^2 + 6 \\) لكل \\( x \\in \\mathbb{R} \\)؟",
    "o": [
      "\\( 6 \\)",
      "\\( 4 \\)",
      "\\( -4 \\)",
      "\\( 22 \\)"
    ],
    "o_ar": [
      "\\( 6 \\)",
      "\\( 4 \\)",
      "\\( -4 \\)",
      "\\( 22 \\)"
    ],
    "a": 0,
    "ex": "Since \\( (x - 4)^2 \\ge 0 \\), the minimum value is \\( 6 \\) achieved at \\( x = 4 \\).",
    "ex_ar": "بما أن المربع الكامل غير سالب، فإن القيمة الصغرى هي \\( 6 \\) عند \\( x = 4 \\)."
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
    "ti": "Spot the Error: Algebraic & Domain Verification (Sequences & Series)",
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
    "ti_ar": "اكتشف الخطأ: الجذور الدخيلة والتحقق من المجال (Sequences & Series)",
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
    "ti": "Examiner Mode: Multi-Step Structured Problem (Sequences & Series)",
    "q": "Let \\(f(x) = x^2 - 4x + 6\\) for \\(x \\ge 2\\). (a) Express \\(f(x)\\) in completed-square vertex form and state the range of \\(f\\). (b) Find an expression for the inverse function \\(f^{-1}(x)\\) and state its domain.",
    "parts": [
      {
        "label": "Part (a) — Vertex Form & Range",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "Complete the square: \\(f(x) = (x - 2)^2 - 4 + 6 = (x - 2)^2 + 2\\)."
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
            "text": "Set \\(y = (x - 2)^2 + 2 \\implies (x - 2)^2 = y - 2\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "Select positive branch (since \\(x \\ge 2\\)): \\(f^{-1}(x) = 2 + \\sqrt{x - 2}\\)."
          },
          {
            "code": "B1",
            "marks": 1,
            "text": "State domain of \\(f^{-1}\\): \\(x \\ge 2\\) (matching the range of \\(f\\))."
          }
        ]
      }
    ],
    "examinerTip": "Writing \\(\\pm\\sqrt{x - 2}\\) for \\(f^{-1}(x)\\) loses the final A1 mark because a function must be single-valued; use the domain restriction \\(x \\ge 2\\) to choose the \\(+\\) sign.",
    "ti_ar": "وضع المصحح: إكمال المربع والدالة العكسية (Sequences & Series)",
    "q_ar": "لتكن \\(f(x) = x^2 - 4x + 6\\) حيث \\(x \\ge 2\\). (أ) اكتب \\(f(x)\\) في صورة المربع الكامل وحدد مداها. (ب) أوجد قاعدة الدالة العكسية \\(f^{-1}(x)\\) ومجالها.",
    "examinerTip_ar": "الدالة العكسية يجب أن تكون وحيدة القيمة، لذا نختار الإشارة الموجبة للجذر \\(2 + \\sqrt{x - 2}\\) لأن \\(x \\ge 2\\)."
  },
  {
    "t": "sb",
    "ti": "Step Builder: Completing the Square & Vertex Analysis (Sequences & Series)",
    "steps": [
      {
        "l": "In \\(y = x^2 - 4x + 6\\), halve the \\(x\\)-coefficient to write \\((x - h)^2\\) where \\(h =\\)",
        "a": "2",
        "h": "Take half of 4."
      },
      {
        "l": "Compute the minimum value \\(k = 6 - 2^2 =\\)",
        "a": "2",
        "h": "Subtract 4 from 6."
      },
      {
        "l": "Evaluate \\(y\\) when \\(x = 4\\): \\(y =\\)",
        "a": "6",
        "h": "Compute \\((2)^2 + 2\\)."
      }
    ],
    "ti_ar": "بناء الخطوات: إكمال المربع وإيجاد القيمة الصغرى (Sequences & Series)",
    "steps_ar": [
      {
        "l": "في الدالة \\(y = x^2 - 4x + 6\\): قيمة \\(h\\) في \\((x - h)^2\\) تساوي:",
        "a": "2",
        "h": "اقسم معامل x وهو 4 على 2."
      },
      {
        "l": "احسب القيمة الصغرى \\(k = 6 - 2^2 =\\)",
        "a": "2",
        "h": "اطرح 4 من 6."
      },
      {
        "l": "احسب قيمة \\(y\\) عندما \\(x = 4\\):",
        "a": "6",
        "h": "احسب \\(4 + 2\\)."
      }
    ]
  },
  {
    "t": "qc",
    "ti": "Quick Check: Vertex & Minimum Analysis (Sequences & Series)",
    "ti_ar": "فحص سريع: تحليل نقطة الرأس والقيمة الصغرى (Sequences & Series)",
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
    "ti": "Spot the Error: Algebraic & Domain Verification (Functions & Graphs)",
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
    "ti_ar": "اكتشف الخطأ: الجذور الدخيلة والتحقق من المجال (Functions & Graphs)",
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
    "ti": "Examiner Mode: Multi-Step Structured Problem (Functions & Graphs)",
    "q": "Let \\(f(x) = x^2 - 6x + 12\\) for \\(x \\ge 3\\). (a) Express \\(f(x)\\) in completed-square vertex form and state the range of \\(f\\). (b) Find an expression for the inverse function \\(f^{-1}(x)\\) and state its domain.",
    "parts": [
      {
        "label": "Part (a) — Vertex Form & Range",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "Complete the square: \\(f(x) = (x - 3)^2 - 9 + 12 = (x - 3)^2 + 3\\)."
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
            "text": "Set \\(y = (x - 3)^2 + 3 \\implies (x - 3)^2 = y - 3\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "Select positive branch (since \\(x \\ge 3\\)): \\(f^{-1}(x) = 3 + \\sqrt{x - 3}\\)."
          },
          {
            "code": "B1",
            "marks": 1,
            "text": "State domain of \\(f^{-1}\\): \\(x \\ge 3\\) (matching the range of \\(f\\))."
          }
        ]
      }
    ],
    "examinerTip": "Writing \\(\\pm\\sqrt{x - 3}\\) for \\(f^{-1}(x)\\) loses the final A1 mark because a function must be single-valued; use the domain restriction \\(x \\ge 3\\) to choose the \\(+\\) sign.",
    "ti_ar": "وضع المصحح: إكمال المربع والدالة العكسية (Functions & Graphs)",
    "q_ar": "لتكن \\(f(x) = x^2 - 6x + 12\\) حيث \\(x \\ge 3\\). (أ) اكتب \\(f(x)\\) في صورة المربع الكامل وحدد مداها. (ب) أوجد قاعدة الدالة العكسية \\(f^{-1}(x)\\) ومجالها.",
    "examinerTip_ar": "الدالة العكسية يجب أن تكون وحيدة القيمة، لذا نختار الإشارة الموجبة للجذر \\(3 + \\sqrt{x - 3}\\) لأن \\(x \\ge 3\\)."
  },
  {
    "t": "sb",
    "ti": "Step Builder: Completing the Square & Vertex Analysis (Functions & Graphs)",
    "steps": [
      {
        "l": "In \\(y = x^2 - 6x + 12\\), halve the \\(x\\)-coefficient to write \\((x - h)^2\\) where \\(h =\\)",
        "a": "3",
        "h": "Take half of 6."
      },
      {
        "l": "Compute the minimum value \\(k = 12 - 3^2 =\\)",
        "a": "3",
        "h": "Subtract 9 from 12."
      },
      {
        "l": "Evaluate \\(y\\) when \\(x = 5\\): \\(y =\\)",
        "a": "7",
        "h": "Compute \\((2)^2 + 3\\)."
      }
    ],
    "ti_ar": "بناء الخطوات: إكمال المربع وإيجاد القيمة الصغرى (Functions & Graphs)",
    "steps_ar": [
      {
        "l": "في الدالة \\(y = x^2 - 6x + 12\\): قيمة \\(h\\) في \\((x - h)^2\\) تساوي:",
        "a": "3",
        "h": "اقسم معامل x وهو 6 على 2."
      },
      {
        "l": "احسب القيمة الصغرى \\(k = 12 - 3^2 =\\)",
        "a": "3",
        "h": "اطرح 9 من 12."
      },
      {
        "l": "احسب قيمة \\(y\\) عندما \\(x = 5\\):",
        "a": "7",
        "h": "احسب \\(4 + 3\\)."
      }
    ]
  },
  {
    "t": "mt",
    "ti": "Matching: Core Algebraic & Analytic Principles (Functions & Graphs)",
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
    "ti_ar": "مطابقة: المبادئ الجبرية والتحليلية الأساسية (Functions & Graphs)",
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
    "ti": "Spot the Error: Algebraic & Domain Verification (Matrices & Vectors)",
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
    "ti_ar": "اكتشف الخطأ: الجذور الدخيلة والتحقق من المجال (Matrices & Vectors)",
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
    "ti": "Examiner Mode: Multi-Step Structured Problem (Matrices & Vectors)",
    "q": "Let \\(f(x) = x^2 - 8x + 19\\) for \\(x \\ge 4\\). (a) Express \\(f(x)\\) in completed-square vertex form and state the range of \\(f\\). (b) Find an expression for the inverse function \\(f^{-1}(x)\\) and state its domain.",
    "parts": [
      {
        "label": "Part (a) — Vertex Form & Range",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "Complete the square: \\(f(x) = (x - 4)^2 - 16 + 19 = (x - 4)^2 + 3\\)."
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
            "text": "Set \\(y = (x - 4)^2 + 3 \\implies (x - 4)^2 = y - 3\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "Select positive branch (since \\(x \\ge 4\\)): \\(f^{-1}(x) = 4 + \\sqrt{x - 3}\\)."
          },
          {
            "code": "B1",
            "marks": 1,
            "text": "State domain of \\(f^{-1}\\): \\(x \\ge 3\\) (matching the range of \\(f\\))."
          }
        ]
      }
    ],
    "examinerTip": "Writing \\(\\pm\\sqrt{x - 3}\\) for \\(f^{-1}(x)\\) loses the final A1 mark because a function must be single-valued; use the domain restriction \\(x \\ge 4\\) to choose the \\(+\\) sign.",
    "ti_ar": "وضع المصحح: إكمال المربع والدالة العكسية (Matrices & Vectors)",
    "q_ar": "لتكن \\(f(x) = x^2 - 8x + 19\\) حيث \\(x \\ge 4\\). (أ) اكتب \\(f(x)\\) في صورة المربع الكامل وحدد مداها. (ب) أوجد قاعدة الدالة العكسية \\(f^{-1}(x)\\) ومجالها.",
    "examinerTip_ar": "الدالة العكسية يجب أن تكون وحيدة القيمة، لذا نختار الإشارة الموجبة للجذر \\(4 + \\sqrt{x - 3}\\) لأن \\(x \\ge 4\\)."
  },
  {
    "t": "mt",
    "ti": "Matching: Core Algebraic & Analytic Principles (Matrices & Vectors)",
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
    "ti_ar": "مطابقة: المبادئ الجبرية والتحليلية الأساسية (Matrices & Vectors)",
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
    "ti": "Quick Check: Vertex & Minimum Analysis (Matrices & Vectors)",
    "ti_ar": "فحص سريع: تحليل نقطة الرأس والقيمة الصغرى (Matrices & Vectors)",
    "q": "What is the minimum value of \\( f(x) = (x - 7)^2 + 9 \\) over all real \\( x \\)?",
    "q_ar": "ما هي القيمة الصغرى للدالة \\( f(x) = (x - 7)^2 + 9 \\) لكل \\( x \\in \\mathbb{R} \\)؟",
    "o": [
      "\\( 9 \\)",
      "\\( 7 \\)",
      "\\( -7 \\)",
      "\\( 58 \\)"
    ],
    "o_ar": [
      "\\( 9 \\)",
      "\\( 7 \\)",
      "\\( -7 \\)",
      "\\( 58 \\)"
    ],
    "a": 0,
    "ex": "Since \\( (x - 7)^2 \\ge 0 \\), the minimum value is \\( 9 \\) achieved at \\( x = 7 \\).",
    "ex_ar": "بما أن المربع الكامل غير سالب، فإن القيمة الصغرى هي \\( 9 \\) عند \\( x = 7 \\)."
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
    "ti": "Spot the Error: Implicit Differentiation & Product Rule (Introductory Calculus)",
    "q": "A student differentiates the implicit curve \\(x^2 + 5xy + y^2 = 15\\) with respect to \\(x\\). Identify the step with the mathematical flaw:",
    "steps": [
      "Differentiate \\(x^2\\) with respect to \\(x\\) to obtain \\(2x\\).",
      "Differentiate the middle term \\(5xy\\) with respect to \\(x\\) as \\(5\\dfrac{dy}{dx}\\).",
      "Differentiate \\(y^2\\) using the Chain Rule as \\(2y\\dfrac{dy}{dx}\\) and the constant \\(15\\) as \\(0\\).",
      "Collect \\(\\dfrac{dy}{dx}\\) terms and divide to isolate \\(\\dfrac{dy}{dx}\\)."
    ],
    "errorStep": 2,
    "reasons": [
      "The term \\(5xy\\) is a product of two functions of \\(x\\); by the Product Rule its derivative is \\(5y + 5x\\dfrac{dy}{dx}\\), not \\(5\\dfrac{dy}{dx}\\).",
      "The derivative of \\(y^2\\) with respect to \\(x\\) is simply \\(2y\\) without \\(\\dfrac{dy}{dx}\\).",
      "The constant \\(15\\) remains \\(15\\) after differentiation."
    ],
    "correctReason": 0,
    "h": "Look closely at how the product \\(5xy\\) was differentiated in Step 2.",
    "sol": "Applying the Product Rule to \\(5xy\\) gives \\(5y + 5x\\dfrac{dy}{dx}\\). Thus \\(2x + 5y + (5x + 2y)\\dfrac{dy}{dx} = 0 \\implies \\dfrac{dy}{dx} = -\\dfrac{2x + 5y}{5x + 2y}\\).",
    "ti_ar": "اكتشف الخطأ: الاشتقاق الضمني وقاعدة الضرب (Introductory Calculus)",
    "q_ar": "يقوم طالب باشتقاق العلاقة الضمنية \\(x^2 + 5xy + y^2 = 15\\) بالنسبة إلى \\(x\\). حدد الخطوة الخاطئة:",
    "steps_ar": [
      "اشتقاق \\(x^2\\) بالنسبة إلى \\(x\\) ليعطي \\(2x\\).",
      "اشتقاق الحد الأوسط \\(5xy\\) بالنسبة إلى \\(x\\) على أنه \\(5\\dfrac{dy}{dx}\\).",
      "اشتقاق \\(y^2\\) بقاعدة السلسلة ليعطي \\(2y\\dfrac{dy}{dx}\\) ومشتقة الثابت \\(0\\).",
      "تجميع حدود \\(\\dfrac{dy}{dx}\\) وقسمة الطرفين لعزل المشتقة."
    ],
    "reasons_ar": [
      "الحد \\(5xy\\) حاصل ضرب دالتين في \\(x\\)؛ وبقاعدة الضرب مشتقته هي \\(5y + 5x\\dfrac{dy}{dx}\\).",
      "مشتقة \\(y^2\\) هي \\(2y\\) فقط دون \\(\\dfrac{dy}{dx}\\).",
      "مشتقة الثابت تبقى كما هي."
    ],
    "h_ar": "راجع كيفية اشتقاق حاصل الضرب \\(5xy\\) في الخطوة الثانية.",
    "sol_ar": "بتطبيق قاعدة الضرب على \\(5xy\\) نحصل على \\(5y + 5x\\dfrac{dy}{dx}\\)، ومنه \\(\\dfrac{dy}{dx} = -\\dfrac{2x + 5y}{5x + 2y}\\)."
  },
  {
    "t": "ms",
    "ti": "Examiner Mode: Tangent, Normal & Stationary Points (Introductory Calculus)",
    "q": "Consider the curve \\(y = 5x^3 - 3x^2 + 4\\). (a) Find \\(\\dfrac{dy}{dx}\\) and the gradient of the tangent at \\(x = 2\\). (b) Find the \\(x\\)-coordinates of the stationary points.",
    "parts": [
      {
        "label": "Part (a) — First Derivative & Tangent Gradient",
        "marks": 3,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "Differentiate term by term using the power rule: \\(\\dfrac{dy}{dx} = 15x^2 - 6x\\)."
          },
          {
            "code": "M1",
            "marks": 1,
            "text": "Substitute \\(x = 2\\): \\(m = 15(2)^2 - 6(2)\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "Obtain exact tangent gradient \\(m = 54\\)."
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
            "text": "Set \\(\\dfrac{dy}{dx} = 0 \\implies x(15x - 6) = 0\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "State both stationary \\(x\\)-coordinates: \\(x = 0\\) and \\(x = \\dfrac{6}{15}\\)."
          }
        ]
      }
    ],
    "examinerTip": "Always show the explicit equation \\(\\dfrac{dy}{dx} = 0\\) before solving for stationary points—this earns the M1 method mark even if an arithmetic slip occurs.",
    "ti_ar": "وضع المصحح: المماس والنقاط الحرجة (Introductory Calculus)",
    "q_ar": "لمنحنى الدالة \\(y = 5x^3 - 3x^2 + 4\\): (أ) أوجد \\(\\dfrac{dy}{dx}\\) وميل المماس عند \\(x = 2\\). (ب) أوجد الإحداثيات السينية للنقاط الحرجة.",
    "examinerTip_ar": "اكتب دائماً شرط النقطة الحرجة \\(\\dfrac{dy}{dx} = 0\\) صراحةً لضمان الحصول على درجة الطريقة (M1)."
  },
  {
    "t": "mt",
    "ti": "Matching: Differentiation Rules & Analytic Criteria (Introductory Calculus)",
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
    "ti_ar": "مطابقة: قواعد الاشتقاق ومعايير القيم القصوى (Introductory Calculus)",
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
  },
  {
    "t": "qc",
    "ti": "Quick Check: Vertex & Minimum Analysis (Introductory Calculus)",
    "ti_ar": "فحص سريع: تحليل نقطة الرأس والقيمة الصغرى (Introductory Calculus)",
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
    "ti": "Spot the Error: Algebraic & Domain Verification (Probability)",
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
    "ti_ar": "اكتشف الخطأ: الجذور الدخيلة والتحقق من المجال (Probability)",
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
    "ti": "Examiner Mode: Multi-Step Structured Problem (Probability)",
    "q": "Let \\(f(x) = x^2 - 10x + 30\\) for \\(x \\ge 5\\). (a) Express \\(f(x)\\) in completed-square vertex form and state the range of \\(f\\). (b) Find an expression for the inverse function \\(f^{-1}(x)\\) and state its domain.",
    "parts": [
      {
        "label": "Part (a) — Vertex Form & Range",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "Complete the square: \\(f(x) = (x - 5)^2 - 25 + 30 = (x - 5)^2 + 5\\)."
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
            "text": "Set \\(y = (x - 5)^2 + 5 \\implies (x - 5)^2 = y - 5\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "Select positive branch (since \\(x \\ge 5\\)): \\(f^{-1}(x) = 5 + \\sqrt{x - 5}\\)."
          },
          {
            "code": "B1",
            "marks": 1,
            "text": "State domain of \\(f^{-1}\\): \\(x \\ge 5\\) (matching the range of \\(f\\))."
          }
        ]
      }
    ],
    "examinerTip": "Writing \\(\\pm\\sqrt{x - 5}\\) for \\(f^{-1}(x)\\) loses the final A1 mark because a function must be single-valued; use the domain restriction \\(x \\ge 5\\) to choose the \\(+\\) sign.",
    "ti_ar": "وضع المصحح: إكمال المربع والدالة العكسية (Probability)",
    "q_ar": "لتكن \\(f(x) = x^2 - 10x + 30\\) حيث \\(x \\ge 5\\). (أ) اكتب \\(f(x)\\) في صورة المربع الكامل وحدد مداها. (ب) أوجد قاعدة الدالة العكسية \\(f^{-1}(x)\\) ومجالها.",
    "examinerTip_ar": "الدالة العكسية يجب أن تكون وحيدة القيمة، لذا نختار الإشارة الموجبة للجذر \\(5 + \\sqrt{x - 5}\\) لأن \\(x \\ge 5\\)."
  },
  {
    "t": "mt",
    "ti": "Matching: Core Algebraic & Analytic Principles (Probability)",
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
    "ti_ar": "مطابقة: المبادئ الجبرية والتحليلية الأساسية (Probability)",
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
    "ti": "Quick Check: Vertex & Minimum Analysis (Probability)",
    "ti_ar": "فحص سريع: تحليل نقطة الرأس والقيمة الصغرى (Probability)",
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

D["est2l2-trig-polar-conics"] = [
  {
    "t": "qc",
    "ti": "Quick Check: Vertex & Minimum Analysis (Trigonometry, Polar Coordinates, Conic Sections & 3D Geometry)",
    "ti_ar": "فحص سريع: تحليل نقطة الرأس والقيمة الصغرى (حساب المثلثات والإحداثيات القطبية والقطوع المخروطية والهندسة الفراغية (EST II L2))",
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
    "ti": "True / False: Core Mathematical Properties (Trigonometry, Polar Coordinates, Conic Sections & 3D Geometry)",
    "ti_ar": "صح / خطأ: الخصائص الرياضية الأساسية (حساب المثلثات والإحداثيات القطبية والقطوع المخروطية والهندسة الفراغية (EST II L2))",
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
    "ti": "Matching: Algebraic & Analytical Identities (Trigonometry, Polar Coordinates, Conic Sections & 3D Geometry)",
    "ti_ar": "مطابقة: المتطابقات والعلاقات التحليلية (حساب المثلثات والإحداثيات القطبية والقطوع المخروطية والهندسة الفراغية (EST II L2))",
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
    "ti": "Numeric Entry: Exact Evaluation (Trigonometry, Polar Coordinates, Conic Sections & 3D Geometry)",
    "ti_ar": "إدخال رقمي: الحساب الدقيق (حساب المثلثات والإحداثيات القطبية والقطوع المخروطية والهندسة الفراغية (EST II L2))",
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
    "ti": "Order the Steps: Systematic Derivation (Trigonometry, Polar Coordinates, Conic Sections & 3D Geometry)",
    "ti_ar": "رتّب الخطوات: خطوات الاستنتاج المنظم (حساب المثلثات والإحداثيات القطبية والقطوع المخروطية والهندسة الفراغية (EST II L2))",
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
    "ti": "Categorize: Discriminant Classification (Trigonometry, Polar Coordinates, Conic Sections & 3D Geometry)",
    "ti_ar": "تصنيف: تصنيف المعادلات حسب المميز (حساب المثلثات والإحداثيات القطبية والقطوع المخروطية والهندسة الفراغية (EST II L2))",
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
    "ti": "Spot the Error: Extraneous Root Check (Trigonometry, Polar Coordinates, Conic Sections & 3D Geometry)",
    "ti_ar": "اكتشف الخطأ: التحقق من الجذور الدخيلة (حساب المثلثات والإحداثيات القطبية والقطوع المخروطية والهندسة الفراغية (EST II L2))",
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
    "ti": "Examiner Mode: Multi-Step Rubric Problem (Trigonometry, Polar Coordinates, Conic Sections & 3D Geometry)",
    "ti_ar": "وضع المصحح: مسألة متعددة الخطوات (حساب المثلثات والإحداثيات القطبية والقطوع المخروطية والهندسة الفراغية (EST II L2))",
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
    "ti": "Step Builder: Guided Calculation (Trigonometry, Polar Coordinates, Conic Sections & 3D Geometry)",
    "ti_ar": "بناء الخطوات: حساب موجه (حساب المثلثات والإحداثيات القطبية والقطوع المخروطية والهندسة الفراغية (EST II L2))",
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
