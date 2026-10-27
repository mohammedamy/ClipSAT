/* Interactive Practice data for /gaten/ - one entry per chapter section id.
   Shipped as public/js/ix/gaten.js and loaded only on that track's page by the
   engine in src/scripts/modules/19-interactive-activities-engine-v1.js
   (Plan 5 Phase 5.015, ADR 0033). Entry shapes (qc/mt/tf/sb/sr/fn/num/ord/cat/gp/se/ms) are
   documented there. */
(window.__ixData = window.__ixData || []).push(function (D) {
D["ge-arithmetic-shortcuts"] = [
  {
    "t": "qc",
    "ti": "Quick Check: GAT Mental Arithmetic, Divisibility, Cyclicity & Surds",
    "ti_ar": "فحص سريع: الحساب الذهني السريع وقابلية القسمة ودورية الآحاد والجذور (GAT)",
    "q": "Without a calculator, evaluate \\( 503^2 - 497^2 \\) using a GAT mental shortcut.",
    "q_ar": "بدون آلة حاسبة، احسب قيمة \\( 503^2 - 497^2 \\) باستخدام مهارات الحل السريع للقدرات.",
    "o": [
      "\\( 6000 \\)",
      "\\( 3600 \\)",
      "\\( 1000 \\)",
      "\\( 600 \\)"
    ],
    "o_ar": [
      "\\( 6000 \\)",
      "\\( 3600 \\)",
      "\\( 1000 \\)",
      "\\( 600 \\)"
    ],
    "a": 0,
    "ex": "By difference of squares, \\( (503 - 497)(503 + 497) = 6 \\times 1000 = 6000 \\).",
    "ex_ar": "بفرق المربعين: \\( (503 - 497)(503 + 497) = 6 \\times 1000 = 6000 \\)."
  },
  {
    "t": "tf",
    "ti": "True / False: Core Theorems (GAT Mental Arithmetic, Divisibility, Cyclicity & Surds)",
    "ti_ar": "صح / خطأ: النظريات الأساسية (الحساب الذهني السريع وقابلية القسمة ودورية الآحاد والجذور (GAT))",
    "items": [
      {
        "s": "The units digit of \\( 7^n \\) repeats in a 4-cycle \\( (7, 9, 3, 1) \\), so \\( 7^{100} \\) ends in \\( 1 \\).",
        "a": true
      },
      {
        "s": "In telescoping products, \\( \\left(1 + \\frac{1}{2}\\right)\\left(1 + \\frac{1}{3}\\right)\\cdots\\left(1 + \\frac{1}{9}\\right) = \\frac{10}{2} = 5 \\).",
        "a": true
      },
      {
        "s": "\\( \\sqrt{36 + 64} = \\sqrt{36} + \\sqrt{64} = 6 + 8 = 14 \\).",
        "a": false
      }
    ],
    "items_ar": [
      {
        "s": "رقم آحاد \\( 7^n \\) يتكرر في دورة رباعية \\( (7, 9, 3, 1) \\)، وبالتالي \\( 7^{100} \\) آحاده \\( 1 \\).",
        "a": true
      },
      {
        "s": "في الضرب التلسكوبي: \\( \\left(1 + \\frac{1}{2}\\right)\\left(1 + \\frac{1}{3}\\right)\\cdots\\left(1 + \\frac{1}{9}\\right) = \\frac{10}{2} = 5 \\).",
        "a": true
      },
      {
        "s": "قيمة \\( \\sqrt{36 + 64} \\) تساوي \\( 6 + 8 = 14 \\).",
        "a": false
      }
    ]
  },
  {
    "t": "mt",
    "ti": "Matching: Identities & Principles (GAT Mental Arithmetic, Divisibility, Cyclicity & Surds)",
    "ti_ar": "مطابقة: القوانين والمفاهيم (الحساب الذهني السريع وقابلية القسمة ودورية الآحاد والجذور (GAT))",
    "p": [
      {
        "l": "\\( a^2 - b^2 \\)",
        "r": "\\( (a - b)(a + b) \\) (Instant mental factoring)"
      },
      {
        "l": "Units digit of \\( 3^{4k+2} \\)",
        "r": "Always \\( 9 \\) (since \\( 3^2 = 9 \\) in the 4-cycle)"
      },
      {
        "l": "\\( 2^x + 2^x + 2^x + 2^x \\)",
        "r": "\\( 4 \\cdot 2^x = 2^{x+2} \\) (Factoring equal powers)"
      },
      {
        "l": "Divisibility by \\( 9 \\)",
        "r": "Sum of the digits is a multiple of \\( 9 \\)"
      }
    ],
    "p_ar": [
      {
        "l": "\\( a^2 - b^2 \\)",
        "r": "\\( (a - b)(a + b) \\) (تحليل فرق المربعين السريع)"
      },
      {
        "l": "Units digit of \\( 3^{4k+2} \\)",
        "r": "دائماً \\( 9 \\) (من دورة قوى العدد 3)"
      },
      {
        "l": "\\( 2^x + 2^x + 2^x + 2^x \\)",
        "r": "\\( 4 \\cdot 2^x = 2^{x+2} \\) (جمع القوى المتماثلة)"
      },
      {
        "l": "Divisibility by \\( 9 \\)",
        "r": "مجموع أرقام العدد يقبل القسمة على \\( 9 \\)"
      }
    ]
  },
  {
    "t": "se",
    "ti": "Spot the Error: Algebraic & Domain Verification (GAT Mental Arithmetic, Divisibility, Cyclicity & Surds)",
    "ti_ar": "اكتشف الخطأ: التحقق الجبري والمنطقي (الحساب الذهني السريع وقابلية القسمة ودورية الآحاد والجذور (GAT))",
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
    "ti": "Examiner Mode: Multi-Step Structured Problem (GAT Mental Arithmetic, Divisibility, Cyclicity & Surds)",
    "ti_ar": "وضع المصحح: مسألة هيكلية متعددة الخطوات (الحساب الذهني السريع وقابلية القسمة ودورية الآحاد والجذور (GAT))",
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
    "ti": "Step Builder: Guided Calculation (GAT Mental Arithmetic, Divisibility, Cyclicity & Surds)",
    "ti_ar": "بناء الخطوات: حساب موجه خطوة بخطوة (الحساب الذهني السريع وقابلية القسمة ودورية الآحاد والجذور (GAT))",
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
    "ti": "Numeric Entry: GAT Mental Arithmetic, Divisibility, Cyclicity & Surds",
    "ti_ar": "إدخال رقمي: الحساب الذهني السريع وقابلية القسمة ودورية الآحاد والجذور (GAT)",
    "q": "What is the units digit (ones digit) of \\( 3^{41} \\)?",
    "q_ar": "ما هو رقم الآحاد للعدد \\( 3^{41} \\)؟",
    "a": 3,
    "h": "Divide the exponent \\( 41 \\) by the cycle length \\( 4 \\) and find the remainder.",
    "h_ar": "اقسم الأس \\( 41 \\) على طول الدورة \\( 4 \\) وخذ الباقي.",
    "sol": "Since \\( 41 = 4 \\times 10 + 1 \\), the remainder is \\( 1 \\), so the units digit is \\( 3^1 = 3 \\).",
    "sol_ar": "Since \\( 41 = 4 \\times 10 + 1 \\), the remainder is \\( 1 \\), so the units digit is \\( 3^1 = 3 \\)."
  },
  {
    "t": "ord",
    "ti": "Order the Steps: Systematic Solution (GAT Mental Arithmetic, Divisibility, Cyclicity & Surds)",
    "ti_ar": "رتّب الخطوات: خطوات الحل المنظم (الحساب الذهني السريع وقابلية القسمة ودورية الآحاد والجذور (GAT))",
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
    "ti": "Categorize: Mathematical Classification (GAT Mental Arithmetic, Divisibility, Cyclicity & Surds)",
    "ti_ar": "تصنيف: التصنيف الرياضي (الحساب الذهني السريع وقابلية القسمة ودورية الآحاد والجذور (GAT))",
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

D["ge-ratios-rates-word"] = [
  {
    "t": "qc",
    "ti": "Quick Check: GAT Ratios, Percentages, Mixtures, Work & Motion Problems",
    "ti_ar": "فحص سريع: النسب المئوية والتناسب والخلطات ومسائل العمل والحركة (GAT)",
    "q": "A car travels from city A to city B at \\( 60\\text{ km/h} \\) and returns along the same route at \\( 40\\text{ km/h} \\). What is its average speed for the entire round trip?",
    "q_ar": "تقطع سيارة المسافة بين مدينتين بسرعة \\( 60\\text{ km/h} \\) ذهاباً وبسرعة \\( 40\\text{ km/h} \\) إياباً. ما هي السرعة المتوسطة للرحلة كاملة؟",
    "o": [
      "\\( 48\\text{ km/h} \\)",
      "\\( 50\\text{ km/h} \\)",
      "\\( 45\\text{ km/h} \\)",
      "\\( 52\\text{ km/h} \\)"
    ],
    "o_ar": [
      "\\( 48\\text{ km/h} \\)",
      "\\( 50\\text{ km/h} \\)",
      "\\( 45\\text{ km/h} \\)",
      "\\( 52\\text{ km/h} \\)"
    ],
    "a": 0,
    "ex": "Use the harmonic mean formula: \\( v_{\\text{avg}} = \\frac{2v_1 v_2}{v_1 + v_2} = \\frac{2(60)(40)}{60 + 40} = \\frac{4800}{100} = 48\\text{ km/h} \\).",
    "ex_ar": "استخدم قانون الوسط التوافقي للسرعة المتوسطة: \\( v_{\\text{avg}} = \\frac{2(60)(40)}{60 + 40} = 48\\text{ km/h} \\)."
  },
  {
    "t": "tf",
    "ti": "True / False: Core Theorems (GAT Ratios, Percentages, Mixtures, Work & Motion Problems)",
    "ti_ar": "صح / خطأ: النظريات الأساسية (النسب المئوية والتناسب والخلطات ومسائل العمل والحركة (GAT))",
    "items": [
      {
        "s": "A \\( 20\\% \\) price increase followed by a \\( 20\\% \\) discount results in a net \\( 4\\% \\) decrease (\\( 1.2 \\times 0.8 = 0.96 \\)).",
        "a": true
      },
      {
        "s": "If Worker A takes 3 hours and Worker B takes 6 hours, together they finish in \\( \\frac{3 \\times 6}{3 + 6} = 2 \\) hours.",
        "a": true
      },
      {
        "s": "When two trains move in opposite directions toward each other, their relative closing speed is the difference of their speeds.",
        "a": false
      }
    ],
    "items_ar": [
      {
        "s": "زيادة السعر بنسبة \\( 20\\% \\) ثم تخفيضه بنسبة \\( 20\\% \\) يؤدي إلى نقصان صافي قدره \\( 4\\% \\).",
        "a": true
      },
      {
        "s": "إذا أنجز الأول العمل في 3 ساعات والثاني في 6 ساعات، فإنهما ينجزانه معاً في \\( \\frac{3 \\times 6}{3 + 6} = 2 \\) ساعة.",
        "a": true
      },
      {
        "s": "عندما يتحرك قطاران في اتجاهين متعاكسين، فإن سرعتهما النسبية هي الفرق بين سرعتيهما.",
        "a": false
      }
    ]
  },
  {
    "t": "mt",
    "ti": "Matching: Identities & Principles (GAT Ratios, Percentages, Mixtures, Work & Motion Problems)",
    "ti_ar": "مطابقة: القوانين والمفاهيم (النسب المئوية والتناسب والخلطات ومسائل العمل والحركة (GAT))",
    "p": [
      {
        "l": "\\( \\frac{2v_1 v_2}{v_1 + v_2} \\)",
        "r": "Average speed over equal-distance round trip"
      },
      {
        "l": "\\( \\frac{t_1 t_2}{t_1 + t_2} \\)",
        "r": "Combined time for two workers acting together"
      },
      {
        "l": "\\( x + y + \\frac{xy}{100} \\)",
        "r": "Net percentage change after \\( x\\% \\) and \\( y\\% \\)"
      },
      {
        "l": "\\( v_1 + v_2 \\)",
        "r": "Relative speed for opposite-direction motion"
      }
    ],
    "p_ar": [
      {
        "l": "\\( \\frac{2v_1 v_2}{v_1 + v_2} \\)",
        "r": "السرعة المتوسطة لرحلة ذهاب وإياب متساوية المسافة"
      },
      {
        "l": "\\( \\frac{t_1 t_2}{t_1 + t_2} \\)",
        "r": "الزمن المشترك لإنجاز عمل معاً"
      },
      {
        "l": "\\( x + y + \\frac{xy}{100} \\)",
        "r": "النسبة المئوية الصافية للتغير المتتالي"
      },
      {
        "l": "\\( v_1 + v_2 \\)",
        "r": "السرعة النسبية للحركة في اتجاهين متعاكسين"
      }
    ]
  },
  {
    "t": "se",
    "ti": "Spot the Error: Algebraic & Domain Verification (GAT Ratios, Percentages, Mixtures, Work & Motion Problems)",
    "ti_ar": "اكتشف الخطأ: التحقق الجبري والمنطقي (النسب المئوية والتناسب والخلطات ومسائل العمل والحركة (GAT))",
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
    "ti": "Examiner Mode: Multi-Step Structured Problem (GAT Ratios, Percentages, Mixtures, Work & Motion Problems)",
    "ti_ar": "وضع المصحح: مسألة هيكلية متعددة الخطوات (النسب المئوية والتناسب والخلطات ومسائل العمل والحركة (GAT))",
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
    "ti": "Step Builder: Guided Calculation (GAT Ratios, Percentages, Mixtures, Work & Motion Problems)",
    "ti_ar": "بناء الخطوات: حساب موجه خطوة بخطوة (النسب المئوية والتناسب والخلطات ومسائل العمل والحركة (GAT))",
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
    "ti": "Numeric Entry: GAT Ratios, Percentages, Mixtures, Work & Motion Problems",
    "ti_ar": "إدخال رقمي: النسب المئوية والتناسب والخلطات ومسائل العمل والحركة (GAT)",
    "q": "Pipe A fills a tank in \\( 12 \\) minutes and Pipe B fills the same tank in \\( 6 \\) minutes. How many minutes does it take to fill the tank when both pipes are open together?",
    "q_ar": "يملأ الصنبور الأول خزاناً في \\( 12 \\) دقيقة ويملؤه الثاني في \\( 6 \\) دقائق. كم دقيقة يستغرق ملء الخزان عند فتحهما معاً؟",
    "a": 4,
    "h": "Compute \\( T = \\frac{12 \\times 6}{12 + 6} \\).",
    "h_ar": "احسب \\( T = \\frac{12 \\times 6}{12 + 6} \\).",
    "sol": "\\( T = \\frac{72}{18} = 4 \\) minutes.",
    "sol_ar": "\\( T = \\frac{72}{18} = 4 \\) minutes."
  },
  {
    "t": "ord",
    "ti": "Order the Steps: Systematic Solution (GAT Ratios, Percentages, Mixtures, Work & Motion Problems)",
    "ti_ar": "رتّب الخطوات: خطوات الحل المنظم (النسب المئوية والتناسب والخلطات ومسائل العمل والحركة (GAT))",
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
    "ti": "Categorize: Mathematical Classification (GAT Ratios, Percentages, Mixtures, Work & Motion Problems)",
    "ti_ar": "تصنيف: التصنيف الرياضي (النسب المئوية والتناسب والخلطات ومسائل العمل والحركة (GAT))",
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

D["ge-quant-comparisons"] = [
  {
    "t": "qc",
    "ti": "Quick Check: GAT Quantitative Comparisons (Choices A/B/C/D) & Fast Geometry",
    "ti_ar": "فحص سريع: المقارنات الكمية (الخيارات أ/ب/ج/د) والهندسة السريعة (GAT)",
    "q": "Given \\( x^2 = 25 \\) with no sign restriction on \\( x \\), compare Quantity A: \\( x \\) and Quantity B: \\( 5 \\).",
    "q_ar": "إذا كان \\( x^2 = 25 \\) دون تحديد إشارة \\( x \\)، قارن بين القيمة الأولى: \\( x \\) والقيمة الثانية: \\( 5 \\).",
    "o": [
      "Choice D — The given information is insufficient (since \\( x = 5 \\) gives C and \\( x = -5 \\) gives B)",
      "Choice C — The two quantities are equal",
      "Choice A — Quantity A is greater",
      "Choice B — Quantity B is greater"
    ],
    "o_ar": [
      "Choice D — The given information is insufficient (since \\( x = 5 \\) gives C and \\( x = -5 \\) gives B)",
      "Choice C — The two quantities are equal",
      "Choice A — Quantity A is greater",
      "Choice B — Quantity B is greater"
    ],
    "a": 0,
    "ex": "Because \\( x \\) can be \\( +5 \\) (equal) or \\( -5 \\) (less than 5), the relationship changes, making Choice D correct.",
    "ex_ar": "بما أن \\( x \\) قد تساوي \\( +5 \\) أو \\( -5 \\)، تختلف نتيجة المقارنة فيكون الخيار الصحيح هو (د) المعطيات غير كافية."
  },
  {
    "t": "tf",
    "ti": "True / False: Core Theorems (GAT Quantitative Comparisons (Choices A/B/C/D) & Fast Geometry)",
    "ti_ar": "صح / خطأ: النظريات الأساسية (المقارنات الكمية (الخيارات أ/ب/ج/د) والهندسة السريعة (GAT))",
    "items": [
      {
        "s": "For any real number \\( x \\in (0, 1) \\), \\( x > x^2 > x^3 \\).",
        "a": true
      },
      {
        "s": "At \\( 4{:}20 \\), the acute angle between the hour and minute hands of a clock is \\( |30(4) - 5.5(20)| = 10^\\circ \\).",
        "a": true
      },
      {
        "s": "If a square is inscribed in a circle of radius \\( r \\), its area is \\( 4r^2 \\).",
        "a": false
      }
    ],
    "items_ar": [
      {
        "s": "لأي عدد حقيقي كسري موجب \\( x \\in (0, 1) \\) يتحقق \\( x > x^2 > x^3 \\).",
        "a": true
      },
      {
        "s": "عند الساعة \\( 4{:}20 \\)، الزاوية بين عقربي الساعة والدقائق هي \\( |30(4) - 5.5(20)| = 10^\\circ \\).",
        "a": true
      },
      {
        "s": "إذا رُسم مربع داخل دائرة نصف قطرها \\( r \\)، فإن مساحته تساوي \\( 4r^2 \\).",
        "a": false
      }
    ]
  },
  {
    "t": "mt",
    "ti": "Matching: Identities & Principles (GAT Quantitative Comparisons (Choices A/B/C/D) & Fast Geometry)",
    "ti_ar": "مطابقة: القوانين والمفاهيم (المقارنات الكمية (الخيارات أ/ب/ج/د) والهندسة السريعة (GAT))",
    "p": [
      {
        "l": "\\( |30H - 5.5M| \\)",
        "r": "Angle between clock hands at \\( H{:}M \\)"
      },
      {
        "l": "Square inscribed in circle of radius \\( r \\)",
        "r": "Diagonal \\( 2r \\), area \\( 2r^2 \\)"
      },
      {
        "l": "Test \\( x \\in \\{-1, 0, \\frac{1}{2}, 2\\} \\)",
        "r": "Four-zone test to detect Choice D traps"
      },
      {
        "l": "Exterior angle of a triangle",
        "r": "Sum of the two remote interior angles"
      }
    ],
    "p_ar": [
      {
        "l": "\\( |30H - 5.5M| \\)",
        "r": "الزاوية بين عقربي الساعة عند \\( H{:}M \\)"
      },
      {
        "l": "Square inscribed in circle of radius \\( r \\)",
        "r": "القطر \\( 2r \\) والمساحة \\( 2r^2 \\)"
      },
      {
        "l": "Test \\( x \\in \\{-1, 0, \\frac{1}{2}, 2\\} \\)",
        "r": "اختبار المناطق الأربع لكشف فخ الخيار (د)"
      },
      {
        "l": "Exterior angle of a triangle",
        "r": "مجموع الزاويتين الداخليتين البعيدتين"
      }
    ]
  },
  {
    "t": "se",
    "ti": "Spot the Error: Algebraic & Domain Verification (GAT Quantitative Comparisons (Choices A/B/C/D) & Fast Geometry)",
    "ti_ar": "اكتشف الخطأ: التحقق الجبري والمنطقي (المقارنات الكمية (الخيارات أ/ب/ج/د) والهندسة السريعة (GAT))",
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
    "ti": "Examiner Mode: Multi-Step Structured Problem (GAT Quantitative Comparisons (Choices A/B/C/D) & Fast Geometry)",
    "ti_ar": "وضع المصحح: مسألة هيكلية متعددة الخطوات (المقارنات الكمية (الخيارات أ/ب/ج/د) والهندسة السريعة (GAT))",
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
    "ti": "Step Builder: Guided Calculation (GAT Quantitative Comparisons (Choices A/B/C/D) & Fast Geometry)",
    "ti_ar": "بناء الخطوات: حساب موجه خطوة بخطوة (المقارنات الكمية (الخيارات أ/ب/ج/د) والهندسة السريعة (GAT))",
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
    "ti": "Numeric Entry: GAT Quantitative Comparisons (Choices A/B/C/D) & Fast Geometry",
    "ti_ar": "إدخال رقمي: المقارنات الكمية (الخيارات أ/ب/ج/د) والهندسة السريعة (GAT)",
    "q": "Find the acute angle (in degrees) between the hour and minute hands of a clock at \\( 3{:}30 \\).",
    "q_ar": "أوجد قياس الزاوية الحادة (بالدرجات) بين عقربي الساعات والدقائق عند الساعة \\( 3{:}30 \\).",
    "a": 75,
    "h": "Use \\( \\theta = |30(3) - 5.5(30)| \\).",
    "h_ar": "استخدم القانون \\( \\theta = |30(3) - 5.5(30)| \\).",
    "sol": "\\( \\theta = |90 - 165| = 75^\\circ \\).",
    "sol_ar": "\\( \\theta = |90 - 165| = 75^\\circ \\)."
  },
  {
    "t": "ord",
    "ti": "Order the Steps: Systematic Solution (GAT Quantitative Comparisons (Choices A/B/C/D) & Fast Geometry)",
    "ti_ar": "رتّب الخطوات: خطوات الحل المنظم (المقارنات الكمية (الخيارات أ/ب/ج/د) والهندسة السريعة (GAT))",
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
    "ti": "Categorize: Mathematical Classification (GAT Quantitative Comparisons (Choices A/B/C/D) & Fast Geometry)",
    "ti_ar": "تصنيف: التصنيف الرياضي (المقارنات الكمية (الخيارات أ/ب/ج/د) والهندسة السريعة (GAT))",
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

D["ge-data-stats-prob"] = [
  {
    "t": "qc",
    "ti": "Quick Check: GAT Data Interpretation, Weighted Averages & Counting",
    "ti_ar": "فحص سريع: تحليل البيانات والرسوم البيانية والمتوسطات ومبدأ العد (GAT)",
    "q": "The arithmetic mean of \\( 7 \\) consecutive integers is \\( 24 \\). What is the largest of these \\( 7 \\) integers?",
    "q_ar": "المتوسط الحسابي لسبعة أعداد صحيحة متتالية هو \\( 24 \\). ما هو أكبر هذه الأعداد؟",
    "o": [
      "\\( 27 \\)",
      "\\( 26 \\)",
      "\\( 28 \\)",
      "\\( 30 \\)"
    ],
    "o_ar": [
      "\\( 27 \\)",
      "\\( 26 \\)",
      "\\( 28 \\)",
      "\\( 30 \\)"
    ],
    "a": 0,
    "ex": "For an odd number of consecutive integers, the mean equals the middle (4th) term \\( 24 \\), so the 7th term is \\( 24 + 3 = 27 \\).",
    "ex_ar": "في الأعداد المتتالية الفردية العدد، المتوسط هو الوسيط (الحد الرابع = 24)، فيكون الحد السابع \\( 24 + 3 = 27 \\)."
  },
  {
    "t": "tf",
    "ti": "True / False: Core Theorems (GAT Data Interpretation, Weighted Averages & Counting)",
    "ti_ar": "صح / خطأ: النظريات الأساسية (تحليل البيانات والرسوم البيانية والمتوسطات ومبدأ العد (GAT))",
    "items": [
      {
        "s": "In a pie chart, a sector of central angle \\( 72^\\circ \\) represents \\( \\frac{72}{360} = 20\\% \\) of the total.",
        "a": true
      },
      {
        "s": "The number of handshakes among \\( n \\) people where everyone shakes hands once is \\( \\binom{n}{2} = \\frac{n(n-1)}{2} \\).",
        "a": true
      },
      {
        "s": "The number of ways to seat \\( n \\) people around a circular table is \\( n! \\).",
        "a": false
      }
    ],
    "items_ar": [
      {
        "s": "في القطاعات الدائرية، القطاع الذي زاويته المركزية \\( 72^\\circ \\) يمثل \\( 20\\% \\) من الإجمالي.",
        "a": true
      },
      {
        "s": "عدد المصافحات بين \\( n \\) أشخاص يصافح كل منهم الآخر مرة واحدة هو \\( \\frac{n(n-1)}{2} \\).",
        "a": true
      },
      {
        "s": "عدد طرق جلوس \\( n \\) أشخاص حول طاولة دائرية هو \\( n! \\).",
        "a": false
      }
    ]
  },
  {
    "t": "mt",
    "ti": "Matching: Identities & Principles (GAT Data Interpretation, Weighted Averages & Counting)",
    "ti_ar": "مطابقة: القوانين والمفاهيم (تحليل البيانات والرسوم البيانية والمتوسطات ومبدأ العد (GAT))",
    "p": [
      {
        "l": "\\( \\frac{\\theta}{360^\\circ} \\times \\text{Total} \\)",
        "r": "Value of a pie-chart sector with angle \\( \\theta \\)"
      },
      {
        "l": "\\( (n - 1)! \\)",
        "r": "Circular permutations of \\( n \\) distinct people"
      },
      {
        "l": "\\( \\frac{\\text{First} + \\text{Last}}{2} \\)",
        "r": "Mean and median of any arithmetic sequence"
      },
      {
        "l": "\\( \\frac{n(n-1)}{2} \\)",
        "r": "Number of handshakes or segments among \\( n \\) points"
      }
    ],
    "p_ar": [
      {
        "l": "\\( \\frac{\\theta}{360^\\circ} \\times \\text{Total} \\)",
        "r": "قيمة قطاع دائري زاويته المركزية \\( \\theta \\)"
      },
      {
        "l": "\\( (n - 1)! \\)",
        "r": "التباديل الدائرية لعدد \\( n \\) من الأشخاص"
      },
      {
        "l": "\\( \\frac{\\text{First} + \\text{Last}}{2} \\)",
        "r": "المتوسط والوسيط لأي متتابعة حسابية"
      },
      {
        "l": "\\( \\frac{n(n-1)}{2} \\)",
        "r": "عدد المصافحات أو القطع المستقيمة بين \\( n \\) نقاط"
      }
    ]
  },
  {
    "t": "se",
    "ti": "Spot the Error: Algebraic & Domain Verification (GAT Data Interpretation, Weighted Averages & Counting)",
    "ti_ar": "اكتشف الخطأ: التحقق الجبري والمنطقي (تحليل البيانات والرسوم البيانية والمتوسطات ومبدأ العد (GAT))",
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
    "ti": "Examiner Mode: Multi-Step Structured Problem (GAT Data Interpretation, Weighted Averages & Counting)",
    "ti_ar": "وضع المصحح: مسألة هيكلية متعددة الخطوات (تحليل البيانات والرسوم البيانية والمتوسطات ومبدأ العد (GAT))",
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
    "ti": "Step Builder: Guided Calculation (GAT Data Interpretation, Weighted Averages & Counting)",
    "ti_ar": "بناء الخطوات: حساب موجه خطوة بخطوة (تحليل البيانات والرسوم البيانية والمتوسطات ومبدأ العد (GAT))",
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
    "ti": "Numeric Entry: GAT Data Interpretation, Weighted Averages & Counting",
    "ti_ar": "إدخال رقمي: تحليل البيانات والرسوم البيانية والمتوسطات ومبدأ العد (GAT)",
    "q": "In a conference room of \\( 10 \\) delegates, each delegate shakes hands once with every other delegate. How many handshakes occur in total?",
    "q_ar": "في قاعة اجتماعات تضم \\( 10 \\) مندوبين، صافح كل مندوب بقية المندوبين مرة واحدة. كم عدد المصافحات الكلي؟",
    "a": 45,
    "h": "Calculate \\( \\binom{10}{2} = \\frac{10 \\times 9}{2} \\).",
    "h_ar": "احسب \\( \\frac{10 \\times 9}{2} \\).",
    "sol": "\\( \\frac{10 \\times 9}{2} = 45 \\) handshakes.",
    "sol_ar": "\\( \\frac{10 \\times 9}{2} = 45 \\) handshakes."
  },
  {
    "t": "ord",
    "ti": "Order the Steps: Systematic Solution (GAT Data Interpretation, Weighted Averages & Counting)",
    "ti_ar": "رتّب الخطوات: خطوات الحل المنظم (تحليل البيانات والرسوم البيانية والمتوسطات ومبدأ العد (GAT))",
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
    "ti": "Categorize: Mathematical Classification (GAT Data Interpretation, Weighted Averages & Counting)",
    "ti_ar": "تصنيف: التصنيف الرياضي (تحليل البيانات والرسوم البيانية والمتوسطات ومبدأ العد (GAT))",
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

D["ge-saat-algebra-matrices"] = [
  {
    "t": "qc",
    "ti": "Quick Check: SAAT Mathematical Logic, Matrices, Determinants & Complex Numbers",
    "ti_ar": "فحص سريع: المنطق الرياضي والمصفوفات والمحددات والأعداد المركبة (SAAT)",
    "q": "For what value of \\( k \\) is the matrix \\( A = \\begin{pmatrix} 3 & 6 \\\\ k & 8 \\end{pmatrix} \\) singular (non-invertible)?",
    "q_ar": "ما قيمة \\( k \\) التي تجعل المصفوفة \\( A = \\begin{pmatrix} 3 & 6 \\\\ k & 8 \\end{pmatrix} \\) منفردة (ليس لها نظير ضربي)؟",
    "o": [
      "\\( 4 \\)",
      "\\( -4 \\)",
      "\\( 16 \\)",
      "\\( 2 \\)"
    ],
    "o_ar": [
      "\\( 4 \\)",
      "\\( -4 \\)",
      "\\( 16 \\)",
      "\\( 2 \\)"
    ],
    "a": 0,
    "ex": "A matrix is singular when \\( \\det(A) = 3(8) - 6k = 24 - 6k = 0 \\implies k = 4 \\).",
    "ex_ar": "تكون المصفوفة منفردة عندما \\( \\det(A) = 24 - 6k = 0 \\implies k = 4 \\)."
  },
  {
    "t": "tf",
    "ti": "True / False: Core Theorems (SAAT Mathematical Logic, Matrices, Determinants & Complex Numbers)",
    "ti_ar": "صح / خطأ: النظريات الأساسية (المنطق الرياضي والمصفوفات والمحددات والأعداد المركبة (SAAT))",
    "items": [
      {
        "s": "The contrapositive \\( \\neg q \\to \\neg p \\) is always logically equivalent to the conditional statement \\( p \\to q \\).",
        "a": true
      },
      {
        "s": "Since \\( i^4 = 1 \\), the complex power \\( i^{2026} = i^{2} = -1 \\).",
        "a": true
      },
      {
        "s": "By Remainder Theorem, the remainder when \\( P(x) \\) is divided by \\( (x - c) \\) is \\( P(-c) \\).",
        "a": false
      }
    ],
    "items_ar": [
      {
        "s": "المعاكس الإيجابي \\( \\neg q \\to \\neg p \\) يكافئ منطقياً دائماً العبارة الشرطية \\( p \\to q \\).",
        "a": true
      },
      {
        "s": "بما أن \\( i^4 = 1 \\)، فإن \\( i^{2026} = i^2 = -1 \\).",
        "a": true
      },
      {
        "s": "حسب نظرية الباقي، باقي قسمة \\( P(x) \\) على \\( (x - c) \\) هو \\( P(-c) \\).",
        "a": false
      }
    ]
  },
  {
    "t": "mt",
    "ti": "Matching: Identities & Principles (SAAT Mathematical Logic, Matrices, Determinants & Complex Numbers)",
    "ti_ar": "مطابقة: القوانين والمفاهيم (المنطق الرياضي والمصفوفات والمحددات والأعداد المركبة (SAAT))",
    "p": [
      {
        "l": "\\( \\neg q \\to \\neg p \\)",
        "r": "Contrapositive (logically equivalent to \\( p \\to q \\))"
      },
      {
        "l": "\\( ad - bc = 0 \\)",
        "r": "\\( 2 \\times 2 \\) matrix has no multiplicative inverse"
      },
      {
        "l": "\\( (a + bi)(a - bi) \\)",
        "r": "\\( a^2 + b^2 \\) (product of complex conjugates)"
      },
      {
        "l": "\\( P(c) = 0 \\)",
        "r": "\\( (x - c) \\) is a linear factor of polynomial \\( P(x) \\)"
      }
    ],
    "p_ar": [
      {
        "l": "\\( \\neg q \\to \\neg p \\)",
        "r": "المعاكس الإيجابي (مكافئ منطقياً لـ \\( p \\to q \\))"
      },
      {
        "l": "\\( ad - bc = 0 \\)",
        "r": "المصفوفة \\( 2 \\times 2 \\) ليس لها نظير ضربي"
      },
      {
        "l": "\\( (a + bi)(a - bi) \\)",
        "r": "\\( a^2 + b^2 \\) (حاصل ضرب العددين المركبين المترافقين)"
      },
      {
        "l": "\\( P(c) = 0 \\)",
        "r": "\\( (x - c) \\) عامل خطي لكثيرة الحدود \\( P(x) \\)"
      }
    ]
  },
  {
    "t": "se",
    "ti": "Spot the Error: Algebraic & Domain Verification (SAAT Mathematical Logic, Matrices, Determinants & Complex Numbers)",
    "ti_ar": "اكتشف الخطأ: التحقق الجبري والمنطقي (المنطق الرياضي والمصفوفات والمحددات والأعداد المركبة (SAAT))",
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
    "ti": "Examiner Mode: Multi-Step Structured Problem (SAAT Mathematical Logic, Matrices, Determinants & Complex Numbers)",
    "ti_ar": "وضع المصحح: مسألة هيكلية متعددة الخطوات (المنطق الرياضي والمصفوفات والمحددات والأعداد المركبة (SAAT))",
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
    "ti": "Step Builder: Guided Calculation (SAAT Mathematical Logic, Matrices, Determinants & Complex Numbers)",
    "ti_ar": "بناء الخطوات: حساب موجه خطوة بخطوة (المنطق الرياضي والمصفوفات والمحددات والأعداد المركبة (SAAT))",
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
    "ti": "Numeric Entry: SAAT Mathematical Logic, Matrices, Determinants & Complex Numbers",
    "ti_ar": "إدخال رقمي: المنطق الرياضي والمصفوفات والمحددات والأعداد المركبة (SAAT)",
    "q": "Evaluate the product of complex conjugates \\( (3 + 4i)(3 - 4i) \\).",
    "q_ar": "أوجد حاصل ضرب العددين المركبين المترافقين \\( (3 + 4i)(3 - 4i) \\).",
    "a": 25,
    "h": "Use \\( (a + bi)(a - bi) = a^2 + b^2 \\).",
    "h_ar": "استخدم القاعدة \\( (a + bi)(a - bi) = a^2 + b^2 \\).",
    "sol": "\\( 3^2 + 4^2 = 9 + 16 = 25 \\).",
    "sol_ar": "\\( 3^2 + 4^2 = 9 + 16 = 25 \\)."
  },
  {
    "t": "ord",
    "ti": "Order the Steps: Systematic Solution (SAAT Mathematical Logic, Matrices, Determinants & Complex Numbers)",
    "ti_ar": "رتّب الخطوات: خطوات الحل المنظم (المنطق الرياضي والمصفوفات والمحددات والأعداد المركبة (SAAT))",
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
    "ti": "Categorize: Mathematical Classification (SAAT Mathematical Logic, Matrices, Determinants & Complex Numbers)",
    "ti_ar": "تصنيف: التصنيف الرياضي (المنطق الرياضي والمصفوفات والمحددات والأعداد المركبة (SAAT))",
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

D["ge-saat-functions-logs"] = [
  {
    "t": "qc",
    "ti": "Quick Check: SAAT Rational Functions, Sequences, Series & Logarithms",
    "ti_ar": "فحص سريع: الدوال الكسرية والمتتابعات والأسس واللوغاريتمات (SAAT)",
    "q": "What is the horizontal asymptote of the rational function \\( f(x) = \\frac{6x^2 - 5x + 1}{2x^2 + 9} \\)?",
    "q_ar": "ما هي معادلة خط التقارب الأفقي للدالة النسبية \\( f(x) = \\frac{6x^2 - 5x + 1}{2x^2 + 9} \\)؟",
    "o": [
      "\\( y = 3 \\)",
      "\\( y = 0 \\)",
      "\\( y = \\frac{1}{9} \\)",
      "No horizontal asymptote"
    ],
    "o_ar": [
      "\\( y = 3 \\)",
      "\\( y = 0 \\)",
      "\\( y = \\frac{1}{9} \\)",
      "No horizontal asymptote"
    ],
    "a": 0,
    "ex": "Since numerator and denominator both have degree 2, the horizontal asymptote is the ratio of leading coefficients \\( y = \\frac{6}{2} = 3 \\).",
    "ex_ar": "بما أن درجة البسط تساوي درجة المقام (2)، فإن خط التقارب الأفقي هو نسبة المعاملين الرئيسيين \\( y = \\frac{6}{2} = 3 \\)."
  },
  {
    "t": "tf",
    "ti": "True / False: Core Theorems (SAAT Rational Functions, Sequences, Series & Logarithms)",
    "ti_ar": "صح / خطأ: النظريات الأساسية (الدوال الكسرية والمتتابعات والأسس واللوغاريتمات (SAAT))",
    "items": [
      {
        "s": "An infinite geometric series with first term \\( a_1 \\) and common ratio \\( r \\) converges if and only if \\( |r| < 1 \\), with sum \\( S_\\infty = \\frac{a_1}{1 - r} \\).",
        "a": true
      },
      {
        "s": "For any base \\( b > 0, b \\neq 1 \\), \\( \\log_b(xy) = \\log_b x + \\log_b y \\) for positive \\( x, y \\).",
        "a": true
      },
      {
        "s": "A rational function \\( \\frac{(x - 2)(x + 3)}{x - 2} \\) has a vertical asymptote at \\( x = 2 \\).",
        "a": false
      }
    ],
    "items_ar": [
      {
        "s": "تتقارب المتسلسلة الهندسية اللانهائية إذا وفقط إذا كان \\( |r| < 1 \\) ومجموعها \\( S_\\infty = \\frac{a_1}{1 - r} \\).",
        "a": true
      },
      {
        "s": "لأي أساس صالح \\( b \\)، يتحقق \\( \\log_b(xy) = \\log_b x + \\log_b y \\) لكل \\( x, y > 0 \\).",
        "a": true
      },
      {
        "s": "الدالة النسبية \\( \\frac{(x - 2)(x + 3)}{x - 2} \\) لها خط تقارب رأسي عند \\( x = 2 \\).",
        "a": false
      }
    ]
  },
  {
    "t": "mt",
    "ti": "Matching: Identities & Principles (SAAT Rational Functions, Sequences, Series & Logarithms)",
    "ti_ar": "مطابقة: القوانين والمفاهيم (الدوال الكسرية والمتتابعات والأسس واللوغاريتمات (SAAT))",
    "p": [
      {
        "l": "\\( \\text{deg}(P) < \\text{deg}(Q) \\)",
        "r": "Horizontal asymptote is \\( y = 0 \\)"
      },
      {
        "l": "Common factor \\( (x - c) \\) in \\( P/Q \\)",
        "r": "Point discontinuity (removable hole) at \\( x = c \\)"
      },
      {
        "l": "\\( S_\\infty = \\frac{a_1}{1 - r} \\)",
        "r": "Sum of a convergent infinite geometric series (\\( |r| < 1 \\))"
      },
      {
        "l": "\\( \\log_b(a) = c \\)",
        "r": "Equivalent exponential statement \\( b^c = a \\)"
      }
    ],
    "p_ar": [
      {
        "l": "\\( \\text{deg}(P) < \\text{deg}(Q) \\)",
        "r": "خط التقارب الأفقي هو \\( y = 0 \\)"
      },
      {
        "l": "Common factor \\( (x - c) \\) in \\( P/Q \\)",
        "r": "نقطة انفصال (فجوة قابلة للإزالة) عند \\( x = c \\)"
      },
      {
        "l": "\\( S_\\infty = \\frac{a_1}{1 - r} \\)",
        "r": "مجموع المتسلسلة الهندسية اللانهائية المتقاربة"
      },
      {
        "l": "\\( \\log_b(a) = c \\)",
        "r": "الصورة الأسية المكافئة \\( b^c = a \\)"
      }
    ]
  },
  {
    "t": "se",
    "ti": "Spot the Error: Algebraic & Domain Verification (SAAT Rational Functions, Sequences, Series & Logarithms)",
    "ti_ar": "اكتشف الخطأ: التحقق الجبري والمنطقي (الدوال الكسرية والمتتابعات والأسس واللوغاريتمات (SAAT))",
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
    "ti": "Examiner Mode: Multi-Step Structured Problem (SAAT Rational Functions, Sequences, Series & Logarithms)",
    "ti_ar": "وضع المصحح: مسألة هيكلية متعددة الخطوات (الدوال الكسرية والمتتابعات والأسس واللوغاريتمات (SAAT))",
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
    "ti": "Step Builder: Guided Calculation (SAAT Rational Functions, Sequences, Series & Logarithms)",
    "ti_ar": "بناء الخطوات: حساب موجه خطوة بخطوة (الدوال الكسرية والمتتابعات والأسس واللوغاريتمات (SAAT))",
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
    "ti": "Numeric Entry: SAAT Rational Functions, Sequences, Series & Logarithms",
    "ti_ar": "إدخال رقمي: الدوال الكسرية والمتتابعات والأسس واللوغاريتمات (SAAT)",
    "q": "Find the sum to infinity of the convergent geometric series \\( 12 + 6 + 3 + 1.5 + \\dots \\)",
    "q_ar": "أوجد مجموع المتسلسلة الهندسية اللانهائية المتقاربة \\( 12 + 6 + 3 + 1.5 + \\dots \\)",
    "a": 24,
    "h": "Here \\( a_1 = 12 \\) and \\( r = 0.5 \\); use \\( S_\\infty = \\frac{a_1}{1 - r} \\).",
    "h_ar": "هنا \\( a_1 = 12 \\) و \\( r = 0.5 \\)؛ طبق القانون \\( S_\\infty = \\frac{a_1}{1 - r} \\).",
    "sol": "\\( S_\\infty = \\frac{12}{1 - 0.5} = \\frac{12}{0.5} = 24 \\).",
    "sol_ar": "\\( S_\\infty = \\frac{12}{1 - 0.5} = \\frac{12}{0.5} = 24 \\)."
  },
  {
    "t": "ord",
    "ti": "Order the Steps: Systematic Solution (SAAT Rational Functions, Sequences, Series & Logarithms)",
    "ti_ar": "رتّب الخطوات: خطوات الحل المنظم (الدوال الكسرية والمتتابعات والأسس واللوغاريتمات (SAAT))",
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
    "ti": "Categorize: Mathematical Classification (SAAT Rational Functions, Sequences, Series & Logarithms)",
    "ti_ar": "تصنيف: التصنيف الرياضي (الدوال الكسرية والمتتابعات والأسس واللوغاريتمات (SAAT))",
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

D["ge-saat-trig-conics"] = [
  {
    "t": "qc",
    "ti": "Quick Check: SAAT Trigonometry, Conic Sections & 3D Vectors",
    "ti_ar": "فحص سريع: حساب المثلثات والقطوع المخروطية والمتجهات في الفضاء (SAAT)",
    "q": "What is the eccentricity \\( e = \\frac{c}{a} \\) of the ellipse \\( \\frac{x^2}{25} + \\frac{y^2}{9} = 1 \\)?",
    "q_ar": "ما هو الاختلاف المركزي \\( e = \\frac{c}{a} \\) للقطع الناقص \\( \\frac{x^2}{25} + \\frac{y^2}{9} = 1 \\)؟",
    "o": [
      "\\( \\frac{4}{5} \\)",
      "\\( \\frac{3}{5} \\)",
      "\\( \\frac{\\sqrt{34}}{5} \\)",
      "\\( \\frac{16}{25} \\)"
    ],
    "o_ar": [
      "\\( \\frac{4}{5} \\)",
      "\\( \\frac{3}{5} \\)",
      "\\( \\frac{\\sqrt{34}}{5} \\)",
      "\\( \\frac{16}{25} \\)"
    ],
    "a": 0,
    "ex": "In an ellipse, \\( a = 5, b = 3 \\), and \\( c = \\sqrt{a^2 - b^2} = \\sqrt{25 - 9} = 4 \\), so \\( e = \\frac{c}{a} = \\frac{4}{5} \\).",
    "ex_ar": "في القطع الناقص: \\( a = 5, b = 3 \\) و \\( c = \\sqrt{25 - 9} = 4 \\)، فيكون \\( e = \\frac{c}{a} = \\frac{4}{5} \\)."
  },
  {
    "t": "tf",
    "ti": "True / False: Core Theorems (SAAT Trigonometry, Conic Sections & 3D Vectors)",
    "ti_ar": "صح / خطأ: النظريات الأساسية (حساب المثلثات والقطوع المخروطية والمتجهات في الفضاء (SAAT))",
    "items": [
      {
        "s": "Two 3D vectors \\( \\mathbf{u} \\) and \\( \\mathbf{v} \\) are orthogonal (perpendicular) if and only if their dot product \\( \\mathbf{u} \\cdot \\mathbf{v} = 0 \\).",
        "a": true
      },
      {
        "s": "For any hyperbola, the focal distance satisfies \\( c^2 = a^2 + b^2 \\) and the eccentricity satisfies \\( e > 1 \\).",
        "a": true
      },
      {
        "s": "By the double-angle identity, \\( \\sin(2\\theta) = 2\\sin\\theta \\) for all real angles \\( \\theta \\).",
        "a": false
      }
    ],
    "items_ar": [
      {
        "s": "يتعامد متجهان في الفضاء إذا وفقط إذا كان حاصل ضربهما الداخلي \\( \\mathbf{u} \\cdot \\mathbf{v} = 0 \\).",
        "a": true
      },
      {
        "s": "في أي قطع زائد يتحقق \\( c^2 = a^2 + b^2 \\) ويكون الاختلاف المركزي \\( e > 1 \\).",
        "a": true
      },
      {
        "s": "من متطابقة ضعف الزاوية: \\( \\sin(2\\theta) = 2\\sin\\theta \\) لجميع الزوايا.",
        "a": false
      }
    ]
  },
  {
    "t": "mt",
    "ti": "Matching: Identities & Principles (SAAT Trigonometry, Conic Sections & 3D Vectors)",
    "ti_ar": "مطابقة: القوانين والمفاهيم (حساب المثلثات والقطوع المخروطية والمتجهات في الفضاء (SAAT))",
    "p": [
      {
        "l": "\\( c^2 = a^2 - b^2 \\) (\\( 0 < e < 1 \\))",
        "r": "Ellipse focal parameter relation"
      },
      {
        "l": "\\( c^2 = a^2 + b^2 \\) (\\( e > 1 \\))",
        "r": "Hyperbola focal parameter relation"
      },
      {
        "l": "\\( \\mathbf{u} \\cdot \\mathbf{v} = 0 \\)",
        "r": "Orthogonal (perpendicular) vectors in \\( \\mathbb{R}^3 \\)"
      },
      {
        "l": "\\( \\cos(2\\theta) = \\cos^2\\theta - \\sin^2\\theta \\)",
        "r": "Double-angle cosine identity"
      }
    ],
    "p_ar": [
      {
        "l": "\\( c^2 = a^2 - b^2 \\) (\\( 0 < e < 1 \\))",
        "r": "العلاقة البؤرية في القطع الناقص"
      },
      {
        "l": "\\( c^2 = a^2 + b^2 \\) (\\( e > 1 \\))",
        "r": "العلاقة البؤرية في القطع الزائد"
      },
      {
        "l": "\\( \\mathbf{u} \\cdot \\mathbf{v} = 0 \\)",
        "r": "متجهان متعامدان في الفضاء الثلاثي"
      },
      {
        "l": "\\( \\cos(2\\theta) = \\cos^2\\theta - \\sin^2\\theta \\)",
        "r": "متطابقة جيب تمام ضعف الزاوية"
      }
    ]
  },
  {
    "t": "se",
    "ti": "Spot the Error: Algebraic & Domain Verification (SAAT Trigonometry, Conic Sections & 3D Vectors)",
    "ti_ar": "اكتشف الخطأ: التحقق الجبري والمنطقي (حساب المثلثات والقطوع المخروطية والمتجهات في الفضاء (SAAT))",
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
    "ti": "Examiner Mode: Multi-Step Structured Problem (SAAT Trigonometry, Conic Sections & 3D Vectors)",
    "ti_ar": "وضع المصحح: مسألة هيكلية متعددة الخطوات (حساب المثلثات والقطوع المخروطية والمتجهات في الفضاء (SAAT))",
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
    "ti": "Step Builder: Guided Calculation (SAAT Trigonometry, Conic Sections & 3D Vectors)",
    "ti_ar": "بناء الخطوات: حساب موجه خطوة بخطوة (حساب المثلثات والقطوع المخروطية والمتجهات في الفضاء (SAAT))",
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
    "ti": "Numeric Entry: SAAT Trigonometry, Conic Sections & 3D Vectors",
    "ti_ar": "إدخال رقمي: حساب المثلثات والقطوع المخروطية والمتجهات في الفضاء (SAAT)",
    "q": "Find the value of \\( k \\) for which the 3D vectors \\( \\mathbf{u} = \\langle 2, -3, 4 \\rangle \\) and \\( \\mathbf{v} = \\langle 5, 6, k \\rangle \\) are orthogonal.",
    "q_ar": "أوجد قيمة \\( k \\) التي تجعل المتجهين \\( \\mathbf{u} = \\langle 2, -3, 4 \\rangle \\) و \\( \\mathbf{v} = \\langle 5, 6, k \\rangle \\) متعامدين.",
    "a": 2,
    "h": "Set the dot product \\( 2(5) + (-3)(6) + 4k = 0 \\).",
    "h_ar": "ضع حاصل الضرب الداخلي \\( 2(5) + (-3)(6) + 4k = 0 \\).",
    "sol": "\\( 10 - 18 + 4k = 0 \\implies 4k = 8 \\implies k = 2 \\).",
    "sol_ar": "\\( 10 - 18 + 4k = 0 \\implies 4k = 8 \\implies k = 2 \\)."
  },
  {
    "t": "ord",
    "ti": "Order the Steps: Systematic Solution (SAAT Trigonometry, Conic Sections & 3D Vectors)",
    "ti_ar": "رتّب الخطوات: خطوات الحل المنظم (حساب المثلثات والقطوع المخروطية والمتجهات في الفضاء (SAAT))",
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
    "ti": "Categorize: Mathematical Classification (SAAT Trigonometry, Conic Sections & 3D Vectors)",
    "ti_ar": "تصنيف: التصنيف الرياضي (حساب المثلثات والقطوع المخروطية والمتجهات في الفضاء (SAAT))",
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

D["ge-saat-calculus"] = [
  {
    "t": "qc",
    "ti": "Quick Check: SAAT Limits, Derivatives, Definite Integrals & Area",
    "ti_ar": "فحص سريع: النهايات والاشتقاق والتكامل المحدود والمساحات (SAAT)",
    "q": "Evaluate the limit \\( \\lim_{x \\to 3} \\frac{x^2 - 9}{x - 3} \\).",
    "q_ar": "احسب قيمة النهاية \\( \\lim_{x \\to 3} \\frac{x^2 - 9}{x - 3} \\).",
    "o": [
      "\\( 6 \\)",
      "\\( 0 \\)",
      "\\( 3 \\)",
      "Does not exist"
    ],
    "o_ar": [
      "\\( 6 \\)",
      "\\( 0 \\)",
      "\\( 3 \\)",
      "Does not exist"
    ],
    "a": 0,
    "ex": "Factor \\( \\frac{(x - 3)(x + 3)}{x - 3} = x + 3 \\) for \\( x \\neq 3 \\); substituting \\( x = 3 \\) gives \\( 6 \\).",
    "ex_ar": "بحساب \\( \\frac{(x - 3)(x + 3)}{x - 3} = x + 3 \\) ثم التعويض عن \\( x = 3 \\) نحصل على \\( 6 \\)."
  },
  {
    "t": "tf",
    "ti": "True / False: Core Theorems (SAAT Limits, Derivatives, Definite Integrals & Area)",
    "ti_ar": "صح / خطأ: النظريات الأساسية (النهايات والاشتقاق والتكامل المحدود والمساحات (SAAT))",
    "items": [
      {
        "s": "By the Fundamental Theorem of Calculus, \\( \\int_a^b f(x)\\,dx = F(b) - F(a) \\) where \\( F'(x) = f(x) \\).",
        "a": true
      },
      {
        "s": "If \\( f(x) \\) is a polynomial, the slope of the tangent line at \\( x = a \\) is \\( f'(a) \\).",
        "a": true
      },
      {
        "s": "\\( \\lim_{x \\to \\infty} \\frac{4x^2 + 1}{2x^3 - 5} = 2 \\).",
        "a": false
      }
    ],
    "items_ar": [
      {
        "s": "حسب النظرية الأساسية للتفاضل والتكامل، \\( \\int_a^b f(x)\\,dx = F(b) - F(a) \\) حيث \\( F'(x) = f(x) \\).",
        "a": true
      },
      {
        "s": "ميل المماس لمنحنى الدالة \\( f(x) \\) عند \\( x = a \\) يساوي \\( f'(a) \\).",
        "a": true
      },
      {
        "s": "قيمة النهاية \\( \\lim_{x \\to \\infty} \\frac{4x^2 + 1}{2x^3 - 5} \\) تساوي \\( 2 \\).",
        "a": false
      }
    ]
  },
  {
    "t": "mt",
    "ti": "Matching: Identities & Principles (SAAT Limits, Derivatives, Definite Integrals & Area)",
    "ti_ar": "مطابقة: القوانين والمفاهيم (النهايات والاشتقاق والتكامل المحدود والمساحات (SAAT))",
    "p": [
      {
        "l": "\\( \\lim_{x \\to a} \\frac{f(x) - f(a)}{x - a} \\)",
        "r": "Limit definition of the derivative \\( f'(a) \\)"
      },
      {
        "l": "\\( \\int x^n\\,dx \\) (\\( n \\neq -1 \\))",
        "r": "\\( \\frac{x^{n+1}}{n+1} + C \\) (Power rule of integration)"
      },
      {
        "l": "\\( f'(c) = 0 \\)",
        "r": "Critical point (candidate for local extremum)"
      },
      {
        "l": "\\( \\int_a^b v(t)\\,dt \\)",
        "r": "Net displacement of a particle from \\( t = a \\) to \\( t = b \\)"
      }
    ],
    "p_ar": [
      {
        "l": "\\( \\lim_{x \\to a} \\frac{f(x) - f(a)}{x - a} \\)",
        "r": "تعريف المشتقة \\( f'(a) \\) باستخدام النهايات"
      },
      {
        "l": "\\( \\int x^n\\,dx \\) (\\( n \\neq -1 \\))",
        "r": "\\( \\frac{x^{n+1}}{n+1} + C \\) (قاعدة القوى في التكامل)"
      },
      {
        "l": "\\( f'(c) = 0 \\)",
        "r": "نقطة حرجة (مرشحة لقيمة قصوى محلية)"
      },
      {
        "l": "\\( \\int_a^b v(t)\\,dt \\)",
        "r": "الإزاحة الصافية للجسيم في الفترة \\( [a, b] \\)"
      }
    ]
  },
  {
    "t": "se",
    "ti": "Spot the Error: Algebraic & Domain Verification (SAAT Limits, Derivatives, Definite Integrals & Area)",
    "ti_ar": "اكتشف الخطأ: التحقق الجبري والمنطقي (النهايات والاشتقاق والتكامل المحدود والمساحات (SAAT))",
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
    "ti": "Examiner Mode: Multi-Step Structured Problem (SAAT Limits, Derivatives, Definite Integrals & Area)",
    "ti_ar": "وضع المصحح: مسألة هيكلية متعددة الخطوات (النهايات والاشتقاق والتكامل المحدود والمساحات (SAAT))",
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
    "ti": "Step Builder: Guided Calculation (SAAT Limits, Derivatives, Definite Integrals & Area)",
    "ti_ar": "بناء الخطوات: حساب موجه خطوة بخطوة (النهايات والاشتقاق والتكامل المحدود والمساحات (SAAT))",
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
    "ti": "Numeric Entry: SAAT Limits, Derivatives, Definite Integrals & Area",
    "ti_ar": "إدخال رقمي: النهايات والاشتقاق والتكامل المحدود والمساحات (SAAT)",
    "q": "Evaluate the definite integral \\( \\int_0^3 (3x^2 + 2x)\\,dx \\).",
    "q_ar": "احسب قيمة التكامل المحدود \\( \\int_0^3 (3x^2 + 2x)\\,dx \\).",
    "a": 36,
    "h": "Find the antiderivative \\( [x^3 + x^2]_0^3 \\).",
    "h_ar": "أوجد الدالة الأصلية \\( [x^3 + x^2]_0^3 \\) وعوّض بحدي التكامل.",
    "sol": "\\( [x^3 + x^2]_0^3 = (27 + 9) - 0 = 36 \\).",
    "sol_ar": "\\( [x^3 + x^2]_0^3 = (27 + 9) - 0 = 36 \\)."
  },
  {
    "t": "ord",
    "ti": "Order the Steps: Systematic Solution (SAAT Limits, Derivatives, Definite Integrals & Area)",
    "ti_ar": "رتّب الخطوات: خطوات الحل المنظم (النهايات والاشتقاق والتكامل المحدود والمساحات (SAAT))",
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
    "ti": "Categorize: Mathematical Classification (SAAT Limits, Derivatives, Definite Integrals & Area)",
    "ti_ar": "تصنيف: التصنيف الرياضي (النهايات والاشتقاق والتكامل المحدود والمساحات (SAAT))",
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
