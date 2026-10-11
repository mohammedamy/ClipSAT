/* Interactive Practice data for /act2/ - one entry per chapter section id.
   Shipped as public/js/ix/act2.js and loaded only on that track's page by the
   engine in src/scripts/modules/19-interactive-activities-engine-v1.js
   (Plan 5 Phase 5.015, ADR 0033). Entry shapes (qc/mt/tf/sb/sr/fn/num/ord/cat)
   are documented there. */
(window.__ixData = window.__ixData || []).push(function (D) {

D['act2-about'] = [
  {t:'qc',ti:'Quick Check: ACT Advanced Math Strategy',q:'Which content domain accounts for the largest proportion of questions in the ACT Math Section?',o:['Algebra + Functions (about 34–40% combined)','Geometry alone (about 17–20%)','Statistics & Probability (about 12–15%)','Number & Quantity (about 10–12%)'],a:0,ex:'Algebra (17–20%) and Functions (17–20%) together are the backbone of the test, about 34–40%. Geometry is 17–20%, Statistics & Probability 12–15%, Number & Quantity 10–12%. Matrices, vectors and complex numbers sit inside these categories and separate scores in the 28–36 range.'},
  {t:'mt',ti:'Matching: Advanced ACT Math Mastery',p:[{l:'Complex Numbers',r:'Powers of i cycle mod 4 (i⁴ = 1)'},{l:'Matrices',r:'Multiplication requires inner dimensions match'},{l:'Trig Identities',r:'sin²θ + cos²θ = 1 and double angle identities'},{l:'Logarithm Rules',r:'log(ab) = log a + log b'}]},
  {t:'cat',ti:'Categorize: Question Difficulty & Priority',categories:['Speed Pass 1 (Questions 1–25)','Tactical Pass 2 (Questions 26–45)','Deep-Dive Pass 3 (Questions 46–50)'],items:[
    {s:'Linear equations, basic proportions, right triangle trig',cat:0},
    {s:'Single-step percentages, arithmetic mean, slope-intercept',cat:0},
    {s:'Logarithm laws, quadratic systems, circle equations',cat:1},
    {s:'Matrix operations, Law of Sines/Cosines, composite functions',cat:1},
    {s:'Multi-step modular arithmetic, complex fraction proofs',cat:2},
    {s:'3D geometry solid intersections, non-routine combinatorics',cat:2}
  ],sol:'A disciplined 3-pass strategy guarantees all reachable points are banked early, preserving peak concentration for high-yield discriminating questions.'},
  {t:'num',ti:'ACT Subject Math Pacing Calculation',q:'The ACT Subject Test in Mathematics has 50 questions in 60 minutes. How many seconds on average are available per question?',a:72,tol:0.1,h:'Divide 3600 total seconds by 50 questions.',sol:'3600 / 50 = 72 seconds per question.'},
  {t:'ord',ti:'Order the Three-Pass Attack Strategy for ACT Math 2',q:'Arrange the sequence to maximize scores on the 50-question ACT Subject Math test:',items:[
    'Pass 1 (Questions 1–25, ~20 min): bank all fast, standard algebra and geometry points rapidly',
    'Pass 2 (Questions 26–45, ~25 min): methodical solving of mid-level functions, trig, and coordinate geometry',
    'Pass 3 (Questions 46–50, ~12 min): tackle non-routine multi-step pre-calculus and matrix items',
    'Final Review (~3 min): verify flagged questions and confirm every single answer bubble is filled'
  ],sol:'A disciplined 3-pass strategy guarantees all reachable points are banked early.'}
];

D['act2-numbers'] = [
  {t:'sr',ti:'Worked Example: Least Common Multiple',steps:[
    'Find the LCM of 12 and 18. Find prime factorizations: \\(12=2^2\\times3\\), \\(18=2\\times3^2\\).',
    'LCM takes the highest power of each prime: \\(2^2\\times3^2\\).',
    '\\(4\\times9=36\\). The LCM is 36.'
  ]},
  {t:'qc',ti:'Quick Check: Greatest Common Factor',q:'GCF of 24 and 36:',o:['12','6','18','24'],a:0,ex:'\\(24=2^3\\times3\\), \\(36=2^2\\times3^2\\); GCF\\(=2^2\\times3=12\\).'},
  {t:'num',ti:'Numeric Entry: Units Digit of Powers',q:'What is the units digit of \\(3^{45}\\)?',a:3,tol:0.01,h:'Find 45 mod 4 to determine position in the power cycle.',ex:'Powers of 3 have units digits cycling with period 4: 3¹=3, 3²=9, 3³=27 (7), 3⁴=81 (1). 45 mod 4 = 1, so the units digit is 3.'},
  {t:'ord',ti:'Order the Steps: Evaluating Powers of i',q:'Arrange the sequence to evaluate \\(i^{87}\\):',items:[
    'Identify the exponent \\(k = 87\\)',
    'Divide the exponent by 4 to find the integer quotient and remainder: \\(87 = 4 \\times 21 + 3\\) (remainder 3)',
    'Rewrite the power using the cycle of 4: \\(i^{87} = (i^4)^{21} \\cdot i^3\\)',
    'Substitute \\(i^4 = 1\\): \\((1)^{21} \\cdot i^3 = 1 \\cdot i^3 = i^3\\)',
    'Evaluate the final value: since \\(i^3 = -i\\), conclude \\(i^{87} = -i\\)'
  ],sol:'Powers of i cycle mod 4: remainder 1 gives i, remainder 2 gives -1, remainder 3 gives -i, remainder 0 gives 1.'},
  {t:'cat',ti:'Classify Sequence Types by Characteristic',categories:['Arithmetic Sequence','Geometric Sequence'],items:[
    {s:'Constant common difference: \\(a_{n+1} - a_n = d\\)',cat:0},
    {s:'Constant common ratio: \\(a_{n+1} / a_n = r\\)',cat:1},
    {s:'General term formula: \\(a_n = a_1 + (n-1)d\\)',cat:0},
    {s:'General term formula: \\(a_n = a_1 r^{n-1}\\)',cat:1},
    {s:'Partial sum: \\(S_n = \\frac{n}{2}(a_1 + a_n)\\)',cat:0},
    {s:'Infinite sum exists when \\(|r| < 1\\): \\(S_\\infty = \\frac{a_1}{1-r}\\)',cat:1}
  ],sol:'Arithmetic sequences advance by adding a common difference d; geometric sequences advance by multiplying by a common ratio r.'}
];

D['act2-algebra'] = [
  {t:'qc',ti:'Quick Check: Factoring',q:'Factor completely: \\(2x^3-8x\\)',o:['2x(x²−4)','2x(x−2)(x+2)','2(x³−4x)','x(2x²−8)'],a:1,ex:'\\(2x(x^2-4)=2x(x-2)(x+2)\\).'},
  {t:'num',ti:'Numeric Entry: 2×2 Matrix Determinant',q:'Calculate the determinant of the matrix \\(\\begin{pmatrix} 5 & -2 \\\\ 3 & 4 \\end{pmatrix}\\).',a:26,tol:0.01,h:'Determinant is ad - bc.',ex:'det = ad - bc = (5)(4) - (-2)(3) = 20 - (-6) = 20 + 6 = 26.'},
  {t:'sr',ti:'Worked Example: Nonlinear System',steps:[
    'Solve \\(y=x^2\\) and \\(y=2x+3\\). Set the expressions for \\(y\\) equal: \\(x^2=2x+3\\).',
    'Rearrange: \\(x^2-2x-3=0\\Rightarrow(x-3)(x+1)=0\\).',
    'Solutions: \\(x=3\\) or \\(x=-1\\), with \\(y=9\\) or \\(y=1\\).'
  ]},
  {t:'ord',ti:'Order the Steps: Multiplying 2x2 Matrices',q:'Arrange the sequence to compute \\(AB\\) for \\(2 \\times 2\\) matrices \\(A\\) and \\(B\\):',items:[
    'Verify that inner dimensions match: \\((2 \\times 2) \\times (2 \\times 2) = (2 \\times 2)\\)',
    'Compute entry (1,1): Row 1 of \\(A\\) dot Column 1 of \\(B\\) (\\(a_{11}b_{11} + a_{12}b_{21}\\))',
    'Compute entry (1,2): Row 1 of \\(A\\) dot Column 2 of \\(B\\) (\\(a_{11}b_{12} + a_{12}b_{22}\\))',
    'Compute entry (2,1): Row 2 of \\(A\\) dot Column 1 of \\(B\\) (\\(a_{21}b_{11} + a_{22}b_{21}\\))',
    'Compute entry (2,2): Row 2 of \\(A\\) dot Column 2 of \\(B\\) (\\(a_{21}b_{12} + a_{22}b_{22}\\))'
  ],sol:'Matrix multiplication computes row-by-column dot products for each resulting entry.'},
  {t:'cat',ti:'Classify Logarithmic vs. Exponential Operations',categories:['Logarithmic Identity','Exponential Law'],items:[
    {s:'\\(\\log_b(xy) = \\log_b x + \\log_b y\\)',cat:0},
    {s:'\\(b^x \\cdot b^y = b^{x+y}\\)',cat:1},
    {s:'\\(\\log_b(x^n) = n\\log_b x\\)',cat:0},
    {s:'\\((b^x)^y = b^{xy}\\)',cat:1},
    {s:'\\(\\log_b(x/y) = \\log_b x - \\log_b y\\)',cat:0},
    {s:'\\(b^x / b^y = b^{x-y}\\)',cat:1}
  ],sol:'Exponents and logarithms are inverse operations obeying parallel additive and multiplicative transformation laws.'}
];

D['act2-functions'] = [
  {t:'mt',ti:'Matching: Advanced Functions',p:[{l:'Even function',r:'f(−x)=f(x)'},{l:'Odd function',r:'f(−x)=−f(x)'},{l:'H. asymptote when n<m',r:'y=0'},{l:'Change of base',r:'log_a(b)=ln b/ln a'}]},
  {t:'ord',ti:'Order the Steps: Finding an Inverse Function',prompt:'Arrange the algebraic steps to determine \\(f^{-1}(x)\\) for \\(f(x) = \\dfrac{3x+4}{x-2}\\):',items:[
    'Set y equal to f(x): y = (3x + 4) / (x - 2)',
    'Multiply both sides by denominator (x - 2) to obtain y(x - 2) = 3x + 4',
    'Expand and collect all terms containing x on one side: xy - 3x = 2y + 4',
    'Factor out x: x(y - 3) = 2y + 4',
    'Divide by (y - 3) and swap variables to obtain f⁻¹(x) = (2x + 4) / (x - 3)'
  ],ex:'Isolating x systematically through clearing the denominator and factoring yields the inverse formula.'},
  {t:'sr',ti:'Worked Example: Asymptotes of a Rational Function',steps:[
    'Find the asymptotes of \\(f(x)=\\dfrac{2x}{x-3}\\). Vertical asymptote: set denominator to zero: \\(x-3=0\\Rightarrow x=3\\).',
    'Horizontal asymptote: numerator and denominator have the same degree, so take the ratio of leading coefficients: \\(\\dfrac21=2\\).',
    'Vertical asymptote \\(x=3\\); horizontal asymptote \\(y=2\\).'
  ]},
  {t:'num',ti:'Nested Composite Function Evaluation',q:'If \\(f(x) = 3x - 2\\) and \\(g(x) = x^2 + 4\\), find the value of \\(f(g(2))\\).',a:22,tol:0.01,h:'Compute g(2) first: 2² + 4 = 8. Then evaluate f(8).',sol:'\\(g(2) = 2^2 + 4 = 8\\). Then \\(f(8) = 3(8) - 2 = 24 - 2 = 22\\).'},
  {t:'cat',ti:'Classify Rational Function Asymptote Types',categories:['Horizontal Asymptote y = 0','Horizontal Asymptote y = c (c ≠ 0)','Slant / Oblique Asymptote'],items:[
    {s:'Degree of numerator < degree of denominator',cat:0},
    {s:'Degree of numerator = degree of denominator',cat:1},
    {s:'Degree of numerator = degree of denominator + 1',cat:2},
    {s:'\\(f(x) = \\frac{2x+1}{x^2+3}\\)',cat:0},
    {s:'\\(f(x) = \\frac{4x^2 - 1}{2x^2 + 5}\\)',cat:1},
    {s:'\\(f(x) = \\frac{x^3 + 2}{x^2 - 1}\\)',cat:2}
  ],sol:'Degree comparison dictates end behavior: n < m yields y=0; n = m yields leading coefficient ratio; n = m + 1 yields a slant asymptote.'}
];

D['act2-trig'] = [
  {t:'tf',ti:'True or False: Advanced Trig',items:[{s:'\\(\\sin^2\\theta+\\cos^2\\theta=1\\)',a:true,ex:'Fundamental identity.'},{s:'Period of \\(\\sin(2x)=2\\pi\\)',a:false,ex:'Period \\(=\\pi\\).'},{s:'\\(\\arcsin(\\sin\\theta)=\\theta\\) for all \\(\\theta\\)',a:false,ex:'Only for \\(\\theta\\in[-\\pi/2,\\,\\pi/2]\\).'},{s:'\\(\\sec\\theta=\\frac{1}{\\cos\\theta}\\)',a:true,ex:'Definition of secant.'}]},
  {t:'num',ti:'Numeric Entry: Sinusoidal Amplitude',q:'Find the amplitude of the sinusoidal function \\(y = -4\\cos(3x - \\pi) + 5\\).',a:4,tol:0.01,h:'Amplitude is the absolute value of the leading coefficient.',ex:'Amplitude is the absolute value of the leading coefficient: |A| = |-4| = 4.'},
  {t:'sr',ti:'Worked Example: Solve a Trig Equation with Two Solutions',steps:[
    'Solve \\(2\\cos\\theta=-1\\) for \\(0°\\le\\theta<360°\\). Isolate cosine: \\(\\cos\\theta=-\\dfrac12\\).',
    'Reference angle: \\(\\arccos\\left(\\dfrac12\\right)=60°\\).',
    'Cosine is negative in Quadrants II and III: \\(\\theta=180°-60°=120°\\) or \\(\\theta=180°+60°=240°\\).'
  ]},
  {t:'ord',ti:'Order the Steps: Solving Trig Equations',q:'Arrange the steps to solve \\(2\\sin(x) - \\sqrt{3} = 0\\) on the interval \\([0, 2\\pi)\\):',items:[
    'Isolate the trigonometric function: \\(\\sin(x) = \\frac{\\sqrt{3}}{2}\\)',
    'Determine the reference angle in Quadrant I: \\(x_{\\text{ref}} = \\frac{\\pi}{3}\\) (or 60°)',
    'Identify quadrants where sine is positive: Quadrant I and Quadrant II',
    'Calculate the Quadrant I solution: \\(x_1 = \\frac{\\pi}{3}\\)',
    'Calculate the Quadrant II solution: \\(x_2 = \\pi - \\frac{\\pi}{3} = \\frac{2\\pi}{3}\\)'
  ],sol:'Isolate the trig function, find the reference angle, determine sign quadrants, and write all valid angle solutions.'},
  {t:'cat',ti:'Classify Triangle Trigonometry Formulas',categories:['Right Triangle Only (SOH CAH TOA)','Any Triangle (Oblique & General)'],items:[
    {s:'\\(\\sin\\theta = \\frac{\\text{opposite}}{\\text{hypotenuse}}\\)',cat:0},
    {s:'Law of Cosines: \\(c^2 = a^2 + b^2 - 2ab\\cos C\\)',cat:1},
    {s:'\\(\\tan\\theta = \\frac{\\text{opposite}}{\\text{adjacent}}\\)',cat:0},
    {s:'Law of Sines: \\(\\frac{\\sin A}{a} = \\frac{\\sin B}{b} = \\frac{\\sin C}{c}\\)',cat:1},
    {s:'Pythagorean Theorem: \\(a^2 + b^2 = c^2\\)',cat:0},
    {s:'Area formula: \\(\\text{Area} = \\frac{1}{2}ab\\sin C\\)',cat:1}
  ],sol:'SOH CAH TOA applies exclusively to right triangles; Laws of Sines, Cosines, and 1/2 ab sin C apply universally.'}
];

D['act2-precalc'] = [
  {t:'sb',ti:'Step Builder: Sum of 3+6+12+24+48',steps:[{l:'First term \\(a=\\)',a:'3',h:'3'},{l:'Common ratio \\(r=\\)',a:'2',h:'6÷3=2'},{l:'\\(2^5=\\)',a:'32',h:'32'},{l:'\\(S_5=3\\cdot\\frac{32-1}{1}=3\\times31=\\)',a:'93',h:'93'}]},
  {t:'num',ti:'Numeric Entry: Sum of Infinite Geometric Series',q:'Evaluate the sum of the infinite geometric series \\(12 + 6 + 3 + 1.5 + \\cdots\\).',a:24,tol:0.01,h:'S = a1 / (1 - r) where a1 = 12 and r = 0.5.',ex:'a₁ = 12, r = 6/12 = 0.5. Since |r| < 1, S = a₁ / (1 - r) = 12 / (1 - 0.5) = 12 / 0.5 = 24.'},
  {t:'fn',ti:'Explorer: \\(A\\cdot\\sin(Bx)\\)',fns:[{expr:'A*sin(B*x)',color:'#1E3A6E',label:'A·sin(Bx)'}],xrange:[-6.3,6.3],yrange:[-2.5,2.5],params:[{name:'A',label:'Amplitude A',min:0.5,max:2,step:0.5,default:1},{name:'B',label:'Frequency B',min:0.5,max:2,step:0.5,default:1}]},
  {t:'sr',ti:'Worked Example: Vector Dot Product',steps:[
    'Find \\(\\vec u\\cdot\\vec v\\) for \\(\\vec u=\\langle2,3\\rangle\\) and \\(\\vec v=\\langle4,-1\\rangle\\). Formula: \\(\\vec u\\cdot\\vec v=u_1v_1+u_2v_2\\).',
    'Substitute: \\((2)(4)+(3)(-1)\\).',
    '\\(=8-3=5\\).'
  ]},
  {t:'ord',ti:'Order the Steps: Finding End-Behavior Limits',q:'Arrange the procedure to evaluate \\(\\lim_{x\\to\\infty} \\frac{6x^3 - 4x + 1}{2x^3 + 5x^2}\\):',items:[
    'Identify the highest power of x in the denominator: \\(x^3\\)',
    'Divide every term in both numerator and denominator by \\(x^3\\)',
    'Simplify each term: \\(\\frac{6 - 4/x^2 + 1/x^3}{2 + 5/x}\\)',
    'Apply limit rules as \\(x \\to \\infty\\): terms with \\(1/x^k \\to 0\\)',
    'Evaluate the remaining constant ratio: \\(\\frac{6 - 0 + 0}{2 + 0} = \\frac{6}{2} = 3\\)'
  ],sol:'Dividing by the highest power of x proves the limit is the ratio of leading coefficients.'},
  {t:'cat',ti:'Classify Conic Sections by Equation Structure',categories:['Circle','Ellipse','Hyperbola','Parabola'],items:[
    {s:'\\((x-h)^2 + (y-k)^2 = r^2\\)',cat:0},
    {s:'\\(\\frac{(x-h)^2}{a^2} + \\frac{(y-k)^2}{b^2} = 1\\) with \\(a \\neq b\\)',cat:1},
    {s:'\\(\\frac{(x-h)^2}{a^2} - \\frac{(y-k)^2}{b^2} = 1\\)',cat:2},
    {s:'\\(y = a(x-h)^2 + k\\)',cat:3},
    {s:'Difference of squared variable terms with minus sign',cat:2},
    {s:'Sum of squared terms with identical coefficients',cat:0}
  ],sol:'Circle has equal squared coefficients; ellipse has unequal same-sign squared terms; hyperbola has opposite-sign squared terms; parabola has only one squared variable.'}
];

D['act2-coordgeo'] = [
  {t:'fn',ti:'Explorer: Parabola \\(a(x-2)^2+1\\)',fns:[{expr:'a*(x-2)^2+1',color:'#1E3A6E',label:'a(x-2)^2+1'}],xrange:[-3,6],yrange:[-6,8],params:[{name:'a',label:'Coefficient a',min:-2,max:2,step:0.5,default:1}]},
  {t:'num',ti:'Numeric Entry: Circle Radius',q:'Find the radius of the circle defined by \\(x^2 + y^2 - 6x + 8y = 0\\).',a:5,tol:0.01,h:'Complete square on x and y: (x - 3)² + (y + 4)² = 9 + 16 = 25.',ex:'Complete the square: (x² - 6x + 9) + (y² + 8y + 16) = 9 + 16 = 25. Thus r² = 25 ⇒ r = 5.'},
  {t:'sr',ti:'Worked Example: Midpoint Formula',steps:[
    'Find the midpoint of \\((-3,5)\\) and \\((7,-1)\\). Formula: \\(\\left(\\dfrac{x_1+x_2}{2},\\dfrac{y_1+y_2}{2}\\right)\\).',
    'Substitute: \\(\\left(\\dfrac{-3+7}{2},\\dfrac{5+(-1)}{2}\\right)\\).',
    '\\(=(2,2)\\).'
  ]},
  {t:'qc',ti:'Quick Check: Vertical Lines',q:'The slope of a vertical line is:',o:['Undefined','0','1','−1'],a:0,ex:'Vertical lines have undefined slope (division by zero in the slope formula).'},
  {t:'ord',ti:'Order the Steps: Completing the Square for a Circle',q:'Arrange the steps to find the center and radius of \\(x^2 + y^2 - 6x + 8y = 0\\):',items:[
    'Group x-terms and y-terms together: \\((x^2 - 6x) + (y^2 + 8y) = 0\\)',
    'Compute half the linear coefficients: \\((-6/2) = -3\\) and \\((8/2) = 4\\)',
    'Square these values: \\((-3)^2 = 9\\) and \\(4^2 = 16\\)',
    'Add 9 and 16 to both sides of the equation: \\((x^2 - 6x + 9) + (y^2 + 8y + 16) = 25\\)',
    'Factor both binomial squares: \\((x - 3)^2 + (y + 4)^2 = 25\\)',
    'Identify center \\((3, -4)\\) and radius \\(r = \\sqrt{25} = 5\\)'
  ],sol:'Complete the square on both x and y to find the center (h, k) and radius r.'},
  {t:'cat',ti:'Classify Line Relationships by Slope Product',categories:['Parallel Lines','Perpendicular Lines','Neither (Oblique Intersection)'],items:[
    {s:'Equal slopes: \\(m_1 = m_2\\) with distinct y-intercepts',cat:0},
    {s:'Negative reciprocal slopes: \\(m_1 \\cdot m_2 = -1\\)',cat:1},
    {s:'\\(y = \\frac{2}{3}x + 4\\) and \\(y = -\\frac{3}{2}x - 1\\)',cat:1},
    {s:'\\(y = 4x - 5\\) and \\(y = 4x + 7\\)',cat:0},
    {s:'\\(y = 2x + 1\\) and \\(y = 3x - 4\\)',cat:2},
    {s:'Horizontal line \\(y = 2\\) and vertical line \\(x = -3\\)',cat:1}
  ],sol:'Parallel lines have identical slopes; perpendicular lines have negative reciprocal slopes (product = -1).'}
];

D['act2-planegeo'] = [
  {t:'num',ti:'Numeric Entry: Inscribed Angle Measure',q:'An inscribed angle intercepts a circle arc with a central angle of \\(110^\\circ\\). What is the measure of the inscribed angle in degrees?',a:55,tol:0.01,h:'Inscribed angle = 1/2 of central angle.',ex:'The inscribed angle theorem states that an angle inscribed in a circle is half the measure of its intercepted central angle: 110° / 2 = 55°.'},
  {t:'sr',ti:'Worked Example: Inscribed Angle Theorem',steps:[
    'An inscribed angle intercepts an arc of 80°. The Inscribed Angle Theorem states the inscribed angle is half the intercepted arc.',
    'Substitute: \\(\\dfrac{80°}{2}\\).',
    'The inscribed angle is \\(40°\\).'
  ]},
  {t:'qc',ti:'Quick Check: Exterior Angles',q:'Sum of exterior angles of any convex polygon:',o:['360°','180°','540°','720°'],a:0,ex:'The exterior angles of any convex polygon always sum to 360°.'},
  {t:'ord',ti:'Order the Steps: Heron\'s Formula Area Calculation',q:'Arrange the steps to find the area of a triangle with side lengths 7, 8, and 9:',items:[
    'Calculate the semi-perimeter \\(s = \\frac{a + b + c}{2}\\): \\(s = \\frac{7 + 8 + 9}{2} = 12\\)',
    'Compute the individual side differences: \\(s - a = 5\\), \\(s - b = 4\\), \\(s - c = 3\\)',
    'Form the product inside the radical: \\(s(s-a)(s-b)(s-c) = 12 \\times 5 \\times 4 \\times 3\\)',
    'Multiply the terms: \\(12 \\times 60 = 720\\)',
    'Extract the square root: \\(\\text{Area} = \\sqrt{720} = \\sqrt{144 \\times 5} = 12\\sqrt{5}\\)'
  ],sol:'Heron\'s formula computes triangle area directly from its three side lengths without requiring an altitude.'},
  {t:'cat',ti:'Classify Circle Theorems by Vertex Position',categories:['Vertex at Center','Vertex on Circle (Inscribed)','Vertex Inside Circle (Chords)','Vertex Outside Circle (Secants/Tangents)'],items:[
    {s:'Angle measure equals intercepted arc: \\(\\theta = \\text{arc}\\)',cat:0},
    {s:'Angle measure equals half the intercepted arc: \\(\\theta = \\frac{1}{2}\\text{arc}\\)',cat:1},
    {s:'Angle equals half the sum of intercepted arcs: \\(\\theta = \\frac{1}{2}(\\text{arc}_1 + \\text{arc}_2)\\)',cat:2},
    {s:'Angle equals half the difference of intercepted arcs: \\(\\theta = \\frac{1}{2}(\\text{arc}_1 - \\text{arc}_2)\\)',cat:3},
    {s:'Central angle of a circle',cat:0},
    {s:'Angle inscribed in a semicircle is a right angle (90°)',cat:1}
  ],sol:'The vertex location dictates the formula: center (equal), circumference (half), interior (half-sum), exterior (half-difference).'}
];

D['act2-stats'] = [
  {t:'num',ti:'Numeric Entry: Combinations',q:'Evaluate \\(\\binom{7}{3}\\), the number of ways to choose 3 items from 7.',a:35,tol:0.01,h:'7C3 = (7 × 6 × 5) / (3 × 2 × 1).',ex:'7C3 = (7 × 6 × 5) / (3 × 2 × 1) = 210 / 6 = 35.'},
  {t:'sr',ti:'Worked Example: Permutations',steps:[
    'How many ways can 4 different books be arranged on a shelf? Since order matters, use permutations: arranging \\(n\\) distinct items in a row is \\(n!\\).',
    'Substitute \\(n=4\\): \\(4!=4\\times3\\times2\\times1\\).',
    '\\(=24\\) arrangements.'
  ]},
  {t:'qc',ti:'Quick Check: Mutually Exclusive Events',q:'\\(P(A\\text{ or }B)\\) for mutually exclusive events:',o:['\\(P(A)+P(B)\\)','\\(P(A)\\times P(B)\\)','\\(P(A)-P(B)\\)','\\(P(A\\cap B)\\)'],a:0,ex:'For mutually exclusive events, \\(P(A\\text{ or }B)=P(A)+P(B)\\).'},
  {t:'ord',ti:'Order the Steps: Calculating Expected Value',q:'Arrange the procedure to compute the expected value \\(E(X)\\) of a game:',items:[
    'List all possible numeric outcomes \\(x_i\\) for the random variable',
    'Determine the corresponding probability \\(P(X = x_i)\\) for each outcome',
    'Verify that all probabilities sum to exactly 1: \\(\\sum P(X = x_i) = 1\\)',
    'Multiply each outcome by its probability: \\(x_i \\cdot P(X = x_i)\\)',
    'Sum all the products to obtain the expected value: \\(E(X) = \\sum x_i P(X = x_i)\\)'
  ],sol:'Expected value is the probability-weighted average of all possible numerical outcomes.'},
  {t:'cat',ti:'Classify Counting Techniques by Scenario',categories:['Permutation (Order Matters)','Combination (Order Does Not Matter)'],items:[
    {s:'Choosing 3 representatives from a student council of 15',cat:1},
    {s:'Ranking 1st, 2nd, and 3rd place in an essay contest',cat:0},
    {s:'Selecting 5 cards from a standard deck of 52',cat:1},
    {s:'Setting a 4-digit security PIN where digits cannot repeat',cat:0},
    {s:'Forming a 4-person doubles tennis team from 10 players',cat:1},
    {s:'Assigning officers: President, Vice President, Secretary',cat:0}
  ],sol:'When roles, order, or positions matter, use permutations nPr; when only group membership matters, use combinations nCr.'}
];

});
