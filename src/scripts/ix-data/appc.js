/* Interactive Practice data for /appc/ - one entry per chapter section id.
   Shipped as public/js/ix/appc.js and loaded only on that track's page by the
   engine in src/scripts/modules/19-interactive-activities-engine-v1.js
   (Plan 5 Phase 5.015, ADR 0033). Entry shapes (qc/mt/tf/sb/sr/fn/num/ord/cat)
   are documented there. */
(window.__ixData = window.__ixData || []).push(function (D) {

D['appc-overview'] = [
  {
    t: 'qc',
    ti: 'Quick Check: AP Precalculus Conceptual Framework',
    q: 'What is the primary focus of the AP Precalculus framework designed by College Board?',
    o: [
      'Modeling dynamic real-world phenomena using function families and rates of change',
      'Memorizing algebraic formulas and mechanical drills',
      'Rigorous epsilon-delta proofs and multi-variable calculus',
      'Euclidean geometric axiomatic systems'
    ],
    a: 0,
    ex: 'AP Precalculus emphasizes understanding rates of change, function behaviors, parametric representations, and mathematical modeling across polynomial, rational, exponential, logarithmic, and trigonometric families.'
  },
  {
    t: 'tf',
    ti: 'Reasoning Lab: AP Precalculus Exam Format & Rules',
    items: [
      { s: 'Section I Part A (28 questions, 80 minutes) prohibits any calculator.', a: true, ex: 'Part A is strictly non-calculator.' },
      { s: 'A graphing calculator is permitted on Section II Free Response Questions.', a: true, ex: 'All 4 FRQs permit an approved graphing calculator.' },
      { s: 'Final answers to Free Response Questions should be rounded to 2 decimal places.', a: false, ex: 'College Board standard requires 3 decimal places.' }
    ]
  },
  {
    t: 'num',
    ti: 'Pacing Check: Average Minutes per Question in Part A',
    q: 'Section I Part A contains 28 multiple-choice questions in 80 minutes. What is the average time available per question in minutes, rounded to one decimal place?',
    a: 2.9,
    tol: 0.1,
    unit: 'min/question',
    h: 'Divide 80 minutes by 28 questions.',
    sol: '\\(\\dfrac{80}{28} = \\dfrac{20}{7} \\approx 2.86 \\approx 2.9\\text{ minutes/question}\\).'
  },
  {
    t: 'ord',
    ti: 'FRQ Protocol: Modeling Scenario Workflow',
    q: 'Arrange the sequence of steps for approaching an AP Precalculus FRQ modeling scenario:',
    items: [
      'Read the problem context carefully and identify given variables, units, and rates of change.',
      'Examine given data values to determine the appropriate function family (linear, quadratic, or exponential).',
      'Write the general mathematical function setup with symbolic parameters before using the calculator.',
      'Use regression or system-solving on the graphing calculator to find specific parameter values.',
      'State the final model equation and answer the contextual question with correct 3-decimal precision and units.'
    ]
  },
  {
    t: 'cat',
    ti: 'Categorize: Rate of Change Behaviors',
    categories: ['Constant Rate of Change (Linear)', 'Linear Rate of Change (Quadratic)', 'Proportional Rate of Change (Exponential)'],
    items: [
      { s: '\\(f(x) = 4x - 7\\)', cat: 0 },
      { s: 'First differences of outputs are constant for equal \\(\\Delta x\\)', cat: 0 },
      { s: '\\(g(x) = 3x^2 + 2x - 1\\)', cat: 1 },
      { s: 'Second differences of outputs are constant for equal \\(\\Delta x\\)', cat: 1 },
      { s: '\\(h(x) = 5 \\cdot (1.2)^x\\)', cat: 2 },
      { s: 'Ratios of consecutive outputs are constant for equal \\(\\Delta x\\)', cat: 2 }
    ]
  }
];

D['appc-u1'] = [
  {
    t: 'qc',
    ti: 'Quick Check: End Behavior',
    q: 'What is the end behavior of \\(f(x) = -2x^3 + 5x\\)?',
    o: [
      'Up left, down right',
      'Up left, up right',
      'Down left, up right',
      'Down left, down right'
    ],
    a: 0,
    ex: 'Odd degree with negative leading coefficient: as x → -∞, f(x) → +∞ (up left); as x → +∞, f(x) → -∞ (down right).'
  },
  {
    t: 'fn',
    ti: 'Explorer: End Behavior of \\(x^n\\)',
    fns: [{ expr: 'x^n', color: '#1E3A6E', label: 'x^n' }],
    xrange: [-3, 3],
    yrange: [-15, 15],
    params: [{ name: 'n', label: 'Power n', min: 1, max: 5, step: 1, default: 3 }]
  },
  {
    t: 'num',
    ti: 'Calculation Lab: Average Rate of Change',
    q: 'Find the average rate of change of \\(f(x) = 2x^2 - 3x + 1\\) over the interval \\([1, 4]\\).',
    a: 7,
    tol: 0.01,
    h: 'Compute [f(4) - f(1)] / (4 - 1).',
    sol: '\\(f(4) = 2(16) - 12 + 1 = 21\\). \\(f(1) = 2(1) - 3 + 1 = 0\\). \\(\\text{AROC} = \\dfrac{21 - 0}{4 - 1} = \\dfrac{21}{3} = 7\\).'
  },
  {
    t: 'ord',
    ti: 'Rational Functions Protocol: Graphing Workflow',
    q: 'Arrange the logical steps to analyze and sketch a rational function \\(R(x) = \\dfrac{P(x)}{Q(x)}\\):',
    items: [
      'Factor both the numerator and denominator completely.',
      'Identify common factors to locate removable discontinuities (holes).',
      'Set remaining denominator factors to zero to find vertical asymptotes.',
      'Compare degrees of numerator and denominator to determine horizontal or slant asymptotes.',
      'Find intercepts and test signs on each interval to sketch the curve.'
    ]
  },
  {
    t: 'cat',
    ti: 'Classify Discontinuities of Rational Functions',
    categories: ['Removable Discontinuity (Hole)', 'Vertical Asymptote'],
    items: [
      { s: 'Factor \\((x - 3)\\) cancels completely from both numerator and denominator', cat: 0 },
      { s: 'Factor \\((x + 1)\\) remains in the denominator after full simplification', cat: 1 },
      { s: '\\(f(x) = \\dfrac{x^2 - 4}{x - 2}\\) at \\(x = 2\\)', cat: 0 },
      { s: '\\(f(x) = \\dfrac{x + 5}{x - 4}\\) at \\(x = 4\\)', cat: 1 },
      { s: 'Limit \\(\\lim_{x \\to c} f(x)\\) exists as a finite real value', cat: 0 },
      { s: 'One-sided limits approach \\(\\pm\\infty\\) as \\(x \\to c\\)', cat: 1 }
    ]
  },
  {
    t: 'sr',
    ti: 'Worked Example: Holes vs. Vertical Asymptotes',
    steps: [
      'Find the vertical asymptotes and holes of \\(f(x)=\\dfrac{(x-2)(x+3)}{(x-2)(x-1)}\\). The factor \\((x-2)\\) is common to numerator and denominator, so it cancels — this creates a hole at \\(x=2\\), not an asymptote.',
      'After cancelling, \\(f(x)=\\dfrac{x+3}{x-1}\\) for \\(x\\neq2\\).',
      'The remaining denominator zero, \\(x=1\\), doesn\'t cancel — it\'s a vertical asymptote.'
    ]
  }
];

D['appc-u2'] = [
  {
    t: 'qc',
    ti: 'Quick Check: Exponential Base and Growth Factor',
    q: 'If \\(f(x) = 500(1.08)^x\\), what is the continuous percentage growth rate per unit of \\(x\\)?',
    o: ['8%', '108%', '0.08%', '1.08%'],
    a: 0,
    ex: 'The base \\(b = 1.08 = 1 + 0.08\\), representing an 8% increase per unit increase in \\(x\\).'
  },
  {
    t: 'fn',
    ti: 'Explorer: Shifted Log \\(\\ln(x-h)\\)',
    fns: [{ expr: 'ln(x-h)', color: '#1E3A6E', label: 'ln(x-h)' }],
    xrange: [-2, 8],
    yrange: [-3, 3],
    params: [{ name: 'h', label: 'Shift h', min: -2, max: 2, step: 1, default: 0 }]
  },
  {
    t: 'num',
    ti: 'Calculation Lab: Solve Logarithmic Equation',
    q: 'Solve for \\(x\\): \\(\\log_3(2x + 1) = 4\\).',
    a: 40,
    tol: 0.01,
    h: 'Rewrite in exponential form: 2x + 1 = 3^4 = 81.',
    sol: '\\(2x + 1 = 81 \\implies 2x = 80 \\implies x = 40\\).'
  },
  {
    t: 'ord',
    ti: 'Algebra Protocol: Solving Exponential Equations via Natural Logs',
    q: 'Arrange the steps for solving \\(4 \\cdot 3^{2x} = 36\\):',
    items: [
      'Divide both sides by 4 to isolate the exponential expression: \\(3^{2x} = 9\\).',
      'Take the natural logarithm of both sides: \\(\\ln(3^{2x}) = \\ln(9)\\).',
      'Apply the logarithm power rule to bring down the exponent: \\(2x \\ln(3) = \\ln(9)\\).',
      'Divide both sides by \\(2\\ln(3)\\): \\(x = \\dfrac{\\ln(9)}{2\\ln(3)}\\).',
      'Recognize that \\(\\ln(9) = \\ln(3^2) = 2\\ln(3)\\) to simplify to the exact integer solution \\(x = 1\\).'
    ]
  },
  {
    t: 'cat',
    ti: 'Categorize: Exponential vs Logarithmic Behaviors',
    categories: ['Exponential Function f(x) = b^x (b > 1)', 'Logarithmic Function g(x) = log_b(x) (b > 1)'],
    items: [
      { s: 'Domain is all real numbers \\((-\\infty, \\infty)\\)', cat: 0 },
      { s: 'Has horizontal asymptote \\(y = 0\\)', cat: 0 },
      { s: 'Passes through point \\((0, 1)\\)', cat: 0 },
      { s: 'Domain is strictly positive reals \\((0, \\infty)\\)', cat: 1 },
      { s: 'Has vertical asymptote \\(x = 0\\)', cat: 1 },
      { s: 'Passes through point \\((1, 0)\\)', cat: 1 }
    ]
  },
  {
    t: 'sr',
    ti: 'Worked Example: Half-Life Model',
    steps: [
      'A substance decays as \\(A(t)=A_0e^{-0.1t}\\). Find the time to reach half its original amount: set \\(A(t)=\\dfrac{A_0}{2}\\), so \\(A_0e^{-0.1t}=\\dfrac{A_0}{2}\\).',
      'Divide by \\(A_0\\) and take the natural log: \\(-0.1t=\\ln\\left(\\dfrac12\\right)\\).',
      'Solve: \\(t=\\dfrac{\\ln(1/2)}{-0.1}=\\dfrac{-0.693}{-0.1}\\approx6.93\\).'
    ]
  }
];

D['appc-u3'] = [
  {
    t: 'tf',
    ti: 'Reasoning Lab: Polar Coordinates',
    items: [
      { s: '\\(x = r\\cos\\theta,\\ y = r\\sin\\theta\\)', a: true, ex: 'Polar-to-Cartesian conversion.' },
      { s: '\\(r^2 = x^2 + y^2\\)', a: true, ex: 'Pythagorean relation.' },
      { s: '\\(r = a\\) is a straight line.', a: false, ex: 'r = a is a circle centered at the origin of radius a.' },
      { s: '\\(\\tan\\theta = y / x\\)', a: true, ex: 'Standard polar angle relation.' }
    ]
  },
  {
    t: 'fn',
    ti: 'Explorer: Vertical Stretch \\(A\\cdot\\tan(x)\\)',
    fns: [{ expr: 'A*tan(x)', color: '#1E3A6E', label: 'A·tan(x)' }],
    xrange: [-3, 3],
    yrange: [-5, 5],
    params: [{ name: 'A', label: 'Stretch A', min: 0.5, max: 2, step: 0.5, default: 1 }]
  },
  {
    t: 'num',
    ti: 'Calculation Lab: Period of Sinusoidal Function',
    q: 'Determine the period of the sinusoidal function \\(f(t) = 5\\cos(4\\pi t - \\pi) + 7\\). (Enter as a decimal)',
    a: 0.5,
    tol: 0.01,
    h: 'Period = 2π / B where B = 4π.',
    sol: '\\(\\text{Period} = \\dfrac{2\\pi}{4\\pi} = \\dfrac{1}{2} = 0.5\\).'
  },
  {
    t: 'ord',
    ti: 'Trigonometry Protocol: Solving Trigonometric Equations',
    q: 'Arrange the steps to solve \\(2\\sin^2(\\theta) - \\sin(\\theta) - 1 = 0\\) for \\(\\theta \\in [0, 2\\pi)\\):',
    items: [
      'Treat as a quadratic in sin(θ) and factor into (2 sin(θ) + 1)(sin(θ) - 1) = 0.',
      'Set each factor to zero to obtain sin(θ) = -1/2 and sin(θ) = 1.',
      'Find reference angle π/6 for sin(θ) = -1/2 and quadrant angles.',
      'Determine the third and fourth quadrant solutions for sin(θ) = -1/2: 7π/6 and 11π/6.',
      'Combine with the solution for sin(θ) = 1 (θ = π/2) to form the complete solution set.'
    ]
  },
  {
    t: 'cat',
    ti: 'Classify Polar and Cartesian Equations',
    categories: ['Represents a Circle', 'Represents a Straight Line'],
    items: [
      { s: 'Polar equation \\(r = 5\\)', cat: 0 },
      { s: 'Polar equation \\(\\theta = \\frac{\\pi}{4}\\)', cat: 1 },
      { s: 'Cartesian equation \\(x^2 + y^2 = 16\\)', cat: 0 },
      { s: 'Cartesian equation \\(y = 3x - 2\\)', cat: 1 },
      { s: 'Polar equation \\(r = 6\\cos\\theta\\)', cat: 0 },
      { s: 'Polar equation \\(r\\cos\\theta = 4\\)', cat: 1 }
    ]
  },
  {
    t: 'sr',
    ti: 'Worked Example: Evaluate a Tangent Value',
    steps: [
      'Evaluate \\(\\tan\\left(\\dfrac{5\\pi}{4}\\right)\\). This angle is in the third quadrant (\\(\\pi\\) to \\(\\frac{3\\pi}{2}\\)), where tangent is positive.',
      'The reference angle is \\(\\dfrac{5\\pi}{4}-\\pi=\\dfrac{\\pi}{4}\\).',
      '\\(\\tan\\left(\\dfrac{\\pi}{4}\\right)=1\\), so \\(\\tan\\left(\\dfrac{5\\pi}{4}\\right)=1\\).'
    ]
  }
];

D['appc-u4'] = [
  {
    t: 'qc',
    ti: 'Quick Check: Matrix Invertibility',
    q: 'For what value of \\(k\\) is the matrix \\(\\begin{pmatrix} 2 & k \\\\ 4 & 6 \\end{pmatrix}\\) non-invertible (singular)?',
    o: ['3', '2', '6', '12'],
    a: 0,
    ex: '\\(\\det = 2(6) - 4k = 12 - 4k = 0 \\implies 4k = 12 \\implies k = 3\\).'
  },
  {
    t: 'fn',
    ti: 'Explorer: Parameters \\(a\\cdot\\sin(x)+c\\)',
    fns: [{ expr: 'a*sin(x)+c', color: '#1E3A6E', label: 'a·sin(x)+c' }],
    xrange: [-6.3, 6.3],
    yrange: [-4, 4],
    params: [
      { name: 'a', label: 'Amplitude a', min: 0.5, max: 2, step: 0.5, default: 1 },
      { name: 'c', label: 'Vertical shift c', min: -2, max: 2, step: 0.5, default: 0 }
    ]
  },
  {
    t: 'num',
    ti: 'Calculation Lab: Function Composition',
    q: 'If \\(f(x) = 3x - 2\\) and \\(g(x) = x^2 + 4\\), evaluate \\((g \\circ f)(3)\\).',
    a: 53,
    tol: 0.01,
    h: 'Find f(3) = 3(3) - 2 = 7, then evaluate g(7).',
    sol: '\\(f(3) = 3(3) - 2 = 7\\). \\(g(7) = 7^2 + 4 = 49 + 4 = 53\\).'
  },
  {
    t: 'ord',
    ti: 'Parametric Protocol: Eliminating a Parameter',
    q: 'Arrange the steps to eliminate the parameter \\(t\\) from \\(x(t) = 2\\cos(t)\\), \\(y(t) = 3\\sin(t)\\):',
    items: [
      'Isolate the trigonometric terms: cos(t) = x/2 and sin(t) = y/3.',
      'Apply the Pythagorean identity cos²(t) + sin²(t) = 1.',
      'Substitute the expressions into the identity: (x/2)² + (y/3)² = 1.',
      'Simplify to obtain the standard ellipse equation x²/4 + y²/9 = 1.'
    ]
  },
  {
    t: 'cat',
    ti: 'Classify Mathematical Representations',
    categories: ['Parametric Representation', 'Vector / Matrix Representation'],
    items: [
      { s: 'Coordinate pair functions \\(x(t) = 3\\cos(t), y(t) = 3\\sin(t)\\)', cat: 0 },
      { s: 'Matrix transformation \\(\\begin{pmatrix} x\' \\\\ y\' \\end{pmatrix} = \\begin{pmatrix} 0 & -1 \\\\ 1 & 0 \\end{pmatrix}\\begin{pmatrix} x \\\\ y \\end{pmatrix}\\)', cat: 1 },
      { s: 'Projectile motion path \\(x(t) = v_0 \\cos(\\theta) t, y(t) = v_0 \\sin(\\theta) t - \\frac{1}{2}gt^2\\)', cat: 0 },
      { s: 'Vector dot product \\(\\mathbf{u} \\cdot \\mathbf{v} = u_1 v_1 + u_2 v_2\\)', cat: 1 },
      { s: 'Eliminating time \\(t\\) to find Cartesian path equation', cat: 0 },
      { s: 'Determinant test \\(ad - bc \\neq 0\\) for invertibility', cat: 1 }
    ]
  },
  {
    t: 'sr',
    ti: 'Worked Example: Effect of a Parameter',
    steps: [
      'How does changing \\(k\\) in \\(f(x)=a(x-h)^2+k\\) affect the graph? The parameter \\(k\\) is the constant added last, outside any transformation of \\(x\\).',
      'Adding a constant \\(k\\) to a function shifts the entire graph vertically.',
      'If \\(k>0\\) the graph shifts up by \\(k\\) units; if \\(k<0\\) it shifts down by \\(|k|\\) units.'
    ]
  }
];

});
