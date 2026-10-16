#!/usr/bin/env node
/**
 * scripts/build_mathai_ix.js
 * Generates rich, authentic, 100% bilingual interactive practice activities
 * for Math for AI & Data Science (src/scripts/ix-data/mathai.js).
 */
'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const OUT_FILE = path.join(ROOT, 'src', 'scripts', 'ix-data', 'mathai.js');

const D = {};

// 1. ai-vectors-embeddings
D['ai-vectors-embeddings'] = [
  {
    t: "qc",
    ti: "Quick Check: Cosine Similarity Properties",
    q: "If two non-zero vectors in an embedding space point in exactly the same direction, what is their cosine similarity?",
    o: [
      "1.0",
      "0.0",
      "-1.0",
      "π / 2"
    ],
    a: 0,
    ex: "Cosine similarity is cos(θ) = (u · v) / (||u|| ||v||). If they point in the identical direction, angle θ = 0, so cos(0) = 1.0 (maximum semantic alignment).",
    ti_ar: "فحص سريع: خواص تشابه جيب التمام (Cosine Similarity)",
    q_ar: "إذا كان متجهان غير صفريين في فضاء التمثيل الشعاعي يشيران إلى نفس الاتجاه تماماً، فما قيمة تشابه جيب التمام بينهما؟",
    o_ar: [
      "1.0",
      "0.0",
      "-1.0",
      "π / 2"
    ],
    ex_ar: "تشابه جيب التمام هو cos(θ) = (u · v) / (||u|| ||v||). إذا كان المتجهان في نفس الاتجاه، فإن الزاوية θ = 0، وبالتالي cos(0) = 1.0 (أعلى تطابق دلالي)."
  },
  {
    t: "mt",
    ti: "Matching: Vector Norms in Machine Learning",
    p: [
      { l: "L2 (Euclidean) Norm", r: "Straight-line distance: √(x₁² + x₂² + ... + xₙ²)" },
      { l: "L1 (Manhattan) Norm", r: "Sum of absolute values: |x₁| + |x₂| + ... + |xₙ|" },
      { l: "L∞ (Chebyshev) Norm", r: "Maximum absolute component: max(|xᵢ|)" },
      { l: "Unit Vector", r: "Vector scaled to have norm equal to 1" }
    ],
    ti_ar: "مطابقة: المعايير الاتجاهية في تعلم الآلة",
    p_ar: [
      { l: "معيار L2 (المسافة الإقليدية)", r: "المسافة المستقيمة المباشرة: √(x₁² + x₂² + ... + xₙ²)" },
      { l: "معيار L1 (مسافة مانهاتن)", r: "مجموع القيم المطلقة للمركبات: |x₁| + |x₂| + ... + |xₙ|" },
      { l: "معيار L∞ (الأقصى)", r: "أكبر قيمة مطلقة بين مركبات المتجه: max(|xᵢ|)" },
      { l: "متجه الوحدة", r: "متجه تمت قسمته على معياره ليصبح طوله 1 تماماً" }
    ]
  }
];

// 2. ai-matrices-linear-layers
D['ai-matrices-linear-layers'] = [
  {
    t: "qc",
    ti: "Quick Check: Neural Layer Weight Matrix Dimensions",
    q: "A dense neural network layer takes an input vector with 4 features and outputs 3 activations. What must be the dimensions of the weight matrix W in the forward pass y = Wx + b?",
    o: [
      "3 × 4 (3 rows, 4 columns)",
      "4 × 3 (4 rows, 3 columns)",
      "4 × 4 (square matrix)",
      "3 × 3 (output square matrix)"
    ],
    a: 0,
    ex: "In y = Wx + b, x has shape (4 × 1) and y has shape (3 × 1). For matrix multiplication to be valid, W must have shape (3 × 4), because (3 × 4) · (4 × 1) = (3 × 1).",
    ti_ar: "فحص سريع: أبعاد مصفوفة الأوزان في الطبقة العصبية",
    q_ar: "تستقبل طبقة عصبية كثيفة متجهاً مدخلاً يحتوي على 4 خصائص وتنتج 3 مخرجات. ما الأبعاد الصحيحة لمصفوفة الأوزان W في المعادلة y = Wx + b؟",
    o_ar: [
      "3 × 4 (3 صفوف، 4 أعمدة)",
      "4 × 3 (4 صفوف، 3 أعمدة)",
      "4 × 4 (مصفوفة مربعة)",
      "3 × 3 (مصفوفة مربعة للمخرجات)"
    ],
    ex_ar: "في المعادلة y = Wx + b، المتجه x بعده (4 × 1) والمتجه y بعده (3 × 1). ولكي يصح ضرب المصفوفات، يجب أن تكون مصفوفة الأوزان W بأبعاد (3 × 4)، لأن (3 × 4) · (4 × 1) = (3 × 1)."
  },
  {
    t: "mt",
    ti: "Matching: Neural Activation Functions",
    p: [
      { l: "ReLU", r: "f(z) = max(0, z); linear for positive, 0 for negative" },
      { l: "Sigmoid", r: "σ(z) = 1 / (1 + e⁻ᶻ); squashes input into (0, 1)" },
      { l: "Softmax", r: "Converts logits into a normalized probability distribution summing to 1" },
      { l: "Identity", r: "f(z) = z; used in regression output layers" }
    ],
    ti_ar: "مطابقة: دوال التنشيط في الشبكات العصبية",
    p_ar: [
      { l: "دالة ReLU", r: "f(z) = max(0, z)؛ خطية للقيم الموجبة وصفر للقيم السالبة" },
      { l: "دالة السيجمويد (Sigmoid)", r: "σ(z) = 1 / (1 + e⁻ᶻ)؛ تحصر القيم داخل الفترة (0, 1)" },
      { l: "دالة سوفت ماكس (Softmax)", r: "تحول القيم إلى توزيع احتمالي معياري مجموعه 1" },
      { l: "الدالة المطابقة (Identity)", r: "f(z) = z؛ تُستخدم في طبقة المخرجات لمهام الانحدار" }
    ]
  }
];

// 3. ai-gradient-descent
D['ai-gradient-descent'] = [
  {
    t: "qc",
    ti: "Quick Check: Direction of the Gradient Vector",
    q: "In multivariable calculus, in which direction does the gradient vector ∇L(w) point?",
    o: [
      "In the direction of steepest increase of the loss function",
      "In the direction of steepest decrease of the loss function",
      "Perpendicular to the contours, pointing strictly towards zero",
      "Along the tangent line where the derivative is always zero"
    ],
    a: 0,
    ex: "The gradient ∇L points in the direction of maximum ascent (steepest increase). Therefore, to minimize loss, Gradient Descent updates parameters in the OPPOSITE direction: w ← w - η ∇L.",
    ti_ar: "فحص سريع: اتجاه متجه التدرج (Gradient Vector)",
    q_ar: "في التفاضل متعدد المتغيرات، إلى أي اتجاه يشير متجه التدرج ∇L(w)؟",
    o_ar: [
      "في اتجاه أسرع زيادة (أقصى صعود) لدالة الخسارة",
      "في اتجاه أسرع انخفاض (أقصى هبوط) لدالة الخسارة",
      "عمودياً على خطوط الكنتور متجهاً نحو الصفر دائماً",
      "على طول المماس حيث المشتقة تساوي صفراً دائماً"
    ],
    ex_ar: "يشير متجه التدرج ∇L دائماً إلى اتجاه أقصى زيادة. لذلك، لتقليل الخسارة في خوارزمية الانحدار التدريجي، نتحرك في الاتجاه المعاكس: w ← w - η ∇L."
  },
  {
    t: "tf",
    ti: "True / False: Gradient Descent & Learning Rates",
    items: [
      {
        s: "If the learning rate η is excessively large, gradient descent can overshoot and diverge.",
        a: true
      },
      {
        s: "At a local or global minimum of a smooth loss function, the gradient vector is equal to zero (∇L = 0).",
        a: true
      },
      {
        s: "Mean Squared Error (MSE) for linear regression is a non-convex function with multiple local minima.",
        a: false
      }
    ],
    ti_ar: "صح / خطأ: الانحدار التدريجي ومعدل التعلم",
    items_ar: [
      {
        s: "إذا كان معدل التعلم η كبيراً بشكل مفرط، فإن الانحدار التدريجي قد يتجاوز الهدف ويتباعد.",
        a: true
      },
      {
        s: "عند النقطة الصغرى المحلية أو العامة لدالة خسارة ملساء، يكون متجه التدرج مساوياً للصفر (∇L = 0).",
        a: true
      },
      {
        s: "دالة متوسط مربعات الخطأ (MSE) للانحدار الخطي هي دالة غير محدبة تمتلك نقاطاً صغرى محلية متعددة.",
        a: false
      }
    ]
  }
];

// 4. ai-probability-bayes
D['ai-probability-bayes'] = [
  {
    t: "qc",
    ti: "Quick Check: Components of Bayes' Theorem",
    q: "In the Bayesian formula P(θ | D) = P(D | θ) P(θ) / P(D), what is the term P(θ) called?",
    o: [
      "Prior probability (belief before observing data)",
      "Likelihood (probability of data given parameters)",
      "Posterior probability (updated belief after observing data)",
      "Marginal evidence (normalizing constant)"
    ],
    a: 0,
    ex: "P(θ) is the Prior (knowledge/belief prior to evidence), P(D|θ) is the Likelihood, P(D) is the Evidence, and P(θ|D) is the Posterior.",
    ti_ar: "فحص سريع: مكونات مبرهنة بايز",
    q_ar: "في صيغة بايز P(θ | D) = P(D | θ) P(θ) / P(D)، ماذا يُسمى الحد P(θ)؟",
    o_ar: [
      "الاحتمال القبلي (المعتقد المسبق قبل رصد البيانات)",
      "الاحتمال الإمكاني (Likelihood - إمكانية ظهور البيانات في ظل المعلمات)",
      "الاحتمال البعدي (المعتقد المحدَّث بعد رصد البيانات)",
      "الدليل الإجمالي (ثابت المعايرة)"
    ],
    ex_ar: "الحد P(θ) هو الاحتمال القبلي (Prior)، و P(D|θ) هو الإمكانية (Likelihood)، و P(θ|D) هو الاحتمال البعدي (Posterior)."
  },
  {
    t: "mt",
    ti: "Matching: Bayesian Terminology",
    p: [
      { l: "Prior P(C)", r: "Baseline probability of a category before seeing features" },
      { l: "Likelihood P(x|C)", r: "Probability that a category produces the observed features" },
      { l: "Posterior P(C|x)", r: "Updated classification probability given observed features" },
      { l: "Evidence P(x)", r: "Total probability of the features across all categories" }
    ],
    ti_ar: "مطابقة: مصطلحات الاستدلال البايزي",
    p_ar: [
      { l: "الاحتمال القبلي P(C)", r: "الاحتمال الأساسي للفئة قبل رؤية الخصائص والملاحظات" },
      { l: "الاحتمال الإمكاني P(x|C)", r: "احتمال أن تنتج الفئة الخصائص المرصودة المحددة" },
      { l: "الاحتمال البعدي P(C|x)", r: "احتمال التصنيف المحدث بعد مشاهدة الخصائص" },
      { l: "الدليل الإجمالي P(x)", r: "المجموع الكلي لاحتمال ظهور الخصائص عبر جميع الفئات" }
    ]
  }
];

// 5. ai-distributions-mle
D['ai-distributions-mle'] = [
  {
    t: "qc",
    ti: "Quick Check: Log-Likelihood vs Likelihood",
    q: "Why do machine learning algorithms maximize the Log-Likelihood ln L(θ) instead of the original Likelihood product L(θ)?",
    o: [
      "Logarithm converts products into sums, preventing numerical underflow and simplifying derivatives",
      "Logarithm changes the location of the maximum to make it easier to reach",
      "Logarithm makes negative probabilities positive",
      "Likelihood functions cannot be differentiated without taking logarithms first"
    ],
    a: 0,
    ex: "Because probabilities are numbers in [0, 1], multiplying thousands of them causes floating-point underflow (rounds to 0). The logarithm is strictly monotonically increasing, so argmax ln L(θ) = argmax L(θ), and converts products into sums.",
    ti_ar: "فحص سريع: لوغاريتم الإمكانية مقابل دالة الإمكانية",
    q_ar: "لماذا تقوم خوارزميات تعلم الآلة بتعظيم لوغاريتم الإمكانية ln L(θ) بدلاً من حاصل ضرب الإمكانية الأصلي L(θ)؟",
    o_ar: [
      "لأن اللوغاريتم يحول حاصل الضرب إلى جمع، مما يمنع التلاشي الرقمي ويبسط المشتقات",
      "لأن اللوغاريتم يغير موقع النقطة العظمى لتسهيل الوصول إليها",
      "لأن اللوغاريتم يحول الاحتمالات السالبة إلى موجبة",
      "لأنه لا يمكن اشتقاق دوال الإمكانية دون أخذ اللوغاريتم أولاً"
    ],
    ex_ar: "لأن الاحتمالات أعداد بين 0 و 1، وضرب الآلاف منها يؤدي إلى التلاشي الرقمي الصغير (underflow). وبما أن اللوغاريتم دالة تزايدية تماماً، فإن موضع النقطة العظمى لا يتغير، وتتحول عمليات الضرب المعقدة إلى عمليات جمع يسيرة الاشتقاق."
  },
  {
    t: "tf",
    ti: "True / False: Gaussian Distribution & MLE",
    items: [
      {
        s: "The Maximum Likelihood Estimator (MLE) for the mean of a Gaussian distribution is the sample arithmetic mean.",
        a: true
      },
      {
        s: "The normal distribution curve is symmetric around its mean μ.",
        a: true
      },
      {
        s: "Maximizing the log-likelihood of a Gaussian with fixed variance is mathematically equivalent to minimizing the Sum of Squared Errors.",
        a: true
      }
    ],
    ti_ar: "صح / خطأ: التوزيع الطبيعي وتقدير الإمكان الأقصى",
    items_ar: [
      {
        s: "مقدّر الإمكان الأقصى (MLE) لمتوسط التوزيع الطبيعي هو الوسط الحسابي للعينات المرصودة.",
        a: true
      },
      {
        s: "منحنى التوزيع الطبيعي (الجرس) متماثل تماماً حول وسطه الحسابي μ.",
        a: true
      },
      {
        s: "تعظيم لوغاريتم الإمكانية لتوزيع طبيعي بتباين ثابت يكافئ رياضياً تصغير مجموع مربعات الخطأ.",
        a: true
      }
    ]
  }
];

// 6. ai-linear-regression
D['ai-linear-regression'] = [
  {
    t: "qc",
    ti: "Quick Check: The Normal Equation",
    q: "What is the closed-form matrix solution for the optimal weights w in Ordinary Least Squares (OLS) regression?",
    o: [
      "w = (XᵀX)⁻¹ Xᵀ y",
      "w = Xᵀ y (XᵀX)⁻¹",
      "w = (X Xᵀ)⁻¹ X y",
      "w = X⁻¹ y"
    ],
    a: 0,
    ex: "Setting the gradient of ||y - Xw||² with respect to w to zero gives: -2Xᵀ(y - Xw) = 0 ⟹ XᵀX w = Xᵀy ⟹ w = (XᵀX)⁻¹ Xᵀ y.",
    ti_ar: "فحص سريع: المعادلة الطبيعية في الانحدار الخطي",
    q_ar: "ما الحل المصفوفي المغلق للأوزان المثلى w في نموذج المربعات الصغرى العادية (OLS)؟",
    o_ar: [
      "w = (XᵀX)⁻¹ Xᵀ y",
      "w = Xᵀ y (XᵀX)⁻¹",
      "w = (X Xᵀ)⁻¹ X y",
      "w = X⁻¹ y"
    ],
    ex_ar: "بمساواة مشتقة مجموع مربعات الخطأ بالصفر بالنسبة لـ w: نجد أن XᵀX w = Xᵀy، وبالتالي w = (XᵀX)⁻¹ Xᵀ y."
  },
  {
    t: "mt",
    ti: "Matching: Regression Metrics",
    p: [
      { l: "R² Score", r: "Proportion of target variance explained by the model (0 to 1)" },
      { l: "MSE", r: "Average of the squared differences between predictions and actuals" },
      { l: "Residual e", r: "The difference between observed y and predicted ŷ" },
      { l: "Overfitting", r: "Model memorizes noise and fails to generalize to unseen test data" }
    ],
    ti_ar: "مطابقة: مقاييس جودة الانحدار",
    p_ar: [
      { l: "معامل التحديد R²", r: "نسبة التباين في المتغير التابع المفسرة بواسطة النموذج (من 0 إلى 1)" },
      { l: "متوسط مربعات الخطأ MSE", r: "متوسط مربعات الفروق بين التوقعات والقيم الفعلية" },
      { l: "الباقي (Residual e)", r: "الفرق بين القيمة الحقيقية y والقيمة المتوقعة ŷ" },
      { l: "فرط التخصيص (Overfitting)", r: "حفظ النموذج للضوضاء في بيانات التدريب وفشله في التعميم" }
    ]
  }
];

// 7. ai-logistic-regression
D['ai-logistic-regression'] = [
  {
    t: "qc",
    ti: "Quick Check: Sigmoid Activation Function",
    q: "If the logit z = wᵀx + b is equal to 0, what is the output probability σ(z) produced by the Sigmoid function?",
    o: [
      "0.5",
      "0.0",
      "1.0",
      "Undefined"
    ],
    a: 0,
    ex: "σ(0) = 1 / (1 + e⁰) = 1 / (1 + 1) = 0.5. A logit of 0 corresponds exactly to the 50/50 decision threshold.",
    ti_ar: "فحص سريع: دالة التنشيط اللوجستية (السيجمويد)",
    q_ar: "إذا كانت قيمة z = wᵀx + b مساوية للصفر، فما الاحتمال الناتج من دالة السيجمويد σ(z)؟",
    o_ar: [
      "0.5",
      "0.0",
      "1.0",
      "غير معرف"
    ],
    ex_ar: "σ(0) = 1 / (1 + e⁰) = 1 / (1 + 1) = 0.5. القيمة z=0 تمثل عتبة القرار الفاصلة بنسبة 50%."
  },
  {
    t: "tf",
    ti: "True / False: Binary Cross-Entropy Loss",
    items: [
      {
        s: "If true label y = 1 and predicted probability ŷ = 0.99, the binary cross-entropy loss is near 0.",
        a: true
      },
      {
        s: "The decision boundary in standard logistic regression is linear (a straight line or hyperplane).",
        a: true
      },
      {
        s: "Logistic regression uses Mean Squared Error (MSE) because it creates a perfectly convex loss surface.",
        a: false
      }
    ],
    ti_ar: "صح / خطأ: دالة خسارة الإنتروبيا المتقاطعة (Cross-Entropy)",
    items_ar: [
      {
        s: "إذا كانت التسمية الفعلية y = 1 والاحتمال المتوقع ŷ = 0.99، فإن خسارة الإنتروبيا تكون قريبة جداً من الصفر.",
        a: true
      },
      {
        s: "الحد الفاصل للقرار في الانحدار اللوجستي القياسي هو حد خطي (مستقيم أو مستوى فائق).",
        a: true
      },
      {
        s: "يستخدم الانحدار اللوجستي دالة MSE لأنها تولد سطح خسارة محدب تماماً.",
        a: false
      }
    ]
  }
];

// 8. ai-pca-dimensionality
D['ai-pca-dimensionality'] = [
  {
    t: "qc",
    ti: "Quick Check: Principal Component Analysis (PCA)",
    q: "In Principal Component Analysis (PCA), which direction does the first principal component vector represent?",
    o: [
      "The direction along which the data exhibits the maximum variance",
      "The direction with the smallest spread to minimize outlier effects",
      "The axis that passes through the origin perpendicular to all points",
      "The average vector of all feature dimensions"
    ],
    a: 0,
    ex: "PCA seeks the orthogonal axis that maximizes the variance of the projected data points. The first principal component corresponds to the eigenvector with the largest eigenvalue.",
    ti_ar: "فحص سريع: تحليل المكونات الرئيسية (PCA)",
    q_ar: "في تحليل المكونات الرئيسية (PCA)، ما الاتجاه الذي يمثله متجه المكون الرئيسي الأول؟",
    o_ar: [
      "الاتجاه الذي يُظهر فيه توزيع البيانات أقصى تباين (أكبر انتشار)",
      "الاتجاه صاحب أقل تشتت لتقليل تأثير القيم الشاذة",
      "المحور المار بنقطة الأصل عمودياً على جميع النقاط",
      "متجه المتوسط الحسابي لجميع أبعاد الخصائص"
    ],
    ex_ar: "يبحث PCA عن المحور المتعامد الذي يعظم تباين البيانات المسقطة عليه. والمكون الأول يناظر المتجه الذاتي المقترن بأكبر قيمة ذاتية لمصفوفة التباين المشترك."
  },
  {
    t: "mt",
    ti: "Matching: Spectral Concepts in PCA",
    p: [
      { l: "Covariance Matrix Σ", r: "Measures pairwise linear relationships and feature variances" },
      { l: "Eigenvector", r: "Direction that remains invariant up to scalar scaling under transformation" },
      { l: "Eigenvalue λ", r: "Magnitude of variance explained along the corresponding eigenvector axis" },
      { l: "Explained Variance Ratio", r: "λᵢ / ∑ λ; proportion of total information preserved by component i" }
    ],
    ti_ar: "مطابقة: مفاهيم الجبر الطيفي في تحليل PCA",
    p_ar: [
      { l: "مصفوفة التباين المشترك Σ", r: "تقيس العلاقات الخطية الثنائية وتباين الخصائص" },
      { l: "المتجه الذاتي (Eigenvector)", r: "الاتجاه الذي يحافظ على اتجاهه الثابت عند التحويل الخطي" },
      { l: "القيمة الذاتية (Eigenvalue λ)", r: "مقدار التباين المفسر على طول محور المتجه الذاتي المقترن بها" },
      { l: "نسبة التباين المفسرة", r: "λᵢ / ∑ λ؛ نسبة المعلومات الكلية المحفوظة بواسطة المكون i" }
    ]
  }
];

// Write file
const code = `/* Interactive Practice data for /mathai/ - one entry per chapter section id.
   Shipped as public/js/ix/mathai.js and loaded only on that track's page by the
   engine in src/scripts/modules/19-interactive-activities-engine-v1.js
   (Plan 5 Phase 5.015, ADR 0033). */
(window.__ixData = window.__ixData || []).push(function (D) {
${Object.entries(D).map(([k, v]) => `D['${k}'] = ${JSON.stringify(v, null, 2)};`).join('\n\n')}
});
`;

fs.writeFileSync(OUT_FILE, code, 'utf8');
console.log(`✅ Generated src/scripts/ix-data/mathai.js with ${Object.keys(D).length} chapters.`);
