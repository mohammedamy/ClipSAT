#!/usr/bin/env node
/**
 * scripts/build_mathai_content.js
 * Generates content/mathai/_meta.json and the 8 core chapters for
 * Math for AI & Data Science (mathai).
 */
'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const TRACK_DIR = path.join(ROOT, 'content', 'mathai');

if (!fs.existsSync(TRACK_DIR)) {
  fs.mkdirSync(TRACK_DIR, { recursive: true });
}

// 1. Course Meta
const courseMeta = {
  id: "mathai",
  chapterOrder: [
    "ai-vectors-embeddings",
    "ai-matrices-linear-layers",
    "ai-gradient-descent",
    "ai-probability-bayes",
    "ai-distributions-mle",
    "ai-linear-regression",
    "ai-logistic-regression",
    "ai-pca-dimensionality"
  ],
  meta: {
    title: {
      en: "Math for AI & Data Science",
      ar: "رياضيات الذكاء الاصطناعي وعلوم البيانات"
    },
    subtitle: {
      en: "Vectors, Neural Layer Matrices, Gradient Descent, Bayes' Theorem, Regression, and PCA for high-school STEM and AI innovators.",
      ar: "المتجهات ومصفوفات الشبكات العصبية والانحدار التدريجي والاحتمالات لطلاب مسارات الذكاء الاصطناعي."
    },
    level: "Advanced",
    color: "var(--teal)",
    icon: "🤖",
    examBoard: "ClipSAT STEM & Applied AI Curriculum",
    tags: [
      "AI Mathematics",
      "Machine Learning",
      "Data Science",
      "Optimization",
      "Bayesian Inference",
      "Linear Algebra",
      "PCA"
    ],
    officialLinks: [
      {
        label: {
          en: "Mathematics for Machine Learning — Reference Library",
          ar: null
        },
        url: "https://mml-book.github.io/",
        note: {
          en: "Academic reference on Linear Algebra, Calculus, and Probability for AI",
          ar: null
        }
      },
      {
        label: {
          en: "DeepLearning.AI Mathematics for Machine Learning",
          ar: null
        },
        url: "https://www.deeplearning.ai/courses/mathematics-for-machine-learning-and-data-science-specialization/",
        note: {
          en: "Applied linear algebra, multivariate calculus, and statistics in Python",
          ar: null
        }
      }
    ],
    downloadsInfo: {
      introText: {
        en: "Study Math for AI & Data Science offline. Download comprehensive cheat sheets on neural layer matrix operations, gradient updates, Bayes rules, and dimensionality reduction.",
        ar: null
      },
      pdfCardTitle: {
        en: "Math for AI & Data Science Handbook",
        ar: null
      },
      pdfCardDescription: {
        en: "Eight foundational chapters covering high-dimensional geometry, gradient descent, loss landscapes, and probabilistic modeling.",
        ar: null
      },
      docxCardDescription: {
        en: "Editable .docx problem sets with complete formulas and step-by-step mathematical proofs.",
        ar: null
      },
      worksheetLibraryText: {
        en: "Curated collection of applied AI math drills, vector similarity exercises, and loss optimization challenges.",
        ar: null
      }
    },
    pageHeader: {
      h1: {
        en: "Math for AI & Data Science",
        ar: "رياضيات الذكاء الاصطناعي وعلوم البيانات"
      },
      stats: [
        {
          label: { en: "Focus", ar: null },
          value: { en: "Linear Algebra, Calculus & Probabilistic ML", ar: null }
        },
        {
          label: { en: "Target Level", ar: null },
          value: { en: "Grades 11–12 / University STEM Bridge", ar: null }
        },
        {
          label: { en: "Core Chapters", ar: null },
          value: { en: "8 Foundational Units", ar: null }
        },
        {
          label: { en: "Interactive Explorers", ar: null },
          value: { en: "4 Visual ML Explorers", ar: null }
        }
      ]
    },
    testGenerator: {
      examTitle: "Math for AI & Data Science Proficiency Assessment",
      sections: [
        "Part A — Linear Algebra & Vector Embeddings (45 min · 40 marks)",
        "Part B — Optimization, Probability & Machine Learning Models (75 min · 60 marks)"
      ],
      introText: {
        en: "Generate an authentic assessment covering vector embeddings, neural feedforward calculations, gradient descent optimization, and classification metrics.",
        ar: null
      },
      examDescription: {
        en: "Comprehensive 100-mark assessment covering the mathematical foundations required for modern Machine Learning, Deep Learning, and Data Science.",
        ar: null
      },
      examButtonLabel: {
        en: "Generate AI Math Proficiency Exam ↻",
        ar: null
      },
      examMinutesArg: 120,
      exams: [
        {
          examTitle: "AI Math Foundations — Part A (Linear Algebra & Geometry)",
          examButtonLabel: {
            en: "Generate Part A Assessment ↻",
            ar: null
          }
        },
        {
          examTitle: "AI Math Foundations — Part B (Calculus, Probability & PCA)",
          examButtonLabel: {
            en: "Generate Part B Assessment ↻",
            ar: null
          }
        }
      ]
    }
  }
};

fs.writeFileSync(path.join(TRACK_DIR, '_meta.json'), JSON.stringify(courseMeta, null, 2), 'utf8');

// 2. Chapters Content
const chapters = [
  {
    id: "ai-vectors-embeddings",
    chapterNumber: "1",
    title: {
      en: "Vectors, Norms & High-Dimensional Embeddings",
      ar: "المتجهات والمسافات المعيارية والتمثيل الشعاعي (Embeddings)"
    },
    chapterTag: {
      variant: "category",
      className: "igcse-tag",
      emoji: "🤖",
      category: "AI Math Unit 1 — Vectors & Geometric Embeddings",
      badges: [{ text: "Applied STEM", className: "tier-e" }],
      topics: [
        "Vector spaces &amp; column vectors",
        "L1 (Manhattan) and L2 (Euclidean) norms",
        "Dot products &amp; vector projections",
        "Cosine similarity in NLP &amp; vector search",
        "Word and token embeddings (Word2Vec / Transformer)"
      ]
    },
    content: {
      blocks: [
        {
          kind: "text",
          body: {
            en: "In Artificial Intelligence and Natural Language Processing, text, images, and audio are mapped to high-dimensional numerical vectors called embeddings. We explore vector geometry, norms, and distance metrics used in modern vector databases.",
            ar: null
          }
        },
        {
          kind: "callout",
          style: "def",
          label: { en: "● Definition 1.1 — Vector Norms & Distances", ar: null },
          body: {
            en: "For a vector \\( \\mathbf{x} = [x_1, x_2, \\dots, x_n]^T \\in \\mathbb{R}^n \\):<br>1. <strong>Euclidean (\\( L_2 \\)) Norm:</strong> \\( \\|\\mathbf{x}\\|_2 = \\sqrt{\\sum_{i=1}^n x_i^2} = \\sqrt{\\mathbf{x}^T\\mathbf{x}} \\). Measures straight-line geometric distance.<br>2. <strong>Manhattan (\\( L_1 \\)) Norm:</strong> \\( \\|\\mathbf{x}\\|_1 = \\sum_{i=1}^n |x_i| \\). Used in Lasso regularization (L1 sparsity).<br>3. <strong>Max (\\( L_\\infty \\)) Norm:</strong> \\( \\|\\mathbf{x}\\|_\\infty = \\max_i |x_i| \\). Used in adversarial robustness attacks (FGSM).",
            ar: null
          }
        },
        {
          kind: "cards",
          items: [
            {
              label: { en: "Dot Product", ar: null },
              value: { en: "\\( \\mathbf{u} \\cdot \\mathbf{v} = \\sum_{i=1}^n u_i v_i = \\mathbf{u}^T\\mathbf{v} \\)", ar: null }
            },
            {
              label: { en: "Cosine Similarity", ar: null },
              value: { en: "\\( \\cos\\theta = \\frac{\\mathbf{u} \\cdot \\mathbf{v}}{\\|\\mathbf{u}\\| \\|\\mathbf{v}\\|} \\in [-1, 1] \\)", ar: null }
            },
            {
              label: { en: "Cosine Distance", ar: null },
              value: { en: "\\( D_{\\cos}(\\mathbf{u}, \\mathbf{v}) = 1 - \\cos\\theta \\)", ar: null }
            },
            {
              label: { en: "Orthogonality", ar: null },
              value: { en: "\\( \\mathbf{u} \\perp \\mathbf{v} \\iff \\mathbf{u}^T\\mathbf{v} = 0 \\implies \\cos\\theta = 0 \\)", ar: null }
            }
          ]
        },
        {
          kind: "callout",
          style: "example",
          label: { en: "Worked Example 1.A — Cosine Similarity Between Word Embeddings", ar: null },
          body: {
            en: "<p>In an NLP embedding model, the word vectors for <em>'king'</em> and <em>'queen'</em> in a 3-dimensional subspace are \\( \\mathbf{u} = [0.8, 0.6, 0.0]^T \\) and \\( \\mathbf{v} = [0.6, 0.8, 0.0]^T \\). An unrelated word <em>'apple'</em> has vector \\( \\mathbf{w} = [0.0, 0.1, 0.99]^T \\). Calculate the cosine similarity between 'king' and 'queen', and between 'king' and 'apple'.</p><p><strong>Solution:</strong><br>1. Norm of \\( \\mathbf{u} \\): \\( \\|\\mathbf{u}\\| = \\sqrt{0.8^2 + 0.6^2 + 0^2} = \\sqrt{0.64 + 0.36} = 1.0 \\).<br>2. Norm of \\( \\mathbf{v} \\): \\( \\|\\mathbf{v}\\| = \\sqrt{0.6^2 + 0.8^2 + 0^2} = 1.0 \\).<br>3. Dot product: \\( \\mathbf{u} \\cdot \\mathbf{v} = (0.8)(0.6) + (0.6)(0.8) + (0)(0) = 0.48 + 0.48 = 0.96 \\).<br>Cosine similarity: \\( \\cos\\theta_{uv} = \\frac{0.96}{(1.0)(1.0)} = 0.96 \\) (very high semantic similarity!).<br><br>4. Now check 'king' and 'apple':<br>\\( \\mathbf{u} \\cdot \\mathbf{w} = (0.8)(0) + (0.6)(0.1) + (0)(0.99) = 0.06 \\).<br>Norm \\( \\|\\mathbf{w}\\| = \\sqrt{0^2 + 0.01 + 0.9801} = \\sqrt{0.9901} \\approx 0.995 \\).<br>Cosine similarity: \\( \\cos\\theta_{uw} = \\frac{0.06}{(1.0)(0.995)} \\approx 0.0603 \\) (near orthogonal, no semantic relation).<br><strong>Answer:</strong> \\( \\cos\\theta_{uv} = 0.96 \\); \\( \\cos\\theta_{uw} \\approx 0.060 \\).</p>",
            ar: null
          }
        }
      ]
    },
    quizWidget: {
      enabled: true,
      domains: ["Vectors & Embeddings in AI"]
    }
  },
  {
    id: "ai-matrices-linear-layers",
    chapterNumber: "2",
    title: {
      en: "Matrices, Linear Layers & Activation Functions",
      ar: "المصفوفات والطبقات الخطية في الشبكات العصبية ودوال التنشيط"
    },
    chapterTag: {
      variant: "category",
      className: "igcse-tag",
      emoji: "🤖",
      category: "AI Math Unit 2 — Neural Matrix Operations",
      badges: [{ text: "Applied STEM", className: "tier-e" }],
      topics: [
        "Matrix multiplication as linear transformation",
        "Dense layer forward pass y = Wx + b",
        "Dimensions, shapes &amp; batching",
        "Non-linear activations: ReLU, Sigmoid, Softmax",
        "Universal approximation theorem intuition"
      ]
    },
    content: {
      blocks: [
        {
          kind: "text",
          body: {
            en: "Deep neural networks are sequences of matrix multiplications alternated with non-linear activation functions. Here we formulate the algebraic forward pass of dense feedforward neural layers.",
            ar: null
          }
        },
        {
          kind: "callout",
          style: "def",
          label: { en: "● Definition 2.1 — Dense Neural Layer Formulation", ar: null },
          body: {
            en: "A fully connected (dense) neural network layer with \\( n_{\\text{in}} \\) inputs and \\( n_{\\text{out}} \\) neurons computes an affine linear transformation followed by an element-wise activation \\( \\sigma \\):<br>\\[ \\mathbf{z} = \\mathbf{W}\\mathbf{x} + \\mathbf{b}, \\quad \\mathbf{a} = \\sigma(\\mathbf{z}) \\]<br>where \\( \\mathbf{W} \\in \\mathbb{R}^{n_{\\text{out}} \\times n_{\\text{in}}} \\) is the weight matrix, \\( \\mathbf{x} \\in \\mathbb{R}^{n_{\\text{in}}} \\) is the input vector, \\( \\mathbf{b} \\in \\mathbb{R}^{n_{\\text{out}}} \\) is the bias vector, and \\( \\mathbf{a} \\in \\mathbb{R}^{n_{\\text{out}}} \\) is the layer activation vector.",
            ar: null
          }
        },
        {
          kind: "cards",
          items: [
            {
              label: { en: "ReLU", ar: null },
              value: { en: "\\( \\text{ReLU}(z) = \\max(0, z) \\)", ar: null }
            },
            {
              label: { en: "Sigmoid", ar: null },
              value: { en: "\\( \\sigma(z) = \\frac{1}{1 + e^{-z}} \\in (0, 1) \\)", ar: null }
            },
            {
              label: { en: "Softmax", ar: null },
              value: { en: "\\( \\text{Softmax}(z_i) = \\frac{e^{z_i}}{\\sum_j e^{z_j}} \\)", ar: null }
            },
            {
              label: { en: "Matrix Dimension Rule", ar: null },
              value: { en: "\\( (m \\times k) \\cdot (k \\times n) = (m \\times n) \\)", ar: null }
            }
          ]
        },
        {
          kind: "callout",
          style: "example",
          label: { en: "Worked Example 2.A — Manual Feedforward Neural Layer", ar: null },
          body: {
            en: "<p>A neural network layer has 2 inputs and 3 neurons with weights and biases:<br>\\[ \\mathbf{W} = \\begin{pmatrix} 2 & -1 \\\\ 0.5 & 3 \\\\ -1 & 1 \\end{pmatrix}, \\quad \\mathbf{b} = \\begin{pmatrix} 1 \\\\ -2 \\\\ 0.5 \\end{pmatrix} \\]<br>For the input \\( \\mathbf{x} = \\begin{pmatrix} 3 \\\\ 2 \\end{pmatrix} \\), compute the pre-activation \\( \\mathbf{z} \\) and the activated output \\( \\mathbf{a} \\) using the ReLU function.</p><p><strong>Solution:</strong><br>Compute \\( \\mathbf{W}\\mathbf{x} \\):<br>\\[ \\mathbf{W}\\mathbf{x} = \\begin{pmatrix} 2(3) + (-1)(2) \\\\ 0.5(3) + 3(2) \\\\ -1(3) + 1(2) \\end{pmatrix} = \\begin{pmatrix} 6 - 2 \\\\ 1.5 + 6 \\\\ -3 + 2 \\end{pmatrix} = \\begin{pmatrix} 4 \\\\ 7.5 \\\\ -1 \\end{pmatrix} \\]<br>Add bias vector \\( \\mathbf{b} \\):<br>\\[ \\mathbf{z} = \\begin{pmatrix} 4 \\\\ 7.5 \\\\ -1 \\end{pmatrix} + \\begin{pmatrix} 1 \\\\ -2 \\\\ 0.5 \\end{pmatrix} = \\begin{pmatrix} 5 \\\\ 5.5 \\\\ -0.5 \\end{pmatrix} \\]<br>Apply element-wise \\( \\text{ReLU}(z) = \\max(0, z) \\):<br>\\[ \\mathbf{a} = \\text{ReLU}(\\mathbf{z}) = \\begin{pmatrix} \\max(0, 5) \\\\ \\max(0, 5.5) \\\\ \\max(0, -0.5) \\end{pmatrix} = \\begin{pmatrix} 5 \\\\ 5.5 \\\\ 0 \\end{pmatrix} \\].<br><strong>Answer:</strong> \\( \\mathbf{z} = [5, 5.5, -0.5]^T \\), \\( \\mathbf{a} = [5, 5.5, 0]^T \\).</p>",
            ar: null
          }
        }
      ]
    },
    quizWidget: {
      enabled: true,
      domains: ["Neural Layer Matrices & Activations"]
    }
  },
  {
    id: "ai-gradient-descent",
    chapterNumber: "3",
    title: {
      en: "Loss Functions, Gradients & Optimization",
      ar: "دوال الخسارة والانحدار التدريجي والتحسين الرياضي"
    },
    chapterTag: {
      variant: "category",
      className: "igcse-tag",
      emoji: "🤖",
      category: "AI Math Unit 3 — Gradient Descent Optimization",
      badges: [{ text: "Applied STEM", className: "tier-e" }],
      topics: [
        "Loss functions: Mean Squared Error (MSE)",
        "Partial derivatives &amp; the gradient vector ∇L",
        "Learning rate η and convergence",
        "Gradient descent update rule w ← w - η ∇L",
        "Convex vs non-convex loss landscapes"
      ]
    },
    content: {
      blocks: [
        {
          kind: "text",
          body: {
            en: "Machine learning models learn by minimizing a loss function via gradient descent. Calculus provides the directional derivative pointing toward the steepest descent in parameter space.",
            ar: null
          }
        },
        {
          kind: "callout",
          style: "thm",
          label: { en: "▲ Theorem 3.1 — Gradient Descent Update Equation", ar: null },
          body: {
            en: "Let \\( L(\\mathbf{w}) \\) be a differentiable loss function over weight parameters \\( \\mathbf{w} \\). The gradient \\( \\nabla L(\\mathbf{w}) = \\left[ \\frac{\\partial L}{\\partial w_1}, \\dots, \\frac{\\partial L}{\\partial w_d} \\right]^T \\) points in the direction of greatest rate of increase.<br>To minimize loss, parameter updates step in the <strong>opposite</strong> direction scaled by learning rate \\( \\eta > 0 \\):<br>\\[ \\mathbf{w}_{t+1} = \\mathbf{w}_t - \\eta \\nabla L(\\mathbf{w}_t) \\]",
            ar: null
          }
        },
        {
          kind: "cards",
          items: [
            {
              label: { en: "MSE Loss", ar: null },
              value: { en: "\\( \\text{MSE} = \\frac{1}{N}\\sum_{i=1}^N (y_i - \\hat{y}_i)^2 \\)", ar: null }
            },
            {
              label: { en: "Gradient Vector", ar: null },
              value: { en: "\\( \\nabla L = \\left[ \\frac{\\partial L}{\\partial w}, \\frac{\\partial L}{\\partial b} \\right]^T \\)", ar: null }
            },
            {
              label: { en: "Learning Rate", ar: null },
              value: { en: "Too high: divergence/oscillation. Too low: slow convergence.", ar: null }
            },
            {
              label: { en: "Stochastic GD", ar: null },
              value: { en: "Updates weights on mini-batches of size \\( B \\ll N \\).", ar: null }
            }
          ]
        },
        {
          kind: "callout",
          style: "example",
          label: { en: "Worked Example 3.A — Single Step of Gradient Descent", ar: null },
          body: {
            en: "<p>Consider a simple linear model \\( \\hat{y} = wx \\) with squared loss for a single data point \\( (x, y) = (2, 8) \\):<br>\\[ L(w) = (y - wx)^2 = (8 - 2w)^2 \\]<br>If the current weight is \\( w_0 = 1.0 \\) and the learning rate is \\( \\eta = 0.05 \\), compute the gradient \\( \\frac{dL}{dw} \\) and the updated weight \\( w_1 \\).</p><p><strong>Solution:</strong><br>Apply the chain rule to differentiate \\( L(w) \\):<br>\\[ \\frac{dL}{dw} = 2(8 - 2w) \\cdot (-2) = -4(8 - 2w) = -32 + 8w \\]<br>Evaluate at \\( w_0 = 1.0 \\):<br>\\[ \\left.\\frac{dL}{dw}\\right|_{w=1.0} = -32 + 8(1) = -24 \\]<br>Apply gradient descent update:<br>\\[ w_1 = w_0 - \\eta \\left(\\frac{dL}{dw}\\right) = 1.0 - (0.05)(-24) = 1.0 + 1.2 = 2.2 \\].<br>Notice that with \\( w_0 = 1.0 \\), prediction \\( \\hat{y} = 2 \\) was too low (target was 8). The gradient step increased \\( w \\) to 2.2, giving \\( \\hat{y} = 4.4 \\), moving closer to 8.<br><strong>Answer:</strong> Gradient = \\( -24 \\); updated weight \\( w_1 = 2.2 \\).</p>",
            ar: null
          }
        }
      ]
    },
    quizWidget: {
      enabled: true,
      domains: ["Gradient Descent & Optimization"]
    }
  },
  {
    id: "ai-probability-bayes",
    chapterNumber: "4",
    title: {
      en: "Conditional Probability, Bayes' Rule & Classifiers",
      ar: "الاحتمال الشرطي وقاعدة بايز ومصنفات الذكاء الاصطناعي"
    },
    chapterTag: {
      variant: "category",
      className: "igcse-tag",
      emoji: "🤖",
      category: "AI Math Unit 4 — Probabilistic Machine Learning",
      badges: [{ text: "Applied STEM", className: "tier-e" }],
      topics: [
        "Joint and conditional probability P(A|B)",
        "Bayes' Theorem: Prior, Likelihood, Posterior",
        "Total probability theorem",
        "Naive Bayes independence assumption",
        "Text spam filtering &amp; medical diagnostics"
      ]
    },
    content: {
      blocks: [
        {
          kind: "text",
          body: {
            en: "Uncertainty is omnipresent in real-world data. Bayes' Theorem provides the mathematical framework for updating beliefs when observing new evidence, forming the core of Bayesian machine learning and Naive Bayes classifiers.",
            ar: null
          }
        },
        {
          kind: "callout",
          style: "thm",
          label: { en: "▲ Theorem 4.1 — Bayes' Theorem in Machine Learning", ar: null },
          body: {
            en: "For hypothesis (class) \\( C \\) and observed evidence (features) \\( \\mathbf{x} \\):<br>\\[ P(C | \\mathbf{x}) = \\frac{P(\\mathbf{x} | C) P(C)}{P(\\mathbf{x})} \\]<br>Where:<br>• \\( P(C) \\) is the <strong>Prior probability</strong> of class \\( C \\).<br>• \\( P(\\mathbf{x} | C) \\) is the <strong>Likelihood</strong> of observing features \\( \\mathbf{x} \\) given class \\( C \\).<br>• \\( P(\\mathbf{x}) = \\sum_k P(\\mathbf{x}|C_k)P(C_k) \\) is the <strong>Marginal probability (Evidence)</strong>.<br>• \\( P(C | \\mathbf{x}) \\) is the <strong>Posterior probability</strong>.",
            ar: null
          }
        },
        {
          kind: "cards",
          items: [
            {
              label: { en: "Conditional Probability", ar: null },
              value: { en: "\\( P(A|B) = \\frac{P(A \\cap B)}{P(B)} \\)", ar: null }
            },
            {
              label: { en: "Naive Bayes Assumption", ar: null },
              value: { en: "\\( P(\\mathbf{x}|C) = \\prod_{j=1}^d P(x_j|C) \\) (conditional independence)", ar: null }
            },
            {
              label: { en: "Decision Rule", ar: null },
              value: { en: "\\( \\hat{C} = \\arg\\max_C P(C) \\prod_{j=1}^d P(x_j|C) \\)", ar: null }
            },
            {
              label: { en: "Laplace Smoothing", ar: null },
              value: { en: "Prevents zero probability: \\( \\frac{\\text{count} + 1}{\\text{total} + |V|} \\)", ar: null }
            }
          ]
        },
        {
          kind: "callout",
          style: "example",
          label: { en: "Worked Example 4.A — Bayesian Spam Classification", ar: null },
          body: {
            en: "<p>An email filter processes emails where \\( 20\\% \\) are spam (\\( P(S) = 0.20 \\)) and \\( 80\\% \\) are legitimate (\\( P(L) = 0.80 \\)). The word <em>'lottery'</em> appears in \\( 60\\% \\) of spam emails (\\( P(W|S) = 0.60 \\)) and in \\( 1\\% \\) of legitimate emails (\\( P(W|L) = 0.01 \\)). If an incoming email contains the word 'lottery', what is the probability that it is spam?</p><p><strong>Solution:</strong><br>By Bayes' Theorem:<br>\\[ P(S|W) = \\frac{P(W|S)P(S)}{P(W)} \\]<br>Calculate total probability \\( P(W) \\):<br>\\[ P(W) = P(W|S)P(S) + P(W|L)P(L) = (0.60)(0.20) + (0.01)(0.80) = 0.12 + 0.008 = 0.128 \\]<br>Compute posterior:<br>\\[ P(S|W) = \\frac{0.12}{0.128} = \\frac{120}{128} = \\frac{15}{16} = 0.9375 \\].<br>Despite only 20% of all emails being spam initially, observing the word 'lottery' raises the probability to \\( 93.75\\% \\).<br><strong>Answer:</strong> \\( 93.75\\% \\) (or \\( 0.938 \\)).</p>",
            ar: null
          }
        }
      ]
    },
    quizWidget: {
      enabled: true,
      domains: ["Conditional Probability & Bayes' Rule"]
    }
  },
  {
    id: "ai-distributions-mle",
    chapterNumber: "5",
    title: {
      en: "Probability Distributions & Maximum Likelihood (MLE)",
      ar: "التوزيعات الاحتمالية وتقدير الاحتمال الأقصى (MLE)"
    },
    chapterTag: {
      variant: "category",
      className: "igcse-tag",
      emoji: "🤖",
      category: "AI Math Unit 5 — Distributions & Estimation",
      badges: [{ text: "Applied STEM", className: "tier-e" }],
      topics: [
        "Gaussian / Normal distribution N(μ, σ²)",
        "Bernoulli &amp; Binomial distributions for classification",
        "Likelihood function L(θ | data)",
        "Log-Likelihood log L(θ) and differentiation",
        "MLE parameter derivation for Gaussian mean and variance"
      ]
    },
    content: {
      blocks: [
        {
          kind: "text",
          body: {
            en: "Data in AI is modeled using probability distributions. Maximum Likelihood Estimation (MLE) is the statistical method used to find the model parameters that make the observed training data most probable.",
            ar: null
          }
        },
        {
          kind: "callout",
          style: "def",
          label: { en: "● Definition 5.1 — Maximum Likelihood Estimation (MLE)", ar: null },
          body: {
            en: "Given independent and identically distributed (i.i.d.) observations \\( X = \\{x_1, x_2, \\dots, x_N\\} \\) from a distribution parameterized by \\( \\theta \\):<br>1. <strong>Likelihood:</strong> \\( L(\\theta) = \\prod_{i=1}^N p(x_i | \\theta) \\).<br>2. <strong>Log-Likelihood:</strong> \\( \\ell(\\theta) = \\ln L(\\theta) = \\sum_{i=1}^N \\ln p(x_i | \\theta) \\). Taking the logarithm converts products into sums without shifting the maximizing argument.<br>3. <strong>MLE Estimator:</strong> \\( \\hat{\\theta}_{\\text{MLE}} = \\arg\\max_\\theta \\ell(\\theta) \\), solved by setting \\( \\frac{\\partial \\ell}{\\partial \\theta} = 0 \\).",
            ar: null
          }
        },
        {
          kind: "cards",
          items: [
            {
              label: { en: "Gaussian PDF", ar: null },
              value: { en: "\\( p(x) = \\frac{1}{\\sigma\\sqrt{2\\pi}} e^{-\\frac{(x-\\mu)^2}{2\\sigma^2}} \\)", ar: null }
            },
            {
              label: { en: "Gaussian Mean MLE", ar: null },
              value: { en: "\\( \\hat{\\mu}_{\\text{MLE}} = \\frac{1}{N}\\sum_{i=1}^N x_i \\) (sample mean)", ar: null }
            },
            {
              label: { en: "Gaussian Var MLE", ar: null },
              value: { en: "\\( \\hat{\\sigma}^2_{\\text{MLE}} = \\frac{1}{N}\\sum_{i=1}^N (x_i - \\hat{\\mu})^2 \\)", ar: null }
            },
            {
              label: { en: "Bernoulli MLE", ar: null },
              value: { en: "\\( \\hat{p}_{\\text{MLE}} = \\frac{k}{N} \\) (fraction of positive trials)", ar: null }
            }
          ]
        },
        {
          kind: "callout",
          style: "example",
          label: { en: "Worked Example 5.A — Deriving the MLE of a Bernoulli Parameter", ar: null },
          body: {
            en: "<p>Let \\( x_1, x_2, \\dots, x_N \\in \\{0, 1\\} \\) be \\( N \\) binary outcomes from a coin toss with unknown bias \\( p \\). Deriving the MLE estimator for \\( p \\).</p><p><strong>Solution:</strong><br>The probability of single outcome is \\( P(x_i) = p^{x_i}(1-p)^{1-x_i} \\).<br>The likelihood for \\( N \\) i.i.d. observations is:<br>\\[ L(p) = \\prod_{i=1}^N p^{x_i}(1-p)^{1-x_i} = p^{\\sum x_i} (1-p)^{N - \\sum x_i} \\]<br>Let \\( k = \\sum_{i=1}^N x_i \\) be the total number of successes.<br>Log-likelihood:<br>\\[ \\ell(p) = \\ln L(p) = k \\ln p + (N - k) \\ln(1 - p) \\]<br>Differentiate with respect to \\( p \\) and set to 0:<br>\\[ \\frac{d\\ell}{dp} = \\frac{k}{p} - \\frac{N - k}{1 - p} = 0 \\implies \\frac{k}{p} = \\frac{N - k}{1 - p} \\]<br>\\[ k(1 - p) = p(N - k) \\implies k - kp = Np - kp \\implies Np = k \\implies \\hat{p}_{\\text{MLE}} = \\frac{k}{N} \\].<br>Checking second derivative: \\( \\frac{d^2\\ell}{dp^2} = -\\frac{k}{p^2} - \\frac{N-k}{(1-p)^2} < 0 \\), confirming a maximum.<br><strong>Answer:</strong> \\( \\hat{p}_{\\text{MLE}} = \\frac{1}{N}\\sum_{i=1}^N x_i \\).</p>",
            ar: null
          }
        }
      ]
    },
    quizWidget: {
      enabled: true,
      domains: ["Distributions & Maximum Likelihood"]
    }
  },
  {
    id: "ai-linear-regression",
    chapterNumber: "6",
    title: {
      en: "Linear Regression & Ordinary Least Squares",
      ar: "الانحدار الخطي وطريقة المربعات الصغرى (OLS)"
    },
    chapterTag: {
      variant: "category",
      className: "igcse-tag",
      emoji: "🤖",
      category: "AI Math Unit 6 — Linear Models & OLS",
      badges: [{ text: "Applied STEM", className: "tier-e" }],
      topics: [
        "Simple linear regression: y = mx + b",
        "Matrix formulation Y = Xw + ε",
        "Ordinary Least Squares (OLS) closed form",
        "Normal equation w = (XᵀX)⁻¹ Xᵀ y",
        "Residuals, MSE and R² coefficient of determination"
      ]
    },
    content: {
      blocks: [
        {
          kind: "text",
          body: {
            en: "Linear regression is the foundational predictive model in data science. We explore both algebraic least-squares minimization and the closed-form matrix Normal Equation used across analytics libraries.",
            ar: null
          }
        },
        {
          kind: "callout",
          style: "thm",
          label: { en: "▲ Theorem 6.1 — The Matrix Normal Equation", ar: null },
          body: {
            en: "For a linear model \\( \\mathbf{y} = \\mathbf{X}\\mathbf{w} \\) where \\( \\mathbf{X} \\in \\mathbb{R}^{N \\times (d+1)} \\) is the design matrix (including a column of ones for intercept), the weight vector \\( \\mathbf{w} \\) that minimizes the sum of squared errors \\( \\|\\mathbf{y} - \\mathbf{X}\\mathbf{w}\\|^2 \\) satisfies:<br>\\[ \\mathbf{X}^T \\mathbf{X} \\mathbf{w} = \\mathbf{X}^T \\mathbf{y} \\implies \\mathbf{w} = (\\mathbf{X}^T \\mathbf{X})^{-1} \\mathbf{X}^T \\mathbf{y} \\]<br>provided \\( \\mathbf{X}^T \\mathbf{X} \\) is invertible (non-singular).",
            ar: null
          }
        },
        {
          kind: "cards",
          items: [
            {
              label: { en: "Slope Formula", ar: null },
              value: { en: "\\( m = \\frac{\\sum (x_i - \\bar{x})(y_i - \\bar{y})}{\\sum (x_i - \\bar{x})^2} = \\frac{S_{xy}}{S_{xx}} \\)", ar: null }
            },
            {
              label: { en: "Intercept", ar: null },
              value: { en: "\\( b = \\bar{y} - m\\bar{x} \\)", ar: null }
            },
            {
              label: { en: "R² Score", ar: null },
              value: { en: "\\( R^2 = 1 - \\frac{\\text{SS}_{\\text{res}}}{\\text{SS}_{\\text{tot}}} \\in [0, 1] \\)", ar: null }
            },
            {
              label: { en: "Residual Vector", ar: null },
              value: { en: "\\( \\mathbf{e} = \\mathbf{y} - \\hat{\\mathbf{y}} \\perp \\text{col}(\\mathbf{X}) \\)", ar: null }
            }
          ]
        },
        {
          kind: "callout",
          style: "example",
          label: { en: "Worked Example 6.A — Closed-Form Matrix Normal Equation", ar: null },
          body: {
            en: "<p>Fit a line \\( y = w_1 x + w_0 \\) to three points: \\( (1, 2) \\), \\( (2, 3) \\), and \\( (3, 5) \\) using the Normal Equation.</p><p><strong>Solution:</strong><br>1. Set up design matrix \\( \\mathbf{X} \\) (with bias column) and target \\( \\mathbf{y} \\):<br>\\[ \\mathbf{X} = \\begin{pmatrix} 1 & 1 \\\\ 2 & 1 \\\\ 3 & 1 \\end{pmatrix}, \\quad \\mathbf{y} = \\begin{pmatrix} 2 \\\\ 3 \\\\ 5 \\end{pmatrix} \\]<br>2. Compute \\( \\mathbf{X}^T \\mathbf{X} \\):<br>\\[ \\mathbf{X}^T \\mathbf{X} = \\begin{pmatrix} 1 & 2 & 3 \\\\ 1 & 1 & 1 \\end{pmatrix} \\begin{pmatrix} 1 & 1 \\\\ 2 & 1 \\\\ 3 & 1 \\end{pmatrix} = \\begin{pmatrix} 1+4+9 & 1+2+3 \\\\ 1+2+3 & 1+1+1 \\end{pmatrix} = \\begin{pmatrix} 14 & 6 \\\\ 6 & 3 \\end{pmatrix} \\]<br>3. Invert \\( \\mathbf{X}^T \\mathbf{X} \\):<br>\\( \\det = (14)(3) - (6)(6) = 42 - 36 = 6 \\).<br>\\[ (\\mathbf{X}^T \\mathbf{X})^{-1} = \\frac{1}{6} \\begin{pmatrix} 3 & -6 \\\\ -6 & 14 \\end{pmatrix} \\]<br>4. Compute \\( \\mathbf{X}^T \\mathbf{y} \\):<br>\\[ \\mathbf{X}^T \\mathbf{y} = \\begin{pmatrix} 1 & 2 & 3 \\\\ 1 & 1 & 1 \\end{pmatrix} \\begin{pmatrix} 2 \\\\ 3 \\\\ 5 \\end{pmatrix} = \\begin{pmatrix} 2 + 6 + 15 \\\\ 2 + 3 + 5 \\end{pmatrix} = \\begin{pmatrix} 23 \\\\ 10 \\end{pmatrix} \\]<br>5. Compute \\( \\mathbf{w} = (\\mathbf{X}^T \\mathbf{X})^{-1} (\\mathbf{X}^T \\mathbf{y}) \\):<br>\\[ \\mathbf{w} = \\frac{1}{6} \\begin{pmatrix} 3(23) - 6(10) \\\\ -6(23) + 14(10) \\end{pmatrix} = \\frac{1}{6} \\begin{pmatrix} 69 - 60 \\\\ -138 + 140 \\end{pmatrix} = \\frac{1}{6} \\begin{pmatrix} 9 \\\\ 2 \\end{pmatrix} = \\begin{pmatrix} 1.5 \\\\ 0.333 \\end{pmatrix} \\]<br>Line equation: \\( \\hat{y} = 1.5x + \\frac{1}{3} \\).<br><strong>Answer:</strong> Slope \\( w_1 = 1.5 \\), Intercept \\( w_0 = \\frac{1}{3} \\).</p>",
            ar: null
          }
        }
      ]
    },
    quizWidget: {
      enabled: true,
      domains: ["Linear Regression & OLS"]
    }
  },
  {
    id: "ai-logistic-regression",
    chapterNumber: "7",
    title: {
      en: "Logistic Regression & Classification Boundaries",
      ar: "الانحدار اللوجستي والحدود الفاصلة للتصنيف"
    },
    chapterTag: {
      variant: "category",
      className: "igcse-tag",
      emoji: "🤖",
      category: "AI Math Unit 7 — Logistic Classification",
      badges: [{ text: "Applied STEM", className: "tier-e" }],
      topics: [
        "Binary classification &amp; probabilities",
        "The Sigmoid function σ(z) = 1 / (1 + e⁻ᶻ)",
        "Log-odds (Logit) transformation",
        "Binary Cross-Entropy (Log Loss) function",
        "Linear decision boundaries and threshold tuning"
      ]
    },
    content: {
      blocks: [
        {
          kind: "text",
          body: {
            en: "When the target variable is categorical (0 or 1, positive or negative), standard linear regression fails. Logistic regression maps continuous linear combinations to calibrated probabilities using the Sigmoid curve.",
            ar: null
          }
        },
        {
          kind: "callout",
          style: "def",
          label: { en: "● Definition 7.1 — Sigmoid & Binary Cross-Entropy", ar: null },
          body: {
            en: "1. <strong>Sigmoid Function:</strong> \\( \\sigma(z) = \\frac{1}{1 + e^{-z}} \\).<br>Key properties: \\( \\sigma(0) = 0.5 \\), \\( \\lim_{z \\to \\infty} \\sigma(z) = 1 \\), \\( \\lim_{z \\to -\\infty} \\sigma(z) = 0 \\). Derivative: \\( \\sigma'(z) = \\sigma(z)(1 - \\sigma(z)) \\).<br><br>2. <strong>Binary Cross-Entropy Loss:</strong> For true label \\( y \\in \\{0, 1\\} \\) and model prediction \\( \\hat{y} = \\sigma(\\mathbf{w}^T\\mathbf{x}) \\):<br>\\[ L(y, \\hat{y}) = -\\Big[ y \\ln\\hat{y} + (1 - y) \\ln(1 - \\hat{y}) \\Big] \\]",
            ar: null
          }
        },
        {
          kind: "cards",
          items: [
            {
              label: { en: "Odds Ratio", ar: null },
              value: { en: "\\( \\text{Odds} = \\frac{p}{1-p} = e^{\\mathbf{w}^T\\mathbf{x}} \\)", ar: null }
            },
            {
              label: { en: "Log-Odds (Logit)", ar: null },
              value: { en: "\\( \\ln\\left(\\frac{p}{1-p}\\right) = \\mathbf{w}^T\\mathbf{x} \\)", ar: null }
            },
            {
              label: { en: "Decision Boundary", ar: null },
              value: { en: "\\( \\hat{y} \\ge 0.5 \\iff \\mathbf{w}^T\\mathbf{x} \\ge 0 \\) (hyperplane separating classes)", ar: null }
            },
            {
              label: { en: "Loss Derivative", ar: null },
              value: { en: "\\( \\frac{\\partial L}{\\partial \\mathbf{w}} = (\\hat{y} - y)\\mathbf{x} \\) (remarkably clean!)", ar: null }
            }
          ]
        },
        {
          kind: "callout",
          style: "example",
          label: { en: "Worked Example 7.A — Probability & Cross-Entropy Calculation", ar: null },
          body: {
            en: "<p>A medical AI model has learned weights \\( w = 0.8 \\) and bias \\( b = -2.4 \\) for predicting whether a tumor is malignant (\\( y=1 \\)) based on diameter \\( x \\) in cm:<br>\\[ z = 0.8x - 2.4, \\quad \\hat{y} = \\sigma(z) \\]<br>(a) Find the predicted malignancy probability for a tumor of diameter \\( x = 4.5 \\text{ cm} \\).<br>(b) If the actual diagnosis was malignant (\\( y = 1 \\)), calculate the binary cross-entropy loss \\( L \\).</p><p><strong>Solution:</strong><br>(a) Compute logit \\( z \\):<br>\\( z = 0.8(4.5) - 2.4 = 3.6 - 2.4 = 1.2 \\).<br>Compute probability via Sigmoid:<br>\\[ \\hat{y} = \\sigma(1.2) = \\frac{1}{1 + e^{-1.2}} = \\frac{1}{1 + 0.3012} = \\frac{1}{1.3012} \\approx 0.7685 \\] (76.85% probability).<br><br>(b) Binary cross-entropy with \\( y = 1 \\):<br>\\[ L = -\\Big[ 1 \\cdot \\ln(0.7685) + 0 \\cdot \\ln(1 - 0.7685) \\Big] = -\\ln(0.7685) \\approx -(-0.2633) = 0.2633 \\].<br><strong>Answer:</strong> (a) \\( \\hat{y} \\approx 0.769 \\) (76.9%), (b) Loss \\( L \\approx 0.263 \\).</p>",
            ar: null
          }
        }
      ]
    },
    quizWidget: {
      enabled: true,
      domains: ["Logistic Regression & Classification"]
    }
  },
  {
    id: "ai-pca-dimensionality",
    chapterNumber: "8",
    title: {
      en: "Dimensionality Reduction, Covariance & PCA",
      ar: "تقليل الأبعاد ومصفوفة التباين المشترك وتحليل المكونات الرئيسية (PCA)"
    },
    chapterTag: {
      variant: "category",
      className: "igcse-tag",
      emoji: "🤖",
      category: "AI Math Unit 8 — Dimensionality Reduction & PCA",
      badges: [{ text: "Applied STEM", className: "tier-e" }],
      topics: [
        "Curse of dimensionality in high-dimensional data",
        "Sample covariance matrix Σ",
        "Eigenvalues λ and Eigenvectors v",
        "Principal Component Analysis (PCA) projection",
        "Explained variance ratio and data compression"
      ]
    },
    content: {
      blocks: [
        {
          kind: "text",
          body: {
            en: "Real datasets frequently have hundreds or thousands of correlated features. Principal Component Analysis (PCA) identifies the orthogonal axes of maximum variance, compressing high-dimensional data while preserving essential information.",
            ar: null
          }
        },
        {
          kind: "callout",
          style: "thm",
          label: { en: "▲ Theorem 8.1 — PCA via Spectral Decomposition", ar: null },
          body: {
            en: "Let \\( \\mathbf{X} \\in \\mathbb{R}^{N \\times d} \\) be a zero-centered data matrix (mean \\( \\mathbf{\\bar{x}} = \\mathbf{0} \\)).<br>1. The empirical covariance matrix is \\( \\mathbf{\\Sigma} = \\frac{1}{N-1} \\mathbf{X}^T \\mathbf{X} \\in \\mathbb{R}^{d \\times d} \\).<br>2. Because \\( \\mathbf{\\Sigma} \\) is symmetric positive semi-definite, it admits an orthonormal eigen-decomposition:<br>\\[ \\mathbf{\\Sigma} \\mathbf{v}_i = \\lambda_i \\mathbf{v}_i, \\quad \\lambda_1 \\ge \\lambda_2 \\ge \\dots \\ge \\lambda_d \\ge 0 \\]<br>3. The first principal component \\( \\mathbf{v}_1 \\) is the unit eigenvector associated with the largest eigenvalue \\( \\lambda_1 \\), maximizing the variance of the projected data.",
            ar: null
          }
        },
        {
          kind: "cards",
          items: [
            {
              label: { en: "Covariance Entry", ar: null },
              value: { en: "\\( \\text{Cov}(X, Y) = \\frac{1}{N-1}\\sum (x_i - \\bar{x})(y_i - \\bar{y}) \\)", ar: null }
            },
            {
              label: { en: "Characteristic Equation", ar: null },
              value: { en: "\\( \\det(\\mathbf{\\Sigma} - \\lambda \\mathbf{I}) = 0 \\)", ar: null }
            },
            {
              label: { en: "Explained Variance", ar: null },
              value: { en: "\\( \\text{Ratio}_k = \\frac{\\lambda_k}{\\sum_{j=1}^d \\lambda_j} \\)", ar: null }
            },
            {
              label: { en: "Projection", ar: null },
              value: { en: "\\( \\mathbf{z} = \\mathbf{V}_k^T \\mathbf{x} \\in \\mathbb{R}^k \\) (reduced representation)", ar: null }
            }
          ]
        },
        {
          kind: "callout",
          style: "example",
          label: { en: "Worked Example 8.A — Finding Principal Components of 2D Data", ar: null },
          body: {
            en: "<p>A 2D centered dataset has sample covariance matrix:<br>\\[ \\mathbf{\\Sigma} = \\begin{pmatrix} 4 & 2 \\\\ 2 & 1 \\end{pmatrix} \\]<br>(a) Find the eigenvalues \\( \\lambda_1 \\) and \\( \\lambda_2 \\).<br>(b) Find the unit eigenvector \\( \\mathbf{v}_1 \\) corresponding to the principal component.<br>(c) What percentage of total variance is explained by the first principal component?</p><p><strong>Solution:</strong><br>(a) Characteristic equation \\( \\det(\\mathbf{\\Sigma} - \\lambda\\mathbf{I}) = 0 \\):<br>\\[ \\det \\begin{pmatrix} 4 - \\lambda & 2 \\\\ 2 & 1 - \\lambda \\end{pmatrix} = (4 - \\lambda)(1 - \\lambda) - (2)(2) = 0 \\]<br>\\[ \\lambda^2 - 5\\lambda + 4 - 4 = 0 \\implies \\lambda^2 - 5\\lambda = 0 \\implies \\lambda(\\lambda - 5) = 0 \\].<br>Eigenvalues are \\( \\lambda_1 = 5 \\) and \\( \\lambda_2 = 0 \\).<br><br>(b) For \\( \\lambda_1 = 5 \\):<br>\\[ (\\mathbf{\\Sigma} - 5\\mathbf{I})\\mathbf{v} = \\begin{pmatrix} -1 & 2 \\\\ 2 & -4 \\end{pmatrix} \\begin{pmatrix} v_1 \\\\ v_2 \\end{pmatrix} = \\begin{pmatrix} 0 \\\\ 0 \\end{pmatrix} \\implies -v_1 + 2v_2 = 0 \\implies v_1 = 2v_2 \\].<br>A directional vector is \\( \\begin{pmatrix} 2 \\\\ 1 \\end{pmatrix} \\). Normalizing to unit length:<br>\\[ \\|\\mathbf{v}\\| = \\sqrt{2^2 + 1^2} = \\sqrt{5} \\implies \\mathbf{v}_1 = \\frac{1}{\\sqrt{5}}\\begin{pmatrix} 2 \\\\ 1 \\end{pmatrix} = \\begin{pmatrix} 2/\\sqrt{5} \\\\ 1/\\sqrt{5} \\end{pmatrix} \\approx \\begin{pmatrix} 0.894 \\\\ 0.447 \\end{pmatrix} \\].<br><br>(c) Total variance = \\( \\lambda_1 + \\lambda_2 = 5 + 0 = 5 \\).<br>Percentage explained = \\( \\frac{5}{5} = 100\\% \\). (The data lies perfectly along a 1D line in 2D space!).<br><strong>Answer:</strong> \\( \\lambda_1 = 5, \\, \\lambda_2 = 0 \\); \\( \\mathbf{v}_1 = [0.894, 0.447]^T \\); 100% variance explained.</p>",
            ar: null
          }
        }
      ]
    },
    quizWidget: {
      enabled: true,
      domains: ["PCA & Dimensionality Reduction"]
    }
  }
];

chapters.forEach((ch) => {
  fs.writeFileSync(path.join(TRACK_DIR, ch.id + '.json'), JSON.stringify(ch, null, 2), 'utf8');
});

console.log(`✅ Math for AI & Data Science: created _meta.json and ${chapters.length} chapters.`);
