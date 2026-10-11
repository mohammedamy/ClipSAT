/* Interactive Practice data for /appc/ - one entry per chapter section id.
   Shipped as public/js/ix/appc.js and loaded only on that track's page by the
   engine in src/scripts/modules/19-interactive-activities-engine-v1.js
   (Plan 5 Phase 5.015, ADR 0033). Entry shapes (qc/mt/tf/sb/sr/fn/num/ord/cat)
   are documented there. */
(window.__ixData = window.__ixData || []).push(function (D) {
D['appc-overview']=[
{t:'qc',ti:'Quick Check: AP Precalculus Conceptual Framework',q:'What is the primary focus of the AP Precalculus framework designed by College Board?',o:['Modeling dynamic real-world phenomena using function families and rates of change','Memorizing algebraic formulas and mechanical drills','Rigorous epsilon-delta proofs and multi-variable calculus','Euclidean geometric axiomatic systems'],a:0,ex:'AP Precalculus emphasizes understanding rates of change, function behaviors, parametric representations, and mathematical modeling across polynomial, rational, exponential, logarithmic, and trigonometric families.'},
{t:'mt',ti:'Matching: AP Precalculus Function Behaviors',p:[{l:'Linear Function',r:'Constant rate of change (first differences constant)'},{l:'Quadratic Function',r:'Linear rate of change (second differences constant)'},{l:'Exponential Function',r:'Constant proportional rate of change (ratios constant)'},{l:'Periodic Function',r:'Repeats outputs at regular interval lengths (period)'}]},
{t:'cat',ti:'Categorize: Rate of Change Behaviors',categories:['Constant Rate of Change (Linear)','Linear Rate of Change (Quadratic)','Proportional Rate of Change (Exponential)'],items:[
  {s:'\\(f(x) = 4x - 7\\)',cat:0},
  {s:'First differences of outputs are constant for equal \\(\\Delta x\\)',cat:0},
  {s:'\\(g(x) = 3x^2 + 2x - 1\\)',cat:1},
  {s:'Second differences of outputs are constant for equal \\(\\Delta x\\)',cat:1},
  {s:'\\(h(x) = 5 \\cdot (1.2)^x\\)',cat:2},
  {s:'Ratios of consecutive outputs are constant for equal \\(\\Delta x\\)',cat:2}
],ex:'Linear models have constant first differences; quadratic models have constant second differences (linear rate of change); exponential models have constant consecutive output ratios.'}
];
D['appc-u1']=[
{t:'qc',ti:'Quick Check: End Behavior',q:'End behavior of \\(f(x)=-2x^3+5x\\)?',o:['Up left, up right','Up left, down right','Down left, up right','Down left, down right'],a:1,ex:'Odd degree, negative leading coeff: up left, down right.'},
{t:'fn',ti:'Explorer: End Behavior of \\(x^n\\)',fns:[{expr:'x^n',color:'#1E3A6E',label:'x^n'}],xrange:[-3,3],yrange:[-15,15],params:[{name:'n',label:'Power n',min:1,max:5,step:1,default:3}]},
{t:'num',ti:'Numeric Entry: Average Rate of Change',q:'Find the average rate of change of \\(f(x) = 2x^2 - 3x + 1\\) over the interval \\([1, 4]\\).',a:7,ex:'f(4) = 2(16) - 12 + 1 = 21. f(1) = 2(1) - 3 + 1 = 0. AROC = (21 - 0) / (4 - 1) = 21 / 3 = 7.'},
{t:'ord',ti:'Order the Steps: Graphing a Rational Function',prompt:'Arrange the logical steps to analyze and sketch a rational function \\(R(x) = \\dfrac{P(x)}{Q(x)}\\):',items:[
  'Factor both the numerator and denominator completely.',
  'Identify common factors to locate removable discontinuities (holes).',
  'Set remaining denominator factors to zero to find vertical asymptotes.',
  'Compare degrees of numerator and denominator to determine horizontal or slant asymptotes.',
  'Find intercepts and test signs on each interval to sketch the curve.'
],ex:'Factoring first reveals holes (cancelled factors) vs. vertical asymptotes (remaining denominator zeros). End behavior asymptotes and intercepts complete the graph.'},
{t:'sr',ti:'Worked Example: Holes vs. Vertical Asymptotes',steps:[
  'Find the vertical asymptotes and holes of \\(f(x)=\\dfrac{(x-2)(x+3)}{(x-2)(x-1)}\\). The factor \\((x-2)\\) is common to numerator and denominator, so it cancels — this creates a hole at \\(x=2\\), not an asymptote.',
  'After cancelling, \\(f(x)=\\dfrac{x+3}{x-1}\\) for \\(x\\neq2\\).',
  'The remaining denominator zero, \\(x=1\\), doesn\'t cancel — it\'s a vertical asymptote.'
]}];
D['appc-u2']=[
{t:'mt',ti:'Matching: e and ln Identities',p:[{l:'e⁰',r:'1'},{l:'ln 1',r:'0'},{l:'e^(ln x)',r:'x, for x > 0 only'},{l:'ln(eˣ)',r:'x, for every real x'}]},
{t:'fn',ti:'Explorer: Shifted Log \\(\\ln(x-h)\\)',fns:[{expr:'ln(x-h)',color:'#1E3A6E',label:'ln(x-h)'}],xrange:[-2,8],yrange:[-3,3],params:[{name:'h',label:'Shift h',min:-2,max:2,step:1,default:0}]},
{t:'num',ti:'Numeric Entry: Solve Logarithmic Equation',q:'Solve for \\(x\\): \\(\\log_3(2x + 1) = 4\\).',a:40,ex:'Rewrite in exponential form: 2x + 1 = 3⁴ = 81. Subtract 1: 2x = 80. Divide by 2: x = 40. Check: 2(40) + 1 = 81 > 0.'},
{t:'cat',ti:'Categorize: Exponential vs Logarithmic Behaviors',categories:['Exponential Function f(x) = bˣ (b > 1)','Logarithmic Function g(x) = log_b(x) (b > 1)'],items:[
  {s:'Domain is all real numbers \\((-\\infty, \\infty)\\)',cat:0},
  {s:'Has horizontal asymptote \\(y = 0\\)',cat:0},
  {s:'Passes through point \\((0, 1)\\)',cat:0},
  {s:'Domain is strictly positive reals \\((0, \\infty)\\)',cat:1},
  {s:'Has vertical asymptote \\(x = 0\\)',cat:1},
  {s:'Passes through point \\((1, 0)\\)',cat:1}
],ex:'Exponential and logarithmic functions are inverses: their domains, ranges, and asymptotes reflect across y = x.'},
{t:'sr',ti:'Worked Example: Half-Life Model',steps:[
  'A substance decays as \\(A(t)=A_0e^{-0.1t}\\). Find the time to reach half its original amount: set \\(A(t)=\\dfrac{A_0}{2}\\), so \\(A_0e^{-0.1t}=\\dfrac{A_0}{2}\\).',
  'Divide by \\(A_0\\) and take the natural log: \\(-0.1t=\\ln\\left(\\dfrac12\\right)\\).',
  'Solve: \\(t=\\dfrac{\\ln(1/2)}{-0.1}=\\dfrac{-0.693}{-0.1}\\approx6.93\\).'
]}];
D['appc-u3']=[
{t:'tf',ti:'True or False: Polar Coordinates',items:[{s:'\\(x=r\\cos\\theta,\\ y=r\\sin\\theta\\)',a:true,ex:'Polar-to-Cartesian.'},{s:'\\(r^2=x^2+y^2\\)',a:true,ex:'Pythagorean relation.'},{s:'\\(r=a\\) is a straight line',a:false,ex:'\\(r=a\\) is a circle.'},{s:'\\(\\tan\\theta=y/x\\)',a:true,ex:'Definition of \\(\\theta\\).'}]},
{t:'fn',ti:'Explorer: Vertical Stretch \\(A\\cdot\\tan(x)\\)',fns:[{expr:'A*tan(x)',color:'#1E3A6E',label:'A·tan(x)'}],xrange:[-3,3],yrange:[-5,5],params:[{name:'A',label:'Stretch A',min:0.5,max:2,step:0.5,default:1}]},
{t:'num',ti:'Numeric Entry: Period of Sinusoidal Function',q:'Determine the period of the sinusoidal function \\(f(t) = 5\\cos(4\\pi t - \\pi) + 7\\). (Enter as a decimal)',a:0.5,tol:0.01,ex:'The angular frequency is B = 4π. Period = 2π / B = 2π / (4π) = 1/2 = 0.5.'},
{t:'ord',ti:'Order the Steps: Solving a Trigonometric Equation',prompt:'Arrange the steps to solve \\(2\\sin^2(\\theta) - \\sin(\\theta) - 1 = 0\\) for \\(\\theta \\in [0, 2\\pi)\\):',items:[
  'Treat as a quadratic in sin(θ) and factor into (2 sin(θ) + 1)(sin(θ) - 1) = 0.',
  'Set each factor to zero to obtain sin(θ) = -1/2 and sin(θ) = 1.',
  'Find reference angle π/6 for sin(θ) = -1/2 and quadrant angles.',
  'Determine the third and fourth quadrant solutions for sin(θ) = -1/2: 7π/6 and 11π/6.',
  'Combine with the solution for sin(θ) = 1 (θ = π/2) to form the complete solution set.'
],ex:'Factoring algebraic trig equations leads to linear trig factors, which are solved via reference angles and quadrant signs.'},
{t:'sr',ti:'Worked Example: Evaluate a Tangent Value',steps:[
  'Evaluate \\(\\tan\\left(\\dfrac{5\\pi}{4}\\right)\\). This angle is in the third quadrant (\\(\\pi\\) to \\(\\frac{3\\pi}{2}\\)), where tangent is positive.',
  'The reference angle is \\(\\dfrac{5\\pi}{4}-\\pi=\\dfrac{\\pi}{4}\\).',
  '\\(\\tan\\left(\\dfrac{\\pi}{4}\\right)=1\\), so \\(\\tan\\left(\\dfrac{5\\pi}{4}\\right)=1\\).'
]}];
D['appc-u4']=[
{t:'sb',ti:'Step Builder: Inverse of \\(f(x)=2x+3\\)',steps:[{l:'Swap x and y in \\(y=2x+3\\): \\(x=\\)',a:'2y+3',h:'x=2y+3'},{l:'Solve for y: \\(y=\\)',a:'(x-3)/2',h:'(x−3)/2'},{l:'\\(f^{-1}(x)=\\)',a:'(x-3)/2',h:'Same'}]},
{t:'fn',ti:'Explorer: Parameters \\(a\\cdot\\sin(x)+c\\)',fns:[{expr:'a*sin(x)+c',color:'#1E3A6E',label:'a·sin(x)+c'}],xrange:[-6.3,6.3],yrange:[-4,4],params:[{name:'a',label:'Amplitude a',min:0.5,max:2,step:0.5,default:1},{name:'c',label:'Vertical shift c',min:-2,max:2,step:0.5,default:0}]},
{t:'num',ti:'Numeric Entry: Function Composition',q:'If \\(f(x) = 3x - 2\\) and \\(g(x) = x^2 + 4\\), evaluate \\((g \\circ f)(3)\\).',a:53,ex:'Evaluate inner function first: f(3) = 3(3) - 2 = 7. Then evaluate outer function: g(7) = 7² + 4 = 49 + 4 = 53.'},
{t:'ord',ti:'Order the Steps: Eliminating a Parameter',prompt:'Arrange the steps to eliminate the parameter \\(t\\) from \\(x(t) = 2\\cos(t)\\), \\(y(t) = 3\\sin(t)\\):',items:[
  'Isolate the trigonometric terms: cos(t) = x/2 and sin(t) = y/3.',
  'Apply the Pythagorean identity cos²(t) + sin²(t) = 1.',
  'Substitute the expressions into the identity: (x/2)² + (y/3)² = 1.',
  'Simplify to obtain the standard ellipse equation x²/4 + y²/9 = 1.'
],ex:'For parametric curves involving trigonometric functions, isolating sine and cosine and applying the Pythagorean identity eliminates the parameter directly into standard Cartesian conic form.'},
{t:'sr',ti:'Worked Example: Effect of a Parameter',steps:[
  'How does changing \\(k\\) in \\(f(x)=a(x-h)^2+k\\) affect the graph? The parameter \\(k\\) is the constant added last, outside any transformation of \\(x\\).',
  'Adding a constant \\(k\\) to a function shifts the entire graph vertically.',
  'If \\(k>0\\) the graph shifts up by \\(k\\) units; if \\(k<0\\) it shifts down by \\(|k|\\) units.'
]}];
});
