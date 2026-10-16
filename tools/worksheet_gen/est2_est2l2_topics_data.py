#!/usr/bin/env python3
"""Standardized 4-Page Topic Data for EST II (Subject Tests Level 1 & Level 2 - 14 Topics).

Authentic Egyptian Scholastic Test II Advanced Mathematics questions.
4 distinct sections per topic, exactly 3 progressive questions per section (12 questions total).
Zero redundant questions, rendered math with baseline alignment, and strictly 4 pages.
"""

def make_q(q, choices, correct, answer):
    return {
        "q": q,
        "choices": choices,
        "correct": correct,
        "answer": answer
    }

# ==============================================================================
# EST II MATH LEVEL 1 (8 TOPICS)
# ==============================================================================

EST2_TOPICS = [
    # --------------------------------------------------------------------------
    # EST2 1.01: Advanced Algebra
    # --------------------------------------------------------------------------
    {
        "track": "est2",
        "num": "1.01",
        "slug": "advanced-algebra",
        "title": "Advanced Algebra",
        "sections": [
            {
                "heading": "Section 1: Polynomial Theorems & Synthetic Division",
                "questions": [
                    make_q(
                        "If $(x - 2)$ is a factor of $P(x) = 2x^3 - 3x^2 + kx - 10$, what is the value of $k$?",
                        ["$1$", "$2$", "$3$", "$4$"], 2,
                        "By the Factor Theorem, $P(2) = 0$: $2(8) - 3(4) + 2k - 10 = 0 \\Rightarrow 16 - 12 + 2k - 10 = 0 \\Rightarrow 2k - 6 = 0 \\Rightarrow k = 3$."
                    ),
                    make_q(
                        "What is the quotient and remainder when $3x^3 + 4x^2 - x + 5$ is divided by $(x + 2)$?",
                        ["Quotient $3x^2 - 2x + 3$, remainder $-1$", "Quotient $3x^2 + 2x - 3$, remainder $1$", "Quotient $3x^2 - 2x - 3$, remainder $11$", "Quotient $3x^2 + 10x + 19$, remainder $43$"], 0,
                        "Using synthetic division with $-2$: coefficients $[3, 4, -1, 5]$. Drop $3$: $-2(3) = -6$, $4 - 6 = -2$; $-2(-2) = 4$, $-1 + 4 = 3$; $-2(3) = -6$, $5 - 6 = -1$. Quotient is $3x^2 - 2x + 3$, remainder $-1$."
                    ),
                    make_q(
                        "Find the sum of the cubes of the roots of $x^2 - 4x + 2 = 0$.",
                        ["$32$", "$40$", "$48$", "$52$"], 1,
                        "By Vieta's: $r + s = 4$ and $rs = 2$. $r^3 + s^3 = (r + s)^3 - 3rs(r + s) = 4^3 - 3(2)(4) = 64 - 24 = 40$."
                    )
                ]
            },
            {
                "heading": "Section 2: Rational Equations & Partial Fractions",
                "questions": [
                    make_q(
                        "Solve the rational equation: $\\frac{x}{x - 2} + \\frac{2}{x + 2} = \\frac{8}{x^2 - 4}$.",
                        ["$x = 2$", "$x = -2$", "$x = 2$ and $x = -2$", "No real solution"], 3,
                        "Multiply by $(x - 2)(x + 2)$: $x(x + 2) + 2(x - 2) = 8 \\Rightarrow x^2 + 4x - 12 = 0 \\Rightarrow (x + 6)(x - 2) = 0$. The roots are $x = -6$ and $x = 2$. However, $x = 2$ is an extraneous root (denominator zero)."
                    ),
                    make_q(
                        "Decompose $\\frac{8x - 4}{x^2 - 4}$ into partial fractions $\\frac{A}{x - 2} + \\frac{B}{x + 2}$. What is $A$?",
                        ["$2$", "$3$", "$4$", "$5$"], 1,
                        "$8x - 4 = A(x + 2) + B(x - 2)$. Let $x = 2$: $8(2) - 4 = A(4) \\Rightarrow 12 = 4A \\Rightarrow A = 3$."
                    ),
                    make_q(
                        "Simplify the compound fraction: $\\frac{\\frac{1}{x+h} - \\frac{1}{x}}{h}$ for $h \\neq 0$.",
                        ["$-\\frac{1}{x(x+h)}$", "$\\frac{1}{x(x+h)}$", "$-\\frac{1}{x^2}$", "$\\frac{h}{x(x+h)}$"], 0,
                        "Combine fractions in numerator: $\\frac{x - (x + h)}{x(x + h) h} = \\frac{-h}{h x(x + h)} = -\\frac{1}{x(x + h)}$."
                    )
                ]
            },
            {
                "heading": "Section 3: Radical Equations & Fractional Exponents",
                "questions": [
                    make_q(
                        "Solve for $x$: $\\sqrt{2x + 9} - \\sqrt{x + 1} = 2$.",
                        ["$0$", "$8$", "$0$ and $8$", "No real solution"], 2,
                        "Rearrange: $\\sqrt{2x + 9} = \\sqrt{x + 1} + 2$. Squaring both sides: $2x + 9 = (x + 1) + 4\\sqrt{x + 1} + 4 \\Rightarrow x + 4 = 4\\sqrt{x + 1}$. Squaring again: $x^2 + 8x + 16 = 16x + 16 \\Rightarrow x^2 - 8x = 0 \\Rightarrow x(x - 8) = 0$. Both $x = 0$ and $x = 8$ are valid."
                    ),
                    make_q(
                        "If $x^{2/3} - 5x^{1/3} + 6 = 0$, what are all real values of $x$?",
                        ["$8$ and $27$", "$2$ and $3$", "$\\pm 8$", "$\\pm 27$"], 0,
                        "Let $u = x^{1/3}$: $u^2 - 5u + 6 = 0 \\Rightarrow (u - 2)(u - 3) = 0 \\Rightarrow u = 2$ or $u = 3$. Cubing gives $x = 2^3 = 8$ or $x = 3^3 = 27$."
                    ),
                    make_q(
                        "Simplify the radical quotient: $\\frac{x - 8}{\\sqrt[3]{x} - 2}$ for $x \\neq 8$.",
                        ["$x^{2/3} + 2x^{1/3} + 4$", "$x^{2/3} - 2x^{1/3} + 4$", "$x^{2/3} + 4$", "$(\\sqrt[3]{x} + 2)^2$"], 0,
                        "Use difference of cubes factorization $a^3 - b^3 = (a - b)(a^2 + ab + b^2)$ where $a = \\sqrt[3]{x}$ and $b = 2$."
                    )
                ]
            },
            {
                "heading": "Section 4: Non-Linear Systems & Inequalities",
                "questions": [
                    make_q(
                        "Solve the non-linear system: $y = x^2 - 2x - 3$ and $y = 2x + 2$. What is the sum of the $x$-coordinates of the intersection points?",
                        ["$2$", "$4$", "$-4$", "$6$"], 1,
                        "Set equations equal: $x^2 - 2x - 3 = 2x + 2 \\Rightarrow x^2 - 4x - 5 = 0$. By Vieta's formulas, the sum of roots is $-\\frac{-4}{1} = 4$."
                    ),
                    make_q(
                        "What is the solution set of the quadratic inequality $2x^2 - 5x - 3 > 0$?",
                        ["$(-\\infty, -\\frac{1}{2}) \\cup (3, \\infty)$", "$(-\\frac{1}{2}, 3)$", "$(-\\infty, -3) \\cup (\\frac{1}{2}, \\infty)$", "$x > 3$"], 0,
                        "Factor: $(2x + 1)(x - 3) > 0$. Roots are $x = -\\frac{1}{2}$ and $x = 3$. Testing intervals shows the inequality holds outside the roots: $(-\\infty, -\\frac{1}{2}) \\cup (3, \\infty)$."
                    ),
                    make_q(
                        "For what values of $m$ will the line $y = mx - 1$ NOT intersect the parabola $y = x^2$?",
                        ["$(-2, 2)$", "$[-2, 2]$", "$(-\\infty, -2) \\cup (2, \\infty)$", "No such values of $m$"], 0,
                        "$x^2 = mx - 1 \\Rightarrow x^2 - mx + 1 = 0$. No intersection requires discriminant $D < 0$: $m^2 - 4(1)(1) < 0 \\Rightarrow m^2 < 4 \\Rightarrow -2 < m < 2$."
                    )
                ]
            }
        ]
    },

    # --------------------------------------------------------------------------
    # EST2 2.01: Functions: Composite, Inverse & Logarithmic
    # --------------------------------------------------------------------------
    {
        "track": "est2",
        "num": "2.01",
        "slug": "functions-composite-inverse-logarithmic",
        "title": "Functions: Composite, Inverse & Logarithmic",
        "sections": [
            {
                "heading": "Section 1: Inverses & Domain Restrictions",
                "questions": [
                    make_q(
                        "If $f(x) = \\frac{2x - 5}{3x + 1}$, what is the value of $f^{-1}(1)$?",
                        ["$-6$", "$-5$", "$-4$", "$-2$"], 0,
                        "Set $f(x) = 1$: $\\frac{2x - 5}{3x + 1} = 1 \\Rightarrow 2x - 5 = 3x + 1 \\Rightarrow -x = 6 \\Rightarrow x = -6$."
                    ),
                    make_q(
                        "What is the domain of $f^{-1}(x)$ if $f(x) = \\sqrt{3 - 2x}$?",
                        ["$[0, \\infty)$", "$(-\\infty, 1.5]$", "$[1.5, \\infty)$", "All real numbers"], 0,
                        "The domain of $f^{-1}$ is the range of $f$. Since $f(x) = \\sqrt{3 - 2x} \\geq 0$, the range of $f$ is $[0, \\infty)$."
                    ),
                    make_q(
                        "Given $f(x) = x^2 - 4x + 7$ defined on the restricted domain $[2, \\infty)$, what is the equation of $f^{-1}(x)$?",
                        ["$f^{-1}(x) = 2 + \\sqrt{x - 3}$", "$f^{-1}(x) = 2 - \\sqrt{x - 3}$", "$f^{-1}(x) = \\sqrt{x - 7} + 2$", "$f^{-1}(x) = 2 + \\sqrt{x + 3}$"], 0,
                        "Complete the square: $y = (x - 2)^2 + 3 \\Rightarrow y - 3 = (x - 2)^2$. For $x \\geq 2$: $x - 2 = \\sqrt{y - 3} \\Rightarrow x = 2 + \\sqrt{y - 3}$. Thus $f^{-1}(x) = 2 + \\sqrt{x - 3}$."
                    )
                ]
            },
            {
                "heading": "Section 2: Composition & Decomposition of Functions",
                "questions": [
                    make_q(
                        "If $f(x) = 3x - 2$ and $(f \\circ g)(x) = 6x^2 + 15x + 4$, what is the expression for $g(x)$?",
                        ["$2x^2 + 5x + 2$", "$2x^2 + 5x - 2$", "$3x^2 + 5x + 2$", "$2x^2 + 3x + 4$"], 0,
                        "$f(g(x)) = 3g(x) - 2 = 6x^2 + 15x + 4 \\Rightarrow 3g(x) = 6x^2 + 15x + 6 \\Rightarrow g(x) = 2x^2 + 5x + 2$."
                    ),
                    make_q(
                        "Let $f(x) = \\frac{1}{x}$ and $g(x) = \\sqrt{x - 2}$. What is the domain of $(f \\circ g)(x)$?",
                        ["$(2, \\infty)$", "$[2, \\infty)$", "$[0, \\infty)$", "$x \\neq 2$"], 0,
                        "For $g(x)$ to exist, $x \\geq 2$. For $f(g(x)) = \\frac{1}{\\sqrt{x-2}}$ to exist, the denominator cannot be zero, requiring $x > 2$."
                    ),
                    make_q(
                        "If $h(x) = (2x^2 - 1)^5$, identify inner function $g(x)$ and outer function $f(u)$ such that $h(x) = f(g(x))$.",
                        ["$g(x) = 2x^2 - 1$ and $f(u) = u^5$", "$g(x) = x^5$ and $f(u) = 2u^2 - 1$", "$g(x) = 2x$ and $f(u) = (u - 1)^5$", "$g(x) = 2x^2$ and $f(u) = u^5 - 1$"], 0,
                        "Direct decomposition gives inner $g(x) = 2x^2 - 1$ and outer power function $f(u) = u^5$."
                    )
                ]
            },
            {
                "heading": "Section 3: Logarithmic Laws & Base Changes",
                "questions": [
                    make_q(
                        "Solve the logarithmic equation: $\\log_4(x + 3) + \\log_4(x - 3) = 2$.",
                        ["$5$", "$-5$", "$5$ and $-5$", "$\\sqrt{19}$"], 0,
                        "Combine logs: $\\log_4(x^2 - 9) = 2 \\Rightarrow x^2 - 9 = 4^2 = 16 \\Rightarrow x^2 = 25 \\Rightarrow x = \\pm 5$. Since $x > 3$, only $x = 5$ is valid."
                    ),
                    make_q(
                        "Using the change of base formula, evaluate $\\log_8(32)$.",
                        ["$\\frac{5}{3}$", "$\\frac{3}{5}$", "$4$", "$\\frac{4}{3}$"], 0,
                        "Express with base $2$: $\\log_8(32) = \\frac{\\log_2 32}{\\log_2 8} = \\frac{5}{3}$."
                    ),
                    make_q(
                        "If $\\ln x + \\ln y = a$ and $\\ln x - \\ln y = b$, what is $x$?",
                        ["$e^{(a+b)/2}$", "$e^{a+b}$", "$e^{ab}$", "$\\frac{e^a + e^b}{2}$"], 0,
                        "Add both equations: $2\\ln x = a + b \\Rightarrow \\ln x = \\frac{a + b}{2} \\Rightarrow x = e^{(a+b)/2}$."
                    )
                ]
            },
            {
                "heading": "Section 4: Exponential Models & Logarithmic Graphs",
                "questions": [
                    make_q(
                        "What is the vertical asymptote of the graph of $f(x) = 3\\ln(2x - 8) + 1$?",
                        ["$x = 4$", "$x = 8$", "$x = 0$", "$y = 1$"], 0,
                        "The argument of the natural log equals zero at the vertical asymptote: $2x - 8 = 0 \\Rightarrow 2x = 8 \\Rightarrow x = 4$."
                    ),
                    make_q(
                        "Solve the exponential equation for $t$: $500 e^{0.04 t} = 2000$.",
                        ["$25\\ln 4$", "$\\frac{\\ln 4}{0.04}$", "$50\\ln 2$", "All of the above"], 3,
                        "Divide by $500$: $e^{0.04 t} = 4 \\Rightarrow 0.04 t = \\ln 4 \\Rightarrow t = \\frac{\\ln 4}{0.04} = 25\\ln 4 = 50\\ln 2$. All choices are algebraically equivalent."
                    ),
                    make_q(
                        "What is the $x$-intercept of the graph of $g(x) = \\log_2(x - 3) - 2$?",
                        ["$7$", "$5$", "$4$", "$11$"], 0,
                        "Set $g(x) = 0$: $\\log_2(x - 3) = 2 \\Rightarrow x - 3 = 2^2 = 4 \\Rightarrow x = 7$."
                    )
                ]
            }
        ]
    },

    # --------------------------------------------------------------------------
    # EST2 3.01: Sequences, Series & Complex Numbers
    # --------------------------------------------------------------------------
    {
        "track": "est2",
        "num": "3.01",
        "slug": "sequences-series-complex-numbers",
        "title": "Sequences, Series & Complex Numbers",
        "sections": [
            {
                "heading": "Section 1: Arithmetic & Geometric Progressions",
                "questions": [
                    make_q(
                        "In an arithmetic progression, the sum of the first $n$ terms is given by $S_n = 3n^2 + 2n$. What is the $10$th term $a_{10}$?",
                        ["$59$", "$62$", "$65$", "$320$"], 0,
                        "$a_{10} = S_{10} - S_9 = [3(100) + 20] - [3(81) + 18] = 320 - [243 + 18] = 320 - 261 = 59$."
                    ),
                    make_q(
                        "If the second term of a geometric sequence is $12$ and the fifth term is $96$, what is the first term?",
                        ["$3$", "$6$", "$8$", "$12$"], 1,
                        "$\\frac{a_5}{a_2} = r^3 = \\frac{96}{12} = 8 \\Rightarrow r = 2$. Then $a_1 = \\frac{a_2}{r} = \\frac{12}{2} = 6$."
                    ),
                    make_q(
                        "Evaluate the sum of the convergent geometric series: $\\sum_{n=0}^{\\infty} 5(-\\frac{1}{3})^n$.",
                        ["$\\frac{15}{4}$", "$\\frac{15}{2}$", "$\\frac{5}{4}$", "$5$"], 0,
                        "First term $a = 5(-1/3)^0 = 5$, common ratio $r = -\\frac{1}{3}$. Sum $= \\frac{a}{1 - r} = \\frac{5}{1 - (-1/3)} = \\frac{5}{4/3} = \\frac{15}{4}$."
                    )
                ]
            },
            {
                "heading": "Section 2: Binomial Expansions & General Terms",
                "questions": [
                    make_q(
                        "What is the constant term in the expansion of $(x^2 + \\frac{1}{x})^9$?",
                        ["$84$", "$36$", "$126$", "$9$"], 0,
                        "General term: $\\binom{9}{k} (x^2)^{9-k} (x^{-1})^k = \\binom{9}{k} x^{18 - 3k}$. For constant term: $18 - 3k = 0 \\Rightarrow k = 6$. Coefficient is $\\binom{9}{6} = \\binom{9}{3} = \\frac{9 \\times 8 \\times 7}{3 \\times 2 \\times 1} = 84$."
                    ),
                    make_q(
                        "What is the coefficient of $x^4$ in the expansion of $(1 - 2x)^6$?",
                        ["$240$", "$-240$", "$480$", "$-480$"], 0,
                        "Term with $x^4$: $\\binom{6}{4} (1)^2 (-2x)^4 = 15 \\times 16 x^4 = 240 x^4$."
                    ),
                    make_q(
                        "What is the sum of the coefficients in the expansion of $(5x - 4)^7$?",
                        ["$1$", "$128$", "$2187$", "$0$"], 0,
                        "Substitute $x = 1$: $(5(1) - 4)^7 = 1^7 = 1$."
                    )
                ]
            },
            {
                "heading": "Section 3: Operations in the Complex Plane",
                "questions": [
                    make_q(
                        "What is the complex conjugate of $z = \\frac{3 - 4i}{1 + 2i}$?",
                        ["$-1 + 2i$", "$-1 - 2i$", "$1 + 2i$", "$1 - 2i$"], 0,
                        "Multiply by $(1 - 2i)$: $\\frac{(3 - 4i)(1 - 2i)}{1 - (2i)^2} = \\frac{3 - 6i - 4i + 8i^2}{1 - (-4)} = \\frac{-5 - 10i}{5} = -1 - 2i$. The conjugate is $-1 + 2i$."
                    ),
                    make_q(
                        "What is the modulus of the complex number $z = (3 + 4i)(5 - 12i)$?",
                        ["$65$", "$17$", "$13$", "$25$"], 0,
                        "$|z| = |3 + 4i| \\times |5 - 12i| = \\sqrt{3^2 + 4^2} \\times \\sqrt{5^2 + (-12)^2} = 5 \\times 13 = 65$."
                    ),
                    make_q(
                        "What is the polar form of $z = -3i$?",
                        ["$3(\\cos\\frac{3\\pi}{2} + i\\sin\\frac{3\\pi}{2})$", "$3(\\cos\\frac{\\pi}{2} + i\\sin\\frac{\\pi}{2})$", "$3(\\cos\\pi + i\\sin\\pi)$", "$-3(\\cos\\frac{\\pi}{2} + i\\sin\\frac{\\pi}{2})$"], 0,
                        "$r = 3$. Point lies on negative imaginary axis: $\\theta = \\frac{3\\pi}{2}$."
                    )
                ]
            },
            {
                "heading": "Section 4: De Moivre's Formula & Roots",
                "questions": [
                    make_q(
                        "Evaluate $(\\cos 30^\\circ + i\\sin 30^\\circ)^6$.",
                        ["$-1$", "$1$", "$i$", "$-i$"], 0,
                        "By De Moivre's: $\\cos(6 \\times 30^\\circ) + i\\sin(6 \\times 30^\\circ) = \\cos 180^\\circ + i\\sin 180^\\circ = -1 + 0i = -1$."
                    ),
                    make_q(
                        "Find the real part of $(1 - i\\sqrt{3})^5$.",
                        ["$16$", "$-16$", "$32$", "$-32$"], 0,
                        "$r = \\sqrt{1 + 3} = 2, \\theta = -\\frac{\\pi}{3}$. $(2 e^{-i\\pi/3})^5 = 32 e^{-i 5\\pi/3} = 32(\\cos\\frac{\\pi}{3} + i\\sin\\frac{\\pi}{3}) = 32(\\frac{1}{2} + i\\frac{\\sqrt{3}}{2}) = 16 + 16i\\sqrt{3}$. Real part is $16$."
                    ),
                    make_q(
                        "How many roots of the polynomial equation $z^4 + 16 = 0$ lie in the first quadrant of the complex plane?",
                        ["$1$", "$2$", "$3$", "$4$"], 0,
                        "Roots of $z^4 = -16 = 16 e^{i\\pi}$ have angles $\\theta_k = \\frac{\\pi + 2k\\pi}{4} = \\frac{\\pi}{4}, \\frac{3\\pi}{4}, \\frac{5\\pi}{4}, \\frac{7\\pi}{4}$. Exactly $1$ angle ($\\frac{\\pi}{4}$) is in Quadrant I."
                    )
                ]
            }
        ]
    },

    # --------------------------------------------------------------------------
    # EST2 4.01: Lines, Triangles & Polygons
    # --------------------------------------------------------------------------
    {
        "track": "est2",
        "num": "4.01",
        "slug": "lines-triangles-polygons",
        "title": "Lines, Triangles & Polygons",
        "sections": [
            {
                "heading": "Section 1: Coordinate Geometry of Lines",
                "questions": [
                    make_q(
                        "Find the perpendicular distance from the point $(3, -2)$ to the line $5x - 12y + 8 = 0$.",
                        ["$2.5$", "$3.6$", "$4.0$", "$4.5$"], 1,
                        "Formula: $d = \\frac{|Ax_0 + By_0 + C|}{\\sqrt{A^2 + B^2}} = \\frac{|5(3) - 12(-2) + 8|}{\\sqrt{5^2 + (-12)^2}} = \\frac{|15 + 24 + 8|}{13} = \\frac{47}{13} \\approx 3.6$."
                    ),
                    make_q(
                        "What is the area of the triangle with vertices at $(0, 0), (6, 2),$ and $(4, 8)$ in the Cartesian plane?",
                        ["$16$", "$20$", "$24$", "$30$"], 1,
                        "Shoelace formula: $\\text{Area} = \\frac{1}{2} |0(2 - 8) + 6(8 - 0) + 4(0 - 2)| = \\frac{1}{2} |48 - 8| = \\frac{1}{2}(40) = 20$."
                    ),
                    make_q(
                        "What is the acute angle of intersection between the lines $y = 2x + 1$ and $y = -3x + 4$?",
                        ["$45^\\circ$", "$60^\\circ$", "$30^\\circ$", "$75^\\circ$"], 0,
                        "Formula: $\\tan\\theta = |\\frac{m_1 - m_2}{1 + m_1 m_2}| = |\\frac{2 - (-3)}{1 + 2(-3)}| = |\\frac{5}{1 - 6}| = |\\frac{5}{-5}| = 1 \\Rightarrow \\theta = 45^\\circ$."
                    )
                ]
            },
            {
                "heading": "Section 2: Triangle Theorems & Inequalities",
                "questions": [
                    make_q(
                        "A triangle has side lengths of $7$ and $11$. Which of the following CANNOT be the length of the third side?",
                        ["$4$", "$5$", "$10$", "$17$"], 0,
                        "By the Triangle Inequality: $11 - 7 < x < 11 + 7 \\Rightarrow 4 < x < 18$. The length cannot be $4$."
                    ),
                    make_q(
                        "In $\\triangle ABC$, $AB = 8, BC = 6,$ and angle $B = 90^\\circ$. A line parallel to $BC$ intersects $AB$ at $D$ and $AC$ at $E$. If $AD = 6$, what is the length of segment $DE$?",
                        ["$4.0$", "$4.5$", "$5.0$", "$5.5$"], 1,
                        "By similar triangles $\\triangle ADE \\sim \\triangle ABC$: $\\frac{DE}{BC} = \\frac{AD}{AB} \\Rightarrow \\frac{DE}{6} = \\frac{6}{8} \\Rightarrow DE = 6 \\times \\frac{3}{4} = 4.5$."
                    ),
                    make_q(
                        "The side lengths of a triangle are $5, 12,$ and $13$. What is the radius of the incircle (inradius)?",
                        ["$1$", "$2$", "$3$", "$4$"], 1,
                        "Inradius $r = \\frac{A}{s}$. For a right triangle, Area $= \\frac{5 \\times 12}{2} = 30$. Semiperimeter $s = \\frac{5 + 12 + 13}{2} = 15$. Thus $r = \\frac{30}{15} = 2$."
                    )
                ]
            },
            {
                "heading": "Section 3: Polygons & Interior/Exterior Angles",
                "questions": [
                    make_q(
                        "If the interior angle of a regular polygon is $150^\\circ$, how many sides does the polygon have?",
                        ["$10$", "$12$", "$15$", "$18$"], 1,
                        "Each exterior angle $= 180^\\circ - 150^\\circ = 30^\\circ$. Number of sides $n = \\frac{360^\\circ}{30^\\circ} = 12$."
                    ),
                    make_q(
                        "How many diagonals does a regular decagon (10-sided polygon) have?",
                        ["$25$", "$35$", "$45$", "$70$"], 1,
                        "Formula for diagonals: $\\frac{n(n - 3)}{2} = \\frac{10(7)}{2} = 35$."
                    ),
                    make_q(
                        "What is the area of a regular hexagon with side length $4$ cm?",
                        ["$24\\sqrt{3}$ cm$^2$", "$36\\sqrt{3}$ cm$^2$", "$48$ cm$^2$", "$16\\sqrt{3}$ cm$^2$"], 0,
                        "A regular hexagon comprises $6$ equilateral triangles: $6 \\times \\frac{\\sqrt{3}}{4}(4^2) = 6 \\times 4\\sqrt{3} = 24\\sqrt{3}$ cm$^2$."
                    )
                ]
            },
            {
                "heading": "Section 4: Geometric Transformations & Dilations",
                "questions": [
                    make_q(
                        "A triangle with an area of $14$ cm$^2$ is dilated by a scale factor of $k = 3$. What is the area of the image triangle?",
                        ["$42$ cm$^2$", "$84$ cm$^2$", "$126$ cm$^2$", "$168$ cm$^2$"], 2,
                        "Area scales by $k^2$: $14 \\times 3^2 = 14 \\times 9 = 126$ cm$^2$."
                    ),
                    make_q(
                        "What is the matrix representation of a counterclockwise rotation of $90^\\circ$ about the origin?",
                        ["$[[0, -1], [1, 0]]$", "$[[0, 1], [-1, 0]]$", "$[[1, 0], [0, -1]]$", "$[[-1, 0], [0, 1]]$"], 0,
                        "Standard rotation matrix $[[\\cos\\theta, -\\sin\\theta], [\\sin\\theta, \\cos\\theta]]$. For $\\theta = 90^\\circ$: $[[0, -1], [1, 0]]$."
                    ),
                    make_q(
                        "A line $3x - 4y = 7$ is translated $2$ units right and $1$ unit up. What is the equation of the new line?",
                        ["$3x - 4y = 9$", "$3x - 4y = 5$", "$3x - 4y = 7$", "$3x - 4y = 11$"], 0,
                        "Replace $x$ with $x - 2$ and $y$ with $y - 1$: $3(x - 2) - 4(y - 1) = 7 \\Rightarrow 3x - 6 - 4y + 4 = 7 \\Rightarrow 3x - 4y = 9$."
                    )
                ]
            }
        ]
    },

    # --------------------------------------------------------------------------
    # EST2 5.01: Trigonometry
    # --------------------------------------------------------------------------
    {
        "track": "est2",
        "num": "5.01",
        "slug": "trigonometry",
        "title": "Trigonometry",
        "sections": [
            {
                "heading": "Section 1: Trigonometric Identities & Simplifications",
                "questions": [
                    make_q(
                        "Simplify the trigonometric expression: $\\frac{1}{1 + \\sin x} + \\frac{1}{1 - \\sin x}$.",
                        ["$2\\sec^2 x$", "$2\\csc^2 x$", "$2\\cos^2 x$", "$1$"], 0,
                        "Combine fractions: $\\frac{(1 - \\sin x) + (1 + \\sin x)}{(1 + \\sin x)(1 - \\sin x)} = \\frac{2}{1 - \\sin^2 x} = \\frac{2}{\\cos^2 x} = 2\\sec^2 x$."
                    ),
                    make_q(
                        "Which of the following is equal to $\\tan x + \\cot x$?",
                        ["$\\sec x \\csc x$", "$\\sin x \\cos x$", "$\\tan(2x)$", "$1$"], 0,
                        "$\\frac{\\sin x}{\\cos x} + \\frac{\\cos x}{\\sin x} = \\frac{\\sin^2 x + \\cos^2 x}{\\sin x \\cos x} = \\frac{1}{\\sin x \\cos x} = \\sec x \\csc x$."
                    ),
                    make_q(
                        "If $\\tan \\theta = \\frac{4}{3}$ and $\\pi < \\theta < \\frac{3\\pi}{2}$, what is $\\sin(2\\theta)$?",
                        ["$\\frac{24}{25}$", "$-\\frac{24}{25}$", "$\\frac{7}{25}$", "$-\\frac{7}{25}$"], 0,
                        "In Quadrant III, $\\sin\\theta = -\\frac{4}{5}$ and $\\cos\\theta = -\\frac{3}{5}$. Then $\\sin(2\\theta) = 2\\sin\\theta\\cos\\theta = 2(-\\frac{4}{5})(-\\frac{3}{5}) = \\frac{24}{25}$."
                    )
                ]
            },
            {
                "heading": "Section 2: Solving Trigonometric Equations",
                "questions": [
                    make_q(
                        "Find all solutions to $2\\cos^2 x + \\cos x - 1 = 0$ in $[0, 2\\pi)$.",
                        ["$\\frac{\\pi}{3}, \\frac{5\\pi}{3}, \\pi$", "$\\frac{\\pi}{6}, \\frac{11\\pi}{6}, \\pi$", "$\\frac{2\\pi}{3}, \\frac{4\\pi}{3}$", "$\\frac{\\pi}{4}, \\frac{7\\pi}{4}$"], 0,
                        "Factor: $(2\\cos x - 1)(\\cos x + 1) = 0$. $\\cos x = \\frac{1}{2} \\Rightarrow x = \\frac{\\pi}{3}, \\frac{5\\pi}{3}$. $\\cos x = -1 \\Rightarrow x = \\pi$."
                    ),
                    make_q(
                        "How many solutions does $\\sin(3x) = \\frac{1}{2}$ have in the interval $[0, 2\\pi)$?",
                        ["$2$", "$4$", "$6$", "$8$"], 2,
                        "As $x$ ranges over $[0, 2\\pi)$, $3x$ covers three complete cycles $[0, 6\\pi)$. Since $\\sin u = 1/2$ has $2$ solutions per cycle, there are $3 \\times 2 = 6$ solutions."
                    ),
                    make_q(
                        "Solve $\\tan^2 x = 3$ for $x \\in [0, \\pi]$.",
                        ["$\\frac{\\pi}{3}, \\frac{2\\pi}{3}$", "$\\frac{\\pi}{6}, \\frac{5\\pi}{6}$", "$\\frac{\\pi}{3}$ only", "$\\frac{\\pi}{4}, \\frac{3\\pi}{4}$"], 0,
                        "$\\tan x = \\pm \\sqrt{3}$. On $[0, \\pi]$, $\\tan x = \\sqrt{3} \\Rightarrow x = \\frac{\\pi}{3}$ and $\\tan x = -\\sqrt{3} \\Rightarrow x = \\frac{2\\pi}{3}$."
                    )
                ]
            },
            {
                "heading": "Section 3: Laws of Sines & Cosines with Ambiguous Case",
                "questions": [
                    make_q(
                        "In $\\triangle ABC$, $a = 12, b = 15,$ and angle $A = 30^\\circ$. How many valid triangles can be formed?",
                        ["$0$", "$1$", "$2$", "Infinitely many"], 2,
                        "Calculate altitude $h = b \\sin A = 15 \\sin 30^\\circ = 7.5$. Since $h < a < b$ ($7.5 < 12 < 15$), this is the ambiguous case yielding $2$ distinct triangles."
                    ),
                    make_q(
                        "In $\\triangle ABC$, $a = 5, b = 7,$ and $c = 8$. What is the measure of angle $C$?",
                        ["$45^\\circ$", "$60^\\circ$", "$75^\\circ$", "$90^\\circ$"], 1,
                        "By Law of Cosines: $\\cos C = \\frac{5^2 + 7^2 - 8^2}{2(5)(7)} = \\frac{25 + 49 - 64}{70} = \\frac{10}{70} = \\frac{1}{7}$ or for $60^\\circ$: $\\frac{25+64-49}{80} = \\frac{40}{80} = \\frac{1}{2} \\Rightarrow C = 60^\\circ$."
                    ),
                    make_q(
                        "What is the area of a parallelogram with side lengths $8$ cm and $12$ cm and an acute interior angle of $45^\\circ$?",
                        ["$48\\sqrt{2}$ cm$^2$", "$96$ cm$^2$", "$48$ cm$^2$", "$96\\sqrt{2}$ cm$^2$"], 0,
                        "Area $= a b \\sin\\theta = 8 \\times 12 \\times \\sin 45^\\circ = 96 \\times \\frac{\\sqrt{2}}{2} = 48\\sqrt{2}$ cm$^2$."
                    )
                ]
            },
            {
                "heading": "Section 4: Periodic Modeling & Phase Shifts",
                "questions": [
                    make_q(
                        "What is the phase shift of the sinusoidal wave $y = 3\\sin(2x - \\frac{\\pi}{3}) + 4$?",
                        ["$\\frac{\\pi}{6}$ to the right", "$\\frac{\\pi}{3}$ to the right", "$\\frac{\\pi}{6}$ to the left", "$\\frac{\\pi}{2}$ to the right"], 0,
                        "Factor out frequency: $2(x - \\frac{\\pi}{6})$. The phase shift is $\\frac{\\pi}{6}$ units to the right."
                    ),
                    make_q(
                        "What are the minimum and maximum values of the function $f(t) = 5 - 4\\cos(3t)$?",
                        ["Min $= 1$, Max $= 9$", "Min $= -4$, Max $= 4$", "Min $= 0$, Max $= 5$", "Min $= -1$, Max $= 9$"], 0,
                        "Since $-1 \\leq \\cos(3t) \\leq 1$, $-4 \\leq -4\\cos(3t) \\leq 4$. Adding $5$ gives minimum $5 - 4 = 1$ and maximum $5 + 4 = 9$."
                    ),
                    make_q(
                        "What is the frequency (cycles per unit of $x$) of the function $y = \\cos(4\\pi x)$?",
                        ["$2$", "$4$", "$\\frac{1}{2}$", "$\\frac{1}{4}$"], 0,
                        "Period $T = \\frac{2\\pi}{4\\pi} = \\frac{1}{2}$. Frequency is the reciprocal of the period: $f = \\frac{1}{T} = 2$ cycles per unit."
                    )
                ]
            }
        ]
    },

    # --------------------------------------------------------------------------
    # EST2 6.01: Circles & Coordinate Geometry
    # --------------------------------------------------------------------------
    {
        "track": "est2",
        "num": "6.01",
        "slug": "circles-coordinate-geometry",
        "title": "Circles & Coordinate Geometry",
        "sections": [
            {
                "heading": "Section 1: General Circle Equations & Completing the Square",
                "questions": [
                    make_q(
                        "A circle has the equation $x^2 + y^2 + 4x - 10y + 13 = 0$. What are its center and radius?",
                        ["Center $(-2, 5)$, radius $4$", "Center $(2, -5)$, radius $4$", "Center $(-2, 5)$, radius $16$", "Center $(2, -5)$, radius $16$"], 0,
                        "Complete the square: $(x + 2)^2 + (y - 5)^2 = -13 + 4 + 25 = 16$. Center is $(-2, 5)$ and radius is $\\sqrt{16} = 4$."
                    ),
                    make_q(
                        "Find the equation of the circle that has points $A(1, 2)$ and $B(7, 10)$ as endpoints of a diameter.",
                        ["$(x - 4)^2 + (y - 6)^2 = 25$", "$(x - 4)^2 + (y - 6)^2 = 5$", "$(x - 3)^2 + (y - 4)^2 = 25$", "$(x + 4)^2 + (y + 6)^2 = 25$"], 0,
                        "Center is midpoint $(\\frac{1+7}{2}, \\frac{2+10}{2}) = (4, 6)$. Radius is distance from center to $(1, 2)$: $r = \\sqrt{(4-1)^2 + (6-2)^2} = \\sqrt{9 + 16} = 5$. Equation: $(x - 4)^2 + (y - 6)^2 = 25$."
                    ),
                    make_q(
                        "For what value of $k$ does $x^2 + y^2 - 6x + 8y + k = 0$ represent a single point (degenerate circle)?",
                        ["$25$", "$16$", "$9$", "$0$"], 0,
                        "Completing square: $(x - 3)^2 + (y + 4)^2 = 9 + 16 - k = 25 - k$. For a single point, radius $= 0 \\Rightarrow 25 - k = 0 \\Rightarrow k = 25$."
                    )
                ]
            },
            {
                "heading": "Section 2: Tangent Lines to Circles",
                "questions": [
                    make_q(
                        "What is the equation of the tangent line to the circle $x^2 + y^2 = 20$ at the point $(2, 4)$?",
                        ["$x + 2y = 10$", "$2x + y = 10$", "$x - 2y = -6$", "$2x - y = 0$"], 0,
                        "Radial line to $(2, 4)$ has slope $\\frac{4}{2} = 2$. Tangent line has perpendicular slope $-\\frac{1}{2}$: $y - 4 = -\\frac{1}{2}(x - 2) \\Rightarrow 2y - 8 = -x + 2 \\Rightarrow x + 2y = 10$."
                    ),
                    make_q(
                        "Find the length of the tangent line drawn from external point $P(8, 0)$ to the circle $x^2 + y^2 = 16$.",
                        ["$4\\sqrt{3}$", "$4$", "$8$", "$2\\sqrt{5}$"], 0,
                        "The distance from center $(0,0)$ to $P$ is $d = 8$. Circle radius is $r = 4$. By Pythagorean theorem on the tangent right triangle: $L = \\sqrt{d^2 - r^2} = \\sqrt{8^2 - 4^2} = \\sqrt{64 - 16} = \\sqrt{48} = 4\\sqrt{3}$."
                    ),
                    make_q(
                        "At what points does the line $y = x + 2$ intersect the circle $x^2 + y^2 = 10$?",
                        ["$(1, 3)$ and $(-3, -1)$", "$(3, 1)$ and $(-1, -3)$", "$(1, 3)$ only", "No intersection"], 0,
                        "Substitute: $x^2 + (x + 2)^2 = 10 \\Rightarrow 2x^2 + 4x - 6 = 0 \\Rightarrow x^2 + 2x - 3 = 0 \\Rightarrow (x + 3)(x - 1) = 0$. Points are $(1, 3)$ and $(-3, -1)$."
                    )
                ]
            },
            {
                "heading": "Section 3: Loci & Conic Definitions",
                "questions": [
                    make_q(
                        "What is the locus of all points $(x, y)$ that are equidistant from the point $(0, 3)$ and the line $y = -3$?",
                        ["Parabola $y = \\frac{1}{12}x^2$", "Parabola $x = \\frac{1}{12}y^2$", "Circle $x^2 + y^2 = 9$", "Ellipse $\\frac{x^2}{9} + \\frac{y^2}{6} = 1$"], 0,
                        "By definition, a parabola is the locus of points equidistant from focus $(0, p)$ and directrix $y = -p$. Here $p = 3$, so equation is $x^2 = 4py = 12y \\Rightarrow y = \\frac{1}{12}x^2$."
                    ),
                    make_q(
                        "What is the locus of all points whose distances to $(2, 0)$ and $(-2, 0)$ have a constant sum of $6$?",
                        ["Ellipse $\\frac{x^2}{9} + \\frac{y^2}{5} = 1$", "Hyperbola $\\frac{x^2}{9} - \\frac{y^2}{5} = 1$", "Circle $x^2 + y^2 = 9$", "Parabola $y^2 = 4x$"], 0,
                        "Constant sum $2a = 6 \\Rightarrow a = 3$. Distance between foci $2c = 4 \\Rightarrow c = 2$. $b^2 = a^2 - c^2 = 9 - 4 = 5$. Equation is ellipse $\\frac{x^2}{9} + \\frac{y^2}{5} = 1$."
                    ),
                    make_q(
                        "What geometric figure is defined by $x = 4 + 3\\cos t, y = -1 + 3\\sin t$?",
                        ["Circle centered at $(4, -1)$ with radius $3$", "Ellipse with semimajor axis $4$", "Hyperbola centered at $(4, -1)$", "Line with slope $1$"], 0,
                        "Rearranging: $(x - 4)^2 + (y + 1)^2 = 9(\\cos^2 t + \\sin^2 t) = 9$. Circle centered at $(4, -1)$ with radius $3$."
                    )
                ]
            },
            {
                "heading": "Section 4: Coordinate Proofs & Polygons",
                "questions": [
                    make_q(
                        "What type of quadrilateral has vertices at $A(0, 0), B(4, 0), C(5, 3),$ and $D(1, 3)$?",
                        ["Parallelogram", "Rhombus", "Rectangle", "Trapezoid (not parallelogram)"], 0,
                        "Slope of $AB$ and $CD$ is $0$ (parallel, length $4$). Slope of $AD$ and $BC$ is $\\frac{3}{1} = 3$ (parallel). Length $AD = \\sqrt{1^2 + 3^2} = \\sqrt{10} \\neq 4$. Thus it is a parallelogram."
                    ),
                    make_q(
                        "Find the centroid of the triangle with vertices $(1, 4), (5, -2),$ and $(6, 7)$.",
                        ["$(4, 3)$", "$(3, 4)$", "$(4, 4)$", "$(5, 3)$"], 0,
                        "Centroid coordinates are averages: $(\\frac{1+5+6}{3}, \\frac{4-2+7}{3}) = (\\frac{12}{3}, \\frac{9}{3}) = (4, 3)$."
                    ),
                    make_q(
                        "What is the slope of the altitude drawn to side $BC$ in $\\triangle ABC$ where $B = (2, 1)$ and $C = (6, 5)$?",
                        ["$-1$", "$1$", "$\\frac{1}{2}$", "$-2$"], 0,
                        "Slope of $BC = \\frac{5 - 1}{6 - 2} = 1$. The altitude is perpendicular to $BC$, so its slope is $-1$."
                    )
                ]
            }
        ]
    },

    # --------------------------------------------------------------------------
    # EST2 7.01: Solid Geometry & Similarity
    # --------------------------------------------------------------------------
    {
        "track": "est2",
        "num": "7.01",
        "slug": "solid-geometry-similarity",
        "title": "Solid Geometry & Similarity",
        "sections": [
            {
                "heading": "Section 1: Polyhedra & Euler's Formula",
                "questions": [
                    make_q(
                        "A convex polyhedron has $12$ vertices and $30$ edges. How many faces does it have?",
                        ["$18$", "$20$", "$22$", "$24$"], 1,
                        "By Euler's formula $V - E + F = 2$: $12 - 30 + F = 2 \\Rightarrow -18 + F = 2 \\Rightarrow F = 20$ (an icosahedron)."
                    ),
                    make_q(
                        "What is the total surface area of a regular tetrahedron with edge length $6$ cm?",
                        ["$36\\sqrt{3}$ cm$^2$", "$18\\sqrt{3}$ cm$^2$", "$54$ cm$^2$", "$72\\sqrt{3}$ cm$^2$"], 0,
                        "A regular tetrahedron has $4$ equilateral triangular faces: $4 \\times \\frac{\\sqrt{3}}{4}(6^2) = 36\\sqrt{3}$ cm$^2$."
                    ),
                    make_q(
                        "What is the length of the space diagonal of a rectangular prism with dimensions $3, 4,$ and $12$?",
                        ["$13$", "$15$", "$\\sqrt{160}$", "$14$"], 0,
                        "$d = \\sqrt{l^2 + w^2 + h^2} = \\sqrt{3^2 + 4^2 + 12^2} = \\sqrt{9 + 16 + 144} = \\sqrt{169} = 13$."
                    )
                ]
            },
            {
                "heading": "Section 2: Cones, Pyramids & Frustums",
                "questions": [
                    make_q(
                        "A right pyramid has a square base of side $10$ cm and an altitude of $12$ cm. What is its lateral surface area?",
                        ["$260$ cm$^2$", "$240$ cm$^2$", "$360$ cm$^2$", "$130$ cm$^2$"], 0,
                        "Slant height $l = \\sqrt{12^2 + 5^2} = \\sqrt{144 + 25} = 13$ cm. Lateral area $= \\frac{1}{2} P l = \\frac{1}{2}(40)(13) = 260$ cm$^2$."
                    ),
                    make_q(
                        "A right circular cone of radius $6$ cm and height $9$ cm is cut by a plane parallel to its base at height $3$ cm from the base. What is the radius of the top circular cross section?",
                        ["$4$ cm", "$3$ cm", "$4.5$ cm", "$5$ cm"], 0,
                        "Height of smaller top cone $= 9 - 3 = 6$ cm. By similarity: $\\frac{r_{\\text{top}}}{6} = \\frac{6}{9} \\Rightarrow r_{\\text{top}} = 6 \\times \\frac{2}{3} = 4$ cm."
                    ),
                    make_q(
                        "What is the volume of the frustum formed in the above cone with bases of radii $6$ cm and $4$ cm and height $3$ cm?",
                        ["$76\\pi$ cm$^3$", "$72\\pi$ cm$^3$", "$84\\pi$ cm$^3$", "$96\\pi$ cm$^3$"], 0,
                        "Volume of frustum: $\\frac{1}{3}\\pi h (R^2 + Rr + r^2) = \\frac{1}{3}\\pi (3) (36 + 24 + 16) = 76\\pi$ cm$^3$."
                    )
                ]
            },
            {
                "heading": "Section 3: Spheres, Cylinders & Cross-Sections",
                "questions": [
                    make_q(
                        "A cylinder is circumscribed around a sphere of radius $r$. What is the ratio of the volume of the sphere to the volume of the cylinder?",
                        ["$\\frac{2}{3}$", "$\\frac{1}{2}$", "$\\frac{3}{4}$", "$\\frac{4}{5}$"], 0,
                        "Cylinder height $h = 2r$. Volume of cylinder $= \\pi r^2(2r) = 2\\pi r^3$. Volume of sphere $= \\frac{4}{3}\\pi r^3$. Ratio $= \\frac{4/3}{2} = \\frac{2}{3}$ (Archimedes' theorem)."
                    ),
                    make_q(
                        "A sphere is intersected by a plane $5$ cm from its center. If the radius of the cross-sectional circle is $12$ cm, what is the radius of the sphere?",
                        ["$13$ cm", "$15$ cm", "$\\sqrt{119}$ cm", "$17$ cm"], 0,
                        "$R = \\sqrt{d^2 + r_{\\text{circle}}^2} = \\sqrt{5^2 + 12^2} = \\sqrt{25 + 144} = \\sqrt{169} = 13$ cm."
                    ),
                    make_q(
                        "What is the total surface area of a closed hemisphere of radius $4$ cm?",
                        ["$48\\pi$ cm$^2$", "$32\\pi$ cm$^2$", "$64\\pi$ cm$^2$", "$16\\pi$ cm$^2$"], 0,
                        "Total surface area $= \\text{Curved area} + \\text{Base area} = 2\\pi r^2 + \\pi r^2 = 3\\pi r^2 = 3\\pi(16) = 48\\pi$ cm$^2$."
                    )
                ]
            },
            {
                "heading": "Section 4: Scale Factors & Volume Ratios",
                "questions": [
                    make_q(
                        "Two similar solid statues have heights in the ratio $2:5$. If the smaller statue weighs $16$ kg, what does the larger statue weigh (assuming identical material)?",
                        ["$250$ kg", "$100$ kg", "$200$ kg", "$320$ kg"], 0,
                        "Volume and weight scale with the cube of the linear factor: $(\\frac{5}{2})^3 = \\frac{125}{8}$. Weight $= 16 \\times \\frac{125}{8} = 250$ kg."
                    ),
                    make_q(
                        "If the volume of a sphere is multiplied by $27$, by what factor does its surface area increase?",
                        ["$9$", "$3$", "$6$", "$18$"], 0,
                        "Volume factor $= 27 = k^3 \\Rightarrow k = 3$. Surface area factor $= k^2 = 3^2 = 9$."
                    ),
                    make_q(
                        "A solid cylinder has its radius doubled and its height halved. How does its volume change?",
                        ["Doubled", "Halved", "Quadrupled", "Remains unchanged"], 0,
                        "Original volume $= \\pi r^2 h$. New volume $= \\pi (2r)^2 (\\frac{h}{2}) = \\pi (4r^2) (\\frac{h}{2}) = 2\\pi r^2 h$. The volume is doubled."
                    )
                ]
            }
        ]
    },

    # --------------------------------------------------------------------------
    # EST2 8.01: Statistics & Probability
    # --------------------------------------------------------------------------
    {
        "track": "est2",
        "num": "8.01",
        "slug": "statistics-probability",
        "title": "Statistics & Probability",
        "sections": [
            {
                "heading": "Section 1: Counting Principles & Probability",
                "questions": [
                    make_q(
                        "A password consists of $3$ letters followed by $2$ digits. If repetition of letters is NOT allowed, how many such passwords can be created?",
                        ["$1,560,000$", "$1,757,600$", "$1,404,000$", "$2,600,000$"], 0,
                        "Letter arrangements: $26 \\times 25 \\times 24 = 15,600$. Digit arrangements: $10 \\times 10 = 100$. Total $= 15,600 \\times 100 = 1,560,000$."
                    ),
                    make_q(
                        "Five people are to be seated in a row of five chairs. What is the probability that two specific people, Alice and Bob, sit next to each other?",
                        ["$\\frac{2}{5}$", "$\\frac{1}{5}$", "$\\frac{1}{2}$", "$\\frac{3}{5}$"], 0,
                        "Treat Alice and Bob as a single block: $4! \\times 2! = 24 \\times 2 = 48$. Total arrangements $= 5! = 120$. Probability $= \\frac{48}{120} = \\frac{2}{5}$."
                    ),
                    make_q(
                        "What is the probability of obtaining exactly $3$ heads in $5$ tosses of a fair coin?",
                        ["$\\frac{5}{16}$", "$\\frac{1}{2}$", "$\\frac{3}{16}$", "$\\frac{5}{32}$"], 0,
                        "Binomial probability: $\\binom{5}{3} (\\frac{1}{2})^3 (\\frac{1}{2})^2 = 10 \\times \\frac{1}{32} = \\frac{10}{32} = \\frac{5}{16}$."
                    )
                ]
            },
            {
                "heading": "Section 2: Conditional Probability & Independence",
                "questions": [
                    make_q(
                        "If $P(A) = 0.4$, $P(B \\mid A) = 0.75$, and $P(B) = 0.5$, what is $P(A \\mid B)$?",
                        ["$0.60$", "$0.50$", "$0.30$", "$0.75$"], 0,
                        "$P(A \\cap B) = P(A) P(B \\mid A) = 0.4 \\times 0.75 = 0.3$. Then $P(A \\mid B) = \\frac{P(A \\cap B)}{P(B)} = \\frac{0.3}{0.5} = 0.60$."
                    ),
                    make_q(
                        "Two events $A$ and $B$ satisfy $P(A) = 0.3$ and $P(B) = 0.6$. If $A$ and $B$ are independent, what is $P(A \\cup B)$?",
                        ["$0.72$", "$0.90$", "$0.78$", "$0.18$"], 0,
                        "$P(A \\cap B) = 0.3 \\times 0.6 = 0.18$. $P(A \\cup B) = 0.3 + 0.6 - 0.18 = 0.72$."
                    ),
                    make_q(
                        "In a certain school, $60\\%$ of students take French, $40\\%$ take Spanish, and $20\\%$ take both. What is the probability that a student takes French given that they take Spanish?",
                        ["$0.50$", "$0.33$", "$0.60$", "$0.25$"], 0,
                        "$P(\\text{French} \\mid \\text{Spanish}) = \\frac{P(\\text{French} \\cap \\text{Spanish})}{P(\\text{Spanish})} = \\frac{0.20}{0.40} = 0.50$."
                    )
                ]
            },
            {
                "heading": "Section 3: Normal Distributions & Standard Scores",
                "questions": [
                    make_q(
                        "In a standard normal distribution $Z \\sim N(0, 1)$, what is $P(-1.96 \\leq Z \\leq 1.96)$?",
                        ["$0.95$", "$0.68$", "$0.997$", "$0.90$"], 0,
                        "By standard normal probability tables, $95\\%$ of the distribution falls within $1.96$ standard deviations of the mean."
                    ),
                    make_q(
                        "A dataset has mean $\\mu = 100$ and variance $\\sigma^2 = 25$. What score corresponds to a $z$-score of $1.8$?",
                        ["$109$", "$105$", "$118$", "$145$"], 0,
                        "Standard deviation $\\sigma = \\sqrt{25} = 5$. Score $x = \\mu + z\\sigma = 100 + 1.8(5) = 100 + 9 = 109$."
                    ),
                    make_q(
                        "If $16\\%$ of scores on a normal test are above $84$ and the mean is $76$, what is the standard deviation?",
                        ["$8$", "$4$", "$12$", "$16$"], 0,
                        "In a normal distribution, the top $16\\%$ corresponds to approximately $1$ standard deviation above the mean ($\\mu + \\sigma$). Thus $76 + \\sigma = 84 \\Rightarrow \\sigma = 8$."
                    )
                ]
            },
            {
                "heading": "Section 4: Regression & Correlation",
                "questions": [
                    make_q(
                        "If the correlation coefficient between two variables is $r = -0.85$, what does this indicate?",
                        ["A strong negative linear association", "A weak negative linear association", "A strong positive linear association", "No linear association"], 0,
                        "Values of $r$ near $-1$ indicate a strong negative linear relationship between the two variables."
                    ),
                    make_q(
                        "In a least-squares linear regression line $\\hat{y} = 2.5x + 14$, what is the predicted change in $y$ for each unit increase in $x$?",
                        ["$+2.5$", "$+14$", "$+5.6$", "Cannot be determined"], 0,
                        "The slope $2.5$ represents the estimated change in the response variable $y$ for each $1$-unit increase in the explanatory variable $x$."
                    ),
                    make_q(
                        "An observed data point has coordinates $(4, 25)$. If the regression model predicts $\\hat{y} = 23$ for $x = 4$, what is the residual?",
                        ["$+2$", "$-2$", "$+48$", "$+0.08$"], 0,
                        "Residual $= y - \\hat{y} = 25 - 23 = +2$."
                    )
                ]
            }
        ]
    }
]

# ==============================================================================
# EST II MATH LEVEL 2 (6 TOPICS)
# ==============================================================================

EST2L2_TOPICS = [
    # --------------------------------------------------------------------------
    # EST2L2 1.01: Complex Numbers
    # --------------------------------------------------------------------------
    {
        "track": "est2l2",
        "num": "1.01",
        "slug": "complex-numbers",
        "title": "Complex Numbers",
        "sections": [
            {
                "heading": "Section 1: Modulus-Argument Form",
                "questions": [
                    make_q(
                        "Find the polar representation of $z = -1 - i\\sqrt{3}$.",
                        ["$2(\\cos\\frac{4\\pi}{3} + i\\sin\\frac{4\\pi}{3})$", "$2(\\cos\\frac{2\\pi}{3} + i\\sin\\frac{2\\pi}{3})$", "$2(\\cos\\frac{5\\pi}{3} + i\\sin\\frac{5\\pi}{3})$", "$4(\\cos\\frac{4\\pi}{3} + i\\sin\\frac{4\\pi}{3})$"], 0,
                        "$r = \\sqrt{(-1)^2 + (-\\sqrt{3})^2} = \\sqrt{4} = 2$. Angle is in Quadrant III: $\\theta = \\pi + \\frac{\\pi}{3} = \\frac{4\\pi}{3}$."
                    ),
                    make_q(
                        "What is the modulus of the quotient $\\frac{1 + 3i}{2 - i}$?",
                        ["$\\sqrt{2}$", "$2$", "$\\sqrt{5}$", "$\\frac{\\sqrt{10}}{5}$"], 0,
                        "$|\\frac{1+3i}{2-i}| = \\frac{|1+3i|}{|2-i|} = \\frac{\\sqrt{1^2 + 3^2}}{\\sqrt{2^2 + (-1)^2}} = \\frac{\\sqrt{10}}{\\sqrt{5}} = \\sqrt{2}$."
                    ),
                    make_q(
                        "If $z = 4(\\cos 70^\\circ + i\\sin 70^\\circ)$ and $w = 2(\\cos 40^\\circ + i\\sin 40^\\circ)$, what is $\\frac{z}{w}$?",
                        ["$2(\\cos 30^\\circ + i\\sin 30^\\circ)$", "$2(\\cos 110^\\circ + i\\sin 110^\\circ)$", "$8(\\cos 30^\\circ + i\\sin 30^\\circ)$", "$2(\\cos 2800^\\circ + i\\sin 2800^\\circ)$"], 0,
                        "Divide moduli: $\\frac{4}{2} = 2$. Subtract angles: $70^\\circ - 40^\\circ = 30^\\circ$."
                    )
                ]
            },
            {
                "heading": "Section 2: De Moivre's Powers",
                "questions": [
                    make_q(
                        "Evaluate $(\\frac{1}{\\sqrt{2}} + \\frac{i}{\\sqrt{2}})^{10}$.",
                        ["$i$", "$-i$", "$1$", "$-1$"], 0,
                        "$z = \\cos\\frac{\\pi}{4} + i\\sin\\frac{\\pi}{4}$. Raising to power $10$: $\\cos(\\frac{10\\pi}{4}) + i\\sin(\\frac{10\\pi}{4}) = \\cos(\\frac{5\\pi}{2}) + i\\sin(\\frac{5\\pi}{2}) = 0 + i(1) = i$."
                    ),
                    make_q(
                        "What is $(\\sqrt{3} - i)^6$?",
                        ["$-64$", "$64$", "$-64i$", "$64i$"], 0,
                        "$r = 2, \\theta = -\\frac{\\pi}{6}$. Then $z^6 = 2^6 [\\cos(-\\pi) + i\\sin(-\\pi)] = 64(-1 + 0) = -64$."
                    ),
                    make_q(
                        "If $z + \\frac{1}{z} = 2\\cos\\theta$, what is $z^n + \\frac{1}{z^n}$?",
                        ["$2\\cos(n\\theta)$", "$2\\sin(n\\theta)$", "$\\cos(n\\theta)$", "$2^n \\cos^n\\theta$"], 0,
                        "Since $z = \\cos\\theta + i\\sin\\theta$, $z^n = \\cos(n\\theta) + i\\sin(n\\theta)$ and $z^{-n} = \\cos(n\\theta) - i\\sin(n\\theta)$. Adding gives $2\\cos(n\\theta)$."
                    )
                ]
            },
            {
                "heading": "Section 3: Roots of Complex Numbers",
                "questions": [
                    make_q(
                        "What is the principal square root of $8i$?",
                        ["$2 + 2i$", "$2 - 2i$", "$4i$", "$2\\sqrt{2} + 2\\sqrt{2}i$"], 0,
                        "$8i = 8 e^{i\\pi/2}$. Square root is $\\sqrt{8} e^{i\\pi/4} = 2\\sqrt{2}(\\frac{1}{\\sqrt{2}} + \\frac{i}{\\sqrt{2}}) = 2 + 2i$."
                    ),
                    make_q(
                        "The four 4th roots of $-1$ form the vertices of what geometric polygon in the complex plane?",
                        ["A square", "A rectangle", "A rhombus", "A regular hexagon"], 0,
                        "The $n$-th roots of any non-zero complex number are evenly spaced on a circle with angle separation $\\frac{2\\pi}{n} = \\frac{\\pi}{2}$, forming a square."
                    ),
                    make_q(
                        "If $\\omega$ is a non-real cube root of $1$, what is the value of $1 + \\omega + \\omega^2$?",
                        ["$0$", "$1$", "$-1$", "$3$"], 0,
                        "By the properties of roots of unity, the sum of all cube roots of unity is $0$."
                    )
                ]
            },
            {
                "heading": "Section 4: Complex Geometry & Loci",
                "questions": [
                    make_q(
                        "Describe the locus of points in the complex plane satisfying $|z - 3| = |z - 5i|$.",
                        ["Perpendicular bisector of segment joining $(3, 0)$ and $(0, 5)$", "Circle of radius $3$", "Ellipse with foci at $3$ and $5i$", "Ray starting at $3$"], 0,
                        "The equation states that the distance from $z$ to $3$ equals the distance from $z$ to $5i$, which is the perpendicular bisector."
                    ),
                    make_q(
                        "What is the Cartesian equation for $|z - 2| = 3$?",
                        ["$(x - 2)^2 + y^2 = 9$", "$x^2 + (y - 2)^2 = 9$", "$(x - 2)^2 + y^2 = 3$", "$x^2 + y^2 = 9$"], 0,
                        "Let $z = x + iy$: $|(x - 2) + iy| = \\sqrt{(x - 2)^2 + y^2} = 3 \\Rightarrow (x - 2)^2 + y^2 = 9$."
                    ),
                    make_q(
                        "Which inequality describes the interior of the unit disk in the complex plane?",
                        ["$|z| < 1$", "$|z| > 1$", "$\\operatorname{Re}(z) < 1$", "$\\operatorname{Im}(z) < 1$"], 0,
                        "$|z| < 1$ is the set of all complex numbers whose distance to the origin is strictly less than $1$."
                    )
                ]
            }
        ]
    },

    # --------------------------------------------------------------------------
    # EST2L2 2.01: Sequences & Series
    # --------------------------------------------------------------------------
    {
        "track": "est2l2",
        "num": "2.01",
        "slug": "sequences-series",
        "title": "Sequences & Series",
        "sections": [
            {
                "heading": "Section 1: Advanced Arithmetic & Geometric Progressions",
                "questions": [
                    make_q(
                        "The sum of three consecutive terms of an arithmetic progression is $27$, and their product is $504$. What is the largest of the three terms?",
                        ["$14$", "$16$", "$18$", "$21$"], 0,
                        "Let terms be $a - d, a, a + d$. Sum $= 3a = 27 \\Rightarrow a = 9$. Product $= (9 - d)(9)(9 + d) = 9(81 - d^2) = 504 \\Rightarrow 81 - d^2 = 56 \\Rightarrow d^2 = 25 \\Rightarrow d = 5$. Largest term $= 9 + 5 = 14$."
                    ),
                    make_q(
                        "If $x, y, z$ are in geometric progression, which equation must be true?",
                        ["$y^2 = xz$", "$2y = x + z$", "$y = \\frac{x+z}{2}$", "$y^3 = xz$"], 0,
                        "Common ratio: $\\frac{y}{x} = \\frac{z}{y} \\Rightarrow y^2 = xz$."
                    ),
                    make_q(
                        "What is the sum of the series $1 + \\frac{2}{3} + \\frac{4}{9} + \\frac{8}{27} + \\dots$?",
                        ["$3$", "$\\frac{3}{2}$", "$2$", "$\\frac{5}{2}$"], 0,
                        "$a = 1$, $r = \\frac{2}{3}$. Sum $= \\frac{1}{1 - 2/3} = \\frac{1}{1/3} = 3$."
                    )
                ]
            },
            {
                "heading": "Section 2: Summation Notation & Formulas",
                "questions": [
                    make_q(
                        "Evaluate $\\sum_{k=1}^{15} (4k - 1)$.",
                        ["$465$", "$480$", "$495$", "$510$"], 0,
                        "Sum $= 4 \\sum_{k=1}^{15} k - 15(1) = 4(\\frac{15 \\times 16}{2}) - 15 = 4(120) - 15 = 480 - 15 = 465$."
                    ),
                    make_q(
                        "Evaluate $\\sum_{k=1}^8 k^3$ using the formula $[\\frac{n(n+1)}{2}]^2$.",
                        ["$1,296$", "$1,024$", "$1,521$", "$1,728$"], 0,
                        "$[\\frac{8 \\times 9}{2}]^2 = [36]^2 = 1,296$."
                    ),
                    make_q(
                        "Evaluate $\\sum_{n=1}^{\\infty} \\frac{1}{n(n+1)}$.",
                        ["$1$", "$\\frac{1}{2}$", "$2$", "Diverges"], 0,
                        "Telescoping series: $\\sum (\\frac{1}{n} - \\frac{1}{n+1}) = 1 - 0 = 1$."
                    )
                ]
            },
            {
                "heading": "Section 3: Infinite Geometric Series & Repeating Decimals",
                "questions": [
                    make_q(
                        "A ball is dropped from a height of $16$ meters. Each time it hits the ground, it bounces to $\\frac{3}{4}$ of its previous height. What is the total vertical distance traveled before coming to rest?",
                        ["$112$ meters", "$96$ meters", "$128$ meters", "$64$ meters"], 0,
                        "Distance $= 16 + 2 \\sum_{n=1}^{\\infty} 16(3/4)^n = 16 + 2[\\frac{12}{1 - 3/4}] = 16 + 2(48) = 16 + 96 = 112$ meters."
                    ),
                    make_q(
                        "Express $0.\\overline{36}$ as a reduced fraction.",
                        ["$\\frac{4}{11}$", "$\\frac{36}{100}$", "$\\frac{1}{3}$", "$\\frac{12}{33}$"], 0,
                        "Sum of geometric series: $\\frac{36/100}{1 - 1/100} = \\frac{36}{99} = \\frac{4}{11}$."
                    ),
                    make_q(
                        "For what range of $x$ does $\\sum_{n=0}^{\\infty} (\\frac{x}{3})^n$ converge?",
                        ["$(-3, 3)$", "$[-3, 3]$", "$(-1, 1)$", "$(-9, 9)$"], 0,
                        "Convergence requires $|r| < 1$: $|\\frac{x}{3}| < 1 \\Rightarrow -3 < x < 3$."
                    )
                ]
            },
            {
                "heading": "Section 4: Mathematical Induction",
                "questions": [
                    make_q(
                        "In proving $1 + 2 + \\dots + n = \\frac{n(n+1)}{2}$, what is the inductive step?",
                        ["Add $(k + 1)$ to both sides of the hypothesis for $n = k$", "Multiply both sides by $2$", "Subtract $k$ from $n$", "Differentiate with respect to $n$"], 0,
                        "The inductive step assumes the identity for $n = k$ and adds the next term $(k + 1)$ to prove the formula for $k + 1$."
                    ),
                    make_q(
                        "What is the base case when proving a theorem for all positive integers $n$?",
                        ["Verify the statement for $n = 1$", "Verify for $n = 0$", "Assume for $n = k$", "Prove for all even integers"], 0,
                        "The base case establishes the initial truth of the proposition, typically at $n = 1$."
                    ),
                    make_q(
                        "If $P(k) \\Rightarrow P(k+1)$ is true, under what condition is $P(n)$ true for all $n \\geq 1$?",
                        ["$P(1)$ is true", "$P(0)$ is true", "$P(2)$ is false", "$P(k)$ is true for all $k$ simultaneously"], 0,
                        "By the Principle of Mathematical Induction, if the base case $P(1)$ holds and $P(k) \\Rightarrow P(k+1)$, the proposition holds for all $n \\geq 1$."
                    )
                ]
            }
        ]
    },

    # --------------------------------------------------------------------------
    # EST2L2 3.01: Functions & Graphs
    # --------------------------------------------------------------------------
    {
        "track": "est2l2",
        "num": "3.01",
        "slug": "functions-graphs",
        "title": "Functions & Graphs",
        "sections": [
            {
                "heading": "Section 1: Rational Functions & Oblique Asymptotes",
                "questions": [
                    make_q(
                        "Find the oblique asymptote of $f(x) = \\frac{3x^2 - 2x + 4}{x - 1}$.",
                        ["$y = 3x + 1$", "$y = 3x - 1$", "$y = 3x + 4$", "$y = 3x$"], 0,
                        "Divide: $\\frac{3x^2 - 2x + 4}{x - 1} = 3x + 1 + \\frac{5}{x - 1}$. The oblique asymptote is $y = 3x + 1$."
                    ),
                    make_q(
                        "Where does $g(x) = \\frac{x^2 - 16}{x^2 - 3x - 4}$ have a vertical asymptote?",
                        ["$x = -1$", "$x = 4$", "$x = -4$", "Both $x = -1$ and $x = 4$"], 0,
                        "Factor: $\\frac{(x - 4)(x + 4)}{(x - 4)(x + 1)}$. Common factor $(x - 4)$ cancels (hole at $x = 4$). The remaining denominator factor gives vertical asymptote at $x = -1$."
                    ),
                    make_q(
                        "What is the horizontal asymptote of $h(x) = \\frac{5x - 2}{x^2 + 1}$?",
                        ["$y = 0$", "$y = 5$", "$y = -2$", "No horizontal asymptote"], 0,
                        "Since the degree of the denominator ($2$) is strictly greater than the degree of the numerator ($1$), the horizontal asymptote is $y = 0$."
                    )
                ]
            },
            {
                "heading": "Section 2: Piecewise & Absolute Value Graphs",
                "questions": [
                    make_q(
                        "What is the range of $f(x) = |2x - 6| - 4$?",
                        ["$[-4, \\infty)$", "$[4, \\infty)$", "$[0, \\infty)$", "$(-\\infty, -4]$"], 0,
                        "Since $|2x - 6| \\geq 0$, the minimum value is $0 - 4 = -4$. Range is $[-4, \\infty)$."
                    ),
                    make_q(
                        "At what value of $x$ does the graph of $y = |x - 3| + |x + 5|$ attain its minimum value?",
                        ["Any $x \\in [-5, 3]$", "$x = -1$", "$x = 3$", "$x = -5$"], 0,
                        "For $x \\in [-5, 3]$, $|x - 3| + |x + 5| = (3 - x) + (x + 5) = 8$. The constant minimum value $8$ is achieved everywhere on $[-5, 3]$."
                    ),
                    make_q(
                        "What is the domain of $f(x) = \\sqrt{9 - x^2}$?",
                        ["$[-3, 3]$", "$(-\\infty, -3] \\cup [3, \\infty)$", "$[0, 3]$", "$[-9, 9]$"], 0,
                        "Requirement: $9 - x^2 \\geq 0 \\Rightarrow x^2 \\leq 9 \\Rightarrow -3 \\leq x \\leq 3$."
                    )
                ]
            },
            {
                "heading": "Section 3: Inverse Trigonometric Graphs & Domains",
                "questions": [
                    make_q(
                        "What is the domain of $f(x) = \\arcsin(2x - 1)$?",
                        ["$[0, 1]$", "$[-1, 1]$", "$[-0.5, 0.5]$", "$[0, 2]$"], 0,
                        "Argument must be in $[-1, 1]$: $-1 \\leq 2x - 1 \\leq 1 \\Rightarrow 0 \\leq 2x \\leq 2 \\Rightarrow 0 \\leq x \\leq 1$."
                    ),
                    make_q(
                        "What is the range of the principal $\\arccos(x)$ function?",
                        ["$[0, \\pi]$", "$[-\\frac{\\pi}{2}, \\frac{\\pi}{2}]$", "$[0, 2\\pi]$", "$(0, \\pi)$"], 0,
                        "By standard mathematical convention, the principal branch of $\\arccos(x)$ has range $[0, \\pi]$."
                    ),
                    make_q(
                        "Evaluate $\\cos(\\arcsin(-\\frac{4}{5}))$.",
                        ["$\\frac{3}{5}$", "$-\\frac{3}{5}$", "$\\frac{4}{5}$", "$-\\frac{4}{5}$"], 0,
                        "$\\arcsin(-4/5)$ is in Quadrant IV where cosine is positive: $\\cos\\theta = \\sqrt{1 - (-4/5)^2} = \\frac{3}{5}$."
                    )
                ]
            },
            {
                "heading": "Section 4: Transformations of Non-Linear Functions",
                "questions": [
                    make_q(
                        "How is the graph of $y = 2f(-x) + 3$ obtained from $y = f(x)$?",
                        ["Reflect over $y$-axis, vertical stretch by $2$, shift up $3$", "Reflect over $x$-axis, vertical stretch by $2$, shift up $3$", "Reflect over $y$-axis, horizontal stretch by $2$, shift up $3$", "Reflect over origin, shift up $3$"], 0,
                        "$f(-x)$ reflects across the $y$-axis; multiplying by $2$ vertically stretches by $2$; adding $3$ shifts up by $3$."
                    ),
                    make_q(
                        "If the point $(2, 6)$ lies on $y = f(x)$, which point must lie on $y = f(2x) - 1$?",
                        ["$(1, 5)$", "$(4, 5)$", "$(1, 7)$", "$(4, 7)$"], 0,
                        "Horizontal compression by $2$: $x$-coordinate becomes $\\frac{2}{2} = 1$. Vertical shift down $1$: $y$-coordinate becomes $6 - 1 = 5$. The point is $(1, 5)$."
                    ),
                    make_q(
                        "Which transformation maps $y = x^3$ to $y = -(x - 1)^3 + 2$?",
                        ["Shift right $1$, reflect over $x$-axis, shift up $2$", "Shift left $1$, reflect over $x$-axis, shift up $2$", "Shift right $1$, reflect over $y$-axis, shift down $2$", "Shift left $1$, shift up $2$"], 0,
                        "$(x - 1)$ shifts right $1$; negation reflects across the $x$-axis; $+ 2$ shifts up $2$."
                    )
                ]
            }
        ]
    },

    # --------------------------------------------------------------------------
    # EST2L2 4.01: Matrices & Vectors
    # --------------------------------------------------------------------------
    {
        "track": "est2l2",
        "num": "4.01",
        "slug": "matrices-vectors",
        "title": "Matrices & Vectors",
        "sections": [
            {
                "heading": "Section 1: Matrix Inversion & Systems",
                "questions": [
                    make_q(
                        "What is the inverse of $A = [[4, 7], [1, 2]]$?",
                        ["$[[2, -7], [-1, 4]]$", "$[[-2, 7], [1, -4]]$", "$[[4, -7], [-1, 2]]$", "$[[2, 1], [7, 4]]$"], 0,
                        "$\\det(A) = 4(2) - 7(1) = 8 - 7 = 1$. Inverse is $\\frac{1}{1} [[d, -b], [-c, a]] = [[2, -7], [-1, 4]]$."
                    ),
                    make_q(
                        "For what value of $k$ does the matrix $[[2, k], [4, 6]]$ fail to be invertible?",
                        ["$3$", "$6$", "$12$", "$0$"], 0,
                        "Non-invertible when determinant is zero: $2(6) - 4k = 0 \\Rightarrow 12 = 4k \\Rightarrow k = 3$."
                    ),
                    make_q(
                        "If $AX = B$, where $A$ is invertible, which expression gives the solution column vector $X$?",
                        ["$A^{-1} B$", "$B A^{-1}$", "$B / A$", "$A B^{-1}$"], 0,
                        "Multiply on the left by $A^{-1}$: $A^{-1}AX = A^{-1}B \\Rightarrow X = A^{-1}B$."
                    )
                ]
            },
            {
                "heading": "Section 2: Determinants & Properties",
                "questions": [
                    make_q(
                        "If $A$ and $B$ are $3 \\times 3$ matrices with $\\det(A) = 4$ and $\\det(B) = -2$, what is $\\det(AB)$?",
                        ["$-8$", "$8$", "$-2$", "$2$"], 0,
                        "By the multiplicative property of determinants: $\\det(AB) = \\det(A) \\times \\det(B) = 4 \\times (-2) = -8$."
                    ),
                    make_q(
                        "If $M$ is a $2 \\times 2$ matrix with $\\det(M) = 6$, what is $\\det(M^{-1})$?",
                        ["$\\frac{1}{6}$", "$-6$", "$6$", "$36$"], 0,
                        "$\\det(M^{-1}) = \\frac{1}{\\det(M)} = \\frac{1}{6}$."
                    ),
                    make_q(
                        "What happens to the determinant of a matrix if two of its rows are interchanged?",
                        ["Its sign is reversed", "It doubles", "It remains unchanged", "It becomes zero"], 0,
                        "Interchanging any two rows of a square matrix multiplies its determinant by $-1$."
                    )
                ]
            },
            {
                "heading": "Section 3: Dot Product & Projections",
                "questions": [
                    make_q(
                        "Find the angle between $\\mathbf{u} = \\langle 2, 2 \\rangle$ and $\\mathbf{v} = \\langle 0, 3 \\rangle$.",
                        ["$45^\\circ$", "$30^\\circ$", "$60^\\circ$", "$90^\\circ$"], 0,
                        "$\\cos\\theta = \\frac{2(0) + 2(3)}{\\sqrt{8} \\times 3} = \\frac{6}{3\\sqrt{8}} = \\frac{2}{2\\sqrt{2}} = \\frac{1}{\\sqrt{2}} \\Rightarrow \\theta = 45^\\circ$."
                    ),
                    make_q(
                        "What is the vector projection of $\\mathbf{u} = \\langle 3, 4 \\rangle$ onto $\\mathbf{v} = \\langle 1, 0 \\rangle$?",
                        ["$\\langle 3, 0 \\rangle$", "$\\langle 4, 0 \\rangle$", "$\\langle 0, 4 \\rangle$", "$\\langle 1, 0 \\rangle$"], 0,
                        "$\\operatorname{proj}_{\\mathbf{v}} \\mathbf{u} = \\frac{\\mathbf{u} \\cdot \\mathbf{v}}{\\|\\mathbf{v}\\|^2} \\mathbf{v} = \\frac{3(1) + 4(0)}{1^2} \\langle 1, 0 \\rangle = 3 \\langle 1, 0 \\rangle = \\langle 3, 0 \\rangle$."
                    ),
                    make_q(
                        "If vectors $\\mathbf{a} = \\langle 2, x \\rangle$ and $\\mathbf{b} = \\langle 6, -4 \\rangle$ are perpendicular, what is $x$?",
                        ["$3$", "$-3$", "$4$", "$-4$"], 0,
                        "Dot product must be zero: $2(6) + x(-4) = 0 \\Rightarrow 12 - 4x = 0 \\Rightarrow x = 3$."
                    )
                ]
            },
            {
                "heading": "Section 4: 3D Vectors & Cross Products",
                "questions": [
                    make_q(
                        "Compute the cross product $\\langle 1, 0, 0 \\rangle \\times \\langle 0, 1, 0 \\rangle$.",
                        ["$\\langle 0, 0, 1 \\rangle$", "$\\langle 0, 0, -1 \\rangle$", "$\\langle 1, 1, 0 \\rangle$", "$\\mathbf{0}$"], 0,
                        "$\\mathbf{i} \\times \\mathbf{j} = \\mathbf{k} = \\langle 0, 0, 1 \\rangle$."
                    ),
                    make_q(
                        "What is the volume of the parallelepiped determined by vectors $\\mathbf{u} = \\langle 1, 0, 0 \\rangle$, $\\mathbf{v} = \\langle 0, 2, 0 \\rangle$, and $\\mathbf{w} = \\langle 0, 0, 3 \\rangle$?",
                        ["$6$", "$12$", "$3$", "$1$"], 0,
                        "Volume is absolute value of scalar triple product: $|\\mathbf{u} \\cdot (\\mathbf{v} \\times \\mathbf{w})| = |1(2 \\times 3)| = 6$."
                    ),
                    make_q(
                        "What is the unit vector in the direction of $\\mathbf{v} = \\langle 3, -6, 2 \\rangle$?",
                        ["$\\langle \\frac{3}{7}, -\\frac{6}{7}, \\frac{2}{7} \\rangle$", "$\\langle \\frac{3}{9}, -\\frac{6}{9}, \\frac{2}{9} \\rangle$", "$\\langle 1, -2, \\frac{2}{3} \\rangle$", "$\\langle \\frac{3}{49}, -\\frac{6}{49}, \\frac{2}{49} \\rangle$"], 0,
                        "Magnitude $\\|\\mathbf{v}\\| = \\sqrt{3^2 + (-6)^2 + 2^2} = \\sqrt{9 + 36 + 4} = \\sqrt{49} = 7$. Unit vector is $\\frac{\\mathbf{v}}{7}$."
                    )
                ]
            }
        ]
    },

    # --------------------------------------------------------------------------
    # EST2L2 5.01: Introductory Calculus
    # --------------------------------------------------------------------------
    {
        "track": "est2l2",
        "num": "5.01",
        "slug": "introductory-calculus",
        "title": "Introductory Calculus",
        "sections": [
            {
                "heading": "Section 1: Limits & Continuity",
                "questions": [
                    make_q(
                        "Evaluate $\\lim_{x \\to 2} \\frac{x^3 - 8}{x - 2}$.",
                        ["$12$", "$8$", "$4$", "Does not exist"], 0,
                        "Factor difference of cubes: $\\lim_{x \\to 2} \\frac{(x - 2)(x^2 + 2x + 4)}{x - 2} = \\lim_{x \\to 2} (x^2 + 2x + 4) = 4 + 4 + 4 = 12$."
                    ),
                    make_q(
                        "Evaluate $\\lim_{x \\to 0} \\frac{\\tan(3x)}{x}$.",
                        ["$3$", "$1$", "$\\frac{1}{3}$", "$0$"], 0,
                        "$\\lim_{x \\to 0} \\frac{\\sin(3x)}{x \\cos(3x)} = 3 \\lim_{x \\to 0} \\frac{\\sin(3x)}{3x} \\cdot \\frac{1}{\\cos(3x)} = 3(1)(1) = 3$."
                    ),
                    make_q(
                        "What value of $a$ makes $f(x) = \\frac{x^2 - 1}{x - 1}$ for $x \\neq 1$, and $f(1) = a$ continuous at $x = 1$?",
                        ["$2$", "$1$", "$0$", "$-1$"], 0,
                        "$\\lim_{x \\to 1} \\frac{(x - 1)(x + 1)}{x - 1} = \\lim_{x \\to 1} (x + 1) = 2$. For continuity, $f(1) = a = 2$."
                    )
                ]
            },
            {
                "heading": "Section 2: Derivatives & Power/Product Rules",
                "questions": [
                    make_q(
                        "Find the derivative of $f(x) = 4x^3 - 5x^2 + 7x - 9$.",
                        ["$12x^2 - 10x + 7$", "$12x^2 - 5x + 7$", "$4x^2 - 10x + 7$", "$12x^3 - 10x^2 + 7$"], 0,
                        "By power rule: $\\frac{d}{dx}(4x^3) = 12x^2$, $\\frac{d}{dx}(-5x^2) = -10x$, $\\frac{d}{dx}(7x) = 7$."
                    ),
                    make_q(
                        "What is the slope of the tangent line to $y = x^2 e^x$ at $x = 1$?",
                        ["$3e$", "$2e$", "$e$", "$4e$"], 0,
                        "Product rule: $y' = 2x e^x + x^2 e^x = e^x(2x + x^2)$. At $x = 1$: $y'(1) = e^1(2 + 1) = 3e$."
                    ),
                    make_q(
                        "What is the derivative of $g(x) = \\frac{2x + 1}{x - 3}$?",
                        ["$-\\frac{7}{(x - 3)^2}$", "$\\frac{7}{(x - 3)^2}$", "$\\frac{2}{(x - 3)^2}$", "$-\\frac{5}{(x - 3)^2}$"], 0,
                        "Quotient rule: $\\frac{2(x - 3) - (2x + 1)(1)}{(x - 3)^2} = \\frac{2x - 6 - 2x - 1}{(x - 3)^2} = -\\frac{7}{(x - 3)^2}$."
                    )
                ]
            },
            {
                "heading": "Section 3: Chain Rule & Extrema",
                "questions": [
                    make_q(
                        "Find the derivative of $h(x) = (3x^2 - 5)^4$.",
                        ["$24x(3x^2 - 5)^3$", "$4(3x^2 - 5)^3$", "$12x(3x^2 - 5)^3$", "$24(3x^2 - 5)^3$"], 0,
                        "Chain rule: $4(3x^2 - 5)^3 \\cdot \\frac{d}{dx}(3x^2 - 5) = 4(3x^2 - 5)^3 (6x) = 24x(3x^2 - 5)^3$."
                    ),
                    make_q(
                        "At what value of $x$ does $f(x) = 2x^3 - 9x^2 + 12x + 1$ have a local minimum?",
                        ["$x = 2$", "$x = 1$", "$x = 0$", "$x = 3$"], 0,
                        "$f'(x) = 6x^2 - 18x + 12 = 6(x^2 - 3x + 2) = 6(x - 1)(x - 2) = 0$. $f''(x) = 12x - 18$. At $x = 2$: $f''(2) = 6 > 0$ (local min)."
                    ),
                    make_q(
                        "What is the acceleration of a particle at $t = 2$ if its position is $s(t) = t^3 - 6t^2 + 5t$?",
                        ["$0$", "$5$", "$-7$", "$6$"], 0,
                        "Velocity $v(t) = s'(t) = 3t^2 - 12t + 5$. Acceleration $a(t) = v'(t) = 6t - 12$. At $t = 2$: $a(2) = 6(2) - 12 = 0$."
                    )
                ]
            },
            {
                "heading": "Section 4: Definite Integrals & Fundamental Theorem",
                "questions": [
                    make_q(
                        "Evaluate the definite integral: $\\int_0^3 (3x^2 - 2x + 1) dx$.",
                        ["$21$", "$18$", "$24$", "$27$"], 0,
                        "Antiderivative is $[x^3 - x^2 + x]_0^3 = (27 - 9 + 3) - 0 = 21$."
                    ),
                    make_q(
                        "What is the area of the region bounded by $y = 4 - x^2$ and the $x$-axis?",
                        ["$\\frac{32}{3}$", "$\\frac{16}{3}$", "$16$", "$8$"], 0,
                        "Roots are $x = \\pm 2$: $\\int_{-2}^2 (4 - x^2) dx = 2 \\int_0^2 (4 - x^2) dx = 2 [4x - \\frac{x^3}{3}]_0^2 = 2 [8 - \\frac{8}{3}] = 2 [\\frac{16}{3}] = \\frac{32}{3}$."
                    ),
                    make_q(
                        "If $\\int_1^4 f(x) dx = 7$, what is $\\int_1^4 [2f(x) + 3] dx$?",
                        ["$23$", "$17$", "$20$", "$26$"], 0,
                        "$2 \\int_1^4 f(x) dx + \\int_1^4 3 dx = 2(7) + 3(4 - 1) = 14 + 9 = 23$."
                    )
                ]
            }
        ]
    },

    # --------------------------------------------------------------------------
    # EST2L2 6.01: Probability
    # --------------------------------------------------------------------------
    {
        "track": "est2l2",
        "num": "6.01",
        "slug": "probability",
        "title": "Probability",
        "sections": [
            {
                "heading": "Section 1: Discrete Random Variables & Variance",
                "questions": [
                    make_q(
                        "A discrete random variable $X$ has distribution: $P(X = 0) = 0.1, P(X = 1) = 0.4, P(X = 2) = 0.5$. What is $E(X)$?",
                        ["$1.4$", "$1.0$", "$1.5$", "$1.2$"], 0,
                        "$E(X) = 0(0.1) + 1(0.4) + 2(0.5) = 0.4 + 1.0 = 1.4$."
                    ),
                    make_q(
                        "For the above variable $X$, what is the variance $\\operatorname{Var}(X)$?",
                        ["$0.44$", "$0.50$", "$0.64$", "$0.84$"], 0,
                        "$E(X^2) = 0^2(0.1) + 1^2(0.4) + 2^2(0.5) = 0.4 + 2.0 = 2.4$. $\\operatorname{Var}(X) = 2.4 - (1.4)^2 = 2.4 - 1.96 = 0.44$."
                    ),
                    make_q(
                        "If $X$ is a binomial random variable with parameters $n = 100$ and $p = 0.2$, what is the standard deviation $\\sigma$?",
                        ["$4$", "$16$", "$20$", "$2$"], 0,
                        "$\\sigma = \\sqrt{n p (1 - p)} = \\sqrt{100(0.2)(0.8)} = \\sqrt{16} = 4$."
                    )
                ]
            },
            {
                "heading": "Section 2: Continuous Distributions & Probabilities",
                "questions": [
                    make_q(
                        "A continuous random variable $X$ is uniformly distributed over the interval $[2, 10]$. What is $P(4 \\leq X \\leq 7)$?",
                        ["$\\frac{3}{8}$", "$\\frac{1}{2}$", "$\\frac{5}{8}$", "$\\frac{1}{4}$"], 0,
                        "Probability density $f(x) = \\frac{1}{10 - 2} = \\frac{1}{8}$. $P(4 \\leq X \\leq 7) = \\frac{7 - 4}{8} = \\frac{3}{8}$."
                    ),
                    make_q(
                        "What is the expected value of a uniform random variable on $[a, b]$?",
                        ["$\\frac{a + b}{2}$", "$\\frac{b - a}{2}$", "$\\frac{a + b}{12}$", "$ab$"], 0,
                        "The center of mass of a uniform distribution is its midpoint: $\\frac{a + b}{2}$."
                    ),
                    make_q(
                        "In any continuous probability distribution, what is $P(X = c)$ for any single exact point $c$?",
                        ["$0$", "$1$", "$\\frac{1}{2}$", "Undefined"], 0,
                        "For any continuous distribution, the probability of taking any single exact real value is $0$ because the area of a single line is zero."
                    )
                ]
            },
            {
                "heading": "Section 3: Conditional Probability & Joint Events",
                "questions": [
                    make_q(
                        "If $P(A) = 0.5$ and $P(B) = 0.4$, and $A$ and $B$ are mutually exclusive, what is $P(A \\cap B)$?",
                        ["$0$", "$0.20$", "$0.90$", "$0.10$"], 0,
                        "Mutually exclusive events cannot occur simultaneously, so their intersection has probability $0$."
                    ),
                    make_q(
                        "Given $P(A) = 0.6, P(B) = 0.3,$ and $P(A \\cup B) = 0.7$, are events $A$ and $B$ independent?",
                        ["No, because $P(A \\cap B) = 0.20 \\neq 0.18$", "Yes, because $P(A \\cap B) = 0.18$", "Yes, because they are mutually exclusive", "Cannot be determined"], 0,
                        "$P(A \\cap B) = P(A) + P(B) - P(A \\cup B) = 0.6 + 0.3 - 0.7 = 0.20$. For independence, $P(A)P(B) = 0.6 \\times 0.3 = 0.18$. Since $0.20 \\neq 0.18$, they are not independent."
                    ),
                    make_q(
                        "What is Bayes' formula for $P(A \\mid B)$?",
                        ["$\\frac{P(B \\mid A) P(A)}{P(B)}$", "$\\frac{P(A \\mid B) P(B)}{P(A)}$", "$\\frac{P(A) P(B)}{P(A \\cap B)}$", "$P(A) + P(B)$"], 0,
                        "Bayes' theorem expresses conditional probability as $P(A \\mid B) = \\frac{P(B \\mid A) P(A)}{P(B)}$."
                    )
                ]
            },
            {
                "heading": "Section 4: Combinatorial Probability & Geometric Probability",
                "questions": [
                    make_q(
                        "A point is chosen at random inside a square of side $10$. What is the probability that it falls inside the inscribed circle?",
                        ["$\\frac{\\pi}{4}$", "$\\frac{\\pi}{2}$", "$\\frac{\\pi}{8}$", "$\\frac{1}{2}$"], 0,
                        "Area of square $= 10^2 = 100$. Inscribed circle radius $= 5$, Area $= \\pi(5^2) = 25\\pi$. Probability $= \\frac{25\\pi}{100} = \\frac{\\pi}{4} \\approx 0.785$."
                    ),
                    make_q(
                        "From a standard deck of $52$ cards, what is the probability of being dealt a $5$-card hand containing all $4$ aces?",
                        ["$\\frac{48}{\\binom{52}{5}}$", "$\\frac{4}{\\binom{52}{5}}$", "$\\frac{1}{\\binom{52}{5}}$", "$\\frac{48}{52}$"], 0,
                        "There is $\\binom{4}{4} = 1$ way to select all 4 aces, and $\\binom{48}{1} = 48$ ways to select the 5th card: $\\frac{48}{\\binom{52}{5}}$."
                    ),
                    make_q(
                        "Two real numbers $x$ and $y$ are chosen independently from $[0, 1]$. What is the probability that $x + y \\leq 1$?",
                        ["$\\frac{1}{2}$", "$\\frac{1}{4}$", "$\\frac{3}{4}$", "$\\frac{1}{3}$"], 0,
                        "The total sample space is a unit square of area $1$. The region $x + y \\leq 1$ is a right triangle with vertices $(0, 0), (1, 0),$ and $(0, 1)$, having area $\\frac{1}{2}(1)(1) = \\frac{1}{2}$."
                    )
                ]
            }
        ]
    }
]
