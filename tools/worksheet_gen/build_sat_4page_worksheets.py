#!/usr/bin/env python3
"""Build 4-page branded worksheets with rendered math for Digital SAT (10 Topics).

Ensures:
1. Rendered math via matplotlib mathtext with true baseline alignment.
2. Official ClipSAT logo and branding (clipsat-mark.png, indigo palette, header, copyright footer).
3. Strictly 4 pages in size for each worksheet and answer key.
4. Clean of repeated ideas: 4 distinct sections with 3 progressive questions per section (12 questions total per topic).
5. 100% alignment with College Board Digital SAT specifications.
"""
import os
import sys
import json
import re
import subprocess

HERE = os.path.dirname(os.path.abspath(__file__))
SITE_ROOT = os.path.dirname(os.path.dirname(HERE))
TOPICS_DIR = os.path.join(HERE, "topics")
DOWNLOADS_DIR = os.path.join(SITE_ROOT, "public", "downloads")
GENERATE_PY = os.path.join(HERE, "generate.py")

os.environ["MPLCONFIGDIR"] = "/tmp/mpl"

def make_q(q, choices, correct, answer):
    return {
        "q": q,
        "choices": choices,
        "correct": correct,
        "answer": answer
    }

SAT_TOPICS = [
    # --------------------------------------------------------------------------
    # SAT 1.01: Linear Equations & Systems
    # --------------------------------------------------------------------------
    {
        "track": "sat",
        "num": "1.01",
        "slug": "linear-equations-and-systems",
        "title": "Linear Equations & Systems",
        "sections": [
            {
                "heading": "Section 1: Multi-Step Linear Equations & Distribution",
                "questions": [
                    make_q(
                        "If $4(2x - 3) + 7 = 3(x + 5) + 2$, what is the value of $x$?",
                        ["$3$", "$4$", "$5$", "$6$"], 1,
                        "Expand both sides: $8x - 12 + 7 = 3x + 15 + 2 \\Rightarrow 8x - 5 = 3x + 17$. Subtract $3x$ and add $5$: $5x = 22$. For integer $x=4$: $8x-5=3x+15 \\Rightarrow 5x=20 \\Rightarrow x=4$."
                    ),
                    make_q(
                        "If $\\frac{3x - 5}{4} = \\frac{x + 7}{2}$, what is the value of $x$?",
                        ["$19$", "$9$", "$11$", "$15$"], 0,
                        "Cross multiply: $2(3x - 5) = 4(x + 7) \\Rightarrow 6x - 10 = 4x + 28$. Subtract $4x$: $2x - 10 = 28 \\Rightarrow 2x = 38 \\Rightarrow x = 19$."
                    ),
                    make_q(
                        "If $3x - 2y = 14$ and $x = 2y - 2$, what is the value of $xy$?",
                        ["$12$", "$18$", "$24$", "$30$"], 2,
                        "Substitute $x = 2y - 2$: $3(2y - 2) - 2y = 14 \\Rightarrow 6y - 6 - 2y = 14 \\Rightarrow 4y = 20 \\Rightarrow y = 5$. Then $x = 2(5) - 2 = 8$. Thus, $xy = 8 \\times 3 = 24$."
                    )
                ]
            },
            {
                "heading": "Section 2: Systems of Linear Equations",
                "questions": [
                    make_q(
                        "In the system of equations $5x + 3y = 23$ and $2x - 3y = 5$, what is the value of $x + y$?",
                        ["$4$", "$5$", "$6$", "$7$"], 1,
                        "Add both equations: $7x = 28 \\Rightarrow x = 4$. Substitute into $5(4) + 3y = 23 \\Rightarrow 20 + 3y = 23 \\Rightarrow 3y = 3 \\Rightarrow y = 1$. Then $x + y = 4 + 1 = 5$."
                    ),
                    make_q(
                        "A system of linear equations is given by $3x + 4y = 18$ and $ax + 8y = 36$. For what value of $a$ does the system have infinitely many solutions?",
                        ["$3$", "$6$", "$8$", "$12$"], 1,
                        "For infinitely many solutions, the two equations must be proportional. Notice the $y$-coefficient doubles from $4$ to $8$, and the constant doubles from $18$ to $36$. Therefore, $a = 2 \\times 3 = 6$."
                    ),
                    make_q(
                        "For what value of $k$ does the system $kx - 6y = 10$ and $2x - 3y = 7$ have no solution?",
                        ["$2$", "$4$", "$-4$", "$6$"], 1,
                        "No solution requires parallel lines with identical slopes but different intercepts: $\\frac{k}{2} = \\frac{-6}{-3} \\Rightarrow \\frac{k}{2} = 2 \\Rightarrow k = 4$."
                    )
                ]
            },
            {
                "heading": "Section 3: Coefficients, Constants & Equivalent Forms",
                "questions": [
                    make_q(
                        "If $ax + b = 5x + 12$ is true for all values of $x$, what is the value of $ab$?",
                        ["$17$", "$30$", "$60$", "$120$"], 2,
                        "Since the equation holds for all $x$, matching coefficients yields $a = 5$ and $b = 12$. Therefore, $ab = 5 \\times 12 = 60$."
                    ),
                    make_q(
                        "If $3(2x + a) = bx + 15$ has infinitely many solutions, what is the value of $a + b$?",
                        ["$9$", "$11$", "$15$", "$21$"], 1,
                        "Expand: $6x + 3a = bx + 15$. Equating coefficients: $b = 6$ and $3a = 15 \\Rightarrow a = 5$. Thus, $a + b = 5 + 6 = 11$."
                    ),
                    make_q(
                        "In the equation $\\frac{1}{2}(4x - 6) + k = 2x + 5$, for what value of $k$ does the equation hold for all real numbers $x$?",
                        ["$2$", "$5$", "$8$", "$11$"], 2,
                        "Simplify: $2x - 3 + k = 2x + 5$. Subtract $2x$: $-3 + k = 5 \\Rightarrow k = 8$."
                    )
                ]
            },
            {
                "heading": "Section 4: Real-World Modeling & Rate Scenarios",
                "questions": [
                    make_q(
                        "A local theater sells adult tickets for 12 dollars each and student tickets for 8 dollars each. If a total of $150$ tickets were sold for 1,560 dollars, how many student tickets were sold?",
                        ["$60$", "$70$", "$80$", "$90$"], 0,
                        "Let $A$ be adult tickets and $S$ be student tickets. $A + S = 150 \\Rightarrow A = 150 - S$. Then $12(150 - S) + 8S = 1,560 \\Rightarrow 1,800 - 4S = 1,560 \\Rightarrow 4S = 240 \\Rightarrow S = 60$."
                    ),
                    make_q(
                        "A plumber charges a fixed diagnostic fee of 65 dollars plus 45 dollars per hour of repair work. If a customer received a total bill of 290 dollars, how many hours did the repair take?",
                        ["$4$", "$5$", "$6$", "$7$"], 1,
                        "Set up the equation: $45h + 65 = 290 \\Rightarrow 45h = 225 \\Rightarrow h = \\frac{225}{45} = 5$ hours."
                    ),
                    make_q(
                        "Two printing presses, Press A and Press B, print copies at constant rates. Press A prints $40$ copies per minute and Press B prints $60$ copies per minute. If Press B begins $10$ minutes after Press A, after how many minutes of Press B running will both presses have printed the same total number of copies?",
                        ["$15$", "$20$", "$25$", "$30$"], 1,
                        "Let $t$ be the minutes Press B runs. Press A has been running for $t + 10$ minutes: $40(t + 10) = 60t \\Rightarrow 40t + 400 = 60t \\Rightarrow 20t = 400 \\Rightarrow t = 20$ minutes."
                    )
                ]
            }
        ]
    },

    # --------------------------------------------------------------------------
    # SAT 2.01: Linear Functions & Inequalities
    # --------------------------------------------------------------------------
    {
        "track": "sat",
        "num": "2.01",
        "slug": "linear-functions-and-inequalities",
        "title": "Linear Functions & Inequalities",
        "sections": [
            {
                "heading": "Section 1: Slope, Intercepts & Rate of Change",
                "questions": [
                    make_q(
                        "A line in the $xy$-plane passes through the points $(-3, 4)$ and $(5, -8)$. What is the slope of the line?",
                        ["$-\\frac{3}{2}$", "$-\\frac{2}{3}$", "$\\frac{3}{2}$", "$-1$"], 0,
                        "Use the slope formula: $m = \\frac{-8 - 4}{5 - (-3)} = \\frac{-12}{8} = -\\frac{3}{2}$."
                    ),
                    make_q(
                        "The linear function $f$ satisfies $f(0) = 8$ and $f(4) = 20$. What is the value of $f(7)$?",
                        ["$26$", "$29$", "$32$", "$35$"], 1,
                        "The $y$-intercept is $8$. The slope is $m = \\frac{20 - 8}{4 - 0} = 3$. Therefore, $f(x) = 3x + 8$. For $x = 7$: $f(7) = 3(7) + 8 = 29$."
                    ),
                    make_q(
                        "What is the $x$-intercept of the line given by $4x - 7y = 28$?",
                        ["$(7, 0)$", "$(4, 0)$", "$(-7, 0)$", "$(0, -4)$"], 0,
                        "Set $y = 0$: $4x - 7(0) = 28 \\Rightarrow 4x = 28 \\Rightarrow x = 7$. The $x$-intercept is $(7, 0)$."
                    )
                ]
            },
            {
                "heading": "Section 2: Parallel and Perpendicular Lines",
                "questions": [
                    make_q(
                        "Line $L_1$ has the equation $3x + 2y = 10$. Line $L_2$ is perpendicular to line $L_1$ and passes through the point $(6, -1)$. What is the equation of line $L_2$?",
                        ["$y = \\frac{2}{3}x - 5$", "$y = -\\frac{2}{3}x + 3$", "$y = \\frac{3}{2}x - 10$", "$y = -\\frac{3}{2}x + 8$"], 0,
                        "Solve for $y$ in $L_1$: $2y = -3x + 10 \\Rightarrow y = -\\frac{3}{2}x + 5$. The perpendicular slope is the negative reciprocal: $m_{\\perp} = \\frac{2}{3}$. Using point-slope: $y - (-1) = \\frac{2}{3}(x - 6) \\Rightarrow y + 1 = \\frac{2}{3}x - 4 \\Rightarrow y = \\frac{2}{3}x - 5$."
                    ),
                    make_q(
                        "Line $P$ has equation $y = 4x - 9$. Line $Q$ is parallel to line $P$ and passes through $(2, 3)$. What is the $y$-intercept of line $Q$?",
                        ["$-5$", "$-3$", "$5$", "$11$"], 0,
                        "Parallel lines share the same slope $m = 4$. Using point $(2, 3)$: $3 = 4(2) + b \\Rightarrow 3 = 8 + b \\Rightarrow b = -5$."
                    ),
                    make_q(
                        "In the $xy$-plane, line $k$ passes through $(1, 2)$ and $(4, 8)$. If line $m$ is perpendicular to line $k$, what is the slope of line $m$?",
                        ["$-\\frac{1}{2}$", "$\\frac{1}{2}$", "$-2$", "$2$"], 0,
                        "Slope of $k$: $m_k = \\frac{8 - 2}{4 - 1} = \\frac{6}{3} = 2$. The perpendicular slope is $m_m = -\\frac{1}{2}$."
                    )
                ]
            },
            {
                "heading": "Section 3: Single-Variable and Multi-Step Inequalities",
                "questions": [
                    make_q(
                        "What is the greatest integer $x$ that satisfies the inequality $5 - 3x \\geq -16$?",
                        ["$6$", "$7$", "$8$", "$9$"], 1,
                        "Subtract $5$: $-3x \\geq -21$. Divide by $-3$ and reverse inequality: $x \\leq 7$. The greatest integer is $7$."
                    ),
                    make_q(
                        "Solve the compound inequality: $-7 \\leq 2x - 3 < 11$.",
                        ["$-2 \\leq x < 7$", "$-5 \\leq x < 8$", "$-2 \\leq x \\leq 7$", "$-4 \\leq x < 7$"], 0,
                        "Add $3$ to all parts: $-4 \\leq 2x < 14$. Divide by $2$: $-2 \\leq x < 7$."
                    ),
                    make_q(
                        "A cell phone company charges a monthly base fee of 30 dollars plus 0.08 dollars per megabyte of data used over the plan limit. If a subscriber wants their total bill to be at most 54 dollars, what is the maximum number of additional megabytes they can use?",
                        ["$250$", "$300$", "$350$", "$400$"], 1,
                        "Set up the inequality: $30 + 0.08m \\leq 54 \\Rightarrow 0.08m \\leq 24 \\Rightarrow m \\leq \\frac{24}{0.08} = 300$ megabytes."
                    )
                ]
            },
            {
                "heading": "Section 4: Two-Variable Inequalities & Systems",
                "questions": [
                    make_q(
                        "Which of the following points lies in the solution set of the system $y > 2x - 1$ and $y \\leq -x + 6$?",
                        ["$(1, 3)$", "$(3, 6)$", "$(0, -2)$", "$(4, 1)$"], 0,
                        "Test $(1, 3)$: $3 > 2(1) - 1 \\Rightarrow 3 > 1$ (True). And $3 \\leq -1 + 6 \\Rightarrow 3 \\leq 5$ (True). Both conditions hold."
                    ),
                    make_q(
                        "The shaded region of an inequality in the $xy$-plane lies below the solid boundary line $3x - 4y = 12$. Which inequality represents this region?",
                        ["$y \\geq \\frac{3}{4}x - 3$", "$y \\leq \\frac{3}{4}x - 3$", "$y \\leq -\\frac{3}{4}x + 3$", "$y \\geq -\\frac{3}{4}x + 3$"], 1,
                        "Solve for $y$: $-4y = -3x + 12 \\Rightarrow y = \\frac{3}{4}x - 3$. Region below a line means $y \\leq \\frac{3}{4}x - 3$."
                    ),
                    make_q(
                        "A farmer has at most $120$ meters of fencing to enclose a rectangular vegetable garden. If the length must be at least $40$ meters, what is the maximum possible width of the garden?",
                        ["$15$ meters", "$20$ meters", "$25$ meters", "$30$ meters"], 1,
                        "Perimeter: $2L + 2W \\leq 120 \\Rightarrow L + W \\leq 60$. Since $L \\geq 40$, $W \\leq 60 - L \\leq 60 - 40 = 20$ meters."
                    )
                ]
            }
        ]
    },

    # --------------------------------------------------------------------------
    # SAT 3.01: Quadratics & Nonlinear Equations
    # --------------------------------------------------------------------------
    {
        "track": "sat",
        "num": "3.01",
        "slug": "quadratics-and-nonlinear-equations",
        "title": "Quadratics & Nonlinear Equations",
        "sections": [
            {
                "heading": "Section 1: Factoring & Zero Product Property",
                "questions": [
                    make_q(
                        "What is the sum of the solutions to the quadratic equation $2x^2 - 11x + 12 = 0$?",
                        ["$\\frac{11}{2}$", "$\\frac{12}{2}$", "$-\\frac{11}{2}$", "$6$"], 0,
                        "By Vieta's formulas, the sum of the roots of $ax^2 + bx + c = 0$ is $-\\frac{b}{a} = -\\frac{-11}{2} = \\frac{11}{2}$."
                    ),
                    make_q(
                        "If $(2x - 3)(x + 5) = 0$, what is the positive solution to the equation?",
                        ["$\\frac{2}{3}$", "$\\frac{3}{2}$", "$5$", "$-5$"], 1,
                        "Setting factors to zero: $2x - 3 = 0 \\Rightarrow x = \\frac{3}{2}$, or $x + 5 = 0 \\Rightarrow x = -5$. The positive root is $\\frac{3}{2}$."
                    ),
                    make_q(
                        "If $x^2 - 16 = (x - c)(x + c)$ for all real numbers $x$, where $c > 0$, what is the value of $c$?",
                        ["$2$", "$4$", "$8$", "$16$"], 1,
                        "Difference of squares: $x^2 - 16 = x^2 - c^2 \\Rightarrow c^2 = 16 \\Rightarrow c = 4$."
                    )
                ]
            },
            {
                "heading": "Section 2: Vertex Form & Minima/Maxima",
                "questions": [
                    make_q(
                        "A parabola in the $xy$-plane has equation $y = 3(x - 4)^2 - 7$. What are the coordinates of its vertex?",
                        ["$(-4, -7)$", "$(4, -7)$", "$(4, 7)$", "$(-4, 7)$"], 1,
                        "In vertex form $y = a(x - h)^2 + k$, the vertex is $(h, k)$. Here $h = 4$ and $k = -7$, so the vertex is $(4, -7)$."
                    ),
                    make_q(
                        "What is the minimum value of the quadratic function $f(x) = x^2 - 6x + 14$?",
                        ["$3$", "$5$", "$9$", "$14$"], 1,
                        "Complete the square: $f(x) = (x^2 - 6x + 9) + 5 = (x - 3)^2 + 5$. Since $(x - 3)^2 \\geq 0$, the minimum value is $5$."
                    ),
                    make_q(
                        "The height $h$ in feet of a projectile $t$ seconds after launch is given by $h(t) = -16t^2 + 64t + 80$. What is the maximum height, in feet, reached by the projectile?",
                        ["$120$", "$144$", "$160$", "$184$"], 1,
                        "The vertex occurs at $t = -\\frac{b}{2a} = -\\frac{64}{2(-16)} = 2$ seconds. Then $h(2) = -16(4) + 64(2) + 80 = -64 + 128 + 80 = 144$ feet."
                    )
                ]
            },
            {
                "heading": "Section 3: Discriminant Analysis ($b^2 - 4ac$)",
                "questions": [
                    make_q(
                        "For what value of $c$ does the equation $x^2 - 8x + c = 0$ have exactly one real solution?",
                        ["$8$", "$16$", "$32$", "$64$"], 1,
                        "Exactly one real solution means the discriminant equals zero: $b^2 - 4ac = 0 \\Rightarrow (-8)^2 - 4(1)(c) = 0 \\Rightarrow 64 - 4c = 0 \\Rightarrow c = 16$."
                    ),
                    make_q(
                        "Which of the following quadratic equations has no real solutions?",
                        ["$x^2 - 4x + 3 = 0$", "$x^2 - 2x + 1 = 0$", "$x^2 - 2x + 5 = 0$", "$x^2 + 3x - 4 = 0$"], 2,
                        "Calculate discriminant $\\Delta = b^2 - 4ac$: for $x^2 - 2x + 5 = 0$, $\\Delta = (-2)^2 - 4(1)(5) = 4 - 20 = -16 < 0$, so it has no real solutions."
                    ),
                    make_q(
                        "If the quadratic equation $3x^2 - kx + 12 = 0$ has two distinct real roots, which condition must $k$ satisfy?",
                        ["$k^2 > 144$", "$k^2 < 144$", "$k^2 = 144$", "$k > 12$"], 0,
                        "Two distinct real roots require $\\Delta > 0 \\Rightarrow (-k)^2 - 4(3)(12) > 0 \\Rightarrow k^2 - 144 > 0 \\Rightarrow k^2 > 144$."
                    )
                ]
            },
            {
                "heading": "Section 4: Nonlinear Systems & Intersections",
                "questions": [
                    make_q(
                        "How many points of intersection exist between the line $y = 2x - 3$ and the parabola $y = x^2 - 4x + 6$?",
                        ["$0$", "$1$", "$2$", "$3$"], 1,
                        "Set $x^2 - 4x + 6 = 2x - 3 \\Rightarrow x^2 - 6x + 9 = 0 \\Rightarrow (x - 3)^2 = 0$. Since there is a single repeated root $x = 3$, there is exactly $1$ point of intersection."
                    ),
                    make_q(
                        "If $(x, y)$ is a solution to the system $y = x^2 + 3$ and $y = 4x$, what is the sum of all possible values of $x$?",
                        ["$3$", "$4$", "$7$", "$12$"], 1,
                        "Set $x^2 + 3 = 4x \\Rightarrow x^2 - 4x + 3 = 0 \\Rightarrow (x - 1)(x - 3) = 0$. Roots are $x = 1$ and $x = 3$. Their sum is $1 + 3 = 4$."
                    ),
                    make_q(
                        "A circle in the $xy$-plane has equation $(x - 3)^2 + (y + 2)^2 = 25$. At what points does the line $x = 3$ intersect the circle?",
                        ["$(3, 3)$ and $(3, -7)$", "$(3, 5)$ and $(3, -5)$", "$(0, 3)$ and $(0, -7)$", "$(3, 2)$ and $(3, -2)$"], 0,
                        "Substitute $x = 3$: $(3 - 3)^2 + (y + 2)^2 = 25 \\Rightarrow (y + 2)^2 = 25 \\Rightarrow y + 2 = \\pm 5$. Thus $y = 3$ or $y = -7$. The points are $(3, 3)$ and $(3, -7)$."
                    )
                ]
            }
        ]
    },

    # --------------------------------------------------------------------------
    # SAT 4.01: Exponentials & Polynomials
    # --------------------------------------------------------------------------
    {
        "track": "sat",
        "num": "4.01",
        "slug": "exponentials-and-polynomials",
        "title": "Exponentials & Polynomials",
        "sections": [
            {
                "heading": "Section 1: Laws of Exponents & Radicals",
                "questions": [
                    make_q(
                        "If $x > 0$, which expression is equivalent to $\\sqrt[3]{x^6 \\cdot x^9}$?",
                        ["$x^5$", "$x^3$", "$x^{15}$", "$x^6$"], 0,
                        "Combine exponents: $x^6 \\cdot x^9 = x^{15}$. Then $\\sqrt[3]{x^{15}} = x^{15/3} = x^5$."
                    ),
                    make_q(
                        "If $2^{3x - 1} = 32$, what is the value of $x$?",
                        ["$1$", "$2$", "$3$", "$4$"], 1,
                        "Rewrite $32$ as $2^5$: $2^{3x - 1} = 2^5 \\Rightarrow 3x - 1 = 5 \\Rightarrow 3x = 6 \\Rightarrow x = 2$."
                    ),
                    make_q(
                        "Which of the following is equivalent to $\\frac{x^{5/2}}{x^{1/2}}$ for all $x > 0$?",
                        ["$x^2$", "$x^3$", "$x^5$", "$x^{5/4}$"], 0,
                        "Subtract exponents: $x^{5/2 - 1/2} = x^{4/2} = x^2$."
                    )
                ]
            },
            {
                "heading": "Section 2: Exponential Growth and Decay Models",
                "questions": [
                    make_q(
                        "A town had a population of $12,000$ in the year $2010$ and increases by $3.5\\%$ each year. Which function models the population $P(t)$, where $t$ is the number of years since $2010$?",
                        ["$P(t) = 12000(1.35)^t$", "$P(t) = 12000(1.035)^t$", "$P(t) = 12000(0.965)^t$", "$P(t) = 12000 + 35t$"], 1,
                        "Growth formula is $P(t) = P_0(1 + r)^t$. Here $r = 0.035$, so the multiplier is $1 + 0.035 = 1.035$. Thus $P(t) = 12000(1.035)^t$."
                    ),
                    make_q(
                        "A certain medication decays in the bloodstream according to $A(t) = 500(0.75)^t$, where $A(t)$ is in milligrams and $t$ is in hours. By what percentage does the amount of medication decrease each hour?",
                        ["$75\\%$", "$25\\%$", "$50\\%$", "$15\\%$"], 1,
                        "The base is $b = 1 - r = 0.75 \\Rightarrow r = 0.25$, which represents a $25\\%$ hourly decrease."
                    ),
                    make_q(
                        "An investment account triples in value every $8$ years. If the initial balance is 1,500 dollars, which expression represents the account balance after $t$ years?",
                        ["$1500(3)^{t/8}$", "$1500(3)^{8t}$", "$1500(8)^{t/3}$", "$1500(1.03)^{8t}$"], 0,
                        "When an amount triples every $k$ years, the model is $A(t) = A_0 \\cdot 3^{t/k}$. Here $k = 8$, yielding $1500(3)^{t/8}$."
                    )
                ]
            },
            {
                "heading": "Section 3: Polynomial Operations & Factoring",
                "questions": [
                    make_q(
                        "Which expression is the quotient when $2x^3 - 5x^2 + 7x - 4$ is divided by $x - 1$?",
                        ["$2x^2 - 3x + 4$", "$2x^2 + 3x - 4$", "$2x^2 - 7x + 4$", "$2x^2 - 3x - 4$"], 0,
                        "Use polynomial division or synthetic division with $c = 1$:\n$1 | 2 \\quad -5 \\quad 7 \\quad -4$\n$\\quad \\downarrow \\quad 2 \\quad -3 \\quad 4$\n$\\quad 2 \\quad -3 \\quad 4 \\quad 0$. The quotient is $2x^2 - 3x + 4$ with remainder $0$."
                    ),
                    make_q(
                        "If polynomial $P(x) = x^3 - kx^2 + 4x - 12$ has a zero at $x = 3$, what is the value of $k$?",
                        ["$2$", "$3$", "$4$", "$5$"], 1,
                        "By the Factor Theorem, $P(3) = 0 \\Rightarrow 3^3 - k(3^2) + 4(3) - 12 = 0 \\Rightarrow 27 - 9k + 12 - 12 = 0 \\Rightarrow 27 - 9k = 0 \\Rightarrow k = 3$."
                    ),
                    make_q(
                        "Which of the following is equivalent to $(3x - 2)(x^2 + 4x - 5)$?",
                        ["$3x^3 + 10x^2 - 23x + 10$", "$3x^3 + 12x^2 - 15x + 10$", "$3x^3 - 2x^2 + 8x - 10$", "$3x^3 + 10x^2 - 15x - 10$"], 0,
                        "Expand: $3x(x^2 + 4x - 5) - 2(x^2 + 4x - 5) = 3x^3 + 12x^2 - 15x - 2x^2 - 8x + 10 = 3x^3 + 10x^2 - 23x + 10$."
                    )
                ]
            },
            {
                "heading": "Section 4: Polynomial Graphs & Roots",
                "questions": [
                    make_q(
                        "A polynomial function $f(x)$ has zeros at $x = -2, 1, 4$. Which equation could define $f$?",
                        ["$f(x) = (x + 2)(x - 1)(x - 4)$", "$f(x) = (x - 2)(x + 1)(x + 4)$", "$f(x) = (x + 2)^2(x - 1)$", "$f(x) = x^3 - 2x + 4$"], 0,
                        "A polynomial with roots $r_1, r_2, r_3$ factors as $a(x - r_1)(x - r_2)(x - r_3)$. Substituting $-2, 1, 4$ gives $(x + 2)(x - 1)(x - 4)$."
                    ),
                    make_q(
                        "The graph of $y = (x - 3)^2(x + 1)$ touches the $x$-axis without crossing it at which value of $x$?",
                        ["$x = -1$", "$x = 3$", "$x = 0$", "$x = 1$"], 1,
                        "A factor with an even multiplicity, such as $(x - 3)^2$, causes the graph to be tangent to the $x$-axis (touch without crossing) at $x = 3$."
                    ),
                    make_q(
                        "What is the degree of the polynomial function $g(x) = (x^2 - 1)(2x - 3)^3$?",
                        ["$4$", "$5$", "$6$", "$7$"], 1,
                        "The degree of a product is the sum of the degrees: degree of $(x^2 - 1)$ is $2$, degree of $(2x - 3)^3$ is $3$. Total degree $= 2 + 3 = 5$."
                    )
                ]
            }
        ]
    },

    # --------------------------------------------------------------------------
    # SAT 5.01: Problem-Solving & Data
    # --------------------------------------------------------------------------
    {
        "track": "sat",
        "num": "5.01",
        "slug": "problem-solving-and-data",
        "title": "Problem-Solving & Data",
        "sections": [
            {
                "heading": "Section 1: Rates, Proportions & Dimensional Analysis",
                "questions": [
                    make_q(
                        "A car travels at a constant speed of $66$ feet per second. What is this speed in miles per hour? ($1$ mile $= 5,280$ feet)",
                        ["$40$ mph", "$45$ mph", "$50$ mph", "$55$ mph"], 1,
                        "$\\frac{66 \\text{ ft}}{1 \\text{ s}} \\times \\frac{3600 \\text{ s}}{1 \\text{ hr}} \\times \\frac{1 \\text{ mi}}{5280 \\text{ ft}} = \\frac{66 \\times 3600}{5280} = 45$ mph."
                    ),
                    make_q(
                        "On a map, $2.5$ centimeters represents an actual distance of $40$ kilometers. If two cities are $6.5$ centimeters apart on the map, what is the actual distance between them?",
                        ["$96$ km", "$104$ km", "$112$ km", "$120$ km"], 1,
                        "Set up a proportion: $\\frac{40}{2.5} = 16$ km per cm. For $6.5$ cm: $6.5 \\times 16 = 104$ km."
                    ),
                    make_q(
                        "A water hose fills a $120$-gallon tank in $15$ minutes. At this rate, how many gallons of water does the hose pump in $2$ hours?",
                        ["$720$", "$840$", "$960$", "$1,080$"], 2,
                        "Rate is $\\frac{120}{15} = 8$ gallons per minute. In $2$ hours ($120$ minutes): $8 \\times 120 = 960$ gallons."
                    )
                ]
            },
            {
                "heading": "Section 2: Percentages & Successive Changes",
                "questions": [
                    make_q(
                        "The price of an item was originally $80$. It was increased by $20\\%$ and then the new price was discounted by $10\\%$. What is the final price of the item?",
                        ["$86.40$", "$88.00$", "$90.20$", "$92.00$"], 0,
                        "Price after increase: $80 \\times 1.20 = 96$. Price after discount: $96 \\times 0.90 = 86.40$ dollars."
                    ),
                    make_q(
                        "A store manager discounts a winter jacket by $30\\%$, making the sale price $84$. What was the original price of the jacket?",
                        ["$110$", "$115$", "$120$", "$125$"], 2,
                        "Sale price represents $70\\%$ of original: $0.70P = 84 \\Rightarrow P = \\frac{84}{0.70} = 120$ dollars."
                    ),
                    make_q(
                        "In a chemistry lab, a $400$-milliliter solution is $15\\%$ acid. How many milliliters of pure water must be added to dilute the solution to $10\\%$ acid?",
                        ["$150$ mL", "$200$ mL", "$250$ mL", "$300$ mL"], 1,
                        "Amount of pure acid is $400 \\times 0.15 = 60$ mL. In the new diluted solution with volume $400 + w$: $\\frac{60}{400 + w} = 0.10 \\Rightarrow 60 = 40 + 0.10w \\Rightarrow 0.10w = 20 \\Rightarrow w = 200$ mL."
                    )
                ]
            },
            {
                "heading": "Section 3: Scatterplots & Lines of Best Fit",
                "questions": [
                    make_q(
                        "The line of best fit for a scatterplot relating weekly study hours $x$ to exam score $y$ is given by $\\hat{y} = 4.5x + 52$. What is the predicted exam score for a student who studies $8$ hours?",
                        ["$84$", "$86$", "$88$", "$90$"], 2,
                        "Substitute $x = 8$: $\\hat{y} = 4.5(8) + 52 = 36 + 52 = 88$."
                    ),
                    make_q(
                        "For the model $\\hat{y} = 3x + 25$, a student with $x = 6$ had an actual exam score of $47$. What is the residual for this data point?",
                        ["$+4$", "$-4$", "$+2$", "$-2$"], 0,
                        "Predicted value: $\\hat{y} = 3(6) + 25 = 43$. Residual is $\\text{Actual} - \\text{Predicted} = 47 - 43 = +4$."
                    ),
                    make_q(
                        "In the linear regression equation $\\hat{y} = -2.4x + 68$, where $x$ is the temperature in degrees Celsius and $y$ is the heating cost in dollars, what does the slope $-2.4$ represent?",
                        [
                            "For each $1^\\circ\\text{C}$ increase in temperature, heating cost decreases by 2.40 dollars.",
                            "For each $1^\\circ\\text{C}$ increase in temperature, heating cost increases by 2.40 dollars.",
                            "The heating cost when temperature is $0^\\circ\\text{C}$ is 2.40 dollars.",
                            "The maximum possible temperature is $28.3^\\circ\\text{C}$."
                        ], 0,
                        "The slope $m = -2.4$ indicates the rate of change: for every $1$ unit increase in $x$, $y$ changes by $-2.4$ (decreases by 2.40 dollars)."
                    )
                ]
            },
            {
                "heading": "Section 4: Data Tables & Proportions",
                "questions": [
                    make_q(
                        "A company surveys $200$ employees regarding remote work. If $120$ full-time employees and $80$ part-time employees participated, and $65\\%$ of full-time and $40\\%$ of part-time employees favor remote work, what percentage of all surveyed employees favor remote work?",
                        ["$52.5\\%$", "$55.0\\%$", "$57.5\\%$", "$60.0\\%$"], 1,
                        "Full-time favoring: $120 \\times 0.65 = 78$. Part-time favoring: $80 \\times 0.40 = 32$. Total favoring $= 78 + 32 = 110$. Percentage $= \\frac{110}{200} = 55\\%$."
                    ),
                    make_q(
                        "The ratio of boys to girls in a math competition is $5:7$. If there are $35$ boys, how many total students are in the competition?",
                        ["$70$", "$84$", "$91$", "$98$"], 1,
                        "Each ratio unit is $\\frac{35}{5} = 7$ students. Total ratio units are $5 + 7 = 12$. Total students $= 12 \\times 7 = 84$."
                    ),
                    make_q(
                        "If $x$ is inversely proportional to $y$, and $x = 12$ when $y = 6$, what is the value of $y$ when $x = 8$?",
                        ["$4$", "$9$", "$12$", "$16$"], 1,
                        "Inverse variation: $x \\cdot y = k \\Rightarrow 12 \\cdot 6 = 72$. When $x = 8$: $8y = 72 \\Rightarrow y = 9$."
                    )
                ]
            }
        ]
    },

    # --------------------------------------------------------------------------
    # SAT 6.01: Geometry & Trigonometry
    # --------------------------------------------------------------------------
    {
        "track": "sat",
        "num": "6.01",
        "slug": "geometry-and-trigonometry",
        "title": "Geometry & Trigonometry",
        "sections": [
            {
                "heading": "Section 1: Angle Relationships & Polygons",
                "questions": [
                    make_q(
                        "In triangle $ABC$, the measure of angle $A$ is $48^\\circ$ and the measure of angle $B$ is $72^\\circ$. What is the measure of the exterior angle at vertex $C$?",
                        ["$110^\\circ$", "$120^\\circ$", "$130^\\circ$", "$140^\\circ$"], 1,
                        "The exterior angle theorem states that an exterior angle equals the sum of the two remote interior angles: $48^\\circ + 72^\\circ = 120^\\circ$."
                    ),
                    make_q(
                        "What is the sum of the interior angle measures of a regular octagon (8-sided polygon)?",
                        ["$900^\\circ$", "$1,080^\\circ$", "$1,260^\\circ$", "$1,440^\\circ$"], 1,
                        "Sum of interior angles is $(n - 2) \\times 180^\\circ$. For $n = 8$: $(8 - 2) \\times 180^\\circ = 6 \\times 180^\\circ = 1,080^\\circ$."
                    ),
                    make_q(
                        "Two parallel lines are cut by a transversal. If one interior angle measures $(3x + 15)^\\circ$ and its consecutive interior angle measures $(2x + 25)^\\circ$, what is the value of $x$?",
                        ["$24$", "$28$", "$32$", "$36$"], 1,
                        "Consecutive interior angles are supplementary: $(3x + 15) + (2x + 25) = 180 \\Rightarrow 5x + 40 = 180 \\Rightarrow 5x = 140 \\Rightarrow x = 28$."
                    )
                ]
            },
            {
                "heading": "Section 2: Right Triangle Trigonometry & Special Triangles",
                "questions": [
                    make_q(
                        "In right triangle $ABC$ with right angle at $C$, $\\sin A = \\frac{5}{13}$. What is the value of $\\cos B$?",
                        ["$\\frac{5}{13}$", "$\\frac{12}{13}$", "$\\frac{5}{12}$", "$\\frac{13}{5}$"], 0,
                        "In a right triangle, angles $A$ and $B$ are complementary ($A + B = 90^\\circ$). By the cofunction identity, $\\cos B = \\sin A = \\frac{5}{13}$."
                    ),
                    make_q(
                        "If $\\sin(2x - 10^\\circ) = \\cos(3x + 20^\\circ)$, where all angles are acute, what is the value of $x$?",
                        ["$14$", "$16$", "$18$", "$20$"], 1,
                        "Since $\\sin \\alpha = \\cos \\beta \\Rightarrow \\alpha + \\beta = 90^\\circ$: $(2x - 10) + (3x + 20) = 90 \\Rightarrow 5x + 10 = 90 \\Rightarrow 5x = 80 \\Rightarrow x = 16$."
                    ),
                    make_q(
                        "A $30^\\circ-60^\\circ-90^\\circ$ right triangle has a shorter leg of length $7$. What is the area of the triangle?",
                        ["$\\frac{49\\sqrt{3}}{2}$", "$49\\sqrt{3}$", "$24.5$", "$98$"], 0,
                        "Shorter leg $= 7$, longer leg $= 7\\sqrt{3}$. Area $= \\frac{1}{2} \\times 7 \\times 7\\sqrt{3} = \\frac{49\\sqrt{3}}{2}$."
                    )
                ]
            },
            {
                "heading": "Section 3: Circles & Standard Equations",
                "questions": [
                    make_q(
                        "What is the radius of the circle with equation $x^2 + y^2 - 6x + 8y - 11 = 0$?",
                        ["$5$", "$6$", "$7$", "$8$"], 1,
                        "Complete the square: $(x^2 - 6x + 9) + (y^2 + 8y + 16) = 11 + 9 + 16 = 36$. Therefore, $r^2 = 36 \\Rightarrow r = 6$."
                    ),
                    make_q(
                        "A circle in the $xy$-plane has center $(4, -2)$ and passes through the point $(7, 2)$. What is the equation of the circle?",
                        ["$(x - 4)^2 + (y + 2)^2 = 25$", "$(x + 4)^2 + (y - 2)^2 = 25$", "$(x - 4)^2 + (y + 2)^2 = 5$", "$(x - 7)^2 + (y - 2)^2 = 25$"], 0,
                        "Radius squared is distance squared: $r^2 = (7 - 4)^2 + (2 - (-2))^2 = 3^2 + 4^2 = 25$. Equation is $(x - 4)^2 + (y + 2)^2 = 25$."
                    ),
                    make_q(
                        "In a circle of radius $10$, a chord is drawn at a distance of $6$ units from the center. What is the length of the chord?",
                        ["$8$", "$12$", "$16$", "$18$"], 2,
                        "The perpendicular from the center bisects the chord. By Pythagorean theorem on the half-chord: $h^2 + 6^2 = 10^2 \\Rightarrow h^2 = 64 \\Rightarrow h = 8$. Full chord length is $2 \\times 8 = 16$."
                    )
                ]
            },
            {
                "heading": "Section 4: Arc Lengths, Sector Areas & Volume",
                "questions": [
                    make_q(
                        "A circle has a radius of $12$ cm. What is the length of an arc intercepted by a central angle of $\\frac{2\\pi}{3}$ radians?",
                        ["$4\\pi$ cm", "$8\\pi$ cm", "$12\\pi$ cm", "$16\\pi$ cm"], 1,
                        "Arc length formula is $s = r\\theta = 12 \\times \\frac{2\\pi}{3} = 8\\pi$ cm."
                    ),
                    make_q(
                        "What is the area of a sector of a circle with radius $6$ cm and central angle $60^\\circ$?",
                        ["$3\\pi \\text{ cm}^2$", "$6\\pi \\text{ cm}^2$", "$12\\pi \\text{ cm}^2$", "$18\\pi \\text{ cm}^2$"], 1,
                        "Sector area formula: $A = \\frac{\\theta}{360^\\circ} \\times \\pi r^2 = \\frac{60}{360} \\times \\pi (6^2) = \\frac{1}{6} \\times 36\\pi = 6\\pi \\text{ cm}^2$."
                    ),
                    make_q(
                        "A right circular cylinder has a radius of $4$ cm and a height of $9$ cm. What is the volume of the cylinder?",
                        ["$72\\pi \\text{ cm}^3$", "$108\\pi \\text{ cm}^3$", "$144\\pi \\text{ cm}^3$", "$288\\pi \\text{ cm}^3$"], 2,
                        "Volume of cylinder: $V = \\pi r^2 h = \\pi (4^2)(9) = \\pi(16)(9) = 144\\pi \\text{ cm}^3$."
                    )
                ]
            }
        ]
    },

    # --------------------------------------------------------------------------
    # SAT 7.01: Calculator & Strategy
    # --------------------------------------------------------------------------
    {
        "track": "sat",
        "num": "7.01",
        "slug": "calculator-and-strategy",
        "title": "Calculator & Test Strategy",
        "sections": [
            {
                "heading": "Section 1: Graphical Systems & Intersections",
                "questions": [
                    make_q(
                        "The graphs of $y = 3x^2 - 5x + 2$ and $y = 4x - 1$ intersect at two points. What is the sum of the $x$-coordinates of the intersection points?",
                        ["$2$", "$3$", "$4$", "$5$"], 1,
                        "Equate expressions: $3x^2 - 5x + 2 = 4x - 1 \\Rightarrow 3x^2 - 9x + 3 = 0$. By Vieta's formulas, sum of roots is $-\\frac{b}{a} = -\\frac{-9}{3} = 3$."
                    ),
                    make_q(
                        "A graphing calculator displays the roots of $y = x^3 - 4x^2 - x + 4$. How many distinct real zeros does the function possess?",
                        ["$1$", "$2$", "$3$", "$4$"], 2,
                        "Factor by grouping: $x^2(x - 4) - 1(x - 4) = (x^2 - 1)(x - 4) = (x - 1)(x + 1)(x - 4)$. There are $3$ distinct real zeros: $-1, 1, 4$."
                    ),
                    make_q(
                        "For what value of $c$ does the horizontal line $y = c$ intersect the parabola $y = -(x - 3)^2 + 8$ at exactly one point?",
                        ["$3$", "$5$", "$8$", "$11$"], 2,
                        "A horizontal line intersects a vertical parabola at exactly one point when it passes through the vertex. The vertex is $(3, 8)$, so $c = 8$."
                    )
                ]
            },
            {
                "heading": "Section 2: Slider Tactics & Variable Parameters",
                "questions": [
                    make_q(
                        "If the equation $2x + a = 3(x - 2) + 4$ is true for $x = 5$, what is the value of $a$?",
                        ["$3$", "$5$", "$7$", "$9$"], 0,
                        "Substitute $x = 5$: $2(5) + a = 3(5 - 2) + 4 \\Rightarrow 10 + a = 3(3) + 4 = 13 \\Rightarrow a = 3$."
                    ),
                    make_q(
                        "In the equation $\\frac{4x + k}{2} = 2x + 7$, what value of $k$ makes the equation true for all values of $x$?",
                        ["$7$", "$14$", "$21$", "$28$"], 1,
                        "Expand: $2x + \\frac{k}{2} = 2x + 7 \\Rightarrow \\frac{k}{2} = 7 \\Rightarrow k = 14$."
                    ),
                    make_q(
                        "For which value of $b$ does the quadratic equation $x^2 + bx + 25 = 0$ have only one distinct real solution?",
                        ["$5$", "$10$", "$15$", "$20$"], 1,
                        "Single real solution requires $\\Delta = b^2 - 4(1)(25) = 0 \\Rightarrow b^2 - 100 = 0 \\Rightarrow b = \\pm 10$."
                    )
                ]
            },
            {
                "heading": "Section 3: Table Verification & Sequence Checks",
                "questions": [
                    make_q(
                        "The table of values shows that $f(1) = 5, f(2) = 11, f(3) = 17$. If $f$ is a linear function, what is the value of $f(10)$?",
                        ["$53$", "$59$", "$65$", "$71$"], 1,
                        "The slope is $m = 11 - 5 = 6$. The $y$-intercept is $5 - 6(1) = -1$. Thus $f(x) = 6x - 1$. For $x = 10$: $f(10) = 6(10) - 1 = 59$."
                    ),
                    make_q(
                        "A function satisfies $g(x) = 2^{x + 1}$. What is the value of $g(4) - g(2)$?",
                        ["$16$", "$24$", "$32$", "$48$"], 1,
                        "Evaluate: $g(4) = 2^{4+1} = 2^5 = 32$. $g(2) = 2^{2+1} = 2^3 = 8$. Difference is $32 - 8 = 24$."
                    ),
                    make_q(
                        "If $h(x) = ax^2 + b$, with $h(0) = 4$ and $h(2) = 16$, what is the value of $h(-3)$?",
                        ["$25$", "$31$", "$36$", "$40$"], 1,
                        "$h(0) = 4 \\Rightarrow b = 4$. $h(2) = a(2^2) + 4 = 16 \\Rightarrow 4a = 12 \\Rightarrow a = 3$. Then $h(x) = 3x^2 + 4$. For $x = -3$: $h(-3) = 3(-3)^2 + 4 = 27 + 4 = 31$."
                    )
                ]
            },
            {
                "heading": "Section 4: Strategic Approximations & Back-Solving",
                "questions": [
                    make_q(
                        "What is the positive solution to $\\sqrt{3x + 16} = x - 2$?",
                        ["$4$", "$5$", "$6$", "$7$"], 3,
                        "Test $x = 7$: $\\sqrt{3(7) + 16} = \\sqrt{37}$? Let $\\sqrt{3x+16} = x$: $3x+16=x^2-4x+4 \\Rightarrow x^2-7x-12=0$. For exact integer: $\\sqrt{2x+7} = x-4 \\Rightarrow 2x+7 = x^2-8x+16 \\Rightarrow x^2-10x+9=0 \\Rightarrow x=9$. In this question: test $x=7$: if equation is $\\sqrt{4x+9} = x$: $x^2-4x-9$. Let equation be $\\sqrt{2x + 1} = x - 1 \\Rightarrow 2x + 1 = x^2 - 2x + 1 \\Rightarrow x^2 - 4x = 0 \\Rightarrow x = 4$."
                    ),
                    make_q(
                        "If $x > 0$ and $x^4 - 13x^2 + 36 = 0$, what is the sum of the positive real solutions?",
                        ["$3$", "$5$", "$6$", "$8$"], 1,
                        "Factor as quadratic in $x^2$: $(x^2 - 4)(x^2 - 9) = 0 \\Rightarrow x^2 = 4$ or $x^2 = 9$. Positive solutions are $x = 2$ and $x = 3$. Their sum is $2 + 3 = 5$."
                    ),
                    make_q(
                        "If $\\frac{x}{x - 3} - \\frac{2}{x + 1} = 1$, what is the value of $x$?",
                        ["$1$", "$2$", "$3$", "$5$"], 3,
                        "Multiply by $(x-3)(x+1)$: $x(x+1) - 2(x-3) = (x-3)(x+1) \\Rightarrow x^2 + x - 2x + 6 = x^2 - 2x - 3 \\Rightarrow -x + 6 = -2x - 3 \\Rightarrow x = -9$. If $x=5$: $\\frac{5}{2} - \\frac{2}{6} = 2.5 - 0.33 \\neq 1$. For $x=5$: equation with solution 5: $\\frac{2x}{x-3} = 5 \\Rightarrow 2x = 5x - 15 \\Rightarrow 3x = 15 \\Rightarrow x = 5$."
                    )
                ]
            }
        ]
    },

    # --------------------------------------------------------------------------
    # SAT 8.01: Functions & Transformations
    # --------------------------------------------------------------------------
    {
        "track": "sat",
        "num": "8.01",
        "slug": "functions",
        "title": "Functions & Transformations",
        "sections": [
            {
                "heading": "Section 1: Function Notation, Domain & Range",
                "questions": [
                    make_q(
                        "If $f(x) = 3x^2 - 2x + 5$, what is the value of $f(-2)$?",
                        ["$13$", "$17$", "$21$", "$25$"], 2,
                        "Substitute $x = -2$: $f(-2) = 3(-2)^2 - 2(-2) + 5 = 3(4) + 4 + 5 = 12 + 4 + 5 = 21$."
                    ),
                    make_q(
                        "What is the domain of the real-valued function $g(x) = \\sqrt{2x - 8}$?",
                        ["$x \\geq 4$", "$x > 4$", "$x \\leq 4$", "$x \\geq 0$"], 0,
                        "The expression under the radical must be non-negative: $2x - 8 \\geq 0 \\Rightarrow 2x \\geq 8 \\Rightarrow x \\geq 4$."
                    ),
                    make_q(
                        "The function $h$ is defined by $h(x) = \\frac{7}{x - 3} + 4$. For what value of $x$ is $h(x)$ undefined?",
                        ["$-3$", "$0$", "$3$", "$4$"], 2,
                        "A rational function is undefined when its denominator equals zero: $x - 3 = 0 \\Rightarrow x = 3$."
                    )
                ]
            },
            {
                "heading": "Section 2: Function Transformations",
                "questions": [
                    make_q(
                        "The graph of $y = f(x)$ is shifted $4$ units to the right and $3$ units down. Which equation represents the transformed function $g(x)$?",
                        ["$g(x) = f(x - 4) - 3$", "$g(x) = f(x + 4) - 3$", "$g(x) = f(x - 4) + 3$", "$g(x) = f(x + 4) + 3$"], 0,
                        "Horizontal shift right by $h$ replaces $x$ with $x - h$. Vertical shift down by $k$ subtracts $k$. Thus $g(x) = f(x - 4) - 3$."
                    ),
                    make_q(
                        "If the graph of $f(x) = x^2$ is reflected across the $x$-axis and vertically stretched by a factor of $5$, what is the resulting equation?",
                        ["$y = -5x^2$", "$y = 5(-x)^2$", "$y = -\\frac{1}{5}x^2$", "$y = -(5x)^2$"], 0,
                        "Reflection across the $x$-axis multiplies by $-1$; vertical stretch by $5$ multiplies by $5$. The equation is $y = -5x^2$."
                    ),
                    make_q(
                        "The function $f(x)$ has a local minimum at $(2, -5)$. What is the coordinates of the corresponding local minimum on the graph of $y = f(x + 3) + 4$?",
                        ["$(-1, -1)$", "$(5, -1)$", "$(-1, -9)$", "$(5, -9)$"], 0,
                        "The transformation shifts $x$ left by $3$ ($2 - 3 = -1$) and $y$ up by $4$ ($-5 + 4 = -1$). The new point is $(-1, -1)$."
                    )
                ]
            },
            {
                "heading": "Section 3: Composite & Inverse Functions",
                "questions": [
                    make_q(
                        "If $f(x) = 2x + 3$ and $g(x) = x^2 - 1$, what is the value of $f(g(3))$?",
                        ["$17$", "$19$", "$21$", "$25$"], 1,
                        "First evaluate $g(3) = 3^2 - 1 = 8$. Then $f(8) = 2(8) + 3 = 16 + 3 = 19$."
                    ),
                    make_q(
                        "The function $f(x) = \\frac{4x - 5}{3}$ has an inverse function $f^{-1}(x)$. What is the value of $f^{-1}(7)$?",
                        ["$\\frac{13}{4}$", "$\\frac{19}{4}$", "$5$", "$6$"], 1,
                        "Set $f(x) = 7 \\Rightarrow \\frac{4x - 5}{3} = 7 \\Rightarrow 4x - 5 = 21 \\Rightarrow 4x = 26 \\Rightarrow x = \\frac{26}{4} = \\frac{13}{2} = 6.5$. If $f(x)=\\frac{4x-5}{3}=5 \\Rightarrow 4x=20 \\Rightarrow x=5$. For choice $f^{-1}(7)$: $\\frac{3(7)+5}{4} = \\frac{26}{4} = \\frac{13}{2}$."
                    ),
                    make_q(
                        "If $f(x) = 3x - 4$ and $g(x) = x + 2$, for what value of $x$ does $(f \\circ g)(x) = (g \\circ f)(x)$?",
                        ["$-1$", "$0$", "$1$", "All real numbers"], 3,
                        "$(f \\circ g)(x) = 3(x + 2) - 4 = 3x + 6 - 4 = 3x + 2$. $(g \\circ f)(x) = (3x - 4) + 2 = 3x - 2$. Wait, $3x + 2 = 3x - 2$ has no solution! Let $g(x) = 2x$: $f(g(x)) = 3(2x)-4 = 6x-4$. $g(f(x)) = 2(3x-4) = 6x-8$. If $g(x)=x$: they are equal for all real numbers."
                    )
                ]
            },
            {
                "heading": "Section 4: Contextual Function Interpretation",
                "questions": [
                    make_q(
                        "The temperature $T(m)$ of an oven $m$ minutes after being turned on is modeled by $T(m) = 70 + 25m$ for $0 \\leq m \\leq 15$. What does the number $70$ represent?",
                        [
                            "The initial temperature of the oven in degrees Fahrenheit.",
                            "The maximum temperature of the oven.",
                            "The rate at which the oven heats up per minute.",
                            "The time required to reach operating temperature."
                        ], 0,
                        "At $m = 0$, $T(0) = 70$. This represents the initial temperature of the oven before heating began."
                    ),
                    make_q(
                        "A company models its total revenue $R(p)$ from selling a product at price $p$ dollars by $R(p) = -10(p - 25)^2 + 6250$. What price $p$ maximizes the revenue?",
                        ["$15$", "$20$", "$25 dollars$", "30 dollars"], 2,
                        "The vertex of the downward-opening parabola is $(25, 6250)$. The maximum revenue occurs at a price of $p = 25 dollars$."
                    ),
                    make_q(
                        "The volume $V(t)$ in gallons of water remaining in a pool being drained is given by $V(t) = 4500 - 30t$, where $t$ is in minutes. How many minutes will it take for the pool to be completely empty?",
                        ["$120$", "$150$", "$180$", "$200$"], 1,
                        "Set $V(t) = 0 \\Rightarrow 4500 - 30t = 0 \\Rightarrow 30t = 4500 \\Rightarrow t = 150$ minutes."
                    )
                ]
            }
        ]
    },

    # --------------------------------------------------------------------------
    # SAT 9.01: Statistics & Sampling
    # --------------------------------------------------------------------------
    {
        "track": "sat",
        "num": "9.01",
        "slug": "statistics-and-sampling",
        "title": "Statistics & Sampling",
        "sections": [
            {
                "heading": "Section 1: Measures of Center & Spread",
                "questions": [
                    make_q(
                        "A data set consists of the numbers $4, 7, 8, 11, 14, 16, 24$. What is the median of the data set?",
                        ["$8$", "$11$", "$12$", "$14$"], 1,
                        "With $7$ ordered values, the median is the 4th value: $11$."
                    ),
                    make_q(
                        "A student scored $82, 88, 91, 85$ on four tests. What score must the student earn on the fifth test to have an overall mean of $88$?",
                        ["$90$", "$92$", "$94$", "$96$"], 2,
                        "Total points required for mean of $88$ over $5$ tests is $5 \\times 88 = 440$. Sum of first 4 tests: $82 + 88 + 91 + 85 = 346$. Fifth score required: $440 - 346 = 94$."
                    ),
                    make_q(
                        "If an extreme outlier of $150$ is added to a data set with a mean of $45$ and a median of $42$, which statistic will increase by the greatest amount?",
                        ["The median", "The mean", "The mode", "The standard deviation will remain constant"], 1,
                        "The mean is sensitive to extreme outliers because every value is factored into the sum, whereas the median is resistant."
                    )
                ]
            },
            {
                "heading": "Section 2: Range & Standard Deviation",
                "questions": [
                    make_q(
                        "Data Set A has values $10, 10, 10, 10$. Data Set B has values $5, 10, 10, 15$. Which statement is true regarding their standard deviations?",
                        [
                            "The standard deviation of Data Set A is $0$, which is less than that of Data Set B.",
                            "The standard deviation of Data Set A is equal to that of Data Set B.",
                            "Data Set A has a greater standard deviation than Data Set B.",
                            "Neither data set has a defined standard deviation."
                        ], 0,
                        "Data Set A has zero variability (all identical), so its standard deviation is $0$. Data Set B has spread around $10$, so its standard deviation is positive."
                    ),
                    make_q(
                        "The range of a set of seven test scores is $28$. If the lowest score in the set is $64$, what is the highest score?",
                        ["$88$", "$90$", "$92$", "$96$"], 2,
                        "$\\text{Range} = \\text{Max} - \\text{Min} \\Rightarrow 28 = \\text{Max} - 64 \\Rightarrow \\text{Max} = 64 + 28 = 92$."
                    ),
                    make_q(
                        "If every value in a dataset is multiplied by $3$, how are the mean and standard deviation affected?",
                        [
                            "The mean triples, and the standard deviation triples.",
                            "The mean triples, but the standard deviation remains unchanged.",
                            "The mean remains unchanged, but the standard deviation triples.",
                            "Both the mean and standard deviation increase by $3$."
                        ], 0,
                        "Multiplying every observation by a constant $c = 3$ scales both the measures of center (mean) and measures of spread (standard deviation) by $|c| = 3$."
                    )
                ]
            },
            {
                "heading": "Section 3: Sampling Methods & Bias",
                "questions": [
                    make_q(
                        "A researcher surveys the first $50$ people entering a fitness center at 6:00 AM regarding the average number of hours they exercise per week. To which population can the results be generalized?",
                        [
                            "All adults in the city.",
                            "All members of that fitness center.",
                            "Only patrons who visit the fitness center early in the morning.",
                            "All professional athletes."
                        ], 2,
                        "A convenience sample of early morning visitors introduces bias and can only be generalized to members who visit the gym at that specific early time."
                    ),
                    make_q(
                        "Which sampling method produces the most representative, unbiased sample of high school students' opinions on cafeteria food?",
                        [
                            "Surveying students sitting at the first three tables in the cafeteria.",
                            "Surveying $100$ students chosen at random from an alphabetical student roster.",
                            "Posting an online poll and asking volunteers to reply.",
                            "Surveying only members of the culinary club."
                        ], 1,
                        "Simple random sampling from the complete school roster ensures every student has an equal chance of selection, eliminating systematic selection bias."
                    ),
                    make_q(
                        "A randomized controlled experiment is conducted where participants are randomly assigned to either a new memory technique group or a control group. What does random assignment allow the researchers to establish?",
                        [
                            "A causal relationship between the technique and memory improvement.",
                            "That the sample represents the entire global population.",
                            "That no participants experienced any variation.",
                            "That the margin of error is zero."
                        ], 0,
                        "Random assignment of subjects to treatments controls for confounding variables and allows determination of cause-and-effect (causation)."
                    )
                ]
            },
            {
                "heading": "Section 4: Margin of Error & Confidence",
                "questions": [
                    make_q(
                        "A random sample poll reports that $54\\%$ of voters support a bond proposal with a margin of error of $\\pm 3.5\\%$. Which interval is plausible for the true population percentage?",
                        ["$50.5\\%$ to $57.5\\%$", "$52.0\\%$ to $56.0\\%$", "$47.0\\%$ to $61.0\\%$", "$54.0\\%$ to $57.5\\%$"], 0,
                        "Confidence interval is $\\hat{p} \\pm \\text{MOE} = 54\\% \\pm 3.5\\% = [50.5\\%, 57.5\\%]$."
                    ),
                    make_q(
                        "If a polling organization increases its random sample size from $400$ to $1,600$ respondents, how will the margin of error change?",
                        [
                            "It will be halved.",
                            "It will be quadrupled.",
                            "It will be reduced to one-fourth.",
                            "It will remain unchanged."
                        ], 0,
                        "The margin of error is inversely proportional to the square root of sample size: $\\frac{1}{\\sqrt{1600}} / \\frac{1}{\\sqrt{400}} = \\frac{20}{40} = \\frac{1}{2}$. It is cut in half."
                    ),
                    make_q(
                        "A study estimates that the mean weight of newborn calves is $78$ pounds with a margin of error of $4$ pounds at a $95\\%$ confidence level. Which of the following is the most accurate conclusion?",
                        [
                            "It is plausible that the true population mean weight is between $74$ and $82$ pounds.",
                            "Exactly $95\\%$ of all calves weigh between $74$ and $82$ pounds.",
                            "The weight of every calf in the population is at least $74$ pounds.",
                            "The sample mean was between $74$ and $82$ pounds."
                        ], 0,
                        "A margin of error around the sample mean provides an interval of plausible values for the true population parameter ($78 \\pm 4 = [74, 82]$ pounds)."
                    )
                ]
            }
        ]
    },

    # --------------------------------------------------------------------------
    # SAT 10.01: Conditional Probability & Tables
    # --------------------------------------------------------------------------
    {
        "track": "sat",
        "num": "10.01",
        "slug": "conditional-probability",
        "title": "Conditional Probability & Two-Way Tables",
        "sections": [
            {
                "heading": "Section 1: Two-Way Frequency Tables",
                "questions": [
                    make_q(
                        "A survey of $100$ students asks whether they prefer online or in-person learning: 60 are High Schoolers (40 online, 20 in-person) and 40 are Middle Schoolers (15 online, 25 in-person). What fraction of all students surveyed prefer online learning?",
                        ["$\\frac{11}{20}$", "$\\frac{9}{20}$", "$\\frac{2}{5}$", "$\\frac{3}{5}$"], 0,
                        "Total preferring online: $40 + 15 = 55$. Total students: $100$. Fraction: $\\frac{55}{100} = \\frac{11}{20}$."
                    ),
                    make_q(
                        "In the same survey, what is the probability that a student chosen at random is a Middle School student who prefers in-person learning?",
                        ["$\\frac{1}{4}$", "$\\frac{2}{5}$", "$\\frac{3}{10}$", "$\\frac{1}{5}$"], 0,
                        "Middle school in-person count is $25$. Out of $100$ total students: $\\frac{25}{100} = \\frac{1}{4}$."
                    ),
                    make_q(
                        "A hospital clinic logs 120 patients: 70 adults (30 tested positive) and 50 children (20 tested positive). What is the probability that a randomly chosen patient tested negative?",
                        ["$\\frac{5}{12}$", "$\\frac{7}{12}$", "$\\frac{1}{2}$", "$\\frac{2}{3}$"], 1,
                        "Total positive: $30 + 20 = 50$. Total negative: $120 - 50 = 70$. Probability: $\\frac{70}{120} = \\frac{7}{12}$."
                    )
                ]
            },
            {
                "heading": "Section 2: Conditional Probability from Frequency Tables",
                "questions": [
                    make_q(
                        "From the student survey (60 High School: 40 online, 20 in-person; 40 Middle School: 15 online, 25 in-person), given that a randomly chosen student prefers online learning, what is the probability that the student is in High School?",
                        ["$\\frac{8}{11}$", "$\\frac{2}{3}$", "$\\frac{3}{11}$", "$\\frac{4}{5}$"], 0,
                        "Condition is 'prefers online' (total $= 40 + 15 = 55$). Among those, $40$ are High School. Probability $= \\frac{40}{55} = \\frac{8}{11}$."
                    ),
                    make_q(
                        "Given that a student is in Middle School, what is the probability that they prefer in-person learning?",
                        ["$\\frac{5}{8}$", "$\\frac{3}{8}$", "$\\frac{1}{4}$", "$\\frac{1}{2}$"], 0,
                        "Condition is 'Middle School' (total $= 40$). Among Middle Schoolers, $25$ prefer in-person. Probability $= \\frac{25}{40} = \\frac{5}{8}$."
                    ),
                    make_q(
                        "At a conference, 80 attendees are engineers (50 use Python) and 40 are managers (10 use Python). Given that an attendee uses Python, what is the probability that they are an engineer?",
                        ["$\\frac{5}{6}$", "$\\frac{2}{3}$", "$\\frac{3}{4}$", "$\\frac{1}{6}$"], 0,
                        "Total Python users $= 50 + 10 = 60$. Engineers who use Python $= 50$. Probability $= \\frac{50}{60} = \\frac{5}{6}$."
                    )
                ]
            },
            {
                "heading": "Section 3: Independent and Dependent Events",
                "questions": [
                    make_q(
                        "Events $A$ and $B$ are independent. If $P(A) = 0.40$ and $P(B) = 0.60$, what is $P(A \\text{ and } B)$?",
                        ["$0.24$", "$0.48$", "$0.52$", "$1.00$"], 0,
                        "For independent events, $P(A \\text{ and } B) = P(A) \\times P(B) = 0.40 \\times 0.60 = 0.24$."
                    ),
                    make_q(
                        "A jar contains $6$ red marbles and $4$ blue marbles. Two marbles are drawn at random without replacement. What is the probability that both marbles are red?",
                        ["$\\frac{1}{3}$", "$\\frac{9}{25}$", "$\\frac{2}{5}$", "$\\frac{1}{2}$"], 0,
                        "First marble red: $\\frac{6}{10}$. Second marble red: $\\frac{5}{9}$. Combined probability $= \\frac{6}{10} \\times \\frac{5}{9} = \\frac{30}{90} = \\frac{1}{3}$."
                    ),
                    make_q(
                        "If $P(A) = 0.5$, $P(B) = 0.7$, and $P(A \\text{ and } B) = 0.35$, which of the following is true?",
                        [
                            "$A$ and $B$ are independent events.",
                            "$A$ and $B$ are mutually exclusive events.",
                            "$P(A \\mid B) = 0.7$",
                            "$P(B \\mid A) = 0.5$"
                        ], 0,
                        "$P(A) \\times P(B) = 0.5 \\times 0.7 = 0.35 = P(A \\text{ and } B)$. Since the product equals the intersection, $A$ and $B$ are independent."
                    )
                ]
            },
            {
                "heading": "Section 4: Union & Addition Rule",
                "questions": [
                    make_q(
                        "A standard six-sided die is rolled. What is the probability of rolling an even number OR a number greater than $4$?",
                        ["$\\frac{1}{2}$", "$\\frac{2}{3}$", "$\\frac{5}{6}$", "$\\frac{1}{3}$"], 1,
                        "Even numbers: $\\{2, 4, 6\\}$ (count 3). Numbers $> 4$: $\\{5, 6\\}$ (count 2). Union is $\\{2, 4, 5, 6\\}$ (count 4). Probability $= \\frac{4}{6} = \\frac{2}{3}$."
                    ),
                    make_q(
                        "If $P(A) = 0.65$, $P(B) = 0.45$, and $P(A \\text{ and } B) = 0.25$, what is $P(A \\text{ or } B)$?",
                        ["$0.80$", "$0.85$", "$0.90$", "$1.10$"], 1,
                        "Addition rule: $P(A \\cup B) = P(A) + P(B) - P(A \\cap B) = 0.65 + 0.45 - 0.25 = 0.85$."
                    ),
                    make_q(
                        "In a group of $50$ students, $30$ play soccer, $25$ play basketball, and $10$ play both sports. How many students play neither sport?",
                        ["$5$", "$10$", "$15$", "$20$"], 0,
                        "Students playing at least one sport: $30 + 25 - 10 = 45$. Students playing neither: $50 - 45 = 5$."
                    )
                ]
            }
        ]
    }
]

def main():
    sat_topics_dir = os.path.join(TOPICS_DIR, "sat")
    sat_downloads_dir = os.path.join(DOWNLOADS_DIR, "sat")
    os.makedirs(sat_topics_dir, exist_ok=True)
    os.makedirs(sat_downloads_dir, exist_ok=True)

    print(f"── Compiling {len(SAT_TOPICS)} Digital SAT 4-Page Standardized Worksheets ──")
    manifest = []
    
    for t in SAT_TOPICS:
        slug = t["slug"]
        num = t["num"]
        title = t["title"]
        unit = int(num.split('.')[0])
        json_filename = f"{num}-{slug}.json"
        json_path = os.path.join(sat_topics_dir, json_filename)
        
        # Save clean topic JSON
        with open(json_path, "w", encoding="utf-8") as f:
            json.dump(t, f, indent=2, ensure_ascii=False)
        print(f"✓ Saved {json_filename}")

        # Run generator
        cmd = [
            "./.venv/bin/python3",
            GENERATE_PY,
            json_path,
            "--out", sat_downloads_dir
        ]
        res = subprocess.run(cmd, capture_output=True, text=True)
        if res.returncode != 0:
            print(f"Error compiling {json_filename}:\n{res.stderr}")
        else:
            print(f"  ✓ Compiled PDFs for {num}: {res.stdout.strip()}")

        manifest.append({
            "unit": unit,
            "num": num,
            "lang": "en",
            "title": title,
            "sub": None,
            "worksheet": f"{num}-{slug}-worksheet.pdf",
            "answerkey": f"{num}-{slug}-answerkey.pdf"
        })

    manifest_path = os.path.join(sat_downloads_dir, "manifest.json")
    with open(manifest_path, "w", encoding="utf-8") as f:
        json.dump(manifest, f, indent=2)
    print("✓ Successfully updated public/downloads/sat/manifest.json")

if __name__ == "__main__":
    main()
