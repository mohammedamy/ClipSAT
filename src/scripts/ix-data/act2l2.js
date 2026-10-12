/* Interactive Practice data for /act2l2/ - one entry per chapter section id.
   Shipped as public/js/ix/act2l2.js and loaded only on that track's page by the
   engine in src/scripts/modules/19-interactive-activities-engine-v1.js
   (Plan 5 Phase 5.015, ADR 0033). Entry shapes (qc/mt/tf/sb/sr/fn/num/ord/cat) are
   documented there. */
(window.__ixData = window.__ixData || []).push(function (D) {

D['act2l2-about'] = [
  {
    t: 'qc',
    ti: 'Math Lab: ACT 2 Level 2 Pacing & Structure',
    q: 'The ACT Math 2 Level 2 exam contains 50 questions in 60 minutes. What is the average target time budget per question?',
    o: ['72 seconds (1.2 min)', '60 seconds (1.0 min)', '84 seconds (1.4 min)', '45 seconds (0.75 min)'],
    a: 0,
    ex: '\\(\\dfrac{60\\text{ min}\\times60\\text{ s}}{50\\text{ questions}} = 72\\text{ seconds/question}\\). Keep an active pacing checkpoint at Q25 (30 min remaining).'
  },
  {
    t: 'tf',
    ti: 'Reasoning Lab: ACT Subject Test Policies & Scoring',
    items: [
      { s: 'An approved scientific or graphing calculator is permitted throughout the entire exam.', a: true, ex: 'Unlike SAT Section 3, ACT Math Level 2 permits an approved calculator on every single question.' },
      { s: 'There is a negative penalty for incorrect answers.', a: false, ex: 'ACT Subject Tests do not penalize wrong answers; never leave any question blank.' },
      { s: 'Level 2 covers limits and polar coordinates, which do not appear on Level 1.', a: true, ex: 'Level 2 extends trigonometry to polar equations and covers introductory limits and vectors.' },
      { s: 'Formulas for geometric series and trigonometry are printed at the start of the exam booklet.', a: false, ex: 'Unlike the SAT, the ACT provides no reference formula sheet. Core identities must be memorized.' }
    ]
  },
  {
    t: 'num',
    ti: 'Pacing Lab: Questions Remaining Budget',
    q: 'If you have 18 minutes remaining on the AIST Math 2 exam, how many questions should you have left to stay on the 72-second/question target pace?',
    a: 15,
    tol: 0.01,
    unit: 'questions',
    h: 'Convert 18 minutes to seconds: \\(18 \\times 60 = 1080\\text{ s}\\). Divide by 72 seconds per question.',
    sol: '\\(\\dfrac{18\\times 60\\text{ s}}{72\\text{ s/question}} = \\dfrac{1080}{72} = 15\\text{ questions}\\).'
  },
  {
    t: 'ord',
    ti: 'Exam Execution: Strategic Problem-Solving Workflow',
    q: 'Arrange the optimal workflow for high-difficulty AIST Math 2 questions:',
    items: [
      'Read question carefully and identify the target variable or quantity.',
      'Check algebraic domain constraints (denominators ≠ 0, log arguments > 0).',
      'Execute algebraic solution using standard formulas.',
      'Substitute candidate answer back into the original equation to reject extraneous roots.',
      'Verify choice against options and bubble answer on sheet.'
    ]
  },
  {
    t: 'cat',
    ti: 'Content Area Classification: Algebra II vs Precalculus',
    categories: ['Algebra II', 'Precalculus'],
    items: [
      { s: 'Arithmetic and geometric sequence formulas', cat: 0 },
      { s: 'Matrix multiplication and 2×2 determinants', cat: 0 },
      { s: 'Complex number conjugates and powers of i', cat: 0 },
      { s: 'Polar to rectangular coordinate conversions', cat: 1 },
      { s: 'Indeterminate limit evaluation at infinity', cat: 1 },
      { s: 'Law of Sines and Law of Cosines', cat: 1 }
    ]
  }
];

D['act2l2-complex'] = [
  {
    t: 'sb',
    ti: 'Lab Step Builder: Converting Complex Number to Polar Form',
    steps: [
      { l: 'Find the modulus \\(r\\) of \\(z = 1 + i\\sqrt{3}\\): \\(r = \\sqrt{1^2 + (\\sqrt{3})^2} =\\)', a: '2', h: '\\(\\sqrt{1+3} = \\sqrt{4} = 2\\)' },
      { l: 'Find the argument \\(\\theta\\) in radians (first quadrant, \\(\\tan\\theta = \\sqrt{3}\\)): \\(\\theta = \\pi /\\)', a: '3', h: '\\(\\tan(\\pi/3) = \\sqrt{3}\\), so denominator is 3' },
      { l: 'Apply De Moivre to find \\(|z^6| = r^6 = 2^6 =\\)', a: '64', h: '\\(2^6 = 64\\)' }
    ]
  },
  {
    t: 'mt',
    ti: 'Matching Lab: Complex Number Properties & Operations',
    p: [
      { l: 'Modulus \\(|a+bi|\\)', r: '√(a² + b²)' },
      { l: 'Conjugate product \\((a+bi)(a−bi)\\)', r: 'a² + b²' },
      { l: 'Power of i: i⁴ᵏ⁺²', r: '−1' },
      { l: 'De Moivre: (cos θ + i sin θ)ⁿ', r: 'cos(nθ) + i sin(nθ)' }
    ]
  },
  {
    t: 'num',
    ti: 'Numeric Lab: Modulus of Complex Product',
    q: 'Calculate the exact squared modulus \\(|z|^2\\) of \\(z = (3 - 4i)(1 + 2i)\\).',
    a: 125,
    tol: 0.01,
    h: 'Use modulus product property: \\(|z_1 z_2|^2 = |z_1|^2 \\times |z_2|^2\\).',
    sol: '\\(|3-4i|^2 = 3^2 + (-4)^2 = 25\\), and \\(|1+2i|^2 = 1^2 + 2^2 = 5\\). So \\(|z|^2 = 25 \\times 5 = 125\\).'
  },
  {
    t: 'ord',
    ti: 'Complex Division: Ordering Conjugate Simplification',
    q: 'Arrange the steps to simplify the complex quotient \\(\\dfrac{5+i}{2-3i}\\):',
    items: [
      'Identify the complex conjugate of the denominator: \\(2 + 3i\\).',
      'Multiply both numerator and denominator by \\((2 + 3i)\\).',
      'Expand denominator using \\((2-3i)(2+3i) = 2^2 - (3i)^2 = 4 + 9 = 13\\).',
      'Expand numerator using FOIL: \\((5+i)(2+3i) = 10 + 15i + 2i + 3i^2 = 7 + 17i\\).',
      'Separate into standard form \\(a + bi\\): \\(\\frac{7}{13} + \\frac{17}{13}i\\).'
    ]
  },
  {
    t: 'cat',
    ti: 'Classify Complex Quantities: Real, Purely Imaginary, or Neither',
    categories: ['Purely Real', 'Purely Imaginary', 'General Complex (a + bi)'],
    items: [
      { s: '\\(z + \\bar{z}\\) for any complex number \\(z = a + bi\\)', cat: 0 },
      { s: '\\(i^{40}\\)', cat: 0 },
      { s: '\\(z - \\bar{z}\\) for any \\(z = a + bi\\) with \\(b \\neq 0\\)', cat: 1 },
      { s: '\\(i^{27}\\)', cat: 1 },
      { s: '\\((2 + 3i)^2\\)', cat: 2 },
      { s: '\\(\\dfrac{4 + i}{1 - i}\\)', cat: 2 }
    ]
  }
];

D['act2l2-matrices-vectors'] = [
  {
    t: 'sb',
    ti: 'Lab Step Builder: 2×2 Matrix Invertibility & Determinant',
    steps: [
      { l: 'Compute \\(\\det\\begin{pmatrix}4 & 2 \\\\ 3 & 5\\end{pmatrix} = (4)(5) - (2)(3) =\\)', a: '14', h: '\\(20 - 6 = 14\\)' },
      { l: 'Compute the dot product of \\(\\mathbf{u}=\\langle 3, -4 \\rangle\\) and \\(\\mathbf{v}=\\langle 4, 3 \\rangle\\):', a: '0', h: '\\(3(4) + (-4)(3) = 12 - 12 = 0\\)' },
      { l: 'Are vectors \\(\\mathbf{u}\\) and \\(\\mathbf{v}\\) orthogonal? (yes/no):', a: 'yes', h: 'Dot product is zero, so angle is 90°' }
    ]
  },
  {
    t: 'qc',
    ti: 'Lab Check: Vector Magnitude & Unit Vectors',
    q: 'What is the unit vector in the direction of \\(\\mathbf{v} = \\langle 5, -12 \\rangle\\)?',
    o: ['\\(\\langle \\frac{5}{13}, -\\frac{12}{13} \\rangle\\)', '\\(\\langle \\frac{5}{17}, -\\frac{12}{17} \\rangle\\)', '\\(\\langle 5, -12 \\rangle\\)', '\\(\\langle \\frac{1}{5}, -\\frac{1}{12} \\rangle\\)'],
    a: 0,
    ex: '\\(|\\mathbf{v}| = \\sqrt{5^2 + (-12)^2} = \\sqrt{25+144} = 13\\). The unit vector is \\(\\mathbf{v}/|\\mathbf{v}| = \\langle 5/13, -12/13 \\rangle\\).'
  },
  {
    t: 'num',
    ti: 'Numeric Lab: Dot Product & Orthogonality',
    q: 'Find the dot product \\(\\mathbf{u}\\cdot\\mathbf{v}\\) for \\(\\mathbf{u} = \\langle 6, -3 \\rangle\\) and \\(\\mathbf{v} = \\langle 4, 8 \\rangle\\).',
    a: 0,
    tol: 0.01,
    h: '\\(\\mathbf{u}\\cdot\\mathbf{v} = u_1 v_1 + u_2 v_2\\).',
    sol: '\\(\\mathbf{u}\\cdot\\mathbf{v} = (6)(4) + (-3)(8) = 24 - 24 = 0\\). The vectors are orthogonal.'
  },
  {
    t: 'ord',
    ti: 'Matrix Inversion: Solving Matrix Equations',
    q: 'Arrange the steps to solve the linear system \\(A\\mathbf{x} = \\mathbf{b}\\) using \\(A^{-1}\\):',
    items: [
      'Write the system in matrix-vector form \\(A\\mathbf{x} = \\mathbf{b}\\).',
      'Compute the determinant \\(\\det(A) = ad - bc\\) and verify \\(\\det(A) \\neq 0\\).',
      'Form \\(A^{-1} = \\frac{1}{\\det A}\\begin{pmatrix}d & -b \\\\ -c & a\\end{pmatrix}\\).',
      'Pre-multiply both sides: \\(\\mathbf{x} = A^{-1}\\mathbf{b}\\).',
      'Compute matrix-vector multiplication to find \\(x\\) and \\(y\\).'
    ]
  },
  {
    t: 'cat',
    ti: 'Matrix Properties: Invertible vs Singular',
    categories: ['Invertible (det ≠ 0)', 'Singular (det = 0)'],
    items: [
      { s: '\\(\\begin{pmatrix}3 & 2 \\\\ 1 & 4\\end{pmatrix}\\)', cat: 0 },
      { s: '\\(\\begin{pmatrix}5 & -2 \\\\ -10 & 4\\end{pmatrix}\\)', cat: 1 },
      { s: '\\(\\begin{pmatrix}6 & 3 \\\\ 4 & 2\\end{pmatrix}\\)', cat: 1 },
      { s: '\\(\\begin{pmatrix}1 & 0 \\\\ 0 & 1\\end{pmatrix}\\)', cat: 0 },
      { s: '\\(\\begin{pmatrix}2 & 7 \\\\ 1 & 3\\end{pmatrix}\\)', cat: 0 },
      { s: '\\(\\begin{pmatrix}-4 & 6 \\\\ 2 & -3\\end{pmatrix}\\)', cat: 1 }
    ]
  }
];

D['act2l2-sequences-series'] = [
  {
    t: 'fn',
    ti: 'Lab Explorer: Geometric Sequence & Infinite Series',
    fns: [{ expr: 'a*r^x', color: '#2563eb', label: 'a·rˣ' }],
    xrange: [0, 8],
    yrange: [-10, 20],
    params: [
      { name: 'a', label: 'First term a', min: 1, max: 10, step: 1, default: 4 },
      { name: 'r', label: 'Common ratio r', min: -1.5, max: 1.5, step: 0.1, default: 0.6 }
    ]
  },
  {
    t: 'qc',
    ti: 'Lab Check: Infinite Geometric Series Convergence',
    q: 'Find the exact sum of the infinite series \\(18 + 6 + 2 + \\frac{2}{3} + \\cdots\\)',
    o: ['27', '24', '36', 'DoesNotExist'],
    a: 0,
    ex: '\\(a_1=18\\), \\(r = 6/18 = 1/3\\). Since \\(|r| < 1\\), \\(S_\\infty = \\dfrac{a}{1-r} = \\dfrac{18}{1 - 1/3} = \\dfrac{18}{2/3} = 27\\).'
  },
  {
    t: 'num',
    ti: 'Numeric Lab: Infinite Geometric Series Sum',
    q: 'Calculate the exact sum of the infinite series \\(36 - 12 + 4 - \\frac{4}{3} + \\cdots\\)',
    a: 27,
    tol: 0.01,
    h: 'Identify \\(a_1 = 36\\) and \\(r = -12/36 = -1/3\\). Formula: \\(S_\\infty = \\dfrac{a_1}{1 - r}\\).',
    sol: '\\(S_\\infty = \\dfrac{36}{1 - (-1/3)} = \\dfrac{36}{4/3} = 36 \\times \\dfrac{3}{4} = 27\\).'
  },
  {
    t: 'ord',
    ti: 'Arithmetic Series: Sum Evaluation Sequence',
    q: 'Arrange the steps to find the sum of the finite arithmetic series \\(5 + 8 + 11 + \\cdots + 95\\):',
    items: [
      'Identify first term \\(a_1 = 5\\), common difference \\(d = 3\\), and last term \\(a_n = 95\\).',
      'Set up the nth term equation: \\(95 = 5 + (n-1)(3)\\).',
      'Solve for number of terms \\(n\\): \\(90 = (n-1)(3) \\implies n - 1 = 30 \\implies n = 31\\).',
      'Apply sum formula \\(S_n = \\frac{n}{2}(a_1 + a_n)\\): \\(S_{31} = \\frac{31}{2}(5 + 95)\\).',
      'Compute final total: \\(S_{31} = \\frac{31}{2}(100) = 31 \\times 50 = 1550\\).'
    ]
  },
  {
    t: 'cat',
    ti: 'Series Classification: Convergent vs Divergent',
    categories: ['Converges to Finite Sum', 'Diverges (No Finite Sum)'],
    items: [
      { s: '\\(\\sum_{k=1}^\\infty 10 \\cdot (0.8)^k\\)', cat: 0 },
      { s: '\\(\\sum_{k=1}^\\infty 5 \\cdot (1.2)^k\\)', cat: 1 },
      { s: '\\(\\sum_{k=1}^\\infty 12 \\cdot (-0.5)^k\\)', cat: 0 },
      { s: '\\(100 + 50 + 25 + 12.5 + \\cdots\\)', cat: 0 },
      { s: '\\(3 + 6 + 9 + 12 + \\cdots\\) (Arithmetic with d > 0)', cat: 1 },
      { s: '\\(\\sum_{k=1}^\\infty 4 \\cdot (-1)^k\\)', cat: 1 }
    ]
  }
];

D['act2l2-advanced-functions-equations'] = [
  {
    t: 'fn',
    ti: 'Lab Explorer: Rational Function & Asymptotes',
    fns: [{ expr: '(a*x+2)/(x-c)', color: '#0d9488', label: '(ax+2)/(x-c)' }],
    xrange: [-8, 8],
    yrange: [-10, 10],
    params: [
      { name: 'a', label: 'Numerator slope a (horizontal asymptote)', min: -3, max: 3, step: 1, default: 2 },
      { name: 'c', label: 'Denominator root c (vertical asymptote)', min: -4, max: 4, step: 1, default: 1 }
    ]
  },
  {
    t: 'tf',
    ti: 'Reasoning Lab: Polynomial Roots & Graph Symmetries',
    items: [
      { s: 'A polynomial of degree 5 with real coefficients must have at least one real zero.', a: true, ex: 'Non-real complex roots occur in conjugate pairs, so degree 5 has at least 1 real root.' },
      { s: 'An even function satisfies \\(f(-x) = -f(x)\\).', a: false, ex: 'Even functions satisfy \\(f(-x) = f(x)\\) and are symmetric about the y-axis.' },
      { s: 'The graph of \\(y = \\log_b(x-3)\\) has a vertical asymptote at \\(x = 3\\).', a: true, ex: 'The argument must be strictly positive: \\(x-3 > 0 \\Rightarrow x > 3\\).' }
    ]
  },
  {
    t: 'num',
    ti: 'Numeric Lab: Evaluating Composite Functions',
    q: 'Let \\(f(x) = 2x^2 - 3\\) and \\(g(x) = \\sqrt{x + 7}\\). Find the value of \\((f \\circ g)(9)\\).',
    a: 29,
    tol: 0.01,
    h: 'Compute inside first: \\(g(9) = \\sqrt{9+7} = \\sqrt{16} = 4\\). Then find \\(f(4)\\).',
    sol: '\\(g(9) = \\sqrt{16} = 4\\). Then \\(f(4) = 2(4)^2 - 3 = 2(16) - 3 = 32 - 3 = 29\\).'
  },
  {
    t: 'ord',
    ti: 'Rational Equations: Eliminating Extraneous Solutions',
    q: 'Arrange the steps to solve \\(\\dfrac{x}{x-3} = \\dfrac{3}{x-3} + 2\\):',
    items: [
      'Note domain restriction: \\(x - 3 \\neq 0 \\implies x \\neq 3\\).',
      'Multiply entire equation by LCD \\((x - 3)\\): \\(x = 3 + 2(x - 3)\\).',
      'Distribute and simplify: \\(x = 3 + 2x - 6 \\implies x = 2x - 3\\).',
      'Solve linear equation: \\(-x = -3 \\implies x = 3\\).',
      'Compare solution against restriction: \\(x = 3\\) is extraneous; conclusion is No Solution.'
    ]
  },
  {
    t: 'cat',
    ti: 'Symmetry Classification: Even, Odd, or Neither',
    categories: ['Even (f(-x) = f(x))', 'Odd (f(-x) = -f(x))', 'Neither'],
    items: [
      { s: '\\(f(x) = x^4 + 3x^2 - 5\\)', cat: 0 },
      { s: '\\(f(x) = x^3 - 4x\\)', cat: 1 },
      { s: '\\(f(x) = x^3 + x^2\\)', cat: 2 },
      { s: '\\(f(x) = \\cos(x)\\)', cat: 0 },
      { s: '\\(f(x) = \\sin(x)\\)', cat: 1 },
      { s: '\\(f(x) = 2^x\\)', cat: 2 }
    ]
  }
];

D['act2l2-trig-polar'] = [
  {
    t: 'fn',
    ti: 'Lab Explorer: Sinusoidal Amplitude & Frequency Lab',
    fns: [{ expr: 'A*sin(B*x)', color: '#7c3aed', label: 'A·sin(Bx)' }],
    xrange: [-3.14, 6.28],
    yrange: [-5, 5],
    params: [
      { name: 'A', label: 'Amplitude A', min: 0.5, max: 4, step: 0.5, default: 2 },
      { name: 'B', label: 'Frequency B', min: 0.5, max: 3, step: 0.5, default: 1 }
    ]
  },
  {
    t: 'mt',
    ti: 'Matching Lab: Polar-Rectangular Conversions & Trig Identities',
    p: [
      { l: 'x in polar coordinates', r: 'r cos θ' },
      { l: 'y in polar coordinates', r: 'r sin θ' },
      { l: 'Double angle sin(2θ)', r: '2 sin θ cos θ' },
      { l: 'Double angle cos(2θ)', r: 'cos² θ − sin² θ' }
    ]
  },
  {
    t: 'num',
    ti: 'Numeric Lab: Polar Radius from Cartesian Coordinates',
    q: 'Convert the rectangular coordinates \\((-5, 12)\\) to polar coordinates \\((r, \\theta)\\). What is the exact value of \\(r\\)?',
    a: 13,
    tol: 0.01,
    h: '\\(r = \\sqrt{x^2 + y^2}\\).',
    sol: '\\(r = \\sqrt{(-5)^2 + 12^2} = \\sqrt{25 + 144} = \\sqrt{169} = 13\\).'
  },
  {
    t: 'ord',
    ti: 'Oblique Triangles: Solving SAS with Law of Cosines',
    q: 'Arrange the steps to solve an SAS triangle with sides \\(b, c\\) and included angle \\(A\\):',
    items: [
      'Identify the included angle \\(A\\) and opposite unknown side \\(a\\).',
      'Apply Law of Cosines: \\(a^2 = b^2 + c^2 - 2bc\\cos A\\).',
      'Evaluate right-hand side using given numerical values.',
      'Take positive square root to find side length \\(a = \\sqrt{a^2}\\).',
      'Use Law of Sines \\(\\frac{\\sin B}{b} = \\frac{\\sin A}{a}\\) to find remaining acute angle \\(B\\).'
    ]
  },
  {
    t: 'cat',
    ti: 'Coordinate Form: Polar vs Cartesian Equations',
    categories: ['Cartesian Equation', 'Polar Equation'],
    items: [
      { s: '\\(x^2 + y^2 = 25\\)', cat: 0 },
      { s: '\\(r = 5\\)', cat: 1 },
      { s: '\\(y = 3x - 2\\)', cat: 0 },
      { s: '\\(r = 4\\cos\\theta\\)', cat: 1 },
      { s: '\\(\\theta = \\frac{\\pi}{3}\\)', cat: 1 },
      { s: '\\(\\frac{x^2}{9} + \\frac{y^2}{4} = 1\\)', cat: 0 }
    ]
  }
];

D['act2l2-limits'] = [
  {
    t: 'sb',
    ti: 'Lab Step Builder: Evaluating Indeterminate Limits (0/0)',
    steps: [
      { l: 'Evaluate \\(\\lim_{x\\to 3}\\dfrac{x^2-9}{x-3}\\). Factor numerator: \\((x-3)(x+\\text{?})\\):', a: '3', h: '\\((x-3)(x+3)\\)' },
      { l: 'Cancel the common factor \\((x-3)\\) for \\(x\\neq 3\\) to get \\(x + 3\\). Evaluate at \\(x=3\\):', a: '6', h: '\\(3 + 3 = 6\\)' }
    ]
  },
  {
    t: 'qc',
    ti: 'Lab Check: Limits at Infinity of Rational Functions',
    q: 'Find \\(\\lim_{x\\to\\infty}\\dfrac{5x^3 - 2x + 7}{2x^3 + 4x^2 - 1}\\):',
    o: ['5/2', '0', '\\(\\infty\\)', '7/(-1) = -7'],
    a: 0,
    ex: 'Both numerator and denominator have highest degree 3. The limit at infinity is the ratio of leading coefficients: \\(5/2\\).'
  },
  {
    t: 'num',
    ti: 'Numeric Lab: Limit by Rationalization',
    q: 'Evaluate the exact limit: \\[ \\lim_{x\\to 9} \\frac{\\sqrt{x} - 3}{x - 9} \\]',
    a: '1/6',
    tol: 0.001,
    h: 'Direct substitution yields 0/0. Multiply numerator and denominator by conjugate \\(\\sqrt{x} + 3\\).',
    sol: '\\(\\lim_{x\\to 9}\\dfrac{x - 9}{(x-9)(\\sqrt{x}+3)} = \\lim_{x\\to 9}\\dfrac{1}{\\sqrt{x}+3} = \\dfrac{1}{3+3} = \\dfrac{1}{6} \\approx 0.1667\\).'
  },
  {
    t: 'ord',
    ti: 'Indeterminate Limits: Factor & Cancel Sequence',
    q: 'Arrange the steps to evaluate \\(\\lim_{x\\to 2}\\dfrac{x^2 + x - 6}{x^2 - 4}\\):',
    items: [
      'Attempt direct substitution: evaluate at \\(x = 2\\) to get \\(\\frac{4 + 2 - 6}{4 - 4} = \\frac{0}{0}\\) (indeterminate).',
      'Factor the numerator: \\(x^2 + x - 6 = (x - 2)(x + 3)\\).',
      'Factor the denominator: \\(x^2 - 4 = (x - 2)(x + 2)\\).',
      'Cancel common non-zero factor \\((x - 2)\\) for \\(x \\neq 2\\): \\(\\frac{x + 3}{x + 2}\\).',
      'Substitute \\(x = 2\\) into reduced expression: \\(\\frac{2 + 3}{2 + 2} = \\frac{5}{4}\\).'
    ]
  },
  {
    t: 'cat',
    ti: 'Limit Behavior: Finite Value, Infinite Limit, or Does Not Exist',
    categories: ['Finite Limit Value', 'Infinite Limit (±∞)', 'DNE (Left ≠ Right)'],
    items: [
      { s: '\\(\\lim_{x\\to 3}\\frac{x^2 - 9}{x - 3}\\)', cat: 0 },
      { s: '\\(\\lim_{x\\to 0}\\frac{1}{x^2}\\)', cat: 1 },
      { s: '\\(\\lim_{x\\to 0}\\frac{|x|}{x}\\)', cat: 2 },
      { s: '\\(\\lim_{x\\to\\infty}\\frac{4x^2 - 1}{2x^2 + 5}\\)', cat: 0 },
      { s: '\\(\\lim_{x\\to 1}\\frac{1}{x - 1}\\) (two-sided limit)', cat: 2 },
      { s: '\\(\\lim_{x\\to\\infty}(x^3 - 5x)\\)', cat: 1 }
    ]
  }
];

});
