/* Interactive Practice data for /precalc/ - one entry per chapter section id.
   Shipped as public/js/ix/precalc.js and loaded only on that track's page by the
   engine in src/scripts/modules/19-interactive-activities-engine-v1.js
   (Plan 5 Phase 5.015, ADR 0033). Entry shapes (qc/mt/tf/sb/sr/fn/num/ord/cat/gp/se/ms) are
   documented there. */
(window.__ixData = window.__ixData || []).push(function (D) {
D["pc-trig"] = [
  {
    "t": "qc",
    "ti": "Quick Check: Degrees to Radians",
    "ti_ar": "فحص سريع: التحويل من الدرجات إلى الراديان",
    "q": "Convert \\(150°\\) to radians",
    "q_ar": "حوّل \\(150°\\) إلى راديان",
    "o": [
      "5π/6",
      "2π/3",
      "3π/4",
      "π"
    ],
    "o_ar": [
      "5π/6",
      "2π/3",
      "3π/4",
      "π"
    ],
    "a": 0,
    "ex": "\\(150\\times\\frac{\\pi}{180}=\\frac{5\\pi}{6}\\).",
    "ex_ar": "\\(150\\times\\frac{\\pi}{180}=\\frac{5\\pi}{6}\\)."
  },
  {
    "t": "num",
    "ti": "Numeric Entry: Area of Oblique Triangle",
    "ti_ar": "إدخال رقمي: مساحة مثلث غير قائم الزاوية",
    "q": "In \\(\\triangle ABC\\), side \\(a = 10\\), side \\(b = 14\\), and included angle \\(C = 30°\\). Find the exact area of the triangle.",
    "q_ar": "في المثلث \\(\\triangle ABC\\)، الضلع \\(a = 10\\)، والضلع \\(b = 14\\)، والزاوية المحصورة بينهما \\(C = 30°\\). أوجد مساحة المثلث بدقة.",
    "a": 35,
    "ex": "\\(\\text{Area} = \\frac{1}{2}ab\\sin C = \\frac{1}{2}(10)(14)\\sin 30° = 70(0.5) = 35\\).",
    "ex_ar": "\\(\\text{المساحة} = \\frac{1}{2}ab\\sin C = \\frac{1}{2}(10)(14)\\sin 30° = 70(0.5) = 35\\)."
  },
  {
    "t": "cat",
    "ti": "Categorize: Triangle Law Selection",
    "ti_ar": "تصنيف: اختيار قانون المثلث المناسب",
    "categories": [
      "Law of Sines",
      "Law of Cosines"
    ],
    "categories_ar": [
      "قانون الجيوب",
      "قانون جيوب التمام"
    ],
    "items": [
      {
        "s": "AAS (Two angles and non-included side)",
        "s_ar": "AAS (زاويتان وضلع غير محصور)",
        "cat": "Law of Sines"
      },
      {
        "s": "ASA (Two angles and included side)",
        "s_ar": "ASA (زاويتان وضلع محصور)",
        "cat": "Law of Sines"
      },
      {
        "s": "SAS (Two sides and included angle)",
        "s_ar": "SAS (ضلعان وزاوية محصورة)",
        "cat": "Law of Cosines"
      },
      {
        "s": "SSS (Three given side lengths)",
        "s_ar": "SSS (ثلاثة أضلاع معلومة)",
        "cat": "Law of Cosines"
      },
      {
        "s": "SSA (Ambiguous case)",
        "s_ar": "SSA (الحالة المبهمة: ضلعان وزاوية غير محصورة)",
        "cat": "Law of Sines"
      }
    ],
    "ex": "Law of Sines applies when an angle and its opposite side are both known (AAS, ASA, SSA). Law of Cosines applies when no opposite pair is given (SAS, SSS).",
    "ex_ar": "يُستخدم قانون الجيوب عندما تكون زاوية وضلعها المقابل معلومين معاً (AAS, ASA, SSA). ويُستخدم قانون جيوب التمام عند عدم وجود زوج متقابل معلوم (SAS, SSS)."
  },
  {
    "t": "fn",
    "ti": "Explorer: Period in \\(\\sin(Bx)\\)",
    "ti_ar": "مستكشف: دورة الدالة في \\(\\sin(Bx)\\)",
    "fns": [
      {
        "expr": "sin(B*x)",
        "color": "#1E3A6E",
        "label": "sin(Bx)"
      }
    ],
    "xrange": [
      -6.3,
      6.3
    ],
    "yrange": [
      -1.5,
      1.5
    ],
    "params": [
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
    "t": "sr",
    "ti": "Worked Example: Solve \\(2\\sin\\theta=1\\) for \\(0°\\le\\theta<360°\\)",
    "ti_ar": "مثال محلول: حل المعادلة \\(2\\sin\\theta=1\\) حيث \\(0°\\le\\theta<360°\\)",
    "steps": [
      "Isolate sine: \\(\\sin\\theta=\\dfrac12\\).",
      "Reference angle: \\(\\arcsin\\left(\\frac12\\right)=30°\\).",
      "Sine is positive in Quadrants I and II, so \\(\\theta=30°\\) or \\(\\theta=180°-30°=150°\\)."
    ],
    "steps_ar": [
      "عزل الجيب: \\(\\sin\\theta=\\dfrac12\\).",
      "زاوية الإسناد (المرجع): \\(\\arcsin\\left(\\frac12\\right)=30°\\).",
      "الجيب موجب في الربعين الأول والثاني، إذن \\(\\theta=30°\\) أو \\(\\theta=180°-30°=150°\\)."
    ]
  },
  {
    "t": "se",
    "ti": "Spot the Error: Algebraic & Domain Verification (Trigonometry & Triangle Laws)",
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
    "ti_ar": "اكتشف الخطأ: الجذور الدخيلة والتحقق من المجال (Trigonometry & Triangle Laws)",
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
    "ti": "Examiner Mode: Multi-Step Structured Problem (Trigonometry & Triangle Laws)",
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
    "ti_ar": "وضع المصحح: إكمال المربع والدالة العكسية (Trigonometry & Triangle Laws)",
    "q_ar": "لتكن \\(f(x) = x^2 - 8x + 19\\) حيث \\(x \\ge 4\\). (أ) اكتب \\(f(x)\\) في صورة المربع الكامل وحدد مداها. (ب) أوجد قاعدة الدالة العكسية \\(f^{-1}(x)\\) ومجالها.",
    "examinerTip_ar": "الدالة العكسية يجب أن تكون وحيدة القيمة، لذا نختار الإشارة الموجبة للجذر \\(4 + \\sqrt{x - 3}\\) لأن \\(x \\ge 4\\)."
  },
  {
    "t": "sb",
    "ti": "Step Builder: Completing the Square & Vertex Analysis (Trigonometry & Triangle Laws)",
    "steps": [
      {
        "l": "In \\(y = x^2 - 8x + 19\\), halve the \\(x\\)-coefficient to write \\((x - h)^2\\) where \\(h =\\)",
        "a": "4",
        "h": "Take half of 8."
      },
      {
        "l": "Compute the minimum value \\(k = 19 - 4^2 =\\)",
        "a": "3",
        "h": "Subtract 16 from 19."
      },
      {
        "l": "Evaluate \\(y\\) when \\(x = 6\\): \\(y =\\)",
        "a": "7",
        "h": "Compute \\((2)^2 + 3\\)."
      }
    ],
    "ti_ar": "بناء الخطوات: إكمال المربع وإيجاد القيمة الصغرى (Trigonometry & Triangle Laws)",
    "steps_ar": [
      {
        "l": "في الدالة \\(y = x^2 - 8x + 19\\): قيمة \\(h\\) في \\((x - h)^2\\) تساوي:",
        "a": "4",
        "h": "اقسم معامل x وهو 8 على 2."
      },
      {
        "l": "احسب القيمة الصغرى \\(k = 19 - 4^2 =\\)",
        "a": "3",
        "h": "اطرح 16 من 19."
      },
      {
        "l": "احسب قيمة \\(y\\) عندما \\(x = 6\\):",
        "a": "7",
        "h": "احسب \\(4 + 3\\)."
      }
    ]
  },
  {
    "t": "mt",
    "ti": "Matching: Core Algebraic & Analytic Principles (Trigonometry & Triangle Laws)",
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
    "ti_ar": "مطابقة: المبادئ الجبرية والتحليلية الأساسية (Trigonometry & Triangle Laws)",
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

D["pc-circles"] = [
  {
    "t": "mt",
    "ti": "Matching: Unit Circle",
    "ti_ar": "مطابقة: دائرة الوحدة",
    "p": [
      {
        "l": "sin 30°",
        "l_ar": "sin 30°",
        "r": "1/2",
        "r_ar": "1/2"
      },
      {
        "l": "cos 30°",
        "l_ar": "cos 30°",
        "r": "√3/2",
        "r_ar": "√3/2"
      },
      {
        "l": "tan 45°",
        "l_ar": "tan 45°",
        "r": "1",
        "r_ar": "1"
      },
      {
        "l": "cos 90°",
        "l_ar": "cos 90°",
        "r": "0",
        "r_ar": "0"
      }
    ]
  },
  {
    "t": "num",
    "ti": "Numeric Entry: Evaluating Exact Trig Ratios",
    "ti_ar": "إدخال رقمي: إيجاد القيمة الدقيقة للنسب المثلثية",
    "q": "What is the exact value of \\(\\tan(225°)\\)?",
    "q_ar": "ما هي القيمة الدقيقة لـ \\(\\tan(225°)\\)؟",
    "a": 1,
    "ex": "\\(225°\\) is in Quadrant III where tangent is positive. Reference angle: \\(225° - 180° = 45°\\). Therefore \\(\\tan(225°) = \\tan(45°) = 1\\).",
    "ex_ar": "الزاوية \\(225°\\) تقع في الربع الثالث حيث الظل موجب. زاوية الإسناد: \\(225° - 180° = 45°\\). وبالتالي \\(\\tan(225°) = \\tan(45°) = 1\\)."
  },
  {
    "t": "ord",
    "ti": "Order the Steps: Proving \\(\\frac{\\sin 2x}{2\\cos x} = \\sin x\\)",
    "ti_ar": "رتّب الخطوات: إثبات صحة \\(\\frac{\\sin 2x}{2\\cos x} = \\sin x\\)",
    "prompt": "Arrange the algebraic steps to simplify the identity:",
    "prompt_ar": "رتب الخطوات الجبرية لتبسيط المتطابقة:",
    "items": [
      "Substitute \\(\\sin 2x = 2\\sin x\\cos x\\) in the numerator.",
      "Write the expression as \\(\\dfrac{2\\sin x\\cos x}{2\\cos x}\\).",
      "Cancel the coefficient 2 in numerator and denominator.",
      "Cancel the common factor of \\(\\cos x\\) to yield \\(\\sin x\\)."
    ],
    "items_ar": [
      "التعويض بمتطابقة ضعف الزاوية \\(\\sin 2x = 2\\sin x\\cos x\\) في البسط.",
      "كتابة المقدار على الصورة \\(\\dfrac{2\\sin x\\cos x}{2\\cos x}\\).",
      "اختصار المعامل 2 من البسط والمقام.",
      "اختصار العامل المشترك \\(\\cos x\\) للحصول على \\(\\sin x\\)."
    ],
    "ex": "Expand the double-angle formula, then cancel common factors in numerator and denominator.",
    "ex_ar": "فك متطابقة ضعف الزاوية، ثم اختصر العوامل المشتركة بين البسط والمقام."
  },
  {
    "t": "fn",
    "ti": "Explorer: Phase Shift \\(\\sin(x+k)\\) vs \\(\\cos(x)\\)",
    "ti_ar": "مستكشف: فرق الطور \\(\\sin(x+k)\\) مقابل \\(\\cos(x)\\)",
    "fns": [
      {
        "expr": "sin(x+k)",
        "color": "#1E3A6E",
        "label": "sin(x+k)"
      },
      {
        "expr": "cos(x)",
        "color": "#B8801F",
        "label": "cos(x)"
      }
    ],
    "xrange": [
      -6.3,
      6.3
    ],
    "yrange": [
      -1.5,
      1.5
    ],
    "params": [
      {
        "name": "k",
        "label": "Phase shift k",
        "min": -3.14,
        "max": 3.14,
        "step": 0.314,
        "default": 0
      }
    ]
  },
  {
    "t": "sr",
    "ti": "Worked Example: Use the Pythagorean Identity",
    "ti_ar": "مثال محلول: استخدام متطابقة فيثاغورس المثلثية",
    "steps": [
      "If \\(\\sin\\theta=\\dfrac35\\) and \\(\\theta\\) is in Quadrant I, use \\(\\sin^2\\theta+\\cos^2\\theta=1\\).",
      "Substitute: \\(\\left(\\dfrac35\\right)^2+\\cos^2\\theta=1\\Rightarrow\\dfrac9{25}+\\cos^2\\theta=1\\).",
      "Solve: \\(\\cos^2\\theta=\\dfrac{16}{25}\\Rightarrow\\cos\\theta=\\pm\\dfrac45\\).",
      "Since \\(\\theta\\) is in Quadrant I, cosine is positive: \\(\\cos\\theta=\\dfrac45\\)."
    ],
    "steps_ar": [
      "إذا كانت \\(\\sin\\theta=\\dfrac35\\) وكانت \\(\\theta\\) في الربع الأول، نستخدم \\(\\sin^2\\theta+\\cos^2\\theta=1\\).",
      "التعويض: \\(\\left(\\dfrac35\\right)^2+\\cos^2\\theta=1\\Rightarrow\\dfrac9{25}+\\cos^2\\theta=1\\).",
      "الحل: \\(\\cos^2\\theta=\\dfrac{16}{25}\\Rightarrow\\cos\\theta=\\pm\\dfrac45\\).",
      "بما أن \\(\\theta\\) في الربع الأول، فإن جيب التمام موجب: \\(\\cos\\theta=\\dfrac45\\)."
    ]
  },
  {
    "t": "se",
    "ti": "Spot the Error: Algebraic & Domain Verification (Unit Circle & Trigonometric Identities)",
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
    "ti_ar": "اكتشف الخطأ: الجذور الدخيلة والتحقق من المجال (Unit Circle & Trigonometric Identities)",
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
    "ti": "Examiner Mode: Multi-Step Structured Problem (Unit Circle & Trigonometric Identities)",
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
    "ti_ar": "وضع المصحح: إكمال المربع والدالة العكسية (Unit Circle & Trigonometric Identities)",
    "q_ar": "لتكن \\(f(x) = x^2 - 8x + 16\\) حيث \\(x \\ge 4\\). (أ) اكتب \\(f(x)\\) في صورة المربع الكامل وحدد مداها. (ب) أوجد قاعدة الدالة العكسية \\(f^{-1}(x)\\) ومجالها.",
    "examinerTip_ar": "الدالة العكسية يجب أن تكون وحيدة القيمة، لذا نختار الإشارة الموجبة للجذر \\(4 + \\sqrt{x - 0}\\) لأن \\(x \\ge 4\\)."
  },
  {
    "t": "sb",
    "ti": "Step Builder: Completing the Square & Vertex Analysis (Unit Circle & Trigonometric Identities)",
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
    "ti_ar": "بناء الخطوات: إكمال المربع وإيجاد القيمة الصغرى (Unit Circle & Trigonometric Identities)",
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
  }
];

D["pc-exp"] = [
  {
    "t": "tf",
    "ti": "True or False: Exponentials & Logs",
    "ti_ar": "صح أم خطأ: الدوال الأسية واللوغاريتمية",
    "items": [
      {
        "s": "\\(\\log_b(MN)=\\log_b M+\\log_b N\\)",
        "s_ar": "\\(\\log_b(MN)=\\log_b M+\\log_b N\\)",
        "a": true,
        "ex": "Product rule for logs.",
        "ex_ar": "خاصية ضرب اللوغاريتمات."
      },
      {
        "s": "\\(\\log_b(M+N)=\\log_b M+\\log_b N\\)",
        "s_ar": "\\(\\log_b(M+N)=\\log_b M+\\log_b N\\)",
        "a": false,
        "ex": "No such law for sum inside log.",
        "ex_ar": "لا توجد خاصية لتوزيع اللوغاريتم على الجمع الداخلي."
      },
      {
        "s": "\\(\\log_b b=1\\)",
        "s_ar": "\\(\\log_b b=1\\)",
        "a": true,
        "ex": "\\(b^1=b\\).",
        "ex_ar": "\\(b^1=b\\)."
      },
      {
        "s": "\\(\\ln(e^x)=x\\)",
        "s_ar": "\\(\\ln(e^x)=x\\)",
        "a": true,
        "ex": "Inverse functions.",
        "ex_ar": "دوال عكسية."
      }
    ]
  },
  {
    "t": "ord",
    "ti": "Order the Steps: Solving \\(2^{x+3} = 32\\)",
    "ti_ar": "رتّب الخطوات: حل \\(2^{x+3} = 32\\)",
    "prompt": "Arrange the algebraic steps to solve for x:",
    "prompt_ar": "رتب الخطوات الجبرية لإيجاد قيمة x:",
    "items": [
      "Express the right-hand side with base 2: \\(32 = 2^5\\).",
      "Equate exponents of matching bases: \\(x + 3 = 5\\).",
      "Subtract 3 from both sides: \\(x = 5 - 3\\).",
      "State the solution: \\(x = 2\\)."
    ],
    "items_ar": [
      "كتابة الطرف الأيمن بالأساس 2: \\(32 = 2^5\\).",
      "مساواة الأسس لتطابق الأساسات: \\(x + 3 = 5\\).",
      "طرح 3 من كلا الطرفين: \\(x = 5 - 3\\).",
      "تحديد الحل النهائي: \\(x = 2\\)."
    ],
    "ex": "Rewrite with identical bases, equate exponents, and isolate the variable.",
    "ex_ar": "أعد الكتابة بأساسات متطابقة، وساوِ الأسس، ثم اعزل المتغير."
  },
  {
    "t": "num",
    "ti": "Numeric Entry: Evaluating Logarithmic Expressions",
    "ti_ar": "إدخال رقمي: إيجاد قيمة مقادير لوغاريتمية",
    "q": "Evaluate \\(\\log_2(64) - \\log_3(27)\\).",
    "q_ar": "احسب قيمة \\(\\log_2(64) - \\log_3(27)\\).",
    "a": 3,
    "ex": "\\(\\log_2(64) = 6\\) because \\(2^6 = 64\\); \\(\\log_3(27) = 3\\) because \\(3^3 = 27\\). Result: \\(6 - 3 = 3\\).",
    "ex_ar": "\\(\\log_2(64) = 6\\) لأن \\(2^6 = 64\\)؛ و \\(\\log_3(27) = 3\\) لأن \\(3^3 = 27\\). النتيجة: \\(6 - 3 = 3\\)."
  },
  {
    "t": "fn",
    "ti": "Explorer: Growth/Decay \\(e^{kx}\\)",
    "ti_ar": "مستكشف: النمو والاضمحلال \\(e^{kx}\\)",
    "fns": [
      {
        "expr": "exp(k*x)",
        "color": "#1E3A6E",
        "label": "e^{kx}"
      }
    ],
    "xrange": [
      -3,
      3
    ],
    "yrange": [
      0,
      10
    ],
    "params": [
      {
        "name": "k",
        "label": "Rate k",
        "min": -1,
        "max": 1,
        "step": 0.25,
        "default": 0.5
      }
    ]
  },
  {
    "t": "sr",
    "ti": "Worked Example: Exponential Growth Model",
    "ti_ar": "مثال محلول: نموذج النمو الأسي",
    "steps": [
      "A population grows as \\(P(t)=500e^{0.03t}\\). Substitute \\(t=10\\): \\(P(10)=500e^{0.03(10)}\\).",
      "Simplify the exponent: \\(0.03\\times10=0.3\\), so \\(P(10)=500e^{0.3}\\).",
      "Evaluate \\(e^{0.3}\\approx1.35\\), so \\(P(10)\\approx500(1.35)=675\\)."
    ],
    "steps_ar": [
      "ينمو عدد السكان وفق الدالة \\(P(t)=500e^{0.03t}\\). بالتعويض بـ \\(t=10\\): \\(P(10)=500e^{0.03(10)}\\).",
      "تبسيط الأس: \\(0.03\\times10=0.3\\)، إذن \\(P(10)=500e^{0.3}\\).",
      "حساب قيمة \\(e^{0.3}\\approx1.35\\)، إذن \\(P(10)\\approx500(1.35)=675\\)."
    ]
  },
  {
    "t": "se",
    "ti": "Spot the Error: Algebraic & Domain Verification (Exponential, Logarithmic & Logistic Dynamics)",
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
    "ti_ar": "اكتشف الخطأ: الجذور الدخيلة والتحقق من المجال (Exponential, Logarithmic & Logistic Dynamics)",
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
    "ti": "Examiner Mode: Multi-Step Structured Problem (Exponential, Logarithmic & Logistic Dynamics)",
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
    "ti_ar": "وضع المصحح: إكمال المربع والدالة العكسية (Exponential, Logarithmic & Logistic Dynamics)",
    "q_ar": "لتكن \\(f(x) = x^2 - 8x + 16\\) حيث \\(x \\ge 4\\). (أ) اكتب \\(f(x)\\) في صورة المربع الكامل وحدد مداها. (ب) أوجد قاعدة الدالة العكسية \\(f^{-1}(x)\\) ومجالها.",
    "examinerTip_ar": "الدالة العكسية يجب أن تكون وحيدة القيمة، لذا نختار الإشارة الموجبة للجذر \\(4 + \\sqrt{x - 0}\\) لأن \\(x \\ge 4\\)."
  },
  {
    "t": "sb",
    "ti": "Step Builder: Completing the Square & Vertex Analysis (Exponential, Logarithmic & Logistic Dynamics)",
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
    "ti_ar": "بناء الخطوات: إكمال المربع وإيجاد القيمة الصغرى (Exponential, Logarithmic & Logistic Dynamics)",
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
    "t": "mt",
    "ti": "Matching: Core Algebraic & Analytic Principles (Exponential, Logarithmic & Logistic Dynamics)",
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
    "ti_ar": "مطابقة: المبادئ الجبرية والتحليلية الأساسية (Exponential, Logarithmic & Logistic Dynamics)",
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

D["pc-conics"] = [
  {
    "t": "sb",
    "ti": "Step Builder: Ellipse \\(\\frac{x^2}{25}+\\frac{y^2}{9}=1\\) — find foci",
    "ti_ar": "بناء الخطوات: القطع الناقص \\(\\frac{x^2}{25}+\\frac{y^2}{9}=1\\) — إيجاد البؤرتين",
    "steps": [
      {
        "l": "\\(a^2\\) = larger denom =",
        "l_ar": "\\(a^2\\) = المقام الأكبر =",
        "a": "25",
        "h": "Read the larger denominator from the given ellipse equation.",
        "h_ar": "اقرأ المقام الأكبر في معادلة القطع الناقص المعطاة."
      },
      {
        "l": "\\(b^2=\\)",
        "l_ar": "\\(b^2=\\)",
        "a": "9",
        "h": "Read the smaller denominator \\(b^2\\) from the given ellipse equation.",
        "h_ar": "اقرأ المقام الأصغر \\(b^2\\) في معادلة القطع الناقص."
      },
      {
        "l": "\\(c^2=25-9=\\)",
        "l_ar": "\\(c^2=25-9=\\)",
        "a": "16",
        "h": "Perform the calculation in \\(25-9\\) to find the result.",
        "h_ar": "أجرِ العملية الحسابية في المقدار \\(25-9\\) للوصول إلى النتيجة."
      },
      {
        "l": "\\(c=\\)",
        "l_ar": "\\(c=\\)",
        "a": "4",
        "h": "Evaluate the expression \\(\\sqrt{16}\\).",
        "h_ar": "احسب قيمة المقدار \\(\\sqrt{16}\\)."
      }
    ]
  },
  {
    "t": "cat",
    "ti": "Categorize: Conic Sections by Eccentricity",
    "ti_ar": "تصنيف: القطوع المخروطية حسب الاختلاف المركزي e",
    "categories": [
      "e < 1",
      "e = 1",
      "e > 1"
    ],
    "categories_ar": [
      "e < 1",
      "e = 1",
      "e > 1"
    ],
    "items": [
      {
        "s": "Circle (e = 0)",
        "s_ar": "دائرة (e = 0)",
        "cat": "e < 1"
      },
      {
        "s": "Ellipse (0 < e < 1)",
        "s_ar": "قطع ناقص (0 < e < 1)",
        "cat": "e < 1"
      },
      {
        "s": "Parabola (e = 1)",
        "s_ar": "قطع مكافئ (e = 1)",
        "cat": "e = 1"
      },
      {
        "s": "Hyperbola (e > 1)",
        "s_ar": "قطع زائد (e > 1)",
        "cat": "e > 1"
      }
    ],
    "ex": "Circles and ellipses have e < 1; parabolas have e = 1; hyperbolas have e > 1.",
    "ex_ar": "الدائرة والقطع الناقص لهما \\(e < 1\\)؛ والقطع المكافئ \\(e = 1\\)؛ والقطع الزائد \\(e > 1\\)."
  },
  {
    "t": "num",
    "ti": "Numeric Entry: Ellipse Focal Distance",
    "ti_ar": "إدخال رقمي: البعد البؤري للقطع الناقص",
    "q": "An ellipse has equation \\(\\dfrac{x^2}{100} + \\dfrac{y^2}{64} = 1\\). Find the focal distance \\(c\\).",
    "q_ar": "قطع ناقص معادلته \\(\\dfrac{x^2}{100} + \\dfrac{y^2}{64} = 1\\). أوجد البعد البؤري \\(c\\).",
    "a": 6,
    "ex": "\\(a^2 = 100\\), \\(b^2 = 64\\). For an ellipse, \\(c^2 = a^2 - b^2 = 100 - 64 = 36 \\implies c = 6\\).",
    "ex_ar": "\\(a^2 = 100\\) و \\(b^2 = 64\\). في القطع الناقص، \\(c^2 = a^2 - b^2 = 100 - 64 = 36 \\implies c = 6\\)."
  },
  {
    "t": "fn",
    "ti": "Explorer: Parabola \\(y=ax^2\\)",
    "ti_ar": "مستكشف: القطع المكافئ \\(y=ax^2\\)",
    "fns": [
      {
        "expr": "a*x^2",
        "color": "#1E3A6E",
        "label": "ax^2"
      }
    ],
    "xrange": [
      -4,
      4
    ],
    "yrange": [
      -8,
      8
    ],
    "params": [
      {
        "name": "a",
        "label": "Coefficient a",
        "min": -2,
        "max": 2,
        "step": 0.5,
        "default": 1
      }
    ]
  },
  {
    "t": "sr",
    "ti": "Worked Example: Find the Vertex of \\(y=2(x-3)^2+5\\)",
    "ti_ar": "مثال محلول: إيجاد رأس القطع المكافئ \\(y=2(x-3)^2+5\\)",
    "steps": [
      "The vertex form of a parabola is \\(y=a(x-h)^2+k\\), where the vertex is \\((h,k)\\).",
      "Compare: \\(h=3\\), \\(k=5\\).",
      "Vertex: \\((3,5)\\)."
    ],
    "steps_ar": [
      "صيغة الرأس للقطع المكافئ هي \\(y=a(x-h)^2+k\\)، حيث رأس القطع هو النقطة \\((h,k)\\).",
      "بالمقارنة: \\(h=3\\)، و \\(k=5\\).",
      "نقطة الرأس: \\((3,5)\\)."
    ]
  },
  {
    "t": "se",
    "ti": "Spot the Error: Algebraic & Domain Verification (Conic Sections & Analytic Geometry)",
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
    "ti_ar": "اكتشف الخطأ: الجذور الدخيلة والتحقق من المجال (Conic Sections & Analytic Geometry)",
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
    "ti": "Examiner Mode: Multi-Step Structured Problem (Conic Sections & Analytic Geometry)",
    "q": "Let \\(f(x) = x^2 - 8x + 22\\) for \\(x \\ge 4\\). (a) Express \\(f(x)\\) in completed-square vertex form and state the range of \\(f\\). (b) Find an expression for the inverse function \\(f^{-1}(x)\\) and state its domain.",
    "parts": [
      {
        "label": "Part (a) — Vertex Form & Range",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "Complete the square: \\(f(x) = (x - 4)^2 - 16 + 22 = (x - 4)^2 + 6\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "State exact range: \\(f(x) \\ge 6\\) (or \\([6, \\infty)\\))."
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
            "text": "Set \\(y = (x - 4)^2 + 6 \\implies (x - 4)^2 = y - 6\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "Select positive branch (since \\(x \\ge 4\\)): \\(f^{-1}(x) = 4 + \\sqrt{x - 6}\\)."
          },
          {
            "code": "B1",
            "marks": 1,
            "text": "State domain of \\(f^{-1}\\): \\(x \\ge 6\\) (matching the range of \\(f\\))."
          }
        ]
      }
    ],
    "examinerTip": "Writing \\(\\pm\\sqrt{x - 6}\\) for \\(f^{-1}(x)\\) loses the final A1 mark because a function must be single-valued; use the domain restriction \\(x \\ge 4\\) to choose the \\(+\\) sign.",
    "ti_ar": "وضع المصحح: إكمال المربع والدالة العكسية (Conic Sections & Analytic Geometry)",
    "q_ar": "لتكن \\(f(x) = x^2 - 8x + 22\\) حيث \\(x \\ge 4\\). (أ) اكتب \\(f(x)\\) في صورة المربع الكامل وحدد مداها. (ب) أوجد قاعدة الدالة العكسية \\(f^{-1}(x)\\) ومجالها.",
    "examinerTip_ar": "الدالة العكسية يجب أن تكون وحيدة القيمة، لذا نختار الإشارة الموجبة للجذر \\(4 + \\sqrt{x - 6}\\) لأن \\(x \\ge 4\\)."
  },
  {
    "t": "mt",
    "ti": "Matching: Core Algebraic & Analytic Principles (Conic Sections & Analytic Geometry)",
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
    "ti_ar": "مطابقة: المبادئ الجبرية والتحليلية الأساسية (Conic Sections & Analytic Geometry)",
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

D["pc-vectors"] = [
  {
    "t": "cat",
    "ti": "Categorize: Vector vs. Scalar Quantities",
    "ti_ar": "تصنيف: الكميات المتجهة مقابل القياسية",
    "categories": [
      "Vector",
      "Scalar"
    ],
    "categories_ar": [
      "كمية متجهة",
      "كمية قياسية"
    ],
    "items": [
      {
        "s": "Dot product \\(\\mathbf{u}\\cdot\\mathbf{v}\\)",
        "s_ar": "الضرب القياسي \\(\\mathbf{u}\\cdot\\mathbf{v}\\)",
        "cat": "Scalar"
      },
      {
        "s": "Vector projection \\(\\text{proj}_{\\mathbf{v}}\\mathbf{u}\\)",
        "s_ar": "المسقط الاتجاهي \\(\\text{proj}_{\\mathbf{v}}\\mathbf{u}\\)",
        "cat": "Vector"
      },
      {
        "s": "Vector magnitude \\(|\\mathbf{v}|\\)",
        "s_ar": "طول المتجه \\(|\\mathbf{v}|\\)",
        "cat": "Scalar"
      },
      {
        "s": "Unit vector \\(\\hat{\\mathbf{u}}\\)",
        "s_ar": "متجه الوحدة \\(\\hat{\\mathbf{u}}\\)",
        "cat": "Vector"
      },
      {
        "s": "Scalar projection \\(\\text{comp}_{\\mathbf{v}}\\mathbf{u}\\)",
        "s_ar": "المسقط القياسي \\(\\text{comp}_{\\mathbf{v}}\\mathbf{u}\\)",
        "cat": "Scalar"
      }
    ],
    "ex": "Dot products, magnitudes, and scalar projections are pure numbers; vector projections and unit vectors possess both magnitude and direction.",
    "ex_ar": "الضرب الداخلي (القياسي) والطول والمسقط القياسي هي أعداد قياسية؛ بينما المساقط الاتجاهية ومتجهات الوحدة تمتلك مقداراً واتجاهاً."
  },
  {
    "t": "num",
    "ti": "Numeric Entry: Orthogonal Vector Component",
    "ti_ar": "إدخال رقمي: إيجاد مركبة لمتجهين متعامدين",
    "q": "If vector \\(\\mathbf{u} = \\langle 4, k \\rangle\\) is orthogonal to \\(\\mathbf{v} = \\langle 3, -6 \\rangle\\), find the value of \\(k\\).",
    "q_ar": "إذا كان المتجه \\(\\mathbf{u} = \\langle 4, k \\rangle\\) متعامداً مع المتجه \\(\\mathbf{v} = \\langle 3, -6 \\rangle\\)، فأوجد قيمة \\(k\\).",
    "a": 2,
    "ex": "Orthogonal vectors have dot product 0: \\(4(3) + k(-6) = 0 \\implies 12 - 6k = 0 \\implies 6k = 12 \\implies k = 2\\).",
    "ex_ar": "المتجهات المتعامدة يكون حاصل ضربها القياسي صفراً: \\(4(3) + k(-6) = 0 \\implies 12 - 6k = 0 \\implies 6k = 12 \\implies k = 2\\)."
  },
  {
    "t": "fn",
    "ti": "Explorer: Direction Vector Slope \\(y=mx\\)",
    "ti_ar": "مستكشف: ميل متجه الاتجاه \\(y=mx\\)",
    "fns": [
      {
        "expr": "m*x",
        "color": "#1E3A6E",
        "label": "y=mx"
      }
    ],
    "xrange": [
      -4,
      4
    ],
    "yrange": [
      -6,
      6
    ],
    "params": [
      {
        "name": "m",
        "label": "Slope m",
        "min": -3,
        "max": 3,
        "step": 0.5,
        "default": 1
      }
    ]
  },
  {
    "t": "sr",
    "ti": "Worked Example: Magnitude of a Vector",
    "ti_ar": "مثال محلول: إيجاد طول المتجه",
    "steps": [
      "Find the magnitude of \\(\\vec v=\\langle-3,4\\rangle\\). Magnitude formula: \\(|\\vec v|=\\sqrt{v_x^2+v_y^2}\\).",
      "Substitute: \\(|\\vec v|=\\sqrt{(-3)^2+4^2}=\\sqrt{9+16}\\).",
      "Simplify: \\(|\\vec v|=\\sqrt{25}=5\\)."
    ],
    "steps_ar": [
      "أوجد طول المتجه \\(\\vec v=\\langle-3,4\\rangle\\). قانون الطول: \\(|\\vec v|=\\sqrt{v_x^2+v_y^2}\\).",
      "التعويض: \\(|\\vec v|=\\sqrt{(-3)^2+4^2}=\\sqrt{9+16}\\).",
      "التبسيط: \\(|\\vec v|=\\sqrt{25}=5\\)."
    ]
  },
  {
    "t": "qc",
    "ti": "Quick Check: Parametric Curves",
    "ti_ar": "فحص سريع: المنحنيات الوسيطية (البوسيطية)",
    "q": "Parametric equations \\(x=t,\\ y=t^2\\) trace out a:",
    "q_ar": "المعادلات الوسيطية \\(x=t,\\ y=t^2\\) ترسم المنحنى:",
    "o": [
      "Parabola",
      "Line",
      "Circle",
      "Ellipse"
    ],
    "o_ar": [
      "قطع مكافئ",
      "خط مستقيم",
      "دائرة",
      "قطع ناقص"
    ],
    "a": 0,
    "ex": "Eliminating \\(t\\): \\(y=x^2\\) — a parabola.",
    "ex_ar": "بحذف الوسيط \\(t\\): نحصل على \\(y=x^2\\) — وهو قطع مكافئ."
  },
  {
    "t": "se",
    "ti": "Spot the Error: Algebraic & Domain Verification (Vectors, Lines & Parametric Kinematics)",
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
    "ti_ar": "اكتشف الخطأ: الجذور الدخيلة والتحقق من المجال (Vectors, Lines & Parametric Kinematics)",
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
    "ti": "Examiner Mode: Multi-Step Structured Problem (Vectors, Lines & Parametric Kinematics)",
    "q": "Let \\(f(x) = x^2 - 10x + 24\\) for \\(x \\ge 5\\). (a) Express \\(f(x)\\) in completed-square vertex form and state the range of \\(f\\). (b) Find an expression for the inverse function \\(f^{-1}(x)\\) and state its domain.",
    "parts": [
      {
        "label": "Part (a) — Vertex Form & Range",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "Complete the square: \\(f(x) = (x - 5)^2 - 25 + 24 = (x - 5)^2 + -1\\)."
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
            "text": "Set \\(y = (x - 5)^2 + -1 \\implies (x - 5)^2 = y - -1\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "Select positive branch (since \\(x \\ge 5\\)): \\(f^{-1}(x) = 5 + \\sqrt{x - -1}\\)."
          },
          {
            "code": "B1",
            "marks": 1,
            "text": "State domain of \\(f^{-1}\\): \\(x \\ge -1\\) (matching the range of \\(f\\))."
          }
        ]
      }
    ],
    "examinerTip": "Writing \\(\\pm\\sqrt{x - -1}\\) for \\(f^{-1}(x)\\) loses the final A1 mark because a function must be single-valued; use the domain restriction \\(x \\ge 5\\) to choose the \\(+\\) sign.",
    "ti_ar": "وضع المصحح: إكمال المربع والدالة العكسية (Vectors, Lines & Parametric Kinematics)",
    "q_ar": "لتكن \\(f(x) = x^2 - 10x + 24\\) حيث \\(x \\ge 5\\). (أ) اكتب \\(f(x)\\) في صورة المربع الكامل وحدد مداها. (ب) أوجد قاعدة الدالة العكسية \\(f^{-1}(x)\\) ومجالها.",
    "examinerTip_ar": "الدالة العكسية يجب أن تكون وحيدة القيمة، لذا نختار الإشارة الموجبة للجذر \\(5 + \\sqrt{x - -1}\\) لأن \\(x \\ge 5\\)."
  },
  {
    "t": "sb",
    "ti": "Step Builder: Completing the Square & Vertex Analysis (Vectors, Lines & Parametric Kinematics)",
    "steps": [
      {
        "l": "In \\(y = x^2 - 10x + 24\\), halve the \\(x\\)-coefficient to write \\((x - h)^2\\) where \\(h =\\)",
        "a": "5",
        "h": "Take half of 10."
      },
      {
        "l": "Compute the minimum value \\(k = 24 - 5^2 =\\)",
        "a": "-1",
        "h": "Subtract 25 from 24."
      },
      {
        "l": "Evaluate \\(y\\) when \\(x = 7\\): \\(y =\\)",
        "a": "3",
        "h": "Compute (2)^2 + -1."
      }
    ],
    "ti_ar": "بناء الخطوات: إكمال المربع وإيجاد القيمة الصغرى (Vectors, Lines & Parametric Kinematics)",
    "steps_ar": [
      {
        "l": "في الدالة \\(y = x^2 - 10x + 24\\): قيمة \\(h\\) في \\((x - h)^2\\) تساوي:",
        "a": "5",
        "h": "اقسم معامل x وهو 10 على 2."
      },
      {
        "l": "احسب القيمة الصغرى \\(k = 24 - 5^2 =\\)",
        "a": "-1",
        "h": "اطرح 25 من 24."
      },
      {
        "l": "احسب قيمة \\(y\\) عندما \\(x = 7\\):",
        "a": "3",
        "h": "احسب 4 + -1."
      }
    ]
  },
  {
    "t": "mt",
    "ti": "Matching: Core Algebraic & Analytic Principles (Vectors, Lines & Parametric Kinematics)",
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
    "ti_ar": "مطابقة: المبادئ الجبرية والتحليلية الأساسية (Vectors, Lines & Parametric Kinematics)",
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

D["pc-polar"] = [
  {
    "t": "cat",
    "ti": "Categorize: Polar Curve Families",
    "ti_ar": "تصنيف: عائلات المنحنيات القطبية",
    "categories": [
      "Circle",
      "Cardioid or Limaçon",
      "Rose Curve"
    ],
    "categories_ar": [
      "دائرة",
      "منحنى قلبي أو ليمكون",
      "منحنى وردي"
    ],
    "items": [
      {
        "s": "\\(r = 6\\cos\\theta\\)",
        "s_ar": "\\(r = 6\\cos\\theta\\)",
        "cat": "Circle"
      },
      {
        "s": "\\(r = 3 + 3\\cos\\theta\\)",
        "s_ar": "\\(r = 3 + 3\\cos\\theta\\)",
        "cat": "Cardioid or Limaçon"
      },
      {
        "s": "\\(r = 4\\cos(3\\theta)\\)",
        "s_ar": "\\(r = 4\\cos(3\\theta)\\)",
        "cat": "Rose Curve"
      },
      {
        "s": "\\(r = 8\\)",
        "s_ar": "\\(r = 8\\)",
        "cat": "Circle"
      },
      {
        "s": "\\(r = 2 + 5\\sin\\theta\\)",
        "s_ar": "\\(r = 2 + 5\\sin\\theta\\)",
        "cat": "Cardioid or Limaçon"
      },
      {
        "s": "\\(r = 5\\sin(4\\theta)\\)",
        "s_ar": "\\(r = 5\\sin(4\\theta)\\)",
        "cat": "Rose Curve"
      }
    ],
    "ex": "Constant r or a cos theta are circles; a +/- b cos/sin theta are limaçons (cardioids when a = b); a cos/sin(n theta) are rose curves.",
    "ex_ar": "الثابت r أو a cos theta تمثل دوائر؛ والصيغة a +/- b cos/sin theta تمثل منحنيات ليمكون (وقلبية عندما a = b)؛ بينما a cos/sin(n theta) تمثل منحنيات وردية."
  },
  {
    "t": "num",
    "ti": "Numeric Entry: Petals in a Rose Curve",
    "ti_ar": "إدخال رقمي: عدد بتلات المنحنى الوردي",
    "q": "How many petals does the polar rose curve \\(r = 4\\sin(4\\theta)\\) have?",
    "q_ar": "كم عدد بتلات المنحنى القطبي الوردي \\(r = 4\\sin(4\\theta)\\)؟",
    "a": 8,
    "ex": "For \\(r = a\\sin(n\\theta)\\), if \\(n\\) is even, there are \\(2n\\) petals. Here \\(n = 4\\) (even), so there are \\(2(4) = 8\\) petals.",
    "ex_ar": "في المنحنى الوردي \\(r = a\\sin(n\\theta)\\)، إذا كانت \\(n\\) عدداً زوجياً، يكون عدد البتلات \\(2n\\). هنا \\(n = 4\\) (زوجي)، إذن هناك \\(2(4) = 8\\) بتلات."
  },
  {
    "t": "sr",
    "ti": "Worked Example: Convert Polar to Rectangular",
    "ti_ar": "مثال محلول: التحويل من الإحداثيات القطبية إلى الديكارتية",
    "steps": [
      "Convert the polar point \\((4,60°)\\) to rectangular coordinates using \\(x=r\\cos\\theta\\) and \\(y=r\\sin\\theta\\).",
      "Compute \\(x\\): \\(x=4\\cos60°=4\\left(\\dfrac12\\right)=2\\).",
      "Compute \\(y\\): \\(y=4\\sin60°=4\\left(\\dfrac{\\sqrt3}{2}\\right)=2\\sqrt3\\).",
      "Rectangular coordinates: \\((2,2\\sqrt3)\\)."
    ],
    "steps_ar": [
      "تحويل النقطة القطبية \\((4,60°)\\) إلى إحداثيات ديكارتية باستخدام \\(x=r\\cos\\theta\\) و \\(y=r\\sin\\theta\\).",
      "حساب قيمة \\(x\\): \\(x=4\\cos60°=4\\left(\\dfrac12\\right)=2\\).",
      "حساب قيمة \\(y\\): \\(y=4\\sin60°=4\\left(\\dfrac{\\sqrt3}{2}\\right)=2\\sqrt3\\).",
      "الإحداثيات الديكارتية: \\((2,2\\sqrt3)\\)."
    ]
  },
  {
    "t": "qc",
    "ti": "Quick Check: Polar Equations",
    "ti_ar": "فحص سريع: المعادلات القطبية",
    "q": "The polar equation \\(r=5\\) represents:",
    "q_ar": "المعادلة القطبية \\(r=5\\) تمثل:",
    "o": [
      "A circle of radius 5",
      "A line",
      "A spiral",
      "A single point"
    ],
    "o_ar": [
      "دائرة نصف قطرها 5",
      "خطاً مستقيماً",
      "حلزوناً",
      "نقطة واحدة"
    ],
    "a": 0,
    "ex": "\\(r=5\\) means every point is a constant distance 5 from the pole — a circle.",
    "ex_ar": "\\(r=5\\) تعني أن كل نقطة تبعد مسافة ثابتة مقدارها 5 عن القطب — إذن هي دائرة."
  },
  {
    "t": "se",
    "ti": "Spot the Error: Algebraic & Domain Verification (Polar Coordinates, Complex Numbers & De Moivre's Theorem)",
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
    "ti_ar": "اكتشف الخطأ: الجذور الدخيلة والتحقق من المجال (Polar Coordinates, Complex Numbers & De Moivre's Theorem)",
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
    "ti": "Examiner Mode: Multi-Step Structured Problem (Polar Coordinates, Complex Numbers & De Moivre's Theorem)",
    "q": "Let \\(f(x) = x^2 - 4x + 8\\) for \\(x \\ge 2\\). (a) Express \\(f(x)\\) in completed-square vertex form and state the range of \\(f\\). (b) Find an expression for the inverse function \\(f^{-1}(x)\\) and state its domain.",
    "parts": [
      {
        "label": "Part (a) — Vertex Form & Range",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "Complete the square: \\(f(x) = (x - 2)^2 - 4 + 8 = (x - 2)^2 + 4\\)."
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
            "text": "Set \\(y = (x - 2)^2 + 4 \\implies (x - 2)^2 = y - 4\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "Select positive branch (since \\(x \\ge 2\\)): \\(f^{-1}(x) = 2 + \\sqrt{x - 4}\\)."
          },
          {
            "code": "B1",
            "marks": 1,
            "text": "State domain of \\(f^{-1}\\): \\(x \\ge 4\\) (matching the range of \\(f\\))."
          }
        ]
      }
    ],
    "examinerTip": "Writing \\(\\pm\\sqrt{x - 4}\\) for \\(f^{-1}(x)\\) loses the final A1 mark because a function must be single-valued; use the domain restriction \\(x \\ge 2\\) to choose the \\(+\\) sign.",
    "ti_ar": "وضع المصحح: إكمال المربع والدالة العكسية (Polar Coordinates, Complex Numbers & De Moivre's Theorem)",
    "q_ar": "لتكن \\(f(x) = x^2 - 4x + 8\\) حيث \\(x \\ge 2\\). (أ) اكتب \\(f(x)\\) في صورة المربع الكامل وحدد مداها. (ب) أوجد قاعدة الدالة العكسية \\(f^{-1}(x)\\) ومجالها.",
    "examinerTip_ar": "الدالة العكسية يجب أن تكون وحيدة القيمة، لذا نختار الإشارة الموجبة للجذر \\(2 + \\sqrt{x - 4}\\) لأن \\(x \\ge 2\\)."
  },
  {
    "t": "sb",
    "ti": "Step Builder: Completing the Square & Vertex Analysis (Polar Coordinates, Complex Numbers & De Moivre's Theorem)",
    "steps": [
      {
        "l": "In \\(y = x^2 - 4x + 8\\), halve the \\(x\\)-coefficient to write \\((x - h)^2\\) where \\(h =\\)",
        "a": "2",
        "h": "Take half of 4."
      },
      {
        "l": "Compute the minimum value \\(k = 8 - 2^2 =\\)",
        "a": "4",
        "h": "Subtract 4 from 8."
      },
      {
        "l": "Evaluate \\(y\\) when \\(x = 4\\): \\(y =\\)",
        "a": "8",
        "h": "Compute \\((2)^2 + 4\\)."
      }
    ],
    "ti_ar": "بناء الخطوات: إكمال المربع وإيجاد القيمة الصغرى (Polar Coordinates, Complex Numbers & De Moivre's Theorem)",
    "steps_ar": [
      {
        "l": "في الدالة \\(y = x^2 - 4x + 8\\): قيمة \\(h\\) في \\((x - h)^2\\) تساوي:",
        "a": "2",
        "h": "اقسم معامل x وهو 4 على 2."
      },
      {
        "l": "احسب القيمة الصغرى \\(k = 8 - 2^2 =\\)",
        "a": "4",
        "h": "اطرح 4 من 8."
      },
      {
        "l": "احسب قيمة \\(y\\) عندما \\(x = 4\\):",
        "a": "8",
        "h": "احسب \\(4 + 4\\)."
      }
    ]
  },
  {
    "t": "mt",
    "ti": "Matching: Core Algebraic & Analytic Principles (Polar Coordinates, Complex Numbers & De Moivre's Theorem)",
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
    "ti_ar": "مطابقة: المبادئ الجبرية والتحليلية الأساسية (Polar Coordinates, Complex Numbers & De Moivre's Theorem)",
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

D["pc-rational"] = [
  {
    "t": "cat",
    "ti": "Categorize: Rational Function Features",
    "ti_ar": "تصنيف: خصائص الدوال النسبية",
    "categories": [
      "Vertical Asymptote",
      "Removable Hole",
      "Horizontal Asymptote"
    ],
    "categories_ar": [
      "خط تقارب رأسي",
      "نقطة انفصال (فجوة قابلة للإزالة)",
      "خط تقارب أفقي"
    ],
    "items": [
      {
        "s": "Denominator root that cancels with a numerator factor",
        "s_ar": "صفر للمقام يُختصر مع عامل في البسط",
        "cat": "Removable Hole"
      },
      {
        "s": "Denominator root that remains after canceling factors",
        "s_ar": "صفر للمقام يتبقى بعد اختصار العوامل",
        "cat": "Vertical Asymptote"
      },
      {
        "s": "End-behavior limit as \\(x \\to \\pm\\infty\\)",
        "s_ar": "نهاية السلوك الطرفي عندما \\(x \\to \\pm\\infty\\)",
        "cat": "Horizontal Asymptote"
      },
      {
        "s": "Line \\(x = 2\\) for \\(f(x) = \\frac{1}{x-2}\\)",
        "s_ar": "المستقيم \\(x = 2\\) للدالة \\(f(x) = \\frac{1}{x-2}\\)",
        "cat": "Vertical Asymptote"
      },
      {
        "s": "Point \\((3, 6)\\) for \\(f(x) = \\frac{x^2-9}{x-3}\\)",
        "s_ar": "النقطة \\((3, 6)\\) للدالة \\(f(x) = \\frac{x^2-9}{x-3}\\)",
        "cat": "Removable Hole"
      }
    ],
    "ex": "Canceled denominator factors cause removable holes; uncanceled denominator roots produce vertical asymptotes; long-term limits yield horizontal asymptotes.",
    "ex_ar": "عوامل المقام المختصرة تسبب فجوات قابلة للإزالة؛ وجذور المقام غير المختصرة تعطي خطوط تقارب رأسية؛ والنهايات عند اللانهاية تعطي خطوط تقارب أفقية."
  },
  {
    "t": "num",
    "ti": "Numeric Entry: Horizontal Asymptote Value",
    "ti_ar": "إدخال رقمي: قيمة خط التقارب الأفقي",
    "q": "Find the horizontal asymptote \\(y = c\\) of \\(f(x) = \\dfrac{6x^2 - 5x + 1}{2x^2 + 7}\\). Enter the value of \\(c\\).",
    "q_ar": "أوجد خط التقارب الأفقي \\(y = c\\) للدالة \\(f(x) = \\dfrac{6x^2 - 5x + 1}{2x^2 + 7}\\). أدخل قيمة \\(c\\).",
    "a": 3,
    "ex": "Degrees of numerator and denominator are equal (degree 2). The horizontal asymptote is the ratio of leading coefficients: \\(y = 6/2 = 3\\).",
    "ex_ar": "درجة البسط تساوي درجة المقام (الدرجة 2). خط التقارب الأفقي هو نسبة المعاملين الرئيسين: \\(y = 6/2 = 3\\)."
  },
  {
    "t": "fn",
    "ti": "Explorer: Rational Function \\(\\dfrac{1}{(x-a)^2}\\)",
    "ti_ar": "مستكشف: الدالة النسبية \\(\\dfrac{1}{(x-a)^2}\\)",
    "fns": [
      {
        "expr": "1/(x-a)^2",
        "color": "#1E3A6E",
        "label": "1/(x-a)^2"
      }
    ],
    "xrange": [
      -4,
      4
    ],
    "yrange": [
      0,
      10
    ],
    "params": [
      {
        "name": "a",
        "label": "Asymptote a",
        "min": -2,
        "max": 2,
        "step": 1,
        "default": 0
      }
    ]
  },
  {
    "t": "sr",
    "ti": "Worked Example: Limit at Infinity",
    "ti_ar": "مثال محلول: النهاية عند اللانهاية",
    "steps": [
      "Find \\(\\displaystyle\\lim_{x\\to\\infty}\\dfrac{3x^2+2}{x^2-5}\\). Divide every term by \\(x^2\\), the highest power in the denominator: \\(\\dfrac{3+2/x^2}{1-5/x^2}\\).",
      "As \\(x\\to\\infty\\), the terms \\(2/x^2\\) and \\(5/x^2\\) both approach \\(0\\).",
      "The limit becomes \\(\\dfrac{3+0}{1-0}=3\\)."
    ],
    "steps_ar": [
      "أوجد \\(\\displaystyle\\lim_{x\\to\\infty}\\dfrac{3x^2+2}{x^2-5}\\). اقسم كل حد على \\(x^2\\)، وهي أعلى قوة في المقام: \\(\\dfrac{3+2/x^2}{1-5/x^2}\\).",
      "عندما \\(x\\to\\infty\\)، يقترب كل من \\(2/x^2\\) و \\(5/x^2\\) من الصفر \\(0\\).",
      "تصبح النهاية: \\(\\dfrac{3+0}{1-0}=3\\)."
    ]
  },
  {
    "t": "qc",
    "ti": "Quick Check: Horizontal Asymptotes",
    "ti_ar": "فحص سريع: خطوط التقارب الأفقية",
    "q": "The horizontal asymptote of \\(f(x)=\\dfrac{2x}{x+1}\\) is:",
    "q_ar": "خط التقارب الأفقي للدالة \\(f(x)=\\dfrac{2x}{x+1}\\) هو:",
    "o": [
      "\\(y=2\\)",
      "\\(y=0\\)",
      "\\(y=1\\)",
      "\\(x=-1\\)"
    ],
    "o_ar": [
      "\\(y=2\\)",
      "\\(y=0\\)",
      "\\(y=1\\)",
      "\\(x=-1\\)"
    ],
    "a": 0,
    "ex": "Equal-degree numerator/denominator: the asymptote is the ratio of leading coefficients, \\(\\frac21=2\\).",
    "ex_ar": "درجة البسط تساوي درجة المقام: خط التقارب هو نسبة المعاملات الرئيسة \\(\\frac21=2\\)."
  },
  {
    "t": "se",
    "ti": "Spot the Error: Implicit Differentiation & Product Rule (Rational Functions, Limits & Continuity)",
    "q": "A student differentiates the implicit curve \\(x^2 + 4xy + y^2 = 35\\) with respect to \\(x\\). Identify the step with the mathematical flaw:",
    "steps": [
      "Differentiate \\(x^2\\) with respect to \\(x\\) to obtain \\(2x\\).",
      "Differentiate the middle term \\(4xy\\) with respect to \\(x\\) as \\(4\\dfrac{dy}{dx}\\).",
      "Differentiate \\(y^2\\) using the Chain Rule as \\(2y\\dfrac{dy}{dx}\\) and the constant \\(35\\) as \\(0\\).",
      "Collect \\(\\dfrac{dy}{dx}\\) terms and divide to isolate \\(\\dfrac{dy}{dx}\\)."
    ],
    "errorStep": 2,
    "reasons": [
      "The term \\(4xy\\) is a product of two functions of \\(x\\); by the Product Rule its derivative is \\(4y + 4x\\dfrac{dy}{dx}\\), not \\(4\\dfrac{dy}{dx}\\).",
      "The derivative of \\(y^2\\) with respect to \\(x\\) is simply \\(2y\\) without \\(\\dfrac{dy}{dx}\\).",
      "The constant \\(35\\) remains \\(35\\) after differentiation."
    ],
    "correctReason": 0,
    "h": "Look closely at how the product \\(4xy\\) was differentiated in Step 2.",
    "sol": "Applying the Product Rule to \\(4xy\\) gives \\(4y + 4x\\dfrac{dy}{dx}\\). Thus \\(2x + 4y + (4x + 2y)\\dfrac{dy}{dx} = 0 \\implies \\dfrac{dy}{dx} = -\\dfrac{2x + 4y}{4x + 2y}\\).",
    "ti_ar": "اكتشف الخطأ: الاشتقاق الضمني وقاعدة الضرب (Rational Functions, Limits & Continuity)",
    "q_ar": "يقوم طالب باشتقاق العلاقة الضمنية \\(x^2 + 4xy + y^2 = 35\\) بالنسبة إلى \\(x\\). حدد الخطوة الخاطئة:",
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
    "ti": "Examiner Mode: Tangent, Normal & Stationary Points (Rational Functions, Limits & Continuity)",
    "q": "Consider the curve \\(y = 4x^3 - 7x^2 + 4\\). (a) Find \\(\\dfrac{dy}{dx}\\) and the gradient of the tangent at \\(x = 2\\). (b) Find the \\(x\\)-coordinates of the stationary points.",
    "parts": [
      {
        "label": "Part (a) — First Derivative & Tangent Gradient",
        "marks": 3,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "Differentiate term by term using the power rule: \\(\\dfrac{dy}{dx} = 12x^2 - 14x\\)."
          },
          {
            "code": "M1",
            "marks": 1,
            "text": "Substitute \\(x = 2\\): \\(m = 12(2)^2 - 14(2)\\)."
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
            "text": "Set \\(\\dfrac{dy}{dx} = 0 \\implies x(12x - 14) = 0\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "State both stationary \\(x\\)-coordinates: \\(x = 0\\) and \\(x = \\dfrac{14}{12}\\)."
          }
        ]
      }
    ],
    "examinerTip": "Always show the explicit equation \\(\\dfrac{dy}{dx} = 0\\) before solving for stationary points—this earns the M1 method mark even if an arithmetic slip occurs.",
    "ti_ar": "وضع المصحح: المماس والنقاط الحرجة (Rational Functions, Limits & Continuity)",
    "q_ar": "لمنحنى الدالة \\(y = 4x^3 - 7x^2 + 4\\): (أ) أوجد \\(\\dfrac{dy}{dx}\\) وميل المماس عند \\(x = 2\\). (ب) أوجد الإحداثيات السينية للنقاط الحرجة.",
    "examinerTip_ar": "اكتب دائماً شرط النقطة الحرجة \\(\\dfrac{dy}{dx} = 0\\) صراحةً لضمان الحصول على درجة الطريقة (M1)."
  },
  {
    "t": "sb",
    "ti": "Step Builder: Instantaneous Rate of Change (Rational Functions, Limits & Continuity)",
    "steps": [
      {
        "l": "Given \\(f(x) = 4x^2 + 7x - 5\\), find the coefficient of \\(x\\) in \\(f'(x)\\):",
        "a": "8",
        "h": "Multiply power 2 by 4."
      },
      {
        "l": "Find the constant term in \\(f'(x)\\):",
        "a": "7",
        "h": "The derivative of 7x is 7."
      },
      {
        "l": "Evaluate the instantaneous rate of change \\(f'(2) =\\)",
        "a": "23",
        "h": "Compute 8(2) + 7."
      }
    ],
    "ti_ar": "بناء الخطوات: حساب المشتقة ومعدل التغير اللحظي (Rational Functions, Limits & Continuity)",
    "steps_ar": [
      {
        "l": "للدالة \\(f(x) = 4x^2 + 7x - 5\\)، معامل \\(x\\) في \\(f'(x)\\) يساوي:",
        "a": "8",
        "h": "اضرب الأس 2 في 4."
      },
      {
        "l": "الحد الثابت في المشتقة \\(f'(x)\\) يساوي:",
        "a": "7",
        "h": "مشتقة 7x هي 7."
      },
      {
        "l": "احسب قيمة المشتقة \\(f'(2) =\\)",
        "a": "23",
        "h": "احسب 8(2) + 7."
      }
    ]
  },
  {
    "t": "mt",
    "ti": "Matching: Differentiation Rules & Analytic Criteria (Rational Functions, Limits & Continuity)",
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
    "ti_ar": "مطابقة: قواعد الاشتقاق ومعايير القيم القصوى (Rational Functions, Limits & Continuity)",
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

D["pc-sequences"] = [
  {
    "t": "num",
    "ti": "Numeric Entry: Arithmetic Series Sum",
    "ti_ar": "إدخال رقمي: مجموع متسلسلة حسابية",
    "q": "Find the sum of the first 20 terms of an arithmetic sequence with first term \\(a_1 = 3\\) and common difference \\(d = 4\\).",
    "q_ar": "أوجد مجموع أول 20 حداً من متتابعة حسابية حدها الأول \\(a_1 = 3\\) وأساسها \\(d = 4\\).",
    "a": 820,
    "ex": "\\(a_{20} = 3 + 19(4) = 3 + 76 = 79\\). \\(S_{20} = \\frac{20}{2}(a_1 + a_{20}) = 10(3 + 79) = 10(82) = 820\\).",
    "ex_ar": "\\(a_{20} = 3 + 19(4) = 3 + 76 = 79\\). ومن قانون المجموع: \\(S_{20} = \\frac{20}{2}(a_1 + a_{20}) = 10(3 + 79) = 10(82) = 820\\)."
  },
  {
    "t": "ord",
    "ti": "Order the Steps: Mathematical Induction",
    "ti_ar": "رتّب الخطوات: الاستقراء الرياضي",
    "prompt": "Arrange the stages of a mathematical induction proof:",
    "prompt_ar": "رتب مراحل برهان الاستقراء الرياضي:",
    "items": [
      "State the proposition \\(P(n)\\) to be established for integers \\(n \\ge 1\\).",
      "Base Case: prove that \\(P(1)\\) is true.",
      "Induction Hypothesis: assume \\(P(k)\\) holds for an arbitrary integer \\(k \\ge 1\\).",
      "Inductive Step: deduce that \\(P(k+1)\\) must be true using the hypothesis.",
      "Conclusion: by induction, \\(P(n)\\) holds for all \\(n \\ge 1\\)."
    ],
    "items_ar": [
      "تحديد القضية أو العبارة الرياضية \\(P(n)\\) المطلوب إثباتها للأعداد الصحيحة \\(n \\ge 1\\).",
      "خطوة الأساس: إثبات صحة العبارة عند \\(P(1)\\).",
      "فرضية الاستقراء: افتراض صحة العبارة \\(P(k)\\) لعدد صحيح اختياري \\(k \\ge 1\\).",
      "الخطوة الاستقرائية: إثبات أن العبارة صحيحة عند \\(P(k+1)\\) بالاعتماد على الفرضية.",
      "الخاتمة: بالاستقراء الرياضي، فإن \\(P(n)\\) صحيحة لجميع الأعداد الصحيحة \\(n \\ge 1\\)."
    ],
    "ex": "Induction establishes the base case, assumes P(k), derives P(k+1), and concludes universal truth.",
    "ex_ar": "يثبت الاستقراء خطوة الأساس، ثم يفترض P(k)، ويستنتج P(k+1)، ثم يقرر صحة العبارة لجميع الأعداد."
  },
  {
    "t": "fn",
    "ti": "Explorer: Partial Sums of a Geometric Series",
    "ti_ar": "مستكشف: المجاميع الجزئية لمتسلسلة هندسية",
    "fns": [
      {
        "expr": "2*(1-r^x)/(1-r)",
        "color": "#1E3A6E",
        "label": "S_n"
      }
    ],
    "xrange": [
      0,
      10
    ],
    "yrange": [
      0,
      5
    ],
    "params": [
      {
        "name": "r",
        "label": "Ratio r",
        "min": 0.2,
        "max": 0.8,
        "step": 0.1,
        "default": 0.5
      }
    ]
  },
  {
    "t": "sr",
    "ti": "Worked Example: Infinite Geometric Series",
    "ti_ar": "مثال محلول: متسلسلة هندسية لانهائية",
    "steps": [
      "Find \\(\\displaystyle\\sum_{n=1}^{\\infty}8\\left(\\dfrac14\\right)^{n-1}\\). This is geometric with \\(a=8\\), \\(r=\\dfrac14\\).",
      "Since \\(|r|<1\\), it converges. Use \\(S=\\dfrac{a}{1-r}\\).",
      "Substitute: \\(S=\\dfrac{8}{1-\\frac14}=\\dfrac{8}{\\frac34}=\\dfrac{32}{3}\\)."
    ],
    "steps_ar": [
      "أوجد \\(\\displaystyle\\sum_{n=1}^{\\infty}8\\left(\\dfrac14\\right)^{n-1}\\). هذه متسلسلة هندسية فيها \\(a=8\\) و \\(r=\\dfrac14\\).",
      "بما أن \\(|r|<1\\)، فإن المتسلسلة تتقارب. نستخدم القانون: \\(S=\\dfrac{a}{1-r}\\).",
      "التعويض: \\(S=\\dfrac{8}{1-\\frac14}=\\dfrac{8}{\\frac34}=\\dfrac{32}{3}\\)."
    ]
  },
  {
    "t": "qc",
    "ti": "Quick Check: Divergent Series",
    "ti_ar": "فحص سريع: المتسلسلات المتباعدة",
    "q": "Does \\(\\displaystyle\\sum_{n=1}^{\\infty}3^n\\) converge?",
    "q_ar": "هل المتسلسلة \\(\\displaystyle\\sum_{n=1}^{\\infty}3^n\\) متقاربة؟",
    "o": [
      "No — it diverges",
      "Yes, to 3",
      "Yes, to 1",
      "Yes, to 0"
    ],
    "o_ar": [
      "لا — بل متباعدة",
      "نعم، وتتقارب إلى 3",
      "نعم، وتتقارب إلى 1",
      "نعم، وتتقارب إلى 0"
    ],
    "a": 0,
    "ex": "The ratio \\(r=3\\) has \\(|r|>1\\), so the series diverges — its terms grow without bound.",
    "ex_ar": "الأساس \\(r=3\\) يحقق \\(|r|>1\\)، لذا فإن المتسلسلة متباعدة — وتنمو حدودها بلا حدود."
  },
  {
    "t": "se",
    "ti": "Spot the Error: Algebraic & Domain Verification (Sequences, Series, Induction & the Binomial Theorem)",
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
    "ti_ar": "اكتشف الخطأ: الجذور الدخيلة والتحقق من المجال (Sequences, Series, Induction & the Binomial Theorem)",
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
    "ti": "Examiner Mode: Multi-Step Structured Problem (Sequences, Series, Induction & the Binomial Theorem)",
    "q": "Let \\(f(x) = x^2 - 6x + 11\\) for \\(x \\ge 3\\). (a) Express \\(f(x)\\) in completed-square vertex form and state the range of \\(f\\). (b) Find an expression for the inverse function \\(f^{-1}(x)\\) and state its domain.",
    "parts": [
      {
        "label": "Part (a) — Vertex Form & Range",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "Complete the square: \\(f(x) = (x - 3)^2 - 9 + 11 = (x - 3)^2 + 2\\)."
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
            "text": "Set \\(y = (x - 3)^2 + 2 \\implies (x - 3)^2 = y - 2\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "Select positive branch (since \\(x \\ge 3\\)): \\(f^{-1}(x) = 3 + \\sqrt{x - 2}\\)."
          },
          {
            "code": "B1",
            "marks": 1,
            "text": "State domain of \\(f^{-1}\\): \\(x \\ge 2\\) (matching the range of \\(f\\))."
          }
        ]
      }
    ],
    "examinerTip": "Writing \\(\\pm\\sqrt{x - 2}\\) for \\(f^{-1}(x)\\) loses the final A1 mark because a function must be single-valued; use the domain restriction \\(x \\ge 3\\) to choose the \\(+\\) sign.",
    "ti_ar": "وضع المصحح: إكمال المربع والدالة العكسية (Sequences, Series, Induction & the Binomial Theorem)",
    "q_ar": "لتكن \\(f(x) = x^2 - 6x + 11\\) حيث \\(x \\ge 3\\). (أ) اكتب \\(f(x)\\) في صورة المربع الكامل وحدد مداها. (ب) أوجد قاعدة الدالة العكسية \\(f^{-1}(x)\\) ومجالها.",
    "examinerTip_ar": "الدالة العكسية يجب أن تكون وحيدة القيمة، لذا نختار الإشارة الموجبة للجذر \\(3 + \\sqrt{x - 2}\\) لأن \\(x \\ge 3\\)."
  },
  {
    "t": "sb",
    "ti": "Step Builder: Completing the Square & Vertex Analysis (Sequences, Series, Induction & the Binomial Theorem)",
    "steps": [
      {
        "l": "In \\(y = x^2 - 6x + 11\\), halve the \\(x\\)-coefficient to write \\((x - h)^2\\) where \\(h =\\)",
        "a": "3",
        "h": "Take half of 6."
      },
      {
        "l": "Compute the minimum value \\(k = 11 - 3^2 =\\)",
        "a": "2",
        "h": "Subtract 9 from 11."
      },
      {
        "l": "Evaluate \\(y\\) when \\(x = 5\\): \\(y =\\)",
        "a": "6",
        "h": "Compute \\((2)^2 + 2\\)."
      }
    ],
    "ti_ar": "بناء الخطوات: إكمال المربع وإيجاد القيمة الصغرى (Sequences, Series, Induction & the Binomial Theorem)",
    "steps_ar": [
      {
        "l": "في الدالة \\(y = x^2 - 6x + 11\\): قيمة \\(h\\) في \\((x - h)^2\\) تساوي:",
        "a": "3",
        "h": "اقسم معامل x وهو 6 على 2."
      },
      {
        "l": "احسب القيمة الصغرى \\(k = 11 - 3^2 =\\)",
        "a": "2",
        "h": "اطرح 9 من 11."
      },
      {
        "l": "احسب قيمة \\(y\\) عندما \\(x = 5\\):",
        "a": "6",
        "h": "احسب \\(4 + 2\\)."
      }
    ]
  },
  {
    "t": "mt",
    "ti": "Matching: Core Algebraic & Analytic Principles (Sequences, Series, Induction & the Binomial Theorem)",
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
    "ti_ar": "مطابقة: المبادئ الجبرية والتحليلية الأساسية (Sequences, Series, Induction & the Binomial Theorem)",
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
