/* Interactive Practice data for /igcse/ - one entry per chapter section id.
   Shipped as public/js/ix/igcse.js and loaded only on that track's page by the
   engine in src/scripts/modules/19-interactive-activities-engine-v1.js
   (Plan 5 Phase 5.015, ADR 0033). Entry shapes (qc/mt/tf/sb/sr/fn/num/ord/cat/gp/se/ms) are
   documented there. */
(window.__ixData = window.__ixData || []).push(function (D) {
D["ig-number"] = [
  {
    "t": "qc",
    "ti": "Quick Check: Percentage",
    "ti_ar": "فحص سريع: النسبة المئوية",
    "q": "Find \\(15\\%\\) of \\(240\\)",
    "q_ar": "احسب \\(15\\%\\) من \\(240\\)",
    "o": [
      "30",
      "36",
      "24",
      "40"
    ],
    "o_ar": [
      "30",
      "36",
      "24",
      "40"
    ],
    "a": 1,
    "ex": "\\(0.15\\times240=36\\).",
    "ex_ar": "\\(0.15\\times240=36\\)."
  },
  {
    "t": "num",
    "ti": "Numeric Entry: Reverse Percentage",
    "ti_ar": "إدخال رقمي: النسبة المئوية العكسية",
    "q": "A coat is reduced by 20% in a sale to $72. What was the original price in dollars?",
    "q_ar": "معطف خُفّض سعره بنسبة 20% في التخفيضات ليصل إلى 72 دولاراً. ما سعره الأصلي بالدولار؟",
    "a": 90,
    "ex": "Sale price represents 80% of original: \\(0.80 \\times P = 72 \\Rightarrow P = 72 / 0.8 = 90\\).",
    "ex_ar": "سعر البيع يمثل 80% من السعر الأصلي: \\(0.80 \\times P = 72 \\Rightarrow P = 72 / 0.8 = 90\\)."
  },
  {
    "t": "ord",
    "ti": "Order the Steps: Standard Form Multiplication",
    "ti_ar": "ترتيب الخطوات: ضرب الأعداد بالصيغة المعيارية (العلمية)",
    "prompt": "Arrange the steps to compute \\((4 \\times 10^5) \\times (3 \\times 10^7)\\):",
    "prompt_ar": "رتّب خطوات حساب \\((4 \\times 10^5) \\times (3 \\times 10^7)\\):",
    "items": [
      "Multiply the leading coefficients: \\(4 \\times 3 = 12\\).",
      "Multiply the powers of 10 by adding exponents: \\(10^5 \\times 10^7 = 10^{12}\\).",
      "Combine: \\(12 \\times 10^{12}\\).",
      "Adjust to standard form (1 ≤ A < 10): \\(1.2 \\times 10^{13}\\)."
    ],
    "items_ar": [
      "اضرب المعاملين الرئيسيين: \\(4 \\times 3 = 12\\).",
      "اضرب قوى العدد 10 بجمع الأسس: \\(10^5 \\times 10^7 = 10^{12}\\).",
      "اجمع الناتجين: \\(12 \\times 10^{12}\\).",
      "عدّل الناتج إلى الصيغة المعيارية (1 ≤ A < 10): \\(1.2 \\times 10^{13}\\)."
    ],
    "ex": "Multiply coefficients, add exponents, and adjust leading value so 1 <= A < 10.",
    "ex_ar": "اضرب المعاملات، واجمع الأسس، وعدل المعامل ليكون بين 1 و10."
  },
  {
    "t": "cat",
    "ti": "Categorize: Types of Numbers",
    "ti_ar": "تصنيف: أنواع الأعداد",
    "categories": [
      "Rational",
      "Irrational"
    ],
    "categories_ar": [
      "عدد نسبي",
      "عدد غير نسبي"
    ],
    "items": [
      {
        "s": "\\(\\sqrt{16}\\)",
        "cat": "Rational"
      },
      {
        "s": "\\(\\sqrt{7}\\)",
        "cat": "Irrational"
      },
      {
        "s": "\\(\\pi\\)",
        "cat": "Irrational"
      },
      {
        "s": "\\(0.375\\)",
        "cat": "Rational"
      },
      {
        "s": "\\(2\\frac{1}{3}\\)",
        "cat": "Rational"
      },
      {
        "s": "\\(\\sqrt{18}\\)",
        "cat": "Irrational"
      }
    ],
    "items_ar": [
      {
        "s": "\\(\\sqrt{16}\\)",
        "cat": "Rational"
      },
      {
        "s": "\\(\\sqrt{7}\\)",
        "cat": "Irrational"
      },
      {
        "s": "\\(\\pi\\)",
        "cat": "Irrational"
      },
      {
        "s": "\\(0.375\\)",
        "cat": "Rational"
      },
      {
        "s": "\\(2\\frac{1}{3}\\)",
        "cat": "Rational"
      },
      {
        "s": "\\(\\sqrt{18}\\)",
        "cat": "Irrational"
      }
    ],
    "ex": "Fractions, terminating and recurring decimals are rational; non-repeating non-terminating decimals and surds are irrational.",
    "ex_ar": "الكسور والأعداد العشرية المنتهية أو الدورية هي أعداد نسبية؛ بينما الجذور الصماء والأعداد العشرية غير المنتهية وغير الدورية غير نسبية."
  },
  {
    "t": "sr",
    "ti": "Worked Example: Rationalising a Surd Denominator",
    "ti_ar": "مثال محلول: إنطاق مقام كسر أصم",
    "steps": [
      "Rationalise \\(\\dfrac{5}{\\sqrt{3}}\\). Multiply top and bottom by \\(\\sqrt{3}\\) so the denominator becomes rational.",
      "\\(\\dfrac{5}{\\sqrt{3}}\\times\\dfrac{\\sqrt{3}}{\\sqrt{3}}=\\dfrac{5\\sqrt{3}}{3}\\).",
      "The denominator is now the integer 3 — the surd has moved to the numerator, the accepted exact form."
    ],
    "steps_ar": [
      "أنطق مقام الكسر \\(\\dfrac{5}{\\sqrt{3}}\\). اضرب البسط والمقام في \\(\\sqrt{3}\\) ليصبح المقام عدداً نسبياً.",
      "\\(\\dfrac{5}{\\sqrt{3}}\\times\\dfrac{\\sqrt{3}}{\\sqrt{3}}=\\dfrac{5\\sqrt{3}}{3}\\).",
      "أصبح المقام الآن هو العدد الصحيح 3 — وانتقل الجذر إلى البسط بالصيغة التامة المقبولة."
    ]
  },
  {
    "t": "se",
    "ti": "Spot the Error: Successive Percentage Multipliers (Number)",
    "ti_ar": "اكتشف الخطأ: النسب المئوية المتتالية (الأعداد والعمليات الحسابية والنسب)",
    "q": "An item priced at \\(250\\) rises by \\(30\\%\\) and is then discounted by \\(30\\%\\). Which step in the calculation is wrong?",
    "q_ar": "سلعة سعرها \\(250\\) زاد سعرها بنسبة \\(30\\%\\) ثم خُفِّض بنسبة \\(30\\%\\). أي خطوة تحتوي على خطأ؟",
    "steps": [
      "Apply the \\(30\\%\\) increase multiplier: \\(250 \\times 1.30 = 325\\).",
      "Recognize that the \\(30\\%\\) discount applies to the new price \\(325\\).",
      "Add the percentage changes directly: \\(+30\\% - 30\\% = 0\\%\\), claiming the final price returns to \\(250\\).",
      "Verify final price via product of multipliers."
    ],
    "steps_ar": [
      "تطبيق معامل الزيادة \\(30\\%\\): \\(250 \\times 1.30 = 325\\).",
      "ملاحظة أن خصم \\(30\\%\\) يُطبَّق على السعر الجديد \\(325\\).",
      "جمع النسبتين مباشرة \\(+30\\% - 30\\% = 0\\%\\) والادعاء بأن السعر النهائي يعود إلى \\(250\\).",
      "التحقق من السعر النهائي بضرب المعاملات."
    ],
    "errorStep": 3,
    "reasons": [
      "Successive percentages multiply rather than add: \\(325 \\times 0.70 = 227\\) (a net \\(9\\%\\) decrease).",
      "The final price is actually greater than \\(250\\).",
      "Discounts must be divided rather than multiplied."
    ],
    "reasons_ar": [
      "النسب المتتالية تُضرب كمعاملات ولا تُجمع: \\(325 \\times 0.70 = 227\\) (بانخفاض صافي قدره \\(9\\%\\)).",
      "السعر النهائي أكبر من \\(250\\).",
      "الخصم يُحسب بالقسمة لا بالضرب."
    ],
    "correctReason": 0
  },
  {
    "t": "ms",
    "ti": "Examiner Mode: Harmonic Round-Trip Speed & Bounds (Number)",
    "ti_ar": "وضع المصحح: السرعة المتوسطة التوافقية والحدود (الأعداد والعمليات الحسابية والنسب)",
    "q": "A vehicle travels a fixed distance \\(d\\) outbound at \\(40\\text{ km/h}\\) and returns the same distance \\(d\\) at \\(60\\text{ km/h}\\). (a) Express total time in terms of \\(d\\) and find the exact round-trip average speed. (b) If a length \\(L = 16\\text{ cm}\\) is rounded to the nearest \\(1\\text{ cm}\\), state its lower and upper bounds.",
    "q_ar": "تقطع مركبة مسافة \\(d\\) ذهاباً بسرعة \\(40\\text{ km/h}\\) وتعود المسافة نفسها بسرعة \\(60\\text{ km/h}\\). (أ) عبّر عن الزمن الكلي بدلالة \\(d\\) وأوجد السرعة المتوسطة للرحلة كاملة. (ب) إذا قُرِّب الطول \\(L = 16\\text{ cm}\\) لأقرب \\(1\\text{ cm}\\)، فاكتب الحد الأدنى والحد الأعلى.",
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
            "text": "Error interval: \\(15.5 \\le L < 16.5\\)."
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
            "text": "فترة القيمة الحقيقية: \\(15.5 \\le L < 16.5\\)."
          }
        ]
      }
    ]
  },
  {
    "t": "sb",
    "ti": "Step Builder: Successive Multipliers & Net Change (Number)",
    "ti_ar": "بناء الخطوات: المعاملات المتتالية وصافي التغير (الأعداد والعمليات الحسابية والنسب)",
    "steps": [
      {
        "l": "Increase \\(250\\) by \\(30\\%\\): new value \\(=\\)",
        "a": "325",
        "h": "Compute 250 × 1.30."
      },
      {
        "l": "Now discount \\(325\\) by \\(30\\%\\): final value \\(=\\)",
        "a": "227",
        "h": "Compute 325 × 0.70."
      },
      {
        "l": "Find the net decrease \\(250 - 227 =\\)",
        "a": "23",
        "h": "Subtract 227 from 250."
      }
    ],
    "steps_ar": [
      {
        "l": "زد العدد \\(250\\) بنسبة \\(30\\%\\): القيمة الجديدة \\(=\\)",
        "a": "325",
        "h": "احسب 250 × 1.30."
      },
      {
        "l": "طبّق خصم \\(30\\%\\) على \\(325\\): القيمة النهائية \\(=\\)",
        "a": "227",
        "h": "احسب 325 × 0.70."
      },
      {
        "l": "أوجد مقدار النقصان الصافي \\(250 - 227 =\\)",
        "a": "23",
        "h": "اطرح 227 من 250."
      }
    ]
  },
  {
    "t": "mt",
    "ti": "Matching: Number, Bounds & Set Principles (Number)",
    "ti_ar": "مطابقة: قوانين الأعداد والحدود والمجموعات (الأعداد والعمليات الحسابية والنسب)",
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
  }
];
D["ig-algebra"] = [
  {
    "t": "mt",
    "ti": "Matching: Algebraic Identities",
    "ti_ar": "مطابقة: المتطابقات الجبرية",
    "p": [
      {
        "l": "\\((a+b)^2\\)",
        "r": "a²+2ab+b²"
      },
      {
        "l": "\\((a-b)^2\\)",
        "r": "a²−2ab+b²"
      },
      {
        "l": "\\((a+b)(a-b)\\)",
        "r": "a²−b²"
      },
      {
        "l": "Quadratic formula",
        "r": "[−b±√(b²−4ac)]/2a"
      }
    ],
    "p_ar": [
      {
        "l": "\\((a+b)^2\\)",
        "r": "a²+2ab+b²"
      },
      {
        "l": "\\((a-b)^2\\)",
        "r": "a²−2ab+b²"
      },
      {
        "l": "\\((a+b)(a-b)\\)",
        "r": "a²−b²"
      },
      {
        "l": "القانون العام للتربيعية",
        "r": "[−b±√(b²−4ac)]/2a"
      }
    ]
  },
  {
    "t": "num",
    "ti": "Numeric Entry: Finding the nth Term Value",
    "ti_ar": "إدخال رقمي: إيجاد قيمة الحد النوني",
    "q": "The nth term of an arithmetic sequence is \\(u_n = 5n - 8\\). What is the 12th term?",
    "q_ar": "الحد النوني لمتتالية حسابية هو \\(u_n = 5n - 8\\). ما قيمة الحد الثاني عشر؟",
    "a": 52,
    "ex": "Substitute \\(n = 12\\): \\(u_{12} = 5(12) - 8 = 60 - 8 = 52\\).",
    "ex_ar": "بالتعويض عن \\(n = 12\\): \\(u_{12} = 5(12) - 8 = 60 - 8 = 52\\)."
  },
  {
    "t": "ord",
    "ti": "Order the Steps: Solving a Linear Inequality",
    "ti_ar": "ترتيب الخطوات: حل متباينة خطية",
    "prompt": "Arrange the algebraic steps to solve \\(5 - 3x \\le 17\\):",
    "prompt_ar": "رتّب الخطوات الجبرية لحل المتباينة \\(5 - 3x \\le 17\\):",
    "items": [
      "Subtract 5 from both sides: \\(-3x \\le 12\\).",
      "Divide both sides by -3 and flip the inequality sign: \\(x \\ge -4\\).",
      "Represent on a number line with a solid circle at -4 pointing right."
    ],
    "items_ar": [
      "اطرح 5 من كلا الطرفين: \\(-3x \\le 12\\).",
      "اقسم الطرفين على -3 واعكس إشارة المتباينة: \\(x \\ge -4\\).",
      "مثّل الحل على خط الأعداد بدائرة ممتلئة عند -4 وسهم يتجه لليمين."
    ],
    "ex": "Subtract 5, divide by -3 while reversing the inequality sign, and graph.",
    "ex_ar": "اطرح 5، ثم اقسم على -3 مع قلب اتجاه إشارة التباين، ومثّل بيانياً."
  },
  {
    "t": "cat",
    "ti": "Categorize: Algebraic Graph Shapes",
    "ti_ar": "تصنيف: أشكال المنحنيات الجبرية",
    "categories": [
      "Linear",
      "Quadratic Parabola",
      "Cubic S-Curve",
      "Reciprocal Hyperbola"
    ],
    "categories_ar": [
      "خطي (مستقيم)",
      "قطع مكافئ تربيعي",
      "منحنى تكعيبي",
      "قطع زائد نسبي (دالة المقلوب)"
    ],
    "items": [
      {
        "s": "\\(y = 3x - 5\\)",
        "cat": "Linear"
      },
      {
        "s": "\\(y = 2x^2 - 4x + 1\\)",
        "cat": "Quadratic Parabola"
      },
      {
        "s": "\\(y = x^3 - 2x\\)",
        "cat": "Cubic S-Curve"
      },
      {
        "s": "\\(y = \\frac{6}{x}\\)",
        "cat": "Reciprocal Hyperbola"
      },
      {
        "s": "\\(y = 4 - x^2\\)",
        "cat": "Quadratic Parabola"
      }
    ],
    "items_ar": [
      {
        "s": "\\(y = 3x - 5\\)",
        "cat": "Linear"
      },
      {
        "s": "\\(y = 2x^2 - 4x + 1\\)",
        "cat": "Quadratic Parabola"
      },
      {
        "s": "\\(y = x^3 - 2x\\)",
        "cat": "Cubic S-Curve"
      },
      {
        "s": "\\(y = \\frac{6}{x}\\)",
        "cat": "Reciprocal Hyperbola"
      },
      {
        "s": "\\(y = 4 - x^2\\)",
        "cat": "Quadratic Parabola"
      }
    ],
    "ex": "Degree 1 is linear, degree 2 is quadratic, degree 3 is cubic, and inverse x is reciprocal.",
    "ex_ar": "الدرجة الأولى خطية، والدرجة الثانية تربيعية، والدرجة الثالثة تكعيبية، ومقلوب x قطع زائد."
  },
  {
    "t": "fn",
    "ti": "Explorer: Quadratic Graph \\(y=x^2+k\\)",
    "ti_ar": "مستكشف: المنحنى التربيعي \\(y=x^2+k\\)",
    "fns": [
      {
        "expr": "x^2+k",
        "color": "#1E3A6E"
      }
    ],
    "xrange": [
      -5,
      5
    ],
    "yrange": [
      -4,
      10
    ],
    "params": [
      {
        "name": "k",
        "label": "Vertical shift k",
        "min": -4,
        "max": 6,
        "step": 1,
        "default": 0
      }
    ]
  },
  {
    "t": "sr",
    "ti": "Worked Example: Solving a Quadratic by Factorising",
    "ti_ar": "مثال محلول: حل معادلة تربيعية بالتحليل",
    "steps": [
      "Solve \\(x^2+5x+6=0\\). Find two numbers that multiply to 6 and add to 5.",
      "The numbers are 2 and 3, so \\(x^2+5x+6=(x+2)(x+3)\\).",
      "Set each factor to zero: \\(x=-2\\) or \\(x=-3\\)."
    ],
    "steps_ar": [
      "حل المعادلة \\(x^2+5x+6=0\\). ابحث عن عددين حاصل ضربهما 6 ومجموعهما 5.",
      "العددان هما 2 و 3، إذن \\(x^2+5x+6=(x+2)(x+3)\\).",
      "ساوِ كل قوس بالصفر: \\(x=-2\\) أو \\(x=-3\\)."
    ]
  },
  {
    "t": "ms",
    "ti": "Cambridge IGCSE 0580: Multi-Part Quadratic Paper",
    "ti_ar": "كامبريدج IGCSE 0580: مسألة تربيعية متعددة الأجزاء",
    "q": "The equation of a curve is \\(y = 2x^2 - 8x + 6\\).<br><b>(a)</b> Find the coordinates of the points where the curve crosses the x-axis. [3 marks]<br><b>(b)</b> Write \\(2x^2 - 8x + 6\\) in the form \\(a(x - h)^2 + k\\). [3 marks]<br><b>(c)</b> Hence state the coordinates of the turning point. [1 mark]",
    "parts": [
      {
        "label": "Part (a)",
        "marks": 3,
        "rubric": [
          {
            "code": "M1",
            "text": "Set \\(y = 0\\) and factorise or use quadratic formula: \\(2(x^2 - 4x + 3) = 0\\)",
            "text_ar": "مساواة المعادلة بالصفر والتحليل"
          },
          {
            "code": "M1",
            "text": "Complete factorisation: \\(2(x - 1)(x - 3) = 0\\)",
            "text_ar": "التحليل الكامل إلى أقواس"
          },
          {
            "code": "A1",
            "text": "Correct coordinates: \\((1, 0)\\) and \\((3, 0)\\)",
            "text_ar": "الإحداثيات الصحيحة: (1, 0) و (3, 0)"
          }
        ]
      },
      {
        "label": "Part (b)",
        "marks": 3,
        "rubric": [
          {
            "code": "B1",
            "text": "Factor out leading 2: \\(2(x^2 - 4x) + 6\\)",
            "text_ar": "إخراج العامل 2 خارج القوس"
          },
          {
            "code": "M1",
            "text": "Complete square inside bracket: \\((x - 2)^2 - 4\\)",
            "text_ar": "إكمال المربع داخل القوس"
          },
          {
            "code": "A1",
            "text": "Correct vertex form: \\(2(x - 2)^2 - 2\\)",
            "text_ar": "الصيغة الرأسية الصحيحة: 2(x - 2)² - 2"
          }
        ]
      },
      {
        "label": "Part (c)",
        "marks": 1,
        "rubric": [
          {
            "code": "B1",
            "text": "State turning point \\((2, -2)\\)",
            "text_ar": "كتابة نقطة التحول (2, -2)"
          }
        ]
      }
    ],
    "boundaries": [
      {
        "min": 6,
        "grade": "Grade 9 / A* (Exceptional)",
        "grade_ar": "الدرجة 9 / A* (استثنائي)"
      },
      {
        "min": 5,
        "grade": "Grade 8 / A (Excellent)",
        "grade_ar": "الدرجة 8 / A (ممتاز)"
      },
      {
        "min": 4,
        "grade": "Grade 7 / B (Good)",
        "grade_ar": "الدرجة 7 / B (جيد جداً)"
      },
      {
        "min": 3,
        "grade": "Grade 5 / C (Passing)",
        "grade_ar": "الدرجة 5 / C (ناجح)"
      },
      {
        "min": 0,
        "grade": "Needs Practice",
        "grade_ar": "يحتاج إلى تدريب"
      }
    ],
    "examinerTip": "Common mistake: Candidates frequently write (2, 2) instead of (2, -2) for the turning point by ignoring the negative sign outside the squared term.",
    "examinerTip_ar": "خطأ شائع: يكتب الطلاب غالباً (2, 2) بدلاً من (2, -2) لنقطة التحول بسبب إغفال الإشارة السالبة للحد الثابت."
  },
  {
    "t": "se",
    "ti": "Spot the Error: Vieta's Sum of Squares Identity (Algebra & Graphs)",
    "ti_ar": "اكتشف الخطأ: متطابقة فييت لمجموع مربعي الجذرين (الجبر والتمثيلات البيانية)",
    "q": "For \\(x^2 - 9x + 18 = 0\\) with roots \\(\\alpha, \\beta\\), a student computes \\(\\alpha^2 + \\beta^2\\). Where is the error?",
    "q_ar": "للمعادلة \\(x^2 - 9x + 18 = 0\\) ذات الجذرين \\(\\alpha, \\beta\\)، يحسب طالب \\(\\alpha^2 + \\beta^2\\). أين الخطأ؟",
    "steps": [
      "Read Vieta's relations: \\(\\alpha + \\beta = 9\\) and \\(\\alpha\\beta = 18\\).",
      "Claim \\(\\alpha^2 + \\beta^2 = (\\alpha + \\beta)^2 = 81\\), omitting \\(-2\\alpha\\beta\\).",
      "State \\(81\\) as the value of \\(\\alpha^2 + \\beta^2\\)."
    ],
    "steps_ar": [
      "استخراج علاقات فييت: \\(\\alpha + \\beta = 9\\) و\\(\\alpha\\beta = 18\\).",
      "الادعاء بأن \\(\\alpha^2 + \\beta^2 = (\\alpha + \\beta)^2 = 81\\) وإغفال الحد \\(-2\\alpha\\beta\\).",
      "اعتماد \\(81\\) قيمة نهائية."
    ],
    "errorStep": 2,
    "reasons": [
      "Because \\((\\alpha + \\beta)^2 = \\alpha^2 + 2\\alpha\\beta + \\beta^2\\), the exact identity is \\(\\alpha^2 + \\beta^2 = (\\alpha + \\beta)^2 - 2\\alpha\\beta = 81 - 36 = 45\\).",
      "Vieta gives \\(\\alpha + \\beta = -9\\).",
      "\\(\\alpha\\beta\\) must be squared before subtracting."
    ],
    "reasons_ar": [
      "لأن \\((\\alpha + \\beta)^2 = \\alpha^2 + 2\\alpha\\beta + \\beta^2\\)، فالمتطابقة الصحيحة هي \\(\\alpha^2 + \\beta^2 = (\\alpha + \\beta)^2 - 2\\alpha\\beta = 45\\).",
      "مجموع الجذرين يساوي \\(-9\\).",
      "يجب تربيع \\(\\alpha\\beta\\) قبل الطرح."
    ],
    "correctReason": 0
  },
  {
    "t": "sb",
    "ti": "Step Builder: Vieta Relations & Remainder Theorem (Algebra & Graphs)",
    "ti_ar": "بناء الخطوات: علاقات فييت ونظرية الباقي (الجبر والتمثيلات البيانية)",
    "steps": [
      {
        "l": "For \\(x^2 - 9x + 18 = 0\\), find \\(\\alpha + \\beta =\\)",
        "a": "9",
        "h": "Use −b/a."
      },
      {
        "l": "Find the product of roots \\(\\alpha\\beta =\\)",
        "a": "18",
        "h": "Use c/a."
      },
      {
        "l": "Compute \\(\\alpha^2 + \\beta^2 = (\\alpha + \\beta)^2 - 2\\alpha\\beta =\\)",
        "a": "45",
        "h": "Compute 81 − 36."
      }
    ],
    "steps_ar": [
      {
        "l": "للمعادلة \\(x^2 - 9x + 18 = 0\\)، أوجد \\(\\alpha + \\beta =\\)",
        "a": "9",
        "h": "استعمل −b/a."
      },
      {
        "l": "أوجد حاصل ضرب الجذرين \\(\\alpha\\beta =\\)",
        "a": "18",
        "h": "استعمل c/a."
      },
      {
        "l": "احسب \\(\\alpha^2 + \\beta^2 = (\\alpha + \\beta)^2 - 2\\alpha\\beta =\\)",
        "a": "45",
        "h": "احسب 81 − 36."
      }
    ]
  }
];
D["ig-geometry"] = [
  {
    "t": "tf",
    "ti": "True or False: Geometry",
    "ti_ar": "صحيح أم خطأ: الهندسة",
    "items": [
      {
        "s": "Vertically opposite angles are equal",
        "a": true,
        "ex": "Vertical angles theorem."
      },
      {
        "s": "An isosceles triangle has all three sides equal",
        "a": false,
        "ex": "Equilateral has all equal; isosceles has two equal."
      },
      {
        "s": "Sum of angles in a quadrilateral is \\(360°\\)",
        "a": true,
        "ex": "\\((n-2)\\times180°=360°\\) for \\(n=4\\)."
      },
      {
        "s": "Exterior angle of a triangle = sum of two non-adjacent interior angles",
        "a": true,
        "ex": "Exterior Angle Theorem."
      }
    ],
    "items_ar": [
      {
        "s": "الزاويتان المتقابلتان بالرأس متساويتان في القياس",
        "a": true,
        "ex": "مبرهنة الزوايا المتقابلة بالرأس."
      },
      {
        "s": "المثلث متطابق الضلعين تكون جميع أضلاعه الثلاثة متساوية",
        "a": false,
        "ex": "المثلث متطابق الأضلاع تتساوى أضلاعه الثلاثة؛ بينما متطابق الضلعين فيه ضلعان متساويان فقط."
      },
      {
        "s": "مجموع قياسات زوايا الشكل الرباعي \\(360°\\)",
        "a": true,
        "ex": "\\((n-2)\\times180°=360°\\) حيث \\(n=4\\)."
      },
      {
        "s": "قياس الزاوية الخارجية للمثلث يساوي مجموع قياسي الزاويتين الداخليتين البعيدتين",
        "a": true,
        "ex": "مبرهنة الزاوية الخارجية للمثلث."
      }
    ]
  },
  {
    "t": "num",
    "ti": "Numeric Entry: Interior Angle of a Regular Polygon",
    "ti_ar": "إدخال رقمي: الزاوية الداخلية لمضلع منتظم",
    "q": "What is the size of each interior angle in a regular octagon (8-sided polygon) in degrees?",
    "q_ar": "ما قياس كل زاوية داخلية في الثماني المنتظم (مضلع من 8 أضلاع) بالدرجات؟",
    "a": 135,
    "ex": "Exterior angle \\(= 360^\\circ / 8 = 45^\\circ\\). Interior angle \\(= 180^\\circ - 45^\\circ = 135^\\circ\\).",
    "ex_ar": "الزاوية الخارجية \\(= 360^\\circ / 8 = 45^\\circ\\). الزاوية الداخلية \\(= 180^\\circ - 45^\\circ = 135^\\circ\\)."
  },
  {
    "t": "ord",
    "ti": "Order the Steps: Proving Triangle Congruence",
    "ti_ar": "ترتيب الخطوات: إثبات تطابق مثلثين بضلعين والزاوية المحصورة (SAS)",
    "prompt": "Arrange the steps to prove two triangles are congruent using SAS:",
    "prompt_ar": "رتّب خطوات إثبات تطابق مثلثين باستخدام حالة (SAS):",
    "items": [
      "Measure and match the first pair of equal sides: \\(AB = DE\\).",
      "Verify that the included angles between the sides are equal: \\(\\angle B = \\angle E\\).",
      "Measure and match the second pair of equal sides: \\(BC = EF\\).",
      "Conclude that \\(\\triangle ABC \\cong \\triangle DEF\\) by SAS criterion."
    ],
    "items_ar": [
      "قياس ومطابقة الزوج الأول من الأضلاع المتساوية: \\(AB = DE\\).",
      "التحقق من تساوي قياسي الزاويتين المحصورتين بين الضلعين: \\(\\angle B = \\angle E\\).",
      "قياس ومطابقة الزوج الثاني من الأضلاع المتساوية: \\(BC = EF\\).",
      "الاستنتاج أن المثلثين متطابقان \\(\\triangle ABC \\cong \\triangle DEF\\) بحالة (SAS)."
    ],
    "ex": "Match two corresponding sides and the angle included strictly between them.",
    "ex_ar": "طابق ضلعين متناظرين والزاوية المحصورة بينهما بدقة."
  },
  {
    "t": "cat",
    "ti": "Categorize: Triangle Congruence vs Similarity Criteria",
    "ti_ar": "تصنيف: معايير تطابق وتشابه المثلثات",
    "categories": [
      "Congruence Criterion",
      "Similarity Criterion",
      "Neither (Insufficient)"
    ],
    "categories_ar": [
      "معيار تطابق",
      "معيار تشابه",
      "ليس أياً منهما (غير كافٍ)"
    ],
    "items": [
      {
        "s": "SSS (Side-Side-Side with equal lengths)",
        "cat": "Congruence Criterion"
      },
      {
        "s": "AAA (All three angles equal)",
        "cat": "Similarity Criterion"
      },
      {
        "s": "RHS (Right-angle, Hypotenuse, Side equal)",
        "cat": "Congruence Criterion"
      },
      {
        "s": "SSA (Side-Side-Angle not included)",
        "cat": "Neither (Insufficient)"
      },
      {
        "s": "SAS with proportional sides and equal included angle",
        "cat": "Similarity Criterion"
      }
    ],
    "items_ar": [
      {
        "s": "SSS (تطابق الأضلاع الثلاثة المتناظرة)",
        "cat": "Congruence Criterion"
      },
      {
        "s": "AAA (تساوي الزوايا الثلاث المتناظرة)",
        "cat": "Similarity Criterion"
      },
      {
        "s": "RHS (تطابق وتر وضلع وقائمة في المثلث القائم)",
        "cat": "Congruence Criterion"
      },
      {
        "s": "SSA (ضلعان وزاوية غير محصورة)",
        "cat": "Neither (Insufficient)"
      },
      {
        "s": "SAS بأضلاع متناسبة وزاوية محصورة متساوية",
        "cat": "Similarity Criterion"
      }
    ],
    "ex": "SSS, SAS, ASA, RHS prove congruence; AAA and proportional sides prove similarity; SSA is ambiguous.",
    "ex_ar": "حالات SSS وSAS وASA وRHS تثبت التطابق؛ وتساوي الزوايا والتناسب يثبتان التشابه؛ وحالة SSA غامضة وغير كافية."
  },
  {
    "t": "sr",
    "ti": "Worked Example: Circle Theorem (Reflex Angle)",
    "ti_ar": "مثال محلول: نظرية الدائرة (الزاوية المنعكسة)",
    "steps": [
      "Points A and B lie on a circle centre O. The reflex angle AOB equals \\(220°\\). Find the angle at the circumference subtended by the major arc AB.",
      "The reflex angle \\(220°\\) is the central angle for the major arc, so the inscribed angle equals half of it.",
      "\\(\\tfrac12\\times220°=110°\\)."
    ],
    "steps_ar": [
      "النقطتان A و B تقعان على دائرة مركزها O. الزاوية المركزية المنعكسة AOB تساوي \\(220°\\). أوجد الزاوية المحيطية المقابلة للقوس الأكبر AB.",
      "الزاوية المنعكسة \\(220°\\) هي الزاوية المركزية المقابلة للقوس الأكبر، لذا فالزاوية المحيطية تساوي نصفها.",
      "\\(\\tfrac12\\times220°=110°\\)."
    ]
  },
  {
    "t": "se",
    "ti": "Spot the Error: Area & Volume Similarity Scaling (Geometry)",
    "ti_ar": "اكتشف الخطأ: معامل تشابه المساحات والحجوم (الهندسة المستوية ونظريات الدائرة)",
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
    "ti": "Examiner Mode: Circle Theorems, Sectors & Similarity (Geometry)",
    "ti_ar": "وضع المصحح: نظريات الدائرة والقطاعات والتشابه (الهندسة المستوية ونظريات الدائرة)",
    "q": "A circle has equation \\((x - 2)^2 + (y + 3)^2 = 36\\). (a) State its center and radius \\(r\\). (b) A sector of this circle subtends \\(\\theta = \\frac{\\pi}{2}\\) radians; find exact arc length and sector area in terms of \\(\\pi\\).",
    "q_ar": "دائرة معادلتها \\((x - 2)^2 + (y + 3)^2 = 36\\). (أ) اذكر المركز ونصف القطر \\(r\\). (ب) قطاع في هذه الدائرة زاويته المركزية \\(\\theta = \\frac{\\pi}{2}\\) راديان؛ أوجد طول القوس ومساحة القطاع بدلالة \\(\\pi\\).",
    "parts": [
      {
        "label": "Part (a) — Circle Center & Radius",
        "marks": 2,
        "rubric": [
          {
            "code": "B1",
            "marks": 1,
            "text": "Center \\((h, k) = (2, -3)\\)."
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
            "text": "المركز \\((2, -3)\\)."
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
    "ti": "Step Builder: Circle Radius, Polygon Angles & Similarity (Geometry)",
    "ti_ar": "بناء الخطوات: الدائرة وزوايا المضلعات والتشابه (الهندسة المستوية ونظريات الدائرة)",
    "steps": [
      {
        "l": "From \\((x - 2)^2 + (y + 3)^2 = 36\\), find the radius \\(r =\\)",
        "a": "6",
        "h": "Take the square root of 36."
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
        "l": "من المعادلة \\((x - 2)^2 + (y + 3)^2 = 36\\)، أوجد نصف القطر \\(r =\\)",
        "a": "6",
        "h": "خذ الجذر التربيعي للعدد 36."
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
    "t": "mt",
    "ti": "Matching: Circle Theorems & Solid Mensuration (Geometry)",
    "ti_ar": "مطابقة: نظريات الدائرة وقوانين القياس الهندسي (الهندسة المستوية ونظريات الدائرة)",
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
D["ig-trig"] = [
  {
    "t": "sb",
    "ti": "Step Builder: Right triangle, angle \\(30°\\), hyp \\(=10\\). Find opposite side.",
    "ti_ar": "باني الخطوات: مثلث قائم، زاوية \\(30°\\)، والوتر \\(=10\\). احسب الضلع المقابل.",
    "steps": [
      {
        "l": "Trig ratio for opp/hyp:",
        "a": "sin",
        "h": "SOH: sin = opp/hyp"
      },
      {
        "l": "\\(\\sin 30°=\\)",
        "a": "0.5",
        "h": "\\(\\frac{1}{2}=0.5\\)"
      },
      {
        "l": "Opposite \\(=10\\times0.5=\\)",
        "a": "5",
        "h": "Perform the calculation in \\(10\\times0.5\\) to find the result."
      }
    ],
    "steps_ar": [
      {
        "l": "النسبة المثلثية للمقابل على الوتر:",
        "a": "sin",
        "h": "sin = المقابل / الوتر"
      },
      {
        "l": "\\(\\sin 30°=\\)",
        "a": "0.5",
        "h": "\\(\\frac{1}{2}=0.5\\)"
      },
      {
        "l": "المقابل \\(=10\\times0.5=\\)",
        "a": "5",
        "h": "أجرِ العملية الحسابية في المقدار \\(10\\times0.5\\) للوصول إلى النتيجة."
      }
    ]
  },
  {
    "t": "num",
    "ti": "Numeric Entry: Trigonometric Ratio",
    "ti_ar": "إدخال رقمي: النسبة المثلثية",
    "q": "In a right triangle, the side adjacent to angle \\(\\theta\\) is 12 and the hypotenuse is 13. What is \\(\\cos \\theta\\)? (Enter as fraction e.g. 12/13 or decimal).",
    "q_ar": "في مثلث قائم، الضلع المجاور للزاوية \\(\\theta\\) طوله 12 والوتر 13. ما قيمة \\(\\cos \\theta\\)؟ (أدخل كسراً مثل 12/13 أو عشرياً).",
    "a": "12/13",
    "ex": "\\(\\cos \\theta = \\text{adjacent} / \\text{hypotenuse} = 12/13 \\approx 0.923\\).",
    "ex_ar": "\\(\\cos \\theta = \\text{المجاور} / \\text{الوتر} = 12/13 \\approx 0.923\\)."
  },
  {
    "t": "ord",
    "ti": "Order the Steps: Calculating Back-Bearing",
    "ti_ar": "ترتيب الخطوات: حساب الاتجاه الخلفي (السمت المعاكس)",
    "prompt": "Arrange the steps to determine the back-bearing from ship B to port A if the bearing of B from A is 075°:",
    "prompt_ar": "رتّب خطوات حساب الاتجاه الخلفي من السفينة B إلى الميناء A إذا كان اتجاه B من A هو 075°:",
    "items": [
      "Check if the given bearing is less than 180°: \\(75^\\circ < 180^\\circ\\).",
      "Add 180° to find the reverse direction: \\(75^\\circ + 180^\\circ = 255^\\circ\\).",
      "Format as a three-figure bearing: \\(255^\\circ\\)."
    ],
    "items_ar": [
      "التحقق هل الاتجاه المعطى أقل من 180°: \\(75^\\circ < 180^\\circ\\).",
      "إضافة 180° لإيجاد الاتجاه المعاكس: \\(75^\\circ + 180^\\circ = 255^\\circ\\).",
      "كتابة الزاوية بصيغة الاتجاه ثلاثي الأرقام: \\(255^\\circ\\)."
    ],
    "ex": "If bearing < 180°, add 180°; if bearing >= 180°, subtract 180°.",
    "ex_ar": "إذا كان الاتجاه أقل من 180°، أضف 180°؛ وإذا كان 180° أو أكثر، اطرح 180°."
  },
  {
    "t": "cat",
    "ti": "Categorize: Non-Right Triangle Rules",
    "ti_ar": "تصنيف: قوانين المثلثات غير القائمة",
    "categories": [
      "Sine Rule",
      "Cosine Rule",
      "Area of Triangle Formula"
    ],
    "categories_ar": [
      "قانون الجيب (Sine Rule)",
      "قانون جيب التمام (Cosine Rule)",
      "صيغة مساحة المثلث"
    ],
    "items": [
      {
        "s": "Two sides and included angle known to find third side",
        "cat": "Cosine Rule"
      },
      {
        "s": "Two angles and one side known to find another side",
        "cat": "Sine Rule"
      },
      {
        "s": "\\(\\frac{1}{2}ab\\sin C\\)",
        "cat": "Area of Triangle Formula"
      },
      {
        "s": "All three sides known to find an angle",
        "cat": "Cosine Rule"
      },
      {
        "s": "Two sides and non-included angle known to find second angle",
        "cat": "Sine Rule"
      }
    ],
    "items_ar": [
      {
        "s": "معرفة ضلعين وزاوية محصورة لإيجاد الضلع الثالث",
        "cat": "Cosine Rule"
      },
      {
        "s": "معرفة زاويتين وضلع لإيجاد ضلع آخر",
        "cat": "Sine Rule"
      },
      {
        "s": "\\(\\frac{1}{2}ab\\sin C\\)",
        "cat": "Area of Triangle Formula"
      },
      {
        "s": "معرفة الأضلاع الثلاثة لإيجاد قياس زاوية",
        "cat": "Cosine Rule"
      },
      {
        "s": "معرفة ضلعين وزاوية غير محصورة لإيجاد زاوية ثانية",
        "cat": "Sine Rule"
      }
    ],
    "ex": "Cosine rule handles SAS and SSS; Sine rule handles AAS and SSA; 1/2 ab sin C computes area.",
    "ex_ar": "قانون جيب التمام يحل حالتي SAS وSSS؛ وقانون الجيب يحل حالتي AAS وSSA؛ وصيغة 1/2 ab sin C تحسب المساحة."
  },
  {
    "t": "sr",
    "ti": "Worked Example: Cosine Rule",
    "ti_ar": "مثال محلول: قانون جيب التمام",
    "steps": [
      "In triangle ABC, \\(a=7\\), \\(b=9\\), and included angle \\(C=55°\\). Find side \\(c\\) using the cosine rule.",
      "\\(c^2=a^2+b^2-2ab\\cos C=49+81-2(7)(9)\\cos55°\\).",
      "\\(c^2\\approx130-72.3\\approx57.7\\), so \\(c\\approx7.60\\)."
    ],
    "steps_ar": [
      "في المثلث ABC، \\(a=7\\) و \\(b=9\\) والزاوية المحصورة \\(C=55°\\). احسب طول الضلع \\(c\\) باستخدام قانون جيب التمام.",
      "\\(c^2=a^2+b^2-2ab\\cos C=49+81-2(7)(9)\\cos55°\\).",
      "\\(c^2\\approx130-72.3\\approx57.7\\)، إذن \\(c\\approx7.60\\)."
    ]
  },
  {
    "t": "qc",
    "ti": "Quick Check: Bearings",
    "ti_ar": "فحص سريع: الاتجاهات (السمت)",
    "q": "A ship sails on a bearing of \\(200°\\). What is the back-bearing from its new position to the start?",
    "q_ar": "تبحر سفينة باتجاه \\(200°\\). ما الاتجاه الخلفي (المعاكس) من موقعها الجديد نحو نقطة البداية؟",
    "o": [
      "020°",
      "160°",
      "340°",
      "200°"
    ],
    "o_ar": [
      "020°",
      "160°",
      "340°",
      "200°"
    ],
    "a": 0,
    "ex": "Back-bearing \\(=200°-180°=020°\\).",
    "ex_ar": "الاتجاه المعاكس \\(=200°-180°=020°\\)."
  },
  {
    "t": "se",
    "ti": "Spot the Error: Quadrant Sign & Dividing by \\(\\sin\\theta\\) (Trigonometry)",
    "ti_ar": "اكتشف الخطأ: إشارة الربع والقسمة على \\(\\sin\\theta\\) (حساب المثلثات وقانونا الجيب وجيب التمام)",
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
    "ti_ar": "وضع المصحح: المتطابقات المثلثية وقانون جيب التمام (حساب المثلثات وقانونا الجيب وجيب التمام)",
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
    "t": "mt",
    "ti": "Matching: Trigonometric & Inverse-Trig Identities (Trigonometry)",
    "ti_ar": "مطابقة: المتطابقات المثلثية والفروع العكسية (حساب المثلثات وقانونا الجيب وجيب التمام)",
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
        "l": "Period of \\(5\\sin(4x)\\)",
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
        "l": "دورة الدالة \\(5\\sin(4x)\\)",
        "r": "\\(\\dfrac{2\\pi}{4}\\)"
      }
    ]
  }
];
D["ig-coordinate"] = [
  {
    "t": "num",
    "ti": "Numeric Entry: Gradient of Perpendicular Line",
    "ti_ar": "إدخال رقمي: ميل المستقيم المتعامد",
    "q": "Line L has gradient \\(-\\frac{1}{4}\\). What is the gradient of a line perpendicular to L?",
    "q_ar": "المستقيم L ميله \\(-\\frac{1}{4}\\). ما ميل المستقيم العمودي على L؟",
    "a": 4,
    "ex": "Perpendicular gradient is the negative reciprocal: \\(m_\\perp = -\\frac{1}{-1/4} = 4\\).",
    "ex_ar": "ميل المستقيم المتعامد هو المعكوس الضربي السالب: \\(m_\\perp = -\\frac{1}{-1/4} = 4\\)."
  },
  {
    "t": "ord",
    "ti": "Order the Steps: Finding the Midpoint of a Line Segment",
    "ti_ar": "ترتيب الخطوات: إيجاد إحداثيات نقطة المنتصف",
    "prompt": "Arrange the steps to find the midpoint of segment joining \\((2, 5)\\) and \\((8, 11)\\):",
    "prompt_ar": "رتّب خطوات إيجاد نقطة المنتصف للقطعة المستقيمة الواصلة بين \\((2, 5)\\) و \\((8, 11)\\):",
    "items": [
      "Add the x-coordinates: \\(2 + 8 = 10\\).",
      "Divide the x-sum by 2: \\(10 / 2 = 5\\).",
      "Add the y-coordinates: \\(5 + 11 = 16\\).",
      "Divide the y-sum by 2: \\(16 / 2 = 8\\). Midpoint is \\((5, 8)\\)."
    ],
    "items_ar": [
      "جمع الإحداثيين السينيين: \\(2 + 8 = 10\\).",
      "قسمة مجموع الإحداثيات السينية على 2: \\(10 / 2 = 5\\).",
      "جمع الإحداثيين الصاديين: \\(5 + 11 = 16\\).",
      "قسمة مجموع الإحداثيات الصادية على 2: \\(16 / 2 = 8\\). نقطة المنتصف هي \\((5, 8)\\)."
    ],
    "ex": "Average the x-coordinates and average the y-coordinates to get the midpoint.",
    "ex_ar": "احسب متوسط الإحداثيات السينية ومتوسط الإحداثيات الصادية لإيجاد نقطة المنتصف."
  },
  {
    "t": "cat",
    "ti": "Categorize: Line Orientations",
    "ti_ar": "تصنيف: اتجاهات وميول المستقيمات",
    "categories": [
      "Positive Gradient",
      "Negative Gradient",
      "Zero Gradient (Horizontal)",
      "Undefined Gradient (Vertical)"
    ],
    "categories_ar": [
      "ميل موجب",
      "ميل سالب",
      "ميل صفري (أفقي)",
      "ميل غير معرّف (رأسي)"
    ],
    "items": [
      {
        "s": "\\(y = 3x + 2\\)",
        "cat": "Positive Gradient"
      },
      {
        "s": "\\(y = -2x + 7\\)",
        "cat": "Negative Gradient"
      },
      {
        "s": "\\(y = 5\\)",
        "cat": "Zero Gradient (Horizontal)"
      },
      {
        "s": "\\(x = -3\\)",
        "cat": "Undefined Gradient (Vertical)"
      },
      {
        "s": "Line rising from left to right",
        "cat": "Positive Gradient"
      }
    ],
    "items_ar": [
      {
        "s": "\\(y = 3x + 2\\)",
        "cat": "Positive Gradient"
      },
      {
        "s": "\\(y = -2x + 7\\)",
        "cat": "Negative Gradient"
      },
      {
        "s": "\\(y = 5\\)",
        "cat": "Zero Gradient (Horizontal)"
      },
      {
        "s": "\\(x = -3\\)",
        "cat": "Undefined Gradient (Vertical)"
      },
      {
        "s": "مستقيم صاعد من اليسار إلى اليمين",
        "cat": "Positive Gradient"
      }
    ],
    "ex": "Horizontal lines have m = 0; vertical lines have undefined m; rising lines have m > 0; falling lines have m < 0.",
    "ex_ar": "المستقيمات الأفقية ميلها m = 0؛ والرأسية ميلها غير معرّف؛ والصاعدة m > 0؛ والهابطة m < 0."
  },
  {
    "t": "fn",
    "ti": "Explorer: Line \\(y=mx+c\\)",
    "ti_ar": "مستكشف: المستقيم \\(y=mx+c\\)",
    "fns": [
      {
        "expr": "m*x+c",
        "color": "#1E3A6E"
      }
    ],
    "xrange": [
      -5,
      5
    ],
    "yrange": [
      -8,
      8
    ],
    "params": [
      {
        "name": "m",
        "label": "Gradient m",
        "min": -3,
        "max": 3,
        "step": 0.5,
        "default": 1
      },
      {
        "name": "c",
        "label": "Intercept c",
        "min": -5,
        "max": 5,
        "step": 1,
        "default": 0
      }
    ]
  },
  {
    "t": "sr",
    "ti": "Worked Example: Perpendicular Line",
    "ti_ar": "مثال محلول: المستقيم المتعامد",
    "steps": [
      "Line ℓ has equation \\(y=2x-1\\). Find the line perpendicular to ℓ through \\((4,3)\\). First find the perpendicular gradient.",
      "\\(m_\\perp=-\\dfrac{1}{2}\\) (negative reciprocal of 2).",
      "Substitute into \\(y-y_1=m(x-x_1)\\): \\(y-3=-\\tfrac12(x-4)\\Rightarrow y=-\\tfrac12x+5\\)."
    ],
    "steps_ar": [
      "المستقيم ℓ معادلته \\(y=2x-1\\). أوجد معادلة المستقيم المتعامد مع ℓ والمار بالنقطة \\((4,3)\\). أولاً نوجد ميل العمودي.",
      "\\(m_\\perp=-\\dfrac{1}{2}\\) (المعكوس الضربي السالب لـ 2).",
      "بالتعويض في \\(y-y_1=m(x-x_1)\\): \\(y-3=-\\tfrac12(x-4)\\Rightarrow y=-\\tfrac12x+5\\)."
    ]
  },
  {
    "t": "qc",
    "ti": "Quick Check: Gradient",
    "ti_ar": "فحص سريع: الميل",
    "q": "Find the gradient of the line through \\((2,3)\\) and \\((6,11)\\).",
    "q_ar": "أوجد ميل المستقيم المار بالنقطتين \\((2,3)\\) و \\((6,11)\\).",
    "o": [
      "2",
      "4",
      "8",
      "1/2"
    ],
    "o_ar": [
      "2",
      "4",
      "8",
      "1/2"
    ],
    "a": 0,
    "ex": "\\(m=\\dfrac{11-3}{6-2}=\\dfrac{8}{4}=2\\).",
    "ex_ar": "\\(m=\\dfrac{11-3}{6-2}=\\dfrac{8}{4}=2\\)."
  },
  {
    "t": "se",
    "ti": "Spot the Error: Perpendicular Gradient & Inequality Sign (Coordinate Geometry)",
    "ti_ar": "اكتشف الخطأ: ميل المستقيم المتعامد وإشارة المتباينة (الهندسة الإحداثية ومعادلات المستقيم)",
    "q": "Given \\(A(4, 4)\\) and \\(B(6, 12)\\), a student finds the gradient of the line perpendicular to \\(AB\\). Which step is wrong?",
    "q_ar": "مُعطى النقطتان \\(A(4, 4)\\) و\\(B(6, 12)\\)، يحسب طالب ميل العمودي على \\(AB\\). أي خطوة خاطئة؟",
    "steps": [
      "Compute gradient of \\(AB\\): \\(m_{AB} = \\frac{12 - 4}{6 - 4} = \\frac{8}{2} = 4\\).",
      "Compute midpoint of \\(AB\\): \\(M = (5, 8)\\).",
      "Take the perpendicular gradient as the positive reciprocal \\(m_{\\perp} = \\frac{1}{4}\\) without negating the sign.",
      "Substitute \\(M(5, 8)\\) into point-slope form."
    ],
    "steps_ar": [
      "حساب ميل القطعة \\(AB\\): \\(m_{AB} = \\frac{12 - 4}{6 - 4} = 4\\).",
      "حساب نقطة المنتصف: \\(M = (5, 8)\\).",
      "أخذ ميل العمودي كمقلوب موجب \\(m_{\\perp} = \\frac{1}{4}\\) دون عكس الإشارة.",
      "التعويض بالنقطة \\(M(5, 8)\\) في معادلة المستقيم."
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
    "q": "Points \\(A(4, 4)\\) and \\(B(6, 12)\\) lie in the coordinate plane. (a) Find the equation of line \\(AB\\) in \\(y = mx + c\\) form. (b) Find the midpoint \\(M\\) and the gradient of the perpendicular bisector of \\(AB\\).",
    "q_ar": "النقطتان \\(A(4, 4)\\) و\\(B(6, 12)\\) في المستوى الإحداثي. (أ) أوجد معادلة المستقيم \\(AB\\) بصيغة \\(y = mx + c\\). (ب) أوجد نقطة المنتصف \\(M\\) وميل العمود المنصّف للقطعة \\(AB\\).",
    "parts": [
      {
        "label": "Part (a) — Gradient & Line Equation",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "Gradient \\(m = \\frac{12 - 4}{6 - 4} = 4\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "Intercept \\(c = 4 - 4(4) = -12\\), giving \\(y = 4x - 12\\)."
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
            "text": "Midpoint \\(M = \\left(\\frac{4+6}{2}, \\frac{4+12}{2}\\right) = (5, 8)\\)."
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
            "text": "الميل \\(m = \\frac{12 - 4}{6 - 4} = 4\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "المقطع الصادي \\(c = -12\\)، والمعادلة \\(y = 4x - 12\\)."
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
            "text": "نقطة المنتصف \\(M = (5, 8)\\)."
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
        "l": "Find the slope \\(m\\) through \\((4, 4)\\) and \\((6, 12)\\): \\(m =\\)",
        "a": "4",
        "h": "Compute (12 − 4) / (6 − 4)."
      },
      {
        "l": "Find the \\(y\\)-intercept \\(c\\) in \\(y = mx + c\\): \\(c =\\)",
        "a": "-12",
        "h": "Compute 4 − 4×4."
      },
      {
        "l": "Find the \\(y\\)-coordinate of the midpoint \\(M\\): \\(y_M =\\)",
        "a": "8",
        "h": "Average 4 and 12."
      }
    ],
    "steps_ar": [
      {
        "l": "أوجد الميل \\(m\\) للمستقيم المار بـ \\((4, 4)\\) و\\((6, 12)\\): \\(m =\\)",
        "a": "4",
        "h": "احسب (12 − 4) ÷ (6 − 4)."
      },
      {
        "l": "أوجد المقطع الصادي \\(c\\) في \\(y = mx + c\\): \\(c =\\)",
        "a": "-12",
        "h": "احسب 4 − 4×4."
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
D["ig-mensuration"] = [
  {
    "t": "num",
    "ti": "Numeric Entry: Volume of a Cylinder",
    "ti_ar": "إدخال رقمي: حجم الأسطوانة",
    "q": "A cylinder has radius \\(r = 5\\text{ cm}\\) and height \\(h = 8\\text{ cm}\\). Find its volume in terms of \\(\\pi\\) (enter the coefficient of \\(\\pi\\)).",
    "q_ar": "أسطوانة نصف قطر قاعدتها \\(r = 5\\text{ cm}\\) وارتفاعها \\(h = 8\\text{ cm}\\). أوجد حجمها بدلالة \\(\\pi\\) (أدخل معامل \\(\\pi\\)).",
    "a": 200,
    "ex": "\\(V = \\pi r^2 h = \\pi (5^2)(8) = 200\\pi\\). The coefficient is 200.",
    "ex_ar": "\\(V = \\pi r^2 h = \\pi (5^2)(8) = 200\\pi\\). المعامل هو 200."
  },
  {
    "t": "ord",
    "ti": "Order the Steps: Calculating Area of a Trapezium",
    "ti_ar": "ترتيب الخطوات: حساب مساحة شبه المنحرف",
    "prompt": "Arrange the steps to compute the area of a trapezium with parallel sides 6 cm and 10 cm and height 5 cm:",
    "prompt_ar": "رتّب خطوات حساب مساحة شبه منحرف طولا قاعدتيه المتوازيتين 6 cm و 10 cm وارتفاعه 5 cm:",
    "items": [
      "Add the parallel side lengths: \\(a + b = 6 + 10 = 16\\text{ cm}\\).",
      "Multiply the sum by the perpendicular height: \\(16 \\times 5 = 80\\).",
      "Divide by 2: \\(80 / 2 = 40\\text{ cm}^2\\)."
    ],
    "items_ar": [
      "جمع طولي القاعدتين المتوازيتين: \\(a + b = 6 + 10 = 16\\text{ cm}\\).",
      "ضرب المجموع في الارتفاع العمودي: \\(16 \\times 5 = 80\\).",
      "القسمة على 2: \\(80 / 2 = 40\\text{ cm}^2\\)."
    ],
    "ex": "Formula A = 1/2(a + b)h: add parallel sides, multiply by height, and halve.",
    "ex_ar": "القانون A = 1/2(a + b)h: اجمع القاعدتين المتوازيتين، اضرب بالارتفاع، واقسم على 2."
  },
  {
    "t": "cat",
    "ti": "Categorize: 2D Perimeter vs Area vs 3D Volume Formulas",
    "ti_ar": "تصنيف: صيغ المحيط ثنائي الأبعاد والمساحة والحجم ثلاثي الأبعاد",
    "categories": [
      "Length / Perimeter",
      "Area",
      "Volume"
    ],
    "categories_ar": [
      "طول / محيط",
      "مساحة",
      "حجم"
    ],
    "items": [
      {
        "s": "\\(2\\pi r\\)",
        "cat": "Length / Perimeter"
      },
      {
        "s": "\\(\\pi r^2\\)",
        "cat": "Area"
      },
      {
        "s": "\\(\\frac{4}{3}\\pi r^3\\)",
        "cat": "Volume"
      },
      {
        "s": "\\(\\pi r^2 h\\)",
        "cat": "Volume"
      },
      {
        "s": "\\(\\frac{\\theta}{360} \\times 2\\pi r\\)",
        "cat": "Length / Perimeter"
      },
      {
        "s": "\\(\\frac{1}{2}(a+b)h\\)",
        "cat": "Area"
      }
    ],
    "items_ar": [
      {
        "s": "\\(2\\pi r\\)",
        "cat": "Length / Perimeter"
      },
      {
        "s": "\\(\\pi r^2\\)",
        "cat": "Area"
      },
      {
        "s": "\\(\\frac{4}{3}\\pi r^3\\)",
        "cat": "Volume"
      },
      {
        "s": "\\(\\pi r^2 h\\)",
        "cat": "Volume"
      },
      {
        "s": "\\(\\frac{\\theta}{360} \\times 2\\pi r\\)",
        "cat": "Length / Perimeter"
      },
      {
        "s": "\\(\\frac{1}{2}(a+b)h\\)",
        "cat": "Area"
      }
    ],
    "ex": "Single linear power represents length/perimeter, square represents area, and cube represents volume.",
    "ex_ar": "الدرجة الخطية الواحدة تمثل طولاً/محيطاً، والتربيعية تمثل مساحة، والتكعيبية تمثل حجماً."
  },
  {
    "t": "sr",
    "ti": "Worked Example: Volume of a Cone",
    "ti_ar": "مثال محلول: حجم المخروط",
    "steps": [
      "Find the volume of a cone with radius 4 cm and height 9 cm. Use \\(V=\\tfrac13\\pi r^2h\\).",
      "\\(V=\\tfrac13\\times\\pi\\times4^2\\times9=\\tfrac13\\times\\pi\\times144\\).",
      "\\(V=48\\pi\\approx150.8\\ \\text{cm}^3\\)."
    ],
    "steps_ar": [
      "أوجد حجم مخروط نصف قطر قاعدته 4 cm وارتفاعه 9 cm باستخدام القانون \\(V=\\tfrac13\\pi r^2h\\).",
      "\\(V=\\tfrac13\\times\\pi\\times4^2\\times9=\\tfrac13\\times\\pi\\times144\\).",
      "\\(V=48\\pi\\approx150.8\\ \\text{cm}^3\\)."
    ]
  },
  {
    "t": "qc",
    "ti": "Quick Check: Sphere Volume",
    "ti_ar": "فحص سريع: حجم الكرة",
    "q": "Find the volume of a sphere with radius 3 cm (take \\(\\pi=3.14\\)).",
    "q_ar": "أوجد حجم كرة نصف قطرها 3 cm (اعتبر \\(\\pi=3.14\\)).",
    "o": [
      "113.04 cm³",
      "37.68 cm³",
      "339.12 cm³",
      "28.26 cm³"
    ],
    "o_ar": [
      "113.04 cm³",
      "37.68 cm³",
      "339.12 cm³",
      "28.26 cm³"
    ],
    "a": 0,
    "ex": "\\(V=\\tfrac43\\pi r^3=\\tfrac43\\times3.14\\times27=113.04\\) cm³.",
    "ex_ar": "\\(V=\\tfrac43\\pi r^3=\\tfrac43\\times3.14\\times27=113.04\\) سم³."
  },
  {
    "t": "se",
    "ti": "Spot the Error: Area & Volume Similarity Scaling (Mensuration)",
    "ti_ar": "اكتشف الخطأ: معامل تشابه المساحات والحجوم (القياسات الهندسية: المحيط والمساحة والحجم)",
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
    "ti": "Examiner Mode: Circle Theorems, Sectors & Similarity (Mensuration)",
    "ti_ar": "وضع المصحح: نظريات الدائرة والقطاعات والتشابه (القياسات الهندسية: المحيط والمساحة والحجم)",
    "q": "A circle has equation \\((x - 1)^2 + (y + 2)^2 = 16\\). (a) State its center and radius \\(r\\). (b) A sector of this circle subtends \\(\\theta = \\frac{\\pi}{2}\\) radians; find exact arc length and sector area in terms of \\(\\pi\\).",
    "q_ar": "دائرة معادلتها \\((x - 1)^2 + (y + 2)^2 = 16\\). (أ) اذكر المركز ونصف القطر \\(r\\). (ب) قطاع في هذه الدائرة زاويته المركزية \\(\\theta = \\frac{\\pi}{2}\\) راديان؛ أوجد طول القوس ومساحة القطاع بدلالة \\(\\pi\\).",
    "parts": [
      {
        "label": "Part (a) — Circle Center & Radius",
        "marks": 2,
        "rubric": [
          {
            "code": "B1",
            "marks": 1,
            "text": "Center \\((h, k) = (1, -2)\\)."
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
            "text": "المركز \\((1, -2)\\)."
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
    "ti": "Step Builder: Circle Radius, Polygon Angles & Similarity (Mensuration)",
    "ti_ar": "بناء الخطوات: الدائرة وزوايا المضلعات والتشابه (القياسات الهندسية: المحيط والمساحة والحجم)",
    "steps": [
      {
        "l": "From \\((x - 1)^2 + (y + 2)^2 = 16\\), find the radius \\(r =\\)",
        "a": "4",
        "h": "Take the square root of 16."
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
        "l": "من المعادلة \\((x - 1)^2 + (y + 2)^2 = 16\\)، أوجد نصف القطر \\(r =\\)",
        "a": "4",
        "h": "خذ الجذر التربيعي للعدد 16."
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
    "ti": "Matching: Circle Theorems & Solid Mensuration (Mensuration)",
    "ti_ar": "مطابقة: نظريات الدائرة وقوانين القياس الهندسي (القياسات الهندسية: المحيط والمساحة والحجم)",
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
D["ig-transform"] = [
  {
    "t": "num",
    "ti": "Numeric Entry: Vector Magnitude",
    "ti_ar": "إدخال رقمي: مقدار المتجه (معياره)",
    "q": "Find the magnitude of the column vector \\(\\binom{8}{-15}\\).",
    "q_ar": "أوجد مقدار (معيار) المتجه العمودي \\(\\binom{8}{-15}\\).",
    "a": 17,
    "ex": "\\(|\\mathbf{v}| = \\sqrt{8^2 + (-15)^2} = \\sqrt{64 + 225} = \\sqrt{289} = 17\\).",
    "ex_ar": "\\(|\\mathbf{v}| = \\sqrt{8^2 + (-15)^2} = \\sqrt{64 + 225} = \\sqrt{289} = 17\\)."
  },
  {
    "t": "ord",
    "ti": "Order the Steps: Fully Describing an Enlargement",
    "ti_ar": "ترتيب الخطوات: الوصف الكامل للتكبير / التمدد",
    "prompt": "Arrange the components to fully describe an enlargement transformation:",
    "prompt_ar": "رتّب العناصر لوصف تحويل التكبير (التمدد) وصفاً كاملاً:",
    "items": [
      "State the single word transformation name: Enlargement.",
      "Determine and state the scale factor k (ratio of image side to object side).",
      "Draw rays connecting corresponding object-image vertices to find where they intersect.",
      "State the coordinates of the centre of enlargement \\((h, k)\\)."
    ],
    "items_ar": [
      "تحديد اسم التحويل الهندسي: تكبير (تمدد).",
      "تحديد وذكر معامل التكبير k (نسبة طول ضلع الصورة إلى طول الضلع الأصلي).",
      "رسم أشعة بين الرؤوس المتناظرة في الشكل والصورة لتحديد نقطة تقاطعها.",
      "كتابة إحداثيات مركز التكبير \\((h, k)\\)."
    ],
    "ex": "Name transformation, state scale factor k, and specify centre of enlargement (x, y).",
    "ex_ar": "اذكر اسم التحويل، وحدد معامل التكبير k، وعيّن إحداثيات مركز التكبير (x, y)."
  },
  {
    "t": "cat",
    "ti": "Categorize: Transformation Invariants",
    "ti_ar": "تصنيف: خواص وثوابت التحويلات الهندسية",
    "categories": [
      "Preserves Both Size and Shape (Congruent)",
      "Changes Size but Preserves Shape (Similar)"
    ],
    "categories_ar": [
      "يحافظ على القياس والشكل (تطابق)",
      "يغير القياس مع الحفاظ على الشكل (تشابه)"
    ],
    "items": [
      {
        "s": "Translation by vector",
        "cat": "Preserves Both Size and Shape (Congruent)"
      },
      {
        "s": "Rotation about centre",
        "cat": "Preserves Both Size and Shape (Congruent)"
      },
      {
        "s": "Reflection in a mirror line",
        "cat": "Preserves Both Size and Shape (Congruent)"
      },
      {
        "s": "Enlargement with scale factor k = 2",
        "cat": "Changes Size but Preserves Shape (Similar)"
      },
      {
        "s": "Enlargement with scale factor k = 0.5",
        "cat": "Changes Size but Preserves Shape (Similar)"
      }
    ],
    "items_ar": [
      {
        "s": "الانسحاب (الإزاحة) بمتجه",
        "cat": "Preserves Both Size and Shape (Congruent)"
      },
      {
        "s": "الدوران حول نقطة المركز",
        "cat": "Preserves Both Size and Shape (Congruent)"
      },
      {
        "s": "الانعكاس في مستقيم (محور المرآة)",
        "cat": "Preserves Both Size and Shape (Congruent)"
      },
      {
        "s": "تكبير (تمدد) بمعامل قياس k = 2",
        "cat": "Changes Size but Preserves Shape (Similar)"
      },
      {
        "s": "تكبير (تمدد) بمعامل قياس k = 0.5",
        "cat": "Changes Size but Preserves Shape (Similar)"
      }
    ],
    "ex": "Isometric transformations (translation, rotation, reflection) preserve congruence; enlargement changes size.",
    "ex_ar": "تحويلات التقايس (الانسحاب، الدوران، الانعكاس) تحفظ التطابق؛ بينما التكبير يغير المقاييس ويحفظ التشابه."
  },
  {
    "t": "sr",
    "ti": "Worked Example: Enlargement",
    "ti_ar": "مثال محلول: التكبير (التمدد)",
    "steps": [
      "Triangle T has vertex \\(P(2,1)\\). Enlarge T with scale factor 3, centre the origin. Find the image of P.",
      "Each coordinate is multiplied by the scale factor: image \\(=(3\\times2,\\ 3\\times1)\\).",
      "Image of P \\(=(6,3)\\)."
    ],
    "steps_ar": [
      "المثلث T يحتوي الرأس \\(P(2,1)\\). أوجد صورة P بتكبير معامله 3 ومركزه نقطة الأصل.",
      "يُضرب كل إحداثي في معامل التكبير: الصورة \\(=(3\\times2,\\ 3\\times1)\\).",
      "صورة الرأس P هي \\((6,3)\\)."
    ]
  },
  {
    "t": "qc",
    "ti": "Quick Check: Vector Magnitude",
    "ti_ar": "فحص سريع: مقدار المتجه",
    "q": "Find the magnitude of the vector \\(\\binom{6}{8}\\).",
    "q_ar": "أوجد مقدار المتجه \\(\\binom{6}{8}\\).",
    "o": [
      "10",
      "14",
      "48",
      "2"
    ],
    "o_ar": [
      "10",
      "14",
      "48",
      "2"
    ],
    "a": 0,
    "ex": "\\(|\\mathbf{v}|=\\sqrt{6^2+8^2}=\\sqrt{100}=10\\).",
    "ex_ar": "\\(|\\mathbf{v}|=\\sqrt{6^2+8^2}=\\sqrt{100}=10\\)."
  },
  {
    "t": "se",
    "ti": "Spot the Error: Area & Volume Similarity Scaling (Transformations & Vectors)",
    "ti_ar": "اكتشف الخطأ: معامل تشابه المساحات والحجوم (التحويلات الهندسية والمتجهات والمصفوفات)",
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
    "ti": "Examiner Mode: Circle Theorems, Sectors & Similarity (Transformations & Vectors)",
    "ti_ar": "وضع المصحح: نظريات الدائرة والقطاعات والتشابه (التحويلات الهندسية والمتجهات والمصفوفات)",
    "q": "A circle has equation \\((x - 4)^2 + (y + 2)^2 = 100\\). (a) State its center and radius \\(r\\). (b) A sector of this circle subtends \\(\\theta = \\frac{\\pi}{2}\\) radians; find exact arc length and sector area in terms of \\(\\pi\\).",
    "q_ar": "دائرة معادلتها \\((x - 4)^2 + (y + 2)^2 = 100\\). (أ) اذكر المركز ونصف القطر \\(r\\). (ب) قطاع في هذه الدائرة زاويته المركزية \\(\\theta = \\frac{\\pi}{2}\\) راديان؛ أوجد طول القوس ومساحة القطاع بدلالة \\(\\pi\\).",
    "parts": [
      {
        "label": "Part (a) — Circle Center & Radius",
        "marks": 2,
        "rubric": [
          {
            "code": "B1",
            "marks": 1,
            "text": "Center \\((h, k) = (4, -2)\\)."
          },
          {
            "code": "B1",
            "marks": 1,
            "text": "Radius \\(r = \\sqrt{100} = 10\\)."
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
            "text": "Arc length \\(s = r\\theta = 10 \\cdot \\frac{\\pi}{2} = 5\\pi\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "Sector area \\(A = \\frac{1}{2} r^2 \\theta = \\frac{1}{2}(100)\\frac{\\pi}{2} = 25\\pi\\)."
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
            "text": "المركز \\((4, -2)\\)."
          },
          {
            "code": "B1",
            "marks": 1,
            "text": "نصف القطر \\(r = \\sqrt{100} = 10\\)."
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
            "text": "طول القوس \\(s = r\\theta = 5\\pi\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "مساحة القطاع \\(A = \\frac{1}{2} r^2 \\theta = 25\\pi\\)."
          }
        ]
      }
    ]
  },
  {
    "t": "sb",
    "ti": "Step Builder: Circle Radius, Polygon Angles & Similarity (Transformations & Vectors)",
    "ti_ar": "بناء الخطوات: الدائرة وزوايا المضلعات والتشابه (التحويلات الهندسية والمتجهات والمصفوفات)",
    "steps": [
      {
        "l": "From \\((x - 4)^2 + (y + 2)^2 = 100\\), find the radius \\(r =\\)",
        "a": "10",
        "h": "Take the square root of 100."
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
        "l": "من المعادلة \\((x - 4)^2 + (y + 2)^2 = 100\\)، أوجد نصف القطر \\(r =\\)",
        "a": "10",
        "h": "خذ الجذر التربيعي للعدد 100."
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
    "ti": "Matching: Circle Theorems & Solid Mensuration (Transformations & Vectors)",
    "ti_ar": "مطابقة: نظريات الدائرة وقوانين القياس الهندسي (التحويلات الهندسية والمتجهات والمصفوفات)",
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
D["ig-stats"] = [
  {
    "t": "num",
    "ti": "Numeric Entry: Interquartile Range from Summary",
    "ti_ar": "إدخال رقمي: المدى الربيعي من ملخص البيانات",
    "q": "A box plot shows \\(Q_1 = 34\\) and \\(Q_3 = 58\\). What is the interquartile range (IQR)?",
    "q_ar": "في مخطط الصندوق وطرفيه: \\(Q_1 = 34\\) و \\(Q_3 = 58\\). ما قيمة المدى الربيعي (IQR)؟",
    "a": 24,
    "ex": "\\(\\text{IQR} = Q_3 - Q_1 = 58 - 34 = 24\\).",
    "ex_ar": "\\(\\text{IQR} = Q_3 - Q_1 = 58 - 34 = 24\\)."
  },
  {
    "t": "ord",
    "ti": "Order the Steps: Calculating Frequency Density for a Histogram",
    "ti_ar": "ترتيب الخطوات: حساب الكثافة التكرارية للمدرج التكراري",
    "prompt": "Arrange the steps to find the height of a histogram bar for interval 20 to 35 with frequency 45:",
    "prompt_ar": "رتّب خطوات إيجاد ارتفاع عمود المدرج التكراري للفترة من 20 إلى 35 وتكرارها 45:",
    "items": [
      "Determine the class width: \\(35 - 20 = 15\\).",
      "Identify the given class frequency: \\(f = 45\\).",
      "Divide frequency by class width: \\(45 / 15 = 3\\).",
      "Plot the bar with height equal to frequency density 3."
    ],
    "items_ar": [
      "حساب طول الفئة: \\(35 - 20 = 15\\).",
      "تحديد التكرار المعطى للفئة: \\(f = 45\\).",
      "قسمة التكرار على طول الفئة: \\(45 / 15 = 3\\).",
      "رسم العمود بارتفاع مساوٍ للكثافة التكرارية 3."
    ],
    "ex": "Class width = upper - lower, frequency density = frequency / class width, plot bar height.",
    "ex_ar": "طول الفئة = الحد الأعلى - الحد الأدنى، والكثافة التكرارية = التكرار / طول الفئة، ثم يُمثل الارتفاع."
  },
  {
    "t": "cat",
    "ti": "Categorize: Types of Data",
    "ti_ar": "تصنيف: أنواع البيانات الإحصائية",
    "categories": [
      "Discrete Numerical",
      "Continuous Numerical",
      "Categorical (Qualitative)"
    ],
    "categories_ar": [
      "كمية منفصلة (متقطعة)",
      "كمية متصلة (مستمرة)",
      "نوعية (وصفية)"
    ],
    "items": [
      {
        "s": "Number of cars in a parking lot",
        "cat": "Discrete Numerical"
      },
      {
        "s": "Height of students in cm",
        "cat": "Continuous Numerical"
      },
      {
        "s": "Favorite color of car",
        "cat": "Categorical (Qualitative)"
      },
      {
        "s": "Time taken to run 100 meters",
        "cat": "Continuous Numerical"
      },
      {
        "s": "Shoe sizes (e.g. 7, 8, 9)",
        "cat": "Discrete Numerical"
      }
    ],
    "items_ar": [
      {
        "s": "عدد السيارات في موقف السيارات",
        "cat": "Discrete Numerical"
      },
      {
        "s": "طول قامة الطلاب بالسنتيمتر",
        "cat": "Continuous Numerical"
      },
      {
        "s": "اللون المفضل للسيارة",
        "cat": "Categorical (Qualitative)"
      },
      {
        "s": "الزمن المستغرق لقطع مسافة 100 متر",
        "cat": "Continuous Numerical"
      },
      {
        "s": "مقاسات الأحذية (مثل 7، 8، 9)",
        "cat": "Discrete Numerical"
      }
    ],
    "ex": "Countable quantities are discrete; measurable quantities on a continuous scale are continuous; labels are categorical.",
    "ex_ar": "البيانات المعدودة منفصلة؛ والبيانات المقاسة بمقياس مستمر متصلة؛ والتصنيفات والصفات نوعية."
  },
  {
    "t": "sr",
    "ti": "Worked Example: Tree Diagram Without Replacement",
    "ti_ar": "مثال محلول: الشجرة البيانية دون إرجاع",
    "steps": [
      "A bag has 4 red and 2 blue balls. Two are drawn without replacement. Find \\(P(\\text{both blue})\\).",
      "First draw: \\(P(\\text{blue})=\\tfrac{2}{6}=\\tfrac13\\). After removing one blue, 1 blue remains out of 5.",
      "\\(P(\\text{both blue})=\\tfrac26\\times\\tfrac15=\\tfrac{2}{30}=\\tfrac{1}{15}\\)."
    ],
    "steps_ar": [
      "كيس يحتوي 4 كرات حمراء وكرتين زرقاوين. سُحبت كرتان عشوائياً دون إرجاع. احسب \\(P(\\text{الكرتان زرقاوان})\\).",
      "السحبة الأولى: \\(P(\\text{زرقاء})=\\tfrac{2}{6}=\\tfrac13\\). بعد سحب كرة زرقاء، يتبقى كرة زرقاء واحدة من أصل 5 كرات.",
      "\\(P(\\text{الكرتان زرقاوان})=\\tfrac26\\times\\tfrac15=\\tfrac{2}{30}=\\tfrac{1}{15}\\)."
    ]
  },
  {
    "t": "qc",
    "ti": "Quick Check: Mean",
    "ti_ar": "فحص سريع: المتوسط الحسابي",
    "q": "Find the mean of \\(5,\\,9,\\,12,\\,6,\\,8\\).",
    "q_ar": "أوجد المتوسط الحسابي للقيم: \\(5,\\,9,\\,12,\\,6,\\,8\\).",
    "o": [
      "8",
      "9",
      "7",
      "10"
    ],
    "o_ar": [
      "8",
      "9",
      "7",
      "10"
    ],
    "a": 0,
    "ex": "\\((5+9+12+6+8)/5=40/5=8\\).",
    "ex_ar": "\\((5+9+12+6+8)/5=40/5=8\\)."
  },
  {
    "t": "se",
    "ti": "Spot the Error: Variance of Difference of Independent Variables (Probability & Statistics)",
    "ti_ar": "اكتشف الخطأ: تباين الفرق بين متغيرين عشوائيين مستقلين (الاحتمالات والإحصاء وتمثيل البيانات)",
    "q": "Independent random variables \\(X\\) and \\(Y\\) have \\(\\operatorname{Var}(X) = 4\\) and \\(\\operatorname{Var}(Y) = 3\\). A student computes \\(\\operatorname{Var}(X - Y)\\). Which step is invalid?",
    "q_ar": "متغيران عشوائيان مستقلان \\(X\\) و\\(Y\\) تبايناهما \\(\\operatorname{Var}(X) = 4\\) و\\(\\operatorname{Var}(Y) = 3\\). يحسب طالب \\(\\operatorname{Var}(X - Y)\\). أي خطوة خاطئة؟",
    "steps": [
      "Verify that \\(X\\) and \\(Y\\) are statistically independent (\\(\\operatorname{Cov}(X,Y) = 0\\)).",
      "Subtract the variances directly: \\(\\operatorname{Var}(X - Y) = 4 - 3 = 1\\).",
      "Take square root for standard deviation."
    ],
    "steps_ar": [
      "التحقق من استقلال \\(X\\) و\\(Y\\) إحصائياً.",
      "طرح التباينين مباشرة: \\(\\operatorname{Var}(X - Y) = 4 - 3 = 1\\).",
      "أخذ الجذر التربيعي لإيجاد الانحراف المعياري."
    ],
    "errorStep": 2,
    "reasons": [
      "Because coefficients square in variance, \\(\\operatorname{Var}(X - Y) = 1^2\\operatorname{Var}(X) + (-1)^2\\operatorname{Var}(Y) = 4 + 3 = 7\\) — independent variances ALWAYS add.",
      "\\(\\operatorname{Var}(X - Y)\\) equals \\(\\operatorname{Var}(X) \\cdot \\operatorname{Var}(Y)\\).",
      "Expected values cannot be subtracted."
    ],
    "reasons_ar": [
      "لأن المعاملات تُربَّع في التباين: \\(\\operatorname{Var}(X - Y) = \\operatorname{Var}(X) + (-1)^2\\operatorname{Var}(Y) = 7\\) — التباينات المستقلة تُجمع دائماً.",
      "التباين يساوي حاصل ضرب التباينين.",
      "لا يجوز طرح التوقعات الرياضية."
    ],
    "correctReason": 0
  },
  {
    "t": "ms",
    "ti": "Examiner Mode: Standard Error, Variance & Conditional Probability (Probability & Statistics)",
    "ti_ar": "وضع المصحح: الخطأ المعياري والتباين والاحتمال الشرطي (الاحتمالات والإحصاء وتمثيل البيانات)",
    "q": "(a) A population has standard deviation \\(\\sigma = 12\\). For a simple random sample of size \\(n = 16\\), find the standard error \\(\\sigma_{\\bar{x}}\\) and state what happens to \\(\\sigma_{\\bar{x}}\\) if \\(n\\) quadruples. (b) Independent \\(X, Y\\) have \\(\\operatorname{Var}(X) = 4,\\; \\operatorname{Var}(Y) = 3\\); compute \\(\\operatorname{Var}(2X - Y)\\).",
    "q_ar": "(أ) مجتمع انحرافه المعياري \\(\\sigma = 12\\). لعينة عشوائية حجمها \\(n = 16\\)، احسب الخطأ المعياري \\(\\sigma_{\\bar{x}}\\) واذكر ماذا يحدث له عند مضاعفة \\(n\\) أربع مرات. (ب) للمتغيرين المستقلين \\(X, Y\\) حيث \\(\\operatorname{Var}(X) = 4,\\; \\operatorname{Var}(Y) = 3\\)، احسب \\(\\operatorname{Var}(2X - Y)\\).",
    "parts": [
      {
        "label": "Part (a) — Sampling Distribution Standard Error",
        "marks": 2,
        "rubric": [
          {
            "code": "A1",
            "marks": 1,
            "text": "\\(\\sigma_{\\bar{x}} = \\dfrac{\\sigma}{\\sqrt{n}} = \\dfrac{12}{\\sqrt{16}} = \\dfrac{12}{4} = 3\\)."
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
            "text": "\\(4(4) + 3 = 19\\)."
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
            "text": "\\(\\sigma_{\\bar{x}} = \\dfrac{12}{\\sqrt{16}} = 3\\)."
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
            "text": "الناتج: \\(4(4) + 3 = 19\\)."
          }
        ]
      }
    ]
  },
  {
    "t": "sb",
    "ti": "Step Builder: Standard Error & Independent Variance (Probability & Statistics)",
    "ti_ar": "بناء الخطوات: الخطأ المعياري وتباين المتغيرات المستقلة (الاحتمالات والإحصاء وتمثيل البيانات)",
    "steps": [
      {
        "l": "Compute \\(\\sqrt{n}\\) for sample size \\(n = 16\\):",
        "a": "4",
        "h": "Square root of 16."
      },
      {
        "l": "Find standard error \\(\\sigma / \\sqrt{n}\\) when \\(\\sigma = 12\\):",
        "a": "3",
        "h": "Divide 12 by 4."
      },
      {
        "l": "For independent \\(\\operatorname{Var}(X) = 4,\\; \\operatorname{Var}(Y) = 3\\), find \\(\\operatorname{Var}(X - Y) =\\)",
        "a": "7",
        "h": "Add 4 + 3."
      }
    ],
    "steps_ar": [
      {
        "l": "احسب \\(\\sqrt{n}\\) لحجم العينة \\(n = 16\\):",
        "a": "4",
        "h": "الجذر التربيعي للعدد 16."
      },
      {
        "l": "أوجد الخطأ المعياري \\(\\sigma / \\sqrt{n}\\) عندما \\(\\sigma = 12\\):",
        "a": "3",
        "h": "اقسم 12 على 4."
      },
      {
        "l": "للمتغيرين المستقلين \\(\\operatorname{Var}(X) = 4,\\; \\operatorname{Var}(Y) = 3\\)، احسب \\(\\operatorname{Var}(X - Y) =\\)",
        "a": "7",
        "h": "اجمع 4 + 3."
      }
    ]
  },
  {
    "t": "mt",
    "ti": "Matching: Probability, Distributions & Inference Rules (Probability & Statistics)",
    "ti_ar": "مطابقة: قوانين الاحتمالات والتوزيعات والاستدلال (الاحتمالات والإحصاء وتمثيل البيانات)",
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
D["ig-functions"] = [
  {
    "t": "num",
    "ti": "Numeric Entry: Composite Function Evaluation",
    "ti_ar": "إدخال رقمي: إيجاد قيمة الدالة المركبة",
    "q": "If \\(f(x) = 3x + 1\\) and \\(g(x) = x^2 - 2\\), evaluate \\(fg(3)\\).",
    "q_ar": "إذا كانت \\(f(x) = 3x + 1\\) و \\(g(x) = x^2 - 2\\)، احسب قيمة \\(fg(3)\\).",
    "a": 22,
    "ex": "Compute inner function first: \\(g(3) = 3^2 - 2 = 7\\). Then \\(f(7) = 3(7) + 1 = 22\\).",
    "ex_ar": "احسب الدالة الداخلية أولاً: \\(g(3) = 3^2 - 2 = 7\\). ثم \\(f(7) = 3(7) + 1 = 22\\)."
  },
  {
    "t": "ord",
    "ti": "Order the Steps: Finding the Inverse of a Linear Function",
    "ti_ar": "ترتيب الخطوات: إيجاد الدالة العكسية لدالة خطية",
    "prompt": "Arrange the steps to find the inverse \\(f^{-1}(x)\\) of \\(f(x) = 4x - 7\\):",
    "prompt_ar": "رتّب خطوات إيجاد الدالة العكسية \\(f^{-1}(x)\\) للدالة \\(f(x) = 4x - 7\\):",
    "items": [
      "Write as an equation: \\(y = 4x - 7\\).",
      "Add 7 to both sides: \\(y + 7 = 4x\\).",
      "Divide both sides by 4: \\(x = \\frac{y + 7}{4}\\).",
      "Replace y with x to write the inverse function: \\(f^{-1}(x) = \\frac{x + 7}{4}\\)."
    ],
    "items_ar": [
      "كتابة الدالة كمعادلة: \\(y = 4x - 7\\).",
      "إضافة 7 إلى الطرفين: \\(y + 7 = 4x\\).",
      "قسمة الطرفين على 4: \\(x = \\frac{y + 7}{4}\\).",
      "استبدال y بـ x لكتابة الدالة العكسية: \\(f^{-1}(x) = \\frac{x + 7}{4}\\)."
    ],
    "ex": "Set y = f(x), rearrange to isolate x, and write f^-(x).",
    "ex_ar": "ضع y = f(x)، وأعد الترتيب لعزل x، ثم اكتب f^-(x)."
  },
  {
    "t": "cat",
    "ti": "Categorize: Function Concepts",
    "ti_ar": "تصنيف: مفاهيم الدوال",
    "categories": [
      "Domain",
      "Range",
      "Inverse Function",
      "Composite Function"
    ],
    "categories_ar": [
      "المجال (Domain)",
      "المدى (Range)",
      "الدالة العكسية (Inverse Function)",
      "الدالة المركبة (Composite Function)"
    ],
    "items": [
      {
        "s": "The set of all permissible input values x",
        "cat": "Domain"
      },
      {
        "s": "The set of all resulting output values f(x)",
        "cat": "Range"
      },
      {
        "s": "The operation that reverses the effect of f(x)",
        "cat": "Inverse Function"
      },
      {
        "s": "Applying one function to the result of another function",
        "cat": "Composite Function"
      }
    ],
    "items_ar": [
      {
        "s": "مجموعة كل قيم المدخلات الممكنة x",
        "cat": "Domain"
      },
      {
        "s": "مجموعة كل قيم المخرجات الناتجة f(x)",
        "cat": "Range"
      },
      {
        "s": "العملية التي تعكس تأثير الدالة f(x)",
        "cat": "Inverse Function"
      },
      {
        "s": "تطبيق دالة على مخرجات دالة أخرى",
        "cat": "Composite Function"
      }
    ],
    "ex": "Inputs are domain, outputs are range, reversing is inverse, and combining is composite.",
    "ex_ar": "المدخلات هي المجال، والمخرجات هي المدى، والعكس هو الدالة العكسية، والتركيب هو الدالة المركبة."
  },
  {
    "t": "fn",
    "ti": "Explorer: Function and Inverse \\(y=2x+3\\)",
    "ti_ar": "مستكشف: الدالة ودالتها العكسية \\(y=2x+3\\)",
    "fns": [
      {
        "expr": "2*x+3",
        "color": "#1E3A6E",
        "label": "f(x)"
      },
      {
        "expr": "(x-3)/2",
        "color": "#B8801F",
        "label": "f⁻¹(x)"
      }
    ],
    "xrange": [
      -6,
      6
    ],
    "yrange": [
      -6,
      10
    ]
  },
  {
    "t": "sr",
    "ti": "Worked Example: Composite Function",
    "ti_ar": "مثال محلول: تركيب الدوال",
    "steps": [
      "Given \\(f(x)=2x+3\\) and \\(g(x)=x^2\\), find \\(fg(4)\\).",
      "First apply \\(g\\): \\(g(4)=4^2=16\\).",
      "Then apply \\(f\\): \\(f(16)=2(16)+3=35\\)."
    ],
    "steps_ar": [
      "إذا كانت \\(f(x)=2x+3\\) و \\(g(x)=x^2\\)، أوجد \\(fg(4)\\).",
      "أولاً نطبق الدالة \\(g\\): \\(g(4)=4^2=16\\).",
      "ثم نطبق الدالة \\(f\\): \\(f(16)=2(16)+3=35\\)."
    ]
  },
  {
    "t": "qc",
    "ti": "Quick Check: Inverse Function",
    "ti_ar": "فحص سريع: الدالة العكسية",
    "q": "If \\(f(x)=4x-5\\), find \\(f^{-1}(x)\\).",
    "q_ar": "إذا كانت \\(f(x)=4x-5\\)، أوجد \\(f^{-1}(x)\\).",
    "o": [
      "(x+5)/4",
      "(x-5)/4",
      "4x+5",
      "(x+4)/5"
    ],
    "o_ar": [
      "(x+5)/4",
      "(x-5)/4",
      "4x+5",
      "(x+4)/5"
    ],
    "a": 0,
    "ex": "\\(y=4x-5\\Rightarrow x=\\dfrac{y+5}{4}\\), so \\(f^{-1}(x)=\\dfrac{x+5}{4}\\).",
    "ex_ar": "\\(y=4x-5\\Rightarrow x=\\dfrac{y+5}{4}\\)، إذن \\(f^{-1}(x)=\\dfrac{x+5}{4}\\)."
  },
  {
    "t": "se",
    "ti": "Spot the Error: Composite Order & Inverse Domain (Functions)",
    "ti_ar": "اكتشف الخطأ: ترتيب تركيب الدوال ومجال المعكوس (الدوال والتركيب والدالة العكسية)",
    "q": "Let \\(f(x) = 3x + 2\\) and \\(g(x) = x^2 + 1\\). A student evaluates \\((f \\circ g)(4)\\). Which step is wrong?",
    "q_ar": "لتكن \\(f(x) = 3x + 2\\) و\\(g(x) = x^2 + 1\\). يحسب طالب \\((f \\circ g)(4)\\). أي خطوة خاطئة؟",
    "steps": [
      "Write \\((f \\circ g)(4) = g(f(4))\\) by applying \\(f\\) first instead of \\(g\\).",
      "Compute \\(f(4) = 14\\).",
      "Square and add \\(1\\) to get \\(197\\)."
    ],
    "steps_ar": [
      "كتابة \\((f \\circ g)(4) = g(f(4))\\) بتطبيق \\(f\\) أولاً بدلاً من \\(g\\).",
      "حساب \\(f(4) = 14\\).",
      "التربيع وإضافة \\(1\\) للحصول على \\(197\\)."
    ],
    "errorStep": 1,
    "reasons": [
      "By definition \\((f \\circ g)(x) = f(g(x))\\): evaluate the inner function \\(g(4) = 17\\) first, then \\(f(17) = 53\\).",
      "Function composition is always commutative.",
      "You must multiply \\(f(4)\\) by \\(g(4)\\)."
    ],
    "reasons_ar": [
      "حسب التعريف \\((f \\circ g)(x) = f(g(x))\\): نحسب الدالة الداخلية أولاً \\(g(4) = 17\\) ثم \\(f(17) = 53\\).",
      "تركيب الدوال عملية إبدالية دائماً.",
      "يجب ضرب \\(f(4)\\) في \\(g(4)\\)."
    ],
    "correctReason": 0
  },
  {
    "t": "ms",
    "ti": "Examiner Mode: One-to-One Domain Restriction & Inverse (Functions)",
    "ti_ar": "وضع المصحح: تقييد المجال وإيجاد الدالة العكسية (الدوال والتركيب والدالة العكسية)",
    "q": "Let \\(h(x) = (x - 3)^2 + 2\\) for \\(x \\ge 3\\). (a) State the range of \\(h\\) and explain why \\(h^{-1}\\) exists on \\(x \\ge 3\\). (b) Find \\(h^{-1}(x)\\) and state its domain.",
    "q_ar": "لتكن \\(h(x) = (x - 3)^2 + 2\\) حيث \\(x \\ge 3\\). (أ) اذكر مدى \\(h\\) وفسّر سبب وجود معكوس لها. (ب) أوجد \\(h^{-1}(x)\\) وحدد مجالها.",
    "parts": [
      {
        "label": "Part (a) — Range & Injectivity",
        "marks": 2,
        "rubric": [
          {
            "code": "B1",
            "marks": 1,
            "text": "Range of \\(h\\) is \\([ 2, \\infty )\\) since \\((x - 3)^2 \\ge 0\\)."
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
            "text": "Solve \\(y = (x - 3)^2 + 2 \\implies x = 3 + \\sqrt{y - 2}\\) (choosing \\(+\\) branch for \\(x \\ge 3\\))."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "\\(h^{-1}(x) = 3 + \\sqrt{x - 2}\\) with domain \\(x \\ge 2\\)."
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
            "text": "مدى الدالة \\(h\\) هو \\([ 2, \\infty )\\) لأن \\((x - 3)^2 \\ge 0\\)."
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
            "text": "حل المعادلة بدلالة \\(x\\) مع اختيار الفرع الموجب: \\(x = 3 + \\sqrt{y - 2}\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "\\(h^{-1}(x) = 3 + \\sqrt{x - 2}\\) ومجالها \\(x \\ge 2\\)."
          }
        ]
      }
    ]
  },
  {
    "t": "sb",
    "ti": "Step Builder: Composite & Inverse Function Evaluation (Functions)",
    "ti_ar": "بناء الخطوات: حساب التركيب والمعكوس (الدوال والتركيب والدالة العكسية)",
    "steps": [
      {
        "l": "For \\(f(x) = 3x + 2\\) and \\(g(x) = x^2 + 1\\), find \\(g(4) =\\)",
        "a": "17",
        "h": "Compute 4² + 1."
      },
      {
        "l": "Now evaluate \\(f(g(4)) = f(17) =\\)",
        "a": "53",
        "h": "Compute 3×17 + 2."
      },
      {
        "l": "Evaluate \\(f^{-1}(11) =\\)",
        "a": "3",
        "h": "Solve 3x + 2 = 11."
      }
    ],
    "steps_ar": [
      {
        "l": "للدالتين \\(f(x) = 3x + 2\\) و\\(g(x) = x^2 + 1\\)، أوجد \\(g(4) =\\)",
        "a": "17",
        "h": "احسب 4² + 1."
      },
      {
        "l": "الآن احسب \\(f(g(4)) = f(17) =\\)",
        "a": "53",
        "h": "احسب 3×17 + 2."
      },
      {
        "l": "أوجد قيمة المعكوس \\(f^{-1}(11) =\\)",
        "a": "3",
        "h": "حل المعادلة 3x + 2 = 11."
      }
    ]
  },
  {
    "t": "mt",
    "ti": "Matching: Function Transformations & Inverse Rules (Functions)",
    "ti_ar": "مطابقة: تحويلات الدوال وقواعد المعكوس (الدوال والتركيب والدالة العكسية)",
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
        "l": "Transformation \\(y = f(x - 3) + 2\\)",
        "r": "Shift right \\(3\\) units and up \\(2\\) units"
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
        "l": "التحويل \\(y = f(x - 3) + 2\\)",
        "r": "إزاحة لليمين \\(3\\) وحدات ولأعلى \\(2\\) وحدات"
      },
      {
        "l": "منحنى القيمة المطلقة \\(y = |f(x)|\\)",
        "r": "يعكس الأجزاء السالبة \\(f(x) < 0\\) فوق محور السينات"
      }
    ]
  }
];
D["ig-sets"] = [
  {
    "t": "num",
    "ti": "Numeric Entry: Principle of Inclusion-Exclusion",
    "ti_ar": "إدخال رقمي: مبدأ الاحتواء والاستبعاد",
    "q": "In a group of 50 students, 30 study Art, 25 study Music, and 10 study both. How many students study neither Art nor Music?",
    "q_ar": "في مجموعة من 50 طالباً، 30 يدرسون الفنون، و25 يدرسون الموسيقى، و10 يدرسون الاثنين معاً. كم طالباً لا يدرس الفنون ولا الموسيقى؟",
    "a": 5,
    "ex": "\\(n(A \\cup M) = 30 + 25 - 10 = 45\\). Students studying neither \\(= 50 - 45 = 5\\).",
    "ex_ar": "\\(n(A \\cup M) = 30 + 25 - 10 = 45\\). عدد الطلاب الذين لا يدرسون أياً منهما \\(= 50 - 45 = 5\\)."
  },
  {
    "t": "ord",
    "ti": "Order the Steps: Filling a Two-Set Venn Diagram",
    "ti_ar": "ترتيب الخطوات: تعبئة مخطط فن لمجموعتين",
    "prompt": "Arrange the steps to complete a Venn diagram with known totals and intersection:",
    "prompt_ar": "رتّب خطوات تعبئة مخطط فِن لمجموعتين عند معرفة المجموع الكلي والتقاطع:",
    "items": [
      "Draw and label the universal set bounding box and two intersecting circles A and B.",
      "Enter the given count in the central intersection \\(A \\cap B\\) first.",
      "Subtract the intersection from each set total to find \\(A \\cap B'\\) and \\(A' \\cap B\\).",
      "Subtract the sum of the three circle regions from the universal total to find \\((A \\cup B)'\\)."
    ],
    "items_ar": [
      "رسم إطار المجموعة الشاملة ودائرتين متقاطعتين A و B وتسميتها.",
      "كتابة العدد المعطى في منطقة التقاطع المركزية \\(A \\cap B\\) أولاً.",
      "طرح التقاطع من إجمالي كل مجموعة لإيجاد \\(A \\cap B'\\) و \\(A' \\cap B\\).",
      "طرح مجموع الأجزاء الثلاثة للدائرتين من إجمالي المجموعة الشاملة لإيجاد المتممة \\((A \\cup B)'\\)."
    ],
    "ex": "Fill intersection first, calculate exclusive parts by subtraction, and find exterior remainder.",
    "ex_ar": "املأ التقاطع أولاً، ثم احسب العناصر الخاصة بكل مجموعة بالطرح، وأخيراً احسب العناصر الخارجية المتبقية."
  },
  {
    "t": "cat",
    "ti": "Categorize: Set Operations & Notation",
    "ti_ar": "تصنيف: عمليات ورموز المجموعات",
    "categories": [
      "Union (A ∪ B)",
      "Intersection (A ∩ B)",
      "Complement (A')",
      "Subset (A ⊆ B)"
    ],
    "categories_ar": [
      "الاتحاد (A ∪ B)",
      "التقاطع (A ∩ B)",
      "المتممة (A')",
      "المجموعة الجزئية (A ⊆ B)"
    ],
    "items": [
      {
        "s": "Elements belonging to A OR B OR both",
        "cat": "Union (A ∪ B)"
      },
      {
        "s": "Elements belonging strictly to BOTH A AND B",
        "cat": "Intersection (A ∩ B)"
      },
      {
        "s": "Elements in the universal set that do NOT belong to A",
        "cat": "Complement (A')"
      },
      {
        "s": "Every element in A is also an element of B",
        "cat": "Subset (A ⊆ B)"
      }
    ],
    "items_ar": [
      {
        "s": "العناصر التي تنتمي إلى A أو B أو كليهما",
        "cat": "Union (A ∪ B)"
      },
      {
        "s": "العناصر المشتركة التي تنتمي إلى A و B معاً بدقة",
        "cat": "Intersection (A ∩ B)"
      },
      {
        "s": "عناصر المجموعة الشاملة التي لا تنتمي إلى A",
        "cat": "Complement (A')"
      },
      {
        "s": "كل عنصر في A هو أيضاً عنصر في B",
        "cat": "Subset (A ⊆ B)"
      }
    ],
    "ex": "Union combines, intersection takes common elements, complement takes outside elements, subset means contained within.",
    "ex_ar": "الاتحاد يجمع العناصر، والتقاطع يأخذ المشترك، والمتممة تأخذ العناصر الخارجية، والمجموعة الجزئية تعني الاحتواء."
  },
  {
    "t": "sr",
    "ti": "Worked Example: Three-Set Venn Diagram",
    "ti_ar": "مثال محلول: مخطط فن لثلاث مجموعات",
    "steps": [
      "In a class of 30: 14 play football (F), 11 play basketball (B), 8 play tennis (T); 4 play F and B, 3 play F and T, 2 play B and T, 1 plays all three. Find how many play at least one sport.",
      "Apply inclusion–exclusion: \\(n(F\\cup B\\cup T)=n(F)+n(B)+n(T)-n(F\\cap B)-n(F\\cap T)-n(B\\cap T)+n(F\\cap B\\cap T)\\).",
      "\\(=14+11+8-4-3-2+1=25\\) students play at least one sport, so \\(30-25=5\\) play none."
    ],
    "steps_ar": [
      "في فصل يضم 30 طالباً: 14 يلعبون كرة القدم (F)، و11 كرة السلة (B)، و8 التنس (T)؛ و4 يلعبون F وB، و3 يلعبون F وT، و2 يلعبون B وT، و1 يلعب الرياضات الثلاث. احسب كم طالباً يمارس رياضة واحدة على الأقل.",
      "بتطبيق مبدأ الاحتواء والاستبعاد: \\(n(F\\cup B\\cup T)=n(F)+n(B)+n(T)-n(F\\cap B)-n(F\\cap T)-n(B\\cap T)+n(F\\cap B\\cap T)\\).",
      "\\(=14+11+8-4-3-2+1=25\\) طالباً يلعبون رياضة واحدة على الأقل، إذن \\(30-25=5\\) لا يمارسون أياً منها."
    ]
  },
  {
    "t": "qc",
    "ti": "Quick Check: Set Notation",
    "ti_ar": "فحص سريع: رموز المجموعات",
    "q": "If \\(A=\\{1,3,5,7\\}\\) and \\(B=\\{3,4,5,6\\}\\), find \\(A\\cap B\\).",
    "q_ar": "إذا كانت \\(A=\\{1,3,5,7\\}\\) و \\(B=\\{3,4,5,6\\}\\)، أوجد \\(A\\cap B\\).",
    "o": [
      "{3,5}",
      "{1,3,4,5,6,7}",
      "{1,7}",
      "{4,6}"
    ],
    "o_ar": [
      "{3,5}",
      "{1,3,4,5,6,7}",
      "{1,7}",
      "{4,6}"
    ],
    "a": 0,
    "ex": "The intersection contains elements in both sets: \\(\\{3,5\\}\\).",
    "ex_ar": "التقاطع يحتوي العناصر المشتركة بين المجموعتين: \\(\\{3,5\\}\\)."
  },
  {
    "t": "se",
    "ti": "Spot the Error: Successive Percentage Multipliers (Sets & Venn Diagrams)",
    "ti_ar": "اكتشف الخطأ: النسب المئوية المتتالية (المجموعات وأشكال فن (Venn Diagrams))",
    "q": "An item priced at \\(100\\) rises by \\(40\\%\\) and is then discounted by \\(40\\%\\). Which step in the calculation is wrong?",
    "q_ar": "سلعة سعرها \\(100\\) زاد سعرها بنسبة \\(40\\%\\) ثم خُفِّض بنسبة \\(40\\%\\). أي خطوة تحتوي على خطأ؟",
    "steps": [
      "Apply the \\(40\\%\\) increase multiplier: \\(100 \\times 1.40 = 140\\).",
      "Recognize that the \\(40\\%\\) discount applies to the new price \\(140\\).",
      "Add the percentage changes directly: \\(+40\\% - 40\\% = 0\\%\\), claiming the final price returns to \\(100\\).",
      "Verify final price via product of multipliers."
    ],
    "steps_ar": [
      "تطبيق معامل الزيادة \\(40\\%\\): \\(100 \\times 1.40 = 140\\).",
      "ملاحظة أن خصم \\(40\\%\\) يُطبَّق على السعر الجديد \\(140\\).",
      "جمع النسبتين مباشرة \\(+40\\% - 40\\% = 0\\%\\) والادعاء بأن السعر النهائي يعود إلى \\(100\\).",
      "التحقق من السعر النهائي بضرب المعاملات."
    ],
    "errorStep": 3,
    "reasons": [
      "Successive percentages multiply rather than add: \\(140 \\times 0.60 = 84\\) (a net \\(16\\%\\) decrease).",
      "The final price is actually greater than \\(100\\).",
      "Discounts must be divided rather than multiplied."
    ],
    "reasons_ar": [
      "النسب المتتالية تُضرب كمعاملات ولا تُجمع: \\(140 \\times 0.60 = 84\\) (بانخفاض صافي قدره \\(16\\%\\)).",
      "السعر النهائي أكبر من \\(100\\).",
      "الخصم يُحسب بالقسمة لا بالضرب."
    ],
    "correctReason": 0
  },
  {
    "t": "ms",
    "ti": "Examiner Mode: Harmonic Round-Trip Speed & Bounds (Sets & Venn Diagrams)",
    "ti_ar": "وضع المصحح: السرعة المتوسطة التوافقية والحدود (المجموعات وأشكال فن (Venn Diagrams))",
    "q": "A vehicle travels a fixed distance \\(d\\) outbound at \\(40\\text{ km/h}\\) and returns the same distance \\(d\\) at \\(60\\text{ km/h}\\). (a) Express total time in terms of \\(d\\) and find the exact round-trip average speed. (b) If a length \\(L = 16\\text{ cm}\\) is rounded to the nearest \\(1\\text{ cm}\\), state its lower and upper bounds.",
    "q_ar": "تقطع مركبة مسافة \\(d\\) ذهاباً بسرعة \\(40\\text{ km/h}\\) وتعود المسافة نفسها بسرعة \\(60\\text{ km/h}\\). (أ) عبّر عن الزمن الكلي بدلالة \\(d\\) وأوجد السرعة المتوسطة للرحلة كاملة. (ب) إذا قُرِّب الطول \\(L = 16\\text{ cm}\\) لأقرب \\(1\\text{ cm}\\)، فاكتب الحد الأدنى والحد الأعلى.",
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
            "text": "Error interval: \\(15.5 \\le L < 16.5\\)."
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
            "text": "فترة القيمة الحقيقية: \\(15.5 \\le L < 16.5\\)."
          }
        ]
      }
    ]
  },
  {
    "t": "sb",
    "ti": "Step Builder: Successive Multipliers & Net Change (Sets & Venn Diagrams)",
    "ti_ar": "بناء الخطوات: المعاملات المتتالية وصافي التغير (المجموعات وأشكال فن (Venn Diagrams))",
    "steps": [
      {
        "l": "Increase \\(100\\) by \\(40\\%\\): new value \\(=\\)",
        "a": "140",
        "h": "Compute 100 × 1.40."
      },
      {
        "l": "Now discount \\(140\\) by \\(40\\%\\): final value \\(=\\)",
        "a": "84",
        "h": "Compute 140 × 0.60."
      },
      {
        "l": "Find the net decrease \\(100 - 84 =\\)",
        "a": "16",
        "h": "Subtract 84 from 100."
      }
    ],
    "steps_ar": [
      {
        "l": "زد العدد \\(100\\) بنسبة \\(40\\%\\): القيمة الجديدة \\(=\\)",
        "a": "140",
        "h": "احسب 100 × 1.40."
      },
      {
        "l": "طبّق خصم \\(40\\%\\) على \\(140\\): القيمة النهائية \\(=\\)",
        "a": "84",
        "h": "احسب 140 × 0.60."
      },
      {
        "l": "أوجد مقدار النقصان الصافي \\(100 - 84 =\\)",
        "a": "16",
        "h": "اطرح 84 من 100."
      }
    ]
  },
  {
    "t": "mt",
    "ti": "Matching: Number, Bounds & Set Principles (Sets & Venn Diagrams)",
    "ti_ar": "مطابقة: قوانين الأعداد والحدود والمجموعات (المجموعات وأشكال فن (Venn Diagrams))",
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
  }
];
});
