/* Interactive Practice data for /addmath/ - one entry per chapter section id.
   Shipped as public/js/ix/addmath.js and loaded only on that track's page by the
   engine in src/scripts/modules/19-interactive-activities-engine-v1.js
   (Plan 5 Phase 5.015, ADR 0033). Entry shapes (qc/mt/tf/sb/sr/fn/num/ord/cat/gp/se/ms) are
   documented there. */
(window.__ixData = window.__ixData || []).push(function (D) {
D["am-functions-quadratics"] = [
  {
    "t": "qc",
    "ti": "Quick Check: One-to-One Condition for Inverse Functions",
    "q": "Why must a function \\( f(x) \\) be strictly one-to-one across its domain in order to possess an inverse function \\( f^{-1}(x) \\)?",
    "o": [
      "Because each output value y must map uniquely back to exactly one input value x",
      "Because the function must always be increasing and never cross the x-axis",
      "Because quadratic functions cannot have inverses under any circumstances",
      "Because the discriminant must be strictly equal to zero"
    ],
    "a": 0,
    "ex": "An inverse function reverses the mapping: f⁻¹(y) = x. If f were many-to-one (e.g. f(2)=4 and f(-2)=4), f⁻¹(4) would have two outputs, violating the definition of a mathematical function.",
    "ti_ar": "فحص سريع: شرط الدالة المتباينة لوجود دالة عكسية",
    "q_ar": "لماذا يجب أن تكون الدالة \\( f(x) \\) متباينة (one-to-one) تماماً على مجالها لكي تمتلك دالة عكسية \\( f^{-1}(x) \\)؟",
    "o_ar": [
      "لأن كل قيمة ناتجة y يجب أن ترتبط بشكل فريد بقيمة مدخلة واحدة فقط x",
      "لأن الدالة يجب أن تكون متزايدة دائماً ولا تقطع محور السينات",
      "لأن الدوال التربيعية لا يمكن أن تمتلك دوالاً عكسية تحت أي ظرف",
      "لأن المميز يجب أن يكون مساوياً للصفر تماماً"
    ],
    "ex_ar": "الدالة العكسية تعكس اتجاه المخطط السهمي: f⁻¹(y) = x. فإذا كانت الدالة متعددة إلى واحد (many-to-one)، فإن الدالة العكسية ستنتج أكثر من مخرج لنفس المدخل، مما ينقض تعريف الدالة الرياضية."
  },
  {
    "t": "tf",
    "ti": "True / False: Quadratic Discriminant Criteria",
    "items": [
      {
        "s": "If the line y = mx + c is a tangent to a parabola, the resulting quadratic has b² - 4ac = 0.",
        "a": true
      },
      {
        "s": "The graph of y = |f(x)| reflects any portions of y = f(x) below the x-axis upward into the positive y-region.",
        "a": true
      },
      {
        "s": "A quadratic function f(x) = ax² + bx + c with domain x ∈ ℝ always possesses an inverse function f⁻¹(x).",
        "a": false
      }
    ],
    "ti_ar": "صح / خطأ: معايير مميز المعادلة التربيعية",
    "items_ar": [
      {
        "s": "إذا كان المستقيم y = mx + c مماساً للقطع المكافئ، فإن المعادلة التربيعية الناتجة يكون مميزها b² - 4ac = 0.",
        "a": true
      },
      {
        "s": "منحنى دالة المقياس y = |f(x)| يعكس أي أجزاء تقع أسفل محور السينات إلى المنطقة الموجبة أعلى المحور.",
        "a": true
      },
      {
        "s": "الدالة التربيعية f(x) = ax² + bx + c بمجالها الكامل x ∈ ℝ تمتلك دائمًا دالة عكسية f⁻¹(x).",
        "a": false
      }
    ]
  },
  {
    "t": "mt",
    "ti": "Matching: Function Concepts & Notation",
    "p": [
      {
        "l": "f(g(x))",
        "r": "Composite function: apply g first, then f"
      },
      {
        "l": "y = x",
        "r": "Line of reflection between f(x) and f⁻¹(x)"
      },
      {
        "l": "b² - 4ac > 0",
        "r": "Curve and line intersect at two distinct points"
      },
      {
        "l": "b² - 4ac < 0",
        "r": "Curve and line do not meet (strictly separated)"
      }
    ],
    "ti_ar": "مطابقة: مفاهيم الدوال والرموز الرياضية",
    "p_ar": [
      {
        "l": "f(g(x))",
        "r": "دالة مركبة: يتم تطبيق g أولاً ثم الدالة f"
      },
      {
        "l": "y = x",
        "r": "خط الانعكاس التناظري بين منحنى f(x) والدالة العكسية f⁻¹(x)"
      },
      {
        "l": "b² - 4ac > 0",
        "r": "المستقيم يقطع المنحنى في نقطتين حقيقيتين متمايزتين"
      },
      {
        "l": "b² - 4ac < 0",
        "r": "المستقيم والمنحنى لا يتقاطعان مطلقاً (متباعدان)"
      }
    ]
  },
  {
    "t": "se",
    "ti": "Spot the Error: Algebraic & Domain Verification (Functions, Modulus & Quadratic Theory)",
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
    "ti_ar": "اكتشف الخطأ: الجذور الدخيلة والتحقق من المجال (الدوال والقيمة المطلقة ونظرية المعادلات التربيعية)",
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
    "ti": "Examiner Mode: Multi-Step Structured Problem (Functions, Modulus & Quadratic Theory)",
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
    "ti_ar": "وضع المصحح: إكمال المربع والدالة العكسية (الدوال والقيمة المطلقة ونظرية المعادلات التربيعية)",
    "q_ar": "لتكن \\(f(x) = x^2 - 8x + 19\\) حيث \\(x \\ge 4\\). (أ) اكتب \\(f(x)\\) في صورة المربع الكامل وحدد مداها. (ب) أوجد قاعدة الدالة العكسية \\(f^{-1}(x)\\) ومجالها.",
    "examinerTip_ar": "الدالة العكسية يجب أن تكون وحيدة القيمة، لذا نختار الإشارة الموجبة للجذر \\(4 + \\sqrt{x - 3}\\) لأن \\(x \\ge 4\\)."
  },
  {
    "t": "sb",
    "ti": "Step Builder: Completing the Square & Vertex Analysis (Functions, Modulus & Quadratic Theory)",
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
    "ti_ar": "بناء الخطوات: إكمال المربع وإيجاد القيمة الصغرى (الدوال والقيمة المطلقة ونظرية المعادلات التربيعية)",
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
    "t": "num",
    "ti": "Numeric Entry: Discriminant Tangency Condition",
    "ti_ar": "إدخال رقمي: شرط التماس باستخدام المميز",
    "q": "Find the positive value of \\( k \\) for which the line \\( y = kx - 4 \\) is a tangent to the parabola \\( y = x^2 + 5 \\).",
    "q_ar": "أوجد القيمة الموجبة للثابت \\( k \\) التي تجعل المستقيم \\( y = kx - 4 \\) مماساً للقطع المكافئ \\( y = x^2 + 5 \\).",
    "a": 6,
    "h": "Equate \\( x^2 + 5 = kx - 4 \\implies x^2 - kx + 9 = 0 \\) and set \\( b^2 - 4ac = 0 \\).",
    "h_ar": "ساوِ المعادلتين \\( x^2 - kx + 9 = 0 \\) واجعل المميز \\( b^2 - 4ac = 0 \\).",
    "sol": "Setting \\( \\Delta = (-k)^2 - 4(1)(9) = k^2 - 36 = 0 \\) with \\( k > 0 \\) gives \\( k = 6 \\).",
    "sol_ar": "بوضع المميز \\( k^2 - 36 = 0 \\) ومع كون \\( k > 0 \\) نحصل على \\( k = 6 \\)."
  },
  {
    "t": "ord",
    "ti": "Order the Steps: Finding an Inverse Function on a Restricted Domain",
    "ti_ar": "رتّب الخطوات: إيجاد الدالة العكسية على مجال مقيّد",
    "prompt": "Arrange the steps in order to find \\( f^{-1}(x) \\) for \\( f(x) = (x - 3)^2 + 2 \\) where \\( x \\ge 3 \\):",
    "prompt_ar": "رتب خطوات إيجاد الدالة العكسية \\( f^{-1}(x) \\) للدالة \\( f(x) = (x - 3)^2 + 2 \\) حيث \\( x \\ge 3 \\):",
    "items": [
      "Write \\( y = (x - 3)^2 + 2 \\) and note that the range of \\( f \\) is \\( y \\ge 2 \\).",
      "Subtract 2 from both sides: \\( y - 2 = (x - 3)^2 \\).",
      "Take the positive square root (since \\( x \\ge 3 \\)): \\( x - 3 = +\\sqrt{y - 2} \\).",
      "Isolate \\( x \\) and swap variables: \\( f^{-1}(x) = 3 + \\sqrt{x - 2} \\) for \\( x \\ge 2 \\)."
    ],
    "items_ar": [
      "اكتب \\( y = (x - 3)^2 + 2 \\) وحدد مدى الدالة \\( y \\ge 2 \\).",
      "اطرح 2 من الطرفين: \\( y - 2 = (x - 3)^2 \\).",
      "خذ الجذر التربيعي الموجب (لأن \\( x \\ge 3 \\)): \\( x - 3 = +\\sqrt{y - 2} \\).",
      "اعزل \\( x \\) وبدّل المتغيرين: \\( f^{-1}(x) = 3 + \\sqrt{x - 2} \\) لكل \\( x \\ge 2 \\)."
    ],
    "ex": "Always use the domain restriction of f to choose the correct sign of the square root.",
    "ex_ar": "استخدم دائماً شرط مجال الدالة الأصلية لاختيار الإشارة الصحيحة للجذر التربيعي."
  },
  {
    "t": "cat",
    "ti": "Categorize: Nature of Roots by Discriminant",
    "ti_ar": "تصنيف: طبيعة الجذور حسب قيمة المميز",
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
        "s": "\\( x^2 - 5x + 4 = 0 \\)",
        "s_ar": "\\( x^2 - 5x + 4 = 0 \\)",
        "cat": 0
      },
      {
        "s": "\\( 2x^2 + 3x + 5 = 0 \\)",
        "s_ar": "\\( 2x^2 + 3x + 5 = 0 \\)",
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
  }
];

D["am-polynomials-binomial"] = [
  {
    "t": "qc",
    "ti": "Quick Check: Remainder Theorem",
    "q": "If a polynomial \\( P(x) \\) is divided by \\( (2x - 3) \\), which calculation yields the exact remainder?",
    "o": [
      "P(3/2)",
      "P(-3/2)",
      "P(3)",
      "P(-3)"
    ],
    "a": 0,
    "ex": "By the Remainder Theorem, dividing P(x) by (ax - b) leaves a remainder of R = P(b/a). Setting 2x - 3 = 0 gives x = 3/2, so R = P(1.5).",
    "ti_ar": "فحص سريع: نظرية الباقي في كثيرات الحدود",
    "q_ar": "إذا قُسمت كثيرة الحدود \\( P(x) \\) على \\( (2x - 3) \\)، فأي مقدار يعطي الباقي بدقة؟",
    "o_ar": [
      "P(3/2)",
      "P(-3/2)",
      "P(3)",
      "P(-3)"
    ],
    "ex_ar": "وفقاً لنظرية الباقي، فإن قسمة P(x) على (ax - b) تعطي باقياً يساوي R = P(b/a). وبمساواة 2x - 3 = 0 نجد أن x = 3/2، وبالتالي الباقي هو P(1.5)."
  },
  {
    "t": "sb",
    "ti": "Step Builder: Binomial Term Evaluation",
    "steps": [
      {
        "l": "Write the general term formula T_{r+1} for (a + b)ⁿ",
        "a": "binom(n, r) * a^(n-r) * b^r"
      },
      {
        "l": "For (2x - 3)⁵, identify the power n",
        "a": "5"
      },
      {
        "l": "Find the value of r for the term containing x³",
        "a": "2"
      }
    ],
    "ti_ar": "بناء الخطوات: حساب حد مفكوك ذات الحدين",
    "steps_ar": [
      {
        "l": "اكتب صيغة الحد العام T_{r+1} لمفكوك ذات الحدين (a + b)ⁿ",
        "a": "binom(n, r) * a^(n-r) * b^r"
      },
      {
        "l": "في مفكوك (2x - 3)⁵، حدد قيمة الأس n",
        "a": "5"
      },
      {
        "l": "أوجد قيمة r للحد المشتمل على x³",
        "a": "2"
      }
    ]
  },
  {
    "t": "tf",
    "ti": "True / False: Factor Theorem & Cubics",
    "items": [
      {
        "s": "If P(4) = 0, then (x - 4) is guaranteed to be an exact factor of polynomial P(x).",
        "a": true
      },
      {
        "s": "Every cubic polynomial with real coefficients must have at least one real root.",
        "a": true
      },
      {
        "s": "In the expansion of (x + 1/x)⁶, there is no constant term independent of x.",
        "a": false
      }
    ],
    "ti_ar": "صح / خطأ: نظرية العوامل والدوال التكعيبية",
    "items_ar": [
      {
        "s": "إذا كان P(4) = 0، فإن المقدار (x - 4) عامل مؤكد من عوامل كثيرة الحدود P(x).",
        "a": true
      },
      {
        "s": "كل كثيرة حدود تكعيبية ذات معاملات حقيقية يجب أن تمتلك جذراً حقيقياً واحداً على الأقل.",
        "a": true
      },
      {
        "s": "في مفكوك (x + 1/x)⁶، لا يوجد حد ثابت خالٍ من المتغير x.",
        "a": false
      }
    ]
  },
  {
    "t": "se",
    "ti": "Spot the Error: Improper Rational Decomposition (Polynomials, Remainder Theorem & Binomial Theorem)",
    "q": "A student attempts to decompose \\(\\dfrac{x^2 + 11x + 30}{(x + 4)(x + 7)}\\) into partial fractions. Which step contains the first mathematical flaw?",
    "steps": [
      "Expand the denominator: \\((x + 4)(x + 7) = x^2 + 11x + 28\\).",
      "Write the partial fraction template directly as \\(\\dfrac{x^2 + 11x + 30}{(x + 4)(x + 7)} \\equiv \\dfrac{A}{x + 4} + \\dfrac{B}{x + 7}\\).",
      "Multiply both sides by \\((x + 4)(x + 7)\\) to get \\(x^2 + 11x + 30 = A(x + 7) + B(x + 4)\\).",
      "Substitute \\(x = -4\\) and \\(x = -7\\) to solve for \\(A\\) and \\(B\\)."
    ],
    "errorStep": 2,
    "reasons": [
      "Because \\(\\deg(\\text{numerator}) = \\deg(\\text{denominator}) = 2\\), the fraction is improper and requires a leading quotient constant \\(1 + \\dfrac{A}{x+4} + \\dfrac{B}{x+7}\\).",
      "Because the denominator has two distinct linear factors, it requires a quadratic numerator \\(Ax + B\\).",
      "Because polynomial multiplication is only valid when \\(x > 0\\)."
    ],
    "correctReason": 0,
    "h": "Compare the degree of the numerator (\\(2\\)) with the degree of the denominator (\\(2\\)).",
    "sol": "Because both numerator and denominator have degree 2, divide first: \\(\\dfrac{x^2 + 11x + 30}{x^2 + 11x + 28} = 1 + \\dfrac{2}{(x + 4)(x + 7)}\\).",
    "ti_ar": "اكتشف الخطأ: تفكيك الكسور الجبرية غير الفعلية (كثيرات الحدود ونظرية الباقي ونظرية ذات الحدين)",
    "q_ar": "حاول طالب تفكيك الكسر \\(\\dfrac{x^2 + 11x + 30}{(x + 4)(x + 7)}\\) إلى كسور جزئية. أي خطوة تحتوي على الخطأ الرياضي الأول؟",
    "steps_ar": [
      "فك المقام: \\((x + 4)(x + 7) = x^2 + 11x + 28\\).",
      "كتابة قالب الكسور الجزئية مباشرةً: \\(\\dfrac{x^2 + 11x + 30}{(x + 4)(x + 7)} \\equiv \\dfrac{A}{x + 4} + \\dfrac{B}{x + 7}\\).",
      "ضرب الطرفين في المقام المشترك للحصول على \\(x^2 + 11x + 30 = A(x + 7) + B(x + 4)\\).",
      "التعويض عن \\(x = -4\\) و \\(x = -7\\) لإيجاد \\(A, B\\)."
    ],
    "reasons_ar": [
      "لأن درجة البسط تساوي درجة المقام (2)، فالكسر غير فعلي ويجب إضافة ثابت القسمة \\(1 + \\dfrac{A}{x+4} + \\dfrac{B}{x+7}\\).",
      "لأن المقام يتطلب بسطاً تربيعياً.",
      "لأن الضرب في المقام غير جائز جبرياً."
    ],
    "h_ar": "قارن بين درجة البسط (2) ودرجة المقام (2).",
    "sol_ar": "بما أن درجة البسط تساوي درجة المقام، نقسم أولاً فنحصل على \\(1 + \\dfrac{2}{(x + 4)(x + 7)}\\)."
  },
  {
    "t": "ms",
    "ti": "Examiner Mode: Remainder Theorem & Partial Fractions (Polynomials, Remainder Theorem & Binomial Theorem)",
    "q": "Let \\(P(x) = 2x^3 - 4x^2 + kx + 6\\). Given that \\((x - 2)\\) is a factor of \\(P(x)\\): (a) Show that \\(k = -3\\). (b) Express \\(\\dfrac{3x + 1}{(x - 1)(x + 2)}\\) in partial fractions.",
    "parts": [
      {
        "label": "Part (a) — Factor Theorem Application",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "Apply Factor Theorem \\(P(2) = 0 \\implies 2(2)^3 - 4(2)^2 + 2k + 6 = 0\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "Simplify \\(16 - 16 + 2k + 6 = 0 \\implies 2k = -6 \\implies k = -3\\)."
          }
        ]
      },
      {
        "label": "Part (b) — Partial Fraction Decomposition",
        "marks": 3,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "Set up identity \\(3x + 1 \\equiv A(x + 2) + B(x - 1)\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "Substitute \\(x = 1 \\implies 4 = 3A \\implies A = \\tfrac{4}{3}\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "Substitute \\(x = -2 \\implies -5 = -3B \\implies B = \\tfrac{5}{3}\\), giving \\(\\dfrac{4}{3(x-1)} + \\dfrac{5}{3(x+2)}\\)."
          }
        ]
      }
    ],
    "examinerTip": "Candidates frequently substitute \\(x = -2\\) instead of \\(x = 2\\) when testing the factor \\((x - 2)\\). Always solve \\(\\text{divisor} = 0\\) first.",
    "ti_ar": "وضع المصحح: نظرية العوامل والكسور الجزئية (كثيرات الحدود ونظرية الباقي ونظرية ذات الحدين)",
    "q_ar": "لتكن \\(P(x) = 2x^3 - 4x^2 + kx + 6\\). إذا كان \\((x - 2)\\) عاملاً لـ \\(P(x)\\): (أ) أثبت أن \\(k = -3\\). (ب) فكك \\(\\dfrac{3x + 1}{(x - 1)(x + 2)}\\) إلى كسور جزئية.",
    "examinerTip_ar": "تأكد دائماً من مساواة المقسوم عليه بالصفر \\(x - 2 = 0 \\implies x = 2\\) قبل التعويض في كثيرة الحدود."
  },
  {
    "t": "mt",
    "ti": "Matching: Polynomial & Rational Structure (Polynomials, Remainder Theorem & Binomial Theorem)",
    "p": [
      {
        "l": "\\(P(a) = 0\\)",
        "r": "\\((x - a)\\) is a linear factor of \\(P(x)\\)"
      },
      {
        "l": "\\(\\deg P(x) \\ge \\deg Q(x)\\)",
        "r": "Improper rational fraction: perform long division first"
      },
      {
        "l": "\\(\\dfrac{px+q}{(x-a)^2}\\)",
        "r": "Decomposes as \\(\\dfrac{A}{x-a} + \\dfrac{B}{(x-a)^2}\\)"
      },
      {
        "l": "\\(\\dfrac{px+q}{(x-a)(x^2+c)}\\)",
        "r": "Decomposes as \\(\\dfrac{A}{x-a} + \\dfrac{Bx+C}{x^2+c}\\)"
      }
    ],
    "ti_ar": "مطابقة: كثيرات الحدود والكسور الجزئية (كثيرات الحدود ونظرية الباقي ونظرية ذات الحدين)",
    "p_ar": [
      {
        "l": "\\(P(a) = 0\\)",
        "r": "المقدار \\((x - a)\\) عامل خطي لكثيرة الحدود \\(P(x)\\)"
      },
      {
        "l": "\\(\\deg P(x) \\ge \\deg Q(x)\\)",
        "r": "كسر غير فعلي: يجب إجراء القسمة المطولة أولاً"
      },
      {
        "l": "\\(\\dfrac{px+q}{(x-a)^2}\\)",
        "r": "يتفكك على الصورة \\(\\dfrac{A}{x-a} + \\dfrac{B}{(x-a)^2}\\)"
      },
      {
        "l": "\\(\\dfrac{px+q}{(x-a)(x^2+c)}\\)",
        "r": "يتفكك على الصورة \\(\\dfrac{A}{x-a} + \\dfrac{Bx+C}{x^2+c}\\)"
      }
    ]
  },
  {
    "t": "num",
    "ti": "Numeric Entry: Term Independent of x in Binomial Expansion",
    "ti_ar": "إدخال رقمي: الحد الخالي من x في مفكوك ذات الحدين",
    "q": "Find the constant term (independent of \\( x \\)) in the binomial expansion of \\( \\left(2x + \\frac{1}{x}\\right)^4 \\).",
    "q_ar": "أوجد الحد الثابت (الخالي من \\( x \\)) في مفكوك ذات الحدين \\( \\left(2x + \\frac{1}{x}\\right)^4 \\).",
    "a": 24,
    "h": "The general term is \\( \\binom{4}{r}(2x)^{4-r}(x^{-1})^r = \\binom{4}{r}2^{4-r}x^{4-2r} \\). Set \\( 4 - 2r = 0 \\).",
    "h_ar": "الحد العام هو \\( \\binom{4}{r}2^{4-r}x^{4-2r} \\). ضع \\( 4 - 2r = 0 \\) لإيجاد \\( r = 2 \\).",
    "sol": "For \\( r = 2 \\), the term is \\( \\binom{4}{2}(2)^{2} = 6 \\times 4 = 24 \\).",
    "sol_ar": "عند \\( r = 2 \\)، يكون الحد الثابت \\( \\binom{4}{2}(2)^{2} = 6 \\times 4 = 24 \\)."
  },
  {
    "t": "ord",
    "ti": "Order the Steps: Factorizing a Cubic Polynomial Completely",
    "ti_ar": "رتّب الخطوات: التحليل الكامل لكثيرة حدود تكعيبية",
    "prompt": "Arrange the steps to factorize \\( P(x) = x^3 - 4x^2 + x + 6 \\) completely:",
    "prompt_ar": "رتب خطوات تحليل كثيرة الحدود \\( P(x) = x^3 - 4x^2 + x + 6 \\) تحليلاً كاملاً:",
    "items": [
      "Test integer divisors of 6 using the Factor Theorem: \\( P(-1) = (-1)^3 - 4(-1)^2 + (-1) + 6 = 0 \\).",
      "Conclude by the Factor Theorem that \\( (x + 1) \\) is a linear factor of \\( P(x) \\).",
      "Divide \\( P(x) \\) by \\( (x + 1) \\) to obtain the quadratic quotient \\( x^2 - 5x + 6 \\).",
      "Factor the quadratic quotient into \\( (x - 2)(x - 3) \\) to get \\( P(x) = (x + 1)(x - 2)(x - 3) \\)."
    ],
    "items_ar": [
      "اختبر قواسم العدد 6 بنظرية العوامل: \\( P(-1) = (-1)^3 - 4(-1)^2 + (-1) + 6 = 0 \\).",
      "استنتج أن \\( (x + 1) \\) عامل خطي لكثيرة الحدود \\( P(x) \\).",
      "اقسم \\( P(x) \\) على \\( (x + 1) \\) للحصول على خارج القسمة التربيعي \\( x^2 - 5x + 6 \\).",
      "حلل العبارة التربيعية إلى \\( (x - 2)(x - 3) \\) فيكون \\( P(x) = (x + 1)(x - 2)(x - 3) \\)."
    ],
    "ex": "Find one linear root via the Factor Theorem, divide to reduce to a quadratic, then factorize the quadratic.",
    "ex_ar": "أوجد جذراً أولياً بنظرية العوامل، ثم اقسم لتقليص الدرجة إلى تربيعية، وحللها."
  },
  {
    "t": "cat",
    "ti": "Categorize: Remainder & Factor Theorem Evaluations",
    "ti_ar": "تصنيف: تطبيقات نظريتي الباقي والعوامل",
    "categories": [
      "Exact Factor (Remainder = 0)",
      "Non-Zero Remainder (Not a Factor)"
    ],
    "categories_ar": [
      "عامل فعلي (الباقي = 0)",
      "باقي غير صفري (ليس عاملاً)"
    ],
    "items": [
      {
        "s": "Dividing \\( x^3 - 8 \\) by \\( (x - 2) \\)",
        "s_ar": "قسمة \\( x^3 - 8 \\) على \\( (x - 2) \\)",
        "cat": 0
      },
      {
        "s": "Dividing \\( x^3 + 8 \\) by \\( (x - 2) \\)",
        "s_ar": "قسمة \\( x^3 + 8 \\) على \\( (x - 2) \\)",
        "cat": 1
      },
      {
        "s": "Dividing \\( x^3 - 3x + 2 \\) by \\( (x - 1) \\)",
        "s_ar": "قسمة \\( x^3 - 3x + 2 \\) على \\( (x - 1) \\)",
        "cat": 0
      },
      {
        "s": "Dividing \\( x^3 + x^2 + 1 \\) by \\( (x + 1) \\)",
        "s_ar": "قسمة \\( x^3 + x^2 + 1 \\) على \\( (x + 1) \\)",
        "cat": 1
      }
    ],
    "ex": "By the Factor Theorem, (x − a) is a factor of P(x) if and only if P(a) = 0.",
    "ex_ar": "وفق نظرية العوامل، يكون (x − a) عاملاً لـ P(x) إذا وفقط إذا كان P(a) = 0."
  }
];

D["am-logs-exponentials"] = [
  {
    "t": "qc",
    "ti": "Quick Check: Reducing Non-Linear Laws to Straight Lines",
    "q": "To convert the exponential relationship \\( y = ab^x \\) into linear form \\( Y = mX + c \\), which variables must be plotted on the axes?",
    "o": [
      "Plot ln(y) against x; gradient m = ln(b), intercept c = ln(a)",
      "Plot ln(y) against ln(x); gradient m = b, intercept c = a",
      "Plot y against ln(x); gradient m = ln(b), intercept c = a",
      "Plot 1/y against x; gradient m = b, intercept c = a"
    ],
    "a": 0,
    "ex": "Taking natural logarithms: ln(y) = ln(a · b^x) = ln(a) + x ln(b). Comparing with Y = mX + c gives Y = ln(y), X = x, m = ln(b), and c = ln(a).",
    "ti_ar": "فحص سريع: تحويل العلاقات غير الخطية إلى خط مستقيم",
    "q_ar": "لتحويل العلاقة الأسية \\( y = ab^x \\) إلى معادلة خط مستقيم \\( Y = mX + c \\)، أي متغيرين يتم رسمهما على المحاور؟",
    "o_ar": [
      "رسم ln(y) مقابل x؛ حيث الميل m = ln(b) والمقطع c = ln(a)",
      "رسم ln(y) مقابل ln(x)؛ حيث الميل m = b والمقطع c = a",
      "رسم y مقابل ln(x)؛ حيث الميل m = ln(b) والمقطع c = a",
      "رسم 1/y مقابل x؛ حيث الميل m = b والمقطع c = a"
    ],
    "ex_ar": "بأخذ اللوغاريتم الطبيعي للطرفين: ln(y) = ln(a · b^x) = ln(a) + x ln(b). وبالمقارنة مع Y = mX + c نجد Y = ln(y) و X = x والميل m = ln(b) والمقطع c = ln(a)."
  },
  {
    "t": "mt",
    "ti": "Matching: Logarithmic Identities & Laws",
    "p": [
      {
        "l": "log_a(x) + log_a(y)",
        "r": "log_a(xy)"
      },
      {
        "l": "log_a(x) - log_a(y)",
        "r": "log_a(x / y)"
      },
      {
        "l": "log_a(x^k)",
        "r": "k · log_a(x)"
      },
      {
        "l": "log_a(b)",
        "r": "ln(b) / ln(a)"
      }
    ],
    "ti_ar": "مطابقة: متطابقات وقوانين اللوغاريتمات",
    "p_ar": [
      {
        "l": "log_a(x) + log_a(y)",
        "r": "log_a(xy)"
      },
      {
        "l": "log_a(x) - log_a(y)",
        "r": "log_a(x / y)"
      },
      {
        "l": "log_a(x^k)",
        "r": "k · log_a(x)"
      },
      {
        "l": "log_a(b)",
        "r": "ln(b) / ln(a)"
      }
    ]
  },
  {
    "t": "se",
    "ti": "Spot the Error: Algebraic & Domain Verification (Logarithms, Exponentials & Straight-Line Reduction)",
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
    "ti_ar": "اكتشف الخطأ: الجذور الدخيلة والتحقق من المجال (اللوغاريتمات والدوال الأسية والتحويل للخط المستقيم)",
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
    "ti": "Examiner Mode: Multi-Step Structured Problem (Logarithms, Exponentials & Straight-Line Reduction)",
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
    "ti_ar": "وضع المصحح: إكمال المربع والدالة العكسية (اللوغاريتمات والدوال الأسية والتحويل للخط المستقيم)",
    "q_ar": "لتكن \\(f(x) = x^2 - 6x + 12\\) حيث \\(x \\ge 3\\). (أ) اكتب \\(f(x)\\) في صورة المربع الكامل وحدد مداها. (ب) أوجد قاعدة الدالة العكسية \\(f^{-1}(x)\\) ومجالها.",
    "examinerTip_ar": "الدالة العكسية يجب أن تكون وحيدة القيمة، لذا نختار الإشارة الموجبة للجذر \\(3 + \\sqrt{x - 3}\\) لأن \\(x \\ge 3\\)."
  },
  {
    "t": "sb",
    "ti": "Step Builder: Completing the Square & Vertex Analysis (Logarithms, Exponentials & Straight-Line Reduction)",
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
    "ti_ar": "بناء الخطوات: إكمال المربع وإيجاد القيمة الصغرى (اللوغاريتمات والدوال الأسية والتحويل للخط المستقيم)",
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
    "t": "tf",
    "ti": "True / False: Laws of Logarithms & Straight-Line Reduction",
    "ti_ar": "صح / خطأ: قوانين اللوغاريتمات والتحويل للخط المستقيم",
    "items": [
      {
        "s": "For any positive base a ≠ 1 and positive x, y, log_a(xy) = log_a(x) + log_a(y).",
        "a": true
      },
      {
        "s": "The expression log_a(x + y) can be simplified directly to log_a(x) + log_a(y).",
        "a": false
      },
      {
        "s": "When y = a x^n is linearized by plotting ln(y) against ln(x), the gradient of the line is n.",
        "a": true
      }
    ],
    "items_ar": [
      {
        "s": "لكل أساس موجب a ≠ 1 وعددين موجبين x, y يتحقق: log_a(xy) = log_a(x) + log_a(y).",
        "a": true
      },
      {
        "s": "يمكن تبسيط المقدار log_a(x + y) مباشرة إلى log_a(x) + log_a(y).",
        "a": false
      },
      {
        "s": "عند تحويل العلاقة y = a x^n برسم ln(y) مقابل ln(x)، يكون ميل الخط المستقيم مساوياً لـ n.",
        "a": true
      }
    ]
  },
  {
    "t": "num",
    "ti": "Numeric Entry: Change of Base Formula",
    "ti_ar": "إدخال رقمي: قاعدة تغيير الأساس اللوغاريتمي",
    "q": "Evaluate the exact product \\( \\log_2(9) \\times \\log_3(8) \\).",
    "q_ar": "احسب القيمة الدقيقة لحاصل الضرب \\( \\log_2(9) \\times \\log_3(8) \\).",
    "a": 6,
    "h": "Write \\( \\log_2(3^2) = 2\\log_2(3) \\) and \\( \\log_3(2^3) = 3\\log_3(2) \\), then use \\( \\log_2(3)\\log_3(2) = 1 \\).",
    "h_ar": "اكتب \\( \\log_2(3^2) = 2\\log_2(3) \\) و \\( \\log_3(2^3) = 3\\log_3(2) \\)، واستخدم \\( \\log_2(3)\\log_3(2) = 1 \\).",
    "sol": "\\( 2\\log_2(3) \\times 3\\log_3(2) = 6 \\times \\frac{\\ln 3}{\\ln 2} \\times \\frac{\\ln 2}{\\ln 3} = 6 \\).",
    "sol_ar": "\\( 2\\log_2(3) \\times 3\\log_3(2) = 6 \\times 1 = 6 \\)."
  },
  {
    "t": "ord",
    "ti": "Order the Steps: Solving a Logarithmic Equation",
    "ti_ar": "رتّب الخطوات: حل معادلة لوغاريتمية",
    "prompt": "Arrange the steps to solve \\( \\log_3(x) + \\log_3(x - 6) = 3 \\) for \\( x > 6 \\):",
    "prompt_ar": "رتب خطوات حل المعادلة \\( \\log_3(x) + \\log_3(x - 6) = 3 \\) حيث \\( x > 6 \\):",
    "items": [
      "Combine logarithms using the product rule: \\( \\log_3(x(x - 6)) = 3 \\).",
      "Convert from logarithmic to exponential form: \\( x(x - 6) = 3^3 = 27 \\).",
      "Expand and factor the quadratic equation: \\( x^2 - 6x - 27 = (x - 9)(x + 3) = 0 \\).",
      "Reject \\( x = -3 \\) (outside domain \\( x > 6 \\)) and conclude \\( x = 9 \\)."
    ],
    "items_ar": [
      "ادمج اللوغاريتمين بقاعدة الضرب: \\( \\log_3(x(x - 6)) = 3 \\).",
      "حوّل من الصيغة اللوغاريتمية إلى الأسية: \\( x(x - 6) = 3^3 = 27 \\).",
      "فك الأقواس وحلل المعادلة التربيعية: \\( x^2 - 6x - 27 = (x - 9)(x + 3) = 0 \\).",
      "ارفض \\( x = -3 \\) (خارج المجال \\( x > 6 \\)) واستنتج أن \\( x = 9 \\)."
    ],
    "ex": "Always verify that candidate roots make every original logarithmic argument strictly positive.",
    "ex_ar": "تحقق دائماً من أن الجذور الناتجة تجعل ما داخل كل لوغاريتم أصلي موجباً تماماً."
  },
  {
    "t": "cat",
    "ti": "Categorize: Linear Law Transformations Y = mX + c",
    "ti_ar": "تصنيف: تحويلات الخط المستقيم Y = mX + c",
    "categories": [
      "Plot ln(y) vs x",
      "Plot ln(y) vs ln(x)",
      "Plot y/x vs x"
    ],
    "categories_ar": [
      "رسم ln(y) مقابل x",
      "رسم ln(y) مقابل ln(x)",
      "رسم y/x مقابل x"
    ],
    "items": [
      {
        "s": "\\( y = a b^x \\)",
        "s_ar": "\\( y = a b^x \\)",
        "cat": 0
      },
      {
        "s": "\\( y = a x^n \\)",
        "s_ar": "\\( y = a x^n \\)",
        "cat": 1
      },
      {
        "s": "\\( y = a x^2 + b x \\)",
        "s_ar": "\\( y = a x^2 + b x \\)",
        "cat": 2
      },
      {
        "s": "\\( y = y_0 e^{-kx} \\)",
        "s_ar": "\\( y = y_0 e^{-kx} \\)",
        "cat": 0
      }
    ],
    "ex": "Exponential laws linearize with ln(y) vs x; power laws linearize with ln(y) vs ln(x).",
    "ex_ar": "العلاقات الأسية تتحول لخط مستقيم برسم ln(y) مقابل x، وعلاقات القوى برسم ln(y) مقابل ln(x)."
  }
];

D["am-trigonometry-circular"] = [
  {
    "t": "qc",
    "ti": "Quick Check: Circular Measure Formulas",
    "q": "In a circle of radius r with central angle θ in radians, what is the formula for the area of the minor sector?",
    "o": [
      "A = ½ r² θ",
      "A = r θ",
      "A = ½ r θ²",
      "A = π r² θ"
    ],
    "a": 0,
    "ex": "In radian measure, arc length is s = rθ and sector area is A = ½ r² θ. Degrees formulas require multiplying by π/180 or θ/360.",
    "ti_ar": "فحص سريع: صيغ القياس الدائري للراديان",
    "q_ar": "في دائرة نصف قطرها r وزاويتها المركزية θ بالراديان، ما الصيغة الرياضية لمساحة القطاع الدائري الأصغر؟",
    "o_ar": [
      "A = ½ r² θ",
      "A = r θ",
      "A = ½ r θ²",
      "A = π r² θ"
    ],
    "ex_ar": "بالقياس الدائري (الراديان)، طول القوس هو s = rθ ومساحة القطاع هي A = ½ r² θ."
  },
  {
    "t": "mt",
    "ti": "Matching: Reciprocal Trigonometric Functions",
    "p": [
      {
        "l": "sec(θ)",
        "r": "1 / cos(θ)"
      },
      {
        "l": "csc(θ)",
        "r": "1 / sin(θ)"
      },
      {
        "l": "cot(θ)",
        "r": "cos(θ) / sin(θ) = 1 / tan(θ)"
      },
      {
        "l": "1 + tan²(θ)",
        "r": "sec²(θ)"
      }
    ],
    "ti_ar": "مطابقة: مقلوبات الدوال المثلثية ومتطابقاتها",
    "p_ar": [
      {
        "l": "sec(θ) (القاطع)",
        "r": "1 / cos(θ)"
      },
      {
        "l": "csc(θ) (قاطع التمام)",
        "r": "1 / sin(θ)"
      },
      {
        "l": "cot(θ) (ظل التمام)",
        "r": "cos(θ) / sin(θ) = 1 / tan(θ)"
      },
      {
        "l": "1 + tan²(θ)",
        "r": "sec²(θ)"
      }
    ]
  },
  {
    "t": "se",
    "ti": "Spot the Error: Algebraic & Domain Verification (Trigonometry & Circular Measure)",
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
    "ti_ar": "اكتشف الخطأ: الجذور الدخيلة والتحقق من المجال (حساب المثلثات والقياس الدائري (الراديان))",
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
    "ti": "Examiner Mode: Multi-Step Structured Problem (Trigonometry & Circular Measure)",
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
    "ti_ar": "وضع المصحح: إكمال المربع والدالة العكسية (حساب المثلثات والقياس الدائري (الراديان))",
    "q_ar": "لتكن \\(f(x) = x^2 - 10x + 32\\) حيث \\(x \\ge 5\\). (أ) اكتب \\(f(x)\\) في صورة المربع الكامل وحدد مداها. (ب) أوجد قاعدة الدالة العكسية \\(f^{-1}(x)\\) ومجالها.",
    "examinerTip_ar": "الدالة العكسية يجب أن تكون وحيدة القيمة، لذا نختار الإشارة الموجبة للجذر \\(5 + \\sqrt{x - 7}\\) لأن \\(x \\ge 5\\)."
  },
  {
    "t": "sb",
    "ti": "Step Builder: Completing the Square & Vertex Analysis (Trigonometry & Circular Measure)",
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
    "ti_ar": "بناء الخطوات: إكمال المربع وإيجاد القيمة الصغرى (حساب المثلثات والقياس الدائري (الراديان))",
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
    "t": "tf",
    "ti": "True / False: Circular Measure & Trigonometric Identities",
    "ti_ar": "صح / خطأ: القياس الدائري والمتطابقات المثلثية",
    "items": [
      {
        "s": "In the arc length formula s = rθ, the angle θ must be measured in radians.",
        "a": true
      },
      {
        "s": "For any angle θ where sec θ is defined, 1 + tan²θ = sec²θ.",
        "a": true
      },
      {
        "s": "The period of the function y = 3 tan(2x) is π radians.",
        "a": false
      }
    ],
    "items_ar": [
      {
        "s": "في قانون طول القوس s = rθ، يجب أن تكون الزاوية θ مقاسة بالراديان.",
        "a": true
      },
      {
        "s": "لأي زاوية θ يكون عندها قاطع التمام معرفاً، تتحقق المتطابقة 1 + tan²θ = sec²θ.",
        "a": true
      },
      {
        "s": "طول الدورة للدالة y = 3 tan(2x) هو π راديان.",
        "a": false
      }
    ]
  },
  {
    "t": "num",
    "ti": "Numeric Entry: Area of a Circular Sector",
    "ti_ar": "إدخال رقمي: مساحة القطاع الدائري",
    "q": "A circular sector has radius \\( r = 6\\text{ cm} \\) and central angle \\( \\theta = 1.5\\text{ rad} \\). Calculate its area in \\( \\text{cm}^2 \\).",
    "q_ar": "قطاع دائري نصف قطره \\( r = 6\\text{ cm} \\) وزاويته المركزية \\( \\theta = 1.5\\text{ rad} \\). احسب مساحته بوحدة \\( \\text{cm}^2 \\).",
    "a": 27,
    "h": "Use the sector area formula \\( A = \\frac{1}{2} r^2 \\theta \\).",
    "h_ar": "استخدم قانون مساحة القطاع الدائري \\( A = \\frac{1}{2} r^2 \\theta \\).",
    "sol": "\\( A = \\frac{1}{2}(6)^2(1.5) = 18 \\times 1.5 = 27\\text{ cm}^2 \\).",
    "sol_ar": "\\( A = \\frac{1}{2}(6)^2(1.5) = 18 \\times 1.5 = 27\\text{ cm}^2 \\)."
  },
  {
    "t": "ord",
    "ti": "Order the Steps: Solving a Quadratic Trigonometric Equation",
    "ti_ar": "رتّب الخطوات: حل معادلة مثلثية تربيعية",
    "prompt": "Arrange the steps to solve \\( 2\\cos^2 x - \\sin x - 1 = 0 \\) for \\( 0 \\le x \\le \\pi \\):",
    "prompt_ar": "رتب خطوات حل المعادلة \\( 2\\cos^2 x - \\sin x - 1 = 0 \\) في الفترة \\( 0 \\le x \\le \\pi \\):",
    "items": [
      "Substitute the Pythagorean identity \\( \\cos^2 x = 1 - \\sin^2 x \\) into the equation.",
      "Rearrange into standard quadratic form: \\( 2\\sin^2 x + \\sin x - 1 = 0 \\).",
      "Factor the quadratic in \\( \\sin x \\): \\( (2\\sin x - 1)(\\sin x + 1) = 0 \\).",
      "Solve \\( \\sin x = \\frac{1}{2} \\) on \\( [0, \\pi] \\) to obtain \\( x = \\frac{\\pi}{6} \\) and \\( x = \\frac{5\\pi}{6} \\)."
    ],
    "items_ar": [
      "عوّض بالمتطابقة الفيثاغورسية \\( \\cos^2 x = 1 - \\sin^2 x \\) في المعادلة.",
      "رتب الحدود في الصيغة التربيعية القياسية: \\( 2\\sin^2 x + \\sin x - 1 = 0 \\).",
      "حلل المعادلة التربيعية بدلالة \\( \\sin x \\): \\( (2\\sin x - 1)(\\sin x + 1) = 0 \\).",
      "حل \\( \\sin x = \\frac{1}{2} \\) في الفترة \\( [0, \\pi] \\) لتحصل على \\( x = \\frac{\\pi}{6} \\) و \\( x = \\frac{5\\pi}{6} \\)."
    ],
    "ex": "Replace cos²x with 1 − sin²x so the equation involves a single trigonometric ratio.",
    "ex_ar": "استبدل cos²x بـ 1 − sin²x لتوحيد النسبة المثلثية في المعادلة."
  },
  {
    "t": "cat",
    "ti": "Categorize: Signs of Trigonometric Functions by Quadrant (CAST)",
    "ti_ar": "تصنيف: إشارات الدوال المثلثية حسب الربع (قاعدة CAST)",
    "categories": [
      "Quadrant II (π/2 < θ < π)",
      "Quadrant III (π < θ < 3π/2)",
      "Quadrant IV (3π/2 < θ < 2π)"
    ],
    "categories_ar": [
      "الربع الثاني (π/2 < θ < π)",
      "الربع الثالث (π < θ < 3π/2)",
      "الربع الرابع (3π/2 < θ < 2π)"
    ],
    "items": [
      {
        "s": "\\( \\sin\\theta > 0 \\) and \\( \\cos\\theta < 0 \\)",
        "s_ar": "\\( \\sin\\theta > 0 \\) و \\( \\cos\\theta < 0 \\)",
        "cat": 0
      },
      {
        "s": "\\( \\tan\\theta > 0 \\) and \\( \\sin\\theta < 0 \\)",
        "s_ar": "\\( \\tan\\theta > 0 \\) و \\( \\sin\\theta < 0 \\)",
        "cat": 1
      },
      {
        "s": "\\( \\cos\\theta > 0 \\) and \\( \\tan\\theta < 0 \\)",
        "s_ar": "\\( \\cos\\theta > 0 \\) و \\( \\tan\\theta < 0 \\)",
        "cat": 2
      },
      {
        "s": "\\( \\csc\\theta > 0 \\) and \\( \\sec\\theta < 0 \\)",
        "s_ar": "\\( \\csc\\theta > 0 \\) و \\( \\sec\\theta < 0 \\)",
        "cat": 0
      }
    ],
    "ex": "By the CAST rule: Sine is positive in QII, Tangent in QIII, and Cosine in QIV.",
    "ex_ar": "بحسب قاعدة الإشارات: الجيب موجب في الربع الثاني، والظل في الثالث، وجيب التمام في الرابع."
  }
];

D["am-permutations-combinations"] = [
  {
    "t": "qc",
    "ti": "Quick Check: Distinguishing Permutations and Combinations",
    "q": "A committee of 4 students is to be chosen from a class of 10. Does this calculation require a permutation or a combination?",
    "o": [
      "Combination, because the order of members within the committee does not matter: ¹⁰C₄",
      "Permutation, because the students are distinct individuals: ¹⁰P₄",
      "Permutation, because 10! must be multiplied by 4!",
      "Factorial division without combinations: 10! / 4!"
    ],
    "a": 0,
    "ex": "When selecting a committee or group where positions are identical (no distinct titles like president/treasurer), order does not matter: use combinations ¹⁰C₄ = 210.",
    "ti_ar": "فحص سريع: التمييز بين التباديل والتوافيق",
    "q_ar": "اختيار لجنة مكونة من 4 طلاب من فصل به 10 طلاب. هل تتطلب هذه المسألة تباديل أم توافيق؟",
    "o_ar": [
      "توافيق، لأن ترتيب أعضاء اللجنة داخلها لا أهمية له: ¹⁰C₄",
      "تباديل، لأن الطلاب أفراد متميزون: ¹⁰P₄",
      "تباديل، لأن 10! يجب ضربها في 4!",
      "قسمة مضاريب بدون توافيق: 10! / 4!"
    ],
    "ex_ar": "عند اختيار لجنة أو مجموعة متكافئة المهام حيث الترتيب غير مهم، نستخدم التوافيق: ¹⁰C₄ = 210."
  },
  {
    "t": "tf",
    "ti": "True / False: Combinatorial Logic",
    "items": [
      {
        "s": "The number of ways to arrange n distinct objects in a straight line is n!.",
        "a": true
      },
      {
        "s": "ⁿCᵣ is always equal to ⁿCₙ₋ᵣ for any 0 ≤ r ≤ n.",
        "a": true
      },
      {
        "s": "Permutations always yield a smaller number of outcomes than combinations for r > 1.",
        "a": false
      }
    ],
    "ti_ar": "صح / خطأ: المنطق التوافقي والعد",
    "items_ar": [
      {
        "s": "عدد طرق ترتيب n من الأشياء المتمايزة في صف مستقيم يساوي n!.",
        "a": true
      },
      {
        "s": "قيمة ⁿCᵣ تساوي دائماً ⁿCₙ₋ᵣ لأي 0 ≤ r ≤ n.",
        "a": true
      },
      {
        "s": "التباديل تعطي دائمًا عدد احتمالات أقل من التوافيق عندما تكون r > 1.",
        "a": false
      }
    ]
  },
  {
    "t": "se",
    "ti": "Spot the Error: Algebraic & Domain Verification (Permutations & Combinations)",
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
    "ti_ar": "اكتشف الخطأ: الجذور الدخيلة والتحقق من المجال (التباديل والتوافيق)",
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
    "ti": "Examiner Mode: Multi-Step Structured Problem (Permutations & Combinations)",
    "q": "Let \\(f(x) = x^2 - 4x + 11\\) for \\(x \\ge 2\\). (a) Express \\(f(x)\\) in completed-square vertex form and state the range of \\(f\\). (b) Find an expression for the inverse function \\(f^{-1}(x)\\) and state its domain.",
    "parts": [
      {
        "label": "Part (a) — Vertex Form & Range",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "Complete the square: \\(f(x) = (x - 2)^2 - 4 + 11 = (x - 2)^2 + 7\\)."
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
            "text": "Set \\(y = (x - 2)^2 + 7 \\implies (x - 2)^2 = y - 7\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "Select positive branch (since \\(x \\ge 2\\)): \\(f^{-1}(x) = 2 + \\sqrt{x - 7}\\)."
          },
          {
            "code": "B1",
            "marks": 1,
            "text": "State domain of \\(f^{-1}\\): \\(x \\ge 7\\) (matching the range of \\(f\\))."
          }
        ]
      }
    ],
    "examinerTip": "Writing \\(\\pm\\sqrt{x - 7}\\) for \\(f^{-1}(x)\\) loses the final A1 mark because a function must be single-valued; use the domain restriction \\(x \\ge 2\\) to choose the \\(+\\) sign.",
    "ti_ar": "وضع المصحح: إكمال المربع والدالة العكسية (التباديل والتوافيق)",
    "q_ar": "لتكن \\(f(x) = x^2 - 4x + 11\\) حيث \\(x \\ge 2\\). (أ) اكتب \\(f(x)\\) في صورة المربع الكامل وحدد مداها. (ب) أوجد قاعدة الدالة العكسية \\(f^{-1}(x)\\) ومجالها.",
    "examinerTip_ar": "الدالة العكسية يجب أن تكون وحيدة القيمة، لذا نختار الإشارة الموجبة للجذر \\(2 + \\sqrt{x - 7}\\) لأن \\(x \\ge 2\\)."
  },
  {
    "t": "sb",
    "ti": "Step Builder: Completing the Square & Vertex Analysis (Permutations & Combinations)",
    "steps": [
      {
        "l": "In \\(y = x^2 - 4x + 11\\), halve the \\(x\\)-coefficient to write \\((x - h)^2\\) where \\(h =\\)",
        "a": "2",
        "h": "Take half of 4."
      },
      {
        "l": "Compute the minimum value \\(k = 11 - 2^2 =\\)",
        "a": "7",
        "h": "Subtract 4 from 11."
      },
      {
        "l": "Evaluate \\(y\\) when \\(x = 4\\): \\(y =\\)",
        "a": "11",
        "h": "Compute \\((2)^2 + 7\\)."
      }
    ],
    "ti_ar": "بناء الخطوات: إكمال المربع وإيجاد القيمة الصغرى (التباديل والتوافيق)",
    "steps_ar": [
      {
        "l": "في الدالة \\(y = x^2 - 4x + 11\\): قيمة \\(h\\) في \\((x - h)^2\\) تساوي:",
        "a": "2",
        "h": "اقسم معامل x وهو 4 على 2."
      },
      {
        "l": "احسب القيمة الصغرى \\(k = 11 - 2^2 =\\)",
        "a": "7",
        "h": "اطرح 4 من 11."
      },
      {
        "l": "احسب قيمة \\(y\\) عندما \\(x = 4\\):",
        "a": "11",
        "h": "احسب \\(4 + 7\\)."
      }
    ]
  },
  {
    "t": "mt",
    "ti": "Matching: Core Algebraic & Analytic Principles (Permutations & Combinations)",
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
    "ti_ar": "مطابقة: المبادئ الجبرية والتحليلية الأساسية (التباديل والتوافيق)",
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
    "t": "num",
    "ti": "Numeric Entry: Committee Selection with Restrictions",
    "ti_ar": "إدخال رقمي: اختيار لجنة بشروط محددة",
    "q": "In how many ways can a committee of 3 students be chosen from a group of 7 students?",
    "q_ar": "بكم طريقة يمكن اختيار لجنة مكونة من 3 طلاب من بين مجموعة تضم 7 طلاب؟",
    "a": 35,
    "h": "Order does not matter in a committee, so compute \\( \\binom{7}{3} = \\frac{7 \\times 6 \\times 5}{3 \\times 2 \\times 1} \\).",
    "h_ar": "الترتيب غير مهم في اختيار اللجنة، لذا احسب التوافيق \\( \\binom{7}{3} \\).",
    "sol": "\\( \\binom{7}{3} = \\frac{7 \\times 6 \\times 5}{6} = 35 \\).",
    "sol_ar": "\\( \\binom{7}{3} = \\frac{7 \\times 6 \\times 5}{6} = 35 \\)."
  },
  {
    "t": "ord",
    "ti": "Order the Steps: Arrangements with Together & Separated Restrictions",
    "ti_ar": "رتّب الخطوات: الترتيب مع شرط التجاور",
    "prompt": "Arrange the steps to find the number of ways to seat 6 people in a row if two specific people (A and B) must sit together:",
    "prompt_ar": "رتب خطوات إيجاد عدد طرق جلوس 6 أشخاص في صف إذا وجب جلوس شخصين محددين (A و B) متجاورين:",
    "items": [
      "Group the two restricted people (A and B) into a single combined block [AB].",
      "Count the total number of independent units to arrange: the block [AB] plus the other 4 people gives 5 units.",
      "Arrange the 5 units in a row in \\( 5! = 120 \\) ways.",
      "Multiply by the internal arrangements of A and B within their block (\\( 2! = 2 \\)) to get \\( 120 \\times 2 = 240 \\)."
    ],
    "items_ar": [
      "ادمج الشخصين المشروط تجاورهما (A و B) في كتلة واحدة [AB].",
      "احسب عدد الوحدات الكلية المراد ترتيبها: الكتلة [AB] مع 4 أشخاص آخرين يساوي 5 وحدات.",
      "رتب الوحدات الخمس في صف بعدد طرق \\( 5! = 120 \\) طريقة.",
      "اضرب في عدد التباديل الداخلية للكتلة (\\( 2! = 2 \\)) لتحصل على \\( 120 \\times 2 = 240 \\)."
    ],
    "ex": "Use the bundle method for \"together\" constraints and multiply by internal permutations.",
    "ex_ar": "استخدم طريقة الحزمة الواحدة لشرط التجاور ثم اضرب في التباديل الداخلية للحزمة."
  },
  {
    "t": "cat",
    "ti": "Categorize: Permutation (Order Matters) vs. Combination (Order Ignored)",
    "ti_ar": "تصنيف: التباديل (الترتيب مهم) مقابل التوافيق (الترتيب غير مهم)",
    "categories": [
      "Permutation (nPr)",
      "Combination (nCr)"
    ],
    "categories_ar": [
      "تباديل (nPr — الترتيب مهم)",
      "توافيق (nCr — الترتيب غير مهم)"
    ],
    "items": [
      {
        "s": "Forming a 4-digit PIN code using distinct digits from 1 to 9",
        "s_ar": "تكوين رمز سري من 4 أرقام مختلفة من 1 إلى 9",
        "cat": 0
      },
      {
        "s": "Selecting 4 delegates from 10 candidates to attend a conference",
        "s_ar": "اختيار 4 مندوبين من بين 10 مرشحين لحضور مؤتمر",
        "cat": 1
      },
      {
        "s": "Awarding Gold, Silver, and Bronze medals to 8 finalists",
        "s_ar": "توزيع الميداليات الذهبية والفضية والبرونزية على 8 متسابقين",
        "cat": 0
      },
      {
        "s": "Choosing 5 questions to answer out of 8 on an exam paper",
        "s_ar": "اختيار 5 أسئلة للإجابة عنها من أصل 8 في ورقة اختبار",
        "cat": 1
      }
    ],
    "ex": "If swapping two selected items creates a new outcome, use Permutations; otherwise use Combinations.",
    "ex_ar": "إذا كان تبديل عنصرين مختارين ينتج حالة جديدة نستخدم التباديل، وإلا نستخدم التوافيق."
  }
];

D["am-differentiation-rates"] = [
  {
    "t": "qc",
    "ti": "Quick Check: Product Rule Differentiation",
    "q": "What is the derivative of \\( y = x^3 e^{2x} \\) with respect to x?",
    "o": [
      "dy/dx = 3x² e^(2x) + 2x³ e^(2x) = x² e^(2x) (3 + 2x)",
      "dy/dx = 6x² e^(2x)",
      "dy/dx = 3x² + 2e^(2x)",
      "dy/dx = x³ e^(2x) + 3x² e^(2x)"
    ],
    "a": 0,
    "ex": "Apply product rule d/dx[uv] = u v' + v u'. Here u = x³, u' = 3x²; v = e^(2x), v' = 2e^(2x). Thus dy/dx = x³(2e^(2x)) + e^(2x)(3x²) = x²e^(2x)(2x + 3).",
    "ti_ar": "فحص سريع: قاعدة تفاضل حاصل ضرب دالتين",
    "q_ar": "ما المشتقة الأولى للدالة \\( y = x^3 e^{2x} \\) بالنسبة إلى x؟",
    "o_ar": [
      "dy/dx = 3x² e^(2x) + 2x³ e^(2x) = x² e^(2x) (3 + 2x)",
      "dy/dx = 6x² e^(2x)",
      "dy/dx = 3x² + 2e^(2x)",
      "dy/dx = x³ e^(2x) + 3x² e^(2x)"
    ],
    "ex_ar": "بتطبيق قاعدة ضرب دالتين d/dx[uv] = u v' + v u'. هنا u = x³ و u' = 3x²؛ و v = e^(2x) و v' = 2e^(2x). فيكون dy/dx = 2x³ e^(2x) + 3x² e^(2x) = x² e^(2x) (2x + 3)."
  },
  {
    "t": "mt",
    "ti": "Matching: Differentiation Rules & Derivatives",
    "p": [
      {
        "l": "d/dx [sin(ax)]",
        "r": "a · cos(ax)"
      },
      {
        "l": "d/dx [cos(ax)]",
        "r": "-a · sin(ax)"
      },
      {
        "l": "d/dx [tan(ax)]",
        "r": "a · sec²(ax)"
      },
      {
        "l": "d/dx [ln(ax + b)]",
        "r": "a / (ax + b)"
      }
    ],
    "ti_ar": "مطابقة: قواعد ومشتقات الدوال المثلثية واللوغاريتمية",
    "p_ar": [
      {
        "l": "d/dx [sin(ax)]",
        "r": "a · cos(ax)"
      },
      {
        "l": "d/dx [cos(ax)]",
        "r": "-a · sin(ax)"
      },
      {
        "l": "d/dx [tan(ax)]",
        "r": "a · sec²(ax)"
      },
      {
        "l": "d/dx [ln(ax + b)]",
        "r": "a / (ax + b)"
      }
    ]
  },
  {
    "t": "se",
    "ti": "Spot the Error: Implicit Differentiation & Product Rule (Differentiation, Rules & Rates of Change)",
    "q": "A student differentiates the implicit curve \\(x^2 + 3xy + y^2 = 0\\) with respect to \\(x\\). Identify the step with the mathematical flaw:",
    "steps": [
      "Differentiate \\(x^2\\) with respect to \\(x\\) to obtain \\(2x\\).",
      "Differentiate the middle term \\(3xy\\) with respect to \\(x\\) as \\(3\\dfrac{dy}{dx}\\).",
      "Differentiate \\(y^2\\) using the Chain Rule as \\(2y\\dfrac{dy}{dx}\\) and the constant \\(0\\) as \\(0\\).",
      "Collect \\(\\dfrac{dy}{dx}\\) terms and divide to isolate \\(\\dfrac{dy}{dx}\\)."
    ],
    "errorStep": 2,
    "reasons": [
      "The term \\(3xy\\) is a product of two functions of \\(x\\); by the Product Rule its derivative is \\(3y + 3x\\dfrac{dy}{dx}\\), not \\(3\\dfrac{dy}{dx}\\).",
      "The derivative of \\(y^2\\) with respect to \\(x\\) is simply \\(2y\\) without \\(\\dfrac{dy}{dx}\\).",
      "The constant \\(0\\) remains \\(0\\) after differentiation."
    ],
    "correctReason": 0,
    "h": "Look closely at how the product \\(3xy\\) was differentiated in Step 2.",
    "sol": "Applying the Product Rule to \\(3xy\\) gives \\(3y + 3x\\dfrac{dy}{dx}\\). Thus \\(2x + 3y + (3x + 2y)\\dfrac{dy}{dx} = 0 \\implies \\dfrac{dy}{dx} = -\\dfrac{2x + 3y}{3x + 2y}\\).",
    "ti_ar": "اكتشف الخطأ: الاشتقاق الضمني وقاعدة الضرب (التفاضل وقواعد الاشتقاق ومعدلات التغير المرتبطة)",
    "q_ar": "يقوم طالب باشتقاق العلاقة الضمنية \\(x^2 + 3xy + y^2 = 0\\) بالنسبة إلى \\(x\\). حدد الخطوة الخاطئة:",
    "steps_ar": [
      "اشتقاق \\(x^2\\) بالنسبة إلى \\(x\\) ليعطي \\(2x\\).",
      "اشتقاق الحد الأوسط \\(3xy\\) بالنسبة إلى \\(x\\) على أنه \\(3\\dfrac{dy}{dx}\\).",
      "اشتقاق \\(y^2\\) بقاعدة السلسلة ليعطي \\(2y\\dfrac{dy}{dx}\\) ومشتقة الثابت \\(0\\).",
      "تجميع حدود \\(\\dfrac{dy}{dx}\\) وقسمة الطرفين لعزل المشتقة."
    ],
    "reasons_ar": [
      "الحد \\(3xy\\) حاصل ضرب دالتين في \\(x\\)؛ وبقاعدة الضرب مشتقته هي \\(3y + 3x\\dfrac{dy}{dx}\\).",
      "مشتقة \\(y^2\\) هي \\(2y\\) فقط دون \\(\\dfrac{dy}{dx}\\).",
      "مشتقة الثابت تبقى كما هي."
    ],
    "h_ar": "راجع كيفية اشتقاق حاصل الضرب \\(3xy\\) في الخطوة الثانية.",
    "sol_ar": "بتطبيق قاعدة الضرب على \\(3xy\\) نحصل على \\(3y + 3x\\dfrac{dy}{dx}\\)، ومنه \\(\\dfrac{dy}{dx} = -\\dfrac{2x + 3y}{3x + 2y}\\)."
  },
  {
    "t": "ms",
    "ti": "Examiner Mode: Tangent, Normal & Stationary Points (Differentiation, Rules & Rates of Change)",
    "q": "Consider the curve \\(y = 3x^3 - 0x^2 + 4\\). (a) Find \\(\\dfrac{dy}{dx}\\) and the gradient of the tangent at \\(x = 1\\). (b) Find the \\(x\\)-coordinates of the stationary points.",
    "parts": [
      {
        "label": "Part (a) — First Derivative & Tangent Gradient",
        "marks": 3,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "Differentiate term by term using the power rule: \\(\\dfrac{dy}{dx} = 9x^2 - 0x\\)."
          },
          {
            "code": "M1",
            "marks": 1,
            "text": "Substitute \\(x = 1\\): \\(m = 9(1)^2 - 0(1)\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "Obtain exact tangent gradient \\(m = 9\\)."
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
            "text": "Set \\(\\dfrac{dy}{dx} = 0 \\implies x(9x - 0) = 0\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "State both stationary \\(x\\)-coordinates: \\(x = 0\\) and \\(x = \\dfrac{0}{9}\\)."
          }
        ]
      }
    ],
    "examinerTip": "Always show the explicit equation \\(\\dfrac{dy}{dx} = 0\\) before solving for stationary points—this earns the M1 method mark even if an arithmetic slip occurs.",
    "ti_ar": "وضع المصحح: المماس والنقاط الحرجة (التفاضل وقواعد الاشتقاق ومعدلات التغير المرتبطة)",
    "q_ar": "لمنحنى الدالة \\(y = 3x^3 - 0x^2 + 4\\): (أ) أوجد \\(\\dfrac{dy}{dx}\\) وميل المماس عند \\(x = 1\\). (ب) أوجد الإحداثيات السينية للنقاط الحرجة.",
    "examinerTip_ar": "اكتب دائماً شرط النقطة الحرجة \\(\\dfrac{dy}{dx} = 0\\) صراحةً لضمان الحصول على درجة الطريقة (M1)."
  },
  {
    "t": "sb",
    "ti": "Step Builder: Instantaneous Rate of Change (Differentiation, Rules & Rates of Change)",
    "steps": [
      {
        "l": "Given \\(f(x) = 3x^2 + 0x - 5\\), find the coefficient of \\(x\\) in \\(f'(x)\\):",
        "a": "6",
        "h": "Multiply power 2 by 3."
      },
      {
        "l": "Find the constant term in \\(f'(x)\\):",
        "a": "0",
        "h": "The derivative of 0x is 0."
      },
      {
        "l": "Evaluate the instantaneous rate of change \\(f'(1) =\\)",
        "a": "6",
        "h": "Compute 6(1) + 0."
      }
    ],
    "ti_ar": "بناء الخطوات: حساب المشتقة ومعدل التغير اللحظي (التفاضل وقواعد الاشتقاق ومعدلات التغير المرتبطة)",
    "steps_ar": [
      {
        "l": "للدالة \\(f(x) = 3x^2 + 0x - 5\\)، معامل \\(x\\) في \\(f'(x)\\) يساوي:",
        "a": "6",
        "h": "اضرب الأس 2 في 3."
      },
      {
        "l": "الحد الثابت في المشتقة \\(f'(x)\\) يساوي:",
        "a": "0",
        "h": "مشتقة 0x هي 0."
      },
      {
        "l": "احسب قيمة المشتقة \\(f'(1) =\\)",
        "a": "6",
        "h": "احسب 6(1) + 0."
      }
    ]
  },
  {
    "t": "tf",
    "ti": "True / False: Stationary Points & Connected Rates of Change",
    "ti_ar": "صح / خطأ: النقاط الحرجة والمعدلات المرتبطة بالزمن",
    "items": [
      {
        "s": "At a stationary point where dy/dx = 0, if d²y/dx² > 0 the point is a local minimum.",
        "a": true
      },
      {
        "s": "The gradient of the normal to a curve is equal to the gradient of the tangent at that point.",
        "a": false
      },
      {
        "s": "By the chain rule, dy/dt = (dy/dx) × (dx/dt).",
        "a": true
      }
    ],
    "items_ar": [
      {
        "s": "عند نقطة حرجة حيث dy/dx = 0، إذا كان d²y/dx² > 0 فإن النقطة تمثل نهاية صغرى محلية.",
        "a": true
      },
      {
        "s": "ميل العمودي على المنحنى يساوي ميل المماس عند نفس النقطة.",
        "a": false
      },
      {
        "s": "بحسب قاعدة السلسلة للمعدلات المرتبطة: dy/dt = (dy/dx) × (dx/dt).",
        "a": true
      }
    ]
  },
  {
    "t": "num",
    "ti": "Numeric Entry: Connected Rates of Change",
    "ti_ar": "إدخال رقمي: المعدلات المرتبطة بالزمن",
    "q": "Given \\( y = x^3 + 2x \\) and \\( \\frac{dx}{dt} = 2\\text{ units/s} \\), find \\( \\frac{dy}{dt} \\) at the instant when \\( x = 2 \\).",
    "q_ar": "إذا كانت \\( y = x^3 + 2x \\) وكان \\( \\frac{dx}{dt} = 2\\text{ units/s} \\)، فأوجد \\( \\frac{dy}{dt} \\) عند اللحظة \\( x = 2 \\).",
    "a": 28,
    "h": "Compute \\( \\frac{dy}{dx} = 3x^2 + 2 \\) at \\( x = 2 \\), then multiply by \\( \\frac{dx}{dt} = 2 \\).",
    "h_ar": "احسب \\( \\frac{dy}{dx} = 3x^2 + 2 \\) عند \\( x = 2 \\)، ثم اضرب الناتج في \\( \\frac{dx}{dt} = 2 \\).",
    "sol": "At \\( x = 2 \\), \\( \\frac{dy}{dx} = 3(2)^2 + 2 = 14 \\). Hence \\( \\frac{dy}{dt} = 14 \\times 2 = 28 \\).",
    "sol_ar": "عند \\( x = 2 \\)، \\( \\frac{dy}{dx} = 3(4) + 2 = 14 \\). ومنه \\( \\frac{dy}{dt} = 14 \\times 2 = 28 \\)."
  },
  {
    "t": "ord",
    "ti": "Order the Steps: Finding and Classifying Stationary Points",
    "ti_ar": "رتّب الخطوات: إيجاد وتصنيف النقاط الحرجة",
    "prompt": "Arrange the steps to find and classify the stationary points of \\( y = x^3 - 3x^2 + 5 \\):",
    "prompt_ar": "رتب خطوات إيجاد وتصنيف النقاط الحرجة للمنحنى \\( y = x^3 - 3x^2 + 5 \\):",
    "items": [
      "Differentiate with respect to \\( x \\): \\( \\frac{dy}{dx} = 3x^2 - 6x \\).",
      "Set \\( \\frac{dy}{dx} = 0 \\) and factor: \\( 3x(x - 2) = 0 \\implies x = 0 \\) or \\( x = 2 \\).",
      "Compute the second derivative: \\( \\frac{d^2y}{dx^2} = 6x - 6 \\).",
      "Evaluate \\( \\frac{d^2y}{dx^2} \\): at \\( x=0 \\) it is \\( -6 < 0 \\) (maximum); at \\( x=2 \\) it is \\( +6 > 0 \\) (minimum)."
    ],
    "items_ar": [
      "اشتق المعادلة بالنسبة إلى \\( x \\): \\( \\frac{dy}{dx} = 3x^2 - 6x \\).",
      "ضع \\( \\frac{dy}{dx} = 0 \\) وحلل: \\( 3x(x - 2) = 0 \\implies x = 0 \\) أو \\( x = 2 \\).",
      "أوجد المشتقة الثانية: \\( \\frac{d^2y}{dx^2} = 6x - 6 \\).",
      "عوّض في المشتقة الثانية: عند \\( x=0 \\) الناتج \\( -6 < 0 \\) (عظمى)، وعند \\( x=2 \\) الناتج \\( +6 > 0 \\) (صغرى)."
    ],
    "ex": "Stationary points occur where dy/dx = 0 and are classified by the sign of d²y/dx².",
    "ex_ar": "تقع النقاط الحرجة حيث dy/dx = 0 وتُصنّف حسب إشارة المشتقة الثانية d²y/dx²."
  },
  {
    "t": "cat",
    "ti": "Categorize: Differentiation Rules Selection",
    "ti_ar": "تصنيف: اختيار قاعدة الاشتقاق المناسبة",
    "categories": [
      "Chain Rule",
      "Product Rule",
      "Quotient Rule"
    ],
    "categories_ar": [
      "قاعدة السلسلة (Chain Rule)",
      "قاعدة الضرب (Product Rule)",
      "قاعدة القسمة (Quotient Rule)"
    ],
    "items": [
      {
        "s": "\\( y = (3x^2 - 5)^6 \\)",
        "s_ar": "\\( y = (3x^2 - 5)^6 \\)",
        "cat": 0
      },
      {
        "s": "\\( y = x^2 e^{3x} \\)",
        "s_ar": "\\( y = x^2 e^{3x} \\)",
        "cat": 1
      },
      {
        "s": "\\( y = \\frac{\\sin x}{2x + 1} \\)",
        "s_ar": "\\( y = \\frac{\\sin x}{2x + 1} \\)",
        "cat": 2
      },
      {
        "s": "\\( y = \\ln(4x^2 + 1) \\)",
        "s_ar": "\\( y = \\ln(4x^2 + 1) \\)",
        "cat": 0
      }
    ],
    "ex": "Composite functions use the Chain Rule, products of two functions of x use the Product Rule, and ratios use the Quotient Rule.",
    "ex_ar": "الدوال المركبة تشتق بقاعدة السلسلة، وحاصل ضرب دالتين بقاعدة الضرب، وخارج قسمة دالتين بقاعدة القسمة."
  }
];

D["am-integration-kinematics"] = [
  {
    "t": "qc",
    "ti": "Quick Check: Straight-Line Kinematics Relationships",
    "q": "If the velocity of a particle is given by \\( v(t) = 4t - t^2 \\), how is its displacement \\( s(t) \\) found from \\( t = 0 \\) to \\( t = 3 \\)?",
    "o": [
      "s(3) - s(0) = ∫₀³ (4t - t²) dt",
      "s(3) = d/dt [4t - t²] evaluated at t = 3",
      "s(3) = 4(3) - 3² = 3",
      "s(3) = ∫₀³ (4 - 2t) dt"
    ],
    "a": 0,
    "ex": "Displacement is the integral of velocity over time: s = ∫ v(t) dt. Since v = ds/dt, integrating v gives s. Acceleration would be the derivative dv/dt.",
    "ti_ar": "فحص سريع: علاقات علم الحركة في خط مستقيم",
    "q_ar": "إذا كانت سرعة جسيم تُعطى بالدالة \\( v(t) = 4t - t^2 \\)، فكيف نحسب إزاحته \\( s(t) \\) من \\( t = 0 \\) إلى \\( t = 3 \\)؟",
    "o_ar": [
      "s(3) - s(0) = ∫₀³ (4t - t²) dt",
      "s(3) = d/dt [4t - t²] عند t = 3",
      "s(3) = 4(3) - 3² = 3",
      "s(3) = ∫₀³ (4 - 2t) dt"
    ],
    "ex_ar": "الإزاحة هي التكامل المحدد للسرعة بالنسبة للزمن: s = ∫ v(t) dt. وبما أن v = ds/dt فإن تكامل v يعطي s، بينما اشتقاقها يعطي التسارع."
  },
  {
    "t": "mt",
    "ti": "Matching: Standard Indefinite Integrals",
    "p": [
      {
        "l": "∫ e^(ax+b) dx",
        "r": "(1/a) e^(ax+b) + C"
      },
      {
        "l": "∫ cos(ax+b) dx",
        "r": "(1/a) sin(ax+b) + C"
      },
      {
        "l": "∫ sin(ax+b) dx",
        "r": "-(1/a) cos(ax+b) + C"
      },
      {
        "l": "∫ 1/(ax+b) dx",
        "r": "(1/a) ln|ax+b| + C"
      }
    ],
    "ti_ar": "مطابقة: التكاملات غير المحددة القياسية",
    "p_ar": [
      {
        "l": "∫ e^(ax+b) dx",
        "r": "(1/a) e^(ax+b) + C"
      },
      {
        "l": "∫ cos(ax+b) dx",
        "r": "(1/a) sin(ax+b) + C"
      },
      {
        "l": "∫ sin(ax+b) dx",
        "r": "-(1/a) cos(ax+b) + C"
      },
      {
        "l": "∫ 1/(ax+b) dx",
        "r": "(1/a) ln|ax+b| + C"
      }
    ]
  },
  {
    "t": "se",
    "ti": "Spot the Error: Separable Differential Equation & Constant of Integration (Integration, Areas & Kinematics)",
    "q": "A student solves the initial value problem \\(\\dfrac{dy}{dx} = 5xy\\) with \\(y(0) = -1\\). Which step contains the mathematical flaw?",
    "steps": [
      "Separate variables: \\(\\int \\dfrac{1}{y}\\,dy = \\int 5x\\,dx\\).",
      "Integrate both sides: \\(\\ln|y| = \\dfrac{5}{2}x^2 + C\\).",
      "Exponentiate both sides to write \\(y = e^{5x^2/2} + C\\).",
      "Substitute \\(x = 0, y = -1\\) to solve for \\(C\\)."
    ],
    "errorStep": 3,
    "reasons": [
      "Exponentiating \\(\\ln|y| = \\tfrac{5}{2}x^2 + C\\) yields \\(y = e^{\\frac{5}{2}x^2 + C} = Ae^{5x^2/2}\\) (where \\(A = \\pm e^C\\)), NOT \\(e^{5x^2/2} + C\\).",
      "The integral of \\(1/y\\) is \\(y^{-2}\\), not \\(\\ln|y|\\).",
      "Variables cannot be separated when \\(x\\) and \\(y\\) are multiplied."
    ],
    "correctReason": 0,
    "h": "Check how the exponent law \\(e^{a + C} = e^a \\cdot e^C\\) behaves in Step 3.",
    "sol": "By index laws, \\(|y| = e^{5x^2/2 + C} = e^C e^{5x^2/2} \\implies y = Ae^{5x^2/2}\\). Using \\(y(0) = -1\\) gives \\(A = -1\\), so \\(y = -1e^{5x^2/2}\\).",
    "ti_ar": "اكتشف الخطأ: حل المعادلات التفاضلية وثابت التكامل (التكامل والمساحات المستوية وعلم الحركة (الميكانيكا))",
    "q_ar": "يحل طالب مسألة القيمة الابتدائية \\(\\dfrac{dy}{dx} = 5xy\\) مع الشرط \\(y(0) = -1\\). أي خطوة تتضمن الخطأ الرياضي؟",
    "steps_ar": [
      "فصل المتغيرات: \\(\\int \\dfrac{1}{y}\\,dy = \\int 5x\\,dx\\).",
      "تكامل الطرفين: \\(\\ln|y| = \\dfrac{5}{2}x^2 + C\\).",
      "أخذ الدالة الأسية للطرفين لكتابة \\(y = e^{5x^2/2} + C\\).",
      "التعويض عن \\(x = 0, y = -1\\) لإيجاد \\(C\\)."
    ],
    "reasons_ar": [
      "أخذ الدالة الأسية للعلاقة \\(\\ln|y| = \\tfrac{5}{2}x^2 + C\\) يعطي \\(y = e^{\\frac{5}{2}x^2 + C} = Ae^{5x^2/2}\\) وليس \\(e^{5x^2/2} + C\\).",
      "تكامل \\(1/y\\) يساوي \\(-1/y^2\\).",
      "لا يمكن فصل المتغيرات في حالة الضرب."
    ],
    "h_ar": "تذكّر أن \\(e^{u+C} = e^C \\cdot e^u = Ae^u\\).",
    "sol_ar": "الصورة الصحيحة بعد أخذ الدالة الأسية هي \\(y = Ae^{5x^2/2}\\)، وبالتعويض عن \\(y(0)=-1\\) نجد \\(y = -1e^{5x^2/2}\\)."
  },
  {
    "t": "ms",
    "ti": "Examiner Mode: Definite Integration & Area Under a Curve (Integration, Areas & Kinematics)",
    "q": "Evaluate the exact area bounded by \\(y = 3x^2 + 10x\\), the \\(x\\)-axis, \\(x = 0\\), and \\(x = 0\\).",
    "parts": [
      {
        "label": "Part (a) — Antiderivative Construction",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "Set up definite integral \\(A = \\int_0^{0} (3x^2 + 10x)\\,dx\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "Find correct antiderivative \\(\\left[x^3 + 5x^2\\right]_0^{0}\\)."
          }
        ]
      },
      {
        "label": "Part (b) — Fundamental Theorem Evaluation",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "Substitute upper and lower limits: \\((0^3 + 5(0)^2) - (0)\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "Obtain exact area \\(0\\)."
          }
        ]
      }
    ],
    "examinerTip": "When a question says \"Hence find the exact area,\" calculator-only decimal answers with no antiderivative working shown receive 0/4 marks.",
    "ti_ar": "وضع المصحح: التكامل المحدد والمساحة تحت المنحنى (التكامل والمساحات المستوية وعلم الحركة (الميكانيكا))",
    "q_ar": "أوجد المساحة المحصورة بين المنحنى \\(y = 3x^2 + 10x\\) ومحور السينات والمستقيمين \\(x = 0\\) و \\(x = 0\\).",
    "examinerTip_ar": "يجب كتابة الدالة الأصلية صراحةً قبل تعويض حدود التكامل للحصول على درجات الطريقة كاملة."
  },
  {
    "t": "sb",
    "ti": "Step Builder: Definite Integral via FTC (Integration, Areas & Kinematics)",
    "steps": [
      {
        "l": "Find the antiderivative \\(F(x)\\) of \\(f(x) = 2x + 5\\) with \\(F(0) = 0\\): \\(F(x) =\\)",
        "a": "x^2 + 5x",
        "h": "Integrate 2x to x^2 and 5 to 5x."
      },
      {
        "l": "Evaluate at the upper bound \\(F(0) =\\)",
        "a": "0",
        "h": "Compute \\((0)^2 + 5\\)(0)."
      },
      {
        "l": "Hence state \\(\\int_0^{0} (2x + 5)\\,dx =\\)",
        "a": "0",
        "h": "Compute F(0) - F(0)."
      }
    ],
    "ti_ar": "بناء الخطوات: حساب التكامل المحدد (التكامل والمساحات المستوية وعلم الحركة (الميكانيكا))",
    "steps_ar": [
      {
        "l": "أوجد الدالة الأصلية \\(F(x)\\) للدالة \\(2x + 5\\) بحيث \\(F(0)=0\\):",
        "a": "x^2 + 5x",
        "h": "كامل 2x إلى x^2 و 5 إلى 5x."
      },
      {
        "l": "احسب القيمة عند الحد العلوي \\(F(0) =\\)",
        "a": "0",
        "h": "احسب (0)^2 + 5(0)."
      },
      {
        "l": "إذن قيمة التكامل \\(\\int_0^{0} (2x + 5)\\,dx =\\)",
        "a": "0",
        "h": "اطرح F(0) - F(0)."
      }
    ]
  },
  {
    "t": "tf",
    "ti": "True / False: Definite Integration & Kinematics",
    "ti_ar": "صح / خطأ: التكامل المحدود وعلم الحركة",
    "items": [
      {
        "s": "Integrating velocity v(t) with respect to time gives displacement s(t).",
        "a": true
      },
      {
        "s": "A particle is momentarily at rest when its acceleration a(t) = 0.",
        "a": false
      },
      {
        "s": "The area enclosed between two curves y = f(x) and y = g(x) (where f ≥ g) on [a, b] is ∫_a^b (f(x) − g(x)) dx.",
        "a": true
      }
    ],
    "items_ar": [
      {
        "s": "تكامل دالة السرعة v(t) بالنسبة للزمن يعطي دالة الإزاحة s(t).",
        "a": true
      },
      {
        "s": "يسكن الجسيم لحظياً عندما يكون تسارعه a(t) = 0.",
        "a": false
      },
      {
        "s": "المساحة المحصورة بين منحنيين y = f(x) و y = g(x) (حيث f ≥ g) على [a, b] هي ∫_a^b (f(x) − g(x)) dx.",
        "a": true
      }
    ]
  },
  {
    "t": "num",
    "ti": "Numeric Entry: Definite Integral & Area Under a Curve",
    "ti_ar": "إدخال رقمي: التكامل المحدود والمساحة تحت المنحنى",
    "q": "Evaluate the definite integral \\( \\int_0^3 (3x^2 + 2x)\\,dx \\).",
    "q_ar": "احسب قيمة التكامل المحدود \\( \\int_0^3 (3x^2 + 2x)\\,dx \\).",
    "a": 36,
    "h": "Find the antiderivative \\( [x^3 + x^2]_0^3 \\).",
    "h_ar": "أوجد الدالة الأصلية \\( [x^3 + x^2]_0^3 \\) ثم عوّض بحدي التكامل.",
    "sol": "\\( [x^3 + x^2]_0^3 = (3^3 + 3^2) - 0 = 27 + 9 = 36 \\).",
    "sol_ar": "\\( [x^3 + x^2]_0^3 = (27 + 9) - 0 = 36 \\)."
  },
  {
    "t": "ord",
    "ti": "Order the Steps: Total Distance Traveled When Velocity Changes Sign",
    "ti_ar": "رتّب الخطوات: حساب المسافة الكلية عند تغير إشارة السرعة",
    "prompt": "Arrange the steps to find the total distance traveled in \\( 0 \\le t \\le 4 \\) when \\( v(t) = 2t - 4 \\):",
    "prompt_ar": "رتب خطوات إيجاد المسافة الكلية المقطوعة في الفترة \\( 0 \\le t \\le 4 \\) إذا كانت السرعة \\( v(t) = 2t - 4 \\):",
    "items": [
      "Set \\( v(t) = 2t - 4 = 0 \\) to find the turning point at \\( t = 2\\text{ s} \\).",
      "Split the time interval \\( [0, 4] \\) at the turning point into \\( [0, 2] \\) and \\( [2, 4] \\).",
      "Integrate \\( v(t) \\) over each sub-interval: \\( \\int_0^2 (2t-4)\\,dt = -4 \\) and \\( \\int_2^4 (2t-4)\\,dt = +4 \\).",
      "Sum the absolute magnitudes of the displacements: \\( |-4| + |4| = 8\\text{ m} \\)."
    ],
    "items_ar": [
      "ضع \\( v(t) = 2t - 4 = 0 \\) لتحديد لحظة السكون اللحظي عند \\( t = 2\\text{ s} \\).",
      "جزّئ فترة التكامل \\( [0, 4] \\) عند نقطة الانعكاس إلى فترتين \\( [0, 2] \\) و \\( [2, 4] \\).",
      "احسب الإزاحة في كل فترة جزئية: \\( \\int_0^2 (2t-4)\\,dt = -4 \\) و \\( \\int_2^4 (2t-4)\\,dt = +4 \\).",
      "اجمع القيم المطلقة للإزاحتين: \\( |-4| + |4| = 8\\text{ m} \\)."
    ],
    "ex": "Total distance requires splitting the integral wherever v(t) = 0 and taking absolute values.",
    "ex_ar": "لحساب المسافة الكلية يجب تجزئة التكامل عند أصفار السرعة وأخذ القيمة المطلقة لكل جزء."
  },
  {
    "t": "cat",
    "ti": "Categorize: Kinematics Calculus Relationships",
    "ti_ar": "تصنيف: علاقات التفاضل والتكامل في الحركة المستقيمة",
    "categories": [
      "Differentiate with respect to t",
      "Integrate with respect to t",
      "Set Equal to Zero"
    ],
    "categories_ar": [
      "اشتقاق بالنسبة للزمن t",
      "تكامل بالنسبة للزمن t",
      "مساواة المقدار بالصفر"
    ],
    "items": [
      {
        "s": "Finding acceleration \\( a(t) \\) from velocity \\( v(t) \\)",
        "s_ar": "إيجاد التسارع \\( a(t) \\) من دالة السرعة \\( v(t) \\)",
        "cat": 0
      },
      {
        "s": "Finding displacement \\( s(t) \\) from velocity \\( v(t) \\)",
        "s_ar": "إيجاد الإزاحة \\( s(t) \\) من دالة السرعة \\( v(t) \\)",
        "cat": 1
      },
      {
        "s": "Finding the instant when a particle reverses direction (momentarily at rest)",
        "s_ar": "إيجاد لحظة السكون اللحظي وانعكاس اتجاه الحركة (v = 0)",
        "cat": 2
      },
      {
        "s": "Finding velocity \\( v(t) \\) from acceleration \\( a(t) \\)",
        "s_ar": "إيجاد السرعة \\( v(t) \\) من دالة التسارع \\( a(t) \\)",
        "cat": 1
      }
    ],
    "ex": "Differentiate: s → v → a. Integrate: a → v → s.",
    "ex_ar": " بالاشتقاق ننتقل من الإزاحة للسرعة للتسارع، وبالتكامل ننتقل عكسياً من التسارع للسرعة للإزاحة."
  }
];

D["am-vectors-2d"] = [
  {
    "t": "qc",
    "ti": "Quick Check: Scalar (Dot) Product Condition for Perpendicularity",
    "q": "Two non-zero 2D vectors \\( \\mathbf{a} = x_1\\mathbf{i} + y_1\\mathbf{j} \\) and \\( \\mathbf{b} = x_2\\mathbf{i} + y_2\\mathbf{j} \\) are perpendicular if and only if:",
    "o": [
      "a · b = x₁x₂ + y₁y₂ = 0",
      "|a| = |b|",
      "x₁/x₂ = y₁/y₂",
      "a · b = |a||b|"
    ],
    "a": 0,
    "ex": "Since a · b = |a||b| cos(θ), when θ = 90°, cos(90°) = 0, so the dot product must be 0: x₁x₂ + y₁y₂ = 0.",
    "ti_ar": "فحص سريع: شرط تعامد متجهين عبر الضرب القياسي",
    "q_ar": "يكون المتجهان غير الصفريين \\( \\mathbf{a} = x_1\\mathbf{i} + y_1\\mathbf{j} \\) و \\( \\mathbf{b} = x_2\\mathbf{i} + y_2\\mathbf{j} \\) متعامدين إذا وفقط إذا كان:",
    "o_ar": [
      "a · b = x₁x₂ + y₁y₂ = 0",
      "|a| = |b|",
      "x₁/x₂ = y₁/y₂",
      "a · b = |a||b|"
    ],
    "ex_ar": "بما أن الضرب القياسي a · b = |a||b| cos(θ)، وعندما تكون الزاوية 90° فإن cos(90°) = 0، لذا يجب أن يكون ناتج الضرب القياسي صفراً."
  },
  {
    "t": "tf",
    "ti": "True / False: Vector Properties",
    "items": [
      {
        "s": "A unit vector has a magnitude strictly equal to 1.",
        "a": true
      },
      {
        "s": "If vector b is a scalar multiple of vector a (b = k a), then a and b are parallel.",
        "a": true
      },
      {
        "s": "The magnitude of vector r = 3i - 4j is equal to -1.",
        "a": false
      }
    ],
    "ti_ar": "صح / خطأ: خواص المتجهات",
    "items_ar": [
      {
        "s": "متجه الوحدة يمتلك مقداراً (طولاً) يساوي 1 تماماً.",
        "a": true
      },
      {
        "s": "إذا كان المتجه b مضاعفاً قياسياً للمتجه a (أي b = k a)، فإن المتجهين متوازيان.",
        "a": true
      },
      {
        "s": "مقدار (معيار) المتجه r = 3i - 4j يساوي -1.",
        "a": false
      }
    ]
  },
  {
    "t": "se",
    "ti": "Spot the Error: Algebraic & Domain Verification (Vectors in Two Dimensions & Relative Motion)",
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
    "ti_ar": "اكتشف الخطأ: الجذور الدخيلة والتحقق من المجال (المتجهات في بعدين والسرعة النسبية)",
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
    "ti": "Examiner Mode: Multi-Step Structured Problem (Vectors in Two Dimensions & Relative Motion)",
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
    "ti_ar": "وضع المصحح: إكمال المربع والدالة العكسية (المتجهات في بعدين والسرعة النسبية)",
    "q_ar": "لتكن \\(f(x) = x^2 - 6x + 12\\) حيث \\(x \\ge 3\\). (أ) اكتب \\(f(x)\\) في صورة المربع الكامل وحدد مداها. (ب) أوجد قاعدة الدالة العكسية \\(f^{-1}(x)\\) ومجالها.",
    "examinerTip_ar": "الدالة العكسية يجب أن تكون وحيدة القيمة، لذا نختار الإشارة الموجبة للجذر \\(3 + \\sqrt{x - 3}\\) لأن \\(x \\ge 3\\)."
  },
  {
    "t": "sb",
    "ti": "Step Builder: Completing the Square & Vertex Analysis (Vectors in Two Dimensions & Relative Motion)",
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
    "ti_ar": "بناء الخطوات: إكمال المربع وإيجاد القيمة الصغرى (المتجهات في بعدين والسرعة النسبية)",
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
    "ti": "Matching: Core Algebraic & Analytic Principles (Vectors in Two Dimensions & Relative Motion)",
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
    "ti_ar": "مطابقة: المبادئ الجبرية والتحليلية الأساسية (المتجهات في بعدين والسرعة النسبية)",
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
    "t": "num",
    "ti": "Numeric Entry: Vector Magnitude in 2D",
    "ti_ar": "إدخال رقمي: مقدار المتجه في المستوى الثنائي",
    "q": "Find the magnitude \\( |\\mathbf{v}| \\) of the vector \\( \\mathbf{v} = 8\\mathbf{i} - 6\\mathbf{j} \\).",
    "q_ar": "أوجد طول (مقدار) المتجه \\( |\\mathbf{v}| \\) للمتجه \\( \\mathbf{v} = 8\\mathbf{i} - 6\\mathbf{j} \\).",
    "a": 10,
    "h": "Use \\( |\\mathbf{v}| = \\sqrt{x^2 + y^2} \\).",
    "h_ar": "استخدم قانون طول المتجه \\( |\\mathbf{v}| = \\sqrt{x^2 + y^2} \\).",
    "sol": "\\( |\\mathbf{v}| = \\sqrt{8^2 + (-6)^2} = \\sqrt{64 + 36} = \\sqrt{100} = 10 \\).",
    "sol_ar": "\\( |\\mathbf{v}| = \\sqrt{64 + 36} = \\sqrt{100} = 10 \\)."
  },
  {
    "t": "ord",
    "ti": "Order the Steps: Proving Three Points are Collinear Using Vectors",
    "ti_ar": "رتّب الخطوات: إثبات وقوع ثلاث نقاط على استقامة واحدة بالمتجهات",
    "prompt": "Arrange the steps to prove that points \\( A, B, C \\) are collinear given position vectors \\( \\overrightarrow{OA}, \\overrightarrow{OB}, \\overrightarrow{OC} \\):",
    "prompt_ar": "رتب خطوات إثبات أن النقاط \\( A, B, C \\) تقع على استقامة واحدة بمعلومية متجهات الموضع:",
    "items": [
      "Compute displacement vector \\( \\overrightarrow{AB} = \\overrightarrow{OB} - \\overrightarrow{OA} \\).",
      "Compute displacement vector \\( \\overrightarrow{BC} = \\overrightarrow{OC} - \\overrightarrow{OB} \\).",
      "Factor out a scalar constant \\( k \\) to show that \\( \\overrightarrow{BC} = k\\overrightarrow{AB} \\) (so they are parallel).",
      "State that since \\( \\overrightarrow{AB} \\) and \\( \\overrightarrow{BC} \\) are parallel and share the common point \\( B \\), \\( A, B, C \\) are collinear."
    ],
    "items_ar": [
      "احسب متجه الإزاحة الأول \\( \\overrightarrow{AB} = \\overrightarrow{OB} - \\overrightarrow{OA} \\).",
      "احسب متجه الإزاحة الثاني \\( \\overrightarrow{BC} = \\overrightarrow{OC} - \\overrightarrow{OB} \\).",
      "أخرج عاملاً مشتركاً \\( k \\) لإثبات أن \\( \\overrightarrow{BC} = k\\overrightarrow{AB} \\) (أي أنهما متوازيان).",
      "اذكر أنه بما أن المتجهين متوازيان ويشتركان في النقطة \\( B \\)، فإن النقاط \\( A, B, C \\) على استقامة واحدة."
    ],
    "ex": "Collinearity proof requires two parts: scalar multiple (parallelism) AND a shared common point.",
    "ex_ar": "إثبات الاستقامة الواحدة يتطلب شرطين: التوازي (أحدهما مضاعف قياسي للآخر) ووجود نقطة مشتركة."
  },
  {
    "t": "cat",
    "ti": "Categorize: Vector Operations & Geometric Meanings",
    "ti_ar": "تصنيف: العمليات على المتجهات ومعانيها الهندسية",
    "categories": [
      "Position / Displacement Rule",
      "Unit Vector Normalization",
      "Collinearity / Parallelism Condition"
    ],
    "categories_ar": [
      "قاعدة متجه الموضع والإزاحة",
      "متجه الوحدة في نفس الاتجاه",
      "شرط التوازي والاستقامة الواحدة"
    ],
    "items": [
      {
        "s": "\\( \\overrightarrow{AB} = \\overrightarrow{OB} - \\overrightarrow{OA} \\)",
        "s_ar": "\\( \\overrightarrow{AB} = \\overrightarrow{OB} - \\overrightarrow{OA} \\)",
        "cat": 0
      },
      {
        "s": "\\( \\hat{\\mathbf{u}} = \\frac{\\mathbf{u}}{|\\mathbf{u}|} \\)",
        "s_ar": "\\( \\hat{\\mathbf{u}} = \\frac{\\mathbf{u}}{|\\mathbf{u}|} \\)",
        "cat": 1
      },
      {
        "s": "\\( \\mathbf{a} = \\lambda \\mathbf{b} \\) for non-zero scalar \\( \\lambda \\)",
        "s_ar": "\\( \\mathbf{a} = \\lambda \\mathbf{b} \\) لعدد حقيقي \\( \\lambda \\neq 0 \\)",
        "cat": 2
      },
      {
        "s": "\\( \\overrightarrow{OP} = \\overrightarrow{OA} + t\\,\\mathbf{v} \\)",
        "s_ar": "\\( \\overrightarrow{OP} = \\overrightarrow{OA} + t\\,\\mathbf{v} \\)",
        "cat": 0
      }
    ],
    "ex": "Displacement is head minus tail; unit vector divides by length; parallel vectors are scalar multiples.",
    "ex_ar": "متجه الإزاحة يساوي النهاية ناقص البداية؛ ومتجه الوحدة يقسم على الطول؛ والمتجهات المتوازية مضاعفات قياسية."
  }
];
});
