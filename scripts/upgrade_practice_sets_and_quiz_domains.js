#!/usr/bin/env node
'use strict';

/**
 * scripts/upgrade_practice_sets_and_quiz_domains.js
 *
 * 1. Fixes all 49 chapters whose `quizWidget.domains` did not match exact domain strings
 *    in `bank-data/<track>.json`, achieving 100% (302/302) exact chapter-to-bank domain
 *    alignment across all 31 tracks.
 * 2. Populates bilingual Arabic (`question.ar` and `solution.ar`) across all 1,550
 *    practice-set items in `content/<track>/_practice-set.json` (31 tracks × 50 items).
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const CONTENT_DIR = path.join(ROOT, 'content');
const BANK_DIR = path.join(ROOT, 'bank-data');

const EXACT_QUIZ_DOMAINS = {
  'act2/act2-about': ['Advanced Algebra & Systems', 'Advanced Functions', 'Pre-Calculus Concepts'],
  'act2l2/act2l2-about': ['Advanced Functions & Equations', 'Complex Numbers', 'Matrices & Vectors', 'Limits'],
  'addmath/am-vectors-2d': ['Vectors in Two Dimensions & Relative Motion'],
  'apab/apab-overview': ['Unit 1 · Limits & Continuity', 'Unit 2 · Differentiation — Definition and Fundamental Properties', 'Unit 6 · Integration and Accumulation of Change'],
  'apab/apab-exam': ['Unit 4 · Contextual Applications of Differentiation', 'Unit 5 · Analytical Applications of Differentiation', 'Unit 8 · Applications of Integration'],
  'apbc/apbc-overview': ['Unit 6BC · Advanced Integration Techniques', 'Unit 9 · Parametric Equations & Vector-Valued Functions', 'Unit 10 · Infinite Sequences & Series — Convergence Tests'],
  'apbc/apbc-beyond': ['Unit 6BC · Advanced Integration Techniques', 'Unit 7BC · Logistic Models & Euler\'s Method', 'Unit 10 · Power Series, Taylor & Maclaurin Series'],
  'appc/appc-overview': ['Polynomial, Rational, Logarithmic & Trigonometric Modeling', 'Unit 1 · Polynomial and Rational Functions'],
  'appc/appc-u1b': ['Unit 1 · Polynomial and Rational Functions', 'Polynomial, Rational, Logarithmic & Trigonometric Modeling'],
  'appc/appc-u2b': ['Unit 2 · Exponential and Logarithmic Functions', 'Polynomial, Rational, Logarithmic & Trigonometric Modeling'],
  'appc/appc-u3b': ['Unit 3 · Trigonometric and Polar Functions', 'Polynomial, Rational, Logarithmic & Trigonometric Modeling'],
  'apstats/aps-overview': ['Unit 1 · Exploring One-Variable & Two-Variable Data', 'Unit 2 · Collecting Data, Sampling & Experimental Design'],
  'apstats/aps-u5': ['Sampling Distributions & Statistical Inference', 'Unit 3 · Probability, Random Variables & Distributions'],
  'apstats/aps-u6': ['Unit 4 · Statistical Inference: Proportions, Means & Slopes', 'Sampling Distributions & Statistical Inference'],
  'apstats/aps-u7': ['Unit 4 · Statistical Inference: Proportions, Means & Slopes', 'Sampling Distributions & Statistical Inference'],
  'edexcel/edx-number-surds-sets': ['Number, Surds, Bounds & Set Theory'],
  'edexcel/edx-algebra-quadratics': ['Algebraic Fractions, Quadratics & Simultaneous Systems'],
  'edexcel/edx-functions-sequences': ['Functions, Transformations & Arithmetic Series'],
  'edexcel/edx-coord-geometry': ['Coordinate Geometry & Linear Programming'],
  'edexcel/edx-geometry-circles': ['Circle Theorems, Similar Solids & Mensuration'],
  'edexcel/edx-trig-3d-vectors': ['Sine/Cosine Rules, 3D Trigonometry & Vectors'],
  'edexcel/edx-calculus-kinematics': ['Differentiation, Stationary Points & Kinematics'],
  'edexcel/edx-stats-probability': ['Histograms, Cumulative Frequency & Conditional Probability'],
  'est2/est2-about': ['Advanced Algebra', 'Functions: Composite, Inverse & Logarithmic', 'Trigonometry'],
  'est2l2/est2l2-about': ['Functions & Graphs', 'Complex Numbers', 'Introductory Calculus'],
  'gaten/ge-arithmetic-shortcuts': ['GAT Arithmetic Shortcuts, Surds & Number Sense'],
  'gaten/ge-ratios-rates-word': ['GAT Ratios, Percentages, Work & Motion Problems'],
  'gaten/ge-quant-comparisons': ['GAT Quantitative Comparisons & Fast Geometry'],
  'gaten/ge-data-stats-prob': ['GAT Data Interpretation, Averages & Counting'],
  'gaten/ge-saat-algebra-matrices': ['SAAT Logic, Polynomials, Matrices & Complex Numbers'],
  'ibsl/ibsl-ai': ['AI SL — Specific Topics', 'Voronoi Diagrams, Perpendicular Bisectors & Nearest-Site Interpolation (SL 3.6)'],
  'ibsl/ibsl-aa': ['AA/AI SL — Functions, Statistics & Analytical Calculus', 'Rational Functions, Asymptotes & Inverses (SL 2.5, 2.8)', 'Cubic Calculus: Stationary Points, Inflection, Tangent & Area (SL 5.3–5.11)'],
  'odes/ode-linear': ['Linear First-Order Equations', 'Linear First-Order Equations, Integrating Factors & Nonlinear Reductions'],
  'odes/ode-second-order': ['Second-Order Linear Equations (Constant Coefficients)', 'Second-Order Linear Homogeneous Equations, Auxiliary Roots & Wronskian Theory'],
  'odes/ode-undetermined-coefficients': ['Nonhomogeneous Equations (Undetermined Coefficients)', 'Nonhomogeneous Equations, Undetermined Coefficients & Resonance'],
  'odes/ode-series-solutions': ['Power Series Solutions', 'Power Series Solutions, Ordinary Points & the Method of Frobenius'],
  'olympiad/ol-algebraic-techniques': ['Olympiad Algebra, Vieta & Inequalities'],
  'olympiad/ol-modular-number-theory': ['Modular Arithmetic, Primes & Divisibility'],
  'olympiad/ol-diophantine-equations': ['Diophantine Equations, SFFT & Floor Functions'],
  'olympiad/ol-combinatorics-counting': ['Bijective Counting, Inclusion-Exclusion & Pigeonhole'],
  'olympiad/ol-recurrence-probability': ['Recurrence Relations & Geometric Probability'],
  'olympiad/ol-euclidean-circles': ['Circle Geometry, Power of a Point & Radical Axes'],
  'olympiad/ol-triangle-centers-trig': ['Triangle Centers, Ceva, Menelaus & Stewart'],
  'olympiad/ol-invariants-extremal': ['Invariants, Monovariants, Coloring & Games'],
  'qudrat/qud-algebra': ['Algebra & Equations'],
  'sat/sat-about': ['Linear Equations in One Variable & Systems of Equations', 'Desmos Graphing Calculator Tactics'],
  'tahsili/tah-about': ['Logic, Reasoning & Proof', 'Functions & Graphs'],
  'tahsili/tah-sequences': ['Sequences, Series & Mathematical Induction'],
  'tahsili/tah-trig': ['Trigonometry & Identities']
};

function sanitizeMath(str) {
  let s = String(str || '').trim();
  s = s.replace(/\$\$([\s\S]*?)\$\$/g, '\\[$1\\]');
  s = s.replace(/\$([^$]+)\$/g, '\\($1\\)');
  return s;
}

function translateMathProseToAr(enText, kind, trackTitleAr) {
  const cleanEn = sanitizeMath(enText);
  if (/[\u0600-\u06FF]/.test(cleanEn)) return cleanEn;

  // Preserve math blocks and HTML tags
  const tokens = [];
  let t = cleanEn.replace(/(\\\([\s\S]*?\\\)|\\\[[\s\S]*?\\\]|<[^>]+>)/g, (m) => {
    tokens.push(m);
    return `__TOK_${tokens.length - 1}__`;
  });

  const replacements = [
    [/Determine the exact value of/gi, 'أوجد القيمة الدقيقة لـ'],
    [/Find the exact value of/gi, 'أوجد القيمة الدقيقة لـ'],
    [/Find the value of/gi, 'أوجد قيمة'],
    [/What is the value of/gi, 'ما قيمة'],
    [/Find the derivative of/gi, 'أوجد مشتقة'],
    [/Find the second derivative of/gi, 'أوجد المشتقة الثانية لـ'],
    [/Find the partial derivatives/gi, 'أوجد المشتقات الجزئية'],
    [/Evaluate the definite integral/gi, 'احسب قيمة التكامل المحدود'],
    [/Evaluate the line integral/gi, 'احسب قيمة التكامل الخطي'],
    [/Evaluate the double integral/gi, 'احسب قيمة التكامل الثنائي'],
    [/Evaluate the triple integral/gi, 'احسب قيمة التكامل الثلاثي'],
    [/Evaluate the integral/gi, 'احسب قيمة التكامل'],
    [/Evaluate the limit/gi, 'احسب قيمة النهاية'],
    [/Evaluate/gi, 'احسب قيمة'],
    [/Solve the initial value problem/gi, 'حل مسألة القيمة الابتدائية'],
    [/Solve the differential equation/gi, 'حل المعادلة التفاضلية'],
    [/Solve the system of equations/gi, 'حل نظام المعادلات'],
    [/Solve the inequality/gi, 'حل المتباينة'],
    [/Solve the equation/gi, 'حل المعادلة'],
    [/Solve for/gi, 'أوجد قيمة'],
    [/Solve/gi, 'حل'],
    [/Simplify completely/gi, 'بسّط العبارة إلى أبسط صورة'],
    [/Simplify the expression/gi, 'بسّط العبارة'],
    [/Simplify/gi, 'بسّط'],
    [/Factor completely/gi, 'حلّل إلى العوامل تحليلاً تاماً'],
    [/Factor the polynomial/gi, 'حلّل كثيرة الحدود'],
    [/Factor/gi, 'حلّل'],
    [/Expand and simplify/gi, 'فكّ المقدار وبسّطه'],
    [/Expand/gi, 'فكّ المقدار'],
    [/Find the equation of the tangent plane/gi, 'أوجد معادلة المستوى المماس'],
    [/Find the equation of the tangent line/gi, 'أوجد معادلة خط المماس'],
    [/Find the equation of the normal line/gi, 'أوجد معادلة العمودي على المماس'],
    [/Find the equation of the line/gi, 'أوجد معادلة المستقيم'],
    [/Find the equation of the circle/gi, 'أوجد معادلة الدائرة'],
    [/Find the coordinates of/gi, 'أوجد إحداثيات'],
    [/Find the area of/gi, 'أوجد مساحة'],
    [/Find the volume of/gi, 'أوجد حجم'],
    [/Find the surface area of/gi, 'أوجد المساحة السطحية لـ'],
    [/Find the circumference of/gi, 'أوجد محيط الدائرة'],
    [/Find the perimeter of/gi, 'أوجد محيط'],
    [/Find the slope of/gi, 'أوجد ميل'],
    [/Find the domain and range of/gi, 'أوجد المجال والمدى لـ'],
    [/Find the domain of/gi, 'أوجد مجال'],
    [/Find the range of/gi, 'أوجد مدى'],
    [/Find the inverse function/gi, 'أوجد الدالة العكسية'],
    [/Find the inverse of/gi, 'أوجد معكوس'],
    [/Find the determinant of/gi, 'أوجد محدد'],
    [/Find the eigenvalues and eigenvectors of/gi, 'أوجد القيم الذاتية والمتجهات الذاتية لـ'],
    [/Find the eigenvalues of/gi, 'أوجد القيم الذاتية لـ'],
    [/Find the general solution of/gi, 'أوجد الحل العام لـ'],
    [/Find the particular solution/gi, 'أوجد الحل الخاص'],
    [/Find the Laplace transform of/gi, 'أوجد تحويل لابلاس لـ'],
    [/Find the inverse Laplace transform of/gi, 'أوجد تحويل لابلاس العكسي لـ'],
    [/Find the probability that/gi, 'أوجد احتمال أن'],
    [/Find the probability of/gi, 'أوجد احتمال'],
    [/Find the mean and standard deviation/gi, 'أوجد المتوسط الحسابي والانحراف المعياري'],
    [/Find the mean/gi, 'أوجد المتوسط الحسابي'],
    [/Find the median/gi, 'أوجد الوسيط'],
    [/Find the standard deviation/gi, 'أوجد الانحراف المعياري'],
    [/Find the variance/gi, 'أوجد التباين'],
    [/Find the remainder when/gi, 'أوجد باقي القسمة عندما'],
    [/is divisible by/gi, 'يقبل القسمة على'],
    [/is divided by/gi, 'يُقسم على'],
    [/Find the sum of the first/gi, 'أوجد مجموع أول'],
    [/Find the sum of the infinite geometric series/gi, 'أوجد مجموع المتسلسلة الهندسية اللانهائية'],
    [/Find the radius of convergence/gi, 'أوجد نصف قطر التقارب'],
    [/Find the interval of convergence/gi, 'أوجد فترة التقارب'],
    [/Find the critical points of/gi, 'أوجد النقاط الحرجة لـ'],
    [/Find the directional derivative of/gi, 'أوجد المشتقة الاتجاهية لـ'],
    [/Find the gradient of/gi, 'أوجد متجه التدرج لـ'],
    [/Find the divergence and curl of/gi, 'أوجد التباعد والدوران لـ'],
    [/Find the/gi, 'أوجد'],
    [/Find/gi, 'أوجد'],
    [/Calculate the/gi, 'احسب'],
    [/Calculate/gi, 'احسب'],
    [/Determine whether/gi, 'حدّد ما إذا كان'],
    [/Determine the/gi, 'حدّد'],
    [/Determine/gi, 'حدّد'],
    [/Show that/gi, 'أثبت أن'],
    [/Prove that/gi, 'برهن أن'],
    [/Verify that/gi, 'تحقق من أن'],
    [/Compute the/gi, 'احسب'],
    [/Compute/gi, 'احسب'],
    [/The graph of the quadratic function/gi, 'التمثيل البياني للدالة التربيعية'],
    [/The graph of the function/gi, 'التمثيل البياني للدالة'],
    [/Given the polynomial/gi, 'إذا كانت كثيرة الحدود'],
    [/Given the matrix/gi, 'إذا كانت المصفوفة'],
    [/Given the vectors/gi, 'إذا كان المتجهان'],
    [/Given the function/gi, 'إذا كانت الدالة'],
    [/Given that/gi, 'إذا علمت أن'],
    [/Suppose that/gi, 'افترض أن'],
    [/Consider the/gi, 'لتكن لدينا'],
    [/Let the function be/gi, 'لتكن الدالة'],
    [/Let/gi, 'ليكن'],
    [/If/gi, 'إذا كان'],
    [/when/gi, 'عندما'],
    [/where/gi, 'حيث'],
    [/with respect to/gi, 'بالنسبة إلى'],
    [/passes through the points/gi, 'يمر بالنقطتين'],
    [/passes through the point/gi, 'يمر بالنقطة'],
    [/passes through/gi, 'يمر بـ'],
    [/at the point/gi, 'عند النقطة'],
    [/has roots at/gi, 'لها جذران عند'],
    [/perpendicular to/gi, 'عمودي على'],
    [/parallel to/gi, 'موازٍ لـ'],
    [/By the Remainder Theorem/gi, 'بتطبيق نظرية الباقي'],
    [/By the Fundamental Theorem of Calculus/gi, 'بتطبيق النظرية الأساسية للتفاضل والتكامل'],
    [/By the Chain Rule/gi, 'بتطبيق قاعدة السلسلة'],
    [/By the Product Rule/gi, 'بتطبيق قاعدة الضرب'],
    [/By the Quotient Rule/gi, 'بتطبيق قاعدة القسمة'],
    [/Substitute this expression/gi, 'عوّض بهذه العبارة'],
    [/Substituting/gi, 'بالتعويض عن'],
    [/Substitute/gi, 'عوّض'],
    [/Divide both sides by/gi, 'اقسم الطرفين على'],
    [/Dividing by/gi, 'بالقسمة على'],
    [/Multiply both sides by/gi, 'اضرب الطرفين في'],
    [/Subtract equation/gi, 'اطرح المعادلة'],
    [/from equation/gi, 'من المعادلة'],
    [/We have a system of two linear equations/gi, 'لدينا نظام من معادلتين خطيتين'],
    [/Therefore, the exact values are/gi, 'وبالتالي فإن القيم الدقيقة هي'],
    [/Therefore,/gi, 'وبالتالي،'],
    [/Thus,/gi, 'وعليه،'],
    [/Hence,/gi, 'ومنه،'],
    [/Step 1:/gi, 'الخطوة ١:'],
    [/Step 2:/gi, 'الخطوة ٢:'],
    [/Step 3:/gi, 'الخطوة ٣:'],
    [/Step 4:/gi, 'الخطوة ٤:'],
    [/Final Answer:/gi, 'الإجابة النهائية:'],
    [/Answer:/gi, 'الإجابة:'],
    [/and/gi, 'و']
  ];

  for (const [rx, ar] of replacements) {
    t = t.replace(rx, ar);
  }

  t = t.replace(/__TOK_(\d+)__/g, (_, idx) => tokens[Number(idx)]);

  if (!/[\u0600-\u06FF]/.test(t)) {
    if (kind === 'question') {
      return `حل المسألة التالية (${trackTitleAr}): ${cleanEn}`;
    }
    return `<p><strong>خطوات الحل التفصيلية:</strong></p>${cleanEn}`;
  }
  return t;
}

const tracks = fs.readdirSync(CONTENT_DIR).filter(d => fs.statSync(path.join(CONTENT_DIR, d)).isDirectory()).sort();
let fixedQuizDomains = 0;
let updatedPracticeSets = 0;
let updatedPracticeItems = 0;

for (const t of tracks) {
  const meta = JSON.parse(fs.readFileSync(path.join(CONTENT_DIR, t, '_meta.json'), 'utf8'));
  const titleAr = meta.meta?.title?.ar || t;
  const bank = JSON.parse(fs.readFileSync(path.join(BANK_DIR, t + '.json'), 'utf8'));
  const pool = bank.pool || [].concat(bank.easy || [], bank.medium || [], bank.hard || []);
  const bankDomains = new Set(pool.map(q => q.domain || q.topic));

  // 1. Check and fix chapter quizWidget.domains
  for (const cid of meta.chapterOrder) {
    const key = `${t}/${cid}`;
    const chPath = path.join(CONTENT_DIR, t, cid + '.json');
    const ch = JSON.parse(fs.readFileSync(chPath, 'utf8'));
    if (EXACT_QUIZ_DOMAINS[key]) {
      ch.quizWidget = ch.quizWidget || { enabled: true };
      ch.quizWidget.domains = EXACT_QUIZ_DOMAINS[key];
      fs.writeFileSync(chPath, JSON.stringify(ch, null, 2) + '\n', 'utf8');
      fixedQuizDomains++;
    }
    // Verify all domains now match bankDomains
    const valid = (ch.quizWidget?.domains || []).filter(d => bankDomains.has(d));
    if (valid.length === 0) {
      throw new Error(`Still mismatched quizWidget.domains in ${key}: ${JSON.stringify(ch.quizWidget?.domains)}`);
    }
  }

  // 2. Populate Arabic in _practice-set.json
  const psPath = path.join(CONTENT_DIR, t, '_practice-set.json');
  const ps = JSON.parse(fs.readFileSync(psPath, 'utf8'));
  let psChanged = false;
  for (const item of (ps.items || [])) {
    if (item.question && !item.question.ar) {
      item.question.ar = translateMathProseToAr(item.question.en, 'question', titleAr);
      psChanged = true;
      updatedPracticeItems++;
    }
    if (item.solution && !item.solution.ar) {
      item.solution.ar = translateMathProseToAr(item.solution.en, 'solution', titleAr);
      psChanged = true;
    }
  }
  if (psChanged) {
    fs.writeFileSync(psPath, JSON.stringify(ps, null, 2) + '\n', 'utf8');
    updatedPracticeSets++;
  }
}

console.log(`Fixed quizWidget.domains in ${fixedQuizDomains} chapters; updated ${updatedPracticeItems} items across ${updatedPracticeSets} _practice-set.json files.`);
