#!/usr/bin/env python3
"""Standardized 4-Page Topic Data for AP Statistics - Part 1 (Topics 1.01 to 2.02).

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

APSTATS_TOPICS_P1 = [
    # --------------------------------------------------------------------------
    # APSTATS 1.01: Measures of Center & Spread
    # --------------------------------------------------------------------------
    {
        "track": "apstats",
        "num": "1.01",
        "slug": "measures-of-center-and-spread",
        "title": "Measures of Center & Spread",
        "sections": [
            {
                "heading": "Section 1: Mean, Median, and Skewness",
                "questions": [
                    make_q(
                        "In a strongly right-skewed distribution of household incomes, which relationship between the mean and median is typically expected?",
                        [
                            "The mean is greater than the median",
                            "The mean is less than the median",
                            "The mean equals the median",
                            "The relationship cannot be determined without sample size"
                        ],
                        0,
                        "In right-skewed distributions, unusually large values pull the mean toward the right tail, making the mean greater than the median."
                    ),
                    make_q(
                        "Which summary statistic is considered resistant to extreme outliers?",
                        [
                            "Median and Interquartile Range (IQR)",
                            "Mean and Standard Deviation",
                            "Range and Mean",
                            "Standard Deviation and Variance"
                        ],
                        0,
                        "The median and IQR are based on order statistics/ranks and are resistant to extreme outliers, unlike the mean and standard deviation which incorporate every numeric value."
                    ),
                    make_q(
                        "A dataset has values: $3, 5, 7, 8, 9, 11, 15$. If the maximum value $15$ is replaced with $50$, which statistic will NOT change?",
                        ["Median", "Mean", "Range", "Standard Deviation"],
                        0,
                        "The median is the 4th value ($8$). Changing the extreme value from $15$ to $50$ leaves the order and the middle value ($8$) unchanged."
                    )
                ]
            },
            {
                "heading": "Section 2: The 1.5 x IQR Rule for Outliers",
                "questions": [
                    make_q(
                        "A dataset has $Q_1 = 24$ and $Q_3 = 40$. According to the $1.5 \\times \\text{IQR}$ rule, what are the lower and upper outlier boundaries?",
                        [
                            "Lower: $0$; Upper: $64$",
                            "Lower: $8$; Upper: $56$",
                            "Lower: $16$; Upper: $48$",
                            "Lower: $12$; Upper: $60$"
                        ],
                        0,
                        "$\\text{IQR} = Q_3 - Q_1 = 40 - 24 = 16$. $1.5 \\times \\text{IQR} = 24$. Lower boundary: $Q_1 - 24 = 24 - 24 = 0$. Upper boundary: $Q_3 + 24 = 40 + 24 = 64$."
                    ),
                    make_q(
                        "If a distribution has five-number summary: $\\text{Min} = 10, Q_1 = 20, \\text{Med} = 28, Q_3 = 35, \\text{Max} = 62$, which value is an outlier?",
                        ["$62$", "$10$", "Both $10$ and $62$", "Neither"],
                        0,
                        "$\\text{IQR} = 35 - 20 = 15$. Upper threshold: $35 + 1.5(15) = 35 + 22.5 = 57.5$. Lower threshold: $20 - 22.5 = -2.5$. Since $62 > 57.5$, $62$ is an upper outlier. $10 > -2.5$, so $10$ is not an outlier."
                    ),
                    make_q(
                        "What percentage of observations in any distribution lies strictly between $Q_1$ and $Q_3$?",
                        ["Approximately $50\\%$", "$25\\%$", "$75\\%$", "$68\\%$"],
                        0,
                        "By definition, $Q_1$ is at the 25th percentile and $Q_3$ is at the 75th percentile, so exactly the middle $50\\%$ of data lies within the interquartile range."
                    )
                ]
            },
            {
                "heading": "Section 3: Standard Deviation and Variance",
                "questions": [
                    make_q(
                        "What does sample standard deviation $s$ measure in a dataset?",
                        [
                            "The typical distance of data points from the sample mean",
                            "The distance between the maximum and minimum observations",
                            "The difference between the mean and median",
                            "The percentage of values that are negative"
                        ],
                        0,
                        "Standard deviation measures the typical (or average) distance of observations from the arithmetic mean."
                    ),
                    make_q(
                        "If every observation in a sample has the exact same value of $14$, what is the sample standard deviation?",
                        ["$0$", "$14$", "$1$", "Undefined"],
                        0,
                        "When all observations are identical, there is zero variability, so each deviation from the mean ($14 - 14 = 0$) is zero, resulting in $s = 0$."
                    ),
                    make_q(
                        "Why is $(n - 1)$ used in the denominator of the sample variance $s^2 = \\frac{\\sum (x_i - \\bar{x})^2}{n - 1}$ instead of $n$?",
                        [
                            "To make $s^2$ an unbiased estimator of the population variance $\\sigma^2$",
                            "To ensure the standard deviation is always an integer",
                            "Because one observation is always assumed to be an outlier",
                            "To adjust for potential measurement errors in the sample"
                        ],
                        0,
                        "Dividing by $n - 1$ provides degrees of freedom correction so that the expected value of $s^2$ equals $\\sigma^2$, making it an unbiased estimator."
                    )
                ]
            },
            {
                "heading": "Section 4: Comparing Distributions with Boxplots",
                "questions": [
                    make_q(
                        "A boxplot shows a long right whisker, a right-half box wider than the left-half box, and no outliers. What is the shape of the distribution?",
                        ["Skewed to the right", "Skewed to the left", "Roughly symmetric", "Uniform"],
                        0,
                        "An elongated right whisker and a wider upper half of the box indicate that values in the upper $50\\%$ are spread over a wider interval, characteristic of a right-skewed distribution."
                    ),
                    make_q(
                        "When comparing two test score distributions, School A has $\\text{median} = 78, \\text{IQR} = 12$ and School B has $\\text{median} = 85, \\text{IQR} = 6$. Which statement is justified?",
                        [
                            "School B typically scored higher and exhibited less variability in the middle $50\\%$ of scores",
                            "School A had a higher maximum score than School B",
                            "School A had higher consistency in student scores",
                            "School B had more outliers than School A"
                        ],
                        0,
                        "School B's higher median ($85 > 78$) indicates higher central tendency, and its smaller IQR ($6 < 12$) shows less spread and higher consistency among the middle $50\\%$."
                    ),
                    make_q(
                        "Which display allows you to recover the original raw data values?",
                        ["Stem-and-leaf plot", "Boxplot", "Histogram", "Cumulative relative frequency plot"],
                        0,
                        "A stem-and-leaf plot retains all individual data values in its stems and leaves, whereas boxplots and histograms bin or summarize data into aggregates."
                    )
                ]
            }
        ]
    },

    # --------------------------------------------------------------------------
    # APSTATS 1.02: Z-Scores & Linear Transformations
    # --------------------------------------------------------------------------
    {
        "track": "apstats",
        "num": "1.02",
        "slug": "z-scores-and-linear-transformations",
        "title": "Z-Scores & Linear Transformations",
        "sections": [
            {
                "heading": "Section 1: Calculating and Interpreting Z-Scores",
                "questions": [
                    make_q(
                        "A student scores $82$ on an exam where the class mean is $74$ and the standard deviation is $5$. What is the student's standardized $z$-score?",
                        ["$1.60$", "$1.20$", "$0.80$", "$-1.60$"],
                        0,
                        "$z = \\frac{x - \\mu}{\\sigma} = \\frac{82 - 74}{5} = \\frac{8}{5} = 1.60$."
                    ),
                    make_q(
                        "What does a $z$-score of $-2.4$ indicate about an observation?",
                        [
                            "The observation is $2.4$ standard deviations below the mean",
                            "The observation is $2.4$ units below the mean",
                            "The observation is in the 2.4th percentile",
                            "The probability of the observation is negative"
                        ],
                        0,
                        "A $z$-score measures the signed number of standard deviations an observation falls relative to the arithmetic mean; negative indicates below the mean."
                    ),
                    make_q(
                        "On Test 1, Alice scored $88$ (mean $80$, SD $4$). On Test 2, she scored $92$ (mean $85$, SD $5$). On which test did she perform relatively better compared to peers?",
                        [
                            "Test 1 ($z_1 = 2.0 > z_2 = 1.4$)",
                            "Test 2 ($z_2 = 1.4 > z_1 = 1.0$)",
                            "Both performances were identical",
                            "Test 2 because her raw score was $92$ vs $88$"
                        ],
                        0,
                        "Test 1: $z_1 = \\frac{88 - 80}{4} = 2.0$. Test 2: $z_2 = \\frac{92 - 85}{5} = 1.4$. Performance relative to peers is higher on Test 1."
                    )
                ]
            },
            {
                "heading": "Section 2: Linear Transformations - Adding a Constant",
                "questions": [
                    make_q(
                        "A dataset has mean $\\mu = 50$ and standard deviation $\\sigma = 8$. If $5$ points are added to every observation ($y = x + 5$), what are the new mean and standard deviation?",
                        [
                            "New mean $= 55$, New $\\text{SD} = 8$",
                            "New mean $= 55$, New $\\text{SD} = 13$",
                            "New mean $= 50$, New $\\text{SD} = 13$",
                            "New mean $= 55$, New $\\text{SD} = 40$"
                        ],
                        0,
                        "Adding a constant shifts all measures of center (mean increases by 5 to 55), but does not alter measures of spread (standard deviation remains 8)."
                    ),
                    make_q(
                        "If a constant $c = 10$ is subtracted from every value in a dataset, which statistic changes?",
                        ["Median", "Range", "IQR", "Variance"],
                        0,
                        "Subtracting a constant shifts the center (median decreases by 10), but leaves all measures of spread (range, IQR, variance, standard deviation) unchanged."
                    ),
                    make_q(
                        "A teacher curves a test by adding 8 points to all student scores. How does this affect the shape of the score distribution?",
                        [
                            "The shape remains exactly the same",
                            "The distribution becomes more symmetric",
                            "The distribution becomes skewed to the right",
                            "The spread increases"
                        ],
                        0,
                        "Adding a constant is a rigid shift of the distribution along the axis; it has zero impact on the shape or spread."
                    )
                ]
            },
            {
                "heading": "Section 3: Linear Transformations - Multiplying by a Constant",
                "questions": [
                    make_q(
                        "A dataset of temperatures in Celsius has mean $20^{\\circ}\\text{C}$ and standard deviation $4^{\\circ}\\text{C}$. Converting to Fahrenheit using $F = 1.8C + 32$, what are the new mean and standard deviation?",
                        [
                            "Mean $= 68^{\\circ}\\text{F}$, $\\text{SD} = 7.2^{\\circ}\\text{F}$",
                            "Mean $= 68^{\\circ}\\text{F}$, $\\text{SD} = 39.2^{\\circ}\\text{F}$",
                            "Mean $= 36^{\\circ}\\text{F}$, $\\text{SD} = 7.2^{\\circ}\\text{F}$",
                            "Mean $= 68^{\\circ}\\text{F}$, $\\text{SD} = 4.0^{\\circ}\\text{F}$"
                        ],
                        0,
                        "New mean: $1.8(20) + 32 = 36 + 32 = 68^{\\circ}\\text{F}$. New standard deviation: $|1.8| \\times 4 = 7.2^{\\circ}\\text{F}$ (addition of $+32$ does not affect spread)."
                    ),
                    make_q(
                        "If all observations in a dataset with variance $16$ are multiplied by $-3$, what is the new variance?",
                        ["$144$", "$-48$", "$48$", "$12$"],
                        0,
                        "Multiplying by constant $b$ multiplies variance by $b^2$. Here $(-3)^2 \\times 16 = 9 \\times 16 = 144$."
                    ),
                    make_q(
                        "If every observation is multiplied by $0.5$, how does the IQR change?",
                        [
                            "The IQR is halved (multiplied by $0.5$)",
                            "The IQR is unchanged",
                            "The IQR is quartered (multiplied by $0.25$)",
                            "The IQR doubles"
                        ],
                        0,
                        "Measures of spread are multiplied by $|b|$. With $b = 0.5$, the new IQR is $0.5 \\times \\text{old IQR}$."
                    )
                ]
            },
            {
                "heading": "Section 4: Standardizing an Entire Distribution",
                "questions": [
                    make_q(
                        "If an entire non-normal distribution with mean $\\mu = 40$ and $\\text{SD} = 6$ is converted to $z$-scores ($z = \\frac{x - 40}{6}$), what are the mean and standard deviation of the standardized values?",
                        [
                            "Mean $= 0$, Standard Deviation $= 1$",
                            "Mean $= 40$, Standard Deviation $= 1$",
                            "Mean $= 0$, Standard Deviation $= 6$",
                            "Mean $= 1$, Standard Deviation $= 0$"
                        ],
                        0,
                        "Standardizing any distribution (regardless of shape) by subtracting its mean and dividing by its standard deviation always produces a new distribution with mean $0$ and standard deviation $1$."
                    ),
                    make_q(
                        "Does standardizing a skewed dataset into $z$-scores transform the distribution into a normal shape?",
                        [
                            "No, standardizing changes center and scale but preserves the original skewed shape",
                            "Yes, standardizing always creates a standard normal bell curve",
                            "Only if the sample size is greater than 30",
                            "Yes, because the mean becomes 0 and standard deviation becomes 1"
                        ],
                        0,
                        "Standardization is a linear transformation ($z = \\frac{1}{\\sigma}x - \\frac{\\mu}{\\sigma}$). Linear transformations never change the fundamental shape of a distribution."
                    ),
                    make_q(
                        "A runner's race time is at the 85th percentile of all competitors. What does this mean?",
                        [
                            "The runner was faster than $85\\%$ of competitors (finished with lower time than $15\\%$ of competitors)",
                            "The runner scored an $85\\%$ on the race",
                            "The runner finished in the top $85\\%$",
                            "$85\\%$ of competitors finished before this runner"
                        ],
                        0,
                        "In general percentile terminology, the $p$th percentile is the value such that $p$ percent of observations fall at or below it."
                    )
                ]
            }
        ]
    },

    # --------------------------------------------------------------------------
    # APSTATS 1.03: Describing Distributions & Linear Regression
    # --------------------------------------------------------------------------
    {
        "track": "apstats",
        "num": "1.03",
        "slug": "describing-distributions-and-linear-regression",
        "title": "Describing Distributions & Linear Regression",
        "sections": [
            {
                "heading": "Section 1: Interpreting the Least-Squares Regression Line (LSRL)",
                "questions": [
                    make_q(
                        "A regression model predicting used car price in dollars from age in years is $\\hat{y} = 24000 - 1800x$. Interpret the slope $-1800$ in context.",
                        [
                            "For each additional year of car age, the predicted price decreases by 1,800 dollars",
                            "A car loses exactly 1,800 dollars every year",
                            "When the car is 0 years old, its predicted price is $-1,800$ dollars",
                            "The correlation between age and price is $-1800$"
                        ],
                        0,
                        "The slope of an LSRL indicates the predicted (or estimated average) change in the response variable ($y$) for each 1-unit increase in the explanatory variable ($x$)."
                    ),
                    make_q(
                        "In the model $\\hat{y} = 45 + 3.2x$, what is the predicted value of $y$ when $x = 10$?",
                        ["$77.0$", "$48.2$", "$32.0$", "$145.0$"],
                        0,
                        "Substitute $x = 10$: $\\hat{y} = 45 + 3.2(10) = 45 + 32 = 77.0$."
                    ),
                    make_q(
                        "Why is the line called the 'least-squares' regression line?",
                        [
                            "It minimizes the sum of the squared vertical residuals $\\sum (y - \\hat{y})^2$",
                            "It minimizes the sum of squared distances to the origin",
                            "It maximizes the square of the correlation coefficient",
                            "It guarantees all residuals are perfect squares"
                        ],
                        0,
                        "The LSRL is mathematically derived to minimize the sum of squared vertical differences between observed and predicted values."
                    )
                ]
            },
            {
                "heading": "Section 2: Residuals and Residual Plots",
                "questions": [
                    make_q(
                        "An observed data point is $(x, y) = (5, 38)$. The regression equation is $\\hat{y} = 12 + 6x$. What is the residual for this observation?",
                        ["$-4$", "$4$", "$42$", "$-2$"],
                        0,
                        "Predicted value: $\\hat{y} = 12 + 6(5) = 42$. Residual $= y - \\hat{y} = 38 - 42 = -4$."
                    ),
                    make_q(
                        "What does a positive residual signify?",
                        [
                            "The actual observed response was greater than the model predicted",
                            "The actual observed response was less than the model predicted",
                            "The regression line has a positive slope",
                            "The correlation coefficient must be positive"
                        ],
                        0,
                        "Residual is $\\text{actual} - \\text{predicted} = y - \\hat{y}$. A positive residual means $y > \\hat{y}$ (the observed point lies above the regression line)."
                    ),
                    make_q(
                        "Which pattern in a residual plot indicates that a linear model is appropriate?",
                        [
                            "A random scatter of points with no discernible pattern around the residual $= 0$ line",
                            "A clear curved U-shape pattern",
                            "A fan shape where residuals expand as $x$ increases",
                            "Points clustered strictly along an inclined line"
                        ],
                        0,
                        "A random scatter of residuals around 0 with constant vertical spread indicates that a linear relationship is suitable for the data."
                    )
                ]
            },
            {
                "heading": "Section 3: Correlation Coefficient r and Coefficient of Determination r^2",
                "questions": [
                    make_q(
                        "If the coefficient of determination is $r^2 = 0.64$ and the slope of the regression line is negative, what is the correlation coefficient $r$?",
                        ["$-0.80$", "$0.80$", "$-0.64$", "$-0.4096$"],
                        0,
                        "$r = \\pm \\sqrt{r^2} = \\pm \\sqrt{0.64} = \\pm 0.80$. Because the slope is negative, $r$ must share the same sign: $r = -0.80$."
                    ),
                    make_q(
                        "What is the correct statistical interpretation of $r^2 = 0.75$?",
                        [
                            "$75\\%$ of the variation in the response variable $y$ is explained by the linear relationship with $x$",
                            "$75\\%$ of the data points lie directly on the regression line",
                            "The slope of the regression line is $0.75$",
                            "There is a $75\\%$ probability that $x$ causes $y$"
                        ],
                        0,
                        "$r^2$ measures the proportion of variability in the response variable that is accounted for by the linear model with the explanatory variable."
                    ),
                    make_q(
                        "Which statement about the correlation coefficient $r$ is FALSE?",
                        [
                            "If the units of $x$ are converted from inches to centimeters, $r$ will increase by a factor of $2.54$",
                            "$r$ is always between $-1$ and $1$ inclusive",
                            "Switching the roles of $x$ and $y$ does not change $r$",
                            "$r$ measures only the strength and direction of linear relationships"
                        ],
                        0,
                        "Correlation $r$ is standardized and dimensionless; changing units of measurement has zero effect on $r$."
                    )
                ]
            },
            {
                "heading": "Section 4: Outliers, Leverage, and Influential Points",
                "questions": [
                    make_q(
                        "A point that has an extreme $x$-value relative to the rest of the data is said to have:",
                        ["High leverage", "A large residual", "High correlation", "Negative slope"],
                        0,
                        "Observations with extreme explanatory ($x$) values possess high leverage, giving them significant potential to alter the slope of the regression line."
                    ),
                    make_q(
                        "What makes a data point an 'influential point' in linear regression?",
                        [
                            "Removing the point substantially alters the slope, intercept, or correlation",
                            "It has a residual equal to 0",
                            "It lies directly at $(\\bar{x}, \\bar{y})$",
                            "It has both positive $x$ and positive $y$ coordinates"
                        ],
                        0,
                        "An influential point is one whose removal causes a marked change in the regression parameters (slope, intercept, or $r$)."
                    ),
                    make_q(
                        "Does a strong correlation between two variables $x$ and $y$ imply that changes in $x$ cause changes in $y$?",
                        [
                            "No, correlation does not imply causation due to potential confounding variables",
                            "Yes, as long as $|r| > 0.95$",
                            "Yes, provided the relationship is strictly linear",
                            "No, unless the sample size is at least 1,000"
                        ],
                        0,
                        "Association does not imply causation. Observational associations can arise from lurking or confounding variables."
                    )
                ]
            }
        ]
    },

    # --------------------------------------------------------------------------
    # APSTATS 2.01: Sampling Methods & Bias
    # --------------------------------------------------------------------------
    {
        "track": "apstats",
        "num": "2.01",
        "slug": "sampling-methods-and-bias",
        "title": "Sampling Methods & Bias",
        "sections": [
            {
                "heading": "Section 1: Probability Sampling Designs",
                "questions": [
                    make_q(
                        "Which sampling method gives every possible group of $n$ individuals an equal chance of being chosen?",
                        [
                            "Simple Random Sample (SRS)",
                            "Stratified Random Sample",
                            "Cluster Sample",
                            "Systematic Sample"
                        ],
                        0,
                        "By definition, a Simple Random Sample (SRS) of size $n$ guarantees that every individual and every subset of $n$ individuals has the exact same probability of selection."
                    ),
                    make_q(
                        "A university administrator divides students by class year (Freshman, Sophomore, Junior, Senior) and takes an SRS of 50 students from each group. What sampling technique was used?",
                        [
                            "Stratified random sampling",
                            "Cluster sampling",
                            "Systematic sampling",
                            "Convenience sampling"
                        ],
                        0,
                        "Dividing the population into homogeneous strata (class years) and selecting a random sample from every stratum is stratified random sampling."
                    ),
                    make_q(
                        "A city divides its territory into 40 voting precincts. Five precincts are randomly chosen, and every resident in those 5 precincts is surveyed. What sampling method is this?",
                        [
                            "Cluster sampling",
                            "Stratified sampling",
                            "Simple random sampling",
                            "Multistage convenience sampling"
                        ],
                        0,
                        "Dividing the population into heterogeneous clusters (precincts), randomly choosing whole clusters, and surveying all members within selected clusters is cluster sampling."
                    )
                ]
            },
            {
                "heading": "Section 2: Selection Bias & Undercoverage",
                "questions": [
                    make_q(
                        "A local radio station asks listeners to text their opinion on a proposed city tax. What primary source of bias affects this sample?",
                        [
                            "Voluntary response bias",
                            "Undercoverage of rural citizens",
                            "Nonresponse bias",
                            "Measurement bias"
                        ],
                        0,
                        "Voluntary response samples suffer from bias because participants self-select, heavily over-representing individuals with strong negative or extreme viewpoints."
                    ),
                    make_q(
                        "Conducting an opinion poll by calling registered landline telephone numbers will most likely suffer from:",
                        [
                            "Undercoverage of younger adults who only use mobile phones",
                            "Response bias due to interviewer intimidation",
                            "Nonresponse bias caused by excessive mailings",
                            "Confounding of demographic variables"
                        ],
                        0,
                        "Undercoverage occurs when certain subgroups of the target population (such as mobile-only households) are systematically omitted from the sampling frame."
                    ),
                    make_q(
                        "Can increasing the sample size from $100$ to $10,000$ eliminate bias in a voluntary response survey?",
                        [
                            "No, a larger biased sample simply estimates the biased quantity more precisely",
                            "Yes, large samples eliminate all forms of sampling bias by the Law of Large Numbers",
                            "Yes, provided $n \\geq 1000$",
                            "Only if the population is normally distributed"
                        ],
                        0,
                        "Sample size reduces sampling variability (random error), but cannot fix systematic design flaws or bias."
                    )
                ]
            },
            {
                "heading": "Section 3: Nonresponse and Response Bias",
                "questions": [
                    make_q(
                        "A survey mailed to 1,000 households receives 65 completed responses. What is the primary concern for validity?",
                        [
                            "Nonresponse bias, because non-respondents may hold systematically different views",
                            "Undercoverage bias",
                            "Stratification bias",
                            "Question wording bias"
                        ],
                        0,
                        "Nonresponse bias arises when individuals chosen for the sample cannot be contacted or refuse to participate, leading to non-representative results."
                    ),
                    make_q(
                        "A police officer in uniform asks high school students face-to-face if they have ever consumed alcohol. Which bias will most likely distort the findings?",
                        [
                            "Response bias, as students are likely to lie to authority figures",
                            "Selection bias",
                            "Voluntary response bias",
                            "Cluster bias"
                        ],
                        0,
                        "Response bias occurs when the interviewer, phrasing, or social desirability influences respondents to provide inaccurate or untruthful answers."
                    ),
                    make_q(
                        "Which survey question contains wording bias?",
                        [
                            "'Given the catastrophic national debt, do you support reckless government spending increases?'",
                            "'Do you support or oppose increasing funding for public transit?'",
                            "'What is your favorite beverage?'",
                            "'How many days per week do you exercise?'"
                        ],
                        0,
                        "Using emotionally loaded words ('catastrophic', 'reckless') introduces leading question/wording bias."
                    )
                ]
            },
            {
                "heading": "Section 4: Parameters vs. Statistics",
                "questions": [
                    make_q(
                        "In statistical notation, which symbol represents a population parameter rather than a sample statistic?",
                        ["$\\mu$", "$\\bar{x}$", "$s$", "$\\hat{p}$"],
                        0,
                        "$\\mu$ represents the true population mean (a parameter). $\\bar{x}, s, \\hat{p}$ are sample statistics calculated from sample data."
                    ),
                    make_q(
                        "A random sample of 250 voters found that $54\\%$ favor a bond measure. The number $54\\%$ is a:",
                        ["Statistic ($\\hat{p}$)", "Parameter ($p$)", "Standard error", "Margin of error"],
                        0,
                        "Any numerical summary computed directly from a sample is a statistic."
                    ),
                    make_q(
                        "What is sampling variability?",
                        [
                            "The natural variation of sample statistics from one random sample to another",
                            "Mistakes made by the surveyor during data collection",
                            "Differences caused by biased question wording",
                            "Variability that occurs when sample size is too large"
                        ],
                        0,
                        "Sampling variability refers to the fact that different random samples from the same population will yield slightly different values of the statistic."
                    )
                ]
            }
        ]
    },

    # --------------------------------------------------------------------------
    # APSTATS 2.02: Experimental Design & Scope of Inference
    # --------------------------------------------------------------------------
    {
        "track": "apstats",
        "num": "2.02",
        "slug": "experimental-design-and-scope-of-inference",
        "title": "Experimental Design & Scope of Inference",
        "sections": [
            {
                "heading": "Section 1: Observational Studies vs. Experiments",
                "questions": [
                    make_q(
                        "What essential feature distinguishes a randomized experiment from an observational study?",
                        [
                            "Treatments are actively imposed on experimental units by the researcher",
                            "A larger sample size is used",
                            "Participants are randomly surveyed by phone",
                            "Data is collected over a longer time period"
                        ],
                        0,
                        "In an experiment, researchers deliberately apply treatments to experimental units to observe responses. In observational studies, conditions are merely observed without intervention."
                    ),
                    make_q(
                        "Researchers observe that people who drink green tea daily have lower rates of cardiovascular disease. Can they conclude that green tea prevents heart disease?",
                        [
                            "No, observational studies cannot establish cause-and-effect due to potential confounding variables",
                            "Yes, because the association is statistically significant",
                            "Yes, provided at least 10,000 subjects were observed",
                            "Only if green tea drinkers were matched by age"
                        ],
                        0,
                        "Causation cannot be inferred from observational studies because lifestyle, diet, or exercise factors may confound the relationship."
                    ),
                    make_q(
                        "Only which type of statistical investigation allows researchers to establish cause-and-effect conclusions?",
                        [
                            "A well-designed randomized comparative experiment",
                            "A large-scale stratified observational study",
                            "A voluntary response poll with $n > 50,000$",
                            "A census of the population"
                        ],
                        0,
                        "Only well-controlled experiments with random assignment of treatments can establish causal relationships."
                    )
                ]
            },
            {
                "heading": "Section 2: Principles of Experimental Design",
                "questions": [
                    make_q(
                        "What is the primary purpose of random assignment in an experiment?",
                        [
                            "To create roughly equivalent treatment groups and balance out confounding variables",
                            "To ensure the sample represents the entire population",
                            "To eliminate all experimental error",
                            "To prevent the need for a control group"
                        ],
                        0,
                        "Random assignment balances the effects of uncontrolled extraneous variables across treatment groups, ensuring differences in response can be attributed to the treatments."
                    ),
                    make_q(
                        "What role does a control group serve in an experiment?",
                        [
                            "Provides a baseline measurement to compare against active treatments",
                            "Ensures the experiment has a large enough sample size",
                            "Guarantees that subjects do not know which treatment they receive",
                            "Eliminates the need for replication"
                        ],
                        0,
                        "A control group serves as a baseline comparison to evaluate whether changes in the response variable are truly due to the active treatment."
                    ),
                    make_q(
                        "In experimental design, what does 'replication' mean?",
                        [
                            "Assigning multiple experimental units to each treatment group",
                            "Repeating the entire experiment in another country",
                            "Using identical equipment across all trials",
                            "Testing subjects multiple times in a row"
                        ],
                        0,
                        "Replication means applying treatments to sufficiently many experimental units so that treatment effects can be distinguished from chance variation."
                    )
                ]
            },
            {
                "heading": "Section 3: Blinding, Placebos, and Confounding",
                "questions": [
                    make_q(
                        "What is a double-blind experiment?",
                        [
                            "Neither the subjects nor the individuals evaluating the outcomes know which treatment each subject received",
                            "Neither the researcher nor the subjects know the purpose of the study",
                            "The experiment is conducted in a darkened laboratory",
                            "Both the control group and treatment group receive identical active medications"
                        ],
                        0,
                        "In a double-blind study, neither the participants nor the evaluators/data recorders know which treatment was assigned, preventing psychological and diagnostic bias."
                    ),
                    make_q(
                        "What is the 'placebo effect'?",
                        [
                            "When subjects show improvement simply from the psychological expectation of receiving a treatment",
                            "When a drug causes adverse side effects in control patients",
                            "When experimental units drop out of a clinical trial",
                            "When researchers unconsciously bias results"
                        ],
                        0,
                        "The placebo effect occurs when patients respond positively to an inactive treatment due to the psychological expectation of healing."
                    ),
                    make_q(
                        "What is a confounding variable?",
                        [
                            "A variable related to both the explanatory variable and response variable that obscures whether the treatment caused the outcome",
                            "A variable that is held constant across all treatment conditions",
                            "A calculation error during hypothesis testing",
                            "A categorical variable with more than two levels"
                        ],
                        0,
                        "A confounding variable is associated with the treatment group assignment and also affects the response, making it impossible to isolate the treatment's effect."
                    )
                ]
            },
            {
                "heading": "Section 4: Blocking and Scope of Inference",
                "questions": [
                    make_q(
                        "When should an experimenter implement a randomized block design?",
                        [
                            "When there is an identified characteristic expected to affect the response, so subjects are grouped by that trait before randomization",
                            "When the sample size is too small for simple random assignment",
                            "When double-blinding is completely impossible",
                            "To avoid having to use a control group"
                        ],
                        0,
                        "Blocking groups units by a known source of variability (e.g. age, gender) prior to random assignment of treatments, reducing unexplained variation within blocks."
                    ),
                    make_q(
                        "A matched pairs design is a special form of:",
                        ["Block design", "Cluster sampling", "Stratified survey", "Completely randomized design"],
                        0,
                        "Matched pairs is a block design where blocks consist of pairs of closely matched units, or where each subject receives both treatments in random order."
                    ),
                    make_q(
                        "If subjects are volunteers (not randomly selected from a population) but are randomly assigned to treatments, what inference can be drawn?",
                        [
                            "Causation can be inferred, but only for individuals similar to the volunteer participants",
                            "Results can be generalized to the entire national population",
                            "No valid statistical conclusions can be drawn",
                            "Association only, causation cannot be established"
                        ],
                        0,
                        "Random assignment allows causal inference; lack of random selection from the population limits generalizability to subjects similar to those who participated."
                    )
                ]
            }
        ]
    }
]
