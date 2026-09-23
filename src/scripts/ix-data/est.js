/* Interactive Practice data for /est/ - one entry per chapter section id.
   Shipped as public/js/ix/est.js and loaded only on that track's page by the
   engine in src/scripts/modules/19-interactive-activities-engine-v1.js
   (Plan 5 Phase 5.015, ADR 0033). Entry shapes (qc/mt/tf/sb/sr/fn) are
   documented there. */
(window.__ixData = window.__ixData || []).push(function (D) {
D['est-algebra']=[{t:'qc',ti:'Quick Check: Systems',q:'If \\(3x+y=11\\) and \\(x+y=5\\), find \\(x\\)',o:['3','2','4','6'],a:0,ex:'Subtract equations: \\(2x=6\\Rightarrow x=3\\).'},
{t:'sr',ti:'Worked Example: Variables on Both Sides',steps:[
  'Solve \\(5x-3=2x+9\\). Subtract \\(2x\\) from both sides: \\(3x-3=9\\).',
  'Add 3 to both sides: \\(3x=12\\).',
  'Divide by 3: \\(x=4\\).'
]}];
D['est-quadratics']=[{t:'mt',ti:'Matching: Quadratic Concepts',p:[{l:'Axis of symmetry',r:'x=−b/(2a)'},{l:'Vertex form',r:'a(x−h)²+k'},{l:'Discriminant',r:'b²−4ac'},{l:'Product of roots',r:'c/a'}]},
{t:'sr',ti:'Worked Example: Complete the Square',steps:[
  'Solve \\(x^2+6x-7=0\\) by completing the square. Move the constant: \\(x^2+6x=7\\).',
  'Add \\((6/2)^2=9\\) to both sides: \\(x^2+6x+9=16\\).',
  'Factor and solve: \\((x+3)^2=16\\Rightarrow x+3=\\pm4\\Rightarrow x=1\\) or \\(x=-7\\).'
]}];
D['est-functions']=[
{t:'fn',ti:'Explorer: Vertical Shift \\(x^2+k\\)',fns:[{expr:'x^2+k',color:'#1E3A6E',label:'x^2+k'}],xrange:[-4,4],yrange:[-4,10],params:[{name:'k',label:'Shift k',min:-3,max:3,step:1,default:0}]},
{t:'sr',ti:'Worked Example: Range from a Vertex',steps:[
  'A function has vertex \\((2,-3)\\) and opens upward. Since it opens upward, the vertex is the minimum point.',
  'The minimum y-value is \\(-3\\) (the vertex\'s y-coordinate).',
  'Range: \\(y\\geq-3\\).'
]},
{t:'qc',ti:'Quick Check: Domain',q:'The domain of \\(f(x)=\\dfrac{1}{x-5}\\) excludes:',o:['\\(x=5\\)','\\(x=0\\)','\\(x=-5\\)','\\(x=1\\)'],a:0,ex:'Denominator cannot be zero: \\(x-5\\neq0\\), so \\(x\\neq5\\).'}
];
D['est-data']=[
{t:'sr',ti:'Worked Example: Unit Rate',steps:[
  'A car travels 180 miles in 3 hours. Find the unit rate: \\(\\dfrac{180\\text{ mi}}{3\\text{ hr}}=60\\text{ mph}\\).',
  'At the same rate, multiply by the new time: \\(60\\times5=300\\).',
  'The car travels 300 miles in 5 hours.'
]},
{t:'qc',ti:'Quick Check: Proportions',q:'If \\(a:b=3:4\\) and \\(b=20\\), find \\(a\\).',o:['15','16','12','24'],a:0,ex:'\\(\\dfrac{a}{b}=\\dfrac34\\), so \\(a=\\left(\\dfrac34\\right)(20)=15\\).'}
];
D['est-stats']=[
{t:'sr',ti:'Worked Example: Probability from a Jar',steps:[
  'A jar has 5 red, 3 blue, and 2 green marbles. Total marbles: \\(5+3+2=10\\).',
  'Not-green marbles: \\(5+3=8\\).',
  'Probability: \\(P(\\text{not green})=\\dfrac{8}{10}=\\dfrac45\\).'
]},
{t:'qc',ti:'Quick Check: Complement Rule',q:'\\(P(\\text{not }A)\\) equals:',o:['\\(1-P(A)\\)','\\(P(A)\\)','\\(1+P(A)\\)','\\(P(A)-1\\)'],a:0,ex:'Complement rule: \\(P(\\text{not }A)=1-P(A)\\).'}
];
D['est-geometry']=[{t:'tf',ti:'True or False: Geometry',items:[{s:'Triangle angles sum to \\(180°\\)',a:true,ex:'Angle sum property.'},{s:'Area of circle \\(=2\\pi r\\)',a:false,ex:'Area \\(=\\pi r^2\\); \\(2\\pi r\\) is circumference.'},{s:'Similar triangles have proportional sides',a:true,ex:'Definition of similarity.'},{s:'Pythagorean theorem applies to all triangles',a:false,ex:'Right triangles only.'}]},
{t:'sr',ti:'Worked Example: Pythagorean Theorem Application',steps:[
  'A ladder leans against a wall, reaching 12 ft up, with its base 5 ft from the wall. This forms a right triangle: legs 12 and 5, hypotenuse = ladder length.',
  'Apply the Pythagorean theorem: \\(c^2=12^2+5^2=144+25=169\\).',
  '\\(c=\\sqrt{169}=13\\). The ladder is 13 ft long.'
]}];
D['est-trig']=[{t:'sb',ti:'Step Builder: Find \\(\\sin 45°\\)',steps:[{l:'In 45-45-90 triangle, legs=1. Hypotenuse \\(=\\)',a:'sqrt(2)',h:'√2'},{l:'\\(\\sin45°=\\frac{1}{\\sqrt{2}}=\\)',a:'sqrt(2)/2',h:'√2/2 (rationalized)'}]},
{t:'sr',ti:'Worked Example: Solve for a Side Using Sine',steps:[
  'In a right triangle, one angle is 40° and the hypotenuse is 15. Use the sine ratio: \\(\\sin(40°)=\\dfrac{\\text{opposite}}{\\text{hypotenuse}}\\).',
  'Substitute: \\(\\sin(40°)=\\dfrac{\\text{opp}}{15}\\).',
  'Solve: \\(\\text{opp}=15\\sin(40°)\\approx15(0.643)\\approx9.64\\).'
]}];
D['est-explog']=[
{t:'fn',ti:'Explorer: Exponential Base \\(b^x\\)',fns:[{expr:'b^x',color:'#1E3A6E',label:'b^x'}],xrange:[-3,3],yrange:[0,10],params:[{name:'b',label:'Base b',min:0.5,max:3,step:0.5,default:2}]},
{t:'sr',ti:'Worked Example: Solve an Exponential Equation',steps:[
  'Solve \\(5^x=125\\). Write 125 as a power of 5: \\(125=5^3\\).',
  'Since bases match, set exponents equal: \\(x=3\\).'
]},
{t:'qc',ti:'Quick Check: Logarithms',q:'\\(\\log_2(8)\\) equals:',o:['3','2','4','8'],a:0,ex:'\\(2^3=8\\), so \\(\\log_2(8)=3\\).'}
];
});
