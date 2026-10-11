/* Interactive Practice data for /algebra/ - one entry per chapter section id.
   Shipped as public/js/ix/algebra.js and loaded only on that track's page by the
   engine in src/scripts/modules/19-interactive-activities-engine-v1.js
   (Plan 5 Phase 5.015, ADR 0033). Entry shapes (qc/mt/tf/sb/sr/fn/num/ord/cat) are
   documented there. */
(window.__ixData = window.__ixData || []).push(function (D) {
D['ag-linear']=[
  {t:'qc',ti:'Quick Check: Linear Equations',q:'Solve \\(2x+5=13\\)',o:['\\(x=4\\)','\\(x=9\\)','\\(x=3\\)','\\(x=6\\)'],a:0,ex:'\\(2x=8\\Rightarrow x=4\\).'},
  {t:'mt',ti:'Matching: Linear Equation Forms',p:[{l:'Slope-intercept form',r:'y = mx + b'},{l:'Point-slope form',r:'y − y₁ = m(x − x₁)'},{l:'Standard form',r:'Ax + By = C'},{l:'Slope formula',r:'m = (y₂−y₁)/(x₂−x₁)'}]},
  {t:'num',ti:'Numeric Entry: Solve Linear Equation',q:'Solve for \\(x\\): \\(4(x - 3) + 2 = 2x + 8\\)',a:9,h:'Expand the left side: \\(4x - 12 + 2 = 4x - 10\\).',sol:'\\(4x - 10 = 2x + 8 \\implies 2x = 18 \\implies x = 9\\).'},
  {t:'ord',ti:'Order the Steps: Multi-Step Linear Equation',prompt:'Arrange the steps to solve \\(3(2x - 5) + 4 = 2x + 9\\):',items:[
    'Distribute through parentheses: \\(6x - 15 + 4 = 2x + 9\\).',
    'Combine constant terms on the left: \\(6x - 11 = 2x + 9\\).',
    'Subtract \\(2x\\) from both sides: \\(4x - 11 = 9\\).',
    'Add 11 to both sides: \\(4x = 20\\).',
    'Divide both sides by 4: \\(x = 5\\).'
  ],ex:'Distribute, combine like terms, move variable terms to one side, isolate the variable.'},
  {t:'cat',ti:'Categorize: Linear Equation Solution Types',categories:['One Unique Solution','No Solution (Inconsistent)','Infinitely Many (Identity)'],items:[
    {s:'\\(2x + 3 = 2x + 7\\)',cat:1},
    {s:'\\(4x - 8 = 4(x - 2)\\)',cat:2},
    {s:'\\(3x + 5 = 20\\)',cat:0},
    {s:'\\(5x - 2 = 5x + 3\\)',cat:1},
    {s:'\\(2(x + 1) = 2x + 2\\)',cat:2},
    {s:'\\(7x - 4 = 3x + 12\\)',cat:0}
  ],ex:'Equations simplifying to false statements have no solution; identities hold for all real numbers; distinct slopes give one unique solution.'}
];

D['ag-quadratics']=[
  {t:'mt',ti:'Matching: Quadratic Forms',p:[{l:'Standard form',r:'ax²+bx+c'},{l:'Vertex form',r:'a(x−h)²+k'},{l:'Axis of symmetry',r:'x=−b/(2a)'},{l:'Discriminant',r:'b²−4ac'}]},
  {t:'sr',ti:'Worked Example: Solve \\(x^2-5x+6=0\\) by Factoring',steps:[
    'Look for two numbers that multiply to \\(6\\) and add to \\(-5\\): those numbers are \\(-2\\) and \\(-3\\).',
    'Factor: \\(x^2-5x+6=(x-2)(x-3)\\).',
    'Set each factor to zero: \\(x-2=0\\) or \\(x-3=0\\).',
    'Solutions: \\(x=2\\) or \\(x=3\\).'
  ]},
  {t:'ord',ti:'Order the Steps: Solve by Completing the Square',prompt:'Arrange the steps to solve \\(x^2 - 6x - 7 = 0\\) by completing the square:',items:[
    'Add 7 to isolate variables on the left: \\(x^2 - 6x = 7\\)',
    'Add \\((-6/2)^2 = 9\\) to both sides: \\(x^2 - 6x + 9 = 16\\)',
    'Write the left side as a binomial square: \\((x - 3)^2 = 16\\)',
    'Take the square root of both sides: \\(x - 3 = \\pm 4\\)',
    'Solve the two linear equations: \\(x = 3 + 4 = 7\\) or \\(x = 3 - 4 = -1\\)'
  ],ex:'Move constant, add (b/2)², factor perfect square, apply square root property.'},
  {t:'num',ti:'Numeric Entry: Minimum Value of Quadratic',q:'Find the minimum value of the quadratic function \\(f(x) = 2x^2 - 8x + 11\\).',a:3,h:'Find vertex x-coordinate: \\(h = -b/(2a) = -(-8)/(4) = 2\\), then compute \\(f(2)\\).',sol:'\\(h = 2\\). Minimum value is \\(f(2) = 2(4) - 8(2) + 11 = 8 - 16 + 11 = 3\\).'},
  {t:'cat',ti:'Categorize: Discriminant and Root Types',categories:['Two Distinct Real Roots (\\(\\Delta > 0\\))','One Repeated Real Root (\\(\\Delta = 0\\))','Two Complex Roots (\\(\\Delta < 0\\))'],items:[
    {s:'\\(x^2 - 6x + 9 = 0\\)',cat:1},
    {s:'\\(x^2 - 5x + 4 = 0\\)',cat:0},
    {s:'\\(x^2 + 2x + 5 = 0\\)',cat:2},
    {s:'\\(2x^2 - 4x + 2 = 0\\)',cat:1},
    {s:'\\(3x^2 - 2x + 4 = 0\\)',cat:2},
    {s:'\\(x^2 - 10 = 0\\)',cat:0}
  ],ex:'Positive discriminant yields two real roots, zero gives one repeated rational root, negative gives complex conjugate roots.'}
];

D['ag-exponents']=[
  {t:'tf',ti:'True or False: Exponent Laws',items:[{s:'\\(x^m\\cdot x^n=x^{m+n}\\)',a:true,ex:'Add exponents — product rule.'},{s:'\\((x^m)^n=x^{m+n}\\)',a:false,ex:'\\((x^m)^n=x^{mn}\\).'},{s:'\\(x^0=0\\) for \\(x\\neq0\\)',a:false,ex:'\\(x^0=1\\).'},{s:'\\(x^{-n}=\\frac{1}{x^n}\\)',a:true,ex:'Definition of negative exponents.'}]},
  {t:'fn',ti:'Explorer: Power Functions \\(y=x^n\\)',fns:[{expr:'x^n',color:'#1E3A6E',label:'x^n'}],xrange:[-3,3],yrange:[-10,10],params:[{name:'n',label:'Exponent n',min:1,max:5,step:1,default:2}]},
  {t:'sr',ti:'Worked Example: Simplify \\(\\dfrac{x^5\\cdot x^3}{x^4}\\)',steps:[
    'Combine the numerator using the product rule: \\(x^5\\cdot x^3=x^{5+3}=x^8\\).',
    'Divide using the quotient rule: \\(\\dfrac{x^8}{x^4}=x^{8-4}=x^4\\).',
    'Simplified result: \\(x^4\\).'
  ]},
  {t:'qc',ti:'Quick Check: Exponent Rules',q:'Simplify \\((2x^3)^2\\)',o:['\\(4x^6\\)','\\(2x^6\\)','\\(4x^5\\)','\\(2x^5\\)'],a:0,ex:'Square both factors: \\(2^2=4\\) and \\((x^3)^2=x^6\\).'},
  {t:'cat',ti:'Categorize: Simplified Exponent Value',categories:['\\(x^6\\)','\\(x^8\\)','\\(x^5\\)'],items:[
    {s:'\\(x^2\\cdot x^4\\)',cat:0},
    {s:'\\((x^3)^2\\)',cat:0},
    {s:'\\(x^{10}/x^4\\)',cat:0},
    {s:'\\(x^3\\cdot x^5\\)',cat:1},
    {s:'\\((x^4)^2\\)',cat:1},
    {s:'\\(x^{12}/x^4\\)',cat:1},
    {s:'\\(x^2\\cdot x^3\\)',cat:2},
    {s:'\\(x^9/x^4\\)',cat:2}
  ],ex:'Apply exponent laws to determine equivalence.'},
  {t:'num',ti:'Numeric Entry: Fractional Exponent Value',q:'Evaluate \\(27^{4/3}\\).',a:81,h:'Rewrite as \\((27^{1/3})^4 = 3^4\\).',sol:'\\(27^{4/3} = (\\sqrt[3]{27})^4 = 3^4 = 81\\).'},
  {t:'ord',ti:'Order the Steps: Simplifying Exponent Expressions',prompt:'Arrange the steps to simplify \\(\\dfrac{(2x^3y^{-2})^3}{4x^4y^{-8}}\\):',items:[
    'Apply the outer power of 3 to each factor in the numerator: \\(\\dfrac{8x^9y^{-6}}{4x^4y^{-8}}\\).',
    'Divide the constant coefficients: \\(\\frac{8}{4} = 2\\).',
    'Apply the quotient rule to x: \\(x^{9 - 4} = x^5\\).',
    'Apply the quotient rule to y: \\(y^{-6 - (-8)} = y^2\\).',
    'Combine factors: \\(2x^5y^2\\).'
  ],ex:'Expand numerator powers, simplify coefficients, and subtract denominator exponents from numerator exponents.'}
];

D['ag-functions']=[
  {t:'sb',ti:'Step Builder: Evaluate \\((f\\circ g)(3)\\), \\(f(x)=2x+1\\), \\(g(x)=x^2\\)',steps:[{l:'Compute \\(g(3)=3^2=\\)',a:'9',h:'\\(9\\)'},{l:'Compute \\(f(9)=2(9)+1=\\)',a:'19',h:'\\(18+1=19\\)'}]},
  {t:'qc',ti:'Quick Check: Function Transformations',q:'How does the graph of \\(g(x) = f(x - 3) + 2\\) relate to the graph of \\(f(x)\\)?',o:['Shifted 3 units right and 2 units up','Shifted 3 units left and 2 units up','Shifted 3 units right and 2 units down','Shifted 3 units left and 2 units down'],a:0,ex:'\\(f(x - h) + k\\) represents a horizontal shift by h and a vertical shift by k. Here h = +3 (right) and k = +2 (up).'},
  {t:'mt',ti:'Matching: Function Foundations',p:[{l:'Domain',r:'Set of all allowable input values (x)'},{l:'Range',r:'Set of all possible output values (y)'},{l:'Vertical Line Test',r:'Determines if a curve is a function'},{l:'Horizontal Line Test',r:'Determines if a function is one-to-one (has an inverse)'}]},
  {t:'num',ti:'Numeric Entry: Composite Function',q:'If \\(f(x) = 3x - 5\\) and \\(g(x) = 2x + 4\\), find the value of \\((f \\circ g)(3)\\).',a:25,h:'First find \\(g(3) = 2(3) + 4 = 10\\), then evaluate \\(f(10)\\).',sol:'\\(g(3) = 10\\). Then \\(f(10) = 3(10) - 5 = 25\\).'},
  {t:'ord',ti:'Order the Steps: Finding an Inverse Function',prompt:'Arrange the steps to find \\(f^{-1}(x)\\) for \\(f(x) = 4x - 7\\):',items:[
    'Replace \\(f(x)\\) with \\(y\\): \\(y = 4x - 7\\).',
    'Swap variables \\(x\\) and \\(y\\): \\(x = 4y - 7\\).',
    'Add 7 to both sides: \\(x + 7 = 4y\\).',
    'Divide both sides by 4: \\(y = \\frac{x + 7}{4}\\).',
    'Write in inverse notation: \\(f^{-1}(x) = \\frac{x + 7}{4}\\).'
  ],ex:'Swap variables and isolate y to obtain the inverse function.'},
  {t:'cat',ti:'Categorize: Function Types by Algebraic Form',categories:['Linear Functions','Quadratic Functions','Rational Functions'],items:[
    {s:'\\(f(x) = 3x - 5\\)',cat:0},
    {s:'\\(f(x) = 2x^2 + 4x - 1\\)',cat:1},
    {s:'\\(f(x) = \\dfrac{3}{x - 2}\\)',cat:2},
    {s:'\\(f(x) = -\\frac{1}{2}x + 8\\)',cat:0},
    {s:'\\(f(x) = (x - 3)^2 + 4\\)',cat:1},
    {s:'\\(f(x) = \\dfrac{2x + 1}{x^2 - 4}\\)',cat:2}
  ],ex:'Degree 1 is linear, degree 2 is quadratic, quotients of polynomials are rational.'}
];

D['ag-exponential']=[
  {t:'sr',ti:'Worked Example: Solve \\(3^{x+1}=81\\)',steps:[
    'Write \\(81\\) as a power of \\(3\\): \\(81=3^4\\).',
    'Since the bases match, set the exponents equal: \\(x+1=4\\).',
    'Solve: \\(x=3\\).'
  ]},
  {t:'qc',ti:'Quick Check: Logarithms',q:'Solve \\(\\log_2(x)=5\\)',o:['\\(x=32\\)','\\(x=10\\)','\\(x=25\\)','\\(x=16\\)'],a:0,ex:'\\(\\log_2(x)=5\\) means \\(2^5=x\\), so \\(x=32\\).'},
  {t:'num',ti:'Numeric Entry: Solve Exponential Equation',q:'Solve for \\(x\\): \\(4^{2x - 1} = 64\\)',a:2,h:'Write \\(64\\) as a power of \\(4\\): \\(64 = 4^3\\).',sol:'\\(4^{2x - 1} = 4^3 \\implies 2x - 1 = 3 \\implies 2x = 4 \\implies x = 2\\).'},
  {t:'ord',ti:'Order the Steps: Solving Exponential with Common Bases',prompt:'Arrange the steps to solve \\(27^{x - 1} = 9^{x + 2}\\):',items:[
    'Express both sides as powers of 3: \\((3^3)^{x - 1} = (3^2)^{x + 2}\\).',
    'Multiply exponents: \\(3^{3(x - 1)} = 3^{2(x + 2)}\\).',
    'Equate the exponents: \\(3x - 3 = 2x + 4\\).',
    'Subtract \\(2x\\) from both sides: \\(x - 3 = 4\\).',
    'Add 3 to isolate \\(x\\): \\(x = 7\\).'
  ],ex:'Convert both sides to powers of the same base, multiply exponents, and solve the resulting linear equation.'},
  {t:'cat',ti:'Categorize: Growth and Decay Models',categories:['Exponential Growth (b > 1)','Exponential Decay (0 < b < 1)','Linear Growth'],items:[
    {s:'\\(f(x) = 500(1.05)^x\\)',cat:0},
    {s:'\\(f(x) = 1200(0.85)^x\\)',cat:1},
    {s:'A bank account earning 6% interest compounded annually',cat:0},
    {s:'A prescription drug with a 4-hour half-life',cat:1},
    {s:'Saving an additional $50 in a piggy bank each month',cat:2},
    {s:'\\(f(x) = 50x + 200\\)',cat:2}
  ],ex:'Multiplier greater than 1 yields exponential growth; multiplier between 0 and 1 yields exponential decay; constant difference yields linear growth.'}
];

D['ag-systems']=[
  {t:'sr',ti:'Worked Example: Solve the System \\(y=2x+1\\), \\(3x+y=11\\)',steps:[
    'Substitute the first equation into the second: \\(3x+(2x+1)=11\\).',
    'Combine like terms: \\(5x+1=11\\).',
    'Solve for \\(x\\): \\(5x=10\\Rightarrow x=2\\).',
    'Back-substitute: \\(y=2(2)+1=5\\). Solution: \\((2,5)\\).'
  ]},
  {t:'qc',ti:'Quick Check: Linear Inequalities',q:'Which point satisfies \\(y>x+1\\)?',o:['\\((0,0)\\)','\\((3,5)\\)','\\((1,1)\\)','\\((2,2)\\)'],a:1,ex:'At \\((3,5)\\): \\(5>3+1=4\\) ✓. The others all fail.'},
  {t:'ord',ti:'Order the Steps: Solving by Substitution',prompt:'Arrange the steps to solve the system \\(y = 3x - 1\\) and \\(2x + y = 14\\):',items:[
    'Substitute \\(3x - 1\\) for \\(y\\) in the second equation: \\(2x + (3x - 1) = 14\\)',
    'Combine like terms on the left: \\(5x - 1 = 14\\)',
    'Add 1 to both sides: \\(5x = 15\\)',
    'Divide both sides by 5: \\(x = 3\\)',
    'Back-substitute \\(x = 3\\) into the first equation: \\(y = 3(3) - 1 = 8\\)'
  ],ex:'Substitute the isolated expression, combine like terms, solve for the first variable, and back-substitute.'},
  {t:'num',ti:'Numeric Entry: Linear System Solution',q:'Solve the system \\(3x + 2y = 19\\) and \\(y = 2x - 1\\). What is the value of \\(x\\)?',a:3,h:'Substitute \\(y = 2x - 1\\) into the first equation: \\(3x + 2(2x - 1) = 19\\).',sol:'\\(3x + 4x - 2 = 19 \\implies 7x = 21 \\implies x = 3\\).'},
  {t:'cat',ti:'Categorize: Linear System Types',categories:['One Solution (Intersecting)','No Solution (Parallel)','Infinitely Many (Coincident)'],items:[
    {s:'\\(y = 2x + 3\\) and \\(y = 2x - 5\\)',cat:1},
    {s:'\\(x + y = 4\\) and \\(2x + 2y = 8\\)',cat:2},
    {s:'\\(y = x + 1\\) and \\(y = -x + 5\\)',cat:0},
    {s:'Lines with different slopes',cat:0},
    {s:'Lines with same slope and different intercepts',cat:1},
    {s:'Multiples of the same linear equation',cat:2}
  ],ex:'Different slopes intersect once; parallel lines never intersect; coincident lines overlap completely.'}
];

D['ag-sequences']=[
  {t:'fn',ti:'Explorer: Geometric Growth \\(a\\cdot r^{\\,x}\\)',fns:[{expr:'2*r^x',color:'#1E3A6E',label:'2·r^x'}],xrange:[0,5],yrange:[0,20],params:[{name:'r',label:'Ratio r',min:0.5,max:2,step:0.1,default:1.5}]},
  {t:'sr',ti:'Worked Example: 12th Term of \\(4,9,14,19,\\ldots\\)',steps:[
    'Identify \\(a_1=4\\) and the common difference \\(d=9-4=5\\).',
    'Use the formula \\(a_n=a_1+(n-1)d\\).',
    'Substitute \\(n=12\\): \\(a_{12}=4+(12-1)(5)=4+55=59\\).'
  ]},
  {t:'qc',ti:'Quick Check: Geometric Series',q:'Find the sum of the first 5 terms of \\(2,4,8,16,\\ldots\\)',o:['62','30','31','60'],a:0,ex:'\\(S_5=\\dfrac{a(r^n-1)}{r-1}=\\dfrac{2(2^5-1)}{2-1}=62\\).'},
  {t:'num',ti:'Numeric Entry: Arithmetic Series Sum',q:'Find the sum of the first 10 terms of the arithmetic sequence with \\(a_1 = 5\\) and \\(d = 3\\).',a:185,h:'First calculate \\(a_{10} = 5 + 9(3) = 32\\), then use \\(S_{10} = \\frac{10}{2}(a_1 + a_{10})\\).',sol:'\\(a_{10} = 5 + 27 = 32\\). Then \\(S_{10} = 5(5 + 32) = 5(37) = 185\\).'},
  {t:'ord',ti:'Order the Steps: Arithmetic Series Sum',prompt:'Arrange the steps to find the sum of \\(3 + 7 + 11 + \\cdots + 79\\):',items:[
    'Identify the first term \\(a_1 = 3\\) and common difference \\(d = 4\\).',
    'Set up term formula to find n: \\(79 = 3 + (n - 1)4\\).',
    'Solve for n: \\(76 = (n - 1)4 \\implies n - 1 = 19 \\implies n = 20\\).',
    'Apply the arithmetic series formula: \\(S_{20} = \\frac{20}{2}(3 + 79)\\).',
    'Evaluate: \\(S_{20} = 10(82) = 820\\).'
  ],ex:'Determine the number of terms n, then apply S_n = (n/2)(a_1 + a_n).'},
  {t:'cat',ti:'Categorize: Sequence Types',categories:['Arithmetic Sequence','Geometric Sequence','Neither'],items:[
    {s:'\\(5, 8, 11, 14, \\ldots\\)',cat:0},
    {s:'\\(3, 6, 12, 24, \\ldots\\)',cat:1},
    {s:'\\(1, 1, 2, 3, 5, 8, \\ldots\\)',cat:2},
    {s:'Terms differ by constant difference d = 6',cat:0},
    {s:'Terms multiplied by constant ratio r = 0.5',cat:1},
    {s:'\\(1, 4, 9, 16, 25, \\ldots\\)',cat:2}
  ],ex:'Constant difference is arithmetic; constant ratio is geometric; squares and Fibonacci are neither.'}
];

D['ag-factoring']=[
  {t:'fn',ti:'Explorer: Roots and Factors \\((x-a)(x-2)\\)',fns:[{expr:'(x-a)*(x-2)',color:'#1E3A6E',label:'(x-a)(x-2)'}],xrange:[-5,5],yrange:[-10,10],params:[{name:'a',label:'Root a',min:-4,max:4,step:1,default:1}]},
  {t:'sr',ti:'Worked Example: Factor \\(x^3+3x^2+2x+6\\) by Grouping',steps:[
    'Group terms in pairs: \\((x^3+3x^2)+(2x+6)\\).',
    'Factor each group: \\(x^2(x+3)+2(x+3)\\).',
    'Factor out the common binomial \\((x+3)\\): \\((x+3)(x^2+2)\\).'
  ]},
  {t:'qc',ti:'Quick Check: Difference of Squares',q:'Factor \\(x^2-16\\)',o:['\\((x-4)(x+4)\\)','\\((x-8)(x+2)\\)','\\((x-4)^2\\)','\\((x+4)^2\\)'],a:0,ex:'Difference of squares: \\(x^2-16=(x-4)(x+4)\\).'},
  {t:'ord',ti:'Order the Steps: Factor by Grouping',prompt:'Arrange the steps to factor \\(2x^3 + 6x^2 + 5x + 15\\):',items:[
    'Group into two binomial pairs: \\((2x^3 + 6x^2) + (5x + 15)\\)',
    'Factor out the GCF from each group: \\(2x^2(x + 3) + 5(x + 3)\\)',
    'Identify the common binomial factor: \\((x + 3)\\)',
    'Factor out \\((x + 3)\\) to complete: \\((x + 3)(2x^2 + 5)\\)'
  ],ex:'Group pairs, factor GCF from each, factor out the common binomial.'},
  {t:'num',ti:'Numeric Entry: Perfect Square Trinomial Constant',q:'If \\(x^2 - kx + 36\\) is a perfect square trinomial with \\(k > 0\\), what is the value of \\(k\\)?',a:12,h:'For \\(x^2 - 2ax + a^2\\), \\(a = \\sqrt{36} = 6\\), so \\(k = 2(6)\\).',sol:'\\(k = 2\\sqrt{36} = 2(6) = 12\\).'},
  {t:'cat',ti:'Categorize: Factoring Strategies',categories:['Difference of Squares','Greatest Common Factor (GCF)','Trinomial Factoring'],items:[
    {s:'\\(x^2 - 49\\)',cat:0},
    {s:'\\(6x^3 + 15x^2\\)',cat:1},
    {s:'\\(x^2 - 7x + 12\\)',cat:2},
    {s:'\\(4x^2 - 81\\)',cat:0},
    {s:'\\(8x^2y - 12xy^2\\)',cat:1},
    {s:'\\(2x^2 + 7x + 3\\)',cat:2}
  ],ex:'Difference of squares has two terms with opposite signs; GCF extracts shared factors; trinomials factor into product of binomials.'}
];

D['ag-radicals']=[
  {t:'fn',ti:'Explorer: Roots \\(y=x^{1/n}\\)',fns:[{expr:'x^(1/n)',color:'#1E3A6E',label:'x^{1/n}'}],xrange:[0,10],yrange:[0,4],params:[{name:'n',label:'Root index n',min:2,max:4,step:1,default:2}]},
  {t:'sr',ti:'Worked Example: Simplify \\(\\sqrt{75}\\)',steps:[
    'Find the largest perfect-square factor of \\(75\\): \\(75=25\\times3\\).',
    'Split the radical: \\(\\sqrt{75}=\\sqrt{25}\\times\\sqrt{3}\\).',
    'Simplify: \\(\\sqrt{25}=5\\), so \\(\\sqrt{75}=5\\sqrt3\\).'
  ]},
  {t:'qc',ti:'Quick Check: Rational Exponents',q:'Simplify \\(x^{2/3}\\cdot x^{1/3}\\)',o:['\\(x\\)','\\(x^{2/9}\\)','\\(x^{1/3}\\)','\\(x^{3}\\)'],a:0,ex:'Add exponents: \\(\\frac23+\\frac13=1\\), so the result is \\(x^1=x\\).'},
  {t:'num',ti:'Numeric Entry: Radical Simplification Coefficient',q:'When \\(\\sqrt{180}\\) is written in simplified radical form \\(a\\sqrt{5}\\), what is the integer value of \\(a\\)?',a:6,h:'Find the largest perfect square factor of \\(180\\): \\(180 = 36 \\times 5\\).',sol:'\\(\\sqrt{180} = \\sqrt{36 \\times 5} = 6\\sqrt{5}\\), so \\(a = 6\\).'},
  {t:'ord',ti:'Order the Steps: Rationalizing Binomial Radical Denominator',prompt:'Arrange the steps to rationalize \\(\\dfrac{6}{\\sqrt{5} - \\sqrt{2}}\\):',items:[
    'Identify the conjugate of the denominator: \\(\\sqrt{5} + \\sqrt{2}\\).',
    'Multiply numerator and denominator by \\(\\sqrt{5} + \\sqrt{2}\\).',
    'Expand the denominator using difference of squares: \\((\\sqrt{5})^2 - (\\sqrt{2})^2 = 5 - 2 = 3\\).',
    'Divide the numerator coefficient by 3: \\(\\frac{6(\\sqrt{5} + \\sqrt{2})}{3} = 2(\\sqrt{5} + \\sqrt{2})\\).',
    'Distribute: \\(2\\sqrt{5} + 2\\sqrt{2}\\).'
  ],ex:'Multiply by conjugate, expand denominator difference of squares, and cancel common factors.'},
  {t:'cat',ti:'Categorize: Radical Simplification Status',categories:['Already Simplified','Can Be Simplified','Needs Rationalization'],items:[
    {s:'\\(\\sqrt{7}\\)',cat:0},
    {s:'\\(\\sqrt{48}\\)',cat:1},
    {s:'\\(\\dfrac{3}{\\sqrt{5}}\\)',cat:2},
    {s:'\\(2\\sqrt{11}\\)',cat:0},
    {s:'\\(\\sqrt{72}\\)',cat:1},
    {s:'\\(\\dfrac{\\sqrt{2}}{\\sqrt{3} - 1}\\)',cat:2}
  ],ex:'Radicands with no square factors are simplified; radicands with square factors can be simplified; denominators with radicals require rationalization.'}
];

D['ag-rational']=[
  {t:'fn',ti:'Explorer: Rational Function \\(\\dfrac{1}{x-a}\\)',fns:[{expr:'1/(x-a)',color:'#1E3A6E',label:'1/(x-a)'}],xrange:[-5,5],yrange:[-6,6],params:[{name:'a',label:'Asymptote a',min:-3,max:3,step:1,default:1}]},
  {t:'sr',ti:'Worked Example: Solve \\(\\dfrac{2}{x}+\\dfrac{1}{3}=\\dfrac{5}{6}\\)',steps:[
    'Multiply every term by the LCD, \\(6x\\): \\(6x\\cdot\\dfrac{2}{x}+6x\\cdot\\dfrac{1}{3}=6x\\cdot\\dfrac{5}{6}\\).',
    'Simplify each term: \\(12+2x=5x\\).',
    'Solve for \\(x\\): \\(12=3x\\Rightarrow x=4\\).'
  ]},
  {t:'qc',ti:'Quick Check: Excluded Values',q:'What value of \\(x\\) must be excluded from \\(\\dfrac{3}{x-2}\\)?',o:['\\(x=2\\)','\\(x=0\\)','\\(x=3\\)','\\(x=-2\\)'],a:0,ex:'The denominator \\(x-2\\) cannot equal \\(0\\), so \\(x\\neq2\\).'},
  {t:'num',ti:'Numeric Entry: Solve Rational Equation',q:'Solve for \\(x\\): \\(\\dfrac{5}{x + 2} = \\dfrac{3}{x - 4}\\)',a:13,h:'Cross-multiply: \\(5(x - 4) = 3(x + 2)\\).',sol:'\\(5x - 20 = 3x + 6 \\implies 2x = 26 \\implies x = 13\\). Note \\(x \\neq -2, 4\\).'},
  {t:'ord',ti:'Order the Steps: Adding Rational Expressions',prompt:'Arrange the steps to compute \\(\\dfrac{3}{x + 2} + \\dfrac{2}{x - 1}\\):',items:[
    'Identify the LCD of the denominators: \\((x + 2)(x - 1)\\).',
    'Rewrite each fraction with the LCD: \\(\\dfrac{3(x - 1)}{(x + 2)(x - 1)} + \\dfrac{2(x + 2)}{(x + 2)(x - 1)}\\).',
    'Combine numerators over common denominator: \\(\\dfrac{3(x - 1) + 2(x + 2)}{(x + 2)(x - 1)}\\).',
    'Expand the numerator: \\(3x - 3 + 2x + 4 = 5x + 1\\).',
    'Write final simplified fraction: \\(\\dfrac{5x + 1}{(x + 2)(x - 1)}\\).'
  ],ex:'Find LCD, write equivalent fractions, combine numerators, and simplify.'},
  {t:'cat',ti:'Categorize: Rational Function Features',categories:['Vertical Asymptote','Horizontal Asymptote','Removable Discontinuity (Hole)'],items:[
    {s:'Denominator is zero and factor does NOT cancel with numerator',cat:0},
    {s:'Degree of numerator equals degree of denominator: \\(y = a_n / b_m\\)',cat:1},
    {s:'Factor \\((x - c)\\) cancels completely from both numerator and denominator',cat:2},
    {s:'Degree of numerator is less than degree of denominator: \\(y = 0\\)',cat:1},
    {s:'\\(f(x) = \\dfrac{x - 3}{(x - 3)(x + 2)}\\) at \\(x = 3\\)',cat:2},
    {s:'\\(f(x) = \\dfrac{1}{x - 4}\\) at \\(x = 4\\)',cat:0}
  ],ex:'Non-canceled denominator zeros produce vertical asymptotes; canceled zeros produce holes; degrees govern horizontal asymptotes.'}
];

D['ag-stats']=[
  {t:'sr',ti:'Worked Example: Find the Mean of \\(4,6,6,8,10\\)',steps:[
    'Add all the values: \\(4+6+6+8+10=34\\).',
    'Divide by the number of values, \\(5\\): \\(\\dfrac{34}{5}=6.8\\).',
    'The mean is \\(6.8\\).'
  ]},
  {t:'qc',ti:'Quick Check: Resistant Statistics',q:'Which measure of center is least affected by an outlier?',o:['Mean','Median','Range','Sum'],a:1,ex:'The median depends only on the middle value(s), so extreme outliers don\'t pull it around the way they do the mean.'},
  {t:'cat',ti:'Categorize: Statistical Resistance to Outliers',categories:['Resistant to Outliers','Sensitive to Outliers'],items:[
    {s:'Median',cat:0},
    {s:'Interquartile Range (IQR)',cat:0},
    {s:'Mode',cat:0},
    {s:'Mean',cat:1},
    {s:'Range (Max - Min)',cat:1},
    {s:'Standard Deviation',cat:1}
  ],ex:'Median and IQR resist outliers; mean, range, and standard deviation are sensitive to extreme values.'},
  {t:'num',ti:'Numeric Entry: Interquartile Range (IQR)',q:'A dataset has first quartile \\(Q_1 = 34\\) and third quartile \\(Q_3 = 58\\). What is the interquartile range (IQR)?',a:24,ex:'\\(\\text{IQR} = Q_3 - Q_1 = 58 - 34 = 24\\).'},
  {t:'ord',ti:'Order the Steps: Testing for Outliers using 1.5 × IQR',prompt:'Arrange the steps to test whether a value is an outlier given \\(Q_1 = 50\\) and \\(Q_3 = 70\\):',items:[
    'Compute the interquartile range: \\(\\text{IQR} = Q_3 - Q_1 = 70 - 50 = 20\\).',
    'Multiply IQR by 1.5: \\(1.5 \\times 20 = 30\\).',
    'Calculate the lower outlier fence: \\(Q_1 - 30 = 50 - 30 = 20\\).',
    'Calculate the upper outlier fence: \\(Q_3 + 30 = 70 + 30 = 100\\).',
    'Flag any data value below 20 or above 100 as an outlier.'
  ],ex:'Find IQR, compute 1.5 × IQR, establish fences Q1 - 1.5(IQR) and Q3 + 1.5(IQR), and check bounds.'}
];
});
