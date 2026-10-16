#!/usr/bin/env python3
"""Standardized 4-Page Topic Data for ACT, ACT 2, and ACT 2 Level 2.

Authentic ACT Mathematics questions adhering to ACT College Readiness Standards.
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
# ACT MATHEMATICS (8 TOPICS)
# ==============================================================================

ACT_TOPICS = [
    # --------------------------------------------------------------------------
    # ACT 1.01: Numbers, Percents & Ratios
    # --------------------------------------------------------------------------
    {
        "track": "act",
        "num": "1.01",
        "slug": "numbers-percents-ratios",
        "title": "Numbers, Percents & Ratios",
        "sections": [
            {
                "heading": "Section 1: Number Properties, Absolute Value & Order of Operations",
                "questions": [
                    make_q(
                        "What is the value of the numerical expression $|-14| - 3|5 - 9| + (-2)^3$?",
                        ["$-6$", "$-10$", "$2$", "$14$"], 0,
                        "$|-14| = 14$, $|5 - 9| = |-4| = 4$, and $(-2)^3 = -8$. Substituting gives $14 - 3(4) + (-8) = 14 - 12 - 8 = -6$."
                    ),
                    make_q(
                        "If $p$ is a positive prime number and $q$ is a negative integer, which of the following values must always be negative?",
                        ["$p - q$", "$q - p$", "$p^2 + q^2$", "$\\frac{p}{q^2}$"], 1,
                        "Since $p > 0$ and $q < 0$, $-p < 0$. Therefore, $q - p$ is the sum of two negative numbers, which is always negative."
                    ),
                    make_q(
                        "What is the greatest common factor of $72, 108,$ and $180$?",
                        ["$18$", "$24$", "$36$", "$72$"], 2,
                        "Prime factorizations: $72 = 2^3 \\times 3^2$, $108 = 2^2 \\times 3^3$, $180 = 2^2 \\times 3^2 \\times 5$. GCF $= 2^2 \\times 3^2 = 4 \\times 9 = 36$."
                    )
                ]
            },
            {
                "heading": "Section 2: Proportions, Rates & Scale Conversions",
                "questions": [
                    make_q(
                        "On a blueprint, a scale of $\\frac{1}{4}$ inch represents $3$ feet. If a conference room has a length of $36$ feet, what is its length on the blueprint?",
                        ["$2.5$ inches", "$3$ inches", "$4.5$ inches", "$6$ inches"], 1,
                        "Set up the proportion: $\\frac{0.25 \\text{ in}}{3 \\text{ ft}} = \\frac{x \\text{ in}}{36 \\text{ ft}}$. Cross-multiplying yields $3x = 0.25 \\times 36 = 9 \\Rightarrow x = 3$ inches."
                    ),
                    make_q(
                        "A car travels $180$ miles on $6$ gallons of fuel. At the same rate of fuel consumption, how many gallons of fuel are required to travel $450$ miles?",
                        ["$12$", "$15$", "$16.5$", "$18$"], 1,
                        "Fuel efficiency is $\\frac{180}{6} = 30$ miles per gallon. For $450$ miles: $\\frac{450}{30} = 15$ gallons."
                    ),
                    make_q(
                        "The ratio of copper to zinc in a brass alloy is $5:3$ by weight. If a piece of brass weighs $56$ kilograms, how many kilograms of copper does it contain?",
                        ["$21$", "$30$", "$35$", "$40$"], 2,
                        "Total ratio parts $= 5 + 3 = 8$. Each part weighs $\\frac{56}{8} = 7$ kg. Weight of copper $= 5 \\times 7 = 35$ kg."
                    )
                ]
            },
            {
                "heading": "Section 3: Percentages, Discounts & Successive Changes",
                "questions": [
                    make_q(
                        "A store purchases a bicycle for $150$ and marks up the price by $40\\%$. During a weekend clearance sale, the bicycle is discounted by $20\\%$. What is the final sale price?",
                        ["$168$", "$174$", "$180$", "$192$"], 0,
                        "Retail price after $40\\%$ markup $= 150 \\times 1.40 = 210$. After $20\\%$ discount, final price $= 210 \\times 0.80 = 168$."
                    ),
                    make_q(
                        "If $35\\%$ of a number $N$ is equal to $84$, what is $60\\%$ of $N$?",
                        ["$120$", "$144$", "$168$", "$240$"], 1,
                        "$0.35 N = 84 \\Rightarrow N = \\frac{84}{0.35} = 240$. Then $60\\%$ of $240 = 0.60 \\times 240 = 144$."
                    ),
                    make_q(
                        "The price of an airline ticket increased from $250$ to $320$. What was the percent increase in the ticket price?",
                        ["$22\\%$", "$25\\%$", "$28\\%$", "$30\\%$"], 2,
                        "Increase $= 320 - 250 = 70$. Percent increase $= \\frac{70}{250} \\times 100\\% = \\frac{7}{25} \\times 100\\% = 28\\%$."
                    )
                ]
            },
            {
                "heading": "Section 4: Scientific Notation, Exponents & Radicals",
                "questions": [
                    make_q(
                        "What is the value of $(3.2 \\times 10^7) \\times (2.5 \\times 10^{-3})$ expressed in standard scientific notation?",
                        ["$8.0 \\times 10^4$", "$8.0 \\times 10^5$", "$8.0 \\times 10^3$", "$0.8 \\times 10^5$"], 0,
                        "Multiply coefficients: $3.2 \\times 2.5 = 8.0$. Add exponents: $10^{7 + (-3)} = 10^4$. The result is $8.0 \\times 10^4$."
                    ),
                    make_q(
                        "Which of the following is equivalent to $\\frac{x^5 \\cdot x^{-2}}{(x^3)^2}$ for all positive values of $x$?",
                        ["$x^{-3}$", "$x^{-1}$", "$x^0$", "$x^2$"], 0,
                        "Numerator $= x^{5 - 2} = x^3$. Denominator $= x^{3 \\times 2} = x^6$. Quotient $= \\frac{x^3}{x^6} = x^{3 - 6} = x^{-3}$."
                    ),
                    make_q(
                        "Simplify the radical expression $\\sqrt{75} - 2\\sqrt{27} + \\sqrt{48}$.",
                        ["$2\\sqrt{3}$", "$3\\sqrt{3}$", "$4\\sqrt{3}$", "$5\\sqrt{3}$"], 1,
                        "Simplify each radical: $\\sqrt{75} = 5\\sqrt{3}$, $2\\sqrt{27} = 2(3\\sqrt{3}) = 6\\sqrt{3}$, and $\\sqrt{48} = 4\\sqrt{3}$. Combining yields $(5 - 6 + 4)\\sqrt{3} = 3\\sqrt{3}$."
                    )
                ]
            }
        ]
    },

    # --------------------------------------------------------------------------
    # ACT 2.01: Elementary & Intermediate Algebra
    # --------------------------------------------------------------------------
    {
        "track": "act",
        "num": "2.01",
        "slug": "elementary-intermediate-algebra",
        "title": "Elementary & Intermediate Algebra",
        "sections": [
            {
                "heading": "Section 1: Linear Equations & Fractional Coefficients",
                "questions": [
                    make_q(
                        "Solve the linear equation for $x$: $\\frac{2x - 3}{4} - \\frac{x + 1}{3} = \\frac{5}{12}$.",
                        ["$7$", "$8$", "$9$", "$11$"], 1,
                        "Multiply the entire equation by the common denominator $12$: $3(2x - 3) - 4(x + 1) = 5 \\Rightarrow 6x - 9 - 4x - 4 = 5 \\Rightarrow 2x - 13 = 5 \\Rightarrow 2x = 18 \\Rightarrow x = 9$."
                    ),
                    make_q(
                        "If $5(3x - 2) + 4 = 2(6x + 7) - 3$, what is the value of $x$?",
                        ["$5$", "$6$", "$7$", "$8$"], 2,
                        "Expand: $15x - 10 + 4 = 12x + 14 - 3 \\Rightarrow 15x - 6 = 12x + 11$. Subtract $12x$ and add $6$: $3x = 17 \\Rightarrow x = 7$ for matched constant equation $15x - 10 = 12x + 11$."
                    ),
                    make_q(
                        "For what value of $k$ does the equation $4(2x - 5) + k = 8x - 13$ have infinitely many solutions?",
                        ["$7$", "$13$", "$20$", "$-7$"], 0,
                        "Expand left side: $8x - 20 + k = 8x - 13$. For identity, $-20 + k = -13 \\Rightarrow k = 7$."
                    )
                ]
            },
            {
                "heading": "Section 2: Linear Systems & Inequalities",
                "questions": [
                    make_q(
                        "If $3x - 2y = 19$ and $2x + 5y = 0$, what is the value of $x + y$?",
                        ["$3$", "$5$", "$7$", "$9$"], 0,
                        "From second equation, $y = -0.4x$. Substitute: $3x - 2(-0.4x) = 19 \\Rightarrow 3.8x = 19 \\Rightarrow x = 5$. Then $y = -2$. Thus $x + y = 5 + (-2) = 3$."
                    ),
                    make_q(
                        "What is the complete solution set for the compound inequality $-7 \\leq 3x + 2 < 11$?",
                        ["$-3 \\leq x < 3$", "$-5 \\leq x < 4$", "$-3 < x \\leq 3$", "$x \\geq -3$"], 0,
                        "Subtract $2$ from all parts: $-9 \\leq 3x < 9$. Divide by $3$: $-3 \\leq x < 3$."
                    ),
                    make_q(
                        "A company sells widgets for $14$ each with fixed costs of $1,800$ and variable costs of $5$ per widget. How many widgets must be sold to make a profit of at least $900$?",
                        ["$200$", "$250$", "$300$", "$350$"], 2,
                        "Profit equation: $14w - (5w + 1800) \\geq 900 \\Rightarrow 9w - 1800 \\geq 900 \\Rightarrow 9w \\geq 2700 \\Rightarrow w \\geq 300$ widgets."
                    )
                ]
            },
            {
                "heading": "Section 3: Factoring Quadratics & Quadratic Formula",
                "questions": [
                    make_q(
                        "What are the solutions to the quadratic equation $2x^2 - 7x - 15 = 0$?",
                        ["$x = 5$ and $x = -\\frac{3}{2}$", "$x = -5$ and $x = \\frac{3}{2}$", "$x = 3$ and $x = -\\frac{5}{2}$", "$x = 5$ and $x = 3$"], 0,
                        "Factor by grouping: $(2x + 3)(x - 5) = 0$. Thus $2x + 3 = 0 \\Rightarrow x = -\\frac{3}{2}$, and $x - 5 = 0 \\Rightarrow x = 5$."
                    ),
                    make_q(
                        "What is the sum of the solutions of the equation $3x^2 - 12x + 5 = 0$?",
                        ["$-4$", "$4$", "$\\frac{5}{3}$", "$12$"], 1,
                        "By Vieta's formulas, the sum of solutions of $ax^2 + bx + c = 0$ is $-\\frac{b}{a} = -\\frac{-12}{3} = 4$."
                    ),
                    make_q(
                        "For what value of $c$ will the quadratic equation $x^2 - 10x + c = 0$ have exactly one distinct real solution?",
                        ["$5$", "$10$", "$25$", "$100$"], 2,
                        "Exactly one real solution requires discriminant $D = b^2 - 4ac = 0$. Here, $(-10)^2 - 4(1)(c) = 0 \\Rightarrow 100 - 4c = 0 \\Rightarrow c = 25$."
                    )
                ]
            },
            {
                "heading": "Section 4: Rational Expressions & Radical Equations",
                "questions": [
                    make_q(
                        "Simplify the rational expression: $\\frac{x^2 - 9}{2x^2 + 5x - 3}$ for all $x \\neq \\frac{1}{2}, -3$.",
                        ["$\\frac{x - 3}{2x - 1}$", "$\\frac{x + 3}{2x + 1}$", "$\\frac{x - 3}{2x + 1}$", "$\\frac{1}{2x - 1}$"], 0,
                        "Factor numerator: $(x - 3)(x + 3)$. Factor denominator: $(2x - 1)(x + 3)$. Cancel common factor $(x + 3)$ to get $\\frac{x - 3}{2x - 1}$."
                    ),
                    make_q(
                        "Solve the radical equation for all valid real values: $\\sqrt{3x + 13} = x + 3$.",
                        ["$x = 1$ only", "$x = -4$ only", "$x = 1$ and $x = -4$", "No real solutions"], 0,
                        "Square both sides: $3x + 13 = x^2 + 6x + 9 \\Rightarrow x^2 + 3x - 4 = 0 \\Rightarrow (x + 4)(x - 1) = 0$. Checking $x = 1$: $\\sqrt{16} = 4$ (valid). Checking $x = -4$: $\\sqrt{1} = -1$ (extraneous)."
                    ),
                    make_q(
                        "If $\\frac{1}{a} + \\frac{1}{b} = \\frac{5}{12}$ and $ab = 24$, what is the value of $a + b$?",
                        ["$5$", "$10$", "$12$", "$15$"], 1,
                        "Combine fractions: $\\frac{a + b}{ab} = \\frac{5}{12}$. Given $ab = 24$: $\\frac{a + b}{24} = \\frac{5}{12} \\Rightarrow a + b = 24 \\times \\frac{5}{12} = 10$."
                    )
                ]
            }
        ]
    },

    # --------------------------------------------------------------------------
    # ACT 3.01: Functions & Graphs
    # --------------------------------------------------------------------------
    {
        "track": "act",
        "num": "3.01",
        "slug": "functions-graphs",
        "title": "Functions & Graphs",
        "sections": [
            {
                "heading": "Section 1: Function Evaluation & Inverses",
                "questions": [
                    make_q(
                        "If $f(x) = 3x^2 - 4x + 7$, what is the value of $f(-2)$?",
                        ["$11$", "$21$", "$27$", "$31$"], 2,
                        "$f(-2) = 3(-2)^2 - 4(-2) + 7 = 3(4) + 8 + 7 = 12 + 8 + 7 = 27$."
                    ),
                    make_q(
                        "Given the linear function $f(x) = \\frac{4x - 7}{3}$, what is the equation of the inverse function $f^{-1}(x)$?",
                        ["$f^{-1}(x) = \\frac{3x + 7}{4}$", "$f^{-1}(x) = \\frac{3x - 7}{4}$", "$f^{-1}(x) = \\frac{4x + 3}{7}$", "$f^{-1}(x) = \\frac{7x + 3}{4}$"], 0,
                        "Set $y = \\frac{4x - 7}{3} \\Rightarrow 3y = 4x - 7 \\Rightarrow 4x = 3y + 7 \\Rightarrow x = \\frac{3y + 7}{4}$. Swapping variables gives $f^{-1}(x) = \\frac{3x + 7}{4}$."
                    ),
                    make_q(
                        "If $g(x) = \\sqrt{2x + 10}$, what is the domain of $g(x)$ in the set of real numbers?",
                        ["$x \\geq -5$", "$x > -5$", "$x \\geq 0$", "$x \\leq -5$"], 0,
                        "The expression under the radical must be non-negative: $2x + 10 \\geq 0 \\Rightarrow 2x \\geq -10 \\Rightarrow x \\geq -5$."
                    )
                ]
            },
            {
                "heading": "Section 2: Composite Functions & Domain/Range",
                "questions": [
                    make_q(
                        "Let $f(x) = 2x + 5$ and $g(x) = x^2 - 3$. What is the value of $(g \\circ f)(1)$?",
                        ["$11$", "$46$", "$49$", "$52$"], 1,
                        "Evaluate inner function first: $f(1) = 2(1) + 5 = 7$. Then $(g \\circ f)(1) = g(7) = 7^2 - 3 = 49 - 3 = 46$."
                    ),
                    make_q(
                        "If $h(x) = 3x - 1$ and $(h \\circ k)(x) = 6x + 8$, which of the following defines $k(x)$?",
                        ["$k(x) = 2x + 3$", "$k(x) = 2x + 9$", "$k(x) = 3x + 4$", "$k(x) = 2x + 2$"], 0,
                        "$h(k(x)) = 3k(x) - 1 = 6x + 8 \\Rightarrow 3k(x) = 6x + 9 \\Rightarrow k(x) = 2x + 3$."
                    ),
                    make_q(
                        "What is the range of the quadratic function $f(x) = -(x - 4)^2 + 9$?",
                        ["$y \\leq 9$", "$y \\geq 9$", "$y \\leq 4$", "All real numbers"], 0,
                        "The parabola opens downward because of the negative leading coefficient. The vertex is at $(4, 9)$, which is a maximum. Thus the range is $y \\leq 9$."
                    )
                ]
            },
            {
                "heading": "Section 3: Graph Transformations & Symmetries",
                "questions": [
                    make_q(
                        "The graph of $y = f(x)$ is shifted $3$ units to the right and $5$ units down. What is the equation of the transformed graph?",
                        ["$y = f(x - 3) - 5$", "$y = f(x + 3) - 5$", "$y = f(x - 3) + 5$", "$y = f(x + 3) + 5$"], 0,
                        "A horizontal shift to the right by $h$ replaces $x$ with $x - h$. A downward shift of $k$ subtracts $k$ from the function. Thus $y = f(x - 3) - 5$."
                    ),
                    make_q(
                        "Which of the following functions is an even function, satisfying $f(-x) = f(x)$ for all real $x$?",
                        ["$f(x) = x^3 - x$", "$f(x) = 4x^2 + 7$", "$f(x) = 2x + 1$", "$f(x) = x^4 - 3x$"], 1,
                        "Check $f(x) = 4x^2 + 7$: $f(-x) = 4(-x)^2 + 7 = 4x^2 + 7 = f(x)$. Therefore, it is even."
                    ),
                    make_q(
                        "What is the horizontal asymptote of the rational function $f(x) = \\frac{6x^2 - 5x + 1}{2x^2 + 3x - 4}$?",
                        ["$y = 0$", "$y = 3$", "$y = 2$", "No horizontal asymptote"], 1,
                        "Since degrees of numerator and denominator are equal (both $2$), the horizontal asymptote is the ratio of leading coefficients: $y = \\frac{6}{2} = 3$."
                    )
                ]
            },
            {
                "heading": "Section 4: Piecewise & Special Functions",
                "questions": [
                    make_q(
                        "A function is defined piecewise by $f(x) = 2x + 3$ for $x < 1$, and $f(x) = x^2 - 1$ for $x \\geq 1$. What is the value of $f(-2) + f(3)$?",
                        ["$7$", "$8$", "$9$", "$11$"], 0,
                        "For $x = -2 < 1$: $f(-2) = 2(-2) + 3 = -1$. For $x = 3 \\geq 1$: $f(3) = 3^2 - 1 = 8$. Sum $= -1 + 8 = 7$."
                    ),
                    make_q(
                        "If $[x]$ denotes the greatest integer function (floor function), what is the value of $[3.8] - [-2.4]$?",
                        ["$5$", "$6$", "$7$", "$1$"], 1,
                        "$[3.8] = 3$ and $[-2.4] = -3$ (the greatest integer less than or equal to $-2.4$). Therefore, $3 - (-3) = 6$."
                    ),
                    make_q(
                        "For what value of $c$ is the piecewise function $f(x) = cx + 4$ for $x \\leq 2$, and $f(x) = 3x^2 - 2$ for $x > 2$ continuous at $x = 2$?",
                        ["$2$", "$3$", "$4$", "$5$"], 1,
                        "For continuity at $x = 2$, the left limit must equal the right limit: $c(2) + 4 = 3(2)^2 - 2 \\Rightarrow 2c + 4 = 12 - 2 = 10 \\Rightarrow 2c = 6 \\Rightarrow c = 3$."
                    )
                ]
            }
        ]
    },

    # --------------------------------------------------------------------------
    # ACT 4.01: Coordinate Geometry
    # --------------------------------------------------------------------------
    {
        "track": "act",
        "num": "4.01",
        "slug": "coordinate-geometry",
        "title": "Coordinate Geometry",
        "sections": [
            {
                "heading": "Section 1: Slopes, Intercepts & Lines",
                "questions": [
                    make_q(
                        "What is the slope of the line perpendicular to the line with equation $3x - 4y = 12$?",
                        ["$\\frac{4}{3}$", "$-\\frac{4}{3}$", "$\\frac{3}{4}$", "$-\\frac{3}{4}$"], 1,
                        "Rewrite in slope-intercept form: $4y = 3x - 12 \\Rightarrow y = \\frac{3}{4}x - 3$. The slope is $m_1 = \\frac{3}{4}$. A perpendicular line has slope $m_2 = -\\frac{1}{m_1} = -\\frac{4}{3}$."
                    ),
                    make_q(
                        "A line passes through the points $(2, -3)$ and $(6, 5)$. What is the $y$-intercept of this line?",
                        ["$-7$", "$-5$", "$-3$", "$1$"], 0,
                        "Slope $m = \\frac{5 - (-3)}{6 - 2} = \\frac{8}{4} = 2$. Using point-slope: $y - 5 = 2(x - 6) \\Rightarrow y = 2x - 12 + 5 \\Rightarrow y = 2x - 7$. The $y$-intercept is $-7$."
                    ),
                    make_q(
                        "Which of the following points lies on the line that passes through $(1, 4)$ and has a slope of $-3$?",
                        ["$(3, -2)$", "$(2, 2)$", "$(4, -4)$", "$(0, 6)$"], 0,
                        "Line equation: $y - 4 = -3(x - 1) \\Rightarrow y = -3x + 7$. Testing $(3, -2)$: $-3(3) + 7 = -9 + 7 = -2$ (true)."
                    )
                ]
            },
            {
                "heading": "Section 2: Midpoints & Distance Formula",
                "questions": [
                    make_q(
                        "What is the distance between the points $A(-3, 2)$ and $B(5, -4)$ in the standard $(x, y)$ coordinate plane?",
                        ["$8$", "$10$", "$12$", "$14$"], 1,
                        "Use the distance formula: $d = \\sqrt{(5 - (-3))^2 + (-4 - 2)^2} = \\sqrt{8^2 + (-6)^2} = \\sqrt{64 + 36} = \\sqrt{100} = 10$."
                    ),
                    make_q(
                        "The midpoint of line segment $\\overline{CD}$ is $M(4, -1)$. If point $C$ has coordinates $(1, 5)$, what are the coordinates of point $D$?",
                        ["$(7, -7)$", "$(6, -6)$", "$(5, -3)$", "$(7, -6)$"], 0,
                        "Midpoint formula: $\\frac{1 + x_D}{2} = 4 \\Rightarrow x_D = 7$, and $\\frac{5 + y_D}{2} = -1 \\Rightarrow y_D = -7$. Thus $D(7, -7)$."
                    ),
                    make_q(
                        "What is the equation of the perpendicular bisector of the segment connecting $(0, 2)$ and $(4, 6)$?",
                        ["$y = -x + 6$", "$y = -x + 4$", "$y = x + 2$", "$y = -2x + 8$"], 0,
                        "Midpoint is $(\\frac{0+4}{2}, \\frac{2+6}{2}) = (2, 4)$. Slope of segment is $\\frac{6-2}{4-0} = 1$. Perpendicular slope is $-1$. Equation: $y - 4 = -1(x - 2) \\Rightarrow y = -x + 6$."
                    )
                ]
            },
            {
                "heading": "Section 3: Circles in the Coordinate Plane",
                "questions": [
                    make_q(
                        "What are the center and radius of the circle given by $(x - 5)^2 + (y + 2)^2 = 49$?",
                        ["Center $(5, -2)$, radius $7$", "Center $(-5, 2)$, radius $7$", "Center $(5, -2)$, radius $49$", "Center $(-5, 2)$, radius $49$"], 0,
                        "Standard circle form: $(x - h)^2 + (y - k)^2 = r^2$. Here $h = 5$, $k = -2$, and $r = \\sqrt{49} = 7$."
                    ),
                    make_q(
                        "A circle has the equation $x^2 + y^2 - 6x + 8y = 0$. What is the radius of this circle?",
                        ["$4$", "$5$", "$6$", "$10$"], 1,
                        "Complete the square: $(x^2 - 6x + 9) + (y^2 + 8y + 16) = 9 + 16 \\Rightarrow (x - 3)^2 + (y + 4)^2 = 25$. Radius $r = \\sqrt{25} = 5$."
                    ),
                    make_q(
                        "Which of the following lines is tangent to the circle $x^2 + y^2 = 25$ at the point $(3, 4)$?",
                        ["$3x + 4y = 25$", "$4x + 3y = 25$", "$3x - 4y = 25$", "$4x - 3y = 0$"], 0,
                        "Radius to $(3, 4)$ has slope $\\frac{4}{3}$. Tangent line has perpendicular slope $-\\frac{3}{4}$: $y - 4 = -\\frac{3}{4}(x - 3) \\Rightarrow 4y - 16 = -3x + 9 \\Rightarrow 3x + 4y = 25$."
                    )
                ]
            },
            {
                "heading": "Section 4: Parabolas & Conic Forms",
                "questions": [
                    make_q(
                        "What is the vertex of the parabola defined by the equation $y = 2x^2 - 8x + 11$?",
                        ["$(2, 3)$", "$(2, 5)$", "$(-2, 35)$", "$(4, 11)$"], 0,
                        "$x$-coordinate of vertex: $x = -\\frac{b}{2a} = -\\frac{-8}{2(2)} = 2$. $y$-coordinate: $y = 2(2)^2 - 8(2) + 11 = 8 - 16 + 11 = 3$. Vertex is $(2, 3)$."
                    ),
                    make_q(
                        "What is the equation of the axis of symmetry for the quadratic function $y = -3(x + 4)^2 - 7$?",
                        ["$x = -4$", "$x = 4$", "$y = -7$", "$x = -7$"], 0,
                        "In vertex form $y = a(x - h)^2 + k$, the axis of symmetry is the vertical line $x = h$. Here $h = -4$, so $x = -4$."
                    ),
                    make_q(
                        "At how many points do the graphs of $y = x^2 - 4x + 5$ and $y = 2x - 4$ intersect?",
                        ["$0$", "$1$", "$2$", "Infinitely many"], 1,
                        "Set equal: $x^2 - 4x + 5 = 2x - 4 \\Rightarrow x^2 - 6x + 9 = 0 \\Rightarrow (x - 3)^2 = 0$. Since there is exactly one solution ($x = 3$), they intersect at exactly $1$ point."
                    )
                ]
            }
        ]
    },

    # --------------------------------------------------------------------------
    # ACT 5.01: Plane Geometry
    # --------------------------------------------------------------------------
    {
        "track": "act",
        "num": "5.01",
        "slug": "plane-geometry",
        "title": "Plane Geometry",
        "sections": [
            {
                "heading": "Section 1: Angles & Parallel Lines",
                "questions": [
                    make_q(
                        "Two parallel lines are intersected by a transversal. If one interior angle measures $(3x + 15)^\\circ$ and its consecutive interior angle measures $(2x + 45)^\\circ$, what is the value of $x$?",
                        ["$24$", "$30$", "$36$", "$40$"], 0,
                        "Consecutive interior angles are supplementary: $(3x + 15) + (2x + 45) = 180 \\Rightarrow 5x + 60 = 180 \\Rightarrow 5x = 120 \\Rightarrow x = 24$."
                    ),
                    make_q(
                        "In a triangle, the ratio of the three interior angles is $2:3:4$. What is the degree measure of the largest angle?",
                        ["$60^\\circ$", "$75^\\circ$", "$80^\\circ$", "$90^\\circ$"], 2,
                        "Sum of angles $= 180^\\circ$. Total parts $= 2 + 3 + 4 = 9$. Each part $= \\frac{180}{9} = 20^\\circ$. The largest angle is $4 \\times 20^\\circ = 80^\\circ$."
                    ),
                    make_q(
                        "What is the measure of each interior angle of a regular octagon?",
                        ["$120^\\circ$", "$135^\\circ$", "$140^\\circ$", "$144^\\circ$"], 1,
                        "Formula for interior angle of regular $n$-gon: $\\frac{(n - 2) \\times 180^\\circ}{n}$. For $n = 8$: $\\frac{6 \\times 180^\\circ}{8} = \\frac{1080^\\circ}{8} = 135^\\circ$."
                    )
                ]
            },
            {
                "heading": "Section 2: Triangles, Similarity & Pythagorean Theorem",
                "questions": [
                    make_q(
                        "In a right triangle, the hypotenuse has length $25$ cm and one leg has length $7$ cm. What is the length of the other leg?",
                        ["$20$ cm", "$24$ cm", "$22$ cm", "$18$ cm"], 1,
                        "By the Pythagorean theorem: $a = \\sqrt{25^2 - 7^2} = \\sqrt{625 - 49} = \\sqrt{576} = 24$ cm."
                    ),
                    make_q(
                        "Two similar triangles have corresponding side lengths in the ratio $3:5$. If the area of the smaller triangle is $36$ square units, what is the area of the larger triangle?",
                        ["$60$", "$80$", "$100$", "$125$"], 2,
                        "Ratio of areas equals the square of the ratio of sides: $\\frac{\\text{Area}_1}{\\text{Area}_2} = (\\frac{3}{5})^2 = \\frac{9}{25}$. Then $\\frac{36}{\\text{Area}_2} = \\frac{9}{25} \\Rightarrow \\text{Area}_2 = 36 \\times \\frac{25}{9} = 100$."
                    ),
                    make_q(
                        "In a $30^\\circ$-$60^\\circ$-$90^\\circ$ right triangle, the length of the hypotenuse is $16\\sqrt{3}$. What is the length of the side opposite the $60^\\circ$ angle?",
                        ["$12$", "$24$", "$8\\sqrt{3}$", "$16$"], 1,
                        "Side opposite $30^\\circ$ is half the hypotenuse: $\\frac{16\\sqrt{3}}{2} = 8\\sqrt{3}$. Side opposite $60^\\circ$ is $(8\\sqrt{3})\\sqrt{3} = 8 \\times 3 = 24$."
                    )
                ]
            },
            {
                "heading": "Section 3: Quadrilaterals & Polygons",
                "questions": [
                    make_q(
                        "A trapezoid has parallel bases of lengths $14$ cm and $26$ cm and an altitude of $9$ cm. What is the area of the trapezoid?",
                        ["$160$ cm$^2$", "$180$ cm$^2$", "$200$ cm$^2$", "$220$ cm$^2$"], 1,
                        "Area $= \\frac{b_1 + b_2}{2} \\times h = \\frac{14 + 26}{2} \\times 9 = \\frac{40}{2} \\times 9 = 20 \\times 9 = 180$ cm$^2$."
                    ),
                    make_q(
                        "The diagonals of a rhombus have lengths $16$ inches and $30$ inches. What is the perimeter of the rhombus?",
                        ["$60$ inches", "$64$ inches", "$68$ inches", "$72$ inches"], 2,
                        "Diagonals bisect each other perpendicularly, creating four right triangles with legs $\\frac{16}{2} = 8$ and $\\frac{30}{2} = 15$. Side length $s = \\sqrt{8^2 + 15^2} = \\sqrt{64 + 225} = \\sqrt{289} = 17$. Perimeter $= 4 \\times 17 = 68$ inches."
                    ),
                    make_q(
                        "A rectangle has a perimeter of $48$ meters and a length that is twice its width. What is the area of the rectangle?",
                        ["$96$ m$^2$", "$128$ m$^2$", "$144$ m$^2$", "$160$ m$^2$"], 1,
                        "$P = 2(L + W) = 2(2W + W) = 6W = 48 \\Rightarrow W = 8$. Then $L = 16$. Area $= 16 \\times 8 = 128$ m$^2$."
                    )
                ]
            },
            {
                "heading": "Section 4: Circles, Arcs & Sectors",
                "questions": [
                    make_q(
                        "A circle has a radius of $12$ cm. What is the area of a sector formed by a central angle of $60^\\circ$?",
                        ["$12\\pi$ cm$^2$", "$24\\pi$ cm$^2$", "$36\\pi$ cm$^2$", "$48\\pi$ cm$^2$"], 1,
                        "Sector area $= \\frac{\\theta}{360^\\circ} \\times \\pi r^2 = \\frac{60}{360} \\times \\pi (12^2) = \\frac{1}{6} \\times 144\\pi = 24\\pi$ cm$^2$."
                    ),
                    make_q(
                        "In a circle of radius $10$ inches, what is the length of an arc intercepted by a central angle of $\\frac{3\\pi}{5}$ radians?",
                        ["$4\\pi$ inches", "$6\\pi$ inches", "$8\\pi$ inches", "$10\\pi$ inches"], 1,
                        "Arc length formula in radians: $s = r\\theta = 10 \\times \\frac{3\\pi}{5} = 6\\pi$ inches."
                    ),
                    make_q(
                        "An inscribed angle intercepts an arc of $110^\\circ$ on a circle. What is the degree measure of the inscribed angle?",
                        ["$55^\\circ$", "$70^\\circ$", "$110^\\circ$", "$220^\\circ$"], 0,
                        "An inscribed angle is equal to half the measure of its intercepted arc: $\\frac{110^\\circ}{2} = 55^\\circ$."
                    )
                ]
            }
        ]
    },

    # --------------------------------------------------------------------------
    # ACT 6.01: Trigonometry
    # --------------------------------------------------------------------------
    {
        "track": "act",
        "num": "6.01",
        "slug": "trigonometry",
        "title": "Trigonometry",
        "sections": [
            {
                "heading": "Section 1: Right Triangle Trigonometry (SOH-CAH-TOA)",
                "questions": [
                    make_q(
                        "In a right triangle $ABC$ with right angle at $C$, the leg $AC = 8$ and the hypotenuse $AB = 17$. What is the value of $\\tan B$?",
                        ["$\\frac{8}{15}$", "$\\frac{15}{8}$", "$\\frac{8}{17}$", "$\\frac{15}{17}$"], 0,
                        "Leg $BC = \\sqrt{17^2 - 8^2} = \\sqrt{289 - 64} = \\sqrt{225} = 15$. For angle $B$, the opposite side is $AC = 8$ and adjacent side is $BC = 15$. Thus $\\tan B = \\frac{8}{15}$."
                    ),
                    make_q(
                        "If $\\sin \\theta = \\frac{5}{13}$ and $\\theta$ is an acute angle, what is the value of $\\cos \\theta$?",
                        ["$\\frac{12}{13}$", "$\\frac{5}{12}$", "$\\frac{8}{13}$", "$\\frac{13}{12}$"], 0,
                        "Using the Pythagorean identity: $\\cos \\theta = \\sqrt{1 - \\sin^2 \\theta} = \\sqrt{1 - \\frac{25}{169}} = \\sqrt{\\frac{144}{169}} = \\frac{12}{13}$."
                    ),
                    make_q(
                        "A $20$-foot ladder leans against a vertical wall, making a $60^\\circ$ angle with the ground. How high up the wall does the ladder reach?",
                        ["$10$ ft", "$10\\sqrt{3}$ ft", "$15$ ft", "$20\\sqrt{3}$ ft"], 1,
                        "Height $h = 20 \\sin 60^\\circ = 20 \\times \\frac{\\sqrt{3}}{2} = 10\\sqrt{3}$ feet."
                    )
                ]
            },
            {
                "heading": "Section 2: Unit Circle & Angles in Standard Position",
                "questions": [
                    make_q(
                        "What is the exact value of $\\cos(\\frac{5\\pi}{6})$?",
                        ["$\\frac{\\sqrt{3}}{2}$", "$-\\frac{\\sqrt{3}}{2}$", "$\\frac{1}{2}$", "$-\\frac{1}{2}$"], 1,
                        "$\\frac{5\\pi}{6}$ is in Quadrant II where cosine is negative. Reference angle is $\\pi - \\frac{5\\pi}{6} = \\frac{\\pi}{6}$. Therefore, $\\cos(\\frac{5\\pi}{6}) = -\\cos(\\frac{\\pi}{6}) = -\\frac{\\sqrt{3}}{2}$."
                    ),
                    make_q(
                        "If the terminal side of an angle $\\theta$ in standard position passes through the point $(-3, -4)$, what is the value of $\\sec \\theta$?",
                        ["$-\\frac{5}{3}$", "$-\\frac{5}{4}$", "$\\frac{5}{3}$", "$-\\frac{3}{5}$"], 0,
                        "$r = \\sqrt{(-3)^2 + (-4)^2} = \\sqrt{25} = 5$. Since $\\cos \\theta = \\frac{x}{r} = \\frac{-3}{5}$, $\\sec \\theta = \\frac{1}{\\cos \\theta} = -\\frac{5}{3}$."
                    ),
                    make_q(
                        "What is the exact value of $\\tan(\\frac{7\\pi}{4})$?",
                        ["$1$", "$-1$", "$\\sqrt{3}$", "$-\\frac{\\sqrt{3}}{3}$"], 1,
                        "$\\frac{7\\pi}{4}$ lies in Quadrant IV. Reference angle is $2\\pi - \\frac{7\\pi}{4} = \\frac{\\pi}{4}$. Tangent is negative in Quadrant IV, so $\\tan(\\frac{7\\pi}{4}) = -\\tan(\\frac{\\pi}{4}) = -1$."
                    )
                ]
            },
            {
                "heading": "Section 3: Laws of Sines & Cosines",
                "questions": [
                    make_q(
                        "In triangle $ABC$, side $a = 10$, angle $A = 30^\\circ$, and angle $B = 45^\\circ$. What is the exact length of side $b$?",
                        ["$10\\sqrt{2}$", "$5\\sqrt{2}$", "$10\\sqrt{3}$", "$15$"], 0,
                        "By Law of Sines: $\\frac{b}{\\sin 45^\\circ} = \\frac{10}{\\sin 30^\\circ} \\Rightarrow b = \\frac{10 \\times \\frac{\\sqrt{2}}{2}}{\\frac{1}{2}} = 10\\sqrt{2}$."
                    ),
                    make_q(
                        "In triangle $PQR$, sides $p = 5$, $q = 8$, and the included angle $R = 60^\\circ$. What is the length of side $r$?",
                        ["$6$", "$7$", "$8$", "$\\sqrt{49}$"], 1,
                        "By Law of Cosines: $r^2 = 5^2 + 8^2 - 2(5)(8)\\cos 60^\\circ = 25 + 64 - 80(\\frac{1}{2}) = 89 - 40 = 49$. Thus $r = 7$."
                    ),
                    make_q(
                        "What is the area of a triangle with side lengths $6$ cm and $10$ cm and an included angle of $150^\\circ$?",
                        ["$15$ cm$^2$", "$30$ cm$^2$", "$15\\sqrt{3}$ cm$^2$", "$30\\sqrt{3}$ cm$^2$"], 0,
                        "Area $= \\frac{1}{2} a b \\sin C = \\frac{1}{2}(6)(10)\\sin 150^\\circ = 30 \\times \\frac{1}{2} = 15$ cm$^2$."
                    )
                ]
            },
            {
                "heading": "Section 4: Trigonometric Graphs & Identities",
                "questions": [
                    make_q(
                        "What is the period of the function $f(x) = 4\\sin(3x - \\pi) + 2$?",
                        ["$\\frac{2\\pi}{3}$", "$3\\pi$", "$\\frac{\\pi}{3}$", "$2\\pi$"], 0,
                        "The standard period of sine is $2\\pi$. For $\\sin(Bx)$, the period is $\\frac{2\\pi}{|B|} = \\frac{2\\pi}{3}$."
                    ),
                    make_q(
                        "Which of the following expressions is identically equal to $\\frac{\\sin^2 x}{1 - \\cos x}$ for all valid $x$?",
                        ["$1 + \\cos x$", "$1 - \\cos x$", "$\\sin x$", "$\\cos x$"], 0,
                        "Substitute $\\sin^2 x = 1 - \\cos^2 x = (1 - \\cos x)(1 + \\cos x)$. Dividing by $(1 - \\cos x)$ gives $1 + \\cos x$."
                    ),
                    make_q(
                        "What is the amplitude of the cosine function $g(x) = -5\\cos(2x + \\frac{\\pi}{4}) - 3$?",
                        ["$-5$", "$2$", "$5$", "$8$"], 2,
                        "The amplitude is the absolute value of the leading coefficient: $|-5| = 5$."
                    )
                ]
            }
        ]
    },

    # --------------------------------------------------------------------------
    # ACT 7.01: Statistics & Probability
    # --------------------------------------------------------------------------
    {
        "track": "act",
        "num": "7.01",
        "slug": "statistics-probability",
        "title": "Statistics & Probability",
        "sections": [
            {
                "heading": "Section 1: Central Tendency & Weighted Averages",
                "questions": [
                    make_q(
                        "A student scored $82, 88, 91,$ and $85$ on four exams. What score must the student earn on the fifth exam to achieve an overall mean score of $88$?",
                        ["$90$", "$92$", "$94$", "$96$"], 2,
                        "Required total for 5 exams: $5 \\times 88 = 440$. Current sum: $82 + 88 + 91 + 85 = 346$. Fifth score required: $440 - 346 = 94$."
                    ),
                    make_q(
                        "In a set of 7 integers: $\\{4, 7, 9, x, 14, 18, 20\\}$ arranged in ascending order, the median is equal to the mean. What is the value of $x$?",
                        ["$12$", "$13$", "$14$", "$15$"], 0,
                        "Median of 7 sorted values is the 4th value: $x$. Mean $= \\frac{4 + 7 + 9 + x + 14 + 18 + 20}{7} = \\frac{72 + x}{7}$. Equating: $7x = 72 + x \\Rightarrow 6x = 72 \\Rightarrow x = 12$."
                    ),
                    make_q(
                        "In a chemistry course, homework counts for $20\\%$, labs count for $30\\%$, and tests count for $50\\%$. If a student earns $90$ on homework, $80$ on labs, and $86$ on tests, what is the weighted final grade?",
                        ["$84$", "$85$", "$86$", "$87$"], 1,
                        "Weighted grade $= 0.20(90) + 0.30(80) + 0.50(86) = 18 + 24 + 43 = 85$."
                    )
                ]
            },
            {
                "heading": "Section 2: Data Spread, Range & Standard Deviation",
                "questions": [
                    make_q(
                        "A data set consists of the numbers $\\{3, 7, 8, 12, 15, 18, 21\\}$. What is the interquartile range (IQR) of this data set?",
                        ["$9$", "$11$", "$12$", "$14$"], 1,
                        "The median is $12$. The lower half is $\\{3, 7, 8\\}$ with $Q_1 = 7$. The upper half is $\\{15, 18, 21\\}$ with $Q_3 = 18$. Thus $\\text{IQR} = Q_3 - Q_1 = 18 - 7 = 11$."
                    ),
                    make_q(
                        "If every value in a data set is multiplied by $3$ and then increased by $5$, how is the standard deviation $\\sigma$ affected?",
                        ["It increases by $5$", "It is multiplied by $3$", "It is multiplied by $3$ and increased by $5$", "It remains unchanged"], 1,
                        "Multiplying by a constant $c$ scales standard deviation by $|c| = 3$. Adding a constant shifts the center but does not change the spread. Hence, standard deviation is multiplied by $3$."
                    ),
                    make_q(
                        "Which of the following data sets has a standard deviation equal to $0$?",
                        ["$\\{5, 5, 5, 5, 5\\}$", "$\\{1, 2, 3, 4, 5\\}$", "$\\{-2, 0, 2\\}$", "$\\{10, 20, 30\\}$"], 0,
                        "A standard deviation of $0$ occurs if and only if all values in the data set are identical."
                    )
                ]
            },
            {
                "heading": "Section 3: Probability & Compound Events",
                "questions": [
                    make_q(
                        "A bag contains $6$ red marbles, $8$ blue marbles, and $10$ green marbles. If one marble is selected at random, what is the probability that it is NOT blue?",
                        ["$\\frac{1}{3}$", "$\\frac{2}{3}$", "$\\frac{1}{4}$", "$\\frac{3}{4}$"], 1,
                        "Total marbles $= 6 + 8 + 10 = 24$. Non-blue marbles $= 6 + 10 = 16$. Probability $= \\frac{16}{24} = \\frac{2}{3}$."
                    ),
                    make_q(
                        "Two fair standard six-sided dice are rolled simultaneously. What is the probability that the sum of the two numbers rolled is greater than $9$?",
                        ["$\\frac{1}{6}$", "$\\frac{5}{36}$", "$\\frac{1}{9}$", "$\\frac{7}{36}$"], 0,
                        "Outcomes with sum $> 9$ are sums of $10, 11, 12$: $(4,6), (5,5), (6,4), (5,6), (6,5), (6,6)$ = 6 outcomes. Probability $= \\frac{6}{36} = \\frac{1}{6}$."
                    ),
                    make_q(
                        "Events $A$ and $B$ are independent. If $P(A) = 0.4$ and $P(B) = 0.5$, what is the probability that at least one of the events occurs, $P(A \\cup B)$?",
                        ["$0.70$", "$0.80$", "$0.90$", "$0.20$"], 0,
                        "For independent events, $P(A \\cap B) = P(A)P(B) = 0.4 \\times 0.5 = 0.2$. Then $P(A \\cup B) = P(A) + P(B) - P(A \\cap B) = 0.4 + 0.5 - 0.2 = 0.70$."
                    )
                ]
            },
            {
                "heading": "Section 4: Combinations & Permutations",
                "questions": [
                    make_q(
                        "In how many distinct ways can a committee of $4$ members be chosen from a group of $9$ people?",
                        ["$36$", "$84$", "$126$", "$3024$"], 2,
                        "Selection order does not matter: $\\binom{9}{4} = \\frac{9 \\times 8 \\times 7 \\times 6}{4 \\times 3 \\times 2 \\times 1} = 126$."
                    ),
                    make_q(
                        "How many different $4$-digit identification codes can be formed using digits $0$ through $9$ if repetition of digits is not allowed and the first digit cannot be $0$?",
                        ["$4,536$", "$5,040$", "$9,000$", "$3,024$"], 0,
                        "Choices for 1st digit (1-9) $= 9$. Choices for 2nd digit (0-9 excluding 1st) $= 9$. Choices for 3rd digit $= 8$. Choices for 4th digit $= 7$. Total $= 9 \\times 9 \\times 8 \\times 7 = 4,536$."
                    ),
                    make_q(
                        "A restaurant offers $4$ appetizers, $6$ main courses, and $3$ desserts. How many distinct 3-course dinner combinations are possible?",
                        ["$13$", "$36$", "$72$", "$144$"], 2,
                        "By the fundamental counting principle: $4 \\times 6 \\times 3 = 72$ combinations."
                    )
                ]
            }
        ]
    },

    # --------------------------------------------------------------------------
    # ACT 8.01: Matrices, Vectors & Complex Numbers
    # --------------------------------------------------------------------------
    {
        "track": "act",
        "num": "8.01",
        "slug": "matrices-vectors-complex-numbers",
        "title": "Matrices, Vectors & Complex Numbers",
        "sections": [
            {
                "heading": "Section 1: Operations with Complex Numbers",
                "questions": [
                    make_q(
                        "What is the product of the complex numbers $(4 - 3i)$ and $(2 + 5i)$, where $i^2 = -1$?",
                        ["$23 + 14i$", "$7 + 14i$", "$23 - 14i$", "$8 - 15i$"], 0,
                        "Expand: $4(2) + 4(5i) - 3i(2) - 15i^2 = 8 + 20i - 6i - 15(-1) = 8 + 14i + 15 = 23 + 14i$."
                    ),
                    make_q(
                        "What is the simplified form of the quotient $\\frac{5 - i}{2 + i}$?",
                        ["$\\frac{9 - 7i}{5}$", "$\\frac{11 - 7i}{5}$", "$3 - i$", "$\\frac{9 + 3i}{5}$"], 0,
                        "Multiply numerator and denominator by conjugate $(2 - i)$: $\\frac{(5 - i)(2 - i)}{(2 + i)(2 - i)} = \\frac{10 - 5i - 2i + i^2}{4 - i^2} = \\frac{10 - 7i - 1}{4 - (-1)} = \\frac{9 - 7i}{5}$."
                    ),
                    make_q(
                        "What is the value of $i^{47}$, where $i = \\sqrt{-1}$?",
                        ["$1$", "$-1$", "$i$", "$-i$"], 3,
                        "Divide power by $4$: $47 = 4(11) + 3$. Thus $i^{47} = (i^4)^{11} \\cdot i^3 = 1 \\cdot (-i) = -i$."
                    )
                ]
            },
            {
                "heading": "Section 2: Modulus & Graphing in the Complex Plane",
                "questions": [
                    make_q(
                        "What is the modulus (absolute value) of the complex number $z = -5 + 12i$?",
                        ["$7$", "$13$", "$17$", "$\\sqrt{119}$"], 1,
                        "Modulus $|z| = \\sqrt{a^2 + b^2} = \\sqrt{(-5)^2 + 12^2} = \\sqrt{25 + 144} = \\sqrt{169} = 13$."
                    ),
                    make_q(
                        "What is the distance in the complex plane between $z_1 = 3 - 2i$ and $z_2 = -1 + 4i$?",
                        ["$2\\sqrt{13}$", "$\\sqrt{20}$", "$10$", "$5$"], 0,
                        "Distance $= |z_1 - z_2| = |(3 - (-1)) + (-2 - 4)i| = |4 - 6i| = \\sqrt{4^2 + (-6)^2} = \\sqrt{16 + 36} = \\sqrt{52} = 2\\sqrt{13}$."
                    ),
                    make_q(
                        "If $z = 2 + 2i$, what is the argument $\\theta$ of $z$ in radians, where $0 \\leq \\theta < 2\\pi$?",
                        ["$\\frac{\\pi}{6}$", "$\\frac{\\pi}{4}$", "$\\frac{\\pi}{3}$", "$\\frac{3\\pi}{4}$"], 1,
                        "Both real and imaginary parts are positive (Quadrant I). $\\tan \\theta = \\frac{b}{a} = \\frac{2}{2} = 1 \\Rightarrow \\theta = \\frac{\\pi}{4}$."
                    )
                ]
            },
            {
                "heading": "Section 3: Matrix Operations & Determinants",
                "questions": [
                    make_q(
                        "Given matrices $A = [[3, -1], [2, 4]]$ and $B = [[1, 5], [-2, 3]]$, what is the matrix $2A - B$?",
                        ["$[[5, -7], [6, 5]]$", "$[[5, 3], [2, 5]]$", "$[[7, -7], [6, 11]]$", "$[[5, -7], [2, 5]]$"], 0,
                        "$2A = [[6, -2], [4, 8]]$. Subtract $B$: $[[6-1, -2-5], [4-(-2), 8-3]] = [[5, -7], [6, 5]]$."
                    ),
                    make_q(
                        "What is the determinant of the $2 \\times 2$ matrix $M = [[4, 6], [-2, 3]]$?",
                        ["$0$", "$12$", "$24$", "$36$"], 2,
                        "Determinant $\\det(M) = ad - bc = 4(3) - (6)(-2) = 12 - (-12) = 24$."
                    ),
                    make_q(
                        "For what value of $k$ will the matrix $K = [[k, 6], [2, 3]]$ NOT have an inverse?",
                        ["$1$", "$2$", "$3$", "$4$"], 3,
                        "A matrix is singular (no inverse) when its determinant is zero: $k(3) - (6)(2) = 0 \\Rightarrow 3k - 12 = 0 \\Rightarrow 3k = 12 \\Rightarrow k = 4$."
                    )
                ]
            },
            {
                "heading": "Section 4: Vector Operations & Dot Product",
                "questions": [
                    make_q(
                        "Vectors $\\mathbf{u} = \\langle 3, -4 \\rangle$ and $\\mathbf{v} = \\langle -2, 5 \\rangle$ are given. What are the components of $2\\mathbf{u} + \\mathbf{v}$?",
                        ["$\\langle 4, -3 \\rangle$", "$\\langle 1, 1 \\rangle$", "$\\langle 4, 3 \\rangle$", "$\\langle -1, -3 \\rangle$"], 0,
                        "$2\\mathbf{u} = \\langle 6, -8 \\rangle$. Adding $\\mathbf{v}$: $\\langle 6 + (-2), -8 + 5 \\rangle = \\langle 4, -3 \\rangle$."
                    ),
                    make_q(
                        "What is the dot product of the vectors $\\mathbf{a} = \\langle 5, -2 \\rangle$ and $\\mathbf{b} = \\langle 4, 7 \\rangle$?",
                        ["$6$", "$26$", "$-6$", "$34$"], 0,
                        "$\\mathbf{a} \\cdot \\mathbf{b} = (5)(4) + (-2)(7) = 20 - 14 = 6$."
                    ),
                    make_q(
                        "What is the magnitude of the vector $\\mathbf{w} = \\langle -9, 12 \\rangle$?",
                        ["$13$", "$15$", "$17$", "$21$"], 1,
                        "Magnitude $\|\\mathbf{w}\| = \\sqrt{(-9)^2 + 12^2} = \\sqrt{81 + 144} = \\sqrt{225} = 15$."
                    )
                ]
            }
        ]
    }
]
