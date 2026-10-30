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
    "ti": "Spot the Error: Perpendicular Gradient & Inequality Sign (Linear Equations & Lines)",
    "ti_ar": "اكتشف الخطأ: ميل المستقيم المتعامد وإشارة المتباينة (المعادلات الخطية ومعادلات المستقيم)",
    "q": "Given \\(A(2, 3)\\) and \\(B(4, 9)\\), a student finds the gradient of the line perpendicular to \\(AB\\). Which step is wrong?",
    "q_ar": "مُعطى النقطتان \\(A(2, 3)\\) و\\(B(4, 9)\\)، يحسب طالب ميل العمودي على \\(AB\\). أي خطوة خاطئة؟",
    "steps": [
      "Compute gradient of \\(AB\\): \\(m_{AB} = \\frac{9 - 3}{4 - 2} = \\frac{6}{2} = 3\\).",
      "Compute midpoint of \\(AB\\): \\(M = (3, 6)\\).",
      "Take the perpendicular gradient as the positive reciprocal \\(m_{\\perp} = \\frac{1}{3}\\) without negating the sign.",
      "Substitute \\(M(3, 6)\\) into point-slope form."
    ],
    "steps_ar": [
      "حساب ميل القطعة \\(AB\\): \\(m_{AB} = \\frac{9 - 3}{4 - 2} = 3\\).",
      "حساب نقطة المنتصف: \\(M = (3, 6)\\).",
      "أخذ ميل العمودي كمقلوب موجب \\(m_{\\perp} = \\frac{1}{3}\\) دون عكس الإشارة.",
      "التعويض بالنقطة \\(M(3, 6)\\) في معادلة المستقيم."
    ],
    "errorStep": 3,
    "reasons": [
      "Perpendicular non-vertical lines satisfy \\(m_1 m_2 = -1\\), so \\(m_{\\perp} = -\\frac{1}{3}\\) (negative reciprocal, not positive reciprocal).",
      "Perpendicular lines have equal slopes \\(m_1 = m_2\\).",
      "Slope is run divided by rise."
    ],
    "reasons_ar": [
      "المستقيمان المتعامدان يحققان \\(m_1 m_2 = -1\\)، لذا ميل العمودي هو المقلوب السالب \\(m_{\\perp} = -\\frac{1}{3}\\).",
      "المستقيمان المتعامدان لهما نفس الميل.",
      "الميل يساوي فرق السينات على فرق الصادات."
    ],
    "correctReason": 0
  },
  {
    "t": "ms",
    "ti": "Examiner Mode: Line Equation & Perpendicular Bisector (Linear Equations & Lines)",
    "ti_ar": "وضع المصحح: معادلة المستقيم والعمود المنصّف (المعادلات الخطية ومعادلات المستقيم)",
    "q": "Points \\(A(2, 3)\\) and \\(B(4, 9)\\) lie in the coordinate plane. (a) Find the equation of line \\(AB\\) in \\(y = mx + c\\) form. (b) Find the midpoint \\(M\\) and the gradient of the perpendicular bisector of \\(AB\\).",
    "q_ar": "النقطتان \\(A(2, 3)\\) و\\(B(4, 9)\\) في المستوى الإحداثي. (أ) أوجد معادلة المستقيم \\(AB\\) بصيغة \\(y = mx + c\\). (ب) أوجد نقطة المنتصف \\(M\\) وميل العمود المنصّف للقطعة \\(AB\\).",
    "parts": [
      {
        "label": "Part (a) — Gradient & Line Equation",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "Gradient \\(m = \\frac{9 - 3}{4 - 2} = 3\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "Intercept \\(c = 3 - 3(2) = -3\\), giving \\(y = 3x - 3\\)."
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
            "text": "Midpoint \\(M = \\left(\\frac{2+4}{2}, \\frac{3+9}{2}\\right) = (3, 6)\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "Perpendicular gradient \\(m_{\\perp} = -\\frac{1}{3}\\)."
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
            "text": "الميل \\(m = \\frac{9 - 3}{4 - 2} = 3\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "المقطع الصادي \\(c = -3\\)، والمعادلة \\(y = 3x - 3\\)."
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
            "text": "نقطة المنتصف \\(M = (3, 6)\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "ميل العمود المنصّف \\(m_{\\perp} = -\\frac{1}{3}\\)."
          }
        ]
      }
    ]
  },
  {
    "t": "sb",
    "ti": "Step Builder: Coordinate Slope, Intercept & Midpoint (Linear Equations & Lines)",
    "ti_ar": "بناء الخطوات: الميل والمقطع ونقطة المنتصف (المعادلات الخطية ومعادلات المستقيم)",
    "steps": [
      {
        "l": "Find the slope \\(m\\) through \\((2, 3)\\) and \\((4, 9)\\): \\(m =\\)",
        "a": "3",
        "h": "Compute (9 − 3) / (4 − 2)."
      },
      {
        "l": "Find the \\(y\\)-intercept \\(c\\) in \\(y = mx + c\\): \\(c =\\)",
        "a": "-3",
        "h": "Compute 3 − 3×2."
      },
      {
        "l": "Find the \\(y\\)-coordinate of the midpoint \\(M\\): \\(y_M =\\)",
        "a": "6",
        "h": "Average 3 and 9."
      }
    ],
    "steps_ar": [
      {
        "l": "أوجد الميل \\(m\\) للمستقيم المار بـ \\((2, 3)\\) و\\((4, 9)\\): \\(m =\\)",
        "a": "3",
        "h": "احسب (9 − 3) ÷ (4 − 2)."
      },
      {
        "l": "أوجد المقطع الصادي \\(c\\) في \\(y = mx + c\\): \\(c =\\)",
        "a": "-3",
        "h": "احسب 3 − 3×2."
      },
      {
        "l": "أوجد الإحداثي الصادي لنقطة المنتصف \\(M\\): \\(y_M =\\)",
        "a": "6",
        "h": "متوسط 3 و9."
      }
    ]
  },
  {
    "t": "qc",
    "ti": "Quick Check: No-Solution Linear System Condition (Linear Equations & Lines)",
    "ti_ar": "فحص سريع: شرط عدم وجود حل لنظام خطي (المعادلات الخطية ومعادلات المستقيم)",
    "q": "For what value of \\(k\\) does the linear system \\(y = 3x + 2\\) and \\(y = kx + -5\\) have NO solution?",
    "q_ar": "ما قيمة \\(k\\) التي تجعل النظام الخطي \\(y = 3x + 2\\) و\\(y = kx + -5\\) عديم الحل؟",
    "o": [
      "\\(3\\)",
      "\\(-3\\)",
      "\\(-\\frac{1}{3}\\)",
      "\\(0\\)"
    ],
    "o_ar": [
      "\\(3\\)",
      "\\(-3\\)",
      "\\(-\\frac{1}{3}\\)",
      "\\(0\\)"
    ],
    "a": 0,
    "ex": "Equal slopes (\\(k = 3\\)) with distinct \\(y\\)-intercepts produce parallel non-intersecting lines.",
    "ex_ar": "تساوي الميلين (\\(k = 3\\)) مع اختلاف المقطعين الصاديين ينتج مستقيمين متوازيين لا يتقاطعان."
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
    "ti": "Spot the Error: Composite Order & Inverse Domain (Quadratic Functions)",
    "ti_ar": "اكتشف الخطأ: ترتيب تركيب الدوال ومجال المعكوس (الدوال والمعادلات التربيعية)",
    "q": "Let \\(f(x) = 4x + 3\\) and \\(g(x) = x^2 + 1\\). A student evaluates \\((f \\circ g)(4)\\). Which step is wrong?",
    "q_ar": "لتكن \\(f(x) = 4x + 3\\) و\\(g(x) = x^2 + 1\\). يحسب طالب \\((f \\circ g)(4)\\). أي خطوة خاطئة؟",
    "steps": [
      "Write \\((f \\circ g)(4) = g(f(4))\\) by applying \\(f\\) first instead of \\(g\\).",
      "Compute \\(f(4) = 19\\).",
      "Square and add \\(1\\) to get \\(362\\)."
    ],
    "steps_ar": [
      "كتابة \\((f \\circ g)(4) = g(f(4))\\) بتطبيق \\(f\\) أولاً بدلاً من \\(g\\).",
      "حساب \\(f(4) = 19\\).",
      "التربيع وإضافة \\(1\\) للحصول على \\(362\\)."
    ],
    "errorStep": 1,
    "reasons": [
      "By definition \\((f \\circ g)(x) = f(g(x))\\): evaluate the inner function \\(g(4) = 17\\) first, then \\(f(17) = 71\\).",
      "Function composition is always commutative.",
      "You must multiply \\(f(4)\\) by \\(g(4)\\)."
    ],
    "reasons_ar": [
      "حسب التعريف \\((f \\circ g)(x) = f(g(x))\\): نحسب الدالة الداخلية أولاً \\(g(4) = 17\\) ثم \\(f(17) = 71\\).",
      "تركيب الدوال عملية إبدالية دائماً.",
      "يجب ضرب \\(f(4)\\) في \\(g(4)\\)."
    ],
    "correctReason": 0
  },
  {
    "t": "ms",
    "ti": "Examiner Mode: One-to-One Domain Restriction & Inverse (Quadratic Functions)",
    "ti_ar": "وضع المصحح: تقييد المجال وإيجاد الدالة العكسية (الدوال والمعادلات التربيعية)",
    "q": "Let \\(h(x) = (x - 4)^2 + 3\\) for \\(x \\ge 4\\). (a) State the range of \\(h\\) and explain why \\(h^{-1}\\) exists on \\(x \\ge 4\\). (b) Find \\(h^{-1}(x)\\) and state its domain.",
    "q_ar": "لتكن \\(h(x) = (x - 4)^2 + 3\\) حيث \\(x \\ge 4\\). (أ) اذكر مدى \\(h\\) وفسّر سبب وجود معكوس لها. (ب) أوجد \\(h^{-1}(x)\\) وحدد مجالها.",
    "parts": [
      {
        "label": "Part (a) — Range & Injectivity",
        "marks": 2,
        "rubric": [
          {
            "code": "B1",
            "marks": 1,
            "text": "Range of \\(h\\) is \\([ 3, \\infty )\\) since \\((x - 4)^2 \\ge 0\\)."
          },
          {
            "code": "B1",
            "marks": 1,
            "text": "For \\(x \\ge 4\\), \\(h\\) is strictly increasing (one-to-one / passes horizontal line test)."
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
            "text": "Solve \\(y = (x - 4)^2 + 3 \\implies x = 4 + \\sqrt{y - 3}\\) (choosing \\(+\\) branch for \\(x \\ge 4\\))."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "\\(h^{-1}(x) = 4 + \\sqrt{x - 3}\\) with domain \\(x \\ge 3\\)."
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
            "text": "مدى الدالة \\(h\\) هو \\([ 3, \\infty )\\) لأن \\((x - 4)^2 \\ge 0\\)."
          },
          {
            "code": "B1",
            "marks": 1,
            "text": "على الفترة \\(x \\ge 4\\) الدالة متزايدة تماماً (واحد لواحد)."
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
            "text": "حل المعادلة بدلالة \\(x\\) مع اختيار الفرع الموجب: \\(x = 4 + \\sqrt{y - 3}\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "\\(h^{-1}(x) = 4 + \\sqrt{x - 3}\\) ومجالها \\(x \\ge 3\\)."
          }
        ]
      }
    ]
  },
  {
    "t": "sb",
    "ti": "Step Builder: Composite & Inverse Function Evaluation (Quadratic Functions)",
    "ti_ar": "بناء الخطوات: حساب التركيب والمعكوس (الدوال والمعادلات التربيعية)",
    "steps": [
      {
        "l": "For \\(f(x) = 4x + 3\\) and \\(g(x) = x^2 + 1\\), find \\(g(4) =\\)",
        "a": "17",
        "h": "Compute 4² + 1."
      },
      {
        "l": "Now evaluate \\(f(g(4)) = f(17) =\\)",
        "a": "71",
        "h": "Compute 4×17 + 3."
      },
      {
        "l": "Evaluate \\(f^{-1}(15) =\\)",
        "a": "3",
        "h": "Solve 4x + 3 = 15."
      }
    ],
    "steps_ar": [
      {
        "l": "للدالتين \\(f(x) = 4x + 3\\) و\\(g(x) = x^2 + 1\\)، أوجد \\(g(4) =\\)",
        "a": "17",
        "h": "احسب 4² + 1."
      },
      {
        "l": "الآن احسب \\(f(g(4)) = f(17) =\\)",
        "a": "71",
        "h": "احسب 4×17 + 3."
      },
      {
        "l": "أوجد قيمة المعكوس \\(f^{-1}(15) =\\)",
        "a": "3",
        "h": "حل المعادلة 4x + 3 = 15."
      }
    ]
  },
  {
    "t": "qc",
    "ti": "Quick Check: Horizontal Shift Direction (Quadratic Functions)",
    "ti_ar": "فحص سريع: اتجاه الإزاحة الأفقية للدالة (الدوال والمعادلات التربيعية)",
    "q": "How is the graph of \\(y = f(x + 4) - 3\\) obtained from \\(y = f(x)\\)?",
    "q_ar": "كيف ينتج منحنى \\(y = f(x + 4) - 3\\) من منحنى \\(y = f(x)\\)؟",
    "o": [
      "Shift \\(4\\) units left and \\(3\\) units down",
      "Shift \\(4\\) units right and \\(3\\) units down",
      "Shift \\(4\\) units left and \\(3\\) units up",
      "Stretch horizontally by factor \\(4\\)"
    ],
    "o_ar": [
      "إزاحة \\(4\\) وحدات لليسار و\\(3\\) وحدات لأسفل",
      "إزاحة \\(4\\) وحدات لليمين و\\(3\\) وحدات لأسفل",
      "إزاحة \\(4\\) وحدات لليسار و\\(3\\) وحدات لأعلى",
      "تمدد أفقي بمعامل \\(4\\)"
    ],
    "a": 0,
    "ex": "Replacing \\(x\\) with \\(x + 4\\) shifts left by \\(4\\); subtracting \\(3\\) shifts down by \\(3\\).",
    "ex_ar": "استبدال \\(x\\) بـ \\(x + 4\\) يزيح لليسار بمقدار \\(4\\)، وطرح \\(3\\) يزيح لأسفل."
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
    "ti": "Spot the Error: Rational Cancelling & Asymptote Check (Exponents & Polynomials)",
    "ti_ar": "اكتشف الخطأ: اختصار العبارات النسبية وخطوط التقارب (الأسس وكثيرات الحدود)",
    "q": "A student simplifies \\(R(x) = \\dfrac{x^2 - 16}{x - 4}\\) and describes its graph. Which step contains a flaw?",
    "q_ar": "يبسّط طالب الدالة النسبية \\(R(x) = \\dfrac{x^2 - 16}{x - 4}\\) ويصف تمثيلها البياني. أي خطوة تتضمن خطأ؟",
    "steps": [
      "Note denominator restriction \\(x \\neq 4\\).",
      "Factor numerator as difference of squares: \\((x - 4)(x + 4)\\).",
      "Cancel \\((x - 4)\\) for \\(x \\neq 4\\) to get \\(y = x + 4\\).",
      "Conclude the graph has a vertical asymptote at \\(x = 4\\) rather than a removable hole at \\((4, 8)\\)."
    ],
    "steps_ar": [
      "تحديد شرط المقام \\(x \\neq 4\\).",
      "تحليل البسط كفرق بين مربعين \\((x - 4)(x + 4)\\).",
      "اختصار \\((x - 4)\\) بشرط \\(x \\neq 4\\) للحصول على \\(y = x + 4\\).",
      "الاستنتاج بوجود خط تقارب رأسي عند \\(x = 4\\) بدلاً من فجوة قابلة للإزالة عند \\((4, 8)\\)."
    ],
    "errorStep": 4,
    "reasons": [
      "Because the factor \\((x - 4)\\) cancels completely from the denominator, \\(x = 4\\) is a removable point discontinuity (hole) at \\((4, 8)\\), NOT a vertical asymptote.",
      "You cannot factor \\(x^2 - 16\\).",
      "The domain includes \\(x = 4\\)."
    ],
    "reasons_ar": [
      "لأن العامل \\((x - 4)\\) اختُصر بالكامل من المقام، فإن \\(x = 4\\) تمثل فجوة عند \\((4, 8)\\) وليست خط تقارب رأسي.",
      "لا يمكن تحليل \\(x^2 - 16\\).",
      "المجال يشمل \\(x = 4\\)."
    ],
    "correctReason": 0
  },
  {
    "t": "ms",
    "ti": "Examiner Mode: Partial Fractions Cover-Up Decomposition (Exponents & Polynomials)",
    "ti_ar": "وضع المصحح: تجزئة الكسور الجزئية (الأسس وكثيرات الحدود)",
    "q": "Express \\(\\dfrac{4x + 4}{(x - 4)(x + 6)}\\) in partial fractions \\(\\dfrac{A}{x - 4} + \\dfrac{B}{x + 6}\\). (a) Set up the polynomial identity. (b) Determine \\(A\\) and \\(B\\) by substitution.",
    "q_ar": "عبّر عن \\(\\dfrac{4x + 4}{(x - 4)(x + 6)}\\) في صورة كسور جزئية \\(\\dfrac{A}{x - 4} + \\dfrac{B}{x + 6}\\). (أ) اكتب المتطابقة المكافئة للبسط. (ب) أوجد قيمتي \\(A\\) و\\(B\\).",
    "parts": [
      {
        "label": "Part (a) — Clearing Denominators",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "Multiply through by \\((x - 4)(x + 6)\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "Identity: \\(4x + 4 \\equiv A(x + 6) + B(x - 4)\\)."
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
            "text": "Set \\(x = 4\\): \\(20 = A(10) \\implies A = 2\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "Set \\(x = -6\\): \\(-20 = B(-10) \\implies B = 2\\)."
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
            "text": "الضرب في \\((x - 4)(x + 6)\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "المتطابقة: \\(4x + 4 \\equiv A(x + 6) + B(x - 4)\\)."
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
            "text": "بوضع \\(x = 4\\): نجد \\(A = 2\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "بوضع \\(x = -6\\): نجد \\(B = 2\\)."
          }
        ]
      }
    ]
  },
  {
    "t": "sb",
    "ti": "Step Builder: Partial Fractions & Radical Exponents (Exponents & Polynomials)",
    "ti_ar": "بناء الخطوات: الكسور الجزئية والأسس الكسرية (الأسس وكثيرات الحدود)",
    "steps": [
      {
        "l": "In \\(4x + 4 \\equiv A(x + 6) + B(x - 4)\\), substitute \\(x = 4\\) to find \\(A =\\)",
        "a": "2",
        "h": "Divide (20) by (10)."
      },
      {
        "l": "Substitute \\(x = -6\\) to find \\(B =\\)",
        "a": "2",
        "h": "Divide (-20) by (−10)."
      },
      {
        "l": "Evaluate the rational exponent \\(8^{2/3} =\\)",
        "a": "4",
        "h": "(cube root of 8)² = 2²."
      }
    ],
    "steps_ar": [
      {
        "l": "في المتطابقة \\(4x + 4 \\equiv A(x + 6) + B(x - 4)\\)، عوّض \\(x = 4\\) لإيجاد \\(A =\\)",
        "a": "2",
        "h": "اقسم 20 على 10."
      },
      {
        "l": "عوّض \\(x = -6\\) لإيجاد \\(B =\\)",
        "a": "2",
        "h": "اقسم -20 على (−10)."
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
    "ti": "Matching: Rational Asymptotes & Exponent Laws (Exponents & Polynomials)",
    "ti_ar": "مطابقة: خطوط التقارب وقوانين الأسس والجذور (الأسس وكثيرات الحدود)",
    "p": [
      {
        "l": "Horizontal asymptote of \\(\\frac{4x^2 + 1}{x^2 - 4}\\)",
        "r": "\\(y = 4\\) (ratio of leading coefficients)"
      },
      {
        "l": "Vertical asymptote of \\(\\frac{1}{x - 4}\\)",
        "r": "\\(x = 4\\) (non-cancelled denominator zero)"
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
        "l": "خط التقارب الأفقي للدالة \\(\\frac{4x^2 + 1}{x^2 - 4}\\)",
        "r": "\\(y = 4\\) (نسبة المعاملين الرئيسين)"
      },
      {
        "l": "خط التقارب الرأسي للدالة \\(\\frac{1}{x - 4}\\)",
        "r": "\\(x = 4\\) (صفر المقام غير المختصر)"
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
        "h": "Evaluate the power \\(3^2\\) by multiplying \\(3\\) by itself \\(2\\) times.",
        "h_ar": "احسب القوة \\(3^2\\) بضرب \\(3\\) في نفسه \\(2\\) مرات."
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
    "ti": "Spot the Error: Composite Order & Inverse Domain (Functions & Transformations)",
    "ti_ar": "اكتشف الخطأ: ترتيب تركيب الدوال ومجال المعكوس (الدوال والتحويلات الهندسية)",
    "q": "Let \\(f(x) = 2x + 5\\) and \\(g(x) = x^2 + 1\\). A student evaluates \\((f \\circ g)(3)\\). Which step is wrong?",
    "q_ar": "لتكن \\(f(x) = 2x + 5\\) و\\(g(x) = x^2 + 1\\). يحسب طالب \\((f \\circ g)(3)\\). أي خطوة خاطئة؟",
    "steps": [
      "Write \\((f \\circ g)(3) = g(f(3))\\) by applying \\(f\\) first instead of \\(g\\).",
      "Compute \\(f(3) = 11\\).",
      "Square and add \\(1\\) to get \\(122\\)."
    ],
    "steps_ar": [
      "كتابة \\((f \\circ g)(3) = g(f(3))\\) بتطبيق \\(f\\) أولاً بدلاً من \\(g\\).",
      "حساب \\(f(3) = 11\\).",
      "التربيع وإضافة \\(1\\) للحصول على \\(122\\)."
    ],
    "errorStep": 1,
    "reasons": [
      "By definition \\((f \\circ g)(x) = f(g(x))\\): evaluate the inner function \\(g(3) = 10\\) first, then \\(f(10) = 25\\).",
      "Function composition is always commutative.",
      "You must multiply \\(f(3)\\) by \\(g(3)\\)."
    ],
    "reasons_ar": [
      "حسب التعريف \\((f \\circ g)(x) = f(g(x))\\): نحسب الدالة الداخلية أولاً \\(g(3) = 10\\) ثم \\(f(10) = 25\\).",
      "تركيب الدوال عملية إبدالية دائماً.",
      "يجب ضرب \\(f(3)\\) في \\(g(3)\\)."
    ],
    "correctReason": 0
  },
  {
    "t": "ms",
    "ti": "Examiner Mode: One-to-One Domain Restriction & Inverse (Functions & Transformations)",
    "ti_ar": "وضع المصحح: تقييد المجال وإيجاد الدالة العكسية (الدوال والتحويلات الهندسية)",
    "q": "Let \\(h(x) = (x - 2)^2 + 5\\) for \\(x \\ge 2\\). (a) State the range of \\(h\\) and explain why \\(h^{-1}\\) exists on \\(x \\ge 2\\). (b) Find \\(h^{-1}(x)\\) and state its domain.",
    "q_ar": "لتكن \\(h(x) = (x - 2)^2 + 5\\) حيث \\(x \\ge 2\\). (أ) اذكر مدى \\(h\\) وفسّر سبب وجود معكوس لها. (ب) أوجد \\(h^{-1}(x)\\) وحدد مجالها.",
    "parts": [
      {
        "label": "Part (a) — Range & Injectivity",
        "marks": 2,
        "rubric": [
          {
            "code": "B1",
            "marks": 1,
            "text": "Range of \\(h\\) is \\([ 5, \\infty )\\) since \\((x - 2)^2 \\ge 0\\)."
          },
          {
            "code": "B1",
            "marks": 1,
            "text": "For \\(x \\ge 2\\), \\(h\\) is strictly increasing (one-to-one / passes horizontal line test)."
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
            "text": "Solve \\(y = (x - 2)^2 + 5 \\implies x = 2 + \\sqrt{y - 5}\\) (choosing \\(+\\) branch for \\(x \\ge 2\\))."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "\\(h^{-1}(x) = 2 + \\sqrt{x - 5}\\) with domain \\(x \\ge 5\\)."
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
            "text": "مدى الدالة \\(h\\) هو \\([ 5, \\infty )\\) لأن \\((x - 2)^2 \\ge 0\\)."
          },
          {
            "code": "B1",
            "marks": 1,
            "text": "على الفترة \\(x \\ge 2\\) الدالة متزايدة تماماً (واحد لواحد)."
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
            "text": "حل المعادلة بدلالة \\(x\\) مع اختيار الفرع الموجب: \\(x = 2 + \\sqrt{y - 5}\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "\\(h^{-1}(x) = 2 + \\sqrt{x - 5}\\) ومجالها \\(x \\ge 5\\)."
          }
        ]
      }
    ]
  },
  {
    "t": "qc",
    "ti": "Quick Check: Horizontal Shift Direction (Functions & Transformations)",
    "ti_ar": "فحص سريع: اتجاه الإزاحة الأفقية للدالة (الدوال والتحويلات الهندسية)",
    "q": "How is the graph of \\(y = f(x + 2) - 5\\) obtained from \\(y = f(x)\\)?",
    "q_ar": "كيف ينتج منحنى \\(y = f(x + 2) - 5\\) من منحنى \\(y = f(x)\\)؟",
    "o": [
      "Shift \\(2\\) units left and \\(5\\) units down",
      "Shift \\(2\\) units right and \\(5\\) units down",
      "Shift \\(2\\) units left and \\(5\\) units up",
      "Stretch horizontally by factor \\(2\\)"
    ],
    "o_ar": [
      "إزاحة \\(2\\) وحدات لليسار و\\(5\\) وحدات لأسفل",
      "إزاحة \\(2\\) وحدات لليمين و\\(5\\) وحدات لأسفل",
      "إزاحة \\(2\\) وحدات لليسار و\\(5\\) وحدات لأعلى",
      "تمدد أفقي بمعامل \\(2\\)"
    ],
    "a": 0,
    "ex": "Replacing \\(x\\) with \\(x + 2\\) shifts left by \\(2\\); subtracting \\(5\\) shifts down by \\(5\\).",
    "ex_ar": "استبدال \\(x\\) بـ \\(x + 2\\) يزيح لليسار بمقدار \\(2\\)، وطرح \\(5\\) يزيح لأسفل."
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
    "ti": "Spot the Error: Logarithm Law Misapplication (Exponential & Logarithmic Functions)",
    "ti_ar": "اكتشف الخطأ: التطبيق الخاطئ لقوانين اللوغاريتمات (الدوال الأسية واللوغاريتمية)",
    "q": "A student attempts to solve \\(\\log_{5}(x) + \\log_{5}(5) = 4\\). Which step introduces an invalid rule?",
    "q_ar": "يحاول طالب حل المعادلة \\(\\log_{5}(x) + \\log_{5}(5) = 4\\). أي خطوة تتضمن قانوناً خاطئاً؟",
    "steps": [
      "Note the domain requirement \\(x > 0\\).",
      "Combine the sum of logarithms as \\(\\log_{5}(x + 5) = 4\\) instead of multiplying arguments.",
      "Exponentiate base \\(5\\) to write \\(x + 5 = 625\\).",
      "Subtract \\(5\\) to report \\(x = 620\\)."
    ],
    "steps_ar": [
      "تحديد شرط مجال اللوغاريتم \\(x > 0\\).",
      "دمج مجموع اللوغاريتمين في صورة \\(\\log_{5}(x + 5) = 4\\) بدلاً من ضرب ما بداخل اللوغاريتم.",
      "التحويل للصورة الأسية: \\(x + 5 = 625\\).",
      "طرح \\(5\\) للوصول إلى الناتج."
    ],
    "errorStep": 2,
    "reasons": [
      "The product rule states \\(\\log_b(M) + \\log_b(N) = \\log_b(MN)\\), NOT \\(\\log_b(M + N)\\); thus \\(\\log_{5}(5x) = 4 \\implies x = 125\\).",
      "The domain of \\(\\log(x)\\) is all real numbers.",
      "\\(\\log_{5}(5) = 0\\)."
    ],
    "reasons_ar": [
      "قاعدة الضرب تنص على أن \\(\\log_b(M) + \\log_b(N) = \\log_b(MN)\\) وليس جمع المداخل؛ ومنه \\(x = 125\\).",
      "مجال الدالة اللوغاريتمية هو جميع الأعداد الحقيقية.",
      "قيمة \\(\\log_{5}(5) = 0\\)."
    ],
    "correctReason": 0
  },
  {
    "t": "ms",
    "ti": "Examiner Mode: Logarithmic Equation & Continuous Growth (Exponential & Logarithmic Functions)",
    "ti_ar": "وضع المصحح: المعادلات اللوغاريتمية والنمو الأسي (الدوال الأسية واللوغاريتمية)",
    "q": "(a) Solve \\(\\log_{5}(x - 2) = 3\\), stating the domain restriction. (b) A culture grows via \\(P(t) = P_0 e^{rt}\\); find the exact doubling time \\(T_d\\) in terms of \\(r\\).",
    "q_ar": "(أ) حل المعادلة \\(\\log_{5}(x - 2) = 3\\) مع ذكر شرط المجال. (ب) تنمو عينة وفق \\(P(t) = P_0 e^{rt}\\)؛ أوجد زمن التضاعف \\(T_d\\) بدلالة \\(r\\).",
    "parts": [
      {
        "label": "Part (a) — Domain & Exponential Conversion",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "Domain \\(x > 2\\); convert to \\(x - 2 = 5^{3} = 125\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "\\(x = 127\\) (valid since \\(127 > 2\\))."
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
            "text": "المجال \\(x > 2\\)؛ والتحويل يعطي \\(x - 2 = 5^{3} = 125\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "\\(x = 127\\) (يحقق شرط المجال)."
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
    "ti": "Step Builder: Solving Logarithmic Equations (Exponential & Logarithmic Functions)",
    "ti_ar": "بناء الخطوات: حل المعادلة اللوغاريتمية (الدوال الأسية واللوغاريتمية)",
    "steps": [
      {
        "l": "Evaluate \\(5^{3} =\\)",
        "a": "125",
        "h": "Multiply 5 by itself 3 times."
      },
      {
        "l": "Solve \\(\\log_{5}(x - 2) = 3\\) for \\(x =\\)",
        "a": "127",
        "h": "Add 2 to 125."
      },
      {
        "l": "Evaluate \\(\\log_{5}(1) =\\)",
        "a": "0",
        "h": "Any base raised to 0 equals 1."
      }
    ],
    "steps_ar": [
      {
        "l": "احسب \\(5^{3} =\\)",
        "a": "125",
        "h": "اضرب 5 في نفسه 3 مرات."
      },
      {
        "l": "حل المعادلة \\(\\log_{5}(x - 2) = 3\\) لإيجاد \\(x =\\)",
        "a": "127",
        "h": "اجمع 2 مع 125."
      },
      {
        "l": "احسب قيمة \\(\\log_{5}(1) =\\)",
        "a": "0",
        "h": "أي أساس مرفوع للأس صفر يساوي 1."
      }
    ]
  },
  {
    "t": "mt",
    "ti": "Matching: Logarithm Laws & Asymptotes (Exponential & Logarithmic Functions)",
    "ti_ar": "مطابقة: قوانين اللوغاريتمات وخطوط التقارب (الدوال الأسية واللوغاريتمية)",
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
        "l": "Vertical asymptote of \\(\\ln(x - 2)\\)",
        "r": "\\(x = 2\\)"
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
        "l": "خط التقارب الرأسي للدالة \\(\\ln(x - 2)\\)",
        "r": "\\(x = 2\\)"
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
    "ti": "Spot the Error: Perpendicular Gradient & Inequality Sign (Systems & Inequalities)",
    "ti_ar": "اكتشف الخطأ: ميل المستقيم المتعامد وإشارة المتباينة (أنظمة المعادلات والمتباينات)",
    "q": "Given \\(A(3, 2)\\) and \\(B(5, 6)\\), a student finds the gradient of the line perpendicular to \\(AB\\). Which step is wrong?",
    "q_ar": "مُعطى النقطتان \\(A(3, 2)\\) و\\(B(5, 6)\\)، يحسب طالب ميل العمودي على \\(AB\\). أي خطوة خاطئة؟",
    "steps": [
      "Compute gradient of \\(AB\\): \\(m_{AB} = \\frac{6 - 2}{5 - 3} = \\frac{4}{2} = 2\\).",
      "Compute midpoint of \\(AB\\): \\(M = (4, 4)\\).",
      "Take the perpendicular gradient as the positive reciprocal \\(m_{\\perp} = \\frac{1}{2}\\) without negating the sign.",
      "Substitute \\(M(4, 4)\\) into point-slope form."
    ],
    "steps_ar": [
      "حساب ميل القطعة \\(AB\\): \\(m_{AB} = \\frac{6 - 2}{5 - 3} = 2\\).",
      "حساب نقطة المنتصف: \\(M = (4, 4)\\).",
      "أخذ ميل العمودي كمقلوب موجب \\(m_{\\perp} = \\frac{1}{2}\\) دون عكس الإشارة.",
      "التعويض بالنقطة \\(M(4, 4)\\) في معادلة المستقيم."
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
    "ti": "Examiner Mode: Line Equation & Perpendicular Bisector (Systems & Inequalities)",
    "ti_ar": "وضع المصحح: معادلة المستقيم والعمود المنصّف (أنظمة المعادلات والمتباينات)",
    "q": "Points \\(A(3, 2)\\) and \\(B(5, 6)\\) lie in the coordinate plane. (a) Find the equation of line \\(AB\\) in \\(y = mx + c\\) form. (b) Find the midpoint \\(M\\) and the gradient of the perpendicular bisector of \\(AB\\).",
    "q_ar": "النقطتان \\(A(3, 2)\\) و\\(B(5, 6)\\) في المستوى الإحداثي. (أ) أوجد معادلة المستقيم \\(AB\\) بصيغة \\(y = mx + c\\). (ب) أوجد نقطة المنتصف \\(M\\) وميل العمود المنصّف للقطعة \\(AB\\).",
    "parts": [
      {
        "label": "Part (a) — Gradient & Line Equation",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "Gradient \\(m = \\frac{6 - 2}{5 - 3} = 2\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "Intercept \\(c = 2 - 2(3) = -4\\), giving \\(y = 2x - 4\\)."
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
            "text": "Midpoint \\(M = \\left(\\frac{3+5}{2}, \\frac{2+6}{2}\\right) = (4, 4)\\)."
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
            "text": "الميل \\(m = \\frac{6 - 2}{5 - 3} = 2\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "المقطع الصادي \\(c = -4\\)، والمعادلة \\(y = 2x - 4\\)."
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
            "text": "نقطة المنتصف \\(M = (4, 4)\\)."
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
    "ti": "Step Builder: Coordinate Slope, Intercept & Midpoint (Systems & Inequalities)",
    "ti_ar": "بناء الخطوات: الميل والمقطع ونقطة المنتصف (أنظمة المعادلات والمتباينات)",
    "steps": [
      {
        "l": "Find the slope \\(m\\) through \\((3, 2)\\) and \\((5, 6)\\): \\(m =\\)",
        "a": "2",
        "h": "Compute (6 − 2) / (5 − 3)."
      },
      {
        "l": "Find the \\(y\\)-intercept \\(c\\) in \\(y = mx + c\\): \\(c =\\)",
        "a": "-4",
        "h": "Compute 2 − 2×3."
      },
      {
        "l": "Find the \\(y\\)-coordinate of the midpoint \\(M\\): \\(y_M =\\)",
        "a": "4",
        "h": "Average 2 and 6."
      }
    ],
    "steps_ar": [
      {
        "l": "أوجد الميل \\(m\\) للمستقيم المار بـ \\((3, 2)\\) و\\((5, 6)\\): \\(m =\\)",
        "a": "2",
        "h": "احسب (6 − 2) ÷ (5 − 3)."
      },
      {
        "l": "أوجد المقطع الصادي \\(c\\) في \\(y = mx + c\\): \\(c =\\)",
        "a": "-4",
        "h": "احسب 2 − 2×3."
      },
      {
        "l": "أوجد الإحداثي الصادي لنقطة المنتصف \\(M\\): \\(y_M =\\)",
        "a": "4",
        "h": "متوسط 2 و6."
      }
    ]
  },
  {
    "t": "mt",
    "ti": "Matching: Linear & Coordinate Geometry Criteria (Systems & Inequalities)",
    "ti_ar": "مطابقة: علاقات المستقيمات والهندسة الإحداثية (أنظمة المعادلات والمتباينات)",
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
    "ti": "Spot the Error: Infinite Geometric Series Convergence Check (Sequences & Series)",
    "ti_ar": "اكتشف الخطأ: شرط تقارب المتسلسلة الهندسية اللانهائية (المتتابعات والمتسلسلات)",
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
    "ti_ar": "وضع المصحح: المتتاليات الحسابية والهندسية المتقاربة (المتتابعات والمتسلسلات)",
    "q": "(a) A geometric series has first term \\(a = 18\\) and common ratio \\(r = \\frac{1}{3}\\). Verify convergence and find \\(S_\\infty\\). (b) An arithmetic progression has \\(u_1 = 18\\) and common difference \\(d = 6\\); find \\(u_{10}\\).",
    "q_ar": "(أ) متسلسلة هندسية حدها الأول \\(a = 18\\) وأساسها \\(r = \\frac{1}{3}\\). تحقق من التقارب وأوجد \\(S_\\infty\\). (ب) متتالية حسابية حدها الأول \\(18\\) وأساسها \\(d = 6\\)؛ أوجد الحد العاشر \\(u_{10}\\).",
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
            "text": "\\(u_{10} = 18 + 9(6) = 72\\)."
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
            "text": "\\(u_{10} = 18 + 9(6) = 72\\)."
          }
        ]
      }
    ]
  },
  {
    "t": "sb",
    "ti": "Step Builder: Geometric Sum to Infinity & AP Term (Sequences & Series)",
    "ti_ar": "بناء الخطوات: مجموع اللانهاية والحد النوني (المتتابعات والمتسلسلات)",
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
        "l": "In the AP with \\(u_1 = 18,\\; d = 6\\), find \\(u_{10} =\\)",
        "a": "72",
        "h": "Compute 18 + 9×6."
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
        "l": "في المتتالية الحسابية \\(u_1 = 18,\\; d = 6\\)، أوجد \\(u_{10} =\\)",
        "a": "72",
        "h": "احسب 18 + 9×6."
      }
    ]
  },
  {
    "t": "mt",
    "ti": "Matching: Sequence, Series & Expansion Formulas (Sequences & Series)",
    "ti_ar": "مطابقة: صيغ المتتاليات والمتسلسلات وذي الحدين (المتتابعات والمتسلسلات)",
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
    "ti": "Spot the Error: Vieta's Sum of Squares Identity (Factoring Polynomials)",
    "ti_ar": "اكتشف الخطأ: متطابقة فييت لمجموع مربعي الجذرين (تحليل كثيرات الحدود إلى عوامل)",
    "q": "For \\(x^2 - 6x + 5 = 0\\) with roots \\(\\alpha, \\beta\\), a student computes \\(\\alpha^2 + \\beta^2\\). Where is the error?",
    "q_ar": "للمعادلة \\(x^2 - 6x + 5 = 0\\) ذات الجذرين \\(\\alpha, \\beta\\)، يحسب طالب \\(\\alpha^2 + \\beta^2\\). أين الخطأ؟",
    "steps": [
      "Read Vieta's relations: \\(\\alpha + \\beta = 6\\) and \\(\\alpha\\beta = 5\\).",
      "Claim \\(\\alpha^2 + \\beta^2 = (\\alpha + \\beta)^2 = 36\\), omitting \\(-2\\alpha\\beta\\).",
      "State \\(36\\) as the value of \\(\\alpha^2 + \\beta^2\\)."
    ],
    "steps_ar": [
      "استخراج علاقات فييت: \\(\\alpha + \\beta = 6\\) و\\(\\alpha\\beta = 5\\).",
      "الادعاء بأن \\(\\alpha^2 + \\beta^2 = (\\alpha + \\beta)^2 = 36\\) وإغفال الحد \\(-2\\alpha\\beta\\).",
      "اعتماد \\(36\\) قيمة نهائية."
    ],
    "errorStep": 2,
    "reasons": [
      "Because \\((\\alpha + \\beta)^2 = \\alpha^2 + 2\\alpha\\beta + \\beta^2\\), the exact identity is \\(\\alpha^2 + \\beta^2 = (\\alpha + \\beta)^2 - 2\\alpha\\beta = 36 - 10 = 26\\).",
      "Vieta gives \\(\\alpha + \\beta = -6\\).",
      "\\(\\alpha\\beta\\) must be squared before subtracting."
    ],
    "reasons_ar": [
      "لأن \\((\\alpha + \\beta)^2 = \\alpha^2 + 2\\alpha\\beta + \\beta^2\\)، فالمتطابقة الصحيحة هي \\(\\alpha^2 + \\beta^2 = (\\alpha + \\beta)^2 - 2\\alpha\\beta = 26\\).",
      "مجموع الجذرين يساوي \\(-6\\).",
      "يجب تربيع \\(\\alpha\\beta\\) قبل الطرح."
    ],
    "correctReason": 0
  },
  {
    "t": "ms",
    "ti": "Examiner Mode: Discriminant, Vieta & Factor Theorem (Factoring Polynomials)",
    "ti_ar": "وضع المصحح: المميز وعلاقات فييت ونظرية العامل (تحليل كثيرات الحدود إلى عوامل)",
    "q": "Consider \\(P(x) = x^2 - 6x + 5\\) with roots \\(\\alpha, \\beta\\). (a) Compute the discriminant \\(\\Delta\\) and verify \\(P(1) = 0\\). (b) Evaluate \\(\\alpha^2 + \\beta^2\\) using symmetric sums.",
    "q_ar": "لتكن \\(P(x) = x^2 - 6x + 5\\) وجذراها \\(\\alpha, \\beta\\). (أ) احسب المميز \\(\\Delta\\) وتحقق أن \\(P(1) = 0\\). (ب) أوجد قيمة \\(\\alpha^2 + \\beta^2\\) باستعمال المجاميع المتماثلة.",
    "parts": [
      {
        "label": "Part (a) — Discriminant & Factor Check",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "\\(\\Delta = (-6)^2 - 4(1)(5) = 16 > 0\\) (two distinct real roots)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "\\(P(1) = 1 - 6 + 5 = 0\\), confirming \\((x - 1)\\) is a factor."
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
            "text": "\\(\\alpha + \\beta = 6,\\; \\alpha\\beta = 5\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "\\(\\alpha^2 + \\beta^2 = 6^2 - 2(5) = 26\\)."
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
            "text": "\\(\\Delta = (-6)^2 - 4(1)(5) = 16 > 0\\) (جذران حقيقيان مختلفان)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "\\(P(1) = 0\\)، مما يؤكد أن \\((x - 1)\\) عامل لكثيرة الحدود."
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
            "text": "\\(\\alpha + \\beta = 6,\\; \\alpha\\beta = 5\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "\\(\\alpha^2 + \\beta^2 = 6^2 - 2(5) = 26\\)."
          }
        ]
      }
    ]
  },
  {
    "t": "sb",
    "ti": "Step Builder: Vieta Relations & Remainder Theorem (Factoring Polynomials)",
    "ti_ar": "بناء الخطوات: علاقات فييت ونظرية الباقي (تحليل كثيرات الحدود إلى عوامل)",
    "steps": [
      {
        "l": "For \\(x^2 - 6x + 5 = 0\\), find \\(\\alpha + \\beta =\\)",
        "a": "6",
        "h": "Use −b/a."
      },
      {
        "l": "Find the product of roots \\(\\alpha\\beta =\\)",
        "a": "5",
        "h": "Use c/a."
      },
      {
        "l": "Compute \\(\\alpha^2 + \\beta^2 = (\\alpha + \\beta)^2 - 2\\alpha\\beta =\\)",
        "a": "26",
        "h": "Compute 36 − 10."
      }
    ],
    "steps_ar": [
      {
        "l": "للمعادلة \\(x^2 - 6x + 5 = 0\\)، أوجد \\(\\alpha + \\beta =\\)",
        "a": "6",
        "h": "استعمل −b/a."
      },
      {
        "l": "أوجد حاصل ضرب الجذرين \\(\\alpha\\beta =\\)",
        "a": "5",
        "h": "استعمل c/a."
      },
      {
        "l": "احسب \\(\\alpha^2 + \\beta^2 = (\\alpha + \\beta)^2 - 2\\alpha\\beta =\\)",
        "a": "26",
        "h": "احسب 36 − 10."
      }
    ]
  },
  {
    "t": "mt",
    "ti": "Matching: Polynomial & Quadratic Theorems (Factoring Polynomials)",
    "ti_ar": "مطابقة: نظريات المعادلات التربيعية وكثيرات الحدود (تحليل كثيرات الحدود إلى عوامل)",
    "p": [
      {
        "l": "Remainder when \\(P(x)\\) is divided by \\((x - 1)\\)",
        "r": "\\(P(1)\\)"
      },
      {
        "l": "Tangent line–parabola condition",
        "r": "System discriminant \\(\\Delta = b^2 - 4ac = 0\\)"
      },
      {
        "l": "Sum & product in \\(x^2 - 6x + 5 = 0\\)",
        "r": "\\(\\alpha + \\beta = 6,\\; \\alpha\\beta = 5\\)"
      },
      {
        "l": "Axis of symmetry of \\(ax^2 + bx + c\\)",
        "r": "\\(x = -\\frac{b}{2a}\\)"
      }
    ],
    "p_ar": [
      {
        "l": "باقي قسمة \\(P(x)\\) على \\((x - 1)\\)",
        "r": "\\(P(1)\\)"
      },
      {
        "l": "شرط تماس مستقيم مع قطع مكافئ",
        "r": "مميز النظام المشترك \\(\\Delta = b^2 - 4ac = 0\\)"
      },
      {
        "l": "مجموع وضرب جذري \\(x^2 - 6x + 5 = 0\\)",
        "r": "\\(\\alpha + \\beta = 6,\\; \\alpha\\beta = 5\\)"
      },
      {
        "l": "معادلة محور التماثل لـ \\(ax^2 + bx + c\\)",
        "r": "\\(x = -\\frac{b}{2a}\\)"
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
    "ti": "Spot the Error: Rational Cancelling & Asymptote Check (Radicals & Exponents)",
    "ti_ar": "اكتشف الخطأ: اختصار العبارات النسبية وخطوط التقارب (الجذور والأسس الكسرية)",
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
    "ti": "Examiner Mode: Partial Fractions Cover-Up Decomposition (Radicals & Exponents)",
    "ti_ar": "وضع المصحح: تجزئة الكسور الجزئية (الجذور والأسس الكسرية)",
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
    "ti": "Step Builder: Partial Fractions & Radical Exponents (Radicals & Exponents)",
    "ti_ar": "بناء الخطوات: الكسور الجزئية والأسس الكسرية (الجذور والأسس الكسرية)",
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
    "ti": "Matching: Rational Asymptotes & Exponent Laws (Radicals & Exponents)",
    "ti_ar": "مطابقة: خطوط التقارب وقوانين الأسس والجذور (الجذور والأسس الكسرية)",
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
    "ti": "Spot the Error: Rational Cancelling & Asymptote Check (Rational Expressions)",
    "ti_ar": "اكتشف الخطأ: اختصار العبارات النسبية وخطوط التقارب (العبارات والمعادلات النسبية)",
    "q": "A student simplifies \\(R(x) = \\dfrac{x^2 - 9}{x - 3}\\) and describes its graph. Which step contains a flaw?",
    "q_ar": "يبسّط طالب الدالة النسبية \\(R(x) = \\dfrac{x^2 - 9}{x - 3}\\) ويصف تمثيلها البياني. أي خطوة تتضمن خطأ؟",
    "steps": [
      "Note denominator restriction \\(x \\neq 3\\).",
      "Factor numerator as difference of squares: \\((x - 3)(x + 3)\\).",
      "Cancel \\((x - 3)\\) for \\(x \\neq 3\\) to get \\(y = x + 3\\).",
      "Conclude the graph has a vertical asymptote at \\(x = 3\\) rather than a removable hole at \\((3, 6)\\)."
    ],
    "steps_ar": [
      "تحديد شرط المقام \\(x \\neq 3\\).",
      "تحليل البسط كفرق بين مربعين \\((x - 3)(x + 3)\\).",
      "اختصار \\((x - 3)\\) بشرط \\(x \\neq 3\\) للحصول على \\(y = x + 3\\).",
      "الاستنتاج بوجود خط تقارب رأسي عند \\(x = 3\\) بدلاً من فجوة قابلة للإزالة عند \\((3, 6)\\)."
    ],
    "errorStep": 4,
    "reasons": [
      "Because the factor \\((x - 3)\\) cancels completely from the denominator, \\(x = 3\\) is a removable point discontinuity (hole) at \\((3, 6)\\), NOT a vertical asymptote.",
      "You cannot factor \\(x^2 - 9\\).",
      "The domain includes \\(x = 3\\)."
    ],
    "reasons_ar": [
      "لأن العامل \\((x - 3)\\) اختُصر بالكامل من المقام، فإن \\(x = 3\\) تمثل فجوة عند \\((3, 6)\\) وليست خط تقارب رأسي.",
      "لا يمكن تحليل \\(x^2 - 9\\).",
      "المجال يشمل \\(x = 3\\)."
    ],
    "correctReason": 0
  },
  {
    "t": "ms",
    "ti": "Examiner Mode: Partial Fractions Cover-Up Decomposition (Rational Expressions)",
    "ti_ar": "وضع المصحح: تجزئة الكسور الجزئية (العبارات والمعادلات النسبية)",
    "q": "Express \\(\\dfrac{6x + 6}{(x - 3)(x + 5)}\\) in partial fractions \\(\\dfrac{A}{x - 3} + \\dfrac{B}{x + 5}\\). (a) Set up the polynomial identity. (b) Determine \\(A\\) and \\(B\\) by substitution.",
    "q_ar": "عبّر عن \\(\\dfrac{6x + 6}{(x - 3)(x + 5)}\\) في صورة كسور جزئية \\(\\dfrac{A}{x - 3} + \\dfrac{B}{x + 5}\\). (أ) اكتب المتطابقة المكافئة للبسط. (ب) أوجد قيمتي \\(A\\) و\\(B\\).",
    "parts": [
      {
        "label": "Part (a) — Clearing Denominators",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "Multiply through by \\((x - 3)(x + 5)\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "Identity: \\(6x + 6 \\equiv A(x + 5) + B(x - 3)\\)."
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
            "text": "Set \\(x = 3\\): \\(24 = A(8) \\implies A = 3\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "Set \\(x = -5\\): \\(-24 = B(-8) \\implies B = 3\\)."
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
            "text": "الضرب في \\((x - 3)(x + 5)\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "المتطابقة: \\(6x + 6 \\equiv A(x + 5) + B(x - 3)\\)."
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
            "text": "بوضع \\(x = 3\\): نجد \\(A = 3\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "بوضع \\(x = -5\\): نجد \\(B = 3\\)."
          }
        ]
      }
    ]
  },
  {
    "t": "sb",
    "ti": "Step Builder: Partial Fractions & Radical Exponents (Rational Expressions)",
    "ti_ar": "بناء الخطوات: الكسور الجزئية والأسس الكسرية (العبارات والمعادلات النسبية)",
    "steps": [
      {
        "l": "In \\(6x + 6 \\equiv A(x + 5) + B(x - 3)\\), substitute \\(x = 3\\) to find \\(A =\\)",
        "a": "3",
        "h": "Divide (24) by (8)."
      },
      {
        "l": "Substitute \\(x = -5\\) to find \\(B =\\)",
        "a": "3",
        "h": "Divide (-24) by (−8)."
      },
      {
        "l": "Evaluate the rational exponent \\(8^{2/3} =\\)",
        "a": "4",
        "h": "(cube root of 8)² = 2²."
      }
    ],
    "steps_ar": [
      {
        "l": "في المتطابقة \\(6x + 6 \\equiv A(x + 5) + B(x - 3)\\)، عوّض \\(x = 3\\) لإيجاد \\(A =\\)",
        "a": "3",
        "h": "اقسم 24 على 8."
      },
      {
        "l": "عوّض \\(x = -5\\) لإيجاد \\(B =\\)",
        "a": "3",
        "h": "اقسم -24 على (−8)."
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
    "ti": "Matching: Rational Asymptotes & Exponent Laws (Rational Expressions)",
    "ti_ar": "مطابقة: خطوط التقارب وقوانين الأسس والجذور (العبارات والمعادلات النسبية)",
    "p": [
      {
        "l": "Horizontal asymptote of \\(\\frac{6x^2 + 1}{x^2 - 3}\\)",
        "r": "\\(y = 6\\) (ratio of leading coefficients)"
      },
      {
        "l": "Vertical asymptote of \\(\\frac{1}{x - 3}\\)",
        "r": "\\(x = 3\\) (non-cancelled denominator zero)"
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
        "l": "خط التقارب الأفقي للدالة \\(\\frac{6x^2 + 1}{x^2 - 3}\\)",
        "r": "\\(y = 6\\) (نسبة المعاملين الرئيسين)"
      },
      {
        "l": "خط التقارب الرأسي للدالة \\(\\frac{1}{x - 3}\\)",
        "r": "\\(x = 3\\) (صفر المقام غير المختصر)"
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
    "ti": "Spot the Error: Variance of Difference of Independent Variables (Statistics & Data Analysis)",
    "ti_ar": "اكتشف الخطأ: تباين الفرق بين متغيرين عشوائيين مستقلين (الإحصاء وتحليل البيانات)",
    "q": "Independent random variables \\(X\\) and \\(Y\\) have \\(\\operatorname{Var}(X) = 5\\) and \\(\\operatorname{Var}(Y) = 6\\). A student computes \\(\\operatorname{Var}(X - Y)\\). Which step is invalid?",
    "q_ar": "متغيران عشوائيان مستقلان \\(X\\) و\\(Y\\) تبايناهما \\(\\operatorname{Var}(X) = 5\\) و\\(\\operatorname{Var}(Y) = 6\\). يحسب طالب \\(\\operatorname{Var}(X - Y)\\). أي خطوة خاطئة؟",
    "steps": [
      "Verify that \\(X\\) and \\(Y\\) are statistically independent (\\(\\operatorname{Cov}(X,Y) = 0\\)).",
      "Subtract the variances directly: \\(\\operatorname{Var}(X - Y) = 5 - 6 = -1\\).",
      "Take square root for standard deviation."
    ],
    "steps_ar": [
      "التحقق من استقلال \\(X\\) و\\(Y\\) إحصائياً.",
      "طرح التباينين مباشرة: \\(\\operatorname{Var}(X - Y) = 5 - 6 = -1\\).",
      "أخذ الجذر التربيعي لإيجاد الانحراف المعياري."
    ],
    "errorStep": 2,
    "reasons": [
      "Because coefficients square in variance, \\(\\operatorname{Var}(X - Y) = 1^2\\operatorname{Var}(X) + (-1)^2\\operatorname{Var}(Y) = 5 + 6 = 11\\) — independent variances ALWAYS add.",
      "\\(\\operatorname{Var}(X - Y)\\) equals \\(\\operatorname{Var}(X) \\cdot \\operatorname{Var}(Y)\\).",
      "Expected values cannot be subtracted."
    ],
    "reasons_ar": [
      "لأن المعاملات تُربَّع في التباين: \\(\\operatorname{Var}(X - Y) = \\operatorname{Var}(X) + (-1)^2\\operatorname{Var}(Y) = 11\\) — التباينات المستقلة تُجمع دائماً.",
      "التباين يساوي حاصل ضرب التباينين.",
      "لا يجوز طرح التوقعات الرياضية."
    ],
    "correctReason": 0
  },
  {
    "t": "ms",
    "ti": "Examiner Mode: Standard Error, Variance & Conditional Probability (Statistics & Data Analysis)",
    "ti_ar": "وضع المصحح: الخطأ المعياري والتباين والاحتمال الشرطي (الإحصاء وتحليل البيانات)",
    "q": "(a) A population has standard deviation \\(\\sigma = 40\\). For a simple random sample of size \\(n = 100\\), find the standard error \\(\\sigma_{\\bar{x}}\\) and state what happens to \\(\\sigma_{\\bar{x}}\\) if \\(n\\) quadruples. (b) Independent \\(X, Y\\) have \\(\\operatorname{Var}(X) = 5,\\; \\operatorname{Var}(Y) = 6\\); compute \\(\\operatorname{Var}(2X - Y)\\).",
    "q_ar": "(أ) مجتمع انحرافه المعياري \\(\\sigma = 40\\). لعينة عشوائية حجمها \\(n = 100\\)، احسب الخطأ المعياري \\(\\sigma_{\\bar{x}}\\) واذكر ماذا يحدث له عند مضاعفة \\(n\\) أربع مرات. (ب) للمتغيرين المستقلين \\(X, Y\\) حيث \\(\\operatorname{Var}(X) = 5,\\; \\operatorname{Var}(Y) = 6\\)، احسب \\(\\operatorname{Var}(2X - Y)\\).",
    "parts": [
      {
        "label": "Part (a) — Sampling Distribution Standard Error",
        "marks": 2,
        "rubric": [
          {
            "code": "A1",
            "marks": 1,
            "text": "\\(\\sigma_{\\bar{x}} = \\dfrac{\\sigma}{\\sqrt{n}} = \\dfrac{40}{\\sqrt{100}} = \\dfrac{40}{10} = 4\\)."
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
            "text": "\\(4(5) + 6 = 26\\)."
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
            "text": "\\(\\sigma_{\\bar{x}} = \\dfrac{40}{\\sqrt{100}} = 4\\)."
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
            "text": "الناتج: \\(4(5) + 6 = 26\\)."
          }
        ]
      }
    ]
  },
  {
    "t": "sb",
    "ti": "Step Builder: Standard Error & Independent Variance (Statistics & Data Analysis)",
    "ti_ar": "بناء الخطوات: الخطأ المعياري وتباين المتغيرات المستقلة (الإحصاء وتحليل البيانات)",
    "steps": [
      {
        "l": "Compute \\(\\sqrt{n}\\) for sample size \\(n = 100\\):",
        "a": "10",
        "h": "Square root of 100."
      },
      {
        "l": "Find standard error \\(\\sigma / \\sqrt{n}\\) when \\(\\sigma = 40\\):",
        "a": "4",
        "h": "Divide 40 by 10."
      },
      {
        "l": "For independent \\(\\operatorname{Var}(X) = 5,\\; \\operatorname{Var}(Y) = 6\\), find \\(\\operatorname{Var}(X - Y) =\\)",
        "a": "11",
        "h": "Add 5 + 6."
      }
    ],
    "steps_ar": [
      {
        "l": "احسب \\(\\sqrt{n}\\) لحجم العينة \\(n = 100\\):",
        "a": "10",
        "h": "الجذر التربيعي للعدد 100."
      },
      {
        "l": "أوجد الخطأ المعياري \\(\\sigma / \\sqrt{n}\\) عندما \\(\\sigma = 40\\):",
        "a": "4",
        "h": "اقسم 40 على 10."
      },
      {
        "l": "للمتغيرين المستقلين \\(\\operatorname{Var}(X) = 5,\\; \\operatorname{Var}(Y) = 6\\)، احسب \\(\\operatorname{Var}(X - Y) =\\)",
        "a": "11",
        "h": "اجمع 5 + 6."
      }
    ]
  },
  {
    "t": "mt",
    "ti": "Matching: Probability, Distributions & Inference Rules (Statistics & Data Analysis)",
    "ti_ar": "مطابقة: قوانين الاحتمالات والتوزيعات والاستدلال (الإحصاء وتحليل البيانات)",
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
});
