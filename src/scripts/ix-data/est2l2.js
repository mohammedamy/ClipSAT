/* Interactive Practice data for /est2l2/ - one entry per chapter section id.
   Shipped as public/js/ix/est2l2.js and loaded only on that track's page by the
   engine in src/scripts/modules/19-interactive-activities-engine-v1.js
   (Plan 5 Phase 5.015, ADR 0033). Entry shapes (qc/mt/tf/sb/sr/fn) are
   documented there. */
(window.__ixData = window.__ixData || []).push(function (D) {

D['est2l2-about'] = [
  {
    t: 'qc',
    ti: 'Math Lab: EST II Level 2 Structure & Timing',
    q: 'The EST II Math Level 2 exam contains 50 questions in 60 minutes. What pacing is required to finish on time with a 5-minute review buffer?',
    o: ['66 seconds per question', '72 seconds per question', '90 seconds per question', '48 seconds per question'],
    a: 0,
    ex: '\\(55\\text{ minutes} \\times 60\\text{ seconds} / 50\\text{ questions} = 66\\text{ seconds/question}\\). Keep an eye on the clock every 10 questions (11 minutes per block).'
  },
  {
    t: 'tf',
    ti: 'Reasoning Lab: EST II Exam Rules & Calculator Usage',
    items: [
      { s: 'A scientific calculator is allowed for the full duration of EST II Math.', a: true, ex: 'Scientific calculators meeting exam criteria are permitted on all questions.' },
      { s: 'Wrong answers deduct 0.25 points from your raw score.', a: false, ex: 'EST II uses raw scoring with no negative guessing penalty.' },
      { s: 'EST II Math Level 2 includes differential calculus and combinatorics.', a: true, ex: 'Level 2 adds introductory derivatives, tangents, combinatorics, and complex numbers.' }
    ]
  }
];

D['est2l2-complex'] = [
  {
    t: 'sb',
    ti: 'Lab Step Builder: Powers of i and Complex Arithmetic',
    steps: [
      { l: 'Evaluate \\(i^{27}\\). Divide 27 by 4: remainder is:', a: '3', h: '\\(27 = 4 \\times 6 + 3\\)' },
      { l: 'Therefore \\(i^{27} = i^3 =\\)', a: '-i', h: '\\(i^3 = -i\\)' },
      { l: 'Compute the modulus of \\(z = 6 - 8i\\): \\(|z| =\\)', a: '10', h: '\\(\\sqrt{6^2 + (-8)^2} = \\sqrt{36+64} = 10\\)' }
    ]
  },
  {
    t: 'qc',
    ti: 'Lab Check: Complex Conjugates & Division',
    q: 'Simplify \\(\\dfrac{5+i}{2-i}\\) by multiplying numerator and denominator by the conjugate:',
    o: ['\\(\\frac{9}{5} + \\frac{7}{5}i\\)', '\\(\\frac{9}{5} - \\frac{7}{5}i\\)', '\\(\\frac{11}{3} + \\frac{7}{3}i\\)', '\\(3 + 2i\\)'],
    a: 0,
    ex: '\\(\\dfrac{(5+i)(2+i)}{(2-i)(2+i)} = \\dfrac{10 + 5i + 2i - 1}{4 + 1} = \\dfrac{9 + 7i}{5} = \\dfrac{9}{5} + \\dfrac{7}{5}i\\).'
  }
];

D['est2l2-sequences-series'] = [
  {
    t: 'fn',
    ti: 'Lab Explorer: Arithmetic Progression Generator \\(a_n = a_1 + (n-1)d\\)',
    fns: [{ expr: 'a + (x-1)*d', color: '#16a34a', label: 'a + (x-1)d' }],
    xrange: [1, 10],
    yrange: [-10, 40],
    params: [
      { name: 'a', label: 'First term a₁', min: -5, max: 15, step: 1, default: 3 },
      { name: 'd', label: 'Common difference d', min: -4, max: 6, step: 0.5, default: 3.5 }
    ]
  },
  {
    t: 'mt',
    ti: 'Matching Lab: Sequence & Series Formulas',
    p: [
      { l: 'Arithmetic nth term aₙ', r: 'a₁ + (n−1)d' },
      { l: 'Arithmetic sum Sₙ', r: 'n/2 · (a₁ + aₙ)' },
      { l: 'Geometric nth term aₙ', r: 'a₁ · rⁿ⁻¹' },
      { l: 'Infinite geometric sum', r: 'a₁ / (1 − r), |r| < 1' }
    ]
  }
];

D['est2l2-functions-graphs'] = [
  {
    t: 'fn',
    ti: 'Lab Explorer: Function Transformations \\(y = A f(x-h) + k\\)',
    fns: [{ expr: 'A*abs(x-h)+k', color: '#ea580c', label: 'A|x-h|+k' }],
    xrange: [-8, 8],
    yrange: [-6, 8],
    params: [
      { name: 'A', label: 'Vertical stretch/flip A', min: -3, max: 3, step: 0.5, default: 1.5 },
      { name: 'h', label: 'Horizontal translation h', min: -5, max: 5, step: 1, default: 2 },
      { name: 'k', label: 'Vertical translation k', min: -4, max: 4, step: 1, default: -1 }
    ]
  },
  {
    t: 'tf',
    ti: 'Reasoning Lab: Inverses & Domain Restrictions',
    items: [
      { s: 'A function possesses an inverse function if and only if it is strictly one-to-one.', a: true, ex: 'It must pass the horizontal line test so that each output corresponds to exactly one input.' },
      { s: 'The graph of \\(f^{-1}(x)\\) is the reflection of \\(f(x)\\) across the line \\(y = -x\\).', a: false, ex: 'The reflection is across the diagonal line \\(y = x\\).' },
      { s: 'The domain of \\(f(x) = \\sqrt{9 - x^2}\\) is \\([-3, 3]\\).', a: true, ex: '\\(9 - x^2 \\geq 0 \\iff x^2 \\leq 9 \\iff -3 \\leq x \\leq 3\\).' }
    ]
  }
];

D['est2l2-matrices-vectors'] = [
  {
    t: 'sb',
    ti: 'Lab Step Builder: Matrix Multiplication (2×2)',
    steps: [
      { l: 'Multiply \\(\\begin{pmatrix}2 & 1 \\\\ 0 & 3\\end{pmatrix}\\begin{pmatrix}1 & 4 \\\\ 5 & 2\\end{pmatrix}\\). Top-left entry: \\(2(1) + 1(5) =\\)', a: '7', h: '\\(2 + 5 = 7\\)' },
      { l: 'Top-right entry: \\(2(4) + 1(2) =\\)', a: '10', h: '\\(8 + 2 = 10\\)' },
      { l: 'Bottom-left entry: \\(0(1) + 3(5) =\\)', a: '15', h: '\\(0 + 15 = 15\\)' },
      { l: 'Bottom-right entry: \\(0(4) + 3(2) =\\)', a: '6', h: '\\(0 + 6 = 6\\)' }
    ]
  },
  {
    t: 'qc',
    ti: 'Lab Check: Angle Between Vectors',
    q: 'Find the angle \\(\\theta\\) between vectors \\(\\mathbf{a} = \\langle 1, 0 \\rangle\\) and \\(\\mathbf{b} = \\langle 1, 1 \\rangle\\):',
    o: ['45°', '30°', '60°', '90°'],
    a: 0,
    ex: '\\(\\cos\\theta = \\dfrac{\\mathbf{a}\\cdot\\mathbf{b}}{|\\mathbf{a}||\\mathbf{b}|} = \\dfrac{1(1)+0(1)}{1\\cdot\\sqrt{2}} = \\dfrac{1}{\\sqrt{2}} \\Rightarrow \\theta = 45°\\).'
  }
];

D['est2l2-intro-calculus'] = [
  {
    t: 'fn',
    ti: 'Lab Explorer: Derivative & Tangent Line Secant Slope',
    fns: [
      { expr: 'x^2 - 2*x', color: '#2563eb', label: 'f(x) = x² - 2x' },
      { expr: '(2*a - 2)*(x - a) + (a^2 - 2*a)', color: '#dc2626', label: 'Tangent at x=a' }
    ],
    xrange: [-2, 5],
    yrange: [-4, 8],
    params: [
      { name: 'a', label: 'Point of tangency a', min: -1, max: 4, step: 0.5, default: 2 }
    ]
  },
  {
    t: 'sb',
    ti: 'Lab Step Builder: Power Rule & Tangent Equation',
    steps: [
      { l: 'Differentiate \\(f(x) = 3x^2 - 5x + 4\\): \\(f\'(x) = 6x -\\)', a: '5', h: 'Power rule: d/dx(3x²) = 6x, d/dx(-5x) = -5' },
      { l: 'Evaluate slope of tangent line at \\(x = 2\\): \\(f\'(2) = 6(2) - 5 =\\)', a: '7', h: '\\(12 - 5 = 7\\)' }
    ]
  }
];

D['est2l2-probability'] = [
  {
    t: 'sb',
    ti: 'Lab Step Builder: Permutations & Combinations',
    steps: [
      { l: 'Number of ways to choose a committee of 3 from 7 people \\(\\binom{7}{3} = \\dfrac{7\\times6\\times5}{3\\times2\\times1} =\\)', a: '35', h: '\\(210 / 6 = 35\\)' },
      { l: 'Number of ways to arrange 4 distinct books on a shelf: \\(4! =\\)', a: '24', h: '\\(4\\times3\\times2\\times1 = 24\\)' }
    ]
  },
  {
    t: 'qc',
    ti: 'Lab Check: Conditional Probability',
    q: 'If \\(P(A) = 0.4\\), \\(P(B) = 0.5\\), and \\(P(A \\cap B) = 0.2\\), find \\(P(A \\mid B)\\):',
    o: ['0.4', '0.5', '0.2', '0.8'],
    a: 0,
    ex: '\\(P(A \\mid B) = \\dfrac{P(A \\cap B)}{P(B)} = \\dfrac{0.2}{0.5} = 0.4\\). Since \\(P(A \\mid B) = P(A)\\), events \\(A\\) and \\(B\\) are independent.'
  }
];

});
