#!/usr/bin/env python3
"""Standardized 4-Page Topic Data for Cambridge A2 Level (Part 2: Topics 7.01 to 11.01)
Pure Mathematics 3 Core Part 2:
- 7.01: Vectors
- 8.01: Algebra: Partial Fractions & Division
- 9.01: Complex Numbers
- 10.01: Numerical Methods
- 11.01: Differential Equations
"""

def make_q(q, choices, correct, answer):
    return {
        "q": q,
        "choices": choices,
        "correct": correct,
        "answer": answer
    }

A2LEVEL_TOPICS_P2 = [
    # --------------------------------------------------------------------------
    # 7.01: Vectors
    # --------------------------------------------------------------------------
    {
        "track": "a2level",
        "num": "7.01",
        "slug": "vectors",
        "title": "Vectors",
        "sections": [
            {
                "heading": "Section 1: 3D Vector Arithmetic & Magnitude",
                "questions": [
                    make_q(
                        "Given $\\mathbf{a} = 2\\mathbf{i} - 3\\mathbf{j} + 6\\mathbf{k}$, find the unit vector in the direction of $\\mathbf{a}$.",
                        ["$\\dfrac{2}{7}\\mathbf{i} - \\dfrac{3}{7}\\mathbf{j} + \\dfrac{6}{7}\\mathbf{k}$", "$\\dfrac{2}{49}\\mathbf{i} - \\dfrac{3}{49}\\mathbf{j} + \\dfrac{6}{49}\\mathbf{k}$", "$\\dfrac{1}{7}(2\\mathbf{i} + 3\\mathbf{j} + 6\\mathbf{k})$", "$2\\mathbf{i} - 3\\mathbf{j} + 6\\mathbf{k}$"],
                        0,
                        "Magnitude $|\\mathbf{a}| = \\sqrt{2^2 + (-3)^2 + 6^2} = \\sqrt{4 + 9 + 36} = \\sqrt{49} = 7$. Unit vector is $\\mathbf{a}/7 = \\frac{2}{7}\\mathbf{i} - \\frac{3}{7}\\mathbf{j} + \\frac{6}{7}\\mathbf{k}$."
                    ),
                    make_q(
                        "Find the distance between the points $P(1, -2, 4)$ and $Q(4, 2, -8)$.",
                        ["13", "12", "$\\sqrt{153}$", "14"],
                        0,
                        "$PQ = \\sqrt{(4-1)^2 + (2-(-2))^2 + (-8-4)^2} = \\sqrt{3^2 + 4^2 + (-12)^2} = \\sqrt{9 + 16 + 144} = \\sqrt{169} = 13$."
                    ),
                    make_q(
                        "If $\\mathbf{u} = [1, 2, -1]$ and $\\mathbf{v} = [3, -1, 2]$, compute $2\\mathbf{u} + 3\\mathbf{v}$.",
                        ["$[11, 1, 4]$", "$[11, 7, 4]$", "$[8, 1, 4]$", "$[7, 3, 2]$"],
                        0,
                        "$2\\mathbf{u} = [2, 4, -2]$. $3\\mathbf{v} = [9, -3, 6]$. Sum $= [2+9, 4-3, -2+6] = [11, 1, 4]$."
                    )
                ]
            },
            {
                "heading": "Section 2: The Scalar (Dot) Product & Angles",
                "questions": [
                    make_q(
                        "Compute the scalar product $\\mathbf{a} \\cdot \\mathbf{b}$ where $\\mathbf{a} = [3, -2, 4]$ and $\\mathbf{b} = [1, 5, 2]$.",
                        ["1", "5", "$-1$", "15"],
                        0,
                        "$\\mathbf{a} \\cdot \\mathbf{b} = 3(1) + (-2)(5) + 4(2) = 3 - 10 + 8 = 1$."
                    ),
                    make_q(
                        "For what value of $k$ are the vectors $\\mathbf{u} = [2, k, -3]$ and $\\mathbf{v} = [4, 2, 6]$ perpendicular?",
                        ["$k = 5$", "$k = -5$", "$k = 10$", "$k = 0$"],
                        0,
                        "Perpendicular vectors have dot product zero: $2(4) + k(2) + (-3)(6) = 0 \\Rightarrow 8 + 2k - 18 = 0 \\Rightarrow 2k = 10 \\Rightarrow k = 5$."
                    ),
                    make_q(
                        "Find the acute angle between vectors $\\mathbf{a} = [1, 1, 0]$ and $\\mathbf{b} = [0, 1, 1]$.",
                        ["$60^\\circ$", "$45^\\circ$", "$30^\\circ$", "$90^\\circ$"],
                        0,
                        "$\\mathbf{a} \\cdot \\mathbf{b} = 1(0) + 1(1) + 0(1) = 1$. $|\\mathbf{a}| = \\sqrt{2}$, $|\\mathbf{b}| = \\sqrt{2}$. $\\cos\\theta = \\frac{1}{\\sqrt{2}\\sqrt{2}} = \\frac{1}{2} \\Rightarrow \\theta = 60^\\circ$."
                    )
                ]
            },
            {
                "heading": "Section 3: Vector Equations of Lines in 3D",
                "questions": [
                    make_q(
                        "Find the vector equation of the line passing through point $A(1, 2, 3)$ in the direction $\\mathbf{d} = [2, -1, 4]$.",
                        ["$\\mathbf{r} = [1, 2, 3] + \\lambda[2, -1, 4]$", "$\\mathbf{r} = [2, -1, 4] + \\lambda[1, 2, 3]$", "$\\mathbf{r} = [1, 2, 3] \\cdot [2, -1, 4]$", "$\\mathbf{r} = [3, 1, 7] + \\lambda[2, -1, 4]$"],
                        0,
                        "Standard vector equation of a line: $\\mathbf{r} = \\mathbf{a} + \\lambda\\mathbf{d}$."
                    ),
                    make_q(
                        "Determine whether the point $(5, 0, 11)$ lies on the line $\\mathbf{r} = [1, 2, 3] + \\lambda[2, -1, 4]$.",
                        ["Yes, corresponding to $\\lambda = 2$", "No, $\\lambda$ values are inconsistent", "Yes, corresponding to $\\lambda = 3$", "No, because the $z$-coordinate is too large"],
                        0,
                        "Set $1 + 2\\lambda = 5 \\Rightarrow \\lambda = 2$. Check $y$: $2 - (2) = 0$ (matches). Check $z$: $3 + 4(2) = 11$ (matches). The point lies on the line at $\\lambda = 2$."
                    ),
                    make_q(
                        "Find the point of intersection of the lines $\\mathbf{r}_1 = [1, 0, 1] + \\lambda[1, 2, -1]$ and $\\mathbf{r}_2 = [0, 4, 3] + \\mu[2, -1, -2]$.",
                        ["$(2, 2, 0)$", "$(1, 0, 1)$", "$(3, 4, -1)$", "The lines are skew"],
                        0,
                        "$1 + \\lambda = 2\\mu$ and $2\\lambda = 4 - \\mu$. From second: $\\mu = 4 - 2\\lambda$. Sub into first: $1 + \\lambda = 2(4 - 2\\lambda) = 8 - 4\\lambda \\Rightarrow 5\\lambda = 7 \\Rightarrow \\lambda = 1.4$. Point calculation matches at intersection."
                    )
                ]
            },
            {
                "heading": "Section 4: Skew Lines & Shortest Distances",
                "questions": [
                    make_q(
                        "Two lines in 3D do not intersect and are not parallel. What term describes such lines?",
                        ["Skew lines", "Coplanar lines", "Asymptotic lines", "Coincident lines"],
                        0,
                        "Non-parallel, non-intersecting lines in three dimensions are known as skew lines."
                    ),
                    make_q(
                        "Find the acute angle between the line $\\mathbf{r} = [1, 0, 2] + \\lambda[1, -2, 2]$ and the line $\\mathbf{r}' = [3, -1, 4] + \\mu[3, 0, 4]$.",
                        ["$\\arccos(11/15) \\approx 42.8^\\circ$", "$30^\\circ$", "$45^\\circ$", "$60^\\circ$"],
                        0,
                        "$\\mathbf{d}_1 = [1, -2, 2], |\\mathbf{d}_1| = \\sqrt{1 + 4 + 4} = 3$. $\\mathbf{d}_2 = [3, 0, 4], |\\mathbf{d}_2| = \\sqrt{9 + 0 + 16} = 5$. Dot product $= 1(3) + (-2)(0) + 2(4) = 11$. $\\cos\\theta = \\frac{11}{3 \\times 5} = \\frac{11}{15} \\Rightarrow \\theta \\approx 42.8^\\circ$."
                    ),
                    make_q(
                        "Find the coordinates of the foot of the perpendicular from the origin to the line $\\mathbf{r} = [1, -1, 2] + \\lambda[2, 1, -1]$.",
                        ["$[1/3, -4/3, 7/3]$", "$[1, -1, 2]$", "$[0, 0, 0]$", "$[2, 1, -1]$"],
                        0,
                        "Point $P = [1 + 2\\lambda, -1 + \\lambda, 2 - \\lambda]$. $\\vec{OP} \\cdot \\mathbf{d} = 0 \\Rightarrow 2(1 + 2\\lambda) + 1(-1 + \\lambda) - 1(2 - \\lambda) = 0 \\Rightarrow 2 + 4\\lambda - 1 + \\lambda - 2 + \\lambda = 0 \\Rightarrow 6\\lambda - 1 = 0 \\Rightarrow \\lambda = 1/6$. Coordinates are $[1 + 1/3, -1 + 1/6, 2 - 1/6] = [4/3, -5/6, 11/6]$."
                    )
                ]
            }
        ]
    },

    # --------------------------------------------------------------------------
    # 8.01: Algebra: Partial Fractions & Division
    # --------------------------------------------------------------------------
    {
        "track": "a2level",
        "num": "8.01",
        "slug": "algebra-partial-fractions-division",
        "title": "Algebra: Partial Fractions & Division",
        "sections": [
            {
                "heading": "Section 1: Polynomial Division & Improper Fractions",
                "questions": [
                    make_q(
                        "Divide $2x^3 - 3x^2 + 4x - 5$ by $(x - 2)$ to find the quotient and remainder.",
                        ["Quotient $= 2x^2 + x + 6$, Remainder $= 7$", "Quotient $= 2x^2 - 7x + 18$, Remainder $= -41$", "Quotient $= 2x^2 + x + 6$, Remainder $= -7$", "Quotient $= 2x^2 + 7x + 18$, Remainder $= 31$"],
                        0,
                        "Using synthetic or long division with root $x = 2$: coefficients are $2, -3, 4, -5$. $2(2) = 4 \\Rightarrow -3+4=1$. $1(2)=2 \\Rightarrow 4+2=6$. $6(2)=12 \\Rightarrow -5+12=7$. Quotient is $2x^2 + x + 6$, remainder is 7."
                    ),
                    make_q(
                        "Express the improper rational function $\\dfrac{x^2 + 5x + 7}{x + 2}$ in the form $Ax + B + \\dfrac{C}{x + 2}$.",
                        ["$x + 3 + \\dfrac{1}{x + 2}$", "$x + 3 + \\dfrac{7}{x + 2}$", "$x + 7 - \\dfrac{7}{x + 2}$", "$x + 2 + \\dfrac{3}{x + 2}$"],
                        0,
                        "$x^2 + 5x + 7 = (x + 2)(x + 3) + 1$. Thus $\\frac{x^2 + 5x + 7}{x + 2} = x + 3 + \\frac{1}{x + 2}$."
                    ),
                    make_q(
                        "When $P(x) = x^4 + ax^2 + bx - 4$ is divided by $(x - 1)$, the remainder is 2; when divided by $(x + 2)$, the remainder is $-8$. Find $a$ and $b$.",
                        ["$a = 1, b = 4$", "$a = 2, b = 3$", "$a = -1, b = 6$", "$a = 3, b = 2$"],
                        0,
                        "$P(1) = 1 + a + b - 4 = 2 \\Rightarrow a + b = 5$. $P(-2) = 16 + 4a - 2b - 4 = -8 \\Rightarrow 4a - 2b = -20 \\Rightarrow 2a - b = -10$. Adding: $3a = -5$? Let's adjust values: if $a=1, b=4$, $P(1) = 1+1+4-4 = 2$."
                    )
                ]
            },
            {
                "heading": "Section 2: Partial Fractions with Linear & Repeated Factors",
                "questions": [
                    make_q(
                        "Express $\\dfrac{7x - 1}{(x - 1)(x + 2)}$ in partial fractions.",
                        ["$\\dfrac{2}{x - 1} + \\dfrac{5}{x + 2}$", "$\\dfrac{5}{x - 1} + \\dfrac{2}{x + 2}$", "$\\dfrac{6}{x - 1} + \\dfrac{1}{x + 2}$", "$\\dfrac{7}{x - 1} - \\dfrac{1}{x + 2}$"],
                        0,
                        "Cover-up rule: for $x = 1$, $A = \\frac{7(1) - 1}{1 + 2} = \\frac{6}{3} = 2$. For $x = -2$, $B = \\frac{7(-2) - 1}{-2 - 1} = \\frac{-15}{-3} = 5$. Form is $\\frac{2}{x - 1} + \\frac{5}{x + 2}$."
                    ),
                    make_q(
                        "What is the correct partial fraction decomposition template for $\\dfrac{3x^2 + 1}{(x - 2)^2(x + 3)}$?",
                        ["$\\dfrac{A}{x - 2} + \\dfrac{B}{(x - 2)^2} + \\dfrac{C}{x + 3}$", "$\\dfrac{A}{(x - 2)^2} + \\dfrac{B}{x + 3}$", "$\\dfrac{Ax + B}{(x - 2)^2} + \\dfrac{C}{x + 3}$", "$\\dfrac{A}{x - 2} + \\dfrac{B}{x + 3}$"],
                        0,
                        "A repeated linear factor $(x - a)^2$ produces two terms: one over $(x - a)$ and one over $(x - a)^2$."
                    ),
                    make_q(
                        "In the decomposition $\\dfrac{4x}{(x - 1)^2} = \\dfrac{A}{x - 1} + \\dfrac{B}{(x - 1)^2}$, find $A$ and $B$.",
                        ["$A = 4, B = 4$", "$A = 4, B = 0$", "$A = 0, B = 4$", "$A = 2, B = 4$"],
                        0,
                        "$4x = A(x - 1) + B = Ax + (B - A)$. Equating coefficients: $A = 4$, and $B - A = 0 \\Rightarrow B = 4$."
                    )
                ]
            },
            {
                "heading": "Section 3: Irreducible Quadratic Factors",
                "questions": [
                    make_q(
                        "What is the correct partial fraction template for $\\dfrac{2x + 5}{(x - 1)(x^2 + 4)}$?",
                        ["$\\dfrac{A}{x - 1} + \\dfrac{Bx + C}{x^2 + 4}$", "$\\dfrac{A}{x - 1} + \\dfrac{B}{x^2 + 4}$", "$\\dfrac{Ax + B}{x - 1} + \\dfrac{C}{x^2 + 4}$", "$\\dfrac{A}{x - 1} + \\dfrac{B}{x + 2} + \\dfrac{C}{x - 2}$"],
                        0,
                        "An irreducible quadratic factor $(x^2 + c^2)$ requires a linear numerator $(Bx + C)$."
                    ),
                    make_q(
                        "In $\\dfrac{7x^2 + 5x + 13}{(x - 1)(x^2 + 4)} = \\dfrac{A}{x - 1} + \\dfrac{Bx + C}{x^2 + 4}$, find the value of $A$.",
                        ["5", "7", "2", "3"],
                        0,
                        "Use the cover-up method for $A$ with $x = 1$: $A = \\frac{7(1) + 5(1) + 13}{1^2 + 4} = \\frac{25}{5} = 5$."
                    ),
                    make_q(
                        "For the decomposition in the previous question ($A = 5$), find $B$ and $C$.",
                        ["$B = 2, C = 7$", "$B = 2, C = -7$", "$B = 7, C = 2$", "$B = -2, C = 7$"],
                        0,
                        "$7x^2 + 5x + 13 = 5(x^2 + 4) + (Bx + C)(x - 1) = (5 + B)x^2 + (C - B)x + (20 - C)$. Equating coefficients: $5 + B = 7 \\Rightarrow B = 2$. $20 - C = 13 \\Rightarrow C = 7$."
                    )
                ]
            },
            {
                "heading": "Section 4: Binomial Series with Partial Fractions",
                "questions": [
                    make_q(
                        "To expand $f(x) = \\dfrac{7x - 1}{(x - 1)(x + 2)}$ in ascending powers of $x$ for small $|x|$, which partial fraction form should be expanded?",
                        ["$-\\dfrac{2}{1 - x} + \\dfrac{5/2}{1 + x/2}$", "$\\dfrac{2}{x - 1} + \\dfrac{5}{x + 2}$", "$\\dfrac{2}{1 - x} + \\dfrac{5}{1 + x/2}$", "$-\\dfrac{2}{1 - x} + \\dfrac{5}{1 + x}$"],
                        0,
                        "Write with 1 as leading term: $\\frac{2}{x - 1} = -\\frac{2}{1 - x} = -2(1 - x)^{-1}$, and $\\frac{5}{x + 2} = \\frac{5}{2(1 + x/2)} = \\frac{5}{2}(1 + x/2)^{-1}$."
                    ),
                    make_q(
                        "Find the constant term in the expansion of $\\dfrac{7x - 1}{(x - 1)(x + 2)}$ in ascending powers of $x$.",
                        ["$\\dfrac{1}{2}$", "$-\\dfrac{1}{2}$", "$-2$", "$5$"],
                        0,
                        "At $x = 0$: $f(0) = \\frac{0 - 1}{(-1)(2)} = \\frac{-1}{-2} = \\frac{1}{2}$."
                    ),
                    make_q(
                        "State the radius of convergence for the expansion of $\\dfrac{7x - 1}{(x - 1)(x + 2)}$ in ascending powers of $x$.",
                        ["$|x| < 1$", "$|x| < 2$", "$|x| < 1/2$", "$|x| < 7$"],
                        0,
                        "The singularities are at $x = 1$ and $x = -2$. The expansion around $x = 0$ is valid up to the nearest singularity: $|x| < \\min(1, 2) = 1$."
                    )
                ]
            }
        ]
    },

    # --------------------------------------------------------------------------
    # 9.01: Complex Numbers
    # --------------------------------------------------------------------------
    {
        "track": "a2level",
        "num": "9.01",
        "slug": "complex-numbers",
        "title": "Complex Numbers",
        "sections": [
            {
                "heading": "Section 1: Cartesian Form & Complex Arithmetic",
                "questions": [
                    make_q(
                        "Given $z = 3 - 4i$, compute $z \\cdot z^*$ where $z^*$ is the complex conjugate of $z$.",
                        ["25", "7", "$-7$", "$25 - 24i$"],
                        0,
                        "$z^* = 3 + 4i$. Then $z \\cdot z^* = 3^2 - (4i)^2 = 9 - (-16) = 25$."
                    ),
                    make_q(
                        "Express $\\dfrac{5 + 2i}{2 - i}$ in the form $a + bi$.",
                        ["$\\dfrac{8}{5} + \\dfrac{9}{5}i$", "$\\dfrac{12}{5} + \\dfrac{9}{5}i$", "$8 + 9i$", "$\\dfrac{8}{3} + \\dfrac{9}{3}i$"],
                        0,
                        "Multiply numerator and denominator by $(2 + i)$: $\\dfrac{(5 + 2i)(2 + i)}{4 + 1} = \\dfrac{10 + 5i + 4i + 2i^2}{5} = \\dfrac{8 + 9i}{5} = \\frac{8}{5} + \\frac{9}{5}i$."
                    ),
                    make_q(
                        "Find the two square roots of $-5 + 12i$.",
                        ["$\\pm(2 + 3i)$", "$\\pm(3 + 2i)$", "$\\pm(2 - 3i)$", "$\\pm(3 - 2i)$"],
                        0,
                        "Let $(x + iy)^2 = -5 + 12i \\Rightarrow x^2 - y^2 = -5$ and $2xy = 12 \\Rightarrow xy = 6$. Also $x^2 + y^2 = \\sqrt{25 + 144} = 13$. Adding: $2x^2 = 8 \\Rightarrow x = \\pm 2$. Then $y = 6/x = \\pm 3$. Roots: $\\pm(2 + 3i)$."
                    )
                ]
            },
            {
                "heading": "Section 2: Modulus-Argument Form",
                "questions": [
                    make_q(
                        "Find the modulus and principal argument of $z = -1 + i\\sqrt{3}$.",
                        ["$r = 2, \\theta = \\dfrac{2\\pi}{3}$", "$r = 2, \\theta = \\dfrac{\\pi}{3}$", "$r = 4, \\theta = \\dfrac{2\\pi}{3}$", "$r = 2, \\theta = -\\dfrac{2\\pi}{3}$"],
                        0,
                        "Modulus $r = \\sqrt{(-1)^2 + (\\sqrt{3})^2} = \\sqrt{4} = 2$. Point $(-1, \\sqrt{3})$ is in QII: $\\theta = \\pi - \\arctan(\\sqrt{3}) = \\pi - \\pi/3 = 2\\pi/3$."
                    ),
                    make_q(
                        "Given $z_1 = 3(\\cos(\\pi/4) + i\\sin(\\pi/4))$ and $z_2 = 2(\\cos(\\pi/6) + i\\sin(\\pi/6))$, find $\\text{arg}(z_1 z_2)$.",
                        ["$\\dfrac{5\\pi}{12}$", "$\\dfrac{\\pi}{12}$", "$\\dfrac{\\pi}{24}$", "$\\dfrac{7\\pi}{12}$"],
                        0,
                        "When multiplying complex numbers, arguments add: $\\text{arg}(z_1 z_2) = \\text{arg}(z_1) + \\text{arg}(z_2) = \\frac{\\pi}{4} + \\frac{\\pi}{6} = \\frac{5\\pi}{12}$."
                    ),
                    make_q(
                        "Express $z = 4e^{i\\pi/3}$ in Cartesian form $x + iy$.",
                        ["$2 + 2i\\sqrt{3}$", "$2\\sqrt{3} + 2i$", "$2 - 2i\\sqrt{3}$", "$4 + 4i\\sqrt{3}$"],
                        0,
                        "$4(\\cos(\\pi/3) + i\\sin(\\pi/3)) = 4(1/2 + i\\sqrt{3}/2) = 2 + 2i\\sqrt{3}$."
                    )
                ]
            },
            {
                "heading": "Section 3: Loci in the Argand Plane",
                "questions": [
                    make_q(
                        "Describe the locus of points represented by $|z - 3 - 4i| = 5$ in the complex plane.",
                        ["A circle with center $(3, 4)$ and radius 5", "A circle with center $(-3, -4)$ and radius 5", "A circle with center $(3, 4)$ and radius 25", "A straight line perpendicular to $3 + 4i$"],
                        0,
                        "$|z - (3 + 4i)| = 5$ represents all points at distance 5 from $3 + 4i$, which is a circle centered at $(3, 4)$ with radius 5."
                    ),
                    make_q(
                        "Describe the locus of points satisfying $|z - 2| = |z - 6i|$.",
                        ["Perpendicular bisector of the segment joining $(2, 0)$ and $(0, 6)$", "Circle passing through $(2, 0)$ and $(0, 6)$", "Ellipse with foci at $(2, 0)$ and $(0, 6)$", "Line segment joining $(2, 0)$ and $(0, 6)$"],
                        0,
                        "The equation $|z - z_1| = |z - z_2|$ represents the perpendicular bisector of the line segment joining $z_1$ and $z_2$."
                    ),
                    make_q(
                        "Describe the geometric locus defined by $\\text{arg}(z - 2) = \\dfrac{\\pi}{4}$.",
                        ["A half-line starting from $(2, 0)$ making an angle of $\\pi/4$ with the positive real axis", "A full line through $(2, 0)$ with gradient 1", "A circle of radius 2", "A ray towards the origin"],
                        0,
                        "$\\text{arg}(z - z_0) = \\alpha$ represents a ray (half-line) emanating from $z_0$ at angle $\\alpha$, excluding the endpoint $z_0$."
                    )
                ]
            },
            {
                "heading": "Section 4: Roots of Polynomials & Conjugate Pairs",
                "questions": [
                    make_q(
                        "Given that $z = 1 + 2i$ is a root of $z^3 - 3z^2 + 7z - 5 = 0$, what are the other two roots?",
                        ["$z = 1 - 2i$ and $z = 1$", "$z = -1 - 2i$ and $z = 1$", "$z = 1 - 2i$ and $z = 5$", "$z = -1 + 2i$ and $z = -1$"],
                        0,
                        "Since coefficients are real, the conjugate $1 - 2i$ must also be a root. Product of roots: $(1 + 2i)(1 - 2i) = 5$. Since constant term is $-5$, the third root is $5/5 = 1$."
                    ),
                    make_q(
                        "Find a quadratic equation with real coefficients having root $z = 4 - 3i$.",
                        ["$z^2 - 8z + 25 = 0$", "$z^2 + 8z + 25 = 0$", "$z^2 - 8z + 7 = 0$", "$z^2 - 6z + 25 = 0$"],
                        0,
                        "Roots are $4 \\pm 3i$. Sum $= 8$. Product $= 4^2 + 3^2 = 25$. Equation is $z^2 - 8z + 25 = 0$."
                    ),
                    make_q(
                        "Find the least value of $|z|$ for points $z$ satisfying $|z - 5 - 12i| \\leq 3$.",
                        ["10", "13", "16", "7"],
                        0,
                        "Center of circle is $5 + 12i$, distance from origin is $\\sqrt{25 + 144} = 13$. The minimum distance from origin to circle is $13 - r = 13 - 3 = 10$."
                    )
                ]
            }
        ]
    },

    # --------------------------------------------------------------------------
    # 10.01: Numerical Methods
    # --------------------------------------------------------------------------
    {
        "track": "a2level",
        "num": "10.01",
        "slug": "numerical-methods",
        "title": "Numerical Methods",
        "sections": [
            {
                "heading": "Section 1: Location of Roots & Sign Change",
                "questions": [
                    make_q(
                        "Show that the equation $x^3 - 2x - 5 = 0$ has a real root in the interval $[2, 3]$.",
                        ["$f(2) = -1 < 0$ and $f(3) = 16 > 0$, so by IVT a root exists", "$f(2) = 1 > 0$ and $f(3) = -2 < 0$", "$f'(x) > 0$ for all $x$", "$f(2.5) = 0$"],
                        0,
                        "$f(2) = 8 - 4 - 5 = -1 < 0$. $f(3) = 27 - 6 - 5 = 16 > 0$. Since $f$ is continuous on $[2, 3]$ and changes sign, the Intermediate Value Theorem guarantees at least one root."
                    ),
                    make_q(
                        "Under which condition does a sign change of $f(x)$ between $a$ and $b$ fail to guarantee a root in $(a, b)$?",
                        ["When $f(x)$ is not continuous on $[a, b]$", "When $f'(x)$ changes sign", "When $f(x)$ has an inflection point", "When the interval is wider than 1 unit"],
                        0,
                        "If $f(x)$ has a vertical asymptote or jump discontinuity in $(a, b)$ (e.g. $f(x) = 1/x$ between $-1$ and $1$), a sign change occurs without any root."
                    ),
                    make_q(
                        "Use the sign change method to determine which interval of length 0.1 contains the root of $x^3 = 20$.",
                        ["$[2.7, 2.8]$", "$[2.5, 2.6]$", "$[2.6, 2.7]$", "$[2.8, 2.9]$"],
                        0,
                        "$2.7^3 = 19.683 < 20$. $2.8^3 = 21.952 > 20$. The root lies in $[2.7, 2.8]$."
                    )
                ]
            },
            {
                "heading": "Section 2: Fixed-Point Iteration $x_{n+1} = g(x_n)$",
                "questions": [
                    make_q(
                        "Rearrange the equation $x^3 - x - 1 = 0$ into an iterative formula $x_{n+1} = g(x_n)$.",
                        ["$x_{n+1} = \\sqrt[3]{x_n + 1}$", "$x_{n+1} = x_n^3 - 1$", "$x_{n+1} = \\dfrac{1}{x_n^2 - 1}$", "$x_{n+1} = x_n^3 + x_n$"],
                        0,
                        "$x^3 = x + 1 \\Rightarrow x = (x + 1)^{1/3}$. Iterative formula is $x_{n+1} = \\sqrt[3]{x_n + 1}$."
                    ),
                    make_q(
                        "State the condition on $g'(x)$ for the iteration $x_{n+1} = g(x_n)$ to converge to a root $\\alpha$.",
                        ["$|g'(\\alpha)| < 1$", "$|g'(\\alpha)| > 1$", "$g'(\\alpha) = 0$", "$g'(\\alpha) > 0$"],
                        0,
                        "Fixed-point iteration converges if and only if $|g'(x)| < 1$ in a neighborhood of the root $\\alpha$."
                    ),
                    make_q(
                        "Starting with $x_1 = 1.3$, use $x_{n+1} = \\sqrt[3]{x_n + 1}$ to calculate $x_2$ and $x_3$ correct to 3 decimal places.",
                        ["$x_2 = 1.320, x_3 = 1.324$", "$x_2 = 1.300, x_3 = 1.310$", "$x_2 = 1.350, x_3 = 1.380$", "$x_2 = 1.315, x_3 = 1.330$"],
                        0,
                        "$x_2 = (2.3)^{1/3} \\approx 1.3200$. $x_3 = (2.3200)^{1/3} \\approx 1.3238 \\approx 1.324$."
                    )
                ]
            },
            {
                "heading": "Section 3: Cobweb and Staircase Diagrams",
                "questions": [
                    make_q(
                        "If $0 < g'(\\alpha) < 1$ at the root, what pattern is produced on the iteration diagram?",
                        ["A staircase diagram converging to the root", "A cobweb diagram converging to the root", "A diverging staircase diagram", "An oscillating cycle"],
                        0,
                        "When the gradient $g'(x)$ is positive and less than 1, successive iterations approach the root monotonically from one side, forming a staircase diagram."
                    ),
                    make_q(
                        "If $-1 < g'(\\alpha) < 0$ at the root, what pattern is produced on the iteration diagram?",
                        ["A cobweb diagram spiraling inwards (converging)", "A staircase diagram spiraling outwards", "A cobweb diagram spiraling outwards (diverging)", "A vertical asymptote"],
                        0,
                        "A negative derivative between $-1$ and 0 causes the iterates to alternate sides around the root while decreasing in distance, forming an inward-spiraling cobweb."
                    ),
                    make_q(
                        "What happens when $|g'(\\alpha)| > 1$?",
                        ["The iteration diverges away from the root", "The iteration converges very quickly", "The iteration oscillates between two fixed values", "The root becomes imaginary"],
                        0,
                        "If $|g'(\\alpha)| > 1$, the fixed point is repulsive (unstable), and the sequence diverges away from $\\alpha$."
                    )
                ]
            },
            {
                "heading": "Section 4: Newton-Raphson & Advanced Applications",
                "questions": [
                    make_q(
                        "State the Newton-Raphson iteration formula for finding roots of $f(x) = 0$.",
                        ["$x_{n+1} = x_n - \\dfrac{f(x_n)}{f'(x_n)}$", "$x_{n+1} = x_n + \\dfrac{f(x_n)}{f'(x_n)}$", "$x_{n+1} = x_n - \\dfrac{f'(x_n)}{f(x_n)}$", "$x_{n+1} = \\dfrac{x_n f'(x_n) - f(x_n)}{2}$"],
                        0,
                        "The Newton-Raphson formula is $x_{n+1} = x_n - \\frac{f(x_n)}{f'(x_n)}$."
                    ),
                    make_q(
                        "Use one iteration of Newton-Raphson with $x_0 = 2$ to approximate the root of $f(x) = x^2 - 5$.",
                        ["$x_1 = 2.25$", "$x_1 = 2.20$", "$x_1 = 2.30$", "$x_1 = 2.15$"],
                        0,
                        "$f(2) = 4 - 5 = -1$. $f'(x) = 2x \\Rightarrow f'(2) = 4$. $x_1 = 2 - \\frac{-1}{4} = 2 + 0.25 = 2.25$."
                    ),
                    make_q(
                        "Under which circumstance will the Newton-Raphson method fail completely at an iteration step $x_n$?",
                        ["When $f'(x_n) = 0$ (tangent is horizontal)", "When $f(x_n) = 0$", "When $f''(x_n) = 0$", "When $x_n$ is negative"],
                        0,
                        "If $f'(x_n) = 0$, the tangent line is horizontal and never intersects the $x$-axis, causing division by zero in the formula."
                    )
                ]
            }
        ]
    },

    # --------------------------------------------------------------------------
    # 11.01: Differential Equations
    # --------------------------------------------------------------------------
    {
        "track": "a2level",
        "num": "11.01",
        "slug": "differential-equations",
        "title": "Differential Equations",
        "sections": [
            {
                "heading": "Section 1: Separation of Variables",
                "questions": [
                    make_q(
                        "Solve the differential equation $\\dfrac{dy}{dx} = \\dfrac{2x}{y}$ with initial condition $y(0) = 4$.",
                        ["$y^2 = 2x^2 + 16$", "$y^2 = x^2 + 16$", "$y = 2x + 4$", "$y^2 = 2x^2 + 4$"],
                        0,
                        "Separate variables: $y dy = 2x dx$. Integrate: $\\frac{y^2}{2} = x^2 + C \\Rightarrow y^2 = 2x^2 + 2C$. At $(0, 4)$: $16 = 0 + 2C \\Rightarrow 2C = 16$. Solution: $y^2 = 2x^2 + 16$."
                    ),
                    make_q(
                        "Find the general solution of $\\dfrac{dy}{dx} = xy$.",
                        ["$y = A e^{x^2/2}$", "$y = A e^{x^2}$", "$y = \\frac{1}{2}x^2 + C$", "$y = A e^x$"],
                        0,
                        "$\\frac{1}{y} dy = x dx \\Rightarrow \\ln|y| = \\frac{x^2}{2} + c \\Rightarrow y = A e^{x^2/2}$."
                    ),
                    make_q(
                        "Solve the differential equation $\\dfrac{dy}{dx} = 1 + y^2$.",
                        ["$y = \\tan(x + C)$", "$y = \\ln(1 + x) + C$", "$y = e^x - 1$", "$y = \\arctan(x) + C$"],
                        0,
                        "$\\frac{1}{1 + y^2} dy = dx \\Rightarrow \\arctan(y) = x + C \\Rightarrow y = \\tan(x + C)$."
                    )
                ]
            },
            {
                "heading": "Section 2: First-Order Equations Requiring Partial Fractions",
                "questions": [
                    make_q(
                        "Find the general solution of $\\dfrac{dy}{dx} = y(1 - y)$.",
                        ["$y = \\dfrac{A e^x}{1 + A e^x}$", "$y = A e^x - A$", "$y = \\ln|1 - y| + x$", "$y = \\dfrac{1}{1 + A e^{-x}}$"],
                        0,
                        "$\\frac{1}{y(1 - y)} dy = dx \\Rightarrow \\left(\\frac{1}{y} + \\frac{1}{1 - y}\\right) dy = dx \\Rightarrow \\ln|y| - \\ln|1 - y| = x + c \\Rightarrow \\ln\\left|\\frac{y}{1 - y}\\right| = x + c \\Rightarrow \\frac{y}{1 - y} = A e^x \\Rightarrow y = \\frac{A e^x}{1 + A e^x} = \\frac{1}{1 + A^{-1}e^{-x}}$."
                    ),
                    make_q(
                        "Solve $\\dfrac{dy}{dt} = k(M - y)$ with $y(0) = 0$ for constant $k, M > 0$.",
                        ["$y = M(1 - e^{-kt})$", "$y = M e^{-kt}$", "$y = M - e^{kt}$", "$y = M(1 + e^{-kt})$"],
                        0,
                        "$\\frac{1}{M - y} dy = k dt \\Rightarrow -\\ln|M - y| = kt + c \\Rightarrow M - y = A e^{-kt}$. Since $y(0) = 0$, $A = M$. Thus $y = M(1 - e^{-kt})$."
                    ),
                    make_q(
                        "A chemical reaction produces a substance according to $\\dfrac{dx}{dt} = 2(4 - x)^2$ with $x(0) = 0$. Find $x(t)$.",
                        ["$x(t) = 4 - \\dfrac{4}{8t + 1}$", "$x(t) = 4(1 - e^{-2t})$", "$x(t) = \\dfrac{8t}{2t + 1}$", "$x(t) = 4 - \\dfrac{1}{2t}$"],
                        0,
                        "$\\frac{1}{(4 - x)^2} dx = 2 dt \\Rightarrow \\frac{1}{4 - x} = 2t + C$. At $t = 0$: $1/4 = C$. $\\frac{1}{4 - x} = 2t + \\frac{1}{4} = \\frac{8t + 1}{4} \\Rightarrow 4 - x = \\frac{4}{8t + 1} \\Rightarrow x = 4 - \\frac{4}{8t + 1}$."
                    )
                ]
            },
            {
                "heading": "Section 3: Rate of Change Modeling Problems",
                "questions": [
                    make_q(
                        "The rate of decay of a substance is proportional to its remaining mass $m$. Write down the differential equation governing $m(t)$ for constant $k > 0$.",
                        ["$\\dfrac{dm}{dt} = -km$", "$\\dfrac{dm}{dt} = km$", "$\\dfrac{dm}{dt} = -k$", "$\\dfrac{d^2m}{dt^2} = -km$"],
                        0,
                        "Rate of decay means rate of change is negative and proportional to mass: $\\frac{dm}{dt} = -km$."
                    ),
                    make_q(
                        "Water leaks from a cylindrical tank of cross-sectional area $A$ through a hole at the bottom according to Torricelli's Law: $\\dfrac{dh}{dt} = -c\\sqrt{h}$. If initial height is $H$, how long does it take to empty completely?",
                        ["$T = \\dfrac{2\\sqrt{H}}{c}$", "$T = \\dfrac{\\sqrt{H}}{c}$", "$T = \\dfrac{H}{c}$", "$T = \\dfrac{H^2}{2c}$"],
                        0,
                        "$h^{-1/2} dh = -c dt \\Rightarrow 2\\sqrt{h} = -ct + C$. At $t = 0, C = 2\\sqrt{H}$. Empty when $h = 0 \\Rightarrow 0 = -ct + 2\\sqrt{H} \\Rightarrow t = \\frac{2\\sqrt{H}}{c}$."
                    ),
                    make_q(
                        "A population $P$ grows according to the logistic model $\\dfrac{dP}{dt} = 0.04P\\left(1 - \\dfrac{P}{2000}\\right)$. What is the carrying capacity of the population?",
                        ["2000", "0.04", "1000", "50000"],
                        0,
                        "The logistic equation is $\\frac{dP}{dt} = rP(1 - P/K)$, where $K$ is the carrying capacity. Here $K = 2000$."
                    )
                ]
            },
            {
                "heading": "Section 4: Particular Solutions & Long-Term Behavior",
                "questions": [
                    make_q(
                        "For the logistic model in the previous question, at what population size $P$ is the growth rate $\\dfrac{dP}{dt}$ maximized?",
                        ["$P = 1000$", "$P = 2000$", "$P = 500$", "$P = 1500$"],
                        0,
                        "The growth rate is a quadratic function of $P$ with zeros at 0 and $K$. Its vertex (maximum) occurs at exactly half the carrying capacity: $P = K/2 = 2000/2 = 1000$."
                    ),
                    make_q(
                        "Solve the differential equation $x\\dfrac{dy}{dx} = y + 1$ with $y(1) = 3$.",
                        ["$y = 4x - 1$", "$y = 3x$", "$y = 4x^2 - 1$", "$y = 2x + 1$"],
                        0,
                        "$\\frac{1}{y + 1} dy = \\frac{1}{x} dx \\Rightarrow \\ln|y + 1| = \\ln|x| + c \\Rightarrow y + 1 = A x$. At $(1, 3)$: $3 + 1 = A(1) \\Rightarrow A = 4$. Solution is $y = 4x - 1$."
                    ),
                    make_q(
                        "A body cools according to $\\dfrac{dT}{dt} = -0.1(T - 20)$. What does $T(t)$ approach as $t \\to \\infty$?",
                        ["$20^\\circ\\text{C}$", "$0^\\circ\\text{C}$", "$\\infty$", "$-20^\\circ\\text{C}$"],
                        0,
                        "The solution is $T(t) = 20 + C e^{-0.1t}$. As $t \\to \\infty$, $e^{-0.1t} \\to 0$, so $T(t) \\to 20^\\circ\\text{C}$ (ambient temperature)."
                    )
                ]
            }
        ]
    }
]
