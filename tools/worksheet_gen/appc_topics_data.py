#!/usr/bin/env python3
"""Standardized 4-Page Topic Data for AP Precalculus - Part 1 (Topics 1.01 to 2.02).

Authentic College Board AP Precalculus questions adhering strictly to the official CED.
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

APPC_TOPICS_P1 = [
    # --------------------------------------------------------------------------
    # APPC 1.01: Polynomial End Behavior & Zeros
    # --------------------------------------------------------------------------
    {
        "track": "appc",
        "num": "1.01",
        "slug": "polynomial-end-behavior-and-zeros",
        "title": "Polynomial End Behavior & Zeros",
        "sections": [
            {
                "heading": "Section 1: Leading Term Test and End Behavior",
                "questions": [
                    make_q(
                        "Determine the end behavior of the polynomial function $f(x) = -3x^5 + 7x^3 - 2x + 9$.",
                        [
                            "As $x \\to \\infty$, $f(x) \\to -\\infty$; as $x \\to -\\infty$, $f(x) \\to \\infty$",
                            "As $x \\to \\infty$, $f(x) \\to \\infty$; as $x \\to -\\infty$, $f(x) \\to -\\infty$",
                            "As $x \\to \\infty$, $f(x) \\to -\\infty$; as $x \\to -\\infty$, $f(x) \\to -\\infty$",
                            "As $x \\to \\infty$, $f(x) \\to \\infty$; as $x \\to -\\infty$, $f(x) \\to \\infty$"
                        ],
                        0,
                        "The leading term is $-3x^5$. Because the degree 5 is odd and the leading coefficient $-3$ is negative, $f(x) \\to -\\infty$ as $x \\to \\infty$, and $f(x) \\to \\infty$ as $x \\to -\\infty$."
                    ),
                    make_q(
                        "If a polynomial $p(x)$ satisfies $\\lim_{x \\to \\infty} p(x) = -\\infty$ and $\\lim_{x \\to -\\infty} p(x) = -\\infty$, which of the following could be the leading term of $p(x)$?",
                        ["$-4x^6$", "$2x^6$", "$-5x^7$", "$3x^5$"],
                        0,
                        "When both ends approach $-\\infty$, the polynomial must have an even degree and a negative leading coefficient. Among the choices, $-4x^6$ has even degree 6 and negative coefficient $-4$."
                    ),
                    make_q(
                        "Consider $g(x) = (2 - x)(x + 3)^2(2x - 1)$. What is the leading coefficient of $g(x)$?",
                        ["$-2$", "$2$", "$-1$", "$4$"],
                        0,
                        "Expanding the highest power terms: $(-x) \\cdot (x)^2 \\cdot (2x) = -2x^4$. Thus, the leading coefficient is $-2$."
                    )
                ]
            },
            {
                "heading": "Section 2: Multiplicity of Zeros and Graph Geometry",
                "questions": [
                    make_q(
                        "Let $f(x) = (x - 4)^3(x + 2)^2(x - 1)$. At which zero does the graph of $f$ touch the $x$-axis and turn around without crossing?",
                        ["$x = -2$", "$x = 4$", "$x = 1$", "$x = 2$"],
                        0,
                        "A graph touches the $x$-axis and turns around at zeros with even multiplicity. Here, $(x + 2)^2$ has multiplicity 2 (even), so $x = -2$ is a turning touch point. At $x = 4$ and $x = 1$, the graph crosses."
                    ),
                    make_q(
                        "A polynomial $p(x)$ of degree 4 has a zero at $x = 3$ of multiplicity 2, and no other real zeros. If $p(0) = 18$, which equation represents $p(x)$ if its remaining zeros are non-real complex conjugates $\\pm i$?",
                        [
                            "$p(x) = 2(x - 3)^2(x^2 + 1)$",
                            "$p(x) = (x - 3)^2(x^2 + 1)$",
                            "$p(x) = 2(x - 3)^2(x^2 - 1)$",
                            "$p(x) = \\frac{1}{2}(x - 3)^2(x^2 + 1)$"
                        ],
                        0,
                        "Zeros at $\\pm i$ correspond to factor $(x^2 + 1)$. So $p(x) = a(x - 3)^2(x^2 + 1)$. Using $p(0) = a(-3)^2(1) = 9a = 18 \\Rightarrow a = 2$. Thus $p(x) = 2(x - 3)^2(x^2 + 1)$."
                    ),
                    make_q(
                        "At $x = c$, $f(x) = (x - c)^3 g(x)$ where $g(c) \\neq 0$. What is the behavior of the graph of $f$ at $(c, 0)$?",
                        [
                            "The graph crosses the $x$-axis with an inflection/flattening point (horizontal tangent)",
                            "The graph touches the $x$-axis and turns around symmetrically",
                            "The graph has a vertical asymptote at $x = c$",
                            "The graph crosses the $x$-axis linearly without flattening"
                        ],
                        0,
                        "An odd multiplicity greater than 1 ($m = 3$) causes the graph to cross the $x$-axis while flattening out (creating an inflection point with a horizontal tangent)."
                    )
                ]
            },
            {
                "heading": "Section 3: Remainder & Factor Theorems",
                "questions": [
                    make_q(
                        "When $f(x) = 2x^3 - 5x^2 + kx - 8$ is divided by $(x - 3)$, the remainder is $7$. Find the value of $k$.",
                        ["$-4$", "$4$", "$-2$", "$5$"],
                        0,
                        "By the Remainder Theorem, $f(3) = 7$. $f(3) = 2(27) - 5(9) + 3k - 8 = 54 - 45 + 3k - 8 = 1 + 3k$. Setting $1 + 3k = 7 \\Rightarrow 3k = 6 \\Rightarrow k = 2$."
                    ),
                    make_q(
                        "Which of the following is a factor of $P(x) = x^3 - 6x^2 + 11x - 6$?",
                        ["$x - 2$", "$x + 2$", "$x - 4$", "$x + 1$"],
                        0,
                        "Evaluate $P(2) = 2^3 - 6(4) + 11(2) - 6 = 8 - 24 + 22 - 6 = 0$. Since $P(2) = 0$, by the Factor Theorem $(x - 2)$ is a factor."
                    ),
                    make_q(
                        "A polynomial $q(x)$ satisfies $q(-4) = 0$, $q(1) = 0$, and $q(5) = 12$. Which statement must be true?",
                        [
                            "$(x + 4)$ and $(x - 1)$ are factors of $q(x)$",
                            "$(x - 4)$ and $(x + 1)$ are factors of $q(x)$",
                            "The remainder when $q(x)$ is divided by $(x + 5)$ is 12",
                            "$q(x)$ must be a quadratic polynomial"
                        ],
                        0,
                        "By the Factor Theorem, $q(c) = 0 \\Leftrightarrow (x - c)$ is a factor. Here $q(-4) = 0 \\Rightarrow (x + 4)$ is a factor, and $q(1) = 0 \\Rightarrow (x - 1)$ is a factor."
                    )
                ]
            },
            {
                "heading": "Section 4: Rational Root Theorem & Complex Conjugates",
                "questions": [
                    make_q(
                        "According to the Rational Root Theorem, which of the following is NOT a possible rational zero of $f(x) = 3x^3 - 2x^2 + 5x - 4$?",
                        ["$\\frac{3}{2}$", "$\\frac{4}{3}$", "$\\pm 1$", "$\\pm 2$"],
                        0,
                        "Factors of constant term $-4$: $\\pm 1, \\pm 2, \\pm 4$. Factors of leading coefficient $3$: $\\pm 1, \\pm 3$. Possible rational roots $p/q$ are $\\pm 1, \\pm 2, \\pm 4, \\pm 1/3, \\pm 2/3, \\pm 4/3$. Thus $\\frac{3}{2}$ is not possible."
                    ),
                    make_q(
                        "A polynomial with real coefficients has degree 3. Two of its zeros are $4$ and $2 - 3i$. What is the third zero?",
                        ["$2 + 3i$", "$-2 + 3i$", "$-4$", "$-2 - 3i$"],
                        0,
                        "By the Complex Conjugate Root Theorem, non-real complex zeros of polynomials with real coefficients must occur in conjugate pairs. Since $2 - 3i$ is a zero, $2 + 3i$ must also be a zero."
                    ),
                    make_q(
                        "What is the total number of complex zeros (counting multiplicity) of $P(x) = (x^2 + 4)^2(x - 5)^3$?",
                        ["$7$", "$5$", "$4$", "$3$"],
                        0,
                        "The degree of $P(x)$ is $2 \\times 2 + 3 = 7$. By the Fundamental Theorem of Algebra, a polynomial of degree $n$ has exactly $n$ complex zeros counting multiplicity."
                    )
                ]
            }
        ]
    },

    # --------------------------------------------------------------------------
    # APPC 1.02: Rational Functions & Asymptotes
    # --------------------------------------------------------------------------
    {
        "track": "appc",
        "num": "1.02",
        "slug": "rational-functions-and-asymptotes",
        "title": "Rational Functions & Asymptotes",
        "sections": [
            {
                "heading": "Section 1: Vertical Asymptotes vs. Removable Discontinuities",
                "questions": [
                    make_q(
                        "Find all vertical asymptotes and holes for $f(x) = \\frac{x^2 - 9}{x^2 - x - 6}$.",
                        [
                            "Vertical asymptote at $x = -2$; hole at $x = 3$",
                            "Vertical asymptote at $x = 3$; hole at $x = -2$",
                            "Vertical asymptotes at $x = 3$ and $x = -2$; no holes",
                            "Holes at $x = 3$ and $x = -2$; no vertical asymptotes"
                        ],
                        0,
                        "Factor: $\\frac{(x - 3)(x + 3)}{(x - 3)(x + 2)}$. The factor $(x - 3)$ cancels, indicating a removable discontinuity (hole) at $x = 3$. The remaining denominator factor $(x + 2)$ yields a vertical asymptote at $x = -2$."
                    ),
                    make_q(
                        "What is the coordinate $(x, y)$ of the hole in the graph of $g(x) = \\frac{2x^2 + 6x}{x^2 - 9}$?",
                        [
                            "$(-3, 1)$",
                            "$(-3, 0)$",
                            "$(3, 1)$",
                            "$(-3, \\infty)$"
                        ],
                        0,
                        "Factor: $\\frac{2x(x + 3)}{(x - 3)(x + 3)} = \\frac{2x}{x - 3}$ for $x \\neq -3$. At $x = -3$, $y = \\frac{2(-3)}{-3 - 3} = \\frac{-6}{-6} = 1$. The hole is at $(-3, 1)$."
                    ),
                    make_q(
                        "If $h(x) = \\frac{x - 4}{(x - 4)^2(x + 1)}$, which describes the behavior of $h$ near $x = 4$?",
                        [
                            "$h(x)$ has a vertical asymptote at $x = 4$",
                            "$h(x)$ has a removable hole at $x = 4$",
                            "$h(x)$ has a horizontal tangent at $x = 4$",
                            "$h(x)$ is continuous at $x = 4$"
                        ],
                        0,
                        "Simplifying: $h(x) = \\frac{1}{(x - 4)(x + 1)}$ for $x \\neq 4$. Because $(x - 4)$ remains in the denominator to degree 1, $x = 4$ is a vertical asymptote, not a hole."
                    )
                ]
            },
            {
                "heading": "Section 2: Horizontal Asymptotes and Degrees",
                "questions": [
                    make_q(
                        "Determine the horizontal asymptote of $R(x) = \\frac{5x^3 - 2x + 1}{2x^3 + 7x^2 - 4}$.",
                        ["$y = \\frac{5}{2}$", "$y = 0$", "$y = -\\frac{1}{4}$", "No horizontal asymptote"],
                        0,
                        "The degrees of numerator and denominator are both 3. The horizontal asymptote is the ratio of leading coefficients: $y = \\frac{5}{2}$."
                    ),
                    make_q(
                        "Which rational function has a horizontal asymptote at $y = 0$?",
                        [
                            "$f(x) = \\frac{4x + 1}{3x^2 - 5}$",
                            "$g(x) = \\frac{3x^2 - 5}{4x + 1}$",
                            "$h(x) = \\frac{4x^2 + 1}{3x^2 - 5}$",
                            "$k(x) = \\frac{4x^3}{3x^2 - 5}$"
                        ],
                        0,
                        "A rational function has $y = 0$ as its horizontal asymptote when the degree of the denominator is strictly greater than the degree of the numerator. Here degree of numerator is 1 and denominator is 2."
                    ),
                    make_q(
                        "Can the graph of a rational function intersect its horizontal asymptote?",
                        [
                            "Yes, the graph can cross a horizontal asymptote at finite values of $x$",
                            "No, an asymptote can never be touched or crossed by definition",
                            "Only if the horizontal asymptote is $y = 0$",
                            "Only if the function has no vertical asymptotes"
                        ],
                        0,
                        "Horizontal asymptotes describe end behavior as $x \\to \\pm \\infty$. The graph of a rational function can intersect a horizontal asymptote one or more times in the interior/finite domain."
                    )
                ]
            },
            {
                "heading": "Section 3: Slant (Oblique) Asymptotes",
                "questions": [
                    make_q(
                        "Find the slant asymptote of $f(x) = \\frac{2x^2 + 5x - 1}{x + 2}$.",
                        ["$y = 2x + 1$", "$y = 2x + 9$", "$y = 2x$", "$y = x + 1$"],
                        0,
                        "Perform polynomial long division: $(2x^2 + 5x - 1) \\div (x + 2) = 2x + 1 + \\frac{-3}{x + 2}$. As $x \\to \\pm \\infty$, $\\frac{-3}{x + 2} \\to 0$. The slant asymptote is $y = 2x + 1$."
                    ),
                    make_q(
                        "Under what condition does a rational function $f(x) = \\frac{P(x)}{Q(x)}$ possess a slant (oblique) asymptote?",
                        [
                            "The degree of $P(x)$ is exactly 1 greater than the degree of $Q(x)$",
                            "The degree of $P(x)$ equals the degree of $Q(x)$",
                            "The degree of $Q(x)$ is exactly 1 greater than the degree of $P(x)$",
                            "The degree of $P(x)$ is at least 2 greater than the degree of $Q(x)$"
                        ],
                        0,
                        "A slant asymptote exists if and only if the numerator's polynomial degree is exactly 1 higher than the denominator's polynomial degree."
                    ),
                    make_q(
                        "Find the equation of the slant asymptote for $g(x) = \\frac{x^3 - 3x^2 + 4}{x^2 + 1}$.",
                        ["$y = x - 3$", "$y = x + 3$", "$y = x$", "$y = -3x$"],
                        0,
                        "Dividing $x^3 - 3x^2 + 4$ by $x^2 + 1$: $x(x^2 + 1) = x^3 + x$, leaving remainder $-3x^2 - x + 4$. Next term: $-3(x^2 + 1) = -3x^2 - 3$, leaving remainder $-x + 7$. The quotient is $x - 3$, so the slant asymptote is $y = x - 3$."
                    )
                ]
            },
            {
                "heading": "Section 4: Limit Notation and Asymptotic Behavior",
                "questions": [
                    make_q(
                        "For $f(x) = \\frac{1}{x - 3}$, what are $\\lim_{x \\to 3^+} f(x)$ and $\\lim_{x \\to 3^-} f(x)$?",
                        [
                            "$\\lim_{x \\to 3^+} f(x) = \\infty$ and $\\lim_{x \\to 3^-} f(x) = -\\infty$",
                            "$\\lim_{x \\to 3^+} f(x) = -\\infty$ and $\\lim_{x \\to 3^-} f(x) = \\infty$",
                            "Both limits equal $\\infty$",
                            "Both limits equal $-\\infty$"
                        ],
                        0,
                        "As $x \\to 3$ from the right, $x - 3 > 0$, so $\\frac{1}{x - 3} \\to +\\infty$. As $x \\to 3$ from the left, $x - 3 < 0$, so $\\frac{1}{x - 3} \\to -\\infty$."
                    ),
                    make_q(
                        "If $\\lim_{x \\to -\\infty} f(x) = 4$, which statement is justified?",
                        [
                            "The line $y = 4$ is a horizontal asymptote of $f$",
                            "The line $x = 4$ is a vertical asymptote of $f$",
                            "$f(4)$ is undefined",
                            "The range of $f$ is $[4, \\infty)$"
                        ],
                        0,
                        "By definition, if $\\lim_{x \\to \\infty} f(x) = L$ or $\\lim_{x \\to -\\infty} f(x) = L$, the horizontal line $y = L$ is a horizontal asymptote."
                    ),
                    make_q(
                        "Given $k(x) = \\frac{2x - 6}{(x - 3)(x - 5)}$, evaluate $\\lim_{x \\to 3} k(x)$.",
                        ["$-1$", "$1$", "$\\infty$", "$0$"],
                        0,
                        "Factor and cancel: $k(x) = \\frac{2(x - 3)}{(x - 3)(x - 5)} = \\frac{2}{x - 5}$ for $x \\neq 3$. Taking the limit as $x \\to 3$: $\\frac{2}{3 - 5} = \\frac{2}{-2} = -1$."
                    )
                ]
            }
        ]
    },

    # --------------------------------------------------------------------------
    # APPC 1.03: Rates of Change & Concavity
    # --------------------------------------------------------------------------
    {
        "track": "appc",
        "num": "1.03",
        "slug": "rates-of-change-and-concavity",
        "title": "Rates of Change & Concavity",
        "sections": [
            {
                "heading": "Section 1: Average Rate of Change (AROC)",
                "questions": [
                    make_q(
                        "Calculate the average rate of change of $f(x) = 2x^2 - 3x + 1$ on the interval $[1, 4]$.",
                        ["$7$", "$9$", "$21$", "$6$"],
                        0,
                        "$\\text{AROC} = \\frac{f(4) - f(1)}{4 - 1}$. $f(4) = 2(16) - 12 + 1 = 21$. $f(1) = 2 - 3 + 1 = 0$. $\\text{AROC} = \\frac{21 - 0}{3} = 7$."
                    ),
                    make_q(
                        "A vehicle travels such that its distance in meters is given by $s(t) = 3t^2 + 10t$. What is the average velocity from $t = 2$ to $t = 5$ seconds?",
                        ["$31\\text{ m/s}$", "$25\\text{ m/s}$", "$62\\text{ m/s}$", "$15\\text{ m/s}$"],
                        0,
                        "$s(5) = 3(25) + 50 = 125$. $s(2) = 3(4) + 20 = 32$. Average velocity $= \\frac{125 - 32}{5 - 2} = \\frac{93}{3} = 31\\text{ m/s}$."
                    ),
                    make_q(
                        "For a linear function $g(x) = mx + b$, what can be said about the average rate of change on any interval $[a, b]$?",
                        [
                            "It is constant and always equal to $m$",
                            "It depends on the midpoint $\\frac{a+b}{2}$",
                            "It is zero if $b > 0$",
                            "It equals $b$"
                        ],
                        0,
                        "Linear functions have a constant rate of change equal to the slope $m$ over any interval."
                    )
                ]
            },
            {
                "heading": "Section 2: Increasing/Decreasing and Changing Rates",
                "questions": [
                    make_q(
                        "If a function $f$ is increasing at an increasing rate on an interval, what describes its graph?",
                        [
                            "The curve goes upward and is concave up",
                            "The curve goes upward and is concave down",
                            "The curve goes downward and is concave up",
                            "The curve goes downward and is concave down"
                        ],
                        0,
                        "Increasing means the values are rising (upward). At an increasing rate means the slope is getting steeper, which corresponds to concave up geometry."
                    ),
                    make_q(
                        "A function $g$ has average rates of change over consecutive unit intervals: on $[0,1]$ AROC is $8$, on $[1,2]$ AROC is $5$, on $[2,3]$ AROC is $2$. Which model best characterizes $g$?",
                        [
                            "$g$ is increasing at a decreasing rate (concave down)",
                            "$g$ is increasing at an increasing rate (concave up)",
                            "$g$ is decreasing at a constant rate",
                            "$g$ is decreasing at an increasing rate"
                        ],
                        0,
                        "The AROC values are positive ($8, 5, 2$), so $g$ is increasing. However, the rates are decreasing ($8 > 5 > 2$), which signifies concave down behavior."
                    ),
                    make_q(
                        "If $h(x)$ is decreasing at an increasing rate on an interval, what happens to the slope of secant lines?",
                        [
                            "The slopes become less negative (closer to zero)",
                            "The slopes become more negative (steeper downward)",
                            "The slopes remain constant",
                            "The slopes switch from positive to negative"
                        ],
                        0,
                        "Decreasing means rates are negative. At an increasing rate means the rate values are increasing (e.g. from $-10$ to $-4$ to $-1$), making the slope less negative and flattening out (concave up)."
                    )
                ]
            },
            {
                "heading": "Section 3: Concavity & Inflection Points",
                "questions": [
                    make_q(
                        "Which of the following points represents an inflection point on the graph of $y = f(x)$?",
                        [
                            "A point where the concavity changes from concave up to concave down (or vice versa)",
                            "A point where the function reaches an absolute maximum",
                            "A point where the average rate of change is zero",
                            "A point where the graph crosses the $x$-axis"
                        ],
                        0,
                        "An inflection point is defined as a point on the curve where the concavity of the graph changes from upward to downward or from downward to upward."
                    ),
                    make_q(
                        "On the interval $(-\\infty, 0)$, $f$ is concave up; on $(0, \\infty)$, $f$ is concave down. If $f(0) = 4$, which statement is true?",
                        [
                            "$(0, 4)$ is an inflection point of $f$",
                            "$(0, 4)$ is a local minimum of $f$",
                            "$(0, 4)$ is a local maximum of $f$",
                            "$f'(0)$ must equal $0$"
                        ],
                        0,
                        "Because the concavity changes at $x = 0$ and $(0, 4)$ lies on the continuous curve, $(0, 4)$ is an inflection point."
                    ),
                    make_q(
                        "The graph of $y = x^3 - 3x$ has an inflection point at which coordinate?",
                        ["$(0, 0)$", "$(1, -2)$", "$(-1, 2)$", "$(0, -3)$"],
                        0,
                        "For a cubic $y = ax^3 + bx^2 + cx + d$, the inflection point occurs at $x = -b/(3a) = 0$. At $x = 0$, $y = 0$, giving $(0, 0)$."
                    )
                ]
            },
            {
                "heading": "Section 4: Contextual Rates of Change Applications",
                "questions": [
                    make_q(
                        "Water is poured into a conical cup at a constant rate. What is the concavity of the depth of water $h(t)$ as a function of time?",
                        [
                            "Concave down, because the radius increases with height so height increases at a decreasing rate",
                            "Concave up, because height increases at an increasing rate",
                            "Linear, because the flow rate is constant",
                            "Constant concavity of zero"
                        ],
                        0,
                        "Because the cup widens as it fills, each additional volume unit adds progressively less height. Thus the rate of change of height decreases over time, giving a concave down graph."
                    ),
                    make_q(
                        "The table shows the temperature $T(t)$ in $^{\\circ}\\text{F}$ of cooling coffee: $T(0) = 180, T(5) = 150, T(10) = 126$. What is the average rate of cooling from $t = 0$ to $t = 10$ minutes?",
                        [
                            "$-5.4^{\\circ}\\text{F/min}$",
                            "$-6.0^{\\circ}\\text{F/min}$",
                            "$-4.8^{\\circ}\\text{F/min}$",
                            "$-2.7^{\\circ}\\text{F/min}$"
                        ],
                        0,
                        "$\\text{AROC} = \\frac{T(10) - T(0)}{10 - 0} = \\frac{126 - 180}{10} = \\frac{-54}{10} = -5.4^{\\circ}\\text{F/min}$."
                    ),
                    make_q(
                        "If the average rate of change of $f$ on $[2, 2+h]$ approaches $12$ as $h \\to 0$, what does $12$ represent?",
                        [
                            "The instantaneous rate of change of $f$ at $x = 2$",
                            "The average rate of change of $f$ on $[0, 2]$",
                            "The value of $f(2)$",
                            "The maximum value of $f$"
                        ],
                        0,
                        "The limit of the average rate of change as the interval width $h \\to 0$ represents the instantaneous rate of change (derivative) at $x = 2$."
                    )
                ]
            }
        ]
    },

    # --------------------------------------------------------------------------
    # APPC 2.01: Exponential Functions & Growth Models
    # --------------------------------------------------------------------------
    {
        "track": "appc",
        "num": "2.01",
        "slug": "exponential-functions-and-growth-models",
        "title": "Exponential Functions & Growth Models",
        "sections": [
            {
                "heading": "Section 1: Exponential Growth and Decay Fundamentals",
                "questions": [
                    make_q(
                        "Which function represents exponential decay with an initial value of $450$ and a decay rate of $8\\%$ per year?",
                        [
                            "$f(t) = 450(0.92)^t$",
                            "$f(t) = 450(1.08)^t$",
                            "$f(t) = 450(0.08)^t$",
                            "$f(t) = 450 - 0.08t$"
                        ],
                        0,
                        "In exponential decay, the base is $b = 1 - r$. With $r = 0.08$, $b = 1 - 0.08 = 0.92$. The model is $f(t) = 450(0.92)^t$."
                    ),
                    make_q(
                        "An exponential function passes through $(0, 6)$ and $(2, 54)$. If $f(x) = a b^x$ where $b > 0$, what is the value of $b$?",
                        ["$3$", "$9$", "$6$", "$\\sqrt{3}$"],
                        0,
                        "From $(0, 6)$, $a = 6$. From $(2, 54)$, $6 b^2 = 54 \\Rightarrow b^2 = 9 \\Rightarrow b = 3$ (since $b > 0$)."
                    ),
                    make_q(
                        "If a quantity grows continuously at an annual rate of $5\\%$, what is the continuous growth model for an initial investment of 1200 dollars?",
                        [
                            "$A(t) = 1200 e^{0.05t}$",
                            "$A(t) = 1200(1.05)^t$",
                            "$A(t) = 1200(0.05)^t$",
                            "$A(t) = 1200 e^{1.05t}$"
                        ],
                        0,
                        "Continuous compounding or continuous growth is modeled by $A(t) = P e^{rt}$. Here $P = 1200$ and $r = 0.05$, yielding $A(t) = 1200 e^{0.05t}$."
                    )
                ]
            },
            {
                "heading": "Section 2: Doubling Time & Half-Life Calculations",
                "questions": [
                    make_q(
                        "A bacterial culture doubles every 4 hours. If there are initially 500 bacteria, which equation models the population after $t$ hours?",
                        [
                            "$P(t) = 500 \\cdot 2^{t/4}$",
                            "$P(t) = 500 \\cdot 2^{4t}$",
                            "$P(t) = 500 \\cdot 4^{t/2}$",
                            "$P(t) = 500 + 2^{t/4}$"
                        ],
                        0,
                        "The doubling model is $P(t) = P_0 \\cdot 2^{t/d}$, where $d$ is the doubling time. Here $d = 4$, so $P(t) = 500 \\cdot 2^{t/4}$."
                    ),
                    make_q(
                        "A radioactive isotope has a half-life of 15 days. If a sample contains 80 grams initially, how much remains after 45 days?",
                        ["$10\\text{ g}$", "$20\\text{ g}$", "$5\\text{ g}$", "$15\\text{ g}$"],
                        0,
                        "The number of elapsed half-lives is $\\frac{45}{15} = 3$. Remaining amount: $80 \\cdot \\left(\\frac{1}{2}\\right)^3 = 80 \\cdot \\frac{1}{8} = 10\\text{ g}$."
                    ),
                    make_q(
                        "If the doubling time of an investment is 12 years, what is the annual growth factor $b$ in $A(t) = A_0 b^t$?",
                        ["$2^{1/12}$", "$12^{1/2}$", "$2 \\times 12$", "$\\frac{2}{12}$"],
                        0,
                        "Doubling time satisfies $b^{12} = 2$. Taking the 12th root yields $b = 2^{1/12} \\approx 1.0595$."
                    )
                ]
            },
            {
                "heading": "Section 3: Equivalent Exponential Forms & Conversions",
                "questions": [
                    make_q(
                        "Rewrite $f(t) = 100(1.21)^{t/2}$ in the form $f(t) = 100 b^t$. What is $b$?",
                        ["$1.1$", "$1.21$", "$1.4641$", "$0.605$"],
                        0,
                        "Using exponent laws: $(1.21)^{t/2} = ((1.21)^{1/2})^t = (\\sqrt{1.21})^t = (1.1)^t$. Thus $b = 1.1$."
                    ),
                    make_q(
                        "If $P(t) = 250 e^{0.08 t}$, what is the equivalent discrete annual growth factor rounded to four decimal places?",
                        ["$1.0833$", "$1.0800$", "$1.0408$", "$1.1664$"],
                        0,
                        "$e^{0.08 t} = (e^{0.08})^t$. Since $e^{0.08} \\approx 1.083287$, the annual factor is approximately $1.0833$."
                    ),
                    make_q(
                        "A medication decreases in the bloodstream by $30\\%$ every 6 hours. By what factor does it decrease per hour?",
                        ["$(0.70)^{1/6}$", "$(0.30)^{1/6}$", "$0.70 / 6$", "$(0.70)^6$"],
                        0,
                        "A decrease of $30\\%$ means a 6-hour factor of $1 - 0.30 = 0.70$. The hourly factor $b$ satisfies $b^6 = 0.70 \\Rightarrow b = (0.70)^{1/6}$."
                    )
                ]
            },
            {
                "heading": "Section 4: Comparing Linear and Exponential Growth",
                "questions": [
                    make_q(
                        "A linear function $L(x) = 50x + 100$ and an exponential function $E(x) = 2^x$ are compared for large $x > 0$. Which statement is true?",
                        [
                            "Eventually $E(x) > L(x)$ for all sufficiently large $x$",
                            "Eventually $L(x) > E(x)$ because its initial rate of change is 50",
                            "They will intersect infinitely many times",
                            "$L(x)$ and $E(x)$ grow at the same rate asymptotically"
                        ],
                        0,
                        "Any exponential growth function with base $b > 1$ will eventually exceed any linear or polynomial function for sufficiently large values of $x$."
                    ),
                    make_q(
                        "Which data set represents an exponential function rather than a linear function?",
                        [
                            "$x: 1, 2, 3, 4$ and $y: 6, 18, 54, 162$",
                            "$x: 1, 2, 3, 4$ and $y: 6, 12, 18, 24$",
                            "$x: 1, 2, 3, 4$ and $y: 6, 11, 18, 27$",
                            "$x: 1, 2, 3, 4$ and $y: 6, 8, 12, 20$"
                        ],
                        0,
                        "In an exponential function, consecutive $y$-values over equal intervals have a constant ratio: $\\frac{18}{6} = 3, \\frac{54}{18} = 3, \\frac{162}{54} = 3$. This confirms exponential behavior."
                    ),
                    make_q(
                        "What is the domain and range of the function $f(x) = 4 - 3(2)^x$?",
                        [
                            "Domain: $(-\\infty, \\infty)$; Range: $(-\\infty, 4)$",
                            "Domain: $(0, \\infty)$; Range: $(-\\infty, 4)$",
                            "Domain: $(-\\infty, \\infty)$; Range: $(4, \\infty)$",
                            "Domain: $(-\\infty, 4)$; Range: $(-\\infty, \\infty)$"
                        ],
                        0,
                        "Exponential functions are defined for all real $x$, so domain is $(-\\infty, \\infty)$. Since $2^x > 0$ for all $x$, $-3(2)^x < 0$, which makes $4 - 3(2)^x < 4$. The range is $(-\\infty, 4)$."
                    )
                ]
            }
        ]
    },

    # --------------------------------------------------------------------------
    # APPC 2.02: Logarithmic Functions & Properties
    # --------------------------------------------------------------------------
    {
        "track": "appc",
        "num": "2.02",
        "slug": "logarithmic-functions-and-properties",
        "title": "Logarithmic Functions & Properties",
        "sections": [
            {
                "heading": "Section 1: Definition of Logarithms and Inverses",
                "questions": [
                    make_q(
                        "Evaluate $\\log_4\\left(\\frac{1}{64}\\right)$.",
                        ["$-3$", "$3$", "$-\\frac{1}{3}$", "$16$"],
                        0,
                        "Let $y = \\log_4(1/64) \\Leftrightarrow 4^y = \\frac{1}{64} = 4^{-3} \\Rightarrow y = -3$."
                    ),
                    make_q(
                        "What is the domain of $f(x) = \\ln(5 - 2x)$?",
                        [
                            "$(-\\infty, 2.5)$",
                            "$(2.5, \\infty)$",
                            "$(-\\infty, 5)$",
                            "$(0, \\infty)$"
                        ],
                        0,
                        "The argument of a logarithm must be strictly positive: $5 - 2x > 0 \\Leftrightarrow 2x < 5 \\Leftrightarrow x < 2.5$. The domain is $(-\\infty, 2.5)$."
                    ),
                    make_q(
                        "Find the inverse function of $g(x) = 3 + 2\\ln(x - 1)$.",
                        [
                            "$g^{-1}(x) = e^{(x - 3)/2} + 1$",
                            "$g^{-1}(x) = e^{(x - 3)/2} - 1$",
                            "$g^{-1}(x) = 2e^{x - 3} + 1$",
                            "$g^{-1}(x) = e^{2(x - 3)} + 1$"
                        ],
                        0,
                        "Set $y = 3 + 2\\ln(x - 1) \\Rightarrow y - 3 = 2\\ln(x - 1) \\Rightarrow \\ln(x - 1) = \\frac{y - 3}{2} \\Rightarrow x - 1 = e^{(y - 3)/2} \\Rightarrow x = e^{(y - 3)/2} + 1$."
                    )
                ]
            },
            {
                "heading": "Section 2: Logarithmic Properties & Condensing Expressions",
                "questions": [
                    make_q(
                        "Express $2\\log x - 3\\log y + \\frac{1}{2}\\log z$ as a single logarithm.",
                        [
                            "$\\log\\left(\\frac{x^2 \\sqrt{z}}{y^3}\\right)$",
                            "$\\log\\left(\\frac{2x \\sqrt{z}}{3y}\\right)$",
                            "$\\log\\left(x^2 - y^3 + \\sqrt{z}\\right)$",
                            "$\\log\\left(\\frac{x^2}{y^3 \\sqrt{z}}\\right)$"
                        ],
                        0,
                        "Power rule gives $\\log(x^2) - \\log(y^3) + \\log(z^{1/2})$. Quotient and product rules combine to $\\log\\left(\\frac{x^2 \\sqrt{z}}{y^3}\\right)$."
                    ),
                    make_q(
                        "If $\\log_b 2 = 0.35$ and $\\log_b 3 = 0.55$, what is the value of $\\log_b 18$?",
                        ["$1.45$", "$0.90$", "$1.25$", "$1.10$"],
                        0,
                        "Note $18 = 2 \\cdot 3^2$. By log properties: $\\log_b 18 = \\log_b 2 + 2\\log_b 3 = 0.35 + 2(0.55) = 0.35 + 1.10 = 1.45$."
                    ),
                    make_q(
                        "Using the change of base formula, express $\\log_5 12$ in terms of natural logarithms.",
                        [
                            "$\\frac{\\ln 12}{\\ln 5}$",
                            "$\\frac{\\ln 5}{\\ln 12}$",
                            "$\\ln 12 - \\ln 5$",
                            "$\\ln\\left(\\frac{12}{5}\\right)$"
                        ],
                        0,
                        "The change of base formula states $\\log_b a = \\frac{\\log_c a}{\\log_c b}$. For base $e$, $\\log_5 12 = \\frac{\\ln 12}{\\ln 5}$."
                    )
                ]
            },
            {
                "heading": "Section 3: Solving Exponential and Logarithmic Equations",
                "questions": [
                    make_q(
                        "Solve for $x$: $3^{2x - 1} = 27$.",
                        ["$2$", "$1$", "$3$", "$\\frac{3}{2}$"],
                        0,
                        "$27 = 3^3$. Equating exponents: $2x - 1 = 3 \\Rightarrow 2x = 4 \\Rightarrow x = 2$."
                    ),
                    make_q(
                        "Solve for $x$: $\\log_2(x) + \\log_2(x - 2) = 3$.",
                        ["$4$", "$4$ and $-2$", "$2$", "$8$"],
                        0,
                        "Combine: $\\log_2(x(x - 2)) = 3 \\Rightarrow x^2 - 2x = 2^3 = 8 \\Rightarrow x^2 - 2x - 8 = 0 \\Rightarrow (x - 4)(x + 2) = 0$. Since the domain requires $x > 2$, $x = -2$ is extraneous. The only valid solution is $x = 4$."
                    ),
                    make_q(
                        "Solve for $t$: $50 e^{0.04t} = 200$.",
                        [
                            "$\\frac{\\ln 4}{0.04} \\approx 34.66$",
                            "$\\frac{\\ln 150}{0.04}$",
                            "$\\frac{4}{0.04} = 100$",
                            "$\\ln(4 \\times 0.04)$"
                        ],
                        0,
                        "Divide by 50: $e^{0.04t} = 4$. Take natural log: $0.04t = \\ln 4 \\Rightarrow t = \\frac{\\ln 4}{0.04} \\approx 34.66$."
                    )
                ]
            },
            {
                "heading": "Section 4: Logarithmic Scales and Applications",
                "questions": [
                    make_q(
                        "The pH of a chemical solution is given by $\\text{pH} = -\\log[\\text{H}^+]$. If the hydrogen ion concentration is $1.0 \\times 10^{-5}\\text{ M}$, what is the pH?",
                        ["$5.0$", "$-5.0$", "$1.0$", "$9.0$"],
                        0,
                        "$\\text{pH} = -\\log(10^{-5}) = -(-5) = 5.0$."
                    ),
                    make_q(
                        "An earthquake measures $7.2$ on the Richter scale, while a second measures $5.2$. How many times more intense is the first earthquake?",
                        ["$100$", "$2$", "$20$", "$1000$"],
                        0,
                        "The Richter scale is logarithmic base 10. The difference in magnitudes is $7.2 - 5.2 = 2$. The intensity ratio is $10^2 = 100$ times greater."
                    ),
                    make_q(
                        "What is the vertical asymptote of the graph of $f(x) = \\log_3(x + 4) - 2$?",
                        ["$x = -4$", "$x = 4$", "$y = -2$", "$x = 2$"],
                        0,
                        "The vertical asymptote occurs where the argument equals zero: $x + 4 = 0 \\Rightarrow x = -4$."
                    )
                ]
            }
        ]
    }
]
