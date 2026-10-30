/* Interactive Practice data for /geo/ - one entry per chapter section id.
   Shipped as public/js/ix/geo.js and loaded only on that track's page by the
   engine in src/scripts/modules/19-interactive-activities-engine-v1.js
   (Plan 5 Phase 5.015, ADR 0033). Entry shapes (qc/mt/tf/sb/sr/fn/num/ord/cat/gp/se/ms) are
   documented there. */
(window.__ixData = window.__ixData || []).push(function (D) {
D["geo-foundations"] = [
  {
    "t": "sr",
    "ti": "Worked Example: Write a Converse Statement",
    "ti_ar": "مثال محلول: كتابة العكس الشرطي",
    "steps": [
      "A conditional statement has the form \"If P, then Q.\" Here take: \"If a shape is a square, then it has four right angles.\" \\(P\\)=\"is a square\", \\(Q\\)=\"has four right angles.\"",
      "The converse swaps P and Q: \"If Q, then P.\"",
      "Converse: \"If a shape has four right angles, then it is a square.\"",
      "Notice this converse is actually <em>false</em> (a rectangle has four right angles but isn't always a square) — a reminder that a converse isn't automatically true just because the original statement is."
    ],
    "steps_ar": [
      "العبارة الشرطية تكون على الصورة \"إذا كان P، فإن Q\". على سبيل المثال: \"إذا كان الشكل مربعاً، فإن له أربع زوايا قائمة\". هنا الفرض \\(P\\)=\"الشكل مربع\"، والنتيجة \\(Q\\)=\"له أربع زوايا قائمة\".",
      "عكس العبارة الشرطية يبدل بين الفرض والنتيجة: \"إذا كان Q، فإن P\".",
      "العكس هو: \"إذا كان للشكل أربع زوايا قائمة، فإنه مربع\".",
      "لاحظ أن هذا العكس <em>خاطئ</em> (فالمستطيل له أربع زوايا قائمة ولكنه ليس بالضرورة مربعاً) — وهذا تذكير بأن عكس العبارة الشرطية ليس بالضرورة صائباً لمجرد أن العبارة الأصلية صائبة."
    ]
  },
  {
    "t": "qc",
    "ti": "Quick Check: Geometric Reasoning",
    "ti_ar": "فحص سريع: التبرير الهندسي",
    "q": "What do we call a statement accepted as true without proof?",
    "q_ar": "ماذا نُسمي العبارة الرياضية التي تُقبل على أنها صحيحة دون برهان؟",
    "o": [
      "Postulate",
      "Theorem",
      "Corollary",
      "Converse"
    ],
    "o_ar": [
      "مسلّمة (بديهية)",
      "نظرية",
      "نتيجة (مبرهنة)",
      "عكس العبارة"
    ],
    "a": 0,
    "ex": "A postulate (or axiom) is assumed true as a starting point; a theorem must be proved from postulates.",
    "ex_ar": "المسلّمة أو البديهية تُفترض صحيحة كنقطة انطلاق؛ بينما النظرية يجب إثباتها بناءً على المسلمات."
  },
  {
    "t": "num",
    "ti": "Find Complementary Angle",
    "ti_ar": "إيجاد قياس الزاوية المتممة",
    "q": "Two angles are complementary. If one angle measures \\(38^{\\circ}\\), what is the measure of the other angle in degrees?",
    "q_ar": "زاويتان متتامتان. إذا كان قياس إحداهما \\(38^{\\circ}\\)، فما قياس الزاوية الأخرى بالدرجات؟",
    "a": 52,
    "tol": 0.001,
    "h": "Complementary angles sum to 90 degrees.",
    "h_ar": "مجموع قياسي الزاويتين المتتامتين يساوي 90 درجة.",
    "sol": "90 - 38 = 52 degrees.",
    "sol_ar": "90 - 38 = 52 درجة."
  },
  {
    "t": "ord",
    "ti": "Order the Steps: Linear Pair Algebraic Solution",
    "ti_ar": "رتّب الخطوات: حل الزاويتين المتجاورتين على مستقيم جبرياً",
    "q": "Arrange the steps to find angle measures for a linear pair with angles (4x + 12)° and (2x + 18)°:",
    "q_ar": "رتب خطوات إيجاد قياس الزاويتين المتجاورتين على مستقيم (4x + 12)° و (2x + 18)°:",
    "items": [
      "Set the sum of the linear pair to 180°: (4x + 12) + (2x + 18) = 180",
      "Combine like terms: 6x + 30 = 180",
      "Subtract 30 from both sides: 6x = 150",
      "Divide by 6 to solve for x: x = 25",
      "Substitute x = 25 back to find the smaller angle: 2(25) + 18 = 68°"
    ],
    "items_ar": [
      "مساواة مجموع الزاويتين المتكاملتين بـ 180°: (4x + 12) + (2x + 18) = 180",
      "تجميع الحدود المتشابهة: 6x + 30 = 180",
      "طرح 30 من كلا الطرفين: 6x = 150",
      "القسمة على 6 لإيجاد قيمة x: x = 25",
      "التعويض بـ x = 25 لإيجاد قياس الزاوية الصغرى: 2(25) + 18 = 68°"
    ],
    "sol": "Linear pairs are supplementary (sum to 180°). Solving for x allows evaluating both individual angles.",
    "sol_ar": "الزاويتان المتجاورتان على خط مستقيم متكاملتان (مجموعهما 180°)، وإيجاد قيمة x يمكننا من حساب قياس كل منهما."
  },
  {
    "t": "cat",
    "ti": "Classify Angle Pairs: Complementary vs. Supplementary",
    "ti_ar": "تصنيف أزواج الزوايا: متتامة مقابل متكاملة",
    "categories": [
      "Complementary (Sum = 90°)",
      "Supplementary (Sum = 180°)"
    ],
    "categories_ar": [
      "زاويتان متتامتان (مجموعهما = 90°)",
      "زاويتان متكاملتان (مجموعهما = 180°)"
    ],
    "items": [
      {
        "s": "35° and 55°",
        "s_ar": "35° و 55°",
        "cat": 0
      },
      {
        "s": "42° and 48°",
        "s_ar": "42° و 48°",
        "cat": 0
      },
      {
        "s": "110° and 70°",
        "s_ar": "110° و 70°",
        "cat": 1
      },
      {
        "s": "135° and 45°",
        "s_ar": "135° و 45°",
        "cat": 1
      },
      {
        "s": "Linear pair of adjacent angles on a line",
        "s_ar": "زاويتان متجاورتان على خط مستقيم",
        "cat": 1
      }
    ],
    "sol": "Angles summing to 90° are complementary; angles summing to 180° are supplementary.",
    "sol_ar": "الزاويتان اللتان مجموعهما 90° متتامتان؛ واللتان مجموعهما 180° متكاملتان."
  },
  {
    "t": "se",
    "ti": "Spot the Error: Area & Volume Similarity Scaling (Foundations & Reasoning)",
    "ti_ar": "اكتشف الخطأ: معامل تشابه المساحات والحجوم (الأسس الهندسية والاستدلال المنطقي والبراهين)",
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
    "ti": "Examiner Mode: Circle Theorems, Sectors & Similarity (Foundations & Reasoning)",
    "ti_ar": "وضع المصحح: نظريات الدائرة والقطاعات والتشابه (الأسس الهندسية والاستدلال المنطقي والبراهين)",
    "q": "A circle has equation \\((x - 3)^2 + (y + 2)^2 = 64\\). (a) State its center and radius \\(r\\). (b) A sector of this circle subtends \\(\\theta = \\frac{\\pi}{2}\\) radians; find exact arc length and sector area in terms of \\(\\pi\\).",
    "q_ar": "دائرة معادلتها \\((x - 3)^2 + (y + 2)^2 = 64\\). (أ) اذكر المركز ونصف القطر \\(r\\). (ب) قطاع في هذه الدائرة زاويته المركزية \\(\\theta = \\frac{\\pi}{2}\\) راديان؛ أوجد طول القوس ومساحة القطاع بدلالة \\(\\pi\\).",
    "parts": [
      {
        "label": "Part (a) — Circle Center & Radius",
        "marks": 2,
        "rubric": [
          {
            "code": "B1",
            "marks": 1,
            "text": "Center \\((h, k) = (3, -2)\\)."
          },
          {
            "code": "B1",
            "marks": 1,
            "text": "Radius \\(r = \\sqrt{64} = 8\\)."
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
            "text": "Arc length \\(s = r\\theta = 8 \\cdot \\frac{\\pi}{2} = 4\\pi\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "Sector area \\(A = \\frac{1}{2} r^2 \\theta = \\frac{1}{2}(64)\\frac{\\pi}{2} = 16\\pi\\)."
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
            "text": "المركز \\((3, -2)\\)."
          },
          {
            "code": "B1",
            "marks": 1,
            "text": "نصف القطر \\(r = \\sqrt{64} = 8\\)."
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
            "text": "طول القوس \\(s = r\\theta = 4\\pi\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "مساحة القطاع \\(A = \\frac{1}{2} r^2 \\theta = 16\\pi\\)."
          }
        ]
      }
    ]
  },
  {
    "t": "sb",
    "ti": "Step Builder: Circle Radius, Polygon Angles & Similarity (Foundations & Reasoning)",
    "ti_ar": "بناء الخطوات: الدائرة وزوايا المضلعات والتشابه (الأسس الهندسية والاستدلال المنطقي والبراهين)",
    "steps": [
      {
        "l": "From \\((x - 3)^2 + (y + 2)^2 = 64\\), find the radius \\(r =\\)",
        "a": "8",
        "h": "Take the square root of 64."
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
        "l": "من المعادلة \\((x - 3)^2 + (y + 2)^2 = 64\\)، أوجد نصف القطر \\(r =\\)",
        "a": "8",
        "h": "خذ الجذر التربيعي للعدد 64."
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
    "ti": "Matching: Circle Theorems & Solid Mensuration (Foundations & Reasoning)",
    "ti_ar": "مطابقة: نظريات الدائرة وقوانين القياس الهندسي (الأسس الهندسية والاستدلال المنطقي والبراهين)",
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
D["geo-lines"] = [
  {
    "t": "qc",
    "ti": "Quick Check: Parallel Lines",
    "ti_ar": "فحص سريع: المستقيمات المتوازية",
    "q": "Co-interior angles between parallel lines sum to:",
    "q_ar": "مجموع الزاويتين الداخليتين المتحالفتين بين مستقيمين متوازيين يساوي:",
    "o": [
      "90°",
      "180°",
      "270°",
      "360°"
    ],
    "o_ar": [
      "90°",
      "180°",
      "270°",
      "360°"
    ],
    "a": 1,
    "ex": "Supplementary angles — sum to \\(180°\\).",
    "ex_ar": "زاويتان متكاملتان — مجموعهما \\(180°\\)."
  },
  {
    "t": "mt",
    "ti": "Matching: Angle Relationships",
    "ti_ar": "مطابقة: علاقات الزوايا الناتجة عن قاطع",
    "p": [
      {
        "l": "Alternate interior angles",
        "l_ar": "زاويتان متبادلتان داخلياً",
        "r": "Equal: the Z shape",
        "r_ar": "متطابقتان: على شكل حرف Z"
      },
      {
        "l": "Corresponding angles",
        "l_ar": "زاويتان متناظرتان",
        "r": "Equal: the F shape",
        "r_ar": "متطابقتان: على شكل حرف F"
      },
      {
        "l": "Co-interior (consecutive)",
        "l_ar": "زاويتان متحالفتان (داخليتان)",
        "r": "Supplementary, sum 180°: the C shape",
        "r_ar": "متكاملتان مجموعهما 180°: على شكل حرف C"
      },
      {
        "l": "Vertical angles",
        "l_ar": "زاويتان متقابلتان بالرأس",
        "r": "Equal: opposite each other at an X",
        "r_ar": "متطابقتان: متقابلتان عند تقاطع X"
      }
    ]
  },
  {
    "t": "ord",
    "ti": "Order the Steps: Solve for Transversal Angle",
    "ti_ar": "رتّب الخطوات: إيجاد زاوية القاطع",
    "q": "Order the steps to find angle \\(x\\) when two parallel lines cut by a transversal have consecutive interior angles \\(2x + 10\\) and \\(3x + 20\\):",
    "q_ar": "رتب خطوات إيجاد قيمة \\(x\\) لمستقيمين متوازيين يقطعهما قاطع وزاويتاهما الداخليتان المتحالفتان هما \\(2x + 10\\) و \\(3x + 20\\):",
    "items": [
      "Set up equation: (2x + 10) + (3x + 20) = 180",
      "Combine like terms: 5x + 30 = 180",
      "Subtract 30: 5x = 150",
      "Divide by 5: x = 30"
    ],
    "items_ar": [
      "كتابة المعادلة: (2x + 10) + (3x + 20) = 180",
      "تجميع الحدود المتشابهة: 5x + 30 = 180",
      "طرح 30 من الطرفين: 5x = 150",
      "القسمة على 5: x = 30"
    ],
    "sol": "Consecutive interior angles are supplementary, so their sum is 180°.",
    "sol_ar": "الزاويتان الداخليتان المتحالفتان متكاملتان، لذا مجموعهما يساوي 180°."
  },
  {
    "t": "num",
    "ti": "Calculate Alternate Interior Angle",
    "ti_ar": "حساب الزاوية المتبادلة داخلياً",
    "q": "Two parallel lines are cut by a transversal. If one alternate interior angle measures \\(114^{\\circ}\\), what is the measure of the consecutive interior angle on the same side of the transversal in degrees?",
    "q_ar": "قطع قاطع مستقيمين متوازيين. إذا كان قياس إحدى الزوايا المتبادلة داخلياً \\(114^{\\circ}\\)، فما قياس الزاوية المتحالفة معها في نفس جهة القاطع بالدرجات؟",
    "a": 66,
    "tol": 0.001,
    "h": "Consecutive interior angles are supplementary to the alternate interior angle.",
    "h_ar": "الزوايا المتحالفة تكون متكاملة مع الزاوية المتبادلة داخلياً.",
    "sol": "Consecutive interior angle = 180 - 114 = 66 degrees.",
    "sol_ar": "قياس الزاوية المتحالفة = 180 - 114 = 66 درجة."
  },
  {
    "t": "cat",
    "ti": "Classify Transversal Angle Relationships",
    "ti_ar": "تصنيف علاقات زوايا القاطع",
    "categories": [
      "Congruent Angles (Equal Measure)",
      "Supplementary Angles (Sum = 180°)"
    ],
    "categories_ar": [
      "زوايا متطابقة (متساوية في القياس)",
      "زوايا متكاملة (مجموعها = 180°)"
    ],
    "items": [
      {
        "s": "Alternate interior angles",
        "s_ar": "الزاويتان المتبادلتان داخلياً",
        "cat": 0
      },
      {
        "s": "Corresponding angles",
        "s_ar": "الزاويتان المتناظرتان",
        "cat": 0
      },
      {
        "s": "Alternate exterior angles",
        "s_ar": "الزاويتان المتبادلتان خارجياً",
        "cat": 0
      },
      {
        "s": "Consecutive interior angles (co-interior)",
        "s_ar": "الزاويتان الداخليتان المتحالفتان",
        "cat": 1
      },
      {
        "s": "Consecutive exterior angles",
        "s_ar": "الزاويتان الخارجيتان في جهة واحدة من القاطع",
        "cat": 1
      }
    ],
    "sol": "When parallel lines are cut by a transversal, alternate and corresponding pairs are equal; consecutive pairs are supplementary.",
    "sol_ar": "عند قطع مستقيمين متوازيين بقاطع، تكون الزوايا المتبادلة والمتناظرة متطابقة، بينما تكون الزوايا المتحالفة متكاملة."
  },
  {
    "t": "se",
    "ti": "Spot the Error: Area & Volume Similarity Scaling (Lines & Angles)",
    "ti_ar": "اكتشف الخطأ: معامل تشابه المساحات والحجوم (المستقيمات المتوازية والقواطع والزوايا)",
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
    "ti": "Examiner Mode: Circle Theorems, Sectors & Similarity (Lines & Angles)",
    "ti_ar": "وضع المصحح: نظريات الدائرة والقطاعات والتشابه (المستقيمات المتوازية والقواطع والزوايا)",
    "q": "A circle has equation \\((x - 4)^2 + (y + 3)^2 = 100\\). (a) State its center and radius \\(r\\). (b) A sector of this circle subtends \\(\\theta = \\frac{\\pi}{2}\\) radians; find exact arc length and sector area in terms of \\(\\pi\\).",
    "q_ar": "دائرة معادلتها \\((x - 4)^2 + (y + 3)^2 = 100\\). (أ) اذكر المركز ونصف القطر \\(r\\). (ب) قطاع في هذه الدائرة زاويته المركزية \\(\\theta = \\frac{\\pi}{2}\\) راديان؛ أوجد طول القوس ومساحة القطاع بدلالة \\(\\pi\\).",
    "parts": [
      {
        "label": "Part (a) — Circle Center & Radius",
        "marks": 2,
        "rubric": [
          {
            "code": "B1",
            "marks": 1,
            "text": "Center \\((h, k) = (4, -3)\\)."
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
            "text": "المركز \\((4, -3)\\)."
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
    "ti": "Step Builder: Circle Radius, Polygon Angles & Similarity (Lines & Angles)",
    "ti_ar": "بناء الخطوات: الدائرة وزوايا المضلعات والتشابه (المستقيمات المتوازية والقواطع والزوايا)",
    "steps": [
      {
        "l": "From \\((x - 4)^2 + (y + 3)^2 = 100\\), find the radius \\(r =\\)",
        "a": "10",
        "h": "Take the square root of 100."
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
        "l": "من المعادلة \\((x - 4)^2 + (y + 3)^2 = 100\\)، أوجد نصف القطر \\(r =\\)",
        "a": "10",
        "h": "خذ الجذر التربيعي للعدد 100."
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
    "t": "qc",
    "ti": "Quick Check: Central vs. Inscribed Angle (Lines & Angles)",
    "ti_ar": "فحص سريع: الزاوية المركزية والمحيطية (المستقيمات المتوازية والقواطع والزوايا)",
    "q": "An inscribed angle \\(\\angle APB\\) subtends the same minor arc as central angle \\(\\angle AOB = 100^\\circ\\). What is \\(\\angle APB\\)?",
    "q_ar": "زاوية محيطية \\(\\angle APB\\) تشترك في نفس القوس الأصغر مع زاوية مركزية قياسها \\(100^\\circ\\). ما قياس \\(\\angle APB\\)؟",
    "o": [
      "\\(50^\\circ\\)",
      "\\(100^\\circ\\)",
      "\\(80^\\circ\\)",
      "\\(200^\\circ\\)"
    ],
    "o_ar": [
      "\\(50^\\circ\\)",
      "\\(100^\\circ\\)",
      "\\(80^\\circ\\)",
      "\\(200^\\circ\\)"
    ],
    "a": 0,
    "ex": "The inscribed angle is half the central angle subtending the same arc.",
    "ex_ar": "الزاوية المحيطية تساوي نصف قياس الزاوية المركزية المشتركة معها في القوس."
  }
];
D["geo-triangles"] = [
  {
    "t": "mt",
    "ti": "Matching: Triangle Congruence",
    "ti_ar": "مطابقة: حالات تطابق المثلثات",
    "p": [
      {
        "l": "Side-Side-Side",
        "l_ar": "ضلع-ضلع-ضلع",
        "r": "SSS",
        "r_ar": "SSS"
      },
      {
        "l": "Side-Angle-Side",
        "l_ar": "ضلع-زاوية-ضلع",
        "r": "SAS",
        "r_ar": "SAS"
      },
      {
        "l": "Angle-Side-Angle",
        "l_ar": "زاوية-ضلع-زاوية",
        "r": "ASA",
        "r_ar": "ASA"
      },
      {
        "l": "Angle-Angle-Side",
        "l_ar": "زاوية-زاوية-ضلع",
        "r": "AAS",
        "r_ar": "AAS"
      }
    ]
  },
  {
    "t": "sr",
    "ti": "Worked Example: Find the Missing Angle",
    "ti_ar": "مثال محلول: إيجاد الزاوية المجهولة في مثلث",
    "steps": [
      "In \\(\\triangle ABC\\), \\(\\angle A=50°\\) and \\(\\angle B=70°\\). The angles of a triangle always sum to \\(180°\\).",
      "Set up the equation: \\(50°+70°+\\angle C=180°\\).",
      "Solve: \\(\\angle C=180°-120°=60°\\)."
    ],
    "steps_ar": [
      "في المثلث \\(\\triangle ABC\\)، قياس \\(\\angle A=50°\\) وقياس \\(\\angle B=70°\\). مجموع زوايا أي مثلث يساوي دائماً \\(180°\\).",
      "كتابة المعادلة: \\(50°+70°+\\angle C=180°\\).",
      "حل المعادلة: \\(\\angle C=180°-120°=60°\\)."
    ]
  },
  {
    "t": "num",
    "ti": "Find Missing Triangle Angle",
    "ti_ar": "إيجاد قياس الزاوية المجهولة في المثلث",
    "q": "In \\(\\triangle PQR\\), \\(m\\angle P = 47^{\\circ}\\) and \\(m\\angle Q = 68^{\\circ}\\). Find the measure of \\(m\\angle R\\) in degrees:",
    "q_ar": "في المثلث \\(\\triangle PQR\\)، قياس \\(m\\angle P = 47^{\\circ}\\) وقياس \\(m\\angle Q = 68^{\\circ}\\). أوجد قياس \\(m\\angle R\\) بالدرجات:",
    "a": 65,
    "tol": 0.001,
    "h": "The interior angles of a triangle sum to 180°.",
    "h_ar": "مجموع الزوايا الداخلية لأي مثلث يساوي 180°.",
    "sol": "180 - 47 - 68 = 65 degrees.",
    "sol_ar": "180 - 47 - 68 = 65 درجة."
  },
  {
    "t": "ord",
    "ti": "Order the Steps: Exterior Angle Equation",
    "ti_ar": "رتّب الخطوات: معادلة الزاوية الخارجية للمثلث",
    "q": "Arrange the steps to find angle A in △ABC with exterior angle 134° at C and remote interior angles A = (5x - 4)° and B = (3x + 10)°:",
    "q_ar": "رتب خطوات إيجاد الزاوية A في المثلث △ABC الذي قياس زاويته الخارجية عند الرأس C هو 134° وزاويتاه الداخلتان البعيدتان هما A = (5x - 4)° و B = (3x + 10)°:",
    "items": [
      "Apply Exterior Angle Theorem: (5x - 4) + (3x + 10) = 134",
      "Combine like terms: 8x + 6 = 134",
      "Subtract 6: 8x = 128",
      "Divide by 8: x = 16",
      "Substitute x = 16 into angle A: 5(16) - 4 = 76°"
    ],
    "items_ar": [
      "تطبيق نظرية الزاوية الخارجية للمثلث: (5x - 4) + (3x + 10) = 134",
      "تجميع الحدود المتشابهة: 8x + 6 = 134",
      "طرح 6 من الطرفين: 8x = 128",
      "القسمة على 8: x = 16",
      "التعويض بـ x = 16 في الزاوية A: 5(16) - 4 = 76°"
    ],
    "sol": "The measure of an exterior angle of a triangle equals the sum of its two remote interior angles.",
    "sol_ar": "قياس الزاوية الخارجية للمثلث يساوي مجموع قياسي الزاويتين الداخلتين البعيدتين."
  },
  {
    "t": "cat",
    "ti": "Classify Triangle Criteria: Valid Congruence vs. Invalid",
    "ti_ar": "تصنيف معايير المثلثات: حالات تطابق صحيحة مقابل غير كافية",
    "categories": [
      "Valid Triangle Congruence Theorem",
      "Not Sufficient for Congruence"
    ],
    "categories_ar": [
      "حالة تطابق صحيحة للمثلثات",
      "غير كافية لإثبات التطابق"
    ],
    "items": [
      {
        "s": "Side-Side-Side (SSS)",
        "s_ar": "ضلع-ضلع-ضلع (SSS)",
        "cat": 0
      },
      {
        "s": "Side-Angle-Side (SAS)",
        "s_ar": "ضلع-زاوية-ضلع (SAS)",
        "cat": 0
      },
      {
        "s": "Angle-Side-Angle (ASA)",
        "s_ar": "زاوية-ضلع-زاوية (ASA)",
        "cat": 0
      },
      {
        "s": "Angle-Angle-Angle (AAA, similarity only)",
        "s_ar": "زاوية-زاوية-زاوية (AAA، تشابه فقط)",
        "cat": 1
      },
      {
        "s": "Side-Side-Angle (SSA, ambiguous case)",
        "s_ar": "ضلع-ضلع-زاوية (SSA، حالة غامضة)",
        "cat": 1
      }
    ],
    "sol": "SSS, SAS, ASA, AAS, and HL prove congruence. AAA proves similarity only, and SSA is ambiguous.",
    "sol_ar": "تثبت حالات SSS و SAS و ASA و AAS و HL التطابق؛ بينما AAA تثبت التشابه فقط، وحالة SSA غامضة وغير كافية للتطابق."
  },
  {
    "t": "se",
    "ti": "Spot the Error: Area & Volume Similarity Scaling (Triangles & Congruence)",
    "ti_ar": "اكتشف الخطأ: معامل تشابه المساحات والحجوم (المثلثات ونظريات التطابق)",
    "q": "Two similar solids have linear scale factor \\(k = 4\\). The smaller solid has surface area \\(10\\text{ cm}^2\\). Where is the error?",
    "q_ar": "مجسمان متشابهان معامل التشابه الخطي بينهما \\(k = 4\\)، ومساحة سطح الأصغر \\(10\\text{ cm}^2\\). أين الخطأ؟",
    "steps": [
      "Identify the linear ratio of corresponding edges as \\(1 : 4\\).",
      "Multiply the surface area directly by \\(4\\) instead of \\(4^2\\): \\(A_{\\text{large}} = 10 \\times 4 = 40\\text{ cm}^2\\).",
      "Report \\(40\\text{ cm}^2\\) as the larger surface area."
    ],
    "steps_ar": [
      "تحديد نسبة التشابه الخطي للأضلاع المتناظرة \\(1 : 4\\).",
      "ضرب المساحة السطحية في \\(4\\) مباشرة بدلاً من \\(4^2\\): \\(A = 40\\text{ cm}^2\\).",
      "اعتماد الناتج كمساحة للمجسم الأكبر."
    ],
    "errorStep": 2,
    "reasons": [
      "Areas of similar figures scale by \\(k^2 = 16\\) (giving \\(160\\text{ cm}^2\\)), and volumes scale by \\(k^3 = 64\\).",
      "Areas scale by \\(\\sqrt{k}\\).",
      "Similar solids always have equal surface areas."
    ],
    "reasons_ar": [
      "نسبة المساحات تساوي مربع معامل التشابه \\(k^2 = 16\\) (أي \\(160\\text{ cm}^2\\))، ونسبة الحجوم \\(k^3 = 64\\).",
      "المساحات تتناسب مع \\(\\sqrt{k}\\).",
      "المجسمات المتشابهة متساوية المساحة دائماً."
    ],
    "correctReason": 0
  },
  {
    "t": "ms",
    "ti": "Examiner Mode: Circle Theorems, Sectors & Similarity (Triangles & Congruence)",
    "ti_ar": "وضع المصحح: نظريات الدائرة والقطاعات والتشابه (المثلثات ونظريات التطابق)",
    "q": "A circle has equation \\((x - 1)^2 + (y + 4)^2 = 16\\). (a) State its center and radius \\(r\\). (b) A sector of this circle subtends \\(\\theta = \\frac{\\pi}{2}\\) radians; find exact arc length and sector area in terms of \\(\\pi\\).",
    "q_ar": "دائرة معادلتها \\((x - 1)^2 + (y + 4)^2 = 16\\). (أ) اذكر المركز ونصف القطر \\(r\\). (ب) قطاع في هذه الدائرة زاويته المركزية \\(\\theta = \\frac{\\pi}{2}\\) راديان؛ أوجد طول القوس ومساحة القطاع بدلالة \\(\\pi\\).",
    "parts": [
      {
        "label": "Part (a) — Circle Center & Radius",
        "marks": 2,
        "rubric": [
          {
            "code": "B1",
            "marks": 1,
            "text": "Center \\((h, k) = (1, -4)\\)."
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
            "text": "المركز \\((1, -4)\\)."
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
    "ti": "Step Builder: Circle Radius, Polygon Angles & Similarity (Triangles & Congruence)",
    "ti_ar": "بناء الخطوات: الدائرة وزوايا المضلعات والتشابه (المثلثات ونظريات التطابق)",
    "steps": [
      {
        "l": "From \\((x - 1)^2 + (y + 4)^2 = 16\\), find the radius \\(r =\\)",
        "a": "4",
        "h": "Take the square root of 16."
      },
      {
        "l": "With linear similarity ratio \\(1 : 4\\), find the volume ratio \\(1 : k^3\\) where \\(k^3 =\\)",
        "a": "64",
        "h": "Cube 4."
      },
      {
        "l": "Find one exterior angle (in degrees) of a regular \\(6\\)-sided hexagon:",
        "a": "60",
        "h": "Compute 360 / 6."
      }
    ],
    "steps_ar": [
      {
        "l": "من المعادلة \\((x - 1)^2 + (y + 4)^2 = 16\\)، أوجد نصف القطر \\(r =\\)",
        "a": "4",
        "h": "خذ الجذر التربيعي للعدد 16."
      },
      {
        "l": "إذا كانت نسبة التشابه الخطي \\(1 : 4\\)، فإن نسبة الحجوم \\(k^3 =\\)",
        "a": "64",
        "h": "احسب مكعب 4."
      },
      {
        "l": "أوجد قياس الزاوية الخارجية بالدرجات لمضلع سداسي منتظم:",
        "a": "60",
        "h": "احسب 360 ÷ 6."
      }
    ]
  },
  {
    "t": "qc",
    "ti": "Quick Check: Central vs. Inscribed Angle (Triangles & Congruence)",
    "ti_ar": "فحص سريع: الزاوية المركزية والمحيطية (المثلثات ونظريات التطابق)",
    "q": "An inscribed angle \\(\\angle APB\\) subtends the same minor arc as central angle \\(\\angle AOB = 110^\\circ\\). What is \\(\\angle APB\\)?",
    "q_ar": "زاوية محيطية \\(\\angle APB\\) تشترك في نفس القوس الأصغر مع زاوية مركزية قياسها \\(110^\\circ\\). ما قياس \\(\\angle APB\\)؟",
    "o": [
      "\\(55^\\circ\\)",
      "\\(110^\\circ\\)",
      "\\(70^\\circ\\)",
      "\\(220^\\circ\\)"
    ],
    "o_ar": [
      "\\(55^\\circ\\)",
      "\\(110^\\circ\\)",
      "\\(70^\\circ\\)",
      "\\(220^\\circ\\)"
    ],
    "a": 0,
    "ex": "The inscribed angle is half the central angle subtending the same arc.",
    "ex_ar": "الزاوية المحيطية تساوي نصف قياس الزاوية المركزية المشتركة معها في القوس."
  }
];
D["geo-similarity"] = [
  {
    "t": "sr",
    "ti": "Worked Example: Similar Triangles — Find a Missing Side",
    "ti_ar": "مثال محلول: المثلثات المتشابهة — إيجاد طول ضلع مجهول",
    "steps": [
      "Triangles \\(ABC\\) and \\(DEF\\) are similar, with \\(AB=6\\), \\(DE=9\\), \\(BC=8\\). Corresponding sides are proportional: \\(\\dfrac{AB}{DE}=\\dfrac{BC}{EF}\\).",
      "Substitute known values: \\(\\dfrac{6}{9}=\\dfrac{8}{EF}\\).",
      "Cross-multiply: \\(6\\cdot EF=9\\cdot8=72\\).",
      "Solve: \\(EF=12\\)."
    ],
    "steps_ar": [
      "المثلثان \\(ABC\\) و \\(DEF\\) متشابهان، حيث \\(AB=6\\) و \\(DE=9\\) و \\(BC=8\\). الأضلاع المتناظرة متناسبة: \\(\\dfrac{AB}{DE}=\\dfrac{BC}{EF}\\).",
      "التعويض بالقيم المعلومة: \\(\\dfrac{6}{9}=\\dfrac{8}{EF}\\).",
      "الضرب التبادلي: \\(6\\cdot EF=9\\cdot8=72\\).",
      "حل المعادلة: \\(EF=12\\)."
    ]
  },
  {
    "t": "qc",
    "ti": "Quick Check: Similar vs Congruent",
    "ti_ar": "فحص سريع: المتشابه مقابل المتطابق",
    "q": "If two triangles have all corresponding angles equal, they are:",
    "q_ar": "إذا تساوت جميع الزوايا المتناظرة في مثلثين، فإنهما يكونان:",
    "o": [
      "Similar",
      "Congruent",
      "Complementary",
      "Perpendicular"
    ],
    "o_ar": [
      "متشابهين",
      "متطابقين",
      "متتامين",
      "متعامدين"
    ],
    "a": 0,
    "ex": "Equal angles alone guarantee similarity (AA), not necessarily equal size (congruence).",
    "ex_ar": "تساوي الزوايا يضمن التشابه (حالة AA)، لكنه لا يضمن بالضرورة تساوي الأطوال (التطابق)."
  },
  {
    "t": "num",
    "ti": "Similar Triangles Area Calculation",
    "ti_ar": "حساب مساحة المثلثات المتشابهة",
    "q": "Two similar triangles have side ratio \\(3 : 5\\). If the smaller triangle has an area of \\(36\\ \\text{cm}^2\\), what is the area of the larger triangle in \\(\\text{cm}^2\\)?",
    "q_ar": "مثلثان متشابهان نسبة طولي ضلعيهما المتناظرين هي \\(3 : 5\\). إذا كانت مساحة المثلث الأصغر \\(36\\ \\text{cm}^2\\)، فما مساحة المثلث الأكبر بـ \\(\\text{cm}^2\\)؟",
    "a": 100,
    "tol": 0.001,
    "h": "Areas scale by the square of the linear scale factor: (5/3)^2.",
    "h_ar": "تتناسب المساحات مع مربع معامل القياس الخطي: (5/3)²",
    "sol": "36 * (25/9) = 100 cm².",
    "sol_ar": "36 * (25/9) = 100 سم²."
  },
  {
    "t": "ord",
    "ti": "Order the Steps: Perimeter from Similar Area Ratio",
    "ti_ar": "رتّب الخطوات: إيجاد المحيط من نسبة المساحات المتشابهة",
    "q": "Arrange the steps to find the perimeter of △T₂ (area 80 cm²) given similar △T₁ (area 45 cm², perimeter 27 cm):",
    "q_ar": "رتب خطوات إيجاد محيط المثلث △T₂ (مساحته 80 سم²) بمعلومية المثلث المشابه له △T₁ (مساحته 45 سم² ومحيطه 27 سم):",
    "items": [
      "Compute area ratio: Area(T₂) / Area(T₁) = 80 / 45 = 16 / 9",
      "Find linear scale factor k by taking square root: k = √(16/9) = 4/3",
      "Set up perimeter proportion: Perimeter(T₂) = k · Perimeter(T₁)",
      "Multiply: Perimeter(T₂) = (4/3) · 27",
      "Compute final perimeter: 36 cm"
    ],
    "items_ar": [
      "حساب نسبة المساحتين: المساحة(T₂) / المساحة(T₁) = 80 / 45 = 16 / 9",
      "إيجاد معامل القياس الخطي k بأخذ الجذر التربيعي: k = √(16/9) = 4/3",
      "كتابة تناسب المحيطات: محيط(T₂) = k · محيط(T₁)",
      "الضرب: محيط(T₂) = (4/3) · 27",
      "حساب المحيط النهائي: 36 سم"
    ],
    "sol": "Linear dimensions scale by k, while areas scale by k².",
    "sol_ar": "الأبعاد الخطية تتغير بالمعامل k، بينما تتغير المساحات بالمعامل k²."
  },
  {
    "t": "cat",
    "ti": "Classify Scaling of Geometric Measures with Scale Factor k",
    "ti_ar": "تصنيف مقاييس الأشكال الهندسية مع معامل القياس k",
    "categories": [
      "Scales by Factor k (Linear)",
      "Scales by Factor k² (Area)"
    ],
    "categories_ar": [
      "يتغير بالمعامل k (أبعاد خطية)",
      "يتغير بالمعامل k² (مساحات)"
    ],
    "items": [
      {
        "s": "Perimeter of polygon",
        "s_ar": "محيط المضلع",
        "cat": 0
      },
      {
        "s": "Side length",
        "s_ar": "طول الضلع",
        "cat": 0
      },
      {
        "s": "Altitude / height of triangle",
        "s_ar": "ارتفاع المثلث",
        "cat": 0
      },
      {
        "s": "Area of triangle",
        "s_ar": "مساحة المثلث",
        "cat": 1
      },
      {
        "s": "Surface area of similar shape",
        "s_ar": "المساحة السطحية للشكل المتشابه",
        "cat": 1
      }
    ],
    "sol": "Perimeters and lengths scale linearly by k; areas scale quadratically by k².",
    "sol_ar": "المحيطات والأطوال تتغير خطياً بالمعامل k؛ بينما تتغير المساحات بالمعامل k²."
  },
  {
    "t": "se",
    "ti": "Spot the Error: Area & Volume Similarity Scaling (Similarity & Proportional Reasoning)",
    "ti_ar": "اكتشف الخطأ: معامل تشابه المساحات والحجوم (التشابه والتناسب الهندسي)",
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
    "ti": "Examiner Mode: Circle Theorems, Sectors & Similarity (Similarity & Proportional Reasoning)",
    "ti_ar": "وضع المصحح: نظريات الدائرة والقطاعات والتشابه (التشابه والتناسب الهندسي)",
    "q": "A circle has equation \\((x - 2)^2 + (y + 2)^2 = 36\\). (a) State its center and radius \\(r\\). (b) A sector of this circle subtends \\(\\theta = \\frac{\\pi}{2}\\) radians; find exact arc length and sector area in terms of \\(\\pi\\).",
    "q_ar": "دائرة معادلتها \\((x - 2)^2 + (y + 2)^2 = 36\\). (أ) اذكر المركز ونصف القطر \\(r\\). (ب) قطاع في هذه الدائرة زاويته المركزية \\(\\theta = \\frac{\\pi}{2}\\) راديان؛ أوجد طول القوس ومساحة القطاع بدلالة \\(\\pi\\).",
    "parts": [
      {
        "label": "Part (a) — Circle Center & Radius",
        "marks": 2,
        "rubric": [
          {
            "code": "B1",
            "marks": 1,
            "text": "Center \\((h, k) = (2, -2)\\)."
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
            "text": "المركز \\((2, -2)\\)."
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
    "ti": "Step Builder: Circle Radius, Polygon Angles & Similarity (Similarity & Proportional Reasoning)",
    "ti_ar": "بناء الخطوات: الدائرة وزوايا المضلعات والتشابه (التشابه والتناسب الهندسي)",
    "steps": [
      {
        "l": "From \\((x - 2)^2 + (y + 2)^2 = 36\\), find the radius \\(r =\\)",
        "a": "6",
        "h": "Take the square root of 36."
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
        "l": "من المعادلة \\((x - 2)^2 + (y + 2)^2 = 36\\)، أوجد نصف القطر \\(r =\\)",
        "a": "6",
        "h": "خذ الجذر التربيعي للعدد 36."
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
    "ti": "Matching: Circle Theorems & Solid Mensuration (Similarity & Proportional Reasoning)",
    "ti_ar": "مطابقة: نظريات الدائرة وقوانين القياس الهندسي (التشابه والتناسب الهندسي)",
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
D["geo-right"] = [
  {
    "t": "sb",
    "ti": "Step Builder: Hypotenuse of right triangle, legs \\(5\\) and \\(12\\)",
    "ti_ar": "بناء الحل خطوة بخطوة: وتر مثلث قائم طولا ضلعيه \\(5\\) و \\(12\\)",
    "steps": [
      {
        "l": "\\(c^2=5^2+12^2=\\)",
        "l_ar": "\\(c^2=5^2+12^2=\\)",
        "a": "169",
        "h": "\\(25+144=169\\)",
        "h_ar": "\\(25+144=169\\)"
      },
      {
        "l": "\\(c=\\sqrt{169}=\\)",
        "l_ar": "\\(c=\\sqrt{169}=\\)",
        "a": "13",
        "h": "\\(\\sqrt{169}=13\\)",
        "h_ar": "\\(\\sqrt{169}=13\\)"
      }
    ]
  },
  {
    "t": "sr",
    "ti": "Worked Example: 30°-60°-90° Special Right Triangle",
    "ti_ar": "مثال محلول: المثلث القائم الخاص 30°-60°-90°",
    "steps": [
      "In a 30°-60°-90° triangle, the sides are in the ratio \\(1 : \\sqrt{3} : 2\\).",
      "The hypotenuse is twice the shorter leg (opposite the 30° angle).",
      "If the shorter leg is 4, then the hypotenuse is \\(2\\times 4 = 8\\).",
      "The longer leg (opposite 60°) is \\(4\\sqrt{3}\\)."
    ],
    "steps_ar": [
      "في المثلث القائم 30°-60°-90°، تكون النسبة بين أطوال الأضلاع هي \\(1 : \\sqrt{3} : 2\\).",
      "طول الوتر يساوي ضعف طول الضلع الأقصر (المقابل للزاوية 30°).",
      "إذا كان الضلع الأقصر طوله 4، فإن الوتر طوله \\(2\\times 4 = 8\\).",
      "طول الضلع الأطول (المقابل للزاوية 60°) يساوي \\(4\\sqrt{3}\\)."
    ]
  },
  {
    "t": "num",
    "ti": "Special Right Triangle Leg",
    "ti_ar": "طول ضلع المثلث القائم الخاص",
    "q": "In a \\(30^{\\circ}\\text{–}60^{\\circ}\\text{–}90^{\\circ}\\) right triangle, the hypotenuse has length \\(16\\). What is the length of the shorter leg (opposite 30°)?",
    "q_ar": "في المثلث القائم \\(30^{\\circ}\\text{–}60^{\\circ}\\text{–}90^{\\circ}\\)، طول الوتر هو \\(16\\). ما طول الضلع الأقصر (المقابل للزاوية 30°)؟",
    "a": 8,
    "tol": 0.001,
    "h": "In a 30-60-90 triangle, the hypotenuse is twice the shorter leg.",
    "h_ar": "في المثلث 30-60-90، طول الوتر يساوي ضعف طول الضلع الأقصر.",
    "sol": "16 / 2 = 8.",
    "sol_ar": "16 / 2 = 8."
  },
  {
    "t": "ord",
    "ti": "Order the Steps: Equilateral Triangle Altitude and Area",
    "ti_ar": "رتّب الخطوات: ارتفاع ومساحة المثلث متطابق الأضلاع",
    "q": "Arrange the steps to find the altitude and area of an equilateral triangle with side length 12 cm:",
    "q_ar": "رتب خطوات إيجاد الارتفاع والمساحة لمثلث متطابق الأضلاع طول ضلعه 12 سم:",
    "items": [
      "Draw the altitude, splitting the base into two segments of length 6 cm",
      "Recognize the 30°-60°-90° right triangle with shorter leg 6 cm",
      "Calculate altitude (longer leg opposite 60°): h = 6√3 cm",
      "Apply area formula: Area = (1/2) · base · height = (1/2)(12)(6√3)",
      "Compute exact area: 36√3 cm²"
    ],
    "items_ar": [
      "رسم الارتفاع الذي يقسم القاعدة إلى قطعتين متساويتين طول كل منهما 6 سم",
      "ملاحظة تشكل مثلث قائم 30°-60°-90° ضلعه الأقصر 6 سم",
      "حساب الارتفاع (الضلع المقابل للزاوية 60°): h = 6√3 سم",
      "تطبيق قانون المساحة: المساحة = (1/2) · القاعدة · الارتفاع = (1/2)(12)(6√3)",
      "حساب المساحة الدقيقة: 36√3 سم²"
    ],
    "sol": "The altitude of an equilateral triangle bisects the base and creates two 30-60-90 triangles.",
    "sol_ar": "ارتفاع المثلث متطابق الأضلاع ينصف قاعدته ويقسمه إلى مثلثين قائمين 30-60-90."
  },
  {
    "t": "cat",
    "ti": "Classify Pythagorean Triples vs. Non-Triples",
    "ti_ar": "تصنيف ثلاثيات فيثاغورس",
    "categories": [
      "Valid Pythagorean Triple (Integer Right Triangle)",
      "Not a Pythagorean Triple"
    ],
    "categories_ar": [
      "ثلاثية فيثاغورس صحيحة (أعداد كلية)",
      "ليست ثلاثية فيثاغورس"
    ],
    "items": [
      {
        "s": "3 - 4 - 5",
        "s_ar": "3 - 4 - 5",
        "cat": 0
      },
      {
        "s": "5 - 12 - 13",
        "s_ar": "5 - 12 - 13",
        "cat": 0
      },
      {
        "s": "8 - 15 - 17",
        "s_ar": "8 - 15 - 17",
        "cat": 0
      },
      {
        "s": "7 - 24 - 25",
        "s_ar": "7 - 24 - 25",
        "cat": 0
      },
      {
        "s": "4 - 5 - 6",
        "s_ar": "4 - 5 - 6",
        "cat": 1
      },
      {
        "s": "6 - 8 - 12",
        "s_ar": "6 - 8 - 12",
        "cat": 1
      }
    ],
    "sol": "Pythagorean triples satisfy a² + b² = c² with whole integers: 3-4-5, 5-12-13, 8-15-17, 7-24-25.",
    "sol_ar": "ثلاثيات فيثاغورس تحقق المعادلة a² + b² = c² بأعداد صحيحة موجبة: 3-4-5، 5-12-13، 8-15-17، 7-24-25."
  },
  {
    "t": "se",
    "ti": "Spot the Error: Quadrant Sign & Dividing by \\(\\sin\\theta\\) (Right Triangles & Trigonometry)",
    "ti_ar": "اكتشف الخطأ: إشارة الربع والقسمة على \\(\\sin\\theta\\) (المثلثات القائمة وحساب المثلثات)",
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
    "ti": "Examiner Mode: Quadrant Identities & Cosine Rule (Right Triangles & Trigonometry)",
    "ti_ar": "وضع المصحح: المتطابقات المثلثية وقانون جيب التمام (المثلثات القائمة وحساب المثلثات)",
    "q": "Suppose \\(\\sin\\theta = \\dfrac{5}{13}\\) with \\(\\theta \\in \\left(\\frac{\\pi}{2}, \\pi\\right)\\) (Quadrant II). (a) Find exact values of \\(\\cos\\theta\\) and \\(\\tan\\theta\\). (b) Evaluate \\(\\sin(2\\theta)\\).",
    "q_ar": "إذا كان \\(\\sin\\theta = \\dfrac{5}{13}\\) حيث \\(\\theta \\in \\left(\\frac{\\pi}{2}, \\pi\\right)\\) (الربع الثاني). (أ) أوجد القيمة الدقيقة لكل من \\(\\cos\\theta\\) و\\(\\tan\\theta\\). (ب) احسب \\(\\sin(2\\theta)\\).",
    "parts": [
      {
        "label": "Part (a) — Quadrant II Cosine & Tangent",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "\\(\\cos^2\\theta = 1 - \\frac{25}{169} = \\frac{144}{169}\\), negative in QII \\(\\implies \\cos\\theta = -\\frac{12}{13}\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "\\(\\tan\\theta = \\frac{\\sin\\theta}{\\cos\\theta} = -\\frac{5}{12}\\)."
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
            "text": "\\(\\sin(2\\theta) = 2\\left(\\frac{5}{13}\\right)\\left(-\\frac{12}{13}\\right) = -\\frac{120}{169}\\)."
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
            "text": "في الربع الثاني \\(\\cos\\theta < 0\\) ومن متطابقة فيثاغورس \\(\\cos\\theta = -\\frac{12}{13}\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "\\(\\tan\\theta = -\\frac{5}{12}\\)."
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
            "text": "\\(\\sin(2\\theta) = -\\frac{120}{169}\\)."
          }
        ]
      }
    ]
  },
  {
    "t": "mt",
    "ti": "Matching: Trigonometric & Inverse-Trig Identities (Right Triangles & Trigonometry)",
    "ti_ar": "مطابقة: المتطابقات المثلثية والفروع العكسية (المثلثات القائمة وحساب المثلثات)",
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
        "l": "Period of \\(2\\sin(3x)\\)",
        "r": "\\(\\dfrac{2\\pi}{3}\\)"
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
        "l": "دورة الدالة \\(2\\sin(3x)\\)",
        "r": "\\(\\dfrac{2\\pi}{3}\\)"
      }
    ]
  },
  {
    "t": "qc",
    "ti": "Quick Check: Period of a Transformed Sinusoid (Right Triangles & Trigonometry)",
    "ti_ar": "فحص سريع: دورة الدالة الجيبية (المثلثات القائمة وحساب المثلثات)",
    "q": "What is the fundamental period of \\(f(x) = 2\\sin(3x - \\pi) + 1\\)?",
    "q_ar": "ما الدورة الأساسية للدالة \\(f(x) = 2\\sin(3x - \\pi) + 1\\)؟",
    "o": [
      "\\(\\dfrac{2\\pi}{3}\\)",
      "\\(6\\pi\\)",
      "\\(\\dfrac{\\pi}{3}\\)",
      "\\(2\\pi\\)"
    ],
    "o_ar": [
      "\\(\\dfrac{2\\pi}{3}\\)",
      "\\(6\\pi\\)",
      "\\(\\dfrac{\\pi}{3}\\)",
      "\\(2\\pi\\)"
    ],
    "a": 0,
    "ex": "For \\(A\\sin(Bx + C) + D\\), the period is \\(\\frac{2\\pi}{|B|} = \\frac{2\\pi}{3}\\).",
    "ex_ar": "دورة الدالة \\(A\\sin(Bx + C) + D\\) تساوي \\(\\frac{2\\pi}{|B|} = \\frac{2\\pi}{3}\\)."
  }
];
D["geo-quads"] = [
  {
    "t": "sr",
    "ti": "Worked Example: Sum of Interior Angles of a Hexagon",
    "ti_ar": "مثال محلول: مجموع الزوايا الداخلية للشكل السداسي",
    "steps": [
      "Use the formula \\((n-2)\\times180°\\), where \\(n\\) is the number of sides.",
      "A hexagon has \\(n=6\\) sides.",
      "Substitute: \\((6-2)\\times180°=4\\times180°=720°\\)."
    ],
    "steps_ar": [
      "استخدام القانون \\((n-2)\\times180°\\)، حيث \\(n\\) هو عدد الأضلاع.",
      "الشكل السداسي له \\(n=6\\) أضلاع.",
      "التعويض: \\((6-2)\\times180°=4\\times180°=720°\\)."
    ]
  },
  {
    "t": "qc",
    "ti": "Quick Check: Quadrilateral Types",
    "ti_ar": "فحص سريع: أنواع الأشكال الرباعية",
    "q": "A parallelogram with all sides equal and no right angles is a:",
    "q_ar": "متوازي أضلاع جميع أضلاعه متطابقة ولا توجد به زوايا قائمة هو:",
    "o": [
      "Rhombus",
      "Square",
      "Rectangle",
      "Trapezoid"
    ],
    "o_ar": [
      "معين",
      "مربع",
      "مستطيل",
      "شبه منحرف"
    ],
    "a": 0,
    "ex": "Equal sides define a rhombus; without right angles it isn't a square.",
    "ex_ar": "تطابق جميع الأضلاع يحدد المعين؛ وبدون زوايا قائمة لا يكون مربعاً."
  },
  {
    "t": "num",
    "ti": "Regular Octagon Interior Angle",
    "ti_ar": "إيجاد زاوية الثماني المنتظم الداخلية",
    "q": "What is the measure in degrees of each interior angle of a regular octagon (8-sided polygon)?",
    "q_ar": "ما قياس كل زاوية داخلية في الثماني المنتظم (مضلع له 8 أضلاع) بالدرجات؟",
    "a": 135,
    "tol": 0.001,
    "h": "Exterior angle is 360 / 8 = 45°. Interior angle is 180 - 45°.",
    "h_ar": "الزاوية الخارجية = 360 / 8 = 45°. والزاوية الداخلية = 180 - 45°.",
    "sol": "180 - 45 = 135 degrees.",
    "sol_ar": "180 - 45 = 135 درجة."
  },
  {
    "t": "ord",
    "ti": "Order the Steps: Finding Number of Sides from Interior Angle",
    "ti_ar": "رتّب الخطوات: إيجاد عدد الأضلاع من قياس الزاوية الداخلية",
    "q": "Arrange the steps to find the number of sides of a regular polygon with interior angle 144°:",
    "q_ar": "رتب خطوات إيجاد عدد أضلاع مضلع منتظم قياس زاويته الداخلية 144°:",
    "items": [
      "Find the exterior angle using the linear pair property: Exterior = 180° - 144° = 36°",
      "Recall the theorem: The sum of exterior angles of any convex polygon is 360°",
      "Set up the equation for regular polygon sides: n · 36° = 360°",
      "Divide to solve for n: n = 360° / 36°",
      "Conclude that the polygon has 10 sides (regular decagon)"
    ],
    "items_ar": [
      "إيجاد قياس الزاوية الخارجية بالتكامل مع الزاوية الداخلية: الخارجية = 180° - 144° = 36°",
      "تذكر النظرية: مجموع قياسات الزوايا الخارجية لأي مضلع محدب يساوي 360°",
      "كتابة معادلة عدد أضلاع المضلع المنتظم: n · 36° = 360°",
      "القسمة لحساب n: n = 360° / 36°",
      "استنتاج أن المضلع له 10 أضلاع (عشاري منتظم)"
    ],
    "sol": "Finding the exterior angle first simplifies finding the number of sides n = 360° / exterior.",
    "sol_ar": "إيجاد الزاوية الخارجية أولاً يسهل إيجاد عدد الأضلاع n = 360° / الزاوية الخارجية."
  },
  {
    "t": "cat",
    "ti": "Classify Quadrilaterals: Always Perpendicular Diagonals",
    "ti_ar": "تصنيف الأشكال الرباعية: تعامد القطرين دائماً",
    "categories": [
      "Diagonals Always Perpendicular (⊥)",
      "Diagonals Not Necessarily Perpendicular"
    ],
    "categories_ar": [
      "القطران متعامدان دائماً (⊥)",
      "القطران ليسا متعامدين بالضرورة"
    ],
    "items": [
      {
        "s": "Rhombus",
        "s_ar": "المعين",
        "cat": 0
      },
      {
        "s": "Square",
        "s_ar": "المربع",
        "cat": 0
      },
      {
        "s": "Kite",
        "s_ar": "شبه المنحرف الدالتوني (طائرة ورقية)",
        "cat": 0
      },
      {
        "s": "Rectangle (non-square)",
        "s_ar": "المستطيل (غير المربع)",
        "cat": 1
      },
      {
        "s": "General Parallelogram",
        "s_ar": "متوازي الأضلاع العام",
        "cat": 1
      },
      {
        "s": "Isosceles Trapezoid",
        "s_ar": "شبه المنحرف متطابق الساقين",
        "cat": 1
      }
    ],
    "sol": "Rhombuses, squares, and kites always have mutually perpendicular diagonals.",
    "sol_ar": "أقطار المعين والمربع وشبه المنحرف الدالتوني (طائرة ورقية) تكون دائماً متعامدة."
  },
  {
    "t": "se",
    "ti": "Spot the Error: Area & Volume Similarity Scaling (Polygons & Quadrilaterals)",
    "ti_ar": "اكتشف الخطأ: معامل تشابه المساحات والحجوم (المضلعات والأشكال الرباعية وخصائصها)",
    "q": "Two similar solids have linear scale factor \\(k = 4\\). The smaller solid has surface area \\(10\\text{ cm}^2\\). Where is the error?",
    "q_ar": "مجسمان متشابهان معامل التشابه الخطي بينهما \\(k = 4\\)، ومساحة سطح الأصغر \\(10\\text{ cm}^2\\). أين الخطأ؟",
    "steps": [
      "Identify the linear ratio of corresponding edges as \\(1 : 4\\).",
      "Multiply the surface area directly by \\(4\\) instead of \\(4^2\\): \\(A_{\\text{large}} = 10 \\times 4 = 40\\text{ cm}^2\\).",
      "Report \\(40\\text{ cm}^2\\) as the larger surface area."
    ],
    "steps_ar": [
      "تحديد نسبة التشابه الخطي للأضلاع المتناظرة \\(1 : 4\\).",
      "ضرب المساحة السطحية في \\(4\\) مباشرة بدلاً من \\(4^2\\): \\(A = 40\\text{ cm}^2\\).",
      "اعتماد الناتج كمساحة للمجسم الأكبر."
    ],
    "errorStep": 2,
    "reasons": [
      "Areas of similar figures scale by \\(k^2 = 16\\) (giving \\(160\\text{ cm}^2\\)), and volumes scale by \\(k^3 = 64\\).",
      "Areas scale by \\(\\sqrt{k}\\).",
      "Similar solids always have equal surface areas."
    ],
    "reasons_ar": [
      "نسبة المساحات تساوي مربع معامل التشابه \\(k^2 = 16\\) (أي \\(160\\text{ cm}^2\\))، ونسبة الحجوم \\(k^3 = 64\\).",
      "المساحات تتناسب مع \\(\\sqrt{k}\\).",
      "المجسمات المتشابهة متساوية المساحة دائماً."
    ],
    "correctReason": 0
  },
  {
    "t": "ms",
    "ti": "Examiner Mode: Circle Theorems, Sectors & Similarity (Polygons & Quadrilaterals)",
    "ti_ar": "وضع المصحح: نظريات الدائرة والقطاعات والتشابه (المضلعات والأشكال الرباعية وخصائصها)",
    "q": "A circle has equation \\((x - 4)^2 + (y + 4)^2 = 100\\). (a) State its center and radius \\(r\\). (b) A sector of this circle subtends \\(\\theta = \\frac{\\pi}{2}\\) radians; find exact arc length and sector area in terms of \\(\\pi\\).",
    "q_ar": "دائرة معادلتها \\((x - 4)^2 + (y + 4)^2 = 100\\). (أ) اذكر المركز ونصف القطر \\(r\\). (ب) قطاع في هذه الدائرة زاويته المركزية \\(\\theta = \\frac{\\pi}{2}\\) راديان؛ أوجد طول القوس ومساحة القطاع بدلالة \\(\\pi\\).",
    "parts": [
      {
        "label": "Part (a) — Circle Center & Radius",
        "marks": 2,
        "rubric": [
          {
            "code": "B1",
            "marks": 1,
            "text": "Center \\((h, k) = (4, -4)\\)."
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
            "text": "المركز \\((4, -4)\\)."
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
    "ti": "Step Builder: Circle Radius, Polygon Angles & Similarity (Polygons & Quadrilaterals)",
    "ti_ar": "بناء الخطوات: الدائرة وزوايا المضلعات والتشابه (المضلعات والأشكال الرباعية وخصائصها)",
    "steps": [
      {
        "l": "From \\((x - 4)^2 + (y + 4)^2 = 100\\), find the radius \\(r =\\)",
        "a": "10",
        "h": "Take the square root of 100."
      },
      {
        "l": "With linear similarity ratio \\(1 : 4\\), find the volume ratio \\(1 : k^3\\) where \\(k^3 =\\)",
        "a": "64",
        "h": "Cube 4."
      },
      {
        "l": "Find one exterior angle (in degrees) of a regular \\(6\\)-sided hexagon:",
        "a": "60",
        "h": "Compute 360 / 6."
      }
    ],
    "steps_ar": [
      {
        "l": "من المعادلة \\((x - 4)^2 + (y + 4)^2 = 100\\)، أوجد نصف القطر \\(r =\\)",
        "a": "10",
        "h": "خذ الجذر التربيعي للعدد 100."
      },
      {
        "l": "إذا كانت نسبة التشابه الخطي \\(1 : 4\\)، فإن نسبة الحجوم \\(k^3 =\\)",
        "a": "64",
        "h": "احسب مكعب 4."
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
    "ti": "Matching: Circle Theorems & Solid Mensuration (Polygons & Quadrilaterals)",
    "ti_ar": "مطابقة: نظريات الدائرة وقوانين القياس الهندسي (المضلعات والأشكال الرباعية وخصائصها)",
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
D["geo-circles"] = [
  {
    "t": "tf",
    "ti": "True or False: Circle Theorems",
    "ti_ar": "صواب أم خطأ: نظريات الدائرة",
    "items": [
      {
        "s": "Inscribed angle = half the central angle on same arc",
        "s_ar": "الزاوية المحيطية = نصف قياس الزاوية المركزية المشتركة معها في القوس",
        "a": true,
        "ex": "Inscribed Angle Theorem.",
        "ex_ar": "نظرية الزاوية المحيطية."
      },
      {
        "s": "Angle in a semicircle is 90°",
        "s_ar": "الزاوية المحيطية المرسومة في نصف دائرة قياسها 90°",
        "a": true,
        "ex": "Thales' Theorem.",
        "ex_ar": "نظرية طاليس."
      },
      {
        "s": "Two tangents from an external point have different lengths",
        "s_ar": "المماسان المرسومان للدائرة من نقطة خارجها لهما طولان مختلفان",
        "a": false,
        "ex": "Equal tangent lengths from external point.",
        "ex_ar": "القطعتان المماستان المرسومتان من نقطة خارج دائرة متطابقتان."
      },
      {
        "s": "Tangent is perpendicular to radius at contact point",
        "s_ar": "المماس يكون عمودياً على نصف القطر عند نقطة التماس",
        "a": true,
        "ex": "Tangent-radius property.",
        "ex_ar": "خاصية المماس ونصف القطر."
      }
    ]
  },
  {
    "t": "sr",
    "ti": "Worked Example: Arc Length of a Sector",
    "ti_ar": "مثال محلول: طول قوس القطاع الدائري",
    "steps": [
      "Find the arc length of a \\(60°\\) sector in a circle of radius \\(9\\). Arc length formula: \\(s=\\dfrac{\\theta}{360°}\\times2\\pi r\\).",
      "Substitute \\(\\theta=60°\\), \\(r=9\\): \\(s=\\dfrac{60}{360}\\times2\\pi(9)\\).",
      "Simplify: \\(s=\\dfrac16\\times18\\pi=3\\pi\\)."
    ],
    "steps_ar": [
      "أوجد طول قوس قطاع زاويته المركزية \\(60°\\) في دائرة نصف قطرها \\(9\\). قانون طول القوس: \\(s=\\dfrac{\\theta}{360°}\\times2\\pi r\\).",
      "التعويض بـ \\(\\theta=60°\\) و \\(r=9\\): \\(s=\\dfrac{60}{360}\\times2\\pi(9)\\).",
      "التبسيط: \\(s=\\dfrac16\\times18\\pi=3\\pi\\)."
    ]
  },
  {
    "t": "num",
    "ti": "Inscribed Angle Measure",
    "ti_ar": "قياس الزاوية المحيطية",
    "q": "An inscribed angle intercepts an arc of \\(74^{\\circ}\\). What is the measure of the inscribed angle in degrees?",
    "q_ar": "زاوية محيطية يقابلها قوس قياسه \\(74^{\\circ}\\). ما قياس الزاوية المحيطية بالدرجات؟",
    "a": 37,
    "tol": 0.001,
    "h": "An inscribed angle equals half its intercepted arc.",
    "h_ar": "قياس الزاوية المحيطية يساوي نصف قياس القوس المقابل لها.",
    "sol": "74 / 2 = 37 degrees.",
    "sol_ar": "74 / 2 = 37 درجة."
  },
  {
    "t": "ord",
    "ti": "Order the Steps: Tangent Length from External Point",
    "ti_ar": "رتّب الخطوات: طول المماس المرسوم من نقطة خارج الدائرة",
    "q": "Arrange the steps to find tangent length PA to a circle with radius 5 cm from external point P with PO = 13 cm:",
    "q_ar": "رتب خطوات إيجاد طول المماس PA لدائرة نصف قطرها 5 سم من نقطة خارجها P حيث البعد عن المركز PO = 13 سم:",
    "items": [
      "Identify that radius OA is perpendicular to tangent PA at point of tangency A",
      "Recognize △PAO as a right triangle with right angle at vertex A",
      "Identify hypotenuse PO = 13 cm and leg OA = 5 cm",
      "Apply the Pythagorean theorem: PA² + 5² = 13² ⟹ PA² = 169 - 25 = 144",
      "Take square root to find tangent length: PA = 12 cm"
    ],
    "items_ar": [
      "ملاحظة أن نصف القطر OA عمودي على المماس PA عند نقطة التماس A",
      "استنتاج أن المثلث △PAO قائم الزاوية عند الرأس A",
      "تحديد طول الوتر PO = 13 سم وطول الساق OA = 5 سم",
      "تطبيق نظرية فيثاغورس: PA² + 5² = 13² ⟹ PA² = 169 - 25 = 144",
      "أخذ الجذر التربيعي لإيجاد طول المماس: PA = 12 سم"
    ],
    "sol": "Tangent segments from an external point form right triangles with the radius at the point of contact.",
    "sol_ar": "المماس ونصف القطر يشكلان مثلثاً قائماً عند نقطة التماس."
  },
  {
    "t": "cat",
    "ti": "Classify Angles in Circles by Vertex Location",
    "ti_ar": "تصنيف زوايا الدائرة حسب موقع الرأس",
    "categories": [
      "Vertex on Circle (Inscribed / Tangent-Chord)",
      "Vertex at Center (Central Angle)"
    ],
    "categories_ar": [
      "الرأس على الدائرة (محيطية / مماسية)",
      "الرأس في المركز (زاوية مركزية)"
    ],
    "items": [
      {
        "s": "Angle intercepting arc with measure equal to arc (m∠ = θ)",
        "s_ar": "زاوية قياسها يساوي قياس القوس المقابل تماماً (m∠ = θ)",
        "cat": 1
      },
      {
        "s": "Angle intercepting arc with measure equal to half arc (m∠ = θ / 2)",
        "s_ar": "زاوية قياسها يساوي نصف قياس القوس المقابل (m∠ = θ / 2)",
        "cat": 0
      },
      {
        "s": "Angle inscribed in a semicircle (always 90°)",
        "s_ar": "زاوية محيطية مرسومة في نصف دائرة (قياسها 90° دائماً)",
        "cat": 0
      },
      {
        "s": "Central angle formed by two radii",
        "s_ar": "زاوية مركزية تتكون من نصفي قطرين",
        "cat": 1
      }
    ],
    "sol": "Central angles equal their intercepted arc; inscribed angles and tangent-chord angles equal half their intercepted arc.",
    "sol_ar": "الزوايا المركزية تساوي قياس القوس المقابل لها؛ بينما الزوايا المحيطية والمماسية تساوي نصف قياس القوس المقابل."
  },
  {
    "t": "se",
    "ti": "Spot the Error: Area & Volume Similarity Scaling (Circles)",
    "ti_ar": "اكتشف الخطأ: معامل تشابه المساحات والحجوم (الدوائر والأوتار والمماسات والزوايا)",
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
    "ti": "Examiner Mode: Circle Theorems, Sectors & Similarity (Circles)",
    "ti_ar": "وضع المصحح: نظريات الدائرة والقطاعات والتشابه (الدوائر والأوتار والمماسات والزوايا)",
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
    "ti": "Step Builder: Circle Radius, Polygon Angles & Similarity (Circles)",
    "ti_ar": "بناء الخطوات: الدائرة وزوايا المضلعات والتشابه (الدوائر والأوتار والمماسات والزوايا)",
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
    "ti": "Matching: Circle Theorems & Solid Mensuration (Circles)",
    "ti_ar": "مطابقة: نظريات الدائرة وقوانين القياس الهندسي (الدوائر والأوتار والمماسات والزوايا)",
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
D["geo-solids"] = [
  {
    "t": "sr",
    "ti": "Worked Example: Volume of a Cylinder",
    "ti_ar": "مثال محلول: حجم الأسطوانة",
    "steps": [
      "Find the volume of a cylinder with radius \\(4\\) and height \\(10\\). Volume formula: \\(V=\\pi r^2h\\).",
      "Substitute \\(r=4\\), \\(h=10\\): \\(V=\\pi(4)^2(10)\\).",
      "Compute: \\(V=160\\pi\\)."
    ],
    "steps_ar": [
      "أوجد حجم أسطوانة نصف قطر قاعدتها \\(4\\) وارتفاعها \\(10\\). قانون الحجم: \\(V=\\pi r^2h\\).",
      "التعويض بـ \\(r=4\\) و \\(h=10\\): \\(V=\\pi(4)^2(10)\\).",
      "الحساب: \\(V=160\\pi\\)."
    ]
  },
  {
    "t": "qc",
    "ti": "Quick Check: Surface Area",
    "ti_ar": "فحص سريع: المساحة الكلية لسطح المكعب",
    "q": "Surface area of a cube with side length 5:",
    "q_ar": "المساحة الكلية لسطح مكعب طول ضلعه 5 تساوي:",
    "o": [
      "150",
      "125",
      "100",
      "25"
    ],
    "o_ar": [
      "150",
      "125",
      "100",
      "25"
    ],
    "a": 0,
    "ex": "\\(SA=6s^2=6(5^2)=6(25)=150\\).",
    "ex_ar": "\\(SA=6s^2=6(5^2)=6(25)=150\\)."
  },
  {
    "t": "num",
    "ti": "Cone Volume Factor",
    "ti_ar": "علاقة حجم المخروط بالأسطوانة",
    "q": "A cylinder has a volume of \\(75\\pi\\ \\text{cm}^3\\). A cone has the exact same radius and height as the cylinder. What is the volume of the cone in \\(\\text{cm}^3\\) divided by \\(\\pi\\)?",
    "q_ar": "أسطوانة حجمها \\(75\\pi\\ \\text{cm}^3\\). ومخروط له نفس نصف القطر والارتفاع تماماً كالأسطوانة. ما حجم المخروط بـ \\(\\text{cm}^3\\) مقسوماً على \\(\\pi\\)؟",
    "a": 25,
    "tol": 0.001,
    "h": "A cone volume is 1/3 of the cylinder with identical dimensions.",
    "h_ar": "حجم المخروط يساوي ثلث (1/3) حجم الأسطوانة المشتركة معه في القاعدة والارتفاع.",
    "sol": "75 / 3 = 25.",
    "sol_ar": "75 / 3 = 25."
  },
  {
    "t": "ord",
    "ti": "Order the Steps: Recasting a Sphere into a Cylinder",
    "ti_ar": "رتّب الخطوات: صهر وإعادة تشكيل كرة إلى أسطوانة",
    "q": "Arrange the steps to find the height of a cylinder (radius 2 cm) recast from a solid sphere (radius 3 cm):",
    "q_ar": "رتب خطوات إيجاد ارتفاع أسطوانة (نصف قطرها 2 سم) أعيد تشكيلها من كرة مصمتة (نصف قطرها 3 سم):",
    "items": [
      "Compute sphere volume: V = (4/3)π r³ = (4/3)π (27) = 36π cm³",
      "Set up cylinder volume formula: V = π R² h = π (2²) h = 4π h",
      "Equate volumes: 4π h = 36π",
      "Divide both sides by 4π: h = 36π / 4π",
      "State final cylinder height: 9 cm"
    ],
    "items_ar": [
      "حساب حجم الكرة: V = (4/3)π r³ = (4/3)π (27) = 36π سم³",
      "كتابة قانون حجم الأسطوانة: V = π R² h = π (2²) h = 4π h",
      "مساواة الحجمين (ثبوت الحجم): 4π h = 36π",
      "قسمة الطرفين على 4π: h = 36π / 4π",
      "تحديد الارتفاع النهائي للأسطوانة: 9 سم"
    ],
    "sol": "Conservation of volume means equating the sphere volume with the cylinder volume formula.",
    "sol_ar": "مبدأ حفظ الحجم يعني مساواة حجم الكرة الأصلي بقانون حجم الأسطوانة الجديد."
  },
  {
    "t": "cat",
    "ti": "Classify Solids by Volume Formula Type",
    "ti_ar": "تصنيف المجسمات حسب نوع قانون الحجم",
    "categories": [
      "Base Times Height: V = B · h",
      "One-Third Base Times Height: V = (1/3) B · h"
    ],
    "categories_ar": [
      "مساحة القاعدة × الارتفاع: V = B · h",
      "ثلث مساحة القاعدة × الارتفاع: V = (1/3) B · h"
    ],
    "items": [
      {
        "s": "Right circular cylinder",
        "s_ar": "أسطوانة دائرية قائمة",
        "cat": 0
      },
      {
        "s": "Rectangular prism",
        "s_ar": "منشور مستطيل القاعدة (متوازي مستطيلات)",
        "cat": 0
      },
      {
        "s": "Right triangular prism",
        "s_ar": "منشور ثلاثي قائم",
        "cat": 0
      },
      {
        "s": "Right circular cone",
        "s_ar": "مخروط دائري قائم",
        "cat": 1
      },
      {
        "s": "Square-based pyramid",
        "s_ar": "هرم رباعي منتظم",
        "cat": 1
      }
    ],
    "sol": "Prisms and cylinders use V = B · h; cones and pyramids taper to a point and use V = (1/3) B · h.",
    "sol_ar": "المناشير والأسطوانات حجمها V = B · h؛ بينما المخاريط والأهرامات التي تلتقي في رأس مدبب حجمها V = (1/3) B · h."
  },
  {
    "t": "se",
    "ti": "Spot the Error: Area & Volume Similarity Scaling (Area, Surface Area & Volume)",
    "ti_ar": "اكتشف الخطأ: معامل تشابه المساحات والحجوم (المساحة والمساحة السطحية والحجوم للمجسمات)",
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
    "ti": "Examiner Mode: Circle Theorems, Sectors & Similarity (Area, Surface Area & Volume)",
    "ti_ar": "وضع المصحح: نظريات الدائرة والقطاعات والتشابه (المساحة والمساحة السطحية والحجوم للمجسمات)",
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
    "ti": "Step Builder: Circle Radius, Polygon Angles & Similarity (Area, Surface Area & Volume)",
    "ti_ar": "بناء الخطوات: الدائرة وزوايا المضلعات والتشابه (المساحة والمساحة السطحية والحجوم للمجسمات)",
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
    "ti": "Matching: Circle Theorems & Solid Mensuration (Area, Surface Area & Volume)",
    "ti_ar": "مطابقة: نظريات الدائرة وقوانين القياس الهندسي (المساحة والمساحة السطحية والحجوم للمجسمات)",
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
D["geo-transform"] = [
  {
    "t": "sr",
    "ti": "Worked Example: Reflect a Point Over the y-axis",
    "ti_ar": "مثال محلول: انعكاس نقطة حول محور الصادات",
    "steps": [
      "Reflect the point \\((3,-2)\\) over the y-axis. Reflecting over the y-axis negates the x-coordinate and keeps y the same: \\((x,y)\\to(-x,y)\\).",
      "Apply to \\((3,-2)\\): \\((-3,-2)\\)."
    ],
    "steps_ar": [
      "إجراء انعكاس للنقطة \\((3,-2)\\) حول محور الصادات (y). الانعكاس حول محور y يعكس إشارة الإحداثي السيني x ويبقي y كما هو: \\((x,y)\\to(-x,y)\\).",
      "التطبيق على النقطة \\((3,-2)\\): ينتج \\((-3,-2)\\)."
    ]
  },
  {
    "t": "qc",
    "ti": "Quick Check: Rotations",
    "ti_ar": "فحص سريع: الدوران",
    "q": "A 180° rotation about the origin maps \\((x,y)\\) to:",
    "q_ar": "الدوران بزاوية 180° حول نقطة الأصل ينقل النقطة \\((x,y)\\) إلى:",
    "o": [
      "\\((-x,-y)\\)",
      "\\((x,-y)\\)",
      "\\((-x,y)\\)",
      "\\((y,x)\\)"
    ],
    "o_ar": [
      "\\((-x,-y)\\)",
      "\\((x,-y)\\)",
      "\\((-x,y)\\)",
      "\\((y,x)\\)"
    ],
    "a": 0,
    "ex": "A 180° rotation about the origin negates both coordinates.",
    "ex_ar": "الدوران بزاوية 180° حول نقطة الأصل يعكس إشارتي كلا الإحداثيين."
  },
  {
    "t": "cat",
    "ti": "Categorize: Rigid vs Non-Rigid Motions",
    "ti_ar": "تصنيف: تحويلات التطابق (الصلبة) مقابل التحويلات غير الصلبة",
    "categories": [
      "Isometry (Rigid Motion)",
      "Non-Rigid Motion"
    ],
    "categories_ar": [
      "تحويل تطابق (صلب - يحافظ على الأبعاد)",
      "تحويل غير صلب (يغير الأبعاد)"
    ],
    "items": [
      {
        "s": "Translation by vector ⟨-2, 5⟩",
        "s_ar": "إزاحة بالمتجه ⟨-2, 5⟩",
        "cat": 0
      },
      {
        "s": "Reflection across the line y = -x",
        "s_ar": "انعكاس حول المستقيم y = -x",
        "cat": 0
      },
      {
        "s": "Rotation of 90° about origin",
        "s_ar": "دوران بزاوية 90° حول نقطة الأصل",
        "cat": 0
      },
      {
        "s": "Dilation by scale factor k = 2.5",
        "s_ar": "تمدد بمعامل قياس k = 2.5",
        "cat": 1
      },
      {
        "s": "Horizontal stretch by factor 3",
        "s_ar": "تمدد أفقي بمعامل 3",
        "cat": 1
      }
    ],
    "sol": "Translations, reflections, and rotations preserve distance and angle measure (isometries); dilations and stretches change size or shape.",
    "sol_ar": "الإزاحات والانعكاسات والدورانات تحافظ على الأبعاد والزوايا (تحويلات تطابق)؛ بينما التمدد يغير الحجم أو الشكل."
  },
  {
    "t": "num",
    "ti": "Dilation Coordinate Value",
    "ti_ar": "إحداثي نقطة بعد التمدد",
    "q": "The point (4, -6) is dilated with center at the origin by a scale factor of \\(k = 0.5\\). What is the resulting x-coordinate?",
    "q_ar": "أجري تمدد للنقطة (4, -6) مركزه نقطة الأصل ومعامله \\(k = 0.5\\). ما الإحداثي السيني x الناتج؟",
    "a": 2,
    "tol": 0.001,
    "h": "Multiply the x-coordinate by 0.5.",
    "h_ar": "اضرب الإحداثي السيني في 0.5.",
    "sol": "4 * 0.5 = 2.",
    "sol_ar": "4 * 0.5 = 2."
  },
  {
    "t": "ord",
    "ti": "Order the Steps: Composition of Geometric Transformations",
    "ti_ar": "رتّب الخطوات: تركيب التحويلات الهندسية",
    "q": "Arrange the steps to reflect point A(-2, 4) across line y = x, then translate by vector ⟨3, -1⟩:",
    "q_ar": "رتب خطوات إجراء انعكاس للنقطة A(-2, 4) حول المستقيم y = x، ثم إزاحتها بالمتجه ⟨3, -1⟩:",
    "items": [
      "Recall rule for reflection across line y = x: swap coordinates (x, y) ⟶ (y, x)",
      "Apply reflection to A(-2, 4): A'(4, -2)",
      "Recall rule for translation by ⟨h, k⟩: (x, y) ⟶ (x + h, y + k)",
      "Apply translation ⟨3, -1⟩ to A'(4, -2): (4 + 3, -2 - 1)",
      "State the final transformed coordinates: A''(7, -3)"
    ],
    "items_ar": [
      "تذكر قاعدة الانعكاس حول المستقيم y = x: تبديل الإحداثيين (x, y) ⟶ (y, x)",
      "تطبيق الانعكاس على النقطة A(-2, 4): A'(4, -2)",
      "تذكر قاعدة الإزاحة بالمتجه ⟨h, k⟩: (x, y) ⟶ (x + h, y + k)",
      "تطبيق الإزاحة بالمتجه ⟨3, -1⟩ على A'(4, -2): (4 + 3, -2 - 1)",
      "تحديد الإحداثيات النهائية الناتجة: A''(7, -3)"
    ],
    "sol": "Perform composite transformations in sequence, applying the coordinates rule step by step.",
    "sol_ar": "نفذ التحويلات المركبة بالترتيب، بتطبيق قواعد الإحداثيات خطوة بخطوة."
  },
  {
    "t": "se",
    "ti": "Spot the Error: Area & Volume Similarity Scaling (Transformations & Symmetry)",
    "ti_ar": "اكتشف الخطأ: معامل تشابه المساحات والحجوم (التحويلات الهندسية والتماثل)",
    "q": "Two similar solids have linear scale factor \\(k = 4\\). The smaller solid has surface area \\(10\\text{ cm}^2\\). Where is the error?",
    "q_ar": "مجسمان متشابهان معامل التشابه الخطي بينهما \\(k = 4\\)، ومساحة سطح الأصغر \\(10\\text{ cm}^2\\). أين الخطأ؟",
    "steps": [
      "Identify the linear ratio of corresponding edges as \\(1 : 4\\).",
      "Multiply the surface area directly by \\(4\\) instead of \\(4^2\\): \\(A_{\\text{large}} = 10 \\times 4 = 40\\text{ cm}^2\\).",
      "Report \\(40\\text{ cm}^2\\) as the larger surface area."
    ],
    "steps_ar": [
      "تحديد نسبة التشابه الخطي للأضلاع المتناظرة \\(1 : 4\\).",
      "ضرب المساحة السطحية في \\(4\\) مباشرة بدلاً من \\(4^2\\): \\(A = 40\\text{ cm}^2\\).",
      "اعتماد الناتج كمساحة للمجسم الأكبر."
    ],
    "errorStep": 2,
    "reasons": [
      "Areas of similar figures scale by \\(k^2 = 16\\) (giving \\(160\\text{ cm}^2\\)), and volumes scale by \\(k^3 = 64\\).",
      "Areas scale by \\(\\sqrt{k}\\).",
      "Similar solids always have equal surface areas."
    ],
    "reasons_ar": [
      "نسبة المساحات تساوي مربع معامل التشابه \\(k^2 = 16\\) (أي \\(160\\text{ cm}^2\\))، ونسبة الحجوم \\(k^3 = 64\\).",
      "المساحات تتناسب مع \\(\\sqrt{k}\\).",
      "المجسمات المتشابهة متساوية المساحة دائماً."
    ],
    "correctReason": 0
  },
  {
    "t": "ms",
    "ti": "Examiner Mode: Circle Theorems, Sectors & Similarity (Transformations & Symmetry)",
    "ti_ar": "وضع المصحح: نظريات الدائرة والقطاعات والتشابه (التحويلات الهندسية والتماثل)",
    "q": "A circle has equation \\((x - 3)^2 + (y + 4)^2 = 64\\). (a) State its center and radius \\(r\\). (b) A sector of this circle subtends \\(\\theta = \\frac{\\pi}{2}\\) radians; find exact arc length and sector area in terms of \\(\\pi\\).",
    "q_ar": "دائرة معادلتها \\((x - 3)^2 + (y + 4)^2 = 64\\). (أ) اذكر المركز ونصف القطر \\(r\\). (ب) قطاع في هذه الدائرة زاويته المركزية \\(\\theta = \\frac{\\pi}{2}\\) راديان؛ أوجد طول القوس ومساحة القطاع بدلالة \\(\\pi\\).",
    "parts": [
      {
        "label": "Part (a) — Circle Center & Radius",
        "marks": 2,
        "rubric": [
          {
            "code": "B1",
            "marks": 1,
            "text": "Center \\((h, k) = (3, -4)\\)."
          },
          {
            "code": "B1",
            "marks": 1,
            "text": "Radius \\(r = \\sqrt{64} = 8\\)."
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
            "text": "Arc length \\(s = r\\theta = 8 \\cdot \\frac{\\pi}{2} = 4\\pi\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "Sector area \\(A = \\frac{1}{2} r^2 \\theta = \\frac{1}{2}(64)\\frac{\\pi}{2} = 16\\pi\\)."
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
            "text": "المركز \\((3, -4)\\)."
          },
          {
            "code": "B1",
            "marks": 1,
            "text": "نصف القطر \\(r = \\sqrt{64} = 8\\)."
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
            "text": "طول القوس \\(s = r\\theta = 4\\pi\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "مساحة القطاع \\(A = \\frac{1}{2} r^2 \\theta = 16\\pi\\)."
          }
        ]
      }
    ]
  },
  {
    "t": "sb",
    "ti": "Step Builder: Circle Radius, Polygon Angles & Similarity (Transformations & Symmetry)",
    "ti_ar": "بناء الخطوات: الدائرة وزوايا المضلعات والتشابه (التحويلات الهندسية والتماثل)",
    "steps": [
      {
        "l": "From \\((x - 3)^2 + (y + 4)^2 = 64\\), find the radius \\(r =\\)",
        "a": "8",
        "h": "Take the square root of 64."
      },
      {
        "l": "With linear similarity ratio \\(1 : 4\\), find the volume ratio \\(1 : k^3\\) where \\(k^3 =\\)",
        "a": "64",
        "h": "Cube 4."
      },
      {
        "l": "Find one exterior angle (in degrees) of a regular \\(6\\)-sided hexagon:",
        "a": "60",
        "h": "Compute 360 / 6."
      }
    ],
    "steps_ar": [
      {
        "l": "من المعادلة \\((x - 3)^2 + (y + 4)^2 = 64\\)، أوجد نصف القطر \\(r =\\)",
        "a": "8",
        "h": "خذ الجذر التربيعي للعدد 64."
      },
      {
        "l": "إذا كانت نسبة التشابه الخطي \\(1 : 4\\)، فإن نسبة الحجوم \\(k^3 =\\)",
        "a": "64",
        "h": "احسب مكعب 4."
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
    "ti": "Matching: Circle Theorems & Solid Mensuration (Transformations & Symmetry)",
    "ti_ar": "مطابقة: نظريات الدائرة وقوانين القياس الهندسي (التحويلات الهندسية والتماثل)",
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
D["geo-coord"] = [
  {
    "t": "fn",
    "ti": "Explorer: Line Slope \\(y=mx+2\\)",
    "ti_ar": "مستكشف: ميل الخط المستقيم \\(y=mx+2\\)",
    "fns": [
      {
        "expr": "m*x+2",
        "color": "#1E3A6E",
        "label": "y=mx+2"
      }
    ],
    "xrange": [
      -5,
      5
    ],
    "yrange": [
      -5,
      10
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
    "ti": "Worked Example: Distance Between Two Points",
    "ti_ar": "مثال محلول: المسافة بين نقطتين",
    "steps": [
      "Find the distance between \\((1,2)\\) and \\((4,6)\\). Use the distance formula: \\(d=\\sqrt{(x_2-x_1)^2+(y_2-y_1)^2}\\).",
      "Substitute: \\(d=\\sqrt{(4-1)^2+(6-2)^2}=\\sqrt{9+16}\\).",
      "Simplify: \\(d=\\sqrt{25}=5\\)."
    ],
    "steps_ar": [
      "أوجد المسافة بين النقطتين \\((1,2)\\) و \\((4,6)\\). استخدام قانون المسافة: \\(d=\\sqrt{(x_2-x_1)^2+(y_2-y_1)^2}\\).",
      "التعويض: \\(d=\\sqrt{(4-1)^2+(6-2)^2}=\\sqrt{9+16}\\).",
      "التبسيط: \\(d=\\sqrt{25}=5\\)."
    ]
  },
  {
    "t": "qc",
    "ti": "Quick Check: Midpoint",
    "ti_ar": "فحص سريع: نقطة المنتصف",
    "q": "The midpoint of \\((2,4)\\) and \\((8,10)\\) is:",
    "q_ar": "نقطة منتصف القطعة المستقيمة الواصلة بين \\((2,4)\\) و \\((8,10)\\) هي:",
    "o": [
      "\\((5,7)\\)",
      "\\((6,7)\\)",
      "\\((5,6)\\)",
      "\\((10,14)\\)"
    ],
    "o_ar": [
      "\\((5,7)\\)",
      "\\((6,7)\\)",
      "\\((5,6)\\)",
      "\\((10,14)\\)"
    ],
    "a": 0,
    "ex": "Midpoint = average of coordinates: \\(\\left(\\frac{2+8}{2},\\frac{4+10}{2}\\right)=(5,7)\\).",
    "ex_ar": "نقطة المنتصف = متوسط الإحداثيات: \\(\\left(\\frac{2+8}{2},\\frac{4+10}{2}\\right)=(5,7)\\)."
  },
  {
    "t": "num",
    "ti": "Perpendicular Slope Calculation",
    "ti_ar": "حساب ميل المستقيم العمودي",
    "q": "Line \\(L_1\\) has equation \\(2x + 8y = 12\\). What is the slope of a line \\(L_2\\) perpendicular to \\(L_1\\)?",
    "q_ar": "المستقيم \\(L_1\\) معادلته \\(2x + 8y = 12\\). ما ميل المستقيم \\(L_2\\) العمودي على \\(L_1\\)؟",
    "a": 4,
    "tol": 0.001,
    "h": "Slope of L1 is -2/8 = -1/4. Perpendicular slope is negative reciprocal: -(-4) = 4.",
    "h_ar": "ميل L1 هو -2/8 = -1/4. ميل العمودي هو مقلوب المعكوس الجمعي: -(-4) = 4.",
    "sol": "4.",
    "sol_ar": "4."
  },
  {
    "t": "ord",
    "ti": "Order the Steps: Equation of a Perpendicular Bisector",
    "ti_ar": "رتّب الخطوات: معادلة المنصف العمودي لقطعة مستقيمة",
    "q": "Arrange the steps to find the perpendicular bisector of segment AB connecting A(2, -1) and B(6, 7):",
    "q_ar": "رتب خطوات إيجاد معادلة المنصف العمودي للقطعة AB الواصلة بين A(2, -1) و B(6, 7):",
    "items": [
      "Find the midpoint M: M = ((2+6)/2, (-1+7)/2) = (4, 3)",
      "Find the slope of segment AB: m_AB = (7 - (-1)) / (6 - 2) = 8 / 4 = 2",
      "Find perpendicular slope: m_perp = -1 / 2",
      "Write point-slope equation through M(4, 3): y - 3 = (-1/2)(x - 4)",
      "Simplify to slope-intercept form: y = (-1/2)x + 5"
    ],
    "items_ar": [
      "إيجاد نقطة المنتصف M: M = ((2+6)/2, (-1+7)/2) = (4, 3)",
      "إيجاد ميل القطعة المستقيمة AB: m_AB = (7 - (-1)) / (6 - 2) = 8 / 4 = 2",
      "إيجاد ميل العمودي: m_perp = -1 / 2",
      "كتابة معادلة المستقيم بصيغة الميل ونقطة عبر M(4, 3): y - 3 = (-1/2)(x - 4)",
      "التبسيط إلى صيغة الميل والمقطع: y = (-1/2)x + 5"
    ],
    "sol": "The perpendicular bisector passes through the midpoint with a slope perpendicular to the segment.",
    "sol_ar": "المنصف العمودي يمر بنقطة المنتصف ويكون ميله عمودياً على ميل القطعة الأصلية."
  },
  {
    "t": "cat",
    "ti": "Classify Lines by Slope Relationships",
    "ti_ar": "تصنيف المستقيمات حسب علاقة الميول",
    "categories": [
      "Parallel Lines (Equal Slopes: m₁ = m₂)",
      "Perpendicular Lines (Negative Reciprocals: m₁ · m₂ = -1)"
    ],
    "categories_ar": [
      "مستقيمان متوازيان (الميلان متساويان: m₁ = m₂)",
      "مستقيمان متعامدان (حاصل ضرب الميلين = -1)"
    ],
    "items": [
      {
        "s": "y = 3x + 1 and y = 3x - 5",
        "s_ar": "y = 3x + 1 و y = 3x - 5",
        "cat": 0
      },
      {
        "s": "y = -0.5x + 4 and y = -0.5x - 2",
        "s_ar": "y = -0.5x + 4 و y = -0.5x - 2",
        "cat": 0
      },
      {
        "s": "y = 2x + 3 and y = -0.5x + 1",
        "s_ar": "y = 2x + 3 و y = -0.5x + 1",
        "cat": 1
      },
      {
        "s": "y = (3/4)x - 2 and y = (-4/3)x + 7",
        "s_ar": "y = (3/4)x - 2 و y = (-4/3)x + 7",
        "cat": 1
      }
    ],
    "sol": "Parallel lines have matching slopes; perpendicular lines have negative reciprocal slopes whose product is -1.",
    "sol_ar": "المستقيمات المتوازية لها ميول متطابقة؛ بينما المستقيمات المتعامدة حاصل ضرب ميولها يساوي -1."
  },
  {
    "t": "se",
    "ti": "Spot the Error: Perpendicular Gradient & Inequality Sign (Coordinate Geometry)",
    "ti_ar": "اكتشف الخطأ: ميل المستقيم المتعامد وإشارة المتباينة (الهندسة الإحداثية في المستوى)",
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
    "ti": "Examiner Mode: Line Equation & Perpendicular Bisector (Coordinate Geometry)",
    "ti_ar": "وضع المصحح: معادلة المستقيم والعمود المنصّف (الهندسة الإحداثية في المستوى)",
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
    "ti": "Step Builder: Coordinate Slope, Intercept & Midpoint (Coordinate Geometry)",
    "ti_ar": "بناء الخطوات: الميل والمقطع ونقطة المنتصف (الهندسة الإحداثية في المستوى)",
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
    "t": "mt",
    "ti": "Matching: Linear & Coordinate Geometry Criteria (Coordinate Geometry)",
    "ti_ar": "مطابقة: علاقات المستقيمات والهندسة الإحداثية (الهندسة الإحداثية في المستوى)",
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
D["geo-prob"] = [
  {
    "t": "sr",
    "ti": "Worked Example: Geometric Probability",
    "ti_ar": "مثال محلول: الاحتمال الهندسي",
    "steps": [
      "A square dartboard has side \\(10\\) with a circular target of radius \\(3\\) at its center. Area of the square: \\(10\\times10=100\\).",
      "Area of the circle: \\(\\pi r^2=\\pi(3)^2=9\\pi\\).",
      "Probability \\(=\\dfrac{\\text{circle area}}{\\text{square area}}=\\dfrac{9\\pi}{100}\\approx0.283\\)."
    ],
    "steps_ar": [
      "لوحة سهام مربعة طول ضلعها \\(10\\) وفي مركزها هدف دائري نصف قطره \\(3\\). مساحة المربع: \\(10\\times10=100\\).",
      "مساحة الدائرة: \\(\\pi r^2=\\pi(3)^2=9\\pi\\).",
      "الاحتمال \\(=\\dfrac{\\text{مساحة الدائرة}}{\\text{مساحة المربع}}=\\dfrac{9\\pi}{100}\\approx0.283\\)."
    ]
  },
  {
    "t": "qc",
    "ti": "Quick Check: Coin Flips",
    "ti_ar": "فحص سريع: إلقاء قطعة النقود",
    "q": "A coin is flipped 3 times. What is \\(P(\\text{exactly 2 heads})\\)?",
    "q_ar": "ألقيت قطعة نقود 3 مرات. ما قيمة \\(P(\\text{ظهور شعارين تماماً})\\)؟",
    "o": [
      "\\(\\dfrac38\\)",
      "\\(\\dfrac12\\)",
      "\\(\\dfrac14\\)",
      "\\(\\dfrac18\\)"
    ],
    "o_ar": [
      "\\(\\dfrac38\\)",
      "\\(\\dfrac12\\)",
      "\\(\\dfrac14\\)",
      "\\(\\dfrac18\\)"
    ],
    "a": 0,
    "ex": "There are \\(\\binom32=3\\) ways to get 2 heads out of 8 equally likely outcomes: \\(\\dfrac38\\).",
    "ex_ar": "توجد \\(\\binom32=3\\) طرق للحصول على شعارين من بين 8 نواتج متساوية الإمكانية: \\(\\dfrac38\\)."
  },
  {
    "t": "num",
    "ti": "Geometric Probability on Line Segment",
    "ti_ar": "الاحتمال الهندسي على قطعة مستقيمة",
    "q": "A point is chosen at random on a line segment of length 20. What is the probability (as a decimal) that it lands on a subsegment of length 7?",
    "q_ar": "اختيرت نقطة عشوائياً على قطعة مستقيمة طولها 20. ما احتمال (في صورة كسر عشري) أن تقع النقطة على قطعة جزئية طولها 7؟",
    "a": 0.35,
    "tol": 0.001,
    "h": "Divide subsegment length by total length: 7 / 20.",
    "h_ar": "اقسم طول القطعة الجزئية على الطول الكلي: 7 / 20.",
    "sol": "7 / 20 = 0.35.",
    "sol_ar": "7 / 20 = 0.35."
  },
  {
    "t": "ord",
    "ti": "Order the Steps: Geometric Probability in Concentric Target",
    "ti_ar": "رتّب الخطوات: الاحتمال الهندسي في هدف ذي دوائر متحدة المركز",
    "q": "Arrange the steps to find probability that a randomly landing dart hits the middle ring (radius 10 to 20 cm) on a target of radius 30 cm:",
    "q_ar": "رتب خطوات إيجاد احتمال استقرار سهم عشوائي في الحلقة الوسطى (نصف القطر من 10 إلى 20 سم) على هدف نصف قطره 30 سم:",
    "items": [
      "Find total target area: Area_total = π (30²) = 900π cm²",
      "Find area of outer circle of middle ring: π (20²) = 400π cm²",
      "Find area of inner circle: π (10²) = 100π cm²",
      "Calculate middle ring area: Area_ring = 400π - 100π = 300π cm²",
      "Divide to find probability: P = 300π / 900π = 1/3 ≈ 0.333"
    ],
    "items_ar": [
      "حساب مساحة الهدف الكلية: المساحة الكلية = π (30²) = 900π سم²",
      "حساب مساحة الدائرة الخارجية للحلقة الوسطى: π (20²) = 400π سم²",
      "حساب مساحة الدائرة الداخلية: π (10²) = 100π سم²",
      "حساب مساحة الحلقة الوسطى: مساحة الحلقة = 400π - 100π = 300π سم²",
      "القسمة لحساب الاحتمال: P = 300π / 900π = 1/3 ≈ 0.333"
    ],
    "sol": "Geometric probability equals the favorable target area divided by the total possible region area.",
    "sol_ar": "الاحتمال الهندسي يساوي مساحة المنطقة المستهدفة مقسومة على مساحة المنطقة الكلية الممكنة."
  },
  {
    "t": "cat",
    "ti": "Classify Probability Events by Nature",
    "ti_ar": "تصنيف أحداث الاحتمالات حسب طبيعتها",
    "categories": [
      "Geometric / Continuous Probability",
      "Classical / Discrete Probability"
    ],
    "categories_ar": [
      "احتمال هندسي / متصل",
      "احتمال كلاسيكي / منفصل"
    ],
    "items": [
      {
        "s": "Probability a dart lands in a circular target on a square board",
        "s_ar": "احتمال استقرار سهم في هدف دائري على لوحة مربعة",
        "cat": 0
      },
      {
        "s": "Probability a random waiting time is under 5 minutes",
        "s_ar": "احتمال أن يقل وقت الانتظار العشوائي عن 5 دقائق",
        "cat": 0
      },
      {
        "s": "Probability a randomly selected point on [0, 10] lies in [2, 6]",
        "s_ar": "احتمال وقوع نقطة عشوائية على الفترة [0, 10] في الفترة [2, 6]",
        "cat": 0
      },
      {
        "s": "Probability of rolling a sum of 7 on two standard six-sided dice",
        "s_ar": "احتمال الحصول على مجموع 7 عند رمي حجري نرد سداسيين",
        "cat": 1
      },
      {
        "s": "Probability of drawing an Ace from a standard 52-card deck",
        "s_ar": "احتمال سحب بطاقة الآس من مجموعة أوراق لعب قياسية (52 بطاقة)",
        "cat": 1
      }
    ],
    "sol": "Continuous/geometric probability relies on ratios of lengths, areas, or volumes; discrete probability relies on counting outcomes.",
    "sol_ar": "الاحتمال المتصل أو الهندسي يعتمد على نسب الأطوال والمساحات والحجوم؛ بينما الاحتمال المنفصل يعتمد على عد النواتج الممكنة."
  },
  {
    "t": "se",
    "ti": "Spot the Error: Variance of Difference of Independent Variables (Probability)",
    "ti_ar": "اكتشف الخطأ: تباين الفرق بين متغيرين عشوائيين مستقلين (الاحتمالات الهندسية والشرطية)",
    "q": "Independent random variables \\(X\\) and \\(Y\\) have \\(\\operatorname{Var}(X) = 5\\) and \\(\\operatorname{Var}(Y) = 3\\). A student computes \\(\\operatorname{Var}(X - Y)\\). Which step is invalid?",
    "q_ar": "متغيران عشوائيان مستقلان \\(X\\) و\\(Y\\) تبايناهما \\(\\operatorname{Var}(X) = 5\\) و\\(\\operatorname{Var}(Y) = 3\\). يحسب طالب \\(\\operatorname{Var}(X - Y)\\). أي خطوة خاطئة؟",
    "steps": [
      "Verify that \\(X\\) and \\(Y\\) are statistically independent (\\(\\operatorname{Cov}(X,Y) = 0\\)).",
      "Subtract the variances directly: \\(\\operatorname{Var}(X - Y) = 5 - 3 = 2\\).",
      "Take square root for standard deviation."
    ],
    "steps_ar": [
      "التحقق من استقلال \\(X\\) و\\(Y\\) إحصائياً.",
      "طرح التباينين مباشرة: \\(\\operatorname{Var}(X - Y) = 5 - 3 = 2\\).",
      "أخذ الجذر التربيعي لإيجاد الانحراف المعياري."
    ],
    "errorStep": 2,
    "reasons": [
      "Because coefficients square in variance, \\(\\operatorname{Var}(X - Y) = 1^2\\operatorname{Var}(X) + (-1)^2\\operatorname{Var}(Y) = 5 + 3 = 8\\) — independent variances ALWAYS add.",
      "\\(\\operatorname{Var}(X - Y)\\) equals \\(\\operatorname{Var}(X) \\cdot \\operatorname{Var}(Y)\\).",
      "Expected values cannot be subtracted."
    ],
    "reasons_ar": [
      "لأن المعاملات تُربَّع في التباين: \\(\\operatorname{Var}(X - Y) = \\operatorname{Var}(X) + (-1)^2\\operatorname{Var}(Y) = 8\\) — التباينات المستقلة تُجمع دائماً.",
      "التباين يساوي حاصل ضرب التباينين.",
      "لا يجوز طرح التوقعات الرياضية."
    ],
    "correctReason": 0
  },
  {
    "t": "ms",
    "ti": "Examiner Mode: Standard Error, Variance & Conditional Probability (Probability)",
    "ti_ar": "وضع المصحح: الخطأ المعياري والتباين والاحتمال الشرطي (الاحتمالات الهندسية والشرطية)",
    "q": "(a) A population has standard deviation \\(\\sigma = 12\\). For a simple random sample of size \\(n = 16\\), find the standard error \\(\\sigma_{\\bar{x}}\\) and state what happens to \\(\\sigma_{\\bar{x}}\\) if \\(n\\) quadruples. (b) Independent \\(X, Y\\) have \\(\\operatorname{Var}(X) = 5,\\; \\operatorname{Var}(Y) = 3\\); compute \\(\\operatorname{Var}(2X - Y)\\).",
    "q_ar": "(أ) مجتمع انحرافه المعياري \\(\\sigma = 12\\). لعينة عشوائية حجمها \\(n = 16\\)، احسب الخطأ المعياري \\(\\sigma_{\\bar{x}}\\) واذكر ماذا يحدث له عند مضاعفة \\(n\\) أربع مرات. (ب) للمتغيرين المستقلين \\(X, Y\\) حيث \\(\\operatorname{Var}(X) = 5,\\; \\operatorname{Var}(Y) = 3\\)، احسب \\(\\operatorname{Var}(2X - Y)\\).",
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
            "text": "\\(4(5) + 3 = 23\\)."
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
            "text": "الناتج: \\(4(5) + 3 = 23\\)."
          }
        ]
      }
    ]
  },
  {
    "t": "sb",
    "ti": "Step Builder: Standard Error & Independent Variance (Probability)",
    "ti_ar": "بناء الخطوات: الخطأ المعياري وتباين المتغيرات المستقلة (الاحتمالات الهندسية والشرطية)",
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
        "l": "For independent \\(\\operatorname{Var}(X) = 5,\\; \\operatorname{Var}(Y) = 3\\), find \\(\\operatorname{Var}(X - Y) =\\)",
        "a": "8",
        "h": "Add 5 + 3."
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
        "l": "للمتغيرين المستقلين \\(\\operatorname{Var}(X) = 5,\\; \\operatorname{Var}(Y) = 3\\)، احسب \\(\\operatorname{Var}(X - Y) =\\)",
        "a": "8",
        "h": "اجمع 5 + 3."
      }
    ]
  },
  {
    "t": "mt",
    "ti": "Matching: Probability, Distributions & Inference Rules (Probability)",
    "ti_ar": "مطابقة: قوانين الاحتمالات والتوزيعات والاستدلال (الاحتمالات الهندسية والشرطية)",
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
