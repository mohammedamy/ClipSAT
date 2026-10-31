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
    "ti": "True / False: Number, Bounds & Set Principles (Number, Surds, Bounds & Set Notation)",
    "ti_ar": "صح أم خطأ: قوانين الأعداد والحدود والمجموعات (الأعداد والجذور الصماء وحدود الخطأ ونظرية المجموعات)",
    "items": [
      {
        "s": "Upper bound of \\(a / b\\) (positive) corresponds to \\(a_{\\text{upper}} / b_{\\text{lower}}\\).",
        "a": true,
        "ex": "Verified identity: \\(a_{\\text{upper}} / b_{\\text{lower}}\\)."
      },
      {
        "s": "Inclusion–Exclusion \\(|A \\cup B|\\) corresponds to \\(\\frac{2 v_1 v_2}{v_1 + v_2} = 48\\) for \\(40, 60\\).",
        "a": false,
        "ex": "Actually, Inclusion–Exclusion \\(|A \\cup B|\\) corresponds to \\(|A| + |B| - |A \\cap B|\\)."
      },
      {
        "s": "Rationalising \\(\\frac{1}{\\sqrt{a} - \\sqrt{b}}\\) corresponds to Multiply numerator & denominator by \\(\\sqrt{a} + \\sqrt{b}\\).",
        "a": true,
        "ex": "Correct: Multiply numerator & denominator by \\(\\sqrt{a} + \\sqrt{b}\\)."
      }
    ],
    "items_ar": [
      {
        "s": "الحد الأعلى للقسمة \\(a / b\\) (موجبة) يكافئ \\(a_{\\text{الأعلى}} / b_{\\text{الأدنى}}\\).",
        "a": true,
        "ex": "علاقة صحيحة: \\(a_{\\text{الأعلى}} / b_{\\text{الأدنى}}\\)."
      },
      {
        "s": "مبدأ الشمول والإقصاء \\(|A \\cup B|\\) يكافئ \\(\\frac{2 v_1 v_2}{v_1 + v_2} = 48\\) للسرعتين \\(40, 60\\).",
        "a": false,
        "ex": "الصواب أن مبدأ الشمول والإقصاء \\(|A \\cup B|\\) يكافئ \\(|A| + |B| - |A \\cap B|\\)."
      },
      {
        "s": "إنطاق مقام \\(\\frac{1}{\\sqrt{a} - \\sqrt{b}}\\) يكافئ الضرب في المرافق \\(\\sqrt{a} + \\sqrt{b}\\) بسطاً ومقاماً.",
        "a": true,
        "ex": "صحيح: الضرب في المرافق \\(\\sqrt{a} + \\sqrt{b}\\) بسطاً ومقاماً."
      }
    ]
  },
  {
    "t": "mt",
    "ti": "Matching: Number, Bounds & Set Principles (Number, Surds, Bounds & Set Notation)",
    "ti_ar": "مطابقة: قوانين الأعداد والحدود والمجموعات (الأعداد والجذور الصماء وحدود الخطأ ونظرية المجموعات)",
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
        "r": "\\(\\frac{2 v_1 v_2}{v_1 + v_2} = 48\\) for \\(40, 60\\)"
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
        "r": "\\(\\frac{2 v_1 v_2}{v_1 + v_2} = 48\\) للسرعتين \\(40, 60\\)"
      },
      {
        "l": "إنطاق مقام \\(\\frac{1}{\\sqrt{a} - \\sqrt{b}}\\)",
        "r": "الضرب في المرافق \\(\\sqrt{a} + \\sqrt{b}\\) بسطاً ومقاماً"
      }
    ]
  },
  {
    "t": "se",
    "ti": "Spot the Error: Successive Percentage Multipliers (Number, Surds, Bounds & Set Notation)",
    "ti_ar": "اكتشف الخطأ: النسب المئوية المتتالية (الأعداد والجذور الصماء وحدود الخطأ ونظرية المجموعات)",
    "q": "An item priced at \\(100\\) rises by \\(20\\%\\) and is then discounted by \\(20\\%\\). Which step in the calculation is wrong?",
    "q_ar": "سلعة سعرها \\(100\\) زاد سعرها بنسبة \\(20\\%\\) ثم خُفِّض بنسبة \\(20\\%\\). أي خطوة تحتوي على خطأ؟",
    "steps": [
      "Apply the \\(20\\%\\) increase multiplier: \\(100 \\times 1.20 = 120\\).",
      "Recognize that the \\(20\\%\\) discount applies to the new price \\(120\\).",
      "Add the percentage changes directly: \\(+20\\% - 20\\% = 0\\%\\), claiming the final price returns to \\(100\\).",
      "Verify final price via product of multipliers."
    ],
    "steps_ar": [
      "تطبيق معامل الزيادة \\(20\\%\\): \\(100 \\times 1.20 = 120\\).",
      "ملاحظة أن خصم \\(20\\%\\) يُطبَّق على السعر الجديد \\(120\\).",
      "جمع النسبتين مباشرة \\(+20\\% - 20\\% = 0\\%\\) والادعاء بأن السعر النهائي يعود إلى \\(100\\).",
      "التحقق من السعر النهائي بضرب المعاملات."
    ],
    "errorStep": 3,
    "reasons": [
      "Successive percentages multiply rather than add: \\(120 \\times 0.80 = 96\\) (a net \\(4\\%\\) decrease).",
      "The final price is actually greater than \\(100\\).",
      "Discounts must be divided rather than multiplied."
    ],
    "reasons_ar": [
      "النسب المتتالية تُضرب كمعاملات ولا تُجمع: \\(120 \\times 0.80 = 96\\) (بانخفاض صافي قدره \\(4\\%\\)).",
      "السعر النهائي أكبر من \\(100\\).",
      "الخصم يُحسب بالقسمة لا بالضرب."
    ],
    "correctReason": 0
  },
  {
    "t": "ms",
    "ti": "Examiner Mode: Harmonic Round-Trip Speed & Bounds (Number, Surds, Bounds & Set Notation)",
    "ti_ar": "وضع المصحح: السرعة المتوسطة التوافقية والحدود (الأعداد والجذور الصماء وحدود الخطأ ونظرية المجموعات)",
    "q": "A vehicle travels a fixed distance \\(d\\) outbound at \\(40\\text{ km/h}\\) and returns the same distance \\(d\\) at \\(60\\text{ km/h}\\). (a) Express total time in terms of \\(d\\) and find the exact round-trip average speed. (b) If a length \\(L = 10\\text{ cm}\\) is rounded to the nearest \\(1\\text{ cm}\\), state its lower and upper bounds.",
    "q_ar": "تقطع مركبة مسافة \\(d\\) ذهاباً بسرعة \\(40\\text{ km/h}\\) وتعود المسافة نفسها بسرعة \\(60\\text{ km/h}\\). (أ) عبّر عن الزمن الكلي بدلالة \\(d\\) وأوجد السرعة المتوسطة للرحلة كاملة. (ب) إذا قُرِّب الطول \\(L = 10\\text{ cm}\\) لأقرب \\(1\\text{ cm}\\)، فاكتب الحد الأدنى والحد الأعلى.",
    "parts": [
      {
        "label": "Part (a) — Harmonic Average Speed",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "Total distance \\(= 2d\\), total time \\(= \\frac{d}{40} + \\frac{d}{60}\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "Average speed \\(= \\frac{2 \\cdot 40 \\cdot 60}{40 + 60} = 48\\text{ km/h}\\)."
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
            "text": "Error interval: \\(9.5 \\le L < 10.5\\)."
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
            "text": "المسافة الكلية \\(= 2d\\)، والزمن الكلي \\(= \\frac{d}{40} + \\frac{d}{60}\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "السرعة المتوسطة \\(= \\frac{2 \\cdot 40 \\cdot 60}{40 + 60} = 48\\text{ km/h}\\)."
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
            "text": "فترة القيمة الحقيقية: \\(9.5 \\le L < 10.5\\)."
          }
        ]
      }
    ]
  },
  {
    "t": "sb",
    "ti": "Step Builder: Successive Multipliers & Net Change (Number, Surds, Bounds & Set Notation)",
    "ti_ar": "بناء الخطوات: المعاملات المتتالية وصافي التغير (الأعداد والجذور الصماء وحدود الخطأ ونظرية المجموعات)",
    "steps": [
      {
        "l": "Increase \\(100\\) by \\(20\\%\\): new value \\(=\\)",
        "a": "120",
        "h": "Compute 100 × 1.20."
      },
      {
        "l": "Now discount \\(120\\) by \\(20\\%\\): final value \\(=\\)",
        "a": "96",
        "h": "Compute 120 × 0.80."
      },
      {
        "l": "Find the net decrease \\(100 - 96 =\\)",
        "a": "4",
        "h": "Subtract 96 from 100."
      }
    ],
    "steps_ar": [
      {
        "l": "زد العدد \\(100\\) بنسبة \\(20\\%\\): القيمة الجديدة \\(=\\)",
        "a": "120",
        "h": "احسب 100 × 1.20."
      },
      {
        "l": "طبّق خصم \\(20\\%\\) على \\(120\\): القيمة النهائية \\(=\\)",
        "a": "96",
        "h": "احسب 120 × 0.80."
      },
      {
        "l": "أوجد مقدار النقصان الصافي \\(100 - 96 =\\)",
        "a": "4",
        "h": "اطرح 96 من 100."
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
    "ti": "Order the Steps: Converting Recurring Decimal to Fraction (Number, Surds, Bounds & Set Notation)",
    "ti_ar": "ترتيب الخطوات: تحويل الكسر العشري الدوري إلى اعتيادي (الأعداد والجذور الصماء وحدود الخطأ ونظرية المجموعات)",
    "prompt": "Order the algebraic steps to convert \\(x = 0.\\overline{16}\\) into a simplified fraction:",
    "prompt_ar": "رتّب الخطوات الجبرية لتحويل الكسر الدوري \\(x = 0.\\overline{16}\\) إلى كسر اعتيادي:",
    "items": [
      "Let \\(x = 0.\\overline{16}\\) and note the repeating block has 2 digits.",
      "Multiply both sides by \\(10^2 = 100\\) so \\(100x = 16.\\overline{16}\\).",
      "Subtract the original equation to cancel the infinite tail: \\(99x = 16\\).",
      "Divide by \\(99\\) and reduce by \\(\\gcd(16, 99)\\)."
    ],
    "items_ar": [
      "نفرض \\(x = 0.\\overline{16}\\) ونلاحظ أن طول الدورة رقمان.",
      "نضرب الطرفين في \\(10^2 = 100\\) فنحصل على \\(100x = 16.\\overline{16}\\).",
      "نطرح المعادلة الأصلية لحذف الجزء الدوري اللانهائي: \\(99x = 16\\).",
      "نقسم على \\(99\\) ونبسّط الكسر بالقسمة على القاسم المشترك الأكبر."
    ],
    "ex": "Align the repeating block by multiplying by \\(10^k\\), subtract to eliminate the tail, and simplify.",
    "ex_ar": "نضرب في \\(10^k\\) لمحاذاة الدورة ثم نطرح لحذف الجزء الدوري ونبسّط."
  },
  {
    "t": "cat",
    "ti": "Categorize: Rational vs. Irrational Real Numbers (Number, Surds, Bounds & Set Notation)",
    "ti_ar": "تصنيف: الأعداد النسبية مقابل غير النسبية (الأعداد والجذور الصماء وحدود الخطأ ونظرية المجموعات)",
    "categories": [
      "Rational (\\(\\mathbb{Q}\\))",
      "Irrational (\\(\\mathbb{R} \\setminus \\mathbb{Q}\\))"
    ],
    "categories_ar": [
      "عدد نسبي (\\(\\mathbb{Q}\\))",
      "عدد غير نسبي (\\(\\mathbb{R} \\setminus \\mathbb{Q}\\))"
    ],
    "items": [
      {
        "s": "\\(0.\\overline{18}\\)",
        "cat": 0
      },
      {
        "s": "\\(\\sqrt{9}\\)",
        "cat": 0
      },
      {
        "s": "\\(\\sqrt{11}\\)",
        "cat": 1
      },
      {
        "s": "\\(\\pi + 1\\)",
        "cat": 1
      }
    ],
    "items_ar": [
      {
        "s": "\\(0.\\overline{18}\\)",
        "cat": 0
      },
      {
        "s": "\\(\\sqrt{9}\\)",
        "cat": 0
      },
      {
        "s": "\\(\\sqrt{11}\\)",
        "cat": 1
      },
      {
        "s": "\\(\\pi + 1\\)",
        "cat": 1
      }
    ],
    "ex": "Repeating decimals and perfect-square roots lie in \\(\\mathbb{Q}\\); non-square prime surds and \\(\\pi\\) shifts are irrational.",
    "ex_ar": "الكسور الدورية وجذور المربعات الكاملة نسبية، بينما الجذور الصماء ومضاعفات \\(\\pi\\) غير نسبية."
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
    "ti": "True / False: Polynomial & Quadratic Theorems (Algebraic Fractions, Quadratics & Simultaneous Systems)",
    "ti_ar": "صح أم خطأ: نظريات المعادلات التربيعية وكثيرات الحدود (الكسور الجبرية والمعادلات التربيعيةوأنظمة المعادلات الآنية)",
    "items": [
      {
        "s": "Remainder when \\(P(x)\\) is divided by \\((x - 2)\\) corresponds to \\(P(2)\\).",
        "a": true,
        "ex": "Verified identity: \\(P(2)\\)."
      },
      {
        "s": "Tangent line–parabola condition corresponds to \\(\\alpha + \\beta = 7,\\; \\alpha\\beta = 10\\).",
        "a": false,
        "ex": "Actually, Tangent line–parabola condition corresponds to System discriminant \\(\\Delta = b^2 - 4ac = 0\\)."
      },
      {
        "s": "Axis of symmetry of \\(ax^2 + bx + c\\) corresponds to \\(x = -\\frac{b}{2a}\\).",
        "a": true,
        "ex": "Correct: \\(x = -\\frac{b}{2a}\\)."
      }
    ],
    "items_ar": [
      {
        "s": "باقي قسمة \\(P(x)\\) على \\((x - 2)\\) يكافئ \\(P(2)\\).",
        "a": true,
        "ex": "علاقة صحيحة: \\(P(2)\\)."
      },
      {
        "s": "شرط تماس مستقيم مع قطع مكافئ يكافئ \\(\\alpha + \\beta = 7,\\; \\alpha\\beta = 10\\).",
        "a": false,
        "ex": "الصواب أن شرط تماس مستقيم مع قطع مكافئ يكافئ مميز النظام المشترك \\(\\Delta = b^2 - 4ac = 0\\)."
      },
      {
        "s": "معادلة محور التماثل لـ \\(ax^2 + bx + c\\) يكافئ \\(x = -\\frac{b}{2a}\\).",
        "a": true,
        "ex": "صحيح: \\(x = -\\frac{b}{2a}\\)."
      }
    ]
  },
  {
    "t": "mt",
    "ti": "Matching: Polynomial & Quadratic Theorems (Algebraic Fractions, Quadratics & Simultaneous Systems)",
    "ti_ar": "مطابقة: نظريات المعادلات التربيعية وكثيرات الحدود (الكسور الجبرية والمعادلات التربيعيةوأنظمة المعادلات الآنية)",
    "p": [
      {
        "l": "Remainder when \\(P(x)\\) is divided by \\((x - 2)\\)",
        "r": "\\(P(2)\\)"
      },
      {
        "l": "Tangent line–parabola condition",
        "r": "System discriminant \\(\\Delta = b^2 - 4ac = 0\\)"
      },
      {
        "l": "Sum & product in \\(x^2 - 7x + 10 = 0\\)",
        "r": "\\(\\alpha + \\beta = 7,\\; \\alpha\\beta = 10\\)"
      },
      {
        "l": "Axis of symmetry of \\(ax^2 + bx + c\\)",
        "r": "\\(x = -\\frac{b}{2a}\\)"
      }
    ],
    "p_ar": [
      {
        "l": "باقي قسمة \\(P(x)\\) على \\((x - 2)\\)",
        "r": "\\(P(2)\\)"
      },
      {
        "l": "شرط تماس مستقيم مع قطع مكافئ",
        "r": "مميز النظام المشترك \\(\\Delta = b^2 - 4ac = 0\\)"
      },
      {
        "l": "مجموع وضرب جذري \\(x^2 - 7x + 10 = 0\\)",
        "r": "\\(\\alpha + \\beta = 7,\\; \\alpha\\beta = 10\\)"
      },
      {
        "l": "معادلة محور التماثل لـ \\(ax^2 + bx + c\\)",
        "r": "\\(x = -\\frac{b}{2a}\\)"
      }
    ]
  },
  {
    "t": "se",
    "ti": "Spot the Error: Vieta's Sum of Squares Identity (Algebraic Fractions, Quadratics & Simultaneous Systems)",
    "ti_ar": "اكتشف الخطأ: متطابقة فييت لمجموع مربعي الجذرين (الكسور الجبرية والمعادلات التربيعيةوأنظمة المعادلات الآنية)",
    "q": "For \\(x^2 - 7x + 10 = 0\\) with roots \\(\\alpha, \\beta\\), a student computes \\(\\alpha^2 + \\beta^2\\). Where is the error?",
    "q_ar": "للمعادلة \\(x^2 - 7x + 10 = 0\\) ذات الجذرين \\(\\alpha, \\beta\\)، يحسب طالب \\(\\alpha^2 + \\beta^2\\). أين الخطأ؟",
    "steps": [
      "Read Vieta's relations: \\(\\alpha + \\beta = 7\\) and \\(\\alpha\\beta = 10\\).",
      "Claim \\(\\alpha^2 + \\beta^2 = (\\alpha + \\beta)^2 = 49\\), omitting \\(-2\\alpha\\beta\\).",
      "State \\(49\\) as the value of \\(\\alpha^2 + \\beta^2\\)."
    ],
    "steps_ar": [
      "استخراج علاقات فييت: \\(\\alpha + \\beta = 7\\) و\\(\\alpha\\beta = 10\\).",
      "الادعاء بأن \\(\\alpha^2 + \\beta^2 = (\\alpha + \\beta)^2 = 49\\) وإغفال الحد \\(-2\\alpha\\beta\\).",
      "اعتماد \\(49\\) قيمة نهائية."
    ],
    "errorStep": 2,
    "reasons": [
      "Because \\((\\alpha + \\beta)^2 = \\alpha^2 + 2\\alpha\\beta + \\beta^2\\), the exact identity is \\(\\alpha^2 + \\beta^2 = (\\alpha + \\beta)^2 - 2\\alpha\\beta = 49 - 20 = 29\\).",
      "Vieta gives \\(\\alpha + \\beta = -7\\).",
      "\\(\\alpha\\beta\\) must be squared before subtracting."
    ],
    "reasons_ar": [
      "لأن \\((\\alpha + \\beta)^2 = \\alpha^2 + 2\\alpha\\beta + \\beta^2\\)، فالمتطابقة الصحيحة هي \\(\\alpha^2 + \\beta^2 = (\\alpha + \\beta)^2 - 2\\alpha\\beta = 29\\).",
      "مجموع الجذرين يساوي \\(-7\\).",
      "يجب تربيع \\(\\alpha\\beta\\) قبل الطرح."
    ],
    "correctReason": 0
  },
  {
    "t": "ms",
    "ti": "Examiner Mode: Discriminant, Vieta & Factor Theorem (Algebraic Fractions, Quadratics & Simultaneous Systems)",
    "ti_ar": "وضع المصحح: المميز وعلاقات فييت ونظرية العامل (الكسور الجبرية والمعادلات التربيعيةوأنظمة المعادلات الآنية)",
    "q": "Consider \\(P(x) = x^2 - 7x + 10\\) with roots \\(\\alpha, \\beta\\). (a) Compute the discriminant \\(\\Delta\\) and verify \\(P(2) = 0\\). (b) Evaluate \\(\\alpha^2 + \\beta^2\\) using symmetric sums.",
    "q_ar": "لتكن \\(P(x) = x^2 - 7x + 10\\) وجذراها \\(\\alpha, \\beta\\). (أ) احسب المميز \\(\\Delta\\) وتحقق أن \\(P(2) = 0\\). (ب) أوجد قيمة \\(\\alpha^2 + \\beta^2\\) باستعمال المجاميع المتماثلة.",
    "parts": [
      {
        "label": "Part (a) — Discriminant & Factor Check",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "\\(\\Delta = (-7)^2 - 4(1)(10) = 9 > 0\\) (two distinct real roots)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "\\(P(2) = 4 - 14 + 10 = 0\\), confirming \\((x - 2)\\) is a factor."
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
            "text": "\\(\\alpha + \\beta = 7,\\; \\alpha\\beta = 10\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "\\(\\alpha^2 + \\beta^2 = 7^2 - 2(10) = 29\\)."
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
            "text": "\\(\\Delta = (-7)^2 - 4(1)(10) = 9 > 0\\) (جذران حقيقيان مختلفان)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "\\(P(2) = 0\\)، مما يؤكد أن \\((x - 2)\\) عامل لكثيرة الحدود."
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
            "text": "\\(\\alpha + \\beta = 7,\\; \\alpha\\beta = 10\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "\\(\\alpha^2 + \\beta^2 = 7^2 - 2(10) = 29\\)."
          }
        ]
      }
    ]
  },
  {
    "t": "sb",
    "ti": "Step Builder: Vieta Relations & Remainder Theorem (Algebraic Fractions, Quadratics & Simultaneous Systems)",
    "ti_ar": "بناء الخطوات: علاقات فييت ونظرية الباقي (الكسور الجبرية والمعادلات التربيعيةوأنظمة المعادلات الآنية)",
    "steps": [
      {
        "l": "For \\(x^2 - 7x + 10 = 0\\), find \\(\\alpha + \\beta =\\)",
        "a": "7",
        "h": "Use −b/a."
      },
      {
        "l": "Find the product of roots \\(\\alpha\\beta =\\)",
        "a": "10",
        "h": "Use c/a."
      },
      {
        "l": "Compute \\(\\alpha^2 + \\beta^2 = (\\alpha + \\beta)^2 - 2\\alpha\\beta =\\)",
        "a": "29",
        "h": "Compute 49 − 20."
      }
    ],
    "steps_ar": [
      {
        "l": "للمعادلة \\(x^2 - 7x + 10 = 0\\)، أوجد \\(\\alpha + \\beta =\\)",
        "a": "7",
        "h": "استعمل −b/a."
      },
      {
        "l": "أوجد حاصل ضرب الجذرين \\(\\alpha\\beta =\\)",
        "a": "10",
        "h": "استعمل c/a."
      },
      {
        "l": "احسب \\(\\alpha^2 + \\beta^2 = (\\alpha + \\beta)^2 - 2\\alpha\\beta =\\)",
        "a": "29",
        "h": "احسب 49 − 20."
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
    "ti": "Order the Steps: Line–Parabola Tangency Parameter (Algebraic Fractions, Quadratics & Simultaneous Systems)",
    "ti_ar": "ترتيب الخطوات: إيجاد بارامتر تماس مستقيم مع قطع مكافئ (الكسور الجبرية والمعادلات التربيعيةوأنظمة المعادلات الآنية)",
    "prompt": "Order the steps to find \\(k\\) such that \\(y = 2x + k\\) is tangent to \\(y = x^2 + 2\\):",
    "prompt_ar": "رتّب خطوات إيجاد \\(k\\) التي تجعل المستقيم \\(y = 2x + k\\) مماساً للمنحنى \\(y = x^2 + 2\\):",
    "items": [
      "Equate \\(x^2 + 2 = 2x + k\\) to form the intersection equation.",
      "Rearrange into standard quadratic form \\(x^2 - 2x + (2 - k) = 0\\).",
      "Set the discriminant \\(\\Delta = (-2)^2 - 4(1)(2 - k) = 0\\) for tangency.",
      "Solve \\(4 - 4(2 - k) = 0 \\implies k = 1\\)."
    ],
    "items_ar": [
      "مساواة المعادلتين \\(x^2 + 2 = 2x + k\\) لتكوين معادلة التقاطع.",
      "إعادة الترتيب للصيغة القياسية \\(x^2 - 2x + (2 - k) = 0\\).",
      "مساواة المميز بالصفر لشرط التماس: \\(\\Delta = (-2)^2 - 4(1)(2 - k) = 0\\).",
      "حل المعادلة لإيجاد \\(k = 1\\)."
    ],
    "ex": "Equate → standard quadratic → set Δ = 0 → solve for k.",
    "ex_ar": "مساواة المعادلتين ← الصيغة القياسية ← وضع Δ = 0 ← إيجاد k."
  },
  {
    "t": "cat",
    "ti": "Categorize: Real Root Multiplicity via Discriminant (Algebraic Fractions, Quadratics & Simultaneous Systems)",
    "ti_ar": "تصنيف: طبيعة الجذور الحقيقية بالمميز (الكسور الجبرية والمعادلات التربيعيةوأنظمة المعادلات الآنية)",
    "categories": [
      "Two Distinct Real Roots",
      "One Repeated Real Root",
      "No Real Roots"
    ],
    "categories_ar": [
      "جذران حقيقيان مختلفان",
      "جذر حقيقي مكرر (تماس)",
      "لا توجد جذور حقيقية"
    ],
    "items": [
      {
        "s": "\\(x^2 - 7x + 10 = 0\\) (\\(\\Delta = 9\\))",
        "cat": 0
      },
      {
        "s": "\\(x^2 - 4x + 4 = 0\\) (\\(\\Delta = 0\\))",
        "cat": 1
      },
      {
        "s": "\\(x^2 + 2x + 15 = 0\\) (\\(\\Delta < 0\\))",
        "cat": 2
      }
    ],
    "items_ar": [
      {
        "s": "\\(x^2 - 7x + 10 = 0\\) (\\(\\Delta = 9\\))",
        "cat": 0
      },
      {
        "s": "\\(x^2 - 4x + 4 = 0\\) (\\(\\Delta = 0\\))",
        "cat": 1
      },
      {
        "s": "\\(x^2 + 2x + 15 = 0\\) (\\(\\Delta < 0\\))",
        "cat": 2
      }
    ],
    "ex": "\\(\\Delta > 0\\): 2 real roots; \\(\\Delta = 0\\): 1 repeated root; \\(\\Delta < 0\\): complex conjugate roots.",
    "ex_ar": "\\(\\Delta > 0\\): جذران مختلفان؛ \\(\\Delta = 0\\): جذر مكرر؛ \\(\\Delta < 0\\): لا جذور حقيقية."
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
    "ti": "True / False: Sequence, Series & Expansion Formulas (Functions, Graphs, Transformations & Arithmetic Series)",
    "ti_ar": "صح أم خطأ: صيغ المتتاليات والمتسلسلات وذي الحدين (الدوال والتحويلات الهندسية للمنحنيات والمتسلسلات الحسابية)",
    "items": [
      {
        "s": "Arithmetic sum \\(S_n\\) corresponds to \\(\\frac{n}{2}[2a + (n - 1)d]\\).",
        "a": true,
        "ex": "Verified identity: \\(\\frac{n}{2}[2a + (n - 1)d]\\)."
      },
      {
        "s": "Convergent GP sum \\(S_\\infty\\) (\\(|r| < 1\\)) corresponds to \\(\\binom{n}{r} a^{n - r} b^r\\).",
        "a": false,
        "ex": "Actually, Convergent GP sum \\(S_\\infty\\) (\\(|r| < 1\\)) corresponds to \\(\\dfrac{a}{1 - r}\\)."
      },
      {
        "s": "\\(p\\)-series \\(\\sum_{n=1}^{\\infty} n^{-p}\\) convergence corresponds to Converges iff \\(p > 1\\).",
        "a": true,
        "ex": "Correct: Converges iff \\(p > 1\\)."
      }
    ],
    "items_ar": [
      {
        "s": "مجموع المتتالية الحسابية \\(S_n\\) يكافئ \\(\\frac{n}{2}[2a + (n - 1)d]\\).",
        "a": true,
        "ex": "علاقة صحيحة: \\(\\frac{n}{2}[2a + (n - 1)d]\\)."
      },
      {
        "s": "مجموع المتسلسلة الهندسية اللانهائية (\\(|r| < 1\\)) يكافئ \\(\\binom{n}{r} a^{n - r} b^r\\).",
        "a": false,
        "ex": "الصواب أن مجموع المتسلسلة الهندسية اللانهائية (\\(|r| < 1\\)) يكافئ \\(\\dfrac{a}{1 - r}\\)."
      },
      {
        "s": "تقارب متسلسلة القوى \\(\\sum_{n=1}^{\\infty} n^{-p}\\) يكافئ تتقارب إذا وفقط إذا كان \\(p > 1\\).",
        "a": true,
        "ex": "صحيح: تتقارب إذا وفقط إذا كان \\(p > 1\\)."
      }
    ]
  },
  {
    "t": "mt",
    "ti": "Matching: Sequence, Series & Expansion Formulas (Functions, Graphs, Transformations & Arithmetic Series)",
    "ti_ar": "مطابقة: صيغ المتتاليات والمتسلسلات وذي الحدين (الدوال والتحويلات الهندسية للمنحنيات والمتسلسلات الحسابية)",
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
  },
  {
    "t": "se",
    "ti": "Spot the Error: Infinite Geometric Series Convergence Check (Functions, Graphs, Transformations & Arithmetic Series)",
    "ti_ar": "اكتشف الخطأ: شرط تقارب المتسلسلة الهندسية اللانهائية (الدوال والتحويلات الهندسية للمنحنيات والمتسلسلات الحسابية)",
    "q": "A student applies \\(S_\\infty = \\dfrac{a}{1 - r}\\) to \\(12 + 24 + 48 + \\cdots\\). Where does the reasoning fail?",
    "q_ar": "يطبّق طالب صيغة \\(S_\\infty = \\dfrac{a}{1 - r}\\) على المتسلسلة \\(12 + 24 + 48 + \\cdots\\). أين موضع الخطأ؟",
    "steps": [
      "Identify first term \\(a = 12\\) and common ratio \\(r = 2\\).",
      "Substitute directly into \\(S_\\infty = \\frac{12}{1 - 2} = -12\\).",
      "Conclude the sum of positive growing terms equals \\(-12\\)."
    ],
    "steps_ar": [
      "تحديد الحد الأول \\(a = 12\\) والأساس \\(r = 2\\).",
      "التعويض المباشر في القانون \\(S_\\infty = \\frac{12}{1 - 2} = -12\\).",
      "استنتاج أن مجموع حدود موجبة متزايدة يساوي \\(-12\\)."
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
    "ti": "Examiner Mode: Convergent Geometric & Arithmetic Series (Functions, Graphs, Transformations & Arithmetic Series)",
    "ti_ar": "وضع المصحح: المتتاليات الحسابية والهندسية المتقاربة (الدوال والتحويلات الهندسية للمنحنيات والمتسلسلات الحسابية)",
    "q": "(a) A geometric series has first term \\(a = 12\\) and common ratio \\(r = \\frac{1}{3}\\). Verify convergence and find \\(S_\\infty\\). (b) An arithmetic progression has \\(u_1 = 12\\) and common difference \\(d = 5\\); find \\(u_{10}\\).",
    "q_ar": "(أ) متسلسلة هندسية حدها الأول \\(a = 12\\) وأساسها \\(r = \\frac{1}{3}\\). تحقق من التقارب وأوجد \\(S_\\infty\\). (ب) متتالية حسابية حدها الأول \\(12\\) وأساسها \\(d = 5\\)؛ أوجد الحد العاشر \\(u_{10}\\).",
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
            "text": "\\(S_\\infty = \\dfrac{12}{1 - 1/3} = \\dfrac{12}{2/3} = 18\\)."
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
            "text": "\\(u_{10} = 12 + 9(5) = 57\\)."
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
            "text": "\\(S_\\infty = \\dfrac{12}{1 - 1/3} = 18\\)."
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
            "text": "\\(u_{10} = 12 + 9(5) = 57\\)."
          }
        ]
      }
    ]
  },
  {
    "t": "sb",
    "ti": "Step Builder: Geometric Sum to Infinity & AP Term (Functions, Graphs, Transformations & Arithmetic Series)",
    "ti_ar": "بناء الخطوات: مجموع اللانهاية والحد النوني (الدوال والتحويلات الهندسية للمنحنيات والمتسلسلات الحسابية)",
    "steps": [
      {
        "l": "For \\(a = 12\\) and \\(r = \\frac{1}{3}\\), compute the second term \\(a r =\\)",
        "a": "4",
        "h": "Divide 12 by 3."
      },
      {
        "l": "Compute the sum to infinity \\(S_\\infty = \\frac{12}{1 - 1/3} =\\)",
        "a": "18",
        "h": "Multiply 12 by 3/2."
      },
      {
        "l": "In the AP with \\(u_1 = 12,\\; d = 5\\), find \\(u_{10} =\\)",
        "a": "57",
        "h": "Compute 12 + 9×5."
      }
    ],
    "steps_ar": [
      {
        "l": "لمتتالية هندسية فيها \\(a = 12\\) و\\(r = \\frac{1}{3}\\)، احسب الحد الثاني \\(ar =\\)",
        "a": "4",
        "h": "اقسم 12 على 3."
      },
      {
        "l": "احسب المجموع إلى اللانهاية \\(S_\\infty = \\frac{12}{1 - 1/3} =\\)",
        "a": "18",
        "h": "اضرب 12 في 3/2."
      },
      {
        "l": "في المتتالية الحسابية \\(u_1 = 12,\\; d = 5\\)، أوجد \\(u_{10} =\\)",
        "a": "57",
        "h": "احسب 12 + 9×5."
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
    "ti": "Order the Steps: Geometric Sum to Infinity & AP Term (Functions, Graphs, Transformations & Arithmetic Series)",
    "ti_ar": "ترتيب الخطوات: مجموع اللانهاية والحد النوني (الدوال والتحويلات الهندسية للمنحنيات والمتسلسلات الحسابية)",
    "prompt": "Arrange the sequential calculation steps in logical order:",
    "prompt_ar": "رتّب خطوات الحل المتسلسلة ترتيباً منطقياً:",
    "items": [
      "For \\(a = 12\\) and \\(r = \\frac{1}{3}\\), compute the second term \\(a r =\\) \\(4\\).",
      "Compute the sum to infinity \\(S_\\infty = \\frac{12}{1 - 1/3} =\\) \\(18\\).",
      "In the AP with \\(u_1 = 12,\\; d = 5\\), find \\(u_{10} =\\) \\(57\\)."
    ],
    "items_ar": [
      "لمتتالية هندسية فيها \\(a = 12\\) و\\(r = \\frac{1}{3}\\)، احسب الحد الثاني \\(ar =\\) \\(4\\).",
      "احسب المجموع إلى اللانهاية \\(S_\\infty = \\frac{12}{1 - 1/3} =\\) \\(18\\).",
      "في المتتالية الحسابية \\(u_1 = 12,\\; d = 5\\)، أوجد \\(u_{10} =\\) \\(57\\)."
    ],
    "ex": "Execute each intermediate stage sequentially to reach the final verified result.",
    "ex_ar": "نفّذ كل مرحلة بالترتيب للوصول إلى النتيجة النهائية."
  },
  {
    "t": "cat",
    "ti": "Categorize: Sequence, Series & Expansion Formulas (Functions, Graphs, Transformations & Arithmetic Series)",
    "ti_ar": "تصنيف: صيغ المتتاليات والمتسلسلات وذي الحدين (الدوال والتحويلات الهندسية للمنحنيات والمتسلسلات الحسابية)",
    "categories": [
      "Arithmetic sum \\(S_n\\)",
      "Convergent GP sum \\(S_\\infty\\) (\\(|r| < 1\\))"
    ],
    "categories_ar": [
      "مجموع المتتالية الحسابية \\(S_n\\)",
      "مجموع المتسلسلة الهندسية اللانهائية (\\(|r| < 1\\))"
    ],
    "items": [
      {
        "s": "\\(\\frac{n}{2}[2a + (n - 1)d]\\)",
        "cat": 0
      },
      {
        "s": "\\(\\dfrac{a}{1 - r}\\)",
        "cat": 1
      }
    ],
    "items_ar": [
      {
        "s": "\\(\\frac{n}{2}[2a + (n - 1)d]\\)",
        "cat": 0
      },
      {
        "s": "\\(\\dfrac{a}{1 - r}\\)",
        "cat": 1
      }
    ],
    "ex": "Arithmetic sum \\(S_n\\) → \\(\\frac{n}{2}[2a + (n - 1)d]\\); Convergent GP sum \\(S_\\infty\\) (\\(|r| < 1\\)) → \\(\\dfrac{a}{1 - r}\\).",
    "ex_ar": "مجموع المتتالية الحسابية \\(S_n\\) ← \\(\\frac{n}{2}[2a + (n - 1)d]\\)."
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
    "ti": "True / False: Linear & Coordinate Geometry Criteria (Coordinate Geometry & Straight-Line Equations)",
    "ti_ar": "صح أم خطأ: علاقات المستقيمات والهندسة الإحداثية (الهندسة الإحداثية ومعادلات الخط المستقيم)",
    "items": [
      {
        "s": "Parallel distinct lines corresponds to \\(m_1 = m_2\\) and \\(c_1 \\neq c_2\\) (0 intersections).",
        "a": true,
        "ex": "Verified identity: \\(m_1 = m_2\\) and \\(c_1 \\neq c_2\\) (0 intersections)."
      },
      {
        "s": "Perpendicular lines corresponds to \\(\\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}\\).",
        "a": false,
        "ex": "Actually, Perpendicular lines corresponds to \\(m_1 m_2 = -1\\) (e.g. \\(2\\) and \\(-1/2\\))."
      },
      {
        "s": "Multiplying an inequality by \\(-1\\) corresponds to Reverses the inequality direction (\\(< \\;\\to\\; >\\)).",
        "a": true,
        "ex": "Correct: Reverses the inequality direction (\\(< \\;\\to\\; >\\))."
      }
    ],
    "items_ar": [
      {
        "s": "مستقيمان متوازيان مختلفان يكافئ \\(m_1 = m_2\\) و\\(c_1 \\neq c_2\\) (لا يوجد تقاطع).",
        "a": true,
        "ex": "علاقة صحيحة: \\(m_1 = m_2\\) و\\(c_1 \\neq c_2\\) (لا يوجد تقاطع)."
      },
      {
        "s": "مستقيمان متعامدان يكافئ \\(\\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}\\).",
        "a": false,
        "ex": "الصواب أن مستقيمان متعامدان يكافئ \\(m_1 m_2 = -1\\) (مثل \\(2\\) و\\(-1/2\\))."
      },
      {
        "s": "ضرب طرفي متباينة في عدد سالب يكافئ يعكس اتجاه علامة التباين (\\(< \\;\\to\\; >\\)).",
        "a": true,
        "ex": "صحيح: يعكس اتجاه علامة التباين (\\(< \\;\\to\\; >\\))."
      }
    ]
  },
  {
    "t": "mt",
    "ti": "Matching: Linear & Coordinate Geometry Criteria (Coordinate Geometry & Straight-Line Equations)",
    "ti_ar": "مطابقة: علاقات المستقيمات والهندسة الإحداثية (الهندسة الإحداثية ومعادلات الخط المستقيم)",
    "p": [
      {
        "l": "Parallel distinct lines",
        "r": "\\(m_1 = m_2\\) and \\(c_1 \\neq c_2\\) (0 intersections)"
      },
      {
        "l": "Perpendicular lines",
        "r": "\\(m_1 m_2 = -1\\) (e.g. \\(2\\) and \\(-1/2\\))"
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
        "r": "\\(m_1 m_2 = -1\\) (مثل \\(2\\) و\\(-1/2\\))"
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
    "t": "se",
    "ti": "Spot the Error: Perpendicular Gradient & Inequality Sign (Coordinate Geometry & Straight-Line Equations)",
    "ti_ar": "اكتشف الخطأ: ميل المستقيم المتعامد وإشارة المتباينة (الهندسة الإحداثية ومعادلات الخط المستقيم)",
    "q": "Given \\(A(4, 2)\\) and \\(B(6, 6)\\), a student finds the gradient of the line perpendicular to \\(AB\\). Which step is wrong?",
    "q_ar": "مُعطى النقطتان \\(A(4, 2)\\) و\\(B(6, 6)\\)، يحسب طالب ميل العمودي على \\(AB\\). أي خطوة خاطئة؟",
    "steps": [
      "Compute gradient of \\(AB\\): \\(m_{AB} = \\frac{6 - 2}{6 - 4} = \\frac{4}{2} = 2\\).",
      "Compute midpoint of \\(AB\\): \\(M = (5, 4)\\).",
      "Take the perpendicular gradient as the positive reciprocal \\(m_{\\perp} = \\frac{1}{2}\\) without negating the sign.",
      "Substitute \\(M(5, 4)\\) into point-slope form."
    ],
    "steps_ar": [
      "حساب ميل القطعة \\(AB\\): \\(m_{AB} = \\frac{6 - 2}{6 - 4} = 2\\).",
      "حساب نقطة المنتصف: \\(M = (5, 4)\\).",
      "أخذ ميل العمودي كمقلوب موجب \\(m_{\\perp} = \\frac{1}{2}\\) دون عكس الإشارة.",
      "التعويض بالنقطة \\(M(5, 4)\\) في معادلة المستقيم."
    ],
    "errorStep": 3,
    "reasons": [
      "Perpendicular non-vertical lines satisfy \\(m_1 m_2 = -1\\), so \\(m_{\\perp} = -\\frac{1}{2}\\) (negative reciprocal, not positive reciprocal).",
      "Perpendicular lines have equal slopes \\(m_1 = m_2\\).",
      "Slope is run divided by rise."
    ],
    "reasons_ar": [
      "المستقيمان المتعامدان يحققان \\(m_1 m_2 = -1\\)، لذا ميل العمودي هو المقلوب السالب \\(m_{\\perp} = -\\frac{1}{2}\\).",
      "المستقيمان المتعامدان لهما نفس الميل.",
      "الميل يساوي فرق السينات على فرق الصادات."
    ],
    "correctReason": 0
  },
  {
    "t": "ms",
    "ti": "Examiner Mode: Line Equation & Perpendicular Bisector (Coordinate Geometry & Straight-Line Equations)",
    "ti_ar": "وضع المصحح: معادلة المستقيم والعمود المنصّف (الهندسة الإحداثية ومعادلات الخط المستقيم)",
    "q": "Points \\(A(4, 2)\\) and \\(B(6, 6)\\) lie in the coordinate plane. (a) Find the equation of line \\(AB\\) in \\(y = mx + c\\) form. (b) Find the midpoint \\(M\\) and the gradient of the perpendicular bisector of \\(AB\\).",
    "q_ar": "النقطتان \\(A(4, 2)\\) و\\(B(6, 6)\\) في المستوى الإحداثي. (أ) أوجد معادلة المستقيم \\(AB\\) بصيغة \\(y = mx + c\\). (ب) أوجد نقطة المنتصف \\(M\\) وميل العمود المنصّف للقطعة \\(AB\\).",
    "parts": [
      {
        "label": "Part (a) — Gradient & Line Equation",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "Gradient \\(m = \\frac{6 - 2}{6 - 4} = 2\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "Intercept \\(c = 2 - 2(4) = -6\\), giving \\(y = 2x - 6\\)."
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
            "text": "Midpoint \\(M = \\left(\\frac{4+6}{2}, \\frac{2+6}{2}\\right) = (5, 4)\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "Perpendicular gradient \\(m_{\\perp} = -\\frac{1}{2}\\)."
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
            "text": "الميل \\(m = \\frac{6 - 2}{6 - 4} = 2\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "المقطع الصادي \\(c = -6\\)، والمعادلة \\(y = 2x - 6\\)."
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
            "text": "نقطة المنتصف \\(M = (5, 4)\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "ميل العمود المنصّف \\(m_{\\perp} = -\\frac{1}{2}\\)."
          }
        ]
      }
    ]
  },
  {
    "t": "sb",
    "ti": "Step Builder: Coordinate Slope, Intercept & Midpoint (Coordinate Geometry & Straight-Line Equations)",
    "ti_ar": "بناء الخطوات: الميل والمقطع ونقطة المنتصف (الهندسة الإحداثية ومعادلات الخط المستقيم)",
    "steps": [
      {
        "l": "Find the slope \\(m\\) through \\((4, 2)\\) and \\((6, 6)\\): \\(m =\\)",
        "a": "2",
        "h": "Compute (6 − 2) / (6 − 4)."
      },
      {
        "l": "Find the \\(y\\)-intercept \\(c\\) in \\(y = mx + c\\): \\(c =\\)",
        "a": "-6",
        "h": "Compute 2 − 2×4."
      },
      {
        "l": "Find the \\(y\\)-coordinate of the midpoint \\(M\\): \\(y_M =\\)",
        "a": "4",
        "h": "Average 2 and 6."
      }
    ],
    "steps_ar": [
      {
        "l": "أوجد الميل \\(m\\) للمستقيم المار بـ \\((4, 2)\\) و\\((6, 6)\\): \\(m =\\)",
        "a": "2",
        "h": "احسب (6 − 2) ÷ (6 − 4)."
      },
      {
        "l": "أوجد المقطع الصادي \\(c\\) في \\(y = mx + c\\): \\(c =\\)",
        "a": "-6",
        "h": "احسب 2 − 2×4."
      },
      {
        "l": "أوجد الإحداثي الصادي لنقطة المنتصف \\(M\\): \\(y_M =\\)",
        "a": "4",
        "h": "متوسط 2 و6."
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
    "ti": "Order the Steps: Constructing the Perpendicular Bisector (Coordinate Geometry & Straight-Line Equations)",
    "ti_ar": "ترتيب الخطوات: إيجاد معادلة العمود المنصّف (الهندسة الإحداثية ومعادلات الخط المستقيم)",
    "prompt": "Order the steps to find the perpendicular bisector of segment \\(AB\\) with \\(A(4,2)\\) and \\(B(6,6)\\):",
    "prompt_ar": "رتّب خطوات إيجاد معادلة العمود المنصّف للقطعة \\(AB\\) حيث \\(A(4,2)\\) و\\(B(6,6)\\):",
    "items": [
      "Find the midpoint \\(M = (5, 4)\\) by averaging coordinates.",
      "Calculate the segment gradient \\(m_{AB} = 2\\).",
      "Invert and negate to get the perpendicular gradient \\(m_{\\perp} = -1/2\\).",
      "Write \\(y - 4 = -\\frac{1}{2}(x - 5)\\) and simplify."
    ],
    "items_ar": [
      "حساب نقطة المنتصف \\(M = (5, 4)\\) بأخذ متوسط الإحداثيات.",
      "حساب ميل القطعة المستقيمة \\(m_{AB} = 2\\).",
      "إيجاد المقلوب السالب للحصول على ميل العمودي \\(m_{\\perp} = -1/2\\).",
      "التعويض في صيغة نقطة وميل \\(y - 4 = -\\frac{1}{2}(x - 5)\\)."
    ],
    "ex": "Midpoint → segment slope → negative reciprocal → point-slope equation.",
    "ex_ar": "نقطة المنتصف ← ميل القطعة ← المقلوب السالب ← معادلة المستقيم."
  },
  {
    "t": "cat",
    "ti": "Categorize: Line Pair Relationships (Coordinate Geometry & Straight-Line Equations)",
    "ti_ar": "تصنيف: العلاقة بين أزواج المستقيمات (الهندسة الإحداثية ومعادلات الخط المستقيم)",
    "categories": [
      "Parallel",
      "Perpendicular",
      "Intersecting (Non-Perpendicular)"
    ],
    "categories_ar": [
      "متوازيان",
      "متعامدان",
      "متقاطعان غير متعامدين"
    ],
    "items": [
      {
        "s": "\\(y = 2x + 1\\) and \\(y = 2x - 4\\)",
        "cat": 0
      },
      {
        "s": "\\(y = 2x + 2\\) and \\(y = -\\frac{1}{2}x + 5\\)",
        "cat": 1
      },
      {
        "s": "\\(y = 2x\\) and \\(y = 3x - 3\\)",
        "cat": 2
      }
    ],
    "items_ar": [
      {
        "s": "\\(y = 2x + 1\\) و\\(y = 2x - 4\\)",
        "cat": 0
      },
      {
        "s": "\\(y = 2x + 2\\) و\\(y = -\\frac{1}{2}x + 5\\)",
        "cat": 1
      },
      {
        "s": "\\(y = 2x\\) و\\(y = 3x - 3\\)",
        "cat": 2
      }
    ],
    "ex": "Compare gradients \\(m_1 = m_2\\) (parallel), \\(m_1 m_2 = -1\\) (perpendicular), otherwise oblique intersection.",
    "ex_ar": "نقارن الميلين: متساويان للتوازي، وحاصل ضربهما \\(-1\\) للتعامد."
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
    "ti": "True / False: Circle Theorems & Solid Mensuration (Circle Theorems, Polygons & Geometric Similarity)",
    "ti_ar": "صح أم خطأ: نظريات الدائرة وقوانين القياس الهندسي (نظريات الدائرة والمضلعات والتشابه الهندسي في الفراغ)",
    "items": [
      {
        "s": "Inscribed angle in a semicircle corresponds to Always \\(90^\\circ\\) (Thales’ theorem).",
        "a": true,
        "ex": "Verified identity: Always \\(90^\\circ\\) (Thales’ theorem)."
      },
      {
        "s": "Opposite angles of a cyclic quadrilateral corresponds to \\(V_{\\text{cone}} = \\frac{1}{3} \\pi r^2 h\\).",
        "a": false,
        "ex": "Actually, Opposite angles of a cyclic quadrilateral corresponds to Supplementary (\\(\\alpha + \\gamma = 180^\\circ\\))."
      },
      {
        "s": "Power of a Point (intersecting chords) corresponds to \\(PA \\cdot PB = PC \\cdot PD\\).",
        "a": true,
        "ex": "Correct: \\(PA \\cdot PB = PC \\cdot PD\\)."
      }
    ],
    "items_ar": [
      {
        "s": "الزاوية المحيطية المرسومة في نصف دائرة يكافئ تساوي دائماً \\(90^\\circ\\) (مبرهنة طاليس).",
        "a": true,
        "ex": "علاقة صحيحة: تساوي دائماً \\(90^\\circ\\) (مبرهنة طاليس)."
      },
      {
        "s": "الزاويتان المتقابلتان في الرباعي الدائري يكافئ \\(V_{\\text{cone}} = \\frac{1}{3} \\pi r^2 h\\).",
        "a": false,
        "ex": "الصواب أن الزاويتان المتقابلتان في الرباعي الدائري يكافئ متكاملتان ومجموعهما \\(180^\\circ\\)."
      },
      {
        "s": "قوة نقطة بالنسبة لدائرة (الأوتار المتقاطعة) يكافئ \\(PA \\cdot PB = PC \\cdot PD\\).",
        "a": true,
        "ex": "صحيح: \\(PA \\cdot PB = PC \\cdot PD\\)."
      }
    ]
  },
  {
    "t": "mt",
    "ti": "Matching: Circle Theorems & Solid Mensuration (Circle Theorems, Polygons & Geometric Similarity)",
    "ti_ar": "مطابقة: نظريات الدائرة وقوانين القياس الهندسي (نظريات الدائرة والمضلعات والتشابه الهندسي في الفراغ)",
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
  },
  {
    "t": "se",
    "ti": "Spot the Error: Area & Volume Similarity Scaling (Circle Theorems, Polygons & Geometric Similarity)",
    "ti_ar": "اكتشف الخطأ: معامل تشابه المساحات والحجوم (نظريات الدائرة والمضلعات والتشابه الهندسي في الفراغ)",
    "q": "Two similar solids have linear scale factor \\(k = 3\\). The smaller solid has surface area \\(10\\text{ cm}^2\\). Where is the error?",
    "q_ar": "مجسمان متشابهان معامل التشابه الخطي بينهما \\(k = 3\\)، ومساحة سطح الأصغر \\(10\\text{ cm}^2\\). أين الخطأ؟",
    "steps": [
      "Identify the linear ratio of corresponding edges as \\(1 : 3\\).",
      "Multiply the surface area directly by \\(3\\) instead of \\(3^2\\): \\(A_{\\text{large}} = 10 \\times 3 = 30\\text{ cm}^2\\).",
      "Report \\(30\\text{ cm}^2\\) as the larger surface area."
    ],
    "steps_ar": [
      "تحديد نسبة التشابه الخطي للأضلاع المتناظرة \\(1 : 3\\).",
      "ضرب المساحة السطحية في \\(3\\) مباشرة بدلاً من \\(3^2\\): \\(A = 30\\text{ cm}^2\\).",
      "اعتماد الناتج كمساحة للمجسم الأكبر."
    ],
    "errorStep": 2,
    "reasons": [
      "Areas of similar figures scale by \\(k^2 = 9\\) (giving \\(90\\text{ cm}^2\\)), and volumes scale by \\(k^3 = 27\\).",
      "Areas scale by \\(\\sqrt{k}\\).",
      "Similar solids always have equal surface areas."
    ],
    "reasons_ar": [
      "نسبة المساحات تساوي مربع معامل التشابه \\(k^2 = 9\\) (أي \\(90\\text{ cm}^2\\))، ونسبة الحجوم \\(k^3 = 27\\).",
      "المساحات تتناسب مع \\(\\sqrt{k}\\).",
      "المجسمات المتشابهة متساوية المساحة دائماً."
    ],
    "correctReason": 0
  },
  {
    "t": "ms",
    "ti": "Examiner Mode: Circle Theorems, Sectors & Similarity (Circle Theorems, Polygons & Geometric Similarity)",
    "ti_ar": "وضع المصحح: نظريات الدائرة والقطاعات والتشابه (نظريات الدائرة والمضلعات والتشابه الهندسي في الفراغ)",
    "q": "A circle has equation \\((x - 1)^2 + (y + 3)^2 = 16\\). (a) State its center and radius \\(r\\). (b) A sector of this circle subtends \\(\\theta = \\frac{\\pi}{2}\\) radians; find exact arc length and sector area in terms of \\(\\pi\\).",
    "q_ar": "دائرة معادلتها \\((x - 1)^2 + (y + 3)^2 = 16\\). (أ) اذكر المركز ونصف القطر \\(r\\). (ب) قطاع في هذه الدائرة زاويته المركزية \\(\\theta = \\frac{\\pi}{2}\\) راديان؛ أوجد طول القوس ومساحة القطاع بدلالة \\(\\pi\\).",
    "parts": [
      {
        "label": "Part (a) — Circle Center & Radius",
        "marks": 2,
        "rubric": [
          {
            "code": "B1",
            "marks": 1,
            "text": "Center \\((h, k) = (1, -3)\\)."
          },
          {
            "code": "B1",
            "marks": 1,
            "text": "Radius \\(r = \\sqrt{16} = 4\\)."
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
            "text": "Arc length \\(s = r\\theta = 4 \\cdot \\frac{\\pi}{2} = 2\\pi\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "Sector area \\(A = \\frac{1}{2} r^2 \\theta = \\frac{1}{2}(16)\\frac{\\pi}{2} = 4\\pi\\)."
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
            "text": "المركز \\((1, -3)\\)."
          },
          {
            "code": "B1",
            "marks": 1,
            "text": "نصف القطر \\(r = \\sqrt{16} = 4\\)."
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
            "text": "طول القوس \\(s = r\\theta = 2\\pi\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "مساحة القطاع \\(A = \\frac{1}{2} r^2 \\theta = 4\\pi\\)."
          }
        ]
      }
    ]
  },
  {
    "t": "sb",
    "ti": "Step Builder: Circle Radius, Polygon Angles & Similarity (Circle Theorems, Polygons & Geometric Similarity)",
    "ti_ar": "بناء الخطوات: الدائرة وزوايا المضلعات والتشابه (نظريات الدائرة والمضلعات والتشابه الهندسي في الفراغ)",
    "steps": [
      {
        "l": "From \\((x - 1)^2 + (y + 3)^2 = 16\\), find the radius \\(r =\\)",
        "a": "4",
        "h": "Take the square root of 16."
      },
      {
        "l": "With linear similarity ratio \\(1 : 3\\), find the volume ratio \\(1 : k^3\\) where \\(k^3 =\\)",
        "a": "27",
        "h": "Cube 3."
      },
      {
        "l": "Find one exterior angle (in degrees) of a regular \\(6\\)-sided hexagon:",
        "a": "60",
        "h": "Compute 360 / 6."
      }
    ],
    "steps_ar": [
      {
        "l": "من المعادلة \\((x - 1)^2 + (y + 3)^2 = 16\\)، أوجد نصف القطر \\(r =\\)",
        "a": "4",
        "h": "خذ الجذر التربيعي للعدد 16."
      },
      {
        "l": "إذا كانت نسبة التشابه الخطي \\(1 : 3\\)، فإن نسبة الحجوم \\(k^3 =\\)",
        "a": "27",
        "h": "احسب مكعب 3."
      },
      {
        "l": "أوجد قياس الزاوية الخارجية بالدرجات لمضلع سداسي منتظم:",
        "a": "60",
        "h": "احسب 360 ÷ 6."
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
    "ti": "Order the Steps: Center & Radius from General Circle Equation (Circle Theorems, Polygons & Geometric Similarity)",
    "ti_ar": "ترتيب الخطوات: استخراج المركز ونصف القطر للدائرة (نظريات الدائرة والمضلعات والتشابه الهندسي في الفراغ)",
    "prompt": "Order the steps to find the center and radius of \\(x^2 + y^2 - 2x + 6y = 6\\):",
    "prompt_ar": "رتّب خطوات إيجاد المركز ونصف القطر للدائرة \\(x^2 + y^2 - 2x + 6y = 6\\):",
    "items": [
      "Group \\(x\\)-terms and \\(y\\)-terms separately on the left-hand side.",
      "Add \\(1\\) and \\(9\\) to both sides to complete both squares.",
      "Rewrite as \\((x - 1)^2 + (y + 3)^2 = 16\\).",
      "Read off center \\((1, -3)\\) and radius \\(r = 4\\)."
    ],
    "items_ar": [
      "تجميع حدود \\(x\\) وحدود \\(y\\) كلٌ على حدة في الطرف الأيسر.",
      "إضافة \\(1\\) و\\(9\\) للطرفين لإكمال المربعين.",
      "كتابة المعادلة بالصيغة القياسية \\((x - 1)^2 + (y + 3)^2 = 16\\).",
      "قراءة المركز \\((1, -3)\\) ونصف القطر \\(r = 4\\)."
    ],
    "ex": "Group variables → balance both completed squares → standard circle form → center & radius.",
    "ex_ar": "تجميع المتغيرات ← إكمال المربعين في الطرفين ← الصيغة القياسية ← المركز ونصف القطر."
  },
  {
    "t": "cat",
    "ti": "Categorize: Scaling Factor Dimension (\\(k, k^2, k^3\\)) (Circle Theorems, Polygons & Geometric Similarity)",
    "ti_ar": "تصنيف: بُعد معامل التشابه (\\(k, k^2, k^3\\)) (نظريات الدائرة والمضلعات والتشابه الهندسي في الفراغ)",
    "categories": [
      "Scales by \\(k\\)",
      "Scales by \\(k^2\\)",
      "Scales by \\(k^3\\)"
    ],
    "categories_ar": [
      "يتناسب مع \\(k\\)",
      "يتناسب مع \\(k^2\\)",
      "يتناسب مع \\(k^3\\)"
    ],
    "items": [
      {
        "s": "Perimeter & altitude of similar triangles",
        "cat": 0
      },
      {
        "s": "Total surface area of similar cones",
        "cat": 1
      },
      {
        "s": "Interior volume of similar spheres",
        "cat": 2
      }
    ],
    "items_ar": [
      {
        "s": "المحيط والارتفاع في المثلثات المتشابهة",
        "cat": 0
      },
      {
        "s": "المساحة السطحية الكلية للمخاريط المتشابهة",
        "cat": 1
      },
      {
        "s": "الحجم الداخلي للكرات المتشابهة",
        "cat": 2
      }
    ],
    "ex": "1D lengths scale by \\(k\\), 2D areas by \\(k^2\\), and 3D volumes by \\(k^3\\).",
    "ex_ar": "الأطوال تتناسب مع \\(k\\)، والمساحات مع \\(k^2\\)، والحجوم مع \\(k^3\\)."
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
    "ti": "True / False: Trigonometric & Inverse-Trig Identities (3D Trigonometry, Sine/Cosine Rules & Vector Proofs)",
    "ti_ar": "صح أم خطأ: المتطابقات المثلثية والفروع العكسية (حساب المثلثات ثلاثي الأبعاد وقوانين الجيب وجيب التمام وبراهين المتجهات)",
    "items": [
      {
        "s": "\\(1 + \\tan^2\\theta\\) corresponds to \\(\\sec^2\\theta\\).",
        "a": true,
        "ex": "Verified identity: \\(\\sec^2\\theta\\)."
      },
      {
        "s": "Cosine Rule for side \\(c\\) corresponds to \\([0, \\pi]\\).",
        "a": false,
        "ex": "Actually, Cosine Rule for side \\(c\\) corresponds to \\(c^2 = a^2 + b^2 - 2ab\\cos C\\)."
      },
      {
        "s": "Period of \\(6\\sin(4x)\\) corresponds to \\(\\dfrac{2\\pi}{4}\\).",
        "a": true,
        "ex": "Correct: \\(\\dfrac{2\\pi}{4}\\)."
      }
    ],
    "items_ar": [
      {
        "s": "\\(1 + \\tan^2\\theta\\) يكافئ \\(\\sec^2\\theta\\).",
        "a": true,
        "ex": "علاقة صحيحة: \\(\\sec^2\\theta\\)."
      },
      {
        "s": "قانون جيب التمام للضلع \\(c\\) يكافئ \\([0, \\pi]\\).",
        "a": false,
        "ex": "الصواب أن قانون جيب التمام للضلع \\(c\\) يكافئ \\(c^2 = a^2 + b^2 - 2ab\\cos C\\)."
      },
      {
        "s": "دورة الدالة \\(6\\sin(4x)\\) يكافئ \\(\\dfrac{2\\pi}{4}\\).",
        "a": true,
        "ex": "صحيح: \\(\\dfrac{2\\pi}{4}\\)."
      }
    ]
  },
  {
    "t": "mt",
    "ti": "Matching: Trigonometric & Inverse-Trig Identities (3D Trigonometry, Sine/Cosine Rules & Vector Proofs)",
    "ti_ar": "مطابقة: المتطابقات المثلثية والفروع العكسية (حساب المثلثات ثلاثي الأبعاد وقوانين الجيب وجيب التمام وبراهين المتجهات)",
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
        "l": "Period of \\(6\\sin(4x)\\)",
        "r": "\\(\\dfrac{2\\pi}{4}\\)"
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
        "l": "دورة الدالة \\(6\\sin(4x)\\)",
        "r": "\\(\\dfrac{2\\pi}{4}\\)"
      }
    ]
  },
  {
    "t": "se",
    "ti": "Spot the Error: Quadrant Sign & Dividing by \\(\\sin\\theta\\) (3D Trigonometry, Sine/Cosine Rules & Vector Proofs)",
    "ti_ar": "اكتشف الخطأ: إشارة الربع والقسمة على \\(\\sin\\theta\\) (حساب المثلثات ثلاثي الأبعاد وقوانين الجيب وجيب التمام وبراهين المتجهات)",
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
    "ti": "Examiner Mode: Quadrant Identities & Cosine Rule (3D Trigonometry, Sine/Cosine Rules & Vector Proofs)",
    "ti_ar": "وضع المصحح: المتطابقات المثلثية وقانون جيب التمام (حساب المثلثات ثلاثي الأبعاد وقوانين الجيب وجيب التمام وبراهين المتجهات)",
    "q": "Suppose \\(\\sin\\theta = \\dfrac{8}{17}\\) with \\(\\theta \\in \\left(\\frac{\\pi}{2}, \\pi\\right)\\) (Quadrant II). (a) Find exact values of \\(\\cos\\theta\\) and \\(\\tan\\theta\\). (b) Evaluate \\(\\sin(2\\theta)\\).",
    "q_ar": "إذا كان \\(\\sin\\theta = \\dfrac{8}{17}\\) حيث \\(\\theta \\in \\left(\\frac{\\pi}{2}, \\pi\\right)\\) (الربع الثاني). (أ) أوجد القيمة الدقيقة لكل من \\(\\cos\\theta\\) و\\(\\tan\\theta\\). (ب) احسب \\(\\sin(2\\theta)\\).",
    "parts": [
      {
        "label": "Part (a) — Quadrant II Cosine & Tangent",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "\\(\\cos^2\\theta = 1 - \\frac{64}{289} = \\frac{225}{289}\\), negative in QII \\(\\implies \\cos\\theta = -\\frac{15}{17}\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "\\(\\tan\\theta = \\frac{\\sin\\theta}{\\cos\\theta} = -\\frac{8}{15}\\)."
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
            "text": "\\(\\sin(2\\theta) = 2\\left(\\frac{8}{17}\\right)\\left(-\\frac{15}{17}\\right) = -\\frac{240}{289}\\)."
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
            "text": "في الربع الثاني \\(\\cos\\theta < 0\\) ومن متطابقة فيثاغورس \\(\\cos\\theta = -\\frac{15}{17}\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "\\(\\tan\\theta = -\\frac{8}{15}\\)."
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
            "text": "\\(\\sin(2\\theta) = -\\frac{240}{289}\\)."
          }
        ]
      }
    ]
  },
  {
    "t": "sb",
    "ti": "Step Builder: Sinusoidal Amplitude, Period & Exact Ratios (3D Trigonometry, Sine/Cosine Rules & Vector Proofs)",
    "ti_ar": "بناء الخطوات: السعة والدورة والنسب المثلثية (حساب المثلثات ثلاثي الأبعاد وقوانين الجيب وجيب التمام وبراهين المتجهات)",
    "steps": [
      {
        "l": "State the amplitude of \\(y = -6\\cos(4x)\\):",
        "a": "6",
        "h": "Amplitude is |A| > 0."
      },
      {
        "l": "If \\(\\tan\\theta = \\frac{8}{15}\\) for acute \\(\\theta\\), find \\(\\sec\\theta\\) numerator over \\(15\\):",
        "a": "17",
        "h": "Hypotenuse of (8, 15) right triangle."
      },
      {
        "l": "Convert \\(\\pi / 3\\) radians into degrees:",
        "a": "60",
        "h": "Multiply 180 by 1/3."
      }
    ],
    "steps_ar": [
      {
        "l": "اذكر سعة الدالة \\(y = -6\\cos(4x)\\):",
        "a": "6",
        "h": "السعة تساوي القيمة المطلقة |A|."
      },
      {
        "l": "إذا كان \\(\\tan\\theta = \\frac{8}{15}\\) لزاوية حادة، فما بسط \\(\\sec\\theta\\) المقامه \\(15\\)؟",
        "a": "17",
        "h": "وتر المثلث القائم ذي الضلعين 8 و15."
      },
      {
        "l": "حوّل \\(\\pi / 3\\) راديان إلى درجات:",
        "a": "60",
        "h": "احسب 180 ÷ 3."
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
    "ti": "Order the Steps: Solving a Triangle via Cosine & Sine Rules (3D Trigonometry, Sine/Cosine Rules & Vector Proofs)",
    "ti_ar": "ترتيب الخطوات: حل مثلث بقانوني جيب التمام والجيب (حساب المثلثات ثلاثي الأبعاد وقوانين الجيب وجيب التمام وبراهين المتجهات)",
    "prompt": "Given SAS data (sides \\(a, b\\) and included angle \\(C\\)), order the steps to solve \\(\\triangle ABC\\):",
    "prompt_ar": "بمعلومية ضلعين والزاوية المحصورة \\((a, b, C)\\)، رتّب خطوات حل المثلث \\(\\triangle ABC\\):",
    "items": [
      "Compute \\(c^2 = a^2 + b^2 - 2ab\\cos C\\) using the Cosine Rule.",
      "Take the positive square root \\(c = \\sqrt{c^2}\\).",
      "Apply the Sine Rule (or Cosine Rule) to find the smaller remaining angle first (avoiding obtuse ambiguity).",
      "Subtract the two known angles from \\(180^\\circ\\) to obtain the third angle."
    ],
    "items_ar": [
      "حساب \\(c^2 = a^2 + b^2 - 2ab\\cos C\\) بقانون جيب التمام.",
      "أخذ الجذر الموجب لإيجاد الضلع الثالث \\(c\\).",
      "استعمال قانون الجيب لإيجاد الزاوية المقابلة للضلع الأصغر لتجنب التباس الزاوية المنفرجة.",
      "طرح مجموع الزاويتين من \\(180^\\circ\\) لإيجاد الزاوية الثالثة."
    ],
    "ex": "Cosine Rule for third side → smaller angle via Sine Rule → angle sum 180°.",
    "ex_ar": "قانون جيب التمام للضلع الثالث ← الزاوية الصغرى بقانون الجيب ← مجموع زوايا المثلث 180°."
  },
  {
    "t": "cat",
    "ti": "Categorize: Sign of Trigonometric Ratios in Quadrant II (3D Trigonometry, Sine/Cosine Rules & Vector Proofs)",
    "ti_ar": "تصنيف: إشارة النسب المثلثية في الربع الثاني (حساب المثلثات ثلاثي الأبعاد وقوانين الجيب وجيب التمام وبراهين المتجهات)",
    "categories": [
      "Positive in Quadrant II",
      "Negative in Quadrant II"
    ],
    "categories_ar": [
      "موجبة في الربع الثاني",
      "سالبة في الربع الثاني"
    ],
    "items": [
      {
        "s": "\\(\\sin\\theta\\) and \\(\\csc\\theta\\)",
        "cat": 0
      },
      {
        "s": "\\(\\cos\\theta\\) and \\(\\sec\\theta\\)",
        "cat": 1
      },
      {
        "s": "\\(\\tan\\theta\\) and \\(\\cot\\theta\\)",
        "cat": 1
      }
    ],
    "items_ar": [
      {
        "s": "\\(\\sin\\theta\\) و\\(\\csc\\theta\\)",
        "cat": 0
      },
      {
        "s": "\\(\\cos\\theta\\) و\\(\\sec\\theta\\)",
        "cat": 1
      },
      {
        "s": "\\(\\tan\\theta\\) و\\(\\cot\\theta\\)",
        "cat": 1
      }
    ],
    "ex": "In Quadrant II (\\(x < 0, y > 0\\)), only \\(\\sin\\theta\\) and \\(\\csc\\theta\\) are positive.",
    "ex_ar": "في الربع الثاني (\\(x < 0, y > 0\\)) يكون الجيب وقاطع التمام فقط موجبين."
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
    "ti": "True / False: Power-Rule Differentiation, Turning Points & Kinematics",
    "ti_ar": "صح أم خطأ: اشتقاق قوى x والنقاط الحرجة والحركة المستقيمة",
    "items": [
      {
        "s": "To differentiate \\(y = \\dfrac{4}{x^2}\\), rewrite as \\(4x^{-2}\\) so \\(\\dfrac{dy}{dx} = -8x^{-3}\\).",
        "s_ar": "لاشتقاق \\(y = \\dfrac{4}{x^2}\\) نكتبها \\(4x^{-2}\\) فتكون المشتقة \\(-8x^{-3}\\).",
        "a": true,
        "ex": "Multiply by power \\(-2\\) and subtract \\(1\\) from the exponent: \\(-2 \\to -3\\).",
        "ex_ar": "نضرب في الأس \\(-2\\) ونطرح \\(1\\) من الأس ليصبح \\(-3\\)."
      },
      {
        "s": "A particle with displacement \\(s(t)\\) is instantaneously at rest whenever acceleration \\(a(t) = 0\\).",
        "s_ar": "يسكن الجسيم لحظياً عندما ينعدم التسارع \\(a(t) = 0\\).",
        "a": false,
        "ex": "Instantaneous rest occurs when velocity \\(v(t) = ds/dt = 0\\), not when \\(a(t) = 0\\).",
        "ex_ar": "يحدث السكون اللحظي عند انعدام السرعة \\(v(t) = ds/dt = 0\\) وليس عند انعدام التسارع."
      },
      {
        "s": "At a local maximum turning point, \\(\\dfrac{dy}{dx} = 0\\) and the gradient changes from positive to negative.",
        "s_ar": "عند نقطة النهاية العظمى المحلية يكون \\(\\dfrac{dy}{dx} = 0\\) ويتغير الميل من موجب إلى سالب.",
        "a": true,
        "ex": "Rising then stationary then falling characterizes a local maximum.",
        "ex_ar": "تزايد الدالة ثم سكونها ثم تناقصها يحدد النهاية العظمى المحلية."
      }
    ]
  },
  {
    "t": "mt",
    "ti": "Matching: IGCSE Differentiation & Kinematics Relationships",
    "ti_ar": "مطابقة: قواعد التفاضل وعلاقات الحركة المستقيمة (IGCSE)",
    "p": [
      {
        "l": "Derivative of \\(y = ax^n\\)",
        "r": "\\(\\dfrac{dy}{dx} = anx^{n-1}\\)"
      },
      {
        "l": "Stationary turning point condition",
        "r": "\\(\\dfrac{dy}{dx} = 0\\)"
      },
      {
        "l": "Velocity \\(v(t)\\) from displacement \\(s(t)\\)",
        "r": "\\(v = \\dfrac{ds}{dt}\\)"
      },
      {
        "l": "Acceleration \\(a(t)\\) from velocity \\(v(t)\\)",
        "r": "\\(a = \\dfrac{dv}{dt}\\)"
      }
    ],
    "p_ar": [
      {
        "l": "مشتقة \\(y = ax^n\\)",
        "r": "\\(\\dfrac{dy}{dx} = anx^{n-1}\\)"
      },
      {
        "l": "شرط النقطة الحرجة (نقطة التحول)",
        "r": "\\(\\dfrac{dy}{dx} = 0\\)"
      },
      {
        "l": "السرعة \\(v(t)\\) من دالة الإزاحة \\(s(t)\\)",
        "r": "\\(v = \\dfrac{ds}{dt}\\)"
      },
      {
        "l": "التسارع \\(a(t)\\) من دالة السرعة \\(v(t)\\)",
        "r": "\\(a = \\dfrac{dv}{dt}\\)"
      }
    ]
  },
  {
    "t": "se",
    "ti": "Spot the Error: Differentiating Negative Powers of x",
    "ti_ar": "اكتشف الخطأ: اشتقاق القوى السالبة لـ x",
    "q": "A student differentiates \\(y = 3x^2 - \\dfrac{6}{x}\\). Which step contains an error?",
    "q_ar": "يشتق طالب الدالة \\(y = 3x^2 - \\dfrac{6}{x}\\). أي خطوة تتضمن خطأ؟",
    "steps": [
      "Rewrite \\(-\\dfrac{6}{x}\\) in index form as \\(-6x^{-1}\\).",
      "Differentiate \\(3x^2\\) to obtain \\(6x\\).",
      "Differentiate \\(-6x^{-1}\\) by multiplying \\((-6)(-1) = +6\\) and changing exponent \\(-1\\) to \\(0\\), writing \\(+6x^0 = 6\\).",
      "Combine terms as \\(\\dfrac{dy}{dx} = 6x + 6\\)."
    ],
    "steps_ar": [
      "إعادة كتابة \\(-\\dfrac{6}{x}\\) بالصورة الأسية \\(-6x^{-1}\\).",
      "اشتقاق \\(3x^2\\) للحصول على \\(6x\\).",
      "اشتقاق \\(-6x^{-1}\\) بضرب المعاملات وزيادة الأس من \\(-1\\) إلى \\(0\\) ليكتب \\(+6\\).",
      "كتابة الناتج \\(\\dfrac{dy}{dx} = 6x + 6\\)."
    ],
    "errorStep": 3,
    "reasons": [
      "Subtracting \\(1\\) from exponent \\(-1\\) gives \\(-1 - 1 = -2\\), so \\(\\frac{d}{dx}(-6x^{-1}) = +6x^{-2} = \\frac{6}{x^2}\\).",
      "\\(-\\dfrac{6}{x}\\) rewrites as \\(-6x^{+1}\\).",
      "The derivative of \\(3x^2\\) is \\(3x\\)."
    ],
    "reasons_ar": [
      "طرح \\(1\\) من الأس \\(-1\\) يعطي \\(-2\\)، لذا فالمشتقة هي \\(+6x^{-2} = \\frac{6}{x^2}\\).",
      "تُكتب \\(-\\dfrac{6}{x}\\) على الصورة \\(-6x^{+1}\\).",
      "مشتقة \\(3x^2\\) هي \\(3x\\)."
    ],
    "correctReason": 0
  },
  {
    "t": "ms",
    "ti": "Examiner Mode: Stationary Turning Points & Particle Kinematics",
    "ti_ar": "وضع المصحح: النقاط الحرجة وحركة الجسيم على خط مستقيم",
    "q": "A particle moves along a straight line with displacement \\(s = t^3 - 6t^2 + 9t + 4\\) metres at \\(t \\ge 0\\) seconds. (a) Find the times when the particle is instantaneously at rest. (b) Find the acceleration at \\(t = 4\\text{ s}\\).",
    "q_ar": "يتحرك جسيم بحيث إزاحته \\(s = t^3 - 6t^2 + 9t + 4\\) متر عند \\(t \\ge 0\\). (أ) أوجد اللحظتين اللتين يسكن فيهما الجسيم لحظياً. (ب) أوجد التسارع عند \\(t = 4\\).",
    "parts": [
      {
        "label": "Part (a) — Velocity v = ds/dt = 0",
        "marks": 3,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "Differentiate: \\(v = \\dfrac{ds}{dt} = 3t^2 - 12t + 9\\)."
          },
          {
            "code": "M1",
            "marks": 1,
            "text": "Set \\(3(t - 1)(t - 3) = 0\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "\\(t = 1\\text{ s}\\) and \\(t = 3\\text{ s}\\)."
          }
        ]
      },
      {
        "label": "Part (b) — Acceleration a = dv/dt",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "Differentiate velocity: \\(a = \\dfrac{dv}{dt} = 6t - 12\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "At \\(t = 4\\), \\(a = 24 - 12 = 12\\text{ m/s}^2\\)."
          }
        ]
      }
    ],
    "parts_ar": [
      {
        "label": "الجزء (أ) — انعدام السرعة v = ds/dt = 0",
        "marks": 3,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "الاشتقاق: \\(v = 3t^2 - 12t + 9\\)."
          },
          {
            "code": "M1",
            "marks": 1,
            "text": "التحليل: \\(3(t - 1)(t - 3) = 0\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "\\(t = 1\\text{ s}\\) و\\(t = 3\\text{ s}\\)."
          }
        ]
      },
      {
        "label": "الجزء (ب) — حساب التسارع a = dv/dt",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "اشتقاق السرعة: \\(a = 6t - 12\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "عند \\(t = 4\\) يكون التسارع \\(12\\text{ m/s}^2\\)."
          }
        ]
      }
    ]
  },
  {
    "t": "sb",
    "ti": "Step Builder: Gradient & Tangent Equation to a Cubic Curve",
    "ti_ar": "بناء الخطوات: ميل المماس ومعادلته لمنحنى تكعيبي",
    "steps": [
      {
        "l": "For \\(y = x^3 - 4x + 1\\), evaluate \\(\\dfrac{dy}{dx} = 3x^2 - 4\\) at \\(x = 2\\):",
        "a": "8",
        "h": "\\(3(4) - 4 = 8\\)"
      },
      {
        "l": "Find the \\(y\\)-coordinate on the curve at \\(x = 2\\):",
        "a": "1",
        "h": "\\(8 - 8 + 1 = 1\\)"
      },
      {
        "l": "Find \\(c\\) in the tangent line \\(y = 8x + c\\) through \\((2, 1)\\):",
        "a": "-15",
        "h": "\\(1 = 16 + c \\implies c = -15\\)"
      }
    ],
    "steps_ar": [
      {
        "l": "للمنحنى \\(y = x^3 - 4x + 1\\)، احسب الميل \\(3x^2 - 4\\) عند \\(x = 2\\):",
        "a": "8",
        "h": "\\(3(4) - 4 = 8\\)"
      },
      {
        "l": "أوجد الإحداثي \\(y\\) عند \\(x = 2\\):",
        "a": "1",
        "h": "\\(8 - 8 + 1 = 1\\)"
      },
      {
        "l": "أوجد المقطع \\(c\\) لمعادلة المماس \\(y = 8x + c\\) المار بـ \\((2, 1)\\):",
        "a": "-15",
        "h": "\\(1 - 16 = -15\\)"
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
    "ti": "Order the Steps: Classifying Stationary Points (Differentiation, Turning Points & Kinematics)",
    "ti_ar": "ترتيب الخطوات: تحديد وتصنيف النقاط الحرجة (التفاضل والنقاط الحرجة وتطبيقات الحركة المستقيمة)",
    "prompt": "Order the analytical steps to find and classify local extrema of \\(y = f(x)\\):",
    "prompt_ar": "رتّب الخطوات التحليلية لإيجاد وتصنيف القيم القصوى المحلية للدالة \\(y = f(x)\\):",
    "items": [
      "Differentiate \\(f(x)\\) to obtain the first derivative \\(f'(x)\\).",
      "Solve \\(f'(x) = 0\\) (and check points where \\(f'\\) is undefined) to locate critical numbers \\(c\\).",
      "Evaluate \\(f''(c)\\) (or sign change of \\(f'\\)) to classify each critical point as max, min, or inflection.",
      "Substitute \\(x = c\\) back into the original \\(f(x)\\) to state exact coordinates \\((c, f(c))\\)."
    ],
    "items_ar": [
      "اشتقاق الدالة لإيجاد المشتقة الأولى \\(f'(x)\\).",
      "حل المعادلة \\(f'(x) = 0\\) لتحديد القيم الحرجة \\(c\\).",
      "اختبار إشارة المشتقة الثانية \\(f''(c)\\) لتصنيف النقطة إلى عظمى أو صغرى.",
      "التعويض في الدالة الأصلية \\(f(c)\\) لكتابة إحداثيات النقطة الكاملة."
    ],
    "ex": "Find \\(f'\\) → solve \\(f'=0\\) → apply second-derivative/sign test → compute \\(f(c)\\).",
    "ex_ar": "إيجاد المشتقة الأولى ← مساواتها بالصفر ← اختبار المشتقة الثانية ← حساب الإحداثي الصادي."
  },
  {
    "t": "cat",
    "ti": "Categorize: Derivative & Second-Derivative Sign Meaning (Differentiation, Turning Points & Kinematics)",
    "ti_ar": "تصنيف: دلالة إشارة المشتقتين الأولى والثانية (التفاضل والنقاط الحرجة وتطبيقات الحركة المستقيمة)",
    "categories": [
      "Local Minimum",
      "Local Maximum",
      "Concave Up & Increasing"
    ],
    "categories_ar": [
      "قيمة صغرى محلية",
      "قيمة عظمى محلية",
      "متزايدة ومقعرة لأعلى"
    ],
    "items": [
      {
        "s": "\\(f'(c) = 0\\) and \\(f''(c) = +4 > 0\\)",
        "cat": 0
      },
      {
        "s": "\\(f'(c) = 0\\) and \\(f''(c) = -4 < 0\\)",
        "cat": 1
      },
      {
        "s": "\\(f'(x) > 0\\) and \\(f''(x) > 0\\)",
        "cat": 2
      }
    ],
    "items_ar": [
      {
        "s": "\\(f'(c) = 0\\) و\\(f''(c) = +4 > 0\\)",
        "cat": 0
      },
      {
        "s": "\\(f'(c) = 0\\) و\\(f''(c) = -4 < 0\\)",
        "cat": 1
      },
      {
        "s": "\\(f'(x) > 0\\) و\\(f''(x) > 0\\)",
        "cat": 2
      }
    ],
    "ex": "Zero slope + positive curvature is a local minimum; negative curvature is a local maximum.",
    "ex_ar": "انعدام الميل مع تقعر موجب يعطي صغرى محلية، ومع تقعر سالب يعطي عظمى محلية."
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
    "ti": "True / False: Statistical Measures & Outlier Robustness (Histograms, Cumulative Frequency & Tree Diagrams)",
    "ti_ar": "صح أم خطأ: المقاييس الإحصائية ومقاومة القيم المتطرفة (المدرجات التكرارية والتكرار المتجمع الصاعد وشجرة الاحتمالات)",
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
    "ti": "Matching: Center, Spread, Skewness & Rescaling Laws",
    "ti_ar": "مطابقة: مقاييس النزعة والتشتت والالتواء والتحويل الخطي",
    "p": [
      {
        "l": "Right-skewed distribution relationship",
        "r": "Mean is pulled above the median (\\(\\bar{x} > \\text{median}\\))"
      },
      {
        "l": "Tukey outlier criterion",
        "r": "Below \\(Q_1 - 1.5\\,\\text{IQR}\\) or above \\(Q_3 + 1.5\\,\\text{IQR}\\)"
      },
      {
        "l": "Effect of \\(y = ax + b\\) on standard deviation",
        "r": "\\(s_y = |a|\\, s_x\\) (shift \\(b\\) cancels out)"
      },
      {
        "l": "Histogram with unequal class widths",
        "r": "Bar height plots Frequency Density \\(= \\text{Frequency} / \\text{Class Width}\\)"
      }
    ],
    "p_ar": [
      {
        "l": "التوزيع الملتوي لليمين (موجب الالتواء)",
        "r": "ينجذب المتوسط فوق الوسيط (\\(\\bar{x} > \\text{الوسيط}\\))"
      },
      {
        "l": "قاعدة القيم المتطرفة الربيعية",
        "r": "أقل من \\(Q_1 - 1.5\\,\\text{IQR}\\) أو أكبر من \\(Q_3 + 1.5\\,\\text{IQR}\\)"
      },
      {
        "l": "أثر التحويل \\(y = ax + b\\) على الانحراف المعياري",
        "r": "\\(s_y = |a|\\, s_x\\) (لا يتأثر بالإزاحة \\(b\\))"
      },
      {
        "l": "المدرج التكراري غير متساوي الفئات",
        "r": "يمثل الارتفاع كثافة التكرار \\(= \\text{التكرار} \\div \\text{طول الفئة}\\)"
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
    "t": "sb",
    "ti": "Step Builder: Addition Rule, Conditional Probability & Complement Trick",
    "ti_ar": "بناء الخطوات: قاعدة الجمع والاحتمال الشرطي ومتممة «واحد على الأقل»",
    "steps": [
      {
        "l": "If \\(P(A) = 0.45\\), \\(P(B) = 0.35\\), and \\(P(A \\cap B) = 0.14\\), then \\(P(A \\cup B) =\\)",
        "a": "0.66",
        "h": "0.45 + 0.35 - 0.14"
      },
      {
        "l": "Using the same probabilities, conditional probability \\(P(A \\mid B) = \\dfrac{P(A \\cap B)}{P(B)} =\\)",
        "a": "0.4",
        "h": "0.14 / 0.35 = 0.4"
      },
      {
        "l": "A fair coin is tossed \\(3\\) times; \\(P(\\text{at least one Head}) = 1 - (0.5)^3 =\\)",
        "a": "0.875",
        "h": "1 - 0.125 = 0.875"
      }
    ],
    "steps_ar": [
      {
        "l": "إذا كان \\(P(A) = 0.45\\) و\\(P(B) = 0.35\\) و\\(P(A \\cap B) = 0.14\\)، فإن \\(P(A \\cup B) =\\)",
        "a": "0.66",
        "h": "0.45 + 0.35 - 0.14"
      },
      {
        "l": "الاحتمال الشرطي \\(P(A \\mid B) = \\dfrac{0.14}{0.35} =\\)",
        "a": "0.4",
        "h": "0.14 ÷ 0.35"
      },
      {
        "l": "عند رمي قطعة نقد متزنة \\(3\\) مرات، \\(P(\\text{صورة واحدة على الأقل}) =\\)",
        "a": "0.875",
        "h": "1 - 1/8 = 0.875"
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
    "ti": "Order the Steps: Estimating Interquartile Range from a Cumulative Frequency Curve",
    "ti_ar": "رتّب الخطوات: تقدير المدى الربيعي من منحنى التكرار المتجمع الصاعد",
    "q": "Arrange the steps in order to construct a cumulative frequency graph for \\(N = 80\\) observations and read the IQR:",
    "q_ar": "رتّب الخطوات لرسم منحنى التكرار المتجمع الصاعد لـ \\(N = 80\\) مفردة واستخراج المدى الربيعي:",
    "items": [
      "Accumulate running totals of class frequencies up to \\(N = 80\\).",
      "Plot cumulative frequencies against the UPPER class boundaries (not midpoints) and join smoothly.",
      "Read horizontally from \\(0.25 N = 20\\) and \\(0.75 N = 60\\) to the curve and drop vertically to read \\(Q_1\\) and \\(Q_3\\).",
      "Subtract \\(\\text{IQR} = Q_3 - Q_1\\)."
    ],
    "items_ar": [
      "حساب التكرار المتجمع الصاعد للفئات المتتالية وصولاً إلى \\(N = 80\\).",
      "تمثيل التكرار المتجمع مقابل الحدود الفعلية العليا للفئات (وليس مراكز الفئات).",
      "تحديد الموضعين \\(0.25 N = 20\\) و\\(0.75 N = 60\\) على المحور الرأسي وإسقاطهما لقراءة \\(Q_1\\) و\\(Q_3\\).",
      "طرح \\(\\text{IQR} = Q_3 - Q_1\\)."
    ]
  },
  {
    "t": "cat",
    "ti": "Categorize: Resistant vs. Non-Resistant Summary Statistics (Histograms, Cumulative Frequency & Tree Diagrams)",
    "ti_ar": "تصنيف: المقاييس المقاومة مقابل الحساسة للقيم المتطرفة (المدرجات التكرارية والتكرار المتجمع الصاعد وشجرة الاحتمالات)",
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
  }
];
});
