/* Interactive Practice data for /apstats/ - one entry per chapter section id.
   Shipped as public/js/ix/apstats.js and loaded only on that track's page by the
   engine in src/scripts/modules/19-interactive-activities-engine-v1.js
   (Plan 5 Phase 5.015, ADR 0033). Entry shapes (qc/mt/tf/sb/sr/fn/num/ord/cat)
   are documented there. */
(window.__ixData = window.__ixData || []).push(function (D) {

D['aps-overview'] = [
  {
    t: 'qc',
    ti: 'Quick Check: AP Statistics Four Core Areas',
    q: 'What are the four foundational pillars of the AP Statistics curriculum?',
    o: [
      'Exploring Data, Sampling & Experimentation, Probability & Simulation, and Statistical Inference',
      'Derivatives, Integrals, Series, and Vector Fields',
      'Euclidean Geometry, Axioms, Logic, and Proofs',
      'Boolean Logic, Algorithms, Combinatorics, and Sorting'
    ],
    a: 0,
    ex: 'AP Statistics is structured around four themes: (1) Exploring Data, (2) Sampling and Experimentation, (3) Anticipating Patterns (Probability & Simulation), and (4) Statistical Inference.'
  },
  {
    t: 'tf',
    ti: 'Reasoning Lab: AP Statistics Exam Format & Rules',
    items: [
      { s: 'A graphing calculator with statistical distribution functions is permitted on both Section I and Section II.', a: true, ex: 'Graphing calculators are allowed throughout the entire exam.' },
      { s: 'Writing "accept the null hypothesis" is acceptable phrasing when the p-value is greater than alpha.', a: false, ex: 'We never accept H₀; we only "fail to reject H₀" due to lack of convincing evidence.' },
      { s: 'Question 6 (the Investigative Task) accounts for 25% of the total Section II Free Response score.', a: true, ex: 'Question 6 is weighted as 25% of Section II.' }
    ]
  },
  {
    t: 'num',
    ti: 'Pacing Check: Average Minutes per Question for Questions 1 to 5',
    q: 'Section II lasts 90 minutes. If 25 minutes are reserved for Question 6, how many average minutes are available per question for Questions 1 through 5?',
    a: 13,
    tol: 0.1,
    unit: 'min/question',
    h: 'Subtract 25 from 90, then divide by 5.',
    sol: '\\(\\dfrac{90 - 25}{5} = \\dfrac{65}{5} = 13\\text{ minutes/question}\\).'
  },
  {
    t: 'ord',
    ti: 'Exam Protocol: Section II Free Response Strategy',
    q: 'Arrange the sequence of steps for managing the 90-minute Section II Free Response:',
    items: [
      'Take 2 minutes to skim Questions 1 through 5 and identify the most familiar scenarios.',
      'Answer Questions 1 through 5 cleanly with full context and units within the first 65 minutes.',
      'Transition to Question 6 (Investigative Task) with at least 25 minutes remaining.',
      'Read the unfamiliar statistical concept introduced in Question 6 and relate it to foundational principles.',
      'Review all answers to confirm that every interpretation references the real-world context.'
    ]
  },
  {
    t: 'cat',
    ti: 'Classify Topics by Primary Curriculum Theme',
    categories: ['Exploring Data & Sampling', 'Probability & Inference'],
    items: [
      { s: 'Boxplots, five-number summary, and IQR outlier fences', cat: 0 },
      { s: 'Two-sample t-test for difference between means', cat: 1 },
      { s: 'Simple random sampling and stratified selection', cat: 0 },
      { s: 'Binomial distribution formula and cumulative probabilities', cat: 1 },
      { s: 'Confounding variables and randomized block design', cat: 0 },
      { s: 'Type I and Type II errors and statistical power', cat: 1 }
    ]
  }
];

D['aps-u1'] = [
  {
    t: 'qc',
    ti: 'Quick Check: Summary Statistics Resistance',
    q: 'Which numerical summary of center is resistant to extreme outliers and skewed distributions?',
    o: ['Median', 'Mean', 'Standard Deviation', 'Range'],
    a: 0,
    ex: 'The median is resistant to outliers because it depends on order rather than magnitude. Mean, range, and standard deviation are non-resistant.'
  },
  {
    t: 'sr',
    ti: 'Worked Example: Standard Deviation of a Small Data Set',
    steps: [
      'Find the standard deviation of \\(2,4,6,8\\) (as a population). Find the mean: \\(\\dfrac{2+4+6+8}{4}=5\\).',
      'Find squared deviations from the mean: \\((2-5)^2=9\\), \\((4-5)^2=1\\), \\((6-5)^2=1\\), \\((8-5)^2=9\\).',
      'Average the squared deviations: \\(\\dfrac{9+1+1+9}{4}=5\\) — this is the variance.',
      'Standard deviation \\(=\\sqrt5\\approx2.24\\).'
    ]
  },
  {
    t: 'num',
    ti: 'Calculation Lab: Upper Fence for Outliers',
    q: 'A dataset has \\(Q_1 = 15\\) and \\(Q_3 = 24\\). What is the value of the upper fence \\(Q_3 + 1.5 \\times \\text{IQR}\\) above which points are considered outliers?',
    a: 37.5,
    tol: 0.1,
    h: 'Find IQR = Q3 - Q1, then compute Q3 + 1.5(IQR).',
    sol: '\\(\\text{IQR} = 24 - 15 = 9\\). \\(\\text{Upper fence} = 24 + 1.5(9) = 24 + 13.5 = 37.5\\).'
  },
  {
    t: 'ord',
    ti: 'Data Protocol: Constructing a Modified Boxplot',
    q: 'Arrange the sequence of steps for drawing a modified boxplot showing outliers:',
    items: [
      'Order data values and determine the five-number summary: Min, Q₁, Median, Q₃, and Max.',
      'Calculate the interquartile range: \\(\\text{IQR} = Q_3 - Q_1\\).',
      'Calculate outlier cutoff fences: lower fence \\(Q_1 - 1.5(\\text{IQR})\\) and upper fence \\(Q_3 + 1.5(\\text{IQR})\\).',
      'Draw the central box from Q₁ to Q₃ with a vertical line marking the Median.',
      'Extend whiskers to the most extreme data values inside the fences, and plot any points beyond fences as individual asterisks.'
    ]
  },
  {
    t: 'cat',
    ti: 'Classify Variables as Categorical or Quantitative',
    categories: ['Categorical Variable', 'Quantitative Variable'],
    items: [
      { s: 'ZIP code of a household', cat: 0 },
      { s: 'Annual household income in dollars', cat: 1 },
      { s: 'Hair color', cat: 0 },
      { s: 'Number of siblings', cat: 1 },
      { s: 'Preferred streaming platform', cat: 0 },
      { s: 'Commute distance in miles', cat: 1 }
    ]
  }
];

D['aps-u2'] = [
  {
    t: 'qc',
    ti: 'Quick Check: Establishing Causation',
    q: 'Which study design is necessary to establish a cause-and-effect relationship between variables?',
    o: [
      'A well-designed randomized controlled experiment',
      'A large voluntary response sample survey',
      'An observational longitudinal cohort study',
      'A census of the entire target population'
    ],
    a: 0,
    ex: 'Only a randomized experiment with random assignment of treatments to experimental units can balance confounding variables and prove causation.'
  },
  {
    t: 'sr',
    ti: 'Worked Example: Designing a True Experiment',
    steps: [
      'A researcher wants to know if a new fertilizer increases crop yield. An observational study would just record yields from farms already using different fertilizers — this can\'t establish causation, since other factors (soil quality, sunlight) may differ between farms too.',
      'A true experiment requires random assignment: randomly assign plots of land to receive the new fertilizer or a control fertilizer.',
      'Random assignment balances out confounding variables between groups, so any yield difference can be attributed to the fertilizer itself.'
    ]
  },
  {
    t: 'num',
    ti: 'Calculation Lab: Stratified Sample Allocation',
    q: 'A high school has 400 seniors, 500 juniors, 500 sophomores, and 600 freshmen (2000 students total). If a proportional stratified sample of 100 students is chosen, how many freshmen should be sampled?',
    a: 30,
    tol: 0.1,
    h: 'Find the proportion of freshmen (600/2000 = 0.30) and multiply by the total sample size 100.',
    sol: '\\(\\dfrac{600}{2000} \\times 100 = 0.30 \\times 100 = 30\\text{ freshmen}\\).'
  },
  {
    t: 'ord',
    ti: 'Experimental Protocol: Completely Randomized Experiment',
    q: 'Arrange the sequence of steps to design a completely randomized experiment testing an insomnia medication:',
    items: [
      'Recruit a volunteer group of insomnia patients and obtain informed consent.',
      'Randomly assign subjects into two equal groups (treatment and placebo control).',
      'Administer the medication or placebo in a double-blind manner for 4 weeks.',
      'Measure sleep quality scores objectively for all subjects in both groups.',
      'Compare mean sleep quality improvement between treatment and control groups using a two-sample t-test.'
    ]
  },
  {
    t: 'cat',
    ti: 'Classify Study Design Terminology',
    categories: ['Sampling Design Concept', 'Experimental Design Concept'],
    items: [
      { s: 'Stratified selection across geographic strata', cat: 0 },
      { s: 'Double-blinding of evaluators and subjects', cat: 1 },
      { s: 'Placebo control group to control psychological effects', cat: 1 },
      { s: 'Undercoverage and nonresponse bias', cat: 0 },
      { s: 'Randomized block design blocking by age', cat: 1 },
      { s: 'Cluster sampling of entire school homerooms', cat: 0 }
    ]
  }
];

D['aps-u3'] = [
  {
    t: 'tf',
    ti: 'Reasoning Lab: Probability Rules',
    items: [
      { s: '\\(P(A \\cup B) = P(A) + P(B) - P(A \\cap B)\\) for any two events.', a: true, ex: 'The general addition rule.' },
      { s: 'If events \\(A\\) and \\(B\\) are independent, \\(P(A \\cap B) = P(A) \\cdot P(B)\\).', a: true, ex: 'The multiplication rule for independent events.' },
      { s: 'Two mutually exclusive events with non-zero probabilities can also be independent.', a: false, ex: 'If A occurs, B cannot occur (P(B|A) = 0 ≠ P(B)), so mutually exclusive events are always dependent.' }
    ]
  },
  {
    t: 'fn',
    ti: 'Explorer: Normal Distribution Shape',
    fns: [{ expr: 'exp(-(x^2)/(2*s^2))', color: '#1E3A6E', label: 'normal(σ)' }],
    xrange: [-6, 6],
    yrange: [0, 1.2],
    params: [{ name: 's', label: 'Standard deviation σ', min: 0.5, max: 2.5, step: 0.5, default: 1 }]
  },
  {
    t: 'num',
    ti: 'Calculation Lab: Binomial Expected Value',
    q: 'For a binomial random variable \\(X \\sim B(40, 0.25)\\), what is the expected value \\(\\mu = np\\)?',
    a: 10,
    tol: 0.01,
    h: 'Multiply n by p.',
    sol: '\\(\\mu = np = 40 \\times 0.25 = 10\\).'
  },
  {
    t: 'ord',
    ti: 'Normal Distribution Protocol: Standardization Workflow',
    q: 'Arrange the steps to find \\(P(X < 65)\\) where \\(X \\sim N(50, 10^2)\\):',
    items: [
      'Identify distribution parameters: mean \\(\\mu = 50\\) and standard deviation \\(\\sigma = 10\\).',
      'Calculate the standardized z-score: \\(z = \\dfrac{65 - 50}{10} = 1.5\\).',
      'Look up \\(z = 1.5\\) on the standard normal table or evaluate \\(\\Phi(1.5)\\).',
      'State the cumulative probability: \\(P(X < 65) = P(Z < 1.5) \\approx 0.9332\\).'
    ]
  },
  {
    t: 'cat',
    ti: 'Classify Probability Models by Setting',
    categories: ['Binomial Distribution Setting', 'Geometric Distribution Setting'],
    items: [
      { s: 'Counting the number of successes in a fixed number \\(n\\) of independent trials', cat: 0 },
      { s: 'Counting the number of trials until the first success occurs', cat: 1 },
      { s: 'Probability mass function \\(P(X = k) = \\binom{n}{k}p^k(1-p)^{n-k}\\)', cat: 0 },
      { s: 'Probability formula \\(P(Y = k) = (1-p)^{k-1}p\\)', cat: 1 },
      { s: 'Expected value is \\(\\mu = np\\)', cat: 0 },
      { s: 'Expected value is \\(\\mu = 1/p\\)', cat: 1 }
    ]
  },
  {
    t: 'sr',
    ti: 'Worked Example: Binomial Probability',
    steps: [
      'A fair coin is flipped 4 times. Find \\(P(\\text{exactly 3 heads})\\). Binomial formula: \\(P(X=k)=\\binom{n}{k}p^k(1-p)^{n-k}\\).',
      'Here \\(n=4\\), \\(k=3\\), \\(p=0.5\\): \\(P(X=3)=\\binom43(0.5)^3(0.5)^1\\).',
      'Compute: \\(\\binom43=4\\), so \\(P=4\\times0.125\\times0.5=0.25\\).'
    ]
  }
];

D['aps-u4'] = [
  {
    t: 'qc',
    ti: 'Quick Check: Interpreting P-values',
    q: 'In a hypothesis test for a population mean, a p-value of 0.03 means:',
    o: [
      'If the null hypothesis is true, the probability of obtaining a sample mean as or more extreme than observed is 0.03',
      'The probability that the null hypothesis is true is 0.03',
      'The probability that the alternative hypothesis is false is 0.03',
      'There is a 97% probability that the null hypothesis should be accepted'
    ],
    a: 0,
    ex: 'A p-value is the conditional probability of observing test results at least as extreme as the sample data, assuming H₀ is true.'
  },
  {
    t: 'sr',
    ti: 'Worked Example: Interpreting a Confidence Interval',
    steps: [
      'A poll of 400 people finds 60% support a policy, with a margin of error of 4%. The confidence interval is the sample proportion plus or minus the margin of error: \\(60\\%\\pm4\\%\\).',
      'This gives the interval \\([56\\%,64\\%]\\).',
      'Interpretation: we are confident the <em>true population proportion</em> supporting the policy lies between 56% and 64% — not that 56–64% of THIS sample supports it (we already know that\'s 60%).'
    ]
  },
  {
    t: 'num',
    ti: 'Calculation Lab: Chi-Square Expected Cell Count',
    q: 'In a 2x2 contingency table, Row 1 total is 60, Column 1 total is 50, and the grand total is 200. What is the expected cell count \\(E\\) for Cell (1,1)?',
    a: 15,
    tol: 0.01,
    h: 'Multiply row total by column total and divide by grand total: (60 * 50) / 200.',
    sol: '\\(E = \\dfrac{60 \\times 50}{200} = \\dfrac{3000}{200} = 15\\).'
  },
  {
    t: 'ord',
    ti: 'Inference Protocol: 4-Step Hypothesis Testing Workflow',
    q: 'Arrange the standard College Board 4-step hypothesis testing sequence:',
    items: [
      'State: Define population parameters, state H₀ and Hₐ, and specify significance level α.',
      'Plan: Identify the inference procedure and verify Random, 10%, and Large Counts conditions.',
      'Do: Calculate sample statistics, test statistic (z or t), and corresponding p-value.',
      'Conclude: Compare p-value to α and interpret rejection or failure to reject in real-world context.'
    ]
  },
  {
    t: 'cat',
    ti: 'Categorize: Statistical Errors & Power',
    categories: ['Type I Error (α)', 'Type II Error (β)', 'Statistical Power (1 - β)'],
    items: [
      { s: 'Rejecting a true null hypothesis (false positive)', cat: 0 },
      { s: 'Failing to reject a false null hypothesis (false negative)', cat: 1 },
      { s: 'Probability of correctly rejecting a false null hypothesis', cat: 2 },
      { s: 'Directly set by the chosen significance level α', cat: 0 },
      { s: 'Increases when sample size n increases', cat: 2 }
    ]
  }
];

});
