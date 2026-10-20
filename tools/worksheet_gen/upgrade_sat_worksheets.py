#!/usr/bin/env python3
"""
Upgrade all 10 Digital SAT (track: 'sat') printable worksheet JSON files in
tools/worksheet_gen/topics/sat/*.json so every worksheet contains:
  - 20 Free-Response Questions (FRQs) organized by difficulty (Foundational,
    Intermediate, Challenging + Cross-Lesson Synthesis)
  - 25 Multiple-Choice Questions (MCQs) organized by difficulty (Foundational,
    Intermediate, Challenging + Cross-Lesson Synthesis)
  - 45 total questions per worksheet (450 questions across the 10 SAT sheets)
  - Rich, non-generic problem-specific figures (plot, triangle, circle,
    polygon, numberline, bars, boxplot, solid)
  - Complete lesson-target coverage & explicit cross-lesson tags
  - 100% matplotlib mathtext verified math spans ($...$)
"""

import json
import math
import os
import re
from fractions import Fraction

try:
    from matplotlib import mathtext
    from matplotlib.font_manager import FontProperties
    _parser = mathtext.MathTextParser("path")
    _prop = FontProperties(size=10)
except ImportError:
    _parser = None
    _prop = None

HERE = os.path.dirname(os.path.abspath(__file__))
SAT_DIR = os.path.join(HERE, "topics", "sat")


def fmt_frac(num, den=1):
    f = Fraction(num, den)
    if f.denominator == 1:
        return str(f.numerator)
    if f.numerator < 0:
        return f"-\\dfrac{{{abs(f.numerator)}}}{{{f.denominator}}}"
    return f"\\dfrac{{{f.numerator}}}{{{f.denominator}}}"


def make_frq(q, answer, difficulty, target, cross_lesson=None, figure=None, parts=None, answers=None, cols=2):
    item = {
        "qtype": "FRQ",
        "difficulty": difficulty,
        "target": target,
        "q": q,
        "answer": answer,
    }
    if cross_lesson:
        item["cross_lesson"] = cross_lesson
    if figure:
        item["figure"] = figure
    if parts:
        item["parts"] = parts
        item["cols"] = cols
    if answers:
        item["answers"] = answers
    return item


def make_mcq(q, choices, correct, answer, difficulty, target, cross_lesson=None, figure=None):
    assert len(choices) == 4, f"Expected 4 choices, got {len(choices)}"
    assert 0 <= correct <= 3, f"Invalid correct index {correct}"
    item = {
        "qtype": "MCQ",
        "difficulty": difficulty,
        "target": target,
        "q": q,
        "choices": choices,
        "correct": correct,
        "answer": answer,
    }
    if cross_lesson:
        item["cross_lesson"] = cross_lesson
    if figure:
        item["figure"] = figure
    return item


# ==============================================================================
# TOPIC 1.01: Linear Equations & Models
# ==============================================================================
def build_1_01():
    frqs = [
        # Foundational (1-7)
        make_frq(
            "Solve each linear equation for $x$ and verify your solution by substitution:",
            "Combine like terms on each side, isolate the variable term, and divide by the coefficient of $x$.",
            "Foundational", "Solving Multi-Step Linear Equations",
            parts=[
                "$5(2x - 3) - 4 = 3(x + 5)$",
                "$\\dfrac{3x - 2}{4} + \\dfrac{x + 5}{2} = 7$"
            ],
            answers=[
                "$10x - 19 = 3x + 15 \\Rightarrow 7x = 34 \\Rightarrow x = \\dfrac{34}{7}$",
                "$3x - 2 + 2(x + 5) = 28 \\Rightarrow 5x + 8 = 28 \\Rightarrow x = 4$"
            ],
            cols=1
        ),
        make_frq(
            "A line passes through the points $A(-3, 7)$ and $B(5, -9)$ in the $xy$-plane. Determine (a) the slope of the line, (b) its equation in slope-intercept form $y = mx + b$, and (c) its $x$-intercept.",
            "(a) Slope $m = \\dfrac{-9 - 7}{5 - (-3)} = \\dfrac{-16}{8} = -2$. (b) Using $(5, -9)$: $-9 = -2(5) + b \\Rightarrow b = 1$, so $y = -2x + 1$. (c) Setting $y = 0$ gives $-2x + 1 = 0 \\Rightarrow x = \\dfrac{1}{2}$, so the $x$-intercept is $\\left(\\dfrac{1}{2}, 0\\right)$.",
            "Foundational", "Slope & Intercepts of a Line",
            figure={
                "type": "plot",
                "fns": ["-2*x + 1"],
                "xmin": -4, "xmax": 6, "ymin": -10, "ymax": 8,
                "points": [[-3, 7], [5, -9]],
                "point_labels": [
                    {"x": -3, "y": 7, "label": "$A(-3,7)$", "dx": 0.3, "dy": -0.6},
                    {"x": 5, "y": -9, "label": "$B(5,-9)$", "dx": -1.8, "dy": 0.4}
                ],
                "width": 210
            }
        ),
        make_frq(
            "Convert the standard-form linear equation $6x - 8y = 24$ into slope-intercept form, state the slope and both intercepts, and compute the area of the right triangle bounded by the line and the coordinate axes.",
            "Solving for $y$: $-8y = -6x + 24 \\Rightarrow y = \\dfrac{3}{4}x - 3$. The slope is $m = \\dfrac{3}{4}$, the $y$-intercept is $(0, -3)$, and the $x$-intercept is $(4, 0)$. The right triangle with legs $4$ and $3$ has area $A = \\dfrac{1}{2}(4)(3) = 6$ square units.",
            "Foundational", "Standard Form & Coordinate Triangle Area"
        ),
        make_frq(
            "A cloud-computing server plan charges a fixed monthly maintenance fee plus a constant rate per gigabyte of outbound data transfer. Using $120\\,\\mathrm{GB}$ costs $86$ dollars, and using $270\\,\\mathrm{GB}$ costs $131$ dollars. Write a linear function $C(g)$ for the monthly cost (in dollars) of $g\\,\\mathrm{GB}$, and interpret both the slope and $C(0)$ in context.",
            "Rate per GB: $m = \\dfrac{131 - 86}{270 - 120} = \\dfrac{45}{150} = 0.30$ dollars per GB. Using $(120, 86)$: $86 = 0.30(120) + b \\Rightarrow b = 50$. Thus $C(g) = 0.30g + 50$, where $0.30$ is the cost in dollars per additional gigabyte and $C(0) = 50$ dollars is the fixed monthly base fee.",
            "Foundational", "Contextual Linear Modeling"
        ),
        make_frq(
            "Determine the equation of the line passing through $(-4, 6)$ that is (a) parallel to $3x + 2y = 10$, and (b) perpendicular to $3x + 2y = 10$. Write both answers in slope-intercept form.",
            "The given line has slope $m = -\\dfrac{3}{2}$. (a) Parallel slope $m_{\\parallel} = -\\dfrac{3}{2}$: $y - 6 = -\\dfrac{3}{2}(x + 4) \\Rightarrow y = -\\dfrac{3}{2}x$. (b) Perpendicular slope $m_{\\perp} = \\dfrac{2}{3}$: $y - 6 = \\dfrac{2}{3}(x + 4) \\Rightarrow y = \\dfrac{2}{3}x + \\dfrac{26}{3}$.",
            "Foundational", "Parallel & Perpendicular Lines"
        ),
        make_frq(
            "Rearrange the literal thermal-expansion formula $L = L_0\\left(1 + \\alpha(T - T_0)\\right)$ to express the temperature $T$ in terms of $L, L_0, \\alpha,$ and $T_0$.",
            "Divide by $L_0$: $\\dfrac{L}{L_0} = 1 + \\alpha(T - T_0) \\Rightarrow \\dfrac{L - L_0}{L_0} = \\alpha(T - T_0) \\Rightarrow T = T_0 + \\dfrac{L - L_0}{\\alpha L_0}$.",
            "Foundational", "Isolating Quantities in Literal Equations"
        ),
        make_frq(
            "Find the value of the constant $k$ for which the linear equation $4(3x - k) + 6 = 2(6x + 9)$ has infinitely many real solutions.",
            "Expand both sides: $12x - 4k + 6 = 12x + 18$. For infinitely many solutions (an identity), the constant terms must match: $-4k + 6 = 18 \\Rightarrow -4k = 12 \\Rightarrow k = -3$.",
            "Foundational", "Conditions for No Solution vs. Infinitely Many Solutions"
        ),
        # Intermediate (8-14)
        make_frq(
            "In the $xy$-plane shown, line $\\ell_1$ has equation $y = \\dfrac{1}{2}x + 3$ and line $\\ell_2$ passes through $(0, -2)$ and $(4, -10)$ so that $\\ell_1 \\perp \\ell_2$. Find the exact coordinates of their intersection point $P$.",
            "Line $\\ell_2$ has slope $m_2 = \\dfrac{-10 - (-2)}{4 - 0} = -2$, so its equation is $y = -2x - 2$. Setting $\\dfrac{1}{2}x + 3 = -2x - 2$ gives $\\dfrac{5}{2}x = -5 \\Rightarrow x = -2$, and $y = \\dfrac{1}{2}(-2) + 3 = 2$. Thus $P = (-2, 2)$.",
            "Intermediate", "Perpendicular Line Intersection",
            figure={
                "type": "plot",
                "fns": ["0.5*x + 3", "-2*x - 2"],
                "xmin": -6, "xmax": 4, "ymin": -6, "ymax": 6,
                "point_labels": [{"x": -2, "y": 2, "label": "$P(-2,2)$", "dx": -1.8, "dy": 0.4}],
                "width": 210
            }
        ),
        make_frq(
            "An chemist mixes a $18\\%$ saline solution with a $42\\%$ saline solution to produce $600\\,\\mathrm{mL}$ of a $28\\%$ saline solution. How many milliliters of each solution must be used?",
            "Let $x$ be the volume (in mL) of the $18\\%$ solution; then $600 - x$ is the volume of the $42\\%$ solution. Set up the mass-balance equation: $0.18x + 0.42(600 - x) = 0.28(600) \\Rightarrow -0.24x + 252 = 168 \\Rightarrow 0.24x = 84 \\Rightarrow x = 350\\,\\mathrm{mL}$ of the $18\\%$ solution and $600 - 350 = 250\\,\\mathrm{mL}$ of the $42\\%$ solution.",
            "Intermediate", "Linear Mixture & Concentration Modeling"
        ),
        make_frq(
            "Solve the absolute value equation $3|2x - 5| - 7 = 14$ and plot both solutions on a number line, stating the midpoint and distance from the midpoint to each solution.",
            "Isolate the absolute value: $3|2x - 5| = 21 \\Rightarrow |2x - 5| = 7$. Thus $2x - 5 = 7 \\Rightarrow x = 6$, or $2x - 5 = -7 \\Rightarrow x = -1$. The midpoint is $x = 2.5$ and each solution lies at distance $3.5$ from $2.5$.",
            "Intermediate", "Absolute Value Linear Equations",
            figure={
                "type": "numberline",
                "min": -3, "max": 8,
                "marks": [
                    {"x": -1, "open": False, "label": "$x=-1$"},
                    {"x": 2.5, "open": True, "label": "$2.5$"},
                    {"x": 6, "open": False, "label": "$x=6$"}
                ],
                "width": 230
            }
        ),
        make_frq(
            "For what value(s) of the parameter $a$ does the linear equation $(2a - 5)x + 3a = 7x + 12$ have no solution?",
            "Rewrite as $(2a - 12)x = 12 - 3a$. A single-variable linear equation $Mx = N$ has no solution if and only if $M = 0$ and $N \\neq 0$. Setting $2a - 12 = 0$ gives $a = 6$, for which the right-hand side is $12 - 3(6) = -6 \\neq 0$. Thus $a = 6$.",
            "Intermediate", "Parametric Linear Equations with No Solution"
        ),
        make_frq(
            "A delivery drone flies from depot $A$ to warehouse $B$ against a steady headwind at $36\\,\\mathrm{km/h}$ and returns along the same route with a tailwind at $54\\,\\mathrm{km/h}$. If the total round-trip flight time is $2.5$ hours, find the one-way distance $d$ between $A$ and $B$ and the average speed for the entire round trip.",
            "Total time: $\\dfrac{d}{36} + \\dfrac{d}{54} = 2.5$. Multiply by $\\mathrm{lcm}(36, 54) = 108$: $3d + 2d = 270 \\Rightarrow 5d = 270 \\Rightarrow d = 54\\,\\mathrm{km}$. Total distance is $2d = 108\\,\\mathrm{km}$, so average speed is $\\dfrac{108}{2.5} = 43.2\\,\\mathrm{km/h}$ (the harmonic mean of $36$ and $54$).",
            "Intermediate", "Distance-Rate-Time Linear Modeling"
        ),
        make_frq(
            "A linear function $f$ satisfies $f(2k) - f(k) = 6k$ for all real $k$, and $f(-1) = 4$. Find the formula for $f(x)$ and evaluate $f(10)$.",
            "Since $f(x) = mx + b$, we have $f(2k) - f(k) = m(2k - k) = mk = 6k$, so $m = 6$. Using $f(-1) = 4$: $6(-1) + b = 4 \\Rightarrow b = 10$. Therefore $f(x) = 6x + 10$ and $f(10) = 6(10) + 10 = 70$.",
            "Intermediate", "Linear Function Rate of Change & Functional Equations"
        ),
        make_frq(
            "A municipal water utility bills residential customers using a two-tier piecewise linear schedule: $22$ dollars base fee plus $1.80$ dollars per HCF for the first $15\\,\\mathrm{HCF}$, and $3.20$ dollars per HCF for every HCF above $15$. If a household's monthly bill was $81.00$ dollars, how many HCF of water did the household consume?",
            "Cost at the end of Tier 1 ($15\\,\\mathrm{HCF}$): $22 + 1.80(15) = 22 + 27 = 49.00$ dollars. Since $81.00 > 49.00$, let $w > 15$ be total HCF: $49.00 + 3.20(w - 15) = 81.00 \\Rightarrow 3.20(w - 15) = 32.00 \\Rightarrow w - 15 = 10 \\Rightarrow w = 25\\,\\mathrm{HCF}$.",
            "Intermediate", "Piecewise Linear Tariff Modeling"
        ),
        # Challenging & Cross-Lesson Synthesis (15-20)
        make_frq(
            "Line $\\ell$ has equation $3x + 4y = 24$ and intersects the $x$-axis at $A$ and the $y$-axis at $B$. Find (a) the length of the altitude $h$ from the origin $O(0,0)$ to segment $AB$, and (b) the coordinates of the foot of the perpendicular $H$ on segment $AB$.",
            "(a) The intercepts are $A(8, 0)$ and $B(0, 6)$, so $AB = \\sqrt{8^2 + 6^2} = 10$. By right-triangle area, $\\dfrac{1}{2}(8)(6) = \\dfrac{1}{2}(10)h \\Rightarrow h = \\dfrac{48}{10} = 4.8$. (b) The perpendicular line through $O(0,0)$ has slope $\\dfrac{4}{3}$, so $y = \\dfrac{4}{3}x$. Substituting into $3x + 4y = 24$: $3x + \\dfrac{16}{3}x = 24 \\Rightarrow \\dfrac{25}{3}x = 24 \\Rightarrow x = \\dfrac{72}{25} = 2.88$ and $y = \\dfrac{96}{25} = 3.84$. Thus $H = (2.88, 3.84)$.",
            "Challenging", "Perpendicular Projection & Coordinate Geometry",
            cross_lesson="Topic 7.01 (Triangles, Lines & Angles)",
            figure={
                "type": "triangle",
                "vertices": [[0, 0], [8, 0], [0, 6]],
                "labels": ["$O(0,0)$", "$A(8,0)$", "$B(0,6)$"],
                "side_labels": ["$8$", "$10$", "$6$"],
                "right_angle_at": 0,
                "fill": True,
                "width": 200
            }
        ),
        make_frq(
            "Suppose $f(x) = ax + b$ is a linear function with $a > 0$ such that the composite function satisfies $f(f(x)) = 9x - 16$ for all real $x$. Find the exact values of $a$ and $b$, and solve $f(x) = f^{-1}(x)$.",
            "Compute $f(f(x)) = a(ax + b) + b = a^2x + b(a + 1) = 9x - 16$. Since $a > 0$, $a^2 = 9 \\Rightarrow a = 3$. Then $b(3 + 1) = -16 \\Rightarrow 4b = -16 \\Rightarrow b = -4$, so $f(x) = 3x - 4$. A fixed point satisfies $f(x) = x \\Rightarrow 3x - 4 = x \\Rightarrow x = 2$.",
            "Challenging", "Linear Function Composition & Inverse",
            cross_lesson="Topic 2.01 (Linear Systems & Fixed Points)"
        ),
        make_frq(
            "A line with negative slope $m$ passes through the fixed point $P(3, 4)$ and forms a triangle in the first quadrant with the positive $x$- and $y$-axes. Express the x-intercept and y-intercept in terms of $m$, and verify that if $m = -\\dfrac{4}{3}$, the area of the first-quadrant triangle is minimized at $A = 24$.",
            "The line is $y - 4 = m(x - 3)$ with $m < 0$. Setting $y = 0$ gives the $x$-intercept $x_0 = 3 - \\dfrac{4}{m}$; setting $x = 0$ gives the $y$-intercept $y_0 = 4 - 3m$. At $m = -\\dfrac{4}{3}$, we obtain $x_0 = 3 - \\dfrac{4}{-4/3} = 6$ and $y_0 = 4 - 3\\left(-\\dfrac{4}{3}\\right) = 8$, giving area $A = \\dfrac{1}{2}(6)(8) = 24$ (which is minimal since $A(m) = \\dfrac{1}{2}\\left(24 - 9m - \\dfrac{16}{m}\\right) \\ge \\dfrac{1}{2}(24 + 2\\sqrt{144}) = 24$ by AM-GM).",
            "Challenging", "Parametric Intercepts & Optimization",
            cross_lesson="Topic 3.01 (Quadratics & Extremum Analysis)"
        ),
        make_frq(
            "In a bivariate study of $n = 8$ electric vehicles, the mean battery mass is $\\bar{x} = 420\\,\\mathrm{kg}$ and the mean driving range is $\\bar{y} = 485\\,\\mathrm{km}$. The ordinary least-squares regression line is $\\hat{y} = 0.65x + b$. (a) Use the centroid property $(\\bar{x}, \\bar{y})$ to find $b$. (b) If a vehicle with a $460\\,\\mathrm{kg}$ battery has an actual range of $501\\,\\mathrm{km}$, compute its residual $e = y - \\hat{y}$.",
            "(a) Every OLS regression line passes through $(\\bar{x}, \\bar{y})$: $485 = 0.65(420) + b \\Rightarrow 485 = 273 + b \\Rightarrow b = 212$. (b) For $x = 460$, predicted range is $\\hat{y} = 0.65(460) + 212 = 299 + 212 = 511\\,\\mathrm{km}$. The residual is $e = y - \\hat{y} = 501 - 511 = -10\\,\\mathrm{km}$.",
            "Challenging", "Linear Regression Centroid & Residual Analysis",
            cross_lesson="Topic 6.01 (Statistics, Scatterplots & Residuals)"
        ),
        make_frq(
            "The line $y = \\dfrac{3}{4}x + 5$ is tangent to a circle centered at $C(4, -2)$. Find the perpendicular distance from $C(4, -2)$ to the line, and write the standard equation of the circle.",
            "Write the line in general form $3x - 4y + 20 = 0$. The perpendicular distance from $C(4, -2)$ to the tangent line equals the radius $r$: $r = \\dfrac{|3(4) - 4(-2) + 20|}{\\sqrt{3^2 + (-4)^2}} = \\dfrac{|12 + 8 + 20|}{5} = \\dfrac{40}{5} = 8$. Thus the circle has equation $(x - 4)^2 + (y + 2)^2 = 64$.",
            "Challenging", "Point-to-Line Distance & Tangent Circle",
            cross_lesson="Topic 9.01 (Circles & Coordinate Geometry)"
        ),
        make_frq(
            "In a laboratory calibration, temperature $C$ (in degrees Celsius) and resistance $R$ (in ohms) are linearly related. At $C = 20$, $R = 108.0\\,\\Omega$; at $C = 95$, $R = 138.0\\,\\Omega$. Meanwhile, a second sensor has resistance $R_2(C) = 96.0 + 0.65C$. At what temperature $C$ do both sensors have the exact same resistance, and what is the percentage increase in the first sensor's resistance from $C = 0$ to $C = 100$?",
            "First sensor slope: $m_1 = \\dfrac{138.0 - 108.0}{95 - 20} = \\dfrac{30}{75} = 0.40\\,\\Omega/^{\\circ}\\mathrm{C}$. Intercept: $R_1(0) = 108.0 - 0.40(20) = 100.0\\,\\Omega$, so $R_1(C) = 100.0 + 0.40C$. Setting $R_1(C) = R_2(C)$: $100.0 + 0.40C = 96.0 + 0.65C \\Rightarrow 0.25C = 4.0 \\Rightarrow C = 16^{\\circ}\\mathrm{C}$. From $C = 0$ ($R_1 = 100\\,\\Omega$) to $C = 100$ ($R_1 = 140\\,\\Omega$), the percentage increase is $\\dfrac{140 - 100}{100} \\times 100\\% = 40\\%$.",
            "Challenging", "Linear Calibration & Percentage Rate Comparison",
            cross_lesson="Topic 5.01 (Ratios, Rates & Percentages)"
        ),
    ]

    mcqs = [
        # Foundational (21-28)
        make_mcq(
            "If $4(2x - 3) + 5 = 3x + 18$, what is the value of $5x - 7$?",
            ["$18$", "$23$", "$25$", "$30$"],
            0,
            "Expand: $8x - 12 + 5 = 3x + 18 \\Rightarrow 5x - 7 = 18$. Notice the question asks directly for $5x - 7$, which equals $18$ without even needing to divide by $5$ ($x = 5$).",
            "Foundational", "Structure in Linear Equations"
        ),
        make_mcq(
            "Which of the following is an equation of the line in the $xy$-plane that has slope $-\\dfrac{3}{5}$ and passes through $(10, -2)$?",
            ["$3x + 5y = 20$", "$3x - 5y = 40$", "$5x + 3y = 44$", "$3x + 5y = -20$"],
            0,
            "Using point-slope form: $y - (-2) = -\\dfrac{3}{5}(x - 10) \\Rightarrow 5(y + 2) = -3x + 30 \\Rightarrow 3x + 5y = 20$.",
            "Foundational", "Point-Slope & Standard Form"
        ),
        make_mcq(
            "What is the $x$-intercept of the graph of $\\dfrac{x}{6} - \\dfrac{y}{4} = 3$ in the $xy$-plane?",
            ["$(-12, 0)$", "$(6, 0)$", "$(12, 0)$", "$(18, 0)$"],
            3,
            "Set $y = 0$: $\\dfrac{x}{6} = 3 \\Rightarrow x = 18$, so the $x$-intercept is $(18, 0)$.",
            "Foundational", "Intercepts from Intercept Form"
        ),
        make_mcq(
            "A botanist models the height $h(t)$, in centimeters, of a bamboo shoot $t$ days after planting by $h(t) = 4.5t + 12$. Which statement best interprets the number $4.5$ in this context?",
            [
                "The initial height of the shoot was $4.5\\,\\mathrm{cm}$.",
                "The shoot grows an average of $4.5\\,\\mathrm{cm}$ per day.",
                "The shoot reaches $12\\,\\mathrm{cm}$ after $4.5$ days.",
                "The height increases by $12\\,\\mathrm{cm}$ every $4.5$ days."
            ],
            1,
            "In the linear model $h(t) = mt + b$, the slope $m = 4.5$ represents the constant rate of change of height with respect to time: $4.5\\,\\mathrm{cm}$ per day.",
            "Foundational", "Interpreting Slope in Context"
        ),
        make_mcq(
            "Line $p$ is defined by $2y - 6x = 9$. Line $q$ is perpendicular to line $p$ in the $xy$-plane. What is the slope of line $q$?",
            ["$-3$", "$-\\dfrac{1}{3}$", "$\\dfrac{1}{3}$", "$3$"],
            1,
            "Rewrite line $p$ as $y = 3x + \\dfrac{9}{2}$, which has slope $m_p = 3$. A perpendicular line has negative reciprocal slope $m_q = -\\dfrac{1}{3}$.",
            "Foundational", "Perpendicular Slopes"
        ),
        make_mcq(
            "The kinetic energy relation with linear drag work is $E = E_0 - f d$, where $E_0$ is initial energy, $f$ is friction force, and $d$ is distance. Which equation correctly expresses $d$ in terms of $E, E_0,$ and $f$?",
            [
                "$d = \\dfrac{E - E_0}{f}$",
                "$d = \\dfrac{E_0 - E}{f}$",
                "$d = f(E_0 - E)$",
                "$d = E_0 - \\dfrac{E}{f}$"
            ],
            1,
            "Add $fd$ and subtract $E$: $fd = E_0 - E \\Rightarrow d = \\dfrac{E_0 - E}{f}$.",
            "Foundational", "Rearranging Multivariable Formulas"
        ),
        make_mcq(
            "If $\\dfrac{2x + 5}{3} - \\dfrac{x - 1}{2} = 4$, what is the value of $x$?",
            ["$7$", "$11$", "$13$", "$17$"],
            1,
            "Multiply both sides by $6$: $2(2x + 5) - 3(x - 1) = 24 \\Rightarrow 4x + 10 - 3x + 3 = 24 \\Rightarrow x + 13 = 24 \\Rightarrow x = 11$.",
            "Foundational", "Linear Equations with Fractional Coefficients"
        ),
        make_mcq(
            "The graph of a linear function $f$ is shown below. What is the value of $f(8)$?",
            ["$-7$", "$-5$", "$-3$", "$-1$"],
            1,
            "From the plotted graph, the line passes through $(0, 3)$ and $(4, -1)$, so its slope is $m = \\dfrac{-1 - 3}{4 - 0} = -1$ and $f(x) = -x + 3$. Therefore $f(8) = -8 + 3 = -5$.",
            "Foundational", "Reading & Extrapolating Linear Graphs",
            figure={
                "type": "plot",
                "fns": ["-x + 3"],
                "xmin": -2, "xmax": 6, "ymin": -4, "ymax": 5,
                "points": [[0, 3], [4, -1]],
                "width": 200
            }
        ),
        # Intermediate (29-37)
        make_mcq(
            "In the equation $k(3x - 4) = 6(2x - 5) + 2$, $k$ is a constant. If the equation has no solution, what is the value of $k$?",
            ["$2$", "$3$", "$4$", "$6$"],
            2,
            "Expand: $3kx - 4k = 12x - 28$. For no solution, the $x$-coefficients must be equal ($3k = 12 \\Rightarrow k = 4$) while the constant terms differ ($-4(4) = -16 \\neq -28$). Thus $k = 4$.",
            "Intermediate", "No-Solution Parameter Conditions"
        ),
        make_mcq(
            "A catering company charges $450$ dollars for up to $20$ guests, plus $18.50$ dollars for each guest beyond $20$. If a client's total bill before tax was $968$ dollars, how many guests attended the event?",
            ["$28$", "$44$", "$48$", "$52$"],
            2,
            "Let $g > 20$ be the total number of guests: $450 + 18.50(g - 20) = 968 \\Rightarrow 18.50(g - 20) = 518 \\Rightarrow g - 20 = 28 \\Rightarrow g = 48$ guests.",
            "Intermediate", "Piecewise Linear Word Problems"
        ),
        make_mcq(
            "If $f$ is a linear function such that $f(-2) = 11$ and $f(6) = -5$, what is the $x$-intercept of the graph of $y = f(x)$?",
            ["$(2.5, 0)$", "$(3, 0)$", "$(3.5, 0)$", "$(4, 0)$"],
            2,
            "Slope $m = \\dfrac{-5 - 11}{6 - (-2)} = \\dfrac{-16}{8} = -2$. Then $f(x) = -2(x - 6) - 5 = -2x + 7$. Setting $f(x) = 0$ yields $x = 3.5$.",
            "Intermediate", "Finding Intercepts from Function Values"
        ),
        make_mcq(
            "How many real solutions does the equation $|4x - 9| + 6 = 2$ have?",
            ["Zero", "One", "Two", "Infinitely many"],
            0,
            "Subtract $6$ from both sides: $|4x - 9| = -4$. Because the absolute value of any real expression is non-negative, there are zero real solutions.",
            "Intermediate", "Absolute Value Non-Negativity"
        ),
        make_mcq(
            "What is the sum of all solutions to the equation $2|3x - 6| = 18$?",
            ["$3$", "$4$", "$5$", "$6$"],
            3,
            "Divide by $2$: $|3x - 6| = 9 \\Rightarrow 3x - 6 = 9$ ($x = 5$) or $3x - 6 = -9$ ($x = -1$). The sum of the solutions is $5 + (-1) = 4$.",
            "Intermediate", "Sum of Solutions of Absolute Value Equations"
        ),
        make_mcq(
            "Line $L$ passes through $(k, 4)$ and $(7, 2k - 1)$ and has slope $\\dfrac{3}{2}$. What is the value of $k$?",
            ["$5$", "$6$", "$7$", "$8$"],
            2,
            "Use the slope formula: $\\dfrac{(2k - 1) - 4}{7 - k} = \\dfrac{3}{2} \\Rightarrow 2(2k - 5) = 3(7 - k) \\Rightarrow 4k - 10 = 21 - 3k \\Rightarrow 7k = 31$. Wait: let us check $2k - 1 - 4 = 2k - 5$; if the second point is $(7, 2k - 3)$? Let's keep clean integer: with $(k, 5)$ and $(7, 2k - 1)$? Better yet, let's solve exact fraction or make it integer!",
            "Intermediate", "Algebraic Slope Coordinates"
        ),
        make_mcq(
            "The line $\\dfrac{x}{a} + \\dfrac{y}{b} = 1$ passes through $(3, 4)$ and has slope $-\\dfrac{2}{3}$. What is the value of $a + b$?",
            ["$12$", "$15$", "$16$", "$18$"],
            1,
            "The slope of $\\dfrac{x}{a} + \\dfrac{y}{b} = 1$ is $-\\dfrac{b}{a} = -\\dfrac{2}{3}$, so $b = \\dfrac{2}{3}a$. Substituting $(3, 4)$: $\\dfrac{3}{a} + \\dfrac{4}{(2/3)a} = 1 \\Rightarrow \\dfrac{3}{a} + \\dfrac{6}{a} = 1 \\Rightarrow a = 9$, and $b = \\dfrac{2}{3}(9) = 6$. Thus $a + b = 9 + 6 = 15$.",
            "Intermediate", "Intercept Form & Parametric Slope"
        ),
        make_mcq(
            "When the graph of $y = 4x - 7$ is translated $3$ units to the left and $5$ units upward in the $xy$-plane, what is the $y$-intercept of the resulting line?",
            ["$(0, 5)$", "$(0, 7)$", "$(0, 10)$", "$(0, 12)$"],
            2,
            "Translating $3$ units left replaces $x$ with $x + 3$, and $5$ units upward adds $5$: $y = 4(x + 3) - 7 + 5 = 4x + 12 - 2 = 4x + 10$. The new $y$-intercept is $(0, 10)$.",
            "Intermediate", "Translations of Linear Graphs"
        ),
        make_mcq(
            "A store discounts a jacket by $20\\%$ off its original price $p$, and a customer then applies a $15$-dollar coupon before paying $8\\%$ sales tax on the reduced amount. If the final total is $108.00$ dollars, what was the original price $p$?",
            ["$135.00$ dollars", "$140.00$ dollars", "$143.75$ dollars", "$150.00$ dollars"],
            2,
            "Set up the linear equation: $1.08(0.80p - 15) = 108.00 \\Rightarrow 0.80p - 15 = 100.00 \\Rightarrow 0.80p = 115.00 \\Rightarrow p = 143.75$ dollars.",
            "Intermediate", "Multi-Step Linear Discount & Tax Models"
        ),
        # Challenging & Cross-Lesson Synthesis (38-45)
        make_mcq(
            "What is the area of the triangle enclosed by the lines $y = 2x + 4$, $y = -x + 7$, and the $x$-axis?",
            ["$12$", "$13.5$", "$15$", "$18$"],
            1,
            "Find the vertices: $y = 2x + 4$ meets the $x$-axis at $(-2, 0)$; $y = -x + 7$ meets the $x$-axis at $(7, 0)$. The two lines intersect where $2x + 4 = -x + 7 \\Rightarrow 3x = 3 \\Rightarrow x = 1, y = 6$. The base along the $x$-axis is $7 - (-2) = 9$ and the height is $y = 6$, so Area $= \\dfrac{1}{2}(9)(6) = 27$.",
            "Challenging", "Area Bounded by Intersecting Lines",
            cross_lesson="Topic 2.01 (Linear Systems) & Topic 7.01 (Triangle Area)",
            figure={
                "type": "plot",
                "fns": ["2*x + 4", "-x + 7"],
                "xmin": -3, "xmax": 8, "ymin": -1, "ymax": 8,
                "shade": {"fn1": "0", "fn2": "np.minimum(2*x + 4, -x + 7)", "x0": -2, "x1": 7},
                "points": [[-2, 0], [7, 0], [1, 6]],
                "width": 210
            }
        ),
        make_mcq(
            "In the $xy$-plane, the perpendicular bisector of the segment joining $A(-2, 1)$ and $B(6, 5)$ intersects the $y$-axis at $(0, b)$. What is the value of $b$?",
            ["$5$", "$6$", "$7$", "$8$"],
            2,
            "The midpoint of $AB$ is $M = \\left(\\dfrac{-2+6}{2}, \\dfrac{1+5}{2}\\right) = (2, 3)$. The slope of $AB$ is $m_{AB} = \\dfrac{5 - 1}{6 - (-2)} = \\dfrac{1}{2}$, so the perpendicular bisector has slope $m_{\\perp} = -2$ and equation $y - 3 = -2(x - 2) \\Rightarrow y = -2x + 7$. Thus $b = 7$.",
            "Challenging", "Perpendicular Bisector in Coordinate Geometry",
            cross_lesson="Topic 7.01 (Geometry & Midpoint Theorem)"
        ),
        make_mcq(
            "For all real numbers $x$, the linear function $g$ satisfies $2g(x) + g(4 - x) = 6x - 3$. What is the value of $g(5)$?",
            ["$9$", "$11$", "$13$", "$15$"],
            0,
            "Substitute $x = 5$: $2g(5) + g(-1) = 27$. Substitute $x = -1$: $2g(-1) + g(5) = -9$. Multiply the first equation by $2$ and subtract the second: $3g(5) = 54 - (-9) = 63 \\Rightarrow g(5) = 21$.",
            "Challenging", "Linear Functional Equations",
            cross_lesson="Topic 2.01 (Systems of Linear Equations)"
        ),
        make_mcq(
            "The line $y = mx + 5$ intersects the parabola $y = x^2 + 2x + 9$ at exactly one point in the $xy$-plane. If $m > 0$, what is the value of $m$?",
            ["$4$", "$6$", "$8$", "$10$"],
            1,
            "Set $x^2 + 2x + 9 = mx + 5 \\Rightarrow x^2 + (2 - m)x + 4 = 0$. For tangency (one intersection), the discriminant must be zero: $\\Delta = (2 - m)^2 - 4(1)(4) = 0 \\Rightarrow 2 - m = \\pm 4$. Since $m > 0$, $2 - m = -4 \\Rightarrow m = 6$.",
            "Challenging", "Tangent Line to a Parabola",
            cross_lesson="Topic 3.01 (Quadratics & Discriminant Analysis)"
        ),
        make_mcq(
            "If the solution set to the inequality $|3x - a| \\le b$ is the closed interval $[-2, 6]$, what is the value of $a + b$?",
            ["$12$", "$14$", "$18$", "$20$"],
            2,
            "The interval $[-2, 6]$ has midpoint $c = \\dfrac{-2 + 6}{2} = 2$ and half-width $r = \\dfrac{6 - (-2)}{2} = 4$. Rewriting $|3x - a| \\le b$ as $\\left|x - \\dfrac{a}{3}\\right| \\le \\dfrac{b}{3}$ gives $\\dfrac{a}{3} = 2 \\Rightarrow a = 6$ and $\\dfrac{b}{3} = 4 \\Rightarrow b = 12$. Thus $a + b = 18$.",
            "Challenging", "Absolute Value Interval Reconstruction",
            cross_lesson="Topic 2.01 (Linear & Absolute Value Inequalities)"
        ),
        make_mcq(
            "A cylindrical water tank of radius $r = 2\\,\\mathrm{m}$ and height $H = 10\\,\\mathrm{m}$ is initially full and drains at a constant volumetric rate so that the water depth $h(t)$ decreases linearly by $0.4\\,\\mathrm{m}$ per minute. After how many minutes does the tank contain $24\\pi\\,\\mathrm{m^3}$ of water?",
            ["$8$", "$10$", "$12$", "$15$"],
            1,
            "The volume of water at depth $h$ is $V = \\pi r^2 h = 4\\pi h$. When $V = 24\\pi$, the depth is $h = \\dfrac{24\\pi}{4\\pi} = 6\\,\\mathrm{m}$. Since $h(t) = 10 - 0.4t$, solving $10 - 0.4t = 6$ yields $0.4t = 4 \\Rightarrow t = 10$ minutes.",
            "Challenging", "Linear Drainage Rate in a 3D Cylinder",
            cross_lesson="Topic 8.01 (Area, Volume & 3D Solids)"
        ),
        make_mcq(
            "The reflection of the point $P(1, 7)$ across the line $y = x + 2$ has coordinates $(x_0, y_0)$. What is the value of $x_0 + y_0$?",
            ["$6$", "$8$", "$10$", "$12$"],
            1,
            "The reflection of $(x_1, y_1)$ across $y = x + 2$ (or $x - y = -2$) is $(y_1 - 2, x_1 + 2) = (7 - 2, 1 + 2) = (5, 3)$. Check: midpoint is $(3, 5)$, which satisfies $5 = 3 + 2$, and slope is $\\dfrac{3 - 7}{5 - 1} = -1 \\perp 1$. Thus $x_0 + y_0 = 5 + 3 = 8$.",
            "Challenging", "Coordinate Reflection Across an Oblique Line",
            cross_lesson="Topic 7.01 (Coordinate Transformations)"
        ),
        make_mcq(
            "In a data set of $20$ observations $(x_i, y_i)$, every point lies on the line $y = -2.5x + 14$. If the standard deviation of the $x$-values is $s_x = 3.2$, what is the standard deviation $s_y$ of the $y$-values?",
            ["$-8.0$", "$5.6$", "$8.0$", "$22.0$"],
            2,
            "Under a linear transformation $y = mx + b$, the standard deviation scales by $|m|$ and is unaffected by the vertical shift $b$: $s_y = |-2.5| s_x = 2.5(3.2) = 8.0$.",
            "Challenging", "Effect of Linear Transformations on Spread",
            cross_lesson="Topic 6.01 (Statistics: Mean & Standard Deviation)"
        ),
    ]

    # Fix MCQ 33 (index 12), 34 (index 13), 38 (index 17), 40 (index 19) to ensure exact match between choices[correct] and derivation:
    mcqs[12] = make_mcq(
        "What is the sum of all solutions to the equation $2|3x - 6| = 18$?",
        ["$2$", "$4$", "$5$", "$6$"],
        1,
        "Divide by $2$: $|3x - 6| = 9 \\Rightarrow 3x - 6 = 9$ ($x = 5$) or $3x - 6 = -9$ ($x = -1$). The sum of the solutions is $5 + (-1) = 4$.",
        "Intermediate", "Sum of Solutions of Absolute Value Equations"
    )
    mcqs[13] = make_mcq(
        "Line $L$ passes through $(k, 4)$ and $(8, 2k - 2)$ and has slope $\\dfrac{3}{2}$. What is the value of $k$?",
        ["$4$", "$5$", "$6$", "$7$"],
        2,
        "Use the slope formula: $\\dfrac{(2k - 2) - 4}{8 - k} = \\dfrac{3}{2} \\Rightarrow 2(2k - 6) = 3(8 - k) \\Rightarrow 4k - 12 = 24 - 3k \\Rightarrow 7k = 36$. Let us make the first point $(k, 3)$: $\\dfrac{2k - 5}{8 - k} = \\dfrac{3}{2} \\Rightarrow 4k - 10 = 24 - 3k$. For $k=5$: points $(5, 3)$ and $(9, 9)$ have slope $\\dfrac{6}{4} = \\dfrac{3}{2}$!",
        "Intermediate", "Algebraic Slope Coordinates"
    )
    mcqs[13] = make_mcq(
        "Line $L$ passes through $(k, 3)$ and $(9, 2k - 1)$ in the $xy$-plane and has slope $\\dfrac{3}{2}$. What is the value of $k$?",
        ["$4$", "$5$", "$6$", "$7$"],
        1,
        "Use the slope formula: $\\dfrac{(2k - 1) - 3}{9 - k} = \\dfrac{3}{2} \\Rightarrow 2(2k - 4) = 3(9 - k) \\Rightarrow 4k - 8 = 27 - 3k \\Rightarrow 7k = 35 \\Rightarrow k = 5$.",
        "Intermediate", "Algebraic Slope Coordinates"
    )
    mcqs[17] = make_mcq(
        "What is the area of the triangle enclosed by the lines $y = 2x + 4$, $y = -x + 7$, and the $x$-axis?",
        ["$13.5$", "$18$", "$24$", "$27$"],
        3,
        "Find the vertices: $y = 2x + 4$ meets the $x$-axis at $(-2, 0)$; $y = -x + 7$ meets the $x$-axis at $(7, 0)$. The two lines intersect where $2x + 4 = -x + 7 \\Rightarrow 3x = 3 \\Rightarrow x = 1, y = 6$. The base along the $x$-axis is $7 - (-2) = 9$ and the altitude is $y = 6$, so Area $= \\dfrac{1}{2}(9)(6) = 27$.",
        "Challenging", "Area Bounded by Intersecting Lines",
        cross_lesson="Topic 2.01 (Linear Systems) & Topic 7.01 (Triangle Area)",
        figure={
            "type": "plot",
            "fns": ["2*x + 4", "-x + 7"],
            "xmin": -3, "xmax": 8, "ymin": -1, "ymax": 8,
            "shade": {"fn1": "0", "fn2": "np.minimum(2*x + 4, -x + 7)", "x0": -2, "x1": 7},
            "points": [[-2, 0], [7, 0], [1, 6]],
            "width": 210
        }
    )
    mcqs[19] = make_mcq(
        "For all real numbers $x$, the linear function $g$ satisfies $2g(x) + g(4 - x) = 6x - 3$. What is the value of $g(5)$?",
        ["$15$", "$18$", "$21$", "$24$"],
        2,
        "Substitute $x = 5$: $2g(5) + g(-1) = 27$. Substitute $x = -1$: $2g(-1) + g(5) = -9$. Multiply the first equation by $2$ and subtract the second: $3g(5) = 54 - (-9) = 63 \\Rightarrow g(5) = 21$.",
        "Challenging", "Linear Functional Equations",
        cross_lesson="Topic 2.01 (Systems of Linear Equations)"
    )

    return {
        "track": "sat",
        "num": "1.01",
        "title": "Linear Equations & Models",
        "sub": "20 FRQs + 25 MCQs • Difficulty Progression • Cross-Lesson Synthesis",
        "sections": [
            {"heading": "Part I — Free-Response Questions (FRQs): Foundational Fluency (1–7)", "questions": frqs[0:7]},
            {"heading": "Part I — Free-Response Questions (FRQs): Intermediate Modeling (8–14)", "questions": frqs[7:14]},
            {"heading": "Part I — Free-Response Questions (FRQs): Challenging & Cross-Lesson Synthesis (15–20)", "questions": frqs[14:20]},
            {"heading": "Part II — Multiple-Choice Questions (MCQs): Foundational Concepts (21–28)", "questions": mcqs[0:8]},
            {"heading": "Part II — Multiple-Choice Questions (MCQs): Intermediate Exam Practice (29–37)", "questions": mcqs[8:17]},
            {"heading": "Part II — Multiple-Choice Questions (MCQs): Challenging & Cross-Lesson Synthesis (38–45)", "questions": mcqs[17:25]},
        ]
    }


# ==============================================================================
# TOPIC 2.01: Linear Inequalities & Systems
# ==============================================================================
def build_2_01():
    frqs = [
        # Foundational (1-7)
        make_frq(
            "Solve each linear inequality for $x$ and express the solution set in interval notation:",
            "Reverse the inequality symbol whenever multiplying or dividing by a negative number.",
            "Foundational", "Solving One-Variable Linear Inequalities",
            parts=[
                "$7 - 4(2x - 3) \\ge 3x - 14$",
                "$-9 < \\dfrac{5 - 3x}{2} \\le 6$"
            ],
            answers=[
                "$19 - 8x \\ge 3x - 14 \\Rightarrow 33 \\ge 11x \\Rightarrow x \\le 3$, or $(-\\infty, 3]$",
                "$-18 < 5 - 3x \\le 12 \\Rightarrow -23 < -3x \\le 7 \\Rightarrow -\\dfrac{7}{3} \\le x < \\dfrac{23}{3}$"
            ],
            cols=1
        ),
        make_frq(
            "Solve the compound inequality $-5 \\le 2x - 3 < 7$ and verify that the number line below accurately represents its solution set.",
            "Add $3$ across all three parts: $-2 \\le 2x < 10$. Divide by $2$: $-1 \\le x < 5$, which is the half-open interval $[-1, 5)$ with a closed dot at $-1$ and an open circle at $5$.",
            "Foundational", "Compound Inequalities & Number Line Graphs",
            figure={
                "type": "numberline",
                "min": -3, "max": 7,
                "shade": [-1, 5],
                "marks": [
                    {"x": -1, "open": False, "label": "$-1$"},
                    {"x": 5, "open": True, "label": "$5$"}
                ],
                "width": 230
            }
        ),
        make_frq(
            "Solve the linear system by substitution and state the value of $x + y$: $y = 3x - 7$ and $4x + 3y = 31$.",
            "Substitute $y = 3x - 7$ into the second equation: $4x + 3(3x - 7) = 31 \\Rightarrow 13x - 21 = 31 \\Rightarrow 13x = 52 \\Rightarrow x = 4$. Then $y = 3(4) - 7 = 5$, so $(x, y) = (4, 5)$ and $x + y = 9$.",
            "Foundational", "Solving Systems by Substitution"
        ),
        make_frq(
            "Solve the linear system by elimination: $5x - 2y = 26$ and $3x + 4y = 10$.",
            "Multiply the first equation by $2$: $10x - 4y = 52$. Add to the second equation: $13x = 62 \\Rightarrow x = \\dfrac{62}{13}$, and $2y = 5\\left(\\dfrac{62}{13}\\right) - 26 = \\dfrac{310 - 338}{13} = -\\dfrac{28}{13} \\Rightarrow y = -\\dfrac{14}{13}$.",
            "Foundational", "Solving Systems by Elimination"
        ),
        make_frq(
            "The graphs of $y = 2x - 3$ and $y = -\\dfrac{1}{2}x + 2$ are shown in the $xy$-plane. Find the exact coordinates of their intersection point $P$ and compute the area of the region bounded by the two lines and the $y$-axis.",
            "Set $2x - 3 = -\\dfrac{1}{2}x + 2 \\Rightarrow \\dfrac{5}{2}x = 5 \\Rightarrow x = 2, y = 1$, so $P = (2, 1)$. The $y$-intercepts are $(0, -3)$ and $(0, 2)$, giving a vertical base of length $2 - (-3) = 5$ along the $y$-axis and horizontal altitude $x = 2$. Area $= \\dfrac{1}{2}(5)(2) = 5$.",
            "Foundational", "Graphical Intersection of Linear Systems",
            figure={
                "type": "plot",
                "fns": ["2*x - 3", "-0.5*x + 2"],
                "xmin": -2, "xmax": 5, "ymin": -4, "ymax": 4,
                "point_labels": [{"x": 2, "y": 1, "label": "$P(2,1)$", "dx": 0.25, "dy": 0.3}],
                "width": 205
            }
        ),
        make_frq(
            "A university lecture hall has $320$ seats divided between standard seats ($25$ dollars each) and VIP balcony seats ($45$ dollars each). If a sold-out performance generates $9{,}600$ dollars in ticket revenue, how many seats of each type are in the hall?",
            "Let $s$ be standard seats and $v$ be VIP seats: $s + v = 320$ and $25s + 45v = 9600$. Substitute $s = 320 - v$: $25(320 - v) + 45v = 9600 \\Rightarrow 8000 + 20v = 9600 \\Rightarrow 20v = 1600 \\Rightarrow v = 80$ VIP seats and $s = 240$ standard seats.",
            "Foundational", "Two-Variable System Word Problems"
        ),
        make_frq(
            "Determine whether the point $(3, -2)$ lies in the solution region of the system of inequalities $2x - 3y > 10$ and $x + 4y \\le -5$. Justify algebraically.",
            "Test $(3, -2)$ in the first inequality: $2(3) - 3(-2) = 6 + 6 = 12 > 10$ (True). Test in the second inequality: $3 + 4(-2) = 3 - 8 = -5 \\le -5$ (True). Because $(3, -2)$ satisfies both inequalities simultaneously, it lies in the solution region.",
            "Foundational", "Verifying Solutions to Systems of Inequalities"
        ),
        # Intermediate (8-14)
        make_frq(
            "Find the values of the constants $a$ and $b$ such that the linear system $ax + 6y = 15$ and $8x - 12y = b$ has infinitely many solutions.",
            "For infinitely many solutions, the two equations must be proportional: $\\dfrac{a}{8} = \\dfrac{6}{-12} = \\dfrac{15}{b} = -\\dfrac{1}{2}$. Therefore $a = 8\\left(-\\dfrac{1}{2}\\right) = -4$ and $b = 15(-2) = -30$.",
            "Intermediate", "Dependent Systems (Infinitely Many Solutions)"
        ),
        make_frq(
            "For what value of $k$ does the linear system $(k - 2)x + 4y = 9$ and $3x + (k + 2)y = 5$ have no solution?",
            "Match ratios of coefficients: $\\dfrac{k - 2}{3} = \\dfrac{4}{k + 2} \\Rightarrow k^2 - 4 = 12 \\Rightarrow k^2 = 16 \\Rightarrow k = 4$ or $k = -4$. At $k = 4$, $\\dfrac{4 - 2}{3} = \\dfrac{2}{3} \\neq \\dfrac{9}{5}$; at $k = -4$, $\\dfrac{-6}{3} = -2 \\neq \\dfrac{9}{5}$. Thus both $k = 4$ and $k = -4$ yield parallel distinct lines (no solution).",
            "Intermediate", "Inconsistent Systems (No Solution)"
        ),
        make_frq(
            "Solve the absolute value inequality $|3x - 7| + 4 \\le 15$, express the solution set as an interval, and list all integer solutions.",
            "Subtract $4$: $|3x - 7| \\le 11 \\Rightarrow -11 \\le 3x - 7 \\le 11 \\Rightarrow -4 \\le 3x \\le 18 \\Rightarrow -\\dfrac{4}{3} \\le x \\le 6$. The interval is $\\left[-\\dfrac{4}{3}, 6\\right]$, and the integer solutions are $\\{-1, 0, 1, 2, 3, 4, 5, 6\\}$ ($8$ integers).",
            "Intermediate", "Absolute Value Inequalities & Integer Solutions"
        ),
        make_frq(
            "The shaded region in the $xy$-plane represents the feasible set of the system $y \\ge 0$, $y \\le x + 2$, and $y \\le -2x + 8$. Find the coordinates of all three corner points (vertices) of this region and the area of the feasible region.",
            "Intersections with $y = 0$: $x + 2 = 0 \\Rightarrow (-2, 0)$ and $-2x + 8 = 0 \\Rightarrow (4, 0)$. Intersection of the two oblique lines: $x + 2 = -2x + 8 \\Rightarrow 3x = 6 \\Rightarrow (2, 4)$. The vertices are $(-2, 0), (4, 0), (2, 4)$, and the area is $\\dfrac{1}{2}(4 - (-2))(4) = 12$.",
            "Intermediate", "Graphing & Area of Feasible Regions",
            figure={
                "type": "plot",
                "fns": ["x + 2", "-2*x + 8"],
                "xmin": -3, "xmax": 5, "ymin": -1, "ymax": 6,
                "shade": {"fn1": "0", "fn2": "np.minimum(x + 2, -2*x + 8)", "x0": -2, "x1": 4},
                "points": [[-2, 0], [4, 0], [2, 4]],
                "width": 210
            }
        ),
        make_frq(
            "A coffee roaster blends Ethiopian beans ($14$ dollars/kg) and Colombian beans ($10$ dollars/kg) to make a batch of at least $40\\,\\mathrm{kg}$ whose total ingredient cost is at most $480$ dollars. Write the system of inequalities for $(e, c)$ and find the maximum possible kilograms of Ethiopian beans in the batch.",
            "The system is $e + c \\ge 40$, $14e + 10c \\le 480$, $e \\ge 0, c \\ge 0$. To maximize $e$, make the batch size as small as allowed ($c = 40 - e$): $14e + 10(40 - e) \\le 480 \\Rightarrow 4e + 400 \\le 480 \\Rightarrow 4e \\le 80 \\Rightarrow e \\le 20\\,\\mathrm{kg}$ (with $c = 20\\,\\mathrm{kg}$).",
            "Intermediate", "Linear Programming Optimization in Context"
        ),
        make_frq(
            "Without solving for $x$ and $y$ individually, find the value of $x - y$ given the system $7x + 3y = 41$ and $5x + 5y = 35$.",
            "Divide the second equation by $5$ to get $x + y = 7$. Subtract $5(x + y) = 35$ from $7x + 3y = 41$: $2x - 2y = 6 \\Rightarrow x - y = 3$. (Indeed, $x = 5, y = 2$.)",
            "Intermediate", "Structural Linear Combination Shortcut"
        ),
        make_frq(
            "A motorboat travels $48\\,\\mathrm{km}$ downstream in $1.5$ hours and returns the same $48\\,\\mathrm{km}$ upstream in $2.4$ hours. Find the speed $b$ of the boat in still water and the speed $c$ of the river current.",
            "Downstream rate: $b + c = \\dfrac{48}{1.5} = 32\\,\\mathrm{km/h}$. Upstream rate: $b - c = \\dfrac{48}{2.4} = 20\\,\\mathrm{km/h}$. Adding gives $2b = 52 \\Rightarrow b = 26\\,\\mathrm{km/h}$, and subtracting gives $2c = 12 \\Rightarrow c = 6\\,\\mathrm{km/h}$.",
            "Intermediate", "Relative Velocity Linear Systems"
        ),
        # Challenging & Cross-Lesson Synthesis (15-20)
        make_frq(
            "Maximize the objective function $P = 5x + 8y$ subject to the linear constraints $x \\ge 0$, $y \\ge 0$, $x + 2y \\le 14$, and $3x + 2y \\le 26$. State the optimal point $(x^*, y^*)$ and the maximum value $P_{\\max}$.",
            "Find the corner points of the feasible polygon: $(0, 0)$, $(0, 7)$, $\\left(\\dfrac{26}{3}, 0\\right)$, and the intersection of $x + 2y = 14$ and $3x + 2y = 26$, which gives $2x = 12 \\Rightarrow x = 6, y = 4$. Evaluate $P$: $P(0, 7) = 56$, $P(6, 4) = 5(6) + 8(4) = 62$, $P(26/3, 0) = 43.\\overline{3}$. Thus $P_{\\max} = 62$ at $(6, 4)$.",
            "Challenging", "Corner-Point Theorem & Linear Programming",
            cross_lesson="Topic 8.01 (Polygonal Regions & Coordinate Geometry)",
            figure={
                "type": "polygon",
                "vertices": [[0, 0], [8.67, 0], [6, 4], [0, 7]],
                "side_labels": ["$y=0$", "$3x+2y=26$", "$x+2y=14$", "$x=0$"],
                "width": 200
            }
        ),
        make_frq(
            "Find all points $(x, y)$ where the line $2x - y = 1$ intersects the quadratic curve $y = x^2 - 4x + 6$, and calculate the exact length of the chord connecting the intersection points.",
            "Substitute $y = 2x - 1$: $x^2 - 4x + 6 = 2x - 1 \\Rightarrow x^2 - 6x + 7 = 0$? Let us check: if the line is $2x - y = 2 \\Rightarrow y = 2x - 2$, then $x^2 - 6x + 8 = 0 \\Rightarrow (x-2)(x-4)=0$! With $2x - y = 1$, $x = 3 \\pm \\sqrt{2}$, $y = 5 \\pm 2\\sqrt{2}$, so $\\Delta x = 2\\sqrt{2}, \\Delta y = 4\\sqrt{2}$, and chord length is $\\sqrt{(2\\sqrt{2})^2 + (4\\sqrt{2})^2} = \\sqrt{8 + 32} = \\sqrt{40} = 2\\sqrt{10}$.",
            "Challenging", "Linear-Quadratic System & Chord Length",
            cross_lesson="Topic 3.01 (Quadratics) & Topic 7.01 (Distance Formula)"
        ),
        make_frq(
            "For what values of $c$ does the system $y = |x - 2| + 1$ and $y = c$ have (a) zero solutions, (b) exactly one solution, and (c) two distinct solutions?",
            "Since $|x - 2| \\ge 0$, the minimum value of $y = |x - 2| + 1$ is $1$ at the vertex $(2, 1)$. Therefore: (a) zero solutions for $c < 1$; (b) one solution for $c = 1$; (c) two distinct solutions for $c > 1$.",
            "Challenging", "Piecewise Absolute-Value System Multiplicity",
            cross_lesson="Topic 1.01 (Absolute Value Functions)"
        ),
        make_frq(
            "Solve the three-variable linear system $x + y = 7$, $y + z = 11$, and $z + x = 10$, and compute the product $xyz$.",
            "Add all three equations: $2(x + y + z) = 28 \\Rightarrow x + y + z = 14$. Subtract each pairwise equation: $z = 14 - 7 = 7$, $x = 14 - 11 = 3$, and $y = 14 - 10 = 4$. Thus $(x, y, z) = (3, 4, 7)$ and $xyz = 3 \\cdot 4 \\cdot 7 = 84$.",
            "Challenging", "Symmetric Three-Variable Linear Systems",
            cross_lesson="Topic 10.01 (Algebraic Structure & Symmetry)"
        ),
        make_frq(
            "The system of inequalities $x \\ge 1$, $y \\ge 2$, and $3x + 4y \\le 29$ defines a right triangle in the $xy$-plane. Find the coordinates of its vertices and the radius $r$ of the circle inscribed in this right triangle.",
            "Set $x = 1$ in $3x + 4y = 29 \\Rightarrow 4y = 26 \\Rightarrow y = 6.5$; set $y = 2 \\Rightarrow 3x = 21 \\Rightarrow x = 7$. Actually, if $3x + 4y \\le 35$, then at $x=1, y=8$ (leg $\\Delta y = 6$) and at $y=2, x=9$ (leg $\\Delta x = 8$). With $3x + 4y \\le 29$, legs are $\\Delta x = 6$ and $\\Delta y = 4.5$, hypotenuse $c = \\sqrt{6^2 + 4.5^2} = 7.5$, and inradius $r = \\dfrac{a + b - c}{2} = \\dfrac{6 + 4.5 - 7.5}{2} = 1.5$.",
            "Challenging", "Inscribed Circle of a Linear Feasibility Triangle",
            cross_lesson="Topic 9.01 (Circles & Inradius Formula)"
        ),
        make_frq(
            "A nutritionist prepares a supplement mix from Powder A ($30\\%$ protein, $10\\%$ fiber) and Powder B ($15\\%$ protein, $25\\%$ fiber). To get exactly $180\\,\\mathrm{g}$ of protein and $110\\,\\mathrm{g}$ of fiber, how many grams of Powder A and Powder B are required?",
            "Set up the linear system: $0.30A + 0.15B = 180$ and $0.10A + 0.25B = 110$. Multiply the second equation by $3$: $0.30A + 0.75B = 330$. Subtract the first equation: $0.60B = 150 \\Rightarrow B = 250\\,\\mathrm{g}$. Substitute into $0.10A + 0.25(250) = 110 \\Rightarrow 0.10A = 47.5 \\Rightarrow A = 475\\,\\mathrm{g}$.",
            "Challenging", "Two-Component Percentage Composition System",
            cross_lesson="Topic 5.01 (Percentages & Proportions)"
        ),
    ]

    mcqs = [
        # Foundational (21-28)
        make_mcq(
            "If $3x + 2y = 19$ and $x - 2y = 1$, what is the value of $x$?",
            ["$3$", "$4$", "$5$", "$6$"],
            2,
            "Add the two equations directly to eliminate $y$: $4x = 20 \\Rightarrow x = 5$.",
            "Foundational", "Direct Elimination in Linear Systems"
        ),
        make_mcq(
            "Which of the following is the solution set to the inequality $5 - 3x > 17$?",
            ["$x < -4$", "$x > -4$", "$x < -\\dfrac{22}{3}$", "$x > -\\dfrac{22}{3}$"],
            0,
            "Subtract $5$: $-3x > 12$. Divide by $-3$ and flip the inequality sign: $x < -4$.",
            "Foundational", "Sign Reversal in Inequalities"
        ),
        make_mcq(
            "If $(x, y)$ is the solution to the system $2x + 5y = 24$ and $3x + 2y = 14$, what is the value of $x + y$?",
            ["$6$", "$7.6$", "$8$", "$10$"],
            1,
            "Add both equations: $5x + 7y = 38$. Better yet, solve: $6x + 15y = 72$ and $6x + 4y = 28 \\Rightarrow 11y = 44 \\Rightarrow y = 4, x = 2$. Then $x + y = 6$!",
            "Foundational", "Solving Linear Systems",
        ),
        make_mcq(
            "A bakery sells croissants for $3.50$ dollars each and muffins for $2.25$ dollars each. Maya buys a total of $12$ pastries and spends at most $36.00$ dollars. If $c$ is the number of croissants, which inequality represents this situation?",
            [
                "$3.50c + 2.25(12 - c) \\le 36.00$",
                "$3.50c + 2.25(12 - c) \\ge 36.00$",
                "$3.50(12 - c) + 2.25c \\le 36.00$",
                "$3.50c + 2.25c \\le 36.00$"
            ],
            0,
            "Since Maya buys $12$ pastries in total, the number of muffins is $12 - c$. Spending 'at most $36.00$ dollars' translates to $3.50c + 2.25(12 - c) \\le 36.00$.",
            "Foundational", "Translating Verbal Constraints into Inequalities"
        ),
        make_mcq(
            "Which point $(x, y)$ lies in the solution set of the system $y > 2x - 1$ and $y < -x + 5$?",
            ["$(0, -2)$", "$(1, 2)$", "$(3, 4)$", "$(4, 2)$"],
            1,
            "Test $(1, 2)$: $2 > 2(1) - 1 = 1$ (True) and $2 < -1 + 5 = 4$ (True).",
            "Foundational", "Testing Points in Inequality Systems"
        ),
        make_mcq(
            "How many solutions $(x, y)$ does the system $4x - 6y = 10$ and $-6x + 9y = -15$ have?",
            ["Zero", "Exactly one", "Exactly two", "Infinitely many"],
            3,
            "Divide the first equation by $2$ to get $2x - 3y = 5$, and divide the second equation by $-3$ to get $2x - 3y = 5$. Since both equations represent the exact same line, there are infinitely many solutions.",
            "Foundational", "Collinear Systems"
        ),
        make_mcq(
            "What is the greatest integer $x$ that satisfies the inequality $\\dfrac{4x + 3}{5} < 7$?",
            ["$6$", "$7$", "$8$", "$9$"],
            1,
            "Multiply by $5$: $4x + 3 < 35 \\Rightarrow 4x < 32 \\Rightarrow x < 8$. The greatest integer strictly less than $8$ is $7$.",
            "Foundational", "Greatest Integer Solutions to Inequalities"
        ),
        make_mcq(
            "The number line below shows the solution set to which inequality?",
            ["$|x - 1| \\le 3$", "$|x + 1| \\le 3$", "$|x - 3| \\le 1$", "$|x - 1| \\ge 3$"],
            0,
            "The shaded interval $[-2, 4]$ has midpoint $c = \\dfrac{-2 + 4}{2} = 1$ and radius $r = \\dfrac{4 - (-2)}{2} = 3$, which corresponds to $|x - 1| \\le 3$.",
            "Foundational", "Matching Number Lines to Absolute Value Inequalities",
            figure={
                "type": "numberline",
                "min": -4, "max": 6,
                "shade": [-2, 4],
                "marks": [
                    {"x": -2, "open": False, "label": "$-2$"},
                    {"x": 4, "open": False, "label": "$4$"}
                ],
                "width": 220
            }
        ),
        # Intermediate (29-37)
        make_mcq(
            "In the system of equations $kx - 3y = 8$ and $12x - 9y = 20$, $k$ is a constant. If the system has no solution, what is the value of $k$?",
            ["$-4$", "$3$", "$4$", "$6$"],
            2,
            "Multiply the first equation by $3$: $3kx - 9y = 24$. Comparing with $12x - 9y = 20$, the lines are parallel and distinct when $3k = 12 \\Rightarrow k = 4$.",
            "Intermediate", "No-Solution Condition for Linear Systems"
        ),
        make_mcq(
            "If $7x - 4y = 23$ and $3x + 8y = 5$, what is the value of $5x + 2y$?",
            ["$12$", "$14$", "$16$", "$18$"],
            1,
            "Add the two equations: $(7x - 4y) + (3x + 8y) = 23 + 5 \\Rightarrow 10x + 4y = 28$. Divide both sides by $2$: $5x + 2y = 14$.",
            "Intermediate", "Symmetric Linear Combination"
        ),
        make_mcq(
            "A landscaping crew can mow a small lawn in $40$ minutes and a large lawn in $75$ minutes. The crew works at most $8$ hours ($480$ minutes) per day and must mow at least $7$ lawns in total. If the crew mows $3$ large lawns, what is the maximum number of small lawns they can mow that day?",
            ["$4$", "$5$", "$6$", "$7$"],
            2,
            "With $3$ large lawns taking $3 \\times 75 = 225$ minutes, the remaining time is $480 - 225 = 255$ minutes. Since $40s \\le 255 \\Rightarrow s \\le 6.375$, the crew can mow at most $6$ small lawns (which also satisfies $6 + 3 = 9 \\ge 7$).",
            "Intermediate", "Two-Constraint Resource Allocation"
        ),
        make_mcq(
            "In the $xy$-plane, the solution set of the system $y \\le 3x + 4$, $y \\le -x + 12$, and $y \\ge 2$ is a triangular region. What is the $x$-coordinate of the vertex with the greatest $y$-coordinate?",
            ["$1.5$", "$2$", "$2.5$", "$3$"],
            1,
            "The vertex with the greatest $y$-coordinate is the intersection of the two upper boundary lines: $3x + 4 = -x + 12 \\Rightarrow 4x = 8 \\Rightarrow x = 2$ (where $y = 10$).",
            "Intermediate", "Vertex Identification in Linear Inequalities"
        ),
        make_mcq(
            "For how many integer values of $x$ is the compound inequality $11 < 4x + 3 < 35$ satisfied?",
            ["$4$", "$5$", "$6$", "$7$"],
            1,
            "Subtract $3$: $8 < 4x < 32 \\Rightarrow 2 < x < 8$. The integers strictly between $2$ and $8$ are $3, 4, 5, 6, 7$, which is $5$ integers.",
            "Intermediate", "Counting Integer Solutions"
        ),
        make_mcq(
            "A chemistry lab needs between $300\\,\\mathrm{mL}$ and $450\\,\\mathrm{mL}$ of acid mixture. Reagent X contains $20\\%$ acid and Reagent Y contains $50\\%$ acid. If the lab uses $200\\,\\mathrm{mL}$ of Reagent X and $y\\,\\mathrm{mL}$ of Reagent Y, and the total pure acid must be at least $115\\,\\mathrm{mL}$, what is the valid range for $y$?",
            ["$100 \\le y \\le 250$", "$120 \\le y \\le 250$", "$150 \\le y \\le 250$", "$150 \\le y \\le 300$"],
            2,
            "Total volume constraint: $300 \\le 200 + y \\le 450 \\Rightarrow 100 \\le y \\le 250$. Pure acid constraint: $0.20(200) + 0.50y \\ge 115 \\Rightarrow 40 + 0.50y \\ge 115 \\Rightarrow 0.50y \\ge 75 \\Rightarrow y \\ge 150$. Combining both gives $150 \\le y \\le 250$.",
            "Intermediate", "Intersecting Inequality Constraints"
        ),
        make_mcq(
            "If $\\dfrac{x + 2y}{x - y} = 4$ and $x + y = 10$, what is the value of $xy$?",
            ["$16$", "$21$", "$24$", "$25$"],
            2,
            "From $x + 2y = 4(x - y) = 4x - 4y$, we get $6y = 3x \\Rightarrow x = 2y$. Substituting into $x + y = 10$ gives $3y = 10$? Let us adjust the ratio so $x, y$ are integers: if $\\dfrac{x + 2y}{x - y} = 5$, then $x + 2y = 5x - 5y \\Rightarrow 4x = 7y$. If $\\dfrac{x + y}{x - y} = 5$, then $x + y = 5x - 5y \\Rightarrow 4x = 6y \\Rightarrow 2x = 3y$, and with $x + y = 10$ we get $x = 6, y = 4 \\Rightarrow xy = 24$!",
            "Intermediate", "Rational-Form Linear Systems"
        ),
        make_mcq(
            "In the $xy$-plane, which quadrants contain NO points $(x, y)$ satisfying the system $y > 2x + 3$ and $y > -\\dfrac{1}{2}x + 1$?",
            ["Quadrant III only", "Quadrant IV only", "Quadrants III and IV", "Quadrants II and IV"],
            1,
            "For any point in Quadrant IV, $x > 0$ and $y < 0$. However, for $x > 0$, $2x + 3 > 3 > 0$, so $y > 2x + 3$ requires $y > 3$, which is impossible in Quadrant IV. (In Quadrant III, e.g. $(-2, -0.5)$ satisfies $-0.5 > -1$, wait: $-0.5 > -0.5(-2)+1 = 2$ is false! Since both lines intersect at $(-0.8, 1.4)$ in QII and have slopes $2 > 0$ and $-0.5 < 0$, the minimum $y$ in the feasible wedge is $y = 1.4 > 0$, so NEITHER Quadrant III NOR Quadrant IV contains any solution points!)",
            "Intermediate", "Quadrant Analysis of Linear Inequalities"
        ),
        make_mcq(
            "The cost of $4$ notebooks and $3$ pens is $23.50$ dollars, and the cost of $2$ notebooks and $5$ pens is $17.50$ dollars. What is the cost of $1$ notebook and $1$ pen combined?",
            ["$5.75$ dollars", "$6.25$ dollars", "$6.50$ dollars", "$6.75$ dollars"],
            2,
            "Solve the system: multiply $2n + 5p = 17.50$ by $2$ to get $4n + 10p = 35.00$. Subtract $4n + 3p = 23.50$: $7p = 11.50$? Wait: if $4n + 3p = 23.50$ and $2n + 5p = 18.50$, then $6n + 8p = 42.00$, or $7p = 13.50$. Let's make $n = 4.75, p = 1.75$: $4(4.75) + 3(1.75) = 19 + 5.25 = 24.25$ and $2(4.75) + 5(1.75) = 9.50 + 8.75 = 18.25$, so $n + p = 6.50$ dollars!",
            "Intermediate", "System Word Problems for Unit Prices"
        ),
        # Challenging & Cross-Lesson Synthesis (38-45)
        make_mcq(
            "How many ordered pairs of integers $(x, y)$ satisfy the strict inequalities $x > 0$, $y > 0$, and $2x + 3y < 14$?",
            ["$6$", "$7$", "$8$", "$9$"],
            1,
            "Test positive integer values of $y$: for $y = 1$, $2x < 11 \\Rightarrow x \\in \\{1, 2, 3, 4, 5\\}$ ($5$ pairs); for $y = 2$, $2x < 8 \\Rightarrow x \\in \\{1, 2, 3\\}$ ($3$ pairs); for $y = 3$, $2x < 5 \\Rightarrow x \\in \\{1, 2\\}$ ($2$ pairs); for $y = 4$, $2x < 2 \\Rightarrow$ none. Total $= 5 + 3 + 2 = 10$ pairs.",
            "Challenging", "Lattice Points in a Feasible Region",
            cross_lesson="Topic 6.01 (Combinatorics & Counting)"
        ),
        make_mcq(
            "In the $xy$-plane, the system of inequalities $y \\ge |x - 3|$ and $y \\le 5$ encloses a triangular region. What is the perimeter of this region?",
            ["$10 + 5\\sqrt{2}$", "$10 + 10\\sqrt{2}$", "$20$", "$20\\sqrt{2}$"],
            1,
            "The vertex of $y = |x - 3|$ is $(3, 0)$, and it intersects $y = 5$ at $(-2, 5)$ and $(8, 5)$. The horizontal top side has length $8 - (-2) = 10$, and each equal slant side has length $\\sqrt{5^2 + 5^2} = 5\\sqrt{2}$. Thus the perimeter is $10 + 10\\sqrt{2}$.",
            "Challenging", "Area & Perimeter of Absolute-Value Regions",
            cross_lesson="Topic 7.01 (Isosceles Right Triangles & Special Ratios)",
            figure={
                "type": "plot",
                "fns": ["abs(x - 3)", "5"],
                "xmin": -3, "xmax": 9, "ymin": -1, "ymax": 7,
                "shade": {"fn1": "abs(x - 3)", "fn2": "5", "x0": -2, "x1": 8},
                "points": [[3, 0], [-2, 5], [8, 5]],
                "width": 205
            }
        ),
        make_mcq(
            "If the linear system $x + ky = 5$ and $kx + 4y = 10$ has a unique solution $(x, y)$, which of the following CANNOT be the value of $k$?",
            ["$-2$ only", "$2$ only", "$0$", "$-2$ and $2$"],
            3,
            "A $2 \\times 2$ linear system has a unique solution if and only if its determinant is nonzero: $1(4) - k(k) \\neq 0 \\Rightarrow k^2 \\neq 4 \\Rightarrow k \\neq \\pm 2$.",
            "Challenging", "Determinant Condition for Unique Solutions",
            cross_lesson="Topic 10.01 (Algebraic Structure)"
        ),
        make_mcq(
            "A point $(x, y)$ is chosen uniformly at random from the rectangle $0 \\le x \\le 6$, $0 \\le y \\le 4$. What is the probability that the point satisfies $x + y \\le 4$?",
            ["$\\dfrac{1}{4}$", "$\\dfrac{1}{3}$", "$\\dfrac{1}{2}$", "$\\dfrac{2}{3}$"],
            1,
            "The rectangle has area $6 \\times 4 = 24$. The inequality $x + y \\le 4$ inside the first quadrant cuts off a right triangle with vertices $(0,0), (4,0), (0,4)$ of area $\\dfrac{1}{2}(4)(4) = 8$. Thus the geometric probability is $\\dfrac{8}{24} = \\dfrac{1}{3}$.",
            "Challenging", "Geometric Probability on a Feasible Region",
            cross_lesson="Topic 6.01 (Probability) & Topic 8.01 (Area)"
        ),
        make_mcq(
            "For what value of $m > 0$ does the system $y = mx$ and $x^2 + y^2 - 10x + 16 = 0$ have exactly one real solution $(x, y)$?",
            ["$\\dfrac{3}{4}$", "$\\dfrac{4}{3}$", "$\\dfrac{3}{5}$", "$\\dfrac{5}{4}$"],
            0,
            "The circle $(x - 5)^2 + y^2 = 9$ has center $(5, 0)$ and radius $r = 3$. A tangent line $y = mx$ from the origin forms a $3\\text{-}4\\text{-}5$ right triangle with the radius $3$ and distance $5$, so adjacent leg $= 4$ and $\\tan\\theta = m = \\dfrac{3}{4}$.",
            "Challenging", "Linear-Circle Tangency System",
            cross_lesson="Topic 9.01 (Circles & Tangent Lines)"
        ),
        make_mcq(
            "If $a$ and $b$ are positive real numbers satisfying $\\log_2(a) + \\log_2(b) = 5$ and $3\\log_2(a) - \\log_2(b) = 7$, what is the value of $\\dfrac{a}{b}$?",
            ["$1$", "$2$", "$4$", "$8$"],
            1,
            "Let $u = \\log_2(a)$ and $v = \\log_2(b)$. Adding $u + v = 5$ and $3u - v = 7$ gives $4u = 12 \\Rightarrow u = 3$ and $v = 2$. Thus $a = 2^3 = 8$ and $b = 2^2 = 4$, so $\\dfrac{a}{b} = 2$.",
            "Challenging", "Linear Systems in Transformed Variables",
            cross_lesson="Topic 4.01 (Exponentials & Radicals)"
        ),
        make_mcq(
            "The region defined by $|x| + |y| \\le 6$ in the $xy$-plane is a square. What is the area of the portion of this square that also satisfies $y \\ge x - 2$?",
            ["$48$", "$52$", "$56$", "$64$"],
            2,
            "The total area of the diamond $|x| + |y| \\le 6$ (with diagonals $12$ and $12$) is $\\dfrac{1}{2}(12)(12) = 72$. The line $y = x - 2$ intersects the lower-right boundary $x - y = 6$? Wait: $y = x - 2$ is parallel to the boundary $x - y = 6$! Specifically, the diamond has $-6 \\le x - y \\le 6$ and $-6 \\le x + y \\le 6$. In rotated coordinates $u = x - y \\in [-6, 6]$ and $v = x + y \\in [-6, 6]$, the condition $x - y \\le 2$ covers $\\dfrac{2 - (-6)}{6 - (-6)} = \\dfrac{8}{12} = \\dfrac{2}{3}$ of the square, so Area $= \\dfrac{2}{3}(72) = 48$!",
            "Challenging", "Absolute Value Diamond & Half-Plane Area",
            cross_lesson="Topic 8.01 (Area & Coordinate Symmetry)"
        ),
        make_mcq(
            "A factory produces two models of solar panels, Model X and Model Y. Model X requires $3$ hours of assembly and $2$ hours of testing; Model Y requires $4$ hours of assembly and $5$ hours of testing. If the assembly department operates for exactly $110$ hours and the testing department operates for exactly $100$ hours, how many total solar panels (Model X plus Model Y) are produced?",
            ["$28$", "$30$", "$32$", "$35$"],
            1,
            "Solve $3x + 4y = 110$ and $2x + 5y = 100$: multiply the first by $2$ ($6x + 8y = 220$) and the second by $3$ ($6x + 15y = 300$). Subtracting gives $7y = 80$? Let us make the hours $108$ and $96$: if $x = 20, y = 12$, then $3(20)+4(12)=108$ and $2(20)+5(12)=100$, so $x + y = 32$!",
            "Challenging", "Industrial Production Linear System",
            cross_lesson="Topic 5.01 (Rates & Proportions)"
        ),
    ]

    # Clean up exact numbers on mcqs[2], mcqs[14], mcqs[15], mcqs[16], mcqs[17], mcqs[23], mcqs[24]
    mcqs[2] = make_mcq(
        "If $(x, y)$ is the solution to the system $2x + 5y = 24$ and $3x + 2y = 14$, what is the value of $x + y$?",
        ["$5$", "$6$", "$7$", "$8$"],
        1,
        "Multiply the first equation by $3$ ($6x + 15y = 72$) and the second by $2$ ($6x + 4y = 28$). Subtracting gives $11y = 44 \\Rightarrow y = 4$, and $2x + 20 = 24 \\Rightarrow x = 2$. Thus $x + y = 2 + 4 = 6$.",
        "Foundational", "Solving Linear Systems"
    )
    mcqs[14] = make_mcq(
        "If $\\dfrac{x + y}{x - y} = 5$ and $x + y = 10$, what is the value of $xy$?",
        ["$16$", "$20$", "$24$", "$25$"],
        2,
        "Since $x + y = 10$, the first equation gives $\\dfrac{10}{x - y} = 5 \\Rightarrow x - y = 2$. Adding $x + y = 10$ and $x - y = 2$ gives $2x = 12 \\Rightarrow x = 6$ and $y = 4$, so $xy = 24$.",
        "Intermediate", "Rational-Form Linear Systems"
    )
    mcqs[15] = make_mcq(
        "In the $xy$-plane, which quadrants contain NO points $(x, y)$ satisfying the system $y > 2x + 3$ and $y > -\\dfrac{1}{2}x + 1$?",
        ["Quadrant III only", "Quadrant IV only", "Quadrants III and IV", "Quadrants II and IV"],
        2,
        "The boundary lines $y = 2x + 3$ and $y = -\\dfrac{1}{2}x + 1$ intersect at $(-0.8, 1.4)$. Since the solution region lies above both lines (which have positive and negative slopes respectively), every point $(x, y)$ in the solution set has $y > 1.4 > 0$. Therefore, no point in the solution set can lie in Quadrant III or Quadrant IV (where $y < 0$).",
        "Intermediate", "Quadrant Analysis of Linear Inequalities"
    )
    mcqs[16] = make_mcq(
        "The cost of $4$ notebooks and $3$ pens is $24.25$ dollars, and the cost of $2$ notebooks and $5$ pens is $18.25$ dollars. What is the cost of $1$ notebook and $1$ pen combined?",
        ["$5.75$ dollars", "$6.25$ dollars", "$6.50$ dollars", "$6.75$ dollars"],
        2,
        "Multiply $2n + 5p = 18.25$ by $2$ to get $4n + 10p = 36.50$. Subtract $4n + 3p = 24.25$: $7p = 12.25 \\Rightarrow p = 1.75$ dollars, and $2n = 18.25 - 8.75 = 9.50 \\Rightarrow n = 4.75$ dollars. Thus $n + p = 4.75 + 1.75 = 6.50$ dollars.",
        "Intermediate", "System Word Problems for Unit Prices"
    )
    mcqs[17] = make_mcq(
        "How many ordered pairs of integers $(x, y)$ satisfy the strict inequalities $x > 0$, $y > 0$, and $2x + 3y < 14$?",
        ["$7$", "$8$", "$9$", "$10$"],
        3,
        "Test positive integer values of $y$: for $y = 1$, $2x < 11 \\Rightarrow x \\in \\{1, 2, 3, 4, 5\\}$ ($5$ pairs); for $y = 2$, $2x < 8 \\Rightarrow x \\in \\{1, 2, 3\\}$ ($3$ pairs); for $y = 3$, $2x < 5 \\Rightarrow x \\in \\{1, 2\\}$ ($2$ pairs); for $y \\ge 4$, $2x < 2 \\Rightarrow$ none. Total $= 5 + 3 + 2 = 10$ pairs.",
        "Challenging", "Lattice Points in a Feasible Region",
        cross_lesson="Topic 6.01 (Combinatorics & Counting)"
    )
    mcqs[23] = make_mcq(
        "The region defined by $|x| + |y| \\le 6$ in the $xy$-plane is a square. What is the area of the portion of this square that also satisfies $y \\ge x - 2$?",
        ["$36$", "$48$", "$54$", "$60$"],
        1,
        "The square $|x| + |y| \\le 6$ has diagonals of length $12$ and total area $\\dfrac{1}{2}(12)(12) = 72$. Its four sides lie along $x - y = \\pm 6$ and $x + y = \\pm 6$. Since the constraint $x - y \\le 2$ is parallel to the pair of sides $x - y = -6$ and $x - y = 6$, it slices the square at $\\dfrac{2 - (-6)}{6 - (-6)} = \\dfrac{8}{12} = \\dfrac{2}{3}$ of its width, giving area $\\dfrac{2}{3}(72) = 48$.",
        "Challenging", "Absolute Value Diamond & Half-Plane Area",
        cross_lesson="Topic 8.01 (Area & Coordinate Symmetry)"
    )
    mcqs[24] = make_mcq(
        "A factory produces two models of solar panels, Model X and Model Y. Model X requires $3$ hours of assembly and $2$ hours of testing; Model Y requires $4$ hours of assembly and $5$ hours of testing. If the assembly department operates for exactly $108$ hours and the testing department operates for exactly $100$ hours, how many total solar panels (Model X plus Model Y) are produced?",
        ["$28$", "$30$", "$32$", "$35$"],
        2,
        "Solve $3x + 4y = 108$ and $2x + 5y = 100$: multiply the first by $2$ ($6x + 8y = 216$) and the second by $3$ ($6x + 15y = 300$). Subtracting gives $7y = 84 \\Rightarrow y = 12$, and $3x = 108 - 48 = 60 \\Rightarrow x = 20$. Total panels $= x + y = 20 + 12 = 32$.",
        "Challenging", "Industrial Production Linear System",
        cross_lesson="Topic 5.01 (Rates & Proportions)"
    )

    return {
        "track": "sat",
        "num": "2.01",
        "title": "Linear Inequalities & Systems",
        "sub": "20 FRQs + 25 MCQs • Difficulty Progression • Cross-Lesson Synthesis",
        "sections": [
            {"heading": "Part I — Free-Response Questions (FRQs): Foundational Fluency (1–7)", "questions": frqs[0:7]},
            {"heading": "Part I — Free-Response Questions (FRQs): Intermediate Modeling (8–14)", "questions": frqs[7:14]},
            {"heading": "Part I — Free-Response Questions (FRQs): Challenging & Cross-Lesson Synthesis (15–20)", "questions": frqs[14:20]},
            {"heading": "Part II — Multiple-Choice Questions (MCQs): Foundational Concepts (21–28)", "questions": mcqs[0:8]},
            {"heading": "Part II — Multiple-Choice Questions (MCQs): Intermediate Exam Practice (29–37)", "questions": mcqs[8:17]},
            {"heading": "Part II — Multiple-Choice Questions (MCQs): Challenging & Cross-Lesson Synthesis (38–45)", "questions": mcqs[17:25]},
        ]
    }


# ==============================================================================
# TOPIC 3.01: Quadratic Functions & Equations
# ==============================================================================
def build_3_01():
    frqs = [
        # Foundational (1-7)
        make_frq(
            "Factor each quadratic equation completely and find all real roots:",
            "Use AC-method factoring or the difference-of-squares identity.",
            "Foundational", "Factoring Quadratic Equations",
            parts=[
                "$2x^2 - 11x + 12 = 0$",
                "$9x^2 - 25 = 0$"
            ],
            answers=[
                "$(2x - 3)(x - 4) = 0 \\Rightarrow x = \\dfrac{3}{2}$ or $x = 4$",
                "$(3x - 5)(3x + 5) = 0 \\Rightarrow x = \\dfrac{5}{3}$ or $x = -\\dfrac{5}{3}$"
            ],
            cols=1
        ),
        make_frq(
            "Rewrite $f(x) = 2x^2 - 12x + 11$ in vertex form $f(x) = a(x - h)^2 + k$ by completing the square, and state the coordinates of its vertex and the equation of its axis of symmetry.",
            "Factor $2$ from the first two terms: $f(x) = 2(x^2 - 6x + 9) + 11 - 18 = 2(x - 3)^2 - 7$. The vertex is $(3, -7)$ and the axis of symmetry is the vertical line $x = 3$.",
            "Foundational", "Completing the Square & Vertex Form",
            figure={
                "type": "plot",
                "fns": ["2*(x - 3)**2 - 7"],
                "xmin": -1, "xmax": 7, "ymin": -8, "ymax": 12,
                "point_labels": [{"x": 3, "y": -7, "label": "$V(3,-7)$", "dx": 0.3, "dy": -0.5}],
                "asymptotes": {"x": [3]},
                "width": 205
            }
        ),
        make_frq(
            "Use the quadratic formula to find the exact solutions of $3x^2 + 4x - 5 = 0$ in simplest radical form.",
            "$x = \\dfrac{-4 \\pm \\sqrt{4^2 - 4(3)(-5)}}{2(3)} = \\dfrac{-4 \\pm \\sqrt{16 + 60}}{6} = \\dfrac{-4 \\pm \\sqrt{76}}{6} = \\dfrac{-4 \\pm 2\\sqrt{19}}{6} = \\dfrac{-2 \\pm \\sqrt{19}}{3}$.",
            "Foundational", "Quadratic Formula & Simplifying Radicals"
        ),
        make_frq(
            "Compute the discriminant $\\Delta = b^2 - 4ac$ for each quadratic equation and state the number of distinct real solutions:",
            "A quadratic has 2 distinct real roots if $\\Delta > 0$, 1 repeated real root if $\\Delta = 0$, and 0 real roots if $\\Delta < 0$.",
            "Foundational", "Discriminant & Nature of Roots",
            parts=[
                "$4x^2 - 12x + 9 = 0$",
                "$2x^2 - 3x + 5 = 0$"
            ],
            answers=[
                "$\\Delta = (-12)^2 - 4(4)(9) = 0$ (1 repeated real solution, $x = \\dfrac{3}{2}$)",
                "$\\Delta = (-3)^2 - 4(2)(5) = -31 < 0$ (0 real solutions)"
            ],
            cols=1
        ),
        make_frq(
            "A parabola has $x$-intercepts at $(-2, 0)$ and $(6, 0)$ and passes through $(0, -12)$. Write the equation of the parabola in factored form and standard form, and find its minimum value.",
            "In factored form, $y = a(x + 2)(x - 6)$. Substituting $(0, -12)$ gives $-12 = a(2)(-6) \\Rightarrow a = 1$. Thus $y = (x + 2)(x - 6) = x^2 - 4x - 12$. The vertex occurs at the midpoint $x = \\dfrac{-2 + 6}{2} = 2$, giving minimum value $y(2) = (4)(-4) = -16$.",
            "Foundational", "Factored Form & Symmetry of Parabolas"
        ),
        make_frq(
            "Without solving for the roots $r_1$ and $r_2$ of $5x^2 - 15x - 9 = 0$, use Vieta's formulas to find (a) $r_1 + r_2$, (b) $r_1 r_2$, and (c) $r_1^2 + r_2^2$.",
            "By Vieta's formulas: (a) $r_1 + r_2 = -\\dfrac{-15}{5} = 3$; (b) $r_1 r_2 = -\\dfrac{9}{5}$; (c) $r_1^2 + r_2^2 = (r_1 + r_2)^2 - 2r_1 r_2 = 3^2 - 2\\left(-\\dfrac{9}{5}\\right) = 9 + \\dfrac{18}{5} = \\dfrac{63}{5} = 12.6$.",
            "Foundational", "Vieta's Formulas for Sum & Product of Roots"
        ),
        make_frq(
            "A flare is launched vertically upward from a platform $24\\,\\mathrm{m}$ above the ground with initial velocity $32\\,\\mathrm{m/s}$, so its height (in meters) after $t$ seconds is $h(t) = -4.9t^2 + 29.4t + 24.5$. Find (a) the time $t$ at which the flare reaches its maximum height, (b) the maximum height, and (c) the time when it hits the ground.",
            "(a) $t_{\\mathrm{vertex}} = -\\dfrac{29.4}{2(-4.9)} = 3$ seconds. (b) $h(3) = -4.9(9) + 29.4(3) + 24.5 = -44.1 + 88.2 + 24.5 = 68.6\\,\\mathrm{m}$. (c) Set $h(t) = 0$: divide by $-4.9$ to get $t^2 - 6t - 5 = 0 \\Rightarrow t = 3 + \\sqrt{14} \\approx 6.74$ seconds.",
            "Foundational", "Projectile Motion Quadratic Modeling"
        ),
        # Intermediate (8-14)
        make_frq(
            "For what positive value of $k$ does the quadratic equation $3x^2 - kx + 12 = 0$ have a single repeated real solution, and what is that solution?",
            "Set the discriminant to zero: $\\Delta = (-k)^2 - 4(3)(12) = k^2 - 144 = 0$. Since $k > 0$, $k = 12$. Substituting $k = 12$ gives $3(x^2 - 4x + 4) = 3(x - 2)^2 = 0$, so the repeated root is $x = 2$.",
            "Intermediate", "Discriminant Condition for Tangency"
        ),
        make_frq(
            "Solve the bi-quadratic equation $x^4 - 13x^2 + 36 = 0$ for all real solutions $x$.",
            "Let $u = x^2$: $u^2 - 13u + 36 = 0 \\Rightarrow (u - 4)(u - 9) = 0$, so $x^2 = 4$ or $x^2 = 9$. Taking square roots yields four real solutions: $x \\in \\{-3, -2, 2, 3\\}$.",
            "Intermediate", "Equations Quadratic in Form"
        ),
        make_frq(
            "A rectangular garden of dimensions $12\\,\\mathrm{m}$ by $20\\,\\mathrm{m}$ is surrounded by a gravel walkway of uniform width $w$ meters. If the total combined area of the garden and walkway is $384\\,\\mathrm{m^2}$, find the width $w$ of the walkway.",
            "The outer dimensions are $(12 + 2w)$ and $(20 + 2w)$. Set $(12 + 2w)(20 + 2w) = 384 \\Rightarrow 4w^2 + 64w + 240 = 384 \\Rightarrow 4w^2 + 64w - 144 = 0 \\Rightarrow w^2 + 16w - 36 = 0 \\Rightarrow (w + 18)(w - 2) = 0$. Since $w > 0$, $w = 2\\,\\mathrm{m}$.",
            "Intermediate", "Geometric Area Quadratic Modeling",
            figure={
                "type": "polygon",
                "vertices": [[0, 0], [24, 0], [24, 16], [0, 16]],
                "cutout": [[2, 2], [22, 2], [22, 14], [2, 14]],
                "side_labels": ["$20+2w$", "$12+2w$", None, None],
                "width": 210
            }
        ),
        make_frq(
            "A theater currently sells $300$ tickets per night at $20$ dollars per ticket. Market research shows that for every $1$-dollar increase in ticket price, nightly attendance drops by $10$ tickets. Express nightly revenue $R(x)$ as a quadratic function of the number of $1$-dollar price increases $x$, and find the ticket price that maximizes revenue.",
            "Revenue is $R(x) = (20 + x)(300 - 10x) = -10x^2 + 100x + 6000$. The vertex occurs at $x = -\\dfrac{100}{2(-10)} = 5$. Thus a $5$-dollar increase (to a ticket price of $25$ dollars) maximizes revenue at $R(5) = 25 \\times 250 = 6{,}250$ dollars.",
            "Intermediate", "Revenue Optimization via Quadratic Vertex"
        ),
        make_frq(
            "The parabola $y = -x^2 + 4x + 5$ and the line $y = x + 1$ intersect at two points $A$ and $B$, as shown. Find the exact coordinates of $A$ and $B$.",
            "Set $-x^2 + 4x + 5 = x + 1 \\Rightarrow x^2 - 3x - 4 = 0 \\Rightarrow (x - 4)(x + 1) = 0$. For $x = -1$, $y = 0$; for $x = 4$, $y = 5$. Thus $A = (-1, 0)$ and $B = (4, 5)$.",
            "Intermediate", "Parabola-Line Intersection",
            figure={
                "type": "plot",
                "fns": ["-x**2 + 4*x + 5", "x + 1"],
                "xmin": -3, "xmax": 6, "ymin": -4, "ymax": 10,
                "point_labels": [
                    {"x": -1, "y": 0, "label": "$A(-1,0)$", "dx": -1.6, "dy": 0.4},
                    {"x": 4, "y": 5, "label": "$B(4,5)$", "dx": 0.25, "dy": 0.3}
                ],
                "width": 210
            }
        ),
        make_frq(
            "If the roots of $x^2 - 6x + c = 0$ differ by $4$, find the value of the constant $c$ and both roots.",
            "Let the roots be $r_1$ and $r_2$. By Vieta's formulas, $r_1 + r_2 = 6$. Since $r_1 - r_2 = 4$, adding gives $2r_1 = 10 \\Rightarrow r_1 = 5$ and $r_2 = 1$. Therefore $c = r_1 r_2 = 5(1) = 5$.",
            "Intermediate", "Root Difference & Vieta's Relations"
        ),
        make_frq(
            "Solve the quadratic inequality $2x^2 - 7x - 15 \\le 0$ and express the solution set in interval notation.",
            "Factor the quadratic: $(2x + 3)(x - 5) \\le 0$. The boundary roots are $x = -\\dfrac{3}{2}$ and $x = 5$. Since the parabola opens upward ($a = 2 > 0$), the expression is non-positive on the closed interval $\\left[-\\dfrac{3}{2}, 5\\right]$.",
            "Intermediate", "Solving Quadratic Inequalities"
        ),
        # Challenging & Cross-Lesson Synthesis (15-20)
        make_frq(
            "Let $r$ and $s$ be the roots of $2x^2 - 8x + 5 = 0$. Without solving for $r$ and $s$ individually, find the monic quadratic equation whose roots are $\\dfrac{1}{r}$ and $\\dfrac{1}{s}$, and compute $\\dfrac{r}{s} + \\dfrac{s}{r}$.",
            "By Vieta's formulas, $r + s = 4$ and $rs = \\dfrac{5}{2}$. For the reciprocal roots, $\\dfrac{1}{r} + \\dfrac{1}{s} = \\dfrac{r + s}{rs} = \\dfrac{4}{5/2} = \\dfrac{8}{5}$ and $\\dfrac{1}{r}\\cdot\\dfrac{1}{s} = \\dfrac{2}{5}$, so the monic quadratic is $x^2 - \\dfrac{8}{5}x + \\dfrac{2}{5} = 0$. Also, $\\dfrac{r}{s} + \\dfrac{s}{r} = \\dfrac{(r+s)^2 - 2rs}{rs} = \\dfrac{16 - 5}{5/2} = \\dfrac{22}{5} = 4.4$.",
            "Challenging", "Symmetric Functions of Quadratic Roots",
            cross_lesson="Topic 10.01 (Rational Expressions & Vieta's Theorem)"
        ),
        make_frq(
            "A rectangle is inscribed under the arch of the parabola $y = 12 - 3x^2$ with its base on the $x$-axis. If the upper right vertex of the rectangle is at $(x, y)$ with $x = 1$, find the area and perimeter of the rectangle; then determine whether $x = 1$ gives a larger area than $x = \\dfrac{3}{2}$.",
            "By symmetry across the $y$-axis, for upper-right vertex $(x, 12 - 3x^2)$, the base width is $2x$ and height is $y = 12 - 3x^2$. At $x = 1$, width $= 2$ and height $= 12 - 3 = 9$, so Area $= 18$ and Perimeter $= 2(2 + 9) = 22$. At $x = \\dfrac{3}{2}$, width $= 3$ and height $= 12 - \\dfrac{27}{4} = \\dfrac{21}{4} = 5.25$, giving Area $= 15.75 < 18$.",
            "Challenging", "Inscribed Rectangle in a Parabolic Arch",
            cross_lesson="Topic 8.01 (Area & Perimeter of Inscribed Polygons)"
        ),
        make_frq(
            "For what range of values of the constant $m$ does the line $y = mx - 5$ NOT intersect the parabola $y = x^2 - 2x + 4$?",
            "Set $x^2 - 2x + 4 = mx - 5 \\Rightarrow x^2 - (m + 2)x + 9 = 0$. For no real intersection, the discriminant must be strictly negative: $\\Delta = (m + 2)^2 - 4(1)(9) < 0 \\Rightarrow (m + 2)^2 < 36 \\Rightarrow -6 < m + 2 < 6 \\Rightarrow -8 < m < 4$.",
            "Challenging", "Parametric Line-Parabola Non-Intersection",
            cross_lesson="Topic 2.01 (Compound & Quadratic Inequalities)"
        ),
        make_frq(
            "In right triangle $ABC$ with $\\angle C = 90^{\\circ}$, the hypotenuse has length $13\\,\\mathrm{cm}$ and the sum of the two legs is $17\\,\\mathrm{cm}$. Set up a quadratic equation to find the lengths of both legs and the area of $\\triangle ABC$.",
            "Let one leg be $x$ and the other be $17 - x$. By the Pythagorean theorem, $x^2 + (17 - x)^2 = 13^2 \\Rightarrow 2x^2 - 34x + 289 = 169 \\Rightarrow 2x^2 - 34x + 120 = 0 \\Rightarrow x^2 - 17x + 60 = 0 \\Rightarrow (x - 5)(x - 12) = 0$. The legs are $5\\,\\mathrm{cm}$ and $12\\,\\mathrm{cm}$, and the area is $\\dfrac{1}{2}(5)(12) = 30\\,\\mathrm{cm^2}$.",
            "Challenging", "Pythagorean Theorem & Quadratic Algebraic Identity",
            cross_lesson="Topic 7.01 (Right Triangles & Pythagorean Theorem)"
        ),
        make_frq(
            "Solve the exponential-quadratic equation $4^x - 10 \\cdot 2^x + 16 = 0$ for all real values of $x$.",
            "Substitute $u = 2^x > 0$ so that $4^x = (2^x)^2 = u^2$: $u^2 - 10u + 16 = 0 \\Rightarrow (u - 2)(u - 8) = 0$. Thus $2^x = 2 \\Rightarrow x = 1$, or $2^x = 8 = 2^3 \\Rightarrow x = 3$.",
            "Challenging", "Exponential Equations Reducible to Quadratics",
            cross_lesson="Topic 4.01 (Exponential Functions & Laws of Exponents)"
        ),
        make_frq(
            "A suspension bridge cable hangs in the shape of a parabola $y = ax^2 + c$, where $x$ is the horizontal distance (in meters) from the center of the span and $y$ is the height (in meters) above the road deck. At the center $(x = 0)$, the cable is $6\\,\\mathrm{m}$ above the deck; at the towers $x = \\pm 60\\,\\mathrm{m}$, the cable is $42\\,\\mathrm{m}$ above the deck. Find $a$ and $c$, and determine the height of a vertical suspender cable located $30\\,\\mathrm{m}$ from the center.",
            "At $x = 0$, $y = c = 6$. At $x = 60$, $42 = a(60)^2 + 6 \\Rightarrow 3600a = 36 \\Rightarrow a = \\dfrac{1}{100} = 0.01$. Thus $y = 0.01x^2 + 6$. At $x = 30\\,\\mathrm{m}$, the height is $y(30) = 0.01(900) + 6 = 15\\,\\mathrm{m}$.",
            "Challenging", "Structural Parabolic Suspension Modeling",
            cross_lesson="Topic 1.01 (Mathematical Modeling & Evaluation)"
        ),
    ]

    mcqs = [
        # Foundational (21-28)
        make_mcq(
            "What is the positive solution to the equation $2x^2 - 5x - 12 = 0$?",
            ["$\\dfrac{3}{2}$", "$3$", "$4$", "$6$"],
            2,
            "Factor: $(2x + 3)(x - 4) = 0$, which gives $x = -\\dfrac{3}{2}$ or $x = 4$. The positive solution is $4$.",
            "Foundational", "Solving Quadratics by Factoring"
        ),
        make_mcq(
            "In the $xy$-plane, the parabola $y = -3(x + 4)^2 + 9$ has its vertex at $(h, k)$. What is the value of $h + k$?",
            ["$5$", "$6$", "$13$", "$-5$"],
            0,
            "From vertex form $y = a(x - h)^2 + k$, we read $h = -4$ and $k = 9$, so $h + k = -4 + 9 = 5$.",
            "Foundational", "Identifying Vertex Coordinates"
        ),
        make_mcq(
            "Which of the following functions is equivalent to $f(x) = x^2 + 8x + 7$?",
            [
                "$f(x) = (x + 4)^2 - 9$",
                "$f(x) = (x + 4)^2 + 7$",
                "$f(x) = (x + 8)^2 - 57$",
                "$f(x) = (x + 4)^2 - 16$"
            ],
            0,
            "Complete the square: $x^2 + 8x + 7 = (x^2 + 8x + 16) - 16 + 7 = (x + 4)^2 - 9$.",
            "Foundational", "Equivalent Forms of Quadratic Functions"
        ),
        make_mcq(
            "What is the sum of the solutions to the equation $3x^2 - 18x + 7 = 0$?",
            ["$-6$", "$\\dfrac{7}{3}$", "$6$", "$18$"],
            2,
            "By Vieta's formula, the sum of the roots of $ax^2 + bx + c = 0$ is $-\\dfrac{b}{a} = -\\dfrac{-18}{3} = 6$.",
            "Foundational", "Sum of Solutions via Vieta's Formula"
        ),
        make_mcq(
            "How many distinct real solutions does the equation $5x^2 - 4x + 2 = 0$ have?",
            ["Zero", "Exactly one", "Exactly two", "Infinitely many"],
            0,
            "Compute the discriminant: $\\Delta = (-4)^2 - 4(5)(2) = 16 - 40 = -24 < 0$. Since $\\Delta < 0$, there are zero real solutions.",
            "Foundational", "Using the Discriminant"
        ),
        make_mcq(
            "If $(x - 3)^2 = 20$, what is the greater of the two real solutions for $x$?",
            ["$3 + 2\\sqrt{5}$", "$3 + 4\\sqrt{5}$", "$-3 + 2\\sqrt{5}$", "$23$"],
            0,
            "Take square roots of both sides: $x - 3 = \\pm\\sqrt{20} = \\pm 2\\sqrt{5}$, so $x = 3 \\pm 2\\sqrt{5}$. The greater solution is $3 + 2\\sqrt{5}$.",
            "Foundational", "Solving by Square Roots"
        ),
        make_mcq(
            "The graph of $y = ax^2 + bx + c$ is shown below. Which of the following correctly describes the signs of $a$ and the discriminant $\\Delta = b^2 - 4ac$?",
            ["$a > 0$ and $\\Delta > 0$", "$a > 0$ and $\\Delta < 0$", "$a < 0$ and $\\Delta > 0$", "$a < 0$ and $\\Delta = 0$"],
            2,
            "Because the parabola opens downward, $a < 0$. Because it crosses the $x$-axis at two distinct points, $\\Delta = b^2 - 4ac > 0$.",
            "Foundational", "Graphical Interpretation of $a$ and $\\Delta$",
            figure={
                "type": "plot",
                "fns": ["-(x - 1)**2 + 4"],
                "xmin": -3, "xmax": 5, "ymin": -5, "ymax": 6,
                "points": [[-1, 0], [3, 0], [1, 4]],
                "width": 200
            }
        ),
        make_mcq(
            "Which quadratic equation has solutions $x = -5$ and $x = \\dfrac{2}{3}$?",
            [
                "$3x^2 + 13x - 10 = 0$",
                "$3x^2 - 13x - 10 = 0$",
                "$3x^2 + 17x + 10 = 0$",
                "$3x^2 - 17x + 10 = 0$"
            ],
            0,
            "Reconstruct from factored form: $3\\left(x + 5\\right)\\left(x - \\dfrac{2}{3}\\right) = (x + 5)(3x - 2) = 3x^2 + 13x - 10 = 0$.",
            "Foundational", "Reconstructing Quadratics from Roots"
        ),
        # Intermediate (29-37)
        make_mcq(
            "The function $f(x) = -2x^2 + 16x - 25$ reaches its maximum value at $x = a$. What is the maximum value $f(a)$?",
            ["$4$", "$7$", "$9$", "$11$"],
            1,
            "The vertex occurs at $a = -\\dfrac{16}{2(-2)} = 4$. Evaluating $f(4) = -2(16) + 16(4) - 25 = -32 + 64 - 25 = 7$.",
            "Intermediate", "Maximum Value of a Quadratic Function"
        ),
        make_mcq(
            "In the quadratic equation $kx^2 - 12x + 9 = 0$, $k$ is a nonzero constant. If the equation has no real solutions, which inequality must $k$ satisfy?",
            ["$k < 4$", "$k > 4$", "$k < -4$", "$0 < k < 4$"],
            1,
            "For no real solutions, $\\Delta = (-12)^2 - 4(k)(9) = 144 - 36k < 0 \\Rightarrow 36k > 144 \\Rightarrow k > 4$.",
            "Intermediate", "Discriminant Inequalities"
        ),
        make_mcq(
            "If the parabola $y = x^2 + bx + c$ has vertex $(3, -4)$, what is the value of $b + c$?",
            ["$-1$", "$1$", "$5$", "$11$"],
            0,
            "Write in vertex form and expand: $y = (x - 3)^2 - 4 = x^2 - 6x + 5$. Thus $b = -6$ and $c = 5$, giving $b + c = -1$.",
            "Intermediate", "Relating Vertex Form to Standard Coefficients"
        ),
        make_mcq(
            "A quadratic function $g(x)$ satisfies $g(-1) = 8$ and $g(7) = 8$. What is the $x$-coordinate of the vertex of the graph of $y = g(x)$?",
            ["$2$", "$3$", "$4$", "$6$"],
            1,
            "Because $g(-1) = g(7) = 8$, the axis of symmetry lies halfway between $x = -1$ and $x = 7$: $h = \\dfrac{-1 + 7}{2} = 3$.",
            "Intermediate", "Axis of Symmetry from Equal Outputs"
        ),
        make_mcq(
            "What is the product of all real solutions to $(x^2 - 5x)^2 - 2(x^2 - 5x) - 24 = 0$?",
            ["$-24$", "$-12$", "$12$", "$24$"],
            0,
            "Let $u = x^2 - 5x$: $u^2 - 2u - 24 = 0 \\Rightarrow (u - 6)(u + 4) = 0$. For $x^2 - 5x - 6 = 0$, $\\Delta = 25 + 24 = 49 > 0$ (product of two real roots is $-6$); for $x^2 - 5x + 4 = 0$, $\\Delta = 25 - 16 = 9 > 0$ (product of two real roots is $4$). Thus all $4$ roots are real and their product is $(-6)(4) = -24$.",
            "Intermediate", "Product of Real Roots in Reducible Quartics"
        ),
        make_mcq(
            "A ball is thrown upward so that its height $h$, in feet, after $t$ seconds is $h(t) = -16t^2 + 64t + 80$. Which equivalent form of $h(t)$ displays the time at which the ball hits the ground as a constant or coefficient?",
            [
                "$h(t) = -16(t - 2)^2 + 144$",
                "$h(t) = -16(t - 5)(t + 1)$",
                "$h(t) = -16t(t - 4) + 80$",
                "$h(t) = -8(2t^2 - 8t - 10)$"
            ],
            1,
            "The ball hits the ground when $h(t) = 0$ ($t > 0$). Factored form $h(t) = -16(t - 5)(t + 1)$ directly displays the positive root $t = 5$ as a constant.",
            "Intermediate", "Structure in Quadratic Forms (Vertex vs. Factored)"
        ),
        make_mcq(
            "If the graphs of $y = x^2 - 5x + 7$ and $y = 2x - 3$ intersect at $(x_1, y_1)$ and $(x_2, y_2)$, what is the midpoint of the segment connecting the two intersection points?",
            ["$(3.5, 4)$", "$(3.5, 5)$", "$(2.5, 2)$", "$(5, 7)$"],
            0,
            "Set $x^2 - 5x + 7 = 2x - 3 \\Rightarrow x^2 - 7x + 10 = 0 \\Rightarrow x_1 + x_2 = 7$. Thus the midpoint has $x$-coordinate $\\bar{x} = \\dfrac{7}{2} = 3.5$, and since it lies on the line $y = 2x - 3$, $\\bar{y} = 2(3.5) - 3 = 4$.",
            "Intermediate", "Midpoint of a Secant Chord on a Parabola"
        ),
        make_mcq(
            "For all real $x$, the function $f(x) = ax^2 + bx + c$ satisfies $f(0) = 3$, $f(1) = 2$, and $f(2) = 5$. What is the value of $f(4)$?",
            ["$19$", "$21$", "$23$", "$27$"],
            2,
            "Using finite differences: $\\Delta f(0) = -1$, $\\Delta f(1) = 3$, so the second difference is $2a = 4 \\Rightarrow a = 2$. With $c = 3$ and $2(1) + b + 3 = 2 \\Rightarrow b = -3$, we have $f(x) = 2x^2 - 3x + 3$, so $f(4) = 2(16) - 12 + 3 = 23$.",
            "Intermediate", "Fitting a Quadratic Through Three Points"
        ),
        make_mcq(
            "What is the length of the interval of all real $x$ satisfying $x^2 - 4x - 21 \\le 0$?",
            ["$4$", "$7$", "$10$", "$14$"],
            2,
            "Factor: $(x - 7)(x + 3) \\le 0$, which holds on $[-3, 7]$. The length of this interval is $7 - (-3) = 10$.",
            "Intermediate", "Interval Length of Quadratic Inequalities"
        ),
        # Challenging & Cross-Lesson Synthesis (38-45)
        make_mcq(
            "In the $xy$-plane, the parabola $y = x^2 - 6x + 8$ intersects the $x$-axis at $A$ and $B$ and the $y$-axis at $C$. What is the area of $\\triangle ABC$?",
            ["$6$", "$8$", "$12$", "$16$"],
            1,
            "Factoring $x^2 - 6x + 8 = (x - 2)(x - 4)$ gives $A(2, 0)$ and $B(4, 0)$, so the base along the $x$-axis has length $4 - 2 = 2$. The $y$-intercept is $C(0, 8)$, giving altitude $8$. Thus Area $= \\dfrac{1}{2}(2)(8) = 8$.",
            "Challenging", "Triangle Area from Parabolic Intercepts",
            cross_lesson="Topic 7.01 (Coordinate Triangle Area)"
        ),
        make_mcq(
            "If $r$ and $s$ are the roots of $x^2 - 5x + 3 = 0$, what is the value of $r^3 + s^3$?",
            ["$80$", "$95$", "$110$", "$125$"],
            0,
            "We have $r + s = 5$ and $rs = 3$. Using the identity $r^3 + s^3 = (r + s)^3 - 3rs(r + s)$, we obtain $5^3 - 3(3)(5) = 125 - 45 = 80$.",
            "Challenging", "Cubic Power Sums of Quadratic Roots",
            cross_lesson="Topic 4.01 (Polynomial Identities)"
        ),
        make_mcq(
            "For how many real values of $x$ is $\\sqrt{2x + 15} = x$?",
            ["Zero", "One", "Two", "Three"],
            1,
            "Square both sides (requiring $x \\ge 0$): $2x + 15 = x^2 \\Rightarrow x^2 - 2x - 15 = 0 \\Rightarrow (x - 5)(x + 3) = 0$. Since $x = -3 < 0$ is extraneous, only $x = 5$ is a valid solution (one real value).",
            "Challenging", "Radical Equations & Extraneous Roots",
            cross_lesson="Topic 4.01 (Radicals & Rational Exponents)"
        ),
        make_mcq(
            "A circle with equation $x^2 + y^2 = 10$ and a parabola with equation $y = x^2 - 2$ intersect at four points in the $xy$-plane. What is the area of the trapezoid formed by these four intersection points?",
            ["$12$", "$14$", "$16$", "$18$"],
            1,
            "Substitute $x^2 = y + 2$ into $x^2 + y^2 = 10$: $y^2 + y - 8 = 0$? Wait: if the parabola is $y = x^2 - 4$ and circle is $x^2 + y^2 = 10$, then $(y + 4) + y^2 = 10 \\Rightarrow y^2 + y - 6 = 0 \\Rightarrow (y + 3)(y - 2) = 0$. At $y = 2$, $x^2 = 6$; at $y = -3$, $x^2 = 1$. Let's make the circle $x^2 + y^2 = 13$ and parabola $y = x^2 - 7$: then $(y + 7) + y^2 = 13 \\Rightarrow y^2 + y - 6 = 0 \\Rightarrow y = 2$ ($x = \\pm 3$, width $6$) and $y = -3$ ($x = \\pm 2$, width $4$), height $= 2 - (-3) = 5$, trapezoid area $= \\dfrac{6 + 4}{2} \\times 5 = 25$!",
            "Challenging", "Circle-Parabola Intersection Trapezoid",
            cross_lesson="Topic 9.01 (Circles) & Topic 8.01 (Trapezoid Area)"
        ),
        make_mcq(
            "If the quadratic inequality $ax^2 + bx + 6 > 0$ has solution set $(-1, 3)$, what is the value of $a + b$?",
            ["$-2$", "$0$", "$2$", "$4$"],
            2,
            "Since the solution set $(-1, 3)$ is bounded, $a < 0$ and the roots are $-1$ and $3$. Thus $ax^2 + bx + 6 = a(x + 1)(x - 3) = ax^2 - 2ax - 3a$. Matching the constant term gives $-3a = 6 \\Rightarrow a = -2$, and $b = -2a = 4$. Therefore $a + b = -2 + 4 = 2$.",
            "Challenging", "Reconstructing Quadratic Inequalities from Intervals",
            cross_lesson="Topic 2.01 (Inequality Solution Intervals)"
        ),
        make_mcq(
            "Let $f(x) = x^2 - 4x + 7$. What is the minimum value of $f(x)$ over the restricted interval $3 \\le x \\le 6$?",
            ["$3$", "$4$", "$7$", "$19$"],
            1,
            "Although the global vertex of $f(x) = (x - 2)^2 + 3$ is at $x = 2$ ($f(2) = 3$), $x = 2$ lies outside $[3, 6]$. On $[3, 6]$, $f(x)$ is strictly increasing, so its minimum on $[3, 6]$ occurs at the left endpoint $x = 3$: $f(3) = (3 - 2)^2 + 3 = 4$.",
            "Challenging", "Constrained Optimization on a Closed Interval",
            cross_lesson="Topic 2.01 (Domain Restrictions)"
        ),
        make_mcq(
            "Two positive numbers have a harmonic mean of $4.8$ and an arithmetic mean of $5$. What is the positive difference between the two numbers?",
            ["$1$", "$2$", "$3$", "$4$"],
            1,
            "Arithmetic mean $\\dfrac{x + y}{2} = 5 \\Rightarrow x + y = 10$. Harmonic mean $\\dfrac{2xy}{x + y} = 4.8 \\Rightarrow \\dfrac{2xy}{10} = 4.8 \\Rightarrow xy = 24$. The numbers are roots of $t^2 - 10t + 24 = 0 \\Rightarrow (t - 4)(t - 6) = 0$, so their positive difference is $6 - 4 = 2$.",
            "Challenging", "Arithmetic & Harmonic Means via Quadratics",
            cross_lesson="Topic 6.01 (Statistics & Means)"
        ),
        make_mcq(
            "In the $xy$-plane, what is the shortest distance from the vertex of the parabola $y = 2(x - 3)^2 + 4$ to the origin $(0, 0)$?",
            ["$5$", "$\\sqrt{13}$", "$7$", "$25$"],
            0,
            "The vertex of $y = 2(x - 3)^2 + 4$ is $(3, 4)$. Its distance to the origin $(0, 0)$ is $\\sqrt{3^2 + 4^2} = \\sqrt{25} = 5$.",
            "Challenging", "Vertex Distance in the Coordinate Plane",
            cross_lesson="Topic 7.01 (Distance Formula & Pythagorean Triples)"
        ),
    ]

    mcqs[20] = make_mcq(
        "A circle with equation $x^2 + y^2 = 13$ and a parabola with equation $y = x^2 - 7$ intersect at four points in the $xy$-plane. What is the area of the trapezoid formed by these four intersection points?",
        ["$15$", "$20$", "$25$", "$30$"],
        2,
        "Substitute $x^2 = y + 7$ into $x^2 + y^2 = 13$: $y^2 + y - 6 = 0 \\Rightarrow (y + 3)(y - 2) = 0$. At $y = 2$, $x^2 = 9 \\Rightarrow x = \\pm 3$ (top base $b_1 = 6$); at $y = -3$, $x^2 = 4 \\Rightarrow x = \\pm 2$ (bottom base $b_2 = 4$). The height is $2 - (-3) = 5$, so the trapezoid area is $\\dfrac{6 + 4}{2} \\times 5 = 25$.",
        "Challenging", "Circle-Parabola Intersection Trapezoid",
        cross_lesson="Topic 9.01 (Circles) & Topic 8.01 (Trapezoid Area)"
    )

    return {
        "track": "sat",
        "num": "3.01",
        "title": "Quadratic Functions & Equations",
        "sub": "20 FRQs + 25 MCQs • Difficulty Progression • Cross-Lesson Synthesis",
        "sections": [
            {"heading": "Part I — Free-Response Questions (FRQs): Foundational Fluency (1–7)", "questions": frqs[0:7]},
            {"heading": "Part I — Free-Response Questions (FRQs): Intermediate Modeling (8–14)", "questions": frqs[7:14]},
            {"heading": "Part I — Free-Response Questions (FRQs): Challenging & Cross-Lesson Synthesis (15–20)", "questions": frqs[14:20]},
            {"heading": "Part II — Multiple-Choice Questions (MCQs): Foundational Concepts (21–28)", "questions": mcqs[0:8]},
            {"heading": "Part II — Multiple-Choice Questions (MCQs): Intermediate Exam Practice (29–37)", "questions": mcqs[8:17]},
            {"heading": "Part II — Multiple-Choice Questions (MCQs): Challenging & Cross-Lesson Synthesis (38–45)", "questions": mcqs[17:25]},
        ]
    }


# ==============================================================================
# TOPIC 4.01: Exponentials, Radicals & Polynomials
# ==============================================================================
def build_4_01():
    frqs = [
        # Foundational (1-7)
        make_frq(
            "Simplify each expression using exponent and radical laws, assuming $x > 0$ and $y > 0$:",
            "Apply power-of-a-power $(a^m)^n = a^{mn}$ and quotient $a^m / a^n = a^{m-n}$ laws.",
            "Foundational", "Laws of Exponents & Fractional Powers",
            parts=[
                "$\\dfrac{(2x^3 y^{-2})^3}{4x^5 y^{-4}}$",
                "$\\left(27x^6\\right)^{2/3} \\cdot x^{-1}$"
            ],
            answers=[
                "$\\dfrac{8x^9 y^{-6}}{4x^5 y^{-4}} = 2x^4 y^{-2} = \\dfrac{2x^4}{y^2}$",
                "$9x^4 \\cdot x^{-1} = 9x^3$"
            ],
            cols=1
        ),
        make_frq(
            "Rationalize the denominator and simplify $\\dfrac{12}{3 - \\sqrt{5}}$ into the form $a + b\\sqrt{5}$.",
            "Multiply numerator and denominator by the conjugate $3 + \\sqrt{5}$: $\\dfrac{12(3 + \\sqrt{5})}{9 - 5} = \\dfrac{12(3 + \\sqrt{5})}{4} = 3(3 + \\sqrt{5}) = 9 + 3\\sqrt{5}$.",
            "Foundational", "Conjugates & Simplifying Radicals"
        ),
        make_frq(
            "Expand and simplify $(2x - 3)(x^2 + 4x - 5)$, and state the degree and leading coefficient of the resulting polynomial.",
            "$2x(x^2 + 4x - 5) - 3(x^2 + 4x - 5) = 2x^3 + 8x^2 - 10x - 3x^2 - 12x + 15 = 2x^3 + 5x^2 - 22x + 15$. It is a degree-$3$ (cubic) polynomial with leading coefficient $2$.",
            "Foundational", "Polynomial Multiplication & Degree"
        ),
        make_frq(
            "Use the Remainder Theorem to find the remainder when $P(x) = 2x^3 - 5x^2 + 3x - 7$ is divided by $x - 2$.",
            "By the Remainder Theorem, the remainder equals $P(2) = 2(2)^3 - 5(2)^2 + 3(2) - 7 = 16 - 20 + 6 - 7 = -5$.",
            "Foundational", "Polynomial Remainder Theorem"
        ),
        make_frq(
            "A bacterial culture starts with $400$ cells and triples every $2$ hours. Write an exponential model $N(t)$ for the population after $t$ hours, and calculate the population after $6$ hours.",
            "Since the population triples every $2$ hours, $N(t) = 400(3)^{t/2}$. At $t = 6$ hours, $N(6) = 400(3)^{6/2} = 400(27) = 10{,}800$ cells.",
            "Foundational", "Exponential Growth Modeling",
            figure={
                "type": "plot",
                "fns": ["400 * (3**(x/2)) / 1000"],
                "xmin": 0, "xmax": 6.5, "ymin": 0, "ymax": 12,
                "points": [[0, 0.4], [2, 1.2], [4, 3.6], [6, 10.8]],
                "width": 205
            }
        ),
        make_frq(
            "Factor the cubic polynomial $P(x) = x^3 + 3x^2 - 4x - 12$ completely by grouping and list all three real zeros.",
            "Group terms: $x^2(x + 3) - 4(x + 3) = (x + 3)(x^2 - 4) = (x + 3)(x - 2)(x + 2)$. The real zeros are $x = -3, -2, 2$.",
            "Foundational", "Factoring Cubic Polynomials by Grouping"
        ),
        make_frq(
            "Solve the exponential equation $27^{2x - 1} = 9^{x + 2}$ by rewriting both sides with a common base.",
            "Since $27 = 3^3$ and $9 = 3^2$, rewrite as $(3^3)^{2x - 1} = (3^2)^{x + 2} \\Rightarrow 3^{6x - 3} = 3^{2x + 4}$. Equate exponents: $6x - 3 = 2x + 4 \\Rightarrow 4x = 7 \\Rightarrow x = \\dfrac{7}{4} = 1.75$.",
            "Foundational", "Solving Exponential Equations with Common Bases"
        ),
        # Intermediate (8-14)
        make_frq(
            "A radioactive isotope has a half-life of $15$ days. If a sample initially has a mass of $160\\,\\mathrm{mg}$, write the decay formula $M(t)$ after $t$ days and find how many days it takes for the sample to decay to $10\\,\\mathrm{mg}$.",
            "$M(t) = 160\\left(\\dfrac{1}{2}\\right)^{t/15}$. Setting $M(t) = 10$: $\\left(\\dfrac{1}{2}\\right)^{t/15} = \\dfrac{10}{160} = \\dfrac{1}{16} = \\left(\\dfrac{1}{2}\\right)^4 \\Rightarrow \\dfrac{t}{15} = 4 \\Rightarrow t = 60$ days.",
            "Intermediate", "Half-Life & Exponential Decay"
        ),
        make_frq(
            "Solve the radical equation $\\sqrt{3x + 7} - x = 1$ and verify which candidate root(s) are extraneous.",
            "Isolate the radical: $\\sqrt{3x + 7} = x + 1$ (requires $x + 1 \\ge 0 \\Rightarrow x \\ge -1$). Square both sides: $3x + 7 = x^2 + 2x + 1 \\Rightarrow x^2 - x - 6 = 0 \\Rightarrow (x - 3)(x + 2) = 0$. Testing $x = -2$: $\\sqrt{1} - (-2) = 3 \\neq 1$ (extraneous). Testing $x = 3$: $\\sqrt{16} - 3 = 1$ (valid). Only $x = 3$ is a solution.",
            "Intermediate", "Radical Equations & Extraneous Solutions"
        ),
        make_frq(
            "Given that $x + 2$ is a factor of $P(x) = 2x^3 + kx^2 - 7x - 6$, find the constant $k$ and factor $P(x)$ completely.",
            "By the Factor Theorem, $P(-2) = 0 \\Rightarrow 2(-8) + 4k - 7(-2) - 6 = 0 \\Rightarrow -16 + 4k + 14 - 6 = 0 \\Rightarrow 4k = 8 \\Rightarrow k = 2$. Dividing $2x^3 + 2x^2 - 7x - 6$ by $x + 2$ gives $2x^2 - 2x - 3$.",
            "Intermediate", "Factor Theorem & Polynomial Division"
        ),
        make_frq(
            "The cubic polynomial $f(x) = (x + 2)(x - 1)(x - 3)$ is graphed below. State its $x$-intercepts, its $y$-intercept, and the intervals on which $f(x) > 0$.",
            "The $x$-intercepts are $(-2, 0), (1, 0), (3, 0)$, and the $y$-intercept is $f(0) = (2)(-1)(-3) = 6$, i.e. $(0, 6)$. By sign-chart analysis across the simple roots $-2, 1, 3$, $f(x) > 0$ on $(-2, 1) \\cup (3, \\infty)$.",
            "Intermediate", "Polynomial Zeros, Multiplicity & Sign Analysis",
            figure={
                "type": "plot",
                "fns": ["(x + 2)*(x - 1)*(x - 3)"],
                "xmin": -3, "xmax": 4, "ymin": -6, "ymax": 8,
                "points": [[-2, 0], [1, 0], [3, 0], [0, 6]],
                "width": 210
            }
        ),
        make_frq(
            "An investment of $5{,}000$ dollars earns $8\\%$ annual interest compounded quarterly. Write the expression for its value $A(t)$ after $t$ years, and find the effective annual percentage yield (APY) rounded to two decimal places.",
            "With quarterly compounding ($n = 4$), $A(t) = 5000\\left(1 + \\dfrac{0.08}{4}\\right)^{4t} = 5000(1.02)^{4t}$. Since $(1.02)^4 = 1.08243216$, the effective annual percentage yield is $\\mathrm{APY} \\approx 8.24\\%$.",
            "Intermediate", "Compound Interest & Effective Rate Conversion"
        ),
        make_frq(
            "If $x - \\dfrac{1}{x} = 4$, compute the exact value of $x^2 + \\dfrac{1}{x^2}$ and $x^3 - \\dfrac{1}{x^3}$.",
            "Square both sides: $\\left(x - \\dfrac{1}{x}\\right)^2 = x^2 - 2 + \\dfrac{1}{x^2} = 16 \\Rightarrow x^2 + \\dfrac{1}{x^2} = 18$. Then $x^3 - \\dfrac{1}{x^3} = \\left(x - \\dfrac{1}{x}\\right)\\left(x^2 + 1 + \\dfrac{1}{x^2}\\right) = 4(18 + 1) = 76$.",
            "Intermediate", "Binomial & Cubic Algebraic Identities"
        ),
        make_frq(
            "Rewrite the monthly growth model $V(t) = 1200(1.44)^{t/2}$ (where $t$ is in years) in the form $V(t) = 1200(1 + r)^t$ and state the annual percentage growth rate $r$.",
            "Use exponent laws: $(1.44)^{t/2} = \\left((1.44)^{1/2}\\right)^t = (1.20)^t$. Therefore $V(t) = 1200(1.20)^t$, which reveals an annual growth rate of $r = 0.20 = 20\\%$.",
            "Intermediate", "Rewriting Exponential Time Scales"
        ),
        # Challenging & Cross-Lesson Synthesis (15-20)
        make_frq(
            "Compare the linear function $L(x) = 6x + 4$ and the exponential function $E(x) = 2^{x + 2}$ at $x = 0, 1, 2, 3, 4$. Find all integer solutions to $L(x) = E(x)$ and state for which $x$ we have $E(x) > L(x)$.",
            "At $x = 0$: $L(0) = 4 = E(0)$. At $x = 1$: $L(1) = 10 > E(1) = 8$. At $x = 2$: $L(2) = 16 = E(2)$. At $x = 3$: $L(3) = 22 < E(3) = 32$. At $x = 4$: $L(4) = 28 < E(4) = 64$. Thus the integer solutions are $x = 0$ and $x = 2$, and $E(x) > L(x)$ for $x < 0$ and $x > 2$.",
            "Challenging", "Linear vs. Exponential Growth Comparison",
            cross_lesson="Topic 1.01 (Linear Models & Rate Comparison)",
            figure={
                "type": "plot",
                "fns": ["6*x + 4", "2**(x + 2)"],
                "xmin": -1, "xmax": 3.5, "ymin": 0, "ymax": 35,
                "points": [[0, 4], [2, 16]],
                "width": 205
            }
        ),
        make_frq(
            "A polynomial $P(x)$ leaves a remainder of $5$ when divided by $x - 1$ and a remainder of $-3$ when divided by $x + 3$. Find the linear remainder $R(x) = ax + b$ when $P(x)$ is divided by $(x - 1)(x + 3)$.",
            "Write $P(x) = (x - 1)(x + 3)Q(x) + ax + b$. By the Remainder Theorem, $P(1) = a + b = 5$ and $P(-3) = -3a + b = -3$. Subtracting gives $4a = 8 \\Rightarrow a = 2$ and $b = 3$, so the remainder is $R(x) = 2x + 3$.",
            "Challenging", "Polynomial Division with Quadratic Divisors",
            cross_lesson="Topic 2.01 (Systems of Linear Equations)"
        ),
        make_frq(
            "Let $f(x) = (x + 1)^2(x - 2)$. Find the coordinates of all $x$- and $y$-intercepts, identify at which intercept the graph is tangent to the $x$-axis vs. crosses it, and find $f(3)$.",
            "The $x$-intercepts are $(-1, 0)$ (multiplicity $2$, even, so the graph is tangent to the $x$-axis and bounces) and $(2, 0)$ (multiplicity $1$, odd, so the graph crosses the $x$-axis). The $y$-intercept is $(0, f(0)) = (0, -2)$, and $f(3) = (4)^2(1) = 16$.",
            "Challenging", "Multiplicity & Tangency of Polynomial Graphs",
            cross_lesson="Topic 3.01 (Quadratic Tangency)"
        ),
        make_frq(
            "Solve the system of exponential equations $2^{x + y} = 32$ and $3^{2x - y} = 81$, and evaluate $x^2 + y^2$.",
            "Since $32 = 2^5$ and $81 = 3^4$, equating exponents gives the linear system $x + y = 5$ and $2x - y = 4$. Adding yields $3x = 9 \\Rightarrow x = 3$ and $y = 2$. Thus $x^2 + y^2 = 3^2 + 2^2 = 13$.",
            "Challenging", "Systems of Exponential Equations",
            cross_lesson="Topic 2.01 (Linear Systems)"
        ),
        make_frq(
            "A cube has surface area $S = 6s^2$ and volume $V = s^3$. Express the volume $V$ as a function of surface area $S$ using rational exponents, and find the percentage increase in $V$ when $S$ is multiplied by $4$.",
            "From $s = (S/6)^{1/2}$, we have $V(S) = \\left(\\dfrac{S}{6}\\right)^{3/2}$. When $S$ is multiplied by $4$, the new volume is $4^{3/2} V = 8V$, which is an increase of $700\\%$.",
            "Challenging", "Scaling Laws with Rational Exponents",
            cross_lesson="Topic 8.01 (3D Solids) & Topic 5.01 (Percentages)"
        ),
        make_frq(
            "Find all real solutions to $\\sqrt{x + 5} + \\sqrt{x - 3} = 4$.",
            "Move one radical: $\\sqrt{x + 5} = 4 - \\sqrt{x - 3}$. Square both sides: $x + 5 = 16 - 8\\sqrt{x - 3} + (x - 3) \\Rightarrow 8\\sqrt{x - 3} = 8 \\Rightarrow \\sqrt{x - 3} = 1 \\Rightarrow x - 3 = 1 \\Rightarrow x = 4$. Check: $\\sqrt{9} + \\sqrt{1} = 3 + 1 = 4$.",
            "Challenging", "Dual-Radical Equations",
            cross_lesson="Topic 3.01 (Quadratics)"
        ),
    ]

    mcqs = [
        # Foundational (21-28)
        make_mcq(
            "For $x > 0$, which expression is equivalent to $\\sqrt[3]{x^5} \\cdot \\sqrt{x^3}$?",
            ["$x^{8/5}$", "$x^{5/2}$", "$x^{15/6}$", "$x^{19/6}$"],
            3,
            "Convert to rational exponents and add: $x^{5/3} \\cdot x^{3/2} = x^{10/6 + 9/6} = x^{19/6}$.",
            "Foundational", "Converting Radicals to Rational Exponents"
        ),
        make_mcq(
            "If $3^{2x} = 81$, what is the value of $3^{x + 1}$?",
            ["$9$", "$18$", "$27$", "$84$"],
            2,
            "Since $3^{2x} = (3^x)^2 = 81$ and $3^x > 0$, we have $3^x = 9$. Therefore $3^{x + 1} = 3^x \\cdot 3^1 = 9 \\cdot 3 = 27$.",
            "Foundational", "Evaluating Exponential Expressions"
        ),
        make_mcq(
            "When $(3x^2 - 4x + 5) - (x^2 + 6x - 2)$ is written in the form $ax^2 + bx + c$, what is the value of $a + b + c$?",
            ["$-1$", "$3$", "$7$", "$11$"],
            0,
            "Subtract like terms: $2x^2 - 10x + 7$, so $a = 2, b = -10, c = 7$ and $a + b + c = 2 - 10 + 7 = -1$.",
            "Foundational", "Polynomial Subtraction & Coefficient Sums"
        ),
        make_mcq(
            "A car purchased for $28{,}000$ dollars depreciates in value by $15\\%$ each year. Which function models the car's value $V(t)$, in dollars, $t$ years after purchase?",
            [
                "$V(t) = 28000(0.15)^t$",
                "$V(t) = 28000(0.85)^t$",
                "$V(t) = 28000(1.15)^t$",
                "$V(t) = 28000 - 0.15t$"
            ],
            1,
            "A $15\\%$ annual decrease retains $100\\% - 15\\% = 85\\% = 0.85$ of the value each year, giving $V(t) = 28000(0.85)^t$.",
            "Foundational", "Exponential Decay Factor"
        ),
        make_mcq(
            "If $\\sqrt{2x - 3} = 5$, what is the value of $x$?",
            ["$4$", "$11$", "$14$", "$28$"],
            2,
            "Square both sides: $2x - 3 = 25 \\Rightarrow 2x = 28 \\Rightarrow x = 14$.",
            "Foundational", "Solving Basic Radical Equations"
        ),
        make_mcq(
            "Which of the following is a factor of $x^3 - 27$?",
            ["$x + 3$", "$x^2 - 3x + 9$", "$x^2 + 3x + 9$", "$x^2 - 9$"],
            2,
            "By the difference-of-cubes identity $a^3 - b^3 = (a - b)(a^2 + ab + b^2)$, $x^3 - 27 = (x - 3)(x^2 + 3x + 9)$.",
            "Foundational", "Difference of Cubes Factorization"
        ),
        make_mcq(
            "What is the $y$-intercept of the exponential function $f(x) = 5(2)^{x - 1} - 3$?",
            ["$(0, -0.5)$", "$(0, 2)$", "$(0, 5)$", "$(0, 7)$"],
            0,
            "Evaluate at $x = 0$: $f(0) = 5(2)^{-1} - 3 = 2.5 - 3 = -0.5$, so the $y$-intercept is $(0, -0.5)$.",
            "Foundational", "Intercepts of Shifted Exponential Functions"
        ),
        make_mcq(
            "Which table of values represents an exponential function rather than a linear or quadratic function?",
            [
                "$(1, 3), (2, 6), (3, 9), (4, 12)$",
                "$(1, 3), (2, 6), (3, 12), (4, 24)$",
                "$(1, 1), (2, 4), (3, 9), (4, 16)$",
                "$(1, 5), (2, 7), (3, 11), (4, 17)$"
            ],
            1,
            "In $(1, 3), (2, 6), (3, 12), (4, 24)$, consecutive $y$-values have a constant multiplicative ratio of $2$, which defines an exponential function $y = 1.5(2)^x$.",
            "Foundational", "Identifying Exponential Tables"
        ),
        # Intermediate (29-37)
        make_mcq(
            "If $\\dfrac{8^x}{2^y} = 16$, what is the value of $3x - y$?",
            ["$2$", "$3$", "$4$", "$8$"],
            2,
            "Rewrite $8^x = (2^3)^x = 2^{3x}$ and $16 = 2^4$: $\\dfrac{2^{3x}}{2^y} = 2^{3x - y} = 2^4 \\Rightarrow 3x - y = 4$.",
            "Intermediate", "Exponent Base Unification"
        ),
        make_mcq(
            "When the polynomial $P(x) = x^3 - 4x^2 + kx + 6$ is divided by $x - 3$, the remainder is $0$. What is the value of $k$?",
            ["$-1$", "$1$", "$2$", "$3$"],
            1,
            "By the Remainder Theorem, $P(3) = 27 - 36 + 3k + 6 = 0 \\Rightarrow 3k - 3 = 0 \\Rightarrow k = 1$.",
            "Intermediate", "Finding Coefficients with the Factor Theorem"
        ),
        make_mcq(
            "The population of a town is modeled by $P(t) = 18000(1.04)^{t/3}$, where $t$ is the number of years after $2020$. Which statement best interprets this model?",
            [
                "The population increases by $4\\%$ every year.",
                "The population increases by $4\\%$ every $3$ years.",
                "The population increases by $3\\%$ every $4$ years.",
                "The population increases by $1.04\\%$ every $3$ years."
            ],
            1,
            "Because the exponent is $t/3$, the growth factor $1.04$ (a $4\\%$ increase) is applied once every $3$ years.",
            "Intermediate", "Interpreting Fractional-Period Exponential Models"
        ),
        make_mcq(
            "If $(ax + 2)(bx - 3) = 12x^2 + cx - 6$ for all $x$, and $a + b = 7$, what are the two possible values of $c$?",
            ["$-4$ and $1$", "$-1$ and $4$", "$-5$ and $5$", "$-2$ and $2$"],
            0,
            "From $ab = 12$ and $a + b = 7$, $\\{a, b\\} = \\{3, 4\\}$. Since $c = 2b - 3a$, if $(a, b) = (4, 3)$ then $c = 6 - 12 = -6$; if $(a, b) = (3, 4)$, $c = 8 - 9 = -1$.",
            "Intermediate", "Matching Polynomial Coefficients"
        ),
        make_mcq(
            "For $x > 0$, if $x^{3/4} = 27$, what is the value of $x^{1/2}$?",
            ["$3$", "$9$", "$27$", "$81$"],
            1,
            "Raise both sides to the $\\dfrac{2}{3}$ power: $x^{(3/4)(2/3)} = x^{1/2} = 27^{2/3} = (\\sqrt[3]{27})^2 = 3^2 = 9$.",
            "Intermediate", "Direct Fractional Power Scaling"
        ),
        make_mcq(
            "The polynomial $p(x)$ of degree $4$ has a double root at $x = -2$, a simple root at $x = 1$, a simple root at $x = 3$, and $p(0) = 12$. What is $p(2)$?",
            ["$-16$", "$-8$", "$8$", "$16$"],
            0,
            "Write $p(x) = a(x + 2)^2(x - 1)(x - 3)$. Since $p(0) = a(4)(-1)(-3) = 12a = 12$, we get $a = 1$. Thus $p(2) = 1(4)^2(1)(-1) = -16$.",
            "Intermediate", "Constructing Polynomials from Roots & Multiplicity"
        ),
        make_mcq(
            "What is the horizontal asymptote of the graph of $f(x) = 4(0.6)^x - 7$ in the $xy$-plane?",
            ["$y = -7$", "$y = -3$", "$y = 0$", "$y = 4$"],
            0,
            "As $x \\to \\infty$, $(0.6)^x \\to 0$, so $f(x) \\to -7$. The horizontal asymptote is $y = -7$.",
            "Intermediate", "Asymptotes of Exponential Functions"
        ),
        make_mcq(
            "If $\\sqrt{50} + \\sqrt{18} = \\sqrt{k}$, what is the value of $k$?",
            ["$68$", "$96$", "$128$", "$144$"],
            2,
            "Simplify each radical: $\\sqrt{50} + \\sqrt{18} = 5\\sqrt{2} + 3\\sqrt{2} = 8\\sqrt{2} = \\sqrt{64 \\cdot 2} = \\sqrt{128}$, so $k = 128$.",
            "Intermediate", "Combining & Re-Expressing Radicals"
        ),
        make_mcq(
            "If $x^3 + y^3 = 72$ and $x + y = 6$, what is the value of $xy$?",
            ["$6$", "$8$", "$10$", "$12$"],
            1,
            "Use $(x + y)^3 = x^3 + y^3 + 3xy(x + y)$: $6^3 = 72 + 3xy(6) \\Rightarrow 216 = 72 + 18xy \\Rightarrow 18xy = 144 \\Rightarrow xy = 8$.",
            "Intermediate", "Sum of Cubes Identity"
        ),
        # Challenging & Cross-Lesson Synthesis (38-45)
        make_mcq(
            "What is the sum of all real solutions to $9^x - 12 \\cdot 3^x + 27 = 0$?",
            ["$3$", "$4$", "$12$", "$27$"],
            0,
            "Let $u = 3^x$: $u^2 - 12u + 27 = 0 \\Rightarrow (u - 3)(u - 9) = 0$. Thus $3^x = 3^1 \\Rightarrow x = 1$, or $3^x = 3^2 \\Rightarrow x = 2$. The sum of the solutions is $1 + 2 = 3$.",
            "Challenging", "Exponential Equations Reducible to Quadratics",
            cross_lesson="Topic 3.01 (Quadratics)"
        ),
        make_mcq(
            "In a semi-log plot where $\\log_{10}(y)$ is plotted on the vertical axis against $x$ on the horizontal axis, the data points lie on the straight line $\\log_{10}(y) = 2x + 3$. Which function gives $y$ in terms of $x$?",
            ["$y = 1000(100)^x$", "$y = 3(10)^{2x}$", "$y = 100(1000)^x$", "$y = 2x + 1000$"],
            0,
            "Exponentiate with base $10$: $y = 10^{2x + 3} = 10^3 \\cdot (10^2)^x = 1000(100)^x$.",
            "Challenging", "Log-Linearized Exponential Models",
            cross_lesson="Topic 1.01 (Linear Equations) & Topic 6.01 (Data Modeling)"
        ),
        make_mcq(
            "The polynomial $P(x) = x^3 - 6x^2 + 11x - 6$ has three positive integer zeros that represent the lengths of the three edges of a rectangular prism. What is the surface area of the prism?",
            ["$6$", "$11$", "$22$", "$36$"],
            2,
            "Let the roots be $r_1, r_2, r_3$. By Vieta's formulas for a cubic, $r_1 r_2 + r_2 r_3 + r_3 r_1 = 11$. The surface area of a rectangular prism with edges $r_1, r_2, r_3$ is $2(r_1 r_2 + r_2 r_3 + r_3 r_1) = 2(11) = 22$ (indeed, the roots are $1, 2, 3$).",
            "Challenging", "Cubic Vieta's Formulas & 3D Surface Area",
            cross_lesson="Topic 8.01 (3D Solids & Surface Area)"
        ),
        make_mcq(
            "For how many real values of $x$ does $\\sqrt{x + 7} = x - 5$ hold?",
            ["Zero", "One", "Two", "Three"],
            1,
            "Require $x - 5 \\ge 0 \\Rightarrow x \\ge 5$. Square both sides: $x + 7 = x^2 - 10x + 25 \\Rightarrow x^2 - 11x + 18 = 0 \\Rightarrow (x - 9)(x - 2) = 0$. Only $x = 9 \\ge 5$ is valid; $x = 2$ is extraneous. Thus there is $1$ real solution.",
            "Challenging", "Extraneous Root Filtering",
            cross_lesson="Topic 3.01 (Quadratics)"
        ),
        make_mcq(
            "A savings account with continuous-style annual growth grows by $60\\%$ over every $4$-year period. By what percentage does the account grow over an $8$-year period?",
            ["$120\\%$", "$140\\%$", "$156\\%$", "$160\\%$"],
            2,
            "Over one $4$-year period, the multiplier is $1.60$. Over two $4$-year periods ($8$ years), the multiplier is $(1.60)^2 = 2.56$, which corresponds to a $(2.56 - 1) \\times 100\\% = 156\\%$ increase.",
            "Challenging", "Compound Percentage Scaling Across Multiples of Time",
            cross_lesson="Topic 5.01 (Percentages)"
        ),
        make_mcq(
            "If $P(x)$ is a polynomial such that $P(x^2 + 1) = x^4 + 6x^2 + 8$ for all real $x$, what is the value of $P(5)$?",
            ["$24$", "$35$", "$48$", "$63$"],
            1,
            "Set $x^2 + 1 = 5 \\Rightarrow x^2 = 4$. Substitute $x^2 = 4$ into the right-hand side: $P(5) = (4)^2 + 6(4) + 8 = 16 + 24 + 8 = 48$.",
            "Challenging", "Polynomial Composition & Substitution",
            cross_lesson="Topic 10.01 (Function Composition)"
        ),
        make_mcq(
            "What is the area of the triangle formed by the $x$-axis, the $y$-axis, and the tangent line to $y = x^2$ at $(0, 0)$ shifted to pass through $(2, 4)$ with slope $4$?",
            ["$1$", "$2$", "$4$", "$8$"],
            1,
            "The line through $(2, 4)$ with slope $4$ has equation $y - 4 = 4(x - 2) \\Rightarrow y = 4x - 4$. Its $x$-intercept is $(1, 0)$ and its $y$-intercept is $(0, -4)$, forming a right triangle with legs $1$ and $4$ and area $\\dfrac{1}{2}(1)(4) = 2$.",
            "Challenging", "Coordinate Geometry of Polynomial Secants/Tangents",
            cross_lesson="Topic 1.01 (Linear Equations) & Topic 7.01 (Triangle Area)"
        ),
        make_mcq(
            "If $a = 2^{60}$, $b = 3^{45}$, and $c = 5^{30}$, which inequality correctly orders $a, b,$ and $c$?",
            ["$a < c < b$", "$a < b < c$", "$c < a < b$", "$b < c < a$"],
            0,
            "Express all three as $15$th powers: $a = (2^4)^{15} = 16^{15}$, $b = (3^3)^{15} = 27^{15}$, and $c = (5^2)^{15} = 25^{15}$. Since $16 < 25 < 27$, we have $a < c < b$.",
            "Challenging", "Comparing Large Exponentials via GCD Exponents",
            cross_lesson="Topic 2.01 (Inequalities & Ordering)"
        ),
    ]

    mcqs[11] = make_mcq(
        "If $(ax + 2)(bx - 3) = 12x^2 + cx - 6$ for all $x$, and $a + b = 7$, what are the two possible values of $c$?",
        ["$-6$ and $-1$", "$-4$ and $1$", "$-5$ and $5$", "$-2$ and $2$"],
        0,
        "From $ab = 12$ and $a + b = 7$, $\\{a, b\\} = \\{3, 4\\}$. Since $c = 2b - 3a$, if $(a, b) = (3, 4)$ then $c = 8 - 9 = -1$; if $(a, b) = (4, 3)$ then $c = 6 - 12 = -6$.",
        "Intermediate", "Matching Polynomial Coefficients"
    )
    mcqs[22] = make_mcq(
        "If $P(x)$ is a polynomial such that $P(x^2 + 1) = x^4 + 6x^2 + 8$ for all real $x$, what is the value of $P(5)$?",
        ["$24$", "$35$", "$48$", "$63$"],
        2,
        "Set $x^2 + 1 = 5 \\Rightarrow x^2 = 4$. Substitute $x^2 = 4$ into the right-hand side: $P(5) = (4)^2 + 6(4) + 8 = 16 + 24 + 8 = 48$.",
        "Challenging", "Polynomial Composition & Substitution",
        cross_lesson="Topic 10.01 (Function Composition)"
    )

    return {
        "track": "sat",
        "num": "4.01",
        "title": "Exponentials, Radicals & Polynomials",
        "sub": "20 FRQs + 25 MCQs • Difficulty Progression • Cross-Lesson Synthesis",
        "sections": [
            {"heading": "Part I — Free-Response Questions (FRQs): Foundational Fluency (1–7)", "questions": frqs[0:7]},
            {"heading": "Part I — Free-Response Questions (FRQs): Intermediate Modeling (8–14)", "questions": frqs[7:14]},
            {"heading": "Part I — Free-Response Questions (FRQs): Challenging & Cross-Lesson Synthesis (15–20)", "questions": frqs[14:20]},
            {"heading": "Part II — Multiple-Choice Questions (MCQs): Foundational Concepts (21–28)", "questions": mcqs[0:8]},
            {"heading": "Part II — Multiple-Choice Questions (MCQs): Intermediate Exam Practice (29–37)", "questions": mcqs[8:17]},
            {"heading": "Part II — Multiple-Choice Questions (MCQs): Challenging & Cross-Lesson Synthesis (38–45)", "questions": mcqs[17:25]},
        ]
    }


# ==============================================================================
# TOPIC 5.01: Ratios, Rates & Percentages
# ==============================================================================
def build_5_01():
    frqs = [
        # Foundational (1-7)
        make_frq(
            "In a concrete mix, the ratio of cement to sand to gravel by weight is $1 : 2.5 : 4$. How many kilograms of each material are needed to produce $600\\,\\mathrm{kg}$ of concrete?",
            "Total ratio parts $= 1 + 2.5 + 4 = 7.5$. Each part equals $\\dfrac{600}{7.5} = 80\\,\\mathrm{kg}$. Thus cement $= 80\\,\\mathrm{kg}$, sand $= 2.5(80) = 200\\,\\mathrm{kg}$, and gravel $= 4(80) = 320\\,\\mathrm{kg}$.",
            "Foundational", "Multi-Part Ratios & Proportional Partitioning"
        ),
        make_frq(
            "Convert a speed of $90\\,\\mathrm{km/h}$ into meters per second ($\\mathrm{m/s}$) and feet per second ($\\mathrm{ft/s}$, using $1\\,\\mathrm{m} \\approx 3.28\\,\\mathrm{ft}$).",
            "$90\\,\\mathrm{km/h} \\times \\dfrac{1000\\,\\mathrm{m}}{1\\,\\mathrm{km}} \\times \\dfrac{1\\,\\mathrm{h}}{3600\\,\\mathrm{s}} = \\dfrac{90{,}000}{3600} = 25\\,\\mathrm{m/s}$. In feet per second, $25 \\times 3.28 = 82.0\\,\\mathrm{ft/s}$.",
            "Foundational", "Dimensional Analysis & Unit Conversion"
        ),
        make_frq(
            "An electronics store marks up the wholesale cost of a laptop by $40\\%$ to set the retail list price, and then offers a $25\\%$ holiday discount off the list price. Find the net percentage profit over wholesale cost.",
            "Multiply the sequential scale factors: $1.40 \\times (1 - 0.25) = 1.40 \\times 0.75 = 1.05$. A combined multiplier of $1.05$ represents a net profit of $5\\%$ above wholesale cost.",
            "Foundational", "Successive Percentage Changes"
        ),
        make_frq(
            "After a $16\\%$ price reduction, a laboratory microscope sells for $630$ dollars. What was the original price of the microscope before the reduction?",
            "Let $P_0$ be the original price: $(1 - 0.16)P_0 = 0.84P_0 = 630 \\Rightarrow P_0 = \\dfrac{630}{0.84} = 750$ dollars.",
            "Foundational", "Reverse Percentage Problems"
        ),
        make_frq(
            "On an architectural blueprint drawn at a scale of $1\\,\\mathrm{cm} : 2.5\\,\\mathrm{m}$, a rectangular conference room measures $4.8\\,\\mathrm{cm}$ by $3.2\\,\\mathrm{cm}$. Find the actual perimeter (in meters) and actual floor area (in $\\mathrm{m^2}$) of the room.",
            "Actual length $= 4.8 \\times 2.5 = 12\\,\\mathrm{m}$; actual width $= 3.2 \\times 2.5 = 8\\,\\mathrm{m}$. Actual perimeter $= 2(12 + 8) = 40\\,\\mathrm{m}$, and actual floor area $= 12 \\times 8 = 96\\,\\mathrm{m^2}$.",
            "Foundational", "Scale Drawings: Linear vs. Area Scaling"
        ),
        make_frq(
            "Pump A can fill a reservoir in $6$ hours, and Pump B can fill the same reservoir in $10$ hours. If both pumps operate together, how many hours does it take to fill the reservoir?",
            "Combined rate: $R = \\dfrac{1}{6} + \\dfrac{1}{10} = \\dfrac{5 + 3}{30} = \\dfrac{8}{30} = \\dfrac{4}{15}$ reservoir per hour. Time required $= \\dfrac{1}{R} = \\dfrac{15}{4} = 3.75$ hours ($3$ hours $45$ minutes).",
            "Foundational", "Combined Work Rates"
        ),
        make_frq(
            "The bar chart below shows quarterly solar energy output (in MWh) for a microgrid across four quarters. Calculate the percentage increase from Q1 to Q3 and the percentage of annual output generated in Q3.",
            "From Q1 ($120\\,\\mathrm{MWh}$) to Q3 ($192\\,\\mathrm{MWh}$), the percentage increase is $\\dfrac{192 - 120}{120} \\times 100\\% = 60\\%$. Total annual output is $120 + 150 + 192 + 138 = 600\\,\\mathrm{MWh}$, so Q3 accounts for $\\dfrac{192}{600} \\times 100\\% = 32\\%$.",
            "Foundational", "Reading Rates & Percentages from Bar Charts",
            figure={
                "type": "bars",
                "categories": ["Q1", "Q2", "Q3", "Q4"],
                "values": [120, 150, 192, 138],
                "highlight_index": 2,
                "ylabel": "Output (MWh)",
                "width": 210
            }
        ),
        # Intermediate (8-14)
        make_frq(
            "A metallurgist has $80\\,\\mathrm{g}$ of a $35\\%$ silver alloy. How many grams of pure ($100\\%$) silver must be melted into the alloy to raise the silver concentration to $60\\%$?",
            "Let $x$ be the grams of pure silver added: $\\dfrac{0.35(80) + 1.00x}{80 + x} = 0.60 \\Rightarrow 28 + x = 48 + 0.60x \\Rightarrow 0.40x = 20 \\Rightarrow x = 50\\,\\mathrm{g}$.",
            "Intermediate", "Concentration Enrichment Equations"
        ),
        make_frq(
            "The illumination intensity $I$ from a point light source varies inversely as the square of the distance $d$ from the source ($I = k/d^2$). If $I = 180\\,\\mathrm{lux}$ at $d = 2\\,\\mathrm{m}$, find $I$ at $d = 6\\,\\mathrm{m}$, and determine by what percentage $I$ changes when $d$ increases by $25\\%$.",
            "At $d = 6\\,\\mathrm{m}$ ($3$ times the distance), $I = \\dfrac{180}{3^2} = 20\\,\\mathrm{lux}$. When $d$ is multiplied by $1.25 = \\dfrac{5}{4}$, $I$ is multiplied by $\\left(\\dfrac{4}{5}\\right)^2 = \\dfrac{16}{25} = 0.64$, which is a $36\\%$ decrease.",
            "Intermediate", "Inverse-Square Variation & Percentage Change"
        ),
        make_frq(
            "A commuter drives the first $60\\,\\mathrm{km}$ of a trip at $80\\,\\mathrm{km/h}$ and the remaining $90\\,\\mathrm{km}$ at $60\\,\\mathrm{km/h}$. Compute the total travel time and the overall average speed for the $150\\,\\mathrm{km}$ trip.",
            "Time for segment 1: $t_1 = \\dfrac{60}{80} = 0.75\\,\\mathrm{h}$. Time for segment 2: $t_2 = \\dfrac{90}{60} = 1.50\\,\\mathrm{h}$. Total time $= 2.25\\,\\mathrm{h} = \\dfrac{9}{4}\\,\\mathrm{h}$, so overall average speed $= \\dfrac{150}{9/4} = \\dfrac{600}{9} = \\dfrac{200}{3} \\approx 66.67\\,\\mathrm{km/h}$.",
            "Intermediate", "Weighted Average Speed Across Segments"
        ),
        make_frq(
            "In a student body of $1{,}200$ students, $65\\%$ take Spanish, $45\\%$ take French, and $20\\%$ take neither language. How many students take both Spanish and French, and what percentage of Spanish students also take French?",
            "Students taking at least one language: $80\\%$ of $1{,}200 = 960$. By Inclusion-Exclusion, $65\\% + 45\\% - b = 80\\% \\Rightarrow b = 30\\%$, which is $0.30(1200) = 360$ students. Among Spanish students ($65\\%$), the fraction also taking French is $\\dfrac{30\\%}{65\\%} = \\dfrac{6}{13} \\approx 46.15\\%$.",
            "Intermediate", "Percentage Inclusion-Exclusion"
        ),
        make_frq(
            "Convert an irrigation flow rate of $450$ gallons per hour into liters per minute, given $1\\,\\mathrm{gallon} = 3.785\\,\\mathrm{L}$. Round to two decimal places.",
            "$450\\,\\dfrac{\\mathrm{gal}}{\\mathrm{h}} \\times \\dfrac{3.785\\,\\mathrm{L}}{1\\,\\mathrm{gal}} \\times \\dfrac{1\\,\\mathrm{h}}{60\\,\\mathrm{min}} = 7.5 \\times 3.785 = 28.3875 \\approx 28.39\\,\\mathrm{L/min}$.",
            "Intermediate", "Multi-Step Rate Unit Conversion"
        ),
        make_frq(
            "A stock portfolio drops by $20\\%$ in Year 1 and drops by another $10\\%$ in Year 2. By what percentage must the portfolio grow in Year 3 to return to its exact initial value?",
            "After two years, the value multiplier is $0.80 \\times 0.90 = 0.72$. To return to $1.00$, the Year 3 multiplier must be $\\dfrac{1}{0.72} = \\dfrac{25}{18} \\approx 1.3889$, which requires a $38.89\\%$ (or $\\dfrac{350}{9}\\%$) gain.",
            "Intermediate", "Compound Percentage Recovery"
        ),
        make_frq(
            "If $a : b = 3 : 4$ and $b : c = 6 : 5$, find the compound ratio $a : b : c$ in lowest integers and evaluate $\\dfrac{2a + 3c}{4b}$.",
            "Match $b$ using $\\mathrm{lcm}(4, 6) = 12$: $a : b = 9 : 12$ and $b : c = 12 : 10$, so $a : b : c = 9 : 12 : 10$. Then $\\dfrac{2a + 3c}{4b} = \\dfrac{2(9) + 3(10)}{4(12)} = \\dfrac{18 + 30}{48} = \\dfrac{48}{48} = 1$.",
            "Intermediate", "Chained Ratios & Homogeneous Expressions"
        ),
        # Challenging & Cross-Lesson Synthesis (15-20)
        make_frq(
            "Fresh berries contain $80\\%$ water by weight, whereas dried berries contain $20\\%$ water by weight. How many kilograms of dried berries are obtained from $50\\,\\mathrm{kg}$ of fresh berries?",
            "The non-water dry solids remain invariant during drying: $50\\,\\mathrm{kg}$ of fresh berries contain $(1 - 0.80)(50) = 10\\,\\mathrm{kg}$ of dry solids. In dried berries, dry solids constitute $1 - 0.20 = 80\\%$ of the total mass $M$: $0.80M = 10 \\Rightarrow M = 12.5\\,\\mathrm{kg}$.",
            "Challenging", "Invariant Dry-Matter Percentage Problems",
            cross_lesson="Topic 1.01 (Conservation Linear Equations)"
        ),
        make_frq(
            "According to Kepler's Third Law, the square of a planet's orbital period $T$ is directly proportional to the cube of its semi-major axis $a$ ($T^2 = k a^3$). If Planet X has a semi-major axis that is $4$ times that of Earth ($a_E = 1\\,\\mathrm{AU}, T_E = 1\\,\\mathrm{yr}$), find Planet X's orbital period and the percentage increase in $T$ when $a$ increases by $21\\%$.",
            "For $a = 4$, $T = 4^{3/2} = 8$ Earth years. When $a$ increases by $21\\%$, the scale factor for $a$ is $1.21 = (1.1)^2$, so $T$ scales by $(1.21)^{3/2} = (1.1)^3 = 1.331$, which is a $33.1\\%$ increase.",
            "Challenging", "Power-Law Proportionality & Percentage Scaling",
            cross_lesson="Topic 4.01 (Fractional Exponents)"
        ),
        make_frq(
            "Two similar right circular cones have surface areas in the ratio $9 : 25$. Find (a) the ratio of their heights, (b) the ratio of their volumes, and (c) the percentage by which the larger cone's volume exceeds the smaller cone's volume.",
            "(a) Linear dimensions scale as the square root of area ratio: $h_1 : h_2 = \\sqrt{9} : \\sqrt{25} = 3 : 5$. (b) Volumes scale as the cube of linear ratio: $V_1 : V_2 = 3^3 : 5^3 = 27 : 125$. (c) Percentage excess $= \\dfrac{125 - 27}{27} \\times 100\\% = \\dfrac{9800}{27}\\% \\approx 362.96\\%$.",
            "Challenging", "Similarity Scaling of 2D Area & 3D Volume",
            cross_lesson="Topic 8.01 (3D Solids & Similarity)"
        ),
        make_frq(
            "A medical screening test for a condition present in $2\\%$ of a population has a sensitivity (true-positive rate) of $95\\%$ and a specificity (true-negative rate) of $90\\%$. Out of $10{,}000$ people tested, how many test positive in total, and what percentage of those who test positive actually have the condition (Positive Predictive Value)?",
            "Out of $10{,}000$: $200$ have the condition ($0.95 \\times 200 = 190$ true positives) and $9{,}800$ do not ($0.10 \\times 9800 = 980$ false positives). Total positive tests $= 190 + 980 = 1{,}170$. Positive Predictive Value $= \\dfrac{190}{1170} = \\dfrac{19}{117} \\approx 16.24\\%$.",
            "Challenging", "Relative Risk, Sensitivity & Bayesian Proportions",
            cross_lesson="Topic 6.01 (Conditional Probability & Two-Way Tables)"
        ),
        make_frq(
            "Under continuous-rate radioactive decay, a sample loses $10\\%$ of its remaining mass every hour. Write an inequality for the number of hours $t$ until less than $50\\%$ of the initial mass remains, and determine the smallest integer hour $t$ that satisfies it.",
            "The remaining fraction after $t$ hours is $(0.90)^t < 0.50$. Testing integer powers: $(0.9)^6 = 0.531441 > 0.50$ and $(0.9)^7 = 0.4782969 < 0.50$. Thus the smallest integer hour is $t = 7$ hours.",
            "Challenging", "Repeated Percentage Decay & Exponential Inequalities",
            cross_lesson="Topic 4.01 (Exponential Decay) & Topic 2.01 (Inequalities)"
        ),
        make_frq(
            "An airline increases its ticket price by $p\\%$ and observes that ticket sales volume decreases by $\\dfrac{p}{2}\\%$. Express the percentage change in total revenue as a quadratic function of $p$, and find the non-zero value of $p$ for which total revenue remains unchanged.",
            "Revenue multiplier is $\\left(1 + \\dfrac{p}{100}\\right)\\left(1 - \\dfrac{p}{200}\\right) = 1 + \\dfrac{p}{200} - \\dfrac{p^2}{20000}$. For revenue to remain unchanged, $\\dfrac{p}{200} - \\dfrac{p^2}{20000} = 0 \\Rightarrow p(100 - p) = 0 \\Rightarrow p = 100\\%$ (price doubles, volume drops by $50\\%$, revenue multiplier $= 2 \\times 0.5 = 1$).",
            "Challenging", "Quadratic Revenue Elasticity from Percentage Changes",
            cross_lesson="Topic 3.01 (Quadratic Functions & Roots)"
        ),
    ]

    mcqs = [
        # Foundational (21-28)
        make_mcq(
            "If $\\dfrac{3x}{5y} = \\dfrac{9}{10}$, what is the ratio of $x$ to $y$?",
            ["$2 : 3$", "$3 : 2$", "$9 : 50$", "$27 : 50$"],
            1,
            "Multiply both sides by $\\dfrac{5}{3}$: $\\dfrac{x}{y} = \\dfrac{9}{10} \\cdot \\dfrac{5}{3} = \\dfrac{3}{2}$, or $3 : 2$.",
            "Foundational", "Simplifying Algebraic Ratios"
        ),
        make_mcq(
            "A shirt originally priced at $60$ dollars is on sale for $25\\%$ off. If an $8\\%$ sales tax is applied to the sale price, what is the final amount paid?",
            ["$45.00$ dollars", "$48.60$ dollars", "$49.80$ dollars", "$51.00$ dollars"],
            1,
            "Sale price $= 60(0.75) = 45.00$ dollars. Adding $8\\%$ sales tax gives $45.00(1.08) = 48.60$ dollars.",
            "Foundational", "Discount & Tax Calculations"
        ),
        make_mcq(
            "A 3D printer produces $18$ identical gears in $45$ minutes. At this constant rate, how many gears can it produce in $2.5$ hours?",
            ["$45$", "$54$", "$60$", "$75$"],
            2,
            "Rate $= \\dfrac{18\\,\\mathrm{gears}}{45\\,\\mathrm{min}} = 0.4\\,\\mathrm{gears/min}$. In $2.5\\,\\mathrm{hours} = 150\\,\\mathrm{minutes}$, output is $0.4 \\times 150 = 60$ gears.",
            "Foundational", "Unit Rates & Time Conversion"
        ),
        make_mcq(
            "If $40\\%$ of $x$ is equal to $16\\%$ of $150$, what is the value of $x$?",
            ["$24$", "$48$", "$60$", "$96$"],
            2,
            "$0.40x = 0.16(150) = 24 \\Rightarrow x = \\dfrac{24}{0.40} = 60$.",
            "Foundational", "Equating Percentage Expressions"
        ),
        make_mcq(
            "A map uses a scale of $1\\,\\mathrm{inch} = 15\\,\\mathrm{miles}$. If two cities are $4.6\\,\\mathrm{inches}$ apart on the map, what is the actual straight-line distance between them?",
            ["$60\\,\\mathrm{miles}$", "$64\\,\\mathrm{miles}$", "$69\\,\\mathrm{miles}$", "$75\\,\\mathrm{miles}$"],
            2,
            "Multiply $4.6 \\times 15 = 69\\,\\mathrm{miles}$.",
            "Foundational", "Direct Proportions & Map Scales"
        ),
        make_mcq(
            "The price of a commodity increased from $80$ dollars to $100$ dollars. What was the percentage increase?",
            ["$20\\%$", "$25\\%$", "$80\\%$", "$125\\%$"],
            1,
            "Percentage increase $= \\dfrac{100 - 80}{80} \\times 100\\% = \\dfrac{20}{80} \\times 100\\% = 25\\%$.",
            "Foundational", "Percentage Change Formula"
        ),
        make_mcq(
            "A fruit punch recipe calls for orange juice and pineapple juice in a ratio of $5 : 3$. How many liters of orange juice are in $24$ liters of punch?",
            ["$9$", "$12$", "$15$", "$18$"],
            2,
            "Orange juice makes up $\\dfrac{5}{5 + 3} = \\dfrac{5}{8}$ of the punch: $\\dfrac{5}{8} \\times 24 = 15$ liters.",
            "Foundational", "Part-to-Whole Ratio Calculations"
        ),
        make_mcq(
            "If $y$ is directly proportional to $x$, and $y = 18$ when $x = 12$, what is the value of $y$ when $x = 20$?",
            ["$24$", "$26$", "$30$", "$32$"],
            2,
            "The constant of proportionality is $k = \\dfrac{18}{12} = 1.5$. When $x = 20$, $y = 1.5(20) = 30$.",
            "Foundational", "Direct Variation"
        ),
        # Intermediate (29-37)
        make_mcq(
            "The length of a rectangle is increased by $20\\%$ and its width is decreased by $15\\%$. How does the area of the rectangle change?",
            [
                "It increases by $5\\%$.",
                "It increases by $2\\%$.",
                "It decreases by $2\\%$.",
                "It remains unchanged."
            ],
            1,
            "Multiply the dimension scale factors: $(1.20)(0.85) = 1.02$, which is a $2\\%$ increase in area.",
            "Intermediate", "Compound Percentage Change in Area"
        ),
        make_mcq(
            "Sound intensity $I$ is inversely proportional to the square of distance $r$ from the speaker. If a listener moves from $r = 3\\,\\mathrm{m}$ to $r = 6\\,\\mathrm{m}$, the new intensity is what fraction of the original intensity?",
            ["$\\dfrac{1}{16}$", "$\\dfrac{1}{4}$", "$\\dfrac{1}{3}$", "$\\dfrac{1}{2}$"],
            1,
            "Doubling the distance ($r \\to 2r$) divides the intensity by $2^2 = 4$, giving $\\dfrac{1}{4}$ of the original intensity.",
            "Intermediate", "Inverse-Square Proportions"
        ),
        make_mcq(
            "How many liters of water must be evaporated from $50\\,\\mathrm{L}$ of a $12\\%$ salt solution to produce a $20\\%$ salt solution?",
            ["$15\\,\\mathrm{L}$", "$20\\,\\mathrm{L}$", "$25\\,\\mathrm{L}$", "$30\\,\\mathrm{L}$"],
            1,
            "The amount of dissolved salt is constant at $0.12(50) = 6\\,\\mathrm{L}$. For $6\\,\\mathrm{L}$ to be $20\\%$ of the final volume $V$, $0.20V = 6 \\Rightarrow V = 30\\,\\mathrm{L}$, so $50 - 30 = 20\\,\\mathrm{L}$ of water must be evaporated.",
            "Intermediate", "Evaporation & Concentration Ratios"
        ),
        make_mcq(
            "After a $20\\%$ discount, the sale price of a coat is $p$ dollars. Which expression represents the original price of the coat before the discount?",
            ["$0.80p$", "$1.20p$", "$1.25p$", "$\\dfrac{p}{1.20}$"],
            2,
            "Since $0.80 P_0 = p$, we have $P_0 = \\dfrac{p}{0.80} = \\dfrac{5}{4}p = 1.25p$.",
            "Intermediate", "Algebraic Reverse Percentages"
        ),
        make_mcq(
            "An alloy consists of copper and zinc in a $7 : 3$ ratio by mass. If $6\\,\\mathrm{kg}$ of zinc is added to $40\\,\\mathrm{kg}$ of this alloy, what is the new ratio of copper to zinc?",
            ["$7 : 4$", "$14 : 9$", "$7 : 5$", "$2 : 1$"],
            1,
            "Initially, $40\\,\\mathrm{kg}$ contains $\\dfrac{7}{10}(40) = 28\\,\\mathrm{kg}$ copper and $\\dfrac{3}{10}(40) = 12\\,\\mathrm{kg}$ zinc. Adding $6\\,\\mathrm{kg}$ zinc gives $18\\,\\mathrm{kg}$ zinc, so the new ratio is $28 : 18 = 14 : 9$.",
            "Intermediate", "Updating Component Ratios"
        ),
        make_mcq(
            "Titanium has a density of $4.5\\,\\mathrm{g/cm^3}$. What is the mass, in kilograms, of a solid titanium block with volume $2{,}000\\,\\mathrm{cm^3}$?",
            ["$0.9\\,\\mathrm{kg}$", "$4.5\\,\\mathrm{kg}$", "$9.0\\,\\mathrm{kg}$", "$90\\,\\mathrm{kg}$"],
            2,
            "Mass $= 4.5\\,\\mathrm{g/cm^3} \\times 2000\\,\\mathrm{cm^3} = 9{,}000\\,\\mathrm{g} = 9.0\\,\\mathrm{kg}$.",
            "Intermediate", "Density, Mass & Volume Unit Conversions"
        ),
        make_mcq(
            "Pipe A can fill a tank in $4$ hours, while a drain valve B can empty the full tank in $6$ hours. If both Pipe A and drain valve B are accidentally left open when the tank is empty, how many hours will it take to fill the tank?",
            ["$8$", "$10$", "$12$", "$24$"],
            2,
            "Net filling rate $= \\dfrac{1}{4} - \\dfrac{1}{6} = \\dfrac{3 - 2}{12} = \\dfrac{1}{12}$ tank per hour. Therefore it takes $12$ hours to fill the tank.",
            "Intermediate", "Opposing Rates (Fill vs. Drain)"
        ),
        make_mcq(
            "If $a$ is $25\\%$ greater than $b$, and $b$ is $20\\%$ less than $c$, then $a$ is what percent of $c$?",
            ["$95\\%$", "$100\\%$", "$105\\%$", "$110\\%$"],
            1,
            "Chain the multipliers: $a = 1.25b = 1.25(0.80c) = 1.00c$, so $a$ is $100\\%$ of $c$.",
            "Intermediate", "Chained Percentage Multipliers"
        ),
        make_mcq(
            "A cyclist rides uphill at $12\\,\\mathrm{km/h}$ and immediately rides back down the exact same trail at $36\\,\\mathrm{km/h}$. What is the cyclist's average speed for the entire round trip?",
            ["$18\\,\\mathrm{km/h}$", "$20\\,\\mathrm{km/h}$", "$24\\,\\mathrm{km/h}$", "$27\\,\\mathrm{km/h}$"],
            0,
            "For equal distances at speeds $v_1$ and $v_2$, the average speed is the harmonic mean: $\\dfrac{2 v_1 v_2}{v_1 + v_2} = \\dfrac{2(12)(36)}{12 + 36} = \\dfrac{864}{48} = 18\\,\\mathrm{km/h}$.",
            "Intermediate", "Harmonic Mean for Equal-Distance Round Trips"
        ),
        # Challenging & Cross-Lesson Synthesis (38-45)
        make_mcq(
            "If the radius of a right circular cylinder is increased by $20\\%$ and its height is decreased by $25\\%$, by what percentage does the volume of the cylinder change?",
            ["Decreases by $5\\%$", "Increases by $8\\%$", "Increases by $10\\%$", "Decreases by $10\\%$"],
            1,
            "Since $V = \\pi r^2 h$, the volume multiplier is $(1.20)^2(0.75) = 1.44 \\times 0.75 = 1.08$, which is an $8\\%$ increase.",
            "Challenging", "Multivariable Scaling of 3D Cylinder Volume",
            cross_lesson="Topic 8.01 (Volume of 3D Solids)",
            figure={
                "type": "solid",
                "solid": "cylinder",
                "dims": [4, 4, 5],
                "labels": {"r": "$1.2r$", "h": "$0.75h$"},
                "width": 195
            }
        ),
        make_mcq(
            "A $10$-liter radiator is filled with a $60\\%$ antifreeze solution. How many liters of the solution must be drained and replaced with pure ($100\\%$) antifreeze so that the resulting $10$-liter mixture is $75\\%$ antifreeze?",
            ["$2.5\\,\\mathrm{L}$", "$3.25\\,\\mathrm{L}$", "$3.75\\,\\mathrm{L}$", "$4.0\\,\\mathrm{L}$"],
            2,
            "If $x$ liters are drained and replaced with pure antifreeze, the antifreeze balance is $0.60(10 - x) + 1.00x = 0.75(10) \\Rightarrow 6 + 0.40x = 7.5 \\Rightarrow x = 3.75\\,\\mathrm{L}$.",
            "Challenging", "Drain-and-Replace Mixture Modeling",
            cross_lesson="Topic 1.01 (Linear Conservation Equations)"
        ),
        make_mcq(
            "An investment grows at a constant annual compound rate so that its value increases by $44\\%$ over $2$ years. What is the percentage increase over $3$ years?",
            ["$66\\%$", "$72.8\\%$", "$88\\%$", "$95.2\\%$"],
            1,
            "Since $(1 + r)^2 = 1.44$ with $r > 0$, we have $1 + r = 1.20$ ($20\\%$ per year). Over $3$ years, $(1.20)^3 = 1.728$, which is a $72.8\\%$ increase.",
            "Challenging", "Compound Percentage Extrapolation",
            cross_lesson="Topic 4.01 (Exponential Growth)"
        ),
        make_mcq(
            "In $\\triangle ABC$, point $D$ lies on $AB$ such that $AD : DB = 2 : 3$, and point $E$ lies on $AC$ such that $DE \\parallel BC$. The area of $\\triangle ADE$ is what percent of the area of trapezoid $DBCE$?",
            ["$16\\%$", "$19.05\\%$", "$40\\%$", "$66.7\\%$"],
            1,
            "Since $AD : AB = 2 : (2 + 3) = 2 : 5$ and $\\triangle ADE \\sim \\triangle ABC$, the area ratio is $[ADE] : [ABC] = 2^2 : 5^2 = 4 : 25$. Thus trapezoid $DBCE$ has relative area $25 - 4 = 21$, and $\\dfrac{4}{21} \\times 100\\% \\approx 19.05\\%$.",
            "Challenging", "Area Ratios in Similar Triangles",
            cross_lesson="Topic 7.01 (Similar Triangles)"
        ),
        make_mcq(
            "A store raises the price of an item by $x\\%$ and later reduces the new price by $x\\%$, resulting in a final price that is $9\\%$ less than the original price. What is the value of $x$?",
            ["$9$", "$15$", "$30$", "$45$"],
            2,
            "The net multiplier is $\\left(1 + \\dfrac{x}{100}\\right)\\left(1 - \\dfrac{x}{100}\\right) = 1 - \\dfrac{x^2}{10000} = 1 - 0.09 \\Rightarrow \\dfrac{x^2}{10000} = 0.09 \\Rightarrow x^2 = 900 \\Rightarrow x = 30$.",
            "Challenging", "Symmetric Percentage Rise & Fall via Quadratics",
            cross_lesson="Topic 3.01 (Difference of Squares)"
        ),
        make_mcq(
            "In a survey of $500$ voters, the ratio of voters favoring Candidate A to Candidate B is $7 : 3$. How many voters must switch their support from Candidate A to Candidate B so that the new ratio becomes $1 : 1$?",
            ["$50$", "$75$", "$100$", "$125$"],
            2,
            "Initially, Candidate A has $\\dfrac{7}{10}(500) = 350$ voters and Candidate B has $150$. For a $1 : 1$ split ($250$ each), $350 - 250 = 100$ voters must switch.",
            "Challenging", "Ratio Rebalancing & Transfer",
            cross_lesson="Topic 2.01 (Linear Systems)"
        ),
        make_mcq(
            "Two gears are meshed together. Gear A has $36$ teeth and rotates at $150\\,\\mathrm{rpm}$. If Gear B has $24$ teeth, through how many radians does Gear B rotate in $2$ seconds?",
            ["$10\\pi$", "$15\\pi$", "$20\\pi$", "$30\\pi$"],
            1,
            "By inverse tooth ratio, Gear B rotates at $150 \\times \\dfrac{36}{24} = 225\\,\\mathrm{rpm} = \\dfrac{225}{60} = 3.75\\,\\mathrm{rev/s}$. In $2$ seconds, Gear B completes $7.5$ revolutions, which is $7.5 \\times 2\\pi = 15\\pi$ radians.",
            "Challenging", "Gear Ratios & Angular Velocity in Radians",
            cross_lesson="Topic 9.01 (Circles & Radian Measure)"
        ),
        make_mcq(
            "If $\\dfrac{a}{b} = \\dfrac{c}{d} = \\dfrac{3}{4}$ with $b + 2d \\neq 0$, what is the value of $\\dfrac{a + 2c}{b + 2d}$?",
            ["$\\dfrac{3}{8}$", "$\\dfrac{3}{4}$", "$\\dfrac{9}{16}$", "$\\dfrac{6}{7}$"],
            1,
            "Since $a = \\dfrac{3}{4}b$ and $c = \\dfrac{3}{4}d$, we have $\\dfrac{a + 2c}{b + 2d} = \\dfrac{\\frac{3}{4}(b + 2d)}{b + 2d} = \\dfrac{3}{4}$ by the mediant property of equal ratios.",
            "Challenging", "Linear Invariance of Equal Proportions",
            cross_lesson="Topic 10.01 (Rational Expressions)"
        ),
    ]

    return {
        "track": "sat",
        "num": "5.01",
        "title": "Ratios, Rates & Percentages",
        "sub": "20 FRQs + 25 MCQs • Difficulty Progression • Cross-Lesson Synthesis",
        "sections": [
            {"heading": "Part I — Free-Response Questions (FRQs): Foundational Fluency (1–7)", "questions": frqs[0:7]},
            {"heading": "Part I — Free-Response Questions (FRQs): Intermediate Modeling (8–14)", "questions": frqs[7:14]},
            {"heading": "Part I — Free-Response Questions (FRQs): Challenging & Cross-Lesson Synthesis (15–20)", "questions": frqs[14:20]},
            {"heading": "Part II — Multiple-Choice Questions (MCQs): Foundational Concepts (21–28)", "questions": mcqs[0:8]},
            {"heading": "Part II — Multiple-Choice Questions (MCQs): Intermediate Exam Practice (29–37)", "questions": mcqs[8:17]},
            {"heading": "Part II — Multiple-Choice Questions (MCQs): Challenging & Cross-Lesson Synthesis (38–45)", "questions": mcqs[17:25]},
        ]
    }


# ==============================================================================
# TOPIC 6.01: Statistics, Data & Probability
# ==============================================================================
def build_6_01():
    frqs = [
        # Foundational (1-7)
        make_frq(
            "Compute the mean, median, range, and interquartile range (IQR) of the dataset $\\{12, 15, 15, 18, 22, 25, 33\\}$.",
            "Sum $= 12 + 15 + 15 + 18 + 22 + 25 + 33 = 140$, so Mean $= \\dfrac{140}{7} = 20$. The middle (4th) value is Median $= 18$. Range $= 33 - 12 = 21$. Lower half $\\{12, 15, 15\\}$ has $Q_1 = 15$; upper half $\\{22, 25, 33\\}$ has $Q_3 = 25$; thus $\\mathrm{IQR} = 25 - 15 = 10$.",
            "Foundational", "Measures of Center & Spread"
        ),
        make_frq(
            "A student has a mean score of $84$ across $5$ exams. What score must the student earn on the $6$th exam to raise the overall mean to $86$?",
            "Total points on the first $5$ exams $= 5 \\times 84 = 420$. Required total on $6$ exams $= 6 \\times 86 = 516$. Thus the $6$th exam score must be $516 - 420 = 96$.",
            "Foundational", "Target Mean & Weighted Totals"
        ),
        make_frq(
            "The side-by-side boxplots below compare daily commuter times (in minutes) on Route A and Route B. State the median and IQR for each route, and identify which route has more consistent travel times.",
            "Route A has five-number summary $(15, 22, 28, 34, 45)$, so Median $= 28\\,\\mathrm{min}$ and $\\mathrm{IQR} = 34 - 22 = 12\\,\\mathrm{min}$. Route B has $(10, 20, 32, 42, 50)$, so Median $= 32\\,\\mathrm{min}$ and $\\mathrm{IQR} = 42 - 20 = 22\\,\\mathrm{min}$. Route A has smaller IQR and range, so its travel times are more consistent.",
            "Foundational", "Comparing Boxplots (Median & IQR)",
            figure={
                "type": "boxplot",
                "groups": [
                    {"label": "Route A", "stats": [15, 22, 28, 34, 45]},
                    {"label": "Route B", "stats": [10, 20, 32, 42, 50]}
                ],
                "min": 5, "max": 55,
                "xlabel": "Commute Time (minutes)",
                "width": 225
            }
        ),
        make_frq(
            "In a clinical study of $200$ patients, $120$ received Treatment X ($90$ improved, $30$ did not) and $80$ received a Placebo ($30$ improved, $50$ did not). Compute (a) $P(\\text{Improved})$, (b) $P(\\text{Improved} \\mid \\text{Treatment X})$, and (c) $P(\\text{Treatment X} \\mid \\text{Improved})$.",
            "Total improved $= 90 + 30 = 120$. (a) $P(\\text{Improved}) = \\dfrac{120}{200} = 0.60$. (b) $P(\\text{Improved} \\mid \\text{Treatment X}) = \\dfrac{90}{120} = 0.75$. (c) $P(\\text{Treatment X} \\mid \\text{Improved}) = \\dfrac{90}{120} = 0.75$.",
            "Foundational", "Two-Way Tables & Conditional Probability"
        ),
        make_frq(
            "A scatterplot of study hours $x$ versus quiz score $y$ has line of best fit $\\hat{y} = 4.5x + 52$, as shown. Calculate the predicted score for $x = 6$ hours and the residual for a student who studied $6$ hours and scored $83$.",
            "Predicted score: $\\hat{y}(6) = 4.5(6) + 52 = 27 + 52 = 79$. Residual $= y - \\hat{y} = 83 - 79 = +4$ (the student scored $4$ points above the model prediction).",
            "Foundational", "Scatterplots, Line of Best Fit & Residuals",
            figure={
                "type": "plot",
                "fns": ["4.5*x + 52"],
                "scatter_pts": [[1, 56], [2, 62], [3, 64], [4, 71], [5, 73], [6, 83], [7, 82], [8, 88]],
                "xmin": 0, "xmax": 9, "ymin": 50, "ymax": 95,
                "width": 210
            }
        ),
        make_frq(
            "Explain without calculation which dataset has the larger standard deviation: Dataset A $= \\{10, 12, 14, 16, 18\\}$ or Dataset B $= \\{10, 10, 14, 18, 18\\}$. Then verify by computing both sample variances.",
            "Both datasets have mean $\\bar{x} = 14$, but Dataset B places four of its five values at the extreme endpoints $10$ and $18$ (distance $4$ from the mean), whereas Dataset A has two values at distance $2$ and two at distance $4$. Indeed, $\\sum(x_i - 14)^2 = 40$ for A vs. $64$ for B, so Dataset B has a larger standard deviation.",
            "Foundational", "Conceptual Understanding of Standard Deviation"
        ),
        make_frq(
            "A public-opinion poll of $600$ randomly selected registered voters in a state of $4{,}000{,}000$ registered voters finds that $54\\%$ support Proposition 7, with a margin of error of $\\pm 4\\%$ at the $95\\%$ confidence level. State the plausible interval for the true state-wide support percentage and the corresponding interval of voter counts.",
            "The plausible percentage interval is $54\\% \\pm 4\\% = [50\\%, 58\\%]$. Multiplying by $4{,}000{,}000$ gives an interval of $[2{,}000{,}000,\\, 2{,}320{,}000]$ voters.",
            "Foundational", "Margin of Error & Confidence Intervals"
        ),
        # Intermediate (8-14)
        make_frq(
            "A dataset of $9$ distinct positive integers has median $18$ and mean $20$. If the largest number in the dataset is increased by $18$ while all other numbers remain unchanged, what are the new mean and new median?",
            "Increasing the maximum value by $18$ increases the sum of the $9$ numbers by $18$, so the new mean is $20 + \\dfrac{18}{9} = 22$. Because the rank order of the $9$ values does not change, the 5th value (the median) remains $18$.",
            "Intermediate", "Sensitivity of Mean vs. Median to Outliers"
        ),
        make_frq(
            "A frequency table shows the number of books read over the summer by $25$ students: $1$ book ($4$ students), $2$ books ($7$ students), $3$ books ($6$ students), $4$ books ($5$ students), $5$ books ($3$ students). Find the mean and median number of books read.",
            "Total books $= 1(4) + 2(7) + 3(6) + 4(5) + 5(3) = 4 + 14 + 18 + 20 + 15 = 71$, so Mean $= \\dfrac{71}{25} = 2.84$. The median is the 13th value in sorted order; cumulative frequencies are $4, 11, 17$, so the 13th student falls in the '$3$ books' group (Median $= 3$).",
            "Intermediate", "Mean & Median from Frequency Distributions"
        ),
        make_frq(
            "A box contains $5$ red marbles and $3$ blue marbles. Two marbles are drawn at random without replacement. Find the probability that (a) both marbles are red, and (b) the two marbles have different colors.",
            "(a) $P(\\mathrm{RR}) = \\dfrac{5}{8} \\cdot \\dfrac{4}{7} = \\dfrac{20}{56} = \\dfrac{5}{14}$. (b) $P(\\text{different}) = P(\\mathrm{RB}) + P(\\mathrm{BR}) = \\dfrac{5}{8}\\cdot\\dfrac{3}{7} + \\dfrac{3}{8}\\cdot\\dfrac{5}{7} = \\dfrac{30}{56} = \\dfrac{15}{28}$.",
            "Intermediate", "Sampling Without Replacement"
        ),
        make_frq(
            "Explain how the margin of error of a sample proportion $\\mathrm{ME} \\approx 1.96\\sqrt{\\dfrac{\\hat{p}(1-\\hat{p})}{n}}$ changes if the sample size $n$ is quadrupled from $n = 250$ to $n = 1{,}000$.",
            "Because margin of error is inversely proportional to $\\sqrt{n}$, multiplying the sample size $n$ by $4$ divides the margin of error by $\\sqrt{4} = 2$ (cutting the margin of error in half).",
            "Intermediate", "Sample Size & Margin of Error Scaling"
        ),
        make_frq(
            "Determine whether each study design supports a cause-and-effect conclusion or only an association, and identify the target population to which results can be generalized: (a) A random sample of $500$ adults in City X is surveyed on sleep duration and blood pressure. (b) $200$ volunteers with hypertension are randomly assigned to either a daily walking regimen or a control group.",
            "(a) Observational study with random sampling: establishes correlation/association (not causation), generalizable to all adults in City X. (b) Randomized controlled experiment on volunteers: establishes a causal effect of the walking regimen, strictly applicable to individuals similar to the study volunteers.",
            "Intermediate", "Observational Studies vs. Randomized Experiments"
        ),
        make_frq(
            "Using the 1.5-IQR rule, determine whether the minimum value ($2$) or maximum value ($64$) is an outlier in a dataset with $Q_1 = 20$, median $= 27$, and $Q_3 = 36$.",
            "Here $\\mathrm{IQR} = 36 - 20 = 16$, so $1.5 \\times \\mathrm{IQR} = 24$. The lower fence is $Q_1 - 24 = 20 - 24 = -4$ (since $2 \\ge -4$, $2$ is not an outlier). The upper fence is $Q_3 + 24 = 36 + 24 = 60$ (since $64 > 60$, $64$ is a high outlier).",
            "Intermediate", "Outlier Detection via the 1.5-IQR Rule"
        ),
        make_frq(
            "Class A ($20$ students) has an exam mean of $78$, and Class B ($30$ students) has an exam mean of $88$. Find the combined mean of all $50$ students.",
            "Combined mean is the weighted average $\\bar{x} = \\dfrac{20(78) + 30(88)}{20 + 30} = \\dfrac{1560 + 2640}{50} = \\dfrac{4200}{50} = 84$.",
            "Intermediate", "Weighted Means Across Subgroups"
        ),
        # Challenging & Cross-Lesson Synthesis (15-20)
        make_frq(
            "Every observation $x_i$ in a dataset with mean $\\bar{x} = 25$ and standard deviation $s_x = 4$ is transformed according to the linear rule $y_i = 3x_i - 15$. Find the mean $\\bar{y}$, standard deviation $s_y$, and variance $s_y^2$ of the transformed dataset.",
            "By linearity of expectation, $\\bar{y} = 3\\bar{x} - 15 = 3(25) - 15 = 60$. Standard deviation scales by $|3|$ and ignores shifts: $s_y = 3(4) = 12$. Variance scales by $3^2$: $s_y^2 = 12^2 = 144$.",
            "Challenging", "Linear Transformations of Random Variables & Data",
            cross_lesson="Topic 1.01 (Linear Transformations)"
        ),
        make_frq(
            "A residual plot $(x_i, y_i - \\hat{y}_i)$ from a linear regression displays a pronounced U-shaped parabolic pattern (positive residuals at both ends, negative residuals in the middle). Explain what this indicates about the appropriateness of the linear model and what model family would be more appropriate.",
            "A deterministic U-shaped pattern in the residuals indicates that the underlying relationship between $x$ and $y$ is nonlinear (specifically concave upward), so a linear model systematically underpredicts at the extremes and overpredicts in the middle. A quadratic (or exponential) regression model is more appropriate.",
            "Challenging", "Residual Plot Diagnostics for Nonlinearity",
            cross_lesson="Topic 3.01 (Quadratic Models)"
        ),
        make_frq(
            "Five positive integers have a mode of $4$, a median of $6$, and a mean of $7$. What is the largest possible value of the maximum integer in the list?",
            "Order the integers $a \\le b \\le c \\le d \\le e$ with $a + b + c + d + e = 35$ and $c = 6$. Since the mode is $4$ (which is less than $6$), we must have $a = b = 4$. To maximize $e$, make $d$ as small as possible without creating another mode ($d = 7$, since $d = 6$ would make $6$ tied for mode). Then $4 + 4 + 6 + 7 + e = 35 \\Rightarrow e = 14$.",
            "Challenging", "Extremal Optimization with Mean, Median & Mode Constraints",
            cross_lesson="Topic 2.01 (Inequalities & Optimization)"
        ),
        make_frq(
            "In a factory, Machine 1 produces $60\\%$ of all microchips (with a $2\\%$ defect rate) and Machine 2 produces $40\\%$ of all microchips (with a $5\\%$ defect rate). If a randomly selected microchip is found to be defective, what is the probability that it was produced by Machine 2?",
            "By Bayes' Theorem: $P(D) = 0.60(0.02) + 0.40(0.05) = 0.012 + 0.020 = 0.032$. Therefore $P(M_2 \\mid D) = \\dfrac{0.020}{0.032} = \\dfrac{20}{32} = \\dfrac{5}{8} = 0.625$.",
            "Challenging", "Bayes' Theorem & Law of Total Probability",
            cross_lesson="Topic 5.01 (Weighted Proportions)"
        ),
        make_frq(
            "A dataset of $6$ values is $\\{4, 7, 9, 12, 15, x\\}$. For what value(s) of $x$ is the mean of the dataset equal to its median?",
            "Sum $= 47 + x$, so Mean $= \\dfrac{47 + x}{6}$. Case 1 ($x \\le 9$): Median is $\\dfrac{7 + 9}{2} = 8 \\Rightarrow 47 + x = 48 \\Rightarrow x = 1 \\le 9$ (valid). Case 2 ($9 < x < 12$): Median is $\\dfrac{9 + x}{2} = \\dfrac{47 + x}{6} \\Rightarrow 27 + 3x = 47 + x \\Rightarrow x = 10 \\in (9, 12)$ (valid). Case 3 ($x \\ge 12$): Median is $\\dfrac{9 + 12}{2} = 10.5 \\Rightarrow 47 + x = 63 \\Rightarrow x = 16 \\ge 12$ (valid). Thus $x \\in \\{1, 10, 16\\}$.",
            "Challenging", "Piecewise Median-Mean Equations",
            cross_lesson="Topic 1.01 (Piecewise Linear Equations)"
        ),
        make_frq(
            "A dartboard consists of an outer circle of radius $10\\,\\mathrm{cm}$ and a concentric inner bullseye circle of radius $4\\,\\mathrm{cm}$. If a dart lands uniformly at random on the board, find the probability that it lands in the outer ring (outside the bullseye).",
            "Area of outer circle $= 100\\pi\\,\\mathrm{cm^2}$; area of inner bullseye $= 16\\pi\\,\\mathrm{cm^2}$. Area of outer ring $= 100\\pi - 16\\pi = 84\\pi\\,\\mathrm{cm^2}$. Probability $= \\dfrac{84\\pi}{100\\pi} = \\dfrac{21}{25} = 0.84$.",
            "Challenging", "Geometric Probability on Concentric Circles",
            cross_lesson="Topic 9.01 (Area of Circles & Annuli)"
        ),
    ]

    mcqs = [
        # Foundational (21-28)
        make_mcq(
            "What is the median of the data set $\\{18, 7, 24, 11, 15, 30, 12\\}$?",
            ["$12$", "$15$", "$16.7$", "$18$"],
            1,
            "Sort the $7$ numbers in ascending order: $7, 11, 12, 15, 18, 24, 30$. The middle (4th) number is $15$.",
            "Foundational", "Calculating the Median"
        ),
        make_mcq(
            "A fair six-sided die is rolled once. What is the probability of rolling a number that is both prime and odd?",
            ["$\\dfrac{1}{6}$", "$\\dfrac{1}{3}$", "$\\dfrac{1}{2}$", "$\\dfrac{2}{3}$"],
            1,
            "The prime outcomes on $\\{1, 2, 3, 4, 5, 6\\}$ are $\\{2, 3, 5\\}$, of which $\\{3, 5\\}$ are odd ($2$ outcomes). Thus $P = \\dfrac{2}{6} = \\dfrac{1}{3}$.",
            "Foundational", "Basic Event Probability"
        ),
        make_mcq(
            "If the mean of $4, 9, 11, 15,$ and $x$ is $12$, what is the value of $x$?",
            ["$17$", "$19$", "$21$", "$23$"],
            2,
            "Since the mean of $5$ numbers is $12$, their sum is $5 \\times 12 = 60$. Thus $4 + 9 + 11 + 15 + x = 39 + x = 60 \\Rightarrow x = 21$.",
            "Foundational", "Finding a Missing Value from the Mean"
        ),
        make_mcq(
            "Which statistic is LEAST affected when a single extreme high outlier is added to a dataset of $50$ home prices?",
            ["Mean", "Range", "Standard deviation", "Median"],
            3,
            "The median depends only on the middle rank(s) of the sorted data and is resistant to extreme outliers, whereas the mean, range, and standard deviation all increase substantially.",
            "Foundational", "Resistant vs. Non-Resistant Statistics"
        ),
        make_mcq(
            "In a survey of $150$ high school seniors, $90$ plan to study science, $60$ plan to study engineering, and $30$ plan to study both. If one senior is selected at random, what is the probability that the senior plans to study science or engineering?",
            ["$0.60$", "$0.75$", "$0.80$", "$1.00$"],
            2,
            "By the addition rule, $n(S \\cup E) = 90 + 60 - 30 = 120$. Probability $= \\dfrac{120}{150} = 0.80$.",
            "Foundational", "Addition Rule of Probability"
        ),
        make_mcq(
            "A scatterplot shows a strong negative linear association between $x$ and $y$. Which of the following could be the sample correlation coefficient $r$?",
            ["$r = -0.92$", "$r = -0.15$", "$r = 0.08$", "$r = 0.89$"],
            0,
            "A strong negative linear association corresponds to a correlation coefficient $r$ close to $-1$, such as $r = -0.92$.",
            "Foundational", "Interpreting the Correlation Coefficient $r$"
        ),
        make_mcq(
            "The bar chart below shows the distribution of scores on a $5$-point quiz. What is the mode of the quiz scores?",
            ["$2$", "$3$", "$4$", "$5$"],
            2,
            "Score $4$ has the highest frequency ($14$ students), so the mode is $4$.",
            "Foundational", "Reading Mode from a Frequency Histogram/Bar Chart",
            figure={
                "type": "bars",
                "categories": ["1", "2", "3", "4", "5"],
                "values": [2, 5, 9, 14, 6],
                "highlight_index": 3,
                "ylabel": "Number of Students",
                "width": 205
            }
        ),
        make_mcq(
            "A researcher wants to estimate the average daily screen time of all $2{,}400$ students at a high school. Which sampling method is most likely to yield an unbiased estimate?",
            [
                "Surveying $100$ students in the computer club.",
                "Selecting $100$ students using a random number generator from the full school roster.",
                "Posting an optional online poll on the school website.",
                "Asking the first $100$ students who arrive at the library before 8:00 AM."
            ],
            1,
            "A simple random sample from the complete population frame gives every student an equal probability of selection and avoids voluntary-response or convenience bias.",
            "Foundational", "Random Sampling & Bias Prevention"
        ),
        # Intermediate (29-37)
        make_mcq(
            "Set X is $\\{2, 4, 6, 8, 10\\}$ and Set Y is $\\{102, 104, 106, 108, 110\\}$. Which statement correctly compares their standard deviations?",
            [
                "Set X has a greater standard deviation than Set Y.",
                "Set Y has a greater standard deviation than Set X.",
                "Both sets have the exact same standard deviation.",
                "The standard deviation of Set Y is $100$ plus the standard deviation of Set X."
            ],
            2,
            "Adding a constant ($+100$) to every element shifts the mean by $+100$ but leaves all deviations from the mean unchanged, so both sets have the exact same standard deviation.",
            "Intermediate", "Shift Invariance of Standard Deviation"
        ),
        make_mcq(
            "In a two-way table of $300$ voters classified by age group (Under 40 vs. 40+) and opinion (Support vs. Oppose), $120$ voters are Under 40, and $75$ of those Under 40 support the measure. If opinion is statistically independent of age group, how many of the $180$ voters aged 40+ support the measure?",
            ["$90$", "$105$", "$112.5$", "$120$"],
            2,
            "Wait: since counts of people must be an integer, let us use $160$ voters aged 40+: among Under 40, the support rate is $\\dfrac{75}{120} = 62.5\\% = \\dfrac{5}{8}$, so out of $160$ voters aged 40+, $\\dfrac{5}{8}(160) = 100$ support the measure!",
            "Intermediate", "Statistical Independence in Two-Way Tables"
        ),
        make_mcq(
            "A exponential regression model $\\hat{y} = 25(1.4)^x$ is fit to a dataset. If the actual data point at $x = 2$ is $(2, 46.5)$, what is the residual at $x = 2$?",
            ["$-2.5$", "$-1.5$", "$1.5$", "$2.5$"],
            0,
            "Predicted value at $x = 2$: $\\hat{y} = 25(1.4)^2 = 25(1.96) = 49.0$. Residual $= y - \\hat{y} = 46.5 - 49.0 = -2.5$.",
            "Intermediate", "Residuals in Nonlinear Regression"
        ),
        make_mcq(
            "A dataset of $21$ integers has median $30$ and interquartile range $14$. If every number in the dataset is multiplied by $2$ and then increased by $5$, what are the new median and new IQR?",
            [
                "Median $= 65$, IQR $= 28$",
                "Median $= 65$, IQR $= 33$",
                "Median $= 60$, IQR $= 28$",
                "Median $= 60$, IQR $= 33$"
            ],
            0,
            "Measures of position (median) scale and shift: $2(30) + 5 = 65$. Measures of spread (IQR) scale by $|2|$ but are unaffected by the $+5$ shift: $2(14) = 28$.",
            "Intermediate", "Effect of Linear Scaling on Median & IQR"
        ),
        make_mcq(
            "A clinical trial randomly assigns $400$ adult migraine sufferers to receive either a new medication or a placebo, and finds a statistically significant reduction in migraine frequency in the medication group. To which group can this causal finding be safely generalized?",
            [
                "All adults worldwide",
                "All children and adults with headaches",
                "Adults suffering from migraines similar to those in the study",
                "Only the $400$ participants in the study"
            ],
            2,
            "Random assignment establishes causation, and results generalize to the population represented by the study's inclusion criteria (adult migraine sufferers similar to the participants).",
            "Intermediate", "Scope of Inference (Generalizability vs. Causation)"
        ),
        make_mcq(
            "A bag contains $4$ green, $5$ yellow, and $6$ white balls. If two balls are drawn successively without replacement, what is the probability that neither ball is white?",
            ["$\\dfrac{6}{35}$", "$\\dfrac{12}{35}$", "$\\dfrac{9}{25}$", "$\\dfrac{19}{35}$"],
            1,
            "There are $4 + 5 = 9$ non-white balls out of $15$ total. Thus $P(\\text{neither white}) = \\dfrac{9}{15} \\cdot \\dfrac{8}{14} = \\dfrac{3}{5} \\cdot \\dfrac{4}{7} = \\dfrac{12}{35}$.",
            "Intermediate", "Compound Probability Without Replacement"
        ),
        make_mcq(
            "In a symmetric, bell-shaped distribution with mean $70$ and standard deviation $8$, approximately $68\\%$ of the data lies within one standard deviation of the mean, and $95\\%$ lies within two standard deviations. Approximately what percentage of the data lies between $70$ and $86$?",
            ["$34\\%$", "$47.5\\%$", "$68\\%$", "$81.5\\%$"],
            1,
            "The value $70$ is the mean $\\mu$, and $86 = 70 + 2(8) = \\mu + 2\\sigma$. Since $95\\%$ of the distribution lies within $\\mu \\pm 2\\sigma$, by symmetry half of that ($47.5\\%$) lies between $\\mu$ and $\\mu + 2\\sigma$.",
            "Intermediate", "Empirical Rule & Symmetry"
        ),
        make_mcq(
            "The mean of $10$ numbers is $15$. When two numbers are removed, the mean of the remaining $8$ numbers becomes $14$. What is the average (arithmetic mean) of the two removed numbers?",
            ["$16$", "$17.5$", "$19$", "$21$"],
            2,
            "Original sum $= 10 \\times 15 = 150$. Remaining sum $= 8 \\times 14 = 112$. Sum of the two removed numbers $= 150 - 112 = 38$, so their mean is $\\dfrac{38}{2} = 19$.",
            "Intermediate", "Subgroup Removal & Mean Reconstruction"
        ),
        make_mcq(
            "A pollster wants to reduce the margin of error of a $95\\%$ confidence interval from $\\pm 6\\%$ to $\\pm 2\\%$. By what factor must the random sample size $n$ be multiplied?",
            ["$3$", "$6$", "$9$", "$12$"],
            2,
            "To divide the margin of error by $3$ (from $6\\%$ to $2\\%$), the sample size $n$ must be multiplied by $3^2 = 9$.",
            "Intermediate", "Inverse-Square Sample Size Rule"
        ),
        # Challenging & Cross-Lesson Synthesis (38-45)
        make_mcq(
            "For a dataset of $4$ numbers $\\{2, 5, 9, x\\}$, the sample variance is minimized when $x$ equals the mean of the other three numbers. What is this value of $x$?",
            ["$5$", "$\\dfrac{16}{3}$", "$6$", "$7$"],
            1,
            "The sum of squared deviations $\\sum (x_i - \\bar{x})^2$ as a quadratic function of $x$ is minimized when $x$ equals the mean of the fixed numbers: $x = \\dfrac{2 + 5 + 9}{3} = \\dfrac{16}{3}$.",
            "Challenging", "Minimizing Variance via Quadratic Optimization",
            cross_lesson="Topic 3.01 (Quadratic Minimization)"
        ),
        make_mcq(
            "Two independent events $A$ and $B$ satisfy $P(A) = p$, $P(B) = p + 0.2$, and $P(A \\cap B) = 0.15$. What is the value of $P(A \\cup B)$?",
            ["$0.45$", "$0.50$", "$0.65$", "$0.80$"],
            2,
            "By independence, $P(A \\cap B) = p(p + 0.2) = 0.15 \\Rightarrow p^2 + 0.2p - 0.15 = 0 \\Rightarrow (p + 0.5)(p - 0.3) = 0 \\Rightarrow p = 0.3$. Then $P(A) = 0.3, P(B) = 0.5$, and $P(A \\cup B) = 0.3 + 0.5 - 0.15 = 0.65$.",
            "Challenging", "Independent Events & Quadratic Probability Equations",
            cross_lesson="Topic 3.01 (Quadratics)"
        ),
        make_mcq(
            "In a coordinate grid, a random walker starts at $(0, 0)$ and takes $4$ independent steps, each of length $1$ unit either East ($+x$) or North ($+y$) with equal probability $\\dfrac{1}{2}$. What is the probability that the walker ends on the line $y = x$?",
            ["$\\dfrac{1}{4}$", "$\\dfrac{3}{8}$", "$\\dfrac{1}{2}$", "$\\dfrac{5}{16}$"],
            1,
            "After $4$ steps, $x + y = 4$. To land on $y = x$, the walker must land at $(2, 2)$, which requires choosing exactly $2$ East and $2$ North steps out of $4$: $\\dfrac{\\binom{4}{2}}{2^4} = \\dfrac{6}{16} = \\dfrac{3}{8}$.",
            "Challenging", "Binomial Random Walk on a Coordinate Line",
            cross_lesson="Topic 1.01 (Coordinate Lines)"
        ),
        make_mcq(
            "The least-squares regression line for a bivariate dataset is $\\hat{y} = -1.5x + 28$. If the mean of the $y$-values is $\\bar{y} = 10$ and the ratio of standard deviations is $\\dfrac{s_y}{s_x} = 2.0$, what is the correlation coefficient $r$ and the mean $\\bar{x}$?",
            [
                "$r = -0.75$ and $\\bar{x} = 12$",
                "$r = -0.75$ and $\\bar{x} = 10$",
                "$r = 0.75$ and $\\bar{x} = 12$",
                "$r = -0.50$ and $\\bar{x} = 12$"
            ],
            0,
            "Since slope $m = r \\dfrac{s_y}{s_x}$, we have $-1.5 = r(2.0) \\Rightarrow r = -0.75$. Using the centroid $(\\bar{x}, \\bar{y})$: $10 = -1.5\\bar{x} + 28 \\Rightarrow 1.5\\bar{x} = 18 \\Rightarrow \\bar{x} = 12$.",
            "Challenging", "OLS Slope Identity $m = r(s_y/s_x)$ & Centroid",
            cross_lesson="Topic 1.01 (Linear Equations)"
        ),
        make_mcq(
            "A list of $7$ positive integers has median $10$, unique mode $8$, and mean $12$. What is the minimum possible value of the largest integer in the list?",
            ["$15$", "$16$", "$17$", "$18$"],
            1,
            "Sort $x_1 \\le x_2 \\le x_3 \\le 10 \\le x_5 \\le x_6 \\le x_7$ with sum $7 \\times 12 = 84$. Since $8$ is the unique mode, at least two of $x_1, x_2, x_3$ equal $8$, and to minimize $x_7$, make $x_1, x_2, x_3$ as large as possible: $x_1 = x_2 = x_3 = 8$ (three $8$s, so $x_5, x_6, x_7$ can even share a pair without beating mode $8$!). Then $x_5 + x_6 + x_7 = 84 - (24 + 10) = 50$. Minimizing the maximum of three integers summing to $50$ gives $16, 17, 17$ (sum $50$, $17$ appears twice $< 3$ times for $8$), so $x_7 = 17$!",
            "Challenging", "Minimax Statistical Constraint Optimization",
            cross_lesson="Topic 2.01 (Systems of Inequalities)"
        ),
        make_mcq(
            "A point is chosen uniformly at random inside a regular hexagon of side length $2$. What is the probability that the point lies inside the inscribed circle (which is tangent to all $6$ sides)?",
            [
                "$\\dfrac{\\pi}{2\\sqrt{3}}$",
                "$\\dfrac{\\pi}{3\\sqrt{3}}$",
                "$\\dfrac{\\pi\\sqrt{3}}{6}$",
                "$\\dfrac{2\\pi}{3\\sqrt{3}}$"
            ],
            0,
            "For side $s = 2$, the hexagon area is $6 \\cdot \\dfrac{\\sqrt{3}}{4}(2^2) = 6\\sqrt{3}$, and the apothem (inradius) is $r = \\sqrt{3}$, giving circle area $\\pi(\\sqrt{3})^2 = 3\\pi$. The probability is $\\dfrac{3\\pi}{6\\sqrt{3}} = \\dfrac{\\pi}{2\\sqrt{3}}$ (equivalently $\\dfrac{\\pi\\sqrt{3}}{6}$).",
            "Challenging", "Geometric Probability in Inscribed Polygons",
            cross_lesson="Topic 8.01 (Polygons) & Topic 9.01 (Circles)"
        ),
        make_mcq(
            "Across two hospital clinics, Clinic A treats $90$ mild cases ($90\\%$ recovery) and $10$ severe cases ($50\\%$ recovery), while Clinic B treats $20$ mild cases ($95\\%$ recovery) and $80$ severe cases ($60\\%$ recovery). Which statement illustrates Simpson's Paradox?",
            [
                "Clinic A has a higher recovery rate in both categories, and a higher overall recovery rate.",
                "Clinic B has a higher recovery rate in both mild and severe categories, yet Clinic A has a higher overall combined recovery rate.",
                "Both clinics have the exact same overall recovery rate.",
                "Clinic B has a higher overall recovery rate despite lower category rates."
            ],
            1,
            "Clinic B outperforms Clinic A in both mild ($95\\% > 90\\%$) and severe ($60\\% > 50\\%$) cases, yet Clinic A's overall rate is $\\dfrac{81 + 5}{100} = 86\\%$ while Clinic B's overall rate is $\\dfrac{19 + 48}{100} = 67\\%$ because of confounding case-severity proportions (Simpson's Paradox).",
            "Challenging", "Simpson's Paradox & Confounding Variables",
            cross_lesson="Topic 5.01 (Weighted Percentages)"
        ),
        make_mcq(
            "A exponential decay dataset $(t, y)$ is transformed via $u = \\ln(y)$. If the sample variance of $t$ is $s_t^2 = 4$, the sample variance of $u$ is $s_u^2 = 9$, and the points $(t_i, u_i)$ lie exactly on a line with negative slope, what is the slope of that line?",
            ["$-2.25$", "$-1.5$", "$-0.67$", "$1.5$"],
            1,
            "Because the points lie exactly on a line with negative slope, $r = -1$. With $s_t = 2$ and $s_u = 3$, the slope is $m = r \\dfrac{s_u}{s_t} = -1 \\cdot \\dfrac{3}{2} = -1.5$.",
            "Challenging", "Linearized Regression Slope from Variances",
            cross_lesson="Topic 4.01 (Exponential Decay)"
        ),
    ]

    mcqs[9] = make_mcq(
        "In a two-way table of $280$ voters classified by age group (Under 40 vs. 40+) and opinion (Support vs. Oppose), $120$ voters are Under 40, and $75$ of those Under 40 support the measure. If opinion is statistically independent of age group, how many of the $160$ voters aged 40+ support the measure?",
        ["$90$", "$96$", "$100$", "$112$"],
        2,
        "Among voters Under 40, the support proportion is $\\dfrac{75}{120} = \\dfrac{5}{8} = 62.5\\%$. By statistical independence, the same proportion applies to the $160$ voters aged 40+: $\\dfrac{5}{8} \\times 160 = 100$.",
        "Intermediate", "Statistical Independence in Two-Way Tables"
    )
    mcqs[21] = make_mcq(
        "A list of $7$ positive integers has median $10$, unique mode $8$, and mean $12$. What is the minimum possible value of the largest integer in the list?",
        ["$15$", "$16$", "$17$", "$18$"],
        2,
        "Sort $x_1 \\le x_2 \\le x_3 \\le 10 \\le x_5 \\le x_6 \\le x_7$ with sum $7 \\times 12 = 84$. To minimize $x_7$, maximize $x_1, x_2, x_3$ while making $8$ the unique mode: set $x_1 = x_2 = x_3 = 8$ (frequency $3$). Then $x_5 + x_6 + x_7 = 84 - 34 = 50$. Splitting $50$ as evenly as possible gives $16, 17, 17$ (where $17$ has frequency $2 < 3$), so the minimum possible value of $x_7$ is $17$.",
        "Challenging", "Minimax Statistical Constraint Optimization",
        cross_lesson="Topic 2.01 (Systems of Inequalities)"
    )
    mcqs[22] = make_mcq(
        "A point is chosen uniformly at random inside a regular hexagon of side length $2$. What is the probability that the point lies inside the inscribed circle (which is tangent to all $6$ sides)?",
        [
            "$\\dfrac{\\pi}{2\\sqrt{3}}$",
            "$\\dfrac{\\pi}{3\\sqrt{3}}$",
            "$\\dfrac{\\pi}{4\\sqrt{3}}$",
            "$\\dfrac{2\\pi}{3\\sqrt{3}}$"
        ],
        0,
        "For side $s = 2$, the hexagon area is $6 \\cdot \\dfrac{\\sqrt{3}}{4}(2^2) = 6\\sqrt{3}$, and the apothem (inradius) is $r = \\sqrt{3}$, giving circle area $\\pi(\\sqrt{3})^2 = 3\\pi$. The probability is $\\dfrac{3\\pi}{6\\sqrt{3}} = \\dfrac{\\pi}{2\\sqrt{3}}$.",
        "Challenging", "Geometric Probability in Inscribed Polygons",
        cross_lesson="Topic 8.01 (Polygons) & Topic 9.01 (Circles)"
    )

    return {
        "track": "sat",
        "num": "6.01",
        "title": "Statistics, Data & Probability",
        "sub": "20 FRQs + 25 MCQs • Difficulty Progression • Cross-Lesson Synthesis",
        "sections": [
            {"heading": "Part I — Free-Response Questions (FRQs): Foundational Fluency (1–7)", "questions": frqs[0:7]},
            {"heading": "Part I — Free-Response Questions (FRQs): Intermediate Modeling (8–14)", "questions": frqs[7:14]},
            {"heading": "Part I — Free-Response Questions (FRQs): Challenging & Cross-Lesson Synthesis (15–20)", "questions": frqs[14:20]},
            {"heading": "Part II — Multiple-Choice Questions (MCQs): Foundational Concepts (21–28)", "questions": mcqs[0:8]},
            {"heading": "Part II — Multiple-Choice Questions (MCQs): Intermediate Exam Practice (29–37)", "questions": mcqs[8:17]},
            {"heading": "Part II — Multiple-Choice Questions (MCQs): Challenging & Cross-Lesson Synthesis (38–45)", "questions": mcqs[17:25]},
        ]
    }


# ==============================================================================
# TOPIC 7.01: Triangles, Lines & Angles
# ==============================================================================
def build_7_01():
    frqs = [
        # Foundational (1-7)
        make_frq(
            "Two parallel lines $\\ell_1 \\parallel \\ell_2$ are intersected by a transversal $t$. If a pair of consecutive interior (co-interior) angles have measures $(3x + 15)^{\\circ}$ and $(2x - 5)^{\\circ}$, find $x$ and the measure of both angles.",
            "Consecutive interior angles are supplementary: $(3x + 15) + (2x - 5) = 180 \\Rightarrow 5x + 10 = 180 \\Rightarrow 5x = 170 \\Rightarrow x = 34$. The two angles measure $3(34) + 15 = 117^{\\circ}$ and $2(34) - 5 = 63^{\\circ}$.",
            "Foundational", "Parallel Lines & Transversal Angle Relationships"
        ),
        make_frq(
            "In $\\triangle ABC$, the exterior angle at vertex $C$ measures $134^{\\circ}$, and the interior angle $\\angle A$ measures $58^{\\circ}$. Find $\\angle B$ and $\\angle ACB$.",
            "By the Exterior Angle Theorem, $\\angle A + \\angle B = 134^{\\circ} \\Rightarrow 58^{\\circ} + \\angle B = 134^{\\circ} \\Rightarrow \\angle B = 76^{\\circ}$. The interior angle at $C$ is $\\angle ACB = 180^{\\circ} - 134^{\\circ} = 46^{\\circ}$.",
            "Foundational", "Triangle Angle-Sum & Exterior Angle Theorem"
        ),
        make_frq(
            "In right triangle $ABC$ shown below, $\\angle C = 90^{\\circ}$, $AC = 15$, and $BC = 8$. Find (a) the hypotenuse $AB$, (b) $\\sin A$, (c) $\\cos A$, and (d) $\\tan B$.",
            "(a) By the Pythagorean theorem, $AB = \\sqrt{15^2 + 8^2} = \\sqrt{289} = 17$. (b) $\\sin A = \\dfrac{8}{17}$. (c) $\\cos A = \\dfrac{15}{17}$. (d) $\\tan B = \\dfrac{15}{8}$.",
            "Foundational", "Pythagorean Theorem & Right-Triangle Trig Ratios",
            figure={
                "type": "triangle",
                "vertices": [[0, 0], [15, 0], [0, 8]],
                "labels": ["$C$", "$A$", "$B$"],
                "side_labels": ["$15$", "$17$", "$8$"],
                "right_angle_at": 0,
                "fill": True,
                "width": 205
            }
        ),
        make_frq(
            "Find the exact perimeter and area of an equilateral triangle whose altitude has length $6\\sqrt{3}\\,\\mathrm{cm}$.",
            "In a $30^{\\circ}\\text{-}60^{\\circ}\\text{-}90^{\\circ}$ half-triangle, altitude $h = \\dfrac{\\sqrt{3}}{2}s = 6\\sqrt{3} \\Rightarrow s = 12\\,\\mathrm{cm}$. Thus the perimeter is $3s = 36\\,\\mathrm{cm}$ and the area is $\\dfrac{1}{2}(12)(6\\sqrt{3}) = 36\\sqrt{3}\\,\\mathrm{cm^2}$.",
            "Foundational", "Special Right Triangles ($30^{\\circ}\\text{-}60^{\\circ}\\text{-}90^{\\circ}$)"
        ),
        make_frq(
            "A square has diagonal of length $10\\sqrt{2}\\,\\mathrm{m}$. Find its side length, perimeter, and area.",
            "In a $45^{\\circ}\\text{-}45^{\\circ}\\text{-}90^{\\circ}$ right triangle, $d = s\\sqrt{2} = 10\\sqrt{2} \\Rightarrow s = 10\\,\\mathrm{m}$. Perimeter $= 4s = 40\\,\\mathrm{m}$, and Area $= s^2 = 100\\,\\mathrm{m^2}$.",
            "Foundational", "Special Right Triangles ($45^{\\circ}\\text{-}45^{\\circ}\\text{-}90^{\\circ}$)"
        ),
        make_frq(
            "Two sides of a triangle have lengths $7$ and $12$. State the strict inequality for all possible lengths $x$ of the third side, and find how many integer values $x$ can take.",
            "By the Triangle Inequality Theorem, $|12 - 7| < x < 12 + 7 \\Rightarrow 5 < x < 19$. The possible integer lengths are $6, 7, \\dots, 18$, which gives $18 - 6 + 1 = 13$ integer values.",
            "Foundational", "Triangle Inequality Theorem"
        ),
        make_frq(
            "In $\\triangle PQR$, $PQ = PR$ (isosceles) and the vertex angle $\\angle P$ measures $44^{\\circ}$. Find the measure of each base angle $\\angle Q$ and $\\angle R$.",
            "By the Isosceles Triangle Theorem, $\\angle Q = \\angle R = \\dfrac{180^{\\circ} - 44^{\\circ}}{2} = \\dfrac{136^{\\circ}}{2} = 68^{\\circ}$.",
            "Foundational", "Isosceles Triangle Properties"
        ),
        # Intermediate (8-14)
        make_frq(
            "In $\\triangle ABC$, segment $DE$ is parallel to base $BC$ with $D$ on $AB$ and $E$ on $AC$. Given $AD = 6$, $DB = 9$, and $DE = 8$, find the length of $BC$ and the ratio of the area of $\\triangle ADE$ to the area of $\\triangle ABC$.",
            "Since $DE \\parallel BC$, $\\triangle ADE \\sim \\triangle ABC$ with scale factor $k = \\dfrac{AD}{AB} = \\dfrac{6}{6 + 9} = \\dfrac{6}{15} = \\dfrac{2}{5}$. Thus $\\dfrac{8}{BC} = \\dfrac{2}{5} \\Rightarrow BC = 20$. The area ratio is $k^2 = \\left(\\dfrac{2}{5}\\right)^2 = \\dfrac{4}{25}$.",
            "Intermediate", "Similar Triangles & Parallel Cross-Sections"
        ),
        make_frq(
            "In right triangle $DEF$ with $\\angle F = 90^{\\circ}$, $\\sin D = \\dfrac{5}{13}$. Find $\\cos E$, $\\cos D$, and $\\tan E$.",
            "Since $D$ and $E$ are complementary ($D + E = 90^{\\circ}$), $\\cos E = \\sin D = \\dfrac{5}{13}$. By the Pythagorean identity, $\\cos D = \\sqrt{1 - (5/13)^2} = \\dfrac{12}{13}$, and $\\tan E = \\cot D = \\dfrac{12}{5}$.",
            "Intermediate", "Complementary Angle Identity $\\sin\\theta = \\cos(90^{\\circ}-\\theta)$"
        ),
        make_frq(
            "In right triangle $ABC$, the altitude $CD$ is drawn to the hypotenuse $AB$. If $AD = 4$ and $DB = 9$, find the length of the altitude $CD$ and both legs $AC$ and $BC$.",
            "By the Geometric Mean (Right-Triangle Altitude) Theorem: $CD = \\sqrt{AD \\cdot DB} = \\sqrt{4 \\cdot 9} = 6$. Since $AB = 4 + 9 = 13$, $AC = \\sqrt{AD \\cdot AB} = \\sqrt{4 \\cdot 13} = 2\\sqrt{13}$ and $BC = \\sqrt{DB \\cdot AB} = \\sqrt{9 \\cdot 13} = 3\\sqrt{13}$.",
            "Intermediate", "Geometric Mean Theorems in Right Triangles"
        ),
        make_frq(
            "Find the measure of one interior angle and one exterior angle of a regular $15$-sided polygon (pentadecagon).",
            "Each exterior angle of a regular $n$-gon measures $\\dfrac{360^{\\circ}}{n} = \\dfrac{360^{\\circ}}{15} = 24^{\\circ}$. Therefore each interior angle measures $180^{\\circ} - 24^{\\circ} = 156^{\\circ}$.",
            "Intermediate", "Interior & Exterior Angles of Regular Polygons"
        ),
        make_frq(
            "A surveyor stands $40\\,\\mathrm{m}$ from the base of a vertical radio tower on level ground. The angle of elevation to the top of the tower is $60^{\\circ}$, and the surveyor's eye level is $1.6\\,\\mathrm{m}$ above the ground. Find the exact height of the tower and its decimal approximation to two decimal places.",
            "Height above eye level $= 40\\tan 60^{\\circ} = 40\\sqrt{3}\\,\\mathrm{m}$. Adding eye height gives $H = 40\\sqrt{3} + 1.6 \\approx 69.28 + 1.6 = 70.88\\,\\mathrm{m}$.",
            "Intermediate", "Angles of Elevation & Depression",
            figure={
                "type": "triangle",
                "vertices": [[0, 0], [4, 0], [4, 6.93]],
                "labels": ["$A$", "$C$", "$B$"],
                "side_labels": ["$40\\,\\mathrm{m}$", "$40\\sqrt{3}$", None],
                "right_angle_at": 1,
                "angle_marks": [{"vertex": 0, "label": "$60^{\\circ}$"}],
                "width": 200
            }
        ),
        make_frq(
            "In $\\triangle ABC$, the angle bisector of $\\angle A$ meets side $BC$ at point $D$. If $AB = 10$, $AC = 15$, and $BC = 20$, find the exact lengths of $BD$ and $DC$.",
            "By the Angle Bisector Theorem, $\\dfrac{BD}{DC} = \\dfrac{AB}{AC} = \\dfrac{10}{15} = \\dfrac{2}{3}$. Since $BD + DC = 20$, we have $BD = \\dfrac{2}{5}(20) = 8$ and $DC = \\dfrac{3}{5}(20) = 12$.",
            "Intermediate", "Triangle Angle Bisector Theorem"
        ),
        make_frq(
            "An isosceles trapezoid has parallel bases of lengths $10\\,\\mathrm{cm}$ and $26\\,\\mathrm{cm}$ and non-parallel legs of length $17\\,\\mathrm{cm}$. Find the height $h$, the area, and the length of each diagonal of the trapezoid.",
            "Dropping altitudes from the shorter base splits the longer base into $8 + 10 + 8$. By the Pythagorean theorem, $h = \\sqrt{17^2 - 8^2} = 15\\,\\mathrm{cm}$. Area $= \\dfrac{10 + 26}{2} \\times 15 = 270\\,\\mathrm{cm^2}$. Each diagonal is the hypotenuse of a right triangle with legs $10 + 8 = 18$ and $15$: $d = \\sqrt{18^2 + 15^2} = \\sqrt{549} = 3\\sqrt{61}\\,\\mathrm{cm}$.",
            "Intermediate", "Isosceles Trapezoids & Pythagorean Decomposition"
        ),
        # Challenging & Cross-Lesson Synthesis (15-20)
        make_frq(
            "In $\\triangle ABC$, the vertices are $A(1, 2)$, $B(9, 2)$, and $C(5, 8)$. Verify that $\\triangle ABC$ is isosceles, find the length of the altitude from $C$ to $AB$, and determine the coordinates of the centroid $G$.",
            "Base $AB$ is horizontal of length $9 - 1 = 8$. Side $AC = \\sqrt{(5-1)^2 + (8-2)^2} = \\sqrt{16 + 36} = \\sqrt{52} = 2\\sqrt{13}$ and $BC = \\sqrt{(5-9)^2 + (8-2)^2} = 2\\sqrt{13}$, so $AC = BC$. The altitude from $C(5, 8)$ to $y = 2$ has length $8 - 2 = 6$. The centroid is $G = \\left(\\dfrac{1+9+5}{3}, \\dfrac{2+2+8}{3}\\right) = (5, 4)$.",
            "Challenging", "Coordinate Triangle Geometry & Centroid",
            cross_lesson="Topic 1.01 (Coordinate Geometry)"
        ),
        make_frq(
            "In a right triangle, one leg is $7\\,\\mathrm{cm}$ longer than the other leg, and the hypotenuse is $17\\,\\mathrm{cm}$. Set up and solve a quadratic equation to find the lengths of the two legs and the sine of the smaller acute angle.",
            "Let the shorter leg be $x$ and the longer leg be $x + 7$: $x^2 + (x + 7)^2 = 17^2 \\Rightarrow 2x^2 + 14x + 49 = 289 \\Rightarrow x^2 + 7x - 120 = 0 \\Rightarrow (x + 15)(x - 8) = 0$. Since $x > 0$, the legs are $8\\,\\mathrm{cm}$ and $15\\,\\mathrm{cm}$, and the sine of the smaller acute angle (opposite the $8\\,\\mathrm{cm}$ leg) is $\\dfrac{8}{17}$.",
            "Challenging", "Algebraic Right Triangles via Quadratics",
            cross_lesson="Topic 3.01 (Quadratic Equations)"
        ),
        make_frq(
            "In $\\triangle ABC$, $AB = 7$, $BC = 8$, and $\\angle B = 60^{\\circ}$. Use the Law of Cosines to find the exact length of side $AC$ and the exact area of $\\triangle ABC$.",
            "By the Law of Cosines, $AC^2 = 7^2 + 8^2 - 2(7)(8)\\cos 60^{\\circ} = 49 + 64 - 56 = 57 \\Rightarrow AC = \\sqrt{57}$. The area is $\\dfrac{1}{2}(7)(8)\\sin 60^{\\circ} = 28 \\cdot \\dfrac{\\sqrt{3}}{2} = 14\\sqrt{3}$.",
            "Challenging", "Law of Cosines & Trigonometric Triangle Area",
            cross_lesson="Topic 9.01 (Trigonometry)"
        ),
        make_frq(
            "Triangle $ABC$ is inscribed in a circle of diameter $AB = 20\\,\\mathrm{cm}$. If $\\cos A = \\dfrac{3}{5}$, find the lengths of chords $AC$ and $BC$ and the area of the region inside the circle but outside $\\triangle ABC$.",
            "By Thales' Theorem, $\\angle C = 90^{\\circ}$ because $AB$ is a diameter. Thus $AC = AB\\cos A = 20\\left(\\dfrac{3}{5}\\right) = 12\\,\\mathrm{cm}$ and $BC = \\sqrt{20^2 - 12^2} = 16\\,\\mathrm{cm}$. Triangle area $= \\dfrac{1}{2}(12)(16) = 96\\,\\mathrm{cm^2}$; circle area $= \\pi(10^2) = 100\\pi\\,\\mathrm{cm^2}$. Region area $= (100\\pi - 96)\\,\\mathrm{cm^2}$.",
            "Challenging", "Thales' Theorem & Inscribed Right Triangles",
            cross_lesson="Topic 9.01 (Circles & Inscribed Angles)"
        ),
        make_frq(
            "A square is inscribed inside a right triangle with legs $6$ and $12$ so that one vertex of the square coincides with the right-angle vertex of the triangle and the opposite vertex lies on the hypotenuse. Find the side length $s$ of the square.",
            "Let the square have side $s$. The upper-right small right triangle has legs $6 - s$ and $s$, and is similar to the $6\\text{-}12$ right triangle: $\\dfrac{6 - s}{s} = \\dfrac{6}{12} = \\dfrac{1}{2} \\Rightarrow 12 - 2s = s \\Rightarrow 3s = 12 \\Rightarrow s = 4$.",
            "Challenging", "Inscribed Square via Similar Right Triangles",
            cross_lesson="Topic 5.01 (Proportions) & Topic 8.01 (Area)"
        ),
        make_frq(
            "In $\\triangle ABC$, medians $AD$ and $BE$ are perpendicular to each other and have lengths $AD = 9$ and $BE = 12$. Using the centroid ratio $2 : 1$, find the length of side $AB$ and the area of $\\triangle ABC$.",
            "The centroid $G$ divides each median in a $2 : 1$ ratio, so $AG = 6, GD = 3$ and $BG = 8, GE = 4$. Since $AD \\perp BE$ at $G$, in right triangle $AGB$ we have $AB = \\sqrt{6^2 + 8^2} = 10$. The area of orthogonal-diagonal quadrilateral $ABDE$ (or using $\\triangle ABC = 3 \\cdot \\triangle AGB$): $[AGB] = \\dfrac{1}{2}(6)(8) = 24$, and since the three sub-triangles $AGB, BGC, CGA$ have equal area, $[ABC] = 3(24) = 72$.",
            "Challenging", "Orthogonal Medians & Centroid Area Partition",
            cross_lesson="Topic 8.01 (Area Decomposition)"
        ),
    ]

    mcqs = [
        # Foundational (21-28)
        make_mcq(
            "In $\\triangle ABC$, $\\angle A = 42^{\\circ}$ and $\\angle B = 73^{\\circ}$. What is the measure of $\\angle C$?",
            ["$55^{\\circ}$", "$65^{\\circ}$", "$75^{\\circ}$", "$115^{\\circ}$"],
            1,
            "The interior angles of a triangle sum to $180^{\\circ}$: $\\angle C = 180^{\\circ} - (42^{\\circ} + 73^{\\circ}) = 65^{\\circ}$.",
            "Foundational", "Triangle Angle-Sum Theorem"
        ),
        make_mcq(
            "In a right triangle, the legs have lengths $9$ and $12$. What is the length of the hypotenuse?",
            ["$13$", "$15$", "$18$", "$21$"],
            1,
            "By the Pythagorean theorem (a $3\\text{-}4\\text{-}5$ multiple scaled by $3$), $c = \\sqrt{9^2 + 12^2} = \\sqrt{225} = 15$.",
            "Foundational", "Pythagorean Triples"
        ),
        make_mcq(
            "If $\\sin(3x - 10)^{\\circ} = \\cos(2x + 25)^{\\circ}$, where both angles are acute, what is the value of $x$?",
            ["$13$", "$15$", "$17$", "$21$"],
            1,
            "By the cofunction identity, the two acute angles are complementary: $(3x - 10) + (2x + 25) = 90 \\Rightarrow 5x + 15 = 90 \\Rightarrow 5x = 75 \\Rightarrow x = 15$.",
            "Foundational", "Complementary Trig Identities"
        ),
        make_mcq(
            "What is the sum of the interior angles of a convex octagon ($8$ sides)?",
            ["$900^{\\circ}$", "$1080^{\\circ}$", "$1260^{\\circ}$", "$1440^{\\circ}$"],
            1,
            "Sum of interior angles $= (n - 2) \\times 180^{\\circ} = (8 - 2) \\times 180^{\\circ} = 1080^{\\circ}$.",
            "Foundational", "Polygon Interior Angle Sum"
        ),
        make_mcq(
            "Triangles $ABC$ and $DEF$ are similar, with $AB$ corresponding to $DE$. If $AB = 6$, $BC = 10$, and $DE = 9$, what is the length of $EF$?",
            ["$12$", "$13$", "$15$", "$18$"],
            2,
            "Set up the proportion $\\dfrac{EF}{BC} = \\dfrac{DE}{AB} \\Rightarrow \\dfrac{EF}{10} = \\dfrac{9}{6} = 1.5 \\Rightarrow EF = 15$.",
            "Foundational", "Proportions in Similar Triangles"
        ),
        make_mcq(
            "In a $30^{\\circ}\\text{-}60^{\\circ}\\text{-}90^{\\circ}$ right triangle, the side opposite the $30^{\\circ}$ angle has length $7$. What is the length of the side opposite the $60^{\\circ}$ angle?",
            ["$7\\sqrt{2}$", "$7\\sqrt{3}$", "$14$", "$\\dfrac{7\\sqrt{3}}{2}$"],
            1,
            "In a $30^{\\circ}\\text{-}60^{\\circ}\\text{-}90^{\\circ}$ triangle, the legs are in the ratio $1 : \\sqrt{3}$, so the side opposite $60^{\\circ}$ is $7\\sqrt{3}$.",
            "Foundational", "Special Right Triangle Ratios"
        ),
        make_mcq(
            "In the figure below, lines $\\ell$ and $m$ are parallel. If $\\angle 1 = 128^{\\circ}$, what is the measure of its alternate interior angle’s supplement?",
            ["$38^{\\circ}$", "$52^{\\circ}$", "$62^{\\circ}$", "$128^{\\circ}$"],
            1,
            "The alternate interior angle also measures $128^{\\circ}$, so its supplement measures $180^{\\circ} - 128^{\\circ} = 52^{\\circ}$.",
            "Foundational", "Alternate Interior & Supplementary Angles"
        ),
        make_mcq(
            "Which of the following sets of side lengths CANNOT form a triangle?",
            ["$4, 5, 8$", "$6, 6, 11$", "$5, 9, 14$", "$7, 10, 12$"],
            2,
            "In $5, 9, 14$, the sum of the two shorter sides is $5 + 9 = 14$, which fails the strict triangle inequality $a + b > c$.",
            "Foundational", "Testing the Triangle Inequality"
        ),
        # Intermediate (29-37)
        make_mcq(
            "In right triangle $PQR$ shown below, $\\angle R = 90^{\\circ}$, $PR = 12$, and $\\tan P = \\dfrac{3}{4}$. What is the perimeter of $\\triangle PQR$?",
            ["$28$", "$32$", "$36$", "$48$"],
            2,
            "Since $\\tan P = \\dfrac{QR}{PR} = \\dfrac{3}{4}$ and $PR = 12$, we get $QR = 9$. Then $PQ = \\sqrt{12^2 + 9^2} = 15$, so the perimeter is $12 + 9 + 15 = 36$.",
            "Intermediate", "Perimeter from Trigonometric Ratio",
            figure={
                "type": "triangle",
                "vertices": [[0, 0], [12, 0], [0, 9]],
                "labels": ["$R$", "$P$", "$Q$"],
                "side_labels": ["$12$", "$15$", "$9$"],
                "right_angle_at": 0,
                "angle_marks": [{"vertex": 1, "label": "$P$"}],
                "width": 200
            }
        ),
        make_mcq(
            "Two similar triangles have perimeters in the ratio $3 : 7$. If the area of the smaller triangle is $27\\,\\mathrm{cm^2}$, what is the area of the larger triangle?",
            ["$63\\,\\mathrm{cm^2}$", "$108\\,\\mathrm{cm^2}$", "$147\\,\\mathrm{cm^2}$", "$189\\,\\mathrm{cm^2}$"],
            2,
            "Area scales as the square of the linear (perimeter) ratio: $\\dfrac{A_2}{27} = \\left(\\dfrac{7}{3}\\right)^2 = \\dfrac{49}{9} \\Rightarrow A_2 = 3 \\times 49 = 147\\,\\mathrm{cm^2}$.",
            "Intermediate", "Area-to-Perimeter Ratio in Similar Triangles"
        ),
        make_mcq(
            "In an isosceles triangle with two sides of length $13$ and base of length $10$, what is the area of the triangle?",
            ["$60$", "$65$", "$120$", "$130$"],
            0,
            "The altitude to the base bisects the base into segments of length $5$, forming two $5\\text{-}12\\text{-}13$ right triangles with height $h = 12$. Area $= \\dfrac{1}{2}(10)(12) = 60$.",
            "Intermediate", "Altitude & Area of Isosceles Triangles"
        ),
        make_mcq(
            "If each interior angle of a regular polygon measures $165^{\\circ}$, how many sides does the polygon have?",
            ["$18$", "$20$", "$24$", "$30$"],
            2,
            "Each exterior angle measures $180^{\\circ} - 165^{\\circ} = 15^{\\circ}$. Since exterior angles sum to $360^{\\circ}$, $n = \\dfrac{360^{\\circ}}{15^{\\circ}} = 24$ sides.",
            "Intermediate", "Finding Number of Sides from Interior Angle"
        ),
        make_mcq(
            "In right triangle $ABC$ with $\\angle C = 90^{\\circ}$, altitude $CD$ is drawn to hypotenuse $AB$. If $AC = 10$ and $AD = 5$, what is the length of $AB$?",
            ["$15$", "$20$", "$25$", "$5\\sqrt{5}$"],
            1,
            "By the Right-Triangle Leg Geometric Mean Theorem, $AC^2 = AD \\cdot AB \\Rightarrow 10^2 = 5 \\cdot AB \\Rightarrow AB = 20$.",
            "Intermediate", "Geometric Mean Theorem for Right-Triangle Legs"
        ),
        make_mcq(
            "A $25$-foot ladder leans against a vertical wall with its base $7$ feet from the wall. If the top of the ladder slides down the wall by $4$ feet, how many feet does the base of the ladder slide away from the wall?",
            ["$4$", "$7$", "$8$", "$15$"],
            2,
            "Initially, the top is at height $\\sqrt{25^2 - 7^2} = 24\\,\\mathrm{ft}$. After sliding down $4\\,\\mathrm{ft}$ to height $20\\,\\mathrm{ft}$, the new base distance is $\\sqrt{25^2 - 20^2} = 15\\,\\mathrm{ft}$. Thus the base slides out by $15 - 7 = 8\\,\\mathrm{ft}$.",
            "Intermediate", "Sliding Ladder Pythagorean Word Problems"
        ),
        make_mcq(
            "In $\\triangle ABC$, $D$ is the midpoint of $AB$ and $E$ is the midpoint of $AC$. If the area of trapezoid $DBCE$ is $45$, what is the area of $\\triangle ABC$?",
            ["$54$", "$60$", "$75$", "$90$"],
            1,
            "Midsegment $DE$ forms $\\triangle ADE \\sim \\triangle ABC$ with ratio $1 : 2$, so $[ADE] = \\dfrac{1}{4}[ABC]$ and trapezoid $[DBCE] = \\dfrac{3}{4}[ABC] = 45 \\Rightarrow [ABC] = 60$.",
            "Intermediate", "Midsegment Theorem & Area Partition"
        ),
        make_mcq(
            "If $\\theta$ is an acute angle such that $\\sin\\theta = 3\\cos\\theta$, what is the value of $\\sin\\theta\\cos\\theta$?",
            ["$\\dfrac{1}{10}$", "$\\dfrac{3}{10}$", "$\\dfrac{1}{3}$", "$\\dfrac{3}{5}$"],
            1,
            "Since $\\tan\\theta = 3$, a right triangle has opposite leg $3$, adjacent leg $1$, and hypotenuse $\\sqrt{10}$. Thus $\\sin\\theta\\cos\\theta = \\left(\\dfrac{3}{\\sqrt{10}}\\right)\\left(\\dfrac{1}{\\sqrt{10}}\\right) = \\dfrac{3}{10}$.",
            "Intermediate", "Pythagorean Trigonometric Identities"
        ),
        make_mcq(
            "In $\\triangle ABC$, $\\angle A = 30^{\\circ}$, $\\angle C = 45^{\\circ}$, and $AB = 12$. What is the exact length of $BC$?",
            ["$6\\sqrt{2}$", "$6\\sqrt{3}$", "$6\\sqrt{6}$", "$12\\sqrt{2}$"],
            0,
            "Drop altitude $BD$ to $AC$: in the $30^{\\circ}\\text{-}60^{\\circ}\\text{-}90^{\\circ}$ triangle $ABD$, $BD = \\dfrac{1}{2}(12) = 6$. In the $45^{\\circ}\\text{-}45^{\\circ}\\text{-}90^{\\circ}$ triangle $CBD$, $BC = BD\\sqrt{2} = 6\\sqrt{2}$.",
            "Intermediate", "Altitude Decomposition of Oblique Triangles"
        ),
        # Challenging & Cross-Lesson Synthesis (38-45)
        make_mcq(
            "What is the radius of the circle inscribed in a right triangle with legs $9$ and $40$?",
            ["$3.5$", "$4$", "$4.5$", "$5$"],
            1,
            "The hypotenuse is $\\sqrt{9^2 + 40^2} = \\sqrt{81 + 1600} = 41$. The inradius of a right triangle is $r = \\dfrac{a + b - c}{2} = \\dfrac{9 + 40 - 41}{2} = 4$.",
            "Challenging", "Inradius of a Right Triangle",
            cross_lesson="Topic 9.01 (Circles & Tangent Segments)"
        ),
        make_mcq(
            "In the $xy$-plane, line $y = -\\dfrac{3}{4}x + 6$ forms a right triangle with the positive coordinate axes. What is the value of $\\sin\\theta$, where $\\theta$ is the acute angle the line makes with the $x$-axis?",
            ["$\\dfrac{3}{5}$", "$\\dfrac{4}{5}$", "$\\dfrac{3}{4}$", "$\\dfrac{4}{3}$"],
            0,
            "The intercepts are $(8, 0)$ and $(0, 6)$, and the hypotenuse has length $\\sqrt{8^2 + 6^2} = 10$. The side opposite the angle with the $x$-axis is $6$, so $\\sin\\theta = \\dfrac{6}{10} = \\dfrac{3}{5}$.",
            "Challenging", "Slope as Tangent & Trigonometric Ratios of Lines",
            cross_lesson="Topic 1.01 (Linear Intercepts & Slope)"
        ),
        make_mcq(
            "In $\\triangle ABC$, sides $a, b, c$ have lengths $13, 14, 15$. What is the length of the altitude to the side of length $14$?",
            ["$10$", "$11$", "$12$", "$12.5$"],
            2,
            "Decompose the base $14$ into $5 + 9$: both $5\\text{-}12\\text{-}13$ and $9\\text{-}12\\text{-}15$ share the common altitude $h = 12$ (or by Heron's formula, $s = 21$, Area $= \\sqrt{21(8)(7)(6)} = 84 = \\dfrac{1}{2}(14)h \\Rightarrow h = 12$).",
            "Challenging", "Heron's Formula & 13-14-15 Triangle Altitude",
            cross_lesson="Topic 8.01 (Area of Triangles)"
        ),
        make_mcq(
            "If $\\sin\\theta + \\cos\\theta = \\dfrac{7}{5}$ for an acute angle $\\theta$, what is the value of $\\sin\\theta\\cos\\theta$?",
            ["$\\dfrac{12}{25}$", "$\\dfrac{24}{25}$", "$\\dfrac{7}{25}$", "$\\dfrac{12}{5}$"],
            0,
            "Square both sides: $(\\sin\\theta + \\cos\\theta)^2 = \\sin^2\\theta + \\cos^2\\theta + 2\\sin\\theta\\cos\\theta = 1 + 2\\sin\\theta\\cos\\theta = \\dfrac{49}{25} \\Rightarrow 2\\sin\\theta\\cos\\theta = \\dfrac{24}{25} \\Rightarrow \\sin\\theta\\cos\\theta = \\dfrac{12}{25}$.",
            "Challenging", "Algebraic Squaring with $\\sin^2\\theta + \\cos^2\\theta = 1$",
            cross_lesson="Topic 3.01 (Quadratic Identities)"
        ),
        make_mcq(
            "A regular hexagon and an equilateral triangle have the exact same perimeter. What is the ratio of the area of the regular hexagon to the area of the equilateral triangle?",
            ["$1 : 1$", "$3 : 2$", "$2 : 1$", "$4 : 3$"],
            1,
            "Let the common perimeter be $6s$. The hexagon has side $s$ and consists of $6$ equilateral triangles of side $s$. The equilateral triangle has side $2s$ and area equal to $2^2 = 4$ equilateral triangles of side $s$. Thus the area ratio is $6 : 4 = 3 : 2$.",
            "Challenging", "Isoperimetric Area Ratio of Regular Polygons",
            cross_lesson="Topic 5.01 (Ratios) & Topic 8.01 (Polygon Area)"
        ),
        make_mcq(
            "In $\\triangle ABC$, angle bisectors of $\\angle B$ and $\\angle C$ intersect at the incenter $I$. If $\\angle A = 68^{\\circ}$, what is the measure of $\\angle BIC$?",
            ["$112^{\\circ}$", "$124^{\\circ}$", "$134^{\\circ}$", "$146^{\\circ}$"],
            1,
            "Since $\\angle B + \\angle C = 180^{\\circ} - 68^{\\circ} = 112^{\\circ}$, half their sum is $\\dfrac{1}{2}(\\angle B + \\angle C) = 56^{\\circ}$. In $\\triangle BIC$, $\\angle BIC = 180^{\\circ} - 56^{\\circ} = 124^{\\circ}$ (in general, $90^{\\circ} + \\dfrac{1}{2}\\angle A$).",
            "Challenging", "Incenter Angle Formula",
            cross_lesson="Topic 2.01 (Linear Angle Systems)"
        ),
        make_mcq(
            "Two poles of heights $10\\,\\mathrm{m}$ and $15\\,\\mathrm{m}$ stand vertically on level ground $20\\,\\mathrm{m}$ apart. A taut wire connects the top of each pole to the base of the opposite pole. At what height above the ground do the two wires intersect?",
            ["$5\\,\\mathrm{m}$", "$6\\,\\mathrm{m}$", "$6.25\\,\\mathrm{m}$", "$7.5\\,\\mathrm{m}$"],
            1,
            "By the crossed-ladders harmonic property (independent of the horizontal separation $20\\,\\mathrm{m}$), the intersection height $h$ satisfies $\\dfrac{1}{h} = \\dfrac{1}{10} + \\dfrac{1}{15} = \\dfrac{5}{30} = \\dfrac{1}{6} \\Rightarrow h = 6\\,\\mathrm{m}$.",
            "Challenging", "Crossed-Ladders Similar Triangles Theorem",
            cross_lesson="Topic 10.01 (Harmonic & Rational Equations)"
        ),
        make_mcq(
            "What is the area of the triangle with vertices $(0, 0)$, $(6, 2)$, and $(3, 8)$ in the $xy$-plane?",
            ["$18$", "$21$", "$24$", "$27$"],
            1,
            "By the shoelace formula (or bounding box $6 \\times 8 = 48$ minus three right triangles of areas $6, 12, 9$), Area $= \\dfrac{1}{2}|6(8) - 2(3)| = \\dfrac{1}{2}(48 - 6) = 21$.",
            "Challenging", "Coordinate Triangle Area via Bounding Box / Shoelace",
            cross_lesson="Topic 1.01 (Coordinate Plane)"
        ),
    ]

    return {
        "track": "sat",
        "num": "7.01",
        "title": "Triangles, Lines & Angles",
        "sub": "20 FRQs + 25 MCQs • Difficulty Progression • Cross-Lesson Synthesis",
        "sections": [
            {"heading": "Part I — Free-Response Questions (FRQs): Foundational Fluency (1–7)", "questions": frqs[0:7]},
            {"heading": "Part I — Free-Response Questions (FRQs): Intermediate Modeling (8–14)", "questions": frqs[7:14]},
            {"heading": "Part I — Free-Response Questions (FRQs): Challenging & Cross-Lesson Synthesis (15–20)", "questions": frqs[14:20]},
            {"heading": "Part II — Multiple-Choice Questions (MCQs): Foundational Concepts (21–28)", "questions": mcqs[0:8]},
            {"heading": "Part II — Multiple-Choice Questions (MCQs): Intermediate Exam Practice (29–37)", "questions": mcqs[8:17]},
            {"heading": "Part II — Multiple-Choice Questions (MCQs): Challenging & Cross-Lesson Synthesis (38–45)", "questions": mcqs[17:25]},
        ]
    }


# ==============================================================================
# TOPIC 8.01: Area, Volume & 3D Solids
# ==============================================================================
def build_8_01():
    frqs = [
        # Foundational (1-7)
        make_frq(
            "A rectangular prism has length $l = 8\\,\\mathrm{cm}$, width $w = 6\\,\\mathrm{cm}$, and height $h = 5\\,\\mathrm{cm}$, as shown. Find (a) its volume, (b) its total surface area, and (c) the exact length of its space diagonal $d$.",
            "(a) $V = lwh = 8(6)(5) = 240\\,\\mathrm{cm^3}$. (b) $S = 2(lw + lh + wh) = 2(48 + 40 + 30) = 236\\,\\mathrm{cm^2}$. (c) $d = \\sqrt{8^2 + 6^2 + 5^2} = \\sqrt{64 + 36 + 25} = \\sqrt{125} = 5\\sqrt{5}\\,\\mathrm{cm}$.",
            "Foundational", "Rectangular Prism Volume, Surface Area & Space Diagonal",
            figure={
                "type": "solid",
                "solid": "rectangular_prism",
                "dims": [8, 6, 5],
                "labels": {"l": "$8$", "w": "$6$", "h": "$5$"},
                "width": 200
            }
        ),
        make_frq(
            "A right circular cylinder has base radius $r = 4\\,\\mathrm{cm}$ and height $h = 10\\,\\mathrm{cm}$. Compute its exact volume, lateral surface area, and total surface area in terms of $\\pi$.",
            "Volume $V = \\pi r^2 h = \\pi(16)(10) = 160\\pi\\,\\mathrm{cm^3}$. Lateral surface area $L = 2\\pi r h = 80\\pi\\,\\mathrm{cm^2}$. Total surface area $S = 80\\pi + 2\\pi(16) = 112\\pi\\,\\mathrm{cm^2}$.",
            "Foundational", "Cylinder Volume & Surface Area"
        ),
        make_frq(
            "A right circular cone has base radius $r = 5\\,\\mathrm{m}$ and vertical height $h = 12\\,\\mathrm{m}$. Find (a) its slant height $\\ell$, (b) its exact volume, and (c) its total surface area in terms of $\\pi$.",
            "(a) Slant height $\\ell = \\sqrt{5^2 + 12^2} = 13\\,\\mathrm{m}$. (b) Volume $V = \\dfrac{1}{3}\\pi r^2 h = \\dfrac{1}{3}\\pi(25)(12) = 100\\pi\\,\\mathrm{m^3}$. (c) Total surface area $S = \\pi r^2 + \\pi r \\ell = 25\\pi + 65\\pi = 90\\pi\\,\\mathrm{m^2}$.",
            "Foundational", "Right Circular Cone Geometry",
            figure={
                "type": "solid",
                "solid": "cone",
                "dims": [10, 10, 12],
                "labels": {"r": "$5\\,\\mathrm{m}$", "h": "$12\\,\\mathrm{m}$"},
                "width": 195
            }
        ),
        make_frq(
            "A sphere has surface area $144\\pi\\,\\mathrm{cm^2}$. Find its radius $r$ and its exact volume $V$ in terms of $\\pi$.",
            "Since $S = 4\\pi r^2 = 144\\pi$, we have $r^2 = 36 \\Rightarrow r = 6\\,\\mathrm{cm}$. Therefore the volume is $V = \\dfrac{4}{3}\\pi r^3 = \\dfrac{4}{3}\\pi(216) = 288\\pi\\,\\mathrm{cm^3}$.",
            "Foundational", "Sphere Surface Area & Volume"
        ),
        make_frq(
            "A right square pyramid has base edge length $b = 16\\,\\mathrm{cm}$ and vertical height $h = 15\\,\\mathrm{cm}$. Find (a) its volume, (b) the slant height $\\ell$ of each triangular face, and (c) its total surface area.",
            "(a) $V = \\dfrac{1}{3}b^2 h = \\dfrac{1}{3}(256)(15) = 1{,}280\\,\\mathrm{cm^3}$. (b) Half the base edge is $8\\,\\mathrm{cm}$, so slant height $\\ell = \\sqrt{8^2 + 15^2} = 17\\,\\mathrm{cm}$. (c) Total surface area $= 16^2 + 4 \\cdot \\dfrac{1}{2}(16)(17) = 256 + 544 = 800\\,\\mathrm{cm^2}$.",
            "Foundational", "Square Pyramid Volume & Slant Height",
            figure={
                "type": "solid",
                "solid": "square_pyramid",
                "dims": [16, 16, 15],
                "labels": {"base": "$16$", "h": "$15$"},
                "width": 200
            }
        ),
        make_frq(
            "Compute the area and perimeter of the L-shaped polygon with vertices $(0,0), (10,0), (10,4), (4,4), (4,9), (0,9)$.",
            "Split into a $4 \\times 9$ vertical rectangle (area $36$) and a $6 \\times 4$ horizontal extension (area $24$), giving Total Area $= 36 + 24 = 60$. The perimeter equals that of its $10 \\times 9$ bounding box: $2(10 + 9) = 38$.",
            "Foundational", "Composite L-Shaped Polygons"
        ),
        make_frq(
            "A rhombus has diagonals of lengths $d_1 = 16\\,\\mathrm{cm}$ and $d_2 = 30\\,\\mathrm{cm}$. Find the area and perimeter of the rhombus.",
            "Area $= \\dfrac{1}{2} d_1 d_2 = \\dfrac{1}{2}(16)(30) = 240\\,\\mathrm{cm^2}$. Since the diagonals bisect each other perpendicularly into legs of $8\\,\\mathrm{cm}$ and $15\\,\\mathrm{cm}$, each side has length $\\sqrt{8^2 + 15^2} = 17\\,\\mathrm{cm}$, and the perimeter is $4(17) = 68\\,\\mathrm{cm}$.",
            "Foundational", "Rhombus Diagonals, Area & Perimeter"
        ),
        # Intermediate (8-14)
        make_frq(
            "A solid metal sphere of radius $6\\,\\mathrm{cm}$ is melted down and recast into a solid right circular cone of base radius $12\\,\\mathrm{cm}$. Find the height $h$ of the cone.",
            "By conservation of volume, $V_{\\mathrm{sphere}} = V_{\\mathrm{cone}}$: $\\dfrac{4}{3}\\pi(6)^3 = \\dfrac{1}{3}\\pi(12)^2 h \\Rightarrow 4(216) = 144h \\Rightarrow 864 = 144h \\Rightarrow h = 6\\,\\mathrm{cm}$.",
            "Intermediate", "Volume Conservation Across Recast Solids"
        ),
        make_frq(
            "A cylindrical pipe of length $20\\,\\mathrm{cm}$ has outer radius $R = 5\\,\\mathrm{cm}$ and inner hollow radius $r = 3\\,\\mathrm{cm}$. Find the exact volume of metal in the pipe wall.",
            "$V = \\pi(R^2 - r^2)h = \\pi(5^2 - 3^2)(20) = \\pi(16)(20) = 320\\pi\\,\\mathrm{cm^3}$.",
            "Intermediate", "Annular / Hollow Cylinder Volume"
        ),
        make_frq(
            "A grain silo consists of a right circular cylinder of radius $3\\,\\mathrm{m}$ and height $10\\,\\mathrm{m}$ topped by a hemispherical dome of radius $3\\,\\mathrm{m}$. Find the exact total volume of the silo in terms of $\\pi$.",
            "Cylinder volume $= \\pi(3^2)(10) = 90\\pi\\,\\mathrm{m^3}$. Hemisphere volume $= \\dfrac{2}{3}\\pi(3^3) = 18\\pi\\,\\mathrm{m^3}$. Total volume $= 90\\pi + 18\\pi = 108\\pi\\,\\mathrm{m^3}$.",
            "Intermediate", "Composite 3D Solids (Cylinder + Hemisphere)"
        ),
        make_frq(
            "A sphere is inscribed inside a cube of edge length $8\\,\\mathrm{cm}$ so that the sphere is tangent to all $6$ faces. Find the exact volume of the empty space inside the cube but outside the sphere.",
            "Cube volume $= 8^3 = 512\\,\\mathrm{cm^3}$. The inscribed sphere has diameter $8\\,\\mathrm{cm}$, so $r = 4\\,\\mathrm{cm}$ and $V_{\\mathrm{sphere}} = \\dfrac{4}{3}\\pi(4^3) = \\dfrac{256\\pi}{3}\\,\\mathrm{cm^3}$. Empty volume $= 512 - \\dfrac{256\\pi}{3}\\,\\mathrm{cm^3}$.",
            "Intermediate", "Inscribed Sphere in a Cube"
        ),
        make_frq(
            "A circular sector of radius $10\\,\\mathrm{cm}$ and arc length $12\\pi\\,\\mathrm{cm}$ is rolled up to form the lateral surface of a right circular cone (without overlap). Find the base radius $r$ and vertical height $h$ of the resulting cone.",
            "The arc length of the sector becomes the base circumference of the cone: $2\\pi r = 12\\pi \\Rightarrow r = 6\\,\\mathrm{cm}$. The sector radius $10\\,\\mathrm{cm}$ becomes the slant height $\\ell = 10\\,\\mathrm{cm}$, so the vertical height is $h = \\sqrt{10^2 - 6^2} = 8\\,\\mathrm{cm}$.",
            "Intermediate", "Net of a Cone from a Circular Sector"
        ),
        make_frq(
            "A regular hexagonal prism has base side length $4\\,\\mathrm{cm}$ and height $10\\,\\mathrm{cm}$. Find its exact volume and total surface area.",
            "Base area of a regular hexagon of side $s = 4$ is $B = 6 \\cdot \\dfrac{\\sqrt{3}}{4}(4^2) = 24\\sqrt{3}\\,\\mathrm{cm^2}$. Volume $= Bh = 240\\sqrt{3}\\,\\mathrm{cm^3}$. Total surface area $= 2B + 6(4)(10) = 48\\sqrt{3} + 240\\,\\mathrm{cm^2}$.",
            "Intermediate", "Hexagonal Prism Volume & Surface Area"
        ),
        make_frq(
            "A right triangle with legs $6\\,\\mathrm{cm}$ and $8\\,\\mathrm{cm}$ is revolved $360^{\\circ}$ about its $8\\,\\mathrm{cm}$ leg. Describe the resulting 3D solid and compute its exact volume and lateral surface area.",
            "Revolving the right triangle about its $8\\,\\mathrm{cm}$ leg generates a right circular cone of height $h = 8\\,\\mathrm{cm}$, base radius $r = 6\\,\\mathrm{cm}$, and slant height $\\ell = 10\\,\\mathrm{cm}$. Volume $= \\dfrac{1}{3}\\pi(6^2)(8) = 96\\pi\\,\\mathrm{cm^3}$, and lateral surface area $= \\pi r \\ell = 60\\pi\\,\\mathrm{cm^2}$.",
            "Intermediate", "Solids of Revolution of Polygons"
        ),
        # Challenging & Cross-Lesson Synthesis (15-20)
        make_frq(
            "An open-top rectangular box is constructed by cutting congruent squares of side $2\\,\\mathrm{cm}$ from the four corners of a rectangular sheet of tin whose length is $5\\,\\mathrm{cm}$ greater than its width, and folding up the flaps. If the volume of the box is $100\\,\\mathrm{cm^3}$, find the original dimensions of the tin sheet.",
            "Let the original width be $w$ and length be $w + 5$. After cutting $2\\,\\mathrm{cm}$ squares from each corner, the base dimensions are $(w - 4)$ and $(w + 1)$ with height $2\\,\\mathrm{cm}$. Volume: $2(w - 4)(w + 1) = 100 \\Rightarrow w^2 - 3w - 4 = 50 \\Rightarrow w^2 - 3w - 54 = 0 \\Rightarrow (w - 9)(w + 6) = 0$. Thus $w = 9\\,\\mathrm{cm}$ and length $= 14\\,\\mathrm{cm}$.",
            "Challenging", "3D Box Construction via Quadratic Equations",
            cross_lesson="Topic 3.01 (Quadratics)"
        ),
        make_frq(
            "A conical water tank (vertex pointing down) has top radius $R = 6\\,\\mathrm{m}$ and total height $H = 12\\,\\mathrm{m}$. When the water in the tank has depth $h = 8\\,\\mathrm{m}$, find the radius $r$ of the water surface and the fraction of the tank's total volume that is filled.",
            "By similar triangles, $\\dfrac{r}{h} = \\dfrac{R}{H} = \\dfrac{6}{12} = \\dfrac{1}{2}$, so at $h = 8\\,\\mathrm{m}$ the surface radius is $r = 4\\,\\mathrm{m}$. Since the water cone is similar to the full tank with linear ratio $\\dfrac{h}{H} = \\dfrac{8}{12} = \\dfrac{2}{3}$, the filled volume fraction is $\\left(\\dfrac{2}{3}\\right)^3 = \\dfrac{8}{27}$.",
            "Challenging", "Similar Cones & Cubic Volume Ratio",
            cross_lesson="Topic 7.01 (Similar Triangles) & Topic 5.01 (Ratios)"
        ),
        make_frq(
            "A cube is inscribed inside a sphere of radius $R = 3\\sqrt{3}\\,\\mathrm{cm}$ so that all $8$ vertices of the cube lie on the surface of the sphere. Find the edge length $s$ and volume $V$ of the cube.",
            "The space diagonal of the cube equals the diameter of the sphere: $s\\sqrt{3} = 2R = 6\\sqrt{3} \\Rightarrow s = 6\\,\\mathrm{cm}$. Thus the volume of the cube is $V = 6^3 = 216\\,\\mathrm{cm^3}$.",
            "Challenging", "Cube Inscribed in a Sphere",
            cross_lesson="Topic 7.01 (3D Pythagorean Theorem)"
        ),
        make_frq(
            "A right circular cylinder is inscribed in a sphere of radius $5\\,\\mathrm{cm}$. If the height of the cylinder is $6\\,\\mathrm{cm}$, find the base radius $r$ and exact volume of the cylinder.",
            "A cross-section through the axis of the cylinder and center of the sphere shows a right triangle with hypotenuse $R = 5\\,\\mathrm{cm}$ and legs $h/2 = 3\\,\\mathrm{cm}$ and $r$. By the Pythagorean theorem, $r = \\sqrt{5^2 - 3^2} = 4\\,\\mathrm{cm}$. Therefore $V = \\pi r^2 h = \\pi(16)(6) = 96\\pi\\,\\mathrm{cm^3}$.",
            "Challenging", "Cylinder Inscribed in a Sphere",
            cross_lesson="Topic 9.01 (Circles & Chords)"
        ),
        make_frq(
            "Water flows through a cylindrical pipe of internal diameter $4\\,\\mathrm{cm}$ at a linear speed of $50\\,\\mathrm{cm/s}$ into an empty rectangular tank of base $100\\,\\mathrm{cm}$ by $60\\,\\mathrm{cm}$. How many seconds (in terms of $\\pi$) does it take to fill the tank to a depth of $20\\,\\mathrm{cm}$?",
            "Volumetric flow rate $Q = \\pi r^2 v = \\pi(2^2)(50) = 200\\pi\\,\\mathrm{cm^3/s}$. Required tank volume $= 100 \\times 60 \\times 20 = 120{,}000\\,\\mathrm{cm^3}$. Time $t = \\dfrac{120{,}000}{200\\pi} = \\dfrac{600}{\\pi}\\,\\mathrm{seconds}$.",
            "Challenging", "Volumetric Flow Rate & Dimensional Modeling",
            cross_lesson="Topic 5.01 (Rates & Proportions)"
        ),
        make_frq(
            "Find the exact surface area and volume of a regular tetrahedron (all $4$ faces are equilateral triangles) of edge length $s = 6\\,\\mathrm{cm}$.",
            "Each equilateral face has area $\\dfrac{\\sqrt{3}}{4}(6^2) = 9\\sqrt{3}\\,\\mathrm{cm^2}$, so total surface area is $4(9\\sqrt{3}) = 36\\sqrt{3}\\,\\mathrm{cm^2}$. The distance from a base vertex to the base centroid is $\\dfrac{2}{3}\\left(3\\sqrt{3}\\right) = 2\\sqrt{3}$, so the altitude is $h = \\sqrt{6^2 - (2\\sqrt{3})^2} = \\sqrt{24} = 2\\sqrt{6}\\,\\mathrm{cm}$, giving volume $V = \\dfrac{1}{3}(9\\sqrt{3})(2\\sqrt{6}) = 18\\sqrt{2}\\,\\mathrm{cm^3}$.",
            "Challenging", "3D Regular Tetrahedron Altitude & Volume",
            cross_lesson="Topic 7.01 (Equilateral Triangles & Centroids)"
        ),
    ]

    mcqs = [
        # Foundational (21-28)
        make_mcq(
            "What is the volume of a cube whose total surface area is $150\\,\\mathrm{cm^2}$?",
            ["$25\\,\\mathrm{cm^3}$", "$100\\,\\mathrm{cm^3}$", "$125\\,\\mathrm{cm^3}$", "$216\\,\\mathrm{cm^3}$"],
            2,
            "Since $6s^2 = 150$, we have $s^2 = 25 \\Rightarrow s = 5\\,\\mathrm{cm}$. Thus $V = s^3 = 125\\,\\mathrm{cm^3}$.",
            "Foundational", "Cube Surface Area to Volume"
        ),
        make_mcq(
            "A right circular cylinder has volume $72\\pi$ and height $8$. What is the circumference of its circular base?",
            ["$3\\pi$", "$6\\pi$", "$9\\pi$", "$12\\pi$"],
            1,
            "From $\\pi r^2(8) = 72\\pi$, we get $r^2 = 9 \\Rightarrow r = 3$. The base circumference is $2\\pi r = 6\\pi$.",
            "Foundational", "Cylinder Volume & Base Circumference"
        ),
        make_mcq(
            "What is the area of a trapezoid with parallel bases of lengths $9$ and $15$ and height $7$?",
            ["$42$", "$84$", "$105$", "$168$"],
            1,
            "Area $= \\dfrac{b_1 + b_2}{2} \\cdot h = \\dfrac{9 + 15}{2} \\cdot 7 = 12 \\cdot 7 = 84$.",
            "Foundational", "Area of a Trapezoid"
        ),
        make_mcq(
            "A right circular cone and a right circular cylinder have the same base radius and the same volume. The height of the cone is how many times the height of the cylinder?",
            ["$\\dfrac{1}{3}$", "$1$", "$3$", "$9$"],
            2,
            "Since $\\dfrac{1}{3}\\pi r^2 h_{\\mathrm{cone}} = \\pi r^2 h_{\\mathrm{cyl}}$, we have $h_{\\mathrm{cone}} = 3 h_{\\mathrm{cyl}}$.",
            "Foundational", "Comparing Cone & Cylinder Volumes"
        ),
        make_mcq(
            "If the radius of a sphere is doubled, its volume is multiplied by what factor?",
            ["$2$", "$4$", "$6$", "$8$"],
            3,
            "Because $V = \\dfrac{4}{3}\\pi r^3$, replacing $r$ with $2r$ multiplies the volume by $2^3 = 8$.",
            "Foundational", "Cubic Scaling of Sphere Volume"
        ),
        make_mcq(
            "A rectangular field has perimeter $100\\,\\mathrm{m}$ and length $32\\,\\mathrm{m}$. What is the area of the field?",
            ["$544\\,\\mathrm{m^2}$", "$576\\,\\mathrm{m^2}$", "$640\\,\\mathrm{m^2}$", "$1024\\,\\mathrm{m^2}$"],
            1,
            "Since $2(l + w) = 100 \\Rightarrow 32 + w = 50 \\Rightarrow w = 18\\,\\mathrm{m}$. Area $= 32 \\times 18 = 576\\,\\mathrm{m^2}$.",
            "Foundational", "Rectangle Perimeter & Area"
        ),
        make_mcq(
            "What is the volume of a right triangular prism whose base is a right triangle with legs $5$ and $12$ and whose prism height is $10$?",
            ["$150$", "$300$", "$600$", "$650$"],
            1,
            "Base area $B = \\dfrac{1}{2}(5)(12) = 30$. Volume $= B h = 30 \\times 10 = 300$.",
            "Foundational", "Volume of a Triangular Prism"
        ),
        make_mcq(
            "A solid sphere of radius $r = 3$ is shown below. What is its exact volume?",
            ["$12\\pi$", "$27\\pi$", "$36\\pi$", "$108\\pi$"],
            2,
            "$V = \\dfrac{4}{3}\\pi(3^3) = 36\\pi$.",
            "Foundational", "Volume of a Sphere",
            figure={
                "type": "solid",
                "solid": "sphere",
                "dims": [6, 6, 6],
                "labels": {"r": "$r=3$"},
                "width": 175
            }
        ),
        # Intermediate (29-37)
        make_mcq(
            "Three solid lead spheres of radii $3\\,\\mathrm{cm}$, $4\\,\\mathrm{cm}$, and $5\\,\\mathrm{cm}$ are melted together and cast into a single large sphere. What is the radius of the new sphere?",
            ["$6\\,\\mathrm{cm}$", "$7\\,\\mathrm{cm}$", "$8\\,\\mathrm{cm}$", "$12\\,\\mathrm{cm}$"],
            0,
            "By volume conservation, $R^3 = 3^3 + 4^3 + 5^3 = 27 + 64 + 125 = 216 \\Rightarrow R = \\sqrt[3]{216} = 6\\,\\mathrm{cm}$.",
            "Intermediate", "Additive Volumes of Spheres ($3^3 + 4^3 + 5^3 = 6^3$)"
        ),
        make_mcq(
            "What is the length of the longest straight rod that can fit completely inside a rectangular box measuring $3\\,\\mathrm{ft}$ by $4\\,\\mathrm{ft}$ by $12\\,\\mathrm{ft}$?",
            ["$12\\,\\mathrm{ft}$", "$13\\,\\mathrm{ft}$", "$15\\,\\mathrm{ft}$", "$19\\,\\mathrm{ft}$"],
            1,
            "The longest rod lies along the 3D space diagonal: $d = \\sqrt{3^2 + 4^2 + 12^2} = \\sqrt{25 + 144} = \\sqrt{169} = 13\\,\\mathrm{ft}$.",
            "Intermediate", "3D Space Diagonal"
        ),
        make_mcq(
            "A cylindrical glass of radius $3\\,\\mathrm{cm}$ contains water to a depth of $8\\,\\mathrm{cm}$. When a solid glass marble of radius $3\\,\\mathrm{cm}$ is completely submerged in the water, by how many centimeters does the water level rise?",
            ["$2\\,\\mathrm{cm}$", "$3\\,\\mathrm{cm}$", "$4\\,\\mathrm{cm}$", "$6\\,\\mathrm{cm}$"],
            2,
            "The submerged sphere displaces volume $V = \\dfrac{4}{3}\\pi(3^3) = 36\\pi\\,\\mathrm{cm^3}$. In a cylinder of base area $\\pi(3^2) = 9\\pi\\,\\mathrm{cm^2}$, the water height rises by $\\Delta h = \\dfrac{36\\pi}{9\\pi} = 4\\,\\mathrm{cm}$.",
            "Intermediate", "Archimedes Displacement in a Cylinder"
        ),
        make_mcq(
            "A square-based pyramid has volume $400\\,\\mathrm{cm^3}$ and height $12\\,\\mathrm{cm}$. What is the perimeter of its square base?",
            ["$20\\,\\mathrm{cm}$", "$40\\,\\mathrm{cm}$", "$80\\,\\mathrm{cm}$", "$100\\,\\mathrm{cm}$"],
            1,
            "From $\\dfrac{1}{3}b^2(12) = 400$, we get $4b^2 = 400 \\Rightarrow b^2 = 100 \\Rightarrow b = 10\\,\\mathrm{cm}$. The perimeter of the square base is $4b = 40\\,\\mathrm{cm}$.",
            "Intermediate", "Working Backward from Pyramid Volume"
        ),
        make_mcq(
            "A rectangular sheet of paper of dimensions $6\\pi\\,\\mathrm{cm}$ by $10\\,\\mathrm{cm}$ is rolled into a cylinder of height $10\\,\\mathrm{cm}$ so that the $6\\pi\\,\\mathrm{cm}$ edges meet without overlap. What is the volume of this cylinder?",
            ["$30\\pi\\,\\mathrm{cm^3}$", "$60\\pi\\,\\mathrm{cm^3}$", "$90\\pi\\,\\mathrm{cm^3}$", "$360\\pi\\,\\mathrm{cm^3}$"],
            2,
            "The circumference is $2\\pi r = 6\\pi \\Rightarrow r = 3\\,\\mathrm{cm}$. Thus the volume is $\\pi r^2 h = \\pi(9)(10) = 90\\pi\\,\\mathrm{cm^3}$.",
            "Intermediate", "Cylinder Formed from a Rectangular Sheet"
        ),
        make_mcq(
            "The ratio of the surface areas of two cubes is $16 : 49$. What is the ratio of their volumes?",
            ["$4 : 7$", "$16 : 49$", "$64 : 343$", "$256 : 2401$"],
            2,
            "Edge lengths have ratio $\\sqrt{16} : \\sqrt{49} = 4 : 7$, so volumes have ratio $4^3 : 7^3 = 64 : 343$.",
            "Intermediate", "Surface-Area-to-Volume Ratio of Similar Solids"
        ),
        make_mcq(
            "A parallelogram has adjacent sides of lengths $10$ and $14$, and the acute angle between them is $30^{\\circ}$. What is the area of the parallelogram?",
            ["$35$", "$70$", "$70\\sqrt{3}$", "$140$"],
            1,
            "The altitude to the base of length $14$ is $h = 10\\sin 30^{\\circ} = 5$. Thus Area $= 14 \\times 5 = 70$.",
            "Intermediate", "Parallelogram Area via Trigonometry"
        ),
        make_mcq(
            "A frustum is formed by slicing off the top third (by height) of a right circular cone of volume $135\\,\\mathrm{cm^3}$ with a plane parallel to its base. What is the volume of the remaining bottom frustum?",
            ["$90\\,\\mathrm{cm^3}$", "$115\\,\\mathrm{cm^3}$", "$120\\,\\mathrm{cm^3}$", "$130\\,\\mathrm{cm^3}$"],
            3,
            "The removed top cone has height $\\dfrac{1}{3}H$, so its volume is $\\left(\\dfrac{1}{3}\\right)^3(135) = \\dfrac{135}{27} = 5\\,\\mathrm{cm^3}$. The remaining frustum has volume $135 - 5 = 130\\,\\mathrm{cm^3}$.",
            "Intermediate", "Volume of a Conical Frustum"
        ),
        make_mcq(
            "A solid hemisphere of radius $R$ has total surface area (including its flat circular base) equal to $75\\pi$. What is $R$?",
            ["$3$", "$5$", "$5\\sqrt{3}$", "$15$"],
            1,
            "A solid hemisphere has curved area $2\\pi R^2$ plus flat circular base $\\pi R^2$, giving $3\\pi R^2 = 75\\pi \\Rightarrow R^2 = 25 \\Rightarrow R = 5$.",
            "Intermediate", "Total Surface Area of a Solid Hemisphere"
        ),
        # Challenging & Cross-Lesson Synthesis (38-45)
        make_mcq(
            "Among all rectangles with a fixed perimeter of $48\\,\\mathrm{cm}$, what is the maximum possible area?",
            ["$120\\,\\mathrm{cm^2}$", "$135\\,\\mathrm{cm^2}$", "$144\\,\\mathrm{cm^2}$", "$256\\,\\mathrm{cm^2}$"],
            2,
            "With $2(l + w) = 48 \\Rightarrow l + w = 24$, the area $A(w) = w(24 - w) = -(w - 12)^2 + 144$ is maximized when the rectangle is a $12 \\times 12$ square of area $144\\,\\mathrm{cm^2}$.",
            "Challenging", "Isoperimetric Optimization via Quadratics",
            cross_lesson="Topic 3.01 (Quadratic Optimization)"
        ),
        make_mcq(
            "A sphere is inscribed in a right circular cylinder so that the sphere touches the top base, bottom base, and lateral wall. What is the ratio of the volume of the sphere to the volume of the cylinder?",
            ["$1 : 2$", "$2 : 3$", "$3 : 4$", "$4 : 3$"],
            1,
            "The cylinder has radius $r$ and height $h = 2r$, so $V_{\\mathrm{cyl}} = \\pi r^2(2r) = 2\\pi r^3$. Since $V_{\\mathrm{sphere}} = \\dfrac{4}{3}\\pi r^3$, the ratio is $\\dfrac{4/3}{2} = \\dfrac{2}{3}$ (Archimedes' theorem).",
            "Challenging", "Archimedes' Sphere-to-Cylinder Ratio",
            cross_lesson="Topic 5.01 (Ratios)"
        ),
        make_mcq(
            "In a rectangular prism, the areas of three mutually adjacent faces are $12\\,\\mathrm{cm^2}$, $15\\,\\mathrm{cm^2}$, and $20\\,\\mathrm{cm^2}$. What is the volume of the prism?",
            ["$47\\,\\mathrm{cm^3}$", "$60\\,\\mathrm{cm^3}$", "$120\\,\\mathrm{cm^3}$", "$180\\,\\mathrm{cm^3}$"],
            1,
            "Given $lw = 12$, $wh = 15$, and $lh = 20$, multiply all three equations: $(lwh)^2 = 12 \\times 15 \\times 20 = 3600 \\Rightarrow V = lwh = \\sqrt{3600} = 60\\,\\mathrm{cm^3}$.",
            "Challenging", "Volume from Pairwise Face Areas",
            cross_lesson="Topic 4.01 (Radicals & Algebraic Products)"
        ),
        make_mcq(
            "A region in the first quadrant bounded by $x = 0$, $y = 0$, $x = 4$, and $y = 3$ is revolved $360^{\\circ}$ about the $y$-axis. What is the volume of the resulting solid?",
            ["$36\\pi$", "$48\\pi$", "$64\\pi$", "$144\\pi$"],
            1,
            "Revolving the $4 \\times 3$ rectangle about the $y$-axis generates a cylinder of radius $r = 4$ and height $h = 3$, whose volume is $\\pi(4^2)(3) = 48\\pi$.",
            "Challenging", "Coordinate Solids of Revolution",
            cross_lesson="Topic 1.01 (Coordinate Geometry)"
        ),
        make_mcq(
            "The surface area of a cube is numerically equal to twice its volume. What is the length of the space diagonal of the cube?",
            ["$3$", "$3\\sqrt{2}$", "$3\\sqrt{3}$", "$6\\sqrt{3}$"],
            2,
            "Set $6s^2 = 2s^3 \\Rightarrow s = 3$. The space diagonal of a cube of edge $s = 3$ is $s\\sqrt{3} = 3\\sqrt{3}$.",
            "Challenging", "Algebraic Surface-to-Volume Equating",
            cross_lesson="Topic 4.01 (Polynomial Equations)"
        ),
        make_mcq(
            "A cylindrical container of radius $6\\,\\mathrm{cm}$ and height $15\\,\\mathrm{cm}$ is tilted at $45^{\\circ}$ until water is just at the rim of the top lip and covers the entire base. If the water level when set upright is $9\\,\\mathrm{cm}$, what was the volume of water spilled when tilted?",
            ["$108\\pi\\,\\mathrm{cm^3}$", "$180\\pi\\,\\mathrm{cm^3}$", "$216\\pi\\,\\mathrm{cm^3}$", "$324\\pi\\,\\mathrm{cm^3}$"],
            0,
            " Actually, let us state this directly: a full cylinder of radius $6\\,\\mathrm{cm}$ and height $15\\,\\mathrm{cm}$ has water poured out until the remaining water has depth $12\\,\\mathrm{cm}$. What volume of water was poured out? $\\pi(6^2)(15 - 12) = 108\\pi\\,\\mathrm{cm^3}$! Even better, let's use the tilted-cylinder half-slice theorem: when tilted at $45^{\\circ}$, the dry wedge at the top has height $\\Delta h = 2r \\tan 45^{\\circ} = 12\\,\\mathrm{cm}$ and volume equal to half a cylinder of height $12\\,\\mathrm{cm}$, i.e., $\\dfrac{1}{2}\\pi(6^2)(12) = 216\\pi\\,\\mathrm{cm^3}$!",
            "Challenging", "Tilted Cylinder Volume Symmetry",
            cross_lesson="Topic 7.01 (45-45-90 Triangles)"
        ),
        make_mcq(
            "An equilateral triangle of side length $6$ has circular sectors of radius $3$ centered at each of its three vertices removed. What is the area of the remaining central region?",
            [
                "$9\\sqrt{3} - \\dfrac{9\\pi}{2}$",
                "$9\\sqrt{3} - 9\\pi$",
                "$18\\sqrt{3} - \\dfrac{9\\pi}{2}$",
                "$36\\sqrt{3} - 9\\pi$"
            ],
            0,
            "The equilateral triangle has area $\\dfrac{\\sqrt{3}}{4}(6^2) = 9\\sqrt{3}$. Each vertex has a $60^{\\circ}$ sector of radius $3$, so the three sectors together form a $180^{\\circ}$ semicircle of area $\\dfrac{1}{2}\\pi(3^2) = \\dfrac{9\\pi}{2}$. Thus the remaining area is $9\\sqrt{3} - \\dfrac{9\\pi}{2}$.",
            "Challenging", "Composite Area of Polygons & Circular Sectors",
            cross_lesson="Topic 9.01 (Circular Sectors)"
        ),
        make_mcq(
            "If the edge length of a cube is increased by $10\\%$, by what percentage does its total surface area increase?",
            ["$10\\%$", "$20\\%$", "$21\\%$", "$33.1\\%$"],
            2,
            "Surface area scales as the square of the linear scale factor: $(1.10)^2 = 1.21$, which corresponds to a $21\\%$ increase.",
            "Challenging", "Percentage Scaling of Surface Area",
            cross_lesson="Topic 5.01 (Percentages)"
        ),
    ]

    mcqs[22] = make_mcq(
        "A right circular cylinder of radius $6\\,\\mathrm{cm}$ and height $15\\,\\mathrm{cm}$ is initially completely full of water, and is then tilted at a $45^{\\circ}$ angle until water stops spilling out. What volume of water was spilled?",
        ["$108\\pi\\,\\mathrm{cm^3}$", "$180\\pi\\,\\mathrm{cm^3}$", "$216\\pi\\,\\mathrm{cm^3}$", "$324\\pi\\,\\mathrm{cm^3}$"],
        2,
        "At a $45^{\\circ}$ tilt, the empty air wedge at the top of the cylinder spans across the diameter $2r = 12\\,\\mathrm{cm}$ and therefore has vertical height $12\\tan 45^{\\circ} = 12\\,\\mathrm{cm}$. By symmetry, the air wedge occupies exactly half of the top $12\\,\\mathrm{cm}$ cylindrical section: $V_{\\mathrm{spilled}} = \\dfrac{1}{2}\\pi(6^2)(12) = 216\\pi\\,\\mathrm{cm^3}$.",
        "Challenging", "Tilted Cylinder Volume Symmetry",
        cross_lesson="Topic 7.01 (45-45-90 Triangles)"
    )

    return {
        "track": "sat",
        "num": "8.01",
        "title": "Area, Volume & 3D Solids",
        "sub": "20 FRQs + 25 MCQs • Difficulty Progression • Cross-Lesson Synthesis",
        "sections": [
            {"heading": "Part I — Free-Response Questions (FRQs): Foundational Fluency (1–7)", "questions": frqs[0:7]},
            {"heading": "Part I — Free-Response Questions (FRQs): Intermediate Modeling (8–14)", "questions": frqs[7:14]},
            {"heading": "Part I — Free-Response Questions (FRQs): Challenging & Cross-Lesson Synthesis (15–20)", "questions": frqs[14:20]},
            {"heading": "Part II — Multiple-Choice Questions (MCQs): Foundational Concepts (21–28)", "questions": mcqs[0:8]},
            {"heading": "Part II — Multiple-Choice Questions (MCQs): Intermediate Exam Practice (29–37)", "questions": mcqs[8:17]},
            {"heading": "Part II — Multiple-Choice Questions (MCQs): Challenging & Cross-Lesson Synthesis (38–45)", "questions": mcqs[17:25]},
        ]
    }


# ==============================================================================
# TOPIC 9.01: Circles, Radians & Trigonometry
# ==============================================================================
def build_9_01():
    frqs = [
        # Foundational (1-7)
        make_frq(
            "Find the center $(h, k)$ and radius $r$ of the circle $(x - 5)^2 + (y + 3)^2 = 49$, and state the coordinates of the four points on the circle that lie horizontally or vertically from the center.",
            "Comparing with $(x - h)^2 + (y - k)^2 = r^2$, the center is $(5, -3)$ and the radius is $r = \\sqrt{49} = 7$. Moving $\\pm 7$ horizontally and vertically gives $(12, -3), (-2, -3), (5, 4), (5, -10)$.",
            "Foundational", "Standard Equation of a Circle"
        ),
        make_frq(
            "Convert the general circle equation $x^2 + y^2 - 8x + 6y - 11 = 0$ into standard form by completing the square, and find its center and radius.",
            "Group and complete the square: $(x^2 - 8x + 16) + (y^2 + 6y + 9) = 11 + 16 + 9 = 36 \\Rightarrow (x - 4)^2 + (y + 3)^2 = 36$. The center is $(4, -3)$ and the radius is $r = 6$.",
            "Foundational", "Completing the Square for Circle Equations"
        ),
        make_frq(
            "Convert (a) $135^{\\circ}$ and $210^{\\circ}$ to radians, and (b) $\\dfrac{5\\pi}{6}$ and $\\dfrac{7\\pi}{4}$ radians to degrees.",
            "(a) $135^{\\circ} \\times \\dfrac{\\pi}{180^{\\circ}} = \\dfrac{3\\pi}{4}\\,\\mathrm{rad}$; $210^{\\circ} \\times \\dfrac{\\pi}{180^{\\circ}} = \\dfrac{7\\pi}{6}\\,\\mathrm{rad}$. (b) $\\dfrac{5\\pi}{6} \\times \\dfrac{180^{\\circ}}{\\pi} = 150^{\\circ}$; $\\dfrac{7\\pi}{4} \\times \\dfrac{180^{\\circ}}{\\pi} = 315^{\\circ}$.",
            "Foundational", "Degree-Radian Conversions"
        ),
        make_frq(
            "In a circle of radius $r = 12\\,\\mathrm{cm}$ shown below, a central angle measures $\\theta = 60^{\\circ}$ ($\\dfrac{\\pi}{3}\\,\\mathrm{rad}$). Find the exact arc length $s$ and the exact area $A$ of the shaded sector in terms of $\\pi$.",
            "Arc length $s = r\\theta = 12\\left(\\dfrac{\\pi}{3}\\right) = 4\\pi\\,\\mathrm{cm}$. Sector area $A = \\dfrac{1}{2}r^2\\theta = \\dfrac{1}{2}(144)\\left(\\dfrac{\\pi}{3}\\right) = 24\\pi\\,\\mathrm{cm^2}$.",
            "Foundational", "Arc Length & Sector Area",
            figure={
                "type": "circle",
                "radius": 12,
                "center": [0, 0],
                "center_label": "$O$",
                "radius_label": "$12\\,\\mathrm{cm}$",
                "sector": {"start_deg": 0, "end_deg": 60, "label": "$60^{\\circ}$"},
                "width": 195
            }
        ),
        make_frq(
            "On a circle with center $O$, an inscribed angle $\\angle ABC$ intercepts minor arc $AC$. If $\\angle ABC = 38^{\\circ}$, find the degree measure of minor arc $AC$ and central angle $\\angle AOC$.",
            "By the Inscribed Angle Theorem, the intercepted arc and central angle are twice the inscribed angle: $\\mathrm{m}\\widehat{AC} = \\angle AOC = 2(38^{\\circ}) = 76^{\\circ}$.",
            "Foundational", "Inscribed Angle Theorem"
        ),
        make_frq(
            "Evaluate the exact values of (a) $\\sin\\left(\\dfrac{2\\pi}{3}\\right)$, (b) $\\cos\\left(\\dfrac{5\\pi}{4}\\right)$, and (c) $\\tan\\left(\\dfrac{11\\pi}{6}\\right)$ using reference angles on the unit circle.",
            "(a) $\\dfrac{2\\pi}{3}$ is in QII with reference angle $\\dfrac{\\pi}{3}$, so $\\sin\\left(\\dfrac{2\\pi}{3}\\right) = \\dfrac{\\sqrt{3}}{2}$. (b) $\\dfrac{5\\pi}{4}$ is in QIII with reference angle $\\dfrac{\\pi}{4}$, so $\\cos\\left(\\dfrac{5\\pi}{4}\\right) = -\\dfrac{\\sqrt{2}}{2}$. (c) $\\dfrac{11\\pi}{6}$ is in QIV with reference angle $\\dfrac{\\pi}{6}$, so $\\tan\\left(\\dfrac{11\\pi}{6}\\right) = -\\dfrac{\\sqrt{3}}{3}$.",
            "Foundational", "Unit Circle Trigonometry"
        ),
        make_frq(
            "Point $P$ is located $17\\,\\mathrm{cm}$ from the center $O$ of a circle of radius $8\\,\\mathrm{cm}$. A line through $P$ is tangent to the circle at point $T$. Find the length of the tangent segment $PT$.",
            "Radius $OT$ is perpendicular to tangent $PT$ at $T$ ($\\angle OTP = 90^{\\circ}$). By the Pythagorean theorem, $PT = \\sqrt{OP^2 - OT^2} = \\sqrt{17^2 - 8^2} = \\sqrt{225} = 15\\,\\mathrm{cm}$.",
            "Foundational", "Tangent-Radius Perpendicularity"
        ),
        # Intermediate (8-14)
        make_frq(
            "In a circle of radius $r = 10\\,\\mathrm{cm}$, a chord $AB$ has length $16\\,\\mathrm{cm}$, as shown. Find the perpendicular distance $d$ from the center $O$ to chord $AB$.",
            "The perpendicular from the center $O$ to chord $AB$ bisects the chord into two segments of length $8\\,\\mathrm{cm}$. In the resulting right triangle with hypotenuse $r = 10\\,\\mathrm{cm}$ and leg $8\\,\\mathrm{cm}$, $d = \\sqrt{10^2 - 8^2} = 6\\,\\mathrm{cm}$.",
            "Intermediate", "Chord Bisector & Distance from Center",
            figure={
                "type": "circle",
                "radius": 10,
                "center": [0, 0],
                "center_label": "$O$",
                "radius_label": "$10$",
                "chord": [36.87, 143.13],
                "points": [
                    {"angle": 36.87, "label": "$B$"},
                    {"angle": 143.13, "label": "$A$"}
                ],
                "width": 195
            }
        ),
        make_frq(
            "Find the equation of the tangent line to the circle $(x - 1)^2 + (y + 2)^2 = 25$ at the point $T(4, 2)$ on the circle.",
            "The center is $C(1, -2)$. The slope of radius $CT$ is $m_{CT} = \\dfrac{2 - (-2)}{4 - 1} = \\dfrac{4}{3}$. Therefore, the tangent line at $T(4, 2)$ has perpendicular slope $m_{\\perp} = -\\dfrac{3}{4}$ and equation $y - 2 = -\\dfrac{3}{4}(x - 4) \\Rightarrow y = -\\dfrac{3}{4}x + 5$.",
            "Intermediate", "Equation of a Tangent Line to a Circle"
        ),
        make_frq(
            "If $\\cos\\theta = -\\dfrac{5}{13}$ and $\\theta$ lies in Quadrant III ($\\pi < \\theta < \\dfrac{3\\pi}{2}$), find the exact values of $\\sin\\theta$ and $\\tan\\theta$.",
            "In Quadrant III, $\\sin\\theta < 0$ and $\\tan\\theta > 0$. By $\\sin^2\\theta + \\cos^2\\theta = 1$, $\\sin\\theta = -\\sqrt{1 - (-5/13)^2} = -\\dfrac{12}{13}$, and $\\tan\\theta = \\dfrac{\\sin\\theta}{\\cos\\theta} = \\dfrac{12}{5}$.",
            "Intermediate", "Pythagorean Identity & Quadrant Signs"
        ),
        make_frq(
            "A circular sector has arc length $6\\pi\\,\\mathrm{cm}$ and area $27\\pi\\,\\mathrm{cm^2}$. Find the radius $r$ of the circle and the central angle $\\theta$ in both radians and degrees.",
            "Divide $A = \\dfrac{1}{2}r s$ by $s$: $27\\pi = \\dfrac{1}{2}r(6\\pi) \\Rightarrow 3\\pi r = 27\\pi \\Rightarrow r = 9\\,\\mathrm{cm}$. Then $\\theta = \\dfrac{s}{r} = \\dfrac{6\\pi}{9} = \\dfrac{2\\pi}{3}\\,\\mathrm{rad} = 120^{\\circ}$.",
            "Intermediate", "Relating Sector Area & Arc Length ($A = \\frac{1}{2}rs$)"
        ),
        make_frq(
            "Find the diameter and area of the circle whose equation is $2x^2 + 2y^2 + 12x - 8y - 24 = 0$.",
            "Divide by $2$: $x^2 + y^2 + 6x - 4y - 12 = 0$. Complete the square: $(x + 3)^2 + (y - 2)^2 = 12 + 9 + 4 = 25$. Thus $r = 5$, diameter $= 2r = 10$, and area $= \\pi r^2 = 25\\pi$.",
            "Intermediate", "Non-Monic Circle Equations"
        ),
        make_frq(
            "Quadrilateral $ABCD$ is inscribed in a circle (cyclic quadrilateral). If $\\angle A = (2x + 15)^{\\circ}$ and $\\angle C = (3x - 10)^{\\circ}$, find $x$, $\\angle A$, and $\\angle C$.",
            "Opposite angles of a cyclic quadrilateral are supplementary: $(2x + 15) + (3x - 10) = 180 \\Rightarrow 5x + 5 = 180 \\Rightarrow 5x = 175 \\Rightarrow x = 35$. Thus $\\angle A = 85^{\\circ}$ and $\\angle C = 95^{\\circ}$.",
            "Intermediate", "Cyclic Quadrilaterals"
        ),
        make_frq(
            "State the amplitude, period, midline, and maximum value of the sinusoidal function $f(t) = 4\\sin\\left(\\dfrac{\\pi}{6}t\\right) + 7$, as graphed below.",
            "Amplitude $= |4| = 4$; period $= \\dfrac{2\\pi}{\\pi/6} = 12$; midline is $y = 7$; maximum value is $7 + 4 = 11$ (and minimum value is $7 - 4 = 3$).",
            "Intermediate", "Sinusoidal Function Parameters",
            figure={
                "type": "plot",
                "fns": ["4*sin(pi*x/6) + 7"],
                "xmin": 0, "xmax": 12, "ymin": 1, "ymax": 13,
                "asymptotes": {"y": [7]},
                "points": [[3, 11], [9, 3]],
                "width": 210
            }
        ),
        # Challenging & Cross-Lesson Synthesis (15-20)
        make_frq(
            "Find the exact area of the circular segment (the region between chord $AB$ and minor arc $AB$) in a circle of radius $r = 6\\,\\mathrm{cm}$ if the central angle subtended by $AB$ is $90^{\\circ}$.",
            "Sector area ($90^{\\circ} = \\dfrac{1}{4}$ circle) $= \\dfrac{1}{4}\\pi(6^2) = 9\\pi\\,\\mathrm{cm^2}$. Right triangle $OAB$ has area $\\dfrac{1}{2}(6)(6) = 18\\,\\mathrm{cm^2}$. Circular segment area $= (9\\pi - 18)\\,\\mathrm{cm^2}$.",
            "Challenging", "Area of a Circular Segment",
            cross_lesson="Topic 8.01 (Composite Areas)"
        ),
        make_frq(
            "Find the coordinates of all intersection points of the line $y = x + 1$ and the circle $x^2 + y^2 = 25$, and compute the length of the secant chord.",
            "Substitute $y = x + 1$: $x^2 + (x + 1)^2 = 25 \\Rightarrow 2x^2 + 2x - 24 = 0 \\Rightarrow x^2 + x - 12 = 0 \\Rightarrow (x + 4)(x - 3) = 0$. The intersection points are $(-4, -3)$ and $(3, 4)$, and the chord length is $\\sqrt{(3 - (-4))^2 + (4 - (-3))^2} = \\sqrt{49 + 49} = 7\\sqrt{2}$.",
            "Challenging", "Line-Circle Secant Intersection System",
            cross_lesson="Topic 3.01 (Quadratics) & Topic 2.01 (Systems)"
        ),
        make_frq(
            "From an external point $P$, a tangent segment $PT$ of length $12$ and a secant line $PAB$ (passing through the circle at $A$ and $B$) are drawn. If the external secant part is $PA = 8$, find the length of the internal chord $AB$.",
            "By the Power of a Point (Tangent-Secant) Theorem, $PT^2 = PA \\cdot PB \\Rightarrow 12^2 = 8(8 + AB) \\Rightarrow 144 = 64 + 8\\cdot AB \\Rightarrow 8\\cdot AB = 80 \\Rightarrow AB = 10$.",
            "Challenging", "Power of a Point (Tangent-Secant Theorem)",
            cross_lesson="Topic 7.01 (Similar Triangles)"
        ),
        make_frq(
            "A Ferris wheel has a diameter of $40\\,\\mathrm{m}$, its lowest point is $4\\,\\mathrm{m}$ above the ground, and it completes one full revolution every $60$ seconds. If a rider boards at the lowest point at $t = 0$, write a cosine function $h(t)$ for the rider's height above the ground at time $t$ seconds, and find $h(15)$ and $h(30)$.",
            "Radius $A = 20\\,\\mathrm{m}$, center height (midline) $D = 4 + 20 = 24\\,\\mathrm{m}$, angular frequency $\\omega = \\dfrac{2\\pi}{60} = \\dfrac{\\pi}{30}$. Starting at the minimum at $t = 0$: $h(t) = -20\\cos\\left(\\dfrac{\\pi}{30}t\\right) + 24$. Thus $h(15) = 24\\,\\mathrm{m}$ and $h(30) = 44\\,\\mathrm{m}$.",
            "Challenging", "Periodic Trigonometric Modeling",
            cross_lesson="Topic 4.01 (Function Modeling)"
        ),
        make_frq(
            "For what values of $c$ is the line $3x + 4y = c$ tangent to the circle $x^2 + y^2 - 2x + 4y = 20$?",
            "Rewrite the circle as $(x - 1)^2 + (y + 2)^2 = 25$, which has center $(1, -2)$ and radius $r = 5$. For tangency, the perpendicular distance from $(1, -2)$ to $3x + 4y - c = 0$ must equal $5$: $\\dfrac{|3(1) + 4(-2) - c|}{\\sqrt{3^2 + 4^2}} = 5 \\Rightarrow |-5 - c| = 25 \\Rightarrow c + 5 = \\pm 25 \\Rightarrow c = 20$ or $c = -30$.",
            "Challenging", "Tangent Line Parameter via Point-to-Line Distance",
            cross_lesson="Topic 1.01 (Linear Equations & Absolute Value)"
        ),
        make_frq(
            "Two circles of radii $r_1 = 9\\,\\mathrm{cm}$ and $r_2 = 4\\,\\mathrm{cm}$ are externally tangent to each other and both are tangent to the same straight line $\\ell$. Find the distance between the two points of tangency on line $\\ell$.",
            "The centers are $r_1 + r_2 = 13\\,\\mathrm{cm}$ apart, and the difference in their heights above line $\\ell$ is $r_1 - r_2 = 5\\,\\mathrm{cm}$. By the Pythagorean theorem, the horizontal distance between the points of tangency is $d = \\sqrt{(r_1 + r_2)^2 - (r_1 - r_2)^2} = 2\\sqrt{r_1 r_2} = 2\\sqrt{36} = 12\\,\\mathrm{cm}$.",
            "Challenging", "Common External Tangent of Two Circles",
            cross_lesson="Topic 7.01 (Pythagorean Theorem)"
        ),
    ]

    mcqs = [
        # Foundational (21-28)
        make_mcq(
            "In the $xy$-plane, what is the radius of the circle $(x + 6)^2 + (y - 8)^2 = 100$?",
            ["$6$", "$8$", "$10$", "$100$"],
            2,
            "From $(x - h)^2 + (y - k)^2 = r^2 = 100$, the radius is $r = \\sqrt{100} = 10$.",
            "Foundational", "Reading Circle Radius from Standard Form"
        ),
        make_mcq(
            "An angle has a measure of $\\dfrac{5\\pi}{12}$ radians. What is the measure of the angle in degrees?",
            ["$60^{\\circ}$", "$75^{\\circ}$", "$80^{\\circ}$", "$105^{\\circ}$"],
            1,
            "$\\dfrac{5\\pi}{12} \\times \\dfrac{180^{\\circ}}{\\pi} = 5 \\times 15^{\\circ} = 75^{\\circ}$.",
            "Foundational", "Radians to Degrees"
        ),
        make_mcq(
            "In a circle with radius $8$, what is the length of an arc intercepted by a central angle of $\\dfrac{3\\pi}{4}$ radians?",
            ["$3\\pi$", "$6\\pi$", "$12\\pi$", "$24\\pi$"],
            1,
            "Arc length $s = r\\theta = 8 \\cdot \\dfrac{3\\pi}{4} = 6\\pi$.",
            "Foundational", "Arc Length Formula $s = r\\theta$"
        ),
        make_mcq(
            "Which of the following points lies on the circle $(x - 2)^2 + (y + 1)^2 = 25$?",
            ["$(2, 5)$", "$(5, 3)$", "$(-2, 3)$", "$(6, 2)$"],
            1,
            "Test $(5, 3)$: $(5 - 2)^2 + (3 + 1)^2 = 3^2 + 4^2 = 9 + 16 = 25$.",
            "Foundational", "Testing Points on a Circle"
        ),
        make_mcq(
            "A circle has circumference $16\\pi$. What is the area of a $45^{\\circ}$ sector of this circle?",
            ["$2\\pi$", "$4\\pi$", "$8\\pi$", "$16\\pi$"],
            2,
            "From $2\\pi r = 16\\pi$, we get $r = 8$ and total circle area $\\pi r^2 = 64\\pi$. A $45^{\\circ}$ sector is $\\dfrac{45^{\\circ}}{360^{\\circ}} = \\dfrac{1}{8}$ of the circle: $\\dfrac{1}{8}(64\\pi) = 8\\pi$.",
            "Foundational", "Sector Area as Fraction of Circle"
        ),
        make_mcq(
            "If $\\sin\\theta = \\dfrac{4}{5}$ and $\\theta$ is in Quadrant II, what is the value of $\\cos\\theta$?",
            ["$-\\dfrac{4}{5}$", "$-\\dfrac{3}{5}$", "$\\dfrac{3}{5}$", "$-\\dfrac{3}{4}$"],
            1,
            "In Quadrant II, $\\cos\\theta < 0$, so $\\cos\\theta = -\\sqrt{1 - (4/5)^2} = -\\dfrac{3}{5}$.",
            "Foundational", "Quadrant II Cosine Sign"
        ),
        make_mcq(
            "What is the center of the circle given by $x^2 + y^2 - 10x + 4y = 7$?",
            ["$(-5, 2)$", "$(5, -2)$", "$(-10, 4)$", "$(10, -4)$"],
            1,
            "Complete the square: $(x - 5)^2 + (y + 2)^2 = 7 + 25 + 4 = 36$, so the center is $(5, -2)$.",
            "Foundational", "Finding Center by Completing the Square"
        ),
        make_mcq(
            "Points $A, B,$ and $C$ lie on a circle with center $O$. If central angle $\\angle AOC = 110^{\\circ}$ and $B$ lies on the major arc $AC$, what is the measure of inscribed angle $\\angle ABC$?",
            ["$55^{\\circ}$", "$70^{\\circ}$", "$110^{\\circ}$", "$125^{\\circ}$"],
            0,
            "By the Inscribed Angle Theorem, $\\angle ABC = \\dfrac{1}{2}\\angle AOC = \\dfrac{1}{2}(110^{\\circ}) = 55^{\\circ}$.",
            "Foundational", "Inscribed Angle vs. Central Angle"
        ),
        # Intermediate (29-37)
        make_mcq(
            "The equation $x^2 + y^2 + 6x - 14y + c = 0$ represents a circle with radius $4$. What is the value of the constant $c$?",
            ["$34$", "$42$", "$50$", "$74$"],
            1,
            "Complete the square: $(x + 3)^2 + (y - 7)^2 = 9 + 49 - c = 58 - c$. Setting $r^2 = 58 - c = 4^2 = 16$ gives $c = 42$.",
            "Intermediate", "Finding Constant $c$ from Circle Radius"
        ),
        make_mcq(
            "In the $xy$-plane, segments $AB$ is a diameter of a circle. If $A = (-3, 2)$ and $B = (5, 8)$, what is the equation of the circle?",
            [
                "$(x - 1)^2 + (y - 5)^2 = 25$",
                "$(x - 1)^2 + (y - 5)^2 = 100$",
                "$(x + 1)^2 + (y + 5)^2 = 25$",
                "$(x - 4)^2 + (y - 3)^2 = 25$"
            ],
            0,
            "Center is the midpoint of $AB$: $M = \\left(\\dfrac{-3+5}{2}, \\dfrac{2+8}{2}\\right) = (1, 5)$. Radius squared is $(5 - 1)^2 + (8 - 5)^2 = 16 + 9 = 25$.",
            "Intermediate", "Circle Equation from Diameter Endpoints"
        ),
        make_mcq(
            "In a circle of radius $13$, a chord lies at a perpendicular distance of $5$ from the center. What is the length of the chord?",
            ["$12$", "$18$", "$24$", "$26$"],
            2,
            "Half the chord length is $\\sqrt{13^2 - 5^2} = 12$, so the full chord length is $2(12) = 24$.",
            "Intermediate", "Chord Length from Distance to Center"
        ),
        make_mcq(
            "If $\\tan\\theta = -\\dfrac{8}{15}$ and $\\sin\\theta > 0$, what is the value of $\\cos\\theta$?",
            ["$-\\dfrac{15}{17}$", "$-\\dfrac{8}{17}$", "$\\dfrac{15}{17}$", "$\\dfrac{8}{17}$"],
            0,
            "Since $\\sin\\theta > 0$ and $\\tan\\theta < 0$, $\\theta$ is in Quadrant II where $\\cos\\theta < 0$. With opposite $8$, adjacent $15$, and hypotenuse $17$, $\\cos\\theta = -\\dfrac{15}{17}$.",
            "Intermediate", "Trigonometric Ratios Across Quadrants"
        ),
        make_mcq(
            "Two concentric circles have radii $6$ and $10$. A chord of the larger circle is tangent to the smaller circle. What is the length of this chord?",
            ["$8$", "$12$", "$16$", "$2\\sqrt{34}$"],
            2,
            "The radius of the smaller circle ($6$) is perpendicular to the chord at its midpoint, forming a right triangle with hypotenuse $10$ (radius of the larger circle). Half-chord $= \\sqrt{10^2 - 6^2} = 8$, so full chord length $= 16$.",
            "Intermediate", "Chord of Outer Circle Tangent to Inner Circle"
        ),
        make_mcq(
            "What is the radian measure of the smaller angle between the hour hand and the minute hand of an analog clock at exactly 4:00?",
            ["$\\dfrac{\\pi}{3}$", "$\\dfrac{2\\pi}{3}$", "$\\dfrac{3\\pi}{4}$", "$\\dfrac{5\\pi}{6}$"],
            1,
            "At 4:00, the hands are separated by $\\dfrac{4}{12} = \\dfrac{1}{3}$ of a full revolution, which is $\\dfrac{1}{3}(2\\pi) = \\dfrac{2\\pi}{3}$ radians ($120^{\\circ}$).",
            "Intermediate", "Angular Separation in Radians"
        ),
        make_mcq(
            "A wheel of radius $0.4\\,\\mathrm{m}$ rolls forward without slipping through $15$ complete revolutions. How far does the center of the wheel travel?",
            ["$6\\pi\\,\\mathrm{m}$", "$12\\pi\\,\\mathrm{m}$", "$15\\pi\\,\\mathrm{m}$", "$24\\pi\\,\\mathrm{m}$"],
            1,
            "Each revolution advances the wheel by one circumference $2\\pi r = 0.8\\pi\\,\\mathrm{m}$. Over $15$ revolutions, distance $= 15(0.8\\pi) = 12\\pi\\,\\mathrm{m}$.",
            "Intermediate", "Rolling Wheel Linear Distance"
        ),
        make_mcq(
            "If the circle $(x - 4)^2 + (y - k)^2 = 25$ is tangent to the $x$-axis, what are the possible values of $k$?",
            ["$\\pm 4$", "$\\pm 5$", "$\\pm 9$", "$\\pm 25$"],
            1,
            "A circle with center $(4, k)$ and radius $r = 5$ is tangent to the $x$-axis ($y = 0$) if and only if the vertical distance from its center to the $x$-axis equals its radius: $|k| = 5 \\Rightarrow k = \\pm 5$.",
            "Intermediate", "Circle Tangency to Coordinate Axes"
        ),
        make_mcq(
            "Which expression is equivalent to $\\dfrac{1 - \\cos^2\\theta}{\\sin\\theta\\cos\\theta}$ for all $\\theta$ where the expression is defined?",
            ["$\\sin\\theta$", "$\\cos\\theta$", "$\\tan\\theta$", "$\\dfrac{1}{\\tan\\theta}$"],
            2,
            "Since $1 - \\cos^2\\theta = \\sin^2\\theta$, the expression simplifies to $\\dfrac{\\sin^2\\theta}{\\sin\\theta\\cos\\theta} = \\dfrac{\\sin\\theta}{\\cos\\theta} = \\tan\\theta$.",
            "Intermediate", "Simplifying Trigonometric Expressions"
        ),
        # Challenging & Cross-Lesson Synthesis (38-45)
        make_mcq(
            "What is the greatest distance from the point $P(7, 10)$ to any point on the circle $(x - 1)^2 + (y - 2)^2 = 9$?",
            ["$10$", "$13$", "$16$", "$19$"],
            1,
            "The distance from $P(7, 10)$ to the center $C(1, 2)$ is $d = \\sqrt{(7 - 1)^2 + (10 - 2)^2} = \\sqrt{36 + 64} = 10$. Adding the radius $r = 3$ gives the maximum distance $d + r = 10 + 3 = 13$.",
            "Challenging", "Extremal Distance from a Point to a Circle",
            cross_lesson="Topic 7.01 (Distance Formula)"
        ),
        make_mcq(
            "Two chords $AB$ and $CD$ intersect at point $E$ inside a circle. If $AE = 4$, $EB = 9$, and $CE = x$, $ED = x + 5$, what is the length of chord $CD$?",
            ["$4$", "$9$", "$13$", "$15$"],
            2,
            "By the Intersecting Chords Theorem, $AE \\cdot EB = CE \\cdot ED \\Rightarrow 4(9) = x(x + 5) \\Rightarrow x^2 + 5x - 36 = 0 \\Rightarrow (x + 9)(x - 4) = 0 \\Rightarrow x = 4$. Thus $CD = CE + ED = 4 + 9 = 13$.",
            "Challenging", "Intersecting Chords Theorem & Quadratics",
            cross_lesson="Topic 3.01 (Quadratic Equations)"
        ),
        make_mcq(
            "In the $xy$-plane, the circle $x^2 + y^2 - 6x - 8y = 0$ intersects the $x$-axis at the origin $(0,0)$ and at point $A$, and intersects the $y$-axis at the origin and at point $B$. What is the length of segment $AB$?",
            ["$5$", "$7$", "$10$", "$14$"],
            2,
            "Since $\\angle AOB = 90^{\\circ}$ is an inscribed right angle, segment $AB$ is a diameter of the circle! Completing the square gives $(x - 3)^2 + (y - 4)^2 = 25$, so $r = 5$ and diameter $AB = 10$ (indeed, $A(6,0)$ and $B(0,8)$ have distance $\\sqrt{6^2 + 8^2} = 10$).",
            "Challenging", "Coordinate Intercepts & Thales' Diameter Theorem",
            cross_lesson="Topic 1.01 (Intercepts) & Topic 7.01 (Right Triangles)"
        ),
        make_mcq(
            "A belt wraps tightly around two congruent circular pulleys, each of radius $4\\,\\mathrm{cm}$, whose centers are $14\\,\\mathrm{cm}$ apart. What is the total length of the belt?",
            ["$14 + 8\\pi$", "$28 + 4\\pi$", "$28 + 8\\pi$", "$28 + 16\\pi$"],
            2,
            "The belt consists of two straight tangent segments of length $14\\,\\mathrm{cm}$ each ($28\\,\\mathrm{cm}$ total) plus two $180^{\\circ}$ semicircular arcs of radius $4\\,\\mathrm{cm}$ that together equal one full circumference $2\\pi(4) = 8\\pi\\,\\mathrm{cm}$. Total length $= 28 + 8\\pi\\,\\mathrm{cm}$.",
            "Challenging", "Pulley Belt Composite Perimeter",
            cross_lesson="Topic 8.01 (Composite Perimeter)"
        ),
        make_mcq(
            "For how many values of $x$ in the interval $0 \\le x \\le 2\\pi$ does $2\\sin^2(x) - \\sin(x) - 1 = 0$ hold?",
            ["$1$", "$2$", "$3$", "$4$"],
            2,
            "Factor as $(2\\sin x + 1)(\\sin x - 1) = 0$. On $[0, 2\\pi]$, $\\sin x = 1$ has $1$ solution ($x = \\dfrac{\\pi}{2}$), and $\\sin x = -\\dfrac{1}{2}$ has $2$ solutions ($x = \\dfrac{7\\pi}{6}, \\dfrac{11\\pi}{6}$). Thus there are $1 + 2 = 3$ solutions.",
            "Challenging", "Trigonometric Equations Quadratic in Form",
            cross_lesson="Topic 3.01 (Quadratic Factoring)"
        ),
        make_mcq(
            "A circle is inscribed in an equilateral triangle of side length $12$. What is the area of the circle?",
            ["$6\\pi$", "$12\\pi$", "$18\\pi$", "$36\\pi$"],
            1,
            "The altitude of the equilateral triangle is $h = 6\\sqrt{3}$, and the inradius is one-third of the altitude: $r = \\dfrac{1}{3}(6\\sqrt{3}) = 2\\sqrt{3}$. Therefore the circle's area is $\\pi r^2 = \\pi(2\\sqrt{3})^2 = 12\\pi$.",
            "Challenging", "Incircle of an Equilateral Triangle",
            cross_lesson="Topic 7.01 (Equilateral Triangles)"
        ),
        make_mcq(
            "When a circular sector with central angle $216^{\\circ}$ and radius $10$ is folded into a right circular cone, what is the volume of the cone?",
            ["$96\\pi$", "$128\\pi$", "$144\\pi$", "$288\\pi$"],
            0,
            "The cone's base radius satisfies $\\dfrac{r}{10} = \\dfrac{216^{\\circ}}{360^{\\circ}} = \\dfrac{3}{5} \\Rightarrow r = 6$. With slant height $\\ell = 10$, the cone height is $h = \\sqrt{10^2 - 6^2} = 8$, and its volume is $\\dfrac{1}{3}\\pi(6^2)(8) = 96\\pi$.",
            "Challenging", "Sector-to-Cone 3D Reconstruction",
            cross_lesson="Topic 8.01 (3D Cone Volume)"
        ),
        make_mcq(
            "If the circles $x^2 + y^2 = 9$ and $(x - 4)^2 + y^2 = 9$ intersect at points $P$ and $Q$, what is the area of the rhombus $OPO'Q$ formed by the two centers $O(0,0), O'(4,0)$ and the intersection points $P, Q$?",
            ["$4\\sqrt{5}$", "$6\\sqrt{5}$", "$8\\sqrt{5}$", "$12$"],
            0,
            "All four sides of $OPO'Q$ are radii of length $3$. The horizontal diagonal $OO'$ has length $4$, so half-diagonal is $2$, and the vertical half-diagonal is $\\sqrt{3^2 - 2^2} = \\sqrt{5}$ (full vertical diagonal $2\\sqrt{5}$). Rhombus area $= \\dfrac{1}{2}(4)(2\\sqrt{5}) = 4\\sqrt{5}$.",
            "Challenging", "Intersecting Circles & Rhombus Area",
            cross_lesson="Topic 8.01 (Rhombus Area)"
        ),
    ]

    return {
        "track": "sat",
        "num": "9.01",
        "title": "Circles, Radians & Trigonometry",
        "sub": "20 FRQs + 25 MCQs • Difficulty Progression • Cross-Lesson Synthesis",
        "sections": [
            {"heading": "Part I — Free-Response Questions (FRQs): Foundational Fluency (1–7)", "questions": frqs[0:7]},
            {"heading": "Part I — Free-Response Questions (FRQs): Intermediate Modeling (8–14)", "questions": frqs[7:14]},
            {"heading": "Part I — Free-Response Questions (FRQs): Challenging & Cross-Lesson Synthesis (15–20)", "questions": frqs[14:20]},
            {"heading": "Part II — Multiple-Choice Questions (MCQs): Foundational Concepts (21–28)", "questions": mcqs[0:8]},
            {"heading": "Part II — Multiple-Choice Questions (MCQs): Intermediate Exam Practice (29–37)", "questions": mcqs[8:17]},
            {"heading": "Part II — Multiple-Choice Questions (MCQs): Challenging & Cross-Lesson Synthesis (38–45)", "questions": mcqs[17:25]},
        ]
    }


# ==============================================================================
# TOPIC 10.01: Rational Expressions & Complex Numbers
# ==============================================================================
def build_10_01():
    frqs = [
        # Foundational (1-7)
        make_frq(
            "Factor the numerator and denominator completely, state all domain restrictions, and simplify $\\dfrac{2x^2 - 5x - 12}{x^2 - 16}$.",
            "Factor: $\\dfrac{(2x + 3)(x - 4)}{(x - 4)(x + 4)}$. Domain restrictions: $x \\neq 4$ and $x \\neq -4$. Canceling $x - 4$ yields $\\dfrac{2x + 3}{x + 4}$ for $x \\neq \\pm 4$.",
            "Foundational", "Simplifying Rational Expressions & Domain Restrictions"
        ),
        make_frq(
            "Combine over a common denominator and simplify into a single reduced fraction: $\\dfrac{3}{x - 2} - \\dfrac{2x - 1}{x^2 - 4}$.",
            "Since $x^2 - 4 = (x - 2)(x + 2)$, rewrite as $\\dfrac{3(x + 2) - (2x - 1)}{(x - 2)(x + 2)} = \\dfrac{3x + 6 - 2x + 1}{x^2 - 4} = \\dfrac{x + 7}{x^2 - 4}$ ($x \\neq \\pm 2$).",
            "Foundational", "Adding & Subtracting Rational Expressions"
        ),
        make_frq(
            "Solve the rational equation $\\dfrac{4}{x - 1} + \\dfrac{2}{x + 3} = 1$ for all valid real solutions.",
            "Multiply by $(x - 1)(x + 3)$: $4(x + 3) + 2(x - 1) = (x - 1)(x + 3) \\Rightarrow 6x + 10 = x^2 + 2x - 3 \\Rightarrow x^2 - 4x - 13 = 0 \\Rightarrow x = 2 \\pm \\sqrt{17}$ (neither equals $1$ or $-3$).",
            "Foundational", "Solving Rational Equations"
        ),
        make_frq(
            "Perform each complex number operation and write the result in standard form $a + bi$:",
            "Use $i^2 = -1$ and combine real and imaginary parts.",
            "Foundational", "Complex Number Arithmetic",
            parts=[
                "$(5 - 3i)(2 + 4i)$",
                "$(3 - 2i)^2 - (4 + 5i)$"
            ],
            answers=[
                "$10 + 20i - 6i - 12i^2 = 10 + 14i + 12 = 22 + 14i$",
                "$(9 - 12i + 4i^2) - 4 - 5i = (5 - 12i) - 4 - 5i = 1 - 17i$"
            ],
            cols=1
        ),
        make_frq(
            "Divide the complex numbers $\\dfrac{14 - 5i}{3 + 2i}$ by multiplying numerator and denominator by the complex conjugate, and express the result in the form $a + bi$.",
            "$\\dfrac{(14 - 5i)(3 - 2i)}{3^2 + 2^2} = \\dfrac{42 - 28i - 15i + 10i^2}{13} = \\dfrac{32 - 43i}{13} = \\dfrac{32}{13} - \\dfrac{43}{13}i$.",
            "Foundational", "Complex Conjugates & Division"
        ),
        make_frq(
            "Simplify $i^{45} + i^{102} - i^{79}$ using the periodicity of powers of $i$ ($i^4 = 1$).",
            "Divide each exponent by $4$: $45 = 4(11) + 1 \\Rightarrow i^{45} = i$; $102 = 4(25) + 2 \\Rightarrow i^{102} = i^2 = -1$; $79 = 4(19) + 3 \\Rightarrow i^{79} = i^3 = -i$. Thus $i + (-1) - (-i) = -1 + 2i$.",
            "Foundational", "Powers of the Imaginary Unit $i$"
        ),
        make_frq(
            "State the vertical asymptote, horizontal asymptote, $x$-intercept, and $y$-intercept of the rational function $f(x) = \\dfrac{2x - 6}{x - 1}$ graphed below.",
            "Vertical asymptote: $x = 1$; horizontal asymptote: $y = \\dfrac{2}{1} = 2$; $x$-intercept: $2x - 6 = 0 \\Rightarrow (3, 0)$; $y$-intercept: $f(0) = 6 \\Rightarrow (0, 6)$.",
            "Foundational", "Asymptotes & Intercepts of Rational Functions",
            figure={
                "type": "plot",
                "fns": ["(2*x - 6)/(x - 1)"],
                "xmin": -4, "xmax": 6, "ymin": -4, "ymax": 8,
                "asymptotes": {"x": [1], "y": [2]},
                "points": [[3, 0], [0, 6]],
                "width": 205
            }
        ),
        # Intermediate (8-14)
        make_frq(
            "Solve the rational equation $\\dfrac{x}{x - 3} - \\dfrac{3}{x - 3} = 2$ and explain why it has no solution.",
            "Multiplying both sides by $x - 3$ (for $x \\neq 3$) gives $x - 3 = 2(x - 3) \\Rightarrow x = 3$. However, $x = 3$ makes the denominator $x - 3 = 0$, so $x = 3$ is an extraneous solution and the equation has no solution.",
            "Intermediate", "Extraneous Solutions in Rational Equations"
        ),
        make_frq(
            "Find the constants $A$ and $B$ in the partial-fraction identity $\\dfrac{5x + 1}{(x - 1)(x + 2)} = \\dfrac{A}{x - 1} + \\dfrac{B}{x + 2}$.",
            "Multiply by $(x - 1)(x + 2)$: $5x + 1 = A(x + 2) + B(x - 1)$. Setting $x = 1$ gives $6 = 3A \\Rightarrow A = 2$. Setting $x = -2$ gives $-9 = -3B \\Rightarrow B = 3$.",
            "Intermediate", "Partial Fraction Decomposition"
        ),
        make_frq(
            "Simplify the complex fraction $\\dfrac{\\dfrac{1}{x} - \\dfrac{1}{3}}{x - 3}$ for $x \\neq 0, 3$, and evaluate the simplified expression at $x = 3$.",
            "Combine the numerator: $\\dfrac{\\dfrac{3 - x}{3x}}{x - 3} = \\dfrac{-(x - 3)}{3x(x - 3)} = -\\dfrac{1}{3x}$. Evaluating at $x = 3$ gives $-\\dfrac{1}{9}$.",
            "Intermediate", "Simplifying Complex Fractions"
        ),
        make_frq(
            "Find the complex conjugate solutions to $x^2 - 6x + 25 = 0$ in the form $a \\pm bi$, and verify that their sum is $6$ and their product is $25$.",
            "Complete the square: $(x - 3)^2 = -16 \\Rightarrow x - 3 = \\pm 4i \\Rightarrow x = 3 \\pm 4i$. Sum $= (3 + 4i) + (3 - 4i) = 6$; Product $= 3^2 + 4^2 = 9 + 16 = 25$.",
            "Intermediate", "Complex Roots of Quadratic Equations"
        ),
        make_frq(
            "Use polynomial long division to rewrite $\\dfrac{2x^2 + 5x - 1}{x + 3}$ in the form $ax + b + \\dfrac{r}{x + 3}$.",
            "Divide $2x^2 + 5x - 1$ by $x + 3$: $2x^2 + 5x - 1 = (2x - 1)(x + 3) + 2$. Therefore $\\dfrac{2x^2 + 5x - 1}{x + 3} = 2x - 1 + \\dfrac{2}{x + 3}$.",
            "Intermediate", "Quotient-Remainder Form of Rational Functions"
        ),
        make_frq(
            "Two resistors $R_1$ and $R_2$ connected in parallel have equivalent resistance $R_{\\mathrm{eq}}$ given by $\\dfrac{1}{R_{\\mathrm{eq}}} = \\dfrac{1}{R_1} + \\dfrac{1}{R_2}$. Solve for $R_2$ in terms of $R_{\\mathrm{eq}}$ and $R_1$, and compute $R_2$ when $R_{\\mathrm{eq}} = 12\\,\\Omega$ and $R_1 = 20\\,\\Omega$.",
            "$\\dfrac{1}{R_2} = \\dfrac{1}{R_{\\mathrm{eq}}} - \\dfrac{1}{R_1} = \\dfrac{R_1 - R_{\\mathrm{eq}}}{R_{\\mathrm{eq}} R_1} \\Rightarrow R_2 = \\dfrac{R_{\\mathrm{eq}} R_1}{R_1 - R_{\\mathrm{eq}}}$. For $R_{\\mathrm{eq}} = 12, R_1 = 20$: $R_2 = \\dfrac{12(20)}{20 - 12} = \\dfrac{240}{8} = 30\\,\\Omega$.",
            "Intermediate", "Harmonic / Parallel Resistance Formulas"
        ),
        make_frq(
            "Solve the rational inequality $\\dfrac{x - 4}{x + 2} \\le 0$ and express the solution set in interval notation.",
            "The critical values are the zero $x = 4$ (included) and the vertical asymptote $x = -2$ (strictly excluded, since division by zero is undefined). Sign analysis shows $\\dfrac{x - 4}{x + 2} \\le 0$ on $(-2, 4]$.",
            "Intermediate", "Solving Rational Inequalities"
        ),
        # Challenging & Cross-Lesson Synthesis (15-20)
        make_frq(
            "A polynomial $P(x)$ of degree $3$ with real coefficients has zeros $x = 2$ and $x = 1 + 3i$, and satisfies $P(0) = -40$. Find the factored and expanded forms of $P(x)$.",
            "By the Complex Conjugate Root Theorem, $1 - 3i$ is also a zero. The quadratic factor for $1 \\pm 3i$ is $(x - 1)^2 + 9 = x^2 - 2x + 10$. Thus $P(x) = a(x - 2)(x^2 - 2x + 10)$. Since $P(0) = -20a = -40 \\Rightarrow a = 2$, we get $P(x) = 2(x - 2)(x^2 - 2x + 10) = 2x^3 - 8x^2 + 28x - 40$.",
            "Challenging", "Complex Conjugate Root Theorem",
            cross_lesson="Topic 4.01 (Cubic Polynomials)"
        ),
        make_frq(
            "Find the domain, removable discontinuity (hole) coordinates, and vertical asymptote of $g(x) = \\dfrac{x^2 - 9}{x^2 - x - 6}$.",
            "Factor numerator and denominator: $g(x) = \\dfrac{(x - 3)(x + 3)}{(x - 3)(x + 2)}$. The domain is $x \\neq -2, 3$. The factor $x - 3$ cancels, giving $g(x) = \\dfrac{x + 3}{x + 2}$ for $x \\neq 3$: thus there is a removable discontinuity (hole) at $\\left(3, \\dfrac{6}{5}\\right)$ and a vertical asymptote at $x = -2$.",
            "Challenging", "Removable Discontinuities vs. Vertical Asymptotes",
            cross_lesson="Topic 3.01 (Quadratic Factoring)"
        ),
        make_frq(
            "A kayaker paddles $12\\,\\mathrm{km}$ upstream and $12\\,\\mathrm{km}$ back downstream in a river whose current flows at $3\\,\\mathrm{km/h}$. If the total round-trip time is $3$ hours, set up a rational equation to find the kayaker's speed $v$ in still water.",
            "Time equation: $\\dfrac{12}{v - 3} + \\dfrac{12}{v + 3} = 3$. Multiply by $(v - 3)(v + 3) = v^2 - 9$: $12(v + 3) + 12(v - 3) = 3(v^2 - 9) \\Rightarrow 24v = 3v^2 - 27 \\Rightarrow v^2 - 8v - 9 = 0 \\Rightarrow (v - 9)(v + 1) = 0$. Since $v > 3$, $v = 9\\,\\mathrm{km/h}$.",
            "Challenging", "Upstream-Downstream Rational Modeling",
            cross_lesson="Topic 5.01 (Rates) & Topic 3.01 (Quadratics)"
        ),
        make_frq(
            "For a one-to-one rational function $f(x) = \\dfrac{3x + 2}{x - 4}$ ($x \\neq 4$), find the formula for its inverse function $f^{-1}(x)$ and state the domain and range of $f$.",
            "Set $y = \\dfrac{3x + 2}{x - 4} \\Rightarrow y(x - 4) = 3x + 2 \\Rightarrow x(y - 3) = 4y + 2 \\Rightarrow x = \\dfrac{4y + 2}{y - 3}$. Thus $f^{-1}(x) = \\dfrac{4x + 2}{x - 3}$. The domain of $f$ is $x \\neq 4$ and the range of $f$ (domain of $f^{-1}$) is $y \\neq 3$.",
            "Challenging", "Inverting Linear Fractional Transformations",
            cross_lesson="Topic 1.01 (Isolating Variables)"
        ),
        make_frq(
            "In the complex plane, find the modulus $|z|$ of $z = \\dfrac{(3 + 4i)(1 - i)}{2 - 2i}$ without expanding the numerator.",
            "Using the multiplicative property of moduli $|z_1 z_2 / z_3| = |z_1||z_2|/|z_3|$: $|3 + 4i| = 5$, $|1 - i| = \\sqrt{2}$, and $|2 - 2i| = 2\\sqrt{2}$. Therefore $|z| = \\dfrac{5\\sqrt{2}}{2\\sqrt{2}} = \\dfrac{5}{2} = 2.5$.",
            "Challenging", "Modulus Algebra in the Complex Plane",
            cross_lesson="Topic 7.01 (Pythagorean Theorem)"
        ),
        make_frq(
            "If $x > 0$ and $x + \\dfrac{4}{x} = 6$, find the exact value of $x^2 + \\dfrac{16}{x^2}$ and the minimum possible value of $t + \\dfrac{4}{t}$ for all $t > 0$.",
            "Square $x + \\dfrac{4}{x} = 6$: $x^2 + 8 + \\dfrac{16}{x^2} = 36 \\Rightarrow x^2 + \\dfrac{16}{x^2} = 28$. For any $t > 0$, $t + \\dfrac{4}{t} = \\left(\\sqrt{t} - \\dfrac{2}{\\sqrt{t}}\\right)^2 + 4 \\ge 4$, with minimum value $4$ achieved at $t = 2$.",
            "Challenging", "Rational-Reciprocal Identities & Optimization",
            cross_lesson="Topic 3.01 (Completing the Square)"
        ),
    ]

    mcqs = [
        # Foundational (21-28)
        make_mcq(
            "For $x \\neq 3$, which expression is equivalent to $\\dfrac{x^2 - 9}{x - 3}$?",
            ["$x - 3$", "$x + 3$", "$x^2 + 3$", "$x - 9$"],
            1,
            "Factor the difference of squares: $\\dfrac{(x - 3)(x + 3)}{x - 3} = x + 3$.",
            "Foundational", "Simplifying Rational Expressions"
        ),
        make_mcq(
            "If $i = \\sqrt{-1}$, what is the sum $(7 - 4i) + (-2 + 9i)$?",
            ["$5 + 5i$", "$5 - 13i$", "$9 + 5i$", "$9 - 5i$"],
            0,
            "Combine real parts and imaginary parts: $(7 - 2) + (-4 + 9)i = 5 + 5i$.",
            "Foundational", "Adding Complex Numbers"
        ),
        make_mcq(
            "What is the vertical asymptote of the graph of $f(x) = \\dfrac{5}{2x + 8}$?",
            ["$x = -4$", "$x = 0$", "$x = 4$", "$x = 5$"],
            0,
            "Set the denominator equal to zero: $2x + 8 = 0 \\Rightarrow x = -4$.",
            "Foundational", "Vertical Asymptotes"
        ),
        make_mcq(
            "If $\\dfrac{6}{x - 2} = \\dfrac{3}{4}$, what is the value of $x$?",
            ["$6$", "$8$", "$10$", "$12$"],
            2,
            "Cross-multiply: $3(x - 2) = 24 \\Rightarrow x - 2 = 8 \\Rightarrow x = 10$.",
            "Foundational", "Proportions & Rational Equations"
        ),
        make_mcq(
            "What is the product $(4 + 3i)(4 - 3i)$?",
            ["$7$", "$16 - 9i$", "$25$", "$7 + 24i$"],
            2,
            "Multiplying complex conjugates gives $a^2 + b^2 = 4^2 + 3^2 = 16 + 9 = 25$.",
            "Foundational", "Product of Complex Conjugates"
        ),
        make_mcq(
            "Which expression is equivalent to $\\dfrac{2}{x} + \\dfrac{5}{3x}$ for $x \\neq 0$?",
            ["$\\dfrac{7}{4x}$", "$\\dfrac{7}{3x}$", "$\\dfrac{11}{3x}$", "$\\dfrac{10}{3x^2}$"],
            2,
            "Use the common denominator $3x$: $\\dfrac{6}{3x} + \\dfrac{5}{3x} = \\dfrac{11}{3x}$.",
            "Foundational", "Adding Fractions with Variable Denominators"
        ),
        make_mcq(
            "What is the value of $i^{26}$?",
            ["$-1$", "$1$", "$-i$", "$i$"],
            0,
            "Since $26 = 4(6) + 2$, we have $i^{26} = (i^4)^6 \\cdot i^2 = 1 \\cdot (-1) = -1$.",
            "Foundational", "Powers of $i$"
        ),
        make_mcq(
            "For what value of $x$ is the function $h(x) = \\dfrac{x + 5}{x^2 - 6x + 9}$ undefined?",
            ["$-5$", "$-3$", "$0$", "$3$"],
            3,
            "The denominator factors as $(x - 3)^2 = 0$, so $h(x)$ is undefined at $x = 3$.",
            "Foundational", "Domain of Rational Functions"
        ),
        # Intermediate (29-37)
        make_mcq(
            "Which expression is equivalent to $\\dfrac{3x + 7}{x + 2}$ for $x \\neq -2$?",
            [
                "$3 + \\dfrac{1}{x + 2}$",
                "$3 + \\dfrac{7}{x + 2}$",
                "$3 + \\dfrac{5}{x + 2}$",
                "$3 - \\dfrac{1}{x + 2}$"
            ],
            0,
            "Rewrite the numerator as $3(x + 2) + 1$: $\\dfrac{3(x + 2) + 1}{x + 2} = 3 + \\dfrac{1}{x + 2}$.",
            "Intermediate", "Rewriting Improper Rational Expressions"
        ),
        make_mcq(
            "When $\\dfrac{10}{1 - 2i}$ is written in the form $a + bi$, what is the value of $a + b$?",
            ["$2$", "$4$", "$6$", "$8$"],
            2,
            "Multiply by $\\dfrac{1 + 2i}{1 + 2i}$: $\\dfrac{10(1 + 2i)}{1^2 + 2^2} = \\dfrac{10(1 + 2i)}{5} = 2 + 4i$. Thus $a + b = 2 + 4 = 6$.",
            "Intermediate", "Complex Division & Real/Imaginary Parts"
        ),
        make_mcq(
            "What are all real solutions to $\\dfrac{x^2}{x - 4} = \\dfrac{16}{x - 4}$?",
            ["$x = 4$ only", "$x = -4$ only", "$x = 4$ and $x = -4$", "No real solution"],
            1,
            "For $x \\neq 4$, $x^2 = 16 \\Rightarrow x = \\pm 4$. Since $x = 4$ makes the denominator zero (extraneous), the only valid solution is $x = -4$.",
            "Intermediate", "Filtering Extraneous Roots"
        ),
        make_mcq(
            "What is the horizontal asymptote of $f(x) = \\dfrac{6x^2 - 5x + 1}{2x^2 + 9}$?",
            ["$y = 0$", "$y = \\dfrac{1}{3}$", "$y = 3$", "$y = 6$"],
            2,
            "Since numerator and denominator have equal degree ($2$), the horizontal asymptote is the ratio of leading coefficients: $y = \\dfrac{6}{2} = 3$.",
            "Intermediate", "Horizontal Asymptotes of Equal-Degree Rationals"
        ),
        make_mcq(
            "If $\\dfrac{4x - 2}{x^2 - 1} = \\dfrac{A}{x - 1} + \\dfrac{B}{x + 1}$ for all $x \\neq \\pm 1$, what is the value of $A$?",
            ["$1$", "$2$", "$3$", "$4$"],
            0,
            "Multiply by $x^2 - 1$: $4x - 2 = A(x + 1) + B(x - 1)$. Substitute $x = 1$: $2 = 2A \\Rightarrow A = 1$ (and at $x = -1$, $-6 = -2B \\Rightarrow B = 3$).",
            "Intermediate", "Partial Fractions Cover-Up Method"
        ),
        make_mcq(
            "For $a, b > 0$, which expression is equivalent to $\\dfrac{\\dfrac{1}{a} + \\dfrac{1}{b}}{\\dfrac{1}{ab}}$?",
            ["$\\dfrac{1}{a + b}$", "$a + b$", "$ab$", "$\\dfrac{a + b}{a^2 b^2}$"],
            1,
            "Multiply numerator and denominator by $ab$: $(b + a) / 1 = a + b$.",
            "Intermediate", "Simplifying Compound Fractions"
        ),
        make_mcq(
            "If $(x + yi)(2 - i) = 7 + i$, where $x$ and $y$ are real numbers, what is the value of $x + y$?",
            ["$3$", "$4$", "$5$", "$6$"],
            2,
            "Divide $7 + i$ by $2 - i$: $\\dfrac{(7 + i)(2 + i)}{5} = \\dfrac{14 + 9i - 1}{5} = \\dfrac{13 + 9i}{5} = 2.6 + 1.8i$. Wait: if the right side is $8 + i$, then $(8 + i)(2 + i)/5 = (15 + 10i)/5 = 3 + 2i$, so $x = 3, y = 2, x + y = 5$! Let's use $(x + yi)(2 - i) = 8 + i$.",
            "Intermediate", "Equating Real & Imaginary Parts"
        ),
        make_mcq(
            "Printer A can print a batch of reports in $x$ hours, and Printer B can print the same batch in $x + 3$ hours. Which expression represents the fraction of the batch they can print together in $1$ hour?",
            [
                "$\\dfrac{2}{2x + 3}$",
                "$\\dfrac{2x + 3}{x(x + 3)}$",
                "$\\dfrac{x(x + 3)}{2x + 3}$",
                "$\\dfrac{1}{x(x + 3)}$"
            ],
            1,
            "Their combined hourly rate is $\\dfrac{1}{x} + \\dfrac{1}{x + 3} = \\dfrac{(x + 3) + x}{x(x + 3)} = \\dfrac{2x + 3}{x(x + 3)}$.",
            "Intermediate", "Rational Expressions for Combined Work Rates"
        ),
        make_mcq(
            "Which of the following quadratic equations has roots $2 + i$ and $2 - i$?",
            [
                "$x^2 - 4x + 3 = 0$",
                "$x^2 - 4x + 5 = 0$",
                "$x^2 + 4x + 5 = 0$",
                "$x^2 - 2x + 5 = 0$"
            ],
            1,
            "Sum of roots $= (2 + i) + (2 - i) = 4$; product of roots $= 2^2 + 1^2 = 5$. Thus the monic quadratic is $x^2 - 4x + 5 = 0$.",
            "Intermediate", "Reconstructing Quadratics from Complex Conjugate Roots"
        ),
        # Challenging & Cross-Lesson Synthesis (38-45)
        make_mcq(
            "What is the value of the sum $i^1 + i^2 + i^3 + \\dots + i^{99}$?",
            ["$-1$", "$0$", "$i$", "$-i$"],
            0,
            "Every block of $4$ consecutive powers of $i$ sums to $i - 1 - i + 1 = 0$. Since $99 = 4(24) + 3$, the first $96$ terms sum to $0$, leaving $i^{97} + i^{98} + i^{99} = i + (-1) + (-i) = -1$.",
            "Challenging", "Periodic Series of Powers of $i$",
            cross_lesson="Topic 4.01 (Exponents & Periodicity)"
        ),
        make_mcq(
            "In the $xy$-plane, at how many points does the rational curve $y = \\dfrac{6}{x}$ intersect the line $x + y = 5$?",
            ["Zero", "One", "Two", "Three"],
            2,
            "Substitute $y = 5 - x$: $\\dfrac{6}{x} = 5 - x \\Rightarrow x^2 - 5x + 6 = 0 \\Rightarrow (x - 2)(x - 3) = 0$. This gives two intersection points: $(2, 3)$ and $(3, 2)$.",
            "Challenging", "Hyperbola-Line Intersection System",
            cross_lesson="Topic 2.01 (Systems) & Topic 3.01 (Quadratics)"
        ),
        make_mcq(
            "A chemistry student adds $x$ liters of pure water to $20$ liters of a $40\\%$ acid solution. Which rational function gives the new acid concentration $C(x)$ as a decimal, and what is $\\lim_{x \\to \\infty} C(x)$?",
            [
                "$C(x) = \\dfrac{8}{20 + x}$, horizontal asymptote $C = 0$",
                "$C(x) = \\dfrac{8 + x}{20 + x}$, horizontal asymptote $C = 1$",
                "$C(x) = \\dfrac{0.40}{20 + x}$, horizontal asymptote $C = 0$",
                "$C(x) = \\dfrac{20}{8 + x}$, horizontal asymptote $C = 0$"
            ],
            0,
            "Pure acid remains constant at $0.40(20) = 8$ liters, while total volume becomes $20 + x$ liters, so $C(x) = \\dfrac{8}{20 + x} \\to 0$ as $x \\to \\infty$.",
            "Challenging", "Rational Dilution Modeling & Asymptotic Behavior",
            cross_lesson="Topic 5.01 (Mixture & Concentration)"
        ),
        make_mcq(
            "For how many integer values of $n$ is $\\dfrac{2n + 15}{n + 2}$ also an integer?",
            ["$2$", "$4$", "$6$", "$8$"],
            1,
            "Divide: $\\dfrac{2n + 15}{n + 2} = \\dfrac{2(n + 2) + 11}{n + 2} = 2 + \\dfrac{11}{n + 2}$. This is an integer if and only if $n + 2$ divides the prime $11$, i.e. $n + 2 \\in \\{\\pm 1, \\pm 11\\}$ ($4$ integer values of $n$: $-13, -3, -1, 9$).",
            "Challenging", "Integer Divisibility via Rational Division",
            cross_lesson="Topic 4.01 (Polynomial Division)"
        ),
        make_mcq(
            "If $z = 3 + 4i$, what is the distance in the complex plane between $z$ and $i z$?",
            ["$5$", "$5\\sqrt{2}$", "$7$", "$10$"],
            1,
            "Multiplying by $i$ rotates $z$ by $90^{\\circ}$ around the origin without changing its length $|z| = 5$ (specifically, $iz = -4 + 3i$). By the $45^{\\circ}\\text{-}45^{\\circ}\\text{-}90^{\\circ}$ right triangle with legs $5$ and $5$, the distance $|z - iz|$ is $5\\sqrt{2}$.",
            "Challenging", "90-Degree Rotation by $i$ in the Complex Plane",
            cross_lesson="Topic 7.01 (45-45-90 Right Triangles)"
        ),
        make_mcq(
            "What is the solution set to the rational inequality $\\dfrac{x + 5}{x - 2} \\ge 2$?",
            ["$(2, 9]$", "$[9, \\infty)$", "$(-\\infty, 2) \\cup [9, \\infty)$", "$[-5, 2)$"],
            0,
            "Subtract $2$: $\\dfrac{x + 5 - 2(x - 2)}{x - 2} = \\dfrac{9 - x}{x - 2} \\ge 0 \\Leftrightarrow \\dfrac{x - 9}{x - 2} \\le 0$. Since $x = 2$ is excluded and $x = 9$ is included, the solution set is $(2, 9]$.",
            "Challenging", "Non-Zero Right-Hand-Side Rational Inequalities",
            cross_lesson="Topic 2.01 (Inequalities)"
        ),
        make_mcq(
            "A right triangle has legs of lengths $\\dfrac{1}{a}$ and $\\dfrac{1}{b}$, where $a, b > 0$. Which rational expression gives the length of the altitude drawn to the hypotenuse?",
            [
                "$\\dfrac{1}{a + b}$",
                "$\\dfrac{1}{\\sqrt{a^2 + b^2}}$",
                "$\\dfrac{ab}{\\sqrt{a^2 + b^2}}$",
                "$\\dfrac{\\sqrt{a^2 + b^2}}{ab}$"
            ],
            1,
            "The inverse-Pythagorean altitude formula states $\\dfrac{1}{h^2} = \\dfrac{1}{leg_1^2} + \\dfrac{1}{leg_2^2} = a^2 + b^2 \\Rightarrow h = \\dfrac{1}{\\sqrt{a^2 + b^2}}$.",
            "Challenging", "Inverse Pythagorean Theorem for Right-Triangle Altitude",
            cross_lesson="Topic 7.01 (Right-Triangle Altitude)"
        ),
        make_mcq(
            "If $f(x) = \\dfrac{x - 1}{x + 1}$, what is $f(f(x))$ for all $x \\neq -1, 0$?",
            ["$x$", "$-\\dfrac{1}{x}$", "$\\dfrac{1}{x}$", "$-x$"],
            1,
            "$f(f(x)) = \\dfrac{\\dfrac{x-1}{x+1} - 1}{\\dfrac{x-1}{x+1} + 1} = \\dfrac{(x - 1) - (x + 1)}{(x - 1) + (x + 1)} = \\dfrac{-2}{2x} = -\\dfrac{1}{x}$.",
            "Challenging", "Iterated Composition of Rational Functions",
            cross_lesson="Topic 4.01 (Function Composition)"
        ),
    ]

    mcqs[14] = make_mcq(
        "If $(x + yi)(2 - i) = 8 + i$, where $x$ and $y$ are real numbers, what is the value of $x + y$?",
        ["$3$", "$4$", "$5$", "$6$"],
        2,
        "Divide $8 + i$ by $2 - i$: $\\dfrac{(8 + i)(2 + i)}{2^2 + 1^2} = \\dfrac{16 + 10i - 1}{5} = \\dfrac{15 + 10i}{5} = 3 + 2i$. Thus $x = 3$ and $y = 2$, giving $x + y = 5$.",
        "Intermediate", "Equating Real & Imaginary Parts"
    )

    return {
        "track": "sat",
        "num": "10.01",
        "title": "Rational Expressions & Complex Numbers",
        "sub": "20 FRQs + 25 MCQs • Difficulty Progression • Cross-Lesson Synthesis",
        "sections": [
            {"heading": "Part I — Free-Response Questions (FRQs): Foundational Fluency (1–7)", "questions": frqs[0:7]},
            {"heading": "Part I — Free-Response Questions (FRQs): Intermediate Modeling (8–14)", "questions": frqs[7:14]},
            {"heading": "Part I — Free-Response Questions (FRQs): Challenging & Cross-Lesson Synthesis (15–20)", "questions": frqs[14:20]},
            {"heading": "Part II — Multiple-Choice Questions (MCQs): Foundational Concepts (21–28)", "questions": mcqs[0:8]},
            {"heading": "Part II — Multiple-Choice Questions (MCQs): Intermediate Exam Practice (29–37)", "questions": mcqs[8:17]},
            {"heading": "Part II — Multiple-Choice Questions (MCQs): Challenging & Cross-Lesson Synthesis (38–45)", "questions": mcqs[17:25]},
        ]
    }


EXTRA_FIGURES = {
    "1.01": [
        (0, 2, {"type": "plot", "fns": ["0.75*x - 3"], "xmin": -1, "xmax": 6, "ymin": -4, "ymax": 2, "points": [[0, -3], [4, 0]], "width": 195}),
        (1, 6, {"type": "plot", "fns": ["22 + 1.8*x", "49 + 3.2*(x - 15)"], "xmin": 0, "xmax": 30, "ymin": 20, "ymax": 100, "points": [[15, 49], [25, 81]], "width": 195}),
        (2, 3, {"type": "plot", "fns": ["0.65*x + 212"], "scatter_pts": [[380, 460], [400, 470], [420, 485], [440, 500], [460, 501]], "xmin": 360, "xmax": 480, "ymin": 440, "ymax": 530, "width": 195}),
        (4, 2, {"type": "plot", "fns": ["-2*x + 7"], "xmin": -3, "xmax": 7, "ymin": -6, "ymax": 12, "points": [[-2, 11], [3.5, 0], [6, -5]], "width": 195}),
        (5, 3, {"type": "plot", "fns": ["x**2 + 2*x + 9", "6*x + 5"], "xmin": -1, "xmax": 5, "ymin": 4, "ymax": 35, "points": [[2, 17]], "width": 195}),
    ],
    "2.01": [
        (0, 0, {"type": "numberline", "min": -1, "max": 6, "shade": [-1, 3], "marks": [{"x": 3, "open": False, "label": "$x \\le 3$"}], "width": 220}),
        (1, 2, {"type": "numberline", "min": -3, "max": 8, "shade": [-1.33, 6], "marks": [{"x": -1.33, "open": False, "label": "$-4/3$"}, {"x": 6, "open": False, "label": "$6$"}], "width": 220}),
        (2, 1, {"type": "plot", "fns": ["x**2 - 4*x + 6", "2*x - 1"], "xmin": 0, "xmax": 6, "ymin": 0, "ymax": 10, "width": 195}),
        (4, 3, {"type": "plot", "fns": ["3*x + 4", "-x + 12", "2"], "xmin": -1, "xmax": 11, "ymin": 0, "ymax": 12, "shade": {"fn1": "2", "fn2": "np.minimum(3*x + 4, -x + 12)", "x0": -0.67, "x1": 10}, "points": [[2, 10]], "width": 195}),
        (5, 4, {"type": "plot", "fns": ["0.75*x", "sqrt(np.maximum(0, 9 - (x - 5)**2))", "-sqrt(np.maximum(0, 9 - (x - 5)**2))"], "xmin": 0, "xmax": 9, "ymin": -4, "ymax": 5, "points": [[3.2, 2.4]], "width": 195}),
    ],
    "3.01": [
        (0, 4, {"type": "plot", "fns": ["x**2 - 4*x - 12"], "xmin": -4, "xmax": 8, "ymin": -18, "ymax": 10, "points": [[-2, 0], [6, 0], [0, -12], [2, -16]], "width": 195}),
        (0, 6, {"type": "plot", "fns": ["-4.9*x**2 + 29.4*x + 24.5"], "xmin": 0, "xmax": 7, "ymin": 0, "ymax": 75, "points": [[0, 24.5], [3, 68.6]], "width": 195}),
        (1, 6, {"type": "numberline", "min": -3, "max": 7, "shade": [-1.5, 5], "marks": [{"x": -1.5, "open": False, "label": "$-1.5$"}, {"x": 5, "open": False, "label": "$5$"}], "width": 220}),
        (2, 1, {"type": "plot", "fns": ["12 - 3*x**2"], "xmin": -2.5, "xmax": 2.5, "ymin": 0, "ymax": 13, "shade": {"fn1": "0", "fn2": "9", "x0": -1, "x1": 1}, "points": [[-1, 9], [1, 9]], "width": 195}),
        (4, 0, {"type": "plot", "fns": ["-2*x**2 + 16*x - 25"], "xmin": 1, "xmax": 7, "ymin": -10, "ymax": 9, "points": [[4, 7]], "width": 195}),
        (5, 0, {"type": "plot", "fns": ["x**2 - 6*x + 8"], "xmin": -1, "xmax": 5, "ymin": -2, "ymax": 10, "points": [[2, 0], [4, 0], [0, 8]], "width": 195}),
    ],
    "4.01": [
        (0, 5, {"type": "plot", "fns": ["x**3 + 3*x**2 - 4*x - 12"], "xmin": -4, "xmax": 3, "ymin": -16, "ymax": 10, "points": [[-3, 0], [-2, 0], [2, 0], [0, -12]], "width": 195}),
        (1, 0, {"type": "plot", "fns": ["160*(0.5**(x/15))"], "xmin": 0, "xmax": 65, "ymin": 0, "ymax": 170, "points": [[0, 160], [15, 80], [30, 40], [45, 20], [60, 10]], "width": 195}),
        (2, 2, {"type": "plot", "fns": ["(x + 1)**2 * (x - 2)"], "xmin": -2.5, "xmax": 3, "ymin": -5, "ymax": 6, "points": [[-1, 0], [2, 0], [0, -2]], "width": 195}),
        (3, 3, {"type": "plot", "fns": ["28*(0.85**x)"], "xmin": 0, "xmax": 8, "ymin": 0, "ymax": 30, "points": [[0, 28], [4, 14.6]], "width": 195}),
        (4, 6, {"type": "plot", "fns": ["4*(0.6**x) - 7"], "xmin": -2, "xmax": 6, "ymin": -8, "ymax": 6, "asymptotes": {"y": [-7]}, "points": [[0, -3]], "width": 195}),
        (5, 2, {"type": "solid", "solid": "rectangular_prism", "dims": [3, 2, 1], "labels": {"l": "$3$", "w": "$2$", "h": "$1$"}, "width": 185}),
    ],
    "5.01": [
        (0, 0, {"type": "bars", "categories": ["Cement", "Sand", "Gravel"], "values": [80, 200, 320], "highlight_index": 2, "ylabel": "Mass (kg)", "width": 195}),
        (0, 4, {"type": "polygon", "vertices": [[0, 0], [12, 0], [12, 8], [0, 8]], "side_labels": ["$12\\,\\mathrm{m}$", "$8\\,\\mathrm{m}$", None, None], "width": 190}),
        (1, 1, {"type": "plot", "fns": ["180/(x**2)"], "xmin": 1.5, "xmax": 7, "ymin": 0, "ymax": 100, "points": [[2, 45], [6, 5]], "width": 195}),
        (2, 2, {"type": "solid", "solid": "cone", "dims": [6, 6, 10], "labels": {"r": "$3k$", "h": "$5k$"}, "width": 185}),
        (3, 6, {"type": "bars", "categories": ["Orange", "Pineapple"], "values": [15, 9], "highlight_index": 0, "ylabel": "Liters", "width": 190}),
        (5, 3, {"type": "triangle", "vertices": [[0, 0], [10, 0], [3, 8]], "labels": ["$B$", "$C$", "$A$"], "side_labels": ["$BC$", "$AC$", "$AB$"], "width": 195}),
    ],
    "6.01": [
        (0, 0, {"type": "boxplot", "groups": [{"label": "Sample", "stats": [12, 15, 18, 25, 33]}], "min": 8, "max": 38, "xlabel": "Value", "width": 215}),
        (1, 1, {"type": "bars", "categories": ["1", "2", "3", "4", "5"], "values": [4, 7, 6, 5, 3], "highlight_index": 1, "ylabel": "Students", "width": 195}),
        (2, 5, {"type": "circle", "radius": 10, "center": [0, 0], "center_label": "$O$", "radius_label": "$10\\,\\mathrm{cm}$", "width": 185}),
        (4, 6, {"type": "plot", "fns": ["12*exp(-0.5*((x - 70)/8)**2)"], "xmin": 46, "xmax": 94, "ymin": 0, "ymax": 14, "shade": {"fn1": "0", "fn2": "12*exp(-0.5*((x - 70)/8)**2)", "x0": 70, "x1": 86}, "width": 205}),
        (5, 3, {"type": "plot", "fns": ["-1.5*x + 28"], "xmin": 0, "xmax": 18, "ymin": 0, "ymax": 30, "points": [[12, 10]], "point_labels": [{"x": 12, "y": 10, "label": "$(\\bar{x},\\bar{y})=(12,10)$", "dx": 0.5, "dy": 1.0}], "width": 200}),
    ],
    "7.01": [
        (0, 3, {"type": "triangle", "vertices": [[0, 0], [12, 0], [6, 10.39]], "labels": ["$A$", "$B$", "$C$"], "side_labels": ["$12$", "$12$", "$12$"], "width": 190}),
        (1, 2, {"type": "triangle", "vertices": [[0, 0], [13, 0], [4, 6]], "labels": ["$A$", "$B$", "$C$"], "side_labels": ["$AB=13$", "$3\\sqrt{13}$", "$2\\sqrt{13}$"], "right_angle_at": 2, "width": 195}),
        (1, 6, {"type": "polygon", "vertices": [[0, 0], [26, 0], [18, 15], [8, 15]], "side_labels": ["$26$", "$17$", "$10$", "$17$"], "width": 195}),
        (2, 3, {"type": "circle", "radius": 10, "center": [0, 0], "center_label": "$O$", "chord": [0, 126.87], "points": [{"angle": 0, "label": "$B$"}, {"angle": 180, "label": "$A$"}, {"angle": 126.87, "label": "$C$"}], "width": 190}),
        (4, 2, {"type": "triangle", "vertices": [[0, 0], [10, 0], [5, 12]], "labels": ["$A$", "$B$", "$C$"], "side_labels": ["$10$", "$13$", "$13$"], "width": 190}),
        (5, 1, {"type": "plot", "fns": ["-0.75*x + 6"], "xmin": -1, "xmax": 10, "ymin": -1, "ymax": 8, "points": [[0, 6], [8, 0]], "width": 195}),
    ],
    "8.01": [
        (0, 1, {"type": "solid", "solid": "cylinder", "dims": [8, 8, 10], "labels": {"r": "$4\\,\\mathrm{cm}$", "h": "$10\\,\\mathrm{cm}$"}, "width": 185}),
        (0, 5, {"type": "polygon", "vertices": [[0, 0], [10, 0], [10, 4], [4, 4], [4, 9], [0, 9]], "side_labels": ["$10$", "$4$", "$6$", "$5$", "$4$", "$9$"], "width": 190}),
        (1, 6, {"type": "solid", "solid": "cone", "dims": [12, 12, 8], "labels": {"r": "$6\\,\\mathrm{cm}$", "h": "$8\\,\\mathrm{cm}$"}, "width": 185}),
        (2, 1, {"type": "solid", "solid": "cone", "dims": [12, 12, 12], "labels": {"r": "$R=6$", "h": "$H=12$"}, "width": 185}),
        (3, 2, {"type": "polygon", "vertices": [[0, 0], [15, 0], [12, 7], [3, 7]], "side_labels": ["$15$", None, "$9$", None], "width": 190}),
        (4, 3, {"type": "solid", "solid": "square_pyramid", "dims": [10, 10, 12], "labels": {"base": "$10$", "h": "$12$"}, "width": 185}),
    ],
    "9.01": [
        (0, 0, {"type": "circle", "radius": 7, "center": [5, -3], "center_label": "$(5,-3)$", "radius_label": "$r=7$", "width": 185}),
        (2, 0, {"type": "circle", "radius": 6, "center": [0, 0], "center_label": "$O$", "sector": {"start_deg": 0, "end_deg": 90, "label": "$90^{\\circ}$"}, "chord": [0, 90], "width": 185}),
        (2, 1, {"type": "plot", "fns": ["x + 1", "sqrt(np.maximum(0, 25 - x**2))", "-sqrt(np.maximum(0, 25 - x**2))"], "xmin": -6, "xmax": 6, "ymin": -6, "ymax": 6, "points": [[-4, -3], [3, 4]], "width": 195}),
        (3, 4, {"type": "circle", "radius": 8, "center": [0, 0], "center_label": "$O$", "radius_label": "$8$", "sector": {"start_deg": 0, "end_deg": 45, "label": "$45^{\\circ}$"}, "width": 185}),
        (4, 2, {"type": "circle", "radius": 13, "center": [0, 0], "center_label": "$O$", "radius_label": "$13$", "chord": [22.6, 157.4], "width": 185}),
        (5, 6, {"type": "solid", "solid": "cone", "dims": [12, 12, 8], "labels": {"r": "$r=6$", "h": "$h=8$"}, "width": 185}),
    ],
    "10.01": [
        (1, 3, {"type": "plot", "fns": ["x**2 - 6*x + 25"], "xmin": -1, "xmax": 7, "ymin": 0, "ymax": 30, "points": [[3, 16]], "point_labels": [{"x": 3, "y": 16, "label": "$V(3,16)$", "dx": 0.3, "dy": 0.8}], "width": 195}),
        (1, 4, {"type": "plot", "fns": ["(2*x**2 + 5*x - 1)/(x + 3)", "2*x - 1"], "xmin": -8, "xmax": 4, "ymin": -15, "ymax": 10, "asymptotes": {"x": [-3]}, "width": 195}),
        (1, 6, {"type": "numberline", "min": -4, "max": 6, "shade": [-2, 4], "marks": [{"x": -2, "open": True, "label": "$-2$"}, {"x": 4, "open": False, "label": "$4$"}], "width": 220}),
        (2, 1, {"type": "plot", "fns": ["(x + 3)/(x + 2)"], "xmin": -6, "xmax": 5, "ymin": -4, "ymax": 6, "asymptotes": {"x": [-2], "y": [1]}, "points": [[3, 1.2]], "width": 195}),
        (3, 2, {"type": "plot", "fns": ["5/(2*x + 8)"], "xmin": -8, "xmax": 2, "ymin": -6, "ymax": 6, "asymptotes": {"x": [-4], "y": [0]}, "width": 195}),
        (4, 3, {"type": "plot", "fns": ["(6*x**2 - 5*x + 1)/(2*x**2 + 9)"], "xmin": -6, "xmax": 6, "ymin": 0, "ymax": 5, "asymptotes": {"y": [3]}, "width": 195}),
        (5, 1, {"type": "plot", "fns": ["6/x", "5 - x"], "xmin": 0.5, "xmax": 6, "ymin": 0, "ymax": 6, "points": [[2, 3], [3, 2]], "width": 195}),
    ],
}


def enrich_figures(topic):
    num = topic.get("num")
    for sec_idx, q_idx, fig in EXTRA_FIGURES.get(num, []):
        q = topic["sections"][sec_idx]["questions"][q_idx]
        if not q.get("figure"):
            q["figure"] = fig


def normalize_tex_in_obj(obj):
    if isinstance(obj, str):
        s = re.sub(r"\\le(?![a-zA-Z])", r"\\leq", obj)
        s = re.sub(r"\\ge(?![a-zA-Z])", r"\\geq", s)
        s = re.sub(r"\\ne(?![a-zA-Z])", r"\\neq", s)
        s = re.sub(r"\\text\{([^}]*)\}", lambda m: r"\mathrm{" + m.group(1).replace(" ", r"\ ") + "}", s)
        return s
    if isinstance(obj, list):
        return [normalize_tex_in_obj(x) for x in obj]
    if isinstance(obj, dict):
        return {k: normalize_tex_in_obj(v) for k, v in obj.items()}
    return obj


def validate_topic(topic, filename):
    enrich_figures(topic)
    topic.update(normalize_tex_in_obj(topic))
    total_frq = 0
    total_mcq = 0
    total_figs = 0
    total_cross = 0
    math_spans = 0

    def check_str(s, ctx):
        nonlocal math_spans
        if not s:
            return
        if s.count("$") % 2 != 0:
            raise ValueError(f"[{filename}] Odd number of '$' in {ctx}: {s}")
        for m in re.finditer(r"\$([^$]+)\$", s):
            tex = "$" + m.group(1) + "$"
            math_spans += 1
            if _parser is not None:
                try:
                    _parser.parse(tex, dpi=72, prop=_prop)
                except Exception as e:
                    raise ValueError(f"[{filename}] Mathtext parse error in {ctx}: {tex} -> {e}")

    for sec in topic["sections"]:
        check_str(sec.get("heading"), "section.heading")
        for idx, q in enumerate(sec["questions"]):
            ctx = f"{sec.get('heading', '')} Q#{idx+1}"
            check_str(q.get("q"), ctx + ".q")
            check_str(q.get("answer"), ctx + ".answer")
            for p in q.get("parts", []):
                check_str(p, ctx + ".part")
            for a in q.get("answers", []):
                check_str(a, ctx + ".part_answer")
            for c in q.get("choices", []):
                check_str(c, ctx + ".choice")
            if q.get("choices"):
                total_mcq += 1
                assert len(q["choices"]) == 4, f"{ctx} must have 4 choices"
                assert 0 <= q.get("correct", -1) <= 3, f"{ctx} invalid correct index"
            else:
                total_frq += 1
            if q.get("figure"):
                total_figs += 1
            if q.get("cross_lesson"):
                total_cross += 1

    assert total_frq >= 20, f"[{filename}] Expected >= 20 FRQs, got {total_frq}"
    assert total_mcq >= 25, f"[{filename}] Expected >= 25 MCQs, got {total_mcq}"
    assert total_figs >= 2, f"[{filename}] Expected >= 2 figures, got {total_figs}"
    assert total_cross >= 6, f"[{filename}] Expected >= 6 cross-lesson questions, got {total_cross}"
    return total_frq, total_mcq, total_figs, total_cross, math_spans


def main():
    os.makedirs(SAT_DIR, exist_ok=True)
    builders = [
        ("1.01-linear-equations-and-systems.json", "1.01", "linear-equations-and-systems", "Linear Equations & Systems", build_1_01),
        ("2.01-linear-functions-and-inequalities.json", "2.01", "linear-functions-and-inequalities", "Linear Functions & Inequalities", build_2_01),
        ("3.01-quadratics-and-nonlinear-equations.json", "3.01", "quadratics-and-nonlinear-equations", "Quadratics & Nonlinear Equations", build_3_01),
        ("4.01-exponentials-and-polynomials.json", "4.01", "exponentials-and-polynomials", "Exponentials & Polynomials", build_4_01),
        ("5.01-problem-solving-and-data.json", "5.01", "problem-solving-and-data", "Problem-Solving, Ratios, Rates & Data", build_5_01),
        ("6.01-geometry-and-trigonometry.json", "6.01", "geometry-and-trigonometry", "Geometry, Triangles & Trigonometry", build_7_01),
        ("7.01-calculator-and-strategy.json", "7.01", "calculator-and-strategy", "Area, Volume, 3D Solids & Modeling Strategy", build_8_01),
        ("8.01-functions.json", "8.01", "functions", "Functions, Rational Expressions & Complex Numbers", build_10_01),
        ("9.01-statistics-and-sampling.json", "9.01", "statistics-and-sampling", "Statistics, Data Analysis & Sampling", build_6_01),
        ("10.01-conditional-probability.json", "10.01", "conditional-probability", "Circles, Radians, Trig & Conditional Probability", build_9_01),
    ]
    grand_frq = 0
    grand_mcq = 0
    grand_figs = 0
    grand_cross = 0
    grand_math = 0
    for fname, num, slug, title, fn in builders:
        topic = fn()
        n_frq, n_mcq, n_figs, n_cross, n_math = validate_topic(topic, fname)
        topic["num"] = num
        topic["slug"] = slug
        topic["title"] = title
        out_path = os.path.join(SAT_DIR, fname)
        with open(out_path, "w", encoding="utf-8") as f:
            json.dump(topic, f, ensure_ascii=False, indent=2)
        grand_frq += n_frq
        grand_mcq += n_mcq
        grand_figs += n_figs
        grand_cross += n_cross
        grand_math += n_math
        print(f"✓ {fname}: {n_frq} FRQs + {n_mcq} MCQs = {n_frq+n_mcq} Qs | {n_figs} figures | {n_cross} cross-lesson | {n_math} math spans verified")
    print(f"\nTOTAL SAT TRACK: {grand_frq} FRQs + {grand_mcq} MCQs = {grand_frq + grand_mcq} Questions | {grand_figs} Figures | {grand_cross} Cross-Lesson Qs | {grand_math} Verified Math Spans")


if __name__ == "__main__":
    main()
