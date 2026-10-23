/* Interactive Practice data for /algebra/ - one entry per chapter section id.
   Shipped as public/js/ix/algebra.js and loaded only on that track's page by the
   engine in src/scripts/modules/19-interactive-activities-engine-v1.js
   (Plan 5 Phase 5.015, ADR 0033). Entry shapes (qc/mt/tf/sb/sr/fn/num/ord/cat/gp/se/ms) are
   documented there. */
(window.__ixData = window.__ixData || []).push(function (D) {
D["ag-linear"] = [
  {
    "t": "qc",
    "ti": "Quick Check: Linear Equations",
    "ti_ar": "فحص سريع: المعادلات الخطية",
    "q": "Solve \\(2x+5=13\\)",
    "q_ar": "حل المعادلة \\(2x+5=13\\)",
    "o": [
      "\\(x=4\\)",
      "\\(x=9\\)",
      "\\(x=3\\)",
      "\\(x=6\\)"
    ],
    "o_ar": [
      "\\(x=4\\)",
      "\\(x=9\\)",
      "\\(x=3\\)",
      "\\(x=6\\)"
    ],
    "a": 0,
    "ex": "\\(2x=8\\Rightarrow x=4\\).",
    "ex_ar": "\\(2x=8\\Rightarrow x=4\\)."
  },
  {
    "t": "mt",
    "ti": "Matching: Linear Equation Forms",
    "ti_ar": "مطابقة: صيغ المعادلات الخطية",
    "p": [
      {
        "l": "Slope-intercept form",
        "l_ar": "صيغة الميل والمقطع",
        "r": "y = mx + b",
        "r_ar": "y = mx + b"
      },
      {
        "l": "Point-slope form",
        "l_ar": "صيغة الميل ونقطة",
        "r": "y − y₁ = m(x − x₁)",
        "r_ar": "y − y₁ = m(x − x₁)"
      },
      {
        "l": "Standard form",
        "l_ar": "الصيغة القياسية",
        "r": "Ax + By = C",
        "r_ar": "Ax + By = C"
      },
      {
        "l": "Slope formula",
        "l_ar": "قانون الميل",
        "r": "m = (y₂−y₁)/(x₂−x₁)",
        "r_ar": "m = (y₂−y₁)/(x₂−x₁)"
      }
    ]
  },
  {
    "t": "num",
    "ti": "Numeric Entry: Solve Linear Equation",
    "ti_ar": "إدخال رقمي: حل معادلة خطية",
    "q": "Solve for \\(x\\): \\(4(x - 3) + 2 = 2x + 8\\)",
    "q_ar": "حل المعادلة لإيجاد قيمة \\(x\\): \\(4(x - 3) + 2 = 2x + 8\\)",
    "a": 9,
    "h": "Expand the left side: \\(4x - 12 + 2 = 4x - 10\\).",
    "h_ar": "فك القوس في الطرف الأيسر: \\(4x - 12 + 2 = 4x - 10\\).",
    "sol": "\\(4x - 10 = 2x + 8 \\implies 2x = 18 \\implies x = 9\\).",
    "sol_ar": "\\(4x - 10 = 2x + 8 \\implies 2x = 18 \\implies x = 9\\)."
  },
  {
    "t": "ord",
    "ti": "Order the Steps: Multi-Step Linear Equation",
    "ti_ar": "رتّب الخطوات: حل معادلة خطية متعددة الخطوات",
    "prompt": "Arrange the steps to solve \\(3(2x - 5) + 4 = 2x + 9\\):",
    "prompt_ar": "رتب خطوات حل المعادلة \\(3(2x - 5) + 4 = 2x + 9\\):",
    "items": [
      "Distribute through parentheses: \\(6x - 15 + 4 = 2x + 9\\).",
      "Combine constant terms on the left: \\(6x - 11 = 2x + 9\\).",
      "Subtract \\(2x\\) from both sides: \\(4x - 11 = 9\\).",
      "Add 11 to both sides: \\(4x = 20\\).",
      "Divide both sides by 4: \\(x = 5\\)."
    ],
    "items_ar": [
      "توزيع الضرب على ما داخل القوسين: \\(6x - 15 + 4 = 2x + 9\\).",
      "تجميع الحدود الثابتة في الطرف الأيسر: \\(6x - 11 = 2x + 9\\).",
      "طرح \\(2x\\) من كلا الطرفين: \\(4x - 11 = 9\\).",
      "إضافة 11 إلى كلا الطرفين: \\(4x = 20\\).",
      "قسمة كلا الطرفين على 4: \\(x = 5\\)."
    ],
    "ex": "Distribute, combine like terms, move variable terms to one side, isolate the variable.",
    "ex_ar": "استخدم خاصية التوزيع، ثم جمّع الحدود المتشابهة، وانقل حدود المتغير إلى طرف واحد، واعزل المتغير."
  },
  {
    "t": "cat",
    "ti": "Categorize: Linear Equation Solution Types",
    "ti_ar": "تصنيف: أنواع حلول المعادلات الخطية",
    "categories": [
      "One Unique Solution",
      "No Solution (Inconsistent)",
      "Infinitely Many (Identity)"
    ],
    "categories_ar": [
      "حل وحيد",
      "لا يوجد حل (تناقض)",
      "عدد لا نهائي من الحلول (متطابقة)"
    ],
    "items": [
      {
        "s": "\\(2x + 3 = 2x + 7\\)",
        "s_ar": "\\(2x + 3 = 2x + 7\\)",
        "cat": 1
      },
      {
        "s": "\\(4x - 8 = 4(x - 2)\\)",
        "s_ar": "\\(4x - 8 = 4(x - 2)\\)",
        "cat": 2
      },
      {
        "s": "\\(3x + 5 = 20\\)",
        "s_ar": "\\(3x + 5 = 20\\)",
        "cat": 0
      },
      {
        "s": "\\(5x - 2 = 5x + 3\\)",
        "s_ar": "\\(5x - 2 = 5x + 3\\)",
        "cat": 1
      },
      {
        "s": "\\(2(x + 1) = 2x + 2\\)",
        "s_ar": "\\(2(x + 1) = 2x + 2\\)",
        "cat": 2
      },
      {
        "s": "\\(7x - 4 = 3x + 12\\)",
        "s_ar": "\\(7x - 4 = 3x + 12\\)",
        "cat": 0
      }
    ],
    "ex": "Equations simplifying to false statements have no solution; identities hold for all real numbers; distinct slopes give one unique solution.",
    "ex_ar": "المعادلات التي تؤول إلى عبارة خاطئة ليس لها حل؛ والمتطابقات صحيحة لجميع الأعداد الحقيقية؛ والميول المختلفة تعطي حلاً وحيداً."
  },
  {
    "t": "se",
    "ti": "Spot the Error: Algebraic & Domain Verification (Linear Equations &amp; Lines)",
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
    "ti_ar": "اكتشف الخطأ: الجذور الدخيلة والتحقق من المجال (Linear Equations &amp; Lines)",
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
    "ti": "Examiner Mode: Multi-Step Structured Problem (Linear Equations &amp; Lines)",
    "q": "Let \\(f(x) = x^2 - 10x + 31\\) for \\(x \\ge 5\\). (a) Express \\(f(x)\\) in completed-square vertex form and state the range of \\(f\\). (b) Find an expression for the inverse function \\(f^{-1}(x)\\) and state its domain.",
    "parts": [
      {
        "label": "Part (a) — Vertex Form & Range",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "Complete the square: \\(f(x) = (x - 5)^2 - 25 + 31 = (x - 5)^2 + 6\\)."
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
            "text": "Set \\(y = (x - 5)^2 + 6 \\implies (x - 5)^2 = y - 6\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "Select positive branch (since \\(x \\ge 5\\)): \\(f^{-1}(x) = 5 + \\sqrt{x - 6}\\)."
          },
          {
            "code": "B1",
            "marks": 1,
            "text": "State domain of \\(f^{-1}\\): \\(x \\ge 6\\) (matching the range of \\(f\\))."
          }
        ]
      }
    ],
    "examinerTip": "Writing \\(\\pm\\sqrt{x - 6}\\) for \\(f^{-1}(x)\\) loses the final A1 mark because a function must be single-valued; use the domain restriction \\(x \\ge 5\\) to choose the \\(+\\) sign.",
    "ti_ar": "وضع المصحح: إكمال المربع والدالة العكسية (Linear Equations &amp; Lines)",
    "q_ar": "لتكن \\(f(x) = x^2 - 10x + 31\\) حيث \\(x \\ge 5\\). (أ) اكتب \\(f(x)\\) في صورة المربع الكامل وحدد مداها. (ب) أوجد قاعدة الدالة العكسية \\(f^{-1}(x)\\) ومجالها.",
    "examinerTip_ar": "الدالة العكسية يجب أن تكون وحيدة القيمة، لذا نختار الإشارة الموجبة للجذر \\(5 + \\sqrt{x - 6}\\) لأن \\(x \\ge 5\\)."
  },
  {
    "t": "sb",
    "ti": "Step Builder: Completing the Square & Vertex Analysis (Linear Equations &amp; Lines)",
    "steps": [
      {
        "l": "In \\(y = x^2 - 10x + 31\\), halve the \\(x\\)-coefficient to write \\((x - h)^2\\) where \\(h =\\)",
        "a": "5",
        "h": "Take half of 10."
      },
      {
        "l": "Compute the minimum value \\(k = 31 - 5^2 =\\)",
        "a": "6",
        "h": "Subtract 25 from 31."
      },
      {
        "l": "Evaluate \\(y\\) when \\(x = 7\\): \\(y =\\)",
        "a": "10",
        "h": "Compute (2)^2 + 6."
      }
    ],
    "ti_ar": "بناء الخطوات: إكمال المربع وإيجاد القيمة الصغرى (Linear Equations &amp; Lines)",
    "steps_ar": [
      {
        "l": "في الدالة \\(y = x^2 - 10x + 31\\): قيمة \\(h\\) في \\((x - h)^2\\) تساوي:",
        "a": "5",
        "h": "اقسم معامل x وهو 10 على 2."
      },
      {
        "l": "احسب القيمة الصغرى \\(k = 31 - 5^2 =\\)",
        "a": "6",
        "h": "اطرح 25 من 31."
      },
      {
        "l": "احسب قيمة \\(y\\) عندما \\(x = 7\\):",
        "a": "10",
        "h": "احسب 4 + 6."
      }
    ]
  }
];

D["ag-quadratics"] = [
  {
    "t": "mt",
    "ti": "Matching: Quadratic Forms",
    "ti_ar": "مطابقة: صيغ الدوال والمعادلات التربيعية",
    "p": [
      {
        "l": "Standard form",
        "l_ar": "الصيغة القياسية",
        "r": "ax²+bx+c",
        "r_ar": "ax²+bx+c"
      },
      {
        "l": "Vertex form",
        "l_ar": "صيغة الرأس",
        "r": "a(x−h)²+k",
        "r_ar": "a(x−h)²+k"
      },
      {
        "l": "Axis of symmetry",
        "l_ar": "محور التماثل",
        "r": "x=−b/(2a)",
        "r_ar": "x=−b/(2a)"
      },
      {
        "l": "Discriminant",
        "l_ar": "المميز",
        "r": "b²−4ac",
        "r_ar": "b²−4ac"
      }
    ]
  },
  {
    "t": "sr",
    "ti": "Worked Example: Solve \\(x^2-5x+6=0\\) by Factoring",
    "ti_ar": "مثال محلول: حل \\(x^2-5x+6=0\\) بالتحليل إلى عوامل",
    "steps": [
      "Look for two numbers that multiply to \\(6\\) and add to \\(-5\\): those numbers are \\(-2\\) and \\(-3\\).",
      "Factor: \\(x^2-5x+6=(x-2)(x-3)\\).",
      "Set each factor to zero: \\(x-2=0\\) or \\(x-3=0\\).",
      "Solutions: \\(x=2\\) or \\(x=3\\)."
    ],
    "steps_ar": [
      "ابحث عن عددين حاصل ضربهما \\(6\\) ومجموعهما \\(-5\\): هذان العددان هما \\(-2\\) و \\(-3\\).",
      "التحليل إلى عوامل: \\(x^2-5x+6=(x-2)(x-3)\\).",
      "مساواة كل عامل بالصفر: \\(x-2=0\\) أو \\(x-3=0\\).",
      "الحلول: \\(x=2\\) أو \\(x=3\\)."
    ]
  },
  {
    "t": "ord",
    "ti": "Order the Steps: Solve by Completing the Square",
    "ti_ar": "رتّب الخطوات: الحل بإكمال المربع",
    "prompt": "Arrange the steps to solve \\(x^2 - 6x - 7 = 0\\) by completing the square:",
    "prompt_ar": "رتب خطوات حل المعادلة \\(x^2 - 6x - 7 = 0\\) بإكمال المربع:",
    "items": [
      "Add 7 to isolate variables on the left: \\(x^2 - 6x = 7\\)",
      "Add \\((-6/2)^2 = 9\\) to both sides: \\(x^2 - 6x + 9 = 16\\)",
      "Write the left side as a binomial square: \\((x - 3)^2 = 16\\)",
      "Take the square root of both sides: \\(x - 3 = \\pm 4\\)",
      "Solve the two linear equations: \\(x = 3 + 4 = 7\\) or \\(x = 3 - 4 = -1\\)"
    ],
    "items_ar": [
      "إضافة 7 لعزل الحدود المتغيرة في الطرف الأيسر: \\(x^2 - 6x = 7\\)",
      "إضافة \\((-6/2)^2 = 9\\) إلى كلا الطرفين: \\(x^2 - 6x + 9 = 16\\)",
      "كتابة الطرف الأيسر كمربع كامل لذات الحدين: \\((x - 3)^2 = 16\\)",
      "أخذ الجذر التربيعي لكلا الطرفين: \\(x - 3 = \\pm 4\\)",
      "حل المعادلتين الخطيتين: \\(x = 3 + 4 = 7\\) أو \\(x = 3 - 4 = -1\\)"
    ],
    "ex": "Move constant, add (b/2)², factor perfect square, apply square root property.",
    "ex_ar": "انقل الثابت، أضف (b/2)² للطرفين، حلل إلى مربع كامل، ثم طبق خاصية الجذر التربيعي."
  },
  {
    "t": "num",
    "ti": "Numeric Entry: Minimum Value of Quadratic",
    "ti_ar": "إدخال رقمي: القيمة الصغرى للدالة التربيعية",
    "q": "Find the minimum value of the quadratic function \\(f(x) = 2x^2 - 8x + 11\\).",
    "q_ar": "أوجد القيمة الصغرى للدالة التربيعية \\(f(x) = 2x^2 - 8x + 11\\).",
    "a": 3,
    "h": "Find vertex x-coordinate: \\(h = -b/(2a) = -(-8)/(4) = 2\\), then compute \\(f(2)\\).",
    "h_ar": "أوجد الإحداثي السيني للرأس: \\(h = -b/(2a) = -(-8)/(4) = 2\\)، ثم احسب \\(f(2)\\).",
    "sol": "\\(h = 2\\). Minimum value is \\(f(2) = 2(4) - 8(2) + 11 = 8 - 16 + 11 = 3\\).",
    "sol_ar": "\\(h = 2\\). القيمة الصغرى هي \\(f(2) = 2(4) - 8(2) + 11 = 8 - 16 + 11 = 3\\)."
  },
  {
    "t": "cat",
    "ti": "Categorize: Discriminant and Root Types",
    "ti_ar": "تصنيف: المميز وأنواع الجذور",
    "categories": [
      "Two Distinct Real Roots (\\(\\Delta > 0\\))",
      "One Repeated Real Root (\\(\\Delta = 0\\))",
      "Two Complex Roots (\\(\\Delta < 0\\))"
    ],
    "categories_ar": [
      "جذران حقيقيان مختلفان (\\(\\Delta > 0\\))",
      "جذر حقيقي مكرر (\\(\\Delta = 0\\))",
      "جذران مركبان (\\(\\Delta < 0\\))"
    ],
    "items": [
      {
        "s": "\\(x^2 - 6x + 9 = 0\\)",
        "s_ar": "\\(x^2 - 6x + 9 = 0\\)",
        "cat": 1
      },
      {
        "s": "\\(x^2 - 5x + 4 = 0\\)",
        "s_ar": "\\(x^2 - 5x + 4 = 0\\)",
        "cat": 0
      },
      {
        "s": "\\(x^2 + 2x + 5 = 0\\)",
        "s_ar": "\\(x^2 + 2x + 5 = 0\\)",
        "cat": 2
      },
      {
        "s": "\\(2x^2 - 4x + 2 = 0\\)",
        "s_ar": "\\(2x^2 - 4x + 2 = 0\\)",
        "cat": 1
      },
      {
        "s": "\\(3x^2 - 2x + 4 = 0\\)",
        "s_ar": "\\(3x^2 - 2x + 4 = 0\\)",
        "cat": 2
      },
      {
        "s": "\\(x^2 - 10 = 0\\)",
        "s_ar": "\\(x^2 - 10 = 0\\)",
        "cat": 0
      }
    ],
    "ex": "Positive discriminant yields two real roots, zero gives one repeated rational root, negative gives complex conjugate roots.",
    "ex_ar": "المميز الموجب يعطي جذرين حقيقيين مختلفين، والصفر يعطي جذراً حقيقياً مكرراً، والسالب يعطي جذرين مركبين مترافقين."
  },
  {
    "t": "se",
    "ti": "Spot the Error: Algebraic & Domain Verification (Quadratic Functions)",
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
    "ti_ar": "اكتشف الخطأ: الجذور الدخيلة والتحقق من المجال (Quadratic Functions)",
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
    "ti": "Examiner Mode: Multi-Step Structured Problem (Quadratic Functions)",
    "q": "Let \\(f(x) = x^2 - 6x + 14\\) for \\(x \\ge 3\\). (a) Express \\(f(x)\\) in completed-square vertex form and state the range of \\(f\\). (b) Find an expression for the inverse function \\(f^{-1}(x)\\) and state its domain.",
    "parts": [
      {
        "label": "Part (a) — Vertex Form & Range",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "Complete the square: \\(f(x) = (x - 3)^2 - 9 + 14 = (x - 3)^2 + 5\\)."
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
            "text": "Set \\(y = (x - 3)^2 + 5 \\implies (x - 3)^2 = y - 5\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "Select positive branch (since \\(x \\ge 3\\)): \\(f^{-1}(x) = 3 + \\sqrt{x - 5}\\)."
          },
          {
            "code": "B1",
            "marks": 1,
            "text": "State domain of \\(f^{-1}\\): \\(x \\ge 5\\) (matching the range of \\(f\\))."
          }
        ]
      }
    ],
    "examinerTip": "Writing \\(\\pm\\sqrt{x - 5}\\) for \\(f^{-1}(x)\\) loses the final A1 mark because a function must be single-valued; use the domain restriction \\(x \\ge 3\\) to choose the \\(+\\) sign.",
    "ti_ar": "وضع المصحح: إكمال المربع والدالة العكسية (Quadratic Functions)",
    "q_ar": "لتكن \\(f(x) = x^2 - 6x + 14\\) حيث \\(x \\ge 3\\). (أ) اكتب \\(f(x)\\) في صورة المربع الكامل وحدد مداها. (ب) أوجد قاعدة الدالة العكسية \\(f^{-1}(x)\\) ومجالها.",
    "examinerTip_ar": "الدالة العكسية يجب أن تكون وحيدة القيمة، لذا نختار الإشارة الموجبة للجذر \\(3 + \\sqrt{x - 5}\\) لأن \\(x \\ge 3\\)."
  },
  {
    "t": "sb",
    "ti": "Step Builder: Completing the Square & Vertex Analysis (Quadratic Functions)",
    "steps": [
      {
        "l": "In \\(y = x^2 - 6x + 14\\), halve the \\(x\\)-coefficient to write \\((x - h)^2\\) where \\(h =\\)",
        "a": "3",
        "h": "Take half of 6."
      },
      {
        "l": "Compute the minimum value \\(k = 14 - 3^2 =\\)",
        "a": "5",
        "h": "Subtract 9 from 14."
      },
      {
        "l": "Evaluate \\(y\\) when \\(x = 5\\): \\(y =\\)",
        "a": "9",
        "h": "Compute (2)^2 + 5."
      }
    ],
    "ti_ar": "بناء الخطوات: إكمال المربع وإيجاد القيمة الصغرى (Quadratic Functions)",
    "steps_ar": [
      {
        "l": "في الدالة \\(y = x^2 - 6x + 14\\): قيمة \\(h\\) في \\((x - h)^2\\) تساوي:",
        "a": "3",
        "h": "اقسم معامل x وهو 6 على 2."
      },
      {
        "l": "احسب القيمة الصغرى \\(k = 14 - 3^2 =\\)",
        "a": "5",
        "h": "اطرح 9 من 14."
      },
      {
        "l": "احسب قيمة \\(y\\) عندما \\(x = 5\\):",
        "a": "9",
        "h": "احسب 4 + 5."
      }
    ]
  }
];

D["ag-exponents"] = [
  {
    "t": "tf",
    "ti": "True or False: Exponent Laws",
    "ti_ar": "صواب أم خطأ: قوانين الأسس",
    "items": [
      {
        "s": "\\(x^m\\cdot x^n=x^{m+n}\\)",
        "s_ar": "\\(x^m\\cdot x^n=x^{m+n}\\)",
        "a": true,
        "ex": "Add exponents — product rule.",
        "ex_ar": "جمع الأسس — قاعدة ضرب القوى."
      },
      {
        "s": "\\((x^m)^n=x^{m+n}\\)",
        "s_ar": "\\((x^m)^n=x^{m+n}\\)",
        "a": false,
        "ex": "\\((x^m)^n=x^{mn}\\).",
        "ex_ar": "\\((x^m)^n=x^{mn}\\) — قاعدة قوة القوة."
      },
      {
        "s": "\\(x^0=0\\) for \\(x\\neq0\\)",
        "s_ar": "\\(x^0=0\\) حيث \\(x\\neq0\\)",
        "a": false,
        "ex": "\\(x^0=1\\).",
        "ex_ar": "\\(x^0=1\\) لأي عدد حقيقي لا يساوي الصفر."
      },
      {
        "s": "\\(x^{-n}=\\frac{1}{x^n}\\)",
        "s_ar": "\\(x^{-n}=\\frac{1}{x^n}\\)",
        "a": true,
        "ex": "Definition of negative exponents.",
        "ex_ar": "تعريف الأسس السالبة."
      }
    ]
  },
  {
    "t": "fn",
    "ti": "Explorer: Power Functions \\(y=x^n\\)",
    "ti_ar": "مستكشف: دوال القوى \\(y=x^n\\)",
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
      -10,
      10
    ],
    "params": [
      {
        "name": "n",
        "label": "Exponent n",
        "min": 1,
        "max": 5,
        "step": 1,
        "default": 2
      }
    ]
  },
  {
    "t": "sr",
    "ti": "Worked Example: Simplify \\(\\dfrac{x^5\\cdot x^3}{x^4}\\)",
    "ti_ar": "مثال محلول: تبسيط \\(\\dfrac{x^5\\cdot x^3}{x^4}\\)",
    "steps": [
      "Combine the numerator using the product rule: \\(x^5\\cdot x^3=x^{5+3}=x^8\\).",
      "Divide using the quotient rule: \\(\\dfrac{x^8}{x^4}=x^{8-4}=x^4\\).",
      "Simplified result: \\(x^4\\)."
    ],
    "steps_ar": [
      "تبسيط البسط باستخدام قاعدة ضرب القوى: \\(x^5\\cdot x^3=x^{5+3}=x^8\\).",
      "القسمة باستخدام قاعدة قسمة القوى: \\(\\dfrac{x^8}{x^4}=x^{8-4}=x^4\\).",
      "الناتج في أبسط صورة: \\(x^4\\)."
    ]
  },
  {
    "t": "qc",
    "ti": "Quick Check: Exponent Rules",
    "ti_ar": "فحص سريع: قواعد الأسس",
    "q": "Simplify \\((2x^3)^2\\)",
    "q_ar": "بسط المقدار \\((2x^3)^2\\)",
    "o": [
      "\\(4x^6\\)",
      "\\(2x^6\\)",
      "\\(4x^5\\)",
      "\\(2x^5\\)"
    ],
    "o_ar": [
      "\\(4x^6\\)",
      "\\(2x^6\\)",
      "\\(4x^5\\)",
      "\\(2x^5\\)"
    ],
    "a": 0,
    "ex": "Square both factors: \\(2^2=4\\) and \\((x^3)^2=x^6\\).",
    "ex_ar": "تربيع كلا العاملين: \\(2^2=4\\) و \\((x^3)^2=x^6\\)."
  },
  {
    "t": "cat",
    "ti": "Categorize: Simplified Exponent Value",
    "ti_ar": "تصنيف: ناتج تبسيط الأسس",
    "categories": [
      "\\(x^6\\)",
      "\\(x^8\\)",
      "\\(x^5\\)"
    ],
    "categories_ar": [
      "\\(x^6\\)",
      "\\(x^8\\)",
      "\\(x^5\\)"
    ],
    "items": [
      {
        "s": "\\(x^2\\cdot x^4\\)",
        "s_ar": "\\(x^2\\cdot x^4\\)",
        "cat": 0
      },
      {
        "s": "\\((x^3)^2\\)",
        "s_ar": "\\((x^3)^2\\)",
        "cat": 0
      },
      {
        "s": "\\(x^{10}/x^4\\)",
        "s_ar": "\\(x^{10}/x^4\\)",
        "cat": 0
      },
      {
        "s": "\\(x^3\\cdot x^5\\)",
        "s_ar": "\\(x^3\\cdot x^5\\)",
        "cat": 1
      },
      {
        "s": "\\((x^4)^2\\)",
        "s_ar": "\\((x^4)^2\\)",
        "cat": 1
      },
      {
        "s": "\\(x^{12}/x^4\\)",
        "s_ar": "\\(x^{12}/x^4\\)",
        "cat": 1
      },
      {
        "s": "\\(x^2\\cdot x^3\\)",
        "s_ar": "\\(x^2\\cdot x^3\\)",
        "cat": 2
      },
      {
        "s": "\\(x^9/x^4\\)",
        "s_ar": "\\(x^9/x^4\\)",
        "cat": 2
      }
    ],
    "ex": "Apply exponent laws to determine equivalence.",
    "ex_ar": "طبق قوانين الأسس لتحديد التكافؤ."
  },
  {
    "t": "num",
    "ti": "Numeric Entry: Fractional Exponent Value",
    "ti_ar": "إدخال رقمي: قيمة الأس الكسري",
    "q": "Evaluate \\(27^{4/3}\\).",
    "q_ar": "احسب قيمة \\(27^{4/3}\\).",
    "a": 81,
    "h": "Rewrite as \\((27^{1/3})^4 = 3^4\\).",
    "h_ar": "أعد الكتابة بالصيغة الجذرية: \\((27^{1/3})^4 = 3^4\\).",
    "sol": "\\(27^{4/3} = (\\sqrt[3]{27})^4 = 3^4 = 81\\).",
    "sol_ar": "\\(27^{4/3} = (\\sqrt[3]{27})^4 = 3^4 = 81\\)."
  },
  {
    "t": "ord",
    "ti": "Order the Steps: Simplifying Exponent Expressions",
    "ti_ar": "رتّب الخطوات: تبسيط المقادير الأسية",
    "prompt": "Arrange the steps to simplify \\(\\dfrac{(2x^3y^{-2})^3}{4x^4y^{-8}}\\):",
    "prompt_ar": "رتب خطوات تبسيط المقدار \\(\\dfrac{(2x^3y^{-2})^3}{4x^4y^{-8}}\\):",
    "items": [
      "Apply the outer power of 3 to each factor in the numerator: \\(\\dfrac{8x^9y^{-6}}{4x^4y^{-8}}\\).",
      "Divide the constant coefficients: \\(\\frac{8}{4} = 2\\).",
      "Apply the quotient rule to x: \\(x^{9 - 4} = x^5\\).",
      "Apply the quotient rule to y: \\(y^{-6 - (-8)} = y^2\\).",
      "Combine factors: \\(2x^5y^2\\)."
    ],
    "items_ar": [
      "تطبيق الأس الخارجي 3 على كل عامل في البسط: \\(\\dfrac{8x^9y^{-6}}{4x^4y^{-8}}\\).",
      "قسمة المعاملات العددية: \\(\\frac{8}{4} = 2\\).",
      "تطبيق قاعدة قسمة القوى على x: \\(x^{9 - 4} = x^5\\).",
      "تطبيق قاعدة قسمة القوى على y: \\(y^{-6 - (-8)} = y^2\\).",
      "تجميع العوامل: \\(2x^5y^2\\)."
    ],
    "ex": "Expand numerator powers, simplify coefficients, and subtract denominator exponents from numerator exponents.",
    "ex_ar": "فك أسس البسط، بسط المعاملات، واطرح أسس المقام من أسس البسط."
  },
  {
    "t": "se",
    "ti": "Spot the Error: Improper Rational Decomposition (Exponents &amp; Polynomials)",
    "q": "A student attempts to decompose \\(\\dfrac{x^2 + 4x + 2}{(x + 4)(x + 0)}\\) into partial fractions. Which step contains the first mathematical flaw?",
    "steps": [
      "Expand the denominator: \\((x + 4)(x + 0) = x^2 + 4x + 0\\).",
      "Write the partial fraction template directly as \\(\\dfrac{x^2 + 4x + 2}{(x + 4)(x + 0)} \\equiv \\dfrac{A}{x + 4} + \\dfrac{B}{x + 0}\\).",
      "Multiply both sides by \\((x + 4)(x + 0)\\) to get \\(x^2 + 4x + 2 = A(x + 0) + B(x + 4)\\).",
      "Substitute \\(x = -4\\) and \\(x = -0\\) to solve for \\(A\\) and \\(B\\)."
    ],
    "errorStep": 2,
    "reasons": [
      "Because \\(\\deg(\\text{numerator}) = \\deg(\\text{denominator}) = 2\\), the fraction is improper and requires a leading quotient constant \\(1 + \\dfrac{A}{x+4} + \\dfrac{B}{x+0}\\).",
      "Because the denominator has two distinct linear factors, it requires a quadratic numerator \\(Ax + B\\).",
      "Because polynomial multiplication is only valid when \\(x > 0\\)."
    ],
    "correctReason": 0,
    "h": "Compare the degree of the numerator (\\(2\\)) with the degree of the denominator (\\(2\\)).",
    "sol": "Because both numerator and denominator have degree 2, divide first: \\(\\dfrac{x^2 + 4x + 2}{x^2 + 4x + 0} = 1 + \\dfrac{2}{(x + 4)(x + 0)}\\).",
    "ti_ar": "اكتشف الخطأ: تفكيك الكسور الجبرية غير الفعلية (Exponents &amp; Polynomials)",
    "q_ar": "حاول طالب تفكيك الكسر \\(\\dfrac{x^2 + 4x + 2}{(x + 4)(x + 0)}\\) إلى كسور جزئية. أي خطوة تحتوي على الخطأ الرياضي الأول؟",
    "steps_ar": [
      "فك المقام: \\((x + 4)(x + 0) = x^2 + 4x + 0\\).",
      "كتابة قالب الكسور الجزئية مباشرةً: \\(\\dfrac{x^2 + 4x + 2}{(x + 4)(x + 0)} \\equiv \\dfrac{A}{x + 4} + \\dfrac{B}{x + 0}\\).",
      "ضرب الطرفين في المقام المشترك للحصول على \\(x^2 + 4x + 2 = A(x + 0) + B(x + 4)\\).",
      "التعويض عن \\(x = -4\\) و \\(x = -0\\) لإيجاد \\(A, B\\)."
    ],
    "reasons_ar": [
      "لأن درجة البسط تساوي درجة المقام (2)، فالكسر غير فعلي ويجب إضافة ثابت القسمة \\(1 + \\dfrac{A}{x+4} + \\dfrac{B}{x+0}\\).",
      "لأن المقام يتطلب بسطاً تربيعياً.",
      "لأن الضرب في المقام غير جائز جبرياً."
    ],
    "h_ar": "قارن بين درجة البسط (2) ودرجة المقام (2).",
    "sol_ar": "بما أن درجة البسط تساوي درجة المقام، نقسم أولاً فنحصل على \\(1 + \\dfrac{2}{(x + 4)(x + 0)}\\)."
  },
  {
    "t": "ms",
    "ti": "Examiner Mode: Remainder Theorem & Partial Fractions (Exponents &amp; Polynomials)",
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
    "ti_ar": "وضع المصحح: نظرية العوامل والكسور الجزئية (Exponents &amp; Polynomials)",
    "q_ar": "لتكن \\(P(x) = 2x^3 - 4x^2 + kx + 6\\). إذا كان \\((x - 2)\\) عاملاً لـ \\(P(x)\\): (أ) أثبت أن \\(k = -3\\). (ب) فكك \\(\\dfrac{3x + 1}{(x - 1)(x + 2)}\\) إلى كسور جزئية.",
    "examinerTip_ar": "تأكد دائماً من مساواة المقسوم عليه بالصفر \\(x - 2 = 0 \\implies x = 2\\) قبل التعويض في كثيرة الحدود."
  },
  {
    "t": "sb",
    "ti": "Step Builder: Remainder Theorem Evaluation (Exponents &amp; Polynomials)",
    "steps": [
      {
        "l": "To find the remainder when \\(f(x) = x^3 + 4x - 0\\) is divided by \\((x - 2)\\), set \\(x =\\)",
        "a": "2",
        "h": "Solve x - 2 = 0."
      },
      {
        "l": "Evaluate the cubic term \\(2^3 =\\)",
        "a": "8",
        "h": "Compute 2 * 2 * 2."
      },
      {
        "l": "Compute the exact remainder \\(f(2) = 8 + 8 - 0 =\\)",
        "a": "16",
        "h": "Add 8 + 8 and subtract 0."
      }
    ],
    "ti_ar": "بناء الخطوات: حساب الباقي بنظرية الباقي (Exponents &amp; Polynomials)",
    "steps_ar": [
      {
        "l": "لإيجاد باقي قسمة \\(f(x) = x^3 + 4x - 0\\) على \\((x - 2)\\)، نعوض عن \\(x =\\)",
        "a": "2",
        "h": "حل المعادلة x - 2 = 0."
      },
      {
        "l": "احسب الحد التكعيبي \\(2^3 =\\)",
        "a": "8",
        "h": "احسب 2 × 2 × 2."
      },
      {
        "l": "احسب الباقي \\(f(2) = 8 + 8 - 0 =\\)",
        "a": "16",
        "h": "اجمع 8 + 8 ثم اطرح 0."
      }
    ]
  },
  {
    "t": "mt",
    "ti": "Matching: Polynomial & Rational Structure (Exponents &amp; Polynomials)",
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
    "ti_ar": "مطابقة: كثيرات الحدود والكسور الجزئية (Exponents &amp; Polynomials)",
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
  }
];

D["ag-functions"] = [
  {
    "t": "sb",
    "ti": "Step Builder: Evaluate \\((f\\circ g)(3)\\), \\(f(x)=2x+1\\), \\(g(x)=x^2\\)",
    "ti_ar": "بناء الحل خطوة بخطوة: حساب \\((f\\circ g)(3)\\) حيث \\(f(x)=2x+1\\) و \\(g(x)=x^2\\)",
    "steps": [
      {
        "l": "Compute \\(g(3)=3^2=\\)",
        "l_ar": "احسب \\(g(3)=3^2=\\)",
        "a": "9",
        "h": "\\(9\\)",
        "h_ar": "\\(9\\)"
      },
      {
        "l": "Compute \\(f(9)=2(9)+1=\\)",
        "l_ar": "احسب \\(f(9)=2(9)+1=\\)",
        "a": "19",
        "h": "\\(18+1=19\\)",
        "h_ar": "\\(18+1=19\\)"
      }
    ]
  },
  {
    "t": "qc",
    "ti": "Quick Check: Function Transformations",
    "ti_ar": "فحص سريع: تحويلات الدوال الهندسية",
    "q": "How does the graph of \\(g(x) = f(x - 3) + 2\\) relate to the graph of \\(f(x)\\)?",
    "q_ar": "ما علاقة التمثيل البياني للدالة \\(g(x) = f(x - 3) + 2\\) بالتمثيل البياني للدالة \\(f(x)\\)؟",
    "o": [
      "Shifted 3 units right and 2 units up",
      "Shifted 3 units left and 2 units up",
      "Shifted 3 units right and 2 units down",
      "Shifted 3 units left and 2 units down"
    ],
    "o_ar": [
      "إزاحة 3 وحدات لليمين ووحدتان للأعلى",
      "إزاحة 3 وحدات لليسار ووحدتان للأعلى",
      "إزاحة 3 وحدات لليمين ووحدتان للأسفل",
      "إزاحة 3 وحدات لليسار ووحدتان للأسفل"
    ],
    "a": 0,
    "ex": "\\(f(x - h) + k\\) represents a horizontal shift by h and a vertical shift by k. Here h = +3 (right) and k = +2 (up).",
    "ex_ar": "\\(f(x - h) + k\\) تمثل إزاحة أفقية بمقدار h ورأسية بمقدار k. هنا h = +3 (لليمين) و k = +2 (للأعلى)."
  },
  {
    "t": "mt",
    "ti": "Matching: Function Foundations",
    "ti_ar": "مطابقة: أساسيات الدوال",
    "p": [
      {
        "l": "Domain",
        "l_ar": "المجال",
        "r": "Set of all allowable input values (x)",
        "r_ar": "مجموعة جميع قيم المدخلات الممكنة (x)"
      },
      {
        "l": "Range",
        "l_ar": "المدى",
        "r": "Set of all possible output values (y)",
        "r_ar": "مجموعة جميع قيم المخرجات الممكنة (y)"
      },
      {
        "l": "Vertical Line Test",
        "l_ar": "اختبار الخط الرأسي",
        "r": "Determines if a curve is a function",
        "r_ar": "يحدد ما إذا كان المنحنى يمثل دالة"
      },
      {
        "l": "Horizontal Line Test",
        "l_ar": "اختبار الخط الأفقي",
        "r": "Determines if a function is one-to-one (has an inverse)",
        "r_ar": "يحدد ما إذا كانت الدالة متباينة (لها دالة عكسية)"
      }
    ]
  },
  {
    "t": "num",
    "ti": "Numeric Entry: Composite Function",
    "ti_ar": "إدخال رقمي: الدالة المركبة",
    "q": "If \\(f(x) = 3x - 5\\) and \\(g(x) = 2x + 4\\), find the value of \\((f \\circ g)(3)\\).",
    "q_ar": "إذا كانت \\(f(x) = 3x - 5\\) و \\(g(x) = 2x + 4\\)، فأوجد قيمة \\((f \\circ g)(3)\\).",
    "a": 25,
    "h": "First find \\(g(3) = 2(3) + 4 = 10\\), then evaluate \\(f(10)\\).",
    "h_ar": "أوجد أولاً \\(g(3) = 2(3) + 4 = 10\\)، ثم احسب \\(f(10)\\).",
    "sol": "\\(g(3) = 10\\). Then \\(f(10) = 3(10) - 5 = 25\\).",
    "sol_ar": "\\(g(3) = 10\\). ثم \\(f(10) = 3(10) - 5 = 25\\)."
  },
  {
    "t": "ord",
    "ti": "Order the Steps: Finding an Inverse Function",
    "ti_ar": "رتّب الخطوات: إيجاد الدالة العكسية",
    "prompt": "Arrange the steps to find \\(f^{-1}(x)\\) for \\(f(x) = 4x - 7\\):",
    "prompt_ar": "رتب خطوات إيجاد \\(f^{-1}(x)\\) للدالة \\(f(x) = 4x - 7\\):",
    "items": [
      "Replace \\(f(x)\\) with \\(y\\): \\(y = 4x - 7\\).",
      "Swap variables \\(x\\) and \\(y\\): \\(x = 4y - 7\\).",
      "Add 7 to both sides: \\(x + 7 = 4y\\).",
      "Divide both sides by 4: \\(y = \\frac{x + 7}{4}\\).",
      "Write in inverse notation: \\(f^{-1}(x) = \\frac{x + 7}{4}\\)."
    ],
    "items_ar": [
      "استبدال \\(f(x)\\) بالمتغير \\(y\\): \\(y = 4x - 7\\).",
      "تبديل المتغيرين \\(x\\) و \\(y\\): \\(x = 4y - 7\\).",
      "إضافة 7 إلى كلا الطرفين: \\(x + 7 = 4y\\).",
      "قسمة كلا الطرفين على 4: \\(y = \\frac{x + 7}{4}\\).",
      "كتابة الناتج برمز الدالة العكسية: \\(f^{-1}(x) = \\frac{x + 7}{4}\\)."
    ],
    "ex": "Swap variables and isolate y to obtain the inverse function.",
    "ex_ar": "بدل المتغيرين x و y ثم اعزل y للحصول على الدالة العكسية."
  },
  {
    "t": "cat",
    "ti": "Categorize: Function Types by Algebraic Form",
    "ti_ar": "تصنيف: أنواع الدوال حسب شكلها الجبري",
    "categories": [
      "Linear Functions",
      "Quadratic Functions",
      "Rational Functions"
    ],
    "categories_ar": [
      "دوال خطية",
      "دوال تربيعية",
      "دوال نسبية"
    ],
    "items": [
      {
        "s": "\\(f(x) = 3x - 5\\)",
        "s_ar": "\\(f(x) = 3x - 5\\)",
        "cat": 0
      },
      {
        "s": "\\(f(x) = 2x^2 + 4x - 1\\)",
        "s_ar": "\\(f(x) = 2x^2 + 4x - 1\\)",
        "cat": 1
      },
      {
        "s": "\\(f(x) = \\dfrac{3}{x - 2}\\)",
        "s_ar": "\\(f(x) = \\dfrac{3}{x - 2}\\)",
        "cat": 2
      },
      {
        "s": "\\(f(x) = -\\frac{1}{2}x + 8\\)",
        "s_ar": "\\(f(x) = -\\frac{1}{2}x + 8\\)",
        "cat": 0
      },
      {
        "s": "\\(f(x) = (x - 3)^2 + 4\\)",
        "s_ar": "\\(f(x) = (x - 3)^2 + 4\\)",
        "cat": 1
      },
      {
        "s": "\\(f(x) = \\dfrac{2x + 1}{x^2 - 4}\\)",
        "s_ar": "\\(f(x) = \\dfrac{2x + 1}{x^2 - 4}\\)",
        "cat": 2
      }
    ],
    "ex": "Degree 1 is linear, degree 2 is quadratic, quotients of polynomials are rational.",
    "ex_ar": "الدرجة الأولى خطية، والدرجة الثانية تربيعية، وناتج قسمة كثيرات الحدود دالة نسبية."
  },
  {
    "t": "se",
    "ti": "Spot the Error: Algebraic & Domain Verification (Functions &amp; Transformations)",
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
    "ti_ar": "اكتشف الخطأ: الجذور الدخيلة والتحقق من المجال (Functions &amp; Transformations)",
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
    "ti": "Examiner Mode: Multi-Step Structured Problem (Functions &amp; Transformations)",
    "q": "Let \\(f(x) = x^2 - 6x + 9\\) for \\(x \\ge 3\\). (a) Express \\(f(x)\\) in completed-square vertex form and state the range of \\(f\\). (b) Find an expression for the inverse function \\(f^{-1}(x)\\) and state its domain.",
    "parts": [
      {
        "label": "Part (a) — Vertex Form & Range",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "Complete the square: \\(f(x) = (x - 3)^2 - 9 + 9 = (x - 3)^2 + 0\\)."
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
            "text": "Set \\(y = (x - 3)^2 + 0 \\implies (x - 3)^2 = y - 0\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "Select positive branch (since \\(x \\ge 3\\)): \\(f^{-1}(x) = 3 + \\sqrt{x - 0}\\)."
          },
          {
            "code": "B1",
            "marks": 1,
            "text": "State domain of \\(f^{-1}\\): \\(x \\ge 0\\) (matching the range of \\(f\\))."
          }
        ]
      }
    ],
    "examinerTip": "Writing \\(\\pm\\sqrt{x - 0}\\) for \\(f^{-1}(x)\\) loses the final A1 mark because a function must be single-valued; use the domain restriction \\(x \\ge 3\\) to choose the \\(+\\) sign.",
    "ti_ar": "وضع المصحح: إكمال المربع والدالة العكسية (Functions &amp; Transformations)",
    "q_ar": "لتكن \\(f(x) = x^2 - 6x + 9\\) حيث \\(x \\ge 3\\). (أ) اكتب \\(f(x)\\) في صورة المربع الكامل وحدد مداها. (ب) أوجد قاعدة الدالة العكسية \\(f^{-1}(x)\\) ومجالها.",
    "examinerTip_ar": "الدالة العكسية يجب أن تكون وحيدة القيمة، لذا نختار الإشارة الموجبة للجذر \\(3 + \\sqrt{x - 0}\\) لأن \\(x \\ge 3\\)."
  }
];

D["ag-exponential"] = [
  {
    "t": "sr",
    "ti": "Worked Example: Solve \\(3^{x+1}=81\\)",
    "ti_ar": "مثال محلول: حل المعادلة \\(3^{x+1}=81\\)",
    "steps": [
      "Write \\(81\\) as a power of \\(3\\): \\(81=3^4\\).",
      "Since the bases match, set the exponents equal: \\(x+1=4\\).",
      "Solve: \\(x=3\\)."
    ],
    "steps_ar": [
      "كتابة \\(81\\) كأس للعدد \\(3\\): \\(81=3^4\\).",
      "بما أن الأساسين متساويان، نساوي الأسين ببعضهما: \\(x+1=4\\).",
      "حل المعادلة: \\(x=3\\)."
    ]
  },
  {
    "t": "qc",
    "ti": "Quick Check: Logarithms",
    "ti_ar": "فحص سريع: اللوغاريتمات",
    "q": "Solve \\(\\log_2(x)=5\\)",
    "q_ar": "حل المعادلة \\(\\log_2(x)=5\\)",
    "o": [
      "\\(x=32\\)",
      "\\(x=10\\)",
      "\\(x=25\\)",
      "\\(x=16\\)"
    ],
    "o_ar": [
      "\\(x=32\\)",
      "\\(x=10\\)",
      "\\(x=25\\)",
      "\\(x=16\\)"
    ],
    "a": 0,
    "ex": "\\(\\log_2(x)=5\\) means \\(2^5=x\\), so \\(x=32\\).",
    "ex_ar": "\\(\\log_2(x)=5\\) تعني بالصيغة الأسية \\(2^5=x\\)، إذن \\(x=32\\)."
  },
  {
    "t": "num",
    "ti": "Numeric Entry: Solve Exponential Equation",
    "ti_ar": "إدخال رقمي: حل معادلة أسية",
    "q": "Solve for \\(x\\): \\(4^{2x - 1} = 64\\)",
    "q_ar": "حل المعادلة لإيجاد قيمة \\(x\\): \\(4^{2x - 1} = 64\\)",
    "a": 2,
    "h": "Write \\(64\\) as a power of \\(4\\): \\(64 = 4^3\\).",
    "h_ar": "اكتب \\(64\\) كأس للعدد \\(4\\): \\(64 = 4^3\\).",
    "sol": "\\(4^{2x - 1} = 4^3 \\implies 2x - 1 = 3 \\implies 2x = 4 \\implies x = 2\\).",
    "sol_ar": "\\(4^{2x - 1} = 4^3 \\implies 2x - 1 = 3 \\implies 2x = 4 \\implies x = 2\\)."
  },
  {
    "t": "ord",
    "ti": "Order the Steps: Solving Exponential with Common Bases",
    "ti_ar": "رتّب الخطوات: حل معادلة أسية بتوحيد الأساس",
    "prompt": "Arrange the steps to solve \\(27^{x - 1} = 9^{x + 2}\\):",
    "prompt_ar": "رتب خطوات حل المعادلة \\(27^{x - 1} = 9^{x + 2}\\):",
    "items": [
      "Express both sides as powers of 3: \\((3^3)^{x - 1} = (3^2)^{x + 2}\\).",
      "Multiply exponents: \\(3^{3(x - 1)} = 3^{2(x + 2)}\\).",
      "Equate the exponents: \\(3x - 3 = 2x + 4\\).",
      "Subtract \\(2x\\) from both sides: \\(x - 3 = 4\\).",
      "Add 3 to isolate \\(x\\): \\(x = 7\\)."
    ],
    "items_ar": [
      "كتابة كلا الطرفين كأس للأساس 3: \\((3^3)^{x - 1} = (3^2)^{x + 2}\\).",
      "ضرب الأسس: \\(3^{3(x - 1)} = 3^{2(x + 2)}\\).",
      "مساواة الأسين: \\(3x - 3 = 2x + 4\\).",
      "طرح \\(2x\\) من كلا الطرفين: \\(x - 3 = 4\\).",
      "إضافة 3 لعزل \\(x\\): \\(x = 7\\)."
    ],
    "ex": "Convert both sides to powers of the same base, multiply exponents, and solve the resulting linear equation.",
    "ex_ar": "حوّل كلا الطرفين لقوى الأساس نفسه، واضرب الأسس، ثم حل المعادلة الخطية الناتجة."
  },
  {
    "t": "cat",
    "ti": "Categorize: Growth and Decay Models",
    "ti_ar": "تصنيف: نماذج النمو والاضمحلال",
    "categories": [
      "Exponential Growth (b > 1)",
      "Exponential Decay (0 < b < 1)",
      "Linear Growth"
    ],
    "categories_ar": [
      "نمو أسي (b > 1)",
      "اضمحلال أسي (0 < b < 1)",
      "نمو خطي"
    ],
    "items": [
      {
        "s": "\\(f(x) = 500(1.05)^x\\)",
        "s_ar": "\\(f(x) = 500(1.05)^x\\)",
        "cat": 0
      },
      {
        "s": "\\(f(x) = 1200(0.85)^x\\)",
        "s_ar": "\\(f(x) = 1200(0.85)^x\\)",
        "cat": 1
      },
      {
        "s": "A bank account earning 6% interest compounded annually",
        "s_ar": "حساب بنكي يربح فائدة مركبة سنوية بنسبة 6%",
        "cat": 0
      },
      {
        "s": "A prescription drug with a 4-hour half-life",
        "s_ar": "دواء طبي له عمر نصف مقداره 4 ساعات",
        "cat": 1
      },
      {
        "s": "Saving an additional $50 in a piggy bank each month",
        "s_ar": "ادخار 50 دولاراً إضافية في حصالة كل شهر",
        "cat": 2
      },
      {
        "s": "\\(f(x) = 50x + 200\\)",
        "s_ar": "\\(f(x) = 50x + 200\\)",
        "cat": 2
      }
    ],
    "ex": "Multiplier greater than 1 yields exponential growth; multiplier between 0 and 1 yields exponential decay; constant difference yields linear growth.",
    "ex_ar": "عامل الضرب الأكبر من 1 يعطي نمواً أسياً؛ وعامل الضرب بين 0 و 1 يعطي اضمحلالاً أسياً؛ والفرق الثابت يعطي نمواً خطياً."
  },
  {
    "t": "se",
    "ti": "Spot the Error: Algebraic & Domain Verification (Exponential &amp; Logarithmic Functions)",
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
    "ti_ar": "اكتشف الخطأ: الجذور الدخيلة والتحقق من المجال (Exponential &amp; Logarithmic Functions)",
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
    "ti": "Examiner Mode: Multi-Step Structured Problem (Exponential &amp; Logarithmic Functions)",
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
    "ti_ar": "وضع المصحح: إكمال المربع والدالة العكسية (Exponential &amp; Logarithmic Functions)",
    "q_ar": "لتكن \\(f(x) = x^2 - 6x + 12\\) حيث \\(x \\ge 3\\). (أ) اكتب \\(f(x)\\) في صورة المربع الكامل وحدد مداها. (ب) أوجد قاعدة الدالة العكسية \\(f^{-1}(x)\\) ومجالها.",
    "examinerTip_ar": "الدالة العكسية يجب أن تكون وحيدة القيمة، لذا نختار الإشارة الموجبة للجذر \\(3 + \\sqrt{x - 3}\\) لأن \\(x \\ge 3\\)."
  },
  {
    "t": "sb",
    "ti": "Step Builder: Completing the Square & Vertex Analysis (Exponential &amp; Logarithmic Functions)",
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
        "h": "Compute (2)^2 + 3."
      }
    ],
    "ti_ar": "بناء الخطوات: إكمال المربع وإيجاد القيمة الصغرى (Exponential &amp; Logarithmic Functions)",
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
        "h": "احسب 4 + 3."
      }
    ]
  },
  {
    "t": "mt",
    "ti": "Matching: Core Algebraic & Analytic Principles (Exponential &amp; Logarithmic Functions)",
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
    "ti_ar": "مطابقة: المبادئ الجبرية والتحليلية الأساسية (Exponential &amp; Logarithmic Functions)",
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

D["ag-systems"] = [
  {
    "t": "sr",
    "ti": "Worked Example: Solve the System \\(y=2x+1\\), \\(3x+y=11\\)",
    "ti_ar": "مثال محلول: حل النظام \\(y=2x+1\\)، \\(3x+y=11\\)",
    "steps": [
      "Substitute the first equation into the second: \\(3x+(2x+1)=11\\).",
      "Combine like terms: \\(5x+1=11\\).",
      "Solve for \\(x\\): \\(5x=10\\Rightarrow x=2\\).",
      "Back-substitute: \\(y=2(2)+1=5\\). Solution: \\((2,5)\\)."
    ],
    "steps_ar": [
      "التعويض بالمعادلة الأولى في المعادلة الثانية: \\(3x+(2x+1)=11\\).",
      "تجميع الحدود المتشابهة: \\(5x+1=11\\).",
      "حل المعادلة لإيجاد \\(x\\): \\(5x=10\\Rightarrow x=2\\).",
      "التعويض العكسي: \\(y=2(2)+1=5\\). الحل هو: \\((2,5)\\)."
    ]
  },
  {
    "t": "qc",
    "ti": "Quick Check: Linear Inequalities",
    "ti_ar": "فحص سريع: المتباينات الخطية",
    "q": "Which point satisfies \\(y>x+1\\)?",
    "q_ar": "أي نقطة تحقق المتباينة \\(y>x+1\\)؟",
    "o": [
      "\\((0,0)\\)",
      "\\((3,5)\\)",
      "\\((1,1)\\)",
      "\\((2,2)\\)"
    ],
    "o_ar": [
      "\\((0,0)\\)",
      "\\((3,5)\\)",
      "\\((1,1)\\)",
      "\\((2,2)\\)"
    ],
    "a": 1,
    "ex": "At \\((3,5)\\): \\(5>3+1=4\\) ✓. The others all fail.",
    "ex_ar": "عند النقطة \\((3,5)\\): \\(5>3+1=4\\) ✓ (صحيحة)، بينما تفشل النقاط الأخرى."
  },
  {
    "t": "ord",
    "ti": "Order the Steps: Solving by Substitution",
    "ti_ar": "رتّب الخطوات: الحل بطريقة التعويض",
    "prompt": "Arrange the steps to solve the system \\(y = 3x - 1\\) and \\(2x + y = 14\\):",
    "prompt_ar": "رتب خطوات حل نظام المعادلتين \\(y = 3x - 1\\) و \\(2x + y = 14\\):",
    "items": [
      "Substitute \\(3x - 1\\) for \\(y\\) in the second equation: \\(2x + (3x - 1) = 14\\)",
      "Combine like terms on the left: \\(5x - 1 = 14\\)",
      "Add 1 to both sides: \\(5x = 15\\)",
      "Divide both sides by 5: \\(x = 3\\)",
      "Back-substitute \\(x = 3\\) into the first equation: \\(y = 3(3) - 1 = 8\\)"
    ],
    "items_ar": [
      "التعويض عن \\(y\\) بـ \\(3x - 1\\) في المعادلة الثانية: \\(2x + (3x - 1) = 14\\)",
      "تجميع الحدود المتشابهة في الطرف الأيسر: \\(5x - 1 = 14\\)",
      "إضافة 1 إلى كلا الطرفين: \\(5x = 15\\)",
      "قسمة كلا الطرفين على 5: \\(x = 3\\)",
      "التعويض العكسي عن \\(x = 3\\) في المعادلة الأولى: \\(y = 3(3) - 1 = 8\\)"
    ],
    "ex": "Substitute the isolated expression, combine like terms, solve for the first variable, and back-substitute.",
    "ex_ar": "عوض بالمقدار المعزول، جمّع الحدود المتشابهة، حل للمتغير الأول، ثم عوض عكسياً."
  },
  {
    "t": "num",
    "ti": "Numeric Entry: Linear System Solution",
    "ti_ar": "إدخال رقمي: حل نظام معادلتين خطيتين",
    "q": "Solve the system \\(3x + 2y = 19\\) and \\(y = 2x - 1\\). What is the value of \\(x\\)?",
    "q_ar": "حل النظام \\(3x + 2y = 19\\) و \\(y = 2x - 1\\). ما قيمة \\(x\\)؟",
    "a": 3,
    "h": "Substitute \\(y = 2x - 1\\) into the first equation: \\(3x + 2(2x - 1) = 19\\).",
    "h_ar": "عوض عن \\(y = 2x - 1\\) في المعادلة الأولى: \\(3x + 2(2x - 1) = 19\\).",
    "sol": "\\(3x + 4x - 2 = 19 \\implies 7x = 21 \\implies x = 3\\).",
    "sol_ar": "\\(3x + 4x - 2 = 19 \\implies 7x = 21 \\implies x = 3\\)."
  },
  {
    "t": "cat",
    "ti": "Categorize: Linear System Types",
    "ti_ar": "تصنيف: أنواع أنظمة المعادلات الخطية",
    "categories": [
      "One Solution (Intersecting)",
      "No Solution (Parallel)",
      "Infinitely Many (Coincident)"
    ],
    "categories_ar": [
      "حل وحيد (متقاطعان)",
      "لا يوجد حل (متوازيان)",
      "عدد لا نهائي من الحلول (منطبقان)"
    ],
    "items": [
      {
        "s": "\\(y = 2x + 3\\) and \\(y = 2x - 5\\)",
        "s_ar": "\\(y = 2x + 3\\) و \\(y = 2x - 5\\)",
        "cat": 1
      },
      {
        "s": "\\(x + y = 4\\) and \\(2x + 2y = 8\\)",
        "s_ar": "\\(x + y = 4\\) و \\(2x + 2y = 8\\)",
        "cat": 2
      },
      {
        "s": "\\(y = x + 1\\) and \\(y = -x + 5\\)",
        "s_ar": "\\(y = x + 1\\) و \\(y = -x + 5\\)",
        "cat": 0
      },
      {
        "s": "Lines with different slopes",
        "s_ar": "مستقيمان لهما ميلان مختلفان",
        "cat": 0
      },
      {
        "s": "Lines with same slope and different intercepts",
        "s_ar": "مستقيمان لهما نفس الميل ومقطعان صاديان مختلفان",
        "cat": 1
      },
      {
        "s": "Multiples of the same linear equation",
        "s_ar": "مضاعفات للمعادلة الخطية نفسها",
        "cat": 2
      }
    ],
    "ex": "Different slopes intersect once; parallel lines never intersect; coincident lines overlap completely.",
    "ex_ar": "الميول المختلفة تتقاطع في نقطة واحدة؛ والمستقيمات المتوازية لا تتقاطع أبداً؛ والمستقيمات المنطبقة تشترك في جميع النقاط."
  },
  {
    "t": "se",
    "ti": "Spot the Error: Algebraic & Domain Verification (Systems &amp; Inequalities)",
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
    "ti_ar": "اكتشف الخطأ: الجذور الدخيلة والتحقق من المجال (Systems &amp; Inequalities)",
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
    "ti": "Examiner Mode: Multi-Step Structured Problem (Systems &amp; Inequalities)",
    "q": "Let \\(f(x) = x^2 - 8x + 18\\) for \\(x \\ge 4\\). (a) Express \\(f(x)\\) in completed-square vertex form and state the range of \\(f\\). (b) Find an expression for the inverse function \\(f^{-1}(x)\\) and state its domain.",
    "parts": [
      {
        "label": "Part (a) — Vertex Form & Range",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "Complete the square: \\(f(x) = (x - 4)^2 - 16 + 18 = (x - 4)^2 + 2\\)."
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
            "text": "Set \\(y = (x - 4)^2 + 2 \\implies (x - 4)^2 = y - 2\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "Select positive branch (since \\(x \\ge 4\\)): \\(f^{-1}(x) = 4 + \\sqrt{x - 2}\\)."
          },
          {
            "code": "B1",
            "marks": 1,
            "text": "State domain of \\(f^{-1}\\): \\(x \\ge 2\\) (matching the range of \\(f\\))."
          }
        ]
      }
    ],
    "examinerTip": "Writing \\(\\pm\\sqrt{x - 2}\\) for \\(f^{-1}(x)\\) loses the final A1 mark because a function must be single-valued; use the domain restriction \\(x \\ge 4\\) to choose the \\(+\\) sign.",
    "ti_ar": "وضع المصحح: إكمال المربع والدالة العكسية (Systems &amp; Inequalities)",
    "q_ar": "لتكن \\(f(x) = x^2 - 8x + 18\\) حيث \\(x \\ge 4\\). (أ) اكتب \\(f(x)\\) في صورة المربع الكامل وحدد مداها. (ب) أوجد قاعدة الدالة العكسية \\(f^{-1}(x)\\) ومجالها.",
    "examinerTip_ar": "الدالة العكسية يجب أن تكون وحيدة القيمة، لذا نختار الإشارة الموجبة للجذر \\(4 + \\sqrt{x - 2}\\) لأن \\(x \\ge 4\\)."
  },
  {
    "t": "sb",
    "ti": "Step Builder: Completing the Square & Vertex Analysis (Systems &amp; Inequalities)",
    "steps": [
      {
        "l": "In \\(y = x^2 - 8x + 18\\), halve the \\(x\\)-coefficient to write \\((x - h)^2\\) where \\(h =\\)",
        "a": "4",
        "h": "Take half of 8."
      },
      {
        "l": "Compute the minimum value \\(k = 18 - 4^2 =\\)",
        "a": "2",
        "h": "Subtract 16 from 18."
      },
      {
        "l": "Evaluate \\(y\\) when \\(x = 6\\): \\(y =\\)",
        "a": "6",
        "h": "Compute (2)^2 + 2."
      }
    ],
    "ti_ar": "بناء الخطوات: إكمال المربع وإيجاد القيمة الصغرى (Systems &amp; Inequalities)",
    "steps_ar": [
      {
        "l": "في الدالة \\(y = x^2 - 8x + 18\\): قيمة \\(h\\) في \\((x - h)^2\\) تساوي:",
        "a": "4",
        "h": "اقسم معامل x وهو 8 على 2."
      },
      {
        "l": "احسب القيمة الصغرى \\(k = 18 - 4^2 =\\)",
        "a": "2",
        "h": "اطرح 16 من 18."
      },
      {
        "l": "احسب قيمة \\(y\\) عندما \\(x = 6\\):",
        "a": "6",
        "h": "احسب 4 + 2."
      }
    ]
  },
  {
    "t": "mt",
    "ti": "Matching: Core Algebraic & Analytic Principles (Systems &amp; Inequalities)",
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
    "ti_ar": "مطابقة: المبادئ الجبرية والتحليلية الأساسية (Systems &amp; Inequalities)",
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

D["ag-sequences"] = [
  {
    "t": "fn",
    "ti": "Explorer: Geometric Growth \\(a\\cdot r^{\\,x}\\)",
    "ti_ar": "مستكشف: النمو الهندسي \\(a\\cdot r^{\\,x}\\)",
    "fns": [
      {
        "expr": "2*r^x",
        "color": "#1E3A6E",
        "label": "2·r^x"
      }
    ],
    "xrange": [
      0,
      5
    ],
    "yrange": [
      0,
      20
    ],
    "params": [
      {
        "name": "r",
        "label": "Ratio r",
        "min": 0.5,
        "max": 2,
        "step": 0.1,
        "default": 1.5
      }
    ]
  },
  {
    "t": "sr",
    "ti": "Worked Example: 12th Term of \\(4,9,14,19,\\ldots\\)",
    "ti_ar": "مثال محلول: الحد الثاني عشر للمتتابعة \\(4,9,14,19,\\ldots\\)",
    "steps": [
      "Identify \\(a_1=4\\) and the common difference \\(d=9-4=5\\).",
      "Use the formula \\(a_n=a_1+(n-1)d\\).",
      "Substitute \\(n=12\\): \\(a_{12}=4+(12-1)(5)=4+55=59\\)."
    ],
    "steps_ar": [
      "تحديد الحد الأول \\(a_1=4\\) والفرق المشترك (أساس المتتابعة) \\(d=9-4=5\\).",
      "استخدام قانون الحد العام للمتتابعة الحسابية: \\(a_n=a_1+(n-1)d\\).",
      "التعويض بـ \\(n=12\\): \\(a_{12}=4+(12-1)(5)=4+55=59\\)."
    ]
  },
  {
    "t": "qc",
    "ti": "Quick Check: Geometric Series",
    "ti_ar": "فحص سريع: المتسلسلات الهندسية",
    "q": "Find the sum of the first 5 terms of \\(2,4,8,16,\\ldots\\)",
    "q_ar": "أوجد مجموع أول 5 حدود من المتتابعة \\(2,4,8,16,\\ldots\\)",
    "o": [
      "62",
      "30",
      "31",
      "60"
    ],
    "o_ar": [
      "62",
      "30",
      "31",
      "60"
    ],
    "a": 0,
    "ex": "\\(S_5=\\dfrac{a(r^n-1)}{r-1}=\\dfrac{2(2^5-1)}{2-1}=62\\).",
    "ex_ar": "\\(S_5=\\dfrac{a(r^n-1)}{r-1}=\\dfrac{2(2^5-1)}{2-1}=62\\)."
  },
  {
    "t": "num",
    "ti": "Numeric Entry: Arithmetic Series Sum",
    "ti_ar": "إدخال رقمي: مجموع متسلسلة حسابية",
    "q": "Find the sum of the first 10 terms of the arithmetic sequence with \\(a_1 = 5\\) and \\(d = 3\\).",
    "q_ar": "أوجد مجموع أول 10 حدود من المتتابعة الحسابية التي فيها \\(a_1 = 5\\) و \\(d = 3\\).",
    "a": 185,
    "h": "First calculate \\(a_{10} = 5 + 9(3) = 32\\), then use \\(S_{10} = \\frac{10}{2}(a_1 + a_{10})\\).",
    "h_ar": "احسب أولاً \\(a_{10} = 5 + 9(3) = 32\\)، ثم طبق \\(S_{10} = \\frac{10}{2}(a_1 + a_{10})\\).",
    "sol": "\\(a_{10} = 5 + 27 = 32\\). Then \\(S_{10} = 5(5 + 32) = 5(37) = 185\\).",
    "sol_ar": "\\(a_{10} = 5 + 27 = 32\\). إذن \\(S_{10} = 5(5 + 32) = 5(37) = 185\\)."
  },
  {
    "t": "ord",
    "ti": "Order the Steps: Arithmetic Series Sum",
    "ti_ar": "رتّب الخطوات: حساب مجموع متسلسلة حسابية",
    "prompt": "Arrange the steps to find the sum of \\(3 + 7 + 11 + \\cdots + 79\\):",
    "prompt_ar": "رتب خطوات إيجاد مجموع المتسلسلة \\(3 + 7 + 11 + \\cdots + 79\\):",
    "items": [
      "Identify the first term \\(a_1 = 3\\) and common difference \\(d = 4\\).",
      "Set up term formula to find n: \\(79 = 3 + (n - 1)4\\).",
      "Solve for n: \\(76 = (n - 1)4 \\implies n - 1 = 19 \\implies n = 20\\).",
      "Apply the arithmetic series formula: \\(S_{20} = \\frac{20}{2}(3 + 79)\\).",
      "Evaluate: \\(S_{20} = 10(82) = 820\\)."
    ],
    "items_ar": [
      "تحديد الحد الأول \\(a_1 = 3\\) وأساس المتتابعة \\(d = 4\\).",
      "كتابة معادلة الحد العام لإيجاد n: \\(79 = 3 + (n - 1)4\\).",
      "حل المعادلة لإيجاد n: \\(76 = (n - 1)4 \\implies n - 1 = 19 \\implies n = 20\\).",
      "تطبيق قانون مجموع المتسلسلة الحسابية: \\(S_{20} = \\frac{20}{2}(3 + 79)\\).",
      "حساب الناتج النهائي: \\(S_{20} = 10(82) = 820\\)."
    ],
    "ex": "Determine the number of terms n, then apply S_n = (n/2)(a_1 + a_n).",
    "ex_ar": "حدد عدد الحدود n، ثم طبق القانون S_n = (n/2)(a_1 + a_n)."
  },
  {
    "t": "cat",
    "ti": "Categorize: Sequence Types",
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
        "s": "\\(5, 8, 11, 14, \\ldots\\)",
        "s_ar": "\\(5, 8, 11, 14, \\ldots\\)",
        "cat": 0
      },
      {
        "s": "\\(3, 6, 12, 24, \\ldots\\)",
        "s_ar": "\\(3, 6, 12, 24, \\ldots\\)",
        "cat": 1
      },
      {
        "s": "\\(1, 1, 2, 3, 5, 8, \\ldots\\)",
        "s_ar": "\\(1, 1, 2, 3, 5, 8, \\ldots\\)",
        "cat": 2
      },
      {
        "s": "Terms differ by constant difference d = 6",
        "s_ar": "الحدود تختلف بمقدار ثابت d = 6",
        "cat": 0
      },
      {
        "s": "Terms multiplied by constant ratio r = 0.5",
        "s_ar": "الحدود تتضاعف بنسبة ثابتة r = 0.5",
        "cat": 1
      },
      {
        "s": "\\(1, 4, 9, 16, 25, \\ldots\\)",
        "s_ar": "\\(1, 4, 9, 16, 25, \\ldots\\)",
        "cat": 2
      }
    ],
    "ex": "Constant difference is arithmetic; constant ratio is geometric; squares and Fibonacci are neither.",
    "ex_ar": "الفرق الثابت حسابية؛ والنسبة الثابتة هندسية؛ ومربعات الأعداد ومتتالية فيبوناتشي ليست أياً منهما."
  },
  {
    "t": "se",
    "ti": "Spot the Error: Algebraic & Domain Verification (Sequences &amp; Series)",
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
    "ti_ar": "اكتشف الخطأ: الجذور الدخيلة والتحقق من المجال (Sequences &amp; Series)",
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
    "ti": "Examiner Mode: Multi-Step Structured Problem (Sequences &amp; Series)",
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
    "ti_ar": "وضع المصحح: إكمال المربع والدالة العكسية (Sequences &amp; Series)",
    "q_ar": "لتكن \\(f(x) = x^2 - 4x + 7\\) حيث \\(x \\ge 2\\). (أ) اكتب \\(f(x)\\) في صورة المربع الكامل وحدد مداها. (ب) أوجد قاعدة الدالة العكسية \\(f^{-1}(x)\\) ومجالها.",
    "examinerTip_ar": "الدالة العكسية يجب أن تكون وحيدة القيمة، لذا نختار الإشارة الموجبة للجذر \\(2 + \\sqrt{x - 3}\\) لأن \\(x \\ge 2\\)."
  },
  {
    "t": "sb",
    "ti": "Step Builder: Completing the Square & Vertex Analysis (Sequences &amp; Series)",
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
        "h": "Compute (2)^2 + 3."
      }
    ],
    "ti_ar": "بناء الخطوات: إكمال المربع وإيجاد القيمة الصغرى (Sequences &amp; Series)",
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
        "h": "احسب 4 + 3."
      }
    ]
  },
  {
    "t": "mt",
    "ti": "Matching: Core Algebraic & Analytic Principles (Sequences &amp; Series)",
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
    "ti_ar": "مطابقة: المبادئ الجبرية والتحليلية الأساسية (Sequences &amp; Series)",
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

D["ag-factoring"] = [
  {
    "t": "fn",
    "ti": "Explorer: Roots and Factors \\((x-a)(x-2)\\)",
    "ti_ar": "مستكشف: الجذور والعوامل \\((x-a)(x-2)\\)",
    "fns": [
      {
        "expr": "(x-a)*(x-2)",
        "color": "#1E3A6E",
        "label": "(x-a)(x-2)"
      }
    ],
    "xrange": [
      -5,
      5
    ],
    "yrange": [
      -10,
      10
    ],
    "params": [
      {
        "name": "a",
        "label": "Root a",
        "min": -4,
        "max": 4,
        "step": 1,
        "default": 1
      }
    ]
  },
  {
    "t": "sr",
    "ti": "Worked Example: Factor \\(x^3+3x^2+2x+6\\) by Grouping",
    "ti_ar": "مثال محلول: تحليل \\(x^3+3x^2+2x+6\\) بالتجميع",
    "steps": [
      "Group terms in pairs: \\((x^3+3x^2)+(2x+6)\\).",
      "Factor each group: \\(x^2(x+3)+2(x+3)\\).",
      "Factor out the common binomial \\((x+3)\\): \\((x+3)(x^2+2)\\)."
    ],
    "steps_ar": [
      "تجميع الحدود في أزواج: \\((x^3+3x^2)+(2x+6)\\).",
      "إخراج العامل المشترك الأكبر من كل مجموعة: \\(x^2(x+3)+2(x+3)\\).",
      "إخراج ثنائية الحد المشتركة \\((x+3)\\): \\((x+3)(x^2+2)\\)."
    ]
  },
  {
    "t": "qc",
    "ti": "Quick Check: Difference of Squares",
    "ti_ar": "فحص سريع: الفرق بين مربعين",
    "q": "Factor \\(x^2-16\\)",
    "q_ar": "حلل إلى عوامل: \\(x^2-16\\)",
    "o": [
      "\\((x-4)(x+4)\\)",
      "\\((x-8)(x+2)\\)",
      "\\((x-4)^2\\)",
      "\\((x+4)^2\\)"
    ],
    "o_ar": [
      "\\((x-4)(x+4)\\)",
      "\\((x-8)(x+2)\\)",
      "\\((x-4)^2\\)",
      "\\((x+4)^2\\)"
    ],
    "a": 0,
    "ex": "Difference of squares: \\(x^2-16=(x-4)(x+4)\\).",
    "ex_ar": "الفرق بين مربعين: \\(x^2-16=(x-4)(x+4)\\)."
  },
  {
    "t": "ord",
    "ti": "Order the Steps: Factor by Grouping",
    "ti_ar": "رتّب الخطوات: التحليل بالتجميع",
    "prompt": "Arrange the steps to factor \\(2x^3 + 6x^2 + 5x + 15\\):",
    "prompt_ar": "رتب خطوات تحليل المقدار \\(2x^3 + 6x^2 + 5x + 15\\):",
    "items": [
      "Group into two binomial pairs: \\((2x^3 + 6x^2) + (5x + 15)\\)",
      "Factor out the GCF from each group: \\(2x^2(x + 3) + 5(x + 3)\\)",
      "Identify the common binomial factor: \\((x + 3)\\)",
      "Factor out \\((x + 3)\\) to complete: \\((x + 3)(2x^2 + 5)\\)"
    ],
    "items_ar": [
      "تجميع الحدود في زوجين من ثنائيات الحدود: \\((2x^3 + 6x^2) + (5x + 15)\\)",
      "إخراج العامل المشترك الأكبر من كل مجموعة: \\(2x^2(x + 3) + 5(x + 3)\\)",
      "تحديد العامل المشترك ثنائي الحد: \\((x + 3)\\)",
      "إخراج \\((x + 3)\\) كعامل مشترك لإتمام التحليل: \\((x + 3)(2x^2 + 5)\\)"
    ],
    "ex": "Group pairs, factor GCF from each, factor out the common binomial.",
    "ex_ar": "جمّع في أزواج، وأخرج العامل المشترك من كل زوج، ثم أخرج ثنائية الحد المشتركة."
  },
  {
    "t": "num",
    "ti": "Numeric Entry: Perfect Square Trinomial Constant",
    "ti_ar": "إدخال رقمي: معامل ثلاثي الحدود المربع الكامل",
    "q": "If \\(x^2 - kx + 36\\) is a perfect square trinomial with \\(k > 0\\), what is the value of \\(k\\)?",
    "q_ar": "إذا كان المقدار \\(x^2 - kx + 36\\) يمثل ثلاثي حدود مربعاً كاملاً مع \\(k > 0\\)، فما قيمة \\(k\\)؟",
    "a": 12,
    "h": "For \\(x^2 - 2ax + a^2\\), \\(a = \\sqrt{36} = 6\\), so \\(k = 2(6)\\).",
    "h_ar": "للمقدار \\(x^2 - 2ax + a^2\\)، يكون \\(a = \\sqrt{36} = 6\\)، وبالتالي \\(k = 2(6)\\).",
    "sol": "\\(k = 2\\sqrt{36} = 2(6) = 12\\).",
    "sol_ar": "\\(k = 2\\sqrt{36} = 2(6) = 12\\)."
  },
  {
    "t": "cat",
    "ti": "Categorize: Factoring Strategies",
    "ti_ar": "تصنيف: استراتيجيات التحليل إلى عوامل",
    "categories": [
      "Difference of Squares",
      "Greatest Common Factor (GCF)",
      "Trinomial Factoring"
    ],
    "categories_ar": [
      "الفرق بين مربعين",
      "العامل المشترك الأكبر (GCF)",
      "تحليل ثلاثي الحدود"
    ],
    "items": [
      {
        "s": "\\(x^2 - 49\\)",
        "s_ar": "\\(x^2 - 49\\)",
        "cat": 0
      },
      {
        "s": "\\(6x^3 + 15x^2\\)",
        "s_ar": "\\(6x^3 + 15x^2\\)",
        "cat": 1
      },
      {
        "s": "\\(x^2 - 7x + 12\\)",
        "s_ar": "\\(x^2 - 7x + 12\\)",
        "cat": 2
      },
      {
        "s": "\\(4x^2 - 81\\)",
        "s_ar": "\\(4x^2 - 81\\)",
        "cat": 0
      },
      {
        "s": "\\(8x^2y - 12xy^2\\)",
        "s_ar": "\\(8x^2y - 12xy^2\\)",
        "cat": 1
      },
      {
        "s": "\\(2x^2 + 7x + 3\\)",
        "s_ar": "\\(2x^2 + 7x + 3\\)",
        "cat": 2
      }
    ],
    "ex": "Difference of squares has two terms with opposite signs; GCF extracts shared factors; trinomials factor into product of binomials.",
    "ex_ar": "الفرق بين مربعين يتكون من حدين بينهما إشارة سالبة؛ والعامل المشترك الأكبر يستخرج العوامل المشتركة؛ وثلاثي الحدود يحلل لحاصل ضرب ثنائيتي حد."
  },
  {
    "t": "se",
    "ti": "Spot the Error: Improper Rational Decomposition (Factoring Polynomials)",
    "q": "A student attempts to decompose \\(\\dfrac{x^2 + 6x + 7}{(x + 5)(x + 1)}\\) into partial fractions. Which step contains the first mathematical flaw?",
    "steps": [
      "Expand the denominator: \\((x + 5)(x + 1) = x^2 + 6x + 5\\).",
      "Write the partial fraction template directly as \\(\\dfrac{x^2 + 6x + 7}{(x + 5)(x + 1)} \\equiv \\dfrac{A}{x + 5} + \\dfrac{B}{x + 1}\\).",
      "Multiply both sides by \\((x + 5)(x + 1)\\) to get \\(x^2 + 6x + 7 = A(x + 1) + B(x + 5)\\).",
      "Substitute \\(x = -5\\) and \\(x = -1\\) to solve for \\(A\\) and \\(B\\)."
    ],
    "errorStep": 2,
    "reasons": [
      "Because \\(\\deg(\\text{numerator}) = \\deg(\\text{denominator}) = 2\\), the fraction is improper and requires a leading quotient constant \\(1 + \\dfrac{A}{x+5} + \\dfrac{B}{x+1}\\).",
      "Because the denominator has two distinct linear factors, it requires a quadratic numerator \\(Ax + B\\).",
      "Because polynomial multiplication is only valid when \\(x > 0\\)."
    ],
    "correctReason": 0,
    "h": "Compare the degree of the numerator (\\(2\\)) with the degree of the denominator (\\(2\\)).",
    "sol": "Because both numerator and denominator have degree 2, divide first: \\(\\dfrac{x^2 + 6x + 7}{x^2 + 6x + 5} = 1 + \\dfrac{2}{(x + 5)(x + 1)}\\).",
    "ti_ar": "اكتشف الخطأ: تفكيك الكسور الجبرية غير الفعلية (Factoring Polynomials)",
    "q_ar": "حاول طالب تفكيك الكسر \\(\\dfrac{x^2 + 6x + 7}{(x + 5)(x + 1)}\\) إلى كسور جزئية. أي خطوة تحتوي على الخطأ الرياضي الأول؟",
    "steps_ar": [
      "فك المقام: \\((x + 5)(x + 1) = x^2 + 6x + 5\\).",
      "كتابة قالب الكسور الجزئية مباشرةً: \\(\\dfrac{x^2 + 6x + 7}{(x + 5)(x + 1)} \\equiv \\dfrac{A}{x + 5} + \\dfrac{B}{x + 1}\\).",
      "ضرب الطرفين في المقام المشترك للحصول على \\(x^2 + 6x + 7 = A(x + 1) + B(x + 5)\\).",
      "التعويض عن \\(x = -5\\) و \\(x = -1\\) لإيجاد \\(A, B\\)."
    ],
    "reasons_ar": [
      "لأن درجة البسط تساوي درجة المقام (2)، فالكسر غير فعلي ويجب إضافة ثابت القسمة \\(1 + \\dfrac{A}{x+5} + \\dfrac{B}{x+1}\\).",
      "لأن المقام يتطلب بسطاً تربيعياً.",
      "لأن الضرب في المقام غير جائز جبرياً."
    ],
    "h_ar": "قارن بين درجة البسط (2) ودرجة المقام (2).",
    "sol_ar": "بما أن درجة البسط تساوي درجة المقام، نقسم أولاً فنحصل على \\(1 + \\dfrac{2}{(x + 5)(x + 1)}\\)."
  },
  {
    "t": "ms",
    "ti": "Examiner Mode: Remainder Theorem & Partial Fractions (Factoring Polynomials)",
    "q": "Let \\(P(x) = 2x^3 - 5x^2 + kx + 6\\). Given that \\((x - 2)\\) is a factor of \\(P(x)\\): (a) Show that \\(k = -1\\). (b) Express \\(\\dfrac{3x + 1}{(x - 1)(x + 2)}\\) in partial fractions.",
    "parts": [
      {
        "label": "Part (a) — Factor Theorem Application",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "Apply Factor Theorem \\(P(2) = 0 \\implies 2(2)^3 - 5(2)^2 + 2k + 6 = 0\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "Simplify \\(16 - 20 + 2k + 6 = 0 \\implies 2k = -2 \\implies k = -1\\)."
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
    "ti_ar": "وضع المصحح: نظرية العوامل والكسور الجزئية (Factoring Polynomials)",
    "q_ar": "لتكن \\(P(x) = 2x^3 - 5x^2 + kx + 6\\). إذا كان \\((x - 2)\\) عاملاً لـ \\(P(x)\\): (أ) أثبت أن \\(k = -1\\). (ب) فكك \\(\\dfrac{3x + 1}{(x - 1)(x + 2)}\\) إلى كسور جزئية.",
    "examinerTip_ar": "تأكد دائماً من مساواة المقسوم عليه بالصفر \\(x - 2 = 0 \\implies x = 2\\) قبل التعويض في كثيرة الحدود."
  },
  {
    "t": "sb",
    "ti": "Step Builder: Remainder Theorem Evaluation (Factoring Polynomials)",
    "steps": [
      {
        "l": "To find the remainder when \\(f(x) = x^3 + 5x - 1\\) is divided by \\((x - 2)\\), set \\(x =\\)",
        "a": "2",
        "h": "Solve x - 2 = 0."
      },
      {
        "l": "Evaluate the cubic term \\(2^3 =\\)",
        "a": "8",
        "h": "Compute 2 * 2 * 2."
      },
      {
        "l": "Compute the exact remainder \\(f(2) = 8 + 10 - 1 =\\)",
        "a": "17",
        "h": "Add 8 + 10 and subtract 1."
      }
    ],
    "ti_ar": "بناء الخطوات: حساب الباقي بنظرية الباقي (Factoring Polynomials)",
    "steps_ar": [
      {
        "l": "لإيجاد باقي قسمة \\(f(x) = x^3 + 5x - 1\\) على \\((x - 2)\\)، نعوض عن \\(x =\\)",
        "a": "2",
        "h": "حل المعادلة x - 2 = 0."
      },
      {
        "l": "احسب الحد التكعيبي \\(2^3 =\\)",
        "a": "8",
        "h": "احسب 2 × 2 × 2."
      },
      {
        "l": "احسب الباقي \\(f(2) = 8 + 10 - 1 =\\)",
        "a": "17",
        "h": "اجمع 8 + 10 ثم اطرح 1."
      }
    ]
  },
  {
    "t": "mt",
    "ti": "Matching: Polynomial & Rational Structure (Factoring Polynomials)",
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
    "ti_ar": "مطابقة: كثيرات الحدود والكسور الجزئية (Factoring Polynomials)",
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
  }
];

D["ag-radicals"] = [
  {
    "t": "fn",
    "ti": "Explorer: Roots \\(y=x^{1/n}\\)",
    "ti_ar": "مستكشف: الجذور \\(y=x^{1/n}\\)",
    "fns": [
      {
        "expr": "x^(1/n)",
        "color": "#1E3A6E",
        "label": "x^{1/n}"
      }
    ],
    "xrange": [
      0,
      10
    ],
    "yrange": [
      0,
      4
    ],
    "params": [
      {
        "name": "n",
        "label": "Root index n",
        "min": 2,
        "max": 4,
        "step": 1,
        "default": 2
      }
    ]
  },
  {
    "t": "sr",
    "ti": "Worked Example: Simplify \\(\\sqrt{75}\\)",
    "ti_ar": "مثال محلول: تبسيط \\(\\sqrt{75}\\)",
    "steps": [
      "Find the largest perfect-square factor of \\(75\\): \\(75=25\\times3\\).",
      "Split the radical: \\(\\sqrt{75}=\\sqrt{25}\\times\\sqrt{3}\\).",
      "Simplify: \\(\\sqrt{25}=5\\), so \\(\\sqrt{75}=5\\sqrt3\\)."
    ],
    "steps_ar": [
      "إيجاد أكبر عامل مربع كامل للعدد \\(75\\): \\(75=25\\times3\\).",
      "توزيع الجذر: \\(\\sqrt{75}=\\sqrt{25}\\times\\sqrt{3}\\).",
      "التبسيط: \\(\\sqrt{25}=5\\)، إذن \\(\\sqrt{75}=5\\sqrt3\\)."
    ]
  },
  {
    "t": "qc",
    "ti": "Quick Check: Rational Exponents",
    "ti_ar": "فحص سريع: الأسس النسبية",
    "q": "Simplify \\(x^{2/3}\\cdot x^{1/3}\\)",
    "q_ar": "بسط المقدار \\(x^{2/3}\\cdot x^{1/3}\\)",
    "o": [
      "\\(x\\)",
      "\\(x^{2/9}\\)",
      "\\(x^{1/3}\\)",
      "\\(x^{3}\\)"
    ],
    "o_ar": [
      "\\(x\\)",
      "\\(x^{2/9}\\)",
      "\\(x^{1/3}\\)",
      "\\(x^{3}\\)"
    ],
    "a": 0,
    "ex": "Add exponents: \\(\\frac23+\\frac13=1\\), so the result is \\(x^1=x\\).",
    "ex_ar": "جمع الأسس: \\(\\frac23+\\frac13=1\\)، فيكون الناتج \\(x^1=x\\)."
  },
  {
    "t": "num",
    "ti": "Numeric Entry: Radical Simplification Coefficient",
    "ti_ar": "إدخال رقمي: معامل التبسيط الجذري",
    "q": "When \\(\\sqrt{180}\\) is written in simplified radical form \\(a\\sqrt{5}\\), what is the integer value of \\(a\\)?",
    "q_ar": "عند كتابة \\(\\sqrt{180}\\) في أبسط صورة جذرية \\(a\\sqrt{5}\\)، فما القيمة الصحيحة لـ \\(a\\)؟",
    "a": 6,
    "h": "Find the largest perfect square factor of \\(180\\): \\(180 = 36 \\times 5\\).",
    "h_ar": "أوجد أكبر عامل مربع كامل للعدد \\(180\\): \\(180 = 36 \\times 5\\).",
    "sol": "\\(\\sqrt{180} = \\sqrt{36 \\times 5} = 6\\sqrt{5}\\), so \\(a = 6\\).",
    "sol_ar": "\\(\\sqrt{180} = \\sqrt{36 \\times 5} = 6\\sqrt{5}\\)، إذن \\(a = 6\\)."
  },
  {
    "t": "ord",
    "ti": "Order the Steps: Rationalizing Binomial Radical Denominator",
    "ti_ar": "رتّب الخطوات: إنطاق المقام ثنائي الحد",
    "prompt": "Arrange the steps to rationalize \\(\\dfrac{6}{\\sqrt{5} - \\sqrt{2}}\\):",
    "prompt_ar": "رتب خطوات إنطاق مقام الكسر \\(\\dfrac{6}{\\sqrt{5} - \\sqrt{2}}\\):",
    "items": [
      "Identify the conjugate of the denominator: \\(\\sqrt{5} + \\sqrt{2}\\).",
      "Multiply numerator and denominator by \\(\\sqrt{5} + \\sqrt{2}\\).",
      "Expand the denominator using difference of squares: \\((\\sqrt{5})^2 - (\\sqrt{2})^2 = 5 - 2 = 3\\).",
      "Divide the numerator coefficient by 3: \\(\\frac{6(\\sqrt{5} + \\sqrt{2})}{3} = 2(\\sqrt{5} + \\sqrt{2})\\).",
      "Distribute: \\(2\\sqrt{5} + 2\\sqrt{2}\\)."
    ],
    "items_ar": [
      "تحديد مرافق المقام: \\(\\sqrt{5} + \\sqrt{2}\\).",
      "ضرب كل من البسط والمقام في المرافق \\(\\sqrt{5} + \\sqrt{2}\\).",
      "فك المقام باستخدام الفرق بين مربعين: \\((\\sqrt{5})^2 - (\\sqrt{2})^2 = 5 - 2 = 3\\).",
      "قسمة معامل البسط على 3: \\(\\frac{6(\\sqrt{5} + \\sqrt{2})}{3} = 2(\\sqrt{5} + \\sqrt{2})\\).",
      "توزيع الضرب: \\(2\\sqrt{5} + 2\\sqrt{2}\\)."
    ],
    "ex": "Multiply by conjugate, expand denominator difference of squares, and cancel common factors.",
    "ex_ar": "اضرب في المرافق، وفك فرق المربعين في المقام، ثم اختصر العوامل المشتركة."
  },
  {
    "t": "cat",
    "ti": "Categorize: Radical Simplification Status",
    "ti_ar": "تصنيف: حالة تبسيط الجذور",
    "categories": [
      "Already Simplified",
      "Can Be Simplified",
      "Needs Rationalization"
    ],
    "categories_ar": [
      "في أبسط صورة",
      "يمكن تبسيطه أكثر",
      "يحتاج إلى إنطاق مقام"
    ],
    "items": [
      {
        "s": "\\(\\sqrt{7}\\)",
        "s_ar": "\\(\\sqrt{7}\\)",
        "cat": 0
      },
      {
        "s": "\\(\\sqrt{48}\\)",
        "s_ar": "\\(\\sqrt{48}\\)",
        "cat": 1
      },
      {
        "s": "\\(\\dfrac{3}{\\sqrt{5}}\\)",
        "s_ar": "\\(\\dfrac{3}{\\sqrt{5}}\\)",
        "cat": 2
      },
      {
        "s": "\\(2\\sqrt{11}\\)",
        "s_ar": "\\(2\\sqrt{11}\\)",
        "cat": 0
      },
      {
        "s": "\\(\\sqrt{72}\\)",
        "s_ar": "\\(\\sqrt{72}\\)",
        "cat": 1
      },
      {
        "s": "\\(\\dfrac{\\sqrt{2}}{\\sqrt{3} - 1}\\)",
        "s_ar": "\\(\\dfrac{\\sqrt{2}}{\\sqrt{3} - 1}\\)",
        "cat": 2
      }
    ],
    "ex": "Radicands with no square factors are simplified; radicands with square factors can be simplified; denominators with radicals require rationalization.",
    "ex_ar": "المجذورات التي لا تحتوي على عوامل مربعة تكون في أبسط صورة؛ والمجذورات التي بها عوامل مربعة يمكن تبسيطها؛ والمقامات التي تحتوي على جذور تتطلب إنطاق المقام."
  },
  {
    "t": "se",
    "ti": "Spot the Error: Algebraic & Domain Verification (Radicals &amp; Exponents)",
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
    "ti_ar": "اكتشف الخطأ: الجذور الدخيلة والتحقق من المجال (Radicals &amp; Exponents)",
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
    "ti": "Examiner Mode: Multi-Step Structured Problem (Radicals &amp; Exponents)",
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
    "ti_ar": "وضع المصحح: إكمال المربع والدالة العكسية (Radicals &amp; Exponents)",
    "q_ar": "لتكن \\(f(x) = x^2 - 10x + 29\\) حيث \\(x \\ge 5\\). (أ) اكتب \\(f(x)\\) في صورة المربع الكامل وحدد مداها. (ب) أوجد قاعدة الدالة العكسية \\(f^{-1}(x)\\) ومجالها.",
    "examinerTip_ar": "الدالة العكسية يجب أن تكون وحيدة القيمة، لذا نختار الإشارة الموجبة للجذر \\(5 + \\sqrt{x - 4}\\) لأن \\(x \\ge 5\\)."
  },
  {
    "t": "sb",
    "ti": "Step Builder: Completing the Square & Vertex Analysis (Radicals &amp; Exponents)",
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
        "h": "Compute (2)^2 + 4."
      }
    ],
    "ti_ar": "بناء الخطوات: إكمال المربع وإيجاد القيمة الصغرى (Radicals &amp; Exponents)",
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
        "h": "احسب 4 + 4."
      }
    ]
  },
  {
    "t": "mt",
    "ti": "Matching: Core Algebraic & Analytic Principles (Radicals &amp; Exponents)",
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
    "ti_ar": "مطابقة: المبادئ الجبرية والتحليلية الأساسية (Radicals &amp; Exponents)",
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

D["ag-rational"] = [
  {
    "t": "fn",
    "ti": "Explorer: Rational Function \\(\\dfrac{1}{x-a}\\)",
    "ti_ar": "مستكشف: الدالة النسبية \\(\\dfrac{1}{x-a}\\)",
    "fns": [
      {
        "expr": "1/(x-a)",
        "color": "#1E3A6E",
        "label": "1/(x-a)"
      }
    ],
    "xrange": [
      -5,
      5
    ],
    "yrange": [
      -6,
      6
    ],
    "params": [
      {
        "name": "a",
        "label": "Asymptote a",
        "min": -3,
        "max": 3,
        "step": 1,
        "default": 1
      }
    ]
  },
  {
    "t": "sr",
    "ti": "Worked Example: Solve \\(\\dfrac{2}{x}+\\dfrac{1}{3}=\\dfrac{5}{6}\\)",
    "ti_ar": "مثال محلول: حل المعادلة \\(\\dfrac{2}{x}+\\dfrac{1}{3}=\\dfrac{5}{6}\\)",
    "steps": [
      "Multiply every term by the LCD, \\(6x\\): \\(6x\\cdot\\dfrac{2}{x}+6x\\cdot\\dfrac{1}{3}=6x\\cdot\\dfrac{5}{6}\\).",
      "Simplify each term: \\(12+2x=5x\\).",
      "Solve for \\(x\\): \\(12=3x\\Rightarrow x=4\\)."
    ],
    "steps_ar": [
      "ضرب جميع الحدود في المضاعف المشترك الأصغر للمقامات \\(6x\\): \\(6x\\cdot\\dfrac{2}{x}+6x\\cdot\\dfrac{1}{3}=6x\\cdot\\dfrac{5}{6}\\).",
      "تبسيط كل حد: \\(12+2x=5x\\).",
      "حل المعادلة لإيجاد \\(x\\): \\(12=3x\\Rightarrow x=4\\)."
    ]
  },
  {
    "t": "qc",
    "ti": "Quick Check: Excluded Values",
    "ti_ar": "فحص سريع: القيم المستثناة (أصفار المقام)",
    "q": "What value of \\(x\\) must be excluded from \\(\\dfrac{3}{x-2}\\)?",
    "q_ar": "ما قيمة \\(x\\) التي يجب استثناؤها من مجال الكسر \\(\\dfrac{3}{x-2}\\)؟",
    "o": [
      "\\(x=2\\)",
      "\\(x=0\\)",
      "\\(x=3\\)",
      "\\(x=-2\\)"
    ],
    "o_ar": [
      "\\(x=2\\)",
      "\\(x=0\\)",
      "\\(x=3\\)",
      "\\(x=-2\\)"
    ],
    "a": 0,
    "ex": "The denominator \\(x-2\\) cannot equal \\(0\\), so \\(x\\neq2\\).",
    "ex_ar": "المقام \\(x-2\\) لا يمكن أن يساوي \\(0\\)، إذن \\(x\\neq2\\)."
  },
  {
    "t": "num",
    "ti": "Numeric Entry: Solve Rational Equation",
    "ti_ar": "إدخال رقمي: حل معادلة نسبية",
    "q": "Solve for \\(x\\): \\(\\dfrac{5}{x + 2} = \\dfrac{3}{x - 4}\\)",
    "q_ar": "حل المعادلة لإيجاد قيمة \\(x\\): \\(\\dfrac{5}{x + 2} = \\dfrac{3}{x - 4}\\)",
    "a": 13,
    "h": "Cross-multiply: \\(5(x - 4) = 3(x + 2)\\).",
    "h_ar": "الضرب التبادلي: \\(5(x - 4) = 3(x + 2)\\).",
    "sol": "\\(5x - 20 = 3x + 6 \\implies 2x = 26 \\implies x = 13\\). Note \\(x \\neq -2, 4\\).",
    "sol_ar": "\\(5x - 20 = 3x + 6 \\implies 2x = 26 \\implies x = 13\\). لاحظ أن \\(x \\neq -2, 4\\)."
  },
  {
    "t": "ord",
    "ti": "Order the Steps: Adding Rational Expressions",
    "ti_ar": "رتّب الخطوات: جمع المقادير النسبية",
    "prompt": "Arrange the steps to compute \\(\\dfrac{3}{x + 2} + \\dfrac{2}{x - 1}\\):",
    "prompt_ar": "رتب خطوات حساب مجموع الكسرين \\(\\dfrac{3}{x + 2} + \\dfrac{2}{x - 1}\\):",
    "items": [
      "Identify the LCD of the denominators: \\((x + 2)(x - 1)\\).",
      "Rewrite each fraction with the LCD: \\(\\dfrac{3(x - 1)}{(x + 2)(x - 1)} + \\dfrac{2(x + 2)}{(x + 2)(x - 1)}\\).",
      "Combine numerators over common denominator: \\(\\dfrac{3(x - 1) + 2(x + 2)}{(x + 2)(x - 1)}\\).",
      "Expand the numerator: \\(3x - 3 + 2x + 4 = 5x + 1\\).",
      "Write final simplified fraction: \\(\\dfrac{5x + 1}{(x + 2)(x - 1)}\\)."
    ],
    "items_ar": [
      "تحديد المضاعف المشترك الأصغر للمقامات (LCD): \\((x + 2)(x - 1)\\).",
      "إعادة كتابة كل كسر بالمقام المشترك: \\(\\dfrac{3(x - 1)}{(x + 2)(x - 1)} + \\dfrac{2(x + 2)}{(x + 2)(x - 1)}\\).",
      "جمع البسطين فوق المقام المشترك: \\(\\dfrac{3(x - 1) + 2(x + 2)}{(x + 2)(x - 1)}\\).",
      "فك وتبسيط حدود البسط: \\(3x - 3 + 2x + 4 = 5x + 1\\).",
      "كتابة الكسر النهائي في أبسط صورة: \\(\\dfrac{5x + 1}{(x + 2)(x - 1)}\\)."
    ],
    "ex": "Find LCD, write equivalent fractions, combine numerators, and simplify.",
    "ex_ar": "أوجد المضاعف المشترك الأصغر، واكتب الكسور المكافئة، وجمّع البسوط، ثم بسط."
  },
  {
    "t": "cat",
    "ti": "Categorize: Rational Function Features",
    "ti_ar": "تصنيف: خصائص الدوال النسبية",
    "categories": [
      "Vertical Asymptote",
      "Horizontal Asymptote",
      "Removable Discontinuity (Hole)"
    ],
    "categories_ar": [
      "خط تقارب رأسي",
      "خط تقارب أفقي",
      "نقطة انفصال قابلة للإزالة (فجوة)"
    ],
    "items": [
      {
        "s": "Denominator is zero and factor does NOT cancel with numerator",
        "s_ar": "المقام يساوي صفراً والعامل لا يختصر مع البسط",
        "cat": 0
      },
      {
        "s": "Degree of numerator equals degree of denominator: \\(y = a_n / b_m\\)",
        "s_ar": "درجة البسط تساوي درجة المقام: \\(y = a_n / b_m\\)",
        "cat": 1
      },
      {
        "s": "Factor \\((x - c)\\) cancels completely from both numerator and denominator",
        "s_ar": "العامل \\((x - c)\\) يختصر تماماً من كل من البسط والمقام",
        "cat": 2
      },
      {
        "s": "Degree of numerator is less than degree of denominator: \\(y = 0\\)",
        "s_ar": "درجة البسط أقل من درجة المقام: \\(y = 0\\)",
        "cat": 1
      },
      {
        "s": "\\(f(x) = \\dfrac{x - 3}{(x - 3)(x + 2)}\\) at \\(x = 3\\)",
        "s_ar": "\\(f(x) = \\dfrac{x - 3}{(x - 3)(x + 2)}\\) عند \\(x = 3\\)",
        "cat": 2
      },
      {
        "s": "\\(f(x) = \\dfrac{1}{x - 4}\\) at \\(x = 4\\)",
        "s_ar": "\\(f(x) = \\dfrac{1}{x - 4}\\) عند \\(x = 4\\)",
        "cat": 0
      }
    ],
    "ex": "Non-canceled denominator zeros produce vertical asymptotes; canceled zeros produce holes; degrees govern horizontal asymptotes.",
    "ex_ar": "أصفار المقام غير المختصرة تنتج خطوط تقارب رأسية؛ والأصفار المختصرة تنتج فجوات؛ ودرجات الحدود تحدد خط التقارب الأفقي."
  },
  {
    "t": "se",
    "ti": "Spot the Error: Algebraic & Domain Verification (Rational Expressions)",
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
    "ti_ar": "اكتشف الخطأ: الجذور الدخيلة والتحقق من المجال (Rational Expressions)",
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
    "ti": "Examiner Mode: Multi-Step Structured Problem (Rational Expressions)",
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
    "ti_ar": "وضع المصحح: إكمال المربع والدالة العكسية (Rational Expressions)",
    "q_ar": "لتكن \\(f(x) = x^2 - 4x + 7\\) حيث \\(x \\ge 2\\). (أ) اكتب \\(f(x)\\) في صورة المربع الكامل وحدد مداها. (ب) أوجد قاعدة الدالة العكسية \\(f^{-1}(x)\\) ومجالها.",
    "examinerTip_ar": "الدالة العكسية يجب أن تكون وحيدة القيمة، لذا نختار الإشارة الموجبة للجذر \\(2 + \\sqrt{x - 3}\\) لأن \\(x \\ge 2\\)."
  },
  {
    "t": "sb",
    "ti": "Step Builder: Completing the Square & Vertex Analysis (Rational Expressions)",
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
        "h": "Compute (2)^2 + 3."
      }
    ],
    "ti_ar": "بناء الخطوات: إكمال المربع وإيجاد القيمة الصغرى (Rational Expressions)",
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
        "h": "احسب 4 + 3."
      }
    ]
  },
  {
    "t": "mt",
    "ti": "Matching: Core Algebraic & Analytic Principles (Rational Expressions)",
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
    "ti_ar": "مطابقة: المبادئ الجبرية والتحليلية الأساسية (Rational Expressions)",
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

D["ag-stats"] = [
  {
    "t": "sr",
    "ti": "Worked Example: Find the Mean of \\(4,6,6,8,10\\)",
    "ti_ar": "مثال محلول: إيجاد الوسط الحسابي لـ \\(4,6,6,8,10\\)",
    "steps": [
      "Add all the values: \\(4+6+6+8+10=34\\).",
      "Divide by the number of values, \\(5\\): \\(\\dfrac{34}{5}=6.8\\).",
      "The mean is \\(6.8\\)."
    ],
    "steps_ar": [
      "جمع جميع القيم: \\(4+6+6+8+10=34\\).",
      "القسمة على عدد القيم وهو \\(5\\): \\(\\dfrac{34}{5}=6.8\\).",
      "الوسط الحسابي هو \\(6.8\\)."
    ]
  },
  {
    "t": "qc",
    "ti": "Quick Check: Resistant Statistics",
    "ti_ar": "فحص سريع: المقاييس الإحصائية المقاومة للقيم المتطرفة",
    "q": "Which measure of center is least affected by an outlier?",
    "q_ar": "أي مقاييس النزعة المركزية التالية هو الأقل تأثراً بالقيم المتطرفة؟",
    "o": [
      "Mean",
      "Median",
      "Range",
      "Sum"
    ],
    "o_ar": [
      "الوسط الحسابي",
      "الوسيط",
      "المدى",
      "المجموع"
    ],
    "a": 1,
    "ex": "The median depends only on the middle value(s), so extreme outliers don't pull it around the way they do the mean.",
    "ex_ar": "يعتمد الوسيط فقط على القيمة أو القيمتين في المنتصف، لذا لا تؤثر عليه القيم المتطرفة بشدة كما تؤثر على الوسط الحسابي."
  },
  {
    "t": "cat",
    "ti": "Categorize: Statistical Resistance to Outliers",
    "ti_ar": "تصنيف: مقاومة المقاييس الإحصائية للقيم المتطرفة",
    "categories": [
      "Resistant to Outliers",
      "Sensitive to Outliers"
    ],
    "categories_ar": [
      "مقاوم للقيم المتطرفة (لا يتأثر بها)",
      "حساس للقيم المتطرفة (يتأثر بها)"
    ],
    "items": [
      {
        "s": "Median",
        "s_ar": "الوسيط",
        "cat": 0
      },
      {
        "s": "Interquartile Range (IQR)",
        "s_ar": "المدى الربيعي (IQR)",
        "cat": 0
      },
      {
        "s": "Mode",
        "s_ar": "المنوال",
        "cat": 0
      },
      {
        "s": "Mean",
        "s_ar": "الوسط الحسابي",
        "cat": 1
      },
      {
        "s": "Range (Max - Min)",
        "s_ar": "المدى (أكبر قيمة - أصغر قيمة)",
        "cat": 1
      },
      {
        "s": "Standard Deviation",
        "s_ar": "الانحراف المعياري",
        "cat": 1
      }
    ],
    "ex": "Median and IQR resist outliers; mean, range, and standard deviation are sensitive to extreme values.",
    "ex_ar": "الوسيط والمدى الربيعي يقاومان القيم المتطرفة؛ بينما الوسط الحسابي والمدى والانحراف المعياري يتأثرون بشدة بالقيم المتطرفة."
  },
  {
    "t": "num",
    "ti": "Numeric Entry: Interquartile Range (IQR)",
    "ti_ar": "إدخال رقمي: المدى الربيعي (IQR)",
    "q": "A dataset has first quartile \\(Q_1 = 34\\) and third quartile \\(Q_3 = 58\\). What is the interquartile range (IQR)?",
    "q_ar": "مجموعة بيانات لها ربيع أدنى \\(Q_1 = 34\\) وربيع أعلى \\(Q_3 = 58\\). ما قيمة المدى الربيعي (IQR)؟",
    "a": 24,
    "ex": "\\(\\text{IQR} = Q_3 - Q_1 = 58 - 34 = 24\\).",
    "ex_ar": "\\(\\text{IQR} = Q_3 - Q_1 = 58 - 34 = 24\\)."
  },
  {
    "t": "ord",
    "ti": "Order the Steps: Testing for Outliers using 1.5 × IQR",
    "ti_ar": "رتّب الخطوات: فحص القيم المتطرفة باستخدام 1.5 × المدى الربيعي",
    "prompt": "Arrange the steps to test whether a value is an outlier given \\(Q_1 = 50\\) and \\(Q_3 = 70\\):",
    "prompt_ar": "رتب خطوات فحص ما إذا كانت إحدى القيم متطرفة عند \\(Q_1 = 50\\) و \\(Q_3 = 70\\):",
    "items": [
      "Compute the interquartile range: \\(\\text{IQR} = Q_3 - Q_1 = 70 - 50 = 20\\).",
      "Multiply IQR by 1.5: \\(1.5 \\times 20 = 30\\).",
      "Calculate the lower outlier fence: \\(Q_1 - 30 = 50 - 30 = 20\\).",
      "Calculate the upper outlier fence: \\(Q_3 + 30 = 70 + 30 = 100\\).",
      "Flag any data value below 20 or above 100 as an outlier."
    ],
    "items_ar": [
      "حساب المدى الربيعي: \\(\\text{IQR} = Q_3 - Q_1 = 70 - 50 = 20\\).",
      "ضرب المدى الربيعي في 1.5: \\(1.5 \\times 20 = 30\\).",
      "حساب الحد الأدنى للقيم المتطرفة: \\(Q_1 - 30 = 50 - 30 = 20\\).",
      "حساب الحد الأعلى للقيم المتطرفة: \\(Q_3 + 30 = 70 + 30 = 100\\).",
      "تحديد أي قيمة أقل من 20 أو أكبر من 100 كقيمة متطرفة."
    ],
    "ex": "Find IQR, compute 1.5 × IQR, establish fences Q1 - 1.5(IQR) and Q3 + 1.5(IQR), and check bounds.",
    "ex_ar": "احسب المدى الربيعي، ثم احسب 1.5 × IQR، وحدد حدود السياج Q1 - 1.5(IQR) و Q3 + 1.5(IQR)، وافحص القيم."
  },
  {
    "t": "se",
    "ti": "Spot the Error: Algebraic & Domain Verification (Statistics &amp; Data Analysis)",
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
    "ti_ar": "اكتشف الخطأ: الجذور الدخيلة والتحقق من المجال (Statistics &amp; Data Analysis)",
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
    "ti": "Examiner Mode: Multi-Step Structured Problem (Statistics &amp; Data Analysis)",
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
    "ti_ar": "وضع المصحح: إكمال المربع والدالة العكسية (Statistics &amp; Data Analysis)",
    "q_ar": "لتكن \\(f(x) = x^2 - 6x + 11\\) حيث \\(x \\ge 3\\). (أ) اكتب \\(f(x)\\) في صورة المربع الكامل وحدد مداها. (ب) أوجد قاعدة الدالة العكسية \\(f^{-1}(x)\\) ومجالها.",
    "examinerTip_ar": "الدالة العكسية يجب أن تكون وحيدة القيمة، لذا نختار الإشارة الموجبة للجذر \\(3 + \\sqrt{x - 2}\\) لأن \\(x \\ge 3\\)."
  },
  {
    "t": "sb",
    "ti": "Step Builder: Completing the Square & Vertex Analysis (Statistics &amp; Data Analysis)",
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
        "h": "Compute (2)^2 + 2."
      }
    ],
    "ti_ar": "بناء الخطوات: إكمال المربع وإيجاد القيمة الصغرى (Statistics &amp; Data Analysis)",
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
        "h": "احسب 4 + 2."
      }
    ]
  },
  {
    "t": "mt",
    "ti": "Matching: Core Algebraic & Analytic Principles (Statistics &amp; Data Analysis)",
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
    "ti_ar": "مطابقة: المبادئ الجبرية والتحليلية الأساسية (Statistics &amp; Data Analysis)",
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
