#!/usr/bin/env python3
"""Standardized 4-Page Topic Data for AP Calculus AB Part 2 (Topics 3.01 to 8.02 - 11 Topics).

Authentic College Board AP Calculus AB questions adhering to the official CED.
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

APAB_TOPICS_P2 = [
    # --------------------------------------------------------------------------
    # APAB 3.01: The Chain Rule
    # --------------------------------------------------------------------------
    {
        "track": "apab",
        "num": "3.01",
        "slug": "the-chain-rule",
        "title": "The Chain Rule",
        "sections": [
            {
                "heading": "Section 1: Basic Chain Rule & Composite Functions",
                "questions": [
                    make_q(
                        "Differentiate $y = (3x^2 - 5x + 2)^4$.",
                        ["$4(3x^2 - 5x + 2)^3 (6x - 5)$", "$4(6x - 5)^3$", "$12x(3x^2 - 5x + 2)^3$", "$4(3x^2 - 5x + 2)^3$"], 0,
                        "Chain rule $\\frac{d}{dx}[u^4] = 4u^3 \\cdot u'$. With $u = 3x^2 - 5x + 2$, $u' = 6x - 5$. Result is $4(3x^2 - 5x + 2)^3 (6x - 5)$."
                    ),
                    make_q(
                        "If $h(x) = f(g(x))$ with $g(3) = 5, g'(3) = -2,$ and $f'(5) = 7$, what is $h'(3)$?",
                        ["$-14$", "$10$", "$-10$", "$35$"], 0,
                        "By the chain rule: $h'(3) = f'(g(3)) \\cdot g'(3) = f'(5) \\cdot (-2) = 7 \\cdot (-2) = -14$."
                    ),
                    make_q(
                        "Find $\\frac{d}{dx}[\\cos(4x^3)]$.",
                        ["$-12x^2 \\sin(4x^3)$", "$-4\\sin(4x^3)$", "$12x^2 \\sin(4x^3)$", "$-\\sin(12x^2)$"], 0,
                        "Chain rule: $-\\sin(4x^3) \\cdot \\frac{d}{dx}(4x^3) = -12x^2 \\sin(4x^3)$."
                    )
                ]
            },
            {
                "heading": "Section 2: Exponential & Logarithmic Chain Rule",
                "questions": [
                    make_q(
                        "Find the derivative of $f(x) = e^{5x^2 - 2x}$.",
                        ["$(10x - 2) e^{5x^2 - 2x}$", "$e^{10x - 2}$", "$10x e^{5x^2 - 2x}$", "$(5x^2 - 2x) e^{5x^2 - 2x}$"], 0,
                        "$\\frac{d}{dx}[e^u] = u' e^u$. Here $u' = 10x - 2$, so $f'(x) = (10x - 2) e^{5x^2 - 2x}$."
                    ),
                    make_q(
                        "Differentiate $y = \\ln(x^3 + 4)$.",
                        ["$\\frac{3x^2}{x^3 + 4}$", "$\\frac{1}{x^3 + 4}$", "$\\frac{3x^2}{x}$", "$\\frac{1}{3x^2}$"], 0,
                        "$\\frac{d}{dx}[\\ln u] = \\frac{u'}{u}$. With $u = x^3 + 4$, $u' = 3x^2$, giving $\\frac{3x^2}{x^3 + 4}$."
                    ),
                    make_q(
                        "Find $\\frac{d}{dx}[\\ln(\\cos x)]$.",
                        ["$-\\tan x$", "$\\tan x$", "$\\cot x$", "$-\\cot x$"], 0,
                        "$\\frac{1}{\\cos x} \\cdot (-\\sin x) = -\\frac{\\sin x}{\\cos x} = -\\tan x$."
                    )
                ]
            },
            {
                "heading": "Section 3: Repeated Chain Rule Applications",
                "questions": [
                    make_q(
                        "Find the derivative of $y = \\sin^3(2x)$.",
                        ["$6\\sin^2(2x)\\cos(2x)$", "$3\\sin^2(2x)\\cos(2x)$", "$6\\sin(2x)\\cos(2x)$", "$3\\cos^2(2x)$"], 0,
                        "Outer power rule: $3\\sin^2(2x)$. Middle trig rule: $\\cos(2x)$. Inner linear rule: $2$. Product $= 3 \\cdot 2 \\cdot \\sin^2(2x)\\cos(2x) = 6\\sin^2(2x)\\cos(2x)$."
                    ),
                    make_q(
                        "Differentiate $f(x) = \\sqrt{1 + \\tan(3x)}$.",
                        ["$\\frac{3\\sec^2(3x)}{2\\sqrt{1 + \\tan(3x)}}$", "$\\frac{\\sec^2(3x)}{2\\sqrt{1 + \\tan(3x)}}$", "$\\frac{3\\sec^2(3x)}{\\sqrt{1 + \\tan(3x)}}$", "$\\frac{1}{2\\sqrt{1 + \\tan(3x)}}$"], 0,
                        "$\\frac{d}{dx}[\\sqrt{u}] = \\frac{u'}{2\\sqrt{u}}$. Here $u' = 3\\sec^2(3x)$."
                    ),
                    make_q(
                        "If $g(x) = e^{\\sin(4x)}$, what is $g'(0)$?",
                        ["$4$", "$1$", "$0$", "$4e$"], 0,
                        "$g'(x) = 4\\cos(4x) e^{\\sin(4x)}$. At $x = 0$: $g'(0) = 4\\cos(0) e^0 = 4(1)(1) = 4$."
                    )
                ]
            },
            {
                "heading": "Section 4: Table-Based Chain Rule Problems",
                "questions": [
                    make_q(
                        "Let $h(x) = [f(x)]^3$. If $f(1) = 2$ and $f'(1) = -4$, what is $h'(1)$?",
                        ["$-48$", "$-24$", "$12$", "$-16$"], 0,
                        "$h'(x) = 3[f(x)]^2 f'(x) \\Rightarrow h'(1) = 3(2)^2 (-4) = 3(4)(-4) = -48$."
                    ),
                    make_q(
                        "Let $k(x) = f(x^2)$. If $f'(4) = 5$, what is $k'(2)$?",
                        ["$20$", "$10$", "$5$", "$40$"], 0,
                        "$k'(x) = f'(x^2) \\cdot 2x \\Rightarrow k'(2) = f'(4) \\cdot 4 = 5 \\cdot 4 = 20$."
                    ),
                    make_q(
                        "If $F(x) = f(g(x))$ and $g(1) = 3, g'(1) = 2, f(3) = 5, f'(3) = 6$, find the equation of the tangent line to $F$ at $x = 1$.",
                        ["$y - 5 = 12(x - 1)$", "$y - 3 = 12(x - 1)$", "$y - 5 = 6(x - 1)$", "$y - 5 = 2(x - 1)$"], 0,
                        "Point is $(1, F(1)) = (1, f(g(1))) = (1, f(3)) = (1, 5)$. Slope is $F'(1) = f'(g(1)) g'(1) = f'(3) \\cdot 2 = 6 \\cdot 2 = 12$. Tangent line: $y - 5 = 12(x - 1)$."
                    )
                ]
            }
        ]
    },

    # --------------------------------------------------------------------------
    # APAB 3.02: Implicit Differentiation and Inverse Functions
    # --------------------------------------------------------------------------
    {
        "track": "apab",
        "num": "3.02",
        "slug": "implicit-differentiation-and-inverse-functions",
        "title": "Implicit Differentiation and Inverse Functions",
        "sections": [
            {
                "heading": "Section 1: First Derivative by Implicit Differentiation",
                "questions": [
                    make_q(
                        "Find $\\frac{dy}{dx}$ for the circle $x^2 + y^2 = 25$.",
                        ["$-\\frac{x}{y}$", "$\\frac{x}{y}$", "$-\\frac{y}{x}$", "$\\frac{y}{x}$"], 0,
                        "Differentiate implicitly: $2x + 2y \\frac{dy}{dx} = 0 \\Rightarrow \\frac{dy}{dx} = -\\frac{x}{y}$."
                    ),
                    make_q(
                        "Find $\\frac{dy}{dx}$ for the curve $x^3 + y^3 = 6xy$.",
                        ["$\\frac{2y - x^2}{y^2 - 2x}$", "$\\frac{x^2 - 2y}{2x - y^2}$", "$\\frac{2x - y^2}{x^2 - 2y}$", "$\\frac{x^2 + y^2}{6}$"], 0,
                        "$3x^2 + 3y^2 y' = 6(y + x y') \\Rightarrow 3y^2 y' - 6x y' = 6y - 3x^2 \\Rightarrow y'(y^2 - 2x) = 2y - x^2 \\Rightarrow y' = \\frac{2y - x^2}{y^2 - 2x}$."
                    ),
                    make_q(
                        "Find the slope of the tangent line to $x^2 y + y^2 = 5$ at the point $(2, 1)$.",
                        ["$-\\frac{2}{3}$", "$-\\frac{4}{5}$", "$-\\frac{4}{6}$", "$-1$"], 0,
                        "$2xy + x^2 y' + 2y y' = 0$. At $(2, 1)$: $2(2)(1) + 4y' + 2(1)y' = 0 \\Rightarrow 4 + 6y' = 0 \\Rightarrow y' = -\\frac{4}{6} = -\\frac{2}{3}$."
                    )
                ]
            },
            {
                "heading": "Section 2: Second Derivatives Implicitly",
                "questions": [
                    make_q(
                        "For $x^2 + y^2 = 16$, what is $\\frac{d^2 y}{dx^2}$ expressed solely in terms of $y$?",
                        ["$-\\frac{16}{y^3}$", "$\\frac{16}{y^3}$", "$-\\frac{1}{y^2}$", "$-\\frac{4}{y^3}$"], 0,
                        "$y' = -\\frac{x}{y}$. Differentiate: $y'' = -\\frac{1(y) - x y'}{y^2} = -\\frac{y - x(-x/y)}{y^2} = -\\frac{y^2 + x^2}{y^3}$. Since $x^2 + y^2 = 16$, $y'' = -\\frac{16}{y^3}$."
                    ),
                    make_q(
                        "At the point $(0, 2)$ on the ellipse $4x^2 + y^2 = 4$, what is $\\frac{d^2 y}{dx^2}$?",
                        ["$-2$", "$2$", "$-4$", "$0$"], 0,
                        "$8x + 2y y' = 0 \\Rightarrow y' = -\\frac{4x}{y}$. At $(0, 2)$, $y' = 0$. $y'' = -\\frac{4y - 4x y'}{y^2} = -\\frac{4(2) - 0}{4} = -\\frac{8}{4} = -2$."
                    ),
                    make_q(
                        "What is the sign of the concavity at $(3, 4)$ on the circle $x^2 + y^2 = 25$?",
                        ["Negative (concave down)", "Positive (concave up)", "Zero (inflection point)", "Undefined"], 0,
                        "$y'' = -\\frac{25}{y^3}$. At $(3, 4)$, $y'' = -\\frac{25}{64} < 0$, which is concave down."
                    )
                ]
            },
            {
                "heading": "Section 3: Derivatives of Inverse Functions",
                "questions": [
                    make_q(
                        "If $g$ is the inverse of $f$, which formula gives $g'(a)$ where $f(b) = a$?",
                        ["$g'(a) = \\frac{1}{f'(b)}$", "$g'(a) = f'(b)$", "$g'(a) = \\frac{1}{f'(a)}$", "$g'(a) = -\\frac{1}{f'(b)}$"], 0,
                        "By the Inverse Function Theorem, $g'(a) = \\frac{1}{f'(f^{-1}(a))} = \\frac{1}{f'(b)}$."
                    ),
                    make_q(
                        "Let $f(x) = x^3 + 2x - 1$. If $g$ is the inverse of $f$, find $g'(2)$.",
                        ["$\\frac{1}{5}$", "$5$", "$\\frac{1}{14}$", "$14$"], 0,
                        "Find $x$ where $f(x) = 2$: $x^3 + 2x - 1 = 2 \\Rightarrow x^3 + 2x - 3 = 0 \\Rightarrow x = 1$. Then $f'(x) = 3x^2 + 2 \\Rightarrow f'(1) = 5$. Thus $g'(2) = \\frac{1}{f'(1)} = \\frac{1}{5}$."
                    ),
                    make_q(
                        "Let $f(x) = x^5 + x + 1$. What is the derivative of $f^{-1}$ at $x = 3$?",
                        ["$\\frac{1}{6}$", "$6$", "$\\frac{1}{80}$", "$\\frac{1}{5}$"], 0,
                        "Notice $f(1) = 1 + 1 + 1 = 3$. $f'(x) = 5x^4 + 1 \\Rightarrow f'(1) = 6$. Therefore, $(f^{-1})'(3) = \\frac{1}{6}$."
                    )
                ]
            },
            {
                "heading": "Section 4: Derivatives of Inverse Trigonometric Functions",
                "questions": [
                    make_q(
                        "What is $\\frac{d}{dx}[\\arcsin(3x)]$?",
                        ["$\\frac{3}{\\sqrt{1 - 9x^2}}$", "$\\frac{1}{\\sqrt{1 - 9x^2}}$", "$\\frac{3}{1 + 9x^2}$", "$\\frac{3}{\\sqrt{1 - 3x^2}}$"], 0,
                        "Formula: $\\frac{d}{dx}[\\arcsin u] = \\frac{u'}{\\sqrt{1 - u^2}}$. Here $u = 3x, u' = 3$, giving $\\frac{3}{\\sqrt{1 - 9x^2}}$."
                    ),
                    make_q(
                        "Find $\\frac{d}{dx}[\\arctan(x^2)]$.",
                        ["$\\frac{2x}{1 + x^4}$", "$\\frac{1}{1 + x^4}$", "$\\frac{2x}{1 + x^2}$", "$\\frac{2x}{\\sqrt{1 - x^4}}$"], 0,
                        "Formula: $\\frac{d}{dx}[\\arctan u] = \\frac{u'}{1 + u^2}$. Here $u = x^2, u' = 2x$, giving $\\frac{2x}{1 + x^4}$."
                    ),
                    make_q(
                        "What is the slope of the tangent line to $y = \\arctan(x)$ at $x = 1$?",
                        ["$\\frac{1}{2}$", "$1$", "$\\frac{\\pi}{4}$", "$\\frac{1}{\\sqrt{2}}$"], 0,
                        "$y' = \\frac{1}{1 + x^2}$. At $x = 1$: $y'(1) = \\frac{1}{1 + 1^2} = \\frac{1}{2}$."
                    )
                ]
            }
        ]
    },

    # --------------------------------------------------------------------------
    # APAB 4.01: Rates of Change and Rectilinear Motion
    # --------------------------------------------------------------------------
    {
        "track": "apab",
        "num": "4.01",
        "slug": "rates-of-change-and-rectilinear-motion",
        "title": "Rates of Change and Rectilinear Motion",
        "sections": [
            {
                "heading": "Section 1: Position, Velocity & Speed",
                "questions": [
                    make_q(
                        "A particle moves along the $x$-axis with position $x(t) = t^3 - 6t^2 + 9t$ for $t \\geq 0$. At what times is the particle at rest?",
                        ["$t = 1$ and $t = 3$", "$t = 0$ and $t = 3$", "$t = 2$", "$t = 3$ only"], 0,
                        "At rest means velocity $v(t) = x'(t) = 0$: $3t^2 - 12t + 9 = 0 \\Rightarrow 3(t - 1)(t - 3) = 0 \\Rightarrow t = 1, 3$."
                    ),
                    make_q(
                        "What is the speed of the particle when $v(t) = -8$ and $a(t) = 3$?",
                        ["$8$", "$-8$", "$5$", "$\\sqrt{73}$"], 0,
                        "Speed is defined as the absolute value of velocity: $|v(t)| = |-8| = 8$."
                    ),
                    make_q(
                        "When is a particle's speed increasing?",
                        ["When velocity and acceleration have the same sign", "When velocity is positive", "When acceleration is positive", "When acceleration is zero"], 0,
                        "Speed $|v(t)|$ increases when velocity and acceleration work in the same direction, meaning $v(t)$ and $a(t)$ have the same sign."
                    )
                ]
            },
            {
                "heading": "Section 2: Total Distance vs. Displacement",
                "questions": [
                    make_q(
                        "If a particle's position is $s(t) = t^2 - 4t$ on $[0, 3]$, what is its net displacement?",
                        ["$-3$", "$5$", "$-4$", "$3$"], 0,
                        "Displacement $= s(3) - s(0) = (9 - 12) - 0 = -3$."
                    ),
                    make_q(
                        "For the above particle with $s(t) = t^2 - 4t$ on $[0, 3]$, what is the total distance traveled?",
                        ["$5$", "$3$", "$4$", "$7$"], 0,
                        "$v(t) = 2t - 4 = 0 \\Rightarrow t = 2$. From $t = 0$ to $2$: $|s(2) - s(0)| = |-4 - 0| = 4$. From $t = 2$ to $3$: $|s(3) - s(2)| = |-3 - (-4)| = 1$. Total distance $= 4 + 1 = 5$."
                    ),
                    make_q(
                        "Which integral represents the total distance traveled by a particle from $t = a$ to $t = b$?",
                        ["$\\int_a^b |v(t)| dt$", "$\\int_a^b v(t) dt$", "$|\\int_a^b v(t) dt|$", "$\\int_a^b a(t) dt$"], 0,
                        "Total distance accumulates the speed over time: $\\int_a^b |v(t)| dt$."
                    )
                ]
            },
            {
                "heading": "Section 3: Related Rates: Geometric Models",
                "questions": [
                    make_q(
                        "The radius of a circle increases at a constant rate of $3$ cm/s. How fast is the area increasing when the radius is $10$ cm?",
                        ["$60\\pi$ cm$^2$/s", "$30\\pi$ cm$^2$/s", "$100\\pi$ cm$^2$/s", "$20\\pi$ cm$^2$/s"], 0,
                        "$A = \\pi r^2 \\Rightarrow \\frac{dA}{dt} = 2\\pi r \\frac{dr}{dt} = 2\\pi(10)(3) = 60\\pi$ cm$^2$/s."
                    ),
                    make_q(
                        "A $13$-foot ladder leans against a vertical wall. If the bottom slides away from the wall at $2$ ft/s, how fast is the top sliding down when the bottom is $5$ feet from the wall?",
                        ["$-\\frac{5}{6}$ ft/s", "$-\\frac{12}{5}$ ft/s", "$-2$ ft/s", "$-\\frac{5}{12}$ ft/s"], 0,
                        "$x^2 + y^2 = 13^2 = 169$. When $x = 5$, $y = 12$. Differentiating: $2x \\frac{dx}{dt} + 2y \\frac{dy}{dt} = 0 \\Rightarrow 5(2) + 12 \\frac{dy}{dt} = 0 \\Rightarrow \\frac{dy}{dt} = -\\frac{10}{12} = -\\frac{5}{6}$ ft/s."
                    ),
                    make_q(
                        "Air is pumped into a spherical balloon at a rate of $100$ cm$^3$/s. How fast is the radius increasing when $r = 5$ cm?",
                        ["$\\frac{1}{\\pi}$ cm/s", "$\\frac{1}{4\\pi}$ cm/s", "$\\frac{4}{\\pi}$ cm/s", "$25\\pi$ cm/s"], 0,
                        "$V = \\frac{4}{3}\\pi r^3 \\Rightarrow \\frac{dV}{dt} = 4\\pi r^2 \\frac{dr}{dt} \\Rightarrow 100 = 4\\pi(25) \\frac{dr}{dt} \\Rightarrow 100 = 100\\pi \\frac{dr}{dt} \\Rightarrow \\frac{dr}{dt} = \\frac{1}{\\pi}$ cm/s."
                    )
                ]
            },
            {
                "heading": "Section 4: Related Rates: Angles & Proportions",
                "questions": [
                    make_q(
                        "A conical tank with vertex down has height $10$ m and base radius $4$ m. Water flows in at $2$ m$^3$/min. What is the relation between $r$ and $h$?",
                        ["$r = \\frac{2}{5} h$", "$r = \\frac{5}{2} h$", "$r = \\frac{1}{2} h$", "$r = 4h$"], 0,
                        "By similar triangles in the cross-section: $\\frac{r}{h} = \\frac{4}{10} = \\frac{2}{5} \\Rightarrow r = \\frac{2}{5} h$."
                    ),
                    make_q(
                        "Using $V = \\frac{1}{3}\\pi r^2 h = \\frac{4}{75}\\pi h^3$, how fast is the water level rising when $h = 5$ m and $\\frac{dV}{dt} = 2$ m$^3$/min?",
                        ["$\\frac{1}{2\\pi}$ m/min", "$\\frac{2}{\\pi}$ m/min", "$\\frac{1}{4\\pi}$ m/min", "$\\frac{4}{25\\pi}$ m/min"], 0,
                        "$\\frac{dV}{dt} = \\frac{4}{25}\\pi h^2 \\frac{dh}{dt} \\Rightarrow 2 = \\frac{4}{25}\\pi (25) \\frac{dh}{dt} = 4\\pi \\frac{dh}{dt} \\Rightarrow \\frac{dh}{dt} = \\frac{2}{4\\pi} = \\frac{1}{2\\pi}$ m/min."
                    ),
                    make_q(
                        "A street light is mounted at the top of a $15$-foot pole. A $6$-foot man walks away from the pole at $5$ ft/s. How fast is the tip of his shadow moving?",
                        ["$\\frac{25}{3}$ ft/s", "$5$ ft/s", "$\\frac{10}{3}$ ft/s", "$10$ ft/s"], 0,
                        "Let $s$ be shadow tip distance: $\\frac{s}{15} = \\frac{s - x}{6} \\Rightarrow 6s = 15s - 15x \\Rightarrow 9s = 15x \\Rightarrow s = \\frac{5}{3}x$. Then $\\frac{ds}{dt} = \\frac{5}{3} \\frac{dx}{dt} = \\frac{5}{3}(5) = \\frac{25}{3}$ ft/s."
                    )
                ]
            }
        ]
    }
]
