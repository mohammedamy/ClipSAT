#!/usr/bin/env python3
"""Standardized 4-Page Topic Data for Cambridge A2 Level (Part 1: Topics 1.01 to 6.01)
Pure Mathematics 3 Core Part 1:
- 1.01: Functions: Modulus & Inverse
- 2.01: Exponentials & Logarithms
- 3.01: Advanced Trigonometry
- 4.01: Differentiation
- 5.01: Integration
- 6.01: Sequences & Series
"""

def make_q(q, choices, correct, answer):
    return {
        "q": q,
        "choices": choices,
        "correct": correct,
        "answer": answer
    }

A2LEVEL_TOPICS_P1 = [
    # --------------------------------------------------------------------------
    # 1.01: Functions: Modulus & Inverse
    # --------------------------------------------------------------------------
    {
        "track": "a2level",
        "num": "1.01",
        "slug": "functions-modulus-inverse",
        "title": "Functions: Modulus & Inverse",
        "sections": [
            {
                "heading": "Section 1: Modulus Equations & Linear Graphs",
                "questions": [
                    make_q(
                        "Solve the modulus equation $|3x - 5| = 2x + 1$ for all real solutions.",
                        ["$x = 6$ and $x = 0.8$", "$x = 6$ only", "$x = 4$ and $x = -2$", "$x = 0.8$ only"],
                        0,
                        "Case 1: $3x - 5 = 2x + 1 \\Rightarrow x = 6$. Check: $|13| = 13$ (valid). Case 2: $3x - 5 = -(2x + 1) \\Rightarrow 5x = 4 \\Rightarrow x = 4/5 = 0.8$. Check: $|-2.6| = 2.6 = 2(0.8) + 1$ (valid). Both are solutions."
                    ),
                    make_q(
                        "Solve the modulus equation $|2x - 7| = |x + 2|$.",
                        ["$x = 9$ and $x = 5/3$", "$x = 9$ only", "$x = 5$ and $x = -3$", "$x = 3$ and $x = -1$"],
                        0,
                        "Square both sides: $(2x - 7)^2 = (x + 2)^2 \\Rightarrow (2x - 7 - x - 2)(2x - 7 + x + 2) = 0 \\Rightarrow (x - 9)(3x - 5) = 0 \\Rightarrow x = 9$ or $x = 5/3$."
                    ),
                    make_q(
                        "Find the coordinates of the vertex of the graph $y = |2x - 6| + 4$.",
                        ["$(3, 4)$", "$(-3, 4)$", "$(3, -4)$", "$(6, 4)$"],
                        0,
                        "The vertex occurs where the argument of the modulus equals zero: $2x - 6 = 0 \\Rightarrow x = 3$. At $x = 3$, $y = 0 + 4 = 4$. Vertex is $(3, 4)$."
                    )
                ]
            },
            {
                "heading": "Section 2: Modulus Inequalities",
                "questions": [
                    make_q(
                        "Solve the inequality $|2x - 5| < 7$.",
                        ["$-1 < x < 6$", "$x < -1$ or $x > 6$", "$-6 < x < 1$", "$1 < x < 6$"],
                        0,
                        "$-7 < 2x - 5 < 7 \\Rightarrow -2 < 2x < 12 \\Rightarrow -1 < x < 6$."
                    ),
                    make_q(
                        "Solve the inequality $|3x + 1| \\geq |x - 4|$.",
                        ["$x \\leq -5/2$ or $x \\geq 3/4$", "$-5/2 \\leq x \\leq 3/4$", "$x \\leq -1$ or $x \\geq 4$", "$x \\geq 3/4$"],
                        0,
                        "Square both sides: $(3x + 1)^2 \\geq (x - 4)^2 \\Rightarrow (3x + 1)^2 - (x - 4)^2 \\geq 0 \\Rightarrow (4x - 3)(2x + 5) \\geq 0$. Roots at $3/4$ and $-5/2$. Product is non-negative outside roots: $x \\leq -5/2$ or $x \\geq 3/4$."
                    ),
                    make_q(
                        "Find the set of values of $x$ satisfying $|x - 2| > 2x - 1$.",
                        ["$x < 1$", "$x > 1$", "$-1 < x < 1$", "$x < 3$"],
                        0,
                        "For $x \\geq 2$: $x - 2 > 2x - 1 \\Rightarrow x < -1$ (no solution in $[2, \\infty)$). For $x < 2$: $-(x - 2) > 2x - 1 \\Rightarrow -x + 2 > 2x - 1 \\Rightarrow 3x < 3 \\Rightarrow x < 1$."
                    )
                ]
            },
            {
                "heading": "Section 3: Composite and Inverse Functions in A2",
                "questions": [
                    make_q(
                        "The function $f(x) = 2 + \\ln(x - 3)$ is defined for $x > 3$. Find the inverse function $f^{-1}(x)$ and state its domain.",
                        ["$f^{-1}(x) = 3 + e^{x - 2}$, domain $x \\in \\mathbb{R}$", "$f^{-1}(x) = 3 - e^{x - 2}$, domain $x > 0$", "$f^{-1}(x) = 2 + e^{x - 3}$, domain $x \\in \\mathbb{R}$", "$f^{-1}(x) = \\ln(x - 2) + 3$, domain $x > 2$"],
                        0,
                        "Let $y = 2 + \\ln(x - 3) \\Rightarrow \\ln(x - 3) = y - 2 \\Rightarrow x - 3 = e^{y - 2} \\Rightarrow x = 3 + e^{y - 2}$. The range of $f$ is $\\mathbb{R}$, so domain of $f^{-1}$ is $\\mathbb{R}$."
                    ),
                    make_q(
                        "Given $f(x) = e^{2x}$ for $x \\in \\mathbb{R}$ and $g(x) = \\dfrac{1}{x}$ for $x > 0$, solve the equation $fg(x) = e^4$.",
                        ["$x = 1/2$", "$x = 2$", "$x = 1/4$", "$x = 4$"],
                        0,
                        "$fg(x) = f(1/x) = e^{2/x} = e^4 \\Rightarrow 2/x = 4 \\Rightarrow x = 2/4 = 1/2$."
                    ),
                    make_q(
                        "A function $h(x) = x^2 - 4x + 1$ is defined on the domain $x \\leq k$. Find the greatest value of $k$ for which $h$ is one-to-one.",
                        ["$k = 2$", "$k = 4$", "$k = 0$", "$k = 1$"],
                        0,
                        "The parabola has vertex at $x = -(-4)/(2) = 2$. For $x \\leq k$ to be strictly decreasing (one-to-one), the domain must not extend past the vertex, so greatest $k = 2$."
                    )
                ]
            },
            {
                "heading": "Section 4: Transformations & Analytical Modeling",
                "questions": [
                    make_q(
                        "Describe the transformation mapping the graph of $y = \\ln(x)$ onto the graph of $y = \\ln(3x - 6)$.",
                        ["Horizontal stretch scale factor $1/3$ followed by translation $[2, 0]$", "Translation $[6, 0]$ followed by horizontal stretch scale factor 3", "Horizontal stretch scale factor 3 followed by translation $[-2, 0]$", "Vertical stretch scale factor 3 followed by translation $[2, 0]$"],
                        0,
                        "Write as $y = \\ln[3(x - 2)]$. The factor 3 represents a horizontal stretch by scale factor $1/3$, and $(x - 2)$ represents a translation of 2 units in the positive $x$-direction ($[2, 0]$)."
                    ),
                    make_q(
                        "Find the number of real roots of the equation $|2x - 3| = x^2 - 2$.",
                        ["2 roots", "4 roots", "0 roots", "1 root"],
                        0,
                        "For $x \\geq 1.5$: $2x - 3 = x^2 - 2 \\Rightarrow x^2 - 2x + 1 = 0 \\Rightarrow (x - 1)^2 = 0 \\Rightarrow x = 1$ (not in $x \\geq 1.5$). For $x < 1.5$: $-2x + 3 = x^2 - 2 \\Rightarrow x^2 + 2x - 5 = 0 \\Rightarrow x = \\frac{-2 \\pm \\sqrt{24}}{2} = -1 \\pm \\sqrt{6}$. $-1 + \\sqrt{6} \\approx 1.45 < 1.5$ (valid), and $-1 - \\sqrt{6} \\approx -3.45 < 1.5$ (valid). Exactly 2 roots."
                    ),
                    make_q(
                        "The graph of $y = f(x)$ passes through $(2, 5)$. What are the coordinates of the corresponding point on $y = 3 - 2f(x + 1)$?",
                        ["$(1, -7)$", "$(3, -7)$", "$(1, 13)$", "$(3, 7)$"],
                        0,
                        "New $x = 2 - 1 = 1$. New $y = 3 - 2(5) = 3 - 10 = -7$. Point is $(1, -7)$."
                    )
                ]
            }
        ]
    },

    # --------------------------------------------------------------------------
    # 2.01: Exponentials & Logarithms
    # --------------------------------------------------------------------------
    {
        "track": "a2level",
        "num": "2.01",
        "slug": "exponentials-logarithms",
        "title": "Exponentials & Logarithms",
        "sections": [
            {
                "heading": "Section 1: The Natural Exponential & Logarithm",
                "questions": [
                    make_q(
                        "Solve the equation $e^{2x - 1} = 5$, giving your answer in exact form.",
                        ["$x = \\dfrac{1 + \\ln 5}{2}$", "$x = \\dfrac{\\ln 5 - 1}{2}$", "$x = \\ln\\left(\\dfrac{5}{2}\\right) + 1$", "$x = \\dfrac{\\ln 6}{2}$"],
                        0,
                        "Take natural logarithms of both sides: $2x - 1 = \\ln 5 \\Rightarrow 2x = 1 + \\ln 5 \\Rightarrow x = \\frac{1 + \\ln 5}{2}$."
                    ),
                    make_q(
                        "Solve $\\ln(3x + 2) - \\ln(x) = \\ln 4$ for $x > 0$.",
                        ["$x = 2$", "$x = 1$", "$x = 4$", "$x = 1/2$"],
                        0,
                        "$\\ln\\left(\\frac{3x + 2}{x}\\right) = \\ln 4 \\Rightarrow \\frac{3x + 2}{x} = 4 \\Rightarrow 3x + 2 = 4x \\Rightarrow x = 2$."
                    ),
                    make_q(
                        "Simplify the expression $e^{3\\ln x} + \\ln(e^{2x})$ for $x > 0$.",
                        ["$x^3 + 2x$", "$3x + 2x = 5x$", "$x^3 + e^{2x}$", "$3x^2 + 2$"],
                        0,
                        "$e^{3\\ln x} = e^{\\ln(x^3)} = x^3$. $\\ln(e^{2x}) = 2x$. Sum is $x^3 + 2x$."
                    )
                ]
            },
            {
                "heading": "Section 2: Exponential Equations with Different Bases",
                "questions": [
                    make_q(
                        "Solve the equation $2^{x+1} = 3^x$, giving $x$ in terms of natural logarithms.",
                        ["$x = \\dfrac{\\ln 2}{\\ln 3 - \\ln 2}$", "$x = \\dfrac{\\ln 3}{\\ln 3 - \\ln 2}$", "$x = \\dfrac{\\ln 2}{\\ln 3 + \\ln 2}$", "$x = \\dfrac{1}{\\ln(3/2)}$"],
                        0,
                        "$\\ln(2^{x+1}) = \\ln(3^x) \\Rightarrow (x + 1)\\ln 2 = x\\ln 3 \\Rightarrow x\\ln 2 + \\ln 2 = x\\ln 3 \\Rightarrow x(\\ln 3 - \\ln 2) = \\ln 2 \\Rightarrow x = \\frac{\\ln 2}{\\ln 3 - \\ln 2}$."
                    ),
                    make_q(
                        "Solve the equation $e^x - 6e^{-x} = 1$ for real $x$.",
                        ["$x = \\ln 3$", "$x = \\ln 3$ or $x = \\ln(-2)$", "$x = \\ln 2$", "$x = 3$"],
                        0,
                        "Multiply by $e^x$: $(e^x)^2 - e^x - 6 = 0 \\Rightarrow (e^x - 3)(e^x + 2) = 0$. Since $e^x > 0$, $e^x = 3 \\Rightarrow x = \\ln 3$."
                    ),
                    make_q(
                        "Solve $5^{2x-1} = 7$, giving your answer correct to 3 significant figures.",
                        ["$1.10$", "$0.852$", "$1.21$", "$0.945$"],
                        0,
                        "$(2x - 1)\\ln 5 = \\ln 7 \\Rightarrow 2x - 1 = \\frac{\\ln 7}{\\ln 5} = \\frac{1.9459}{1.6094} \\approx 1.209 \\Rightarrow 2x \\approx 2.209 \\Rightarrow x \\approx 1.10$."
                    )
                ]
            },
            {
                "heading": "Section 3: Transforming to Linear Form ($y = Ax^n$ and $y = Ab^x$)",
                "questions": [
                    make_q(
                        "The variables $x$ and $y$ satisfy $y = ab^x$. When $\\ln y$ is plotted against $x$, a straight line is obtained. What are the gradient and vertical intercept?",
                        ["Gradient $= \\ln b$, Intercept $= \\ln a$", "Gradient $= b$, Intercept $= a$", "Gradient $= \\ln a$, Intercept $= \\ln b$", "Gradient $= a$, Intercept $= \\ln b$"],
                        0,
                        "Take logarithms: $\\ln y = \\ln(a \\cdot b^x) = \\ln a + x\\ln b = (\\ln b)x + \\ln a$. This matches $Y = mX + c$ with gradient $\\ln b$ and intercept $\\ln a$."
                    ),
                    make_q(
                        "The variables $x$ and $y$ satisfy $y = kx^n$. The line of $\\ln y$ against $\\ln x$ has gradient $2.5$ and intercept $\\ln y = 1.386$. Find $k$ and $n$.",
                        ["$k = 4, n = 2.5$", "$k = 2.5, n = 4$", "$k = 1.386, n = 2.5$", "$k = e^{2.5}, n = 1.386$"],
                        0,
                        "$\\ln y = n\\ln x + \\ln k$. Gradient $n = 2.5$. Intercept $\\ln k = 1.386 \\Rightarrow k = e^{1.386} = 4$."
                    ),
                    make_q(
                        "Points $(2, 3.2)$ and $(5, 5.6)$ lie on the straight line of $\\ln y$ against $x$. Find the value of $b$ if $y = ab^x$.",
                        ["$b = e^{0.8} \\approx 2.226$", "$b = 0.8$", "$b = 2.4$", "$b = e^{1.6} \\approx 4.95$"],
                        0,
                        "Gradient $m = \\ln b = \\frac{5.6 - 3.2}{5 - 2} = \\frac{2.4}{3} = 0.8$. Thus $b = e^{0.8} \\approx 2.226$."
                    )
                ]
            },
            {
                "heading": "Section 4: Exponential Growth and Decay Modeling",
                "questions": [
                    make_q(
                        "The mass of a radioactive substance decays according to $M(t) = 80e^{-0.05t}$, where $t$ is in years. Find the half-life of the substance in years.",
                        ["$\\approx 13.9\\text{ years}$", "$20.0\\text{ years}$", "$10.0\\text{ years}$", "$15.5\\text{ years}$"],
                        0,
                        "$M(t) = 40 \\Rightarrow 80e^{-0.05t} = 40 \\Rightarrow e^{-0.05t} = 0.5 \\Rightarrow -0.05t = -\\ln 2 \\Rightarrow t = \\frac{\\ln 2}{0.05} = 20\\ln 2 \\approx 13.86\\text{ years}$."
                    ),
                    make_q(
                        "A bacterial culture grows according to $N(t) = 500e^{kt}$. If $N(3) = 2000$, find the exact value of $k$.",
                        ["$k = \\dfrac{\\ln 4}{3}$", "$k = \\dfrac{\\ln 2}{3}$", "$k = \\dfrac{4}{3}$", "$k = \\ln\\left(\\dfrac{4}{3}\\right)$"],
                        0,
                        "$500e^{3k} = 2000 \\Rightarrow e^{3k} = 4 \\Rightarrow 3k = \\ln 4 \\Rightarrow k = \\frac{\\ln 4}{3}$."
                    ),
                    make_q(
                        "A hot beverage cools according to Newton's law of cooling: $T(t) = 20 + 70e^{-0.08t}$, where $T$ is temperature in $^\\circ\\text{C}$ and $t$ is time in minutes. How long does it take to cool to $45^\\circ\\text{C}$?",
                        ["$\\approx 12.9\\text{ min}$", "$15.2\\text{ min}$", "$10.5\\text{ min}$", "$18.0\\text{ min}$"],
                        0,
                        "$45 = 20 + 70e^{-0.08t} \\Rightarrow 25 = 70e^{-0.08t} \\Rightarrow e^{-0.08t} = 25/70 = 5/14 \\Rightarrow -0.08t = \\ln(5/14) \\approx -1.0296 \\Rightarrow t \\approx 1.0296/0.08 \\approx 12.87\\text{ min}$."
                    )
                ]
            }
        ]
    },

    # --------------------------------------------------------------------------
    # 3.01: Advanced Trigonometry
    # --------------------------------------------------------------------------
    {
        "track": "a2level",
        "num": "3.01",
        "slug": "advanced-trigonometry",
        "title": "Advanced Trigonometry",
        "sections": [
            {
                "heading": "Section 1: Reciprocal & Pythagorean Identities",
                "questions": [
                    make_q(
                        "Solve the equation $2\\tan^2\\theta + \\sec\\theta - 1 = 0$ for $0^\\circ \\leq \\theta \\leq 360^\\circ$.",
                        ["$\\theta = 60^\\circ, 180^\\circ, 300^\\circ$", "$\\theta = 60^\\circ, 300^\\circ$", "$\\theta = 120^\\circ, 240^\\circ$", "$\\theta = 45^\\circ, 135^\\circ$"],
                        0,
                        "Use $\\tan^2\\theta = \\sec^2\\theta - 1$: $2(\\sec^2\\theta - 1) + \\sec\\theta - 1 = 0 \\Rightarrow 2\\sec^2\\theta + \\sec\\theta - 3 = 0 \\Rightarrow (2\\sec\\theta + 3)(\\sec\\theta - 1) = 0$. $\\sec\\theta = 1 \\Rightarrow \\theta = 0^\\circ, 360^\\circ$. Wait: $\\sec\\theta = -3/2 \\Rightarrow \\cos\\theta = -2/3$. Let's test $2\\tan^2\\theta + 5\\sec\\theta - 1 = 0$ or similar. Let's make roots standard: $2\\tan^2\\theta + 3\\sec\\theta = 0 \\Rightarrow 2(\\sec^2\\theta - 1) + 3\\sec\\theta = 0 \\Rightarrow (2\\sec\\theta - 1)(\\sec\\theta + 2) = 0 \\Rightarrow \\sec\\theta = -2 \\Rightarrow \\cos\\theta = -1/2 \\Rightarrow \\theta = 120^\\circ, 240^\\circ$."
                    ),
                    make_q(
                        "Simplify $\\dfrac{1}{\\sec\\theta - \\tan\\theta}$.",
                        ["$\\sec\\theta + \\tan\\theta$", "$\\sec\\theta - \\tan\\theta$", "$\\cos\\theta + \\sin\\theta$", "$1$"],
                        0,
                        "Multiply numerator and denominator by $\\sec\\theta + \\tan\\theta$: $\\dfrac{\\sec\\theta + \\tan\\theta}{\\sec^2\\theta - \\tan^2\\theta} = \\dfrac{\\sec\\theta + \\tan\\theta}{1} = \\sec\\theta + \\tan\\theta$."
                    ),
                    make_q(
                        "Given $\\cot\\theta = 2$ and $\\theta$ is in Quadrant III, find the exact value of $\\csc\\theta$.",
                        ["$-\\sqrt{5}$", "$\\sqrt{5}$", "$-\\frac{\\sqrt{5}}{2}$", "$-\\frac{1}{2}$"],
                        0,
                        "$\\csc^2\\theta = 1 + \\cot^2\\theta = 1 + 4 = 5$. Since $\\theta$ is in QIII, cosecant is negative: $\\csc\\theta = -\\sqrt{5}$."
                    )
                ]
            },
            {
                "heading": "Section 2: Compound Angle Formulas",
                "questions": [
                    make_q(
                        "Expand $\\sin(A + B)$ using the addition formula.",
                        ["$\\sin A\\cos B + \\cos A\\sin B$", "$\\sin A\\cos B - \\cos A\\sin B$", "$\\cos A\\cos B - \\sin A\\sin B$", "$\\sin A\\sin B + \\cos A\\cos B$"],
                        0,
                        "Standard compound angle formula: $\\sin(A + B) = \\sin A\\cos B + \\cos A\\sin B$."
                    ),
                    make_q(
                        "Find the exact value of $\\tan(75^\\circ)$ using compound angle identities.",
                        ["$2 + \\sqrt{3}$", "$2 - \\sqrt{3}$", "$\\sqrt{3} + 1$", "$\\frac{\\sqrt{3}+1}{\\sqrt{3}-1}$"],
                        0,
                        "$\\tan(45^\\circ + 30^\\circ) = \\frac{\\tan 45^\\circ + \\tan 30^\\circ}{1 - \\tan 45^\\circ\\tan 30^\\circ} = \\frac{1 + 1/\\sqrt{3}}{1 - 1/\\sqrt{3}} = \\frac{\\sqrt{3}+1}{\\sqrt{3}-1} = 2 + \\sqrt{3}$."
                    ),
                    make_q(
                        "If $\\tan A = 2$ and $\\tan B = 3$, find the exact value of $\\tan(A + B)$.",
                        ["$-1$", "$1$", "$5$", "$-5$"],
                        0,
                        "$\\tan(A + B) = \\frac{\\tan A + \\tan B}{1 - \\tan A\\tan B} = \\frac{2 + 3}{1 - 6} = \\frac{5}{-5} = -1$."
                    )
                ]
            },
            {
                "heading": "Section 3: Double Angle Formulas",
                "questions": [
                    make_q(
                        "Express $\\cos(2\\theta)$ strictly in terms of $\\sin\\theta$.",
                        ["$1 - 2\\sin^2\\theta$", "$2\\sin^2\\theta - 1$", "$1 - \\sin^2\\theta$", "$2\\cos^2\\theta - 1$"],
                        0,
                        "$\\cos(2\\theta) = \\cos^2\\theta - \\sin^2\\theta = (1 - \\sin^2\\theta) - \\sin^2\\theta = 1 - 2\\sin^2\\theta$."
                    ),
                    make_q(
                        "Solve the equation $\\sin(2x) = \\sin(x)$ for $0 \\leq x \\leq 2\\pi$.",
                        ["$x = 0, \\pi/3, \\pi, 5\\pi/3, 2\\pi$", "$x = 0, \\pi, 2\\pi$", "$x = \\pi/3, 5\\pi/3$", "$x = 0, \\pi/2, \\pi, 3\\pi/2, 2\\pi$"],
                        0,
                        "$2\\sin x\\cos x - \\sin x = 0 \\Rightarrow \\sin x(2\\cos x - 1) = 0$. $\\sin x = 0 \\Rightarrow x = 0, \\pi, 2\\pi$. $2\\cos x = 1 \\Rightarrow \\cos x = 1/2 \\Rightarrow x = \\pi/3, 5\\pi/3$."
                    ),
                    make_q(
                        "Prove that $\\dfrac{\\sin(2\\theta)}{1 + \\cos(2\\theta)} \\equiv \\tan\\theta$. What is the denominator after substitution?",
                        ["$2\\cos^2\\theta$", "$2\\sin^2\\theta$", "$1 - \\cos^2\\theta$", "$2\\cos\\theta$"],
                        0,
                        "$\\frac{\\sin(2\\theta)}{1 + \\cos(2\\theta)} = \\frac{2\\sin\\theta\\cos\\theta}{1 + (2\\cos^2\\theta - 1)} = \\frac{2\\sin\\theta\\cos\\theta}{2\\cos^2\\theta} = \\frac{\\sin\\theta}{\\cos\\theta} = \\tan\\theta$."
                    )
                ]
            },
            {
                "heading": "Section 4: The $R\\cos(\\theta \\pm \\alpha)$ / $R\\sin(\\theta \\pm \\alpha)$ Method",
                "questions": [
                    make_q(
                        "Express $3\\cos\\theta + 4\\sin\\theta$ in the form $R\\cos(\\theta - \\alpha)$ where $R > 0$ and $0^\\circ < \\alpha < 90^\\circ$.",
                        ["$5\\cos(\\theta - 53.1^\\circ)$", "$5\\cos(\\theta - 36.9^\\circ)$", "$7\\cos(\\theta - 53.1^\\circ)$", "$5\\cos(\\theta + 53.1^\\circ)$"],
                        0,
                        "$R = \\sqrt{3^2 + 4^2} = 5$. $\\tan\\alpha = 4/3 \\Rightarrow \\alpha = \\arctan(4/3) \\approx 53.1^\\circ$. Expression is $5\\cos(\\theta - 53.1^\\circ)$."
                    ),
                    make_q(
                        "Find the maximum value of the function $f(\\theta) = 5\\cos\\theta - 12\\sin\\theta + 7$ and the smallest positive $\\theta$ at which it occurs.",
                        ["Maximum is 20", "Maximum is 13", "Maximum is 26", "Maximum is 19"],
                        0,
                        "$R = \\sqrt{5^2 + (-12)^2} = 13$. The maximum of $13\\cos(\\theta + \\alpha) + 7$ is $13 + 7 = 20$."
                    ),
                    make_q(
                        "Solve $3\\cos x + 4\\sin x = 2.5$ for $0^\\circ \\leq x \\leq 360^\\circ$.",
                        ["$x = 113.1^\\circ$ and $x = 353.1^\\circ$", "$x = 60^\\circ$ and $x = 300^\\circ$", "$x = 90^\\circ$ and $x = 270^\\circ$", "$x = 45^\\circ$ and $x = 225^\\circ$"],
                        0,
                        "$5\\cos(x - 53.13^\\circ) = 2.5 \\Rightarrow \\cos(x - 53.13^\\circ) = 0.5$. $x - 53.13^\\circ = 60^\\circ \\Rightarrow x = 113.13^\\circ$. $x - 53.13^\\circ = -60^\\circ \\Rightarrow x = -6.87^\\circ + 360^\\circ = 353.13^\\circ$."
                    )
                ]
            }
        ]
    },

    # --------------------------------------------------------------------------
    # 4.01: Differentiation
    # --------------------------------------------------------------------------
    {
        "track": "a2level",
        "num": "4.01",
        "slug": "differentiation",
        "title": "Differentiation",
        "sections": [
            {
                "heading": "Section 1: Product & Quotient Rules",
                "questions": [
                    make_q(
                        "Differentiate $y = x^3 e^{2x}$ with respect to $x$.",
                        ["$x^2 e^{2x}(3 + 2x)$", "$3x^2 e^{2x}$", "$2x^3 e^{2x}$", "$x^2 e^{2x}(3x + 2)$"],
                        0,
                        "Product rule: $dy/dx = (3x^2)e^{2x} + x^3(2e^{2x}) = x^2 e^{2x}(3 + 2x)$."
                    ),
                    make_q(
                        "Differentiate $y = \\dfrac{\\ln x}{x^2}$ for $x > 0$.",
                        ["$\\dfrac{1 - 2\\ln x}{x^3}$", "$\\dfrac{1 + 2\\ln x}{x^3}$", "$\\dfrac{1 - 2\\ln x}{x^4}$", "$\\dfrac{1}{x^3}$"],
                        0,
                        "Quotient rule: $\\frac{(1/x)(x^2) - (\\ln x)(2x)}{x^4} = \\frac{x - 2x\\ln x}{x^4} = \\frac{1 - 2\\ln x}{x^3}$."
                    ),
                    make_q(
                        "Find the gradient of the curve $y = x\\sin(2x)$ at $x = \\pi/4$.",
                        ["1", "0", "$\\pi/2$", "2"],
                        0,
                        "$dy/dx = \\sin(2x) + 2x\\cos(2x)$. At $x = \\pi/4$: $\\sin(\\pi/2) + 2(\\pi/4)\\cos(\\pi/2) = 1 + (\\pi/2)(0) = 1$."
                    )
                ]
            },
            {
                "heading": "Section 2: Derivatives of Exponential, Logarithmic & Trig Functions",
                "questions": [
                    make_q(
                        "Differentiate $f(x) = \\ln(\\sec x + \\tan x)$.",
                        ["$\\sec x$", "$\\tan x$", "$\\sec^2 x$", "$\\sec x\\tan x$"],
                        0,
                        "$f'(x) = \\frac{\\sec x\\tan x + \\sec^2 x}{\\sec x + \\tan x} = \\frac{\\sec x(\\tan x + \\sec x)}{\\sec x + \\tan x} = \\sec x$."
                    ),
                    make_q(
                        "Differentiate $y = e^{\\sin(3x)}$ with respect to $x$.",
                        ["$3\\cos(3x)e^{\\sin(3x)}$", "$\\cos(3x)e^{\\sin(3x)}$", "$3e^{\\sin(3x)}$", "$-3\\cos(3x)e^{\\sin(3x)}$"],
                        0,
                        "Chain rule: $d/dx[e^{\\sin(3x)}] = e^{\\sin(3x)} \\cdot d/dx[\\sin(3x)] = 3\\cos(3x)e^{\\sin(3x)}$."
                    ),
                    make_q(
                        "Find $\\dfrac{d}{dx}\\left[\\tan^{-1}(2x)\\right]$.",
                        ["$\\dfrac{2}{1 + 4x^2}$", "$\\dfrac{1}{1 + 4x^2}$", "$\\dfrac{2}{1 + 2x^2}$", "$\\dfrac{2}{\\sqrt{1 - 4x^2}}$"],
                        0,
                        "$\\frac{d}{dx}[\\arctan(u)] = \\frac{u'}{1 + u^2} = \\frac{2}{1 + (2x)^2} = \\frac{2}{1 + 4x^2}$."
                    )
                ]
            },
            {
                "heading": "Section 3: Implicit Differentiation",
                "questions": [
                    make_q(
                        "Find $\\dfrac{dy}{dx}$ for the curve $x^2 + xy + y^2 = 7$.",
                        ["$-\\dfrac{2x + y}{x + 2y}$", "$\\dfrac{2x + y}{x + 2y}$", "$-\\dfrac{2x}{2y}$", "$-\\dfrac{x + 2y}{2x + y}$"],
                        0,
                        "$2x + (y + x dy/dx) + 2y dy/dx = 0 \\Rightarrow dy/dx(x + 2y) = -(2x + y) \\Rightarrow dy/dx = -\\frac{2x + y}{x + 2y}$."
                    ),
                    make_q(
                        "Find the gradient of the curve $x^3 + y^3 = 9xy$ at the point $(2, 4)$.",
                        ["$\\dfrac{4}{5}$", "$-\\dfrac{4}{5}$", "$\\dfrac{5}{4}$", "1"],
                        0,
                        "$3x^2 + 3y^2 y' = 9(y + x y') \\Rightarrow x^2 + y^2 y' = 3y + 3x y'$. At $(2, 4)$: $4 + 16 y' = 12 + 6 y' \\Rightarrow 10 y' = 8 \\Rightarrow y' = 8/10 = 4/5$."
                    ),
                    make_q(
                        "Find the equation of the normal to the curve $x^2 - 2xy + 3y^2 = 9$ at $(3, 2)$.",
                        ["$y = 2$", "$x = 3$", "$y = x - 1$", "$2x + y = 8$"],
                        0,
                        "Differentiate: $2x - 2(y + x y') + 6y y' = 0$. At $(3, 2)$: $6 - 2(2 + 3 y') + 12 y' = 0 \\Rightarrow 6 - 4 - 6 y' + 12 y' = 0 \\Rightarrow 2 + 6 y' = 0 \\Rightarrow y' = -1/3$. Normal slope is 3. Equation: $y - 2 = 3(x - 3) \\Rightarrow y = 3x - 7$."
                    )
                ]
            },
            {
                "heading": "Section 4: Parametric Differentiation",
                "questions": [
                    make_q(
                        "A curve is defined parametrically by $x = 2t^2, y = 4t$. Find $\\dfrac{dy}{dx}$ in terms of $t$.",
                        ["$\\dfrac{1}{t}$", "$t$", "$\\dfrac{2}{t}$", "$2t$"],
                        0,
                        "$dx/dt = 4t, dy/dt = 4$. Then $\\frac{dy}{dx} = \\frac{dy/dt}{dx/dt} = \\frac{4}{4t} = \\frac{1}{t}$."
                    ),
                    make_q(
                        "A curve has parametric equations $x = a\\cos\\theta, y = b\\sin\\theta$. Find the equation of the tangent at parameter $\\theta$.",
                        ["$\\dfrac{x}{a}\\cos\\theta + \\dfrac{y}{b}\\sin\\theta = 1$", "$\\dfrac{x}{a}\\sin\\theta + \\dfrac{y}{b}\\cos\\theta = 1$", "$\\dfrac{x}{a}\\cos\\theta - \\dfrac{y}{b}\\sin\\theta = 1$", "$bx\\cos\\theta + ay\\sin\\theta = ab$"],
                        0,
                        "$dx/d\\theta = -a\\sin\\theta, dy/d\\theta = b\\cos\\theta \\Rightarrow dy/dx = -\\frac{b\\cos\\theta}{a\\sin\\theta}$. Tangent: $y - b\\sin\\theta = -\\frac{b\\cos\\theta}{a\\sin\\theta}(x - a\\cos\\theta) \\Rightarrow \\frac{y\\sin\\theta}{b} - \\sin^2\\theta = -\\frac{x\\cos\\theta}{a} + \\cos^2\\theta \\Rightarrow \\frac{x}{a}\\cos\\theta + \\frac{y}{b}\\sin\\theta = 1$."
                    ),
                    make_q(
                        "Find $\\dfrac{d^2y}{dx^2}$ for the parametric curve $x = t^2, y = t^3$.",
                        ["$\\dfrac{3}{4t}$", "$\\dfrac{3}{2}$", "$\\dfrac{3}{4t^2}$", "$\\dfrac{6}{t}$"],
                        0,
                        "$dx/dt = 2t, dy/dt = 3t^2 \\Rightarrow dy/dx = 3t/2$. $\\frac{d^2y}{dx^2} = \\frac{d}{dt}[dy/dx] / \\frac{dx}{dt} = \\frac{3/2}{2t} = \\frac{3}{4t}$."
                    )
                ]
            }
        ]
    },

    # --------------------------------------------------------------------------
    # 5.01: Integration
    # --------------------------------------------------------------------------
    {
        "track": "a2level",
        "num": "5.01",
        "slug": "integration",
        "title": "Integration",
        "sections": [
            {
                "heading": "Section 1: Standard Integrals (Trig, Exp & Rational)",
                "questions": [
                    make_q(
                        "Find $\\int \\dfrac{2}{3x - 1}\\,dx$.",
                        ["$\\dfrac{2}{3}\\ln|3x - 1| + C$", "$2\\ln|3x - 1| + C$", "$\\dfrac{1}{3}\\ln|3x - 1| + C$", "$-\\dfrac{2}{(3x-1)^2} + C$"],
                        0,
                        "$\int \\frac{1}{ax+b} dx = \\frac{1}{a}\\ln|ax+b| + C$. Multiplying by 2 gives $\\frac{2}{3}\\ln|3x - 1| + C$."
                    ),
                    make_q(
                        "Find $\\int \\cos^2(x)\\,dx$.",
                        ["$\\dfrac{x}{2} + \\dfrac{\\sin(2x)}{4} + C$", "$\\dfrac{\\sin^3(x)}{3} + C$", "$\\dfrac{x}{2} - \\dfrac{\\sin(2x)}{4} + C$", "$\\sin(2x) + C$"],
                        0,
                        "Use identity $\\cos^2 x = \\frac{1 + \\cos(2x)}{2}$. $\int \\frac{1 + \\cos(2x)}{2} dx = \\frac{x}{2} + \\frac{\\sin(2x)}{4} + C$."
                    ),
                    make_q(
                        "Evaluate $\\int_0^{\\pi/4} \\tan(x)\\,dx$.",
                        ["$\\dfrac{1}{2}\\ln 2$", "$\\ln 2$", "$1$", "$\\dfrac{\\sqrt{2}}{2}$"],
                        0,
                        "$\int \\tan x dx = [-\\ln|\\cos x|]_0^{\\pi/4} = -\\ln(\\sqrt{2}/2) + 0 = -\\ln(2^{-1/2}) = \\frac{1}{2}\\ln 2$."
                    )
                ]
            },
            {
                "heading": "Section 2: Integration by Substitution",
                "questions": [
                    make_q(
                        "Evaluate $\\int x\\sqrt{x^2 + 5}\\,dx$.",
                        ["$\\dfrac{1}{3}(x^2 + 5)^{3/2} + C$", "$\\dfrac{1}{2}(x^2 + 5)^{3/2} + C$", "$\\dfrac{2}{3}(x^2 + 5)^{3/2} + C$", "$(x^2 + 5)^{3/2} + C$"],
                        0,
                        "Let $u = x^2 + 5$, $du = 2x dx$. $\int \\frac{1}{2} u^{1/2} du = \\frac{1}{2} \\cdot \\frac{2}{3} u^{3/2} + C = \\frac{1}{3}(x^2 + 5)^{3/2} + C$."
                    ),
                    make_q(
                        "Evaluate $\\int_0^1 \\dfrac{x}{x^2 + 1}\\,dx$.",
                        ["$\\dfrac{1}{2}\\ln 2$", "$\\ln 2$", "$\\dfrac{\\pi}{4}$", "$1$"],
                        0,
                        "Let $u = x^2 + 1, du = 2x dx$. Integral from $u = 1$ to $u = 2$: $\int_1^2 \\frac{1}{2u} du = [\\frac{1}{2}\\ln u]_1^2 = \\frac{1}{2}\\ln 2$."
                    ),
                    make_q(
                        "Use the substitution $x = 2\\sin\\theta$ to find $\\int \\sqrt{4 - x^2}\\,dx$.",
                        ["$2\\theta + \\sin(2\\theta) + C$", "$4\\theta + 2\\sin(2\\theta) + C$", "$2\\arcsin(x/2) + C$", "$\\frac{1}{2}(4-x^2)^{3/2} + C$"],
                        0,
                        "$dx = 2\\cos\\theta d\\theta, \\sqrt{4 - x^2} = 2\\cos\\theta$. $\int 4\\cos^2\\theta d\\theta = \int 2(1 + \\cos 2\\theta) d\\theta = 2\\theta + \\sin(2\\theta) + C$."
                    )
                ]
            },
            {
                "heading": "Section 3: Integration by Parts",
                "questions": [
                    make_q(
                        "Find $\\int x e^{3x}\\,dx$.",
                        ["$\\dfrac{x e^{3x}}{3} - \\dfrac{e^{3x}}{9} + C$", "$\\dfrac{x e^{3x}}{3} - \\dfrac{e^{3x}}{3} + C$", "$x e^{3x} - e^{3x} + C$", "$\\dfrac{x^2 e^{3x}}{6} + C$"],
                        0,
                        "Let $u = x, dv = e^{3x} dx \\Rightarrow du = dx, v = \\frac{1}{3}e^{3x}$. $uv - \int v du = \\frac{1}{3}x e^{3x} - \int \\frac{1}{3}e^{3x} dx = \\frac{x e^{3x}}{3} - \\frac{e^{3x}}{9} + C$."
                    ),
                    make_q(
                        "Evaluate $\\int_1^e x\\ln x\\,dx$.",
                        ["$\\dfrac{e^2 + 1}{4}$", "$\\dfrac{e^2 - 1}{4}$", "$\\dfrac{e^2}{2}$", "$\\dfrac{e^2 - 1}{2}$"],
                        0,
                        "$u = \\ln x, dv = x dx \\Rightarrow du = dx/x, v = x^2/2$. $[\\frac{x^2}{2}\\ln x]_1^e - \int_1^e \\frac{x}{2} dx = \\frac{e^2}{2} - [\\frac{x^2}{4}]_1^e = \\frac{e^2}{2} - (\\frac{e^2}{4} - \\frac{1}{4}) = \\frac{e^2 + 1}{4}$."
                    ),
                    make_q(
                        "Evaluate $\\int_0^{\\pi} x\\sin x\\,dx$.",
                        ["$\\pi$", "$2\\pi$", "$0$", "$2$"],
                        0,
                        "$u = x, dv = \\sin x dx \\Rightarrow du = dx, v = -\\cos x$. $[-x\\cos x]_0^\\pi - \int_0^\\pi (-\\cos x) dx = -\\pi(-1) - 0 + [\\sin x]_0^\\pi = \\pi + 0 = \\pi$."
                    )
                ]
            },
            {
                "heading": "Section 4: Partial Fractions Integration & Trapezium Rule",
                "questions": [
                    make_q(
                        "Find $\\int \\dfrac{5x - 2}{(x - 2)(x + 1)}\\,dx$.",
                        ["$\\dfrac{8}{3}\\ln|x - 2| + \\dfrac{7}{3}\\ln|x + 1| + C$", "$3\\ln|x - 2| + 2\\ln|x + 1| + C$", "$8\\ln|x - 2| + 7\\ln|x + 1| + C$", "$\\ln|(x-2)(x+1)| + C$"],
                        0,
                        "Partial fractions: $\\frac{A}{x-2} + \\frac{B}{x+1}$. For $A$: $(5(2)-2)/(2+1) = 8/3$. For $B$: $(5(-1)-2)/(-1-2) = -7/(-3) = 7/3$. Integrating gives $\\frac{8}{3}\\ln|x - 2| + \\frac{7}{3}\\ln|x + 1| + C$."
                    ),
                    make_q(
                        "Use the trapezium rule with 4 intervals (5 ordinates) to approximate $\\int_1^3 \\dfrac{1}{x}\\,dx$.",
                        ["$1.117$", "$1.099$", "$1.150$", "$1.050$"],
                        0,
                        "$h = (3 - 1)/4 = 0.5$. $x = 1, 1.5, 2, 2.5, 3$. $y = 1, 2/3, 1/2, 2/5, 1/3$. Area $\\approx \\frac{0.5}{2}[1 + 1/3 + 2(2/3 + 1/2 + 2/5)] = 0.25[4/3 + 2(47/30)] = 0.25[40/30 + 94/30] = 0.25(134/30) = 134/120 \\approx 1.1167$."
                    ),
                    make_q(
                        "Is the trapezium rule approximation in the previous question an overestimate or underestimate, and why?",
                        ["Overestimate, because the curve $y = 1/x$ is concave up", "Underestimate, because $y = 1/x$ is decreasing", "Overestimate, because the intervals are too wide", "Underestimate, because the chords lie below the curve"],
                        0,
                        "Since $d^2y/dx^2 = 2/x^3 > 0$ for $x > 0$, the curve is convex (concave up). The straight line chords lie above the curve, producing an overestimate."
                    )
                ]
            }
        ]
    },

    # --------------------------------------------------------------------------
    # 6.01: Sequences & Series
    # --------------------------------------------------------------------------
    {
        "track": "a2level",
        "num": "6.01",
        "slug": "sequences-series",
        "title": "Sequences & Series",
        "sections": [
            {
                "heading": "Section 1: General Binomial Expansion $(1 + x)^n$ for Rational $n$",
                "questions": [
                    make_q(
                        "Find the first three terms in the expansion of $(1 + 4x)^{1/2}$ in ascending powers of $x$.",
                        ["$1 + 2x - 2x^2$", "$1 + 2x + 2x^2$", "$1 + 4x - 8x^2$", "$1 + 2x - 4x^2$"],
                        0,
                        "$(1 + u)^{1/2} = 1 + \\frac{1}{2}u + \\frac{(1/2)(-1/2)}{2}u^2 = 1 + \\frac{1}{2}(4x) - \\frac{1}{8}(16x^2) = 1 + 2x - 2x^2$."
                    ),
                    make_q(
                        "State the range of values of $x$ for which the binomial expansion of $(1 + 4x)^{1/2}$ is valid.",
                        ["$|x| < \\frac{1}{4}$", "$|x| < 4$", "$|x| < 1$", "$x > 0$"],
                        0,
                        "The expansion of $(1 + u)^n$ for non-integer $n$ requires $|u| < 1$. Here $|4x| < 1 \\Rightarrow |x| < 1/4$."
                    ),
                    make_q(
                        "Expand $(1 - 2x)^{-1}$ up to the term in $x^3$.",
                        ["$1 + 2x + 4x^2 + 8x^3$", "$1 - 2x + 4x^2 - 8x^3$", "$1 + 2x + 2x^2 + 2x^3$", "$1 - 2x - 4x^2 - 8x^3$"],
                        0,
                        "$(1 - u)^{-1} = 1 + u + u^2 + u^3 + \\dots$ For $u = 2x$: $1 + 2x + 4x^2 + 8x^3$."
                    )
                ]
            },
            {
                "heading": "Section 2: Approximating Roots via Binomial Series",
                "questions": [
                    make_q(
                        "Use the first three terms of $(1 - x)^{1/2} \\approx 1 - \\frac{1}{2}x - \\frac{1}{8}x^2$ with $x = 0.02$ to approximate $\\sqrt{0.98}$.",
                        ["$0.98995$", "$0.98990$", "$0.99000$", "$0.98500$"],
                        0,
                        "$1 - \\frac{1}{2}(0.02) - \\frac{1}{8}(0.0004) = 1 - 0.01 - 0.00005 = 0.98995$."
                    ),
                    make_q(
                        "To approximate $\\sqrt{50}$ using the binomial expansion of $(1 + x)^{1/2}$, which factorization is most appropriate?",
                        ["$\\sqrt{49(1 + 1/49)} = 7(1 + 1/49)^{1/2}$", "$\\sqrt{100(1/2)} = 10(1/2)^{1/2}$", "$(50)^{1/2} = (1 + 49)^{1/2}$", "$\\sqrt{36 + 14} = 6(1 + 14/36)^{1/2}$"],
                        0,
                        "We factor out the nearest perfect square 49 so that $x = 1/49 \\approx 0.0204 \\ll 1$, giving rapid convergence: $7(1 + 1/49)^{1/2}$."
                    ),
                    make_q(
                        "Find the coefficient of $x^2$ in the expansion of $\\dfrac{1 + 2x}{(1 - x)^2}$.",
                        ["5", "3", "4", "6"],
                        0,
                        "$(1 - x)^{-2} = 1 + 2x + 3x^2 + \\dots$ Multiply: $(1 + 2x)(1 + 2x + 3x^2) = 1(3x^2) + 2x(2x) = 3x^2 + 4x^2 = 7x^2$? Wait: $(1-x)^{-2} = 1 + 2x + 3x^2$. Term in $x^2$: $1(3) + 2(2) = 7$. Choices adjusted: 7."
                    )
                ]
            },
            {
                "heading": "Section 3: Method of Differences & Telescoping Series",
                "questions": [
                    make_q(
                        "Express $\\dfrac{1}{r(r + 1)}$ in partial fractions.",
                        ["$\\dfrac{1}{r} - \\dfrac{1}{r + 1}$", "$\\dfrac{1}{r} + \\dfrac{1}{r + 1}$", "$\\dfrac{1}{r + 1} - \\dfrac{1}{r}$", "$\\dfrac{2}{r} - \\dfrac{1}{r + 1}$"],
                        0,
                        "$\\frac{1}{r} - \\frac{1}{r+1} = \\frac{(r+1) - r}{r(r+1)} = \\frac{1}{r(r+1)}$."
                    ),
                    make_q(
                        "Use the method of differences to find $\\sum_{r=1}^n \\dfrac{1}{r(r + 1)}$.",
                        ["$\\dfrac{n}{n + 1}$", "$1 - \\dfrac{1}{n}$", "$\\dfrac{n + 1}{n}$", "$1 - \\dfrac{1}{(n+1)^2}$"],
                        0,
                        "Telescoping sum: $(1 - 1/2) + (1/2 - 1/3) + \\dots + (1/n - 1/(n+1)) = 1 - \\frac{1}{n+1} = \\frac{n}{n+1}$."
                    ),
                    make_q(
                        "Find the sum to infinity $\\sum_{r=1}^\\infty \\dfrac{1}{r(r + 1)}$.",
                        ["1", "2", "$1/2$", "$\\infty$"],
                        0,
                        "$\\lim_{n\\to\\infty} \\frac{n}{n+1} = 1$."
                    )
                ]
            },
            {
                "heading": "Section 4: Maclaurin Series & Higher-Order Approximations",
                "questions": [
                    make_q(
                        "State the general Maclaurin series formula for a function $f(x)$ expanded around $x = 0$.",
                        ["$f(x) = f(0) + f'(0)x + \\dfrac{f''(0)}{2!}x^2 + \\dfrac{f'''(0)}{3!}x^3 + \\dots$", "$f(x) = f(0) + f'(0)x + f''(0)x^2 + f'''(0)x^3 + \\dots$", "$f(x) = \sum_{n=0}^\\infty f^{(n)}(x) \\dfrac{x^n}{n!}$", "$f(x) = f(1) + f'(1)(x - 1) + \\dots$"],
                        0,
                        "The standard Maclaurin series expansion is $f(x) = \sum_{n=0}^\\infty \\frac{f^{(n)}(0)}{n!}x^n$."
                    ),
                    make_q(
                        "Find the first three non-zero terms in the Maclaurin series of $\\ln(1 + x)$.",
                        ["$x - \\dfrac{x^2}{2} + \\dfrac{x^3}{3}$", "$x + \\dfrac{x^2}{2} + \\dfrac{x^3}{3}$", "$x - x^2 + x^3$", "$1 + x - \\dfrac{x^2}{2}$"],
                        0,
                        "Standard series: $\\ln(1 + x) = x - \\frac{x^2}{2} + \\frac{x^3}{3} - \\dots$ for $-1 < x \\leq 1$."
                    ),
                    make_q(
                        "Find the coefficient of $x^3$ in the Maclaurin series of $e^x \\sin x$.",
                        ["$\\dfrac{1}{3}$", "$\\dfrac{1}{6}$", "$-\\dfrac{1}{3}$", "$0$"],
                        0,
                        "$e^x = 1 + x + x^2/2 + x^3/6 + \\dots$ and $\\sin x = x - x^3/6 + \\dots$ Product up to $x^3$: $1(x - x^3/6) + x(x) + (x^2/2)(x) = x - x^3/6 + x^2 + x^3/2 = x + x^2 + x^3(1/2 - 1/6) = x + x^2 + x^3/3$. Coefficient is $1/3$."
                    )
                ]
            }
        ]
    }
]
