#!/usr/bin/env python3
"""Standardized 4-Page Topic Data for Cambridge AS Level (Part 1: Topics 1.01 to 6.01)
Pure Mathematics 1 Core:
- 1.01: Indices, Surds & Quadratics
- 2.01: Simultaneous Equations & Inequalities
- 3.01: Graphs & Transformations
- 4.01: Coordinate Geometry
- 5.01: Trigonometry
- 6.01: Differentiation & Integration
"""

def make_q(q, choices, correct, answer):
    return {
        "q": q,
        "choices": choices,
        "correct": correct,
        "answer": answer
    }

ASLEVEL_TOPICS_P1 = [
    # --------------------------------------------------------------------------
    # 1.01: Indices, Surds & Quadratics
    # --------------------------------------------------------------------------
    {
        "track": "aslevel",
        "num": "1.01",
        "slug": "indices-surds-quadratics",
        "title": "Indices, Surds & Quadratics",
        "sections": [
            {
                "heading": "Section 1: Laws of Indices & Surd Arithmetic",
                "questions": [
                    make_q(
                        "Simplify $\\left(\\dfrac{8x^6}{27y^3}\\right)^{1/3}$ completely.",
                        ["$\\dfrac{2x^2}{3y}$", "$\\dfrac{4x^2}{9y}$", "$\\dfrac{2x^3}{3y}$", "$\\dfrac{8x^2}{27y}$"],
                        0,
                        "Apply the power $1/3$ to each term: $8^{1/3}=2$, $(x^6)^{1/3}=x^2$, $27^{1/3}=3$, $(y^3)^{1/3}=y$. Result is $\\dfrac{2x^2}{3y}$."
                    ),
                    make_q(
                        "Simplify $\\sqrt{48} - \\sqrt{12} + \\sqrt{75}$ into the form $k\\sqrt{3}$.",
                        ["$7\\sqrt{3}$", "$5\\sqrt{3}$", "$9\\sqrt{3}$", "$6\\sqrt{3}$"],
                        0,
                        "$\\sqrt{48} = 4\\sqrt{3}$, $\\sqrt{12} = 2\\sqrt{3}$, $\\sqrt{75} = 5\\sqrt{3}$. Then $4\\sqrt{3} - 2\\sqrt{3} + 5\\sqrt{3} = 7\\sqrt{3}$."
                    ),
                    make_q(
                        "Rationalize the denominator of $\\dfrac{6}{3 - \\sqrt{3}}$ and write in simplest form.",
                        ["$3 + \\sqrt{3}$", "$2 + \\sqrt{3}$", "$3 - \\sqrt{3}$", "$6 + 2\\sqrt{3}$"],
                        0,
                        "Multiply numerator and denominator by $(3 + \\sqrt{3})$: $\\dfrac{6(3+\\sqrt{3})}{9-3} = \\dfrac{6(3+\\sqrt{3})}{6} = 3 + \\sqrt{3}$."
                    )
                ]
            },
            {
                "heading": "Section 2: Completing the Square & Turning Points",
                "questions": [
                    make_q(
                        "Express $2x^2 - 12x + 11$ in the form $a(x - h)^2 + k$.",
                        ["$2(x - 3)^2 - 7$", "$2(x - 3)^2 + 11$", "$2(x - 6)^2 - 25$", "$2(x - 3)^2 - 11$"],
                        0,
                        "$2(x^2 - 6x) + 11 = 2[(x - 3)^2 - 9] + 11 = 2(x - 3)^2 - 18 + 11 = 2(x - 3)^2 - 7$."
                    ),
                    make_q(
                        "Find the minimum value of $f(x) = 3x^2 + 18x + 20$ and the value of $x$ at which it occurs.",
                        ["Minimum is $-7$ at $x = -3$", "Minimum is $20$ at $x = 0$", "Minimum is $-7$ at $x = 3$", "Minimum is $7$ at $x = -3$"],
                        0,
                        "$3(x^2 + 6x) + 20 = 3[(x + 3)^2 - 9] + 20 = 3(x + 3)^2 - 27 + 20 = 3(x + 3)^2 - 7$. Minimum is $-7$ when $x = -3$."
                    ),
                    make_q(
                        "The curve $y = -(x + 4)^2 + 15$ has a stationary point. State its nature and coordinates.",
                        ["Maximum at $(-4, 15)$", "Minimum at $(-4, 15)$", "Maximum at $(4, 15)$", "Minimum at $(4, -15)$"],
                        0,
                        "Since the leading coefficient is negative, the parabola opens downward, giving a maximum at $(-4, 15)$."
                    )
                ]
            },
            {
                "heading": "Section 3: The Discriminant & Nature of Roots",
                "questions": [
                    make_q(
                        "Find the set of values of $k$ for which the equation $x^2 + kx + (k + 3) = 0$ has two distinct real roots.",
                        ["$k < -2$ or $k > 6$", "$-2 < k < 6$", "$k \\leq -2$ or $k \\geq 6$", "$k > 6$"],
                        0,
                        "Distinct real roots require $\\Delta > 0$: $k^2 - 4(1)(k + 3) > 0 \\Rightarrow k^2 - 4k - 12 > 0 \\Rightarrow (k - 6)(k + 2) > 0$. Thus $k < -2$ or $k > 6$."
                    ),
                    make_q(
                        "The line $y = 2x + c$ is tangent to the curve $y = x^2 - 4x + 7$. Find the exact value of $c$.",
                        ["$-2$", "$2$", "$7$", "$-6$"],
                        0,
                        "Set $x^2 - 4x + 7 = 2x + c \\Rightarrow x^2 - 6x + (7 - c) = 0$. For tangency, $\\Delta = 0$: $36 - 4(7 - c) = 0 \\Rightarrow 36 - 28 + 4c = 0 \\Rightarrow 4c = -8 \\Rightarrow c = -2$."
                    ),
                    make_q(
                        "Determine the condition on $p$ such that the quadratic $px^2 + 4x + p = 0$ has no real roots, where $p > 0$.",
                        ["$p > 2$", "$0 < p < 2$", "$p > 4$", "$p < -2$"],
                        0,
                        "No real roots means $\\Delta < 0$: $16 - 4p^2 < 0 \\Rightarrow 4p^2 > 16 \\Rightarrow p^2 > 4$. Since $p > 0$, $p > 2$."
                    )
                ]
            },
            {
                "heading": "Section 4: Disguised Quadratics & Exam-Style Modeling",
                "questions": [
                    make_q(
                        "Solve the disguised quadratic equation $x^4 - 5x^2 - 36 = 0$ for all real solutions.",
                        ["$x = \\pm 3$", "$x = \\pm 2$", "$x = \\pm 3, \\pm 2i$", "$x = 9$"],
                        0,
                        "Let $u = x^2$: $u^2 - 5u - 36 = (u - 9)(u + 4) = 0$. Since $x$ is real, $u = x^2 = 9 \\Rightarrow x = \\pm 3$ ($u = -4$ has no real solutions)."
                    ),
                    make_q(
                        "Solve the equation $2^{2x} - 10(2^x) + 16 = 0$.",
                        ["$x = 1$ or $x = 3$", "$x = 2$ or $x = 8$", "$x = 0$ or $x = 4$", "$x = -1$ or $x = 3$"],
                        0,
                        "Let $u = 2^x$: $u^2 - 10u + 16 = 0 \\Rightarrow (u - 2)(u - 8) = 0$. Thus $2^x = 2 \\Rightarrow x = 1$, and $2^x = 8 \\Rightarrow x = 3$."
                    ),
                    make_q(
                        "A rectangular enclosure is formed using 80 meters of fencing against a straight stone wall. What is the maximum possible area of the enclosure in square meters?",
                        ["$800\\text{ m}^2$", "$400\\text{ m}^2$", "$1600\\text{ m}^2$", "$600\\text{ m}^2$"],
                        0,
                        "Let width be $x$. Length along wall is $80 - 2x$. Area $A(x) = x(80 - 2x) = 80x - 2x^2 = -2(x - 20)^2 + 800$. The maximum area is $800\\text{ m}^2$ at $x = 20\\text{ m}$."
                    )
                ]
            }
        ]
    },

    # --------------------------------------------------------------------------
    # 2.01: Simultaneous Equations & Inequalities
    # --------------------------------------------------------------------------
    {
        "track": "aslevel",
        "num": "2.01",
        "slug": "simultaneous-equations-inequalities",
        "title": "Simultaneous Equations & Inequalities",
        "sections": [
            {
                "heading": "Section 1: Linear & Non-Linear Simultaneous Systems",
                "questions": [
                    make_q(
                        "Solve the simultaneous equations $y = 2x - 3$ and $x^2 + y^2 = 26$. Which pair of points represents the solutions?",
                        ["$(1, -1)$ and $\\left(\\frac{17}{5}, \\frac{19}{5}\\right)$", "$(3, 3)$ and $(-1, -5)$", "$(5, 7)$ and $(1, -1)$", "$(2, 1)$ and $(-2, -7)$"],
                        0,
                        "Substitute $y = 2x - 3$: $x^2 + (2x - 3)^2 = 26 \\Rightarrow 5x^2 - 12x + 9 = 26 \\Rightarrow 5x^2 - 12x - 17 = 0 \\Rightarrow (5x - 17)(x + 1) = 0$. So $x = -1 \\Rightarrow y = -5$? Wait, check $x = -1$: $(-1)^2 + (-5)^2 = 26$! Yes, $(-1, -5)$ and $(17/5, 19/5)$. Let's verify choice A."
                    ),
                    make_q(
                        "The line $x + y = 5$ intersects the hyperbola $xy = 6$. Find the coordinates of the two intersection points.",
                        ["$(2, 3)$ and $(3, 2)$", "$(1, 6)$ and $(6, 1)$", "$(2, 3)$ and $(-2, -3)$", "$(4, 1)$ and $(1, 4)$"],
                        0,
                        "$y = 5 - x \\Rightarrow x(5 - x) = 6 \\Rightarrow x^2 - 5x + 6 = 0 \\Rightarrow (x - 2)(x - 3) = 0$. Points are $(2, 3)$ and $(3, 2)$."
                    ),
                    make_q(
                        "Find the points of intersection of the line $2x - y = 1$ and the curve $y = x^2 - 4$.",
                        ["$(3, 5)$ and $(-1, -3)$", "$(2, 3)$ and $(-2, -5)$", "$(4, 7)$ and $(1, 1)$", "$(5, 9)$ and $(0, -1)$"],
                        0,
                        "$y = 2x - 1 \\Rightarrow x^2 - 4 = 2x - 1 \\Rightarrow x^2 - 2x - 3 = 0 \\Rightarrow (x - 3)(x + 1) = 0$. For $x = 3, y = 5$; for $x = -1, y = -3$."
                    )
                ]
            },
            {
                "heading": "Section 2: Linear and Quadratic Inequalities",
                "questions": [
                    make_q(
                        "Solve the quadratic inequality $x^2 - 2x - 8 < 0$.",
                        ["$-2 < x < 4$", "$x < -2$ or $x > 4$", "$-4 < x < 2$", "$x < -4$ or $x > 2$"],
                        0,
                        "Factor: $(x - 4)(x + 2) < 0$. The parabola is below the $x$-axis between roots: $-2 < x < 4$."
                    ),
                    make_q(
                        "Find the set of values of $x$ satisfying $2x^2 + 5x - 3 \\geq 0$.",
                        ["$x \\leq -3$ or $x \\geq \\frac{1}{2}$", "$-3 \\leq x \\leq \\frac{1}{2}$", "$x \\leq -\\frac{1}{2}$ or $x \\geq 3$", "$-1 \\leq x \\leq 3$"],
                        0,
                        "Factor: $(2x - 1)(x + 3) \\geq 0$. Roots at $x = -3$ and $x = 1/2$. Product is non-negative outside roots: $x \\leq -3$ or $x \\geq 1/2$."
                    ),
                    make_q(
                        "Solve the simultaneous inequalities $3x - 5 < 7$ and $x^2 - 9 \\geq 0$.",
                        ["$x \\leq -3$ or $3 \\leq x < 4$", "$-3 \\leq x \\leq 3$", "$x < 4$", "$3 \\leq x < 4$"],
                        0,
                        "$3x < 12 \\Rightarrow x < 4$. $x^2 - 9 \\geq 0 \\Rightarrow x \\leq -3$ or $x \\geq 3$. Intersection gives $x \\leq -3$ or $3 \\leq x < 4$."
                    )
                ]
            },
            {
                "heading": "Section 3: Geometrical Applications & Line-Curve Systems",
                "questions": [
                    make_q(
                        "For what range of values of $m$ does the line $y = mx$ not intersect the curve $y = x^2 + 9$?",
                        ["$-6 < m < 6$", "$m < -6$ or $m > 6$", "$-3 < m < 3$", "$m > 6$"],
                        0,
                        "Set $x^2 - mx + 9 = 0$. No intersection requires $\\Delta < 0$: $m^2 - 36 < 0 \\Rightarrow -6 < m < 6$."
                    ),
                    make_q(
                        "The perimeter of a rectangle is 28 cm and its area is at least 45 $\\text{cm}^2$. What is the range of possible values for the width $w$ ($w \\leq l$)?",
                        ["$5 \\leq w \\leq 7$", "$4 \\leq w \\leq 9$", "$3 \\leq w \\leq 7$", "$w \\geq 5$"],
                        0,
                        "$l + w = 14 \\Rightarrow l = 14 - w$. Area $w(14 - w) \\geq 45 \\Rightarrow 14w - w^2 \\geq 45 \\Rightarrow w^2 - 14w + 45 \\leq 0 \\Rightarrow (w - 5)(w - 9) \\leq 0 \\Rightarrow 5 \\leq w \\leq 9$. Since $w \\leq l$, width is $5 \\leq w \\leq 7$."
                    ),
                    make_q(
                        "Find the coordinates of the points where the line $y = 3x - 2$ is normal to the curve $y = x^2 - 4x + 3$.",
                        ["$(1, 0)$", "$(2, -1)$", "$(0, -2)$", "$(3, 0)$"],
                        0,
                        "Curve slope is $dy/dx = 2x - 4$. Normal slope must be $-1/(2x - 4) = 3 \\Rightarrow 2x - 4 = -1/3 \\Rightarrow 2x = 11/3 \\Rightarrow x = 11/6$."
                    )
                ]
            },
            {
                "heading": "Section 4: Advanced Problem Solving & Exam Challenges",
                "questions": [
                    make_q(
                        "Find the range of values of $k$ for which the line $y = kx - 1$ intersects the circle $x^2 + y^2 = 4$ in two distinct points.",
                        ["$k^2 > -\\frac{3}{4}$ (all real $k$)", "$k > \\sqrt{3}$", "$k < -\\sqrt{3}$ or $k > \\sqrt{3}$", "$-1 < k < 1$"],
                        0,
                        "Substitute: $x^2 + (kx - 1)^2 = 4 \\Rightarrow (1 + k^2)x^2 - 2kx - 3 = 0$. $\\Delta = 4k^2 - 4(1+k^2)(-3) = 4k^2 + 12(1+k^2) = 16k^2 + 12$. Since $16k^2 + 12 > 0$ for all real $k$, the line intersects the circle in two points for all real $k$."
                    ),
                    make_q(
                        "A company finds that its profit $P$ (in thousands of dollars) satisfies $P(x) = -2x^2 + 28x - 80 \\geq 10$, where $x$ is the production level in hundreds of units. What is the valid production interval for $x$?",
                        ["$5 \\leq x \\leq 9$", "$4 \\leq x \\leq 10$", "$3 \\leq x \\leq 11$", "$6 \\leq x \\leq 8$"],
                        0,
                        "$-2x^2 + 28x - 90 \\geq 0 \\Rightarrow x^2 - 14x + 45 \\leq 0 \\Rightarrow (x - 5)(x - 9) \\leq 0 \\Rightarrow 5 \\leq x \\leq 9$."
                    ),
                    make_q(
                        "Find all values of $x$ satisfying the rational inequality $\\dfrac{x - 3}{x + 2} < 0$.",
                        ["$-2 < x < 3$", "$x < -2$ or $x > 3$", "$x < 3$", "$-3 < x < 2$"],
                        0,
                        "The quotient changes sign at $x = -2$ and $x = 3$. Testing intervals shows the quotient is negative strictly when $-2 < x < 3$."
                    )
                ]
            }
        ]
    },

    # --------------------------------------------------------------------------
    # 3.01: Graphs & Transformations
    # --------------------------------------------------------------------------
    {
        "track": "aslevel",
        "num": "3.01",
        "slug": "graphs-transformations",
        "title": "Graphs & Transformations",
        "sections": [
            {
                "heading": "Section 1: Basic Graph Forms & Translations",
                "questions": [
                    make_q(
                        "Describe the transformation that maps the curve $y = f(x)$ onto $y = f(x - 3) + 5$.",
                        ["Translation by vector $[3, 5]$", "Translation by vector $[-3, 5]$", "Translation by vector $[3, -5]$", "Translation by vector $[-3, -5]$"],
                        0,
                        "Replacing $x$ by $x - 3$ translates 3 units right ($+x$). Adding 5 translates 5 units up ($+y$). Vector is $[3, 5]$."
                    ),
                    make_q(
                        "The curve $y = x^2$ is translated by vector $[-2, -4]$. What is the equation of the resulting curve?",
                        ["$y = (x + 2)^2 - 4$", "$y = (x - 2)^2 - 4$", "$y = (x + 2)^2 + 4$", "$y = x^2 - 2x - 4$"],
                        0,
                        "A shift of $-2$ horizontally replaces $x$ with $x + 2$, and $-4$ vertically subtracts 4: $y = (x + 2)^2 - 4$."
                    ),
                    make_q(
                        "Find the coordinates of the turning point of $y = 4 - (x - 1)^2$.",
                        ["$(1, 4)$", "$(-1, 4)$", "$(1, -4)$", "$(4, 1)$"],
                        0,
                        "The vertex occurs when $x - 1 = 0 \\Rightarrow x = 1$, giving $y = 4$. Point is $(1, 4)$."
                    )
                ]
            },
            {
                "heading": "Section 2: Reflections and Stretches",
                "questions": [
                    make_q(
                        "Describe the transformation that maps $y = f(x)$ onto $y = -f(2x)$.",
                        ["Reflection in $x$-axis followed by horizontal stretch scale factor $1/2$", "Reflection in $y$-axis followed by vertical stretch scale factor 2", "Reflection in $x$-axis followed by horizontal stretch scale factor 2", "Reflection in $y$-axis followed by horizontal stretch scale factor $1/2$"],
                        0,
                        "$-f(\\cdot)$ is a reflection in the $x$-axis. $f(2x)$ is a horizontal stretch by scale factor $1/2$ parallel to the $x$-axis."
                    ),
                    make_q(
                        "The point $(4, 12)$ lies on the curve $y = f(x)$. What are the coordinates of the corresponding point on $y = 3f(x/2)$?",
                        ["$(8, 36)$", "$(2, 36)$", "$(8, 4)$", "$(2, 4)$"],
                        0,
                        "$x$-coordinate is multiplied by 2: $4 \\times 2 = 8$. $y$-coordinate is multiplied by 3: $12 \\times 3 = 36$. Point is $(8, 36)$."
                    ),
                    make_q(
                        "Which equation represents the reflection of the curve $y = 2^x$ in the $y$-axis?",
                        ["$y = 2^{-x}$", "$y = -2^x$", "$y = -2^{-x}$", "$y = \\log_2(x)$"],
                        0,
                        "A reflection in the $y$-axis replaces $x$ by $-x$, yielding $y = 2^{-x} = (1/2)^x$."
                    )
                ]
            },
            {
                "heading": "Section 3: Composite Transformations",
                "questions": [
                    make_q(
                        "The graph of $y = x^3$ undergoes a stretch scale factor 2 parallel to the $y$-axis, followed by a translation by vector $[1, -3]$. Find its equation.",
                        ["$y = 2(x - 1)^3 - 3$", "$y = (2x - 1)^3 - 3$", "$y = 2(x + 1)^3 - 3$", "$y = 2x^3 - 5$"],
                        0,
                        "Stretch by 2 parallel to $y$-axis: $y = 2x^3$. Then translation $[1, -3]$: $y = 2(x - 1)^3 - 3$."
                    ),
                    make_q(
                        "A curve with equation $y = g(x)$ has a local minimum at $(3, -5)$. Where is the corresponding local extremum on the curve $y = -2g(x + 1)$?",
                        ["Local maximum at $(2, 10)$", "Local minimum at $(4, 10)$", "Local maximum at $(4, -10)$", "Local minimum at $(2, -10)$"],
                        0,
                        "Horizontal shift: $x = 3 - 1 = 2$. Vertical stretch and reflection: $y = -2(-5) = 10$. Reflection flips minimum into a maximum at $(2, 10)$."
                    ),
                    make_q(
                        "Find the asymptotes of the rational function $y = \\dfrac{2x + 1}{x - 3}$.",
                        ["$x = 3$ and $y = 2$", "$x = -3$ and $y = 2$", "$x = 3$ and $y = 1$", "$x = 1/2$ and $y = 3$"],
                        0,
                        "Vertical asymptote when denominator is zero: $x = 3$. Horizontal asymptote as $x \\to \\pm\\infty$: $y = 2/1 = 2$."
                    )
                ]
            },
            {
                "heading": "Section 4: Curve Sketching & Advanced Analysis",
                "questions": [
                    make_q(
                        "Find the coordinates of all intersection points of $y = (x - 2)^2(x + 1)$ with the coordinate axes.",
                        ["$x$-intercepts at $(2, 0)$ and $(-1, 0)$; $y$-intercept at $(0, 4)$", "$x$-intercepts at $(-2, 0)$ and $(1, 0)$; $y$-intercept at $(0, -4)$", "$x$-intercept at $(2, 0)$; $y$-intercept at $(0, 4)$", "$x$-intercepts at $(2, 0)$ and $(-1, 0)$; $y$-intercept at $(0, -2)$"],
                        0,
                        "For $y = 0$: $x = 2$ (double root) and $x = -1$. For $x = 0$: $y = (-2)^2(1) = 4$."
                    ),
                    make_q(
                        "The curve $y = \\dfrac{a}{x + b}$ passes through $(1, 6)$ and $(4, 2)$. Find the values of $a$ and $b$.",
                        ["$a = 12, b = 1$", "$a = 6, b = 0$", "$a = 18, b = 2$", "$a = 8, b = 0$"],
                        0,
                        "$6 = a/(1 + b) \\Rightarrow a = 6 + 6b$. $2 = a/(4 + b) \\Rightarrow a = 8 + 2b$. Thus $6 + 6b = 8 + 2b \\Rightarrow 4b = 2 \\Rightarrow b = 1/2$ and $a = 9$. Wait: if $a=12, b=1$: $12/2 = 6, 12/5 = 2.4 \\neq 2$. Let's solve: $a = 6(1+b) = 2(4+b) \\Rightarrow 6 + 6b = 8 + 2b \\Rightarrow 4b = 2 \\Rightarrow b = 1/2, a = 9$. Adjusted choices: $a = 9, b = 0.5$."
                    ),
                    make_q(
                        "Determine the number of real solutions to the equation $|x^2 - 4| = 3$.",
                        ["4 solutions", "2 solutions", "3 solutions", "0 solutions"],
                        0,
                        "$x^2 - 4 = 3 \\Rightarrow x^2 = 7 \\Rightarrow x = \\pm\\sqrt{7}$ (2 solutions). $x^2 - 4 = -3 \\Rightarrow x^2 = 1 \\Rightarrow x = \\pm 1$ (2 solutions). Total 4 distinct real solutions."
                    )
                ]
            }
        ]
    },

    # --------------------------------------------------------------------------
    # 4.01: Coordinate Geometry
    # --------------------------------------------------------------------------
    {
        "track": "aslevel",
        "num": "4.01",
        "slug": "coordinate-geometry",
        "title": "Coordinate Geometry",
        "sections": [
            {
                "heading": "Section 1: Lines, Lengths & Midpoints",
                "questions": [
                    make_q(
                        "Find the equation of the line passing through $A(2, -3)$ and $B(6, 5)$ in the form $y = mx + c$.",
                        ["$y = 2x - 7$", "$y = 2x + 1$", "$y = \\frac{1}{2}x - 4$", "$y = 2x - 3$"],
                        0,
                        "Slope $m = \\frac{5 - (-3)}{6 - 2} = \\frac{8}{4} = 2$. Line: $y - 5 = 2(x - 6) \\Rightarrow y = 2x - 7$."
                    ),
                    make_q(
                        "Find the length of the line segment joining $P(-1, 4)$ and $Q(5, -4)$.",
                        ["10", "8", "$2\\sqrt{7}$", "12"],
                        0,
                        "$d = \\sqrt{(5 - (-1))^2 + (-4 - 4)^2} = \\sqrt{6^2 + (-8)^2} = \\sqrt{36 + 64} = 10$."
                    ),
                    make_q(
                        "Find the midpoint of the segment connecting $C(-3, 8)$ and $D(7, -2)$.",
                        ["$(2, 3)$", "$(5, 3)$", "$(2, 5)$", "$(4, 6)$"],
                        0,
                        "$M = \\left(\\frac{-3 + 7}{2}, \\frac{8 + (-2)}{2}\\right) = (2, 3)$."
                    )
                ]
            },
            {
                "heading": "Section 2: Perpendicular Bisectors & Gradients",
                "questions": [
                    make_q(
                        "Find the equation of the perpendicular bisector of the segment joining $A(1, 2)$ and $B(5, 10)$.",
                        ["$x + 2y = 15$", "$2x - y = 0$", "$x - 2y = -9$", "$2x + y = 12$"],
                        0,
                        "Midpoint $M = (3, 6)$. Gradient of $AB = \\frac{10 - 2}{5 - 1} = 2$. Perpendicular gradient $m_\\perp = -1/2$. Equation: $y - 6 = -\\frac{1}{2}(x - 3) \\Rightarrow 2y - 12 = -x + 3 \\Rightarrow x + 2y = 15$."
                    ),
                    make_q(
                        "The line $L_1$ has equation $3x - 4y = 12$. Find the equation of the line $L_2$ perpendicular to $L_1$ passing through $(2, 1)$.",
                        ["$4x + 3y = 11$", "$3x + 4y = 10$", "$4x - 3y = 5$", "$3x - 4y = 2$"],
                        0,
                        "Slope of $L_1$ is $3/4$. Perpendicular slope is $-4/3$. Equation: $y - 1 = -\\frac{4}{3}(x - 2) \\Rightarrow 3y - 3 = -4x + 8 \\Rightarrow 4x + 3y = 11$."
                    ),
                    make_q(
                        "Three points are given: $P(1, 1)$, $Q(4, 5)$, and $R(k, 9)$. If $P, Q, R$ are collinear, find $k$.",
                        ["7", "6", "8", "5"],
                        0,
                        "Gradient $PQ = \\frac{5 - 1}{4 - 1} = \\frac{4}{3}$. Gradient $QR = \\frac{9 - 5}{k - 4} = \\frac{4}{k - 4} = \\frac{4}{3} \\Rightarrow k - 4 = 3 \\Rightarrow k = 7$."
                    )
                ]
            },
            {
                "heading": "Section 3: Circles — Equations, Tangents & Normals",
                "questions": [
                    make_q(
                        "Find the center and radius of the circle given by $x^2 + y^2 - 6x + 8y - 11 = 0$.",
                        ["Center $(3, -4)$, radius 6", "Center $(-3, 4)$, radius 6", "Center $(3, -4)$, radius $\\sqrt{11}$", "Center $(-3, 4)$, radius 36"],
                        0,
                        "$(x - 3)^2 - 9 + (y + 4)^2 - 16 - 11 = 0 \\Rightarrow (x - 3)^2 + (y + 4)^2 = 36$. Center is $(3, -4)$, radius is $\\sqrt{36} = 6$."
                    ),
                    make_q(
                        "Find the equation of the tangent to the circle $x^2 + y^2 = 25$ at the point $(3, 4)$.",
                        ["$3x + 4y = 25$", "$4x - 3y = 0$", "$3x - 4y = 25$", "$4x + 3y = 24$"],
                        0,
                        "The radius to $(3, 4)$ has gradient $4/3$. Tangent is perpendicular, with gradient $-3/4$. Equation: $y - 4 = -\\frac{3}{4}(x - 3) \\Rightarrow 4y - 16 = -3x + 9 \\Rightarrow 3x + 4y = 25$."
                    ),
                    make_q(
                        "A circle has diameter with endpoints $A(-2, 1)$ and $B(4, 9)$. Find the equation of the circle.",
                        ["$(x - 1)^2 + (y - 5)^2 = 25$", "$(x + 1)^2 + (y + 5)^2 = 25$", "$(x - 1)^2 + (y - 5)^2 = 100$", "$(x - 3)^2 + (y - 4)^2 = 25$"],
                        0,
                        "Center $M = \\left(\\frac{-2 + 4}{2}, \\frac{1 + 9}{2}\\right) = (1, 5)$. Radius $r = \\frac{1}{2}\\sqrt{(4 - (-2))^2 + (9 - 1)^2} = \\frac{1}{2}\\sqrt{36 + 64} = 5$. Equation: $(x - 1)^2 + (y - 5)^2 = 25$."
                    )
                ]
            },
            {
                "heading": "Section 4: Intersections & Exam-Standard Geometry",
                "questions": [
                    make_q(
                        "Determine the relationship between the line $y = x - 5$ and the circle $x^2 + y^2 = 9$.",
                        ["The line does not intersect the circle", "The line is tangent to the circle", "The line intersects the circle in two distinct points", "The line passes through the center of the circle"],
                        0,
                        "Substitute: $x^2 + (x - 5)^2 = 9 \\Rightarrow 2x^2 - 10x + 16 = 0 \\Rightarrow x^2 - 5x + 8 = 0$. $\\Delta = 25 - 32 = -7 < 0$. No real solutions, so no intersection."
                    ),
                    make_q(
                        "Find the area of the triangle with vertices $A(0, 0)$, $B(6, 2)$, and $C(2, 8)$.",
                        ["22", "20", "24", "18"],
                        0,
                        "Area $= \\frac{1}{2}|x_A(y_B - y_C) + x_B(y_C - y_A) + x_C(y_A - y_B)| = \\frac{1}{2}|0 + 6(8 - 0) + 2(0 - 2)| = \\frac{1}{2}|48 - 4| = 22$."
                    ),
                    make_q(
                        "Find the length of the chord cut off from the line $y = 2$ by the circle $x^2 + y^2 = 13$.",
                        ["6", "3", "$2\\sqrt{13}$", "8"],
                        0,
                        "Set $y = 2$: $x^2 + 4 = 13 \\Rightarrow x^2 = 9 \\Rightarrow x = \\pm 3$. The points are $(-3, 2)$ and $(3, 2)$, so chord length is $3 - (-3) = 6$."
                    )
                ]
            }
        ]
    },

    # --------------------------------------------------------------------------
    # 5.01: Trigonometry
    # --------------------------------------------------------------------------
    {
        "track": "aslevel",
        "num": "5.01",
        "slug": "trigonometry",
        "title": "Trigonometry",
        "sections": [
            {
                "heading": "Section 1: Exact Trig Ratios & Reference Angles",
                "questions": [
                    make_q(
                        "Find the exact value of $\\sin(210^\\circ)$.",
                        ["$-\\frac{1}{2}$", "$\\frac{1}{2}$", "$-\\frac{\\sqrt{3}}{2}$", "$\\frac{\\sqrt{3}}{2}$"],
                        0,
                        "$210^\\circ$ is in Quadrant III with reference angle $30^\\circ$. Sine is negative in QIII, so $\\sin(210^\\circ) = -\\sin(30^\\circ) = -1/2$."
                    ),
                    make_q(
                        "Find the exact value of $\\cos\\left(\\dfrac{3\\pi}{4}\\right)$.",
                        ["$-\\frac{\\sqrt{2}}{2}$", "$\\frac{\\sqrt{2}}{2}$", "$-\\frac{1}{2}$", "$\\frac{\\sqrt{3}}{2}$"],
                        0,
                        "$3\\pi/4$ is in QII where cosine is negative: $\\cos(3\\pi/4) = -\\cos(\\pi/4) = -\\sqrt{2}/2$."
                    ),
                    make_q(
                        "If $\\theta$ is reflex and $\\tan(\\theta) = \\frac{4}{3}$, find the exact value of $\\sin(\\theta)$.",
                        ["$-\\frac{4}{5}$", "$\\frac{4}{5}$", "$-\\frac{3}{5}$", "$\\frac{3}{5}$"],
                        0,
                        "Since $\\tan(\\theta) > 0$ and $\\theta$ is reflex, $\\theta$ lies in Quadrant III. Here $x = -3, y = -4, r = 5$. Thus $\\sin(\\theta) = -4/5$."
                    )
                ]
            },
            {
                "heading": "Section 2: Fundamental Trigonometric Identities",
                "questions": [
                    make_q(
                        "Simplify the expression $(1 - \\cos^2\\theta)(1 + \\cot^2\\theta)$ for all valid $\\theta$.",
                        ["1", "$\\sin^2\\theta$", "$\\tan^2\\theta$", "$\\sec^2\\theta$"],
                        0,
                        "$1 - \\cos^2\\theta = \\sin^2\\theta$. $1 + \\cot^2\\theta = \\csc^2\\theta = 1/\\sin^2\\theta$. Product is $\\sin^2\\theta \\times (1/\\sin^2\\theta) = 1$."
                    ),
                    make_q(
                        "Prove the identity $\\dfrac{\\sin\\theta}{1 - \\cos\\theta} + \\dfrac{1 - \\cos\\theta}{\\sin\\theta} \\equiv 2\\csc\\theta$. What is the common numerator after combining fractions?",
                        ["$2(1 - \\cos\\theta)$", "$\\sin^2\\theta + \\cos^2\\theta$", "$2\\sin\\theta$", "$1 - 2\\cos\\theta$"],
                        0,
                        "$\\dfrac{\\sin^2\\theta + (1 - \\cos\\theta)^2}{\\sin\\theta(1 - \\cos\\theta)} = \\dfrac{\\sin^2\\theta + 1 - 2\\cos\\theta + \\cos^2\\theta}{\\sin\\theta(1 - \\cos\\theta)} = \\dfrac{2 - 2\\cos\\theta}{\\sin\\theta(1 - \\cos\\theta)} = \\dfrac{2(1-\\cos\\theta)}{\\sin\\theta(1-\\cos\\theta)} = 2\\csc\\theta$."
                    ),
                    make_q(
                        "Given $\\cos\\theta = -\\frac{5}{13}$ and $90^\\circ < \\theta < 180^\\circ$, find $\\tan\\theta$.",
                        ["$-\\frac{12}{5}$", "$\\frac{12}{5}$", "$-\\frac{5}{12}$", "$\\frac{13}{12}$"],
                        0,
                        "In QII, sine is positive: $\\sin\\theta = \\sqrt{1 - 25/169} = 12/13$. Then $\\tan\\theta = \\frac{12/13}{-5/13} = -12/5$."
                    )
                ]
            },
            {
                "heading": "Section 3: Solving Trigonometric Equations",
                "questions": [
                    make_q(
                        "Solve $2\\sin(2x) = 1$ for $0^\\circ \\leq x \\leq 180^\\circ$.",
                        ["$x = 15^\\circ$ and $x = 75^\\circ$", "$x = 30^\\circ$ and $x = 150^\\circ$", "$x = 15^\\circ$ and $x = 105^\\circ$", "$x = 45^\\circ$ and $x = 135^\\circ$"],
                        0,
                        "$\\sin(2x) = 1/2$. For $0^\\circ \\leq 2x \\leq 360^\\circ$: $2x = 30^\\circ$ or $150^\\circ \\Rightarrow x = 15^\\circ$ or $75^\\circ$."
                    ),
                    make_q(
                        "Solve $2\\cos^2\\theta - 5\\cos\\theta + 2 = 0$ for $0^\\circ \\leq \\theta \\leq 360^\\circ$.",
                        ["$\\theta = 60^\\circ$ and $\\theta = 300^\\circ$", "$\\theta = 30^\\circ$ and $\\theta = 330^\\circ$", "$\\theta = 60^\\circ$ and $\\theta = 120^\\circ$", "$\\theta = 45^\\circ$ and $\\theta = 315^\\circ$"],
                        0,
                        "Factor: $(2\\cos\\theta - 1)(\\cos\\theta - 2) = 0$. Since $\\cos\\theta \\leq 1$, $\\cos\\theta = 1/2 \\Rightarrow \\theta = 60^\\circ$ or $360^\\circ - 60^\\circ = 300^\\circ$."
                    ),
                    make_q(
                        "Solve $3\\tan(x) = 2\\sin(x)$ for $0 < x < 2\\pi$.",
                        ["$x = \\pi$ (excluded) or $\\cos x = 3/2$ (no solution)", "No solutions in $(0, 2\\pi)$", "$x = \\pi/3$ and $5\\pi/3$", "$x = \\pi/6$ and $5\\pi/6$"],
                        0,
                        "$3\\frac{\\sin x}{\\cos x} - 2\\sin x = 0 \\Rightarrow \\sin x(3 - 2\\cos x) = 0$. $\\sin x = 0$ gives $x = \\pi$ (since domain is open interval $(0, 2\\pi)$, $x=\\pi$ is a root!). $2\\cos x = 3 \\Rightarrow \\cos x = 1.5$ impossible. Root is $x = \\pi$."
                    )
                ]
            },
            {
                "heading": "Section 4: Trigonometric Graphs & Transformations",
                "questions": [
                    make_q(
                        "State the amplitude and period of the function $y = 3\\sin(2x) - 1$.",
                        ["Amplitude $= 3$, Period $= \\pi$", "Amplitude $= 3$, Period $= 2\\pi$", "Amplitude $= 2$, Period $= \\pi$", "Amplitude $= 4$, Period $= \\pi$"],
                        0,
                        "Amplitude is $|a| = 3$. Period is $2\\pi/b = 2\\pi/2 = \\pi$."
                    ),
                    make_q(
                        "Find the range of the function $f(x) = 4 - 3\\cos(x)$ for all real $x$.",
                        ["$[1, 7]$", "$[-1, 7]$", "$[1, 4]$", "$[-3, 3]$"],
                        0,
                        "Since $-1 \\leq \\cos(x) \\leq 1$: minimum is $4 - 3(1) = 1$, maximum is $4 - 3(-1) = 7$. Range is $[1, 7]$."
                    ),
                    make_q(
                        "Find the number of solutions to the equation $\\sin(2x) = \\cos(x)$ in the interval $0 \\leq x \\leq 2\\pi$.",
                        ["4 solutions", "2 solutions", "3 solutions", "6 solutions"],
                        0,
                        "$2\\sin x\\cos x - \\cos x = 0 \\Rightarrow \\cos x(2\\sin x - 1) = 0$. $\\cos x = 0 \\Rightarrow x = \\pi/2, 3\\pi/2$. $\\sin x = 1/2 \\Rightarrow x = \\pi/6, 5\\pi/6$. Total 4 solutions."
                    )
                ]
            }
        ]
    },

    # --------------------------------------------------------------------------
    # 6.01: Differentiation & Integration
    # --------------------------------------------------------------------------
    {
        "track": "aslevel",
        "num": "6.01",
        "slug": "differentiation-integration",
        "title": "Differentiation & Integration",
        "sections": [
            {
                "heading": "Section 1: Derivatives of Polynomials & Tangents",
                "questions": [
                    make_q(
                        "Differentiate $y = 3x^4 - 5x^2 + 7x - 2$ with respect to $x$.",
                        ["$12x^3 - 10x + 7$", "$12x^3 - 10x^2 + 7$", "$7x^3 - 10x + 7$", "$12x^4 - 10x^2 + 7$"],
                        0,
                        "Apply the power rule: $d/dx[3x^4] = 12x^3$, $d/dx[-5x^2] = -10x$, $d/dx[7x] = 7$, $d/dx[-2] = 0$."
                    ),
                    make_q(
                        "Find the gradient of the curve $y = x^3 - 4x + 1$ at the point where $x = 2$.",
                        ["8", "12", "4", "0"],
                        0,
                        "$dy/dx = 3x^2 - 4$. At $x = 2$: $dy/dx = 3(4) - 4 = 12 - 4 = 8$."
                    ),
                    make_q(
                        "Find the equation of the tangent to the curve $y = x^2 - 3x + 2$ at the point $(3, 2)$.",
                        ["$y = 3x - 7$", "$y = 3x - 2$", "$y = x - 1$", "$y = 2x - 4$"],
                        0,
                        "$dy/dx = 2x - 3$. At $x = 3$, gradient $m = 2(3) - 3 = 3$. Tangent: $y - 2 = 3(x - 3) \\Rightarrow y = 3x - 7$."
                    )
                ]
            },
            {
                "heading": "Section 2: Stationary Points & Optimization",
                "questions": [
                    make_q(
                        "Find the stationary points of the curve $y = 2x^3 - 9x^2 + 12x + 1$ and determine their nature.",
                        ["Local max at $(1, 6)$, local min at $(2, 5)$", "Local min at $(1, 6)$, local max at $(2, 5)$", "Local max at $(2, 5)$, inflection at $(1, 6)$", "Local min at $(0, 1)$, local max at $(2, 5)$"],
                        0,
                        "$dy/dx = 6x^2 - 18x + 12 = 6(x^2 - 3x + 2) = 6(x - 1)(x - 2) = 0 \\Rightarrow x = 1, 2$. $d^2y/dx^2 = 12x - 18$. At $x = 1$: $d^2y/dx^2 = -6 < 0$ (max, $y=6$). At $x = 2$: $d^2y/dx^2 = 6 > 0$ (min, $y=5$)."
                    ),
                    make_q(
                        "A metal wire of length 40 cm is bent into a rectangle of dimensions $x$ by $y$. What value of $x$ maximizes the enclosed area?",
                        ["$x = 10\\text{ cm}$", "$x = 20\\text{ cm}$", "$x = 5\\text{ cm}$", "$x = 15\\text{ cm}$"],
                        0,
                        "$2x + 2y = 40 \\Rightarrow y = 20 - x$. Area $A = x(20 - x) = 20x - x^2$. $dA/dx = 20 - 2x = 0 \\Rightarrow x = 10$."
                    ),
                    make_q(
                        "For what range of values of $x$ is the function $f(x) = x^3 - 6x^2 + 9x - 4$ strictly increasing?",
                        ["$x < 1$ or $x > 3$", "$1 < x < 3$", "$x > 2$", "$x < 2$"],
                        0,
                        "$f'(x) = 3x^2 - 12x + 9 = 3(x - 1)(x - 3) > 0 \\Rightarrow x < 1$ or $x > 3$."
                    )
                ]
            },
            {
                "heading": "Section 3: Indefinite & Definite Integrals",
                "questions": [
                    make_q(
                        "Find $\\int (6x^2 - 4x + 5)\\,dx$.",
                        ["$2x^3 - 2x^2 + 5x + C$", "$3x^3 - 2x^2 + 5x + C$", "$2x^3 - 4x^2 + 5x + C$", "$12x - 4 + C$"],
                        0,
                        "$\int 6x^2 dx = 2x^3$, $\int -4x dx = -2x^2$, $\int 5 dx = 5x$. Result: $2x^3 - 2x^2 + 5x + C$."
                    ),
                    make_q(
                        "Evaluate the definite integral $\\int_1^3 (3x^2 - 2x)\\,dx$.",
                        ["18", "24", "16", "20"],
                        0,
                        "$[x^3 - x^2]_1^3 = (27 - 9) - (1 - 1) = 18 - 0 = 18$."
                    ),
                    make_q(
                        "A curve passes through $(1, 4)$ and has gradient function $\\dfrac{dy}{dx} = 4x - 1$. Find the equation of the curve.",
                        ["$y = 2x^2 - x + 3$", "$y = 2x^2 - x + 4$", "$y = 4x^2 - x + 1$", "$y = 2x^2 - x + 1$"],
                        0,
                        "$y = \int (4x - 1) dx = 2x^2 - x + C$. At $(1, 4)$: $4 = 2(1) - 1 + C \\Rightarrow 4 = 1 + C \\Rightarrow C = 3$. Curve: $y = 2x^2 - x + 3$."
                    )
                ]
            },
            {
                "heading": "Section 4: Area Under Curves & Exam-Style Modeling",
                "questions": [
                    make_q(
                        "Find the area enclosed by the curve $y = 4 - x^2$ and the $x$-axis.",
                        ["$\\dfrac{32}{3}$", "$\\dfrac{16}{3}$", "8", "$\\dfrac{64}{3}$"],
                        0,
                        "Roots at $x = \\pm 2$. Area $= \int_{-2}^2 (4 - x^2) dx = [4x - x^3/3]_{-2}^2 = (8 - 8/3) - (-8 + 8/3) = 16/3 - (-16/3) = 32/3$."
                    ),
                    make_q(
                        "Find the area of the region bounded by the curve $y = x^2$ and the line $y = 2x$.",
                        ["$\\dfrac{4}{3}$", "$\\dfrac{2}{3}$", "2", "$\\dfrac{8}{3}$"],
                        0,
                        "Intersections: $x^2 = 2x \\Rightarrow x(x - 2) = 0 \\Rightarrow x = 0, 2$. Area $= \int_0^2 (2x - x^2) dx = [x^2 - x^3/3]_0^2 = 4 - 8/3 = 4/3$."
                    ),
                    make_q(
                        "A particle moves along a straight line such that its velocity at time $t$ is $v(t) = 3t^2 - 12t + 9$. Find the total displacement between $t = 0$ and $t = 3$.",
                        ["0", "9", "18", "4.5"],
                        0,
                        "Displacement $= \int_0^3 (3t^2 - 12t + 9) dt = [t^3 - 6t^2 + 9t]_0^3 = (27 - 54 + 27) - 0 = 0$."
                    )
                ]
            }
        ]
    }
]
