/* Interactive Practice data for /apab/ - one entry per chapter section id.
   Shipped as public/js/ix/apab.js and loaded only on that track's page by the
   engine in src/scripts/modules/19-interactive-activities-engine-v1.js
   (Plan 5 Phase 5.015, ADR 0033). Entry shapes (qc/mt/tf/sb/sr/fn) are
   documented there. */
(window.__ixData = window.__ixData || []).push(function (D) {
D['apab-overview']=[
{t:'qc',ti:'Quick Check: AP Calculus AB Unit Weights',q:'Which areas carry the heaviest weighting on the AP Calculus AB exam?',o:['Integration & Accumulation (Unit 6) and Contextual Applications of Differentiation & Integration','Limits and Continuity only','Infinite series and Taylor polynomials','Vector-valued functions and polar coordinates'],a:0,ex:'Units 6 (Integration & Accumulation of Change) along with Applications of Derivatives and Integrals form ~35-40% of the entire AP AB exam.'},
{t:'mt',ti:'Matching: The Big Ideas of AP Calculus AB',p:[{l:'Limits & Continuity',r:'Foundational behavior of functions near points'},{l:'Derivatives',r:'Instantaneous rate of change & local linearity'},{l:'Integrals',r:'Accumulation of net change & Riemann sums'},{l:'FTC',r:'Bridges differentiation and integration'}]}
];
D['apab-exam']=[
{t:'qc',ti:'Quick Check: AP Calculus AB Exam Structure',q:'How is Section I (Multiple Choice) divided on the AP Calculus AB exam?',o:['Part A: 30 non-calc (60 min); Part B: 15 calc (45 min)','Part A: 25 calc (50 min); Part B: 20 non-calc (40 min)','Part A: 45 calc (90 min); Part B: 10 non-calc (15 min)','Part A: 20 non-calc (45 min); Part B: 25 calc (60 min)'],a:0,ex:'Section I has 45 multiple-choice questions total: Part A has 30 questions (60 min, no calculator allowed), and Part B has 15 questions (45 min, graphing calculator required).'},
{t:'tf',ti:'True or False: AP Calculus Exam Rules & Policies',items:[
  {s:'On calculator-active sections, non-exact decimal answers must be rounded or truncated to at least 3 decimal places.',a:true,ex:'College Board standard requires accuracy to 3 places after the decimal point.'},
  {s:'Scratch work on FRQ pages does not need to show the mathematical setup as long as the calculator value is given.',a:false,ex:'You MUST write down the complete calculus setup (e.g. integral or derivative expression) to earn credit.'},
  {s:'Units of measure must be included in FRQ answers whenever requested.',a:true,ex:'FRQ parts often include a dedicated unit point.'},
  {s:'You are permitted to use a graphing calculator on all 6 Free Response Questions.',a:false,ex:'Only Questions 1 and 2 allow a graphing calculator; Questions 3 through 6 are strictly no calculator.'}
]}
];
D['apab-frq']=[
{t:'sr',ti:'Worked Example: FRQ Rate In / Rate Out Accumulation Model',steps:[
  'Given rate in \\(E(t)\\) and rate out \\(L(t)\\), total amount \\(A(t) = A(0) + \\int_0^t [E(u) - L(u)]\\,du\\).',
  'To find when the amount is maximized on \\([0, T]\\), find critical points where \\(A\'(t) = E(t) - L(t) = 0\\).',
  'Test candidates: check \\(t = 0\\), critical points where \\(E(t) = L(t)\\), and endpoint \\(t = T\\).',
  'State the absolute maximum value with appropriate units and justification using the Candidates Test.'
]},
{t:'qc',ti:'Quick Check: FRQ Theorem Conditions',q:'To apply the Mean Value Theorem (MVT) for \\(f\\) on \\([a, b]\\), which hypotheses must be verified and stated?',o:['f is continuous on [a, b] and differentiable on (a, b)','f is differentiable on [a, b] only','f(a) = f(b) on [a, b]','f\'\'(x) exists and is positive on [a, b]'],a:0,ex:'MVT requires confirming two distinct conditions: continuity on the closed interval [a, b], and differentiability on the open interval (a, b).'}
];
D['apab-u1']=[
{t:'qc',ti:'Quick Check: Limits',q:'\\(\\displaystyle\\lim_{x\\to 2}\\frac{x^2-4}{x-2}=\\)',o:['0','2','4','undefined'],a:2,ex:'Factor: \\(\\frac{(x+2)(x-2)}{x-2}=x+2\\to4\\).'},
{t:'sr',ti:"Worked Example: L'Hôpital's Rule",steps:[
  'Evaluate \\(\\displaystyle\\lim_{x\\to0}\\dfrac{\\sin x}{x}\\). Direct substitution gives \\(\\frac00\\), an indeterminate form — L\'Hôpital\'s Rule applies.',
  'Differentiate numerator and denominator separately: \\(\\dfrac{\\cos x}{1}\\).',
  'Evaluate at \\(x=0\\): \\(\\cos(0)=1\\).',
  'So \\(\\displaystyle\\lim_{x\\to0}\\dfrac{\\sin x}{x}=1\\).'
]}];
D['apab-u2']=[{t:'mt',ti:'Matching: Trig Derivatives',p:[{l:'\\(\\frac{d}{dx}\\sin x\\)',r:'cos x'},{l:'\\(\\frac{d}{dx}\\cos x\\)',r:'−sin x'},{l:'\\(\\frac{d}{dx}\\tan x\\)',r:'sec²x'},{l:'\\(\\frac{d}{dx}\\ln x\\)',r:'1/x'}]},
{t:'qc',ti:'Quick Check: Product Rule',q:'Differentiate \\(f(x)=x^3\\cos x\\):',o:['\\(3x^2\\cos x - x^3\\sin x\\)','\\(3x^2\\cos x + x^3\\sin x\\)','\\(-3x^2\\sin x\\)','\\(3x^2-\\sin x\\)'],a:0,ex:'Product rule: \\((uv)\' = u\'v + uv\' = (3x^2)(\\cos x) + (x^3)(-\\sin x) = 3x^2\\cos x - x^3\\sin x\\).'}];
D['apab-u3']=[{t:'tf',ti:'True or False: Chain & Implicit',items:[{s:'\\(\\frac{d}{dx}[f(g(x))]=f\'(g(x))\\cdot g\'(x)\\)',a:true,ex:'Chain Rule.'},{s:'\\(\\frac{d}{dx}[f(g(x))]=f\'(x)\\cdot g\'(x)\\)',a:false,ex:'Must evaluate \\(f\'\\) at \\(g(x)\\).'},{s:'For \\(x^2+y^2=1\\): \\(\\frac{dy}{dx}=-\\frac{x}{y}\\)',a:true,ex:'Implicit diff: \\(2x+2y\\frac{dy}{dx}=0\\).'},{s:'\\((f^{-1})\'(a)=f\'(a)\\)',a:false,ex:'\\((f^{-1})\'(a)=\\frac{1}{f\'(f^{-1}(a))}\\).'}]},
{t:'sr',ti:'Worked Example: Implicit Differentiation',steps:[
  'Find \\(\\dfrac{dy}{dx}\\) for \\(x^2+y^2=25\\). Differentiate both sides with respect to \\(x\\), remembering \\(y\\) is a function of \\(x\\): \\(2x+2y\\dfrac{dy}{dx}=0\\).',
  'Solve for \\(\\dfrac{dy}{dx}\\): \\(2y\\dfrac{dy}{dx}=-2x\\).',
  '\\(\\dfrac{dy}{dx}=-\\dfrac{x}{y}\\).'
]}];
D['apab-u4']=[{t:'sb',ti:'Step Builder: Related Rates — circle with \\(\\frac{dr}{dt}=3\\), \\(r=5\\), find \\(\\frac{dA}{dt}\\)',steps:[{l:'Area: \\(A=\\pi r^2\\). Differentiate: \\(\\frac{dA}{dt}=\\)',a:'2*pi*r*dr/dt',h:'\\(2\\pi r\\frac{dr}{dt}\\)'},{l:'Substitute \\(r=5,\\frac{dr}{dt}=3\\): \\(\\frac{dA}{dt}=2\\pi(5)(3)=\\)',a:'30pi',h:'\\(30\\pi\\)'}]},
{t:'sr',ti:'Worked Example: Related Rates — Expanding Sphere',steps:[
  'A spherical balloon is inflated so its radius increases at \\(2\\text{ cm/s}\\). Volume: \\(V=\\dfrac43\\pi r^3\\). Differentiate with respect to time: \\(\\dfrac{dV}{dt}=4\\pi r^2\\dfrac{dr}{dt}\\).',
  'Substitute \\(r=5\\), \\(\\dfrac{dr}{dt}=2\\): \\(\\dfrac{dV}{dt}=4\\pi(25)(2)\\).',
  'Compute: \\(\\dfrac{dV}{dt}=200\\pi\\text{ cm}^3/\\text{s}\\).'
]}];
D['apab-u5']=[
{t:'sr',ti:'Worked Example: First Derivative Test',steps:[
  'Find and classify the critical points of \\(f(x)=x^3-3x\\). Find \\(f\'(x)=3x^2-3\\) and set it to zero: \\(3x^2-3=0\\Rightarrow x=\\pm1\\).',
  'Test the sign of \\(f\'\\) around each point: for \\(x&lt;-1\\), \\(f\'&gt;0\\); for \\(-1&lt;x&lt;1\\), \\(f\'&lt;0\\); for \\(x&gt;1\\), \\(f\'&gt;0\\).',
  'Since \\(f\'\\) changes \\(+\\to-\\) at \\(x=-1\\), that\'s a local max. Since it changes \\(-\\to+\\) at \\(x=1\\), that\'s a local min.'
]},
{t:'qc',ti:'Quick Check: Concavity',q:'If \\(f\'\'(x)>0\\) on an interval, the graph of \\(f\\) is:',o:['Concave up','Concave down','Increasing','Decreasing'],a:0,ex:'A positive second derivative means the function is concave up.'}
];
D['apab-u6']=[
{t:'sr',ti:'Worked Example: FTC and Accumulation Functions',steps:[
  'If \\(g(x)=\\displaystyle\\int_0^x t^2\\,dt\\), find \\(g\'(3)\\). By the Fundamental Theorem of Calculus, \\(g\'(x)=x^2\\) — the derivative of the accumulation function is the integrand evaluated at \\(x\\).',
  'Substitute \\(x=3\\): \\(g\'(3)=3^2\\).',
  '\\(g\'(3)=9\\).'
]},
{t:'qc',ti:'Quick Check: Definite Integrals',q:'Evaluate \\(\\displaystyle\\int_0^1 4x^3\\,dx\\)',o:['1','4','0','2'],a:0,ex:'Antiderivative is \\(x^4\\); evaluate: \\(1^4-0^4=1\\).'}
];
D['apab-u7']=[
{t:'fn',ti:'Explorer: Solution Family \\(y=Ce^{0.5x}\\) for \\(\\frac{dy}{dx}=0.5y\\)',fns:[{expr:'C*exp(0.5*x)',color:'#1E3A6E',label:'Ce^{0.5x}'}],xrange:[-2,3],yrange:[-8,8],params:[{name:'C',label:'Constant C',min:-2,max:2,step:0.5,default:1}]},
{t:'sr',ti:'Worked Example: Separable Differential Equation',steps:[
  'Solve \\(\\dfrac{dy}{dx}=\\dfrac{x}{y}\\), \\(y(0)=3\\). Separate variables: \\(y\\,dy=x\\,dx\\).',
  'Integrate both sides: \\(\\dfrac{y^2}{2}=\\dfrac{x^2}{2}+C\\).',
  'Apply the initial condition \\(y(0)=3\\): \\(\\dfrac92=0+C\\Rightarrow C=\\dfrac92\\).',
  'Solution: \\(y^2=x^2+9\\).'
]},
{t:'qc',ti:'Quick Check: Slope Fields',q:'A slope field shows horizontal tangent lines wherever:',o:['\\(dy/dx=0\\)','\\(dy/dx=1\\)','\\(x=0\\)','\\(y=0\\)'],a:0,ex:'A horizontal tangent line has slope 0, so \\(dy/dx=0\\) at those points.'}
];
D['apab-u8']=[
{t:'fn',ti:'Explorer: Region Between \\(y=x\\) and \\(y=x^n\\)',fns:[{expr:'x',color:'#1E3A6E',label:'y=x'},{expr:'x^n',color:'#B8801F',label:'y=x^n'}],xrange:[0,1.5],yrange:[0,2],params:[{name:'n',label:'Power n',min:1.5,max:3,step:0.5,default:2}]},
{t:'sr',ti:'Worked Example: Volume by Disk Method',steps:[
  'Find the volume when the region under \\(y=\\sqrt{x}\\) from \\(x=0\\) to \\(x=4\\) is revolved about the x-axis. Disk method: \\(V=\\pi\\displaystyle\\int_0^4[\\sqrt{x}]^2\\,dx=\\pi\\displaystyle\\int_0^4 x\\,dx\\).',
  'Antiderivative: \\(\\pi\\left[\\dfrac{x^2}{2}\\right]_0^4\\).',
  'Evaluate: \\(\\pi\\left(\\dfrac{16}{2}-0\\right)=8\\pi\\).'
]},
{t:'qc',ti:'Quick Check: Disk Method',q:'The disk method formula for volume about the x-axis is:',o:['\\(\\pi\\int[f(x)]^2\\,dx\\)','\\(\\pi\\int f(x)\\,dx\\)','\\(2\\pi\\int xf(x)\\,dx\\)','\\(\\int[f(x)]^2\\,dx\\)'],a:0,ex:'Each disk has radius \\(f(x)\\), so its area is \\(\\pi[f(x)]^2\\), integrated across the interval.'}
];
});
