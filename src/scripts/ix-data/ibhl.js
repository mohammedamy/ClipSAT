/* Interactive Practice data for /ibhl/ - one entry per chapter section id.
   Shipped as public/js/ix/ibhl.js and loaded only on that track's page by the
   engine in src/scripts/modules/19-interactive-activities-engine-v1.js
   (Plan 5 Phase 5.015, ADR 0033). Entry shapes (qc/mt/tf/sb/sr/fn/num/ord/cat) are
   documented there. */
(window.__ixData = window.__ixData || []).push(function (D) {

D['ibhl-overview'] = [
  {
    t: 'qc',
    ti: 'Quick Check: IB Math Analysis & Approaches HL Assessment',
    q: 'Which three written examination papers comprise the external assessment for IB AA HL?',
    o: [
      'Paper 1 (non-calc, 2 hr), Paper 2 (calc, 2 hr), and Paper 3 (investigative problem solving, 1 hr)',
      'Paper 1 and Paper 2 only (both calculator allowed)',
      'Paper 1 (multiple choice) and Paper 2 (extended response)',
      'Paper 1 (1 hr) and Paper 2 (3 hr)'
    ],
    a: 0,
    ex: 'IB AA HL external assessment has Paper 1 (no calculator, 110 marks, 2 hours), Paper 2 (graphic display calculator required, 110 marks, 2 hours), and Paper 3 (extended problem-solving / proof investigation, 55 marks, 1 hour).'
  },
  {
    t: 'tf',
    ti: 'Reasoning Lab: IB HL Assessment Rules',
    items: [
      { s: 'A graphic display calculator (GDC) is allowed on Paper 1 of the IB AA HL exam.', a: false, ex: 'Paper 1 strictly prohibits calculators.' },
      { s: 'Final non-exact answers must be rounded to exactly 3 significant figures unless otherwise stated.', a: true, ex: 'The IB standard requires 3 s.f. for non-exact values.' },
      { s: 'The Internal Assessment exploration contributes 20% of the overall final grade.', a: true, ex: 'The individual IA mathematical exploration accounts for 20%.' }
    ]
  },
  {
    t: 'num',
    ti: 'Scoring Lab: IB HL Final Percentage Calculation',
    q: 'A student scores 88/110 on Paper 1 (30% weight), 88/110 on Paper 2 (30% weight), 44/55 on Paper 3 (20% weight), and 16/20 on the IA (20% weight). What is the student\'s overall percentage score?',
    a: 80,
    tol: 0.1,
    unit: '%',
    h: 'Notice that each component score is 80% (88/110 = 0.80, 44/55 = 0.80, 16/20 = 0.80).',
    sol: '\\(0.30(80) + 0.30(80) + 0.20(80) + 0.20(80) = 80\\%\\).'
  },
  {
    t: 'ord',
    ti: 'Investigation Protocol: Paper 3 Problem-Solving Workflow',
    q: 'Order the steps for approaching an unfamiliar extended investigation question on Paper 3:',
    items: [
      'Read the introductory scenario and identify the newly introduced definitions and notation.',
      'Work through initial introductory parts to verify simple baseline test cases and patterns.',
      'Formulate conjectures and connect earlier results using "Hence" directives for general cases.',
      'Construct rigorous algebraic proofs using induction, calculus, or matrix transformations.',
      'Reflect on the mathematical limits and domain constraints of the proven model.'
    ]
  },
  {
    t: 'cat',
    ti: 'Classify Syllabus Topics by Course Stream',
    categories: ['Analysis & Approaches HL (AA)', 'Applications & Interpretation HL (AI)'],
    items: [
      { s: 'Formal proof by contradiction and induction', cat: 0 },
      { s: 'Transition matrices and Markov chain steady states', cat: 1 },
      { s: 'Partial fraction decompositions and integration by parts twice', cat: 0 },
      { s: 'Kruskal\'s and Prim\'s minimum spanning tree algorithms', cat: 1 },
      { s: 'Maclaurin series expansions and convergence radius', cat: 0 },
      { s: 'Coupled differential equations and phase portraits', cat: 1 }
    ]
  }
];

D['ibhl-t1'] = [
  {
    t: 'qc',
    ti: 'Quick Check: Modulus and Argument of Complex Numbers',
    q: 'What is the modulus of the complex number \\(z = 5 - 12i\\)?',
    o: ['13', '17', '7', '\\(\\sqrt{119}\\)'],
    a: 0,
    ex: '\\(|z| = \\sqrt{5^2 + (-12)^2} = \\sqrt{25 + 144} = \\sqrt{169} = 13\\).'
  },
  {
    t: 'tf',
    ti: 'Reasoning Lab: Complex Numbers & De Moivre\'s Theorem',
    items: [
      { s: 'For any complex numbers \\(z_1, z_2\\), \\(|z_1 z_2| = |z_1||z_2|\\).', a: true, ex: 'The modulus of a product equals the product of the moduli.' },
      { s: '\\(\\arg(z_1 / z_2) = \\arg(z_1) + \\arg(z_2)\\).', a: false, ex: 'The argument of a quotient is \\(\\arg(z_1) - \\arg(z_2)\\).' },
      { s: 'According to De Moivre\'s theorem, \\((\\cos\\theta + i\\sin\\theta)^n = \\cos(n\\theta) + i\\sin(n\\theta)\\) for all integer \\(n\\).', a: true, ex: 'De Moivre\'s theorem holds for all integers.' }
    ]
  },
  {
    t: 'num',
    ti: 'Calculation Lab: Complex Root Modulus',
    q: 'If \\(z^4 = -16\\), what is the modulus \\(|z|\\) of each of the 4 complex roots?',
    a: 2,
    tol: 0.01,
    h: 'Take the fourth root of \\(|-16| = 16\\).',
    sol: '\\(|z|^4 = |-16| = 16 \\implies |z| = 16^{1/4} = 2\\).'
  },
  {
    t: 'ord',
    ti: 'Proof Protocol: Mathematical Induction Workflow',
    q: 'Arrange the sequence of steps for proving a proposition \\(P(n)\\) by mathematical induction for all \\(n \\in \\mathbb{Z}^+\\):',
    items: [
      'State the proposition \\(P(n)\\) clearly for integers \\(n \\ge 1\\).',
      'Verify the base step: evaluate LHS and RHS for \\(n = 1\\) and show \\(P(1)\\) is true.',
      'State the induction hypothesis: assume \\(P(k)\\) is true for an integer \\(k \\ge 1\\).',
      'Express \\(P(k+1)\\) and algebraically simplify using the assumption to establish \\(P(k+1)\\).',
      'Conclude: since \\(P(1)\\) is true and \\(P(k) \\implies P(k+1)\\), \\(P(n)\\) is true for all \\(n \\in \\mathbb{Z}^+\\) by PMI.'
    ]
  },
  {
    t: 'cat',
    ti: 'Classify Complex Number Expressions by Representation Form',
    categories: ['Cartesian Form (x + iy)', 'Polar Form (r cis θ)', 'Euler Exponential Form (r e^{iθ})'],
    items: [
      { s: '\\(3 - 4i\\)', cat: 0 },
      { s: '\\(2\\left(\\cos\\frac{\\pi}{3} + i\\sin\\frac{\\pi}{3}\\right)\\)', cat: 1 },
      { s: '\\(5e^{i\\pi/4}\\)', cat: 2 },
      { s: '\\(-\\sqrt{3} + i\\)', cat: 0 },
      { s: '\\(4\\operatorname{cis}\\left(-\\frac{\\pi}{6}\\right)\\)', cat: 1 },
      { s: '\\(\\sqrt{2}e^{-i\\pi/2}\\)', cat: 2 }
    ]
  }
];

D['ibhl-t2'] = [
  {
    t: 'qc',
    ti: 'Quick Check: Modulus Function Equation',
    q: 'How many real solutions exist for the equation \\(|2x - 3| = -5\\)?',
    o: ['0', '1', '2', 'Infinitely many'],
    a: 0,
    ex: 'The absolute value of any real expression is non-negative (\\(\\ge 0\\)), so it can never equal \\(-5\\).'
  },
  {
    t: 'tf',
    ti: 'Reasoning Lab: Inverse Functions and Composite Properties',
    items: [
      { s: 'A function \\(f(x)\\) has an inverse function \\(f^{-1}(x)\\) if and only if \\(f\\) is bijective (one-to-one and onto).', a: true, ex: 'A unique inverse requires injectivity and surjectivity.' },
      { s: 'The graph of \\(y = f^{-1}(x)\\) is a reflection of \\(y = f(x)\\) in the line \\(y = -x\\).', a: false, ex: 'The reflection is across the line \\(y = x\\).' },
      { s: 'The domain of \\(f^{-1}\\) is equal to the range of \\(f\\).', a: true, ex: 'Input and output sets are swapped for inverse functions.' }
    ]
  },
  {
    t: 'num',
    ti: 'Calculation Lab: Solving a Modulus Equation',
    q: 'Find the positive value of \\(x\\) satisfying \\(|3x - 6| = 12\\).',
    a: 6,
    tol: 0.01,
    h: 'Split into two linear equations: \\(3x - 6 = 12\\) or \\(3x - 6 = -12\\).',
    sol: '\\(3x - 6 = 12 \\implies 3x = 18 \\implies x = 6\\). (The negative root is \\(x = -2\\)).'
  },
  {
    t: 'ord',
    ti: 'Algebra Protocol: Finding the Inverse Function of a Rational Function',
    q: 'Arrange the steps for finding the inverse of \\(f(x) = \\dfrac{2x + 1}{x - 3}\\):',
    items: [
      'Replace \\(f(x)\\) with \\(y\\): \\(y = \\dfrac{2x + 1}{x - 3}\\).',
      'Interchange variables \\(x\\) and \\(y\\): \\(x = \\dfrac{2y + 1}{y - 3}\\).',
      'Multiply both sides by \\((y - 3)\\) to clear the denominator: \\(x(y - 3) = 2y + 1\\).',
      'Collect all terms containing \\(y\\) on one side: \\(xy - 2y = 3x + 1\\).',
      'Factor out \\(y\\) and divide to solve for \\(f^{-1}(x) = \\dfrac{3x + 1}{x - 2}\\).'
    ]
  },
  {
    t: 'cat',
    ti: 'Classify Function Transformations',
    categories: ['Horizontal Transformation', 'Vertical Transformation'],
    items: [
      { s: '\\(y = f(x - 4)\\) (Shift right by 4 units)', cat: 0 },
      { s: '\\(y = f(x) + 5\\) (Shift upward by 5 units)', cat: 1 },
      { s: '\\(y = f(2x)\\) (Compress horizontally by factor of 1/2)', cat: 0 },
      { s: '\\(y = 3f(x)\\) (Stretch vertically by factor of 3)', cat: 1 },
      { s: '\\(y = f(-x)\\) (Reflection across the y-axis)', cat: 0 },
      { s: '\\(y = -f(x)\\) (Reflection across the x-axis)', cat: 1 }
    ]
  }
];

D['ibhl-t3'] = [
  {
    t: 'qc',
    ti: 'Quick Check: Vector Cross Product Properties',
    q: 'If \\(\\mathbf{a}\\) and \\(\\mathbf{b}\\) are non-zero vectors such that \\(\\mathbf{a} \\times \\mathbf{b} = \\mathbf{0}\\), what does this indicate about the vectors?',
    o: ['They are parallel (collinear)', 'They are perpendicular (orthogonal)', 'Their dot product is zero', 'One vector has unit length'],
    a: 0,
    ex: '\\(|\\mathbf{a} \\times \\mathbf{b}| = |\\mathbf{a}||\\mathbf{b}|\\sin\\theta = 0 \\implies \\sin\\theta = 0 \\implies \\theta = 0^\\circ\\text{ or }180^\\circ\\) (parallel).'
  },
  {
    t: 'tf',
    ti: 'Reasoning Lab: Vector Operations in 3D',
    items: [
      { s: 'The scalar product \\(\\mathbf{a} \\cdot \\mathbf{b}\\) is commutative (\\(\\mathbf{a} \\cdot \\mathbf{b} = \\mathbf{b} \\cdot \\mathbf{a}\\)).', a: true, ex: 'Dot product is commutative.' },
      { s: 'The vector product \\(\\mathbf{a} \\times \\mathbf{b}\\) is commutative.', a: false, ex: 'Cross product is anti-commutative: \\(\\mathbf{a} \\times \\mathbf{b} = -(\\mathbf{b} \\times \\mathbf{a})\\).' },
      { s: 'A vector normal to the plane \\(3x - 4y + 2z = 9\\) is \\(\\mathbf{n} = (3, -4, 2)\\).', a: true, ex: 'Cartesian coefficients form the normal vector.' }
    ]
  },
  {
    t: 'num',
    ti: 'Calculation Lab: Calculating the Scalar Dot Product',
    q: 'Find the scalar product \\(\\mathbf{u} \\cdot \\mathbf{v}\\) for vectors \\(\\mathbf{u} = (2, -3, 5)\\) and \\(\\mathbf{v} = (4, 1, -2)\\).',
    a: -5,
    tol: 0.01,
    h: 'Multiply corresponding components and sum: \\(u_1 v_1 + u_2 v_2 + u_3 v_3\\).',
    sol: '\\(2(4) + (-3)(1) + 5(-2) = 8 - 3 - 10 = -5\\).'
  },
  {
    t: 'ord',
    ti: 'Geometry Protocol: Distance from a Point to a Plane Calculation',
    q: 'Order the steps to find the perpendicular distance from point \\(P(x_0, y_0, z_0)\\) to the plane \\(ax + by + cz = d\\):',
    items: [
      'Write the Cartesian equation of the plane in the form \\(ax + by + cz - d = 0\\).',
      'Extract the normal vector \\(\\mathbf{n} = (a, b, c)\\) from the coefficients.',
      'Calculate the length of the normal vector: \\(|\\mathbf{n}| = \\sqrt{a^2 + b^2 + c^2}\\).',
      'Substitute the coordinates of point \\(P\\) into \\(|a x_0 + b y_0 + c z_0 - d|\\).',
      'Divide the absolute numerator by \\(|\\mathbf{n}|\\) to obtain the perpendicular distance.'
    ]
  },
  {
    t: 'cat',
    ti: 'Classify Vector and Matrix Operations',
    categories: ['Produces a Scalar', 'Produces a Vector'],
    items: [
      { s: 'Scalar dot product \\(\\mathbf{a} \\cdot \\mathbf{b}\\)', cat: 0 },
      { s: 'Vector cross product \\(\\mathbf{a} \\times \\mathbf{b}\\)', cat: 1 },
      { s: 'Magnitude of a vector \\(|\\mathbf{v}|\\)', cat: 0 },
      { s: 'Scalar multiplication \\(k\\mathbf{v}\\)', cat: 1 },
      { s: 'Projection scalar component \\(\\mathbf{a} \\cdot \\hat{\\mathbf{b}}\\)', cat: 0 },
      { s: 'Normal vector to two non-parallel vectors', cat: 1 }
    ]
  }
];

D['ibhl-t4'] = [
  {
    t: 'qc',
    ti: 'Quick Check: Poisson Distribution Mean & Variance',
    q: 'For a random variable \\(X \\sim \\operatorname{Po}(4.5)\\), what is the variance \\(\\operatorname{Var}(X)\\)?',
    o: ['4.5', '2.12', '20.25', '9.0'],
    a: 0,
    ex: 'For any Poisson distribution \\(\\operatorname{Po}(\\lambda)\\), the mean and variance are identical: \\(E(X) = \\operatorname{Var}(X) = \\lambda = 4.5\\).'
  },
  {
    t: 'tf',
    ti: 'Reasoning Lab: Inference and Estimators',
    items: [
      { s: 'The sample variance \\(s^2 = \\frac{1}{n-1}\\sum (x_i - \\bar{x})^2\\) is an unbiased estimator of the population variance \\(\\sigma^2\\).', a: true, ex: 'Dividing by \\(n-1\\) removes the bias.' },
      { s: 'A Type I error occurs when a true null hypothesis is rejected.', a: true, ex: 'Type I error is false positive (rejecting true H₀).' },
      { s: 'Increasing the sample size \\(n\\) increases the width of a 95% confidence interval.', a: false, ex: 'Larger sample size decreases standard error \\(\\sigma/\\sqrt{n}\\), narrowing the interval.' }
    ]
  },
  {
    t: 'num',
    ti: 'Calculation Lab: Poisson Probability Calculation',
    q: 'If calls arrive at an exchange at an average rate of \\(\\lambda = 2\\) per minute, what is the exact probability of receiving zero calls in a minute, to 3 decimal places? (Use \\(e^{-2} \\approx 0.1353\\))',
    a: 0.135,
    tol: 0.005,
    h: 'Use the Poisson formula \\(P(X = k) = \\dfrac{e^{-\\lambda}\\lambda^k}{k!}\\) with \\(k = 0\\).',
    sol: '\\(P(X = 0) = \\dfrac{e^{-2} \\cdot 2^0}{0!} = e^{-2} \\approx 0.135\\).'
  },
  {
    t: 'ord',
    ti: 'Inference Protocol: Hypothesis Testing Procedure',
    q: 'Order the steps required to execute a formal statistical hypothesis test:',
    items: [
      'State the null hypothesis \\(H_0\\) and alternative hypothesis \\(H_1\\) with population parameters.',
      'Specify the significance level \\(\\alpha\\) and identify the appropriate test distribution (z, t, or \\(\\chi^2\\)).',
      'Calculate the test statistic and corresponding p-value from sample data.',
      'Compare the p-value with \\(\\alpha\\) (reject \\(H_0\\) if \\(p < \\alpha\\)).',
      'State the final conclusion in the context of the original real-world scenario.'
    ]
  },
  {
    t: 'cat',
    ti: 'Classify Probability Distributions',
    categories: ['Discrete Distribution', 'Continuous Distribution'],
    items: [
      { s: 'Poisson distribution \\(\\operatorname{Po}(\\lambda)\\)', cat: 0 },
      { s: 'Normal distribution \\(N(\\mu, \\sigma^2)\\)', cat: 1 },
      { s: 'Binomial distribution \\(B(n, p)\\)', cat: 0 },
      { s: 'Student\'s t-distribution \\(t_\\nu\\)', cat: 1 },
      { s: 'Geometric distribution', cat: 0 },
      { s: 'Continuous uniform distribution \\(U(a, b)\\)', cat: 1 }
    ]
  }
];

D['ibhl-t5'] = [
  {
    t: 'qc',
    ti: 'Quick Check: Integration by Parts Choice of u',
    q: 'When integrating \\(\\int x^3 \\ln x \\, dx\\) using integration by parts, which choice of \\(u\\) is recommended by the LIATE rule?',
    o: ['\\(u = \\ln x\\)', '\\(u = x^3\\)', '\\(u = x^3 \\ln x\\)', '\\(u = x\\)'],
    a: 0,
    ex: 'In LIATE (Logarithmic, Inverse trig, Algebraic, Trig, Exponential), Logarithmic comes before Algebraic, so set \\(u = \\ln x\\) and \\(dv = x^3 dx\\).'
  },
  {
    t: 'tf',
    ti: 'Reasoning Lab: Differential Equations and Series',
    items: [
      { s: 'An integrating factor for \\(\\frac{dy}{dx} + P(x)y = Q(x)\\) is \\(I(x) = e^{\\int P(x) dx}\\).', a: true, ex: 'Multiplying through by \\(e^{\\int P(x)dx}\\) yields \\(\\frac{d}{dx}[y \\cdot I(x)] = Q(x) I(x)\\).' },
      { s: 'The Maclaurin series for \\(\\cos x\\) contains only odd powers of \\(x\\).', a: false, ex: '\\(\\cos x\\) is an even function, so its Maclaurin series contains only even powers: \\(1 - \\frac{x^2}{2!} + \\frac{x^4}{4!} - \\cdots\\).' },
      { s: 'The constant of integration \\(C\\) must be added as soon as the integrals are evaluated.', a: true, ex: 'Adding \\(C\\) after exponentiating in separable DEs is a severe algebraic error.' }
    ]
  },
  {
    t: 'num',
    ti: 'Calculation Lab: Definite Integral via Integration by Parts',
    q: 'Evaluate the definite integral \\(\\displaystyle\\int_0^1 x e^x \\, dx\\). (Recall \\(\\int x e^x dx = x e^x - e^x + C\\)).',
    a: 1,
    tol: 0.01,
    h: 'Evaluate \\([x e^x - e^x]_0^1 = (1e^1 - e^1) - (0 - e^0)\\).',
    sol: '\\((e - e) - (0 - 1) = 0 - (-1) = 1\\).'
  },
  {
    t: 'ord',
    ti: 'Calculus Protocol: Solving First-Order Linear DEs via Integrating Factor',
    q: 'Arrange the steps for solving \\(\\dfrac{dy}{dx} + P(x)y = Q(x)\\):',
    items: [
      'Ensure the differential equation is in standard linear form with coefficient 1 for \\(\\frac{dy}{dx}\\).',
      'Compute the integrating factor: \\(I(x) = e^{\\int P(x)\\,dx}\\).',
      'Multiply every term of the differential equation by \\(I(x)\\).',
      'Recognize the LHS as the derivative of a product: \\(\\frac{d}{dx}[y \\cdot I(x)] = Q(x) I(x)\\).',
      'Integrate both sides with respect to \\(x\\) and divide by \\(I(x)\\) to isolate \\(y\\).'
    ]
  },
  {
    t: 'cat',
    ti: 'Classify Differential Equations by Type',
    categories: ['Separable DE', 'Linear First-Order (Integrating Factor)'],
    items: [
      { s: '\\(\\dfrac{dy}{dx} = \\dfrac{x}{y}\\)', cat: 0 },
      { s: '\\(\\dfrac{dy}{dx} + 2y = e^{-x}\\)', cat: 1 },
      { s: '\\(\\dfrac{dy}{dx} = 3x^2 y\\)', cat: 0 },
      { s: '\\(\\dfrac{dy}{dx} + \\dfrac{1}{x}y = x^2\\)', cat: 1 },
      { s: '\\((1+x^2)\\,dy = y\\,dx\\)', cat: 0 },
      { s: '\\(\\dfrac{dy}{dx} - 3y = \\cos x\\)', cat: 1 }
    ]
  }
];

D['ibhl-aa'] = [
  {
    t: 'qc',
    ti: 'Quick Check: Ratio Test for Infinite Series',
    q: 'Under the ratio test, if \\(L = \\lim_{n\\to\\infty} \\left|\\dfrac{a_{n+1}}{a_n}\\right| = 1\\), what conclusion can be drawn?',
    o: [
      'The test is inconclusive; use another convergence test',
      'The series converges absolutely',
      'The series diverges to infinity',
      'The series alternates'
    ],
    a: 0,
    ex: 'When \\(L = 1\\), the ratio test provides no information. For example, \\(\\sum 1/n\\) has \\(L=1\\) (diverges), and \\(\\sum 1/n^2\\) has \\(L=1\\) (converges).'
  },
  {
    t: 'tf',
    ti: 'Reasoning Lab: Inverse Trigonometric Functions & Series',
    items: [
      { s: 'The derivative of \\(\\arctan x\\) is \\(\\frac{1}{1+x^2}\\) for all \\(x \\in \\mathbb{R}\\).', a: true, ex: 'The derivative of arctan is bounded and continuous everywhere.' },
      { s: 'The Maclaurin series expansion \\(\\ln(1+x) = x - \\frac{x^2}{2} + \\frac{x^3}{3} - \\cdots\\) is valid for all real \\(x\\).', a: false, ex: 'The interval of convergence is \\(-1 < x \\le 1\\).' },
      { s: 'The principal range of \\(\\arcsin x\\) is \\([-\\frac{\\pi}{2}, \\frac{\\pi}{2}]\\).', a: true, ex: 'Arcsin outputs angles in quadrants IV and I.' }
    ]
  },
  {
    t: 'num',
    ti: 'Calculation Lab: Inverse Tangent Derivative',
    q: 'Find the derivative value \\(f\'(0)\\) for \\(f(x) = \\arctan(3x)\\).',
    a: 3,
    tol: 0.01,
    h: 'Use the chain rule: \\(\\frac{d}{dx}\\arctan(u) = \\frac{1}{1+u^2}\\cdot u\'\\).',
    sol: '\\(f\'(x) = \\dfrac{3}{1+(3x)^2} \\implies f\'(0) = \\dfrac{3}{1+0} = 3\\).'
  },
  {
    t: 'ord',
    ti: 'Analysis Protocol: Ratio Test Convergence Workflow',
    q: 'Order the steps for applying the ratio test to \\(\\sum_{n=1}^\\infty a_n\\):',
    items: [
      'Identify the general term \\(a_n\\) and construct the subsequent term \\(a_{n+1}\\).',
      'Form the absolute ratio \\(\\left|\\dfrac{a_{n+1}}{a_n}\\right|\\) and simplify fractions and factorials.',
      'Evaluate the limit \\(L = \\lim_{n\\to\\infty} \\left|\\dfrac{a_{n+1}}{a_n}\\right|\\).',
      'Compare \\(L\\) against 1 (converges absolutely if \\(L < 1\\), diverges if \\(L > 1\\)).',
      'If \\(L = 1\\), state that the test is inconclusive and select a comparison or integral test.'
    ]
  },
  {
    t: 'cat',
    ti: 'Classify Infinite Series Tests',
    categories: ['Direct Ratio / Root Test', 'Comparison / Integral Test'],
    items: [
      { s: 'Testing \\(\\sum \\frac{3^n}{n!}\\) with factorial expressions', cat: 0 },
      { s: 'Testing \\(\\sum \\frac{1}{n^2 + 1}\\) compared against \\(\\sum \\frac{1}{n^2}\\)', cat: 1 },
      { s: 'Testing geometric series with terms \\(\\left(\\frac{2x}{5}\\right)^n\\)', cat: 0 },
      { s: 'Testing \\(\\sum \\frac{1}{n \\ln n}\\) via improper integration', cat: 1 },
      { s: 'Finding radius of convergence of a power series', cat: 0 },
      { s: 'Direct comparison test with known p-series', cat: 1 }
    ]
  }
];

D['ibhl-aihl'] = [
  {
    t: 'qc',
    ti: 'Quick Check: Markov Chain Steady State Definition',
    q: 'In IB AI HL, a steady-state probability vector \\(\\mathbf{s}\\) for column-stochastic transition matrix \\(T\\) must satisfy which conditions?',
    o: [
      '\\(T\\mathbf{s} = \\mathbf{s}\\) and the entries of \\(\\mathbf{s}\\) sum to 1',
      '\\(T\\mathbf{s} = \\mathbf{0}\\) and all entries are integers',
      '\\(T^2 = I\\) with \\(|\\mathbf{s}| = 1\\)',
      '\\(\\mathbf{s} = T^{-1}\\mathbf{0}\\)'
    ],
    a: 0,
    ex: 'The steady-state vector is an eigenvector of \\(T\\) with eigenvalue \\(\\lambda = 1\\), normalized so total probability \\(\\sum s_i = 1\\).'
  },
  {
    t: 'tf',
    ti: 'Reasoning Lab: Graph Theory & Network Properties',
    items: [
      { s: 'Kruskal\'s algorithm always produces a spanning tree of minimal total edge weight.', a: true, ex: 'Kruskal\'s algorithm is guaranteed to find a minimum spanning tree.' },
      { s: 'An Eulerian circuit visits every vertex in the graph exactly once.', a: false, ex: 'That is a Hamiltonian cycle. An Eulerian circuit traverses every edge exactly once and returns to the start.' },
      { s: 'A connected graph has an Eulerian trail if and only if exactly two vertices have odd degree.', a: true, ex: 'The trail begins at one odd-degree vertex and ends at the other.' }
    ]
  },
  {
    t: 'num',
    ti: 'Calculation Lab: Kruskal\'s MST Weight Calculation',
    q: 'A connected graph has 5 vertices. A greedy algorithm selects the 4 smallest non-cycle edges with weights 1, 2, 3, and 4. What is the total weight of this minimum spanning tree?',
    a: 10,
    tol: 0.01,
    h: 'Sum the edge weights included in the spanning tree.',
    sol: '\\(1 + 2 + 3 + 4 = 10\\).'
  },
  {
    t: 'ord',
    ti: 'Algorithm Protocol: Kruskal\'s Algorithm Step Sequence',
    q: 'Arrange the sequence of steps for Kruskal\'s minimum spanning tree algorithm on a graph with \\(V\\) vertices:',
    items: [
      'List and sort all edges of the graph in ascending order of weight.',
      'Initialize a forest where each of the \\(V\\) vertices is its own separate component.',
      'Select the lowest-weight edge remaining in the sorted list.',
      'Check whether adding the edge forms a cycle; if no cycle, add it to the MST; otherwise discard it.',
      'Repeat until exactly \\(V - 1\\) edges have been accepted into the tree.'
    ]
  },
  {
    t: 'cat',
    ti: 'Classify Graph Theory Concepts',
    categories: ['Tree / Spanning Structure', 'Traversals / Paths'],
    items: [
      { s: 'Minimum Spanning Tree (MST)', cat: 0 },
      { s: 'Eulerian Trail (traversing every edge once)', cat: 1 },
      { s: 'Prim\'s tree growth algorithm', cat: 0 },
      { s: 'Hamiltonian Cycle (visiting every vertex once)', cat: 1 },
      { s: 'Kruskal\'s greedy edge-addition algorithm', cat: 0 },
      { s: 'Dijkstra\'s single-source shortest path algorithm', cat: 1 }
    ]
  }
];

});
