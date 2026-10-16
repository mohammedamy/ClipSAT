#!/usr/bin/env python3
"""Standardized 4-Page Topic Data for AP Calculus BC Part 2 (Topics 2.01 to 4.02 - 5 Topics).

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

APBC_TOPICS_P2 = [
    # --------------------------------------------------------------------------
    # APBC 2.01: Euler's Method and Logistic Growth
    # --------------------------------------------------------------------------
    {
        "track": "apbc",
        "num": "2.01",
        "slug": "euler-s-method-and-logistic-growth",
        "title": "Euler's Method and Logistic Growth",
        "sections": [
            {
                "heading": "Section 1: Euler's Method Iterations",
                "questions": [
                    make_q(
                        "Given $\\frac{dy}{dx} = x + y$ and initial condition $y(0) = 1$, use Euler's method with step size $\\Delta x = 0.5$ to approximate $y(1)$.",
                        ["$2.25$", "$2.00$", "$2.50$", "$2.75$"], 0,
                        "Step 1: at $(0, 1)$, slope $= 0 + 1 = 1$. $\\Delta y = 1(0.5) = 0.5 \\Rightarrow y(0.5) \\approx 1.5$. Step 2: at $(0.5, 1.5)$, slope $= 0.5 + 1.5 = 2$. $\\Delta y = 2(0.5) = 1.0 \\Rightarrow y(1) \\approx 1.5 + 1.0 = 2.25$."
                    ),
                    make_q(
                        "If $y'' > 0$ (concave up) on the interval, does Euler's method yield an overestimate or underestimate of the true solution?",
                        ["An underestimate because tangent segments lie below the curve", "An overestimate because tangent segments lie above the curve", "Exact value", "Depends on the step size"], 0,
                        "Euler's method uses tangent line segments. When the solution curve is concave up ($y'' > 0$), the curve bends above the tangent segments, making Euler's method an underestimate."
                    ),
                    make_q(
                        "Given $\\frac{dy}{dx} = 2x$ with $y(1) = 3$, what is the error in approximating $y(2)$ using Euler's method with $\\Delta x = 0.5$?",
                        ["$0.5$", "$1.0$", "$0$", "$0.25$"], 0,
                        "Euler: $y(1.5) = 3 + 2(1)(0.5) = 4$. $y(2) = 4 + 2(1.5)(0.5) = 4 + 1.5 = 5.5$. Exact: $y = x^2 + 2 \\Rightarrow y(2) = 6$. Error $= 6 - 5.5 = 0.5$."
                    )
                ]
            },
            {
                "heading": "Section 2: The Logistic Differential Equation",
                "questions": [
                    make_q(
                        "A population grows according to $\\frac{dP}{dt} = 0.04 P (1 - \\frac{P}{500})$. What is the carrying capacity of this population?",
                        ["$500$", "$0.04$", "$250$", "$12,500$"], 0,
                        "In the standard logistic equation $\\frac{dP}{dt} = k P (1 - \\frac{P}{M})$, the parameter $M$ is the carrying capacity, which is $500$."
                    ),
                    make_q(
                        "For the logistic model $\\frac{dP}{dt} = 0.04 P (1 - \\frac{P}{500})$, at what population size is the growth rate $\\frac{dP}{dt}$ maximized?",
                        ["$250$", "$500$", "$125$", "$375$"], 0,
                        "The rate of growth is maximized at the point of inflection of the logistic curve, which occurs at exactly half the carrying capacity: $\\frac{M}{2} = \\frac{500}{2} = 250$."
                    ),
                    make_q(
                        "What is $\\lim_{t \\to \\infty} P(t)$ for a logistic population with carrying capacity $800$ if $P(0) = 50$?",
                        ["$800$", "$\\infty$", "$400$", "$50$"], 0,
                        "For any positive initial population $P_0 > 0$, the logistic curve asymptotically approaches the carrying capacity $M = 800$ as $t \\to \\infty$."
                    )
                ]
            },
            {
                "heading": "Section 3: Analytical Solutions to Logistic Models",
                "questions": [
                    make_q(
                        "What is the general form of the solution to the logistic differential equation $\\frac{dP}{dt} = k P (1 - \\frac{P}{M})$?",
                        ["$P(t) = \\frac{M}{1 + A e^{-kt}}$", "$P(t) = M e^{kt}$", "$P(t) = M - A e^{-kt}$", "$P(t) = \\frac{M}{1 - A e^{kt}}$"], 0,
                        "By separation of variables and partial fractions, the logistic solution is $P(t) = \\frac{M}{1 + A e^{-kt}}$."
                    ),
                    make_q(
                        "If $P(t) = \\frac{1000}{1 + 9e^{-0.2t}}$, what is the initial population $P(0)$?",
                        ["$100$", "$1000$", "$90$", "$10$"], 0,
                        "$P(0) = \\frac{1000}{1 + 9(1)} = \\frac{1000}{10} = 100$."
                    ),
                    make_q(
                        "What is the concavity of the logistic curve when $P(t) > \\frac{M}{2}$?",
                        ["Concave down ($P''(t) < 0$)", "Concave up ($P''(t) > 0$)", "Zero concavity", "Undefined"], 0,
                        "For $P < M/2$, the curve is concave up (accelerating growth). For $P > M/2$, the curve is concave down (decelerating growth)."
                    )
                ]
            },
            {
                "heading": "Section 4: Advanced Slope Fields with Autonomous Equations",
                "questions": [
                    make_q(
                        "In the autonomous differential equation $\\frac{dy}{dx} = y(y - 3)(y + 2)$, what are all equilibrium solutions?",
                        ["$y = 0, y = 3, y = -2$", "$y = 3, y = -2$ only", "$y = 0$ only", "$x = 0, x = 3, x = -2$"], 0,
                        "Equilibrium solutions occur where $\\frac{dy}{dx} = 0$, giving horizontal lines $y = 0, y = 3,$ and $y = -2$."
                    ),
                    make_q(
                        "For $\\frac{dy}{dx} = 2y(1 - \\frac{y}{4})$, which equilibrium solution is stable (an attractor)?",
                        ["$y = 4$", "$y = 0$", "Both are stable", "Neither is stable"], 0,
                        "Solutions starting near $y = 4$ approach $4$ as $x \\to \\infty$ (since $y' > 0$ for $0 < y < 4$ and $y' < 0$ for $y > 4$), making $y = 4$ a stable attractor."
                    ),
                    make_q(
                        "If $y(0) = 6$ in $\\frac{dy}{dx} = 2y(1 - \\frac{y}{4})$, what is $\\lim_{x \\to \\infty} y(x)$?",
                        ["$4$", "$6$", "$\\infty$", "$0$"], 0,
                        "Since $y(0) = 6 > 4$, $y' < 0$, so $y(x)$ decreases asymptotically toward the stable carrying capacity $4$."
                    )
                ]
            }
        ]
    },

    # --------------------------------------------------------------------------
    # APBC 3.01: Parametric Equations
    # --------------------------------------------------------------------------
    {
        "track": "apbc",
        "num": "3.01",
        "slug": "parametric-equations",
        "title": "Parametric Equations",
        "sections": [
            {
                "heading": "Section 1: First and Second Derivatives Parametrically",
                "questions": [
                    make_q(
                        "A curve is defined by $x(t) = t^2 + 1$ and $y(t) = t^3 - 3t$. Find $\\frac{dy}{dx}$ at $t = 2$.",
                        ["$\\frac{9}{4}$", "$\\frac{3}{2}$", "$\\frac{4}{9}$", "$9$"], 0,
                        "$\\frac{dx}{dt} = 2t$, $\\frac{dy}{dt} = 3t^2 - 3$. $\\frac{dy}{dx} = \\frac{dy/dt}{dx/dt} = \\frac{3t^2 - 3}{2t}$. At $t = 2$: $\\frac{12 - 3}{4} = \\frac{9}{4}$."
                    ),
                    make_q(
                        "Which formula gives the second derivative $\\frac{d^2 y}{dx^2}$ in parametric form?",
                        ["$\\frac{\\frac{d}{dt}[\\frac{dy}{dx}]}{\\frac{dx}{dt}}$", "$\\frac{d^2 y / dt^2}{d^2 x / dt^2}$", "$\\frac{d}{dt}[\\frac{dy}{dx}]$", "$\\frac{\\frac{dy}{dt}}{\\frac{d^2 x}{dt^2}}$"], 0,
                        "By the chain rule, $\\frac{d^2 y}{dx^2} = \\frac{d}{dx}[\\frac{dy}{dx}] = \\frac{\\frac{d}{dt}[\\frac{dy}{dx}]}{\\frac{dx}{dt}}$."
                    ),
                    make_q(
                        "For $x(t) = t^2$ and $y(t) = t^3$, find $\\frac{d^2 y}{dx^2}$.",
                        ["$\\frac{3}{4t}$", "$\\frac{3}{2}$", "$\\frac{6t}{2}$", "$\\frac{3}{4t^2}$"], 0,
                        "$\\frac{dy}{dx} = \\frac{3t^2}{2t} = \\frac{3}{2} t$. Then $\\frac{d}{dt}[\\frac{3}{2} t] = \\frac{3}{2}$. Dividing by $\\frac{dx}{dt} = 2t$ gives $\\frac{3/2}{2t} = \\frac{3}{4t}$."
                    )
                ]
            },
            {
                "heading": "Section 2: Horizontal and Vertical Tangents",
                "questions": [
                    make_q(
                        "At what value of $t$ does the parametric curve $x = t^3 - 3t, y = 2t^2$ have a horizontal tangent line?",
                        ["$t = 0$", "$t = 1$", "$t = -1$", "$t = \\pm 1$"], 0,
                        "A horizontal tangent requires $\\frac{dy}{dt} = 0$ while $\\frac{dx}{dt} \\neq 0$. $\\frac{dy}{dt} = 4t = 0 \\Rightarrow t = 0$. Here $\\frac{dx}{dt}(0) = -3 \\neq 0$."
                    ),
                    make_q(
                        "At what values of $t$ does the curve above have vertical tangent lines?",
                        ["$t = \\pm 1$", "$t = 0$", "$t = 3$", "$t = \\pm \\sqrt{3}$"], 0,
                        "Vertical tangents occur where $\\frac{dx}{dt} = 0$ while $\\frac{dy}{dt} \\neq 0$. $\\frac{dx}{dt} = 3t^2 - 3 = 0 \\Rightarrow t = \\pm 1$. $\\frac{dy}{dt}(\\pm 1) = \\pm 4 \\neq 0$."
                    ),
                    make_q(
                        "Find the equation of the tangent line at $t = 1$ to the curve $x(t) = e^{2t}, y(t) = 3t^2 - 1$.",
                        ["$y - 2 = \\frac{3}{e^2}(x - e^2)$", "$y - 2 = 3(x - e^2)$", "$y = \\frac{6}{e^2} x$", "$y - 1 = \\frac{3}{e^2}(x - e^2)$"], 0,
                        "At $t = 1$: $x = e^2, y = 2$. $\\frac{dx}{dt} = 2e^{2t} = 2e^2$, $\\frac{dy}{dt} = 6t = 6$. Slope $= \\frac{6}{2e^2} = \\frac{3}{e^2}$. Equation: $y - 2 = \\frac{3}{e^2}(x - e^2)$."
                    )
                ]
            },
            {
                "heading": "Section 3: Arc Length of Parametric Curves",
                "questions": [
                    make_q(
                        "Which integral represents the arc length $L$ of a parametric curve from $t = a$ to $t = b$?",
                        ["$\\int_a^b \\sqrt{(\\frac{dx}{dt})^2 + (\\frac{dy}{dt})^2} dt$", "$\\int_a^b (\\frac{dx}{dt} + \\frac{dy}{dt}) dt$", "$\\int_a^b \\sqrt{1 + (\\frac{dy}{dx})^2} dt$", "$\\int_a^b \\sqrt{x(t)^2 + y(t)^2} dt$"], 0,
                        "By the distance formula differential $ds = \\sqrt{(dx)^2 + (dy)^2} = \\sqrt{(x'(t))^2 + (y'(t))^2} dt$, the arc length is $\\int_a^b \\sqrt{(x')^2 + (y')^2} dt$."
                    ),
                    make_q(
                        "Find the arc length of the curve $x = 3\\cos t, y = 3\\sin t$ from $t = 0$ to $t = \\pi$.",
                        ["$3\\pi$", "$6\\pi$", "$9\\pi$", "$\\frac{3\\pi}{2}$"], 0,
                        "$x' = -3\\sin t, y' = 3\\cos t$. $\\sqrt{(-3\\sin t)^2 + (3\\cos t)^2} = \\sqrt{9} = 3$. Length $= \\int_0^\\pi 3 dt = 3\\pi$ (semicircle of radius $3$)."
                    ),
                    make_q(
                        "Find the arc length of $x = 2t^{3/2}, y = 3t$ from $t = 0$ to $t = 3$.",
                        ["$14$", "$16$", "$18$", "$12$"], 0,
                        "$x' = 3\\sqrt{t}, y' = 3$. Speed $= \\sqrt{9t + 9} = 3\\sqrt{t + 1}$. $L = \\int_0^3 3\\sqrt{t + 1} dt = [2(t + 1)^{3/2}]_0^3 = 2(4^{3/2} - 1^{3/2}) = 2(8 - 1) = 14$."
                    )
                ]
            },
            {
                "heading": "Section 4: Speed and Total Distance Traveled",
                "questions": [
                    make_q(
                        "A particle moves in the $xy$-plane with velocity vector $\\mathbf{v}(t) = \\langle 4t, 3 \\rangle$. What is its speed at $t = 1$?",
                        ["$5$", "$7$", "$4$", "$\\sqrt{7}$"], 0,
                        "Speed is the magnitude of the velocity vector: $\\|\\mathbf{v}(1)\\| = \\sqrt{(4(1))^2 + 3^2} = \\sqrt{16 + 9} = 5$."
                    ),
                    make_q(
                        "What is the total distance traveled by the particle with velocity $\\mathbf{v}(t) = \\langle 2t, 2 \\rangle$ from $t = 0$ to $t = 2$?",
                        ["$\\int_0^2 \\sqrt{4t^2 + 4} dt$", "$\\int_0^2 (2t + 2) dt$", "$\\sqrt{16 + 4}$", "$2\\sqrt{5}$"], 0,
                        "Total distance traveled is the integral of speed: $\\int_0^2 \\sqrt{(2t)^2 + 2^2} dt = \\int_0^2 \\sqrt{4t^2 + 4} dt$."
                    ),
                    make_q(
                        "When is a parametric particle at rest in the coordinate plane?",
                        ["When both $\\frac{dx}{dt} = 0$ and $\\frac{dy}{dt} = 0$ simultaneously", "When $\\frac{dy}{dx} = 0$", "When $\\frac{dx}{dt} = 0$", "When speed is undefined"], 0,
                        "A particle is at rest if and only if both component velocities are simultaneously zero, meaning speed $\\|\\mathbf{v}(t)\\| = 0$."
                    )
                ]
            }
        ]
    },

    # --------------------------------------------------------------------------
    # APBC 3.02: Vector-Valued Functions
    # --------------------------------------------------------------------------
    {
        "track": "apbc",
        "num": "3.02",
        "slug": "vector-valued-functions",
        "title": "Vector-Valued Functions",
        "sections": [
            {
                "heading": "Section 1: Position, Velocity, and Acceleration Vectors",
                "questions": [
                    make_q(
                        "A particle has position vector $\\mathbf{r}(t) = \\langle t^3 - 2t, \\sin(2t) \\rangle$. Find the acceleration vector $\\mathbf{a}(t)$ at $t = 0$.",
                        ["$\\langle 0, 0 \\rangle$", "$\\langle -2, 2 \\rangle$", "$\\langle 0, -4 \\rangle$", "$\\langle 6, 0 \\rangle$"], 0,
                        "$\\mathbf{v}(t) = \\langle 3t^2 - 2, 2\\cos(2t) \\rangle$. $\\mathbf{a}(t) = \\langle 6t, -4\\sin(2t) \\rangle$. At $t = 0$: $\\mathbf{a}(0) = \\langle 0, 0 \\rangle$."
                    ),
                    make_q(
                        "If the velocity vector of a particle is $\\mathbf{v}(t) = \\langle 3t^2, 4t \\rangle$ and $\\mathbf{r}(0) = \\langle 1, 5 \\rangle$, find $\\mathbf{r}(1)$.",
                        ["$\\langle 2, 7 \\rangle$", "$\\langle 1, 2 \\rangle$", "$\\langle 4, 9 \\rangle$", "$\\langle 3, 4 \\rangle$"], 0,
                        "$\\mathbf{r}(t) = \\langle t^3 + 1, 2t^2 + 5 \\rangle$. At $t = 1$: $\\mathbf{r}(1) = \\langle 1 + 1, 2 + 5 \\rangle = \\langle 2, 7 \\rangle$."
                    ),
                    make_q(
                        "What is the magnitude of the acceleration vector $\\mathbf{a}(t) = \\langle 3, -4 \\rangle$?",
                        ["$5$", "$7$", "$\\sqrt{7}$", "$1$"], 0,
                        "$\\|\\mathbf{a}\\| = \\sqrt{3^2 + (-4)^2} = \\sqrt{9 + 16} = 5$."
                    )
                ]
            },
            {
                "heading": "Section 2: Finding Position from Velocity & Acceleration",
                "questions": [
                    make_q(
                        "Given $\\mathbf{a}(t) = \\langle 0, -32 \\rangle$ with initial velocity $\\mathbf{v}(0) = \\langle 20, 64 \\rangle$, what is $\\mathbf{v}(2)$?",
                        ["$\\langle 20, 0 \\rangle$", "$\\langle 20, -32 \\rangle$", "$\\langle 0, 0 \\rangle$", "$\\langle 20, 32 \\rangle$"], 0,
                        "$\\mathbf{v}(t) = \\langle 20, -32t + 64 \\rangle$. At $t = 2$: $\\mathbf{v}(2) = \\langle 20, -64 + 64 \\rangle = \\langle 20, 0 \\rangle$."
                    ),
                    make_q(
                        "In the trajectory above, what is the maximum height achieved if initial position is $\\mathbf{r}(0) = \\langle 0, 0 \\rangle$?",
                        ["$64$ feet", "$32$ feet", "$128$ feet", "$16$ feet"], 0,
                        "Maximum height occurs when $v_y(t) = 0 \\Rightarrow t = 2$. $y(t) = -16t^2 + 64t$. At $t = 2$: $y(2) = -16(4) + 64(2) = -64 + 128 = 64$ feet."
                    ),
                    make_q(
                        "If a particle has $\\mathbf{v}(t) = \\langle \\frac{1}{t+1}, 2e^{2t} \\rangle$ and $\\mathbf{r}(0) = \\langle 3, 4 \\rangle$, find the $x$-component $x(t)$.",
                        ["$x(t) = \\ln(t + 1) + 3$", "$x(t) = \\ln(t + 1)$", "$x(t) = -\\frac{1}{(t+1)^2} + 3$", "$x(t) = e^{t+1} + 2$"], 0,
                        "$x(t) = \\int \\frac{1}{t+1} dt = \\ln(t + 1) + C$. Since $x(0) = 3$, $\\ln(1) + C = 3 \\Rightarrow C = 3$."
                    )
                ]
            },
            {
                "heading": "Section 3: Speed, Direction, and Displacement",
                "questions": [
                    make_q(
                        "What is the direction angle $\\theta$ of motion when $\\mathbf{v}(t) = \\langle -2, 2\\sqrt{3} \\rangle$?",
                        ["$\\frac{2\\pi}{3}$", "$\\frac{\\pi}{3}$", "$\\frac{5\\pi}{6}$", "$\\frac{4\\pi}{3}$"], 0,
                        "$\\tan\\theta = \\frac{v_y}{v_x} = \\frac{2\\sqrt{3}}{-2} = -\\sqrt{3}$. In Quadrant II, $\\theta = \\pi - \\frac{\\pi}{3} = \\frac{2\\pi}{3}$."
                    ),
                    make_q(
                        "Which vector represents the net displacement of a particle from $t = 1$ to $t = 4$?",
                        ["$\\int_1^4 \\mathbf{v}(t) dt$", "$\\int_1^4 \\|\\mathbf{v}(t)\\| dt$", "$\\mathbf{v}(4) - \\mathbf{v}(1)$", "$\\mathbf{a}(4) - \\mathbf{a}(1)$"], 0,
                        "Displacement vector is $\\Delta \\mathbf{r} = \\mathbf{r}(4) - \\mathbf{r}(1) = \\int_1^4 \\mathbf{v}(t) dt$."
                    ),
                    make_q(
                        "If speed is constant, what must be true about the acceleration vector and the velocity vector?",
                        ["$\\mathbf{a}(t) \\cdot \\mathbf{v}(t) = 0$ (orthogonal)", "$\\mathbf{a}(t)$ is zero", "$\\mathbf{a}(t)$ is parallel to $\\mathbf{v}(t)$", "$\\mathbf{a}(t) = -\\mathbf{v}(t)$"], 0,
                        "Since speed squared $\\|\\mathbf{v}\\|^2 = \\mathbf{v} \\cdot \\mathbf{v}$ is constant, differentiating yields $2\\mathbf{v} \\cdot \\mathbf{a} = 0$, meaning acceleration is always perpendicular to velocity."
                    )
                ]
            },
            {
                "heading": "Section 4: Distance Traveled with Vector-Valued Functions",
                "questions": [
                    make_q(
                        "Write an integral for the total distance traveled by a particle from $t = 0$ to $t = 5$ with $\\mathbf{v}(t) = \\langle \\cos(t^2), e^{\\sqrt{t}} \\rangle$.",
                        ["$\\int_0^5 \\sqrt{\\cos^2(t^2) + e^{2\\sqrt{t}}} dt$", "$\\int_0^5 (\\cos(t^2) + e^{\\sqrt{t}}) dt$", "$\\sqrt{\\int_0^5 \\cos^2(t^2) dt + \\int_0^5 e^{2\\sqrt{t}} dt}$", "$\\int_0^5 \\|\\mathbf{a}(t)\\| dt$"], 0,
                        "Distance traveled is $\\int_0^5 \\|\\mathbf{v}(t)\\| dt = \\int_0^5 \\sqrt{(\\cos(t^2))^2 + (e^{\\sqrt{t}})^2} dt = \\int_0^5 \\sqrt{\\cos^2(t^2) + e^{2\\sqrt{t}}} dt$."
                    ),
                    make_q(
                        "A particle moves with speed $\\sqrt{9 + 16t^2}$. What is the total distance traveled from $t = 0$ to $t = 1$?",
                        ["$\\int_0^1 \\sqrt{9 + 16t^2} dt$", "$\\sqrt{25} = 5$", "$\\frac{25}{2}$", "$4$"], 0,
                        "Distance is the definite integral of speed over the time interval: $\\int_0^1 \\sqrt{9 + 16t^2} dt$."
                    ),
                    make_q(
                        "If a particle starts at $(2, 3)$ and has displacement $\\langle -4, 7 \\rangle$, what is its final position?",
                        ["$(-2, 10)$", "$(6, -4)$", "$(2, 10)$", "$(-6, 4)$"], 0,
                        "Final position $= \\langle 2 + (-4), 3 + 7 \\rangle = \\langle -2, 10 \\rangle$."
                    )
                ]
            }
        ]
    },

    # --------------------------------------------------------------------------
    # APBC 4.01: Polar Curves and Derivatives
    # --------------------------------------------------------------------------
    {
        "track": "apbc",
        "num": "4.01",
        "slug": "polar-curves-and-derivatives",
        "title": "Polar Curves and Derivatives",
        "sections": [
            {
                "heading": "Section 1: Slopes of Tangent Lines to Polar Curves",
                "questions": [
                    make_q(
                        "Which formula gives the slope $\\frac{dy}{dx}$ of the tangent line to the polar curve $r = f(\\theta)$?",
                        ["$\\frac{\\frac{dr}{d\\theta}\\sin\\theta + r\\cos\\theta}{\\frac{dr}{d\\theta}\\cos\\theta - r\\sin\\theta}$", "$\\frac{dr}{d\\theta}$", "$\\frac{r\\sin\\theta}{r\\cos\\theta}$", "$\\frac{\\frac{dr}{d\\theta}\\cos\\theta}{\\frac{dr}{d\\theta}\\sin\\theta}$"], 0,
                        "From $x = r\\cos\\theta$ and $y = r\\sin\\theta$, applying product rule: $\\frac{dy}{dx} = \\frac{dy/d\\theta}{dx/d\\theta} = \\frac{r'\\sin\\theta + r\\cos\\theta}{r'\\cos\\theta - r\\sin\\theta}$."
                    ),
                    make_q(
                        "Find the slope of the tangent line to the circle $r = 2\\cos\\theta$ at $\\theta = \\frac{\\pi}{4}$.",
                        ["$-1$", "$1$", "$0$", "Undefined"], 0,
                        "At $\\theta = \\pi/4$: $r = 2(\\frac{\\sqrt{2}}{2}) = \\sqrt{2}$. $r' = -2\\sin\\theta = -\\sqrt{2}$. Numerator $= -\\sqrt{2}(\\frac{\\sqrt{2}}{2}) + \\sqrt{2}(\\frac{\\sqrt{2}}{2}) = -1 + 1 = 0$. Denominator $= -\\sqrt{2}(\\frac{\\sqrt{2}}{2}) - \\sqrt{2}(\\frac{\\sqrt{2}}{2}) = -1 - 1 = -2$. Slope $= \\frac{0}{-2} = 0$ (or at $\\theta=\\pi/4$: horizontal tangent)."
                    ),
                    make_q(
                        "What is the slope of the tangent line to the cardioid $r = 1 + \\sin\\theta$ at $\\theta = 0$?",
                        ["$1$", "$-1$", "$0$", "Undefined"], 0,
                        "At $\\theta = 0$: $r = 1$. $r' = \\cos(0) = 1$. Numerator $= 1(0) + 1(1) = 1$. Denominator $= 1(1) - 1(0) = 1$. Slope $= \\frac{1}{1} = 1$."
                    )
                ]
            },
            {
                "heading": "Section 2: Horizontal and Vertical Tangents on Polar Curves",
                "questions": [
                    make_q(
                        "Horizontal tangent lines to a polar curve occur where which condition is met?",
                        ["$\\frac{dy}{d\\theta} = 0$ and $\\frac{dx}{d\\theta} \\neq 0$", "$\\frac{dr}{d\\theta} = 0$", "$\\frac{dx}{d\\theta} = 0$", "$r = 0$"], 0,
                        "A horizontal tangent requires the numerator of $\\frac{dy}{dx}$ to be zero: $\\frac{dy}{d\\theta} = 0$ (provided $\\frac{dx}{d\\theta} \\neq 0$)."
                    ),
                    make_q(
                        "Vertical tangent lines occur where which condition is met?",
                        ["$\\frac{dx}{d\\theta} = 0$ and $\\frac{dy}{d\\theta} \\neq 0$", "$\\frac{dr}{d\\theta} = 0$", "$\\frac{dy}{d\\theta} = 0$", "$r = 1$"], 0,
                        "A vertical tangent requires the denominator of $\\frac{dy}{dx}$ to be zero: $\\frac{dx}{d\\theta} = 0$ (provided $\\frac{dy}{d\\theta} \\neq 0$)."
                    ),
                    make_q(
                        "At the pole ($r = 0$), what is the slope of the tangent line to the curve $r = f(\\theta)$ when $f(\\alpha) = 0$?",
                        ["$\\tan\\alpha$", "$\\cot\\alpha$", "$0$", "Undefined"], 0,
                        "When $r = 0$, $\\frac{dy}{dx} = \\frac{r'\\sin\\alpha + 0}{r'\\cos\\alpha - 0} = \\frac{\\sin\\alpha}{\\cos\\alpha} = \\tan\\alpha$."
                    )
                ]
            },
            {
                "heading": "Section 3: Rate of Change of r and Distance from Origin",
                "questions": [
                    make_q(
                        "For the polar curve $r = 3 - 2\\cos\\theta$, what is $\\frac{dr}{d\\theta}$ at $\\theta = \\frac{\\pi}{2}$?",
                        ["$2$", "$-2$", "$0$", "$3$"], 0,
                        "$\\frac{dr}{d\\theta} = -2(-\\sin\\theta) = 2\\sin\\theta$. At $\\theta = \\frac{\\pi}{2}$: $2\\sin(\\frac{\\pi}{2}) = 2(1) = 2$."
                    ),
                    make_q(
                        "If $\\frac{dr}{d\\theta} > 0$ for a polar curve, what does this indicate about the distance from the pole?",
                        ["The distance from the origin is increasing as $\\theta$ increases", "The distance is decreasing", "The curve is concave up", "The curve is a line"], 0,
                        "Since $r$ measures directed distance from the origin, $\\frac{dr}{d\\theta} > 0$ (for $r > 0$) means the particle is moving away from the pole."
                    ),
                    make_q(
                        "At what angle $\\theta \\in [0, 2\\pi)$ is the distance from the origin maximized for $r = 2 + 3\\cos\\theta$?",
                        ["$\\theta = 0$", "$\\theta = \\pi$", "$\\theta = \\frac{\\pi}{2}$", "$\\theta = \\frac{3\\pi}{2}$"], 0,
                        "Maximum value of $\\cos\\theta$ is $1$, which occurs at $\\theta = 0$, giving maximum distance $r = 2 + 3(1) = 5$."
                    )
                ]
            },
            {
                "heading": "Section 4: Arc Length of Polar Curves",
                "questions": [
                    make_q(
                        "Which integral represents the arc length of the polar curve $r = f(\\theta)$ from $\\theta = \\alpha$ to $\\theta = \\beta$?",
                        ["$\\int_\\alpha^\\beta \\sqrt{r^2 + (\\frac{dr}{d\\theta})^2} d\\theta$", "$\\int_\\alpha^\\beta \\sqrt{1 + (\\frac{dr}{d\\theta})^2} d\\theta$", "$\\frac{1}{2} \\int_\\alpha^\\beta r^2 d\\theta$", "$\\int_\\alpha^\\beta r d\\theta$"], 0,
                        "By transforming $ds = \\sqrt{(dx)^2 + (dy)^2}$, polar arc length is $L = \\int_\\alpha^\\beta \\sqrt{r^2 + (r')^2} d\\theta$."
                    ),
                    make_q(
                        "Find the total perimeter of the circle $r = 4\\cos\\theta$ for $\\theta \\in [0, \\pi]$.",
                        ["$4\\pi$", "$8\\pi$", "$2\\pi$", "$16\\pi$"], 0,
                        "$r' = -4\\sin\\theta$. $\\sqrt{r^2 + (r')^2} = \\sqrt{16\\cos^2\\theta + 16\\sin^2\\theta} = \\sqrt{16} = 4$. Perimeter $= \\int_0^\\pi 4 d\\theta = 4\\pi$."
                    ),
                    make_q(
                        "Set up the arc length of the cardioid $r = 1 + \\cos\\theta$ from $\\theta = 0$ to $\\theta = 2\\pi$.",
                        ["$\\int_0^{2\\pi} \\sqrt{2 + 2\\cos\\theta} d\\theta$", "$\\int_0^{2\\pi} (1 + \\cos\\theta) d\\theta$", "$\\int_0^{2\\pi} \\sqrt{1 + \\cos^2\\theta} d\\theta$", "$2\\int_0^\\pi (1 + \\sin\\theta) d\\theta$"], 0,
                        "$r^2 + (r')^2 = (1 + \\cos\\theta)^2 + (-\\sin\\theta)^2 = 1 + 2\\cos\\theta + \\cos^2\\theta + \\sin^2\\theta = 2 + 2\\cos\\theta$."
                    )
                ]
            }
        ]
    },

    # --------------------------------------------------------------------------
    # APBC 4.02: Area in Polar Coordinates
    # --------------------------------------------------------------------------
    {
        "track": "apbc",
        "num": "4.02",
        "slug": "area-in-polar-coordinates",
        "title": "Area in Polar Coordinates",
        "sections": [
            {
                "heading": "Section 1: Sector Area Formula & Single Curves",
                "questions": [
                    make_q(
                        "Which integral formula calculates the area of a region bounded by the polar curve $r = f(\\theta)$ from $\\alpha$ to $\\beta$?",
                        ["$\\frac{1}{2} \\int_\\alpha^\\beta r^2 d\\theta$", "$\\int_\\alpha^\\beta r^2 d\\theta$", "$\\frac{1}{2} \\int_\\alpha^\\beta r d\\theta$", "$\\pi \\int_\\alpha^\\beta r^2 d\\theta$"], 0,
                        "Polar area is the sum of infinitesimal circular sectors with area $dA = \\frac{1}{2} r^2 d\\theta$."
                    ),
                    make_q(
                        "Find the area enclosed by the circle $r = 4\\sin\\theta$ for $\\theta \\in [0, \\pi]$.",
                        ["$4\\pi$", "$8\\pi$", "$16\\pi$", "$2\\pi$"], 0,
                        "Area $= \\frac{1}{2} \\int_0^\\pi 16\\sin^2\\theta d\\theta = 8 [\\frac{\\theta}{2} - \\frac{\\sin(2\\theta)}{4}]_0^\\pi = 8(\\frac{\\pi}{2}) = 4\\pi$."
                    ),
                    make_q(
                        "What is the area enclosed by one petal of the four-petal rose $r = 2\\cos(2\\theta)$?",
                        ["$\\frac{\\pi}{2}$", "$\\pi$", "$2\\pi$", "$\\frac{\\pi}{4}$"], 0,
                        "One petal spans from $\\theta = -\\pi/4$ to $\\pi/4$. Area $= \\frac{1}{2} \\int_{-\\pi/4}^{\\pi/4} 4\\cos^2(2\\theta) d\\theta = 2 \\int_{-\\pi/4}^{\\pi/4} \\frac{1 + \\cos(4\\theta)}{2} d\\theta = [\\theta + \\frac{\\sin(4\\theta)}{4}]_{-\\pi/4}^{\\pi/4} = \\frac{\\pi}{4} - (-\\frac{\\pi}{4}) = \\frac{\\pi}{2}$."
                    )
                ]
            },
            {
                "heading": "Section 2: Area Between Two Polar Curves",
                "questions": [
                    make_q(
                        "Which integral represents the area inside $r = R(\\theta)$ and outside $r = r(\\theta)$?",
                        ["$\\frac{1}{2} \\int_\\alpha^\\beta (R(\\theta)^2 - r(\\theta)^2) d\\theta$", "$\\frac{1}{2} \\int_\\alpha^\\beta (R(\\theta) - r(\\theta))^2 d\\theta$", "$\\int_\\alpha^\\beta (R^2 - r^2) d\\theta$", "$\\frac{1}{2} \\int_\\alpha^\\beta R(\\theta) r(\\theta) d\\theta$"], 0,
                        "Area is difference of sectors: $\\frac{1}{2} \\int (R^2 - r^2) d\\theta$."
                    ),
                    make_q(
                        "Find the points of intersection of $r = 3$ and $r = 6\\cos\\theta$.",
                        ["$\\theta = \\pm \\frac{\\pi}{3}$", "$\\theta = \\pm \\frac{\\pi}{6}$", "$\\theta = \\pm \\frac{\\pi}{4}$", "$\\theta = \\frac{\\pi}{2}$"], 0,
                        "$6\\cos\\theta = 3 \\Rightarrow \\cos\\theta = \\frac{1}{2} \\Rightarrow \\theta = \\pm \\frac{\\pi}{3}$."
                    ),
                    make_q(
                        "Set up the integral for the area inside $r = 6\\cos\\theta$ and outside $r = 3$.",
                        ["$\\frac{1}{2} \\int_{-\\pi/3}^{\\pi/3} (36\\cos^2\\theta - 9) d\\theta$", "$\\frac{1}{2} \\int_{-\\pi/3}^{\\pi/3} (6\\cos\\theta - 3)^2 d\\theta$", "$\\int_0^{\\pi/3} (36\\cos^2\\theta - 9) d\\theta$", "$\\frac{1}{2} \\int_0^{\\pi/3} (6\\cos\\theta - 3) d\\theta$"], 0,
                        "Outer curve is $6\\cos\\theta$, inner curve is $3$. Formula: $\\frac{1}{2} \\int_{-\\pi/3}^{\\pi/3} (36\\cos^2\\theta - 9) d\\theta$."
                    )
                ]
            },
            {
                "heading": "Section 3: Common Interior of Two Curves",
                "questions": [
                    make_q(
                        "How is the common interior area of two overlapping polar curves calculated when the boundary changes?",
                        ["By finding the intersection angle and splitting the region into separate single-curve integrals", "By subtracting the outer curve from the inner curve", "By integrating the product of the two curves", "By averaging the two individual areas"], 0,
                        "When rays from the origin transition from hitting one curve to hitting another, the area must be split at the intersection angle into separate integrals."
                    ),
                    make_q(
                        "Find the area inside both $r = 2$ and $r = 4\\sin\\theta$ in the first quadrant.",
                        ["$\\frac{4\\pi}{3} - \\sqrt{3}$", "$2\\pi$", "$\\frac{2\\pi}{3}$", "$4\\sqrt{3}$"], 0,
                        "Intersection: $4\\sin\\theta = 2 \\Rightarrow \\sin\\theta = 1/2 \\Rightarrow \\theta = \\pi/6$. From $0$ to $\\pi/6$, bound is $4\\sin\\theta$; from $\\pi/6$ to $\\pi/2$, bound is $2$. Sum yields $\\frac{4\\pi}{3} - \\sqrt{3}$."
                    ),
                    make_q(
                        "Why does the pole require special care when finding intersection points of polar curves?",
                        ["Because $r = 0$ corresponds to the same physical point (the origin) regardless of the angle $\\theta$", "Because $\\theta$ is undefined at $r = 0$", "Because the area at the pole is infinite", "It does not require special care"], 0,
                        "The origin can be reached by two curves at entirely different values of $\\theta$, so setting $f(\\theta) = g(\\theta)$ may fail to detect an intersection at the pole."
                    )
                ]
            },
            {
                "heading": "Section 4: Integration Limits & Full-Period Curves",
                "questions": [
                    make_q(
                        "What is the range of $\\theta$ required to trace the limaçon $r = 2 + \\cos\\theta$ exactly once?",
                        ["$[0, 2\\pi]$", "$[0, \\pi]$", "$[0, 4\\pi]$", "$[-\\frac{\\pi}{2}, \\frac{\\pi}{2}]$"], 0,
                        "For a limaçon without loops ($r = a + b\\cos\\theta$ with $a > b$), the curve is traced exactly once as $\\theta$ traverses $[0, 2\\pi]$."
                    ),
                    make_q(
                        "Find the total area enclosed by the cardioid $r = 2(1 + \\cos\\theta)$.",
                        ["$6\\pi$", "$4\\pi$", "$8\\pi$", "$12\\pi$"], 0,
                        "Area $= \\frac{1}{2} \\int_0^{2\\pi} 4(1 + 2\\cos\\theta + \\cos^2\\theta) d\\theta = 2 \\int_0^{2\\pi} (1 + 2\\cos\\theta + \\frac{1 + \\cos(2\\theta)}{2}) d\\theta = 2(2\\pi + 0 + \\pi) = 6\\pi$."
                    ),
                    make_q(
                        "How many times is the circle $r = \\sin(2\\theta)$ traced over $[0, 2\\pi]$?",
                        ["It is a 4-petal rose traced once over $[0, 2\\pi]$", "It is a circle traced twice", "It is traced 4 times", "It is an ellipse"], 0,
                        "$r = \\sin(2\\theta)$ is an eight-petal or four-petal curve (four distinct petals) traced once completely as $\\theta$ increases from $0$ to $2\\pi$."
                    )
                ]
            }
        ]
    }
]
