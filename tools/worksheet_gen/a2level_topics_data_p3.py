#!/usr/bin/env python3
"""Standardized 4-Page Topic Data for Cambridge A2 Level (Part 3: Topics 12.01 to 15.01)
Probability & Statistics 2 (Paper 6):
- 12.01: Poisson Distribution
- 13.01: Continuous Random Variables
- 14.01: Sampling & Estimation
- 15.01: Hypothesis Testing
"""

def make_q(q, choices, correct, answer):
    return {
        "q": q,
        "choices": choices,
        "correct": correct,
        "answer": answer
    }

A2LEVEL_TOPICS_P3 = [
    # --------------------------------------------------------------------------
    # 12.01: Poisson Distribution
    # --------------------------------------------------------------------------
    {
        "track": "a2level",
        "num": "12.01",
        "slug": "poisson-distribution",
        "title": "Poisson Distribution",
        "sections": [
            {
                "heading": "Section 1: Poisson Probability Formula & Conditions",
                "questions": [
                    make_q(
                        "Which of the following is NOT an essential assumption for modeling a random variable with a Poisson distribution $\\text{Po}(\\lambda)$?",
                        ["Events occur at a variable rate over time", "Events occur singly and independently", "The average rate of occurrence $\\lambda$ is constant", "Two events cannot occur at the exact same instant"],
                        0,
                        "In a Poisson process, events must occur at a constant average rate, independently, at random, and singly."
                    ),
                    make_q(
                        "The random variable $X \\sim \\text{Po}(3.2)$. Find $P(X = 2)$ correct to 4 decimal places.",
                        ["$0.2087$", "$0.2226$", "$0.1782$", "$0.1450$"],
                        0,
                        "$P(X = 2) = \\frac{e^{-3.2} (3.2)^2}{2!} = \\frac{0.0407622 \\times 10.24}{2} = 0.2087$."
                    ),
                    make_q(
                        "If $X \\sim \\text{Po}(\\lambda)$ and $P(X = 0) = 0.05$, find the value of $\\lambda$.",
                        ["$\\lambda = -\\ln(0.05) \\approx 2.996$", "$\\lambda = 0.05$", "$\\lambda = e^{0.05} \\approx 1.051$", "$\\lambda = 20$"],
                        0,
                        "$P(X = 0) = e^{-\\lambda} = 0.05 \\Rightarrow -\\lambda = \\ln(0.05) \\Rightarrow \\lambda = -\\ln(0.05) \\approx 2.996$."
                    )
                ]
            },
            {
                "heading": "Section 2: Mean, Variance & Linear Combinations",
                "questions": [
                    make_q(
                        "What is the theoretical relationship between the mean and variance of a Poisson distribution $X \\sim \\text{Po}(\\lambda)$?",
                        ["Mean $= \\text{Variance} = \\lambda$", "Mean $= \\lambda, \\text{Variance} = \\lambda^2$", "Mean $= \\lambda, \\text{Variance} = \\sqrt{\\lambda}$", "Mean $= \\lambda, \\text{Variance} = \\lambda(1 - p)$"],
                        0,
                        "A defining property of the Poisson distribution is that its mean and variance are equal: $E(X) = \\text{Var}(X) = \\lambda$."
                    ),
                    make_q(
                        "Independent random variables $X \\sim \\text{Po}(2)$ and $Y \\sim \\text{Po}(3)$ represent customer arrivals. What distribution does $X + Y$ follow?",
                        ["$\\text{Po}(5)$", "$\\text{Po}(6)$", "$\\text{Po}(2.5)$", "$N(5, 5)$"],
                        0,
                        "The sum of independent Poisson variables is also Poisson: $X + Y \\sim \\text{Po}(\\lambda_X + \\lambda_Y) = \\text{Po}(2 + 3) = \\text{Po}(5)$."
                    ),
                    make_q(
                        "Faults on a fiber optic cable occur at an average rate of 0.4 per kilometer. What is the probability of finding exactly 1 fault in a 5-kilometer section?",
                        ["$0.2707$", "$0.4000$", "$0.1353$", "$0.3250$"],
                        0,
                        "Rate for 5 km is $\\lambda = 0.4 \\times 5 = 2.0$. Then $P(X = 1) = \\frac{e^{-2} (2)^1}{1!} = 2e^{-2} = 2(0.135335) \\approx 0.2707$."
                    )
                ]
            },
            {
                "heading": "Section 3: Poisson Approximation to the Binomial",
                "questions": [
                    make_q(
                        "Under which conditions can a binomial distribution $B(n, p)$ be well approximated by a Poisson distribution?",
                        ["$n > 50$ and $np < 5$", "$n > 30$ and $p = 0.5$", "$np > 5$ and $n(1 - p) > 5$", "$n < 20$ and $p > 0.1$"],
                        0,
                        "The Poisson approximation to the binomial is appropriate when the number of trials $n$ is large ($n > 50$) and the probability of success $p$ is small ($np < 5$), with parameter $\\lambda = np$."
                    ),
                    make_q(
                        "A book of 400 pages contains 200 typographical errors distributed at random. Use a Poisson approximation to find the probability that a randomly chosen page contains no errors.",
                        ["$e^{-0.5} \\approx 0.6065$", "$0.5000$", "$0.3679$", "$0.7500$"],
                        0,
                        "Average errors per page $\\lambda = 200/400 = 0.5$. $P(X = 0) = e^{-0.5} \\approx 0.6065$."
                    ),
                    make_q(
                        "A factory produces screws, of which 1% are defective. In a random sample of 250 screws, what is the Poisson parameter $\\lambda$ to model defective screws?",
                        ["$\\lambda = 2.5$", "$\\lambda = 0.01$", "$\\lambda = 25$", "$\\lambda = 5$"],
                        0,
                        "$\\lambda = np = 250 \\times 0.01 = 2.5$."
                    )
                ]
            },
            {
                "heading": "Section 4: Normal Approximation to the Poisson Distribution",
                "questions": [
                    make_q(
                        "Under what condition can a Poisson distribution $X \\sim \\text{Po}(\\lambda)$ be approximated by a normal distribution?",
                        ["$\\lambda > 15$", "$\\lambda < 5$", "$\\lambda$ is an integer", "$\\lambda > 100$ only"],
                        0,
                        "When $\\lambda > 15$, the distribution is sufficiently symmetric to be approximated by $N(\\lambda, \\lambda)$."
                    ),
                    make_q(
                        "If $X \\sim \\text{Po}(36)$, which normal distribution provides the best approximation?",
                        ["$N(36, 36)$ with mean 36 and variance 36", "$N(36, 6)$", "$N(0, 1)$", "$N(36, 18)$"],
                        0,
                        "Since mean and variance of $\\text{Po}(\\lambda)$ are both $\\lambda$, the approximating normal distribution is $N(\\lambda, \\lambda) = N(36, 36)$."
                    ),
                    make_q(
                        "For $X \\sim \\text{Po}(36)$, use the normal approximation with continuity correction to state the calculation for $P(X \\leq 40)$.",
                        ["$P(Y < 40.5)$ where $Y \\sim N(36, 36)$", "$P(Y < 40)$ where $Y \\sim N(36, 36)$", "$P(Y < 39.5)$ where $Y \\sim N(36, 36)$", "$P(Y < 41)$ where $Y \\sim N(36, 6)$"],
                        0,
                        "For discrete $X \\leq 40$, the continuity correction extends to the upper boundary $40.5$: $P(Y < 40.5)$."
                    )
                ]
            }
        ]
    },

    # --------------------------------------------------------------------------
    # 13.01: Continuous Random Variables
    # --------------------------------------------------------------------------
    {
        "track": "a2level",
        "num": "13.01",
        "slug": "continuous-random-variables",
        "title": "Continuous Random Variables",
        "sections": [
            {
                "heading": "Section 1: Probability Density Functions (PDF)",
                "questions": [
                    make_q(
                        "A continuous random variable $X$ has PDF $f(x) = kx(2 - x)$ for $0 \\leq x \\leq 2$, and $0$ otherwise. Find the value of $k$.",
                        ["$\\dfrac{3}{4}$", "$\\dfrac{1}{2}$", "$\\dfrac{3}{8}$", "$1$"],
                        0,
                        "Total probability must equal 1: $\\int_0^2 k(2x - x^2) dx = k[x^2 - x^3/3]_0^2 = k(4 - 8/3) = k(4/3) = 1 \\Rightarrow k = 3/4$."
                    ),
                    make_q(
                        "For the random variable in the previous question ($k = 3/4$), calculate $P(0 \\leq X \\leq 1)$.",
                        ["$\\dfrac{1}{2}$", "$\\dfrac{3}{8}$", "$\\dfrac{1}{4}$", "$\\dfrac{5}{8}$"],
                        0,
                        "$P(0 \\leq X \\leq 1) = \\frac{3}{4} \\int_0^1 (2x - x^2) dx = \\frac{3}{4}[x^2 - x^3/3]_0^1 = \\frac{3}{4}(1 - 1/3) = \\frac{3}{4}(2/3) = \\frac{1}{2}$."
                    ),
                    make_q(
                        "What is the probability that a continuous random variable takes any single exact value, such as $P(X = c)$?",
                        ["$0$", "$1$", "$f(c)$", "$f'(c)$"],
                        0,
                        "For any continuous distribution, the probability of taking any exact single point is zero ($P(X = c) = \\int_c^c f(x) dx = 0$)."
                    )
                ]
            },
            {
                "heading": "Section 2: Cumulative Distribution Function $F(x)$",
                "questions": [
                    make_q(
                        "Given PDF $f(x) = \\dfrac{3}{8}x^2$ for $0 \\leq x \\leq 2$, find the cumulative distribution function $F(x)$ for $0 \\leq x \\leq 2$.",
                        ["$F(x) = \\dfrac{x^3}{8}$", "$F(x) = \\dfrac{3x^3}{8}$", "$F(x) = \\dfrac{x^2}{4}$", "$F(x) = \\dfrac{x^3}{2}$"],
                        0,
                        "$F(x) = \\int_0^x f(t) dt = \\int_0^x \\frac{3}{8}t^2 dt = \\left[\\frac{t^3}{8}\\right]_0^x = \\frac{x^3}{8}$."
                    ),
                    make_q(
                        "For the distribution in the previous question, find the median $m$.",
                        ["$m = \\sqrt[3]{4} \\approx 1.587$", "$m = 1.0$", "$m = \\sqrt{2} \\approx 1.414$", "$m = 1.5$"],
                        0,
                        "Set $F(m) = 0.5 \\Rightarrow \\frac{m^3}{8} = 0.5 \\Rightarrow m^3 = 4 \\Rightarrow m = 4^{1/3} \\approx 1.587$."
                    ),
                    make_q(
                        "Given $F(x) = \\dfrac{x^2 - 1}{8}$ for $1 \\leq x \\leq 3$, find the PDF $f(x)$ on this interval.",
                        ["$f(x) = \\dfrac{x}{4}$", "$f(x) = \\dfrac{x}{8}$", "$f(x) = \\dfrac{x^2}{8}$", "$f(x) = \\dfrac{2x - 1}{8}$"],
                        0,
                        "The PDF is the derivative of the CDF: $f(x) = F'(x) = \\frac{d}{dx}\\left[\\frac{x^2 - 1}{8}\\right] = \\frac{2x}{8} = \\frac{x}{4}$."
                    )
                ]
            },
            {
                "heading": "Section 3: Mean, Variance & Medians",
                "questions": [
                    make_q(
                        "Find the expected value $E(X)$ for the PDF $f(x) = 2x$ on $[0, 1]$.",
                        ["$\\dfrac{2}{3}$", "$\\dfrac{1}{2}$", "$\\dfrac{3}{4}$", "$\\dfrac{1}{3}$"],
                        0,
                        "$E(X) = \\int_0^1 x f(x) dx = \\int_0^1 2x^2 dx = [2x^3/3]_0^1 = 2/3$."
                    ),
                    make_q(
                        "For the distribution $f(x) = 2x$ on $[0, 1]$, calculate the variance $\\text{Var}(X)$.",
                        ["$\\dfrac{1}{18}$", "$\\dfrac{1}{9}$", "$\\dfrac{1}{12}$", "$\\dfrac{2}{9}$"],
                        0,
                        "$E(X^2) = \\int_0^1 2x^3 dx = [x^4/2]_0^1 = 1/2$. $\\text{Var}(X) = E(X^2) - [E(X)]^2 = 1/2 - (2/3)^2 = 1/2 - 4/9 = 1/18$."
                    ),
                    make_q(
                        "Find the mode of the continuous distribution with PDF $f(x) = 12x^2(1 - x)$ for $0 \\leq x \\leq 1$.",
                        ["$\\dfrac{2}{3}$", "$\\dfrac{1}{2}$", "$\\dfrac{3}{4}$", "$\\dfrac{1}{3}$"],
                        0,
                        "The mode is where $f(x)$ is maximized: $f'(x) = 24x - 36x^2 = 12x(2 - 3x) = 0 \\Rightarrow x = 2/3$."
                    )
                ]
            },
            {
                "heading": "Section 4: Piecewise Distributions & Examination Standards",
                "questions": [
                    make_q(
                        "A continuous random variable has PDF $f(x) = cx$ for $0 \\leq x < 2$ and $f(x) = c(4 - x)$ for $2 \\leq x \\leq 4$. Find $c$.",
                        ["$\\dfrac{1}{4}$", "$\\dfrac{1}{2}$", "$\\dfrac{1}{8}$", "$1$"],
                        0,
                        "The PDF forms a symmetric triangle with base 4 and height $2c$. Area $= \\frac{1}{2}(4)(2c) = 4c = 1 \\Rightarrow c = 1/4$."
                    ),
                    make_q(
                        "For the symmetric triangular distribution in the previous question, what is $E(X)$?",
                        ["2", "1", "3", "2.5"],
                        0,
                        "By symmetry of the PDF about $x = 2$, the expected value must equal the line of symmetry: $E(X) = 2$."
                    ),
                    make_q(
                        "Find the lower quartile $Q_1$ for the triangular distribution in the previous question ($c = 1/4$).",
                        ["$\\sqrt{2} \\approx 1.414$", "$1.0$", "$1.5$", "$\\sqrt{3} \\approx 1.732$"],
                        0,
                        "For $x \\leq 2$: $F(x) = \\int_0^x \\frac{1}{4}t dt = \\frac{x^2}{8}$. Set $F(Q_1) = 0.25 \\Rightarrow \\frac{Q_1^2}{8} = \\frac{1}{4} \\Rightarrow Q_1^2 = 2 \\Rightarrow Q_1 = \\sqrt{2} \\approx 1.414$."
                    )
                ]
            }
        ]
    },

    # --------------------------------------------------------------------------
    # 14.01: Sampling & Estimation
    # --------------------------------------------------------------------------
    {
        "track": "a2level",
        "num": "14.01",
        "slug": "sampling-estimation",
        "title": "Sampling & Estimation",
        "sections": [
            {
                "heading": "Section 1: Unbiased Estimators of Population Mean & Variance",
                "questions": [
                    make_q(
                        "What is the unbiased estimator of the population variance $\\sigma^2$ calculated from a random sample of size $n$?",
                        ["$s^2 = \\dfrac{1}{n - 1}\\sum (x_i - \\bar{x})^2$", "$s^2 = \\dfrac{1}{n}\\sum (x_i - \\bar{x})^2$", "$s^2 = \\dfrac{1}{n + 1}\\sum (x_i - \\bar{x})^2$", "$s^2 = \\sum (x_i - \\bar{x})^2$"],
                        0,
                        "Dividing by $n - 1$ instead of $n$ removes bias, making $s^2 = \\frac{1}{n-1}\\sum (x_i - \\bar{x})^2$ the unbiased estimator of $\\sigma^2$."
                    ),
                    make_q(
                        "A random sample of 10 observations has $\\sum x = 80$ and $\\sum x^2 = 724$. Calculate the unbiased estimate of the population variance.",
                        ["$9.33$", "$8.40$", "$10.50$", "$7.20$"],
                        0,
                        "$s^2 = \\frac{1}{n-1}\\left[\\sum x^2 - \\frac{(\\sum x)^2}{n}\\right] = \\frac{1}{9}\\left[724 - \\frac{6400}{10}\\right] = \\frac{1}{9}[724 - 640] = \\frac{84}{9} \\approx 9.33$."
                    ),
                    make_q(
                        "If the biased sample variance is $v = 18$ from a sample of size $n = 25$, find the unbiased estimate $s^2$.",
                        ["$18.75$", "$17.28$", "$18.00$", "$19.50$"],
                        0,
                        "$s^2 = \\frac{n}{n - 1} v = \\frac{25}{24}(18) = 18.75$."
                    )
                ]
            },
            {
                "heading": "Section 2: The Central Limit Theorem (CLT)",
                "questions": [
                    make_q(
                        "State the Central Limit Theorem for the distribution of the sample mean $\\bar{X}$.",
                        ["For large $n$, $\\bar{X}$ is approximately normal $N(\\mu, \\sigma^2/n)$ regardless of the population distribution", "For any $n$, $\\bar{X}$ is strictly normal", "For large $n$, the population becomes normal", "$\\bar{X}$ has mean $n\\mu$ and variance $n\\sigma^2$"],
                        0,
                        "The CLT states that the sample mean $\\bar{X}$ of a random sample from ANY distribution with mean $\\mu$ and variance $\\sigma^2$ is approximately normally distributed $N(\\mu, \\sigma^2/n)$ as $n \\to \\infty$ (typically $n \\geq 30$)."
                    ),
                    make_q(
                        "A population has mean 100 and standard deviation 15. A sample of size $n = 36$ is taken. What is the standard error of the sample mean?",
                        ["$2.5$", "$15$", "$4.17$", "$0.417$"],
                        0,
                        "Standard error $\\text{SE} = \\frac{\\sigma}{\\sqrt{n}} = \\frac{15}{\\sqrt{36}} = \\frac{15}{6} = 2.5$."
                    ),
                    make_q(
                        "Using the distribution from the previous question ($\\mu = 100, \\text{SE} = 2.5$), find $P(\\bar{X} > 105)$.",
                        ["$0.0228$", "$0.0500$", "$0.0456$", "$0.0100$"],
                        0,
                        "$z = \\frac{105 - 100}{2.5} = 2.0$. $P(\\bar{X} > 105) = 1 - \\Phi(2.0) = 1 - 0.9772 = 0.0228$."
                    )
                ]
            },
            {
                "heading": "Section 3: Confidence Intervals for the Population Mean",
                "questions": [
                    make_q(
                        "A sample of size $n = 64$ from a normal population with known $\\sigma = 8$ has sample mean $\\bar{x} = 52.0$. Find the $95\\%$ confidence interval for $\\mu$.",
                        ["$[50.04, 53.96]$", "$[49.50, 54.50]$", "$[50.36, 53.64]$", "$[51.00, 53.00]$"],
                        0,
                        "$\\text{Margin of error} = z_{\\alpha/2}\\frac{\\sigma}{\\sqrt{n}} = 1.96 \\times \\frac{8}{8} = 1.96$. Interval $= 52.0 \\pm 1.96 = [50.04, 53.96]$."
                    ),
                    make_q(
                        "What is the critical value $z$ used to construct a $99\\%$ confidence interval for the population mean?",
                        ["$2.576$", "$1.960$", "$1.645$", "$2.326$"],
                        0,
                        "For a 99% two-tailed confidence interval, $1 - \\alpha = 0.99 \\Rightarrow \\alpha/2 = 0.005$. $\\Phi(2.576) = 0.995$."
                    ),
                    make_q(
                        "How large must a sample be so that the width of a $95\\%$ confidence interval for $\\mu$ is at most 2 units, given $\\sigma = 10$?",
                        ["At least 385", "At least 100", "At least 196", "At least 250"],
                        0,
                        "Width $= 2 z \\frac{\\sigma}{\\sqrt{n}} \\leq 2 \\Rightarrow z \\frac{\\sigma}{\\sqrt{n}} \\leq 1 \\Rightarrow 1.96 \\times \\frac{10}{\\sqrt{n}} \\leq 1 \\Rightarrow \\sqrt{n} \\geq 19.6 \\Rightarrow n \\geq 19.6^2 = 384.16$. Least integer is 385."
                    )
                ]
            },
            {
                "heading": "Section 4: Confidence Intervals for Large Unknown-Variance Samples",
                "questions": [
                    make_q(
                        "When $\\sigma^2$ is unknown but the sample size $n = 100$ is large, what is substituted for $\\sigma^2$ in calculating the confidence interval?",
                        ["The unbiased sample variance estimate $s^2$", "The sample range divided by 4", "The median absolute deviation", "A default value of 1.0"],
                        0,
                        "By the Central Limit Theorem and Slutsky's theorem, when $n$ is large, the unknown population variance $\\sigma^2$ is replaced by the unbiased sample variance estimate $s^2$."
                    ),
                    make_q(
                        "A sample of 100 lightbulbs has mean life $\\bar{x} = 1200$ hours and unbiased sample variance $s^2 = 2500$. Find the $90\\%$ confidence interval for the true mean life.",
                        ["$[1191.8, 1208.2]$", "$[1180.0, 1220.0]$", "$[1190.2, 1209.8]$", "$[1195.0, 1205.0]$"],
                        0,
                        "$s = \\sqrt{2500} = 50$. Standard error $= 50/\\sqrt{100} = 5$. For 90% confidence, $z = 1.645$. Margin $= 1.645(5) = 8.225$. Interval is $[1191.8, 1208.2]$."
                    ),
                    make_q(
                        "What is the correct probabilistic interpretation of a $95\\%$ confidence interval $[L, U]$ for $\\mu$?",
                        ["In repeated sampling, $95\\%$ of such constructed intervals will contain the true parameter $\\mu$", "There is a $95\\%$ probability that $\\mu$ lies in this specific interval", "$95\\%$ of population values fall between $L$ and $U$", "The sample mean falls in $[L, U]$ $95\\%$ of the time"],
                        0,
                        "The parameter $\\mu$ is a fixed unknown constant; the interval endpoints are random variables. $95\\%$ of intervals generated by this procedure over repeated samples will capture $\\mu$."
                    )
                ]
            }
        ]
    },

    # --------------------------------------------------------------------------
    # 15.01: Hypothesis Testing
    # --------------------------------------------------------------------------
    {
        "track": "a2level",
        "num": "15.01",
        "slug": "hypothesis-testing",
        "title": "Hypothesis Testing",
        "sections": [
            {
                "heading": "Section 1: Null & Alternative Hypotheses, Type I & Type II Errors",
                "questions": [
                    make_q(
                        "Define a Type I error in hypothesis testing.",
                        ["Rejecting $H_0$ when $H_0$ is actually true", "Failing to reject $H_0$ when $H_0$ is false", "Setting the significance level too high", "Accepting $H_1$ when it is false"],
                        0,
                        "A Type I error occurs when a true null hypothesis is incorrectly rejected. The probability of a Type I error equals the significance level $\\alpha$."
                    ),
                    make_q(
                        "Define a Type II error in hypothesis testing.",
                        ["Failing to reject $H_0$ when $H_0$ is false", "Rejecting $H_0$ when $H_0$ is true", "Computing an incorrect test statistic", "Rejecting $H_1$ when $H_0$ is true"],
                        0,
                        "A Type II error (probability $\\beta$) occurs when the test fails to reject a false null hypothesis."
                    ),
                    make_q(
                        "A machine produces metal pins with mean length 5.0 cm. A technician suspects the machine is out of adjustment and producing pins of different mean length. What are the appropriate hypotheses?",
                        ["$H_0: \\mu = 5.0$, $H_1: \\mu \\neq 5.0$", "$H_0: \\mu = 5.0$, $H_1: \\mu > 5.0$", "$H_0: \\mu \\neq 5.0$, $H_1: \\mu = 5.0$", "$H_0: \\mu = 5.0$, $H_1: \\mu < 5.0$"],
                        0,
                        "A non-directional suspicion ('different mean length') requires a two-tailed alternative hypothesis $H_1: \\mu \\neq 5.0$."
                    )
                ]
            },
            {
                "heading": "Section 2: Testing Population Mean with Normal Distribution",
                "questions": [
                    make_q(
                        "A test of $H_0: \\mu = 80$ against $H_1: \\mu > 80$ at the $5\\%$ level is conducted. A sample of $n = 36$ from $N(\\mu, 144)$ gives $\\bar{x} = 83.5$. What is the value of the test statistic $z$?",
                        ["$z = 1.75$", "$z = 1.645$", "$z = 2.00$", "$z = 0.875$"],
                        0,
                        "$\\sigma = 12$, $\\text{SE} = 12/\\sqrt{36} = 2.0$. Test statistic $z = \\frac{83.5 - 80}{2.0} = \\frac{3.5}{2.0} = 1.75$."
                    ),
                    make_q(
                        "For the test in the previous question ($z = 1.75$), what is the test conclusion at the $5\\%$ significance level (critical value $1.645$)?",
                        ["Reject $H_0$; there is sufficient evidence that the mean is greater than 80", "Fail to reject $H_0$; insufficient evidence", "Accept $H_0$; the difference is due to chance", "Test is inconclusive"],
                        0,
                        "Since $z = 1.75 > 1.645$, the test statistic falls in the critical region. Reject $H_0$ at the 5% level."
                    ),
                    make_q(
                        "What is the $p$-value for the test statistic $z = 1.75$ in a one-tailed test?",
                        ["$0.0401$", "$0.0802$", "$0.9599$", "$0.0250$"],
                        0,
                        "$p\\text{-value} = 1 - \\Phi(1.75) = 1 - 0.9599 = 0.0401$."
                    )
                ]
            },
            {
                "heading": "Section 3: Testing Parameters with Poisson & Binomial Models",
                "questions": [
                    make_q(
                        "A company claims its weekly defect rate is $\\lambda = 2$. In a given week, 6 defects are observed. Test $H_0: \\lambda = 2$ against $H_1: \\lambda > 2$ by calculating $P(X \\geq 6)$ under $H_0$.",
                        ["$0.0166$", "$0.0527$", "$0.0345$", "$0.0045$"],
                        0,
                        "For $\\text{Po}(2)$: $P(X \\leq 5) = e^{-2}(1 + 2 + 2 + 4/3 + 2/3 + 4/15) = e^{-2}(109/15) = 0.135335 \\times 7.2667 \\approx 0.9834$. $P(X \\geq 6) = 1 - 0.9834 = 0.0166$."
                    ),
                    make_q(
                        "At the $5\\%$ significance level, what is the conclusion for the defect test in the previous question ($p = 0.0166$)?",
                        ["Reject $H_0$; the defect rate has significantly increased", "Fail to reject $H_0$", "Accept $H_0$", "Change the significance level to $1\\%$"],
                        0,
                        "Since $p = 0.0166 < 0.05$, reject $H_0$ at the 5% level."
                    ),
                    make_q(
                        "A seed packet claims a $90\\%$ germination rate. A gardener tests 20 seeds and finds 15 germinate. To test $H_0: p = 0.9$ against $H_1: p < 0.9$, which probability must be computed?",
                        ["$P(X \\leq 15)$ where $X \\sim B(20, 0.9)$", "$P(X = 15)$ where $X \\sim B(20, 0.9)$", "$P(X \\geq 15)$ where $X \\sim B(20, 0.9)$", "$P(X \\leq 15)$ where $X \\sim N(18, 1.8)$"],
                        0,
                        "For a lower-tail test ($H_1: p < 0.9$), the $p$-value is the probability of observing an outcome as extreme as or more extreme than the observed value: $P(X \\leq 15)$."
                    )
                ]
            },
            {
                "heading": "Section 4: Critical Regions & Power of a Test",
                "questions": [
                    make_q(
                        "For a test of $H_0: \\mu = 50$ vs $H_1: \\mu < 50$ using $n = 25, \\sigma = 10$, find the critical value for $\\bar{x}$ at the $5\\%$ level ($z_c = -1.645$).",
                        ["$46.71$", "$45.00$", "$47.50$", "$46.00$"],
                        0,
                        "$\\text{Critical value} = \\mu_0 - z_c \\frac{\\sigma}{\\sqrt{n}} = 50 - 1.645\\left(\\frac{10}{5}\\right) = 50 - 1.645(2) = 50 - 3.29 = 46.71$."
                    ),
                    make_q(
                        "In the previous test (critical region $\\bar{X} < 46.71$), what is the probability of a Type II error if the true mean is $\\mu = 45$?",
                        ["$0.1964$", "$0.8036$", "$0.0500$", "$0.3085$"],
                        0,
                        "Type II error $\\beta = P(\\bar{X} \\geq 46.71 \\mid \\mu = 45)$. Under $\\mu = 45$: $z = \\frac{46.71 - 45}{2.0} = 0.855$. $\\beta = 1 - \\Phi(0.855) = 1 - 0.8037 = 0.1963 \\approx 0.1964$."
                    ),
                    make_q(
                        "What is the statistical power of the test in the previous question (where $\\beta = 0.1964$)?",
                        ["$0.8036$", "$0.1964$", "$0.9500$", "$0.0500$"],
                        0,
                        "Power of a test is defined as $1 - \\beta = 1 - 0.1964 = 0.8036$ (or $80.36\\%$)."
                    )
                ]
            }
        ]
    }
]
