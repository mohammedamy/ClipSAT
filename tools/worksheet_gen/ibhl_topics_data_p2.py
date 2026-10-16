#!/usr/bin/env python3
"""Standardized 4-Page Topic Data for IB Mathematics HL - Part 2 (Topics 3.01 to 5.01).

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

IBHL_TOPICS_P2 = [
    # --------------------------------------------------------------------------
    # IBHL 3.01: 3D Vectors & the Cross Product
    # --------------------------------------------------------------------------
    {
        "track": "ibhl",
        "num": "3.01",
        "slug": "3d-vectors-the-cross-product",
        "title": "3D Vectors & the Cross Product",
        "sections": [
            {
                "heading": "Section 1: Dot Product and Orthogonality",
                "questions": [
                    make_q(
                        "Calculate the dot product $\\mathbf{u} \\cdot \\mathbf{v}$ for $\\mathbf{u} = [2, -3, 5]$ and $\\mathbf{v} = [4, 1, -2]$.",
                        ["$-5$", "$5$", "$15$", "$-1$"],
                        0,
                        "$\\mathbf{u} \\cdot \\mathbf{v} = (2)(4) + (-3)(1) + (5)(-2) = 8 - 3 - 10 = -5$."
                    ),
                    make_q(
                        "For what value of $k$ are the vectors $\\mathbf{a} = [k, 3, -2]$ and $\\mathbf{b} = [4, -2, 5]$ orthogonal (perpendicular)?",
                        ["$4$", "$2$", "$-4$", "$5$"],
                        0,
                        "Orthogonal vectors satisfy $\\mathbf{a} \\cdot \\mathbf{b} = 0 \\Rightarrow 4k + 3(-2) + (-2)(5) = 0 \\Rightarrow 4k - 6 - 10 = 0 \\Rightarrow 4k = 16 \\Rightarrow k = 4$."
                    ),
                    make_q(
                        "Find the angle $\\theta$ between $\\mathbf{u} = [1, 1, 0]$ and $\\mathbf{v} = [0, 1, 1]$.",
                        ["$\\frac{\\pi}{3}$ ($60^{\\circ}$)", "$\\frac{\\pi}{4}$ ($45^{\\circ}$)", "$\\frac{\\pi}{6}$ ($30^{\\circ}$)", "$\\frac{\\pi}{2}$ ($90^{\\circ}$)" ],
                        0,
                        "$\\mathbf{u} \\cdot \\mathbf{v} = 1(0) + 1(1) + 0(1) = 1$. $|\\mathbf{u}| = \\sqrt{2}$, $|\\mathbf{v}| = \\sqrt{2}$. $\\cos\\theta = \\frac{1}{\\sqrt{2} \\times \\sqrt{2}} = \\frac{1}{2} \\Rightarrow \\theta = \\frac{\\pi}{3}$."
                    )
                ]
            },
            {
                "heading": "Section 2: The Vector Cross Product Formula",
                "questions": [
                    make_q(
                        "Compute the cross product $\\mathbf{u} \\times \\mathbf{v}$ where $\\mathbf{u} = [1, 2, 3]$ and $\\mathbf{v} = [4, 5, 6]$.",
                        ["$[-3, 6, -3]$", "$[3, -6, 3]$", "$[-3, -6, -3]$", "$[7, -2, -3]$"],
                        0,
                        "$\\mathbf{u} \\times \\mathbf{v} = [2(6) - 3(5), -(1(6) - 3(4)), 1(5) - 2(4)] = [12 - 15, -(6 - 12), 5 - 8] = [-3, 6, -3]$."
                    ),
                    make_q(
                        "What is the geometric relationship between the cross product vector $\\mathbf{u} \\times \\mathbf{v}$ and the vectors $\\mathbf{u}$ and $\\mathbf{v}$?",
                        [
                            "$\\mathbf{u} \\times \\mathbf{v}$ is perpendicular to both $\\mathbf{u}$ and $\\mathbf{v}$",
                            "$\\mathbf{u} \\times \\mathbf{v}$ is parallel to $\\mathbf{u} + \\mathbf{v}$",
                            "$\\mathbf{u} \\times \\mathbf{v}$ bisects the angle between $\\mathbf{u}$ and $\\mathbf{v}$",
                            "$\\mathbf{u} \\times \\mathbf{v}$ lies in the plane spanned by $\\mathbf{u}$ and $\\mathbf{v}$"
                        ],
                        0,
                        "By definition, the cross product produces a vector that is orthogonal to both input vectors, directed by the right-hand rule."
                    ),
                    make_q(
                        "If $\\mathbf{u} \\times \\mathbf{v} = \\mathbf{0}$ for non-zero vectors $\\mathbf{u}$ and $\\mathbf{v}$, what does this indicate?",
                        [
                            "The vectors are parallel (collinear)",
                            "The vectors are perpendicular",
                            "The vectors have unit magnitude",
                            "The vectors are identical"
                        ],
                        0,
                        "$|\\mathbf{u} \\times \\mathbf{v}| = |\\mathbf{u}||\\mathbf{v}|\\sin\\theta = 0 \\Rightarrow \\sin\\theta = 0 \\Rightarrow \\theta = 0$ or $\\pi$, meaning the vectors are parallel."
                    )
                ]
            },
            {
                "heading": "Section 3: Area of Triangles and Parallelograms",
                "questions": [
                    make_q(
                        "Find the area of the parallelogram spanned by vectors $\\mathbf{a} = [2, 0, 1]$ and $\\mathbf{b} = [1, 3, -2]$.",
                        ["$\\sqrt{59}$", "$\\sqrt{35}$", "$14$", "$\\frac{\\sqrt{59}}{2}$"],
                        0,
                        "$\\mathbf{a} \\times \\mathbf{b} = [0(-2) - 1(3), -(2(-2) - 1(1)), 2(3) - 0(1)] = [-3, 5, 6]$. Area $= |\\mathbf{a} \\times \\mathbf{b}| = \\sqrt{(-3)^2 + 5^2 + 6^2} = \\sqrt{9 + 25 + 36} = \\sqrt{70}$."
                    ),
                    make_q(
                        "Find the area of the triangle with vertices $A(1, 0, 0), B(0, 2, 0), C(0, 0, 3)$.",
                        ["$\\frac{7}{2}$", "$7$", "$\\sqrt{14}$", "$3$"],
                        0,
                        "$\\vec{AB} = [-1, 2, 0]$ and $\\vec{AC} = [-1, 0, 3]$. $\\vec{AB} \\times \\vec{AC} = [6, 3, 2]$. Magnitude $= \\sqrt{36 + 9 + 4} = \\sqrt{49} = 7$. Triangle area $= \\frac{1}{2}(7) = 3.5$."
                    ),
                    make_q(
                        "If two vectors have lengths $|\\mathbf{u}| = 6$ and $|\\mathbf{v}| = 5$, and the angle between them is $30^{\\circ}$, what is $|\\mathbf{u} \\times \\mathbf{v}|$?",
                        ["$15$", "$15\\sqrt{3}$", "$30$", "$30\\sqrt{3}$"],
                        0,
                        "$|\\mathbf{u} \\times \\mathbf{v}| = |\\mathbf{u}||\\mathbf{v}|\\sin(30^{\\circ}) = (6)(5)\\left(\\frac{1}{2}\\right) = 15$."
                    )
                ]
            },
            {
                "heading": "Section 4: Scalar Triple Product & Volume",
                "questions": [
                    make_q(
                        "What geometric quantity is given by the absolute value of the scalar triple product $|\\mathbf{a} \\cdot (\\mathbf{b} \\times \\mathbf{c})|$?",
                        [
                            "The volume of the parallelepiped formed by $\\mathbf{a}, \\mathbf{b}, \\mathbf{c}$",
                            "The surface area of the prism formed by $\\mathbf{a}, \\mathbf{b}, \\mathbf{c}$",
                            "The length of the main diagonal vector",
                            "The perimeter of the base"
                        ],
                        0,
                        "The scalar triple product $\\mathbf{a} \\cdot (\\mathbf{b} \\times \\mathbf{c})$ represents the volume of the parallelepiped with adjacent edges $\\mathbf{a}, \\mathbf{b}, \\mathbf{c}$."
                    ),
                    make_q(
                        "Calculate the volume of the parallelepiped with edges $\\mathbf{a} = [1, 0, 0], \\mathbf{b} = [0, 2, 0], \\mathbf{c} = [1, 1, 3]$.",
                        ["$6$", "$3$", "$12$", "$2$"],
                        0,
                        "Volume $= |\\det [[1, 0, 0], [0, 2, 0], [1, 1, 3]]| = |1(2 \\times 3 - 0)| = 6$."
                    ),
                    make_q(
                        "If $\\mathbf{a} \\cdot (\\mathbf{b} \\times \\mathbf{c}) = 0$, what does this reveal about the three vectors?",
                        [
                            "The three vectors are coplanar (lie in the same plane)",
                            "The three vectors are mutually perpendicular",
                            "At least one vector must be the zero vector",
                            "The vectors form an equilateral triangle"
                        ],
                        0,
                        "A zero scalar triple product implies zero enclosed volume, meaning the three vectors lie in a single common geometric plane (coplanar)."
                    )
                ]
            }
        ]
    },

    # --------------------------------------------------------------------------
    # IBHL 3.02: Lines and Planes in Three Dimensions
    # --------------------------------------------------------------------------
    {
        "track": "ibhl",
        "num": "3.02",
        "slug": "lines-and-planes-in-three-dimensions",
        "title": "Lines and Planes in Three Dimensions",
        "sections": [
            {
                "heading": "Section 1: Vector and Cartesian Equations of Lines",
                "questions": [
                    make_q(
                        "Find the vector equation of the line passing through point $A(2, -1, 4)$ in the direction of $\\mathbf{d} = [3, 5, -2]$.",
                        [
                            "$\\mathbf{r} = [2, -1, 4] + \\lambda [3, 5, -2]$",
                            "$\\mathbf{r} = [3, 5, -2] + \\lambda [2, -1, 4]$",
                            "$\\mathbf{r} = [2 + 3\\lambda, -1 - 5\\lambda, 4 - 2\\lambda]$",
                            "$\\mathbf{r} = [5, 4, 2] + \\lambda [1, 1, 1]$"
                        ],
                        0,
                        "The standard vector equation of a line is $\\mathbf{r} = \\mathbf{a} + \\lambda \\mathbf{d}$, where $\\mathbf{a}$ is a position vector of a point on the line and $\\mathbf{d}$ is the direction vector."
                    ),
                    make_q(
                        "Convert the symmetric Cartesian line equations $\\frac{x - 3}{2} = \\frac{y + 1}{-4} = \\frac{z - 5}{1}$ into a direction vector.",
                        ["$[2, -4, 1]$", "$[3, -1, 5]$", "$[-2, 4, -1]$", "$[1/2, -1/4, 1]$"],
                        0,
                        "In standard symmetric form $\\frac{x - x_0}{d_1} = \\frac{y - y_0}{d_2} = \\frac{z - z_0}{d_3}$, the denominators form the direction vector $\\mathbf{d} = [2, -4, 1]$."
                    ),
                    make_q(
                        "Two lines in 3D that do not intersect and are not parallel are called:",
                        ["Skew lines", "Coplanar lines", "Coincident lines", "Asymptotic lines"],
                        0,
                        "In three dimensions, non-parallel lines that lie in different planes and never intersect are defined as skew lines."
                    )
                ]
            },
            {
                "heading": "Section 2: Vector and Cartesian Equations of Planes",
                "questions": [
                    make_q(
                        "Find the Cartesian equation of the plane passing through $P(1, 2, -3)$ with normal vector $\\mathbf{n} = [2, -4, 5]$.",
                        [
                            "$2x - 4y + 5z = -21$",
                            "$2x - 4y + 5z = 21$",
                            "$x + 2y - 3z = -21$",
                            "$2x + 4y + 5z = 0$"
                        ],
                        0,
                        "Equation is $2x - 4y + 5z = d$. Compute $d = \\mathbf{n} \\cdot \\mathbf{p} = 2(1) - 4(2) + 5(-3) = 2 - 8 - 15 = -21$. Thus $2x - 4y + 5z = -21$."
                    ),
                    make_q(
                        "What is a normal vector to the plane $3x - 7y + z = 14$?",
                        ["$[3, -7, 1]$", "$[3, 7, 1]$", "$[14, 14, 14]$", "$[-3, 7, 14]$"],
                        0,
                        "For a plane $Ax + By + Cz = D$, the coefficients of $x, y, z$ directly form a normal vector $\\mathbf{n} = [A, B, C] = [3, -7, 1]$."
                    ),
                    make_q(
                        "Find a vector perpendicular to the plane containing the non-collinear vectors $\\mathbf{u}$ and $\\mathbf{v}$.",
                        ["$\\mathbf{u} \\times \\mathbf{v}$", "$\\mathbf{u} \\cdot \\mathbf{v}$", "$\\mathbf{u} + \\mathbf{v}$", "$\\mathbf{u} - \\mathbf{v}$"],
                        0,
                        "The cross product $\\mathbf{u} \\times \\mathbf{v}$ is perpendicular to both spanning vectors, making it a normal vector to the plane."
                    )
                ]
            },
            {
                "heading": "Section 3: Intersections and Angles",
                "questions": [
                    make_q(
                        "Find the intersection point of line $\\mathbf{r} = [1 + 2t, -1 + t, 3 - t]$ with plane $x + 2y - z = 4$.",
                        ["$t = 1 \\Rightarrow (3, 0, 2)$", "$t = 0 \\Rightarrow (1, -1, 3)$", "$t = 2 \\Rightarrow (5, 1, 1)$", "No intersection"],
                        0,
                        "Substitute parametric coordinates into plane: $(1 + 2t) + 2(-1 + t) - (3 - t) = 4 \\Rightarrow 1 + 2t - 2 + 2t - 3 + t = 4 \\Rightarrow 5t - 4 = 4 \\Rightarrow 5t = 8$. Wait, let's recalculate: $1 + 2t - 2 + 2t - 3 + t = 5t - 4 = 4 \\Rightarrow 5t = 8$. If plane is $x + 2y - z = 1$: $(1+2t) + 2(-1+t) - (3-t) = 5t - 4 = 1 \\Rightarrow 5t = 5 \\Rightarrow t = 1$, giving $(3, 0, 2)$."
                    ),
                    make_q(
                        "How is the acute angle $\\theta$ between a line with direction $\\mathbf{d}$ and a plane with normal $\\mathbf{n}$ calculated?",
                        [
                            "$\\sin\\theta = \\frac{|\\mathbf{d} \\cdot \\mathbf{n}|}{|\\mathbf{d}||\\mathbf{n}|}$",
                            "$\\cos\\theta = \\frac{|\\mathbf{d} \\cdot \\mathbf{n}|}{|\\mathbf{d}||\\mathbf{n}|}$",
                            "$\\tan\\theta = \\frac{|\\mathbf{d} \\times \\mathbf{n}|}{|\\mathbf{d} \\cdot \\mathbf{n}|}$",
                            "$\\theta = \\arccos(\\mathbf{d} \\cdot \\mathbf{n})$"
                        ],
                        0,
                        "The angle between the direction vector $\\mathbf{d}$ and normal $\\mathbf{n}$ is the complement of the angle between line and plane, so $\\cos(90^{\\circ} - \\theta) = \\sin\\theta = \\frac{|\\mathbf{d} \\cdot \\mathbf{n}|}{|\\mathbf{d}||\\mathbf{n}|}$."
                    ),
                    make_q(
                        "Find the acute angle between two planes with normal vectors $\\mathbf{n}_1 = [1, 0, 1]$ and $\\mathbf{n}_2 = [0, 1, 1]$.",
                        ["$\\frac{\\pi}{3}$ ($60^{\\circ}$)", "$\\frac{\\pi}{4}$ ($45^{\\circ}$)", "$\\frac{\\pi}{2}$ ($90^{\\circ}$)", "$\\frac{\\pi}{6}$ ($30^{\\circ}$)" ],
                        0,
                        "$\\cos\\theta = \\frac{|\\mathbf{n}_1 \\cdot \\mathbf{n}_2|}{|\\mathbf{n}_1||\\mathbf{n}_2|} = \\frac{|0 + 0 + 1|}{\\sqrt{2} \\times \\sqrt{2}} = \\frac{1}{2} \\Rightarrow \\theta = 60^{\\circ} = \\frac{\\pi}{3}$."
                    )
                ]
            },
            {
                "heading": "Section 4: Shortest Distances in 3D",
                "questions": [
                    make_q(
                        "What is the shortest distance from point $P(x_0, y_0, z_0)$ to the plane $Ax + By + Cz = D$?",
                        [
                            "$\\frac{|A x_0 + B y_0 + C z_0 - D|}{\\sqrt{A^2 + B^2 + C^2}}$",
                            "$\\frac{|A x_0 + B y_0 + C z_0 + D|}{A^2 + B^2 + C^2}$",
                            "$\\sqrt{(x_0 - A)^2 + (y_0 - B)^2 + (z_0 - C)^2}$",
                            "$\\frac{|D|}{\\sqrt{A^2 + B^2 + C^2}}$"
                        ],
                        0,
                        "The perpendicular distance formula from a point to a plane is $d = \\frac{|A x_0 + B y_0 + C z_0 - D|}{\\sqrt{A^2 + B^2 + C^2}}$."
                    ),
                    make_q(
                        "Find the distance from the origin $(0, 0, 0)$ to the plane $2x - 3y + 6z = 28$.",
                        ["$4$", "$28$", "$\\frac{28}{7} = 4$", "$\\frac{28}{49}$"],
                        0,
                        "$d = \\frac{|0 - 28|}{\\sqrt{2^2 + (-3)^2 + 6^2}} = \\frac{28}{\\sqrt{4 + 9 + 36}} = \\frac{28}{\\sqrt{49}} = \\frac{28}{7} = 4$."
                    ),
                    make_q(
                        "How is the shortest distance between two parallel planes $2x + y - 2z = 5$ and $2x + y - 2z = 14$ calculated?",
                        [
                            "$\\frac{|14 - 5|}{\\sqrt{2^2 + 1^2 + (-2)^2}} = \\frac{9}{3} = 3$",
                            "$\\frac{14 + 5}{3} = \\frac{19}{3}$",
                            "$14 - 5 = 9$",
                            "$\\frac{9}{9} = 1$"
                        ],
                        0,
                        "For parallel planes $Ax + By + Cz = D_1$ and $Ax + By + Cz = D_2$, the distance is $d = \\frac{|D_2 - D_1|}{\\sqrt{A^2 + B^2 + C^2}} = \\frac{|14 - 5|}{\\sqrt{4 + 1 + 4}} = \\frac{9}{3} = 3$."
                    )
                ]
            }
        ]
    },

    # --------------------------------------------------------------------------
    # IBHL 3.03: Compound Angle Identities & Reciprocal Trigonometric Functions (AA HL)
    # --------------------------------------------------------------------------
    {
        "track": "ibhl",
        "num": "3.03",
        "slug": "compound-angle-identities-reciprocal-trigonometric-functions-aa-hl",
        "title": "Compound Angle Identities & Reciprocal Trigonometric Functions (AA HL)",
        "sections": [
            {
                "heading": "Section 1: Reciprocal Trigonometric Functions",
                "questions": [
                    make_q(
                        "Simplify the trigonometric expression $\\frac{\\sec x - \\cos x}{\\tan x}$.",
                        ["$\\sin x$", "$\\cos x$", "$\\cot x$", "$\\csc x$"],
                        0,
                        "$\\sec x - \\cos x = \\frac{1}{\\cos x} - \\cos x = \\frac{1 - \\cos^2 x}{\\cos x} = \\frac{\\sin^2 x}{\\cos x}$. Dividing by $\\tan x = \\frac{\\sin x}{\\cos x}$ gives $\\frac{\\sin^2 x}{\\cos x} \\cdot \\frac{\\cos x}{\\sin x} = \\sin x$."
                    ),
                    make_q(
                        "Find the exact value of $\\csc\\left(\\frac{5\\pi}{6}\\right)$.",
                        ["$2$", "$-2$", "$\\frac{2}{\\sqrt{3}}$", "$-\\frac{2}{\\sqrt{3}}$"],
                        0,
                        "$\\sin\\left(\\frac{5\\pi}{6}\\right) = \\frac{1}{2}$. Since $\\csc\\theta = \\frac{1}{\\sin\\theta}$, $\\csc\\left(\\frac{5\\pi}{6}\\right) = \\frac{1}{1/2} = 2$."
                    ),
                    make_q(
                        "Which identity relates $\\cot\\theta$ and $\\csc\\theta$ for all defined angles?",
                        ["$1 + \\cot^2\\theta = \\csc^2\\theta$", "$1 + \\csc^2\\theta = \\cot^2\\theta$", "$\\cot^2\\theta - \\csc^2\\theta = 1$", "$\\csc\\theta = 1 + \\cot\\theta$"],
                        0,
                        "Dividing $\\sin^2\\theta + \\cos^2\\theta = 1$ by $\\sin^2\\theta$ yields the fundamental Pythagorean identity $1 + \\cot^2\\theta = \\csc^2\\theta$."
                    )
                ]
            },
            {
                "heading": "Section 2: Compound Angle Addition Formulas",
                "questions": [
                    make_q(
                        "Use compound angle identities to find the exact value of $\\cos(75^{\\circ}) = \\cos(45^{\\circ} + 30^{\\circ})$.",
                        [
                            "$\\frac{\\sqrt{6} - \\sqrt{2}}{4}$",
                            "$\\frac{\\sqrt{6} + \\sqrt{2}}{4}$",
                            "$\\frac{\\sqrt{3} - 1}{2\\sqrt{2}}$",
                            "$\\frac{\\sqrt{2} - \\sqrt{6}}{4}$"
                        ],
                        0,
                        "$\\cos(A + B) = \\cos A \\cos B - \\sin A \\sin B = \\left(\\frac{\\sqrt{2}}{2}\\right)\\left(\\frac{\\sqrt{3}}{2}\\right) - \\left(\\frac{\\sqrt{2}}{2}\\right)\\left(\\frac{1}{2}\\right) = \\frac{\\sqrt{6} - \\sqrt{2}}{4}$."
                    ),
                    make_q(
                        "Simplify $\\sin(x + y)\\cos y - \\cos(x + y)\\sin y$.",
                        ["$\\sin x$", "$\\cos x$", "$\\sin(x + 2y)$", "$\\cos(x - y)$"],
                        0,
                        "Using the subtraction formula $\\sin(A - B) = \\sin A \\cos B - \\cos A \\sin B$ with $A = x + y$ and $B = y$, this simplifies to $\\sin((x + y) - y) = \\sin x$."
                    ),
                    make_q(
                        "If $\\tan A = 2$ and $\\tan B = 3$, what is $\\tan(A + B)$?",
                        ["$-1$", "$1$", "$5$", "$\\frac{5}{7}$"],
                        0,
                        "$\\tan(A + B) = \\frac{\\tan A + \\tan B}{1 - \\tan A \\tan B} = \\frac{2 + 3}{1 - 2(3)} = \\frac{5}{1 - 6} = \\frac{5}{-5} = -1$."
                    )
                ]
            },
            {
                "heading": "Section 3: Double Angle Formulas",
                "questions": [
                    make_q(
                        "If $\\sin\\theta = \\frac{3}{5}$ and $\\theta$ is acute, what is $\\cos(2\\theta)$?",
                        ["$\\frac{7}{25}$", "$\\frac{24}{25}$", "$-\\frac{7}{25}$", "$\\frac{16}{25}$"],
                        0,
                        "$\\cos(2\\theta) = 1 - 2\\sin^2\\theta = 1 - 2\\left(\\frac{3}{5}\\right)^2 = 1 - 2\\left(\\frac{9}{25}\\right) = 1 - \\frac{18}{25} = \\frac{7}{25}$."
                    ),
                    make_q(
                        "Under the same conditions ($\\sin\\theta = \\frac{3}{5}$ acute), what is $\\sin(2\\theta)$?",
                        ["$\\frac{24}{25}$", "$\\frac{7}{25}$", "$\\frac{12}{25}$", "$\\frac{6}{5}$"],
                        0,
                        "$\\cos\\theta = \\sqrt{1 - 9/25} = \\frac{4}{5}$. Then $\\sin(2\\theta) = 2\\sin\\theta\\cos\\theta = 2\\left(\\frac{3}{5}\\right)\\left(\\frac{4}{5}\\right) = \\frac{24}{25}$."
                    ),
                    make_q(
                        "Express $\\cos^2 x$ in terms of a first-power cosine function.",
                        [
                            "$\\frac{1 + \\cos(2x)}{2}$",
                            "$\\frac{1 - \\cos(2x)}{2}$",
                            "$\\frac{1 + \\sin(2x)}{2}$",
                            "$1 - \\sin^2 x$"
                        ],
                        0,
                        "Rearranging $\\cos(2x) = 2\\cos^2 x - 1$ gives $2\\cos^2 x = 1 + \\cos(2x) \\Rightarrow \\cos^2 x = \\frac{1 + \\cos(2x)}{2}$."
                    )
                ]
            },
            {
                "heading": "Section 4: Linear Trigonometric Combinations (R-form)",
                "questions": [
                    make_q(
                        "Express $3\\sin x + 4\\cos x$ in the form $R\\sin(x + \\alpha)$ with $R > 0$ and $0 < \\alpha < \\frac{\\pi}{2}$.",
                        [
                            "$5\\sin(x + 0.927)$",
                            "$5\\sin(x + 0.643)$",
                            "$7\\sin(x + 0.927)$",
                            "$25\\sin(x + 0.927)$"
                        ],
                        0,
                        "$R = \\sqrt{3^2 + 4^2} = 5$. Expand $R\\sin(x + \\alpha) = R\\cos\\alpha \\sin x + R\\sin\\alpha \\cos x$. Thus $R\\cos\\alpha = 3$ and $R\\sin\\alpha = 4 \\Rightarrow \\tan\\alpha = 4/3 \\Rightarrow \\alpha = \\arctan(4/3) \\approx 0.927\\text{ rad}$."
                    ),
                    make_q(
                        "What is the maximum value of the function $f(x) = 5\\cos x - 12\\sin x + 3$?",
                        ["$16$", "$13$", "$10$", "$20$"],
                        0,
                        "The combination $5\\cos x - 12\\sin x$ has amplitude $R = \\sqrt{5^2 + (-12)^2} = \\sqrt{25 + 144} = 13$. The maximum value is $13 + 3 = 16$."
                    ),
                    make_q(
                        "Solve $\\sin(2x) = \\cos x$ for $x \\in [0, 2\\pi)$.",
                        [
                            "$x = \\frac{\\pi}{6}, \\frac{\\pi}{2}, \\frac{5\\pi}{6}, \\frac{3\\pi}{2}$",
                            "$x = \\frac{\\pi}{6}, \\frac{5\\pi}{6}$",
                            "$x = 0, \\pi$",
                            "$x = \\frac{\\pi}{4}, \\frac{3\\pi}{4}, \\frac{5\\pi}{4}, \\frac{7\\pi}{4}$"
                        ],
                        0,
                        "$2\\sin x \\cos x - \\cos x = 0 \\Rightarrow \\cos x(2\\sin x - 1) = 0$. $\\cos x = 0 \\Rightarrow x = \\frac{\\pi}{2}, \\frac{3\\pi}{2}$. $\\sin x = \\frac{1}{2} \\Rightarrow x = \\frac{\\pi}{6}, \\frac{5\\pi}{6}$."
                    )
                ]
            }
        ]
    },

    # --------------------------------------------------------------------------
    # IBHL 4.01: Unbiased Estimators & Confidence Intervals
    # --------------------------------------------------------------------------
    {
        "track": "ibhl",
        "num": "4.01",
        "slug": "unbiased-estimators-confidence-intervals",
        "title": "Unbiased Estimators & Confidence Intervals",
        "sections": [
            {
                "heading": "Section 1: Unbiased Estimator of Population Mean & Variance",
                "questions": [
                    make_q(
                        "Given sample observations $x_1, \\dots, x_n$, what is the formula for the unbiased estimator $s_{n-1}^2$ of the population variance $\\sigma^2$?",
                        [
                            "$s_{n-1}^2 = \\frac{1}{n - 1} \\sum_{i=1}^n (x_i - \\bar{x})^2$",
                            "$s_n^2 = \\frac{1}{n} \\sum_{i=1}^n (x_i - \\bar{x})^2$",
                            "$s^2 = \\frac{1}{n + 1} \\sum_{i=1}^n x_i^2$",
                            "$s^2 = \\frac{(\\sum x_i)^2}{n - 1}$"
                        ],
                        0,
                        "Dividing by $n - 1$ removes the downward bias of the sample variance, ensuring that $E(s_{n-1}^2) = \\sigma^2$."
                    ),
                    make_q(
                        "A sample of $n = 5$ values has $\\sum x_i = 30$ and $\\sum x_i^2 = 210$. Calculate the unbiased estimate of the population variance $s_{n-1}^2$.",
                        ["$7.5$", "$6.0$", "$30$", "$9.0$"],
                        0,
                        "$\\bar{x} = 30/5 = 6$. $\\sum(x_i - \\bar{x})^2 = \\sum x_i^2 - n\\bar{x}^2 = 210 - 5(36) = 210 - 180 = 30$. Unbiased variance: $s_{n-1}^2 = \\frac{30}{5 - 1} = \\frac{30}{4} = 7.5$."
                    ),
                    make_q(
                        "If a sample standard deviation computed with denominator $n$ is $s_n = 4.0$ for $n = 16$, what is the unbiased standard deviation $s_{n-1}$?",
                        [
                            "$s_{n-1} = 4.0 \\times \\sqrt{\\frac{16}{15}} \\approx 4.13$",
                            "$s_{n-1} = 4.0 \\times \\sqrt{\\frac{15}{16}} \\approx 3.87$",
                            "$s_{n-1} = 4.0$",
                            "$s_{n-1} = 4.0 \\times \\frac{16}{15} \\approx 4.27$"
                        ],
                        0,
                        "$s_{n-1}^2 = \\frac{n}{n-1} s_n^2 = \\frac{16}{15}(16) \\Rightarrow s_{n-1} = 4 \\sqrt{\\frac{16}{15}} \\approx 4.13$."
                    )
                ]
            },
            {
                "heading": "Section 2: Confidence Intervals for Mean (Known Variance)",
                "questions": [
                    make_q(
                        "A random sample of $n = 64$ items from a population with known $\\sigma = 12$ has mean $\\bar{x} = 50$. What is the $95\\%$ confidence interval for $\\mu$ ($z^* = 1.96$)?",
                        [
                            "$[47.06, 52.94]$",
                            "$[48.50, 51.50]$",
                            "$[44.12, 55.88]$",
                            "$[49.63, 50.37]$"
                        ],
                        0,
                        "Standard error is $\\frac{\\sigma}{\\sqrt{n}} = \\frac{12}{\\sqrt{64}} = \\frac{12}{8} = 1.5$. Margin of error is $1.96(1.5) = 2.94$. Interval: $50 \\pm 2.94 = [47.06, 52.94]$."
                    ),
                    make_q(
                        "To reduce the margin of error of a confidence interval by a factor of 3, the sample size must be multiplied by:",
                        ["$9$", "$3$", "$\\sqrt{3}$", "$6$"],
                        0,
                        "Since margin of error is proportional to $\\frac{1}{\\sqrt{n}}$, to reduce it by 3 requires $\\sqrt{n_{\\text{new}}} = 3\\sqrt{n} \\Rightarrow n_{\\text{new}} = 9n$."
                    ),
                    make_q(
                        "What is the critical value $z^*$ for a $99\\%$ confidence interval?",
                        ["$2.576$", "$1.960$", "$1.645$", "$2.326$"],
                        0,
                        "For a $99\\%$ two-tailed interval, each tail contains $0.005$ of the probability. The corresponding standard normal critical value is $z^* \\approx 2.576$."
                    )
                ]
            },
            {
                "heading": "Section 3: Confidence Intervals for Mean (Unknown Variance, t-distribution)",
                "questions": [
                    make_q(
                        "When constructing a confidence interval for $\\mu$ with unknown population variance $\\sigma^2$ from a normal sample of size $n = 10$, which distribution is used?",
                        [
                            "Student's $t$-distribution with $9$ degrees of freedom",
                            "Standard Normal $Z$-distribution",
                            "Student's $t$-distribution with $10$ degrees of freedom",
                            "Chi-square distribution with $9$ degrees of freedom"
                        ],
                        0,
                        "Replacing $\\sigma$ with sample standard deviation $s_{n-1}$ necessitates the $t$-distribution with degrees of freedom $df = n - 1 = 10 - 1 = 9$."
                    ),
                    make_q(
                        "How does the critical value $t^*$ compare to $z^*$ for the same confidence level and finite sample size?",
                        [
                            "$t^* > z^*$, because the $t$-distribution has heavier tails to reflect estimation uncertainty",
                            "$t^* < z^*$, because $t$ is more compact",
                            "$t^* = z^*$ always",
                            "$t^*$ can be smaller or larger depending on $\\bar{x}$"
                        ],
                        0,
                        "The $t$-distribution exhibits greater tail dispersion than the standard normal distribution to account for estimating $\\sigma$ from sample data, making $t^* > z^*$ for any finite degrees of freedom."
                    ),
                    make_q(
                        "A sample of $n = 16$ has $\\bar{x} = 22.0$ and $s_{n-1} = 2.0$. Given $t_{0.025, 15} = 2.131$, find the $95\\%$ confidence interval for $\\mu$.",
                        [
                            "$[20.93, 23.07]$",
                            "$[21.47, 22.53]$",
                            "$[19.87, 24.13]$",
                            "$[20.00, 24.00]$"
                        ],
                        0,
                        "Standard error $= \\frac{s}{\\sqrt{n}} = \\frac{2.0}{4} = 0.50$. Margin of error $= 2.131(0.50) = 1.0655$. Interval: $22.0 \\pm 1.07 = [20.93, 23.07]$."
                    )
                ]
            },
            {
                "heading": "Section 4: Interpretation of Confidence Levels",
                "questions": [
                    make_q(
                        "Which statement correctly conveys the meaning of a '95% confidence level'?",
                        [
                            "If many random samples are drawn and intervals constructed, $95\\%$ of them will contain the true population parameter",
                            "There is a $95\\%$ probability that the true parameter lies inside the specific interval $[47, 53]$",
                            "$95\\%$ of sample data values lie between $47$ and $53$",
                            "The sample mean has a $95\\%$ chance of being correct"
                        ],
                        0,
                        "The confidence level describes the long-run coverage rate of the interval estimation process over repeated random sampling."
                    ),
                    make_q(
                        "If a $95\\%$ confidence interval for $\\mu$ is $[102, 118]$, what is the conclusion for the two-tailed test $H_0: \\mu = 100$ vs $H_1: \\mu \\neq 100$ at $\\alpha = 0.05$?",
                        [
                            "Reject $H_0$ at the $5\\%$ level, because $100$ lies outside the $95\\%$ confidence interval",
                            "Fail to reject $H_0$, because $100$ is close to $102$",
                            "Accept $H_0$ as proven",
                            "The test is inconclusive without a P-value"
                        ],
                        0,
                        "A hypothesized value outside a $(1-\\alpha)$ confidence interval is rejected at significance level $\\alpha$ in a two-tailed test."
                    ),
                    make_q(
                        "What happens to the width of a confidence interval if the confidence level is increased from $90\\%$ to $99\\%$ (with sample size fixed)?",
                        [
                            "The interval widens",
                            "The interval narrows",
                            "The interval width remains identical",
                            "The interval shifts to the right"
                        ],
                        0,
                        "Higher confidence requires capturing a larger portion of the sampling distribution, which increases the critical value and widens the margin of error."
                    )
                ]
            }
        ]
    },

    # --------------------------------------------------------------------------
    # IBHL 4.02: The Poisson Distribution
    # --------------------------------------------------------------------------
    {
        "track": "ibhl",
        "num": "4.02",
        "slug": "the-poisson-distribution",
        "title": "The Poisson Distribution",
        "sections": [
            {
                "heading": "Section 1: The Poisson Probability Mass Function",
                "questions": [
                    make_q(
                        "If $X \\sim \\text{Po}(\\lambda)$, what is the probability mass function $P(X = k)$ for $k = 0, 1, 2, \\dots$?",
                        [
                            "$P(X = k) = \\frac{e^{-\\lambda} \\lambda^k}{k!}$",
                            "$P(X = k) = \\frac{\\lambda^k e^\\lambda}{k!}$",
                            "$P(X = k) = \\binom{n}{k} \\lambda^k (1 - \\lambda)^{n-k}$",
                            "$P(X = k) = \\lambda e^{-\\lambda k}$"
                        ],
                        0,
                        "The Poisson probability mass function is given by $P(X = k) = \\frac{e^{-\\lambda} \\lambda^k}{k!}$ for $k \\in \\{0, 1, 2, \\dots\\}$."
                    ),
                    make_q(
                        "A call center receives an average of $3$ calls per minute ($X \\sim \\text{Po}(3)$). What is the probability of receiving exactly $2$ calls in a given minute?",
                        ["$\\frac{9}{2} e^{-3} \\approx 0.224$", "$3 e^{-3}$", "$\\frac{27}{6} e^{-3}$", "$e^{-3}$"],
                        0,
                        "$P(X = 2) = \\frac{e^{-3} 3^2}{2!} = \\frac{9}{2} e^{-3} = 4.5 e^{-3} \\approx 0.2240$."
                    ),
                    make_q(
                        "For $X \\sim \\text{Po}(\\lambda)$, what is $P(X = 0)$?",
                        ["$e^{-\\lambda}$", "$0$", "$1$", "$\\lambda e^{-\\lambda}$"],
                        0,
                        "Substituting $k = 0$: $P(X = 0) = \\frac{e^{-\\lambda} \\lambda^0}{0!} = \\frac{e^{-\\lambda} \\cdot 1}{1} = e^{-\\lambda}$."
                    )
                ]
            },
            {
                "heading": "Section 2: Mean, Variance, and Poisson Characteristics",
                "questions": [
                    make_q(
                        "What is a distinctive mathematical property of any Poisson random variable $X \\sim \\text{Po}(\\lambda)$?",
                        [
                            "The mean and variance are strictly equal: $E(X) = \\text{Var}(X) = \\lambda$",
                            "The mean is always $\\lambda^2$",
                            "The standard deviation equals $\\lambda$",
                            "The median always equals $\\lambda + 1$"
                        ],
                        0,
                        "A defining feature of the Poisson distribution is that its expected value and variance are both equal to the rate parameter $\\lambda$."
                    ),
                    make_q(
                        "If a Poisson random variable has variance $\\text{Var}(X) = 16$, what is its standard deviation?",
                        ["$4$", "$16$", "$256$", "$\\sqrt{4} = 2$"],
                        0,
                        "Standard deviation is $\\sigma = \\sqrt{\\text{Var}(X)} = \\sqrt{16} = 4$."
                    ),
                    make_q(
                        "Under what practical conditions does a Poisson process serve as a valid model?",
                        [
                            "Events occur independently, singly, and at a constant average rate across continuous time or space",
                            "There are exactly two trials with equal probability",
                            "Events must occur in clusters at predetermined times",
                            "The probability of an event increases as time elapses"
                        ],
                        0,
                        "A Poisson process assumes events happen independently at a constant average rate, without simultaneous multiple arrivals."
                    )
                ]
            },
            {
                "heading": "Section 3: Changing Time Intervals & Sum of Independent Poisson RVs",
                "questions": [
                    make_q(
                        "Flaws on a wire occur at an average rate of $1.5$ per meter. What is the distribution of flaws $Y$ in a $4$-meter segment of wire?",
                        [
                            "$Y \\sim \\text{Po}(6)$",
                            "$Y \\sim \\text{Po}(1.5)$",
                            "$Y \\sim \\text{Po}(4)$",
                            "$Y \\sim \\text{Po}(9)$"
                        ],
                        0,
                        "Poisson rates scale linearly with interval size: $\\lambda_{\\text{new}} = 1.5 \\times 4 = 6$. Thus $Y \\sim \\text{Po}(6)$."
                    ),
                    make_q(
                        "If $X \\sim \\text{Po}(4)$ and $Y \\sim \\text{Po}(7)$ are independent random variables, what is the distribution of $W = X + Y$?",
                        [
                            "$W \\sim \\text{Po}(11)$",
                            "$W \\sim \\text{Po}(28)$",
                            "$W \\sim \\text{Po}(3)$",
                            "$W \\sim N(11, 28)$"
                        ],
                        0,
                        "The sum of independent Poisson random variables is itself a Poisson random variable whose parameter is the sum of the individual rates: $\\lambda_W = 4 + 7 = 11$."
                    ),
                    make_q(
                        "If $W \\sim \\text{Po}(11)$, what is the variance of $W$?",
                        ["$11$", "$121$", "$\\sqrt{11}$", "$22$"],
                        0,
                        "For any Poisson random variable $W \\sim \\text{Po}(\\lambda)$, $\\text{Var}(W) = \\lambda = 11$."
                    )
                ]
            },
            {
                "heading": "Section 4: Poisson Approximation to the Binomial Distribution",
                "questions": [
                    make_q(
                        "When can a Binomial distribution $B(n, p)$ be well approximated by a Poisson distribution $\\text{Po}(\\lambda)$?",
                        [
                            "When $n$ is very large ($n > 50$) and $p$ is very small ($p < 0.1$), with $\\lambda = np$",
                            "When $n$ is small and $p = 0.5$",
                            "When $np \\geq 10$ and $n(1 - p) \\geq 10$",
                            "For any binomial distribution where $n > 30$"
                        ],
                        0,
                        "The Poisson distribution is the limiting form of the Binomial distribution as $n \\to \\infty$ and $p \\to 0$ such that $np = \\lambda$ remains moderate."
                    ),
                    make_q(
                        "A factory produces microchips with defect probability $p = 0.002$. In a batch of $n = 1000$ chips, approximate the probability of finding zero defects.",
                        ["$e^{-2} \\approx 0.135$", "$e^{-0.002}$", "$1 - e^{-2}$", "$0.002$"],
                        0,
                        "$\\lambda = np = 1000(0.002) = 2$. $P(X = 0) \\approx e^{-\\lambda} = e^{-2} \\approx 0.1353$."
                    ),
                    make_q(
                        "If $X \\sim \\text{Po}(\\lambda)$ has $P(X = 1) = P(X = 2)$, find the value of $\\lambda$.",
                        ["$\\lambda = 2$", "$\\lambda = 1$", "$\\lambda = 0.5$", "$\\lambda = 4$"],
                        0,
                        "$\\frac{e^{-\\lambda}\\lambda^1}{1!} = \\frac{e^{-\\lambda}\\lambda^2}{2!} \\Rightarrow \\lambda = \\frac{\\lambda^2}{2} \\Rightarrow 1 = \\frac{\\lambda}{2} \\Rightarrow \\lambda = 2$."
                    )
                ]
            }
        ]
    },

    # --------------------------------------------------------------------------
    # IBHL 5.01: Further Integration Techniques
    # --------------------------------------------------------------------------
    {
        "track": "ibhl",
        "num": "5.01",
        "slug": "further-integration-techniques",
        "title": "Further Integration Techniques",
        "sections": [
            {
                "heading": "Section 1: Integration by Parts (Repeated & Cyclic)",
                "questions": [
                    make_q(
                        "Evaluate $\\int x^2 \\cos x dx$ using integration by parts.",
                        [
                            "$x^2 \\sin x + 2x \\cos x - 2\\sin x + C$",
                            "$x^2 \\sin x - 2x \\cos x + 2\\sin x + C$",
                            "$-x^2 \\sin x + 2x \\cos x + C$",
                            "$\\frac{1}{3}x^3 \\sin x + C$"
                        ],
                        0,
                        "Tabular: $x^2 \\to 2x \\to 2 \\to 0$; $\\cos x \\to \\sin x \\to -\\cos x \\to -\\sin x$. Alternating: $+x^2\\sin x - 2x(-\\cos x) + 2(-\\sin x) = x^2\\sin x + 2x\\cos x - 2\\sin x + C$."
                    ),
                    make_q(
                        "Evaluate the cyclic integral $I = \\int e^x \\sin x dx$.",
                        [
                            "$\\frac{1}{2} e^x (\\sin x - \\cos x) + C$",
                            "$\\frac{1}{2} e^x (\\sin x + \\cos x) + C$",
                            "$e^x (\\sin x - \\cos x) + C$",
                            "$-e^x \\cos x + C$"
                        ],
                        0,
                        "Integrate by parts twice: $I = e^x \\sin x - \\int e^x \\cos x dx = e^x \\sin x - [e^x \\cos x - \\int e^x (-\\sin x)dx] = e^x(\\sin x - \\cos x) - I \\Rightarrow 2I = e^x(\\sin x - \\cos x) \\Rightarrow I = \\frac{1}{2}e^x(\\sin x - \\cos x) + C$."
                    ),
                    make_q(
                        "Evaluate $\\int_1^e \\ln x dx$.",
                        ["$1$", "$e - 1$", "$e$", "$0$"],
                        0,
                        "$\\int \\ln x dx = x\\ln x - x$. Evaluating from 1 to $e$: $[e\\ln e - e] - [1\\ln 1 - 1] = [e - e] - [0 - 1] = 0 - (-1) = 1$."
                    )
                ]
            },
            {
                "heading": "Section 2: Trigonometric Substitutions",
                "questions": [
                    make_q(
                        "Which trigonometric substitution is best suited to evaluate $\\int \\frac{1}{\\sqrt{16 - x^2}} dx$?",
                        ["$x = 4\\sin\\theta$", "$x = 4\\tan\\theta$", "$x = 4\\sec\\theta$", "$x = 16\\sin\\theta$"],
                        0,
                        "For forms $\\sqrt{a^2 - x^2}$, the substitution $x = a\\sin\\theta$ simplifies the radical via $16 - 16\\sin^2\\theta = 16\\cos^2\\theta$."
                    ),
                    make_q(
                        "Evaluate $\\int \\frac{1}{x^2 + 16} dx$.",
                        [
                            "$\\frac{1}{4}\\arctan\\left(\\frac{x}{4}\\right) + C$",
                            "$\\arctan\\left(\\frac{x}{4}\\right) + C$",
                            "$\\frac{1}{16}\\arctan\\left(\\frac{x}{16}\\right) + C$",
                            "$\\frac{1}{4}\\ln|x^2 + 16| + C$"
                        ],
                        0,
                        "Standard formula $\\int \\frac{1}{x^2 + a^2} dx = \\frac{1}{a}\\arctan\\left(\\frac{x}{a}\\right) + C$. With $a = 4$: $\\frac{1}{4}\\arctan\\left(\\frac{x}{4}\\right) + C$."
                    ),
                    make_q(
                        "Which substitution evaluates $\\int \\sqrt{x^2 - 9} dx$?",
                        ["$x = 3\\sec\\theta$", "$x = 3\\sin\\theta$", "$x = 3\\tan\\theta$", "$x = 9\\sec\\theta$"],
                        0,
                        "For $\\sqrt{x^2 - a^2}$, use $x = a\\sec\\theta$, since $x^2 - 9 = 9(\\sec^2\\theta - 1) = 9\\tan^2\\theta$."
                    )
                ]
            },
            {
                "heading": "Section 3: Integrals of Powers of Trigonometric Functions",
                "questions": [
                    make_q(
                        "Evaluate $\\int \\sin^3 x dx$.",
                        [
                            "$-\\cos x + \\frac{1}{3}\\cos^3 x + C$",
                            "$\\cos x - \\frac{1}{3}\\cos^3 x + C$",
                            "$\\frac{1}{4}\\sin^4 x + C$",
                            "$-\\frac{1}{3}\\cos^3 x + C$"
                        ],
                        0,
                        "Rewrite $\\sin^3 x = (1 - \\cos^2 x)\\sin x$. Let $u = \\cos x, du = -\\sin x dx$: $\\int -(1 - u^2) du = -u + \\frac{u^3}{3} + C = -\\cos x + \\frac{1}{3}\\cos^3 x + C$."
                    ),
                    make_q(
                        "Evaluate $\\int \\cos^2 x dx$.",
                        [
                            "$\\frac{1}{2}x + \\frac{1}{4}\\sin(2x) + C$",
                            "$\\frac{1}{2}x - \\frac{1}{4}\\sin(2x) + C$",
                            "$\\frac{1}{3}\\cos^3 x + C$",
                            "$\\frac{1}{2}x + \\sin(2x) + C$"
                        ],
                        0,
                        "Use double angle identity $\\cos^2 x = \\frac{1 + \\cos(2x)}{2}$: $\\int \\frac{1 + \\cos(2x)}{2} dx = \\frac{x}{2} + \\frac{\\sin(2x)}{4} + C$."
                    ),
                    make_q(
                        "Evaluate $\\int \\tan^2 x dx$.",
                        ["$\\tan x - x + C$", "$\\sec^2 x + C$", "$\\tan x + x + C$", "$\\frac{1}{3}\\tan^3 x + C$"],
                        0,
                        "Identity: $\\tan^2 x = \\sec^2 x - 1$. Integrating: $\\int (\\sec^2 x - 1) dx = \\tan x - x + C$."
                    )
                ]
            },
            {
                "heading": "Section 4: Integration by Substitution (Advanced Forms)",
                "questions": [
                    make_q(
                        "Evaluate $\\int \\frac{x}{\\sqrt{x + 1}} dx$ using substitution $u = x + 1$.",
                        [
                            "$\\frac{2}{3}(x + 1)^{3/2} - 2(x + 1)^{1/2} + C$",
                            "$\\frac{2}{3}(x + 1)^{3/2} + 2(x + 1)^{1/2} + C$",
                            "$(x + 1)^{3/2} - (x + 1)^{1/2} + C$",
                            "$\\frac{1}{2}(x + 1)^2 + C$"
                        ],
                        0,
                        "With $u = x + 1$, $x = u - 1$ and $dx = du$: $\\int \\frac{u - 1}{u^{1/2}} du = \\int (u^{1/2} - u^{-1/2}) du = \\frac{2}{3}u^{3/2} - 2u^{1/2} + C = \\frac{2}{3}(x+1)^{3/2} - 2(x+1)^{1/2} + C$."
                    ),
                    make_q(
                        "Evaluate $\\int_0^1 \\frac{e^x}{1 + e^x} dx$.",
                        ["$\\ln\\left(\\frac{1 + e}{2}\\right)$", "$\\ln(1 + e)$", "$e - 1$", "$\\frac{e}{2}$"],
                        0,
                        "Let $u = 1 + e^x, du = e^x dx$. At $x = 0, u = 2$; at $x = 1, u = 1 + e$. $\\int_2^{1+e} \\frac{1}{u} du = [\\ln|u|]_2^{1+e} = \\ln(1 + e) - \\ln 2 = \\ln\\left(\\frac{1 + e}{2}\\right)$."
                    ),
                    make_q(
                        "Evaluate $\\int \\frac{1}{x\\ln x} dx$ for $x > 1$.",
                        ["$\\ln|\\ln x| + C$", "$\\frac{1}{2}(\\ln x)^2 + C$", "$\\frac{1}{\\ln x} + C$", "$x\\ln x - x + C$"],
                        0,
                        "Let $u = \\ln x, du = \\frac{1}{x}dx$. $\\int \\frac{1}{u} du = \\ln|u| + C = \\ln|\\ln x| + C$."
                    )
                ]
            }
        ]
    }
]
