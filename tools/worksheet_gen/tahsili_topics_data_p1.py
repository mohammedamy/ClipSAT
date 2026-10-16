#!/usr/bin/env python3
"""Data definitions for Tahsili topics 1.01 through 4.01 (AR + EN)."""

def make_q(q, choices, correct, answer):
    return {
        "q": q,
        "choices": choices,
        "correct": correct,
        "answer": answer
    }

TAHSILI_TOPICS_P1 = [
    # --------------------------------------------------------------------------
    # 1.01: Algebra & Equations (EN & AR)
    # --------------------------------------------------------------------------
    {
        "track": "tahsili", "num": "1.01", "slug": "algebra-equations",
        "title": "Algebra & Equations",
        "sections": [
            {
                "heading": "Section 1: Quadratics & Complex Numbers",
                "questions": [
                    make_q(
                        "What is the value of the discriminant for the quadratic equation $2x^2 - 4x + 5 = 0$?",
                        ["$-24$", "$24$", "$-56$", "$56$"], 0,
                        "Discriminant $\\Delta = b^2 - 4ac = (-4)^2 - 4(2)(5) = 16 - 40 = -24$."
                    ),
                    make_q(
                        "Simplify the complex number expression: $i^{46}$.",
                        ["$-1$", "$1$", "$i$", "$-i$"], 0,
                        "Powers of $i$ repeat every $4$: divide $46 \\div 4 = 11$ with remainder $2$. Thus $i^{46} = i^2 = -1$."
                    ),
                    make_q(
                        "What are the solutions of the equation $x^2 + 16 = 0$ over the complex numbers?",
                        ["$\\pm 4i$", "$\\pm 4$", "$\\pm 2i$", "$\\pm 16i$"], 0,
                        "$x^2 = -16 \\Rightarrow x = \\pm \\sqrt{-16} = \\pm 4i$."
                    )
                ]
            },
            {
                "heading": "Section 2: Matrices & Determinants",
                "questions": [
                    make_q(
                        "Find the determinant of the $2 \\times 2$ matrix $A = [[4, 3], [2, 5]]$.",
                        ["$14$", "$26$", "$10$", "$18$"], 0,
                        "$\\det(A) = (4)(5) - (3)(2) = 20 - 6 = 14$."
                    ),
                    make_q(
                        "For what value of $k$ does the matrix $M = [[k, 6], [2, 3]]$ have NO inverse?",
                        ["$4$", "$6$", "$2$", "$3$"], 0,
                        "A matrix has no inverse when its determinant is zero: $(k)(3) - (6)(2) = 0 \\Rightarrow 3k - 12 = 0 \\Rightarrow 3k = 12 \\Rightarrow k = 4$."
                    ),
                    make_q(
                        "If $A = [[1, 2], [3, 4]]$ and $B = [[2, 0], [1, 3]]$, what is the element in row $1$, column $2$ of $A + 2B$?",
                        ["$2$", "$4$", "$6$", "$8$"], 0,
                        "Row $1$, column $2$ entry: $A_{12} + 2 B_{12} = 2 + 2(0) = 2$."
                    )
                ]
            },
            {
                "heading": "Section 3: Polynomials & Remainder Theorem",
                "questions": [
                    make_q(
                        "What is the remainder when $P(x) = 2x^3 - 4x^2 + 5x - 3$ is divided by $(x - 2)$?",
                        ["$7$", "$5$", "$9$", "$3$"], 0,
                        "By the Remainder Theorem, evaluate $P(2)$: $P(2) = 2(2^3) - 4(2^2) + 5(2) - 3 = 16 - 16 + 10 - 3 = 7$."
                    ),
                    make_q(
                        "If $(x - 3)$ is a factor of $x^3 - kx^2 + 2x - 6$, what is the value of $k$?",
                        ["$3$", "$2$", "$4$", "$5$"], 0,
                        "Since $(x - 3)$ is a factor, $P(3) = 0$: $3^3 - k(3^2) + 2(3) - 6 = 0 \\Rightarrow 27 - 9k + 6 - 6 = 0 \\Rightarrow 27 - 9k = 0 \\Rightarrow k = 3$."
                    ),
                    make_q(
                        "What is the degree of the polynomial $f(x) = (3x^2 - 1)^2 (x^3 + 4)$?",
                        ["$7$", "$6$", "$8$", "$12$"], 0,
                        "Degree of $(3x^2 - 1)^2 = 2 \\times 2 = 4$. Degree of $(x^3 + 4) = 3$. Total degree $= 4 + 3 = 7$."
                    )
                ]
            },
            {
                "heading": "Section 4: Systems of Equations & Inequalities",
                "questions": [
                    make_q(
                        "What is the value of $x + y$ for the system: $3x + 2y = 16$ and $2x - 2y = 4$?",
                        ["$6$", "$5$", "$7$", "$8$"], 0,
                        "Add both equations: $5x = 20 \\Rightarrow x = 4$. Substitute into $2(4) - 2y = 4 \\Rightarrow 8 - 2y = 4 \\Rightarrow 2y = 4 \\Rightarrow y = 2$. Then $x + y = 4 + 2 = 6$."
                    ),
                    make_q(
                        "Which point lies in the solution set of the system: $y > 2x - 1$ and $y \\leq -x + 4$?",
                        ["$(1, 2)$", "$(2, 5)$", "$(0, -2)$", "$(3, 0)$"], 0,
                        "Test $(1, 2)$: $2 > 2(1) - 1 \\Rightarrow 2 > 1$ (True), and $2 \\leq -1 + 4 = 3$ (True). Thus $(1, 2)$ satisfies both inequalities."
                    ),
                    make_q(
                        "If $\\frac{x - 3}{x + 2} = 0$, what is the real solution for $x$?",
                        ["$3$", "$-2$", "$0$", "$5$"], 0,
                        "A fraction equals zero when its numerator is zero and denominator is non-zero: $x - 3 = 0 \\Rightarrow x = 3$ (with $3 + 2 = 5 \\neq 0$)."
                    )
                ]
            }
        ]
    },
    {
        "track": "tahsili", "num": "1.01", "lang": "ar", "slug": "algebra-equations",
        "title": "الجبر والمعادلات والمصفوفات",
        "sections": [
            {
                "heading": "القسم 1: المعادلات التربيعية والأعداد المركبة",
                "questions": [
                    make_q(
                        "ما قيمة المميز للمعادلة التربيعية: $2x^2 - 4x + 5 = 0$؟",
                        ["$-24$", "$24$", "$-56$", "$56$"], 0,
                        "المميز $\\Delta = b^2 - 4ac = (-4)^2 - 4(2)(5) = 16 - 40 = -24$."
                    ),
                    make_q(
                        "ما أبسط صورة لقوة العدد التخيلي: $i^{46}$؟",
                        ["$-1$", "$1$", "$i$", "$-i$"], 0,
                        "دورة قوى $i$ تتكرر كل $4$: نقسم $46 \\div 4 = 11$ والباقي $2$. إذن $i^{46} = i^2 = -1$."
                    ),
                    make_q(
                        "ما هي حلول المعادلة $x^2 + 16 = 0$ في مجموعة الأعداد المركبة؟",
                        ["$\\pm 4i$", "$\\pm 4$", "$\\pm 2i$", "$\\pm 16i$"], 0,
                        "$x^2 = -16 \\Rightarrow x = \\pm \\sqrt{-16} = \\pm 4i$."
                    )
                ]
            },
            {
                "heading": "القسم 2: المصفوفات والمحددات والنظير الضربي",
                "questions": [
                    make_q(
                        "أوجد محدد المصفوفة من الرتبة $2 \\times 2$: $A = [[4, 3], [2, 5]]$.",
                        ["$14$", "$26$", "$10$", "$18$"], 0,
                        "المحدد $= (4)(5) - (3)(2) = 20 - 6 = 14$."
                    ),
                    make_q(
                        "ما قيمة $k$ التي تجعل المصفوفة $M = [[k, 6], [2, 3]]$ ليس لها نظير ضربي؟",
                        ["$4$", "$6$", "$2$", "$3$"], 0,
                        "تكون المصفوفة غير قابلة للعكس (ليس لها نظير) عندما يكون محددها صفراً: $(k)(3) - (6)(2) = 0 \\Rightarrow 3k - 12 = 0 \\Rightarrow k = 4$."
                    ),
                    make_q(
                        "إذا كانت $A = [[1, 2], [3, 4]]$ و $B = [[2, 0], [1, 3]]$، فما العنصر في الصف الأول والعمود الثاني للمصفوفة $A + 2B$؟",
                        ["$2$", "$4$", "$6$", "$8$"], 0,
                        "العنصر في الموقع $(1, 2)$ هو: $A_{12} + 2 B_{12} = 2 + 2(0) = 2$."
                    )
                ]
            },
            {
                "heading": "القسم 3: كثيرات الحدود ونظرية الباقي والعوامل",
                "questions": [
                    make_q(
                        "ما باقي قسمة كثيرة الحدود $P(x) = 2x^3 - 4x^2 + 5x - 3$ على $(x - 2)$؟",
                        ["$7$", "$5$", "$9$", "$3$"], 0,
                        "حسب نظرية الباقي، نحسب $P(2)$: $P(2) = 2(2^3) - 4(2^2) + 5(2) - 3 = 16 - 16 + 10 - 3 = 7$."
                    ),
                    make_q(
                        "إذا كان $(x - 3)$ عاملاً من عوامل $x^3 - kx^2 + 2x - 6$، فما قيمة $k$؟",
                        ["$3$", "$2$", "$4$", "$5$"], 0,
                        "بما أنه عامل، فإن $P(3) = 0$: $3^3 - 9k + 6 - 6 = 0 \\Rightarrow 27 - 9k = 0 \\Rightarrow k = 3$."
                    ),
                    make_q(
                        "ما درجة كثيرة الحدود: $f(x) = (3x^2 - 1)^2 (x^3 + 4)$؟",
                        ["$7$", "$6$", "$8$", "$12$"], 0,
                        "درجة القوس الأول $= 2 \\times 2 = 4$. درجة القوس الثاني $= 3$. درجة حاصل الضرب $= 4 + 3 = 7$."
                    )
                ]
            },
            {
                "heading": "القسم 4: أنظمة المعادلات والمتباينات الخطية",
                "questions": [
                    make_q(
                        "ما قيمة $x + y$ لنظام المعادلتين: $3x + 2y = 16$ و $2x - 2y = 4$؟",
                        ["$6$", "$5$", "$7$", "$8$"], 0,
                        "بجمع المعادلتين: $5x = 20 \\Rightarrow x = 4$. بالتعويض: $2(4) - 2y = 4 \\Rightarrow 2y = 4 \\Rightarrow y = 2$. إذن $x + y = 4 + 2 = 6$."
                    ),
                    make_q(
                        "أي النقاط التالية تقع في منطقة حل نظام المتباينات: $y > 2x - 1$ و $y \\leq -x + 4$؟",
                        ["$(1, 2)$", "$(2, 5)$", "$(0, -2)$", "$(3, 0)$"], 0,
                        "بتعويض النقطة $(1, 2)$: $2 > 2(1) - 1 = 1$ (صحيحة)، و $2 \\leq -1 + 4 = 3$ (صحيحة). إذن النقطة $(1, 2)$ تحقق النظام."
                    ),
                    make_q(
                        "ما الحل الحقيقي للمعادلة النسبية: $\\frac{x - 3}{x + 2} = 0$؟",
                        ["$3$", "$-2$", "$0$", "$5$"], 0,
                        "ينعدم الكسر عندما ينعدم بسطه ويكون مقامه غير صفري: $x - 3 = 0 \\Rightarrow x = 3$."
                    )
                ]
            }
        ]
    },

    # --------------------------------------------------------------------------
    # 2.01: Functions (EN & AR)
    # --------------------------------------------------------------------------
    {
        "track": "tahsili", "num": "2.01", "slug": "functions",
        "title": "Functions & Transformations",
        "sections": [
            {
                "heading": "Section 1: Domain, Range & Function Types",
                "questions": [
                    make_q(
                        "What is the domain of the real-valued function $f(x) = \\sqrt{2x - 8}$?",
                        ["$[4, \\infty)$", "$(4, \\infty)$", "$[2, \\infty)$", "$(-\\infty, 4]$"], 0,
                        "The expression under the radical must be non-negative: $2x - 8 \\geq 0 \\Rightarrow 2x \\geq 8 \\Rightarrow x \\geq 4$, which is $[4, \\infty)$."
                    ),
                    make_q(
                        "Which of the following functions is an ODD function?",
                        ["$f(x) = x^3 - 5x$", "$f(x) = x^4 + 2x^2$", "$f(x) = x^2 - 3$", "$f(x) = x^3 + 1$"], 0,
                        "An odd function satisfies $f(-x) = -f(x)$. For $f(x) = x^3 - 5x$: $f(-x) = (-x)^3 - 5(-x) = -x^3 + 5x = -(x^3 - 5x) = -f(x)$."
                    ),
                    make_q(
                        "What is the vertical asymptote of the rational function $f(x) = \\frac{3x + 1}{2x - 6}$?",
                        ["$x = 3$", "$x = 2$", "$x = -3$", "$y = \\frac{3}{2}$"], 0,
                        "Set denominator equal to zero: $2x - 6 = 0 \\Rightarrow 2x = 6 \\Rightarrow x = 3$."
                    )
                ]
            },
            {
                "heading": "Section 2: Composite Functions & Inverse Functions",
                "questions": [
                    make_q(
                        "If $f(x) = 2x + 3$ and $g(x) = x^2 - 1$, what is $(f \\circ g)(3)$?",
                        ["$19$", "$17$", "$23$", "$15$"], 0,
                        "First evaluate $g(3) = 3^2 - 1 = 9 - 1 = 8$. Then $f(g(3)) = f(8) = 2(8) + 3 = 16 + 3 = 19$."
                    ),
                    make_q(
                        "What is the inverse function $f^{-1}(x)$ for $f(x) = \\frac{3x - 5}{2}$?",
                        ["$\\frac{2x + 5}{3}$", "$\\frac{2x - 5}{3}$", "$\\frac{3x + 5}{2}$", "$\\frac{x + 5}{6}$"], 0,
                        "Set $y = \\frac{3x - 5}{2} \\Rightarrow 2y = 3x - 5 \\Rightarrow 3x = 2y + 5 \\Rightarrow x = \\frac{2y + 5}{3}$. Swap variables: $f^{-1}(x) = \\frac{2x + 5}{3}$."
                    ),
                    make_q(
                        "If $f(x) = x^3 - 2$, what is the value of $f^{-1}(25)$?",
                        ["$3$", "$2$", "$4$", "$5$"], 0,
                        "Set $x^3 - 2 = 25 \\Rightarrow x^3 = 27 \\Rightarrow x = 3$."
                    )
                ]
            },
            {
                "heading": "Section 3: Geometric Transformations of Graphs",
                "questions": [
                    make_q(
                        "How is the graph of $g(x) = (x - 3)^2 + 4$ obtained from the parent function $f(x) = x^2$?",
                        ["Shifted $3$ units right and $4$ units up", "Shifted $3$ units left and $4$ units up", "Shifted $3$ units right and $4$ units down", "Shifted $3$ units left and $4$ units down"], 0,
                        "Inside $(x - 3)$ shifts right by $3$ units; $+4$ outside shifts up by $4$ units."
                    ),
                    make_q(
                        "The graph of $y = f(x)$ is reflected across the $x$-axis and shifted down by $5$ units. What is the equation of the resulting graph?",
                        ["$y = -f(x) - 5$", "$y = f(-x) - 5$", "$y = -f(x - 5)$", "$y = -f(x) + 5$"], 0,
                        "Reflection across the $x$-axis gives $-f(x)$. Shifting down $5$ units gives $-f(x) - 5$."
                    ),
                    make_q(
                        "What is the vertex of the parabola $f(x) = -2(x + 1)^2 + 7$?",
                        ["$(-1, 7)$", "$(1, 7)$", "$(-1, -7)$", "$(1, -7)$"], 0,
                        "In vertex form $y = a(x - h)^2 + k$, the vertex is $(h, k) = (-1, 7)$."
                    )
                ]
            },
            {
                "heading": "Section 4: Piecewise & Absolute Value Functions",
                "questions": [
                    make_q(
                        "Given the piecewise function $f(x) = 2x + 1$ for $x < 2$, and $f(x) = x^2 - 3$ for $x \\geq 2$, evaluate $f(2) + f(0)$.",
                        ["$2$", "$1$", "$3$", "$4$"], 0,
                        "For $x = 2$, use second rule: $f(2) = 2^2 - 3 = 1$. For $x = 0$, use first rule: $f(0) = 2(0) + 1 = 1$. Sum $= 1 + 1 = 2$."
                    ),
                    make_q(
                        "What is the range of the absolute value function $f(x) = |x - 4| + 3$?",
                        ["$[3, \\infty)$", "$[4, \\infty)$", "$(-\\infty, 3]$", "$[0, \\infty)$"], 0,
                        "Since $|x - 4| \\geq 0$, the minimum value occurs at $x = 4$ where $f(4) = 3$. Thus the range is $[3, \\infty)$."
                    ),
                    make_q(
                        "For what value of $x$ does the function $f(x) = -|x + 2| + 5$ attain its maximum value?",
                        ["$-2$", "$2$", "$5$", "$0$"], 0,
                        "The term $-|x + 2| \\leq 0$ is maximized when $|x + 2| = 0 \\Rightarrow x = -2$."
                    )
                ]
            }
        ]
    },
    {
        "track": "tahsili", "num": "2.01", "lang": "ar", "slug": "functions",
        "title": "الدوال وخصائصها والتحويلات الهندسية",
        "sections": [
            {
                "heading": "القسم 1: المجال والمدى وتصنيف الدوال",
                "questions": [
                    make_q(
                        "ما مجال الدالة الحقيقية: $f(x) = \\sqrt{2x - 8}$؟",
                        ["$[4, \\infty)$", "$(4, \\infty)$", "$[2, \\infty)$", "$(-\\infty, 4]$"], 0,
                        "يجب أن يكون المقدار تحت الجذر غير سالب: $2x - 8 \\geq 0 \\Rightarrow 2x \\geq 8 \\Rightarrow x \\geq 4$، أي الفترة $[4, \\infty)$."
                    ),
                    make_q(
                        "أي الدوال التالية تمثل دالة فردية؟",
                        ["$f(x) = x^3 - 5x$", "$f(x) = x^4 + 2x^2$", "$f(x) = x^2 - 3$", "$f(x) = x^3 + 1$"], 0,
                        "الدالة الفردية تحقق $f(-x) = -f(x)$. للدالة $f(x) = x^3 - 5x$: نجد $f(-x) = -x^3 + 5x = -(x^3 - 5x) = -f(x)$."
                    ),
                    make_q(
                        "ما هو خط التقارب الرأسي للدالة النسبية: $f(x) = \\frac{3x + 1}{2x - 6}$؟",
                        ["$x = 3$", "$x = 2$", "$x = -3$", "$y = \\frac{3}{2}$"], 0,
                        "خط التقارب الرأسي ينتج بمساواة المقام بالصفر: $2x - 6 = 0 \\Rightarrow 2x = 6 \\Rightarrow x = 3$."
                    )
                ]
            },
            {
                "heading": "القسم 2: تركيب الدوال والدوال العكسية",
                "questions": [
                    make_q(
                        "إذا كانت $f(x) = 2x + 3$ و $g(x) = x^2 - 1$، فما قيمة $(f \\circ g)(3)$؟",
                        ["$19$", "$17$", "$23$", "$15$"], 0,
                        "أولاً: $g(3) = 3^2 - 1 = 8$. ثم: $f(g(3)) = f(8) = 2(8) + 3 = 19$."
                    ),
                    make_q(
                        "ما الدالة العكسية $f^{-1}(x)$ للدالة $f(x) = \\frac{3x - 5}{2}$؟",
                        ["$\\frac{2x + 5}{3}$", "$\\frac{2x - 5}{3}$", "$\\frac{3x + 5}{2}$", "$\\frac{x + 5}{6}$"], 0,
                        "بوضع $y = \\frac{3x - 5}{2} \\Rightarrow 2y = 3x - 5 \\Rightarrow 3x = 2y + 5 \\Rightarrow x = \\frac{2y + 5}{3}$. بتبديل المتغيرين: $f^{-1}(x) = \\frac{2x + 5}{3}$."
                    ),
                    make_q(
                        "إذا كانت $f(x) = x^3 - 2$، فما قيمة $f^{-1}(25)$؟",
                        ["$3$", "$2$", "$4$", "$5$"], 0,
                        "نساوي الدالة بـ $25$: $x^3 - 2 = 25 \\Rightarrow x^3 = 27 \\Rightarrow x = 3$."
                    )
                ]
            },
            {
                "heading": "القسم 3: التحويلات الهندسية لمنحنيات الدوال",
                "questions": [
                    make_q(
                        "كيف يتم الحصول على منحنى الدالة $g(x) = (x - 3)^2 + 4$ من منحنى الدالة الأم $f(x) = x^2$؟",
                        ["إزاحة $3$ وحدات لليمين و $4$ وحدات للأعلى", "إزاحة $3$ وحدات لليسار و $4$ وحدات للأعلى", "إزاحة $3$ وحدات لليمين و $4$ وحدات للأسفل", "إزاحة $3$ وحدات لليسار و $4$ وحدات للأسفل"], 0,
                        "الحد $(x - 3)$ يمثل إزاحة لليمين بمقدار $3$ وحدات، و $+4$ تمثل إزاحة للأعلى بمقدار $4$ وحدات."
                    ),
                    make_q(
                        "تم إجراء انعكاس لمنحنى $y = f(x)$ حول المحور $x$ ثم إزاحة إلى الأسفل بمقدار $5$ وحدات. ما معادلة المنحنى الناتج؟",
                        ["$y = -f(x) - 5$", "$y = f(-x) - 5$", "$y = -f(x - 5)$", "$y = -f(x) + 5$"], 0,
                        "الانعكاس حول محور $x$ يعطي $-f(x)$، والإزاحة للأسفل بمقدار $5$ تعطي $-f(x) - 5$."
                    ),
                    make_q(
                        "ما هي نقطة رأس القطع المكافئ للدالة $f(x) = -2(x + 1)^2 + 7$؟",
                        ["$(-1, 7)$", "$(1, 7)$", "$(-1, -7)$", "$(1, -7)$"], 0,
                        "من صيغة الرأس $y = a(x - h)^2 + k$، إحداثيات الرأس هي $(h, k) = (-1, 7)$."
                    )
                ]
            },
            {
                "heading": "القسم 4: الدوال المتعددة التعريف ودوال القيمة المطلقة",
                "questions": [
                    make_q(
                        "إذا كانت الدالة متعددة التعريف: $f(x) = 2x + 1$ عندما $x < 2$، و $f(x) = x^2 - 3$ عندما $x \\geq 2$، فما قيمة $f(2) + f(0)$؟",
                        ["$2$", "$1$", "$3$", "$4$"], 0,
                        "عند $x = 2$: نطبق القاعدة الثانية: $f(2) = 2^2 - 3 = 1$. عند $x = 0$: نطبق القاعدة الأولى: $f(0) = 2(0) + 1 = 1$. المجموع $= 1 + 1 = 2$."
                    ),
                    make_q(
                        "ما مدى دالة القيمة المطلقة: $f(x) = |x - 4| + 3$؟",
                        ["$[3, \\infty)$", "$[4, \\infty)$", "$(-\\infty, 3]$", "$[0, \\infty)$"], 0,
                        "بما أن القيمة المطلقة لا تقل عن الصفر، فإن أصغر قيمة للدالة تحدث عند $x = 4$ وهي $3$. إذن المدى هو $[3, \\infty)$."
                    ),
                    make_q(
                        "عند أي قيمة لـ $x$ تبلغ الدالة $f(x) = -|x + 2| + 5$ قيمتها العظمى؟",
                        ["$-2$", "$2$", "$5$", "$0$"], 0,
                        "المقدار $-|x + 2|$ يكون في قيمته العظمى عندما يساوي صفراً: $|x + 2| = 0 \\Rightarrow x = -2$."
                    )
                ]
            }
        ]
    },

    # --------------------------------------------------------------------------
    # 3.01: Sequences & Series (EN & AR)
    # --------------------------------------------------------------------------
    {
        "track": "tahsili", "num": "3.01", "slug": "sequences-series",
        "title": "Sequences & Series",
        "sections": [
            {
                "heading": "Section 1: Arithmetic Sequences & nth Term",
                "questions": [
                    make_q(
                        "In an arithmetic sequence where $a_1 = 5$ and $d = 3$, what is the $12^{\\text{th}}$ term $a_{12}$?",
                        ["$38$", "$41$", "$35$", "$44$"], 0,
                        "$a_n = a_1 + (n - 1)d = 5 + (12 - 1)(3) = 5 + 33 = 38$."
                    ),
                    make_q(
                        "If the $4^{\\text{th}}$ term of an arithmetic sequence is $17$ and the $8^{\\text{th}}$ term is $33$, what is the common difference $d$?",
                        ["$4$", "$5$", "$3$", "$6$"], 0,
                        "$a_8 - a_4 = (8 - 4)d \\Rightarrow 33 - 17 = 4d \\Rightarrow 16 = 4d \\Rightarrow d = 4$."
                    ),
                    make_q(
                        "What is the sum of the first $10$ terms of the arithmetic series: $2 + 5 + 8 + \\dots$?",
                        ["$155$", "$150$", "$160$", "$145$"], 0,
                        "$a_1 = 2, d = 3$. $a_{10} = 2 + 9(3) = 29$. $S_{10} = \\frac{10}{2}(a_1 + a_{10}) = 5(2 + 29) = 5(31) = 155$."
                    )
                ]
            },
            {
                "heading": "Section 2: Geometric Sequences & Finite Series",
                "questions": [
                    make_q(
                        "What is the $6^{\\text{th}}$ term of the geometric sequence $2, 6, 18, 54, \\dots$?",
                        ["$486$", "$162$", "$1458$", "$243$"], 0,
                        "$a_1 = 2, r = 3$. $a_6 = a_1 r^5 = 2(3^5) = 2(243) = 486$."
                    ),
                    make_q(
                        "In a geometric sequence, $a_1 = 4$ and $r = 2$. What is the sum of the first $5$ terms ($S_5$)?",
                        ["$124$", "$60$", "$120$", "$128$"], 0,
                        "$S_n = \\frac{a_1(1 - r^n)}{1 - r} = \\frac{4(1 - 2^5)}{1 - 2} = \\frac{4(1 - 32)}{-1} = \\frac{4(-31)}{-1} = 124$."
                    ),
                    make_q(
                        "What is the common ratio $r$ of a geometric sequence where $a_2 = 6$ and $a_5 = 162$?",
                        ["$3$", "$2$", "$4$", "$9$"], 0,
                        "$\\frac{a_5}{a_2} = r^3 \\Rightarrow \\frac{162}{6} = 27 \\Rightarrow r^3 = 27 \\Rightarrow r = 3$."
                    )
                ]
            },
            {
                "heading": "Section 3: Infinite Geometric Series & Convergence",
                "questions": [
                    make_q(
                        "What is the sum of the infinite geometric series: $12 + 6 + 3 + 1.5 + \\dots$?",
                        ["$24$", "$18$", "$20$", "$36$"], 0,
                        "$a_1 = 12, r = \\frac{6}{12} = \\frac{1}{2}$. Since $|r| < 1$, $S_\\infty = \\frac{a_1}{1 - r} = \\frac{12}{1 - 0.5} = \\frac{12}{0.5} = 24$."
                    ),
                    make_q(
                        "For what values of $x$ does the infinite geometric series $\\sum_{k=1}^\\infty (2x)^k$ converge?",
                        ["$|x| < \\frac{1}{2}$", "$|x| < 1$", "$|x| < 2$", "$x > 0$"], 0,
                        "Convergence requires $|r| < 1 \\Rightarrow |2x| < 1 \\Rightarrow |x| < \\frac{1}{2}$."
                    ),
                    make_q(
                        "Express the repeating decimal $0.\\overline{6} = 0.666\\dots$ as a simplified fraction.",
                        ["$\\frac{2}{3}$", "$\\frac{3}{5}$", "$\\frac{6}{11}$", "$\\frac{1}{3}$"], 0,
                        "Infinite series with $a_1 = 0.6$ and $r = 0.1$: $S_\\infty = \\frac{0.6}{1 - 0.1} = \\frac{0.6}{0.9} = \\frac{2}{3}$."
                    )
                ]
            },
            {
                "heading": "Section 4: Sigma Notation & Binomial Theorem",
                "questions": [
                    make_q(
                        "Evaluate the summation: $\\sum_{k=1}^5 (3k - 2)$.",
                        ["$35$", "$30$", "$40$", "$25$"], 0,
                        "For $k = 1, 2, 3, 4, 5$: terms are $1, 4, 7, 10, 13$. Sum $= 1 + 4 + 7 + 10 + 13 = 35$."
                    ),
                    make_q(
                        "In the expansion of $(x + y)^5$, what is the coefficient of $x^3 y^2$?",
                        ["$10$", "$5$", "$20$", "$15$"], 0,
                        "Coefficient is $\\binom{5}{2} = \\frac{5 \\times 4}{2 \\times 1} = 10$."
                    ),
                    make_q(
                        "How many terms are there in the binomial expansion of $(2a - b)^7$?",
                        ["$8$", "$7$", "$9$", "$14$"], 0,
                        "The binomial expansion of $(x + y)^n$ always contains $n + 1$ terms: $7 + 1 = 8$ terms."
                    )
                ]
            }
        ]
    },
    {
        "track": "tahsili", "num": "3.01", "lang": "ar", "slug": "sequences-series",
        "title": "المتتابعات والمتسلسلات",
        "sections": [
            {
                "heading": "القسم 1: المتتابعات الحسابية والحد النوني ومجموعها",
                "questions": [
                    make_q(
                        "متتابعة حسابية حدها الأول $a_1 = 5$ وأساسها $d = 3$. ما هو حدها الثاني عشر ($a_{12}$)؟",
                        ["$38$", "$41$", "$35$", "$44$"], 0,
                        "$a_n = a_1 + (n - 1)d = 5 + (12 - 1)(3) = 5 + 33 = 38$."
                    ),
                    make_q(
                        "إذا كان الحد الرابع لمتتابعة حسابية يساوي $17$ والحد الثامن يساوي $33$، فما هو أساس المتتابعة $d$؟",
                        ["$4$", "$5$", "$3$", "$6$"], 0,
                        "$a_8 - a_4 = (8 - 4)d \\Rightarrow 33 - 17 = 4d \\Rightarrow 16 = 4d \\Rightarrow d = 4$."
                    ),
                    make_q(
                        "ما مجموع أول $10$ حدود من المتسلسلة الحسابية: $2 + 5 + 8 + \\dots$؟",
                        ["$155$", "$150$", "$160$", "$145$"], 0,
                        "$a_1 = 2, d = 3$. الحد العاشر $a_{10} = 2 + 9(3) = 29$. المجموع $S_{10} = \\frac{10}{2}(2 + 29) = 5(31) = 155$."
                    )
                ]
            },
            {
                "heading": "القسم 2: المتتابعات الهندسية والمتسلسلات المنتهية",
                "questions": [
                    make_q(
                        "ما هو الحد السادس في المتتابعة الهندسية: $2, 6, 18, 54, \\dots$؟",
                        ["$486$", "$162$", "$1458$", "$243$"], 0,
                        "$a_1 = 2, r = 3$. $a_6 = a_1 r^5 = 2(3^5) = 2(243) = 486$."
                    ),
                    make_q(
                        "في متتابعة هندسية $a_1 = 4$ والأساس $r = 2$. ما مجموع أول $5$ حدود ($S_5$)؟",
                        ["$124$", "$60$", "$120$", "$128$"], 0,
                        "$S_n = \\frac{a_1(1 - r^n)}{1 - r} = \\frac{4(1 - 2^5)}{1 - 2} = \\frac{4(1 - 32)}{-1} = 124$."
                    ),
                    make_q(
                        "ما هو أساس المتتابعة الهندسية ($r$) التي فيها $a_2 = 6$ و $a_5 = 162$؟",
                        ["$3$", "$2$", "$4$", "$9$"], 0,
                        "$\\frac{a_5}{a_2} = r^3 \\Rightarrow \\frac{162}{6} = 27 \\Rightarrow r = 3$."
                    )
                ]
            },
            {
                "heading": "القسم 3: المتسلسلات الهندسية اللانهائية والتقارب",
                "questions": [
                    make_q(
                        "ما مجموع المتسلسلة الهندسية اللانهائية: $12 + 6 + 3 + 1.5 + \\dots$؟",
                        ["$24$", "$18$", "$20$", "$36$"], 0,
                        "$a_1 = 12, r = \\frac{1}{2}$. بما أن $|r| < 1$، فإن $S_\\infty = \\frac{a_1}{1 - r} = \\frac{12}{1 - 0.5} = 24$."
                    ),
                    make_q(
                        "لأي قيم لـ $x$ تكون المتسلسلة الهندسية اللانهائية $\\sum_{k=1}^\\infty (2x)^k$ متقاربة؟",
                        ["$|x| < \\frac{1}{2}$", "$|x| < 1$", "$|x| < 2$", "$x > 0$"], 0,
                        "شرط التقارب $|r| < 1 \\Rightarrow |2x| < 1 \\Rightarrow |x| < \\frac{1}{2}$."
                    ),
                    make_q(
                        "ما الكسر الاعتيادي المكافئ للكسر العشري الدوري $0.\\overline{6} = 0.666\\dots$؟",
                        ["$\\frac{2}{3}$", "$\\frac{3}{5}$", "$\\frac{6}{11}$", "$\\frac{1}{3}$"], 0,
                        "متسلسلة لانهائية حدها الأول $0.6$ وأساسها $0.1$: $S_\\infty = \\frac{0.6}{1 - 0.1} = \\frac{0.6}{0.9} = \\frac{2}{3}$."
                    )
                ]
            },
            {
                "heading": "القسم 4: رمز المجموع ونظرية ذات الحدين",
                "questions": [
                    make_q(
                        "احسب قيمة المجموع: $\\sum_{k=1}^5 (3k - 2)$.",
                        ["$35$", "$30$", "$40$", "$25$"], 0,
                        "الحدود عند $k = 1, 2, 3, 4, 5$ هي: $1, 4, 7, 10, 13$. المجموع $= 1 + 4 + 7 + 10 + 13 = 35$."
                    ),
                    make_q(
                        "في مفكوك $(x + y)^5$، ما هو معامل الحد $x^3 y^2$؟",
                        ["$10$", "$5$", "$20$", "$15$"], 0,
                        "المعامل هو $\\binom{5}{2} = \\frac{5 \\times 4}{2 \\times 1} = 10$."
                    ),
                    make_q(
                        "كم عدد الحدود في مفكوك ذات الحدين $(2a - b)^7$؟",
                        ["$8$", "$7$", "$9$", "$14$"], 0,
                        "عدد حدود مفكوك ذات الحدين لمرفوع القوة $n$ هو $n + 1$: $7 + 1 = 8$ حدود."
                    )
                ]
            }
        ]
    },

    # --------------------------------------------------------------------------
    # 4.01: Trigonometry (EN & AR)
    # --------------------------------------------------------------------------
    {
        "track": "tahsili", "num": "4.01", "slug": "trigonometry",
        "title": "Trigonometry",
        "sections": [
            {
                "heading": "Section 1: Unit Circle & Special Angles",
                "questions": [
                    make_q(
                        "What is the exact value of $\\sin(150^\\circ)$?",
                        ["$\\frac{1}{2}$", "$-\\frac{1}{2}$", "$\\frac{\\sqrt{3}}{2}$", "$-\\frac{\\sqrt{3}}{2}$"], 0,
                        "Reference angle in Quadrant II is $180^\\circ - 150^\\circ = 30^\\circ$. Sine is positive in QII: $\\sin(150^\\circ) = \\sin(30^\\circ) = \\frac{1}{2}$."
                    ),
                    make_q(
                        "What is the exact value of $\\cos(240^\\circ)$?",
                        ["$-\\frac{1}{2}$", "$\\frac{1}{2}$", "$-\\frac{\\sqrt{3}}{2}$", "$\\frac{\\sqrt{3}}{2}$"], 0,
                        "Reference angle in Quadrant III is $240^\\circ - 180^\\circ = 60^\\circ$. Cosine is negative in QIII: $\\cos(240^\\circ) = -\\cos(60^\\circ) = -\\frac{1}{2}$."
                    ),
                    make_q(
                        "Convert $\\frac{5\\pi}{6}$ radians to degrees.",
                        ["$150^\\circ$", "$120^\\circ$", "$135^\\circ$", "$210^\\circ$"], 0,
                        "Multiply by $\\frac{180^\\circ}{\\pi}$: $\\frac{5 \\times 180^\\circ}{6} = 5 \\times 30^\\circ = 150^\\circ$."
                    )
                ]
            },
            {
                "heading": "Section 2: Pythagorean Identities & Simplifications",
                "questions": [
                    make_q(
                        "Simplify the trigonometric expression: $\\frac{\\sin^2\\theta}{1 - \\cos^2\\theta}$.",
                        ["$1$", "$\\tan^2\\theta$", "$\\cot^2\\theta$", "$\\sin\\theta$"], 0,
                        "From the fundamental identity $\\sin^2\\theta + \\cos^2\\theta = 1$, we have $1 - \\cos^2\\theta = \\sin^2\\theta$. Thus $\\frac{\\sin^2\\theta}{\\sin^2\\theta} = 1$."
                    ),
                    make_q(
                        "If $\\cos\\theta = \\frac{3}{5}$ and $\\theta$ is an acute angle in Quadrant I, what is $\\tan\\theta$?",
                        ["$\\frac{4}{3}$", "$\\frac{3}{4}$", "$\\frac{4}{5}$", "$\\frac{5}{3}$"], 0,
                        "Using the $3-4-5$ right triangle, $\\sin\\theta = \\frac{4}{5}$. Then $\\tan\\theta = \\frac{\\sin\\theta}{\\cos\\theta} = \\frac{4/5}{3/5} = \\frac{4}{3}$."
                    ),
                    make_q(
                        "What is the simplified form of $\\sec\\theta \\cot\\theta$?",
                        ["$\\csc\\theta$", "$\\sin\\theta$", "$\\cos\\theta$", "$\\tan\\theta$"], 0,
                        "$\\sec\\theta \\cot\\theta = \\frac{1}{\\cos\\theta} \\times \\frac{\\cos\\theta}{\\sin\\theta} = \\frac{1}{\\sin\\theta} = \\csc\\theta$."
                    )
                ]
            },
            {
                "heading": "Section 3: Double Angle Formulas & Equations",
                "questions": [
                    make_q(
                        "If $\\sin\\theta = \\frac{3}{5}$ and $\\cos\\theta = \\frac{4}{5}$, what is the value of $\\sin(2\\theta)$?",
                        ["$\\frac{24}{25}$", "$\\frac{12}{25}$", "$\\frac{7}{25}$", "$\\frac{18}{25}$"], 0,
                        "Double-angle identity: $\\sin(2\\theta) = 2\\sin\\theta\\cos\\theta = 2 \\left(\\frac{3}{5}\\right)\\left(\\frac{4}{5}\\right) = \\frac{24}{25}$."
                    ),
                    make_q(
                        "What are the solutions to $2\\cos\\theta - 1 = 0$ on the interval $[0, 2\\pi)$?",
                        ["$\\frac{\\pi}{3}, \\frac{5\\pi}{3}$", "$\\frac{\\pi}{6}, \\frac{11\\pi}{6}$", "$\\frac{2\\pi}{3}, \\frac{4\\pi}{3}$", "$\\frac{\\pi}{4}, \\frac{7\\pi}{4}$"], 0,
                        "$\\cos\\theta = \\frac{1}{2}$. Positive cosine occurs in QI and QIV: $\\theta = \\frac{\\pi}{3}$ and $\\theta = 2\\pi - \\frac{\\pi}{3} = \\frac{5\\pi}{3}$."
                    ),
                    make_q(
                        "Which expression is equivalent to $\\cos(2\\theta)$?",
                        ["$\\cos^2\\theta - \\sin^2\\theta$", "$2\\cos^2\\theta + 1$", "$1 - 2\\cos^2\\theta$", "$\\cos^2\\theta + \\sin^2\\theta$"], 0,
                        "Standard double-angle formula for cosine is $\\cos(2\\theta) = \\cos^2\\theta - \\sin^2\\theta$."
                    )
                ]
            },
            {
                "heading": "Section 4: Laws of Sines & Cosines",
                "questions": [
                    make_q(
                        "In $\\triangle ABC$, $a = 8$, $\\sin A = 0.4$, and $\\sin B = 0.6$. What is the length of side $b$?",
                        ["$12$", "$10$", "$14$", "$16$"], 0,
                        "Law of Sines: $\\frac{a}{\\sin A} = \\frac{b}{\\sin B} \\Rightarrow \\frac{8}{0.4} = \\frac{b}{0.6} \\Rightarrow 20 = \\frac{b}{0.6} \\Rightarrow b = 12$."
                    ),
                    make_q(
                        "In $\\triangle ABC$, $b = 5$, $c = 6$, and $\\angle A = 60^\\circ$. What is the value of $a^2$?",
                        ["$31$", "$61$", "$41$", "$25$"], 0,
                        "Law of Cosines: $a^2 = b^2 + c^2 - 2bc\\cos A = 25 + 36 - 2(5)(6)\\cos(60^\\circ) = 61 - 60(0.5) = 61 - 30 = 31$."
                    ),
                    make_q(
                        "What is the area of a triangle with side lengths $6\\text{ cm}$ and $8\\text{ cm}$ enclosing an angle of $30^\\circ$?",
                        ["$12\\text{ cm}^2$", "$24\\text{ cm}^2$", "$12\\sqrt{3}\\text{ cm}^2$", "$16\\text{ cm}^2$"], 0,
                        "Area $= \\frac{1}{2}ab\\sin C = \\frac{1}{2}(6)(8)\\sin(30^\\circ) = 24 \\times 0.5 = 12\\text{ cm}^2$."
                    )
                ]
            }
        ]
    },
    {
        "track": "tahsili", "num": "4.01", "lang": "ar", "slug": "trigonometry",
        "title": "حساب المثلثات",
        "sections": [
            {
                "heading": "القسم 1: دائرة الوحدة والزوايا الخاصة والتحويل",
                "questions": [
                    make_q(
                        "ما القيمة الدقيقة لـ $\\sin(150^\\circ)$؟",
                        ["$\\frac{1}{2}$", "$-\\frac{1}{2}$", "$\\frac{\\sqrt{3}}{2}$", "$-\\frac{\\sqrt{3}}{2}$"], 0,
                        "زاوية المرجع في الربع الثاني هي $180^\\circ - 150^\\circ = 30^\\circ$. ودالة الجيب موجبة في الربع الثاني: $\\sin(150^\\circ) = \\sin(30^\\circ) = \\frac{1}{2}$."
                    ),
                    make_q(
                        "ما القيمة الدقيقة لـ $\\cos(240^\\circ)$؟",
                        ["$-\\frac{1}{2}$", "$\\frac{1}{2}$", "$-\\frac{\\sqrt{3}}{2}$", "$\\frac{\\sqrt{3}}{2}$"], 0,
                        "زاوية المرجع في الربع الثالث هي $240^\\circ - 180^\\circ = 60^\\circ$. ودالة جيب التمام سالبة في الربع الثالث: $\\cos(240^\\circ) = -\\cos(60^\\circ) = -\\frac{1}{2}$."
                    ),
                    make_q(
                        "حول الزاوية بالراديان $\\frac{5\\pi}{6}$ إلى الدرجات.",
                        ["$150^\\circ$", "$120^\\circ$", "$135^\\circ$", "$210^\\circ$"], 0,
                        "الضرب في $\\frac{180^\\circ}{\\pi}$: $\\frac{5 \\times 180^\\circ}{6} = 5 \\times 30^\\circ = 150^\\circ$."
                    )
                ]
            },
            {
                "heading": "القسم 2: متطابقات فيثاغورس وتبسيط المقادير المثلثية",
                "questions": [
                    make_q(
                        "بسط المقدار المثلثي: $\\frac{\\sin^2\\theta}{1 - \\cos^2\\theta}$.",
                        ["$1$", "$\\tan^2\\theta$", "$\\cot^2\\theta$", "$\\sin\\theta$"], 0,
                        "من متطابقة فيثاغورس الأساسية $\\sin^2\\theta + \\cos^2\\theta = 1$، نجد $1 - \\cos^2\\theta = \\sin^2\\theta$. إذن: $\\frac{\\sin^2\\theta}{\\sin^2\\theta} = 1$."
                    ),
                    make_q(
                        "إذا كانت $\\cos\\theta = \\frac{3}{5}$ وكانت $\\theta$ زاوية حادة في الربع الأول، فما قيمة $\\tan\\theta$؟",
                        ["$\\frac{4}{3}$", "$\\frac{3}{4}$", "$\\frac{4}{5}$", "$\\frac{5}{3}$"], 0,
                        "من مثلث فيثاغورس ($3-4-5$): $\\sin\\theta = \\frac{4}{5}$. إذن $\\tan\\theta = \\frac{\\sin\\theta}{\\cos\\theta} = \\frac{4}{3}$."
                    ),
                    make_q(
                        "ما أبسط صورة للمقدار: $\\sec\\theta \\cot\\theta$؟",
                        ["$\\csc\\theta$", "$\\sin\\theta$", "$\\cos\\theta$", "$\\tan\\theta$"], 0,
                        "$\\sec\\theta \\cot\\theta = \\frac{1}{\\cos\\theta} \\times \\frac{\\cos\\theta}{\\sin\\theta} = \\frac{1}{\\sin\\theta} = \\csc\\theta$."
                    )
                ]
            },
            {
                "heading": "القسم 3: متطابقات ضعف الزاوية والمعادلات المثلثية",
                "questions": [
                    make_q(
                        "إذا كانت $\\sin\\theta = \\frac{3}{5}$ و $\\cos\\theta = \\frac{4}{5}$، فما قيمة $\\sin(2\\theta)$؟",
                        ["$\\frac{24}{25}$", "$\\frac{12}{25}$", "$\\frac{7}{25}$", "$\\frac{18}{25}$"], 0,
                        "متطابقة جيب ضعف الزاوية: $\\sin(2\\theta) = 2\\sin\\theta\\cos\\theta = 2\\left(\\frac{3}{5}\\right)\\left(\\frac{4}{5}\\right) = \\frac{24}{25}$."
                    ),
                    make_q(
                        "ما حلول المعادلة $2\\cos\\theta - 1 = 0$ في الفترة $[0, 2\\pi)$؟",
                        ["$\\frac{\\pi}{3}, \\frac{5\\pi}{3}$", "$\\frac{\\pi}{6}, \\frac{11\\pi}{6}$", "$\\frac{2\\pi}{3}, \\frac{4\\pi}{3}$", "$\\frac{\\pi}{4}, \\frac{7\\pi}{4}$"], 0,
                        "$\\cos\\theta = \\frac{1}{2}$. جيب التمام موجب في الربعين الأول والرابع: $\\theta = \\frac{\\pi}{3}$ و $\\theta = 2\\pi - \\frac{\\pi}{3} = \\frac{5\\pi}{3}$."
                    ),
                    make_q(
                        "أي المقادير التالية يكافئ $\\cos(2\\theta)$؟",
                        ["$\\cos^2\\theta - \\sin^2\\theta$", "$2\\cos^2\\theta + 1$", "$1 - 2\\cos^2\\theta$", "$\\cos^2\\theta + \\sin^2\\theta$"], 0,
                        "متطابقة جيب تمام ضعف الزاوية القياسية هي $\\cos(2\\theta) = \\cos^2\\theta - \\sin^2\\theta$."
                    )
                ]
            },
            {
                "heading": "القسم 4: قانون الجيوب وقانون جيوب التمام ومساحة المثلث",
                "questions": [
                    make_q(
                        "في المثلث $ABC$، إذا كان $a = 8$ و $\\sin A = 0.4$ و $\\sin B = 0.6$، فما طول الضلع $b$؟",
                        ["$12$", "$10$", "$14$", "$16$"], 0,
                        "قانون الجيوب: $\\frac{a}{\\sin A} = \\frac{b}{\\sin B} \\Rightarrow \\frac{8}{0.4} = \\frac{b}{0.6} \\Rightarrow 20 = \\frac{b}{0.6} \\Rightarrow b = 12$."
                    ),
                    make_q(
                        "في المثلث $ABC$، إذا كان $b = 5$ و $c = 6$ وقياس $\\angle A = 60^\\circ$، فما قيمة $a^2$؟",
                        ["$31$", "$61$", "$41$", "$25$"], 0,
                        "قانون جيوب التمام: $a^2 = b^2 + c^2 - 2bc\\cos A = 25 + 36 - 2(5)(6)(0.5) = 61 - 30 = 31$."
                    ),
                    make_q(
                        "ما مساحة مثلث طولا ضلعين فيه $6\\text{ سم}$ و $8\\text{ سم}$ والزاوية المحصورة بينهما $30^\\circ$؟",
                        ["$12\\text{ سم}^2$", "$24\\text{ سم}^2$", "$12\\sqrt{3}\\text{ سم}^2$", "$16\\text{ سم}^2$"], 0,
                        "المساحة $= \\frac{1}{2}ab\\sin C = \\frac{1}{2}(6)(8)\\sin(30^\\circ) = 24 \\times 0.5 = 12\\text{ سم}^2$."
                    )
                ]
            }
        ]
    }
]
