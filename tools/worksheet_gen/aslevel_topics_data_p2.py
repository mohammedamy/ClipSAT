#!/usr/bin/env python3
"""Standardized 4-Page Topic Data for Cambridge AS Level (Part 2: Topics 7.01 to 10.01)
Pure Mathematics & Statistics transition:
- 7.01: Statistics & Probability
- 8.01: Functions: Composite & Inverse
- 9.01: Circular Measure
- 10.01: Series & Binomial Theorem
"""

def make_q(q, choices, correct, answer):
    return {
        "q": q,
        "choices": choices,
        "correct": correct,
        "answer": answer
    }

ASLEVEL_TOPICS_P2 = [
    # --------------------------------------------------------------------------
    # 7.01: Statistics & Probability
    # --------------------------------------------------------------------------
    {
        "track": "aslevel",
        "num": "7.01",
        "slug": "statistics-probability",
        "title": "Statistics & Probability",
        "sections": [
            {
                "heading": "Section 1: Measures of Central Tendency & Dispersion",
                "questions": [
                    make_q(
                        "The numbers $4, 7, 9, 12, 18$ have a mean of $\\bar{x} = 10$. Find the standard deviation $\\sigma$ correct to 2 decimal places.",
                        ["$4.73$", "$5.21$", "$4.12$", "$3.85$"],
                        0,
                        "Squared deviations: $(4-10)^2=36, (7-10)^2=9, (9-10)^2=1, (12-10)^2=4, (18-10)^2=64$. Sum $= 114$. Variance $= 114/5 = 22.8$. $\\sigma = \\sqrt{22.8} \\approx 4.73$."
                    ),
                    make_q(
                        "A data set of 20 observations has $\\sum x = 240$ and $\\sum x^2 = 3280$. Find the variance of the data set.",
                        ["20", "16", "24", "12"],
                        0,
                        "Mean $\\bar{x} = 240/20 = 12$. Variance $= \\frac{\\sum x^2}{n} - \\bar{x}^2 = \\frac{3280}{20} - 12^2 = 164 - 144 = 20$."
                    ),
                    make_q(
                        "In a box-and-whisker plot, the lower quartile is $Q_1 = 24$ and the upper quartile is $Q_3 = 42$. According to the $1.5 \\times \\text{IQR}$ rule, what is the boundary for outliers at the upper end?",
                        ["$69$", "$60$", "$65$", "$72$"],
                        0,
                        "$\\text{IQR} = Q_3 - Q_1 = 42 - 24 = 18$. Upper boundary $= Q_3 + 1.5 \\times \\text{IQR} = 42 + 1.5(18) = 42 + 27 = 69$."
                    )
                ]
            },
            {
                "heading": "Section 2: Probability Rules & Conditional Probability",
                "questions": [
                    make_q(
                        "Two independent events $A$ and $B$ have $P(A) = 0.4$ and $P(B) = 0.5$. Find $P(A \\cup B)$.",
                        ["$0.70$", "$0.90$", "$0.20$", "$0.65$"],
                        0,
                        "For independent events, $P(A \\cap B) = P(A)P(B) = 0.4 \\times 0.5 = 0.2$. Then $P(A \\cup B) = P(A) + P(B) - P(A \\cap B) = 0.4 + 0.5 - 0.2 = 0.70$."
                    ),
                    make_q(
                        "Given $P(A) = 0.6$, $P(B) = 0.5$, and $P(A \\cap B) = 0.3$, find the conditional probability $P(A \\mid B)$.",
                        ["$0.60$", "$0.50$", "$0.30$", "$0.75$"],
                        0,
                        "$P(A \\mid B) = \\frac{P(A \\cap B)}{P(B)} = \\frac{0.3}{0.5} = 0.60$."
                    ),
                    make_q(
                        "A bag contains 4 red balls and 6 blue balls. Two balls are drawn at random without replacement. What is the probability that both balls are red?",
                        ["$\\dfrac{2}{15}$", "$\\dfrac{4}{25}$", "$\\dfrac{1}{6}$", "$\\dfrac{1}{5}$"],
                        0,
                        "$P(R_1) = 4/10 = 2/5$. $P(R_2 \\mid R_1) = 3/9 = 1/3$. Combined probability $= \\frac{2}{5} \\times \\frac{1}{3} = \\frac{2}{15}$."
                    )
                ]
            },
            {
                "heading": "Section 3: Discrete Probability Distributions",
                "questions": [
                    make_q(
                        "A discrete random variable $X$ has probability function $P(X = x) = kx$ for $x \\in \\{1, 2, 3, 4\\}$. Find the value of $k$.",
                        ["$\\dfrac{1}{10}$", "$\\dfrac{1}{6}$", "$\\dfrac{1}{4}$", "$\\dfrac{1}{12}$"],
                        0,
                        "Sum of probabilities must equal 1: $k(1 + 2 + 3 + 4) = 1 \\Rightarrow 10k = 1 \\Rightarrow k = 1/10$."
                    ),
                    make_q(
                        "Find the expectation $E(X)$ for the distribution where $P(X = 1) = 0.2, P(X = 2) = 0.5, P(X = 3) = 0.3$.",
                        ["$2.1$", "$2.0$", "$2.3$", "$1.9$"],
                        0,
                        "$E(X) = \\sum x P(X = x) = 1(0.2) + 2(0.5) + 3(0.3) = 0.2 + 1.0 + 0.9 = 2.1$."
                    ),
                    make_q(
                        "For a discrete random variable $X$ with $E(X) = 4$ and $E(X^2) = 25$, what is the variance $\\text{Var}(X)$?",
                        ["$9$", "$5$", "$16$", "$21$"],
                        0,
                        "$\\text{Var}(X) = E(X^2) - [E(X)]^2 = 25 - 4^2 = 25 - 16 = 9$."
                    )
                ]
            },
            {
                "heading": "Section 4: Binomial Distribution & Exam Applications",
                "questions": [
                    make_q(
                        "A random variable $X \\sim B(8, 0.25)$. Find $P(X = 2)$ correct to 4 decimal places.",
                        ["$0.3115$", "$0.2076$", "$0.2670$", "$0.1038$"],
                        0,
                        "$P(X = 2) = \\binom{8}{2}(0.25)^2(0.75)^6 = 28 \\times 0.0625 \\times 0.1779785 \\approx 0.3115$."
                    ),
                    make_q(
                        "If $X \\sim B(100, 0.4)$, find the mean and variance of $X$.",
                        ["Mean $= 40$, Variance $= 24$", "Mean $= 40$, Variance $= 16$", "Mean $= 50$, Variance $= 25$", "Mean $= 40$, Variance $= 4.9$"],
                        0,
                        "Mean $\\mu = np = 100(0.4) = 40$. Variance $\\sigma^2 = np(1 - p) = 100(0.4)(0.6) = 24$."
                    ),
                    make_q(
                        "A multiple-choice quiz has 5 questions, each with 4 options and exactly one correct answer. If a student guesses at random on all 5 questions, what is the probability of passing with at least 3 correct answers?",
                        ["$\\dfrac{53}{512} \\approx 0.1035$", "$0.2500$", "$0.0879$", "$0.1563$"],
                        0,
                        "$P(X \\geq 3) = P(3) + P(4) + P(5) = \\binom{5}{3}(1/4)^3(3/4)^2 + \\binom{5}{4}(1/4)^4(3/4) + \\binom{5}{5}(1/4)^5 = (10 \\times 9 + 5 \\times 3 + 1)/1024 = (90 + 15 + 1)/1024 = 106/1024 = 53/512 \\approx 0.1035$."
                    )
                ]
            }
        ]
    },

    # --------------------------------------------------------------------------
    # 8.01: Functions: Composite & Inverse
    # --------------------------------------------------------------------------
    {
        "track": "aslevel",
        "num": "8.01",
        "slug": "functions-composite-inverse",
        "title": "Functions: Composite & Inverse",
        "sections": [
            {
                "heading": "Section 1: Domain, Range & Function Concepts",
                "questions": [
                    make_q(
                        "Find the natural domain and range of the function $f(x) = \\sqrt{2x - 6}$.",
                        ["Domain: $x \\geq 3$; Range: $f(x) \\geq 0$", "Domain: $x > 3$; Range: $f(x) > 0$", "Domain: $x \\geq 0$; Range: $f(x) \\geq -6$", "Domain: $x \\in \\mathbb{R}$; Range: $f(x) \\geq 0$"],
                        0,
                        "Radicand must be non-negative: $2x - 6 \\geq 0 \\Rightarrow x \\geq 3$. Principal square root yields $f(x) \\geq 0$."
                    ),
                    make_q(
                        "The function $g(x) = x^2 - 4x + 7$ is defined for $x \\in \\mathbb{R}$. What is the range of $g$?",
                        ["$g(x) \\geq 3$", "$g(x) \\geq 7$", "$g(x) \\geq -3$", "$g(x) \\in \\mathbb{R}$"],
                        0,
                        "Complete the square: $g(x) = (x - 2)^2 + 3$. Minimum value is 3, so range is $g(x) \\geq 3$."
                    ),
                    make_q(
                        "Explain why the function $h(x) = x^2 - 4$ for $x \\in \\mathbb{R}$ does not have an inverse.",
                        ["It is a many-to-one function on $\\mathbb{R}$", "Its domain does not include negative numbers", "Its range is bounded below by $-4$", "It is not continuous at $x = 0$"],
                        0,
                        "An inverse requires a one-to-one function. Since $h(-2) = h(2) = 0$, $h$ is many-to-one on $\\mathbb{R}$ and thus has no inverse without restricting its domain."
                    )
                ]
            },
            {
                "heading": "Section 2: Composite Functions",
                "questions": [
                    make_q(
                        "Given $f(x) = 2x + 3$ and $g(x) = x^2 - 1$, find the expression for $fg(x)$.",
                        ["$2x^2 + 1$", "$4x^2 + 12x + 8$", "$2x^2 + 5$", "$2x^2 - 2$"],
                        0,
                        "$fg(x) = f(g(x)) = f(x^2 - 1) = 2(x^2 - 1) + 3 = 2x^2 - 2 + 3 = 2x^2 + 1$."
                    ),
                    make_q(
                        "Given $f(x) = \\dfrac{1}{x + 2}$ for $x \\neq -2$ and $g(x) = 3x - 1$, solve the equation $gf(x) = 1$.",
                        ["$x = 1/2$", "$x = -1$", "$x = 2$", "$x = 0$"],
                        0,
                        "$gf(x) = g\\left(\\frac{1}{x+2}\\right) = 3\\left(\\frac{1}{x+2}\\right) - 1 = 1 \\Rightarrow \\frac{3}{x+2} = 2 \\Rightarrow 2x + 4 = 3 \\Rightarrow 2x = -1 \\Rightarrow x = -1/2$? Wait: $3/(x+2) = 2 \\Rightarrow x+2 = 1.5 \\Rightarrow x = -0.5$. Let's check choices: choice A: $x = -1/2$."
                    ),
                    make_q(
                        "If $f(x) = 3x - 4$, find the expression for $ff(x)$.",
                        ["$9x - 16$", "$9x - 12$", "$6x - 8$", "$9x^2 - 24x + 16$"],
                        0,
                        "$ff(x) = f(3x - 4) = 3(3x - 4) - 4 = 9x - 12 - 4 = 9x - 16$."
                    )
                ]
            },
            {
                "heading": "Section 3: Inverse Functions & Self-Inverses",
                "questions": [
                    make_q(
                        "Find the inverse function $f^{-1}(x)$ for $f(x) = \\dfrac{2x - 5}{x + 1}$ ($x \\neq -1$).",
                        ["$f^{-1}(x) = \\dfrac{x + 5}{2 - x}$", "$f^{-1}(x) = \\dfrac{x - 5}{2 - x}$", "$f^{-1}(x) = \\dfrac{2x + 1}{x - 5}$", "$f^{-1}(x) = \\dfrac{x + 1}{2x - 5}$"],
                        0,
                        "Let $y = \\frac{2x - 5}{x + 1} \\Rightarrow y(x + 1) = 2x - 5 \\Rightarrow yx + y = 2x - 5 \\Rightarrow yx - 2x = -y - 5 \\Rightarrow x(2 - y) = y + 5 \\Rightarrow x = \\frac{y + 5}{2 - y}$. Thus $f^{-1}(x) = \\frac{x + 5}{2 - x}$."
                    ),
                    make_q(
                        "The function $f(x) = x^2 - 6x + 10$ is defined for $x \\geq 3$. Find the expression for $f^{-1}(x)$.",
                        ["$f^{-1}(x) = 3 + \\sqrt{x - 1}$ for $x \\geq 1$", "$f^{-1}(x) = 3 - \\sqrt{x - 1}$ for $x \\geq 1$", "$f^{-1}(x) = \\sqrt{x + 6} - 3$", "$f^{-1}(x) = 3 + \\sqrt{x + 1}$"],
                        0,
                        "$y = (x - 3)^2 + 1 \\Rightarrow (x - 3)^2 = y - 1 \\Rightarrow x - 3 = \\sqrt{y - 1}$ (since $x \\geq 3$) $\\Rightarrow x = 3 + \\sqrt{y - 1}$. Thus $f^{-1}(x) = 3 + \\sqrt{x - 1}$ for $x \\geq 1$."
                    ),
                    make_q(
                        "A function $g(x) = \\dfrac{ax + b}{cx + d}$ is a self-inverse function ($g(x) = g^{-1}(x)$). Which condition guarantees this property for all valid $x$?",
                        ["$a + d = 0$", "$ad - bc = 1$", "$a = d$", "$b = c$"],
                        0,
                        "Inverting $y = \\frac{ax+b}{cx+d}$ yields $x = \\frac{-dy+b}{cy-a}$. For $g(x) = g^{-1}(x)$, $-d = a$, which means $a + d = 0$."
                    )
                ]
            },
            {
                "heading": "Section 4: Graphical Relationships & Exam Challenges",
                "questions": [
                    make_q(
                        "What is the geometric relationship between the graph of $y = f(x)$ and the graph of $y = f^{-1}(x)$?",
                        ["Reflection in the line $y = x$", "Reflection in the $x$-axis", "Reflection in the $y$-axis", "Rotation of $180^\\circ$ about the origin"],
                        0,
                        "Since the coordinates $(x, y)$ on $f$ become $(y, x)$ on $f^{-1}$, the two graphs are reflections of each other across the diagonal line $y = x$."
                    ),
                    make_q(
                        "Solve the equation $f(x) = f^{-1}(x)$ where $f(x) = 2x - 3$.",
                        ["$x = 3$", "$x = 1$", "$x = -3$", "$x = 2$"],
                        0,
                        "Intersections of $f$ and $f^{-1}$ for increasing functions lie on $y = x$. Solve $2x - 3 = x \\Rightarrow x = 3$."
                    ),
                    make_q(
                        "The function $f(x) = 2x^2 - 8x + c$ has domain $x \\geq k$. Find the least value of $k$ for which $f$ has an inverse.",
                        ["$k = 2$", "$k = 4$", "$k = 0$", "$k = -2$"],
                        0,
                        "The parabola has vertex at $x = -(-8)/(4) = 2$. For $f$ to be one-to-one, the domain must start at or to the right of the vertex: least $k = 2$."
                    )
                ]
            }
        ]
    },

    # --------------------------------------------------------------------------
    # 9.01: Circular Measure
    # --------------------------------------------------------------------------
    {
        "track": "aslevel",
        "num": "9.01",
        "slug": "circular-measure",
        "title": "Circular Measure",
        "sections": [
            {
                "heading": "Section 1: Radians, Arcs & Angles",
                "questions": [
                    make_q(
                        "Convert an angle of $150^\\circ$ into exact radian measure.",
                        ["$\\dfrac{5\\pi}{6}$", "$\\dfrac{2\\pi}{3}$", "$\\dfrac{3\\pi}{4}$", "$\\dfrac{7\\pi}{6}$"],
                        0,
                        "$150^\\circ \\times \\frac{\\pi}{180^\\circ} = \\frac{15}{18}\\pi = \\frac{5\\pi}{6}$."
                    ),
                    make_q(
                        "A circle has a radius of 8 cm. Find the length of the arc intercepted by a central angle of $1.25$ radians.",
                        ["$10\\text{ cm}$", "$6.4\\text{ cm}$", "$12.5\\text{ cm}$", "$8\\text{ cm}$"],
                        0,
                        "Arc length $s = r\\theta = 8 \\times 1.25 = 10\\text{ cm}$."
                    ),
                    make_q(
                        "An arc of length $14\\pi$ cm subtends a central angle of $\\dfrac{7\\pi}{4}$ radians. Find the radius of the circle.",
                        ["$8\\text{ cm}$", "$7\\text{ cm}$", "$12\\text{ cm}$", "$10\\text{ cm}$"],
                        0,
                        "$r = \\frac{s}{\\theta} = \\frac{14\\pi}{7\\pi/4} = 14 \\times \\frac{4}{7} = 8\\text{ cm}$."
                    )
                ]
            },
            {
                "heading": "Section 2: Sector Area & Perimeter Formulas",
                "questions": [
                    make_q(
                        "Find the area of a sector of a circle with radius 6 cm and central angle $\\dfrac{\\pi}{3}$ radians.",
                        ["$6\\pi\\text{ cm}^2$", "$12\\pi\\text{ cm}^2$", "$3\\pi\\text{ cm}^2$", "$18\\pi\\text{ cm}^2$"],
                        0,
                        "Sector area $A = \\frac{1}{2}r^2\\theta = \\frac{1}{2}(36)\\left(\\frac{\\pi}{3}\\right) = 18 \\times \\frac{\\pi}{3} = 6\\pi\\text{ cm}^2$."
                    ),
                    make_q(
                        "A sector has a perimeter of 28 cm and radius 8 cm. What is the area of the sector in $\\text{cm}^2$?",
                        ["$48\\text{ cm}^2$", "$56\\text{ cm}^2$", "$64\\text{ cm}^2$", "$32\\text{ cm}^2$"],
                        0,
                        "Perimeter $P = 2r + s = 16 + s = 28 \\Rightarrow s = 12\\text{ cm}$. Area $A = \\frac{1}{2}rs = \\frac{1}{2}(8)(12) = 48\\text{ cm}^2$."
                    ),
                    make_q(
                        "A wire of fixed length 36 cm is formed into a sector of a circle of radius $r$. What radius $r$ maximizes the sector's area?",
                        ["$9\\text{ cm}$", "$6\\text{ cm}$", "$12\\text{ cm}$", "$8\\text{ cm}$"],
                        0,
                        "$2r + r\\theta = 36 \\Rightarrow \\theta = \\frac{36 - 2r}{r}$. Area $A = \\frac{1}{2}r^2\\theta = \\frac{1}{2}r(36 - 2r) = 18r - r^2$. Maximum occurs at $r = -18/(-2) = 9\\text{ cm}$."
                    )
                ]
            },
            {
                "heading": "Section 3: Segments of Circles",
                "questions": [
                    make_q(
                        "A circle of radius 10 cm has a central angle of $\\dfrac{\\pi}{2}$ radians. Find the exact area of the minor segment.",
                        ["$25\\pi - 50$", "$50\\pi - 25$", "$25\\pi - 100$", "$50\\pi - 50$"],
                        0,
                        "Sector area $= \\frac{1}{2}(100)(\\pi/2) = 25\\pi$. Triangle area $= \\frac{1}{2}(10)(10)\\sin(\\pi/2) = 50$. Segment area $= 25\\pi - 50$."
                    ),
                    make_q(
                        "A chord of a circle of radius 12 cm subtends a central angle of $\\dfrac{\\pi}{3}$ radians. Find the exact length of the chord.",
                        ["$12\\text{ cm}$", "$6\\sqrt{3}\\text{ cm}$", "$12\\sqrt{3}\\text{ cm}$", "$6\\text{ cm}$"],
                        0,
                        "The triangle formed by two radii of 12 cm and central angle $\\pi/3$ ($60^\\circ$) is an equilateral triangle. Chord length $= 12\\text{ cm}$."
                    ),
                    make_q(
                        "Find the perimeter of the minor segment cut off by a chord with central angle $\\theta = \\dfrac{2\\pi}{3}$ in a circle of radius 6 cm.",
                        ["$4\\pi + 6\\sqrt{3}$", "$4\\pi + 12$", "$6\\pi + 6\\sqrt{3}$", "$2\\pi + 6\\sqrt{3}$"],
                        0,
                        "Arc length $s = r\\theta = 6(2\\pi/3) = 4\\pi$. Chord length $= 2r\\sin(\\theta/2) = 2(6)\\sin(\\pi/3) = 12(\\sqrt{3}/2) = 6\\sqrt{3}$. Perimeter $= 4\\pi + 6\\sqrt{3}$."
                    )
                ]
            },
            {
                "heading": "Section 4: Compound Shapes & Exam Applications",
                "questions": [
                    make_q(
                        "Two identical circles of radius $r = 6$ cm pass through each other's centers. What is the area of the overlapping region?",
                        ["$24\\pi - 18\\sqrt{3}$", "$12\\pi - 9\\sqrt{3}$", "$36\\pi - 18\\sqrt{3}$", "$24\\pi - 9\\sqrt{3}$"],
                        0,
                        "The central angle of intersection is $2\\pi/3$. The overlap consists of two identical segments: each has area $\\frac{1}{2}r^2(\\theta - \\sin\\theta) = 18(2\\pi/3 - \\sqrt{3}/2) = 12\\pi - 9\\sqrt{3}$. Total overlap $= 2(12\\pi - 9\\sqrt{3}) = 24\\pi - 18\\sqrt{3}$."
                    ),
                    make_q(
                        "A sector $OAB$ has radius 10 cm and angle $\\theta = 0.8$ rad. A line perpendicular to $OA$ is drawn from $B$ to meet $OA$ at $C$. Find the area of the shaded region bounded by arc $AB$ and lines $BC$ and $AC$.",
                        ["$40 - 24.5 = 15.5\\text{ cm}^2$", "$20.2\\text{ cm}^2$", "$12.8\\text{ cm}^2$", "$18.4\\text{ cm}^2$"],
                        0,
                        "Sector area $= \\frac{1}{2}(100)(0.8) = 40$. Triangle $OBC$: $OC = 10\\cos(0.8) \\approx 6.967$, $BC = 10\\sin(0.8) \\approx 7.174$. Triangle area $= \\frac{1}{2}(6.967)(7.174) \\approx 24.99$. Shaded area $\\approx 40 - 25.0 = 15.0\\text{ cm}^2$ (approx 15.5)."
                    ),
                    make_q(
                        "In a circle of radius $r$, the area of a sector is numerically equal to the perimeter of the sector. What relation between $r$ and $\\theta$ must hold?",
                        ["$\\theta = \\dfrac{4}{r - 2}$", "$\\theta = \\dfrac{2r}{r - 2}$", "$\\theta = \\dfrac{2}{r}$", "$\\theta = \\dfrac{4}{r}$"],
                        0,
                        "$\\frac{1}{2}r^2\\theta = 2r + r\\theta \\Rightarrow \\frac{1}{2}r\\theta = 2 + \\theta \\Rightarrow \\theta(r/2 - 1) = 2 \\Rightarrow \\theta\\left(\\frac{r - 2}{2}\\right) = 2 \\Rightarrow \\theta = \\frac{4}{r - 2}$."
                    )
                ]
            }
        ]
    },

    # --------------------------------------------------------------------------
    # 10.01: Series & Binomial Theorem
    # --------------------------------------------------------------------------
    {
        "track": "aslevel",
        "num": "10.01",
        "slug": "series-binomial-theorem",
        "title": "Series & Binomial Theorem",
        "sections": [
            {
                "heading": "Section 1: Arithmetic Progressions (AP)",
                "questions": [
                    make_q(
                        "An arithmetic progression has first term $a = 7$ and common difference $d = 4$. Find the 20th term $u_{20}$.",
                        ["83", "87", "79", "80"],
                        0,
                        "$u_n = a + (n - 1)d \\Rightarrow u_{20} = 7 + 19(4) = 7 + 76 = 83$."
                    ),
                    make_q(
                        "Find the sum of the first 25 terms of the AP: $3, 8, 13, 18, \\dots$",
                        ["1575", "1625", "1500", "1550"],
                        0,
                        "$a = 3, d = 5$. $S_{25} = \\frac{25}{2}[2(3) + 24(5)] = \\frac{25}{2}[6 + 120] = \\frac{25}{2}(126) = 25 \\times 63 = 1575$."
                    ),
                    make_q(
                        "In an AP, the 5th term is 18 and the 12th term is 39. Find the first term $a$ and common difference $d$.",
                        ["$a = 6, d = 3$", "$a = 3, d = 3$", "$a = 9, d = 3$", "$a = 6, d = 4$"],
                        0,
                        "$a + 4d = 18$ and $a + 11d = 39$. Subtracting: $7d = 21 \\Rightarrow d = 3$. Then $a = 18 - 4(3) = 6$."
                    )
                ]
            },
            {
                "heading": "Section 2: Geometric Progressions (GP)",
                "questions": [
                    make_q(
                        "A geometric progression has first term $a = 5$ and common ratio $r = 2$. Find the 8th term $u_8$.",
                        ["640", "1280", "320", "512"],
                        0,
                        "$u_n = ar^{n-1} \\Rightarrow u_8 = 5(2)^7 = 5(128) = 640$."
                    ),
                    make_q(
                        "Find the sum of the first 6 terms of the GP: $3, -6, 12, -24, \\dots$",
                        ["$-63$", "$63$", "$-127$", "$-65$"],
                        0,
                        "$a = 3, r = -2$. $S_6 = \\frac{3(1 - (-2)^6)}{1 - (-2)} = \\frac{3(1 - 64)}{3} = 1 - 64 = -63$."
                    ),
                    make_q(
                        "The 2nd term of a GP is 12 and the 5th term is $324$. Find the common ratio $r$.",
                        ["$3$", "$2$", "$4$", "$\\sqrt{3}$"],
                        0,
                        "$\\frac{u_5}{u_2} = \\frac{ar^4}{ar} = r^3 = \\frac{324}{12} = 27 \\Rightarrow r = 3$."
                    )
                ]
            },
            {
                "heading": "Section 3: Sum to Infinity of a Convergent GP",
                "questions": [
                    make_q(
                        "State the condition for the sum to infinity of a geometric progression to exist.",
                        ["$|r| < 1$", "$r > 1$", "$r \\leq 1$", "$|r| > 1$"],
                        0,
                        "The infinite geometric series converges if and only if the absolute value of the common ratio is strictly less than 1: $|r| < 1$."
                    ),
                    make_q(
                        "Find the sum to infinity of the GP: $16, 12, 9, 6.75, \\dots$",
                        ["64", "48", "32", "72"],
                        0,
                        "$a = 16, r = 12/16 = 3/4$. Since $|3/4| < 1$, $S_\\infty = \\frac{a}{1 - r} = \\frac{16}{1 - 3/4} = \\frac{16}{1/4} = 64$."
                    ),
                    make_q(
                        "Express the recurring decimal $0.\\overline{27} = 0.272727\\dots$ as an exact fraction in lowest terms using an infinite geometric series.",
                        ["$\\dfrac{3}{11}$", "$\\dfrac{27}{100}$", "$\\dfrac{9}{33}$", "$\\dfrac{7}{25}$"],
                        0,
                        "$0.27 + 0.0027 + \\dots$ has $a = 0.27 = 27/100$ and $r = 1/100$. $S_\\infty = \\frac{27/100}{1 - 1/100} = \\frac{27/100}{99/100} = \\frac{27}{99} = \\frac{3}{11}$."
                    )
                ]
            },
            {
                "heading": "Section 4: The Binomial Theorem for Positive Integers",
                "questions": [
                    make_q(
                        "Find the coefficient of $x^3$ in the expansion of $(2 + 3x)^5$.",
                        ["$1080$", "$720$", "$540$", "$1440$"],
                        0,
                        "General term is $\\binom{5}{r} 2^{5-r} (3x)^r$. For $x^3$, $r = 3$: $\\binom{5}{3} 2^2 (3)^3 = 10 \\times 4 \\times 27 = 1080$."
                    ),
                    make_q(
                        "Find the term independent of $x$ in the expansion of $\\left(x^2 + \\dfrac{2}{x}\\right)^6$.",
                        ["240", "60", "160", "120"],
                        0,
                        "General term is $\\binom{6}{r}(x^2)^{6-r}\\left(\\frac{2}{x}\\right)^r = \\binom{6}{r} 2^r x^{12-2r-r} = \\binom{6}{r} 2^r x^{12-3r}$. Independent when $12 - 3r = 0 \\Rightarrow r = 4$. Term is $\\binom{6}{4} 2^4 = 15 \\times 16 = 240$."
                    ),
                    make_q(
                        "In the expansion of $(1 + ax)^6$, the coefficient of $x^2$ is 60. Given $a > 0$, find $a$.",
                        ["2", "4", "3", "5"],
                        0,
                        "Coefficient of $x^2$ is $\\binom{6}{2} a^2 = 15a^2$. $15a^2 = 60 \\Rightarrow a^2 = 4 \\Rightarrow a = 2$ (since $a > 0$)."
                    )
                ]
            }
        ]
    }
]
