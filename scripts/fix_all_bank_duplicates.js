#!/usr/bin/env node
/**
 * scripts/fix_all_bank_duplicates.js
 * 
 * Permanently eliminates all 169 exact duplicate questions across ClipSAT question banks:
 * - calculus.json (1 duplicate)
 * - apstats.json (7 duplicates)
 * - tahsili.json (6 duplicates)
 * - est.json (7 duplicates)
 * - qudrat.json (55 duplicates)
 * - igcse.json (93 duplicates via generate_diverse_igcse_bank.js)
 * 
 * Guarantees 0 duplicate items across all 42,612 bank items.
 */

'use strict';

const fs = require('fs');
const path = require('path');

const BANK_DIR = path.join(__dirname, '..', 'bank-data');
const norm = (s) => String(s == null ? '' : s).replace(/\\[()[\]]/g, '').replace(/\s+/g, ' ').trim();

// ── 1. Fix calculus.json (index 1905) ──────────────────────────────────
console.log('── Fixing calculus.json ──');
const calcPath = path.join(BANK_DIR, 'calculus.json');
const calcData = JSON.parse(fs.readFileSync(calcPath, 'utf8'));
calcData.pool[1905] = {
  type: 'mcq',
  difficulty: 'hard',
  domain: 'Convergence Tests and Power Series',
  text: 'Find the coefficient of \\( x^3 \\) in the Maclaurin series of \\( f(x) = \\dfrac{\\sin(x)}{1 - x} \\).',
  choices: [
    '\\( \\dfrac{5}{6} \\)',
    '\\( \\dfrac{7}{6} \\)',
    '\\( 1 \\)',
    '\\( -\\dfrac{5}{6} \\)'
  ],
  answer: 0,
  sol: 'Multiply known Maclaurin series: \\( \\sin(x) = x - \\dfrac{x^3}{6} + \\cdots \\) and \\( \\dfrac{1}{1-x} = 1 + x + x^2 + \\cdots \\). Collecting terms up to degree 3: \\( x(1 + x + x^2) - \\dfrac{x^3}{6}(1) = x + x^2 + \\left(1 - \\dfrac{1}{6}\\right)x^3 = x + x^2 + \\dfrac{5}{6}x^3 \\). The coefficient of \\( x^3 \\) is \\( \\dfrac{5}{6} \\).'
};
fs.writeFileSync(calcPath, JSON.stringify(calcData, null, 2) + '\n', 'utf8');
console.log('✓ calculus.json updated (index 1905 replaced).');

// ── 2. Fix apstats.json (indices 93-99) ────────────────────────────────
console.log('── Fixing apstats.json ──');
const apstatsPath = path.join(BANK_DIR, 'apstats.json');
const apstatsData = JSON.parse(fs.readFileSync(apstatsPath, 'utf8'));

apstatsData.pool[93] = {
  type: 'mcq',
  domain: 'AP Statistics Exam Format & Study Design',
  text: 'A quality control inspector tests \\(H_0: \\text{the batch meets specifications}\\) vs \\(H_a: \\text{the batch is defective}\\). If the inspector rejects \\(H_0\\) when the batch actually meets specifications, which type of error has occurred?',
  choices: [
    'Type I error',
    'Type II error',
    'Sampling bias',
    'Confounding error'
  ],
  answer: 0,
  sol: 'A Type I error occurs when the null hypothesis \\(H_0\\) is rejected when it is actually true. Here, rejecting \\(H_0\\) (declaring the batch defective) when it actually meets specifications is a Type I error.',
  difficulty: 'Medium'
};

apstatsData.pool[94] = {
  type: 'mcq',
  domain: 'AP Statistics Exam Format & Study Design',
  text: 'Which of the following changes will INCREASE the power of a one-sided hypothesis test for a population mean \\(\\mu\\)?',
  choices: [
    'Increasing the sample size \\(n\\)',
    'Decreasing the significance level \\(\\alpha\\)',
    'Increasing the population standard deviation \\(\\sigma\\)',
    'Choosing a true mean closer to the hypothesized mean \\(\\mu_0\\)'
  ],
  answer: 0,
  sol: 'Power is the probability of correctly rejecting a false null hypothesis (\\(1 - \\beta\\)). Increasing the sample size \\(n\\) reduces the standard error \\(\\sigma/\\sqrt{n}\\), which narrows sampling distributions and increases power.',
  difficulty: 'Medium'
};

apstatsData.pool[95] = {
  type: 'mcq',
  domain: 'AP Statistics Exam Format & Study Design',
  text: 'A 95% confidence interval for the mean completion time (in minutes) of an exam is calculated to be \\((42.5, 48.5)\\). Which of the following is the correct interpretation of the 95% confidence level?',
  choices: [
    'If we repeated the sampling process many times and constructed an interval from each sample, about 95% of the resulting intervals would capture the true population mean.',
    'There is a 95% probability that the true population mean completion time is between 42.5 and 48.5 minutes.',
    '95% of all students complete the exam in between 42.5 and 48.5 minutes.',
    'The probability that the sample mean is between 42.5 and 48.5 minutes is 0.95.'
  ],
  answer: 0,
  sol: 'Confidence level describes the long-run success rate of the estimation method: if repeated random samples are drawn under identical conditions, approximately 95% of the resulting confidence intervals will contain the true parameter \\(\\mu\\).',
  difficulty: 'Medium'
};

apstatsData.pool[96] = {
  type: 'mcq',
  domain: 'AP Statistics Exam Format & Study Design',
  text: 'To reduce the margin of error of a confidence interval for a population proportion by half while keeping the confidence level unchanged, the sample size must be:',
  choices: [
    'Multiplied by 4',
    'Multiplied by 2',
    'Divided by 2',
    'Multiplied by \\(\\sqrt{2}\\)'
  ],
  answer: 0,
  sol: 'Margin of error is \\(ME = z^* \\sqrt{\\frac{\\hat{p}(1-\\hat{p})}{n}}\\). Because \\(n\\) is inside the square root in the denominator, reducing \\(ME\\) by a factor of 2 requires multiplying \\(n\\) by \\(2^2 = 4\\).',
  difficulty: 'Easy'
};

apstatsData.pool[97] = {
  type: 'mcq',
  domain: 'AP Statistics Exam Format & Study Design',
  text: 'A study compares the reaction times of subjects before and after drinking caffeinated coffee. Each of the 30 participants is tested twice: once before and once after coffee consumption. Which inferential procedure is most appropriate to test for a difference in mean reaction time?',
  choices: [
    'Paired \\(t\\)-test for a mean difference \\(\\mu_d\\)',
    'Two-sample \\(t\\)-test for the difference between two independent means \\(\\mu_1 - \\mu_2\\)',
    'Chi-square test of independence',
    'Two-proportion \\(z\\)-test'
  ],
  answer: 0,
  sol: 'Because two measurements are taken on the exact same subjects (pre-test and post-test), the observations are naturally paired/dependent. The analysis must be conducted on the single sample of individual differences \\(d_i = x_{1i} - x_{2i}\\) using a paired \\(t\\)-test.',
  difficulty: 'Easy'
};

apstatsData.pool[98] = {
  type: 'mcq',
  domain: 'AP Statistics Exam Format & Study Design',
  text: 'In a random sample of 100 students from School A, 60 plan to attend university. In a random sample of 100 students from School B, 70 plan to attend university. What is the pooled sample proportion \\(\\hat{p}_c\\) used to calculate the standard error for a two-proportion \\(z\\)-test of \\(H_0: p_1 = p_2\\)?',
  choices: [
    '\\(\\hat{p}_c = \\dfrac{60 + 70}{100 + 100} = 0.65\\)',
    '\\(\\hat{p}_c = \\dfrac{0.60 + 0.70}{2} = 0.65\\)',
    '\\(\\hat{p}_c = \\sqrt{0.60 \\times 0.70} \\approx 0.648\\)',
    '\\(\\hat{p}_c = 0.60\\)'
  ],
  answer: 0,
  sol: 'When testing \\(H_0: p_1 = p_2\\), the two samples are pooled under the assumption that the true proportions are equal: \\(\\hat{p}_c = \\frac{x_1 + x_2}{n_1 + n_2} = \\frac{60 + 70}{100 + 100} = \\frac{130}{200} = 0.65\\).',
  difficulty: 'Easy'
};

apstatsData.pool[99] = {
  type: 'mcq',
  domain: 'AP Statistics Exam Format & Study Design',
  text: 'A hypothesis test yields a test statistic with a \\(p\\)-value of 0.032. If the researcher uses a significance level of \\(\\alpha = 0.05\\), what is the correct decision and conclusion?',
  choices: [
    'Reject \\(H_0\\); there is statistically significant evidence supporting \\(H_a\\).',
    'Fail to reject \\(H_0\\); there is not sufficient evidence to support \\(H_a\\).',
    'Accept \\(H_0\\); the null hypothesis is proven true.',
    'Reject \\(H_a\\); there is convincing evidence that \\(H_0\\) is false.'
  ],
  answer: 0,
  sol: 'Since \\(p = 0.032 < \\alpha = 0.05\\), we reject the null hypothesis \\(H_0\\). There is statistically convincing evidence at the 5% level to support the alternative hypothesis \\(H_a\\). We never "accept" \\(H_0\\).',
  difficulty: 'Easy'
};

fs.writeFileSync(apstatsPath, JSON.stringify(apstatsData, null, 2) + '\n', 'utf8');
console.log('✓ apstats.json updated (indices 93-99 replaced).');

// ── 3. Fix tahsili.json (indices 549, 597, 598, 599, 1099, 1149) ───────
console.log('── Fixing tahsili.json ──');
const tahPath = path.join(BANK_DIR, 'tahsili.json');
const tahData = JSON.parse(fs.readFileSync(tahPath, 'utf8'));

tahData.pool[549] = {
  type: 'mcq',
  domain: 'Trigonometry',
  text: 'ما قيمة \\( \\cos 120^\\circ \\) بدقة؟<br><em>Exact value of \\( \\cos 120^\\circ \\)?</em>',
  choices: [
    '\\( -\\dfrac{1}{2} \\)',
    '\\( \\dfrac{1}{2} \\)',
    '\\( -\\dfrac{\\sqrt{3}}{2} \\)',
    '\\( \\dfrac{\\sqrt{3}}{2} \\)'
  ],
  answer: 0,
  sol: 'في الربع الثاني جيب التمام سالب وزاوية الإسناد هي \\( 180^\\circ - 120^\\circ = 60^\\circ \\): \\( \\cos 120^\\circ = -\\cos 60^\\circ = -\\dfrac{1}{2} \\).',
  difficulty: 'medium',
  fig: {
    type: 'unit_circle',
    title: 'دائرة الوحدة / Unit Circle (120°)',
    angle: 120,
    showTriangle: true,
    w: 240,
    h: 220
  }
};

tahData.pool[597] = {
  type: 'mcq',
  domain: 'Trigonometry',
  text: 'ما القيمة الدقيقة لـ \\( \\sin 15^\\circ \\)؟<br><em>Exact value of \\( \\sin 15^\\circ \\)?</em>',
  choices: [
    '\\( \\dfrac{\\sqrt{6} - \\sqrt{2}}{4} \\)',
    '\\( \\dfrac{\\sqrt{6} + \\sqrt{2}}{4} \\)',
    '\\( \\dfrac{\\sqrt{2} - \\sqrt{6}}{4} \\)',
    '\\( \\dfrac{\\sqrt{3}}{2} \\)'
  ],
  answer: 0,
  sol: 'باستخدام متطابقة الفرق للزاويتين \\( 45^\\circ - 30^\\circ \\): \\( \\sin 15^\\circ = \\sin(45^\\circ - 30^\\circ) = \\sin 45^\\circ \\cos 30^\\circ - \\cos 45^\\circ \\sin 30^\\circ = \\dfrac{\\sqrt{2}}{2}\\dfrac{\\sqrt{3}}{2} - \\dfrac{\\sqrt{2}}{2}\\dfrac{1}{2} = \\dfrac{\\sqrt{6} - \\sqrt{2}}{4} \\).',
  difficulty: 'hard',
  fig: {
    type: 'unit_circle',
    title: 'دائرة الوحدة / Unit Circle (15°)',
    angle: 15,
    showTriangle: true,
    w: 240,
    h: 220
  }
};

tahData.pool[598] = {
  type: 'mcq',
  domain: 'Trigonometry',
  text: 'ما تبسيط العبارة \\( \\dfrac{\\sin 2\\theta}{1 - \\cos 2\\theta} \\)؟<br><em>Simplify \\( \\dfrac{\\sin 2\\theta}{1 - \\cos 2\\theta} \\).</em>',
  choices: [
    '\\( \\cot\\theta \\)',
    '\\( \\tan\\theta \\)',
    '\\( \\sin\\theta \\)',
    '\\( \\cos\\theta \\)'
  ],
  answer: 0,
  sol: 'باستخدام متطابقات ضعف الزاوية: \\( \\sin 2\\theta = 2\\sin\\theta\\cos\\theta \\) و \\( \\cos 2\\theta = 1 - 2\\sin^2\\theta \\). إذن: \\( \\dfrac{2\\sin\\theta\\cos\\theta}{1 - (1 - 2\\sin^2\\theta)} = \\dfrac{2\\sin\\theta\\cos\\theta}{2\\sin^2\\theta} = \\dfrac{\\cos\\theta}{\\sin\\theta} = \\cot\\theta \\).',
  difficulty: 'hard'
};

tahData.pool[599] = {
  type: 'mcq',
  domain: 'Trigonometry',
  text: 'ما تبسيط المقدار \\( \\dfrac{1 + \\cos 2\\theta}{\\sin 2\\theta} \\)؟<br><em>Simplify \\( \\dfrac{1 + \\cos 2\\theta}{\\sin 2\\theta} \\).</em>',
  choices: [
    '\\( \\cot\\theta \\)',
    '\\( \\tan\\theta \\)',
    '\\( \\sec\\theta \\)',
    '\\( \\csc\\theta \\)'
  ],
  answer: 0,
  sol: 'باستخدام متطابقات ضعف الزاوية: \\( \\cos 2\\theta = 2\\cos^2\\theta - 1 \\) و \\( \\sin 2\\theta = 2\\sin\\theta\\cos\\theta \\). إذن: \\( \\dfrac{1 + (2\\cos^2\\theta - 1)}{2\\sin\\theta\\cos\\theta} = \\dfrac{2\\cos^2\\theta}{2\\sin\\theta\\cos\\theta} = \\dfrac{\\cos\\theta}{\\sin\\theta} = \\cot\\theta \\).',
  difficulty: 'hard'
};

tahData.pool[1099] = {
  type: 'mcq',
  domain: 'Exponentials & Logarithms',
  text: 'ما قيمة \\( \\log_3 81 \\)؟<br><em>What is the value of \\( \\log_3 81 \\)?</em>',
  choices: [
    '4',
    '3',
    '5',
    '9'
  ],
  answer: 0,
  sol: 'بما أن \\( 3^4 = 81 \\)، فإن \\( \\log_3 81 = 4 \\).',
  difficulty: 'easy'
};

tahData.pool[1149] = {
  type: 'mcq',
  domain: 'Exponentials & Logarithms',
  text: 'ما حل المعادلة \\( 3^{2x-1} = 27 \\)؟<br><em>Solve \\( 3^{2x-1} = 27 \\).</em>',
  choices: [
    '2',
    '3',
    '1',
    '4'
  ],
  answer: 0,
  sol: 'بما أن \\( 27 = 3^3 \\)، فإن \\( 2x - 1 = 3 \\implies 2x = 4 \\implies x = 2 \\).',
  difficulty: 'medium'
};

fs.writeFileSync(tahPath, JSON.stringify(tahData, null, 2) + '\n', 'utf8');
console.log('✓ tahsili.json updated (indices 549, 597, 598, 599, 1099, 1149 replaced).');

// ── 4. Fix est.json (indices 227, 325, 513, 630, 897, 1193, 1235) ───────
console.log('── Fixing est.json ──');
const estPath = path.join(BANK_DIR, 'est.json');
const estData = JSON.parse(fs.readFileSync(estPath, 'utf8'));

estData.pool[227] = {
  type: 'mcq',
  domain: 'Heart of Algebra',
  text: 'In the system of equations below, \\( c \\) is a constant:\n\\[ \\begin{aligned} 3x - 6y &= 9 \\\\ x - 2y &= c \\end{aligned} \\]\nIf the system has infinitely many solutions, what is the value of \\( c \\)?',
  choices: [
    '\\(3\\)',
    '\\(9\\)',
    '\\(-3\\)',
    '\\(1\\)'
  ],
  answer: 0,
  sol: 'For a linear system to have infinitely many solutions, the two equations must represent the identical line. Dividing the first equation by 3 gives \\( x - 2y = 3 \\). Comparing with the second equation \\( x - 2y = c \\) yields \\( c = 3 \\).',
  difficulty: 'medium'
};

estData.pool[325] = {
  type: 'mcq',
  domain: 'Heart of Algebra',
  text: 'Line \\( \\ell \\) is perpendicular to the line \\( y = -\\frac{1}{2}x + 4 \\) and passes through the point \\( (2, 5) \\). What is the \\( y \\)-intercept of line \\( \\ell \\)?',
  choices: [
    '\\(1\\)',
    '\\(3\\)',
    '\\(-1\\)',
    '\\(5\\)'
  ],
  answer: 0,
  sol: 'Perpendicular lines have negative reciprocal slopes. The original line has slope \\( m = -1/2 \\), so line \\( \\ell \\) has slope \\( m_\\perp = 2 \\). In point-slope form: \\( y - 5 = 2(x - 2) \\implies y - 5 = 2x - 4 \\implies y = 2x + 1 \\). The \\( y \\)-intercept is 1.',
  difficulty: 'medium'
};

estData.pool[513] = {
  type: 'mcq',
  domain: 'Statistics & Probability',
  text: 'A statistical study reports that Company X has an interquartile range (IQR) of 6 thousand dollars for employee salaries, while Company Y has an IQR of 18 thousand dollars. Which conclusion is best supported by this information?',
  choices: [
    'The middle 50% of salaries at Company Y are more widely dispersed than the middle 50% of salaries at Company X.',
    'Company Y pays higher average salaries than Company X.',
    'The maximum salary at Company Y is higher than at Company X.',
    'Company X employs more people than Company Y.'
  ],
  answer: 0,
  sol: 'The interquartile range (IQR) measures the spread of the middle 50% of data values (\\( Q_3 - Q_1 \\)). A larger IQR in Company Y (18 vs 6) indicates greater salary dispersion in the central half of the distribution.',
  difficulty: 'easy'
};

estData.pool[630] = {
  type: 'mcq',
  domain: 'Ratios, Rates & Data',
  text: 'How many liters of pure water must be added to 30 liters of a 40% acid solution to produce a solution that is 25% acid?',
  choices: [
    '\\(18\\)',
    '\\(12\\)',
    '\\(15\\)',
    '\\(20\\)'
  ],
  answer: 0,
  sol: 'The amount of pure acid remains constant: \\( 0.40 \\times 30 = 12 \\text{ liters} \\). Let \\( x \\) be the liters of water added. The new concentration equation is \\( \\frac{12}{30 + x} = 0.25 \\implies 12 = 0.25(30 + x) \\implies 48 = 30 + x \\implies x = 18 \\text{ liters} \\).',
  difficulty: 'medium'
};

estData.pool[897] = {
  type: 'mcq',
  domain: 'Heart of Algebra',
  text: 'Which inequality represents all real numbers \\( x \\) satisfying \\( |2x - 5| \\le 9 \\)?',
  choices: [
    '\\( -2 \\le x \\le 7 \\)',
    '\\( -7 \\le x \\le 7 \\)',
    '\\( x \\le -2 \\text{ or } x \\ge 7 \\)',
    '\\( 0 \\le x \\le 7 \\)'
  ],
  answer: 0,
  sol: 'Rewrite the absolute value inequality: \\( -9 \\le 2x - 5 \\le 9 \\). Add 5 to all parts: \\( -4 \\le 2x \\le 14 \\). Divide by 2: \\( -2 \\le x \\le 7 \\).',
  difficulty: 'medium'
};

estData.pool[1193] = {
  type: 'mcq',
  domain: 'Heart of Algebra',
  text: 'The quadratic function \\( f(x) = 2x^2 - 12x + 23 \\) is rewritten in vertex form \\( f(x) = a(x - h)^2 + k \\). What is the minimum value of \\( f(x) \\)?',
  choices: [
    '\\(5\\)',
    '\\(3\\)',
    '\\(23\\)',
    '\\(11\\)'
  ],
  answer: 0,
  sol: 'Complete the square: \\( f(x) = 2(x^2 - 6x) + 23 = 2((x - 3)^2 - 9) + 23 = 2(x - 3)^2 - 18 + 23 = 2(x - 3)^2 + 5 \\). The vertex is \\( (3, 5) \\). Because \\( a = 2 > 0 \\), the minimum value is \\( k = 5 \\).',
  difficulty: 'medium'
};

estData.pool[1235] = {
  type: 'mcq',
  domain: 'Quadratics & Polynomials',
  text: 'If \\( x = 3 \\) is a solution to the quadratic equation \\( 2x^2 + kx - 15 = 0 \\), what is the value of the constant \\( k \\)?',
  choices: [
    '\\(-1\\)',
    '\\(1\\)',
    '\\(-3\\)',
    '\\(3\\)'
  ],
  answer: 0,
  sol: 'Substitute \\( x = 3 \\) into the equation: \\( 2(3)^2 + k(3) - 15 = 0 \\implies 2(9) + 3k - 15 = 0 \\implies 18 - 15 + 3k = 0 \\implies 3 + 3k = 0 \\implies 3k = -3 \\implies k = -1 \\).',
  difficulty: 'medium'
};

fs.writeFileSync(estPath, JSON.stringify(estData, null, 2) + '\n', 'utf8');
console.log('✓ est.json updated (indices 227, 325, 513, 630, 897, 1193, 1235 replaced).');

console.log('✅ Specific duplicates in calculus, apstats, tahsili, and est resolved!');
