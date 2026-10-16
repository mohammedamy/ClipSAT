#!/usr/bin/env python3
"""Data definitions for Tahsili topics 5.01 through 9.01 (AR + EN)."""

def make_q(q, choices, correct, answer):
    return {
        "q": q,
        "choices": choices,
        "correct": correct,
        "answer": answer
    }

TAHSILI_TOPICS_P2 = [
    # --------------------------------------------------------------------------
    # 5.01: Geometry & Coordinate Geometry (EN & AR)
    # --------------------------------------------------------------------------
    {
        "track": "tahsili", "num": "5.01", "slug": "geometry-coordinate-geometry",
        "title": "Geometry & Coordinate Geometry",
        "sections": [
            {
                "heading": "Section 1: Vectors & Dot Products",
                "questions": [
                    make_q(
                        "What is the dot product of the vectors $u = \\langle 3, -4 \\rangle$ and $v = \\langle 2, 5 \\rangle$?",
                        ["$-14$", "$26$", "$14$", "$-26$"], 0,
                        "$u \\cdot v = (3)(2) + (-4)(5) = 6 - 20 = -14$."
                    ),
                    make_q(
                        "For what value of $k$ are the vectors $u = \\langle k, 3 \\rangle$ and $v = \\langle 6, -2 \\rangle$ perpendicular?",
                        ["$1$", "$2$", "$-1$", "$3$"], 0,
                        "Perpendicular vectors have a dot product of zero: $6k + 3(-2) = 0 \\Rightarrow 6k - 6 = 0 \\Rightarrow k = 1$."
                    ),
                    make_q(
                        "What is the magnitude (length) of the vector $v = \\langle 5, -12 \\rangle$?",
                        ["$13$", "$17$", "$7$", "$169$"], 0,
                        "$\\|v\\| = \\sqrt{5^2 + (-12)^2} = \\sqrt{25 + 144} = \\sqrt{169} = 13$."
                    )
                ]
            },
            {
                "heading": "Section 2: Distance, Midpoint & Lines",
                "questions": [
                    make_q(
                        "What is the distance between the points $A(1, 2)$ and $B(4, 6)$?",
                        ["$5$", "$7$", "$\\sqrt{7}$", "$25$"], 0,
                        "$d = \\sqrt{(4 - 1)^2 + (6 - 2)^2} = \\sqrt{3^2 + 4^2} = \\sqrt{9 + 16} = \\sqrt{25} = 5$."
                    ),
                    make_q(
                        "What are the coordinates of the midpoint of the segment joining $P(-2, 7)$ and $Q(6, 1)$?",
                        ["$(2, 4)$", "$(4, 8)$", "$(2, 3)$", "$(1, 4)$"], 0,
                        "Midpoint $M = \\left(\\frac{-2 + 6}{2}, \\frac{7 + 1}{2}\\right) = (2, 4)$."
                    ),
                    make_q(
                        "What is the slope of a line perpendicular to the line $3x - 4y = 8$?",
                        ["$-\\frac{4}{3}$", "$\\frac{3}{4}$", "$\\frac{4}{3}$", "$-\\frac{3}{4}$"], 0,
                        "Slope of $3x - 4y = 8$ is $m_1 = \\frac{3}{4}$. The perpendicular slope is the negative reciprocal: $m_2 = -\\frac{4}{3}$."
                    )
                ]
            },
            {
                "heading": "Section 3: Conic Sections (Parabola & Circle)",
                "questions": [
                    make_q(
                        "What is the center and radius of the circle $(x - 3)^2 + (y + 2)^2 = 36$?",
                        ["Center $(3, -2)$, radius $6$", "Center $(-3, 2)$, radius $6$", "Center $(3, -2)$, radius $36$", "Center $(-3, 2)$, radius $36$"], 0,
                        "In standard form $(x - h)^2 + (y - k)^2 = r^2$, the center is $(h, k) = (3, -2)$ and $r = \\sqrt{36} = 6$."
                    ),
                    make_q(
                        "In the parabola $(y - 1)^2 = 8(x + 2)$, which direction does it open?",
                        ["To the right", "To the left", "Upward", "Downward"], 0,
                        "Since $y$ is squared and $4p = 8 > 0$, the parabola opens horizontally to the right."
                    ),
                    make_q(
                        "What is the focal length $p$ of the parabola $x^2 = 12y$?",
                        ["$3$", "$6$", "$12$", "$4$"], 0,
                        "$4p = 12 \\Rightarrow p = 3$."
                    )
                ]
            },
            {
                "heading": "Section 4: Conic Sections (Ellipse & Hyperbola)",
                "questions": [
                    make_q(
                        "What is the length of the major axis of the ellipse $\\frac{x^2}{25} + \\frac{y^2}{16} = 1$?",
                        ["$10$", "$5$", "$8$", "$20$"], 0,
                        "$a^2 = 25 \\Rightarrow a = 5$. Length of major axis $= 2a = 2(5) = 10$."
                    ),
                    make_q(
                        "What is the eccentricity $e$ of a conic section if it represents a hyperbola?",
                        ["$e > 1$", "$e = 1$", "$0 < e < 1$", "$e = 0$"], 0,
                        "By definition: Circle has $e = 0$, ellipse has $0 < e < 1$, parabola has $e = 1$, and hyperbola has $e > 1$."
                    ),
                    make_q(
                        "What type of conic section is represented by $x^2 - 4y^2 - 2x + 16y - 19 = 0$?",
                        ["Hyperbola", "Ellipse", "Parabola", "Circle"], 0,
                        "The coefficients of $x^2$ ($+1$) and $y^2$ ($-4$) have opposite signs ($A C < 0$), which defines a hyperbola."
                    )
                ]
            }
        ]
    },
    {
        "track": "tahsili", "num": "5.01", "lang": "ar", "slug": "geometry-coordinate-geometry",
        "title": "الهندسة الإحداثية والقطوع المخروطية",
        "sections": [
            {
                "heading": "القسم 1: المتجهات والضرب الداخلي والتعامد",
                "questions": [
                    make_q(
                        "ما هو حاصل الضرب الداخلي للمتجهين: $u = \\langle 3, -4 \\rangle$ و $v = \\langle 2, 5 \\rangle$؟",
                        ["$-14$", "$26$", "$14$", "$-26$"], 0,
                        "$u \\cdot v = (3)(2) + (-4)(5) = 6 - 20 = -14$."
                    ),
                    make_q(
                        "ما قيمة $k$ التي تجعل المتجهين $u = \\langle k, 3 \\rangle$ و $v = \\langle 6, -2 \\rangle$ متعامدين؟",
                        ["$1$", "$2$", "$-1$", "$3$"], 0,
                        "شرط تعامد متجهين أن يكون ضربهما الداخلي صفراً: $6k + 3(-2) = 0 \\Rightarrow 6k - 6 = 0 \\Rightarrow k = 1$."
                    ),
                    make_q(
                        "ما هو طول (مقدار) المتجه $v = \\langle 5, -12 \\rangle$؟",
                        ["$13$", "$17$", "$7$", "$169$"], 0,
                        "$\\|v\\| = \\sqrt{5^2 + (-12)^2} = \\sqrt{25 + 144} = \\sqrt{169} = 13$."
                    )
                ]
            },
            {
                "heading": "القسم 2: المسافة ونقطة المنتصف وميل المستقيم المتعامد",
                "questions": [
                    make_q(
                        "ما هي المسافة بين النقطتين $A(1, 2)$ و $B(4, 6)$ في المستوى الإحداثي؟",
                        ["$5$", "$7$", "$\\sqrt{7}$", "$25$"], 0,
                        "$d = \\sqrt{(4 - 1)^2 + (6 - 2)^2} = \\sqrt{3^2 + 4^2} = \\sqrt{25} = 5$."
                    ),
                    make_q(
                        "ما إحداثيات نقطة منتصف القطعة المستقيمة الواصلة بين النقطتين $P(-2, 7)$ و $Q(6, 1)$؟",
                        ["$(2, 4)$", "$(4, 8)$", "$(2, 3)$", "$(1, 4)$"], 0,
                        "نقطة المنتصف $M = \\left(\\frac{-2 + 6}{2}, \\frac{7 + 1}{2}\\right) = (2, 4)$."
                    ),
                    make_q(
                        "ما ميل المستقيم العمودي على المستقيم الذي معادلته $3x - 4y = 8$؟",
                        ["$-\\frac{4}{3}$", "$\\frac{3}{4}$", "$\\frac{4}{3}$", "$-\\frac{3}{4}$"], 0,
                        "ميل المستقيم المعطى $m_1 = \\frac{3}{4}$. ميل العمودي عليه هو المعكوس الجمعي والضربي: $m_2 = -\\frac{4}{3}$."
                    )
                ]
            },
            {
                "heading": "القسم 3: القطوع المخروطية (الدائرة والقطع المكافئ)",
                "questions": [
                    make_q(
                        "ما هو مركز ونصف قطر الدائرة التي معادلتها $(x - 3)^2 + (y + 2)^2 = 36$؟",
                        ["المركز $(3, -2)$ ونصف القطر $6$", "المركز $(-3, 2)$ ونصف القطر $6$", "المركز $(3, -2)$ ونصف القطر $36$", "المركز $(-3, 2)$ ونصف القطر $36$"], 0,
                        "من الصورة القياسية للدائرة $(x - h)^2 + (y - k)^2 = r^2$، المركز $(h, k) = (3, -2)$ ونصف القطر $r = \\sqrt{36} = 6$."
                    ),
                    make_q(
                        "القطع المكافئ الذي معادلته $(y - 1)^2 = 8(x + 2)$، في أي اتجاه يفتح؟",
                        ["نحو اليمين", "نحو اليسار", "نحو الأعلى", "نحو الأسفل"], 0,
                        "بما أن التربيع على $y$ والقيمة $4p = 8 > 0$ موجبة، فالقطع أفقي يفتح نحو اليمين."
                    ),
                    make_q(
                        "ما هي البؤرة البعدية $p$ للقطع المكافئ $x^2 = 12y$؟",
                        ["$3$", "$6$", "$12$", "$4$"], 0,
                        "$4p = 12 \\Rightarrow p = 3$."
                    )
                ]
            },
            {
                "heading": "القسم 4: القطع الناقص والقطع الزائد والاختلاف المركزي",
                "questions": [
                    make_q(
                        "ما طول المحور الأكبر للقطع الناقص: $\\frac{x^2}{25} + \\frac{y^2}{16} = 1$؟",
                        ["$10$", "$5$", "$8$", "$20$"], 0,
                        "$a^2 = 25 \\Rightarrow a = 5$. طول المحور الأكبر $= 2a = 2(5) = 10$."
                    ),
                    make_q(
                        "ما قيمة الاختلاف المركزي $e$ للقطع الزائد دائماً؟",
                        ["$e > 1$", "$e = 1$", "$0 < e < 1$", "$e = 0$"], 0,
                        "تعريف الاختلاف المركزي: للدائرة $e = 0$، للقطع الناقص $0 < e < 1$، للقطع المكافئ $e = 1$، وللقطع الزائد $e > 1$."
                    ),
                    make_q(
                        "ما نوع القطع المخروطي الذي تمثله المعادلة: $x^2 - 4y^2 - 2x + 16y - 19 = 0$؟",
                        ["قطع زائد", "قطع ناقص", "قطع مكافئ", "دائرة"], 0,
                        "معاملا $x^2$ ($+1$) و $y^2$ ($-4$) مختلفا الإشارة (حاصل ضربهما سالب $A C < 0$)، وهذا يمثل قطعاً زائداً."
                    )
                ]
            }
        ]
    },

    # --------------------------------------------------------------------------
    # 6.01: Limits & Derivatives (EN & AR)
    # --------------------------------------------------------------------------
    {
        "track": "tahsili", "num": "6.01", "slug": "limits-derivatives",
        "title": "Limits & Derivatives",
        "sections": [
            {
                "heading": "Section 1: Limits & Indeterminate Forms",
                "questions": [
                    make_q(
                        "Evaluate the limit: $\\lim_{x \\to 3} \\frac{x^2 - 9}{x - 3}$.",
                        ["$6$", "$3$", "$0$", "Does not exist"], 0,
                        "Direct substitution gives $\\frac{0}{0}$. Factor numerator: $\\frac{(x - 3)(x + 3)}{x - 3} = x + 3$. Substitute $x = 3$: $3 + 3 = 6$."
                    ),
                    make_q(
                        "Evaluate the limit at infinity: $\\lim_{x \\to \\infty} \\frac{4x^2 + 5}{2x^2 - 3x}$.",
                        ["$2$", "$4$", "$\\infty$", "$0$"], 0,
                        "Divide leading terms: $\\lim_{x \\to \\infty} \\frac{4x^2}{2x^2} = \\frac{4}{2} = 2$."
                    ),
                    make_q(
                        "Evaluate the trigonometric limit: $\\lim_{x \\to 0} \\frac{\\sin(5x)}{x}$.",
                        ["$5$", "$1$", "$0$", "$\\frac{1}{5}$"], 0,
                        "Standard limit rule: $\\lim_{x \\to 0} \\frac{\\sin(kx)}{x} = k = 5$."
                    )
                ]
            },
            {
                "heading": "Section 2: Derivative Rules & Tangent Slopes",
                "questions": [
                    make_q(
                        "If $f(x) = 4x^3 - 5x^2 + 2x - 7$, what is $f'(x)$?",
                        ["$12x^2 - 10x + 2$", "$12x^2 - 10x$", "$4x^2 - 5x + 2$", "$12x^3 - 10x^2 + 2$"], 0,
                        "Power rule: $\\frac{d}{dx}[4x^3] = 12x^2$, $\\frac{d}{dx}[-5x^2] = -10x$, $\\frac{d}{dx}[2x] = 2$. Result: $12x^2 - 10x + 2$."
                    ),
                    make_q(
                        "What is the slope of the tangent line to the curve $y = x^2 - 3x + 4$ at the point where $x = 2$?",
                        ["$1$", "$4$", "$2$", "$-1$"], 0,
                        "$y' = 2x - 3$. At $x = 2$: $y'(2) = 2(2) - 3 = 4 - 3 = 1$."
                    ),
                    make_q(
                        "If $g(x) = (2x + 1)^4$, what is $g'(x)$?",
                        ["$8(2x + 1)^3$", "$4(2x + 1)^3$", "$2(2x + 1)^3$", "$8(2x + 1)^4$"], 0,
                        "Chain rule: $g'(x) = 4(2x + 1)^3 \\cdot \\frac{d}{dx}[2x + 1] = 4(2x + 1)^3 \\cdot 2 = 8(2x + 1)^3$."
                    )
                ]
            },
            {
                "heading": "Section 3: Critical Points & Extrema",
                "questions": [
                    make_q(
                        "For what value of $x$ does the function $f(x) = x^2 - 6x + 8$ have a local minimum?",
                        ["$x = 3$", "$x = 6$", "$x = -3$", "$x = 4$"], 0,
                        "Set $f'(x) = 0$: $2x - 6 = 0 \\Rightarrow 2x = 6 \\Rightarrow x = 3$."
                    ),
                    make_q(
                        "What is the maximum value of $f(x) = -x^2 + 4x + 1$?",
                        ["$5$", "$4$", "$2$", "$7$"], 0,
                        "$f'(x) = -2x + 4 = 0 \\Rightarrow x = 2$. Maximum value $= f(2) = -(2^2) + 4(2) + 1 = -4 + 8 + 1 = 5$."
                    ),
                    make_q(
                        "How many critical numbers does $f(x) = x^3 - 3x$ have on the real line?",
                        ["$2$", "$1$", "$3$", "$0$"], 0,
                        "$f'(x) = 3x^2 - 3 = 0 \\Rightarrow 3(x^2 - 1) = 0 \\Rightarrow x = \\pm 1$ ($2$ critical numbers)."
                    )
                ]
            },
            {
                "heading": "Section 4: Higher Order Derivatives & Motion",
                "questions": [
                    make_q(
                        "If the position of an object is given by $s(t) = t^3 - 6t^2 + 9t$, what is its acceleration $a(t)$ at $t = 3$?",
                        ["$6$", "$0$", "$12$", "$-6$"], 0,
                        "Velocity $v(t) = s'(t) = 3t^2 - 12t + 9$. Acceleration $a(t) = v'(t) = 6t - 12$. At $t = 3$: $a(3) = 6(3) - 12 = 18 - 12 = 6$."
                    ),
                    make_q(
                        "What is the second derivative $f''(x)$ of $f(x) = 2x^4 - 3x^2$?",
                        ["$24x^2 - 6$", "$8x^3 - 6x$", "$24x^2 - 6x$", "$12x^2 - 6$"], 0,
                        "$f'(x) = 8x^3 - 6x$. $f''(x) = 24x^2 - 6$."
                    ),
                    make_q(
                        "At what $x$-value does the curve $y = x^3 - 6x^2 + 5$ have an inflection point?",
                        ["$x = 2$", "$x = 4$", "$x = 0$", "$x = 6$"], 0,
                        "$y' = 3x^2 - 12x$, $y'' = 6x - 12 = 0 \\Rightarrow 6x = 12 \\Rightarrow x = 2$."
                    )
                ]
            }
        ]
    },
    {
        "track": "tahsili", "num": "6.01", "lang": "ar", "slug": "limits-derivatives",
        "title": "النهايات والاشتقاق",
        "sections": [
            {
                "heading": "القسم 1: حساب النهايات والصيغ غير المعينة",
                "questions": [
                    make_q(
                        "احسب قيمة النهاية: $\\lim_{x \\to 3} \\frac{x^2 - 9}{x - 3}$.",
                        ["$6$", "$3$", "$0$", "غير موجودة"], 0,
                        "التعويض المباشر يعطي $\\frac{0}{0}$. نحلل البسط: $\\frac{(x - 3)(x + 3)}{x - 3} = x + 3$. بالتعويض $x = 3$: $3 + 3 = 6$."
                    ),
                    make_q(
                        "احسب النهاية عند اللانهاية: $\\lim_{x \\to \\infty} \\frac{4x^2 + 5}{2x^2 - 3x}$.",
                        ["$2$", "$4$", "$\\infty$", "$0$"], 0,
                        "قسمة معاملي الحدين الأكبر درجة: $\\lim_{x \\to \\infty} \\frac{4x^2}{2x^2} = \\frac{4}{2} = 2$."
                    ),
                    make_q(
                        "احسب النهاية المثلثية الشهيرة: $\\lim_{x \\to 0} \\frac{\\sin(5x)}{x}$.",
                        ["$5$", "$1$", "$0$", "$\\frac{1}{5}$"], 0,
                        "قاعدة النهاية المثلثية: $\\lim_{x \\to 0} \\frac{\\sin(kx)}{x} = k = 5$."
                    )
                ]
            },
            {
                "heading": "القسم 2: قواعد الاشتقاق وميل المماس",
                "questions": [
                    make_q(
                        "إذا كانت $f(x) = 4x^3 - 5x^2 + 2x - 7$، فما هي المشتقة الأولى $f'(x)$؟",
                        ["$12x^2 - 10x + 2$", "$12x^2 - 10x$", "$4x^2 - 5x + 2$", "$12x^3 - 10x^2 + 2$"], 0,
                        "قاعدة مشتقة القوى: $\\frac{d}{dx}[4x^3] = 12x^2$, $\\frac{d}{dx}[-5x^2] = -10x$, $\\frac{d}{dx}[2x] = 2$. المشتقة: $12x^2 - 10x + 2$."
                    ),
                    make_q(
                        "ما ميل مماس المنحنى $y = x^2 - 3x + 4$ عند النقطة التي إحداثيها $x = 2$؟",
                        ["$1$", "$4$", "$2$", "$-1$"], 0,
                        "$y' = 2x - 3$. عند $x = 2$: $y'(2) = 2(2) - 3 = 4 - 3 = 1$."
                    ),
                    make_q(
                        "إذا كانت $g(x) = (2x + 1)^4$، فما مشتقتها $g'(x)$ باستخدام قاعدة السلسلة؟",
                        ["$8(2x + 1)^3$", "$4(2x + 1)^3$", "$2(2x + 1)^3$", "$8(2x + 1)^4$"], 0,
                        "قاعدة السلسلة: $g'(x) = 4(2x + 1)^3 \\times 2 = 8(2x + 1)^3$."
                    )
                ]
            },
            {
                "heading": "القسم 3: النقاط الحرجة والقيم القصوى المحلية",
                "questions": [
                    make_q(
                        "عند أي قيمة لـ $x$ تكون للدالة $f(x) = x^2 - 6x + 8$ قيمة صغرى محلية؟",
                        ["$x = 3$", "$x = 6$", "$x = -3$", "$x = 4$"], 0,
                        "نساوي المشتقة بالصفر: $f'(x) = 2x - 6 = 0 \\Rightarrow 2x = 6 \\Rightarrow x = 3$."
                    ),
                    make_q(
                        "ما هي القيمة العظمى للدالة $f(x) = -x^2 + 4x + 1$؟",
                        ["$5$", "$4$", "$2$", "$7$"], 0,
                        "$f'(x) = -2x + 4 = 0 \\Rightarrow x = 2$. القيمة العظمى $= f(2) = -(4) + 8 + 1 = 5$."
                    ),
                    make_q(
                        "كم عدداً حرجاً للدالة $f(x) = x^3 - 3x$ على مجموعة الأعداد الحقيقية؟",
                        ["$2$", "$1$", "$3$", "$0$"], 0,
                        "$f'(x) = 3x^2 - 3 = 0 \\Rightarrow 3(x^2 - 1) = 0 \\Rightarrow x = \\pm 1$ (يوجد عددان حرجان)."
                    )
                ]
            },
            {
                "heading": "القسم 4: المشتقات العليا وتطبيقات الحركة الفيزيائية",
                "questions": [
                    make_q(
                        "إذا كان موقع جسم يعطى بالدالة $s(t) = t^3 - 6t^2 + 9t$، فما هو تسارعه $a(t)$ عند $t = 3$ ثوانٍ؟",
                        ["$6$", "$0$", "$12$", "$-6$"], 0,
                        "السرعة $v(t) = s'(t) = 3t^2 - 12t + 9$. التسارع $a(t) = v'(t) = 6t - 12$. عند $t = 3$: $a(3) = 6(3) - 12 = 6$."
                    ),
                    make_q(
                        "ما هي المشتقة الثانية $f''(x)$ للدالة $f(x) = 2x^4 - 3x^2$؟",
                        ["$24x^2 - 6$", "$8x^3 - 6x$", "$24x^2 - 6x$", "$12x^2 - 6$"], 0,
                        "$f'(x) = 8x^3 - 6x$. المشتقة الثانية $f''(x) = 24x^2 - 6$."
                    ),
                    make_q(
                        "عند أي قيمة لـ $x$ توجد نقطة انعطاف لمنحنى الدالة $y = x^3 - 6x^2 + 5$؟",
                        ["$x = 2$", "$x = 4$", "$x = 0$", "$x = 6$"], 0,
                        "نقطة الانعطاف تنعدم عندها المشتقة الثانية: $y' = 3x^2 - 12x$, $y'' = 6x - 12 = 0 \\Rightarrow 6x = 12 \\Rightarrow x = 2$."
                    )
                ]
            }
        ]
    },

    # --------------------------------------------------------------------------
    # 7.01: Integration & Applications (EN & AR)
    # --------------------------------------------------------------------------
    {
        "track": "tahsili", "num": "7.01", "slug": "integration-applications",
        "title": "Integration & Applications",
        "sections": [
            {
                "heading": "Section 1: Indefinite Integrals & Power Rule",
                "questions": [
                    make_q(
                        "Evaluate the indefinite integral: $\\int (6x^2 - 4x + 3)\\,dx$.",
                        ["$2x^3 - 2x^2 + 3x + C$", "$3x^3 - 2x^2 + 3x + C$", "$2x^3 - 4x^2 + 3x + C$", "$6x^3 - 2x^2 + 3x + C$"], 0,
                        "Power rule for integration: $\\int 6x^2\\,dx = 2x^3$, $\\int -4x\\,dx = -2x^2$, $\\int 3\\,dx = 3x$. Result: $2x^3 - 2x^2 + 3x + C$."
                    ),
                    make_q(
                        "Evaluate $\\int 8x^3\\,dx$.",
                        ["$2x^4 + C$", "$4x^4 + C$", "$8x^4 + C$", "$x^4 + C$"], 0,
                        "$\\int 8x^3\\,dx = \\frac{8x^4}{4} + C = 2x^4 + C$."
                    ),
                    make_q(
                        "What is $\\int \\frac{1}{x^2}\\,dx$?",
                        ["$-\\frac{1}{x} + C$", "$\\frac{1}{x} + C$", "$-\\frac{2}{x^3} + C$", "$\\ln(x^2) + C$"], 0,
                        "Rewrite as $x^{-2}$: $\\int x^{-2}\\,dx = \\frac{x^{-1}}{-1} + C = -\\frac{1}{x} + C$."
                    )
                ]
            },
            {
                "heading": "Section 2: Definite Integrals",
                "questions": [
                    make_q(
                        "Evaluate the definite integral: $\\int_0^3 2x\\,dx$.",
                        ["$9$", "$6$", "$18$", "$12$"], 0,
                        "Antiderivative is $x^2$. Evaluating from $0$ to $3$: $3^2 - 0^2 = 9$."
                    ),
                    make_q(
                        "Evaluate $\\int_1^2 (3x^2 + 1)\\,dx$.",
                        ["$8$", "$7$", "$9$", "$10$"], 0,
                        "Antiderivative is $x^3 + x$. Evaluating: $[2^3 + 2] - [1^3 + 1] = [8 + 2] - [1 + 1] = 10 - 2 = 8$."
                    ),
                    make_q(
                        "What is the value of $\\int_{-2}^2 x^3\\,dx$?",
                        ["$0$", "$8$", "$16$", "$-8$"], 0,
                        "Since $f(x) = x^3$ is an odd function integrated over a symmetric interval $[-a, a]$, the integral is exactly $0$."
                    )
                ]
            },
            {
                "heading": "Section 3: Area Under Curves",
                "questions": [
                    make_q(
                        "What is the area of the region bounded by $y = x^2$, the $x$-axis, and the lines $x = 0$ and $x = 3$?",
                        ["$9$", "$6$", "$12$", "$27$"], 0,
                        "Area $= \\int_0^3 x^2\\,dx = \\left[ \\frac{x^3}{3} \\right]_0^3 = \\frac{27}{3} - 0 = 9$."
                    ),
                    make_q(
                        "What is the area of the region under the line $y = 4$ from $x = 1$ to $x = 5$?",
                        ["$16$", "$20$", "$12$", "$8$"], 0,
                        "Geometric rectangle with base $5 - 1 = 4$ and height $4$: Area $= 4 \\times 4 = 16$."
                    ),
                    make_q(
                        "Find the area between the curve $y = 6x - x^2$ and the $x$-axis from $x = 0$ to its root $x = 6$.",
                        ["$36$", "$18$", "$72$", "$54$"], 0,
                        "$\\int_0^6 (6x - x^2)\\,dx = \\left[ 3x^2 - \\frac{x^3}{3} \\right]_0^6 = 3(36) - \\frac{216}{3} = 108 - 72 = 36$."
                    )
                ]
            },
            {
                "heading": "Section 4: Fundamental Theorem of Calculus",
                "questions": [
                    make_q(
                        "If $F(x) = \\int_1^x (3t^2 - 2)\\,dt$, what is $F'(x)$?",
                        ["$3x^2 - 2$", "$x^3 - 2x$", "$6x$", "$3x^2$"], 0,
                        "By the Fundamental Theorem of Calculus Part 1: $\\frac{d}{dx}\\int_a^x f(t)\\,dt = f(x) = 3x^2 - 2$."
                    ),
                    make_q(
                        "If $\\int_1^4 f(x)\\,dx = 7$ and $\\int_2^4 f(x)\\,dx = 3$, what is $\\int_1^2 f(x)\\,dx$?",
                        ["$4$", "$10$", "$2$", "$5$"], 0,
                        "By additivity of integrals: $\\int_1^2 f(x)\\,dx = \\int_1^4 f(x)\\,dx - \\int_2^4 f(x)\\,dx = 7 - 3 = 4$."
                    ),
                    make_q(
                        "What is the value of $\\int_5^5 (x^4 + 3x + 1)\\,dx$?",
                        ["$0$", "$1$", "$5$", "Undefined"], 0,
                        "An integral where upper and lower limits are identical always equals $0$."
                    )
                ]
            }
        ]
    },
    {
        "track": "tahsili", "num": "7.01", "lang": "ar", "slug": "integration-applications",
        "title": "التكامل وتطبيقاته",
        "sections": [
            {
                "heading": "القسم 1: التكامل غير المحدد وقاعدة القوى",
                "questions": [
                    make_q(
                        "أوجد التكامل غير المحدد: $\\int (6x^2 - 4x + 3)\\,dx$.",
                        ["$2x^3 - 2x^2 + 3x + C$", "$3x^3 - 2x^2 + 3x + C$", "$2x^3 - 4x^2 + 3x + C$", "$6x^3 - 2x^2 + 3x + C$"], 0,
                        "تطبيق قاعدة القوى للتكامل: $\\int 6x^2\\,dx = 2x^3$, $\\int -4x\\,dx = -2x^2$, $\\int 3\\,dx = 3x$. الناتج: $2x^3 - 2x^2 + 3x + C$."
                    ),
                    make_q(
                        "أوجد قيمة: $\\int 8x^3\\,dx$.",
                        ["$2x^4 + C$", "$4x^4 + C$", "$8x^4 + C$", "$x^4 + C$"], 0,
                        "$\\int 8x^3\\,dx = \\frac{8x^4}{4} + C = 2x^4 + C$."
                    ),
                    make_q(
                        "ما ناتج: $\\int \\frac{1}{x^2}\\,dx$؟",
                        ["$-\\frac{1}{x} + C$", "$\\frac{1}{x} + C$", "$-\\frac{2}{x^3} + C$", "$\\ln(x^2) + C$"], 0,
                        "كتابة الكسر بالصورة الأسية $x^{-2}$: $\\int x^{-2}\\,dx = \\frac{x^{-1}}{-1} + C = -\\frac{1}{x} + C$."
                    )
                ]
            },
            {
                "heading": "القسم 2: التكامل المحدد وحساب القيم",
                "questions": [
                    make_q(
                        "احسب قيمة التكامل المحدد: $\\int_0^3 2x\\,dx$.",
                        ["$9$", "$6$", "$18$", "$12$"], 0,
                        "الدالة الأصلية هي $x^2$. بالتعويض بحدود التكامل من $0$ إلى $3$: $3^2 - 0^2 = 9$."
                    ),
                    make_q(
                        "احسب قيمة: $\\int_1^2 (3x^2 + 1)\\,dx$.",
                        ["$8$", "$7$", "$9$", "$10$"], 0,
                        "الدالة الأصلية هي $x^3 + x$. بالتعويض: $[2^3 + 2] - [1^3 + 1] = 10 - 2 = 8$."
                    ),
                    make_q(
                        "ما قيمة التكامل المحدد لدالة فردية: $\\int_{-2}^2 x^3\\,dx$؟",
                        ["$0$", "$8$", "$16$", "$-8$"], 0,
                        "تكامل أي دالة فردية على فترة متماثلة حول الصفر $[-a, a]$ يساوي صفراً دائماً."
                    )
                ]
            },
            {
                "heading": "القسم 3: المساحات تحت المنحنيات",
                "questions": [
                    make_q(
                        "ما مساحة المنطقة المحصورة بين منحنى $y = x^2$ ومحور $x$ والمستقيمين $x = 0$ و $x = 3$؟",
                        ["$9$", "$6$", "$12$", "$27$"], 0,
                        "المساحة $= \\int_0^3 x^2\\,dx = \\left[ \\frac{x^3}{3} \\right]_0^3 = \\frac{27}{3} = 9$."
                    ),
                    make_q(
                        "ما مساحة المنطقة الواقعة تحت الخط المستقيم $y = 4$ من $x = 1$ إلى $x = 5$؟",
                        ["$16$", "$20$", "$12$", "$8$"], 0,
                        "مستطيل قاعدته $5 - 1 = 4$ وارتفاعه $4$: المساحة $= 4 \\times 4 = 16$."
                    ),
                    make_q(
                        "أوجد مساحة المنطقة المحصورة بين المنحنى $y = 6x - x^2$ ومحور $x$ من $x = 0$ إلى $x = 6$.",
                        ["$36$", "$18$", "$72$", "$54$"], 0,
                        "$\\int_0^6 (6x - x^2)\\,dx = \\left[ 3x^2 - \\frac{x^3}{3} \\right]_0^6 = 3(36) - \\frac{216}{3} = 108 - 72 = 36$."
                    )
                ]
            },
            {
                "heading": "القسم 4: النظرية الأساسية للتفاضل والتكامل وخواص الحدود",
                "questions": [
                    make_q(
                        "إذا كانت $F(x) = \\int_1^x (3t^2 - 2)\\,dt$، فما مشتقتها $F'(x)$؟",
                        ["$3x^2 - 2$", "$x^3 - 2x$", "$6x$", "$3x^2$"], 0,
                        "حسب النظرية الأساسية للتفاضل والتكامل: $\\frac{d}{dx}\\int_a^x f(t)\\,dt = f(x) = 3x^2 - 2$."
                    ),
                    make_q(
                        "إذا كان $\\int_1^4 f(x)\\,dx = 7$ وكان $\\int_2^4 f(x)\\,dx = 3$، فما قيمة $\\int_1^2 f(x)\\,dx$؟",
                        ["$4$", "$10$", "$2$", "$5$"], 0,
                        "خاصية إضافة فترات التكامل: $\\int_1^2 f(x)\\,dx = \\int_1^4 f(x)\\,dx - \\int_2^4 f(x)\\,dx = 7 - 3 = 4$."
                    ),
                    make_q(
                        "ما قيمة التكامل المحدد المتساوي الحدين: $\\int_5^5 (x^4 + 3x + 1)\\,dx$؟",
                        ["$0$", "$1$", "$5$", "غير معرف"], 0,
                        "إذا تساوى حدا التكامل الأعلى والأدنى، فإن قيمة التكامل تساوي صفراً دائماً."
                    )
                ]
            }
        ]
    },

    # --------------------------------------------------------------------------
    # 8.01: Exponentials & Logarithms (EN & AR)
    # --------------------------------------------------------------------------
    {
        "track": "tahsili", "num": "8.01", "slug": "exponentials-logarithms",
        "title": "Exponentials & Logarithms",
        "sections": [
            {
                "heading": "Section 1: Exponential Equations",
                "questions": [
                    make_q(
                        "Solve for $x$: $3^{2x - 1} = 27$.",
                        ["$x = 2$", "$x = 3$", "$x = 1$", "$x = 4$"], 0,
                        "$27 = 3^3$. Since bases are equal: $2x - 1 = 3 \\Rightarrow 2x = 4 \\Rightarrow x = 2$."
                    ),
                    make_q(
                        "If $4^{x+1} = \\left(\\frac{1}{2}\\right)^{x-4}$, what is $x$?",
                        ["$x = 2$", "$x = 1$", "$x = 3$", "$x = -2$"], 0,
                        "Express with base $2$: $(2^2)^{x+1} = (2^{-1})^{x-4} \\Rightarrow 2^{2x+2} = 2^{-x+4} \\Rightarrow 2x + 2 = -x + 4 \\Rightarrow 3x = 2 \\Rightarrow x = 2$."
                    ),
                    make_q(
                        "What is the horizontal asymptote of the exponential function $f(x) = 2^x - 5$?",
                        ["$y = -5$", "$y = 5$", "$y = 0$", "$x = -5$"], 0,
                        "As $x \\to -\\infty$, $2^x \\to 0$, so $f(x) \\to -5$. The horizontal asymptote is $y = -5$."
                    )
                ]
            },
            {
                "heading": "Section 2: Logarithmic Properties",
                "questions": [
                    make_q(
                        "What is the value of $\\log_2(32)$?",
                        ["$5$", "$4$", "$6$", "$16$"], 0,
                        "Since $2^5 = 32$, $\\log_2(32) = 5$."
                    ),
                    make_q(
                        "Evaluate $\\log_3(54) - \\log_3(2)$.",
                        ["$3$", "$2$", "$4$", "$27$"], 0,
                        "Quotient property: $\\log_3(54) - \\log_3(2) = \\log_3\\left(\\frac{54}{2}\\right) = \\log_3(27) = 3$."
                    ),
                    make_q(
                        "Simplify: $2\\log_5(x) + \\log_5(y)$.",
                        ["$\\log_5(x^2 y)$", "$\\log_5(2xy)$", "$\\log_5(x^2 + y)$", "$\\log_5(xy^2)$"], 0,
                        "Power and product rules: $2\\log_5(x) + \\log_5(y) = \\log_5(x^2) + \\log_5(y) = \\log_5(x^2 y)$."
                    )
                ]
            },
            {
                "heading": "Section 3: Logarithmic Equations",
                "questions": [
                    make_q(
                        "Solve for $x$: $\\log_4(2x + 8) = 3$.",
                        ["$x = 28$", "$x = 24$", "$x = 32$", "$x = 16$"], 0,
                        "Convert to exponential form: $2x + 8 = 4^3 = 64 \\Rightarrow 2x = 56 \\Rightarrow x = 28$."
                    ),
                    make_q(
                        "Solve for $x$: $\\log_2(x) + \\log_2(x - 2) = 3$.",
                        ["$x = 4$", "$x = 2$", "$x = -2$", "$x = 6$"], 0,
                        "$\\log_2[x(x - 2)] = 3 \\Rightarrow x^2 - 2x = 2^3 = 8 \\Rightarrow x^2 - 2x - 8 = 0 \\Rightarrow (x - 4)(x + 2) = 0$. Since $\\log$ requires $x > 2$, $x = 4$."
                    ),
                    make_q(
                        "What is the domain of the function $f(x) = \\log_3(4 - x)$?",
                        ["$(-\\infty, 4)$", "$[4, \\infty)$", "$(4, \\infty)$", "$(-\\infty, 4]$"], 0,
                        "The argument of a logarithm must be strictly positive: $4 - x > 0 \\Rightarrow x < 4$, which is $(-\\infty, 4)$."
                    )
                ]
            },
            {
                "heading": "Section 4: Natural Logarithms & Base e",
                "questions": [
                    make_q(
                        "Evaluate $\\ln(e^7)$.",
                        ["$7$", "$e$", "$1$", "$14$"], 0,
                        "By the inverse property of natural logs: $\\ln(e^x) = x$, so $\\ln(e^7) = 7$."
                    ),
                    make_q(
                        "Solve the natural exponential equation: $e^{2x} = 5$.",
                        ["$x = \\frac{\\ln 5}{2}$", "$x = 2\\ln 5$", "$x = \\ln(2.5)$", "$x = \\frac{5}{2e}$"], 0,
                        "Take $\\ln$ of both sides: $2x = \\ln 5 \\Rightarrow x = \\frac{\\ln 5}{2}$."
                    ),
                    make_q(
                        "What is the value of $e^{\\ln(12)}$?",
                        ["$12$", "$1$", "$e$", "$144$"], 0,
                        "By definition of inverse operations: $e^{\\ln x} = x$, so $e^{\\ln(12)} = 12$."
                    )
                ]
            }
        ]
    },
    {
        "track": "tahsili", "num": "8.01", "lang": "ar", "slug": "exponentials-logarithms",
        "title": "الدوال الأسية واللوغاريتمية",
        "sections": [
            {
                "heading": "القسم 1: المعادلات الأسية وخطوط التقارب",
                "questions": [
                    make_q(
                        "حل المعادلة الأسية: $3^{2x - 1} = 27$.",
                        ["$x = 2$", "$x = 3$", "$x = 1$", "$x = 4$"], 0,
                        "$27 = 3^3$. بتساوي الأساسات تتساوى الأسس: $2x - 1 = 3 \\Rightarrow 2x = 4 \\Rightarrow x = 2$."
                    ),
                    make_q(
                        "إذا كان $4^{x+1} = \\left(\\frac{1}{2}\\right)^{x-4}$، فما قيمة $x$؟",
                        ["$x = 2$", "$x = 1$", "$x = 3$", "$x = -2$"], 0,
                        "التحويل للأساس $2$: $(2^2)^{x+1} = (2^{-1})^{x-4} \\Rightarrow 2x + 2 = -x + 4 \\Rightarrow 3x = 2 \\Rightarrow x = 2$."
                    ),
                    make_q(
                        "ما هو خط التقارب الأفقي للدالة الأسية: $f(x) = 2^x - 5$؟",
                        ["$y = -5$", "$y = 5$", "$y = 0$", "$x = -5$"], 0,
                        "عندما $x \\to -\\infty$ يقترب $2^x$ من الصفر، إذن خط التقارب الأفقي هو $y = -5$."
                    )
                ]
            },
            {
                "heading": "القسم 2: خصائص اللوغاريتمات وحساب قيمها",
                "questions": [
                    make_q(
                        "ما قيمة المقدار اللوغاريتمي: $\\log_2(32)$؟",
                        ["$5$", "$4$", "$6$", "$16$"], 0,
                        "بما أن $2^5 = 32$، فإن $\\log_2(32) = 5$."
                    ),
                    make_q(
                        "احسب قيمة: $\\log_3(54) - \\log_3(2)$.",
                        ["$3$", "$2$", "$4$", "$27$"], 0,
                        "خاصية قسمة اللوغاريتمات: $\\log_3(54) - \\log_3(2) = \\log_3\\left(\\frac{54}{2}\\right) = \\log_3(27) = 3$."
                    ),
                    make_q(
                        "اكتب في صورة لوغاريتم واحد: $2\\log_5(x) + \\log_5(y)$.",
                        ["$\\log_5(x^2 y)$", "$\\log_5(2xy)$", "$\\log_5(x^2 + y)$", "$\\log_5(xy^2)$"], 0,
                        "قاعدتا القوة والضرب: $2\\log_5(x) + \\log_5(y) = \\log_5(x^2) + \\log_5(y) = \\log_5(x^2 y)$."
                    )
                ]
            },
            {
                "heading": "القسم 3: المعادلات اللوغاريتمية ومجال الدالة",
                "questions": [
                    make_q(
                        "حل المعادلة اللوغاريتمية: $\\log_4(2x + 8) = 3$.",
                        ["$x = 28$", "$x = 24$", "$x = 32$", "$x = 16$"], 0,
                        "التحويل للصورة الأسية: $2x + 8 = 4^3 = 64 \\Rightarrow 2x = 56 \\Rightarrow x = 28$."
                    ),
                    make_q(
                        "حل المعادلة: $\\log_2(x) + \\log_2(x - 2) = 3$.",
                        ["$x = 4$", "$x = 2$", "$x = -2$", "$x = 6$"], 0,
                        "$\\log_2[x(x - 2)] = 3 \\Rightarrow x^2 - 2x = 8 \\Rightarrow (x - 4)(x + 2) = 0$. وبما أن مجال اللوغاريتم موجب ($x > 2$)، فالحل هو $x = 4$."
                    ),
                    make_q(
                        "ما مجال الدالة اللوغاريتمية: $f(x) = \\log_3(4 - x)$؟",
                        ["$(-\\infty, 4)$", "$[4, \\infty)$", "$(4, \\infty)$", "$(-\\infty, 4]$"], 0,
                        "ما بداخل اللوغاريتم يجب أن يكون موجباً تماماً: $4 - x > 0 \\Rightarrow x < 4$، أي الفترة $(-\\infty, 4)$."
                    )
                ]
            },
            {
                "heading": "القسم 4: اللوغاريتم الطبيعي والأساس النيبيري e",
                "questions": [
                    make_q(
                        "احسب قيمة اللوغاريتم الطبيعي: $\\ln(e^7)$.",
                        ["$7$", "$e$", "$1$", "$14$"], 0,
                        "اللوغاريتم الطبيعي يلغي الأساس $e$: $\\ln(e^7) = 7$."
                    ),
                    make_q(
                        "حل المعادلة الأسية الطبيعية: $e^{2x} = 5$.",
                        ["$x = \\frac{\\ln 5}{2}$", "$x = 2\\ln 5$", "$x = \\ln(2.5)$", "$x = \\frac{5}{2e}$"], 0,
                        "بأخذ $\\ln$ للطرفين: $2x = \\ln 5 \\Rightarrow x = \\frac{\\ln 5}{2}$."
                    ),
                    make_q(
                        "ما قيمة المقدار: $e^{\\ln(12)}$؟",
                        ["$12$", "$1$", "$e$", "$144$"], 0,
                        "دالة الأساس $e$ واللوغاريتم الطبيعي دالتان عكسيتان: $e^{\\ln x} = x$، إذن $e^{\\ln(12)} = 12$."
                    )
                ]
            }
        ]
    },

    # --------------------------------------------------------------------------
    # 9.01: Statistics & Probability (EN & AR)
    # --------------------------------------------------------------------------
    {
        "track": "tahsili", "num": "9.01", "slug": "statistics-probability",
        "title": "Statistics & Probability",
        "sections": [
            {
                "heading": "Section 1: Permutations & Combinations",
                "questions": [
                    make_q(
                        "In how many ways can a president and a vice president be chosen from a committee of $6$ people?",
                        ["$30$", "$15$", "$36$", "$12$"], 0,
                        "Order matters (roles are distinct): $P(6, 2) = 6 \\times 5 = 30$."
                    ),
                    make_q(
                        "How many distinct committees of $3$ students can be selected from a group of $7$ students?",
                        ["$35$", "$210$", "$21$", "$42$"], 0,
                        "Order does not matter: $\\binom{7}{3} = \\frac{7 \\times 6 \\times 5}{3 \\times 2 \\times 1} = 35$."
                    ),
                    make_q(
                        "What is the value of $\\frac{6!}{4! \\times 2!}$?",
                        ["$15$", "$30$", "$12$", "$20$"], 0,
                        "$\\frac{6 \\times 5 \\times 4!}{4! \\times 2} = \\frac{30}{2} = 15$."
                    )
                ]
            },
            {
                "heading": "Section 2: Conditional & Compound Probability",
                "questions": [
                    make_q(
                        "If $P(A) = 0.6$, $P(B) = 0.5$, and $P(A \\cap B) = 0.3$, what is $P(A \\cup B)$?",
                        ["$0.8$", "$0.7$", "$0.9$", "$1.1$"], 0,
                        "Addition rule: $P(A \\cup B) = P(A) + P(B) - P(A \\cap B) = 0.6 + 0.5 - 0.3 = 0.8$."
                    ),
                    make_q(
                        "If $P(B) = 0.4$ and $P(A \\cap B) = 0.12$, what is the conditional probability $P(A|B)$?",
                        ["$0.30$", "$0.48$", "$0.25$", "$0.52$"], 0,
                        "$P(A|B) = \\frac{P(A \\cap B)}{P(B)} = \\frac{0.12}{0.40} = 0.30$."
                    ),
                    make_q(
                        "If events $A$ and $B$ are independent with $P(A) = 0.3$ and $P(B) = 0.4$, what is $P(A \\cap B)$?",
                        ["$0.12$", "$0.70$", "$0.10$", "$0.24$"], 0,
                        "For independent events: $P(A \\cap B) = P(A) \\times P(B) = 0.3 \\times 0.4 = 0.12$."
                    )
                ]
            },
            {
                "heading": "Section 3: Normal Distribution & Empirical Rule",
                "questions": [
                    make_q(
                        "A normal distribution has mean $\\mu = 50$ and standard deviation $\\sigma = 5$. What percentage of data falls between $45$ and $55$?",
                        ["$68\\%$", "$95\\%$", "$99.7\\%$", "$50\\%$"], 0,
                        "The interval $[45, 55]$ represents $[\\mu - \\sigma, \\mu + \\sigma]$. By the empirical rule, exactly $68\\%$ of the data lies within $1$ standard deviation."
                    ),
                    make_q(
                        "In a normal distribution with mean $100$ and standard deviation $10$, what is the probability that a value is greater than $120$?",
                        ["$2.5\\%$", "$5\\%$", "$16\\%$", "$0.15\\%$"], 0,
                        "$120 = \\mu + 2\\sigma$. The middle $95\\%$ lies within $2\\sigma$. The remaining $5\\%$ is split into two tails: $2.5\\%$ in each tail."
                    ),
                    make_q(
                        "What is the $z$-score for a value $x = 85$ from a distribution with mean $\\mu = 70$ and standard deviation $\\sigma = 10$?",
                        ["$1.5$", "$1.2$", "$2.0$", "$0.85$"], 0,
                        "$z = \\frac{x - \\mu}{\\sigma} = \\frac{85 - 70}{10} = \\frac{15}{10} = 1.5$."
                    )
                ]
            },
            {
                "heading": "Section 4: Measures of Dispersion & Variance",
                "questions": [
                    make_q(
                        "If the variance of a data set is $36$, what is its standard deviation?",
                        ["$6$", "$18$", "$72$", "$12$"], 0,
                        "Standard deviation $\\sigma = \\sqrt{\\text{Variance}} = \\sqrt{36} = 6$."
                    ),
                    make_q(
                        "If $5$ is added to every value in a dataset, how does the standard deviation change?",
                        ["It remains unchanged", "It increases by $5$", "It increases by $25$", "It multiplies by $5$"], 0,
                        "Adding a constant shifts all data points equally, leaving the spread (standard deviation and variance) unchanged."
                    ),
                    make_q(
                        "What is the range of the data set: $12, 5, 23, 18, 9, 31, 14$?",
                        ["$26$", "$25$", "$24$", "$31$"], 0,
                        "Range $= \\text{Maximum} - \\text{Minimum} = 31 - 5 = 26$."
                    )
                ]
            }
        ]
    },
    {
        "track": "tahsili", "num": "9.01", "lang": "ar", "slug": "statistics-probability",
        "title": "الإحصاء والاحتمالات",
        "sections": [
            {
                "heading": "القسم 1: التباديل والتوافيق ومبدأ العد",
                "questions": [
                    make_q(
                        "بكم طريقة يمكن اختيار رئيس ونائب رئيس من بين لجنة مكونة من $6$ أشخاص؟",
                        ["$30$", "$15$", "$36$", "$12$"], 0,
                        "الترتيب مهم لأن المناصب متمايزة: تباديل $P(6, 2) = 6 \\times 5 = 30$ طريقة."
                    ),
                    make_q(
                        "كم لجنة ثلاثية يمكن تشكيلها من بين $7$ طلاب دون مراعاة للترتيب؟",
                        ["$35$", "$210$", "$21$", "$42$"], 0,
                        "توافيق $\\binom{7}{3} = \\frac{7 \\times 6 \\times 5}{3 \\times 2 \\times 1} = 35$ لجنة."
                    ),
                    make_q(
                        "ما قيمة المقدار: $\\frac{6!}{4! \\times 2!}$؟",
                        ["$15$", "$30$", "$12$", "$20$"], 0,
                        "$\\frac{6 \\times 5 \\times 4!}{4! \\times 2} = \\frac{30}{2} = 15$."
                    )
                ]
            },
            {
                "heading": "القسم 2: الاحتمال المشروط والحوادث المستقلة",
                "questions": [
                    make_q(
                        "إذا كان $P(A) = 0.6$ و $P(B) = 0.5$ و $P(A \\cap B) = 0.3$، فما قيمة $P(A \\cup B)$؟",
                        ["$0.8$", "$0.7$", "$0.9$", "$1.1$"], 0,
                        "قانون جمع الاحتمالات: $P(A \\cup B) = P(A) + P(B) - P(A \\cap B) = 0.6 + 0.5 - 0.3 = 0.8$."
                    ),
                    make_q(
                        "إذا كان $P(B) = 0.4$ وكان $P(A \\cap B) = 0.12$، فما الاحتمال المشروط $P(A|B)$؟",
                        ["$0.30$", "$0.48$", "$0.25$", "$0.52$"], 0,
                        "$P(A|B) = \\frac{P(A \\cap B)}{P(B)} = \\frac{0.12}{0.40} = 0.30$."
                    ),
                    make_q(
                        "إذا كانت الحادثتان $A$ و $B$ مستقلتين، وكان $P(A) = 0.3$ و $P(B) = 0.4$، فما قيمة $P(A \\cap B)$؟",
                        ["$0.12$", "$0.70$", "$0.10$", "$0.24$"], 0,
                        "للحوادث المستقلة: $P(A \\cap B) = P(A) \\times P(B) = 0.3 \\times 0.4 = 0.12$."
                    )
                ]
            },
            {
                "heading": "القسم 3: التوزيع الطبيعي والقاعدة التجريبية والدرجة المعيارية",
                "questions": [
                    make_q(
                        "توزيع طبيعي متوسطه الحسابي $\\mu = 50$ وانحرافه المعياري $\\sigma = 5$. ما النسبة المئوية للبيانات التي تقع بين $45$ و $55$؟",
                        ["$68\\%$", "$95\\%$", "$99.7\\%$", "$50\\%$"], 0,
                        "الفترة $[45, 55]$ تمثل $[\\mu - \\sigma, \\mu + \\sigma]$. حسب القاعدة التجريبية، تقع $68\\%$ من البيانات ضمن انحراف معياري واحد عن المتوسط."
                    ),
                    make_q(
                        "في توزيع طبيعي متوسطه $100$ وانحرافه $10$، ما احتمال أن تكون القيمة المختارة عشوائياً أكبر من $120$؟",
                        ["$2.5\\%$", "$5\\%$", "$16\\%$", "$0.15\\%$"], 0,
                        "$120 = \\mu + 2\\sigma$. تقع $95\\%$ من البيانات ضمن انحرافين معياريين، وتتبقى $5\\%$ موزعة بالتساوي على الطرفين: $2.5\\%$ في الطرف الأيمن."
                    ),
                    make_q(
                        "ما الدرجة المعيارية $z$ لقيمة $x = 85$ في توزيع متوسطه $\\mu = 70$ وانحرافه $\\sigma = 10$؟",
                        ["$1.5$", "$1.2$", "$2.0$", "$0.85$"], 0,
                        "$z = \\frac{x - \\mu}{\\sigma} = \\frac{85 - 70}{10} = \\frac{15}{10} = 1.5$."
                    )
                ]
            },
            {
                "heading": "القسم 4: مقاييس التشتت والتباين والمدى",
                "questions": [
                    make_q(
                        "إذا كان التباين لمجموعة من البيانات يساوي $36$، فما هو الانحراف المعياري؟",
                        ["$6$", "$18$", "$72$", "$12$"], 0,
                        "الانحراف المعياري هو الجذر التربيعي الموجب للتباين: $\\sigma = \\sqrt{36} = 6$."
                    ),
                    make_q(
                        "إذا أضيف العدد $5$ إلى كل قيمة في مجموعة بيانات، فما الذي يحدث للانحراف المعياري؟",
                        ["لا يتغير", "يزداد بمقدار $5$", "يزداد بمقدار $25$", "ينضرب في $5$"], 0,
                        "إضافة ثابت إلى جميع القيم ينقل البيانات دون أن يغير مدى تشتتها، وبالتالي يبقى الانحراف المعياري ثابتاً."
                    ),
                    make_q(
                        "ما هو المدى لمجموعة البيانات التالية: $12, 5, 23, 18, 9, 31, 14$؟",
                        ["$26$", "$25$", "$24$", "$31$"], 0,
                        "المدى $= \\text{أكبر قيمة} - \\text{أصغر قيمة} = 31 - 5 = 26$."
                    )
                ]
            }
        ]
    }
]
