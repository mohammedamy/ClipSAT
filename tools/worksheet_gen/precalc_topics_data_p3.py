"""Precalculus Topics Data Part 3: Topics 7.01 to 9.03 (10 Topics).

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

PRECALC_TOPICS_P3 = [
    # ── 7.01 Exponential Functions and Their Graphs ───────────────────────────
    {
        "track": "precalc",
        "num": "7.01",
        "slug": "exponential-functions-and-their-graphs",
        "title": "Exponential Functions and Their Graphs",
        "sections": [
            {
                "heading": "Section 1: Base e and Exponential Growth/Decay Curves",
                "questions": [
                    make_q(
                        "For $f(x) = a \\cdot b^x$ with $a > 0$, under what condition does $f(x)$ represent exponential growth?",
                        ["$b > 1$", "$0 < b < 1$", "$b < 0$", "$b = 1$"],
                        0,
                        "Exponential growth occurs when the base $b > 1$. If $0 < b < 1$, it represents exponential decay."
                    ),
                    make_q(
                        "Find the horizontal asymptote and $y$-intercept of $f(x) = 3 \\cdot 2^x - 5$.",
                        ["Asymptote: $y = -5$, $y$-intercept: $(0, -2)$", "Asymptote: $y = 0$, $y$-intercept: $(0, 3)$", "Asymptote: $y = -5$, $y$-intercept: $(0, -5)$", "Asymptote: $x = 0$, $y$-intercept: $(0, -2)$"],
                        0,
                        "As $x \\to -\\infty$, $2^x \\to 0$, so $y \\to -5$. At $x = 0$: $f(0) = 3(1) - 5 = -2$."
                    ),
                    make_q(
                        "Determine the range of $g(x) = -2 \\cdot e^{x} + 4$.",
                        ["$(-\\infty, 4)$", "$[4, \\infty)$", "$(4, \\infty)$", "$(-\\infty, -2)$"],
                        0,
                        "Since $e^x > 0$, $-2e^x < 0$. Adding 4 gives $g(x) < 4$. The range is $(-\\infty, 4)$."
                    )
                ]
            },
            {
                "heading": "Section 2: Transformations of Exponential Functions",
                "questions": [
                    make_q(
                        "Describe the transformations needed to obtain $g(x) = 2^{x - 3} + 1$ from $f(x) = 2^x$.",
                        ["Shift right by 3 units and up by 1 unit", "Shift left by 3 units and up by 1 unit", "Shift right by 3 units and down by 1 unit", "Vertical stretch by 3 and up by 1"],
                        0,
                        "Replacing $x$ by $x - 3$ shifts right 3; adding 1 shifts up 1."
                    ),
                    make_q(
                        "What is the domain of any function of the form $f(x) = a \\cdot b^{x - h} + k$ ($b > 0, b \\neq 1$)?",
                        ["$(-\\infty, \\infty)$", "$[0, \\infty)$", "$(k, \\infty)$", "$[h, \\infty)$"],
                        0,
                        "Exponential functions are defined for every real number $x$, so the domain is always all real numbers $(-\\infty, \\infty)$."
                    ),
                    make_q(
                        "Which transformation reflects the graph of $f(x) = e^x$ across the $y$-axis?",
                        ["$g(x) = e^{-x}$", "$g(x) = -e^x$", "$g(x) = -e^{-x}$", "$g(x) = e^x - 1$"],
                        0,
                        "Replacing $x$ with $-x$ reflects the graph across the $y$-axis."
                    )
                ]
            },
            {
                "heading": "Section 3: Compound Interest Formulas",
                "questions": [
                    make_q(
                        "State the formula for an initial principal $P$ compounded continuously at annual rate $r$ for $t$ years.",
                        ["$A = P e^{rt}$", "$A = P(1 + r)^t$", "$A = P\\left(1 + \\frac{r}{n}\\right)^{nt}$", "$A = P r t$"],
                        0,
                        "Continuous compounding uses the natural base: $A = P e^{rt}$."
                    ),
                    make_q(
                        "If $1000$ dollars is invested at $6\\%$ compounded monthly, what is the balance after 5 years?",
                        ["$1000\\left(1 + \\frac{0.06}{12}\\right)^{60} \\approx 1348.85\\text{ dollars}$", "$1300\\text{ dollars}$", "$1349.86\\text{ dollars}$", "$1338.23\\text{ dollars}$"],
                        0,
                        "$A = 1000(1 + 0.005)^{60} = 1000(1.005)^{60} \\approx 1348.85\\text{ dollars}$."
                    ),
                    make_q(
                        "If $2000$ dollars is invested at $5\\%$ compounded continuously, find the value after 10 years.",
                        ["$2000 e^{0.5} \\approx 3297.44\\text{ dollars}$", "$3000\\text{ dollars}$", "$3257.79\\text{ dollars}$", "$4000\\text{ dollars}$"],
                        0,
                        "$A = 2000 e^{(0.05)(10)} = 2000 e^{0.5} \\approx 2000(1.64872) \\approx 3297.44\\text{ dollars}$."
                    )
                ]
            },
            {
                "heading": "Section 4: The Number e as a Limit",
                "questions": [
                    make_q(
                        "State the limit definition of Euler's number $e$.",
                        ["$e = \\lim_{n \\to \\infty} \\left(1 + \\frac{1}{n}\\right)^n$", "$e = \\lim_{n \\to 0} \\left(1 + \\frac{1}{n}\\right)^n$", "$e = \\lim_{n \\to \\infty} (1 + n)^{1/n}$", "$e = \\sum_{n=1}^\\infty \\frac{1}{n}$"],
                        0,
                        "Euler's number $e \\approx 2.71828$ is defined by $\\lim_{n \\to \\infty} (1 + 1/n)^n$."
                    ),
                    make_q(
                        "Evaluate $\\lim_{n \\to \\infty} \\left(1 + \\frac{3}{n}\\right)^n$.",
                        ["$e^3$", "$3e$", "$e^{1/3}$", "$3$"],
                        0,
                        "Using $\\lim_{n \\to \\infty} (1 + x/n)^n = e^x$ with $x = 3$ gives $e^3$."
                    ),
                    make_q(
                        "Why is continuous compounding optimal compared to discrete compounding at the same nominal rate?",
                        ["As $n \\to \\infty$, the compounding factor $(1 + r/n)^{nt} \\to e^{rt}$, which achieves the theoretical maximum return", "It avoids paying bank fees", "The interest rate increases", "It doubles every year"],
                        0,
                        "Compounding frequency increases accumulation monotonically, reaching its mathematical supremum in the limit $n \\to \\infty$ with $e^{rt}$."
                    )
                ]
            }
        ]
    },

    # ── 7.02 Logarithms and Their Properties ──────────────────────────────────
    {
        "track": "precalc",
        "num": "7.02",
        "slug": "logarithms-and-their-properties",
        "title": "Logarithms and Their Properties",
        "sections": [
            {
                "heading": "Section 1: Definition of Logarithm and Inverses",
                "questions": [
                    make_q(
                        "Convert $\\log_2(32) = 5$ to its equivalent exponential form.",
                        ["$2^5 = 32$", "$5^2 = 32$", "$32^{1/5} = 2$", "$2 \\times 5 = 10$"],
                        0,
                        "By definition, $\\log_b(y) = x$ is equivalent to $b^x = y$. Here $2^5 = 32$."
                    ),
                    make_q(
                        "Evaluate $\\log_3\\left(\\frac{1}{27}\\right)$.",
                        ["$-3$", "$3$", "$1/3$", "$-1/3$"],
                        0,
                        "$3^{-3} = \\frac{1}{3^3} = \\frac{1}{27}$, so $\\log_3(1/27) = -3$."
                    ),
                    make_q(
                        "What is the inverse function of $f(x) = e^{2x - 1}$?",
                        ["$f^{-1}(x) = \\frac{\\ln x + 1}{2}$", "$f^{-1}(x) = \\ln(2x - 1)$", "$f^{-1}(x) = 2\\ln x - 1$", "$f^{-1}(x) = e^{-(2x - 1)}$"],
                        0,
                        "$y = e^{2x - 1} \\Rightarrow \\ln y = 2x - 1 \\Rightarrow 2x = \\ln y + 1 \\Rightarrow x = \\frac{\\ln y + 1}{2}$."
                    )
                ]
            },
            {
                "heading": "Section 2: Product, Quotient, and Power Rules",
                "questions": [
                    make_q(
                        "Expand $\\log_b\\left(\\frac{x^3 y}{z^2}\\right)$ into individual logarithms.",
                        ["$3\\log_b x + \\log_b y - 2\\log_b z$", "$3\\log_b x \\cdot \\log_b y - 2\\log_b z$", "$6(\\log_b x + \\log_b y - \\log_b z)$", "$\\frac{3\\log_b x + \\log_b y}{2\\log_b z}$"],
                        0,
                        "Apply the quotient rule, product rule, and power rule: $\\log_b(x^3 y) - \\log_b(z^2) = 3\\log_b x + \\log_b y - 2\\log_b z$."
                    ),
                    make_q(
                        "Condense into a single logarithm: $2\\ln(x) + \\frac{1}{2}\\ln(y) - 3\\ln(z)$.",
                        ["$\\ln\\left(\\frac{x^2\\sqrt{y}}{z^3}\\right)$", "$\\ln(x^2 + \\sqrt{y} - z^3)$", "$\\ln\\left(\\frac{2x \\cdot \\frac{1}{2}y}{3z}\\right)$", "$\\ln(x^2 y^{1/2} z^3)$"],
                        0,
                        "Power rule: $\\ln(x^2) + \\ln(\\sqrt{y}) - \\ln(z^3) = \\ln\\left(\\frac{x^2\\sqrt{y}}{z^3}\\right)$."
                    ),
                    make_q(
                        "Given $\\log_a 2 \\approx 0.301$ and $\\log_a 3 \\approx 0.477$, approximate $\\log_a 18$.",
                        ["$1.255$", "$0.778$", "$1.079$", "$0.954$"],
                        0,
                        "$\\log_a(18) = \\log_a(2 \\cdot 3^2) = \\log_a 2 + 2\\log_a 3 \\approx 0.301 + 2(0.477) = 0.301 + 0.954 = 1.255$."
                    )
                ]
            },
            {
                "heading": "Section 3: Change of Base Formula",
                "questions": [
                    make_q(
                        "State the change of base formula to express $\\log_b a$ in terms of natural logarithms.",
                        ["$\\log_b a = \\frac{\\ln a}{\\ln b}$", "$\\log_b a = \\frac{\\ln b}{\\ln a}$", "$\\log_b a = \\ln(a - b)$", "$\\log_b a = \\ln(a) \\cdot \\ln(b)$"],
                        0,
                        "The change of base formula is $\\log_b a = \\frac{\\log_c a}{\\log_c b} = \\frac{\\ln a}{\\ln b}$."
                    ),
                    make_q(
                        "Evaluate $\\log_4(32)$ using the change of base formula with base 2.",
                        ["$5/2 = 2.5$", "$8$", "$2$", "$5/4$"],
                        0,
                        "$\\frac{\\log_2 32}{\\log_2 4} = \\frac{5}{2} = 2.5$."
                    ),
                    make_q(
                        "Evaluate the product $\\log_2 3 \\cdot \\log_3 4 \\cdot \\log_4 8$.",
                        ["$3$", "$2$", "$4$", "$\\log_2 8$ is 3"],
                        0,
                        "Using natural logs: $\\frac{\\ln 3}{\\ln 2} \\frac{\\ln 4}{\\ln 3} \\frac{\\ln 8}{\\ln 4} = \\frac{\\ln 8}{\\ln 2} = \\log_2 8 = 3$."
                    )
                ]
            },
            {
                "heading": "Section 4: Domains and Graphs of Logarithmic Functions",
                "questions": [
                    make_q(
                        "Find the domain and vertical asymptote of $f(x) = \\ln(2x - 6)$.",
                        ["Domain: $(3, \\infty)$, Asymptote: $x = 3$", "Domain: $[3, \\infty)$, Asymptote: $x = 3$", "Domain: $(6, \\infty)$, Asymptote: $x = 6$", "Domain: $(0, \\infty)$, Asymptote: $x = 0$"],
                        0,
                        "Argument must be strictly positive: $2x - 6 > 0 \\Rightarrow 2x > 6 \\Rightarrow x > 3$. Vertical asymptote at $x = 3$."
                    ),
                    make_q(
                        "What is the range of any basic logarithmic function $f(x) = \\log_b(x)$ ($b > 1$)?",
                        ["$(-\\infty, \\infty)$", "$(0, \\infty)$", "$[0, \\infty)$", "$(-\\infty, 0)$"],
                        0,
                        "As $x \\to 0^+$, $\\log_b x \\to -\\infty$; as $x \\to \\infty$, $\\log_b x \\to \\infty$. The range is all real numbers."
                    ),
                    make_q(
                        "Find the $x$-intercept of $y = \\log_3(x + 2) - 1$.",
                        ["$(1, 0)$", "$(0, 0)$", "$(3, 0)$", "$(-1, 0)$"],
                        0,
                        "Set $y = 0$: $\\log_3(x + 2) = 1 \\Rightarrow x + 2 = 3^1 = 3 \\Rightarrow x = 1$."
                    )
                ]
            }
        ]
    },

    # ── 7.03 Exponential and Logarithmic Equations ────────────────────────────
    {
        "track": "precalc",
        "num": "7.03",
        "slug": "exponential-and-logarithmic-equations",
        "title": "Exponential and Logarithmic Equations",
        "sections": [
            {
                "heading": "Section 1: Equations with Like Bases",
                "questions": [
                    make_q(
                        "Solve $27^{x-1} = 9^{2x+3}$ for $x$.",
                        ["$-9$", "$9$", "$-3$", "$6$"],
                        0,
                        "Base 3: $(3^3)^{x-1} = (3^2)^{2x+3} \\Rightarrow 3(x - 1) = 2(2x + 3) \\Rightarrow 3x - 3 = 4x + 6 \\Rightarrow -x = 9 \\Rightarrow x = -9$."
                    ),
                    make_q(
                        "Solve $5^{x^2 - 3x} = 625$.",
                        ["$x = -1$ and $x = 4$", "$x = 1$ and $x = -4$", "$x = 2$ and $x = -2$", "$x = 4$ only"],
                        0,
                        "$625 = 5^4 \\Rightarrow x^2 - 3x = 4 \\Rightarrow x^2 - 3x - 4 = 0 \\Rightarrow (x - 4)(x + 1) = 0 \\Rightarrow x = 4, -1$."
                    ),
                    make_q(
                        "Solve $\\left(\\frac{1}{2}\\right)^{x+2} = 8^{x-1}$.",
                        ["$1/4$", "$1/2$", "$-1/4$", "$2$"],
                        0,
                        "$2^{-(x+2)} = 2^{3(x-1)} \\Rightarrow -x - 2 = 3x - 3 \\Rightarrow 4x = 1 \\Rightarrow x = 1/4$."
                    )
                ]
            },
            {
                "heading": "Section 2: Equations Requiring Natural Logarithms",
                "questions": [
                    make_q(
                        "Solve $3^{2x} = 7$ for $x$ in exact form.",
                        ["$x = \\frac{\\ln 7}{2\\ln 3}$", "$x = \\frac{\\ln 3}{2\\ln 7}$", "$x = \\frac{7}{6}$", "$x = \\frac{\\ln 7}{\\ln 6}$"],
                        0,
                        "Take $\\ln$ of both sides: $\\ln(3^{2x}) = \\ln 7 \\Rightarrow 2x\\ln 3 = \\ln 7 \\Rightarrow x = \\frac{\\ln 7}{2\\ln 3}$."
                    ),
                    make_q(
                        "Solve $5 e^{3x - 2} = 40$ for $x$.",
                        ["$x = \\frac{\\ln 8 + 2}{3}$", "$x = \\frac{\\ln 8 - 2}{3}$", "$x = \\frac{\\ln 40}{15}$", "$x = 2$"],
                        0,
                        "$e^{3x - 2} = 8 \\Rightarrow 3x - 2 = \\ln 8 \\Rightarrow 3x = \\ln 8 + 2 \\Rightarrow x = \\frac{\\ln 8 + 2}{3}$."
                    ),
                    make_q(
                        "Solve $2^{x+1} = 5^{x-1}$ for $x$.",
                        ["$x = \\frac{\\ln 2 + \\ln 5}{\\ln 5 - \\ln 2} = \\frac{\\ln 10}{\\ln(5/2)}$", "$x = \\frac{\\ln 5}{\\ln 2}$", "$x = 1$", "$x = \\frac{\\ln 10}{\\ln 10} = 1$"],
                        0,
                        "$(x+1)\\ln 2 = (x-1)\\ln 5 \\Rightarrow x\\ln 2 + \\ln 2 = x\\ln 5 - \\ln 5 \\Rightarrow x(\\ln 5 - \\ln 2) = \\ln 5 + \\ln 2 \\Rightarrow x = \\frac{\\ln 10}{\\ln(5/2)}$."
                    )
                ]
            },
            {
                "heading": "Section 3: Logarithmic Equations and Extraneous Solutions",
                "questions": [
                    make_q(
                        "Solve $\\log_2(x) + \\log_2(x - 2) = 3$.",
                        ["$x = 4$ only", "$x = 4$ and $x = -2$", "$x = 8$", "$x = 2$"],
                        0,
                        "$\\log_2(x(x - 2)) = 3 \\Rightarrow x^2 - 2x = 2^3 = 8 \\Rightarrow x^2 - 2x - 8 = 0 \\Rightarrow (x - 4)(x + 2) = 0$. Since $\\log_2(-2)$ is undefined, $x = -2$ is extraneous. Solution: $x = 4$."
                    ),
                    make_q(
                        "Solve $\\ln(x + 5) - \\ln(x - 1) = \\ln(3)$.",
                        ["$x = 4$", "$x = 3$", "$x = 2$", "$x = 5$"],
                        0,
                        "$\\ln\\left(\\frac{x+5}{x-1}\\right) = \\ln(3) \\Rightarrow \\frac{x+5}{x-1} = 3 \\Rightarrow x + 5 = 3x - 3 \\Rightarrow 2x = 8 \\Rightarrow x = 4$."
                    ),
                    make_q(
                        "Why must potential solutions to logarithmic equations always be checked in the original equation?",
                        ["The argument of every logarithm must be strictly positive ($> 0$)", "Logarithms cannot have rational answers", "Extraneous roots always equal 0", "Base change invalidates solutions"],
                        0,
                        "Logarithmic functions are only defined for positive real inputs; algebraic manipulation can introduce extraneous roots that make arguments $\\leq 0$."
                    )
                ]
            },
            {
                "heading": "Section 4: Quadratic-Form Exponential Equations",
                "questions": [
                    make_q(
                        "Solve $e^{2x} - 5e^x + 6 = 0$ for $x$.",
                        ["$x = \\ln 2$ and $x = \\ln 3$", "$x = 2$ and $x = 3$", "$x = \\ln 5$ and $x = \\ln 6$", "$x = e^2$ and $x = e^3$"],
                        0,
                        "Let $u = e^x$: $u^2 - 5u + 6 = (u - 2)(u - 3) = 0 \\Rightarrow u = 2, 3$. Thus $x = \\ln 2$ or $x = \\ln 3$."
                    ),
                    make_q(
                        "Solve $e^{2x} - 3e^x - 4 = 0$ for $x$.",
                        ["$x = \\ln 4$ only", "$x = \\ln 4$ and $x = \\ln(-1)$", "$x = 4$ and $x = -1$", "No real solutions"],
                        0,
                        "$(e^x - 4)(e^x + 1) = 0 \\Rightarrow e^x = 4$ or $e^x = -1$. Since $e^x > 0$ for all real $x$, $e^x = -1$ has no real solution. Thus $x = \\ln 4$."
                    ),
                    make_q(
                        "Solve $4^x - 3 \\cdot 2^x - 4 = 0$.",
                        ["$x = 2$ only", "$x = 4$ only", "$x = 2$ and $x = -1$", "$x = 1$"],
                        0,
                        "$(2^x)^2 - 3(2^x) - 4 = 0 \\Rightarrow (2^x - 4)(2^x + 1) = 0 \\Rightarrow 2^x = 4 \\Rightarrow x = 2$ (since $2^x = -1$ is impossible)."
                    )
                ]
            }
        ]
    },

    # ── 7.04 Applications: Growth and Decay ────────────────────────────────────
    {
        "track": "precalc",
        "num": "7.04",
        "slug": "applications-growth-and-decay",
        "title": "Applications: Growth and Decay",
        "sections": [
            {
                "heading": "Section 1: Population Growth Models",
                "questions": [
                    make_q(
                        "A bacterial culture doubles every 3 hours. If the initial count is 500, what is the population after 9 hours?",
                        ["$4000$", "$1500$", "$2000$", "$8000$"],
                        0,
                        "After 9 hours, $9/3 = 3$ doubling periods have elapsed. $P(9) = 500 \\times 2^3 = 500 \\times 8 = 4000$."
                    ),
                    make_q(
                        "A city has population $P(t) = 100000 e^{0.02 t}$, where $t$ is in years. Find the continuous annual growth rate and doubling time.",
                        ["Rate $= 2\\%$, Doubling time $\\approx 34.7\\text{ years}$", "Rate $= 20\\%$, Doubling time $\\approx 3.5\\text{ years}$", "Rate $= 0.02\\%$, Doubling time $\\approx 50\\text{ years}$", "Rate $= 2\\%$, Doubling time $\\approx 50\\text{ years}$"],
                        0,
                        "Growth constant $k = 0.02 = 2\\%$. Doubling time $T = \\frac{\\ln 2}{k} = \\frac{0.69315}{0.02} \\approx 34.66 \\approx 34.7\\text{ years}$."
                    ),
                    make_q(
                        "If a culture grows from 200 to 600 in 4 hours according to $P(t) = P_0 e^{kt}$, find $k$.",
                        ["$k = \\frac{\\ln 3}{4} \\approx 0.275$", "$k = \\frac{\\ln 4}{3}$", "$k = 3/4$", "$k = \\ln(3/4)$"],
                        0,
                        "$600 = 200 e^{4k} \\Rightarrow e^{4k} = 3 \\Rightarrow 4k = \\ln 3 \\Rightarrow k = \\frac{\\ln 3}{4} \\approx 0.275$."
                    )
                ]
            },
            {
                "heading": "Section 2: Radioactive Decay and Half-Life",
                "questions": [
                    make_q(
                        "Carbon-14 has a half-life of 5730 years. What fraction of the original C-14 remains in a fossil after 17190 years?",
                        ["$1/8$", "$1/4$", "$1/16$", "$1/3$"],
                        0,
                        "Number of half-lives $= 17190 / 5730 = 3$. Remaining fraction $= (1/2)^3 = 1/8$."
                    ),
                    make_q(
                        "State the formula relating decay constant $k > 0$ and half-life $t_{1/2}$ in $N(t) = N_0 e^{-kt}$.",
                        ["$k = \\frac{\\ln 2}{t_{1/2}}$", "$k = \\frac{t_{1/2}}{\\ln 2}$", "$k = \\frac{1}{2t_{1/2}}$", "$k = \\ln(2t_{1/2})$"],
                        0,
                        "$N_0 / 2 = N_0 e^{-k t_{1/2}} \\Rightarrow e^{k t_{1/2}} = 2 \\Rightarrow k = \\frac{\\ln 2}{t_{1/2}}$."
                    ),
                    make_q(
                        "A sample contains $80\\text{ mg}$ of an isotope with a half-life of 10 days. How much remains after 25 days?",
                        ["$80(0.5)^{2.5} \\approx 14.14\\text{ mg}$", "$20\\text{ mg}$", "$10\\text{ mg}$", "$15\\text{ mg}$"],
                        0,
                        "$N(25) = 80(1/2)^{25/10} = 80(1/2)^{2.5} = \\frac{80}{4\\sqrt{2}} = \\frac{20}{\\sqrt{2}} = 10\\sqrt{2} \\approx 14.14\\text{ mg}$."
                    )
                ]
            },
            {
                "heading": "Section 3: Newton's Law of Cooling",
                "questions": [
                    make_q(
                        "State Newton's Law of Cooling formula for temperature $T(t)$ with ambient medium $T_m$.",
                        ["$T(t) = T_m + (T_0 - T_m)e^{-kt}$", "$T(t) = T_0 e^{-kt} + T_m$", "$T(t) = T_m(1 - e^{-kt})$", "$T(t) = (T_0 - T_m)e^{kt}$"],
                        0,
                        "The rate of cooling is proportional to the temperature difference: $\\frac{dT}{dt} = -k(T - T_m) \\Rightarrow T(t) = T_m + (T_0 - T_m)e^{-kt}$."
                    ),
                    make_q(
                        "A hot cup of coffee at $190^\\circ\\text{F}$ is placed in a $70^\\circ\\text{F}$ room. What is the initial temperature difference $T_0 - T_m$?",
                        ["$120^\\circ\\text{F}$", "$190^\\circ\\text{F}$", "$70^\\circ\\text{F}$", "$260^\\circ\\text{F}$"],
                        0,
                        "$T_0 - T_m = 190 - 70 = 120^\\circ\\text{F}$."
                    ),
                    make_q(
                        "If the coffee cools from $190^\\circ\\text{F}$ to $130^\\circ\\text{F}$ in 10 minutes in the $70^\\circ\\text{F}$ room, find $k$.",
                        ["$k = \\frac{\\ln 2}{10} \\approx 0.0693\\text{ min}^{-1}$", "$k = 0.1$", "$k = \\frac{\\ln 3}{10}$", "$k = 0.05$"],
                        0,
                        "$130 = 70 + 120 e^{-10k} \\Rightarrow 60 = 120 e^{-10k} \\Rightarrow e^{-10k} = 1/2 \\Rightarrow 10k = \\ln 2 \\Rightarrow k = \\frac{\\ln 2}{10}$."
                    )
                ]
            },
            {
                "heading": "Section 4: Logarithmic Scales (pH, Richter, Decibels)",
                "questions": [
                    make_q(
                        "The pH of a solution is defined as $\\text{pH} = -\\log_{10}[\\text{H}^+]$. What is the pH if $[\\text{H}^+] = 10^{-4}\\text{ M}$?",
                        ["$4$", "$-4$", "$10$", "$14$"],
                        0,
                        "$\\text{pH} = -\\log_{10}(10^{-4}) = -(-4) = 4$."
                    ),
                    make_q(
                        "The Richter magnitude scale is $M = \\log_{10}\\left(\\frac{I}{S}\\right)$. How many times more intense is an earthquake of magnitude 7 than one of magnitude 4?",
                        ["$1000$ times ($10^3$)", "$3$ times", "$30$ times", "$10000$ times"],
                        0,
                        "Difference in magnitude $\\Delta M = 7 - 4 = 3$. Ratio of intensities $= 10^3 = 1000$."
                    ),
                    make_q(
                        "Sound intensity level in decibels is $\\beta = 10\\log_{10}\\left(\\frac{I}{I_0}\\right)$. If the intensity $I$ is multiplied by 100, how many decibels are added?",
                        ["$+20\\text{ dB}$", "$+100\\text{ dB}$", "$+10\\text{ dB}$", "$+2\\text{ dB}$"],
                        0,
                        "$\\Delta \\beta = 10\\log_{10}(100) = 10(2) = 20\\text{ dB}$."
                    )
                ]
            }
        ]
    },

    # ── 8.01 Rational Functions and Asymptotes ─────────────────────────────────
    {
        "track": "precalc",
        "num": "8.01",
        "slug": "rational-functions-and-asymptotes",
        "title": "Rational Functions and Asymptotes",
        "sections": [
            {
                "heading": "Section 1: Vertical Asymptotes and Holes",
                "questions": [
                    make_q(
                        "Find all vertical asymptotes and holes for $f(x) = \\frac{x^2 - 4}{x^2 - x - 2}$.",
                        ["Hole at $x = 2$, Vertical asymptote at $x = -1$", "Vertical asymptotes at $x = 2$ and $x = -1$", "Hole at $x = -1$, Vertical asymptote at $x = 2$", "No holes, vertical asymptote at $x = 2$"],
                        0,
                        "Factor: $\\frac{(x-2)(x+2)}{(x-2)(x+1)} = \\frac{x+2}{x+1}$ for $x \\neq 2$. The common factor $(x-2)$ creates a hole at $x = 2$. The remaining zero of the denominator $x = -1$ gives a vertical asymptote."
                    ),
                    make_q(
                        "Find the coordinates $(x, y)$ of the hole for $f(x) = \\frac{x^2 - 9}{x - 3}$.",
                        ["$(3, 6)$", "$(3, 0)$", "$(3, 3)$", "$(-3, 0)$"],
                        0,
                        "For $x \\neq 3$, $f(x) = x + 3$. Evaluating at $x = 3$ gives $y = 3 + 3 = 6$. The hole is at $(3, 6)$."
                    ),
                    make_q(
                        "How do you determine if a real zero of the denominator causes a hole or a vertical asymptote?",
                        ["If the numerator also has the same zero of equal or greater multiplicity, it is a hole; otherwise it is a vertical asymptote", "Every zero of the denominator is an asymptote", "If the degree of the numerator is larger, it is always a hole", "Check the sign of $f(0)$"],
                        0,
                        "A factor that cancels completely between numerator and denominator creates a removable hole; an uncanceled denominator factor yields an infinite discontinuity (vertical asymptote)."
                    )
                ]
            },
            {
                "heading": "Section 2: Horizontal Asymptotes",
                "questions": [
                    make_q(
                        "Find the horizontal asymptote of $f(x) = \\frac{4x^2 + 1}{3x^2 - 5x + 2}$.",
                        ["$y = 4/3$", "$y = 0$", "No horizontal asymptote", "$y = 1/2$"],
                        0,
                        "The degrees of numerator and denominator are both 2. The horizontal asymptote is the ratio of leading coefficients: $y = 4/3$."
                    ),
                    make_q(
                        "Find the horizontal asymptote of $g(x) = \\frac{7x - 2}{x^3 + 4}$.",
                        ["$y = 0$", "$y = 7$", "No horizontal asymptote", "$y = -1/2$"],
                        0,
                        "The degree of the numerator (1) is strictly less than the degree of the denominator (3), so $y = 0$ is the horizontal asymptote."
                    ),
                    make_q(
                        "Under what condition does a rational function have NO horizontal asymptote?",
                        ["When the degree of the numerator is strictly greater than the degree of the denominator", "When the degree of the denominator is greater", "When the degrees are equal", "When there are no real roots"],
                        0,
                        "If $\\text{deg}(P) > \\text{deg}(Q)$, $f(x) \\to \\pm\\infty$ as $x \\to \\pm\\infty$, so there is no horizontal asymptote."
                    )
                ]
            },
            {
                "heading": "Section 3: Slant (Oblique) Asymptotes",
                "questions": [
                    make_q(
                        "When does a rational function $f(x) = \\frac{P(x)}{Q(x)}$ possess a slant (oblique) asymptote?",
                        ["When the degree of the numerator is exactly 1 greater than the degree of the denominator", "When the degree of the numerator is 2 greater", "When the degree of the denominator is greater", "When there are no vertical asymptotes"],
                        0,
                        "A slant asymptote occurs when $\\text{deg}(P) = \\text{deg}(Q) + 1$, producing a linear quotient via polynomial division."
                    ),
                    make_q(
                        "Find the slant asymptote of $f(x) = \\frac{2x^2 + 7x + 5}{x + 2}$.",
                        ["$y = 2x + 3$", "$y = 2x + 7$", "$y = 2x - 1$", "$y = x + 3$"],
                        0,
                        "Polynomial division: $\\frac{2x^2 + 7x + 5}{x + 2} = (2x + 3) - \\frac{1}{x + 2}$. As $x \\to \\pm\\infty$, the remainder $\\to 0$, giving slant asymptote $y = 2x + 3$."
                    ),
                    make_q(
                        "Find the slant asymptote of $g(x) = \\frac{x^3 - 1}{x^2 + 1}$.",
                        ["$y = x$", "$y = x - 1$", "$y = 1$", "No slant asymptote"],
                        0,
                        "Dividing: $x^3 - 1 = x(x^2 + 1) - x - 1 \\Rightarrow \\frac{x^3 - 1}{x^2 + 1} = x - \\frac{x + 1}{x^2 + 1}$. As $x \\to \\infty$, slant asymptote is $y = x$."
                    )
                ]
            },
            {
                "heading": "Section 4: Intercepts and Asymptote Crossings",
                "questions": [
                    make_q(
                        "Find all $x$-intercepts and the $y$-intercept of $f(x) = \\frac{x^2 - 1}{x^2 - 4}$.",
                        ["$x$-intercepts: $(\\pm 1, 0)$, $y$-intercept: $(0, 1/4)$", "$x$-intercepts: $(\\pm 2, 0)$, $y$-intercept: $(0, -1/4)$", "$x$-intercepts: $(\\pm 1, 0)$, $y$-intercept: $(0, -1)$", "$x$-intercepts: $(1, 0)$, $y$-intercept: $(0, 1/4)$"],
                        0,
                        "$x$-intercepts occur where numerator $= 0$: $x^2 - 1 = 0 \\Rightarrow x = \\pm 1$. $y$-intercept is $f(0) = \\frac{-1}{-4} = 1/4$."
                    ),
                    make_q(
                        "Can a rational function cross its horizontal or slant asymptote?",
                        ["Yes, a function can cross its horizontal or slant asymptote at finite values of $x$", "No, a graph can never touch any asymptote", "Only at the $y$-intercept", "Only if it has no vertical asymptotes"],
                        0,
                        "Unlike vertical asymptotes (where the function is undefined), horizontal and slant asymptotes only govern end behavior as $x \\to \\pm\\infty$; curves can freely cross them at finite points."
                    ),
                    make_q(
                        "Find the point where $f(x) = \\frac{x^2 + 3x - 4}{x^2 - 1}$ crosses its horizontal asymptote $y = 1$.",
                        ["$(-1, 1)$ is undefined; crossing is at $x = 1$ is undefined; crosses at $(1, 1)$ is a hole; no crossing point", "It crosses at $x = 1$", "It crosses at $x = 0$", "It does not cross its horizontal asymptote"],
                        3,
                        "Set $f(x) = 1$: $\\frac{x^2 + 3x - 4}{x^2 - 1} = 1 \\Rightarrow x^2 + 3x - 4 = x^2 - 1 \\Rightarrow 3x = 3 \\Rightarrow x = 1$. But at $x = 1$, the function has a removable hole, so it does not cross."
                    )
                ]
            }
        ]
    },

    # ── 8.02 Graphing Rational Functions ──────────────────────────────────────
    {
        "track": "precalc",
        "num": "8.02",
        "slug": "graphing-rational-functions",
        "title": "Graphing Rational Functions",
        "sections": [
            {
                "heading": "Section 1: Multiplicity of Zeros and Sign Analysis",
                "questions": [
                    make_q(
                        "If a factor $(x - c)$ in the denominator of a rational function has odd multiplicity (e.g. $(x - c)^1$), how does the graph behave near the asymptote $x = c$?",
                        ["The graph goes in opposite directions ($+\\infty$ on one side and $-\\infty$ on the other)", "The graph goes in the same direction ($+\\infty$ on both sides)", "The graph crosses the axis", "A hole is formed"],
                        0,
                        "Odd multiplicity produces a sign change across the asymptote, sending one side toward $+\\infty$ and the other toward $-\\infty$."
                    ),
                    make_q(
                        "If the factor in the denominator has even multiplicity $(x - c)^2$, how does the graph behave near $x = c$?",
                        ["The graph goes in the same direction on both sides (both $+\\infty$ or both $-\\infty$)", "The graph goes in opposite directions", "The graph crosses the asymptote", "A corner is formed"],
                        0,
                        "Even multiplicity maintains the same sign on both sides of $c$, sending both branches toward the same infinity."
                    ),
                    make_q(
                        "What is the sign behavior of $f(x) = \\frac{1}{(x - 2)^2}$ on both sides of $x = 2$?",
                        ["Positive ($+\\infty$) on both sides", "Negative on left, positive on right", "Negative on both sides", "Undefined"],
                        0,
                        "Since $(x - 2)^2 > 0$ for all $x \\neq 2$, the output is strictly positive, approaching $+\\infty$ from both sides."
                    )
                ]
            },
            {
                "heading": "Section 2: Constructing Sign Charts",
                "questions": [
                    make_q(
                        "Which values partition the number line into test intervals when making a sign chart for a rational function?",
                        ["All real zeros of the numerator and all real zeros of the denominator", "Only the zeros of the denominator", "Only the zeros of the numerator", "Only the $y$-intercept"],
                        0,
                        "A rational function can change signs only at the zeros of its numerator ($x$-intercepts) and the zeros of its denominator (vertical asymptotes)."
                    ),
                    make_q(
                        "Find the solution set of $\\frac{x - 3}{x + 1} > 0$.",
                        ["$(-\\infty, -1) \\cup (3, \\infty)$", "$(-1, 3)$", "$[3, \\infty)$", "$(-\\infty, 3)$"],
                        0,
                        "Critical points at $x = -1, 3$. For $x < -1$: $(-)/(-) = +$. For $-1 < x < 3$: $(-)/(+) = -$. For $x > 3$: $(+)/(+) = +$. Thus $(-\\infty, -1) \\cup (3, \\infty)$."
                    ),
                    make_q(
                        "Solve the inequality $\\frac{x^2 - 4}{x} \\leq 0$.",
                        ["$(-\\infty, -2] \\cup (0, 2]$", "$[-2, 0) \\cup [2, \\infty)$", "$[-2, 2]$", "$(-\\infty, 0)$"],
                        0,
                        "Key values: $-2, 0, 2$. Test: $x < -2 \\Rightarrow -$; $-2 \\leq x < 0 \\Rightarrow +$; $0 < x \\leq 2 \\Rightarrow -$; $x > 2 \\Rightarrow +$. Since $x = 0$ is in denominator, interval is $(-\\infty, -2] \\cup (0, 2]$."
                    )
                ]
            },
            {
                "heading": "Section 3: Sketching Complete Curves",
                "questions": [
                    make_q(
                        "Which of the following is the complete set of features needed to accurately sketch a rational function?",
                        ["Domain, holes, vertical/horizontal asymptotes, $x$- and $y$-intercepts, and sign behavior", "Only the degree and the leading coefficient", "Only the $y$-intercept and one point", "Only the vertical asymptotes"],
                        0,
                        "Accurate sketching requires determining all discontinuities, asymptotes, intercepts, and branch behaviors between asymptotes."
                    ),
                    make_q(
                        "Sketch $f(x) = \\frac{2x}{x - 1}$. What is the value of $f(2)$ and $f(-1)$?",
                        ["$f(2) = 4$ and $f(-1) = 1$", "$f(2) = 2$ and $f(-1) = -1$", "$f(2) = 4$ and $f(-1) = -1$", "$f(2) = 1$ and $f(-1) = 2$"],
                        0,
                        "$f(2) = \\frac{4}{1} = 4$. $f(-1) = \\frac{-2}{-2} = 1$."
                    ),
                    make_q(
                        "In $f(x) = \\frac{2x}{x - 1}$, as $x \\to 1^+$, what is the limit of $f(x)$?",
                        ["$+\\infty$", "$-\\infty$", "$2$", "$0$"],
                        0,
                        "As $x \\to 1^+$, numerator $\\to 2 > 0$ and denominator $\\to 0^+$, so $f(x) \\to +\\infty$."
                    )
                ]
            },
            {
                "heading": "Section 4: Writing Rational Functions from Features",
                "questions": [
                    make_q(
                        "Write a rational function with vertical asymptotes at $x = -2$ and $x = 3$, horizontal asymptote $y = 0$, and $x$-intercept $(1, 0)$.",
                        ["$f(x) = \\frac{x - 1}{(x + 2)(x - 3)}$", "$f(x) = \\frac{(x + 2)(x - 3)}{x - 1}$", "$f(x) = \\frac{x - 1}{x^2 + 1}$", "$f(x) = \\frac{2x - 1}{(x + 2)(x - 3)}$"],
                        0,
                        "Numerator has factor $(x - 1)$ to give $x$-intercept $1$. Denominator has factors $(x + 2)(x - 3)$. Since $\\text{deg(Num)} = 1 < \\text{deg(Den)} = 2$, horizontal asymptote is $y = 0$."
                    ),
                    make_q(
                        "Write a rational function with vertical asymptote $x = 4$, hole at $x = -1$, horizontal asymptote $y = 2$, and $y$-intercept $(0, -1/2)$.",
                        ["$f(x) = \\frac{2(x + 1)(x - 1)}{(x + 1)(x - 4)}$", "$f(x) = \\frac{2x + 1}{x - 4}$", "$f(x) = \\frac{(x + 1)}{(x + 1)(x - 4)}$", "$f(x) = \\frac{2(x - 4)}{x + 1}$"],
                        0,
                        "Hole at $-1 \\Rightarrow (x+1)$ in both. Vertical asymptote at $4 \\Rightarrow (x-4)$ in denominator. Ratio of leading coefficients $= 2$. $f(0) = \\frac{2(1)(-1)}{(1)(-4)} = \\frac{-2}{-4} = \\frac{1}{2}$; with $(x-1)$ in numerator gives $f(0) = 1/2$ or $-1/2$."
                    ),
                    make_q(
                        "What is the minimum degree of the denominator of a rational function with two distinct vertical asymptotes?",
                        ["$2$", "$1$", "$3$", "$4$"],
                        0,
                        "Each distinct vertical asymptote requires at least one distinct linear factor in the denominator, so degree $\\geq 2$."
                    )
                ]
            }
        ]
    },

    # ── 8.03 Introduction to Limits ───────────────────────────────────────────
    {
        "track": "precalc",
        "num": "8.03",
        "slug": "introduction-to-limits",
        "title": "Introduction to Limits",
        "sections": [
            {
                "heading": "Section 1: Intuitive Concept and Numerical Estimates",
                "questions": [
                    make_q(
                        "What does $\\lim_{x \\to c} f(x) = L$ mean intuitively?",
                        ["As $x$ gets arbitrarily close to $c$ (from either side, $x \\neq c$), $f(x)$ gets arbitrarily close to $L$", "$f(c) = L$ always", "The slope of $f$ at $c$ is $L$", "$f(x)$ is continuous at $c$"],
                        0,
                        "A limit describes the value that $f(x)$ approaches as $x$ nears $c$, completely independent of what happens at $x = c$ itself."
                    ),
                    make_q(
                        "Use numerical estimation with $x = 1.9, 1.99, 2.01, 2.1$ to estimate $\\lim_{x \\to 2} (3x - 1)$.",
                        ["$5$", "$6$", "$4$", "$3$"],
                        0,
                        "$3(1.99) - 1 = 4.97$; $3(2.01) - 1 = 5.03$. Values converge toward 5 as $x \\to 2$."
                    ),
                    make_q(
                        "If $f(3)$ is undefined, can $\\lim_{x \\to 3} f(x)$ still exist?",
                        ["Yes, because limits describe behavior near $x = 3$, not at $x = 3$", "No, limits require $f(c)$ to be defined", "Only if $f(x) = 0$", "Only for polynomials"],
                        0,
                        "The existence of a limit at $c$ depends entirely on values in a punctured neighborhood around $c$, regardless of whether $f(c)$ is defined."
                    )
                ]
            },
            {
                "heading": "Section 2: Graphical Limits and One-Sided Limits",
                "questions": [
                    make_q(
                        "When does the two-sided limit $\\lim_{x \\to c} f(x)$ exist?",
                        ["If and only if both one-sided limits exist and are equal ($\\lim_{x \\to c^-} f(x) = \\lim_{x \\to c^+} f(x) = L$)", "Whenever $f(c)$ exists", "Whenever $\\lim_{x \\to c^+} f(x)$ exists", "If $f$ is defined on $[c, \\infty)$"],
                        0,
                        "The two-sided limit exists if and only if both the left-hand limit and the right-hand limit exist and agree on a common value $L$."
                    ),
                    make_q(
                        "For the step function $f(x)$ defined as $2$ for $x < 1$ and $5$ for $x \\geq 1$, find $\\lim_{x \\to 1^-} f(x)$ and $\\lim_{x \\to 1^+} f(x)$.",
                        ["Left limit $= 2$, Right limit $= 5$", "Left limit $= 5$, Right limit $= 2$", "Both equal 2", "Both equal 5"],
                        0,
                        "As $x \\to 1^-$ (from the left), $f(x) = 2$. As $x \\to 1^+$ (from the right), $f(x) = 5$."
                    ),
                    make_q(
                        "Does the two-sided limit $\\lim_{x \\to 1} f(x)$ exist for the step function in the previous question?",
                        ["No, because the left limit ($2$) does not equal the right limit ($5$)", "Yes, it equals 5", "Yes, it equals 3.5", "Yes, it equals 2"],
                        0,
                        "Because $\\lim_{x \\to 1^-} f(x) = 2 \\neq 5 = \\lim_{x \\to 1^+} f(x)$, the two-sided limit does not exist (DNE)."
                    )
                ]
            },
            {
                "heading": "Section 3: Algebraic Evaluation of Limits",
                "questions": [
                    make_q(
                        "Evaluate $\\lim_{x \\to 4} \\frac{x^2 - 16}{x - 4}$.",
                        ["$8$", "$0$", "$4$", "Does not exist"],
                        0,
                        "Indeterminate form $0/0$. Factor: $\\frac{(x-4)(x+4)}{x-4} = x + 4$. As $x \\to 4$, $4 + 4 = 8$."
                    ),
                    make_q(
                        "Evaluate $\\lim_{x \\to 0} \\frac{\\sqrt{x + 9} - 3}{x}$.",
                        ["$1/6$", "$1/3$", "$0$", "$1/9$"],
                        0,
                        "Multiply numerator and denominator by conjugate $(\\sqrt{x+9} + 3)$: $\\frac{(x+9) - 9}{x(\\sqrt{x+9} + 3)} = \\frac{1}{\\sqrt{x+9} + 3} \\to \\frac{1}{3 + 3} = \\frac{1}{6}$."
                    ),
                    make_q(
                        "Evaluate $\\lim_{x \\to -2} \\frac{x^3 + 8}{x + 2}$.",
                        ["$12$", "$0$", "$4$", "$8$"],
                        0,
                        "Sum of cubes: $\\frac{(x + 2)(x^2 - 2x + 4)}{x + 2} = x^2 - 2x + 4$. At $x = -2$: $(-2)^2 - 2(-2) + 4 = 4 + 4 + 4 = 12$."
                    )
                ]
            },
            {
                "heading": "Section 4: Limits Involving Infinity",
                "questions": [
                    make_q(
                        "Evaluate $\\lim_{x \\to \\infty} \\frac{5x^2 - 2x}{2x^2 + 7x - 1}$.",
                        ["$5/2$", "$\\infty$", "$0$", "$-2$"],
                        0,
                        "Divide by $x^2$: $\\lim_{x \\to \\infty} \\frac{5 - 2/x}{2 + 7/x - 1/x^2} = \\frac{5}{2}$."
                    ),
                    make_q(
                        "Evaluate $\\lim_{x \\to \\infty} \\frac{3x + 1}{x^2 + 5}$.",
                        ["$0$", "$3$", "$\\infty$", "$1/5$"],
                        0,
                        "The degree of the denominator is higher than that of the numerator, so the limit as $x \\to \\infty$ is 0."
                    ),
                    make_q(
                        "Evaluate $\\lim_{x \\to 3^+} \\frac{1}{x - 3}$ and $\\lim_{x \\to 3^-} \\frac{1}{x - 3}$.",
                        ["$+\\infty$ and $-\\infty$", "$+\\infty$ and $+\\infty$", "$-\\infty$ and $+\\infty$", "$0$ and $0$"],
                        0,
                        "As $x \\to 3^+$, $x - 3 > 0$, so $1/(x-3) \\to +\\infty$. As $x \\to 3^-$, $x - 3 < 0$, so $1/(x-3) \\to -\\infty$."
                    )
                ]
            }
        ]
    },

    # ── 9.01 Arithmetic Sequences and Series ──────────────────────────────────
    {
        "track": "precalc",
        "num": "9.01",
        "slug": "arithmetic-sequences-and-series",
        "title": "Arithmetic Sequences and Series",
        "sections": [
            {
                "heading": "Section 1: General Term of an Arithmetic Sequence",
                "questions": [
                    make_q(
                        "State the formula for the $n$-th term $a_n$ of an arithmetic sequence with first term $a_1$ and common difference $d$.",
                        ["$a_n = a_1 + (n - 1)d$", "$a_n = a_1 \\cdot d^{n-1}$", "$a_n = a_1 + n d$", "$a_n = \\frac{a_1 + a_n}{2}$"],
                        0,
                        "In an arithmetic sequence, each term increases by $d$, so the $n$-th term is $a_n = a_1 + (n - 1)d$."
                    ),
                    make_q(
                        "Find the 20th term of the arithmetic sequence $4, 7, 10, 13, \\dots$",
                        ["$61$", "$58$", "$64$", "$60$"],
                        0,
                        "$a_1 = 4, d = 3$. $a_{20} = 4 + (20 - 1)(3) = 4 + 19(3) = 4 + 57 = 61$."
                    ),
                    make_q(
                        "In an arithmetic sequence, $a_3 = 11$ and $a_8 = 31$. Find the first term $a_1$ and common difference $d$.",
                        ["$a_1 = 3, d = 4$", "$a_1 = 4, d = 3$", "$a_1 = 2, d = 5$", "$a_1 = 1, d = 4$"],
                        0,
                        "$a_8 - a_3 = 5d = 31 - 11 = 20 \\Rightarrow d = 4$. $a_1 = a_3 - 2d = 11 - 2(4) = 3$."
                    )
                ]
            },
            {
                "heading": "Section 2: Sum of an Arithmetic Series",
                "questions": [
                    make_q(
                        "State the two standard formulas for the sum $S_n$ of the first $n$ terms of an arithmetic series.",
                        ["$S_n = \\frac{n}{2}(a_1 + a_n)$ and $S_n = \\frac{n}{2}[2a_1 + (n - 1)d]$", "$S_n = \\frac{a_1(1 - r^n)}{1 - r}$", "$S_n = n(a_1 + a_n)$", "$S_n = \\frac{a_1 + a_n}{2}$"],
                        0,
                        "Gauss's pairing formula gives $S_n = \\frac{n}{2}(a_1 + a_n) = \\frac{n}{2}[2a_1 + (n - 1)d]$."
                    ),
                    make_q(
                        "Find the sum of the first 30 terms of the arithmetic series $2 + 5 + 8 + 11 + \\dots$",
                        ["$1365$", "$1350$", "$2730$", "$1410$"],
                        0,
                        "$n = 30, a_1 = 2, d = 3$. $S_{30} = \\frac{30}{2}[2(2) + (29)(3)] = 15[4 + 87] = 15(91) = 1365$."
                    ),
                    make_q(
                        "Find the sum of the positive integers from 1 to 100.",
                        ["$5050$", "$5000$", "$5100$", "$10100$"],
                        0,
                        "$S_{100} = \\frac{100(101)}{2} = 50 \\times 101 = 5050$."
                    )
                ]
            },
            {
                "heading": "Section 3: Sigma Notation and Number of Terms",
                "questions": [
                    make_q(
                        "Evaluate $\\sum_{k=1}^{25} (4k - 1)$.",
                        ["$1275$", "$1300$", "$1250$", "$2550$"],
                        0,
                        "First term $a_1 = 4(1) - 1 = 3$. Last term $a_{25} = 4(25) - 1 = 99$. Number of terms $n = 25$. $S_{25} = \\frac{25}{2}(3 + 99) = \\frac{25}{2}(102) = 25(51) = 1275$."
                    ),
                    make_q(
                        "How many terms are in the finite arithmetic sequence $7, 11, 15, \\dots, 87$?",
                        ["$21$", "$20$", "$22$", "$19$"],
                        0,
                        "$a_n = a_1 + (n - 1)d \\Rightarrow 87 = 7 + (n - 1)(4) \\Rightarrow 80 = 4(n - 1) \\Rightarrow 20 = n - 1 \\Rightarrow n = 21$."
                    ),
                    make_q(
                        "Evaluate $\\sum_{k=5}^{20} 3k$.",
                        ["$600$", "$570$", "$630$", "$300$"],
                        0,
                        "Number of terms $n = 20 - 5 + 1 = 16$. $a_1 = 3(5) = 15, a_{16} = 3(20) = 60$. $S = \\frac{16}{2}(15 + 60) = 8(75) = 600$."
                    )
                ]
            },
            {
                "heading": "Section 4: Word Problems and Real-World Applications",
                "questions": [
                    make_q(
                        "An auditorium has 20 rows of seats. The first row has 15 seats, and each subsequent row has 2 more seats than the row before it. How many total seats are in the auditorium?",
                        ["$680$", "$660$", "$700$", "$580$"],
                        0,
                        "$a_1 = 15, d = 2, n = 20$. $S_{20} = \\frac{20}{2}[2(15) + (19)(2)] = 10[30 + 38] = 10(68) = 680$."
                    ),
                    make_q(
                        "A runner trains by running $3\\text{ miles}$ on day 1, and increases her daily distance by $0.5\\text{ miles}$ each day. How many total miles will she have run in 14 days?",
                        ["$87.5\\text{ miles}$", "$91\\text{ miles}$", "$84\\text{ miles}$", "$95.5\\text{ miles}$"],
                        0,
                        "$S_{14} = \\frac{14}{2}[2(3) + (13)(0.5)] = 7[6 + 6.5] = 7(12.5) = 87.5\\text{ miles}$."
                    ),
                    make_q(
                        "A clock chimes the number of hours on the hour (1 chime at 1:00, 2 chimes at 2:00, ..., 12 chimes at 12:00). How many total chimes does it make in a 12-hour period?",
                        ["$78$", "$72$", "$84$", "$66$"],
                        0,
                        "Sum $= \\frac{12(13)}{2} = 6 \\times 13 = 78$."
                    )
                ]
            }
        ]
    },

    # ── 9.02 Geometric Sequences and Series ────────────────────────────────────
    {
        "track": "precalc",
        "num": "9.02",
        "slug": "geometric-sequences-and-series",
        "title": "Geometric Sequences and Series",
        "sections": [
            {
                "heading": "Section 1: General Term of a Geometric Sequence",
                "questions": [
                    make_q(
                        "State the formula for the $n$-th term $a_n$ of a geometric sequence with first term $a_1$ and common ratio $r$.",
                        ["$a_n = a_1 r^{n-1}$", "$a_n = a_1 r^n$", "$a_n = a_1 + (n - 1)r$", "$a_n = \\frac{a_1}{r^{n-1}}$"],
                        0,
                        "In a geometric sequence, each successive term is multiplied by $r$, giving $a_n = a_1 r^{n-1}$."
                    ),
                    make_q(
                        "Find the 6th term of the geometric sequence $3, 6, 12, 24, \\dots$",
                        ["$96$", "$192$", "$48$", "$128$"],
                        0,
                        "$a_1 = 3, r = 2$. $a_6 = 3 \\cdot 2^{6 - 1} = 3 \\cdot 2^5 = 3 \\cdot 32 = 96$."
                    ),
                    make_q(
                        "In a geometric sequence, $a_2 = 12$ and $a_5 = 324$. Find the common ratio $r$.",
                        ["$3$", "$2$", "$4$", "$\\sqrt{3}$"],
                        0,
                        "$\\frac{a_5}{a_2} = r^3 = \\frac{324}{12} = 27 \\Rightarrow r = 3$."
                    )
                ]
            },
            {
                "heading": "Section 2: Finite Geometric Series",
                "questions": [
                    make_q(
                        "State the formula for the sum $S_n$ of the first $n$ terms of a geometric series ($r \\neq 1$).",
                        ["$S_n = \\frac{a_1(1 - r^n)}{1 - r}$", "$S_n = \\frac{a_1}{1 - r}$", "$S_n = \\frac{n}{2}(a_1 + a_n)$", "$S_n = a_1(1 - r^n)$"],
                        0,
                        "The finite sum of a geometric series is $S_n = \\frac{a_1(1 - r^n)}{1 - r}$."
                    ),
                    make_q(
                        "Find the sum of the first 6 terms of the series $4 + 12 + 36 + \\dots$",
                        ["$1456$", "$1458$", "$486$", "$2916$"],
                        0,
                        "$a_1 = 4, r = 3, n = 6$. $S_6 = \\frac{4(1 - 3^6)}{1 - 3} = \\frac{4(1 - 729)}{-2} = -2(-728) = 1456$."
                    ),
                    make_q(
                        "Evaluate $\\sum_{k=1}^5 2(3)^{k-1}$.",
                        ["$242$", "$162$", "$243$", "$486$"],
                        0,
                        "$a_1 = 2, r = 3, n = 5$. $S_5 = \\frac{2(1 - 3^5)}{1 - 3} = \\frac{2(1 - 243)}{-2} = 242$."
                    )
                ]
            },
            {
                "heading": "Section 3: Infinite Geometric Series",
                "questions": [
                    make_q(
                        "Under what condition does an infinite geometric series $\\sum_{n=1}^\\infty a_1 r^{n-1}$ converge?",
                        ["$|r| < 1$", "$r > 1$", "$|r| \\leq 1$", "$r > 0$"],
                        0,
                        "An infinite geometric series converges if and only if the absolute value of the common ratio is strictly less than 1 ($|r| < 1$)."
                    ),
                    make_q(
                        "Find the sum of the infinite series $12 + 4 + \\frac{4}{3} + \\frac{4}{9} + \\dots$",
                        ["$18$", "$16$", "$24$", "$15$"],
                        0,
                        "$a_1 = 12, r = 1/3$. Since $|1/3| < 1$, sum $S = \\frac{a_1}{1 - r} = \\frac{12}{1 - 1/3} = \\frac{12}{2/3} = 18$."
                    ),
                    make_q(
                        "Find the fractional equivalent of the repeating decimal $0.\\overline{45} = 0.454545\\dots$ using an infinite geometric series.",
                        ["$5/11$", "$45/100$", "$9/22$", "$45/90$"],
                        0,
                        "$a_1 = 45/100, r = 1/100$. $S = \\frac{45/100}{1 - 1/100} = \\frac{45/100}{99/100} = \\frac{45}{99} = \\frac{5}{11}$."
                    )
                ]
            },
            {
                "heading": "Section 4: Geometric Word Problems and Annuities",
                "questions": [
                    make_q(
                        "A bouncing ball is dropped from a height of $16\\text{ ft}$. On each bounce, it rebounds to $3/4$ of its previous height. Find the total vertical distance the ball travels before coming to rest.",
                        ["$112\\text{ ft}$", "$64\\text{ ft}$", "$128\\text{ ft}$", "$96\\text{ ft}$"],
                        0,
                        "Initial drop $= 16$. Subsequent up-and-down trips form an infinite series with first term $2(16 \\times 3/4) = 24$ and ratio $3/4$. Total $= 16 + \\frac{24}{1 - 3/4} = 16 + \\frac{24}{1/4} = 16 + 96 = 112\\text{ ft}$."
                    ),
                    make_q(
                        "A company offers a starting salary of $50000$ dollars with a guaranteed $4\\%$ annual raise. What is the salary in the 5th year?",
                        ["$50000(1.04)^4 \\approx 58492.93\\text{ dollars}$", "$60000\\text{ dollars}$", "$58000\\text{ dollars}$", "$50000(1.04)^5$"],
                        0,
                        "5th year salary is $a_5 = a_1 r^4 = 50000(1.04)^4 \\approx 58492.93\\text{ dollars}$."
                    ),
                    make_q(
                        "An ordinary annuity pays $100$ dollars at the end of each year for 10 years at $5\\%$ annual interest. Which expression represents its future value?",
                        ["$100\\left[\\frac{(1.05)^{10} - 1}{0.05}\\right]$", "$100(1.05)^{10}$", "$1000(1.05)$", "$\\frac{100}{0.05}$"],
                        0,
                        "The sum of an annuity is a finite geometric series with formula $FV = P\\left[\\frac{(1 + r)^n - 1}{r}\\right] = 100\\left[\\frac{(1.05)^{10} - 1}{0.05}\\right]$."
                    )
                ]
            }
        ]
    },

    # ── 9.03 The Binomial Theorem ─────────────────────────────────────────────
    {
        "track": "precalc",
        "num": "9.03",
        "slug": "the-binomial-theorem",
        "title": "The Binomial Theorem",
        "sections": [
            {
                "heading": "Section 1: Pascal's Triangle and Combinations",
                "questions": [
                    make_q(
                        "State the formula for the combination $\\binom{n}{r}$.",
                        ["$\\frac{n!}{r!(n - r)!}$", "$\\frac{n!}{(n - r)!}$", "$\\frac{n!}{r!}$", "$n \\times r$"],
                        0,
                        "$\\binom{n}{r} = \\frac{n!}{r!(n - r)!}$ gives the coefficient of the $(r+1)$-th term in $(a + b)^n$."
                    ),
                    make_q(
                        "Evaluate $\\binom{6}{2}$.",
                        ["$15$", "$30$", "$12$", "$20$"],
                        0,
                        "$\\binom{6}{2} = \\frac{6 \\times 5}{2 \\times 1} = 15$."
                    ),
                    make_q(
                        "What is row 4 of Pascal's Triangle (corresponding to $n = 4$)?",
                        ["$1, 4, 6, 4, 1$", "$1, 3, 3, 1$", "$1, 5, 10, 10, 5, 1$", "$1, 4, 8, 4, 1$"],
                        0,
                        "Row 4 is $\\binom{4}{0}=1, \\binom{4}{1}=4, \\binom{4}{2}=6, \\binom{4}{3}=4, \\binom{4}{4}=1$."
                    )
                ]
            },
            {
                "heading": "Section 2: Expanding Binomials",
                "questions": [
                    make_q(
                        "State the Binomial Theorem expansion for $(a + b)^n$.",
                        ["$\\sum_{r=0}^n \\binom{n}{r} a^{n-r} b^r$", "$\\sum_{r=0}^n a^{n-r} b^r$", "$\\sum_{r=1}^n \\binom{n}{r} a^r b^{n-r}$", "$\\sum_{r=0}^n n! a^r b^r$"],
                        0,
                        "The Binomial Theorem states $(a + b)^n = \\sum_{r=0}^n \\binom{n}{r} a^{n-r} b^r$."
                    ),
                    make_q(
                        "Expand $(x + 2)^4$.",
                        ["$x^4 + 8x^3 + 24x^2 + 32x + 16$", "$x^4 + 4x^3 + 6x^2 + 4x + 16$", "$x^4 + 16$", "$x^4 + 8x^3 + 16x^2 + 32x + 16$"],
                        0,
                        "$\\binom{4}{0}x^4 + \\binom{4}{1}x^3(2) + \\binom{4}{2}x^2(4) + \\binom{4}{3}x(8) + \\binom{4}{4}(16) = x^4 + 8x^3 + 24x^2 + 32x + 16$."
                    ),
                    make_q(
                        "Find the first three terms in the expansion of $(2x - 1)^5$ in descending powers of $x$.",
                        ["$32x^5 - 80x^4 + 80x^3$", "$32x^5 - 16x^4 + 8x^3$", "$32x^5 + 80x^4 + 80x^3$", "$32x^5 - 40x^4 + 20x^3$"],
                        0,
                        "Term 1: $\\binom{5}{0}(2x)^5 = 32x^5$. Term 2: $\\binom{5}{1}(2x)^4(-1) = 5(16x^4)(-1) = -80x^4$. Term 3: $\\binom{5}{2}(2x)^3(-1)^2 = 10(8x^3)(1) = 80x^3$."
                    )
                ]
            },
            {
                "heading": "Section 3: Finding Specific Terms",
                "questions": [
                    make_q(
                        "State the formula for the $(r+1)$-th term in the expansion of $(a + b)^n$.",
                        ["$T_{r+1} = \\binom{n}{r} a^{n-r} b^r$", "$T_{r+1} = \\binom{n}{r+1} a^{n-r} b^r$", "$T_{r+1} = \\binom{n}{r} a^r b^{n-r}$", "$T_{r+1} = a^{n-r} b^r$"],
                        0,
                        "The general term is given by $T_{r+1} = \\binom{n}{r} a^{n-r} b^r$ where $r$ indexes from $0$ to $n$."
                    ),
                    make_q(
                        "Find the 4th term in the expansion of $(x + 3)^7$.",
                        ["$945x^4$", "$315x^4$", "$2835x^3$", "$105x^5$"],
                        0,
                        "For the 4th term, $r = 3$. $T_4 = \\binom{7}{3} x^{7-3} (3)^3 = 35 \\cdot x^4 \\cdot 27 = 945x^4$."
                    ),
                    make_q(
                        "Find the coefficient of $x^3$ in the expansion of $(2x - 3)^6$.",
                        ["$-4320$", "$4320$", "$-1440$", "$2160$"],
                        0,
                        "We want $x^3$, so power of $(2x)$ is 3, which means $n - r = 3 \\Rightarrow r = 3$. Term is $\\binom{6}{3}(2x)^3(-3)^3 = 20(8x^3)(-27) = -4320x^3$."
                    )
                ]
            },
            {
                "heading": "Section 4: Term Independent of x and Sum of Coefficients",
                "questions": [
                    make_q(
                        "Find the term independent of $x$ (the constant term) in the expansion of $\\left(x + \\frac{2}{x}\\right)^6$.",
                        ["$160$", "$80$", "$64$", "$20$"],
                        0,
                        "General term: $\\binom{6}{r} x^{6-r} (2x^{-1})^r = \\binom{6}{r} 2^r x^{6 - 2r}$. Set exponent to 0: $6 - 2r = 0 \\Rightarrow r = 3$. Constant term $= \\binom{6}{3} 2^3 = 20 \\times 8 = 160$."
                    ),
                    make_q(
                        "What is the sum of all coefficients in the expansion of $(2x - 3y)^4$?",
                        ["$1$", "$-1$", "$625$", "$81$"],
                        0,
                        "To find the sum of coefficients, substitute $x = 1$ and $y = 1$: $(2(1) - 3(1))^4 = (-1)^4 = 1$."
                    ),
                    make_q(
                        "What is the sum of the elements in row $n$ of Pascal's Triangle (i.e. $\\sum_{r=0}^n \\binom{n}{r}$)?",
                        ["$2^n$", "$n^2$", "$2n$", "$2^{n-1}$"],
                        0,
                        "By the Binomial Theorem with $a = 1, b = 1$: $(1 + 1)^n = 2^n = \\sum_{r=0}^n \\binom{n}{r}$."
                    )
                ]
            }
        ]
    }
]
