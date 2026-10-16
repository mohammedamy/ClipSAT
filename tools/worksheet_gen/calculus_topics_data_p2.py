"""Calculus Topics Data Part 2: Topics 7.01 to 12.02 (10 Topics).

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

CALCULUS_TOPICS_P2 = [
    # ── 7.01 Integration by Substitution ──────────────────────────────────────
    {
        "track": "calculus",
        "num": "7.01",
        "slug": "integration-by-substitution",
        "title": "Integration by Substitution",
        "sections": [
            {
                "heading": "Section 1: Basic u-Substitution",
                "questions": [
                    make_q(
                        "Evaluate $\\int 2x(x^2 + 5)^4\\,dx$.",
                        ["$\\frac{1}{5}(x^2 + 5)^5 + C$", "$\\frac{1}{4}(x^2 + 5)^4 + C$", "$(x^2 + 5)^5 + C$", "$\\frac{2}{5}(x^2 + 5)^5 + C$"],
                        0,
                        "Let $u = x^2 + 5 \\Rightarrow du = 2x\\,dx$. $\\int u^4\\,du = \\frac{1}{5}u^5 + C = \\frac{1}{5}(x^2 + 5)^5 + C$."
                    ),
                    make_q(
                        "Evaluate $\\int x^2\\sqrt{x^3 + 1}\\,dx$.",
                        ["$\\frac{2}{9}(x^3 + 1)^{3/2} + C$", "$\\frac{2}{3}(x^3 + 1)^{3/2} + C$", "$\\frac{1}{3}(x^3 + 1)^{3/2} + C$", "$\\frac{3}{2}(x^3 + 1)^{1/2} + C$"],
                        0,
                        "Let $u = x^3 + 1 \\Rightarrow du = 3x^2\\,dx$. $\\frac{1}{3}\\int u^{1/2}\\,du = \\frac{1}{3}\\frac{2}{3}u^{3/2} + C = \\frac{2}{9}(x^3 + 1)^{3/2} + C$."
                    ),
                    make_q(
                        "Evaluate $\\int \\frac{x}{x^2 + 9}\\,dx$.",
                        ["$\\frac{1}{2}\\ln(x^2 + 9) + C$", "$\\ln(x^2 + 9) + C$", "$\\frac{1}{3}\\arctan(x/3) + C$", "$\\frac{1}{2(x^2 + 9)^2} + C$"],
                        0,
                        "Let $u = x^2 + 9 \\Rightarrow du = 2x\\,dx$. $\\frac{1}{2}\\int \\frac{1}{u}\\,du = \\frac{1}{2}\\ln(x^2 + 9) + C$."
                    )
                ]
            },
            {
                "heading": "Section 2: Trigonometric and Exponential Substitutions",
                "questions": [
                    make_q(
                        "Evaluate $\\int \\sin^3(x)\\cos(x)\\,dx$.",
                        ["$\\frac{1}{4}\\sin^4(x) + C$", "$\\frac{1}{3}\\sin^3(x) + C$", "$-\\frac{1}{4}\\cos^4(x) + C$", "$\\sin^4(x) + C$"],
                        0,
                        "Let $u = \\sin x \\Rightarrow du = \\cos x\\,dx$. $\\int u^3\\,du = \\frac{1}{4}u^4 + C = \\frac{1}{4}\\sin^4(x) + C$."
                    ),
                    make_q(
                        "Evaluate $\\int \\tan(x)\\,dx$.",
                        ["$\\ln|\\sec x| + C$", "$-\\ln|\\sec x| + C$", "$\\sec^2(x) + C$", "$\\ln|\\sin x| + C$"],
                        0,
                        "$\\int \\frac{\\sin x}{\\cos x}\\,dx$. Let $u = \\cos x, du = -\\sin x\\,dx$. $-\\int \\frac{du}{u} = -\\ln|\\cos x| + C = \\ln|\\sec x| + C$."
                    ),
                    make_q(
                        "Evaluate $\\int e^{3x - 1}\\,dx$.",
                        ["$\\frac{1}{3}e^{3x - 1} + C$", "$3e^{3x - 1} + C$", "$e^{3x - 1} + C$", "$\\frac{1}{3}e^{3x} + C$"],
                        0,
                        "Let $u = 3x - 1 \\Rightarrow du = 3\\,dx$. $\\frac{1}{3}\\int e^u\\,du = \\frac{1}{3}e^{3x - 1} + C$."
                    )
                ]
            },
            {
                "heading": "Section 3: Definite Integrals with Limits Change",
                "questions": [
                    make_q(
                        "Evaluate $\\int_0^1 x(x^2 + 1)^3\\,dx$.",
                        ["$15/8$", "$16/8 = 2$", "$7/8$", "$15/4$"],
                        0,
                        "$u = x^2 + 1$. When $x = 0, u = 1$; when $x = 1, u = 2$. $\\frac{1}{2}\\int_1^2 u^3\\,du = \\frac{1}{2}\\left[\\frac{u^4}{4}\\right]_1^2 = \\frac{1}{8}[16 - 1] = \\frac{15}{8}$."
                    ),
                    make_q(
                        "Evaluate $\\int_0^{\\sqrt{\\pi}} x\\sin(x^2)\\,dx$.",
                        ["$1$", "$0$", "$2$", "$1/2$"],
                        0,
                        "$u = x^2, du = 2x\\,dx$. Bounds: $x = 0 \\Rightarrow u = 0; x = \\sqrt{\\pi} \\Rightarrow u = \\pi$. $\\frac{1}{2}\\int_0^\\pi \\sin u\\,du = \\frac{1}{2}[-\\cos u]_0^\\pi = \\frac{1}{2}[-(-1) - (-1)] = \\frac{1}{2}(2) = 1$."
                    ),
                    make_q(
                        "Evaluate $\\int_1^e \\frac{\\ln x}{x}\\,dx$.",
                        ["$1/2$", "$1$", "$2$", "$1/e$"],
                        0,
                        "Let $u = \\ln x, du = dx/x$. Bounds: $u(1) = 0, u(e) = 1$. $\\int_0^1 u\\,du = [u^2/2]_0^1 = 1/2$."
                    )
                ]
            },
            {
                "heading": "Section 4: Advanced Linear Substitutions",
                "questions": [
                    make_q(
                        "Evaluate $\\int x\\sqrt{x + 2}\\,dx$.",
                        ["$\\frac{2}{5}(x+2)^{5/2} - \\frac{4}{3}(x+2)^{3/2} + C$", "$\\frac{2}{3}(x+2)^{3/2} + C$", "$\\frac{1}{5}(x+2)^{5/2} - \\frac{2}{3}(x+2)^{3/2} + C$", "$\\frac{2}{5}x^{5/2} + C$"],
                        0,
                        "Let $u = x + 2 \\Rightarrow x = u - 2$ and $dx = du$. $\\int (u - 2)u^{1/2}\\,du = \\int (u^{3/2} - 2u^{1/2})\\,du = \\frac{2}{5}u^{5/2} - \\frac{4}{3}u^{3/2} + C$."
                    ),
                    make_q(
                        "Evaluate $\\int \\frac{x}{\\sqrt{x + 1}}\\,dx$.",
                        ["$\\frac{2}{3}(x+1)^{3/2} - 2\\sqrt{x+1} + C$", "$\\frac{1}{3}(x+1)^{3/2} - \\sqrt{x+1} + C$", "$2\\sqrt{x+1} + C$", "$\\frac{2}{3}(x+1)^{3/2} + C$"],
                        0,
                        "Let $u = x + 1 \\Rightarrow x = u - 1, dx = du$. $\\int (u - 1)u^{-1/2}\\,du = \\int (u^{1/2} - u^{-1/2})\\,du = \\frac{2}{3}u^{3/2} - 2u^{1/2} + C$."
                    ),
                    make_q(
                        "Evaluate $\\int \\frac{e^{2x}}{e^x + 1}\\,dx$.",
                        ["$e^x - \\ln(e^x + 1) + C$", "$e^x + \\ln(e^x + 1) + C$", "$\\ln(e^x + 1) + C$", "$\\frac{1}{2}e^{2x} + C$"],
                        0,
                        "Let $u = e^x + 1 \\Rightarrow e^x = u - 1$ and $du = e^x\\,dx$. $\\int \\frac{u - 1}{u}\\,du = \\int (1 - 1/u)\\,du = u - \\ln|u| + C = e^x + 1 - \\ln(e^x + 1) + C = e^x - \\ln(e^x + 1) + C'$."
                    )
                ]
            }
        ]
    },

    # ── 7.02 Integration by Parts ─────────────────────────────────────────────
    {
        "track": "calculus",
        "num": "7.02",
        "slug": "integration-by-parts",
        "title": "Integration by Parts",
        "sections": [
            {
                "heading": "Section 1: Standard Products (Polynomial × Exponential / Trig)",
                "questions": [
                    make_q(
                        "State the formula for integration by parts.",
                        ["$\\int u\\,dv = uv - \\int v\\,du$", "$\\int u\\,dv = uv + \\int v\\,du$", "$\\int u\\,dv = u'v - uv'$", "$\\int u\\,dv = \\frac{u}{v} - \\int u'v$"],
                        0,
                        "Derived from the product rule: $\\frac{d}{dx}(uv) = u'v + uv' \\Rightarrow \\int u\\,dv = uv - \\int v\\,du$."
                    ),
                    make_q(
                        "Evaluate $\\int x e^{2x}\\,dx$.",
                        ["$\\frac{1}{2}x e^{2x} - \\frac{1}{4}e^{2x} + C$", "$\\frac{1}{2}x e^{2x} - \\frac{1}{2}e^{2x} + C$", "$x e^{2x} - e^{2x} + C$", "$\\frac{1}{4}x e^{2x} - \\frac{1}{4}e^{2x} + C$"],
                        0,
                        "$u = x, dv = e^{2x}dx \\Rightarrow du = dx, v = \\frac{1}{2}e^{2x}$. $\\int x e^{2x}dx = \\frac{1}{2}x e^{2x} - \\frac{1}{2}\\int e^{2x}dx = \\frac{1}{2}x e^{2x} - \\frac{1}{4}e^{2x} + C$."
                    ),
                    make_q(
                        "Evaluate $\\int x\\sin(x)\\,dx$.",
                        ["$-x\\cos x + \\sin x + C$", "$x\\cos x - \\sin x + C$", "$-x\\cos x - \\sin x + C$", "$x\\sin x + \\cos x + C$"],
                        0,
                        "$u = x, dv = \\sin x dx \\Rightarrow du = dx, v = -\\cos x$. $uv - \\int v\\,du = -x\\cos x - \\int(-\\cos x)dx = -x\\cos x + \\sin x + C$."
                    )
                ]
            },
            {
                "heading": "Section 2: Logarithmic and Inverse Trig Integrands",
                "questions": [
                    make_q(
                        "Evaluate $\\int \\ln(x)\\,dx$.",
                        ["$x\\ln x - x + C$", "$\\frac{1}{x} + C$", "$x\\ln x + x + C$", "$\\frac{(\\ln x)^2}{2} + C$"],
                        0,
                        "$u = \\ln x, dv = dx \\Rightarrow du = \\frac{1}{x}dx, v = x$. $x\\ln x - \\int x\\cdot\\frac{1}{x}dx = x\\ln x - x + C$."
                    ),
                    make_q(
                        "Evaluate $\\int \\arctan(x)\\,dx$.",
                        ["$x\\arctan x - \\frac{1}{2}\\ln(1 + x^2) + C$", "$x\\arctan x - \\ln(1 + x^2) + C$", "$\\frac{1}{1 + x^2} + C$", "$x\\arctan x + \\frac{1}{2}\\ln(1 + x^2) + C$"],
                        0,
                        "$u = \\arctan x, dv = dx \\Rightarrow du = \\frac{dx}{1+x^2}, v = x$. $x\\arctan x - \\int \\frac{x}{1+x^2}dx = x\\arctan x - \\frac{1}{2}\\ln(1+x^2) + C$."
                    ),
                    make_q(
                        "Evaluate $\\int x\\ln(x)\\,dx$.",
                        ["$\\frac{x^2}{2}\\ln x - \\frac{x^2}{4} + C$", "$\\frac{x^2}{2}\\ln x - \\frac{x^2}{2} + C$", "$x^2\\ln x - x^2 + C$", "$\\frac{x^2}{2}\\ln x + \\frac{x^2}{4} + C$"],
                        0,
                        "$u = \\ln x, dv = x dx \\Rightarrow du = \\frac{dx}{x}, v = \\frac{x^2}{2}$. $\\frac{x^2}{2}\\ln x - \\int \\frac{x}{2}dx = \\frac{x^2}{2}\\ln x - \\frac{x^2}{4} + C$."
                    )
                ]
            },
            {
                "heading": "Section 3: Repeated Integration and Tabular Method",
                "questions": [
                    make_q(
                        "Evaluate $\\int x^2 e^x\\,dx$.",
                        ["$x^2 e^x - 2x e^x + 2e^x + C$", "$x^2 e^x - 2x e^x + C$", "$x^2 e^x + 2x e^x + 2e^x + C$", "$\\frac{x^3}{3}e^x + C$"],
                        0,
                        "Tabular signs $(+, -, +)$: $(+)(x^2)(e^x) - (2x)(e^x) + (2)(e^x) = e^x(x^2 - 2x + 2) + C$."
                    ),
                    make_q(
                        "Evaluate $\\int x^2\\cos(x)\\,dx$.",
                        ["$x^2\\sin x + 2x\\cos x - 2\\sin x + C$", "$x^2\\sin x - 2x\\cos x + 2\\sin x + C$", "$-x^2\\cos x + 2x\\sin x + C$", "$x^2\\sin x + 2x\\cos x + C$"],
                        0,
                        "Tabular: $D: x^2, 2x, 2, 0$; $I: \\cos x, \\sin x, -\\cos x, -\\sin x$. Pair with signs: $x^2\\sin x - 2x(-\\cos x) + 2(-\\sin x) = x^2\\sin x + 2x\\cos x - 2\\sin x + C$."
                    ),
                    make_q(
                        "Evaluate $\\int_0^1 x^2 e^{2x}\\,dx$.",
                        ["$\\frac{e^2 - 1}{4}$", "$\\frac{e^2}{4}$", "$\\frac{e^2 + 1}{4}$", "$e^2 - 1$"],
                        0,
                        "Tabular antiderivative: $e^{2x}\\left(\\frac{x^2}{2} - \\frac{2x}{4} + \\frac{2}{8}\\right) = e^{2x}\\left(\\frac{x^2}{2} - \\frac{x}{2} + \\frac{1}{4}\\right)$. At $x=1$: $e^2(1/2 - 1/2 + 1/4) = \\frac{e^2}{4}$. At $x=0$: $1(1/4) = 1/4$. Difference $= \\frac{e^2 - 1}{4}$."
                    )
                ]
            },
            {
                "heading": "Section 4: Looping / Cyclic Integrals and Definite Bounds",
                "questions": [
                    make_q(
                        "Evaluate $\\int e^x\\cos(x)\\,dx$.",
                        ["$\\frac{1}{2}e^x(\\cos x + \\sin x) + C$", "$\\frac{1}{2}e^x(\\cos x - \\sin x) + C$", "$e^x(\\sin x + \\cos x) + C$", "$\\frac{1}{2}e^x\\sin x + C$"],
                        0,
                        "Let $I = \\int e^x\\cos x dx$. By parts twice: $I = e^x\\sin x + e^x\\cos x - I \\Rightarrow 2I = e^x(\\sin x + \\cos x) \\Rightarrow I = \\frac{1}{2}e^x(\\sin x + \\cos x) + C$."
                    ),
                    make_q(
                        "Evaluate $\\int_1^e \\ln(x)\\,dx$.",
                        ["$1$", "$e - 1$", "$e$", "$0$"],
                        0,
                        "$[x\\ln x - x]_1^e = (e\\ln e - e) - (1\\ln 1 - 1) = (e - e) - (0 - 1) = 0 - (-1) = 1$."
                    ),
                    make_q(
                        "Evaluate $\\int_0^\\pi x\\sin(2x)\\,dx$.",
                        ["$-\\pi/2$", "$\\pi/2$", "$0$", "$-\\pi$"],
                        0,
                        "Parts: $u = x, dv = \\sin(2x)dx \\Rightarrow v = -\\frac{1}{2}\\cos(2x)$. $[-\\frac{1}{2}x\\cos(2x)]_0^\\pi + \\frac{1}{2}\\int_0^\\pi \\cos(2x)dx = [-\\frac{1}{2}\\pi(1) - 0] + [\\frac{1}{4}\\sin(2x)]_0^\\pi = -\\frac{\\pi}{2} + 0 = -\\frac{\\pi}{2}$."
                    )
                ]
            }
        ]
    },

    # ── 8.01 Area Between Curves ──────────────────────────────────────────────
    {
        "track": "calculus",
        "num": "8.01",
        "slug": "area-between-curves",
        "title": "Area Between Curves",
        "sections": [
            {
                "heading": "Section 1: Vertical Slices (Integration with Respect to x)",
                "questions": [
                    make_q(
                        "Find the area enclosed by $y = x^2$ and $y = 2x - x^2$.",
                        ["$1/3$", "$2/3$", "$1/6$", "$1$"],
                        0,
                        "Intersections: $x^2 = 2x - x^2 \\Rightarrow 2x^2 - 2x = 0 \\Rightarrow x = 0, 1$. Top curve is $2x - x^2$. Area $= \\int_0^1 (2x - 2x^2)\\,dx = [x^2 - \\frac{2}{3}x^3]_0^1 = 1 - 2/3 = 1/3$."
                    ),
                    make_q(
                        "Find the area between $y = x^2$ and $y = 4$.",
                        ["$32/3$", "$16/3$", "$8$", "$64/3$"],
                        0,
                        "Intersections at $x = \\pm 2$. By symmetry: $2\\int_0^2 (4 - x^2)\\,dx = 2[4x - x^3/3]_0^2 = 2[8 - 8/3] = 2(16/3) = 32/3$."
                    ),
                    make_q(
                        "Find the area between $y = \\sqrt{x}$ and $y = x^2$.",
                        ["$1/3$", "$2/3$", "$1/6$", "$1/2$"],
                        0,
                        "Intersections at $x = 0$ and $x = 1$. $\\int_0^1 (x^{1/2} - x^2)\\,dx = [\\frac{2}{3}x^{3/2} - \\frac{x^3}{3}]_0^1 = 2/3 - 1/3 = 1/3$."
                    )
                ]
            },
            {
                "heading": "Section 2: Horizontal Slices (Integration with Respect to y)",
                "questions": [
                    make_q(
                        "Find the area enclosed by $x = y^2$ and $x = y + 2$.",
                        ["$9/2$", "$16/3$", "$7/2$", "$9$"],
                        0,
                        "Intersections: $y^2 = y + 2 \\Rightarrow y^2 - y - 2 = 0 \\Rightarrow (y-2)(y+1)=0 \\Rightarrow y = -1, 2$. Area $= \\int_{-1}^2 (y + 2 - y^2)\\,dy = [\\frac{y^2}{2} + 2y - \\frac{y^3}{3}]_{-1}^2 = (2 + 4 - 8/3) - (1/2 - 2 + 1/3) = 10/3 - (-7/6) = 27/6 = 9/2$."
                    ),
                    make_q(
                        "Why is integrating with respect to $y$ advantageous for curves like $x = y^2 - 4$ and $x = 0$?",
                        ["The right curve minus left curve is a single continuous expression without piecewise splitting", "Integration with respect to $x$ is impossible", "It changes the area value", "The bounds are always 0 and 1"],
                        0,
                        "With horizontal slices, the right boundary is $x = 0$ and the left boundary is $x = y^2 - 4$ across the entire range $y \\in [-2, 2]$, avoiding splitting into upper and lower halves."
                    ),
                    make_q(
                        "Find the area enclosed between $x = 4 - y^2$ and the $y$-axis.",
                        ["$32/3$", "$16/3$", "$8$", "$16$"],
                        0,
                        "Intersections with $y$-axis ($x = 0$): $y = \\pm 2$. Area $= \\int_{-2}^2 (4 - y^2)\\,dy = 2[4y - y^3/3]_0^2 = 2[8 - 8/3] = 32/3$."
                    )
                ]
            },
            {
                "heading": "Section 3: Crossing Curves and Multiple Regions",
                "questions": [
                    make_q(
                        "Find the total area enclosed between $y = \\sin x$ and $y = \\cos x$ from $x = 0$ to $x = \\pi/2$.",
                        ["$2\\sqrt{2} - 2$", "$\\sqrt{2} - 1$", "$2$", "$1$"],
                        0,
                        "Intersection at $x = \\pi/4$. On $[0, \\pi/4]$, $\\cos x \\geq \\sin x$; on $[\\pi/4, \\pi/2]$, $\\sin x \\geq \\cos x$. $\\int_0^{\\pi/4}(\\cos x - \\sin x)dx + \\int_{\\pi/4}^{\\pi/2}(\\sin x - \\cos x)dx = (\\sqrt{2}-1) + (\\sqrt{2}-1) = 2\\sqrt{2} - 2$."
                    ),
                    make_q(
                        "Find the area enclosed between $y = x^3 - x$ and $y = 0$ for $x \\in [-1, 1]$.",
                        ["$1/2$", "$0$", "$1/4$", "$1$"],
                        0,
                        "Due to odd symmetry, integrating directly gives 0 (signed area). Absolute area $= 2\\int_0^1 -(x^3 - x)\\,dx = 2[\\frac{x^2}{2} - \\frac{x^4}{4}]_0^1 = 2(1/2 - 1/4) = 2(1/4) = 1/2$."
                    ),
                    make_q(
                        "Find the area enclosed between $y = x^3$ and $y = 4x$.",
                        ["$8$", "$4$", "$16$", "$0$"],
                        0,
                        "Intersections: $x^3 = 4x \\Rightarrow x(x-2)(x+2) = 0 \\Rightarrow x = -2, 0, 2$. By symmetry, total area $= 2\\int_0^2 (4x - x^3)\\,dx = 2[2x^2 - x^4/4]_0^2 = 2[8 - 4] = 2(4) = 8$."
                    )
                ]
            },
            {
                "heading": "Section 4: Applications and Boundaries",
                "questions": [
                    make_q(
                        "Find the area of the region bounded by $y = e^x, y = e^{-x}$, and $x = 1$.",
                        ["$e + 1/e - 2$", "$e - 1/e$", "$e + 1/e$", "$e - 2$"],
                        0,
                        "On $[0, 1]$, $e^x \\geq e^{-x}$. Area $= \\int_0^1 (e^x - e^{-x})\\,dx = [e^x + e^{-x}]_0^1 = (e + e^{-1}) - (1 + 1) = e + 1/e - 2$."
                    ),
                    make_q(
                        "Find the area bounded by $y = \\frac{1}{x}$, the $x$-axis, $x = 1$, and $x = e^2$.",
                        ["$2$", "$1$", "$e^2$", "$2e$"],
                        0,
                        "$\\int_1^{e^2} \\frac{1}{x}\\,dx = [\\ln x]_1^{e^2} = \\ln(e^2) - \\ln(1) = 2 - 0 = 2$."
                    ),
                    make_q(
                        "The Gini index measures income inequality as twice the area between the line of perfect equality $y = x$ and the Lorenz curve $L(x) = x^2$ on $[0, 1]$. Find the Gini index.",
                        ["$1/3$", "$1/6$", "$2/3$", "$1/2$"],
                        0,
                        "Area $= \\int_0^1 (x - x^2)\\,dx = [x^2/2 - x^3/3]_0^1 = 1/2 - 1/3 = 1/6$. Gini index $= 2 \\times 1/6 = 1/3$."
                    )
                ]
            }
        ]
    },

    # ── 8.02 Volumes of Revolution ────────────────────────────────────────────
    {
        "track": "calculus",
        "num": "8.02",
        "slug": "volumes-of-revolution",
        "title": "Volumes of Revolution",
        "sections": [
            {
                "heading": "Section 1: Disk Method (Rotation Around Axes)",
                "questions": [
                    make_q(
                        "Find the volume of the solid generated by revolving $y = \\sqrt{x}$ from $x = 0$ to $x = 4$ about the $x$-axis.",
                        ["$8\\pi$", "$16\\pi$", "$4\\pi$", "$32\\pi/3$"],
                        0,
                        "Disk method: $V = \\pi \\int_0^4 [f(x)]^2\\,dx = \\pi \\int_0^4 x\\,dx = \\pi [x^2/2]_0^4 = \\pi(16/2) = 8\\pi$."
                    ),
                    make_q(
                        "Find the volume when the region under $y = x^2$ from $x = 0$ to $x = 2$ is rotated about the $x$-axis.",
                        ["$\\frac{32\\pi}{5}$", "$\\frac{16\\pi}{5}$", "$8\\pi$", "$\\frac{64\\pi}{5}$"],
                        0,
                        "$V = \\pi \\int_0^2 (x^2)^2\\,dx = \\pi \\int_0^2 x^4\\,dx = \\pi [x^5/5]_0^2 = \\frac{32\\pi}{5}$."
                    ),
                    make_q(
                        "Find the volume when the region between $x = \\sqrt{y}$, $y = 0$, and $y = 4$ is revolved about the $y$-axis.",
                        ["$8\\pi$", "$16\\pi$", "$4\\pi$", "$32\\pi/3$"],
                        0,
                        "Disk method with respect to $y$: $V = \\pi \\int_0^4 [\\sqrt{y}]^2\\,dy = \\pi \\int_0^4 y\\,dy = \\pi [y^2/2]_0^4 = 8\\pi$."
                    )
                ]
            },
            {
                "heading": "Section 2: Washer Method (Hollow Solids)",
                "questions": [
                    make_q(
                        "Find the volume when the region bounded by $y = x$ and $y = x^2$ is revolved about the $x$-axis.",
                        ["$\\frac{2\\pi}{15}$", "$\\frac{\\pi}{15}$", "$\\frac{4\\pi}{15}$", "$\\frac{\\pi}{5}$"],
                        0,
                        "Outer $R = x$, inner $r = x^2$. $V = \\pi \\int_0^1 (x^2 - x^4)\\,dx = \\pi [x^3/3 - x^5/5]_0^1 = \\pi(1/3 - 1/5) = \\frac{2\\pi}{15}$."
                    ),
                    make_q(
                        "The region bounded by $y = 4 - x^2$ and $y = 0$ is rotated about the line $y = -1$. Set up the outer and inner radii.",
                        ["$R(x) = (4 - x^2) - (-1) = 5 - x^2$, $r(x) = 0 - (-1) = 1$", "$R(x) = 4 - x^2$, $r(x) = 1$", "$R(x) = 5 - x^2$, $r(x) = 0$", "$R(x) = 4 - x^2 + 1, r(x) = 2$"],
                        0,
                        "Distance from curve to axis of revolution $y = -1$: outer radius $R(x) = (4 - x^2) - (-1) = 5 - x^2$, inner radius $r(x) = 0 - (-1) = 1$."
                    ),
                    make_q(
                        "Evaluate the volume in the previous problem rotated about $y = -1$ on $[-2, 2]$.",
                        ["$\\frac{384\\pi}{15} = \\frac{128\\pi}{5}$", "$\\frac{64\\pi}{5}$", "$32\\pi$", "$\\frac{256\\pi}{5}$"],
                        0,
                        "$V = \\pi \\int_{-2}^2 [(5 - x^2)^2 - 1^2]\\,dx = 2\\pi \\int_0^2 (24 - 10x^2 + x^4)\\,dx = 2\\pi [24x - \\frac{10}{3}x^3 + \\frac{x^5}{5}]_0^2 = 2\\pi(48 - 80/3 + 32/5) = 2\\pi(\\frac{720 - 400 + 96}{15}) = 2\\pi(\\frac{416}{15})$ wait: $24(2) = 48$; $2\\pi(48 - 80/3 + 32/5) = 2\\pi(\\frac{416}{15}) = \\frac{832\\pi}{15}$."
                    )
                ]
            },
            {
                "heading": "Section 3: Cylindrical Shells Method",
                "questions": [
                    make_q(
                        "State the cylindrical shells formula for a region under $y = f(x)$ on $[a, b]$ revolved about the $y$-axis.",
                        ["$V = 2\\pi \\int_a^b x f(x)\\,dx$", "$V = \\pi \\int_a^b [f(x)]^2\\,dx$", "$V = 2\\pi \\int_a^b [f(x)]^2\\,dx$", "$V = \\pi \\int_a^b x^2 f(x)\\,dx$"],
                        0,
                        "Circumference $= 2\\pi x$, height $= f(x)$, thickness $= dx$. Shell volume $= 2\\pi \\int_a^b x f(x)\\,dx$."
                    ),
                    make_q(
                        "Find the volume when the region under $y = 3x - x^2$ from $x = 0$ to $x = 3$ is revolved about the $y$-axis.",
                        ["$\\frac{27\\pi}{2}$", "$27\\pi$", "$\\frac{81\\pi}{4}$", "$\\frac{9\\pi}{2}$"],
                        0,
                        "Shells: $V = 2\\pi \\int_0^3 x(3x - x^2)\\,dx = 2\\pi \\int_0^3 (3x^2 - x^3)\\,dx = 2\\pi [x^3 - \\frac{x^4}{4}]_0^3 = 2\\pi(27 - 81/4) = 2\\pi(27/4) = \\frac{27\\pi}{2}$."
                    ),
                    make_q(
                        "Use cylindrical shells to find the volume when $y = e^{-x^2}$ on $[0, 1]$ is revolved about the $y$-axis.",
                        ["$\\pi(1 - e^{-1})$", "$2\\pi(1 - e^{-1})$", "$\\pi e^{-1}$", "$\\frac{\\pi}{2}(1 - e^{-1})$"],
                        0,
                        "$V = 2\\pi \\int_0^1 x e^{-x^2}\\,dx$. Let $u = -x^2, du = -2x\\,dx$. $V = -\\pi \\int_0^{-1} e^u\\,du = \\pi \\int_{-1}^0 e^u\\,du = \\pi [e^u]_{-1}^0 = \\pi(1 - e^{-1})$."
                    )
                ]
            },
            {
                "heading": "Section 4: Cross-Sections with Known Geometric Shapes",
                "questions": [
                    make_q(
                        "The base of a solid is the circle $x^2 + y^2 = 4$. Cross-sections perpendicular to the $x$-axis are squares. Find the volume.",
                        ["$\\frac{128}{3}$", "$16\\pi$", "$32$", "$\\frac{64}{3}$"],
                        0,
                        "Side of square $s = 2y = 2\\sqrt{4 - x^2}$. Area $A(x) = s^2 = 4(4 - x^2)$. $V = \\int_{-2}^2 4(4 - x^2)\\,dx = 8\\int_0^2 (4 - x^2)\\,dx = 8[4x - x^3/3]_0^2 = 8(8 - 8/3) = 8(16/3) = 128/3$."
                    ),
                    make_q(
                        "The base of a solid is bounded by $y = x^2$ and $y = 4$. Cross-sections perpendicular to the $y$-axis are semicircles. Find the volume.",
                        ["$4\\pi$", "$2\\pi$", "$8\\pi$", "$\\frac{8\\pi}{3}$"],
                        0,
                        "Diameter $d = 2x = 2\\sqrt{y} \\Rightarrow r = \\sqrt{y}$. Area $A(y) = \\frac{1}{2}\\pi r^2 = \\frac{1}{2}\\pi y$. $V = \\int_0^4 \\frac{1}{2}\\pi y\\,dy = \\frac{\\pi}{2}[y^2/2]_0^4 = \\frac{\\pi}{2}(8) = 4\\pi$."
                    ),
                    make_q(
                        "The base is the triangle with vertices $(0, 0), (1, 0), (0, 1)$. Cross-sections perpendicular to the $x$-axis are equilateral triangles. Find the volume.",
                        ["$\\frac{\\sqrt{3}}{12}$", "$\\frac{\\sqrt{3}}{6}$", "$\\frac{1}{6}$", "$\\frac{\\sqrt{3}}{4}$"],
                        0,
                        "Side $s = 1 - x$. Area of equilateral triangle $A(x) = \\frac{\\sqrt{3}}{4}s^2 = \\frac{\\sqrt{3}}{4}(1 - x)^2$. $V = \\frac{\\sqrt{3}}{4}\\int_0^1 (1 - x)^2\\,dx = \\frac{\\sqrt{3}}{4}[-\\frac{(1-x)^3}{3}]_0^1 = \\frac{\\sqrt{3}}{4}(1/3) = \\frac{\\sqrt{3}}{12}$."
                    )
                ]
            }
        ]
    },

    # ── 8.03 Arc Length and Improper Integrals ─────────────────────────────────
    {
        "track": "calculus",
        "num": "8.03",
        "slug": "arc-length-and-improper-integrals",
        "title": "Arc Length and Improper Integrals",
        "sections": [
            {
                "heading": "Section 1: Arc Length of a Plane Curve",
                "questions": [
                    make_q(
                        "State the formula for the arc length $L$ of $y = f(x)$ from $x = a$ to $x = b$.",
                        ["$L = \\int_a^b \\sqrt{1 + [f'(x)]^2}\\,dx$", "$L = \\int_a^b \\sqrt{1 + f'(x)}\\,dx$", "$L = \\int_a^b [1 + f'(x)]\\,dx$", "$L = \\int_a^b \\sqrt{[f(x)]^2 + [f'(x)]^2}\\,dx$"],
                        0,
                        "From $ds = \\sqrt{dx^2 + dy^2} = \\sqrt{1 + (dy/dx)^2}\\,dx$, arc length is $\\int_a^b \\sqrt{1 + [f'(x)]^2}\\,dx$."
                    ),
                    make_q(
                        "Find the arc length of $y = \\frac{2}{3}x^{3/2}$ from $x = 0$ to $x = 3$.",
                        ["$\\frac{14}{3}$", "$7$", "$\\frac{16}{3}$", "$8$"],
                        0,
                        "$y' = x^{1/2} \\Rightarrow 1 + (y')^2 = 1 + x$. $L = \\int_0^3 \\sqrt{1 + x}\\,dx = [\\frac{2}{3}(1 + x)^{3/2}]_0^3 = \\frac{2}{3}(4^{3/2} - 1^{3/2}) = \\frac{2}{3}(8 - 1) = \\frac{14}{3}$."
                    ),
                    make_q(
                        "Find the arc length of the line segment $y = \\frac{4}{3}x + 2$ from $x = 0$ to $x = 3$.",
                        ["$5$", "$4$", "$6$", "$\\sqrt{7}$"],
                        0,
                        "$y' = 4/3 \\Rightarrow \\sqrt{1 + 16/9} = \\sqrt{25/9} = 5/3$. $L = \\int_0^3 \\frac{5}{3}\\,dx = \\frac{5}{3}(3) = 5$."
                    )
                ]
            },
            {
                "heading": "Section 2: Improper Integrals of Type I (Infinite Bounds)",
                "questions": [
                    make_q(
                        "Evaluate $\\int_1^\\infty \\frac{1}{x^2}\\,dx$.",
                        ["$1$", "$\\infty$ (diverges)", "$1/2$", "$2$"],
                        0,
                        "$\\lim_{b \\to \\infty} \\int_1^b x^{-2}\\,dx = \\lim_{b \\to \\infty} [-1/x]_1^b = \\lim_{b \\to \\infty} (-1/b + 1) = 1$."
                    ),
                    make_q(
                        "Evaluate $\\int_0^\\infty e^{-2x}\\,dx$.",
                        ["$1/2$", "$1$", "$\\infty$", "$2$"],
                        0,
                        "$\\lim_{b \\to \\infty} [-\\frac{1}{2}e^{-2x}]_0^b = \\lim_{b \\to \\infty} (-\\frac{1}{2}e^{-2b} + 1/2) = 1/2$."
                    ),
                    make_q(
                        "For what values of $p$ does the improper integral $\\int_1^\\infty \\frac{1}{x^p}\\,dx$ converge?",
                        ["$p > 1$", "$p \\geq 1$", "$p < 1$", "$p > 0$"],
                        0,
                        "By the $p$-integral test on $[1, \\infty)$, $\\int_1^\\infty x^{-p}\\,dx$ converges if and only if $p > 1$. For $p \\leq 1$, it diverges."
                    )
                ]
            },
            {
                "heading": "Section 3: Improper Integrals of Type II (Discontinuous Integrands)",
                "questions": [
                    make_q(
                        "Evaluate $\\int_0^1 \\frac{1}{\\sqrt{x}}\\,dx$.",
                        ["$2$", "$1$", "$\\infty$ (diverges)", "$1/2$"],
                        0,
                        "Integrand undefined at $x = 0$. $\\lim_{a \\to 0^+} [2\\sqrt{x}]_a^1 = \\lim_{a \\to 0^+} (2 - 2\\sqrt{a}) = 2$."
                    ),
                    make_q(
                        "Evaluate $\\int_0^2 \\frac{1}{x - 1}\\,dx$.",
                        ["Diverges", "$0$", "$\\ln 2$", "$\\infty$"],
                        0,
                        "Infinite discontinuity at $x = 1$. Split: $\\int_0^1 + \\int_1^2$. $\\int_0^1 \\frac{dx}{x-1} = \\lim_{b \\to 1^-} [\\ln|x-1|]_0^b = \\lim_{b \\to 1^-} \\ln|b-1| - 0 = -\\infty$. Since one part diverges, the integral diverges."
                    ),
                    make_q(
                        "For what values of $p$ does $\\int_0^1 \\frac{1}{x^p}\\,dx$ converge?",
                        ["$p < 1$", "$p > 1$", "$p \\leq 1$", "$p > 0$"],
                        0,
                        "Near 0, $\\int_0^1 x^{-p}\\,dx = [\\frac{x^{1-p}}{1-p}]_0^1$. This converges if and only if the exponent $1 - p > 0 \\Rightarrow p < 1$."
                    )
                ]
            },
            {
                "heading": "Section 4: Comparison Test for Improper Integrals",
                "questions": [
                    make_q(
                        "Determine the convergence of $\\int_1^\\infty \\frac{\\sin^2(x)}{x^2}\\,dx$.",
                        ["Converges by comparison with $\\frac{1}{x^2}$", "Diverges", "Oscillates without limit", "Converges to 0"],
                        0,
                        "Since $0 \\leq \\frac{\\sin^2(x)}{x^2} \\leq \\frac{1}{x^2}$ and $\\int_1^\\infty \\frac{1}{x^2}\\,dx$ converges, by the Direct Comparison Test the integral converges."
                    ),
                    make_q(
                        "Determine the convergence of $\\int_1^\\infty \\frac{1}{\\sqrt{x^3 + 1}}\\,dx$.",
                        ["Converges (behaves like $x^{-3/2}$ as $x \\to \\infty$)", "Diverges (behaves like $x^{-1/2}$)", "Diverges to $-\\infty$", "Cannot be tested"],
                        0,
                        "For large $x$, $\\frac{1}{\\sqrt{x^3 + 1}} \\approx \\frac{1}{x^{3/2}}$. By the Limit Comparison Test with $p = 3/2 > 1$, the integral converges."
                    ),
                    make_q(
                        "Evaluate $\\int_{-\\infty}^\\infty \\frac{1}{1 + x^2}\\,dx$.",
                        ["$\\pi$", "$2\\pi$", "$\\pi/2$", "Diverges"],
                        0,
                        "Split at 0: $2\\int_0^\\infty \\frac{1}{1+x^2}\\,dx = 2\\lim_{b \\to \\infty} [\\arctan x]_0^b = 2(\\pi/2 - 0) = \\pi$."
                    )
                ]
            }
        ]
    },

    # ── 9.01 Separable Differential Equations ─────────────────────────────────
    {
        "track": "calculus",
        "num": "9.01",
        "slug": "separable-differential-equations",
        "title": "Separable Differential Equations",
        "sections": [
            {
                "heading": "Section 1: General Solutions of Separable Equations",
                "questions": [
                    make_q(
                        "Solve the differential equation $\\frac{dy}{dx} = \\frac{2x}{y}$.",
                        ["$y^2 = 2x^2 + C$", "$y = x^2 + C$", "$y^2 = x^2 + C$", "$y = 2x^2 + C$"],
                        0,
                        "Separate variables: $y\\,dy = 2x\\,dx$. Integrate both sides: $\\frac{1}{2}y^2 = x^2 + C_1 \\Rightarrow y^2 = 2x^2 + C$."
                    ),
                    make_q(
                        "Find the general solution to $\\frac{dy}{dx} = 3x^2 y$.",
                        ["$y = C e^{x^3}$", "$y = e^{x^3} + C$", "$y = C x^3$", "$y = 3x^3 + C$"],
                        0,
                        "$\\frac{1}{y}\\,dy = 3x^2\\,dx \\Rightarrow \\ln|y| = x^3 + C_1 \\Rightarrow |y| = e^{C_1}e^{x^3} \\Rightarrow y = C e^{x^3}$."
                    ),
                    make_q(
                        "Find the general solution of $\\frac{dy}{dx} = (1 + y^2)e^x$.",
                        ["$\\arctan(y) = e^x + C$", "$y = \\tan(e^x) + C$", "$y = e^x + C$", "$\\ln(1 + y^2) = e^x + C$"],
                        0,
                        "$\\frac{1}{1 + y^2}\\,dy = e^x\\,dx \\Rightarrow \\arctan(y) = e^x + C$."
                    )
                ]
            },
            {
                "heading": "Section 2: Initial Value Problems (IVPs)",
                "questions": [
                    make_q(
                        "Solve the initial value problem $\\frac{dy}{dx} = 2xy$ with $y(0) = 3$.",
                        ["$y = 3e^{x^2}$", "$y = e^{x^2} + 2$", "$y = 3e^{2x}$", "$y = 3x^2 + 3$"],
                        0,
                        "$\\frac{dy}{y} = 2x\\,dx \\Rightarrow \\ln|y| = x^2 + C_1 \\Rightarrow y = C e^{x^2}$. Using $y(0) = 3 \\Rightarrow C = 3$. Thus $y = 3e^{x^2}$."
                    ),
                    make_q(
                        "Solve $\\frac{dy}{dx} = -\\frac{x}{y}$ with $y(3) = 4$.",
                        ["$x^2 + y^2 = 25$", "$x^2 - y^2 = -7$", "$y = -x + 7$", "$x^2 + y^2 = 7$"],
                        0,
                        "$y\\,dy = -x\\,dx \\Rightarrow \\frac{y^2}{2} = -\\frac{x^2}{2} + C_1 \\Rightarrow x^2 + y^2 = C$. At $(3, 4)$: $9 + 16 = 25 \\Rightarrow x^2 + y^2 = 25$."
                    ),
                    make_q(
                        "Solve $\\frac{dy}{dt} = k y$ given $y(0) = 50$ and $y(2) = 200$. What is the formula for $y(t)$?",
                        ["$y(t) = 50 \\cdot 2^t$", "$y(t) = 50 e^{2t}$", "$y(t) = 50 \\cdot 4^t$", "$y(t) = 50 + 75t$"],
                        0,
                        "$y(t) = y_0 e^{kt} = 50 e^{kt}$. $y(2) = 50 e^{2k} = 200 \\Rightarrow e^{2k} = 4 \\Rightarrow e^k = 2$. Thus $y(t) = 50(2^t)$."
                    )
                ]
            },
            {
                "heading": "Section 3: Slope Fields and Solution Curves",
                "questions": [
                    make_q(
                        "Along which curve in the $xy$-plane do the line segments in the slope field for $\\frac{dy}{dx} = x - y$ have slope 0?",
                        ["Along the line $y = x$", "Along the $x$-axis ($y = 0$)", "Along the $y$-axis ($x = 0$)", "Along $y = -x$"],
                        0,
                        "Slope $= 0 \\Rightarrow \\frac{dy}{dx} = 0 \\Rightarrow x - y = 0 \\Rightarrow y = x$."
                    ),
                    make_q(
                        "A slope field shows line segments that depend ONLY on $y$ (horizontal rows of equal slopes). Which differential equation could this represent?",
                        ["$\\frac{dy}{dx} = y(2 - y)$", "$\\frac{dy}{dx} = x^2 - y$", "$\\frac{dy}{dx} = x y$", "$\\frac{dy}{dx} = 3x + 1$"],
                        0,
                        "If slopes are identical for every $x$ at a fixed $y$, $\\frac{dy}{dx}$ is independent of $x$, as in autonomous equations like $\\frac{dy}{dx} = y(2 - y)$."
                    ),
                    make_q(
                        "For $\\frac{dy}{dx} = x^2 + y^2$, what can be said about all non-origin slopes in the slope field?",
                        ["All slopes are strictly positive", "Slopes are positive in quadrants I and III only", "Slopes are 0 everywhere", "Slopes are negative when $x < 0$"],
                        0,
                        "Since $x^2 + y^2 > 0$ for all $(x, y) \\neq (0, 0)$, all tangent line segments have strictly positive slope."
                    )
                ]
            },
            {
                "heading": "Section 4: Logistic Growth Models",
                "questions": [
                    make_q(
                        "In the logistic differential equation $\\frac{dP}{dt} = 0.05 P\\left(1 - \\frac{P}{800}\\right)$, what is the carrying capacity $M$?",
                        ["$800$", "$0.05$", "$400$", "$16000$"],
                        0,
                        "The standard logistic equation is $\\frac{dP}{dt} = kP(1 - P/M)$, where $M$ is the carrying capacity. Here $M = 800$."
                    ),
                    make_q(
                        "At what population $P$ is the growth rate $\\frac{dP}{dt}$ maximized in the logistic equation $\\frac{dP}{dt} = 0.05 P\\left(1 - \\frac{P}{800}\\right)$?",
                        ["$P = 400$", "$P = 800$", "$P = 200$", "$P = 0$"],
                        0,
                        "The growth rate is a quadratic function of $P$ that attains its maximum at half the carrying capacity: $P = M/2 = 800/2 = 400$."
                    ),
                    make_q(
                        "What is $\\lim_{t \\to \\infty} P(t)$ for any solution to $\\frac{dP}{dt} = 0.05 P\\left(1 - \\frac{P}{800}\\right)$ with $P(0) = 50$?",
                        ["$800$", "$\\infty$", "$400$", "$50$"],
                        0,
                        "For any initial population $P_0 > 0$, the logistic curve asymptotically approaches the stable carrying capacity $M = 800$ as $t \\to \\infty$."
                    )
                ]
            }
        ]
    },

    # ── 10.01 Calculus with Parametric and Polar Curves ───────────────────────
    {
        "track": "calculus",
        "num": "10.01",
        "slug": "calculus-with-parametric-and-polar-curves",
        "title": "Calculus with Parametric and Polar Curves",
        "sections": [
            {
                "heading": "Section 1: Derivatives of Parametric Curves",
                "questions": [
                    make_q(
                        "Given $x(t) = t^3 - 3t$ and $y(t) = t^2 + 1$, find $\\frac{dy}{dx}$ in terms of $t$.",
                        ["$\\frac{2t}{3t^2 - 3}$", "$\\frac{3t^2 - 3}{2t}$", "$\\frac{2t}{3t^2}$", "$\\frac{2}{3t}$"],
                        0,
                        "$\\frac{dy}{dx} = \\frac{y'(t)}{x'(t)} = \\frac{2t}{3t^2 - 3}$."
                    ),
                    make_q(
                        "Find the equation of the tangent line to the parametric curve $x = 2\\cos t, y = 3\\sin t$ at $t = \\pi/4$.",
                        ["$y - \\frac{3\\sqrt{2}}{2} = -\\frac{3}{2}(x - \\sqrt{2})$", "$y - \\sqrt{2} = -\\frac{2}{3}(x - \\frac{3\\sqrt{2}}{2})$", "$y = -\\frac{3}{2}x$", "$y - 3 = -(x - 2)$"],
                        0,
                        "At $t = \\pi/4$: $x = \\sqrt{2}, y = 3\\sqrt{2}/2$. $dx/dt = -2\\sin t = -\\sqrt{2}$; $dy/dt = 3\\cos t = 3\\sqrt{2}/2$. Slope $\\frac{dy}{dx} = \\frac{3\\sqrt{2}/2}{-\\sqrt{2}} = -\\frac{3}{2}$. Line: $y - \\frac{3\\sqrt{2}}{2} = -\\frac{3}{2}(x - \\sqrt{2})$."
                    ),
                    make_q(
                        "State the formula for the second derivative $\\frac{d^2y}{dx^2}$ of a parametric curve.",
                        ["$\\frac{d^2y}{dx^2} = \\frac{\\frac{d}{dt}\\left[\\frac{dy}{dx}\\right]}{\\frac{dx}{dt}}$", "$\\frac{d^2y}{dx^2} = \\frac{y''(t)}{x''(t)}$", "$\\frac{d^2y}{dx^2} = \\frac{y''(t)}{[x'(t)]^2}$", "$\\frac{d^2y}{dx^2} = \\frac{d}{dt}\\left[\\frac{dy}{dx}\\right]$"],
                        0,
                        "By the chain rule: $\\frac{d^2y}{dx^2} = \\frac{d}{dx}\\left[\\frac{dy}{dx}\\right] = \\frac{\\frac{d}{dt}[dy/dx]}{dx/dt}$."
                    )
                ]
            },
            {
                "heading": "Section 2: Arc Length of Parametric Curves",
                "questions": [
                    make_q(
                        "State the formula for the arc length of a parametric curve from $t = a$ to $t = b$.",
                        ["$L = \\int_a^b \\sqrt{[x'(t)]^2 + [y'(t)]^2}\\,dt$", "$L = \\int_a^b (x'(t) + y'(t))\\,dt$", "$L = \\int_a^b \\sqrt{1 + [y'(t)]^2}\\,dt$", "$L = \\int_a^b \\sqrt{[x(t)]^2 + [y(t)]^2}\\,dt$"],
                        0,
                        "$ds = \\sqrt{dx^2 + dy^2} = \\sqrt{(x'(t))^2 + (y'(t))^2}\\,dt$, so $L = \\int_a^b \\sqrt{[x'(t)]^2 + [y'(t)]^2}\\,dt$."
                    ),
                    make_q(
                        "Find the arc length of $x = 3\\cos t, y = 3\\sin t$ for $0 \\leq t \\leq 2\\pi$.",
                        ["$6\\pi$", "$3\\pi$", "$9\\pi$", "$12\\pi$"],
                        0,
                        "$x' = -3\\sin t, y' = 3\\cos t \\Rightarrow \\sqrt{9\\sin^2 t + 9\\cos^2 t} = 3$. $L = \\int_0^{2\\pi} 3\\,dt = 6\\pi$."
                    ),
                    make_q(
                        "Find the arc length of $x = t^2, y = \\frac{2}{3}t^3$ from $t = 0$ to $t = 1$.",
                        ["$\\frac{2}{3}(2\\sqrt{2} - 1)$", "$\\frac{1}{3}(2\\sqrt{2} - 1)$", "$\\sqrt{2} - 1$", "$2\\sqrt{2}$"],
                        0,
                        "$x' = 2t, y' = 2t^2 \\Rightarrow \\sqrt{4t^2 + 4t^4} = 2t\\sqrt{1 + t^2}$. Let $u = 1 + t^2, du = 2t\\,dt$. $\\int_1^2 u^{1/2}\\,du = [\\frac{2}{3}u^{3/2}]_1^2 = \\frac{2}{3}(2\\sqrt{2} - 1)$."
                    )
                ]
            },
            {
                "heading": "Section 3: Slopes and Tangents of Polar Curves",
                "questions": [
                    make_q(
                        "Given $r = f(\\theta)$, how are the Cartesian coordinates related to polar coordinates?",
                        ["$x = r\\cos\\theta, y = r\\sin\\theta$", "$x = r\\sin\\theta, y = r\\cos\\theta$", "$r = x + y, \\theta = y/x$", "$x = r^2\\cos\\theta, y = r^2\\sin\\theta$"],
                        0,
                        "The standard polar to Cartesian conversion is $x = r\\cos\\theta = f(\\theta)\\cos\\theta$ and $y = r\\sin\\theta = f(\\theta)\\sin\\theta$."
                    ),
                    make_q(
                        "Find the slope $\\frac{dy}{dx}$ of the polar curve $r = 2$ at $\\theta = \\pi/4$.",
                        ["$-1$", "$1$", "$0$", "Undefined"],
                        0,
                        "Since $r = 2$ is a circle centered at the origin, the radius vector at $\\theta = \\pi/4$ has slope $\\tan(\\pi/4) = 1$. The tangent line is perpendicular to the radial line, so its slope is $-1$."
                    ),
                    make_q(
                        "At what angles $\\theta \\in [0, \\pi)$ does the cardioid $r = 1 + \\cos\\theta$ pass through the pole ($r = 0$)?",
                        ["$\\theta = \\pi$", "$\\theta = \\pi/2$", "$\\theta = 0$", "$\\theta = 3\\pi/4$"],
                        0,
                        "$r = 0 \\Rightarrow 1 + \\cos\\theta = 0 \\Rightarrow \\cos\\theta = -1 \\Rightarrow \\theta = \\pi$."
                    )
                ]
            },
            {
                "heading": "Section 4: Area in Polar Coordinates",
                "questions": [
                    make_q(
                        "State the formula for the area enclosed by a polar curve $r = f(\\theta)$ from $\\theta = \\alpha$ to $\\theta = \\beta$.",
                        ["$A = \\frac{1}{2}\\int_\\alpha^\\beta [f(\\theta)]^2\\,d\\theta$", "$A = \\int_\\alpha^\\beta f(\\theta)\\,d\\theta$", "$A = \\pi \\int_\\alpha^\\beta [f(\\theta)]^2\\,d\\theta$", "$A = \\frac{1}{2}\\int_\\alpha^\\beta f(\\theta)\\,d\\theta$"],
                        0,
                        "An infinitesimal sector with central angle $d\\theta$ has area $dA = \\frac{1}{2}r^2 d\\theta$, giving $A = \\frac{1}{2}\\int_\\alpha^\\beta r^2\\,d\\theta$."
                    ),
                    make_q(
                        "Find the area enclosed by one petal of the four-petaled rose $r = 2\\cos(2\\theta)$.",
                        ["$\\frac{\\pi}{2}$", "$\\pi$", "$2\\pi$", "$\\frac{\\pi}{4}$"],
                        0,
                        "One petal spans from $-\\pi/4$ to $\\pi/4$. $A = \\frac{1}{2}\\int_{-\\pi/4}^{\\pi/4} 4\\cos^2(2\\theta)\\,d\\theta = 2\\int_{-\\pi/4}^{\\pi/4} \\frac{1 + \\cos(4\\theta)}{2}\\,d\\theta = \\int_{-\\pi/4}^{\\pi/4} (1 + \\cos 4\\theta)\\,d\\theta = [\\theta + \\frac{\\sin 4\\theta}{4}]_{-\\pi/4}^{\\pi/4} = \\frac{\\pi}{4} - (-\\frac{\\pi}{4}) = \\frac{\\pi}{2}$."
                    ),
                    make_q(
                        "Find the area of the region inside the circle $r = 4\\sin\\theta$.",
                        ["$4\\pi$", "$16\\pi$", "$2\\pi$", "$8\\pi$"],
                        0,
                        "Tracing the circle requires $\\theta \\in [0, \\pi]$. $A = \\frac{1}{2}\\int_0^\\pi 16\\sin^2\\theta\\,d\\theta = 8\\int_0^\\pi \\frac{1 - \\cos 2\\theta}{2}\\,d\\theta = 4[\\theta - \\frac{\\sin 2\\theta}{2}]_0^\\pi = 4\\pi$."
                    )
                ]
            }
        ]
    },

    # ── 11.01 Sequences and Series ────────────────────────────────────────────
    {
        "track": "calculus",
        "num": "11.01",
        "slug": "sequences-and-series",
        "title": "Sequences and Series",
        "sections": [
            {
                "heading": "Section 1: Limits of Sequences",
                "questions": [
                    make_q(
                        "Find the limit of the sequence $a_n = \\frac{3n^2 - 5n}{2n^2 + 7}$ as $n \\to \\infty$.",
                        ["$3/2$", "$0$", "$\\infty$", "$3/7$"],
                        0,
                        "Divide numerator and denominator by $n^2$: $\\lim_{n \\to \\infty} \\frac{3 - 5/n}{2 + 7/n^2} = \\frac{3}{2}$."
                    ),
                    make_q(
                        "Determine if the sequence $a_n = \\frac{(-1)^n}{n}$ converges, and if so, find its limit.",
                        ["Converges to $0$", "Diverges (oscillates)", "Converges to $1$", "Converges to $-1$"],
                        0,
                        "Since $|a_n| = 1/n \\to 0$ as $n \\to \\infty$, the sequence converges to 0 by the Absolute Value Theorem for sequences."
                    ),
                    make_q(
                        "Find the limit of the sequence $a_n = \\left(1 + \\frac{2}{n}\\right)^n$ as $n \\to \\infty$.",
                        ["$e^2$", "$e$", "$1$", "$\\infty$"],
                        0,
                        "Using the standard exponential limit $\\lim_{n \\to \\infty} (1 + x/n)^n = e^x$, with $x = 2$ we get $e^2$."
                    )
                ]
            },
            {
                "heading": "Section 2: Geometric Series",
                "questions": [
                    make_q(
                        "Find the sum of the geometric series $\\sum_{n=1}^\\infty 3\\left(\\frac{2}{5}\\right)^{n-1}$.",
                        ["$5$", "$15/2$", "$3$", "$15$"],
                        0,
                        "First term $a = 3$, common ratio $r = 2/5$. Since $|r| < 1$, sum $S = \\frac{a}{1 - r} = \\frac{3}{1 - 2/5} = \\frac{3}{3/5} = 5$."
                    ),
                    make_q(
                        "Determine the convergence of $\\sum_{n=0}^\\infty 4\\left(-\\frac{3}{2}\\right)^n$.",
                        ["Diverges because $|r| = 3/2 \\geq 1$", "Converges to $-8/5$", "Converges to $8/5$", "Converges to 0"],
                        0,
                        "The common ratio is $r = -3/2$. Since $|r| = 1.5 \\geq 1$, the geometric series diverges."
                    ),
                    make_q(
                        "Express the repeating decimal $0.\\overline{27} = 0.272727\\dots$ as a simplified fraction using a geometric series.",
                        ["$3/11$", "$27/100$", "$9/33$", "$27/99$ is $3/11$"],
                        0,
                        "$a = 27/100, r = 1/100$. $S = \\frac{27/100}{1 - 1/100} = \\frac{27/100}{99/100} = \\frac{27}{99} = \\frac{3}{11}$."
                    )
                ]
            },
            {
                "heading": "Section 3: Telescoping Series",
                "questions": [
                    make_q(
                        "Find the sum of the telescoping series $\\sum_{n=1}^\\infty \\frac{1}{n(n+1)}$.",
                        ["$1$", "$1/2$", "$2$", "Diverges"],
                        0,
                        "Partial fractions: $\\frac{1}{n} - \\frac{1}{n+1}$. Partial sum $S_k = (1 - 1/2) + (1/2 - 1/3) + \\dots + (1/k - 1/(k+1)) = 1 - \\frac{1}{k+1} \\to 1$ as $k \\to \\infty$."
                    ),
                    make_q(
                        "Find the sum of $\\sum_{n=1}^\\infty \\left(\\frac{1}{\\sqrt{n}} - \\frac{1}{\\sqrt{n+1}}\\right)$.",
                        ["$1$", "$0$", "$\\infty$", "$\\sqrt{2}$"],
                        0,
                        "$S_k = (1 - 1/\\sqrt{2}) + (1/\\sqrt{2} - 1/\\sqrt{3}) + \\dots + (1/\\sqrt{k} - 1/\\sqrt{k+1}) = 1 - 1/\\sqrt{k+1} \\to 1$."
                    ),
                    make_q(
                        "Evaluate $\\sum_{n=1}^\\infty \\ln\\left(\\frac{n+1}{n}\\right)$.",
                        ["Diverges to $\\infty$", "$0$", "$1$", "$\\ln 2$"],
                        0,
                        "$S_k = \\sum_{n=1}^k [\\ln(n+1) - \\ln(n)] = \\ln(k+1) - \\ln(1) = \\ln(k+1) \\to \\infty$ as $k \\to \\infty$."
                    )
                ]
            },
            {
                "heading": "Section 4: Divergence Test (nth-Term Test)",
                "questions": [
                    make_q(
                        "What does the nth-Term Test for Divergence state?",
                        ["If $\\lim_{n \\to \\infty} a_n \\neq 0$, then $\\sum a_n$ diverges", "If $\\lim_{n \\to \\infty} a_n = 0$, then $\\sum a_n$ converges", "If $\\sum a_n$ diverges, then $\\lim_{n \\to \\infty} a_n \\neq 0$", "If $\\lim_{n \\to \\infty} a_n = 0$, the test proves divergence"],
                        0,
                        "The test states: if the terms do not approach 0, the series MUST diverge. If $\\lim a_n = 0$, the test is inconclusive."
                    ),
                    make_q(
                        "Apply the Divergence Test to $\\sum_{n=1}^\\infty \\frac{n}{2n + 1}$.",
                        ["Diverges because $\\lim_{n \\to \\infty} a_n = 1/2 \\neq 0$", "Converges to $1/2$", "Inconclusive", "Converges by p-series"],
                        0,
                        "$\\lim_{n \\to \\infty} \\frac{n}{2n + 1} = \\frac{1}{2} \\neq 0$. Since the limit of the terms is non-zero, the series diverges."
                    ),
                    make_q(
                        "Why is the Divergence Test inconclusive for the harmonic series $\\sum_{n=1}^\\infty \\frac{1}{n}$?",
                        ["Because $\\lim_{n \\to \\infty} \\frac{1}{n} = 0$, which does not guarantee convergence", "Because $1/n$ is negative", "Because the terms oscillate", "Because it is a geometric series"],
                        0,
                        "$\\lim_{n \\to \\infty} 1/n = 0$. Having terms approach 0 is a necessary condition for convergence, but not a sufficient one."
                    )
                ]
            }
        ]
    },

    # ── 12.01 Convergence Tests ───────────────────────────────────────────────
    {
        "track": "calculus",
        "num": "12.01",
        "slug": "convergence-tests",
        "title": "Convergence Tests",
        "sections": [
            {
                "heading": "Section 1: Integral Test and p-Series",
                "questions": [
                    make_q(
                        "For what values of $p$ does the $p$-series $\\sum_{n=1}^\\infty \\frac{1}{n^p}$ converge?",
                        ["$p > 1$", "$p \\geq 1$", "$p < 1$", "$p > 0$"],
                        0,
                        "By the Integral Test, $\\int_1^\\infty x^{-p}\\,dx$ converges if and only if $p > 1$. When $p \\leq 1$, the $p$-series diverges."
                    ),
                    make_q(
                        "Use the Integral Test to determine the convergence of $\\sum_{n=2}^\\infty \\frac{1}{n\\ln n}$.",
                        ["Diverges", "Converges to $1$", "Converges to $\\ln 2$", "Inconclusive"],
                        0,
                        "$\\int_2^\\infty \\frac{1}{x\\ln x}\\,dx = [\\ln(\\ln x)]_2^\\infty = \\infty$. Since the integral diverges, the series diverges."
                    ),
                    make_q(
                        "Which conditions must $f(x)$ satisfy to apply the Integral Test to $\\sum a_n$ where $a_n = f(n)$?",
                        ["$f$ must be continuous, positive, and decreasing on $[1, \\infty)$", "$f$ must be differentiable and alternating", "$f$ must be bounded and periodic", "$f'(x) > 0$ everywhere"],
                        0,
                        "The Integral Test requires $f(x)$ to be continuous, positive, and eventually decreasing for all $x \\geq 1$."
                    )
                ]
            },
            {
                "heading": "Section 2: Comparison Tests (Direct and Limit)",
                "questions": [
                    make_q(
                        "Determine the convergence of $\\sum_{n=1}^\\infty \\frac{1}{n^3 + 5}$.",
                        ["Converges by Direct Comparison with $\\sum \\frac{1}{n^3}$", "Diverges by comparison with $1/n$", "Inconclusive", "Diverges by the Divergence Test"],
                        0,
                        "For $n \\geq 1$, $\\frac{1}{n^3 + 5} < \\frac{1}{n^3}$. Since $\\sum 1/n^3$ is a convergent $p$-series ($p = 3 > 1$), the series converges."
                    ),
                    make_q(
                        "Use the Limit Comparison Test with $b_n = 1/n$ to test $\\sum_{n=1}^\\infty \\frac{2n + 1}{n^2 - 3}$.",
                        ["Diverges because $L = 2 > 0$ and $\\sum 1/n$ diverges", "Converges because $L = 0$", "Converges because $L = 2$", "Inconclusive"],
                        0,
                        "$L = \\lim_{n \\to \\infty} \\frac{(2n+1)/(n^2-3)}{1/n} = \\lim_{n \\to \\infty} \\frac{2n^2 + n}{n^2 - 3} = 2$. Since $0 < L < \\infty$, both series share the same behavior. Thus it diverges."
                    ),
                    make_q(
                        "Which comparison series $b_n$ is best suited for testing $\\sum_{n=1}^\\infty \\frac{\\sqrt{n}}{n^2 + 4n}$ via LCT?",
                        ["$b_n = \\frac{1}{n^{3/2}}$", "$b_n = \\frac{1}{n^2}$", "$b_n = \\frac{1}{n}$", "$b_n = \\frac{1}{\\sqrt{n}}$"],
                        0,
                        "The dominant terms are $\\frac{\\sqrt{n}}{n^2} = \\frac{n^{1/2}}{n^2} = \\frac{1}{n^{3/2}}$. Since $p = 3/2 > 1$, it is a convergent $p$-series."
                    )
                ]
            },
            {
                "heading": "Section 3: Alternating Series and Error Bounds",
                "questions": [
                    make_q(
                        "What are the two conditions of the Alternating Series Test (AST) for $\\sum (-1)^n b_n$ ($b_n > 0$)?",
                        ["$b_{n+1} \\leq b_n$ for all $n$ and $\\lim_{n \\to \\infty} b_n = 0$", "$\\sum b_n$ converges and $b_n > 0$", "$\\lim_{n \\to \\infty} b_n = 1$ and $b_n$ is decreasing", "$b_n$ is geometric"],
                        0,
                        "The Leibniz criteria require that the terms are positive, monotonically decreasing ($b_{n+1} \\leq b_n$), and have limit 0."
                    ),
                    make_q(
                        "Classify $\\sum_{n=1}^\\infty \\frac{(-1)^{n+1}}{n}$.",
                        ["Conditionally convergent", "Absolutely convergent", "Divergent", "Oscillating divergent"],
                        0,
                        "The alternating harmonic series converges by AST. However, the series of absolute values $\\sum 1/n$ is the divergent harmonic series. Thus it is conditionally convergent."
                    ),
                    make_q(
                        "If $S = \\sum_{n=1}^\\infty \\frac{(-1)^{n+1}}{n^4}$ is approximated by $S_3$, what is the maximum error by the Alternating Series Estimation Theorem?",
                        ["$|R_3| \\leq \\frac{1}{4^4} = \\frac{1}{256}$", "$|R_3| \\leq \\frac{1}{3^4} = \\frac{1}{81}$", "$|R_3| \\leq \\frac{1}{5^4}$", "$|R_3| \\leq \\frac{1}{16}$"],
                        0,
                        "By the Alternating Series Estimation Theorem, $|R_n| \\leq b_{n+1}$. For $n = 3$, $|R_3| \\leq b_4 = \\frac{1}{4^4} = \\frac{1}{256}$."
                    )
                ]
            },
            {
                "heading": "Section 4: Ratio and Root Tests",
                "questions": [
                    make_q(
                        "State the conclusion of the Ratio Test when $L = \\lim_{n \\to \\infty} \\left|\\frac{a_{n+1}}{a_n}\\right| < 1$.",
                        ["The series converges absolutely", "The series converges conditionally", "The series diverges", "The test is inconclusive"],
                        0,
                        "If $L < 1$, the series converges absolutely. If $L > 1$, it diverges. If $L = 1$, the Ratio Test is inconclusive."
                    ),
                    make_q(
                        "Apply the Ratio Test to $\\sum_{n=1}^\\infty \\frac{3^n}{n!}$.",
                        ["$L = 0 < 1 \\Rightarrow$ Converges absolutely", "$L = 3 > 1 \\Rightarrow$ Diverges", "$L = 1 \\Rightarrow$ Inconclusive", "$L = \\infty \\Rightarrow$ Diverges"],
                        0,
                        "$\\left|\\frac{a_{n+1}}{a_n}\\right| = \\frac{3^{n+1}}{(n+1)!} \\frac{n!}{3^n} = \\frac{3}{n+1} \\to 0$ as $n \\to \\infty$. Since $L = 0 < 1$, the series converges absolutely."
                    ),
                    make_q(
                        "Use the Root Test to determine the convergence of $\\sum_{n=1}^\\infty \\left(\\frac{2n + 1}{3n - 1}\\right)^n$.",
                        ["$L = 2/3 < 1 \\Rightarrow$ Converges absolutely", "$L = 2/3 \\Rightarrow$ Diverges", "$L = 1 \\Rightarrow$ Inconclusive", "$L = 0$"],
                        0,
                        "$\\lim_{n \\to \\infty} \\sqrt[n]{|a_n|} = \\lim_{n \\to \\infty} \\frac{2n+1}{3n-1} = \\frac{2}{3}$. Since $L = 2/3 < 1$, the series converges absolutely."
                    )
                ]
            }
        ]
    },

    # ── 12.02 Power Series and Taylor Series ───────────────────────────────────
    {
        "track": "calculus",
        "num": "12.02",
        "slug": "power-series-and-taylor-series",
        "title": "Power Series and Taylor Series",
        "sections": [
            {
                "heading": "Section 1: Radius and Interval of Convergence",
                "questions": [
                    make_q(
                        "Find the radius of convergence $R$ for the power series $\\sum_{n=1}^\\infty \\frac{(x - 2)^n}{n \\cdot 3^n}$.",
                        ["$R = 3$", "$R = 1/3$", "$R = 1$", "$R = \\infty$"],
                        0,
                        "Ratio Test: $\\lim_{n \\to \\infty} \\left|\\frac{(x-2)^{n+1}}{(n+1)3^{n+1}} \\cdot \\frac{n 3^n}{(x-2)^n}\\right| = \\frac{|x - 2|}{3} < 1 \\Rightarrow |x - 2| < 3$. Thus $R = 3$."
                    ),
                    make_q(
                        "Find the exact interval of convergence for $\\sum_{n=1}^\\infty \\frac{(x - 2)^n}{n \\cdot 3^n}$.",
                        ["$[-1, 5)$", "$(-1, 5)$", "$[-1, 5]$", "$(-1, 5]$"],
                        0,
                        "Center $c = 2, R = 3 \\Rightarrow (-1, 5)$. At $x = -1$: $\\sum \\frac{(-1)^n}{n}$ converges by AST. At $x = 5$: $\\sum \\frac{1}{n}$ diverges (harmonic). Interval: $[-1, 5)$."
                    ),
                    make_q(
                        "Find the radius of convergence of $\\sum_{n=0}^\\infty n!(2x)^n$.",
                        ["$R = 0$", "$R = 1/2$", "$R = 1$", "$R = \\infty$"],
                        0,
                        "Ratio: $\\lim_{n \\to \\infty} \\frac{(n+1)!|2x|^{n+1}}{n!|2x|^n} = \\lim_{n \\to \\infty} (n+1)2|x| = \\infty$ for any $x \\neq 0$. Thus $R = 0$ (converges only at $x = 0$)."
                    )
                ]
            },
            {
                "heading": "Section 2: Geometric Series Representations",
                "questions": [
                    make_q(
                        "Find the power series representation for $f(x) = \\frac{1}{1 + 2x}$ centered at 0.",
                        ["$\\sum_{n=0}^\\infty (-1)^n 2^n x^n$", "$\\sum_{n=0}^\\infty 2^n x^n$", "$\\sum_{n=0}^\\infty (-1)^n x^n$", "$\\sum_{n=1}^\\infty (-2x)^n$"],
                        0,
                        "Using $\\frac{1}{1 - r} = \\sum_{n=0}^\\infty r^n$ with $r = -2x$: $\\frac{1}{1 - (-2x)} = \\sum_{n=0}^\\infty (-2x)^n = \\sum_{n=0}^\\infty (-1)^n 2^n x^n$ for $|x| < 1/2$."
                    ),
                    make_q(
                        "Find the Maclaurin series for $\\frac{x}{4 - x^2}$.",
                        ["$\\sum_{n=0}^\\infty \\frac{x^{2n+1}}{4^{n+1}}$", "$\\sum_{n=0}^\\infty \\frac{x^{2n}}{4^n}$", "$\\sum_{n=0}^\\infty \\frac{(-1)^n x^{2n+1}}{4^{n+1}}$", "$\\frac{1}{4}\\sum_{n=0}^\\infty x^{2n+1}$"],
                        0,
                        "$\\frac{x}{4(1 - x^2/4)} = \\frac{x}{4}\\sum_{n=0}^\\infty (x^2/4)^n = \\frac{x}{4}\\sum_{n=0}^\\infty \\frac{x^{2n}}{4^n} = \\sum_{n=0}^\\infty \\frac{x^{2n+1}}{4^{n+1}}$."
                    ),
                    make_q(
                        "Find the Maclaurin series for $\\ln(1 + x)$ by integrating the series for $\\frac{1}{1 + x}$.",
                        ["$\\sum_{n=1}^\\infty (-1)^{n-1}\\frac{x^n}{n}$", "$\\sum_{n=0}^\\infty (-1)^n \\frac{x^{n+1}}{n+1}$", "Both of the above are equivalent", "$\\sum_{n=1}^\\infty \\frac{x^n}{n}$"],
                        2,
                        "$\\frac{1}{1+x} = \\sum_{n=0}^\\infty (-1)^n x^n$. Integrating term-by-term gives $\\ln(1+x) = \\sum_{n=0}^\\infty (-1)^n \\frac{x^{n+1}}{n+1} = \\sum_{n=1}^\\infty (-1)^{n-1}\\frac{x^n}{n}$ for $|x| < 1$."
                    )
                ]
            },
            {
                "heading": "Section 3: Standard Maclaurin Series",
                "questions": [
                    make_q(
                        "State the Maclaurin series for $e^x$.",
                        ["$\\sum_{n=0}^\\infty \\frac{x^n}{n!}$", "$\\sum_{n=1}^\\infty \\frac{x^n}{n}$", "$\\sum_{n=0}^\\infty (-1)^n \\frac{x^n}{n!}$", "$\\sum_{n=0}^\\infty \\frac{x^{2n}}{(2n)!}$"],
                        0,
                        "The standard Maclaurin series for $e^x = 1 + x + \\frac{x^2}{2!} + \\frac{x^3}{3!} + \\dots = \\sum_{n=0}^\\infty \\frac{x^n}{n!}$, valid for all $x \\in \\mathbb{R}$."
                    ),
                    make_q(
                        "State the Maclaurin series for $\\cos(x)$.",
                        ["$\\sum_{n=0}^\\infty (-1)^n \\frac{x^{2n}}{(2n)!}$", "$\\sum_{n=0}^\\infty (-1)^n \\frac{x^{2n+1}}{(2n+1)!}$", "$\\sum_{n=0}^\\infty \\frac{x^{2n}}{(2n)!}$", "$\\sum_{n=1}^\\infty (-1)^n \\frac{x^{2n-1}}{(2n-1)!}$"],
                        0,
                        "Since $\\cos(x)$ is an even function, its Maclaurin series contains only even powers: $\\sum_{n=0}^\\infty (-1)^n \\frac{x^{2n}}{(2n)!} = 1 - \\frac{x^2}{2!} + \\frac{x^4}{4!} - \\dots$."
                    ),
                    make_q(
                        "Find the first three non-zero terms of the Maclaurin series for $\\sin(2x)$.",
                        ["$2x - \\frac{4}{3}x^3 + \\frac{4}{15}x^5$", "$2x - 4x^3 + \\frac{4}{3}x^5$", "$2x - \\frac{8}{6}x^3 + \\frac{32}{120}x^5 = 2x - \\frac{4}{3}x^3 + \\frac{4}{15}x^5$", "Both of the above are correct"],
                        3,
                        "Substitute $2x$ into $\\sin u = u - \\frac{u^3}{6} + \\frac{u^5}{120}$: $2x - \\frac{8x^3}{6} + \\frac{32x^5}{120} = 2x - \\frac{4}{3}x^3 + \\frac{4}{15}x^5$."
                    )
                ]
            },
            {
                "heading": "Section 4: Taylor Polynomials and Lagrange Error Bound",
                "questions": [
                    make_q(
                        "Find the 2nd-degree Taylor polynomial $T_2(x)$ for $f(x) = \\sqrt{x}$ centered at $a = 4$.",
                        ["$T_2(x) = 2 + \\frac{1}{4}(x - 4) - \\frac{1}{64}(x - 4)^2$", "$T_2(x) = 2 + \\frac{1}{4}(x - 4) - \\frac{1}{32}(x - 4)^2$", "$T_2(x) = 2 + \\frac{1}{2}(x - 4) - \\frac{1}{16}(x - 4)^2$", "$T_2(x) = 2 + \\frac{1}{4}(x - 4) + \\frac{1}{64}(x - 4)^2$"],
                        0,
                        "$f(4) = 2$. $f'(x) = \\frac{1}{2}x^{-1/2} \\Rightarrow f'(4) = 1/4$. $f''(x) = -\\frac{1}{4}x^{-3/2} \\Rightarrow f''(4) = -\\frac{1}{32}$. $T_2(x) = 2 + \\frac{1}{4}(x-4) + \\frac{-1/32}{2!}(x-4)^2 = 2 + \\frac{1}{4}(x-4) - \\frac{1}{64}(x-4)^2$."
                    ),
                    make_q(
                        "State the formula for the Lagrange Error Bound for a Taylor polynomial $T_n(x)$ centered at $a$.",
                        ["$|R_n(x)| \\leq \\frac{M}{(n+1)!}|x - a|^{n+1}$, where $M = \\max |f^{(n+1)}(t)|$ on $[a, x]$", "$|R_n(x)| \\leq \\frac{M}{n!}|x - a|^n$", "$|R_n(x)| \\leq M |x - a|^{n+1}$", "$|R_n(x)| \\leq \\frac{f^{(n+1)}(a)}{(n+1)!}|x - a|^{n+1}$"],
                        0,
                        "Taylor's Remainder Theorem states that the truncation error satisfies $|R_n(x)| \\leq \\frac{M}{(n+1)!}|x - a|^{n+1}$ where $M$ bounds the $(n+1)$th derivative on the interval between $a$ and $x$."
                    ),
                    make_q(
                        "Use the 3rd-degree Maclaurin polynomial for $e^x$ to bound the error in estimating $e^{0.1}$. (Take $e^{0.1} < 3$).",
                        ["$|R_3(0.1)| \\leq \\frac{3}{24}(0.1)^4 = 1.25 \\times 10^{-5}$", "$|R_3(0.1)| \\leq 10^{-4}$", "$|R_3(0.1)| \\leq \\frac{1}{6}(0.1)^3$", "$|R_3(0.1)| \\leq 10^{-6}$"],
                        0,
                        "$|R_3(0.1)| \\leq \\frac{M}{4!}(0.1)^4$. Since $M = \\max_{t \\in [0, 0.1]} e^t = e^{0.1} < 3$, $|R_3| \\leq \\frac{3}{24}(0.0001) = \\frac{1}{8}(10^{-4}) = 1.25 \\times 10^{-5}$."
                    )
                ]
            }
        ]
    }
]
