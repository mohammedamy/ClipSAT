#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');

const BANK_PATH = path.join(__dirname, '../bank-data/mathai.json');

const DOMAINS = [
  'Vectors & Embeddings in AI',
  'Neural Layer Matrices & Activations',
  'Gradient Descent & Optimization',
  "Conditional Probability & Bayes' Rule",
  'Distributions & Maximum Likelihood',
  'Linear Regression & OLS',
  'Logistic Regression & Classification',
  'PCA & Dimensionality Reduction'
];

function shuffleChoices(corr, dists) {
  const all = [corr, ...dists];
  const unique = [];
  const seenNorm = new Set();
  for (const c of all) {
    const k = String(c).replace(/\\[()[\]]/g, '').replace(/\s+/g, ' ').trim();
    if (!seenNorm.has(k)) {
      seenNorm.add(k);
      unique.push(c);
    }
  }
  while (unique.length < 4) {
    unique.push(`\\( ${unique.length + 10} \\)`);
  }
  const choices = unique.slice(0, 4);
  // deterministic answer position based on string length to spread answers
  const targetIdx = (corr.length + choices[1].length) % 4;
  const temp = choices[0];
  choices[0] = choices[targetIdx];
  choices[targetIdx] = temp;
  return { choices, answer: targetIdx };
}

function makeQ(domain, diff, text, corr, dists, sol, figure, seenStems) {
  let cleanedText = text.trim();
  let baseText = cleanedText;
  let counter = 1;
  while (seenStems.has(cleanedText)) {
    cleanedText = `${baseText} (case ${++counter})`;
  }
  seenStems.add(cleanedText);

  const { choices, answer } = shuffleChoices(corr, dists);
  const q = {
    type: 'mcq',
    domain,
    difficulty: diff,
    text: cleanedText,
    choices,
    answer,
    sol
  };
  if (figure) q.figure = figure;
  return q;
}

const pool = [];
const seenStems = new Set();

// ==========================================
// 1. EASY (50 questions)
// ==========================================

// Domain 1: Vectors & Embeddings (6 questions)
for (let k = 1; k <= 6; k++) {
  const x = k + 1, y = k + 2;
  const dot = x * x + y * y;
  const qText = `Compute the dot product of the embedding vector \\( \\mathbf{u} = [${x}, ${y}]^T \\) with itself.`;
  const corr = `\\( ${dot} \\)`;
  const dists = [`\\( ${dot + 2 * k} \\)`, `\\( ${dot - 2} \\)`, `\\( ${(x + y) * 2} \\)`];
  const sol = `The dot product with itself is the squared Euclidean norm: \\( \\mathbf{u} \\cdot \\mathbf{u} = (${x})^2 + (${y})^2 = ${x * x} + ${y * y} = ${dot} \\).`;
  pool.push(makeQ(DOMAINS[0], 'easy', qText, corr, dists, sol, null, seenStems));
}

// Domain 2: Neural Layer Matrices & Activations (6 questions)
for (let k = 1; k <= 6; k++) {
  const inDim = 10 * k, outDim = 5 * k;
  const params = inDim * outDim + outDim;
  const qText = `A fully-connected dense layer maps an input \\( \\mathbf{x} \\in \\mathbb{R}^{${inDim}} \\) to \\( \\mathbf{y} \\in \\mathbb{R}^{${outDim}} \\) using \\( \\mathbf{y} = \\mathbf{W}\\mathbf{x} + \\mathbf{b} \\). How many total learnable parameters are in this layer?`;
  const corr = `\\( ${params} \\)`;
  const dists = [`\\( ${inDim * outDim} \\)`, `\\( ${inDim + outDim} \\)`, `\\( ${params + inDim} \\)`];
  const sol = `The weight matrix \\( \\mathbf{W} \\) has shape \\( ${outDim} \\times ${inDim} \\), giving \\( ${inDim * outDim} \\) weights. The bias vector \\( \\mathbf{b} \\) has \\( ${outDim} \\) parameters. Total = \\( ${inDim * outDim} + ${outDim} = ${params} \\).`;
  pool.push(makeQ(DOMAINS[1], 'easy', qText, corr, dists, sol, null, seenStems));
}

// Domain 3: Gradient Descent & Optimization (6 questions)
for (let k = 1; k <= 6; k++) {
  const eta = (0.1 * k).toFixed(1);
  const grad = 4 * k;
  const step = (parseFloat(eta) * grad).toFixed(2);
  const w0 = 10 * k;
  const w1 = (w0 - parseFloat(step)).toFixed(2);
  const qText = `In gradient descent, a weight currently has value \\( w = ${w0} \\). If the gradient of the loss is \\( \\frac{\\partial L}{\\partial w} = ${grad} \\) and the learning rate is \\( \\eta = ${eta} \\), find the updated weight \\( w' \\).`;
  const corr = `\\( ${w1} \\)`;
  const dists = [`\\( ${(w0 + parseFloat(step)).toFixed(2)} \\)`, `\\( ${(w0 - grad).toFixed(2)} \\)`, `\\( ${(w0 - parseFloat(eta)).toFixed(2)} \\)`];
  const sol = `Using the gradient descent update rule: \\( w' = w - \\eta \\frac{\\partial L}{\\partial w} = ${w0} - (${eta})(${grad}) = ${w0} - ${step} = ${w1} \\).`;
  const fig = {
    type: 'function_graph',
    fns: [`0.5*(x-3)^2 + 1`],
    xmin: 0, xmax: 6, ymin: 0, ymax: 6,
    title: `Loss Curve L(w) around minimum`
  };
  pool.push(makeQ(DOMAINS[2], 'easy', qText, corr, dists, sol, fig, seenStems));
}

// Domain 4: Conditional Probability & Bayes' Rule (6 questions)
for (let k = 1; k <= 6; k++) {
  const pA = 0.1 * k;
  const pNotA = (1 - pA).toFixed(2);
  const qText = `In a dataset, the prior probability of class \\( C_1 \\) is \\( P(C_1) = ${pA.toFixed(2)} \\). What is the probability of the complement class \\( P(\\neg C_1) \\)?`;
  const corr = `\\( ${pNotA} \\)`;
  const dists = [`\\( ${(1 - pA / 2).toFixed(2)} \\)`, `\\( ${(pA / 2).toFixed(2)} \\)`, `\\( ${(1 + pA).toFixed(2)} \\)`];
  const sol = `By the complement rule of probability: \\( P(\\neg C_1) = 1 - P(C_1) = 1 - ${pA.toFixed(2)} = ${pNotA} \\).`;
  pool.push(makeQ(DOMAINS[3], 'easy', qText, corr, dists, sol, null, seenStems));
}

// Domain 5: Distributions & Maximum Likelihood (6 questions)
for (let k = 1; k <= 6; k++) {
  const mean = 5 * k;
  const sd = k + 1;
  const qText = `A feature in an AI vision model follows a normal distribution \\( X \\sim \\mathcal{N}(${mean}, ${sd * sd}) \\). What is the mean \\( \\mu \\) and variance \\( \\sigma^2 \\) of this feature?`;
  const corr = `\\( \\mu = ${mean}, \\; \\sigma^2 = ${sd * sd} \\)`;
  const dists = [
    `\\( \\mu = ${sd * sd}, \\; \\sigma^2 = ${mean} \\)`,
    `\\( \\mu = ${mean}, \\; \\sigma^2 = ${sd} \\)`,
    `\\( \\mu = ${sd}, \\; \\sigma^2 = ${sd * sd} \\)`
  ];
  const sol = `The notation \\( \\mathcal{N}(\\mu, \\sigma^2) \\) directly specifies the mean \\( \\mu = ${mean} \\) and variance \\( \\sigma^2 = ${sd * sd} \\) (with standard deviation \\( \\sigma = ${sd} \\)).`;
  const fig = {
    type: 'normal_curve',
    mean: 0,
    sd: 1,
    title: `Feature Gaussian Distribution`
  };
  pool.push(makeQ(DOMAINS[4], 'easy', qText, corr, dists, sol, fig, seenStems));
}

// Domain 6: Linear Regression & OLS (6 questions)
for (let k = 1; k <= 6; k++) {
  const m = k + 1;
  const b = 3 * k;
  const xVal = 4;
  const yPred = m * xVal + b;
  const qText = `A fitted simple linear regression model is \\( \\hat{y} = ${m}x + ${b} \\). What is the predicted target value \\( \\hat{y} \\) when the input feature is \\( x = ${xVal} \\)?`;
  const corr = `\\( ${yPred} \\)`;
  const dists = [`\\( ${yPred + 3} \\)`, `\\( ${yPred - 4} \\)`, `\\( ${m * xVal} \\)`];
  const sol = `Substitute \\( x = ${xVal} \\) into the regression equation: \\( \\hat{y} = ${m}(${xVal}) + ${b} = ${m * xVal} + ${b} = ${yPred} \\).`;
  const fig = {
    type: 'scatter',
    pts: [[1, m + b], [2, 2 * m + b], [3, 3 * m + b], [5, 5 * m + b]],
    title: `Regression Line and Observations`,
    trendline: true,
    xlabel: 'Feature x',
    ylabel: 'Target y'
  };
  pool.push(makeQ(DOMAINS[5], 'easy', qText, corr, dists, sol, fig, seenStems));
}

// Domain 7: Logistic Regression & Classification (6 questions)
for (let k = 1; k <= 6; k++) {
  const tp = 40 + 5 * k, fn = 10, fp = 10, tn = 40;
  const total = tp + fn + fp + tn;
  const accuracy = (tp + tn) / total;
  const qText = `In evaluating a binary classifier, the confusion matrix shows \\( TP = ${tp} \\), \\( TN = ${tn} \\), \\( FP = ${fp} \\), and \\( FN = ${fn} \\). Compute the overall classification accuracy.`;
  const corr = `\\( ${(accuracy * 100).toFixed(1)}\\% \\)`;
  const dists = [
    `\\( ${((tp / (tp + fp)) * 100).toFixed(1)}\\% \\)`,
    `\\( ${((tp / (tp + fn)) * 100).toFixed(1)}\\% \\)`,
    `\\( ${(((tp + fp) / total) * 100).toFixed(1)}\\% \\)`
  ];
  const sol = `Accuracy is the ratio of correct predictions to total samples: \\( \\text{Accuracy} = \\frac{TP + TN}{TP + TN + FP + FN} = \\frac{${tp} + ${tn}}{${total}} = \\frac{${tp + tn}}{${total}} = ${(accuracy * 100).toFixed(1)}\\% \\).`;
  const fig = {
    type: 'two_way_table',
    title: `Binary Classification Contingency Table`,
    rows: ['Actual Positive', 'Actual Negative'],
    cols: ['Pred Positive', 'Pred Negative'],
    data: [[tp, fn], [fp, tn]]
  };
  pool.push(makeQ(DOMAINS[6], 'easy', qText, corr, dists, sol, fig, seenStems));
}

// Domain 8: PCA & Dimensionality Reduction (8 questions)
for (let k = 1; k <= 8; k++) {
  const origDim = 10 * k + 20;
  const reducedDim = 2 * k;
  const qText = `Principal Component Analysis (PCA) projects a dataset from \\( \\mathbb{R}^{${origDim}} \\) onto its top \\( ${reducedDim} \\) principal components. What is the dimension of each transformed data point?`;
  const corr = `\\( ${reducedDim} \\)`;
  const dists = [`\\( ${origDim} \\)`, `\\( ${origDim - reducedDim} \\)`, `\\( ${Math.round(origDim / 2)} \\)`];
  const sol = `PCA projection onto \\( k \\) eigenvectors transforms each sample vector from \\( \\mathbb{R}^D \\) to \\( \\mathbb{R}^k \\). Here \\( k = ${reducedDim} \\), so the reduced dimension is \\( ${reducedDim} \\).`;
  pool.push(makeQ(DOMAINS[7], 'easy', qText, corr, dists, sol, null, seenStems));
}

// ==========================================
// 2. MEDIUM (50 questions)
// ==========================================

// Domain 1: Vectors & Embeddings (6 questions)
for (let k = 1; k <= 6; k++) {
  const u1 = 2 * k, u2 = 3 * k;
  const normSq = u1 * u1 + u2 * u2;
  const qText = `Compute the Manhattan (\\( L_1 \\)) norm and Euclidean (\\( L_2 \\)) norm of the word vector \\( \\mathbf{w} = [${u1}, -${u2}]^T \\).`;
  const corr = `\\( \\|\\mathbf{w}\\|_1 = ${u1 + u2}, \\; \\|\\mathbf{w}\\|_2 = \\sqrt{${normSq}} \\)`;
  const dists = [
    `\\( \\|\\mathbf{w}\\|_1 = ${u1 - u2}, \\; \\|\\mathbf{w}\\|_2 = ${normSq} \\)`,
    `\\( \\|\\mathbf{w}\\|_1 = ${u1 + u2}, \\; \\|\\mathbf{w}\\|_2 = ${u1 + u2} \\)`,
    `\\( \\|\\mathbf{w}\\|_1 = \\sqrt{${normSq}}, \\; \\|\\mathbf{w}\\|_2 = ${u1 + u2} \\)`
  ];
  const sol = `\\( L_1 \\) norm is the sum of absolute values: \\( |${u1}| + |-${u2}| = ${u1 + u2} \\). \\( L_2 \\) norm is the square root of sum of squares: \\( \\sqrt{(${u1})^2 + (-${u2})^2} = \\sqrt{${u1 * u1} + ${u2 * u2}} = \\sqrt{${normSq}} \\).`;
  pool.push(makeQ(DOMAINS[0], 'medium', qText, corr, dists, sol, null, seenStems));
}

// Domain 2: Neural Layer Matrices & Activations (6 questions)
for (let k = 1; k <= 6; k++) {
  const negVal = -2 * k;
  const posVal = 3 * k;
  const qText = `Evaluate the output of the standard ReLU activation function \\( f(z) = \\max(0, z) \\) for inputs \\( z_1 = ${negVal} \\) and \\( z_2 = ${posVal} \\).`;
  const corr = `\\( f(z_1) = 0, \\; f(z_2) = ${posVal} \\)`;
  const dists = [
    `\\( f(z_1) = ${negVal}, \\; f(z_2) = ${posVal} \\)`,
    `\\( f(z_1) = 0, \\; f(z_2) = 0 \\)`,
    `\\( f(z_1) = ${-negVal}, \\; f(z_2) = ${posVal} \\)`
  ];
  const sol = `By definition of the Rectified Linear Unit: \\( \\text{ReLU}(z) = z \\) if \\( z > 0 \\), and \\( 0 \\) if \\( z \\le 0 \\). Thus \\( f(${negVal}) = 0 \\) and \\( f(${posVal}) = ${posVal} \\).`;
  const fig = {
    type: 'function_graph',
    fns: [`x > 0 ? x : 0`],
    xmin: -5, xmax: 5, ymin: -1, ymax: 5,
    title: `ReLU Activation Profile`
  };
  pool.push(makeQ(DOMAINS[1], 'medium', qText, corr, dists, sol, fig, seenStems));
}

// Domain 3: Gradient Descent & Optimization (6 questions)
for (let k = 1; k <= 6; k++) {
  const a = k + 1;
  const x0 = 2 * k;
  const gradVal = 2 * a * x0;
  const qText = `Consider the scalar loss function \\( L(w) = ${a}w^2 - 8w + 5 \\). Find the analytical gradient \\( \\nabla L(w) \\) evaluated at \\( w = ${x0} \\).`;
  const corr = `\\( \\nabla L(${x0}) = ${gradVal - 8} \\)`;
  const dists = [
    `\\( \\nabla L(${x0}) = ${gradVal} \\)`,
    `\\( \\nabla L(${x0}) = ${2 * a * x0 + 8} \\)`,
    `\\( \\nabla L(${x0}) = ${a * x0 - 8} \\)`
  ];
  const sol = `Differentiate with respect to \\( w \\): \\( \\frac{dL}{dw} = 2(${a})w - 8 = ${2 * a}w - 8 \\). At \\( w = ${x0} \\): \\( \\nabla L = ${2 * a}(${x0}) - 8 = ${gradVal} - 8 = ${gradVal - 8} \\).`;
  pool.push(makeQ(DOMAINS[2], 'medium', qText, corr, dists, sol, null, seenStems));
}

// Domain 4: Conditional Probability & Bayes' Rule (6 questions)
for (let k = 1; k <= 6; k++) {
  const prev = 0.05 * k;
  const sens = 0.90;
  const qText = `A machine learning diagnostic test has sensitivity \\( P(\\text{Positive} | \\text{Defect}) = ${sens.toFixed(2)} \\). If the defect rate in production is \\( P(\\text{Defect}) = ${prev.toFixed(2)} \\), find the joint probability of a defect and a positive test result \\( P(\\text{Defect} \\cap \\text{Positive}) \\).`;
  const joint = (prev * sens).toFixed(4);
  const corr = `\\( ${joint} \\)`;
  const dists = [
    `\\( ${(prev + sens).toFixed(4)} \\)`,
    `\\( ${(sens - prev).toFixed(4)} \\)`,
    `\\( ${(prev * (1 - sens)).toFixed(4)} \\)`
  ];
  const sol = `By the multiplication rule of conditional probability: \\( P(\\text{Defect} \\cap \\text{Positive}) = P(\\text{Defect}) \\times P(\\text{Positive} | \\text{Defect}) = ${prev.toFixed(2)} \\times ${sens.toFixed(2)} = ${joint} \\).`;
  pool.push(makeQ(DOMAINS[3], 'medium', qText, corr, dists, sol, null, seenStems));
}

// Domain 5: Distributions & Maximum Likelihood (6 questions)
for (let k = 1; k <= 6; k++) {
  const n = 4 * k;
  const sumVal = 12 * k;
  const mleMean = sumVal / n;
  const qText = `Given \\( n = ${n} \\) independent observations from a normal distribution with sum \\( \\sum_{i=1}^{${n}} x_i = ${sumVal} \\), what is the Maximum Likelihood Estimate (MLE) \\( \\hat{\\mu}_{\\text{MLE}} \\)?`;
  const corr = `\\( \\hat{\\mu}_{\\text{MLE}} = ${mleMean} \\)`;
  const dists = [
    `\\( \\hat{\\mu}_{\\text{MLE}} = ${mleMean * 2} \\)`,
    `\\( \\hat{\\mu}_{\\text{MLE}} = ${sumVal} \\)`,
    `\\( \\hat{\\mu}_{\\text{MLE}} = ${mleMean / 2} \\)`
  ];
  const sol = `The log-likelihood \\( \\ln L(\\mu) = -\\frac{n}{2}\\ln(2\\pi\\sigma^2) - \\frac{1}{2\\sigma^2}\\sum (x_i - \\mu)^2 \\). Setting \\( \\frac{\\partial \\ln L}{\\partial \\mu} = 0 \\) yields the sample mean \\( \\hat{\\mu} = \\frac{1}{n}\\sum x_i = \\frac{${sumVal}}{${n}} = ${mleMean} \\).`;
  pool.push(makeQ(DOMAINS[4], 'medium', qText, corr, dists, sol, null, seenStems));
}

// Domain 6: Linear Regression & OLS (6 questions)
for (let k = 1; k <= 6; k++) {
  const sse = 20 * k;
  const sst = 100 * k;
  const r2 = (1 - sse / sst).toFixed(2);
  const qText = `In a multiple linear regression model, the Sum of Squared Errors is \\( \\text{SSE} = ${sse} \\) and the Total Sum of Squares is \\( \\text{SST} = ${sst} \\). What is the coefficient of determination \\( R^2 \\)?`;
  const corr = `\\( R^2 = ${r2} \\)`;
  const dists = [
    `\\( R^2 = ${(sse / sst).toFixed(2)} \\)`,
    `\\( R^2 = ${(1 - (sse / sst) / 2).toFixed(2)} \\)`,
    `\\( R^2 = ${(sse / (sst - sse)).toFixed(2)} \\)`
  ];
  const sol = `The coefficient of determination measures the proportion of variance explained: \\( R^2 = 1 - \\frac{\\text{SSE}}{\\text{SST}} = 1 - \\frac{${sse}}{${sst}} = 1 - ${(sse / sst).toFixed(2)} = ${r2} \\).`;
  pool.push(makeQ(DOMAINS[5], 'medium', qText, corr, dists, sol, null, seenStems));
}

// Domain 7: Logistic Regression & Classification (6 questions)
for (let k = 1; k <= 6; k++) {
  const tp = 30 * k, fp = 10 * k;
  const prec = tp / (tp + fp);
  const qText = `A spam classification model identifies \\( TP = ${tp} \\) genuine spam emails and \\( FP = ${fp} \\) legitimate emails falsely flagged as spam. What is the precision of this model?`;
  const corr = `\\( ${(prec * 100).toFixed(1)}\\% \\)`;
  const dists = [
    `\\( ${((tp / (tp + 2 * fp)) * 100).toFixed(1)}\\% \\)`,
    `\\( ${((fp / (tp + fp)) * 100).toFixed(1)}\\% \\)`,
    `\\( ${((tp / (tp + fp / 2)) * 100).toFixed(1)}\\% \\)`
  ];
  const sol = `Precision is the fraction of predicted positive instances that are truly positive: \\( \\text{Precision} = \\frac{TP}{TP + FP} = \\frac{${tp}}{${tp} + ${fp}} = \\frac{${tp}}{${tp + fp}} = ${(prec * 100).toFixed(1)}\\% \\).`;
  pool.push(makeQ(DOMAINS[6], 'medium', qText, corr, dists, sol, null, seenStems));
}

// Domain 8: PCA & Dimensionality Reduction (8 questions)
for (let k = 1; k <= 8; k++) {
  const l1 = 60 + 2 * k;
  const l2 = 25 - k;
  const l3 = 15 - k;
  const totalVar = l1 + l2 + l3;
  const expRatio = ((l1 / totalVar) * 100).toFixed(1);
  const qText = `A 3D dataset has covariance matrix eigenvalues \\( \\lambda_1 = ${l1} \\), \\( \\lambda_2 = ${l2} \\), and \\( \\lambda_3 = ${l3} \\). What percentage of total variance is explained by the first principal component \\( PC_1 \\)?`;
  const corr = `\\( ${expRatio}\\% \\)`;
  const dists = [
    `\\( ${(((l1 + l2) / totalVar) * 100).toFixed(1)}\\% \\)`,
    `\\( ${((l2 / totalVar) * 100).toFixed(1)}\\% \\)`,
    `\\( ${((l1 / (l1 + l2)) * 100).toFixed(1)}\\% \\)`
  ];
  const sol = `Total variance is \\( \\sum \\lambda_i = ${l1} + ${l2} + ${l3} = ${totalVar} \\). The proportion explained by \\( PC_1 \\) is \\( \\frac{\\lambda_1}{\\sum \\lambda_i} = \\frac{${l1}}{${totalVar}} = ${expRatio}\\% \\).`;
  pool.push(makeQ(DOMAINS[7], 'medium', qText, corr, dists, sol, null, seenStems));
}

// ==========================================
// 3. HARD (50 questions)
// ==========================================

// Domain 1: Vectors & Embeddings (6 questions)
for (let k = 1; k <= 6; k++) {
  const u1 = k, u2 = 2 * k;
  const dotProd = 2 * u1 * u2;
  const qText = `Two document embeddings \\( \\mathbf{a} = [${u1}, ${u2}]^T \\) and \\( \\mathbf{b} = [${u2}, ${u1}]^T \\) are compared. If \\( \\|\\mathbf{a}\\| = \\|\\mathbf{b}\\| = \\sqrt{${u1 * u1 + u2 * u2}} \\), calculate their exact cosine similarity.`;
  const cosSim = (dotProd / (u1 * u1 + u2 * u2)).toFixed(3);
  const corr = `\\( ${cosSim} \\)`;
  const dists = [
    `\\( ${(parseFloat(cosSim) * 0.8).toFixed(3)} \\)`,
    `\\( 1.000 \\)`,
    `\\( 0.500 \\)`
  ];
  const sol = `Dot product \\( \\mathbf{a} \\cdot \\mathbf{b} = (${u1})(${u2}) + (${u2})(${u1}) = ${dotProd} \\). Product of norms \\( \\|\\mathbf{a}\\| \\|\\mathbf{b}\\| = ${u1 * u1 + u2 * u2} \\). Cosine similarity = \\( \\frac{${dotProd}}{${u1 * u1 + u2 * u2}} = ${cosSim} \\).`;
  pool.push(makeQ(DOMAINS[0], 'hard', qText, corr, dists, sol, null, seenStems));
}

// Domain 2: Neural Layer Matrices & Activations (6 questions)
for (let k = 1; k <= 6; k++) {
  const sVal = (0.2 * k).toFixed(2);
  const qText = `The sigmoid activation function is \\( \\sigma(z) = \\frac{1}{1 + e^{-z}} \\). If \\( \\sigma(z_0) = ${sVal} \\), what is the value of the derivative \\( \\sigma'(z_0) \\)?`;
  const deriv = (parseFloat(sVal) * (1 - parseFloat(sVal))).toFixed(4);
  const corr = `\\( ${deriv} \\)`;
  const dists = [
    `\\( ${(parseFloat(sVal) * 2).toFixed(4)} \\)`,
    `\\( ${(1 - parseFloat(sVal)).toFixed(4)} \\)`,
    `\\( ${(parseFloat(sVal) * parseFloat(sVal)).toFixed(4)} \\)`
  ];
  const sol = `The derivative of sigmoid satisfies \\( \\sigma'(z) = \\sigma(z)(1 - \\sigma(z)) \\). Substituting \\( \\sigma(z_0) = ${sVal} \\): \\( \\sigma'(z_0) = (${sVal})(1 - ${sVal}) = (${sVal})(${(1 - parseFloat(sVal)).toFixed(2)}) = ${deriv} \\).`;
  const fig = {
    type: 'function_graph',
    fns: [`1 / (1 + exp(-x))`],
    xmin: -6, xmax: 6, ymin: -0.2, ymax: 1.2,
    title: `Sigmoid Curve and Smooth Gradient`
  };
  pool.push(makeQ(DOMAINS[1], 'hard', qText, corr, dists, sol, fig, seenStems));
}

// Domain 3: Gradient Descent & Optimization (6 questions)
for (let k = 1; k <= 6; k++) {
  const a = k + 1, b = 2 * k + 1;
  const x = 2, y = -1;
  const gradX = 2 * a * x;
  const gradY = 2 * b * y;
  const qText = `A 2D loss surface is defined as \\( L(w_1, w_2) = ${a}w_1^2 + ${b}w_2^2 \\). Find the gradient vector \\( \\nabla L \\) at the point \\( (w_1, w_2) = (${x}, ${y}) \\).`;
  const corr = `\\( \\nabla L = [${gradX}, ${gradY}]^T \\)`;
  const dists = [
    `\\( \\nabla L = [${gradX}, ${-gradY}]^T \\)`,
    `\\( \\nabla L = [${a * x}, ${b * y}]^T \\)`,
    `\\( \\nabla L = [${gradX + 2}, ${gradY - 2}]^T \\)`
  ];
  const sol = `Compute partial derivatives: \\( \\frac{\\partial L}{\\partial w_1} = 2(${a})w_1 = ${2 * a}(${x}) = ${gradX} \\); \\( \\frac{\\partial L}{\\partial w_2} = 2(${b})w_2 = ${2 * b}(${y}) = ${gradY} \\). Therefore, \\( \\nabla L = [${gradX}, ${gradY}]^T \\).`;
  pool.push(makeQ(DOMAINS[2], 'hard', qText, corr, dists, sol, null, seenStems));
}

// Domain 4: Conditional Probability & Bayes' Rule (6 questions)
for (let k = 1; k <= 6; k++) {
  const pA = 0.02 * k; // disease prevalence
  const pPosGivenA = 0.95; // sensitivity
  const pPosGivenNotA = 0.05; // false positive rate
  const pNotA = 1 - pA;
  const pPos = pA * pPosGivenA + pNotA * pPosGivenNotA;
  const pAGivenPos = ((pA * pPosGivenA) / pPos).toFixed(3);
  const qText = `In anomaly detection, anomaly prior \\( P(A) = ${pA.toFixed(2)} \\), detection sensitivity \\( P(+|A) = 0.95 \\), and false alarm rate \\( P(+|\\neg A) = 0.05 \\). By Bayes' theorem, what is the posterior probability \\( P(A|+) \\) that an alarm is a true anomaly?`;
  const corr = `\\( ${pAGivenPos} \\)`;
  const dists = [
    `\\( 0.950 \\)`,
    `\\( ${(parseFloat(pAGivenPos) * 0.5).toFixed(3)} \\)`,
    `\\( ${(parseFloat(pAGivenPos) * 1.4).toFixed(3)} \\)`
  ];
  const sol = `By Bayes' Rule: \\( P(A|+) = \\frac{P(+|A)P(A)}{P(+|A)P(A) + P(+|\\neg A)P(\\neg A)} = \\frac{0.95 \\times ${pA.toFixed(2)}}{0.95(${pA.toFixed(2)}) + 0.05(${(pNotA).toFixed(2)})} = \\frac{${(pA * pPosGivenA).toFixed(4)}}{${pPos.toFixed(4)}} = ${pAGivenPos} \\).`;
  pool.push(makeQ(DOMAINS[3], 'hard', qText, corr, dists, sol, null, seenStems));
}

// Domain 5: Distributions & Maximum Likelihood (6 questions)
for (let k = 1; k <= 6; k++) {
  const n = 10 * k;
  const kSuccess = 3 * k;
  const pHat = (kSuccess / n).toFixed(3);
  const qText = `In training a language model token predictor, a binary token occurs \\( k = ${kSuccess} \\) times across \\( n = ${n} \\) independent trials. What is the Maximum Likelihood Estimate \\( \\hat{p}_{\\text{MLE}} \\) of the token probability?`;
  const corr = `\\( \\hat{p}_{\\text{MLE}} = ${pHat} \\)`;
  const dists = [
    `\\( \\hat{p}_{\\text{MLE}} = ${(parseFloat(pHat) * 1.5).toFixed(3)} \\)`,
    `\\( \\hat{p}_{\\text{MLE}} = ${(parseFloat(pHat) * 0.5).toFixed(3)} \\)`,
    `\\( \\hat{p}_{\\text{MLE}} = ${(1 - parseFloat(pHat)).toFixed(3)} \\)`
  ];
  const sol = `For a Bernoulli likelihood \\( L(p) = p^k (1-p)^{n-k} \\), the log-likelihood is \\( \\ln L = k\\ln p + (n-k)\\ln(1-p) \\). Setting derivative to zero: \\( \\frac{k}{p} - \\frac{n-k}{1-p} = 0 \\implies \\hat{p} = \\frac{k}{n} = \\frac{${kSuccess}}{${n}} = ${pHat} \\).`;
  pool.push(makeQ(DOMAINS[4], 'hard', qText, corr, dists, sol, null, seenStems));
}

// Domain 6: Linear Regression & OLS (6 questions)
for (let k = 1; k <= 6; k++) {
  const covXY = 12 * k;
  const varX = 4 * k;
  const slope = covXY / varX;
  const meanX = 5, meanY = 20 + 5 * k;
  const intercept = meanY - slope * meanX;
  const qText = `For a bivariate feature dataset, \\( \\text{Cov}(x, y) = ${covXY} \\), \\( \\text{Var}(x) = ${varX} \\), \\( \\bar{x} = ${meanX} \\), and \\( \\bar{y} = ${meanY} \\). Compute the OLS regression slope \\( \\hat{\\beta}_1 \\) and intercept \\( \\hat{\\beta}_0 \\).`;
  const corr = `\\( \\hat{\\beta}_1 = ${slope}, \\; \\hat{\\beta}_0 = ${intercept} \\)`;
  const dists = [
    `\\( \\hat{\\beta}_1 = ${varX / covXY}, \\; \\hat{\\beta}_0 = ${intercept} \\)`,
    `\\( \\hat{\\beta}_1 = ${slope}, \\; \\hat{\\beta}_0 = ${meanY} \\)`,
    `\\( \\hat{\\beta}_1 = ${slope + 1}, \\; \\hat{\\beta}_0 = ${intercept - 5} \\)`
  ];
  const sol = `The OLS slope is \\( \\hat{\\beta}_1 = \\frac{\\text{Cov}(x, y)}{\\text{Var}(x)} = \\frac{${covXY}}{${varX}} = ${slope} \\). The intercept is \\( \\hat{\\beta}_0 = \\bar{y} - \\hat{\\beta}_1\\bar{x} = ${meanY} - (${slope})(${meanX}) = ${meanY} - ${slope * meanX} = ${intercept} \\).`;
  pool.push(makeQ(DOMAINS[5], 'hard', qText, corr, dists, sol, null, seenStems));
}

// Domain 7: Logistic Regression & Classification (6 questions)
for (let k = 1; k <= 6; k++) {
  const p = (0.2 + 0.1 * k).toFixed(2);
  const logit = Math.log(parseFloat(p) / (1 - parseFloat(p))).toFixed(3);
  const qText = `A logistic regression model produces a class probability \\( p = P(y=1|\\mathbf{x}) = ${p} \\). Compute the corresponding log-odds (logit) \\( \\ln\\left(\\frac{p}{1-p}\\right) \\).`;
  const corr = `\\( ${logit} \\)`;
  const dists = [
    `\\( ${(parseFloat(logit) + 1.2).toFixed(3)} \\)`,
    `\\( ${(parseFloat(logit) - 1.5).toFixed(3)} \\)`,
    `\\( ${(parseFloat(p) / (1 - parseFloat(p))).toFixed(3)} \\)`
  ];
  const sol = `Odds are \\( \\frac{p}{1-p} = \\frac{${p}}{${(1 - parseFloat(p)).toFixed(2)}} = ${(parseFloat(p) / (1 - parseFloat(p))).toFixed(4)} \\). Taking natural logarithm: \\( \\ln(${(parseFloat(p) / (1 - parseFloat(p))).toFixed(4)}) = ${logit} \\).`;
  pool.push(makeQ(DOMAINS[6], 'hard', qText, corr, dists, sol, null, seenStems));
}

// Domain 8: PCA & Dimensionality Reduction (8 questions)
for (let k = 1; k <= 8; k++) {
  const nFeat = 4 * k + 10;
  const qText = `A centered feature matrix \\( \\mathbf{X} \\) has shape \\( N \\times ${nFeat} \\). What is the size and symmetry property of the sample covariance matrix \\( \\mathbf{\\Sigma} = \\frac{1}{N-1}\\mathbf{X}^T\\mathbf{X} \\)?`;
  const corr = `\\( ${nFeat} \\times ${nFeat} \\) symmetric matrix`;
  const dists = [
    `\\( N \\times N \\) symmetric matrix`,
    `\\( ${nFeat} \\times ${nFeat} \\) skew-symmetric matrix`,
    `\\( N \\times ${nFeat} \\) rectangular matrix`
  ];
  const sol = `Since \\( \\mathbf{X} \\) has \\( ${nFeat} \\) columns, \\( \\mathbf{X}^T \\) is \\( ${nFeat} \\times N \\) and \\( \\mathbf{X}^T\\mathbf{X} \\) is \\( ${nFeat} \\times ${nFeat} \\). Furthermore, \\( (\\mathbf{X}^T\\mathbf{X})^T = \\mathbf{X}^T(\\mathbf{X}^T)^T = \\mathbf{X}^T\\mathbf{X} \\), proving it is always symmetric.`;
  pool.push(makeQ(DOMAINS[7], 'hard', qText, corr, dists, sol, null, seenStems));
}

console.log(`Generated pool size: ${pool.length}`);
const diffCounts = {};
pool.forEach(q => diffCounts[q.difficulty] = (diffCounts[q.difficulty] || 0) + 1);
console.log('Difficulties:', diffCounts);

const output = { pool };
fs.writeFileSync(BANK_PATH, JSON.stringify(output, null, 2), 'utf8');
console.log(`Successfully written 150 authentic AI Math items to ${BANK_PATH}!`);
