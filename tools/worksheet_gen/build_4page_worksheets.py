#!/usr/bin/env python3
"""Build 4-page branded worksheets with rendered math for AddMath and Math for AI.

Ensures:
1. Rendered math via matplotlib mathtext with true baseline alignment.
2. Official ClipSAT logo and branding (clipsat-mark.png, indigo palette, header, copyright footer).
3. Exactly 4 pages in size for each worksheet.
4. Clean of repeated ideas: each section and question covers a distinct mathematical competency.
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

# Helper to construct a question
def make_q(q, choices, correct, answer):
    return {
        "q": q,
        "choices": choices,
        "correct": correct,
        "answer": answer
    }

# ==============================================================================
# ALL 16 TOPIC DEFINITIONS (8 ADDMATH + 8 MATHAI)
# ==============================================================================

TOPICS = [
    # --------------------------------------------------------------------------
    # ADDMATH 1.01: Functions, Modulus and Quadratics
    # --------------------------------------------------------------------------
    {
        "track": "addmath",
        "num": "1.01",
        "slug": "functions-modulus-and-quadratics",
        "title": "Functions, Modulus and Quadratics",
        "sections": [
            {
                "heading": "Section 1: Function Mapping, Domain/Range and Inverses",
                "questions": [
                    make_q(
                        "The functions $f$ and $g$ are defined for $x \\in \\mathbf{R}$ by $f(x) = 2x - 5$ and $g(x) = x^2 + 3$. Find the composite value $(g \\circ f)(4)$.",
                        ["$12$", "$21$", "$14$", "$9$"], 0,
                        "Evaluate $f(4) = 2(4) - 5 = 3$. Then $(g \\circ f)(4) = g(3) = 3^2 + 3 = 12$."
                    ),
                    make_q(
                        "A function is defined by $f(x) = \\frac{3x + 1}{x - 2}$ for $x \\neq 2$. Find an expression for the inverse function $f^{-1}(x)$ and state its domain.",
                        [
                            "$f^{-1}(x) = \\frac{2x + 1}{x - 3}, \\quad x \\neq 3$",
                            "$f^{-1}(x) = \\frac{x - 2}{3x + 1}, \\quad x \\neq -\\frac{1}{3}$",
                            "$f^{-1}(x) = \\frac{2x - 1}{x + 3}, \\quad x \\neq -3$",
                            "$f^{-1}(x) = \\frac{3x - 2}{x - 1}, \\quad x \\neq 1$"
                        ], 0,
                        "Let $y = \\frac{3x+1}{x-2} \\Rightarrow yx - 2y = 3x + 1 \\Rightarrow x(y - 3) = 2y + 1 \\Rightarrow x = \\frac{2y + 1}{y - 3}$. Thus $f^{-1}(x) = \\frac{2x + 1}{x - 3}$ for $x \\neq 3$."
                    ),
                    make_q(
                        "The square root function $h(x) = 4 - \\sqrt{2x - 6}$ is defined on its maximal real domain. Determine the domain and range of $h$.",
                        [
                            "Domain: $x \\geq 3$, Range: $h(x) \\leq 4$",
                            "Domain: $x \\geq 3$, Range: $h(x) \\geq 4$",
                            "Domain: $x > 3$, Range: $h(x) \\in \\mathbf{R}$",
                            "Domain: $x \\leq 3$, Range: $h(x) \\leq 0$"
                        ], 0,
                        "For the square root to exist: $2x - 6 \\geq 0 \\Rightarrow x \\geq 3$. Since $\\sqrt{2x-6} \\geq 0$, $h(x) = 4 - \\sqrt{2x-6} \\leq 4$."
                    )
                ]
            },
            {
                "heading": "Section 2: Modulus Equations and Inequalities",
                "questions": [
                    make_q(
                        "Solve the linear modulus equation $|3x - 4| = 2x + 1$ for all valid real solutions.",
                        ["$x = 5$ and $x = \\frac{3}{5}$", "$x = 5$ only", "$x = -1$ and $x = 3$", "No real solutions"], 0,
                        "Case 1: $3x - 4 = 2x + 1 \\Rightarrow x = 5$ (valid). Case 2: $3x - 4 = -(2x + 1) \\Rightarrow 5x = 3 \\Rightarrow x = 3/5$ (valid)."
                    ),
                    make_q(
                        "Find the complete solution set for the absolute value inequality $|2x - 7| < 5$.",
                        ["$1 < x < 6$", "$x < 1$ or $x > 6$", "$-6 < x < 1$", "$2 < x < 5$"], 0,
                        "$-5 < 2x - 7 < 5 \\Rightarrow 2 < 2x < 12 \\Rightarrow 1 < x < 6$."
                    ),
                    make_q(
                        "Solve the two-modulus equation $|x + 2| = |2x - 5|$.",
                        ["$x = 7$ and $x = 1$", "$x = 7$ and $x = -1$", "$x = 3$ and $x = -3$", "$x = \\frac{7}{3}$ only"], 0,
                        "$(x+2)^2 = (2x-5)^2 \\Rightarrow x^2 + 4x + 4 = 4x^2 - 20x + 25 \\Rightarrow 3x^2 - 24x + 21 = 0 \\Rightarrow x = 7 \\text{ or } x = 1$."
                    )
                ]
            },
            {
                "heading": "Section 3: Quadratic Discriminant and Line-Parabola Intersections",
                "questions": [
                    make_q(
                        "Find the set of values of $k$ for which the quadratic equation $x^2 + (k+2)x + (2k+1) = 0$ has two distinct real roots.",
                        ["$k < 0$ or $k > 4$", "$0 < k < 4$", "$k \\leq 0$ or $k \\geq 4$", "$-4 < k < 0$"], 0,
                        "$\\Delta = (k+2)^2 - 4(1)(2k+1) = k^2 - 4k = k(k-4) > 0 \\Rightarrow k < 0$ or $k > 4$."
                    ),
                    make_q(
                        "The line $y = 2x + c$ is tangent to the parabola $y = x^2 - 4x + 7$. Determine the exact value of the constant $c$.",
                        ["$c = -2$", "$c = 2$", "$c = -7$", "$c = 3$"], 0,
                        "$x^2 - 4x + 7 = 2x + c \\Rightarrow x^2 - 6x + (7-c) = 0$. Tangency requires $\\Delta = 36 - 4(7-c) = 8 + 4c = 0 \\Rightarrow c = -2$."
                    ),
                    make_q(
                        "Find the range of values of $m$ for which the line $y = mx - 1$ does not intersect the curve $y = 2x^2 + 3x + 1$.",
                        ["$-1 < m < 7$", "$m < -1$ or $m > 7$", "$-7 < m < 1$", "$m < 3$ or $m > 5$"], 0,
                        "$2x^2 + (3-m)x + 2 = 0$. $\\Delta = (3-m)^2 - 16 = (m+1)(m-7) < 0 \\Rightarrow -1 < m < 7$."
                    )
                ]
            },
            {
                "heading": "Section 4: Completing the Square and Applied Optimization",
                "questions": [
                    make_q(
                        "By completing the square, express $f(x) = 2x^2 - 12x + 23$ in the form $a(x-h)^2 + k$, and state the minimum value of $f(x)$.",
                        ["$2(x-3)^2 + 5$, minimum value $5$", "$2(x-3)^2 + 23$, minimum value $23$", "$2(x-6)^2 - 13$, minimum value $-13$", "$(2x-6)^2 + 5$, minimum value $5$"], 0,
                        "$2(x^2 - 6x) + 23 = 2[(x-3)^2 - 9] + 23 = 2(x-3)^2 + 5$. Minimum value is $5$ at $x = 3$."
                    ),
                    make_q(
                        "A rectangular field has three sides fenced with $80 \\text{ m}$ of fencing against a river. Find the maximum possible area.",
                        ["$800 \\text{ m}^2$", "$400 \\text{ m}^2$", "$1600 \\text{ m}^2$", "$600 \\text{ m}^2$"], 0,
                        "$A(x) = x(80 - 2x) = -2x^2 + 80x$. Vertex $x = 20 \\text{ m}$. Area $= 20(40) = 800 \\text{ m}^2$."
                    ),
                    make_q(
                        "Find all real solutions to the biquadratic equation $x^4 - 10x^2 + 9 = 0$.",
                        ["$x = \\pm 1$ and $x = \\pm 3$", "$x = 1$ and $x = 9$", "$x = \\pm 1$ only", "$x = \\pm \\sqrt{10}$"], 0,
                        "Let $u = x^2$: $(u-1)(u-9) = 0 \\Rightarrow u = 1$ or $u = 9 \\Rightarrow x = \\pm 1, \\pm 3$."
                    )
                ]
            }
        ]
    },

    # --------------------------------------------------------------------------
    # ADDMATH 2.01: Simultaneous Equations and Inequalities
    # --------------------------------------------------------------------------
    {
        "track": "addmath",
        "num": "2.01",
        "slug": "simultaneous-equations-and-inequalities",
        "title": "Simultaneous Equations and Inequalities",
        "sections": [
            {
                "heading": "Section 1: Linear-Quadratic Simultaneous Systems",
                "questions": [
                    make_q(
                        "Solve the simultaneous system $y - 2x = 3$ and $x^2 + y^2 = 26$ for the positive solution pair $(x, y)$.",
                        ["$(1, 5)$", "$(2, 7)$", "$(3, 9)$", "$(4, 11)$"], 0,
                        "Substitute $y = 2x+3$: $x^2 + (2x+3)^2 = 26 \\Rightarrow 5x^2 + 12x - 17 = 0 \\Rightarrow (5x+17)(x-1) = 0 \\Rightarrow x = 1, y = 5$."
                    ),
                    make_q(
                        "Find the two points of intersection of the line $2x + y = 7$ and the rectangular hyperbola $xy = 6$.",
                        ["$(2, 3)$ and $\\left(\\frac{3}{2}, 4\\right)$", "$(1, 5)$ and $(3, 1)$", "$(2, 3)$ and $(3, 2)$", "$(4, -1)$ and $(1, 6)$"], 0,
                        "$x(7 - 2x) = 6 \\Rightarrow 2x^2 - 7x + 6 = 0 \\Rightarrow (2x-3)(x-2) = 0 \\Rightarrow (2, 3)$ and $(3/2, 4)$."
                    ),
                    make_q(
                        "Determine the value of $k$ for which the line $x + y = k$ is tangent to the curve $y = \\frac{4}{x}$.",
                        ["$k = \\pm 4$", "$k = 4$ only", "$k = \\pm 2$", "$k = 8$"], 0,
                        "$x(k - x) = 4 \\Rightarrow x^2 - kx + 4 = 0$. $\\Delta = k^2 - 16 = 0 \\Rightarrow k = \\pm 4$."
                    )
                ]
            },
            {
                "heading": "Section 2: Quadratic Inequalities in One Variable",
                "questions": [
                    make_q(
                        "Find the set of values of $x$ satisfying the quadratic inequality $2x^2 - 5x - 3 \\geq 0$.",
                        ["$x \\leq -\\frac{1}{2}$ or $x \\geq 3$", "$-\\frac{1}{2} \\leq x \\leq 3$", "$x < -1$ or $x > 3$", "$x \\geq 3$ only"], 0,
                        "$(2x+1)(x-3) \\geq 0$. Parabola opens upward: $x \\leq -1/2$ or $x \\geq 3$."
                    ),
                    make_q(
                        "Solve the strict quadratic inequality $x(x + 4) < 12$.",
                        ["$-6 < x < 2$", "$x < -6$ or $x > 2$", "$-2 < x < 6$", "$0 < x < 3$"], 0,
                        "$x^2 + 4x - 12 < 0 \\Rightarrow (x+6)(x-2) < 0 \\Rightarrow -6 < x < 2$."
                    ),
                    make_q(
                        "Find the range of values of $x$ for which the expression $9 - x^2$ is strictly positive.",
                        ["$-3 < x < 3$", "$x < -3$ or $x > 3$", "$x < 3$", "$0 < x < 9$"], 0,
                        "$9 - x^2 > 0 \\Leftrightarrow x^2 < 9 \\Leftrightarrow -3 < x < 3$."
                    )
                ]
            },
            {
                "heading": "Section 3: Rational Inequalities and Sign Analysis",
                "questions": [
                    make_q(
                        "Solve the rational inequality $\\frac{x - 2}{x + 3} \\leq 0$.",
                        ["$-3 < x \\leq 2$", "$-3 \\leq x \\leq 2$", "$x < -3$ or $x \\geq 2$", "$x \\leq 2$"], 0,
                        "Sign changes at $x = -3$ and $x = 2$. Denominator cannot be 0, so $x \\in (-3, 2]$."
                    ),
                    make_q(
                        "Find the complete solution set for the inequality $\\frac{2x + 1}{x - 1} > 1$.",
                        ["$x < -2$ or $x > 1$", "$-2 < x < 1$", "$x > 1$ only", "$x > -2$"], 0,
                        "$\\frac{2x+1-(x-1)}{x-1} = \\frac{x+2}{x-1} > 0 \\Rightarrow x < -2$ or $x > 1$."
                    ),
                    make_q(
                        "Solve the inequality $\\frac{1}{x} < 2$ for all non-zero real $x$.",
                        ["$x < 0$ or $x > \\frac{1}{2}$", "$0 < x < \\frac{1}{2}$", "$x > \\frac{1}{2}$ only", "$x < \\frac{1}{2}$"], 0,
                        "Multiply by $x^2 > 0$: $x < 2x^2 \\Rightarrow x(2x - 1) > 0 \\Rightarrow x < 0$ or $x > 1/2$."
                    )
                ]
            },
            {
                "heading": "Section 4: Systems with Modulus and Geometric Applications",
                "questions": [
                    make_q(
                        "Find the values of $x$ satisfying the simultaneous conditions $|x - 3| \\leq 4$ and $x^2 - 4x > 0$.",
                        ["$-1 \\leq x < 0$ or $4 < x \\leq 7$", "$-1 \\leq x \\leq 7$", "$0 < x < 4$", "$4 < x \\leq 7$ only"], 0,
                        "$|x-3| \\leq 4 \\Rightarrow [-1, 7]$. $x(x-4) > 0 \\Rightarrow x < 0$ or $x > 4$. Intersection: $[-1, 0) \\cup (4, 7]$."
                    ),
                    make_q(
                        "The perimeter of a right-angled triangle is $30 \\text{ cm}$ and its hypotenuse is $13 \\text{ cm}$. Find the lengths of the two legs.",
                        ["$5 \\text{ cm}$ and $12 \\text{ cm}$", "$6 \\text{ cm}$ and $11 \\text{ cm}$", "$7 \\text{ cm}$ and $10 \\text{ cm}$", "$8 \\text{ cm}$ and $9 \\text{ cm}$"], 0,
                        "$a+b = 17$, $a^2+b^2 = 169 \\Rightarrow 2ab = 17^2 - 169 = 120 \\Rightarrow ab = 60$. Legs are $5$ and $12$."
                    ),
                    make_q(
                        "Find the range of values of $x$ where the line $y = 3x - 2$ lies entirely above the parabola $y = x^2 - 2x + 4$.",
                        ["$2 < x < 3$", "$x < 2$ or $x > 3$", "$-3 < x < -2$", "No such interval exists"], 0,
                        "$3x - 2 > x^2 - 2x + 4 \\Rightarrow x^2 - 5x + 6 < 0 \\Rightarrow (x-2)(x-3) < 0 \\Rightarrow 2 < x < 3$."
                    )
                ]
            }
        ]
    },

    # --------------------------------------------------------------------------
    # ADDMATH 3.01: Indices, Surds and Polynomials
    # --------------------------------------------------------------------------
    {
        "track": "addmath",
        "num": "3.01",
        "slug": "indices-surds-and-polynomials",
        "title": "Indices, Surds and Polynomials",
        "sections": [
            {
                "heading": "Section 1: Fractional Indices and Exponential Equations",
                "questions": [
                    make_q(
                        "Evaluate the exact numerical value of $16^{-\\frac{3}{4}} \\times 27^{\\frac{2}{3}}$.",
                        ["$\\frac{9}{8}$", "$\\frac{8}{9}$", "$\\frac{3}{4}$", "$\\frac{27}{16}$"], 0,
                        "$16^{-3/4} = (16^{1/4})^{-3} = 2^{-3} = 1/8$. $27^{2/3} = (27^{1/3})^2 = 3^2 = 9$. Product $= 9/8$."
                    ),
                    make_q(
                        "Solve the exponential equation $2^{2x+1} - 9(2^x) + 4 = 0$ for all real $x$.",
                        ["$x = -1$ and $x = 2$", "$x = 1$ and $x = 4$", "$x = 0$ and $x = 2$", "$x = -2$ and $x = 1$"], 0,
                        "Let $u = 2^x$: $2u^2 - 9u + 4 = 0 \\Rightarrow (2u-1)(u-4) = 0 \\Rightarrow u = 1/2 \\Rightarrow x = -1$, or $u = 4 \\Rightarrow x = 2$."
                    ),
                    make_q(
                        "Simplify the index expression $\\frac{(4x^3 y^{-2})^{\\frac{1}{2}}}{2x^{-1} y^3}$.",
                        ["$x^{\\frac{5}{2}} y^{-4}$", "$2x^{\\frac{5}{2}} y^{-4}$", "$x^2 y^{-4}$", "$x^{\\frac{5}{2}} y^2$"], 0,
                        "Numerator: $2 x^{3/2} y^{-1}$. Divide by $2 x^{-1} y^3$: $x^{3/2 - (-1)} y^{-1 - 3} = x^{5/2} y^{-4}$."
                    )
                ]
            },
            {
                "heading": "Section 2: Surds and Rationalising Denominators",
                "questions": [
                    make_q(
                        "Rationalise the denominator and simplify $\\frac{4 + \\sqrt{3}}{2 - \\sqrt{3}}$ into the form $a + b\\sqrt{3}$.",
                        ["$11 + 6\\sqrt{3}$", "$5 + 6\\sqrt{3}$", "$11 - 6\\sqrt{3}$", "$7 + 4\\sqrt{3}$"], 0,
                        "Multiply top and bottom by $2 + \\sqrt{3}$: $\\frac{(4+\\sqrt{3})(2+\\sqrt{3})}{4-3} = 8 + 4\\sqrt{3} + 2\\sqrt{3} + 3 = 11 + 6\\sqrt{3}$."
                    ),
                    make_q(
                        "Express $(3 - 2\\sqrt{5})^2$ in the simplified form $p + q\\sqrt{5}$.",
                        ["$29 - 12\\sqrt{5}$", "$29 + 12\\sqrt{5}$", "$11 - 12\\sqrt{5}$", "$19 - 6\\sqrt{5}$"], 0,
                        "$3^2 - 2(3)(2\\sqrt{5}) + (2\\sqrt{5})^2 = 9 - 12\\sqrt{5} + 20 = 29 - 12\\sqrt{5}$."
                    ),
                    make_q(
                        "Solve the radical equation $\\sqrt{2x + 7} - x = 2$ for all valid real solutions.",
                        ["$x = 1$ only", "$x = 1$ and $x = -3$", "$x = 3$ only", "No real solutions"], 0,
                        "$\\sqrt{2x+7} = x + 2 \\Rightarrow 2x + 7 = x^2 + 4x + 4 \\Rightarrow x^2 + 2x - 3 = 0 \\Rightarrow (x-1)(x+3) = 0$. $x = 1$ works; $x = -3$ gives $\\sqrt{1} - (-3) = 4 \\neq 2$."
                    )
                ]
            },
            {
                "heading": "Section 3: Remainder and Factor Theorems",
                "questions": [
                    make_q(
                        "When $P(x) = 2x^3 + ax^2 - 5x + 6$ is divided by $(x - 2)$, the remainder is $16$. Find the value of $a$.",
                        ["$a = 1$", "$a = -2$", "$a = 3$", "$a = 4$"], 0,
                        "$P(2) = 2(8) + a(4) - 5(2) + 6 = 16 + 4a - 10 + 6 = 4a + 12 = 16 \\Rightarrow 4a = 4 \\Rightarrow a = 1$."
                    ),
                    make_q(
                        "Given that $(2x - 1)$ is a factor of $f(x) = 2x^3 + 3x^2 - 8x + c$, find the constant $c$.",
                        ["$c = 3$", "$c = -3$", "$c = 6$", "$c = -2$"], 0,
                        "$f(1/2) = 2(1/8) + 3(1/4) - 8(1/2) + c = 1/4 + 3/4 - 4 + c = 1 - 4 + c = -3 + c = 0 \\Rightarrow c = 3$."
                    ),
                    make_q(
                        "Factorise completely the cubic polynomial $g(x) = x^3 - 4x^2 - 7x + 10$.",
                        ["$(x - 1)(x + 2)(x - 5)$", "$(x + 1)(x - 2)(x + 5)$", "$(x - 1)(x - 2)(x - 5)$", "$(x + 1)(x + 2)(x - 5)$"], 0,
                        "$g(1) = 1 - 4 - 7 + 10 = 0 \\Rightarrow (x-1)$ is a factor. Dividing gives $x^2 - 3x - 10 = (x+2)(x-5)$."
                    )
                ]
            },
            {
                "heading": "Section 4: The Binomial Theorem",
                "questions": [
                    make_q(
                        "Find the coefficient of $x^3$ in the binomial expansion of $(1 + 2x)^6$.",
                        ["$160$", "$80$", "$240$", "$120$"], 0,
                        "Term is $\\binom{6}{3}(1)^3 (2x)^3 = 20(8x^3) = 160x^3$. Coefficient is $160$."
                    ),
                    make_q(
                        "Find the term independent of $x$ (the constant term) in the expansion of $\\left(x^2 + \\frac{2}{x}\\right)^6$.",
                        ["$240$", "$160$", "$60$", "$192$"], 0,
                        "General term: $\\binom{6}{r}(x^2)^{6-r}(2/x)^r = \\binom{6}{r} 2^r x^{12-3r}$. Constant when $12 - 3r = 0 \\Rightarrow r = 4$. Term: $\\binom{6}{4} 2^4 = 15(16) = 240$."
                    ),
                    make_q(
                        "In the expansion of $(1 + ax)^5 (1 - x)$, the coefficient of $x$ is $9$. Find the value of $a$.",
                        ["$a = 2$", "$a = 1$", "$a = 3$", "$a = -2$"], 0,
                        "$(1 + 5ax + \\dots)(1 - x) = 1 + (5a - 1)x + \\dots$. Given $5a - 1 = 9 \\Rightarrow 5a = 10 \\Rightarrow a = 2$."
                    )
                ]
            }
        ]
    },

    # --------------------------------------------------------------------------
    # ADDMATH 4.01: Logarithmic and Exponential Functions
    # --------------------------------------------------------------------------
    {
        "track": "addmath",
        "num": "4.01",
        "slug": "logarithmic-and-exponential-functions",
        "title": "Logarithmic and Exponential Functions",
        "sections": [
            {
                "heading": "Section 1: Fundamental Laws of Logarithms",
                "questions": [
                    make_q(
                        "Evaluate $\\log_3(54) - \\log_3(2)$ without a calculator.",
                        ["$3$", "$2$", "$4$", "$\\log_3(52)$"], 0,
                        "$\\log_3(54/2) = \\log_3(27) = 3$ since $3^3 = 27$."
                    ),
                    make_q(
                        "Express $2\\log_a(x) - 3\\log_a(y) + \\log_a(z)$ as a single logarithm.",
                        ["$\\log_a\\left(\\frac{x^2 z}{y^3}\\right)$", "$\\log_a\\left(\\frac{2xz}{3y}\\right)$", "$\\log_a(x^2 - y^3 + z)$", "$\\log_a\\left(\\frac{x^2}{y^3 z}\\right)$"], 0,
                        "Power law: $\\log_a(x^2) - \\log_a(y^3) + \\log_a(z) = \\log_a\\left(\\frac{x^2 z}{y^3}\\right)$."
                    ),
                    make_q(
                        "Given $\\log_b(2) = p$ and $\\log_b(3) = q$, express $\\log_b(72)$ in terms of $p$ and $q$.",
                        ["$3p + 2q$", "$2p + 3q$", "$6pq$", "$3p - 2q$"], 0,
                        "$72 = 2^3 \\times 3^2 \\Rightarrow \\log_b(72) = 3\\log_b(2) + 2\\log_b(3) = 3p + 2q$."
                    )
                ]
            },
            {
                "heading": "Section 2: Solving Logarithmic Equations",
                "questions": [
                    make_q(
                        "Solve the equation $\\log_2(x) + \\log_2(x - 2) = 3$ for $x > 2$.",
                        ["$x = 4$", "$x = 4$ and $x = -2$", "$x = 3$", "$x = 8$"], 0,
                        "$\\log_2(x(x-2)) = 3 \\Rightarrow x^2 - 2x = 2^3 = 8 \\Rightarrow x^2 - 2x - 8 = 0 \\Rightarrow (x-4)(x+2) = 0$. Since $x > 2$, $x = 4$."
                    ),
                    make_q(
                        "Solve $\\log_3(2x + 1) - \\log_3(x - 1) = 2$.",
                        ["$x = \\frac{10}{7}$", "$x = 2$", "$x = \\frac{7}{10}$", "No real solution"], 0,
                        "$\\log_3\\left(\\frac{2x+1}{x-1}\\right) = 2 \\Rightarrow \\frac{2x+1}{x-1} = 9 \\Rightarrow 2x+1 = 9x-9 \\Rightarrow 7x = 10 \\Rightarrow x = 10/7$."
                    ),
                    make_q(
                        "Solve the base-change logarithmic equation $\\log_4(x) + \\log_2(x) = 6$.",
                        ["$x = 16$", "$x = 8$", "$x = 64$", "$x = 4$"], 0,
                        "$\\log_4(x) = \\frac{\\log_2(x)}{\\log_2(4)} = \\frac{1}{2}\\log_2(x)$. Thus $\\frac{3}{2}\\log_2(x) = 6 \\Rightarrow \\log_2(x) = 4 \\Rightarrow x = 2^4 = 16$."
                    )
                ]
            },
            {
                "heading": "Section 3: Exponential Equations and Growth Models",
                "questions": [
                    make_q(
                        "Solve $3^{2x-1} = 5^x$, giving $x$ in terms of natural logarithms.",
                        ["$x = \\frac{\\ln 3}{2\\ln 3 - \\ln 5}$", "$x = \\frac{\\ln 5}{\\ln 3}$", "$x = \\frac{\\ln 3}{\\ln 5 - 2\\ln 3}$", "$x = \\frac{2\\ln 3}{\\ln 5}$"], 0,
                        "Take $\\ln$: $(2x-1)\\ln 3 = x\\ln 5 \\Rightarrow 2x\\ln 3 - \\ln 3 = x\\ln 5 \\Rightarrow x(2\\ln 3 - \\ln 5) = \\ln 3 \\Rightarrow x = \\frac{\\ln 3}{2\\ln 3 - \\ln 5}$."
                    ),
                    make_q(
                        "A bacterial culture grows according to $N(t) = 500 e^{0.04 t}$, where $t$ is in hours. After how many hours will the population reach $2000$?",
                        ["$t = 25\\ln 4 \\approx 34.7 \\text{ hr}$", "$t = 50 \\text{ hr}$", "$t = 20\\ln 2 \\approx 13.9 \\text{ hr}$", "$t = 100 \\text{ hr}$"], 0,
                        "$500 e^{0.04 t} = 2000 \\Rightarrow e^{0.04 t} = 4 \\Rightarrow 0.04 t = \\ln 4 \\Rightarrow t = \\frac{\\ln 4}{0.04} = 25\\ln 4$."
                    ),
                    make_q(
                        "Solve the simultaneous exponential system $2^x 4^y = 32$ and $3^{x-y} = 27$.",
                        ["$x = 4, y = \\frac{1}{2}$", "$x = 3, y = 1$", "$x = 5, y = 2$", "$x = 2, y = 1$"], 0,
                        "$2^{x+2y} = 2^5 \\Rightarrow x + 2y = 5$. Also $3^{x-y} = 3^3 \\Rightarrow x - y = 3$. Subtracting gives $3y = 2 \\Rightarrow y = 1/2, x = 4$."
                    )
                ]
            },
            {
                "heading": "Section 4: Reduction to Linear Form ($Y = mX + c$)",
                "questions": [
                    make_q(
                        "The variables $x$ and $y$ are related by $y = a x^b$. When $\\ln y$ is plotted against $\\ln x$, a straight line passes through $(0, 2)$ with slope $3$. Find $a$ and $b$.",
                        ["$a = e^2, \\quad b = 3$", "$a = 2, \\quad b = 3$", "$a = 3, \\quad b = 2$", "$a = e^3, \\quad b = e^2$"], 0,
                        "$\\ln y = \\ln a + b\\ln x$. Slope $m = b = 3$. Intercept $c = \\ln a = 2 \\Rightarrow a = e^2$."
                    ),
                    make_q(
                        "The relation $y = A b^x$ is linearized by plotting $\\lg y$ against $x$. If the straight line has $y$-intercept $1$ and gradient $0.3$, find $A$ and $b$.",
                        ["$A = 10, \\quad b = 10^{0.3}$", "$A = 1, \\quad b = 0.3$", "$A = 10^{0.3}, \\quad b = 10$", "$A = 0.3, \\quad b = 10$"], 0,
                        "$\\lg y = \\lg A + x\\lg b$. Intercept $\\lg A = 1 \\Rightarrow A = 10$. Gradient $\\lg b = 0.3 \\Rightarrow b = 10^{0.3}$."
                    ),
                    make_q(
                        "If a graph of $xy$ against $x^2$ is a straight line with slope $4$ and vertical intercept $-5$, express $y$ in terms of $x$.",
                        ["$y = 4x - \\frac{5}{x}$", "$y = 4x^2 - 5$", "$y = 4 - \\frac{5}{x^2}$", "$y = \\frac{4}{x} - 5$"], 0,
                        "$xy = 4(x^2) - 5 \\Rightarrow y = 4x - \\frac{5}{x}$."
                    )
                ]
            }
        ]
    },

    # --------------------------------------------------------------------------
    # ADDMATH 5.01: Trigonometric Functions and Circular Measure
    # --------------------------------------------------------------------------
    {
        "track": "addmath",
        "num": "5.01",
        "slug": "trigonometric-functions-and-circular-measure",
        "title": "Trigonometric Functions and Circular Measure",
        "sections": [
            {
                "heading": "Section 1: Radian Measure, Arc Length and Sectors",
                "questions": [
                    make_q(
                        "A circle of radius $8 \\text{ cm}$ has a central sector with angle $\\theta = \\frac{3\\pi}{4} \\text{ rad}$. Find the exact arc length of the sector.",
                        ["$6\\pi \\text{ cm}$", "$12\\pi \\text{ cm}$", "$4\\pi \\text{ cm}$", "$24\\pi \\text{ cm}$"], 0,
                        "Arc length $s = r\\theta = 8\\left(\\frac{3\\pi}{4}\\right) = 6\\pi \\text{ cm}$."
                    ),
                    make_q(
                        "Find the area of a sector of radius $6 \\text{ cm}$ having perimeter $22 \\text{ cm}$.",
                        ["$30 \\text{ cm}^2$", "$36 \\text{ cm}^2$", "$24 \\text{ cm}^2$", "$18 \\text{ cm}^2$"], 0,
                        "Perimeter $= 2r + s = 12 + s = 22 \\Rightarrow s = 10 \\text{ cm}$. Area $= \\frac{1}{2}rs = \\frac{1}{2}(6)(10) = 30 \\text{ cm}^2$."
                    ),
                    make_q(
                        "A chord of length $10 \\text{ cm}$ subtends an angle of $2\\theta$ at the center of a circle of radius $13 \\text{ cm}$. Find $\\sin\\theta$.",
                        ["$\\frac{5}{13}$", "$\\frac{12}{13}$", "$\\frac{10}{13}$", "$\\frac{5}{12}$"], 0,
                        "The chord is bisected: half-chord $= 5 \\text{ cm}$. In the right triangle, $\\sin\\theta = \\frac{5}{13}$."
                    )
                ]
            },
            {
                "heading": "Section 2: Trigonometric Identities and Ratios",
                "questions": [
                    make_q(
                        "Simplify the trigonometric expression $\\frac{\\sin\\theta}{\\cos\\theta} + \\frac{\\cos\\theta}{\\sin\\theta}$.",
                        ["$\\sec\\theta \\csc\\theta$", "$\\tan\\theta$", "$1$", "$\\sec^2\\theta$"], 0,
                        "$\\frac{\\sin^2\\theta + \\cos^2\\theta}{\\sin\\theta\\cos\\theta} = \\frac{1}{\\sin\\theta\\cos\\theta} = \\csc\\theta\\sec\\theta$."
                    ),
                    make_q(
                        "Given that $\\tan\\theta = -\\frac{3}{4}$ and $\\theta$ lies in the second quadrant, find the value of $\\cos\\theta$.",
                        ["$-\\frac{4}{5}$", "$\\frac{4}{5}$", "$-\\frac{3}{5}$", "$\\frac{3}{5}$"], 0,
                        "In quadrant 2, cosine is negative. With opposite 3 and adjacent 4, hypotenuse is 5: $\\cos\\theta = -4/5$."
                    ),
                    make_q(
                        "Prove the identity $\\sec^2\\theta - \\tan^2\\theta = 1$. Which of the following equals $(\\sec\\theta - \\tan\\theta)(\\sec\\theta + \\tan\\theta)$?",
                        ["$1$", "$\\sec^2\\theta$", "$2\\tan^2\\theta$", "$0$"], 0,
                        "Difference of squares: $\\sec^2\\theta - \\tan^2\\theta = 1 + \\tan^2\\theta - \\tan^2\\theta = 1$."
                    )
                ]
            },
            {
                "heading": "Section 3: Solving Trigonometric Equations",
                "questions": [
                    make_q(
                        "Solve $2\\cos(2x) = 1$ for $0 \\leq x \\leq \\pi$.",
                        ["$x = \\frac{\\pi}{6}$ and $x = \\frac{5\\pi}{6}$", "$x = \\frac{\\pi}{3}$ and $x = \\frac{2\\pi}{3}$", "$x = \\frac{\\pi}{6}$ only", "$x = \\frac{\\pi}{4}$ and $x = \\frac{3\\pi}{4}$"], 0,
                        "$\\cos(2x) = 1/2 \\Rightarrow 2x = \\pi/3, 5\\pi/3 \\Rightarrow x = \\pi/6, 5\\pi/6$."
                    ),
                    make_q(
                        "Find all solutions of $3\\sin x = 2\\cos^2 x$ in the interval $0^\\circ \\leq x \\leq 360^\\circ$.",
                        ["$30^\\circ$ and $150^\\circ$", "$30^\\circ$ and $210^\\circ$", "$60^\\circ$ and $120^\\circ$", "$45^\\circ$ and $135^\\circ$"], 0,
                        "$3\\sin x = 2(1 - \\sin^2 x) \\Rightarrow 2\\sin^2 x + 3\\sin x - 2 = 0 \\Rightarrow (2\\sin x - 1)(\\sin x + 2) = 0 \\Rightarrow \\sin x = 1/2 \\Rightarrow x = 30^\\circ, 150^\\circ$."
                    ),
                    make_q(
                        "Solve the equation $\\tan(x + 45^\\circ) = 1$ for $0^\\circ \\leq x \\leq 360^\\circ$.",
                        ["$x = 0^\\circ, 180^\\circ, 360^\\circ$", "$x = 45^\\circ, 225^\\circ$", "$x = 90^\\circ, 270^\\circ$", "$x = 0^\\circ$ only"], 0,
                        "$x + 45^\\circ = 45^\\circ, 225^\\circ, 405^\\circ \\Rightarrow x = 0^\\circ, 180^\\circ, 360^\\circ$."
                    )
                ]
            },
            {
                "heading": "Section 4: Double Angle Formulae and Graph Amplitude",
                "questions": [
                    make_q(
                        "If $\\sin\\theta = \\frac{3}{5}$ and $\\theta$ is acute, find the exact value of $\\sin(2\\theta)$.",
                        ["$\\frac{24}{25}$", "$\\frac{12}{25}$", "$\\frac{7}{25}$", "$\\frac{6}{5}$"], 0,
                        "$\\cos\\theta = 4/5$. $\\sin(2\\theta) = 2\\sin\\theta\\cos\\theta = 2(3/5)(4/5) = 24/25$."
                    ),
                    make_q(
                        "State the amplitude and period of the function $y = 3\\sin(4x) - 2$.",
                        ["Amplitude $= 3$, Period $= \\frac{\\pi}{2}$", "Amplitude $= 3$, Period $= \\frac{\\pi}{4}$", "Amplitude $= 1$, Period $= 2\\pi$", "Amplitude $= 4$, Period $= \\frac{\\pi}{2}$"], 0,
                        "Amplitude is $|a| = 3$. Period is $2\\pi / b = 2\\pi / 4 = \\pi / 2$."
                    ),
                    make_q(
                        "Express $\\cos(2\\theta)$ purely in terms of $\\sin\\theta$.",
                        ["$1 - 2\\sin^2\\theta$", "$2\\sin^2\\theta - 1$", "$1 - \\sin^2\\theta$", "$\\sin^2\\theta - 1$"], 0,
                        "$\\cos(2\\theta) = \\cos^2\\theta - \\sin^2\\theta = (1 - \\sin^2\\theta) - \\sin^2\\theta = 1 - 2\\sin^2\\theta$."
                    )
                ]
            }
        ]
    },

    # --------------------------------------------------------------------------
    # ADDMATH 6.01: Permutations and Combinations
    # --------------------------------------------------------------------------
    {
        "track": "addmath",
        "num": "6.01",
        "slug": "permutations-and-combinations",
        "title": "Permutations and Combinations",
        "sections": [
            {
                "heading": "Section 1: Fundamental Counting and Linear Permutations",
                "questions": [
                    make_q(
                        "In how many ways can $5$ different books be arranged on a shelf?",
                        ["$120$", "$24$", "$60$", "$720$"], 0,
                        "$5! = 5 \\times 4 \\times 3 \\times 2 \\times 1 = 120$."
                    ),
                    make_q(
                        "Evaluate the number of permutations of $7$ distinct items taken $3$ at a time, ${}^7 P_3$.",
                        ["$210$", "$35$", "$42$", "$840$"], 0,
                        "${}^7 P_3 = \\frac{7!}{(7-3)!} = 7 \\times 6 \\times 5 = 210$."
                    ),
                    make_q(
                        "How many $4$-digit even numbers can be formed using digits $\\{1, 2, 3, 5, 7, 8\\}$ without repetition?",
                        ["$120$", "$60$", "$240$", "$180$"], 0,
                        "Last digit must be 2 or 8 ($2$ choices). First three digits from remaining 5 digits: ${}^5 P_3 = 60$. Total $= 60 \\times 2 = 120$."
                    )
                ]
            },
            {
                "heading": "Section 2: Permutations with Repetitions and Identical Items",
                "questions": [
                    make_q(
                        "Find the number of distinct permutations of all the letters in the word $\\text{PARALLEL}$.",
                        ["$3360$", "$6720$", "$1680$", "$40320$"], 0,
                        "8 letters total: 3 L's, 2 A's, 1 P, 1 R, 1 E. Total $= \\frac{8!}{3! 2!} = \\frac{40320}{12} = 3360$."
                    ),
                    make_q(
                        "How many 6-letter arrangements of $\\text{PEPPER}$ begin with the letter $\\text{P}$?",
                        ["$30$", "$60$", "$20$", "$120$"], 0,
                        "Fix one P first. Remaining 5 letters: 2 P's, 2 E's, 1 R. Arrangements $= \\frac{5!}{2! 2!} = \\frac{120}{4} = 30$."
                    ),
                    make_q(
                        "How many 5-digit codes can be formed from digits $\\{3, 3, 3, 7, 7\\}$?",
                        ["$10$", "$20$", "$5$", "$120$"], 0,
                        "$\\frac{5!}{3! 2!} = \\frac{120}{6 \\times 2} = 10$."
                    )
                ]
            },
            {
                "heading": "Section 3: Combinations and Committee Selections",
                "questions": [
                    make_q(
                        "A committee of $4$ is to be chosen from $9$ people. How many distinct committees can be formed?",
                        ["$126$", "$3024$", "$84$", "$252$"], 0,
                        "${}^9 C_4 = \\frac{9 \\times 8 \\times 7 \\times 6}{4 \\times 3 \\times 2 \\times 1} = 126$."
                    ),
                    make_q(
                        "A team of $5$ is selected from $6$ boys and $4$ girls. How many teams contain exactly $3$ boys and $2$ girls?",
                        ["$120$", "$60$", "$210$", "$100$"], 0,
                        "Choose boys: $\\binom{6}{3} = 20$. Choose girls: $\\binom{4}{2} = 6$. Total $= 20 \\times 6 = 120$."
                    ),
                    make_q(
                        "From $10$ points on a plane where no three are collinear, how many distinct triangles can be drawn?",
                        ["$120$", "$720$", "$90$", "$45$"], 0,
                        "${}^{10} C_3 = \\frac{10 \\times 9 \\times 8}{3 \\times 2 \\times 1} = 120$."
                    )
                ]
            },
            {
                "heading": "Section 4: Restricted Arrangements and Separations",
                "questions": [
                    make_q(
                        "In how many ways can $4$ boys and $3$ girls sit in a row if all $3$ girls must sit together?",
                        ["$720$", "$5040$", "$144$", "$288$"], 0,
                        "Treat 3 girls as 1 block. Total units: 4 boys + 1 block = 5 units ($5! = 120$). Girls within block: $3! = 6$. Total $= 120 \\times 6 = 720$."
                    ),
                    make_q(
                        "In how many ways can $5$ people sit around a circular dinner table?",
                        ["$24$", "$120$", "$60$", "$12$"], 0,
                        "Circular permutations: $(n-1)! = (5-1)! = 4! = 24$."
                    ),
                    make_q(
                        "A committee of $4$ is selected from $5$ men and $5$ women. How many committees contain at least one woman?",
                        ["$205$", "$210$", "$195$", "$150$"], 0,
                        "Total selections $= \\binom{10}{4} = 210$. All-men selections $= \\binom{5}{4} = 5$. At least one woman $= 210 - 5 = 205$."
                    )
                ]
            }
        ]
    },

    # --------------------------------------------------------------------------
    # ADDMATH 7.01: Differentiation and Rates of Change
    # --------------------------------------------------------------------------
    {
        "track": "addmath",
        "num": "7.01",
        "slug": "differentiation-and-rates-of-change",
        "title": "Differentiation and Rates of Change",
        "sections": [
            {
                "heading": "Section 1: Product and Quotient Rules",
                "questions": [
                    make_q(
                        "Differentiate $y = x^2 e^{3x}$ with respect to $x$.",
                        ["$x e^{3x}(3x + 2)$", "$2x e^{3x}$", "$3x^2 e^{3x}$", "$x^2 e^{3x} + 2x$"], 0,
                        "Product rule: $y' = (2x)(e^{3x}) + (x^2)(3e^{3x}) = x e^{3x}(2 + 3x)$."
                    ),
                    make_q(
                        "Find $\\frac{dy}{dx}$ for $y = \\frac{2x - 1}{x + 4}$.",
                        ["$\\frac{9}{(x + 4)^2}$", "$\\frac{2}{(x + 4)^2}$", "$\\frac{7}{(x + 4)^2}$", "$\\frac{2x + 9}{(x + 4)^2}$"], 0,
                        "Quotient rule: $\\frac{2(x+4) - (2x-1)(1)}{(x+4)^2} = \\frac{2x + 8 - 2x + 1}{(x+4)^2} = \\frac{9}{(x+4)^2}$."
                    ),
                    make_q(
                        "Find the derivative of $f(x) = x \\ln x$ evaluated at $x = e$.",
                        ["$2$", "$1$", "$e$", "$0$"], 0,
                        "$f'(x) = 1\\cdot \\ln x + x\\cdot\\frac{1}{x} = \\ln x + 1$. At $x = e$: $f'(e) = \\ln e + 1 = 1 + 1 = 2$."
                    )
                ]
            },
            {
                "heading": "Section 2: Chain Rule and Composite Functions",
                "questions": [
                    make_q(
                        "Differentiate $y = (3x^2 - 5)^4$ with respect to $x$.",
                        ["$24x(3x^2 - 5)^3$", "$12x(3x^2 - 5)^3$", "$4(3x^2 - 5)^3$", "$18x^2(3x^2 - 5)^3$"], 0,
                        "Chain rule: $\\frac{dy}{dx} = 4(3x^2 - 5)^3 \\cdot (6x) = 24x(3x^2 - 5)^3$."
                    ),
                    make_q(
                        "Find the derivative of $y = \\sin^3(2x)$.",
                        ["$6\\sin^2(2x)\\cos(2x)$", "$3\\sin^2(2x)\\cos(2x)$", "$6\\sin(2x)\\cos(2x)$", "$-6\\sin^2(2x)\\cos(2x)$"], 0,
                        "Chain rule: $3\\sin^2(2x) \\cdot \\cos(2x) \\cdot 2 = 6\\sin^2(2x)\\cos(2x)$."
                    ),
                    make_q(
                        "Find the gradient of $y = \\sqrt{4x + 9}$ at the point where $x = 4$.",
                        ["$\\frac{2}{5}$", "$\\frac{4}{5}$", "$\\frac{1}{5}$", "$5$"], 0,
                        "$\\frac{dy}{dx} = \\frac{1}{2}(4x+9)^{-1/2}(4) = \\frac{2}{\\sqrt{4x+9}}$. At $x=4$: $\\frac{2}{\\sqrt{25}} = \\frac{2}{5}$."
                    )
                ]
            },
            {
                "heading": "Section 3: Tangents, Normals and Stationary Points",
                "questions": [
                    make_q(
                        "Find the equation of the tangent to the curve $y = x^2 - 4x + 3$ at the point where $x = 3$.",
                        ["$y = 2x - 6$", "$y = 2x + 6$", "$y = -2x$", "$y = x - 3$"], 0,
                        "At $x = 3$: $y = 9 - 12 + 3 = 0$. $\\frac{dy}{dx} = 2x - 4$. At $x=3$, $m = 2$. Line: $y - 0 = 2(x - 3) \\Rightarrow y = 2x - 6$."
                    ),
                    make_q(
                        "Find the coordinates of the stationary point of $y = x^3 - 3x + 2$ in the first quadrant.",
                        ["$(1, 0)$", "$(1, 2)$", "$(2, 4)$", "$(0, 2)$"], 0,
                        "$\\frac{dy}{dx} = 3x^2 - 3 = 0 \\Rightarrow x^2 = 1 \\Rightarrow x = 1$ (quadrant 1). $y = 1 - 3 + 2 = 0$. Point is $(1, 0)$."
                    ),
                    make_q(
                        "Determine the nature of the stationary point of $f(x) = 2x^3 - 9x^2 + 12x$ at $x = 2$.",
                        ["Local Minimum", "Local Maximum", "Point of Inflexion", "Vertical Asymptote"], 0,
                        "$f''(x) = 12x - 18$. At $x = 2$: $f''(2) = 24 - 18 = 6 > 0$, confirming a local minimum."
                    )
                ]
            },
            {
                "heading": "Section 4: Connected Rates of Change and Applied Optimization",
                "questions": [
                    make_q(
                        "The radius of a circular oil spill is increasing at $0.5 \\text{ m/s}$. At what rate is the area increasing when the radius is $10 \\text{ m}$?",
                        ["$10\\pi \\text{ m}^2\\text{/s}$", "$20\\pi \\text{ m}^2\\text{/s}$", "$5\\pi \\text{ m}^2\\text{/s}$", "$100\\pi \\text{ m}^2\\text{/s}$"], 0,
                        "$A = \\pi r^2 \\Rightarrow \\frac{dA}{dt} = 2\\pi r \\frac{dr}{dt} = 2\\pi(10)(0.5) = 10\\pi \\text{ m}^2/\\text{s}$."
                    ),
                    make_q(
                        "A solid cylindrical metal rod of radius $r$ and length $h$ has fixed volume $V = 54\\pi$. Express the surface area $S$ in terms of $r$ and find $r$ minimizing $S$.",
                        ["$r = 3$", "$r = 2$", "$r = 6$", "$r = 4$"], 0,
                        "$V = \\pi r^2 h = 54\\pi \\Rightarrow h = 54/r^2$. $S = 2\\pi r^2 + 2\\pi r(54/r^2) = 2\\pi r^2 + 108\\pi/r$. $\\frac{dS}{dr} = 4\\pi r - 108\\pi/r^2 = 0 \\Rightarrow 4r^3 = 108 \\Rightarrow r^3 = 27 \\Rightarrow r = 3$."
                    ),
                    make_q(
                        "If $y = 3x^2 - 4x$ and $x$ increases at a rate of $2 \\text{ units/s}$, find the rate of increase of $y$ when $x = 5$.",
                        ["$52 \\text{ units/s}$", "$26 \\text{ units/s}$", "$30 \\text{ units/s}$", "$60 \\text{ units/s}$"], 0,
                        "$\\frac{dy}{dt} = \\frac{dy}{dx}\\frac{dx}{dt} = (6x - 4)(2)$. At $x = 5$: $(26)(2) = 52$."
                    )
                ]
            }
        ]
    },

    # --------------------------------------------------------------------------
    # ADDMATH 8.01: Integration and Kinematics
    # --------------------------------------------------------------------------
    {
        "track": "addmath",
        "num": "8.01",
        "slug": "integration-and-kinematics",
        "title": "Integration and Kinematics",
        "sections": [
            {
                "heading": "Section 1: Indefinite Integration Techniques",
                "questions": [
                    make_q(
                        "Find the indefinite integral $\\int (3x - 1)^4 \\, dx$.",
                        ["$\\frac{(3x - 1)^5}{15} + C$", "$\\frac{(3x - 1)^5}{5} + C$", "$\\frac{(3x - 1)^3}{3} + C$", "$12(3x - 1)^3 + C$"], 0,
                        "Substitute $u = 3x - 1, du = 3dx$: $\\int u^4 \\frac{du}{3} = \\frac{u^5}{15} + C = \\frac{(3x-1)^5}{15} + C$."
                    ),
                    make_q(
                        "Evaluate $\\int (e^{2x} + \\sin 3x) \\, dx$.",
                        ["$\\frac{1}{2}e^{2x} - \\frac{1}{3}\\cos 3x + C$", "$\\frac{1}{2}e^{2x} + \\frac{1}{3}\\cos 3x + C$", "$2e^{2x} - 3\\cos 3x + C$", "$e^{2x} - \\cos 3x + C$"], 0,
                        "$\\int e^{2x} dx = \\frac{1}{2}e^{2x}$, $\\int \\sin 3x dx = -\\frac{1}{3}\\cos 3x$."
                    ),
                    make_q(
                        "A curve passes through $(1, 4)$ and satisfies $\\frac{dy}{dx} = 4x - 1$. Find the equation of the curve.",
                        ["$y = 2x^2 - x + 3$", "$y = 2x^2 - x + 4$", "$y = 4x^2 - x + 1$", "$y = 2x^2 + x + 1$"], 0,
                        "$y = \\int (4x - 1) dx = 2x^2 - x + C$. At $(1, 4)$: $2(1) - 1 + C = 4 \\Rightarrow C = 3$."
                    )
                ]
            },
            {
                "heading": "Section 2: Definite Integrals and Area Under Curves",
                "questions": [
                    make_q(
                        "Evaluate the exact value of the definite integral $\\int_1^4 \\left(2x + \\frac{1}{\\sqrt{x}}\\right) \\, dx$.",
                        ["$17$", "$15$", "$19$", "$16$"], 0,
                        "Antiderivative: $x^2 + 2\\sqrt{x}$. At $4$: $16 + 2(2) = 20$. At $1$: $1 + 2(1) = 3$. Difference: $20 - 3 = 17$."
                    ),
                    make_q(
                        "Find the area enclosed by the curve $y = 6x - x^2$ and the $x$-axis.",
                        ["$36$", "$18$", "$72$", "$24$"], 0,
                        "Roots: $x(6 - x) = 0 \\Rightarrow 0$ and $6$. Area $= \\int_0^6 (6x - x^2) dx = [3x^2 - x^3/3]_0^6 = 108 - 72 = 36$."
                    ),
                    make_q(
                        "Evaluate $\\int_0^{\\frac{\\pi}{4}} \\sec^2 x \\, dx$.",
                        ["$1$", "$\\sqrt{2}$", "$\\frac{1}{2}$", "$\\pi/4$"], 0,
                        "$[\\tan x]_0^{\\pi/4} = \\tan(\\pi/4) - \\tan(0) = 1 - 0 = 1$."
                    )
                ]
            },
            {
                "heading": "Section 3: Area Between Two Intersecting Curves",
                "questions": [
                    make_q(
                        "Find the area of the finite region enclosed between the parabola $y = x^2$ and the line $y = 2x$.",
                        ["$\\frac{4}{3}$", "$\\frac{2}{3}$", "$2$", "$\\frac{8}{3}$"], 0,
                        "Intersections: $x^2 = 2x \\Rightarrow x = 0, 2$. Area $= \\int_0^2 (2x - x^2) dx = [x^2 - x^3/3]_0^2 = 4 - 8/3 = 4/3$."
                    ),
                    make_q(
                        "Find the area between the curves $y = 4 - x^2$ and $y = x^2 - 4$.",
                        ["$\\frac{64}{3}$", "$\\frac{32}{3}$", "$16$", "$8$"], 0,
                        "Intersections: $4 - x^2 = x^2 - 4 \\Rightarrow 2x^2 = 8 \\Rightarrow x = \\pm 2$. Area $= \\int_{-2}^2 (8 - 2x^2) dx = [8x - 2x^3/3]_{-2}^2 = (16 - 16/3) - (-16 + 16/3) = 64/3$."
                    ),
                    make_q(
                        "Set up and evaluate the integral representing the area between $y = \\sqrt{x}$ and $y = x$ for $0 \\leq x \\leq 1$.",
                        ["$\\frac{1}{6}$", "$\\frac{1}{3}$", "$\\frac{1}{2}$", "$\\frac{2}{3}$"], 0,
                        "$\\int_0^1 (x^{1/2} - x) dx = [\\frac{2}{3}x^{3/2} - \\frac{x^2}{2}]_0^1 = \\frac{2}{3} - \\frac{1}{2} = \\frac{1}{6}$."
                    )
                ]
            },
            {
                "heading": "Section 4: Rectilinear Motion and Kinematics",
                "questions": [
                    make_q(
                        "A particle moves in a straight line with velocity $v(t) = 3t^2 - 12t + 9 \\text{ m/s}$. Find the displacement from $t = 0$ to $t = 3$.",
                        ["$0 \\text{ m}$", "$9 \\text{ m}$", "$18 \\text{ m}$", "$6 \\text{ m}$"], 0,
                        "$s(3) - s(0) = \\int_0^3 (3t^2 - 12t + 9) dt = [t^3 - 6t^2 + 9t]_0^3 = 27 - 54 + 27 = 0 \\text{ m}$."
                    ),
                    make_q(
                        "Find the acceleration of the particle in question 10 at $t = 4$ seconds.",
                        ["$12 \\text{ m/s}^2$", "$6 \\text{ m/s}^2$", "$24 \\text{ m/s}^2$", "$0 \\text{ m/s}^2$"], 0,
                        "$a(t) = v'(t) = 6t - 12$. At $t = 4$: $a(4) = 24 - 12 = 12 \\text{ m/s}^2$."
                    ),
                    make_q(
                        "Calculate the total distance travelled by the particle with $v(t) = 3(t-1)(t-3)$ from $t = 0$ to $t = 3$.",
                        ["$8 \\text{ m}$", "$0 \\text{ m}$", "$4 \\text{ m}$", "$12 \\text{ m}$"], 0,
                        "Velocity is positive on $(0, 1)$ ($s(1) = 1 - 6 + 9 = 4$) and negative on $(1, 3)$ ($s(3) - s(1) = 0 - 4 = -4$). Distance $= |4| + |-4| = 8 \\text{ m}$."
                    )
                ]
            }
        ]
    },

    # --------------------------------------------------------------------------
    # MATH FOR AI 1.01: Vectors and Embeddings in AI
    # --------------------------------------------------------------------------
    {
        "track": "mathai",
        "num": "1.01",
        "slug": "vectors-and-embeddings-in-ai",
        "title": "Vectors and Embeddings in AI",
        "sections": [
            {
                "heading": "Section 1: Vector Spaces and Linear Combinations",
                "questions": [
                    make_q(
                        "Given word vectors $\\mathbf{u} = [2, -1, 3]^T$ and $\\mathbf{v} = [1, 4, -2]^T$, compute the linear combination $3\\mathbf{u} - 2\\mathbf{v}$.",
                        ["$[4, -11, 13]^T$", "$[4, 5, 5]^T$", "$[8, -11, 5]^T$", "$[7, 5, 13]^T$"], 0,
                        "$3[2, -1, 3] = [6, -3, 9]$. $2[1, 4, -2] = [2, 8, -4]$. Difference: $[6-2, -3-8, 9-(-4)] = [4, -11, 13]^T$."
                    ),
                    make_q(
                        "Two embedding vectors $\\mathbf{a} = [k, 2, -1]^T$ and $\\mathbf{b} = [3, -4, 2]^T$ are orthogonal in semantic space. Find the value of $k$.",
                        ["$k = \\frac{10}{3}$", "$k = 2$", "$k = -\\frac{10}{3}$", "$k = 5$"], 0,
                        "Orthogonal $\\Rightarrow \\mathbf{a} \\cdot \\mathbf{b} = 3k - 8 - 2 = 3k - 10 = 0 \\Rightarrow k = 10/3$."
                    ),
                    make_q(
                        "Determine whether the three feature vectors $\\mathbf{v}_1 = [1, 0]^T$, $\\mathbf{v}_2 = [0, 1]^T$, and $\\mathbf{v}_3 = [3, -2]^T$ are linearly independent in $\\mathbf{R}^2$.",
                        [
                            "Linearly dependent (any set of $>2$ vectors in $\\mathbf{R}^2$ is dependent)",
                            "Linearly independent",
                            "Orthogonal set",
                            "Cannot be determined without a matrix inversion"
                        ], 0,
                        "Since the dimension of the space is 2, any collection of 3 vectors is linearly dependent: $\\mathbf{v}_3 = 3\\mathbf{v}_1 - 2\\mathbf{v}_2$."
                    )
                ]
            },
            {
                "heading": "Section 2: Vector Norms and Sparsity",
                "questions": [
                    make_q(
                        "Calculate the Manhattan ($L_1$) norm and Euclidean ($L_2$) norm of the embedding error vector $\\mathbf{e} = [3, -4, 12]^T$.",
                        ["$\\|\\mathbf{e}\\|_1 = 19, \\quad \\|\\mathbf{e}\\|_2 = 13$", "$\\|\\mathbf{e}\\|_1 = 13, \\quad \\|\\mathbf{e}\\|_2 = 19$", "$\\|\\mathbf{e}\\|_1 = 11, \\quad \\|\\mathbf{e}\\|_2 = 13$", "$\\|\\mathbf{e}\\|_1 = 19, \\quad \\|\\mathbf{e}\\|_2 = 169$"], 0,
                        "$L_1 = |3| + |-4| + |12| = 19$. $L_2 = \\sqrt{3^2 + (-4)^2 + 12^2} = \\sqrt{9 + 16 + 144} = \\sqrt{169} = 13$."
                    ),
                    make_q(
                        "Find the Chebyshev ($L_\\infty$) norm of the parameter vector $\\mathbf{w} = [-7, 2, 5, -9, 4]^T$.",
                        ["$9$", "$7$", "$27$", "$5$"], 0,
                        "$\\|\\mathbf{w}\\|_\\infty = \\max(|-7|, |2|, |5|, |-9|, |4|) = 9$."
                    ),
                    make_q(
                        "In Lasso regression, why does adding an $L_1$ penalty to the loss function induce exact feature sparsity (weights driven to 0)?",
                        [
                            "The diamond-shaped $L_1$ contour has sharp corners on the coordinate axes",
                            "The $L_1$ norm is continuously differentiable everywhere",
                            "The $L_1$ penalty penalizes large weights much more heavily than $L_2$",
                            "The $L_1$ norm computes the determinant of the covariance matrix"
                        ], 0,
                        "The level sets of the $L_1$ ball are non-smooth polytopes with vertices on the axes, where elliptical loss contours naturally contact first."
                    )
                ]
            },
            {
                "heading": "Section 3: Dot Products, Cosine Similarity and Angular Distance",
                "questions": [
                    make_q(
                        "Two query embeddings are $\\mathbf{u} = [1, 1, 0]^T$ and $\\mathbf{v} = [0, 2, 2]^T$. Compute the cosine similarity $\\cos\\theta$ between them.",
                        ["$0.500$", "$0.707$", "$0.250$", "$1.000$"], 0,
                        "$\\mathbf{u}\\cdot\\mathbf{v} = 2$. $\\|\\mathbf{u}\\| = \\sqrt{2}$, $\\|\\mathbf{v}\\| = \\sqrt{8} = 2\\sqrt{2}$. $\\cos\\theta = \\frac{2}{\\sqrt{2}(2\\sqrt{2})} = \\frac{2}{4} = 0.5$."
                    ),
                    make_q(
                        "If two unit-normalized embeddings have cosine similarity $\\cos\\theta = -1.0$, what is their semantic relationship?",
                        [
                            "Diametrically opposite in direction ($180^\\circ$ apart)",
                            "Identical in meaning",
                            "Orthogonal / unrelated",
                            "Collinear in the exact same direction"
                        ], 0,
                        "$\\cos(180^\\circ) = -1.0$: the vectors point in exact opposite directions."
                    ),
                    make_q(
                        "Compute the cosine distance $D_{\\cos}(\\mathbf{u}, \\mathbf{v}) = 1 - \\cos\\theta$ for two orthogonal feature vectors.",
                        ["$1.0$", "$0.0$", "$2.0$", "$-1.0$"], 0,
                        "For orthogonal vectors, $\\cos\\theta = 0$. Thus $D_{\\cos} = 1 - 0 = 1.0$."
                    )
                ]
            },
            {
                "heading": "Section 4: High-Dimensional Geometry and Projections",
                "questions": [
                    make_q(
                        "Find the scalar projection of vector $\\mathbf{a} = [4, 2]^T$ onto the direction of unit vector $\\mathbf{u} = [0.6, 0.8]^T$.",
                        ["$4.0$", "$5.0$", "$2.4$", "$3.2$"], 0,
                        "Scalar projection $= \\mathbf{a} \\cdot \\mathbf{u} = 4(0.6) + 2(0.8) = 2.4 + 1.6 = 4.0$."
                    ),
                    make_q(
                        "In high-dimensional embedding spaces ($D = 1024$), why are two randomly selected vectors almost certainly nearly orthogonal?",
                        [
                            "The surface area of a high-dimensional hypersphere concentrates near the equator relative to any pole",
                            "All high-dimensional vectors have zero norm",
                            "The dot product of random Gaussian variables always equals 1",
                            "The cosine function approaches infinity as dimension increases"
                        ], 0,
                        "By concentration of measure on the sphere $\\mathbf{S}^{D-1}$, almost all mass lies in a thin band around the equator, so $\\cos\\theta \\approx 0$ with high probability."
                    ),
                    make_q(
                        "Normalize the feature vector $\\mathbf{x} = [3, 0, 4]^T$ to have unit Euclidean norm.",
                        ["$[0.6, 0, 0.8]^T$", "$[0.75, 0, 1]^T$", "$[1, 0, 1]^T$", "$[0.3, 0, 0.4]^T$"], 0,
                        "$\\|\\mathbf{x}\\| = \\sqrt{3^2 + 0^2 + 4^2} = 5$. Unit vector $= \\frac{1}{5}[3, 0, 4]^T = [0.6, 0, 0.8]^T$."
                    )
                ]
            }
        ]
    },

    # --------------------------------------------------------------------------
    # MATH FOR AI 2.01: Neural Layer Matrices and Activations
    # --------------------------------------------------------------------------
    {
        "track": "mathai",
        "num": "2.01",
        "slug": "neural-layer-matrices-and-activations",
        "title": "Neural Layer Matrices and Activations",
        "sections": [
            {
                "heading": "Section 1: Affine Transformations and Matrix Dimensions",
                "questions": [
                    make_q(
                        "A fully-connected neural layer maps input $\\mathbf{x} \\in \\mathbf{R}^{128}$ to output $\\mathbf{y} \\in \\mathbf{R}^{64}$ via $\\mathbf{y} = \\mathbf{W}\\mathbf{x} + \\mathbf{b}$. What is the shape of the weight matrix $\\mathbf{W}$?",
                        ["$64 \\times 128$", "$128 \\times 64$", "$128 \\times 128$", "$64 \\times 64$"], 0,
                        "To multiply a $(128 \\times 1)$ input and yield a $(64 \\times 1)$ output, $\\mathbf{W}$ must have shape $64 \\times 128$."
                    ),
                    make_q(
                        "For a mini-batch of $B = 32$ samples with input dimension $D = 128$, what is the shape of the activation batch $\\mathbf{Y} = \\mathbf{X}\\mathbf{W}^T$ when $\\mathbf{W}$ is $64 \\times 128$?",
                        ["$32 \\times 64$", "$64 \\times 32$", "$32 \\times 128$", "$128 \\times 64$"], 0,
                        "$\\mathbf{X}$ is $(32 \\times 128)$, $\\mathbf{W}^T$ is $(128 \\times 64)$. Product shape: $32 \\times 64$."
                    ),
                    make_q(
                        "If a two-layer linear network computes $\\mathbf{y} = \\mathbf{W}_2(\\mathbf{W}_1 \\mathbf{x})$ without non-linear activations, why is its expressive capacity limited to a single linear transformation?",
                        [
                            "The product of two matrices $\\mathbf{W}_3 = \\mathbf{W}_2 \\mathbf{W}_1$ is itself a single matrix",
                            "The gradient of two matrices is always undefined",
                            "Matrix multiplication is non-associative",
                            "The bias vector becomes zero"
                        ], 0,
                        "Linear mappings are closed under composition: $\\mathbf{W}_2(\\mathbf{W}_1 \\mathbf{x}) = (\\mathbf{W}_2 \\mathbf{W}_1)\\mathbf{x} = \\mathbf{W}_{eq}\\mathbf{x}$."
                    )
                ]
            },
            {
                "heading": "Section 2: Neural Parameter Counting",
                "questions": [
                    make_q(
                        "Calculate the total number of trainable parameters (weights + biases) in a dense layer with $256$ inputs and $128$ outputs.",
                        ["$32928$", "$32768$", "$33024$", "$32896$"], 0,
                        "Weights: $256 \\times 128 = 32768$. Biases: $128$. Total $= 32768 + 128 = 32928$."
                    ),
                    make_q(
                        "A two-layer perceptron has architecture $10 \\to 20 \\to 1$. How many total parameters are in the network (including all biases)?",
                        ["$241$", "$220$", "$200$", "$231$"], 0,
                        "Layer 1: $10 \\times 20 + 20 = 220$. Layer 2: $20 \\times 1 + 1 = 21$. Total $= 220 + 21 = 241$."
                    ),
                    make_q(
                        "A convolutional layer has $32$ filters of size $3 \\times 3$ across $3$ input channels with a bias per filter. How many learnable parameters does it contain?",
                        ["$896$", "$864$", "$288$", "$928$"], 0,
                        "Weights: $32 \\times (3 \\times 3 \\times 3) = 32 \\times 27 = 864$. Biases: $32$. Total $= 864 + 32 = 896$."
                    )
                ]
            },
            {
                "heading": "Section 3: Rectified Activations and Dying Neurons",
                "questions": [
                    make_q(
                        "Evaluate the standard ReLU activation function $\\text{ReLU}(z) = \\max(0, z)$ and its derivative for $z = -3.5$.",
                        ["$\\text{ReLU}(-3.5) = 0, \\quad \\text{ReLU}'(-3.5) = 0$", "$\\text{ReLU}(-3.5) = -3.5, \\quad \\text{ReLU}'(-3.5) = 1$", "$\\text{ReLU}(-3.5) = 0, \\quad \\text{ReLU}'(-3.5) = 1$", "$\\text{ReLU}(-3.5) = 3.5, \\quad \\text{ReLU}'(-3.5) = -1$"], 0,
                        "For $z < 0$, $\\text{ReLU}(z) = 0$ and its derivative is $0$."
                    ),
                    make_q(
                        "How does the Leaky ReLU activation $f(z) = \\max(0.01z, z)$ mitigate the 'dying ReLU' problem during backpropagation?",
                        [
                            "It provides a non-zero gradient ($0.01$) for negative inputs, preventing weights from freezing",
                            "It normalizes inputs to have zero mean and unit variance",
                            "It bounds outputs between $-1$ and $1$",
                            "It eliminates the need for bias vectors"
                        ], 0,
                        "For $z < 0$, $f'(z) = 0.01 > 0$, allowing error gradients to flow back through inactive neurons."
                    ),
                    make_q(
                        "Find the output of a Leaky ReLU activation with coefficient $\\alpha = 0.1$ when input is $z = -8$.",
                        ["$-0.8$", "$0$", "$-8.0$", "$0.8$"], 0,
                        "$f(-8) = 0.1(-8) = -0.8$."
                    )
                ]
            },
            {
                "heading": "Section 4: Saturating Activations and Softmax Probabilities",
                "questions": [
                    make_q(
                        "The standard logistic sigmoid is $\\sigma(z) = \\frac{1}{1 + e^{-z}}$. If $\\sigma(z_0) = 0.8$, compute the derivative $\\sigma'(z_0)$.",
                        ["$0.16$", "$0.80$", "$0.64$", "$0.20$"], 0,
                        "$\\sigma'(z) = \\sigma(z)(1 - \\sigma(z))$. Here $\\sigma'(z_0) = 0.8(1 - 0.8) = 0.8(0.2) = 0.16$."
                    ),
                    make_q(
                        "Why does the Hyperbolic Tangent activation $\\tanh(z) = \\frac{e^z - e^{-z}}{e^z + e^{-z}}$ generally train faster than standard sigmoid in hidden layers?",
                        [
                            "It is zero-centered with outputs in $(-1, 1)$, preventing systematic gradient bias",
                            "Its derivative is identically 1 everywhere",
                            "It does not require exponent calculation",
                            "It eliminates all negative activations"
                        ], 0,
                        "Being zero-centered means average outputs are near 0, preventing zig-zag gradient updates across positive coordinates."
                    ),
                    make_q(
                        "Apply the Softmax function $\\text{softmax}(\\mathbf{z})_i = \\frac{e^{z_i}}{\\sum e^{z_j}}$ to the logit vector $\\mathbf{z} = [0, \\ln 2, \\ln 5]^T$. Find the probability of class 3.",
                        ["$\\frac{5}{8} = 0.625$", "$\\frac{1}{8} = 0.125$", "$\\frac{2}{8} = 0.250$", "$\\frac{5}{7} \\approx 0.714$"], 0,
                        "$e^0 = 1, e^{\\ln 2} = 2, e^{\\ln 5} = 5$. Sum $= 1 + 2 + 5 = 8$. $P(\\text{class } 3) = 5/8 = 0.625$."
                    )
                ]
            }
        ]
    },

    # --------------------------------------------------------------------------
    # MATH FOR AI 3.01: Gradient Descent and Optimization
    # --------------------------------------------------------------------------
    {
        "track": "mathai",
        "num": "3.01",
        "slug": "gradient-descent-and-optimization",
        "title": "Gradient Descent and Optimization",
        "sections": [
            {
                "heading": "Section 1: Loss Function Derivatives and Stationary Points",
                "questions": [
                    make_q(
                        "Find the stationary point (global minimum) of the scalar mean squared error loss $L(w) = 3(w - 4)^2 + 7$.",
                        ["$w = 4$", "$w = 7$", "$w = 3$", "$w = 0$"], 0,
                        "$L'(w) = 6(w - 4) = 0 \\Rightarrow w = 4$. $L''(4) = 6 > 0$, so $w = 4$ is the minimum."
                    ),
                    make_q(
                        "For the loss function $L(w) = w^4 - 4w^2 + 6$, find all values of $w$ where the gradient is zero.",
                        ["$w = 0, \\pm\\sqrt{2}$", "$w = \\pm 2$", "$w = 0, \\pm 2$", "$w = \\pm 1$"], 0,
                        "$L'(w) = 4w^3 - 8w = 4w(w^2 - 2) = 0 \\Rightarrow w = 0$ or $w = \\pm\\sqrt{2}$."
                    ),
                    make_q(
                        "In optimization, a critical point has $L'(w) = 0$ and $L''(w) = -8$. What type of point is this?",
                        ["Local Maximum", "Local Minimum", "Saddle Point", "Inflection Point"], 0,
                        "A negative second derivative implies concavity downwards, confirming a local maximum."
                    )
                ]
            },
            {
                "heading": "Section 2: Multivariate Gradients and Directional Derivatives",
                "questions": [
                    make_q(
                        "Compute the gradient vector $\\nabla L$ of $L(w_1, w_2) = 3w_1^2 + 5w_2^2 - 2w_1 w_2$ evaluated at $(w_1, w_2) = (2, 1)$.",
                        ["$[10, 6]^T$", "$[12, 10]^T$", "$[8, 8]^T$", "$[14, 4]^T$"], 0,
                        "$\\frac{\\partial L}{\\partial w_1} = 6w_1 - 2w_2 = 12 - 2 = 10$. $\\frac{\\partial L}{\\partial w_2} = 10w_2 - 2w_1 = 10 - 4 = 6$."
                    ),
                    make_q(
                        "In which direction does the negative gradient vector $-\\nabla L(\\mathbf{w})$ point?",
                        [
                            "The direction of steepest decrease of the loss function",
                            "The direction of steepest increase of the loss function",
                            "Orthogonal to the level curves in the direction of highest loss",
                            "Along the tangent line of the contour"
                        ], 0,
                        "$\\nabla L$ points in the direction of greatest increase; its negation $-\\nabla L$ points in the direction of steepest descent."
                    ),
                    make_q(
                        "Compute the directional derivative of $f(x, y) = x^2 y$ at $(1, 2)$ in the unit direction $\\mathbf{u} = [0.8, 0.6]^T$.",
                        ["$3.8$", "$4.2$", "$2.6$", "$5.0$"], 0,
                        "$\\nabla f = [2xy, x^2]^T = [4, 1]^T$. Directional derivative $= \\nabla f \\cdot \\mathbf{u} = 4(0.8) + 1(0.6) = 3.2 + 0.6 = 3.8$."
                    )
                ]
            },
            {
                "heading": "Section 3: Gradient Descent Step Updates",
                "questions": [
                    make_q(
                        "A model weight has value $w_0 = 5.0$. If $\\frac{\\partial L}{\\partial w} = 4.0$ and learning rate is $\\eta = 0.1$, find the updated weight $w_1$.",
                        ["$4.6$", "$5.4$", "$4.0$", "$4.9$"], 0,
                        "Update: $w_1 = w_0 - \\eta \\nabla L = 5.0 - 0.1(4.0) = 5.0 - 0.4 = 4.6$."
                    ),
                    make_q(
                        "Consider the quadratic loss $L(w) = \\frac{1}{2} a w^2$ with $a = 10$. What is the maximum learning rate $\\eta$ before gradient descent diverges?",
                        ["$\\eta < 0.2$", "$\\eta < 0.1$", "$\\eta < 0.05$", "$\\eta < 1.0$"], 0,
                        "Update is $w_{t+1} = w_t(1 - \\eta a)$. Stability requires $|1 - \\eta a| < 1 \\Rightarrow -1 < 1 - 10\\eta < 1 \\Rightarrow 0 < \\eta < 2/10 = 0.2$."
                    ),
                    make_q(
                        "Perform one vector gradient descent update from $\\mathbf{w}_0 = [1, 2]^T$ with $\\nabla L = [2, -4]^T$ and $\\eta = 0.25$.",
                        ["$[0.5, 3.0]^T$", "$[1.5, 1.0]^T$", "$[0.5, 1.0]^T$", "$[1.0, 3.0]^T$"], 0,
                        "$\\mathbf{w}_1 = [1, 2]^T - 0.25[2, -4]^T = [1 - 0.5, 2 - (-1)]^T = [0.5, 3.0]^T$."
                    )
                ]
            },
            {
                "heading": "Section 4: Momentum and Advanced Optimizers",
                "questions": [
                    make_q(
                        "In Polyak momentum, the velocity update is $\\mathbf{v}_{t+1} = \\beta \\mathbf{v}_t + \\eta \\nabla L$. If $\\beta = 0.9$, $\\mathbf{v}_0 = 2.0$, $\\eta = 0.1$, and $\\nabla L = 4.0$, find $\\mathbf{v}_1$.",
                        ["$2.2$", "$2.0$", "$1.8$", "$2.6$"], 0,
                        "$\\mathbf{v}_1 = 0.9(2.0) + 0.1(4.0) = 1.8 + 0.4 = 2.2$."
                    ),
                    make_q(
                        "Why does the Adam optimizer maintain running exponential averages of both first moments (mean) and second raw moments (uncentered variance)?",
                        [
                            "To adapt per-parameter learning rates inversely proportional to gradient magnitude",
                            "To guarantee convergence to the global minimum in non-convex losses",
                            "To replace backpropagation with finite differences",
                            "To eliminate the need for mini-batch sampling"
                        ], 0,
                        "The second moment scales steps down for parameters with large, frequent gradients and up for sparse gradients."
                    ),
                    make_q(
                        "What is the condition on the Hessian matrix $\\mathbf{H} = \\nabla^2 L(\\mathbf{w})$ for a loss function to be strictly convex everywhere?",
                        [
                            "$\\mathbf{H}$ is positive definite everywhere (all eigenvalues $> 0$)",
                            "$\\mathbf{H}$ has determinant equal to zero",
                            "$\\mathbf{H}$ has trace equal to 1",
                            "$\\mathbf{H}$ is skew-symmetric"
                        ], 0,
                        "Strict convexity requires a positive definite Hessian: $\\mathbf{v}^T \\mathbf{H} \\mathbf{v} > 0$ for all non-zero $\\mathbf{v}$."
                    )
                ]
            }
        ]
    },

    # --------------------------------------------------------------------------
    # MATH FOR AI 4.01: Conditional Probability and Bayes Rule
    # --------------------------------------------------------------------------
    {
        "track": "mathai",
        "num": "4.01",
        "slug": "conditional-probability-and-bayes-rule",
        "title": "Conditional Probability and Bayes Rule",
        "sections": [
            {
                "heading": "Section 1: Joint Probability and Independence",
                "questions": [
                    make_q(
                        "If two events $A$ and $B$ are statistically independent with $P(A) = 0.4$ and $P(B) = 0.3$, find the joint probability $P(A \\cap B)$.",
                        ["$0.12$", "$0.70$", "$0.10$", "$0.30$"], 0,
                        "By independence: $P(A \\cap B) = P(A) \\times P(B) = 0.4 \\times 0.3 = 0.12$."
                    ),
                    make_q(
                        "Given $P(A) = 0.5$, $P(B) = 0.4$, and $P(A \\cup B) = 0.7$, find $P(A \\cap B)$.",
                        ["$0.20$", "$0.10$", "$0.30$", "$0.15$"], 0,
                        "$P(A \\cap B) = P(A) + P(B) - P(A \\cup B) = 0.5 + 0.4 - 0.7 = 0.20$."
                    ),
                    make_q(
                        "Are the events in question 2 statistically independent?",
                        [
                            "Yes, because $P(A)P(B) = 0.5 \\times 0.4 = 0.20 = P(A \\cap B)$",
                            "No, because $P(A) \\neq P(B)$",
                            "No, because $P(A \\cup B) \\neq 1$",
                            "Cannot be determined without conditional probabilities"
                        ], 0,
                        "Since $P(A \\cap B) = 0.20 = P(A)P(B)$, the definition of independence is satisfied exactly."
                    )
                ]
            },
            {
                "heading": "Section 2: Conditional Probability and the Chain Rule",
                "questions": [
                    make_q(
                        "Given $P(A) = 0.6$ and $P(A \\cap B) = 0.18$, calculate the conditional probability $P(B|A)$.",
                        ["$0.30$", "$0.108$", "$0.42$", "$0.25$"], 0,
                        "$P(B|A) = \\frac{P(A \\cap B)}{P(A)} = \\frac{0.18}{0.60} = 0.30$."
                    ),
                    make_q(
                        "In an autoregressive language model, write the joint probability of a sequence of three tokens $P(w_1, w_2, w_3)$ using the probability Chain Rule.",
                        [
                            "$P(w_1) P(w_2|w_1) P(w_3|w_1, w_2)$",
                            "$P(w_1) + P(w_2) + P(w_3)$",
                            "$P(w_1) P(w_2) P(w_3)$",
                            "$P(w_3|w_2) P(w_2|w_1)$"
                        ], 0,
                        "By exact probability decomposition: $P(w_1, w_2, w_3) = P(w_1) P(w_2|w_1) P(w_3|w_1, w_2)$."
                    ),
                    make_q(
                        "If $P(A|B) = 0.8$ and $P(B) = 0.25$, find $P(A \\cap B)$.",
                        ["$0.20$", "$0.55$", "$0.3125$", "$0.10$"], 0,
                        "$P(A \\cap B) = P(A|B) P(B) = 0.8 \\times 0.25 = 0.20$."
                    )
                ]
            },
            {
                "heading": "Section 3: Law of Total Probability",
                "questions": [
                    make_q(
                        "Factory line 1 produces $60\\%$ of microchips with defect rate $2\\%$. Line 2 produces $40\\%$ with defect rate $5\\%$. What is the total probability that a random chip is defective?",
                        ["$0.032$", "$0.070$", "$0.035$", "$0.025$"], 0,
                        "$P(D) = P(D|L_1)P(L_1) + P(D|L_2)P(L_2) = (0.02)(0.60) + (0.05)(0.40) = 0.012 + 0.020 = 0.032$."
                    ),
                    make_q(
                        "In question 7, if a selected chip is defective, what is the probability it came from Line 2?",
                        ["$\\frac{0.020}{0.032} = 0.625$", "$0.400$", "$0.375$", "$0.500$"], 0,
                        "Bayes: $P(L_2|D) = \\frac{P(D|L_2)P(L_2)}{P(D)} = \\frac{0.020}{0.032} = 0.625$."
                    ),
                    make_q(
                        "State the Law of Total Probability for an exhaustive partition $\\{A_1, A_2, \\dots, A_k\\}$ of the sample space.",
                        [
                            "$P(B) = \\sum_{i=1}^k P(B|A_i) P(A_i)$",
                            "$P(B) = \\prod_{i=1}^k P(B|A_i)$",
                            "$P(B) = \\max_i P(B|A_i)$",
                            "$P(B) = \\sum_{i=1}^k P(A_i|B)$"
                        ], 0,
                        "Every element in $B$ belongs to exactly one partition $A_i$, giving $P(B) = \\sum P(B \\cap A_i) = \\sum P(B|A_i)P(A_i)$."
                    )
                ]
            },
            {
                "heading": "Section 4: Bayes Theorem in Machine Learning and Screening",
                "questions": [
                    make_q(
                        "In medical screening, a disease has prevalence $P(D) = 0.01$. The test has sensitivity $P(+|D) = 0.99$ and false positive rate $P(+|\\neg D) = 0.02$. What is the posterior probability $P(D|+)$ that a positive patient has the disease?",
                        ["$\\approx 33.3\\%$", "$99.0\\%$", "$50.0\\%$", "$5.0\\%$"], 0,
                        "$P(+) = (0.99)(0.01) + (0.02)(0.99) = 0.0099 + 0.0198 = 0.0297$. $P(D|+) = \\frac{0.0099}{0.0297} = \\frac{1}{3} \\approx 33.3\\%$."
                    ),
                    make_q(
                        "What is the foundational simplifying assumption of the Naive Bayes text classifier?",
                        [
                            "Features (words) are conditionally independent given the class label",
                            "All prior probabilities are equal",
                            "The vocabulary size is infinite",
                            "Features follow a uniform distribution"
                        ], 0,
                        "Naive Bayes assumes $P(x_1, \\dots, x_n | C) = \\prod_{i=1}^n P(x_i | C)$, dramatically reducing parameter count."
                    ),
                    make_q(
                        "In Maximum A Posteriori (MAP) estimation, how does the optimization objective differ from standard Maximum Likelihood Estimation (MLE)?",
                        [
                            "MAP incorporates a prior distribution: $\\theta_{MAP} = \\arg\\max [\\ln P(D|\\theta) + \\ln P(\\theta)]$",
                            "MAP ignores all observed training data",
                            "MAP only applies to linear models",
                            "MAP minimizes variance instead of error"
                        ], 0,
                        "MAP maximizes posterior $\\propto$ likelihood $\\times$ prior, functioning mathematically like regularized MLE."
                    )
                ]
            }
        ]
    },

    # --------------------------------------------------------------------------
    # MATH FOR AI 5.01: Distributions and Maximum Likelihood
    # --------------------------------------------------------------------------
    {
        "track": "mathai",
        "num": "5.01",
        "slug": "distributions-and-maximum-likelihood",
        "title": "Distributions and Maximum Likelihood",
        "sections": [
            {
                "heading": "Section 1: Discrete Random Variables and Bernoulli Likelihood",
                "questions": [
                    make_q(
                        "In a binary click-through model, an ad is clicked $k = 40$ times out of $n = 200$ impressions. What is the Maximum Likelihood Estimate $\\hat{p}_{MLE}$ of the click probability?",
                        ["$0.20$", "$0.25$", "$0.16$", "$0.40$"], 0,
                        "For Bernoulli trials, $\\hat{p}_{MLE} = k / n = 40 / 200 = 0.20$."
                    ),
                    make_q(
                        "What is the variance of a Bernoulli random variable with success probability $p = 0.3$?",
                        ["$0.21$", "$0.30$", "$0.70$", "$0.49$"], 0,
                        "$\\text{Var}(X) = p(1 - p) = 0.3(0.7) = 0.21$."
                    ),
                    make_q(
                        "Show how maximizing the Bernoulli log-likelihood relates to the binary cross-entropy loss function used in neural networks.",
                        [
                            "Maximizing Bernoulli log-likelihood is mathematically identical to minimizing binary cross-entropy",
                            "Cross-entropy is the reciprocal of the log-likelihood",
                            "They only match when $p = 0.5$",
                            "Cross-entropy ignores negative classes"
                        ], 0,
                        "Log-likelihood is $\\sum [y_i \\ln p + (1-y_i)\\ln(1-p)]$. Binary cross-entropy is the negative log-likelihood $-\\text{LL}$."
                    )
                ]
            },
            {
                "heading": "Section 2: Continuous Gaussian Normal Distributions",
                "questions": [
                    make_q(
                        "A feature vector component follows $X \\sim \\mathcal{N}(50, 16)$. What are its mean $\\mu$ and standard deviation $\\sigma$?",
                        ["$\\mu = 50, \\quad \\sigma = 4$", "$\\mu = 50, \\quad \\sigma = 16$", "$\\mu = 16, \\quad \\sigma = 50$", "$\\mu = 25, \\quad \\sigma = 4$"], 0,
                        "Notation $\\mathcal{N}(\\mu, \\sigma^2) \\Rightarrow \\mu = 50$, $\\sigma^2 = 16 \\Rightarrow \\sigma = 4$."
                    ),
                    make_q(
                        "By the empirical ($68-95-99.7$) rule, approximately what percentage of samples from $\\mathcal{N}(\\mu, \\sigma^2)$ fall within the interval $(\\mu - 2\\sigma, \\mu + 2\\sigma)$?",
                        ["$95.4\\%$", "$68.2\\%$", "$99.7\\%$", "$50.0\\%$"], 0,
                        "Approximately $95.4\\%$ of Gaussian mass lies within $\\pm 2$ standard deviations."
                    ),
                    make_q(
                        "Standardize the value $x = 62$ from the distribution $\\mathcal{N}(50, 16)$ into a standard normal $z$-score.",
                        ["$z = 3.0$", "$z = 0.75$", "$z = 12$", "$z = 1.5$"], 0,
                        "$z = \\frac{x - \\mu}{\\sigma} = \\frac{62 - 50}{4} = \\frac{12}{4} = 3.0$."
                    )
                ]
            },
            {
                "heading": "Section 3: The Likelihood Function and Log-Likelihood Formulation",
                "questions": [
                    make_q(
                        "Why is the log-likelihood $\\ln L(\\theta) = \\sum_{i=1}^n \\ln p(x_i | \\theta)$ preferred over raw likelihood in machine learning optimization?",
                        [
                            "It transforms products of probabilities into sums, preventing numerical underflow and simplifying derivatives",
                            "It converts non-convex problems into concave problems unconditionally",
                            "It eliminates the need for normalization",
                            "It ensures the sample mean is zero"
                        ], 0,
                        "Multiplying many small probabilities causes float underflow; summing logs is numerically stable and derivatives split cleanly."
                    ),
                    make_q(
                        "For $n$ independent samples from $\\mathcal{N}(\\mu, \\sigma^2)$, what is the analytical expression for the log-likelihood?",
                        [
                            "$-\\frac{n}{2}\\ln(2\\pi\\sigma^2) - \\frac{1}{2\\sigma^2}\\sum_{i=1}^n (x_i - \\mu)^2$",
                            "$-\\frac{n}{2}\\ln(2\\pi) - \\sum_{i=1}^n (x_i - \\mu)$",
                            "$\\frac{n}{2\\sigma^2}\\sum (x_i - \\mu)^2$",
                            "$-\\frac{1}{\\sigma^2}\\sum (x_i - \\mu)$"
                        ], 0,
                        "Taking natural log of $\\prod \\frac{1}{\\sqrt{2\\pi\\sigma^2}} \\exp\\left(-\\frac{(x_i-\\mu)^2}{2\\sigma^2}\\right)$ gives this standard form."
                    ),
                    make_q(
                        "Given $5$ observations $\\{2, 4, 4, 6, 9\\}$, compute the sample mean $\\bar{x}$, which is the Gaussian MLE $\\hat{\\mu}_{MLE}$.",
                        ["$5.0$", "$4.0$", "$4.6$", "$5.5$"], 0,
                        "$\\bar{x} = \\frac{2 + 4 + 4 + 6 + 9}{5} = \\frac{25}{5} = 5.0$."
                    )
                ]
            },
            {
                "heading": "Section 4: Properties of Estimators: Bias and Consistency",
                "questions": [
                    make_q(
                        "Why is the Maximum Likelihood Estimator for variance $\\hat{\\sigma}_{MLE}^2 = \\frac{1}{n}\\sum (x_i - \\bar{x})^2$ biased for finite samples?",
                        [
                            "Its expected value is $\\frac{n-1}{n}\\sigma^2 < \\sigma^2$, underestimating true variance due to using sample mean $\\bar{x}$",
                            "It only works for standard normal data",
                            "Its expected value approaches infinity",
                            "It ignores outliers"
                        ], 0,
                        "Estimating $\\bar{x}$ uses 1 degree of freedom, resulting in $E[\\hat{\\sigma}_{MLE}^2] = \\frac{n-1}{n}\\sigma^2$ (Bessel's correction uses $n-1$)."
                    ),
                    make_q(
                        "What is Bessel's correction to make the sample variance estimator unbiased?",
                        ["Multiply by $\\frac{n}{n-1}$", "Multiply by $\\frac{n-1}{n}$", "Add $\\frac{1}{n}$", "Subtract the mean"], 0,
                        "$s^2 = \\frac{n}{n-1} \\hat{\\sigma}_{MLE}^2 = \\frac{1}{n-1}\\sum (x_i - \\bar{x})^2$."
                    ),
                    make_q(
                        "What does it mean for an estimator $\\hat{\\theta}_n$ to be asymptotically consistent?",
                        [
                            "As sample size $n \\to \\infty$, $\\hat{\\theta}_n$ converges in probability to the true parameter $\\theta$",
                            "The estimator has zero variance for all sample sizes",
                            "The estimator is unbiased for $n = 1$",
                            "The estimator follows a student-$t$ distribution"
                        ], 0,
                        "Consistency is the property that with infinite data, the estimator converges to the ground truth parameter value."
                    )
                ]
            }
        ]
    },

    # --------------------------------------------------------------------------
    # MATH FOR AI 6.01: Linear Regression and OLS
    # --------------------------------------------------------------------------
    {
        "track": "mathai",
        "num": "6.01",
        "slug": "linear-regression-and-ols",
        "title": "Linear Regression and OLS",
        "sections": [
            {
                "heading": "Section 1: Simple Linear Regression and Residuals",
                "questions": [
                    make_q(
                        "In simple linear regression $\\hat{y} = 3.5x + 12$, what is the residual $e_i = y_i - \\hat{y}_i$ for an observation at $(x_i, y_i) = (4, 30)$?",
                        ["$+4$", "$-4$", "$+2$", "$-2$"], 0,
                        "$\\hat{y} = 3.5(4) + 12 = 14 + 12 = 26$. Residual $e = 30 - 26 = +4$."
                    ),
                    make_q(
                        "What is the mathematical condition guaranteed by the OLS fit regarding the sum of all residuals $\\sum_{i=1}^n e_i$?",
                        ["$\\sum e_i = 0$ exactly", "$\\sum e_i = 1$", "$\\sum e_i = n$", "$\\sum e_i = \\text{SSE}$"], 0,
                        "The first normal equation $\\frac{\\partial \\text{SSE}}{\\partial \\beta_0} = -2\\sum (y_i - \\beta_0 - \\beta_1 x_i) = 0$ guarantees $\\sum e_i = 0$."
                    ),
                    make_q(
                        "Given $\\bar{x} = 10, \\bar{y} = 25$, and fitted slope $\\hat{\\beta}_1 = 2$, compute the $y$-intercept $\\hat{\\beta}_0$.",
                        ["$5$", "$15$", "$20$", "$10$"], 0,
                        "Regression line passes through the centroid: $\\hat{\\beta}_0 = \\bar{y} - \\hat{\\beta}_1 \\bar{x} = 25 - 2(10) = 5$."
                    )
                ]
            },
            {
                "heading": "Section 2: Analytical OLS Formulas and Covariance",
                "questions": [
                    make_q(
                        "For a dataset with $\\text{Cov}(x, y) = 18$ and $\\text{Var}(x) = 6$, compute the OLS slope $\\hat{\\beta}_1$.",
                        ["$3.0$", "$0.33$", "$12$", "$108$"], 0,
                        "$\\hat{\\beta}_1 = \\frac{\\text{Cov}(x, y)}{\\text{Var}(x)} = \\frac{18}{6} = 3.0$."
                    ),
                    make_q(
                        "If the Pearson correlation coefficient between $x$ and $y$ is $r = 0.8$, with $\\sigma_x = 2$ and $\\sigma_y = 5$, find the slope $\\hat{\\beta}_1$.",
                        ["$2.0$", "$1.25$", "$0.32$", "$4.0$"], 0,
                        "$\\hat{\\beta}_1 = r \\frac{\\sigma_y}{\\sigma_x} = 0.8 \\left(\\frac{5}{2}\\right) = 0.8(2.5) = 2.0$."
                    ),
                    make_q(
                        "If all $x$ values in a dataset are scaled by a factor of $10$, how does the OLS regression slope change?",
                        ["It is divided by $10$", "It is multiplied by $10$", "It is multiplied by $100$", "It remains unchanged"], 0,
                        "$\\beta_1' = \\frac{\\text{Cov}(10x, y)}{\\text{Var}(10x)} = \\frac{10\\text{Cov}(x,y)}{100\\text{Var}(x)} = \\frac{1}{10}\\beta_1$."
                    )
                ]
            },
            {
                "heading": "Section 3: Matrix Normal Equations and Projections",
                "questions": [
                    make_q(
                        "State the matrix Normal Equations for the OLS weight vector $\\boldsymbol{\\beta}$ given design matrix $\\mathbf{X}$ and target $\\mathbf{y}$.",
                        [
                            "$(\\mathbf{X}^T \\mathbf{X})\\boldsymbol{\\beta} = \\mathbf{X}^T \\mathbf{y}$",
                            "$\\mathbf{X}\\boldsymbol{\\beta} = \\mathbf{y}$",
                            "$(\\mathbf{X} \\mathbf{X}^T)\\boldsymbol{\\beta} = \\mathbf{y}$",
                            "$\\boldsymbol{\\beta} = \\mathbf{X}^T \\mathbf{y}$"
                        ], 0,
                        "Minimizing $\\|\\mathbf{y} - \\mathbf{X}\\boldsymbol{\\beta}\\|^2 \\Rightarrow -2\\mathbf{X}^T(\\mathbf{y} - \\mathbf{X}\\boldsymbol{\\beta}) = 0 \\Rightarrow (\\mathbf{X}^T\\mathbf{X})\\boldsymbol{\\beta} = \\mathbf{X}^T\\mathbf{y}$."
                    ),
                    make_q(
                        "When is the Gram matrix $(\\mathbf{X}^T \\mathbf{X})$ strictly invertible?",
                        [
                            "When the columns of $\\mathbf{X}$ are linearly independent (full column rank)",
                            "When $\\mathbf{X}$ is a square matrix",
                            "When all elements in $\\mathbf{X}$ are positive",
                            "When the target $\\mathbf{y}$ has zero mean"
                        ], 0,
                        "Full column rank ensures $\\mathbf{X}^T\\mathbf{X}$ is positive definite and thus invertible."
                    ),
                    make_q(
                        "What geometric role does the hat matrix $\\mathbf{H} = \\mathbf{X}(\\mathbf{X}^T \\mathbf{X})^{-1} \\mathbf{X}^T$ play?",
                        [
                            "It orthogonal-projects target $\\mathbf{y}$ onto the column space of $\\mathbf{X}$ ($\\,\\hat{\\mathbf{y}} = \\mathbf{H}\\mathbf{y}\\,)$",
                            "It inverts the covariance matrix",
                            "It computes feature cross-correlations",
                            "It normalizes features to zero mean"
                        ], 0,
                        "$\\mathbf{H}$ satisfies $\\mathbf{H}^2 = \\mathbf{H}$ (idempotent) and $\\mathbf{H}^T = \\mathbf{H}$ (symmetric), the definition of orthogonal projection."
                    )
                ]
            },
            {
                "heading": "Section 4: Goodness of Fit and Regularization",
                "questions": [
                    make_q(
                        "In an evaluation, $\\text{SSE} = 25$ and $\\text{SST} = 100$. Compute the coefficient of determination $R^2$.",
                        ["$0.75$", "$0.25$", "$0.50$", "$0.80$"], 0,
                        "$R^2 = 1 - \\frac{\\text{SSE}}{\\text{SST}} = 1 - \\frac{25}{100} = 0.75$."
                    ),
                    make_q(
                        "How does Ridge regression ($L_2$ penalty) resolve multicollinearity when $\\mathbf{X}^T\\mathbf{X}$ is ill-conditioned?",
                        [
                            "It adds $\\lambda \\mathbf{I}$ to $\\mathbf{X}^T\\mathbf{X}$, guaranteeing invertibility: $(\\mathbf{X}^T\\mathbf{X} + \\lambda\\mathbf{I})^{-1}$",
                            "It drops half the features automatically",
                            "It sets all correlated weights to zero",
                            "It eliminates the bias term"
                        ], 0,
                        "Adding $\\lambda > 0$ along the diagonal shifts all eigenvalues up by $\\lambda$, making the matrix well-conditioned."
                    ),
                    make_q(
                        "If $R^2 = 0.64$ in simple linear regression, what is the magnitude of the Pearson correlation coefficient $|r|$?",
                        ["$0.80$", "$0.64$", "$0.32$", "$0.40$"], 0,
                        "In simple bivariate regression, $R^2 = r^2 \\Rightarrow |r| = \\sqrt{0.64} = 0.80$."
                    )
                ]
            }
        ]
    },

    # --------------------------------------------------------------------------
    # MATH FOR AI 7.01: Logistic Regression and Classification
    # --------------------------------------------------------------------------
    {
        "track": "mathai",
        "num": "7.01",
        "slug": "logistic-regression-and-classification",
        "title": "Logistic Regression and Classification",
        "sections": [
            {
                "heading": "Section 1: The Odds Ratio and Logit Formulation",
                "questions": [
                    make_q(
                        "If a classifier predicts probability $p = 0.80$ for disease occurrence, what are the odds of having the disease?",
                        ["$4.0$", "$0.25$", "$0.80$", "$5.0$"], 0,
                        "$\\text{Odds} = \\frac{p}{1 - p} = \\frac{0.80}{0.20} = 4.0$ (or $4\\text{ to }1$)."
                    ),
                    make_q(
                        "Compute the log-odds (logit) value when probability $p = 0.50$.",
                        ["$0.0$", "$1.0$", "$0.5$", "$-1.0$"], 0,
                        "$\\text{logit}(0.5) = \\ln\\left(\\frac{0.5}{0.5}\\right) = \\ln(1) = 0.0$."
                    ),
                    make_q(
                        "If a logistic model has equation $\\ln\\left(\\frac{p}{1-p}\\right) = 2.0$, find the predicted probability $p$.",
                        ["$\\frac{e^2}{1 + e^2} \\approx 0.88$", "$\\frac{1}{2} = 0.50$", "$\\frac{2}{3} \\approx 0.67$", "$0.95$"], 0,
                        "Inverting logit: $p = \\sigma(2.0) = \\frac{e^2}{1 + e^2} = \\frac{7.389}{8.389} \\approx 0.88$."
                    )
                ]
            },
            {
                "heading": "Section 2: Binary Cross-Entropy Loss",
                "questions": [
                    make_q(
                        "Calculate the binary cross-entropy loss $L = -[y\\ln\\hat{y} + (1-y)\\ln(1-\\hat{y})]$ for a sample where true label $y = 1$ and predicted probability $\\hat{y} = 0.90$.",
                        ["$-\\ln(0.90) \\approx 0.105$", "$-\\ln(0.10) \\approx 2.30$", "$0.90$", "$0.0$"], 0,
                        "When $y = 1$: $L = -1\\ln(0.90) - 0 = -\\ln(0.90) \\approx 0.105$."
                    ),
                    make_q(
                        "What is the derivative of the binary cross-entropy loss with respect to the pre-activation logit $z$, where $\\hat{y} = \\sigma(z)$?",
                        ["$\\hat{y} - y$", "$\\hat{y}(1 - \\hat{y})$", "$y - \\hat{y}$", "$\\frac{\\hat{y} - y}{\\hat{y}(1 - \\hat{y})}$"], 0,
                        "Remarkably clean: $\\frac{\\partial L}{\\partial z} = \\frac{\\partial L}{\\partial \\hat{y}} \\frac{\\partial \\hat{y}}{\\partial z} = -\\left(\\frac{y}{\\hat{y}} - \\frac{1-y}{1-\\hat{y}}\\right) \\hat{y}(1-\\hat{y}) = \\hat{y} - y$."
                    ),
                    make_q(
                        "What happens to the cross-entropy loss as $\\hat{y} \\to 0$ when true label is $y = 1$?",
                        ["It approaches $+\\infty$, heavily penalizing confident wrong predictions", "It approaches zero", "It oscillates around 1", "It equals the pre-activation logit"], 0,
                        "$L = -\\ln(\\hat{y})$. As $\\hat{y} \\to 0$, $-\\ln(\\hat{y}) \\to +\\infty$."
                    )
                ]
            },
            {
                "heading": "Section 3: The Confusion Matrix and Core Metrics",
                "questions": [
                    make_q(
                        "A diagnostic model reports $TP = 70, TN = 20, FP = 5, FN = 5$. Compute the Accuracy.",
                        ["$90\\%$", "$85\\%$", "$93.3\\%$", "$75\\%$"], 0,
                        "$\\text{Accuracy} = \\frac{TP + TN}{TP + TN + FP + FN} = \\frac{70 + 20}{100} = 90\\%$."
                    ),
                    make_q(
                        "Using the same counts ($TP = 70, FP = 5, FN = 5$), calculate the model's Precision.",
                        ["$\\frac{70}{75} \\approx 93.3\\%$", "$\\frac{70}{70+5} = 90\\%$", "$\\frac{70}{100} = 70\\%$", "$\\frac{75}{100} = 75\\%$"], 0,
                        "$\\text{Precision} = \\frac{TP}{TP + FP} = \\frac{70}{75} \\approx 93.3\\%$."
                    ),
                    make_q(
                        "Calculate the Recall (Sensitivity) for the model above.",
                        ["$\\frac{70}{75} \\approx 93.3\\%$", "$\\frac{70}{90} \\approx 77.8\\%$", "$\\frac{5}{75} \\approx 6.7\\%$", "$85\\%$"], 0,
                        "$\\text{Recall} = \\frac{TP}{TP + FN} = \\frac{70}{70 + 5} = \\frac{70}{75} \\approx 93.3\\%$."
                    )
                ]
            },
            {
                "heading": "Section 4: The $F_1$-Score, Thresholding and ROC-AUC",
                "questions": [
                    make_q(
                        "Compute the $F_1$-score for a model having Precision $= 0.80$ and Recall $= 0.60$.",
                        ["$\\frac{2(0.8)(0.6)}{0.8 + 0.6} \\approx 0.686$", "$0.700$", "$0.480$", "$0.750$"], 0,
                        "$F_1$ is the harmonic mean: $2 \\frac{P \\cdot R}{P + R} = \\frac{2(0.48)}{1.40} = \\frac{0.96}{1.40} \\approx 0.686$."
                    ),
                    make_q(
                        "If you lower the classification probability threshold from $0.5$ to $0.2$, what is the typical effect on Precision and Recall?",
                        [
                            "Recall increases (fewer false negatives), while Precision typically decreases (more false alarms)",
                            "Precision increases while Recall decreases",
                            "Both metrics increase simultaneously",
                            "Neither metric changes"
                        ], 0,
                        "A lower threshold flags more samples positive: catches more real cases (high Recall), but flags more false alarms (lower Precision)."
                    ),
                    make_q(
                        "What does an Area Under the ROC Curve (ROC-AUC) of $0.50$ indicate about a classifier?",
                        [
                            "The model has no discriminative ability (equivalent to random guessing)",
                            "The model is a perfect classifier",
                            "The model achieves $50\\%$ precision at all thresholds",
                            "The model is inverted"
                        ], 0,
                        "The diagonal line from $(0,0)$ to $(1,1)$ represents random guessing and has area under the curve $= 0.50$."
                    )
                ]
            }
        ]
    },

    # --------------------------------------------------------------------------
    # MATH FOR AI 8.01: PCA and Dimensionality Reduction
    # --------------------------------------------------------------------------
    {
        "track": "mathai",
        "num": "8.01",
        "slug": "pca-and-dimensionality-reduction",
        "title": "PCA and Dimensionality Reduction",
        "sections": [
            {
                "heading": "Section 1: Data Centering and the Covariance Matrix",
                "questions": [
                    make_q(
                        "Why must data features be centered (subtracting feature means) prior to performing Principal Component Analysis?",
                        [
                            "So the first principal component aligns with the axis of maximum variance rather than the offset from origin",
                            "To make the data non-linear",
                            "To ensure all eigenvalues are equal to 1",
                            "To reduce the matrix dimension"
                        ], 0,
                        "Without centering, the first component simply points toward the data mean rather than capturing internal variation."
                    ),
                    make_q(
                        "For a zero-mean data matrix $\\mathbf{X} \\in \\mathbf{R}^{N \\times D}$, state the sample covariance matrix $\\mathbf{\\Sigma}$.",
                        [
                            "$\\mathbf{\\Sigma} = \\frac{1}{N - 1} \\mathbf{X}^T \\mathbf{X}$",
                            "$\\mathbf{\\Sigma} = \\frac{1}{D - 1} \\mathbf{X} \\mathbf{X}^T$",
                            "$\\mathbf{\\Sigma} = \\mathbf{X}^T \\mathbf{X}$",
                            "$\\mathbf{\\Sigma} = \\frac{1}{N} \\mathbf{X}^2$"
                        ], 0,
                        "Each element $\\Sigma_{ij} = \\frac{1}{N-1}\\sum_k X_{ki} X_{kj}$, which in matrix form is $\\frac{1}{N-1}\\mathbf{X}^T\\mathbf{X}$."
                    ),
                    make_q(
                        "What is the mathematical symmetry property of the covariance matrix $\\mathbf{\\Sigma}$?",
                        [
                            "It is symmetric and positive semi-definite (all eigenvalues $\\lambda_i \\geq 0$)",
                            "It is skew-symmetric",
                            "It is an orthogonal matrix",
                            "It has negative trace"
                        ], 0,
                        "$\\mathbf{\\Sigma}^T = \\left(\\frac{1}{N-1}\\mathbf{X}^T\\mathbf{X}\\right)^T = \\frac{1}{N-1}\\mathbf{X}^T\\mathbf{X} = \\mathbf{\\Sigma}$, and variance is always non-negative."
                    )
                ]
            },
            {
                "heading": "Section 2: Eigenvalues, Eigenvectors and Variance Maximization",
                "questions": [
                    make_q(
                        "A $2 \\times 2$ covariance matrix has entries $\\Sigma_{11} = 4, \\, \\Sigma_{22} = 1$, and covariance $\\Sigma_{12} = \\Sigma_{21} = 2$. Find its eigenvalues.",
                        ["$\\lambda_1 = 5, \\quad \\lambda_2 = 0$", "$\\lambda_1 = 4, \\quad \\lambda_2 = 1$", "$\\lambda_1 = 3, \\quad \\lambda_2 = 2$", "$\\lambda_1 = 2, \\quad \\lambda_2 = 2$"], 0,
                        "$\\det(\\mathbf{\\Sigma} - \\lambda\\mathbf{I}) = (4-\\lambda)(1-\\lambda) - 4 = \\lambda^2 - 5\\lambda = \\lambda(\\lambda - 5) = 0 \\Rightarrow \\lambda = 5, 0$."
                    ),
                    make_q(
                        "What is the geometric meaning of the first eigenvector $\\mathbf{v}_1$ corresponding to largest eigenvalue $\\lambda_1$?",
                        [
                            "The direction along which the data exhibits maximum variance",
                            "The direction perpendicular to all data points",
                            "The direction with the lowest information content",
                            "The vector of class centroids"
                        ], 0,
                        "PCA seeks $\\max \\mathbf{v}^T \\mathbf{\\Sigma} \\mathbf{v}$ subject to $\\|\\mathbf{v}\\| = 1$. The solution is the eigenvector of $\\lambda_{\\max}$."
                    ),
                    make_q(
                        "If $\\mathbf{v}$ is an eigenvector of $\\mathbf{\\Sigma}$ with eigenvalue $\\lambda$, what is the variance of data projected onto $\\mathbf{v}$?",
                        ["$\\lambda$", "$\\sqrt{\\lambda}$", "$\\lambda^2$", "$1$"], 0,
                        "$\\text{Var}(\\mathbf{X}\\mathbf{v}) = \\mathbf{v}^T \\mathbf{\\Sigma} \\mathbf{v} = \\mathbf{v}^T (\\lambda\\mathbf{v}) = \\lambda \\|\\mathbf{v}\\|^2 = \\lambda$."
                    )
                ]
            },
            {
                "heading": "Section 3: Explained Variance and Scree Analysis",
                "questions": [
                    make_q(
                        "A dataset has eigenvalues $\\lambda_1 = 70, \\lambda_2 = 20, \\lambda_3 = 10$. What percentage of total variance is explained by the first two principal components?",
                        ["$90\\%$", "$70\\%$", "$80\\%$", "$20\\%$"], 0,
                        "Total variance $= 70 + 20 + 10 = 100$. Explained $= \\frac{70 + 20}{100} = 90\\%$."
                    ),
                    make_q(
                        "How is an 'elbow' in a scree plot (eigenvalues plotted against component index) used in practice?",
                        [
                            "To select the optimal cutoff $k$ where adding further components yields diminishing returns",
                            "To detect outliers in the target labels",
                            "To determine the learning rate for gradient descent",
                            "To test for multicollinearity"
                        ], 0,
                        "The elbow point separates significant signal dimensions from noise dimensions."
                    ),
                    make_q(
                        "If a dataset has $100$ features and you retain the top $10$ principal components, by what percentage is feature dimensionality reduced?",
                        ["$90\\%$", "$10\\%$", "$50\\%$", "$80\\%$"], 0,
                        "Reduction is from 100 to 10 features: $\\frac{100 - 10}{100} = 90\\%$."
                    )
                ]
            },
            {
                "heading": "Section 4: SVD Connection and Applications",
                "questions": [
                    make_q(
                        "Given the Singular Value Decomposition $\\mathbf{X} = \\mathbf{U}\\mathbf{S}\\mathbf{V}^T$, how are the principal component directions $\\mathbf{v}_i$ directly obtained?",
                        [
                            "As the right singular vectors (columns of $\\mathbf{V}$)",
                            "As the left singular vectors (columns of $\\mathbf{U}$)",
                            "As the diagonal elements of $\\mathbf{S}$",
                            "As the eigenvalues of $\\mathbf{U}$"
                        ], 0,
                        "$\\mathbf{X}^T\\mathbf{X} = \\mathbf{V}\\mathbf{S}\\mathbf{U}^T \\mathbf{U}\\mathbf{S}\\mathbf{V}^T = \\mathbf{V}\\mathbf{S}^2\\mathbf{V}^T$, proving columns of $\\mathbf{V}$ are eigenvectors of $\\mathbf{X}^T\\mathbf{X}$."
                    ),
                    make_q(
                        "What is the mathematical relation between singular values $s_i$ of $\\mathbf{X}$ and eigenvalues $\\lambda_i$ of covariance matrix $\\mathbf{\\Sigma}$?",
                        [
                            "$\\lambda_i = \\frac{s_i^2}{N - 1}$",
                            "$\\lambda_i = s_i$",
                            "$\\lambda_i = \\sqrt{s_i}$",
                            "$\\lambda_i = s_i (N - 1)$"
                        ], 0,
                        "Since $\\mathbf{\\Sigma} = \\frac{1}{N-1}\\mathbf{X}^T\\mathbf{X}$ and eigenvalues of $\\mathbf{X}^T\\mathbf{X}$ are $s_i^2$, $\\lambda_i = \\frac{s_i^2}{N-1}$."
                    ),
                    make_q(
                        "Name a major practical application of PCA in image processing and computer vision.",
                        [
                            "Eigenfaces: facial compression and feature representation in lower-dimensional eigenspace",
                            "Image sharpening through edge convolution",
                            "Color palette inversion",
                            "Bilinear image interpolation"
                        ], 0,
                        "Eigenfaces (Turk and Pentland) represents high-resolution faces as linear combinations of dominant eigenvectors."
                    )
                ]
            }
        ]
    }
]

# ==============================================================================
# COMPILATION AND 4-PAGE VALIDATION ENGINE
# ==============================================================================

def get_pdf_pages(pdf_path):
    if not os.path.exists(pdf_path):
        return 0
    with open(pdf_path, "rb") as f:
        data = f.read()
    return len(re.findall(rb"/Type\s*/Page\b", data))

def main():
    print("=" * 70)
    print("ClipSAT: Compiling 16 Master 4-Page Worksheets with Rendered Math")
    print("=" * 70)

    all_pass = True

    for topic in TOPICS:
        track = topic["track"]
        num = topic["num"]
        slug = topic["slug"]
        title = topic["title"]
        
        # 1. Save JSON to tools/worksheet_gen/topics/<track>/
        track_topics_dir = os.path.join(TOPICS_DIR, track)
        os.makedirs(track_topics_dir, exist_ok=True)
        json_filename = f"{num}-{slug}.json"
        json_path = os.path.join(track_topics_dir, json_filename)
        with open(json_path, "w", encoding="utf-8") as f:
            json.dump(topic, f, ensure_ascii=False, indent=2)

        # 2. Compile via generate.py
        cmd = [
            sys.executable,
            GENERATE_PY,
            json_path,
            "--out", DOWNLOADS_DIR,
            "--manifest"
        ]
        res = subprocess.run(cmd, capture_output=True, text=True, env=dict(os.environ, MPLCONFIGDIR="/tmp/mpl"))
        if res.returncode != 0:
            print(f"❌ Error compiling {track} {num}:")
            print(res.stderr)
            all_pass = False
            continue

        # 3. Check page counts
        ws_pdf = os.path.join(DOWNLOADS_DIR, track, f"{num}-{slug}-worksheet.pdf")
        ak_pdf = os.path.join(DOWNLOADS_DIR, track, f"{num}-{slug}-answerkey.pdf")

        ws_pages = get_pdf_pages(ws_pdf)
        ak_pages = get_pdf_pages(ak_pdf)

        status_icon = "✓" if ws_pages == 4 else "⚠"
        print(f"  {status_icon} [{track.upper()}] {num} {title[:32]:32} -> WS: {ws_pages} pages, AK: {ak_pages} pages")
        if ws_pages != 4:
            print(f"    WARNING: Worksheet page count is {ws_pages} (expected 4)!")
            all_pass = False

    print("=" * 70)
    if all_pass:
        print("🏆 SUCCESS: All 16 worksheets compiled with rendered math and exactly 4 pages!")
    else:
        print("Note: Review any non-4 page warnings above.")
    print("=" * 70)

if __name__ == "__main__":
    main()
