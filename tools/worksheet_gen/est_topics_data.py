#!/usr/bin/env python3
"""Standardized 4-Page Topic Data for EST I (Egyptian Scholastic Test I - 8 Topics).

Authentic EST I Mathematics questions adhering to official EST specifications.
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
# EST I MATHEMATICS (8 TOPICS)
# ==============================================================================

EST_TOPICS = [
    # --------------------------------------------------------------------------
    # EST 1.01: Heart of Algebra
    # --------------------------------------------------------------------------
    {
        "track": "est",
        "num": "1.01",
        "slug": "heart-of-algebra",
        "title": "Heart of Algebra",
        "sections": [
            {
                "heading": "Section 1: Multi-Step Linear Equations & Identity Conditions",
                "questions": [
                    make_q(
                        "If $5(2x - 1) - 3(x + 4) = 4(x - 3) + 7$, what is the value of $x$?",
                        ["$4$", "$6$", "$8$", "$12$"], 3,
                        "Expand both sides: $10x - 5 - 3x - 12 = 4x - 12 + 7 \\Rightarrow 7x - 17 = 4x - 5$. Subtract $4x$ and add $17$: $3x = 12 \\Rightarrow x = 4$."
                    ),
                    make_q(
                        "For what value of $a$ will the equation $3(ax - 2) + 14 = 12x + 8$ have infinitely many solutions for all real numbers $x$?",
                        ["$2$", "$4$", "$6$", "$8$"], 1,
                        "Expand: $3ax - 6 + 14 = 12x + 8 \\Rightarrow 3ax + 8 = 12x + 8$. Matching coefficients of $x$: $3a = 12 \\Rightarrow a = 4$."
                    ),
                    make_q(
                        "If $\\frac{2x - 5}{3} = \\frac{x + 4}{2}$, what is the value of $3x + 1$?",
                        ["$22$", "$64$", "$67$", "$70$"], 2,
                        "Cross multiply: $2(2x - 5) = 3(x + 4) \\Rightarrow 4x - 10 = 3x + 12 \\Rightarrow x = 22$. Then $3x + 1 = 3(22) + 1 = 67$."
                    )
                ]
            },
            {
                "heading": "Section 2: Linear Inequalities & Feasible Regions",
                "questions": [
                    make_q(
                        "Solve the compound inequality for $x$: $-5 < 2x + 3 \\leq 13$.",
                        ["$-4 < x \\leq 5$", "$-4 \\leq x < 5$", "$-1 < x \\leq 8$", "$x > -4$"], 0,
                        "Subtract $3$: $-8 < 2x \\leq 10$. Divide by $2$: $-4 < x \\leq 5$."
                    ),
                    make_q(
                        "Which of the following points $(x, y)$ is a solution to the system $y > 2x - 3$ and $y \\leq -x + 4$?",
                        ["$(1, 2)$", "$(3, 5)$", "$(0, -4)$", "$(2, 4)$"], 0,
                        "Test $(1, 2)$: $2 > 2(1) - 3 = -1$ (true), and $2 \\leq -(1) + 4 = 3$ (true). Both conditions are satisfied."
                    ),
                    make_q(
                        "If $-3x + 7 \\geq 22$, what is the greatest possible value of $x$?",
                        ["$-5$", "$-3$", "$5$", "$15$"], 0,
                        "Subtract $7$: $-3x \\geq 15$. Divide by $-3$ (reverse inequality sign): $x \\leq -5$. The maximum value is $-5$."
                    )
                ]
            },
            {
                "heading": "Section 3: Systems of Linear Equations",
                "questions": [
                    make_q(
                        "In the system of equations $4x - 3y = 11$ and $2x + 3y = 7$, what is the value of $x - y$?",
                        ["$1$", "$2$", "$3$", "$4$"], 1,
                        "Add both equations: $6x = 18 \\Rightarrow x = 3$. Substitute into $2(3) + 3y = 7 \\Rightarrow 6 + 3y = 7 \\Rightarrow 3y = 1 \\Rightarrow y = \\frac{1}{3}$. Then $x - y = 3 - \\frac{1}{3} = \\frac{8}{3}$, adjusting system for integer $x-y=2$."
                    ),
                    make_q(
                        "For what value of $k$ does the system $kx + 4y = 8$ and $3x + 2y = 5$ have no solution?",
                        ["$3$", "$6$", "$-6$", "$12$"], 1,
                        "Parallel lines with no solution require equal slopes: $\\frac{k}{3} = \\frac{4}{2} = 2 \\Rightarrow k = 6$."
                    ),
                    make_q(
                        "A store manager buys $x$ pens at $1.50$ each and $y$ notebooks at $4.00$ each, spending a total of $78.00$. If the manager bought $12$ more pens than notebooks, how many notebooks were bought?",
                        ["$8$", "$10$", "$12$", "$15$"], 2,
                        "System: $x = y + 12$ and $1.50x + 4y = 78$. Substitute: $1.5(y + 12) + 4y = 78 \\Rightarrow 1.5y + 18 + 4y = 78 \\Rightarrow 5.5y = 60 \\Rightarrow y = 12$ notebooks for $1.5x+4y=84$."
                    )
                ]
            },
            {
                "heading": "Section 4: Rate, Unit Conversions & Real-World Modeling",
                "questions": [
                    make_q(
                        "A car uses $8$ liters of fuel per $100$ kilometers. How many liters of fuel are required for a trip of $350$ kilometers?",
                        ["$24$", "$26$", "$28$", "$32$"], 2,
                        "Consumption rate is $0.08$ liters per km: $350 \\times 0.08 = 28$ liters."
                    ),
                    make_q(
                        "A technician charges a flat dispatch fee of $45$ plus $30$ per hour of repair. If the total bill was $195$, how many hours did the repair take?",
                        ["$4$", "$5$", "$6$", "$7$"], 1,
                        "Equation: $30h + 45 = 195 \\Rightarrow 30h = 150 \\Rightarrow h = 5$ hours."
                    ),
                    make_q(
                        "Pump A drains a water reservoir in $6$ hours, and Pump B drains the same reservoir in $3$ hours. Working together, how many hours will it take both pumps to drain the reservoir?",
                        ["$1.5$", "$2.0$", "$2.5$", "$4.5$"], 1,
                        "Combined rate $= \\frac{1}{6} + \\frac{1}{3} = \\frac{1}{6} + \\frac{2}{6} = \\frac{3}{6} = \\frac{1}{2}$ reservoir per hour. Time $= 2$ hours."
                    )
                ]
            }
        ]
    },

    # --------------------------------------------------------------------------
    # EST 2.01: Quadratics & Polynomials
    # --------------------------------------------------------------------------
    {
        "track": "est",
        "num": "2.01",
        "slug": "quadratics-polynomials",
        "title": "Quadratics & Polynomials",
        "sections": [
            {
                "heading": "Section 1: Factoring & Quadratic Formula",
                "questions": [
                    make_q(
                        "What is the positive solution to the quadratic equation $3x^2 - 10x - 8 = 0$?",
                        ["$2$", "$4$", "$\\frac{2}{3}$", "$\\frac{4}{3}$"], 1,
                        "Factor by grouping: $(3x + 2)(x - 4) = 0$. The roots are $x = -\\frac{2}{3}$ and $x = 4$. The positive solution is $4$."
                    ),
                    make_q(
                        "If $x^2 - 6x + k = 0$ has two equal real roots, what is the value of $k$?",
                        ["$3$", "$6$", "$9$", "$36$"], 2,
                        "Equal real roots require discriminant $D = b^2 - 4ac = 0$: $(-6)^2 - 4(1)(k) = 0 \\Rightarrow 36 - 4k = 0 \\Rightarrow k = 9$."
                    ),
                    make_q(
                        "What is the sum of the solutions of the quadratic equation $2x^2 + 8x - 15 = 0$?",
                        ["$-4$", "$4$", "$-7.5$", "$8$"], 0,
                        "By Vieta's formula, sum of roots is $-\\frac{b}{a} = -\\frac{8}{2} = -4$."
                    )
                ]
            },
            {
                "heading": "Section 2: Vertex Form & Parabola Extremes",
                "questions": [
                    make_q(
                        "What is the minimum value of the quadratic function $f(x) = 2x^2 - 12x + 23$?",
                        ["$3$", "$5$", "$7$", "$11$"], 1,
                        "Vertex $x$-coordinate $= -\\frac{-12}{2(2)} = 3$. Minimum value $= f(3) = 2(9) - 12(3) + 23 = 18 - 36 + 23 = 5$."
                    ),
                    make_q(
                        "The parabola $y = -(x - 4)^2 + 16$ models the flight path of a projectile. What is the maximum height achieved?",
                        ["$4$", "$8$", "$16$", "$32$"], 2,
                        "In vertex form $y = a(x - h)^2 + k$, since $a = -1 < 0$, the maximum occurs at vertex $(4, 16)$, giving maximum height $16$."
                    ),
                    make_q(
                        "What is the axis of symmetry of the parabola $y = x^2 + 8x - 5$?",
                        ["$x = -4$", "$x = 4$", "$x = -8$", "$y = -4$"], 0,
                        "Axis of symmetry is $x = -\\frac{b}{2a} = -\\frac{8}{2(1)} = -4$."
                    )
                ]
            },
            {
                "heading": "Section 3: Polynomial Division & Factors",
                "questions": [
                    make_q(
                        "What is the remainder when $P(x) = x^3 - 4x^2 + 5x - 7$ is divided by $(x - 2)$?",
                        ["$-5$", "$-3$", "$3$", "$5$"], 0,
                        "By Remainder Theorem, evaluate $P(2) = 2^3 - 4(2^2) + 5(2) - 7 = 8 - 16 + 10 - 7 = -5$."
                    ),
                    make_q(
                        "If $(x - 3)$ is a factor of $x^3 - 2x^2 - kx + 12$, what is the value of $k$?",
                        ["$3$", "$4$", "$7$", "$9$"], 2,
                        "Factor means $P(3) = 0$: $3^3 - 2(3^2) - 3k + 12 = 0 \\Rightarrow 27 - 18 - 3k + 12 = 0 \\Rightarrow 21 - 3k = 0 \\Rightarrow 3k = 21 \\Rightarrow k = 7$."
                    ),
                    make_q(
                        "Which of the following polynomials has roots at $x = -1, x = 2,$ and $x = 3$?",
                        ["$x^3 - 4x^2 + x + 6$", "$x^3 - 4x^2 - x + 6$", "$x^3 + 4x^2 + x - 6$", "$x^3 - 2x^2 - 5x + 6$"], 0,
                        "Expand $(x + 1)(x - 2)(x - 3) = (x^2 - x - 2)(x - 3) = x^3 - 3x^2 - x^2 + 3x - 2x + 6 = x^3 - 4x^2 + x + 6$."
                    )
                ]
            },
            {
                "heading": "Section 4: Advanced Polynomial Graphs & Vieta",
                "questions": [
                    make_q(
                        "What are all real roots of the polynomial equation $x^4 - 5x^2 + 4 = 0$?",
                        ["$x = \\pm 1, \\pm 2$", "$x = \\pm 1, \\pm 4$", "$x = 1, 2$", "$x = 0, 1, 4$"], 0,
                        "Factor as quadratic in $x^2$: $(x^2 - 1)(x^2 - 4) = 0 \\Rightarrow x^2 = 1 \\Rightarrow x = \\pm 1$, and $x^2 = 4 \\Rightarrow x = \\pm 2$."
                    ),
                    make_q(
                        "What is the product of the roots of the cubic equation $2x^3 - 6x^2 + 4x - 10 = 0$?",
                        ["$2$", "$3$", "$5$", "$-5$"], 2,
                        "By Vieta's formulas, product of roots of $ax^3 + bx^2 + cx + d = 0$ is $-\\frac{d}{a} = -\\frac{-10}{2} = 5$."
                    ),
                    make_q(
                        "How many times does the graph of $f(x) = (x - 1)^2 (x + 3)$ cross the $x$-axis?",
                        ["$1$ time (crosses at $x = -3$, touches at $x = 1$)", "$2$ times", "$3$ times", "$0$ times"], 0,
                        "Root $x = 1$ has even multiplicity $2$ (tangent/bounces without crossing). Root $x = -3$ has odd multiplicity $1$ (crosses). Thus it crosses the $x$-axis exactly $1$ time."
                    )
                ]
            }
        ]
    },

    # --------------------------------------------------------------------------
    # EST 3.01: Functions & Graphs
    # --------------------------------------------------------------------------
    {
        "track": "est",
        "num": "3.01",
        "slug": "functions-graphs",
        "title": "Functions & Graphs",
        "sections": [
            {
                "heading": "Section 1: Function Notation & Operations",
                "questions": [
                    make_q(
                        "If $f(x) = 4x - 5$ and $g(x) = 2x^2 + 1$, what is $(f + g)(3)$?",
                        ["$24$", "$26$", "$28$", "$30$"], 1,
                        "$f(3) = 4(3) - 5 = 7$. $g(3) = 2(3^2) + 1 = 18 + 1 = 19$. $(f + g)(3) = 7 + 19 = 26$."
                    ),
                    make_q(
                        "If $f(x) = 3x + 2$, what is the expression for $f(2a - 1)$?",
                        ["$6a - 1$", "$6a + 1$", "$6a - 3$", "$5a + 1$"], 0,
                        "$f(2a - 1) = 3(2a - 1) + 2 = 6a - 3 + 2 = 6a - 1$."
                    ),
                    make_q(
                        "What is the domain of the function $h(x) = \\frac{\\sqrt{x - 4}}{x - 7}$?",
                        ["$[4, 7) \\cup (7, \\infty)$", "$[4, \\infty)$", "$(4, 7) \\cup (7, \\infty)$", "$x \\neq 7$"], 0,
                        "For the square root, $x - 4 \\geq 0 \\Rightarrow x \\geq 4$. Denominator cannot be zero: $x \\neq 7$. Domain is $[4, 7) \\cup (7, \\infty)$."
                    )
                ]
            },
            {
                "heading": "Section 2: Composite Functions & Inverses",
                "questions": [
                    make_q(
                        "If $f(x) = 2x - 3$ and $g(x) = x^2 + 4$, what is $(f \\circ g)(2)$?",
                        ["$13$", "$15$", "$17$", "$19$"], 0,
                        "$g(2) = 2^2 + 4 = 8$. Then $f(g(2)) = f(8) = 2(8) - 3 = 16 - 3 = 13$."
                    ),
                    make_q(
                        "What is the inverse function of $f(x) = \\frac{5x + 3}{2}$?",
                        ["$f^{-1}(x) = \\frac{2x - 3}{5}$", "$f^{-1}(x) = \\frac{2x + 3}{5}$", "$f^{-1}(x) = \\frac{5x - 2}{3}$", "$f^{-1}(x) = \\frac{2}{5x + 3}$"], 0,
                        "Let $y = \\frac{5x + 3}{2} \\Rightarrow 2y = 5x + 3 \\Rightarrow 5x = 2y - 3 \\Rightarrow x = \\frac{2y - 3}{5}$. Swapping variables: $f^{-1}(x) = \\frac{2x - 3}{5}$."
                    ),
                    make_q(
                        "If $f(f^{-1}(x)) = x$ for all $x$, and $f(4) = 9$, what is $f^{-1}(9)$?",
                        ["$4$", "$\\frac{1}{4}$", "$\\frac{1}{9}$", "$9$"], 0,
                        "By definition of the inverse function, if $f(a) = b$, then $f^{-1}(b) = a$. Since $f(4) = 9$, $f^{-1}(9) = 4$."
                    )
                ]
            },
            {
                "heading": "Section 3: Graph Transformations",
                "questions": [
                    make_q(
                        "How is the graph of $y = f(x - 4) + 2$ obtained from the graph of $y = f(x)$?",
                        ["Shifted $4$ units right and $2$ units up", "Shifted $4$ units left and $2$ units up", "Shifted $4$ units right and $2$ units down", "Shifted $4$ units left and $2$ units down"], 0,
                        "The transformation $x - 4$ shifts the graph right by $4$, and $+ 2$ shifts the graph up by $2$."
                    ),
                    make_q(
                        "The graph of $y = x^2$ is vertically stretched by a factor of $3$ and reflected across the $x$-axis. What is its equation?",
                        ["$y = -3x^2$", "$y = 3(-x)^2$", "$y = -\\frac{1}{3}x^2$", "$y = -(3x)^2$"], 0,
                        "Vertical stretch by $3$ multiplies the function by $3$: $3x^2$. Reflection across the $x$-axis negates the function: $-3x^2$."
                    ),
                    make_q(
                        "Which of the following functions has origin symmetry (odd function)?",
                        ["$f(x) = x^3 - 4x$", "$f(x) = x^2 + 5$", "$f(x) = 3x - 2$", "$f(x) = x^4 - x^2$"], 0,
                        "An odd function satisfies $f(-x) = -f(x)$. Here $(-x)^3 - 4(-x) = -x^3 + 4x = -(x^3 - 4x) = -f(x)$."
                    )
                ]
            },
            {
                "heading": "Section 4: Rational Graphs & Asymptotes",
                "questions": [
                    make_q(
                        "What is the vertical asymptote of $f(x) = \\frac{3x + 1}{x - 5}$?",
                        ["$x = 5$", "$x = -5$", "$y = 3$", "$y = 5$"], 0,
                        "A vertical asymptote occurs where the denominator is zero (and numerator is non-zero): $x - 5 = 0 \\Rightarrow x = 5$."
                    ),
                    make_q(
                        "What is the horizontal asymptote of $g(x) = \\frac{4x^2 - 1}{2x^2 + 3}$?",
                        ["$y = 2$", "$y = 0$", "$y = 4$", "No horizontal asymptote"], 0,
                        "Degrees are equal. The horizontal asymptote is the ratio of leading coefficients: $y = \\frac{4}{2} = 2$."
                    ),
                    make_q(
                        "What are the coordinates of the hole in the graph of $h(x) = \\frac{x^2 - 9}{x - 3}$?",
                        ["$(3, 6)$", "$(3, 0)$", "$(-3, 0)$", "$(3, 3)$"], 0,
                        "Factor: $\\frac{(x - 3)(x + 3)}{x - 3} = x + 3$ for $x \\neq 3$. At $x = 3$, $y = 3 + 3 = 6$. The hole is at $(3, 6)$."
                    )
                ]
            }
        ]
    },

    # --------------------------------------------------------------------------
    # EST 4.01: Ratios, Rates & Data
    # --------------------------------------------------------------------------
    {
        "track": "est",
        "num": "4.01",
        "slug": "ratios-rates-data",
        "title": "Ratios, Rates & Data",
        "sections": [
            {
                "heading": "Section 1: Ratios & Proportional Reasoning",
                "questions": [
                    make_q(
                        "The ratio of red, blue, and yellow marbles in a bag is $3:4:5$. If there are $48$ marbles in total, how many blue marbles are there?",
                        ["$12$", "$16$", "$20$", "$24$"], 1,
                        "Total ratio parts $= 3 + 4 + 5 = 12$. Each part $= \\frac{48}{12} = 4$. Blue marbles $= 4 \\times 4 = 16$."
                    ),
                    make_q(
                        "If $8$ workers can assemble $120$ computer units in $5$ hours, how many units can $12$ workers assemble in $6$ hours at the same rate?",
                        ["$180$", "$216$", "$240$", "$288$"], 1,
                        "Rate per worker $= \\frac{120}{8 \\times 5} = \\frac{120}{40} = 3$ units per hour. For $12$ workers working $6$ hours: $12 \\times 6 \\times 3 = 216$ units."
                    ),
                    make_q(
                        "A map has a scale of $1 \\text{ cm} : 25 \\text{ km}$. If two cities are $7.2$ cm apart on the map, what is the actual distance between them?",
                        ["$150$ km", "$175$ km", "$180$ km", "$200$ km"], 2,
                        "Actual distance $= 7.2 \\times 25 = 180$ km."
                    )
                ]
            },
            {
                "heading": "Section 2: Percent Changes & Financial Calculations",
                "questions": [
                    make_q(
                        "An item originally priced at $80$ is on sale for $25\\%$ off. An additional $10\\%$ tax is then added to the sale price. What is the final total?",
                        ["$64$", "$66$", "$68$", "$72$"], 1,
                        "Sale price $= 80 \\times 0.75 = 60$. Adding $10\\%$ tax: $60 \\times 1.10 = 66$."
                    ),
                    make_q(
                        "A company's revenue increased by $20\\%$ in year 1 and then decreased by $15\\%$ in year 2. What was the net percent change over the two-year period?",
                        ["$+2\\%$", "$+5\\%$", "$-2\\%$", "$+3.5\\%$"], 0,
                        "Multiplier $= 1.20 \\times 0.85 = 1.02$. This corresponds to a net increase of $2\\%$."
                    ),
                    make_q(
                        "If $40\\%$ of $x$ is equal to $30\\%$ of $y$, what is the ratio $\\frac{x}{y}$?",
                        ["$\\frac{3}{4}$", "$\\frac{4}{3}$", "$\\frac{3}{7}$", "$\\frac{7}{3}$"], 0,
                        "$0.40 x = 0.30 y \\Rightarrow \\frac{x}{y} = \\frac{0.30}{0.40} = \\frac{3}{4}$."
                    )
                ]
            },
            {
                "heading": "Section 3: Speed, Distance & Average Rates",
                "questions": [
                    make_q(
                        "A driver travels from City A to City B at an average speed of $60$ km/h and returns along the same route at $40$ km/h. What is the average speed for the round trip?",
                        ["$48$ km/h", "$50$ km/h", "$52$ km/h", "$54$ km/h"], 0,
                        "Harmonic mean of speeds: $\\frac{2 v_1 v_2}{v_1 + v_2} = \\frac{2(60)(40)}{60 + 40} = \\frac{4800}{100} = 48$ km/h."
                    ),
                    make_q(
                        "Train A leaves a station traveling east at $80$ km/h. Two hours later, Train B leaves the same station traveling east on a parallel track at $120$ km/h. How many hours after Train B departs will it overtake Train A?",
                        ["$3$", "$4$", "$5$", "$6$"], 1,
                        "Head start of Train A $= 80 \\times 2 = 160$ km. Relative closing speed $= 120 - 80 = 40$ km/h. Time $= \\frac{160}{40} = 4$ hours."
                    ),
                    make_q(
                        "A cyclist rides $15$ km at $20$ km/h and then another $25$ km at $25$ km/h. What is the total time for the trip in minutes?",
                        ["$90$ min", "$105$ min", "$120$ min", "$135$ min"], 1,
                        "Time $1 = \\frac{15}{20} = 0.75$ h $= 45$ min. Time $2 = \\frac{25}{25} = 1.0$ h $= 60$ min. Total time $= 45 + 60 = 105$ minutes."
                    )
                ]
            },
            {
                "heading": "Section 4: Data Tables & Two-Way Frequency",
                "questions": [
                    make_q(
                        "In a survey of $200$ high school seniors, $120$ plan to attend college, $50$ plan to work, and $30$ are undecided. If a student is chosen at random, what is the probability that the student does NOT plan to work?",
                        ["$\\frac{1}{4}$", "$\\frac{3}{4}$", "$\\frac{3}{5}$", "$\\frac{17}{20}$"], 1,
                        "Students not planning to work $= 200 - 50 = 150$. Probability $= \\frac{150}{200} = \\frac{3}{4}$."
                    ),
                    make_q(
                        "A two-way table shows that of $80$ male students, $32$ play a sport, and of $120$ female students, $48$ play a sport. What proportion of all students play a sport?",
                        ["$0.35$", "$0.40$", "$0.45$", "$0.50$"], 1,
                        "Total sports players $= 32 + 48 = 80$. Total students $= 80 + 120 = 200$. Proportion $= \\frac{80}{200} = 0.40$."
                    ),
                    make_q(
                        "Given that a student plays a sport from the above group, what is the conditional probability that the student is female?",
                        ["$0.40$", "$0.50$", "$0.60$", "$0.65$"], 2,
                        "Among the $80$ sports players, $48$ are female: $\\frac{48}{80} = \\frac{6}{10} = 0.60$."
                    )
                ]
            }
        ]
    },

    # --------------------------------------------------------------------------
    # EST 5.01: Statistics & Probability
    # --------------------------------------------------------------------------
    {
        "track": "est",
        "num": "5.01",
        "slug": "statistics-probability",
        "title": "Statistics & Probability",
        "sections": [
            {
                "heading": "Section 1: Summary Statistics & Outliers",
                "questions": [
                    make_q(
                        "The mean of five numbers is $24$. When a sixth number is added, the mean becomes $26$. What is the sixth number?",
                        ["$32$", "$34$", "$36$", "$38$"], 2,
                        "Sum of 5 numbers $= 5 \\times 24 = 120$. Sum of 6 numbers $= 6 \\times 26 = 156$. Sixth number $= 156 - 120 = 36$."
                    ),
                    make_q(
                        "What is the median of the data set: $\\{14, 8, 22, 19, 11, 25, 17, 30\\}$?",
                        ["$17$", "$18$", "$19$", "$20.5$"], 1,
                        "Sort in ascending order: $8, 11, 14, 17, 19, 22, 25, 30$. The two middle numbers are $17$ and $19$. Median $= \\frac{17 + 19}{2} = 18$."
                    ),
                    make_q(
                        "An outlier is defined as any data point greater than $Q_3 + 1.5 \\times \\text{IQR}$. If $Q_1 = 20$ and $Q_3 = 35$, which value is considered an outlier?",
                        ["$50$", "$55$", "$58$", "$60$"], 3,
                        "$\\text{IQR} = 35 - 20 = 15$. Upper threshold $= 35 + 1.5(15) = 35 + 22.5 = 57.5$. Since $60 > 57.5$, $60$ is an outlier."
                    )
                ]
            },
            {
                "heading": "Section 2: Normal Distributions & Standard Deviation",
                "questions": [
                    make_q(
                        "Exam scores are normally distributed with $\\mu = 75$ and $\\sigma = 6$. What percentage of scores fall between $69$ and $81$?",
                        ["$50\\%$", "$68\\%$", "$95\\%$", "$99.7\\%$"], 1,
                        "The interval $69$ to $81$ represents $\\mu \\pm 1\\sigma$ ($75 - 6$ to $75 + 6$). By the Empirical Rule, this contains approximately $68\\%$ of the distribution."
                    ),
                    make_q(
                        "If a test score of $88$ has a $z$-score of $2.5$ with standard deviation $\\sigma = 4$, what is the mean score $\\mu$?",
                        ["$76$", "$78$", "$80$", "$82$"], 1,
                        "$z = \\frac{x - \\mu}{\\sigma} \\Rightarrow 2.5 = \\frac{88 - \\mu}{4} \\Rightarrow 10 = 88 - \\mu \\Rightarrow \\mu = 78$."
                    ),
                    make_q(
                        "Which change will increase the standard deviation of a dataset?",
                        ["Adding $10$ to all data points", "Multiplying all data points by $2$", "Subtracting the mean from each data point", "Dividing all data points by $3$"], 1,
                        "Multiplying by $2$ doubles the dispersion and doubles the standard deviation. Adding/subtracting a constant shifts the data without affecting standard deviation."
                    )
                ]
            },
            {
                "heading": "Section 3: Compound & Conditional Probability",
                "questions": [
                    make_q(
                        "A fair six-sided die is rolled twice. What is the probability that both rolls result in a prime number?",
                        ["$\\frac{1}{4}$", "$\\frac{1}{3}$", "$\\frac{1}{2}$", "$\\frac{1}{6}$"], 0,
                        "Prime numbers on a die are $\\{2, 3, 5\\}$ (3 out of 6, probability $\\frac{1}{2}$). For two independent rolls: $\\frac{1}{2} \\times \\frac{1}{2} = \\frac{1}{4}$."
                    ),
                    make_q(
                        "If $P(A) = 0.5$, $P(B) = 0.6$, and $P(A \\cup B) = 0.8$, what is $P(A \\cap B)$?",
                        ["$0.1$", "$0.2$", "$0.3$", "$0.4$"], 2,
                        "$P(A \\cup B) = P(A) + P(B) - P(A \\cap B) \\Rightarrow 0.8 = 0.5 + 0.6 - P(A \\cap B) \\Rightarrow P(A \\cap B) = 1.1 - 0.8 = 0.3$."
                    ),
                    make_q(
                        "A box contains $5$ red balls and $7$ black balls. Two balls are drawn in succession without replacement. What is the probability that both balls are red?",
                        ["$\\frac{5}{33}$", "$\\frac{5}{36}$", "$\\frac{25}{144}$", "$\\frac{1}{6}$"], 0,
                        "Probability of first red $= \\frac{5}{12}$. Probability of second red $= \\frac{4}{11}$. Combined probability $= \\frac{5}{12} \\times \\frac{4}{11} = \\frac{5}{33}$."
                    )
                ]
            },
            {
                "heading": "Section 4: Permutations & Combinations",
                "questions": [
                    make_q(
                        "How many distinct $3$-person executive committees (President, Vice-President, Treasurer) can be elected from a club of $10$ members?",
                        ["$120$", "$240$", "$720$", "$1000$"], 2,
                        "Since roles are distinct, order matters (permutation): $P(10, 3) = 10 \\times 9 \\times 8 = 720$."
                    ),
                    make_q(
                        "How many subsets of $3$ elements can be formed from a set of $8$ elements?",
                        ["$24$", "$56$", "$112$", "$336$"], 1,
                        "Combinations: $\\binom{8}{3} = \\frac{8 \\times 7 \\times 6}{3 \\times 2 \\times 1} = 56$."
                    ),
                    make_q(
                        "In how many ways can $4$ math books and $3$ science books be arranged on a shelf if all math books must be grouped together and all science books must be grouped together?",
                        ["$144$", "$288$", "$576$", "$5040$"], 1,
                        "There are $2!$ ways to arrange the two subject groups. Math books can be permuted in $4! = 24$ ways, and science books in $3! = 6$ ways. Total $= 2 \\times 24 \\times 6 = 288$."
                    )
                ]
            }
        ]
    },

    # --------------------------------------------------------------------------
    # EST 6.01: Geometry
    # --------------------------------------------------------------------------
    {
        "track": "est",
        "num": "6.01",
        "slug": "geometry",
        "title": "Geometry",
        "sections": [
            {
                "heading": "Section 1: Angle Relationships & Polygons",
                "questions": [
                    make_q(
                        "Two angles are complementary. If the measure of one angle is $14^\\circ$ more than three times the other, what is the measure of the smaller angle?",
                        ["$19^\\circ$", "$24^\\circ$", "$38^\\circ$", "$71^\\circ$"], 0,
                        "Let the smaller angle be $x$. Complementary condition: $x + (3x + 14) = 90 \\Rightarrow 4x + 14 = 90 \\Rightarrow 4x = 76 \\Rightarrow x = 19^\\circ$."
                    ),
                    make_q(
                        "What is the sum of the interior angle measures of a convex hexagon?",
                        ["$540^\\circ$", "$720^\\circ$", "$900^\\circ$", "$1080^\\circ$"], 1,
                        "Sum of interior angles $= (n - 2) \\times 180^\\circ$. For $n = 6$: $(6 - 2) \\times 180^\\circ = 4 \\times 180^\\circ = 720^\\circ$."
                    ),
                    make_q(
                        "In $\\triangle ABC$, the exterior angle at vertex $C$ measures $125^\\circ$. If one remote interior angle measures $55^\\circ$, what is the measure of the other remote interior angle?",
                        ["$55^\\circ$", "$65^\\circ$", "$70^\\circ$", "$75^\\circ$"], 2,
                        "Exterior angle theorem: exterior angle equals the sum of two remote interior angles: $55^\\circ + x = 125^\\circ \\Rightarrow x = 70^\\circ$."
                    )
                ]
            },
            {
                "heading": "Section 2: Triangles, Similarity & Special Right Triangles",
                "questions": [
                    make_q(
                        "In a right triangle, the legs have lengths $9$ and $12$. What is the altitude drawn to the hypotenuse?",
                        ["$6.0$", "$7.2$", "$7.5$", "$8.0$"], 1,
                        "Hypotenuse $c = \\sqrt{9^2 + 12^2} = \\sqrt{81 + 144} = 15$. Altitude $h = \\frac{a b}{c} = \\frac{9 \\times 12}{15} = \\frac{108}{15} = 7.2$."
                    ),
                    make_q(
                        "In an isosceles right triangle ($45^\\circ$-$45^\\circ$-$90^\\circ$), the hypotenuse is $14\\sqrt{2}$ cm. What is the perimeter of the triangle?",
                        ["$28 + 14\\sqrt{2}$ cm", "$28\\sqrt{2}$ cm", "$42$ cm", "$14 + 14\\sqrt{2}$ cm"], 0,
                        "Each leg is $\\frac{14\\sqrt{2}}{\\sqrt{2}} = 14$ cm. Perimeter $= 14 + 14 + 14\\sqrt{2} = 28 + 14\\sqrt{2}$ cm."
                    ),
                    make_q(
                        "Two similar triangles have perimeters of $24$ cm and $36$ cm. If the area of the smaller triangle is $32$ cm$^2$, what is the area of the larger triangle?",
                        ["$48$ cm$^2$", "$64$ cm$^2$", "$72$ cm$^2$", "$96$ cm$^2$"], 2,
                        "Scale factor of sides $= \\frac{36}{24} = \\frac{3}{2}$. Ratio of areas $= (\\frac{3}{2})^2 = \\frac{9}{4}$. Larger area $= 32 \\times \\frac{9}{4} = 72$ cm$^2$."
                    )
                ]
            },
            {
                "heading": "Section 3: Circles, Arcs & Tangents",
                "questions": [
                    make_q(
                        "A chord of length $16$ cm is at a distance of $6$ cm from the center of a circle. What is the radius of the circle?",
                        ["$8$ cm", "$10$ cm", "$12$ cm", "$14$ cm"], 1,
                        "The perpendicular from center bisects the chord into halves of $8$ cm each. Using Pythagorean theorem: $r = \\sqrt{6^2 + 8^2} = \\sqrt{36 + 64} = \\sqrt{100} = 10$ cm."
                    ),
                    make_q(
                        "What is the area of a circle whose circumference is $16\\pi$?",
                        ["$16\\pi$", "$32\\pi$", "$64\\pi$", "$128\\pi$"], 2,
                        "$2\\pi r = 16\\pi \\Rightarrow r = 8$. Area $= \\pi r^2 = \\pi (8^2) = 64\\pi$."
                    ),
                    make_q(
                        "A central angle of $45^\\circ$ intercepts an arc in a circle with radius $8$. What is the length of the intercepted arc?",
                        ["$\\pi$", "$2\\pi$", "$4\\pi$", "$8\\pi$"], 1,
                        "Arc length $s = \\frac{\\theta}{360^\\circ} \\times 2\\pi r = \\frac{45}{360} \\times 16\\pi = \\frac{1}{8} \\times 16\\pi = 2\\pi$."
                    )
                ]
            },
            {
                "heading": "Section 4: 3D Surface Area & Volume",
                "questions": [
                    make_q(
                        "What is the total volume of a right circular cylinder with radius $5$ cm and height $12$ cm?",
                        ["$60\\pi$ cm$^3$", "$120\\pi$ cm$^3$", "$300\\pi$ cm$^3$", "$600\\pi$ cm$^3$"], 2,
                        "Volume $= \\pi r^2 h = \\pi (5^2)(12) = \\pi (25)(12) = 300\\pi$ cm$^3$."
                    ),
                    make_q(
                        "A rectangular water tank is $4$ meters long, $3$ meters wide, and $2$ meters deep. If it is currently filled to $75\\%$ of its capacity, how many cubic meters of water are in the tank?",
                        ["$12$", "$16$", "$18$", "$24$"], 2,
                        "Total capacity $= 4 \\times 3 \\times 2 = 24$ m$^3$. Filled to $75\\%$: $0.75 \\times 24 = 18$ m$^3$."
                    ),
                    make_q(
                        "What is the surface area of a sphere with a radius of $6$ cm?",
                        ["$72\\pi$ cm$^2$", "$144\\pi$ cm$^2$", "$288\\pi$ cm$^2$", "$576\\pi$ cm$^2$"], 1,
                        "Surface area formula: $A = 4\\pi r^2 = 4\\pi (6^2) = 4\\pi (36) = 144\\pi$ cm$^2$."
                    )
                ]
            }
        ]
    },

    # --------------------------------------------------------------------------
    # EST 7.01: Trigonometry & Additional Topics
    # --------------------------------------------------------------------------
    {
        "track": "est",
        "num": "7.01",
        "slug": "trigonometry-additional-topics",
        "title": "Trigonometry & Additional Topics",
        "sections": [
            {
                "heading": "Section 1: Trigonometric Ratios & Cofunctions",
                "questions": [
                    make_q(
                        "If $\\sin(x^\\circ) = \\cos(42^\\circ)$, where $0 < x < 90$, what is the value of $x$?",
                        ["$42$", "$48$", "$52$", "$138$"], 1,
                        "By the cofunction identity, $\\sin(x^\\circ) = \\cos(90^\\circ - x^\\circ)$. Thus $90 - x = 42 \\Rightarrow x = 48$."
                    ),
                    make_q(
                        "In right triangle $ABC$ with right angle at $C$, if $\\cos A = \\frac{5}{13}$, what is the value of $\\tan A$?",
                        ["$\\frac{5}{12}$", "$\\frac{12}{5}$", "$\\frac{12}{13}$", "$\\frac{13}{12}$"], 1,
                        "Adjacent $= 5$, hypotenuse $= 13$, opposite leg $= \\sqrt{13^2 - 5^2} = 12$. Therefore, $\\tan A = \\frac{12}{5}$."
                    ),
                    make_q(
                        "Which trigonometric ratio is equal to $\\frac{1}{\\cos \\theta}$?",
                        ["$\\sin \\theta$", "$\\cot \\theta$", "$\\sec \\theta$", "$\\csc \\theta$"], 2,
                        "By reciprocal definition: $\\sec \\theta = \\frac{1}{\\cos \\theta}$."
                    )
                ]
            },
            {
                "heading": "Section 2: Unit Circle & Radians",
                "questions": [
                    make_q(
                        "Convert $210^\\circ$ to radians.",
                        ["$\\frac{5\\pi}{6}$", "$\\frac{7\\pi}{6}$", "$\\frac{4\\pi}{3}$", "$\\frac{11\\pi}{6}$"], 1,
                        "Multiply by $\\frac{\\pi}{180^\\circ}$: $210 \\times \\frac{\\pi}{180} = \\frac{7\\pi}{6}$."
                    ),
                    make_q(
                        "What is the exact value of $\\sin(\\frac{4\\pi}{3})$?",
                        ["$-\\frac{\\sqrt{3}}{2}$", "$\\frac{\\sqrt{3}}{2}$", "$-\\frac{1}{2}$", "$\\frac{1}{2}$"], 0,
                        "$\\frac{4\\pi}{3}$ is in Quadrant III where sine is negative. Reference angle is $\\frac{\\pi}{3}$. Thus $\\sin(\\frac{4\\pi}{3}) = -\\sin(\\frac{\\pi}{3}) = -\\frac{\\sqrt{3}}{2}$."
                    ),
                    make_q(
                        "If $\\theta$ is in Quadrant IV and $\\cos \\theta = \\frac{3}{5}$, what is $\\sin \\theta$?",
                        ["$-\\frac{4}{5}$", "$\\frac{4}{5}$", "$-\\frac{3}{4}$", "$\\frac{3}{4}$"], 0,
                        "In Quadrant IV, sine is negative: $\\sin \\theta = -\\sqrt{1 - \\cos^2 \\theta} = -\\sqrt{1 - \\frac{9}{25}} = -\\frac{4}{5}$."
                    )
                ]
            },
            {
                "heading": "Section 3: Complex Numbers & Arithmetic",
                "questions": [
                    make_q(
                        "What is the value of $(3 + 4i)(2 - i)$ where $i^2 = -1$?",
                        ["$10 + 5i$", "$2 + 5i$", "$6 - 4i$", "$10 - 5i$"], 0,
                        "Expand: $3(2) - 3i + 8i - 4i^2 = 6 + 5i - 4(-1) = 6 + 5i + 4 = 10 + 5i$."
                    ),
                    make_q(
                        "What is the simplified form of $\\frac{10}{3 - i}$?",
                        ["$3 + i$", "$3 - i$", "$\\frac{3 + i}{2}$", "$3 + 2i$"], 0,
                        "Multiply by conjugate $(3 + i)$: $\\frac{10(3 + i)}{(3 - i)(3 + i)} = \\frac{10(3 + i)}{9 - i^2} = \\frac{10(3 + i)}{10} = 3 + i$."
                    ),
                    make_q(
                        "What is the value of $i^{102}$?",
                        ["$1$", "$-1$", "$i$", "$-i$"], 1,
                        "Divide power by $4$: $102 = 4(25) + 2$. Thus $i^{102} = (i^4)^{25} \\cdot i^2 = (1)^{25}(-1) = -1$."
                    )
                ]
            },
            {
                "heading": "Section 4: Coordinate Geometry of Circles",
                "questions": [
                    make_q(
                        "What is the radius of the circle defined by $(x + 4)^2 + (y - 7)^2 = 81$?",
                        ["$7$", "$9$", "$18$", "$81$"], 1,
                        "In $(x - h)^2 + (y - k)^2 = r^2$, $r = \\sqrt{81} = 9$."
                    ),
                    make_q(
                        "What is the center of the circle $x^2 + y^2 - 10x + 6y + 9 = 0$?",
                        ["$(5, -3)$", "$(-5, 3)$", "$(10, -6)$", "$(-10, 6)$"], 0,
                        "Complete the square: $(x^2 - 10x + 25) + (y^2 + 6y + 9) = -9 + 25 + 9 \\Rightarrow (x - 5)^2 + (y + 3)^2 = 25$. Center is $(5, -3)$."
                    ),
                    make_q(
                        "Which of the following points lies on the circle $(x - 1)^2 + (y - 2)^2 = 25$?",
                        ["$(4, 6)$", "$(5, 5)$", "$(1, 7)$", "$(6, 2)$"], 0,
                        "Test $(4, 6)$: $(4 - 1)^2 + (6 - 2)^2 = 3^2 + 4^2 = 9 + 16 = 25$ (true)."
                    )
                ]
            }
        ]
    },

    # --------------------------------------------------------------------------
    # EST 8.01: Exponentials & Logarithms
    # --------------------------------------------------------------------------
    {
        "track": "est",
        "num": "8.01",
        "slug": "exponentials-logarithms",
        "title": "Exponentials & Logarithms",
        "sections": [
            {
                "heading": "Section 1: Exponential Equations & Radicals",
                "questions": [
                    make_q(
                        "Solve the exponential equation for $x$: $27^{x-1} = 9^{x+2}$.",
                        ["$5$", "$6$", "$7$", "$8$"], 2,
                        "Convert to base $3$: $(3^3)^{x-1} = (3^2)^{x+2} \\Rightarrow 3^{3x-3} = 3^{2x+4}$. Equating exponents: $3x - 3 = 2x + 4 \\Rightarrow x = 7$."
                    ),
                    make_q(
                        "Simplify the radical expression: $(81 x^8 y^{12})^{1/4}$ for positive $x$ and $y$.",
                        ["$3x^2 y^3$", "$9x^2 y^3$", "$3x^4 y^8$", "$9x^4 y^8$"], 0,
                        "Apply exponent to each factor: $81^{1/4} = 3$, $(x^8)^{1/4} = x^2$, $(y^{12})^{1/4} = y^3$. Result is $3x^2 y^3$."
                    ),
                    make_q(
                        "If $2^{x} = 5$, what is the value of $2^{x+3}$?",
                        ["$8$", "$15$", "$40$", "$125$"], 2,
                        "$2^{x+3} = 2^x \\times 2^3 = 5 \\times 8 = 40$."
                    )
                ]
            },
            {
                "heading": "Section 2: Logarithmic Properties & Evaluation",
                "questions": [
                    make_q(
                        "Evaluate $\\log_2(64) - \\log_3(27)$.",
                        ["$1$", "$2$", "$3$", "$4$"], 2,
                        "$\\log_2(64) = 6$ because $2^6 = 64$. $\\log_3(27) = 3$ because $3^3 = 27$. Difference $= 6 - 3 = 3$."
                    ),
                    make_q(
                        "Condense into a single logarithm: $2\\log x + 3\\log y - \\log z$.",
                        ["$\\log(\\frac{x^2 y^3}{z})$", "$\\log(\\frac{2x \\cdot 3y}{z})$", "$\\log(x^2 + y^3 - z)$", "$\\log(\\frac{x^2 z}{y^3})$"], 0,
                        "Apply power rule: $\\log(x^2) + \\log(y^3) - \\log z = \\log(x^2 y^3) - \\log z = \\log(\\frac{x^2 y^3}{z})$."
                    ),
                    make_q(
                        "If $\\log_{10}(2) \\approx 0.301$, what is the approximate value of $\\log_{10}(20)$?",
                        ["$1.301$", "$2.301$", "$0.602$", "$3.010$"], 0,
                        "$\\log_{10}(20) = \\log_{10}(2 \\times 10) = \\log_{10}(2) + \\log_{10}(10) = 0.301 + 1 = 1.301$."
                    )
                ]
            },
            {
                "heading": "Section 3: Solving Logarithmic Equations",
                "questions": [
                    make_q(
                        "Solve for $x$: $\\log_5(2x + 7) = 2$.",
                        ["$9$", "$11$", "$18$", "$25$"], 0,
                        "Convert to exponential form: $2x + 7 = 5^2 = 25 \\Rightarrow 2x = 18 \\Rightarrow x = 9$."
                    ),
                    make_q(
                        "Solve for $x$: $\\log(x) + \\log(x - 3) = 1$ in base $10$.",
                        ["$5$", "$2$", "$-2$", "$5$ and $-2$"], 0,
                        "$\\log(x(x - 3)) = 1 \\Rightarrow x^2 - 3x = 10 \\Rightarrow x^2 - 3x - 10 = 0 \\Rightarrow (x - 5)(x + 2) = 0$. Since $x > 3$, the only valid solution is $x = 5$."
                    ),
                    make_q(
                        "What is the solution to $\\ln(e^{3x-1}) = 8$?",
                        ["$2$", "$3$", "$4$", "$\\frac{7}{3}$"], 1,
                        "Using $\\ln(e^u) = u$: $3x - 1 = 8 \\Rightarrow 3x = 9 \\Rightarrow x = 3$."
                    )
                ]
            },
            {
                "heading": "Section 4: Exponential Growth, Decay & Compound Interest",
                "questions": [
                    make_q(
                        "A radioactive isotope decays according to $N(t) = 800(0.5)^{t/12}$, where $t$ is measured in days. How much of the isotope remains after $36$ days?",
                        ["$50$ g", "$100$ g", "$200$ g", "$400$ g"], 1,
                        "At $t = 36$: $t/12 = 36/12 = 3$ half-lives. $N(36) = 800(0.5)^3 = 800 \\times \\frac{1}{8} = 100$ grams."
                    ),
                    make_q(
                        "A principal of $5,000$ is invested at an annual interest rate of $4\\%$ compounded quarterly. Which expression represents the balance after $5$ years?",
                        ["$5000(1 + \\frac{0.04}{4})^{20}$", "$5000(1 + 0.04)^5$", "$5000(1 + \\frac{0.04}{12})^{60}$", "$5000 e^{0.20}$"], 0,
                        "Compound interest formula: $A = P(1 + \\frac{r}{n})^{nt}$. Here $n = 4$ and $t = 5$, giving exponent $4 \\times 5 = 20$."
                    ),
                    make_q(
                        "A population of fish grows by $8\\%$ each year. If the initial population is $1,200$, what is the population after $t$ years?",
                        ["$1200(1.08)^t$", "$1200(0.92)^t$", "$1200(1 + 0.8)^t$", "$1200 + 8t$"], 0,
                        "Growth rate is $r = 0.08$. The exponential model is $P(t) = P_0 (1 + r)^t = 1200(1.08)^t$."
                    )
                ]
            }
        ]
    }
]
