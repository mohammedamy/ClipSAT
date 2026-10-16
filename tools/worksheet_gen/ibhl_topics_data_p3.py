#!/usr/bin/env python3
"""Standardized 4-Page Topic Data for IB Mathematics HL - Part 3 (Topics 5.02 to 6.03).

Authentic IB DP Mathematics Analysis & Approaches HL / Applications & Interpretation HL questions.
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

IBHL_TOPICS_P3 = [
    # --------------------------------------------------------------------------
    # IBHL 5.02: Differential Equations
    # --------------------------------------------------------------------------
    {
        "track": "ibhl",
        "num": "5.02",
        "slug": "differential-equations",
        "title": "Differential Equations",
        "sections": [
            {
                "heading": "Section 1: Separation of Variables",
                "questions": [
                    make_q(
                        "Solve the differential equation $\\frac{dy}{dx} = \\frac{2x}{y}$ with initial condition $y(0) = 4$ for $y > 0$.",
                        [
                            "$y = \\sqrt{2x^2 + 16}$",
                            "$y = 2x^2 + 4$",
                            "$y = \\sqrt{x^2 + 16}$",
                            "$y = x^2 + 4$"
                        ],
                        0,
                        "Separate variables: $y dy = 2x dx$. Integrate: $\\frac{1}{2}y^2 = x^2 + C \\Rightarrow y^2 = 2x^2 + 2C$. Since $y(0) = 4$, $16 = 2C$. Thus $y^2 = 2x^2 + 16 \\Rightarrow y = \\sqrt{2x^2 + 16}$."
                    ),
                    make_q(
                        "Solve $\\frac{dy}{dx} = -3y$ with $y(0) = 50$.",
                        ["$y = 50 e^{-3x}$", "$y = 50 e^{3x}$", "$y = -3x + 50$", "$y = 50 - 3e^x$"],
                        0,
                        "$\\frac{1}{y} dy = -3 dx \\Rightarrow \\ln|y| = -3x + C \\Rightarrow y = A e^{-3x}$. With $y(0) = 50$, $y = 50 e^{-3x}$."
                    ),
                    make_q(
                        "Solve $\\frac{dy}{dx} = (1 + y^2) e^x$ with $y(0) = 0$.",
                        [
                            "$y = \\tan(e^x - 1)$",
                            "$y = \\arctan(e^x - 1)$",
                            "$y = \\tan(e^x)$",
                            "$y = e^x - 1$"
                        ],
                        0,
                        "$\\frac{1}{1 + y^2} dy = e^x dx \\Rightarrow \\arctan y = e^x + C$. With $y(0) = 0$, $\\arctan 0 = e^0 + C \\Rightarrow 0 = 1 + C \\Rightarrow C = -1$. Thus $\\arctan y = e^x - 1 \\Rightarrow y = \\tan(e^x - 1)$."
                    )
                ]
            },
            {
                "heading": "Section 2: Integrating Factor Method for First-Order Linear ODEs",
                "questions": [
                    make_q(
                        "For the linear differential equation $\\frac{dy}{dx} + P(x)y = Q(x)$, what is the integrating factor $I(x)$?",
                        [
                            "$I(x) = e^{\\int P(x) dx}$",
                            "$I(x) = \\int P(x) dx$",
                            "$I(x) = e^{-\\int P(x) dx}$",
                            "$I(x) = e^{\\int Q(x) dx}$"
                        ],
                        0,
                        "Multiplying by $I(x) = e^{\\int P(x)dx}$ collapses the left-hand side into the product rule derivative $\\frac{d}{dx}[I(x) y]$."
                    ),
                    make_q(
                        "Find the integrating factor for $\\frac{dy}{dx} + \\frac{3}{x}y = x^2$ for $x > 0$.",
                        ["$x^3$", "$3\\ln x$", "$e^{3x}$", "$\\frac{1}{x^3}$"],
                        0,
                        "$I(x) = e^{\\int (3/x) dx} = e^{3\\ln x} = e^{\\ln(x^3)} = x^3$."
                    ),
                    make_q(
                        "Solve $\\frac{dy}{dx} + 2y = 4$ with $y(0) = 5$.",
                        ["$y = 2 + 3e^{-2x}$", "$y = 2 + 5e^{-2x}$", "$y = 4 + e^{-2x}$", "$y = 2 - 3e^{-2x}$"],
                        0,
                        "$I(x) = e^{2x}$. Multiplying: $\\frac{d}{dx}[e^{2x} y] = 4e^{2x} \\Rightarrow e^{2x}y = 2e^{2x} + C \\Rightarrow y = 2 + C e^{-2x}$. Using $y(0) = 5 \\Rightarrow 5 = 2 + C \\Rightarrow C = 3$. Thus $y = 2 + 3e^{-2x}$."
                    )
                ]
            },
            {
                "heading": "Section 3: Homogeneous Differential Equations (y = vx)",
                "questions": [
                    make_q(
                        "Which substitution transforms a homogeneous differential equation $\\frac{dy}{dx} = f(y/x)$ into a separable equation?",
                        [
                            "$y = v x \\Rightarrow \\frac{dy}{dx} = v + x\\frac{dv}{dx}$",
                            "$y = v + x$",
                            "$v = x y$",
                            "$y = v^2 x$"
                        ],
                        0,
                        "Let $v = y/x \\Rightarrow y = v x$. By the product rule, $\\frac{dy}{dx} = v + x\\frac{dv}{dx}$, reducing the ODE to $v + x\\frac{dv}{dx} = f(v)$."
                    ),
                    make_q(
                        "Classify the differential equation $\\frac{dy}{dx} = \\frac{x^2 + y^2}{2xy}$.",
                        [
                            "Homogeneous of degree 0",
                            "First-order linear",
                            "Exact non-linear",
                            "Second-order Bernoulli"
                        ],
                        0,
                        "Dividing numerator and denominator by $x^2$ gives $\\frac{1 + (y/x)^2}{2(y/x)}$, which is a function purely of $y/x$, classifying it as homogeneous."
                    ),
                    make_q(
                        "Using $y = vx$, what does $\\frac{dy}{dx} = \\frac{y}{x} + 1$ become?",
                        [
                            "$x\\frac{dv}{dx} = 1$",
                            "$v + \\frac{dv}{dx} = 1$",
                            "$x\\frac{dv}{dx} = v + 1$",
                            "$\\frac{dv}{dx} = x$"
                        ],
                        0,
                        "Substitute $\\frac{dy}{dx} = v + x\\frac{dv}{dx}$ and $y/x = v$: $v + x\\frac{dv}{dx} = v + 1 \\Rightarrow x\\frac{dv}{dx} = 1$."
                    )
                ]
            },
            {
                "heading": "Section 4: Numerical Euler's Method",
                "questions": [
                    make_q(
                        "What is Euler's recurrence relation for approximating solutions to $\\frac{dy}{dx} = f(x, y)$ with step size $h$?",
                        [
                            "$y_{n+1} = y_n + h f(x_n, y_n)$",
                            "$y_{n+1} = y_n + \\frac{h}{2} f(x_n, y_n)$",
                            "$y_{n+1} = f(x_n + h, y_n)$",
                            "$y_{n+1} = y_n + h^2 f(x_n, y_n)$"
                        ],
                        0,
                        "Euler's method uses the tangent line approximation: $y_{n+1} = y_n + h \\left.\\frac{dy}{dx}\\right|_{(x_n, y_n)} = y_n + h f(x_n, y_n)$."
                    ),
                    make_q(
                        "Given $\\frac{dy}{dx} = x + y$ with $y(0) = 1$, use Euler's method with step size $h = 0.1$ to find $y_1$ at $x = 0.1$.",
                        ["$1.10$", "$1.05$", "$1.21$", "$1.15$"],
                        0,
                        "$y_1 = y_0 + h(x_0 + y_0) = 1 + 0.1(0 + 1) = 1 + 0.1 = 1.10$."
                    ),
                    make_q(
                        "Using the result above ($x_1 = 0.1, y_1 = 1.10$), find $y_2$ at $x = 0.2$ with $h = 0.1$.",
                        ["$1.22$", "$1.20$", "$1.25$", "$1.31$"],
                        0,
                        "$y_2 = y_1 + h(x_1 + y_1) = 1.10 + 0.1(0.1 + 1.10) = 1.10 + 0.1(1.20) = 1.10 + 0.12 = 1.22$."
                    )
                ]
            }
        ]
    },

    # --------------------------------------------------------------------------
    # IBHL 5.03: Maclaurin Series & Convergence of Series
    # --------------------------------------------------------------------------
    {
        "track": "ibhl",
        "num": "5.03",
        "slug": "maclaurin-series-convergence-of-series",
        "title": "Maclaurin Series & Convergence of Series",
        "sections": [
            {
                "heading": "Section 1: The Maclaurin Series Formula",
                "questions": [
                    make_q(
                        "What is the general formula for the Maclaurin series expansion of a function $f(x)$?",
                        [
                            "$f(x) = \\sum_{n=0}^\\infty \\frac{f^{(n)}(0)}{n!} x^n = f(0) + f'(0)x + \\frac{f''(0)}{2!}x^2 + \\dots$",
                            "$f(x) = \\sum_{n=0}^\\infty f^{(n)}(0) x^n$",
                            "$f(x) = \\sum_{n=1}^\\infty \\frac{f(n)}{n!} x^n$",
                            "$f(x) = \\sum_{n=0}^\\infty \\frac{f^{(n)}(x)}{n!} x^n$"
                        ],
                        0,
                        "A Maclaurin series is a Taylor series centered at $x = 0$: $f(x) = \\sum_{n=0}^\\infty \\frac{f^{(n)}(0)}{n!} x^n$."
                    ),
                    make_q(
                        "Find the first three non-zero terms of the Maclaurin expansion of $f(x) = \\cos(2x)$.",
                        [
                            "$1 - 2x^2 + \\frac{2}{3}x^4$",
                            "$1 - \\frac{1}{2}x^2 + \\frac{1}{24}x^4$",
                            "$1 - 4x^2 + 16x^4$",
                            "$2x - \\frac{4}{3}x^3 + \\frac{4}{15}x^5$"
                        ],
                        0,
                        "Standard series $\\cos u = 1 - \\frac{u^2}{2} + \\frac{u^4}{24} - \\dots$. Substitute $u = 2x$: $1 - \\frac{(2x)^2}{2} + \\frac{(2x)^4}{24} = 1 - 2x^2 + \\frac{16x^4}{24} = 1 - 2x^2 + \\frac{2}{3}x^4$."
                    ),
                    make_q(
                        "What is the coefficient of $x^3$ in the Maclaurin series of $e^{-3x}$?",
                        ["$-\\frac{9}{2}$", "$\\frac{9}{2}$", "$-9$", "$-27$"],
                        0,
                        "$e^u = \\sum \\frac{u^n}{n!}$. For $n = 3$, $\\frac{(-3x)^3}{3!} = \\frac{-27x^3}{6} = -\\frac{9}{2}x^3$. The coefficient is $-\\frac{9}{2}$."
                    )
                ]
            },
            {
                "heading": "Section 2: Manipulating Standard Maclaurin Expansions",
                "questions": [
                    make_q(
                        "Find the Maclaurin series for $\\ln(1 + 3x)$ up to the $x^3$ term.",
                        [
                            "$3x - \\frac{9}{2}x^2 + 9x^3$",
                            "$3x + \\frac{9}{2}x^2 + 9x^3$",
                            "$x - \\frac{1}{2}x^2 + \\frac{1}{3}x^3$",
                            "$3x - 9x^2 + 27x^3$"
                        ],
                        0,
                        "Standard series $\\ln(1+u) = u - \\frac{u^2}{2} + \\frac{u^3}{3} - \\dots$. With $u = 3x$: $(3x) - \\frac{(3x)^2}{2} + \\frac{(3x)^3}{3} = 3x - \\frac{9}{2}x^2 + 9x^3$."
                    ),
                    make_q(
                        "Evaluate $\\lim_{x \\to 0} \\frac{e^x - 1 - x}{x^2}$ using Maclaurin series.",
                        ["$\\frac{1}{2}$", "$1$", "$0$", "$\\infty$"],
                        0,
                        "$e^x = 1 + x + \\frac{x^2}{2} + \\dots$. Then $e^x - 1 - x = \\frac{x^2}{2} + O(x^3)$. Dividing by $x^2$: $\\frac{1}{2} + O(x) \\to \\frac{1}{2}$ as $x \\to 0$."
                    ),
                    make_q(
                        "Find the first two non-zero terms of the series for $\\frac{1}{1 + x^2}$.",
                        ["$1 - x^2$", "$1 + x^2$", "$1 - x$", "$x - x^3$"],
                        0,
                        "Geometric series $\\frac{1}{1 - u} = 1 + u + u^2 + \\dots$. With $u = -x^2$: $1 - x^2 + x^4 - \\dots$."
                    )
                ]
            },
            {
                "heading": "Section 3: The Ratio Test for Convergence",
                "questions": [
                    make_q(
                        "What does the Ratio Test state for a positive series $\\sum a_n$ when $L = \\lim_{n \\to \\infty} \\frac{a_{n+1}}{a_n}$?",
                        [
                            "Converges if $L < 1$, diverges if $L > 1$, test is inconclusive if $L = 1$",
                            "Converges if $L = 1$, diverges otherwise",
                            "Diverges if $L < 1$, converges if $L > 1$",
                            "Always inconclusive for power series"
                        ],
                        0,
                        "The Ratio Test establishes absolute convergence when the limiting ratio $L < 1$, divergence when $L > 1$, and provides no information when $L = 1$."
                    ),
                    make_q(
                        "Determine the convergence of $\\sum_{n=1}^\\infty \\frac{n}{3^n}$ using the Ratio Test.",
                        [
                            "Converges, because $L = \\lim \\frac{n+1}{3^{n+1}} \\cdot \\frac{3^n}{n} = \\frac{1}{3} < 1$",
                            "Diverges, because $L = 3 > 1$",
                            "Inconclusive, because $L = 1$",
                            "Diverges, because the terms do not approach 0"
                        ],
                        0,
                        "$\\lim_{n \\to \\infty} \\frac{n+1}{n} \\cdot \\frac{3^n}{3^{n+1}} = 1 \\cdot \\frac{1}{3} = \\frac{1}{3}$. Since $L = 1/3 < 1$, the series converges."
                    ),
                    make_q(
                        "What is the limit $L$ in the Ratio Test for the harmonic series $\\sum_{n=1}^\\infty \\frac{1}{n}$?",
                        ["$1$ (test is inconclusive)", "$0$", "$\\infty$", "$1/2$"],
                        0,
                        "$\\lim_{n \\to \\infty} \\frac{1/(n+1)}{1/n} = \\lim \\frac{n}{n+1} = 1$. The Ratio Test is inconclusive ($L = 1$); the harmonic series diverges by the p-series test ($p = 1$)."
                    )
                ]
            },
            {
                "heading": "Section 4: Radius and Interval of Convergence",
                "questions": [
                    make_q(
                        "Find the radius of convergence $R$ for the power series $\\sum_{n=1}^\\infty \\frac{(2x)^n}{n}$.",
                        ["$R = \\frac{1}{2}$", "$R = 2$", "$R = 1$", "$R = \\infty$"],
                        0,
                        "Ratio test: $\\left|\\frac{(2x)^{n+1}}{n+1} \\cdot \\frac{n}{(2x)^n}\\right| = 2|x| \\frac{n}{n+1} \\to 2|x|$. For convergence: $2|x| < 1 \\Rightarrow |x| < 1/2$. Thus $R = 1/2$."
                    ),
                    make_q(
                        "What is the radius of convergence of the Maclaurin series for $e^x$?",
                        ["$R = \\infty$", "$R = 1$", "$R = e$", "$R = 0$"],
                        0,
                        "The exponential series converges for all complex numbers $x \\in \\mathbb{C}$; its radius of convergence is infinite ($R = \\infty$)."
                    ),
                    make_q(
                        "For $\\sum_{n=0}^\\infty x^n$, what is the exact interval of convergence?",
                        ["$(-1, 1)$", "$[-1, 1]$", "$(-1, 1]$", "$[-1, 1)$"],
                        0,
                        "Geometric series with ratio $x$: converges if and only if $|x| < 1$. At endpoints $x = \\pm 1$, terms do not approach 0, so neither endpoint converges."
                    )
                ]
            }
        ]
    },

    # --------------------------------------------------------------------------
    # IBHL 5.04: Graphs of Inverse Trigonometric Functions & Their Derivatives (AA HL)
    # --------------------------------------------------------------------------
    {
        "track": "ibhl",
        "num": "5.04",
        "slug": "graphs-of-inverse-trigonometric-functions-their-derivatives-aa-hl",
        "title": "Graphs of Inverse Trigonometric Functions & Their Derivatives (AA HL)",
        "sections": [
            {
                "heading": "Section 1: Domains and Ranges of Inverse Trig Functions",
                "questions": [
                    make_q(
                        "What are the domain and range of the principal arcsine function $y = \\arcsin x$?",
                        [
                            "Domain: $[-1, 1]$; Range: $\\left[-\\frac{\\pi}{2}, \\frac{\\pi}{2}\\right]$",
                            "Domain: $(-\\infty, \\infty)$; Range: $[0, \\pi]$",
                            "Domain: $[-1, 1]$; Range: $[0, \\pi]$",
                            "Domain: $(-\\infty, \\infty)$; Range: $\\left(-\\frac{\\pi}{2}, \\frac{\\pi}{2}\\right)$"
                        ],
                        0,
                        "To make sine invertible, its domain is restricted to $[-\\pi/2, \\pi/2]$ with range $[-1, 1]$. Thus $\\arcsin x$ has domain $[-1, 1]$ and range $[-\\pi/2, \\pi/2]$."
                    ),
                    make_q(
                        "What are the domain and range of $y = \\arccos x$?",
                        [
                            "Domain: $[-1, 1]$; Range: $[0, \\pi]$",
                            "Domain: $[-1, 1]$; Range: $\\left[-\\frac{\\pi}{2}, \\frac{\\pi}{2}\\right]$",
                            "Domain: $(-\\infty, \\infty)$; Range: $[0, \\pi]$",
                            "Domain: $[0, 1]$; Range: $[0, \\pi/2]$"
                        ],
                        0,
                        "The cosine function is restricted to $[0, \\pi]$ where it is strictly decreasing. Therefore $\\arccos x$ maps $[-1, 1]$ onto $[0, \\pi]$."
                    ),
                    make_q(
                        "What are the horizontal asymptotes of the graph of $y = \\arctan x$?",
                        [
                            "$y = \\frac{\\pi}{2}$ and $y = -\\frac{\\pi}{2}$",
                            "$y = \\pi$ and $y = 0$",
                            "$x = \\frac{\\pi}{2}$ and $x = -\\frac{\\pi}{2}$",
                            "$y = 1$ and $y = -1$"
                        ],
                        0,
                        "As $x \\to \\infty$, $\\arctan x \\to \\frac{\\pi}{2}$; as $x \\to -\\infty$, $\\arctan x \\to -\\frac{\\pi}{2}$."
                    )
                ]
            },
            {
                "heading": "Section 2: Derivatives of Inverse Trigonometric Functions",
                "questions": [
                    make_q(
                        "What is the derivative of $f(x) = \\arcsin(3x)$ for $|x| < \\frac{1}{3}$?",
                        [
                            "$\\frac{3}{\\sqrt{1 - 9x^2}}$",
                            "$\\frac{1}{\\sqrt{1 - 9x^2}}$",
                            "$\\frac{3}{\\sqrt{1 - 3x^2}}$",
                            "$\\frac{3}{1 + 9x^2}$"
                        ],
                        0,
                        "By the chain rule: $\\frac{d}{dx}[\\arcsin(u)] = \\frac{u'}{\\sqrt{1 - u^2}} = \\frac{3}{\\sqrt{1 - (3x)^2}} = \\frac{3}{\\sqrt{1 - 9x^2}}$."
                    ),
                    make_q(
                        "Find the derivative of $g(x) = \\arctan\\left(\\frac{x}{2}\\right)$.",
                        [
                            "$\\frac{2}{4 + x^2}$",
                            "$\\frac{1}{1 + x^2/4}$",
                            "$\\frac{1}{4 + x^2}$",
                            "$\\frac{2}{\\sqrt{4 - x^2}}$"
                        ],
                        0,
                        "$\\frac{d}{dx}[\\arctan(x/2)] = \\frac{1/2}{1 + (x/2)^2} = \\frac{1/2}{1 + x^2/4} = \\frac{1/2}{(4 + x^2)/4} = \\frac{2}{4 + x^2}$."
                    ),
                    make_q(
                        "What is the relationship between the derivatives of $\\arcsin x$ and $\\arccos x$?",
                        [
                            "$\\frac{d}{dx}[\\arccos x] = -\\frac{d}{dx}[\\arcsin x] = -\\frac{1}{\\sqrt{1 - x^2}}$",
                            "$\\frac{d}{dx}[\\arccos x] = \\frac{d}{dx}[\\arcsin x]$",
                            "$\\frac{d}{dx}[\\arccos x] = \\frac{1}{1 - x^2}$",
                            "They are reciprocals of each other"
                        ],
                        0,
                        "Because $\\arcsin x + \\arccos x = \\frac{\\pi}{2}$ for all $x \\in [-1, 1]$, differentiating both sides yields $\\frac{d}{dx}[\\arccos x] = -\\frac{d}{dx}[\\arcsin x]$."
                    )
                ]
            },
            {
                "heading": "Section 3: Tangent Lines and Extreme Values",
                "questions": [
                    make_q(
                        "Find the slope of the tangent line to $y = \\arcsin x$ at $x = 0$.",
                        ["$1$", "$0$", "$\\pi/2$", "Undefined"],
                        0,
                        "$y'(x) = \\frac{1}{\\sqrt{1 - x^2}}$. At $x = 0$, $y'(0) = \\frac{1}{\\sqrt{1 - 0}} = 1$."
                    ),
                    make_q(
                        "What happens to the slope of $y = \\arcsin x$ as $x \\to 1^-$?",
                        [
                            "The slope approaches $+\\infty$ (vertical tangent)",
                            "The slope approaches $0$",
                            "The slope approaches $1$",
                            "The slope approaches $-1$"
                        ],
                        0,
                        "As $x \\to 1^-$, $\\sqrt{1 - x^2} \\to 0^+$, so $y'(x) = \\frac{1}{\\sqrt{1 - x^2}} \\to +\\infty$, resulting in a vertical tangent at the boundary."
                    ),
                    make_q(
                        "Find the equation of the tangent line to $y = \\arctan x$ at $x = 1$.",
                        [
                            "$y - \\frac{\\pi}{4} = \\frac{1}{2}(x - 1)$",
                            "$y - \\frac{\\pi}{4} = 1(x - 1)$",
                            "$y = \\frac{1}{2}x + \\frac{\\pi}{4}$",
                            "$y - 1 = \\frac{1}{2}\\left(x - \\frac{\\pi}{4}\\right)$"
                        ],
                        0,
                        "Point is $(1, \\arctan 1) = (1, \\pi/4)$. Derivative is $y'(1) = \\frac{1}{1 + 1^2} = \\frac{1}{2}$. Tangent line: $y - \\frac{\\pi}{4} = \\frac{1}{2}(x - 1)$."
                    )
                ]
            },
            {
                "heading": "Section 4: Integration Producing Inverse Trig Functions",
                "questions": [
                    make_q(
                        "Evaluate $\\int_0^{1/2} \\frac{1}{\\sqrt{1 - x^2}} dx$.",
                        ["$\\frac{\\pi}{6}$", "$\\frac{\\pi}{3}$", "$\\frac{\\pi}{4}$", "$\\frac{1}{2}$"],
                        0,
                        "$[\\arcsin x]_0^{1/2} = \\arcsin(1/2) - \\arcsin(0) = \\frac{\\pi}{6} - 0 = \\frac{\\pi}{6}$."
                    ),
                    make_q(
                        "Evaluate $\\int_0^1 \\frac{1}{1 + x^2} dx$.",
                        ["$\\frac{\\pi}{4}$", "$\\frac{\\pi}{2}$", "$1$", "$\\ln 2$"],
                        0,
                        "$[\\arctan x]_0^1 = \\arctan(1) - \\arctan(0) = \\frac{\\pi}{4} - 0 = \\frac{\\pi}{4}$."
                    ),
                    make_q(
                        "Evaluate $\\int \\frac{1}{\\sqrt{4 - 9x^2}} dx$.",
                        [
                            "$\\frac{1}{3}\\arcsin\\left(\\frac{3x}{2}\\right) + C$",
                            "$\\frac{1}{2}\\arcsin\\left(\\frac{3x}{2}\\right) + C$",
                            "$\\arcsin\\left(\\frac{3x}{2}\\right) + C$",
                            "$\\frac{1}{6}\\arcsin\\left(\\frac{3x}{2}\\right) + C$"
                        ],
                        0,
                        "Factor out 4: $\\sqrt{4(1 - 9x^2/4)} = 2\\sqrt{1 - (3x/2)^2}$. Let $u = 3x/2, du = 3/2 dx \\Rightarrow dx = 2/3 du$. Integral: $\\frac{1}{2} \\cdot \\frac{2}{3} \\int \\frac{du}{\\sqrt{1 - u^2}} = \\frac{1}{3}\\arcsin(u) + C = \\frac{1}{3}\\arcsin(3x/2) + C$."
                    )
                ]
            }
        ]
    },

    # --------------------------------------------------------------------------
    # IBHL 6.01: Matrices (AI HL)
    # --------------------------------------------------------------------------
    {
        "track": "ibhl",
        "num": "6.01",
        "slug": "matrices-ai-hl",
        "title": "Matrices (AI HL)",
        "sections": [
            {
                "heading": "Section 1: Matrix Multiplication and Inverses",
                "questions": [
                    make_q(
                        "Compute the matrix product $A B$ for $A = [[1, 2], [3, 4]]$ and $B = [[2, 0], [1, 3]]$.",
                        [
                            "$[[4, 6], [10, 12]]$",
                            "$[[2, 0], [3, 12]]$",
                            "$[[4, 10], [6, 12]]$",
                            "$[[3, 2], [4, 7]]$"
                        ],
                        0,
                        "Row 1: $[1(2)+2(1), 1(0)+2(3)] = [4, 6]$. Row 2: $[3(2)+4(1), 3(0)+4(3)] = [10, 12]$."
                    ),
                    make_q(
                        "Find the inverse of the matrix $M = [[3, 5], [1, 2]]$.",
                        [
                            "$[[2, -5], [-1, 3]]$",
                            "$[[-2, 5], [1, -3]]$",
                            "$[[3, -1], [-5, 2]]$",
                            "$[[1/3, 1/5], [1, 1/2]]$"
                        ],
                        0,
                        "$\\det(M) = 3(2) - 5(1) = 6 - 5 = 1$. The inverse is $\\frac{1}{\\det}[ [d, -b], [-c, a] ] = [[2, -5], [-1, 3]]$."
                    ),
                    make_q(
                        "If $A$ and $B$ are invertible matrices of the same dimension, what is $(A B)^{-1}$?",
                        ["$B^{-1} A^{-1}$", "$A^{-1} B^{-1}$", "$B A^{-1}$", "$A B^{-1}$"],
                        0,
                        "The socks-and-shoes property of matrix inverses reverses order: $(A B)^{-1} = B^{-1} A^{-1}$."
                    )
                ]
            },
            {
                "heading": "Section 2: Determinants and Singularity",
                "questions": [
                    make_q(
                        "For what value of $k$ is the matrix $A = [[k, 6], [2, 3]]$ singular (non-invertible)?",
                        ["$k = 4$", "$k = 6$", "$k = 0$", "$k = 9$"],
                        0,
                        "A matrix is singular when its determinant is zero: $\\det(A) = 3k - 12 = 0 \\Rightarrow 3k = 12 \\Rightarrow k = 4$."
                    ),
                    make_q(
                        "If $A$ is a $3 \\times 3$ matrix with $\\det(A) = 5$, what is $\\det(2A)$?",
                        ["$40$", "$10$", "$20$", "$80$"],
                        0,
                        "For an $n \\times n$ matrix, $\\det(c A) = c^n \\det(A)$. Here $n = 3$, so $\\det(2A) = 2^3 \\times 5 = 8 \\times 5 = 40$."
                    ),
                    make_q(
                        "If $\\det(A) = 4$, what is $\\det(A^{-1})$?",
                        ["$\\frac{1}{4}$", "$-4$", "$4$", "$16$"],
                        0,
                        "$\\det(A^{-1}) = \\frac{1}{\\det(A)} = \\frac{1}{4}$."
                    )
                ]
            },
            {
                "heading": "Section 3: Eigenvalues and Eigenvectors",
                "questions": [
                    make_q(
                        "Find the eigenvalues of the matrix $A = [[4, 2], [1, 3]]$.",
                        ["$\\lambda = 5$ and $\\lambda = 2$", "$\\lambda = 4$ and $\\lambda = 3$", "$\\lambda = 6$ and $\\lambda = 1$", "$\\lambda = 7$ and $\\lambda = 0$"],
                        0,
                        "Characteristic equation: $\\det(A - \\lambda I) = (4 - \\lambda)(3 - \\lambda) - 2 = \\lambda^2 - 7\\lambda + 12 - 2 = \\lambda^2 - 7\\lambda + 10 = 0 \\Rightarrow (\\lambda - 5)(\\lambda - 2) = 0$. Roots are $\\lambda = 5, 2$."
                    ),
                    make_q(
                        "Find an eigenvector corresponding to $\\lambda = 5$ for $A = [[4, 2], [1, 3]]$.",
                        ["$[2, 1]^T$", "$[1, 2]^T$", "$[1, -1]^T$", "$[2, -1]^T$"],
                        0,
                        "Solve $(A - 5I)\\mathbf{v} = \\mathbf{0} \\Rightarrow [[-1, 2], [1, -2]] [x, y]^T = [0, 0]^T \\Rightarrow -x + 2y = 0 \\Rightarrow x = 2y$. With $y = 1$, $\\mathbf{v} = [2, 1]^T$."
                    ),
                    make_q(
                        "What is the sum of the eigenvalues of an $n \\times n$ matrix $A$ equal to?",
                        ["The trace of $A$ (sum of diagonal entries)", "The determinant of $A$", "The rank of $A$", "$n$"],
                        0,
                        "By algebraic properties of the characteristic polynomial, $\\sum \\lambda_i = \\text{tr}(A)$."
                    )
                ]
            },
            {
                "heading": "Section 4: Diagonalization & Matrix Powers",
                "questions": [
                    make_q(
                        "If a matrix $A$ is diagonalized as $A = P D P^{-1}$, how is the power $A^n$ computed efficiently?",
                        ["$A^n = P D^n P^{-1}$", "$A^n = P^n D^n (P^{-1})^n$", "$A^n = D^n$", "$A^n = P D P^{-1} n$"],
                        0,
                        "$A^n = (P D P^{-1})(P D P^{-1}) \\dots = P D^n P^{-1}$. For a diagonal matrix $D$, $D^n$ simply raises each diagonal entry to the $n$th power."
                    ),
                    make_q(
                        "If $D = [[2, 0], [0, 3]]$, what is $D^4$?",
                        ["$[[16, 0], [0, 81]]$", "$[[8, 0], [0, 12]]$", "$[[24, 0], [0, 24]]$", "$[[16, 81], [0, 0]]$"],
                        0,
                        "For diagonal matrices, powers are computed element-wise along the diagonal: $2^4 = 16$ and $3^4 = 81$, yielding $[[16, 0], [0, 81]]$."
                    ),
                    make_q(
                        "When is an $n \\times n$ matrix $A$ guaranteed to be diagonalizable?",
                        [
                            "When it has $n$ linearly independent eigenvectors (or $n$ distinct eigenvalues)",
                            "When its determinant is non-zero",
                            "Only if it is a symmetric identity matrix",
                            "When all its entries are positive"
                        ],
                        0,
                        "A matrix is diagonalizable if and only if there exists an eigenbasis consisting of $n$ linearly independent eigenvectors."
                    )
                ]
            }
        ]
    },

    # --------------------------------------------------------------------------
    # IBHL 6.02: Graph Theory & Networks (AI HL)
    # --------------------------------------------------------------------------
    {
        "track": "ibhl",
        "num": "6.02",
        "slug": "graph-theory-networks-ai-hl",
        "title": "Graph Theory & Networks (AI HL)",
        "sections": [
            {
                "heading": "Section 1: Degrees and the Handshaking Lemma",
                "questions": [
                    make_q(
                        "What does the Handshaking Lemma state for any undirected graph with $V$ vertices and $E$ edges?",
                        [
                            "The sum of the degrees of all vertices equals twice the number of edges: $\\sum \\deg(v) = 2E$",
                            "The sum of the degrees equals $E$",
                            "The number of vertices with odd degree is always odd",
                            "Every vertex must have degree at least 2"
                        ],
                        0,
                        "Because every edge connects two endpoints, each edge contributes exactly 2 to the sum of the degrees of the vertices: $\\sum \\deg(v) = 2E$."
                    ),
                    make_q(
                        "A graph has $6$ vertices, each having degree $3$. How many edges does the graph have?",
                        ["$9$", "$18$", "$6$", "$12$"],
                        0,
                        "$\\sum \\deg(v) = 6 \\times 3 = 18$. By the Handshaking Lemma, $2E = 18 \\Rightarrow E = 9$."
                    ),
                    make_q(
                        "Why can a graph never have an odd number of vertices of odd degree?",
                        [
                            "Because $\\sum \\deg(v) = 2E$ is always even, the sum of odd degrees must be even, forcing an even count of odd vertices",
                            "Because edges cannot cross each other",
                            "By Euler's formula $V - E + F = 2$",
                            "Because every vertex must have at least one adjacent edge"
                        ],
                        0,
                        "The total sum of degrees is even ($2E$). The sum of even degrees is even, so the sum of the odd degrees must also be even, which requires an even number of odd terms."
                    )
                ]
            },
            {
                "heading": "Section 2: Eulerian and Hamiltonian Paths and Circuits",
                "questions": [
                    make_q(
                        "What condition is both necessary and sufficient for a connected graph to contain an Eulerian circuit (a closed trail visiting every edge exactly once)?",
                        [
                            "Every vertex has an even degree",
                            "Exactly two vertices have odd degree",
                            "The graph contains no cycles",
                            "The graph is a complete bipartite graph"
                        ],
                        0,
                        "Euler proved that a connected graph has an Eulerian circuit if and only if all vertices have even degree."
                    ),
                    make_q(
                        "If a connected graph has exactly two vertices of odd degree, what type of Eulerian walk does it contain?",
                        [
                            "An Eulerian trail (open path visiting every edge once) that starts at one odd vertex and ends at the other",
                            "An Eulerian circuit returning to the start",
                            "No Eulerian trail or circuit can exist",
                            "A Hamiltonian cycle"
                        ],
                        0,
                        "Euler's theorem guarantees an open Eulerian trail if and only if exactly two vertices have odd degree; the trail must start at one odd vertex and terminate at the other."
                    ),
                    make_q(
                        "What is the difference between an Eulerian circuit and a Hamiltonian cycle?",
                        [
                            "An Eulerian circuit visits every edge once; a Hamiltonian cycle visits every vertex once",
                            "An Eulerian circuit visits every vertex once; a Hamiltonian cycle visits every edge once",
                            "They are identical concepts in graph theory",
                            "Hamiltonian cycles apply only to directed trees"
                        ],
                        0,
                        "Eulerian paths/circuits pertain to visiting every edge, while Hamiltonian paths/cycles pertain to visiting every vertex."
                    )
                ]
            },
            {
                "heading": "Section 3: Minimum Spanning Trees (Kruskal & Prim)",
                "questions": [
                    make_q(
                        "In a connected weighted graph with $V$ vertices, how many edges does any spanning tree contain?",
                        ["$V - 1$", "$V$", "$V + 1$", "$\\frac{V(V-1)}{2}$"],
                        0,
                        "Any tree on $V$ vertices is minimally connected and contains no cycles, having precisely $V - 1$ edges."
                    ),
                    make_q(
                        "How does Kruskal's algorithm select edges to construct a Minimum Spanning Tree (MST)?",
                        [
                            "Sorts all edges by weight and greedily adds the smallest available edge that does not create a cycle",
                            "Grows a single tree by continuously adding the closest vertex to the current tree",
                            "Removes the largest cycle edges one by one until only a tree remains",
                            "Visits vertices in alphabetical order"
                        ],
                        0,
                        "Kruskal's algorithm is an edge-based greedy algorithm that adds edges in order of increasing weight, rejecting any edge that completes a cycle."
                    ),
                    make_q(
                        "How does Prim's algorithm differ conceptually from Kruskal's algorithm?",
                        [
                            "Prim grows a single connected tree from an arbitrary starting vertex, whereas Kruskal maintains a forest of components until unified",
                            "Prim works only on unweighted graphs",
                            "Kruskal finds the longest path rather than minimum tree",
                            "Prim can only be applied to planar graphs"
                        ],
                        0,
                        "Prim's algorithm builds a single growing connected tree vertex by vertex, whereas Kruskal's algorithm connects disjoint components across the whole graph."
                    )
                ]
            },
            {
                "heading": "Section 4: Shortest Paths and Dijkstra's Algorithm",
                "questions": [
                    make_q(
                        "What is the purpose of Dijkstra's algorithm?",
                        [
                            "To find the shortest paths from a single source vertex to all other vertices in a network with non-negative edge weights",
                            "To find a minimum spanning tree",
                            "To determine if a graph has an Eulerian circuit",
                            "To find the maximum flow through a network"
                        ],
                        0,
                        "Dijkstra's algorithm is the standard greedy algorithm for computing single-source shortest paths on graphs with non-negative edge weights."
                    ),
                    make_q(
                        "Why does Dijkstra's algorithm fail if a network contains negative edge weights?",
                        [
                            "A greedy choice once finalized could be improved later by a negative edge, invalidating the optimality assumption",
                            "Distances cannot be negative by definition",
                            "The algorithm enters an infinite cycle immediately",
                            "Square roots of negative weights cannot be computed"
                        ],
                        0,
                        "Dijkstra's greedy assumption assumes that once a vertex distance is finalized, no shorter path to it exists; negative edges violate this monotonic property."
                    ),
                    make_q(
                        "In a planar graph, if $V = 6$ and $E = 9$, how many faces $F$ does the graph enclose according to Euler's formula $V - E + F = 2$?",
                        ["$5$", "$3$", "$4$", "$6$"],
                        0,
                        "By Euler's planar formula $V - E + F = 2$: $6 - 9 + F = 2 \\Rightarrow -3 + F = 2 \\Rightarrow F = 5$."
                    )
                ]
            }
        ]
    },

    # --------------------------------------------------------------------------
    # IBHL 6.03: Markov Chains (AI HL)
    # --------------------------------------------------------------------------
    {
        "track": "ibhl",
        "num": "6.03",
        "slug": "markov-chains-ai-hl",
        "title": "Markov Chains (AI HL)",
        "sections": [
            {
                "heading": "Section 1: Transition Matrices and State Vectors",
                "questions": [
                    make_q(
                        "In a standard transition probability matrix $T$ (where entry $T_{ij}$ represents the probability of moving from state $i$ to state $j$), what must the sum of the entries in each row equal?",
                        ["$1$", "$0$", "The number of states", "$\\frac{1}{n}$"],
                        0,
                        "Because each row corresponds to the probability distribution of transitioning from a given state to all possible next states, the sum of probabilities across each row is strictly $1$."
                    ),
                    make_q(
                        "Given initial state probability vector $\\mathbf{s}_0 = [0.6, 0.4]$ and transition matrix $T = [[0.8, 0.2], [0.3, 0.7]]$, what is the state distribution after one step $\\mathbf{s}_1 = \\mathbf{s}_0 T$?",
                        [
                            "$[0.60, 0.40]$",
                            "$[0.55, 0.45]$",
                            "$[0.66, 0.34]$",
                            "$[0.48, 0.28]$"
                        ],
                        0,
                        "$\\mathbf{s}_1 = [0.6(0.8) + 0.4(0.3), 0.6(0.2) + 0.4(0.7)] = [0.48 + 0.12, 0.12 + 0.28] = [0.60, 0.40]$."
                    ),
                    make_q(
                        "What is the Markov property (memoryless property) in stochastic processes?",
                        [
                            "The future state depends only upon the current state, not on the sequence of states that preceded it",
                            "The process has zero variance",
                            "All states have equal probability of occurrence",
                            "The chain can never visit the same state twice"
                        ],
                        0,
                        "A first-order Markov chain satisfies $P(X_{n+1} = s \\mid X_n, X_{n-1}, \\dots, X_0) = P(X_{n+1} = s \\mid X_n)$, meaning the conditional probability distribution depends only on the present state."
                    )
                ]
            },
            {
                "heading": "Section 2: Multi-Step Transitions",
                "questions": [
                    make_q(
                        "How is the probability distribution $\\mathbf{s}_n$ after $n$ transitions computed from the initial state vector $\\mathbf{s}_0$ and transition matrix $T$?",
                        [
                            "$\\mathbf{s}_n = \\mathbf{s}_0 T^n$",
                            "$\\mathbf{s}_n = \\mathbf{s}_0 + n T$",
                            "$\\mathbf{s}_n = T^n \\mathbf{s}_0$",
                            "$\\mathbf{s}_n = (\\mathbf{s}_0 T)^n$"
                        ],
                        0,
                        "Iterating the transition step $\\mathbf{s}_1 = \\mathbf{s}_0 T, \\mathbf{s}_2 = \\mathbf{s}_1 T = \\mathbf{s}_0 T^2$ leads to $\\mathbf{s}_n = \\mathbf{s}_0 T^n$."
                    ),
                    make_q(
                        "If $T = [[0.5, 0.5], [0.5, 0.5]]$, evaluate $T^2$.",
                        [
                            "$[[0.5, 0.5], [0.5, 0.5]]$",
                            "$[[0.25, 0.25], [0.25, 0.25]]$",
                            "$[[1, 0], [0, 1]]$",
                            "$[[0.5, 0], [0, 0.5]]$"
                        ],
                        0,
                        "Each entry is $0.5(0.5) + 0.5(0.5) = 0.25 + 0.25 = 0.5$. Thus $T^2 = T$."
                    ),
                    make_q(
                        "What does entry $(T^3)_{2,1}$ represent?",
                        [
                            "The probability of transitioning from State 2 to State 1 in exactly 3 steps",
                            "The probability of transitioning from State 1 to State 2 in 3 steps",
                            "Three times the one-step probability",
                            "The cube of the probability from State 2 to State 1"
                        ],
                        0,
                        "In the $n$-step transition matrix $T^n$, the entry in row $i$, column $j$ is the conditional probability of being in state $j$ after $n$ steps given starting in state $i$."
                    )
                ]
            },
            {
                "heading": "Section 3: Steady-State (Stationary) Distribution",
                "questions": [
                    make_q(
                        "What defining matrix equation must the steady-state probability vector $\\mathbf{\\pi} = [\\pi_1, \\pi_2]$ satisfy?",
                        [
                            "$\\mathbf{\\pi} T = \\mathbf{\\pi}$ and $\\sum \\pi_i = 1$",
                            "$T \\mathbf{\\pi} = \\mathbf{0}$",
                            "$\\mathbf{\\pi} T = \\mathbf{0}$",
                            "$\\mathbf{\\pi} = T^{-1}$"
                        ],
                        0,
                        "A steady-state distribution is stationary under transitions ($\\mathbf{\\pi} T = \\mathbf{\\pi}$) and its components form a valid probability distribution (sum to 1)."
                    ),
                    make_q(
                        "Find the stationary distribution for $T = [[0.7, 0.3], [0.2, 0.8]]$.",
                        [
                            "$\\mathbf{\\pi} = [0.4, 0.6]$",
                            "$\\mathbf{\\pi} = [0.5, 0.5]$",
                            "$\\mathbf{\\pi} = [0.3, 0.7]$",
                            "$\\mathbf{\\pi} = [0.6, 0.4]$"
                        ],
                        0,
                        "Set $[\\pi_1, \\pi_2] [[0.7, 0.3], [0.2, 0.8]] = [\\pi_1, \\pi_2] \\Rightarrow 0.7\\pi_1 + 0.2\\pi_2 = \\pi_1 \\Rightarrow 0.2\\pi_2 = 0.3\\pi_1 \\Rightarrow 3\\pi_1 = 2\\pi_2$. Using $\\pi_1 + \\pi_2 = 1$: $\\pi_1 + 1.5\\pi_1 = 1 \\Rightarrow 2.5\\pi_1 = 1 \\Rightarrow \\pi_1 = 0.4$, $\\pi_2 = 0.6$."
                    ),
                    make_q(
                        "When is a Markov chain guaranteed to have a unique stationary distribution that is independent of the initial state?",
                        [
                            "When the transition matrix is regular (some power $T^k$ has strictly positive entries)",
                            "Only if the matrix is symmetric",
                            "Whenever $\\det(T) = 0$",
                            "Only if there are 2 states"
                        ],
                        0,
                        "By the Perron-Frobenius theorem, a regular Markov chain has a unique stationary distribution, and $\\lim_{n \\to \\infty} \\mathbf{s}_0 T^n = \\mathbf{\\pi}$ for any initial distribution $\\mathbf{s}_0$."
                    )
                ]
            },
            {
                "heading": "Section 4: Absorbing Markov Chains",
                "questions": [
                    make_q(
                        "What is an absorbing state in a Markov chain?",
                        [
                            "A state that, once entered, cannot be left ($T_{ii} = 1$ and $T_{ij} = 0$ for $j \\neq i$)",
                            "A state that has probability zero of being visited",
                            "A state that transitions with equal probability to all other states",
                            "A state where the steady-state probability is 0"
                        ],
                        0,
                        "An absorbing state has a loop transition probability of 1 to itself, trapping the process indefinitely once entered."
                    ),
                    make_q(
                        "In an absorbing Markov chain in canonical form $P = [[I, 0], [R, Q]]$, what does the fundamental matrix $N = (I - Q)^{-1}$ calculate?",
                        [
                            "The expected number of visits to each transient state before absorption",
                            "The probability of absorption in one step",
                            "The eigenvalues of the transition matrix",
                            "The total number of absorbing states"
                        ],
                        0,
                        "The fundamental matrix $N = (I - Q)^{-1}$ provides the expected time (number of steps) spent in each transient state starting from any transient state before reaching an absorbing state."
                    ),
                    make_q(
                        "How is the absorption probability matrix $B$ calculated from fundamental matrix $N$ and transient-to-absorbing matrix $R$?",
                        ["$B = N R$", "$B = R N$", "$B = N + R$", "$B = (I - Q) R$"],
                        0,
                        "The matrix of absorption probabilities from each transient state into each absorbing state is given by the matrix product $B = N R$."
                    )
                ]
            }
        ]
    }
]
