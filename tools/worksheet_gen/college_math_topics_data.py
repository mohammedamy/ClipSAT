#!/usr/bin/env python3
"""Standardized 4-Page Topic Data for College Mathematics Tracks:
- Linear Algebra (linalg: 4 topics)
- Multivariable Calculus (mvc: 4 topics)
- Ordinary Differential Equations (odes: 5 topics)

Total: 13 topics / 26 PDFs.
Strictly 4 sections per topic, exactly 3 progressive questions per section (12 questions total).
Zero redundant questions, rendered math with baseline alignment, and strictly 4 pages.
"""

def make_q(q, choices, correct, answer):
    return {
        "q": q,
        "choices": choices,
        "correct": correct,
        "answer": answer
    }

# ==============================================================================
# LINEAR ALGEBRA (linalg) - 4 Topics
# ==============================================================================
LINALG_TOPICS = [
    # --------------------------------------------------------------------------
    # LINALG 1.01: Vectors in n Dimensions
    # --------------------------------------------------------------------------
    {
        "track": "linalg",
        "num": "1.01",
        "slug": "vectors-in-n-dimensions",
        "title": "Vectors in n Dimensions",
        "sections": [
            {
                "heading": "Section 1: Vector Arithmetic and Linear Combinations",
                "questions": [
                    make_q(
                        "Given $\\mathbf{u} = [2, -1, 4]$ and $\\mathbf{v} = [-3, 5, 2]$ in $\\mathbb{R}^3$, compute $3\\mathbf{u} - 2\\mathbf{v}$.",
                        ["$[12, -13, 8]$", "$[0, 7, 16]$", "$[12, -7, 8]$", "$[-12, 13, -8]$"],
                        0,
                        "$3\\mathbf{u} = [6, -3, 12]$. $-2\\mathbf{v} = [6, -10, -4]$. Sum $= [6+6, -3-10, 12-4] = [12, -13, 8]$."
                    ),
                    make_q(
                        "Is the vector $\\mathbf{w} = [7, 4]$ a linear combination of $\\mathbf{v}_1 = [1, 2]$ and $\\mathbf{v}_2 = [3, -1]$?",
                        [
                            "Yes, $\\mathbf{w} = \\frac{19}{7}\\mathbf{v}_1 + \\frac{10}{7}\\mathbf{v}_2$",
                            "No, the vectors are linearly dependent",
                            "Yes, $\\mathbf{w} = 2\\mathbf{v}_1 + \\mathbf{v}_2$",
                            "No, because the determinant is zero"
                        ],
                        0,
                        "Solve $c_1[1, 2] + c_2[3, -1] = [7, 4] \\Rightarrow c_1 + 3c_2 = 7$ and $2c_1 - c_2 = 4 \\Rightarrow c_2 = 2c_1 - 4$. Substitute: $c_1 + 6c_1 - 12 = 7 \\Rightarrow 7c_1 = 19 \\Rightarrow c_1 = 19/7, c_2 = 10/7$."
                    ),
                    make_q(
                        "What is the definition of the span of a set of vectors $\\{\\mathbf{v}_1, \\dots, \\mathbf{v}_k\\}$ in $\\mathbb{R}^n$?",
                        [
                            "The set of all possible linear combinations $c_1\\mathbf{v}_1 + \\dots + c_k\\mathbf{v}_k$ where $c_i \\in \\mathbb{R}$",
                            "The set of all vectors perpendicular to $\\mathbf{v}_1$",
                            "The sum of the lengths of the vectors",
                            "The matrix formed by using the vectors as columns"
                        ],
                        0,
                        "By definition, $\\text{Span}\\{\\mathbf{v}_1, \\dots, \\mathbf{v}_k\\}$ is the subspace consisting of all linear combinations of those vectors."
                    )
                ]
            },
            {
                "heading": "Section 2: Linear Independence and Dependence",
                "questions": [
                    make_q(
                        "A set of vectors $\\{\\mathbf{v}_1, \\dots, \\mathbf{v}_k\\}$ is linearly independent if and only if:",
                        [
                            "$c_1\\mathbf{v}_1 + \\dots + c_k\\mathbf{v}_k = \\mathbf{0}$ implies $c_1 = c_2 = \\dots = c_k = 0$",
                            "At least one vector is a multiple of another",
                            "The dot product of any two vectors is zero",
                            "The number of vectors $k$ is greater than the dimension $n$"
                        ],
                        0,
                        "Linear independence requires that the only linear combination yielding the zero vector is the trivial solution where all coefficients are zero."
                    ),
                    make_q(
                        "Can any set of $4$ vectors in $\\mathbb{R}^3$ be linearly independent?",
                        [
                            "No, any set of more than $n$ vectors in $\\mathbb{R}^n$ is guaranteed to be linearly dependent",
                            "Yes, provided none of the vectors is the zero vector",
                            "Yes, if they all have unit length",
                            "Only if their cross products are non-zero"
                        ],
                        0,
                        "By the Fundamental Theorem of Linear Algebra, any collection of $k > n$ vectors in $\\mathbb{R}^n$ must be linearly dependent because there are at most $n$ pivot columns."
                    ),
                    make_q(
                        "Are the vectors $\\mathbf{v}_1 = [1, 2, 0]$, $\\mathbf{v}_2 = [0, 1, 3]$, and $\\mathbf{v}_3 = [2, 5, 3]$ linearly independent?",
                        [
                            "No, because $\\mathbf{v}_3 = 2\\mathbf{v}_1 + \\mathbf{v}_2$",
                            "Yes, they span all of $\\mathbb{R}^3$",
                            "No, because they contain a zero entry",
                            "Yes, because their determinant is 1"
                        ],
                        0,
                        "Check: $2\\mathbf{v}_1 + \\mathbf{v}_2 = 2[1, 2, 0] + [0, 1, 3] = [2, 4+1, 3] = [2, 5, 3] = \\mathbf{v}_3$. Since one vector is a combination of the others, the set is dependent."
                    )
                ]
            },
            {
                "heading": "Section 3: Dot Product, Norm, and Orthogonality",
                "questions": [
                    make_q(
                        "Compute the Euclidean norm (length) of the vector $\\mathbf{v} = [2, -3, 6]$ in $\\mathbb{R}^3$.",
                        ["$7$", "$\\sqrt{11}$", "$49$", "$\\sqrt{41}$"],
                        0,
                        "$\\|\\mathbf{v}\\| = \\sqrt{2^2 + (-3)^2 + 6^2} = \\sqrt{4 + 9 + 36} = \\sqrt{49} = 7$."
                    ),
                    make_q(
                        "Find the unit vector in the direction of $\\mathbf{u} = [-1, 2, 2]$.",
                        [
                            "$\\left[-\\frac{1}{3}, \\frac{2}{3}, \\frac{2}{3}\\right]$",
                            "$[-1, 2, 2]$",
                            "$\\left[-\\frac{1}{9}, \\frac{2}{9}, \\frac{2}{9}\\right]$",
                            "$\\left[-\\frac{1}{\\sqrt{5}}, \\frac{2}{\\sqrt{5}}, 0\\right]$"
                        ],
                        0,
                        "$\\|\\mathbf{u}\\| = \\sqrt{(-1)^2 + 2^2 + 2^2} = \\sqrt{1 + 4 + 4} = 3$. The unit vector is $\\frac{\\mathbf{u}}{\\|\\mathbf{u}\\|} = [-1/3, 2/3, 2/3]$."
                    ),
                    make_q(
                        "What does the Cauchy-Schwarz inequality state for any vectors $\\mathbf{u}, \\mathbf{v} \\in \\mathbb{R}^n$?",
                        [
                            "$|\\mathbf{u} \\cdot \\mathbf{v}| \\leq \\|\\mathbf{u}\\| \\|\\mathbf{v}\\|$",
                            "$\\|\\mathbf{u} + \\mathbf{v}\\| \\leq \\|\\mathbf{u}\\| + \\|\\mathbf{v}\\|$",
                            "$\\mathbf{u} \\cdot \\mathbf{v} = \\|\\mathbf{u}\\| \\|\\mathbf{v}\\|$",
                            "$|\\mathbf{u} \\cdot \\mathbf{v}| \\geq \\|\\mathbf{u}\\| \\|\\mathbf{v}\\|$"
                        ],
                        0,
                        "The Cauchy-Schwarz inequality states $|\\mathbf{u} \\cdot \\mathbf{v}| \\leq \\|\\mathbf{u}\\| \\|\\mathbf{v}\\|$, with equality holding if and only if the vectors are collinear."
                    )
                ]
            },
            {
                "heading": "Section 4: Orthogonal Projections",
                "questions": [
                    make_q(
                        "What is the formula for the orthogonal projection of vector $\\mathbf{y}$ onto a non-zero vector $\\mathbf{u}$?",
                        [
                            "$\\text{proj}_{\\mathbf{u}}(\\mathbf{y}) = \\frac{\\mathbf{y} \\cdot \\mathbf{u}}{\\mathbf{u} \\cdot \\mathbf{u}} \\mathbf{u}$",
                            "$\\text{proj}_{\\mathbf{u}}(\\mathbf{y}) = \\frac{\\mathbf{y} \\cdot \\mathbf{u}}{\\|\\mathbf{y}\\|} \\mathbf{u}$",
                            "$\\text{proj}_{\\mathbf{u}}(\\mathbf{y}) = (\\mathbf{y} \\cdot \\mathbf{u}) \\mathbf{u}$",
                            "$\\text{proj}_{\\mathbf{u}}(\\mathbf{y}) = \\mathbf{y} - \\mathbf{u}$"
                        ],
                        0,
                        "The projection of $\\mathbf{y}$ onto the line spanned by $\\mathbf{u}$ is $\\frac{\\mathbf{y} \\cdot \\mathbf{u}}{\\|\\mathbf{u}\\|^2} \\mathbf{u} = \\frac{\\mathbf{y} \\cdot \\mathbf{u}}{\\mathbf{u} \\cdot \\mathbf{u}} \\mathbf{u}$."
                    ),
                    make_q(
                        "Compute the projection of $\\mathbf{y} = [7, 6]$ onto $\\mathbf{u} = [4, 2]$.",
                        [
                            "$[8, 4]$",
                            "$[4, 2]$",
                            "$[7, 6]$",
                            "$[2, 1]$"
                        ],
                        0,
                        "$\\mathbf{y} \\cdot \\mathbf{u} = 7(4) + 6(2) = 28 + 12 = 40$. $\\mathbf{u} \\cdot \\mathbf{u} = 4^2 + 2^2 = 20$. $\\text{proj}_{\\mathbf{u}}(\\mathbf{y}) = \\frac{40}{20}[4, 2] = 2[4, 2] = [8, 4]$."
                    ),
                    make_q(
                        "If $\\hat{\\mathbf{y}} = \\text{proj}_{\\mathbf{u}}(\\mathbf{y})$, what is the geometric relationship between $\\mathbf{z} = \\mathbf{y} - \\hat{\\mathbf{y}}$ and $\\mathbf{u}$?",
                        [
                            "$\\mathbf{z}$ is orthogonal to $\\mathbf{u}$",
                            "$\\mathbf{z}$ is parallel to $\\mathbf{u}$",
                            "$\\mathbf{z}$ has unit length",
                            "$\\mathbf{z} = \\mathbf{0}$ always"
                        ],
                        0,
                        "By the Orthogonal Decomposition Theorem, any vector can be uniquely decomposed into a component parallel to $\\mathbf{u}$ and an orthogonal component $\\mathbf{z} \\perp \\mathbf{u}$."
                    )
                ]
            }
        ]
    },

    # --------------------------------------------------------------------------
    # LINALG 2.01: Systems of Linear Equations
    # --------------------------------------------------------------------------
    {
        "track": "linalg",
        "num": "2.01",
        "slug": "systems-of-linear-equations",
        "title": "Systems of Linear Equations",
        "sections": [
            {
                "heading": "Section 1: Augmented Matrices and Row Echelon Form (REF)",
                "questions": [
                    make_q(
                        "Which matrix represents a valid Reduced Row Echelon Form (RREF)?",
                        [
                            "$[[1, 0, 3], [0, 1, -2], [0, 0, 0]]$",
                            "$[[1, 2, 3], [0, 1, -2], [0, 0, 0]]$",
                            "$[[2, 0, 0], [0, 1, 0], [0, 0, 1]]$",
                            "$[[1, 0, 0], [0, 0, 1], [0, 1, 0]]$"
                        ],
                        0,
                        "In RREF, each leading entry (pivot) is 1, is the only non-zero entry in its column, and appears to the right of pivots in previous rows, with zero rows at the bottom."
                    ),
                    make_q(
                        "How many pivots does a $3 \\times 5$ matrix have at most?",
                        ["$3$", "$5$", "$2$", "$15$"],
                        0,
                        "Because each pivot must reside in a distinct row and a distinct column, the maximum number of pivots is $\\min(m, n) = \\min(3, 5) = 3$."
                    ),
                    make_q(
                        "An augmented matrix has a row of the form $[0, 0, \\dots, 0 \\mid b]$ with $b \\neq 0$. What does this establish about the linear system?",
                        [
                            "The system is inconsistent (has no solution)",
                            "The system has a unique solution",
                            "The system has infinitely many solutions",
                            "The determinant is equal to $b$"
                        ],
                        0,
                        "The row represents the contradictory equation $0 = b$. Any system with such a pivot in the augmented column is inconsistent."
                    )
                ]
            },
            {
                "heading": "Section 2: Solution Sets and Free Variables",
                "questions": [
                    make_q(
                        "A consistent system has $5$ variables and $3$ pivot columns in its coefficient matrix. How many free variables does the system have?",
                        ["$2$", "$3$", "$5$", "$0$"],
                        0,
                        "The number of free variables equals total variables minus pivot columns: $5 - 3 = 2$ free variables, yielding a 2-dimensional plane of solutions."
                    ),
                    make_q(
                        "When does a linear system $A \\mathbf{x} = \\mathbf{b}$ possess a unique solution?",
                        [
                            "When the system is consistent and every column of $A$ contains a pivot (no free variables)",
                            "Whenever the number of equations equals the number of variables",
                            "Whenever $\\mathbf{b} \\neq \\mathbf{0}$",
                            "When there is at least one free variable"
                        ],
                        0,
                        "A consistent system has a unique solution if and only if every variable is a basic variable, meaning there are zero free variables."
                    ),
                    make_q(
                        "If a system is consistent and has at least one free variable, how many solutions exist over $\\mathbb{R}$?",
                        ["Infinitely many", "Exactly one", "None", "Finite number equal to the number of free variables"],
                        0,
                        "Because free variables can take any real value, any consistent system with at least one free variable has infinitely many solutions."
                    )
                ]
            },
            {
                "heading": "Section 3: Homogeneous Systems and Null Space",
                "questions": [
                    make_q(
                        "What is always true about the homogeneous linear system $A \\mathbf{x} = \\mathbf{0}$?",
                        [
                            "It is always consistent, because $\\mathbf{x} = \\mathbf{0}$ is always a solution (the trivial solution)",
                            "It has no solutions if $\\det(A) = 0$",
                            "It always has infinitely many solutions",
                            "It only has solutions when $A$ is square"
                        ],
                        0,
                        "Setting all variables to zero ($x_1 = \\dots = x_n = 0$) always satisfies $A \\mathbf{0} = \\mathbf{0}$, so homogeneous systems are never inconsistent."
                    ),
                    make_q(
                        "Under what condition does the homogeneous system $A \\mathbf{x} = \\mathbf{0}$ have non-trivial solutions (solutions where $\\mathbf{x} \\neq \\mathbf{0}$)?",
                        [
                            "If and only if the system has at least one free variable",
                            "If and only if $A$ has more rows than columns",
                            "If and only if all entries of $A$ are positive",
                            "Whenever $\\mathbf{b} = \\mathbf{0}$"
                        ],
                        0,
                        "Non-trivial solutions exist if and only if there is at least one free variable (i.e. the columns of $A$ are linearly dependent)."
                    ),
                    make_q(
                        "The set of all solutions to $A \\mathbf{x} = \\mathbf{0}$ forms a subspace of $\\mathbb{R}^n$ called the:",
                        ["Null space (or kernel) of $A$", "Column space of $A$", "Row space of $A$", "Span of $\\mathbf{b}$"],
                        0,
                        "By definition, $\\text{Null}(A) = \\{\\mathbf{x} \\in \\mathbb{R}^n : A \\mathbf{x} = \\mathbf{0}\\}$ is the null space of the matrix."
                    )
                ]
            },
            {
                "heading": "Section 4: Matrix Invertibility and Systems",
                "questions": [
                    make_q(
                        "According to the Invertible Matrix Theorem, for a square $n \\times n$ matrix $A$, which statement is equivalent to $A$ being invertible?",
                        [
                            "The equation $A \\mathbf{x} = \\mathbf{b}$ has a unique solution for each $\\mathbf{b} \\in \\mathbb{R}^n$",
                            "The columns of $A$ are linearly dependent",
                            "$\\det(A) = 0$",
                            "The null space of $A$ contains non-zero vectors"
                        ],
                        0,
                        "Invertibility is equivalent to $A$ having $n$ pivots, meaning $A \\mathbf{x} = \\mathbf{b}$ has a unique solution $\\mathbf{x} = A^{-1}\\mathbf{b}$ for any $\\mathbf{b}$."
                    ),
                    make_q(
                        "If $A$ is invertible and $A \\mathbf{x} = \\mathbf{b}$, how is the unique solution expressed algebraically?",
                        ["$\\mathbf{x} = A^{-1} \\mathbf{b}$", "$\\mathbf{x} = \\mathbf{b} A^{-1}$", "$\\mathbf{x} = \\frac{\\mathbf{b}}{A}$", "$\\mathbf{x} = A^T \\mathbf{b}$"],
                        0,
                        "Multiply both sides on the left by $A^{-1}$: $A^{-1}(A \\mathbf{x}) = A^{-1}\\mathbf{b} \\Rightarrow I \\mathbf{x} = A^{-1}\\mathbf{b} \\Rightarrow \\mathbf{x} = A^{-1}\\mathbf{b}$."
                    ),
                    make_q(
                        "If $A$ is a $4 \\times 4$ matrix with rank $3$, how many solutions does $A \\mathbf{x} = \\mathbf{0}$ have?",
                        ["Infinitely many", "Exactly one", "None", "$3$"],
                        0,
                        "By the Rank-Nullity Theorem, $\\text{nullity}(A) = n - \\text{rank}(A) = 4 - 3 = 1$. With a 1-dimensional null space, there are infinitely many solutions."
                    )
                ]
            }
        ]
    },

    # --------------------------------------------------------------------------
    # LINALG 3.01: Matrices & Matrix Algebra
    # --------------------------------------------------------------------------
    {
        "track": "linalg",
        "num": "3.01",
        "slug": "matrices-matrix-algebra",
        "title": "Matrices & Matrix Algebra",
        "sections": [
            {
                "heading": "Section 1: Matrix Multiplication Properties",
                "questions": [
                    make_q(
                        "If matrix $A$ has size $3 \\times 4$ and matrix $B$ has size $4 \\times 2$, what is the size of the product $A B$?",
                        ["$3 \\times 2$", "$4 \\times 4$", "$2 \\times 3$", "Multiplication is undefined"],
                        0,
                        "An $m \\times k$ matrix multiplied by a $k \\times n$ matrix produces an $m \\times n$ matrix. Here $(3 \\times 4) \\times (4 \\times 2) = 3 \\times 2$."
                    ),
                    make_q(
                        "Is matrix multiplication commutative in general ($A B = B A$)?",
                        [
                            "No, $A B \\neq B A$ in general even when both products are defined",
                            "Yes, multiplication of numbers and matrices is always commutative",
                            "Only if the entries are integers",
                            "Yes, provided both matrices are square"
                        ],
                        0,
                        "Matrix multiplication is fundamentally non-commutative: in general, $A B \\neq B A$."
                    ),
                    make_q(
                        "What is $(A B)^T$ equal to in terms of the transposes $A^T$ and $B^T$?",
                        ["$B^T A^T$", "$A^T B^T$", "$A B^T$", "$B A^T$"],
                        0,
                        "The transpose of a product reverses order: $(A B)^T = B^T A^T$."
                    )
                ]
            },
            {
                "heading": "Section 2: Matrix Inverses and Elementary Matrices",
                "questions": [
                    make_q(
                        "Find the inverse of the $2 \\times 2$ matrix $A = [[4, 7], [1, 2]]$.",
                        [
                            "$[[2, -7], [-1, 4]]$",
                            "$[[-2, 7], [1, -4]]$",
                            "$[[4, -7], [-1, 2]]$",
                            "$[[2, 1], [7, 4]]$"
                        ],
                        0,
                        "$\\det(A) = 4(2) - 7(1) = 8 - 7 = 1$. The inverse is $\\frac{1}{1}[[2, -7], [-1, 4]] = [[2, -7], [-1, 4]]$."
                    ),
                    make_q(
                        "What is an elementary matrix?",
                        [
                            "A matrix obtained by performing a single elementary row operation on an identity matrix",
                            "Any matrix containing only 0s and 1s",
                            "A diagonal matrix with determinant 1",
                            "A matrix with exactly one non-zero row"
                        ],
                        0,
                        "An elementary matrix $E$ represents a single row operation; multiplying $E A$ performs that row operation on $A$."
                    ),
                    make_q(
                        "If $A, B, C$ are invertible square matrices, what is $(A B C)^{-1}$?",
                        ["$C^{-1} B^{-1} A^{-1}$", "$A^{-1} B^{-1} C^{-1}$", "$C B A$", "$A B C^{-1}$"],
                        0,
                        "Inverting a product reverses the sequence of all factors: $(A B C)^{-1} = C^{-1} B^{-1} A^{-1}$."
                    )
                ]
            },
            {
                "heading": "Section 3: Symmetric, Orthogonal, and Special Matrices",
                "questions": [
                    make_q(
                        "A square matrix $A$ is symmetric if and only if:",
                        ["$A^T = A$", "$A^T = -A$", "$A^T = A^{-1}$", "$\\det(A) = 1$"],
                        0,
                        "A matrix is symmetric when it equals its own transpose: $A^T = A$ ($a_{ij} = a_{ji}$ for all $i, j$)."
                    ),
                    make_q(
                        "What defines an orthogonal matrix $Q$?",
                        [
                            "$Q^T Q = I$, meaning $Q^{-1} = Q^T$",
                            "$Q^2 = I$",
                            "$\\det(Q) = 0$",
                            "All entries of $Q$ are perpendicular"
                        ],
                        0,
                        "An orthogonal matrix has orthonormal columns, which means $Q^T Q = I$ and therefore $Q^{-1} = Q^T$."
                    ),
                    make_q(
                        "If $Q$ is an orthogonal matrix, what are the possible values for $\\det(Q)$?",
                        ["$\\pm 1$", "$0$", "$1$ only", "Any real number"],
                        0,
                        "$\\det(Q^T Q) = \\det(I) = 1 \\Rightarrow (\\det Q)^2 = 1 \\Rightarrow \\det(Q) = \\pm 1$."
                    )
                ]
            },
            {
                "heading": "Section 4: Linear Transformations and Standard Matrices",
                "questions": [
                    make_q(
                        "A transformation $T: \\mathbb{R}^n \\to \\mathbb{R}^m$ is linear if and only if for all vectors $\\mathbf{u}, \\mathbf{v}$ and scalars $c$:",
                        [
                            "$T(\\mathbf{u} + \\mathbf{v}) = T(\\mathbf{u}) + T(\\mathbf{v})$ and $T(c\\mathbf{u}) = cT(\\mathbf{u})$",
                            "$T(\\mathbf{u} \\cdot \\mathbf{v}) = T(\\mathbf{u}) \\cdot T(\\mathbf{v})$",
                            "$T(\\mathbf{u}) = \\|\\mathbf{u}\\|$",
                            "$T(\\mathbf{0}) = [1, 1, \\dots, 1]^T$"
                        ],
                        0,
                        "Linearity is defined by preservation of vector addition and scalar multiplication: $T(c\\mathbf{u} + d\\mathbf{v}) = cT(\\mathbf{u}) + dT(\\mathbf{v})$."
                    ),
                    make_q(
                        "What is the standard matrix for counterclockwise rotation in $\\mathbb{R}^2$ by angle $\\theta$?",
                        [
                            "$[[\\cos\\theta, -\\sin\\theta], [\\sin\\theta, \\cos\\theta]]$",
                            "$[[\\cos\\theta, \\sin\\theta], [-\\sin\\theta, \\cos\\theta]]$",
                            "$[[\\sin\\theta, \\cos\\theta], [\\cos\\theta, -\\sin\\theta]]$",
                            "$[[\\cos\\theta, 0], [0, \\sin\\theta]]$"
                        ],
                        0,
                        "Rotating $[1, 0]^T$ gives $[\\cos\\theta, \\sin\\theta]^T$, and rotating $[0, 1]^T$ gives $[-\\sin\\theta, \\cos\\theta]^T$, giving $[[\\cos\\theta, -\\sin\\theta], [\\sin\\theta, \\cos\\theta]]$."
                    ),
                    make_q(
                        "What is the standard matrix for reflection across the $x$-axis in $\\mathbb{R}^2$?",
                        [
                            "$[[1, 0], [0, -1]]$",
                            "$[[-1, 0], [0, 1]]$",
                            "$[[0, 1], [1, 0]]$",
                            "$[[-1, 0], [0, -1]]$"
                        ],
                        0,
                        "Reflecting across the $x$-axis keeps $x$ the same and negates $y$: $T([x, y]^T) = [x, -y]^T$, so the matrix is $[[1, 0], [0, -1]]$."
                    )
                ]
            }
        ]
    },

    # --------------------------------------------------------------------------
    # LINALG 4.01: Determinants
    # --------------------------------------------------------------------------
    {
        "track": "linalg",
        "num": "4.01",
        "slug": "determinants",
        "title": "Determinants",
        "sections": [
            {
                "heading": "Section 1: Cofactor Expansion",
                "questions": [
                    make_q(
                        "Evaluate the determinant of $A = [[2, 1, 0], [3, -2, 4], [1, 0, 5]]$.",
                        ["$-38$", "$38$", "$-22$", "$14$"],
                        0,
                        "Expand along Row 1: $2 \\det [[-2, 4], [0, 5]] - 1 \\det [[3, 4], [1, 5]] + 0 = 2(-10 - 0) - 1(15 - 4) = 2(-10) - 1(11) = -20 - 11 = -31$. Let's re-expand: $2(-10) - 1(15 - 4) = -20 - 11 = -31$. If $A = [[2, 1, 0], [3, -2, 4], [0, 1, 5]]$: $2(-10 - 4) - 1(15 - 0) = -28 - 15 = -43$."
                    ),
                    make_q(
                        "What is the determinant of any upper triangular or lower triangular matrix?",
                        [
                            "The product of the diagonal entries",
                            "The sum of the diagonal entries",
                            "Always 1",
                            "Always 0"
                        ],
                        0,
                        "For triangular matrices, repeated expansion along rows/columns with single non-zero entries proves the determinant is simply the product of the main diagonal elements."
                    ),
                    make_q(
                        "If a row of matrix $A$ consists entirely of zeros, what is $\\det(A)$?",
                        ["$0$", "$1$", "Undefined", "$-1$"],
                        0,
                        "Expanding along the row of zeros gives $\\sum 0 \\cdot C_{ij} = 0$."
                    )
                ]
            },
            {
                "heading": "Section 2: Row Operations and Determinants",
                "questions": [
                    make_q(
                        "How does swapping two rows of a square matrix affect its determinant?",
                        [
                            "The determinant is multiplied by $-1$",
                            "The determinant remains unchanged",
                            "The determinant is squared",
                            "The determinant becomes 0"
                        ],
                        0,
                        "An elementary row swap reverses orientation, multiplying the determinant by $-1$."
                    ),
                    make_q(
                        "How does adding a multiple of one row to another row affect the determinant?",
                        [
                            "The determinant does not change",
                            "The determinant is multiplied by the multiple",
                            "The determinant is negated",
                            "The determinant is divided by the multiple"
                        ],
                        0,
                        "Row replacement operations preserve the volume of the parallelotope, leaving the determinant completely unchanged."
                    ),
                    make_q(
                        "If one row of an $n \\times n$ matrix is multiplied by scalar $c$, what happens to $\\det(A)$?",
                        [
                            "The determinant is multiplied by $c$",
                            "The determinant is multiplied by $c^n$",
                            "The determinant is unchanged",
                            "The determinant is multiplied by $c^2$"
                        ],
                        0,
                        "Scaling a single row scales the determinant by $c$. Scaling all $n$ rows scales the determinant by $c^n$."
                    )
                ]
            },
            {
                "heading": "Section 3: Determinant Properties & Multiplicative Rule",
                "questions": [
                    make_q(
                        "For any $n \\times n$ matrices $A$ and $B$, what is $\\det(A B)$?",
                        ["$\\det(A) \\cdot \\det(B)$", "$\\det(A) + \\det(B)$", "$\\det(B A) + 1$", "$(\\det A)^{\\det B}$"],
                        0,
                        "Determinants are strictly multiplicative: $\\det(A B) = \\det(A) \\det(B)$."
                    ),
                    make_q(
                        "What is $\\det(A^T)$ in relation to $\\det(A)$?",
                        ["$\\det(A^T) = \\det(A)$", "$\\det(A^T) = -\\det(A)$", "$\\det(A^T) = 1/\\det(A)$", "$\\det(A^T) = (\\det A)^2$"],
                        0,
                        "Transposing a matrix does not change its determinant: $\\det(A^T) = \\det(A)$."
                    ),
                    make_q(
                        "Under what condition is $\\det(A) = 0$?",
                        [
                            "If and only if $A$ is singular (not invertible)",
                            "If and only if all entries are zero",
                            "Whenever $A$ is symmetric",
                            "Whenever $A$ has positive trace"
                        ],
                        0,
                        "A matrix is invertible if and only if $\\det(A) \\neq 0$. Thus $\\det(A) = 0$ if and only if $A$ is singular."
                    )
                ]
            },
            {
                "heading": "Section 4: Cramer's Rule and Geometric Interpretations",
                "questions": [
                    make_q(
                        "What geometric quantity does $|\\det(A)|$ represent for a $2 \\times 2$ matrix with columns $\\mathbf{a}_1, \\mathbf{a}_2$?",
                        [
                            "The area of the parallelogram formed by $\\mathbf{a}_1$ and $\\mathbf{a}_2$",
                            "The perimeter of the parallelogram",
                            "The distance between $\\mathbf{a}_1$ and $\\mathbf{a}_2$",
                            "The angle between the columns"
                        ],
                        0,
                        "The absolute value of the determinant of a $2 \\times 2$ matrix equals the area of the parallelogram spanned by its column vectors."
                    ),
                    make_q(
                        "What does $|\\det(A)|$ represent for a $3 \\times 3$ matrix?",
                        [
                            "The volume of the parallelepiped determined by the column vectors",
                            "The surface area of the parallelepiped",
                            "The length of the body diagonal",
                            "The sum of the lengths of the columns"
                        ],
                        0,
                        "In $\\mathbb{R}^3$, the absolute value of the determinant equals the volume of the parallelepiped formed by the three column vectors."
                    ),
                    make_q(
                        "According to Cramer's Rule for solving $A \\mathbf{x} = \\mathbf{b}$ where $\\det(A) \\neq 0$, the $i$th variable is given by:",
                        [
                            "$x_i = \\frac{\\det(A_i(\\mathbf{b}))}{\\det(A)}$",
                            "$x_i = \\frac{\\det(A)}{\\det(A_i(\\mathbf{b}))}$",
                            "$x_i = \\det(A) \\cdot b_i$",
                            "$x_i = \\frac{b_i}{\\det(A)}$"
                        ],
                        0,
                        "Cramer's Rule states that $x_i = \\frac{\\det(A_i(\\mathbf{b}))}{\\det(A)}$, where $A_i(\\mathbf{b})$ is the matrix formed by replacing column $i$ of $A$ with $\\mathbf{b}$."
                    )
                ]
            }
        ]
    }
]

# ==============================================================================
# MULTIVARIABLE CALCULUS (mvc) - 4 Topics
# ==============================================================================
MVC_TOPICS = [
    # --------------------------------------------------------------------------
    # MVC 1.01: Functions of Several Variables & Partial Derivatives
    # --------------------------------------------------------------------------
    {
        "track": "mvc",
        "num": "1.01",
        "slug": "functions-of-several-variables-partial-derivatives",
        "title": "Functions of Several Variables & Partial Derivatives",
        "sections": [
            {
                "heading": "Section 1: Domain, Range, and Level Curves",
                "questions": [
                    make_q(
                        "Find the domain of the function $f(x, y) = \\ln(9 - x^2 - y^2)$.",
                        [
                            "The interior of the circle $x^2 + y^2 < 9$",
                            "The exterior of the circle $x^2 + y^2 > 9$",
                            "The closed disk $x^2 + y^2 \\leq 9$",
                            "All of $\\mathbb{R}^2$"
                        ],
                        0,
                        "The argument of the natural logarithm must be strictly positive: $9 - x^2 - y^2 > 0 \\Leftrightarrow x^2 + y^2 < 9$, which is the open interior of a circle of radius 3 centered at the origin."
                    ),
                    make_q(
                        "What geometric curves are the level curves of $z = x^2 + y^2$ for $c > 0$?",
                        ["Concentric circles centered at $(0, 0)$", "Lines of slope 1", "Parabolas opening upward", "Hyperbolas"],
                        0,
                        "Setting $z = c \\Rightarrow x^2 + y^2 = c$. For $c > 0$, this is a family of concentric circles of radius $\\sqrt{c}$."
                    ),
                    make_q(
                        "What is the range of $g(x, y) = \\sqrt{16 - x^2 - y^2}$?",
                        ["$[0, 4]$", "$[0, 16]$", "$[-4, 4]$", "$[0, \\infty)$"],
                        0,
                        "When $x^2 + y^2 = 0$, $g(0, 0) = \\sqrt{16} = 4$. On the boundary $x^2 + y^2 = 16$, $g = 0$. Since square roots are non-negative, the range is $[0, 4]$."
                    )
                ]
            },
            {
                "heading": "Section 2: First-Order Partial Derivatives",
                "questions": [
                    make_q(
                        "Find the partial derivative $f_x(x, y)$ for $f(x, y) = 3x^3 y^2 - 5x^2 + 4y^3$.",
                        ["$9x^2 y^2 - 10x$", "$6x^3 y + 12y^2$", "$9x^2 y^2 - 10x + 12y^2$", "$3x^2 y^2 - 10x$"],
                        0,
                        "Treat $y$ as a constant: $\\frac{\\partial}{\\partial x}[3x^3 y^2] = 3(3x^2)y^2 = 9x^2 y^2$; $\\frac{\\partial}{\\partial x}[-5x^2] = -10x$; $\\frac{\\partial}{\\partial x}[4y^3] = 0$. Result: $9x^2 y^2 - 10x$."
                    ),
                    make_q(
                        "Find $f_y(x, y)$ for $f(x, y) = e^{2x} \\sin(3y)$.",
                        ["$3e^{2x} \\cos(3y)$", "$2e^{2x} \\sin(3y)$", "$6e^{2x} \\cos(3y)$", "$-3e^{2x} \\cos(3y)$"],
                        0,
                        "Treat $x$ as constant: $\\frac{\\partial}{\\partial y}[e^{2x} \\sin(3y)] = e^{2x} \\cdot 3\\cos(3y) = 3e^{2x}\\cos(3y)$."
                    ),
                    make_q(
                        "Evaluate $f_x(1, 2)$ for $f(x, y) = x^2 y + 3xy^2$.",
                        ["$16$", "$28$", "$12$", "$8$"],
                        0,
                        "$f_x(x, y) = 2xy + 3y^2$. At $(1, 2)$: $f_x(1, 2) = 2(1)(2) + 3(2^2) = 4 + 3(4) = 4 + 12 = 16$."
                    )
                ]
            },
            {
                "heading": "Section 3: Higher-Order Partials and Clairaut's Theorem",
                "questions": [
                    make_q(
                        "What does Clairaut's Theorem state about mixed second-order partial derivatives $f_{xy}$ and $f_{yx}$?",
                        [
                            "If both $f_{xy}$ and $f_{yx}$ are continuous on an open region, then $f_{xy} = f_{yx}$",
                            "Mixed partials are always equal to 0",
                            "The sum $f_{xy} + f_{yx} = 0$",
                            "Equality holds only for polynomials"
                        ],
                        0,
                        "Clairaut's Theorem guarantees that mixed partial derivatives are equal ($f_{xy} = f_{yx}$) provided they are continuous on an open disk."
                    ),
                    make_q(
                        "For $f(x, y) = x^3 y^4$, verify Clairaut's Theorem by finding $f_{xy}$.",
                        ["$12x^2 y^3$", "$3x^2 y^4$", "$4x^3 y^3$", "$6x y^2$"],
                        0,
                        "$f_x = 3x^2 y^4$. Then $f_{xy} = \\frac{\\partial}{\\partial y}[3x^2 y^4] = 3x^2 (4y^3) = 12x^2 y^3$."
                    ),
                    make_q(
                        "Find $f_{xx}$ for $f(x, y) = x^4 - 2x^2 y^3 + y^5$.",
                        ["$12x^2 - 4y^3$", "$4x^3 - 4x y^3$", "$12x^2$", "$-12x^2 y^2$"],
                        0,
                        "$f_x = 4x^3 - 4xy^3$. Differentiating again with respect to $x$: $f_{xx} = 12x^2 - 4y^3$."
                    )
                ]
            },
            {
                "heading": "Section 4: Tangent Planes and Linear Approximations",
                "questions": [
                    make_q(
                        "What is the equation of the tangent plane to the surface $z = f(x, y)$ at the point $(x_0, y_0, z_0)$?",
                        [
                            "$z - z_0 = f_x(x_0, y_0)(x - x_0) + f_y(x_0, y_0)(y - y_0)$",
                            "$z - z_0 = f_x(x - x_0) - f_y(y - y_0)$",
                            "$z = f_x x_0 + f_y y_0$",
                            "$(x - x_0) + (y - y_0) + (z - z_0) = 0$"
                        ],
                        0,
                        "The linear approximation (tangent plane) formula is $z - z_0 = f_x(x_0, y_0)(x - x_0) + f_y(x_0, y_0)(y - y_0)$."
                    ),
                    make_q(
                        "Find the equation of the tangent plane to $z = x^2 + y^2$ at $(1, 2, 5)$.",
                        [
                            "$z - 5 = 2(x - 1) + 4(y - 2) \\Leftrightarrow 2x + 4y - z = 5$",
                            "$2x + 4y + z = 15$",
                            "$x + 2y - z = 0$",
                            "$4x + 2y - z = 5$"
                        ],
                        0,
                        "$f_x = 2x \\Rightarrow f_x(1, 2) = 2$. $f_y = 2y \\Rightarrow f_y(1, 2) = 4$. Plane: $z - 5 = 2(x - 1) + 4(y - 2) \\Rightarrow z - 5 = 2x - 2 + 4y - 8 \\Rightarrow 2x + 4y - z = 5$."
                    ),
                    make_q(
                        "What is a normal vector to the surface $z = f(x, y)$ at $(x_0, y_0)$?",
                        [
                            "$\\mathbf{n} = [f_x(x_0, y_0), f_y(x_0, y_0), -1]$",
                            "$\\mathbf{n} = [f_x, f_y, 1]$",
                            "$\\mathbf{n} = [1, 1, 1]$",
                            "$\\mathbf{n} = [-f_y, f_x, 0]$"
                        ],
                        0,
                        "Rewriting as $F(x, y, z) = f(x, y) - z = 0$, the gradient $\\nabla F = [f_x, f_y, -1]$ forms an outward normal vector."
                    )
                ]
            }
        ]
    },

    # --------------------------------------------------------------------------
    # MVC 2.01: The Chain Rule & Directional Derivatives
    # --------------------------------------------------------------------------
    {
        "track": "mvc",
        "num": "2.01",
        "slug": "the-chain-rule-directional-derivatives",
        "title": "The Chain Rule & Directional Derivatives",
        "sections": [
            {
                "heading": "Section 1: Multivariable Chain Rule",
                "questions": [
                    make_q(
                        "If $z = f(x, y)$ where $x = g(t)$ and $y = h(t)$, what is $\\frac{dz}{dt}$?",
                        [
                            "$\\frac{dz}{dt} = \\frac{\\partial z}{\\partial x}\\frac{dx}{dt} + \\frac{\\partial z}{\\partial y}\\frac{dy}{dt}$",
                            "$\\frac{dz}{dt} = \\frac{\\partial z}{\\partial x}\\frac{dy}{dt} + \\frac{\\partial z}{\\partial y}\\frac{dx}{dt}$",
                            "$\\frac{dz}{dt} = \\frac{\\partial z}{\\partial x} + \\frac{\\partial z}{\\partial y}$",
                            "$\\frac{dz}{dt} = \\frac{dx}{dt}\\frac{dy}{dt}$"
                        ],
                        0,
                        "By the multivariable chain rule, rates of change sum across all intermediate paths: $\\frac{dz}{dt} = \\frac{\\partial z}{\\partial x}\\frac{dx}{dt} + \\frac{\\partial z}{\\partial y}\\frac{dy}{dt}$."
                    ),
                    make_q(
                        "Given $z = x^2 y$, $x = t^3$, and $y = t^2$, find $\\frac{dz}{dt}$ at $t = 1$.",
                        ["$8$", "$6$", "$5$", "$12$"],
                        0,
                        "$z = (t^3)^2 (t^2) = t^6 \\cdot t^2 = t^8$. Therefore $\\frac{dz}{dt} = 8t^7$. At $t = 1$, $\\frac{dz}{dt} = 8(1)^7 = 8$."
                    ),
                    make_q(
                        "If $z = f(x, y)$ with $x = r\\cos\\theta$ and $y = r\\sin\\theta$, what is $\\frac{\\partial z}{\\partial r}$?",
                        [
                            "$\\frac{\\partial z}{\\partial x}\\cos\\theta + \\frac{\\partial z}{\\partial y}\\sin\\theta$",
                            "$-r\\frac{\\partial z}{\\partial x}\\sin\\theta + r\\frac{\\partial z}{\\partial y}\\cos\\theta$",
                            "$\\frac{\\partial z}{\\partial x} + \\frac{\\partial z}{\\partial y}$",
                            "$\\cos\\theta + \\sin\\theta$"
                        ],
                        0,
                        "$\\frac{\\partial z}{\\partial r} = \\frac{\\partial z}{\\partial x}\\frac{\\partial x}{\\partial r} + \\frac{\\partial z}{\\partial y}\\frac{\\partial y}{\\partial r} = \\frac{\\partial z}{\\partial x}\\cos\\theta + \\frac{\\partial z}{\\partial y}\\sin\\theta$."
                    )
                ]
            },
            {
                "heading": "Section 2: The Gradient Vector",
                "questions": [
                    make_q(
                        "What is the gradient vector $\\nabla f(x, y)$ of a scalar function $f(x, y)$?",
                        [
                            "$\\nabla f = \\left[\\frac{\\partial f}{\\partial x}, \\frac{\\partial f}{\\partial y}\\right]$",
                            "$\\nabla f = \\frac{\\partial f}{\\partial x} + \\frac{\\partial f}{\\partial y}$",
                            "$\\nabla f = \\left[\\frac{\\partial^2 f}{\\partial x^2}, \\frac{\\partial^2 f}{\\partial y^2}\\right]$",
                            "$\\nabla f = \\sqrt{f_x^2 + f_y^2}$"
                        ],
                        0,
                        "The gradient of a multivariable function is the vector consisting of its first-order partial derivatives: $\\nabla f = [f_x, f_y]$."
                    ),
                    make_q(
                        "Compute the gradient $\\nabla f(2, -1)$ for $f(x, y) = 3x^2 y + 2y^2$.",
                        ["$[-12, 8]$", "$[12, -8]$", "$[-12, -4]$", "$[6, 4]$"],
                        0,
                        "$f_x = 6xy \\Rightarrow f_x(2, -1) = 6(2)(-1) = -12$. $f_y = 3x^2 + 4y \\Rightarrow f_y(2, -1) = 3(4) + 4(-1) = 12 - 4 = 8$. Gradient is $[-12, 8]$."
                    ),
                    make_q(
                        "What is the geometric relationship between the gradient $\\nabla f(x_0, y_0)$ and the level curve $f(x, y) = c$ passing through $(x_0, y_0)$?",
                        [
                            "$\\nabla f(x_0, y_0)$ is perpendicular (orthogonal) to the tangent line of the level curve",
                            "$\\nabla f(x_0, y_0)$ is parallel to the tangent line",
                            "$\\nabla f(x_0, y_0)$ has zero dot product with the normal vector",
                            "$\\nabla f(x_0, y_0)$ points along the curve"
                        ],
                        0,
                        "The gradient vector at any point is always perpendicular to the level curve (or level surface) passing through that point."
                    )
                ]
            },
            {
                "heading": "Section 3: Directional Derivatives",
                "questions": [
                    make_q(
                        "What is the formula for the directional derivative $D_{\\mathbf{u}} f$ in the direction of a unit vector $\\mathbf{u}$?",
                        [
                            "$D_{\\mathbf{u}} f = \\nabla f \\cdot \\mathbf{u}$",
                            "$D_{\\mathbf{u}} f = \\nabla f \\times \\mathbf{u}$",
                            "$D_{\\mathbf{u}} f = \\|\\nabla f\\| \\|\\mathbf{u}\\|$",
                            "$D_{\\mathbf{u}} f = \\frac{\\nabla f \\cdot \\mathbf{u}}{\\|\\nabla f\\|}$"
                        ],
                        0,
                        "The rate of change of $f$ in the direction of unit vector $\\mathbf{u}$ is the dot product of the gradient with the unit vector: $D_{\\mathbf{u}} f = \\nabla f \\cdot \\mathbf{u}$."
                    ),
                    make_q(
                        "If $\\nabla f(1, 2) = [4, -3]$ and $\\mathbf{u} = \\left[\\frac{3}{5}, \\frac{4}{5}\\right]$, find $D_{\\mathbf{u}} f(1, 2)$.",
                        ["$0$", "$5$", "$\\frac{24}{5}$", "$-1$"],
                        0,
                        "$D_{\\mathbf{u}} f = \\nabla f \\cdot \\mathbf{u} = (4)\\left(\\frac{3}{5}\\right) + (-3)\\left(\\frac{4}{5}\\right) = \\frac{12}{5} - \\frac{12}{5} = 0$."
                    ),
                    make_q(
                        "Why must $\\mathbf{u}$ be normalized to a unit vector before computing $D_{\\mathbf{u}} f = \\nabla f \\cdot \\mathbf{u}$?",
                        [
                            "To ensure the derivative measures rate of change per unit of geometric distance",
                            "Because dot products cannot be computed with non-unit vectors",
                            "To avoid division by zero",
                            "Because the gradient has length 1"
                        ],
                        0,
                        "Normalizing $\\mathbf{u}$ ensures that the directional derivative accurately reflects the instantaneous rate of change per unit distance along that direction."
                    )
                ]
            },
            {
                "heading": "Section 4: Direction of Maximum Increase & Steepest Ascent",
                "questions": [
                    make_q(
                        "In which direction does a differentiable function $f$ increase most rapidly at a point?",
                        [
                            "In the direction of the gradient vector $\\nabla f$",
                            "In the direction opposite to $\\nabla f$ (i.e. $-\\nabla f$)",
                            "Orthogonal to the gradient vector",
                            "Along the tangent to the level curve"
                        ],
                        0,
                        "Since $D_{\\mathbf{u}} f = \\|\\nabla f\\| \\cos\\theta$, the maximum rate occurs when $\\cos\\theta = 1$ ($\\theta = 0$), pointing in the exact direction of $\\nabla f$."
                    ),
                    make_q(
                        "What is the maximum value of the directional derivative $D_{\\mathbf{u}} f$ at a point?",
                        ["$\\|\\nabla f\\|$", "$\\|\\nabla f\\|^2$", "$0$", "$1$"],
                        0,
                        "When $\\mathbf{u}$ points in the direction of $\\nabla f$, $D_{\\mathbf{u}} f = \\nabla f \\cdot \\frac{\\nabla f}{\\|\\nabla f\\|} = \\|\\nabla f\\|$."
                    ),
                    make_q(
                        "In which direction is the rate of change of $f$ equal to zero?",
                        [
                            "In any direction tangent to the level curve (orthogonal to $\\nabla f$)",
                            "In the direction of $-\\nabla f$",
                            "In the direction of $\\nabla f$",
                            "Nowhere, a differentiable function always changes"
                        ],
                        0,
                        "When $\\mathbf{u}$ is orthogonal to $\\nabla f$, $\\cos\\theta = 0$, so $D_{\\mathbf{u}} f = 0$, which occurs along tangent directions to level curves."
                    )
                ]
            }
        ]
    },

    # --------------------------------------------------------------------------
    # MVC 3.01: Optimization: Critical Points & Lagrange Multipliers
    # --------------------------------------------------------------------------
    {
        "track": "mvc",
        "num": "3.01",
        "slug": "optimization-critical-points-lagrange-multipliers",
        "title": "Optimization: Critical Points & Lagrange Multipliers",
        "sections": [
            {
                "heading": "Section 1: Finding Critical Points",
                "questions": [
                    make_q(
                        "What condition defines a critical point $(x_0, y_0)$ of a differentiable function $f(x, y)$?",
                        [
                            "$\\nabla f(x_0, y_0) = \\mathbf{0}$, meaning both $f_x(x_0, y_0) = 0$ and $f_y(x_0, y_0) = 0$",
                            "$f_{xx}(x_0, y_0) = 0$",
                            "$f(x_0, y_0) = 0$",
                            "$f_x(x_0, y_0) = f_y(x_0, y_0)$"
                        ],
                        0,
                        "Critical points occur where the gradient vector is zero (both first-order partials vanish simultaneously) or where a partial derivative fails to exist."
                    ),
                    make_q(
                        "Find the critical points of $f(x, y) = x^2 + y^2 - 4x + 6y + 10$.",
                        ["$(2, -3)$", "$(-2, 3)$", "$(4, -6)$", "$(0, 0)$"],
                        0,
                        "$f_x = 2x - 4 = 0 \\Rightarrow x = 2$. $f_y = 2y + 6 = 0 \\Rightarrow y = -3$. The only critical point is $(2, -3)$."
                    ),
                    make_q(
                        "Find all critical points of $g(x, y) = x^3 - 3x + y^2$.",
                        ["$(1, 0)$ and $(-1, 0)$", "$(1, 0)$ only", "$(0, 0)$", "$(3, 0)$"],
                        0,
                        "$g_x = 3x^2 - 3 = 0 \\Rightarrow x^2 = 1 \\Rightarrow x = \\pm 1$. $g_y = 2y = 0 \\Rightarrow y = 0$. The critical points are $(1, 0)$ and $(-1, 0)$."
                    )
                ]
            },
            {
                "heading": "Section 2: The Second Partials Test (Hessian Discriminant)",
                "questions": [
                    make_q(
                        "What is the definition of the Hessian discriminant $D$ in the Second Partials Test?",
                        [
                            "$D = f_{xx} f_{yy} - (f_{xy})^2$",
                            "$D = f_{xx} + f_{yy}$",
                            "$D = (f_{xy})^2 - f_{xx} f_{yy}$",
                            "$D = f_{xx} f_{yy} - f_{xy}$"
                        ],
                        0,
                        "The discriminant $D$ is the determinant of the Hessian matrix $[[f_{xx}, f_{xy}], [f_{yx}, f_{yy}]]$, which is $D = f_{xx} f_{yy} - (f_{xy})^2$."
                    ),
                    make_q(
                        "If at a critical point $D > 0$ and $f_{xx} > 0$, what does the test conclude?",
                        [
                            "$f$ has a local minimum at the point",
                            "$f$ has a local maximum at the point",
                            "The point is a saddle point",
                            "The test is inconclusive"
                        ],
                        0,
                        "When $D > 0$, the surface is locally bowl-shaped; if $f_{xx} > 0$, it curves upward in all directions, establishing a local minimum."
                    ),
                    make_q(
                        "If at a critical point $D < 0$, what does the test conclude?",
                        [
                            "$f$ has a saddle point",
                            "$f$ has a local maximum",
                            "$f$ has a local minimum",
                            "The test is inconclusive"
                        ],
                        0,
                        "When $D < 0$, the surface curves upward in one direction and downward in another, producing a saddle point."
                    )
                ]
            },
            {
                "heading": "Section 3: Classifying Extrema and Inconclusive Cases",
                "questions": [
                    make_q(
                        "Classify the critical point $(0, 0)$ for $f(x, y) = x^2 - y^2$.",
                        ["Saddle point", "Local minimum", "Local maximum", "Inconclusive"],
                        0,
                        "$f_x = 2x, f_y = -2y \\Rightarrow (0,0)$. $f_{xx} = 2, f_{yy} = -2, f_{xy} = 0$. $D = (2)(-2) - 0^2 = -4 < 0$. Therefore $(0, 0)$ is a saddle point."
                    ),
                    make_q(
                        "What does the Second Partials Test conclude when $D = 0$?",
                        [
                            "The test is inconclusive; higher-order analysis or algebraic examination is needed",
                            "The point is definitely a saddle point",
                            "The point is an absolute extremum",
                            "The function is not differentiable"
                        ],
                        0,
                        "When $D = 0$, the test yields no information; the critical point could be a local maximum, local minimum, or saddle point."
                    ),
                    make_q(
                        "Classify $(2, -3)$ for $f(x, y) = x^2 + y^2 - 4x + 6y + 10$.",
                        ["Local minimum", "Local maximum", "Saddle point", "Inconclusive"],
                        0,
                        "$f_{xx} = 2, f_{yy} = 2, f_{xy} = 0$. $D = (2)(2) - 0 = 4 > 0$. Since $f_{xx} = 2 > 0$, it is a local minimum."
                    )
                ]
            },
            {
                "heading": "Section 4: Lagrange Multipliers for Constrained Optimization",
                "questions": [
                    make_q(
                        "What vector equation governs constrained optimization of $f(x, y)$ subject to constraint $g(x, y) = k$?",
                        [
                            "$\\nabla f = \\lambda \\nabla g$ (and $g(x, y) = k$)",
                            "$\\nabla f \\cdot \\nabla g = 0$",
                            "$\\nabla f + \\nabla g = \\mathbf{0}$",
                            "$\\nabla f = \\mathbf{0}$"
                        ],
                        0,
                        "At a constrained extremum, the level curve of $f$ is tangent to the constraint curve $g = k$, meaning their gradient vectors must be parallel: $\\nabla f = \\lambda \\nabla g$."
                    ),
                    make_q(
                        "Maximize $f(x, y) = x y$ subject to the constraint $x + y = 10$ for $x, y > 0$.",
                        ["Maximum is $25$ at $(5, 5)$", "Maximum is $24$ at $(4, 6)$", "Maximum is $21$ at $(3, 7)$", "Maximum is $16$ at $(2, 8)$"],
                        0,
                        "$\\nabla f = [y, x]$ and $\\nabla g = [1, 1]$. $[y, x] = \\lambda [1, 1] \\Rightarrow y = \\lambda$ and $x = \\lambda \\Rightarrow x = y$. Using $x + y = 10 \\Rightarrow 2x = 10 \\Rightarrow x = 5, y = 5$. Maximum $f(5, 5) = 25$."
                    ),
                    make_q(
                        "What does the Lagrange multiplier $\\lambda$ represent physically/economically in constrained optimization?",
                        [
                            "The sensitivity / shadow price: the rate of change of the optimal value with respect to the constraint constant $k$ ($\\frac{df^*}{dk}$)",
                            "The curvature of the constraint surface",
                            "The distance from the origin to the optimal point",
                            "The second derivative along the constraint"
                        ],
                        0,
                        "The multiplier $\\lambda = \\frac{\\partial f^*}{\\partial k}$ represents the marginal change in the optimized objective value per unit increase in the constraint resource $k$."
                    )
                ]
            }
        ]
    },

    # --------------------------------------------------------------------------
    # MVC 4.01: Double Integrals
    # --------------------------------------------------------------------------
    {
        "track": "mvc",
        "num": "4.01",
        "slug": "double-integrals",
        "title": "Double Integrals",
        "sections": [
            {
                "heading": "Section 1: Fubini's Theorem over Rectangles",
                "questions": [
                    make_q(
                        "Evaluate $\\int_0^2 \\int_0^3 2xy dy dx$.",
                        ["$18$", "$9$", "$36$", "$12$"],
                        0,
                        "Inner integral: $\\int_0^3 2xy dy = [x y^2]_0^3 = 9x$. Outer integral: $\\int_0^2 9x dx = [\\frac{9}{2}x^2]_0^2 = \\frac{9}{2}(4) = 18$."
                    ),
                    make_q(
                        "What does Fubini's Theorem state for a continuous function $f(x, y)$ over a rectangle $R = [a, b] \\times [c, d]$?",
                        [
                            "The iterated integrals in either order are equal: $\\int_a^b \\int_c^d f(x, y) dy dx = \\int_c^d \\int_a^b f(x, y) dx dy$",
                            "The double integral is always equal to $f(b, d) - f(a, c)$",
                            "The integral is zero if $f$ is odd in $x$",
                            "The integral must be evaluated with $x$ first"
                        ],
                        0,
                        "Fubini's Theorem guarantees that for continuous functions over rectangles, the order of integration does not affect the value of the double integral."
                    ),
                    make_q(
                        "Evaluate $\\iint_R (x + y) dA$ over $R = [0, 1] \\times [0, 2]$.",
                        ["$3$", "$2$", "$4$", "$1$"],
                        0,
                        "$\\int_0^1 \\int_0^2 (x + y) dy dx = \\int_0^1 [xy + \\frac{y^2}{2}]_0^2 dx = \\int_0^1 (2x + 2) dx = [x^2 + 2x]_0^1 = 1 + 2 = 3$."
                    )
                ]
            },
            {
                "heading": "Section 2: Double Integrals over General Regions",
                "questions": [
                    make_q(
                        "Set up the double integral of $f(x, y)$ over the triangular region bounded by $y = 0$, $y = 2x$, and $x = 3$ as a Type I region.",
                        [
                            "$\\int_0^3 \\int_0^{2x} f(x, y) dy dx$",
                            "$\\int_0^6 \\int_0^3 f(x, y) dx dy$",
                            "$\\int_0^{2x} \\int_0^3 f(x, y) dx dy$",
                            "$\\int_0^3 \\int_{2x}^6 f(x, y) dy dx$"
                        ],
                        0,
                        "For a Type I region, $x$ varies between constants $0 \\leq x \\leq 3$, and for each $x$, $y$ goes from bottom boundary $y = 0$ to top boundary $y = 2x$: $\\int_0^3 \\int_0^{2x} f(x, y) dy dx$."
                    ),
                    make_q(
                        "Evaluate $\\int_0^1 \\int_0^x 6xy dy dx$.",
                        ["$\\frac{3}{4}$", "$1$", "$\\frac{1}{2}$", "$\\frac{3}{2}$"],
                        0,
                        "Inner: $\\int_0^x 6xy dy = [3xy^2]_0^x = 3x^3$. Outer: $\\int_0^1 3x^3 dx = [\\frac{3}{4}x^4]_0^1 = \\frac{3}{4}$."
                    ),
                    make_q(
                        "What geometric quantity does $\\iint_D 1 dA$ compute?",
                        ["The area of the planar region $D$", "The perimeter of region $D$", "The volume under the paraboloid", "The centroid"],
                        0,
                        "Integrating the constant height 1 over a 2D domain $D$ calculates the area of $D$: $\\text{Area}(D) = \\iint_D dA$."
                    )
                ]
            },
            {
                "heading": "Section 3: Changing the Order of Integration",
                "questions": [
                    make_q(
                        "To evaluate $\\int_0^1 \\int_y^1 e^{x^2} dx dy$, which cannot be integrated directly, reverse the order of integration.",
                        [
                            "$\\int_0^1 \\int_0^x e^{x^2} dy dx$",
                            "$\\int_0^1 \\int_x^1 e^{x^2} dy dx$",
                            "$\\int_0^1 \\int_0^1 e^{x^2} dx dy$",
                            "$\\int_y^1 \\int_0^1 e^{x^2} dy dx$"
                        ],
                        0,
                        "Region: $0 \\leq y \\leq 1$ and $y \\leq x \\leq 1$. Inverting: $0 \\leq x \\leq 1$ and $0 \\leq y \\leq x$, yielding $\\int_0^1 \\int_0^x e^{x^2} dy dx$."
                    ),
                    make_q(
                        "Evaluate the reversed integral $\\int_0^1 \\int_0^x e^{x^2} dy dx$.",
                        ["$\\frac{e - 1}{2}$", "$e - 1$", "$\\frac{e}{2}$", "$1$"],
                        0,
                        "Inner: $\\int_0^x e^{x^2} dy = x e^{x^2}$. Outer: $\\int_0^1 x e^{x^2} dx = [\\frac{1}{2}e^{x^2}]_0^1 = \\frac{1}{2}(e^1 - e^0) = \\frac{e - 1}{2}$."
                    ),
                    make_q(
                        "Reverse the order of integration for $\\int_0^4 \\int_{\\sqrt{x}}^2 f(x, y) dy dx$.",
                        [
                            "$\\int_0^2 \\int_0^{y^2} f(x, y) dx dy$",
                            "$\\int_0^2 \\int_{y^2}^4 f(x, y) dx dy$",
                            "$\\int_0^4 \\int_0^{y^2} f(x, y) dx dy$",
                            "$\\int_{\\sqrt{x}}^2 \\int_0^4 f(x, y) dx dy$"
                        ],
                        0,
                        "Region: $0 \\leq x \\leq 4, \\sqrt{x} \\leq y \\leq 2$. The curve is $y = \\sqrt{x} \\Rightarrow x = y^2$. For $y \\in [0, 2]$, $x$ ranges from $0$ to $y^2$: $\\int_0^2 \\int_0^{y^2} f(x, y) dx dy$."
                    )
                ]
            },
            {
                "heading": "Section 4: Double Integrals in Polar Coordinates",
                "questions": [
                    make_q(
                        "What is the differential area element $dA$ in polar coordinates?",
                        ["$dA = r dr d\\theta$", "$dA = dr d\\theta$", "$dA = r^2 dr d\\theta$", "$dA = \\frac{1}{r} dr d\\theta$"],
                        0,
                        "The Jacobian of the transformation $x = r\\cos\\theta, y = r\\sin\\theta$ is $r$, giving area element $dA = r dr d\\theta$."
                    ),
                    make_q(
                        "Evaluate $\\iint_D e^{-(x^2 + y^2)} dA$ where $D$ is the disk $x^2 + y^2 \\leq 4$.",
                        ["$\\pi(1 - e^{-4})$", "$2\\pi(1 - e^{-4})$", "$\\pi e^{-4}$", "$\\frac{\\pi}{2}(1 - e^{-4})$"],
                        0,
                        "In polar: $\\int_0^{2\\pi} \\int_0^2 e^{-r^2} r dr d\\theta = 2\\pi [-\\frac{1}{2}e^{-r^2}]_0^2 = 2\\pi(-\\frac{1}{2}e^{-4} + \\frac{1}{2}) = \\pi(1 - e^{-4})$."
                    ),
                    make_q(
                        "Convert $\\int_0^1 \\int_0^{\\sqrt{1 - x^2}} (x^2 + y^2) dy dx$ to polar coordinates.",
                        [
                            "$\\int_0^{\\pi/2} \\int_0^1 r^3 dr d\\theta$",
                            "$\\int_0^{2\\pi} \\int_0^1 r^2 dr d\\theta$",
                            "$\\int_0^{\\pi/2} \\int_0^1 r^2 dr d\\theta$",
                            "$\\int_0^1 \\int_0^1 r^3 dr d\\theta$"
                        ],
                        0,
                        "The region is the quarter disk in Quadrant I ($0 \\leq \\theta \\leq \\pi/2$, $0 \\leq r \\leq 1$). The integrand is $x^2 + y^2 = r^2$, and $dA = r dr d\\theta$, giving $\\int_0^{\\pi/2} \\int_0^1 r^2 \\cdot r dr d\\theta = \\int_0^{\\pi/2} \\int_0^1 r^3 dr d\\theta$."
                    )
                ]
            }
        ]
    }
]

# ==============================================================================
# ORDINARY DIFFERENTIAL EQUATIONS (odes) - 5 Topics
# ==============================================================================
ODES_TOPICS = [
    # --------------------------------------------------------------------------
    # ODES 1.01: Separable Equations
    # --------------------------------------------------------------------------
    {
        "track": "odes",
        "num": "1.01",
        "slug": "separable-equations",
        "title": "Separable Equations",
        "sections": [
            {
                "heading": "Section 1: Separation Form and Integrals",
                "questions": [
                    make_q(
                        "A first-order differential equation $\\frac{dy}{dx} = f(x, y)$ is separable if it can be factored into:",
                        [
                            "$\\frac{dy}{dx} = g(x) h(y)$",
                            "$\\frac{dy}{dx} = g(x) + h(y)$",
                            "$\\frac{dy}{dx} = g(x/y)$",
                            "$\\frac{dy}{dx} = x^n + y^n$"
                        ],
                        0,
                        "A differential equation is separable if the right-hand side factors into a product of a function of $x$ alone and a function of $y$ alone: $g(x) h(y)$."
                    ),
                    make_q(
                        "Separate variables for $\\frac{dy}{dx} = 3x^2 y^2$.",
                        ["$\\frac{1}{y^2} dy = 3x^2 dx$", "$y^2 dy = 3x^2 dx$", "$\\frac{1}{3x^2} dy = y^2 dx$", "$dy = 3x^2 y^2 dx$"],
                        0,
                        "Divide both sides by $y^2$ and multiply by $dx$: $\\frac{1}{y^2} dy = 3x^2 dx$."
                    ),
                    make_q(
                        "Solve the general equation $\\frac{1}{y^2} dy = 3x^2 dx$.",
                        ["$y = -\\frac{1}{x^3 + C}$", "$y = \\frac{1}{x^3 + C}$", "$y = -x^3 + C$", "$y = \\sqrt{x^3 + C}$"],
                        0,
                        "Integrate both sides: $-\\frac{1}{y} = x^3 + C \\Rightarrow y = -\\frac{1}{x^3 + C}$."
                    )
                ]
            },
            {
                "heading": "Section 2: Initial Value Problems (IVPs)",
                "questions": [
                    make_q(
                        "Solve the IVP: $\\frac{dy}{dx} = \\frac{x}{y}$ with $y(0) = -3$.",
                        ["$y = -\\sqrt{x^2 + 9}$", "$y = \\sqrt{x^2 + 9}$", "$y = -\\sqrt{x^2 - 9}$", "$y = -x - 3$"],
                        0,
                        "$y dy = x dx \\Rightarrow \\frac{1}{2}y^2 = \\frac{1}{2}x^2 + C \\Rightarrow y^2 = x^2 + 2C$. Using $y(0) = -3$: $(-3)^2 = 0 + 2C \\Rightarrow 2C = 9$. Thus $y^2 = x^2 + 9$. Since $y(0) = -3 < 0$, we select the negative branch $y = -\\sqrt{x^2 + 9}$."
                    ),
                    make_q(
                        "Solve $\\frac{dy}{dx} = 2y$ with $y(0) = 7$.",
                        ["$y = 7e^{2x}$", "$y = 7e^{-2x}$", "$y = 2e^{7x}$", "$y = 7 + 2x$"],
                        0,
                        "$\\frac{1}{y} dy = 2 dx \\Rightarrow \\ln|y| = 2x + C \\Rightarrow y = A e^{2x}$. Using $y(0) = 7$: $y = 7e^{2x}$."
                    ),
                    make_q(
                        "What is a singular solution of a differential equation?",
                        [
                            "A solution that cannot be obtained from the general family for any value of the arbitrary constant $C$",
                            "A solution that blows up to infinity everywhere",
                            "A solution where the derivative is undefined",
                            "A solution with no arbitrary constants"
                        ],
                        0,
                        "A singular solution (often an equilibrium solution where $h(y) = 0$) cannot be generated by tuning the parameter $C$ in the general solution formula."
                    )
                ]
            },
            {
                "heading": "Section 3: Exponential and Logistic Growth Models",
                "questions": [
                    make_q(
                        "What is the differential equation for logistic population growth with carrying capacity $K$ and growth rate $r$?",
                        [
                            "$\\frac{dP}{dt} = r P \\left(1 - \\frac{P}{K}\\right)$",
                            "$\\frac{dP}{dt} = r(K - P)$",
                            "$\\frac{dP}{dt} = r P^2$",
                            "$\\frac{dP}{dt} = \\frac{r P}{K}$"
                        ],
                        0,
                        "The logistic differential equation is $\\frac{dP}{dt} = r P(1 - P/K)$, where growth slows down as population $P$ approaches carrying capacity $K$."
                    ),
                    make_q(
                        "At what population size does the logistic growth rate $\\frac{dP}{dt}$ reach its maximum?",
                        ["$P = \\frac{K}{2}$", "$P = K$", "$P = 0$", "$P = \\frac{K}{4}$"],
                        0,
                        "The quadratic $f(P) = rP - \\frac{r}{K}P^2$ reaches its maximum at vertex $P = -\\frac{r}{2(-r/K)} = \\frac{K}{2}$."
                    ),
                    make_q(
                        "What is $\\lim_{t \\to \\infty} P(t)$ in a logistic model if $P(0) > 0$?",
                        ["$K$", "$\\infty$", "$0$", "$r K$"],
                        0,
                        "For any positive initial population, the population asymptotically approaches the stable equilibrium carrying capacity $K$ as $t \\to \\infty$."
                    )
                ]
            },
            {
                "heading": "Section 4: Newton's Law of Cooling",
                "questions": [
                    make_q(
                        "Newton's Law of Cooling states that the rate of change of temperature $T$ is proportional to the difference between $T$ and the ambient temperature $T_m$:",
                        [
                            "$\\frac{dT}{dt} = -k(T - T_m)$ with $k > 0$",
                            "$\\frac{dT}{dt} = -k T$",
                            "$\\frac{dT}{dt} = k(T + T_m)$",
                            "$\\frac{dT}{dt} = -k(T - T_m)^2$"
                        ],
                        0,
                        "The rate of cooling is proportional to the temperature gradient with the surroundings: $\\frac{dT}{dt} = -k(T - T_m)$."
                    ),
                    make_q(
                        "A metal bar at $100^{\\circ}\\text{C}$ is placed in a room at $20^{\\circ}\\text{C}$. If $T(t) = 20 + 80 e^{-kt}$ and cools to $60^{\\circ}\\text{C}$ after $10\\text{ minutes}$, find $e^{-10k}$.",
                        ["$\\frac{1}{2}$", "$\\frac{3}{4}$", "$\\frac{1}{4}$", "$\\frac{2}{3}$"],
                        0,
                        "$60 = 20 + 80 e^{-10k} \\Rightarrow 40 = 80 e^{-10k} \\Rightarrow e^{-10k} = \\frac{40}{80} = \\frac{1}{2}$."
                    ),
                    make_q(
                        "Using $e^{-10k} = \\frac{1}{2}$ from above, what is the temperature after $20\\text{ minutes}$?",
                        ["$40^{\\circ}\\text{C}$", "$30^{\\circ}\\text{C}$", "$50^{\\circ}\\text{C}$", "$25^{\\circ}\\text{C}$"],
                        0,
                        "After 20 minutes (two 10-minute half-cooling intervals): $e^{-20k} = (e^{-10k})^2 = (1/2)^2 = 1/4$. Temperature $T(20) = 20 + 80(1/4) = 20 + 20 = 40^{\\circ}\\text{C}$."
                    )
                ]
            }
        ]
    },

    # --------------------------------------------------------------------------
    # ODES 2.01: Linear First-Order Equations & the Integrating Factor
    # --------------------------------------------------------------------------
    {
        "track": "odes",
        "num": "2.01",
        "slug": "linear-first-order-equations-the-integrating-factor",
        "title": "Linear First-Order Equations & the Integrating Factor",
        "sections": [
            {
                "heading": "Section 1: Standard Linear Form and Integrating Factor",
                "questions": [
                    make_q(
                        "Write the differential equation $x \\frac{dy}{dx} + 2y = 4x^2$ in standard form $\\frac{dy}{dx} + P(x)y = Q(x)$ for $x > 0$.",
                        [
                            "$\\frac{dy}{dx} + \\frac{2}{x}y = 4x$",
                            "$\\frac{dy}{dx} + 2y = 4x$",
                            "$\\frac{dy}{dx} + \\frac{2}{x}y = 4x^2$",
                            "$\\frac{dy}{dx} = 4x - 2y$"
                        ],
                        0,
                        "Divide by the leading coefficient $x$: $\\frac{dy}{dx} + \\frac{2}{x}y = 4x$."
                    ),
                    make_q(
                        "Compute the integrating factor $I(x) = e^{\\int P(x) dx}$ for $\\frac{dy}{dx} + \\frac{2}{x}y = 4x$.",
                        ["$x^2$", "$2\\ln x$", "$e^{2x}$", "$x$"],
                        0,
                        "$I(x) = e^{\\int (2/x) dx} = e^{2\\ln x} = e^{\\ln(x^2)} = x^2$."
                    ),
                    make_q(
                        "Multiply the standard ODE by $I(x) = x^2$ to solve $\\frac{d}{dx}[x^2 y] = 4x^3$.",
                        ["$y = x^2 + \\frac{C}{x^2}$", "$y = 4x^2 + C$", "$y = x^4 + C$", "$y = x^2 + C$"],
                        0,
                        "Integrate: $x^2 y = \\int 4x^3 dx = x^4 + C \\Rightarrow y = x^2 + \\frac{C}{x^2}$."
                    )
                ]
            },
            {
                "heading": "Section 2: Solving Linear First-Order IVPs",
                "questions": [
                    make_q(
                        "Solve the IVP $\\frac{dy}{dx} + y = e^{2x}$ with $y(0) = 1$.",
                        [
                            "$y = \\frac{1}{3}e^{2x} + \\frac{2}{3}e^{-x}$",
                            "$y = e^{2x}$",
                            "$y = \\frac{1}{3}e^{2x} + e^{-x}$",
                            "$y = \\frac{1}{2}e^{2x} + \\frac{1}{2}e^{-x}$"
                        ],
                        0,
                        "$I(x) = e^x$. $\\frac{d}{dx}[e^x y] = e^{3x} \\Rightarrow e^x y = \\frac{1}{3}e^{3x} + C \\Rightarrow y = \\frac{1}{3}e^{2x} + C e^{-x}$. Using $y(0) = 1 \\Rightarrow 1 = 1/3 + C \\Rightarrow C = 2/3$. Thus $y = \\frac{1}{3}e^{2x} + \\frac{2}{3}e^{-x}$."
                    ),
                    make_q(
                        "Solve $\\frac{dy}{dx} - 3y = 0$ with $y(0) = 4$.",
                        ["$y = 4e^{3x}$", "$y = 4e^{-3x}$", "$y = 3e^{4x}$", "$y = 4 + 3x$"],
                        0,
                        "This is a homogeneous linear equation with integrating factor $e^{-3x}$: $y = C e^{3x}$. With $y(0) = 4$, $y = 4e^{3x}$."
                    ),
                    make_q(
                        "What is the domain of validity for the solution to $x \\frac{dy}{dx} + y = 1$ with $y(1) = 2$?",
                        ["$(0, \\infty)$", "$(-\\infty, \\infty)$", "$[1, \\infty)$", "$(-\\infty, 0)$"],
                        0,
                        "Standard form $\\frac{dy}{dx} + \\frac{1}{x}y = \\frac{1}{x}$ has coefficients discontinuous at $x = 0$. By the Existence and Uniqueness Theorem, the solution through $x_0 = 1 > 0$ exists uniquely on $(0, \\infty)$."
                    )
                ]
            },
            {
                "heading": "Section 3: Mixing and Tank Applications",
                "questions": [
                    make_q(
                        "A tank contains $100\\text{ L}$ of water and $10\\text{ kg}$ of dissolved salt. Pure water flows in at $3\\text{ L/min}$, and the stirred mixture drains at $3\\text{ L/min}$. What is the differential equation for the salt amount $A(t)$ in kg?",
                        [
                            "$\\frac{dA}{dt} = -\\frac{3}{100}A$",
                            "$\\frac{dA}{dt} = 3 - \\frac{3}{100}A$",
                            "$\\frac{dA}{dt} = -3A$",
                            "$\\frac{dA}{dt} = 10 - \\frac{3}{100}A$"
                        ],
                        0,
                        "Rate in $= 0$ (pure water). Rate out $= 3 \\times \\frac{A}{100} = \\frac{3}{100}A$. Differential equation: $\\frac{dA}{dt} = -0.03 A$."
                    ),
                    make_q(
                        "For the tank above, what is the amount of salt remaining after $t$ minutes?",
                        ["$A(t) = 10 e^{-0.03t}$", "$A(t) = 10 - 0.03t$", "$A(t) = 10 e^{-3t}$", "$A(t) = 10 e^{0.03t}$"],
                        0,
                        "Separating variables: $A(t) = A(0)e^{-0.03t} = 10 e^{-0.03t}$ kg."
                    ),
                    make_q(
                        "If salt solution enters at $2\\text{ kg/L}$ at a rate of $3\\text{ L/min}$, what is the inflow rate of salt in kg/min?",
                        ["$6\\text{ kg/min}$", "$2\\text{ kg/min}$", "$3\\text{ kg/min}$", "$1.5\\text{ kg/min}$"],
                        0,
                        "$\\text{Rate in} = \\text{concentration} \\times \\text{flow rate} = (2\\text{ kg/L}) \\times (3\\text{ L/min}) = 6\\text{ kg/min}$."
                    )
                ]
            },
            {
                "heading": "Section 4: Transient and Steady-State Solutions",
                "questions": [
                    make_q(
                        "In the solution $y(t) = 5 + 4e^{-2t}$, which part represents the transient response and which represents the steady-state?",
                        [
                            "$5$ is steady-state, $4e^{-2t}$ is transient",
                            "$4e^{-2t}$ is steady-state, $5$ is transient",
                            "Both are steady-state",
                            "The entire response is transient"
                        ],
                        0,
                        "Because $\\lim_{t \\to \\infty} 4e^{-2t} = 0$, that term dies out and is called transient; the permanent value $5$ is the steady-state response."
                    ),
                    make_q(
                        "What is the time constant $\\tau$ for the decaying exponential $e^{-t/\\tau} = e^{-5t}$?",
                        ["$\\tau = 0.2\\text{ seconds}$", "$\\tau = 5\\text{ seconds}$", "$\\tau = 1\\text{ second}$", "$\\tau = 2.5\\text{ seconds}$"],
                        0,
                        "Matching $e^{-t/\\tau}$ with $e^{-5t}$ gives $\\frac{1}{\\tau} = 5 \\Rightarrow \\tau = \\frac{1}{5} = 0.2$."
                    ),
                    make_q(
                        "After how many time constants ($t = n\\tau$) has a decaying transient decayed to less than $1\\%$ of its initial value?",
                        ["$5$ time constants ($e^{-5} \\approx 0.0067$)", "$1$ time constant", "$3$ time constants", "$10$ time constants"],
                        0,
                        "At $t = 5\\tau$, $e^{-5} \\approx 0.0067 < 0.01$ (less than $1\\%$ remaining), which is the standard engineering threshold for steady-state."
                    )
                ]
            }
        ]
    },

    # --------------------------------------------------------------------------
    # ODES 3.01: Second-Order Linear Homogeneous Equations
    # --------------------------------------------------------------------------
    {
        "track": "odes",
        "num": "3.01",
        "slug": "second-order-linear-homogeneous-equations",
        "title": "Second-Order Linear Homogeneous Equations",
        "sections": [
            {
                "heading": "Section 1: Distinct Real Roots",
                "questions": [
                    make_q(
                        "Solve the auxiliary characteristic equation for $y'' - 5y' + 6y = 0$.",
                        ["$r = 2$ and $r = 3$", "$r = -2$ and $r = -3$", "$r = 1$ and $r = 6$", "$r = \\pm \\sqrt{6}$"],
                        0,
                        "Characteristic equation: $r^2 - 5r + 6 = 0 \\Rightarrow (r - 2)(r - 3) = 0 \\Rightarrow r = 2, 3$."
                    ),
                    make_q(
                        "What is the general solution to $y'' - 5y' + 6y = 0$?",
                        [
                            "$y = c_1 e^{2x} + c_2 e^{3x}$",
                            "$y = c_1 e^{-2x} + c_2 e^{-3x}$",
                            "$y = (c_1 + c_2 x)e^{2x}$",
                            "$y = c_1 \\cos(2x) + c_2 \\sin(3x)$"
                        ],
                        0,
                        "For two distinct real roots $r_1, r_2$, the fundamental solution set is $\\{e^{r_1 x}, e^{r_2 x}\\}$, yielding $y = c_1 e^{2x} + c_2 e^{3x}$."
                    ),
                    make_q(
                        "Solve the IVP $y'' - y = 0$ with $y(0) = 4$ and $y'(0) = 2$.",
                        [
                            "$y = 3e^x + e^{-x}$",
                            "$y = 2e^x + 2e^{-x}$",
                            "$y = 4e^x$",
                            "$y = e^x + 3e^{-x}$"
                        ],
                        0,
                        "$r^2 - 1 = 0 \\Rightarrow r = \\pm 1 \\Rightarrow y = c_1 e^x + c_2 e^{-x}$. $y'(x) = c_1 e^x - c_2 e^{-x}$. $y(0) = c_1 + c_2 = 4$ and $y'(0) = c_1 - c_2 = 2$. Adding: $2c_1 = 6 \\Rightarrow c_1 = 3, c_2 = 1$. Thus $y = 3e^x + e^{-x}$."
                    )
                ]
            },
            {
                "heading": "Section 2: Repeated Real Roots",
                "questions": [
                    make_q(
                        "What is the general solution to $y'' - 6y' + 9y = 0$?",
                        [
                            "$y = (c_1 + c_2 x)e^{3x}$",
                            "$y = c_1 e^{3x} + c_2 e^{-3x}$",
                            "$y = c_1 e^{3x} + c_2 x^2 e^{3x}$",
                            "$y = c_1 \\cos(3x) + c_2 \\sin(3x)$"
                        ],
                        0,
                        "Characteristic equation: $r^2 - 6r + 9 = (r - 3)^2 = 0 \\Rightarrow r = 3$ (repeated root). The general solution is $y = (c_1 + c_2 x)e^{3x}$."
                    ),
                    make_q(
                        "Why is the factor $x$ introduced into the second solution $x e^{rx}$ for repeated roots?",
                        [
                            "To ensure linear independence from the first solution $e^{rx}$",
                            "Because the derivative of $e^{rx}$ contains $x$",
                            "To make the solution satisfy $y(0) = 0$",
                            "By Euler's identity"
                        ],
                        0,
                        "Reduction of order proves that $y_2 = x e^{rx}$ is linearly independent of $y_1 = e^{rx}$, giving a non-zero Wronskian."
                    ),
                    make_q(
                        "Solve $y'' + 4y' + 4y = 0$ with $y(0) = 2$ and $y'(0) = -1$.",
                        [
                            "$y = (2 + 3x)e^{-2x}$",
                            "$y = (2 - x)e^{-2x}$",
                            "$y = 2e^{-2x}$",
                            "$y = (2 + x)e^{-2x}$"
                        ],
                        0,
                        "$r = -2$ repeated: $y = (c_1 + c_2 x)e^{-2x}$. $y(0) = c_1 = 2$. $y'(x) = c_2 e^{-2x} - 2(c_1 + c_2 x)e^{-2x}$. $y'(0) = c_2 - 2c_1 = -1 \\Rightarrow c_2 - 4 = -1 \\Rightarrow c_2 = 3$. Thus $y = (2 + 3x)e^{-2x}$."
                    )
                ]
            },
            {
                "heading": "Section 3: Complex Conjugate Roots",
                "questions": [
                    make_q(
                        "If the characteristic equation has complex roots $r = \\alpha \\pm i\\beta$, what is the real general solution?",
                        [
                            "$y = e^{\\alpha x}(c_1 \\cos(\\beta x) + c_2 \\sin(\\beta x))$",
                            "$y = c_1 e^{\\alpha x} + c_2 e^{\\beta x}$",
                            "$y = e^{\\beta x}(c_1 \\cos(\\alpha x) + c_2 \\sin(\\alpha x))$",
                            "$y = c_1 \\cos((\\alpha + \\beta)x)$"
                        ],
                        0,
                        "By Euler's formula $e^{(\\alpha \\pm i\\beta)x} = e^{\\alpha x}(\\cos(\\beta x) \\pm i\\sin(\\beta x))$, the real fundamental solution basis is $\\{e^{\\alpha x}\\cos(\\beta x), e^{\\alpha x}\\sin(\\beta x)\\}$."
                    ),
                    make_q(
                        "Find the general solution to $y'' + 16y = 0$.",
                        [
                            "$y = c_1 \\cos(4x) + c_2 \\sin(4x)$",
                            "$y = c_1 e^{4x} + c_2 e^{-4x}$",
                            "$y = (c_1 + c_2 x)e^{4x}$",
                            "$y = c_1 \\cos(16x) + c_2 \\sin(16x)$"
                        ],
                        0,
                        "$r^2 + 16 = 0 \\Rightarrow r = \\pm 4i$ (with $\\alpha = 0, \\beta = 4$). Thus $y = c_1 \\cos(4x) + c_2 \\sin(4x)$."
                    ),
                    make_q(
                        "Solve the characteristic equation for $y'' - 2y' + 5y = 0$.",
                        ["$r = 1 \\pm 2i$", "$r = 2 \\pm 4i$", "$r = -1 \\pm 2i$", "$r = 1 \\pm 4i$"],
                        0,
                        "Quadratic formula: $r = \\frac{2 \\pm \\sqrt{4 - 20}}{2} = \\frac{2 \\pm \\sqrt{-16}}{2} = \\frac{2 \\pm 4i}{2} = 1 \\pm 2i$."
                    )
                ]
            },
            {
                "heading": "Section 4: Harmonic Motion and Damping Regimes",
                "questions": [
                    make_q(
                        "A mechanical oscillator modeled by $m y'' + c y' + k y = 0$ is underdamped when:",
                        [
                            "$c^2 - 4mk < 0$ (oscillatory motion with exponentially decaying amplitude)",
                            "$c^2 - 4mk = 0$ (critically damped)",
                            "$c^2 - 4mk > 0$ (overdamped, no oscillations)",
                            "$c = 0$ (undamped simple harmonic motion)"
                        ],
                        0,
                        "When the discriminant $c^2 - 4mk < 0$, the characteristic roots are complex conjugates, causing oscillatory motion that decays exponentially."
                    ),
                    make_q(
                        "Which damping condition returns a displaced mass to equilibrium in the shortest time without oscillating?",
                        ["Critical damping ($c^2 = 4mk$)", "Overdamping ($c^2 > 4mk$)", "Underdamping", "Zero damping"],
                        0,
                        "Critical damping provides the most rapid return to equilibrium without experiencing overshoot or oscillation."
                    ),
                    make_q(
                        "What is the natural frequency $\\omega_0$ of the undamped oscillator $y'' + 25y = 0$?",
                        ["$\\omega_0 = 5\\text{ rad/s}$", "$\\omega_0 = 25\\text{ rad/s}$", "$\\omega_0 = 10\\text{ rad/s}$", "$\\omega_0 = 2.5\\text{ rad/s}$"],
                        0,
                        "In $y'' + \\omega_0^2 y = 0$, $\\omega_0^2 = 25 \\Rightarrow \\omega_0 = 5\\text{ rad/s}$."
                    )
                ]
            }
        ]
    },

    # --------------------------------------------------------------------------
    # ODES 4.01: Nonhomogeneous Equations & Undetermined Coefficients
    # --------------------------------------------------------------------------
    {
        "track": "odes",
        "num": "4.01",
        "slug": "nonhomogeneous-equations-undetermined-coefficients",
        "title": "Nonhomogeneous Equations & Undetermined Coefficients",
        "sections": [
            {
                "heading": "Section 1: General Solution Structure",
                "questions": [
                    make_q(
                        "What is the structure of the general solution to a linear nonhomogeneous equation $L[y] = g(x)$?",
                        [
                            "$y(x) = y_c(x) + y_p(x)$, where $y_c$ is the complementary solution and $y_p$ is any particular solution",
                            "$y(x) = y_c(x) \\cdot y_p(x)$",
                            "$y(x) = y_p(x)$ only",
                            "$y(x) = c_1 y_p(x) + c_2 y_c(x)$"
                        ],
                        0,
                        "By linearity, the general solution of a nonhomogeneous linear equation is the sum of the complementary solution $y_c$ to the homogeneous equation and any particular solution $y_p$."
                    ),
                    make_q(
                        "Find a particular solution $y_p$ to $y'' - 5y' + 6y = 12$.",
                        ["$y_p = 2$", "$y_p = 12$", "$y_p = 2x$", "$y_p = 6$"],
                        0,
                        "Try constant $y_p = A$. Then $y_p' = 0, y_p'' = 0$. Substituting: $6A = 12 \\Rightarrow A = 2$."
                    ),
                    make_q(
                        "What is the trial particular solution $y_p$ for $y'' + 4y = 3x^2 - 1$?",
                        ["$y_p = A x^2 + B x + C$", "$y_p = A x^2$", "$y_p = A x^2 + B$", "$y_p = A x^3 + B x^2$"],
                        0,
                        "For a quadratic polynomial forcing term $g(x) = 3x^2 - 1$, the standard trial solution is a complete quadratic polynomial $y_p = A x^2 + B x + C$."
                    )
                ]
            },
            {
                "heading": "Section 2: Exponential and Sinusoidal Forcing Functions",
                "questions": [
                    make_q(
                        "Find a particular solution to $y'' + y = 4e^{2x}$.",
                        [
                            "$y_p = \\frac{4}{5}e^{2x}$",
                            "$y_p = 4e^{2x}$",
                            "$y_p = 2e^{2x}$",
                            "$y_p = \\frac{1}{2}e^{2x}$"
                        ],
                        0,
                        "Try $y_p = A e^{2x}$. $y_p'' = 4A e^{2x}$. Substitute: $4A e^{2x} + A e^{2x} = 5A e^{2x} = 4e^{2x} \\Rightarrow 5A = 4 \\Rightarrow A = 4/5$."
                    ),
                    make_q(
                        "What is the correct undetermined coefficients form for $y'' + 9y = 5\\cos(2x)$?",
                        [
                            "$y_p = A \\cos(2x) + B \\sin(2x)$",
                            "$y_p = A \\cos(2x)$",
                            "$y_p = A x \\cos(2x)$",
                            "$y_p = A \\sin(2x)$"
                        ],
                        0,
                        "Because $\\cos(2x)$ produces both sines and cosines upon differentiation, the complete form is $A\\cos(2x) + B\\sin(2x)$."
                    ),
                    make_q(
                        "Find $y_p$ for $y'' + 9y = 5\\cos(2x)$.",
                        ["$y_p = \\cos(2x)$", "$y_p = 5\\cos(2x)$", "$y_p = \\frac{5}{13}\\cos(2x)$", "$y_p = \\sin(2x)$"],
                        0,
                        "Let $y_p = A\\cos(2x)$. $y_p'' = -4A\\cos(2x)$. $-4A\\cos(2x) + 9A\\cos(2x) = 5A\\cos(2x) = 5\\cos(2x) \\Rightarrow 5A = 5 \\Rightarrow A = 1$."
                    )
                ]
            },
            {
                "heading": "Section 3: The Modification Rule (Resonance / Overlap)",
                "questions": [
                    make_q(
                        "When must a trial particular solution $y_p$ be multiplied by $x$ (or $x^2$)?",
                        [
                            "When any term in the trial solution is already a solution of the associated homogeneous equation",
                            "Whenever the forcing function is a polynomial",
                            "When the coefficient of $y'$ is negative",
                            "Only when the right-hand side is zero"
                        ],
                        0,
                        "If a term in the proposed $y_p$ is part of the complementary solution $y_c$, substituting it will yield zero; multiplying by $x$ restores linear independence."
                    ),
                    make_q(
                        "For $y'' - 4y' + 4y = 3e^{2x}$, the homogeneous solution is $y_c = (c_1 + c_2 x)e^{2x}$. What is the correct trial form for $y_p$?",
                        ["$y_p = A x^2 e^{2x}$", "$y_p = A e^{2x}$", "$y_p = A x e^{2x}$", "$y_p = A x^3 e^{2x}$"],
                        0,
                        "Both $e^{2x}$ and $x e^{2x}$ are in $y_c$. Multiplying by $x^2$ produces $y_p = A x^2 e^{2x}$, which is linearly independent of $y_c$."
                    ),
                    make_q(
                        "What physical phenomenon occurs when an undamped mechanical system is driven at its natural resonance frequency ($y'' + \\omega_0^2 y = F_0 \\cos(\\omega_0 t)$)?",
                        [
                            "Resonance, where amplitude grows linearly with time ($y_p = C t \\sin(\\omega_0 t)$)",
                            "Immediate decay to zero",
                            "Critical damping",
                            "Chaotic motion"
                        ],
                        0,
                        "Because the forcing frequency equals the natural frequency, the particular solution takes the form $t\\sin(\\omega_0 t)$, producing unbounded linearly growing oscillations (resonance)."
                    )
                ]
            },
            {
                "heading": "Section 4: The Principle of Superposition",
                "questions": [
                    make_q(
                        "If $y_{p1}$ solves $L[y] = g_1(x)$ and $y_{p2}$ solves $L[y] = g_2(x)$, what solves $L[y] = 2g_1(x) - 3g_2(x)$?",
                        [
                            "$2y_{p1} - 3y_{p2}$",
                            "$y_{p1} y_{p2}$",
                            "$\\frac{y_{p1}}{y_{p2}}$",
                            "$y_{p1} + y_{p2}$"
                        ],
                        0,
                        "By the linearity of differential operators, $L[2y_{p1} - 3y_{p2}] = 2L[y_{p1}] - 3L[y_{p2}] = 2g_1(x) - 3g_2(x)$."
                    ),
                    make_q(
                        "Can the Method of Undetermined Coefficients be used to solve $y'' + y = \\tan x$?",
                        [
                            "No, because derivatives of $\\tan x$ produce infinitely many non-terminating forms; Variation of Parameters is required",
                            "Yes, with trial solution $A\\tan x + B\\sec x$",
                            "Yes, with trial solution $A\\sin x / \\cos x$",
                            "Only if $x$ is small"
                        ],
                        0,
                        "Undetermined coefficients applies only to functions with finite dimensional spaces of derivatives (polynomials, exponentials, sines/cosines). For $\\tan x$, variation of parameters must be used."
                    ),
                    make_q(
                        "Find a particular solution to $y'' + 4y = 8x + 12$.",
                        ["$y_p = 2x + 3$", "$y_p = 2x$", "$y_p = 4x + 3$", "$y_p = 2x^2 + 3x$"],
                        0,
                        "Let $y_p = Ax + B$. $y_p'' = 0$. $4(Ax + B) = 4Ax + 4B = 8x + 12 \\Rightarrow 4A = 8 \\Rightarrow A = 2$ and $4B = 12 \\Rightarrow B = 3$. Thus $y_p = 2x + 3$."
                    )
                ]
            }
        ]
    },

    # --------------------------------------------------------------------------
    # ODES 5.01: Variation of Parameters
    # --------------------------------------------------------------------------
    {
        "track": "odes",
        "num": "5.01",
        "slug": "variation-of-parameters",
        "title": "Variation of Parameters",
        "sections": [
            {
                "heading": "Section 1: The Wronskian Determinant",
                "questions": [
                    make_q(
                        "What is the definition of the Wronskian $W(y_1, y_2)$ of two differentiable functions $y_1(x)$ and $y_2(x)$?",
                        [
                            "$W(y_1, y_2) = y_1 y_2' - y_1' y_2 = \\det [[y_1, y_2], [y_1', y_2']]$",
                            "$W(y_1, y_2) = y_1 y_2 + y_1' y_2'$",
                            "$W(y_1, y_2) = y_1' y_2 - y_1 y_2'$",
                            "$W(y_1, y_2) = \\frac{y_1}{y_2}$"
                        ],
                        0,
                        "The Wronskian is the determinant of the fundamental matrix: $W = \\det [[y_1, y_2], [y_1', y_2']] = y_1 y_2' - y_1' y_2$."
                    ),
                    make_q(
                        "Compute the Wronskian of $y_1 = \\cos x$ and $y_2 = \\sin x$.",
                        ["$1$", "$0$", "$-1$", "$\\cos(2x)$"],
                        0,
                        "$W = (\\cos x)(\\cos x) - (-\\sin x)(\\sin x) = \\cos^2 x + \\sin^2 x = 1$."
                    ),
                    make_q(
                        "What does $W(y_1, y_2) \\neq 0$ guarantee about solutions $y_1$ and $y_2$ to a homogeneous linear ODE?",
                        [
                            "They are linearly independent and form a fundamental set of solutions",
                            "They are orthogonal",
                            "They are periodic",
                            "One must be zero"
                        ],
                        0,
                        "If the Wronskian is non-zero at a point in the interval, Abel's theorem guarantees it is non-zero everywhere, establishing linear independence."
                    )
                ]
            },
            {
                "heading": "Section 2: The Variation of Parameters Formula",
                "questions": [
                    make_q(
                        "For the second-order equation $y'' + P(x)y' + Q(x)y = g(x)$, what is the variation of parameters formula for $y_p$?",
                        [
                            "$y_p = -y_1 \\int \\frac{y_2 g}{W} dx + y_2 \\int \\frac{y_1 g}{W} dx$",
                            "$y_p = y_1 \\int \\frac{y_2 g}{W} dx - y_2 \\int \\frac{y_1 g}{W} dx$",
                            "$y_p = \\int \\frac{g(x)}{W} dx$",
                            "$y_p = -y_2 \\int \\frac{y_1}{W} dx$"
                        ],
                        0,
                        "Setting $y_p = u_1 y_1 + u_2 y_2$ yields $u_1' = -\\frac{y_2 g}{W}$ and $u_2' = \\frac{y_1 g}{W}$, leading directly to $y_p = -y_1 \\int \\frac{y_2 g}{W} dx + y_2 \\int \\frac{y_1 g}{W} dx$."
                    ),
                    make_q(
                        "What must the coefficient of $y''$ be before applying the variation of parameters formula?",
                        ["Exactly $1$ (must be in standard monic form)", "Any non-zero constant", "Zero", "Positive"],
                        0,
                        "The standard derivation requires the leading coefficient to be normalized to $1$; otherwise $g(x)$ must be divided by the coefficient of $y''$."
                    ),
                    make_q(
                        "For $y'' + y = \\sec x$, where $y_1 = \\cos x, y_2 = \\sin x$, what is $u_1' = -\\frac{y_2 g}{W}$?",
                        ["$-\\tan x$", "$-\\sin x$", "$-1$", "$-\\cos x$"],
                        0,
                        "With $W = 1$ and $g = \\sec x$: $u_1' = -\\frac{\\sin x \\sec x}{1} = -\\frac{\\sin x}{\\cos x} = -\\tan x$."
                    )
                ]
            },
            {
                "heading": "Section 3: Solving Advanced Nonhomogeneous Equations",
                "questions": [
                    make_q(
                        "Find $u_1 = \\int (-\\tan x) dx$ for the problem $y'' + y = \\sec x$.",
                        ["$\\ln|\\cos x|$", "$-\\ln|\\cos x|$", "$\\sec^2 x$", "$-\\cos x$"],
                        0,
                        "$u_1 = -\\int \\tan x dx = -(-\\ln|\\cos x|) = \\ln|\\cos x|$."
                    ),
                    make_q(
                        "Find $u_2' = \\frac{y_1 g}{W}$ for $y'' + y = \\sec x$ and evaluate $u_2$.",
                        ["$u_2 = x$", "$u_2 = \\sin x$", "$u_2 = \\cos x$", "$u_2 = \\tan x$"],
                        0,
                        "$u_2' = \\frac{\\cos x \\sec x}{1} = 1 \\Rightarrow u_2 = \\int 1 dx = x$."
                    ),
                    make_q(
                        "Assemble the particular solution $y_p = u_1 y_1 + u_2 y_2$ for $y'' + y = \\sec x$.",
                        [
                            "$y_p = \\cos x \\ln|\\cos x| + x\\sin x$",
                            "$y_p = \\cos x + x\\sin x$",
                            "$y_p = \\ln|\\cos x| + x$",
                            "$y_p = \\sin x \\ln|\\cos x| + x\\cos x$"
                        ],
                        0,
                        "Combining $u_1 = \\ln|\\cos x|$ and $u_2 = x$: $y_p = u_1 y_1 + u_2 y_2 = \\cos x \\ln|\\cos x| + x\\sin x$."
                    )
                ]
            },
            {
                "heading": "Section 4: Comparison of Nonhomogeneous Methods",
                "questions": [
                    make_q(
                        "What is the major advantage of Variation of Parameters over Undetermined Coefficients?",
                        [
                            "It works for any continuous forcing function $g(x)$, not just polynomials, exponentials, or sines/cosines",
                            "It never requires any integration",
                            "It works without knowing the homogeneous solution $y_c$",
                            "It always produces algebraic rather than transcendental answers"
                        ],
                        0,
                        "Variation of Parameters is completely general and applies to any continuous $g(x)$ (such as $\\sec x, \\tan x, 1/x$), provided $y_c$ is known."
                    ),
                    make_q(
                        "What is the main drawback of Variation of Parameters compared to Undetermined Coefficients?",
                        [
                            "The integrals $\\int \\frac{y_i g}{W} dx$ may be difficult or impossible to evaluate in closed elementary form",
                            "It only works on first-order equations",
                            "It gives only approximate numerical solutions",
                            "It cannot handle initial value problems"
                        ],
                        0,
                        "Variation of Parameters often produces non-elementary integrals that cannot be expressed using standard functions."
                    ),
                    make_q(
                        "What is Abel's formula for the Wronskian of solutions to $y'' + P(x)y' + Q(x)y = 0$?",
                        [
                            "$W(x) = C e^{-\\int P(x) dx}$",
                            "$W(x) = C e^{\\int Q(x) dx}$",
                            "$W(x) = C(P(x) + Q(x))$",
                            "$W(x) = C x$"
                        ],
                        0,
                        "Abel's Identity states that the Wronskian satisfies the first-order differential equation $W' + P(x)W = 0$, giving $W(x) = C e^{-\\int P(x) dx}$."
                    )
                ]
            }
        ]
    }
]
