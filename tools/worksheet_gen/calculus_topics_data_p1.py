"""Calculus Topics Data Part 1: Topics 1.01 to 6.02 (10 Topics).

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

CALCULUS_TOPICS_P1 = [
    # ── 1.01 Precalculus Review for Calculus ──────────────────────────────────
    {
        "track": "calculus",
        "num": "1.01",
        "slug": "precalculus-review-for-calculus",
        "title": "Precalculus Review for Calculus",
        "sections": [
            {
                "heading": "Section 1: Functions, Domain, and Composition",
                "questions": [
                    make_q(
                        "Given $f(x) = \\sqrt{x - 3}$ and $g(x) = x^2 - 1$, find the domain of $(f \\circ g)(x)$.",
                        ["$(-\\infty, -2] \\cup [2, \\infty)$", "$[2, \\infty)$", "$[3, \\infty)$", "$[-2, 2]$"],
                        0,
                        "$(f \\circ g)(x) = \\sqrt{g(x) - 3} = \\sqrt{x^2 - 4}$. For real output, $x^2 - 4 \\geq 0 \\Rightarrow |x| \\geq 2$, so $x \\in (-\\infty, -2] \\cup [2, \\infty)$."
                    ),
                    make_q(
                        "If $f(x) = \\frac{2x + 1}{x - 3}$, what is $f^{-1}(x)$?",
                        ["$f^{-1}(x) = \\frac{3x + 1}{x - 2}$", "$f^{-1}(x) = \\frac{x - 3}{2x + 1}$", "$f^{-1}(x) = \\frac{3x - 1}{x + 2}$", "$f^{-1}(x) = \\frac{2x - 1}{x + 3}$"],
                        0,
                        "$y = \\frac{2x + 1}{x - 3} \\Rightarrow yx - 3y = 2x + 1 \\Rightarrow x(y - 2) = 3y + 1 \\Rightarrow x = \\frac{3y + 1}{y - 2}$. Thus $f^{-1}(x) = \\frac{3x + 1}{x - 2}$."
                    ),
                    make_q(
                        "Simplify the difference quotient $\\frac{f(x+h) - f(x)}{h}$ for $f(x) = 3x^2 - 5x$.",
                        ["$6x + 3h - 5$", "$6x - 5$", "$3x + 3h - 5$", "$6x + h - 5$"],
                        0,
                        "$\\frac{3(x+h)^2 - 5(x+h) - (3x^2 - 5x)}{h} = \\frac{6xh + 3h^2 - 5h}{h} = 6x + 3h - 5$."
                    )
                ]
            },
            {
                "heading": "Section 2: Exponentials, Logarithms, and Trig Review",
                "questions": [
                    make_q(
                        "Solve the equation $4^{x+1} = 8^{2x-1}$ for $x$.",
                        ["$5/4$", "$1$", "$3/2$", "$2/3$"],
                        0,
                        "Write in base 2: $2^{2(x+1)} = 2^{3(2x-1)} \\Rightarrow 2x + 2 = 6x - 3 \\Rightarrow 4x = 5 \\Rightarrow x = 5/4$."
                    ),
                    make_q(
                        "Solve $\\ln(2x - 1) + \\ln(x) = \\ln(3)$.",
                        ["$x = 3/2$", "$x = 1$", "$x = 2$", "$x = 3$"],
                        0,
                        "$\\ln(2x^2 - x) = \\ln(3) \\Rightarrow 2x^2 - x - 3 = 0 \\Rightarrow (2x - 3)(x + 1) = 0$. Since $x > 1/2$, the only valid solution is $x = 3/2$."
                    ),
                    make_q(
                        "Find the exact value of $\\sin\\left(\\frac{7\\pi}{6}\\right) + \\cos\\left(\\frac{4\\pi}{3}\\right)$.",
                        ["$-1$", "$-1/2$", "$0$", "$-\\sqrt{3}$"],
                        0,
                        "$\\sin(7\\pi/6) = -1/2$ and $\\cos(4\\pi/3) = -1/2$. Sum $= -1/2 + (-1/2) = -1$."
                    )
                ]
            },
            {
                "heading": "Section 3: Rational Functions, Holes, and Asymptotes",
                "questions": [
                    make_q(
                        "Identify the vertical and horizontal asymptotes of $f(x) = \\frac{3x^2 - 12}{x^2 - 5x + 6}$.",
                        ["Vertical: $x = 3$; Horizontal: $y = 3$", "Vertical: $x = 2, x = 3$; Horizontal: $y = 3$", "Vertical: $x = 3$; Horizontal: $y = 0$", "Vertical: $x = 2$; Horizontal: $y = 1$"],
                        0,
                        "Factor: $\\frac{3(x-2)(x+2)}{(x-2)(x-3)} = \\frac{3(x+2)}{x-3}$ for $x \\neq 2$. Removable hole at $x = 2$, vertical asymptote at $x = 3$. As $x \\to \\infty$, $y \\to 3$."
                    ),
                    make_q(
                        "Determine the slant asymptote of $g(x) = \\frac{2x^2 + 5x - 1}{x + 1}$.",
                        ["$y = 2x + 3$", "$y = 2x + 5$", "$y = 2x - 1$", "$y = x + 3$"],
                        0,
                        "Polynomial long division: $\\frac{2x^2 + 5x - 1}{x + 1} = 2x + 3 - \\frac{4}{x + 1}$. Slant asymptote is $y = 2x + 3$."
                    ),
                    make_q(
                        "Find the domain of $h(x) = \\frac{\\ln(x + 2)}{\\sqrt{9 - x^2}}$.",
                        ["$(-2, 3)$", "$[-2, 3]$", "$(-3, 3)$", "$(0, 3)$"],
                        0,
                        "$x + 2 > 0 \\Rightarrow x > -2$. $9 - x^2 > 0 \\Rightarrow -3 < x < 3$. Intersection gives $x \\in (-2, 3)$."
                    )
                ]
            },
            {
                "heading": "Section 4: Trigonometric Identities and Equations",
                "questions": [
                    make_q(
                        "Simplify $\\frac{\\sin(2\\theta)}{1 + \\cos(2\\theta)}$ into a single trigonometric function.",
                        ["$\\tan\\theta$", "$\\cot\\theta$", "$\\sec\\theta$", "$\\sin\\theta$"],
                        0,
                        "$\\frac{2\\sin\\theta\\cos\\theta}{1 + (2\\cos^2\\theta - 1)} = \\frac{2\\sin\\theta\\cos\\theta}{2\\cos^2\\theta} = \\frac{\\sin\\theta}{\\cos\\theta} = \\tan\\theta$."
                    ),
                    make_q(
                        "Solve $2\\cos^2 x + \\cos x - 1 = 0$ on the interval $[0, 2\\pi)$.",
                        ["$\\pi/3, \\pi, 5\\pi/3$", "$\\pi/6, \\pi, 11\\pi/6$", "$\\pi/3, 2\\pi/3$", "$\\pi/2, 3\\pi/2$"],
                        0,
                        "$(2\\cos x - 1)(\\cos x + 1) = 0 \\Rightarrow \\cos x = 1/2$ or $\\cos x = -1$. On $[0, 2\\pi)$, $x = \\pi/3, 5\\pi/3$, or $\\pi$."
                    ),
                    make_q(
                        "If $\\sin\\alpha = 3/5$ with $\\alpha \\in (\\pi/2, \\pi)$, find $\\cos(2\\alpha)$.",
                        ["$7/25$", "$-7/25$", "$24/25$", "$-24/25$"],
                        0,
                        "$\\cos(2\\alpha) = 1 - 2\\sin^2\\alpha = 1 - 2(3/5)^2 = 1 - 2(9/25) = 1 - 18/25 = 7/25$."
                    )
                ]
            }
        ]
    },

    # ── 2.01 Evaluating Limits ────────────────────────────────────────────────
    {
        "track": "calculus",
        "num": "2.01",
        "slug": "evaluating-limits",
        "title": "Evaluating Limits",
        "sections": [
            {
                "heading": "Section 1: Direct Substitution and Algebraic Techniques",
                "questions": [
                    make_q(
                        "Evaluate $\\lim_{x \\to 3} \\frac{x^2 - 9}{x^2 - 2x - 3}$.",
                        ["$3/2$", "$0$", "$1$", "Does not exist"],
                        0,
                        "Indeterminate $0/0$. Factor: $\\frac{(x-3)(x+3)}{(x-3)(x+1)} = \\frac{x+3}{x+1}$. Substitute $x = 3$: $\\frac{3+3}{3+1} = \\frac{6}{4} = \\frac{3}{2}$."
                    ),
                    make_q(
                        "Evaluate $\\lim_{x \\to 0} \\frac{\\sqrt{x + 4} - 2}{x}$.",
                        ["$1/4$", "$1/2$", "$0$", "$1/8$"],
                        0,
                        "Multiply numerator and denominator by conjugate $(\\sqrt{x+4}+2)$: $\\frac{(x+4)-4}{x(\\sqrt{x+4}+2)} = \\frac{1}{\\sqrt{x+4}+2}$. At $x=0$, $\\frac{1}{2+2} = \\frac{1}{4}$."
                    ),
                    make_q(
                        "Evaluate $\\lim_{x \\to 1} \\frac{\\frac{1}{x+1} - \\frac{1}{2}}{x - 1}$.",
                        ["$-1/4$", "$1/4$", "$-1/2$", "$0$"],
                        0,
                        "Combine fractions: $\\frac{2 - (x+1)}{2(x+1)(x-1)} = \\frac{1-x}{2(x+1)(x-1)} = \\frac{-1}{2(x+1)}$. At $x = 1$, $\\frac{-1}{2(2)} = -\\frac{1}{4}$."
                    )
                ]
            },
            {
                "heading": "Section 2: Trigonometric Limits and the Squeeze Theorem",
                "questions": [
                    make_q(
                        "Evaluate $\\lim_{x \\to 0} \\frac{\\sin(5x)}{3x}$.",
                        ["$5/3$", "$3/5$", "$1$", "$0$"],
                        0,
                        "Rewrite as $\\frac{5}{3} \\cdot \\frac{\\sin(5x)}{5x}$. Since $\\lim_{u \\to 0} \\frac{\\sin u}{u} = 1$, the limit is $5/3$."
                    ),
                    make_q(
                        "Evaluate $\\lim_{x \\to 0} \\frac{1 - \\cos(x)}{x^2}$.",
                        ["$1/2$", "$0$", "$1$", "Does not exist"],
                        0,
                        "Multiply by $(1+\\cos x)/(1+\\cos x)$: $\\frac{\\sin^2 x}{x^2(1+\\cos x)} = \\left(\\frac{\\sin x}{x}\\right)^2 \\frac{1}{1+\\cos x} \\to 1^2 \\cdot \\frac{1}{2} = \\frac{1}{2}$."
                    ),
                    make_q(
                        "If $1 - \\frac{x^2}{6} \\leq g(x) \\leq 1$ for all $x$ near 0, find $\\lim_{x \\to 0} g(x)$.",
                        ["$1$", "$0$", "$5/6$", "Cannot be determined"],
                        0,
                        "Since $\\lim_{x \\to 0} (1 - x^2/6) = 1$ and $\\lim_{x \\to 0} 1 = 1$, by the Squeeze Theorem, $\\lim_{x \\to 0} g(x) = 1$."
                    )
                ]
            },
            {
                "heading": "Section 3: Infinite Limits and Limits at Infinity",
                "questions": [
                    make_q(
                        "Evaluate $\\lim_{x \\to \\infty} \\frac{4x^3 - 2x + 7}{5x^3 + 3x^2 - 1}$.",
                        ["$4/5$", "$0$", "$\\infty$", "$7/(-1)$"],
                        0,
                        "Divide numerator and denominator by $x^3$: $\\frac{4 - 2/x^2 + 7/x^3}{5 + 3/x - 1/x^3} \\to \\frac{4}{5}$ as $x \\to \\infty$."
                    ),
                    make_q(
                        "Evaluate $\\lim_{x \\to -\\infty} \\frac{\\sqrt{9x^2 + 4}}{2x - 1}$.",
                        ["$-3/2$", "$3/2$", "$9/2$", "$-9/2$"],
                        0,
                        "For $x < 0$, $\\sqrt{x^2} = |x| = -x$. Thus $\\sqrt{9x^2+4} = -x\\sqrt{9 + 4/x^2}$. Ratio becomes $\\frac{-x\\sqrt{9}}{2x} = -\\frac{3}{2}$."
                    ),
                    make_q(
                        "Find $\\lim_{x \\to 2^+} \\frac{3x - 1}{x - 2}$ and $\\lim_{x \\to 2^-} \\frac{3x - 1}{x - 2}$.",
                        ["$+\\infty$ and $-\\infty$", "$+\\infty$ and $+\\infty$", "$-\\infty$ and $+\\infty$", "$5$ and $5$"],
                        0,
                        "Numerator approaches $3(2)-1 = 5 > 0$. As $x \\to 2^+$, $x - 2 \\to 0^+$, so ratio $\\to +\\infty$. As $x \\to 2^-$, $x - 2 \\to 0^-$, so ratio $\\to -\\infty$."
                    )
                ]
            },
            {
                "heading": "Section 4: Piecewise and One-Sided Limits",
                "questions": [
                    make_q(
                        "Let $f(x)$ be defined as $x^2 + 2$ for $x < 1$ and $4 - x$ for $x \\geq 1$. Evaluate $\\lim_{x \\to 1} f(x)$.",
                        ["$3$", "$1$", "$2$", "Does not exist"],
                        0,
                        "Left limit: $\\lim_{x \\to 1^-} (x^2 + 2) = 3$. Right limit: $\\lim_{x \\to 1^+} (4 - x) = 3$. Since both equal 3, the two-sided limit is 3."
                    ),
                    make_q(
                        "Evaluate $\\lim_{x \\to 0^+} \\frac{|x|}{x}$ and $\\lim_{x \\to 0^-} \\frac{|x|}{x}$.",
                        ["$1$ and $-1$", "$1$ and $1$", "$-1$ and $-1$", "$0$ and $0$"],
                        0,
                        "For $x > 0$, $|x| = x$, so $x/x = 1$. For $x < 0$, $|x| = -x$, so $-x/x = -1$."
                    ),
                    make_q(
                        "Find the value of $k$ such that $\\lim_{x \\to 2} g(x)$ exists, where $g(x)$ is $kx - 3$ for $x \\leq 2$ and $x^2 + 1$ for $x > 2$.",
                        ["$4$", "$2$", "$5$", "$3$"],
                        0,
                        "Require $\\lim_{x \\to 2^-} g(x) = \\lim_{x \\to 2^+} g(x) \\Rightarrow 2k - 3 = 2^2 + 1 = 5 \\Rightarrow 2k = 8 \\Rightarrow k = 4$."
                    )
                ]
            }
        ]
    },

    # ── 2.02 Continuity ───────────────────────────────────────────────────────
    {
        "track": "calculus",
        "num": "2.02",
        "slug": "continuity",
        "title": "Continuity",
        "sections": [
            {
                "heading": "Section 1: Definition of Continuity at a Point",
                "questions": [
                    make_q(
                        "Which three conditions must be satisfied for a function $f$ to be continuous at $x = c$?",
                        ["$f(c)$ is defined, $\\lim_{x \\to c} f(x)$ exists, and $\\lim_{x \\to c} f(x) = f(c)$", "$f'(c)$ exists, $f(c) > 0$, and $\\lim_{x \\to c} f(x) = 0$", "$\\lim_{x \\to c^-} f(x) = \\lim_{x \\to c^+} f(x)$ only", "$f(c) = 0$ and $f'(c) = 0$"],
                        0,
                        "The formal 3-part definition of continuity at a point requires $f(c)$ is defined, the two-sided limit exists, and the limit equals the function value."
                    ),
                    make_q(
                        "Determine if $f(x)$, defined as $\\frac{x^2 - 4}{x - 2}$ for $x \\neq 2$ and $f(2) = 5$, is continuous at $x = 2$.",
                        ["Discontinuous (removable discontinuity at $x = 2$)", "Continuous at $x = 2$", "Discontinuous (jump discontinuity)", "Discontinuous (infinite discontinuity)"],
                        0,
                        "$\\lim_{x \\to 2} \\frac{(x-2)(x+2)}{x-2} = 4$. However, $f(2) = 5 \\neq 4$. The limit exists but differs from $f(2)$, so it is a removable discontinuity."
                    ),
                    make_q(
                        "For what value of $a$ is $h(x)$, defined as $ax^2 + 1$ for $x \\leq 2$ and $3x - a$ for $x > 2$, continuous everywhere?",
                        ["$1$", "$2$", "$3/5$", "$-1$"],
                        0,
                        "Continuity at $x = 2$: $a(2)^2 + 1 = 3(2) - a \\Rightarrow 4a + 1 = 6 - a \\Rightarrow 5a = 5 \\Rightarrow a = 1$."
                    )
                ]
            },
            {
                "heading": "Section 2: Classification of Discontinuities",
                "questions": [
                    make_q(
                        "Classify the discontinuity of $g(x) = \\frac{x - 1}{|x - 1|}$ at $x = 1$.",
                        ["Jump discontinuity", "Removable discontinuity", "Infinite discontinuity", "Essential oscillating discontinuity"],
                        0,
                        "$\\lim_{x \\to 1^+} g(x) = 1$ while $\\lim_{x \\to 1^-} g(x) = -1$. Because both one-sided limits exist but are unequal, it is a jump discontinuity."
                    ),
                    make_q(
                        "Classify the discontinuity of $f(x) = \\frac{1}{(x - 4)^2}$ at $x = 4$.",
                        ["Infinite discontinuity", "Removable discontinuity", "Jump discontinuity", "Continuous"],
                        0,
                        "As $x \\to 4$, $f(x) \\to +\\infty$. The function grows without bound, which defines an infinite discontinuity (vertical asymptote)."
                    ),
                    make_q(
                        "How can $f(x) = \\frac{\\sin(3x)}{x}$ be defined at $x = 0$ to make it continuous?",
                        ["Set $f(0) = 3$", "Set $f(0) = 1$", "Set $f(0) = 0$", "It cannot be made continuous"],
                        0,
                        "Since $\\lim_{x \\to 0} \\frac{\\sin(3x)}{x} = 3$, setting $f(0) = 3$ removes the discontinuity, making $f$ continuous."
                    )
                ]
            },
            {
                "heading": "Section 3: Intermediate Value Theorem (IVT)",
                "questions": [
                    make_q(
                        "State the primary hypothesis required to apply the Intermediate Value Theorem to $f$ on $[a, b]$.",
                        ["$f$ must be continuous on the closed interval $[a, b]$", "$f$ must be differentiable on $(a, b)$", "$f(a) = f(b)$", "$f'(x) > 0$ on $[a, b]$"],
                        0,
                        "The IVT states that if $f$ is continuous on $[a, b]$ and $d$ is between $f(a)$ and $f(b)$, there exists at least one $c \\in (a, b)$ such that $f(c) = d$."
                    ),
                    make_q(
                        "Use the IVT to show that $x^3 + 2x - 5 = 0$ has a root in which interval?",
                        ["$(1, 2)$", "$(0, 1)$", "$(2, 3)$", "$(-1, 0)$"],
                        0,
                        "Let $f(x) = x^3 + 2x - 5$. $f(1) = 1 + 2 - 5 = -2 < 0$. $f(2) = 8 + 4 - 5 = 7 > 0$. Since $f$ is continuous and changes sign, a root exists in $(1, 2)$."
                    ),
                    make_q(
                        "A continuous function $g$ satisfies $g(0) = -3$ and $g(4) = 5$. Does $g(x) = \\pi$ have a solution on $(0, 4)$?",
                        ["Yes, because $-3 < \\pi < 5$ and $g$ is continuous", "No, because $\\pi$ is irrational", "Only if $g$ is differentiable", "Cannot be determined without $g'(x)$"],
                        0,
                        "Since $-3 < \\pi \\approx 3.1416 < 5$ and $g$ is continuous on $[0, 4]$, the IVT guarantees at least one $c \\in (0, 4)$ with $g(c) = \\pi$."
                    )
                ]
            },
            {
                "heading": "Section 4: Extreme Value Theorem (EVT) and Properties",
                "questions": [
                    make_q(
                        "What does the Extreme Value Theorem guarantee for a function continuous on a closed bounded interval $[a, b]$?",
                        ["$f$ attains both an absolute maximum and an absolute minimum on $[a, b]$", "$f$ has at least one inflection point", "$f$ is invertible on $[a, b]$", "$f'(c) = 0$ for some $c \\in (a, b)$"],
                        0,
                        "The EVT guarantees that any continuous function on a closed bounded interval $[a, b]$ attains both an absolute maximum and an absolute minimum."
                    ),
                    make_q(
                        "Which function fails to achieve an absolute maximum on $(0, 1)$?",
                        ["$f(x) = \\frac{1}{x}$", "$f(x) = x^2$", "Both $f(x) = 1/x$ and $f(x) = x^2$", "$f(x) = 5$"],
                        0,
                        "On open interval $(0, 1)$, $1/x \\to \\infty$ (unbounded) and $x^2 < 1$ never reaches 1. Both fail the EVT because the interval is open, not closed."
                    ),
                    make_q(
                        "If $f$ and $g$ are continuous at $x = c$, which of the following is NOT guaranteed to be continuous at $x = c$?",
                        ["$f(x) / g(x)$", "$f(x) + g(x)$", "$f(x) \\cdot g(x)$", "$[f(x)]^2$"],
                        0,
                        "The quotient $f/g$ is only continuous at $c$ if $g(c) \\neq 0$. If $g(c) = 0$, $f/g$ is undefined and discontinuous."
                    )
                ]
            }
        ]
    },

    # ── 3.01 The Derivative from First Principles ─────────────────────────────
    {
        "track": "calculus",
        "num": "3.01",
        "slug": "the-derivative-from-first-principles",
        "title": "The Derivative from First Principles",
        "sections": [
            {
                "heading": "Section 1: The Limit Definition of the Derivative",
                "questions": [
                    make_q(
                        "State the standard limit definition of $f'(x)$.",
                        ["$f'(x) = \\lim_{h \\to 0} \\frac{f(x+h) - f(x)}{h}$", "$f'(x) = \\lim_{h \\to 0} \\frac{f(x) - f(h)}{h}$", "$f'(x) = \\frac{f(x+h) - f(x)}{h}$", "$f'(x) = \\lim_{x \\to 0} \\frac{f(x+h) - f(x)}{x}$"],
                        0,
                        "The derivative represents the instantaneous rate of change defined by the limit of the difference quotient as $h \\to 0$."
                    ),
                    make_q(
                        "Use first principles to find the derivative of $f(x) = 5x^2 - 3x$.",
                        ["$10x - 3$", "$10x$", "$5x - 3$", "$10x + 3$"],
                        0,
                        "$\\lim_{h \\to 0} \\frac{5(x+h)^2 - 3(x+h) - (5x^2 - 3x)}{h} = \\lim_{h \\to 0} \\frac{10xh + 5h^2 - 3h}{h} = \\lim_{h \\to 0} (10x + 5h - 3) = 10x - 3$."
                    ),
                    make_q(
                        "Use the alternative limit definition $f'(a) = \\lim_{x \\to a} \\frac{f(x) - f(a)}{x - a}$ to find $f'(2)$ for $f(x) = x^3$.",
                        ["$12$", "$8$", "$6$", "$4$"],
                        0,
                        "$\\lim_{x \\to 2} \\frac{x^3 - 8}{x - 2} = \\lim_{x \\to 2} \\frac{(x-2)(x^2 + 2x + 4)}{x - 2} = 2^2 + 2(2) + 4 = 12$."
                    )
                ]
            },
            {
                "heading": "Section 2: First Principles for Radicals and Reciprocals",
                "questions": [
                    make_q(
                        "Find $f'(x)$ from first principles for $f(x) = \\frac{1}{x}$.",
                        ["$-1/x^2$", "$1/x^2$", "$-1/x$", "$-2/x^2$"],
                        0,
                        "$\\lim_{h \\to 0} \\frac{1/h \\cdot (x - (x+h))}{x(x+h)} = \\lim_{h \\to 0} \\frac{-h}{h x(x+h)} = \\lim_{h \\to 0} \\frac{-1}{x(x+h)} = -\\frac{1}{x^2}$."
                    ),
                    make_q(
                        "Find $f'(x)$ from first principles for $f(x) = \\sqrt{x}$ ($x > 0$).",
                        ["$\\frac{1}{2\\sqrt{x}}$", "$\\frac{1}{\\sqrt{x}}$", "$-\\frac{1}{2\\sqrt{x}}$", "$\\frac{2}{\\sqrt{x}}$"],
                        0,
                        "$\\lim_{h \\to 0} \\frac{\\sqrt{x+h} - \\sqrt{x}}{h} = \\lim_{h \\to 0} \\frac{(x+h) - x}{h(\\sqrt{x+h} + \\sqrt{x})} = \\frac{1}{2\\sqrt{x}}$."
                    ),
                    make_q(
                        "Evaluate $\\lim_{h \\to 0} \\frac{(2 + h)^5 - 32}{h}$ by recognizing it as a derivative.",
                        ["$80$", "$40$", "$32$", "$16$"],
                        0,
                        "This is $f'(2)$ for $f(x) = x^5$. Since $f'(x) = 5x^4$, $f'(2) = 5(2^4) = 5(16) = 80$."
                    )
                ]
            },
            {
                "heading": "Section 3: Differentiability and Continuity",
                "questions": [
                    make_q(
                        "Which statement correctly describes the relationship between differentiability and continuity?",
                        ["Differentiability implies continuity, but continuity does not imply differentiability", "Continuity implies differentiability", "They are completely independent properties", "A function is differentiable if and only if it is continuous"],
                        0,
                        "If $f$ is differentiable at $c$, it must be continuous at $c$. However, functions like $f(x) = |x|$ are continuous at 0 but not differentiable there."
                    ),
                    make_q(
                        "Why does $f(x) = |x - 3|$ fail to be differentiable at $x = 3$?",
                        ["The left-hand and right-hand derivative limits are unequal ($-1 \\neq 1$)", "$f(3)$ is undefined", "$f$ is discontinuous at $x = 3$", "The tangent line is horizontal"],
                        0,
                        "Left derivative is $\\lim_{h \\to 0^-} \\frac{-(3+h-3)}{h} = -1$. Right derivative is $+1$. Since they differ, a sharp corner exists and $f'(3)$ does not exist."
                    ),
                    make_q(
                        "At $x = 0$, the function $f(x) = x^{1/3}$ has which type of non-differentiability?",
                        ["Vertical tangent ($f'(x) \\to \\infty$)", "Corner / sharp turn", "Cusp", "Removable discontinuity"],
                        0,
                        "$f'(x) = \\frac{1}{3}x^{-2/3} = \\frac{1}{3x^{2/3}}$. As $x \\to 0$, $f'(x) \\to +\\infty$. The tangent line is vertical, so $f$ is not differentiable."
                    )
                ]
            },
            {
                "heading": "Section 4: Geometric and Physical Interpretations",
                "questions": [
                    make_q(
                        "What geometric feature does the derivative $f'(a)$ represent?",
                        ["The slope of the tangent line to $y = f(x)$ at $x = a$", "The area under the curve from 0 to $a$", "The secant line slope between 0 and $a$", "The curvature at $(a, f(a))$"],
                        0,
                        "The derivative $f'(a)$ is geometrically defined as the exact slope of the tangent line to the curve $y = f(x)$ at $(a, f(a))$."
                    ),
                    make_q(
                        "A particle moves along a line with position $s(t) = 4t^2 - 3t + 1$. What is its instantaneous velocity at $t = 2$?",
                        ["$13$", "$11$", "$16$", "$10$"],
                        0,
                        "$v(t) = s'(t) = 8t - 3$. At $t = 2$: $v(2) = 8(2) - 3 = 13$."
                    ),
                    make_q(
                        "Find the equation of the tangent line to $y = x^2 - 4x$ at the point where $x = 3$.",
                        ["$y = 2x - 9$", "$y = 2x - 3$", "$y = -x$", "$y = 4x - 15$"],
                        0,
                        "$y(3) = 9 - 12 = -3$. $y' = 2x - 4 \\Rightarrow y'(3) = 2$. Line: $y - (-3) = 2(x - 3) \\Rightarrow y = 2x - 9$."
                    )
                ]
            }
        ]
    },

    # ── 3.02 Differentiation Rules: Power, Product, Quotient, Chain ───────────
    {
        "track": "calculus",
        "num": "3.02",
        "slug": "differentiation-rules-power-product-quotient-chain",
        "title": "Differentiation Rules: Power, Product, Quotient, Chain",
        "sections": [
            {
                "heading": "Section 1: Power Rule and Basic Operations",
                "questions": [
                    make_q(
                        "Find the derivative of $f(x) = 4x^5 - 3x^3 + 7x - 9$.",
                        ["$20x^4 - 9x^2 + 7$", "$20x^4 - 9x^2$", "$4x^4 - 3x^2 + 7$", "$20x^4 - 6x^2 + 7$"],
                        0,
                        "By the power rule: $\\frac{d}{dx}(4x^5) = 20x^4$, $\\frac{d}{dx}(-3x^3) = -9x^2$, $\\frac{d}{dx}(7x) = 7$, $\\frac{d}{dx}(-9) = 0$."
                    ),
                    make_q(
                        "Differentiate $g(x) = \\frac{4}{\\sqrt{x}} + \\frac{3}{x^2}$.",
                        ["$-2x^{-3/2} - 6x^{-3}$", "$-2x^{-1/2} - 6x^{-3}$", "$2x^{-3/2} - 6x^{-3}$", "$-4x^{-3/2} - 3x^{-3}$"],
                        0,
                        "Rewrite as $4x^{-1/2} + 3x^{-2}$. $g'(x) = 4(-1/2)x^{-3/2} + 3(-2)x^{-3} = -2x^{-3/2} - 6x^{-3}$."
                    ),
                    make_q(
                        "Find all points where the curve $y = x^3 - 3x^2 - 9x + 5$ has a horizontal tangent.",
                        ["$x = -1$ and $x = 3$", "$x = 1$ and $x = -3$", "$x = 0$ and $x = 3$", "$x = -1$ only"],
                        0,
                        "$y' = 3x^2 - 6x - 9 = 3(x^2 - 2x - 3) = 3(x - 3)(x + 1) = 0 \\Rightarrow x = 3$ or $x = -1$."
                    )
                ]
            },
            {
                "heading": "Section 2: Product and Quotient Rules",
                "questions": [
                    make_q(
                        "Differentiate $h(x) = (x^2 + 3)(2x - 5)$.",
                        ["$6x^2 - 10x + 6$", "$6x^2 - 10x$", "$4x^2 - 10x + 6$", "$6x^2 + 6$"],
                        0,
                        "Product rule: $h'(x) = (2x)(2x - 5) + (x^2 + 3)(2) = 4x^2 - 10x + 2x^2 + 6 = 6x^2 - 10x + 6$."
                    ),
                    make_q(
                        "Find $\\frac{dy}{dx}$ for $y = \\frac{3x - 1}{2x + 5}$.",
                        ["$\\frac{17}{(2x + 5)^2}$", "$\\frac{1}{(2x + 5)^2}$", "$\\frac{6x + 17}{(2x + 5)^2}$", "$\\frac{3}{2}$"],
                        0,
                        "Quotient rule: $\\frac{3(2x + 5) - (3x - 1)(2)}{(2x + 5)^2} = \\frac{6x + 15 - 6x + 2}{(2x + 5)^2} = \\frac{17}{(2x + 5)^2}$."
                    ),
                    make_q(
                        "If $f(2) = 3, f'(2) = -1, g(2) = 4, g'(2) = 2$, find $\\left(\\frac{f}{g}\\right)'(2)$.",
                        ["$-10/16 = -5/8$", "$2/16 = 1/8$", "$-2/16$", "$-1/2$"],
                        0,
                        "$\\frac{f'(2)g(2) - f(2)g'(2)}{[g(2)]^2} = \\frac{(-1)(4) - (3)(2)}{4^2} = \\frac{-4 - 6}{16} = -\\frac{10}{16} = -\\frac{5}{8}$."
                    )
                ]
            },
            {
                "heading": "Section 3: The Chain Rule",
                "questions": [
                    make_q(
                        "Find $\\frac{d}{dx}\\left[(3x^2 - 5x + 2)^4\\right]$.",
                        ["$4(3x^2 - 5x + 2)^3(6x - 5)$", "$4(3x^2 - 5x + 2)^3$", "$12(6x - 5)^3$", "$4(6x - 5)^3$"],
                        0,
                        "By chain rule: $\\frac{d}{du}[u^4] \\cdot u' = 4u^3 \\cdot (6x - 5) = 4(3x^2 - 5x + 2)^3(6x - 5)$."
                    ),
                    make_q(
                        "Find $\\frac{dy}{dx}$ for $y = \\sqrt{4 - x^2}$.",
                        ["$\\frac{-x}{\\sqrt{4 - x^2}}$", "$\\frac{x}{\\sqrt{4 - x^2}}$", "$\\frac{-1}{2\\sqrt{4 - x^2}}$", "$\\frac{-2x}{\\sqrt{4 - x^2}}$"],
                        0,
                        "$y = (4 - x^2)^{1/2} \\Rightarrow y' = \\frac{1}{2}(4 - x^2)^{-1/2}(-2x) = \\frac{-x}{\\sqrt{4 - x^2}}$."
                    ),
                    make_q(
                        "If $h(x) = f(g(x))$ with $g(3) = 5, g'(3) = 4$, and $f'(5) = -2$, find $h'(3)$.",
                        ["$-8$", "$8$", "$-10$", "$20$"],
                        0,
                        "$h'(x) = f'(g(x))g'(x) \\Rightarrow h'(3) = f'(g(3))g'(3) = f'(5)(4) = (-2)(4) = -8$."
                    )
                ]
            },
            {
                "heading": "Section 4: Trigonometric Derivatives with Chain Rule",
                "questions": [
                    make_q(
                        "Differentiate $y = \\sin(3x^2)$.",
                        ["$6x\\cos(3x^2)$", "$3\\cos(3x^2)$", "$\\cos(6x)$", "$6x\\sin(3x^2)$"],
                        0,
                        "Chain rule: $\\frac{d}{dx}[\\sin(u)] = \\cos(u) \\cdot u' = \\cos(3x^2) \\cdot 6x = 6x\\cos(3x^2)$."
                    ),
                    make_q(
                        "Find $\\frac{d}{dx}[\\tan^3(x)]$.",
                        ["$3\\tan^2(x)\\sec^2(x)$", "$3\\tan^2(x)$", "$3\\sec^4(x)$", "$\\sec^6(x)$"],
                        0,
                        "Let $u = \\tan x$: $\\frac{d}{dx}[u^3] = 3u^2 u' = 3\\tan^2(x) \\sec^2(x)$."
                    ),
                    make_q(
                        "Find the second derivative $y''$ for $y = \\cos(2x)$.",
                        ["$-4\\cos(2x)$", "$4\\cos(2x)$", "$-2\\sin(2x)$", "$-4\\sin(2x)$"],
                        0,
                        "$y' = -2\\sin(2x)$. $y'' = \\frac{d}{dx}[-2\\sin(2x)] = -2(2\\cos(2x)) = -4\\cos(2x)$."
                    )
                ]
            }
        ]
    },

    # ── 4.01 Antiderivatives and Indefinite Integrals ──────────────────────────
    {
        "track": "calculus",
        "num": "4.01",
        "slug": "antiderivatives-and-indefinite-integrals",
        "title": "Antiderivatives and Indefinite Integrals",
        "sections": [
            {
                "heading": "Section 1: The Power Rule for Integration",
                "questions": [
                    make_q(
                        "Evaluate $\\int (6x^3 - 4x + 5)\\,dx$.",
                        ["$\\frac{3}{2}x^4 - 2x^2 + 5x + C$", "$2x^4 - 2x^2 + 5x + C$", "$18x^2 - 4 + C$", "$\\frac{3}{2}x^4 - 4x^2 + 5x + C$"],
                        0,
                        "$\\int 6x^3\\,dx = 6(x^4/4) = \\frac{3}{2}x^4$. $\\int -4x\\,dx = -2x^2$. $\\int 5\\,dx = 5x$. Result: $\\frac{3}{2}x^4 - 2x^2 + 5x + C$."
                    ),
                    make_q(
                        "Find $\\int \\left(x^{2/3} + \\frac{1}{x^3}\\right)\\,dx$.",
                        ["$\\frac{3}{5}x^{5/3} - \\frac{1}{2x^2} + C$", "$\\frac{5}{3}x^{5/3} - \\frac{1}{4x^4} + C$", "$\\frac{3}{5}x^{5/3} + \\frac{1}{2x^2} + C$", "$\\frac{2}{5}x^{5/3} - \\frac{2}{x^2} + C$"],
                        0,
                        "$\\int x^{2/3}\\,dx = \\frac{x^{5/3}}{5/3} = \\frac{3}{5}x^{5/3}$. $\\int x^{-3}\\,dx = \\frac{x^{-2}}{-2} = -\\frac{1}{2x^2}$. Result: $\\frac{3}{5}x^{5/3} - \\frac{1}{2x^2} + C$."
                    ),
                    make_q(
                        "Evaluate $\\int \\frac{3x^4 - 2x}{x^2}\\,dx$.",
                        ["$\\frac{3}{3}x^3 - 2\\ln|x| + C = x^3 - 2\\ln|x| + C$", "$x^3 - \\frac{2}{x} + C$", "$3x^3 - 2x + C$", "$x^3 - 2x^{-1} + C$"],
                        0,
                        "Simplify integrand: $\\frac{3x^4}{x^2} - \\frac{2x}{x^2} = 3x^2 - \\frac{2}{x}$. Integrating: $x^3 - 2\\ln|x| + C$."
                    )
                ]
            },
            {
                "heading": "Section 2: Trigonometric and Exponential Antiderivatives",
                "questions": [
                    make_q(
                        "Evaluate $\\int (3\\sin x + 4\\cos x)\\,dx$.",
                        ["$-3\\cos x + 4\\sin x + C$", "$3\\cos x - 4\\sin x + C$", "$3\\cos x + 4\\sin x + C$", "$-3\\cos x - 4\\sin x + C$"],
                        0,
                        "$\\int \\sin x\\,dx = -\\cos x$ and $\\int \\cos x\\,dx = \\sin x$. Thus $\\int (3\\sin x + 4\\cos x)\\,dx = -3\\cos x + 4\\sin x + C$."
                    ),
                    make_q(
                        "Evaluate $\\int (5e^x + \\sec^2 x)\\,dx$.",
                        ["$5e^x + \\tan x + C$", "$5e^x - \\tan x + C$", "$5e^x + \\sec x\\tan x + C$", "$e^x + \\tan x + C$"],
                        0,
                        "$\\int e^x\\,dx = e^x$ and $\\int \\sec^2 x\\,dx = \\tan x$. Result is $5e^x + \\tan x + C$."
                    ),
                    make_q(
                        "Find $\\int (2^x + \\csc x\\cot x)\\,dx$.",
                        ["$\\frac{2^x}{\\ln 2} - \\csc x + C$", "$2^x\\ln 2 - \\csc x + C$", "$\\frac{2^x}{\\ln 2} + \\csc x + C$", "$2^x - \\cot x + C$"],
                        0,
                        "$\\int a^x\\,dx = \\frac{a^x}{\\ln a}$ and $\\int \\csc x\\cot x\\,dx = -\\csc x$. Result is $\\frac{2^x}{\\ln 2} - \\csc x + C$."
                    )
                ]
            },
            {
                "heading": "Section 3: Initial Value Problems",
                "questions": [
                    make_q(
                        "Find $f(x)$ given $f'(x) = 4x - 3$ and $f(1) = 6$.",
                        ["$f(x) = 2x^2 - 3x + 7$", "$f(x) = 2x^2 - 3x + 5$", "$f(x) = 4x^2 - 3x + 5$", "$f(x) = 2x^2 - 3x$"],
                        0,
                        "$f(x) = \\int (4x - 3)\\,dx = 2x^2 - 3x + C$. $f(1) = 2(1)^2 - 3(1) + C = 6 \\Rightarrow -1 + C = 6 \\Rightarrow C = 7$."
                    ),
                    make_q(
                        "A curve satisfies $\\frac{dy}{dx} = 3x^2 + 2x$ and passes through $(2, 10)$. Find its equation.",
                        ["$y = x^3 + x^2 - 2$", "$y = x^3 + x^2 + 2$", "$y = 3x^3 + 2x^2 - 22$", "$y = x^3 + x^2$"],
                        0,
                        "$y = x^3 + x^2 + C$. $y(2) = 8 + 4 + C = 10 \\Rightarrow 12 + C = 10 \\Rightarrow C = -2$. Equation: $y = x^3 + x^2 - 2$."
                    ),
                    make_q(
                        "Given $f''(x) = 6x, f'(0) = 4$, and $f(0) = 1$, find $f(x)$.",
                        ["$f(x) = x^3 + 4x + 1$", "$f(x) = 3x^3 + 4x + 1$", "$f(x) = x^3 + 2x + 1$", "$f(x) = x^3 + 4$"],
                        0,
                        "$f'(x) = 3x^2 + C_1$. $f'(0) = 4 \\Rightarrow C_1 = 4$. $f(x) = x^3 + 4x + C_2$. $f(0) = 1 \\Rightarrow C_2 = 1$."
                    )
                ]
            },
            {
                "heading": "Section 4: Rectilinear Motion and Acceleration",
                "questions": [
                    make_q(
                        "A particle moves with acceleration $a(t) = 6t - 4$. If its initial velocity $v(0) = 5$, find $v(t)$.",
                        ["$v(t) = 3t^2 - 4t + 5$", "$v(t) = 6t^2 - 4t + 5$", "$v(t) = 3t^2 - 4t$", "$v(t) = 3t^2 + 4t + 5$"],
                        0,
                        "$v(t) = \\int (6t - 4)\\,dx = 3t^2 - 4t + C$. $v(0) = 5 \\Rightarrow C = 5$. Thus $v(t) = 3t^2 - 4t + 5$."
                    ),
                    make_q(
                        "If a ball is thrown upward with $v(0) = 48\\text{ ft/s}$ and $a(t) = -32\\text{ ft/s}^2$ from ground level $s(0) = 0$, find its maximum height.",
                        ["$36\\text{ ft}$", "$48\\text{ ft}$", "$64\\text{ ft}$", "$32\\text{ ft}$"],
                        0,
                        "$v(t) = -32t + 48 = 0 \\Rightarrow t = 1.5\\text{ s}$. $s(t) = -16t^2 + 48t$. At $t = 1.5$: $s(1.5) = -16(2.25) + 48(1.5) = -36 + 72 = 36\\text{ ft}$."
                    ),
                    make_q(
                        "A car decelerates at a constant $a = -4\\text{ m/s}^2$ from $v_0 = 24\\text{ m/s}$. How far does it travel before coming to a stop?",
                        ["$72\\text{ m}$", "$48\\text{ m}$", "$96\\text{ m}$", "$36\\text{ m}$"],
                        0,
                        "$v(t) = 24 - 4t = 0 \\Rightarrow t = 6\\text{ s}$. Distance $s(t) = 24t - 2t^2$. At $t = 6$: $s(6) = 24(6) - 2(36) = 144 - 72 = 72\\text{ m}$."
                    )
                ]
            }
        ]
    },

    # ── 4.02 Riemann Sums and Definite Integrals ───────────────────────────────
    {
        "track": "calculus",
        "num": "4.02",
        "slug": "riemann-sums-and-definite-integrals",
        "title": "Riemann Sums and Definite Integrals",
        "sections": [
            {
                "heading": "Section 1: Left and Right Riemann Sums",
                "questions": [
                    make_q(
                        "Approximate $\\int_0^4 x^2\\,dx$ using a Left Riemann sum with $n = 4$ equal subintervals.",
                        ["$14$", "$30$", "$21$", "$16$"],
                        0,
                        "$\\Delta x = \\frac{4-0}{4} = 1$. Grid points: $0, 1, 2, 3, 4$. Left sum $= 1 \\cdot [f(0) + f(1) + f(2) + f(3)] = 1 \\cdot [0 + 1 + 4 + 9] = 14$."
                    ),
                    make_q(
                        "Approximate $\\int_0^4 x^2\\,dx$ using a Right Riemann sum with $n = 4$ equal subintervals.",
                        ["$30$", "$14$", "$22$", "$28$"],
                        0,
                        "Right sum $= 1 \\cdot [f(1) + f(2) + f(3) + f(4)] = 1 \\cdot [1 + 4 + 9 + 16] = 30$."
                    ),
                    make_q(
                        "For a strictly increasing function $f(x)$ on $[a, b]$, which inequality correctly relates the exact integral $I$ to the Left ($L_n$) and Right ($R_n$) Riemann sums?",
                        ["$L_n < I < R_n$", "$R_n < I < L_n$", "$I < L_n < R_n$", "$L_n = I = R_n$"],
                        0,
                        "For an increasing function, rectangles evaluated at the left endpoints lie below the curve ($L_n < I$) and right endpoints lie above the curve ($I < R_n$)."
                    )
                ]
            },
            {
                "heading": "Section 2: Midpoint and Trapezoidal Approximations",
                "questions": [
                    make_q(
                        "Approximate $\\int_1^5 \\frac{1}{x}\\,dx$ using the Midpoint Rule with $n = 2$ equal subintervals.",
                        ["$\\frac{1}{2} + \\frac{1}{4} = 0.75 \\approx 1.5$ is wrong; width=2: $2(1/2 + 1/4) = 1.5$", "$1.5$", "$1.2$", "$1.33$"],
                        0,
                        "$\\Delta x = \\frac{5-1}{2} = 2$. Subintervals: $[1, 3]$ and $[3, 5]$. Midpoints are $m_1 = 2$ and $m_2 = 4$. Midpoint sum $= 2 \\cdot [f(2) + f(4)] = 2(1/2 + 1/4) = 2(3/4) = 1.5$."
                    ),
                    make_q(
                        "Use the Trapezoidal Rule with $n = 4$ to approximate $\\int_0^2 x^3\\,dx$.",
                        ["$4.25$", "$4.00$", "$3.75$", "$4.50$"],
                        0,
                        "$\\Delta x = 0.5$. Grid: $0, 0.5, 1, 1.5, 2$. Values: $0, 0.125, 1, 3.375, 8$. $T_4 = \\frac{0.5}{2}[0 + 2(0.125 + 1 + 3.375) + 8] = 0.25[0 + 9 + 8] = 0.25(17) = 4.25$."
                    ),
                    make_q(
                        "If $f''(x) > 0$ (concave up) on $[a, b]$, how does the Trapezoidal approximation $T_n$ compare to the exact integral $I$?",
                        ["$T_n > I$ (overestimate)", "$T_n < I$ (underestimate)", "$T_n = I$", "Cannot be determined without $f'(x)$"],
                        0,
                        "When $f$ is concave up, secant lines connecting adjacent points on the curve lie entirely above the curve, so trapezoids overestimate the area: $T_n > I$."
                    )
                ]
            },
            {
                "heading": "Section 3: Definite Integral as the Limit of a Riemann Sum",
                "questions": [
                    make_q(
                        "Express the limit $\\lim_{n \\to \\infty} \\sum_{i=1}^n \\left(2 + \\frac{3i}{n}\\right)^4 \\frac{3}{n}$ as a definite integral.",
                        ["$\\int_2^5 x^4\\,dx$", "$\\int_0^3 (2 + x)^4\\,dx$", "$\\int_2^5 (2 + 3x)^4\\,dx$", "$\\int_0^1 (2 + 3x)^4\\,dx$"],
                        0,
                        "Here $\\Delta x = 3/n$ and $x_i = 2 + i\\Delta x$. Lower limit $a = 2$, upper limit $b = 2 + 3 = 5$. Integrand is $x^4$. Integral is $\\int_2^5 x^4\\,dx$."
                    ),
                    make_q(
                        "Evaluate $\\lim_{n \\to \\infty} \\frac{1}{n} \\sum_{i=1}^n \\frac{i^2}{n^2}$.",
                        ["$1/3$", "$1/2$", "$1/4$", "$1$"],
                        0,
                        "This corresponds to $\\int_0^1 x^2\\,dx = [x^3/3]_0^1 = 1/3$."
                    ),
                    make_q(
                        "Convert $\\lim_{n \\to \\infty} \\sum_{i=1}^n \\frac{1}{n + i}$ into a definite integral on $[0, 1]$ and evaluate it.",
                        ["$\\ln 2$", "$1$", "$\\ln 3$", "$1/2$"],
                        0,
                        "Factor out $1/n$: $\\lim_{n \\to \\infty} \\frac{1}{n} \\sum_{i=1}^n \\frac{1}{1 + i/n} = \\int_0^1 \\frac{1}{1+x}\\,dx = [\\ln(1+x)]_0^1 = \\ln 2$."
                    )
                ]
            },
            {
                "heading": "Section 4: Geometric Evaluation of Definite Integrals",
                "questions": [
                    make_q(
                        "Evaluate $\\int_{-3}^3 \\sqrt{9 - x^2}\\,dx$ using geometry.",
                        ["$\\frac{9\\pi}{2}$", "$9\\pi$", "$\\frac{9\\pi}{4}$", "$18$"],
                        0,
                        "The graph of $y = \\sqrt{9 - x^2}$ is the upper semicircle of radius $r = 3$ centered at the origin. Area $= \\frac{1}{2}\\pi r^2 = \\frac{1}{2}\\pi(9) = \\frac{9\\pi}{2}$."
                    ),
                    make_q(
                        "Evaluate $\\int_0^4 (2x - 3)\\,dx$ by computing net signed area.",
                        ["$4$", "$8$", "$0$", "$-2$"],
                        0,
                        "Triangles: below axis on $[0, 1.5]$: base $1.5$, height $3$, area $-(1.5 \\times 3)/2 = -2.25$. Above axis on $[1.5, 4]$: base $2.5$, height $5$, area $(2.5 \\times 5)/2 = 6.25$. Net $= 6.25 - 2.25 = 4$."
                    ),
                    make_q(
                        "If $\\int_1^5 f(x)\\,dx = 7$ and $\\int_3^5 f(x)\\,dx = 4$, find $\\int_1^3 f(x)\\,dx$.",
                        ["$3$", "$11$", "$-3$", "$7/4$"],
                        0,
                        "By additivity of intervals: $\\int_1^5 f = \\int_1^3 f + \\int_3^5 f \\Rightarrow 7 = \\int_1^3 f + 4 \\Rightarrow \\int_1^3 f = 3$."
                    )
                ]
            }
        ]
    },

    # ── 5.01 The Fundamental Theorem of Calculus ──────────────────────────────
    {
        "track": "calculus",
        "num": "5.01",
        "slug": "the-fundamental-theorem-of-calculus",
        "title": "The Fundamental Theorem of Calculus",
        "sections": [
            {
                "heading": "Section 1: FTC Part 1 (Derivative of an Accumulation Function)",
                "questions": [
                    make_q(
                        "If $g(x) = \\int_1^x \\sqrt{t^3 + 1}\\,dt$, find $g'(x)$.",
                        ["$\\sqrt{x^3 + 1}$", "$\\frac{3x^2}{2\\sqrt{x^3 + 1}}$", "$\\sqrt{x^3 + 1} - \\sqrt{2}$", "$\\frac{1}{3}(x^3 + 1)^{3/2}$"],
                        0,
                        "By FTC Part 1, $\\frac{d}{dx}\\left[\\int_a^x f(t)\\,dt\\right] = f(x)$. Thus $g'(x) = \\sqrt{x^3 + 1}$."
                    ),
                    make_q(
                        "Find $\\frac{d}{dx}\\left[\\int_x^5 \\cos(t^2)\\,dt\\right]$.",
                        ["$-\\cos(x^2)$", "$\\cos(x^2)$", "$-2x\\sin(x^2)$", "$\\cos(25) - \\cos(x^2)$"],
                        0,
                        "Reverse limits: $\\int_x^5 = -\\int_5^x$. Differentiating yields $-\\cos(x^2)$."
                    ),
                    make_q(
                        "Find $h'(x)$ for $h(x) = \\int_0^{x^2} \\sin(t)\\,dt$.",
                        ["$2x\\sin(x^2)$", "$\\sin(x^2)$", "$2x\\cos(x^2)$", "$\\sin(x^4)$"],
                        0,
                        "Chain rule with FTC 1: $\\frac{d}{dx}\\left[\\int_a^{u(x)} f(t)\\,dt\\right] = f(u(x)) \\cdot u'(x) = \\sin(x^2) \\cdot 2x = 2x\\sin(x^2)$."
                    )
                ]
            },
            {
                "heading": "Section 2: FTC Part 1 with Variable Limits on Both Bounds",
                "questions": [
                    make_q(
                        "Find $F'(x)$ for $F(x) = \\int_{2x}^{3x} (t^2 + 1)\\,dt$.",
                        ["$27x^2 + 3 - 2(4x^2 + 1) = 19x^2 + 1$", "$19x^2 + 1$", "$27x^2 - 8x^2 = 19x^2$", "$5x^2 + 1$"],
                        0,
                        "Split at 0: $\\int_{2x}^{3x} = \\int_0^{3x} - \\int_0^{2x}$. Differentiating: $3[(3x)^2 + 1] - 2[(2x)^2 + 1] = 3(9x^2 + 1) - 2(4x^2 + 1) = 27x^2 + 3 - 8x^2 - 2 = 19x^2 + 1$."
                    ),
                    make_q(
                        "Evaluate $\\frac{d}{dx}\\left[\\int_{\\sin x}^{\\cos x} e^t\\,dt\\right]$.",
                        ["$-e^{\\cos x}\\sin x - e^{\\sin x}\\cos x$", "$e^{\\cos x} - e^{\\sin x}$", "$e^{\\cos x}\\sin x + e^{\\sin x}\\cos x$", "$-e^{\\cos x} + e^{\\sin x}$"],
                        0,
                        "FTC with chain rule: $e^{\\cos x} \\cdot (-\\sin x) - e^{\\sin x} \\cdot (\\cos x) = -e^{\\cos x}\\sin x - e^{\\sin x}\\cos x$."
                    ),
                    make_q(
                        "Find the inflection points of $g(x) = \\int_0^x (t^3 - 3t)\\,dt$.",
                        ["$x = 1$ and $x = -1$", "$x = 0$ and $x = \\pm\\sqrt{3}$", "$x = 3$", "No inflection points"],
                        0,
                        "$g'(x) = x^3 - 3x$. $g''(x) = 3x^2 - 3 = 3(x-1)(x+1) = 0 \\Rightarrow x = \\pm 1$. Sign of $g''(x)$ changes at $x = -1$ and $x = 1$."
                    )
                ]
            },
            {
                "heading": "Section 3: FTC Part 2 (Evaluating Definite Integrals)",
                "questions": [
                    make_q(
                        "Evaluate $\\int_1^3 (3x^2 - 4x + 1)\\,dx$.",
                        ["$12$", "$14$", "$10$", "$16$"],
                        0,
                        "Antiderivative $F(x) = x^3 - 2x^2 + x$. $F(3) = 27 - 18 + 3 = 12$. $F(1) = 1 - 2 + 1 = 0$. Value $= 12 - 0 = 12$."
                    ),
                    make_q(
                        "Evaluate $\\int_0^{\\pi/4} \\sec^2(x)\\,dx$.",
                        ["$1$", "$\\sqrt{2}$", "$1/2$", "$0$"],
                        0,
                        "$[\\tan x]_0^{\\pi/4} = \\tan(\\pi/4) - \\tan(0) = 1 - 0 = 1$."
                    ),
                    make_q(
                        "Evaluate $\\int_1^e \\frac{4}{x}\\,dx$.",
                        ["$4$", "$4e$", "$4\\ln(e) - 4 = 0$", "$1$"],
                        0,
                        "$[4\\ln|x|]_1^e = 4\\ln(e) - 4\\ln(1) = 4(1) - 4(0) = 4$."
                    )
                ]
            },
            {
                "heading": "Section 4: Average Value of a Function",
                "questions": [
                    make_q(
                        "State the formula for the average value $f_{\\text{avg}}$ of a continuous function $f$ on $[a, b]$.",
                        ["$f_{\\text{avg}} = \\frac{1}{b - a} \\int_a^b f(x)\\,dx$", "$f_{\\text{avg}} = \\frac{f(a) + f(b)}{2}$", "$f_{\\text{avg}} = \\int_a^b f(x)\\,dx$", "$f_{\\text{avg}} = \\frac{f(b) - f(a)}{b - a}$"],
                        0,
                        "The average value is the total accumulation divided by the width of the interval: $\\frac{1}{b - a}\\int_a^b f(x)\\,dx$."
                    ),
                    make_q(
                        "Find the average value of $f(x) = 3x^2 - 2x$ on the interval $[0, 2]$.",
                        ["$2$", "$4$", "$3$", "$1$"],
                        0,
                        "$\\frac{1}{2 - 0} \\int_0^2 (3x^2 - 2x)\\,dx = \\frac{1}{2}[x^3 - x^2]_0^2 = \\frac{1}{2}[8 - 4] = \\frac{1}{2}(4) = 2$."
                    ),
                    make_q(
                        "By the Mean Value Theorem for Integrals, find $c \\in [0, 3]$ such that $f(c) = f_{\\text{avg}}$ for $f(x) = 2x$.",
                        ["$1.5$", "$1.0$", "$2.0$", "$0.75$"],
                        0,
                        "$f_{\\text{avg}} = \\frac{1}{3}\\int_0^3 2x\\,dx = \\frac{1}{3}[x^2]_0^3 = \\frac{1}{3}(9) = 3$. Set $2c = 3 \\Rightarrow c = 1.5$."
                    )
                ]
            }
        ]
    },

    # ── 6.01 Related Rates ────────────────────────────────────────────────────
    {
        "track": "calculus",
        "num": "6.01",
        "slug": "related-rates",
        "title": "Related Rates",
        "sections": [
            {
                "heading": "Section 1: Geometric Expansion (Circles, Spheres, Cubes)",
                "questions": [
                    make_q(
                        "The radius of a circle expands at a constant rate of $3\\text{ cm/s}$. How fast is the area increasing when the radius is $10\\text{ cm}$?",
                        ["$60\\pi\\text{ cm}^2\\text{/s}$", "$30\\pi\\text{ cm}^2\\text{/s}$", "$100\\pi\\text{ cm}^2\\text{/s}$", "$20\\pi\\text{ cm}^2\\text{/s}$"],
                        0,
                        "$A = \\pi r^2 \\Rightarrow \\frac{dA}{dt} = 2\\pi r \\frac{dr}{dt} = 2\\pi(10)(3) = 60\\pi\\text{ cm}^2\\text{/s}$."
                    ),
                    make_q(
                        "Air is pumped into a spherical balloon so that its volume increases at $100\\text{ cm}^3\\text{/s}$. How fast is the radius increasing when $r = 5\\text{ cm}$?",
                        ["$\\frac{1}{\\pi}\\text{ cm/s}$", "$\\frac{2}{\\pi}\\text{ cm/s}$", "$\\frac{4}{\\pi}\\text{ cm/s}$", "$5\\pi\\text{ cm/s}$"],
                        0,
                        "$V = \\frac{4}{3}\\pi r^3 \\Rightarrow \\frac{dV}{dt} = 4\\pi r^2 \\frac{dr}{dt}$. $100 = 4\\pi(25)\\frac{dr}{dt} = 100\\pi \\frac{dr}{dt} \\Rightarrow \\frac{dr}{dt} = \\frac{1}{\\pi}\\text{ cm/s}$."
                    ),
                    make_q(
                        "The edge length $s$ of a cube increases at $2\\text{ cm/s}$. At what rate is the surface area increasing when $s = 4\\text{ cm}$?",
                        ["$96\\text{ cm}^2\\text{/s}$", "$48\\text{ cm}^2\\text{/s}$", "$32\\text{ cm}^2\\text{/s}$", "$64\\text{ cm}^2\\text{/s}$"],
                        0,
                        "Surface area $S = 6s^2 \\Rightarrow \\frac{dS}{dt} = 12s \\frac{ds}{dt} = 12(4)(2) = 96\\text{ cm}^2\\text{/s}$."
                    )
                ]
            },
            {
                "heading": "Section 2: Sliding Ladders and Pythagorean Triangles",
                "questions": [
                    make_q(
                        "A $13\\text{-ft}$ ladder leans against a vertical wall. If the bottom slides away from the wall at $2\\text{ ft/s}$, how fast is the top sliding down when the bottom is $5\\text{ ft}$ from the wall?",
                        ["$5/6\\text{ ft/s}$", "$12/5\\text{ ft/s}$", "$2\\text{ ft/s}$", "$1/2\\text{ ft/s}$"],
                        0,
                        "$x^2 + y^2 = 13^2 = 169$. When $x = 5$, $y = \\sqrt{169 - 25} = 12$. Differentiating: $2x\\frac{dx}{dt} + 2y\\frac{dy}{dt} = 0 \\Rightarrow 5(2) + 12\\frac{dy}{dt} = 0 \\Rightarrow \\frac{dy}{dt} = -\\frac{10}{12} = -\\frac{5}{6}\\text{ ft/s}$."
                    ),
                    make_q(
                        "Two cars start from the same point. Car A travels north at $40\\text{ mph}$ and Car B travels east at $30\\text{ mph}$. How fast is the distance between them increasing after 2 hours?",
                        ["$50\\text{ mph}$", "$70\\text{ mph}$", "$45\\text{ mph}$", "$60\\text{ mph}$"],
                        0,
                        "After 2 h: $y = 80\\text{ miles}, x = 60\\text{ miles}, z = \\sqrt{60^2 + 80^2} = 100\\text{ miles}$. $2z\\frac{dz}{dt} = 2x\\frac{dx}{dt} + 2y\\frac{dy}{dt} \\Rightarrow 100\\frac{dz}{dt} = 60(30) + 80(40) = 1800 + 3200 = 5000 \\Rightarrow \\frac{dz}{dt} = 50\\text{ mph}$."
                    ),
                    make_q(
                        "In the 13-ft ladder problem ($x = 5, y = 12, dx/dt = 2$), at what rate is the area of the triangle formed by the ladder changing?",
                        ["$119/12\\text{ ft}^2\\text{/s}$", "$25/2\\text{ ft}^2\\text{/s}$", "$0\\text{ ft}^2\\text{/s}$", "$12\\text{ ft}^2\\text{/s}$"],
                        0,
                        "$A = \\frac{1}{2}xy \\Rightarrow \\frac{dA}{dt} = \\frac{1}{2}\\left(\\frac{dx}{dt}y + x\\frac{dy}{dt}\\right) = \\frac{1}{2}\\left(2(12) + 5(-5/6)\\right) = \\frac{1}{2}\\left(24 - 25/6\\right) = \\frac{1}{2}\\left(\\frac{119}{6}\\right) = \\frac{119}{12}\\text{ ft}^2\\text{/s}$."
                    )
                ]
            },
            {
                "heading": "Section 3: Conical and Cylindrical Tanks",
                "questions": [
                    make_q(
                        "Water flows into an inverted conical tank (radius $4\\text{ m}$, height $12\\text{ m}$) at $2\\text{ m}^3\\text{/min}$. How fast is the water level rising when the depth is $6\\text{ m}$?",
                        ["$\\frac{1}{2\\pi}\\text{ m/min}$", "$\\frac{1}{\\pi}\\text{ m/min}$", "$\\frac{2}{\\pi}\\text{ m/min}$", "$\\frac{1}{4\\pi}\\text{ m/min}$"],
                        0,
                        "By similar triangles, $r/h = 4/12 = 1/3 \\Rightarrow r = h/3$. $V = \\frac{1}{3}\\pi r^2 h = \\frac{1}{3}\\pi(h/3)^2 h = \\frac{\\pi}{27}h^3$. $\\frac{dV}{dt} = \\frac{\\pi}{9}h^2 \\frac{dh}{dt}$. At $h = 6$: $2 = \\frac{\\pi}{9}(36)\\frac{dh}{dt} = 4\\pi \\frac{dh}{dt} \\Rightarrow \\frac{dh}{dt} = \\frac{2}{4\\pi} = \\frac{1}{2\\pi}\\text{ m/min}$."
                    ),
                    make_q(
                        "A cylindrical tank of radius $3\\text{ m}$ is being filled at $18\\pi\\text{ m}^3\\text{/min}$. How fast is the water height increasing?",
                        ["$2\\text{ m/min}$", "$3\\text{ m/min}$", "$6\\text{ m/min}$", "$1\\text{ m/min}$"],
                        0,
                        "$V = \\pi r^2 h = \\pi(9)h = 9\\pi h$. $\\frac{dV}{dt} = 9\\pi \\frac{dh}{dt}$. $18\\pi = 9\\pi \\frac{dh}{dt} \\Rightarrow \\frac{dh}{dt} = 2\\text{ m/min}$."
                    ),
                    make_q(
                        "A trough with triangular cross-section (base $2\\text{ m}$, depth $2\\text{ m}$, length $6\\text{ m}$) leaks water at $0.5\\text{ m}^3\\text{/min}$. What is $dh/dt$ when $h = 1\\text{ m}$?",
                        ["$-1/12\\text{ m/min}$", "$-1/6\\text{ m/min}$", "$-1/8\\text{ m/min}$", "$-1/4\\text{ m/min}$"],
                        0,
                        "Cross section base $b = h$. $V = \\frac{1}{2}b h \\times 6 = 3h^2$. $\\frac{dV}{dt} = 6h \\frac{dh}{dt}$. $-0.5 = 6(1)\\frac{dh}{dt} \\Rightarrow \\frac{dh}{dt} = -\\frac{0.5}{6} = -\\frac{1}{12}\\text{ m/min}$."
                    )
                ]
            },
            {
                "heading": "Section 4: Shadows and Angles of Elevation",
                "questions": [
                    make_q(
                        "A 6-ft tall person walks away from a 15-ft streetlight at $4\\text{ ft/s}$. At what rate is the length of the person's shadow increasing?",
                        ["$8/3\\text{ ft/s}$", "$2\\text{ ft/s}$", "$4\\text{ ft/s}$", "$10/3\\text{ ft/s}$"],
                        0,
                        "Similar triangles: $\\frac{s}{6} = \\frac{x + s}{15} \\Rightarrow 15s = 6x + 6s \\Rightarrow 9s = 6x \\Rightarrow s = \\frac{2}{3}x$. $\\frac{ds}{dt} = \\frac{2}{3}\\frac{dx}{dt} = \\frac{2}{3}(4) = \\frac{8}{3}\\text{ ft/s}$."
                    ),
                    make_q(
                        "In the same streetlight scenario, at what rate is the tip of the shadow moving?",
                        ["$20/3\\text{ ft/s}$", "$8/3\\text{ ft/s}$", "$4\\text{ ft/s}$", "$12\\text{ ft/s}$"],
                        0,
                        "Tip position is $x + s = x + \\frac{2}{3}x = \\frac{5}{3}x$. Rate of tip $= \\frac{5}{3}\\frac{dx}{dt} = \\frac{5}{3}(4) = \\frac{20}{3}\\text{ ft/s}$."
                    ),
                    make_q(
                        "An observer $100\\text{ m}$ from a rocket launch site watches a rocket rise vertically at $50\\text{ m/s}$. Find $\\frac{d\\theta}{dt}$ when the rocket is $100\\text{ m}$ high.",
                        ["$0.25\\text{ rad/s}$", "$0.50\\text{ rad/s}$", "$1.00\\text{ rad/s}$", "$0.10\\text{ rad/s}$"],
                        0,
                        "$\\tan\\theta = \\frac{y}{100}$. $\\sec^2\\theta \\frac{d\\theta}{dt} = \\frac{1}{100}\\frac{dy}{dt}$. When $y = 100$, $\\theta = \\pi/4$, so $\\sec^2(\\pi/4) = 2$. $2\\frac{d\\theta}{dt} = \\frac{1}{100}(50) = 0.5 \\Rightarrow \\frac{d\\theta}{dt} = 0.25\\text{ rad/s}$."
                    )
                ]
            }
        ]
    },

    # ── 6.02 Optimization and Curve Sketching ─────────────────────────────────
    {
        "track": "calculus",
        "num": "6.02",
        "slug": "optimization-and-curve-sketching",
        "title": "Optimization and Curve Sketching",
        "sections": [
            {
                "heading": "Section 1: Critical Points and First Derivative Test",
                "questions": [
                    make_q(
                        "Find all critical points of $f(x) = 2x^3 - 9x^2 + 12x - 5$.",
                        ["$x = 1$ and $x = 2$", "$x = -1$ and $x = -2$", "$x = 3$ and $x = 0$", "$x = 2$ only"],
                        0,
                        "$f'(x) = 6x^2 - 18x + 12 = 6(x^2 - 3x + 2) = 6(x - 1)(x - 2) = 0 \\Rightarrow x = 1$ and $x = 2$."
                    ),
                    make_q(
                        "Classify the local extrema of $f(x) = 2x^3 - 9x^2 + 12x - 5$.",
                        ["Local max at $x = 1$; local min at $x = 2$", "Local min at $x = 1$; local max at $x = 2$", "Inflection point at $x = 1$", "Local max at $x = 2$ only"],
                        0,
                        "$f'(x)$ is positive for $x < 1$, negative for $1 < x < 2$, and positive for $x > 2$. By the First Derivative Test, $x = 1$ is a local max and $x = 2$ is a local min."
                    ),
                    make_q(
                        "Find the absolute maximum of $g(x) = 4x - x^2$ on the closed interval $[0, 3]$.",
                        ["$4$", "$3$", "$0$", "$5$"],
                        0,
                        "$g'(x) = 4 - 2x = 0 \\Rightarrow x = 2$. Test critical point and endpoints: $g(0) = 0, g(2) = 4, g(3) = 3$. The absolute maximum is 4 at $x = 2$."
                    )
                ]
            },
            {
                "heading": "Section 2: Concavity and the Second Derivative Test",
                "questions": [
                    make_q(
                        "Determine the interval(s) where $f(x) = x^4 - 4x^3 + 10$ is concave upward.",
                        ["$(-\\infty, 0) \\cup (2, \\infty)$", "$(0, 2)$", "$(2, \\infty)$", "$(-\\infty, 2)$"],
                        0,
                        "$f'(x) = 4x^3 - 12x^2$. $f''(x) = 12x^2 - 24x = 12x(x - 2) > 0 \\Rightarrow x < 0$ or $x > 2$."
                    ),
                    make_q(
                        "Find the $x$-coordinates of all inflection points of $y = x^3 - 6x^2 + 9x$.",
                        ["$x = 2$", "$x = 1$ and $x = 3$", "$x = 0$", "$x = 4$"],
                        0,
                        "$y' = 3x^2 - 12x + 9$. $y'' = 6x - 12 = 0 \\Rightarrow x = 2$. Concavity changes from negative to positive at $x = 2$."
                    ),
                    make_q(
                        "If $f'(3) = 0$ and $f''(3) = -5$, what does the Second Derivative Test conclude about $x = 3$?",
                        ["$f$ has a local maximum at $x = 3$", "$f$ has a local minimum at $x = 3$", "$x = 3$ is an inflection point", "The test is inconclusive"],
                        0,
                        "Since $f'(3) = 0$ and $f''(3) < 0$, the graph is concave down at the critical point, indicating a local maximum."
                    )
                ]
            },
            {
                "heading": "Section 3: Applied Optimization: Perimeter, Area, and Volume",
                "questions": [
                    make_q(
                        "A farmer has $120\\text{ m}$ of fencing to enclose a rectangular field adjacent to a river (no fence needed along the river). What dimensions maximize the enclosed area?",
                        ["Width $= 30\\text{ m}$, Length $= 60\\text{ m}$", "Width $= 40\\text{ m}$, Length $= 40\\text{ m}$", "Width $= 20\\text{ m}$, Length $= 80\\text{ m}$", "Width $= 25\\text{ m}$, Length $= 70\\text{ m}$"],
                        0,
                        "Perimeter: $2w + l = 120 \\Rightarrow l = 120 - 2w$. Area: $A(w) = w(120 - 2w) = 120w - 2w^2$. $A'(w) = 120 - 4w = 0 \\Rightarrow w = 30\\text{ m}, l = 60\\text{ m}$."
                    ),
                    make_q(
                        "An open-top rectangular box is made from a $16\\text{ by } 10\\text{ inch}$ cardboard sheet by cutting equal squares of side $x$ from each corner and folding up the sides. What $x$ maximizes the box volume?",
                        ["$2\\text{ inches}$", "$3\\text{ inches}$", "$1.5\\text{ inches}$", "$2.5\\text{ inches}$"],
                        0,
                        "$V(x) = x(16 - 2x)(10 - 2x) = 4x^3 - 52x^2 + 160x$. $V'(x) = 12x^2 - 104x + 160 = 4(3x^2 - 26x + 40) = 4(3x - 20)(x - 2) = 0$. Since $x < 5$, $x = 2\\text{ inches}$."
                    ),
                    make_q(
                        "A closed cylindrical can must hold $1000\\text{ cm}^3$ of liquid. What relationship between height $h$ and radius $r$ minimizes total surface area?",
                        ["$h = 2r$", "$h = r$", "$h = 4r$", "$h = \\pi r$"],
                        0,
                        "$S = 2\\pi r^2 + 2\\pi r h$. With $V = \\pi r^2 h = 1000 \\Rightarrow h = 1000/(\\pi r^2)$. $S(r) = 2\\pi r^2 + 2000/r$. $S'(r) = 4\\pi r - 2000/r^2 = 0 \\Rightarrow 4\\pi r^3 = 2000 = 2V = 2\\pi r^2 h \\Rightarrow h = 2r$."
                    )
                ]
            },
            {
                "heading": "Section 4: Economics and Distance Optimization",
                "questions": [
                    make_q(
                        "A company's revenue and cost functions are $R(x) = 50x - 0.5x^2$ and $C(x) = 10x + 200$. What production level $x$ maximizes profit?",
                        ["$40$", "$50$", "$30$", "$60$"],
                        0,
                        "Profit $P(x) = R(x) - C(x) = -0.5x^2 + 40x - 200$. $P'(x) = -x + 40 = 0 \\Rightarrow x = 40$."
                    ),
                    make_q(
                        "Find the point on the line $y = 2x + 1$ that is closest to the point $(4, 4)$.",
                        ["$(2, 5)$", "$(1, 3)$", "$(3, 7)$", "$(1.5, 4)$"],
                        0,
                        "Squared distance $D(x) = (x - 4)^2 + (2x + 1 - 4)^2 = (x - 4)^2 + (2x - 3)^2 = x^2 - 8x + 16 + 4x^2 - 12x + 9 = 5x^2 - 20x + 25$. $D'(x) = 10x - 20 = 0 \\Rightarrow x = 2, y = 5$."
                    ),
                    make_q(
                        "A Norman window has the shape of a rectangle surmounted by a semicircle. If the perimeter is $16\\text{ ft}$, what radius $r$ of the semicircle maximizes the light admitted?",
                        ["$\\frac{16}{4 + \\pi}\\text{ ft}$", "$\\frac{8}{2 + \\pi}\\text{ ft}$", "$2\\text{ ft}$", "$\\frac{16}{\\pi}\\text{ ft}$"],
                        0,
                        "Perimeter: $2r + 2h + \\pi r = 16 \\Rightarrow 2h = 16 - (2+\\pi)r$. Area: $A = 2rh + \\frac{1}{2}\\pi r^2 = r(16 - (2+\\pi)r) + \\frac{1}{2}\\pi r^2 = 16r - (2 + \\pi/2)r^2$. $A'(r) = 16 - (4+\\pi)r = 0 \\Rightarrow r = \\frac{16}{4+\\pi}\\text{ ft}$."
                    )
                ]
            }
        ]
    }
]
