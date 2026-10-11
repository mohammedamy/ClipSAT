/* Interactive Practice data for /est/ - one entry per chapter section id.
   Shipped as public/js/ix/est.js and loaded only on that track's page by the
   engine in src/scripts/modules/19-interactive-activities-engine-v1.js
   (Plan 5 Phase 5.015, ADR 0033). Entry shapes (qc/mt/tf/sb/sr/fn/num/ord/cat) are
   documented there. */
(window.__ixData = window.__ixData || []).push(function (D) {

D['est-about'] = [
  {t:'qc',ti:'Quick Check: EST I Math Section Structure',q:'How is the EST I Math test laid out?',o:['No-calculator section: 20 questions in 25 min, then calculator section: 38 questions in 55 min','Two adaptive modules of 22 questions, 35 min each','One calculator section: 45 questions in 50 min','No-calculator section: 30 min, then calculator section: 60 min, with grid-in answers'],a:0,ex:'Recent EST I papers have a 20-question, 25-minute no-calculator section and a 38-question, 55-minute calculator section: 58 four-option multiple-choice questions in 80 minutes. Two adaptive 22-question modules is the Digital SAT; 45 in 50 minutes is the enhanced ACT.'},
  {t:'num',ti:'Numeric Entry: EST I No-Calculator Pace',q:'In Section I of EST I Math (no calculator), you have 25 minutes to complete 20 questions. How many seconds do you have per question on average?',a:75,tol:0.1,h:'Divide 1500 seconds by 20 questions.',ex:'(25 minutes × 60 seconds/minute) ÷ 20 questions = 1500 ÷ 20 = 75 seconds per question.'},
  {t:'mt',ti:'Matching: EST I Math Strategy',p:[{l:'No-calculator section',r:'20 questions in 25 min (75 s each)'},{l:'Calculator section',r:'38 questions in 55 min (about 87 s each)'},{l:'Question format',r:'All multiple choice, four options'},{l:'Wrong answers',r:'No penalty, so answer every question'}]},
  {t:'ord',ti:'Order the EST I Section Attack Strategy',q:'Arrange the time-management sequence for Section I (No-Calculator, 20 questions in 25 minutes):',items:[
    'Complete questions 1–10 in the first 10 minutes (~60 s each) to establish confidence',
    'Tackle questions 11–16 in the next 8 minutes (~80 s each), paying close attention to word problems',
    'Solve questions 17–20 (grid-ins/multi-step algebra) in the remaining 5 minutes',
    'Use the final 2 minutes to confirm no question is left blank and review flagged calculations'
  ],sol:'Pace deliberately through Section I to leave adequate time for final constructed response items.'},
  {t:'cat',ti:'Classify EST I Math Features: Section I vs. Section II',categories:['Section I (No Calculator)','Section II (Calculator Allowed)'],items:[
    {s:'20 questions in 25 minutes',cat:0},
    {s:'38 questions in 55 minutes',cat:1},
    {s:'Fast mental arithmetic, factoring, and linear isolation',cat:0},
    {s:'Multi-step data interpretation, quadratic formula, and trig modeling',cat:1},
    {s:'75 seconds per question pacing',cat:0},
    {s:'~87 seconds per question pacing',cat:1}
  ],sol:'Section I is 25 minutes with no calculator; Section II is 55 minutes with a graphing/scientific calculator permitted.'}
];

D['est-algebra'] = [
  {t:'qc',ti:'Quick Check: Systems',q:'If \\(3x+y=11\\) and \\(x+y=5\\), find \\(x\\)',o:['3','2','4','6'],a:0,ex:'Subtract equations: \\(2x=6\\Rightarrow x=3\\).'},
  {t:'num',ti:'Numeric Entry: Linear Equation Slope',q:'Find the slope of the line given by \\(4x - 2y = 10\\).',a:2,tol:0.01,h:'Solve for y = mx + b.',ex:'Solve for y: -2y = -4x + 10 ⇒ y = 2x - 5. The slope is 2.'},
  {t:'ord',ti:'Order the Steps: Solving a Linear Inequality',prompt:'Arrange the steps to solve \\(-3(2x - 4) \\le 18\\):',items:[
    'Distribute the -3: -6x + 12 ≤ 18',
    'Subtract 12 from both sides: -6x ≤ 6',
    'Divide both sides by -6 and reverse the inequality sign: x ≥ 6 / (-6)',
    'Simplify the fraction to obtain final solution: x ≥ -1'
  ],ex:'Dividing by a negative number reverses the inequality direction, yielding x ≥ -1.'},
  {t:'sr',ti:'Worked Example: Variables on Both Sides',steps:[
    'Solve \\(5x-3=2x+9\\). Subtract \\(2x\\) from both sides: \\(3x-3=9\\).',
    'Add 3 to both sides: \\(3x=12\\).',
    'Divide by 3: \\(x=4\\).'
  ]},
  {t:'cat',ti:'Classify Linear Systems by Ratio Inspection',categories:['No Solution (Parallel)','Infinitely Many Solutions (Coincident)','Unique Solution (Intersecting)'],items:[
    {s:'\\(2x + 4y = 10\\) and \\(x + 2y = 5\\)',cat:1},
    {s:'\\(3x - y = 6\\) and \\(3x - y = 8\\)',cat:0},
    {s:'\\(x + y = 4\\) and \\(2x - y = 5\\)',cat:2},
    {s:'\\(\\frac{a_1}{a_2} = \\frac{b_1}{b_2} = \\frac{c_1}{c_2}\\)',cat:1},
    {s:'\\(\\frac{a_1}{a_2} = \\frac{b_1}{b_2} \\neq \\frac{c_1}{c_2}\\)',cat:0},
    {s:'\\(\\frac{a_1}{a_2} \\neq \\frac{b_1}{b_2}\\)',cat:2}
  ],sol:'Matching variable ratios with different constant ratios indicates parallel lines; identical ratios indicate coincident lines; different slopes intersect at one point.'}
];

D['est-quadratics'] = [
  {t:'mt',ti:'Matching: Quadratic Concepts',p:[{l:'Axis of symmetry',r:'x=−b/(2a)'},{l:'Vertex form',r:'a(x−h)²+k'},{l:'Discriminant',r:'b²−4ac'},{l:'Product of roots',r:'c/a'}]},
  {t:'num',ti:'Numeric Entry: Sum of Quadratic Roots',q:'Without solving, find the sum of the solutions to \\(3x^2 - 12x + 5 = 0\\).',a:4,tol:0.01,h:'Vieta\'s formula: sum = -b/a.',ex:'By Vieta\'s formulas, the sum of roots for ax² + bx + c = 0 is -b/a = -(-12)/3 = 12/3 = 4.'},
  {t:'cat',ti:'Categorize: Discriminant and Nature of Roots',categories:['Two Real Roots (Δ > 0)','One Real Double Root (Δ = 0)','No Real Roots (Δ < 0)'],items:[
    {s:'\\(x^2 - 6x + 9 = 0\\)',cat:1},
    {s:'\\(x^2 - 4x + 3 = 0\\)',cat:0},
    {s:'\\(2x^2 - 3x + 5 = 0\\)',cat:2},
    {s:'\\(x^2 + 2x + 1 = 0\\)',cat:1},
    {s:'\\(3x^2 - 5x - 2 = 0\\)',cat:0},
    {s:'\\(x^2 + x + 4 = 0\\)',cat:2}
  ],sol:'Δ = b² - 4ac. Δ > 0 indicates two distinct real roots, Δ = 0 indicates a single repeated root, and Δ < 0 indicates complex non-real roots.'},
  {t:'sr',ti:'Worked Example: Complete the Square',steps:[
    'Solve \\(x^2+6x-7=0\\) by completing the square. Move the constant: \\(x^2+6x=7\\).',
    'Add \\((6/2)^2=9\\) to both sides: \\(x^2+6x+9=16\\).',
    'Factor and solve: \\((x+3)^2=16\\Rightarrow x+3=\\pm4\\Rightarrow x=1\\) or \\(x=-7\\).'
  ]},
  {t:'ord',ti:'Order the Steps: Solving a Quadratic via the Quadratic Formula',q:'Arrange the sequence to solve \\(2x^2 - 5x - 3 = 0\\):',items:[
    'Identify standard form coefficients: \\(a = 2, b = -5, c = -3\\)',
    'Compute the discriminant: \\(\\Delta = b^2 - 4ac = (-5)^2 - 4(2)(-3) = 25 + 24 = 49\\)',
    'Recognize that \\(\\Delta = 49 > 0\\) is a perfect square, so two rational roots exist',
    'Substitute into formula: \\(x = \\frac{-(-5) \\pm \\sqrt{49}}{2(2)} = \\frac{5 \\pm 7}{4}\\)',
    'Compute individual roots: \\(x_1 = \\frac{12}{4} = 3\\) and \\(x_2 = \\frac{-2}{4} = -0.5\\)'
  ],sol:'Calculate the discriminant first to confirm the number and nature of roots before evaluating the full formula.'}
];

D['est-functions'] = [
  {t:'fn',ti:'Explorer: Vertical Shift \\(x^2+k\\)',fns:[{expr:'x^2+k',color:'#1E3A6E',label:'x^2+k'}],xrange:[-4,4],yrange:[-4,10],params:[{name:'k',label:'Shift k',min:-3,max:3,step:1,default:0}]},
  {t:'num',ti:'Numeric Entry: Function Composition',q:'If \\(f(x) = 2x + 3\\) and \\(g(x) = x^2 - 1\\), evaluate \\((f \\circ g)(3)\\).',a:19,tol:0.01,h:'Find g(3) first, then evaluate f at that result.',ex:'g(3) = 3² - 1 = 9 - 1 = 8. Then f(g(3)) = f(8) = 2(8) + 3 = 16 + 3 = 19.'},
  {t:'ord',ti:'Order the Steps: Finding an Inverse Function',prompt:'Arrange the steps to find \\(f^{-1}(x)\\) for \\(f(x) = \\dfrac{2x + 5}{3}\\):',items:[
    'Set y = (2x + 5) / 3',
    'Swap x and y to get x = (2y + 5) / 3',
    'Multiply both sides by 3: 3x = 2y + 5',
    'Subtract 5: 3x - 5 = 2y',
    'Divide by 2 to isolate y: f⁻¹(x) = (3x - 5) / 2'
  ],ex:'Swapping x and y and isolating y produces the inverse function formula.'},
  {t:'sr',ti:'Worked Example: Range from a Vertex',steps:[
    'A function has vertex \\((2,-3)\\) and opens upward. Since it opens upward, the vertex is the minimum point.',
    'The minimum y-value is \\(-3\\) (the vertex\'s y-coordinate).',
    'Range: \\(y\\geq-3\\).'
  ]},
  {t:'qc',ti:'Quick Check: Domain',q:'The domain of \\(f(x)=\\dfrac{1}{x-5}\\) excludes:',o:['\\(x=5\\)','\\(x=0\\)','\\(x=-5\\)','\\(x=1\\)'],a:0,ex:'Denominator cannot be zero: \\(x-5\\neq0\\), so \\(x\\neq5\\).'},
  {t:'cat',ti:'Classify Function Transformation Directions',categories:['Horizontal Shift','Vertical Shift','Reflection Across Axis'],items:[
    {s:'\\(f(x - 3)\\): Shift right 3 units',cat:0},
    {s:'\\(f(x) + 4\\): Shift up 4 units',cat:1},
    {s:'\\(-f(x)\\): Reflection across x-axis',cat:2},
    {s:'\\(f(-x)\\): Reflection across y-axis',cat:2},
    {s:'\\(f(x + 2)\\): Shift left 2 units',cat:0},
    {s:'\\(f(x) - 5\\): Shift down 5 units',cat:1}
  ],sol:'Inputs inside parentheses shift horizontally or reflect over the y-axis; outside operations affect vertical position and reflect over the x-axis.'}
];

D['est-data'] = [
  {t:'num',ti:'Numeric Entry: Percent Change',q:'A jacket originally priced at $80 is marked down to $60. What is the percent decrease?',a:25,tol:0.1,h:'(80 - 60) / 80 × 100%.',ex:'Percent decrease = (80 - 60) / 80 × 100% = 20 / 80 × 100% = 25%.'},
  {t:'cat',ti:'Categorize: Types of Data Relationships',categories:['Direct Variation (y = kx)','Inverse Variation (xy = k)'],items:[
    {s:'Total earnings when paid an hourly wage',cat:0},
    {s:'Speed and travel time for a fixed distance',cat:1},
    {s:'Total fuel cost proportional to liters purchased',cat:0},
    {s:'Number of workers and time to build a wall',cat:1}
  ],sol:'Direct variation means y increases proportionally as x increases (y/x = constant). Inverse variation means y decreases as x increases (xy = constant).'},
  {t:'sr',ti:'Worked Example: Unit Rate',steps:[
    'A car travels 180 miles in 3 hours. Find the unit rate: \\(\\dfrac{180\\text{ mi}}{3\\text{ hr}}=60\\text{ mph}\\).',
    'At the same rate, multiply by the new time: \\(60\\times5=300\\).',
    'The car travels 300 miles in 5 hours.'
  ]},
  {t:'qc',ti:'Quick Check: Proportions',q:'If \\(a:b=3:4\\) and \\(b=20\\), find \\(a\\).',o:['15','16','12','24'],a:0,ex:'\\(\\dfrac{a}{b}=\\dfrac34\\), so \\(a=\\left(\\dfrac34\\right)(20)=15\\).'},
  {t:'ord',ti:'Order the Steps: Multi-Step Percentage Calculation',q:'An item priced at $120 is discounted by 25%, and then 8% sales tax is added. Arrange the steps to find the final cost:',items:[
    'Identify the initial price: $120',
    'Calculate the discount multiplier: \\(1 - 0.25 = 0.75\\)',
    'Compute the discounted sale price: \\(120 \\times 0.75 = \\$90\\)',
    'Calculate the sales tax multiplier: \\(1 + 0.08 = 1.08\\)',
    'Compute the final cost: \\(90 \\times 1.08 = \\$97.20\\)'
  ],sol:'Successive percentage changes multiply sequentially: Price × (1 - discount) × (1 + tax).'}
];

D['est-stats'] = [
  {t:'num',ti:'Numeric Entry: Median of Even Set',q:'Find the median of the data set: \\(4, 8, 12, 16, 20, 24\\).',a:14,tol:0.01,h:'Average the two middle values (12 and 16).',ex:'For 6 values, median is the average of the 3rd and 4th terms: (12 + 16) / 2 = 28 / 2 = 14.'},
  {t:'ord',ti:'Order the Steps: Calculating Interquartile Range (IQR)',prompt:'Arrange the steps to find the IQR of an ordered dataset:',items:[
    'Verify the data set is arranged in ascending order',
    'Find the median (Q2) dividing the set into lower and upper halves',
    'Find the median of the lower half to determine Q1',
    'Find the median of the upper half to determine Q3',
    'Subtract Q1 from Q3: IQR = Q3 - Q1'
  ],ex:'IQR measures the spread of the middle 50% of data values: IQR = Q3 - Q1.'},
  {t:'sr',ti:'Worked Example: Probability from a Jar',steps:[
    'A jar has 5 red, 3 blue, and 2 green marbles. Total marbles: \\(5+3+2=10\\).',
    'Not-green marbles: \\(5+3=8\\).',
    'Probability: \\(P(\\text{not green})=\\dfrac{8}{10}=\\dfrac45\\).'
  ]},
  {t:'qc',ti:'Quick Check: Complement Rule',q:'\\(P(\\text{not }A)\\) equals:',o:['\\(1-P(A)\\)','\\(P(A)\\)','\\(1+P(A)\\)','\\(P(A)-1\\)'],a:0,ex:'Complement rule: \\(P(\\text{not }A)=1-P(A)\\).'},
  {t:'cat',ti:'Classify Measures: Center vs. Spread vs. Position',categories:['Measure of Center','Measure of Spread (Variability)','Measure of Relative Position'],items:[
    {s:'Mean (arithmetic average)',cat:0},
    {s:'Median (middle value)',cat:0},
    {s:'Standard deviation (σ)',cat:1},
    {s:'Interquartile range (IQR = Q3 - Q1)',cat:1},
    {s:'Range (Max - Min)',cat:1},
    {s:'Percentile rank',cat:2}
  ],sol:'Mean and median represent center; range, IQR, and standard deviation measure spread; percentiles indicate relative position.'}
];

D['est-geometry'] = [
  {t:'tf',ti:'True or False: Geometry',items:[{s:'Triangle angles sum to \\(180°\\)',a:true,ex:'Angle sum property.'},{s:'Area of circle \\(=2\\pi r\\)',a:false,ex:'Area \\(=\\pi r^2\\); \\(2\\pi r\\) is circumference.'},{s:'Similar triangles have proportional sides',a:true,ex:'Definition of similarity.'},{s:'Pythagorean theorem applies to all triangles',a:false,ex:'Right triangles only.'}]},
  {t:'num',ti:'Numeric Entry: Polygon Angle Sum',q:'What is the sum of the interior angles of a hexagon (6 sides) in degrees?',a:720,tol:0.1,h:'(n - 2) × 180° where n = 6.',ex:'Formula: (n - 2) × 180°. For a hexagon: (6 - 2) × 180° = 4 × 180° = 720°.'},
  {t:'cat',ti:'Categorize: Angle Pairs Formed by Parallel Lines',categories:['Equal Measures (Congruent)','Supplementary (Sum to 180°)'],items:[
    {s:'Alternate interior angles',cat:0},
    {s:'Same-side (consecutive) interior angles',cat:1},
    {s:'Corresponding angles',cat:0},
    {s:'Linear pair angles',cat:1},
    {s:'Vertical angles',cat:0}
  ],sol:'Parallel lines cut by a transversal create pairs of equal angles (alternate interior, corresponding, vertical) and supplementary angles (same-side interior, linear pairs).'},
  {t:'sr',ti:'Worked Example: Pythagorean Theorem Application',steps:[
    'A ladder leans against a wall, reaching 12 ft up, with its base 5 ft from the wall. This forms a right triangle: legs 12 and 5, hypotenuse = ladder length.',
    'Apply the Pythagorean theorem: \\(c^2=12^2+5^2=144+25=169\\).',
    '\\(c=\\sqrt{169}=13\\). The ladder is 13 ft long.'
  ]},
  {t:'ord',ti:'Order the Steps: Finding Volume of a Cylinder',q:'Arrange the steps to find the volume of a cylinder with radius 4 and height 10:',items:[
    'Identify the circular base formula: \\(A_{\\text{base}} = \\pi r^2\\)',
    'Substitute the given radius \\(r = 4\\): \\(A_{\\text{base}} = \\pi (4^2) = 16\\pi\\)',
    'Multiply base area by height \\(h = 10\\): \\(V = A_{\\text{base}} \\times h = 16\\pi \\times 10\\)',
    'Calculate exact volume: \\(V = 160\\pi\\)',
    'Approximate to one decimal place if requested: \\(160 \\times 3.1416 \\approx 502.7\\)'
  ],sol:'Volume of a cylinder is base area times height: V = πr²h.'}
];

D['est-trig'] = [
  {t:'sb',ti:'Step Builder: Find \\(\\sin 45°\\)',steps:[{l:'In 45-45-90 triangle, legs=1. Hypotenuse \\(=\\)',a:'sqrt(2)',h:'√2'},{l:'\\(\\sin45°=\\frac{1}{\\sqrt{2}}=\\)',a:'sqrt(2)/2',h:'√2/2 (rationalized)'}]},
  {t:'num',ti:'Numeric Entry: Complementary Angle Measure',q:'If \\(\\sin(25^\\circ) = \\cos(x^\\circ)\\) for an acute angle \\(x\\), what is the value of \\(x\\)?',a:65,tol:0.1,h:'sin(θ) = cos(90° - θ).',ex:'Since sin(θ) = cos(90° - θ), x = 90 - 25 = 65°.'},
  {t:'num',ti:'Numeric Entry: Right Triangle Tangent Ratio',q:'In a right triangle with legs of length 9 and 12, what is the tangent of the angle opposite the leg of length 9? (Enter as a decimal e.g. 0.75)',a:0.75,tol:0.01,h:'tan = opposite / adjacent.',ex:'tan(θ) = opposite / adjacent = 9 / 12 = 3/4 = 0.75.'},
  {t:'sr',ti:'Worked Example: Solve for a Side Using Sine',steps:[
    'In a right triangle, one angle is 40° and the hypotenuse is 15. Use the sine ratio: \\(\\sin(40°)=\\dfrac{\\text{opposite}}{\\text{hypotenuse}}\\).',
    'Substitute: \\(\\sin(40°)=\\dfrac{\\text{opp}}{15}\\).',
    'Solve: \\(\\text{opp}=15\\sin(40°)\\approx15(0.643)\\approx9.64\\).'
  ]},
  {t:'ord',ti:'Order the Steps: Evaluating Unknown Side via Trig Ratio',q:'In a right triangle with acute angle 35° and hypotenuse 20, arrange the steps to find opposite side x:',items:[
    'Identify given values: \\(\\theta = 35^\\circ\\), hypotenuse = 20, opposite leg = x',
    'Select the appropriate ratio: \\(\\sin\\theta = \\frac{\\text{opposite}}{\\text{hypotenuse}}\\)',
    'Set up the algebraic equation: \\(\\sin(35^\\circ) = \\frac{x}{20}\\)',
    'Isolate x by multiplying both sides by 20: \\(x = 20\\sin(35^\\circ)\\)',
    'Evaluate on calculator: \\(x \\approx 20(0.5736) \\approx 11.47\\)'
  ],sol:'Use SOH CAH TOA to select the ratio relating the known and unknown sides.'},
  {t:'cat',ti:'Classify Standard Trig Values (30°, 45°, 60°)',categories:['Equals 1/2','Equals √2/2','Equals √3/2','Equals 1'],items:[
    {s:'\\(\\sin(30^\\circ)\\) and \\(\\cos(60^\\circ)\\)',cat:0},
    {s:'\\(\\sin(45^\\circ)\\) and \\(\\cos(45^\\circ)\\)',cat:1},
    {s:'\\(\\sin(60^\\circ)\\) and \\(\\cos(30^\\circ)\\)',cat:2},
    {s:'\\(\\tan(45^\\circ)\\)',cat:3},
    {s:'\\(\\cos(0^\\circ)\\)',cat:3},
    {s:'\\(\\sin(90^\\circ)\\)',cat:3}
  ],sol:'30-60-90 and 45-45-90 special right triangles generate exact values that must be committed to memory.'}
];

D['est-explog'] = [
  {t:'fn',ti:'Explorer: Exponential Base \\(b^x\\)',fns:[{expr:'b^x',color:'#1E3A6E',label:'b^x'}],xrange:[-3,3],yrange:[0,10],params:[{name:'b',label:'Base b',min:0.5,max:3,step:0.5,default:2}]},
  {t:'num',ti:'Numeric Entry: Logarithm Product Law',q:'Evaluate \\(\\log_4(8) + \\log_4(2)\\).',a:2,tol:0.01,h:'log_b(xy) = log_b(x) + log_b(y).',ex:'By the product law: log₄(8) + log₄(2) = log₄(8 × 2) = log₄(16) = 2 because 4² = 16.'},
  {t:'ord',ti:'Order the Steps: Solving an Exponential Equation with Common Base',prompt:'Arrange the steps to solve \\(27^{x-1} = 9^{x+2}\\):',items:[
    'Express both sides with prime base 3: (3³)^(x - 1) = (3²)^(x + 2)',
    'Apply power-to-a-power rule to multiply exponents: 3^(3x - 3) = 3^(2x + 4)',
    'Set the exponents equal to each other: 3x - 3 = 2x + 4',
    'Solve for x by subtracting 2x and adding 3: x = 7'
  ],ex:'Converting to a common base 3 allows equating the exponents to solve linear equation 3x - 3 = 2x + 4 ⇒ x = 7.'},
  {t:'sr',ti:'Worked Example: Solve an Exponential Equation',steps:[
    'Solve \\(5^x=125\\). Write 125 as a power of 5: \\(125=5^3\\).',
    'Since bases match, set exponents equal: \\(x=3\\).'
  ]},
  {t:'qc',ti:'Quick Check: Logarithms',q:'\\(\\log_2(8)\\) equals:',o:['3','2','4','8'],a:0,ex:'\\(2^3=8\\), so \\(\\log_2(8)=3\\).'},
  {t:'cat',ti:'Classify Exponential Growth vs. Decay Functions',categories:['Exponential Growth (Base > 1)','Exponential Decay (0 < Base < 1)'],items:[
    {s:'\\(f(x) = 500(1.04)^x\\)',cat:0},
    {s:'\\(f(x) = 200(0.85)^x\\)',cat:1},
    {s:'\\(f(x) = 1000 e^{0.08x}\\)',cat:0},
    {s:'\\(f(x) = 80 e^{-0.15x}\\)',cat:1},
    {s:'Radioactive decay with half-life',cat:1},
    {s:'Compound interest compounding annually',cat:0}
  ],sol:'When base > 1 or exponent rate > 0, the function grows exponentially; when 0 < base < 1 or exponent rate < 0, it decays exponentially.'}
];

});
