#!/usr/bin/env python3
"""Standardized 4-Page Topic Data for AP Statistics - Part 2 (Topics 3.01 to 4.02).

Authentic College Board AP Statistics questions adhering strictly to the official CED.
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

APSTATS_TOPICS_P2 = [
    # --------------------------------------------------------------------------
    # APSTATS 3.01: Probability Rules & Conditional Probability
    # --------------------------------------------------------------------------
    {
        "track": "apstats",
        "num": "3.01",
        "slug": "probability-rules-and-conditional-probability",
        "title": "Probability Rules & Conditional Probability",
        "sections": [
            {
                "heading": "Section 1: General Addition Rule & Mutually Exclusive Events",
                "questions": [
                    make_q(
                        "If $P(A) = 0.40$, $P(B) = 0.35$, and $P(A \\cap B) = 0.15$, what is $P(A \\cup B)$?",
                        ["$0.60$", "$0.75$", "$0.90$", "$0.25$"],
                        0,
                        "By the General Addition Rule: $P(A \\cup B) = P(A) + P(B) - P(A \\cap B) = 0.40 + 0.35 - 0.15 = 0.60$."
                    ),
                    make_q(
                        "Two events $E$ and $F$ are mutually exclusive (disjoint). If $P(E) = 0.28$ and $P(F) = 0.45$, what is $P(E \\cap F)$?",
                        ["$0$", "$0.126$", "$0.73$", "$0.17$"],
                        0,
                        "By definition, mutually exclusive events cannot happen simultaneously; therefore $P(E \\cap F) = 0$."
                    ),
                    make_q(
                        "Can two events with non-zero probabilities be both mutually exclusive and independent?",
                        [
                            "No, if they are mutually exclusive, the occurrence of one prevents the other, meaning they are dependent",
                            "Yes, mutually exclusive and independent are synonyms in probability",
                            "Only if the sum of their probabilities equals 1",
                            "Yes, as long as their intersection is zero"
                        ],
                        0,
                        "If $A$ and $B$ are disjoint, $P(A \\cap B) = 0$. For independence, $P(A \\cap B) = P(A)P(B) > 0$. Since $0 \\neq P(A)P(B)$, they cannot be both mutually exclusive and independent."
                    )
                ]
            },
            {
                "heading": "Section 2: Conditional Probability Formula",
                "questions": [
                    make_q(
                        "If $P(A) = 0.50$ and $P(A \\cap B) = 0.20$, what is the conditional probability $P(B \\mid A)$?",
                        ["$0.40$", "$0.10$", "$0.70$", "$0.25$"],
                        0,
                        "By the conditional probability formula: $P(B \\mid A) = \\frac{P(A \\cap B)}{P(A)} = \\frac{0.20}{0.50} = 0.40$."
                    ),
                    make_q(
                        "In a high school, $60\\%$ of students take math, and $18\\%$ take both math and art. Given that a randomly chosen student takes math, what is the probability they also take art?",
                        ["$0.30$", "$0.18$", "$0.42$", "$0.108$"],
                        0,
                        "$P(\\text{Art} \\mid \\text{Math}) = \\frac{P(\\text{Art} \\cap \\text{Math})}{P(\\text{Math})} = \\frac{0.18}{0.60} = 0.30$."
                    ),
                    make_q(
                        "Which statement mathematically proves that two events $A$ and $B$ are independent?",
                        [
                            "$P(A \\mid B) = P(A)$",
                            "$P(A \\cup B) = P(A) + P(B)$",
                            "$P(A \\cap B) = 0$",
                            "$P(A) = P(B)$"
                        ],
                        0,
                        "Events $A$ and $B$ are independent if knowing that $B$ occurred does not change the probability of $A$, meaning $P(A \\mid B) = P(A)$ (or $P(A \\cap B) = P(A)P(B)$)."
                    )
                ]
            },
            {
                "heading": "Section 3: Multiplication Rule and Tree Diagrams",
                "questions": [
                    make_q(
                        "A bag contains $5$ red marbles and $3$ blue marbles. Two marbles are drawn at random without replacement. What is the probability that both are red?",
                        ["$\\frac{5}{14}$", "$\\frac{25}{64}$", "$\\frac{5}{8}$", "$\\frac{10}{56}$"],
                        0,
                        "$P(R_1) = \\frac{5}{8}$. Without replacement, $P(R_2 \\mid R_1) = \\frac{4}{7}$. $P(R_1 \\cap R_2) = \\frac{5}{8} \\times \\frac{4}{7} = \\frac{20}{56} = \\frac{5}{14}$."
                    ),
                    make_q(
                        "If two events $C$ and $D$ are independent with $P(C) = 0.60$ and $P(D) = 0.70$, what is $P(C \\cap D)$?",
                        ["$0.42$", "$1.30$", "$0.10$", "$0.65$"],
                        0,
                        "For independent events, $P(C \\cap D) = P(C) \\times P(D) = 0.60 \\times 0.70 = 0.42$."
                    ),
                    make_q(
                        "A factory has Machine A producing $60\\%$ of items ($2\\%$ defective) and Machine B producing $40\\%$ ($5\\%$ defective). What is the total probability that a randomly chosen item is defective?",
                        ["$0.032$", "$0.070$", "$0.025$", "$0.012$"],
                        0,
                        "By the Law of Total Probability: $P(D) = P(A)P(D|A) + P(B)P(D|B) = (0.60)(0.02) + (0.40)(0.05) = 0.012 + 0.020 = 0.032$."
                    )
                ]
            },
            {
                "heading": "Section 4: Bayes' Theorem in Context",
                "questions": [
                    make_q(
                        "Continuing the factory problem: if an item is found to be defective, what is the probability it came from Machine A?",
                        ["$\\frac{0.012}{0.032} = 0.375$", "$\\frac{0.60}{0.032}$", "$0.60$", "$0.020$"],
                        0,
                        "By Bayes' Theorem: $P(A \\mid D) = \\frac{P(A \\cap D)}{P(D)} = \\frac{0.012}{0.032} = \\frac{3}{8} = 0.375$."
                    ),
                    make_q(
                        "A diagnostic test has $99\\%$ sensitivity ($P(+|D) = 0.99$) and $95\\%$ specificity ($P(-|D^c) = 0.95$). If a rare disease affects $1\\%$ of the population ($P(D) = 0.01$), what is the probability that a person who tests positive actually has the disease?",
                        [
                            "$\\approx 0.166$ (about $16.6\\%$)",
                            "$\\approx 0.990$ ($99\\%$)",
                            "$\\approx 0.950$ ($95\\%$)",
                            "$\\approx 0.500$ ($50\\%$)"
                        ],
                        0,
                        "$P(+) = (0.01)(0.99) + (0.99)(0.05) = 0.0099 + 0.0495 = 0.0594$. Then $P(D \\mid +) = \\frac{0.0099}{0.0594} \\approx 0.1667$."
                    ),
                    make_q(
                        "What is $P(A^c \\cup B^c)$ equivalent to by De Morgan's Laws?",
                        [
                            "$1 - P(A \\cap B)$",
                            "$1 - P(A \\cup B)$",
                            "$P(A) + P(B)$",
                            "$P(A \\cap B)$"
                        ],
                        0,
                        "By De Morgan's Law, $A^c \\cup B^c = (A \\cap B)^c$. Therefore $P(A^c \\cup B^c) = 1 - P(A \\cap B)$."
                    )
                ]
            }
        ]
    },

    # --------------------------------------------------------------------------
    # APSTATS 3.02: Discrete Random Variables & Binomial Distributions
    # --------------------------------------------------------------------------
    {
        "track": "apstats",
        "num": "3.02",
        "slug": "discrete-random-variables-and-binomial",
        "title": "Discrete Random Variables & Binomial Distributions",
        "sections": [
            {
                "heading": "Section 1: Expected Value of a Discrete Random Variable",
                "questions": [
                    make_q(
                        "A discrete random variable $X$ has distribution: $P(X=0)=0.2, P(X=1)=0.5, P(X=2)=0.3$. Find $E(X)$.",
                        ["$1.1$", "$1.0$", "$1.5$", "$0.8$"],
                        0,
                        "$E(X) = \\sum x_i P(x_i) = 0(0.2) + 1(0.5) + 2(0.3) = 0 + 0.5 + 0.6 = 1.1$."
                    ),
                    make_q(
                        "A carnival game costs 5 dollars to play. There is a $10\\%$ chance to win 20 dollars, a $30\\%$ chance to win 5 dollars, and a $60\\%$ chance to win nothing. What is the player's expected net gain?",
                        ["$-1.50\\text{ dollars}$", "$3.50\\text{ dollars}$", "$-0.50\\text{ dollars}$", "$0.00\\text{ dollars}$"],
                        0,
                        "Expected payout: $20(0.10) + 5(0.30) + 0(0.60) = 2.00 + 1.50 = 3.50$ dollars. Net expected gain: $3.50 - 5.00 = -1.50$ dollars."
                    ),
                    make_q(
                        "If $E(X) = 12$ and $Y = 3X - 5$, what is $E(Y)$?",
                        ["$31$", "$36$", "$41$", "$12$"],
                        0,
                        "By linearity of expectation: $E(Y) = E(3X - 5) = 3E(X) - 5 = 3(12) - 5 = 36 - 5 = 31$."
                    )
                ]
            },
            {
                "heading": "Section 2: Variance & Standard Deviation of Combinations",
                "questions": [
                    make_q(
                        "Independent random variables $X$ and $Y$ have $\\text{SD}(X) = 3$ and $\\text{SD}(Y) = 4$. What is $\\text{SD}(X - Y)$?",
                        ["$5$", "$1$", "$-1$", "$7$"],
                        0,
                        "For independent variables, variances always add: $\\text{Var}(X - Y) = \\text{Var}(X) + \\text{Var}(Y) = 3^2 + 4^2 = 9 + 16 = 25$. Thus $\\text{SD}(X - Y) = \\sqrt{25} = 5$."
                    ),
                    make_q(
                        "If $\\text{SD}(X) = 6$, what is $\\text{SD}(4X + 10)$?",
                        ["$24$", "$34$", "$144$", "$6$"],
                        0,
                        "Adding a constant has zero effect on spread: $\\text{SD}(aX + b) = |a|\\text{SD}(X) = 4(6) = 24$."
                    ),
                    make_q(
                        "Why must variances be added rather than standard deviations when combining independent variables?",
                        [
                            "Standard deviations are not in squared units, while the Pythagorean relationship of orthogonal independent variables governs variances",
                            "Standard deviations can be negative",
                            "Adding standard deviations always gives an imaginary number",
                            "Because variance is always smaller than standard deviation"
                        ],
                        0,
                        "By the Pythagorean property of independent random variables, variances add: $\\sigma_{X+Y}^2 = \\sigma_X^2 + \\sigma_Y^2$."
                    )
                ]
            },
            {
                "heading": "Section 3: The Binomial Setting & Probability Formula",
                "questions": [
                    make_q(
                        "Which of the following is NOT an essential requirement for a binomial setting (BINS)?",
                        [
                            "The sample size must exceed 30",
                            "Binary outcomes (Success or Failure) for each trial",
                            "Independent trials",
                            "Fixed number of trials $n$, and same probability of success $p$"
                        ],
                        0,
                        "The four binomial conditions (BINS) are: Binary outcomes, Independent trials, fixed Number of trials, and Same probability of success. Sample size $n > 30$ is not a requirement."
                    ),
                    make_q(
                        "A fair 6-sided die is rolled 5 times. What is the probability of rolling exactly two 4s?",
                        [
                            "$\\binom{5}{2} \\left(\\frac{1}{6}\\right)^2 \\left(\\frac{5}{6}\\right)^3$",
                            "$\\left(\\frac{1}{6}\\right)^2 \\left(\\frac{5}{6}\\right)^3$",
                            "$\\binom{5}{2} \\left(\\frac{1}{6}\\right)^3 \\left(\\frac{5}{6}\\right)^2$",
                            "$\\frac{2}{5}$"
                        ],
                        0,
                        "With $n = 5, k = 2, p = \\frac{1}{6}$: $P(X = 2) = \\binom{5}{2} \\left(\\frac{1}{6}\\right)^2 \\left(\\frac{5}{6}\\right)^3$."
                    ),
                    make_q(
                        "Evaluate $\\binom{5}{2}$.",
                        ["$10$", "$20$", "$5$", "$15$"],
                        0,
                        "$\\binom{5}{2} = \\frac{5 \\times 4}{2 \\times 1} = 10$."
                    )
                ]
            },
            {
                "heading": "Section 4: Mean & Standard Deviation of Binomial Distributions",
                "questions": [
                    make_q(
                        "A multiple-choice test has $20$ questions, each with $4$ options. If a student guesses completely at random, what are the mean and standard deviation of correct answers?",
                        [
                            "$\\mu = 5.0$, $\\sigma = 1.94$",
                            "$\\mu = 5.0$, $\\sigma = 3.75$",
                            "$\\mu = 4.0$, $\\sigma = 2.00$",
                            "$\\mu = 5.0$, $\\sigma = 15.0$"
                        ],
                        0,
                        "$n = 20, p = 0.25$. Mean: $\\mu = np = 20(0.25) = 5.0$. Standard deviation: $\\sigma = \\sqrt{np(1-p)} = \\sqrt{20(0.25)(0.75)} = \\sqrt{3.75} \\approx 1.936$."
                    ),
                    make_q(
                        "When is a Normal approximation to a binomial distribution considered valid?",
                        [
                            "When $np \\geq 10$ and $n(1 - p) \\geq 10$",
                            "When $n \\geq 30$",
                            "When $p = 0.5$ regardless of $n$",
                            "When $np(1 - p) \\geq 30$"
                        ],
                        0,
                        "The Large Counts Condition requires expected successes $np \\geq 10$ and expected failures $n(1 - p) \\geq 10$ for the distribution to be approximately normal."
                    ),
                    make_q(
                        "In a geometric distribution where $p = 0.2$, what is the expected number of trials until the first success?",
                        ["$5$", "$0.2$", "$4$", "$25$"],
                        0,
                        "For a geometric random variable, the mean is $\\mu = \\frac{1}{p} = \\frac{1}{0.2} = 5$ trials."
                    )
                ]
            }
        ]
    },

    # --------------------------------------------------------------------------
    # APSTATS 3.03: The Normal Distribution
    # --------------------------------------------------------------------------
    {
        "track": "apstats",
        "num": "3.03",
        "slug": "the-normal-distribution",
        "title": "The Normal Distribution",
        "sections": [
            {
                "heading": "Section 1: The Empirical Rule (68-95-99.7)",
                "questions": [
                    make_q(
                        "In a normal distribution with mean $\\mu = 100$ and $\\sigma = 15$, approximately what percentage of scores fall between $70$ and $130$?",
                        ["$95\\%$", "$68\\%$", "$99.7\\%$", "$50\\%$"],
                        0,
                        "$70 = 100 - 2(15)$ and $130 = 100 + 2(15)$. By the Empirical Rule, approximately $95\\%$ of data in a normal distribution falls within 2 standard deviations of the mean."
                    ),
                    make_q(
                        "Using the 68-95-99.7 rule, what percentage of observations in a normal distribution fall above $\\mu + 1\\sigma$?",
                        ["$16\\%$", "$32\\%$", "$34\\%$", "$2.5\\%$"],
                        0,
                        "Within 1 standard deviation is $68\\%$. The remaining $32\\%$ is split evenly between the two tails: $\\frac{32\\%}{2} = 16\\%$ in the upper tail."
                    ),
                    make_q(
                        "If heights of adult men are $N(70, 3)$ inches, what percentage are taller than $76$ inches?",
                        ["$2.5\\%$", "$5\\%$", "$16\\%$", "$0.15\\%$"],
                        0,
                        "$76$ is $70 + 2(3) = \\mu + 2\\sigma$. Beyond 2 standard deviations is $100\\% - 95\\% = 5\\%$. In the upper tail alone: $\\frac{5\\%}{2} = 2.5\\%$."
                    )
                ]
            },
            {
                "heading": "Section 2: Finding Normal Probabilities",
                "questions": [
                    make_q(
                        "For a standard normal variable $Z$, find $P(Z < -1.28)$ given that the standard normal CDF at $-1.28$ is approximately $0.10$.",
                        ["$0.10$", "$0.90$", "$0.20$", "$0.05$"],
                        0,
                        "By definition of the cumulative distribution function, $P(Z < -1.28) = 0.10$."
                    ),
                    make_q(
                        "If $P(Z < 1.96) \\approx 0.975$, what is $P(-1.96 < Z < 1.96)$?",
                        ["$0.95$", "$0.975$", "$0.05$", "$0.025$"],
                        0,
                        "By symmetry, $P(Z < -1.96) = 1 - 0.975 = 0.025$. Then $P(-1.96 < Z < 1.96) = 0.975 - 0.025 = 0.95$."
                    ),
                    make_q(
                        "A machine fills cereal boxes normally with $\\mu = 16.2\\text{ oz}$ and $\\sigma = 0.1\\text{ oz}$. What proportion of boxes contain less than the stated label of $16.0\\text{ oz}$?",
                        [
                            "$P(Z < -2.0) \\approx 0.0228$",
                            "$P(Z < -1.0) \\approx 0.1587$",
                            "$P(Z > 2.0) \\approx 0.9772$",
                            "$0.5000$"
                        ],
                        0,
                        "$z = \\frac{16.0 - 16.2}{0.1} = \\frac{-0.2}{0.1} = -2.0$. The tail probability is $P(Z < -2.0) \\approx 0.0228$ (about $2.28\\%$)."
                    )
                ]
            },
            {
                "heading": "Section 3: Inverse Normal Calculations (Finding Values from Probabilities)",
                "questions": [
                    make_q(
                        "Test scores are normally distributed with $\\mu = 500$ and $\\sigma = 100$. What score corresponds to the 90th percentile ($z \\approx 1.28$)?",
                        ["$628$", "$590$", "$600$", "$696$"],
                        0,
                        "$x = \\mu + z\\sigma = 500 + 1.28(100) = 500 + 128 = 628$."
                    ),
                    make_q(
                        "In a normal distribution, what are the $z$-scores corresponding to the first quartile ($Q_1$) and third quartile ($Q_3$)?",
                        [
                            "$z \\approx -0.67$ and $z \\approx +0.67$",
                            "$z \\approx -1.00$ and $z \\approx +1.00$",
                            "$z \\approx -0.50$ and $z \\approx +0.50$",
                            "$z \\approx -1.96$ and $z \\approx +1.96$"
                        ],
                        0,
                        "$Q_1$ has $25\\%$ of area below it, giving $z \\approx -0.674$. $Q_3$ has $75\\%$ below, giving $z \\approx +0.674$."
                    ),
                    make_q(
                        "The weights of bags of potato chips are $N(\\mu, 0.4\\text{ oz})$. If the heaviest $5\\%$ of bags weigh more than $16.66\\text{ oz}$ ($z_{0.95} = 1.645$), find the mean weight $\\mu$.",
                        ["$16.0\\text{ oz}$", "$17.3\\text{ oz}$", "$15.8\\text{ oz}$", "$16.2\\text{ oz}$"],
                        0,
                        "$x = \\mu + z\\sigma \\Rightarrow 16.66 = \\mu + 1.645(0.4) = \\mu + 0.658 \\Rightarrow \\mu = 16.66 - 0.658 \\approx 16.0\\text{ oz}$."
                    )
                ]
            },
            {
                "heading": "Section 4: Assessing Normality with Normal Probability Plots",
                "questions": [
                    make_q(
                        "What appearance in a Normal Probability (Q-Q) Plot indicates that the sample data comes from a roughly normal population?",
                        [
                            "The plotted points follow a roughly linear pattern",
                            "The plotted points form a bell-shaped curve",
                            "The plotted points are completely horizontal",
                            "The plotted points form a curved parabolic shape"
                        ],
                        0,
                        "If sample data comes from a normal population, the normal quantile plot displays a straight linear trend."
                    ),
                    make_q(
                        "If a Normal Probability Plot shows a clear upward curve (concave up), what does this indicate about the distribution?",
                        [
                            "The distribution is skewed to the right",
                            "The distribution is skewed to the left",
                            "The distribution is perfectly symmetric",
                            "The distribution has no spread"
                        ],
                        0,
                        "A systematic concave-up bend in a normal probability plot indicates right-skewness in the sample data."
                    ),
                    make_q(
                        "What is the total area under any valid probability density curve?",
                        ["$1$", "$100$", "$0.5$", "Depends on the standard deviation"],
                        0,
                        "By the axioms of probability, the total area under any continuous probability density curve over its entire domain is exactly $1$."
                    )
                ]
            }
        ]
    },

    # --------------------------------------------------------------------------
    # APSTATS 3.04: Sampling Distributions & CLT
    # --------------------------------------------------------------------------
    {
        "track": "apstats",
        "num": "3.04",
        "slug": "sampling-distributions-and-clt",
        "title": "Sampling Distributions & Central Limit Theorem",
        "sections": [
            {
                "heading": "Section 1: The Central Limit Theorem (CLT)",
                "questions": [
                    make_q(
                        "What does the Central Limit Theorem state about the sampling distribution of the sample mean $\\bar{x}$?",
                        [
                            "When sample size $n$ is sufficiently large ($n \\geq 30$), the sampling distribution of $\\bar{x}$ is approximately normal, regardless of the population shape",
                            "As $n$ increases, the population becomes normally distributed",
                            "The sample standard deviation approaches the population standard deviation",
                            "Every random sample will have an identical mean"
                        ],
                        0,
                        "The CLT states that for sufficiently large $n$ (conventionally $n \\geq 30$), the sampling distribution of $\\bar{x}$ approaches normality even if the underlying population is skewed or non-normal."
                    ),
                    make_q(
                        "If a population is already normally distributed with mean $\\mu$ and standard deviation $\\sigma$, what is the shape of the sampling distribution of $\\bar{x}$ for a small sample of $n = 5$?",
                        [
                            "Exactly normal",
                            "Uniform",
                            "Skewed",
                            "Cannot be determined without $n \\geq 30$"
                        ],
                        0,
                        "When the original population is normally distributed, the sampling distribution of $\\bar{x}$ is normal for any sample size $n$."
                    ),
                    make_q(
                        "Does the Central Limit Theorem apply to the shape of the individual sample data values?",
                        [
                            "No, it applies only to the distribution of sample statistics across repeated sampling, not the sample data itself",
                            "Yes, individual observations become normal as $n$ grows",
                            "Only if the data has no outliers",
                            "Yes, this is known as the Law of Large Numbers"
                        ],
                        0,
                        "The CLT describes the sampling distribution of the statistic $\\bar{x}$, never the distribution of individual data points in a single sample."
                    )
                ]
            },
            {
                "heading": "Section 2: Mean and Standard Error of the Sample Mean",
                "questions": [
                    make_q(
                        "A population has mean $\\mu = 80$ and standard deviation $\\sigma = 20$. For random samples of size $n = 25$, what are the mean and standard error of $\\bar{x}$?",
                        [
                            "$\\mu_{\\bar{x}} = 80$, $\\sigma_{\\bar{x}} = 4$",
                            "$\\mu_{\\bar{x}} = 80$, $\\sigma_{\\bar{x}} = 20$",
                            "$\\mu_{\\bar{x}} = 16$, $\\sigma_{\\bar{x}} = 4$",
                            "$\\mu_{\\bar{x}} = 80$, $\\sigma_{\\bar{x}} = 0.8$"
                        ],
                        0,
                        "$\\mu_{\\bar{x}} = \\mu = 80$. Standard error: $\\sigma_{\\bar{x}} = \\frac{\\sigma}{\\sqrt{n}} = \\frac{20}{\\sqrt{25}} = \\frac{20}{5} = 4$."
                    ),
                    make_q(
                        "To cut the standard error of the sample mean $\\sigma_{\\bar{x}} = \\frac{\\sigma}{\\sqrt{n}}$ in half, the sample size must be:",
                        ["Quadrupled ($4n$)", "Doubled ($2n$)", "Halved", "Increased by 10"],
                        0,
                        "Because $n$ is under the square root in the denominator, multiplying $n$ by $4$ divides the standard error by $\\sqrt{4} = 2$."
                    ),
                    make_q(
                        "When using the formula $\\sigma_{\\bar{x}} = \\frac{\\sigma}{\\sqrt{n}}$, what condition must be satisfied if sampling without replacement?",
                        [
                            "The $10\\%$ condition: sample size $n \\leq 0.10 N$ (population size)",
                            "The Large Counts Condition: $np \\geq 10$",
                            "$n \\geq 30$",
                            "The population must be symmetric"
                        ],
                        0,
                        "The $10\\%$ condition ($n \\leq 0.10 N$) ensures that sampling without replacement is close enough to independent that the standard error formula remains valid."
                    )
                ]
            },
            {
                "heading": "Section 3: Sampling Distribution of Sample Proportion p-hat",
                "questions": [
                    make_q(
                        "In a large population, $40\\%$ of adults support a referendum ($p = 0.40$). For random samples of $n = 100$, what are the mean and standard deviation of $\\hat{p}$?",
                        [
                            "$\\mu_{\\hat{p}} = 0.40$, $\\sigma_{\\hat{p}} = 0.049$",
                            "$\\mu_{\\hat{p}} = 40$, $\\sigma_{\\hat{p}} = 4.9$",
                            "$\\mu_{\\hat{p}} = 0.40$, $\\sigma_{\\hat{p}} = 0.24$",
                            "$\\mu_{\\hat{p}} = 0.60$, $\\sigma_{\\hat{p}} = 0.049$"
                        ],
                        0,
                        "$\\mu_{\\hat{p}} = p = 0.40$. $\\sigma_{\\hat{p}} = \\sqrt{\\frac{p(1-p)}{n}} = \\sqrt{\\frac{0.40(0.60)}{100}} = \\sqrt{0.0024} \\approx 0.049$."
                    ),
                    make_q(
                        "Which conditions justify modeling the sampling distribution of $\\hat{p}$ with a normal distribution?",
                        [
                            "$np \\geq 10$ and $n(1 - p) \\geq 10$",
                            "$n \\geq 30$",
                            "$n \\leq 0.10 N$",
                            "$p = 0.50$"
                        ],
                        0,
                        "The Large Counts Condition requires both expected successes $np \\geq 10$ and expected failures $n(1 - p) \\geq 10$."
                    ),
                    make_q(
                        "Why is the sample proportion $\\hat{p}$ called an unbiased estimator of $p$?",
                        [
                            "The mean of its sampling distribution equals the true population parameter $p$",
                            "It never makes a prediction error",
                            "Its standard deviation is zero",
                            "It is computed from a simple random sample"
                        ],
                        0,
                        "An estimator is unbiased when the expected value (mean of its sampling distribution) equals the true population parameter being estimated."
                    )
                ]
            },
            {
                "heading": "Section 4: Calculations with Sampling Distributions",
                "questions": [
                    make_q(
                        "A tire manufacturer knows tire lifespan is normal with $\\mu = 50000\\text{ miles}$ and $\\sigma = 4000\\text{ miles}$. What is the probability that an SRS of $16$ tires has a mean lifespan under $48000\\text{ miles}$?",
                        [
                            "$P(Z < -2.0) \\approx 0.0228$",
                            "$P(Z < -0.5) \\approx 0.3085$",
                            "$P(Z > 2.0) \\approx 0.9772$",
                            "$0.0500$"
                        ],
                        0,
                        "$\\sigma_{\\bar{x}} = \\frac{4000}{\\sqrt{16}} = 1000$. $z = \\frac{48000 - 50000}{1000} = \\frac{-2000}{1000} = -2.0$. Tail area is $P(Z < -2.0) \\approx 0.0228$."
                    ),
                    make_q(
                        "How does increasing sample size affect the bias and variability of a sample statistic?",
                        [
                            "Variability decreases, while bias remains unchanged",
                            "Both bias and variability decrease",
                            "Bias decreases, variability remains unchanged",
                            "Both remain unchanged"
                        ],
                        0,
                        "Increasing sample size reduces sampling variability (standard error narrows), but has no effect on bias (which stems from study design)."
                    ),
                    make_q(
                        "If $X_1$ and $X_2$ are independent sample means from two populations, what is the standard error of $(\\bar{x}_1 - \\bar{x}_2)$?",
                        [
                            "$\\sqrt{\\frac{\\sigma_1^2}{n_1} + \\frac{\\sigma_2^2}{n_2}}$",
                            "$\\frac{\\sigma_1}{\\sqrt{n_1}} - \\frac{\\sigma_2}{\\sqrt{n_2}}$",
                            "$\\sqrt{\\frac{\\sigma_1}{n_1} + \\frac{\\sigma_2}{n_2}}$",
                            "$\\frac{\\sigma_1 + \\sigma_2}{\\sqrt{n_1 + n_2}}$"
                        ],
                        0,
                        "Variances of independent sample means add: $\\sigma_{\\bar{x}_1 - \\bar{x}_2} = \\sqrt{\\sigma_{\\bar{x}_1}^2 + \\sigma_{\\bar{x}_2}^2} = \\sqrt{\\frac{\\sigma_1^2}{n_1} + \\frac{\\sigma_2^2}{n_2}}$."
                    )
                ]
            }
        ]
    },

    # --------------------------------------------------------------------------
    # APSTATS 4.01: Confidence Intervals & Hypothesis Testing
    # --------------------------------------------------------------------------
    {
        "track": "apstats",
        "num": "4.01",
        "slug": "confidence-intervals-and-hypothesis-testing",
        "title": "Confidence Intervals & Hypothesis Testing",
        "sections": [
            {
                "heading": "Section 1: Constructing & Interpreting Confidence Intervals",
                "questions": [
                    make_q(
                        "What is the correct interpretation of a $95\\%$ confidence interval for a population mean $(42.1, 48.7)$?",
                        [
                            "We are $95\\%$ confident that the true population mean falls between $42.1$ and $48.7$",
                            "There is a $95\\%$ probability that the true mean is between $42.1$ and $48.7$",
                            "$95\\%$ of all individual values in the population lie between $42.1$ and $48.7$",
                            "$95\\%$ of sample means will equal the population mean"
                        ],
                        0,
                        "Confidence level refers to the long-run success rate of the method: in repeated sampling, $95\\%$ of intervals generated will capture the fixed true parameter."
                    ),
                    make_q(
                        "In a sample of $100$ items, $\\hat{p} = 0.60$. With critical value $z^* = 1.96$, what is the margin of error for a $95\\%$ confidence interval for $p$?",
                        [
                            "$1.96 \\sqrt{\\frac{0.60(0.40)}{100}} \\approx 0.096$",
                            "$1.96 \\sqrt{\\frac{0.50(0.50)}{100}} \\approx 0.098$",
                            "$0.60 \\pm 0.05$",
                            "$0.049$"
                        ],
                        0,
                        "$\\text{ME} = z^* \\times \\text{SE} = 1.96 \\sqrt{\\frac{0.60(0.40)}{100}} = 1.96 \\sqrt{0.0024} = 1.96(0.04899) \\approx 0.096$."
                    ),
                    make_q(
                        "How can you decrease the width of a confidence interval?",
                        [
                            "Increase the sample size or decrease the confidence level",
                            "Increase the confidence level or increase the sample size",
                            "Decrease the sample size or increase the confidence level",
                            "Increase the standard deviation of the data"
                        ],
                        0,
                        "Width is $2 \\times \\text{critical value} \\times \\frac{\\sigma}{\\sqrt{n}}$. Increasing $n$ shrinks the denominator; lowering confidence level (e.g. from $99\\%$ to $90\\%$) lowers the critical value."
                    )
                ]
            },
            {
                "heading": "Section 2: Hypothesis Testing Logic & P-values",
                "questions": [
                    make_q(
                        "What is the statistical definition of a P-value?",
                        [
                            "The probability of observing a test statistic as extreme or more extreme than the one observed, assuming the null hypothesis is true",
                            "The probability that the null hypothesis is true",
                            "The probability that the alternative hypothesis is false",
                            "The probability of making a Type I error"
                        ],
                        0,
                        "The P-value is calculated under the assumption that $H_0$ is true, measuring how plausible the observed sample outcome is purely by chance."
                    ),
                    make_q(
                        "If a test yields a P-value of $0.023$ and the significance level is $\\alpha = 0.05$, what is the conclusion?",
                        [
                            "Reject $H_0$; there is convincing statistical evidence in favor of $H_a$",
                            "Fail to reject $H_0$; the evidence is insufficient",
                            "Accept $H_0$ as definitively proven",
                            "Reject $H_a$; the test is inconclusive"
                        ],
                        0,
                        "Because $\\text{P-value} = 0.023 < \\alpha = 0.05$, we reject $H_0$ and conclude that there is statistically significant evidence for $H_a$."
                    ),
                    make_q(
                        "Why do statisticians state 'fail to reject $H_0$' instead of 'accept $H_0$'?",
                        [
                            "Failing to find sufficient evidence against $H_0$ does not prove that $H_0$ is true",
                            "Because $H_0$ is always false in practice",
                            "To avoid computing the test statistic",
                            "Because the P-value is always approximate"
                        ],
                        0,
                        "Absence of evidence is not evidence of absence; we never prove the null hypothesis true, we merely conclude the data is consistent with it."
                    )
                ]
            },
            {
                "heading": "Section 3: Type I Error, Type II Error, and Power",
                "questions": [
                    make_q(
                        "What is a Type I error?",
                        [
                            "Rejecting the null hypothesis when the null hypothesis is actually true",
                            "Failing to reject the null hypothesis when the null hypothesis is actually false",
                            "Calculating an incorrect test statistic",
                            "Using the wrong degrees of freedom"
                        ],
                        0,
                        "A Type I error is a false positive: rejecting a true null hypothesis. The probability of a Type I error equals the significance level $\\alpha$."
                    ),
                    make_q(
                        "What is a Type II error?",
                        [
                            "Failing to reject the null hypothesis when the null hypothesis is actually false",
                            "Rejecting the null hypothesis when it is true",
                            "Selecting a biased sample",
                            "Misinterpreting the P-value"
                        ],
                        0,
                        "A Type II error (probability $\\beta$) is a false negative: failing to detect a real effect when the alternative hypothesis is true."
                    ),
                    make_q(
                        "What is the power of a statistical test?",
                        [
                            "The probability of correctly rejecting a false null hypothesis ($1 - \\beta$)",
                            "The probability of making a Type I error ($\\alpha$)",
                            "The sample size $n$",
                            "The probability of retaining a true null hypothesis"
                        ],
                        0,
                        "Power $= 1 - \\beta$ represents the test's ability to successfully detect a true difference or effect of a specified magnitude."
                    )
                ]
            },
            {
                "heading": "Section 4: One-Sample and Two-Sample t-Procedures",
                "questions": [
                    make_q(
                        "When estimating a population mean $\\mu$ with unknown $\\sigma$, which distribution and test statistic are used?",
                        [
                            "$t$-distribution with $t = \\frac{\\bar{x} - \\mu_0}{s / \\sqrt{n}}$ and $df = n - 1$",
                            "Standard normal distribution with $z = \\frac{\\bar{x} - \\mu_0}{\\sigma / \\sqrt{n}}$",
                            "Chi-square distribution with $df = n - 1$",
                            "$F$-distribution with $df = (n-1, n-2)$"
                        ],
                        0,
                        "When $\\sigma$ is replaced by the sample standard deviation $s$, the standardized statistic follows Student's $t$-distribution with $n - 1$ degrees of freedom."
                    ),
                    make_q(
                        "How does the $t$-distribution compare to the standard normal ($Z$) distribution?",
                        [
                            "The $t$-distribution is symmetric and bell-shaped but has heavier tails (more spread)",
                            "The $t$-distribution is skewed right",
                            "The $t$-distribution has less variability than $Z$",
                            "The $t$-distribution is bounded between $-3$ and $3$"
                        ],
                        0,
                        "The $t$-distribution has heavier tails to account for the extra uncertainty introduced by estimating $\\sigma$ with $s$. As $df \\to \\infty$, $t$ approaches $Z$."
                    ),
                    make_q(
                        "A researcher compares scores before and after a training program on the same $20$ subjects. Which test should be performed?",
                        [
                            "Paired $t$-test on the differences ($d_i = \\text{After}_i - \\text{Before}_i$)",
                            "Two-sample independent $t$-test",
                            "Two-sample $z$-test for proportions",
                            "Chi-square test of independence"
                        ],
                        0,
                        "Because the two observations come from the same individuals, the data is dependent (matched pairs), requiring a one-sample paired $t$-test on the pairwise differences."
                    )
                ]
            }
        ]
    },

    # --------------------------------------------------------------------------
    # APSTATS 4.02: Chi-Square Tests & Regression Inference
    # --------------------------------------------------------------------------
    {
        "track": "apstats",
        "num": "4.02",
        "slug": "chi-square-tests-and-regression-inference",
        "title": "Chi-Square Tests & Regression Inference",
        "sections": [
            {
                "heading": "Section 1: Chi-Square Goodness-of-Fit Test",
                "questions": [
                    make_q(
                        "What is the formula for the Chi-Square test statistic?",
                        [
                            "$\\chi^2 = \\sum \\frac{(O - E)^2}{E}$",
                            "$\\chi^2 = \\sum \\frac{(O - E)}{E}$",
                            "$\\chi^2 = \\sum \\frac{(O - E)^2}{O}$",
                            "$\\chi^2 = \\frac{(\\bar{x} - \\mu)^2}{s^2}$"
                        ],
                        0,
                        "The Chi-square statistic measures discrepancy between observed counts $O$ and expected counts $E$: $\\chi^2 = \\sum \\frac{(O - E)^2}{E}$."
                    ),
                    make_q(
                        "A bag of candies claims to have $5$ colors in equal proportions ($20\\%$ each). In a sample of $100$ candies, what are the degrees of freedom for the goodness-of-fit test?",
                        ["$4$", "$5$", "$99$", "$100$"],
                        0,
                        "For a goodness-of-fit test with $k$ categories, degrees of freedom is $df = k - 1$. Here $df = 5 - 1 = 4$."
                    ),
                    make_q(
                        "What condition must be satisfied regarding expected counts for a Chi-Square test to be valid?",
                        [
                            "All expected cell counts must be at least $5$",
                            "All observed cell counts must be at least $30$",
                            "The sample size must be exactly 100",
                            "The categories must be normally distributed"
                        ],
                        0,
                        "The standard Large Counts condition for Chi-square tests requires all expected counts to be at least $5$."
                    )
                ]
            },
            {
                "heading": "Section 2: Chi-Square Test of Independence vs. Homogeneity",
                "questions": [
                    make_q(
                        "In a two-way contingency table with $r$ rows and $c$ columns, how is the expected count for each cell calculated under $H_0$?",
                        [
                            "$E = \\frac{\\text{Row Total} \\times \\text{Column Total}}{\\text{Table Total}}$",
                            "$E = \\frac{\\text{Row Total} + \\text{Column Total}}{2}$",
                            "$E = \\frac{\\text{Table Total}}{r \\times c}$",
                            "$E = \\frac{\\text{Row Total}}{\\text{Column Total}}$"
                        ],
                        0,
                        "Under independence, $P(\\text{Row} \\cap \\text{Col}) = P(\\text{Row})P(\\text{Col})$, giving $E = \\frac{\\text{Row Total} \\times \\text{Column Total}}{\\text{Grand Total}}$."
                    ),
                    make_q(
                        "A single random sample of $300$ voters is categorized by political affiliation and stance on a ballot issue. Which test assesses if affiliation and stance are associated?",
                        [
                            "Chi-Square Test of Independence",
                            "Chi-Square Test of Homogeneity",
                            "Chi-Square Goodness-of-Fit Test",
                            "Two-sample $z$-test for proportions"
                        ],
                        0,
                        "When a single random sample is classified on two categorical variables, the test of association is the Chi-Square Test of Independence."
                    ),
                    make_q(
                        "What are the degrees of freedom for a Chi-Square test on a $3 \\times 4$ contingency table?",
                        ["$6$", "$12$", "$7$", "$11$"],
                        0,
                        "$df = (r - 1)(c - 1) = (3 - 1)(4 - 1) = 2 \\times 3 = 6$."
                    )
                ]
            },
            {
                "heading": "Section 3: Inference for Linear Regression Slope",
                "questions": [
                    make_q(
                        "In testing for a significant linear relationship between $x$ and $y$, what are the standard null and alternative hypotheses for the population slope $\\beta$?",
                        [
                            "$H_0: \\beta = 0$ versus $H_a: \\beta \\neq 0$",
                            "$H_0: \\beta = 1$ versus $H_a: \\beta \\neq 1$",
                            "$H_0: b = 0$ versus $H_a: b \\neq 0$",
                            "$H_0: r = 1$ versus $H_a: r \\neq 1$"
                        ],
                        0,
                        "The null hypothesis states there is no linear relationship (population slope $\\beta = 0$), tested against $\\beta \\neq 0$ (or a directional alternative)."
                    ),
                    make_q(
                        "Computer regression output shows: Predictor Coef SE Coef T P; Constant 14.2 2.1 6.76 0.000; Slope 3.45 0.69 5.00 0.0001. For $n = 18$ observations, what is the $t$-statistic for the slope?",
                        ["$5.00$", "$6.76$", "$3.45$", "$0.69$"],
                        0,
                        "The $t$-statistic for the slope is $t = \\frac{b - 0}{\\text{SE}_b} = \\frac{3.45}{0.69} = 5.00$."
                    ),
                    make_q(
                        "What are the degrees of freedom for the $t$-test of the slope in simple linear regression with $n$ data pairs?",
                        ["$n - 2$", "$n - 1$", "$n$", "$2n - 2$"],
                        0,
                        "In simple linear regression, two parameters are estimated (intercept $\\alpha$ and slope $\\beta$), leaving $df = n - 2$ degrees of freedom."
                    )
                ]
            },
            {
                "heading": "Section 4: Regression Model Conditions (LINER)",
                "questions": [
                    make_q(
                        "What does the acronym LINER stand for regarding the conditions for regression inference?",
                        [
                            "Linear, Independent, Normal $y$ for each $x$, Equal variance, Random sampling",
                            "Least squares, Intercept, Normal, Errors, Residuals",
                            "Linear, Integrated, Numerical, Estimated, Robust",
                            "Limit, Interval, Normal, Expected, Ratio"
                        ],
                        0,
                        "The regression conditions are: Linear relationship, Independent observations, Normal distribution of response $y$ at each $x$, Equal variance of residuals (homoscedasticity), and Random data collection."
                    ),
                    make_q(
                        "If a residual plot displays a funnel or cone shape (spread widens as $x$ increases), which condition is violated?",
                        [
                            "Equal variance of residuals (homoscedasticity)",
                            "Linearity",
                            "Independence",
                            "Random sampling"
                        ],
                        0,
                        "A fan or funnel shape indicates heteroscedasticity (non-constant variance), violating the equal variance condition."
                    ),
                    make_q(
                        "A $95\\%$ confidence interval for the regression slope $\\beta$ is $(1.24, 3.86)$. What can be concluded at $\\alpha = 0.05$?",
                        [
                            "Because $0$ is not in the interval, there is convincing evidence of a positive linear relationship between $x$ and $y$",
                            "Because $0$ is not in the interval, the relationship is non-linear",
                            "The correlation coefficient $r$ must equal $1.24$",
                            "We fail to reject $H_0: \\beta = 0$"
                        ],
                        0,
                        "Since the entire confidence interval is strictly positive and excludes $0$, we reject $\\beta = 0$ at the $5\\%$ level, confirming a statistically significant positive linear relationship."
                    )
                ]
            }
        ]
    }
]
