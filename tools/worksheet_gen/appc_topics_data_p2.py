#!/usr/bin/env python3
"""Standardized 4-Page Topic Data for AP Precalculus - Part 2 (Topics 3.01 to 4.03).

Authentic College Board AP Precalculus questions adhering strictly to the official CED.
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

APPC_TOPICS_P2 = [
    # --------------------------------------------------------------------------
    # APPC 3.01: Trigonometric Functions & Unit Circle
    # --------------------------------------------------------------------------
    {
        "track": "appc",
        "num": "3.01",
        "slug": "trigonometric-functions-and-the-unit-circle",
        "title": "Trigonometric Functions & the Unit Circle",
        "sections": [
            {
                "heading": "Section 1: Radian Measure & Unit Circle Coordinates",
                "questions": [
                    make_q(
                        "What are the exact coordinates of the terminal point on the unit circle for angle $\\theta = \\frac{5\\pi}{6}$?",
                        [
                            "$\\left(-\\frac{\\sqrt{3}}{2}, \\frac{1}{2}\\right)$",
                            "$\\left(-\\frac{1}{2}, \\frac{\\sqrt{3}}{2}\\right)$",
                            "$\\left(\\frac{\\sqrt{3}}{2}, -\\frac{1}{2}\\right)$",
                            "$\\left(-\\frac{\\sqrt{2}}{2}, \\frac{\\sqrt{2}}{2}\\right)$"
                        ],
                        0,
                        "Angle $\\frac{5\\pi}{6}$ lies in Quadrant II with reference angle $\\frac{\\pi}{6}$. Therefore, $\\cos\\left(\\frac{5\\pi}{6}\\right) = -\\frac{\\sqrt{3}}{2}$ and $\\sin\\left(\\frac{5\\pi}{6}\\right) = \\frac{1}{2}$, giving coordinates $\\left(-\\frac{\\sqrt{3}}{2}, \\frac{1}{2}\\right)$."
                    ),
                    make_q(
                        "Convert an angle of $\\frac{7\\pi}{4}$ radians into degree measure.",
                        ["$315^{\\circ}$", "$225^{\\circ}$", "$300^{\\circ}$", "$135^{\\circ}$"],
                        0,
                        "Multiply by $\\frac{180^{\\circ}}{\\pi}$: $\\frac{7\\pi}{4} \\times \\frac{180^{\\circ}}{\\pi} = 7 \\times 45^{\\circ} = 315^{\\circ}$."
                    ),
                    make_q(
                        "If the terminal ray of angle $\\alpha$ passes through the point $(-3, -4)$, what is $\\sin\\alpha$?",
                        ["$-\\frac{4}{5}$", "$-\\frac{3}{5}$", "$\\frac{4}{3}$", "$\\frac{3}{5}$"],
                        0,
                        "Radius $r = \\sqrt{(-3)^2 + (-4)^2} = \\sqrt{9 + 16} = 5$. Then $\\sin\\alpha = \\frac{y}{r} = -\\frac{4}{5}$."
                    )
                ]
            },
            {
                "heading": "Section 2: Exact Values of Trigonometric Functions",
                "questions": [
                    make_q(
                        "Evaluate $\\tan\\left(\\frac{4\\pi}{3}\\right)$.",
                        ["$\\sqrt{3}$", "$-\\sqrt{3}$", "$\\frac{\\sqrt{3}}{3}$", "$-\\frac{\\sqrt{3}}{3}$"],
                        0,
                        "Angle $\\frac{4\\pi}{3}$ is in Quadrant III, where tangent is positive. The reference angle is $\\frac{\\pi}{3}$. $\\tan\\left(\\frac{\\pi}{3}\\right) = \\sqrt{3}$, so $\\tan\\left(\\frac{4\\pi}{3}\\right) = \\sqrt{3}$."
                    ),
                    make_q(
                        "What is the exact value of $\\sec\\left(-\\frac{\\pi}{4}\\right)$?",
                        ["$\\sqrt{2}$", "$-\\sqrt{2}$", "$\\frac{\\sqrt{2}}{2}$", "$2$"],
                        0,
                        "Cosine is an even function: $\\cos(-\\pi/4) = \\cos(\\pi/4) = \\frac{\\sqrt{2}}{2}$. Thus $\\sec(-\\pi/4) = \\frac{1}{\\cos(\\pi/4)} = \\frac{2}{\\sqrt{2}} = \\sqrt{2}$."
                    ),
                    make_q(
                        "If $\\sin\\theta = \\frac{3}{5}$ and $\\cos\\theta < 0$, find $\\cot\\theta$.",
                        ["$-\\frac{4}{3}$", "$\\frac{4}{3}$", "$-\\frac{3}{4}$", "$-\\frac{4}{5}$"],
                        0,
                        "Since $\\sin\\theta > 0$ and $\\cos\\theta < 0$, $\\theta$ is in Quadrant II. Here $x = -\\sqrt{5^2 - 3^2} = -4$. Then $\\cot\\theta = \\frac{x}{y} = -\\frac{4}{3}$."
                    )
                ]
            },
            {
                "heading": "Section 3: Sinusoidal Graphs & Transformations",
                "questions": [
                    make_q(
                        "Find the amplitude and period of the sinusoidal function $f(x) = -4\\cos(3x - \\pi) + 2$.",
                        [
                            "Amplitude $= 4$, Period $= \\frac{2\\pi}{3}$",
                            "Amplitude $= -4$, Period $= 3$",
                            "Amplitude $= 4$, Period $= 3\\pi$",
                            "Amplitude $= 2$, Period $= \\frac{2\\pi}{3}$"
                        ],
                        0,
                        "Amplitude is $|A| = |-4| = 4$. For $B = 3$, the period is $\\frac{2\\pi}{B} = \\frac{2\\pi}{3}$."
                    ),
                    make_q(
                        "A Ferris wheel of radius $25\\text{ m}$ completes one rotation every $60\\text{ seconds}$. Passengers board at the bottom, $2\\text{ m}$ above the ground. Which cosine equation models height $h(t)$ in meters?",
                        [
                            "$h(t) = -25\\cos\\left(\\frac{\\pi}{30}t\\right) + 27$",
                            "$h(t) = 25\\cos\\left(\\frac{\\pi}{30}t\\right) + 27$",
                            "$h(t) = -25\\cos\\left(\\frac{\\pi}{60}t\\right) + 2$",
                            "$h(t) = -27\\cos\\left(\\frac{\\pi}{30}t\\right) + 25$"
                        ],
                        0,
                        "Centerline is $d = 2 + 25 = 27$. Amplitude is $25$. Period is $60 \\Rightarrow B = \\frac{2\\pi}{60} = \\frac{\\pi}{30}$. Since it starts at minimum height $2$, an inverted cosine is used: $h(t) = -25\\cos\\left(\\frac{\\pi}{30}t\\right) + 27$."
                    ),
                    make_q(
                        "What is the phase shift of $g(x) = 2\\sin\\left(4x + \\frac{\\pi}{2}\\right)$?",
                        [
                            "$\\frac{\\pi}{8}$ units to the left",
                            "$\\frac{\\pi}{8}$ units to the right",
                            "$\\frac{\\pi}{2}$ units to the left",
                            "$\\frac{\\pi}{4}$ units to the left"
                        ],
                        0,
                        "Factor out $4$: $g(x) = 2\\sin\\left(4\\left(x + \\frac{\\pi}{8}\\right)\\right)$. The phase shift is $\\frac{\\pi}{8}$ units to the left."
                    )
                ]
            },
            {
                "heading": "Section 4: Fundamental Trigonometric Identities",
                "questions": [
                    make_q(
                        "Simplify the trigonometric expression $\\frac{\\tan x}{\\sec x}$.",
                        ["$\\sin x$", "$\\cos x$", "$\\csc x$", "$\\cot x$"],
                        0,
                        "Rewrite in terms of sine and cosine: $\\frac{\\sin x / \\cos x}{1 / \\cos x} = \\frac{\\sin x}{\\cos x} \\cdot \\cos x = \\sin x$."
                    ),
                    make_q(
                        "Which expression is equivalent to $(1 - \\cos^2\\theta)(1 + \\cot^2\\theta)$ for all defined $\\theta$?",
                        ["$1$", "$\\sin^2\\theta$", "$\\tan^2\\theta$", "$\\cos^2\\theta$"],
                        0,
                        "Use Pythagorean identities: $1 - \\cos^2\\theta = \\sin^2\\theta$ and $1 + \\cot^2\\theta = \\csc^2\\theta$. Therefore, $\\sin^2\\theta \\cdot \\csc^2\\theta = \\sin^2\\theta \\cdot \\frac{1}{\\sin^2\\theta} = 1$."
                    ),
                    make_q(
                        "Solve for $\\theta \\in [0, 2\\pi)$: $2\\cos^2\\theta - \\cos\\theta - 1 = 0$.",
                        [
                            "$\\theta = 0, \\frac{2\\pi}{3}, \\frac{4\\pi}{3}$",
                            "$\\theta = \\pi, \\frac{\\pi}{3}, \\frac{5\\pi}{3}$",
                            "$\\theta = 0, \\frac{\\pi}{3}, \\frac{5\\pi}{3}$",
                            "$\\theta = \\frac{\\pi}{2}, \\frac{3\\pi}{2}$"
                        ],
                        0,
                        "Factor: $(2\\cos\\theta + 1)(\\cos\\theta - 1) = 0$. So $\\cos\\theta = 1 \\Rightarrow \\theta = 0$, and $\\cos\\theta = -\\frac{1}{2} \\Rightarrow \\theta = \\frac{2\\pi}{3}, \\frac{4\\pi}{3}$."
                    )
                ]
            }
        ]
    },

    # --------------------------------------------------------------------------
    # APPC 3.02: Polar Coordinates & Graphs
    # --------------------------------------------------------------------------
    {
        "track": "appc",
        "num": "3.02",
        "slug": "polar-coordinates-and-polar-graphs",
        "title": "Polar Coordinates & Polar Graphs",
        "sections": [
            {
                "heading": "Section 1: Coordinate Conversions (Polar <-> Rectangular)",
                "questions": [
                    make_q(
                        "Convert the polar point $(r, \\theta) = \\left(6, \\frac{5\\pi}{6}\\right)$ to rectangular coordinates $(x, y)$.",
                        [
                            "$(-3\\sqrt{3}, 3)$",
                            "$(3\\sqrt{3}, -3)$",
                            "$(-3, 3\\sqrt{3})$",
                            "$(3, -3\\sqrt{3})$"
                        ],
                        0,
                        "$x = r\\cos\\theta = 6\\cos\\left(\\frac{5\\pi}{6}\\right) = 6\\left(-\\frac{\\sqrt{3}}{2}\\right) = -3\\sqrt{3}$. $y = r\\sin\\theta = 6\\sin\\left(\\frac{5\\pi}{6}\\right) = 6\\left(\\frac{1}{2}\\right) = 3$. The rectangular point is $(-3\\sqrt{3}, 3)$."
                    ),
                    make_q(
                        "Convert the rectangular point $(-4, 4)$ to polar coordinates with $r > 0$ and $0 \\leq \\theta < 2\\pi$.",
                        [
                            "$\\left(4\\sqrt{2}, \\frac{3\\pi}{4}\\right)$",
                            "$\\left(4\\sqrt{2}, \\frac{7\\pi}{4}\\right)$",
                            "$\\left(8, \\frac{3\\pi}{4}\\right)$",
                            "$\\left(4\\sqrt{2}, \\frac{5\\pi}{4}\\right)$"
                        ],
                        0,
                        "$r = \\sqrt{(-4)^2 + 4^2} = \\sqrt{32} = 4\\sqrt{2}$. Since $(-4, 4)$ is in Quadrant II, $\\theta = \\pi - \\frac{\\pi}{4} = \\frac{3\\pi}{4}$."
                    ),
                    make_q(
                        "Which polar point represents the same location as $(r, \\theta) = \\left(3, \\frac{\\pi}{3}\\right)$?",
                        [
                            "$\\left(-3, \\frac{4\\pi}{3}\\right)$",
                            "$\\left(-3, \\frac{\\pi}{3}\\right)$",
                            "$\\left(3, -\\frac{\\pi}{3}\\right)$",
                            "$\\left(-3, \\frac{2\\pi}{3}\\right)$"
                        ],
                        0,
                        "In polar coordinates, $(r, \\theta) = (-r, \\theta + \\pi)$. For $\\left(3, \\frac{\\pi}{3}\\right)$, $(-3, \\frac{\\pi}{3} + \\pi) = \\left(-3, \\frac{4\\pi}{3}\\right)$ represents the exact same physical point."
                    )
                ]
            },
            {
                "heading": "Section 2: Converting Equations between Polar and Cartesian",
                "questions": [
                    make_q(
                        "Convert the polar equation $r = 6\\cos\\theta$ into rectangular coordinates.",
                        [
                            "$(x - 3)^2 + y^2 = 9$",
                            "$x^2 + (y - 3)^2 = 9$",
                            "$x^2 + y^2 = 6x$",
                            "$x^2 + y^2 = 36$"
                        ],
                        0,
                        "Multiply both sides by $r$: $r^2 = 6r\\cos\\theta$. Substitute $r^2 = x^2 + y^2$ and $x = r\\cos\\theta$: $x^2 + y^2 = 6x \\Rightarrow x^2 - 6x + 9 + y^2 = 9 \\Rightarrow (x - 3)^2 + y^2 = 9$ (circle centered at $(3,0)$ of radius 3)."
                    ),
                    make_q(
                        "Convert the rectangular equation $x^2 + y^2 = 16$ to polar form.",
                        ["$r = 4$", "$r = 16$", "$r = 4\\cos\\theta$", "$r = 16\\sin\\theta$"],
                        0,
                        "Since $r^2 = x^2 + y^2$, we have $r^2 = 16 \\Rightarrow r = 4$."
                    ),
                    make_q(
                        "Convert $r = 4\\csc\\theta$ to rectangular coordinates.",
                        ["$y = 4$", "$x = 4$", "$y = 4x$", "$x^2 + y^2 = 16$"],
                        0,
                        "Multiply both sides by $\\sin\\theta$: $r\\sin\\theta = 4$. Since $y = r\\sin\\theta$, this is the horizontal line $y = 4$."
                    )
                ]
            },
            {
                "heading": "Section 3: Rose Curves and Symmetry",
                "questions": [
                    make_q(
                        "How many petals does the rose curve $r = 5\\cos(4\\theta)$ have?",
                        ["$8$", "$4$", "$16$", "$2$"],
                        0,
                        "For a rose curve $r = a\\cos(n\\theta)$, if $n$ is even, there are $2n$ petals. Here $n = 4$ is even, so the rose has $2(4) = 8$ petals."
                    ),
                    make_q(
                        "How many petals does the rose curve $r = 3\\sin(5\\theta)$ have?",
                        ["$5$", "$10$", "$15$", "$3$"],
                        0,
                        "If $n$ is odd, the rose curve has exactly $n$ petals. Since $n = 5$ is odd, the curve has $5$ petals."
                    ),
                    make_q(
                        "What is the maximum distance from the pole (origin) to the curve $r = 4\\sin(3\\theta)$?",
                        ["$4$", "$12$", "$3$", "$8$"],
                        0,
                        "The maximum value of $|\\sin(3\\theta)|$ is $1$. Therefore, the maximum radius is $|r| = 4(1) = 4$."
                    )
                ]
            },
            {
                "heading": "Section 4: Limaçons and Special Polar Curves",
                "questions": [
                    make_q(
                        "Classify the polar curve $r = 2 + 2\\cos\\theta$.",
                        [
                            "Cardioid (heart-shaped limaçon)",
                            "Limaçon with an inner loop",
                            "Dimpled limaçon",
                            "Convex limaçon"
                        ],
                        0,
                        "For $r = a \\pm b\\cos\\theta$, when $\\frac{a}{b} = 1$, the curve is a cardioid."
                    ),
                    make_q(
                        "Which polar equation produces a limaçon with an inner loop?",
                        [
                            "$r = 2 + 4\\cos\\theta$",
                            "$r = 4 + 2\\cos\\theta$",
                            "$r = 3 + 3\\sin\\theta$",
                            "$r = 5 + 4\\cos\\theta$"
                        ],
                        0,
                        "A limaçon $r = a + b\\cos\\theta$ has an inner loop when $\\frac{a}{b} < 1$. For $r = 2 + 4\\cos\\theta$, $\\frac{2}{4} = 0.5 < 1$."
                    ),
                    make_q(
                        "At what angles $\\theta \\in [0, 2\\pi)$ does the curve $r = 2 + 4\\cos\\theta$ pass through the pole ($r = 0$)?",
                        [
                            "$\\theta = \\frac{2\\pi}{3}$ and $\\theta = \\frac{4\\pi}{3}$",
                            "$\\theta = \\frac{\\pi}{3}$ and $\\theta = \\frac{5\\pi}{3}$",
                            "$\\theta = \\frac{\\pi}{2}$ and $\\theta = \\frac{3\\pi}{2}$",
                            "$\\theta = \\pi$"
                        ],
                        0,
                        "Set $r = 0 \\Rightarrow 2 + 4\\cos\\theta = 0 \\Rightarrow \\cos\\theta = -\\frac{1}{2}$. In $[0, 2\\pi)$, this occurs at $\\theta = \\frac{2\\pi}{3}$ and $\\theta = \\frac{4\\pi}{3}$."
                    )
                ]
            }
        ]
    },

    # --------------------------------------------------------------------------
    # APPC 4.01: Inverse & Composite Functions
    # --------------------------------------------------------------------------
    {
        "track": "appc",
        "num": "4.01",
        "slug": "inverse-and-composite-functions",
        "title": "Inverse & Composite Functions",
        "sections": [
            {
                "heading": "Section 1: Composition of Functions and Domain",
                "questions": [
                    make_q(
                        "Given $f(x) = 2x + 5$ and $g(x) = x^2 - 1$, find $(f \\circ g)(x)$.",
                        ["$2x^2 + 3$", "$4x^2 + 20x + 24$", "$2x^2 + 9$", "$2x^3 - 1$"],
                        0,
                        "$(f \\circ g)(x) = f(g(x)) = 2(x^2 - 1) + 5 = 2x^2 - 2 + 5 = 2x^2 + 3$."
                    ),
                    make_q(
                        "Given $f(x) = \\sqrt{x - 2}$ and $g(x) = 3x + 1$, what is the domain of $(f \\circ g)(x)$?",
                        [
                            "$\\left[\\frac{1}{3}, \\infty\\right)$",
                            "$[2, \\infty)$",
                            "$\\left(-\\infty, \\frac{1}{3}\\right]$",
                            "$(-\\infty, \\infty)$"
                        ],
                        0,
                        "$(f \\circ g)(x) = \\sqrt{3x + 1 - 2} = \\sqrt{3x - 1}$. For the square root to be real, $3x - 1 \\geq 0 \\Leftrightarrow 3x \\geq 1 \\Leftrightarrow x \\geq \\frac{1}{3}$."
                    ),
                    make_q(
                        "If $h(x) = (3x - 4)^5$, which two functions $f$ and $g$ satisfy $h(x) = (f \\circ g)(x)$?",
                        [
                            "$f(x) = x^5$ and $g(x) = 3x - 4$",
                            "$f(x) = 3x - 4$ and $g(x) = x^5$",
                            "$f(x) = 3x^5$ and $g(x) = x - 4$",
                            "$f(x) = (x - 4)^5$ and $g(x) = 3x$"
                        ],
                        0,
                        "Let inner function $g(x) = 3x - 4$ and outer function $f(u) = u^5$. Then $f(g(x)) = (3x - 4)^5$."
                    )
                ]
            },
            {
                "heading": "Section 2: Finding Inverse Functions",
                "questions": [
                    make_q(
                        "Find the inverse function of $f(x) = \\frac{3x - 1}{2x + 5}$.",
                        [
                            "$f^{-1}(x) = \\frac{5x + 1}{3 - 2x}$",
                            "$f^{-1}(x) = \\frac{2x + 5}{3x - 1}$",
                            "$f^{-1}(x) = \\frac{5x - 1}{2x - 3}$",
                            "$f^{-1}(x) = \\frac{3 - 2x}{5x + 1}$"
                        ],
                        0,
                        "Set $y = \\frac{3x - 1}{2x + 5} \\Rightarrow y(2x + 5) = 3x - 1 \\Rightarrow 2xy + 5y = 3x - 1 \\Rightarrow 5y + 1 = x(3 - 2y) \\Rightarrow x = \\frac{5y + 1}{3 - 2y}$. Swap variables: $f^{-1}(x) = \\frac{5x + 1}{3 - 2x}$."
                    ),
                    make_q(
                        "What is the inverse function of $g(x) = x^3 + 7$?",
                        [
                            "$g^{-1}(x) = \\sqrt[3]{x - 7}$",
                            "$g^{-1}(x) = \\sqrt[3]{x} - 7$",
                            "$g^{-1}(x) = (x - 7)^3$",
                            "$g^{-1}(x) = \\frac{1}{x^3 + 7}$"
                        ],
                        0,
                        "$y = x^3 + 7 \\Rightarrow y - 7 = x^3 \\Rightarrow x = \\sqrt[3]{y - 7}$. Swap variables: $g^{-1}(x) = \\sqrt[3]{x - 7}$."
                    ),
                    make_q(
                        "If $f(x) = (x - 3)^2$ for $x \\geq 3$, what is $f^{-1}(x)$ and its domain?",
                        [
                            "$f^{-1}(x) = \\sqrt{x} + 3$ for $x \\geq 0$",
                            "$f^{-1}(x) = \\sqrt{x + 3}$ for $x \\geq -3$",
                            "$f^{-1}(x) = -\\sqrt{x} + 3$ for $x \\geq 0$",
                            "$f^{-1}(x) = \\sqrt{x} - 3$ for $x \\geq 0$"
                        ],
                        0,
                        "Set $y = (x - 3)^2$. Since $x \\geq 3$, $x - 3 \\geq 0$, so $\\sqrt{y} = x - 3 \\Rightarrow x = \\sqrt{y} + 3$. Since the range of $f$ is $[0, \\infty)$, the domain of $f^{-1}$ is $x \\geq 0$."
                    )
                ]
            },
            {
                "heading": "Section 3: Graphical Symmetry & Invertibility",
                "questions": [
                    make_q(
                        "The graphs of $y = f(x)$ and $y = f^{-1}(x)$ are reflections of each other across which line?",
                        ["$y = x$", "$y = -x$", "$x = 0$ ($y$-axis)", "$y = 0$ ($x$-axis)"],
                        0,
                        "Because the inverse interchanges the inputs and outputs $(a, b) \\leftrightarrow (b, a)$, the graph of $f^{-1}$ is the reflection of the graph of $f$ across the line $y = x$."
                    ),
                    make_q(
                        "Which test determines if a function $f$ has an inverse that is also a function?",
                        [
                            "Horizontal Line Test",
                            "Vertical Line Test",
                            "First Derivative Test",
                            "Ratio Test"
                        ],
                        0,
                        "A function is one-to-one (and thus has an inverse function) if and only if no horizontal line intersects its graph more than once (Horizontal Line Test)."
                    ),
                    make_q(
                        "If $f(2) = 7$ and $f'(2) = 4$, what is $(f^{-1})(7)$?",
                        ["$2$", "$7$", "$\\frac{1}{4}$", "$\\frac{1}{2}$"],
                        0,
                        "By definition of the inverse function, $f(a) = b \\Leftrightarrow f^{-1}(b) = a$. Since $f(2) = 7$, $f^{-1}(7) = 2$."
                    )
                ]
            },
            {
                "heading": "Section 4: Verifying Inverses Algebraically",
                "questions": [
                    make_q(
                        "Which condition algebraically proves that $f(x)$ and $g(x)$ are inverse functions?",
                        [
                            "$f(g(x)) = x$ for all $x$ in the domain of $g$, and $g(f(x)) = x$ for all $x$ in the domain of $f$",
                            "$f(x) \\cdot g(x) = 1$",
                            "$f(x) + g(x) = 0$",
                            "$f(g(x)) = g(f(x)) = 1$"
                        ],
                        0,
                        "Two functions $f$ and $g$ are inverses if and only if both compositions simplify to the identity function: $f(g(x)) = x$ and $g(f(x)) = x$."
                    ),
                    make_q(
                        "Let $f(x) = 5x - 9$ and $g(x) = \\frac{x + 9}{5}$. Evaluate $f(g(x))$.",
                        ["$x$", "$5x$", "$x - 9$", "$1$"],
                        0,
                        "$f(g(x)) = 5\\left(\\frac{x + 9}{5}\\right) - 9 = (x + 9) - 9 = x$."
                    ),
                    make_q(
                        "If a one-to-one function $f$ has domain $[2, 10]$ and range $[-3, 5]$, what are the domain and range of $f^{-1}$?",
                        [
                            "Domain: $[-3, 5]$; Range: $[2, 10]$",
                            "Domain: $[2, 10]$; Range: $[-3, 5]$",
                            "Domain: $[-5, 3]$; Range: $[-10, -2]$",
                            "Domain: $[1/2, 1/10]$; Range: $[-1/3, 1/5]$"
                        ],
                        0,
                        "For an inverse function, the domain of $f^{-1}$ equals the range of $f$ ($[-3, 5]$), and the range of $f^{-1}$ equals the domain of $f$ ($[2, 10]$)."
                    )
                ]
            }
        ]
    },

    # --------------------------------------------------------------------------
    # APPC 4.02: Piecewise-Defined & Implicit Functions
    # --------------------------------------------------------------------------
    {
        "track": "appc",
        "num": "4.02",
        "slug": "piecewise-and-implicit-functions",
        "title": "Piecewise-Defined & Implicit Functions",
        "sections": [
            {
                "heading": "Section 1: Evaluating Piecewise Functions",
                "questions": [
                    make_q(
                        "Let $f(x) = 2x + 1$ for $x < 2$, and $f(x) = x^2 - 3$ for $x \\geq 2$. Find $f(2)$ and $f(-1)$.",
                        [
                            "$f(2) = 1$ and $f(-1) = -1$",
                            "$f(2) = 5$ and $f(-1) = -1$",
                            "$f(2) = 1$ and $f(-1) = -2$",
                            "$f(2) = 5$ and $f(-1) = 1$"
                        ],
                        0,
                        "For $x = 2$, use the second piece: $f(2) = 2^2 - 3 = 1$. For $x = -1 < 2$, use the first piece: $f(-1) = 2(-1) + 1 = -1$."
                    ),
                    make_q(
                        "A tax bracket levies no tax on the first 10,000 dollars, and $15\\%$ on income exceeding 10,000 dollars. Which piecewise function $T(x)$ models total tax for income $x \\geq 0$?",
                        [
                            "$T(x) = 0$ for $x \\leq 10000$, and $T(x) = 0.15(x - 10000)$ for $x > 10000$",
                            "$T(x) = 0.15x$ for all $x$",
                            "$T(x) = 0$ for $x \\leq 10000$, and $T(x) = 0.15x$ for $x > 10000$",
                            "$T(x) = 0$ for $x \\leq 10000$, and $T(x) = 1500 + 0.15x$ for $x > 10000$"
                        ],
                        0,
                        "No tax is paid on income up to 10,000 ($T = 0$). Only the amount beyond 10,000 ($(x - 10000)$) is taxed at $15\\%$, yielding $T(x) = 0.15(x - 10000)$."
                    ),
                    make_q(
                        "Evaluate the ceiling function $g(x) = \\lceil 2x - 0.3 \\rceil$ at $x = 1.4$.",
                        ["$3$", "$2$", "$2.5$", "$4$"],
                        0,
                        "$2(1.4) - 0.3 = 2.8 - 0.3 = 2.5$. The ceiling function rounds up to the least integer greater than or equal to $2.5$, which is $3$."
                    )
                ]
            },
            {
                "heading": "Section 2: Continuity of Piecewise Functions at Boundaries",
                "questions": [
                    make_q(
                        "Find the value of $k$ that makes $f(x)$ continuous at $x = 3$, where $f(x) = kx + 1$ for $x \\leq 3$ and $f(x) = 2x^2 - 5$ for $x > 3$.",
                        ["$4$", "$2$", "$5$", "$13$"],
                        0,
                        "For continuity at $x = 3$, $\\lim_{x \\to 3^-} f(x) = \\lim_{x \\to 3^+} f(x)$. Left limit: $k(3) + 1 = 3k + 1$. Right limit: $2(3^2) - 5 = 18 - 5 = 13$. Setting $3k + 1 = 13 \\Rightarrow 3k = 12 \\Rightarrow k = 4$."
                    ),
                    make_q(
                        "Let $g(x) = \\frac{x^2 - 16}{x - 4}$ for $x \\neq 4$, and $g(4) = c$. What value of $c$ removes the discontinuity at $x = 4$?",
                        ["$8$", "$4$", "$0$", "$16$"],
                        0,
                        "$\\lim_{x \\to 4} \\frac{(x - 4)(x + 4)}{x - 4} = \\lim_{x \\to 4} (x + 4) = 8$. For $g$ to be continuous at $x = 4$, $c$ must equal the limit, so $c = 8$."
                    ),
                    make_q(
                        "A function $h$ is defined by $h(x) = |x - 2| + 3$. Where is $h(x)$ continuous and where is it not differentiable?",
                        [
                            "Continuous everywhere; not differentiable at $x = 2$",
                            "Continuous only for $x \\geq 2$; differentiable everywhere",
                            "Discontinuous at $x = 2$; differentiable elsewhere",
                            "Continuous and differentiable everywhere on $(-\\infty, \\infty)$"
                        ],
                        0,
                        "Absolute value functions are continuous everywhere. However, at $x = 2$ there is a sharp corner, where the left-hand slope ($-1$) differs from the right-hand slope ($+1$), so it is not differentiable at $x = 2$."
                    )
                ]
            },
            {
                "heading": "Section 3: Implicit Relations and Conic Sections",
                "questions": [
                    make_q(
                        "Identify the conic section described by the equation $4x^2 + 9y^2 - 16x + 54y + 61 = 0$.",
                        ["Ellipse", "Hyperbola", "Parabola", "Circle"],
                        0,
                        "Both $x^2$ and $y^2$ have positive coefficients ($A = 4, C = 9$) and $A \\neq C$. Completing the square confirms this is an ellipse."
                    ),
                    make_q(
                        "Find the center and radius of the circle given by $x^2 + y^2 - 6x + 8y = 0$.",
                        [
                            "Center $(3, -4)$, Radius $5$",
                            "Center $(-3, 4)$, Radius $5$",
                            "Center $(3, -4)$, Radius $25$",
                            "Center $(6, -8)$, Radius $10$"
                        ],
                        0,
                        "Complete the square: $(x^2 - 6x + 9) + (y^2 + 8y + 16) = 9 + 16 \\Rightarrow (x - 3)^2 + (y + 4)^2 = 25$. Center is $(3, -4)$ and radius is $\\sqrt{25} = 5$."
                    ),
                    make_q(
                        "Which implicit relation fails the Vertical Line Test and therefore cannot be represented by a single function $y = f(x)$?",
                        [
                            "$x^2 + y^2 = 25$",
                            "$y = x^2 - 4$",
                            "$y = \\sqrt{25 - x^2}$",
                            "$y = 3x + 1$"
                        ],
                        0,
                        "$x^2 + y^2 = 25$ is a circle centered at $(0,0)$. For any $x \\in (-5, 5)$, there are two corresponding $y$ values ($y = \\pm \\sqrt{25 - x^2}$), failing the vertical line test."
                    )
                ]
            },
            {
                "heading": "Section 4: Asymptotes and Branches of Hyperbolas",
                "questions": [
                    make_q(
                        "Find the equations of the asymptotes for the hyperbola $\\frac{x^2}{16} - \\frac{y^2}{9} = 1$.",
                        [
                            "$y = \\pm \\frac{3}{4}x$",
                            "$y = \\pm \\frac{4}{3}x$",
                            "$y = \\pm \\frac{9}{16}x$",
                            "$y = \\pm \\frac{16}{9}x$"
                        ],
                        0,
                        "For a horizontal hyperbola centered at origin $\\frac{x^2}{a^2} - \\frac{y^2}{b^2} = 1$, asymptotes are $y = \\pm \\frac{b}{a}x$. Here $a = 4, b = 3$, giving $y = \\pm \\frac{3}{4}x$."
                    ),
                    make_q(
                        "What is the orientation of the transverse axis for the hyperbola $\\frac{(y - 1)^2}{25} - \\frac{(x + 2)^2}{16} = 1$?",
                        [
                            "Vertical, along the line $x = -2$",
                            "Horizontal, along the line $y = 1$",
                            "Diagonal with slope $5/4$",
                            "Vertical, along the $y$-axis"
                        ],
                        0,
                        "Because the positive term contains $(y - 1)^2$, the hyperbola opens vertically, and its transverse axis is vertical along the line $x = -2$."
                    ),
                    make_q(
                        "What are the vertices of the ellipse $\\frac{x^2}{49} + \\frac{y^2}{25} = 1$?",
                        [
                            "$(\\pm 7, 0)$",
                            "$(0, \\pm 5)$",
                            "$(\\pm 5, 0)$",
                            "$(0, \\pm 7)$"
                        ],
                        0,
                        "Since $a^2 = 49 > b^2 = 25$, the major axis is horizontal with $a = 7$. Vertices are at $(\\pm a, 0) = (\\pm 7, 0)$."
                    )
                ]
            }
        ]
    },

    # --------------------------------------------------------------------------
    # APPC 4.03: Parametric Equations & Modeling
    # --------------------------------------------------------------------------
    {
        "track": "appc",
        "num": "4.03",
        "slug": "parametric-equations-and-modeling",
        "title": "Parametric Equations & Modeling",
        "sections": [
            {
                "heading": "Section 1: Evaluating Parametric Equations and Graph Points",
                "questions": [
                    make_q(
                        "A particle moves according to $x(t) = t^2 - 3$ and $y(t) = 2t + 1$. What is its position at $t = 3$?",
                        ["$(6, 7)$", "$(9, 7)$", "$(6, 6)$", "$(3, 7)$"],
                        0,
                        "$x(3) = 3^2 - 3 = 6$. $y(3) = 2(3) + 1 = 7$. The position point is $(6, 7)$."
                    ),
                    make_q(
                        "At what value of $t$ does the parametric curve $x(t) = t^2 - 4, y(t) = t - 1$ intersect the $y$-axis with $y > 0$?",
                        ["$t = 2$", "$t = -2$", "$t = 4$", "$t = 1$"],
                        0,
                        "The curve crosses the $y$-axis when $x(t) = 0 \\Rightarrow t^2 - 4 = 0 \\Rightarrow t = \\pm 2$. For $t = 2$, $y = 2 - 1 = 1 > 0$. For $t = -2$, $y = -3 < 0$. Thus $t = 2$."
                    ),
                    make_q(
                        "Given $x(t) = 4\\cos t$ and $y(t) = 4\\sin t$ for $0 \\leq t \\leq 2\\pi$, what curve is traced and in which direction?",
                        [
                            "A circle of radius 4 traced counterclockwise",
                            "A circle of radius 4 traced clockwise",
                            "An ellipse of semi-major axis 4",
                            "A line segment from $(-4,-4)$ to $(4,4)$"
                        ],
                        0,
                        "At $t = 0$, position is $(4, 0)$. At $t = \\frac{\\pi}{2}$, position is $(0, 4)$. As $t$ increases, motion proceeds counterclockwise around a circle of radius 4."
                    )
                ]
            },
            {
                "heading": "Section 2: Eliminating the Parameter",
                "questions": [
                    make_q(
                        "Eliminate the parameter $t$ from $x(t) = 3t + 2$ and $y(t) = 6t - 5$.",
                        ["$y = 2x - 9$", "$y = 2x - 7$", "$y = 2x + 1$", "$y = 3x - 11$"],
                        0,
                        "Solve for $t$ from $x$: $t = \\frac{x - 2}{3}$. Substitute into $y$: $y = 6\\left(\\frac{x - 2}{3}\\right) - 5 = 2(x - 2) - 5 = 2x - 4 - 5 = 2x - 9$."
                    ),
                    make_q(
                        "Eliminate the parameter from $x = 3\\cos\\theta$ and $y = 5\\sin\\theta$.",
                        [
                            "$\\frac{x^2}{9} + \\frac{y^2}{25} = 1$",
                            "$\\frac{x^2}{25} + \\frac{y^2}{9} = 1$",
                            "$x^2 + y^2 = 34$",
                            "$9x^2 + 25y^2 = 1$"
                        ],
                        0,
                        "Isolate trig functions: $\\cos\\theta = \\frac{x}{3}$ and $\\sin\\theta = \\frac{y}{5}$. Using $\\cos^2\\theta + \\sin^2\\theta = 1$ yields $\\frac{x^2}{9} + \\frac{y^2}{25} = 1$."
                    ),
                    make_q(
                        "Eliminate the parameter from $x = t^2$ and $y = t^4 + 3$ for $t \\in (-\\infty, \\infty)$. What is the resulting Cartesian equation and its domain?",
                        [
                            "$y = x^2 + 3$ with domain $x \\geq 0$",
                            "$y = x^2 + 3$ with domain $(-\\infty, \\infty)$",
                            "$y = 2x + 3$ with domain $x \\geq 0$",
                            "$y = x^4 + 3$ with domain $x \\geq 0$"
                        ],
                        0,
                        "Since $y = (t^2)^2 + 3 = x^2 + 3$. Because $x = t^2$, $x$ cannot be negative; the domain is restricted to $x \\geq 0$."
                    )
                ]
            },
            {
                "heading": "Section 3: Projectile Motion Modeling",
                "questions": [
                    make_q(
                        "A projectile is launched with initial speed $v_0 = 80\\text{ ft/s}$ at an angle of $30^{\\circ}$ from the horizontal from ground level. Which parametric equations model its path ($g = 32\\text{ ft/s}^2$)?",
                        [
                            "$x(t) = 40\\sqrt{3}t$ and $y(t) = 40t - 16t^2$",
                            "$x(t) = 40t$ and $y(t) = 40\\sqrt{3}t - 16t^2$",
                            "$x(t) = 80t$ and $y(t) = 80t - 32t^2$",
                            "$x(t) = 40\\sqrt{3}t$ and $y(t) = 40t - 32t^2$"
                        ],
                        0,
                        "$v_{0x} = 80\\cos(30^{\\circ}) = 80\\left(\\frac{\\sqrt{3}}{2}\\right) = 40\\sqrt{3}$. $v_{0y} = 80\\sin(30^{\\circ}) = 80\\left(\\frac{1}{2}\\right) = 40$. In feet, $y(t) = v_{0y}t - \\frac{1}{2}gt^2 = 40t - 16t^2$."
                    ),
                    make_q(
                        "For the projectile above with $y(t) = 40t - 16t^2$, what is its total flight time before landing?",
                        ["$2.5\\text{ seconds}$", "$1.25\\text{ seconds}$", "$5.0\\text{ seconds}$", "$3.0\\text{ seconds}$"],
                        0,
                        "Set $y(t) = 0 \\Rightarrow t(40 - 16t) = 0$. Discarding $t = 0$, $16t = 40 \\Rightarrow t = \\frac{40}{16} = 2.5\\text{ seconds}$."
                    ),
                    make_q(
                        "What is the maximum height attained by a projectile modeled by $y(t) = 64t - 16t^2$?",
                        ["$64\\text{ ft}$", "$32\\text{ ft}$", "$128\\text{ ft}$", "$48\\text{ ft}$"],
                        0,
                        "Maximum height occurs at vertex $t = -\\frac{b}{2a} = -\\frac{64}{2(-16)} = 2\\text{ s}$. Maximum height: $y(2) = 64(2) - 16(4) = 128 - 64 = 64\\text{ ft}$."
                    )
                ]
            },
            {
                "heading": "Section 4: Direction of Motion and Speed",
                "questions": [
                    make_q(
                        "As parameter $t$ increases from $0$ to $\\pi$, how does the curve $x = \\sin t, y = \\cos t$ move?",
                        [
                            "Clockwise from $(0, 1)$ to $(0, -1)$",
                            "Counterclockwise from $(1, 0)$ to $(-1, 0)$",
                            "Clockwise from $(1, 0)$ to $(-1, 0)$",
                            "Counterclockwise from $(0, 1)$ to $(0, -1)$"
                        ],
                        0,
                        "At $t = 0$: $(x, y) = (0, 1)$. At $t = \\pi/2$: $(1, 0)$. At $t = \\pi$: $(0, -1)$. Moving from $(0, 1)$ through $(1, 0)$ to $(0, -1)$ is clockwise."
                    ),
                    make_q(
                        "If a curve is given by $x(t) = t + 1$ and $y(t) = t^2$, what is the average rate of change $\\frac{\\Delta y}{\\Delta x}$ from $t = 1$ to $t = 3$?",
                        ["$4$", "$8$", "$2$", "$6$"],
                        0,
                        "At $t = 1$: $(2, 1)$. At $t = 3$: $(4, 9)$. $\\frac{\\Delta y}{\\Delta x} = \\frac{9 - 1}{4 - 2} = \\frac{8}{2} = 4$."
                    ),
                    make_q(
                        "Which parametric curve represents a straight line segment with endpoints $(1, 2)$ and $(7, 14)$ for $0 \\leq t \\leq 1$?",
                        [
                            "$x(t) = 1 + 6t, y(t) = 2 + 12t$",
                            "$x(t) = 7t, y(t) = 14t$",
                            "$x(t) = 1 + 7t, y(t) = 2 + 14t$",
                            "$x(t) = 6t, y(t) = 12t$"
                        ],
                        0,
                        "Using linear interpolation $(1-t)P_0 + t P_1$: $x(t) = 1 + t(7 - 1) = 1 + 6t$ and $y(t) = 2 + t(14 - 2) = 2 + 12t$ for $0 \\leq t \\leq 1$."
                    )
                ]
            }
        ]
    }
]
