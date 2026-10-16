#!/usr/bin/env python3
"""Standardized 4-Page Topic Data for AP Calculus BC Part 3 (Topics 5.01 to 6.02 - 4 Topics).

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

APBC_TOPICS_P3 = [
    # --------------------------------------------------------------------------
    # APBC 5.01: Sequences and Basic Series Convergence Tests
    # --------------------------------------------------------------------------
    {
        "track": "apbc",
        "num": "5.01",
        "slug": "sequences-and-basic-series-convergence-tests",
        "title": "Sequences and Basic Series Convergence Tests",
        "sections": [
            {
                "heading": "Section 1: Limits of Sequences & Monotonicity",
                "questions": [
                    make_q(
                        "Determine the limit of the sequence $a_n = \\frac{4n^2 - 3n}{2n^2 + 5}$.",
                        ["$2$", "$4$", "$\\infty$ (diverges)", "$0$"], 0,
                        "Divide numerator and denominator by $n^2$: $\\lim_{n \\to \\infty} \\frac{4 - 3/n}{2 + 5/n^2} = \\frac{4}{2} = 2$."
                    ),
                    make_q(
                        "Which statement is guaranteed by the Monotone Convergence Theorem for Sequences?",
                        ["Every bounded monotonic sequence converges", "Every alternating sequence converges", "Every bounded sequence is monotonic", "Every convergent sequence is positive"], 0,
                        "The Monotone Convergence Theorem states that if a sequence is bounded and monotonic (either non-decreasing or non-increasing), it must converge."
                    ),
                    make_q(
                        "What is $\\lim_{n \\to \\infty} (1 + \\frac{2}{n})^n$?",
                        ["$e^2$", "$e$", "$1$", "$\\infty$"], 0,
                        "By the standard exponential limit $\\lim_{n \\to \\infty} (1 + \\frac{x}{n})^n = e^x$, with $x = 2$, the limit is $e^2$."
                    )
                ]
            },
            {
                "heading": "Section 2: Geometric Series & n-th Term Divergence Test",
                "questions": [
                    make_q(
                        "Evaluate the sum of the series $\\sum_{n=1}^\\infty 3(\\frac{2}{5})^n$.",
                        ["$2$", "$\\frac{6}{5}$", "$\\frac{15}{2}$", "$\\frac{5}{2}$"], 0,
                        "First term $a = 3(\\frac{2}{5}) = \\frac{6}{5}$, common ratio $r = \\frac{2}{5}$. Sum $= \\frac{a}{1 - r} = \\frac{6/5}{1 - 2/5} = \\frac{6/5}{3/5} = 2$."
                    ),
                    make_q(
                        "If $\\lim_{n \\to \\infty} a_n = \\frac{1}{2}$, what does the $n$-th Term Test conclude about $\\sum_{n=1}^\\infty a_n$?",
                        ["The series diverges", "The series converges to $\\frac{1}{2}$", "The test is inconclusive", "The series is geometric"], 0,
                        "The $n$-th Term Divergence Test states that if $\\lim_{n \\to \\infty} a_n \\neq 0$, the series must diverge."
                    ),
                    make_q(
                        "If $\\lim_{n \\to \\infty} a_n = 0$, what can be concluded about $\\sum a_n$?",
                        ["The test is inconclusive; the series may converge or diverge", "The series converges", "The series diverges", "The sum is zero"], 0,
                        "Having terms approach zero is a necessary condition for convergence, but not sufficient (e.g., the harmonic series $\\sum \\frac{1}{n}$ has terms approaching $0$ but diverges)."
                    )
                ]
            },
            {
                "heading": "Section 3: Integral Test & p-Series",
                "questions": [
                    make_q(
                        "For what values of $p$ does the $p$-series $\\sum_{n=1}^\\infty \\frac{1}{n^p}$ converge?",
                        ["$p > 1$", "$p \\geq 1$", "$p < 1$", "$p > 0$"], 0,
                        "By the $p$-series test, $\\sum \\frac{1}{n^p}$ converges if and only if $p > 1$. For $p \\leq 1$, it diverges."
                    ),
                    make_q(
                        "Which series converges by the Integral Test?",
                        ["$\\sum_{n=2}^\\infty \\frac{1}{n(\\ln n)^2}$", "$\\sum_{n=2}^\\infty \\frac{1}{n\\ln n}$", "$\\sum_{n=1}^\\infty \\frac{1}{\\sqrt{n}}$", "$\\sum_{n=1}^\\infty \\frac{1}{2n + 1}$"], 0,
                        "$\\int_2^\\infty \\frac{1}{x(\\ln x)^2} dx = [-\\frac{1}{\\ln x}]_2^\\infty = \\frac{1}{\\ln 2} < \\infty$. Since the improper integral converges, the series converges."
                    ),
                    make_q(
                        "What three conditions must $f(x)$ satisfy on $[1, \\infty)$ to apply the Integral Test to $\\sum a_n$?",
                        ["$f(x)$ must be continuous, positive, and decreasing", "$f(x)$ must be differentiable, alternating, and bounded", "$f(x)$ must be positive and increasing", "$f(x)$ must be a rational function"], 0,
                        "The hypotheses of the Integral Test require $f(x)$ to be continuous, positive, and decreasing on $[1, \\infty)$ where $f(n) = a_n$."
                    )
                ]
            },
            {
                "heading": "Section 4: Direct Comparison & Limit Comparison Tests",
                "questions": [
                    make_q(
                        "Determine the convergence of $\\sum_{n=1}^\\infty \\frac{1}{n^3 + 5n}$.",
                        ["Converges by Direct Comparison with $\\sum \\frac{1}{n^3}$", "Diverges by Comparison with $\\sum \\frac{1}{n}$", "Diverges by $n$-th term test", "Inconclusive"], 0,
                        "For all $n \\geq 1$: $\\frac{1}{n^3 + 5n} < \\frac{1}{n^3}$. Since $\\sum \\frac{1}{n^3}$ is a convergent $p$-series ($p = 3 > 1$), the given series converges by Direct Comparison."
                    ),
                    make_q(
                        "Which series should be used for the Limit Comparison Test with $\\sum_{n=1}^\\infty \\frac{3n + 2}{2n^3 - 1}$?",
                        ["$\\sum \\frac{1}{n^2}$ (convergent)", "$\\sum \\frac{1}{n}$ (divergent)", "$\\sum \\frac{1}{n^3}$ (convergent)", "$\\sum n$ (divergent)"], 0,
                        "The dominant terms are $\\frac{3n}{2n^3} = \\frac{3}{2n^2}$. Comparing with $b_n = \\frac{1}{n^2}$ yields a positive finite limit $\\frac{3}{2}$, confirming convergence."
                    ),
                    make_q(
                        "In the Limit Comparison Test, if $\\lim_{n \\to \\infty} \\frac{a_n}{b_n} = L$ where $0 < L < \\infty$, what does this mean?",
                        ["Both $\\sum a_n$ and $\\sum b_n$ either both converge or both diverge", "$\\sum a_n$ converges to $L$", "$\\sum a_n$ converges while $\\sum b_n$ diverges", "The test is inconclusive"], 0,
                        "A finite positive limit $L$ ensures that both series share the exact same convergence or divergence behavior."
                    )
                ]
            }
        ]
    },

    # --------------------------------------------------------------------------
    # APBC 5.02: Ratio, Root, and Alternating Series Tests
    # --------------------------------------------------------------------------
    {
        "track": "apbc",
        "num": "5.02",
        "slug": "ratio-root-and-alternating-series-tests",
        "title": "Ratio, Root, and Alternating Series Tests",
        "sections": [
            {
                "heading": "Section 1: The Ratio Test",
                "questions": [
                    make_q(
                        "Evaluate the limit $L = \\lim_{n \\to \\infty} |\\frac{a_{n+1}}{a_n}|$ for the series $\\sum_{n=1}^\\infty \\frac{3^n}{n!}$.",
                        ["$0$ (converges)", "$3$ (diverges)", "$1$ (inconclusive)", "$\\infty$ (diverges)"], 0,
                        "$\\lim_{n \\to \\infty} \\frac{3^{n+1}}{(n+1)!} \\frac{n!}{3^n} = \\lim_{n \\to \\infty} \\frac{3}{n+1} = 0 < 1$. By the Ratio Test, the series converges."
                    ),
                    make_q(
                        "When is the Ratio Test inconclusive?",
                        ["When $L = 1$", "When $L < 1$", "When $L > 1$", "When $L = 0$"], 0,
                        "The Ratio Test is inconclusive whenever the limit $L = \\lim_{n \\to \\infty} |\\frac{a_{n+1}}{a_n}| = 1$, requiring another test (such as comparison or integral test)."
                    ),
                    make_q(
                        "Determine the convergence of $\\sum_{n=1}^\\infty \\frac{n!}{2^n}$.",
                        ["Diverges because $L = \\infty > 1$", "Converges because $L = 0 < 1$", "Inconclusive ($L = 1$)", "Converges by Alternating Series Test"], 0,
                        "$\\lim_{n \\to \\infty} \\frac{(n+1)!}{2^{n+1}} \\frac{2^n}{n!} = \\lim_{n \\to \\infty} \\frac{n+1}{2} = \\infty > 1$. The series diverges."
                    )
                ]
            },
            {
                "heading": "Section 2: The Alternating Series Test",
                "questions": [
                    make_q(
                        "What two conditions must an alternating series $\\sum (-1)^{n-1} b_n$ with $b_n > 0$ satisfy to converge by the AST?",
                        ["$b_{n+1} \\leq b_n$ for all $n$, and $\\lim_{n \\to \\infty} b_n = 0$", "$b_n$ is increasing, and $\\lim_{n \\to \\infty} b_n = 1$", "$\\lim_{n \\to \\infty} b_n = 0$ only", "The Ratio Test limit must be $< 1$"], 0,
                        "By the Alternating Series Test (Leibniz's rule), the terms must be non-increasing in magnitude ($b_{n+1} \\leq b_n$) and must approach zero ($\\lim_{n \\to \\infty} b_n = 0$)."
                    ),
                    make_q(
                        "Does the alternating harmonic series $\\sum_{n=1}^\\infty \\frac{(-1)^{n-1}}{n}$ converge or diverge?",
                        ["Converges conditionally", "Converges absolutely", "Diverges", "Oscillates without limit"], 0,
                        "It converges by the AST ($1/n$ decreases to $0$), but $\\sum |a_n| = \\sum \\frac{1}{n}$ diverges (harmonic series). Thus, it converges conditionally."
                    ),
                    make_q(
                        "Determine the convergence of $\\sum_{n=1}^\\infty \\frac{(-1)^n}{\\sqrt{n}}$.",
                        ["Converges conditionally", "Converges absolutely", "Diverges", "Inconclusive"], 0,
                        "Terms decrease to $0$, so it converges by the AST. The absolute series $\\sum n^{-1/2}$ is a divergent $p$-series ($p = 0.5 \\leq 1$). Hence conditional convergence."
                    )
                ]
            },
            {
                "heading": "Section 3: Absolute vs. Conditional Convergence",
                "questions": [
                    make_q(
                        "A series $\\sum a_n$ is said to converge absolutely if which condition holds?",
                        ["$\\sum |a_n|$ converges", "$\\sum a_n$ converges but $\\sum |a_n|$ diverges", "$\\lim_{n \\to \\infty} a_n = 0$", "All terms are positive"], 0,
                        "Absolute convergence is defined by the convergence of the series of absolute values: $\\sum |a_n|$ converges."
                    ),
                    make_q(
                        "Which of the following series converges absolutely?",
                        ["$\\sum_{n=1}^\\infty \\frac{(-1)^n}{n^2}$", "$\\sum_{n=1}^\\infty \\frac{(-1)^n}{n}$", "$\\sum_{n=1}^\\infty \\frac{(-1)^n}{\\sqrt{n}}$", "$\\sum_{n=1}^\\infty (-1)^n$"], 0,
                        "The absolute series is $\\sum \\frac{1}{n^2}$, which is a convergent $p$-series ($p = 2 > 1$). Therefore, it converges absolutely."
                    ),
                    make_q(
                        "If a series converges absolutely, MUST it also converge in its original form?",
                        ["Yes, absolute convergence implies convergence", "No, it may oscillate", "Only if it is alternating", "Only for geometric series"], 0,
                        "A fundamental theorem of analysis guarantees that every absolutely convergent series is convergent: $|\\sum a_n| \\leq \\sum |a_n|$."
                    )
                ]
            },
            {
                "heading": "Section 4: Alternating Series Error Bound",
                "questions": [
                    make_q(
                        "For a convergent alternating series $\\sum (-1)^{n-1} b_n$, what is the upper bound for the error $|R_n| = |S - S_n|$?",
                        ["$|R_n| \\leq b_{n+1}$", "$|R_n| \\leq b_n$", "$|R_n| \\leq \\frac{b_{n+1}}{2}$", "$|R_n| \\leq \\frac{b_n}{n}$"], 0,
                        "The Alternating Series Estimation Theorem states that the truncation error $|S - S_n|$ is bounded by the magnitude of the first omitted term: $b_{n+1}$."
                    ),
                    make_q(
                        "If the sum of $\\sum_{n=1}^\\infty \\frac{(-1)^{n-1}}{n^3}$ is approximated by its first $4$ terms, what is the maximum possible error?",
                        ["$\\frac{1}{125}$", "$\\frac{1}{64}$", "$\\frac{1}{216}$", "$\\frac{1}{25}$"], 0,
                        "The first omitted term is the 5th term: $b_5 = \\frac{1}{5^3} = \\frac{1}{125} = 0.008$."
                    ),
                    make_q(
                        "How many terms of the alternating series $\\sum_{n=1}^\\infty \\frac{(-1)^{n-1}}{n}$ are needed to guarantee an error of less than $0.01$?",
                        ["$100$ terms", "$99$ terms", "$10$ terms", "$50$ terms"], 0,
                        "We require $b_{n+1} = \\frac{1}{n+1} < 0.01 = \\frac{1}{100} \\Rightarrow n + 1 > 100 \\Rightarrow n \\geq 100$ terms."
                    )
                ]
            }
        ]
    },

    # --------------------------------------------------------------------------
    # APBC 6.01: Power Series and Interval of Convergence
    # --------------------------------------------------------------------------
    {
        "track": "apbc",
        "num": "6.01",
        "slug": "power-series-and-interval-of-convergence",
        "title": "Power Series and Interval of Convergence",
        "sections": [
            {
                "heading": "Section 1: Finding the Radius of Convergence",
                "questions": [
                    make_q(
                        "Find the radius of convergence $R$ for the power series $\\sum_{n=0}^\\infty \\frac{(x - 3)^n}{4^n}$.",
                        ["$R = 4$", "$R = 1$", "$R = 3$", "$R = \\infty$"], 0,
                        "Ratio test: $\\lim_{n \\to \\infty} |\\frac{(x - 3)^{n+1}}{4^{n+1}} \\frac{4^n}{(x - 3)^n}| = \\frac{|x - 3|}{4} < 1 \\Rightarrow |x - 3| < 4$. The radius is $R = 4$."
                    ),
                    make_q(
                        "What is the radius of convergence of $\\sum_{n=0}^\\infty \\frac{x^n}{n!}$?",
                        ["$R = \\infty$", "$R = 1$", "$R = 0$", "$R = e$"], 0,
                        "Ratio test: $\\lim_{n \\to \\infty} |\\frac{x^{n+1}}{(n+1)!} \\frac{n!}{x^n}| = \\lim_{n \\to \\infty} \\frac{|x|}{n+1} = 0 < 1$ for all real $x$. Radius $R = \\infty$."
                    ),
                    make_q(
                        "Find the radius of convergence of $\\sum_{n=1}^\\infty n! x^n$.",
                        ["$R = 0$ (converges only at $x = 0$)", "$R = 1$", "$R = \\infty$", "$R = \\frac{1}{e}$"], 0,
                        "Ratio test: $\\lim_{n \\to \\infty} (n+1)|x| = \\infty$ for any $x \\neq 0$. The series converges only at its center $x = 0$, so $R = 0$."
                    )
                ]
            },
            {
                "heading": "Section 2: Testing Interval Endpoints",
                "questions": [
                    make_q(
                        "Find the complete interval of convergence for $\\sum_{n=1}^\\infty \\frac{(x - 2)^n}{n}$.",
                        ["$[1, 3)$", "$(1, 3)$", "$[1, 3]$", "$(1, 3]$"], 0,
                        "Ratio test gives radius $R = 1$, open interval $(1, 3)$. At left endpoint $x = 1$: $\\sum \\frac{(-1)^n}{n}$ converges by AST. At right endpoint $x = 3$: $\\sum \\frac{1}{n}$ diverges (harmonic). Interval is $[1, 3)$."
                    ),
                    make_q(
                        "What is the interval of convergence of $\\sum_{n=1}^\\infty \\frac{x^n}{n^2}$?",
                        ["$[-1, 1]$", "$(-1, 1)$", "$[-1, 1)$", "$(-1, 1]$"], 0,
                        "Radius $R = 1$. At $x = 1$, $\\sum \\frac{1}{n^2}$ converges ($p = 2$). At $x = -1$, $\\sum \\frac{(-1)^n}{n^2}$ converges absolutely. Both endpoints are included: $[-1, 1]$."
                    ),
                    make_q(
                        "Why must endpoints always be tested individually when finding the interval of convergence?",
                        ["The Ratio Test yields $L = 1$ at the boundary points $|x - c| = R$ and is inconclusive", "Endpoints always diverge", "Endpoints always converge", "To find the center of the series"], 0,
                        "Because the Ratio Test limit equals $1$ at $x = c \\pm R$, it yields no information at endpoints, necessitating individual convergence tests."
                    )
                ]
            },
            {
                "heading": "Section 3: Term-by-Term Differentiation of Power Series",
                "questions": [
                    make_q(
                        "If $f(x) = \\sum_{n=0}^\\infty c_n x^n$ has radius of convergence $R$, what is the radius of convergence of its derivative $f'(x) = \\sum_{n=1}^\\infty n c_n x^{n-1}$?",
                        ["$R$ (the radius is unchanged)", "$R - 1$", "$\\frac{R}{2}$", "$\\infty$"], 0,
                        "A fundamental property of power series is that term-by-term differentiation and integration preserve the exact same radius of convergence $R$."
                    ),
                    make_q(
                        "Starting from $\\frac{1}{1 - x} = \\sum_{n=0}^\\infty x^n$, find a power series representation for $\\frac{1}{(1 - x)^2}$.",
                        ["$\\sum_{n=1}^\\infty n x^{n-1}$", "$\\sum_{n=0}^\\infty x^{2n}$", "$\\sum_{n=0}^\\infty \\frac{x^{n+1}}{n+1}$", "$\\sum_{n=1}^\\infty n^2 x^n$"], 0,
                        "Differentiate both sides: $\\frac{d}{dx}[\\frac{1}{1 - x}] = \\frac{1}{(1 - x)^2}$. Differentiating the series term-by-term gives $\\sum_{n=1}^\\infty n x^{n-1}$."
                    ),
                    make_q(
                        "Can endpoint convergence change when a power series is differentiated term-by-term?",
                        ["Yes, differentiation can lose convergence at an endpoint", "No, endpoints never change", "Differentiation always adds endpoints", "Only if $R = \\infty$"], 0,
                        "While the radius $R$ remains identical, differentiation may cause a previously convergent endpoint to become divergent."
                    )
                ]
            },
            {
                "heading": "Section 4: Term-by-Term Integration of Power Series",
                "questions": [
                    make_q(
                        "Integrating $\\frac{1}{1 + x} = \\sum_{n=0}^\\infty (-1)^n x^n$ term-by-term yields the Maclaurin series for which function?",
                        ["$\\ln(1 + x)$", "$\\arctan x$", "$e^{-x}$", "$\\frac{1}{(1 + x)^2}$"], 0,
                        "$\\int_0^x \\frac{1}{1 + t} dt = \\ln(1 + x) = \\sum_{n=0}^\\infty (-1)^n \\frac{x^{n+1}}{n+1} = x - \\frac{x^2}{2} + \\frac{x^3}{3} - \\dots$"
                    ),
                    make_q(
                        "Integrating $\\frac{1}{1 + x^2} = \\sum_{n=0}^\\infty (-1)^n x^{2n}$ term-by-term yields the Maclaurin series for:",
                        ["$\\arctan x$", "$\\ln(1 + x^2)$", "$\\arcsin x$", "$\\cos x$"], 0,
                        "$\\int_0^x \\frac{1}{1 + t^2} dt = \\arctan x = \\sum_{n=0}^\\infty (-1)^n \\frac{x^{2n+1}}{2n+1} = x - \\frac{x^3}{3} + \\frac{x^5}{5} - \\dots$"
                    ),
                    make_q(
                        "Evaluate $\\int_0^{0.1} \\frac{1}{1 + x^4} dx$ using the first two non-zero terms of its power series.",
                        ["$0.1 - \\frac{0.1^5}{5}$", "$0.1 + \\frac{0.1^5}{5}$", "$0.1 - 0.1^4$", "$0.1$"], 0,
                        "Series: $1 - x^4 + x^8 - \\dots$ Integrating gives $[x - \\frac{x^5}{5}]_0^{0.1} = 0.1 - \\frac{(0.1)^5}{5} = 0.1 - 0.000002$."
                    )
                ]
            }
        ]
    },

    # --------------------------------------------------------------------------
    # APBC 6.02: Taylor and Maclaurin Series
    # --------------------------------------------------------------------------
    {
        "track": "apbc",
        "num": "6.02",
        "slug": "taylor-and-maclaurin-series",
        "title": "Taylor and Maclaurin Series",
        "sections": [
            {
                "heading": "Section 1: Common Maclaurin Series ($e^x, \\sin x, \\cos x$)",
                "questions": [
                    make_q(
                        "What is the general term in the Maclaurin series for $\\sin x$?",
                        ["$\\frac{(-1)^n x^{2n+1}}{(2n+1)!}$", "$\\frac{(-1)^n x^{2n}}{(2n)!}$", "$\\frac{x^n}{n!}$", "$\\frac{x^{2n+1}}{(2n+1)!}$"], 0,
                        "The Maclaurin expansion for $\\sin x$ contains only odd powers with alternating signs: $\\sum_{n=0}^\\infty \\frac{(-1)^n x^{2n+1}}{(2n+1)!} = x - \\frac{x^3}{3!} + \\frac{x^5}{5!} - \\dots$"
                    ),
                    make_q(
                        "What is the coefficient of $x^4$ in the Maclaurin series for $e^{-2x}$?",
                        ["$\\frac{2}{3}$", "$\\frac{16}{24} = \\frac{2}{3}$", "$-\\frac{2}{3}$", "$\\frac{16}{4}$"], 0,
                        "General term for $e^u$ is $\\frac{u^n}{n!}$. For $u = -2x$ and $n = 4$: $\\frac{(-2x)^4}{4!} = \\frac{16x^4}{24} = \\frac{2}{3} x^4$."
                    ),
                    make_q(
                        "Which series equals $\\sum_{n=0}^\\infty \\frac{(-1)^n \\pi^{2n}}{(2n)!}$?",
                        ["$\\cos(\\pi) = -1$", "$\\sin(\\pi) = 0$", "$e^\\pi$", "$1$"], 0,
                        "This is the Maclaurin series for $\\cos x$ evaluated at $x = \\pi$, which is $\\cos(\\pi) = -1$."
                    )
                ]
            },
            {
                "heading": "Section 2: Constructing Taylor Polynomials from Derivatives",
                "questions": [
                    make_q(
                        "Which formula gives the $n$-th degree Taylor polynomial $T_n(x)$ centered at $x = c$?",
                        ["$\\sum_{k=0}^n \\frac{f^{(k)}(c)}{k!} (x - c)^k$", "$\\sum_{k=0}^n f^{(k)}(c) (x - c)^k$", "$\\sum_{k=0}^n \\frac{f(c)}{k!} (x - c)^k$", "$\\frac{f^{(n)}(c)}{n!} (x - c)^n$"], 0,
                        "By definition, the $n$-th degree Taylor polynomial is $T_n(x) = f(c) + f'(c)(x - c) + \\frac{f''(c)}{2!}(x - c)^2 + \\dots + \\frac{f^{(n)}(c)}{n!}(x - c)^n$."
                    ),
                    make_q(
                        "Find the 2nd degree Taylor polynomial for $f(x) = \\sqrt{x}$ centered at $c = 4$.",
                        ["$2 + \\frac{1}{4}(x - 4) - \\frac{1}{64}(x - 4)^2$", "$2 + \\frac{1}{4}(x - 4) + \\frac{1}{32}(x - 4)^2$", "$2 + \\frac{1}{2}(x - 4) - \\frac{1}{8}(x - 4)^2$", "$2 + \\frac{1}{4}(x - 4)$"], 0,
                        "$f(4) = 2$. $f'(x) = \\frac{1}{2\\sqrt{x}} \\Rightarrow f'(4) = \\frac{1}{4}$. $f''(x) = -\\frac{1}{4} x^{-3/2} \\Rightarrow f''(4) = -\\frac{1}{32}$. Coefficient $= \\frac{-1/32}{2!} = -\\frac{1}{64}$. $T_2(x) = 2 + \\frac{1}{4}(x - 4) - \\frac{1}{64}(x - 4)^2$."
                    ),
                    make_q(
                        "If a function $f$ has $f(2) = 5, f'(2) = -3, f''(2) = 8$, what is $T_2(2.1)$?",
                        ["$4.74$", "$4.70$", "$4.82$", "$5.04$"], 0,
                        "$T_2(x) = 5 - 3(x - 2) + \\frac{8}{2}(x - 2)^2 = 5 - 3(x - 2) + 4(x - 2)^2$. At $x = 2.1$: $5 - 3(0.1) + 4(0.01) = 5 - 0.3 + 0.04 = 4.74$."
                    )
                ]
            },
            {
                "heading": "Section 3: Manipulating Known Taylor Series",
                "questions": [
                    make_q(
                        "What is the first non-zero term of the Maclaurin series for $f(x) = x^2 \\cos(3x)$?",
                        ["$x^2$", "$3x^2$", "$-x^2$", "$\\frac{9x^4}{2}$"], 0,
                        "$\\cos(3x) = 1 - \\frac{(3x)^2}{2!} + \\dots = 1 - \\frac{9x^2}{2} + \\dots$ Multiplying by $x^2$: $x^2 - \\frac{9x^4}{2} + \\dots$ First term is $x^2$."
                    ),
                    make_q(
                        "Find the Maclaurin series for $\\frac{\\sin x - x}{x^3}$.",
                        ["$-\\frac{1}{6} + \\frac{x^2}{120} - \\dots$", "$\\frac{1}{6} - \\frac{x^2}{120} + \\dots$", "$1 - \\frac{x^2}{6} + \\dots$", "$-\\frac{x^3}{6} + \\dots$"], 0,
                        "$\\sin x = x - \\frac{x^3}{6} + \\frac{x^5}{120} - \\dots \\Rightarrow \\sin x - x = -\\frac{x^3}{6} + \\frac{x^5}{120} - \\dots$ Dividing by $x^3$ yields $-\\frac{1}{6} + \\frac{x^2}{120} - \\dots$"
                    ),
                    make_q(
                        "Evaluate $\\lim_{x \\to 0} \\frac{\\cos x - 1 + \\frac{x^2}{2}}{x^4}$.",
                        ["$\\frac{1}{24}$", "$-\\frac{1}{24}$", "$0$", "$\\frac{1}{12}$"], 0,
                        "$\\cos x = 1 - \\frac{x^2}{2!} + \\frac{x^4}{4!} - \\dots \\Rightarrow \\cos x - 1 + \\frac{x^2}{2} = \\frac{x^4}{24} - \\dots$ Dividing by $x^4$ gives $\\frac{1}{24}$."
                    )
                ]
            },
            {
                "heading": "Section 4: Lagrange Error Bound (Taylor's Remainder Theorem)",
                "questions": [
                    make_q(
                        "What is the Lagrange Error Bound formula for $|R_n(x)| = |f(x) - P_n(x)|$ centered at $c$?",
                        ["$|R_n(x)| \\leq \\frac{M}{(n+1)!} |x - c|^{n+1}$, where $M = \\max |f^{(n+1)}(t)|$", "$|R_n(x)| \\leq \\frac{M}{n!} |x - c|^n$", "$|R_n(x)| \\leq |f^{(n+1)}(c)|$", "$|R_n(x)| \\leq \\frac{1}{(n+1)!}$"], 0,
                        "Taylor's Remainder Theorem states $|R_n(x)| \\leq \\frac{M}{(n+1)!} |x - c|^{n+1}$ where $M$ is the maximum value of $|f^{(n+1)}(t)|$ on the interval between $c$ and $x$."
                    ),
                    make_q(
                        "If $P_3(x)$ approximates $\\sin x$ at $x = 0.5$ centered at $0$, what is the Lagrange Error Bound using $M = 1$?",
                        ["$\\frac{(0.5)^4}{24} = \\frac{1}{384}$", "$\\frac{(0.5)^3}{6}$", "$\\frac{1}{24}$", "$\\frac{(0.5)^4}{120}$"], 0,
                        "For $n = 3$, $n + 1 = 4$. $M = \\max |\\sin^{(4)}(t)| = \\max |\\sin t| \\leq 1$. Bound $= \\frac{1}{4!} (0.5)^4 = \\frac{0.0625}{24} = \\frac{1}{384} \\approx 0.0026$."
                    ),
                    make_q(
                        "On an AP free-response question, which derivative is bounded to establish the Lagrange error bound for a 4th-degree Taylor polynomial?",
                        ["The 5th derivative $f^{(5)}(x)$", "The 4th derivative $f^{(4)}(x)$", "The 1st derivative $f'(x)$", "The 6th derivative $f^{(6)}(x)$"], 0,
                        "For an $n$-th degree Taylor polynomial, the remainder formula uses the $(n + 1)$-th derivative. For $n = 4$, this is the 5th derivative."
                    )
                ]
            }
        ]
    }
]
