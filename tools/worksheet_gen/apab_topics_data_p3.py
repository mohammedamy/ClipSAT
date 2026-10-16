#!/usr/bin/env python3
"""Standardized 4-Page Topic Data for AP Calculus AB Part 3 (Topics 4.02 to 8.02 - 8 Topics).

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

APAB_TOPICS_P3 = [
    # --------------------------------------------------------------------------
    # APAB 4.02: Linear Approximation and L'Hôpital's Rule
    # --------------------------------------------------------------------------
    {
        "track": "apab",
        "num": "4.02",
        "slug": "linear-approximation-and-l-h-pital-s-rule",
        "title": "Linear Approximation and L'Hôpital's Rule",
        "sections": [
            {
                "heading": "Section 1: Tangent Line Approximation (Linearization)",
                "questions": [
                    make_q(
                        "What is the local linear approximation $L(x)$ of $f(x) = \\sqrt{x}$ at $x = 25$?",
                        ["$L(x) = 5 + \\frac{1}{10}(x - 25)$", "$L(x) = 5 + \\frac{1}{5}(x - 25)$", "$L(x) = 5 + \\frac{1}{2}(x - 25)$", "$L(x) = \\frac{1}{10}x$"], 0,
                        "$f(25) = 5$. $f'(x) = \\frac{1}{2\\sqrt{x}} \\Rightarrow f'(25) = \\frac{1}{10}$. Linearization: $L(x) = f(a) + f'(a)(x - a) = 5 + \\frac{1}{10}(x - 25)$."
                    ),
                    make_q(
                        "Using the linearization of $f(x) = \\sqrt{x}$ at $a = 25$, approximate $\\sqrt{26}$.",
                        ["$5.10$", "$5.05$", "$5.20$", "$5.01$"], 0,
                        "$L(26) = 5 + 0.1(26 - 25) = 5 + 0.1 = 5.10$."
                    ),
                    make_q(
                        "Is the tangent line approximation for $f(x) = \\sqrt{x}$ an overestimate or underestimate, and why?",
                        ["An overestimate because $f''(x) < 0$ (concave down)", "An underestimate because $f''(x) > 0$ (concave up)", "Exact because $f$ is monotonic", "Depends on the step size"], 0,
                        "Since $f''(x) = -\\frac{1}{4} x^{-3/2} < 0$, the curve is concave down and lies below its tangent lines, making tangent line approximations overestimates."
                    )
                ]
            },
            {
                "heading": "Section 2: L'Hôpital's Rule for 0/0 Forms",
                "questions": [
                    make_q(
                        "Evaluate $\\lim_{x \\to 0} \\frac{e^{2x} - 1}{\\sin(3x)}$.",
                        ["$\\frac{2}{3}$", "$\\frac{3}{2}$", "$0$", "$\\infty$"], 0,
                        "Direct substitution yields $\\frac{0}{0}$. By L'Hôpital's Rule: $\\lim_{x \\to 0} \\frac{2e^{2x}}{3\\cos(3x)} = \\frac{2(1)}{3(1)} = \\frac{2}{3}$."
                    ),
                    make_q(
                        "Evaluate $\\lim_{x \\to 1} \\frac{\\ln x}{x^2 - 1}$.",
                        ["$\\frac{1}{2}$", "$1$", "$2$", "$0$"], 0,
                        "$\\frac{0}{0}$ form. By L'Hôpital's: $\\lim_{x \\to 1} \\frac{1/x}{2x} = \\frac{1}{2(1)} = \\frac{1}{2}$."
                    ),
                    make_q(
                        "Evaluate $\\lim_{x \\to 0} \\frac{1 - \\cos(4x)}{x^2}$.",
                        ["$8$", "$4$", "$2$", "$16$"], 0,
                        "First L'Hôpital's: $\\frac{4\\sin(4x)}{2x}$. Second L'Hôpital's: $\\frac{16\\cos(4x)}{2} = \\frac{16(1)}{2} = 8$."
                    )
                ]
            },
            {
                "heading": "Section 3: L'Hôpital's Rule for Infinity/Infinity Forms",
                "questions": [
                    make_q(
                        "Evaluate $\\lim_{x \\to \\infty} \\frac{\\ln(x)}{x}$.",
                        ["$0$", "$1$", "$\\infty$", "Undefined"], 0,
                        "$\\frac{\\infty}{\\infty}$ form. By L'Hôpital's: $\\lim_{x \\to \\infty} \\frac{1/x}{1} = 0$."
                    ),
                    make_q(
                        "Evaluate $\\lim_{x \\to \\infty} \\frac{x^2}{e^x}$.",
                        ["$0$", "$1$", "$2$", "$\\infty$"], 0,
                        "Apply L'Hôpital's twice: $\\lim_{x \\to \\infty} \\frac{2x}{e^x} = \\lim_{x \\to \\infty} \\frac{2}{e^x} = 0$."
                    ),
                    make_q(
                        "Which requirement MUST be verified before applying L'Hôpital's Rule to $\\lim_{x \\to c} \\frac{f(x)}{g(x)}$?",
                        ["The limit produces an indeterminate form $\\frac{0}{0}$ or $\\frac{\\pm\\infty}{\\pm\\infty}$", "$f(c) = 0$ only", "$f'(c) = 0$", "$g(x) > 0$ for all $x$"], 0,
                        "L'Hôpital's Rule applies ONLY when the quotient evaluates to an indeterminate form of type $\\frac{0}{0}$ or $\\frac{\\pm\\infty}{\\pm\\infty}$."
                    )
                ]
            },
            {
                "heading": "Section 4: Comparing Relative Growth Rates of Functions",
                "questions": [
                    make_q(
                        "As $x \\to \\infty$, which of the following functions grows the fastest?",
                        ["$e^x$", "$x^{10}$", "$x \\ln x$", "$2^x$"], 0,
                        "Exponentials with larger base grow faster than any polynomial or power function. Since $e \\approx 2.718 > 2$, $e^x$ grows fastest."
                    ),
                    make_q(
                        "Evaluate $\\lim_{x \\to \\infty} \\frac{(\\ln x)^5}{\\sqrt{x}}$.",
                        ["$0$", "$\\infty$", "$1$", "$5$"], 0,
                        "Any power of $x$ (even $x^{1/2}$) grows strictly faster than any power of $\\ln x$. Hence the limit is $0$."
                    ),
                    make_q(
                        "If $\\lim_{x \\to \\infty} \\frac{f(x)}{g(x)} = \\infty$, what does this conclude about their growth rates?",
                        ["$f(x)$ grows faster than $g(x)$", "$g(x)$ grows faster than $f(x)$", "They grow at the same rate", "Neither function grows"], 0,
                        "By definition of relative growth rates, $\\lim_{x \\to \\infty} \\frac{f(x)}{g(x)} = \\infty$ indicates that $f(x)$ grows strictly faster than $g(x)$."
                    )
                ]
            }
        ]
    },

    # --------------------------------------------------------------------------
    # APAB 5.01: Extrema and the Mean Value Theorem
    # --------------------------------------------------------------------------
    {
        "track": "apab",
        "num": "5.01",
        "slug": "extrema-and-the-mean-value-theorem",
        "title": "Extrema and the Mean Value Theorem",
        "sections": [
            {
                "heading": "Section 1: Critical Points & First Derivative Test",
                "questions": [
                    make_q(
                        "What are the critical points of $f(x) = x^3 - 3x^2 - 9x + 5$?",
                        ["$x = -1$ and $x = 3$", "$x = 1$ and $x = -3$", "$x = 0$ and $x = 3$", "$x = -1$ only"], 0,
                        "$f'(x) = 3x^2 - 6x - 9 = 3(x^2 - 2x - 3) = 3(x - 3)(x + 1) = 0 \\Rightarrow x = -1, 3$."
                    ),
                    make_q(
                        "By the First Derivative Test, what type of extremum does $f(x) = x^3 - 3x^2 - 9x + 5$ have at $x = -1$?",
                        ["Local maximum because $f'$ changes from positive to negative", "Local minimum because $f'$ changes from negative to positive", "Inflection point", "No extremum"], 0,
                        "For $x < -1, f'(x) > 0$, and for $-1 < x < 3, f'(x) < 0$. Since $f'$ changes from positive to negative, $x = -1$ is a local maximum."
                    ),
                    make_q(
                        "Can a critical point occur at a value where $f'(x)$ is undefined?",
                        ["Yes, provided $x$ is in the domain of $f$", "No, $f'$ must always equal zero", "Only if $f''(x) = 0$", "Only for rational functions"], 0,
                        "A critical point of $f$ is any point $c$ in the domain of $f$ where $f'(c) = 0$ OR $f'(c)$ does not exist (such as cusps and corners)."
                    )
                ]
            },
            {
                "heading": "Section 2: Mean Value Theorem (MVT)",
                "questions": [
                    make_q(
                        "What are the conditions required to apply the Mean Value Theorem on $[a, b]$?",
                        ["Continuous on $[a, b]$ and differentiable on $(a, b)$", "Differentiable on $[a, b]$ and $f(a) = f(b)$", "Continuous on $(a, b)$ only", "$f'(c) = 0$ on $[a, b]$"], 0,
                        "The MVT requires that $f$ is continuous on the closed interval $[a, b]$ and differentiable on the open interval $(a, b)$."
                    ),
                    make_q(
                        "Find the value of $c$ guaranteed by the MVT for $f(x) = x^2$ on the interval $[0, 4]$.",
                        ["$2$", "$1$", "$\\sqrt{2}$", "$2.5$"], 0,
                        "Average rate of change $= \\frac{f(4) - f(0)}{4 - 0} = \\frac{16 - 0}{4} = 4$. $f'(c) = 2c = 4 \\Rightarrow c = 2$."
                    ),
                    make_q(
                        "Why does the MVT NOT apply to $f(x) = |x|$ on $[-2, 2]$?",
                        ["$f$ is not differentiable at $x = 0$", "$f$ is not continuous on $[-2, 2]$", "$f(-2) \\neq f(2)$", "The interval is not symmetric"], 0,
                        "$f(x) = |x|$ has a sharp corner at $x = 0 \\in (-2, 2)$, violating the differentiability condition."
                    )
                ]
            },
            {
                "heading": "Section 3: Rolle's Theorem",
                "questions": [
                    make_q(
                        "What additional hypothesis does Rolle's Theorem require compared to the MVT?",
                        ["$f(a) = f(b)$", "$f'(a) = f'(b)$", "$f''(x) = 0$", "$f(a) = 0$"], 0,
                        "Rolle's Theorem adds the condition that the endpoints have equal function values: $f(a) = f(b)$, guaranteeing at least one $c$ where $f'(c) = 0$."
                    ),
                    make_q(
                        "Verify Rolle's Theorem for $f(x) = x^2 - 5x + 4$ on $[1, 4]$. What is the value of $c$?",
                        ["$2.5$", "$2.0$", "$3.0$", "$1.5$"], 0,
                        "$f(1) = 0$ and $f(4) = 0$. $f'(x) = 2x - 5 = 0 \\Rightarrow c = 2.5 \\in (1, 4)$."
                    ),
                    make_q(
                        "If a differentiable function has $3$ distinct real zeros, what is the minimum number of zeros its derivative $f'(x)$ must have?",
                        ["$2$", "$1$", "$3$", "$0$"], 0,
                        "By Rolle's Theorem, between each pair of consecutive zeros there must be at least one zero of $f'(x)$. For $3$ zeros, there are $2$ intervals, so at least $2$ zeros of $f'$."
                    )
                ]
            },
            {
                "heading": "Section 4: Absolute Extrema on Closed Intervals (Candidates Test)",
                "questions": [
                    make_q(
                        "Find the absolute maximum value of $f(x) = 2x^3 - 3x^2 - 12x + 1$ on $[-2, 3]$.",
                        ["$8$", "$1$", "$-19$", "$-8$"], 0,
                        "Critical points: $f'(x) = 6x^2 - 6x - 12 = 6(x - 2)(x + 1) = 0 \\Rightarrow x = -1, 2$. Candidates: $f(-2) = -3, f(-1) = 8, f(2) = -19, f(3) = -8$. Absolute maximum is $8$."
                    ),
                    make_q(
                        "What is the absolute minimum value in the problem above?",
                        ["$-19$", "$-8$", "$-3$", "$1$"], 0,
                        "From the candidates test above, the lowest evaluated value is $f(2) = -19$."
                    ),
                    make_q(
                        "Where can the absolute extrema of a continuous function on a closed interval $[a, b]$ occur?",
                        ["At critical points inside $(a, b)$ or at the endpoints $a, b$", "Only at endpoints", "Only where $f'(x) = 0$", "Anywhere on the interval"], 0,
                        "By the Closed Interval Method (Candidates Test), absolute extrema must occur either at interior critical points or at the boundary endpoints."
                    )
                ]
            }
        ]
    },

    # --------------------------------------------------------------------------
    # APAB 5.02: Concavity, Curve Sketching, and Optimization
    # --------------------------------------------------------------------------
    {
        "track": "apab",
        "num": "5.02",
        "slug": "concavity-curve-sketching-and-optimization",
        "title": "Concavity, Curve Sketching, and Optimization",
        "sections": [
            {
                "heading": "Section 1: Concavity & Points of Inflection",
                "questions": [
                    make_q(
                        "On which interval is the function $f(x) = x^3 - 6x^2 + 9x$ concave up?",
                        ["$(2, \\infty)$", "$(-\\infty, 2)$", "$(1, 3)$", "$(0, \\infty)$"], 0,
                        "$f'(x) = 3x^2 - 12x + 9$. $f''(x) = 6x - 12$. Concave up where $f''(x) > 0 \\Rightarrow 6x - 12 > 0 \\Rightarrow x > 2$."
                    ),
                    make_q(
                        "What is the point of inflection of the curve $f(x) = x^3 - 6x^2 + 9x$?",
                        ["$(2, 2)$", "$(2, 0)$", "$(1, 4)$", "$(3, 0)$"], 0,
                        "$f''(x) = 0 \\Rightarrow x = 2$. $f(2) = 2^3 - 6(4) + 9(2) = 8 - 24 + 18 = 2$. Since $f''$ changes sign across $x = 2$, $(2, 2)$ is a point of inflection."
                    ),
                    make_q(
                        "What is a necessary condition for $(c, f(c))$ to be a point of inflection?",
                        ["$f''(c) = 0$ or $f''(c)$ undefined, AND $f''$ changes sign across $c$", "$f'(c) = 0$", "$f''(c) = 0$ only", "$f(c) = 0$"], 0,
                        "A point of inflection requires the concavity to change sign, meaning $f''$ must change sign across $c$ (where $f''(c) = 0$ or does not exist)."
                    )
                ]
            },
            {
                "heading": "Section 2: Second Derivative Test for Local Extrema",
                "questions": [
                    make_q(
                        "If $f'(3) = 0$ and $f''(3) = -4$, what does the Second Derivative Test conclude about $x = 3$?",
                        ["$f$ has a local maximum at $x = 3$", "$f$ has a local minimum at $x = 3$", "The test is inconclusive", "$x = 3$ is an inflection point"], 0,
                        "Since $f'(3) = 0$ (horizontal tangent) and $f''(3) < 0$ (concave down), $f$ has a local maximum at $x = 3$."
                    ),
                    make_q(
                        "When is the Second Derivative Test inconclusive at a critical point $c$?",
                        ["When $f''(c) = 0$ or $f''(c)$ does not exist", "When $f''(c) > 0$", "When $f'(c) = 0$", "When $f(c) = 0$"], 0,
                        "If $f''(c) = 0$ or fails to exist, the test provides no information and one must use the First Derivative Test instead."
                    ),
                    make_q(
                        "Apply the Second Derivative Test to $f(x) = x^4 - 4x^3$ at its critical point $x = 3$.",
                        ["Local minimum because $f''(3) = 36 > 0$", "Local maximum because $f''(3) < 0$", "Inflection point", "Inconclusive"], 0,
                        "$f'(x) = 4x^3 - 12x^2 = 4x^2(x - 3) = 0 \\Rightarrow x = 3$. $f''(x) = 12x^2 - 24x \\Rightarrow f''(3) = 12(9) - 24(3) = 108 - 72 = 36 > 0$. Local minimum."
                    )
                ]
            },
            {
                "heading": "Section 3: Applied Optimization: Geometric Problems",
                "questions": [
                    make_q(
                        "A farmer has $200$ meters of fencing to enclose a rectangular field adjacent to a straight river (no fence needed along the river). What dimensions maximize the area?",
                        ["Length $100$ m, Width $50$ m", "Length $80$ m, Width $60$ m", "Length $120$ m, Width $40$ m", "Square of side $66.7$ m"], 0,
                        "Fence: $2W + L = 200 \\Rightarrow L = 200 - 2W$. Area $A(W) = W(200 - 2W) = 200W - 2W^2$. $A'(W) = 200 - 4W = 0 \\Rightarrow W = 50$ m, $L = 100$ m."
                    ),
                    make_q(
                        "An open-top rectangular box is formed by cutting equal squares of side $x$ from the corners of a $12$ by $12$ cm sheet of cardboard. What value of $x$ maximizes the box volume?",
                        ["$x = 2$ cm", "$x = 3$ cm", "$x = 1.5$ cm", "$x = 4$ cm"], 0,
                        "$V(x) = x(12 - 2x)^2 = x(144 - 48x + 4x^2) = 4x^3 - 48x^2 + 144x$. $V'(x) = 12x^2 - 96x + 144 = 12(x^2 - 8x + 12) = 12(x - 2)(x - 6) = 0$. Since $0 < x < 6$, $x = 2$ cm."
                    ),
                    make_q(
                        "What is the maximum volume in the box problem above?",
                        ["$128$ cm$^3$", "$144$ cm$^3$", "$108$ cm$^3$", "$96$ cm$^3$"], 0,
                        "$V(2) = 2(12 - 4)^2 = 2(8^2) = 2(64) = 128$ cm$^3$."
                    )
                ]
            },
            {
                "heading": "Section 4: Applied Optimization: Cost & Distance",
                "questions": [
                    make_q(
                        "Which point on the line $y = 2x + 1$ is closest to the origin $(0, 0)$?",
                        ["$(-\\frac{2}{5}, \\frac{1}{5})$", "$(-1, -1)$", "$(0, 1)$", "$(-\\frac{1}{2}, 0)$"], 0,
                        "Squared distance $D(x) = x^2 + (2x + 1)^2 = 5x^2 + 4x + 1$. $D'(x) = 10x + 4 = 0 \\Rightarrow x = -\\frac{2}{5}$. Then $y = 2(-2/5) + 1 = \\frac{1}{5}$."
                    ),
                    make_q(
                        "A company determines that total cost for producing $x$ units is $C(x) = 0.01x^2 + 4x + 100$. What production level minimizes average cost $\\bar{C}(x) = \\frac{C(x)}{x}$?",
                        ["$x = 100$", "$x = 50$", "$x = 200$", "$x = 400$"], 0,
                        "$\\bar{C}(x) = 0.01x + 4 + \\frac{100}{x}$. $\\bar{C}'(x) = 0.01 - \\frac{100}{x^2} = 0 \\Rightarrow x^2 = \\frac{100}{0.01} = 10,000 \\Rightarrow x = 100$."
                    ),
                    make_q(
                        "Two positive numbers have a product of $36$. What is their minimum sum?",
                        ["$12$", "$13$", "$15$", "$20$"], 0,
                        "Let numbers be $x$ and $\\frac{36}{x}$. $S(x) = x + \\frac{36}{x}$. $S'(x) = 1 - \\frac{36}{x^2} = 0 \\Rightarrow x = 6$. Minimum sum $= 6 + 6 = 12$."
                    )
                ]
            }
        ]
    },

    # --------------------------------------------------------------------------
    # APAB 6.01: Antiderivatives and Riemann Sums
    # --------------------------------------------------------------------------
    {
        "track": "apab",
        "num": "6.01",
        "slug": "antiderivatives-and-riemann-sums",
        "title": "Antiderivatives and Riemann Sums",
        "sections": [
            {
                "heading": "Section 1: Basic Antiderivatives & Power Rule for Integration",
                "questions": [
                    make_q(
                        "Evaluate the indefinite integral $\\int (6x^2 - 4x + 7) dx$.",
                        ["$2x^3 - 2x^2 + 7x + C$", "$3x^3 - 2x^2 + 7x + C$", "$12x - 4 + C$", "$2x^3 - 4x^2 + 7x + C$"], 0,
                        "Apply the power rule: $\\int 6x^2 dx = 2x^3$, $\\int -4x dx = -2x^2$, $\\int 7 dx = 7x$. Add constant of integration $C$."
                    ),
                    make_q(
                        "Find $\\int (\\frac{3}{x} + \\frac{1}{x^2}) dx$ for $x > 0$.",
                        ["$3\\ln x - \\frac{1}{x} + C$", "$3\\ln x + \\frac{1}{x} + C$", "$-\\frac{3}{x^2} - \\frac{2}{x^3} + C$", "$3\\ln x - \\frac{1}{2x} + C$"], 0,
                        "$\\int \\frac{3}{x} dx = 3\\ln|x|$ and $\\int x^{-2} dx = -x^{-1} = -\\frac{1}{x}$."
                    ),
                    make_q(
                        "Find the general antiderivative of $f(x) = \\sec^2 x + e^{3x}$.",
                        ["$\\tan x + \\frac{1}{3}e^{3x} + C$", "$\\sec x \\tan x + 3e^{3x} + C$", "$\\tan x + 3e^{3x} + C$", "$2\\sec x + \\frac{1}{3}e^{3x} + C$"], 0,
                        "$\\int \\sec^2 x dx = \\tan x$ and $\\int e^{3x} dx = \\frac{1}{3}e^{3x} + C$."
                    )
                ]
            },
            {
                "heading": "Section 2: Left and Right Riemann Sums",
                "questions": [
                    make_q(
                        "Approximate $\\int_0^4 x^2 dx$ using a Left Riemann sum with $n = 4$ equal subintervals.",
                        ["$14$", "$30$", "$21.33$", "$16$"], 0,
                        "$\\Delta x = \\frac{4 - 0}{4} = 1$. Subintervals: $[0,1], [1,2], [2,3], [3,4]$. Left endpoints: $0, 1, 2, 3$. Sum $= 1(0^2 + 1^2 + 2^2 + 3^2) = 1(0 + 1 + 4 + 9) = 14$."
                    ),
                    make_q(
                        "What is the Right Riemann sum approximation for the above integral with $n = 4$?",
                        ["$30$", "$14$", "$22$", "$21.33$"], 0,
                        "Right endpoints: $1, 2, 3, 4$. Sum $= 1(1^2 + 2^2 + 3^2 + 4^2) = 1(1 + 4 + 9 + 16) = 30$."
                    ),
                    make_q(
                        "If $f(x)$ is strictly increasing on $[a, b]$, what is the relationship between Left and Right Riemann sums and the true integral value $I$?",
                        ["Left Sum $< I <$ Right Sum", "Right Sum $< I <$ Left Sum", "Left Sum $=$ Right Sum", "Cannot be determined without concavity"], 0,
                        "For an increasing function, rectangles using left endpoints underestimate the area while right endpoints overestimate the area: $\\text{Left} < I < \\text{Right}$."
                    )
                ]
            },
            {
                "heading": "Section 3: Midpoint & Trapezoidal Approximations",
                "questions": [
                    make_q(
                        "Using the Trapezoidal Rule with $n = 4$ equal subintervals, approximate $\\int_0^4 x^2 dx$.",
                        ["$22$", "$21.33$", "$24$", "$20$"], 0,
                        "Trapezoidal sum $= \\frac{\\text{Left} + \\text{Right}}{2} = \\frac{14 + 30}{2} = 22$."
                    ),
                    make_q(
                        "If $f''(x) > 0$ (concave up) on $[a, b]$, how does the Trapezoidal Rule approximation compare to the exact integral?",
                        ["Trapezoidal Rule overestimates the true value", "Trapezoidal Rule underestimates the true value", "Trapezoidal Rule is exact", "Depends on whether $f$ is increasing"], 0,
                        "Chords connecting points on a concave up curve lie entirely above the curve, so trapezoids overestimate the true area."
                    ),
                    make_q(
                        "Approximate $\\int_0^2 x^3 dx$ using a Midpoint Riemann sum with $n = 2$ equal subintervals.",
                        ["$3.5$", "$4.0$", "$4.5$", "$2.0$"], 0,
                        "$\\Delta x = 1$. Subintervals $[0, 1]$ and $[1, 2]$. Midpoints: $x_1^* = 0.5, x_2^* = 1.5$. Sum $= 1((0.5)^3 + (1.5)^3) = 0.125 + 3.375 = 3.5$."
                    )
                ]
            },
            {
                "heading": "Section 4: Limit of a Riemann Sum & Definite Integrals",
                "questions": [
                    make_q(
                        "Which definite integral is equal to $\\lim_{n \\to \\infty} \\sum_{i=1}^n (1 + \\frac{2i}{n})^3 \\frac{2}{n}$?",
                        ["$\\int_1^3 x^3 dx$", "$\\int_0^2 x^3 dx$", "$\\int_1^2 (1 + x)^3 dx$", "$\\int_0^1 (1 + 2x)^3 dx$"], 0,
                        "Here $\\Delta x = \\frac{2}{n}$, interval length $= 2$. $x_i = 1 + i \\Delta x \\Rightarrow a = 1, b = 3$. The function is $f(x) = x^3$, giving $\\int_1^3 x^3 dx$."
                    ),
                    make_q(
                        "Evaluate $\\int_1^3 x^3 dx$.",
                        ["$20$", "$18$", "$26$", "$80$"], 0,
                        "$[\\frac{x^4}{4}]_1^3 = \\frac{81}{4} - \\frac{1}{4} = \\frac{80}{4} = 20$."
                    ),
                    make_q(
                        "Express $\\int_0^5 \\sqrt{x} dx$ as a limit of a Right Riemann sum.",
                        ["$\\lim_{n \\to \\infty} \\sum_{i=1}^n \\sqrt{\\frac{5i}{n}} \\frac{5}{n}$", "$\\lim_{n \\to \\infty} \\sum_{i=1}^n \\sqrt{\\frac{i}{n}} \\frac{5}{n}$", "$\\lim_{n \\to \\infty} \\sum_{i=1}^n \\sqrt{5i} \\frac{1}{n}$", "$\\lim_{n \\to \\infty} \\sum_{i=1}^n \\frac{5}{n} \\sqrt{x_i}$"], 0,
                        "$\\Delta x = \\frac{5}{n}$ and right endpoints are $x_i = \\frac{5i}{n}$, so the sum is $\\lim_{n \\to \\infty} \\sum_{i=1}^n \\sqrt{\\frac{5i}{n}} \\frac{5}{n}$."
                    )
                ]
            }
        ]
    },

    # --------------------------------------------------------------------------
    # APAB 6.02: The Fundamental Theorem of Calculus
    # --------------------------------------------------------------------------
    {
        "track": "apab",
        "num": "6.02",
        "slug": "the-fundamental-theorem-of-calculus",
        "title": "The Fundamental Theorem of Calculus",
        "sections": [
            {
                "heading": "Section 1: FTC Part 1 (Differentiating Integrals)",
                "questions": [
                    make_q(
                        "Find $\\frac{d}{dx} [\\int_2^x \\sqrt{t^3 + 1} dt]$.",
                        ["$\\sqrt{x^3 + 1}$", "$\\frac{3x^2}{2\\sqrt{x^3 + 1}}$", "$\\sqrt{x^3 + 1} - 3$", "$x^3 + 1$"], 0,
                        "By FTC Part 1, $\\frac{d}{dx}[\\int_a^x f(t) dt] = f(x)$. Here it equals $\\sqrt{x^3 + 1}$."
                    ),
                    make_q(
                        "Find $\\frac{d}{dx} [\\int_0^{x^2} \\cos(t) dt]$.",
                        ["$2x\\cos(x^2)$", "$\\cos(x^2)$", "$-2x\\sin(x^2)$", "$\\sin(x^2)$"], 0,
                        "By FTC Part 1 with the Chain Rule: $\\cos(u) \\cdot \\frac{du}{dx} = \\cos(x^2) \\cdot 2x = 2x\\cos(x^2)$."
                    ),
                    make_q(
                        "Find $\\frac{d}{dx} [\\int_{2x}^{3x} t^2 dt]$.",
                        ["$19x^2$", "$27x^2 - 8x^2$", "$35x^2$", "$5x^2$"], 0,
                        "$\\frac{d}{dx}[\\int_{2x}^{3x} t^2 dt] = (3x)^2 \\cdot 3 - (2x)^2 \\cdot 2 = 9x^2(3) - 4x^2(2) = 27x^2 - 8x^2 = 19x^2$."
                    )
                ]
            },
            {
                "heading": "Section 2: FTC Part 2 (Evaluation Theorem)",
                "questions": [
                    make_q(
                        "Evaluate $\\int_0^\\pi \\sin x dx$.",
                        ["$2$", "$0$", "$1$", "$-2$"], 0,
                        "Antiderivative is $[-\\cos x]_0^\\pi = -\\cos(\\pi) - (-\\cos 0) = -(-1) - (-1) = 1 + 1 = 2$."
                    ),
                    make_q(
                        "Evaluate $\\int_1^4 \\frac{1}{\\sqrt{x}} dx$.",
                        ["$2$", "$1$", "$4$", "$\\frac{1}{2}$"], 0,
                        "$\\int x^{-1/2} dx = [2\\sqrt{x}]_1^4 = 2(2) - 2(1) = 4 - 2 = 2$."
                    ),
                    make_q(
                        "Evaluate $\\int_0^1 e^{2x} dx$.",
                        ["$\\frac{e^2 - 1}{2}$", "$e^2 - 1$", "$\\frac{e^2}{2}$", "$2(e^2 - 1)$"], 0,
                        "$[\\frac{1}{2} e^{2x}]_0^1 = \\frac{1}{2}(e^2 - e^0) = \\frac{e^2 - 1}{2}$."
                    )
                ]
            },
            {
                "heading": "Section 3: Integration by u-Substitution",
                "questions": [
                    make_q(
                        "Evaluate $\\int 2x (x^2 + 1)^4 dx$.",
                        ["$\\frac{(x^2 + 1)^5}{5} + C$", "$\\frac{(x^2 + 1)^5}{10} + C$", "$(x^2 + 1)^5 + C$", "$\\frac{2(x^2 + 1)^5}{5} + C$"], 0,
                        "Let $u = x^2 + 1 \\Rightarrow du = 2x dx$. $\\int u^4 du = \\frac{u^5}{5} + C = \\frac{(x^2 + 1)^5}{5} + C$."
                    ),
                    make_q(
                        "Evaluate the definite integral $\\int_0^1 x e^{x^2} dx$.",
                        ["$\\frac{e - 1}{2}$", "$e - 1$", "$\\frac{e}{2}$", "$2(e - 1)$"], 0,
                        "Let $u = x^2 \\Rightarrow du = 2x dx$. When $x = 0, u = 0$; when $x = 1, u = 1$. Integral becomes $\\frac{1}{2} \\int_0^1 e^u du = \\frac{1}{2}[e^1 - e^0] = \\frac{e - 1}{2}$."
                    ),
                    make_q(
                        "Evaluate $\\int_0^{\\pi/4} \\tan x \\sec^2 x dx$.",
                        ["$\\frac{1}{2}$", "$1$", "$\\frac{1}{4}$", "$\\frac{\\sqrt{2}}{2}$"], 0,
                        "Let $u = \\tan x \\Rightarrow du = \\sec^2 x dx$. Limits: $\\tan(0) = 0, \\tan(\\pi/4) = 1$. $\\int_0^1 u du = [\\frac{u^2}{2}]_0^1 = \\frac{1}{2}$."
                    )
                ]
            },
            {
                "heading": "Section 4: Average Value of a Function",
                "questions": [
                    make_q(
                        "What is the average value of $f(x) = 3x^2 - 2x$ on the interval $[0, 3]$?",
                        ["$6$", "$9$", "$18$", "$3$"], 0,
                        "$f_{\\text{avg}} = \\frac{1}{3 - 0} \\int_0^3 (3x^2 - 2x) dx = \\frac{1}{3} [x^3 - x^2]_0^3 = \\frac{1}{3}(27 - 9) = \\frac{1}{3}(18) = 6$."
                    ),
                    make_q(
                        "By the Mean Value Theorem for Integrals, what is guaranteed for a continuous function $f$ on $[a, b]$?",
                        ["There exists $c \\in (a, b)$ such that $f(c) = f_{\\text{avg}}$", "$f'(c) = 0$", "$f(a) = f(b)$", "$f_{\\text{avg}} = 0$"], 0,
                        "The MVT for Integrals guarantees at least one point $c$ where the function value equals its average value: $f(c) = \\frac{1}{b - a} \\int_a^b f(x) dx$."
                    ),
                    make_q(
                        "What is the average value of $f(x) = \\sin x$ on $[0, \\pi]$?",
                        ["$\\frac{2}{\\pi}$", "$\\frac{1}{\\pi}$", "$0$", "$1$"], 0,
                        "$f_{\\text{avg}} = \\frac{1}{\\pi - 0} \\int_0^\\pi \\sin x dx = \\frac{1}{\\pi} [-\\cos x]_0^\\pi = \\frac{1}{\\pi}(1 - (-1)) = \\frac{2}{\\pi}$."
                    )
                ]
            }
        ]
    },

    # --------------------------------------------------------------------------
    # APAB 7.01: Differential Equations and Slope Fields
    # --------------------------------------------------------------------------
    {
        "track": "apab",
        "num": "7.01",
        "slug": "differential-equations-and-slope-fields",
        "title": "Differential Equations and Slope Fields",
        "sections": [
            {
                "heading": "Section 1: Slope Fields & Solution Curves",
                "questions": [
                    make_q(
                        "In the slope field for $\\frac{dy}{dx} = x - y$, what is the slope at the point $(3, 1)$?",
                        ["$2$", "$4$", "$-2$", "$3$"], 0,
                        "Substitute coordinates: $\\frac{dy}{dx} = 3 - 1 = 2$."
                    ),
                    make_q(
                        "Along which line in the slope field for $\\frac{dy}{dx} = 2x + y$ are all slope segments horizontal?",
                        ["$y = -2x$", "$y = 2x$", "$x = 0$", "$y = 0$"], 0,
                        "Horizontal slopes have $\\frac{dy}{dx} = 0 \\Rightarrow 2x + y = 0 \\Rightarrow y = -2x$."
                    ),
                    make_q(
                        "If a slope field has parallel slopes along every vertical line ($x = c$), which type of differential equation could generate it?",
                        ["$\\frac{dy}{dx} = f(x)$", "$\\frac{dy}{dx} = f(y)$", "$\\frac{dy}{dx} = x + y$", "$\\frac{dy}{dx} = xy$"], 0,
                        "If slopes depend solely on $x$ (constant for any fixed $x$), the differential equation is of the form $\\frac{dy}{dx} = f(x)$."
                    )
                ]
            },
            {
                "heading": "Section 2: Separation of Variables",
                "questions": [
                    make_q(
                        "Solve the differential equation $\\frac{dy}{dx} = 3x^2 y$ with initial condition $y(0) = 5$.",
                        ["$y = 5e^{x^3}$", "$y = e^{x^3} + 4$", "$y = 5e^{3x^2}$", "$y = x^3 + 5$"], 0,
                        "Separate variables: $\\frac{1}{y} dy = 3x^2 dx \\Rightarrow \\ln|y| = x^3 + C \\Rightarrow y = A e^{x^3}$. Since $y(0) = 5$, $A = 5$, giving $y = 5e^{x^3}$."
                    ),
                    make_q(
                        "Solve $\\frac{dy}{dx} = \\frac{x}{y}$ with initial condition $y(0) = -3$.",
                        ["$y = -\\sqrt{x^2 + 9}$", "$y = \\sqrt{x^2 + 9}$", "$y = x^2 - 3$", "$y = -\\sqrt{x^2 - 9}$"], 0,
                        "$y dy = x dx \\Rightarrow \\frac{y^2}{2} = \\frac{x^2}{2} + C \\Rightarrow y^2 = x^2 + 2C$. Since $y(0) = -3$, $9 = 2C$. Taking the negative square root to match $y(0) = -3$: $y = -\\sqrt{x^2 + 9}$."
                    ),
                    make_q(
                        "What is the domain of the particular solution $y = \\frac{1}{2 - x}$ with $y(0) = \\frac{1}{2}$?",
                        ["$(-\\infty, 2)$", "$(2, \\infty)$", "$x \\neq 2$", "All real numbers"], 0,
                        "The solution must be on an open interval containing the initial point $x_0 = 0$. Since the discontinuity is at $x = 2$, the domain is $(-\\infty, 2)$."
                    )
                ]
            },
            {
                "heading": "Section 3: Exponential Growth & Decay Models",
                "questions": [
                    make_q(
                        "Which differential equation models a quantity whose rate of growth is directly proportional to its current size?",
                        ["$\\frac{dy}{dt} = ky$", "$\\frac{dy}{dt} = k$", "$\\frac{dy}{dt} = kt$", "$\\frac{dy}{dt} = k(M - y)$"], 0,
                        "The classic natural growth model states $\\frac{dy}{dt} = ky$, whose solution is $y(t) = y_0 e^{kt}$."
                    ),
                    make_q(
                        "A population grows according to $\\frac{dP}{dt} = 0.05P$. If initial population is $1,000$, what is the population at $t = 20$?",
                        ["$1000 e$", "$1000 e^2$", "$2000$", "$1000(1.05)^{20}$"], 0,
                        "$P(t) = 1000 e^{0.05 t}$. For $t = 20$: $P(20) = 1000 e^{0.05(20)} = 1000 e^1 = 1000 e$."
                    ),
                    make_q(
                        "A radioactive substance has a half-life of $10$ years. What is its decay constant $k$ in $\\frac{dy}{dt} = -k y$?",
                        ["$k = \\frac{\\ln 2}{10}$", "$k = 10\\ln 2$", "$k = \\frac{1}{10}$", "$k = 0.5$"], 0,
                        "$e^{-10k} = \\frac{1}{2} \\Rightarrow -10k = -\\ln 2 \\Rightarrow k = \\frac{\\ln 2}{10}$."
                    )
                ]
            },
            {
                "heading": "Section 4: Newton's Law of Cooling",
                "questions": [
                    make_q(
                        "Newton's Law of Cooling states that $\\frac{dT}{dt} = -k(T - T_m)$. What does $T_m$ represent?",
                        ["The ambient temperature of the surrounding medium", "The initial temperature of the object", "The maximum temperature reached", "The rate of heat transfer"], 0,
                        "In Newton's Law of Cooling, $T_m$ is the constant ambient temperature of the surrounding environment."
                    ),
                    make_q(
                        "A cup of coffee at $90^\\circ$C cools in a room of $20^\\circ$C. If its temperature after $10$ minutes is $60^\\circ$C, what is the temperature difference $T - 20$ at $t = 10$?",
                        ["$40^\\circ$C", "$70^\\circ$C", "$30^\\circ$C", "$20^\\circ$C"], 0,
                        "Temperature difference is $60 - 20 = 40^\\circ$C."
                    ),
                    make_q(
                        "What is $\\lim_{t \\to \\infty} T(t)$ in Newton's Law of Cooling?",
                        ["$T_m$", "$0$", "$\\infty$", "$T_0$"], 0,
                        "As time approaches infinity, the object's temperature asymptotically approaches the surrounding temperature $T_m$."
                    )
                ]
            }
        ]
    },

    # --------------------------------------------------------------------------
    # APAB 8.01: Area Between Curves
    # --------------------------------------------------------------------------
    {
        "track": "apab",
        "num": "8.01",
        "slug": "area-between-curves",
        "title": "Area Between Curves",
        "sections": [
            {
                "heading": "Section 1: Area Between Curves Integrated with Respect to x",
                "questions": [
                    make_q(
                        "What is the area of the region enclosed by $y = x^2$ and $y = 4$?",
                        ["$\\frac{32}{3}$", "$\\frac{16}{3}$", "$16$", "$8$"], 0,
                        "Intersection points: $x^2 = 4 \\Rightarrow x = \\pm 2$. Area $= \\int_{-2}^2 (4 - x^2) dx = 2[4x - \\frac{x^3}{3}]_0^2 = 2(8 - \\frac{8}{3}) = 2(\\frac{16}{3}) = \\frac{32}{3}$."
                    ),
                    make_q(
                        "Find the area between $y = x$ and $y = x^2$.",
                        ["$\\frac{1}{6}$", "$\\frac{1}{3}$", "$\\frac{1}{2}$", "$\\frac{1}{12}$"], 0,
                        "Intersections: $x = x^2 \\Rightarrow x = 0, 1$. Over $[0, 1]$, $x \\geq x^2$. Area $= \\int_0^1 (x - x^2) dx = [\\frac{x^2}{2} - \\frac{x^3}{3}]_0^1 = \\frac{1}{2} - \\frac{1}{3} = \\frac{1}{6}$."
                    ),
                    make_q(
                        "Which integral represents the area enclosed by $y = \\sin x$ and $y = \\cos x$ from $x = 0$ to $x = \\frac{\\pi}{4}$?",
                        ["$\\int_0^{\\pi/4} (\\cos x - \\sin x) dx$", "$\\int_0^{\\pi/4} (\\sin x - \\cos x) dx$", "$\\int_0^{\\pi/4} (\\cos x + \\sin x) dx$", "$\\int_0^{\\pi/2} \\cos x dx$"], 0,
                        "On $[0, \\pi/4]$, $\\cos x \\geq \\sin x$. The upper curve is $\\cos x$ and lower is $\\sin x$, so $\\int_0^{\\pi/4} (\\cos x - \\sin x) dx$."
                    )
                ]
            },
            {
                "heading": "Section 2: Area Between Curves Integrated with Respect to y",
                "questions": [
                    make_q(
                        "Find the area of the region bounded by $x = y^2$ and $x = y + 2$.",
                        ["$\\frac{9}{2}$", "$\\frac{16}{3}$", "$\\frac{7}{2}$", "$6$"], 0,
                        "Intersections in $y$: $y^2 = y + 2 \\Rightarrow y^2 - y - 2 = 0 \\Rightarrow (y - 2)(y + 1) = 0 \\Rightarrow y = -1, 2$. Area $= \\int_{-1}^2 (y + 2 - y^2) dy = [\\frac{y^2}{2} + 2y - \\frac{y^3}{3}]_{-1}^2 = (2 + 4 - \\frac{8}{3}) - (\\frac{1}{2} - 2 + \\frac{1}{3}) = \\frac{10}{3} - (-\\frac{7}{6}) = \\frac{20 + 7}{6} = \\frac{27}{6} = \\frac{9}{2}$."
                    ),
                    make_q(
                        "When is it advantageous to integrate with respect to $y$ rather than $x$?",
                        ["When the boundary curves are expressed as $x = f(y)$ and solving for $y$ requires multiple piecewise branches", "When the area is negative", "Always for quadratic curves", "Never on the AP Exam"], 0,
                        "Integrating with respect to $y$ (right curve minus left curve) simplifies the setup whenever solving for $y$ yields plus/minus roots and splits the region into multiple integrals."
                    ),
                    make_q(
                        "Find the area bounded by $x = 0, y = 1, y = 3,$ and $x = \\frac{1}{y}$.",
                        ["$\\ln 3$", "$\\ln 2$", "$3$", "$2$"], 0,
                        "Area $= \\int_1^3 \\frac{1}{y} dy = [\\ln|y|]_1^3 = \\ln 3 - \\ln 1 = \\ln 3$."
                    )
                ]
            },
            {
                "heading": "Section 3: Intersecting Curves with Multiple Regions",
                "questions": [
                    make_q(
                        "The graphs of $y = x^3$ and $y = x$ enclose how many symmetric regions?",
                        ["$2$ symmetric regions", "$1$ region", "$3$ regions", "Infinitely many"], 0,
                        "Intersections: $x^3 - x = 0 \\Rightarrow x(x - 1)(x + 1) = 0 \\Rightarrow x = -1, 0, 1$. The curves enclose $2$ symmetric regions (on $[-1, 0]$ and $[0, 1]$)."
                    ),
                    make_q(
                        "What is the total area enclosed by $y = x^3$ and $y = x$?",
                        ["$\\frac{1}{2}$", "$\\frac{1}{4}$", "$0$", "$1$"], 0,
                        "Total Area $= 2 \\int_0^1 (x - x^3) dx = 2 [\\frac{x^2}{2} - \\frac{x^4}{4}]_0^1 = 2(\\frac{1}{2} - \\frac{1}{4}) = 2(\\frac{1}{4}) = \\frac{1}{2}$."
                    ),
                    make_q(
                        "Why does $\\int_{-1}^1 (x - x^3) dx = 0$ NOT represent the enclosed area?",
                        ["The integrand is odd, causing positive and negative signed areas to cancel out", "The curves do not intersect at $0$", "The integral diverges", "The bounds are incorrect"], 0,
                        "A definite integral computes net signed area. For true area, one must integrate $|f(x) - g(x)|$."
                    )
                ]
            },
            {
                "heading": "Section 4: Area Partitions & Horizontal/Vertical Lines",
                "questions": [
                    make_q(
                        "The line $x = k$ divides the region between $y = x^2$ and the $x$-axis from $x = 0$ to $x = 2$ into two equal areas. Find $k$.",
                        ["$\\sqrt[3]{4}$", "$1$", "$\\sqrt{2}$", "$\\frac{4}{3}$"], 0,
                        "Total Area $= \\int_0^2 x^2 dx = \\frac{8}{3}$. Half area is $\\frac{4}{3}$. $\\int_0^k x^2 dx = \\frac{k^3}{3} = \\frac{4}{3} \\Rightarrow k^3 = 4 \\Rightarrow k = \\sqrt[3]{4}$."
                    ),
                    make_q(
                        "Find the area enclosed by $y = e^x, y = e^{-x},$ and the vertical line $x = 1$.",
                        ["$e + \\frac{1}{e} - 2$", "$e - 1$", "$e + \\frac{1}{e}$", "$2e - 2$"], 0,
                        "Intersections: $e^x = e^{-x} \\Rightarrow x = 0$. On $[0, 1]$, $e^x \\geq e^{-x}$. Area $= \\int_0^1 (e^x - e^{-x}) dx = [e^x + e^{-x}]_0^1 = (e + e^{-1}) - (1 + 1) = e + \\frac{1}{e} - 2$."
                    ),
                    make_q(
                        "Find the area of the region bounded by $y = \\sqrt{x}$, the line $y = 2$, and the $y$-axis.",
                        ["$\\frac{8}{3}$", "$4$", "$\\frac{4}{3}$", "$2$"], 0,
                        "Integrating with respect to $y$: $x = y^2$ from $y = 0$ to $y = 2$. Area $= \\int_0^2 y^2 dy = [\\frac{y^3}{3}]_0^2 = \\frac{8}{3}$."
                    )
                ]
            }
        ]
    },

    # --------------------------------------------------------------------------
    # APAB 8.02: Volumes by the Disc and Washer Methods
    # --------------------------------------------------------------------------
    {
        "track": "apab",
        "num": "8.02",
        "slug": "volumes-by-the-disc-and-washer-methods",
        "title": "Volumes by the Disc and Washer Methods",
        "sections": [
            {
                "heading": "Section 1: The Disc Method Around Coordinate Axes",
                "questions": [
                    make_q(
                        "Find the volume of the solid generated by revolving the region bounded by $y = \\sqrt{x}$, the $x$-axis, and $x = 4$ about the $x$-axis.",
                        ["$8\\pi$", "$16\\pi$", "$4\\pi$", "$\\frac{16\\pi}{3}$"], 0,
                        "Disc formula: $V = \\pi \\int_0^4 [R(x)]^2 dx = \\pi \\int_0^4 (\\sqrt{x})^2 dx = \\pi \\int_0^4 x dx = \\pi [\\frac{x^2}{2}]_0^4 = 8\\pi$."
                    ),
                    make_q(
                        "Find the volume when the region bounded by $y = x^2, x = 0,$ and $y = 4$ is revolved about the $y$-axis.",
                        ["$8\\pi$", "$16\\pi$", "$4\\pi$", "$\\frac{32\\pi}{5}$"], 0,
                        "Revolving about $y$-axis: $x = \\sqrt{y}$. $V = \\pi \\int_0^4 (\\sqrt{y})^2 dy = \\pi \\int_0^4 y dy = \\pi [\\frac{y^2}{2}]_0^4 = 8\\pi$."
                    ),
                    make_q(
                        "What is the cross-sectional shape of a solid formed by the disc method?",
                        ["A solid circular disk of area $\\pi R^2$", "A circular ring (washer)", "A rectangle", "A cylindrical shell"], 0,
                        "The disc method generates perpendicular slices that are solid circular disks with area $A(x) = \\pi [R(x)]^2$."
                    )
                ]
            },
            {
                "heading": "Section 2: The Washer Method Around Coordinate Axes",
                "questions": [
                    make_q(
                        "The region enclosed by $y = x$ and $y = x^2$ is revolved about the $x$-axis. What is the resulting volume?",
                        ["$\\frac{2\\pi}{15}$", "$\\frac{\\pi}{6}$", "$\\frac{\\pi}{15}$", "$\\frac{4\\pi}{15}$"], 0,
                        "Intersections at $x = 0, 1$. Outer radius $R(x) = x$, inner radius $r(x) = x^2$. $V = \\pi \\int_0^1 (x^2 - x^4) dx = \\pi [\\frac{x^3}{3} - \\frac{x^5}{5}]_0^1 = \\pi(\\frac{1}{3} - \\frac{1}{5}) = \\frac{2\\pi}{15}$."
                    ),
                    make_q(
                        "Write the integral for the volume when the region between $y = 2x$ and $y = x^2$ is revolved about the $x$-axis.",
                        ["$\\pi \\int_0^2 (4x^2 - x^4) dx$", "$\\pi \\int_0^2 (2x - x^2)^2 dx$", "$\\pi \\int_0^2 (x^4 - 4x^2) dx$", "$2\\pi \\int_0^2 (2x - x^2) dx$"], 0,
                        "Outer radius is $2x$, inner radius is $x^2$. Washer area is $\\pi[(2x)^2 - (x^2)^2] = \\pi(4x^2 - x^4)$."
                    ),
                    make_q(
                        "Why is $\\pi \\int (R - r)^2 dx$ INCORRECT for the washer method?",
                        ["The area of a washer is $\\pi R^2 - \\pi r^2$, which is NOT equal to $\\pi(R - r)^2$", "It omits the factor of $2$", "It is only valid for shells", "It produces negative volume"], 0,
                        "Area of an annulus is $\\pi(R^2 - r^2) = \\pi R^2 - \\pi r^2$. Squaring the difference $(R - r)^2 = R^2 - 2Rr + r^2$ introduces an erroneous $-2Rr$ term."
                    )
                ]
            },
            {
                "heading": "Section 3: Revolutions Around Non-Axis Horizontal Lines",
                "questions": [
                    make_q(
                        "The region bounded by $y = x^2$ and $y = 4$ is revolved about the line $y = 4$. What is the outer radius $R(x)$?",
                        ["$R(x) = 4 - x^2$", "$R(x) = x^2$", "$R(x) = 4$", "$R(x) = x^2 - 4$"], 0,
                        "The axis of revolution is $y = 4$. The distance from the curve $y = x^2$ to the axis $y = 4$ is $4 - x^2$, which forms solid disks with radius $4 - x^2$."
                    ),
                    make_q(
                        "Find the volume in the above problem revolved about $y = 4$.",
                        ["$\\frac{256\\pi}{15}$", "$\\frac{128\\pi}{15}$", "$\\frac{64\\pi}{5}$", "$16\\pi$"], 0,
                        "$V = \\pi \\int_{-2}^2 (4 - x^2)^2 dx = 2\\pi \\int_0^2 (16 - 8x^2 + x^4) dx = 2\\pi [16x - \\frac{8x^3}{3} + \\frac{x^5}{5}]_0^2 = 2\\pi [32 - \\frac{64}{3} + \\frac{32}{5}] = 2\\pi [\\frac{480 - 320 + 96}{15}] = 2\\pi [\\frac{256}{15}] = \\frac{512\\pi}{15}$."
                    ),
                    make_q(
                        "The region between $y = \\sqrt{x}, y = 0,$ and $x = 4$ is revolved about the line $y = -1$. What are the washer radii?",
                        ["$R(x) = \\sqrt{x} + 1$ and $r(x) = 1$", "$R(x) = \\sqrt{x} - 1$ and $r(x) = -1$", "$R(x) = \\sqrt{x}$ and $r(x) = 1$", "$R(x) = 4$ and $r(x) = \\sqrt{x}$"], 0,
                        "Outer curve is $y = \\sqrt{x}$, distance to $y = -1$ is $\\sqrt{x} - (-1) = \\sqrt{x} + 1$. Inner boundary is $y = 0$, distance to $y = -1$ is $0 - (-1) = 1$."
                    )
                ]
            },
            {
                "heading": "Section 4: Volumes with Known Cross-Sections",
                "questions": [
                    make_q(
                        "The base of a solid is the region enclosed by $y = 1 - x^2$ and the $x$-axis. Cross-sections perpendicular to the $x$-axis are squares. What is the volume?",
                        ["$\\frac{16}{15}$", "$\\frac{8}{15}$", "$\\frac{4}{3}$", "$\\frac{32}{15}$"], 0,
                        "Side of square is $s(x) = 1 - x^2$. Area $A(x) = (1 - x^2)^2 = 1 - 2x^2 + x^4$. $V = \\int_{-1}^1 (1 - 2x^2 + x^4) dx = 2[x - \\frac{2x^3}{3} + \\frac{x^5}{5}]_0^1 = 2(1 - \\frac{2}{3} + \\frac{1}{5}) = 2(\\frac{8}{15}) = \\frac{16}{15}$."
                    ),
                    make_q(
                        "If cross-sections perpendicular to the $x$-axis are semicircles with diameter on the base, what is the cross-sectional area formula?",
                        ["$A(x) = \\frac{\\pi}{8} [s(x)]^2$", "$A(x) = \\frac{\\pi}{2} [s(x)]^2$", "$A(x) = \\frac{\\pi}{4} [s(x)]^2$", "$A(x) = \\pi [s(x)]^2$"], 0,
                        "Radius is $r = \\frac{s(x)}{2}$. Semicircle area is $\\frac{1}{2}\\pi r^2 = \\frac{1}{2}\\pi (\\frac{s}{2})^2 = \\frac{\\pi}{8} s^2$."
                    ),
                    make_q(
                        "If cross-sections are equilateral triangles with side length $s(x)$, what is the cross-sectional area formula?",
                        ["$A(x) = \\frac{\\sqrt{3}}{4} [s(x)]^2$", "$A(x) = \\frac{1}{2} [s(x)]^2$", "$A(x) = \\frac{\\sqrt{3}}{2} [s(x)]^2$", "$A(x) = \\frac{1}{4} [s(x)]^2$"], 0,
                        "The area of an equilateral triangle with side $s$ is $\\frac{\\sqrt{3}}{4} s^2$."
                    )
                ]
            }
        ]
    }
]
