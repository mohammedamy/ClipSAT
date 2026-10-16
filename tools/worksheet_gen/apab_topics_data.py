#!/usr/bin/env python3
"""Standardized 4-Page Topic Data for AP Calculus AB (15 Topics).

Authentic College Board AP Calculus AB questions adhering to the official CED.
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

APAB_TOPICS = [
    # --------------------------------------------------------------------------
    # APAB 1.01: Limits Graphically and Numerically
    # --------------------------------------------------------------------------
    {
        "track": "apab",
        "num": "1.01",
        "slug": "limits-graphically-and-numerically",
        "title": "Limits Graphically and Numerically",
        "sections": [
            {
                "heading": "Section 1: Estimating Limits Numerically & Tables",
                "questions": [
                    make_q(
                        "A function $g$ satisfies $g(1.9) = 3.81, g(1.99) = 3.98, g(2.01) = 4.02,$ and $g(2.1) = 4.19$. What is the estimated value of $\\lim_{x \\to 2} g(x)$?",
                        ["$3.9$", "$4.0$", "$4.1$", "Does not exist"], 1,
                        "As $x$ approaches $2$ from both the left ($1.9, 1.99$) and right ($2.1, 2.01$), the values of $g(x)$ consistently approach $4.0$."
                    ),
                    make_q(
                        "Based on table values of $f(x) = \\frac{\\sin(3x)}{x}$ as $x \\to 0$ ($x$ in radians), what is the estimated value of $\\lim_{x \\to 0} f(x)$?",
                        ["$0$", "$1$", "$3$", "$\\infty$"], 2,
                        "For $x = 0.01, f(0.01) = \\frac{\\sin(0.03)}{0.01} \\approx 2.99955$. The numerical values approach $3$."
                    ),
                    make_q(
                        "Values of a function $h(x)$ near $x = 3$ are $h(2.99) = 5.01$ and $h(3.01) = -4.99$. What does this suggest about $\\lim_{x \\to 3} h(x)$?",
                        ["The limit is $0$", "The limit does not exist because left and right limits disagree", "The limit is $5$", "The function is continuous at $x = 3$"], 1,
                        "Because the left-hand limit approaches $+5$ while the right-hand limit approaches $-5$, the two-sided limit does not exist."
                    )
                ]
            },
            {
                "heading": "Section 2: Graphical Analysis & Removable Discontinuities",
                "questions": [
                    make_q(
                        "The graph of $f(x) = \\frac{x^2 - 1}{x - 1}$ has a hole at $(1, 2)$. What is the value of $\\lim_{x \\to 1} f(x)$?",
                        ["$1$", "$2$", "$0$", "Undefined"], 1,
                        "Limits describe the behavior near $x = 1$, not at $x = 1$. Since $f(x) = x + 1$ for $x \\neq 1$, $\\lim_{x \\to 1} (x + 1) = 2$."
                    ),
                    make_q(
                        "A function $f$ satisfies $\\lim_{x \\to 4^-} f(x) = 7, \\lim_{x \\to 4^+} f(x) = 7,$ and $f(4) = 2$. What is $\\lim_{x \\to 4} f(x)$?",
                        ["$2$", "$7$", "$4.5$", "Does not exist"], 1,
                        "Since both one-sided limits are equal to $7$, the two-sided limit is $7$, regardless of the defined value $f(4) = 2$."
                    ),
                    make_q(
                        "Which of the following functions has a vertical asymptote at $x = 2$ and NOT a removable hole?",
                        ["$f(x) = \\frac{x - 2}{x^2 - 4}$", "$f(x) = \\frac{x + 1}{(x - 2)^2}$", "$f(x) = \\frac{x^2 - 4}{x - 2}$", "$f(x) = \\frac{2x - 4}{x - 2}$"], 1,
                        "In $f(x) = \\frac{x + 1}{(x - 2)^2}$, the factor $(x - 2)$ does not cancel with the numerator, creating a vertical asymptote at $x = 2$."
                    )
                ]
            },
            {
                "heading": "Section 3: One-Sided Limits & Absolute Value Quotients",
                "questions": [
                    make_q(
                        "Evaluate the one-sided limit: $\\lim_{x \\to 0^+} \\frac{x}{|x|}$.",
                        ["$1$", "$-1$", "$0$", "Does not exist"], 0,
                        "For $x > 0$, $|x| = x$, so $\\frac{x}{|x|} = \\frac{x}{x} = 1$. The limit is $1$."
                    ),
                    make_q(
                        "Evaluate: $\\lim_{x \\to 5^-} \\frac{x - 5}{|x - 5|}$.",
                        ["$1$", "$-1$", "$0$", "Does not exist"], 1,
                        "For $x < 5$, $x - 5 < 0$, which means $|x - 5| = -(x - 5)$. Thus $\\frac{x - 5}{-(x - 5)} = -1$."
                    ),
                    make_q(
                        "What is $\\lim_{x \\to 2} \\frac{|x - 2|}{x - 2}$?",
                        ["$1$", "$-1$", "$0$", "Does not exist"], 3,
                        "The left-hand limit is $-1$ and the right-hand limit is $1$. Because they are unequal, the two-sided limit does not exist."
                    )
                ]
            },
            {
                "heading": "Section 4: Infinite Limits & Horizontal Asymptotes",
                "questions": [
                    make_q(
                        "Evaluate: $\\lim_{x \\to 3^+} \\frac{1}{x - 3}$.",
                        ["$\\infty$", "$-\\infty$", "$0$", "$1$"], 0,
                        "As $x \\to 3$ from the right, the denominator is positive and approaches $0$, so the quotient grows without bound toward $\\infty$."
                    ),
                    make_q(
                        "Evaluate the limit at infinity: $\\lim_{x \\to \\infty} \\frac{7x^3 - 4x + 1}{2x^3 + 5x^2 - 3}$.",
                        ["$\\frac{7}{2}$", "$0$", "$\\infty$", "$-\\frac{1}{3}$"], 0,
                        "Divide all terms by $x^3$: $\\lim_{x \\to \\infty} \\frac{7 - 4/x^2 + 1/x^3}{2 + 5/x - 3/x^3} = \\frac{7}{2}$."
                    ),
                    make_q(
                        "What are all horizontal asymptotes of the function $f(x) = \\frac{3x}{\\sqrt{x^2 + 4}}$?",
                        ["$y = 3$ and $y = -3$", "$y = 3$ only", "$y = 0$", "No horizontal asymptotes"], 0,
                        "As $x \\to \\infty$, $\\sqrt{x^2} = x$, so $f(x) \\to 3$. As $x \\to -\\infty$, $\\sqrt{x^2} = -x$, so $f(x) \\to -3$. The asymptotes are $y = \\pm 3$."
                    )
                ]
            }
        ]
    },

    # --------------------------------------------------------------------------
    # APAB 1.02: Continuity and the Intermediate Value Theorem
    # --------------------------------------------------------------------------
    {
        "track": "apab",
        "num": "1.02",
        "slug": "continuity-and-the-intermediate-value-theorem",
        "title": "Continuity and the Intermediate Value Theorem",
        "sections": [
            {
                "heading": "Section 1: Three-Part Definition of Continuity",
                "questions": [
                    make_q(
                        "Which three conditions must be satisfied for a function $f$ to be continuous at $x = c$?",
                        [
                            "$f(c)$ is defined, $\\lim_{x \\to c} f(x)$ exists, and $\\lim_{x \\to c} f(x) = f(c)$",
                            "$f'(c)$ exists, $f(c) > 0$, and $\\lim_{x \\to c} f(x) = 0$",
                            "$f(c)$ is continuous on $(a, b)$, $f(c) = 0$, and $f'(c) \\neq 0$",
                            "$\\lim_{x \\to c^-} f(x) = \\lim_{x \\to c^+} f(x)$ only"
                        ], 0,
                        "By the formal definition of continuity at a point, $f(c)$ must be defined, the two-sided limit must exist, and the limit must equal the function value."
                    ),
                    make_q(
                        "Let $f(x) = \\frac{x^2 - 9}{x - 3}$ for $x \\neq 3$. What value must be assigned to $f(3)$ to make $f$ continuous at $x = 3$?",
                        ["$3$", "$6$", "$0$", "No value can make it continuous"], 1,
                        "The limit is $\\lim_{x \\to 3} \\frac{(x - 3)(x + 3)}{x - 3} = 3 + 3 = 6$. Therefore, $f(3)$ must equal $6$."
                    ),
                    make_q(
                        "The function $g(x) = \\frac{1}{x - 2}$ has what type of discontinuity at $x = 2$?",
                        ["Infinite (essential) discontinuity", "Removable discontinuity", "Jump discontinuity", "Oscillating discontinuity"], 0,
                        "Because $\\lim_{x \\to 2^+} g(x) = \\infty$ and $\\lim_{x \\to 2^-} g(x) = -\\infty$, there is an infinite discontinuity (vertical asymptote) at $x = 2$."
                    )
                ]
            },
            {
                "heading": "Section 2: Piecewise Functions & Continuity",
                "questions": [
                    make_q(
                        "For what value of $k$ is $f(x) = kx^2 + 1$ for $x \\leq 2$, and $f(x) = 3x - 1$ for $x > 2$ continuous at $x = 2$?",
                        ["$1$", "$2$", "$3$", "$0$"], 0,
                        "Equate left and right limits at $x = 2$: $k(2^2) + 1 = 3(2) - 1 \\Rightarrow 4k + 1 = 5 \\Rightarrow 4k = 4 \\Rightarrow k = 1$."
                    ),
                    make_q(
                        "If $g(x) = \\frac{\\sin(ax)}{x}$ for $x \\neq 0$, and $g(0) = 4$, what value of $a$ ensures continuity at $x = 0$?",
                        ["$1$", "$2$", "$4$", "$\\frac{1}{4}$"], 2,
                        "$\\lim_{x \\to 0} \\frac{\\sin(ax)}{x} = a$. For continuity, $a = g(0) = 4$."
                    ),
                    make_q(
                        "The function $h(x) = x + 2$ for $x < 1$, and $h(x) = 2x + 1$ for $x \\geq 1$ has what property at $x = 1$?",
                        ["Continuous because both one-sided limits equal $3$", "Jump discontinuity of size $1$", "Infinite discontinuity", "Undefined at $x = 1$"], 0,
                        "$\\lim_{x \\to 1^-} (x + 2) = 3$ and $\\lim_{x \\to 1^+} (2x + 1) = 3 = h(1)$. Therefore, $h$ is continuous at $x = 1$."
                    )
                ]
            },
            {
                "heading": "Section 3: Intermediate Value Theorem (IVT)",
                "questions": [
                    make_q(
                        "What are the hypotheses of the Intermediate Value Theorem for a function $f$ on interval $[a, b]$?",
                        ["$f$ must be continuous on the closed interval $[a, b]$", "$f$ must be differentiable on $(a, b)$", "$f(a)$ and $f(b)$ must have opposite signs", "$f$ must be strictly increasing on $[a, b]$"], 0,
                        "The Intermediate Value Theorem requires only that $f$ is continuous on the closed interval $[a, b]$."
                    ),
                    make_q(
                        "Let $f$ be continuous on $[1, 5]$ with $f(1) = -3$ and $f(5) = 7$. Does the IVT guarantee a solution to $f(c) = 0$ for some $c \\in (1, 5)$?",
                        ["Yes, because $0$ lies between $-3$ and $7$", "No, $f$ must also be differentiable", "No, $f$ must be a polynomial", "Only if $f'(x) > 0$ for all $x$"], 0,
                        "Because $f$ is continuous on $[1, 5]$ and $f(1) < 0 < f(5)$, the IVT guarantees at least one $c \\in (1, 5)$ such that $f(c) = 0$."
                    ),
                    make_q(
                        "On which interval is the polynomial $P(x) = x^3 - 3x - 1$ guaranteed to have a real zero by the IVT?",
                        ["$[1, 2]$", "$[0, 1]$", "$[-1, 0]$", "$[2, 3]$"], 0,
                        "$P(1) = 1 - 3 - 1 = -3 < 0$, and $P(2) = 8 - 6 - 1 = 1 > 0$. By IVT, a zero exists in $(1, 2)$."
                    )
                ]
            },
            {
                "heading": "Section 4: Extreme Value Theorem (EVT)",
                "questions": [
                    make_q(
                        "What does the Extreme Value Theorem guarantee for a function $f$ continuous on a closed interval $[a, b]$?",
                        ["$f$ attains both an absolute maximum and an absolute minimum on $[a, b]$", "$f$ has a horizontal tangent on $(a, b)$", "$f'(c) = 0$ for some $c \\in (a, b)$", "$f$ is invertible on $[a, b]$"], 0,
                        "The EVT states that any continuous function on a closed bounded interval $[a, b]$ must attain an absolute maximum and an absolute minimum."
                    ),
                    make_q(
                        "Why does the function $f(x) = \\frac{1}{x}$ NOT attain an absolute maximum on $(0, 2]$?",
                        ["The interval is open at $0$ and $f$ increases without bound as $x \\to 0^+$", "$f$ is not differentiable on $(0, 2]$", "$f$ is bounded on $(0, 2]$", "$f(2) = 0.5$ is the maximum"], 0,
                        "The interval $(0, 2]$ is not closed, so the EVT does not apply. As $x \\to 0^+$, $f(x) \\to \\infty$, so no absolute maximum exists."
                    ),
                    make_q(
                        "Find the absolute maximum value of $f(x) = -x^2 + 4x + 1$ on the closed interval $[0, 3]$.",
                        ["$5$", "$4$", "$1$", "$6$"], 0,
                        "Critical point: $f'(x) = -2x + 4 = 0 \\Rightarrow x = 2$. Evaluate: $f(0) = 1, f(2) = -(4) + 8 + 1 = 5, f(3) = -(9) + 12 + 1 = 4$. Absolute maximum is $5$."
                    )
                ]
            }
        ]
    },

    # --------------------------------------------------------------------------
    # APAB 2.01: The Definition of the Derivative
    # --------------------------------------------------------------------------
    {
        "track": "apab",
        "num": "2.01",
        "slug": "the-definition-of-the-derivative",
        "title": "The Definition of the Derivative",
        "sections": [
            {
                "heading": "Section 1: Difference Quotients & Limit Definitions",
                "questions": [
                    make_q(
                        "Which limit expression represents the derivative $f'(x)$ by definition?",
                        ["$\\lim_{h \\to 0} \\frac{f(x + h) - f(x)}{h}$", "$\\lim_{h \\to 0} \\frac{f(x + h) + f(x)}{h}$", "$\\lim_{h \\to \\infty} \\frac{f(x + h) - f(x)}{h}$", "$\\frac{f(x + h) - f(x)}{h}$"], 0,
                        "By definition, $f'(x) = \\lim_{h \\to 0} \\frac{f(x + h) - f(x)}{h}$."
                    ),
                    make_q(
                        "Evaluate $\\lim_{h \\to 0} \\frac{(3 + h)^2 - 9}{h}$.",
                        ["$3$", "$6$", "$9$", "$0$"], 1,
                        "This limit represents $f'(3)$ for $f(x) = x^2$. $f'(x) = 2x \\Rightarrow f'(3) = 2(3) = 6$."
                    ),
                    make_q(
                        "Which function and value of $c$ are represented by $\\lim_{x \\to 4} \\frac{\\sqrt{x} - 2}{x - 4}$?",
                        ["$f(x) = \\sqrt{x}$ at $c = 4$", "$f(x) = x^2$ at $c = 2$", "$f(x) = \\sqrt{x}$ at $c = 2$", "$f(x) = \\frac{1}{\\sqrt{x}}$ at $c = 4$"], 0,
                        "Using the alternate form $f'(c) = \\lim_{x \\to c} \\frac{f(x) - f(c)}{x - c}$, this corresponds to $f(x) = \\sqrt{x}$ at $c = 4$."
                    )
                ]
            },
            {
                "heading": "Section 2: Differentiability Implies Continuity",
                "questions": [
                    make_q(
                        "If a function $f$ is differentiable at $x = c$, which of the following statements MUST be true?",
                        ["$f$ is continuous at $x = c$", "$f'(c) > 0$", "$f''(c)$ exists", "$f$ has a local extremum at $x = c$"], 0,
                        "Differentiability implies continuity. (The converse is false, as demonstrated by sharp corners like $f(x) = |x|$)."
                    ),
                    make_q(
                        "Why is the function $f(x) = |x - 3|$ not differentiable at $x = 3$?",
                        ["The left-hand and right-hand derivative limits are unequal (corner)", "$f(3)$ is undefined", "$f$ is not continuous at $x = 3$", "$\\lim_{x \\to 3} f(x) = \\infty$"], 0,
                        "For $x < 3, f'(x) = -1$, and for $x > 3, f'(x) = 1$. The corner creates unequal one-sided derivative limits."
                    ),
                    make_q(
                        "The graph of $f(x) = x^{1/3}$ has what feature at $x = 0$ that prevents differentiability?",
                        ["A vertical tangent line where $f'(x) \\to \\infty$", "A jump discontinuity", "A sharp cusp", "A hole"], 0,
                        "$f'(x) = \\frac{1}{3} x^{-2/3} = \\frac{1}{3 x^{2/3}}$. As $x \\to 0$, $f'(x) \\to \\infty$, which corresponds to a vertical tangent line."
                    )
                ]
            },
            {
                "heading": "Section 3: Tangent and Normal Lines",
                "questions": [
                    make_q(
                        "What is the equation of the tangent line to $f(x) = x^3 - 2x$ at the point $(2, 4)$?",
                        ["$y - 4 = 10(x - 2)$", "$y - 4 = 8(x - 2)$", "$y - 4 = 12(x - 2)$", "$y = 10x - 12$"], 0,
                        "$f'(x) = 3x^2 - 2$. Slope at $x = 2$ is $f'(2) = 3(4) - 2 = 10$. In point-slope form: $y - 4 = 10(x - 2)$."
                    ),
                    make_q(
                        "What is the slope of the normal line to $y = x^2 + 3x$ at $x = 1$?",
                        ["$-\\frac{1}{5}$", "$5$", "$-5$", "$\\frac{1}{5}$"], 0,
                        "$y' = 2x + 3 \\Rightarrow y'(1) = 5$. The normal line is perpendicular to the tangent line, so its slope is $-\\frac{1}{5}$."
                    ),
                    make_q(
                        "At what point on the parabola $y = x^2 - 4x + 3$ is the tangent line horizontal?",
                        ["$(2, -1)$", "$(2, 0)$", "$(4, 3)$", "$(0, 3)$"], 0,
                        "Horizontal tangent requires $y' = 0$: $2x - 4 = 0 \\Rightarrow x = 2$. $y(2) = 4 - 8 + 3 = -1$. Point is $(2, -1)$."
                    )
                ]
            },
            {
                "heading": "Section 4: Estimating Derivatives from Tables & Graphs",
                "questions": [
                    make_q(
                        "Given values $t = 2, 4, 6$ with $s(2) = 14, s(4) = 30, s(6) = 54$, estimate $s'(4)$ using the average rate of change over $[2, 6]$.",
                        ["$10$", "$8$", "$16$", "$12$"], 0,
                        "Symmetric difference quotient: $s'(4) \\approx \\frac{s(6) - s(2)}{6 - 2} = \\frac{54 - 14}{4} = \\frac{40}{4} = 10$."
                    ),
                    make_q(
                        "If the graph of $f$ has a local maximum at $x = 5$ and is differentiable, what is $f'(5)$?",
                        ["$0$", "$1$", "Positive", "Undefined"], 0,
                        "By Fermat's theorem, the derivative at an interior local extremum of a differentiable function is zero: $f'(5) = 0$."
                    ),
                    make_q(
                        "If $f'(x) > 0$ for all $x \\in (a, b)$, what does this indicate about the graph of $f$ on $(a, b)$?",
                        ["$f$ is strictly increasing", "$f$ is strictly decreasing", "$f$ is concave up", "$f$ is linear"], 0,
                        "A strictly positive first derivative implies that the function is strictly increasing on the interval."
                    )
                ]
            }
        ]
    },

    # --------------------------------------------------------------------------
    # APAB 2.02: Product, Quotient, and Trigonometric Derivatives
    # --------------------------------------------------------------------------
    {
        "track": "apab",
        "num": "2.02",
        "slug": "product-quotient-and-trigonometric-derivatives",
        "title": "Product, Quotient, and Trigonometric Derivatives",
        "sections": [
            {
                "heading": "Section 1: The Product Rule",
                "questions": [
                    make_q(
                        "Find the derivative of $f(x) = x^3 \\sin x$.",
                        ["$3x^2 \\sin x + x^3 \\cos x$", "$3x^2 \\cos x$", "$3x^2 \\sin x - x^3 \\cos x$", "$x^2(3\\sin x + \\cos x)$"], 0,
                        "Product rule: $\\frac{d}{dx}[u v] = u' v + u v'$. Here $3x^2 \\sin x + x^3 \\cos x$."
                    ),
                    make_q(
                        "If $h(x) = f(x)g(x)$ with $f(2) = 3, f'(2) = -1, g(2) = 4,$ and $g'(2) = 5$, what is $h'(2)$?",
                        ["$11$", "$19$", "$-14$", "$15$"], 0,
                        "$h'(2) = f'(2)g(2) + f(2)g'(2) = (-1)(4) + (3)(5) = -4 + 15 = 11$."
                    ),
                    make_q(
                        "Find $\\frac{d}{dx}[e^x \\cos x]$.",
                        ["$e^x(\\cos x - \\sin x)$", "$e^x(\\cos x + \\sin x)$", "$-e^x \\sin x$", "$e^x \\cos x$"], 0,
                        "Product rule: $e^x \\cos x + e^x(-\\sin x) = e^x(\\cos x - \\sin x)$."
                    )
                ]
            },
            {
                "heading": "Section 2: The Quotient Rule",
                "questions": [
                    make_q(
                        "Differentiate $y = \\frac{2x - 3}{x + 4}$.",
                        ["$\\frac{11}{(x + 4)^2}$", "$\\frac{5}{(x + 4)^2}$", "$\\frac{2x + 5}{(x + 4)^2}$", "$\\frac{2}{(x + 4)^2}$"], 0,
                        "Quotient rule: $\\frac{2(x + 4) - (2x - 3)(1)}{(x + 4)^2} = \\frac{2x + 8 - 2x + 3}{(x + 4)^2} = \\frac{11}{(x + 4)^2}$."
                    ),
                    make_q(
                        "Let $k(x) = \\frac{f(x)}{g(x)}$. If $f(1) = 6, f'(1) = 2, g(1) = 3,$ and $g'(1) = -1$, find $k'(1)$.",
                        ["$\\frac{4}{3}$", "$0$", "$2$", "$-\\frac{4}{3}$"], 0,
                        "$k'(1) = \\frac{f'(1)g(1) - f(1)g'(1)}{[g(1)]^2} = \\frac{2(3) - 6(-1)}{3^2} = \\frac{6 + 6}{9} = \\frac{12}{9} = \\frac{4}{3}$."
                    ),
                    make_q(
                        "Find the derivative of $f(x) = \\frac{e^x}{x^2}$.",
                        ["$\\frac{e^x(x - 2)}{x^3}$", "$\\frac{e^x(x + 2)}{x^3}$", "$\\frac{e^x}{2x}$", "$\\frac{e^x(x - 1)}{x^3}$"], 0,
                        "Quotient rule: $\\frac{e^x(x^2) - e^x(2x)}{x^4} = \\frac{x e^x(x - 2)}{x^4} = \\frac{e^x(x - 2)}{x^3}$."
                    )
                ]
            },
            {
                "heading": "Section 3: Derivatives of Basic Trigonometric Functions",
                "questions": [
                    make_q(
                        "What is $\\frac{d}{dx}[\\tan x]$?",
                        ["$\\sec^2 x$", "$\\sec x \\tan x$", "$-\\csc^2 x$", "$\\cot x$"], 0,
                        "By definition, $\\frac{d}{dx}[\\frac{\\sin x}{\\cos x}] = \\frac{\\cos^2 x + \\sin^2 x}{\\cos^2 x} = \\frac{1}{\\cos^2 x} = \\sec^2 x$."
                    ),
                    make_q(
                        "What is $\\frac{d}{dx}[\\sec x]$?",
                        ["$\\sec x \\tan x$", "$\\sec^2 x$", "$-\\csc x \\cot x$", "$\\tan^2 x$"], 0,
                        "By the quotient rule on $\\frac{1}{\\cos x}$: $\\frac{0 - (-\\sin x)}{\\cos^2 x} = \\frac{\\sin x}{\\cos^2 x} = \\sec x \\tan x$."
                    ),
                    make_q(
                        "What is $\\frac{d}{dx}[\\cot x]$?",
                        ["$-\\csc^2 x$", "$\\csc^2 x$", "$-\\sec^2 x$", "$-\\csc x \\cot x$"], 0,
                        "$\\frac{d}{dx}[\\cot x] = -\\csc^2 x$."
                    )
                ]
            },
            {
                "heading": "Section 4: Higher-Order Derivatives & Acceleration",
                "questions": [
                    make_q(
                        "Find the second derivative $f''(x)$ of $f(x) = \\sin x$.",
                        ["$-\\sin x$", "$\\sin x$", "$-\\cos x$", "$\\cos x$"], 0,
                        "$f'(x) = \\cos x$. Then $f''(x) = \\frac{d}{dx}[\\cos x] = -\\sin x$."
                    ),
                    make_q(
                        "If position is $s(t) = t^4 - 2t^3 + 5$, what is the acceleration $a(t)$ at $t = 2$?",
                        ["$24$", "$36$", "$12$", "$48$"], 0,
                        "Velocity $v(t) = 4t^3 - 6t^2$. Acceleration $a(t) = 12t^2 - 12t$. At $t = 2$: $a(2) = 12(4) - 12(2) = 48 - 24 = 24$."
                    ),
                    make_q(
                        "What is the 50th derivative of $f(x) = \\cos x$?",
                        ["$-\\cos x$", "$\\cos x$", "$\\sin x$", "$-\\sin x$"], 0,
                        "Derivatives of cosine repeat in cycles of $4$: $f^{(0)} = \\cos x, f^{(1)} = -\\sin x, f^{(2)} = -\\cos x, f^{(3)} = \\sin x$. Since $50 = 4(12) + 2$, $f^{(50)}(x) = f^{(2)}(x) = -\\cos x$."
                    )
                ]
            }
        ]
    }
]

from apab_topics_data_p2 import APAB_TOPICS_P2
from apab_topics_data_p3 import APAB_TOPICS_P3

ALL_APAB_TOPICS = APAB_TOPICS + APAB_TOPICS_P2 + APAB_TOPICS_P3
