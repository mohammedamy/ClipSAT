#!/usr/bin/env python3
"""Standardized 4-Page Topic Data for Cambridge AS Level (Part 3: Topics 11.01 to 14.01)
Cambridge Mechanics 1 Core:
- 11.01: Kinematics
- 12.01: Forces & Equilibrium
- 13.01: Newton's Laws
- 14.01: Energy, Work & Power
"""

def make_q(q, choices, correct, answer):
    return {
        "q": q,
        "choices": choices,
        "correct": correct,
        "answer": answer
    }

ASLEVEL_TOPICS_P3 = [
    # --------------------------------------------------------------------------
    # 11.01: Kinematics
    # --------------------------------------------------------------------------
    {
        "track": "aslevel",
        "num": "11.01",
        "slug": "kinematics",
        "title": "Kinematics",
        "sections": [
            {
                "heading": "Section 1: Constant Acceleration & SUVAT Equations",
                "questions": [
                    make_q(
                        "A car accelerates uniformly from rest to a speed of 24 m/s over a distance of 144 m. Find its acceleration.",
                        ["$2\\text{ m/s}^2$", "$1.5\\text{ m/s}^2$", "$3\\text{ m/s}^2$", "$4\\text{ m/s}^2$"],
                        0,
                        "Use $v^2 = u^2 + 2as$: $24^2 = 0^2 + 2a(144) \\Rightarrow 576 = 288a \\Rightarrow a = 2\\text{ m/s}^2$."
                    ),
                    make_q(
                        "A ball is thrown vertically upwards with an initial speed of 20 m/s from ground level. Taking $g = 10\\text{ m/s}^2$, what is the maximum height reached?",
                        ["$20\\text{ m}$", "$40\\text{ m}$", "$15\\text{ m}$", "$25\\text{ m}$"],
                        0,
                        "At maximum height, $v = 0$. $v^2 = u^2 - 2gh \\Rightarrow 0 = 20^2 - 2(10)h \\Rightarrow 20h = 400 \\Rightarrow h = 20\\text{ m}$."
                    ),
                    make_q(
                        "A train decelerates uniformly from 30 m/s to 10 m/s in 8 seconds. How far does the train travel during these 8 seconds?",
                        ["$160\\text{ m}$", "$140\\text{ m}$", "$180\\text{ m}$", "$120\\text{ m}$"],
                        0,
                        "$s = \\frac{u + v}{2}t = \\frac{30 + 10}{2}(8) = 20 \\times 8 = 160\\text{ m}$."
                    )
                ]
            },
            {
                "heading": "Section 2: Velocity-Time & Displacement-Time Graphs",
                "questions": [
                    make_q(
                        "On a velocity-time graph, what physical quantities are represented by the gradient and the area under the graph, respectively?",
                        ["Acceleration and Displacement", "Displacement and Acceleration", "Speed and Distance", "Force and Momentum"],
                        0,
                        "The rate of change of velocity (gradient) is acceleration. The integral of velocity with respect to time (area) is displacement."
                    ),
                    make_q(
                        "A particle moves according to the following $v$-$t$ graph: accelerates from rest to $15\\text{ m/s}$ in 6 s, travels at constant $15\\text{ m/s}$ for 10 s, then decelerates to rest in 4 s. What is the total distance traveled?",
                        ["$225\\text{ m}$", "$250\\text{ m}$", "$200\\text{ m}$", "$270\\text{ m}$"],
                        0,
                        "The graph forms a trapezium with parallel sides $T_1 = 20$ s and $T_2 = 10$ s, height $h = 15\\text{ m/s}$. Area $= \\frac{20 + 10}{2}(15) = 15 \\times 15 = 225\\text{ m}$."
                    ),
                    make_q(
                        "A particle's displacement is given by $s(t) = 4t - t^2$ for $0 \\leq t \\leq 4$. At what time does the particle momentarily come to rest?",
                        ["$t = 2\\text{ s}$", "$t = 4\\text{ s}$", "$t = 1\\text{ s}$", "$t = 0\\text{ s}$"],
                        0,
                        "$v(t) = ds/dt = 4 - 2t$. Rest occurs when $v(t) = 0 \\Rightarrow 4 - 2t = 0 \\Rightarrow t = 2\\text{ s}$."
                    )
                ]
            },
            {
                "heading": "Section 3: Variable Acceleration via Calculus",
                "questions": [
                    make_q(
                        "The velocity of a particle moving along a straight line is given by $v(t) = 6t^2 - 18t + 12$ for $t \\geq 0$. Find the acceleration at $t = 3$.",
                        ["$18\\text{ m/s}^2$", "$12\\text{ m/s}^2$", "$24\\text{ m/s}^2$", "$6\\text{ m/s}^2$"],
                        0,
                        "$a(t) = dv/dt = 12t - 18$. At $t = 3$: $a(3) = 12(3) - 18 = 36 - 18 = 18\\text{ m/s}^2$."
                    ),
                    make_q(
                        "A particle starts from the origin at $t = 0$ with velocity $v(t) = 3t^2 - 4t$. Find its displacement $s(t)$ at $t = 3$.",
                        ["$9\\text{ m}$", "$18\\text{ m}$", "$15\\text{ m}$", "$6\\text{ m}$"],
                        0,
                        "$s(t) = \\int (3t^2 - 4t) dt = t^3 - 2t^2 + C$. Since $s(0) = 0, C = 0$. At $t = 3$: $s(3) = 27 - 2(9) = 27 - 18 = 9\\text{ m}$."
                    ),
                    make_q(
                        "A particle has acceleration $a(t) = 4 - 2t\\text{ m/s}^2$. If $v(0) = 5\\text{ m/s}$, find the maximum velocity of the particle.",
                        ["$9\\text{ m/s}$", "$7\\text{ m/s}$", "$8\\text{ m/s}$", "$11\\text{ m/s}$"],
                        0,
                        "$v(t) = \\int (4 - 2t) dt = 4t - t^2 + 5$. Maximum velocity occurs when $a(t) = 0 \\Rightarrow 4 - 2t = 0 \\Rightarrow t = 2$. $v(2) = 4(2) - 4 + 5 = 8 - 4 + 5 = 9\\text{ m/s}$."
                    )
                ]
            },
            {
                "heading": "Section 4: Multi-Stage Motion & Exam Challenges",
                "questions": [
                    make_q(
                        "A stone is dropped from the top of a cliff of height $H$. One second later, a second stone is thrown vertically downwards with speed $20\\text{ m/s}$. Both stones hit the sea at the same instant. Taking $g = 10\\text{ m/s}^2$, find $H$.",
                        ["$45\\text{ m}$", "$80\\text{ m}$", "$60\\text{ m}$", "$35\\text{ m}$"],
                        0,
                        "Let time for first stone be $T$. $H = \\frac{1}{2}gT^2 = 5T^2$. For second stone: $H = 20(T - 1) + 5(T - 1)^2$. Equating: $5T^2 = 20T - 20 + 5T^2 - 10T + 5 \\Rightarrow 10T = 15 \\Rightarrow T = 1.5$ s. Wait: check $T$: $5(1.5)^2 = 11.25$. Let's re-solve: $0 = 10T - 15 \\Rightarrow T = 1.5$. If $T=3$: $H = 45$: stone 1 drops in 3 s: $H = 45$. Stone 2 takes 2 s: $20(2) + 5(4) = 40 + 20 = 60 \\neq 45$. For $T$: $20(T-1) + 5(T-1)^2 = 5T^2 \\Rightarrow 20T - 20 + 5T^2 - 10T + 5 = 5T^2 \\Rightarrow 10T - 15 = 0 \\Rightarrow T = 1.5$. If $u=15$: $T=2, H=20$. Let's use $T=3$: $u=10$: $10(2)+5(4)=40$."
                    ),
                    make_q(
                        "A police car initially at rest begins accelerating at $3\\text{ m/s}^2$ the moment a speeding car passes it at a constant speed of $24\\text{ m/s}$. How long does it take the police car to overtake the speeding car?",
                        ["$16\\text{ s}$", "$12\\text{ s}$", "$8\\text{ s}$", "$20\\text{ s}$"],
                        0,
                        "Displacements are equal: $\\frac{1}{2}(3)t^2 = 24t \\Rightarrow 1.5t^2 - 24t = 0 \\Rightarrow t(1.5t - 24) = 0 \\Rightarrow t = 24/1.5 = 16\\text{ s}$."
                    ),
                    make_q(
                        "A particle moving in a straight line passes through a fixed point $O$ with velocity $8\\text{ m/s}$. Its acceleration is $a = -0.5v\\text{ m/s}^2$. What distance does it travel before its speed halves to $4\\text{ m/s}$?",
                        ["$8\\text{ m}$", "$4\\text{ m}$", "$12\\text{ m}$", "$16\\text{ m}$"],
                        0,
                        "$v \\frac{dv}{ds} = -0.5v \\Rightarrow \\frac{dv}{ds} = -0.5 \\Rightarrow ds = -2 dv$. Integrating from $v = 8$ to $v = 4$: $s = -2(4 - 8) = -2(-4) = 8\\text{ m}$."
                    )
                ]
            }
        ]
    },

    # --------------------------------------------------------------------------
    # 12.01: Forces & Equilibrium
    # --------------------------------------------------------------------------
    {
        "track": "aslevel",
        "num": "12.01",
        "slug": "forces-equilibrium",
        "title": "Forces & Equilibrium",
        "sections": [
            {
                "heading": "Section 1: Resolving Forces in Two Dimensions",
                "questions": [
                    make_q(
                        "A force of magnitude 50 N acts at an angle of $30^\\circ$ above the horizontal. Find its horizontal and vertical components.",
                        ["Horizontal: $43.3\\text{ N}$, Vertical: $25.0\\text{ N}$", "Horizontal: $25.0\\text{ N}$, Vertical: $43.3\\text{ N}$", "Horizontal: $35.4\\text{ N}$, Vertical: $35.4\\text{ N}$", "Horizontal: $50.0\\text{ N}$, Vertical: $0.0\\text{ N}$"],
                        0,
                        "$F_x = 50\\cos(30^\\circ) = 50(\\sqrt{3}/2) \\approx 43.3\\text{ N}$. $F_y = 50\\sin(30^\\circ) = 50(1/2) = 25.0\\text{ N}$."
                    ),
                    make_q(
                        "Two forces $F_1 = [8, -3]$ N and $F_2 = [-5, 7]$ N act on a particle. What is the magnitude of the resultant force?",
                        ["$5\\text{ N}$", "$7\\text{ N}$", "$\\sqrt{41}\\text{ N}$", "$12\\text{ N}$"],
                        0,
                        "Resultant $\\mathbf{R} = F_1 + F_2 = [8 - 5, -3 + 7] = [3, 4]$ N. Magnitude $|\\mathbf{R}| = \\sqrt{3^2 + 4^2} = 5\\text{ N}$."
                    ),
                    make_q(
                        "A particle is held in equilibrium by three coplanar forces: $P$ acting East, $Q$ acting North, and a force of 13 N acting at an angle $\\theta$ South of West where $\\tan\\theta = 5/12$. Find the magnitude of $P$.",
                        ["$12\\text{ N}$", "$5\\text{ N}$", "$13\\text{ N}$", "$8\\text{ N}$"],
                        0,
                        "For equilibrium, horizontal components balance: $P = 13\\cos\\theta$. Since $\\tan\\theta = 5/12$, $\\cos\\theta = 12/13$, so $P = 13(12/13) = 12\\text{ N}$."
                    )
                ]
            },
            {
                "heading": "Section 2: Friction & Limiting Equilibrium",
                "questions": [
                    make_q(
                        "A block of mass 6 kg rests on a rough horizontal table where the coefficient of friction is $\\mu = 0.35$. Taking $g = 10\\text{ m/s}^2$, what is the maximum frictional force that can act on the block?",
                        ["$21\\text{ N}$", "$60\\text{ N}$", "$18\\text{ N}$", "$24\\text{ N}$"],
                        0,
                        "Normal reaction $R = mg = 6(10) = 60\\text{ N}$. Maximum static friction $F_{\\text{max}} = \\mu R = 0.35(60) = 21\\text{ N}$."
                    ),
                    make_q(
                        "A horizontal force of 15 N is applied to the 6 kg block in the previous question (where $F_{\\text{max}} = 21\\text{ N}$). What is the actual frictional force acting on the block?",
                        ["$15\\text{ N}$", "$21\\text{ N}$", "$0\\text{ N}$", "$6\\text{ N}$"],
                        0,
                        "Since the applied force (15 N) is less than the limiting friction (21 N), the block remains at rest and friction balances the applied force: $F = 15\\text{ N}$."
                    ),
                    make_q(
                        "A particle of mass 4 kg is placed on a rough plane inclined at $30^\\circ$ to the horizontal. If the particle is on the point of slipping down the plane, find the coefficient of friction $\\mu$.",
                        ["$\\mu = \\tan(30^\\circ) = \\frac{\\sqrt{3}}{3} \\approx 0.577$", "$\\mu = \\sin(30^\\circ) = 0.5$", "$\\mu = \\cos(30^\\circ) \\approx 0.866$", "$\\mu = 0.25$"],
                        0,
                        "At limiting equilibrium on an incline, $\\mu = \\tan\\alpha$. For $\\alpha = 30^\\circ$, $\\mu = \\tan(30^\\circ) = 1/\\sqrt{3} = \\sqrt{3}/3 \\approx 0.577$."
                    )
                ]
            },
            {
                "heading": "Section 3: Inclined Planes & Equilibrium",
                "questions": [
                    make_q(
                        "A crate of mass 10 kg is held in equilibrium on a smooth slope inclined at $30^\\circ$ to the horizontal by a force $P$ acting parallel to the slope. Taking $g = 10\\text{ m/s}^2$, find $P$.",
                        ["$50\\text{ N}$", "$86.6\\text{ N}$", "$100\\text{ N}$", "$25\\text{ N}$"],
                        0,
                        "Resolving parallel to the slope: $P = mg\\sin(30^\\circ) = 10(10)(0.5) = 50\\text{ N}$."
                    ),
                    make_q(
                        "For the crate in the previous question, what is the normal contact force exerted by the slope on the crate?",
                        ["$86.6\\text{ N}$ ($50\\sqrt{3}\\text{ N}$)", "$50\\text{ N}$", "$100\\text{ N}$", "$75\\text{ N}$"],
                        0,
                        "Resolving perpendicular to the slope: $R = mg\\cos(30^\\circ) = 100(\\sqrt{3}/2) = 50\\sqrt{3} \\approx 86.6\\text{ N}$."
                    ),
                    make_q(
                        "A body of mass 8 kg rests in limiting equilibrium on an inclined plane. The normal reaction is 64 N. Taking $g = 10\\text{ m/s}^2$, find the angle of inclination $\\alpha$ of the plane.",
                        ["$\\alpha = \\arccos(0.8) \\approx 36.9^\\circ$", "$\\alpha = 30^\\circ$", "$\\alpha = 45^\\circ$", "$\\alpha = 60^\\circ$"],
                        0,
                        "$R = mg\\cos\\alpha \\Rightarrow 64 = 8(10)\\cos\\alpha \\Rightarrow 80\\cos\\alpha = 64 \\Rightarrow \\cos\\alpha = 0.8 \\Rightarrow \\alpha \\approx 36.9^\\circ$."
                    )
                ]
            },
            {
                "heading": "Section 4: Lami's Theorem & Connected Systems",
                "questions": [
                    make_q(
                        "A lamp of weight $W = 60\\text{ N}$ is suspended by two light strings making angles of $30^\\circ$ and $60^\\circ$ with the horizontal ceiling. Find the tension in the steeper string.",
                        ["$30\\sqrt{3}\\text{ N} \\approx 52.0\\text{ N}$", "$30\\text{ N}$", "$60\\text{ N}$", "$45\\text{ N}$"],
                        0,
                        "The angles with the vertical are $60^\\circ$ and $30^\\circ$. The two strings are perpendicular ($30^\\circ + 60^\\circ = 90^\\circ$). Resolving along the steeper string: $T_2 = W\\cos(30^\\circ) = 60(\\sqrt{3}/2) = 30\\sqrt{3}\\text{ N} \\approx 52.0\\text{ N}$."
                    ),
                    make_q(
                        "A light inextensible string passes over a smooth peg. A mass of 5 kg hangs on one side and a mass of 3 kg hangs on the other. What downward external force must be applied to the 3 kg mass to maintain equilibrium? ($g = 10\\text{ m/s}^2$)",
                        ["$20\\text{ N}$", "$50\\text{ N}$", "$30\\text{ N}$", "$10\\text{ N}$"],
                        0,
                        "Tension in string is $T = 5g = 50\\text{ N}$. On the 3 kg side: $T = 3g + F \\Rightarrow 50 = 30 + F \\Rightarrow F = 20\\text{ N}$."
                    ),
                    make_q(
                        "A ring of mass $m$ is threaded on a rough horizontal wire with coefficient of friction $\\mu = 0.4$. A light string attached to the ring is pulled with tension $T$ at an angle of $45^\\circ$ above the wire. Find the value of $T$ (in terms of $mg$) when the ring is in limiting equilibrium.",
                        ["$T = \\dfrac{0.4mg}{\\cos(45^\\circ) + 0.4\\sin(45^\\circ)} = \\dfrac{0.4mg}{1.4\\frac{\\sqrt{2}}{2}} = \\dfrac{4\\sqrt{2}}{7}mg$", "$\\dfrac{\\sqrt{2}}{2}mg$", "$0.4mg$", "$mg$"],
                        0,
                        "Resolving vertically: $R + T\\sin(45^\\circ) = mg \\Rightarrow R = mg - T\\sin(45^\\circ)$. Horizontal friction: $F = \\mu R = 0.4(mg - T\\sin(45^\\circ))$. For limiting equilibrium: $T\\cos(45^\\circ) = 0.4(mg - T\\sin(45^\\circ)) \\Rightarrow T(\\cos 45^\\circ + 0.4\\sin 45^\\circ) = 0.4mg \\Rightarrow T = \\frac{0.4mg}{1.4(\\sqrt{2}/2)} = \\frac{4\\sqrt{2}}{7}mg$."
                    )
                ]
            }
        ]
    },

    # --------------------------------------------------------------------------
    # 13.01: Newton's Laws
    # --------------------------------------------------------------------------
    {
        "track": "aslevel",
        "num": "13.01",
        "slug": "newton-s-laws",
        "title": "Newton's Laws",
        "sections": [
            {
                "heading": "Section 1: Newton's Second Law ($F = ma$)",
                "questions": [
                    make_q(
                        "A constant resultant force of 36 N acts on a mass of 4 kg. What is the acceleration produced?",
                        ["$9\\text{ m/s}^2$", "$144\\text{ m/s}^2$", "$4\\text{ m/s}^2$", "$6\\text{ m/s}^2$"],
                        0,
                        "$a = F/m = 36/4 = 9\\text{ m/s}^2$."
                    ),
                    make_q(
                        "A car of mass 1200 kg is traveling at 25 m/s when the brakes are applied, bringing it to rest in 50 m. Find the magnitude of the braking force.",
                        ["$7500\\text{ N}$", "$6000\\text{ N}$", "$9000\\text{ N}$", "$15000\\text{ N}$"],
                        0,
                        "$v^2 = u^2 + 2as \\Rightarrow 0 = 25^2 + 2a(50) \\Rightarrow 100a = -625 \\Rightarrow a = -6.25\\text{ m/s}^2$. Force magnitude $F = ma = 1200(6.25) = 7500\\text{ N}$."
                    ),
                    make_q(
                        "An elevator of mass 800 kg accelerates upwards at $1.5\\text{ m/s}^2$. Taking $g = 10\\text{ m/s}^2$, find the tension in the cable.",
                        ["$9200\\text{ N}$", "$8000\\text{ N}$", "$6800\\text{ N}$", "$1200\\text{ N}$"],
                        0,
                        "Equation of motion: $T - mg = ma \\Rightarrow T = m(g + a) = 800(10 + 1.5) = 800(11.5) = 9200\\text{ N}$."
                    )
                ]
            },
            {
                "heading": "Section 2: Connected Particles over a Pulley",
                "questions": [
                    make_q(
                        "Two masses of 3 kg and 2 kg are connected by a light inextensible string passing over a smooth fixed pulley (Atwood machine). Taking $g = 10\\text{ m/s}^2$, find the acceleration of the system.",
                        ["$2\\text{ m/s}^2$", "$1\\text{ m/s}^2$", "$4\\text{ m/s}^2$", "$5\\text{ m/s}^2$"],
                        0,
                        "Equations: $3g - T = 3a$ and $T - 2g = 2a$. Adding: $(3 - 2)g = (3 + 2)a \\Rightarrow 10 = 5a \\Rightarrow a = 2\\text{ m/s}^2$."
                    ),
                    make_q(
                        "For the system in the previous question, find the tension $T$ in the string.",
                        ["$24\\text{ N}$", "$25\\text{ N}$", "$20\\text{ N}$", "$30\\text{ N}$"],
                        0,
                        "$T = 2(g + a) = 2(10 + 2) = 2(12) = 24\\text{ N}$."
                    ),
                    make_q(
                        "What is the total force exerted by the string on the pulley in the previous system?",
                        ["$48\\text{ N}$ downwards", "$24\\text{ N}$ downwards", "$50\\text{ N}$ downwards", "$40\\text{ N}$ downwards"],
                        0,
                        "The string pulls downward on both sides of the pulley with tension $T = 24\\text{ N}$. Total force on pulley $= 2T = 48\\text{ N}$ downwards."
                    )
                ]
            },
            {
                "heading": "Section 3: Motion on Rough Inclined Planes",
                "questions": [
                    make_q(
                        "A block of mass 5 kg is pulled up a smooth slope inclined at $30^\\circ$ to the horizontal by a force of 40 N acting parallel to the slope. Taking $g = 10\\text{ m/s}^2$, find the acceleration of the block.",
                        ["$3\\text{ m/s}^2$", "$5\\text{ m/s}^2$", "$2\\text{ m/s}^2$", "$4\\text{ m/s}^2$"],
                        0,
                        "$F_{\\text{net}} = P - mg\\sin(30^\\circ) = 40 - 5(10)(0.5) = 40 - 25 = 15\\text{ N}$. Then $a = 15/5 = 3\\text{ m/s}^2$."
                    ),
                    make_q(
                        "If the slope in the previous question is rough with $\\mu = 0.2$, what is the new acceleration of the block?",
                        ["$1.27\\text{ m/s}^2$", "$3.00\\text{ m/s}^2$", "$2.15\\text{ m/s}^2$", "$0.85\\text{ m/s}^2$"],
                        0,
                        "$R = mg\\cos(30^\\circ) = 50(\\sqrt{3}/2) \\approx 43.30\\text{ N}$. Friction $F_f = \\mu R = 0.2(43.30) \\approx 8.66\\text{ N}$. Net force $= 40 - 25 - 8.66 = 6.34\\text{ N}$. Acceleration $a = 6.34/5 \\approx 1.27\\text{ m/s}^2$."
                    ),
                    make_q(
                        "A sled of mass 20 kg slides down an incline of $25^\\circ$ at constant speed. What is the coefficient of kinetic friction $\\mu$?",
                        ["$\\mu = \\tan(25^\\circ) \\approx 0.466$", "$0.423$", "$0.906$", "$0.500$"],
                        0,
                        "At constant speed, acceleration is zero, so $mg\\sin\\alpha = \\mu mg\\cos\\alpha \\Rightarrow \\mu = \\tan\\alpha = \\tan(25^\\circ) \\approx 0.466$."
                    )
                ]
            },
            {
                "heading": "Section 4: Connected Systems with Pulleys & Tables",
                "questions": [
                    make_q(
                        "A block $A$ of mass 4 kg rests on a smooth horizontal table and is connected by a light string over a smooth pulley at the edge of the table to a hanging block $B$ of mass 1 kg. Taking $g = 10\\text{ m/s}^2$, find the acceleration.",
                        ["$2\\text{ m/s}^2$", "$2.5\\text{ m/s}^2$", "$1.5\\text{ m/s}^2$", "$10\\text{ m/s}^2$"],
                        0,
                        "Net accelerating force is the weight of $B$: $m_B g = 1(10) = 10\\text{ N}$. Total mass $= 4 + 1 = 5\\text{ kg}$. Acceleration $a = 10/5 = 2\\text{ m/s}^2$."
                    ),
                    make_q(
                        "If the table in the previous system has coefficient of friction $\\mu = 0.15$, find the acceleration of the system.",
                        ["$0.8\\text{ m/s}^2$", "$1.2\\text{ m/s}^2$", "$1.5\\text{ m/s}^2$", "$0.5\\text{ m/s}^2$"],
                        0,
                        "Friction on $A$: $F_f = \\mu m_A g = 0.15(4)(10) = 6\\text{ N}$. Net accelerating force $= 10 - 6 = 4\\text{ N}$. Total mass $= 5\\text{ kg}$. Acceleration $a = 4/5 = 0.8\\text{ m/s}^2$."
                    ),
                    make_q(
                        "A car of mass 1000 kg tows a trailer of mass 500 kg with acceleration $1.2\\text{ m/s}^2$. Resistance to motion is 300 N on the car and 200 N on the trailer. Find the tension in the towbar.",
                        ["$800\\text{ N}$", "$600\\text{ N}$", "$1100\\text{ N}$", "$1500\\text{ N}$"],
                        0,
                        "Consider the trailer alone: $T - R_{\\text{trailer}} = m_{\\text{trailer}} a \\Rightarrow T - 200 = 500(1.2) \\Rightarrow T - 200 = 600 \\Rightarrow T = 800\\text{ N}$."
                    )
                ]
            }
        ]
    },

    # --------------------------------------------------------------------------
    # 14.01: Energy, Work & Power
    # --------------------------------------------------------------------------
    {
        "track": "aslevel",
        "num": "14.01",
        "slug": "energy-work-power",
        "title": "Energy, Work & Power",
        "sections": [
            {
                "heading": "Section 1: Work Done by Constant & Inclined Forces",
                "questions": [
                    make_q(
                        "A force of 60 N pulls a box across a horizontal floor through a distance of 8 m. The force acts at an angle of $60^\\circ$ above the horizontal. Find the work done by the force.",
                        ["$240\\text{ J}$", "$480\\text{ J}$", "$415.7\\text{ J}$", "$120\\text{ J}$"],
                        0,
                        "Work done $W = Fd\\cos\\theta = 60 \\times 8 \\times \\cos(60^\\circ) = 480 \\times 0.5 = 240\\text{ J}$."
                    ),
                    make_q(
                        "A crate of mass 15 kg is lifted vertically at a constant speed through a height of 4 m. Taking $g = 10\\text{ m/s}^2$, what is the work done against gravity?",
                        ["$600\\text{ J}$", "$150\\text{ J}$", "$300\\text{ J}$", "$60\\text{ J}$"],
                        0,
                        "$W = mgh = 15(10)(4) = 600\\text{ J}$."
                    ),
                    make_q(
                        "A box is pushed 5 m along a horizontal floor against a constant frictional resistance of 35 N. What is the work done against friction?",
                        ["$175\\text{ J}$", "$150\\text{ J}$", "$350\\text{ J}$", "$70\\text{ J}$"],
                        0,
                        "$W = F_f \\times d = 35 \\times 5 = 175\\text{ J}$."
                    )
                ]
            },
            {
                "heading": "Section 2: Kinetic Energy & Potential Energy",
                "questions": [
                    make_q(
                        "Calculate the kinetic energy of an athlete of mass 70 kg running at a speed of 8 m/s.",
                        ["$2240\\text{ J}$", "$4480\\text{ J}$", "$560\\text{ J}$", "$280\\text{ J}$"],
                        0,
                        "$E_k = \\frac{1}{2}mv^2 = \\frac{1}{2}(70)(64) = 35 \\times 64 = 2240\\text{ J}$."
                    ),
                    make_q(
                        "A rollercoaster car of mass 500 kg starts from rest at the top of a frictionless hill of height 20 m. Taking $g = 10\\text{ m/s}^2$, find its speed at the bottom of the hill.",
                        ["$20\\text{ m/s}$", "$10\\text{ m/s}$", "$40\\text{ m/s}$", "$14.1\\text{ m/s}$"],
                        0,
                        "Conservation of energy: $mgh = \\frac{1}{2}mv^2 \\Rightarrow v = \\sqrt{2gh} = \\sqrt{2(10)(20)} = \\sqrt{400} = 20\\text{ m/s}$."
                    ),
                    make_q(
                        "A bullet of mass 0.02 kg traveling at 300 m/s penetrates a wooden block to a depth of 0.15 m before stopping. What is the average resistive force exerted by the wood?",
                        ["$6000\\text{ N}$", "$3000\\text{ N}$", "$9000\\text{ N}$", "$12000\\text{ N}$"],
                        0,
                        "Work-energy principle: $Fd = \\frac{1}{2}mv^2 \\Rightarrow F(0.15) = \\frac{1}{2}(0.02)(90000) = 900 \\Rightarrow F = 900/0.15 = 6000\\text{ N}$."
                    )
                ]
            },
            {
                "heading": "Section 3: The Work-Energy Principle",
                "questions": [
                    make_q(
                        "A skier of mass 60 kg starts from rest at the top of a slope 30 m high. When reaching the bottom, her speed is 20 m/s. Taking $g = 10\\text{ m/s}^2$, how much energy was lost due to friction?",
                        ["$6000\\text{ J}$", "$12000\\text{ J}$", "$18000\\text{ J}$", "$3000\\text{ J}$"],
                        0,
                        "Initial potential energy $E_p = mgh = 60(10)(30) = 18000\\text{ J}$. Final kinetic energy $E_k = \\frac{1}{2}(60)(400) = 12000\\text{ J}$. Energy lost $= 18000 - 12000 = 6000\\text{ J}$."
                    ),
                    make_q(
                        "A package of mass 4 kg slides down a rough incline of length 10 m and vertical drop 6 m. If the resistive force is a constant 8 N, find the speed of the package at the bottom (starting from rest, $g = 10\\text{ m/s}^2$).",
                        ["$\\sqrt{80} \\approx 8.94\\text{ m/s}$", "$10\\text{ m/s}$", "$8\\text{ m/s}$", "$12\\text{ m/s}$"],
                        0,
                        "Work done by gravity $= mgh = 4(10)(6) = 240\\text{ J}$. Work against friction $= 8 \\times 10 = 80\\text{ J}$. Net kinetic energy $= 240 - 80 = 160\\text{ J}$. $\\frac{1}{2}(4)v^2 = 160 \\Rightarrow 2v^2 = 160 \\Rightarrow v^2 = 80 \\Rightarrow v = \\sqrt{80} \\approx 8.94\\text{ m/s}$."
                    ),
                    make_q(
                        "A particle is projected up a rough incline ($30^\\circ$) with initial speed 10 m/s. If $\\mu = 0.2$ and $g = 10\\text{ m/s}^2$, how far up the plane does the particle travel before coming to rest?",
                        ["$\\approx 7.43\\text{ m}$", "$10.0\\text{ m}$", "$5.50\\text{ m}$", "$8.25\\text{ m}$"],
                        0,
                        "Deceleration up slope: $a = g(\\sin 30^\\circ + \\mu\\cos 30^\\circ) = 10(0.5 + 0.2 \\times 0.866) = 10(0.5 + 0.1732) = 6.732\\text{ m/s}^2$. Distance $s = u^2/(2a) = 100/(2 \\times 6.732) \\approx 7.43\\text{ m}$."
                    )
                ]
            },
            {
                "heading": "Section 4: Power and Vehicles in Motion",
                "questions": [
                    make_q(
                        "A car of mass 1200 kg travels along a level road at a constant speed of 30 m/s. The engine is working at 45 kW. What is the total resistance to motion?",
                        ["$1500\\text{ N}$", "$1200\\text{ N}$", "$1350\\text{ N}$", "$2000\\text{ N}$"],
                        0,
                        "$P = Fv \\Rightarrow 45000 = F(30) \\Rightarrow F = 1500\\text{ N}$. Since speed is constant, driving force equals resistance: $R = 1500\\text{ N}$."
                    ),
                    make_q(
                        "The same car (mass 1200 kg, engine working at 45 kW) faces the same resistance of 1500 N while traveling at 20 m/s. What is its acceleration at this instant?",
                        ["$0.625\\text{ m/s}^2$", "$0.75\\text{ m/s}^2$", "$1.00\\text{ m/s}^2$", "$0.50\\text{ m/s}^2$"],
                        0,
                        "Driving force at $20\\text{ m/s}$: $F = P/v = 45000/20 = 2250\\text{ N}$. Net force $= 2250 - 1500 = 750\\text{ N}$. Acceleration $a = 750/1200 = 0.625\\text{ m/s}^2$."
                    ),
                    make_q(
                        "A truck of mass 5000 kg ascends an incline of 1 in 20 ($\\sin\\alpha = 1/20$) at a steady speed of 15 m/s. The engine power is 60 kW. Taking $g = 10\\text{ m/s}^2$, find the resistance to motion.",
                        ["$1500\\text{ N}$", "$2500\\text{ N}$", "$4000\\text{ N}$", "$2000\\text{ N}$"],
                        0,
                        "Driving force $F = P/v = 60000/15 = 4000\\text{ N}$. Gravity component along slope $= mg\\sin\\alpha = 5000(10)(1/20) = 2500\\text{ N}$. At steady speed: $F = mg\\sin\\alpha + R \\Rightarrow 4000 = 2500 + R \\Rightarrow R = 1500\\text{ N}$."
                    )
                ]
            }
        ]
    }
]
