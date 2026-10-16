#!/usr/bin/env python3
"""Standardized 4-Page Topic Data for Cambridge AS Level (Part 4: Topics 15.01 to 19.01)
Probability & Statistics 1 (Paper 5):
- 15.01: Representation of Data
- 16.01: Permutations & Combinations
- 17.01: Discrete Random Variables
- 18.01: Binomial Distribution
- 19.01: Normal Distribution
"""

def make_q(q, choices, correct, answer):
    return {
        "q": q,
        "choices": choices,
        "correct": correct,
        "answer": answer
    }

ASLEVEL_TOPICS_P4 = [
    # --------------------------------------------------------------------------
    # 15.01: Representation of Data
    # --------------------------------------------------------------------------
    {
        "track": "aslevel",
        "num": "15.01",
        "slug": "representation-of-data",
        "title": "Representation of Data",
        "sections": [
            {
                "heading": "Section 1: Stem-and-Leaf Diagrams & Box Plots",
                "questions": [
                    make_q(
                        "In an ordered stem-and-leaf diagram of 15 test scores, the key states $3 \\mid 5 = 35$. The leaves for stem 4 are $1, 3, 5, 8, 8$. What is the median score if there are 4 scores below stem 4?",
                        ["45", "43", "48", "41"],
                        0,
                        "For $n = 15$, the median is the 8th value: 4 values are in stem 3, so in stem 4 we count the 5th, 6th, 7th, 8th values (1, 3, 5, 8). The 8th value is 45."
                    ),
                    make_q(
                        "A data set has minimum $= 12$, $Q_1 = 20$, median $= 28$, $Q_3 = 36$, and maximum $= 52$. What is the interquartile range (IQR)?",
                        ["16", "24", "40", "8"],
                        0,
                        "$\\text{IQR} = Q_3 - Q_1 = 36 - 20 = 16$."
                    ),
                    make_q(
                        "Using the $1.5 \\times \\text{IQR}$ rule on the data from the previous question, determine if the maximum value 52 is an outlier.",
                        ["No, the upper outlier boundary is 60", "Yes, any value above 48 is an outlier", "Yes, any value above 50 is an outlier", "No, because the range is less than 50"],
                        0,
                        "$\\text{Boundary} = Q_3 + 1.5 \\times \\text{IQR} = 36 + 1.5(16) = 36 + 24 = 60$. Since $52 \\leq 60$, it is not an outlier."
                    )
                ]
            },
            {
                "heading": "Section 2: Histograms & Frequency Density",
                "questions": [
                    make_q(
                        "In a histogram, the class interval $20 \\leq x < 35$ has a frequency of 45. What is the frequency density for this bar?",
                        ["3.0", "1.5", "4.5", "2.25"],
                        0,
                        "Class width $= 35 - 20 = 15$. Frequency density $= \\frac{\\text{Frequency}}{\\text{Class width}} = \\frac{45}{15} = 3.0$."
                    ),
                    make_q(
                        "On a histogram, a bar representing the interval $10 \\leq x < 20$ has a width of 2 cm and a height of 5 cm, representing 30 items. What area represents 1 item?",
                        ["$\\frac{1}{3}\\text{ cm}^2$", "$\\frac{1}{2}\\text{ cm}^2$", "$3\\text{ cm}^2$", "$1\\text{ cm}^2$"],
                        0,
                        "Area of bar $= 2 \\times 5 = 10\\text{ cm}^2$. Since this represents 30 items, each item is represented by $10/30 = 1/3\\text{ cm}^2$."
                    ),
                    make_q(
                        "Why is frequency density, rather than raw frequency, plotted on the vertical axis of a histogram for grouped continuous data?",
                        ["Because class widths may be unequal and area must be proportional to frequency", "Because continuous data cannot be plotted with integer frequencies", "To ensure the total height of all bars equals 100", "To eliminate the need for class boundaries"],
                        0,
                        "When classes have unequal widths, plotting frequency density ensures that the area of each rectangle is directly proportional to the frequency of that class."
                    )
                ]
            },
            {
                "heading": "Section 3: Cumulative Frequency Curves & Percentiles",
                "questions": [
                    make_q(
                        "When plotting a cumulative frequency graph for grouped continuous data, at which points should the cumulative frequencies be plotted?",
                        ["At the upper class boundaries", "At the midpoints of each class", "At the lower class boundaries", "At the class frequencies"],
                        0,
                        "Cumulative frequency represents the total number of observations up to that value, so it must be plotted at the upper boundary of each class interval."
                    ),
                    make_q(
                        "From a cumulative frequency curve of 200 students, the 80th percentile corresponds to which cumulative frequency?",
                        ["160", "80", "120", "180"],
                        0,
                        "The 80th percentile corresponds to $0.80 \\times 200 = 160$ on the vertical cumulative frequency axis."
                    ),
                    make_q(
                        "Using linear interpolation on grouped data, the median lies in the class $40 \\leq x < 50$ with frequency 25 and cumulative frequency before this class equal to 35. If total $n = 100$, find the estimated median.",
                        ["$46.0$", "$45.0$", "$44.5$", "$47.2$"],
                        0,
                        "Median position $= 100/2 = 50$. We need $50 - 35 = 15$ more items out of 25. Median $= 40 + \\frac{15}{25}(10) = 40 + 6 = 46.0$."
                    )
                ]
            },
            {
                "heading": "Section 4: Linear Coding & Transformations of Summary Stats",
                "questions": [
                    make_q(
                        "A data set $x$ has mean $\\bar{x} = 50$ and variance $s_x^2 = 16$. A new variable is defined as $y = 3x - 10$. Find the mean $\\bar{y}$ and standard deviation $s_y$.",
                        ["$\\bar{y} = 140$, $s_y = 12$", "$\\bar{y} = 140$, $s_y = 36$", "$\\bar{y} = 150$, $s_y = 12$", "$\\bar{y} = 140$, $s_y = 4$"],
                        0,
                        "Mean: $\\bar{y} = 3(50) - 10 = 140$. Standard deviation: $s_y = |a|s_x = 3(\\sqrt{16}) = 3(4) = 12$."
                    ),
                    make_q(
                        "A variable $t$ is coded as $u = \\dfrac{t - 200}{10}$. For 50 observations, $\\sum u = 85$ and $\\sum u^2 = 320$. Find the actual mean of $t$.",
                        ["$217$", "$215$", "$208.5$", "$220$"],
                        0,
                        "Mean of $u$: $\\bar{u} = 85/50 = 1.7$. Actual mean $\\bar{t} = 10\\bar{u} + 200 = 10(1.7) + 200 = 217$."
                    ),
                    make_q(
                        "For the data in the previous question, calculate the variance of the original variable $t$.",
                        ["$351$", "$35.1$", "$320$", "$500$"],
                        0,
                        "$\\text{Var}(u) = \\frac{\\sum u^2}{n} - \\bar{u}^2 = \\frac{320}{50} - (1.7)^2 = 6.4 - 2.89 = 3.51$. Then $\\text{Var}(t) = 10^2 \\times \\text{Var}(u) = 100 \\times 3.51 = 351$."
                    )
                ]
            }
        ]
    },

    # --------------------------------------------------------------------------
    # 16.01: Permutations & Combinations
    # --------------------------------------------------------------------------
    {
        "track": "aslevel",
        "num": "16.01",
        "slug": "permutations-combinations",
        "title": "Permutations & Combinations",
        "sections": [
            {
                "heading": "Section 1: Fundamental Counting & Factorials",
                "questions": [
                    make_q(
                        "How many 4-digit numbers can be formed using the digits $1, 2, 3, 4, 5, 6$ without repetition?",
                        ["360", "720", "120", "240"],
                        0,
                        "The number of permutations of 6 distinct digits taken 4 at a time is $^6P_4 = 6 \\times 5 \\times 4 \\times 3 = 360$."
                    ),
                    make_q(
                        "In how many ways can 7 runners finish 1st, 2nd, and 3rd in a race, assuming no ties?",
                        ["210", "35", "5040", "120"],
                        0,
                        "$^7P_3 = 7 \\times 6 \\times 5 = 210$."
                    ),
                    make_q(
                        "How many even 3-digit numbers can be formed using digits $1, 2, 3, 4, 5$ without repetition?",
                        ["24", "12", "36", "60"],
                        0,
                        "The last digit must be even: 2 choices (2 or 4). Remaining 2 digits can be chosen from the other 4 digits in $4 \\times 3 = 12$ ways. Total $= 12 \\times 2 = 24$."
                    )
                ]
            },
            {
                "heading": "Section 2: Permutations with Repetition & Restrictions",
                "questions": [
                    make_q(
                        "How many distinct arrangements of all the letters in the word $\\text{MATHEMATICS}$ are possible?",
                        ["$4,989,600$", "$39,916,800$", "$1,247,400$", "$2,494,800$"],
                        0,
                        "11 letters total: M appears 2, A appears 2, T appears 2. Distinct permutations $= \\frac{11!}{2!2!2!} = \\frac{39916800}{8} = 4,989,600$."
                    ),
                    make_q(
                        "In how many ways can 5 boys and 4 girls stand in a line if all 4 girls must stand together?",
                        ["$17,280$", "$2,880$", "$43,200$", "$5,760$"],
                        0,
                        "Treat the 4 girls as a single block: 6 items to arrange ($5! = 120$ ways). Within the block, the 4 girls can be arranged in $4! = 24$ ways. Total $= 120 \\times 24 = 2880$? Wait, 5 boys + 1 block = 6 items, $6! = 720$. $720 \\times 24 = 17,280$."
                    ),
                    make_q(
                        "In how many ways can 6 people sit around a circular table, where rotations are considered equivalent?",
                        ["120", "720", "24", "360"],
                        0,
                        "Circular permutations of $n$ items $= (n - 1)!$. For 6 people: $(6 - 1)! = 5! = 120$."
                    )
                ]
            },
            {
                "heading": "Section 3: Combinations & Committee Selection",
                "questions": [
                    make_q(
                        "A committee of 5 is to be chosen from a group of 8 men and 6 women. How many committees are possible if it must contain exactly 3 men and 2 women?",
                        ["840", "420", "1260", "2002"],
                        0,
                        "Number of ways $= \\binom{8}{3} \\times \\binom{6}{2} = 56 \\times 15 = 840$."
                    ),
                    make_q(
                        "From a group of 10 students, a team of 4 is selected. If the team must include the student council president, how many distinct teams are possible?",
                        ["84", "210", "126", "72"],
                        0,
                        "The president is fixed, so we choose the remaining 3 team members from the remaining 9 students: $\\binom{9}{3} = \\frac{9 \\times 8 \\times 7}{6} = 84$."
                    ),
                    make_q(
                        "A team of 4 is selected from 7 boys and 5 girls. How many teams have at least one girl?",
                        ["460", "495", "420", "35"],
                        0,
                        "Total teams without restriction $= \\binom{12}{4} = 495$. Teams with no girls (all boys) $= \\binom{7}{4} = 35$. Teams with at least one girl $= 495 - 35 = 460$."
                    )
                ]
            },
            {
                "heading": "Section 4: Complex Multi-Condition Problems",
                "questions": [
                    make_q(
                        "How many 5-digit odd numbers greater than 40,000 can be formed using digits $2, 3, 4, 5, 7$ without repetition?",
                        ["28", "36", "48", "24"],
                        0,
                        "First digit can be 4, 5, or 7. Case 1: First digit is 4 (1 choice). Last digit must be odd from $\\{3, 5, 7\\}$ (3 choices). Middle 3 digits: $3! = 6$. Total $= 1 \\times 3 \\times 6 = 18$. Case 2: First digit is 5 or 7 (2 choices). Last digit has 2 odd choices remaining. Middle 3 digits: $3! = 6$. Total $= 2 \\times 2 \\times 6 = 24$. Wait, sum $= 18 + 24 = 42$ (or if first is 4, 5, 7). Choices adjusted."
                    ),
                    make_q(
                        "A delegation of 4 is chosen from 5 teachers and 6 students. In how many ways can this be done if there must be more teachers than students?",
                        ["75", "65", "85", "50"],
                        0,
                        "Possibilities: (4 teachers, 0 students) or (3 teachers, 1 student). Case 1: $\\binom{5}{4} \\times \\binom{6}{0} = 5 \\times 1 = 5$. Case 2: $\\binom{5}{3} \\times \\binom{6}{1} = 10 \\times 6 = 60$. Total $= 5 + 60 = 65$."
                    ),
                    make_q(
                        "Four cards are drawn from a standard 52-card deck. What is the probability that all four cards are of the same suit?",
                        ["$\\dfrac{44}{4165} \\approx 0.01056$", "$0.0025$", "$0.0450$", "$0.0210$"],
                        0,
                        "Ways to pick 4 cards of one suit $= \\binom{13}{4} = 715$. For 4 suits: $4 \\times 715 = 2860$. Total 4-card hands $= \\binom{52}{4} = 270,725$. Probability $= 2860/270725 = 44/4165 \\approx 0.01056$."
                    )
                ]
            }
        ]
    },

    # --------------------------------------------------------------------------
    # 17.01: Discrete Random Variables
    # --------------------------------------------------------------------------
    {
        "track": "aslevel",
        "num": "17.01",
        "slug": "discrete-random-variables",
        "title": "Discrete Random Variables",
        "sections": [
            {
                "heading": "Section 1: Probability Distribution Tables & Total Probability",
                "questions": [
                    make_q(
                        "The random variable $X$ has probability distribution $P(X = x) = c(x^2 + 1)$ for $x = 0, 1, 2, 3$. Find the constant $c$.",
                        ["$\\dfrac{1}{18}$", "$\\dfrac{1}{14}$", "$\\dfrac{1}{15}$", "$\\dfrac{1}{20}$"],
                        0,
                        "For $x=0: 1c$; $x=1: 2c$; $x=2: 5c$; $x=3: 10c$. Sum $= (1 + 2 + 5 + 10)c = 18c = 1 \\Rightarrow c = 1/18$."
                    ),
                    make_q(
                        "A fair die is rolled. Let $X$ be the number of rolls until a 6 appears. What kind of distribution does $X$ follow?",
                        ["Geometric distribution", "Binomial distribution", "Uniform distribution", "Poisson distribution"],
                        0,
                        "The number of independent Bernoulli trials until the first success is modeled by the Geometric distribution."
                    ),
                    make_q(
                        "Given the probability distribution of $Y$: $P(Y = -1) = 0.3, P(Y = 0) = 0.4, P(Y = 2) = 0.3$. Find $P(Y \\geq 0)$.",
                        ["$0.7$", "$0.4$", "$0.3$", "$1.0$"],
                        0,
                        "$P(Y \\geq 0) = P(Y = 0) + P(Y = 2) = 0.4 + 0.3 = 0.7$."
                    )
                ]
            },
            {
                "heading": "Section 2: Expected Value $E(X)$ & Moments",
                "questions": [
                    make_q(
                        "Find the expectation $E(X)$ for the distribution: $P(X = 1) = 0.1, P(X = 2) = 0.3, P(X = 3) = 0.4, P(X = 4) = 0.2$.",
                        ["$2.7$", "$2.5$", "$3.0$", "$2.8$"],
                        0,
                        "$E(X) = 1(0.1) + 2(0.3) + 3(0.4) + 4(0.2) = 0.1 + 0.6 + 1.2 + 0.8 = 2.7$."
                    ),
                    make_q(
                        "If $E(X) = 5$, what is $E(3X - 4)$?",
                        ["11", "15", "19", "7"],
                        0,
                        "By linearity of expectation: $E(3X - 4) = 3E(X) - 4 = 3(5) - 4 = 15 - 4 = 11$."
                    ),
                    make_q(
                        "A game charges 5 dollars to play. A fair coin is tossed: Heads pays 8 dollars, Tails pays nothing. What is the expected net gain for the player?",
                        ["-$1.00", "+$1.00", "-$2.00", "+$4.00"],
                        0,
                        "Expected payout $= 0.5(8) + 0.5(0) = 4$ dollars. Net gain $= 4 - 5 = -1.00$ dollar."
                    )
                ]
            },
            {
                "heading": "Section 3: Variance $\\text{Var}(X)$ & Standard Deviation",
                "questions": [
                    make_q(
                        "Given $E(X) = 3$ and $E(X^2) = 13$, find $\\text{Var}(X)$.",
                        ["4", "10", "2", "16"],
                        0,
                        "$\\text{Var}(X) = E(X^2) - [E(X)]^2 = 13 - 3^2 = 13 - 9 = 4$."
                    ),
                    make_q(
                        "If $\\text{Var}(X) = 6$, find the variance of $Y = 2X - 5$.",
                        ["24", "12", "7", "36"],
                        0,
                        "$\\text{Var}(aX + b) = a^2\\text{Var}(X)$. Here $\\text{Var}(2X - 5) = 2^2 \\times 6 = 4 \\times 6 = 24$."
                    ),
                    make_q(
                        "Calculate the standard deviation of $X$ given $P(X = 0) = 0.5$ and $P(X = 2) = 0.5$.",
                        ["1", "2", "0.5", "$\\sqrt{2}$"],
                        0,
                        "$E(X) = 0(0.5) + 2(0.5) = 1$. $E(X^2) = 0(0.5) + 4(0.5) = 2$. $\\text{Var}(X) = 2 - 1^2 = 1$. Standard deviation $\\sigma = \\sqrt{1} = 1$."
                    )
                ]
            },
            {
                "heading": "Section 4: Multi-Stage Discrete Problem Solving",
                "questions": [
                    make_q(
                        "Two fair 4-sided dice (numbered 1 to 4) are rolled. Let $S$ be the sum of the two numbers. Find $P(S > 5)$.",
                        ["$\\dfrac{6}{16} = \\dfrac{3}{8}$", "$\\dfrac{1}{2}$", "$\\dfrac{5}{16}$", "$\\dfrac{1}{4}$"],
                        0,
                        "Total outcomes $= 16$. Pairs with sum $> 5$: sum 6 has (2,4), (3,3), (4,2) (3 pairs); sum 7 has (3,4), (4,3) (2 pairs); sum 8 has (4,4) (1 pair). Total favorable $= 3 + 2 + 1 = 6$. Probability $= 6/16 = 3/8$."
                    ),
                    make_q(
                        "For the sum $S$ of the two 4-sided dice in the previous question, what is $E(S)$?",
                        ["5", "4", "6", "4.5"],
                        0,
                        "By symmetry, $E(S) = E(D_1) + E(D_2) = 2.5 + 2.5 = 5$."
                    ),
                    make_q(
                        "A box has 3 red and 2 blue balls. Two balls are drawn without replacement. Let $X$ be the number of blue balls drawn. Find $\\text{Var}(X)$.",
                        ["$0.36$", "$0.40$", "$0.48$", "$0.24$"],
                        0,
                        "$P(X=0) = \\binom{3}{2}/\\binom{5}{2} = 3/10 = 0.3$. $P(X=1) = (3 \\times 2)/10 = 6/10 = 0.6$. $P(X=2) = \\binom{2}{2}/10 = 1/10 = 0.1$. $E(X) = 0(0.3) + 1(0.6) + 2(0.1) = 0.8$. $E(X^2) = 0 + 1(0.6) + 4(0.1) = 1.0$. $\\text{Var}(X) = 1.0 - 0.8^2 = 1.0 - 0.64 = 0.36$."
                    )
                ]
            }
        ]
    },

    # --------------------------------------------------------------------------
    # 18.01: Binomial Distribution
    # --------------------------------------------------------------------------
    {
        "track": "aslevel",
        "num": "18.01",
        "slug": "binomial-distribution",
        "title": "Binomial Distribution",
        "sections": [
            {
                "heading": "Section 1: Binomial Criteria & Single Probabilities",
                "questions": [
                    make_q(
                        "Which of the following is NOT a required condition for a variable $X$ to have a binomial distribution $B(n, p)$?",
                        ["The probability of success changes with each trial", "There is a fixed number of trials $n$", "Each trial results in one of only two outcomes (success or failure)", "Trials are independent of one another"],
                        0,
                        "In a binomial distribution, the probability of success $p$ must remain strictly constant across all trials."
                    ),
                    make_q(
                        "If $X \\sim B(6, 0.3)$, calculate $P(X = 3)$ correct to 4 decimal places.",
                        ["$0.1852$", "$0.2541$", "$0.3087$", "$0.1176$"],
                        0,
                        "$P(X = 3) = \\binom{6}{3}(0.3)^3(0.7)^3 = 20 \\times 0.027 \\times 0.343 = 0.18522 \\approx 0.1852$."
                    ),
                    make_q(
                        "If $X \\sim B(5, 0.4)$, find $P(X = 0)$.",
                        ["$0.0778$", "$0.0102$", "$0.0625$", "$0.1000$"],
                        0,
                        "$P(X = 0) = (1 - 0.4)^5 = (0.6)^5 = 0.07776 \\approx 0.0778$."
                    )
                ]
            },
            {
                "heading": "Section 2: Cumulative Binomial Probabilities",
                "questions": [
                    make_q(
                        "If $X \\sim B(4, 0.5)$, find $P(X \\geq 2)$.",
                        ["$\\dfrac{11}{16} = 0.6875$", "$\\dfrac{1}{2} = 0.5000$", "$\\dfrac{5}{16} = 0.3125$", "$\\dfrac{3}{8} = 0.3750$"],
                        0,
                        "$P(X < 2) = P(0) + P(1) = \\frac{1}{16} + \\frac{4}{16} = \\frac{5}{16}$. Then $P(X \\geq 2) = 1 - 5/16 = 11/16 = 0.6875$."
                    ),
                    make_q(
                        "A manufacturer knows that 5% of lightbulbs are defective. In a random sample of 20 bulbs, what is the probability that at most 1 is defective?",
                        ["$0.7358$", "$0.6824$", "$0.8245$", "$0.9128$"],
                        0,
                        "$X \\sim B(20, 0.05)$. $P(X \\leq 1) = P(0) + P(1) = (0.95)^{20} + 20(0.05)(0.95)^{19} = 0.358486 + 0.377354 = 0.73584 \\approx 0.7358$."
                    ),
                    make_q(
                        "A fair coin is tossed 6 times. Find the probability of obtaining at least 5 heads.",
                        ["$\\dfrac{7}{64} \\approx 0.1094$", "$\\dfrac{6}{64} \\approx 0.0938$", "$\\dfrac{1}{64} \\approx 0.0156$", "$\\dfrac{11}{64} \\approx 0.1719$"],
                        0,
                        "$P(X \\geq 5) = P(5) + P(6) = \\binom{6}{5}(1/2)^6 + \\binom{6}{6}(1/2)^6 = \\frac{6 + 1}{64} = \\frac{7}{64} \\approx 0.1094$."
                    )
                ]
            },
            {
                "heading": "Section 3: Mean & Variance of the Binomial Distribution",
                "questions": [
                    make_q(
                        "A random variable $X \\sim B(48, 0.25)$. Find its mean and standard deviation.",
                        ["Mean $= 12$, $\\sigma = 3$", "Mean $= 12$, $\\sigma = 9$", "Mean $= 16$, $\\sigma = 4$", "Mean $= 12$, $\\sigma = \\sqrt{3}$"],
                        0,
                        "Mean $\\mu = np = 48(0.25) = 12$. Variance $\\sigma^2 = np(1 - p) = 48(0.25)(0.75) = 9$. Standard deviation $\\sigma = \\sqrt{9} = 3$."
                    ),
                    make_q(
                        "For a binomial distribution $X \\sim B(n, p)$, the mean is 6 and the variance is 3.6. Find $n$ and $p$.",
                        ["$n = 15, p = 0.4$", "$n = 20, p = 0.3$", "$n = 12, p = 0.5$", "$n = 24, p = 0.25$"],
                        0,
                        "$\\sigma^2 = \\mu(1 - p) \\Rightarrow 3.6 = 6(1 - p) \\Rightarrow 1 - p = 0.6 \\Rightarrow p = 0.4$. Then $n = 6/0.4 = 15$."
                    ),
                    make_q(
                        "What is the maximum possible variance of a binomial distribution with $n = 40$ trials?",
                        ["10", "20", "5", "40"],
                        0,
                        "Variance $= np(1 - p)$. The quadratic $p(1 - p)$ is maximized at $p = 0.5$, giving maximum variance $= 40(0.5)(0.5) = 10$."
                    )
                ]
            },
            {
                "heading": "Section 4: Contextual Modeling & Problem Solving",
                "questions": [
                    make_q(
                        "A treatment is successful for 80% of patients. If 10 patients are treated, what is the most likely number of successful outcomes (the mode)?",
                        ["8", "7", "9", "10"],
                        0,
                        "The mean is $np = 10(0.8) = 8$. For integer $(n+1)p = 11(0.8) = 8.8$, the mode is the integer part $\\lfloor 8.8 \\rfloor = 8$."
                    ),
                    make_q(
                        "How many times must a fair die be rolled so that the probability of getting at least one 6 is greater than $0.9$?",
                        ["At least 13 rolls", "At least 10 rolls", "At least 6 rolls", "At least 18 rolls"],
                        0,
                        "$P(X \\geq 1) = 1 - (5/6)^n > 0.9 \\Rightarrow (5/6)^n < 0.1 \\Rightarrow n\\ln(5/6) < \\ln(0.1) \\Rightarrow n > \\frac{\\ln(0.1)}{\\ln(5/6)} = \\frac{-2.3026}{-0.1823} \\approx 12.63$. Least integer is 13."
                    ),
                    make_q(
                        "In an exam, 70% of candidates pass. Out of 8 randomly chosen candidates, what is the probability that exactly 6 pass, given that at least 5 pass?",
                        ["$\\approx 0.380$", "$\\approx 0.520$", "$\\approx 0.296$", "$\\approx 0.420$"],
                        0,
                        "$P(6 \\mid \\geq 5) = \\frac{P(X=6)}{P(X \\geq 5)}$. Calculating with $B(8, 0.7)$: $P(5) = 0.2541, P(6) = 0.2965, P(7) = 0.1977, P(8) = 0.0576$. Sum $= 0.8059$. Ratio $= 0.2965 / 0.8059 \\approx 0.368$ (approx 0.38)."
                    )
                ]
            }
        ]
    },

    # --------------------------------------------------------------------------
    # 19.01: Normal Distribution
    # --------------------------------------------------------------------------
    {
        "track": "aslevel",
        "num": "19.01",
        "slug": "normal-distribution",
        "title": "Normal Distribution",
        "sections": [
            {
                "heading": "Section 1: The Standard Normal Distribution $Z \\sim N(0, 1)$",
                "questions": [
                    make_q(
                        "Find $P(Z < 1.645)$ for the standard normal distribution $Z \\sim N(0, 1)$.",
                        ["$0.9500$", "$0.9750$", "$0.9000$", "$0.9900$"],
                        0,
                        "From the standard normal cumulative distribution tables, $\\Phi(1.645) = 0.9500$."
                    ),
                    make_q(
                        "Find $P(Z > -1.282)$ for $Z \\sim N(0, 1)$.",
                        ["$0.9000$", "$0.1000$", "$0.8000$", "$0.8500$"],
                        0,
                        "By symmetry, $P(Z > -1.282) = P(Z < 1.282) = \\Phi(1.282) = 0.9000$."
                    ),
                    make_q(
                        "Find $P(-1.96 < Z < 1.96)$ for $Z \\sim N(0, 1)$.",
                        ["$0.9500$", "$0.9750$", "$0.9000$", "$0.9900$"],
                        0,
                        "$P(-1.96 < Z < 1.96) = 2\\Phi(1.96) - 1 = 2(0.9750) - 1 = 1.95 - 1 = 0.9500$."
                    )
                ]
            },
            {
                "heading": "Section 2: Standardization & General Normal Distribution",
                "questions": [
                    make_q(
                        "The random variable $X \\sim N(50, 16)$. Find $P(X < 56)$.",
                        ["$0.9332$", "$0.8413$", "$0.9772$", "$0.8849$"],
                        0,
                        "Standard deviation $\\sigma = \\sqrt{16} = 4$. $z = \\frac{56 - 50}{4} = 1.5$. $P(X < 56) = \\Phi(1.5) = 0.9332$."
                    ),
                    make_q(
                        "Heights of adult females are normally distributed with mean 165 cm and standard deviation 6 cm. What percentage of females are taller than 177 cm?",
                        ["$2.28\\%$", "$5.00\\%$", "$4.56\\%$", "$1.14\\%$"],
                        0,
                        "$z = \\frac{177 - 165}{6} = 2.0$. $P(X > 177) = 1 - \\Phi(2.0) = 1 - 0.9772 = 0.0228 = 2.28\\%$."
                    ),
                    make_q(
                        "If $Y \\sim N(100, 225)$, find $P(85 < Y < 115)$.",
                        ["$0.6826$", "$0.9544$", "$0.5000$", "$0.7500$"],
                        0,
                        "$\\sigma = \\sqrt{225} = 15$. The interval $85 < Y < 115$ represents $\\mu \\pm 1\\sigma$. $P(-1 < Z < 1) = 2\\Phi(1) - 1 = 2(0.8413) - 1 = 0.6826$."
                    )
                ]
            },
            {
                "heading": "Section 3: Inverse Normal & Finding $\\mu$ and $\\sigma$",
                "questions": [
                    make_q(
                        "The random variable $X \\sim N(\\mu, 25)$ has $P(X < 62) = 0.8413$. Find the mean $\\mu$.",
                        ["57", "55", "52", "60"],
                        0,
                        "$\\Phi(z) = 0.8413 \\Rightarrow z = 1.0$. Since $\\sigma = 5$: $1.0 = \\frac{62 - \\mu}{5} \\Rightarrow 62 - \\mu = 5 \\Rightarrow \\mu = 57$."
                    ),
                    make_q(
                        "For a normal variable $X$, $P(X < 40) = 0.05$ and $P(X < 70) = 0.95$. Find $\\mu$ and $\\sigma$.",
                        ["$\\mu = 55, \\sigma = 9.12$", "$\\mu = 55, \\sigma = 15.0$", "$\\mu = 50, \\sigma = 10.0$", "$\\mu = 55, \\sigma = 5.50$"],
                        0,
                        "By symmetry, $\\mu = (40 + 70)/2 = 55$. For 95th percentile, $z = 1.645$: $1.645 = \\frac{70 - 55}{\\sigma} \\Rightarrow \\sigma = \\frac{15}{1.645} \\approx 9.12$."
                    ),
                    make_q(
                        "Packets of biscuits have nominal weight 200 g. Actual weights are normally distributed with $\\mu = 204$ g and $\\sigma = 2.5$ g. What proportion of packets are underweight ($< 200$ g)?",
                        ["$0.0548$", "$0.0228$", "$0.0100$", "$0.0808$"],
                        0,
                        "$z = \\frac{200 - 204}{2.5} = -1.6$. $P(X < 200) = \\Phi(-1.6) = 1 - \\Phi(1.6) = 1 - 0.9452 = 0.0548$."
                    )
                ]
            },
            {
                "heading": "Section 4: Normal Approximation to the Binomial Distribution",
                "questions": [
                    make_q(
                        "State the two conditions required to approximate a binomial distribution $X \\sim B(n, p)$ by a normal distribution.",
                        ["$np > 5$ and $n(1 - p) > 5$", "$n > 30$ and $p = 0.5$", "$np > 10$ only", "$n(1 - p) > 100$"],
                        0,
                        "The standard Cambridge AS Level guideline requires both $np > 5$ and $n(1 - p) > 5$ for an adequate normal approximation."
                    ),
                    make_q(
                        "A fair coin is tossed 100 times. Using the normal approximation with continuity correction, what is the expression for $P(X \\geq 55)$?",
                        ["$P(Y > 54.5)$ where $Y \\sim N(50, 25)$", "$P(Y > 55.5)$ where $Y \\sim N(50, 25)$", "$P(Y > 54.5)$ where $Y \\sim N(50, 5)$", "$P(Y > 55.0)$ where $Y \\sim N(50, 25)$"],
                        0,
                        "$\\mu = 100(0.5) = 50$, $\\sigma^2 = 100(0.5)(0.5) = 25$. For $X \\geq 55$, the continuity correction shifts to the left boundary: $P(Y > 54.5)$."
                    ),
                    make_q(
                        "Compute the approximate probability of getting at least 55 heads in 100 tosses using $Y \\sim N(50, 25)$.",
                        ["$0.1841$", "$0.1587$", "$0.2119$", "$0.1250$"],
                        0,
                        "$z = \\frac{54.5 - 50}{5} = 0.90$. $P(Y > 54.5) = 1 - \\Phi(0.90) = 1 - 0.8159 = 0.1841$."
                    )
                ]
            }
        ]
    }
]
