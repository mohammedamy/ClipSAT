"""Precalculus Topics Data Part 1: Topics 1.01 to 3.04 (11 Topics).

Standardized 4-Page Format:
4 Sections × 3 Questions = 12 MCQs per topic with exact 4-page layout and full solutions.
"""

def make_q(q, choices, correct, answer):
    return {
        "q": q,
        "choices": choices,
        "correct": correct,
        "answer": answer
    }

PRECALC_TOPICS_P1 = [
    # ── 1.01 Functions and Function Notation ──────────────────────────────────
    {
        "track": "precalc",
        "num": "1.01",
        "slug": "functions-and-function-notation",
        "title": "Functions and Function Notation",
        "sections": [
            {
                "heading": "Section 1: Evaluating Functions and Function Notation",
                "questions": [
                    make_q(
                        "Given $f(x) = 3x^2 - 4x + 1$, evaluate $f(-2)$.",
                        ["$21$", "$5$", "$-3$", "$17$"],
                        0,
                        "$f(-2) = 3(-2)^2 - 4(-2) + 1 = 3(4) + 8 + 1 = 12 + 8 + 1 = 21$."
                    ),
                    make_q(
                        "If $g(x) = \\frac{2x + 5}{x - 1}$, find $g(3a + 1)$.",
                        ["$\\frac{6a + 7}{3a}$", "$\\frac{6a + 5}{3a + 1}$", "$\\frac{6a + 2}{3a}$", "$\\frac{2a + 5}{a}$"],
                        0,
                        "$g(3a + 1) = \\frac{2(3a + 1) + 5}{(3a + 1) - 1} = \\frac{6a + 2 + 5}{3a} = \\frac{6a + 7}{3a}$."
                    ),
                    make_q(
                        "Find all values of $x$ for which $f(x) = x^2 - 6x$ equals $-8$.",
                        ["$x = 2$ and $x = 4$", "$x = -2$ and $x = -4$", "$x = 1$ and $x = 8$", "$x = 0$ and $x = 6$"],
                        0,
                        "$x^2 - 6x = -8 \\Rightarrow x^2 - 6x + 8 = 0 \\Rightarrow (x - 2)(x - 4) = 0 \\Rightarrow x = 2$ or $x = 4$."
                    )
                ]
            },
            {
                "heading": "Section 2: The Vertical Line Test and Relations",
                "questions": [
                    make_q(
                        "Which of the following equations defines $y$ as a function of $x$?",
                        ["$y = 2x^3 - 5$", "$x^2 + y^2 = 16$", "$x = y^2 + 1$", "$|y| = 3x$"],
                        0,
                        "$y = 2x^3 - 5$ assigns exactly one unique output $y$ for each input $x$. Equations with $y^2$ or $|y|$ can produce two outputs for a single $x$."
                    ),
                    make_q(
                        "What does the Vertical Line Test determine about a graph?",
                        ["Whether the graph represents a function", "Whether the function is one-to-one", "The domain of the function", "The slope of the curve"],
                        0,
                        "If every vertical line intersects a graph in at most one point, then the graph represents $y$ as a function of $x$."
                    ),
                    make_q(
                        "Which set of ordered pairs represents a function?",
                        ["$\\{(1, 2), (2, 3), (3, 4), (4, 4)\\}$", "$\\{(1, 2), (1, 3), (2, 4)\\}$", "$\\{(0, 5), (0, -5), (1, 2)\\}$", "$\\{(3, 1), (3, 2), (3, 3)\\}$"],
                        0,
                        "In $\\{(1, 2), (2, 3), (3, 4), (4, 4)\\}$, every first coordinate ($x$) is unique and paired with exactly one second coordinate ($y$)."
                    )
                ]
            },
            {
                "heading": "Section 3: Operations and Difference Quotients",
                "questions": [
                    make_q(
                        "Simplify the difference quotient $\\frac{f(x+h) - f(x)}{h}$ for $f(x) = 4x - 7$.",
                        ["$4$", "$4h$", "$4x + 4h - 7$", "$0$"],
                        0,
                        "$\\frac{[4(x+h) - 7] - [4x - 7]}{h} = \\frac{4x + 4h - 7 - 4x + 7}{h} = \\frac{4h}{h} = 4$."
                    ),
                    make_q(
                        "Simplify $\\frac{f(x+h) - f(x)}{h}$ for $f(x) = 2x^2 + 3$.",
                        ["$4x + 2h$", "$4x$", "$2x + 2h$", "$4x + h$"],
                        0,
                        "$\\frac{2(x+h)^2 + 3 - (2x^2 + 3)}{h} = \\frac{2(x^2 + 2xh + h^2) - 2x^2}{h} = \\frac{4xh + 2h^2}{h} = 4x + 2h$."
                    ),
                    make_q(
                        "If $f(x) = x^2 - 1$ and $g(x) = 2x + 3$, find $(f \\cdot g)(2)$.",
                        ["$21$", "$15$", "$18$", "$28$"],
                        0,
                        "$f(2) = 2^2 - 1 = 3$. $g(2) = 2(2) + 3 = 7$. $(f \\cdot g)(2) = f(2) \\cdot g(2) = 3 \\cdot 7 = 21$."
                    )
                ]
            },
            {
                "heading": "Section 4: Function Composition",
                "questions": [
                    make_q(
                        "Given $f(x) = 2x + 1$ and $g(x) = x^2 - 3$, find $(f \\circ g)(x)$.",
                        ["$2x^2 - 5$", "$4x^2 + 4x - 2$", "$2x^2 - 3$", "$2x^2 + 1$"],
                        0,
                        "$(f \\circ g)(x) = f(g(x)) = 2(x^2 - 3) + 1 = 2x^2 - 6 + 1 = 2x^2 - 5$."
                    ),
                    make_q(
                        "For the same functions $f(x) = 2x + 1$ and $g(x) = x^2 - 3$, evaluate $(g \\circ f)(2)$.",
                        ["$22$", "$25$", "$17$", "$3$"],
                        0,
                        "$f(2) = 2(2) + 1 = 5$. Then $g(f(2)) = g(5) = 5^2 - 3 = 25 - 3 = 22$."
                    ),
                    make_q(
                        "If $h(x) = \\sqrt{2x^3 - 5}$, find functions $f(x)$ and $g(x)$ such that $h(x) = (f \\circ g)(x)$.",
                        ["$f(x) = \\sqrt{x}, g(x) = 2x^3 - 5$", "$f(x) = 2x^3 - 5, g(x) = \\sqrt{x}$", "$f(x) = x^3, g(x) = \\sqrt{2x - 5}$", "$f(x) = 2\\sqrt{x}, g(x) = x^3 - 5$"],
                        0,
                        "Outer function is the square root: $f(u) = \\sqrt{u}$. Inner function is the cubic polynomial: $g(x) = 2x^3 - 5$."
                    )
                ]
            }
        ]
    },

    # ── 1.02 Domain and Range ─────────────────────────────────────────────────
    {
        "track": "precalc",
        "num": "1.02",
        "slug": "domain-and-range",
        "title": "Domain and Range",
        "sections": [
            {
                "heading": "Section 1: Finding Domains of Rational and Radical Functions",
                "questions": [
                    make_q(
                        "Find the domain of $f(x) = \\frac{x - 3}{x^2 - 16}$.",
                        ["$(-\\infty, -4) \\cup (-4, 4) \\cup (4, \\infty)$", "$(-\\infty, 4) \\cup (4, \\infty)$", "$[-4, 4]$", "All real numbers except $x = 3$"],
                        0,
                        "Denominator cannot be zero: $x^2 - 16 \\neq 0 \\Rightarrow x \\neq \\pm 4$. Domain: all reals except $x = -4$ and $x = 4$."
                    ),
                    make_q(
                        "Find the domain of $g(x) = \\sqrt{2x - 8}$.",
                        ["$[4, \\infty)$", "$(4, \\infty)$", "$[8, \\infty)$", "$(-\\infty, 4]$"],
                        0,
                        "The radicand must be non-negative: $2x - 8 \\geq 0 \\Rightarrow 2x \\geq 8 \\Rightarrow x \\geq 4$, which is $[4, \\infty)$."
                    ),
                    make_q(
                        "Find the domain of $h(x) = \\frac{1}{\\sqrt{9 - x^2}}$.",
                        ["$(-3, 3)$", "$[-3, 3]$", "$(-\\infty, -3) \\cup (3, \\infty)$", "$[0, 3)$"],
                        0,
                        "Radicand in denominator must be strictly positive: $9 - x^2 > 0 \\Rightarrow x^2 < 9 \\Rightarrow -3 < x < 3$."
                    )
                ]
            },
            {
                "heading": "Section 2: Finding Ranges of Algebraic Functions",
                "questions": [
                    make_q(
                        "Find the range of $f(x) = x^2 - 4x + 7$.",
                        ["$[3, \\infty)$", "$[7, \\infty)$", "$(-\\infty, 3]$", "$[0, \\infty)$"],
                        0,
                        "Complete the square: $f(x) = (x - 2)^2 + 3$. Since $(x - 2)^2 \\geq 0$, the minimum value is 3. Range: $[3, \\infty)$."
                    ),
                    make_q(
                        "Find the range of $g(x) = -|x + 2| + 5$.",
                        ["$(-\\infty, 5]$", "$[5, \\infty)$", "$(-\\infty, -2]$", "$[-5, 5]$"],
                        0,
                        "Since $|x + 2| \\geq 0$, $-|x + 2| \\leq 0$. Adding 5 gives $g(x) \\leq 5$. Range: $(-\\infty, 5]$."
                    ),
                    make_q(
                        "Find the range of $h(x) = \\sqrt{25 - x^2}$.",
                        ["$[0, 5]$", "$[-5, 5]$", "$[0, 25]$", "$[5, \\infty)$"],
                        0,
                        "Domain is $[-5, 5]$. Min occurs at $x = \\pm 5$ ($h = 0$). Max occurs at $x = 0$ ($h = 5$). Range is $[0, 5]$."
                    )
                ]
            },
            {
                "heading": "Section 3: Piecewise Functions",
                "questions": [
                    make_q(
                        "Evaluate $f(-2)$ for $f(x)$ defined as $2x + 1$ for $x < 0$, and $x^2 - 3$ for $x \\geq 0$.",
                        ["$-3$", "$1$", "$-2$", "$7$"],
                        0,
                        "Since $-2 < 0$, use the top rule: $f(-2) = 2(-2) + 1 = -4 + 1 = -3$."
                    ),
                    make_q(
                        "Find the domain of $f(x)$ defined as $\\frac{1}{x+3}$ for $x < 1$, and $\\sqrt{x - 1}$ for $x \\geq 1$.",
                        ["$(-\\infty, -3) \\cup (-3, \\infty)$", "$[1, \\infty)$", "All real numbers", "$(-\\infty, 1) \\cup [1, \\infty)$"],
                        0,
                        "For $x < 1$, $x+3 \\neq 0 \\Rightarrow x \\neq -3$. For $x \\geq 1$, $x - 1 \\geq 0$ is always true. Domain is all reals except $x = -3$."
                    ),
                    make_q(
                        "Determine the range of $g(x)$ defined as $-x$ for $x < 0$, and $x + 1$ for $x \\geq 0$.",
                        ["$(0, \\infty)$", "$[1, \\infty)$", "$[0, \\infty)$", "All real numbers"],
                        0,
                        "For $x < 0$, $-x > 0$, giving outputs $(0, \\infty)$. For $x \\geq 0$, $x + 1 \\geq 1$, giving $[1, \\infty)$. Union is $(0, \\infty)$."
                    )
                ]
            },
            {
                "heading": "Section 4: Domain and Range of Compositions",
                "questions": [
                    make_q(
                        "If $f(x) = \\frac{1}{x - 2}$ and $g(x) = \\sqrt{x}$, find the domain of $(f \\circ g)(x)$.",
                        ["$[0, 4) \\cup (4, \\infty)$", "$[0, \\infty)$", "$(4, \\infty)$", "All reals except $x = 2$"],
                        0,
                        "First, $g(x)$ requires $x \\geq 0$. Second, $f(g(x)) = \\frac{1}{\\sqrt{x} - 2}$ requires $\\sqrt{x} \\neq 2 \\Rightarrow x \\neq 4$. Domain: $[0, 4) \\cup (4, \\infty)$."
                    ),
                    make_q(
                        "If $f(x) = x^2$ and $g(x) = 3x - 1$, what is the range of $(f \\circ g)(x)$ for $x \\in \\mathbb{R}$?",
                        ["$[0, \\infty)$", "$[-1, \\infty)$", "$[1, \\infty)$", "All real numbers"],
                        0,
                        "$(f \\circ g)(x) = (3x - 1)^2$. Any real squared is non-negative, so the range is $[0, \\infty)$."
                    ),
                    make_q(
                        "Find the domain of $(g \\circ f)(x)$ if $f(x) = 2x + 6$ and $g(x) = \\ln(x)$.",
                        ["$(-3, \\infty)$", "$[0, \\infty)$", "$(-6, \\infty)$", "$(3, \\infty)$"],
                        0,
                        "$(g \\circ f)(x) = \\ln(2x + 6)$. The argument of logarithm must be strictly positive: $2x + 6 > 0 \\Rightarrow 2x > -6 \\Rightarrow x > -3$."
                    )
                ]
            }
        ]
    },

    # ── 1.03 Average Rate of Change ───────────────────────────────────────────
    {
        "track": "precalc",
        "num": "1.03",
        "slug": "average-rate-of-change",
        "title": "Average Rate of Change",
        "sections": [
            {
                "heading": "Section 1: Formula and Secant Line Concept",
                "questions": [
                    make_q(
                        "State the formula for the average rate of change of $f(x)$ over $[a, b]$.",
                        ["$\\frac{f(b) - f(a)}{b - a}$", "$\\frac{f(a) + f(b)}{2}$", "$\\frac{f(b) - f(a)}{2}$", "$\\frac{b - a}{f(b) - f(a)}$"],
                        0,
                        "The average rate of change is the slope of the secant line passing through $(a, f(a))$ and $(b, f(b))$: $\\frac{f(b) - f(a)}{b - a}$."
                    ),
                    make_q(
                        "Find the average rate of change of $f(x) = x^2 - 3x$ from $x = 1$ to $x = 4$.",
                        ["$2$", "$4$", "$3$", "$1$"],
                        0,
                        "$f(1) = 1 - 3 = -2$. $f(4) = 16 - 12 = 4$. Rate $= \\frac{4 - (-2)}{4 - 1} = \\frac{6}{3} = 2$."
                    ),
                    make_q(
                        "Find the slope of the secant line connecting $(2, f(2))$ and $(5, f(5))$ for $f(x) = 2x^2 + 1$.",
                        ["$14$", "$12$", "$16$", "$10$"],
                        0,
                        "$f(2) = 9, f(5) = 51$. Slope $= \\frac{51 - 9}{5 - 2} = \\frac{42}{3} = 14$."
                    )
                ]
            },
            {
                "heading": "Section 2: Tabular and Data-Based Rates of Change",
                "questions": [
                    make_q(
                        "A table shows $t = [0, 2, 5]$ and distance $s(t) = [0, 24, 75]$. What is the average velocity from $t = 2$ to $t = 5$?",
                        ["$17\\text{ m/s}$", "$15\\text{ m/s}$", "$25\\text{ m/s}$", "$12\\text{ m/s}$"],
                        0,
                        "Average velocity $= \\frac{s(5) - s(2)}{5 - 2} = \\frac{75 - 24}{3} = \\frac{51}{3} = 17\\text{ m/s}$."
                    ),
                    make_q(
                        "Water depth in a reservoir drops from $80\\text{ ft}$ at day 4 to $68\\text{ ft}$ at day 10. Find the average rate of change in depth per day.",
                        ["$-2\\text{ ft/day}$", "$2\\text{ ft/day}$", "$-1.2\\text{ ft/day}$", "$-12\\text{ ft/day}$"],
                        0,
                        "$\\frac{68 - 80}{10 - 4} = \\frac{-12}{6} = -2\\text{ ft/day}$."
                    ),
                    make_q(
                        "If the average rate of change of $g(x)$ over $[1, 6]$ is $4$ and $g(1) = 5$, find $g(6)$.",
                        ["$25$", "$20$", "$29$", "$24$"],
                        0,
                        "$\\frac{g(6) - 5}{6 - 1} = 4 \\Rightarrow g(6) - 5 = 20 \\Rightarrow g(6) = 25$."
                    )
                ]
            },
            {
                "heading": "Section 3: Algebraic Expressions with Variables",
                "questions": [
                    make_q(
                        "Find the average rate of change of $f(x) = x^2$ over the interval $[2, 2 + h]$ in terms of $h$.",
                        ["$4 + h$", "$4$", "$2 + h$", "$4 + 2h$"],
                        0,
                        "$\\frac{f(2+h) - f(2)}{h} = \\frac{(2+h)^2 - 4}{h} = \\frac{4 + 4h + h^2 - 4}{h} = \\frac{4h + h^2}{h} = 4 + h$."
                    ),
                    make_q(
                        "Find the average rate of change of $f(x) = 3x^2 - 5$ over $[x, x + h]$.",
                        ["$6x + 3h$", "$6x$", "$3x + 3h$", "$6x - 5$"],
                        0,
                        "$\\frac{3(x+h)^2 - 5 - (3x^2 - 5)}{h} = \\frac{6xh + 3h^2}{h} = 6x + 3h$."
                    ),
                    make_q(
                        "For $f(x) = \\frac{1}{x}$, find the average rate of change over $[a, b]$.",
                        ["$-\\frac{1}{ab}$", "$\\frac{1}{ab}$", "$-\\frac{1}{a+b}$", "$\\frac{a-b}{ab}$"],
                        0,
                        "$\\frac{1/b - 1/a}{b - a} = \\frac{(a - b)/(ab)}{b - a} = -\\frac{b - a}{ab(b - a)} = -\\frac{1}{ab}$."
                    )
                ]
            },
            {
                "heading": "Section 4: Contextual Applications",
                "questions": [
                    make_q(
                        "A projectile's height is given by $h(t) = -16t^2 + 80t$. Find its average velocity over the first 3 seconds $[0, 3]$.",
                        ["$32\\text{ ft/s}$", "$48\\text{ ft/s}$", "$16\\text{ ft/s}$", "$80\\text{ ft/s}$"],
                        0,
                        "$h(0) = 0$. $h(3) = -16(9) + 80(3) = -144 + 240 = 96\\text{ ft}$. Average velocity $= \\frac{96 - 0}{3 - 0} = 32\\text{ ft/s}$."
                    ),
                    make_q(
                        "A company's revenue in thousands of dollars is $R(x) = 50x - x^2$, where $x$ is in hundreds of units. What is the average rate of change in revenue as production increases from $x = 10$ to $x = 20$?",
                        ["$20\\text{ thousand dollars per unit}$", "$30$", "$15$", "$25$"],
                        0,
                        "$R(10) = 500 - 100 = 400$. $R(20) = 1000 - 400 = 600$. Rate $= \\frac{600 - 400}{20 - 10} = \\frac{200}{10} = 20$."
                    ),
                    make_q(
                        "Why does a linear function $f(x) = mx + b$ have the same average rate of change over EVERY interval?",
                        ["Because the slope of the secant line between any two points is constantly $m$", "Because $b = 0$", "Because the function has no intercepts", "Because $f(x)$ is symmetric"],
                        0,
                        "For any $a$ and $b$, $\\frac{(mb + b_0) - (ma + b_0)}{b - a} = \\frac{m(b - a)}{b - a} = m$, which is constant."
                    )
                ]
            }
        ]
    },

    # ── 2.01 Right-Triangle Trigonometry ──────────────────────────────────────
    {
        "track": "precalc",
        "num": "2.01",
        "slug": "right-triangle-trigonometry",
        "title": "Right-Triangle Trigonometry",
        "sections": [
            {
                "heading": "Section 1: The Six Trigonometric Ratios",
                "questions": [
                    make_q(
                        "In a right triangle with acute angle $\\theta$, the side opposite $\\theta$ is 5 and the hypotenuse is 13. Find $\\cos\\theta$.",
                        ["$12/13$", "$5/12$", "$13/12$", "$12/5$"],
                        0,
                        "Adjacent side $a = \\sqrt{13^2 - 5^2} = \\sqrt{169 - 25} = 12$. $\\cos\\theta = \\frac{\\text{adjacent}}{\\text{hypotenuse}} = 12/13$."
                    ),
                    make_q(
                        "For the same triangle ($\text{opp} = 5, \\text{adj} = 12, \\text{hyp} = 13$), find $\\sec\\theta$.",
                        ["$13/12$", "$13/5$", "$12/13$", "$12/5$"],
                        0,
                        "$\\sec\\theta = \\frac{1}{\\cos\\theta} = \\frac{\\text{hypotenuse}}{\\text{adjacent}} = \\frac{13}{12}$."
                    ),
                    make_q(
                        "If $\\tan\\theta = 3/4$ in a right triangle, find $\\csc\\theta$.",
                        ["$5/3$", "$5/4$", "$4/3$", "$3/5$"],
                        0,
                        "$\\text{Opposite} = 3, \\text{adjacent} = 4 \\Rightarrow \\text{hypotenuse} = 5$. $\\csc\\theta = \\frac{\\text{hypotenuse}}{\\text{opposite}} = 5/3$."
                    )
                ]
            },
            {
                "heading": "Section 2: Special Right Triangles (30-60-90 and 45-45-90)",
                "questions": [
                    make_q(
                        "In a $30^\\circ-60^\\circ-90^\\circ$ triangle, if the shorter leg is 4, find the lengths of the longer leg and the hypotenuse.",
                        ["Longer leg $= 4\\sqrt{3}$, Hypotenuse $= 8$", "Longer leg $= 8$, Hypotenuse $= 4\\sqrt{3}$", "Longer leg $= 4\\sqrt{2}$, Hypotenuse $= 8$", "Longer leg $= 6$, Hypotenuse $= 8$"],
                        0,
                        "Ratio of sides opposite $30^\\circ : 60^\\circ : 90^\\circ$ is $1 : \\sqrt{3} : 2$. With short leg 4: longer leg is $4\\sqrt{3}$ and hypotenuse is 8."
                    ),
                    make_q(
                        "In a $45^\\circ-45^\\circ-90^\\circ$ triangle, if the hypotenuse is 10, find the length of each leg.",
                        ["$5\\sqrt{2}$", "$5$", "$10\\sqrt{2}$", "$5\\sqrt{3}$"],
                        0,
                        "Hypotenuse $= s\\sqrt{2} = 10 \\Rightarrow s = \\frac{10}{\\sqrt{2}} = 5\\sqrt{2}$."
                    ),
                    make_q(
                        "What is the exact value of $\\sec(60^\\circ) + \\tan(45^\\circ)$?",
                        ["$3$", "$2 + \\sqrt{3}$", "$1 + \\sqrt{3}$", "$2$"],
                        0,
                        "$\\cos(60^\\circ) = 1/2 \\Rightarrow \\sec(60^\\circ) = 2$. $\\tan(45^\\circ) = 1$. Sum $= 2 + 1 = 3$."
                    )
                ]
            },
            {
                "heading": "Section 3: Cofunction Identities and Reciprocals",
                "questions": [
                    make_q(
                        "Which cofunction identity correctly relates sine and cosine for complementary acute angles?",
                        ["$\\sin(90^\\circ - \\theta) = \\cos\\theta$", "$\\sin(90^\\circ - \\theta) = -\\cos\\theta$", "$\\sin(90^\\circ - \\theta) = \\sin\\theta$", "$\\sin(90^\\circ - \\theta) = \\tan\\theta$"],
                        0,
                        "In a right triangle, the two acute angles are complementary, so the side opposite one angle is adjacent to the other: $\\sin(90^\\circ - \\theta) = \\cos\\theta$."
                    ),
                    make_q(
                        "If $\\cos(28^\\circ) \\approx 0.8829$, what is $\\sin(62^\\circ)$?",
                        ["$0.8829$", "$0.1171$", "$0.4695$", "$1.1326$"],
                        0,
                        "Since $28^\\circ + 62^\\circ = 90^\\circ$, $\\sin(62^\\circ) = \\cos(90^\\circ - 62^\\circ) = \\cos(28^\\circ) \\approx 0.8829$."
                    ),
                    make_q(
                        "Simplify $\\cot(90^\\circ - \\theta) \\cdot \\cot\\theta$.",
                        ["$1$", "$\\tan^2\\theta$", "$\\cot^2\\theta$", "$0$"],
                        0,
                        "By cofunction identity, $\\cot(90^\\circ - \\theta) = \\tan\\theta$. Then $\\tan\\theta \\cdot \\cot\\theta = \\tan\\theta \\cdot \\frac{1}{\\tan\\theta} = 1$."
                    )
                ]
            },
            {
                "heading": "Section 4: Angles of Elevation and Depression",
                "questions": [
                    make_q(
                        "From a point $50\\text{ ft}$ from the base of a building, the angle of elevation to the top is $60^\\circ$. How tall is the building?",
                        ["$50\\sqrt{3}\\text{ ft}$", "$100\\text{ ft}$", "$50\\text{ ft}$", "$25\\sqrt{3}\\text{ ft}$"],
                        0,
                        "$\\tan(60^\\circ) = \\frac{h}{50} \\Rightarrow h = 50\\tan(60^\\circ) = 50\\sqrt{3}\\text{ ft}$."
                    ),
                    make_q(
                        "A lighthouse keeper $120\\text{ ft}$ above sea level spots a boat at an angle of depression of $30^\\circ$. How far is the boat from the base of the lighthouse?",
                        ["$120\\sqrt{3}\\text{ ft}$", "$60\\sqrt{3}\\text{ ft}$", "$240\\text{ ft}$", "$120\\text{ ft}$"],
                        0,
                        "The angle of elevation from the boat equals the angle of depression: $30^\\circ$. $\\tan(30^\\circ) = \\frac{120}{d} \\Rightarrow d = \\frac{120}{\\tan(30^\\circ)} = \\frac{120}{1/\\sqrt{3}} = 120\\sqrt{3}\\text{ ft}$."
                    ),
                    make_q(
                        "A $20\\text{-ft}$ ladder leans against a wall reaching a height of $16\\text{ ft}$. What is $\\sin\\theta$ where $\\theta$ is the angle the ladder makes with the ground?",
                        ["$4/5$", "$3/5$", "$4/3$", "$3/4$"],
                        0,
                        "$\\sin\\theta = \\frac{\\text{height}}{\\text{length}} = \\frac{16}{20} = \\frac{4}{5}$."
                    )
                ]
            }
        ]
    },

    # ── 2.02 Radian Measure and Arc Length ────────────────────────────────────
    {
        "track": "precalc",
        "num": "2.02",
        "slug": "radian-measure-and-arc-length",
        "title": "Radian Measure and Arc Length",
        "sections": [
            {
                "heading": "Section 1: Degrees and Radians Conversion",
                "questions": [
                    make_q(
                        "Convert $150^\\circ$ to exact radians in simplest form.",
                        ["$\\frac{5\\pi}{6}$", "$\\frac{2\\pi}{3}$", "$\\frac{3\\pi}{4}$", "$\\frac{7\\pi}{6}$"],
                        0,
                        "$150^\\circ \\times \\frac{\\pi}{180^\\circ} = \\frac{150\\pi}{180} = \\frac{5\\pi}{6}$."
                    ),
                    make_q(
                        "Convert $\\frac{7\\pi}{4}$ radians to degrees.",
                        ["$315^\\circ$", "$225^\\circ$", "$300^\\circ$", "$330^\\circ$"],
                        0,
                        "$\\frac{7\\pi}{4} \\times \\frac{180^\\circ}{\\pi} = 7 \\times 45^\\circ = 315^\\circ$."
                    ),
                    make_q(
                        "Find a positive angle coterminal with $-\\frac{2\\pi}{3}$ in the interval $[0, 2\\pi)$.",
                        ["$\\frac{4\\pi}{3}$", "$\\frac{\\pi}{3}$", "$\\frac{5\\pi}{3}$", "$\\frac{2\\pi}{3}$"],
                        0,
                        "$-\\frac{2\\pi}{3} + 2\\pi = -\\frac{2\\pi}{3} + \\frac{6\\pi}{3} = \\frac{4\\pi}{3}$."
                    )
                ]
            },
            {
                "heading": "Section 2: Arc Length",
                "questions": [
                    make_q(
                        "State the formula for arc length $s$ subtended by a central angle $\\theta$ (in radians) in a circle of radius $r$.",
                        ["$s = r\\theta$", "$s = \\frac{1}{2}r^2\\theta$", "$s = 2\\pi r \\theta$", "$s = \\frac{r}{\\theta}$"],
                        0,
                        "By the definition of radian measure, the arc length subtended by central angle $\\theta$ is $s = r\\theta$."
                    ),
                    make_q(
                        "Find the arc length intercepted by a central angle of $\\frac{2\\pi}{3}$ in a circle of radius $9\\text{ cm}$.",
                        ["$6\\pi\\text{ cm}$", "$3\\pi\\text{ cm}$", "$18\\pi\\text{ cm}$", "$12\\pi\\text{ cm}$"],
                        0,
                        "$s = r\\theta = 9 \\times \\frac{2\\pi}{3} = 6\\pi\\text{ cm}$."
                    ),
                    make_q(
                        "An arc of length $10\\text{ m}$ subtends a central angle of $2\\text{ radians}$. What is the radius of the circle?",
                        ["$5\\text{ m}$", "$20\\text{ m}$", "$10\\text{ m}$", "$2.5\\text{ m}$"],
                        0,
                        "$s = r\\theta \\Rightarrow 10 = r(2) \\Rightarrow r = 5\\text{ m}$."
                    )
                ]
            },
            {
                "heading": "Section 3: Sector Area",
                "questions": [
                    make_q(
                        "State the formula for the area $A$ of a sector of a circle with radius $r$ and central angle $\\theta$ (in radians).",
                        ["$A = \\frac{1}{2}r^2\\theta$", "$A = r^2\\theta$", "$A = \\frac{1}{2}r\\theta$", "$A = \\pi r^2\\theta$"],
                        0,
                        "The area of a sector proportional to the circle is $\\frac{\\theta}{2\\pi}(\\pi r^2) = \\frac{1}{2}r^2\\theta$."
                    ),
                    make_q(
                        "Find the area of a sector with radius $6\\text{ in}$ and central angle $\\frac{\\pi}{4}$.",
                        ["$\\frac{9\\pi}{2}\\text{ sq in}$", "$9\\pi\\text{ sq in}$", "$\\frac{9\\pi}{4}\\text{ sq in}$", "$18\\pi\\text{ sq in}$"],
                        0,
                        "$A = \\frac{1}{2}r^2\\theta = \\frac{1}{2}(36)\\left(\\frac{\\pi}{4}\\right) = 18\\left(\\frac{\\pi}{4}\\right) = \\frac{9\\pi}{2}$."
                    ),
                    make_q(
                        "If a sector of radius $4\\text{ cm}$ has an area of $8\\pi\\text{ cm}^2$, find its central angle $\\theta$.",
                        ["$\\pi\\text{ radians}$", "$2\\pi\\text{ radians}$", "$\\pi/2\\text{ radians}$", "$4\\pi\\text{ radians}$"],
                        0,
                        "$A = \\frac{1}{2}r^2\\theta \\Rightarrow 8\\pi = \\frac{1}{2}(16)\\theta = 8\\theta \\Rightarrow \\theta = \\pi\\text{ radians}$."
                    )
                ]
            },
            {
                "heading": "Section 4: Linear and Angular Speed",
                "questions": [
                    make_q(
                        "What is the relationship between linear speed $v$, radius $r$, and angular speed $\\omega$ (in rad/time)?",
                        ["$v = r\\omega$", "$v = \\frac{\\omega}{r}$", "$v = r^2\\omega$", "$v = 2\\pi r\\omega$"],
                        0,
                        "Since arc length is $s = r\\theta$, dividing by time $t$ gives $\\frac{s}{t} = r\\frac{\\theta}{t} \\Rightarrow v = r\\omega$."
                    ),
                    make_q(
                        "A wheel of radius $2\\text{ ft}$ rotates at $60\\text{ rpm}$. Find its angular speed in radians per second.",
                        ["$2\\pi\\text{ rad/s}$", "$4\\pi\\text{ rad/s}$", "$\\pi\\text{ rad/s}$", "$120\\pi\\text{ rad/s}$"],
                        0,
                        "$60\\text{ rev/min} \\times \\frac{2\\pi\\text{ rad}}{1\\text{ rev}} \\times \\frac{1\\text{ min}}{60\\text{ s}} = 2\\pi\\text{ rad/s}$."
                    ),
                    make_q(
                        "In the previous question ($r = 2\\text{ ft}, \\omega = 2\\pi\\text{ rad/s}$), what is the linear speed of a point on the rim?",
                        ["$4\\pi\\text{ ft/s}$", "$2\\pi\\text{ ft/s}$", "$8\\pi\\text{ ft/s}$", "$120\\text{ ft/s}$"],
                        0,
                        "$v = r\\omega = 2(2\\pi) = 4\\pi\\text{ ft/s}$."
                    )
                ]
            }
        ]
    },

    # ── 2.03 Graphs of Sine and Cosine Functions ──────────────────────────────
    {
        "track": "precalc",
        "num": "2.03",
        "slug": "graphs-of-sine-and-cosine-functions",
        "title": "Graphs of Sine and Cosine Functions",
        "sections": [
            {
                "heading": "Section 1: Amplitude and Vertical Shift",
                "questions": [
                    make_q(
                        "Find the amplitude and midline equation of $y = -4\\cos(x) + 3$.",
                        ["Amplitude $= 4$, Midline: $y = 3$", "Amplitude $= -4$, Midline: $y = 3$", "Amplitude $= 4$, Midline: $y = -3$", "Amplitude $= 8$, Midline: $y = 3$"],
                        0,
                        "For $y = A\\cos(x) + D$, amplitude is $|A| = |-4| = 4$, and the midline is the horizontal line $y = D = 3$."
                    ),
                    make_q(
                        "What are the maximum and minimum values of $f(x) = 5\\sin(x) - 2$?",
                        ["Maximum $= 3$, Minimum $= -7$", "Maximum $= 5$, Minimum $= -5$", "Maximum $= 7$, Minimum $= -3$", "Maximum $= 3$, Minimum $= -3$"],
                        0,
                        "$\\sin(x) \\in [-1, 1]$. Maximum is $5(1) - 2 = 3$. Minimum is $5(-1) - 2 = -7$."
                    ),
                    make_q(
                        "A wave oscillates between a maximum of 12 and a minimum of 4. Find its amplitude.",
                        ["$4$", "$8$", "$6$", "$16$"],
                        0,
                        "Amplitude $= \\frac{\\text{Max} - \\text{Min}}{2} = \\frac{12 - 4}{2} = \\frac{8}{2} = 4$."
                    )
                ]
            },
            {
                "heading": "Section 2: Period and Frequency",
                "questions": [
                    make_q(
                        "Find the period of the function $y = 3\\sin(4x)$.",
                        ["$\\frac{\\pi}{2}$", "$\\pi$", "$2\\pi$", "$\\frac{\\pi}{4}$"],
                        0,
                        "Period $T = \\frac{2\\pi}{B} = \\frac{2\\pi}{4} = \\frac{\\pi}{2}$."
                    ),
                    make_q(
                        "Find the frequency (cycles per unit of $x$) of $y = \\cos\\left(\\frac{\\pi}{3}x\\right)$.",
                        ["$1/6$", "$6$", "$\\pi/3$", "$3$"],
                        0,
                        "Period $T = \\frac{2\\pi}{\\pi/3} = 6$. Frequency $= \\frac{1}{T} = \\frac{1}{6}$."
                    ),
                    make_q(
                        "Write a sine function with amplitude 3 and period $4\\pi$.",
                        ["$y = 3\\sin\\left(\\frac{1}{2}x\\right)$", "$y = 3\\sin(4x)$", "$y = 3\\sin(2x)$", "$y = 4\\sin\\left(\\frac{1}{3}x\\right)$"],
                        0,
                        "Period $4\\pi = \\frac{2\\pi}{B} \\Rightarrow B = \\frac{2\\pi}{4\\pi} = \\frac{1}{2}$. Function: $y = 3\\sin\\left(\\frac{1}{2}x\\right)$."
                    )
                ]
            },
            {
                "heading": "Section 3: Phase Shift (Horizontal Shift)",
                "questions": [
                    make_q(
                        "Find the phase shift of $y = 2\\sin\\left(3x - \\frac{\\pi}{2}\\right)$.",
                        ["$\\frac{\\pi}{6}$ to the right", "$\\frac{\\pi}{2}$ to the right", "$\\frac{\\pi}{6}$ to the left", "$\\frac{3\\pi}{2}$ to the right"],
                        0,
                        "Rewrite as $2\\sin\\left(3\\left(x - \\frac{\\pi}{6}\\right)\\right)$. Phase shift $C/B = \\frac{\\pi/2}{3} = \\frac{\\pi}{6}$ to the right."
                    ),
                    make_q(
                        "At what value of $x$ does the first cycle start for $y = \\cos(2x + \\pi)$?",
                        ["$-\\frac{\\pi}{2}$", "$\\pi$", "$-\\pi$", "$\\frac{\\pi}{2}$"],
                        0,
                        "Set argument to $0$: $2x + \\pi = 0 \\Rightarrow 2x = -\\pi \\Rightarrow x = -\\pi/2$."
                    ),
                    make_q(
                        "Which transformation shifts the graph of $y = \\cos x$ to become identical to $y = \\sin x$?",
                        ["Shift right by $\\frac{\\pi}{2}$", "Shift left by $\\frac{\\pi}{2}$", "Reflect across the $x$-axis", "Shift up by 1"],
                        0,
                        "Since $\\cos(x - \\pi/2) = \\sin x$, shifting $y = \\cos x$ to the right by $\\pi/2$ gives $y = \\sin x$."
                    )
                ]
            },
            {
                "heading": "Section 4: Modeling Periodic Phenomena",
                "questions": [
                    make_q(
                        "The temperature in a greenhouse follows $T(t) = 15\\sin\\left(\\frac{\\pi}{12}(t - 6)\\right) + 65$, where $t$ is hours after midnight. What is the maximum temperature?",
                        ["$80^\\circ\\text{F}$", "$65^\\circ\\text{F}$", "$75^\\circ\\text{F}$", "$95^\\circ\\text{F}$"],
                        0,
                        "Max temperature $= \\text{Midline} + \\text{Amplitude} = 65 + 15 = 80^\\circ\\text{F}$."
                    ),
                    make_q(
                        "In the greenhouse model above, at what time of day ($t$) does the maximum temperature occur?",
                        ["$t = 12$ (12:00 PM / Noon)", "$t = 6$ (6:00 AM)", "$t = 18$ (6:00 PM)", "$t = 24$ (Midnight)"],
                        0,
                        "Sine attains its maximum of 1 when the argument is $\\pi/2$: $\\frac{\\pi}{12}(t - 6) = \\frac{\\pi}{2} \\Rightarrow t - 6 = 6 \\Rightarrow t = 12$ (Noon)."
                    ),
                    make_q(
                        "A Ferris wheel of radius $30\\text{ ft}$ has its lowest point $5\\text{ ft}$ off the ground and completes one rotation every 60 seconds. What is the midline height?",
                        ["$35\\text{ ft}$", "$30\\text{ ft}$", "$65\\text{ ft}$", "$40\\text{ ft}$"],
                        0,
                        "Lowest point $= 5\\text{ ft}$, highest point $= 5 + 2(30) = 65\\text{ ft}$. Midline $= 5 + 30 = 35\\text{ ft}$."
                    )
                ]
            }
        ]
    },

    # ── 2.04 Law of Sines and Law of Cosines ──────────────────────────────────
    {
        "track": "precalc",
        "num": "2.04",
        "slug": "law-of-sines-and-law-of-cosines",
        "title": "Law of Sines and Law of Cosines",
        "sections": [
            {
                "heading": "Section 1: The Law of Sines",
                "questions": [
                    make_q(
                        "State the Law of Sines for any triangle $ABC$.",
                        ["$\\frac{a}{\\sin A} = \\frac{b}{\\sin B} = \\frac{c}{\\sin C}$", "$a^2 = b^2 + c^2 - 2bc\\cos A$", "$a\\sin A = b\\sin B = c\\sin C$", "$\\frac{a}{\\cos A} = \\frac{b}{\\cos B}$"],
                        0,
                        "The Law of Sines states that the ratio of each side length to the sine of its opposite angle is equal for all three vertices."
                    ),
                    make_q(
                        "In $\\triangle ABC$, $A = 30^\\circ, B = 45^\\circ$, and $a = 8$. Find the exact length of side $b$.",
                        ["$8\\sqrt{2}$", "$4\\sqrt{2}$", "$8\\sqrt{3}$", "$16$"],
                        0,
                        "$\\frac{8}{\\sin 30^\\circ} = \\frac{b}{\\sin 45^\\circ} \\Rightarrow \\frac{8}{1/2} = \\frac{b}{\\sqrt{2}/2} \\Rightarrow 16 = \\frac{2b}{\\sqrt{2}} \\Rightarrow b = 8\\sqrt{2}$."
                    ),
                    make_q(
                        "Under which given information cases can the Law of Sines be directly applied to begin solving a triangle?",
                        ["AAS or ASA", "SAS or SSS", "SSS only", "Right triangles only"],
                        0,
                        "The Law of Sines requires at least one known angle-side opposite pair, which is always provided in AAS and ASA cases."
                    )
                ]
            },
            {
                "heading": "Section 2: The Ambiguous Case (SSA)",
                "questions": [
                    make_q(
                        "In the ambiguous SSA case with acute angle $A$, what does $h = b\\sin A$ represent?",
                        ["The altitude from vertex $C$ to side $c$", "The perimeter of the triangle", "The hypotenuse", "The length of side $a$"],
                        0,
                        "$h = b\\sin A$ is the perpendicular distance (height) from vertex $C$ to the opposite line."
                    ),
                    make_q(
                        "If $A = 30^\\circ, b = 10$, and $a = 4$, how many triangles can be formed?",
                        ["0 (no triangle exists)", "1 triangle", "2 triangles", "Infinitely many"],
                        0,
                        "$h = 10\\sin(30^\\circ) = 5$. Since $a = 4 < h = 5$, the side is too short to reach the opposite baseline, so no triangle can be formed."
                    ),
                    make_q(
                        "If $A = 30^\\circ, b = 10$, and $a = 7$, how many triangles can be formed?",
                        ["2 triangles", "1 triangle", "0 triangles", "Cannot be determined"],
                        0,
                        "$h = 10(0.5) = 5$. Since $h < a < b$ ($5 < 7 < 10$), side $a$ can swing to two different locations, forming exactly 2 triangles."
                    )
                ]
            },
            {
                "heading": "Section 3: The Law of Cosines",
                "questions": [
                    make_q(
                        "State the Law of Cosines to solve for side $c$ given sides $a, b$ and included angle $C$.",
                        ["$c^2 = a^2 + b^2 - 2ab\\cos C$", "$c^2 = a^2 + b^2 + 2ab\\cos C$", "$c = a\\cos B + b\\cos A$", "$c^2 = a^2 + b^2 - ab\\sin C$"],
                        0,
                        "The Law of Cosines is the generalized Pythagorean theorem: $c^2 = a^2 + b^2 - 2ab\\cos C$."
                    ),
                    make_q(
                        "In $\\triangle ABC$, $a = 5, b = 7$, and $C = 60^\\circ$. Find the exact length of side $c$.",
                        ["$\\sqrt{39}$", "$\\sqrt{74}$", "$\\sqrt{49} = 7$", "$6$"],
                        0,
                        "$c^2 = 5^2 + 7^2 - 2(5)(7)\\cos(60^\\circ) = 25 + 49 - 70(0.5) = 74 - 35 = 39 \\Rightarrow c = \\sqrt{39}$."
                    ),
                    make_q(
                        "In $\\triangle ABC$, $a = 3, b = 5, c = 7$. Find the exact value of $\\cos C$.",
                        ["$-1/2$", "$1/2$", "$-1/5$", "$-3/7$"],
                        0,
                        "$\\cos C = \\frac{a^2 + b^2 - c^2}{2ab} = \\frac{9 + 25 - 49}{2(3)(5)} = \\frac{34 - 49}{30} = \\frac{-15}{30} = -\\frac{1}{2}$."
                    )
                ]
            },
            {
                "heading": "Section 4: Area of an Oblique Triangle",
                "questions": [
                    make_q(
                        "State the sine formula for the area of $\\triangle ABC$ given sides $a$ and $b$ and angle $C$.",
                        ["$\\text{Area} = \\frac{1}{2}ab\\sin C$", "$\\text{Area} = ab\\sin C$", "$\\text{Area} = \\frac{1}{2}ab\\cos C$", "$\\text{Area} = \\frac{a + b}{2}\\sin C$"],
                        0,
                        "Using altitude $h = b\\sin C$, base $a$ gives $\\text{Area} = \\frac{1}{2}ab\\sin C$."
                    ),
                    make_q(
                        "Find the exact area of $\\triangle ABC$ if $a = 6, b = 10$, and $C = 30^\\circ$.",
                        ["$15$", "$30$", "$15\\sqrt{3}$", "$7.5$"],
                        0,
                        "$\\text{Area} = \\frac{1}{2}(6)(10)\\sin(30^\\circ) = 30(1/2) = 15$."
                    ),
                    make_q(
                        "Heron's formula states $\\text{Area} = \\sqrt{s(s-a)(s-b)(s-c)}$. Find the area of a triangle with sides 5, 6, and 7.",
                        ["$6\\sqrt{6}$", "$12\\sqrt{3}$", "$18$", "$14$"],
                        0,
                        "Semi-perimeter $s = \\frac{5+6+7}{2} = 9$. Area $= \\sqrt{9(9-5)(9-6)(9-7)} = \\sqrt{9(4)(3)(2)} = \\sqrt{216} = \\sqrt{36 \\times 6} = 6\\sqrt{6}$."
                    )
                ]
            }
        ]
    },

    # ── 3.01 The Unit Circle and Exact Values ──────────────────────────────────
    {
        "track": "precalc",
        "num": "3.01",
        "slug": "the-unit-circle-and-exact-values",
        "title": "The Unit Circle and Exact Values",
        "sections": [
            {
                "heading": "Section 1: Coordinates on the Unit Circle",
                "questions": [
                    make_q(
                        "On the unit circle, what do the coordinates $(x, y)$ of a point at angle $\\theta$ represent?",
                        ["$x = \\cos\\theta$ and $y = \\sin\\theta$", "$x = \\sin\\theta$ and $y = \\cos\\theta$", "$x = \\tan\\theta$ and $y = \\cot\\theta$", "$x = r\\cos\\theta$ where $r > 1$"],
                        0,
                        "By definition of the unit circle ($r = 1$), the horizontal coordinate is $x = \\cos\\theta$ and the vertical coordinate is $y = \\sin\\theta$."
                    ),
                    make_q(
                        "Find the exact coordinates on the unit circle corresponding to $\\theta = \\frac{5\\pi}{6}$.",
                        ["$\\left(-\\frac{\\sqrt{3}}{2}, \\frac{1}{2}\\right)$", "$\\left(-\\frac{1}{2}, \\frac{\\sqrt{3}}{2}\\right)$", "$\\left(\\frac{\\sqrt{3}}{2}, -\\frac{1}{2}\\right)$", "$\\left(-\\frac{\\sqrt{2}}{2}, \\frac{\\sqrt{2}}{2}\\right)$"],
                        0,
                        "In Quadrant II: $x = \\cos(5\\pi/6) = -\\frac{\\sqrt{3}}{2}$, $y = \\sin(5\\pi/6) = \\frac{1}{2}$."
                    ),
                    make_q(
                        "Find the exact coordinates on the unit circle for $\\theta = \\frac{4\\pi}{3}$.",
                        ["$\\left(-\\frac{1}{2}, -\\frac{\\sqrt{3}}{2}\\right)$", "$\\left(-\\frac{\\sqrt{3}}{2}, -\\frac{1}{2}\\right)$", "$\\left(\\frac{1}{2}, -\\frac{\\sqrt{3}}{2}\\right)$", "$\\left(-\\frac{\\sqrt{2}}{2}, -\\frac{\\sqrt{2}}{2}\\right)$"],
                        0,
                        "In Quadrant III: $x = \\cos(4\\pi/3) = -1/2$, $y = \\sin(4\\pi/3) = -\\sqrt{3}/2$."
                    )
                ]
            },
            {
                "heading": "Section 2: Reference Angles and Signs by Quadrant",
                "questions": [
                    make_q(
                        "Find the reference angle $\\theta'$ for $\\theta = 225^\\circ$.",
                        ["$45^\\circ$", "$35^\\circ$", "$135^\\circ$", "$55^\\circ$"],
                        0,
                        "In Quadrant III: $\\theta' = \\theta - 180^\\circ = 225^\\circ - 180^\\circ = 45^\\circ$."
                    ),
                    make_q(
                        "In which quadrants is $\\tan\\theta$ positive?",
                        ["Quadrants I and III", "Quadrants I and II", "Quadrants I and IV", "Quadrants II and IV"],
                        0,
                        "$\\tan\\theta = y/x$. It is positive where $x$ and $y$ have the same sign: Quadrant I (both positive) and Quadrant III (both negative)."
                    ),
                    make_q(
                        "If $\\cos\\theta < 0$ and $\\sin\\theta > 0$, in which quadrant does the terminal ray of $\\theta$ lie?",
                        ["Quadrant II", "Quadrant I", "Quadrant III", "Quadrant IV"],
                        0,
                        "$x < 0$ and $y > 0$ defines Quadrant II."
                    )
                ]
            },
            {
                "heading": "Section 3: Exact Values of the Six Trig Functions",
                "questions": [
                    make_q(
                        "Find the exact value of $\\tan\\left(\\frac{2\\pi}{3}\\right)$.",
                        ["$-\\sqrt{3}$", "$\\sqrt{3}$", "$-\\frac{\\sqrt{3}}{3}$", "$-1$"],
                        0,
                        "Reference angle is $\\pi/3$. In Quadrant II, tangent is negative: $-\\tan(\\pi/3) = -\\sqrt{3}$."
                    ),
                    make_q(
                        "Find the exact value of $\\csc\\left(\\frac{7\\pi}{4}\\right)$.",
                        ["$-\\sqrt{2}$", "$\\sqrt{2}$", "$-\\frac{\\sqrt{2}}{2}$", "$-2$"],
                        0,
                        "$\\sin(7\\pi/4) = -\\frac{\\sqrt{2}}{2}$. Reciprocal gives $\\csc(7\\pi/4) = -\\frac{2}{\\sqrt{2}} = -\\sqrt{2}$."
                    ),
                    make_q(
                        "Evaluate $\\cos(3\\pi) - \\sin\\left(\\frac{3\\pi}{2}\\right)$.",
                        ["$0$", "$-2$", "$2$", "$1$"],
                        0,
                        "$\\cos(3\\pi) = \\cos(\\pi) = -1$. $\\sin(3\\pi/2) = -1$. Result $= -1 - (-1) = 0$."
                    )
                ]
            },
            {
                "heading": "Section 4: Quadrantal Angles and Negative Angles",
                "questions": [
                    make_q(
                        "Which of the following values is undefined?",
                        ["$\\tan(90^\\circ)$", "$\\sin(90^\\circ)$", "$\\cos(90^\\circ)$", "$\\cot(45^\\circ)$"],
                        0,
                        "$\\tan(90^\\circ) = \\frac{\\sin(90^\\circ)}{\\cos(90^\\circ)} = \\frac{1}{0}$, which is undefined."
                    ),
                    make_q(
                        "Evaluate $\\cos(-\\pi/3)$.",
                        ["$1/2$", "$-1/2$", "$\\sqrt{3}/2$", "$-\\sqrt{3}/2$"],
                        0,
                        "Cosine is an even function: $\\cos(-\\theta) = \\cos\\theta$. Thus $\\cos(-\\pi/3) = \\cos(\\pi/3) = 1/2$."
                    ),
                    make_q(
                        "Evaluate $\\sin(-\\pi/4)$.",
                        ["$-\\frac{\\sqrt{2}}{2}$", "$\\frac{\\sqrt{2}}{2}$", "$-1$", "$0$"],
                        0,
                        "Sine is an odd function: $\\sin(-\\theta) = -\\sin\\theta$. Thus $\\sin(-\\pi/4) = -\\frac{\\sqrt{2}}{2}$."
                    )
                ]
            }
        ]
    },

    # ── 3.02 Fundamental Trigonometric Identities ─────────────────────────────
    {
        "track": "precalc",
        "num": "3.02",
        "slug": "fundamental-trigonometric-identities",
        "title": "Fundamental Trigonometric Identities",
        "sections": [
            {
                "heading": "Section 1: Reciprocal and Quotient Identities",
                "questions": [
                    make_q(
                        "Simplify the expression $\\tan x \\cdot \\csc x$.",
                        ["$\\sec x$", "$\\cos x$", "$\\sin x$", "$\\cot x$"],
                        0,
                        "$\\tan x \\cdot \\csc x = \\frac{\\sin x}{\\cos x} \\cdot \\frac{1}{\\sin x} = \\frac{1}{\\cos x} = \\sec x$."
                    ),
                    make_q(
                        "Simplify $\\frac{\\cos x}{\\cot x}$.",
                        ["$\\sin x$", "$\\cos^2 x$", "$\\tan x$", "$\\csc x$"],
                        0,
                        "$\\frac{\\cos x}{\\cos x / \\sin x} = \\cos x \\cdot \\frac{\\sin x}{\\cos x} = \\sin x$."
                    ),
                    make_q(
                        "If $\\sin\\theta = -3/5$ and $\\tan\\theta > 0$, find $\\cos\\theta$.",
                        ["$-4/5$", "$4/5$", "$-3/4$", "$5/4$"],
                        0,
                        "$\\sin < 0$ and $\\tan > 0 \\Rightarrow$ Quadrant III. In QIII, $\\cos\\theta = -\\sqrt{1 - (-3/5)^2} = -\\sqrt{16/25} = -4/5$."
                    )
                ]
            },
            {
                "heading": "Section 2: Pythagorean Identities",
                "questions": [
                    make_q(
                        "Which identity is directly derived by dividing $\\sin^2\\theta + \\cos^2\\theta = 1$ by $\\cos^2\\theta$?",
                        ["$1 + \\tan^2\\theta = \\sec^2\\theta$", "$1 + \\cot^2\\theta = \\csc^2\\theta$", "$\\sin^2\\theta = 1 - \\cos^2\\theta$", "$\\tan^2\\theta + \\cot^2\\theta = 1$"],
                        0,
                        "$\\frac{\\sin^2\\theta}{\\cos^2\\theta} + \\frac{\\cos^2\\theta}{\\cos^2\\theta} = \\frac{1}{\\cos^2\\theta} \\Rightarrow \\tan^2\\theta + 1 = \\sec^2\\theta$."
                    ),
                    make_q(
                        "Simplify $(\\sec\\theta - 1)(\\sec\\theta + 1)$.",
                        ["$\\tan^2\\theta$", "$\\cot^2\\theta$", "$\\cos^2\\theta$", "$1$"],
                        0,
                        "Difference of squares: $\\sec^2\\theta - 1 = \\tan^2\\theta$."
                    ),
                    make_q(
                        "Simplify $\\frac{1 - \\cos^2 x}{\\sin x}$.",
                        ["$\\sin x$", "$\\cos x$", "$\\csc x$", "$1$"],
                        0,
                        "$\\frac{\\sin^2 x}{\\sin x} = \\sin x$."
                    )
                ]
            },
            {
                "heading": "Section 3: Even/Odd Identities and Symmetry",
                "questions": [
                    make_q(
                        "Which trigonometric functions are even functions ($f(-\\theta) = f(\\theta)$)?",
                        ["$\\cos\\theta$ and $\\sec\\theta$", "$\\sin\\theta$ and $\\csc\\theta$", "$\\tan\\theta$ and $\\cot\\theta$", "All six functions"],
                        0,
                        "Only cosine and its reciprocal secant are even: $\\cos(-\\theta) = \\cos\\theta$ and $\\sec(-\\theta) = \\sec\\theta$."
                    ),
                    make_q(
                        "Simplify $\\sin(-\\theta) \\cdot \\cot(-\\theta)$.",
                        ["$\\cos\\theta$", "$-\\cos\\theta$", "$\\sin\\theta$", "$-\\sin\\theta$"],
                        0,
                        "$\\sin(-\\theta) = -\\sin\\theta$ and $\\cot(-\\theta) = -\\cot\\theta$. Product $= (-\\sin\\theta)(-\\cot\\theta) = \\sin\\theta \\cdot \\frac{\\cos\\theta}{\\sin\\theta} = \\cos\\theta$."
                    ),
                    make_q(
                        "Simplify $\\frac{\\tan(-x)}{\\sin(-x)}$.",
                        ["$\\sec x$", "$-\\sec x$", "$\\cos x$", "$-\\cos x$"],
                        0,
                        "$\\frac{-\\tan x}{-\\sin x} = \\frac{\\tan x}{\\sin x} = \\frac{\\sin x / \\cos x}{\\sin x} = \\frac{1}{\\cos x} = \\sec x$."
                    )
                ]
            },
            {
                "heading": "Section 4: Verifying Identities Algebraically",
                "questions": [
                    make_q(
                        "Prove $\\frac{\\sin x}{1 + \\cos x} = \\frac{1 - \\cos x}{\\sin x}$. What technique verifies this algebraically?",
                        ["Multiply numerator and denominator of the left side by the conjugate $(1 - \\cos x)$", "Square both sides", "Take the derivative", "Cross multiply and set to 0"],
                        0,
                        "$\\frac{\\sin x(1 - \\cos x)}{(1 + \\cos x)(1 - \\cos x)} = \\frac{\\sin x(1 - \\cos x)}{1 - \\cos^2 x} = \\frac{\\sin x(1 - \\cos x)}{\\sin^2 x} = \\frac{1 - \\cos x}{\\sin x}$."
                    ),
                    make_q(
                        "Simplify $\\frac{\\sec x - \\cos x}{\\sin x}$.",
                        ["$\\tan x$", "$\\cot x$", "$\\sec x$", "$\\sin x$"],
                        0,
                        "$\\frac{1/\\cos x - \\cos x}{\\sin x} = \\frac{(1 - \\cos^2 x)/\\cos x}{\\sin x} = \\frac{\\sin^2 x}{\\cos x \\sin x} = \\frac{\\sin x}{\\cos x} = \\tan x$."
                    ),
                    make_q(
                        "Simplify $(1 + \\tan^2\\theta)(1 - \\sin^2\\theta)$.",
                        ["$1$", "$\\sec^2\\theta$", "$\\tan^2\\theta$", "$\\cos^2\\theta$"],
                        0,
                        "$(1 + \\tan^2\\theta) = \\sec^2\\theta$ and $(1 - \\sin^2\\theta) = \\cos^2\\theta$. Product $= \\sec^2\\theta \\cdot \\cos^2\\theta = 1$."
                    )
                ]
            }
        ]
    },

    # ── 3.03 Sum and Difference Formulas ──────────────────────────────────────
    {
        "track": "precalc",
        "num": "3.03",
        "slug": "sum-and-difference-formulas",
        "title": "Sum and Difference Formulas",
        "sections": [
            {
                "heading": "Section 1: Sine Sum and Difference Identities",
                "questions": [
                    make_q(
                        "State the formula for $\\sin(A + B)$.",
                        ["$\\sin A\\cos B + \\cos A\\sin B$", "$\\sin A\\cos B - \\cos A\\sin B$", "$\\cos A\\cos B - \\sin A\\sin B$", "$\\sin A + \\sin B$"],
                        0,
                        "The sine sum formula is $\\sin(A + B) = \\sin A\\cos B + \\cos A\\sin B$."
                    ),
                    make_q(
                        "Find the exact value of $\\sin(75^\\circ)$ using $75^\\circ = 45^\\circ + 30^\\circ$.",
                        ["$\\frac{\\sqrt{6} + \\sqrt{2}}{4}$", "$\\frac{\\sqrt{6} - \\sqrt{2}}{4}$", "$\\frac{\\sqrt{3} + 1}{2}$", "$\\frac{\\sqrt{2} + 1}{2}$"],
                        0,
                        "$\\sin(45^\\circ)\\cos(30^\\circ) + \\cos(45^\\circ)\\sin(30^\\circ) = \\left(\\frac{\\sqrt{2}}{2}\\right)\\left(\\frac{\\sqrt{3}}{2}\\right) + \\left(\\frac{\\sqrt{2}}{2}\\right)\\left(\\frac{1}{2}\\right) = \\frac{\\sqrt{6} + \\sqrt{2}}{4}$."
                    ),
                    make_q(
                        "Simplify $\\sin(x + \\pi)$.",
                        ["$-\\sin x$", "$\\sin x$", "$-\\cos x$", "$\\cos x$"],
                        0,
                        "$\\sin x\\cos\\pi + \\cos x\\sin\\pi = \\sin x(-1) + \\cos x(0) = -\\sin x$."
                    )
                ]
            },
            {
                "heading": "Section 2: Cosine Sum and Difference Identities",
                "questions": [
                    make_q(
                        "State the formula for $\\cos(A - B)$.",
                        ["$\\cos A\\cos B + \\sin A\\sin B$", "$\\cos A\\cos B - \\sin A\\sin B$", "$\\sin A\\sin B - \\cos A\\cos B$", "$\\cos A - \\cos B$"],
                        0,
                        "The cosine difference formula is $\\cos(A - B) = \\cos A\\cos B + \\sin A\\sin B$."
                    ),
                    make_q(
                        "Find the exact value of $\\cos(15^\\circ)$ using $15^\\circ = 45^\\circ - 30^\\circ$.",
                        ["$\\frac{\\sqrt{6} + \\sqrt{2}}{4}$", "$\\frac{\\sqrt{6} - \\sqrt{2}}{4}$", "$\\frac{\\sqrt{3} - 1}{4}$", "$\\frac{\\sqrt{2} + 1}{4}$"],
                        0,
                        "$\\cos(45^\\circ)\\cos(30^\\circ) + \\sin(45^\\circ)\\sin(30^\\circ) = \\frac{\\sqrt{2}}{2}\\frac{\\sqrt{3}}{2} + \\frac{\\sqrt{2}}{2}\\frac{1}{2} = \\frac{\\sqrt{6} + \\sqrt{2}}{4}$."
                    ),
                    make_q(
                        "Simplify $\\cos(x - \\pi/2)$.",
                        ["$\\sin x$", "$-\\sin x$", "$\\cos x$", "$-\\cos x$"],
                        0,
                        "$\\cos x\\cos(\\pi/2) + \\sin x\\sin(\\pi/2) = \\cos x(0) + \\sin x(1) = \\sin x$."
                    )
                ]
            },
            {
                "heading": "Section 3: Tangent Sum and Difference Identities",
                "questions": [
                    make_q(
                        "State the formula for $\\tan(A + B)$.",
                        ["$\\frac{\\tan A + \\tan B}{1 - \\tan A\\tan B}$", "$\\frac{\\tan A - \\tan B}{1 + \\tan A\\tan B}$", "$\\frac{\\tan A + \\tan B}{1 + \\tan A\\tan B}$", "$\\tan A + \\tan B$"],
                        0,
                        "The tangent sum formula is $\\tan(A + B) = \\frac{\\tan A + \\tan B}{1 - \\tan A\\tan B}$."
                    ),
                    make_q(
                        "If $\\tan A = 1/2$ and $\\tan B = 1/3$, find $\\tan(A + B)$.",
                        ["$1$", "$5/6$", "$5/7$", "$2/3$"],
                        0,
                        "$\\frac{1/2 + 1/3}{1 - (1/2)(1/3)} = \\frac{5/6}{1 - 1/6} = \\frac{5/6}{5/6} = 1$."
                    ),
                    make_q(
                        "Evaluate $\\frac{\\tan(80^\\circ) - \\tan(20^\\circ)}{1 + \\tan(80^\\circ)\\tan(20^\\circ)}$.",
                        ["$\\sqrt{3}$", "$1/\\sqrt{3}$", "$1$", "$0$"],
                        0,
                        "This matches the formula for $\\tan(80^\\circ - 20^\\circ) = \\tan(60^\\circ) = \\sqrt{3}$."
                    )
                ]
            },
            {
                "heading": "Section 4: Compound Angle Problems with Given Ratios",
                "questions": [
                    make_q(
                        "Given $\\sin\\alpha = 3/5$ (Quadrant I) and $\\cos\\beta = -5/13$ (Quadrant II), find $\\sin(\\alpha + \\beta)$.",
                        ["$33/65$", "$-33/65$", "$63/65$", "$-63/65$"],
                        0,
                        "$\\cos\\alpha = 4/5$. $\\sin\\beta = \\sqrt{1 - (-5/13)^2} = 12/13$. $\\sin(\\alpha+\\beta) = \\sin\\alpha\\cos\\beta + \\cos\\alpha\\sin\\beta = (3/5)(-5/13) + (4/5)(12/13) = -15/65 + 48/65 = 33/65$."
                    ),
                    make_q(
                        "For the same angles ($\\cos\\alpha = 4/5, \\sin\\alpha = 3/5, \\cos\\beta = -5/13, \\sin\\beta = 12/13$), find $\\cos(\\alpha + \\beta)$.",
                        ["$-56/65$", "$56/65$", "$-16/65$", "$16/65$"],
                        0,
                        "$\\cos(\\alpha+\\beta) = \\cos\\alpha\\cos\\beta - \\sin\\alpha\\sin\\beta = (4/5)(-5/13) - (3/5)(12/13) = -20/65 - 36/65 = -56/65$."
                    ),
                    make_q(
                        "In which quadrant does $\\alpha + \\beta$ lie in the previous problems?",
                        ["Quadrant II", "Quadrant I", "Quadrant III", "Quadrant IV"],
                        0,
                        "Since $\\cos(\\alpha+\\beta) = -56/65 < 0$ and $\\sin(\\alpha+\\beta) = 33/65 > 0$, the angle $\\alpha + \\beta$ terminates in Quadrant II."
                    )
                ]
            }
        ]
    },

    # ── 3.04 Double-Angle Formulas and Trigonometric Equations ────────────────
    {
        "track": "precalc",
        "num": "3.04",
        "slug": "double-angle-formulas-and-trigonometric-equations",
        "title": "Double-Angle Formulas and Trigonometric Equations",
        "sections": [
            {
                "heading": "Section 1: Double-Angle Formulas",
                "questions": [
                    make_q(
                        "State the double-angle formula for $\\sin(2\\theta)$.",
                        ["$2\\sin\\theta\\cos\\theta$", "$\\cos^2\\theta - \\sin^2\\theta$", "$2\\sin\\theta$", "$\\sin^2\\theta$"],
                        0,
                        "$\\sin(2\\theta) = \\sin(\\theta + \\theta) = \\sin\\theta\\cos\\theta + \\cos\\theta\\sin\\theta = 2\\sin\\theta\\cos\\theta$."
                    ),
                    make_q(
                        "Which of the following is NOT an equivalent form of $\\cos(2\\theta)$?",
                        ["$1 - 2\\cos^2\\theta$", "$\\cos^2\\theta - \\sin^2\\theta$", "$2\\cos^2\\theta - 1$", "$1 - 2\\sin^2\\theta$"],
                        0,
                        "The correct forms are $\\cos^2\\theta - \\sin^2\\theta$, $2\\cos^2\\theta - 1$, and $1 - 2\\sin^2\\theta$. $1 - 2\\cos^2\\theta = -\\cos(2\\theta)$."
                    ),
                    make_q(
                        "If $\\cos\\theta = 4/5$ with $\\theta$ in Quadrant IV, find $\\sin(2\\theta)$.",
                        ["$-24/25$", "$24/25$", "$-7/25$", "$7/25$"],
                        0,
                        "In QIV, $\\sin\\theta = -3/5$. $\\sin(2\\theta) = 2\\sin\\theta\\cos\\theta = 2(-3/5)(4/5) = -24/25$."
                    )
                ]
            },
            {
                "heading": "Section 2: Half-Angle and Power-Reducing Formulas",
                "questions": [
                    make_q(
                        "State the power-reducing formula for $\\sin^2 x$.",
                        ["$\\frac{1 - \\cos(2x)}{2}$", "$\\frac{1 + \\cos(2x)}{2}$", "$\\frac{1 - \\sin(2x)}{2}$", "$1 - \\cos^2 x$"],
                        0,
                        "From $\\cos(2x) = 1 - 2\\sin^2 x$, solving for $\\sin^2 x$ gives $\\sin^2 x = \\frac{1 - \\cos(2x)}{2}$."
                    ),
                    make_q(
                        "Find the exact value of $\\cos(22.5^\\circ)$ using the half-angle formula $\\cos(\\theta/2) = \\sqrt{\\frac{1 + \\cos\\theta}{2}}$.",
                        ["$\\frac{\\sqrt{2 + \\sqrt{2}}}{2}$", "$\\frac{\\sqrt{2 - \\sqrt{2}}}{2}$", "$\\frac{\\sqrt{2} + 1}{2}$", "$\\frac{\\sqrt{3} + 1}{2}$"],
                        0,
                        "$\\cos(45^\\circ/2) = \\sqrt{\\frac{1 + \\sqrt{2}/2}{2}} = \\sqrt{\\frac{2 + \\sqrt{2}}{4}} = \\frac{\\sqrt{2 + \\sqrt{2}}}{2}$."
                    ),
                    make_q(
                        "Rewrite $\\cos^4 x$ in terms of first powers of cosines of multiple angles.",
                        ["$\\frac{3}{8} + \\frac{1}{2}\\cos(2x) + \\frac{1}{8}\\cos(4x)$", "$\\frac{1}{4}(1 + \\cos(2x))^2$", "$\\frac{1}{2} + \\frac{1}{2}\\cos(4x)$", "$\\frac{3}{8} - \\frac{1}{2}\\cos(2x)$"],
                        0,
                        "$\\left(\\frac{1 + \\cos 2x}{2}\\right)^2 = \\frac{1 + 2\\cos 2x + \\cos^2 2x}{4} = \\frac{1 + 2\\cos 2x + (1 + \\cos 4x)/2}{4} = \\frac{3}{8} + \\frac{1}{2}\\cos(2x) + \\frac{1}{8}\\cos(4x)$."
                    )
                ]
            },
            {
                "heading": "Section 3: Solving Linear Trigonometric Equations",
                "questions": [
                    make_q(
                        "Solve $2\\sin x - 1 = 0$ on the interval $[0, 2\\pi)$.",
                        ["$\\frac{\\pi}{6}$ and $\\frac{5\\pi}{6}$", "$\\frac{\\pi}{3}$ and $\\frac{2\\pi}{3}$", "$\\frac{\\pi}{6}$ and $\\frac{11\\pi}{6}$", "$\\frac{5\\pi}{6}$ and $\\frac{7\\pi}{6}$"],
                        0,
                        "$\\sin x = 1/2$. On $[0, 2\\pi)$, sine is positive in Quadrants I and II at $x = \\pi/6$ and $5\\pi/6$."
                    ),
                    make_q(
                        "Solve $\\sqrt{3}\\tan x + 1 = 0$ on $[0, 2\\pi)$.",
                        ["$\\frac{5\\pi}{6}$ and $\\frac{11\\pi}{6}$", "$\\frac{2\\pi}{3}$ and $\\frac{5\\pi}{3}$", "$\\frac{\\pi}{6}$ and $\\frac{7\\pi}{6}$", "$\\frac{5\\pi}{6}$ and $\\frac{7\\pi}{6}$"],
                        0,
                        "$\\tan x = -1/\\sqrt{3}$. Tangent is negative in Quadrants II and IV at $x = 5\\pi/6$ and $11\\pi/6$."
                    ),
                    make_q(
                        "Find all solutions to $\\cos(2x) = 0$ on $[0, \\pi)$.",
                        ["$\\frac{\\pi}{4}$ and $\\frac{3\\pi}{4}$", "$\\frac{\\pi}{2}$", "$\\frac{\\pi}{4}$ only", "$\\frac{\\pi}{2}$ and $\\frac{3\\pi}{2}$"],
                        0,
                        "$2x = \\frac{\\pi}{2} + k\\pi \\Rightarrow x = \\frac{\\pi}{4} + \\frac{k\\pi}{2}$. On $[0, \\pi)$, solutions are $\\pi/4$ and $3\\pi/4$."
                    )
                ]
            },
            {
                "heading": "Section 4: Quadratic-Type and Multiple-Angle Equations",
                "questions": [
                    make_q(
                        "Solve $2\\sin^2 x - \\sin x - 1 = 0$ on $[0, 2\\pi)$.",
                        ["$\\frac{\\pi}{2}, \\frac{7\\pi}{6}, \\frac{11\\pi}{6}$", "$\\frac{\\pi}{6}, \\frac{5\\pi}{6}, \\frac{3\\pi}{2}$", "$\\frac{\\pi}{2}, \\frac{5\\pi}{6}$", "$\\frac{\\pi}{3}, \\frac{5\\pi}{3}$"],
                        0,
                        "Factor: $(2\\sin x + 1)(\\sin x - 1) = 0$. $\\sin x = 1 \\Rightarrow x = \\pi/2$. $\\sin x = -1/2 \\Rightarrow x = 7\\pi/6, 11\\pi/6$."
                    ),
                    make_q(
                        "Solve $\\sin(2x) = \\cos x$ on $[0, 2\\pi)$.",
                        ["$\\frac{\\pi}{6}, \\frac{\\pi}{2}, \\frac{5\\pi}{6}, \\frac{3\\pi}{2}$", "$\\frac{\\pi}{6}, \\frac{5\\pi}{6}$", "$\\frac{\\pi}{3}, \\frac{2\\pi}{3}$", "$\\frac{\\pi}{2}, \\frac{3\\pi}{2}$"],
                        0,
                        "$2\\sin x\\cos x - \\cos x = 0 \\Rightarrow \\cos x(2\\sin x - 1) = 0$. $\\cos x = 0 \\Rightarrow x = \\pi/2, 3\\pi/2$. $\\sin x = 1/2 \\Rightarrow x = \\pi/6, 5\\pi/6$."
                    ),
                    make_q(
                        "Solve $\\cos(2x) + \\cos x = 0$ on $[0, 2\\pi)$.",
                        ["$\\frac{\\pi}{3}, \\pi, \\frac{5\\pi}{3}$", "$\\frac{\\pi}{6}, \\pi, \\frac{11\\pi}{6}$", "$\\frac{\\pi}{2}, \\frac{3\\pi}{2}$", "$\\frac{\\pi}{3}, \\frac{2\\pi}{3}$"],
                        0,
                        "$2\\cos^2 x - 1 + \\cos x = 0 \\Rightarrow (2\\cos x - 1)(\\cos x + 1) = 0$. $\\cos x = 1/2 \\Rightarrow x = \\pi/3, 5\\pi/3$. $\\cos x = -1 \\Rightarrow x = \\pi$."
                    )
                ]
            }
        ]
    }
]
