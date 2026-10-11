/* Interactive Practice data for /aslevel/ - one entry per chapter section id.
   Shipped as public/js/ix/aslevel.js and loaded only on that track's page by the
   engine in src/scripts/modules/19-interactive-activities-engine-v1.js
   (Plan 5 Phase 5.015, ADR 0033). Entry shapes (qc/mt/tf/sb/sr/fn/num/ord/cat) are
   documented there. */
(window.__ixData = window.__ixData || []).push(function (D) {
D['as-about']=[
  {t:'qc',ti:'Quick Check: Cambridge AS Level Mathematics Structure',q:'Which two exam papers typically make up the Cambridge International AS Level Mathematics qualification?',o:['Paper 1: Pure Mathematics 1 and Paper 4: Mechanics OR Paper 5: Probability & Statistics 1','Paper 1 and Paper 2 only','Paper 3: Pure Mathematics 3 and Paper 6 only','Paper 2: Mechanics only'],a:0,ex:'AS Level Math combines Pure Mathematics 1 (P1, 1 hr 50 min) with either Mechanics (M1 / P4) or Probability & Statistics 1 (S1 / P5, 1 hr 15 min each).'},
  {t:'mt',ti:'Matching: AS Level Exam Command Words',p:[{l:'Show that',r:'Provide full intermediate algebraic steps leading to the given answer'},{l:'Hence',r:'You MUST use the preceding result to complete the step'},{l:'State',r:'Write down the answer without extensive calculation'},{l:'Exact value',r:'Leave answer in terms of surds, π, or simplified fractions'}]},
  {t:'num',ti:'Numeric Entry: Paper 1 Raw Marks',q:'How many total marks are available on Cambridge 9709 Paper 1 (Pure Mathematics 1)?',a:75,ex:'Paper 1 has 75 total marks and a duration of 1 hour 50 minutes (110 minutes).'},
  {t:'ord',ti:'Order the Steps: Tackling a Multi-Step Cambridge 9709 Question',prompt:'Arrange the recommended logical steps when solving an AS Level exam question:',items:[
    'Read the problem stem carefully and verify radian or degree mode.',
    'Formulate the governing algebraic or geometric identity clearly.',
    'Carry out all intermediate calculations without premature rounding.',
    'State final non-exact answers to 3 significant figures (or 1 d.p. for degrees).'
  ],ex:'Read conditions, state formula, manipulate accurately, and apply Cambridge precision standard.'},
  {t:'cat',ti:'Categorize: Cambridge 9709 Components',categories:['Pure Mathematics','Applied Mathematics'],items:[
    {s:'Paper 1 (Pure Mathematics 1)',cat:'Pure Mathematics'},
    {s:'Paper 2 (Pure Mathematics 2)',cat:'Pure Mathematics'},
    {s:'Paper 4 (Mechanics)',cat:'Applied Mathematics'},
    {s:'Paper 5 (Probability & Statistics 1)',cat:'Applied Mathematics'}
  ],ex:'P1 and P2 are pure papers; P4 and P5 are applied mechanics and statistics.'}
];

D['as-algebra']=[
  {t:'qc',ti:'Quick Check: Surds',q:'Simplify \\(\\sqrt{48}\\)',o:['4√3','6√2','2√12','8√3'],a:0,ex:'\\(\\sqrt{16\\times3}=4\\sqrt{3}\\).'},
  {t:'num',ti:'Numeric Entry: Value of Discriminant',q:'Find the discriminant \\(\\Delta = b^2 - 4ac\\) for the quadratic \\(x^2 - 6x + 9 = 0\\).',a:0,ex:'\\(\\Delta = (-6)^2 - 4(1)(9) = 36 - 36 = 0\\), indicating a single repeated real root.'},
  {t:'ord',ti:'Order the Steps: Completing the Square',prompt:'Arrange the steps to express \\(x^2 + 6x + 14\\) in vertex form \\((x+p)^2 + q\\):',items:[
    'Identify the coefficient of x: half of 6 is 3.',
    'Write the squared binomial: \\((x + 3)^2\\).',
    'Subtract the square of 3: \\((x + 3)^2 - 9\\).',
    'Add the original constant: \\((x + 3)^2 - 9 + 14\\).',
    'Simplify to vertex form: \\((x + 3)^2 + 5\\).'
  ],ex:'Halve coefficient, form squared term, subtract square, add constant, and simplify.'},
  {t:'cat',ti:'Categorize: Nature of Roots via Discriminant',categories:['Two Distinct Real Roots','One Repeated Real Root','No Real Roots'],items:[
    {s:'\\(\\Delta = 16\\)',cat:'Two Distinct Real Roots'},
    {s:'\\(\\Delta = 0\\)',cat:'One Repeated Real Root'},
    {s:'\\(\\Delta = -7\\)',cat:'No Real Roots'},
    {s:'Parabola crosses the x-axis twice',cat:'Two Distinct Real Roots'},
    {s:'Parabola touches the x-axis tangentially',cat:'One Repeated Real Root'},
    {s:'Parabola does not intersect the x-axis',cat:'No Real Roots'}
  ],ex:'Positive discriminant gives 2 roots, zero gives 1 repeated root, negative gives no real roots.'},
  {t:'sr',ti:'Worked Example: Nature of Roots via Discriminant',steps:[
    'Determine the nature of the roots of \\(2x^2-3x+5=0\\). Compute \\(\\Delta=b^2-4ac\\).',
    '\\(\\Delta=(-3)^2-4(2)(5)=9-40=-31\\).',
    'Since \\(\\Delta<0\\), the equation has no real roots.'
  ]}
];

D['as-equations']=[
  {t:'mt',ti:'Matching: Modulus Inequalities',p:[{l:'|x| < a',r:'−a < x < a'},{l:'|x| > a',r:'x<−a or x>a'},{l:'|x−c| < r',r:'c−r < x < c+r'},{l:'|x−c| > r',r:'x<c−r or x>c+r'}]},
  {t:'num',ti:'Numeric Entry: Positive Root of Modulus Equation',q:'Find the positive value of \\(x\\) satisfying \\(|2x - 3| = 11\\).',a:7,ex:'\\(2x - 3 = 11 \\implies 2x = 14 \\implies x = 7\\). (The negative root is \\(2x - 3 = -11 \\implies x = -4\\)).'},
  {t:'ord',ti:'Order the Steps: Solving a Linear-Quadratic System',prompt:'Arrange the steps to solve \\(y = 2x - 1\\) and \\(y = x^2 - 4\\) simultaneously:',items:[
    'Substitute the linear expression for y into the quadratic: \\(2x - 1 = x^2 - 4\\).',
    'Rearrange into standard quadratic form: \\(x^2 - 2x - 3 = 0\\).',
    'Factor the quadratic equation: \\((x - 3)(x + 1) = 0\\).',
    'Solve for the two x-values: \\(x = 3\\) and \\(x = -1\\).',
    'Substitute back into \\(y = 2x - 1\\) to find coordinates \\((3, 5)\\) and \\((-1, -3)\\).'
  ],ex:'Substitute, rearrange, factor, find x, and find corresponding y values.'},
  {t:'cat',ti:'Categorize: Solution Sets of Inequalities',categories:['Bounded Interval (Between Roots)','Two Disjoint Rays (Outside Roots)'],items:[
    {s:'\\(x^2 - 4 < 0\\)',cat:'Bounded Interval (Between Roots)'},
    {s:'\\(|x| < 5\\)',cat:'Bounded Interval (Between Roots)'},
    {s:'\\((x - 2)(x - 6) \\le 0\\)',cat:'Bounded Interval (Between Roots)'},
    {s:'\\(x^2 - 9 > 0\\)',cat:'Two Disjoint Rays (Outside Roots)'},
    {s:'\\(|x| > 3\\)',cat:'Two Disjoint Rays (Outside Roots)'},
    {s:'\\((x + 1)(x - 4) \\ge 0\\)',cat:'Two Disjoint Rays (Outside Roots)'}
  ],ex:'Less than 0 for positive parabolas yields a bounded interval; greater than 0 yields two disjoint rays.'},
  {t:'sr',ti:'Worked Example: Linear–Quadratic System',steps:[
    'Solve simultaneously: \\(y=x+1\\) and \\(y=x^2-x-1\\). Substitute the linear equation into the quadratic.',
    '\\(x+1=x^2-x-1\\Rightarrow x^2-2x-2=0\\).',
    'By the quadratic formula: \\(x=\\dfrac{2\\pm\\sqrt{4+8}}{2}=1\\pm\\sqrt3\\).'
  ]},
  {t:'qc',ti:'Quick Check: Quadratic Inequality',q:'Solve \\(x^2-9>0\\).',o:['x<−3 or x>3','−3<x<3','x>3','x<−3'],a:0,ex:'Roots \\(\\pm3\\); the curve is above the axis outside the roots.'}
];

D['as-functions']=[
  {t:'num',ti:'Numeric Entry: Minimum Value of Quadratic Function',q:'What is the minimum value of \\(f(x) = (x - 4)^2 + 9\\)?',a:9,ex:'Since \\((x-4)^2 \\ge 0\\), the minimum value occurs at \\(x=4\\) and equals 9.'},
  {t:'ord',ti:'Order the Steps: Function Transformations',prompt:'Arrange the transformations required to produce \\(y = 3f(x - 2) + 5\\) from \\(y = f(x)\\):',items:[
    'Translate horizontally 2 units to the right: \\(y = f(x - 2)\\).',
    'Stretch vertically by scale factor 3: \\(y = 3f(x - 2)\\).',
    'Translate vertically 5 units upwards: \\(y = 3f(x - 2) + 5\\).'
  ],ex:'Apply horizontal translation first, then vertical stretch, then vertical translation.'},
  {t:'cat',ti:'Categorize: Transformations of y = f(x)',categories:['Horizontal Effect','Vertical Effect'],items:[
    {s:'\\(y = f(x + 3)\\)',cat:'Horizontal Effect'},
    {s:'\\(y = f(2x)\\)',cat:'Horizontal Effect'},
    {s:'\\(y = f(-x)\\)',cat:'Horizontal Effect'},
    {s:'\\(y = f(x) - 4\\)',cat:'Vertical Effect'},
    {s:'\\(y = 5f(x)\\)',cat:'Vertical Effect'},
    {s:'\\(y = -f(x)\\)',cat:'Vertical Effect'}
  ],ex:'Modifications inside parentheses affect x horizontally; outside operations affect y vertically.'},
  {t:'fn',ti:'Explorer: Translation \\(y=(x-h)^2+k\\)',fns:[{expr:'(x-h)^2+k',color:'#1E3A6E'}],xrange:[-6,6],yrange:[-4,10],params:[{name:'h',label:'Horizontal shift h',min:-3,max:3,step:1,default:0},{name:'k',label:'Vertical shift k',min:-3,max:5,step:1,default:0}]},
  {t:'sr',ti:'Worked Example: Combining Transformations',steps:[
    'Describe \\(y=2(x+1)^2-3\\) relative to \\(y=x^2\\). Identify each transformation in order.',
    'The factor 2 stretches vertically by scale factor 2. The \\((x+1)\\) shifts 1 unit left.',
    'The \\(-3\\) shifts 3 units down. Combined: vertical stretch ×2, then translate 1 left and 3 down.'
  ]},
  {t:'qc',ti:'Quick Check: Reflection',q:'The graph of \\(y=f(x)\\) is reflected in the \\(y\\)-axis. What is the new equation?',o:['y=f(−x)','y=−f(x)','y=f(x)+1','y=−f(−x)'],a:0,ex:'Reflection in the \\(y\\)-axis replaces \\(x\\) with \\(-x\\): \\(y=f(-x)\\).'}
];

D['as-coordgeo']=[
  {t:'num',ti:'Numeric Entry: Circle Radius Squared',q:'The circle \\((x - 3)^2 + (y + 4)^2 = 49\\) has center \\((3, -4)\\). What is \\(r^2\\)?',a:49,ex:'The standard form is \\((x-a)^2 + (y-b)^2 = r^2\\), so \\(r^2 = 49\\) (and radius \\(r = 7\\)).'},
  {t:'ord',ti:'Order the Steps: Finding Tangent to Circle',prompt:'Arrange the steps to find the tangent line to \\(x^2 + y^2 = 25\\) at point \\((3, 4)\\):',items:[
    'Calculate the gradient of the radius from center \\((0,0)\\) to \\((3,4)\\): \\(m_r = 4/3\\).',
    'Find perpendicular tangent gradient via negative reciprocal: \\(m_t = -3/4\\).',
    'Apply point-slope equation: \\(y - 4 = -3/4(x - 3)\\).',
    'Rearrange into standard equation: \\(3x + 4y = 25\\).'
  ],ex:'Find radial slope, take negative reciprocal for tangent slope, and write linear equation.'},
  {t:'cat',ti:'Categorize: Relationships of Two Lines',categories:['Parallel Lines','Perpendicular Lines'],items:[
    {s:'Gradients: \\(m_1 = 3\\) and \\(m_2 = 3\\)',cat:'Parallel Lines'},
    {s:'Gradients: \\(m_1 = -0.5\\) and \\(m_2 = -0.5\\)',cat:'Parallel Lines'},
    {s:'Gradients: \\(m_1 = 2\\) and \\(m_2 = -0.5\\)',cat:'Perpendicular Lines'},
    {s:'Gradients: \\(m_1 = -3/4\\) and \\(m_2 = 4/3\\)',cat:'Perpendicular Lines'},
    {s:'Product of gradients: \\(m_1 m_2 = -1\\)',cat:'Perpendicular Lines'}
  ],ex:'Equal gradients define parallel lines; product \\(m_1 m_2 = -1\\) defines perpendicular lines.'},
  {t:'fn',ti:'Explorer: Perpendicular Lines',fns:[{expr:'2*x-1',color:'#1E3A6E',label:'y=2x−1'},{expr:'-0.5*x+4',color:'#B8801F',label:'perpendicular'}],xrange:[-5,5],yrange:[-6,8]},
  {t:'sr',ti:'Worked Example: Tangent to a Circle',steps:[
    'Find the equation of the tangent to the circle \\(x^2+y^2=25\\) at the point \\((3,4)\\). The radius to \\((3,4)\\) has gradient \\(\\tfrac43\\).',
    'The tangent is perpendicular to the radius, so its gradient is \\(-\\tfrac34\\).',
    'Using \\(y-4=-\\tfrac34(x-3)\\): \\(y=-\\tfrac34x+\\tfrac{25}{4}\\).'
  ]},
  {t:'qc',ti:'Quick Check: Circle Equation',q:'A circle has centre \\((2,-3)\\) and radius 4. State its equation.',o:['(x−2)²+(y+3)²=16','(x+2)²+(y−3)²=16','(x−2)²+(y+3)²=4','(x−2)²+(y−3)²=16'],a:0,ex:'\\((x-a)^2+(y-b)^2=r^2\\) with \\((a,b)=(2,-3)\\), \\(r=4\\).'}
];

D['as-trig']=[
  {t:'tf',ti:'True or False: AS Trigonometry',items:[{s:'\\(1+\\tan^2\\theta=\\sec^2\\theta\\)',a:true,ex:'Pythagorean identity.'},{s:'Cosine rule: \\(a^2=b^2+c^2-2bc\\cos A\\)',a:true,ex:'Standard cosine rule.'},{s:'\\(\\tan(A+B)=\\tan A+\\tan B\\)',a:false,ex:'\\(\\tan(A+B)=\\frac{\\tan A+\\tan B}{1-\\tan A\\tan B}\\).'},{s:'Sine rule: \\(\\frac{a}{\\sin A}=\\frac{b}{\\sin B}\\)',a:true,ex:'Standard sine rule.'}]},
  {t:'num',ti:'Numeric Entry: Right-Angled Trig Ratio',q:'If \\(\\tan\\theta = 3/4\\) and \\(\\theta\\) is acute, what is the value of \\(5\\sin\\theta\\)?',a:3,ex:'With opposite 3 and adjacent 4, hypotenuse is 5, so \\(\\sin\\theta = 3/5\\) and \\(5\\sin\\theta = 3\\).'},
  {t:'ord',ti:'Order the Steps: Solving 2sin²x - sin x - 1 = 0',prompt:'Arrange the steps to solve \\(2\\sin^2 x - \\sin x - 1 = 0\\) for \\(0° \\le x \\le 360°\\):',items:[
    'Factor the quadratic in \\(\\sin x\\): \\((2\\sin x + 1)(\\sin x - 1) = 0\\).',
    'Set each factor to zero: \\(\\sin x = -1/2\\) or \\(\\sin x = 1\\).',
    'Solve \\(\\sin x = 1\\) to get \\(x = 90°\\).',
    'Solve \\(\\sin x = -1/2\\) in Quadrants III & IV to get \\(x = 210°\\) and \\(x = 330°\\).',
    'Collect all valid solutions: \\(x = 90°, 210°, 330°\\).'
  ],ex:'Factor, isolate trig factors, find principal and quadrant solutions, and list all in range.'},
  {t:'cat',ti:'Categorize: Signs in Trig Quadrants',categories:['Positive in Quadrant II','Positive in Quadrant III','Positive in Quadrant IV'],items:[
    {s:'\\(\\sin x\\) for \\(90° < x < 180°\\)',cat:'Positive in Quadrant II'},
    {s:'\\(\\tan x\\) for \\(180° < x < 270°\\)',cat:'Positive in Quadrant III'},
    {s:'\\(\\cos x\\) for \\(270° < x < 360°\\)',cat:'Positive in Quadrant IV'}
  ],ex:'ASTC mnemonic: All in Q1, Sine in Q2, Tan in Q3, Cos in Q4.'},
  {t:'sr',ti:'Worked Example: Solving a Quadratic Trig Equation',steps:[
    'Solve \\(2\\cos^2\\theta+\\cos\\theta-1=0\\) for \\(0°\\le\\theta\\le360°\\). Let \\(x=\\cos\\theta\\) and factor.',
    '\\(2x^2+x-1=(2x-1)(x+1)=0\\), so \\(x=\\tfrac12\\) or \\(x=-1\\).',
    '\\(\\cos\\theta=\\tfrac12\\) gives \\(\\theta=60°,300°\\). \\(\\cos\\theta=-1\\) gives \\(\\theta=180°\\).'
  ]},
  {t:'qc',ti:'Quick Check: Sine Rule',q:'In triangle ABC, \\(a=8\\), \\(A=40°\\), \\(B=65°\\). Find \\(b\\) (nearest 0.1).',o:['11.3','9.1','7.3','12.5'],a:0,ex:'\\(b=\\dfrac{a\\sin B}{\\sin A}=\\dfrac{8\\sin65°}{\\sin40°}\\approx11.3\\).'}
];

D['as-calculus']=[
  {t:'sb',ti:'Step Builder: Differentiate \\(y=x^3-4x^2+3x\\)',steps:[{l:'\\(\\frac{d}{dx}(x^3)=\\)',a:'3x^2',h:'3x²'},{l:'\\(\\frac{d}{dx}(-4x^2)=\\)',a:'-8x',h:'−8x'},{l:'\\(\\frac{d}{dx}(3x)=\\)',a:'3',h:'3'},{l:'\\(\\frac{dy}{dx}=\\)',a:'3x^2-8x+3',h:'Sum all terms'}]},
  {t:'num',ti:'Numeric Entry: Tangent Gradient',q:'Find the gradient of the curve \\(y = x^3 - 5x + 2\\) at \\(x = 2\\).',a:7,ex:'\\(\\frac{dy}{dx} = 3x^2 - 5\\). At \\(x = 2\\), \\(\\frac{dy}{dx} = 3(4) - 5 = 12 - 5 = 7\\).'},
  {t:'ord',ti:'Order the Steps: Classifying Stationary Points',prompt:'Arrange the steps to find and classify stationary points of \\(y = x^3 - 3x\\):',items:[
    'Differentiate to find the gradient function: \\(\\frac{dy}{dx} = 3x^2 - 3\\).',
    'Set \\(\\frac{dy}{dx} = 0\\) and solve: \\(3x^2 - 3 = 0 \\implies x = \\pm 1\\).',
    'Calculate the second derivative: \\(\\frac{d^2y}{dx^2} = 6x\\).',
    'At \\(x = 1\\), \\(\\frac{d^2y}{dx^2} = 6 > 0\\), indicating a local minimum.',
    'At \\(x = -1\\), \\(\\frac{d^2y}{dx^2} = -6 < 0\\), indicating a local maximum.'
  ],ex:'Find derivative, set to zero for stationary points, evaluate second derivative to classify.'},
  {t:'cat',ti:'Categorize: Calculus Operations on Powers of x',categories:['Differentiation','Integration'],items:[
    {s:'Multiply by power and reduce exponent by 1',cat:'Differentiation'},
    {s:'Rate of change and gradient of tangent line',cat:'Differentiation'},
    {s:'Velocity \\(v = \\frac{ds}{dt}\\) from displacement',cat:'Differentiation'},
    {s:'Increase exponent by 1 and divide by new exponent',cat:'Integration'},
    {s:'Area trapped under a curve between x = a and x = b',cat:'Integration'},
    {s:'Include constant of integration \\(+ C\\)',cat:'Integration'}
  ],ex:'Differentiation reduces power and finds slopes; integration increases power and finds areas.'},
  {t:'sr',ti:'Worked Example: Area Between a Curve and a Line',steps:[
    'Find the area enclosed between \\(y=x^2\\) and \\(y=4\\). First find the intersection points: \\(x^2=4\\Rightarrow x=\\pm2\\).',
    'Area \\(=\\displaystyle\\int_{-2}^{2}(4-x^2)\\,dx\\). Antiderivative: \\(F(x)=4x-\\tfrac{x^3}{3}\\).',
    '\\(F(2)-F(-2)=\\tfrac{16}{3}-\\left(-\\tfrac{16}{3}\\right)=\\tfrac{32}{3}\\approx10.67\\).'
  ]},
  {t:'qc',ti:'Quick Check: Stationary Points',q:'Find the \\(x\\)-coordinate of the stationary point of \\(y=x^2-6x+5\\).',o:['3','6','-3','0'],a:0,ex:'\\(\\dfrac{dy}{dx}=2x-6=0\\Rightarrow x=3\\).'}
];

D['as-stats']=[
  {t:'num',ti:'Numeric Entry: Independent Events Intersection',q:'If \\(P(A) = 0.6\\) and \\(P(B) = 0.5\\) are independent, what is \\(100 \\times P(A \\cap B)\\)?',a:30,ex:'For independent events, \\(P(A \\cap B) = P(A)P(B) = 0.6 \\times 0.5 = 0.30\\). Thus \\(100 \\times 0.30 = 30\\).'},
  {t:'ord',ti:'Order the Steps: Evaluating Conditional Probability',prompt:'Arrange the steps to find \\(P(A|B)\\):',items:[
    'Identify the given conditioning event B.',
    'Find the joint probability of both events occurring: \\(P(A \\cap B)\\).',
    'Find the total probability of the condition: \\(P(B)\\).',
    'Divide the intersection by the condition: \\(P(A|B) = \\frac{P(A \\cap B)}{P(B)}\\).'
  ],ex:'Identify condition, compute joint probability, compute condition probability, and divide.'},
  {t:'cat',ti:'Categorize: Probability Event Classifications',categories:['Mutually Exclusive','Independent'],items:[
    {s:'\\(P(A \\cap B) = 0\\)',cat:'Mutually Exclusive'},
    {s:'Events cannot happen simultaneously',cat:'Mutually Exclusive'},
    {s:'\\(P(A \\cup B) = P(A) + P(B)\\)',cat:'Mutually Exclusive'},
    {s:'\\(P(A \\cap B) = P(A) \\times P(B)\\)',cat:'Independent'},
    {s:'Occurrence of A does not alter probability of B',cat:'Independent'},
    {s:'\\(P(A|B) = P(A)\\)',cat:'Independent'}
  ],ex:'Mutually exclusive events cannot overlap; independent events do not affect each other.'},
  {t:'sr',ti:'Worked Example: Conditional Probability',steps:[
    'A box has 5 red and 3 blue balls. Two are drawn without replacement. Find \\(P(\\text{second is red}\\mid\\text{first is red})\\).',
    'After removing one red ball, 4 red and 3 blue remain — 7 balls total.',
    '\\(P(\\text{second red}\\mid\\text{first red})=\\dfrac47\\).'
  ]},
  {t:'qc',ti:'Quick Check: Mean from a Frequency Table',q:'Scores 2, 4, 6 have frequencies 3, 5, 2. Find the mean.',o:['3.8','4.0','3.5','4.2'],a:0,ex:'Mean \\(=\\dfrac{2(3)+4(5)+6(2)}{10}=\\dfrac{38}{10}=3.8\\).'}
];

D['as-funcs']=[
  {t:'num',ti:'Numeric Entry: Evaluating Composite Function',q:'If \\(f(x) = 2x + 1\\) and \\(g(x) = x^2\\), find \\(fg(3)\\).',a:19,ex:'\\(g(3) = 3^2 = 9\\), then \\(f(9) = 2(9) + 1 = 18 + 1 = 19\\).'},
  {t:'ord',ti:'Order the Steps: Finding Inverse Function f⁻¹(x)',prompt:'Arrange the steps to find \\(f^{-1}(x)\\) for \\(f(x) = \\frac{3x - 1}{2}\\):',items:[
    'Set \\(y = \\frac{3x - 1}{2}\\).',
    'Multiply both sides by 2: \\(2y = 3x - 1\\).',
    'Add 1 to both sides: \\(2y + 1 = 3x\\).',
    'Divide by 3 to isolate x: \\(x = \\frac{2y + 1}{3}\\).',
    'Swap variable y for x: \\(f^{-1}(x) = \\frac{2x + 1}{3}\\).'
  ],ex:'Equate to y, clear denominator, isolate x algebraically, and write inverse in terms of x.'},
  {t:'cat',ti:'Categorize: Domain vs Range Concepts',categories:['Domain of f','Range of f'],items:[
    {s:'Set of allowable input x-values',cat:'Domain of f'},
    {s:'Horizontal span along the x-axis',cat:'Domain of f'},
    {s:'Identical to the range of \\(f^{-1}\\)',cat:'Domain of f'},
    {s:'Set of all possible output values',cat:'Range of f'},
    {s:'Vertical span along the y-axis',cat:'Range of f'},
    {s:'Identical to the domain of \\(f^{-1}\\)',cat:'Range of f'}
  ],ex:'Domain is allowable inputs (x); range is resulting outputs (y); inverted for f⁻¹.'},
  {t:'fn',ti:'Explorer: Function and Inverse \\(y=3x-2\\)',fns:[{expr:'3*x-2',color:'#1E3A6E',label:'f(x)'},{expr:'(x+2)/3',color:'#B8801F',label:'f⁻¹(x)'}],xrange:[-4,6],yrange:[-6,10]},
  {t:'sr',ti:'Worked Example: Domain and Range of a Composite',steps:[
    'Given \\(f(x)=x^2+1\\) (\\(x\\ge0\\)) and \\(g(x)=\\sqrt x\\) (\\(x\\ge0\\)), find \\(fg(x)\\) and its range.',
    '\\(fg(x)=f(\\sqrt x)=(\\sqrt x)^2+1=x+1\\).',
    'Since \\(x\\ge0\\), \\(fg(x)\\ge1\\). Range: \\(fg(x)\\ge1\\).'
  ]},
  {t:'qc',ti:'Quick Check: Inverse Function',q:'If \\(f(x)=\\dfrac{x-4}{2}\\), find \\(f^{-1}(x)\\).',o:['2x+4','2x−4','(x+4)/2','x/2+4'],a:0,ex:'\\(y=\\dfrac{x-4}{2}\\Rightarrow x=2y+4\\), so \\(f^{-1}(x)=2x+4\\).'}
];

D['as-radians']=[
  {t:'num',ti:'Numeric Entry: Arc Length',q:'A circle has radius 6 cm. Find the arc length (in cm) subtended by an angle of 1.5 radians.',a:9,ex:'Arc length \\(s = r\\theta = 6 \\times 1.5 = 9\\) cm.'},
  {t:'ord',ti:'Order the Steps: Finding Area of a Circular Segment',prompt:'Arrange the steps to compute the area of a minor segment in radians:',items:[
    'Verify that the central angle \\(\\theta\\) is expressed in radians.',
    'Compute the total area of the sector: \\(A_{\\text{sector}} = \\frac{1}{2}r^2\\theta\\).',
    'Compute the area of the isosceles triangle: \\(A_{\\Delta} = \\frac{1}{2}r^2\\sin\\theta\\).',
    'Subtract the triangle area from the sector area: \\(A_{\\text{seg}} = \\frac{1}{2}r^2(\\theta - \\sin\\theta)\\).'
  ],ex:'Verify radian mode, calculate sector area, calculate triangle area, and subtract.'},
  {t:'cat',ti:'Categorize: Angle Measurement Standards',categories:['Radians','Degrees'],items:[
    {s:'Angle of a straight line is \\(\\pi\\)',cat:'Radians'},
    {s:'Arc length formula is directly \\(s = r\\theta\\)',cat:'Radians'},
    {s:'Full circle revolution is \\(2\\pi\\)',cat:'Radians'},
    {s:'Angle of a straight line is 180°',cat:'Degrees'},
    {s:'Full circle revolution is 360°',cat:'Degrees'},
    {s:'Requires conversion factor \\(\\frac{\\pi}{180}\\) for calculus',cat:'Degrees'}
  ],ex:'Radians are natural circular units for calculus and arc length; degrees require conversion.'},
  {t:'sr',ti:'Worked Example: Arc Length from Degrees',steps:[
    'A sector has radius 10 cm and angle \\(75°\\). Convert the angle to radians: \\(\\theta=75°\\times\\tfrac{\\pi}{180}=\\tfrac{5\\pi}{12}\\).',
    'Arc length \\(s=r\\theta=10\\times\\tfrac{5\\pi}{12}=\\tfrac{50\\pi}{12}\\).',
    'Simplify: \\(s=\\tfrac{25\\pi}{6}\\approx13.1\\) cm.'
  ]},
  {t:'qc',ti:'Quick Check: Sector Area',q:'Find the area of a sector with radius 6 cm and angle 2 radians.',o:['36 cm²','12 cm²','72 cm²','18 cm²'],a:0,ex:'\\(A=\\tfrac12r^2\\theta=\\tfrac12\\times36\\times2=36\\) cm².'}
];

D['as-series']=[
  {t:'num',ti:'Numeric Entry: Sum to Infinity Ratio',q:'A GP has first term \\(a = 4\\) and sum to infinity \\(S_\\infty = 16\\). What is the value of \\(100r\\)?',a:75,ex:'\\(S_\\infty = \\frac{a}{1-r} \\implies 16 = \\frac{4}{1-r} \\implies 1-r = 0.25 \\implies r = 0.75\\). Hence \\(100r = 75\\).'},
  {t:'ord',ti:'Order the Steps: Expanding (1 + 3x)⁴',prompt:'Arrange the terms in ascending powers of x for \\((1 + 3x)^4\\):',items:[
    'Constant term: \\(\\binom{4}{0} = 1\\).',
    'Term in x: \\(\\binom{4}{1}(3x) = 12x\\).',
    'Term in x²: \\(\\binom{4}{2}(3x)^2 = 6(9x^2) = 54x^2\\).',
    'Term in x³: \\(\\binom{4}{3}(3x)^3 = 4(27x^3) = 108x^3\\).',
    'Term in x⁴: \\(\\binom{4}{4}(3x)^4 = 81x^4\\).'
  ],ex:'Ascending expansion: 1 + 12x + 54x² + 108x³ + 81x⁴.'},
  {t:'cat',ti:'Categorize: Sequences & Progressions',categories:['Arithmetic Progression (AP)','Geometric Progression (GP)'],items:[
    {s:'Common difference \\(d = u_n - u_{n-1}\\)',cat:'Arithmetic Progression (AP)'},
    {s:'\\(n\\)-th term: \\(u_n = a + (n-1)d\\)',cat:'Arithmetic Progression (AP)'},
    {s:'Sum formula: \\(S_n = \\frac{n}{2}(2a + (n-1)d)\\)',cat:'Arithmetic Progression (AP)'},
    {s:'Common ratio \\(r = u_n / u_{n-1}\\)',cat:'Geometric Progression (GP)'},
    {s:'\\(n\\)-th term: \\(u_n = a r^{n-1}\\)',cat:'Geometric Progression (GP)'},
    {s:'Convergent sum to infinity when \\(|r| < 1\\)',cat:'Geometric Progression (GP)'}
  ],ex:'AP has constant difference; GP has constant ratio and possible infinite sum.'},
  {t:'sr',ti:'Worked Example: Binomial Expansion',steps:[
    'Expand \\((1+2x)^4\\) up to the term in \\(x^2\\), using \\((1+y)^n=1+ny+\\tfrac{n(n-1)}2y^2\\) with \\(y=2x\\), \\(n=4\\).',
    'Term 1: 1. Term 2: \\(4(2x)=8x\\).',
    'Term 3: \\(\\tfrac{4\\times3}{2}(2x)^2=6\\times4x^2=24x^2\\). Expansion: \\(1+8x+24x^2+\\cdots\\).'
  ]},
  {t:'qc',ti:'Quick Check: Geometric Sum',q:'Find \\(S_6\\) for the geometric series with \\(a=3,\\ r=2\\).',o:['189','96','192','186'],a:0,ex:'\\(S_6=\\dfrac{3(2^6-1)}{2-1}=3\\times63=189\\).'}
];

D['as-mechanics']=[
  {t:'num',ti:'Numeric Entry: Final Velocity',q:'A particle accelerates from rest with \\(a = 2.5\\text{ m/s}^2\\) for 6 seconds. What is its velocity in m/s?',a:15,ex:'Using \\(v = u + at\\): \\(v = 0 + 2.5(6) = 15\\) m/s.'},
  {t:'ord',ti:'Order the Steps: Solving a SUVAT Problem',prompt:'Arrange the logical steps to solve a constant acceleration problem:',items:[
    'Choose a positive reference direction and write down known values (s, u, v, a, t).',
    'Identify which unknown parameter the question asks you to determine.',
    'Select the SUVAT equation linking the target unknown to the known values.',
    'Substitute values and solve algebraically for the unknown quantity.',
    'Verify that units are standard (m, s, m/s, m/s²) and sign matches chosen direction.'
  ],ex:'Set direction, list SUVAT variables, pick formula, solve algebraically, and check units.'},
  {t:'cat',ti:'Categorize: Features of Velocity-Time Graphs',categories:['Gradient of Graph','Area Under Graph'],items:[
    {s:'Instantaneous acceleration of the particle',cat:'Gradient of Graph'},
    {s:'Horizontal flat line represents zero acceleration',cat:'Gradient of Graph'},
    {s:'Negative slope indicates deceleration',cat:'Gradient of Graph'},
    {s:'Total displacement traveled by the particle',cat:'Area Under Graph'},
    {s:'Trapezium formula \\(\\frac{u+v}{2} \\times t\\)',cat:'Area Under Graph'},
    {s:'Distance during constant velocity stage \\(v \\times t\\)',cat:'Area Under Graph'}
  ],ex:'Gradient gives acceleration; area beneath velocity curve gives displacement.'},
  {t:'sr',ti:'Worked Example: Two-Stage Motion',steps:[
    'A car accelerates from rest at 3 m/s² for 4 s, then travels at constant velocity for 6 s. Find the velocity after the acceleration phase.',
    '\\(v=u+at=0+3(4)=12\\) m/s. Distance in phase 1: \\(s_1=\\tfrac12at^2=\\tfrac12(3)(16)=24\\) m.',
    'Phase 2 distance: \\(s_2=vt=12\\times6=72\\) m. Total distance \\(=24+72=96\\) m.'
  ]},
  {t:'qc',ti:'Quick Check: SUVAT',q:'A ball is thrown upward with \\(u=20\\) m/s. Find its velocity after 3 s (\\(g=10\\) m/s², up positive).',o:['−10 m/s','10 m/s','−30 m/s','50 m/s'],a:0,ex:'\\(v=u-gt=20-10(3)=-10\\) m/s (moving downward).'}
];

D['as-forces']=[
  {t:'num',ti:'Numeric Entry: Normal Reaction Force',q:'A crate of mass 20 kg rests on a smooth horizontal floor (\\(g = 10\\text{ m/s}^2\\)). What is the normal reaction force in Newtons?',a:200,ex:'In vertical equilibrium: \\(R = mg = 20 \\times 10 = 200\\) N.'},
  {t:'ord',ti:'Order the Steps: Resolving Forces on an Incline',prompt:'Arrange the steps to find acceleration down a rough plane inclined at angle θ:',items:[
    'Draw a clear diagram showing weight \\(mg\\), normal reaction \\(R\\), and friction \\(F\\).',
    'Resolve weight into perpendicular and parallel components: \\(mg\\cos\\theta\\) and \\(mg\\sin\\theta\\).',
    'Equate perpendicular forces: \\(R = mg\\cos\\theta\\).',
    'Calculate maximum friction: \\(F_{\\text{max}} = \\mu R = \\mu mg\\cos\\theta\\).',
    'Apply Newton\'s second law down the slope: \\(mg\\sin\\theta - F = ma\\).'
  ],ex:'Diagram forces, resolve weight into components, find normal reaction, calculate friction, and apply F = ma.'},
  {t:'cat',ti:'Categorize: Equilibrium vs Accelerated Motion',categories:['Equilibrium (F_net = 0)','Accelerating (F_net = ma)'],items:[
    {s:'Resultant force vector sum is zero',cat:'Equilibrium (F_net = 0)'},
    {s:'Particle remains stationary or moves at constant velocity',cat:'Equilibrium (F_net = 0)'},
    {s:'Opposing forces along each axis balance completely',cat:'Equilibrium (F_net = 0)'},
    {s:'Net non-zero resultant force acts on particle',cat:'Accelerating (F_net = ma)'},
    {s:'Velocity changes in magnitude or direction',cat:'Accelerating (F_net = ma)'},
    {s:'Acceleration equals net force divided by mass',cat:'Accelerating (F_net = ma)'}
  ],ex:'Equilibrium means zero resultant force; non-zero net force causes acceleration.'},
  {t:'sr',ti:'Worked Example: Equilibrium of Three Forces',steps:[
    'A particle is in equilibrium under forces 12 N due North, 5 N due East, and a third force F. For equilibrium, F must balance the resultant of the other two.',
    'Resultant of 12 N and 5 N (perpendicular): \\(R=\\sqrt{12^2+5^2}=\\sqrt{169}=13\\) N.',
    '\\(|F|=13\\) N, directed opposite to that resultant.'
  ]},
  {t:'qc',ti:'Quick Check: Resolving a Force',q:'A force of 20 N acts at 30° above the horizontal. Find its horizontal component.',o:['17.3 N','10 N','20 N','5.2 N'],a:0,ex:'\\(F_x=F\\cos\\theta=20\\cos30°\\approx17.3\\) N.'}
];

D['as-newton']=[
  {t:'num',ti:'Numeric Entry: Newton\'s Second Law',q:'A constant resultant force of 48 N accelerates a block of mass 6 kg. What is the acceleration in m/s²?',a:8,ex:'\\(F = ma \\implies a = \\frac{F}{m} = \\frac{48}{6} = 8\\text{ m/s}^2\\).'},
  {t:'ord',ti:'Order the Steps: Connected Particles Over a Pulley',prompt:'Arrange the steps to find the acceleration of two masses m₁ and m₂ (m₁ > m₂) connected by a string over a light smooth pulley:',items:[
    'Draw separate free-body diagrams for mass m₁ (moving down) and mass m₂ (moving up).',
    'Label string tension T pulling upwards on both masses.',
    'Write Newton\'s second law for m₁: \\(m_1 g - T = m_1 a\\).',
    'Write Newton\'s second law for m₂: \\(T - m_2 g = m_2 a\\).',
    'Add the two equations to eliminate T and solve for acceleration: \\(a = \\frac{(m_1 - m_2)g}{m_1 + m_2}\\).'
  ],ex:'Separate diagrams, identify tension, write equations of motion, add to eliminate T, and solve for a.'},
  {t:'cat',ti:'Categorize: Newton\'s Three Laws',categories:['First Law','Second Law','Third Law'],items:[
    {s:'Objects maintain velocity unless acted on by external resultant force',cat:'First Law'},
    {s:'Inertia is the resistance to changes in motion',cat:'First Law'},
    {s:'Rate of change of momentum is proportional to resultant force (\\(F=ma\\))',cat:'Second Law'},
    {s:'Greater mass experiences smaller acceleration for same applied force',cat:'Second Law'},
    {s:'When body A exerts a force on body B, B exerts equal and opposite force on A',cat:'Third Law'},
    {s:'Action-reaction pairs act on two distinct bodies',cat:'Third Law'}
  ],ex:'1st Law: inertia/zero net force; 2nd Law: F=ma; 3rd Law: action-reaction pairs on separate bodies.'},
  {t:'sr',ti:'Worked Example: Newton\\u2019s Second Law with Friction',steps:[
    'A 10 kg crate is pushed with a horizontal force of 45 N across a rough floor (\\(\\mu=0.3\\), \\(g=10\\) m/s²). Find the normal reaction and friction force.',
    '\\(R=mg=10\\times10=100\\) N. Friction \\(F=\\mu R=0.3\\times100=30\\) N.',
    'Net force \\(=45-30=15\\) N. Acceleration \\(a=F/m=15/10=1.5\\) m/s².'
  ]},
  {t:'qc',ti:'Quick Check: Momentum Conservation',q:'A 2 kg ball moving at 6 m/s collides with a stationary 4 kg ball and they stick together. Find their common velocity.',o:['2 m/s','3 m/s','1.5 m/s','4 m/s'],a:0,ex:'\\(m_1u_1=(m_1+m_2)v\\Rightarrow12=6v\\Rightarrow v=2\\) m/s.'}
];

D['as-energy']=[
  {t:'num',ti:'Numeric Entry: Kinetic Energy',q:'A 4 kg trolley travels at a speed of 5 m/s. What is its kinetic energy in Joules?',a:50,ex:'\\(\\text{KE} = \\frac{1}{2}mv^2 = 0.5(4)(5^2) = 2 \\times 25 = 50\\) J.'},
  {t:'ord',ti:'Order the Steps: Work-Energy Principle with Resistance',prompt:'Arrange the steps to find final velocity of a car moving up an incline with resistance:',items:[
    'Compute initial kinetic and potential energy: \\(E_1 = \\frac{1}{2}mu^2 + mgh_1\\).',
    'Compute work done by car engine: \\(W_{\\text{drive}} = F_{\\text{drive}} \\times d\\).',
    'Compute work done against friction/drag: \\(W_{\\text{resist}} = F_{\\text{resist}} \\times d\\).',
    'Set up energy equation: \\(E_1 + W_{\\text{drive}} - W_{\\text{resist}} = E_2\\).',
    'Solve for final velocity: \\(E_2 = \\frac{1}{2}mv^2 + mgh_2 \\implies v = \\sqrt{\\dots}\\).'
  ],ex:'Initial energy + driving work - resistive work = final energy; solve for velocity.'},
  {t:'cat',ti:'Categorize: Work, Energy, and Power Terms',categories:['Energy Form (Joules)','Rate of Energy Transfer (Watts)'],items:[
    {s:'Kinetic energy \\(\\frac{1}{2}mv^2\\)',cat:'Energy Form (Joules)'},
    {s:'Gravitational potential energy \\(mgh\\)',cat:'Energy Form (Joules)'},
    {s:'Work done \\(F \\times d\\)',cat:'Energy Form (Joules)'},
    {s:'Power formula \\(P = \\frac{W}{t}\\)',cat:'Rate of Energy Transfer (Watts)'},
    {s:'Power formula \\(P = F \\times v\\)',cat:'Rate of Energy Transfer (Watts)'},
    {s:'Rate at which mechanical work is performed',cat:'Rate of Energy Transfer (Watts)'}
  ],ex:'Work and energy are measured in Joules; Power is the rate of energy transfer in Watts.'},
  {t:'sr',ti:'Worked Example: Energy Conservation on a Slope',steps:[
    'A 5 kg object is projected up a smooth slope at 8 m/s and momentarily stops at height \\(h\\). Apply conservation of energy: loss in KE = gain in PE.',
    '\\(\\tfrac12mv^2=mgh\\Rightarrow h=\\dfrac{v^2}{2g}\\).',
    '\\(h=\\dfrac{8^2}{2\\times10}=\\dfrac{64}{20}=3.2\\) m.'
  ]},
  {t:'qc',ti:'Quick Check: Power',q:'A crane lifts a 200 kg load 15 m in 20 s at constant speed (\\(g=10\\) m/s²). Find the power required.',o:['1500 W','2000 W','1000 W','3000 W'],a:0,ex:'\\(P=\\dfrac{mgh}{t}=\\dfrac{200\\times10\\times15}{20}=1500\\) W.'}
];

D['as-datarepresent']=[
  {t:'num',ti:'Numeric Entry: Histogram Frequency from Density',q:'In a histogram, a class interval has width 15 and frequency density 4. What is the frequency of this class?',a:60,ex:'\\(\\text{Frequency} = \\text{class width} \\times \\text{frequency density} = 15 \\times 4 = 60\\).'},
  {t:'ord',ti:'Order the Steps: Constructing a Box Plot',prompt:'Arrange the steps to construct a box-and-whisker plot from raw numerical data:',items:[
    'Sort all data values in ascending numerical order.',
    'Identify the minimum value and maximum value.',
    'Determine the median (Q2) dividing data into upper and lower halves.',
    'Determine lower quartile (Q1) and upper quartile (Q3).',
    'Draw a box from Q1 to Q3 with median bar, and draw whiskers to extremes.'
  ],ex:'Sort data, find extremes, find median, find quartiles, and draw box and whiskers.'},
  {t:'cat',ti:'Categorize: Measures of Location vs Dispersion',categories:['Measure of Location','Measure of Dispersion (Spread)'],items:[
    {s:'Mean \\(\\bar{x} = \\frac{\\sum x}{n}\\)',cat:'Measure of Location'},
    {s:'Median (middle value Q2)',cat:'Measure of Location'},
    {s:'Mode (most frequent value)',cat:'Measure of Location'},
    {s:'Interquartile range (IQR = Q3 - Q1)',cat:'Measure of Dispersion (Spread)'},
    {s:'Variance \\(\\sigma^2 = \\frac{\\sum x^2}{n} - \\bar{x}^2\\)',cat:'Measure of Dispersion (Spread)'},
    {s:'Standard deviation \\(\\sigma = \\sqrt{\\text{Var}}\\)',cat:'Measure of Dispersion (Spread)'}
  ],ex:'Location measures indicate center; dispersion measures quantify spread or variability.'},
  {t:'sr',ti:'Worked Example: Standard Deviation from Summary Statistics',steps:[
    'A data set has \\(n=12\\), \\(\\Sigma x=144\\), \\(\\Sigma x^2=1824\\). Find the mean: mean \\(=\\Sigma x/n\\).',
    'Mean \\(=144/12=12\\). Variance \\(=\\Sigma x^2/n-\\text{mean}^2=1824/12-144=152-144=8\\).',
    'Standard deviation \\(=\\sqrt8\\approx2.83\\).'
  ]},
  {t:'qc',ti:'Quick Check: Frequency Density',q:'A class interval 15–25 has frequency 20. Find the frequency density.',o:['2','20','10','0.5'],a:0,ex:'Frequency density \\(=\\dfrac{\\text{frequency}}{\\text{class width}}=\\dfrac{20}{10}=2\\).'}
];

D['as-permcomb']=[
  {t:'num',ti:'Numeric Entry: Evaluating Combinations',q:'How many ways can a team of 3 students be chosen from 6 candidates?',a:20,ex:'\\(\\binom{6}{3} = \\frac{6 \\times 5 \\times 4}{3 \\times 2 \\times 1} = 20\\).'},
  {t:'ord',ti:'Order the Steps: Permutations with Repeated Items',prompt:'Arrange the steps to find the distinct arrangements of letters in CHEESE:',items:[
    'Count total number of letters: 6 letters in CHEESE.',
    'Compute unconstrained permutations: \\(6! = 720\\).',
    'Identify repeat frequencies: the letter E appears 3 times.',
    'Compute factorial of repetitions: \\(3! = 6\\).',
    'Divide unconstrained total by repetitions: \\(\\frac{6!}{3!} = \\frac{720}{6} = 120\\).'
  ],ex:'Count letters, compute n!, find repeats, compute repeat factorials, and divide.'},
  {t:'cat',ti:'Categorize: Counting Scenarios',categories:['Permutations (Order Matters)','Combinations (Order Does NOT Matter)'],items:[
    {s:'Electing President, Vice President, and Secretary',cat:'Permutations (Order Matters)'},
    {s:'Arranging 5 books along a shelf',cat:'Permutations (Order Matters)'},
    {s:'Assigning distinct 1st, 2nd, and 3rd medals in a race',cat:'Permutations (Order Matters)'},
    {s:'Selecting a delegation of 4 committee members from 10 applicants',cat:'Combinations (Order Does NOT Matter)'},
    {s:'Drawing a hand of 5 cards from a standard deck',cat:'Combinations (Order Does NOT Matter)'},
    {s:'Choosing 3 toppings for a pizza from 8 options',cat:'Combinations (Order Does NOT Matter)'}
  ],ex:'If role or order matters, use permutations; if only group membership matters, use combinations.'},
  {t:'sr',ti:'Worked Example: Permutations with a Restriction',steps:[
    'How many 4-digit codes can be formed from digits 1–7 (no repeats) if the code must start with an even digit? There are 3 even digits (2, 4, 6) for the first position.',
    'The remaining 3 positions are filled from the remaining 6 digits: \\(^6P_3=6\\times5\\times4=120\\).',
    'Total codes \\(=3\\times120=360\\).'
  ]},
  {t:'qc',ti:'Quick Check: Combinations',q:'How many ways can a team of 3 be chosen from 8 people?',o:['56','336','24','168'],a:0,ex:'\\(^8C_3=\\dfrac{8!}{3!\\,5!}=56\\).'}
];

D['as-drv']=[
  {t:'num',ti:'Numeric Entry: Variance of Discrete Variable',q:'If \\(E(X) = 4\\) and \\(E(X^2) = 25\\), what is \\(\\text{Var}(X)\\)?',a:9,ex:'\\(\\text{Var}(X) = E(X^2) - [E(X)]^2 = 25 - 4^2 = 25 - 16 = 9\\).'},
  {t:'ord',ti:'Order the Steps: Computing Var(X) from a Probability Table',prompt:'Arrange the steps to find the variance of a discrete probability distribution:',items:[
    'Verify that all probabilities sum to 1: \\(\\sum P(X = x) = 1\\).',
    'Calculate expectation: \\(E(X) = \\sum x P(X = x)\\).',
    'Square each outcome and calculate: \\(E(X^2) = \\sum x^2 P(X = x)\\).',
    'Square the expectation value: \\([E(X)]^2\\).',
    'Subtract to get variance: \\(\\text{Var}(X) = E(X^2) - [E(X)]^2\\).'
  ],ex:'Verify total probability, find E(X), find E(X²), square E(X), and subtract.'},
  {t:'cat',ti:'Categorize: Expectation vs Variance Under Linear Coding',categories:['Expectation Rule E(aX+b)','Variance Rule Var(aX+b)'],items:[
    {s:'\\(E(aX + b) = aE(X) + b\\)',cat:'Expectation Rule E(aX+b)'},
    {s:'Adding a constant b shifts the value by b',cat:'Expectation Rule E(aX+b)'},
    {s:'Multiplying by negative factor scales the mean by same negative factor',cat:'Expectation Rule E(aX+b)'},
    {s:'\\(\\text{Var}(aX + b) = a^2 \\text{Var}(X)\\)',cat:'Variance Rule Var(aX+b)'},
    {s:'Adding a constant b has zero effect on the value',cat:'Variance Rule Var(aX+b)'},
    {s:'Multiplying by a negative factor scales variance by positive \\(a^2\\)',cat:'Variance Rule Var(aX+b)'}
  ],ex:'Expectation scales and shifts linearly; variance scales quadratically by a² and ignores constant b.'},
  {t:'sr',ti:'Worked Example: Finding E(X) and Var(X)',steps:[
    '\\(X\\) takes values 1,2,3,4 with \\(P(X{=}1)=0.1\\), \\(P(X{=}2)=0.3\\), \\(P(X{=}3)=0.4\\), \\(P(X{=}4)=0.2\\). Find \\(E(X)=\\Sigma x\\,P(X{=}x)\\).',
    '\\(E(X)=1(0.1)+2(0.3)+3(0.4)+4(0.2)=2.7\\).',
    '\\(E(X^2)=1(0.1)+4(0.3)+9(0.4)+16(0.2)=8.1\\). \\(\\text{Var}(X)=8.1-2.7^2=0.81\\).'
  ]},
  {t:'qc',ti:'Quick Check: Linear Transformation',q:'If \\(E(X)=4\\) and \\(\\text{Var}(X)=3\\), find \\(\\text{Var}(2X+5)\\).',o:['12','11','9','7'],a:0,ex:'\\(\\text{Var}(2X+5)=2^2\\times\\text{Var}(X)=4\\times3=12\\).'}
];

D['as-bindist']=[
  {t:'num',ti:'Numeric Entry: Binomial Mean',q:'For \\(X \\sim B(50, 0.2)\\), find the expected value \\(E(X)\\).',a:10,ex:'For binomial distribution, \\(E(X) = np = 50 \\times 0.2 = 10\\).'},
  {t:'ord',ti:'Order the Steps: Evaluating P(X = r)',prompt:'Arrange the steps to evaluate a binomial probability \\(P(X = r)\\):',items:[
    'Confirm binomial conditions: fixed n, independent trials, constant p, two outcomes.',
    'Identify parameters n, p, and target successes r.',
    'Calculate failure probability: \\(q = 1 - p\\).',
    'Calculate combination coefficient: \\(\\binom{n}{r} = \\frac{n!}{r!(n-r)!}\\).',
    'Multiply terms: \\(P(X = r) = \\binom{n}{r} p^r (1-p)^{n-r}\\).'
  ],ex:'Verify conditions, identify parameters, find q, calculate nCr, and multiply terms.'},
  {t:'cat',ti:'Categorize: Binomial Suitability',categories:['Valid Binomial Distribution B(n,p)','Not a Binomial Distribution'],items:[
    {s:'Number of sixes in 10 rolls of a fair die',cat:'Valid Binomial Distribution B(n,p)'},
    {s:'Number of heads obtained in 20 coin tosses',cat:'Valid Binomial Distribution B(n,p)'},
    {s:'Defective components in random sample with replacement',cat:'Valid Binomial Distribution B(n,p)'},
    {s:'Number of rolls until the first six appears',cat:'Not a Binomial Distribution'},
    {s:'Drawing 5 cards without replacement from a standard deck',cat:'Not a Binomial Distribution'},
    {s:'Probability of success changes after each round',cat:'Not a Binomial Distribution'}
  ],ex:'Binomial requires fixed trials n, constant p, independent trials, and binary outcomes.'},
  {t:'sr',ti:'Worked Example: Binomial Probability',steps:[
    '\\(X\\sim B(6,0.25)\\). Find \\(P(X=2)\\) using \\(P(X{=}r)=\\binom{n}{r}p^r(1-p)^{n-r}\\).',
    '\\(\\binom62=15\\). \\(p^2=0.0625\\). \\((1-p)^4=0.75^4=0.31640625\\).',
    '\\(P(X=2)=15\\times0.0625\\times0.31640625\\approx0.2966\\).'
  ]},
  {t:'qc',ti:'Quick Check: Binomial Variance',q:'\\(X\\sim B(20,0.35)\\). Find \\(\\text{Var}(X)\\).',o:['4.55','7','2.13','9.1'],a:0,ex:'\\(\\text{Var}(X)=np(1-p)=20\\times0.35\\times0.65=4.55\\).'}
];

D['as-normdist']=[
  {t:'num',ti:'Numeric Entry: Standard Normal Z-Score',q:'A variable \\(X \\sim N(80, 25)\\). What is the z-score when \\(X = 95\\)?',a:3,ex:'Standard deviation \\(\\sigma = \\sqrt{25} = 5\\). Then \\(Z = \\frac{X - \\mu}{\\sigma} = \\frac{95 - 80}{5} = \\frac{15}{5} = 3\\).'},
  {t:'ord',ti:'Order the Steps: Finding P(a < X < b) in a Normal Distribution',prompt:'Arrange the steps to find \\(P(a < X < b)\\) for \\(X \\sim N(\\mu, \\sigma^2)\\):',items:[
    'Find standard deviation: \\(\\sigma = \\sqrt{\\sigma^2}\\).',
    'Standardise lower bound: \\(z_1 = \\frac{a - \\mu}{\\sigma}\\).',
    'Standardise upper bound: \\(z_2 = \\frac{b - \\mu}{\\sigma}\\).',
    'Look up cumulative probabilities \\(\\Phi(z_2)\\) and \\(\\Phi(z_1)\\).',
    'Subtract to find probability: \\(P(a < X < b) = \\Phi(z_2) - \\Phi(z_1)\\).'
  ],ex:'Find sigma, standardise boundaries, look up Phi values, and subtract.'},
  {t:'cat',ti:'Categorize: Normal Distribution Types',categories:['Standard Normal Z ~ N(0,1)','General Normal X ~ N(μ, σ²)'],items:[
    {s:'Mean is strictly 0',cat:'Standard Normal Z ~ N(0,1)'},
    {s:'Variance and standard deviation are strictly 1',cat:'Standard Normal Z ~ N(0,1)'},
    {s:'Probabilities read directly from Cambridge table \\(\\Phi(z)\\)',cat:'Standard Normal Z ~ N(0,1)'},
    {s:'Mean \\(\\mu\\) can be any real value',cat:'General Normal X ~ N(μ, σ²)'},
    {s:'Variance \\(\\sigma^2\\) is any positive number',cat:'General Normal X ~ N(μ, σ²)'},
    {s:'Must standardise via \\(Z = \\frac{X - \\mu}{\\sigma}\\) before using tables',cat:'General Normal X ~ N(μ, σ²)'}
  ],ex:'Standard normal has mean 0 and variance 1; general normal requires standardisation.'},
  {t:'fn',ti:'Explorer: The Normal Curve',fns:[{expr:'exp(-((x-mu)^2)/(2*sigma^2))',color:'#1E3A6E'}],xrange:[-6,6],yrange:[-0.2,1.2],params:[{name:'mu',label:'Mean μ',min:-3,max:3,step:1,default:0},{name:'sigma',label:'Std dev σ',min:0.5,max:2.5,step:0.5,default:1}]},
  {t:'sr',ti:'Worked Example: Standardising a Normal Variable',steps:[
    '\\(X\\sim N(50,64)\\), so \\(\\sigma=\\sqrt{64}=8\\). Find \\(P(X<58)\\) by standardising: \\(Z=(X-\\mu)/\\sigma\\).',
    '\\(Z=(58-50)/8=1\\).',
    'From tables, \\(P(Z<1)\\approx0.8413\\), so \\(P(X<58)\\approx0.8413\\).'
  ]},
  {t:'qc',ti:'Quick Check: Symmetry',q:'If \\(P(Z<1.5)=0.9332\\), find \\(P(Z<-1.5)\\).',o:['0.0668','0.9332','0.4332','0.1336'],a:0,ex:'By symmetry, \\(P(Z < -z) = 1 - P(Z < z) = 1 - 0.9332 = 0.0668\\).'}
];
});
