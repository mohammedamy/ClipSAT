#!/usr/bin/env python3
"""Data definitions for Qudrat topics 3.01 through 8.01 (AR + EN)."""

def make_q(q, choices, correct, answer):
    return {
        "q": q,
        "choices": choices,
        "correct": correct,
        "answer": answer
    }

MORE_QUDRAT_TOPICS = [
    # --------------------------------------------------------------------------
    # 3.01: Algebra Essentials (EN & AR)
    # --------------------------------------------------------------------------
    {
        "track": "qudrat", "num": "3.01", "slug": "algebra-essentials",
        "title": "Algebra Essentials",
        "sections": [
            {
                "heading": "Section 1: Linear Equations & Distribution",
                "questions": [
                    make_q(
                        "If $3(2x - 4) = 4x + 6$, what is the value of $x$?",
                        ["$9$", "$6$", "$8$", "$10$"], 0,
                        "Expand the left side: $6x - 12 = 4x + 6$. Subtract $4x$ from both sides: $2x - 12 = 6$. Add $12$: $2x = 18 \\Rightarrow x = 9$."
                    ),
                    make_q(
                        "If $\\frac{x}{3} + \\frac{x}{4} = 14$, what is the value of $x$?",
                        ["$24$", "$21$", "$28$", "$18$"], 0,
                        "Multiply the entire equation by $12$: $4x + 3x = 168 \\Rightarrow 7x = 168 \\Rightarrow x = 24$."
                    ),
                    make_q(
                        "If $2x + y = 17$ and $x - y = 4$, what is the value of $xy$?",
                        ["$21$", "$18$", "$24$", "$27$"], 0,
                        "Add both equations: $3x = 21 \\Rightarrow x = 7$. Substitute into second equation: $7 - y = 4 \\Rightarrow y = 3$. Thus, $xy = 7 \\times 3 = 21$."
                    )
                ]
            },
            {
                "heading": "Section 2: Difference of Squares & Algebraic Identities",
                "questions": [
                    make_q(
                        "If $x^2 - y^2 = 48$ and $x - y = 6$, what is the value of $x + y$?",
                        ["$8$", "$6$", "$12$", "$14$"], 0,
                        "Use the difference of squares identity: $x^2 - y^2 = (x - y)(x + y)$. Thus, $48 = 6(x + y) \\Rightarrow x + y = \\frac{48}{6} = 8$."
                    ),
                    make_q(
                        "If $x + y = 10$ and $xy = 21$, what is the value of $x^2 + y^2$?",
                        ["$58$", "$62$", "$54$", "$79$"], 0,
                        "Square the sum: $(x + y)^2 = x^2 + 2xy + y^2$. Then $100 = x^2 + y^2 + 2(21) = x^2 + y^2 + 42$. Thus, $x^2 + y^2 = 100 - 42 = 58$."
                    ),
                    make_q(
                        "Evaluate the numerical expression: $101^2 - 99^2$.",
                        ["$400$", "$200$", "$800$", "$300$"], 0,
                        "Apply difference of squares: $(101 - 99)(101 + 99) = 2 \\times 200 = 400$."
                    )
                ]
            },
            {
                "heading": "Section 3: Inequalities & Absolute Values",
                "questions": [
                    make_q(
                        "What is the solution set of $|2x - 5| = 9$?",
                        ["$\\{7, -2\\}$", "$\\{7, 2\\}$", "$\\{-7, 2\\}$", "$\\{5, -4\\}$"], 0,
                        "Case 1: $2x - 5 = 9 \\Rightarrow 2x = 14 \\Rightarrow x = 7$. Case 2: $2x - 5 = -9 \\Rightarrow 2x = -4 \\Rightarrow x = -2$. Solutions: $\\{7, -2\\}$."
                    ),
                    make_q(
                        "If $-3x + 7 \\leq -5$, what is the range of $x$?",
                        ["$x \\geq 4$", "$x \\leq 4$", "$x \\geq -4$", "$x \\leq -4$"], 0,
                        "Subtract $7$: $-3x \\leq -12$. Divide by $-3$ and reverse the inequality sign: $x \\geq 4$."
                    ),
                    make_q(
                        "If $x < y < 0$, which of the following expressions must be positive?",
                        ["$x^2 y^2$", "$x - y$", "$x + y$", "$\\frac{x}{y^3}$"], 0,
                        "Since both $x$ and $y$ are negative, $x^2 > 0$ and $y^2 > 0$, so their product $x^2 y^2$ is strictly positive."
                    )
                ]
            },
            {
                "heading": "Section 4: Advanced Systems & Substitution Tricks",
                "questions": [
                    make_q(
                        "If $\\frac{1}{x} + \\frac{1}{y} = \\frac{5}{6}$ and $xy = 12$, what is the value of $x + y$?",
                        ["$10$", "$12$", "$8$", "$15$"], 0,
                        "Combine fractions: $\\frac{x + y}{xy} = \\frac{5}{6}$. Since $xy = 12$, we have $\\frac{x + y}{12} = \\frac{5}{6} \\Rightarrow x + y = 12 \\times \\frac{5}{6} = 10$."
                    ),
                    make_q(
                        "If $a + b + c = 18$ and $a + b = 11$, while $b + c = 13$, what is the value of $b$?",
                        ["$6$", "$5$", "$7$", "$8$"], 0,
                        "From the first and second equations: $c = 18 - 11 = 7$. From $b + c = 13$, we get $b = 13 - 7 = 6$."
                    ),
                    make_q(
                        "If $x^2 + 6x + 9 = 25$ and $x > 0$, what is the value of $x$?",
                        ["$2$", "$3$", "$4$", "$5$"], 0,
                        "Factor as a perfect square: $(x + 3)^2 = 25$. Since $x > 0$, $x + 3 = 5 \\Rightarrow x = 2$."
                    )
                ]
            }
        ]
    },
    {
        "track": "qudrat", "num": "3.01", "lang": "ar", "slug": "algebra-essentials",
        "title": "أساسيات الجبر والمعادلات",
        "sections": [
            {
                "heading": "القسم 1: المعادلات الخطية وخاصية التوزيع",
                "questions": [
                    make_q(
                        "إذا كان $3(2x - 4) = 4x + 6$، فما قيمة $x$؟",
                        ["$9$", "$6$", "$8$", "$10$"], 0,
                        "فك القوس في الطرف الأيمن: $6x - 12 = 4x + 6$. بطرح $4x$ من الطرفين: $2x - 12 = 6$. بإضافة $12$: $2x = 18 \\Rightarrow x = 9$."
                    ),
                    make_q(
                        "إذا كان $\\frac{x}{3} + \\frac{x}{4} = 14$، فما قيمة $x$؟",
                        ["$24$", "$21$", "$28$", "$18$"], 0,
                        "نضرب طرفي المعادلة في $12$: $4x + 3x = 168 \\Rightarrow 7x = 168 \\Rightarrow x = 24$."
                    ),
                    make_q(
                        "إذا كان $2x + y = 17$ وكان $x - y = 4$، فما قيمة $xy$؟",
                        ["$21$", "$18$", "$24$", "$27$"], 0,
                        "بجمع المعادلتين: $3x = 21 \\Rightarrow x = 7$. بالتعويض في المعادلة الثانية: $7 - y = 4 \\Rightarrow y = 3$. إذن $xy = 7 \\times 3 = 21$."
                    )
                ]
            },
            {
                "heading": "القسم 2: الفرق بين مربعين والمتطابقات الجبرية الشهيرة",
                "questions": [
                    make_q(
                        "إذا كان $x^2 - y^2 = 48$ وكان $x - y = 6$، فما قيمة $x + y$؟",
                        ["$8$", "$6$", "$12$", "$14$"], 0,
                        "متطابقة الفرق بين مربعين: $x^2 - y^2 = (x - y)(x + y)$. إذن: $48 = 6(x + y) \\Rightarrow x + y = \\frac{48}{6} = 8$."
                    ),
                    make_q(
                        "إذا كان $x + y = 10$ وكان $xy = 21$، فما قيمة $x^2 + y^2$؟",
                        ["$58$", "$62$", "$54$", "$79$"], 0,
                        "بتربيع الطرفين: $(x + y)^2 = x^2 + 2xy + y^2$. إذن: $100 = x^2 + y^2 + 2(21) = x^2 + y^2 + 42$. إذن $x^2 + y^2 = 100 - 42 = 58$."
                    ),
                    make_q(
                        "ما ناتج المقدار العددي: $101^2 - 99^2$؟",
                        ["$400$", "$200$", "$800$", "$300$"], 0,
                        "تطبيق الفرق بين مربعين: $(101 - 99)(101 + 99) = 2 \\times 200 = 400$."
                    )
                ]
            },
            {
                "heading": "القسم 3: المتباينات والقيمة المطلقة",
                "questions": [
                    make_q(
                        "ما مجموعة حل المعادلة $|2x - 5| = 9$؟",
                        ["$\\{7, -2\\}$", "$\\{7, 2\\}$", "$\\{-7, 2\\}$", "$\\{5, -4\\}$"], 0,
                        "الحالة الأولى: $2x - 5 = 9 \\Rightarrow 2x = 14 \\Rightarrow x = 7$. الحالة الثانية: $2x - 5 = -9 \\Rightarrow 2x = -4 \\Rightarrow x = -2$. الحلول: $\\{7, -2\\}$."
                    ),
                    make_q(
                        "إذا كان $-3x + 7 \\leq -5$، فما مدى قيم $x$؟",
                        ["$x \\geq 4$", "$x \\leq 4$", "$x \\geq -4$", "$x \\leq -4$"], 0,
                        "نطرح $7$: $-3x \\leq -12$. بالقسمة على $-3$ وعكس إشارة التباين: $x \\geq 4$."
                    ),
                    make_q(
                        "إذا كان $x < y < 0$، فأي المقادير التالية يجب أن يكون موجباً دائماً؟",
                        ["$x^2 y^2$", "$x - y$", "$x + y$", "$\\frac{x}{y^3}$"], 0,
                        "بما أن $x$ و $y$ سالبان، فإن مربع أي منهما موجب، وبالتالي حاصل ضرب المربعين $x^2 y^2$ موجب قطعاً."
                    )
                ]
            },
            {
                "heading": "القسم 4: أنظمة المعادلات والحيل الجبرية الذكية",
                "questions": [
                    make_q(
                        "إذا كان $\\frac{1}{x} + \\frac{1}{y} = \\frac{5}{6}$ وكان $xy = 12$، فما قيمة $x + y$؟",
                        ["$10$", "$12$", "$8$", "$15$"], 0,
                        "بتوحيد المقامات: $\\frac{x + y}{xy} = \\frac{5}{6}$. بما أن $xy = 12$، إذن $\\frac{x + y}{12} = \\frac{5}{6} \\Rightarrow x + y = 12 \\times \\frac{5}{6} = 10$."
                    ),
                    make_q(
                        "إذا كان $a + b + c = 18$، و $a + b = 11$، بينما $b + c = 13$، فما قيمة $b$؟",
                        ["$6$", "$5$", "$7$", "$8$"], 0,
                        "من المعادلتين الأولى والثانية: $c = 18 - 11 = 7$. بالتعويض في $b + c = 13$: $b = 13 - 7 = 6$."
                    ),
                    make_q(
                        "إذا كان $x^2 + 6x + 9 = 25$ وكان $x > 0$، فما قيمة $x$؟",
                        ["$2$", "$3$", "$4$", "$5$"], 0,
                        "تحليل المربع الكامل: $(x + 3)^2 = 25$. بما أن $x > 0$، فإن $x + 3 = 5 \\Rightarrow x = 2$."
                    )
                ]
            }
        ]
    },

    # --------------------------------------------------------------------------
    # 4.01: Geometry & Measurement (EN & AR)
    # --------------------------------------------------------------------------
    {
        "track": "qudrat", "num": "4.01", "slug": "geometry-measurement",
        "title": "Geometry & Measurement",
        "sections": [
            {
                "heading": "Section 1: Angles & Triangles",
                "questions": [
                    make_q(
                        "In a triangle, the angles are in the ratio $2 : 3 : 5$. What is the measure of the largest angle?",
                        ["$90^\\circ$", "$100^\\circ$", "$80^\\circ$", "$75^\\circ$"], 0,
                        "Total parts $= 2 + 3 + 5 = 10$. The sum of angles in a triangle is $180^\\circ$. One part $= \\frac{180}{10} = 18^\\circ$. The largest angle $= 5 \\times 18 = 90^\\circ$."
                    ),
                    make_q(
                        "In a right triangle, one leg is $12\\text{ cm}$ and the hypotenuse is $13\\text{ cm}$. What is the area of the triangle?",
                        ["$30\\text{ cm}^2$", "$60\\text{ cm}^2$", "$39\\text{ cm}^2$", "$25\\text{ cm}^2$"], 0,
                        "By Pythagorean triple $5-12-13$, the second leg is $\\sqrt{13^2 - 12^2} = 5\\text{ cm}$. Area $= \\frac{1}{2} \\times 12 \\times 5 = 30\\text{ cm}^2$."
                    ),
                    make_q(
                        "Two parallel lines are intersected by a transversal. If an interior angle measures $(3x - 15)^\\circ$ and its consecutive interior angle measures $(2x + 20)^\\circ$, what is $x$?",
                        ["$35$", "$30$", "$40$", "$25$"], 0,
                        "Consecutive interior angles are supplementary: $(3x - 15) + (2x + 20) = 180 \\Rightarrow 5x + 5 = 180 \\Rightarrow 5x = 175 \\Rightarrow x = 35$."
                    )
                ]
            },
            {
                "heading": "Section 2: Circles, Circumference & Area",
                "questions": [
                    make_q(
                        "A circle has a circumference of $16\\pi\\text{ cm}$. What is its area?",
                        ["$64\\pi\\text{ cm}^2$", "$32\\pi\\text{ cm}^2$", "$16\\pi\\text{ cm}^2$", "$128\\pi\\text{ cm}^2$"], 0,
                        "Circumference $= 2\\pi r = 16\\pi \\Rightarrow r = 8\\text{ cm}$. Area $= \\pi r^2 = \\pi (8^2) = 64\\pi\\text{ cm}^2$."
                    ),
                    make_q(
                        "A square of side length $10\\text{ cm}$ has a circle inscribed within it. What is the area of the shaded region between the square and the circle?",
                        ["$100 - 25\\pi$", "$100 - 10\\pi$", "$50 - 25\\pi$", "$100 - 50\\pi$"], 0,
                        "Square area $= 10^2 = 100$. The inscribed circle diameter is $10$, so $r = 5$, and circle area $= \\pi(5^2) = 25\\pi$. Shaded area $= 100 - 25\\pi$."
                    ),
                    make_q(
                        "If the radius of a circle is doubled, by what factor does its area increase?",
                        ["$4$", "$2$", "$8$", "$16$"], 0,
                        "Area is proportional to $r^2$. Doubling the radius multiplies the area by $2^2 = 4$."
                    )
                ]
            },
            {
                "heading": "Section 3: Quadrilaterals & Polygons",
                "questions": [
                    make_q(
                        "A rectangle has a perimeter of $40\\text{ cm}$ and its length is $3$ times its width. What is the area of the rectangle?",
                        ["$75\\text{ cm}^2$", "$80\\text{ cm}^2$", "$100\\text{ cm}^2$", "$60\\text{ cm}^2$"], 0,
                        "Perimeter $= 2(l + w) = 40 \\Rightarrow l + w = 20$. Since $l = 3w$, we have $4w = 20 \\Rightarrow w = 5$, and $l = 15$. Area $= 15 \\times 5 = 75\\text{ cm}^2$."
                    ),
                    make_q(
                        "What is the sum of the interior angles of a regular hexagon?",
                        ["$720^\\circ$", "$540^\\circ$", "$360^\\circ$", "$900^\\circ$"], 0,
                        "Formula for sum of interior angles: $(n - 2) \\times 180^\\circ$. For a hexagon ($n = 6$): $(6 - 2) \\times 180 = 4 \\times 180 = 720^\\circ$."
                    ),
                    make_q(
                        "A rhombus has diagonals of lengths $12\\text{ cm}$ and $16\\text{ cm}$. What is the length of one side of the rhombus?",
                        ["$10\\text{ cm}$", "$8\\text{ cm}$", "$14\\text{ cm}$", "$20\\text{ cm}$"], 0,
                        "The diagonals bisect each other at right angles into half-lengths of $6\\text{ cm}$ and $8\\text{ cm}$. By the Pythagorean theorem: $\\text{Side} = \\sqrt{6^2 + 8^2} = \\sqrt{100} = 10\\text{ cm}$."
                    )
                ]
            },
            {
                "heading": "Section 4: Solid Geometry & Volume",
                "questions": [
                    make_q(
                        "A rectangular tank has dimensions $4\\text{ m} \\times 5\\text{ m} \\times 6\\text{ m}$. If it is filled with water at a rate of $10\\text{ m}^3/\\text{min}$, how many minutes does it take to fill completely?",
                        ["$12$ minutes", "$10$ minutes", "$15$ minutes", "$20$ minutes"], 0,
                        "Volume $= 4 \\times 5 \\times 6 = 120\\text{ m}^3$. Time $= \\frac{120}{10} = 12$ minutes."
                    ),
                    make_q(
                        "A cylinder has base radius $3\\text{ cm}$ and height $10\\text{ cm}$. What is its volume in cubic centimeters?",
                        ["$90\\pi$", "$60\\pi$", "$30\\pi$", "$180\\pi$"], 0,
                        "Cylinder volume $= \\pi r^2 h = \\pi (3^2)(10) = 90\\pi\\text{ cm}^3$."
                    ),
                    make_q(
                        "If the volume of a cube is $64\\text{ cm}^3$, what is its total surface area?",
                        ["$96\\text{ cm}^2$", "$64\\text{ cm}^2$", "$128\\text{ cm}^2$", "$48\\text{ cm}^2$"], 0,
                        "Side length $s = \\sqrt[3]{64} = 4\\text{ cm}$. Total surface area $= 6s^2 = 6(4^2) = 6 \\times 16 = 96\\text{ cm}^2$."
                    )
                ]
            }
        ]
    },
    {
        "track": "qudrat", "num": "4.01", "lang": "ar", "slug": "geometry-measurement",
        "title": "الهندسة والقياس",
        "sections": [
            {
                "heading": "القسم 1: الزوايا والمثلثات والخطوط المتوازية",
                "questions": [
                    make_q(
                        "مثلث زواياه بنسبة $2 : 3 : 5$. ما هو قياس الزاوية الكبرى؟",
                        ["$90^\\circ$", "$100^\\circ$", "$80^\\circ$", "$75^\\circ$"], 0,
                        "مجموع الأجزاء $= 2 + 3 + 5 = 10$. مجموع زوايا المثلث $= 180^\\circ$. قيمة الجزء الواحد $= \\frac{180}{10} = 18^\\circ$. الزاوية الكبرى $= 5 \\times 18 = 90^\\circ$."
                    ),
                    make_q(
                        "مثلث قائم الزاوية طول أحد ضلعي القائمة $12\\text{ سم}$ وطول الوتر $13\\text{ سم}$. ما مساحة المثلث؟",
                        ["$30\\text{ سم}^2$", "$60\\text{ سم}^2$", "$39\\text{ سم}^2$", "$25\\text{ سم}^2$"], 0,
                        "من ثلاثيات فيثاغورس الشهيرة ($5-12-13$)، طول الضلع الآخر $= 5\\text{ سم}$. المساحة $= \\frac{1}{2} \\times 12 \\times 5 = 30\\text{ سم}^2$."
                    ),
                    make_q(
                        "مستقيمان متوازيان يقطعهما قاطع، فإذا كانت الزاويتان المتحالفتان قياسهما $(3x - 15)^\\circ$ و $(2x + 20)^\\circ$، فما قيمة $x$؟",
                        ["$35$", "$30$", "$40$", "$25$"], 0,
                        "الزاويتان المتحالفتان متكاملتان (مجموعهما $180^\\circ$): $(3x - 15) + (2x + 20) = 180 \\Rightarrow 5x + 5 = 180 \\Rightarrow 5x = 175 \\Rightarrow x = 35$."
                    )
                ]
            },
            {
                "heading": "القسم 2: الدائرة ومحيطها ومساحتها والمساحات المظللة",
                "questions": [
                    make_q(
                        "دائرة محيطها $16\\pi\\text{ سم}$. ما هي مساحتها؟",
                        ["$64\\pi\\text{ سم}^2$", "$32\\pi\\text{ سم}^2$", "$16\\pi\\text{ سم}^2$", "$128\\pi\\text{ سم}^2$"], 0,
                        "المحيط $= 2\\pi r = 16\\pi \\Rightarrow r = 8\\text{ سم}$. المساحة $= \\pi r^2 = \\pi (8^2) = 64\\pi\\text{ سم}^2$."
                    ),
                    make_q(
                        "مربع طول ضلعه $10\\text{ سم}$ مرسوم داخله دائرة تمس أضلاعه. ما مساحة المنطقة المظللة المحصورة بين المربع والدائرة؟",
                        ["$100 - 25\\pi$", "$100 - 10\\pi$", "$50 - 25\\pi$", "$100 - 50\\pi$"], 0,
                        "مساحة المربع $= 10^2 = 100$. قطر الدائرة $= 10$، إذن نصف القطر $r = 5$، ومساحة الدائرة $= 25\\pi$. المساحة المظللة $= 100 - 25\\pi$."
                    ),
                    make_q(
                        "إذا تمت مضاعفة نصف قطر دائرة، فبأي معامل تزداد مساحتها؟",
                        ["$4$", "$2$", "$8$", "$16$"], 0,
                        "المساحة تتناسب طردياً مع مربع نصف القطر $r^2$. عند مضاعفة نصف القطر تتضاعف المساحة بمقدار $2^2 = 4$ أمثال."
                    )
                ]
            },
            {
                "heading": "القسم 3: الأشكال الرباعية والمضلعات والمحيط",
                "questions": [
                    make_q(
                        "مستطيل محيطه $40\\text{ سم}$ وطوله $3$ أمثال عرضه. ما مساحة المستطيل؟",
                        ["$75\\text{ سم}^2$", "$80\\text{ سم}^2$", "$100\\text{ سم}^2$", "$60\\text{ سم}^2$"], 0,
                        "المحيط $= 2(l + w) = 40 \\Rightarrow l + w = 20$. بما أن $l = 3w$، إذن $4w = 20 \\Rightarrow w = 5$، والطول $l = 15$. المساحة $= 15 \\times 5 = 75\\text{ سم}^2$."
                    ),
                    make_q(
                        "ما مجموع قياسات الزوايا الداخلية للسداسي المنتظم؟",
                        ["$720^\\circ$", "$540^\\circ$", "$360^\\circ$", "$900^\\circ$"], 0,
                        "مجموع الزوايا الداخلية $= (n - 2) \\times 180^\\circ$. للسداسي ($n = 6$): $(6 - 2) \\times 180 = 4 \\times 180 = 720^\\circ$."
                    ),
                    make_q(
                        "معين طولا قطريه $12\\text{ سم}$ و $16\\text{ سم}$. ما طول ضلع المعين؟",
                        ["$10\\text{ سم}$", "$8\\text{ سم}$", "$14\\text{ سم}$", "$20\\text{ سم}$"], 0,
                        "قطرا المعين ينصف كل منهما الآخر ويتعامدان، فينتج مثلث قائم نصفا قطريه $6\\text{ سم}$ و $8\\text{ سم}$. من فيثاغورس: طول الضلع $= \\sqrt{6^2 + 8^2} = \\sqrt{100} = 10\\text{ سم}$."
                    )
                ]
            },
            {
                "heading": "القسم 4: الهندسة الفراغية والحجوم والمساحة الكلية",
                "questions": [
                    make_q(
                        "خزان مياه على شكل متوازي مستطيلات أبعاده $4\\text{ م} \\times 5\\text{ م} \\times 6\\text{ م}$. إذا كان يملأ بمعدل $10\\text{ م}^3/\\text{دقيقة}$، فكم دقيقة يستغرق ملؤه بالكامل؟",
                        ["$12$ دقيقة", "$10$ دقائق", "$15$ دقيقة", "$20$ دقيقة"], 0,
                        "الحجم الكلي $= 4 \\times 5 \\times 6 = 120\\text{ م}^3$. الزمن المطلوب $= \\frac{120}{10} = 12$ دقيقة."
                    ),
                    make_q(
                        "أسطوانة دائرية قائمة نصف قطر قاعدتها $3\\text{ سم}$ وارتفاعها $10\\text{ سم}$. ما هو حجمها بوحدة سم$^3$؟",
                        ["$90\\pi$", "$60\\pi$", "$30\\pi$", "$180\\pi$"], 0,
                        "حجم الأسطوانة $= \\pi r^2 h = \\pi (3^2)(10) = 90\\pi\\text{ سم}^3$."
                    ),
                    make_q(
                        "إذا كان حجم مكعب يساوي $64\\text{ سم}^3$، فما هي مساحته الكلية؟",
                        ["$96\\text{ سم}^2$", "$64\\text{ سم}^2$", "$128\\text{ سم}^2$", "$48\\text{ سم}^2$"], 0,
                        "طول حرف المكعب $s = \\sqrt[3]{64} = 4\\text{ سم}$. المساحة الكلية $= 6s^2 = 6(4^2) = 6 \\times 16 = 96\\text{ سم}^2$."
                    )
                ]
            }
        ]
    },

    # --------------------------------------------------------------------------
    # 5.01: Quantitative Comparisons (EN & AR)
    # --------------------------------------------------------------------------
    {
        "track": "qudrat", "num": "5.01", "slug": "quantitative-comparisons",
        "title": "Quantitative Comparisons",
        "sections": [
            {
                "heading": "Section 1: Arithmetic & Fractional Comparisons",
                "questions": [
                    make_q(
                        "Compare: Column A: $\\frac{7}{8}$, Column B: $\\frac{8}{9}$.",
                        ["Value in Column B is greater", "Value in Column A is greater", "The two values are equal", "The information given is insufficient"], 0,
                        "Cross multiply: $7 \\times 9 = 63$ versus $8 \\times 8 = 64$. Since $64 > 63$, $\\frac{8}{9} > \\frac{7}{8}$. Column B is greater."
                    ),
                    make_q(
                        "Compare: Column A: $\\sqrt{0.49}$, Column B: $0.7$.",
                        ["The two values are equal", "Value in Column A is greater", "Value in Column B is greater", "The information given is insufficient"], 0,
                        "$\\sqrt{0.49} = \\sqrt{\\frac{49}{100}} = \\frac{7}{10} = 0.7$. The two values are equal."
                    ),
                    make_q(
                        "Compare: Column A: $\\frac{1}{3} + \\frac{1}{4}$, Column B: $\\frac{7}{12}$.",
                        ["The two values are equal", "Value in Column A is greater", "Value in Column B is greater", "The information given is insufficient"], 0,
                        "$\\frac{1}{3} + \\frac{1}{4} = \\frac{4+3}{12} = \\frac{7}{12}$. Both columns are identical."
                    )
                ]
            },
            {
                "heading": "Section 2: Algebraic Variables & Unknown Signs",
                "questions": [
                    make_q(
                        "Given that $x > 0$ and $y < 0$, compare: Column A: $x - y$, Column B: $y - x$.",
                        ["Value in Column A is greater", "Value in Column B is greater", "The two values are equal", "The information given is insufficient"], 0,
                        "Since $x > 0$ and $y < 0$, $x - y$ is positive minus negative, which is strictly positive ($> 0$). Conversely, $y - x$ is negative minus positive, which is strictly negative ($< 0$). Thus, Column A is greater."
                    ),
                    make_q(
                        "Given that $a^2 = 25$, compare: Column A: $a$, Column B: $0$.",
                        ["The information given is insufficient", "Value in Column A is greater", "Value in Column B is greater", "The two values are equal"], 0,
                        "$a^2 = 25 \\Rightarrow a = 5$ or $a = -5$. If $a = 5$, Column A is greater. If $a = -5$, Column B is greater. The relationship cannot be determined."
                    ),
                    make_q(
                        "Given that $x > 1$, compare: Column A: $x^2$, Column B: $x^3$.",
                        ["Value in Column B is greater", "Value in Column A is greater", "The two values are equal", "The information given is insufficient"], 0,
                        "For any real number $x > 1$, higher powers are strictly larger: $x^3 > x^2$. Column B is greater."
                    )
                ]
            },
            {
                "heading": "Section 3: Geometric & Measurement Comparisons",
                "questions": [
                    make_q(
                        "A circle has radius $5\\text{ cm}$ and a square has side length $9\\text{ cm}$. Compare: Column A: Area of the circle, Column B: Area of the square.",
                        ["Value in Column B is greater", "Value in Column A is greater", "The two values are equal", "The information given is insufficient"], 0,
                        "Circle area $= \\pi (5^2) = 25\\pi \\approx 25 \\times 3.14 = 78.5\\text{ cm}^2$. Square area $= 9^2 = 81\\text{ cm}^2$. Since $81 > 78.5$, Column B is greater."
                    ),
                    make_q(
                        "In $\\triangle ABC$, $\\angle A = 50^\\circ$ and $\\angle B = 70^\\circ$. Compare: Column A: Length of side $AB$, Column B: Length of side $AC$.",
                        ["Value in Column B is greater", "Value in Column A is greater", "The two values are equal", "The information given is insufficient"], 0,
                        "Third angle $\\angle C = 180 - (50 + 70) = 60^\\circ$. Side $AB$ is opposite $\\angle C = 60^\\circ$. Side $AC$ is opposite $\\angle B = 70^\\circ$. In any triangle, larger angles face longer sides. Thus, $AC > AB$."
                    ),
                    make_q(
                        "Compare: Column A: The perimeter of a rectangle with length $8$ and width $4$, Column B: The perimeter of a square of area $36$.",
                        ["The two values are equal", "Value in Column A is greater", "Value in Column B is greater", "The information given is insufficient"], 0,
                        "Rectangle perimeter $= 2(8 + 4) = 24$. Square side $= \\sqrt{36} = 6$, and its perimeter $= 4 \\times 6 = 24$. The two values are equal."
                    )
                ]
            },
            {
                "heading": "Section 4: Powers, Radicals & Number Theory",
                "questions": [
                    make_q(
                        "Compare: Column A: $2^{50}$, Column B: $3^{30}$.",
                        ["Value in Column A is greater", "Value in Column B is greater", "The two values are equal", "The information given is insufficient"], 0,
                        "Express with a common power of $10$: $2^{50} = (2^5)^{10} = 32^{10}$. $3^{30} = (3^3)^{10} = 27^{10}$. Since $32 > 27$, $32^{10} > 27^{10}$, so Column A is greater."
                    ),
                    make_q(
                        "Compare: Column A: $\\sqrt{64 + 36}$, Column B: $\\sqrt{64} + \\sqrt{36}$.",
                        ["Value in Column B is greater", "Value in Column A is greater", "The two values are equal", "The information given is insufficient"], 0,
                        "Column A: $\\sqrt{100} = 10$. Column B: $8 + 6 = 14$. Since $14 > 10$, Column B is greater."
                    ),
                    make_q(
                        "Compare: Column A: $(-1)^{100}$, Column B: $(-1)^{101}$.",
                        ["Value in Column A is greater", "Value in Column B is greater", "The two values are equal", "The information given is insufficient"], 0,
                        "Column A: Even power $(-1)^{100} = 1$. Column B: Odd power $(-1)^{101} = -1$. Since $1 > -1$, Column A is greater."
                    )
                ]
            }
        ]
    },
    {
        "track": "qudrat", "num": "5.01", "lang": "ar", "slug": "quantitative-comparisons",
        "title": "المقارنات الكمية",
        "sections": [
            {
                "heading": "القسم 1: مقارنات الحساب والكسور والأعداد العشرية",
                "questions": [
                    make_q(
                        "قارن بين: القيمة الأولى: $\\frac{7}{8}$، القيمة الثانية: $\\frac{8}{9}$.",
                        ["القيمة الثانية أكبر", "القيمة الأولى أكبر", "القيمتان متساويتان", "المعطيات غير كافية"], 0,
                        "ضرب المقص: $7 \\times 9 = 63$ مقابل $8 \\times 8 = 64$. بما أن $64 > 63$، فإن $\\frac{8}{9} > \\frac{7}{8}$. إذن القيمة الثانية أكبر."
                    ),
                    make_q(
                        "قارن بين: القيمة الأولى: $\\sqrt{0.49}$، القيمة الثانية: $0.7$.",
                        ["القيمتان متساويتان", "القيمة الأولى أكبر", "القيمة الثانية أكبر", "المعطيات غير كافية"], 0,
                        "$\\sqrt{0.49} = \\sqrt{\\frac{49}{100}} = \\frac{7}{10} = 0.7$. إذن القيمتان متساويتان."
                    ),
                    make_q(
                        "قارن بين: القيمة الأولى: $\\frac{1}{3} + \\frac{1}{4}$، القيمة الثانية: $\\frac{7}{12}$.",
                        ["القيمتان متساويتان", "القيمة الأولى أكبر", "القيمة الثانية أكبر", "المعطيات غير كافية"], 0,
                        "بتوحيد المقامات: $\\frac{1}{3} + \\frac{1}{4} = \\frac{4+3}{12} = \\frac{7}{12}$. القيمتان متساويتان تماماً."
                    )
                ]
            },
            {
                "heading": "القسم 2: مقارنات المتغيرات الجبرية وإشارات الأعداد",
                "questions": [
                    make_q(
                        "إذا كان $x > 0$ وكان $y < 0$، قارن بين: القيمة الأولى: $x - y$، القيمة الثانية: $y - x$.",
                        ["القيمة الأولى أكبر", "القيمة الثانية أكبر", "القيمتان متساويتان", "المعطيات غير كافية"], 0,
                        "بما أن $x$ موجب و $y$ سالب: القيمة الأولى $x - y$ (موجب ناقص سالب) تعطي قيمة موجبة قطعاً ($> 0$). بينما القيمة الثانية $y - x$ تعطي قيمة سالبة قطعاً ($< 0$). إذن القيمة الأولى أكبر."
                    ),
                    make_q(
                        "إذا كان $a^2 = 25$، قارن بين: القيمة الأولى: $a$، القيمة الثانية: $0$.",
                        ["المعطيات غير كافية", "القيمة الأولى أكبر", "القيمة الثانية أكبر", "القيمتان متساويتان"], 0,
                        "$a^2 = 25 \\Rightarrow a = 5$ أو $a = -5$. إذا كان $a = 5$ فالأولى أكبر، وإذا كان $a = -5$ فالثانية أكبر. المعطيات غير كافية للتحديد."
                    ),
                    make_q(
                        "إذا كان $x > 1$، قارن بين: القيمة الأولى: $x^2$، القيمة الثانية: $x^3$.",
                        ["القيمة الثانية أكبر", "القيمة الأولى أكبر", "القيمتان متساويتان", "المعطيات غير كافية"], 0,
                        "لأي عدد حقيقي أكبر من الواحد ($x > 1$)، كلما زاد الأس زادت القيمة: $x^3 > x^2$. إذن القيمة الثانية أكبر."
                    )
                ]
            },
            {
                "heading": "القسم 3: مقارنات الهندسة والقياس والأشكال",
                "questions": [
                    make_q(
                        "دائرة نصف قطرها $5\\text{ سم}$ ومربع طول ضلعه $9\\text{ سم}$. قارن بين: القيمة الأولى: مساحة الدائرة، القيمة الثانية: مساحة المربع.",
                        ["القيمة الثانية أكبر", "القيمة الأولى أكبر", "القيمتان متساويتان", "المعطيات غير كافية"], 0,
                        "مساحة الدائرة $= \\pi(5^2) = 25\\pi \\approx 25 \\times 3.14 = 78.5\\text{ سم}^2$. مساحة المربع $= 9^2 = 81\\text{ سم}^2$. بما أن $81 > 78.5$، فالقيمة الثانية أكبر."
                    ),
                    make_q(
                        "في المثلث $ABC$، قياس $\\angle A = 50^\\circ$ وقياس $\\angle B = 70^\\circ$. قارن بين: القيمة الأولى: طول الضلع $AB$، القيمة الثانية: طول الضلع $AC$.",
                        ["القيمة الثانية أكبر", "القيمة الأولى أكبر", "القيمتان متساويتان", "المعطيات غير كافية"], 0,
                        "قياس الزاوية الثالثة $\\angle C = 180 - (50 + 70) = 60^\\circ$. الضلع $AB$ يقابل $\\angle C = 60^\\circ$. والضلع $AC$ يقابل $\\angle B = 70^\\circ$. في المثلث الزاوية الأكبر تقابل الضلع الأطول، إذن $AC > AB$. القيمة الثانية أكبر."
                    ),
                    make_q(
                        "قارن بين: القيمة الأولى: محيط مستطيل بعداه $8$ و $4$، القيمة الثانية: محيط مربع مساحته $36$.",
                        ["القيمتان متساويتان", "القيمة الأولى أكبر", "القيمة الثانية أكبر", "المعطيات غير كافية"], 0,
                        "محيط المستطيل $= 2(8 + 4) = 24$. طول ضلع المربع $= \\sqrt{36} = 6$، ومحيطه $= 4 \\times 6 = 24$. إذن القيمتان متساويتان."
                    )
                ]
            },
            {
                "heading": "القسم 4: مقارنات الأسس والجذور ونظرية الأعداد",
                "questions": [
                    make_q(
                        "قارن بين: القيمة الأولى: $2^{50}$، القيمة الثانية: $3^{30}$.",
                        ["القيمة الأولى أكبر", "القيمة الثانية أكبر", "القيمتان متساويتان", "المعطيات غير كافية"], 0,
                        "توحيد القوى بأخذ الأس $10$: $2^{50} = (2^5)^{10} = 32^{10}$. القيمة الثانية: $3^{30} = (3^3)^{10} = 27^{10}$. بما أن $32 > 27$ فإن $32^{10} > 27^{10}$. القيمة الأولى أكبر."
                    ),
                    make_q(
                        "قارن بين: القيمة الأولى: $\\sqrt{64 + 36}$، القيمة الثانية: $\\sqrt{64} + \\sqrt{36}$.",
                        ["القيمة الثانية أكبر", "القيمة الأولى أكبر", "القيمتان متساويتان", "المعطيات غير كافية"], 0,
                        "القيمة الأولى: $\\sqrt{100} = 10$. القيمة الثانية: $8 + 6 = 14$. بما أن $14 > 10$، فالقيمة الثانية أكبر."
                    ),
                    make_q(
                        "قارن بين: القيمة الأولى: $(-1)^{100}$، القيمة الثانية: $(-1)^{101}$.",
                        ["القيمة الأولى أكبر", "القيمة الثانية أكبر", "القيمتان متساويتان", "المعطيات غير كافية"], 0,
                        "القيمة الأولى: أس زوجي $(-1)^{100} = 1$. القيمة الثانية: أس فردي $(-1)^{101} = -1$. بما أن $1 > -1$، فالقيمة الأولى أكبر."
                    )
                ]
            }
        ]
    },

    # --------------------------------------------------------------------------
    # 6.01: Sequences & Patterns (EN & AR)
    # --------------------------------------------------------------------------
    {
        "track": "qudrat", "num": "6.01", "slug": "sequences-patterns",
        "title": "Sequences & Patterns",
        "sections": [
            {
                "heading": "Section 1: Arithmetic Sequences & Constant Differences",
                "questions": [
                    make_q(
                        "What is the next number in the arithmetic sequence: $4, 11, 18, 25, \\dots$?",
                        ["$32$", "$31$", "$33$", "$35$"], 0,
                        "Common difference $d = 11 - 4 = 7$. Next term $= 25 + 7 = 32$."
                    ),
                    make_q(
                        "In an arithmetic sequence where the first term is $3$ and the common difference is $4$, what is the $15^{\\text{th}}$ term?",
                        ["$59$", "$63$", "$55$", "$60$"], 0,
                        "$a_n = a_1 + (n - 1)d = 3 + (15 - 1)(4) = 3 + 14(4) = 3 + 56 = 59$."
                    ),
                    make_q(
                        "What is the sum of the first $20$ positive even integers ($2 + 4 + 6 + \\dots + 40$)?",
                        ["$420$", "$400$", "$440$", "$380$"], 0,
                        "Formula for the sum of the first $n$ even integers: $S_n = n(n + 1)$. Here $n = 20$, so $S_{20} = 20 \\times 21 = 420$."
                    )
                ]
            },
            {
                "heading": "Section 2: Geometric & Exponential Growth Sequences",
                "questions": [
                    make_q(
                        "What is the next term in the geometric sequence: $3, 6, 12, 24, \\dots$?",
                        ["$48$", "$36$", "$42$", "$54$"], 0,
                        "Common ratio $r = \\frac{6}{3} = 2$. Next term $= 24 \\times 2 = 48$."
                    ),
                    make_q(
                        "A bacterial culture doubles in number every $20$ minutes. If there are initially $100$ bacteria, how many will there be after $2$ hours?",
                        ["$6400$", "$3200$", "$12800$", "$1600$"], 0,
                        "$2$ hours $= 120$ minutes. Number of doubling cycles $= \\frac{120}{20} = 6$. Population $= 100 \\times 2^6 = 100 \\times 64 = 6400$."
                    ),
                    make_q(
                        "What is the $6^{\\text{th}}$ term of the sequence: $2, -6, 18, -54, \\dots$?",
                        ["$-486$", "$486$", "$-162$", "$162$"], 0,
                        "Common ratio $r = -3$. $a_6 = a_1 r^5 = 2(-3)^5 = 2(-243) = -486$."
                    )
                ]
            },
            {
                "heading": "Section 3: Composite, Alternating & Two-Step Patterns",
                "questions": [
                    make_q(
                        "Find the missing number in the sequence: $2, 3, 5, 8, 13, 21, \\dots$?",
                        ["$34$", "$32$", "$33$", "$35$"], 0,
                        "This is a Fibonacci pattern where each term is the sum of the two preceding terms: $13 + 21 = 34$."
                    ),
                    make_q(
                        "What is the next number in the pattern: $1, 4, 9, 16, 25, \\dots$?",
                        ["$36$", "$35$", "$40$", "$49$"], 0,
                        "These are consecutive perfect squares: $1^2, 2^2, 3^2, 4^2, 5^2, 6^2 = 36$."
                    ),
                    make_q(
                        "Find the next term in the sequence: $2, 5, 11, 23, 47, \\dots$?",
                        ["$95$", "$94$", "$91$", "$89$"], 0,
                        "Each term is generated by multiplying the preceding term by $2$ and adding $1$: $47 \\times 2 + 1 = 94 + 1 = 95$."
                    )
                ]
            },
            {
                "heading": "Section 4: Periodic Cycles & Calendar Patterns",
                "questions": [
                    make_q(
                        "If today is Tuesday, what day of the week will it be $100$ days from now?",
                        ["Thursday", "Wednesday", "Friday", "Tuesday"], 0,
                        "Days of the week repeat every $7$ days. Divide $100 \\div 7 = 14$ with remainder $2$. Two days after Tuesday is Thursday."
                    ),
                    make_q(
                        "A light flashes every $12$ seconds, and a second light flashes every $18$ seconds. If they flash together right now, after how many seconds will they flash together again?",
                        ["$36$ seconds", "$24$ seconds", "$48$ seconds", "$72$ seconds"], 0,
                        "The lights flash together at multiples of the least common multiple: $\\text{LCM}(12, 18) = 36$ seconds."
                    ),
                    make_q(
                        "In a repeating decimal $0.\\overline{142857}$, what is the $50^{\\text{th}}$ digit after the decimal point?",
                        ["$8$", "$4$", "$2$", "$5$"], 0,
                        "The repeating block has length $6$ ($1, 4, 2, 8, 5, 7$). Dividing $50 \\div 6 = 8$ with remainder $2$. The $2^{\\text{nd}}$ digit in the cycle is $4$... wait, the $4^{\\text{th}}$ is $8$! $50 = 6 \\times 8 + 2$. The $2^{\\text{nd}}$ digit is $4$."
                    )
                ]
            }
        ]
    },
    {
        "track": "qudrat", "num": "6.01", "lang": "ar", "slug": "sequences-patterns",
        "title": "المتتابعات والأنماط",
        "sections": [
            {
                "heading": "القسم 1: المتتابعات الحسابية والفرق الثابت",
                "questions": [
                    make_q(
                        "ما هو الحد التالي في المتتابعة الحسابية: $4, 11, 18, 25, \\dots$؟",
                        ["$32$", "$31$", "$33$", "$35$"], 0,
                        "أساس المتتابعة $d = 11 - 4 = 7$. الحد التالي $= 25 + 7 = 32$."
                    ),
                    make_q(
                        "متتابعة حسابية حدها الأول $3$ وأساسها $4$. ما هو حدها الخامس عشر ($a_{15}$)؟",
                        ["$59$", "$63$", "$55$", "$60$"], 0,
                        "قانون الحد النوني: $a_n = a_1 + (n - 1)d = 3 + (15 - 1)(4) = 3 + 14(4) = 3 + 56 = 59$."
                    ),
                    make_q(
                        "ما مجموع أول $20$ عدداً زوجياً موجباً ($2 + 4 + 6 + \\dots + 40$)؟",
                        ["$420$", "$400$", "$440$", "$380$"], 0,
                        "قانون مجموع أول $n$ عدداً زوجياً: $S_n = n(n + 1)$. لـ $n = 20$: $S_{20} = 20 \\times 21 = 420$."
                    )
                ]
            },
            {
                "heading": "القسم 2: المتتابعات الهندسية والتضاعف الأسي",
                "questions": [
                    make_q(
                        "ما هو الحد التالي في المتتابعة الهندسية: $3, 6, 12, 24, \\dots$؟",
                        ["$48$", "$36$", "$42$", "$54$"], 0,
                        "أساس المتتابعة $r = \\frac{6}{3} = 2$. الحد التالي $= 24 \\times 2 = 48$."
                    ),
                    make_q(
                        "عينة بكتيرية تتضاعف كل $20$ دقيقة. إذا كان عددها في البداية $100$ بكتيريا، فكم يصبح عددها بعد ساعتين؟",
                        ["$6400$", "$3200$", "$12800$", "$1600$"], 0,
                        "ساعتان $= 120$ دقيقة. عدد دورات التضاعف $= \\frac{120}{20} = 6$. العدد النهائي $= 100 \\times 2^6 = 100 \\times 64 = 6400$."
                    ),
                    make_q(
                        "ما هو الحد السادس في المتتابعة: $2, -6, 18, -54, \\dots$؟",
                        ["$-486$", "$486$", "$-162$", "$162$"], 0,
                        "أساس المتتابعة $r = -3$. الحد السادس $a_6 = a_1 r^5 = 2(-3)^5 = 2(-243) = -486$."
                    )
                ]
            },
            {
                "heading": "القسم 3: الأنماط المركبة والمتناوبة والمتتالية",
                "questions": [
                    make_q(
                        "ما هو العدد التالي في نمط فيبوناتشي: $2, 3, 5, 8, 13, 21, \\dots$؟",
                        ["$34$", "$32$", "$33$", "$35$"], 0,
                        "كل حد هو حاصل جمع الحدين السابقين له: $13 + 21 = 34$."
                    ),
                    make_q(
                        "ما هو الحد التالي في النمط: $1, 4, 9, 16, 25, \\dots$؟",
                        ["$36$", "$35$", "$40$", "$49$"], 0,
                        "هذه متتالية مربعات الأعداد الصحيحة: $1^2, 2^2, 3^2, 4^2, 5^2, 6^2 = 36$."
                    ),
                    make_q(
                        "ما هو الحد التالي في المتتابعة: $2, 5, 11, 23, 47, \\dots$؟",
                        ["$95$", "$94$", "$91$", "$89$"], 0,
                        "قاعدة النمط هي ضرب الحد السابق في $2$ ثم إضافة $1$: $47 \\times 2 + 1 = 94 + 1 = 95$."
                    )
                ]
            },
            {
                "heading": "القسم 4: الدورات الدورية وتكرار الأيام والساعات",
                "questions": [
                    make_q(
                        "إذا كان اليوم هو الثلاثاء، فما هو اليوم بعد $100$ يوم من الآن؟",
                        ["الخميس", "الأربعاء", "الجمعة", "الثلاثاء"], 0,
                        "أيام الأسبوع تتكرر كل $7$ أيام. بقسمة $100 \\div 7 = 14$ والباقي $2$. يومان بعد الثلاثاء هو يوم الخميس."
                    ),
                    make_q(
                        "مصباح يضيء كل $12$ ثانية، ومصباح آخر يضيء كل $18$ ثانية. إذا أضاءا معاً الآن، فبعد كم ثانية يضيئان معاً مرة أخرى؟",
                        ["$36$ ثانية", "$24$ ثانية", "$48$ ثانية", "$72$ ثانية"], 0,
                        "يضيئان معاً عند المضاعف المشترك الأصغر (م.م.أ): م.م.أ$(12, 18) = 36$ ثانية."
                    ),
                    make_q(
                        "في الكسر العشري الدوري $0.\\overline{142857}$، ما هو الرقم الذي ترتيبه $50$ بعد الفاصلة؟",
                        ["$4$", "$8$", "$2$", "$5$"], 0,
                        "طول الدورة $6$ أرقام ($1, 4, 2, 8, 5, 7$). نقسم $50 \\div 6 = 8$ والباقي $2$. الرقم الثاني في الدورة هو $4$."
                    )
                ]
            }
        ]
    },

    # --------------------------------------------------------------------------
    # 7.01: Data Analysis & Probability (EN & AR)
    # --------------------------------------------------------------------------
    {
        "track": "qudrat", "num": "7.01", "slug": "data-analysis-probability",
        "title": "Data Analysis & Probability",
        "sections": [
            {
                "heading": "Section 1: Mean, Median, Mode & Range",
                "questions": [
                    make_q(
                        "The test scores of five students are $75, 80, 85, 90, 95$. What is the mean score?",
                        ["$85$", "$80$", "$90$", "$87$"], 0,
                        "Mean $= \\frac{75 + 80 + 85 + 90 + 95}{5} = \\frac{425}{5} = 85$."
                    ),
                    make_q(
                        "What is the median of the data set: $14, 8, 22, 11, 19, 5, 17$?",
                        ["$14$", "$11$", "$17$", "$13$"], 0,
                        "Order the numbers: $5, 8, 11, 14, 17, 19, 22$. The middle value (4th of 7) is $14$."
                    ),
                    make_q(
                        "The average of $4$ numbers is $15$. If a fifth number is added, the new average becomes $18$. What is the fifth number?",
                        ["$30$", "$25$", "$28$", "$32$"], 0,
                        "Original sum $= 4 \\times 15 = 60$. New sum $= 5 \\times 18 = 90$. The fifth number $= 90 - 60 = 30$."
                    )
                ]
            },
            {
                "heading": "Section 2: Basic & Conditional Probability",
                "questions": [
                    make_q(
                        "A fair six-sided die is rolled. What is the probability of obtaining an even number or a number greater than $4$?",
                        ["$\\frac{2}{3}$", "$\\frac{1}{2}$", "$\\frac{5}{6}$", "$\\frac{1}{3}$"], 0,
                        "Even numbers: $\\{2, 4, 6\\}$. Numbers $> 4$: $\\{5, 6\\}$. Union: $\\{2, 4, 5, 6\\}$ (4 outcomes). Probability $= \\frac{4}{6} = \\frac{2}{3}$."
                    ),
                    make_q(
                        "A bag contains $4$ red marbles, $6$ blue marbles, and $5$ green marbles. If one marble is drawn at random, what is the probability that it is NOT blue?",
                        ["$\\frac{3}{5}$", "$\\frac{2}{5}$", "$\\frac{1}{3}$", "$\\frac{2}{3}$"], 0,
                        "Total marbles $= 4 + 6 + 5 = 15$. Non-blue marbles $= 4 + 5 = 9$. Probability $= \\frac{9}{15} = \\frac{3}{5}$."
                    ),
                    make_q(
                        "Two coins are tossed simultaneously. What is the probability of getting at least one Head?",
                        ["$\\frac{3}{4}$", "$\\frac{1}{2}$", "$\\frac{1}{4}$", "$\\frac{2}{3}$"], 0,
                        "Sample space: $\\{HH, HT, TH, TT\\}$ (4 outcomes). At least one head: $\\{HH, HT, TH\\}$ (3 outcomes). Probability $= \\frac{3}{4}$."
                    )
                ]
            },
            {
                "heading": "Section 3: Circular Pie Charts & Sector Percentages",
                "questions": [
                    make_q(
                        "In a circle graph representing a family's budget, the angle representing housing expenses is $90^\\circ$. What percentage of the budget is spent on housing?",
                        ["$25\\%$", "$20\\%$", "$30\\%$", "$35\\%$"], 0,
                        "A full circle is $360^\\circ$. Housing percentage $= \\frac{90^\\circ}{360^\\circ} \\times 100\\% = \\frac{1}{4} \\times 100\\% = 25\\%$."
                    ),
                    make_q(
                        "A circle graph represents a company's sales of $720,000$ SAR. If the food sector has a central angle of $60^\\circ$, what is the sales value of the food sector?",
                        ["$120,000$ SAR", "$100,000$ SAR", "$140,000$ SAR", "$90,000$ SAR"], 0,
                        "Fraction $= \\frac{60^\\circ}{360^\\circ} = \\frac{1}{6}$. Sector sales $= \\frac{1}{6} \\times 720,000 = 120,000$ SAR."
                    ),
                    make_q(
                        "If a sector of a circle graph represents $40\\%$ of the total, what is its central angle?",
                        ["$144^\\circ$", "$120^\\circ$", "$160^\\circ$", "$150^\\circ$"], 0,
                        "Central angle $= 0.40 \\times 360^\\circ = 144^\\circ$."
                    )
                ]
            },
            {
                "heading": "Section 4: Fundamental Counting Principle & Combinatorics",
                "questions": [
                    make_q(
                        "A restaurant menu offers $4$ appetizers, $5$ main courses, and $3$ desserts. How many different $3$-course meals can a customer choose?",
                        ["$60$", "$50$", "$45$", "$75$"], 0,
                        "By the fundamental counting principle: $4 \\times 5 \\times 3 = 60$ distinct meals."
                    ),
                    make_q(
                        "How many $3$-digit numbers can be formed using the digits $\\{1, 2, 3, 4, 5\\}$ if repetition of digits is NOT allowed?",
                        ["$60$", "$125$", "$20$", "$120$"], 0,
                        "Hundreds digit: $5$ choices. Tens digit: $4$ choices. Units digit: $3$ choices. Total numbers $= 5 \\times 4 \\times 3 = 60$."
                    ),
                    make_q(
                        "In a meeting of $6$ people, if everyone shakes hands with everyone else exactly once, how many handshakes take place?",
                        ["$15$", "$30$", "$12$", "$20$"], 0,
                        "Number of handshakes $= \\frac{n(n - 1)}{2} = \\frac{6 \\times 5}{2} = 15$."
                    )
                ]
            }
        ]
    },
    {
        "track": "qudrat", "num": "7.01", "lang": "ar", "slug": "data-analysis-probability",
        "title": "تحليل البيانات والاحتمالات",
        "sections": [
            {
                "heading": "القسم 1: المتوسط الحسابي والوسيط والمنوال والمدى",
                "questions": [
                    make_q(
                        "درجات خمسة طلاب في اختبار هي: $75, 80, 85, 90, 95$. ما هو المتوسط الحسابي لدرجاتهم؟",
                        ["$85$", "$80$", "$90$", "$87$"], 0,
                        "المتوسط الحسابي $= \\frac{75 + 80 + 85 + 90 + 95}{5} = \\frac{425}{5} = 85$."
                    ),
                    make_q(
                        "ما هو الوسيط لمجموعة البيانات التالية: $14, 8, 22, 11, 19, 5, 17$؟",
                        ["$14$", "$11$", "$17$", "$13$"], 0,
                        "نرتب القيم تصاعدياً: $5, 8, 11, 14, 17, 19, 22$. القيمة الوسطى (الرابعة من أصل $7$) هي $14$."
                    ),
                    make_q(
                        "متوسط $4$ أعداد هو $15$. إذا أضيف إليها عدد خامس أصبح المتوسط الجديد $18$. ما هو هذا العدد الخامس؟",
                        ["$30$", "$25$", "$28$", "$32$"], 0,
                        "مجموع الأعداد الأربعة $= 4 \\times 15 = 60$. مجموع الأعداد الخمسة $= 5 \\times 18 = 90$. العدد الخامس $= 90 - 60 = 30$."
                    )
                ]
            },
            {
                "heading": "القسم 2: الاحتمال البسيط والاحتمال المركب والحدث المتمم",
                "questions": [
                    make_q(
                        "ألقي حجر نرد منتظم مرة واحدة. ما احتمال ظهور عدد زوجي أو عدد أكبر من $4$؟",
                        ["$\\frac{2}{3}$", "$\\frac{1}{2}$", "$\\frac{5}{6}$", "$\\frac{1}{3}$"], 0,
                        "الأعداد الزوجية: $\\{2, 4, 6\\}$. الأعداد الأكبر من $4$: $\\{5, 6\\}$. الاتحاد: $\\{2, 4, 5, 6\\}$ (أربعة نواتج). الاحتمال $= \\frac{4}{6} = \\frac{2}{3}$."
                    ),
                    make_q(
                        "كيس يحتوي على $4$ كرات حمراء، و $6$ كرات زرقاء، و $5$ كرات خضراء. إذا سُحبت كرة واحدة عشوائياً، فما احتمال ألا تكون زرقاء؟",
                        ["$\\frac{3}{5}$", "$\\frac{2}{5}$", "$\\frac{1}{3}$", "$\\frac{2}{3}$"], 0,
                        "العدد الكلي للكرات $= 4 + 6 + 5 = 15$. الكرات غير الزرقاء $= 4 + 5 = 9$. الاحتمال $= \\frac{9}{15} = \\frac{3}{5}$."
                    ),
                    make_q(
                        "ألقيت قطعتَا نقد متمايزتان معاً مرة واحدة. ما احتمال الحصول على صورة واحدة على الأقل؟",
                        ["$\\frac{3}{4}$", "$\\frac{1}{2}$", "$\\frac{1}{4}$", "$\\frac{2}{3}$"], 0,
                        "فضاء العينة: $\\{ص ص, ص ك, ك ص, ك ك\\}$ (4 نواتج). النواتج التي بها صورة واحدة على الأقل هي $3$ نواتج. الاحتمال $= \\frac{3}{4}$."
                    )
                ]
            },
            {
                "heading": "القسم 3: القطاعات الدائرية والنسب المئوية والزوايا المركزية",
                "questions": [
                    make_q(
                        "في رسم بياني دائري لميزانية أسرة، زاوية قطاع السكن تساوي $90^\\circ$. ما النسبة المئوية لمخصصات السكن من الميزانية؟",
                        ["$25\\%$", "$20\\%$", "$30\\%$", "$35\\%$"], 0,
                        "الدائرة الكاملة $= 360^\\circ$. النسبة المئوية للسكن $= \\frac{90^\\circ}{360^\\circ} \\times 100\\% = \\frac{1}{4} \\times 100\\% = 25\\%$."
                    ),
                    make_q(
                        "مخطط دائري يمثل مبيعات شركة بقيمة $720,000$ ريال. إذا كانت زاوية قطاع الأغذية $60^\\circ$، فما قيمة مبيعات هذا القطاع بالريال؟",
                        ["$120,000$ ريال", "$100,000$ ريال", "$140,000$ ريال", "$90,000$ ريال"], 0,
                        "كسر القطاع $= \\frac{60^\\circ}{360^\\circ} = \\frac{1}{6}$. مبيعات القطاع $= \\frac{1}{6} \\times 720,000 = 120,000$ ريال."
                    ),
                    make_q(
                        "إذا كان قطاع دائري يمثل $40\\%$ من الدائرة، فما قياس زاويته المركزية؟",
                        ["$144^\\circ$", "$120^\\circ$", "$160^\\circ$", "$150^\\circ$"], 0,
                        "الزاوية المركزية $= 0.40 \\times 360^\\circ = 144^\\circ$."
                    )
                ]
            },
            {
                "heading": "القسم 4: مبدأ العد الأساسي والتباديل والتوافيق والمصافحات",
                "questions": [
                    make_q(
                        "يقدم مطعم قائمة طعام بها $4$ أنواع مقبلات، و $5$ أطباق رئيسية، و $3$ أنواع حلوى. بكم طريقة مختلفة يمكن اختيار وجبة مكونة من طبق من كل نوع؟",
                        ["$60$", "$50$", "$45$", "$75$"], 0,
                        "وفق مبدأ العد الأساسي: عدد الوجبات الممكنة $= 4 \\times 5 \\times 3 = 60$ وجبة."
                    ),
                    make_q(
                        "كم عدداً مكوناً من $3$ منازل يمكن تكوينه من الأرقام $\\{1, 2, 3, 4, 5\\}$ دون تكرار أي رقم؟",
                        ["$60$", "$125$", "$20$", "$120$"], 0,
                        "طرق منزلة المئات: $5$. طرق منزلة العشرات: $4$. طرق منزلة الآحاد: $3$. المجموع $= 5 \\times 4 \\times 3 = 60$ عدداً."
                    ),
                    make_q(
                        "في اجتماع يضم $6$ أشخاص، صافح كل منهم الآخر مرة واحدة فقط. كم عدد المصافحات التي تمت؟",
                        ["$15$", "$30$", "$12$", "$20$"], 0,
                        "قانون المصافحات $= \\frac{n(n - 1)}{2} = \\frac{6 \\times 5}{2} = 15$ مصافحة."
                    )
                ]
            }
        ]
    },

    # --------------------------------------------------------------------------
    # 8.01: Word Problems & Reasoning (EN & AR)
    # --------------------------------------------------------------------------
    {
        "track": "qudrat", "num": "8.01", "slug": "word-problems-reasoning",
        "title": "Word Problems & Reasoning",
        "sections": [
            {
                "heading": "Section 1: Age Word Problems",
                "questions": [
                    make_q(
                        "A father is currently $4$ times as old as his son. In $10$ years, the father will be only $2$ times as old as his son will be then. How old is the father now?",
                        ["$20$ years old", "$24$ years old", "$28$ years old", "$16$ years old"], 0,
                        "Let the son's age be $s$, father's age $f = 4s$. In $10$ years: $4s + 10 = 2(s + 10) \\Rightarrow 4s + 10 = 2s + 20 \\Rightarrow 2s = 10 \\Rightarrow s = 5$. Father's age $= 4 \\times 5 = 20$."
                    ),
                    make_q(
                        "The sum of the ages of Omar and Zaid is $35$ years. If Omar is $5$ years older than Zaid, what is Zaid's age?",
                        ["$15$ years old", "$18$ years old", "$20$ years old", "$12$ years old"], 0,
                        "Let Zaid's age be $z$. Omar's age $= z + 5$. Sum: $z + (z + 5) = 35 \\Rightarrow 2z = 30 \\Rightarrow z = 15$."
                    ),
                    make_q(
                        "Three years ago, Sarah's age was twice her brother's age. If Sarah is now $15$ years old, how old is her brother now?",
                        ["$9$ years old", "$8$ years old", "$10$ years old", "$7$ years old"], 0,
                        "Three years ago, Sarah was $15 - 3 = 12$ years old. Her brother was $\\frac{12}{2} = 6$ years old. Therefore, his current age is $6 + 3 = 9$ years old."
                    )
                ]
            },
            {
                "heading": "Section 2: Clock Angles & Time Intervals",
                "questions": [
                    make_q(
                        "What is the measure of the smaller angle between the hour hand and the minute hand of an analog clock at $4:00$?",
                        ["$120^\\circ$", "$100^\\circ$", "$90^\\circ$", "$110^\\circ$"], 0,
                        "Each hour on a clock represents $\\frac{360^\\circ}{12} = 30^\\circ$. At $4:00$, the hands are $4$ hours apart: $4 \\times 30^\\circ = 120^\\circ$."
                    ),
                    make_q(
                        "What is the angle between the hour and minute hands at $2:30$?",
                        ["$105^\\circ$", "$90^\\circ$", "$115^\\circ$", "$100^\\circ$"], 0,
                        "Formula: $|30H - 5.5M| = |30(2) - 5.5(30)| = |60 - 165| = |-105| = 105^\\circ$."
                    ),
                    make_q(
                        "A clock gains $5$ minutes every hour. If it is set correctly at $12:00\\text{ PM}$, what time will it display at $6:00\\text{ PM}$ on the same day?",
                        ["$6:30\\text{ PM}$", "$6:25\\text{ PM}$", "$6:35\\text{ PM}$", "$6:20\\text{ PM}$"], 0,
                        "Elapsed time $= 6$ hours. Total gain $= 6 \\times 5 = 30$ minutes. Displayed time $= 6:30\\text{ PM}$."
                    )
                ]
            },
            {
                "heading": "Section 3: Profit, Loss & Commercial Math",
                "questions": [
                    make_q(
                        "A merchant bought a device for $800$ SAR and sold it at a $25\\%$ profit. What was the selling price?",
                        ["$1000$ SAR", "$950$ SAR", "$1050$ SAR", "$900$ SAR"], 0,
                        "Profit $= 0.25 \\times 800 = 200$ SAR. Selling price $= 800 + 200 = 1000$ SAR."
                    ),
                    make_q(
                        "A store sells an item for $180$ SAR after applying a $10\\%$ discount. What was the original price before the discount?",
                        ["$200$ SAR", "$190$ SAR", "$210$ SAR", "$220$ SAR"], 0,
                        "Let original price be $P$. $0.90 P = 180 \\Rightarrow P = \\frac{180}{0.90} = 200$ SAR."
                    ),
                    make_q(
                        "If a car was purchased for $50,000$ SAR and sold for $42,500$ SAR, what was the percentage loss?",
                        ["$15\\%$", "$12.5\\%$", "$17.5\\%$", "$10\\%$"], 0,
                        "Loss $= 50,000 - 42,500 = 7,500$ SAR. Percentage loss $= \\frac{7500}{50000} \\times 100\\% = 15\\%$."
                    )
                ]
            },
            {
                "heading": "Section 4: Logic, Queuing & Overlap Reasoning",
                "questions": [
                    make_q(
                        "In a line of people, Tariq is $8^{\\text{th}}$ from the front and $12^{\\text{th}}$ from the back. How many people are in the line?",
                        ["$19$", "$20$", "$21$", "$18$"], 0,
                        "Total in line $= \\text{Front rank} + \\text{Back rank} - 1 = 8 + 12 - 1 = 19$."
                    ),
                    make_q(
                        "In a class of $30$ students, $18$ play football, $15$ play basketball, and $5$ play neither sport. How many students play both sports?",
                        ["$8$", "$7$", "$9$", "$6$"], 0,
                        "Students playing at least one sport $= 30 - 5 = 25$. By inclusion-exclusion: $18 + 15 - \\text{Both} = 25 \\Rightarrow 33 - \\text{Both} = 25 \\Rightarrow \\text{Both} = 8$."
                    ),
                    make_q(
                        "A box contains $10$ black socks and $10$ white socks mixed together. What is the minimum number of socks one must draw in the dark to guarantee at least one matching pair?",
                        ["$3$", "$2$", "$4$", "$11$"], 0,
                        "By the pigeonhole principle: There are $2$ colors. Drawing $2 + 1 = 3$ socks guarantees that at least two must share the same color."
                    )
                ]
            }
        ]
    },
    {
        "track": "qudrat", "num": "8.01", "lang": "ar", "slug": "word-problems-reasoning",
        "title": "المسائل اللفظية والتفكير الرياضي",
        "sections": [
            {
                "heading": "القسم 1: مسائل الأعمار والعلاقات الزمنية",
                "questions": [
                    make_q(
                        "عمر أب الآن $4$ أمثال عمر ابنه. بعد $10$ سنوات، يصبح عمر الأب مثلي عمر ابنه. كم عمر الأب الآن؟",
                        ["$20$ سنة", "$24$ سنة", "$28$ سنة", "$16$ سنة"], 0,
                        "نفرض عمر الابن $s$ وعمر الأب $4s$. بعد $10$ سنوات: $4s + 10 = 2(s + 10) \\Rightarrow 4s + 10 = 2s + 20 \\Rightarrow 2s = 10 \\Rightarrow s = 5$. عمر الأب $= 4 \\times 5 = 20$ سنة."
                    ),
                    make_q(
                        "مجموع عمري عمر وزيد $35$ سنة. إذا كان عمر يكبر زيداً بـ $5$ سنوات، فما عمر زيد؟",
                        ["$15$ سنة", "$18$ سنة", "$20$ سنة", "$12$ سنة"], 0,
                        "نفرض عمر زيد $z$. إذن عمر عمر $= z + 5$. المجموع: $z + z + 5 = 35 \\Rightarrow 2z = 30 \\Rightarrow z = 15$ سنة."
                    ),
                    make_q(
                        "قبل $3$ سنوات كان عمر سارة مثلي عمر أخيها. إذا كان عمر سارة الآن $15$ سنة، فكم عمر أخيها الآن؟",
                        ["$9$ سنوات", "$8$ سنوات", "$10$ سنوات", "$7$ سنوات"], 0,
                        "قبل $3$ سنوات كان عمر سارة $15 - 3 = 12$ سنة، وعمر أخيها حينها $\\frac{12}{2} = 6$ سنوات. إذن عمره الآن $= 6 + 3 = 9$ سنوات."
                    )
                ]
            },
            {
                "heading": "القسم 2: زوايا عقارب الساعة والفترات الزمنية",
                "questions": [
                    make_q(
                        "ما قياس الزاوية الصغرى بين عقربي الساعات والدقائق عند الساعة الرابعة تماماً ($4:00$)؟",
                        ["$120^\\circ$", "$100^\\circ$", "$90^\\circ$", "$110^\\circ$"], 0,
                        "كل ساعة تمثل زاوية قدرها $\\frac{360^\\circ}{12} = 30^\\circ$. عند الساعة الرابعة: $4 \\times 30^\\circ = 120^\\circ$."
                    ),
                    make_q(
                        "ما قياس الزاوية الصغرى بين عقربي الساعات والدقائق عند الساعة الثانية والنصف ($2:30$)؟",
                        ["$105^\\circ$", "$90^\\circ$", "$115^\\circ$", "$100^\\circ$"], 0,
                        "قانون زاوية العقربين: $|30 \\times \\text{الساعات} - 5.5 \\times \\text{الدقائق}| = |30(2) - 5.5(30)| = |60 - 165| = 105^\\circ$."
                    ),
                    make_q(
                        "ساعة تقدم $5$ دقائق كل ساعة. إذا ضبطت الساعة بدقة عند الساعة $12:00$ ظهراً، فكم يكون الوقت في الساعة عندما تدق الساعة الحقيقية $6:00$ مساءً من نفس اليوم؟",
                        ["$6:30$ مساءً", "$6:25$ مساءً", "$6:35$ مساءً", "$6:20$ مساءً"], 0,
                        "الزمن المنقضي $= 6$ ساعات. مقدار التقدم $= 6 \\times 5 = 30$ دقيقة. الوقت في الساعة $= 6:30$ مساءً."
                    )
                ]
            },
            {
                "heading": "القسم 3: الربح والخسارة والحسابات التجارية",
                "questions": [
                    make_q(
                        "اشترى تاجر جهازاً بمبلغ $800$ ريال وباعه بربح قدره $25\\%$. بكم ريالا باعه؟",
                        ["$1000$ ريال", "$950$ ريالاً", "$1050$ ريالاً", "$900$ ريال"], 0,
                        "قيمة الربح $= 0.25 \\times 800 = 200$ ريال. سعر البيع $= 800 + 200 = 1000$ ريال."
                    ),
                    make_q(
                        "باع محل سلعة بمبلغ $180$ ريالاً بعد خصم قدره $10\\%$. كم كان سعر السلعة الأصلي قبل الخصم؟",
                        ["$200$ ريال", "$190$ ريالاً", "$210$ ريالات", "$220$ ريالاً"], 0,
                        "السعر بعد الخصم يمثل $90\\%$ من السعر الأصلي: $0.90 P = 180 \\Rightarrow P = \\frac{180}{0.90} = 200$ ريال."
                    ),
                    make_q(
                        "إذا اشتريت سيارة بمبلغ $50,000$ ريال وبيعت بمبلغ $42,500$ ريال، فما هي النسبة المئوية للخسارة؟",
                        ["$15\\%$", "$12.5\\%$", "$17.5\\%$", "$10\\%$"], 0,
                        "قيمة الخسارة $= 50,000 - 42,500 = 7,500$ ريال. نسبة الخسارة $= \\frac{7500}{50000} \\times 100\\% = 15\\%$."
                    )
                ]
            },
            {
                "heading": "القسم 4: الترتيب في الطابور وأشكال فن والمنطق",
                "questions": [
                    make_q(
                        "في طابور صباحي، كان ترتيب طارق الثامن من البداية والثاني عشر من النهاية. كم عدد الطلاب في الطابور؟",
                        ["$19$ طالباً", "$20$ طالباً", "$21$ طالباً", "$18$ طالباً"], 0,
                        "العدد الإجمالي $= \\text{الترتيب من البداية} + \\text{الترتيب من النهاية} - 1 = 8 + 12 - 1 = 19$ طالباً."
                    ),
                    make_q(
                        "في فصل دراسي به $30$ طالباً، $18$ طالباً يلعبون كرة القدم، و $15$ يلعبون كرة السلة، و $5$ طلاب لا يمارسون أي رياضة. كم طالباً يلعب الرياضتين معاً؟",
                        ["$8$ طلاب", "$7$ طلاب", "$9$ طلاب", "$6$ طلاب"], 0,
                        "الطلاب الممارسون للرياضة $= 30 - 5 = 25$. وفق مبدأ الاحتواء والاستبعاد: $18 + 15 - \\text{المشترك} = 25 \\Rightarrow 33 - \\text{المشترك} = 25 \\Rightarrow \\text{المشترك} = 8$ طلاب."
                    ),
                    make_q(
                        "صندوق به $10$ جوارب سوداء و $10$ جوارب بيضاء مختلطة. ما هو أقل عدد من الجوارب يجب سحبه في الظلام لضمان الحصول على زوج متطابق من الجوارب؟",
                        ["$3$ جوارب", "$2$ جوربان", "$4$ جوارب", "$11$ جورباً"], 0,
                        "حسب مبدأ برج الحمام: لدينا لونان فقط. سحب $2 + 1 = 3$ جوارب يضمن بالضرورة الحصول على لونين متماثلين على الأقل."
                    )
                ]
            }
        ]
    }
]
