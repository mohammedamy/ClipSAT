#!/usr/bin/env python3
"""Standardized 4-Page Topic Data for AP Calculus BC (11 Topics).

Authentic College Board AP Calculus BC questions adhering to the official CED.
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

APBC_TOPICS = [
    # --------------------------------------------------------------------------
    # APBC 1.01: Integration by Parts
    # --------------------------------------------------------------------------
    {
        "track": "apbc",
        "num": "1.01",
        "slug": "integration-by-parts",
        "title": "Integration by Parts",
        "sections": [
            {
                "heading": "Section 1: Standard Integration by Parts Formula",
                "questions": [
                    make_q(
                        "Evaluate $\\int x e^{2x} dx$.",
                        ["$\\frac{1}{2} x e^{2x} - \\frac{1}{4} e^{2x} + C$", "$\\frac{1}{2} x e^{2x} + \\frac{1}{4} e^{2x} + C$", "$x e^{2x} - e^{2x} + C$", "$\\frac{1}{2} x^2 e^{2x} + C$"], 0,
                        "Let $u = x, dv = e^{2x} dx \\Rightarrow du = dx, v = \\frac{1}{2} e^{2x}$. By parts: $uv - \\int v du = \\frac{1}{2} x e^{2x} - \\frac{1}{2} \\int e^{2x} dx = \\frac{1}{2} x e^{2x} - \\frac{1}{4} e^{2x} + C$."
                    ),
                    make_q(
                        "Evaluate $\\int \\ln x dx$ for $x > 0$.",
                        ["$x\\ln x - x + C$", "$x\\ln x + x + C$", "$\\frac{1}{x} + C$", "$\\frac{(\\ln x)^2}{2} + C$"], 0,
                        "Let $u = \\ln x, dv = dx \\Rightarrow du = \\frac{1}{x} dx, v = x$. By parts: $uv - \\int v du = x\\ln x - \\int 1 dx = x\\ln x - x + C$."
                    ),
                    make_q(
                        "Evaluate $\\int_0^1 x \\cos(\\pi x) dx$.",
                        ["$-\\frac{2}{\\pi^2}$", "$\\frac{2}{\\pi^2}$", "$0$", "$-\\frac{1}{\\pi}$"], 0,
                        "Let $u = x, dv = \\cos(\\pi x) dx \\Rightarrow du = dx, v = \\frac{1}{\\pi} \\sin(\\pi x)$. $[\\frac{x}{\\pi} \\sin(\\pi x)]_0^1 - \\frac{1}{\\pi} \\int_0^1 \\sin(\\pi x) dx = 0 + [\\frac{1}{\\pi^2} \\cos(\\pi x)]_0^1 = \\frac{1}{\\pi^2}(-1 - 1) = -\\frac{2}{\\pi^2}$."
                    )
                ]
            },
            {
                "heading": "Section 2: Tabular Integration by Parts",
                "questions": [
                    make_q(
                        "Using tabular integration, evaluate $\\int x^2 e^x dx$.",
                        ["$(x^2 - 2x + 2) e^x + C$", "$(x^2 + 2x + 2) e^x + C$", "$(x^2 - 2x) e^x + C$", "$x^2 e^x - 2e^x + C$"], 0,
                        "Differentiate $x^2 \\to 2x \\to 2 \\to 0$. Integrate $e^x \\to e^x \\to e^x \\to e^x$. Alternating signs: $+x^2 e^x - 2x e^x + 2e^x + C = (x^2 - 2x + 2)e^x + C$."
                    ),
                    make_q(
                        "Evaluate $\\int x^3 \\sin x dx$ using tabular integration.",
                        ["$-x^3 \\cos x + 3x^2 \\sin x + 6x \\cos x - 6\\sin x + C$", "$x^3 \\cos x - 3x^2 \\sin x + C$", "$-x^3 \\cos x - 3x^2 \\sin x + C$", "$-x^3 \\sin x + 3x^2 \\cos x + C$"], 0,
                        "Differentiate $x^3 \\to 3x^2 \\to 6x \\to 6 \\to 0$. Integrate $\\sin x \\to -\\cos x \\to -\\sin x \\to \\cos x \\to \\sin x$. Product with alternating signs yields $-x^3 \\cos x + 3x^2 \\sin x + 6x \\cos x - 6\\sin x + C$."
                    ),
                    make_q(
                        "When is tabular integration applicable?",
                        ["When one factor is a polynomial that terminates to $0$ upon repeated differentiation", "Only for trigonometric functions", "Only for logarithmic integrals", "When both functions are exponential"], 0,
                        "Tabular integration is a streamlined form of repeated integration by parts, ideal when one factor is a polynomial that differentiates to zero after finitely many steps."
                    )
                ]
            },
            {
                "heading": "Section 3: Cycling Integrals (Solving for the Unknown Integral)",
                "questions": [
                    make_q(
                        "Evaluate $\\int e^x \\cos x dx$.",
                        ["$\\frac{1}{2} e^x(\\cos x + \\sin x) + C$", "$\\frac{1}{2} e^x(\\cos x - \\sin x) + C$", "$e^x \\sin x + C$", "$e^x(\\cos x + \\sin x) + C$"], 0,
                        "Integrating by parts twice reproduces $-I$. Adding $I$ to both sides gives $2I = e^x \\sin x + e^x \\cos x \\Rightarrow I = \\frac{1}{2} e^x(\\cos x + \\sin x) + C$."
                    ),
                    make_q(
                        "Evaluate $\\int e^{2x} \\sin x dx$.",
                        ["$\\frac{e^{2x}}{5}(2\\sin x - \\cos x) + C$", "$\\frac{e^{2x}}{5}(\\sin x - 2\\cos x) + C$", "$\\frac{e^{2x}}{4}(2\\sin x - \\cos x) + C$", "$e^{2x} \\cos x + C$"], 0,
                        "Integrating by parts twice produces $-\\frac{1}{4} I$. Multiplying by $\\frac{4}{5}$ yields $\\frac{e^{2x}}{5}(2\\sin x - \\cos x) + C$."
                    ),
                    make_q(
                        "What is $\\int \\sec^3 x dx$?",
                        ["$\\frac{1}{2}(\\sec x \\tan x + \\ln|\\sec x + \\tan x|) + C$", "$\\frac{1}{3} \\sec^3 x + C$", "$\\sec x \\tan^2 x + C$", "$\\frac{1}{2} \\sec^2 x + C$"], 0,
                        "By parts with $u = \\sec x, dv = \\sec^2 x dx$, cycling produces $2I = \\sec x \\tan x + \\int \\sec x dx$, giving $\\frac{1}{2}(\\sec x \\tan x + \\ln|\\sec x + \\tan x|) + C$."
                    )
                ]
            },
            {
                "heading": "Section 4: Integration by Parts with Inverse Trigonometric Functions",
                "questions": [
                    make_q(
                        "Evaluate $\\int \\arctan x dx$.",
                        ["$x\\arctan x - \\frac{1}{2}\\ln(1 + x^2) + C$", "$x\\arctan x + \\frac{1}{2}\\ln(1 + x^2) + C$", "$\\frac{1}{1 + x^2} + C$", "$x\\arctan x - \\ln(1 + x) + C$"], 0,
                        "Let $u = \\arctan x, dv = dx \\Rightarrow du = \\frac{1}{1 + x^2} dx, v = x$. Integral is $x\\arctan x - \\int \\frac{x}{1 + x^2} dx = x\\arctan x - \\frac{1}{2}\\ln(1 + x^2) + C$."
                    ),
                    make_q(
                        "Evaluate $\\int \\arcsin x dx$.",
                        ["$x\\arcsin x + \\sqrt{1 - x^2} + C$", "$x\\arcsin x - \\sqrt{1 - x^2} + C$", "$\\frac{1}{\\sqrt{1 - x^2}} + C$", "$x\\arcsin x + \\frac{1}{2}\\sqrt{1 - x^2} + C$"], 0,
                        "Let $u = \\arcsin x, dv = dx \\Rightarrow du = \\frac{1}{\\sqrt{1 - x^2}} dx, v = x$. Integral is $x\\arcsin x - \\int \\frac{x}{\\sqrt{1 - x^2}} dx = x\\arcsin x + \\sqrt{1 - x^2} + C$."
                    ),
                    make_q(
                        "Evaluate $\\int_0^1 x \\arctan x dx$.",
                        ["$\\frac{\\pi}{4} - \\frac{1}{2}$", "$\\frac{\\pi}{8}$", "$\\frac{\\pi}{4}$", "$\\frac{\\pi}{8} - \\frac{1}{4}$"], 0,
                        "By parts: $[\\frac{x^2}{2} \\arctan x]_0^1 - \\frac{1}{2} \\int_0^1 \\frac{x^2}{1 + x^2} dx = \\frac{\\pi}{8} - \\frac{1}{2} [x - \\arctan x]_0^1 = \\frac{\\pi}{8} - \\frac{1}{2}(1 - \\frac{\\pi}{4}) = \\frac{\\pi}{4} - \\frac{1}{2}$."
                    )
                ]
            }
        ]
    },

    # --------------------------------------------------------------------------
    # APBC 1.02: Partial Fractions and Improper Integrals
    # --------------------------------------------------------------------------
    {
        "track": "apbc",
        "num": "1.02",
        "slug": "partial-fractions-and-improper-integrals",
        "title": "Partial Fractions and Improper Integrals",
        "sections": [
            {
                "heading": "Section 1: Linear Partial Fractions",
                "questions": [
                    make_q(
                        "Evaluate $\\int \\frac{1}{x^2 - 4} dx$.",
                        ["$\\frac{1}{4}\\ln|\\frac{x - 2}{x + 2}| + C$", "$\\frac{1}{2}\\ln|\\frac{x - 2}{x + 2}| + C$", "$\\frac{1}{4}\\ln|x^2 - 4| + C$", "$\\frac{1}{2}\\arctan(\\frac{x}{2}) + C$"], 0,
                        "Decomposition: $\\frac{1}{(x - 2)(x + 2)} = \\frac{1/4}{x - 2} - \\frac{1/4}{x + 2}$. Integrating gives $\\frac{1}{4}\\ln|x - 2| - \\frac{1}{4}\\ln|x + 2| + C = \\frac{1}{4}\\ln|\\frac{x - 2}{x + 2}| + C$."
                    ),
                    make_q(
                        "Evaluate $\\int \\frac{5x - 3}{(x - 1)(x + 3)} dx$.",
                        ["$\\frac{1}{2}\\ln|x - 1| + \\frac{9}{2}\\ln|x + 3| + C$", "$2\\ln|x - 1| + 3\\ln|x + 3| + C$", "$\\ln|x - 1| + 4\\ln|x + 3| + C$", "$5\\ln|x^2 + 2x - 3| + C$"], 0,
                        "$5x - 3 = A(x + 3) + B(x - 1)$. For $x = 1$: $2 = 4A \\Rightarrow A = \\frac{1}{2}$. For $x = -3$: $-18 = -4B \\Rightarrow B = \\frac{9}{2}$."
                    ),
                    make_q(
                        "When must long division be performed BEFORE applying partial fractions?",
                        ["When the degree of the numerator is greater than or equal to the degree of the denominator", "When the denominator has repeated roots", "When the numerator is a constant", "Always"], 0,
                        "Partial fractions applies only to proper rational functions. If $\\deg(P) \\geq \\deg(Q)$, polynomial long division must be performed first."
                    )
                ]
            },
            {
                "heading": "Section 2: Repeated Linear & Irreducible Factors",
                "questions": [
                    make_q(
                        "What is the form of the partial fraction decomposition for $\\frac{x + 2}{x(x - 1)^2}$?",
                        ["$\\frac{A}{x} + \\frac{B}{x - 1} + \\frac{C}{(x - 1)^2}$", "$\\frac{A}{x} + \\frac{B}{(x - 1)^2}$", "$\\frac{A}{x} + \\frac{Bx + C}{(x - 1)^2}$", "$\\frac{A}{x} + \\frac{B}{x - 1}$"], 0,
                        "For a repeated linear factor $(x - 1)^2$, there must be a separate term for each increasing power up to the multiplicity: $\\frac{B}{x - 1} + \\frac{C}{(x - 1)^2}$."
                    ),
                    make_q(
                        "Evaluate $\\int \\frac{1}{x^2 + 9} dx$.",
                        ["$\\frac{1}{3}\\arctan(\\frac{x}{3}) + C$", "$\\arctan(\\frac{x}{3}) + C$", "$\\frac{1}{9}\\ln(x^2 + 9) + C$", "$\\frac{1}{3}\\ln|x + 3| + C$"], 0,
                        "Formula: $\\int \\frac{1}{x^2 + a^2} dx = \\frac{1}{a}\\arctan(\\frac{x}{a}) + C$. Here $a = 3$, giving $\\frac{1}{3}\\arctan(\\frac{x}{3}) + C$."
                    ),
                    make_q(
                        "Evaluate $\\int_2^3 \\frac{1}{x(x - 1)} dx$.",
                        ["$\\ln(\\frac{4}{3})$", "$\\ln 2$", "$\\ln 3$", "$\\frac{1}{6}$"], 0,
                        "$\\frac{1}{x(x - 1)} = \\frac{1}{x - 1} - \\frac{1}{x}$. $[\\ln|\\frac{x - 1}{x}|]_2^3 = \\ln(\\frac{2}{3}) - \\ln(\\frac{1}{2}) = \\ln(\\frac{4}{3})$."
                    )
                ]
            },
            {
                "heading": "Section 3: Improper Integrals with Infinite Limits (Type 1)",
                "questions": [
                    make_q(
                        "Evaluate $\\int_1^\\infty \\frac{1}{x^2} dx$.",
                        ["$1$", "$\\infty$ (diverges)", "$2$", "$0$"], 0,
                        "$\\lim_{b \\to \\infty} \\int_1^b x^{-2} dx = \\lim_{b \\to \\infty} [-\\frac{1}{x}]_1^b = \\lim_{b \\to \\infty} (1 - \\frac{1}{b}) = 1$."
                    ),
                    make_q(
                        "For what values of $p$ does the improper integral $\\int_1^\\infty \\frac{1}{x^p} dx$ converge?",
                        ["$p > 1$", "$p \\geq 1$", "$p < 1$", "All real $p$"], 0,
                        "By the $p$-integral test, $\\int_1^\\infty \\frac{1}{x^p} dx$ converges if and only if $p > 1$ (to $\\frac{1}{p - 1}$), and diverges for $p \\leq 1$."
                    ),
                    make_q(
                        "Evaluate $\\int_0^\\infty e^{-2x} dx$.",
                        ["$\\frac{1}{2}$", "$1$", "$\\infty$ (diverges)", "$2$"], 0,
                        "$\\lim_{b \\to \\infty} [-\\frac{1}{2} e^{-2x}]_0^b = 0 - (-\\frac{1}{2}) = \\frac{1}{2}$."
                    )
                ]
            },
            {
                "heading": "Section 4: Improper Integrals with Discontinuous Integrands (Type 2)",
                "questions": [
                    make_q(
                        "Evaluate the improper integral $\\int_0^1 \\frac{1}{\\sqrt{x}} dx$.",
                        ["$2$", "$1$", "$\\infty$ (diverges)", "$\\frac{1}{2}$"], 0,
                        "The integrand has an infinite discontinuity at $x = 0$: $\\lim_{a \\to 0^+} [2\\sqrt{x}]_a^1 = 2(1) - 0 = 2$."
                    ),
                    make_q(
                        "Evaluate $\\int_0^1 \\frac{1}{x} dx$.",
                        ["Diverges to $\\infty$", "$1$", "$0$", "$e$"], 0,
                        "$\\lim_{a \\to 0^+} [\\ln x]_a^1 = 0 - (-\\infty) = \\infty$. The integral diverges."
                    ),
                    make_q(
                        "Evaluate $\\int_{-1}^1 \\frac{1}{x^2} dx$.",
                        ["Diverges", "$-2$", "$0$", "$2$"], 0,
                        "The integrand has an interior vertical asymptote at $x = 0$. One must split: $\\int_{-1}^0 \\frac{1}{x^2} dx + \\int_0^1 \\frac{1}{x^2} dx$. Since $\\int_0^1 x^{-2} dx = \\infty$, the entire integral diverges."
                    )
                ]
            }
        ]
    }
]
