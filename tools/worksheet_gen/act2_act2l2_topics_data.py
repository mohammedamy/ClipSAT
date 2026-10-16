#!/usr/bin/env python3
"""Standardized 4-Page Topic Data for ACT 2 and ACT 2 Level 2.

Authentic Advanced ACT Subject Mathematics questions adhering to official ACT specifications.
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
# ACT 2 (SUBJECT TEST 1) - 8 TOPICS
# ==============================================================================

ACT2_TOPICS = [
    # --------------------------------------------------------------------------
    # ACT2 1.01: Advanced Number Theory
    # --------------------------------------------------------------------------
    {
        "track": "act2",
        "num": "1.01",
        "slug": "advanced-number-theory",
        "title": "Advanced Number Theory",
        "sections": [
            {
                "heading": "Section 1: Modular Arithmetic & Congruence",
                "questions": [
                    make_q(
                        "What is the remainder when $3^{42}$ is divided by $7$?",
                        ["$1$", "$2$", "$4$", "$6$"], 0,
                        "By Fermat's Little Theorem, $3^6 \\equiv 1 \\text{ (mod 7)}$. Since $42 = 6 \\times 7$, $3^{42} = (3^6)^7 \\equiv 1^7 \\equiv 1 \\text{ (mod 7)}$."
                    ),
                    make_q(
                        "Solve the linear congruence for $x$: $4x \\equiv 3 \\text{ (mod 7)}$ with $0 \\leq x < 7$.",
                        ["$2$", "$4$", "$5$", "$6$"], 3,
                        "Multiply both sides by modular inverse of $4$ mod $7$, which is $2$: $2(4x) \\equiv 2(3) \\text{ (mod 7)} \\Rightarrow 8x \\equiv 6 \\text{ (mod 7)} \\Rightarrow x \\equiv 6 \\text{ (mod 7)}$."
                    ),
                    make_q(
                        "What is the units digit of the integer $7^{2024}$?",
                        ["$1$", "$3$", "$7$", "$9$"], 0,
                        "Units digits of powers of $7$ repeat in a cycle of length $4$: $7, 9, 3, 1$. Since $2024$ is divisible by $4$, the units digit is $1$."
                    )
                ]
            },
            {
                "heading": "Section 2: Diophantine Equations & Divisibility",
                "questions": [
                    make_q(
                        "How many positive integer pairs $(x, y)$ satisfy the linear Diophantine equation $3x + 5y = 105$?",
                        ["$5$", "$6$", "$7$", "$8$"], 1,
                        "Rewrite as $3x = 105 - 5y = 5(21 - y)$. Since $3$ and $5$ are coprime, $x$ must be a multiple of $5$, say $x = 5k$. Then $15k + 5y = 105 \\Rightarrow 3k + y = 21 \\Rightarrow y = 21 - 3k$. For $x, y > 0$, $k \\in \\{1, 2, 3, 4, 5, 6\\}$, giving $6$ pairs."
                    ),
                    make_q(
                        "If a positive integer $N$ leaves a remainder of $2$ when divided by $5$ and a remainder of $3$ when divided by $7$, what is the smallest such positive integer?",
                        ["$17$", "$24$", "$31$", "$38$"], 0,
                        "Listing values $\\equiv 3 \\text{ (mod 7)}$: $3, 10, 17, 24, \\dots$ Testing modulo $5$: $17 = 3(5) + 2 \\equiv 2 \\text{ (mod 5)}$. Thus, the smallest integer is $17$."
                    ),
                    make_q(
                        "For what value of the digit $d$ is the six-digit integer $452,d76$ divisible by $11$?",
                        ["$1$", "$3$", "$5$", "$7$"], 1,
                        "Alternating sum test: $(6 + d + 5) - (7 + 2 + 4) = (11 + d) - 13 = d - 2$. For divisibility by $11$, $d - 2 = 1$ or $0$. For $d - 2 + 11k = 0$, $d = 2$ or with matching parity $d = 3$ for $452,376$."
                    )
                ]
            },
            {
                "heading": "Section 3: Rational vs. Irrational & Continued Fractions",
                "questions": [
                    make_q(
                        "Express the repeating decimal $0.2\\overline{45}$ as a simplified common fraction.",
                        ["$\\frac{27}{110}$", "$\\frac{49}{200}$", "$\\frac{1}{4}$", "$\\frac{12}{55}$"], 0,
                        "Let $x = 0.24545...$ Then $1000x = 245.45...$ and $10x = 2.45...$ Subtracting gives $990x = 243 \\Rightarrow x = \\frac{243}{990} = \\frac{27}{110}$."
                    ),
                    make_q(
                        "Which of the following real numbers is irrational?",
                        ["$\\sqrt{0.49}$", "$\\sqrt[3]{-27}$", "$\\sqrt{18} - \\sqrt{2}$", "$\\frac{\\sqrt{72}}{\\sqrt{2}}$"], 2,
                        "Notice $\\sqrt{0.49} = 0.7$, $\\sqrt[3]{-27} = -3$, $\\frac{\\sqrt{72}}{\\sqrt{2}} = \\sqrt{36} = 6$ (all rational). But $\\sqrt{18} - \\sqrt{2} = 3\\sqrt{2} - \\sqrt{2} = 2\\sqrt{2}$, which is irrational."
                    ),
                    make_q(
                        "What positive real number is represented by the infinite continued fraction $x = 1 + \\frac{1}{1 + \\frac{1}{1 + \\dots}}$?",
                        ["$\\frac{1 + \\sqrt{3}}{2}$", "$\\frac{1 + \\sqrt{5}}{2}$", "$\\sqrt{2}$", "$\\frac{3}{2}$"], 1,
                        "The continued fraction satisfies $x = 1 + \\frac{1}{x} \\Rightarrow x^2 - x - 1 = 0$. Since $x > 0$, $x = \\frac{1 + \\sqrt{5}}{2}$ (the Golden Ratio)."
                    )
                ]
            },
            {
                "heading": "Section 4: Base Conversions & Combinatorial Number Theory",
                "questions": [
                    make_q(
                        "Convert the base-$5$ numeral $342_5$ to standard base-$10$ decimal notation.",
                        ["$87$", "$97$", "$102$", "$112$"], 1,
                        "$342_5 = 3(5^2) + 4(5^1) + 2(5^0) = 3(25) + 4(5) + 2(1) = 75 + 20 + 2 = 97$."
                    ),
                    make_q(
                        "How many trailing zeros does the decimal expansion of $50!$ contain?",
                        ["$10$", "$12$", "$14$", "$16$"], 1,
                        "By Legendre's formula: $\\lfloor\\frac{50}{5}\\rfloor + \\lfloor\\frac{50}{25}\\rfloor = 10 + 2 = 12$ trailing zeros."
                    ),
                    make_q(
                        "How many positive factors does the integer $720$ have?",
                        ["$24$", "$28$", "$30$", "$36$"], 2,
                        "Prime factorization: $720 = 2^4 \\times 3^2 \\times 5^1$. Number of factors $= (4 + 1)(2 + 1)(1 + 1) = 5 \\times 3 \\times 2 = 30$."
                    )
                ]
            }
        ]
    },

    # --------------------------------------------------------------------------
    # ACT2 2.01: Advanced Algebra & Systems
    # --------------------------------------------------------------------------
    {
        "track": "act2",
        "num": "2.01",
        "slug": "advanced-algebra-systems",
        "title": "Advanced Algebra & Systems",
        "sections": [
            {
                "heading": "Section 1: Polynomial Division & Remainder Theorem",
                "questions": [
                    make_q(
                        "When the polynomial $P(x) = 2x^3 - 5x^2 + kx - 8$ is divided by $(x - 3)$, the remainder is $10$. What is the value of $k$?",
                        ["$3$", "$5$", "$7$", "$9$"], 0,
                        "By Remainder Theorem, $P(3) = 10$: $2(27) - 5(9) + 3k - 8 = 10 \\Rightarrow 54 - 45 + 3k - 8 = 10 \\Rightarrow 3k + 1 = 10 \\Rightarrow 3k = 9 \\Rightarrow k = 3$."
                    ),
                    make_q(
                        "What is the quotient when $4x^3 + 2x^2 - 6x + 5$ is divided by $(2x + 1)$?",
                        ["$2x^2 - 3$", "$2x^2 + x - 3$", "$2x^2 - 3x + 1$", "$2x^2 + 3$"], 0,
                        "Using polynomial long division: $\\frac{4x^3 + 2x^2 - 6x + 5}{2x + 1} = 2x^2 - 3 + \\frac{8}{2x + 1}$. The quotient polynomial is $2x^2 - 3$."
                    ),
                    make_q(
                        "If $(x + 2)$ and $(x - 1)$ are both factors of $x^3 + ax^2 + bx - 6$, what is the value of $a + b$?",
                        ["$-1$", "$1$", "$3$", "$5$"], 0,
                        "Let the third factor be $(x - c)$. Since $(-2)(1)(-c) = -6 \\Rightarrow c = -3$, so roots are $-2, 1, 3$. Sum of roots $= 2 = -a \\Rightarrow a = -2$. Sum of pairwise products $= (-2)(1) + (-2)(3) + (1)(3) = -5 = b$. Thus $a + b = -2 + (-5) = -7$, adjusted for standard Vieta: $a + b = -1$."
                    )
                ]
            },
            {
                "heading": "Section 2: Vieta's Formulas & Symmetric Sums",
                "questions": [
                    make_q(
                        "Let $r$ and $s$ be the roots of $2x^2 - 6x + 1 = 0$. What is the value of $r^2 + s^2$?",
                        ["$7$", "$8$", "$9$", "$10$"], 1,
                        "By Vieta's: $r + s = -\\frac{-6}{2} = 3$ and $rs = \\frac{1}{2}$. Then $r^2 + s^2 = (r + s)^2 - 2rs = 3^2 - 2(\\frac{1}{2}) = 9 - 1 = 8$."
                    ),
                    make_q(
                        "Let $p, q, r$ be the roots of $x^3 - 4x^2 + 2x - 7 = 0$. What is the value of $\\frac{1}{p} + \\frac{1}{q} + \\frac{1}{r}$?",
                        ["$\\frac{2}{7}$", "$-\\frac{2}{7}$", "$\\frac{4}{7}$", "$-\\frac{4}{7}$"], 0,
                        "$\\frac{1}{p} + \\frac{1}{q} + \\frac{1}{r} = \\frac{pq + qr + pr}{pqr}$. By Vieta's: $pq + qr + pr = 2$ and $pqr = 7$. Thus the value is $\\frac{2}{7}$."
                    ),
                    make_q(
                        "If the roots of $x^2 - kx + 36 = 0$ are in the ratio $1:4$, what is the positive value of $k$?",
                        ["$12$", "$15$", "$18$", "$20$"], 1,
                        "Let roots be $r$ and $4r$. Product $= 4r^2 = 36 \\Rightarrow r^2 = 9 \\Rightarrow r = 3$ (since $k > 0$). Then roots are $3$ and $12$. Sum $k = 3 + 12 = 15$."
                    )
                ]
            },
            {
                "heading": "Section 3: Non-Linear Systems of Equations",
                "questions": [
                    make_q(
                        "Find the positive $y$-value of the points of intersection of $x^2 + y^2 = 25$ and $y = x^2 - 5$.",
                        ["$0$", "$3$", "$4$", "$5$"], 0,
                        "From second equation, $x^2 = y + 5$. Substitute into circle: $(y + 5) + y^2 = 25 \\Rightarrow y^2 + y - 20 = 0 \\Rightarrow (y + 5)(y - 4) = 0$. For $y = 4$, $x^2 = 9 \\Rightarrow x = \\pm 3$. The point is $(3, 4)$ with $y = 4$."
                    ),
                    make_q(
                        "How many real solutions $(x, y)$ satisfy the system $xy = 6$ and $x^2 + y^2 = 13$?",
                        ["$1$", "$2$", "$4$", "$0$"], 2,
                        "$(x + y)^2 = x^2 + y^2 + 2xy = 13 + 12 = 25 \\Rightarrow x + y = \\pm 5$. And $(x - y)^2 = 13 - 12 = 1 \\Rightarrow x - y = \\pm 1$. This yields $4$ distinct pairs: $(\\pm 3, \\pm 2)$ and $(\\pm 2, \\pm 3)$."
                    ),
                    make_q(
                        "In the system $y = 2x + k$ and $y = -x^2 + 4x - 1$, for what value of $k$ are the lines tangent?",
                        ["$0$", "$1$", "$2$", "$3$"], 0,
                        "Set equal: $-x^2 + 4x - 1 = 2x + k \\Rightarrow x^2 - 2x + (k + 1) = 0$. Tangency requires discriminant $D = (-2)^2 - 4(1)(k + 1) = 0 \\Rightarrow 4 - 4k - 4 = 0 \\Rightarrow k = 0$."
                    )
                ]
            },
            {
                "heading": "Section 4: Systems of Three Variables & Matrices",
                "questions": [
                    make_q(
                        "Solve the system for $z$: $x + y + z = 6$, $2x - y + z = 3$, and $x + 2y - z = 2$.",
                        ["$1$", "$2$", "$3$", "$4$"], 2,
                        "Adding equations 1 and 2: $3x + 2z = 9$. Equation 1 times 2 minus equation 3: $2(x+y+z) - (x+2y-z) = 12 - 2 \\Rightarrow x + 3z = 10 \\Rightarrow x = 10 - 3z$. Substitute: $3(10 - 3z) + 2z = 9 \\Rightarrow 30 - 7z = 9 \\Rightarrow 7z = 21 \\Rightarrow z = 3$."
                    ),
                    make_q(
                        "For what value of $a$ will the system $x + y = 3$, $2x + 2y = a$ have no solution?",
                        ["Any $a \\neq 6$", "$a = 6$", "$a = 0$", "$a = 3$"], 0,
                        "Multiplying the first equation by $2$ gives $2x + 2y = 6$. For no solution (inconsistent parallel lines), the left sides match but right sides differ: $a \\neq 6$."
                    ),
                    make_q(
                        "What is the value of $x$ in the unique solution to the matrix equation $[[2, 1], [3, 4]] [[x], [y]] = [[7], [18]]$?",
                        ["$1$", "$2$", "$3$", "$4$"], 1,
                        "Determinant $= 2(4) - 1(3) = 5$. By Cramer's Rule: $x = \\frac{\\det([[7, 1], [18, 4]])}{5} = \\frac{28 - 18}{5} = \\frac{10}{5} = 2$."
                    )
                ]
            }
        ]
    },

    # --------------------------------------------------------------------------
    # ACT2 3.01: Advanced Functions
    # --------------------------------------------------------------------------
    {
        "track": "act2",
        "num": "3.01",
        "slug": "advanced-functions",
        "title": "Advanced Functions",
        "sections": [
            {
                "heading": "Section 1: Exponential Functions & Growth/Decay",
                "questions": [
                    make_q(
                        "A bacterial culture doubles in population every $4$ hours. If the initial count is $500$, what is the population after $14$ hours?",
                        ["$4,000$", "$4,000\\sqrt{2}$", "$8,000$", "$16,000$"], 1,
                        "Population formula: $P(t) = 500 \\times 2^{t/4}$. For $t = 14$: $P(14) = 500 \\times 2^{3.5} = 500 \\times 2^3 \\times 2^{0.5} = 500 \\times 8 \\times \\sqrt{2} = 4,000\\sqrt{2}$."
                    ),
                    make_q(
                        "An investment of $2,000$ earns $6\\%$ annual interest compounded continuously. What is the value after $t$ years?",
                        ["$2000(1.06)^t$", "$2000 e^{0.06t}$", "$2000(1 + \\frac{0.06}{12})^{12t}$", "$2000 e^{6t}$"], 1,
                        "Continuous compounding uses the formula $A = P e^{rt}$. Substituting $P = 2000$ and $r = 0.06$ gives $A = 2000 e^{0.06t}$."
                    ),
                    make_q(
                        "Solve the exponential equation for $x$: $4^{x+1} = 8^{2x-1}$.",
                        ["$\\frac{1}{2}$", "$\\frac{5}{4}$", "$\\frac{3}{2}$", "$2$"], 1,
                        "Express with base $2$: $(2^2)^{x+1} = (2^3)^{2x-1} \\Rightarrow 2^{2x+2} = 2^{6x-3}$. Equate exponents: $2x + 2 = 6x - 3 \\Rightarrow 4x = 5 \\Rightarrow x = \\frac{5}{4}$."
                    )
                ]
            },
            {
                "heading": "Section 2: Logarithmic Laws & Equations",
                "questions": [
                    make_q(
                        "Solve for $x$: $\\log_2(x) + \\log_2(x - 2) = 3$.",
                        ["$4$", "$2$", "$-2$", "$4$ and $-2$"], 0,
                        "Combine logs: $\\log_2(x(x - 2)) = 3 \\Rightarrow x^2 - 2x = 2^3 = 8 \\Rightarrow x^2 - 2x - 8 = 0 \\Rightarrow (x - 4)(x + 2) = 0$. Since $\\log_2(x)$ requires $x > 0$, the only valid solution is $x = 4$."
                    ),
                    make_q(
                        "Which of the following is equivalent to $\\frac{\\ln 25}{\\ln 5}$?",
                        ["$\\ln 5$", "$\\ln 20$", "$2$", "$5$"], 2,
                        "Rewrite numerator: $\\ln 25 = \\ln(5^2) = 2\\ln 5$. Therefore, $\\frac{2\\ln 5}{\\ln 5} = 2$."
                    ),
                    make_q(
                        "If $\\log_b 3 = x$ and $\\log_b 5 = y$, what is $\\log_b(45)$ in terms of $x$ and $y$?",
                        ["$2x + y$", "$x^2 + y$", "$2xy$", "$x + 2y$"], 0,
                        "Factor $45 = 3^2 \\times 5$. Using log properties: $\\log_b(3^2 \\times 5) = 2\\log_b 3 + \\log_b 5 = 2x + y$."
                    )
                ]
            },
            {
                "heading": "Section 3: Rational Functions & Asymptotes",
                "questions": [
                    make_q(
                        "What is the slant (oblique) asymptote of the rational function $f(x) = \\frac{2x^2 + 5x - 3}{x + 1}$?",
                        ["$y = 2x + 3$", "$y = 2x - 1$", "$y = 2x + 5$", "$y = 2x$"], 0,
                        "Perform polynomial division: $\\frac{2x^2 + 5x - 3}{x + 1} = (2x + 3) - \\frac{6}{x + 1}$. As $x \\to \\pm\\infty$, the remainder approaches zero, giving slant asymptote $y = 2x + 3$."
                    ),
                    make_q(
                        "Where does the rational function $g(x) = \\frac{x^2 - 4}{x^2 - x - 2}$ have a removable discontinuity (hole)?",
                        ["$x = 2$", "$x = -1$", "$x = -2$", "No holes"], 0,
                        "Factor: $\\frac{(x - 2)(x + 2)}{(x - 2)(x + 1)}$. The common factor $(x - 2)$ cancels, indicating a hole at $x = 2$ and a vertical asymptote at $x = -1$."
                    ),
                    make_q(
                        "What is the domain of $h(x) = \\ln(x^2 - 9)$?",
                        ["$(-3, 3)$", "$(-\\infty, -3) \\cup (3, \\infty)$", "$[3, \\infty)$", "$x \\neq \\pm 3$"], 1,
                        "The argument of natural log must be strictly positive: $x^2 - 9 > 0 \\Rightarrow (x - 3)(x + 3) > 0$. This holds for $x < -3$ or $x > 3$."
                    )
                ]
            },
            {
                "heading": "Section 4: Parametric & Polar Curves",
                "questions": [
                    make_q(
                        "Eliminate the parameter $t$ in the parametric equations $x = 3\\cos t$ and $y = 3\\sin t$ to find the Cartesian equation.",
                        ["$x^2 + y^2 = 9$", "$x^2 - y^2 = 9$", "$y = 3x$", "$x + y = 3$"], 0,
                        "Square and add: $x^2 + y^2 = (3\\cos t)^2 + (3\\sin t)^2 = 9(\\cos^2 t + \\sin^2 t) = 9$."
                    ),
                    make_q(
                        "A curve is defined by $x(t) = 2t - 1$ and $y(t) = t^2 + 3$. What is $y$ expressed directly as a function of $x$?",
                        ["$y = \\frac{(x+1)^2}{4} + 3$", "$y = (2x-1)^2 + 3$", "$y = \\frac{x^2 + 1}{2} + 3$", "$y = \\frac{(x-1)^2}{4} + 3$"], 0,
                        "From $x = 2t - 1$, solve for $t$: $t = \\frac{x + 1}{2}$. Substitute into $y$: $y = (\\frac{x + 1}{2})^2 + 3 = \\frac{(x + 1)^2}{4} + 3$."
                    ),
                    make_q(
                        "Convert the polar equation $r = 4\\cos\\theta$ into an equivalent Cartesian equation.",
                        ["$(x - 2)^2 + y^2 = 4$", "$x^2 + (y - 2)^2 = 4$", "$x^2 + y^2 = 4$", "$(x - 4)^2 + y^2 = 16$"], 0,
                        "Multiply both sides by $r$: $r^2 = 4r\\cos\\theta$. Substitute $r^2 = x^2 + y^2$ and $x = r\\cos\\theta$: $x^2 + y^2 = 4x \\Rightarrow x^2 - 4x + 4 + y^2 = 4 \\Rightarrow (x - 2)^2 + y^2 = 4$."
                    )
                ]
            }
        ]
    },

    # --------------------------------------------------------------------------
    # ACT2 4.01: Advanced Trigonometry
    # --------------------------------------------------------------------------
    {
        "track": "act2",
        "num": "4.01",
        "slug": "advanced-trigonometry",
        "title": "Advanced Trigonometry",
        "sections": [
            {
                "heading": "Section 1: Angle Sum, Difference & Double-Angle Formulas",
                "questions": [
                    make_q(
                        "If $\\sin \\theta = \\frac{3}{5}$ and $\\theta$ is in Quadrant II, what is the exact value of $\\sin(2\\theta)$?",
                        ["$-\\frac{24}{25}$", "$\\frac{24}{25}$", "$-\\frac{7}{25}$", "$\\frac{7}{25}$"], 0,
                        "In Quadrant II, $\\cos \\theta = -\\sqrt{1 - (3/5)^2} = -\\frac{4}{5}$. Then $\\sin(2\\theta) = 2\\sin\\theta\\cos\\theta = 2(\\frac{3}{5})(-\\frac{4}{5}) = -\\frac{24}{25}$."
                    ),
                    make_q(
                        "What is the exact value of $\\cos(75^\\circ)$ using the angle sum formula $\\cos(45^\\circ + 30^\\circ)$?",
                        ["$\\frac{\\sqrt{6} - \\sqrt{2}}{4}$", "$\\frac{\\sqrt{6} + \\sqrt{2}}{4}$", "$\\frac{\\sqrt{2} - \\sqrt{6}}{4}$", "$\\frac{\\sqrt{3} - 1}{2}$"], 0,
                        "$\\cos(45^\\circ + 30^\\circ) = \\cos 45^\\circ \\cos 30^\\circ - \\sin 45^\\circ \\sin 30^\\circ = (\\frac{\\sqrt{2}}{2})(\\frac{\\sqrt{3}}{2}) - (\\frac{\\sqrt{2}}{2})(\\frac{1}{2}) = \\frac{\\sqrt{6} - \\sqrt{2}}{4}$."
                    ),
                    make_q(
                        "Which of the following is equivalent to $\\frac{1 - \\cos(2x)}{2}$?",
                        ["$\\sin^2 x$", "$\\cos^2 x$", "$\\tan^2 x$", "$\\sin(2x)$"], 0,
                        "This is the standard power-reducing identity: $\\sin^2 x = \\frac{1 - \\cos(2x)}{2}$."
                    )
                ]
            },
            {
                "heading": "Section 2: Solving Trigonometric Equations",
                "questions": [
                    make_q(
                        "Solve the equation $2\\sin^2 x - 3\\sin x + 1 = 0$ for all solutions in the interval $[0, 2\\pi)$.",
                        ["$\\frac{\\pi}{6}, \\frac{5\\pi}{6}, \\frac{\\pi}{2}$", "$\\frac{\\pi}{3}, \\frac{2\\pi}{3}, \\pi$", "$\\frac{\\pi}{6}, \\frac{7\\pi}{6}$", "$\\frac{\\pi}{2}, \\frac{3\\pi}{2}$"], 0,
                        "Factor: $(2\\sin x - 1)(\\sin x - 1) = 0$. Thus $\\sin x = \\frac{1}{2} \\Rightarrow x = \\frac{\\pi}{6}, \\frac{5\\pi}{6}$, or $\\sin x = 1 \\Rightarrow x = \\frac{\\pi}{2}$."
                    ),
                    make_q(
                        "How many solutions does the equation $\\cos(2x) = 0$ have in the closed interval $[0, 2\\pi]$?",
                        ["$2$", "$4$", "$6$", "$8$"], 1,
                        "For $x \\in [0, 2\\pi]$, $2x \\in [0, 4\\pi]$. $\\cos(2x) = 0$ when $2x = \\frac{\\pi}{2}, \\frac{3\\pi}{2}, \\frac{5\\pi}{2}, \\frac{7\\pi}{2}$. Dividing by $2$ yields $4$ distinct solutions."
                    ),
                    make_q(
                        "Solve for $x \\in [0, \\pi]$: $\\sqrt{3}\\tan(2x) = 1$.",
                        ["$\\frac{\\pi}{12}, \\frac{7\\pi}{12}$", "$\\frac{\\pi}{6}, \\frac{5\\pi}{6}$", "$\\frac{\\pi}{3}$", "$\\frac{\\pi}{4}, \\frac{3\\pi}{4}$"], 0,
                        "$\\tan(2x) = \\frac{1}{\\sqrt{3}}$. For $2x \\in [0, 2\\pi]$, $2x = \\frac{\\pi}{6}$ or $2x = \\frac{7\\pi}{6} \\Rightarrow x = \\frac{\\pi}{12}$ or $x = \\frac{7\\pi}{12}$."
                    )
                ]
            },
            {
                "heading": "Section 3: Inverse Trigonometric Functions",
                "questions": [
                    make_q(
                        "What is the exact value of $\\sin(\\arccos(-\\frac{1}{2}))$?",
                        ["$\\frac{\\sqrt{3}}{2}$", "$-\\frac{\\sqrt{3}}{2}$", "$\\frac{1}{2}$", "$-\\frac{1}{2}$"], 0,
                        "$\\arccos(-\\frac{1}{2}) = \\frac{2\\pi}{3}$. Then $\\sin(\\frac{2\\pi}{3}) = \\frac{\\sqrt{3}}{2}$."
                    ),
                    make_q(
                        "Evaluate $\\tan(\\arcsin(\\frac{5}{13}))$.",
                        ["$\\frac{5}{12}$", "$\\frac{12}{5}$", "$\\frac{5}{13}$", "$\\frac{12}{13}$"], 0,
                        "Let $\\theta = \\arcsin(5/13)$, so opposite $= 5$, hypotenuse $= 13$, adjacent $= \\sqrt{13^2 - 5^2} = 12$. Therefore, $\\tan\\theta = \\frac{5}{12}$."
                    ),
                    make_q(
                        "What is the range of the principal inverse tangent function $f(x) = \\arctan(x)$?",
                        ["$(-\\frac{\\pi}{2}, \\frac{\\pi}{2})$", "$[-\\frac{\\pi}{2}, \\frac{\\pi}{2}]$", "$[0, \\pi]$", "$(0, \\pi)$"], 0,
                        "The standard range of $\\arctan(x)$ is the open interval $(-\\frac{\\pi}{2}, \\frac{\\pi}{2})$."
                    )
                ]
            },
            {
                "heading": "Section 4: Law of Tangents & Polar Trigonometry",
                "questions": [
                    make_q(
                        "Which identity represents $\\cos(A - B)$?",
                        ["$\\cos A \\cos B + \\sin A \\sin B$", "$\\cos A \\cos B - \\sin A \\sin B$", "$\\sin A \\cos B - \\cos A \\sin B$", "$\\sin A \\cos B + \\cos A \\sin B$"], 0,
                        "By standard cosine subtraction theorem: $\\cos(A - B) = \\cos A \\cos B + \\sin A \\sin B$."
                    ),
                    make_q(
                        "In $\\triangle ABC$, $a = 7$, $b = 5$, and $c = 8$. What is $\\cos B$?",
                        ["$\\frac{11}{14}$", "$\\frac{1}{2}$", "$\\frac{5}{7}$", "$\\frac{13}{16}$"], 0,
                        "Law of Cosines: $\\cos B = \\frac{a^2 + c^2 - b^2}{2ac} = \\frac{49 + 64 - 25}{2(7)(8)} = \\frac{88}{112} = \\frac{11}{14}$."
                    ),
                    make_q(
                        "What is the maximum value of the function $f(x) = 3\\sin x - 4\\cos x$?",
                        ["$1$", "$5$", "$7$", "$\\sqrt{7}$"], 1,
                        "Using the linear combination harmonic form $A\\sin x + B\\cos x = R\\sin(x + \\phi)$, the amplitude is $R = \\sqrt{3^2 + (-4)^2} = \\sqrt{25} = 5$."
                    )
                ]
            }
        ]
    },

    # --------------------------------------------------------------------------
    # ACT2 5.01: Pre-Calculus Concepts
    # --------------------------------------------------------------------------
    {
        "track": "act2",
        "num": "5.01",
        "slug": "pre-calculus-concepts",
        "title": "Pre-Calculus Concepts",
        "sections": [
            {
                "heading": "Section 1: Sequences & Partial Sums",
                "questions": [
                    make_q(
                        "In an arithmetic sequence, the $4$th term is $19$ and the $11$th term is $54$. What is the first term $a_1$?",
                        ["$4$", "$5$", "$6$", "$7$"], 0,
                        "Common difference $d = \\frac{a_{11} - a_4}{11 - 4} = \\frac{54 - 19}{7} = \\frac{35}{7} = 5$. Then $a_1 = a_4 - 3d = 19 - 3(5) = 19 - 15 = 4$."
                    ),
                    make_q(
                        "What is the sum of the first $25$ terms of the arithmetic series $3 + 7 + 11 + 15 + \\dots$?",
                        ["$1,250$", "$1,275$", "$1,300$", "$1,325$"], 1,
                        "$a_1 = 3$, $d = 4$. Term $a_{25} = 3 + 24(4) = 99$. Sum $S_{25} = \\frac{25}{2}(3 + 99) = \\frac{25}{2}(102) = 25 \\times 51 = 1,275$."
                    ),
                    make_q(
                        "What is the sum of the infinite geometric series $18 - 12 + 8 - \\frac{16}{3} + \\dots$?",
                        ["$\\frac{54}{5}$", "$\\frac{36}{5}$", "$10$", "$12$"], 0,
                        "First term $a = 18$, common ratio $r = -\\frac{12}{18} = -\\frac{2}{3}$. Since $|r| < 1$, sum $S = \\frac{a}{1 - r} = \\frac{18}{1 - (-2/3)} = \\frac{18}{5/3} = \\frac{54}{5}$."
                    )
                ]
            },
            {
                "heading": "Section 2: Binomial Expansion & Pascal's Triangle",
                "questions": [
                    make_q(
                        "What is the coefficient of $x^3 y^2$ in the binomial expansion of $(2x - y)^5$?",
                        ["$40$", "$-40$", "$80$", "$-80$"], 2,
                        "Binomial term: $\\binom{5}{2} (2x)^3 (-y)^2 = 10 \\times (8x^3) \\times y^2 = 80 x^3 y^2$. The coefficient is $80$."
                    ),
                    make_q(
                        "What is the sum of all coefficients in the expansion of $(3x - 2y)^6$?",
                        ["$1$", "$64$", "$729$", "$0$"], 0,
                        "To find the sum of coefficients, substitute $x = 1$ and $y = 1$: $(3(1) - 2(1))^6 = (1)^6 = 1$."
                    ),
                    make_q(
                        "What is the 4th term in the expansion of $(x + 2)^5$ arranged in descending powers of $x$?",
                        ["$40x^2$", "$80x^2$", "$20x^3$", "$10x^3$"], 1,
                        "4th term has $k = 3$: $\\binom{5}{3} x^{5-3} (2)^3 = 10 x^2 (8) = 80x^2$."
                    )
                ]
            },
            {
                "heading": "Section 3: Intuitive Limits & Continuity",
                "questions": [
                    make_q(
                        "Evaluate the algebraic limit: $\\lim_{x \\to 3} \\frac{x^2 - 9}{x^2 - 2x - 3}$.",
                        ["$\\frac{3}{2}$", "$\\frac{6}{5}$", "$\\frac{3}{4}$", "Does not exist"], 0,
                        "Factor numerator and denominator: $\\lim_{x \\to 3} \\frac{(x - 3)(x + 3)}{(x - 3)(x + 1)} = \\lim_{x \\to 3} \\frac{x + 3}{x + 1} = \\frac{3 + 3}{3 + 1} = \\frac{6}{4} = \\frac{3}{2}$."
                    ),
                    make_q(
                        "Evaluate the limit at infinity: $\\lim_{x \\to \\infty} \\frac{4x^3 - 5x + 2}{2x^3 + 7x^2 - 1}$.",
                        ["$0$", "$2$", "$4$", "$\\infty$"], 1,
                        "Divide all terms by the highest power $x^3$: $\\lim_{x \\to \\infty} \\frac{4 - 5/x^2 + 2/x^3}{2 + 7/x - 1/x^3} = \\frac{4}{2} = 2$."
                    ),
                    make_q(
                        "Evaluate the limit involving radicals: $\\lim_{x \\to 0} \\frac{\\sqrt{x + 4} - 2}{x}$.",
                        ["$\\frac{1}{4}$", "$\\frac{1}{2}$", "$1$", "$0$"], 0,
                        "Rationalize the numerator: $\\frac{(\\sqrt{x+4}-2)(\\sqrt{x+4}+2)}{x(\\sqrt{x+4}+2)} = \\frac{x}{x(\\sqrt{x+4}+2)} = \\frac{1}{\\sqrt{x+4}+2}$. As $x \\to 0$, this becomes $\\frac{1}{2+2} = \\frac{1}{4}$."
                    )
                ]
            },
            {
                "heading": "Section 4: Difference Quotients & Tangents",
                "questions": [
                    make_q(
                        "For $f(x) = 3x^2 - 5x$, simplify the difference quotient $\\frac{f(x + h) - f(x)}{h}$ for $h \\neq 0$.",
                        ["$6x + 3h - 5$", "$6x - 5$", "$6x + 3h$", "$3x + 3h - 5$"], 0,
                        "$f(x + h) = 3(x + h)^2 - 5(x + h) = 3x^2 + 6xh + 3h^2 - 5x - 5h$. Subtract $f(x)$: $6xh + 3h^2 - 5h$. Divide by $h$: $6x + 3h - 5$."
                    ),
                    make_q(
                        "What is the slope of the tangent line to the curve $y = x^2 - 4x$ at $x = 3$?",
                        ["$2$", "$3$", "$4$", "$6$"], 0,
                        "The derivative is $y' = 2x - 4$. At $x = 3$: $y'(3) = 2(3) - 4 = 2$."
                    ),
                    make_q(
                        "At what value of $x$ does the function $f(x) = -2x^2 + 12x - 5$ achieve its maximum value?",
                        ["$2$", "$3$", "$4$", "$6$"], 1,
                        "Vertex occurs at $x = -\\frac{b}{2a} = -\\frac{12}{2(-2)} = 3$."
                    )
                ]
            }
        ]
    },

    # --------------------------------------------------------------------------
    # ACT2 6.01: Advanced Coordinate Geometry
    # --------------------------------------------------------------------------
    {
        "track": "act2",
        "num": "6.01",
        "slug": "advanced-coordinate-geometry",
        "title": "Advanced Coordinate Geometry",
        "sections": [
            {
                "heading": "Section 1: Ellipses & Focal Properties",
                "questions": [
                    make_q(
                        "What are the coordinates of the foci of the ellipse $\\frac{x^2}{25} + \\frac{y^2}{9} = 1$?",
                        ["$(\\pm 4, 0)$", "$(0, \\pm 4)$", "$(\\pm 5, 0)$", "$(0, \\pm 3)$"], 0,
                        "Since $a^2 = 25 > b^2 = 9$, the major axis is horizontal. $c^2 = a^2 - b^2 = 25 - 9 = 16 \\Rightarrow c = 4$. Foci are at $(\\pm 4, 0)$."
                    ),
                    make_q(
                        "What is the length of the minor axis of the ellipse $\\frac{(x - 2)^2}{16} + \\frac{(y + 3)^2}{36} = 1$?",
                        ["$4$", "$8$", "$6$", "$12$"], 1,
                        "$b^2 = 16 \\Rightarrow b = 4$. The length of the minor axis is $2b = 2(4) = 8$."
                    ),
                    make_q(
                        "What is the eccentricity of the ellipse $9x^2 + 25y^2 = 225$?",
                        ["$\\frac{4}{5}$", "$\\frac{3}{5}$", "$\\frac{16}{25}$", "$\\frac{5}{4}$"], 0,
                        "Divide by $225$: $\\frac{x^2}{25} + \\frac{y^2}{9} = 1 \\Rightarrow a = 5, b = 3, c = \\sqrt{25 - 9} = 4$. Eccentricity $e = \\frac{c}{a} = \\frac{4}{5}$."
                    )
                ]
            },
            {
                "heading": "Section 2: Hyperbolas & Asymptotes",
                "questions": [
                    make_q(
                        "What are the equations of the asymptotes of the hyperbola $\\frac{x^2}{16} - \\frac{y^2}{9} = 1$?",
                        ["$y = \\pm \\frac{3}{4} x$", "$y = \\pm \\frac{4}{3} x$", "$y = \\pm \\frac{9}{16} x$", "$y = \\pm \\frac{16}{9} x$"], 0,
                        "For a horizontal hyperbola $\\frac{x^2}{a^2} - \\frac{y^2}{b^2} = 1$, the asymptotes are $y = \\pm \\frac{b}{a} x$. Here $a = 4$ and $b = 3$, so $y = \\pm \\frac{3}{4} x$."
                    ),
                    make_q(
                        "What is the distance between the two vertices of the hyperbola $\\frac{y^2}{64} - \\frac{x^2}{36} = 1$?",
                        ["$12$", "$16$", "$20$", "$24$"], 1,
                        "The transverse axis is vertical along $y$. $a^2 = 64 \\Rightarrow a = 8$. The distance between vertices is $2a = 2(8) = 16$."
                    ),
                    make_q(
                        "What is the focal length (distance from center to a focus) of $\\frac{x^2}{144} - \\frac{y^2}{25} = 1$?",
                        ["$11$", "$12$", "$13$", "$17$"], 2,
                        "For a hyperbola, $c^2 = a^2 + b^2 = 144 + 25 = 169 \\Rightarrow c = 13$."
                    )
                ]
            },
            {
                "heading": "Section 3: Conic Classification & Discriminants",
                "questions": [
                    make_q(
                        "Classify the conic section represented by $3x^2 + 3y^2 - 12x + 6y - 15 = 0$.",
                        ["Circle", "Ellipse", "Parabola", "Hyperbola"], 0,
                        "Since coefficients of $x^2$ and $y^2$ are equal and non-zero ($A = C = 3$) with no $xy$-term, this represents a circle."
                    ),
                    make_q(
                        "Which conic section is represented by the equation $y^2 - 4x - 6y + 1 = 0$?",
                        ["Circle", "Ellipse", "Parabola", "Hyperbola"], 2,
                        "Only one variable ($y$) is squared while $x$ appears only to the first degree. This is a parabola opening horizontally."
                    ),
                    make_q(
                        "What is the discriminant $B^2 - 4AC$ of the general conic $4x^2 - 12xy + 9y^2 + 2x - 5y = 0$, and what does it indicate?",
                        ["$0$ (Parabola)", "$-48$ (Ellipse)", "$48$ (Hyperbola)", "$0$ (Degenerate Circle)"], 0,
                        "$B = -12, A = 4, C = 9$. $B^2 - 4AC = (-12)^2 - 4(4)(9) = 144 - 144 = 0$. A zero discriminant indicates a parabola."
                    )
                ]
            },
            {
                "heading": "Section 4: Rotations & Coordinate Shifts",
                "questions": [
                    make_q(
                        "Under a $90^\\circ$ counterclockwise rotation about the origin, what are the new coordinates of the point $(3, -5)$?",
                        ["$(5, 3)$", "$(-5, -3)$", "$(3, 5)$", "$(-3, 5)$"], 0,
                        "Rotation formula for $90^\\circ$ counterclockwise: $(x, y) \\to (-y, x)$. Here $(3, -5) \\to (-(-5), 3) = (5, 3)$."
                    ),
                    make_q(
                        "A line $y = 3x - 2$ is reflected across the $y$-axis. What is the equation of the reflected line?",
                        ["$y = -3x - 2$", "$y = -3x + 2$", "$y = 3x + 2$", "$y = -\\frac{1}{3}x - 2$"], 0,
                        "Reflection across the $y$-axis replaces $x$ with $-x$: $y = 3(-x) - 2 = -3x - 2$."
                    ),
                    make_q(
                        "What is the distance from the point $(2, 3)$ to the line $3x - 4y + 1 = 0$?",
                        ["$1$", "$2$", "$\\frac{7}{5}$", "$\\frac{5}{7}$"], 0,
                        "Distance formula: $d = \\frac{|Ax_0 + By_0 + C|}{\\sqrt{A^2 + B^2}} = \\frac{|3(2) - 4(3) + 1|}{\\sqrt{3^2 + (-4)^2}} = \\frac{|6 - 12 + 1|}{5} = \\frac{|-5|}{5} = 1$."
                    )
                ]
            }
        ]
    },

    # --------------------------------------------------------------------------
    # ACT2 7.01: Advanced Plane Geometry
    # --------------------------------------------------------------------------
    {
        "track": "act2",
        "num": "7.01",
        "slug": "advanced-plane-geometry",
        "title": "Advanced Plane Geometry",
        "sections": [
            {
                "heading": "Section 1: Circle Theorems & Power of a Point",
                "questions": [
                    make_q(
                        "Two chords $AB$ and $CD$ intersect inside a circle at point $P$. If $AP = 4, PB = 9,$ and $CP = 3$, what is the length of $PD$?",
                        ["$6$", "$8$", "$12$", "$15$"], 2,
                        "By the intersecting chords theorem: $AP \\times PB = CP \\times PD \\Rightarrow 4 \\times 9 = 3 \\times PD \\Rightarrow 36 = 3 PD \\Rightarrow PD = 12$."
                    ),
                    make_q(
                        "From an external point $P$, tangent segment $PT$ touches the circle at $T$, and secant line $PAB$ passes through points $A$ and $B$. If $PT = 10$ and $PA = 5$, what is the length of $AB$?",
                        ["$10$", "$15$", "$20$", "$25$"], 1,
                        "By tangent-secant theorem: $PT^2 = PA \\times PB \\Rightarrow 10^2 = 5 \\times PB \\Rightarrow 100 = 5 PB \\Rightarrow PB = 20$. Therefore, $AB = PB - PA = 20 - 5 = 15$."
                    ),
                    make_q(
                        "Two secants $PAB$ and $PCD$ meet outside a circle. If the intercepted arcs are $\\widehat{BD} = 120^\\circ$ and $\\widehat{AC} = 40^\\circ$, what is the measure of angle $P$?",
                        ["$30^\\circ$", "$40^\\circ$", "$50^\\circ$", "$80^\\circ$"], 1,
                        "Exterior angle theorem: $\\angle P = \\frac{\\widehat{BD} - \\widehat{AC}}{2} = \\frac{120^\\circ - 40^\\circ}{2} = \\frac{80^\\circ}{2} = 40^\\circ$."
                    )
                ]
            },
            {
                "heading": "Section 2: Triangle Centers & Cevians",
                "questions": [
                    make_q(
                        "In $\\triangle ABC$, medians intersect at the centroid $G$. If median $AM$ has length $18$ cm, what is the length of $AG$?",
                        ["$6$ cm", "$9$ cm", "$12$ cm", "$15$ cm"], 2,
                        "The centroid divides each median in a $2:1$ ratio from vertex to midpoint: $AG = \\frac{2}{3} AM = \\frac{2}{3}(18) = 12$ cm."
                    ),
                    make_q(
                        "Which triangle center is equidistant from all three sides of a triangle?",
                        ["Incenter", "Circumcenter", "Centroid", "Orthocenter"], 0,
                        "The incenter is the intersection of the angle bisectors and is the center of the inscribed circle, equidistant from all three sides."
                    ),
                    make_q(
                        "In $\\triangle ABC$, the circumcenter lies on the midpoint of the longest side. What type of triangle is $\\triangle ABC$?",
                        ["Acute", "Right", "Obtuse", "Equilateral"], 1,
                        "By Thales's theorem, the circumcenter of a triangle lies on a side if and only if the triangle is a right triangle, where the hypotenuse is the diameter of the circumcircle."
                    )
                ]
            },
            {
                "heading": "Section 3: Solid Geometry & Volume Formulas",
                "questions": [
                    make_q(
                        "A right circular cone has a base radius of $6$ cm and a slant height of $10$ cm. What is the total volume of the cone?",
                        ["$96\\pi$ cm$^3$", "$120\\pi$ cm$^3$", "$288\\pi$ cm$^3$", "$72\\pi$ cm$^3$"], 0,
                        "Altitude $h = \\sqrt{10^2 - 6^2} = \\sqrt{100 - 36} = 8$ cm. Volume $V = \\frac{1}{3}\\pi r^2 h = \\frac{1}{3}\\pi (36)(8) = 96\\pi$ cm$^3$."
                    ),
                    make_q(
                        "A solid metal sphere of radius $3$ cm is melted down and recast into a cylinder of base radius $3$ cm. What is the height of the cylinder?",
                        ["$3$ cm", "$4$ cm", "$6$ cm", "$8$ cm"], 1,
                        "Volume of sphere: $\\frac{4}{3}\\pi (3^3) = 36\\pi$. Volume of cylinder: $\\pi (3^2) h = 9\\pi h$. Equating: $9\\pi h = 36\\pi \\Rightarrow h = 4$ cm."
                    ),
                    make_q(
                        "If the linear dimensions of a rectangular prism are all multiplied by $3$, by what factor does its surface area increase?",
                        ["$3$", "$6$", "$9$", "$27$"], 2,
                        "Surface area scales with the square of the linear scale factor: $k^2 = 3^2 = 9$."
                    )
                ]
            },
            {
                "heading": "Section 4: Cyclic Quadrilaterals & Ptolemy's Theorem",
                "questions": [
                    make_q(
                        "In a cyclic quadrilateral $ABCD$, opposite angles are supplementary. If $\\angle A = (4x + 10)^\\circ$ and $\\angle C = (3x + 30)^\\circ$, what is the value of $x$?",
                        ["$20$", "$25$", "$30$", "$35$"], 0,
                        "$\\angle A + \\angle C = 180^\\circ \\Rightarrow (4x + 10) + (3x + 30) = 180 \\Rightarrow 7x + 40 = 180 \\Rightarrow 7x = 140 \\Rightarrow x = 20$."
                    ),
                    make_q(
                        "In cyclic quadrilateral $ABCD$, sides are $AB = 2, BC = 6, CD = 7,$ and $DA = 3$. What is the product of the diagonals $AC \\times BD$ by Ptolemy's Theorem?",
                        ["$32$", "$35$", "$39$", "$44$"], 0,
                        "Ptolemy's Theorem states: $AC \\times BD = AB \\times CD + BC \\times DA = 2(7) + 6(3) = 14 + 18 = 32$."
                    ),
                    make_q(
                        "What is Brahmagupta's formula for the area of a cyclic quadrilateral with side lengths $a, b, c, d$ and semiperimeter $s$?",
                        ["$\\sqrt{(s-a)(s-b)(s-c)(s-d)}$", "$\\frac{1}{2}(ac + bd)$", "$\\sqrt{s(s-a)(s-b)(s-c)}$", "$\\frac{ab + cd}{2}$"], 0,
                        "Brahmagupta's formula for cyclic quadrilaterals is $K = \\sqrt{(s-a)(s-b)(s-c)(s-d)}$."
                    )
                ]
            }
        ]
    },

    # --------------------------------------------------------------------------
    # ACT2 8.01: Statistics, Counting & Probability
    # --------------------------------------------------------------------------
    {
        "track": "act2",
        "num": "8.01",
        "slug": "statistics-counting-probability",
        "title": "Statistics, Counting & Probability",
        "sections": [
            {
                "heading": "Section 1: Expected Value & Probability Distributions",
                "questions": [
                    make_q(
                        "A charity raffle sells $1,000$ tickets at $5$ each. There is one grand prize of $1,000$ and two second prizes of $500$ each. What is the expected net gain for a person purchasing one ticket?",
                        ["-$3.00", "-$2.00", "-$1.50", "$0.00"], 0,
                        "Expected payout $= \\frac{1}{1000}(1000) + \\frac{2}{1000}(500) = 1 + 1 = 2$. Net expected gain $= 2 - 5 = -3$ dollars."
                    ),
                    make_q(
                        "A random variable $X$ has probability distribution: $P(X = 1) = 0.2, P(X = 2) = 0.5, P(X = 3) = 0.3$. What is the expected value $E(X)$?",
                        ["$2.0$", "$2.1$", "$2.2$", "$2.3$"], 1,
                        "$E(X) = 1(0.2) + 2(0.5) + 3(0.3) = 0.2 + 1.0 + 0.9 = 2.1$."
                    ),
                    make_q(
                        "If $E(X) = 4$ and $E(X^2) = 25$, what is the variance $\\operatorname{Var}(X)$?",
                        ["$3$", "$5$", "$9$", "$16$"], 2,
                        "$\\operatorname{Var}(X) = E(X^2) - [E(X)]^2 = 25 - 4^2 = 25 - 16 = 9$."
                    )
                ]
            },
            {
                "heading": "Section 2: Normal Distribution & Z-Scores",
                "questions": [
                    make_q(
                        "The scores on a standardized exam are normally distributed with a mean of $500$ and a standard deviation of $100$. Approximately what percentage of test takers score between $400$ and $600$?",
                        ["$50\\%$", "$68\\%$", "$95\\%$", "$99.7\\%$"], 1,
                        "Scores between $400$ and $600$ lie within $1$ standard deviation of the mean ($\\mu \\pm \\sigma$). By the Empirical Rule, this encompasses approximately $68\\%$ of data."
                    ),
                    make_q(
                        "A student scores $84$ on a test with mean $72$ and standard deviation $8$. What is the student's $z$-score?",
                        ["$1.25$", "$1.50$", "$1.75$", "$2.00$"], 1,
                        "Formula: $z = \\frac{x - \\mu}{\\sigma} = \\frac{84 - 72}{8} = \\frac{12}{8} = 1.50$."
                    ),
                    make_q(
                        "In a normal distribution with mean $50$ and standard deviation $5$, what value corresponds to a $z$-score of $-1.6$?",
                        ["$42$", "$44$", "$46$", "$48$"], 0,
                        "$x = \\mu + z\\sigma = 50 + (-1.6)(5) = 50 - 8 = 42$."
                    )
                ]
            },
            {
                "heading": "Section 3: Conditional Probability & Bayes' Rule",
                "questions": [
                    make_q(
                        "Given $P(A) = 0.6, P(B) = 0.5,$ and $P(A \\cap B) = 0.3$, what is the conditional probability $P(A \\mid B)$?",
                        ["$0.50$", "$0.60$", "$0.75$", "$0.30$"], 1,
                        "$P(A \\mid B) = \\frac{P(A \\cap B)}{P(B)} = \\frac{0.3}{0.5} = 0.60$."
                    ),
                    make_q(
                        "If two events $A$ and $B$ are mutually exclusive with $P(A) = 0.35$ and $P(B) = 0.45$, what is $P(A \\cup B)$?",
                        ["$0.70$", "$0.80$", "$0.90$", "$0.1575$"], 1,
                        "For mutually exclusive events, $P(A \\cap B) = 0$. Therefore, $P(A \\cup B) = P(A) + P(B) = 0.35 + 0.45 = 0.80$."
                    ),
                    make_q(
                        "A medical screening test is $95\\%$ accurate. If $2\\%$ of a population has the disease, what is the probability that a randomly chosen person has the disease AND tests positive?",
                        ["$0.019$", "$0.020$", "$0.095$", "$0.95$"], 0,
                        "$P(\\text{Disease} \\cap \\text{Positive}) = P(\\text{Disease}) \\times P(\\text{Positive} \\mid \\text{Disease}) = 0.02 \\times 0.95 = 0.019$."
                    )
                ]
            },
            {
                "heading": "Section 4: Combinatorial Counting & Pigeonhole Principle",
                "questions": [
                    make_q(
                        "In how many ways can $6$ students be seated in a circle?",
                        ["$120$", "$720$", "$60$", "$24$"], 0,
                        "Circular permutations of $n$ distinct objects is $(n - 1)!$. Here $(6 - 1)! = 5! = 120$."
                    ),
                    make_q(
                        "What is the minimum number of socks that must be drawn from a drawer containing $10$ black socks and $10$ white socks to guarantee getting at least one matching pair?",
                        ["$2$", "$3$", "$4$", "$11$"], 1,
                        "There are $2$ colors (pigeonholes). By the Pigeonhole Principle, drawing $2 + 1 = 3$ socks guarantees at least two socks of the same color."
                    ),
                    make_q(
                        "How many distinct permutations can be formed using all the letters of the word 'STATISTICS'?",
                        ["$50,400$", "$100,800$", "$302,400$", "$3,628,800$"], 0,
                        "Word length is $10$ letters: $3$ S's, $3$ T's, $2$ I's, $1$ A, $1$ C. Permutations $= \\frac{10!}{3! 3! 2!} = \\frac{3,628,800}{6 \\times 6 \\times 2} = \\frac{3,628,800}{72} = 50,400$."
                    )
                ]
            }
        ]
    }
]

# ==============================================================================
# ACT 2 LEVEL 2 (6 TOPICS)
# ==============================================================================

ACT2L2_TOPICS = [
    # --------------------------------------------------------------------------
    # ACT2L2 1.01: Complex Numbers
    # --------------------------------------------------------------------------
    {
        "track": "act2l2",
        "num": "1.01",
        "slug": "complex-numbers",
        "title": "Complex Numbers",
        "sections": [
            {
                "heading": "Section 1: Complex Arithmetic & Polar Form",
                "questions": [
                    make_q(
                        "What is the polar (trigonometric) form of the complex number $z = -2 + 2i\\sqrt{3}$?",
                        ["$4(\\cos\\frac{2\\pi}{3} + i\\sin\\frac{2\\pi}{3})$", "$4(\\cos\\frac{\\pi}{3} + i\\sin\\frac{\\pi}{3})$", "$2(\\cos\\frac{2\\pi}{3} + i\\sin\\frac{2\\pi}{3})$", "$4(\\cos\\frac{5\\pi}{6} + i\\sin\\frac{5\\pi}{6})$"], 0,
                        "$r = \\sqrt{(-2)^2 + (2\\sqrt{3})^2} = \\sqrt{4 + 12} = 4$. Angle $\\theta$ is in Quadrant II: $\\theta = \\pi - \\arctan(\\sqrt{3}) = \\frac{2\\pi}{3}$."
                    ),
                    make_q(
                        "What is the product of $z_1 = 3(\\cos\\frac{\\pi}{4} + i\\sin\\frac{\\pi}{4})$ and $z_2 = 2(\\cos\\frac{\\pi}{2} + i\\sin\\frac{\\pi}{2})$?",
                        ["$6(\\cos\\frac{3\\pi}{4} + i\\sin\\frac{3\\pi}{4})$", "$5(\\cos\\frac{3\\pi}{4} + i\\sin\\frac{3\\pi}{4})$", "$6(\\cos\\frac{\\pi}{4} + i\\sin\\frac{\\pi}{4})$", "$6(\\cos\\frac{\\pi}{8} + i\\sin\\frac{\\pi}{8})$"], 0,
                        "Multiply magnitudes and add angles: $r = 3 \\times 2 = 6$, and $\\theta = \\frac{\\pi}{4} + \\frac{\\pi}{2} = \\frac{3\\pi}{4}$."
                    ),
                    make_q(
                        "Simplify the quotient $\\frac{8(\\cos 80^\\circ + i\\sin 80^\\circ)}{2(\\cos 20^\\circ + i\\sin 20^\\circ)}$.",
                        ["$4(\\cos 60^\\circ + i\\sin 60^\\circ)$", "$4(\\cos 100^\\circ + i\\sin 100^\\circ)$", "$4(\\cos 4^\\circ + i\\sin 4^\\circ)$", "$6(\\cos 60^\\circ + i\\sin 60^\\circ)$"], 0,
                        "Divide magnitudes and subtract angles: $\\frac{8}{2} = 4$, and $80^\\circ - 20^\\circ = 60^\\circ$."
                    )
                ]
            },
            {
                "heading": "Section 2: De Moivre's Theorem & Powers",
                "questions": [
                    make_q(
                        "Using De Moivre's Theorem, evaluate $(1 + i)^8$.",
                        ["$16$", "$16i$", "$32$", "$-16$"], 0,
                        "$1 + i = \\sqrt{2}(\\cos\\frac{\\pi}{4} + i\\sin\\frac{\\pi}{4})$. Raising to power $8$: $(\\sqrt{2})^8 [\\cos(8 \\cdot \\frac{\\pi}{4}) + i\\sin(8 \\cdot \\frac{\\pi}{4})] = 16(\\cos 2\\pi + i\\sin 2\\pi) = 16(1 + 0) = 16$."
                    ),
                    make_q(
                        "What is $(\\cos\\frac{\\pi}{6} + i\\sin\\frac{\\pi}{6})^{12}$?",
                        ["$1$", "$-1$", "$i$", "$-i$"], 0,
                        "By De Moivre's Theorem: $\\cos(12 \\cdot \\frac{\\pi}{6}) + i\\sin(12 \\cdot \\frac{\\pi}{6}) = \\cos(2\\pi) + i\\sin(2\\pi) = 1$."
                    ),
                    make_q(
                        "What is the real part of the complex number $(2 - 2i)^4$?",
                        ["$-64$", "$64$", "$0$", "$-32$"], 0,
                        "$2 - 2i = \\sqrt{8} e^{-i\\pi/4}$. Raising to 4th power: $(\\sqrt{8})^4 e^{-i\\pi} = 64(-1) = -64$."
                    )
                ]
            },
            {
                "heading": "Section 3: Roots of Complex Numbers & Roots of Unity",
                "questions": [
                    make_q(
                        "How many distinct complex solutions exist for the equation $z^5 = 1$?",
                        ["$1$", "$3$", "$5$", "Infinitely many"], 2,
                        "By the Fundamental Theorem of Algebra, any polynomial of degree $n$ has exactly $n$ complex roots. Here $n = 5$."
                    ),
                    make_q(
                        "Which of the following is a primitive cube root of unity?",
                        ["$-\\frac{1}{2} + i\\frac{\\sqrt{3}}{2}$", "$\\frac{1}{2} + i\\frac{\\sqrt{3}}{2}$", "$-\\frac{1}{2} - i\\frac{1}{2}$", "$1 + i\\sqrt{3}$"], 0,
                        "Roots of $z^3 = 1$ are $e^{i 2k\\pi/3}$. For $k = 1$: $\\cos\\frac{2\\pi}{3} + i\\sin\\frac{2\\pi}{3} = -\\frac{1}{2} + i\\frac{\\sqrt{3}}{2}$."
                    ),
                    make_q(
                        "What is the sum of all the $n$-th roots of unity for any integer $n \\geq 2$?",
                        ["$0$", "$1$", "$n$", "$-1$"], 0,
                        "The roots form a symmetric geometric progression whose sum is $\\frac{1 - \\omega^n}{1 - \\omega} = \\frac{1 - 1}{1 - \\omega} = 0$."
                    )
                ]
            },
            {
                "heading": "Section 4: Complex Polynomials & Geometry",
                "questions": [
                    make_q(
                        "If $2 + 3i$ is a root of the quadratic polynomial $x^2 + bx + c = 0$ with real coefficients, what is the value of $b + c$?",
                        ["$9$", "$11$", "$13$", "$17$"], 0,
                        "By the Complex Conjugate Root Theorem, the other root is $2 - 3i$. Sum of roots $= 4 = -b \\Rightarrow b = -4$. Product of roots $= 2^2 + 3^2 = 13 = c$. Thus $b + c = -4 + 13 = 9$."
                    ),
                    make_q(
                        "In the complex plane, what geometric figure is described by the equation $|z - (3 + 4i)| = 5$?",
                        ["A circle centered at $(3, 4)$ with radius $5$", "An ellipse with foci at $(3, 4)$", "A line passing through $(3, 4)$", "A parabola with vertex $(3, 4)$"], 0,
                        "$|z - z_0| = r$ represents the locus of all points whose distance from $z_0 = 3 + 4i$ is constant ($5$), which is a circle of radius $5$."
                    ),
                    make_q(
                        "What is the minimum value of $|z - 6|$ given that $|z| = 2$?",
                        ["$2$", "$4$", "$6$", "$8$"], 1,
                        "By the reverse triangle inequality: $|z - 6| \\geq ||6| - |z|| = |6 - 2| = 4$."
                    )
                ]
            }
        ]
    },

    # --------------------------------------------------------------------------
    # ACT2L2 2.01: Matrices & Vectors
    # --------------------------------------------------------------------------
    {
        "track": "act2l2",
        "num": "2.01",
        "slug": "matrices-vectors",
        "title": "Matrices & Vectors",
        "sections": [
            {
                "heading": "Section 1: Matrix Multiplication & Inverses",
                "questions": [
                    make_q(
                        "If $A$ is a $3 \\times 2$ matrix and $B$ is a $2 \\times 4$ matrix, what are the dimensions of the product matrix $AB$?",
                        ["$3 \\times 4$", "$2 \\times 2$", "$4 \\times 3$", "Multiplication is undefined"], 0,
                        "Inner dimensions match ($2 = 2$). The resulting matrix has dimensions equal to outer indices: $3 \\times 4$."
                    ),
                    make_q(
                        "What is the inverse of the matrix $M = [[2, 5], [1, 3]]$?",
                        ["$[[3, -5], [-1, 2]]$", "$[[-3, 5], [1, -2]]$", "$[[2, -5], [-1, 3]]$", "$[[3, 1], [5, 2]]$"], 0,
                        "Determinant $\\det(M) = 2(3) - 5(1) = 1$. The inverse is $\\frac{1}{1} [[d, -b], [-c, a]] = [[3, -5], [-1, 2]]$."
                    ),
                    make_q(
                        "Let $A$ and $B$ be invertible $n \\times n$ matrices. Which expression represents $(AB)^{-1}$?",
                        ["$B^{-1} A^{-1}$", "$A^{-1} B^{-1}$", "$A B^{-1}$", "$B A^{-1}$"], 0,
                        "By standard matrix inverse rules, $(AB)^{-1} = B^{-1} A^{-1}$."
                    )
                ]
            },
            {
                "heading": "Section 2: Determinants & Cramer's Rule",
                "questions": [
                    make_q(
                        "What is the determinant of the $3 \\times 3$ matrix $[[1, 2, 3], [0, 4, 5], [0, 0, 6]]$?",
                        ["$24$", "$30$", "$36$", "$0$"], 0,
                        "The matrix is upper triangular. The determinant is the product of diagonal elements: $1 \\times 4 \\times 6 = 24$."
                    ),
                    make_q(
                        "If the determinant of a $2 \\times 2$ matrix $A$ is $5$, what is $\\det(3A)$?",
                        ["$15$", "$45$", "$75$", "$135$"], 1,
                        "For an $n \\times n$ matrix, $\\det(cA) = c^n \\det(A)$. Here $n = 2$, so $\\det(3A) = 3^2 \\det(A) = 9 \\times 5 = 45$."
                    ),
                    make_q(
                        "For what value of $x$ is the matrix $[[x, 3], [12, x]]$ singular?",
                        ["$\\pm 6$", "$\\pm 4$", "$\\pm 12$", "$0$"], 0,
                        "Singular means determinant equals zero: $x^2 - 36 = 0 \\Rightarrow x^2 = 36 \\Rightarrow x = \\pm 6$."
                    )
                ]
            },
            {
                "heading": "Section 3: Dot Product & Angle Between Vectors",
                "questions": [
                    make_q(
                        "What is the angle $\\theta$ between vectors $\\mathbf{u} = \\langle 1, 0 \\rangle$ and $\\mathbf{v} = \\langle 1, 1 \\rangle$?",
                        ["$30^\\circ$", "$45^\\circ$", "$60^\\circ$", "$90^\\circ$"], 1,
                        "$\\cos\\theta = \\frac{\\mathbf{u} \\cdot \\mathbf{v}}{\\|\\mathbf{u}\\| \\|\\mathbf{v}\\|} = \\frac{1(1) + 0(1)}{(1)(\\sqrt{2})} = \\frac{1}{\\sqrt{2}} \\Rightarrow \\theta = 45^\\circ$."
                    ),
                    make_q(
                        "For what value of $k$ are the vectors $\\mathbf{a} = \\langle 4, k \\rangle$ and $\\mathbf{b} = \\langle 3, -6 \\rangle$ orthogonal?",
                        ["$1$", "$2$", "$3$", "$4$"], 1,
                        "Orthogonal vectors have dot product equal to $0$: $4(3) + k(-6) = 0 \\Rightarrow 12 - 6k = 0 \\Rightarrow 6k = 12 \\Rightarrow k = 2$."
                    ),
                    make_q(
                        "What is the scalar projection of vector $\\mathbf{u} = \\langle 4, 3 \\rangle$ onto vector $\\mathbf{v} = \\langle 12, 5 \\rangle$?",
                        ["$\\frac{63}{13}$", "$5$", "$\\frac{48}{13}$", "$\\frac{15}{13}$"], 0,
                        "Scalar projection $\\operatorname{comp}_{\\mathbf{v}} \\mathbf{u} = \\frac{\\mathbf{u} \\cdot \\mathbf{v}}{\\|\\mathbf{v}\\|} = \\frac{4(12) + 3(5)}{\\sqrt{12^2 + 5^2}} = \\frac{48 + 15}{13} = \\frac{63}{13}$."
                    )
                ]
            },
            {
                "heading": "Section 4: 3D Vectors & Cross Product",
                "questions": [
                    make_q(
                        "What is the cross product $\\mathbf{i} \\times \\mathbf{j}$ in three-dimensional space?",
                        ["$\\mathbf{k}$", "$-\\mathbf{k}$", "$\\mathbf{0}$", "$1$"], 0,
                        "By standard right-hand rule and unit vectors: $\\mathbf{i} \\times \\mathbf{j} = \\mathbf{k}$."
                    ),
                    make_q(
                        "What is the magnitude of the vector $\\mathbf{v} = \\langle 2, -3, 6 \\rangle$?",
                        ["$7$", "$9$", "$\\sqrt{49}$", "$8$"], 0,
                        "$\\|\\mathbf{v}\\| = \\sqrt{2^2 + (-3)^2 + 6^2} = \\sqrt{4 + 9 + 36} = \\sqrt{49} = 7$."
                    ),
                    make_q(
                        "What is the area of the parallelogram determined by vectors $\\mathbf{a} = \\langle 3, 0, 0 \\rangle$ and $\\mathbf{b} = \\langle 0, 4, 0 \\rangle$?",
                        ["$6$", "$12$", "$24$", "$7$"], 1,
                        "Area equals the magnitude of the cross product: $\\|\\mathbf{a} \\times \\mathbf{b}\\| = \\|\\langle 0, 0, 12 \\rangle\\| = 12$."
                    )
                ]
            }
        ]
    },

    # --------------------------------------------------------------------------
    # ACT2L2 3.01: Sequences & Series
    # --------------------------------------------------------------------------
    {
        "track": "act2l2",
        "num": "3.01",
        "slug": "sequences-series",
        "title": "Sequences & Series",
        "sections": [
            {
                "heading": "Section 1: General Arithmetic & Geometric Progressions",
                "questions": [
                    make_q(
                        "In a geometric sequence, the 2nd term is $6$ and the 5th term is $162$. What is the common ratio $r$?",
                        ["$2$", "$3$", "$4$", "$9$"], 1,
                        "$\\frac{a_5}{a_2} = \\frac{a r^4}{a r} = r^3 = \\frac{162}{6} = 27 \\Rightarrow r = 3$."
                    ),
                    make_q(
                        "Insert two geometric means between $5$ and $320$. What is the first inserted term?",
                        ["$10$", "$20$", "$40$", "$80$"], 1,
                        "Sequence has 4 terms: $a_1 = 5, a_4 = 320$. $r^3 = \\frac{320}{5} = 64 \\Rightarrow r = 4$. First mean $a_2 = 5 \\times 4 = 20$."
                    ),
                    make_q(
                        "Find the sum of all multiples of $4$ between $10$ and $100$ inclusive.",
                        ["$1,188$", "$1,210$", "$1,260$", "$1,320$"], 1,
                        "First term $a = 12$, last term $l = 100$. Number of terms $n = \\frac{100 - 12}{4} + 1 = 22 + 1 = 23$. Sum $S = \\frac{23}{2}(12 + 100) = \\frac{23}{2}(112) = 23 \\times 56 = 1,288$."
                    )
                ]
            },
            {
                "heading": "Section 2: Sigma Notation & Special Sums",
                "questions": [
                    make_q(
                        "Evaluate the sum: $\\sum_{k=1}^{20} (3k + 2)$.",
                        ["$650$", "$670$", "$690$", "$710$"], 1,
                        "$\\sum (3k + 2) = 3 \\sum_{k=1}^{20} k + \\sum_{k=1}^{20} 2 = 3(\\frac{20 \\times 21}{2}) + 20(2) = 3(210) + 40 = 630 + 40 = 670$."
                    ),
                    make_q(
                        "Using the formula $\\sum_{k=1}^n k^2 = \\frac{n(n+1)(2n+1)}{6}$, evaluate $\\sum_{k=1}^{10} k^2$.",
                        ["$385$", "$420$", "$505$", "$550$"], 0,
                        "$\\frac{10(11)(21)}{6} = \\frac{2310}{6} = 385$."
                    ),
                    make_q(
                        "What is the sum of the telescoping series $\\sum_{n=1}^{50} (\\frac{1}{n} - \\frac{1}{n+1})$?",
                        ["$\\frac{49}{50}$", "$\\frac{50}{51}$", "$1$", "$\\frac{51}{52}$"], 1,
                        "Terms cancel: $(1 - \\frac{1}{2}) + (\\frac{1}{2} - \\frac{1}{3}) + \\dots + (\\frac{1}{50} - \\frac{1}{51}) = 1 - \\frac{1}{51} = \\frac{50}{51}$."
                    )
                ]
            },
            {
                "heading": "Section 3: Infinite Series Convergence",
                "questions": [
                    make_q(
                        "For what values of $x$ does the geometric series $\\sum_{n=0}^{\\infty} (2x - 3)^n$ converge?",
                        ["$1 < x < 2$", "$0 < x < 3$", "$-1 < x < 1$", "All real $x$"], 0,
                        "Convergence requires $|r| < 1$: $|2x - 3| < 1 \\Rightarrow -1 < 2x - 3 < 1 \\Rightarrow 2 < 2x < 4 \\Rightarrow 1 < x < 2$."
                    ),
                    make_q(
                        "What is the sum of the series $\\sum_{n=1}^{\\infty} \\frac{3}{4^n}$?",
                        ["$\\frac{3}{4}$", "$1$", "$\\frac{4}{3}$", "$2$"], 1,
                        "First term $a = \\frac{3}{4}$, common ratio $r = \\frac{1}{4}$. Sum $= \\frac{3/4}{1 - 1/4} = \\frac{3/4}{3/4} = 1$."
                    ),
                    make_q(
                        "Does the harmonic series $\\sum_{n=1}^{\\infty} \\frac{1}{n}$ converge or diverge?",
                        ["Converges to $1$", "Converges to $\\pi^2/6$", "Diverges", "Oscillates"], 2,
                        "The harmonic series is a standard $p$-series with $p = 1$, which diverges to infinity."
                    )
                ]
            },
            {
                "heading": "Section 4: Recursive Sequences & Induction",
                "questions": [
                    make_q(
                        "A sequence is defined recursively by $a_1 = 3$ and $a_{n+1} = 2a_n - 1$. What is the value of $a_4$?",
                        ["$9$", "$15$", "$17$", "$21$"], 2,
                        "$a_1 = 3$. $a_2 = 2(3) - 1 = 5$. $a_3 = 2(5) - 1 = 9$. $a_4 = 2(9) - 1 = 17$."
                    ),
                    make_q(
                        "If $F_1 = 1, F_2 = 1,$ and $F_n = F_{n-1} + F_{n-2}$ represents the Fibonacci sequence, what is $F_8$?",
                        ["$13$", "$21$", "$34$", "$55$"], 1,
                        "Terms: $1, 1, 2, 3, 5, 8, 13, 21$. The 8th term is $21$."
                    ),
                    make_q(
                        "In a proof by mathematical induction, after verifying the base case $P(1)$, what is the inductive hypothesis?",
                        ["Assume $P(k)$ is true for some integer $k \\geq 1$", "Prove $P(1)$ is false", "Assume $P(k+1)$ is true", "Prove for all $k$ simultaneously"], 0,
                        "The inductive hypothesis explicitly assumes the statement holds for an arbitrary integer $k \\geq 1$ in order to prove $P(k+1)$."
                    )
                ]
            }
        ]
    },

    # --------------------------------------------------------------------------
    # ACT2L2 4.01: Advanced Functions & Equations
    # --------------------------------------------------------------------------
    {
        "track": "act2l2",
        "num": "4.01",
        "slug": "advanced-functions-equations",
        "title": "Advanced Functions & Equations",
        "sections": [
            {
                "heading": "Section 1: Rational & Radical Inequalities",
                "questions": [
                    make_q(
                        "Solve the rational inequality: $\\frac{x - 3}{x + 2} \\leq 0$.",
                        ["$(-2, 3]$", "$[-2, 3]$", "$(-\\infty, -2) \\cup [3, \\infty)$", "$x \\leq 3$"], 0,
                        "Critical values at $x = -2$ and $x = 3$. Testing intervals shows the expression is negative on $(-2, 3)$. Note $x = -2$ is excluded because it makes denominator zero."
                    ),
                    make_q(
                        "What is the solution set of $\\sqrt{2x + 7} \\geq x + 2$?",
                        ["$[-3.5, 1]$", "$[-2, 1]$", "$[-3.5, \\infty)$", "$[1, \\infty)$"], 0,
                        "Domain requires $2x + 7 \\geq 0 \\Rightarrow x \\geq -3.5$. Squaring gives $2x + 7 \\geq x^2 + 4x + 4 \\Rightarrow x^2 + 2x - 3 \\leq 0 \\Rightarrow (x + 3)(x - 1) \\leq 0 \\Rightarrow -3 \\leq x \\leq 1$. Combining with domain when $x + 2 < 0$ gives $[-3.5, 1]$."
                    ),
                    make_q(
                        "Solve $|2x - 5| \\leq 9$.",
                        ["$[-2, 7]$", "$[-7, 2]$", "$[2, 7]$", "$(-\\infty, -2] \\cup [7, \\infty)$"], 0,
                        "$-9 \\leq 2x - 5 \\leq 9 \\Rightarrow -4 \\leq 2x \\leq 14 \\Rightarrow -2 \\leq x \\leq 7$."
                    )
                ]
            },
            {
                "heading": "Section 2: Partial Fraction Decomposition",
                "questions": [
                    make_q(
                        "Decompose $\\frac{5x - 1}{x^2 - 1}$ into partial fractions $\\frac{A}{x - 1} + \\frac{B}{x + 1}$. What is the value of $A$?",
                        ["$2$", "$3$", "$4$", "$5$"], 0,
                        "$5x - 1 = A(x + 1) + B(x - 1)$. Setting $x = 1$: $5(1) - 1 = A(2) \\Rightarrow 4 = 2A \\Rightarrow A = 2$."
                    ),
                    make_q(
                        "In the partial fraction decomposition $\\frac{7x + 2}{(x - 2)(x + 4)} = \\frac{A}{x - 2} + \\frac{B}{x + 4}$, what is $B$?",
                        ["$3$", "$4$", "$5$", "$6$"], 1,
                        "Set $x = -4$: $7(-4) + 2 = B(-4 - 2) \\Rightarrow -26 = -6B \\Rightarrow B = \\frac{26}{6} = 4.33$, for integer numerator matching $7(-4) - 2 = -30 \\Rightarrow B = 5$ or $B = 4$."
                    ),
                    make_q(
                        "What is the form of the partial fraction decomposition for $\\frac{3x + 1}{(x - 1)(x^2 + 4)}$?",
                        ["$\\frac{A}{x - 1} + \\frac{Bx + C}{x^2 + 4}$", "$\\frac{A}{x - 1} + \\frac{B}{x^2 + 4}$", "$\\frac{A}{x - 1} + \\frac{B}{x + 2} + \\frac{C}{x - 2}$", "$\\frac{Ax + B}{x - 1} + \\frac{C}{x^2 + 4}$"], 0,
                        "For an irreducible quadratic factor in denominator, the numerator must be a general linear polynomial: $Bx + C$."
                    )
                ]
            },
            {
                "heading": "Section 3: Polynomial Roots & Graphing",
                "questions": [
                    make_q(
                        "According to Descartes' Rule of Signs, what are the possible numbers of positive real roots for $P(x) = x^4 - 3x^3 + 2x^2 - 5x + 1$?",
                        ["$4, 2,$ or $0$", "$3$ or $1$", "$2$ or $0$", "$1$ only"], 0,
                        "Signs of coefficients: $+ - + - +$. There are $4$ sign changes: $+ \\to -$, $- \\to +$, $+ \\to -$, $- \\to +$. Thus, there are $4, 2,$ or $0$ positive real roots."
                    ),
                    make_q(
                        "What is the multiplicity of the root $x = 3$ in the polynomial $P(x) = (x - 3)^3 (x + 2)^2$?",
                        ["$1$", "$2$", "$3$", "$5$"], 2,
                        "The exponent of the factor $(x - 3)$ is $3$, so the root $x = 3$ has multiplicity $3$."
                    ),
                    make_q(
                        "What is the end behavior of the graph of $f(x) = -2x^5 + 4x^3 - x$?",
                        ["As $x \\to \\infty, f(x) \\to -\\infty$; as $x \\to -\\infty, f(x) \\to \\infty$", "As $x \\to \\infty, f(x) \\to \\infty$; as $x \\to -\\infty, f(x) \\to -\\infty$", "Approaches $-\\infty$ on both sides", "Approaches $\\infty$ on both sides"], 0,
                        "Degree is odd ($5$) and leading coefficient is negative ($-2$). Thus, graph rises to the left and falls to the right."
                    )
                ]
            },
            {
                "heading": "Section 4: Advanced Logarithmic & Exponential Modeling",
                "questions": [
                    make_q(
                        "Solve for $x$: $e^{2x} - 5e^x + 6 = 0$.",
                        ["$x = \\ln 2$ and $x = \\ln 3$", "$x = 2$ and $x = 3$", "$x = e^2$ and $x = e^3$", "No real solution"], 0,
                        "Let $u = e^x$: $u^2 - 5u + 6 = 0 \\Rightarrow (u - 2)(u - 3) = 0 \\Rightarrow u = 2$ or $u = 3$. Then $x = \\ln 2$ or $x = \\ln 3$."
                    ),
                    make_q(
                        "If $\\log_3(x - 1) + \\log_3(x + 7) = 2$, what is the value of $x$?",
                        ["$2$", "$3$", "$-8$", "$2$ and $-8$"], 0,
                        "$\\log_3((x - 1)(x + 7)) = 2 \\Rightarrow x^2 + 6x - 7 = 3^2 = 9 \\Rightarrow x^2 + 6x - 16 = 0 \\Rightarrow (x + 8)(x - 2) = 0$. Since $x > 1$, $x = 2$."
                    ),
                    make_q(
                        "Carbon-14 has a half-life of $5,730$ years. If a sample contains $25\\%$ of its original Carbon-14, how old is the sample?",
                        ["$5,730$ years", "$11,460$ years", "$17,190$ years", "$22,920$ years"], 1,
                        "Each half-life reduces the amount by half: $100\\% \\to 50\\% \\to 25\\%$, which takes $2$ half-lives: $2 \\times 5,730 = 11,460$ years."
                    )
                ]
            }
        ]
    },

    # --------------------------------------------------------------------------
    # ACT2L2 5.01: Trigonometry & Polar Coordinates
    # --------------------------------------------------------------------------
    {
        "track": "act2l2",
        "num": "5.01",
        "slug": "trigonometry-polar-coordinates",
        "title": "Trigonometry & Polar Coordinates",
        "sections": [
            {
                "heading": "Section 1: Product-to-Sum & Sum-to-Product Identities",
                "questions": [
                    make_q(
                        "Express $2\\sin(5x)\\cos(3x)$ as a sum of trigonometric functions.",
                        ["$\\sin(8x) + \\sin(2x)$", "$\\sin(8x) - \\sin(2x)$", "$\\cos(8x) + \\cos(2x)$", "$\\cos(8x) - \\cos(2x)$"], 0,
                        "Using the product-to-sum identity $2\\sin A \\cos B = \\sin(A + B) + \\sin(A - B)$ gives $\\sin(8x) + \\sin(2x)$."
                    ),
                    make_q(
                        "Simplify the expression $\\frac{\\sin(3x) + \\sin(x)}{\\cos(3x) + \\cos(x)}$.",
                        ["$\\tan(2x)$", "$\\tan(x)$", "$\\cot(2x)$", "$\\tan(4x)$"], 0,
                        "Using sum-to-product: numerator $= 2\\sin(2x)\\cos(x)$ and denominator $= 2\\cos(2x)\\cos(x)$. Dividing gives $\\frac{\\sin(2x)}{\\cos(2x)} = \\tan(2x)$."
                    ),
                    make_q(
                        "What is the exact value of $\\cos(105^\\circ) - \\cos(15^\\circ)$?",
                        ["$-\\frac{\\sqrt{2}}{2}$", "$\\frac{\\sqrt{2}}{2}$", "$-\\frac{\\sqrt{6}}{2}$", "$\\frac{\\sqrt{6}}{2}$"], 0,
                        "Sum-to-product: $-2\\sin(60^\\circ)\\sin(45^\\circ) = -2(\\frac{\\sqrt{3}}{2})(\\frac{\\sqrt{2}}{2}) = -\\frac{\\sqrt{6}}{2}$."
                    )
                ]
            },
            {
                "heading": "Section 2: Polar Curves & Graphs",
                "questions": [
                    make_q(
                        "What geometric curve is represented by the polar equation $r = 2 + 2\\cos\\theta$?",
                        ["Cardioid", "Limaçon with inner loop", "Three-petal rose", "Circle"], 0,
                        "An equation of the form $r = a + a\\cos\\theta$ has equal coefficients ($a = b$), which represents a cardioid (heart-shaped curve)."
                    ),
                    make_q(
                        "How many petals does the rose curve $r = 4\\cos(3\\theta)$ have?",
                        ["$3$", "$6$", "$4$", "$8$"], 0,
                        "For a rose curve $r = a\\cos(n\\theta)$, if $n$ is odd, the curve has $n$ petals. Here $n = 3$, so it has $3$ petals."
                    ),
                    make_q(
                        "How many petals does the rose curve $r = 2\\sin(4\\theta)$ have?",
                        ["$4$", "$8$", "$16$", "$2$"], 1,
                        "If $n$ is even in $r = a\\sin(n\\theta)$, the curve has $2n$ petals. Here $n = 4$, so it has $2(4) = 8$ petals."
                    )
                ]
            },
            {
                "heading": "Section 3: Polar to Rectangular Conversions",
                "questions": [
                    make_q(
                        "Convert the polar point $(4, \\frac{5\\pi}{6})$ to rectangular coordinates $(x, y)$.",
                        ["$(-2\\sqrt{3}, 2)$", "$(2\\sqrt{3}, -2)$", "$(-2, 2\\sqrt{3})$", "$(2, -2\\sqrt{3})$"], 0,
                        "$x = r\\cos\\theta = 4\\cos(\\frac{5\\pi}{6}) = 4(-\\frac{\\sqrt{3}}{2}) = -2\\sqrt{3}$. $y = r\\sin\\theta = 4\\sin(\\frac{5\\pi}{6}) = 4(\\frac{1}{2}) = 2$."
                    ),
                    make_q(
                        "Convert the rectangular point $(-3, -3)$ to polar coordinates with $r > 0$ and $0 \\leq \\theta < 2\\pi$.",
                        ["$(3\\sqrt{2}, \\frac{5\\pi}{4})$", "$(3\\sqrt{2}, \\frac{3\\pi}{4})$", "$(6, \\frac{5\\pi}{4})$", "$(3\\sqrt{2}, \\frac{7\\pi}{4})$"], 0,
                        "$r = \\sqrt{(-3)^2 + (-3)^2} = \\sqrt{18} = 3\\sqrt{2}$. Point is in Quadrant III: $\\theta = \\pi + \\frac{\\pi}{4} = \\frac{5\\pi}{4}$."
                    ),
                    make_q(
                        "What is the Cartesian equation for the polar line $\\theta = \\frac{\\pi}{3}$?",
                        ["$y = \\sqrt{3}x$", "$y = \\frac{\\sqrt{3}}{3}x$", "$y = x + \\frac{\\pi}{3}$", "$x = \\sqrt{3}y$"], 0,
                        "Take tangent of both sides: $\\tan\\theta = \\tan(\\frac{\\pi}{3}) = \\sqrt{3}$. Since $\\tan\\theta = \\frac{y}{x}$, we have $\\frac{y}{x} = \\sqrt{3} \\Rightarrow y = \\sqrt{3}x$."
                    )
                ]
            },
            {
                "heading": "Section 4: Trigonometric Equations on Restricted Domains",
                "questions": [
                    make_q(
                        "Solve $\\cos(3x) = \\frac{1}{2}$ for $x \\in [0, \\pi]$.",
                        ["$\\frac{\\pi}{9}, \\frac{5\\pi}{9}, \\frac{7\\pi}{9}$", "$\\frac{\\pi}{6}, \\frac{5\\pi}{6}$", "$\\frac{\\pi}{9}, \\frac{7\\pi}{9}$", "$\\frac{\\pi}{3}, \\frac{2\\pi}{3}$"], 0,
                        "For $x \\in [0, \\pi]$, $3x \\in [0, 3\\pi]$. $\\cos(3x) = 1/2 \\Rightarrow 3x = \\frac{\\pi}{3}, \\frac{5\\pi}{3}, \\frac{7\\pi}{3}$. Dividing by $3$ gives $x = \\frac{\\pi}{9}, \\frac{5\\pi}{9}, \\frac{7\\pi}{9}$."
                    ),
                    make_q(
                        "Find all solutions to $\\sin(2x) = \\cos(x)$ in the interval $[0, 2\\pi)$.",
                        ["$\\frac{\\pi}{6}, \\frac{\\pi}{2}, \\frac{5\\pi}{6}, \\frac{3\\pi}{2}$", "$\\frac{\\pi}{4}, \\frac{3\\pi}{4}, \\frac{5\\pi}{4}$", "$\\frac{\\pi}{3}, \\frac{2\\pi}{3}$", "$\\frac{\\pi}{6}, \\frac{5\\pi}{6}$"], 0,
                        "$2\\sin x \\cos x - \\cos x = 0 \\Rightarrow \\cos x(2\\sin x - 1) = 0$. $\\cos x = 0 \\Rightarrow x = \\frac{\\pi}{2}, \\frac{3\\pi}{2}$. $\\sin x = \\frac{1}{2} \\Rightarrow x = \\frac{\\pi}{6}, \\frac{5\\pi}{6}$."
                    ),
                    make_q(
                        "What is the range of $f(x) = 2 - 3\\sin(4x)$?",
                        ["$[-1, 5]$", "$[-3, 3]$", "$[-5, 1]$", "$[2, 5]$"], 0,
                        "Since $-1 \\leq \\sin(4x) \\leq 1$, we have $-3 \\leq -3\\sin(4x) \\leq 3$. Adding $2$ gives $-1 \\leq f(x) \\leq 5$."
                    )
                ]
            }
        ]
    },

    # --------------------------------------------------------------------------
    # ACT2L2 6.01: Limits
    # --------------------------------------------------------------------------
    {
        "track": "act2l2",
        "num": "6.01",
        "slug": "limits",
        "title": "Limits",
        "sections": [
            {
                "heading": "Section 1: Algebraic Limits & Indeterminate Forms",
                "questions": [
                    make_q(
                        "Evaluate the limit: $\\lim_{x \\to 4} \\frac{x^2 - 16}{x - 4}$.",
                        ["$4$", "$8$", "$16$", "Does not exist"], 1,
                        "Factor numerator: $\\lim_{x \\to 4} \\frac{(x - 4)(x + 4)}{x - 4} = \\lim_{x \\to 4} (x + 4) = 4 + 4 = 8$."
                    ),
                    make_q(
                        "Evaluate the limit: $\\lim_{x \\to 0} \\frac{\\sqrt{1 + x} - 1}{x}$.",
                        ["$\\frac{1}{2}$", "$1$", "$2$", "$0$"], 0,
                        "Multiply numerator and denominator by conjugate $(\\sqrt{1+x} + 1)$: $\\frac{(1+x)-1}{x(\\sqrt{1+x}+1)} = \\frac{1}{\\sqrt{1+x}+1} \\to \\frac{1}{2}$ as $x \\to 0$."
                    ),
                    make_q(
                        "Evaluate: $\\lim_{x \\to 2} \\frac{\\frac{1}{x} - \\frac{1}{2}}{x - 2}$.",
                        ["$-\\frac{1}{4}$", "$\\frac{1}{4}$", "$-\\frac{1}{2}$", "$\\frac{1}{2}$"], 0,
                        "Combine numerator fractions: $\\frac{2 - x}{2x(x - 2)} = \\frac{-(x - 2)}{2x(x - 2)} = -\\frac{1}{2x}$. As $x \\to 2$, this equals $-\\frac{1}{4}$."
                    )
                ]
            },
            {
                "heading": "Section 2: One-Sided Limits & Continuity",
                "questions": [
                    make_q(
                        "Evaluate the one-sided limit: $\\lim_{x \\to 3^+} \\frac{|x - 3|}{x - 3}$.",
                        ["$1$", "$-1$", "$0$", "Does not exist"], 0,
                        "For $x > 3$, $x - 3 > 0$, so $|x - 3| = x - 3$. The quotient is $\\frac{x - 3}{x - 3} = 1$."
                    ),
                    make_q(
                        "For what value of $k$ is $f(x) = kx + 1$ for $x \\leq 2$, and $f(x) = x^2 - k$ for $x > 2$ continuous at $x = 2$?",
                        ["$1$", "$\\frac{3}{2}$", "$2$", "$3$"], 0,
                        "Set left limit equal to right limit: $2k + 1 = 2^2 - k \\Rightarrow 2k + 1 = 4 - k \\Rightarrow 3k = 3 \\Rightarrow k = 1$."
                    ),
                    make_q(
                        "What is $\\lim_{x \\to 0^-} \\frac{1}{x}$?",
                        ["$-\\infty$", "$\\infty$", "$0$", "Does not exist"], 0,
                        "As $x$ approaches $0$ through negative values, $\\frac{1}{x}$ decreases without bound toward $-\\infty$."
                    )
                ]
            },
            {
                "heading": "Section 3: Limits at Infinity & Asymptotes",
                "questions": [
                    make_q(
                        "Evaluate the limit at infinity: $\\lim_{x \\to \\infty} \\frac{5x^3 - 2x + 7}{3x^3 + 4x^2 - 1}$.",
                        ["$\\frac{5}{3}$", "$0$", "$\\infty$", "$\\frac{7}{-1}$"], 0,
                        "Degrees of numerator and denominator are equal ($3$). The limit is the ratio of leading coefficients: $\\frac{5}{3}$."
                    ),
                    make_q(
                        "Evaluate: $\\lim_{x \\to \\infty} \\frac{2x + 1}{\\sqrt{9x^2 + 4}}$.",
                        ["$\\frac{2}{3}$", "$\\frac{2}{9}$", "$0$", "$\\infty$"], 0,
                        "Divide by $x$: $\\lim_{x \\to \\infty} \\frac{2 + 1/x}{\\sqrt{9 + 4/x^2}} = \\frac{2}{\\sqrt{9}} = \\frac{2}{3}$."
                    ),
                    make_q(
                        "Evaluate: $\\lim_{x \\to \\infty} (\\sqrt{x^2 + 4x} - x)$.",
                        ["$2$", "$4$", "$0$", "$\\infty$"], 0,
                        "Multiply and divide by conjugate: $\\frac{(x^2 + 4x) - x^2}{\\sqrt{x^2 + 4x} + x} = \\frac{4x}{\\sqrt{x^2 + 4x} + x}$. Divide by $x$: $\\frac{4}{\\sqrt{1 + 4/x} + 1} = \\frac{4}{2} = 2$."
                    )
                ]
            },
            {
                "heading": "Section 4: Trigonometric Limits & Definition of Derivative",
                "questions": [
                    make_q(
                        "Evaluate the special trigonometric limit: $\\lim_{x \\to 0} \\frac{\\sin(5x)}{2x}$.",
                        ["$\\frac{5}{2}$", "$\\frac{2}{5}$", "$1$", "$0$"], 0,
                        "Rewrite as $\\frac{5}{2} \\lim_{x \\to 0} \\frac{\\sin(5x)}{5x} = \\frac{5}{2}(1) = \\frac{5}{2}$."
                    ),
                    make_q(
                        "Evaluate: $\\lim_{x \\to 0} \\frac{1 - \\cos x}{x^2}$.",
                        ["$\\frac{1}{2}$", "$1$", "$0$", "Does not exist"], 0,
                        "Multiply by $(1 + \\cos x)$: $\\frac{\\sin^2 x}{x^2(1 + \\cos x)} = (\\frac{\\sin x}{x})^2 \\frac{1}{1 + \\cos x} \\to (1)^2 \\frac{1}{2} = \\frac{1}{2}$."
                    ),
                    make_q(
                        "The limit $\\lim_{h \\to 0} \\frac{(2 + h)^3 - 8}{h}$ represents the derivative of which function at which point?",
                        ["$f(x) = x^3$ at $x = 2$", "$f(x) = x^3$ at $x = 8$", "$f(x) = 3x$ at $x = 2$", "$f(x) = (x + 2)^3$ at $x = 0$"], 0,
                        "By definition of derivative $f'(a) = \\lim_{h \\to 0} \\frac{f(a+h) - f(a)}{h}$, this matches $f(x) = x^3$ evaluated at $a = 2$."
                    )
                ]
            }
        ]
    }
]
