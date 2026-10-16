#!/usr/bin/env python3
"""Standardized 4-Page Topic Data for IB Mathematics HL - Part 1 (Topics 1.01 to 2.01).

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

IBHL_TOPICS_P1 = [
    # --------------------------------------------------------------------------
    # IBHL 1.01: Proof by Mathematical Induction
    # --------------------------------------------------------------------------
    {
        "track": "ibhl",
        "num": "1.01",
        "slug": "proof-by-mathematical-induction",
        "title": "Proof by Mathematical Induction",
        "sections": [
            {
                "heading": "Section 1: The Principle & Architecture of Induction",
                "questions": [
                    make_q(
                        "In a proof by mathematical induction that a proposition $P(n)$ is true for all integers $n \\geq 1$, what are the essential logical components?",
                        [
                            "Base case: prove $P(1)$ is true; Inductive step: prove $P(k) \\Rightarrow P(k+1)$; Conclusion by PMI",
                            "Verify $P(n)$ for $n = 1, 2, 3, 4, 5$ and deduce the pattern",
                            "Assume $P(n)$ is true for all $n$ and differentiate both sides",
                            "Prove $P(k+1) \\Rightarrow P(k)$ starting from an arbitrary large integer"
                        ],
                        0,
                        "The Principle of Mathematical Induction requires establishing the base step (verify $P(1)$), stating the induction hypothesis (assume $P(k)$ is true), showing that $P(k) \\Rightarrow P(k+1)$, and stating the formal conclusion."
                    ),
                    make_q(
                        "If the base case of an induction proof is verified at $n = 4$, for which set of integers is $P(n)$ established (assuming the inductive step holds for all $k \\geq 4$)?",
                        ["$n \\in \\{4, 5, 6, \\dots\\}$", "All integers $n \\in \\mathbb{Z}$", "$n \\in \\{1, 2, 3, 4\\}$", "$n \\in \\mathbb{R}$ with $n \\geq 4$"],
                        0,
                        "The chain of implications starts at the base case $n = 4$ and propagates to all subsequent integers $n \\geq 4$."
                    ),
                    make_q(
                        "In proving $\\sum_{r=1}^n r = \\frac{n(n+1)}{2}$, what is the algebraic expression for the sum up to $k+1$ using the induction hypothesis?",
                        [
                            "$\\frac{k(k+1)}{2} + (k + 1)$",
                            "$\\frac{(k+1)(k+2)}{2} + k$",
                            "$\\frac{k(k+1)}{2} \\times (k + 1)$",
                            "$\\frac{k(k-1)}{2} + (k + 1)$"
                        ],
                        0,
                        "By definition, $\\sum_{r=1}^{k+1} r = \\left(\\sum_{r=1}^k r\\right) + (k+1)$. Substituting the inductive hypothesis gives $\\frac{k(k+1)}{2} + (k + 1)$."
                    )
                ]
            },
            {
                "heading": "Section 2: Summation and Series Proofs",
                "questions": [
                    make_q(
                        "When proving by induction that $\\sum_{r=1}^n r^2 = \\frac{n(n+1)(2n+1)}{6}$, factoring $(k+1)$ from $\\frac{k(k+1)(2k+1)}{6} + (k+1)^2$ yields:",
                        [
                            "$\\frac{k+1}{6} [2k^2 + 7k + 6] = \\frac{(k+1)(k+2)(2k+3)}{6}$",
                            "$\\frac{k+1}{6} [2k^2 + 5k + 6]$",
                            "$\\frac{(k+1)^2(2k+1)}{6}$",
                            "$\\frac{k+1}{6} [k(2k+1) + 1]$"
                        ],
                        0,
                        "Factor $\\frac{k+1}{6}$: $\\frac{k+1}{6}[k(2k+1) + 6(k+1)] = \\frac{k+1}{6}[2k^2 + 7k + 6] = \\frac{(k+1)(k+2)(2k+3)}{6}$, which is the target formula at $n = k+1$."
                    ),
                    make_q(
                        "For the proposition $\\sum_{r=1}^n (2r - 1) = n^2$, verify the inductive step by simplifying $k^2 + (2(k+1) - 1)$.",
                        ["$(k + 1)^2$", "$k^2 + 2k$", "$k^2 + 2k + 3$", "$(k + 2)^2$"],
                        0,
                        "$k^2 + (2k + 2 - 1) = k^2 + 2k + 1 = (k + 1)^2$, completing the induction step."
                    ),
                    make_q(
                        "Consider the geometric series $\\sum_{r=1}^n 2^{r-1} = 2^n - 1$. What is the base case check for $n = 1$?",
                        [
                            "$\\text{LHS} = 2^0 = 1$, $\\text{RHS} = 2^1 - 1 = 1$; LHS $=$ RHS",
                            "$\\text{LHS} = 2^1 = 2$, $\\text{RHS} = 2^1 - 1 = 1$",
                            "$\\text{LHS} = 0$, $\\text{RHS} = 0$",
                            "$\\text{LHS} = 1$, $\\text{RHS} = 2$"
                        ],
                        0,
                        "At $n = 1$, $\\text{LHS} = 2^{1-1} = 1$ and $\\text{RHS} = 2^1 - 1 = 1$, so the base case is verified."
                    )
                ]
            },
            {
                "heading": "Section 3: Divisibility and Inequality Proofs",
                "questions": [
                    make_q(
                        "To prove $5^n - 1$ is divisible by $4$ for $n \\geq 1$, express $5^{k+1} - 1$ in terms of $(5^k - 1)$.",
                        [
                            "$5(5^k - 1) + 4$",
                            "$5(5^k - 1) - 4$",
                            "$4(5^k - 1) + 5$",
                            "$(5^k - 1) + 5$"
                        ],
                        0,
                        "$5^{k+1} - 1 = 5 \\cdot 5^k - 1 = 5(5^k - 1) + 5 - 1 = 5(5^k - 1) + 4$. If $5^k - 1 = 4M$, this equals $5(4M) + 4 = 4(5M + 1)$, which is divisible by 4."
                    ),
                    make_q(
                        "In proving $2^n > n^2$ for $n \\geq 5$, assuming $2^k > k^2$, which inequality must be justified to show $2^{k+1} > (k+1)^2$?",
                        [
                            "$2k^2 \\geq (k+1)^2 \\Leftrightarrow k^2 - 2k - 1 \\geq 0$, which holds for $k \\geq 5$",
                            "$k^2 > 2k + 1$ for all $k \\in \\mathbb{R}$",
                            "$2^k > 2k$",
                            "$(k+1)^2 > k^2 + 1$"
                        ],
                        0,
                        "$2^{k+1} = 2 \\cdot 2^k > 2k^2$. We need $2k^2 \\geq (k+1)^2 = k^2 + 2k + 1 \\Leftrightarrow k^2 - 2k - 1 \\geq 0$. For $k \\geq 5$, $k(k-2) - 1 \\geq 5(3) - 1 = 14 > 0$."
                    ),
                    make_q(
                        "To prove $3^{2n} - 1$ is divisible by $8$, evaluate the base case $n = 1$.",
                        ["$3^2 - 1 = 8$, which is divisible by $8$", "$3^1 - 1 = 2$", "$3^0 - 1 = 0$", "$3^2 - 1 = 9$"],
                        0,
                        "At $n = 1$: $3^{2(1)} - 1 = 9 - 1 = 8$, which is divisible by 8 with quotient 1."
                    )
                ]
            },
            {
                "heading": "Section 4: Calculus and Matrix Applications",
                "questions": [
                    make_q(
                        "Prove by induction that $\\frac{d^n}{dx^n}(x e^x) = (x + n)e^x$. What is the inductive step derivative $\\frac{d}{dx}[(x + k)e^x]$?",
                        [
                            "$1 \\cdot e^x + (x + k)e^x = (x + k + 1)e^x$",
                            "$(x + k)e^x + e^x = (x + k)e^x$",
                            "$(x + 1)e^x + ke^x$",
                            "$(x + k + 1)x e^x$"
                        ],
                        0,
                        "By the product rule: $\\frac{d}{dx}[(x + k)e^x] = \\frac{d}{dx}(x + k) \\cdot e^x + (x + k) \\cdot e^x = 1 \\cdot e^x + (x + k)e^x = (x + k + 1)e^x$."
                    ),
                    make_q(
                        "If $A = [[1, 1], [0, 1]]$, prove by induction that $A^n = [[1, n], [0, 1]]$. What is the matrix product $A^k \\cdot A$?",
                        [
                            "$[[1, k], [0, 1]] [[1, 1], [0, 1]] = [[1, k+1], [0, 1]]$",
                            "$[[1, k], [0, 1]] [[1, 1], [0, 1]] = [[1, 2k], [0, 1]]$",
                            "$[[1, k], [0, 1]] [[1, 1], [0, 1]] = [[1, k^2], [0, 1]]$",
                            "$[[1, 1], [0, 1]]$"
                        ],
                        0,
                        "Multiplying row by column: $(1)(1) + (k)(0) = 1$; $(1)(1) + (k)(1) = k + 1$; $(0)(1) + (1)(0) = 0$; $(0)(1) + (1)(1) = 1$, giving $[[1, k+1], [0, 1]]$."
                    ),
                    make_q(
                        "A sequence is defined by $u_1 = 5$ and $u_{n+1} = 2u_n - 3$. Prove by induction that $u_n = 2^{n+1} + 3$. Assuming $u_k = 2^{k+1} + 3$, what is $u_{k+1}$?",
                        [
                            "$2(2^{k+1} + 3) - 3 = 2^{k+2} + 6 - 3 = 2^{k+2} + 3$",
                            "$2(2^{k+1}) - 3 = 2^{k+2} - 3$",
                            "$2^{k+1} + 6$",
                            "$2^{k+2} + 6$"
                        ],
                        0,
                        "Substitute hypothesis into recurrence: $u_{k+1} = 2u_k - 3 = 2(2^{k+1} + 3) - 3 = 2^{k+2} + 6 - 3 = 2^{(k+1)+1} + 3$, completing the inductive step."
                    )
                ]
            }
        ]
    },

    # --------------------------------------------------------------------------
    # IBHL 1.02: Complex Numbers: Cartesian Form & Algebra
    # --------------------------------------------------------------------------
    {
        "track": "ibhl",
        "num": "1.02",
        "slug": "complex-numbers-cartesian-form-algebra",
        "title": "Complex Numbers: Cartesian Form & Algebra",
        "sections": [
            {
                "heading": "Section 1: Cartesian Arithmetic & Complex Conjugate",
                "questions": [
                    make_q(
                        "Given $z_1 = 3 - 2i$ and $z_2 = -1 + 4i$, calculate $z_1 z_2$.",
                        ["$5 + 14i$", "$-3 - 8i$", "$5 - 14i$", "$-3 + 14i$"],
                        0,
                        "$z_1 z_2 = (3 - 2i)(-1 + 4i) = -3 + 12i + 2i - 8i^2 = -3 + 14i + 8 = 5 + 14i$."
                    ),
                    make_q(
                        "Express $\\frac{4 + 2i}{1 - i}$ in Cartesian form $a + bi$.",
                        ["$1 + 3i$", "$3 + 3i$", "$1 - 3i$", "$2 + 2i$"],
                        0,
                        "Multiply numerator and denominator by conjugate $(1 + i)$: $\\frac{(4 + 2i)(1 + i)}{(1 - i)(1 + i)} = \\frac{4 + 4i + 2i + 2i^2}{1 - i^2} = \\frac{2 + 6i}{2} = 1 + 3i$."
                    ),
                    make_q(
                        "If $z = x + iy$, what is $z \\cdot z^*$ (where $z^*$ is the complex conjugate)?",
                        ["$x^2 + y^2$", "$x^2 - y^2$", "$x^2 + 2ixy - y^2$", "$2x$"],
                        0,
                        "$z z^* = (x + iy)(x - iy) = x^2 - (iy)^2 = x^2 - i^2 y^2 = x^2 + y^2 = |z|^2$."
                    )
                ]
            },
            {
                "heading": "Section 2: Modulus and Argument",
                "questions": [
                    make_q(
                        "Find the modulus $|z|$ and principal argument $\\text{Arg}(z) \\in (-\\pi, \\pi]$ for $z = -\\sqrt{3} + i$.",
                        [
                            "$|z| = 2$, $\\text{Arg}(z) = \\frac{5\\pi}{6}$",
                            "$|z| = 2$, $\\text{Arg}(z) = -\\frac{\\pi}{6}$",
                            "$|z| = 4$, $\\text{Arg}(z) = \\frac{2\\pi}{3}$",
                            "$|z| = 2$, $\\text{Arg}(z) = \\frac{7\\pi}{6}$"
                        ],
                        0,
                        "$|z| = \\sqrt{(-\\sqrt{3})^2 + 1^2} = \\sqrt{3 + 1} = 2$. In Quadrant II ($x < 0, y > 0$), reference angle is $\\arctan(1/\\sqrt{3}) = \\frac{\\pi}{6}$. Thus $\\theta = \\pi - \\frac{\\pi}{6} = \\frac{5\\pi}{6}$."
                    ),
                    make_q(
                        "What is the modulus of $\\frac{3 + 4i}{1 - 2i}$?",
                        ["$\\sqrt{5}$", "$\\frac{5}{3}$", "$5$", "$\\frac{25}{5} = 5$"],
                        0,
                        "Using modulus properties: $\\left|\\frac{z_1}{z_2}\\right| = \\frac{|z_1|}{|z_2|} = \\frac{\\sqrt{3^2 + 4^2}}{\\sqrt{1^2 + (-2)^2}} = \\frac{5}{\\sqrt{5}} = \\sqrt{5}$."
                    ),
                    make_q(
                        "Find the principal argument of $z = -5i$.",
                        ["$-\\frac{\\pi}{2}$", "$\\frac{3\\pi}{2}$", "$\\frac{\\pi}{2}$", "$\\pi$"],
                        0,
                        "The point lies on the negative imaginary axis, which corresponds to angle $-\\frac{\\pi}{2}$ within the principal range $(-\\pi, \\pi]$."
                    )
                ]
            },
            {
                "heading": "Section 3: Solving Complex Equations",
                "questions": [
                    make_q(
                        "Solve the equation $2z + 3z^* = 15 - 2i$ for $z = x + iy$.",
                        ["$z = 3 + 2i$", "$z = 3 - 2i$", "$z = 5 - 2i$", "$z = 2 + 3i$"],
                        0,
                        "$2(x + iy) + 3(x - iy) = 5x - iy = 15 - 2i$. Equating real parts: $5x = 15 \\Rightarrow x = 3$. Imaginary parts: $-y = -2 \\Rightarrow y = 2$. Thus $z = 3 + 2i$."
                    ),
                    make_q(
                        "Find the two square roots of $-8 - 6i$ in Cartesian form.",
                        ["$\\pm (1 - 3i)$", "$\\pm (3 - i)$", "$\\pm (1 + 3i)$", "$\\pm (2 - 3i)$"],
                        0,
                        "Let $(x + iy)^2 = x^2 - y^2 + 2ixy = -8 - 6i$. Thus $x^2 - y^2 = -8$ and $2xy = -6 \\Rightarrow y = -3/x$. $x^2 - 9/x^2 = -8 \\Rightarrow x^4 + 8x^2 - 9 = 0 \\Rightarrow (x^2 + 9)(x^2 - 1) = 0$. Since $x \\in \\mathbb{R}$, $x = \\pm 1$, giving $y = \\mp 3$. Roots are $\\pm (1 - 3i)$."
                    ),
                    make_q(
                        "Solve the quadratic equation $z^2 - 4z + 13 = 0$ over $\\mathbb{C}$.",
                        ["$z = 2 \\pm 3i$", "$z = 4 \\pm 6i$", "$z = -2 \\pm 3i$", "$z = 2 \\pm 9i$"],
                        0,
                        "By quadratic formula: $z = \\frac{4 \\pm \\sqrt{16 - 52}}{2} = \\frac{4 \\pm \\sqrt{-36}}{2} = \\frac{4 \\pm 6i}{2} = 2 \\pm 3i$."
                    )
                ]
            },
            {
                "heading": "Section 4: Argand Diagram Geometry & Loci",
                "questions": [
                    make_q(
                        "Describe the locus of points in the complex plane satisfying $|z - 3 + 2i| = 5$.",
                        [
                            "A circle with center $(3, -2)$ and radius $5$",
                            "A circle with center $(-3, 2)$ and radius $5$",
                            "A straight line perpendicular to $3 - 2i$",
                            "An ellipse with focal distance $5$"
                        ],
                        0,
                        "Rewrite as $|z - (3 - 2i)| = 5$. The distance from $z$ to the fixed point $3 - 2i$ is constant and equal to 5, which defines a circle centered at $(3, -2)$ with radius 5."
                    ),
                    make_q(
                        "What geometric locus is defined by $|z - 1| = |z - 3i|$?",
                        [
                            "The perpendicular bisector of the segment connecting $(1, 0)$ and $(0, 3)$",
                            "A circle passing through $(1, 0)$ and $(0, 3)$",
                            "A line segment connecting $(1, 0)$ and $(0, 3)$",
                            "A parabola opening upward"
                        ],
                        0,
                        "$|z - z_1| = |z - z_2|$ represents the set of all points equidistant from $z_1 = 1 + 0i$ and $z_2 = 0 + 3i$, which is the perpendicular bisector of the segment connecting them."
                    ),
                    make_q(
                        "Find the Cartesian equation of the locus $\\text{Arg}(z - 2) = \\frac{\\pi}{4}$.",
                        [
                            "The half-line $y = x - 2$ for $x > 2$",
                            "The full line $y = x - 2$",
                            "The circle $(x - 2)^2 + y^2 = 1$",
                            "The half-line $y = -x + 2$ for $x < 2$"
                        ],
                        0,
                        "$\\text{Arg}((x - 2) + iy) = \\frac{\\pi}{4} \\Rightarrow \\frac{y}{x - 2} = \\tan(\\pi/4) = 1 \\Rightarrow y = x - 2$, with the ray restriction $x - 2 > 0 \\Rightarrow x > 2, y > 0$."
                    )
                ]
            }
        ]
    },

    # --------------------------------------------------------------------------
    # IBHL 1.03: Polar Form, De Moivre's Theorem & Roots of Unity
    # --------------------------------------------------------------------------
    {
        "track": "ibhl",
        "num": "1.03",
        "slug": "polar-form-de-moivre-s-theorem-roots-of-unity",
        "title": "Polar Form, De Moivre's Theorem & Roots of Unity",
        "sections": [
            {
                "heading": "Section 1: Polar and Euler Forms",
                "questions": [
                    make_q(
                        "Express $z = -2 - 2\\sqrt{3}i$ in Euler's exponential form $r e^{i\\theta}$ with $\\theta \\in (-\\pi, \\pi]$.",
                        [
                            "$4 e^{-i 2\\pi/3}$",
                            "$4 e^{i 4\\pi/3}$",
                            "$2 e^{-i 2\\pi/3}$",
                            "$4 e^{-i \\pi/3}$"
                        ],
                        0,
                        "$r = \\sqrt{(-2)^2 + (-2\\sqrt{3})^2} = \\sqrt{4 + 12} = 4$. In Quadrant III ($x < 0, y < 0$), $\\theta = -\\pi + \\arctan(\\sqrt{3}) = -\\pi + \\frac{\\pi}{3} = -\\frac{2\\pi}{3}$. Thus $z = 4 e^{-i 2\\pi/3}$."
                    ),
                    make_q(
                        "Convert $z = 6 e^{i 3\\pi/4}$ into exact Cartesian form $x + iy$.",
                        [
                            "$-3\\sqrt{2} + 3\\sqrt{2}i$",
                            "$3\\sqrt{2} - 3\\sqrt{2}i$",
                            "$-3 + 3\\sqrt{3}i$",
                            "$-3\\sqrt{2} - 3\\sqrt{2}i$"
                        ],
                        0,
                        "$x = 6\\cos(3\\pi/4) = 6(-\\sqrt{2}/2) = -3\\sqrt{2}$. $y = 6\\sin(3\\pi/4) = 6(\\sqrt{2}/2) = 3\\sqrt{2}$."
                    ),
                    make_q(
                        "If $z_1 = 3 e^{i\\pi/3}$ and $z_2 = 2 e^{i\\pi/6}$, evaluate the quotient $\\frac{z_1}{z_2}$ in exponential form.",
                        ["$\\frac{3}{2} e^{i\\pi/6}$", "$\\frac{3}{2} e^{i\\pi/2}$", "$6 e^{i\\pi/6}$", "$1.5 e^{-i\\pi/6}$"],
                        0,
                        "$\\frac{z_1}{z_2} = \\frac{r_1}{r_2} e^{i(\\theta_1 - \\theta_2)} = \\frac{3}{2} e^{i(\\pi/3 - \\pi/6)} = \\frac{3}{2} e^{i\\pi/6}$."
                    )
                ]
            },
            {
                "heading": "Section 2: De Moivre's Theorem for Powers",
                "questions": [
                    make_q(
                        "Use De Moivre's Theorem to evaluate $(1 + i\\sqrt{3})^6$.",
                        ["$64$", "$-64$", "$64i$", "$-64i$"],
                        0,
                        "In polar form, $1 + i\\sqrt{3} = 2 e^{i\\pi/3}$. By De Moivre's Theorem: $(2 e^{i\\pi/3})^6 = 2^6 e^{i 6(\\pi/3)} = 64 e^{i 2\\pi} = 64(\\cos 2\\pi + i\\sin 2\\pi) = 64(1 + 0) = 64$."
                    ),
                    make_q(
                        "Evaluate $(\\cos(\\pi/5) + i\\sin(\\pi/5))^{10}$.",
                        ["$1$", "$-1$", "$i$", "$-i$"],
                        0,
                        "By De Moivre's Theorem: $(\\text{cis}(\\pi/5))^{10} = \\text{cis}(10 \\times \\pi/5) = \\text{cis}(2\\pi) = \\cos(2\\pi) + i\\sin(2\\pi) = 1$."
                    ),
                    make_q(
                        "Express $\\cos(3\\theta)$ in terms of $\\cos\\theta$ using De Moivre's Theorem $(\\cos\\theta + i\\sin\\theta)^3$.",
                        [
                            "$4\\cos^3\\theta - 3\\cos\\theta$",
                            "$3\\cos^3\\theta - 4\\cos\\theta$",
                            "$\\cos^3\\theta - 3\\cos\\theta$",
                            "$4\\cos^3\\theta + 3\\cos\\theta$"
                        ],
                        0,
                        "Expand $(\\cos\\theta + i\\sin\\theta)^3 = \\cos^3\\theta + 3i\\cos^2\\theta\\sin\\theta - 3\\cos\\theta\\sin^2\\theta - i\\sin^3\\theta$. Equating real parts: $\\cos(3\\theta) = \\cos^3\\theta - 3\\cos\\theta(1 - \\cos^2\\theta) = 4\\cos^3\\theta - 3\\cos\\theta$."
                    )
                ]
            },
            {
                "heading": "Section 3: Roots of Complex Numbers",
                "questions": [
                    make_q(
                        "Find all cube roots of $8i$ in polar form.",
                        [
                            "$2 e^{i\\pi/6}, 2 e^{i 5\\pi/6}, 2 e^{-i\\pi/2}$",
                            "$2 e^{i\\pi/3}, 2 e^{i\\pi}, 2 e^{i 5\\pi/3}$",
                            "$8 e^{i\\pi/6}, 8 e^{i 5\\pi/6}, 8 e^{-i\\pi/2}$",
                            "$2, -1 + i\\sqrt{3}, -1 - i\\sqrt{3}$"
                        ],
                        0,
                        "$8i = 8 e^{i\\pi/2}$. The cube roots have magnitude $8^{1/3} = 2$ and arguments $\\frac{\\pi/2 + 2k\\pi}{3} = \\frac{\\pi}{6} + \\frac{2k\\pi}{3}$ for $k = 0, 1, 2$, giving $\\frac{\\pi}{6}, \\frac{5\\pi}{6}, \\frac{9\\pi}{6} \\equiv -\\frac{\\pi}{2}$."
                    ),
                    make_q(
                        "How are the $n$ distinct $n$th roots of any complex number $z = r e^{i\\theta}$ distributed on the Argand plane?",
                        [
                            "They lie on a circle of radius $r^{1/n}$ centered at the origin, evenly spaced by $\\frac{2\\pi}{n}$ radians",
                            "They lie along a straight line through the origin",
                            "They form an ellipse with eccentricity $1/n$",
                            "They cluster exclusively in Quadrant I"
                        ],
                        0,
                        "All $n$th roots share the identical modulus $r^{1/n}$ and their arguments differ by constant increments of $\\frac{2\\pi}{n}$, forming a regular $n$-sided polygon centered at the origin."
                    ),
                    make_q(
                        "What is the sum of all $n$ distinct $n$th roots of any complex number $z$ ($n \\geq 2$)?",
                        ["$0$", "$1$", "$n$", "$z$"],
                        0,
                        "By Vieta's formulas applied to $w^n - z = 0$, the coefficient of $w^{n-1}$ is zero, so the sum of all roots is strictly zero."
                    )
                ]
            },
            {
                "heading": "Section 4: Roots of Unity & Factorization",
                "questions": [
                    make_q(
                        "If $\\omega = e^{i 2\\pi/3}$ is a primitive complex cube root of unity, what is the value of $1 + \\omega + \\omega^2$?",
                        ["$0$", "$1$", "$-1$", "$3$"],
                        0,
                        "For any $n$th root of unity $\\omega \\neq 1$, $\\sum_{k=0}^{n-1} \\omega^k = \\frac{\\omega^n - 1}{\\omega - 1} = \\frac{1 - 1}{\\omega - 1} = 0$. For $n = 3$, $1 + \\omega + \\omega^2 = 0$."
                    ),
                    make_q(
                        "Factor $z^4 + 1$ into two real quadratic factors.",
                        [
                            "$(z^2 - \\sqrt{2}z + 1)(z^2 + \\sqrt{2}z + 1)$",
                            "$(z^2 + 1)^2$",
                            "$(z^2 - 1)(z^2 + 1)$",
                            "$(z^2 - 2z + 1)(z^2 + 2z + 1)$"
                        ],
                        0,
                        "Complete the square: $z^4 + 1 = (z^2 + 1)^2 - 2z^2 = (z^2 + 1)^2 - (\\sqrt{2}z)^2 = (z^2 - \\sqrt{2}z + 1)(z^2 + \\sqrt{2}z + 1)$."
                    ),
                    make_q(
                        "The four 4th roots of unity ($z^4 = 1$) form the vertices of which geometric shape on the Argand plane?",
                        [
                            "A square inscribed in the unit circle with vertices at $\\pm 1, \\pm i$",
                            "An equilateral triangle",
                            "A regular hexagon",
                            "A rectangle of perimeter 4"
                        ],
                        0,
                        "The solutions to $z^4 = 1$ are $1, i, -1, -i$. Plotted on the Argand diagram, they form a square of side length $\\sqrt{2}$ inscribed in the unit circle."
                    )
                ]
            }
        ]
    },

    # --------------------------------------------------------------------------
    # IBHL 1.04: Partial Fractions
    # --------------------------------------------------------------------------
    {
        "track": "ibhl",
        "num": "1.04",
        "slug": "partial-fractions",
        "title": "Partial Fractions",
        "sections": [
            {
                "heading": "Section 1: Distinct Linear Factors",
                "questions": [
                    make_q(
                        "Decompose $\\frac{5x - 1}{(x - 1)(x + 2)}$ into partial fractions $\\frac{A}{x - 1} + \\frac{B}{x + 2}$.",
                        [
                            "$A = \\frac{4}{3}, B = \\frac{11}{3}$",
                            "$A = 4, B = 11$",
                            "$A = 1, B = 4$",
                            "$A = 2, B = 3$"
                        ],
                        0,
                        "Cover-up rule: $A = \\left.\\frac{5x - 1}{x + 2}\\right|_{x=1} = \\frac{4}{3}$. $B = \\left.\\frac{5x - 1}{x - 1}\\right|_{x=-2} = \\frac{-11}{-3} = \\frac{11}{3}$."
                    ),
                    make_q(
                        "Find the partial fraction decomposition of $\\frac{1}{x^2 - 9}$.",
                        [
                            "$\\frac{1/6}{x - 3} - \\frac{1/6}{x + 3}$",
                            "$\\frac{1/3}{x - 3} + \\frac{1/3}{x + 3}$",
                            "$\\frac{1}{x - 3} - \\frac{1}{x + 3}$",
                            "$\\frac{1/6}{x - 3} + \\frac{1/6}{x + 3}$"
                        ],
                        0,
                        "$\\frac{1}{(x - 3)(x + 3)} = \\frac{A}{x - 3} + \\frac{B}{x + 3}$. $A = \\left.\\frac{1}{x+3}\\right|_{x=3} = \\frac{1}{6}$. $B = \\left.\\frac{1}{x-3}\\right|_{x=-3} = -\\frac{1}{6}$."
                    ),
                    make_q(
                        "Evaluate $\\int \\frac{3}{(x + 1)(x + 4)} dx$.",
                        [
                            "$\\ln\\left|\\frac{x + 1}{x + 4}\\right| + C$",
                            "$3\\ln|x + 1| + 3\\ln|x + 4| + C$",
                            "$\\frac{1}{3}\\ln\\left|\\frac{x + 1}{x + 4}\\right| + C$",
                            "$\\ln|(x+1)(x+4)| + C$"
                        ],
                        0,
                        "Decompose: $\\frac{3}{(x+1)(x+4)} = \\frac{1}{x+1} - \\frac{1}{x+4}$. Integrating: $\\ln|x+1| - \\ln|x+4| + C = \\ln|\\frac{x+1}{x+4}| + C$."
                    )
                ]
            },
            {
                "heading": "Section 2: Repeated Linear Factors",
                "questions": [
                    make_q(
                        "What is the correct template for decomposing $\\frac{2x + 7}{(x - 2)^2(x + 1)}$?",
                        [
                            "$\\frac{A}{x - 2} + \\frac{B}{(x - 2)^2} + \\frac{C}{x + 1}$",
                            "$\\frac{A}{x - 2} + \\frac{B}{x + 1}$",
                            "$\\frac{Ax + B}{(x - 2)^2} + \\frac{C}{x + 1}$",
                            "$\\frac{A}{(x - 2)^2} + \\frac{B}{x + 1}$"
                        ],
                        0,
                        "A repeated linear factor $(x - c)^2$ requires terms for each ascending power: $\\frac{A}{x - c} + \\frac{B}{(x - c)^2}$, plus terms for any distinct factors."
                    ),
                    make_q(
                        "In $\\frac{3x^2 + 1}{(x - 1)^2} = A + \\frac{B}{x - 1} + \\frac{C}{(x - 1)^2}$, find $C$.",
                        ["$4$", "$3$", "$1$", "$0$"],
                        0,
                        "Multiply through by $(x - 1)^2$: $3x^2 + 1 = A(x - 1)^2 + B(x - 1) + C$. Setting $x = 1$ yields $3(1)^2 + 1 = C \\Rightarrow C = 4$."
                    ),
                    make_q(
                        "Decompose $\\frac{x}{(x + 1)^2}$.",
                        [
                            "$\\frac{1}{x + 1} - \\frac{1}{(x + 1)^2}$",
                            "$\\frac{1}{x + 1} + \\frac{1}{(x + 1)^2}$",
                            "$\\frac{x}{x + 1} - \\frac{1}{(x + 1)^2}$",
                            "$\\frac{2}{x + 1} - \\frac{1}{(x + 1)^2}$"
                        ],
                        0,
                        "Rewrite numerator: $x = (x + 1) - 1$. Then $\\frac{(x + 1) - 1}{(x + 1)^2} = \\frac{1}{x + 1} - \\frac{1}{(x + 1)^2}$."
                    )
                ]
            },
            {
                "heading": "Section 3: Irreducible Quadratic Factors",
                "questions": [
                    make_q(
                        "What partial fraction form should be set up for $\\frac{4x^2 + 2x + 5}{(x - 3)(x^2 + 4)}$?",
                        [
                            "$\\frac{A}{x - 3} + \\frac{Bx + C}{x^2 + 4}$",
                            "$\\frac{A}{x - 3} + \\frac{B}{x^2 + 4}$",
                            "$\\frac{A}{x - 3} + \\frac{B}{x + 2} + \\frac{C}{x - 2}$",
                            "$\\frac{Ax + B}{x - 3} + \\frac{Cx + D}{x^2 + 4}$"
                        ],
                        0,
                        "An irreducible real quadratic factor $(x^2 + a^2)$ requires a linear numerator $(Bx + C)$ over the quadratic denominator."
                    ),
                    make_q(
                        "In the decomposition $\\frac{x^2 + 1}{(x - 2)(x^2 + 1)} = \\frac{A}{x - 2} + \\frac{Bx + C}{x^2 + 1}$, find $A$.",
                        ["$\\frac{5}{5} = 1$", "$0$", "$2$", "$-1$"],
                        0,
                        "Notice $\\frac{x^2 + 1}{(x - 2)(x^2 + 1)} = \\frac{1}{x - 2}$. Thus $A = 1$ and $B = C = 0$."
                    ),
                    make_q(
                        "Evaluate $\\int \\frac{2x + 3}{x^2 + 9} dx$.",
                        [
                            "$\\ln(x^2 + 9) + \\arctan\\left(\\frac{x}{3}\\right) + C$",
                            "$\\ln(x^2 + 9) + 3\\arctan(x) + C$",
                            "$\\frac{1}{2}\\ln(x^2 + 9) + \\frac{1}{3}\\arctan(x/3) + C$",
                            "$2\\ln(x^2 + 9) + C$"
                        ],
                        0,
                        "Split into two integrals: $\\int \\frac{2x}{x^2 + 9} dx + \\int \\frac{3}{x^2 + 9} dx = \\ln(x^2 + 9) + 3 \\cdot \\frac{1}{3}\\arctan\\left(\\frac{x}{3}\\right) + C = \\ln(x^2 + 9) + \\arctan\\left(\\frac{x}{3}\\right) + C$."
                    )
                ]
            },
            {
                "heading": "Section 4: Improper Rational Fractions (Long Division First)",
                "questions": [
                    make_q(
                        "Before performing partial fractions on $\\frac{x^3 + 2x^2 + 1}{x^2 - 1}$, what preliminary algebraic step is mandatory?",
                        [
                            "Polynomial long division to separate into polynomial quotient plus proper remainder",
                            "Factoring the numerator completely",
                            "Applying the cover-up method directly",
                            "Multiplying numerator and denominator by $x$"
                        ],
                        0,
                        "Because the degree of the numerator (3) is greater than or equal to the degree of the denominator (2), long division is required first."
                    ),
                    make_q(
                        "Perform polynomial long division on $\\frac{x^3 + 2x^2 + 1}{x^2 - 1}$. What is the quotient?",
                        ["$x + 2$", "$x - 2$", "$x^2 + 2$", "$x$"],
                        0,
                        "$x(x^2 - 1) = x^3 - x$. Subtract: $2x^2 + x + 1$. Next term: $2(x^2 - 1) = 2x^2 - 2$. Subtract: $x + 3$. The quotient is $x + 2$ with remainder $x + 3$."
                    ),
                    make_q(
                        "Decompose the remainder term $\\frac{x + 3}{x^2 - 1} = \\frac{x + 3}{(x - 1)(x + 1)}$.",
                        [
                            "$\\frac{2}{x - 1} - \\frac{1}{x + 1}$",
                            "$\\frac{1}{x - 1} + \\frac{2}{x + 1}$",
                            "$\\frac{3}{x - 1} - \\frac{2}{x + 1}$",
                            "$\\frac{1}{x - 1} - \\frac{1}{x + 1}$"
                        ],
                        0,
                        "$A = \\left.\\frac{x+3}{x+1}\\right|_{x=1} = \\frac{4}{2} = 2$. $B = \\left.\\frac{x+3}{x-1}\\right|_{x=-1} = \\frac{2}{-2} = -1$. Thus $\\frac{2}{x-1} - \\frac{1}{x+1}$."
                    )
                ]
            }
        ]
    },

    # --------------------------------------------------------------------------
    # IBHL 1.05: Systems of Linear Equations (AA HL)
    # --------------------------------------------------------------------------
    {
        "track": "ibhl",
        "num": "1.05",
        "slug": "systems-of-linear-equations-aa-hl",
        "title": "Systems of Linear Equations (AA HL)",
        "sections": [
            {
                "heading": "Section 1: Augmented Matrices and Gaussian Elimination",
                "questions": [
                    make_q(
                        "In row-reducing an augmented matrix, which row operation is NOT permitted?",
                        [
                            "Squaring all elements in a row",
                            "Swapping two rows",
                            "Multiplying a row by a non-zero scalar",
                            "Adding a multiple of one row to another row"
                        ],
                        0,
                        "The three valid elementary row operations are row swaps, multiplying a row by a non-zero constant, and adding a scalar multiple of a row to another row. Squaring entries alters the solution space."
                    ),
                    make_q(
                        "An augmented matrix in row echelon form has final row $[0, 0, 0 \\mid 5]$. What does this indicate about the system?",
                        [
                            "The system is inconsistent (has no solutions)",
                            "The system has infinitely many solutions",
                            "The system has a unique solution with $z = 5$",
                            "The system has trivial solutions only"
                        ],
                        0,
                        "The row represents the contradictory equation $0x + 0y + 0z = 5$ (i.e. $0 = 5$), which cannot be satisfied by any real values; hence the system is inconsistent."
                    ),
                    make_q(
                        "An augmented matrix in row echelon form has final row $[0, 0, 0 \\mid 0]$ with 2 leading pivots across 3 variables. What does this signify?",
                        [
                            "The system has infinitely many solutions parameterized by 1 free variable",
                            "The system has a unique solution",
                            "The system has no solutions",
                            "The determinant of the matrix is 1"
                        ],
                        0,
                        "With 3 variables and 2 leading pivot columns, there is $3 - 2 = 1$ free variable, which gives a line of infinitely many solutions."
                    )
                ]
            },
            {
                "heading": "Section 2: Geometric Interpretation of 3 x 3 Systems",
                "questions": [
                    make_q(
                        "What is the geometric configuration of three linear equations in three variables that possess a unique solution?",
                        [
                            "Three planes intersecting at a single unique point",
                            "Three planes intersecting along a common line",
                            "Three parallel non-intersecting planes",
                            "Three planes forming a triangular prism"
                        ],
                        0,
                        "A unique solution $(x_0, y_0, z_0)$ means all three planes share exactly one point of intersection."
                    ),
                    make_q(
                        "If three planes intersect along a single straight line, what type of system is this?",
                        [
                            "Consistent dependent system with infinitely many solutions",
                            "Inconsistent system with no solutions",
                            "Consistent independent system with 1 solution",
                            "Homogeneous system with trivial solution only"
                        ],
                        0,
                        "Intersection along a line means infinitely many common points exist, parameterized by 1 free variable."
                    ),
                    make_q(
                        "Three planes form the faces of an open triangular prism with no common line or point. How is this system classified?",
                        [
                            "Inconsistent (no solutions)",
                            "Infinitely many solutions",
                            "Unique solution",
                            "Singular dependent"
                        ],
                        0,
                        "Each pair of planes intersects in a line, but all three lines are parallel and distinct, meaning there is no point common to all three planes simultaneously."
                    )
                ]
            },
            {
                "heading": "Section 3: Determinants and Cramer's Rule",
                "questions": [
                    make_q(
                        "Evaluate the $2 \\times 2$ determinant $\\det [[4, -3], [2, 5]]$.",
                        ["$26$", "$14$", "$-26$", "$20$"],
                        0,
                        "$\\det = ad - bc = 4(5) - (-3)(2) = 20 - (-6) = 26$."
                    ),
                    make_q(
                        "Under what condition does a $3 \\times 3$ system $A \\mathbf{x} = \\mathbf{b}$ have a unique solution?",
                        ["$\\det(A) \\neq 0$", "$\\det(A) = 0$", "$\\mathbf{b} = \\mathbf{0}$", "$\\text{Tr}(A) > 0$"],
                        0,
                        "A square system $A \\mathbf{x} = \\mathbf{b}$ has a unique solution if and only if the coefficient matrix $A$ is non-singular, meaning $\\det(A) \\neq 0$."
                    ),
                    make_q(
                        "If $\\det(A) = 0$ for a system $A \\mathbf{x} = \\mathbf{b}$, what can be concluded?",
                        [
                            "The system either has no solutions or infinitely many solutions",
                            "The system must have no solutions",
                            "The system must have infinitely many solutions",
                            "The system has exactly 2 solutions"
                        ],
                        0,
                        "When $\\det(A) = 0$, $A$ is singular; depending on the consistency of the constant vector $\\mathbf{b}$, the system has either zero solutions or infinitely many solutions."
                    )
                ]
            },
            {
                "heading": "Section 4: Parameterized Solutions and Free Variables",
                "questions": [
                    make_q(
                        "Solve the system: $x + y + z = 6$ and $2x - y + z = 3$. Parameterize the solution line using $z = \\lambda$.",
                        [
                            "$x = 3 - \\frac{2}{3}\\lambda, y = 3 - \\frac{1}{3}\\lambda, z = \\lambda$",
                            "$x = 3 + \\lambda, y = 3 - \\lambda, z = \\lambda$",
                            "$x = 9 - 2\\lambda, y = \\lambda, z = \\lambda$",
                            "$x = 1, y = 2, z = 3$"
                        ],
                        0,
                        "Add equations: $3x + 2z = 9 \\Rightarrow 3x = 9 - 2\\lambda \\Rightarrow x = 3 - \\frac{2}{3}\\lambda$. Subtract from first: $y = 6 - x - z = 6 - (3 - \\frac{2}{3}\\lambda) - \\lambda = 3 - \\frac{1}{3}\\lambda$."
                    ),
                    make_q(
                        "For what value of $k$ does the system $x + 2y = 4$ and $3x + 6y = k$ have infinitely many solutions?",
                        ["$k = 12$", "$k = 4$", "$k = 0$", "$k = 6$"],
                        0,
                        "Multiply the first equation by 3: $3x + 6y = 12$. For infinitely many solutions, the equations must be identical, so $k = 12$."
                    ),
                    make_q(
                        "If the homogeneous system $A \\mathbf{x} = \\mathbf{0}$ has non-trivial solutions (solutions other than $\\mathbf{x} = \\mathbf{0}$), what must be true about $\\det(A)$?",
                        ["$\\det(A) = 0$", "$\\det(A) > 0$", "$\\det(A) = 1$", "$\\det(A) < 0$"],
                        0,
                        "A homogeneous linear system has non-trivial solutions if and only if the coefficient matrix is singular, i.e., $\\det(A) = 0$."
                    )
                ]
            }
        ]
    },

    # --------------------------------------------------------------------------
    # IBHL 2.01: Modulus Functions & the Factor/Remainder Theorem
    # --------------------------------------------------------------------------
    {
        "track": "ibhl",
        "num": "2.01",
        "slug": "modulus-functions-the-factor-remainder-theorem",
        "title": "Modulus Functions & the Factor/Remainder Theorem",
        "sections": [
            {
                "heading": "Section 1: Solving Modulus Equations",
                "questions": [
                    make_q(
                        "Solve the equation $|2x - 5| = x + 1$.",
                        ["$x = 6$ and $x = \\frac{4}{3}$", "$x = 6$ only", "$x = \\frac{4}{3}$ only", "$x = -6$ and $x = -\\frac{4}{3}$"],
                        0,
                        "Case 1: $2x - 5 = x + 1 \\Rightarrow x = 6$. Check: $|2(6)-5| = 7 = 6+1$. Valid. Case 2: $2x - 5 = -(x + 1) = -x - 1 \\Rightarrow 3x = 4 \\Rightarrow x = 4/3$. Check: $|8/3 - 5| = 7/3 = 4/3 + 1$. Both are valid."
                    ),
                    make_q(
                        "Solve $|3x + 2| = |x - 4|$.",
                        ["$x = \\frac{1}{2}$ and $x = -3$", "$x = 2$ and $x = -3$", "$x = -\\frac{1}{2}$ and $x = 3$", "$x = 1$ and $x = -4$"],
                        0,
                        "Square both sides or branch: $3x + 2 = \\pm (x - 4)$. Branch 1: $3x + 2 = x - 4 \\Rightarrow 2x = -6 \\Rightarrow x = -3$. Branch 2: $3x + 2 = -x + 4 \\Rightarrow 4x = 2 \\Rightarrow x = 1/2$."
                    ),
                    make_q(
                        "Why can $|x - 7| = -3$ have no real solutions?",
                        [
                            "The absolute value of any real expression is non-negative ($|u| \\geq 0$), so it cannot equal a negative number",
                            "Because $x$ must be greater than 7",
                            "Because $-3$ is not a prime number",
                            "The equation has complex solutions only"
                        ],
                        0,
                        "By definition, $|u| \\geq 0$ for all $u \\in \\mathbb{R}$. A non-negative quantity can never equal $-3$."
                    )
                ]
            },
            {
                "heading": "Section 2: Modulus Inequalities",
                "questions": [
                    make_q(
                        "Solve the inequality $|2x - 3| < 7$.",
                        ["$-2 < x < 5$", "$x < 5$", "$x < -2$ or $x > 5$", "$-5 < x < 5$"],
                        0,
                        "$|2x - 3| < 7 \\Leftrightarrow -7 < 2x - 3 < 7$. Add 3: $-4 < 2x < 10$. Divide by 2: $-2 < x < 5$."
                    ),
                    make_q(
                        "Solve $|3x + 1| \\geq 10$.",
                        [
                            "$x \\leq -\\frac{11}{3}$ or $x \\geq 3$",
                            "$-\\frac{11}{3} \\leq x \\leq 3$",
                            "$x \\geq 3$",
                            "$x \\leq -3$ or $x \\geq \\frac{11}{3}$"
                        ],
                        0,
                        "$|u| \\geq a \\Leftrightarrow u \\leq -a$ or $u \\geq a$. Branch 1: $3x + 1 \\leq -10 \\Rightarrow 3x \\leq -11 \\Rightarrow x \\leq -11/3$. Branch 2: $3x + 1 \\geq 10 \\Rightarrow 3x \\geq 9 \\Rightarrow x \\geq 3$."
                    ),
                    make_q(
                        "Which interval notation represents the solution to $|x - a| \\leq \\epsilon$ where $\\epsilon > 0$?",
                        ["$[a - \\epsilon, a + \\epsilon]$", "$(a - \\epsilon, a + \\epsilon)$", "$[-\\epsilon, \\epsilon]$", "$[a, a + \\epsilon]$"],
                        0,
                        "$|x - a| \\leq \\epsilon \\Leftrightarrow -\\epsilon \\leq x - a \\leq \\epsilon \\Leftrightarrow a - \\epsilon \\leq x \\leq a + \\epsilon$, giving $[a - \\epsilon, a + \\epsilon]$."
                    )
                ]
            },
            {
                "heading": "Section 3: Polynomial Remainder & Factor Theorems",
                "questions": [
                    make_q(
                        "When $P(x) = 2x^3 - 3x^2 + ax - 5$ is divided by $(x - 2)$, the remainder is $11$. Find $a$.",
                        ["$6$", "$4$", "$-6$", "$8$"],
                        0,
                        "By the Remainder Theorem, $P(2) = 11$. $P(2) = 2(8) - 3(4) + 2a - 5 = 16 - 12 + 2a - 5 = 2a - 1$. Setting $2a - 1 = 11 \\Rightarrow 2a = 12 \\Rightarrow a = 6$."
                    ),
                    make_q(
                        "If $(x + 3)$ is a factor of $Q(x) = x^3 + kx^2 - 7x + 6$, find $k$.",
                        ["$2$", "$-2$", "$3$", "$-1$"],
                        0,
                        "By the Factor Theorem, $Q(-3) = 0$. $Q(-3) = (-3)^3 + k(-3)^2 - 7(-3) + 6 = -27 + 9k + 21 + 6 = 9k$. Setting $9k = 0 \\Rightarrow k = 0$."
                    ),
                    make_q(
                        "A polynomial $f(x)$ leaves remainder 3 when divided by $(x - 1)$ and remainder 7 when divided by $(x - 3)$. What is the linear remainder when $f(x)$ is divided by $(x - 1)(x - 3)$?",
                        ["$2x + 1$", "$2x - 1$", "$x + 2$", "$4x - 1$"],
                        0,
                        "Let $R(x) = ax + b$. $R(1) = a + b = 3$ and $R(3) = 3a + b = 7$. Subtracting: $2a = 4 \\Rightarrow a = 2$. Then $b = 3 - 2 = 1$. The remainder is $2x + 1$."
                    )
                ]
            },
            {
                "heading": "Section 4: Transformations of Modulus Graphs",
                "questions": [
                    make_q(
                        "How is the graph of $y = |f(x)|$ obtained from the graph of $y = f(x)$?",
                        [
                            "Any part of the graph lying below the $x$-axis is reflected vertically across the $x$-axis into the upper half-plane",
                            "The left half of the graph is discarded and replaced by reflection of the right half",
                            "The graph is shifted 1 unit upward",
                            "The graph is reflected across the $y$-axis"
                        ],
                        0,
                        "Taking $|f(x)|$ preserves positive $y$-values and takes the opposite of negative $y$-values, reflecting sections below the $x$-axis upward across the $x$-axis."
                    ),
                    make_q(
                        "How is the graph of $y = f(|x|)$ obtained from $y = f(x)$?",
                        [
                            "Discard the portion for $x < 0$, and reflect the portion for $x \\geq 0$ across the $y$-axis to form an even function",
                            "Reflect the entire graph across the $x$-axis",
                            "Reflect the graph across $y = x$",
                            "Shift the graph to the right by $|x|$"
                        ],
                        0,
                        "Because $|-x| = |x|$, $f(|x|)$ is an even function: the right half ($x \\geq 0$) is reflected across the $y$-axis, discarding the original $x < 0$ part."
                    ),
                    make_q(
                        "What is the vertex (sharp turn) of the function $g(x) = 3|x - 4| - 5$?",
                        ["$(4, -5)$", "$(-4, -5)$", "$(4, 5)$", "$(0, -5)$"],
                        0,
                        "The absolute value term $|x - 4|$ reaches its minimum of 0 at $x = 4$. At $x = 4$, $g(4) = 0 - 5 = -5$, giving vertex $(4, -5)$."
                    )
                ]
            }
        ]
    }
]
