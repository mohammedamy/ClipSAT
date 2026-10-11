/* Interactive Practice data for /apstats/ - one entry per chapter section id.
   Shipped as public/js/ix/apstats.js and loaded only on that track's page by the
   engine in src/scripts/modules/19-interactive-activities-engine-v1.js
   (Plan 5 Phase 5.015, ADR 0033). Entry shapes (qc/mt/tf/sb/sr/fn/num/ord/cat)
   are documented there. */
(window.__ixData = window.__ixData || []).push(function (D) {
D['aps-overview']=[
{t:'qc',ti:'Quick Check: AP Statistics Four Core Areas',q:'What are the four foundational pillars of the AP Statistics curriculum?',o:['Exploring Data, Sampling & Experimentation, Probability & Simulation, and Statistical Inference','Derivatives, Integrals, Series, and Vector Fields','Euclidean Geometry, Axioms, Logic, and Proofs','Boolean Logic, Algorithms, Combinatorics, and Sorting'],a:0,ex:'AP Statistics is structured around four themes: (1) Exploring Data, (2) Sampling and Experimentation, (3) Anticipating Patterns (Probability & Simulation), and (4) Statistical Inference.'},
{t:'mt',ti:'Matching: Types of Statistical Inference',p:[{l:'Confidence Interval',r:'Estimates a plausible range for an unknown parameter'},{l:'Hypothesis Test',r:'Assesses evidence against a null hypothesis'},{l:'P-value',r:'Probability of observing results as extreme given H₀ is true'},{l:'Type I Error',r:'Rejecting a true null hypothesis (false positive)'}]},
{t:'num',ti:'Numeric Entry: Question 6 Weight in Section II',q:'What percentage of the Section II Free Response score is allocated to Question 6 (the Investigative Task)?',a:'25',tol:0.1,ex:'Question 6 is the Investigative Task and accounts for 25% of the total Section II Free Response score (1/4 of total FRQ points).'}
];

D['aps-u1']=[
{t:'qc',ti:'Quick Check: Summary Statistics',q:'Which is most resistant to outliers?',o:['Mean','Mode','Median','Range'],a:2,ex:'Median is resistant; mean is not.'},
{t:'sr',ti:'Worked Example: Standard Deviation of a Small Data Set',steps:[
  'Find the standard deviation of \\(2,4,6,8\\) (as a population). Find the mean: \\(\\dfrac{2+4+6+8}{4}=5\\).',
  'Find squared deviations from the mean: \\((2-5)^2=9\\), \\((4-5)^2=1\\), \\((6-5)^2=1\\), \\((8-5)^2=9\\).',
  'Average the squared deviations: \\(\\dfrac{9+1+1+9}{4}=5\\) — this is the variance.',
  'Standard deviation \\(=\\sqrt5\\approx2.24\\).'
]},
{t:'num',ti:'Numeric Entry: Upper Fence for Outliers',q:'A dataset has \\(Q_1 = 15\\) and \\(Q_3 = 24\\). What is the value of the upper fence \\(Q_3 + 1.5 \\times \\text{IQR}\\) above which points are considered outliers?',a:'37.5',tol:0.1,ex:'\\(\\text{IQR} = 24 - 15 = 9\\). Upper fence \\(= 24 + 1.5(9) = 24 + 13.5 = 37.5\\).'},
{t:'cat',ti:'Categorize: Variable Classification',prompt:'Classify each variable as categorical or quantitative:',categories:['Categorical','Quantitative'],items:[
  {s:'ZIP code of a household',cat:0},
  {s:'Annual household income in dollars',cat:1},
  {s:'Hair color',cat:0},
  {s:'Number of siblings',cat:1},
  {s:'Preferred streaming platform',cat:0}
]}
];

D['aps-u2']=[
{t:'mt',ti:'Matching: Sampling Methods',p:[{l:'All members equally likely',r:'Simple random'},{l:'Divide into groups, sample each',r:'Stratified'},{l:'Select every k-th member',r:'Systematic'},{l:'Randomly select entire clusters',r:'Cluster'}]},
{t:'sr',ti:'Worked Example: Designing a True Experiment',steps:[
  'A researcher wants to know if a new fertilizer increases crop yield. An observational study would just record yields from farms already using different fertilizers — this can\'t establish causation, since other factors (soil quality, sunlight) may differ between farms too.',
  'A true experiment requires random assignment: randomly assign plots of land to receive the new fertilizer or a control fertilizer.',
  'Random assignment balances out confounding variables between groups, so any yield difference can be attributed to the fertilizer itself.'
]},
{t:'cat',ti:'Categorize: Sampling vs. Experimental Terms',prompt:'Classify each term by whether it belongs to sampling design or experimental design:',categories:['Sampling Design','Experimental Design'],items:[
  {s:'Stratified selection',cat:0},
  {s:'Double-blinding',cat:1},
  {s:'Placebo control group',cat:1},
  {s:'Undercoverage bias',cat:0},
  {s:'Randomized block design',cat:1},
  {s:'Cluster selection',cat:0}
]},
{t:'ord',ti:'Order the Steps: Completely Randomized Experiment',prompt:'Arrange the steps to design a completely randomized experiment testing an insomnia medication:',items:[
  'Obtain a volunteer group of insomnia patients',
  'Randomly assign subjects into two equal groups (treatment and placebo)',
  'Administer the medication or placebo in a double-blind manner for 4 weeks',
  'Measure sleep quality scores in both groups',
  'Compare mean sleep quality scores between treatment and control groups'
],ex:'Recruit subjects, randomly assign treatments, administer blinded, measure response, compare groups.'}
];

D['aps-u3']=[
{t:'tf',ti:'True or False: Probability',items:[{s:'\\(P(A\\cup B)=P(A)+P(B)-P(A\\cap B)\\)',a:true,ex:'Addition rule.'},{s:'Independent: \\(P(A\\cap B)=P(A)\\cdot P(B)\\)',a:true,ex:'Multiplication rule.'},{s:'\\(P(A)+P(A^c)=0\\)',a:false,ex:'\\(P(A)+P(A^c)=1\\).'},{s:'\\(E(X)=\\sum x\\cdot P(x)\\)',a:true,ex:'Definition of expected value.'}]},
{t:'fn',ti:'Explorer: Normal Distribution Shape',fns:[{expr:'exp(-(x^2)/(2*s^2))',color:'#1E3A6E',label:'normal(σ)'}],xrange:[-6,6],yrange:[0,1.2],params:[{name:'s',label:'Standard deviation σ',min:0.5,max:2.5,step:0.5,default:1}]},
{t:'sr',ti:'Worked Example: Binomial Probability',steps:[
  'A fair coin is flipped 4 times. Find \\(P(\\text{exactly 3 heads})\\). Binomial formula: \\(P(X=k)=\\binom{n}{k}p^k(1-p)^{n-k}\\).',
  'Here \\(n=4\\), \\(k=3\\), \\(p=0.5\\): \\(P(X=3)=\\binom43(0.5)^3(0.5)^1\\).',
  'Compute: \\(\\binom43=4\\), so \\(P=4\\times0.125\\times0.5=0.25\\).'
]},
{t:'num',ti:'Numeric Entry: Binomial Expected Value',q:'For a binomial random variable \\(X \\sim B(40, 0.25)\\), what is the expected value \\(\\mu = np\\)?',a:'10',tol:0.01,ex:'\\(\\mu = np = 40 \\times 0.25 = 10\\).'},
{t:'ord',ti:'Order the Steps: Standardizing a Normal Random Variable',prompt:'Arrange the steps to find \\(P(X < 65)\\) where \\(X \\sim N(50, 10)\\):',items:[
  'Identify parameters: mean \\(\\mu = 50\\) and standard deviation \\(\\sigma = 10\\)',
  'Calculate the z-score: \\(z = (65 - 50) / 10 = 1.5\\)',
  'Look up \\(z = 1.5\\) on the standard normal table (or evaluate \\(\\Phi(1.5)\\))',
  'Conclude that \\(P(X < 65) = P(Z < 1.5) \\approx 0.9332\\)'
],ex:'Identify μ and σ, calculate z, find table area, state probability.'}
];

D['aps-u4']=[
{t:'sb',ti:'Step Builder: One-proportion z-test',steps:[{l:'Null hypothesis: \\(H_0: p=\\)',a:'p0',h:'claimed proportion'},{l:'Test stat uses which distribution?',a:'normal',h:'Standard normal'},{l:'If p-value < α, we:',a:'reject H0',h:'reject null hypothesis'}]},
{t:'sr',ti:'Worked Example: Interpreting a Confidence Interval',steps:[
  'A poll of 400 people finds 60% support a policy, with a margin of error of 4%. The confidence interval is the sample proportion plus or minus the margin of error: \\(60\\%\\pm4\\%\\).',
  'This gives the interval \\([56\\%,64\\%]\\).',
  'Interpretation: we are confident the <em>true population proportion</em> supporting the policy lies between 56% and 64% — not that 56–64% of THIS sample supports it (we already know that\'s 60%).'
]},
{t:'num',ti:'Numeric Entry: Chi-Square Expected Cell Count',q:'In a 2x2 contingency table, Row 1 total is 60, Column 1 total is 50, and the grand total is 200. What is the expected cell count \\(E\\) for Cell (1,1)?',a:'15',tol:0.01,ex:'\\(E = (\\text{Row total} \\times \\text{Col total}) / \\text{Grand total} = (60 \\times 50) / 200 = 3000 / 200 = 15\\).'},
{t:'cat',ti:'Categorize: Statistical Errors & Power',prompt:'Classify each statement as describing a Type I Error, Type II Error, or Statistical Power:',categories:['Type I Error (α)','Type II Error (β)','Statistical Power (1 - β)'],items:[
  {s:'Rejecting a true null hypothesis (false positive)',cat:0},
  {s:'Failing to reject a false null hypothesis (false negative)',cat:1},
  {s:'Probability of correctly rejecting a false null hypothesis',cat:2},
  {s:'Directly set by the chosen significance level α',cat:0},
  {s:'Increases when sample size n increases',cat:2}
]},
{t:'ord',ti:'Order the Steps: 4-Step Hypothesis Testing',prompt:'Arrange the standard College Board 4-step hypothesis testing sequence:',items:[
  'State: Define parameters, state H₀ and Hₐ, and specify significance level α',
  'Plan: Identify inference method and verify Random, 10%, and Large Counts conditions',
  'Do: Calculate sample statistics, standard error, test statistic, and p-value',
  'Conclude: Compare p-value to α and interpret rejection or failure to reject in context'
],ex:'State, Plan, Do, Conclude.'}
];
});
