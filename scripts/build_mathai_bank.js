#!/usr/bin/env node
/**
 * scripts/build_mathai_bank.js
 * Generates bank-data/mathai.json with authentic, rigorous, applied AI math questions.
 */
'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const OUT_FILE = path.join(ROOT, 'bank-data', 'mathai.json');

const pool = [];

function addQ(domain, difficulty, text, choices, answer, sol, fig) {
  const item = {
    type: "mcq",
    domain,
    difficulty,
    text,
    choices,
    answer,
    sol
  };
  if (fig) item.fig = fig;
  pool.push(item);
}

// 1. Vectors & Embeddings in AI
addQ(
  "Vectors & Embeddings in AI",
  "easy",
  "Calculate the Euclidean (\\( L_2 \\)) norm of the vector embedding \\( \\mathbf{x} = [3, -4, 0, 12]^T \\).",
  ["\\( 13 \\)", "\\( 19 \\)", "\\( 169 \\)", "\\( 11 \\)"],
  0,
  "\\( \\|\\mathbf{x}\\|_2 = \\sqrt{3^2 + (-4)^2 + 0^2 + 12^2} = \\sqrt{9 + 16 + 0 + 144} = \\sqrt{169} = 13 \\)."
);

addQ(
  "Vectors & Embeddings in AI",
  "medium",
  "Two feature vectors are \\( \\mathbf{u} = [1, 1, 0]^T \\) and \\( \\mathbf{v} = [0, 2, 2]^T \\). What is the cosine similarity between them?",
  ["\\( 0.5 \\)", "\\( 0.707 \\)", "\\( 0.25 \\)", "\\( 1.0 \\)"],
  0,
  "Dot product \\( \\mathbf{u} \\cdot \\mathbf{v} = (1)(0) + (1)(2) + (0)(2) = 2 \\). Norm \\( \\|\\mathbf{u}\\| = \\sqrt{1^2 + 1^2} = \\sqrt{2} \\). Norm \\( \\|\\mathbf{v}\\| = \\sqrt{2^2 + 2^2} = \\sqrt{8} = 2\\sqrt{2} \\). Cosine similarity = \\( \\frac{2}{\\sqrt{2} \\times 2\\sqrt{2}} = \\frac{2}{4} = 0.5 \\)."
);

addQ(
  "Vectors & Embeddings in AI",
  "hard",
  "In vector search, if the cosine distance is defined as \\( D_{\\cos}(\\mathbf{u}, \\mathbf{v}) = 1 - \\cos(\\theta) \\), which condition represents two vectors that are diametrically opposite in meaning?",
  ["\\( D_{\\cos} = 2.0 \\)", "\\( D_{\\cos} = 1.0 \\)", "\\( D_{\\cos} = 0.0 \\)", "\\( D_{\\cos} = -1.0 \\)"],
  0,
  "When vectors point in opposite directions, \\( \\theta = 180^\\circ \\) and \\( \\cos(180^\\circ) = -1.0 \\). Thus, the cosine distance is \\( D_{\\cos} = 1 - (-1.0) = 2.0 \\)."
);

// 2. Neural Layer Matrices & Activations
addQ(
  "Neural Layer Matrices & Activations",
  "easy",
  "A neural network layer has input vector \\( \\mathbf{x} \\in \\mathbb{R}^{10} \\) and output activation \\( \\mathbf{y} \\in \\mathbb{R}^5 \\). How many total parameters (weights + biases) does this dense layer contain?",
  ["\\( 55 \\)", "\\( 50 \\)", "\\( 15 \\)", "\\( 60 \\)"],
  0,
  "The weight matrix \\( \\mathbf{W} \\) has size \\( 5 \\times 10 = 50 \\) weights. The bias vector \\( \\mathbf{b} \\) has size \\( 5 \\) biases. Total learnable parameters = \\( 50 + 5 = 55 \\)."
);

addQ(
  "Neural Layer Matrices & Activations",
  "medium",
  "Evaluate the derivative of the Sigmoid activation function \\( \\sigma(z) = \\frac{1}{1 + e^{-z}} \\) at \\( z = 0 \\).",
  ["\\( 0.25 \\)", "\\( 0.5 \\)", "\\( 1.0 \\)", "\\( 0.0 \\)"],
  0,
  "The derivative of Sigmoid is \\( \\sigma'(z) = \\sigma(z)(1 - \\sigma(z)) \\). At \\( z = 0 \\), \\( \\sigma(0) = 0.5 \\). Therefore, \\( \\sigma'(0) = (0.5)(1 - 0.5) = 0.25 \\)."
);

addQ(
  "Neural Layer Matrices & Activations",
  "hard",
  "For logit vector \\( \\mathbf{z} = [2.0, 1.0, 0.0]^T \\), calculate the Softmax output probability for the first class \\( p_1 = \\text{Softmax}(z_1) \\) to 3 decimal places.",
  ["\\( 0.659 \\)", "\\( 0.500 \\)", "\\( 0.731 \\)", "\\( 0.333 \\)"],
  0,
  "\\( e^{2.0} \\approx 7.389 \\), \\( e^{1.0} \\approx 2.718 \\), \\( e^{0.0} = 1.000 \\). Sum = \\( 7.389 + 2.718 + 1.000 = 11.107 \\). Then \\( p_1 = \\frac{7.389}{11.107} \\approx 0.6593 \\approx 0.659 \\)."
);

// 3. Gradient Descent & Optimization
addQ(
  "Gradient Descent & Optimization",
  "easy",
  "For the loss function \\( L(w) = 3w^2 - 12w + 15 \\), what is the optimal parameter \\( w^* \\) that minimizes the loss?",
  ["\\( w^* = 2 \\)", "\\( w^* = 4 \\)", "\\( w^* = 0 \\)", "\\( w^* = 3 \\)"],
  0,
  "Differentiating with respect to \\( w \\): \\( \\frac{dL}{dw} = 6w - 12 \\). Setting to 0: \\( 6w - 12 = 0 \\implies w = 2 \\). Since \\( \\frac{d^2L}{dw^2} = 6 > 0 \\), this is a global minimum."
);

addQ(
  "Gradient Descent & Optimization",
  "medium",
  "In gradient descent with learning rate \\( \\eta = 0.1 \\), current parameter \\( w_t = 5.0 \\), and gradient \\( \\nabla L(w_t) = 8.0 \\), what is the updated parameter \\( w_{t+1} \\)?",
  ["\\( 4.2 \\)", "\\( 5.8 \\)", "\\( 0.8 \\)", "\\( 4.9 \\)"],
  0,
  "Update rule: \\( w_{t+1} = w_t - \\eta \\nabla L(w_t) = 5.0 - (0.1)(8.0) = 5.0 - 0.8 = 4.2 \\)."
);

addQ(
  "Gradient Descent & Optimization",
  "hard",
  "Why is the learning rate \\( \\eta \\) scaled inversely proportional to the gradient in adaptive optimization algorithms like Adam and RMSprop?",
  ["To accelerate progress along flat plateau dimensions while preventing oscillations across steep ravine dimensions", "To ensure the loss function becomes strictly convex at every step", "To force all matrix weights to be strictly positive numbers", "To eliminate the need for computing partial derivatives in backpropagation"],
  0,
  "In loss landscapes with varying curvature, gradients in steep dimensions are large (causing oscillations) while gradients in flat directions are small (slow learning). Adaptive methods divide by root-mean-square gradient to normalize step sizes."
);

// 4. Conditional Probability & Bayes' Rule
addQ(
  "Conditional Probability & Bayes' Rule",
  "easy",
  "Events A and B are independent with \\( P(A) = 0.4 \\) and \\( P(B) = 0.5 \\). What is \\( P(A \\cap B) \\)?",
  ["\\( 0.2 \\)", "\\( 0.9 \\)", "\\( 0.1 \\)", "\\( 0.8 \\)"],
  0,
  "For independent events, \\( P(A \\cap B) = P(A) \\times P(B) = (0.4)(0.5) = 0.20 \\)."
);

addQ(
  "Conditional Probability & Bayes' Rule",
  "medium",
  "A diagnostic AI test has a 95% sensitivity (\\( P(+\\mid D) = 0.95 \\)) and a 90% specificity (\\( P(-\\mid \\text{healthy}) = 0.90 \\)). The disease prevalence is 1% (\\( P(D) = 0.01 \\)). What is the probability that a patient testing positive actually has the disease?",
  ["\\( \\approx 8.7\\% \\)", "\\( \\approx 95.0\\% \\)", "\\( \\approx 50.0\\% \\)", "\\( \\approx 1.0\\% \\)"],
  0,
  "By Bayes' Theorem: \\( P(D \\mid +) = \\frac{P(+\\mid D)P(D)}{P(+)} \\). \\( P(+) = P(+\\mid D)P(D) + P(+\\mid H)P(H) = (0.95)(0.01) + (0.10)(0.99) = 0.0095 + 0.099 = 0.1085 \\). \\( P(D \\mid +) = \\frac{0.0095}{0.1085} \\approx 0.08755 = 8.75\\% \\)."
);

addQ(
  "Conditional Probability & Bayes' Rule",
  "hard",
  "What is the foundational 'naive' assumption made by the Naive Bayes classification algorithm?",
  ["All feature variables are conditionally independent of each other given the class label", "All features follow a standard normal distribution with mean 0 and variance 1", "The class prior probabilities are always assumed to be equal to 0.5", "The covariance matrix between features is singular with zero determinant"],
  0,
  "Naive Bayes assumes that every feature is conditionally independent of all other features given the class: \\( P(x_1, x_2, \\dots, x_d \\mid C) = \\prod_{i=1}^d P(x_i \\mid C) \\)."
);

// 5. Distributions & Maximum Likelihood
addQ(
  "Distributions & Maximum Likelihood",
  "easy",
  "In a standard normal distribution \\( Z \\sim \\mathcal{N}(0, 1) \\), what percentage of data falls within \\( \\pm 1 \\) standard deviation of the mean?",
  ["\\( \\approx 68.3\\% \\)", "\\( \\approx 95.4\\% \\)", "\\( \\approx 99.7\\% \\)", "\\( \\approx 50.0\\% \\)"],
  0,
  "According to the 68-95-99.7 empirical rule, approximately 68.3% of probability mass lies within 1 standard deviation of the mean."
);

addQ(
  "Distributions & Maximum Likelihood",
  "medium",
  "Given 5 independent coin toss outcomes \\( \\{1, 1, 0, 1, 0\\} \\), what is the Maximum Likelihood Estimate (MLE) for the probability of landing heads \\( p \\)?",
  ["\\( 0.6 \\)", "\\( 0.5 \\)", "\\( 0.4 \\)", "\\( 0.75 \\)"],
  0,
  "For a Bernoulli model, \\( \\hat{p}_{\\text{MLE}} = \\frac{k}{N} \\). Here \\( k = 1 + 1 + 0 + 1 + 0 = 3 \\) successes out of \\( N = 5 \\) trials. \\( \\hat{p} = \\frac{3}{5} = 0.6 \\)."
);

addQ(
  "Distributions & Maximum Likelihood",
  "hard",
  "Why is Maximum Likelihood Estimation (MLE) for a Gaussian distribution's variance \\( \\hat{\\sigma}^2 = \\frac{1}{N}\\sum (x_i - \\bar{x})^2 \\) considered 'biased' for finite samples?",
  ["Because dividing by N instead of (N - 1) systematically underestimates true population variance", "Because the sample mean is not the true parameter", "Because logarithms cannot be applied to squared differences", "Because variance cannot be estimated without prior distributions"],
  0,
  "The sample mean \\( \\bar{x} \\) minimizes the sum of squared differences, so deviations from \\( \\bar{x} \\) are slightly smaller than from the true \\( \\mu \\). The expected value is \\( \\mathbb{E}[\\hat{\\sigma}^2] = \\frac{N-1}{N}\\sigma^2 \\). Bessel's correction uses \\( N - 1 \\) to make it unbiased."
);

// 6. Linear Regression & OLS
addQ(
  "Linear Regression & OLS",
  "easy",
  "In a simple linear regression model \\( \\hat{y} = mx + b \\), if the slope is \\( m = 2.5 \\) and the centroid of the data is \\( (\\bar{x}, \\bar{y}) = (4, 15) \\), what is the y-intercept \\( b \\)?",
  ["\\( 5.0 \\)", "\\( 10.0 \\)", "\\( 2.5 \\)", "\\( 7.5 \\)"],
  0,
  "The regression line always passes through the point of means \\( (\\bar{x}, \\bar{y}) \\): \\( \\bar{y} = m\\bar{x} + b \\implies 15 = (2.5)(4) + b \\implies 15 = 10 + b \\implies b = 5.0 \\)."
);

addQ(
  "Linear Regression & OLS",
  "medium",
  "If the coefficient of determination for a linear regression model is \\( R^2 = 0.81 \\), what is the Pearson correlation coefficient \\( r \\) between \\( x \\) and \\( y \\) if the relationship is positive?",
  ["\\( 0.90 \\)", "\\( 0.81 \\)", "\\( 0.656 \\)", "\\( 0.405 \\)"],
  0,
  "In simple univariate linear regression, \\( R^2 = r^2 \\). For a positive slope, \\( r = \\sqrt{R^2} = \\sqrt{0.81} = 0.90 \\)."
);

addQ(
  "Linear Regression & OLS",
  "hard",
  "In the matrix Normal Equation \\( \\mathbf{w} = (\\mathbf{X}^T\\mathbf{X})^{-1}\\mathbf{X}^T\\mathbf{y} \\), what condition guarantees that \\( \\mathbf{X}^T\\mathbf{X} \\) is invertible?",
  ["The design matrix X has full column rank (no two feature columns are linearly dependent)", "The number of observations N is strictly less than the number of features d", "The target vector y has zero mean and unit variance", "All elements of X are strictly positive"],
  0,
  "\\( \\mathbf{X}^T\\mathbf{X} \\in \\mathbb{R}^{d \\times d} \\) is invertible if and only if \\( \\text{rank}(\\mathbf{X}) = d \\) (columns of \\( \\mathbf{X} \\) are linearly independent, meaning no perfect multicollinearity and \\( N \\ge d \\))."
);

// 7. Logistic Regression & Classification
addQ(
  "Logistic Regression & Classification",
  "easy",
  "If the log-odds (logit) \\( z = \\ln\\left(\\frac{p}{1-p}\\right) \\) is equal to \\( 2.0 \\), what are the odds of the positive event?",
  ["\\( e^2 \\approx 7.39 \\)", "\\( 2.0 \\)", "\\( e^{-2} \\approx 0.135 \\)", "\\( 0.88 \\)"],
  0,
  "By definition, \\( \\text{Odds} = \\frac{p}{1-p} = e^z = e^{2.0} \\approx 7.389 \\)."
);

addQ(
  "Logistic Regression & Classification",
  "medium",
  "For a binary classifier predicting a sample with true label \\( y = 1 \\), the model outputs probability \\( \\hat{y} = 0.5 \\). What is the binary cross-entropy loss?",
  ["\\( \\ln(2) \\approx 0.693 \\)", "\\( 0.0 \\)", "\\( 1.0 \\)", "\\( 0.5 \\)"],
  0,
  "Loss \\( L = -[y\\ln\\hat{y} + (1-y)\\ln(1-\\hat{y})] \\). For \\( y = 1 \\), \\( L = -\\ln(0.5) = -\\ln(1/2) = \\ln(2) \\approx 0.6931 \\)."
);

addQ(
  "Logistic Regression & Classification",
  "hard",
  "In logistic regression, the decision boundary between two classes is given by \\( \\mathbf{w}^T\\mathbf{x} + b = 0 \\). Geometrically, what is the vector \\( \\mathbf{w} \\)?",
  ["The normal vector perpendicular to the separating hyperplane", "A vector parallel to the decision boundary", "The centroid vector connecting both class clusters", "The eigenvector with the smallest eigenvalue"],
  0,
  "For any hyperplane \\( \\mathbf{w}^T\\mathbf{x} + b = 0 \\), the weight vector \\( \\mathbf{w} \\) is the normal vector perpendicular to the hyperplane, pointing toward the positive class region."
);

// 8. PCA & Dimensionality Reduction
addQ(
  "PCA & Dimensionality Reduction",
  "easy",
  "Why must data be mean-centered (subtracting the average feature values) before performing Principal Component Analysis (PCA)?",
  ["To ensure the first principal component captures the direction of maximum variance rather than the mean offset from the origin", "To ensure all feature values become positive", "To make the covariance matrix asymmetric", "To reduce the number of observations in the dataset"],
  0,
  "If data is not centered, the first principal component would point from the origin toward the center of mass of the data, rather than along the axis of maximal internal spread."
);

addQ(
  "PCA & Dimensionality Reduction",
  "medium",
  "A 3D dataset has covariance matrix eigenvalues \\( \\lambda_1 = 12 \\), \\( \\lambda_2 = 6 \\), and \\( \\lambda_3 = 2 \\). What proportion of total variance is retained if the data is projected onto the first two principal components?",
  ["\\( 90\\% \\)", "\\( 60\\% \\)", "\\( 75\\% \\)", "\\( 85\\% \\)"],
  0,
  "Total variance = \\( \\lambda_1 + \\lambda_2 + \\lambda_3 = 12 + 6 + 2 = 20 \\). Variance retained by first two components = \\( \\lambda_1 + \\lambda_2 = 12 + 6 = 18 \\). Proportion = \\( \\frac{18}{20} = 0.90 = 90\\% \\)."
);

addQ(
  "PCA & Dimensionality Reduction",
  "hard",
  "If \\( \\mathbf{v} \\) is an eigenvector of covariance matrix \\( \\mathbf{\\Sigma} \\) with eigenvalue \\( \\lambda \\), what is the sample variance of the data projected onto unit vector \\( \\mathbf{v} \\)?",
  ["\\( \\lambda \\)", "\\( \\lambda^2 \\)", "\\( \\sqrt{\\lambda} \\)", "\\( 1 / \\lambda \\)"],
  0,
  "Variance along direction \\( \\mathbf{v} \\) is \\( \\mathbf{v}^T \\mathbf{\\Sigma} \\mathbf{v} \\). Since \\( \\mathbf{\\Sigma}\\mathbf{v} = \\lambda \\mathbf{v} \\), we have \\( \\mathbf{v}^T(\\lambda \\mathbf{v}) = \\lambda (\\mathbf{v}^T\\mathbf{v}) = \\lambda(1) = \\lambda \\). Each eigenvalue directly equals the variance along its principal axis."
);

// Write file
const bankData = { pool };
fs.writeFileSync(OUT_FILE, JSON.stringify(bankData, null, 2), 'utf8');
console.log(`✅ Generated bank-data/mathai.json with ${pool.length} questions across 8 domains.`);
