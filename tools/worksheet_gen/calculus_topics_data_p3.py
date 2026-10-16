"""Calculus Topics Data Part 3: Topics 13.01 to 16.01 (4 Topics).

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

CALCULUS_TOPICS_P3 = [
    # ── 13.01 Vectors and Vector-Valued Functions ─────────────────────────────
    {
        "track": "calculus",
        "num": "13.01",
        "slug": "vectors-and-vector-valued-functions",
        "title": "Vectors and Vector-Valued Functions",
        "sections": [
            {
                "heading": "Section 1: 3D Vectors, Dot and Cross Products",
                "questions": [
                    make_q(
                        "Given $\\mathbf{u} = \\langle 2, -1, 3 \\rangle$ and $\\mathbf{v} = \\langle 4, 2, -1 \\rangle$, find $\\mathbf{u} \\cdot \\mathbf{v}$.",
                        ["$3$", "$7$", "$13$", "$-1$"],
                        0,
                        "$\\mathbf{u} \\cdot \\mathbf{v} = (2)(4) + (-1)(2) + (3)(-1) = 8 - 2 - 3 = 3$."
                    ),
                    make_q(
                        "Find the cross product $\\mathbf{u} \\times \\mathbf{v}$ for $\\mathbf{u} = \\langle 1, 0, 2 \\rangle$ and $\\mathbf{v} = \\langle 0, 3, -1 \\rangle$.",
                        ["$\\langle -6, 1, 3 \\rangle$", "$\\langle 6, -1, -3 \\rangle$", "$\\langle -6, -1, 3 \\rangle$", "$\\langle 6, 1, 3 \\rangle$"],
                        0,
                        "$\\mathbf{u} \\times \\mathbf{v} = \\langle 0( -1) - 2(3), 2(0) - 1(-1), 1(3) - 0(0) \\rangle = \\langle -6, 1, 3 \\rangle$."
                    ),
                    make_q(
                        "Find the area of the parallelogram determined by $\\mathbf{u} = \\langle 1, 2, 0 \\rangle$ and $\\mathbf{v} = \\langle 0, 3, 4 \\rangle$.",
                        ["$\\sqrt{89}$", "$9$", "$\\sqrt{73}$", "$10$"],
                        0,
                        "$\\mathbf{u} \\times \\mathbf{v} = \\langle 8, -4, 3 \\rangle$. Magnitude $\\|\\mathbf{u} \\times \\mathbf{v}\\| = \\sqrt{64 + 16 + 9} = \\sqrt{89}$."
                    )
                ]
            },
            {
                "heading": "Section 2: Derivatives and Integrals of Vector-Valued Functions",
                "questions": [
                    make_q(
                        "Given $\\mathbf{r}(t) = \\langle t^2, \\sin(2t), e^{3t} \\rangle$, find $\\mathbf{r}'(t)$.",
                        ["$\\langle 2t, 2\\cos(2t), 3e^{3t} \\rangle$", "$\\langle 2t, \\cos(2t), e^{3t} \\rangle$", "$\\langle t, 2\\cos(2t), 3e^{3t} \\rangle$", "$\\langle 2t, -2\\cos(2t), 3e^{3t} \\rangle$"],
                        0,
                        "Differentiate component-wise: $\\mathbf{r}'(t) = \\langle \\frac{d}{dt}(t^2), \\frac{d}{dt}(\\sin 2t), \\frac{d}{dt}(e^{3t}) \\rangle = \\langle 2t, 2\\cos(2t), 3e^{3t} \\rangle$."
                    ),
                    make_q(
                        "Find $\\int_0^1 \\langle 2t, 3t^2, 4t^3 \\rangle\\,dt$.",
                        ["$\\langle 1, 1, 1 \\rangle$", "$\\langle 2, 3, 4 \\rangle$", "$\\langle 1/2, 1/3, 1/4 \\rangle$", "$\\langle 1, 2, 3 \\rangle$"],
                        0,
                        "Integrate component-wise: $\\langle [t^2]_0^1, [t^3]_0^1, [t^4]_0^1 \\rangle = \\langle 1, 1, 1 \\rangle$."
                    ),
                    make_q(
                        "Find the unit tangent vector $\\mathbf{T}(t)$ to $\\mathbf{r}(t) = \\langle 3\\cos t, 3\\sin t, 4t \\rangle$.",
                        ["$\\langle -\\frac{3}{5}\\sin t, \\frac{3}{5}\\cos t, \\frac{4}{5} \\rangle$", "$\\langle -3\\sin t, 3\\cos t, 4 \\rangle$", "$\\langle -\\frac{3}{4}\\sin t, \\frac{3}{4}\\cos t, 1 \\rangle$", "$\\frac{1}{5}\\langle 3\\cos t, 3\\sin t, 4t \\rangle$"],
                        0,
                        "$\\mathbf{r}'(t) = \\langle -3\\sin t, 3\\cos t, 4 \\rangle$. $\\|\\mathbf{r}'(t)\\| = \\sqrt{9\\sin^2 t + 9\\cos^2 t + 16} = \\sqrt{25} = 5$. Thus $\\mathbf{T}(t) = \\frac{\\mathbf{r}'(t)}{5}$."
                    )
                ]
            },
            {
                "heading": "Section 3: Arc Length and Curvature of Space Curves",
                "questions": [
                    make_q(
                        "Find the arc length of the circular helix $\\mathbf{r}(t) = \\langle 3\\cos t, 3\\sin t, 4t \\rangle$ for $0 \\leq t \\leq 2\\pi$.",
                        ["$10\\pi$", "$5\\pi$", "$20\\pi$", "$6\\pi$"],
                        0,
                        "Speed $\\|\\mathbf{r}'(t)\\| = \\sqrt{(-3\\sin t)^2 + (3\\cos t)^2 + 4^2} = \\sqrt{9 + 16} = 5$. Arc length $L = \\int_0^{2\\pi} 5\\,dt = 10\\pi$."
                    ),
                    make_q(
                        "State the formula for curvature $\\kappa(t)$ of a space curve in terms of $\\mathbf{r}'$ and $\\mathbf{r}''$.",
                        ["$\\kappa(t) = \\frac{\\|\\mathbf{r}'(t) \\times \\mathbf{r}''(t)\\|}{\\|\\mathbf{r}'(t)\\|^3}$", "$\\kappa(t) = \\frac{\\|\\mathbf{r}''(t)\\|}{\\|\\mathbf{r}'(t)\\|^2}$", "$\\kappa(t) = \\frac{\\mathbf{r}'(t) \\cdot \\mathbf{r}''(t)}{\\|\\mathbf{r}'(t)\\|^3}$", "$\\kappa(t) = \\|\\mathbf{r}''(t)\\|$"],
                        0,
                        "The standard vector formula for the curvature of a twice-differentiable space curve is $\\kappa = \\frac{\\|\\mathbf{r}' \\times \\mathbf{r}''\\|}{\\|\\mathbf{r}'\\|^3}$."
                    ),
                    make_q(
                        "Find the curvature of a circle of radius $R$.",
                        ["$\\kappa = 1/R$", "$\\kappa = R$", "$\\kappa = 2\\pi R$", "$\\kappa = 1/R^2$"],
                        0,
                        "A circle of radius $R$ has constant curvature equal to the reciprocal of its radius: $\\kappa = 1/R$."
                    )
                ]
            },
            {
                "heading": "Section 4: Velocity, Acceleration, and Projectile Motion",
                "questions": [
                    make_q(
                        "If position is $\\mathbf{r}(t) = \\langle t^2, 4t, -16t^2 + 64t \\rangle$, find the velocity and acceleration vectors at $t = 1$.",
                        ["$\\mathbf{v}(1) = \\langle 2, 4, 32 \\rangle, \\mathbf{a}(1) = \\langle 2, 0, -32 \\rangle$", "$\\mathbf{v}(1) = \\langle 1, 4, 48 \\rangle, \\mathbf{a}(1) = \\langle 2, 0, -16 \\rangle$", "$\\mathbf{v}(1) = \\langle 2, 4, 0 \\rangle, \\mathbf{a}(1) = \\langle 2, 0, -32 \\rangle$", "$\\mathbf{v}(1) = \\langle 2, 4, -32 \\rangle$"],
                        0,
                        "$\\mathbf{v}(t) = \\mathbf{r}'(t) = \\langle 2t, 4, -32t + 64 \\rangle$. At $t = 1$: $\\mathbf{v}(1) = \\langle 2, 4, 32 \\rangle$. $\\mathbf{a}(t) = \\langle 2, 0, -32 \\rangle$."
                    ),
                    make_q(
                        "Find the speed at $t = 0$ for a particle with velocity $\\mathbf{v}(t) = \\langle 3\\cos t, 4, 3\\sin t \\rangle$.",
                        ["$5$", "$7$", "$4$", "$\\sqrt{7}$"],
                        0,
                        "Speed is the magnitude of velocity: $\\|\\mathbf{v}(0)\\| = \\sqrt{3^2 + 4^2 + 0^2} = \\sqrt{9 + 16} = 5$."
                    ),
                    make_q(
                        "Decompose acceleration into tangential and normal components: $\\mathbf{a} = a_T \\mathbf{T} + a_N \\mathbf{N}$. What is $a_T$?",
                        ["$a_T = \\frac{\\mathbf{v} \\cdot \\mathbf{a}}{\\|\\mathbf{v}\\|}$", "$a_T = \\frac{\\|\\mathbf{v} \\times \\mathbf{a}\\|}{\\|\\mathbf{v}\\|}$", "$a_T = \\|\\mathbf{a}\\|$", "$a_T = \\frac{\\mathbf{a}}{\\|\\mathbf{v}\\|}$"],
                        0,
                        "The tangential component of acceleration represents the rate of change of speed: $a_T = \\frac{d}{dt}\\|\\mathbf{v}\\| = \\frac{\\mathbf{v} \\cdot \\mathbf{a}}{\\|\\mathbf{v}\\|}$."
                    )
                ]
            }
        ]
    },

    # ── 14.01 Partial Derivatives and the Gradient ────────────────────────────
    {
        "track": "calculus",
        "num": "14.01",
        "slug": "partial-derivatives-and-the-gradient",
        "title": "Partial Derivatives and the Gradient",
        "sections": [
            {
                "heading": "Section 1: First-Order Partial Derivatives",
                "questions": [
                    make_q(
                        "Find $f_x$ and $f_y$ for $f(x, y) = 3x^2 y - 5x y^3 + 4x - 2y$.",
                        ["$f_x = 6xy - 5y^3 + 4$, $f_y = 3x^2 - 15xy^2 - 2$", "$f_x = 6xy - 5y^3$, $f_y = 3x^2 - 15xy^2$", "$f_x = 6x - 5y^3 + 4$, $f_y = 3x^2 - 15y^2 - 2$", "$f_x = 3x^2 - 15xy^2$, $f_y = 6xy - 5y^3$"],
                        0,
                        "Treat $y$ as constant: $f_x = 6xy - 5y^3 + 4$. Treat $x$ as constant: $f_y = 3x^2 - 15xy^2 - 2$."
                    ),
                    make_q(
                        "Find $\\frac{\\partial z}{\\partial x}$ for $z = e^{x^2 y}$.",
                        ["$2xy e^{x^2 y}$", "$x^2 e^{x^2 y}$", "$2x e^{x^2 y}$", "$2xy e^{2xy}$"],
                        0,
                        "By the chain rule: $\\frac{\\partial z}{\\partial x} = e^{x^2 y} \\frac{\\partial}{\\partial x}(x^2 y) = 2xy e^{x^2 y}$."
                    ),
                    make_q(
                        "Find $f_y(1, 0)$ for $f(x, y) = \\ln(x^2 + y^2 + 1)$.",
                        ["$0$", "$1$", "$2$", "$1/2$"],
                        0,
                        "$f_y = \\frac{2y}{x^2 + y^2 + 1}$. Evaluating at $(1, 0)$: $f_y(1, 0) = \\frac{0}{1 + 0 + 1} = 0$."
                    )
                ]
            },
            {
                "heading": "Section 2: Second-Order Partials and Clairaut's Theorem",
                "questions": [
                    make_q(
                        "What does Clairaut's Theorem (equality of mixed partials) state for continuous second partial derivatives?",
                        ["$f_{xy} = f_{yx}$", "$f_{xx} = f_{yy}$", "$f_{xy} = -f_{yx}$", "$f_{xx} + f_{yy} = 0$"],
                        0,
                        "If the mixed partial derivatives $f_{xy}$ and $f_{yx}$ are both continuous on an open set, they are equal: $f_{xy} = f_{yx}$."
                    ),
                    make_q(
                        "Find $f_{xx}$ for $f(x, y) = x^4 y^2 - 2x^2 y$.",
                        ["$12x^2 y^2 - 4y$", "$4x^3 y^2 - 4xy$", "$2x^4 - 0$", "$12x^2 - 4$"],
                        0,
                        "$f_x = 4x^3 y^2 - 4xy$. Differentiating with respect to $x$ again: $f_{xx} = 12x^2 y^2 - 4y$."
                    ),
                    make_q(
                        "Verify whether $u(x, y) = e^x \\sin y$ satisfies Laplace's equation $u_{xx} + u_{yy} = 0$.",
                        ["Yes, $u_{xx} + u_{yy} = e^x\\sin y - e^x\\sin y = 0$", "No, $u_{xx} + u_{yy} = 2e^x\\sin y$", "No, it equals $e^x\\cos y$", "Only when $x = 0$"],
                        0,
                        "$u_x = e^x\\sin y \\Rightarrow u_{xx} = e^x\\sin y$. $u_y = e^x\\cos y \\Rightarrow u_{yy} = -e^x\\sin y$. $u_{xx} + u_{yy} = 0$."
                    )
                ]
            },
            {
                "heading": "Section 3: The Gradient Vector and Directional Derivatives",
                "questions": [
                    make_q(
                        "Find the gradient $\\nabla f(x, y)$ for $f(x, y) = x^2 y + 3y^2$ at the point $(2, 1)$.",
                        ["$\\langle 4, 10 \\rangle$", "$\\langle 4, 7 \\rangle$", "$\\langle 2, 6 \\rangle$", "$\\langle 10, 4 \\rangle$"],
                        0,
                        "$\\nabla f = \\langle 2xy, x^2 + 6y \\rangle$. At $(2, 1)$: $\\nabla f(2, 1) = \\langle 2(2)(1), 4 + 6(1) \\rangle = \\langle 4, 10 \\rangle$."
                    ),
                    make_q(
                        "In which direction does a differentiable function $f$ increase most rapidly at a point $P$?",
                        ["In the direction of the gradient vector $\\nabla f(P)$", "Opposite to $\\nabla f(P)$", "Orthogonal to $\\nabla f(P)$", "Along the level curve"],
                        0,
                        "The directional derivative $D_{\\mathbf{u}} f = \\nabla f \\cdot \\mathbf{u} = \\|\\nabla f\\|\\cos\\theta$ is maximized when $\\cos\\theta = 1$, which is the direction of $\\nabla f$."
                    ),
                    make_q(
                        "Find the directional derivative of $f(x, y) = 2x^2 - 3y^2$ at $(1, 1)$ in the direction of $\\mathbf{v} = \\langle 3, 4 \\rangle$.",
                        ["$-12/5$", "$12/5$", "$-24$", "$0$"],
                        0,
                        "$\\nabla f = \\langle 4x, -6y \\rangle \\Rightarrow \\nabla f(1, 1) = \\langle 4, -6 \\rangle$. Unit vector $\\mathbf{u} = \\langle 3/5, 4/5 \\rangle$. $D_{\\mathbf{u}} f = \\langle 4, -6 \\rangle \\cdot \\langle 3/5, 4/5 \\rangle = 12/5 - 24/5 = -12/5$."
                    )
                ]
            },
            {
                "heading": "Section 4: Tangent Planes and Linear Approximations",
                "questions": [
                    make_q(
                        "Find the equation of the tangent plane to $z = x^2 + y^2$ at the point $(1, 2, 5)$.",
                        ["$z - 5 = 2(x - 1) + 4(y - 2)$", "$z - 5 = (x - 1) + 2(y - 2)$", "$2x + 4y - z = 0$", "$z = 2x + 4y + 5$"],
                        0,
                        "$z_x = 2x \\Rightarrow z_x(1, 2) = 2$. $z_y = 2y \\Rightarrow z_y(1, 2) = 4$. Plane: $z - 5 = 2(x - 1) + 4(y - 2) \\Rightarrow 2x + 4y - z = 5$."
                    ),
                    make_q(
                        "Use the linear approximation $L(x, y)$ of $f(x, y) = \\sqrt{x^2 + y^2}$ at $(3, 4)$ to estimate $f(3.02, 3.97)$.",
                        ["$4.988$", "$5.012$", "$5.000$", "$4.950$"],
                        0,
                        "$f(3, 4) = 5$. $f_x = x/\\sqrt{x^2+y^2} = 3/5 = 0.6$; $f_y = 4/5 = 0.8$. $L = 5 + 0.6(0.02) + 0.8(-0.03) = 5 + 0.012 - 0.024 = 4.988$."
                    ),
                    make_q(
                        "Find the normal vector to the level surface $x^2 + y^2 + z^2 = 9$ at $(1, 2, 2)$.",
                        ["$\\langle 2, 4, 4 \\rangle$", "$\\langle 1, 2, 2 \\rangle$", "Both $\\langle 1, 2, 2 \\rangle$ and $\\langle 2, 4, 4 \\rangle$ are valid normal vectors", "$\\langle 2, 2, 1 \\rangle$"],
                        2,
                        "The gradient of $F(x, y, z) = x^2 + y^2 + z^2$ is $\\nabla F = \\langle 2x, 2y, 2z \\rangle = \\langle 2, 4, 4 \\rangle = 2\\langle 1, 2, 2 \\rangle$, which is normal to the tangent plane."
                    )
                ]
            }
        ]
    },

    # ── 15.01 Double Integrals ────────────────────────────────────────────────
    {
        "track": "calculus",
        "num": "15.01",
        "slug": "double-integrals",
        "title": "Double Integrals",
        "sections": [
            {
                "heading": "Section 1: Iterated Integrals over Rectangles",
                "questions": [
                    make_q(
                        "Evaluate $\\int_0^2 \\int_0^3 (xy^2)\\,dx\\,dy$.",
                        ["$12$", "$18$", "$9$", "$6$"],
                        0,
                        "Factor: $\\left(\\int_0^3 x\\,dx\\right)\\left(\\int_0^2 y^2\\,dy\\right) = [x^2/2]_0^3 [y^3/3]_0^2 = (9/2)(8/3) = 72/6 = 12$."
                    ),
                    make_q(
                        "Evaluate $\\int_0^1 \\int_0^2 (2x + 3y)\\,dy\\,dx$.",
                        ["$8$", "$6$", "$10$", "$4$"],
                        0,
                        "Inner: $\\int_0^2 (2x + 3y)\\,dy = [2xy + \\frac{3}{2}y^2]_0^2 = 4x + 6$. Outer: $\\int_0^1 (4x + 6)\\,dx = [2x^2 + 6x]_0^1 = 2 + 6 = 8$."
                    ),
                    make_q(
                        "What does Fubini's Theorem guarantee for a continuous function $f(x, y)$ over a rectangle $R = [a, b] \\times [c, d]$?",
                        ["$\\int_a^b \\int_c^d f\\,dy\\,dx = \\int_c^d \\int_a^b f\\,dx\\,dy$", "The integral equals the perimeter times height", "The order of integration cannot be swapped", "The integral must be zero"],
                        0,
                        "Fubini's Theorem ensures that the order of integration can be reversed without changing the value: $\\iint_R f\\,dA = \\int_a^b \\int_c^d f\\,dy\\,dx = \\int_c^d \\int_a^b f\\,dx\\,dy$."
                    )
                ]
            },
            {
                "heading": "Section 2: Double Integrals over General Regions",
                "questions": [
                    make_q(
                        "Evaluate $\\iint_D (x + y)\\,dA$ where $D$ is bounded by $y = 0, y = x$, and $x = 1$.",
                        ["$1/2$", "$1/3$", "$2/3$", "$1/6$"],
                        0,
                        "$\\int_0^1 \\int_0^x (x + y)\\,dy\\,dx = \\int_0^1 [xy + y^2/2]_0^x\\,dx = \\int_0^1 (x^2 + x^2/2)\\,dx = \\int_0^1 \\frac{3}{2}x^2\\,dx = [\\frac{x^3}{2}]_0^1 = 1/2$."
                    ),
                    make_q(
                        "Reverse the order of integration for $\\int_0^1 \\int_x^1 f(x, y)\\,dy\\,dx$.",
                        ["$\\int_0^1 \\int_0^y f(x, y)\\,dx\\,dy$", "$\\int_0^1 \\int_y^1 f(x, y)\\,dx\\,dy$", "$\\int_0^1 \\int_0^1 f(x, y)\\,dx\\,dy$", "$\\int_x^1 \\int_0^1 f(x, y)\\,dx\\,dy$"],
                        0,
                        "The region is $0 \\leq x \\leq 1$ and $x \\leq y \\leq 1$. In terms of $y$: $0 \\leq y \\leq 1$, and for each $y$, $x$ ranges from $0$ to $y$. Thus $\\int_0^1 \\int_0^y f(x, y)\\,dx\\,dy$."
                    ),
                    make_q(
                        "Evaluate $\\int_0^1 \\int_y^1 e^{x^2}\\,dx\\,dy$ by reversing the order of integration.",
                        ["$\\frac{e - 1}{2}$", "$e - 1$", "$\\frac{e}{2}$", "$e^2 - 1$"],
                        0,
                        "Reversed: $\\int_0^1 \\int_0^x e^{x^2}\\,dy\\,dx = \\int_0^1 x e^{x^2}\\,dx = [\\frac{1}{2}e^{x^2}]_0^1 = \\frac{e - 1}{2}$."
                    )
                ]
            },
            {
                "heading": "Section 3: Double Integrals in Polar Coordinates",
                "questions": [
                    make_q(
                        "What is the area element $dA$ in polar coordinates?",
                        ["$dA = r\\,dr\\,d\\theta$", "$dA = dr\\,d\\theta$", "$dA = r^2\\,dr\\,d\\theta$", "$dA = \\frac{1}{r}\\,dr\\,d\\theta$"],
                        0,
                        "The Jacobian factor for polar coordinates is $r$, so the infinitesimal area element is $dA = r\\,dr\\,d\\theta$."
                    ),
                    make_q(
                        "Evaluate $\\iint_R (x^2 + y^2)\\,dA$ over the disk $x^2 + y^2 \\leq 4$.",
                        ["$8\\pi$", "$16\\pi$", "$4\\pi$", "$32\\pi$"],
                        0,
                        "In polar: $x^2 + y^2 = r^2$. Bounds: $0 \\leq r \\leq 2, 0 \\leq \\theta \\leq 2\\pi$. $\\int_0^{2\\pi} \\int_0^2 r^2 (r\\,dr)\\,d\\theta = 2\\pi \\int_0^2 r^3\\,dr = 2\\pi [r^4/4]_0^2 = 2\\pi(4) = 8\\pi$."
                    ),
                    make_q(
                        "Evaluate the Gaussian integral $\\int_{-\\infty}^\\infty e^{-x^2}\\,dx$ using polar coordinates.",
                        ["$\\sqrt{\\pi}$", "$\\pi$", "$2\\sqrt{\\pi}$", "$\\pi/2$"],
                        0,
                        "$I^2 = \\iint_{\\mathbb{R}^2} e^{-(x^2+y^2)} dA = \\int_0^{2\\pi} d\\theta \\int_0^\\infty r e^{-r^2} dr = 2\\pi [-\\frac{1}{2}e^{-r^2}]_0^\\infty = 2\\pi(1/2) = \\pi \\Rightarrow I = \\sqrt{\\pi}$."
                    )
                ]
            },
            {
                "heading": "Section 4: Volume, Mass, and Center of Mass",
                "questions": [
                    make_q(
                        "Find the volume under the paraboloid $z = 4 - x^2 - y^2$ above the $xy$-plane.",
                        ["$8\\pi$", "$16\\pi$", "$4\\pi$", "$2\\pi$"],
                        0,
                        "Region $D$: disk of radius $r = 2$. $V = \\int_0^{2\\pi} \\int_0^2 (4 - r^2) r\\,dr\\,d\\theta = 2\\pi [2r^2 - r^4/4]_0^2 = 2\\pi(8 - 4) = 8\\pi$."
                    ),
                    make_q(
                        "A lamina occupies the region $[0, 1] \\times [0, 2]$ with density $\\rho(x, y) = 3x$. Find its total mass $M$.",
                        ["$3$", "$6$", "$1.5$", "$4.5$"],
                        0,
                        "$M = \\int_0^1 \\int_0^2 3x\\,dy\\,dx = 2 \\int_0^1 3x\\,dx = 2 [\\frac{3}{2}x^2]_0^1 = 3$."
                    ),
                    make_q(
                        "State the formula for the center of mass $\\bar{x}$ of a lamina with density $\\rho(x, y)$ and total mass $M$.",
                        ["$\\bar{x} = \\frac{1}{M}\\iint_D x\\rho(x, y)\\,dA$", "$\\bar{x} = \\frac{1}{M}\\iint_D y\\rho(x, y)\\,dA$", "$\\bar{x} = \\iint_D x\\,dA$", "$\\bar{x} = \\frac{M}{\\iint x\\,dA}$"],
                        0,
                        "The $x$-coordinate of the center of mass is the moment about the $y$-axis divided by total mass: $\\bar{x} = \\frac{M_y}{M} = \\frac{1}{M}\\iint_D x\\rho(x, y)\\,dA$."
                    )
                ]
            }
        ]
    },

    # ── 16.01 Vector Fields and Line Integrals ─────────────────────────────────
    {
        "track": "calculus",
        "num": "16.01",
        "slug": "vector-fields-and-line-integrals",
        "title": "Vector Fields and Line Integrals",
        "sections": [
            {
                "heading": "Section 1: Vector Fields, Divergence, and Curl",
                "questions": [
                    make_q(
                        "Compute the divergence $\\nabla \\cdot \\mathbf{F}$ for $\\mathbf{F} = \\langle x^2 y, 3y z, -2x z \\rangle$.",
                        ["$2xy + 3z - 2x$", "$2xy + 3y - 2z$", "$x^2 + 3z - 2x$", "$0$"],
                        0,
                        "$\\nabla \\cdot \\mathbf{F} = \\frac{\\partial}{\\partial x}(x^2 y) + \\frac{\\partial}{\\partial y}(3yz) + \\frac{\\partial}{\\partial z}(-2xz) = 2xy + 3z - 2x$."
                    ),
                    make_q(
                        "Compute the 2D curl of $\\mathbf{F} = \\langle -y, x \\rangle$.",
                        ["$2$", "$0$", "$1$", "$-2$"],
                        0,
                        "$\\text{curl}(\\mathbf{F}) = \\frac{\\partial Q}{\\partial x} - \\frac{\\partial P}{\\partial y} = \\frac{\\partial}{\\partial x}(x) - \\frac{\\partial}{\\partial y}(-y) = 1 - (-1) = 2$."
                    ),
                    make_q(
                        "If a vector field has $\\nabla \\times \\mathbf{F} = \\mathbf{0}$ throughout a simply connected domain, what is it called?",
                        ["Conservative (or irrotational)", "Incompressible", "Solenoidal", "Harmonic"],
                        0,
                        "A curl-free vector field on a simply connected domain is conservative, meaning $\\mathbf{F} = \\nabla f$ for some scalar potential function $f$."
                    )
                ]
            },
            {
                "heading": "Section 2: Line Integrals with Respect to Arc Length",
                "questions": [
                    make_q(
                        "State the formula for $\\int_C f(x, y)\\,ds$ along a curve parameterized by $\\mathbf{r}(t)$ for $a \\leq t \\leq b$.",
                        ["$\\int_a^b f(x(t), y(t))\\sqrt{[x'(t)]^2 + [y'(t)]^2}\\,dt$", "$\\int_a^b f(x(t), y(t))\\,dt$", "$\\int_a^b f(x(t), y(t))[x'(t) + y'(t)]\\,dt$", "$\\int_a^b f'(t)\\,dt$"],
                        0,
                        "Since $ds = \\|\\mathbf{r}'(t)\\|dt = \\sqrt{(x')^2 + (y')^2}dt$, the scalar line integral is $\\int_a^b f(\\mathbf{r}(t))\\|\\mathbf{r}'(t)\\|dt$."
                    ),
                    make_q(
                        "Evaluate $\\int_C (x + y)\\,ds$ where $C$ is the line segment from $(0, 0)$ to $(3, 4)$.",
                        ["$\\frac{35}{2}$", "$35$", "$7$", "$12$"],
                        0,
                        "Parametrize: $x = 3t, y = 4t$ for $t \\in [0, 1]$. $ds = \\sqrt{9 + 16}\\,dt = 5\\,dt$. $\\int_0^1 (3t + 4t)(5)\\,dt = 35\\int_0^1 t\\,dt = 35[t^2/2]_0^1 = 35/2$."
                    ),
                    make_q(
                        "Find the mass of a wire bent in the shape of the semicircle $\\mathbf{r}(t) = \\langle 2\\cos t, 2\\sin t \\rangle$ ($0 \\leq t \\leq \\pi$) with density $\\rho(x, y) = y$.",
                        ["$4$", "$8$", "$2\\pi$", "$4\\pi$"],
                        0,
                        "$ds = 2\\,dt$. $M = \\int_0^\\pi (2\\sin t)(2)\\,dt = 4 [-\\cos t]_0^\\pi = 4[-(-1) - (-1)] = 4(2) = 8$."
                    )
                ]
            },
            {
                "heading": "Section 3: Line Integrals of Vector Fields (Work Integrals)",
                "questions": [
                    make_q(
                        "Evaluate $\\int_C \\mathbf{F} \\cdot d\\mathbf{r}$ for $\\mathbf{F} = \\langle y, -x \\rangle$ along the circle $\\mathbf{r}(t) = \\langle \\cos t, \\sin t \\rangle$ for $0 \\leq t \\leq 2\\pi$.",
                        ["$-2\\pi$", "$2\\pi$", "$0$", "$\\pi$"],
                        0,
                        "$\\mathbf{F}(\\mathbf{r}(t)) = \\langle \\sin t, -\\cos t \\rangle$. $d\\mathbf{r} = \\langle -\\sin t, \\cos t \\rangle dt$. Dot product: $-\\sin^2 t - \\cos^2 t = -1$. $\\int_0^{2\\pi} (-1)\\,dt = -2\\pi$."
                    ),
                    make_q(
                        "Find the work done by the constant force $\\mathbf{F} = \\langle 3, 5 \\rangle$ moving an object along the straight line from $(1, 1)$ to $(4, 5)$.",
                        ["$29$", "$24$", "$32$", "$15$"],
                        0,
                        "Displacement $\\mathbf{d} = \\langle 4 - 1, 5 - 1 \\rangle = \\langle 3, 4 \\rangle$. Work $= \\mathbf{F} \\cdot \\mathbf{d} = (3)(3) + (5)(4) = 9 + 20 = 29$."
                    ),
                    make_q(
                        "Evaluate $\\int_C (x\\,dx + y\\,dy)$ along the parabolic arc $y = x^2$ from $(0, 0)$ to $(1, 1)$.",
                        ["$1$", "$1/2$", "$2/3$", "$0$"],
                        0,
                        "Notice $\\mathbf{F} = \\langle x, y \\rangle = \\nabla(\\frac{1}{2}x^2 + \\frac{1}{2}y^2)$. By FTLI: $f(1, 1) - f(0, 0) = (1/2 + 1/2) - 0 = 1$."
                    )
                ]
            },
            {
                "heading": "Section 4: Fundamental Theorem of Line Integrals and Green's Theorem",
                "questions": [
                    make_q(
                        "State the Fundamental Theorem of Line Integrals for a conservative field $\\mathbf{F} = \\nabla f$.",
                        ["$\\int_C \\nabla f \\cdot d\\mathbf{r} = f(\\mathbf{r}(b)) - f(\\mathbf{r}(a))$", "$\\int_C \\nabla f \\cdot d\\mathbf{r} = 0$ for all curves", "$\\int_C \\nabla f \\cdot d\\mathbf{r} = \\|\\nabla f\\|$", "$\\int_C \\nabla f \\cdot d\\mathbf{r} = f'(\\mathbf{r}(b))$"],
                        0,
                        "The work done by a conservative vector field depends only on the endpoints: $\\int_C \\nabla f \\cdot d\\mathbf{r} = f(B) - f(A)$."
                    ),
                    make_q(
                        "State Green's Theorem relating a line integral along a positively oriented boundary $\\partial D$ to a double integral over $D$.",
                        ["$\\oint_C (P\\,dx + Q\\,dy) = \\iint_D \\left(\\frac{\\partial Q}{\\partial x} - \\frac{\\partial P}{\\partial y}\\right)\\,dA$", "$\\oint_C (P\\,dx + Q\\,dy) = \\iint_D (P + Q)\\,dA$", "$\\oint_C (P\\,dx + Q\\,dy) = \\iint_D \\left(\\frac{\\partial P}{\\partial x} + \\frac{\\partial Q}{\\partial y}\\right)\\,dA$", "$\\oint_C (P\\,dx + Q\\,dy) = 0$"],
                        0,
                        "Green's Theorem connects circulation around a closed curve to the flux of the curl across the enclosed region: $\\oint_{\\partial D} P\\,dx + Q\\,dy = \\iint_D (Q_x - P_y)\\,dA$."
                    ),
                    make_q(
                        "Use Green's Theorem to evaluate $\\oint_C (3y\\,dx + 5x\\,dy)$ where $C$ is the unit circle $x^2 + y^2 = 1$ oriented counterclockwise.",
                        ["$2\\pi$", "$8\\pi$", "$0$", "$\\pi$"],
                        0,
                        "$P = 3y, Q = 5x \\Rightarrow \\frac{\\partial Q}{\\partial x} - \\frac{\\partial P}{\\partial y} = 5 - 3 = 2$. By Green's Theorem: $\\iint_D 2\\,dA = 2 \\times \\text{Area}(D) = 2(\\pi \\cdot 1^2) = 2\\pi$."
                    )
                ]
            }
        ]
    }
]
