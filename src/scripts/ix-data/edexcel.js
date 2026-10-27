/* Interactive Practice data for /edexcel/ - one entry per chapter section id.
   Shipped as public/js/ix/edexcel.js and loaded only on that track's page by the
   engine in src/scripts/modules/19-interactive-activities-engine-v1.js
   (Plan 5 Phase 5.015, ADR 0033). Entry shapes (qc/mt/tf/sb/sr/fn/num/ord/cat/gp/se/ms) are
   documented there. */
(window.__ixData = window.__ixData || []).push(function (D) {
D["edx-number-surds-sets"] = [
  {
    "t": "qc",
    "ti": "Quick Check: Number, Surds, Bounds & Set Notation",
    "ti_ar": "فحص سريع: الأعداد والجذور الصماء وحدود الدقة والمجموعات",
    "q": "When calculating the upper bound of the quotient \\( R = \\frac{x}{y} \\) where \\( x \\) and \\( y \\) are positive rounded measurements, which combination must be used?",
    "q_ar": "عند حساب الحد الأعلى للقسمة \\( R = \\frac{x}{y} \\) حيث \\( x \\) و \\( y \\) قياسان مقربان موجبان، أي تركيبة يجب استخدامها؟",
    "o": [
      "\\( R_{\\max} = \\frac{x_{\\text{UB}}}{y_{\\text{LB}}} \\)",
      "\\( R_{\\max} = \\frac{x_{\\text{UB}}}{y_{\\text{UB}}} \\)",
      "\\( R_{\\max} = \\frac{x_{\\text{LB}}}{y_{\\text{UB}}} \\)",
      "\\( R_{\\max} = \\frac{x_{\\text{LB}}}{y_{\\text{LB}}} \\)"
    ],
    "o_ar": [
      "\\( R_{\\max} = \\frac{x_{\\text{UB}}}{y_{\\text{LB}}} \\)",
      "\\( R_{\\max} = \\frac{x_{\\text{UB}}}{y_{\\text{UB}}} \\)",
      "\\( R_{\\max} = \\frac{x_{\\text{LB}}}{y_{\\text{UB}}} \\)",
      "\\( R_{\\max} = \\frac{x_{\\text{LB}}}{y_{\\text{LB}}} \\)"
    ],
    "a": 0,
    "ex": "To maximize a fraction with positive terms, maximize the numerator (UB) and minimize the denominator (LB).",
    "ex_ar": "لتعظيم كسر حدوده موجبة، نختار الحد الأعلى للبسط (UB) والحد الأدنى للمقام (LB)."
  },
  {
    "t": "tf",
    "ti": "True / False: Core Theorems (Number, Surds, Bounds & Set Notation)",
    "ti_ar": "صح / خطأ: النظريات الأساسية (الأعداد والجذور الصماء وحدود الدقة والمجموعات)",
    "items": [
      {
        "s": "To rationalize the denominator of \\( \\frac{6}{3 - \\sqrt{2}} \\), multiply numerator and denominator by the conjugate \\( 3 + \\sqrt{2} \\).",
        "a": true
      },
      {
        "s": "For two finite sets \\( A \\) and \\( B \\), \\( n(A \\cup B) = n(A) + n(B) - n(A \\cap B) \\).",
        "a": true
      },
      {
        "s": "A length measured as \\( 14\\text{ cm} \\) to the nearest centimetre has upper bound \\( 14.4\\text{ cm} \\).",
        "a": false
      }
    ],
    "items_ar": [
      {
        "s": "لإنطاق مقام الكسر \\( \\frac{6}{3 - \\sqrt{2}} \\)، نضرب البسط والمقام في المرافق \\( 3 + \\sqrt{2} \\).",
        "a": true
      },
      {
        "s": "لأي مجموعتين منتهيتين \\( A \\) و \\( B \\) يتحقق \\( n(A \\cup B) = n(A) + n(B) - n(A \\cap B) \\).",
        "a": true
      },
      {
        "s": "طول مقاس قدره \\( 14\\text{ cm} \\) لأقرب سنتيمتر يكون حده الأعلى \\( 14.4\\text{ cm} \\).",
        "a": false
      }
    ]
  },
  {
    "t": "mt",
    "ti": "Matching: Identities & Principles (Number, Surds, Bounds & Set Notation)",
    "ti_ar": "مطابقة: القوانين والمفاهيم (الأعداد والجذور الصماء وحدود الدقة والمجموعات)",
    "p": [
      {
        "l": "\\( (a - b\\sqrt{n})(a + b\\sqrt{n}) \\)",
        "r": "\\( a^2 - b^2 n \\) (Rational difference of squares)"
      },
      {
        "l": "\\( x = 0.\\dot{4}\\dot{5} \\)",
        "r": "\\( \\frac{45}{99} = \\frac{5}{11} \\) (Recurring decimal fraction)"
      },
      {
        "l": "\\( (A \\cup B)' \\)",
        "r": "\\( A' \\cap B' \\) (De Morgan's Law)"
      },
      {
        "l": "\\( 27^{-2/3} \\)",
        "r": "\\( (\\sqrt[3]{27})^{-2} = \\frac{1}{9} \\) (Fractional negative index)"
      }
    ],
    "p_ar": [
      {
        "l": "\\( (a - b\\sqrt{n})(a + b\\sqrt{n}) \\)",
        "r": "\\( a^2 - b^2 n \\) (عدد نسبي بفرق المربعين)"
      },
      {
        "l": "\\( x = 0.\\dot{4}\\dot{5} \\)",
        "r": "\\( \\frac{45}{99} = \\frac{5}{11} \\) (كسر عشري دوري)"
      },
      {
        "l": "\\( (A \\cup B)' \\)",
        "r": "\\( A' \\cap B' \\) (قانون دي مورغان)"
      },
      {
        "l": "\\( 27^{-2/3} \\)",
        "r": "\\( (\\sqrt[3]{27})^{-2} = \\frac{1}{9} \\) (أس كسري سالب)"
      }
    ]
  },
  {
    "t": "se",
    "ti": "Spot the Error: Algebraic & Domain Verification (Number, Surds, Bounds & Set Notation)",
    "ti_ar": "اكتشف الخطأ: التحقق الجبري والمنطقي (الأعداد والجذور الصماء وحدود الدقة والمجموعات)",
    "q": "A student solves \\( \\sqrt{2x + 8} = x - 2 \\) step by step. Which step introduces an invalid conclusion?",
    "q_ar": "يحل طالب المعادلة \\( \\sqrt{2x + 8} = x - 2 \\) خطوة بخطوة. أي خطوة تتضمن استنتاجاً خاطئاً؟",
    "steps": [
      "Square both sides: \\( 2x + 8 = (x - 2)^2 \\).",
      "Expand the right-hand side: \\( 2x + 8 = x^2 - 4x + 4 \\).",
      "Rearrange and factor: \\( x^2 - 6x - 4 = 0 \\).",
      "Accept both roots without checking the non-negativity condition \\( x - 2 \\ge 0 \\)."
    ],
    "steps_ar": [
      "تربيع الطرفين: \\( 2x + 8 = (x - 2)^2 \\).",
      "فك المربع الكامل: \\( 2x + 8 = x^2 - 4x + 4 \\).",
      "إعادة الترتيب في الصورة القياسية: \\( x^2 - 6x - 4 = 0 \\).",
      "قبول الجذرين معاً دون التحقق من شرط عدم السالبية \\( x - 2 \\ge 0 \\)."
    ],
    "errorStep": 4,
    "reasons": [
      "The principal square root \\( \\sqrt{\\cdot} \\) is always non-negative, so any solution must satisfy \\( x - 2 \\ge 0 \\iff x \\ge 2 \\); the negative root is extraneous.",
      "Expanding \\( (x - 2)^2 \\) should not have a middle term.",
      "Squaring both sides is never allowed for radical equations."
    ],
    "reasons_ar": [
      "الجذر التربيعي الأساسي غير سالب دائماً، لذا يجب تحقق الشرط \\( x \\ge 2 \\) واستبعاد الجذر الدخيل السالب.",
      "فك المربع الكامل غير صحيح.",
      "لا يجوز تربيع الطرفين مطلقاً."
    ],
    "correctReason": 0,
    "h": "Check the sign of the right-hand side \\( x - 2 \\) for the negative root.",
    "h_ar": "تحقق من إشارة الطرف الأيمن \\( x - 2 \\) عند التعويض بالجذر السالب.",
    "sol": "Squaring introduces an extraneous root whenever \\( x - 2 < 0 \\). Only the root satisfying \\( x \\ge 2 \\) is valid.",
    "sol_ar": "التربيع يدخل جذراً دخيلاً يجعل الطرف الأيمن سالباً؛ يُقبل فقط الجذر الذي يحقق \\( x \\ge 2 \\)."
  },
  {
    "t": "ms",
    "ti": "Examiner Mode: Multi-Step Structured Problem (Number, Surds, Bounds & Set Notation)",
    "ti_ar": "وضع المصحح: مسألة هيكلية متعددة الخطوات (الأعداد والجذور الصماء وحدود الدقة والمجموعات)",
    "q": "Consider \\( f(x) = x^2 - 4x + 8 \\) for \\( x \\ge 2 \\). (a) Express \\( f(x) \\) in completed-square vertex form and state its range. (b) Find \\( f^{-1}(x) \\) and state its domain.",
    "q_ar": "لتكن \\( f(x) = x^2 - 4x + 8 \\) حيث \\( x \\ge 2 \\). (أ) اكتب \\( f(x) \\) في صورة المربع الكامل وحدد مداها. (ب) أوجد \\( f^{-1}(x) \\) وحدد مجالها.",
    "parts": [
      {
        "label": "Part (a) — Completed Square & Range",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "Complete the square: \\( f(x) = (x - 2)^2 + 4 \\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "State exact range: \\( f(x) \\ge 4 \\)."
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
            "text": "Write \\( y = (x - 2)^2 + 4 \\implies (x - 2)^2 = y - 4 \\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "Select positive root (since \\( x \\ge 2 \\)): \\( f^{-1}(x) = 2 + \\sqrt{x - 4} \\)."
          },
          {
            "code": "B1",
            "marks": 1,
            "text": "State domain of \\( f^{-1} \\): \\( x \\ge 4 \\)."
          }
        ]
      }
    ],
    "examinerTip": "Always match the domain of \\( f^{-1} \\) to the range of \\( f \\), and use \\( x \\ge 2 \\) to select the positive branch of the square root.",
    "examinerTip_ar": "مجال الدالة العكسية \\( f^{-1} \\) هو مدى الدالة الأصلية \\( f \\)، ويُختار الجذر الموجب لأن \\( x \\ge 2 \\)."
  },
  {
    "t": "sb",
    "ti": "Step Builder: Guided Calculation (Number, Surds, Bounds & Set Notation)",
    "ti_ar": "بناء الخطوات: حساب موجه خطوة بخطوة (الأعداد والجذور الصماء وحدود الدقة والمجموعات)",
    "steps": [
      {
        "l": "In \\( y = x^2 - 4x + 9 \\), halve the \\( x \\)-coefficient to write \\( (x - h)^2 \\) where \\( h = \\)",
        "a": "2",
        "h": "Divide 4 by 2."
      },
      {
        "l": "Find the minimum value \\( k = 9 - 2^2 = \\)",
        "a": "5",
        "h": "Subtract 4 from 9."
      },
      {
        "l": "Evaluate \\( y \\) when \\( x = 5 \\): \\( y = \\)",
        "a": "14",
        "h": "Calculate \\( 3^2 + 5 \\)."
      }
    ],
    "steps_ar": [
      {
        "l": "في الدالة \\( y = x^2 - 4x + 9 \\)، قيمة \\( h \\) في \\( (x - h)^2 \\) تساوي:",
        "a": "2",
        "h": "اقسم 4 على 2."
      },
      {
        "l": "أوجد القيمة الصغرى \\( k = 9 - 2^2 = \\)",
        "a": "5",
        "h": "اطرح 4 من 9."
      },
      {
        "l": "احسب قيمة \\( y \\) عندما \\( x = 5 \\):",
        "a": "14",
        "h": "احسب \\( 3^2 + 5 \\)."
      }
    ]
  },
  {
    "t": "num",
    "ti": "Numeric Entry: Number, Surds, Bounds & Set Notation",
    "ti_ar": "إدخال رقمي: الأعداد والجذور الصماء وحدود الدقة والمجموعات",
    "q": "Evaluate \\( n(A \\cup B) \\) given \\( n(A) = 24 \\), \\( n(B) = 19 \\), and \\( n(A \\cap B) = 8 \\).",
    "q_ar": "احسب \\( n(A \\cup B) \\) إذا علمت أن \\( n(A) = 24 \\) و \\( n(B) = 19 \\) و \\( n(A \\cap B) = 8 \\).",
    "a": 35,
    "h": "Apply Inclusion-Exclusion: \\( n(A \\cup B) = n(A) + n(B) - n(A \\cap B) \\).",
    "h_ar": "طبق مبدأ الشمول والإقصاء: \\( n(A \\cup B) = n(A) + n(B) - n(A \\cap B) \\).",
    "sol": "\\( n(A \\cup B) = 24 + 19 - 8 = 35 \\).",
    "sol_ar": "\\( n(A \\cup B) = 24 + 19 - 8 = 35 \\)."
  },
  {
    "t": "ord",
    "ti": "Order the Steps: Systematic Solution (Number, Surds, Bounds & Set Notation)",
    "ti_ar": "رتّب الخطوات: خطوات الحل المنظم (الأعداد والجذور الصماء وحدود الدقة والمجموعات)",
    "prompt": "Arrange the logical steps in order to solve the intersection and tangency problem for \\( y = x^2 - 4x + 8 \\) and \\( y = 2x + k \\):",
    "prompt_ar": "رتب الخطوات المنطقية لحل مسألة التماس بين المنحنى \\( y = x^2 - 4x + 8 \\) والمستقيم \\( y = 2x + k \\):",
    "items": [
      "Equate the curve and line equations: \\( x^2 - 4x + 8 = 2x + k \\).",
      "Rearrange into standard quadratic form: \\( x^2 - 6x + (8 - k) = 0 \\).",
      "Set the discriminant \\( \\Delta = b^2 - 4ac = (-6)^2 - 4(1)(8 - k) = 0 \\) for tangency.",
      "Solve the resulting linear equation for the exact value of the parameter \\( k \\)."
    ],
    "items_ar": [
      "ساوِ معادلة المنحنى بمعادلة المستقيم: \\( x^2 - 4x + 8 = 2x + k \\).",
      "أعد الترتيب في الصورة القياسية: \\( x^2 - 6x + (8 - k) = 0 \\).",
      "ضع المميز مساوياً للصفر لشرط التماس: \\( \\Delta = (-6)^2 - 4(8 - k) = 0 \\).",
      "حل المعادلة الخطية الناتجة لإيجاد القيمة الدقيقة للثابت \\( k \\)."
    ],
    "ex": "Equate the two equations first, collect terms into ax² + bx + c = 0, then apply Δ = 0.",
    "ex_ar": "ساوِ المعادلتين أولاً، ثم رتب الحدود في الصورة القياسية، ثم طبق شرط التماس Δ = 0."
  },
  {
    "t": "cat",
    "ti": "Categorize: Mathematical Classification (Number, Surds, Bounds & Set Notation)",
    "ti_ar": "تصنيف: التصنيف الرياضي (الأعداد والجذور الصماء وحدود الدقة والمجموعات)",
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
        "s": "\\( x^2 - 4x + 4 = 0 \\)",
        "s_ar": "\\( x^2 - 4x + 4 = 0 \\)",
        "cat": 1
      },
      {
        "s": "\\( x^2 - 5x + 2 = 0 \\)",
        "s_ar": "\\( x^2 - 5x + 2 = 0 \\)",
        "cat": 0
      },
      {
        "s": "\\( x^2 + 2x + 7 = 0 \\)",
        "s_ar": "\\( x^2 + 2x + 7 = 0 \\)",
        "cat": 2
      },
      {
        "s": "\\( 4x^2 - 8x + 4 = 0 \\)",
        "s_ar": "\\( 4x^2 - 8x + 4 = 0 \\)",
        "cat": 1
      }
    ],
    "ex": "Compute Δ = b² − 4ac to classify each quadratic equation.",
    "ex_ar": "احسب قيمة المميز Δ = b² − 4ac لتصنيف كل معادلة تربيعية."
  }
];

D["edx-algebra-quadratics"] = [
  {
    "t": "qc",
    "ti": "Quick Check: Algebraic Fractions, Quadratics & Simultaneous Systems",
    "ti_ar": "فحص سريع: الكسور الجبرية والمعادلات التربيعية والأنظمة الآنية",
    "q": "When simplifying the algebraic fraction \\( \\frac{2x^2 - 18}{x^2 - 5x + 6} \\), what is the fully simplified expression for \\( x \\neq 2, 3 \\)?",
    "q_ar": "عند تبسيط الكسر الجبري \\( \\frac{2x^2 - 18}{x^2 - 5x + 6} \\)، ما هي الصورة المبسطة النهائية حيث \\( x \\neq 2, 3 \\)؟",
    "o": [
      "\\( \\frac{2(x + 3)}{x - 2} \\)",
      "\\( \\frac{2(x - 3)}{x - 2} \\)",
      "\\( \\frac{x + 3}{x - 2} \\)",
      "\\( \\frac{2(x + 3)}{x + 2} \\)"
    ],
    "o_ar": [
      "\\( \\frac{2(x + 3)}{x - 2} \\)",
      "\\( \\frac{2(x - 3)}{x - 2} \\)",
      "\\( \\frac{x + 3}{x - 2} \\)",
      "\\( \\frac{2(x + 3)}{x + 2} \\)"
    ],
    "a": 0,
    "ex": "Factor numerator as \\( 2(x - 3)(x + 3) \\) and denominator as \\( (x - 2)(x - 3) \\), then cancel \\( (x - 3) \\).",
    "ex_ar": "حلل البسط إلى \\( 2(x - 3)(x + 3) \\) والمقام إلى \\( (x - 2)(x - 3) \\) ثم اختصر \\( (x - 3) \\)."
  },
  {
    "t": "tf",
    "ti": "True / False: Core Theorems (Algebraic Fractions, Quadratics & Simultaneous Systems)",
    "ti_ar": "صح / خطأ: النظريات الأساسية (الكسور الجبرية والمعادلات التربيعية والأنظمة الآنية)",
    "items": [
      {
        "s": "The quadratic inequality \\( (x - 1)(x - 5) < 0 \\) has solution set \\( 1 < x < 5 \\).",
        "a": true
      },
      {
        "s": "Completing the square on \\( x^2 - 6x + 13 \\) yields \\( (x - 3)^2 + 4 \\), which has minimum value \\( 4 \\).",
        "a": true
      },
      {
        "s": "To solve \\( x^2 + y^2 = 25 \\) and \\( y = x + 1 \\), you can add the two equations directly to eliminate \\( x \\).",
        "a": false
      }
    ],
    "items_ar": [
      {
        "s": "المتباينة التربيعية \\( (x - 1)(x - 5) < 0 \\) مجموعة حلها هي \\( 1 < x < 5 \\).",
        "a": true
      },
      {
        "s": "إكمال المربع للمقدار \\( x^2 - 6x + 13 \\) يعطي \\( (x - 3)^2 + 4 \\) وقيمته الصغرى \\( 4 \\).",
        "a": true
      },
      {
        "s": "لحل النظام \\( x^2 + y^2 = 25 \\) و \\( y = x + 1 \\)، يمكن جمع المعادلتين مباشرة لحذف \\( x \\).",
        "a": false
      }
    ]
  },
  {
    "t": "mt",
    "ti": "Matching: Identities & Principles (Algebraic Fractions, Quadratics & Simultaneous Systems)",
    "ti_ar": "مطابقة: القوانين والمفاهيم (الكسور الجبرية والمعادلات التربيعية والأنظمة الآنية)",
    "p": [
      {
        "l": "\\( x^2 - 9 < 0 \\)",
        "r": "Inside interval: \\( -3 < x < 3 \\)"
      },
      {
        "l": "\\( x^2 - 9 > 0 \\)",
        "r": "Outside intervals: \\( x < -3 \\) or \\( x > 3 \\)"
      },
      {
        "l": "\\( a(x - h)^2 + k \\)",
        "r": "Turning point at \\( (h, k) \\), axis \\( x = h \\)"
      },
      {
        "l": "\\( b^2 - 4ac = 0 \\)",
        "r": "Line is tangent to the quadratic curve"
      }
    ],
    "p_ar": [
      {
        "l": "\\( x^2 - 9 < 0 \\)",
        "r": "الفترة الداخلية: \\( -3 < x < 3 \\)"
      },
      {
        "l": "\\( x^2 - 9 > 0 \\)",
        "r": "الفترتان الخارجيتان: \\( x < -3 \\) أو \\( x > 3 \\)"
      },
      {
        "l": "\\( a(x - h)^2 + k \\)",
        "r": "نقطة الرأس \\( (h, k) \\) ومحور التماثل \\( x = h \\)"
      },
      {
        "l": "\\( b^2 - 4ac = 0 \\)",
        "r": "المستقيم مماس للمنحنى التربيعي"
      }
    ]
  },
  {
    "t": "se",
    "ti": "Spot the Error: Algebraic & Domain Verification (Algebraic Fractions, Quadratics & Simultaneous Systems)",
    "ti_ar": "اكتشف الخطأ: التحقق الجبري والمنطقي (الكسور الجبرية والمعادلات التربيعية والأنظمة الآنية)",
    "q": "A student solves \\( \\sqrt{2x + 18} = x - 3 \\) step by step. Which step introduces an invalid conclusion?",
    "q_ar": "يحل طالب المعادلة \\( \\sqrt{2x + 18} = x - 3 \\) خطوة بخطوة. أي خطوة تتضمن استنتاجاً خاطئاً؟",
    "steps": [
      "Square both sides: \\( 2x + 18 = (x - 3)^2 \\).",
      "Expand the right-hand side: \\( 2x + 18 = x^2 - 6x + 9 \\).",
      "Rearrange and factor: \\( x^2 - 8x - 9 = 0 \\).",
      "Accept both roots without checking the non-negativity condition \\( x - 3 \\ge 0 \\)."
    ],
    "steps_ar": [
      "تربيع الطرفين: \\( 2x + 18 = (x - 3)^2 \\).",
      "فك المربع الكامل: \\( 2x + 18 = x^2 - 6x + 9 \\).",
      "إعادة الترتيب في الصورة القياسية: \\( x^2 - 8x - 9 = 0 \\).",
      "قبول الجذرين معاً دون التحقق من شرط عدم السالبية \\( x - 3 \\ge 0 \\)."
    ],
    "errorStep": 4,
    "reasons": [
      "The principal square root \\( \\sqrt{\\cdot} \\) is always non-negative, so any solution must satisfy \\( x - 3 \\ge 0 \\iff x \\ge 3 \\); the negative root is extraneous.",
      "Expanding \\( (x - 3)^2 \\) should not have a middle term.",
      "Squaring both sides is never allowed for radical equations."
    ],
    "reasons_ar": [
      "الجذر التربيعي الأساسي غير سالب دائماً، لذا يجب تحقق الشرط \\( x \\ge 3 \\) واستبعاد الجذر الدخيل السالب.",
      "فك المربع الكامل غير صحيح.",
      "لا يجوز تربيع الطرفين مطلقاً."
    ],
    "correctReason": 0,
    "h": "Check the sign of the right-hand side \\( x - 3 \\) for the negative root.",
    "h_ar": "تحقق من إشارة الطرف الأيمن \\( x - 3 \\) عند التعويض بالجذر السالب.",
    "sol": "Squaring introduces an extraneous root whenever \\( x - 3 < 0 \\). Only the root satisfying \\( x \\ge 3 \\) is valid.",
    "sol_ar": "التربيع يدخل جذراً دخيلاً يجعل الطرف الأيمن سالباً؛ يُقبل فقط الجذر الذي يحقق \\( x \\ge 3 \\)."
  },
  {
    "t": "ms",
    "ti": "Examiner Mode: Multi-Step Structured Problem (Algebraic Fractions, Quadratics & Simultaneous Systems)",
    "ti_ar": "وضع المصحح: مسألة هيكلية متعددة الخطوات (الكسور الجبرية والمعادلات التربيعية والأنظمة الآنية)",
    "q": "Consider \\( f(x) = x^2 - 6x + 13 \\) for \\( x \\ge 3 \\). (a) Express \\( f(x) \\) in completed-square vertex form and state its range. (b) Find \\( f^{-1}(x) \\) and state its domain.",
    "q_ar": "لتكن \\( f(x) = x^2 - 6x + 13 \\) حيث \\( x \\ge 3 \\). (أ) اكتب \\( f(x) \\) في صورة المربع الكامل وحدد مداها. (ب) أوجد \\( f^{-1}(x) \\) وحدد مجالها.",
    "parts": [
      {
        "label": "Part (a) — Completed Square & Range",
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
            "text": "State exact range: \\( f(x) \\ge 4 \\)."
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
            "text": "Write \\( y = (x - 3)^2 + 4 \\implies (x - 3)^2 = y - 4 \\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "Select positive root (since \\( x \\ge 3 \\)): \\( f^{-1}(x) = 3 + \\sqrt{x - 4} \\)."
          },
          {
            "code": "B1",
            "marks": 1,
            "text": "State domain of \\( f^{-1} \\): \\( x \\ge 4 \\)."
          }
        ]
      }
    ],
    "examinerTip": "Always match the domain of \\( f^{-1} \\) to the range of \\( f \\), and use \\( x \\ge 3 \\) to select the positive branch of the square root.",
    "examinerTip_ar": "مجال الدالة العكسية \\( f^{-1} \\) هو مدى الدالة الأصلية \\( f \\)، ويُختار الجذر الموجب لأن \\( x \\ge 3 \\)."
  },
  {
    "t": "sb",
    "ti": "Step Builder: Guided Calculation (Algebraic Fractions, Quadratics & Simultaneous Systems)",
    "ti_ar": "بناء الخطوات: حساب موجه خطوة بخطوة (الكسور الجبرية والمعادلات التربيعية والأنظمة الآنية)",
    "steps": [
      {
        "l": "In \\( y = x^2 - 6x + 14 \\), halve the \\( x \\)-coefficient to write \\( (x - h)^2 \\) where \\( h = \\)",
        "a": "3",
        "h": "Divide 6 by 2."
      },
      {
        "l": "Find the minimum value \\( k = 14 - 3^2 = \\)",
        "a": "5",
        "h": "Subtract 9 from 14."
      },
      {
        "l": "Evaluate \\( y \\) when \\( x = 6 \\): \\( y = \\)",
        "a": "14",
        "h": "Calculate \\( 3^2 + 5 \\)."
      }
    ],
    "steps_ar": [
      {
        "l": "في الدالة \\( y = x^2 - 6x + 14 \\)، قيمة \\( h \\) في \\( (x - h)^2 \\) تساوي:",
        "a": "3",
        "h": "اقسم 6 على 2."
      },
      {
        "l": "أوجد القيمة الصغرى \\( k = 14 - 3^2 = \\)",
        "a": "5",
        "h": "اطرح 9 من 14."
      },
      {
        "l": "احسب قيمة \\( y \\) عندما \\( x = 6 \\):",
        "a": "14",
        "h": "احسب \\( 3^2 + 5 \\)."
      }
    ]
  },
  {
    "t": "num",
    "ti": "Numeric Entry: Algebraic Fractions, Quadratics & Simultaneous Systems",
    "ti_ar": "إدخال رقمي: الكسور الجبرية والمعادلات التربيعية والأنظمة الآنية",
    "q": "Find the minimum value of the quadratic expression \\( x^2 - 10x + 32 \\) for real \\( x \\).",
    "q_ar": "أوجد القيمة الصغرى للمقدار التربيعي \\( x^2 - 10x + 32 \\) لكل \\( x \\) حقيقي.",
    "a": 7,
    "h": "Complete the square: \\( (x - 5)^2 - 25 + 32 \\).",
    "h_ar": "أكمل المربع: \\( (x - 5)^2 - 25 + 32 \\).",
    "sol": "Since \\( x^2 - 10x + 32 = (x - 5)^2 + 7 \\) and \\( (x - 5)^2 \\ge 0 \\), the minimum value is \\( 7 \\).",
    "sol_ar": "Since \\( x^2 - 10x + 32 = (x - 5)^2 + 7 \\) and \\( (x - 5)^2 \\ge 0 \\), the minimum value is \\( 7 \\)."
  },
  {
    "t": "ord",
    "ti": "Order the Steps: Systematic Solution (Algebraic Fractions, Quadratics & Simultaneous Systems)",
    "ti_ar": "رتّب الخطوات: خطوات الحل المنظم (الكسور الجبرية والمعادلات التربيعية والأنظمة الآنية)",
    "prompt": "Arrange the logical steps in order to solve the intersection and tangency problem for \\( y = x^2 - 6x + 13 \\) and \\( y = 2x + k \\):",
    "prompt_ar": "رتب الخطوات المنطقية لحل مسألة التماس بين المنحنى \\( y = x^2 - 6x + 13 \\) والمستقيم \\( y = 2x + k \\):",
    "items": [
      "Equate the curve and line equations: \\( x^2 - 6x + 13 = 2x + k \\).",
      "Rearrange into standard quadratic form: \\( x^2 - 8x + (13 - k) = 0 \\).",
      "Set the discriminant \\( \\Delta = b^2 - 4ac = (-8)^2 - 4(1)(13 - k) = 0 \\) for tangency.",
      "Solve the resulting linear equation for the exact value of the parameter \\( k \\)."
    ],
    "items_ar": [
      "ساوِ معادلة المنحنى بمعادلة المستقيم: \\( x^2 - 6x + 13 = 2x + k \\).",
      "أعد الترتيب في الصورة القياسية: \\( x^2 - 8x + (13 - k) = 0 \\).",
      "ضع المميز مساوياً للصفر لشرط التماس: \\( \\Delta = (-8)^2 - 4(13 - k) = 0 \\).",
      "حل المعادلة الخطية الناتجة لإيجاد القيمة الدقيقة للثابت \\( k \\)."
    ],
    "ex": "Equate the two equations first, collect terms into ax² + bx + c = 0, then apply Δ = 0.",
    "ex_ar": "ساوِ المعادلتين أولاً، ثم رتب الحدود في الصورة القياسية، ثم طبق شرط التماس Δ = 0."
  },
  {
    "t": "cat",
    "ti": "Categorize: Mathematical Classification (Algebraic Fractions, Quadratics & Simultaneous Systems)",
    "ti_ar": "تصنيف: التصنيف الرياضي (الكسور الجبرية والمعادلات التربيعية والأنظمة الآنية)",
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
        "s": "\\( x^2 + 3x + 12 = 0 \\)",
        "s_ar": "\\( x^2 + 3x + 12 = 0 \\)",
        "cat": 2
      },
      {
        "s": "\\( 4x^2 - 12x + 9 = 0 \\)",
        "s_ar": "\\( 4x^2 - 12x + 9 = 0 \\)",
        "cat": 1
      }
    ],
    "ex": "Compute Δ = b² − 4ac to classify each quadratic equation.",
    "ex_ar": "احسب قيمة المميز Δ = b² − 4ac لتصنيف كل معادلة تربيعية."
  }
];

D["edx-functions-sequences"] = [
  {
    "t": "qc",
    "ti": "Quick Check: Functions, Transformations & Arithmetic Series",
    "ti_ar": "فحص سريع: الدوال والتحويلات الهندسية والمتسلسلات الحسابية",
    "q": "If \\( f(x) = 3x - 2 \\) and \\( g(x) = x^2 + 1 \\), what is the composite function \\( fg(x) \\)?",
    "q_ar": "إذا كانت \\( f(x) = 3x - 2 \\) و \\( g(x) = x^2 + 1 \\)، فما هي الدالة المركبة \\( fg(x) \\)؟",
    "o": [
      "\\( 3x^2 + 1 \\)",
      "\\( 9x^2 - 12x + 5 \\)",
      "\\( 3x^2 - 1 \\)",
      "\\( 3x^3 - 2x^2 + 3x - 2 \\)"
    ],
    "o_ar": [
      "\\( 3x^2 + 1 \\)",
      "\\( 9x^2 - 12x + 5 \\)",
      "\\( 3x^2 - 1 \\)",
      "\\( 3x^3 - 2x^2 + 3x - 2 \\)"
    ],
    "a": 0,
    "ex": "Apply \\( g \\) first, then substitute into \\( f \\): \\( f(g(x)) = 3(x^2 + 1) - 2 = 3x^2 + 1 \\).",
    "ex_ar": "طبّق \\( g \\) أولاً ثم عوّض في \\( f \\): \\( f(g(x)) = 3(x^2 + 1) - 2 = 3x^2 + 1 \\)."
  },
  {
    "t": "tf",
    "ti": "True / False: Core Theorems (Functions, Transformations & Arithmetic Series)",
    "ti_ar": "صح / خطأ: النظريات الأساسية (الدوال والتحويلات الهندسية والمتسلسلات الحسابية)",
    "items": [
      {
        "s": "The graph of \\( y = f(x - 4) \\) is a horizontal translation of \\( y = f(x) \\) by \\( 4 \\) units to the right.",
        "a": true
      },
      {
        "s": "The sum of the first \\( n \\) terms of an arithmetic series with first term \\( a \\) and common difference \\( d \\) is \\( S_n = \\frac{n}{2}[2a + (n - 1)d] \\).",
        "a": true
      },
      {
        "s": "For \\( f(x) = \\frac{5}{x - 3} \\), the value \\( x = 3 \\) must be excluded because it makes the numerator zero.",
        "a": false
      }
    ],
    "items_ar": [
      {
        "s": "منحنى \\( y = f(x - 4) \\) هو إزاحة أفقية لمنحنى \\( y = f(x) \\) بمقدار \\( 4 \\) وحدات لليمين.",
        "a": true
      },
      {
        "s": "مجموع أول \\( n \\) حداً في متتابعة حسابية هو \\( S_n = \\frac{n}{2}[2a + (n - 1)d] \\).",
        "a": true
      },
      {
        "s": "في الدالة \\( f(x) = \\frac{5}{x - 3} \\)، تُستبعد القيمة \\( x = 3 \\) لأنها تجعل البسط صفراً.",
        "a": false
      }
    ]
  },
  {
    "t": "mt",
    "ti": "Matching: Identities & Principles (Functions, Transformations & Arithmetic Series)",
    "ti_ar": "مطابقة: القوانين والمفاهيم (الدوال والتحويلات الهندسية والمتسلسلات الحسابية)",
    "p": [
      {
        "l": "\\( y = f(x) + k \\)",
        "r": "Vertical translation by vector \\( \\binom{0}{k} \\)"
      },
      {
        "l": "\\( y = f(x - h) \\)",
        "r": "Horizontal translation by vector \\( \\binom{h}{0} \\)"
      },
      {
        "l": "\\( u_n = a + (n - 1)d \\)",
        "r": "General \\( n \\)th term of an arithmetic sequence"
      },
      {
        "l": "\\( f^{-1}(x) \\)",
        "r": "Reflection of \\( y = f(x) \\) across the line \\( y = x \\)"
      }
    ],
    "p_ar": [
      {
        "l": "\\( y = f(x) + k \\)",
        "r": "إزاحة رأسية بالمتجه \\( \\binom{0}{k} \\)"
      },
      {
        "l": "\\( y = f(x - h) \\)",
        "r": "إزاحة أفقية بالمتجه \\( \\binom{h}{0} \\)"
      },
      {
        "l": "\\( u_n = a + (n - 1)d \\)",
        "r": "الحد النوني العام للمتتابعة الحسابية"
      },
      {
        "l": "\\( f^{-1}(x) \\)",
        "r": "انعكاس منحنى \\( y = f(x) \\) حول المستقيم \\( y = x \\)"
      }
    ]
  },
  {
    "t": "se",
    "ti": "Spot the Error: Algebraic & Domain Verification (Functions, Transformations & Arithmetic Series)",
    "ti_ar": "اكتشف الخطأ: التحقق الجبري والمنطقي (الدوال والتحويلات الهندسية والمتسلسلات الحسابية)",
    "q": "A student solves \\( \\sqrt{2x + 32} = x - 4 \\) step by step. Which step introduces an invalid conclusion?",
    "q_ar": "يحل طالب المعادلة \\( \\sqrt{2x + 32} = x - 4 \\) خطوة بخطوة. أي خطوة تتضمن استنتاجاً خاطئاً؟",
    "steps": [
      "Square both sides: \\( 2x + 32 = (x - 4)^2 \\).",
      "Expand the right-hand side: \\( 2x + 32 = x^2 - 8x + 16 \\).",
      "Rearrange and factor: \\( x^2 - 10x - 16 = 0 \\).",
      "Accept both roots without checking the non-negativity condition \\( x - 4 \\ge 0 \\)."
    ],
    "steps_ar": [
      "تربيع الطرفين: \\( 2x + 32 = (x - 4)^2 \\).",
      "فك المربع الكامل: \\( 2x + 32 = x^2 - 8x + 16 \\).",
      "إعادة الترتيب في الصورة القياسية: \\( x^2 - 10x - 16 = 0 \\).",
      "قبول الجذرين معاً دون التحقق من شرط عدم السالبية \\( x - 4 \\ge 0 \\)."
    ],
    "errorStep": 4,
    "reasons": [
      "The principal square root \\( \\sqrt{\\cdot} \\) is always non-negative, so any solution must satisfy \\( x - 4 \\ge 0 \\iff x \\ge 4 \\); the negative root is extraneous.",
      "Expanding \\( (x - 4)^2 \\) should not have a middle term.",
      "Squaring both sides is never allowed for radical equations."
    ],
    "reasons_ar": [
      "الجذر التربيعي الأساسي غير سالب دائماً، لذا يجب تحقق الشرط \\( x \\ge 4 \\) واستبعاد الجذر الدخيل السالب.",
      "فك المربع الكامل غير صحيح.",
      "لا يجوز تربيع الطرفين مطلقاً."
    ],
    "correctReason": 0,
    "h": "Check the sign of the right-hand side \\( x - 4 \\) for the negative root.",
    "h_ar": "تحقق من إشارة الطرف الأيمن \\( x - 4 \\) عند التعويض بالجذر السالب.",
    "sol": "Squaring introduces an extraneous root whenever \\( x - 4 < 0 \\). Only the root satisfying \\( x \\ge 4 \\) is valid.",
    "sol_ar": "التربيع يدخل جذراً دخيلاً يجعل الطرف الأيمن سالباً؛ يُقبل فقط الجذر الذي يحقق \\( x \\ge 4 \\)."
  },
  {
    "t": "ms",
    "ti": "Examiner Mode: Multi-Step Structured Problem (Functions, Transformations & Arithmetic Series)",
    "ti_ar": "وضع المصحح: مسألة هيكلية متعددة الخطوات (الدوال والتحويلات الهندسية والمتسلسلات الحسابية)",
    "q": "Consider \\( f(x) = x^2 - 8x + 20 \\) for \\( x \\ge 4 \\). (a) Express \\( f(x) \\) in completed-square vertex form and state its range. (b) Find \\( f^{-1}(x) \\) and state its domain.",
    "q_ar": "لتكن \\( f(x) = x^2 - 8x + 20 \\) حيث \\( x \\ge 4 \\). (أ) اكتب \\( f(x) \\) في صورة المربع الكامل وحدد مداها. (ب) أوجد \\( f^{-1}(x) \\) وحدد مجالها.",
    "parts": [
      {
        "label": "Part (a) — Completed Square & Range",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "Complete the square: \\( f(x) = (x - 4)^2 + 4 \\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "State exact range: \\( f(x) \\ge 4 \\)."
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
            "text": "Write \\( y = (x - 4)^2 + 4 \\implies (x - 4)^2 = y - 4 \\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "Select positive root (since \\( x \\ge 4 \\)): \\( f^{-1}(x) = 4 + \\sqrt{x - 4} \\)."
          },
          {
            "code": "B1",
            "marks": 1,
            "text": "State domain of \\( f^{-1} \\): \\( x \\ge 4 \\)."
          }
        ]
      }
    ],
    "examinerTip": "Always match the domain of \\( f^{-1} \\) to the range of \\( f \\), and use \\( x \\ge 4 \\) to select the positive branch of the square root.",
    "examinerTip_ar": "مجال الدالة العكسية \\( f^{-1} \\) هو مدى الدالة الأصلية \\( f \\)، ويُختار الجذر الموجب لأن \\( x \\ge 4 \\)."
  },
  {
    "t": "sb",
    "ti": "Step Builder: Guided Calculation (Functions, Transformations & Arithmetic Series)",
    "ti_ar": "بناء الخطوات: حساب موجه خطوة بخطوة (الدوال والتحويلات الهندسية والمتسلسلات الحسابية)",
    "steps": [
      {
        "l": "In \\( y = x^2 - 8x + 21 \\), halve the \\( x \\)-coefficient to write \\( (x - h)^2 \\) where \\( h = \\)",
        "a": "4",
        "h": "Divide 8 by 2."
      },
      {
        "l": "Find the minimum value \\( k = 21 - 4^2 = \\)",
        "a": "5",
        "h": "Subtract 16 from 21."
      },
      {
        "l": "Evaluate \\( y \\) when \\( x = 7 \\): \\( y = \\)",
        "a": "14",
        "h": "Calculate \\( 3^2 + 5 \\)."
      }
    ],
    "steps_ar": [
      {
        "l": "في الدالة \\( y = x^2 - 8x + 21 \\)، قيمة \\( h \\) في \\( (x - h)^2 \\) تساوي:",
        "a": "4",
        "h": "اقسم 8 على 2."
      },
      {
        "l": "أوجد القيمة الصغرى \\( k = 21 - 4^2 = \\)",
        "a": "5",
        "h": "اطرح 16 من 21."
      },
      {
        "l": "احسب قيمة \\( y \\) عندما \\( x = 7 \\):",
        "a": "14",
        "h": "احسب \\( 3^2 + 5 \\)."
      }
    ]
  },
  {
    "t": "num",
    "ti": "Numeric Entry: Functions, Transformations & Arithmetic Series",
    "ti_ar": "إدخال رقمي: الدوال والتحويلات الهندسية والمتسلسلات الحسابية",
    "q": "Find the sum of the first \\( 20 \\) terms of the arithmetic series \\( 5 + 8 + 11 + 14 + \\dots \\)",
    "q_ar": "أوجد مجموع أول \\( 20 \\) حداً من المتسلسلة الحسابية \\( 5 + 8 + 11 + 14 + \\dots \\)",
    "a": 670,
    "h": "Use \\( S_{20} = \\frac{20}{2}[2(5) + (20 - 1)(3)] \\).",
    "h_ar": "استخدم القانون \\( S_{20} = \\frac{20}{2}[2(5) + (20 - 1)(3)] \\).",
    "sol": "\\( S_{20} = 10 \\times (10 + 57) = 10 \\times 67 = 670 \\).",
    "sol_ar": "\\( S_{20} = 10 \\times (10 + 57) = 10 \\times 67 = 670 \\)."
  },
  {
    "t": "ord",
    "ti": "Order the Steps: Systematic Solution (Functions, Transformations & Arithmetic Series)",
    "ti_ar": "رتّب الخطوات: خطوات الحل المنظم (الدوال والتحويلات الهندسية والمتسلسلات الحسابية)",
    "prompt": "Arrange the logical steps in order to solve the intersection and tangency problem for \\( y = x^2 - 8x + 20 \\) and \\( y = 2x + k \\):",
    "prompt_ar": "رتب الخطوات المنطقية لحل مسألة التماس بين المنحنى \\( y = x^2 - 8x + 20 \\) والمستقيم \\( y = 2x + k \\):",
    "items": [
      "Equate the curve and line equations: \\( x^2 - 8x + 20 = 2x + k \\).",
      "Rearrange into standard quadratic form: \\( x^2 - 10x + (20 - k) = 0 \\).",
      "Set the discriminant \\( \\Delta = b^2 - 4ac = (-10)^2 - 4(1)(20 - k) = 0 \\) for tangency.",
      "Solve the resulting linear equation for the exact value of the parameter \\( k \\)."
    ],
    "items_ar": [
      "ساوِ معادلة المنحنى بمعادلة المستقيم: \\( x^2 - 8x + 20 = 2x + k \\).",
      "أعد الترتيب في الصورة القياسية: \\( x^2 - 10x + (20 - k) = 0 \\).",
      "ضع المميز مساوياً للصفر لشرط التماس: \\( \\Delta = (-10)^2 - 4(20 - k) = 0 \\).",
      "حل المعادلة الخطية الناتجة لإيجاد القيمة الدقيقة للثابت \\( k \\)."
    ],
    "ex": "Equate the two equations first, collect terms into ax² + bx + c = 0, then apply Δ = 0.",
    "ex_ar": "ساوِ المعادلتين أولاً، ثم رتب الحدود في الصورة القياسية، ثم طبق شرط التماس Δ = 0."
  },
  {
    "t": "cat",
    "ti": "Categorize: Mathematical Classification (Functions, Transformations & Arithmetic Series)",
    "ti_ar": "تصنيف: التصنيف الرياضي (الدوال والتحويلات الهندسية والمتسلسلات الحسابية)",
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
        "s": "\\( x^2 - 8x + 16 = 0 \\)",
        "s_ar": "\\( x^2 - 8x + 16 = 0 \\)",
        "cat": 1
      },
      {
        "s": "\\( x^2 - 9x + 4 = 0 \\)",
        "s_ar": "\\( x^2 - 9x + 4 = 0 \\)",
        "cat": 0
      },
      {
        "s": "\\( x^2 + 4x + 19 = 0 \\)",
        "s_ar": "\\( x^2 + 4x + 19 = 0 \\)",
        "cat": 2
      },
      {
        "s": "\\( 4x^2 - 16x + 16 = 0 \\)",
        "s_ar": "\\( 4x^2 - 16x + 16 = 0 \\)",
        "cat": 1
      }
    ],
    "ex": "Compute Δ = b² − 4ac to classify each quadratic equation.",
    "ex_ar": "احسب قيمة المميز Δ = b² − 4ac لتصنيف كل معادلة تربيعية."
  }
];

D["edx-coord-geometry"] = [
  {
    "t": "qc",
    "ti": "Quick Check: Coordinate Geometry, Perpendicular Bisectors & Linear Programming",
    "ti_ar": "فحص سريع: الهندسة الإحداثية والمنصفات العمودية والبرمجة الخطية",
    "q": "What is the gradient of the perpendicular bisector of the line segment joining \\( A(1, 2) \\) and \\( B(5, 10) \\)?",
    "q_ar": "ما هو ميل المنصف العمودي للقطعة المستقيمة الواصلة بين \\( A(1, 2) \\) و \\( B(5, 10) \\)؟",
    "o": [
      "\\( -\\frac{1}{2} \\)",
      "\\( 2 \\)",
      "\\( \\frac{1}{2} \\)",
      "\\( -2 \\)"
    ],
    "o_ar": [
      "\\( -\\frac{1}{2} \\)",
      "\\( 2 \\)",
      "\\( \\frac{1}{2} \\)",
      "\\( -2 \\)"
    ],
    "a": 0,
    "ex": "The gradient of \\( AB \\) is \\( m_{AB} = \\frac{10 - 2}{5 - 1} = 2 \\), so the perpendicular gradient is \\( m_\\perp = -\\frac{1}{2} \\).",
    "ex_ar": "ميل القطعة \\( AB \\) هو \\( m_{AB} = \\frac{10 - 2}{5 - 1} = 2 \\)، وبالتالي ميل العمودي هو \\( -\\frac{1}{2} \\)."
  },
  {
    "t": "tf",
    "ti": "True / False: Core Theorems (Coordinate Geometry, Perpendicular Bisectors & Linear Programming)",
    "ti_ar": "صح / خطأ: النظريات الأساسية (الهندسة الإحداثية والمنصفات العمودية والبرمجة الخطية)",
    "items": [
      {
        "s": "Two non-vertical lines with gradients \\( m_1 \\) and \\( m_2 \\) are perpendicular if and only if \\( m_1 m_2 = -1 \\).",
        "a": true
      },
      {
        "s": "In Edexcel IGCSE diagrams, a strict inequality such as \\( y < 2x + 3 \\) is drawn with a dashed boundary line.",
        "a": true
      },
      {
        "s": "The midpoint of \\( (x_1, y_1) \\) and \\( (x_2, y_2) \\) is \\( \\left(\\frac{x_2 - x_1}{2}, \\frac{y_2 - y_1}{2}\\right) \\).",
        "a": false
      }
    ],
    "items_ar": [
      {
        "s": "يتعامد مستقيمان غير رأسيين ميلاهما \\( m_1 \\) و \\( m_2 \\) إذا وفقط إذا كان \\( m_1 m_2 = -1 \\).",
        "a": true
      },
      {
        "s": "في رسومات Edexcel IGCSE، تُمثّل المتباينة الصارمة مثل \\( y < 2x + 3 \\) بخط حدودي متقطع.",
        "a": true
      },
      {
        "s": "نقطة المنتصف بين نقطتين تُحسب بطرح الإحداثيات وقسمتها على 2.",
        "a": false
      }
    ]
  },
  {
    "t": "mt",
    "ti": "Matching: Identities & Principles (Coordinate Geometry, Perpendicular Bisectors & Linear Programming)",
    "ti_ar": "مطابقة: القوانين والمفاهيم (الهندسة الإحداثية والمنصفات العمودية والبرمجة الخطية)",
    "p": [
      {
        "l": "\\( m_1 = m_2 \\)",
        "r": "Parallel lines in the Cartesian plane"
      },
      {
        "l": "\\( m_1 m_2 = -1 \\)",
        "r": "Perpendicular lines meeting at \\( 90^\\circ \\)"
      },
      {
        "l": "\\( \\sqrt{(x_2-x_1)^2 + (y_2-y_1)^2} \\)",
        "r": "Exact Euclidean distance between two points"
      },
      {
        "l": "\\( y - y_1 = m(x - x_1) \\)",
        "r": "Point-gradient form of a straight line"
      }
    ],
    "p_ar": [
      {
        "l": "\\( m_1 = m_2 \\)",
        "r": "مستقيمان متوازيان في المستوى الإحداثي"
      },
      {
        "l": "\\( m_1 m_2 = -1 \\)",
        "r": "مستقيمان متعامدان بزاوية \\( 90^\\circ \\)"
      },
      {
        "l": "\\( \\sqrt{(x_2-x_1)^2 + (y_2-y_1)^2} \\)",
        "r": "المسافة الإقليدية الدقيقة بين نقطتين"
      },
      {
        "l": "\\( y - y_1 = m(x - x_1) \\)",
        "r": "صيغة الميل ونقطة لمعادلة المستقيم"
      }
    ]
  },
  {
    "t": "se",
    "ti": "Spot the Error: Algebraic & Domain Verification (Coordinate Geometry, Perpendicular Bisectors & Linear Programming)",
    "ti_ar": "اكتشف الخطأ: التحقق الجبري والمنطقي (الهندسة الإحداثية والمنصفات العمودية والبرمجة الخطية)",
    "q": "A student solves \\( \\sqrt{2x + 50} = x - 5 \\) step by step. Which step introduces an invalid conclusion?",
    "q_ar": "يحل طالب المعادلة \\( \\sqrt{2x + 50} = x - 5 \\) خطوة بخطوة. أي خطوة تتضمن استنتاجاً خاطئاً؟",
    "steps": [
      "Square both sides: \\( 2x + 50 = (x - 5)^2 \\).",
      "Expand the right-hand side: \\( 2x + 50 = x^2 - 10x + 25 \\).",
      "Rearrange and factor: \\( x^2 - 12x - 25 = 0 \\).",
      "Accept both roots without checking the non-negativity condition \\( x - 5 \\ge 0 \\)."
    ],
    "steps_ar": [
      "تربيع الطرفين: \\( 2x + 50 = (x - 5)^2 \\).",
      "فك المربع الكامل: \\( 2x + 50 = x^2 - 10x + 25 \\).",
      "إعادة الترتيب في الصورة القياسية: \\( x^2 - 12x - 25 = 0 \\).",
      "قبول الجذرين معاً دون التحقق من شرط عدم السالبية \\( x - 5 \\ge 0 \\)."
    ],
    "errorStep": 4,
    "reasons": [
      "The principal square root \\( \\sqrt{\\cdot} \\) is always non-negative, so any solution must satisfy \\( x - 5 \\ge 0 \\iff x \\ge 5 \\); the negative root is extraneous.",
      "Expanding \\( (x - 5)^2 \\) should not have a middle term.",
      "Squaring both sides is never allowed for radical equations."
    ],
    "reasons_ar": [
      "الجذر التربيعي الأساسي غير سالب دائماً، لذا يجب تحقق الشرط \\( x \\ge 5 \\) واستبعاد الجذر الدخيل السالب.",
      "فك المربع الكامل غير صحيح.",
      "لا يجوز تربيع الطرفين مطلقاً."
    ],
    "correctReason": 0,
    "h": "Check the sign of the right-hand side \\( x - 5 \\) for the negative root.",
    "h_ar": "تحقق من إشارة الطرف الأيمن \\( x - 5 \\) عند التعويض بالجذر السالب.",
    "sol": "Squaring introduces an extraneous root whenever \\( x - 5 < 0 \\). Only the root satisfying \\( x \\ge 5 \\) is valid.",
    "sol_ar": "التربيع يدخل جذراً دخيلاً يجعل الطرف الأيمن سالباً؛ يُقبل فقط الجذر الذي يحقق \\( x \\ge 5 \\)."
  },
  {
    "t": "ms",
    "ti": "Examiner Mode: Multi-Step Structured Problem (Coordinate Geometry, Perpendicular Bisectors & Linear Programming)",
    "ti_ar": "وضع المصحح: مسألة هيكلية متعددة الخطوات (الهندسة الإحداثية والمنصفات العمودية والبرمجة الخطية)",
    "q": "Consider \\( f(x) = x^2 - 10x + 29 \\) for \\( x \\ge 5 \\). (a) Express \\( f(x) \\) in completed-square vertex form and state its range. (b) Find \\( f^{-1}(x) \\) and state its domain.",
    "q_ar": "لتكن \\( f(x) = x^2 - 10x + 29 \\) حيث \\( x \\ge 5 \\). (أ) اكتب \\( f(x) \\) في صورة المربع الكامل وحدد مداها. (ب) أوجد \\( f^{-1}(x) \\) وحدد مجالها.",
    "parts": [
      {
        "label": "Part (a) — Completed Square & Range",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "Complete the square: \\( f(x) = (x - 5)^2 + 4 \\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "State exact range: \\( f(x) \\ge 4 \\)."
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
            "text": "Write \\( y = (x - 5)^2 + 4 \\implies (x - 5)^2 = y - 4 \\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "Select positive root (since \\( x \\ge 5 \\)): \\( f^{-1}(x) = 5 + \\sqrt{x - 4} \\)."
          },
          {
            "code": "B1",
            "marks": 1,
            "text": "State domain of \\( f^{-1} \\): \\( x \\ge 4 \\)."
          }
        ]
      }
    ],
    "examinerTip": "Always match the domain of \\( f^{-1} \\) to the range of \\( f \\), and use \\( x \\ge 5 \\) to select the positive branch of the square root.",
    "examinerTip_ar": "مجال الدالة العكسية \\( f^{-1} \\) هو مدى الدالة الأصلية \\( f \\)، ويُختار الجذر الموجب لأن \\( x \\ge 5 \\)."
  },
  {
    "t": "sb",
    "ti": "Step Builder: Guided Calculation (Coordinate Geometry, Perpendicular Bisectors & Linear Programming)",
    "ti_ar": "بناء الخطوات: حساب موجه خطوة بخطوة (الهندسة الإحداثية والمنصفات العمودية والبرمجة الخطية)",
    "steps": [
      {
        "l": "In \\( y = x^2 - 10x + 30 \\), halve the \\( x \\)-coefficient to write \\( (x - h)^2 \\) where \\( h = \\)",
        "a": "5",
        "h": "Divide 10 by 2."
      },
      {
        "l": "Find the minimum value \\( k = 30 - 5^2 = \\)",
        "a": "5",
        "h": "Subtract 25 from 30."
      },
      {
        "l": "Evaluate \\( y \\) when \\( x = 8 \\): \\( y = \\)",
        "a": "14",
        "h": "Calculate \\( 3^2 + 5 \\)."
      }
    ],
    "steps_ar": [
      {
        "l": "في الدالة \\( y = x^2 - 10x + 30 \\)، قيمة \\( h \\) في \\( (x - h)^2 \\) تساوي:",
        "a": "5",
        "h": "اقسم 10 على 2."
      },
      {
        "l": "أوجد القيمة الصغرى \\( k = 30 - 5^2 = \\)",
        "a": "5",
        "h": "اطرح 25 من 30."
      },
      {
        "l": "احسب قيمة \\( y \\) عندما \\( x = 8 \\):",
        "a": "14",
        "h": "احسب \\( 3^2 + 5 \\)."
      }
    ]
  },
  {
    "t": "num",
    "ti": "Numeric Entry: Coordinate Geometry, Perpendicular Bisectors & Linear Programming",
    "ti_ar": "إدخال رقمي: الهندسة الإحداثية والمنصفات العمودية والبرمجة الخطية",
    "q": "Find the exact distance between the points \\( P(-2, 1) \\) and \\( Q(6, 7) \\).",
    "q_ar": "أوجد المسافة الدقيقة بين النقطتين \\( P(-2, 1) \\) و \\( Q(6, 7) \\).",
    "a": 10,
    "h": "Compute \\( \\sqrt{(6 - (-2))^2 + (7 - 1)^2} \\).",
    "h_ar": "احسب \\( \\sqrt{(6 - (-2))^2 + (7 - 1)^2} \\).",
    "sol": "\\( d = \\sqrt{8^2 + 6^2} = \\sqrt{64 + 36} = \\sqrt{100} = 10 \\).",
    "sol_ar": "\\( d = \\sqrt{8^2 + 6^2} = \\sqrt{64 + 36} = \\sqrt{100} = 10 \\)."
  },
  {
    "t": "ord",
    "ti": "Order the Steps: Systematic Solution (Coordinate Geometry, Perpendicular Bisectors & Linear Programming)",
    "ti_ar": "رتّب الخطوات: خطوات الحل المنظم (الهندسة الإحداثية والمنصفات العمودية والبرمجة الخطية)",
    "prompt": "Arrange the logical steps in order to solve the intersection and tangency problem for \\( y = x^2 - 10x + 29 \\) and \\( y = 2x + k \\):",
    "prompt_ar": "رتب الخطوات المنطقية لحل مسألة التماس بين المنحنى \\( y = x^2 - 10x + 29 \\) والمستقيم \\( y = 2x + k \\):",
    "items": [
      "Equate the curve and line equations: \\( x^2 - 10x + 29 = 2x + k \\).",
      "Rearrange into standard quadratic form: \\( x^2 - 12x + (29 - k) = 0 \\).",
      "Set the discriminant \\( \\Delta = b^2 - 4ac = (-12)^2 - 4(1)(29 - k) = 0 \\) for tangency.",
      "Solve the resulting linear equation for the exact value of the parameter \\( k \\)."
    ],
    "items_ar": [
      "ساوِ معادلة المنحنى بمعادلة المستقيم: \\( x^2 - 10x + 29 = 2x + k \\).",
      "أعد الترتيب في الصورة القياسية: \\( x^2 - 12x + (29 - k) = 0 \\).",
      "ضع المميز مساوياً للصفر لشرط التماس: \\( \\Delta = (-12)^2 - 4(29 - k) = 0 \\).",
      "حل المعادلة الخطية الناتجة لإيجاد القيمة الدقيقة للثابت \\( k \\)."
    ],
    "ex": "Equate the two equations first, collect terms into ax² + bx + c = 0, then apply Δ = 0.",
    "ex_ar": "ساوِ المعادلتين أولاً، ثم رتب الحدود في الصورة القياسية، ثم طبق شرط التماس Δ = 0."
  },
  {
    "t": "cat",
    "ti": "Categorize: Mathematical Classification (Coordinate Geometry, Perpendicular Bisectors & Linear Programming)",
    "ti_ar": "تصنيف: التصنيف الرياضي (الهندسة الإحداثية والمنصفات العمودية والبرمجة الخطية)",
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
        "s": "\\( x^2 - 10x + 25 = 0 \\)",
        "s_ar": "\\( x^2 - 10x + 25 = 0 \\)",
        "cat": 1
      },
      {
        "s": "\\( x^2 - 11x + 5 = 0 \\)",
        "s_ar": "\\( x^2 - 11x + 5 = 0 \\)",
        "cat": 0
      },
      {
        "s": "\\( x^2 + 5x + 28 = 0 \\)",
        "s_ar": "\\( x^2 + 5x + 28 = 0 \\)",
        "cat": 2
      },
      {
        "s": "\\( 4x^2 - 20x + 25 = 0 \\)",
        "s_ar": "\\( 4x^2 - 20x + 25 = 0 \\)",
        "cat": 1
      }
    ],
    "ex": "Compute Δ = b² − 4ac to classify each quadratic equation.",
    "ex_ar": "احسب قيمة المميز Δ = b² − 4ac لتصنيف كل معادلة تربيعية."
  }
];

D["edx-geometry-circles"] = [
  {
    "t": "qc",
    "ti": "Quick Check: Circle Theorems, Intersecting Chords & Mensuration",
    "ti_ar": "فحص سريع: نظريات الدائرة والأوتار المتقاطعة وقياس الأشكال والمجسمات",
    "q": "Two chords \\( AB \\) and \\( CD \\) intersect internally at \\( P \\) inside a circle. Given \\( AP = 4\\text{ cm} \\), \\( PB = 9\\text{ cm} \\), and \\( CP = 3\\text{ cm} \\), find \\( PD \\).",
    "q_ar": "وتران \\( AB \\) و \\( CD \\) يتقاطعان داخلياً في النقطة \\( P \\) داخل دائرة. إذا كان \\( AP = 4 \\) و \\( PB = 9 \\) و \\( CP = 3 \\)، فأوجد \\( PD \\).",
    "o": [
      "\\( 12\\text{ cm} \\)",
      "\\( 6\\text{ cm} \\)",
      "\\( 10\\text{ cm} \\)",
      "\\( 15\\text{ cm} \\)"
    ],
    "o_ar": [
      "\\( 12\\text{ cm} \\)",
      "\\( 6\\text{ cm} \\)",
      "\\( 10\\text{ cm} \\)",
      "\\( 15\\text{ cm} \\)"
    ],
    "a": 0,
    "ex": "By the intersecting chords theorem, \\( AP \\cdot PB = CP \\cdot PD \\implies 4 \\times 9 = 3 \\times PD \\implies PD = 12\\text{ cm} \\).",
    "ex_ar": "من نظرية الأوتار المتقاطعة: \\( AP \\cdot PB = CP \\cdot PD \\implies 4 \\times 9 = 3 \\times PD \\implies PD = 12 \\)."
  },
  {
    "t": "tf",
    "ti": "True / False: Core Theorems (Circle Theorems, Intersecting Chords & Mensuration)",
    "ti_ar": "صح / خطأ: النظريات الأساسية (نظريات الدائرة والأوتار المتقاطعة وقياس الأشكال والمجسمات)",
    "items": [
      {
        "s": "By the Alternate Segment Theorem, the angle between a tangent and a chord equals the angle subtended by the chord in the alternate segment.",
        "a": true
      },
      {
        "s": "If two similar solids have linear scale factor \\( k \\), then the ratio of their volumes is \\( k^3 \\).",
        "a": true
      },
      {
        "s": "Opposite angles of a cyclic quadrilateral are always equal to each other.",
        "a": false
      }
    ],
    "items_ar": [
      {
        "s": "حسب نظرية القطعة المتبادلة، الزاوية بين المماس والوتر تساوي الزاوية المحيطية المرسومة على الوتر في الجهة المقابلة.",
        "a": true
      },
      {
        "s": "إذا كان معامل التشابه الخطي لمجسمين متشابهين هو \\( k \\)، فإن نسبة حجميهما هي \\( k^3 \\).",
        "a": true
      },
      {
        "s": "الزاويتان المتقابلتان في الشكل الرباعي الدائري متساويتان دائماً.",
        "a": false
      }
    ]
  },
  {
    "t": "mt",
    "ti": "Matching: Identities & Principles (Circle Theorems, Intersecting Chords & Mensuration)",
    "ti_ar": "مطابقة: القوانين والمفاهيم (نظريات الدائرة والأوتار المتقاطعة وقياس الأشكال والمجسمات)",
    "p": [
      {
        "l": "Tangent-Secant Theorem",
        "r": "\\( PT^2 = PA \\cdot PB \\)"
      },
      {
        "l": "Cyclic Quadrilateral",
        "r": "Opposite angles sum to \\( 180^\\circ \\)"
      },
      {
        "l": "Similar Solids (Linear Ratio \\( k \\))",
        "r": "Area ratio \\( k^2 \\), Volume ratio \\( k^3 \\)"
      },
      {
        "l": "Angle at the Centre",
        "r": "Twice the angle at the circumference on the same arc"
      }
    ],
    "p_ar": [
      {
        "l": "Tangent-Secant Theorem",
        "r": "\\( PT^2 = PA \\cdot PB \\)"
      },
      {
        "l": "Cyclic Quadrilateral",
        "r": "مجموع كل زاويتين متقابلتين \\( 180^\\circ \\)"
      },
      {
        "l": "Similar Solids (Linear Ratio \\( k \\))",
        "r": "نسبة المساحة \\( k^2 \\) ونسبة الحجم \\( k^3 \\)"
      },
      {
        "l": "Angle at the Centre",
        "r": "ضعف الزاوية المحيطية المشتركة معها في القوس"
      }
    ]
  },
  {
    "t": "se",
    "ti": "Spot the Error: Algebraic & Domain Verification (Circle Theorems, Intersecting Chords & Mensuration)",
    "ti_ar": "اكتشف الخطأ: التحقق الجبري والمنطقي (نظريات الدائرة والأوتار المتقاطعة وقياس الأشكال والمجسمات)",
    "q": "A student solves \\( \\sqrt{2x + 72} = x - 6 \\) step by step. Which step introduces an invalid conclusion?",
    "q_ar": "يحل طالب المعادلة \\( \\sqrt{2x + 72} = x - 6 \\) خطوة بخطوة. أي خطوة تتضمن استنتاجاً خاطئاً؟",
    "steps": [
      "Square both sides: \\( 2x + 72 = (x - 6)^2 \\).",
      "Expand the right-hand side: \\( 2x + 72 = x^2 - 12x + 36 \\).",
      "Rearrange and factor: \\( x^2 - 14x - 36 = 0 \\).",
      "Accept both roots without checking the non-negativity condition \\( x - 6 \\ge 0 \\)."
    ],
    "steps_ar": [
      "تربيع الطرفين: \\( 2x + 72 = (x - 6)^2 \\).",
      "فك المربع الكامل: \\( 2x + 72 = x^2 - 12x + 36 \\).",
      "إعادة الترتيب في الصورة القياسية: \\( x^2 - 14x - 36 = 0 \\).",
      "قبول الجذرين معاً دون التحقق من شرط عدم السالبية \\( x - 6 \\ge 0 \\)."
    ],
    "errorStep": 4,
    "reasons": [
      "The principal square root \\( \\sqrt{\\cdot} \\) is always non-negative, so any solution must satisfy \\( x - 6 \\ge 0 \\iff x \\ge 6 \\); the negative root is extraneous.",
      "Expanding \\( (x - 6)^2 \\) should not have a middle term.",
      "Squaring both sides is never allowed for radical equations."
    ],
    "reasons_ar": [
      "الجذر التربيعي الأساسي غير سالب دائماً، لذا يجب تحقق الشرط \\( x \\ge 6 \\) واستبعاد الجذر الدخيل السالب.",
      "فك المربع الكامل غير صحيح.",
      "لا يجوز تربيع الطرفين مطلقاً."
    ],
    "correctReason": 0,
    "h": "Check the sign of the right-hand side \\( x - 6 \\) for the negative root.",
    "h_ar": "تحقق من إشارة الطرف الأيمن \\( x - 6 \\) عند التعويض بالجذر السالب.",
    "sol": "Squaring introduces an extraneous root whenever \\( x - 6 < 0 \\). Only the root satisfying \\( x \\ge 6 \\) is valid.",
    "sol_ar": "التربيع يدخل جذراً دخيلاً يجعل الطرف الأيمن سالباً؛ يُقبل فقط الجذر الذي يحقق \\( x \\ge 6 \\)."
  },
  {
    "t": "ms",
    "ti": "Examiner Mode: Multi-Step Structured Problem (Circle Theorems, Intersecting Chords & Mensuration)",
    "ti_ar": "وضع المصحح: مسألة هيكلية متعددة الخطوات (نظريات الدائرة والأوتار المتقاطعة وقياس الأشكال والمجسمات)",
    "q": "Consider \\( f(x) = x^2 - 12x + 40 \\) for \\( x \\ge 6 \\). (a) Express \\( f(x) \\) in completed-square vertex form and state its range. (b) Find \\( f^{-1}(x) \\) and state its domain.",
    "q_ar": "لتكن \\( f(x) = x^2 - 12x + 40 \\) حيث \\( x \\ge 6 \\). (أ) اكتب \\( f(x) \\) في صورة المربع الكامل وحدد مداها. (ب) أوجد \\( f^{-1}(x) \\) وحدد مجالها.",
    "parts": [
      {
        "label": "Part (a) — Completed Square & Range",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "Complete the square: \\( f(x) = (x - 6)^2 + 4 \\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "State exact range: \\( f(x) \\ge 4 \\)."
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
            "text": "Write \\( y = (x - 6)^2 + 4 \\implies (x - 6)^2 = y - 4 \\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "Select positive root (since \\( x \\ge 6 \\)): \\( f^{-1}(x) = 6 + \\sqrt{x - 4} \\)."
          },
          {
            "code": "B1",
            "marks": 1,
            "text": "State domain of \\( f^{-1} \\): \\( x \\ge 4 \\)."
          }
        ]
      }
    ],
    "examinerTip": "Always match the domain of \\( f^{-1} \\) to the range of \\( f \\), and use \\( x \\ge 6 \\) to select the positive branch of the square root.",
    "examinerTip_ar": "مجال الدالة العكسية \\( f^{-1} \\) هو مدى الدالة الأصلية \\( f \\)، ويُختار الجذر الموجب لأن \\( x \\ge 6 \\)."
  },
  {
    "t": "sb",
    "ti": "Step Builder: Guided Calculation (Circle Theorems, Intersecting Chords & Mensuration)",
    "ti_ar": "بناء الخطوات: حساب موجه خطوة بخطوة (نظريات الدائرة والأوتار المتقاطعة وقياس الأشكال والمجسمات)",
    "steps": [
      {
        "l": "In \\( y = x^2 - 12x + 41 \\), halve the \\( x \\)-coefficient to write \\( (x - h)^2 \\) where \\( h = \\)",
        "a": "6",
        "h": "Divide 12 by 2."
      },
      {
        "l": "Find the minimum value \\( k = 41 - 6^2 = \\)",
        "a": "5",
        "h": "Subtract 36 from 41."
      },
      {
        "l": "Evaluate \\( y \\) when \\( x = 9 \\): \\( y = \\)",
        "a": "14",
        "h": "Calculate \\( 3^2 + 5 \\)."
      }
    ],
    "steps_ar": [
      {
        "l": "في الدالة \\( y = x^2 - 12x + 41 \\)، قيمة \\( h \\) في \\( (x - h)^2 \\) تساوي:",
        "a": "6",
        "h": "اقسم 12 على 2."
      },
      {
        "l": "أوجد القيمة الصغرى \\( k = 41 - 6^2 = \\)",
        "a": "5",
        "h": "اطرح 36 من 41."
      },
      {
        "l": "احسب قيمة \\( y \\) عندما \\( x = 9 \\):",
        "a": "14",
        "h": "احسب \\( 3^2 + 5 \\)."
      }
    ]
  },
  {
    "t": "num",
    "ti": "Numeric Entry: Circle Theorems, Intersecting Chords & Mensuration",
    "ti_ar": "إدخال رقمي: نظريات الدائرة والأوتار المتقاطعة وقياس الأشكال والمجسمات",
    "q": "From an external point \\( P \\), a tangent \\( PT \\) and a secant \\( PAB \\) are drawn to a circle. If \\( PA = 4\\text{ cm} \\) and \\( AB = 5\\text{ cm} \\), find the length of the tangent \\( PT \\) in cm.",
    "q_ar": "من نقطة خارجية \\( P \\)، رُسم مماس \\( PT \\) وقاطع \\( PAB \\) لدائرة. إذا كان \\( PA = 4 \\) و \\( AB = 5 \\)، فأوجد طول المماس \\( PT \\).",
    "a": 6,
    "h": "Note that \\( PB = PA + AB = 4 + 5 = 9 \\), then use \\( PT^2 = PA \\cdot PB \\).",
    "h_ar": "لاحظ أن \\( PB = PA + AB = 4 + 5 = 9 \\)، ثم طبق \\( PT^2 = PA \\cdot PB \\).",
    "sol": "\\( PT^2 = 4 \\times (4 + 5) = 4 \\times 9 = 36 \\implies PT = 6\\text{ cm} \\).",
    "sol_ar": "\\( PT^2 = 4 \\times (4 + 5) = 4 \\times 9 = 36 \\implies PT = 6\\text{ cm} \\)."
  },
  {
    "t": "ord",
    "ti": "Order the Steps: Systematic Solution (Circle Theorems, Intersecting Chords & Mensuration)",
    "ti_ar": "رتّب الخطوات: خطوات الحل المنظم (نظريات الدائرة والأوتار المتقاطعة وقياس الأشكال والمجسمات)",
    "prompt": "Arrange the logical steps in order to solve the intersection and tangency problem for \\( y = x^2 - 12x + 40 \\) and \\( y = 2x + k \\):",
    "prompt_ar": "رتب الخطوات المنطقية لحل مسألة التماس بين المنحنى \\( y = x^2 - 12x + 40 \\) والمستقيم \\( y = 2x + k \\):",
    "items": [
      "Equate the curve and line equations: \\( x^2 - 12x + 40 = 2x + k \\).",
      "Rearrange into standard quadratic form: \\( x^2 - 14x + (40 - k) = 0 \\).",
      "Set the discriminant \\( \\Delta = b^2 - 4ac = (-14)^2 - 4(1)(40 - k) = 0 \\) for tangency.",
      "Solve the resulting linear equation for the exact value of the parameter \\( k \\)."
    ],
    "items_ar": [
      "ساوِ معادلة المنحنى بمعادلة المستقيم: \\( x^2 - 12x + 40 = 2x + k \\).",
      "أعد الترتيب في الصورة القياسية: \\( x^2 - 14x + (40 - k) = 0 \\).",
      "ضع المميز مساوياً للصفر لشرط التماس: \\( \\Delta = (-14)^2 - 4(40 - k) = 0 \\).",
      "حل المعادلة الخطية الناتجة لإيجاد القيمة الدقيقة للثابت \\( k \\)."
    ],
    "ex": "Equate the two equations first, collect terms into ax² + bx + c = 0, then apply Δ = 0.",
    "ex_ar": "ساوِ المعادلتين أولاً، ثم رتب الحدود في الصورة القياسية، ثم طبق شرط التماس Δ = 0."
  },
  {
    "t": "cat",
    "ti": "Categorize: Mathematical Classification (Circle Theorems, Intersecting Chords & Mensuration)",
    "ti_ar": "تصنيف: التصنيف الرياضي (نظريات الدائرة والأوتار المتقاطعة وقياس الأشكال والمجسمات)",
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
        "s": "\\( x^2 - 12x + 36 = 0 \\)",
        "s_ar": "\\( x^2 - 12x + 36 = 0 \\)",
        "cat": 1
      },
      {
        "s": "\\( x^2 - 13x + 6 = 0 \\)",
        "s_ar": "\\( x^2 - 13x + 6 = 0 \\)",
        "cat": 0
      },
      {
        "s": "\\( x^2 + 6x + 39 = 0 \\)",
        "s_ar": "\\( x^2 + 6x + 39 = 0 \\)",
        "cat": 2
      },
      {
        "s": "\\( 4x^2 - 24x + 36 = 0 \\)",
        "s_ar": "\\( 4x^2 - 24x + 36 = 0 \\)",
        "cat": 1
      }
    ],
    "ex": "Compute Δ = b² − 4ac to classify each quadratic equation.",
    "ex_ar": "احسب قيمة المميز Δ = b² − 4ac لتصنيف كل معادلة تربيعية."
  }
];

D["edx-trig-3d-vectors"] = [
  {
    "t": "qc",
    "ti": "Quick Check: Sine & Cosine Rules, 3D Trigonometry & Vector Proofs",
    "ti_ar": "فحص سريع: قانونا الجيب وجيب التمام وحساب المثلثات ثلاثي الأبعاد والمتجهات",
    "q": "What is the length of the space diagonal of a rectangular box (cuboid) with dimensions \\( 3\\text{ cm} \\times 4\\text{ cm} \\times 12\\text{ cm} \\)?",
    "q_ar": "ما هو طول القطر الفراغي لمتوازي مستطيلات أبعاده \\( 3 \\times 4 \\times 12\\text{ cm} \\)؟",
    "o": [
      "\\( 13\\text{ cm} \\)",
      "\\( 15\\text{ cm} \\)",
      "\\( 17\\text{ cm} \\)",
      "\\( 19\\text{ cm} \\)"
    ],
    "o_ar": [
      "\\( 13\\text{ cm} \\)",
      "\\( 15\\text{ cm} \\)",
      "\\( 17\\text{ cm} \\)",
      "\\( 19\\text{ cm} \\)"
    ],
    "a": 0,
    "ex": "By 3D Pythagoras, \\( D = \\sqrt{3^2 + 4^2 + 12^2} = \\sqrt{9 + 16 + 144} = \\sqrt{169} = 13\\text{ cm} \\).",
    "ex_ar": "بتطبيق فيثاغورس ثلاثي الأبعاد: \\( D = \\sqrt{3^2 + 4^2 + 12^2} = \\sqrt{169} = 13 \\)."
  },
  {
    "t": "tf",
    "ti": "True / False: Core Theorems (Sine & Cosine Rules, 3D Trigonometry & Vector Proofs)",
    "ti_ar": "صح / خطأ: النظريات الأساسية (قانونا الجيب وجيب التمام وحساب المثلثات ثلاثي الأبعاد والمتجهات)",
    "items": [
      {
        "s": "The area of any triangle with sides \\( a, b \\) and included angle \\( C \\) is \\( \\frac{1}{2}ab\\sin C \\).",
        "a": true
      },
      {
        "s": "If \\( \\overrightarrow{AB} = k\\overrightarrow{BC} \\) for a non-zero scalar \\( k \\), then points \\( A, B, C \\) are collinear.",
        "a": true
      },
      {
        "s": "In the Cosine Rule \\( c^2 = a^2 + b^2 - 2ab\\cos C \\), if \\( C \\) is obtuse (\\( 90^\\circ < C < 180^\\circ \\)), then \\( \\cos C \\) is positive.",
        "a": false
      }
    ],
    "items_ar": [
      {
        "s": "مساحة أي مثلث علم فيه ضلعان \\( a, b \\) والزاوية المحصورة \\( C \\) هي \\( \\frac{1}{2}ab\\sin C \\).",
        "a": true
      },
      {
        "s": "إذا كان \\( \\overrightarrow{AB} = k\\overrightarrow{BC} \\) لثابت غير صفري \\( k \\)، فإن النقاط \\( A, B, C \\) تقع على استقامة واحدة.",
        "a": true
      },
      {
        "s": "في قانون جيب التمام، إذا كانت الزاوية \\( C \\) منفرجة فإن \\( \\cos C \\) يكون موجباً.",
        "a": false
      }
    ]
  },
  {
    "t": "mt",
    "ti": "Matching: Identities & Principles (Sine & Cosine Rules, 3D Trigonometry & Vector Proofs)",
    "ti_ar": "مطابقة: القوانين والمفاهيم (قانونا الجيب وجيب التمام وحساب المثلثات ثلاثي الأبعاد والمتجهات)",
    "p": [
      {
        "l": "\\( c^2 = a^2 + b^2 - 2ab\\cos C \\)",
        "r": "Cosine Rule for side length (SAS) or angle (SSS)"
      },
      {
        "l": "\\( \\frac{a}{\\sin A} = \\frac{b}{\\sin B} \\)",
        "r": "Sine Rule for matching opposite side-angle pairs"
      },
      {
        "l": "\\( \\overrightarrow{AB} = \\mathbf{b} - \\mathbf{a} \\)",
        "r": "Displacement vector from position vectors"
      },
      {
        "l": "\\( \\tan\\theta = \\frac{h}{\\sqrt{l^2 + w^2}} \\)",
        "r": "Angle between space diagonal and horizontal base"
      }
    ],
    "p_ar": [
      {
        "l": "\\( c^2 = a^2 + b^2 - 2ab\\cos C \\)",
        "r": "قانون جيب التمام لإيجاد ضلع أو زاوية"
      },
      {
        "l": "\\( \\frac{a}{\\sin A} = \\frac{b}{\\sin B} \\)",
        "r": "قانون الجيب للأضلاع والزوايا المتقابلة"
      },
      {
        "l": "\\( \\overrightarrow{AB} = \\mathbf{b} - \\mathbf{a} \\)",
        "r": "متجه الإزاحة بدلالة متجهي الموضع"
      },
      {
        "l": "\\( \\tan\\theta = \\frac{h}{\\sqrt{l^2 + w^2}} \\)",
        "r": "الزاوية بين القطر الفراغي والقاعدة الأفقية"
      }
    ]
  },
  {
    "t": "se",
    "ti": "Spot the Error: Algebraic & Domain Verification (Sine & Cosine Rules, 3D Trigonometry & Vector Proofs)",
    "ti_ar": "اكتشف الخطأ: التحقق الجبري والمنطقي (قانونا الجيب وجيب التمام وحساب المثلثات ثلاثي الأبعاد والمتجهات)",
    "q": "A student solves \\( \\sqrt{2x + 98} = x - 7 \\) step by step. Which step introduces an invalid conclusion?",
    "q_ar": "يحل طالب المعادلة \\( \\sqrt{2x + 98} = x - 7 \\) خطوة بخطوة. أي خطوة تتضمن استنتاجاً خاطئاً؟",
    "steps": [
      "Square both sides: \\( 2x + 98 = (x - 7)^2 \\).",
      "Expand the right-hand side: \\( 2x + 98 = x^2 - 14x + 49 \\).",
      "Rearrange and factor: \\( x^2 - 16x - 49 = 0 \\).",
      "Accept both roots without checking the non-negativity condition \\( x - 7 \\ge 0 \\)."
    ],
    "steps_ar": [
      "تربيع الطرفين: \\( 2x + 98 = (x - 7)^2 \\).",
      "فك المربع الكامل: \\( 2x + 98 = x^2 - 14x + 49 \\).",
      "إعادة الترتيب في الصورة القياسية: \\( x^2 - 16x - 49 = 0 \\).",
      "قبول الجذرين معاً دون التحقق من شرط عدم السالبية \\( x - 7 \\ge 0 \\)."
    ],
    "errorStep": 4,
    "reasons": [
      "The principal square root \\( \\sqrt{\\cdot} \\) is always non-negative, so any solution must satisfy \\( x - 7 \\ge 0 \\iff x \\ge 7 \\); the negative root is extraneous.",
      "Expanding \\( (x - 7)^2 \\) should not have a middle term.",
      "Squaring both sides is never allowed for radical equations."
    ],
    "reasons_ar": [
      "الجذر التربيعي الأساسي غير سالب دائماً، لذا يجب تحقق الشرط \\( x \\ge 7 \\) واستبعاد الجذر الدخيل السالب.",
      "فك المربع الكامل غير صحيح.",
      "لا يجوز تربيع الطرفين مطلقاً."
    ],
    "correctReason": 0,
    "h": "Check the sign of the right-hand side \\( x - 7 \\) for the negative root.",
    "h_ar": "تحقق من إشارة الطرف الأيمن \\( x - 7 \\) عند التعويض بالجذر السالب.",
    "sol": "Squaring introduces an extraneous root whenever \\( x - 7 < 0 \\). Only the root satisfying \\( x \\ge 7 \\) is valid.",
    "sol_ar": "التربيع يدخل جذراً دخيلاً يجعل الطرف الأيمن سالباً؛ يُقبل فقط الجذر الذي يحقق \\( x \\ge 7 \\)."
  },
  {
    "t": "ms",
    "ti": "Examiner Mode: Multi-Step Structured Problem (Sine & Cosine Rules, 3D Trigonometry & Vector Proofs)",
    "ti_ar": "وضع المصحح: مسألة هيكلية متعددة الخطوات (قانونا الجيب وجيب التمام وحساب المثلثات ثلاثي الأبعاد والمتجهات)",
    "q": "Consider \\( f(x) = x^2 - 14x + 53 \\) for \\( x \\ge 7 \\). (a) Express \\( f(x) \\) in completed-square vertex form and state its range. (b) Find \\( f^{-1}(x) \\) and state its domain.",
    "q_ar": "لتكن \\( f(x) = x^2 - 14x + 53 \\) حيث \\( x \\ge 7 \\). (أ) اكتب \\( f(x) \\) في صورة المربع الكامل وحدد مداها. (ب) أوجد \\( f^{-1}(x) \\) وحدد مجالها.",
    "parts": [
      {
        "label": "Part (a) — Completed Square & Range",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "Complete the square: \\( f(x) = (x - 7)^2 + 4 \\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "State exact range: \\( f(x) \\ge 4 \\)."
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
            "text": "Write \\( y = (x - 7)^2 + 4 \\implies (x - 7)^2 = y - 4 \\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "Select positive root (since \\( x \\ge 7 \\)): \\( f^{-1}(x) = 7 + \\sqrt{x - 4} \\)."
          },
          {
            "code": "B1",
            "marks": 1,
            "text": "State domain of \\( f^{-1} \\): \\( x \\ge 4 \\)."
          }
        ]
      }
    ],
    "examinerTip": "Always match the domain of \\( f^{-1} \\) to the range of \\( f \\), and use \\( x \\ge 7 \\) to select the positive branch of the square root.",
    "examinerTip_ar": "مجال الدالة العكسية \\( f^{-1} \\) هو مدى الدالة الأصلية \\( f \\)، ويُختار الجذر الموجب لأن \\( x \\ge 7 \\)."
  },
  {
    "t": "sb",
    "ti": "Step Builder: Guided Calculation (Sine & Cosine Rules, 3D Trigonometry & Vector Proofs)",
    "ti_ar": "بناء الخطوات: حساب موجه خطوة بخطوة (قانونا الجيب وجيب التمام وحساب المثلثات ثلاثي الأبعاد والمتجهات)",
    "steps": [
      {
        "l": "In \\( y = x^2 - 14x + 54 \\), halve the \\( x \\)-coefficient to write \\( (x - h)^2 \\) where \\( h = \\)",
        "a": "7",
        "h": "Divide 14 by 2."
      },
      {
        "l": "Find the minimum value \\( k = 54 - 7^2 = \\)",
        "a": "5",
        "h": "Subtract 49 from 54."
      },
      {
        "l": "Evaluate \\( y \\) when \\( x = 10 \\): \\( y = \\)",
        "a": "14",
        "h": "Calculate \\( 3^2 + 5 \\)."
      }
    ],
    "steps_ar": [
      {
        "l": "في الدالة \\( y = x^2 - 14x + 54 \\)، قيمة \\( h \\) في \\( (x - h)^2 \\) تساوي:",
        "a": "7",
        "h": "اقسم 14 على 2."
      },
      {
        "l": "أوجد القيمة الصغرى \\( k = 54 - 7^2 = \\)",
        "a": "5",
        "h": "اطرح 49 من 54."
      },
      {
        "l": "احسب قيمة \\( y \\) عندما \\( x = 10 \\):",
        "a": "14",
        "h": "احسب \\( 3^2 + 5 \\)."
      }
    ]
  },
  {
    "t": "num",
    "ti": "Numeric Entry: Sine & Cosine Rules, 3D Trigonometry & Vector Proofs",
    "ti_ar": "إدخال رقمي: قانونا الجيب وجيب التمام وحساب المثلثات ثلاثي الأبعاد والمتجهات",
    "q": "Find the area (in \\( \\text{cm}^2 \\)) of a triangle with sides \\( a = 8\\text{ cm} \\), \\( b = 10\\text{ cm} \\), and included angle \\( C = 30^\\circ \\).",
    "q_ar": "أوجد مساحة مثلث (بوحدة \\( \\text{cm}^2 \\)) طول ضلعين فيه \\( 8 \\) و \\( 10 \\) والزاوية المحصورة بينهما \\( 30^\\circ \\).",
    "a": 20,
    "h": "Use \\( \\text{Area} = \\frac{1}{2}ab\\sin C \\) with \\( \\sin 30^\\circ = 0.5 \\).",
    "h_ar": "استخدم \\( \\text{Area} = \\frac{1}{2}ab\\sin C \\) مع \\( \\sin 30^\\circ = 0.5 \\).",
    "sol": "\\( \\text{Area} = \\frac{1}{2} \\times 8 \\times 10 \\times \\sin 30^\\circ = 40 \\times 0.5 = 20\\text{ cm}^2 \\).",
    "sol_ar": "\\( \\text{Area} = \\frac{1}{2} \\times 8 \\times 10 \\times \\sin 30^\\circ = 40 \\times 0.5 = 20\\text{ cm}^2 \\)."
  },
  {
    "t": "ord",
    "ti": "Order the Steps: Systematic Solution (Sine & Cosine Rules, 3D Trigonometry & Vector Proofs)",
    "ti_ar": "رتّب الخطوات: خطوات الحل المنظم (قانونا الجيب وجيب التمام وحساب المثلثات ثلاثي الأبعاد والمتجهات)",
    "prompt": "Arrange the logical steps in order to solve the intersection and tangency problem for \\( y = x^2 - 14x + 53 \\) and \\( y = 2x + k \\):",
    "prompt_ar": "رتب الخطوات المنطقية لحل مسألة التماس بين المنحنى \\( y = x^2 - 14x + 53 \\) والمستقيم \\( y = 2x + k \\):",
    "items": [
      "Equate the curve and line equations: \\( x^2 - 14x + 53 = 2x + k \\).",
      "Rearrange into standard quadratic form: \\( x^2 - 16x + (53 - k) = 0 \\).",
      "Set the discriminant \\( \\Delta = b^2 - 4ac = (-16)^2 - 4(1)(53 - k) = 0 \\) for tangency.",
      "Solve the resulting linear equation for the exact value of the parameter \\( k \\)."
    ],
    "items_ar": [
      "ساوِ معادلة المنحنى بمعادلة المستقيم: \\( x^2 - 14x + 53 = 2x + k \\).",
      "أعد الترتيب في الصورة القياسية: \\( x^2 - 16x + (53 - k) = 0 \\).",
      "ضع المميز مساوياً للصفر لشرط التماس: \\( \\Delta = (-16)^2 - 4(53 - k) = 0 \\).",
      "حل المعادلة الخطية الناتجة لإيجاد القيمة الدقيقة للثابت \\( k \\)."
    ],
    "ex": "Equate the two equations first, collect terms into ax² + bx + c = 0, then apply Δ = 0.",
    "ex_ar": "ساوِ المعادلتين أولاً، ثم رتب الحدود في الصورة القياسية، ثم طبق شرط التماس Δ = 0."
  },
  {
    "t": "cat",
    "ti": "Categorize: Mathematical Classification (Sine & Cosine Rules, 3D Trigonometry & Vector Proofs)",
    "ti_ar": "تصنيف: التصنيف الرياضي (قانونا الجيب وجيب التمام وحساب المثلثات ثلاثي الأبعاد والمتجهات)",
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
        "s": "\\( x^2 - 14x + 49 = 0 \\)",
        "s_ar": "\\( x^2 - 14x + 49 = 0 \\)",
        "cat": 1
      },
      {
        "s": "\\( x^2 - 15x + 7 = 0 \\)",
        "s_ar": "\\( x^2 - 15x + 7 = 0 \\)",
        "cat": 0
      },
      {
        "s": "\\( x^2 + 7x + 52 = 0 \\)",
        "s_ar": "\\( x^2 + 7x + 52 = 0 \\)",
        "cat": 2
      },
      {
        "s": "\\( 4x^2 - 28x + 49 = 0 \\)",
        "s_ar": "\\( 4x^2 - 28x + 49 = 0 \\)",
        "cat": 1
      }
    ],
    "ex": "Compute Δ = b² − 4ac to classify each quadratic equation.",
    "ex_ar": "احسب قيمة المميز Δ = b² − 4ac لتصنيف كل معادلة تربيعية."
  }
];

D["edx-calculus-kinematics"] = [
  {
    "t": "qc",
    "ti": "Quick Check: Differentiation, Stationary Points & Kinematics",
    "ti_ar": "فحص سريع: التفاضل والنقاط الحرجة وتطبيقات الحركة (الكينماتيكا)",
    "q": "A particle moves along a straight line with displacement \\( s(t) = t^3 - 6t^2 + 9t + 2 \\) metres at time \\( t \\ge 0 \\) seconds. At what times is the particle instantaneously at rest?",
    "q_ar": "يتحرك جسيم في خط مستقيم بحيث إزاحته \\( s(t) = t^3 - 6t^2 + 9t + 2 \\) متر عند الزمن \\( t \\ge 0 \\). متى يسكن الجسيم لحظياً؟",
    "o": [
      "\\( t = 1\\text{ s} \\) and \\( t = 3\\text{ s} \\)",
      "\\( t = 2\\text{ s} \\) only",
      "\\( t = 0\\text{ s} \\) and \\( t = 6\\text{ s} \\)",
      "\\( t = 3\\text{ s} \\) only"
    ],
    "o_ar": [
      "\\( t = 1\\text{ s} \\) and \\( t = 3\\text{ s} \\)",
      "\\( t = 2\\text{ s} \\) only",
      "\\( t = 0\\text{ s} \\) and \\( t = 6\\text{ s} \\)",
      "\\( t = 3\\text{ s} \\) only"
    ],
    "a": 0,
    "ex": "Set velocity \\( v(t) = \\frac{ds}{dt} = 3t^2 - 12t + 9 = 3(t - 1)(t - 3) = 0 \\implies t = 1\\text{ s}, 3\\text{ s} \\).",
    "ex_ar": "بوضع السرعة \\( v(t) = \\frac{ds}{dt} = 3t^2 - 12t + 9 = 3(t - 1)(t - 3) = 0 \\) نجد \\( t = 1, 3 \\)."
  },
  {
    "t": "tf",
    "ti": "True / False: Core Theorems (Differentiation, Stationary Points & Kinematics)",
    "ti_ar": "صح / خطأ: النظريات الأساسية (التفاضل والنقاط الحرجة وتطبيقات الحركة (الكينماتيكا))",
    "items": [
      {
        "s": "If \\( \\frac{dy}{dx} = 0 \\) and \\( \\frac{d^2y}{dx^2} < 0 \\) at \\( x = x_0 \\), then the curve has a local maximum at \\( x = x_0 \\).",
        "a": true
      },
      {
        "s": "Instantaneous acceleration \\( a(t) \\) is the derivative of velocity \\( \\frac{dv}{dt} \\), which equals \\( \\frac{d^2s}{dt^2} \\).",
        "a": true
      },
      {
        "s": "The derivative of \\( y = \\frac{4}{x^2} \\) with respect to \\( x \\) is \\( \\frac{dy}{dx} = \\frac{4}{2x} \\).",
        "a": false
      }
    ],
    "items_ar": [
      {
        "s": "إذا كان \\( \\frac{dy}{dx} = 0 \\) و \\( \\frac{d^2y}{dx^2} < 0 \\) عند \\( x_0 \\)، فإن للمنحنى نهاية عظمى محلية عند \\( x_0 \\).",
        "a": true
      },
      {
        "s": "العجلة اللحظية \\( a(t) \\) هي مشتقة السرعة \\( \\frac{dv}{dt} \\) وتساوي المشتقة الثانية للإزاحة \\( \\frac{d^2s}{dt^2} \\).",
        "a": true
      },
      {
        "s": "مشتقة الدالة \\( y = \\frac{4}{x^2} \\) بالنسبة إلى \\( x \\) هي \\( \\frac{4}{2x} \\).",
        "a": false
      }
    ]
  },
  {
    "t": "mt",
    "ti": "Matching: Identities & Principles (Differentiation, Stationary Points & Kinematics)",
    "ti_ar": "مطابقة: القوانين والمفاهيم (التفاضل والنقاط الحرجة وتطبيقات الحركة (الكينماتيكا))",
    "p": [
      {
        "l": "\\( \\frac{d}{dx}(ax^n) \\)",
        "r": "\\( nax^{n-1} \\) (Power rule of differentiation)"
      },
      {
        "l": "\\( v(t) = \\frac{ds}{dt} = 0 \\)",
        "r": "Particle is instantaneously at rest"
      },
      {
        "l": "\\( \\frac{d^2y}{dx^2} > 0 \\) at stationary point",
        "r": "Local minimum turning point"
      },
      {
        "l": "\\( a(t) = \\frac{dv}{dt} \\)",
        "r": "Instantaneous rate of change of velocity"
      }
    ],
    "p_ar": [
      {
        "l": "\\( \\frac{d}{dx}(ax^n) \\)",
        "r": "\\( nax^{n-1} \\) (قاعدة القوى في الاشتقاق)"
      },
      {
        "l": "\\( v(t) = \\frac{ds}{dt} = 0 \\)",
        "r": "الجسيم في حالة سكون لحظي"
      },
      {
        "l": "\\( \\frac{d^2y}{dx^2} > 0 \\) at stationary point",
        "r": "نقطة حرجة صغرى محلية"
      },
      {
        "l": "\\( a(t) = \\frac{dv}{dt} \\)",
        "r": "معدل التغير اللحظي للسرعة (التسارع)"
      }
    ]
  },
  {
    "t": "se",
    "ti": "Spot the Error: Algebraic & Domain Verification (Differentiation, Stationary Points & Kinematics)",
    "ti_ar": "اكتشف الخطأ: التحقق الجبري والمنطقي (التفاضل والنقاط الحرجة وتطبيقات الحركة (الكينماتيكا))",
    "q": "A student solves \\( \\sqrt{2x + 128} = x - 8 \\) step by step. Which step introduces an invalid conclusion?",
    "q_ar": "يحل طالب المعادلة \\( \\sqrt{2x + 128} = x - 8 \\) خطوة بخطوة. أي خطوة تتضمن استنتاجاً خاطئاً؟",
    "steps": [
      "Square both sides: \\( 2x + 128 = (x - 8)^2 \\).",
      "Expand the right-hand side: \\( 2x + 128 = x^2 - 16x + 64 \\).",
      "Rearrange and factor: \\( x^2 - 18x - 64 = 0 \\).",
      "Accept both roots without checking the non-negativity condition \\( x - 8 \\ge 0 \\)."
    ],
    "steps_ar": [
      "تربيع الطرفين: \\( 2x + 128 = (x - 8)^2 \\).",
      "فك المربع الكامل: \\( 2x + 128 = x^2 - 16x + 64 \\).",
      "إعادة الترتيب في الصورة القياسية: \\( x^2 - 18x - 64 = 0 \\).",
      "قبول الجذرين معاً دون التحقق من شرط عدم السالبية \\( x - 8 \\ge 0 \\)."
    ],
    "errorStep": 4,
    "reasons": [
      "The principal square root \\( \\sqrt{\\cdot} \\) is always non-negative, so any solution must satisfy \\( x - 8 \\ge 0 \\iff x \\ge 8 \\); the negative root is extraneous.",
      "Expanding \\( (x - 8)^2 \\) should not have a middle term.",
      "Squaring both sides is never allowed for radical equations."
    ],
    "reasons_ar": [
      "الجذر التربيعي الأساسي غير سالب دائماً، لذا يجب تحقق الشرط \\( x \\ge 8 \\) واستبعاد الجذر الدخيل السالب.",
      "فك المربع الكامل غير صحيح.",
      "لا يجوز تربيع الطرفين مطلقاً."
    ],
    "correctReason": 0,
    "h": "Check the sign of the right-hand side \\( x - 8 \\) for the negative root.",
    "h_ar": "تحقق من إشارة الطرف الأيمن \\( x - 8 \\) عند التعويض بالجذر السالب.",
    "sol": "Squaring introduces an extraneous root whenever \\( x - 8 < 0 \\). Only the root satisfying \\( x \\ge 8 \\) is valid.",
    "sol_ar": "التربيع يدخل جذراً دخيلاً يجعل الطرف الأيمن سالباً؛ يُقبل فقط الجذر الذي يحقق \\( x \\ge 8 \\)."
  },
  {
    "t": "ms",
    "ti": "Examiner Mode: Multi-Step Structured Problem (Differentiation, Stationary Points & Kinematics)",
    "ti_ar": "وضع المصحح: مسألة هيكلية متعددة الخطوات (التفاضل والنقاط الحرجة وتطبيقات الحركة (الكينماتيكا))",
    "q": "Consider \\( f(x) = x^2 - 16x + 68 \\) for \\( x \\ge 8 \\). (a) Express \\( f(x) \\) in completed-square vertex form and state its range. (b) Find \\( f^{-1}(x) \\) and state its domain.",
    "q_ar": "لتكن \\( f(x) = x^2 - 16x + 68 \\) حيث \\( x \\ge 8 \\). (أ) اكتب \\( f(x) \\) في صورة المربع الكامل وحدد مداها. (ب) أوجد \\( f^{-1}(x) \\) وحدد مجالها.",
    "parts": [
      {
        "label": "Part (a) — Completed Square & Range",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "Complete the square: \\( f(x) = (x - 8)^2 + 4 \\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "State exact range: \\( f(x) \\ge 4 \\)."
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
            "text": "Write \\( y = (x - 8)^2 + 4 \\implies (x - 8)^2 = y - 4 \\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "Select positive root (since \\( x \\ge 8 \\)): \\( f^{-1}(x) = 8 + \\sqrt{x - 4} \\)."
          },
          {
            "code": "B1",
            "marks": 1,
            "text": "State domain of \\( f^{-1} \\): \\( x \\ge 4 \\)."
          }
        ]
      }
    ],
    "examinerTip": "Always match the domain of \\( f^{-1} \\) to the range of \\( f \\), and use \\( x \\ge 8 \\) to select the positive branch of the square root.",
    "examinerTip_ar": "مجال الدالة العكسية \\( f^{-1} \\) هو مدى الدالة الأصلية \\( f \\)، ويُختار الجذر الموجب لأن \\( x \\ge 8 \\)."
  },
  {
    "t": "sb",
    "ti": "Step Builder: Guided Calculation (Differentiation, Stationary Points & Kinematics)",
    "ti_ar": "بناء الخطوات: حساب موجه خطوة بخطوة (التفاضل والنقاط الحرجة وتطبيقات الحركة (الكينماتيكا))",
    "steps": [
      {
        "l": "In \\( y = x^2 - 16x + 69 \\), halve the \\( x \\)-coefficient to write \\( (x - h)^2 \\) where \\( h = \\)",
        "a": "8",
        "h": "Divide 16 by 2."
      },
      {
        "l": "Find the minimum value \\( k = 69 - 8^2 = \\)",
        "a": "5",
        "h": "Subtract 64 from 69."
      },
      {
        "l": "Evaluate \\( y \\) when \\( x = 11 \\): \\( y = \\)",
        "a": "14",
        "h": "Calculate \\( 3^2 + 5 \\)."
      }
    ],
    "steps_ar": [
      {
        "l": "في الدالة \\( y = x^2 - 16x + 69 \\)، قيمة \\( h \\) في \\( (x - h)^2 \\) تساوي:",
        "a": "8",
        "h": "اقسم 16 على 2."
      },
      {
        "l": "أوجد القيمة الصغرى \\( k = 69 - 8^2 = \\)",
        "a": "5",
        "h": "اطرح 64 من 69."
      },
      {
        "l": "احسب قيمة \\( y \\) عندما \\( x = 11 \\):",
        "a": "14",
        "h": "احسب \\( 3^2 + 5 \\)."
      }
    ]
  },
  {
    "t": "num",
    "ti": "Numeric Entry: Differentiation, Stationary Points & Kinematics",
    "ti_ar": "إدخال رقمي: التفاضل والنقاط الحرجة وتطبيقات الحركة (الكينماتيكا)",
    "q": "Find the gradient of the curve \\( y = 2x^3 - 5x + 4 \\) at the point where \\( x = 2 \\).",
    "q_ar": "أوجد ميل المنحنى \\( y = 2x^3 - 5x + 4 \\) عند النقطة التي فيها \\( x = 2 \\).",
    "a": 19,
    "h": "Differentiate \\( \\frac{dy}{dx} = 6x^2 - 5 \\) and substitute \\( x = 2 \\).",
    "h_ar": "اشتق \\( \\frac{dy}{dx} = 6x^2 - 5 \\) ثم عوّض عن \\( x = 2 \\).",
    "sol": "At \\( x = 2 \\), \\( \\frac{dy}{dx} = 6(2)^2 - 5 = 24 - 5 = 19 \\).",
    "sol_ar": "At \\( x = 2 \\), \\( \\frac{dy}{dx} = 6(2)^2 - 5 = 24 - 5 = 19 \\)."
  },
  {
    "t": "ord",
    "ti": "Order the Steps: Systematic Solution (Differentiation, Stationary Points & Kinematics)",
    "ti_ar": "رتّب الخطوات: خطوات الحل المنظم (التفاضل والنقاط الحرجة وتطبيقات الحركة (الكينماتيكا))",
    "prompt": "Arrange the logical steps in order to solve the intersection and tangency problem for \\( y = x^2 - 16x + 68 \\) and \\( y = 2x + k \\):",
    "prompt_ar": "رتب الخطوات المنطقية لحل مسألة التماس بين المنحنى \\( y = x^2 - 16x + 68 \\) والمستقيم \\( y = 2x + k \\):",
    "items": [
      "Equate the curve and line equations: \\( x^2 - 16x + 68 = 2x + k \\).",
      "Rearrange into standard quadratic form: \\( x^2 - 18x + (68 - k) = 0 \\).",
      "Set the discriminant \\( \\Delta = b^2 - 4ac = (-18)^2 - 4(1)(68 - k) = 0 \\) for tangency.",
      "Solve the resulting linear equation for the exact value of the parameter \\( k \\)."
    ],
    "items_ar": [
      "ساوِ معادلة المنحنى بمعادلة المستقيم: \\( x^2 - 16x + 68 = 2x + k \\).",
      "أعد الترتيب في الصورة القياسية: \\( x^2 - 18x + (68 - k) = 0 \\).",
      "ضع المميز مساوياً للصفر لشرط التماس: \\( \\Delta = (-18)^2 - 4(68 - k) = 0 \\).",
      "حل المعادلة الخطية الناتجة لإيجاد القيمة الدقيقة للثابت \\( k \\)."
    ],
    "ex": "Equate the two equations first, collect terms into ax² + bx + c = 0, then apply Δ = 0.",
    "ex_ar": "ساوِ المعادلتين أولاً، ثم رتب الحدود في الصورة القياسية، ثم طبق شرط التماس Δ = 0."
  },
  {
    "t": "cat",
    "ti": "Categorize: Mathematical Classification (Differentiation, Stationary Points & Kinematics)",
    "ti_ar": "تصنيف: التصنيف الرياضي (التفاضل والنقاط الحرجة وتطبيقات الحركة (الكينماتيكا))",
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
        "s": "\\( x^2 - 16x + 64 = 0 \\)",
        "s_ar": "\\( x^2 - 16x + 64 = 0 \\)",
        "cat": 1
      },
      {
        "s": "\\( x^2 - 17x + 8 = 0 \\)",
        "s_ar": "\\( x^2 - 17x + 8 = 0 \\)",
        "cat": 0
      },
      {
        "s": "\\( x^2 + 8x + 67 = 0 \\)",
        "s_ar": "\\( x^2 + 8x + 67 = 0 \\)",
        "cat": 2
      },
      {
        "s": "\\( 4x^2 - 32x + 64 = 0 \\)",
        "s_ar": "\\( 4x^2 - 32x + 64 = 0 \\)",
        "cat": 1
      }
    ],
    "ex": "Compute Δ = b² − 4ac to classify each quadratic equation.",
    "ex_ar": "احسب قيمة المميز Δ = b² − 4ac لتصنيف كل معادلة تربيعية."
  }
];

D["edx-stats-probability"] = [
  {
    "t": "qc",
    "ti": "Quick Check: Histograms, Cumulative Frequency & Conditional Probability",
    "ti_ar": "فحص سريع: المدرجات التكرارية والتكرار المتجمع والاحتمال الشرطي",
    "q": "In a histogram with unequal class intervals, a class \\( 20 < t \\le 35 \\) has frequency \\( 45 \\). What is its Frequency Density?",
    "q_ar": "في مدرج تكراري غير متساوي الفئات، الفئة \\( 20 < t \\le 35 \\) تكرارها \\( 45 \\). ما هي كثافة التكرار لها؟",
    "o": [
      "\\( 3 \\)",
      "\\( 2.25 \\)",
      "\\( 15 \\)",
      "\\( 675 \\)"
    ],
    "o_ar": [
      "\\( 3 \\)",
      "\\( 2.25 \\)",
      "\\( 15 \\)",
      "\\( 675 \\)"
    ],
    "a": 0,
    "ex": "Class width is \\( 35 - 20 = 15 \\), so \\( \\text{Frequency Density} = \\frac{45}{15} = 3 \\).",
    "ex_ar": "طول الفئة هو \\( 35 - 20 = 15 \\)، وبالتالي كثافة التكرار \\( = \\frac{45}{15} = 3 \\)."
  },
  {
    "t": "tf",
    "ti": "True / False: Core Theorems (Histograms, Cumulative Frequency & Conditional Probability)",
    "ti_ar": "صح / خطأ: النظريات الأساسية (المدرجات التكرارية والتكرار المتجمع والاحتمال الشرطي)",
    "items": [
      {
        "s": "In a histogram, the area of each bar is proportional to the frequency of that class interval.",
        "a": true
      },
      {
        "s": "The interquartile range (IQR) is defined as \\( Q_3 - Q_1 \\), measuring the spread of the middle \\( 50\\% \\) of the data.",
        "a": true
      },
      {
        "s": "When drawing 2 counters without replacement from a bag of 10 counters, the denominator of the second draw remains 10.",
        "a": false
      }
    ],
    "items_ar": [
      {
        "s": "في المدرج التكراري، تتناسب مساحة كل عمود طردياً مع تكرار تلك الفئة.",
        "a": true
      },
      {
        "s": "المدى الربيعي (IQR) يُعرّف بأنه \\( Q_3 - Q_1 \\) ويقيس تشتت النصف الأوسط (\\( 50\\% \\)) من البيانات.",
        "a": true
      },
      {
        "s": "عند سحب كرتين بدون إرجاع من كيس به 10 كرات، يبقى مقام السحبة الثانية 10.",
        "a": false
      }
    ]
  },
  {
    "t": "mt",
    "ti": "Matching: Identities & Principles (Histograms, Cumulative Frequency & Conditional Probability)",
    "ti_ar": "مطابقة: القوانين والمفاهيم (المدرجات التكرارية والتكرار المتجمع والاحتمال الشرطي)",
    "p": [
      {
        "l": "\\( \\text{Frequency Density} \\)",
        "r": "\\( \\frac{\\text{Frequency}}{\\text{Class Width}} \\)"
      },
      {
        "l": "\\( \\text{IQR} = Q_3 - Q_1 \\)",
        "r": "Spread between 75th and 25th percentiles on an ogive"
      },
      {
        "l": "\\( P(A \\cap B) = P(A)P(B \\mid A) \\)",
        "r": "Multiplication rule for dependent events (no replacement)"
      },
      {
        "l": "\\( 1 - P(\\text{none}) \\)",
        "r": "Complement shortcut for \\( P(\\text{at least one}) \\)"
      }
    ],
    "p_ar": [
      {
        "l": "\\( \\text{Frequency Density} \\)",
        "r": "\\( \\frac{\\text{التكرار}}{\\text{طول الفئة}} \\)"
      },
      {
        "l": "\\( \\text{IQR} = Q_3 - Q_1 \\)",
        "r": "الفرق بين المئين 75 والمئين 25 على المنحنى المتجمع"
      },
      {
        "l": "\\( P(A \\cap B) = P(A)P(B \\mid A) \\)",
        "r": "قاعدة الضرب للأحداث غير المستقلة (بدون إرجاع)"
      },
      {
        "l": "\\( 1 - P(\\text{none}) \\)",
        "r": "طريقة الحدث المتمم لحساب \\( P(\\text{واحد على الأقل}) \\)"
      }
    ]
  },
  {
    "t": "se",
    "ti": "Spot the Error: Algebraic & Domain Verification (Histograms, Cumulative Frequency & Conditional Probability)",
    "ti_ar": "اكتشف الخطأ: التحقق الجبري والمنطقي (المدرجات التكرارية والتكرار المتجمع والاحتمال الشرطي)",
    "q": "A student solves \\( \\sqrt{2x + 162} = x - 9 \\) step by step. Which step introduces an invalid conclusion?",
    "q_ar": "يحل طالب المعادلة \\( \\sqrt{2x + 162} = x - 9 \\) خطوة بخطوة. أي خطوة تتضمن استنتاجاً خاطئاً؟",
    "steps": [
      "Square both sides: \\( 2x + 162 = (x - 9)^2 \\).",
      "Expand the right-hand side: \\( 2x + 162 = x^2 - 18x + 81 \\).",
      "Rearrange and factor: \\( x^2 - 20x - 81 = 0 \\).",
      "Accept both roots without checking the non-negativity condition \\( x - 9 \\ge 0 \\)."
    ],
    "steps_ar": [
      "تربيع الطرفين: \\( 2x + 162 = (x - 9)^2 \\).",
      "فك المربع الكامل: \\( 2x + 162 = x^2 - 18x + 81 \\).",
      "إعادة الترتيب في الصورة القياسية: \\( x^2 - 20x - 81 = 0 \\).",
      "قبول الجذرين معاً دون التحقق من شرط عدم السالبية \\( x - 9 \\ge 0 \\)."
    ],
    "errorStep": 4,
    "reasons": [
      "The principal square root \\( \\sqrt{\\cdot} \\) is always non-negative, so any solution must satisfy \\( x - 9 \\ge 0 \\iff x \\ge 9 \\); the negative root is extraneous.",
      "Expanding \\( (x - 9)^2 \\) should not have a middle term.",
      "Squaring both sides is never allowed for radical equations."
    ],
    "reasons_ar": [
      "الجذر التربيعي الأساسي غير سالب دائماً، لذا يجب تحقق الشرط \\( x \\ge 9 \\) واستبعاد الجذر الدخيل السالب.",
      "فك المربع الكامل غير صحيح.",
      "لا يجوز تربيع الطرفين مطلقاً."
    ],
    "correctReason": 0,
    "h": "Check the sign of the right-hand side \\( x - 9 \\) for the negative root.",
    "h_ar": "تحقق من إشارة الطرف الأيمن \\( x - 9 \\) عند التعويض بالجذر السالب.",
    "sol": "Squaring introduces an extraneous root whenever \\( x - 9 < 0 \\). Only the root satisfying \\( x \\ge 9 \\) is valid.",
    "sol_ar": "التربيع يدخل جذراً دخيلاً يجعل الطرف الأيمن سالباً؛ يُقبل فقط الجذر الذي يحقق \\( x \\ge 9 \\)."
  },
  {
    "t": "ms",
    "ti": "Examiner Mode: Multi-Step Structured Problem (Histograms, Cumulative Frequency & Conditional Probability)",
    "ti_ar": "وضع المصحح: مسألة هيكلية متعددة الخطوات (المدرجات التكرارية والتكرار المتجمع والاحتمال الشرطي)",
    "q": "Consider \\( f(x) = x^2 - 18x + 85 \\) for \\( x \\ge 9 \\). (a) Express \\( f(x) \\) in completed-square vertex form and state its range. (b) Find \\( f^{-1}(x) \\) and state its domain.",
    "q_ar": "لتكن \\( f(x) = x^2 - 18x + 85 \\) حيث \\( x \\ge 9 \\). (أ) اكتب \\( f(x) \\) في صورة المربع الكامل وحدد مداها. (ب) أوجد \\( f^{-1}(x) \\) وحدد مجالها.",
    "parts": [
      {
        "label": "Part (a) — Completed Square & Range",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "Complete the square: \\( f(x) = (x - 9)^2 + 4 \\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "State exact range: \\( f(x) \\ge 4 \\)."
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
            "text": "Write \\( y = (x - 9)^2 + 4 \\implies (x - 9)^2 = y - 4 \\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "Select positive root (since \\( x \\ge 9 \\)): \\( f^{-1}(x) = 9 + \\sqrt{x - 4} \\)."
          },
          {
            "code": "B1",
            "marks": 1,
            "text": "State domain of \\( f^{-1} \\): \\( x \\ge 4 \\)."
          }
        ]
      }
    ],
    "examinerTip": "Always match the domain of \\( f^{-1} \\) to the range of \\( f \\), and use \\( x \\ge 9 \\) to select the positive branch of the square root.",
    "examinerTip_ar": "مجال الدالة العكسية \\( f^{-1} \\) هو مدى الدالة الأصلية \\( f \\)، ويُختار الجذر الموجب لأن \\( x \\ge 9 \\)."
  },
  {
    "t": "sb",
    "ti": "Step Builder: Guided Calculation (Histograms, Cumulative Frequency & Conditional Probability)",
    "ti_ar": "بناء الخطوات: حساب موجه خطوة بخطوة (المدرجات التكرارية والتكرار المتجمع والاحتمال الشرطي)",
    "steps": [
      {
        "l": "In \\( y = x^2 - 18x + 86 \\), halve the \\( x \\)-coefficient to write \\( (x - h)^2 \\) where \\( h = \\)",
        "a": "9",
        "h": "Divide 18 by 2."
      },
      {
        "l": "Find the minimum value \\( k = 86 - 9^2 = \\)",
        "a": "5",
        "h": "Subtract 81 from 86."
      },
      {
        "l": "Evaluate \\( y \\) when \\( x = 12 \\): \\( y = \\)",
        "a": "14",
        "h": "Calculate \\( 3^2 + 5 \\)."
      }
    ],
    "steps_ar": [
      {
        "l": "في الدالة \\( y = x^2 - 18x + 86 \\)، قيمة \\( h \\) في \\( (x - h)^2 \\) تساوي:",
        "a": "9",
        "h": "اقسم 18 على 2."
      },
      {
        "l": "أوجد القيمة الصغرى \\( k = 86 - 9^2 = \\)",
        "a": "5",
        "h": "اطرح 81 من 86."
      },
      {
        "l": "احسب قيمة \\( y \\) عندما \\( x = 12 \\):",
        "a": "14",
        "h": "احسب \\( 3^2 + 5 \\)."
      }
    ]
  },
  {
    "t": "num",
    "ti": "Numeric Entry: Histograms, Cumulative Frequency & Conditional Probability",
    "ti_ar": "إدخال رقمي: المدرجات التكرارية والتكرار المتجمع والاحتمال الشرطي",
    "q": "A class interval \\( 10 < x \\le 30 \\) in a histogram has a frequency density of \\( 2.4 \\). Find the frequency of this class.",
    "q_ar": "فئة \\( 10 < x \\le 30 \\) في مدرج تكراري كثافة تكرارها \\( 2.4 \\). أوجد التكرار الفعلي لهذه الفئة.",
    "a": 48,
    "h": "Multiply the class width \\( (30 - 10 = 20) \\) by the frequency density \\( 2.4 \\).",
    "h_ar": "اضرب طول الفئة \\( (30 - 10 = 20) \\) في كثافة التكرار \\( 2.4 \\).",
    "sol": "\\( \\text{Frequency} = \\text{Width} \\times \\text{FD} = 20 \\times 2.4 = 48 \\).",
    "sol_ar": "\\( \\text{Frequency} = \\text{Width} \\times \\text{FD} = 20 \\times 2.4 = 48 \\)."
  },
  {
    "t": "ord",
    "ti": "Order the Steps: Systematic Solution (Histograms, Cumulative Frequency & Conditional Probability)",
    "ti_ar": "رتّب الخطوات: خطوات الحل المنظم (المدرجات التكرارية والتكرار المتجمع والاحتمال الشرطي)",
    "prompt": "Arrange the logical steps in order to solve the intersection and tangency problem for \\( y = x^2 - 18x + 85 \\) and \\( y = 2x + k \\):",
    "prompt_ar": "رتب الخطوات المنطقية لحل مسألة التماس بين المنحنى \\( y = x^2 - 18x + 85 \\) والمستقيم \\( y = 2x + k \\):",
    "items": [
      "Equate the curve and line equations: \\( x^2 - 18x + 85 = 2x + k \\).",
      "Rearrange into standard quadratic form: \\( x^2 - 20x + (85 - k) = 0 \\).",
      "Set the discriminant \\( \\Delta = b^2 - 4ac = (-20)^2 - 4(1)(85 - k) = 0 \\) for tangency.",
      "Solve the resulting linear equation for the exact value of the parameter \\( k \\)."
    ],
    "items_ar": [
      "ساوِ معادلة المنحنى بمعادلة المستقيم: \\( x^2 - 18x + 85 = 2x + k \\).",
      "أعد الترتيب في الصورة القياسية: \\( x^2 - 20x + (85 - k) = 0 \\).",
      "ضع المميز مساوياً للصفر لشرط التماس: \\( \\Delta = (-20)^2 - 4(85 - k) = 0 \\).",
      "حل المعادلة الخطية الناتجة لإيجاد القيمة الدقيقة للثابت \\( k \\)."
    ],
    "ex": "Equate the two equations first, collect terms into ax² + bx + c = 0, then apply Δ = 0.",
    "ex_ar": "ساوِ المعادلتين أولاً، ثم رتب الحدود في الصورة القياسية، ثم طبق شرط التماس Δ = 0."
  },
  {
    "t": "cat",
    "ti": "Categorize: Mathematical Classification (Histograms, Cumulative Frequency & Conditional Probability)",
    "ti_ar": "تصنيف: التصنيف الرياضي (المدرجات التكرارية والتكرار المتجمع والاحتمال الشرطي)",
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
        "s": "\\( x^2 - 18x + 81 = 0 \\)",
        "s_ar": "\\( x^2 - 18x + 81 = 0 \\)",
        "cat": 1
      },
      {
        "s": "\\( x^2 - 19x + 9 = 0 \\)",
        "s_ar": "\\( x^2 - 19x + 9 = 0 \\)",
        "cat": 0
      },
      {
        "s": "\\( x^2 + 9x + 84 = 0 \\)",
        "s_ar": "\\( x^2 + 9x + 84 = 0 \\)",
        "cat": 2
      },
      {
        "s": "\\( 4x^2 - 36x + 81 = 0 \\)",
        "s_ar": "\\( 4x^2 - 36x + 81 = 0 \\)",
        "cat": 1
      }
    ],
    "ex": "Compute Δ = b² − 4ac to classify each quadratic equation.",
    "ex_ar": "احسب قيمة المميز Δ = b² − 4ac لتصنيف كل معادلة تربيعية."
  }
];
});
