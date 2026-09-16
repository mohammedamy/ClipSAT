(function(){
'use strict';
var D={};

/* ── CALCULUS ── */
D['ch-foundations']={t:'qc',ti:'Quick Check: Algebra Fundamentals',q:'Simplify \\(\\dfrac{x^2-9}{x-3}\\) for \\(x\\neq3\\)',o:['\\(x+3\\)','\\(x-3\\)','\\(x^2-3\\)','\\(3\\)'],a:0,ex:'Factor: \\(x^2-9=(x+3)(x-3)\\). Cancel \\((x-3)\\) → \\(x+3\\).'};
D['ch-limits']=[{t:'mt',ti:'Matching: Limit Laws',p:[{l:'\\(\\lim[f+g]\\)',r:'L + M'},{l:'\\(\\lim[f\\cdot g]\\)',r:'L · M'},{l:'\\(\\lim\\,k\\)',r:'k'},{l:'\\(\\lim[f/g]\\)',r:'L/M (M≠0)'}]},
{t:'sr',ti:'Worked Example: Evaluate \\(\\displaystyle\\lim_{x\\to4}\\dfrac{\\sqrt{x}-2}{x-4}\\)',steps:[
  'Direct substitution gives \\(\\dfrac{0}{0}\\) — an indeterminate form, so we need another approach.',
  'Multiply numerator and denominator by the conjugate \\(\\sqrt{x}+2\\): \\(\\dfrac{(\\sqrt{x}-2)(\\sqrt{x}+2)}{(x-4)(\\sqrt{x}+2)}\\).',
  'The numerator becomes \\(x-4\\) (difference of squares), which cancels with \\((x-4)\\) in the denominator, leaving \\(\\dfrac{1}{\\sqrt{x}+2}\\).',
  'Now substitute \\(x=4\\) directly: \\(\\dfrac{1}{\\sqrt{4}+2}=\\dfrac{1}{4}\\).'
]}];
D['ch-derivatives']=[{t:'tf',ti:'True or False: Derivative Rules',items:[{s:'\\(\\frac{d}{dx}x^n=nx^{n-1}\\)',a:true,ex:'Power Rule — correct.'},{s:'\\(\\frac{d}{dx}\\sin x=-\\cos x\\)',a:false,ex:'\\(\\frac{d}{dx}\\sin x=+\\cos x\\).'},{s:'\\(\\frac{d}{dx}e^x=e^x\\)',a:true,ex:'Exponential is its own derivative.'},{s:'\\(\\frac{d}{dx}\\ln x=\\frac{1}{x^2}\\)',a:false,ex:'\\(\\frac{d}{dx}\\ln x=\\frac{1}{x}\\).'}]},
{t:'sr',ti:'Worked Example: Differentiate \\(y=x^2\\sin x\\)',steps:[
  'Identify the two factors: \\(u=x^2\\) and \\(v=\\sin x\\).',
  'Differentiate each on its own: \\(u\'=2x\\) and \\(v\'=\\cos x\\).',
  'Apply the Product Rule: \\((uv)\'=u\'v+uv\'\\).',
  'Substitute: \\(y\'=2x\\sin x+x^2\\cos x\\).'
]}];
D['ch-integrals']={t:'sb',ti:'Step Builder: Evaluate \\(\\displaystyle\\int_0^2 3x^2\\,dx\\)',steps:[{l:'Antiderivative of \\(3x^2\\):',a:'x^3',h:'Power rule: \\(3\\cdot\\frac{x^3}{3}=x^3\\)'},{l:'At upper limit \\(x=2\\): \\(2^3=\\)',a:'8',h:'\\(8\\)'},{l:'At lower limit \\(x=0\\): \\(0^3=\\)',a:'0',h:'\\(0\\)'},{l:'Answer \\(F(2)-F(0)=\\)',a:'8',h:'\\(8-0=8\\)'}]};
D['ch-ftc']=[
{t:'sr',ti:'Worked Example: Evaluate \\(\\displaystyle\\int_1^3(2x+1)\\,dx\\)',steps:[
  'Find an antiderivative of \\(2x+1\\): \\(F(x)=x^2+x\\) (check: \\(F\'(x)=2x+1\\) ✓).',
  'Evaluate at the upper limit: \\(F(3)=3^2+3=12\\).',
  'Evaluate at the lower limit: \\(F(1)=1^2+1=2\\).',
  'By the Fundamental Theorem, the integral equals \\(F(3)-F(1)=12-2=10\\).'
]},
{t:'qc',ti:'Quick Check: FTC',q:'Evaluate \\(\\displaystyle\\int_0^{\\pi}\\sin x\\,dx\\)',o:['0','1','2','−2'],a:2,ex:'\\([-\\cos x]_0^\\pi=-\\cos\\pi-(-\\cos0)=1+1=2\\).'}
];
D['ch-applications']=[
{t:'sr',ti:'Worked Example: Maximize the area of a fence-against-a-wall pen',steps:[
  'A farmer has 40 m of fencing for a rectangular pen against a barn wall (no fence needed on that side). Let \\(x\\) = width (perpendicular to wall), \\(y\\) = length (along the wall): \\(2x+y=40\\Rightarrow y=40-2x\\).',
  'Area: \\(A(x)=xy=x(40-2x)=40x-2x^2\\).',
  'Differentiate and set to zero: \\(A\'(x)=40-4x=0\\Rightarrow x=10\\).',
  'Then \\(y=40-2(10)=20\\), giving a maximum area of \\(A=10\\times20=200\\text{ m}^2\\).'
]},
{t:'qc',ti:'Quick Check: Optimization',q:'For \\(f(x)=x^3-3x\\), the x-coordinate of the local maximum is:',o:['\\(x=-1\\)','\\(x=1\\)','\\(x=0\\)','\\(x=3\\)'],a:0,ex:'\\(f\'(x)=3x^2-3=0\\Rightarrow x=\\pm1\\). \\(f\'\'(x)=6x\\); at \\(x=-1\\), \\(f\'\'<0\\), confirming a local max.'}
];
D['ch-techniques']=[
{t:'fn',ti:'Explorer: Products that Need Integration by Parts — \\(x\\,e^{kx}\\)',fns:[{expr:'x*exp(k*x)',color:'#1E3A6E',label:'x·e^{kx}'}],xrange:[-3,3],yrange:[-2,8],params:[{name:'k',label:'Rate k',min:0.2,max:2,step:0.2,default:1}]},
{t:'sr',ti:'Worked Example: Integration by Parts — \\(\\displaystyle\\int xe^x\\,dx\\)',steps:[
  'Choose \\(u=x\\) (differentiates to something simpler) and \\(dv=e^x\\,dx\\).',
  'Then \\(du=dx\\) and \\(v=e^x\\).',
  'Apply the formula \\(\\int u\\,dv=uv-\\int v\\,du\\): \\(xe^x-\\int e^x\\,dx\\).',
  'Integrate the remaining piece: \\(xe^x-e^x+C\\).'
]},
{t:'qc',ti:'Quick Check: Choosing a Substitution',q:'Which substitution works best for \\(\\displaystyle\\int 2x\\cos(x^2)\\,dx\\)?',o:['\\(u=x^2\\)','\\(u=\\cos x\\)','\\(u=2x\\)','\\(u=x\\)'],a:0,ex:'Let \\(u=x^2\\), then \\(du=2x\\,dx\\) — matches the integrand exactly.'}
];
D['ch-appint']=[
{t:'sr',ti:'Worked Example: Area Between Two Curves',steps:[
  'Find where \\(y=x^2\\) and \\(y=x+2\\) intersect: \\(x^2=x+2\\Rightarrow x^2-x-2=0\\Rightarrow(x-2)(x+1)=0\\), so \\(x=-1\\) and \\(x=2\\).',
  'On \\([-1,2]\\), the line \\(y=x+2\\) lies above the parabola, so Area \\(=\\displaystyle\\int_{-1}^{2}\\big[(x+2)-x^2\\big]\\,dx\\).',
  'Antiderivative: \\(\\dfrac{x^2}{2}+2x-\\dfrac{x^3}{3}\\).',
  'Evaluate: at \\(x=2\\) this is \\(\\frac{10}{3}\\); at \\(x=-1\\) it is \\(-\\frac{7}{6}\\). Subtracting gives \\(\\frac{10}{3}+\\frac{7}{6}=\\frac{9}{2}\\).'
]},
{t:'qc',ti:'Quick Check: Setting Up Area Integrals',q:'The area between \\(y=x\\) and \\(y=x^3\\) on \\([0,1]\\) is given by:',o:['\\(\\int_0^1(x-x^3)\\,dx\\)','\\(\\int_0^1(x^3-x)\\,dx\\)','\\(\\int_{-1}^1(x-x^3)\\,dx\\)','\\(\\int_0^1(x+x^3)\\,dx\\)'],a:0,ex:'On \\([0,1]\\), \\(x\\ge x^3\\), so the height of the region is \\(x-x^3\\).'}
];
D['ch-diffeq']=[
{t:'sr',ti:'Worked Example: Solve \\(\\dfrac{dy}{dx}=2xy\\), \\(y(0)=3\\)',steps:[
  'Separate variables: \\(\\dfrac{dy}{y}=2x\\,dx\\).',
  'Integrate both sides: \\(\\ln|y|=x^2+C\\).',
  'Exponentiate: \\(y=Ae^{x^2}\\), where \\(A=e^C\\).',
  'Apply the initial condition \\(y(0)=3\\): \\(3=Ae^0=A\\), so \\(y=3e^{x^2}\\).'
]},
{t:'qc',ti:'Quick Check: Separable Equations',q:'Which of these differential equations is separable?',o:['\\(\\dfrac{dy}{dx}=\\dfrac{x^2}{y}\\)','\\(\\dfrac{dy}{dx}=x+y\\)','\\(\\dfrac{dy}{dx}=x-y\\)','\\(\\dfrac{dy}{dx}=xy+x^2\\)'],a:0,ex:'\\(\\frac{x^2}{y}\\) splits into a pure function of \\(x\\) times a pure function of \\(y\\), so we can write \\(y\\,dy=x^2\\,dx\\).'}
];
D['ch-parametric']=[
{t:'sr',ti:'Worked Example: Parametric Slope for \\(x=t^2,\\ y=t^3-3t\\) at \\(t=2\\)',steps:[
  'Differentiate each with respect to \\(t\\): \\(\\dfrac{dx}{dt}=2t\\), \\(\\dfrac{dy}{dt}=3t^2-3\\).',
  'Use the parametric slope formula: \\(\\dfrac{dy}{dx}=\\dfrac{dy/dt}{dx/dt}=\\dfrac{3t^2-3}{2t}\\).',
  'Substitute \\(t=2\\): \\(\\dfrac{3(4)-3}{2(2)}=\\dfrac{9}{4}\\).'
]},
{t:'qc',ti:'Quick Check: Parametric Slopes',q:'For \\(x=\\cos t,\\ y=\\sin t\\), what is \\(\\dfrac{dy}{dx}\\)?',o:['\\(-\\cot t\\)','\\(\\cot t\\)','\\(-\\tan t\\)','\\(\\tan t\\)'],a:0,ex:'\\(\\dfrac{dy}{dx}=\\dfrac{\\cos t}{-\\sin t}=-\\cot t\\).'}
];
D['ch-series']=[
{t:'sr',ti:'Worked Example: Sum of \\(\\displaystyle\\sum_{n=0}^{\\infty}\\left(\\dfrac13\\right)^n\\)',steps:[
  'This is a geometric series with first term \\(a=1\\) and ratio \\(r=\\dfrac13\\).',
  'Since \\(|r|<1\\), the series converges. Use \\(S=\\dfrac{a}{1-r}\\).',
  'Substitute: \\(S=\\dfrac{1}{1-\\frac13}=\\dfrac{1}{\\frac23}=\\dfrac32\\).'
]},
{t:'qc',ti:'Quick Check: The Harmonic Series',q:'Does the harmonic series \\(\\displaystyle\\sum\\frac1n\\) converge or diverge?',o:['Converges to 1','Converges to 2','Diverges','Converges to 0'],a:2,ex:'The harmonic series is a classic example of a divergent series — even though its terms shrink to 0, the sum still grows without bound.'}
];
D['ch-convergence']=[
{t:'sr',ti:'Worked Example: Ratio Test on \\(\\displaystyle\\sum_{n=1}^{\\infty}\\dfrac{n}{2^n}\\)',steps:[
  'Let \\(a_n=\\dfrac{n}{2^n}\\). Compute \\(\\left|\\dfrac{a_{n+1}}{a_n}\\right|=\\dfrac{n+1}{2^{n+1}}\\cdot\\dfrac{2^n}{n}=\\dfrac{n+1}{2n}\\).',
  'Take the limit as \\(n\\to\\infty\\): \\(\\displaystyle\\lim_{n\\to\\infty}\\dfrac{n+1}{2n}=\\dfrac12\\).',
  'Since the limit \\(\\dfrac12<1\\), the Ratio Test confirms the series converges.'
]},
{t:'qc',ti:'Quick Check: Ratio Test',q:'The Ratio Test is inconclusive when the limit equals:',o:['0','1','∞','−1'],a:1,ex:'When \\(L=1\\), the Ratio Test gives no information — another test is needed.'}
];
D['ch-vectors']=[
{t:'sr',ti:'Worked Example: Angle Between \\(\\vec u=\\langle3,4\\rangle\\) and \\(\\vec v=\\langle4,-3\\rangle\\)',steps:[
  'Compute the dot product: \\(\\vec u\\cdot\\vec v=3(4)+4(-3)=12-12=0\\).',
  'Compute the magnitudes: \\(|\\vec u|=\\sqrt{9+16}=5\\), \\(|\\vec v|=\\sqrt{16+9}=5\\).',
  'Use \\(\\cos\\theta=\\dfrac{\\vec u\\cdot\\vec v}{|\\vec u||\\vec v|}=\\dfrac{0}{25}=0\\).',
  'So \\(\\theta=\\cos^{-1}(0)=90°\\) — the vectors are perpendicular.'
]},
{t:'qc',ti:'Quick Check: Dot Products',q:'If \\(\\vec u\\cdot\\vec v=0\\) and neither vector is zero, the vectors are:',o:['Parallel','Perpendicular','Equal','Opposite'],a:1,ex:'A zero dot product means the vectors are orthogonal (perpendicular).'}
];
D['ch-partial']=[
{t:'sr',ti:'Worked Example: Partial Derivatives of \\(f(x,y)=x^2y+3xy^2\\)',steps:[
  'To find \\(f_x\\), treat \\(y\\) as a constant and differentiate with respect to \\(x\\): \\(f_x=2xy+3y^2\\).',
  'To find \\(f_y\\), treat \\(x\\) as a constant and differentiate with respect to \\(y\\): \\(f_y=x^2+6xy\\).',
  'The gradient is \\(\\nabla f=\\langle 2xy+3y^2,\\ x^2+6xy\\rangle\\).'
]},
{t:'qc',ti:'Quick Check: Partial Derivatives',q:'For \\(f(x,y)=x^3y^2\\), what is \\(\\partial f/\\partial y\\)?',o:['\\(2x^3y\\)','\\(3x^2y^2\\)','\\(x^3y\\)','\\(2x^2y\\)'],a:0,ex:'Treat \\(x\\) as constant: \\(\\frac{\\partial}{\\partial y}(x^3y^2)=x^3\\cdot2y=2x^3y\\).'}
];
D['ch-multiint']=[
{t:'sr',ti:'Worked Example: Evaluate \\(\\displaystyle\\int_0^1\\!\\int_0^2 xy\\,dy\\,dx\\)',steps:[
  'Integrate with respect to \\(y\\) first, treating \\(x\\) as constant: \\(\\displaystyle\\int_0^2 xy\\,dy=x\\cdot\\dfrac{y^2}{2}\\Big|_0^2=2x\\).',
  'Now integrate the result with respect to \\(x\\): \\(\\displaystyle\\int_0^1 2x\\,dx=x^2\\Big|_0^1=1\\).',
  'The value of the double integral is \\(1\\).'
]},
{t:'qc',ti:'Quick Check: Order of Integration',q:'For a double integral over a rectangle, in what order can you integrate?',o:['Only \\(dx\\) then \\(dy\\)','Only \\(dy\\) then \\(dx\\)',"Either order (Fubini's Theorem)",'Neither — must use polar coordinates'],a:2,ex:"Fubini's Theorem guarantees the order doesn't matter for continuous functions over a rectangle."}
];
D['ch-vectorcalc']=[
{t:'sr',ti:'Worked Example: Divergence of \\(\\vec F=\\langle x^2y,\\ yz,\\ xz^2\\rangle\\)',steps:[
  'Divergence formula: \\(\\text{div}\\,\\vec F=\\dfrac{\\partial P}{\\partial x}+\\dfrac{\\partial Q}{\\partial y}+\\dfrac{\\partial R}{\\partial z}\\), where \\(\\vec F=\\langle P,Q,R\\rangle\\).',
  'Compute each term: \\(\\dfrac{\\partial}{\\partial x}(x^2y)=2xy\\), \\(\\dfrac{\\partial}{\\partial y}(yz)=z\\), \\(\\dfrac{\\partial}{\\partial z}(xz^2)=2xz\\).',
  'Sum them: \\(\\text{div}\\,\\vec F=2xy+z+2xz\\).'
]},
{t:'qc',ti:'Quick Check: Divergence',q:'The divergence of a vector field is a:',o:['Vector','Scalar','Matrix','Unit vector'],a:1,ex:'Divergence measures a scalar rate of "outflow" at each point — it is a scalar field, not a vector.'}
];

/* ── ALGEBRA ── */
D['ag-linear']={t:'qc',ti:'Quick Check: Linear Equations',q:'Solve \\(2x+5=13\\)',o:['\\(x=4\\)','\\(x=9\\)','\\(x=3\\)','\\(x=6\\)'],a:0,ex:'\\(2x=8\\Rightarrow x=4\\).'};
D['ag-quadratics']=[{t:'mt',ti:'Matching: Quadratic Forms',p:[{l:'Standard form',r:'ax²+bx+c'},{l:'Vertex form',r:'a(x−h)²+k'},{l:'Axis of symmetry',r:'x=−b/(2a)'},{l:'Discriminant',r:'b²−4ac'}]},
{t:'sr',ti:'Worked Example: Solve \\(x^2-5x+6=0\\) by Factoring',steps:[
  'Look for two numbers that multiply to \\(6\\) and add to \\(-5\\): those numbers are \\(-2\\) and \\(-3\\).',
  'Factor: \\(x^2-5x+6=(x-2)(x-3)\\).',
  'Set each factor to zero: \\(x-2=0\\) or \\(x-3=0\\).',
  'Solutions: \\(x=2\\) or \\(x=3\\).'
]}];
D['ag-exponents']=[{t:'tf',ti:'True or False: Exponent Laws',items:[{s:'\\(x^m\\cdot x^n=x^{m+n}\\)',a:true,ex:'Add exponents — product rule.'},{s:'\\((x^m)^n=x^{m+n}\\)',a:false,ex:'\\((x^m)^n=x^{mn}\\).'},{s:'\\(x^0=0\\) for \\(x\\neq0\\)',a:false,ex:'\\(x^0=1\\).'},{s:'\\(x^{-n}=\\frac{1}{x^n}\\)',a:true,ex:'Definition of negative exponents.'}]},
{t:'fn',ti:'Explorer: Power Functions \\(y=x^n\\)',fns:[{expr:'x^n',color:'#1E3A6E',label:'x^n'}],xrange:[-3,3],yrange:[-10,10],params:[{name:'n',label:'Exponent n',min:1,max:5,step:1,default:2}]},
{t:'sr',ti:'Worked Example: Simplify \\(\\dfrac{x^5\\cdot x^3}{x^4}\\)',steps:[
  'Combine the numerator using the product rule: \\(x^5\\cdot x^3=x^{5+3}=x^8\\).',
  'Divide using the quotient rule: \\(\\dfrac{x^8}{x^4}=x^{8-4}=x^4\\).',
  'Simplified result: \\(x^4\\).'
]},
{t:'qc',ti:'Quick Check: Exponent Rules',q:'Simplify \\((2x^3)^2\\)',o:['\\(4x^6\\)','\\(2x^6\\)','\\(4x^5\\)','\\(2x^5\\)'],a:0,ex:'Square both factors: \\(2^2=4\\) and \\((x^3)^2=x^6\\).'}];
D['ag-functions']=[{t:'sb',ti:'Step Builder: Evaluate \\((f\\circ g)(3)\\), \\(f(x)=2x+1\\), \\(g(x)=x^2\\)',steps:[{l:'Compute \\(g(3)=3^2=\\)',a:'9',h:'\\(9\\)'},{l:'Compute \\(f(9)=2(9)+1=\\)',a:'19',h:'\\(18+1=19\\)'}]}];
D['ag-exponential']=[
{t:'sr',ti:'Worked Example: Solve \\(3^{x+1}=81\\)',steps:[
  'Write \\(81\\) as a power of \\(3\\): \\(81=3^4\\).',
  'Since the bases match, set the exponents equal: \\(x+1=4\\).',
  'Solve: \\(x=3\\).'
]},
{t:'qc',ti:'Quick Check: Logarithms',q:'Solve \\(\\log_2(x)=5\\)',o:['\\(x=32\\)','\\(x=10\\)','\\(x=25\\)','\\(x=16\\)'],a:0,ex:'\\(\\log_2(x)=5\\) means \\(2^5=x\\), so \\(x=32\\).'}
];
D['ag-systems']=[
{t:'sr',ti:'Worked Example: Solve the System \\(y=2x+1\\), \\(3x+y=11\\)',steps:[
  'Substitute the first equation into the second: \\(3x+(2x+1)=11\\).',
  'Combine like terms: \\(5x+1=11\\).',
  'Solve for \\(x\\): \\(5x=10\\Rightarrow x=2\\).',
  'Back-substitute: \\(y=2(2)+1=5\\). Solution: \\((2,5)\\).'
]},
{t:'qc',ti:'Quick Check: Linear Inequalities',q:'Which point satisfies \\(y>x+1\\)?',o:['\\((0,0)\\)','\\((3,5)\\)','\\((1,1)\\)','\\((2,2)\\)'],a:1,ex:'At \\((3,5)\\): \\(5>3+1=4\\) ✓. The others all fail.'}
];
D['ag-sequences']=[
{t:'fn',ti:'Explorer: Geometric Growth \\(a\\cdot r^{\\,x}\\)',fns:[{expr:'2*r^x',color:'#1E3A6E',label:'2·r^x'}],xrange:[0,5],yrange:[0,20],params:[{name:'r',label:'Ratio r',min:0.5,max:2,step:0.1,default:1.5}]},
{t:'sr',ti:'Worked Example: 12th Term of \\(4,9,14,19,\\ldots\\)',steps:[
  'Identify \\(a_1=4\\) and the common difference \\(d=9-4=5\\).',
  'Use the formula \\(a_n=a_1+(n-1)d\\).',
  'Substitute \\(n=12\\): \\(a_{12}=4+(12-1)(5)=4+55=59\\).'
]},
{t:'qc',ti:'Quick Check: Geometric Series',q:'Find the sum of the first 5 terms of \\(2,4,8,16,\\ldots\\)',o:['62','30','31','60'],a:0,ex:'\\(S_5=\\dfrac{a(r^n-1)}{r-1}=\\dfrac{2(2^5-1)}{2-1}=62\\).'}
];
D['ag-factoring']=[
{t:'fn',ti:'Explorer: Roots and Factors \\((x-a)(x-2)\\)',fns:[{expr:'(x-a)*(x-2)',color:'#1E3A6E',label:'(x-a)(x-2)'}],xrange:[-5,5],yrange:[-10,10],params:[{name:'a',label:'Root a',min:-4,max:4,step:1,default:1}]},
{t:'sr',ti:'Worked Example: Factor \\(x^3+3x^2+2x+6\\) by Grouping',steps:[
  'Group terms in pairs: \\((x^3+3x^2)+(2x+6)\\).',
  'Factor each group: \\(x^2(x+3)+2(x+3)\\).',
  'Factor out the common binomial \\((x+3)\\): \\((x+3)(x^2+2)\\).'
]},
{t:'qc',ti:'Quick Check: Difference of Squares',q:'Factor \\(x^2-16\\)',o:['\\((x-4)(x+4)\\)','\\((x-8)(x+2)\\)','\\((x-4)^2\\)','\\((x+4)^2\\)'],a:0,ex:'Difference of squares: \\(x^2-16=(x-4)(x+4)\\).'}
];
D['ag-radicals']=[
{t:'fn',ti:'Explorer: Roots \\(y=x^{1/n}\\)',fns:[{expr:'x^(1/n)',color:'#1E3A6E',label:'x^{1/n}'}],xrange:[0,10],yrange:[0,4],params:[{name:'n',label:'Root index n',min:2,max:4,step:1,default:2}]},
{t:'sr',ti:'Worked Example: Simplify \\(\\sqrt{75}\\)',steps:[
  'Find the largest perfect-square factor of \\(75\\): \\(75=25\\times3\\).',
  'Split the radical: \\(\\sqrt{75}=\\sqrt{25}\\times\\sqrt{3}\\).',
  'Simplify: \\(\\sqrt{25}=5\\), so \\(\\sqrt{75}=5\\sqrt3\\).'
]},
{t:'qc',ti:'Quick Check: Rational Exponents',q:'Simplify \\(x^{2/3}\\cdot x^{1/3}\\)',o:['\\(x\\)','\\(x^{2/9}\\)','\\(x^{1/3}\\)','\\(x^{3}\\)'],a:0,ex:'Add exponents: \\(\\frac23+\\frac13=1\\), so the result is \\(x^1=x\\).'}
];
D['ag-rational']=[
{t:'fn',ti:'Explorer: Rational Function \\(\\dfrac{1}{x-a}\\)',fns:[{expr:'1/(x-a)',color:'#1E3A6E',label:'1/(x-a)'}],xrange:[-5,5],yrange:[-6,6],params:[{name:'a',label:'Asymptote a',min:-3,max:3,step:1,default:1}]},
{t:'sr',ti:'Worked Example: Solve \\(\\dfrac{2}{x}+\\dfrac{1}{3}=\\dfrac{5}{6}\\)',steps:[
  'Multiply every term by the LCD, \\(6x\\): \\(6x\\cdot\\dfrac{2}{x}+6x\\cdot\\dfrac{1}{3}=6x\\cdot\\dfrac{5}{6}\\).',
  'Simplify each term: \\(12+2x=5x\\).',
  'Solve for \\(x\\): \\(12=3x\\Rightarrow x=4\\).'
]},
{t:'qc',ti:'Quick Check: Excluded Values',q:'What value of \\(x\\) must be excluded from \\(\\dfrac{3}{x-2}\\)?',o:['\\(x=2\\)','\\(x=0\\)','\\(x=3\\)','\\(x=-2\\)'],a:0,ex:'The denominator \\(x-2\\) cannot equal \\(0\\), so \\(x\\neq2\\).'}
];
D['ag-stats']=[
{t:'sr',ti:'Worked Example: Find the Mean of \\(4,6,6,8,10\\)',steps:[
  'Add all the values: \\(4+6+6+8+10=34\\).',
  'Divide by the number of values, \\(5\\): \\(\\dfrac{34}{5}=6.8\\).',
  'The mean is \\(6.8\\).'
]},
{t:'qc',ti:'Quick Check: Resistant Statistics',q:'Which measure of center is least affected by an outlier?',o:['Mean','Median','Range','Sum'],a:1,ex:'The median depends only on the middle value(s), so extreme outliers don\'t pull it around the way they do the mean.'}
];

/* ── AP CALC AB ── */
D['apab-u1']=[{t:'qc',ti:'Quick Check: Limits',q:'\\(\\displaystyle\\lim_{x\\to 2}\\frac{x^2-4}{x-2}=\\)',o:['0','2','4','undefined'],a:2,ex:'Factor: \\(\\frac{(x+2)(x-2)}{x-2}=x+2\\to4\\).'},
{t:'sr',ti:"Worked Example: L'Hôpital's Rule",steps:[
  'Evaluate \\(\\displaystyle\\lim_{x\\to0}\\dfrac{\\sin x}{x}\\). Direct substitution gives \\(\\frac00\\), an indeterminate form — L\'Hôpital\'s Rule applies.',
  'Differentiate numerator and denominator separately: \\(\\dfrac{\\cos x}{1}\\).',
  'Evaluate at \\(x=0\\): \\(\\cos(0)=1\\).',
  'So \\(\\displaystyle\\lim_{x\\to0}\\dfrac{\\sin x}{x}=1\\).'
]}];
D['apab-u2']={t:'mt',ti:'Matching: Trig Derivatives',p:[{l:'\\(\\frac{d}{dx}\\sin x\\)',r:'cos x'},{l:'\\(\\frac{d}{dx}\\cos x\\)',r:'−sin x'},{l:'\\(\\frac{d}{dx}\\tan x\\)',r:'sec²x'},{l:'\\(\\frac{d}{dx}\\ln x\\)',r:'1/x'}]};
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

/* ── AP CALC BC ── */
D['apbc-beyond']=[
{t:'sr',ti:'Worked Example: Improper Integral',steps:[
  'Evaluate \\(\\displaystyle\\int_1^{\\infty}\\dfrac{1}{x^2}\\,dx\\). Rewrite as a limit: \\(\\displaystyle\\lim_{b\\to\\infty}\\int_1^b x^{-2}\\,dx\\).',
  'Antiderivative: \\(\\left[-\\dfrac1x\\right]_1^b=-\\dfrac1b+1\\).',
  'Take the limit as \\(b\\to\\infty\\): \\(-\\dfrac1b\\to0\\), so the integral converges to \\(1\\).'
]},
{t:'qc',ti:'Quick Check: Improper Integrals',q:'An improper integral \\(\\int_1^\\infty\\frac1{x^p}\\,dx\\) converges when:',o:['\\(p>1\\)','\\(p<1\\)','\\(p=1\\)','\\(p=0\\)'],a:0,ex:'The p-integral test: convergence requires \\(p>1\\).'}
];
D['apbc-c1']=[{t:'qc',ti:'Quick Check: Integration Techniques',q:'\\(\\displaystyle\\int\\frac{1}{1+x^2}\\,dx=\\)',o:['ln|1+x²|+C','arctan x+C','arcsin x+C','½ln|1+x²|+C'],a:1,ex:'Standard: \\(\\int\\frac{dx}{1+x^2}=\\arctan x+C\\).'},
{t:'sr',ti:'Worked Example: Partial Fractions',steps:[
  'Decompose \\(\\dfrac{1}{x^2-1}\\). Factor the denominator: \\(x^2-1=(x-1)(x+1)\\).',
  'Write \\(\\dfrac{1}{(x-1)(x+1)}=\\dfrac{A}{x-1}+\\dfrac{B}{x+1}\\).',
  'Multiply through: \\(1=A(x+1)+B(x-1)\\). Let \\(x=1\\): \\(1=2A\\Rightarrow A=\\dfrac12\\). Let \\(x=-1\\): \\(1=-2B\\Rightarrow B=-\\dfrac12\\).',
  'Result: \\(\\dfrac{1}{x^2-1}=\\dfrac{1/2}{x-1}-\\dfrac{1/2}{x+1}\\).'
]}];
D['apbc-c2']=[{t:'mt',ti:"Matching: Euler's Method & Logistic",p:[{l:"Euler step",r:'y_n + h·f(x_n,y_n)'},{l:'Logistic DE',r:'kP(1−P/M)'},{l:'Carrying capacity',r:'M'},{l:'Separable DE',r:'dy/dx=g(x)h(y)'}]},
{t:'sr',ti:"Worked Example: One Step of Euler's Method",steps:[
  'Use Euler\'s Method with step size \\(h=0.5\\) to estimate \\(y(0.5)\\) if \\(\\dfrac{dy}{dx}=x+y\\), \\(y(0)=1\\). Euler\'s formula: \\(y_{n+1}=y_n+h\\cdot f(x_n,y_n)\\).',
  'At \\((x_0,y_0)=(0,1)\\): \\(f(0,1)=0+1=1\\).',
  '\\(y_1=1+0.5(1)=1.5\\).'
]}];
D['apbc-c3']=[{t:'tf',ti:'True or False: Parametric Calculus',items:[{s:'\\(\\frac{dy}{dx}=\\frac{dy/dt}{dx/dt}\\)',a:true,ex:'Standard parametric slope formula.'},{s:'Speed \\(=\\frac{dx}{dt}+\\frac{dy}{dt}\\)',a:false,ex:'Speed \\(=\\sqrt{(dx/dt)^2+(dy/dt)^2}\\).'},{s:'Arc length \\(=\\int_a^b\\sqrt{(\\dot x)^2+(\\dot y)^2}\\,dt\\)',a:true,ex:'Correct arc length formula.'},{s:'A vector has only magnitude',a:false,ex:'Vectors have both magnitude and direction.'}]},
{t:'sr',ti:'Worked Example: Arc Length of a Parametric Curve',steps:[
  'Find the arc length of \\(x=3t,\\ y=4t\\) for \\(0\\le t\\le2\\). Compute \\(\\dfrac{dx}{dt}=3\\) and \\(\\dfrac{dy}{dt}=4\\).',
  'Arc length formula: \\(L=\\displaystyle\\int_0^2\\sqrt{3^2+4^2}\\,dt=\\int_0^2 5\\,dt\\).',
  'Evaluate: \\(L=5(2)=10\\).'
]}];
D['apbc-c4']={t:'sb',ti:'Step Builder: Polar area \\(r=2\\cos\\theta\\), \\(0\\le\\theta\\le\\pi/2\\)',steps:[{l:'Formula: \\(A=\\frac{1}{2}\\int r^2\\,d\\theta\\). Here \\(r^2=\\)',a:'4cos^2θ',h:'\\((2\\cos\\theta)^2=4\\cos^2\\theta\\)'},{l:'Evaluate \\(A=\\frac{1}{2}\\int_0^{\\pi/2}4\\cos^2\\theta\\,d\\theta=\\)',a:'pi/2',h:'Use half-angle identity → \\(\\pi/2\\)'}]};
D['apbc-c5']=[
{t:'sr',ti:'Worked Example: Alternating Series Test',steps:[
  'Determine if \\(\\displaystyle\\sum_{n=1}^{\\infty}\\dfrac{(-1)^{n+1}}{n}\\) converges. Check the Alternating Series Test conditions: the terms \\(a_n=\\dfrac1n\\) must be decreasing and approach \\(0\\).',
  'Since \\(\\dfrac1n\\) is decreasing and \\(\\dfrac1n\\to0\\) as \\(n\\to\\infty\\), both conditions hold.',
  'By the Alternating Series Test, the series converges (this is the alternating harmonic series).'
]},
{t:'qc',ti:'Quick Check: Power Series',q:'The interval of convergence for a power series is centered at:',o:['The center of the series, \\(a\\)','\\(x=0\\) always','The radius of convergence','Infinity'],a:0,ex:'A power series \\(\\sum c_n(x-a)^n\\) is always centered at \\(x=a\\).'}
];
D['apbc-c6']=[
{t:'sr',ti:'Worked Example: Build a Maclaurin Series',steps:[
  'Find the first three terms of the Maclaurin series for \\(f(x)=e^x\\). Formula: \\(f(x)=f(0)+f\'(0)x+\\dfrac{f\'\'(0)}{2!}x^2+\\cdots\\).',
  'Every derivative of \\(e^x\\) is \\(e^x\\), and \\(e^0=1\\), so \\(f(0)=f\'(0)=f\'\'(0)=1\\).',
  'First three terms: \\(1+x+\\dfrac{x^2}{2}\\).'
]},
{t:'qc',ti:'Quick Check: Maclaurin Series',q:'The Maclaurin series is a Taylor series centered at:',o:['\\(x=0\\)','\\(x=1\\)','\\(x=e\\)','\\(x=\\infty\\)'],a:0,ex:'A Maclaurin series is a Taylor series expanded about \\(x=0\\).'}
];

/* ── IGCSE ── */
D['ig-number']=[{t:'qc',ti:'Quick Check: Percentage',q:'Find \\(15\\%\\) of \\(240\\)',o:['30','36','24','40'],a:1,ex:'\\(0.15\\times240=36\\).'},
{t:'sr',ti:'Worked Example: Rationalising a Surd Denominator',steps:[
'Rationalise \\(\\dfrac{5}{\\sqrt{3}}\\). Multiply top and bottom by \\(\\sqrt{3}\\) so the denominator becomes rational.',
'\\(\\dfrac{5}{\\sqrt{3}}\\times\\dfrac{\\sqrt{3}}{\\sqrt{3}}=\\dfrac{5\\sqrt{3}}{3}\\).',
'The denominator is now the integer 3 — the surd has moved to the numerator, the accepted exact form.'
]}];
D['ig-algebra']=[{t:'mt',ti:'Matching: Algebraic Identities',p:[{l:'\\((a+b)^2\\)',r:'a²+2ab+b²'},{l:'\\((a-b)^2\\)',r:'a²−2ab+b²'},{l:'\\((a+b)(a-b)\\)',r:'a²−b²'},{l:'Quadratic formula',r:'[−b±√(b²−4ac)]/2a'}]},
{t:'fn',ti:'Explorer: Quadratic Graph \\(y=x^2+k\\)',fns:[{expr:'x^2+k',color:'#1E3A6E'}],xrange:[-5,5],yrange:[-4,10],params:[{name:'k',label:'Vertical shift k',min:-4,max:6,step:1,default:0}]},
{t:'sr',ti:'Worked Example: Solving a Quadratic by Factorising',steps:[
'Solve \\(x^2+5x+6=0\\). Find two numbers that multiply to 6 and add to 5.',
'The numbers are 2 and 3, so \\(x^2+5x+6=(x+2)(x+3)\\).',
'Set each factor to zero: \\(x=-2\\) or \\(x=-3\\).'
]}];
D['ig-geometry']=[{t:'tf',ti:'True or False: Geometry',items:[{s:'Vertically opposite angles are equal',a:true,ex:'Vertical angles theorem.'},{s:'An isosceles triangle has all three sides equal',a:false,ex:'Equilateral has all equal; isosceles has two equal.'},{s:'Sum of angles in a quadrilateral is \\(360°\\)',a:true,ex:'\\((n-2)\\times180°=360°\\) for \\(n=4\\).'},{s:'Exterior angle of a triangle = sum of two non-adjacent interior angles',a:true,ex:'Exterior Angle Theorem.'}]},
{t:'sr',ti:'Worked Example: Circle Theorem (Reflex Angle)',steps:[
'Points A and B lie on a circle centre O. The reflex angle AOB equals \\(220°\\). Find the angle at the circumference subtended by the major arc AB.',
'The reflex angle \\(220°\\) is the central angle for the major arc, so the inscribed angle equals half of it.',
'\\(\\tfrac12\\times220°=110°\\).'
]}];
D['ig-trig']=[{t:'sb',ti:'Step Builder: Right triangle, angle \\(30°\\), hyp \\(=10\\). Find opposite side.',steps:[{l:'Trig ratio for opp/hyp:',a:'sin',h:'SOH: sin = opp/hyp'},{l:'\\(\\sin 30°=\\)',a:'0.5',h:'\\(\\frac{1}{2}=0.5\\)'},{l:'Opposite \\(=10\\times0.5=\\)',a:'5',h:'\\(5\\)'}]},
{t:'sr',ti:'Worked Example: Cosine Rule',steps:[
'In triangle ABC, \\(a=7\\), \\(b=9\\), and included angle \\(C=55°\\). Find side \\(c\\) using the cosine rule.',
'\\(c^2=a^2+b^2-2ab\\cos C=49+81-2(7)(9)\\cos55°\\).',
'\\(c^2\\approx130-72.3\\approx57.7\\), so \\(c\\approx7.60\\).'
]},
{t:'qc',ti:'Quick Check: Bearings',q:'A ship sails on a bearing of \\(200°\\). What is the back-bearing from its new position to the start?',o:['020°','160°','340°','200°'],a:0,ex:'Back-bearing \\(=200°-180°=020°\\).'}];

/* ── ALGEBRA 2 ── */
D['a2-functions']=[{t:'qc',ti:'Quick Check: Function Notation',q:'If \\(f(x)=3x^2-2\\), find \\(f(-1)\\)',o:['1','5','−5','−1'],a:0,ex:'\\(3(1)-2=1\\).'},
{t:'fn',ti:'Explorer: Horizontal Shift \\((x-h)^2\\)',fns:[{expr:'(x-h)^2',color:'#1E3A6E',label:'(x-h)^2'}],xrange:[-6,6],yrange:[-2,10],params:[{name:'h',label:'Shift h',min:-3,max:3,step:1,default:0}]},
{t:'sr',ti:'Worked Example: Find the Domain of \\(f(x)=\\sqrt{x-3}\\)',steps:[
  'The expression under a square root must be \\(\\geq0\\): \\(x-3\\geq0\\).',
  'Solve the inequality: \\(x\\geq3\\).',
  'Domain: \\([3,\\infty)\\).'
]}];
D['a2-quadratics']=[{t:'mt',ti:'Matching: Powers of i',p:[{l:'\\(i^1\\)',r:'i'},{l:'\\(i^2\\)',r:'−1'},{l:'\\(i^3\\)',r:'−i'},{l:'\\(i^4\\)',r:'1'}]},
{t:'fn',ti:'Explorer: Parabola \\(x^2-4x+c\\) — Watch the Roots',fns:[{expr:'x^2-4*x+c',color:'#1E3A6E',label:'x^2-4x+c'}],xrange:[-2,6],yrange:[-6,8],params:[{name:'c',label:'Constant c',min:-2,max:6,step:1,default:0}]},
{t:'sr',ti:'Worked Example: Solve \\(x^2+2x+5=0\\)',steps:[
  'Identify \\(a=1,\\ b=2,\\ c=5\\). Compute the discriminant: \\(b^2-4ac=4-20=-16\\).',
  'Since the discriminant is negative, the roots are complex: \\(x=\\dfrac{-b\\pm\\sqrt{-16}}{2a}\\).',
  '\\(\\sqrt{-16}=4i\\), so \\(x=\\dfrac{-2\\pm4i}{2}=-1\\pm2i\\).'
]}];
D['a2-polynomials']=[{t:'tf',ti:'True or False: Polynomials',items:[{s:'A degree-3 polynomial always has exactly 3 real roots',a:false,ex:'It can have 1 real + 2 complex roots.'},{s:'Remainder Theorem: \\(f(c)\\) = remainder when \\(f(x)\\div(x-c)\\)',a:true,ex:'Correct.'},{s:'If \\(f(a)=0\\), then \\((x-a)\\) is a factor',a:true,ex:'Factor Theorem.'},{s:'Leading term controls end behavior',a:true,ex:'Correct.'}]},
{t:'sr',ti:'Worked Example: Remainder Theorem for \\(f(x)=x^3-4x^2+x+6\\) at \\(x=2\\)',steps:[
  'By the Remainder Theorem, \\(f(2)\\) equals the remainder of \\(f(x)\\div(x-2)\\) — fastest way is to just substitute \\(x=2\\).',
  'Substitute: \\(f(2)=(2)^3-4(2)^2+(2)+6\\).',
  'Compute: \\(8-16+2+6=0\\).',
  'Since \\(f(2)=0\\), \\(x=2\\) is a root and \\((x-2)\\) is a factor.'
]}];
D['a2-rational']=[
{t:'sr',ti:'Worked Example: Simplify \\(\\dfrac{x^2-9}{x^2-x-12}\\)',steps:[
  'Factor the numerator: \\(x^2-9=(x-3)(x+3)\\).',
  'Factor the denominator: \\(x^2-x-12=(x-4)(x+3)\\).',
  'Cancel the common factor \\((x+3)\\): \\(\\dfrac{x-3}{x-4}\\).'
]},
{t:'qc',ti:'Quick Check: Simplifying Rational Expressions',q:'Simplify \\(\\dfrac{2x}{x^2}\\)',o:['\\(\\dfrac2x\\)','\\(2x\\)','\\(\\dfrac x2\\)','\\(2\\)'],a:0,ex:'Cancel one factor of \\(x\\): \\(\\dfrac{2x}{x^2}=\\dfrac2x\\).'}
];
D['a2-exponential']=[{t:'sb',ti:'Step Builder: Solve \\(2^{x+1}=32\\)',steps:[{l:'Write 32 as power of 2: \\(32=2^?\\)',a:'5',h:'\\(2^5=32\\)'},{l:'Set exponents equal: \\(x+1=\\)',a:'5',h:'Same base → equal exponents'},{l:'Solve: \\(x=\\)',a:'4',h:'\\(x+1=5\\Rightarrow x=4\\)'}]},
{t:'fn',ti:'Explorer: Exponential Base \\(a^x\\)',fns:[{expr:'a^x',color:'#1E3A6E',label:'a^x'}],xrange:[-3,3],yrange:[0,10],params:[{name:'a',label:'Base a',min:0.5,max:3,step:0.5,default:2}]},
{t:'sr',ti:'Worked Example: Solve \\(\\log(x)+\\log(x-3)=1\\)',steps:[
  'Combine logs using the product rule: \\(\\log[x(x-3)]=1\\).',
  'Rewrite in exponential form: \\(x(x-3)=10^1=10\\).',
  'Expand and solve: \\(x^2-3x-10=0\\Rightarrow(x-5)(x+2)=0\\), so \\(x=5\\) or \\(x=-2\\).',
  'Reject \\(x=-2\\) (makes the original logs undefined). Solution: \\(x=5\\).'
]}];
D['a2-radical']=[
{t:'fn',ti:'Explorer: Shifted Square Root \\(\\sqrt{x-h}\\)',fns:[{expr:'sqrt(x-h)',color:'#1E3A6E',label:'sqrt(x-h)'}],xrange:[-4,6],yrange:[0,4],params:[{name:'h',label:'Shift h',min:-3,max:3,step:1,default:0}]},
{t:'sr',ti:'Worked Example: Solve \\(\\sqrt{2x+3}=5\\)',steps:[
  'Square both sides to eliminate the radical: \\(2x+3=25\\).',
  'Solve: \\(2x=22\\Rightarrow x=11\\).',
  'Check: \\(\\sqrt{2(11)+3}=\\sqrt{25}=5\\) ✓.'
]},
{t:'qc',ti:'Quick Check: Radical Equations',q:'Solve \\(\\sqrt{x}=-3\\)',o:['No real solution','\\(x=9\\)','\\(x=-9\\)','\\(x=3\\)'],a:0,ex:'The principal square root is always \\(\\geq0\\), so it can never equal \\(-3\\).'}
];
D['a2-sequences']=[
{t:'fn',ti:'Explorer: Arithmetic vs Geometric Growth',fns:[{expr:'2+3*x',color:'#1E3A6E',label:'arithmetic'},{expr:'2*r^x',color:'#B8801F',label:'geometric'}],xrange:[0,5],yrange:[0,30],params:[{name:'r',label:'Ratio r',min:1,max:2,step:0.1,default:1.5}]},
{t:'sr',ti:'Worked Example: Sum of the First 20 Terms of \\(3,7,11,15,\\ldots\\)',steps:[
  'Identify \\(a_1=3\\), \\(d=4\\), \\(n=20\\).',
  'Find the 20th term: \\(a_{20}=3+(20-1)(4)=3+76=79\\).',
  'Use the sum formula \\(S_n=\\dfrac{n}{2}(a_1+a_n)\\): \\(S_{20}=\\dfrac{20}{2}(3+79)=10(82)=820\\).'
]},
{t:'qc',ti:'Quick Check: Arithmetic vs Geometric',q:'Is the sequence \\(5,-10,20,-40,\\ldots\\) arithmetic or geometric?',o:['Geometric, \\(r=-2\\)','Arithmetic, \\(d=-15\\)','Geometric, \\(r=2\\)','Arithmetic, \\(d=-5\\)'],a:0,ex:'Each term is multiplied by \\(-2\\): \\(5\\times(-2)=-10\\), \\(-10\\times(-2)=20\\) — a geometric sequence.'}
];
D['a2-conics']=[
{t:'sr',ti:'Worked Example: Center and Radius of \\(x^2+y^2-6x+4y-3=0\\)',steps:[
  'Group x-terms and y-terms: \\((x^2-6x)+(y^2+4y)=3\\).',
  'Complete the square for each: \\((x^2-6x+9)+(y^2+4y+4)=3+9+4\\).',
  'Write as squares: \\((x-3)^2+(y+2)^2=16\\).',
  'Center \\((3,-2)\\), radius \\(\\sqrt{16}=4\\).'
]},
{t:'qc',ti:'Quick Check: Identifying Conics',q:'The equation \\(\\dfrac{x^2}{9}+\\dfrac{y^2}{4}=1\\) represents:',o:['An ellipse','A circle','A hyperbola','A parabola'],a:0,ex:'Two positive squared terms with different denominators, summing to 1 — an ellipse.'}
];
D['a2-trig']=[
{t:'fn',ti:'Explorer: Amplitude \\(A\\cdot\\sin(x)\\)',fns:[{expr:'A*sin(x)',color:'#1E3A6E',label:'A·sin(x)'}],xrange:[-6.3,6.3],yrange:[-3.5,3.5],params:[{name:'A',label:'Amplitude A',min:0.5,max:3,step:0.5,default:1}]},
{t:'sr',ti:'Worked Example: Find \\(\\sin(210°)\\)',steps:[
  '\\(210°\\) is in the third quadrant, where sine is negative.',
  'The reference angle is \\(210°-180°=30°\\).',
  '\\(\\sin(30°)=\\dfrac12\\), so \\(\\sin(210°)=-\\dfrac12\\).'
]},
{t:'qc',ti:'Quick Check: Sign of Trig Functions',q:'In which quadrant is \\(\\cos\\theta<0\\) and \\(\\sin\\theta>0\\)?',o:['II','I','III','IV'],a:0,ex:'In Quadrant II, x-values (cosine) are negative and y-values (sine) are positive.'}
];
D['a2-matrices']=[
{t:'sr',ti:'Worked Example: Determinant of \\(\\begin{pmatrix}3&2\\\\1&4\\end{pmatrix}\\)',steps:[
  'For a \\(2\\times2\\) matrix \\(\\begin{pmatrix}a&b\\\\c&d\\end{pmatrix}\\), the determinant is \\(ad-bc\\).',
  'Substitute: \\(\\det=(3)(4)-(2)(1)\\).',
  'Compute: \\(12-2=10\\).'
]},
{t:'qc',ti:'Quick Check: Systems and Determinants',q:'A system of equations has no solution when its lines are:',o:['Parallel and distinct','Intersecting','The same line','Perpendicular'],a:0,ex:'Parallel, non-identical lines never meet, so there is no solution.'}
];
D['a2-stats']=[
{t:'sr',ti:'Worked Example: Basic Probability',steps:[
  'A bag has 4 red and 6 blue marbles. Total marbles: \\(4+6=10\\).',
  'Favorable outcomes (red): \\(4\\).',
  'Probability: \\(P(\\text{red})=\\dfrac{4}{10}=\\dfrac{2}{5}\\).'
]},
{t:'qc',ti:'Quick Check: Two Dice',q:'Two dice are rolled. What is \\(P(\\text{sum}=7)\\)?',o:['\\(\\dfrac16\\)','\\(\\dfrac1{12}\\)','\\(\\dfrac1{36}\\)','\\(\\dfrac18\\)'],a:0,ex:'6 of the 36 outcomes sum to 7 (1+6, 2+5, 3+4, 4+3, 5+2, 6+1): \\(\\dfrac{6}{36}=\\dfrac16\\).'}
];

/* ── GEOMETRY ── */
D['geo-foundations']=[
{t:'sr',ti:'Worked Example: Write a Converse Statement',steps:[
  'A conditional statement has the form "If P, then Q." Here take: "If a shape is a square, then it has four right angles." \\(P\\)="is a square", \\(Q\\)="has four right angles."',
  'The converse swaps P and Q: "If Q, then P."',
  'Converse: "If a shape has four right angles, then it is a square."',
  'Notice this converse is actually <em>false</em> (a rectangle has four right angles but isn\'t always a square) — a reminder that a converse isn\'t automatically true just because the original statement is.'
]},
{t:'qc',ti:'Quick Check: Geometric Reasoning',q:'What do we call a statement accepted as true without proof?',o:['Postulate','Theorem','Corollary','Converse'],a:0,ex:'A postulate (or axiom) is assumed true as a starting point; a theorem must be proved from postulates.'}
];
D['geo-lines']={t:'qc',ti:'Quick Check: Parallel Lines',q:'Co-interior angles between parallel lines sum to:',o:['90°','180°','270°','360°'],a:1,ex:'Supplementary angles — sum to \\(180°\\).'};
D['geo-triangles']=[{t:'mt',ti:'Matching: Triangle Congruence',p:[{l:'Side-Side-Side',r:'SSS'},{l:'Side-Angle-Side',r:'SAS'},{l:'Angle-Side-Angle',r:'ASA'},{l:'Angle-Angle-Side',r:'AAS'}]},
{t:'sr',ti:'Worked Example: Find the Missing Angle',steps:[
  'In \\(\\triangle ABC\\), \\(\\angle A=50°\\) and \\(\\angle B=70°\\). The angles of a triangle always sum to \\(180°\\).',
  'Set up the equation: \\(50°+70°+\\angle C=180°\\).',
  'Solve: \\(\\angle C=180°-120°=60°\\).'
]}];
D['geo-similarity']=[
{t:'sr',ti:'Worked Example: Similar Triangles — Find a Missing Side',steps:[
  'Triangles \\(ABC\\) and \\(DEF\\) are similar, with \\(AB=6\\), \\(DE=9\\), \\(BC=8\\). Corresponding sides are proportional: \\(\\dfrac{AB}{DE}=\\dfrac{BC}{EF}\\).',
  'Substitute known values: \\(\\dfrac{6}{9}=\\dfrac{8}{EF}\\).',
  'Cross-multiply: \\(6\\cdot EF=9\\cdot8=72\\).',
  'Solve: \\(EF=12\\).'
]},
{t:'qc',ti:'Quick Check: Similar vs Congruent',q:'If two triangles have all corresponding angles equal, they are:',o:['Similar','Congruent','Complementary','Perpendicular'],a:0,ex:'Equal angles alone guarantee similarity (AA), not necessarily equal size (congruence).'}
];
D['geo-quads']=[
{t:'sr',ti:'Worked Example: Sum of Interior Angles of a Hexagon',steps:[
  'Use the formula \\((n-2)\\times180°\\), where \\(n\\) is the number of sides.',
  'A hexagon has \\(n=6\\) sides.',
  'Substitute: \\((6-2)\\times180°=4\\times180°=720°\\).'
]},
{t:'qc',ti:'Quick Check: Quadrilateral Types',q:'A parallelogram with all sides equal and no right angles is a:',o:['Rhombus','Square','Rectangle','Trapezoid'],a:0,ex:'Equal sides define a rhombus; without right angles it isn\'t a square.'}
];
D['geo-circles']=[{t:'tf',ti:'True or False: Circle Theorems',items:[{s:'Inscribed angle = half the central angle on same arc',a:true,ex:'Inscribed Angle Theorem.'},{s:"Angle in a semicircle is 90°",a:true,ex:"Thales' Theorem."},{s:'Two tangents from an external point have different lengths',a:false,ex:'Equal tangent lengths from external point.'},{s:'Tangent is perpendicular to radius at contact point',a:true,ex:'Tangent-radius property.'}]},
{t:'sr',ti:'Worked Example: Arc Length of a Sector',steps:[
  'Find the arc length of a \\(60°\\) sector in a circle of radius \\(9\\). Arc length formula: \\(s=\\dfrac{\\theta}{360°}\\times2\\pi r\\).',
  'Substitute \\(\\theta=60°\\), \\(r=9\\): \\(s=\\dfrac{60}{360}\\times2\\pi(9)\\).',
  'Simplify: \\(s=\\dfrac16\\times18\\pi=3\\pi\\).'
]}];
D['geo-right']={t:'sb',ti:'Step Builder: Hypotenuse of right triangle, legs \\(5\\) and \\(12\\)',steps:[{l:'\\(c^2=5^2+12^2=\\)',a:'169',h:'\\(25+144=169\\)'},{l:'\\(c=\\sqrt{169}=\\)',a:'13',h:'\\(\\sqrt{169}=13\\)'}]};
D['geo-solids']=[
{t:'sr',ti:'Worked Example: Volume of a Cylinder',steps:[
  'Find the volume of a cylinder with radius \\(4\\) and height \\(10\\). Volume formula: \\(V=\\pi r^2h\\).',
  'Substitute \\(r=4\\), \\(h=10\\): \\(V=\\pi(4)^2(10)\\).',
  'Compute: \\(V=160\\pi\\).'
]},
{t:'qc',ti:'Quick Check: Surface Area',q:'Surface area of a cube with side length 5:',o:['150','125','100','25'],a:0,ex:'\\(SA=6s^2=6(5^2)=6(25)=150\\).'}
];
D['geo-transform']=[
{t:'sr',ti:'Worked Example: Reflect a Point Over the y-axis',steps:[
  'Reflect the point \\((3,-2)\\) over the y-axis. Reflecting over the y-axis negates the x-coordinate and keeps y the same: \\((x,y)\\to(-x,y)\\).',
  'Apply to \\((3,-2)\\): \\((-3,-2)\\).'
]},
{t:'qc',ti:'Quick Check: Rotations',q:'A 180° rotation about the origin maps \\((x,y)\\) to:',o:['\\((-x,-y)\\)','\\((x,-y)\\)','\\((-x,y)\\)','\\((y,x)\\)'],a:0,ex:'A 180° rotation about the origin negates both coordinates.'}
];
D['geo-coord']=[
{t:'fn',ti:'Explorer: Line Slope \\(y=mx+2\\)',fns:[{expr:'m*x+2',color:'#1E3A6E',label:'y=mx+2'}],xrange:[-5,5],yrange:[-5,10],params:[{name:'m',label:'Slope m',min:-3,max:3,step:0.5,default:1}]},
{t:'sr',ti:'Worked Example: Distance Between Two Points',steps:[
  'Find the distance between \\((1,2)\\) and \\((4,6)\\). Use the distance formula: \\(d=\\sqrt{(x_2-x_1)^2+(y_2-y_1)^2}\\).',
  'Substitute: \\(d=\\sqrt{(4-1)^2+(6-2)^2}=\\sqrt{9+16}\\).',
  'Simplify: \\(d=\\sqrt{25}=5\\).'
]},
{t:'qc',ti:'Quick Check: Midpoint',q:'The midpoint of \\((2,4)\\) and \\((8,10)\\) is:',o:['\\((5,7)\\)','\\((6,7)\\)','\\((5,6)\\)','\\((10,14)\\)'],a:0,ex:'Midpoint = average of coordinates: \\(\\left(\\frac{2+8}{2},\\frac{4+10}{2}\\right)=(5,7)\\).'}
];
D['geo-prob']=[
{t:'sr',ti:'Worked Example: Geometric Probability',steps:[
  'A square dartboard has side \\(10\\) with a circular target of radius \\(3\\) at its center. Area of the square: \\(10\\times10=100\\).',
  'Area of the circle: \\(\\pi r^2=\\pi(3)^2=9\\pi\\).',
  'Probability \\(=\\dfrac{\\text{circle area}}{\\text{square area}}=\\dfrac{9\\pi}{100}\\approx0.283\\).'
]},
{t:'qc',ti:'Quick Check: Coin Flips',q:'A coin is flipped 3 times. What is \\(P(\\text{exactly 2 heads})\\)?',o:['\\(\\dfrac38\\)','\\(\\dfrac12\\)','\\(\\dfrac14\\)','\\(\\dfrac18\\)'],a:0,ex:'There are \\(\\binom32=3\\) ways to get 2 heads out of 8 equally likely outcomes: \\(\\dfrac38\\).'}
];

/* ── QUDRAT ── */
D['qud-arithmetic']=[{t:'qc',ti:'Quick Check: Fractions',ti_ar:'فحص سريع: الكسور',
q:'Find \\(\\frac{3}{4}\\) of \\(80\\)',q_ar:'أوجد \\(\\frac{3}{4}\\) من \\(80\\)',
o:['50','60','45','70'],a:1,ex:'\\(\\frac{3}{4}\\times80=60\\).'},
{t:'sr',ti:'Worked Example: Order of Operations',ti_ar:'مثال محلول: ترتيب العمليات الحسابية',steps:[
'Evaluate \\(3+4\\times(6-2)^2\\div8\\). Start with the brackets: \\(6-2=4\\).',
'Apply the exponent: \\(4^2=16\\). The expression becomes \\(3+4\\times16\\div8\\).',
'Multiply and divide left to right: \\(4\\times16=64\\), \\(64\\div8=8\\). Finally \\(3+8=11\\).'
],steps_ar:[
'احسب \\(3+4\\times(6-2)^2\\div8\\). ابدأ بالأقواس: \\(6-2=4\\).',
'طبّق الأس: \\(4^2=16\\). يصبح التعبير \\(3+4\\times16\\div8\\).',
'اضرب واقسم من اليسار إلى اليمين: \\(4\\times16=64\\)، \\(64\\div8=8\\). وأخيرًا \\(3+8=11\\).'
]}];
D['qud-ratio']=[{t:'mt',ti:'Matching: Ratios & Percents',ti_ar:'مطابقة: النسب والمئويات',
p:[{l:'40% as fraction',r:'2/5'},{l:'0.75 as percent',r:'75%'},{l:'1/3 as decimal',r:'0.333…'},{l:'If a:b=2:3, a=8, b=',r:'12'}],
p_ar:[{l:'40% كسر',r:'2/5'},{l:'0.75 كنسبة مئوية',r:'75%'},{l:'1/3 كعدد عشري',r:'0.333…'},{l:'إذا كانت a:b=2:3، وa=8، فإن b=',r:'12'}]},
{t:'sr',ti:'Worked Example: Sharing in a Ratio',ti_ar:'مثال محلول: تقسيم بنسبة',steps:[
'Share 150 in the ratio 2:3:5. Find the number of equal parts.',
'Total parts \\(=2+3+5=10\\), so each part \\(=150\\div10=15\\).',
'The three shares are \\(2\\times15=30\\), \\(3\\times15=45\\), and \\(5\\times15=75\\).'
],steps_ar:[
'اقسم 150 بنسبة 2:3:5. أوجد عدد الأجزاء المتساوية.',
'إجمالي الأجزاء \\(=2+3+5=10\\)، إذن كل جزء \\(=150\\div10=15\\).',
'الأنصبة الثلاثة هي \\(2\\times15=30\\)، و\\(3\\times15=45\\)، و\\(5\\times15=75\\).'
]},
{t:'qc',ti:'Quick Check: Percentage Change',ti_ar:'فحص سريع: التغيّر المئوي',
q:'A price rises from 80 to 92. Find the percentage increase.',q_ar:'يرتفع سعر من 80 إلى 92. أوجد نسبة الزيادة المئوية.',
o:['15%','12%','8%','20%'],a:0,ex:'\\(\\dfrac{92-80}{80}\\times100\\%=15\\%\\).'}];
D['qud-algebra']=[{t:'tf',ti:'True or False: Algebra Basics',ti_ar:'صحيح أم خطأ: أساسيات الجبر',
items:[{s:'\\(3(x+2)=3x+6\\)',a:true,ex:'Distributive property.'},{s:'\\(\\sqrt{a+b}=\\sqrt{a}+\\sqrt{b}\\)',a:false,ex:'Not true. E.g. \\(\\sqrt{25}=5\\neq3+4\\).'},{s:'\\(-(-x)=x\\)',a:true,ex:'Double negative cancels.'},{s:'\\(|x|=5\\) implies \\(x=5\\) only',a:false,ex:'\\(x=5\\) or \\(x=-5\\).'}],
items_ar:[{s:'\\(3(x+2)=3x+6\\)',a:true,ex:'خاصية التوزيع.'},{s:'\\(\\sqrt{a+b}=\\sqrt{a}+\\sqrt{b}\\)',a:false,ex:'غير صحيح. مثال: \\(\\sqrt{25}=5\\neq3+4\\).'},{s:'\\(-(-x)=x\\)',a:true,ex:'السالبان يُلغيان بعضهما.'},{s:'\\(|x|=5\\) تعني \\(x=5\\) فقط',a:false,ex:'\\(x=5\\) أو \\(x=-5\\).'}]},
{t:'sr',ti:'Worked Example: Solving a Linear System',ti_ar:'مثال محلول: حل نظام معادلات خطية',steps:[
'Solve \\(3x+2y=16\\) and \\(x-2y=0\\). Notice the \\(y\\)-terms cancel when the equations are added.',
'Add the two equations: \\(4x=16\\), so \\(x=4\\).',
'Substitute into \\(x-2y=0\\): \\(4-2y=0\\Rightarrow y=2\\). Solution: \\(x=4,\\ y=2\\).'
],steps_ar:[
'حل \\(3x+2y=16\\) و\\(x-2y=0\\). لاحظ أن حدود \\(y\\) تُلغى عند جمع المعادلتين.',
'اجمع المعادلتين: \\(4x=16\\)، إذن \\(x=4\\).',
'عوّض في \\(x-2y=0\\): \\(4-2y=0\\Rightarrow y=2\\). الحل: \\(x=4,\\ y=2\\).'
]},
{t:'qc',ti:'Quick Check: Powers',ti_ar:'فحص سريع: الأسس',
q:'Simplify \\(a^5\\div a^2\\).',q_ar:'بسّط \\(a^5\\div a^2\\).',
o:['a³','a⁷','a²·⁵','a¹⁰'],o_ar:['a³','a⁷','a²·⁵','a¹⁰'],
a:0,ex:'\\(a^m\\div a^n=a^{m-n}\\Rightarrow a^{5-2}=a^3\\).',ex_ar:'\\(a^m\\div a^n=a^{m-n}\\Rightarrow a^{5-2}=a^3\\).'}];
D['qud-geometry']=[{t:'sb',ti:'Step Builder: Trapezoid area, parallel sides \\(6\\) & \\(10\\), height \\(4\\)',
ti_ar:'باني الخطوات: مساحة شبه منحرف، الضلعان المتوازيان \\(6\\) و\\(10\\)، الارتفاع \\(4\\)',
steps:[{l:'Sum of parallel sides: \\(6+10=\\)',a:'16',h:'16'},{l:'\\(A=\\frac{1}{2}\\times16\\times4=\\)',a:'32',h:'\\(8\\times4=32\\)'}],
steps_ar:[{l:'مجموع الضلعين المتوازيين: \\(6+10=\\)',a:'16',h:'16'},{l:'\\(A=\\frac{1}{2}\\times16\\times4=\\)',a:'32',h:'\\(8\\times4=32\\)'}]},
{t:'sr',ti:'Worked Example: Circle Area from Circumference',ti_ar:'مثال محلول: مساحة الدائرة من المحيط',steps:[
'A circle has circumference 44 cm. Find its area, using \\(\\pi=\\tfrac{22}{7}\\). First find the radius from \\(C=2\\pi r\\).',
'\\(44=2\\times\\tfrac{22}{7}\\times r\\Rightarrow r=44\\div\\tfrac{44}{7}=7\\) cm.',
'Area \\(=\\pi r^2=\\tfrac{22}{7}\\times49=154\\ \\text{cm}^2\\).'
],steps_ar:[
'دائرة محيطها 44 سم. أوجد مساحتها، باعتبار \\(\\pi=\\tfrac{22}{7}\\). أوجد أولًا نصف القطر من \\(C=2\\pi r\\).',
'\\(44=2\\times\\tfrac{22}{7}\\times r\\Rightarrow r=44\\div\\tfrac{44}{7}=7\\) سم.',
'المساحة \\(=\\pi r^2=\\tfrac{22}{7}\\times49=154\\ \\text{cm}^2\\).'
]},
{t:'qc',ti:'Quick Check: Pythagoras',ti_ar:'فحص سريع: فيثاغورس',
q:'A right triangle has legs 9 and 12. Find the hypotenuse.',q_ar:'مثلث قائم الزاوية ضلعاه 9 و12. أوجد الوتر.',
o:['15','21','13.5','18'],a:0,ex:'\\(\\sqrt{9^2+12^2}=\\sqrt{81+144}=\\sqrt{225}=15\\).'}];
D['qud-compare']=[{t:'sr',ti:'Worked Example: Quantitative Comparison Strategy',ti_ar:'مثال محلول: استراتيجية المقارنة الكمّية',steps:[
'Compare Quantity A: \\((x+2)^2\\) and Quantity B: \\(x^2+4\\) for any real \\(x\\). Expand Quantity A first.',
'\\((x+2)^2=x^2+4x+4\\). Subtract Quantity B: \\((x^2+4x+4)-(x^2+4)=4x\\).',
'The sign of \\(4x\\) depends on \\(x\\) — positive when \\(x>0\\), negative when \\(x<0\\). The relationship cannot be determined.'
],steps_ar:[
'قارن الكمية A: \\((x+2)^2\\) بالكمية B: \\(x^2+4\\) لأي عدد حقيقي \\(x\\). افرد الكمية A أولًا.',
'\\((x+2)^2=x^2+4x+4\\). اطرح الكمية B: \\((x^2+4x+4)-(x^2+4)=4x\\).',
'تعتمد إشارة \\(4x\\) على \\(x\\) — موجبة عندما \\(x>0\\)، وسالبة عندما \\(x<0\\). لذلك لا يمكن تحديد العلاقة.'
]},
{t:'qc',ti:'Quick Check: Comparison',ti_ar:'فحص سريع: المقارنة',
q:'Quantity A: \\(3^2\\). Quantity B: \\(2^3\\). Compare.',q_ar:'الكمية A: \\(3^2\\). الكمية B: \\(2^3\\). قارن.',
o:['A > B','A < B','A = B','Cannot be determined'],o_ar:['A > B','A < B','A = B','لا يمكن التحديد'],
a:0,ex:'\\(3^2=9\\) and \\(2^3=8\\), so A > B.',ex_ar:'\\(3^2=9\\) و\\(2^3=8\\)، إذن A > B.'}];
D['qud-patterns']=[{t:'sr',ti:'Worked Example: Deriving the nth Term',ti_ar:'مثال محلول: اشتقاق الحد النوني',steps:[
'Find the \\(n\\)th term of \\(3,\\,7,\\,11,\\,15,\\ldots\\) Find the common difference.',
'\\(d=4\\). The formula is \\(u_n=a+(n-1)d\\) with \\(a=3\\): \\(u_n=3+(n-1)\\times4\\).',
'Simplify: \\(u_n=4n-1\\).'
],steps_ar:[
'أوجد الحد النوني للمتتالية \\(3,\\,7,\\,11,\\,15,\\ldots\\) أوجد أولًا الفرق المشترك.',
'\\(d=4\\). الصيغة هي \\(u_n=a+(n-1)d\\) حيث \\(a=3\\): \\(u_n=3+(n-1)\\times4\\).',
'بالتبسيط: \\(u_n=4n-1\\).'
]},
{t:'qc',ti:'Quick Check: Geometric Sequence',ti_ar:'فحص سريع: متتالية هندسية',
q:'Find the 5th term of \\(3,\\,6,\\,12,\\,24,\\ldots\\)',q_ar:'أوجد الحد الخامس للمتتالية \\(3,\\,6,\\,12,\\,24,\\ldots\\)',
o:['48','36','60','54'],o_ar:['48','36','60','54'],
a:0,ex:'Ratio \\(r=2\\). 5th term \\(=3\\times2^4=48\\).',ex_ar:'النسبة \\(r=2\\). الحد الخامس \\(=3\\times2^4=48\\).'}];
D['qud-data']=[{t:'sr',ti:'Worked Example: Median and Mode',ti_ar:'مثال محلول: الوسيط والمنوال',steps:[
'Find the median and mode of: 12, 15, 12, 18, 20, 15, 12. Order the data first.',
'Ordered: 12, 12, 12, 15, 15, 18, 20 (7 values). The median is the middle (4th) value: 15.',
'The mode is the most frequent value: 12 (appears three times).'
],steps_ar:[
'أوجد الوسيط والمنوال للبيانات: 12, 15, 12, 18, 20, 15, 12. رتّب البيانات أولًا.',
'مرتّبة: 12, 12, 12, 15, 15, 18, 20 (7 قيم). الوسيط هو القيمة الوسطى (الرابعة): 15.',
'المنوال هو القيمة الأكثر تكرارًا: 12 (تتكرر ثلاث مرات).'
]},
{t:'qc',ti:'Quick Check: Probability',ti_ar:'فحص سريع: الاحتمال',
q:'A bag has 3 red, 4 blue, 5 green balls. Find \\(P(\\text{not green})\\).',
q_ar:'كيس به 3 كرات حمراء و4 كرات زرقاء و5 كرات خضراء. أوجد \\(P(\\text{not green})\\)، احتمال ألا تكون الكرة خضراء.',
o:['7/12','5/12','1/12','5/9'],o_ar:['7/12','5/12','1/12','5/9'],
a:0,ex:'\\(P(\\text{not green})=1-\\dfrac{5}{12}=\\dfrac{7}{12}\\).',ex_ar:'\\(P(\\text{not green})=1-\\dfrac{5}{12}=\\dfrac{7}{12}\\).'}];
D['qud-word']=[{t:'sr',ti:'Worked Example: Combined Rate Problem',ti_ar:'مثال محلول: مسألة معدلات مجتمعة',steps:[
'A tank fills at 5 L/min from pipe A while pipe B drains at 2 L/min, both open together on an empty 90 L tank. Find the net fill rate.',
'Net rate \\(=5-2=3\\) L/min.',
'Time to fill \\(=90\\div3=30\\) minutes.'
],steps_ar:[
'خزان سعته 90 لترًا فارغ، يمتلئ من الأنبوب A بمعدل 5 لتر/دقيقة بينما يُفرّغه الأنبوب B بمعدل 2 لتر/دقيقة، وكلاهما مفتوح معًا. أوجد معدل الامتلاء الصافي.',
'المعدل الصافي \\(=5-2=3\\) لتر/دقيقة.',
'زمن الامتلاء \\(=90\\div3=30\\) دقيقة.'
]},
{t:'qc',ti:'Quick Check: Average Speed',ti_ar:'فحص سريع: متوسط السرعة',
q:'A car travels 150 km in 2.5 hours. At the same speed, how long to travel 240 km?',
q_ar:'تقطع سيارة 150 كم في 2.5 ساعة. بنفس السرعة، كم من الوقت تحتاج لقطع 240 كم؟',
o:['4 hours','3.5 hours','4.5 hours','5 hours'],o_ar:['4 ساعات','3.5 ساعة','4.5 ساعة','5 ساعات'],
a:0,ex:'Speed \\(=150/2.5=60\\) km/h. Time \\(=240/60=4\\) hours.',ex_ar:'السرعة \\(=150/2.5=60\\) كم/س. الزمن \\(=240/60=4\\) ساعات.'}];

/* ── TAHSILI ── */
D['tah-algebra']=[{t:'qc',ti:'Quick Check: Linear Equations',ti_ar:'فحص سريع: معادلات خطية',
q:'Solve \\(\\frac{x+3}{2}=7\\)',q_ar:'حل \\(\\frac{x+3}{2}=7\\)',
o:['x=11','x=17','x=10','x=14'],o_ar:['x=11','x=17','x=10','x=14'],
a:0,ex:'\\(x+3=14\\Rightarrow x=11\\).',ex_ar:'\\(x+3=14\\Rightarrow x=11\\).'},
{t:'sr',ti:'Worked Example: Discriminant Analysis',ti_ar:'مثال محلول: تحليل المميز',steps:[
'Determine the number of real roots of \\(3x^2-2x+5=0\\). Compute the discriminant \\(\\Delta=b^2-4ac\\).',
'\\(\\Delta=(-2)^2-4(3)(5)=4-60=-56\\).',
'Since \\(\\Delta<0\\), the equation has no real roots (two complex roots).'
],steps_ar:[
'حدد عدد الجذور الحقيقية للمعادلة \\(3x^2-2x+5=0\\). احسب المميز \\(\\Delta=b^2-4ac\\).',
'\\(\\Delta=(-2)^2-4(3)(5)=4-60=-56\\).',
'بما أن \\(\\Delta<0\\)، فإن المعادلة ليس لها جذور حقيقية (لها جذران عقديان).'
]}];
D['tah-functions']=[{t:'mt',ti:'Matching: Function Types',ti_ar:'مطابقة: أنواع الدوال',
p:[{l:'\\(f(x)=mx+b\\)',r:'Linear'},{l:'\\(f(x)=ax^2+bx+c\\)',r:'Quadratic'},{l:'\\(f(x)=a^x\\)',r:'Exponential'},{l:'\\(f(x)=\\log_a x\\)',r:'Logarithmic'}],
p_ar:[{l:'\\(f(x)=mx+b\\)',r:'خطية'},{l:'\\(f(x)=ax^2+bx+c\\)',r:'تربيعية'},{l:'\\(f(x)=a^x\\)',r:'أسية'},{l:'\\(f(x)=\\log_a x\\)',r:'لوغاريتمية'}]},
{t:'fn',ti:'Explorer: Exponential and Logarithm \\(y=2^x\\) & \\(y=\\log_2x\\)',ti_ar:'مستكشف: الدالة الأسية واللوغاريتمية \\(y=2^x\\) و\\(y=\\log_2x\\)',fns:[{expr:'2^x',color:'#1E3A6E',label:'2^x'},{expr:'ln(x)/ln(2)',color:'#B8801F',label:'log2(x)'}],xrange:[-4,6],yrange:[-4,8]},
{t:'sr',ti:'Worked Example: Composite Function Domain',ti_ar:'مثال محلول: مجال دالة مركّبة',steps:[
'Given \\(f(x)=\\dfrac1x\\) and \\(g(x)=x-3\\), find \\((f\\circ g)(x)\\). Substitute \\(g(x)\\) into \\(f\\).',
'\\((f\\circ g)(x)=f(x-3)=\\dfrac{1}{x-3}\\).',
'The domain excludes values that make the denominator zero: \\(x\\neq3\\).'
],steps_ar:[
'بما أن \\(f(x)=\\dfrac1x\\) و\\(g(x)=x-3\\)، أوجد \\((f\\circ g)(x)\\). عوّض \\(g(x)\\) في \\(f\\).',
'\\((f\\circ g)(x)=f(x-3)=\\dfrac{1}{x-3}\\).',
'يستثني المجال القيم التي تجعل المقام صفرًا: \\(x\\neq3\\).'
]}];
D['tah-trig']=[{t:'tf',ti:'True or False: Trigonometry',ti_ar:'صحيح أم خطأ: المثلثات',
items:[{s:'\\(\\sin^2\\theta+\\cos^2\\theta=1\\)',a:true,ex:'Pythagorean identity.'},{s:'\\(\\tan\\theta=\\frac{\\sin\\theta}{\\cos\\theta}\\)',a:true,ex:'Definition of tangent.'},{s:'\\(\\cos(90°-\\theta)=\\cos\\theta\\)',a:false,ex:'\\(\\cos(90°-\\theta)=\\sin\\theta\\).'},{s:'\\(\\sin(180°-\\theta)=\\sin\\theta\\)',a:true,ex:'Supplementary angle identity.'}],
items_ar:[{s:'\\(\\sin^2\\theta+\\cos^2\\theta=1\\)',a:true,ex:'متطابقة فيثاغورس.'},{s:'\\(\\tan\\theta=\\frac{\\sin\\theta}{\\cos\\theta}\\)',a:true,ex:'تعريف الظل.'},{s:'\\(\\cos(90°-\\theta)=\\cos\\theta\\)',a:false,ex:'\\(\\cos(90°-\\theta)=\\sin\\theta\\).'},{s:'\\(\\sin(180°-\\theta)=\\sin\\theta\\)',a:true,ex:'متطابقة الزاوية المكمِّلة إلى 180°.'}]},
{t:'sr',ti:'Worked Example: Solving a Trig Equation',ti_ar:'مثال محلول: حل معادلة مثلثية',steps:[
'Solve \\(\\sin\\theta=\\tfrac12\\) for \\(0°\\le\\theta\\le360°\\). The reference angle is \\(30°\\) since \\(\\sin30°=\\tfrac12\\).',
'Sine is positive in Quadrants I and II.',
'\\(\\theta=30°\\) or \\(\\theta=180°-30°=150°\\).'
],steps_ar:[
'حل \\(\\sin\\theta=\\tfrac12\\) لـ \\(0°\\le\\theta\\le360°\\). الزاوية المرجعية هي \\(30°\\) لأن \\(\\sin30°=\\tfrac12\\).',
'دالة الجيب موجبة في الرُبعين الأول والثاني.',
'\\(\\theta=30°\\) أو \\(\\theta=180°-30°=150°\\).'
]},
{t:'qc',ti:'Quick Check: Radians',ti_ar:'فحص سريع: الراديان',
q:'Convert \\(\\tfrac{3\\pi}{4}\\) radians to degrees.',q_ar:'حوّل \\(\\tfrac{3\\pi}{4}\\) راديان إلى درجات.',
o:['135°','120°','150°','108°'],o_ar:['135°','120°','150°','108°'],
a:0,ex:'\\(\\tfrac{3\\pi}{4}\\times\\tfrac{180}{\\pi}=135°\\).',ex_ar:'\\(\\tfrac{3\\pi}{4}\\times\\tfrac{180}{\\pi}=135°\\).'}];
D['tah-geometry']=[{t:'sb',ti:'Step Builder: Cylinder volume, \\(r=3\\), \\(h=5\\)',ti_ar:'باني الخطوات: حجم أسطوانة، \\(r=3\\)، \\(h=5\\)',
steps:[{l:'\\(r^2=3^2=\\)',a:'9',h:'9'},{l:'\\(V=\\pi\\times9\\times5=\\)',a:'45pi',h:'\\(45\\pi\\)'}],
steps_ar:[{l:'\\(r^2=3^2=\\)',a:'9',h:'9'},{l:'\\(V=\\pi\\times9\\times5=\\)',a:'45pi',h:'\\(45\\pi\\)'}]},
{t:'sr',ti:'Worked Example: Midpoint and Gradient',ti_ar:'مثال محلول: نقطة المنتصف والميل',steps:[
'Find the midpoint and gradient of the segment from \\((-2,5)\\) to \\((4,-3)\\). Midpoint is the average of coordinates.',
'Midpoint \\(=\\left(\\dfrac{-2+4}{2},\\dfrac{5-3}{2}\\right)=(1,1)\\).',
'Gradient \\(=\\dfrac{-3-5}{4-(-2)}=\\dfrac{-8}{6}=-\\dfrac43\\).'
],steps_ar:[
'أوجد نقطة المنتصف وميل القطعة المستقيمة من \\((-2,5)\\) إلى \\((4,-3)\\). نقطة المنتصف هي متوسط الإحداثيات.',
'نقطة المنتصف \\(=\\left(\\dfrac{-2+4}{2},\\dfrac{5-3}{2}\\right)=(1,1)\\).',
'الميل \\(=\\dfrac{-3-5}{4-(-2)}=\\dfrac{-8}{6}=-\\dfrac43\\).'
]},
{t:'qc',ti:'Quick Check: Distance Formula',ti_ar:'فحص سريع: صيغة المسافة',
q:'Find the distance between \\((1,2)\\) and \\((4,6)\\).',q_ar:'أوجد المسافة بين \\((1,2)\\) و\\((4,6)\\).',
o:['5','7','25','13'],o_ar:['5','7','25','13'],
a:0,ex:'\\(\\sqrt{(4-1)^2+(6-2)^2}=\\sqrt{9+16}=5\\).',ex_ar:'\\(\\sqrt{(4-1)^2+(6-2)^2}=\\sqrt{9+16}=5\\).'}];
D['tah-sequences']=[{t:'sr',ti:'Worked Example: Sum of an Arithmetic Series',ti_ar:'مثال محلول: مجموع متسلسلة حسابية',steps:[
'Find the sum of the first 20 terms of the arithmetic sequence with \\(a=5,\\ d=3\\). Use \\(S_n=\\tfrac n2(2a+(n-1)d)\\).',
'\\(S_{20}=\\tfrac{20}{2}\\times(2\\times5+19\\times3)=10\\times(10+57)=10\\times67\\).',
'\\(S_{20}=670\\).'
],steps_ar:[
'أوجد مجموع أول 20 حدًا من المتتالية الحسابية حيث \\(a=5,\\ d=3\\). استخدم \\(S_n=\\tfrac n2(2a+(n-1)d)\\).',
'\\(S_{20}=\\tfrac{20}{2}\\times(2\\times5+19\\times3)=10\\times(10+57)=10\\times67\\).',
'\\(S_{20}=670\\).'
]},
{t:'qc',ti:'Quick Check: Infinite Geometric Series',ti_ar:'فحص سريع: متسلسلة هندسية لا نهائية',
q:'Find the sum of the infinite geometric series with \\(a=9,\\ r=\\tfrac13\\).',q_ar:'أوجد مجموع المتسلسلة الهندسية اللانهائية حيث \\(a=9,\\ r=\\tfrac13\\).',
o:['13.5','27','9','4.5'],o_ar:['13.5','27','9','4.5'],
a:0,ex:'\\(S=\\dfrac{9}{1-\\tfrac13}=\\dfrac{9}{\\tfrac23}=13.5\\).',ex_ar:'\\(S=\\dfrac{9}{1-\\tfrac13}=\\dfrac{9}{\\tfrac23}=13.5\\).'}];
D['tah-calc1']=[{t:'sr',ti:'Worked Example: The Product Rule',ti_ar:'مثال محلول: قاعدة الضرب',steps:[
'Differentiate \\(y=x^2\\sin x\\) using the product rule: \\((uv)\'=u\'v+uv\'\\) with \\(u=x^2\\), \\(v=\\sin x\\).',
'\\(u\'=2x\\), \\(v\'=\\cos x\\).',
'\\(\\dfrac{dy}{dx}=2x\\sin x+x^2\\cos x\\).'
],steps_ar:[
'اشتق \\(y=x^2\\sin x\\) باستخدام قاعدة الضرب: \\((uv)\'=u\'v+uv\'\\) حيث \\(u=x^2\\)، \\(v=\\sin x\\).',
'\\(u\'=2x\\)، \\(v\'=\\cos x\\).',
'\\(\\dfrac{dy}{dx}=2x\\sin x+x^2\\cos x\\).'
]},
{t:'qc',ti:'Quick Check: Limits',ti_ar:'فحص سريع: النهايات',
q:'Evaluate \\(\\displaystyle\\lim_{x\\to2}\\dfrac{x^2-4}{x-2}\\).',q_ar:'أوجد قيمة \\(\\displaystyle\\lim_{x\\to2}\\dfrac{x^2-4}{x-2}\\).',
o:['4','0','2','undefined'],o_ar:['4','0','2','غير معرّفة'],
a:0,ex:'Factor: \\(\\dfrac{(x-2)(x+2)}{x-2}=x+2\\to4\\) as \\(x\\to2\\).',ex_ar:'حلل: \\(\\dfrac{(x-2)(x+2)}{x-2}=x+2\\to4\\) عندما \\(x\\to2\\).'}];
D['tah-calc2']=[{t:'sr',ti:'Worked Example: Area Under a Curve',ti_ar:'مثال محلول: المساحة تحت المنحنى',steps:[
'Find the area under \\(y=4-x^2\\) from \\(x=-2\\) to \\(x=2\\). Find the antiderivative: \\(F(x)=4x-\\tfrac{x^3}{3}\\).',
'Evaluate: \\(F(2)=8-\\tfrac83=\\tfrac{16}{3}\\). \\(F(-2)=-8+\\tfrac83=-\\tfrac{16}{3}\\).',
'Area \\(=F(2)-F(-2)=\\tfrac{16}{3}-\\left(-\\tfrac{16}{3}\\right)=\\tfrac{32}{3}\\approx10.67\\).'
],steps_ar:[
'أوجد المساحة تحت المنحنى \\(y=4-x^2\\) من \\(x=-2\\) إلى \\(x=2\\). أوجد الدالة الأصلية: \\(F(x)=4x-\\tfrac{x^3}{3}\\).',
'احسب: \\(F(2)=8-\\tfrac83=\\tfrac{16}{3}\\). \\(F(-2)=-8+\\tfrac83=-\\tfrac{16}{3}\\).',
'المساحة \\(=F(2)-F(-2)=\\tfrac{16}{3}-\\left(-\\tfrac{16}{3}\\right)=\\tfrac{32}{3}\\approx10.67\\).'
]},
{t:'qc',ti:'Quick Check: Definite Integral',ti_ar:'فحص سريع: التكامل المحدد',
q:'Evaluate \\(\\displaystyle\\int_0^1 4x^3\\,dx\\).',q_ar:'أوجد قيمة \\(\\displaystyle\\int_0^1 4x^3\\,dx\\).',
o:['1','4','1/4','0'],o_ar:['1','4','1/4','0'],
a:0,ex:'\\(\\int4x^3\\,dx=x^4+C\\). \\([x^4]_0^1=1-0=1\\).',ex_ar:'\\(\\int4x^3\\,dx=x^4+C\\). \\([x^4]_0^1=1-0=1\\).'}];
D['tah-explog']=[{t:'fn',ti:'Explorer: Exponential Growth \\(y=b^x\\)',ti_ar:'مستكشف: النمو الأسي \\(y=b^x\\)',fns:[{expr:'b^x',color:'#1E3A6E'}],xrange:[-3,4],yrange:[-1,10],params:[{name:'b',label:'Base b',min:1.5,max:3,step:0.5,default:2}]},
{t:'sr',ti:'Worked Example: Solving an Exponential Equation',ti_ar:'مثال محلول: حل معادلة أسية',steps:[
'Solve \\(3^{2x-1}=27\\). Write 27 as a power of 3.',
'\\(27=3^3\\), so \\(2x-1=3\\).',
'\\(2x=4\\), so \\(x=2\\).'
],steps_ar:[
'حل \\(3^{2x-1}=27\\). اكتب 27 كقوة للعدد 3.',
'\\(27=3^3\\)، إذن \\(2x-1=3\\).',
'\\(2x=4\\)، إذن \\(x=2\\).'
]},
{t:'qc',ti:'Quick Check: Logarithm Rules',ti_ar:'فحص سريع: قواعد اللوغاريتمات',
q:'Simplify \\(\\log(x^2)-\\log(x)\\).',q_ar:'بسّط \\(\\log(x^2)-\\log(x)\\).',
o:['log x','log x²','2 log x','x'],o_ar:['log x','log x²','2 log x','x'],
a:0,ex:'\\(\\log(x^2)-\\log(x)=\\log\\!\\left(\\dfrac{x^2}{x}\\right)=\\log x\\).',ex_ar:'\\(\\log(x^2)-\\log(x)=\\log\\!\\left(\\dfrac{x^2}{x}\\right)=\\log x\\).'}];
D['tah-stats']=[{t:'sr',ti:'Worked Example: Independent Events',ti_ar:'مثال محلول: الأحداث المستقلة',steps:[
'A fair die is rolled and a coin is tossed. Find \\(P(\\text{rolling a 5 AND heads})\\). Since the events are independent, multiply their probabilities.',
'\\(P(5)=\\tfrac16\\). \\(P(\\text{heads})=\\tfrac12\\).',
'\\(P(5\\text{ and heads})=\\tfrac16\\times\\tfrac12=\\tfrac{1}{12}\\).'
],steps_ar:[
'يُرمى نرد عادل وتُقذف عملة. أوجد \\(P(\\text{rolling a 5 AND heads})\\)، احتمال ظهور الرقم 5 والصورة معًا. بما أن الحدثين مستقلان، اضرب احتماليهما.',
'\\(P(5)=\\tfrac16\\). \\(P(\\text{heads})=\\tfrac12\\).',
'\\(P(5\\text{ and heads})=\\tfrac16\\times\\tfrac12=\\tfrac{1}{12}\\).'
]},
{t:'qc',ti:'Quick Check: Mean',ti_ar:'فحص سريع: المتوسط الحسابي',
q:'Find the mean of \\(6,\\,9,\\,11,\\,14\\).',q_ar:'أوجد المتوسط الحسابي للأعداد \\(6,\\,9,\\,11,\\,14\\).',
o:['10','9.5','11','8.5'],o_ar:['10','9.5','11','8.5'],
a:0,ex:'\\((6+9+11+14)/4=40/4=10\\).',ex_ar:'\\((6+9+11+14)/4=40/4=10\\).'}];

/* ── SAT ── */
D['sat-linear']=[{t:'qc',ti:'Quick Check: Linear Functions',q:'Slope of \\(3x-2y=12\\)?',o:['−2','3/2','3','−6'],a:1,ex:'\\(y=\\frac{3}{2}x-6\\). Slope \\(=\\frac{3}{2}\\).'},
{t:'sr',ti:'Worked Example: Solve a Linear System by Elimination',steps:[
  'Solve \\(2x+3y=12\\) and \\(x-y=1\\). From the second equation, \\(x=y+1\\).',
  'Substitute into the first: \\(2(y+1)+3y=12\\Rightarrow2y+2+3y=12\\).',
  'Combine: \\(5y=10\\Rightarrow y=2\\).',
  'Back-substitute: \\(x=2+1=3\\). Solution: \\((3,2)\\).'
]}];
D['sat-linfun']=[
{t:'fn',ti:'Explorer: Line Through Two Points, Slope m',fns:[{expr:'m*x+3',color:'#1E3A6E',label:'y=mx+3'}],xrange:[-5,5],yrange:[-5,10],params:[{name:'m',label:'Slope m',min:-3,max:3,step:0.5,default:2}]},
{t:'sr',ti:'Worked Example: Equation of a Line Through Two Points',steps:[
  'Find the equation of the line through \\((1,3)\\) and \\((4,9)\\). Find the slope: \\(m=\\dfrac{9-3}{4-1}=\\dfrac63=2\\).',
  'Use point-slope form with \\((1,3)\\): \\(y-3=2(x-1)\\).',
  'Simplify: \\(y=2x+1\\).'
]},
{t:'qc',ti:'Quick Check: Linear Inequalities',q:'Solve \\(3x-5>10\\)',o:['\\(x>5\\)','\\(x>15\\)','\\(x<5\\)','\\(x>5/3\\)'],a:0,ex:'\\(3x>15\\Rightarrow x>5\\).'}
];
D['sat-quad']=[{t:'mt',ti:'Matching: Discriminant',p:[{l:'b²−4ac > 0',r:'2 real roots'},{l:'b²−4ac = 0',r:'1 repeated root'},{l:'b²−4ac < 0',r:'No real roots'},{l:'Sum of roots',r:'−b/a'}]},
{t:'sr',ti:'Worked Example: Solve a Quadratic by Factoring',steps:[
  'Solve \\(x^2-6x+8=0\\). Look for two numbers multiplying to 8 and summing to −6: −2 and −4.',
  '\\(x^2-6x+8=(x-2)(x-4)\\).',
  'Set each factor to zero: \\(x=2\\) or \\(x=4\\).'
]}];
D['sat-expoly']=[
{t:'fn',ti:'Explorer: Cubic Family \\(x^3+k\\)',fns:[{expr:'x^3+k',color:'#1E3A6E',label:'x^3+k'}],xrange:[-3,3],yrange:[-15,15],params:[{name:'k',label:'Shift k',min:-5,max:5,step:1,default:0}]},
{t:'sr',ti:'Worked Example: Simplify a Rational Expression',steps:[
  'Simplify \\(\\dfrac{x^2+5x+6}{x+2}\\). Factor the numerator: \\(x^2+5x+6=(x+2)(x+3)\\).',
  'Cancel the common factor \\((x+2)\\): \\(x+3\\), for \\(x\\neq-2\\).'
]},
{t:'qc',ti:'Quick Check: Multiplying Monomials',q:'Simplify \\((3x^2)(2x^3)\\)',o:['\\(6x^5\\)','\\(5x^6\\)','\\(6x^6\\)','\\(5x^5\\)'],a:0,ex:'Multiply coefficients (\\(3\\times2=6\\)) and add exponents (\\(2+3=5\\)).'}
];
D['sat-data']={t:'tf',ti:'True or False: Data',items:[{s:'Mean always equals median',a:false,ex:'They differ in skewed data.'},{s:'Correlation proves causation',a:false,ex:'Correlation ≠ causation.'},{s:'SD measures spread from the mean',a:true,ex:'Correct definition.'},{s:'Negative correlation: as x↑, y↓',a:true,ex:'Correct.'}]};
D['sat-geo']=[{t:'sb',ti:'Step Builder: Circle, center \\((2,3)\\), radius \\(5\\)',steps:[{l:'Standard form: \\((x-h)^2+(y-k)^2=r^2\\). Substitute \\(h=2,k=3,r=5\\). \\(r^2=\\)',a:'25',h:'\\(5^2=25\\)'},{l:'Full equation:',a:'(x-2)^2+(y-3)^2=25',h:'\\((x-2)^2+(y-3)^2=25\\)'}]},
{t:'sr',ti:'Worked Example: Area of a Triangle Using Sine (SAS)',steps:[
  'Find the area of a triangle with two sides 8 and 10 and included angle 30°. Formula: \\(\\text{Area}=\\dfrac12ab\\sin C\\).',
  'Substitute \\(a=8\\), \\(b=10\\), \\(C=30°\\): \\(\\text{Area}=\\dfrac12(8)(10)\\sin30°\\).',
  '\\(\\sin30°=\\dfrac12\\), so \\(\\text{Area}=\\dfrac12(80)\\left(\\dfrac12\\right)=20\\).'
]}];
D['sat-desmos']=[
{t:'sr',ti:'Worked Example: Solve Graphically Instead of Algebraically',steps:[
  'To solve \\(x^2-4=2x-1\\) graphically, graph both sides as separate functions: \\(y_1=x^2-4\\) and \\(y_2=2x-1\\).',
  'The solutions to the original equation are the x-coordinates where the two graphs intersect.',
  'This avoids algebra entirely — just find the intersection point(s) on your calculator.'
]}];
D['sat-functions']=[
{t:'fn',ti:'Explorer: Function Shift \\((x-h)^2-3\\)',fns:[{expr:'(x-h)^2-3',color:'#1E3A6E',label:'(x-h)^2-3'}],xrange:[-5,5],yrange:[-4,8],params:[{name:'h',label:'Shift h',min:-3,max:3,step:1,default:0}]},
{t:'sr',ti:'Worked Example: Evaluate a Composite Function',steps:[
  'If \\(f(x)=2x-1\\) and \\(g(x)=x^2\\), find \\(f(g(3))\\). Compute the inner function first: \\(g(3)=3^2=9\\).',
  'Now apply \\(f\\) to that result: \\(f(9)=2(9)-1\\).',
  '\\(f(9)=17\\).'
]},
{t:'qc',ti:'Quick Check: Function Evaluation',q:'If \\(f(x)=x^2+1\\), find \\(f(-2)\\)',o:['5','3','−3','4'],a:0,ex:'\\((-2)^2+1=4+1=5\\).'}
];
D['sat-stats']=[
{t:'sr',ti:'Worked Example: Interpreting Margin of Error',steps:[
  'A survey estimates 45% support with margin of error 3%. Interval: \\(45\\%\\pm3\\%\\), giving \\([42\\%,48\\%]\\).',
  'This interval is the best estimate range for the TRUE population percentage — not the sample percentage (which we already know is exactly 45%).',
  'A smaller margin of error means more precision, usually from a larger sample size.'
]},
{t:'qc',ti:'Quick Check: Margin of Error',q:'Which factor most reduces margin of error?',o:['Larger sample size','Smaller sample size','Higher confidence level','Fewer survey questions'],a:0,ex:'Larger samples give more precise (smaller margin of error) estimates.'}
];
D['sat-condprob']=[
{t:'sr',ti:'Worked Example: Conditional Probability from a Table',steps:[
  '60 people like tea; of those, 25 also like coffee. Find \\(P(\\text{coffee}\\mid\\text{tea})\\). Formula: \\(P(\\text{coffee}\\mid\\text{tea})=\\dfrac{\\text{both}}{\\text{tea total}}\\).',
  'Substitute: \\(\\dfrac{25}{60}\\).',
  'Simplify: \\(\\dfrac{25}{60}=\\dfrac{5}{12}\\approx0.417\\).'
]},
{t:'qc',ti:'Quick Check: Conditional Probability',q:'\\(P(A\\mid B)\\) is defined as:',o:['\\(P(A\\cap B)/P(B)\\)','\\(P(A\\cap B)/P(A)\\)','\\(P(A)+P(B)\\)','\\(P(A)\\times P(B)\\)'],a:0,ex:'Conditional probability: \\(P(A\\mid B)=\\dfrac{P(A\\cap B)}{P(B)}\\).'}
];

/* ── ACT ── */
D['act-numbers']=[{t:'qc',ti:'Quick Check: Percent',q:'Jacket costs $80 after 20% off. Original price?',o:['$96','$100','$90','$110'],a:1,ex:'\\(0.8P=80\\Rightarrow P=\\$100\\).'},
{t:'sr',ti:'Worked Example: Percent Increase',steps:[
  'A price increases from $80 to $92. Find the change: \\(92-80=12\\).',
  'Percent change \\(=\\dfrac{\\text{change}}{\\text{original}}\\times100\\%=\\dfrac{12}{80}\\times100\\%\\).',
  '\\(=15\\%\\).'
]}];
D['act-algebra']=[{t:'mt',ti:'Matching: Factoring',p:[{l:'a²−b²',r:'(a+b)(a−b)'},{l:'a²+2ab+b²',r:'(a+b)²'},{l:'a²−2ab+b²',r:'(a−b)²'},{l:'a(b+c)',r:'ab+ac'}]},
{t:'sr',ti:'Worked Example: Solve a Literal Equation',steps:[
  'Solve \\(A=\\dfrac12bh\\) for \\(h\\). Multiply both sides by 2: \\(2A=bh\\).',
  'Divide both sides by \\(b\\): \\(h=\\dfrac{2A}{b}\\).'
]}];
D['act-coordgeo']=[
{t:'sr',ti:'Worked Example: Slope of a Perpendicular Line',steps:[
  'Find the slope of a line perpendicular to \\(y=\\dfrac23x+1\\). The original line has slope \\(m=\\dfrac23\\).',
  'Perpendicular lines have slopes that are negative reciprocals of each other.',
  'The perpendicular slope is \\(-\\dfrac32\\).'
]},
{t:'qc',ti:'Quick Check: Slopes',q:'Slope of a horizontal line:',o:['0','Undefined','1','−1'],a:0,ex:'Horizontal lines have slope 0.'}
];
D['act-planegeo']=[
{t:'sr',ti:'Worked Example: Exterior Angle Theorem',steps:[
  'A triangle has two interior angles of 50° and 65°. By the Exterior Angle Theorem, the exterior angle at the third vertex equals the sum of the two non-adjacent interior angles.',
  'Sum: \\(50°+65°=115°\\).',
  'The exterior angle is \\(115°\\).'
]},
{t:'qc',ti:'Quick Check: Polygon Angles',q:'Sum of interior angles of a pentagon:',o:['540°','360°','720°','450°'],a:0,ex:'\\((5-2)\\times180°=540°\\).'}
];
D['act-functions']=[{t:'tf',ti:'True or False: Functions',items:[{s:'Vertical line test identifies functions',a:true,ex:'Correct.'},{s:'\\(f(x)=x^2\\) is one-to-one',a:false,ex:'\\(f(-2)=f(2)\\), fails 1-1 test.'},{s:'Domain of \\(\\sqrt{x}\\) is all reals',a:false,ex:'Domain: \\(x\\geq0\\).'},{s:'\\((f\\circ g)(x)\\): apply \\(g\\) first, then \\(f\\)',a:true,ex:'Correct order.'}]}];
D['act-stats']=[
{t:'sr',ti:'Worked Example: Expected Value',steps:[
  'A game costs $2 to play. You win $10 with probability 0.1, otherwise nothing. Expected winnings: \\(10\\times0.1+0\\times0.9=1\\).',
  'Expected profit \\(=\\text{expected winnings}-\\text{cost}=1-2=-1\\).',
  'The expected profit is \\(-\\$1\\) — on average you lose a dollar per play.'
]},
{t:'qc',ti:'Quick Check: Mutually Exclusive Events',q:'If two events are mutually exclusive, \\(P(A\\text{ and }B)=\\)',o:['0','1','\\(P(A)\\times P(B)\\)','\\(P(A)+P(B)\\)'],a:0,ex:'Mutually exclusive events cannot occur together, so \\(P(A\\cap B)=0\\).'}
];
D['act-trig']={t:'sb',ti:'Step Builder: Find \\(\\cos60°\\) using 30-60-90 triangle',steps:[{l:'Side adjacent to 60° in triangle with hyp=2:',a:'1',h:'Sides: 1, √3, 2'},{l:'\\(\\cos60°=\\text{adj}/\\text{hyp}=1/2=\\)',a:'0.5',h:'0.5'}]};
D['act-advanced']=[
{t:'sr',ti:'Worked Example: Multiply Complex Numbers',steps:[
  'Simplify \\((3+2i)(1-i)\\). Expand using FOIL: \\(3(1)+3(-i)+2i(1)+2i(-i)\\).',
  'Simplify: \\(3-3i+2i-2i^2\\).',
  'Since \\(i^2=-1\\): \\(3-3i+2i+2=5-i\\).'
]},
{t:'qc',ti:'Quick Check: Powers of i',q:'\\(i^2\\) equals:',o:['−1','1','\\(i\\)','\\(-i\\)'],a:0,ex:'By definition, \\(i^2=-1\\).'}
];

/* ── AS LEVEL ── */
D['ig-coordinate']=[{t:'fn',ti:'Explorer: Line \\(y=mx+c\\)',fns:[{expr:'m*x+c',color:'#1E3A6E'}],xrange:[-5,5],yrange:[-8,8],params:[{name:'m',label:'Gradient m',min:-3,max:3,step:0.5,default:1},{name:'c',label:'Intercept c',min:-5,max:5,step:1,default:0}]},
{t:'sr',ti:'Worked Example: Perpendicular Line',steps:[
'Line ℓ has equation \\(y=2x-1\\). Find the line perpendicular to ℓ through \\((4,3)\\). First find the perpendicular gradient.',
'\\(m_\\perp=-\\dfrac{1}{2}\\) (negative reciprocal of 2).',
'Substitute into \\(y-y_1=m(x-x_1)\\): \\(y-3=-\\tfrac12(x-4)\\Rightarrow y=-\\tfrac12x+5\\).'
]},
{t:'qc',ti:'Quick Check: Gradient',q:'Find the gradient of the line through \\((2,3)\\) and \\((6,11)\\).',o:['2','4','8','1/2'],a:0,ex:'\\(m=\\dfrac{11-3}{6-2}=\\dfrac{8}{4}=2\\).'}];
D['ig-mensuration']=[{t:'sr',ti:'Worked Example: Volume of a Cone',steps:[
'Find the volume of a cone with radius 4 cm and height 9 cm. Use \\(V=\\tfrac13\\pi r^2h\\).',
'\\(V=\\tfrac13\\times\\pi\\times4^2\\times9=\\tfrac13\\times\\pi\\times144\\).',
'\\(V=48\\pi\\approx150.8\\ \\text{cm}^3\\).'
]},
{t:'qc',ti:'Quick Check: Sphere Volume',q:'Find the volume of a sphere with radius 3 cm (take \\(\\pi=3.14\\)).',o:['113.04 cm³','37.68 cm³','339.12 cm³','28.26 cm³'],a:0,ex:'\\(V=\\tfrac43\\pi r^3=\\tfrac43\\times3.14\\times27=113.04\\) cm³.'}];
D['ig-transform']=[{t:'sr',ti:'Worked Example: Enlargement',steps:[
'Triangle T has vertex \\(P(2,1)\\). Enlarge T with scale factor 3, centre the origin. Find the image of P.',
'Each coordinate is multiplied by the scale factor: image \\(=(3\\times2,\\ 3\\times1)\\).',
'Image of P \\(=(6,3)\\).'
]},
{t:'qc',ti:'Quick Check: Vector Magnitude',q:'Find the magnitude of the vector \\(\\binom{6}{8}\\).',o:['10','14','48','2'],a:0,ex:'\\(|\\mathbf{v}|=\\sqrt{6^2+8^2}=\\sqrt{100}=10\\).'}];
D['ig-stats']=[{t:'sr',ti:'Worked Example: Tree Diagram Without Replacement',steps:[
'A bag has 4 red and 2 blue balls. Two are drawn without replacement. Find \\(P(\\text{both blue})\\).',
'First draw: \\(P(\\text{blue})=\\tfrac{2}{6}=\\tfrac13\\). After removing one blue, 1 blue remains out of 5.',
'\\(P(\\text{both blue})=\\tfrac26\\times\\tfrac15=\\tfrac{2}{30}=\\tfrac{1}{15}\\).'
]},
{t:'qc',ti:'Quick Check: Mean',q:'Find the mean of \\(5,\\,9,\\,12,\\,6,\\,8\\).',o:['8','9','7','10'],a:0,ex:'\\((5+9+12+6+8)/5=40/5=8\\).'}];
D['ig-functions']=[{t:'fn',ti:'Explorer: Function and Inverse \\(y=2x+3\\)',fns:[{expr:'2*x+3',color:'#1E3A6E',label:'f(x)'},{expr:'(x-3)/2',color:'#B8801F',label:'f⁻¹(x)'}],xrange:[-6,6],yrange:[-6,10]},
{t:'sr',ti:'Worked Example: Composite Function',steps:[
'Given \\(f(x)=2x+3\\) and \\(g(x)=x^2\\), find \\(fg(4)\\).',
'First apply \\(g\\): \\(g(4)=4^2=16\\).',
'Then apply \\(f\\): \\(f(16)=2(16)+3=35\\).'
]},
{t:'qc',ti:'Quick Check: Inverse Function',q:'If \\(f(x)=4x-5\\), find \\(f^{-1}(x)\\).',o:['(x+5)/4','(x-5)/4','4x+5','(x+4)/5'],a:0,ex:'\\(y=4x-5\\Rightarrow x=\\dfrac{y+5}{4}\\), so \\(f^{-1}(x)=\\dfrac{x+5}{4}\\).'}];
D['ig-sets']=[{t:'sr',ti:'Worked Example: Three-Set Venn Diagram',steps:[
'In a class of 30: 14 play football (F), 11 play basketball (B), 8 play tennis (T); 4 play F and B, 3 play F and T, 2 play B and T, 1 plays all three. Find how many play at least one sport.',
'Apply inclusion–exclusion: \\(n(F\\cup B\\cup T)=n(F)+n(B)+n(T)-n(F\\cap B)-n(F\\cap T)-n(B\\cap T)+n(F\\cap B\\cap T)\\).',
'\\(=14+11+8-4-3-2+1=25\\) students play at least one sport, so \\(30-25=5\\) play none.'
]},
{t:'qc',ti:'Quick Check: Set Notation',q:'If \\(A=\\{1,3,5,7\\}\\) and \\(B=\\{3,4,5,6\\}\\), find \\(A\\cap B\\).',o:['{3,5}','{1,3,4,5,6,7}','{1,7}','{4,6}'],a:0,ex:'The intersection contains elements in both sets: \\(\\{3,5\\}\\).'}];
D['ig-matrices']=[{t:'sr',ti:'Worked Example: Inverse Matrix & Simultaneous Equations',steps:[
'Solve \\(2x+3y=7\\) and \\(x-y=1\\) using the inverse matrix method. Write as \\(\\begin{pmatrix}2&3\\\\1&-1\\end{pmatrix}\\begin{pmatrix}x\\\\y\\end{pmatrix}=\\begin{pmatrix}7\\\\1\\end{pmatrix}\\).',
'\\(\\det=2(-1)-3(1)=-5\\). Inverse \\(=\\dfrac{1}{-5}\\begin{pmatrix}-1&-3\\\\-1&2\\end{pmatrix}=\\begin{pmatrix}0.2&0.6\\\\0.2&-0.4\\end{pmatrix}\\).',
'\\(\\begin{pmatrix}x\\\\y\\end{pmatrix}=\\begin{pmatrix}0.2&0.6\\\\0.2&-0.4\\end{pmatrix}\\begin{pmatrix}7\\\\1\\end{pmatrix}=\\begin{pmatrix}2\\\\1\\end{pmatrix}\\). Solution: \\(x=2,\\ y=1\\).'
]},
{t:'qc',ti:'Quick Check: Determinant',q:'Find \\(\\det(M)\\) where \\(M=\\begin{pmatrix}4&2\\\\3&1\\end{pmatrix}\\).',o:['-2','2','10','-10'],a:0,ex:'\\(\\det=(4)(1)-(2)(3)=4-6=-2\\).'}];
D['as-algebra']=[{t:'qc',ti:'Quick Check: Surds',q:'Simplify \\(\\sqrt{48}\\)',o:['4√3','6√2','2√12','8√3'],a:0,ex:'\\(\\sqrt{16\\times3}=4\\sqrt{3}\\).'},
{t:'sr',ti:'Worked Example: Nature of Roots via Discriminant',steps:[
'Determine the nature of the roots of \\(2x^2-3x+5=0\\). Compute \\(\\Delta=b^2-4ac\\).',
'\\(\\Delta=(-3)^2-4(2)(5)=9-40=-31\\).',
'Since \\(\\Delta<0\\), the equation has no real roots.'
]}];
D['as-equations']=[{t:'mt',ti:'Matching: Modulus Inequalities',p:[{l:'|x| < a',r:'−a < x < a'},{l:'|x| > a',r:'x<−a or x>a'},{l:'|x−c| < r',r:'c−r < x < c+r'},{l:'|x−c| > r',r:'x<c−r or x>c+r'}]},
{t:'sr',ti:'Worked Example: Linear–Quadratic System',steps:[
'Solve simultaneously: \\(y=x+1\\) and \\(y=x^2-x-1\\). Substitute the linear equation into the quadratic.',
'\\(x+1=x^2-x-1\\Rightarrow x^2-2x-2=0\\).',
'By the quadratic formula: \\(x=\\dfrac{2\\pm\\sqrt{4+8}}{2}=1\\pm\\sqrt3\\).'
]},
{t:'qc',ti:'Quick Check: Quadratic Inequality',q:'Solve \\(x^2-9>0\\).',o:['x<−3 or x>3','−3<x<3','x>3','x<−3'],a:0,ex:'Roots \\(\\pm3\\); the curve is above the axis outside the roots.'}];
D['as-trig']=[{t:'tf',ti:'True or False: AS Trigonometry',items:[{s:'\\(1+\\tan^2\\theta=\\sec^2\\theta\\)',a:true,ex:'Pythagorean identity.'},{s:'Cosine rule: \\(a^2=b^2+c^2-2bc\\cos A\\)',a:true,ex:'Standard cosine rule.'},{s:'\\(\\tan(A+B)=\\tan A+\\tan B\\)',a:false,ex:'\\(\\tan(A+B)=\\frac{\\tan A+\\tan B}{1-\\tan A\\tan B}\\).'},{s:'Sine rule: \\(\\frac{a}{\\sin A}=\\frac{b}{\\sin B}\\)',a:true,ex:'Standard sine rule.'}]},
{t:'sr',ti:'Worked Example: Solving a Quadratic Trig Equation',steps:[
'Solve \\(2\\cos^2\\theta+\\cos\\theta-1=0\\) for \\(0°\\le\\theta\\le360°\\). Let \\(x=\\cos\\theta\\) and factor.',
'\\(2x^2+x-1=(2x-1)(x+1)=0\\), so \\(x=\\tfrac12\\) or \\(x=-1\\).',
'\\(\\cos\\theta=\\tfrac12\\) gives \\(\\theta=60°,300°\\). \\(\\cos\\theta=-1\\) gives \\(\\theta=180°\\).'
]},
{t:'qc',ti:'Quick Check: Sine Rule',q:'In triangle ABC, \\(a=8\\), \\(A=40°\\), \\(B=65°\\). Find \\(b\\) (nearest 0.1).',o:['11.3','9.1','7.3','12.5'],a:0,ex:'\\(b=\\dfrac{a\\sin B}{\\sin A}=\\dfrac{8\\sin65°}{\\sin40°}\\approx11.3\\).'}];
D['as-calculus']=[{t:'sb',ti:'Step Builder: Differentiate \\(y=x^3-4x^2+3x\\)',steps:[{l:'\\(\\frac{d}{dx}(x^3)=\\)',a:'3x^2',h:'3x²'},{l:'\\(\\frac{d}{dx}(-4x^2)=\\)',a:'-8x',h:'−8x'},{l:'\\(\\frac{d}{dx}(3x)=\\)',a:'3',h:'3'},{l:'\\(\\frac{dy}{dx}=\\)',a:'3x^2-8x+3',h:'Sum all terms'}]},
{t:'sr',ti:'Worked Example: Area Between a Curve and a Line',steps:[
'Find the area enclosed between \\(y=x^2\\) and \\(y=4\\). First find the intersection points: \\(x^2=4\\Rightarrow x=\\pm2\\).',
'Area \\(=\\displaystyle\\int_{-2}^{2}(4-x^2)\\,dx\\). Antiderivative: \\(F(x)=4x-\\tfrac{x^3}{3}\\).',
'\\(F(2)-F(-2)=\\tfrac{16}{3}-\\left(-\\tfrac{16}{3}\\right)=\\tfrac{32}{3}\\approx10.67\\).'
]},
{t:'qc',ti:'Quick Check: Stationary Points',q:'Find the \\(x\\)-coordinate of the stationary point of \\(y=x^2-6x+5\\).',o:['3','6','-3','0'],a:0,ex:'\\(\\dfrac{dy}{dx}=2x-6=0\\Rightarrow x=3\\).'}];

D['as-functions']=[{t:'fn',ti:'Explorer: Translation \\(y=(x-h)^2+k\\)',fns:[{expr:'(x-h)^2+k',color:'#1E3A6E'}],xrange:[-6,6],yrange:[-4,10],params:[{name:'h',label:'Horizontal shift h',min:-3,max:3,step:1,default:0},{name:'k',label:'Vertical shift k',min:-3,max:5,step:1,default:0}]},
{t:'sr',ti:'Worked Example: Combining Transformations',steps:[
'Describe \\(y=2(x+1)^2-3\\) relative to \\(y=x^2\\). Identify each transformation in order.',
'The factor 2 stretches vertically by scale factor 2. The \\((x+1)\\) shifts 1 unit left.',
'The \\(-3\\) shifts 3 units down. Combined: vertical stretch ×2, then translate 1 left and 3 down.'
]},
{t:'qc',ti:'Quick Check: Reflection',q:'The graph of \\(y=f(x)\\) is reflected in the \\(y\\)-axis. What is the new equation?',o:['y=f(−x)','y=−f(x)','y=f(x)+1','y=−f(−x)'],a:0,ex:'Reflection in the \\(y\\)-axis replaces \\(x\\) with \\(-x\\): \\(y=f(-x)\\).'}];
D['as-coordgeo']=[{t:'fn',ti:'Explorer: Perpendicular Lines',fns:[{expr:'2*x-1',color:'#1E3A6E',label:'y=2x−1'},{expr:'-0.5*x+4',color:'#B8801F',label:'perpendicular'}],xrange:[-5,5],yrange:[-6,8]},
{t:'sr',ti:'Worked Example: Tangent to a Circle',steps:[
'Find the equation of the tangent to the circle \\(x^2+y^2=25\\) at the point \\((3,4)\\). The radius to \\((3,4)\\) has gradient \\(\\tfrac43\\).',
'The tangent is perpendicular to the radius, so its gradient is \\(-\\tfrac34\\).',
'Using \\(y-4=-\\tfrac34(x-3)\\): \\(y=-\\tfrac34x+\\tfrac{25}{4}\\).'
]},
{t:'qc',ti:'Quick Check: Circle Equation',q:'A circle has centre \\((2,-3)\\) and radius 4. State its equation.',o:['(x−2)²+(y+3)²=16','(x+2)²+(y−3)²=16','(x−2)²+(y+3)²=4','(x−2)²+(y−3)²=16'],a:0,ex:'\\((x-a)^2+(y-b)^2=r^2\\) with \\((a,b)=(2,-3)\\), \\(r=4\\).'}];
D['as-stats']=[{t:'sr',ti:'Worked Example: Conditional Probability',steps:[
'A box has 5 red and 3 blue balls. Two are drawn without replacement. Find \\(P(\\text{second is red}\\mid\\text{first is red})\\).',
'After removing one red ball, 4 red and 3 blue remain — 7 balls total.',
'\\(P(\\text{second red}\\mid\\text{first red})=\\dfrac47\\).'
]},
{t:'qc',ti:'Quick Check: Mean from a Frequency Table',q:'Scores 2, 4, 6 have frequencies 3, 5, 2. Find the mean.',o:['3.8','4.0','3.5','4.2'],a:0,ex:'Mean \\(=\\dfrac{2(3)+4(5)+6(2)}{10}=\\dfrac{38}{10}=3.8\\).'}];
D['as-funcs']=[{t:'fn',ti:'Explorer: Function and Inverse \\(y=3x-2\\)',fns:[{expr:'3*x-2',color:'#1E3A6E',label:'f(x)'},{expr:'(x+2)/3',color:'#B8801F',label:'f⁻¹(x)'}],xrange:[-4,6],yrange:[-6,10]},
{t:'sr',ti:'Worked Example: Domain and Range of a Composite',steps:[
'Given \\(f(x)=x^2+1\\) (\\(x\\ge0\\)) and \\(g(x)=\\sqrt x\\) (\\(x\\ge0\\)), find \\(fg(x)\\) and its range.',
'\\(fg(x)=f(\\sqrt x)=(\\sqrt x)^2+1=x+1\\).',
'Since \\(x\\ge0\\), \\(fg(x)\\ge1\\). Range: \\(fg(x)\\ge1\\).'
]},
{t:'qc',ti:'Quick Check: Inverse Function',q:'If \\(f(x)=\\dfrac{x-4}{2}\\), find \\(f^{-1}(x)\\).',o:['2x+4','2x−4','(x+4)/2','x/2+4'],a:0,ex:'\\(y=\\dfrac{x-4}{2}\\Rightarrow x=2y+4\\), so \\(f^{-1}(x)=2x+4\\).'}];
D['as-radians']=[{t:'sr',ti:'Worked Example: Arc Length from Degrees',steps:[
'A sector has radius 10 cm and angle \\(75°\\). Convert the angle to radians: \\(\\theta=75°\\times\\tfrac{\\pi}{180}=\\tfrac{5\\pi}{12}\\).',
'Arc length \\(s=r\\theta=10\\times\\tfrac{5\\pi}{12}=\\tfrac{50\\pi}{12}\\).',
'Simplify: \\(s=\\tfrac{25\\pi}{6}\\approx13.1\\) cm.'
]},
{t:'qc',ti:'Quick Check: Sector Area',q:'Find the area of a sector with radius 6 cm and angle 2 radians.',o:['36 cm²','12 cm²','72 cm²','18 cm²'],a:0,ex:'\\(A=\\tfrac12r^2\\theta=\\tfrac12\\times36\\times2=36\\) cm².'}];
D['as-series']=[{t:'sr',ti:'Worked Example: Binomial Expansion',steps:[
'Expand \\((1+2x)^4\\) up to the term in \\(x^2\\), using \\((1+y)^n=1+ny+\\tfrac{n(n-1)}2y^2\\) with \\(y=2x\\), \\(n=4\\).',
'Term 1: 1. Term 2: \\(4(2x)=8x\\).',
'Term 3: \\(\\tfrac{4\\times3}{2}(2x)^2=6\\times4x^2=24x^2\\). Expansion: \\(1+8x+24x^2+\\cdots\\).'
]},
{t:'qc',ti:'Quick Check: Geometric Sum',q:'Find \\(S_6\\) for the geometric series with \\(a=3,\\ r=2\\).',o:['189','96','192','186'],a:0,ex:'\\(S_6=\\dfrac{3(2^6-1)}{2-1}=3\\times63=189\\).'}];
D['as-mechanics']=[{t:'sr',ti:'Worked Example: Two-Stage Motion',steps:[
'A car accelerates from rest at 3 m/s² for 4 s, then travels at constant velocity for 6 s. Find the velocity after the acceleration phase.',
'\\(v=u+at=0+3(4)=12\\) m/s. Distance in phase 1: \\(s_1=\\tfrac12at^2=\\tfrac12(3)(16)=24\\) m.',
'Phase 2 distance: \\(s_2=vt=12\\times6=72\\) m. Total distance \\(=24+72=96\\) m.'
]},
{t:'qc',ti:'Quick Check: SUVAT',q:'A ball is thrown upward with \\(u=20\\) m/s. Find its velocity after 3 s (\\(g=10\\) m/s², up positive).',o:['−10 m/s','10 m/s','−30 m/s','50 m/s'],a:0,ex:'\\(v=u-gt=20-10(3)=-10\\) m/s (moving downward).'}];
D['as-forces']=[{t:'sr',ti:'Worked Example: Equilibrium of Three Forces',steps:[
'A particle is in equilibrium under forces 12 N due North, 5 N due East, and a third force F. For equilibrium, F must balance the resultant of the other two.',
'Resultant of 12 N and 5 N (perpendicular): \\(R=\\sqrt{12^2+5^2}=\\sqrt{169}=13\\) N.',
'\\(|F|=13\\) N, directed opposite to that resultant.'
]},
{t:'qc',ti:'Quick Check: Resolving a Force',q:'A force of 20 N acts at 30° above the horizontal. Find its horizontal component.',o:['17.3 N','10 N','20 N','5.2 N'],a:0,ex:'\\(F_x=F\\cos\\theta=20\\cos30°\\approx17.3\\) N.'}];
D['as-newton']=[{t:'sr',ti:'Worked Example: Newton\\u2019s Second Law with Friction',steps:[
'A 10 kg crate is pushed with a horizontal force of 45 N across a rough floor (\\(\\mu=0.3\\), \\(g=10\\) m/s²). Find the normal reaction and friction force.',
'\\(R=mg=10\\times10=100\\) N. Friction \\(F=\\mu R=0.3\\times100=30\\) N.',
'Net force \\(=45-30=15\\) N. Acceleration \\(a=F/m=15/10=1.5\\) m/s².'
]},
{t:'qc',ti:'Quick Check: Momentum Conservation',q:'A 2 kg ball moving at 6 m/s collides with a stationary 4 kg ball and they stick together. Find their common velocity.',o:['2 m/s','3 m/s','1.5 m/s','4 m/s'],a:0,ex:'\\(m_1u_1=(m_1+m_2)v\\Rightarrow12=6v\\Rightarrow v=2\\) m/s.'}];
D['as-energy']=[{t:'sr',ti:'Worked Example: Energy Conservation on a Slope',steps:[
'A 5 kg object is projected up a smooth slope at 8 m/s and momentarily stops at height \\(h\\). Apply conservation of energy: loss in KE = gain in PE.',
'\\(\\tfrac12mv^2=mgh\\Rightarrow h=\\dfrac{v^2}{2g}\\).',
'\\(h=\\dfrac{8^2}{2\\times10}=\\dfrac{64}{20}=3.2\\) m.'
]},
{t:'qc',ti:'Quick Check: Power',q:'A crane lifts a 200 kg load 15 m in 20 s at constant speed (\\(g=10\\) m/s²). Find the power required.',o:['1500 W','2000 W','1000 W','3000 W'],a:0,ex:'\\(P=\\dfrac{mgh}{t}=\\dfrac{200\\times10\\times15}{20}=1500\\) W.'}];
D['as-datarepresent']=[{t:'sr',ti:'Worked Example: Standard Deviation from Summary Statistics',steps:[
'A data set has \\(n=12\\), \\(\\Sigma x=144\\), \\(\\Sigma x^2=1824\\). Find the mean: mean \\(=\\Sigma x/n\\).',
'Mean \\(=144/12=12\\). Variance \\(=\\Sigma x^2/n-\\text{mean}^2=1824/12-144=152-144=8\\).',
'Standard deviation \\(=\\sqrt8\\approx2.83\\).'
]},
{t:'qc',ti:'Quick Check: Frequency Density',q:'A class interval 15–25 has frequency 20. Find the frequency density.',o:['2','20','10','0.5'],a:0,ex:'Frequency density \\(=\\dfrac{\\text{frequency}}{\\text{class width}}=\\dfrac{20}{10}=2\\).'}];
D['as-permcomb']=[{t:'sr',ti:'Worked Example: Permutations with a Restriction',steps:[
'How many 4-digit codes can be formed from digits 1–7 (no repeats) if the code must start with an even digit? There are 3 even digits (2, 4, 6) for the first position.',
'The remaining 3 positions are filled from the remaining 6 digits: \\(^6P_3=6\\times5\\times4=120\\).',
'Total codes \\(=3\\times120=360\\).'
]},
{t:'qc',ti:'Quick Check: Combinations',q:'How many ways can a team of 3 be chosen from 8 people?',o:['56','336','24','168'],a:0,ex:'\\(^8C_3=\\dfrac{8!}{3!\\,5!}=56\\).'}];
D['as-drv']=[{t:'sr',ti:'Worked Example: Finding E(X) and Var(X)',steps:[
'\\(X\\) takes values 1,2,3,4 with \\(P(X{=}1)=0.1\\), \\(P(X{=}2)=0.3\\), \\(P(X{=}3)=0.4\\), \\(P(X{=}4)=0.2\\). Find \\(E(X)=\\Sigma x\\,P(X{=}x)\\).',
'\\(E(X)=1(0.1)+2(0.3)+3(0.4)+4(0.2)=2.7\\).',
'\\(E(X^2)=1(0.1)+4(0.3)+9(0.4)+16(0.2)=8.1\\). \\(\\text{Var}(X)=8.1-2.7^2=0.81\\).'
]},
{t:'qc',ti:'Quick Check: Linear Transformation',q:'If \\(E(X)=4\\) and \\(\\text{Var}(X)=3\\), find \\(\\text{Var}(2X+5)\\).',o:['12','11','9','7'],a:0,ex:'\\(\\text{Var}(2X+5)=2^2\\times\\text{Var}(X)=4\\times3=12\\).'}];
D['as-bindist']=[{t:'sr',ti:'Worked Example: Binomial Probability',steps:[
'\\(X\\sim B(6,0.25)\\). Find \\(P(X=2)\\) using \\(P(X{=}r)=\\binom{n}{r}p^r(1-p)^{n-r}\\).',
'\\(\\binom62=15\\). \\(p^2=0.0625\\). \\((1-p)^4=0.75^4=0.31640625\\).',
'\\(P(X=2)=15\\times0.0625\\times0.31640625\\approx0.2966\\).'
]},
{t:'qc',ti:'Quick Check: Binomial Variance',q:'\\(X\\sim B(20,0.35)\\). Find \\(\\text{Var}(X)\\).',o:['4.55','7','2.13','9.1'],a:0,ex:'\\(\\text{Var}(X)=np(1-p)=20\\times0.35\\times0.65=4.55\\).'}];
D['as-normdist']=[{t:'fn',ti:'Explorer: The Normal Curve',fns:[{expr:'exp(-((x-mu)^2)/(2*sigma^2))',color:'#1E3A6E'}],xrange:[-6,6],yrange:[-0.2,1.2],params:[{name:'mu',label:'Mean μ',min:-3,max:3,step:1,default:0},{name:'sigma',label:'Std dev σ',min:0.5,max:2.5,step:0.5,default:1}]},
{t:'sr',ti:'Worked Example: Standardising a Normal Variable',steps:[
'\\(X\\sim N(50,64)\\), so \\(\\sigma=\\sqrt{64}=8\\). Find \\(P(X<58)\\) by standardising: \\(Z=(X-\\mu)/\\sigma\\).',
'\\(Z=(58-50)/8=1\\).',
'From tables, \\(P(Z<1)\\approx0.8413\\), so \\(P(X<58)\\approx0.8413\\).'
]},
{t:'qc',ti:'Quick Check: Symmetry',q:'If \\(P(Z<1.5)=0.9332\\), find \\(P(Z<-1.5)\\).',o:['0.0668','0.9332','0.4332','0.1336'],a:0,ex:'By symmetry, \\(P(Z&lt;-z)=1-P(Z&lt;z)=1-0.9332=0.0668\\).'}];

/* ── A2 LEVEL ── */
D['a2l-functions']=[{t:'qc',ti:'Quick Check: Modulus Equations',q:'Solve \\(|2x-1|=5\\)',o:['x=3 only','x=3 or x=−2','x=−2 only','x=6 or x=−4'],a:1,ex:'\\(2x-1=5\\Rightarrow x=3\\); \\(2x-1=-5\\Rightarrow x=-2\\).'},
{t:'fn',ti:'Explorer: Modulus Function \\(y=|x-a|\\)',fns:[{expr:'abs(x-a)',color:'#1E3A6E'}],xrange:[-6,6],yrange:[-1,8],params:[{name:'a',label:'Shift a',min:-3,max:3,step:1,default:0}]},
{t:'sr',ti:'Worked Example: Composite Function with Modulus',steps:[
'Given \\(f(x)=|x-2|\\) and \\(g(x)=3x\\), find \\(fg(x)\\). Substitute \\(g(x)\\) into \\(f\\).',
'\\(fg(x)=f(3x)=|3x-2|\\).',
'\\(fg(-1)=|3(-1)-2|=|-5|=5\\).'
]}];
D['a2l-explog']=[{t:'mt',ti:'Matching: Log Laws',p:[{l:'ln(ab)',r:'ln a + ln b'},{l:'ln(a/b)',r:'ln a − ln b'},{l:'ln(aⁿ)',r:'n ln a'},{l:'e^(ln x)',r:'x'}]},
{t:'sr',ti:'Worked Example: Solving an Exponential Equation',steps:[
'Solve \\(e^{2x-1}=10\\). Take natural logs of both sides.',
'\\(2x-1=\\ln10\\approx2.3026\\).',
'\\(x=\\dfrac{1+2.3026}{2}\\approx1.651\\).'
]},
{t:'qc',ti:'Quick Check: Log Equation',q:'Solve \\(\\log_3(x)=2\\).',o:['9','6','3','729'],a:0,ex:'\\(\\log_3x=2\\Rightarrow x=3^2=9\\).'}];
D['a2l-trig']=[{t:'tf',ti:'True or False: Compound Angles',items:[{s:'\\(\\sin(A+B)=\\sin A\\cos B+\\cos A\\sin B\\)',a:true,ex:'Addition formula — correct.'},{s:'\\(\\cos 2A=1-2\\sin^2 A\\)',a:true,ex:'One form of double angle for cosine.'},{s:'\\(\\sin 2A=2\\sin A\\)',a:false,ex:'\\(\\sin 2A=2\\sin A\\cos A\\).'},{s:'\\(\\cos(A-B)=\\cos A\\cos B-\\sin A\\sin B\\)',a:false,ex:'\\(\\cos(A-B)=\\cos A\\cos B+\\sin A\\sin B\\).'}]},
{t:'sr',ti:'Worked Example: Solving with the Double Angle Formula',steps:[
'Solve \\(\\sin2\\theta=\\cos\\theta\\) for \\(0°\\le\\theta\\le360°\\). Write \\(\\sin2\\theta=2\\sin\\theta\\cos\\theta\\) and factor.',
'\\(2\\sin\\theta\\cos\\theta-\\cos\\theta=0\\Rightarrow\\cos\\theta(2\\sin\\theta-1)=0\\), so \\(\\cos\\theta=0\\) or \\(\\sin\\theta=\\tfrac12\\).',
'\\(\\cos\\theta=0\\) gives \\(\\theta=90°,270°\\). \\(\\sin\\theta=\\tfrac12\\) gives \\(\\theta=30°,150°\\).'
]},
{t:'qc',ti:'Quick Check: Secant Identity',q:'Simplify \\(\\sec^2\\theta-\\tan^2\\theta\\).',o:['1','0','2','tan²θ'],a:0,ex:'From \\(1+\\tan^2\\theta=\\sec^2\\theta\\): \\(\\sec^2\\theta-\\tan^2\\theta=1\\).'}];
D['a2l-diff']=[{t:'sb',ti:'Step Builder: Differentiate \\(y=e^{3x}\\sin x\\) (product rule)',steps:[{l:'\\(u=e^{3x}\\Rightarrow u\'=\\)',a:'3e^3x',h:'Chain rule: 3e^{3x}'},{l:'\\(v=\\sin x\\Rightarrow v\'=\\)',a:'cos x',h:'cos x'},{l:'\\(\\frac{dy}{dx}=uv\'+vu\'=e^{3x}\\cos x+3e^{3x}\\sin x\\). Factor \\(e^{3x}\\):',a:'e^3x(cosx+3sinx)',h:'e^{3x}(cos x + 3sin x)'}]},
{t:'sr',ti:'Worked Example: Implicit Differentiation',steps:[
'Find \\(\\dfrac{dy}{dx}\\) given \\(x^2+y^2=25\\). Differentiate both sides with respect to \\(x\\), remembering \\(y\\) is a function of \\(x\\).',
'\\(2x+2y\\dfrac{dy}{dx}=0\\).',
'\\(\\dfrac{dy}{dx}=-\\dfrac{x}{y}\\).'
]},
{t:'qc',ti:'Quick Check: Quotient Rule',q:'Differentiate \\(y=\\dfrac{2x}{x+3}\\).',o:['6/(x+3)²','2/(x+3)²','2x/(x+3)²','1/(x+3)²'],a:0,ex:'\\(\\dfrac{u\'v-uv\'}{v^2}=\\dfrac{2(x+3)-2x}{(x+3)^2}=\\dfrac{6}{(x+3)^2}\\).'}];

/* ── EST ── */
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

/* ── EST 2 ── */
D['est2-algebra']=[{t:'qc',ti:'Quick Check: Simplifying',q:'Simplify \\(\\frac{2x^2+6x}{2x}\\), \\(x\\neq0\\)',o:['x+3','x²+3','2x+3','x+6'],a:0,ex:'\\(\\frac{2x(x+3)}{2x}=x+3\\).'},
{t:'sr',ti:'Worked Example: Solve a Rational Equation',steps:[
  'Solve \\(\\dfrac3x+2=5\\). Isolate the fraction: \\(\\dfrac3x=3\\).',
  'Multiply both sides by \\(x\\): \\(3=3x\\).',
  'Solve: \\(x=1\\).'
]}];
D['est2-functions']=[{t:'mt',ti:'Matching: Function Operations',p:[{l:'(f+g)(x)',r:'f(x)+g(x)'},{l:'(fg)(x)',r:'f(x)·g(x)'},{l:'(f∘g)(x)',r:'f(g(x))'},{l:'Range of f⁻¹',r:'Domain of f'}]},
{t:'sr',ti:'Worked Example: Find an Inverse Function',steps:[
  'Find the inverse of \\(f(x)=3x-4\\). Replace \\(f(x)\\) with \\(y\\): \\(y=3x-4\\).',
  'Swap \\(x\\) and \\(y\\), then solve for \\(y\\): \\(x=3y-4\\Rightarrow y=\\dfrac{x+4}{3}\\).',
  '\\(f^{-1}(x)=\\dfrac{x+4}{3}\\).'
]}];
D['est2-sequences']=[
{t:'fn',ti:'Explorer: Geometric Sequence \\(3\\cdot r^x\\)',fns:[{expr:'3*r^x',color:'#1E3A6E',label:'3·r^x'}],xrange:[0,5],yrange:[0,30],params:[{name:'r',label:'Ratio r',min:0.5,max:2,step:0.25,default:1.5}]},
{t:'sr',ti:'Worked Example: Sum of a Finite Geometric Series',steps:[
  'Find the sum of \\(2+6+18+54+162\\). Identify \\(a=2\\), \\(r=3\\), \\(n=5\\) terms.',
  'Use the formula \\(S_n=\\dfrac{a(r^n-1)}{r-1}\\).',
  'Substitute: \\(S_5=\\dfrac{2(3^5-1)}{3-1}=\\dfrac{2(242)}{2}=242\\).'
]},
{t:'qc',ti:'Quick Check: Complex Number Addition',q:'Simplify \\((2+3i)+(1-i)\\)',o:['\\(3+2i\\)','\\(3+4i\\)','\\(1+2i\\)','\\(3-2i\\)'],a:0,ex:'Add real and imaginary parts separately: \\((2+1)+(3-1)i=3+2i\\).'}
];
D['est2-geometry']=[{t:'tf',ti:'True or False: Solid Geometry',items:[{s:'Volume of sphere \\(=\\frac{4}{3}\\pi r^3\\)',a:true,ex:'Standard formula.'},{s:'Surface area of cube with side \\(s\\) is \\(4s^2\\)',a:false,ex:'SA of cube \\(=6s^2\\).'},{s:'Volume of cone \\(=\\frac{1}{3}\\pi r^2 h\\)',a:true,ex:'Correct.'},{s:'Volume of cylinder \\(=\\pi r^2 h\\)',a:true,ex:'Correct.'}]},
{t:'sr',ti:'Worked Example: Interior Angle of a Regular Polygon',steps:[
  'A regular pentagon has 5 equal interior angles. Sum of interior angles: \\((5-2)\\times180°=540°\\).',
  'Since the pentagon is regular, divide equally: \\(\\dfrac{540°}{5}\\).',
  'Each angle measures \\(108°\\).'
]}];
D['est2-trig']=[{t:'sb',ti:'Step Builder: Solve \\(2\\sin\\theta=\\sqrt{3}\\), \\(0°\\le\\theta\\le360°\\)',steps:[{l:'\\(\\sin\\theta=\\)',a:'sqrt(3)/2',h:'√3/2'},{l:'Reference angle: \\(\\arcsin(\\sqrt{3}/2)=\\)',a:'60',h:'60°'},{l:'2nd solution \\(=180°-60°=\\)',a:'120',h:'120°'},{l:'Both solutions: 60° and',a:'120',h:'120°'}]},
{t:'sr',ti:'Worked Example: Law of Cosines',steps:[
  'Find side \\(c\\) with \\(a=7\\), \\(b=10\\), included angle \\(C=60°\\). Law of Cosines: \\(c^2=a^2+b^2-2ab\\cos C\\).',
  'Substitute: \\(c^2=49+100-2(7)(10)\\cos60°=149-140(0.5)\\).',
  '\\(c^2=149-70=79\\Rightarrow c=\\sqrt{79}\\approx8.89\\).'
]}];
D['est2-circles']=[
{t:'fn',ti:'Explorer: Circle \\(x^2+y^2=r^2\\)',fns:[{expr:'sqrt(r^2-x^2)',color:'#1E3A6E',label:'upper'},{expr:'-sqrt(r^2-x^2)',color:'#B8801F',label:'lower'}],xrange:[-5,5],yrange:[-5,5],params:[{name:'r',label:'Radius r',min:1,max:4,step:1,default:2}]},
{t:'sr',ti:'Worked Example: Equation of a Circle',steps:[
  'Write the equation of a circle with center \\((-1,2)\\) and radius 5. Standard form: \\((x-h)^2+(y-k)^2=r^2\\).',
  'Substitute \\(h=-1\\), \\(k=2\\), \\(r=5\\): \\((x-(-1))^2+(y-2)^2=5^2\\).',
  'Simplify: \\((x+1)^2+(y-2)^2=25\\).'
]},
{t:'qc',ti:'Quick Check: Circle Center',q:'The center of \\((x-3)^2+(y+4)^2=16\\) is:',o:['\\((3,-4)\\)','\\((-3,4)\\)','\\((3,4)\\)','\\((-3,-4)\\)'],a:0,ex:'Standard form \\((x-h)^2+(y-k)^2=r^2\\) has center \\((h,k)=(3,-4)\\).'}
];
D['est2-solids']=[
{t:'sr',ti:'Worked Example: Volume of a Cone',steps:[
  'Find the volume of a cone with radius 3 and height 8. Formula: \\(V=\\dfrac13\\pi r^2h\\).',
  'Substitute \\(r=3\\), \\(h=8\\): \\(V=\\dfrac13\\pi(9)(8)\\).',
  '\\(V=24\\pi\\).'
]},
{t:'qc',ti:'Quick Check: Similar Solids',q:'If two similar solids have a scale factor of 2, their volumes scale by:',o:['8','2','4','16'],a:0,ex:'Volume scales by the cube of the linear scale factor: \\(2^3=8\\).'}
];
D['est2-stats']=[
{t:'sr',ti:'Worked Example: Combinations',steps:[
  'How many ways can you choose 3 books from a shelf of 8 different books? Since order doesn\'t matter, use combinations: \\(\\binom{n}{r}=\\dfrac{n!}{r!(n-r)!}\\).',
  'Substitute \\(n=8\\), \\(r=3\\): \\(\\binom83=\\dfrac{8!}{3!5!}\\).',
  'Compute: \\(\\dfrac{8\\times7\\times6}{3\\times2\\times1}=56\\).'
]},
{t:'qc',ti:'Quick Check: Factorials',q:'\\(5!\\) equals:',o:['120','20','25','60'],a:0,ex:'\\(5\\times4\\times3\\times2\\times1=120\\).'}
];

/* ── ACT 2 ── */
D['act2-numbers']=[
{t:'sr',ti:'Worked Example: Least Common Multiple',steps:[
  'Find the LCM of 12 and 18. Find prime factorizations: \\(12=2^2\\times3\\), \\(18=2\\times3^2\\).',
  'LCM takes the highest power of each prime: \\(2^2\\times3^2\\).',
  '\\(4\\times9=36\\). The LCM is 36.'
]},
{t:'qc',ti:'Quick Check: Greatest Common Factor',q:'GCF of 24 and 36:',o:['12','6','18','24'],a:0,ex:'\\(24=2^3\\times3\\), \\(36=2^2\\times3^2\\); GCF\\(=2^2\\times3=12\\).'}
];
D['act2-algebra']=[{t:'qc',ti:'Quick Check: Factoring',q:'Factor completely: \\(2x^3-8x\\)',o:['2x(x²−4)','2x(x−2)(x+2)','2(x³−4x)','x(2x²−8)'],a:1,ex:'\\(2x(x^2-4)=2x(x-2)(x+2)\\).'},
{t:'sr',ti:'Worked Example: Nonlinear System',steps:[
  'Solve \\(y=x^2\\) and \\(y=2x+3\\). Set the expressions for \\(y\\) equal: \\(x^2=2x+3\\).',
  'Rearrange: \\(x^2-2x-3=0\\Rightarrow(x-3)(x+1)=0\\).',
  'Solutions: \\(x=3\\) or \\(x=-1\\), with \\(y=9\\) or \\(y=1\\).'
]}];
D['act2-functions']=[{t:'mt',ti:'Matching: Advanced Functions',p:[{l:'Even function',r:'f(−x)=f(x)'},{l:'Odd function',r:'f(−x)=−f(x)'},{l:'H. asymptote when n<m',r:'y=0'},{l:'Change of base',r:'log_a(b)=ln b/ln a'}]},
{t:'sr',ti:'Worked Example: Asymptotes of a Rational Function',steps:[
  'Find the asymptotes of \\(f(x)=\\dfrac{2x}{x-3}\\). Vertical asymptote: set denominator to zero: \\(x-3=0\\Rightarrow x=3\\).',
  'Horizontal asymptote: numerator and denominator have the same degree, so take the ratio of leading coefficients: \\(\\dfrac21=2\\).',
  'Vertical asymptote \\(x=3\\); horizontal asymptote \\(y=2\\).'
]}];
D['act2-trig']=[{t:'tf',ti:'True or False: Advanced Trig',items:[{s:'\\(\\sin^2\\theta+\\cos^2\\theta=1\\)',a:true,ex:'Fundamental identity.'},{s:'Period of \\(\\sin(2x)=2\\pi\\)',a:false,ex:'Period \\(=\\pi\\).'},{s:'\\(\\arcsin(\\sin\\theta)=\\theta\\) for all \\(\\theta\\)',a:false,ex:'Only for \\(\\theta\\in[-\\pi/2,\\,\\pi/2]\\).'},{s:'\\(\\sec\\theta=\\frac{1}{\\cos\\theta}\\)',a:true,ex:'Definition of secant.'}]},
{t:'sr',ti:'Worked Example: Solve a Trig Equation with Two Solutions',steps:[
  'Solve \\(2\\cos\\theta=-1\\) for \\(0°\\le\\theta<360°\\). Isolate cosine: \\(\\cos\\theta=-\\dfrac12\\).',
  'Reference angle: \\(\\arccos\\left(\\dfrac12\\right)=60°\\).',
  'Cosine is negative in Quadrants II and III: \\(\\theta=180°-60°=120°\\) or \\(\\theta=180°+60°=240°\\).'
]}];
D['act2-precalc']=[{t:'sb',ti:'Step Builder: Sum of 3+6+12+24+48',steps:[{l:'First term \\(a=\\)',a:'3',h:'3'},{l:'Common ratio \\(r=\\)',a:'2',h:'6÷3=2'},{l:'\\(2^5=\\)',a:'32',h:'32'},{l:'\\(S_5=3\\cdot\\frac{32-1}{1}=3\\times31=\\)',a:'93',h:'93'}]},
{t:'fn',ti:'Explorer: \\(A\\cdot\\sin(Bx)\\)',fns:[{expr:'A*sin(B*x)',color:'#1E3A6E',label:'A·sin(Bx)'}],xrange:[-6.3,6.3],yrange:[-2.5,2.5],params:[{name:'A',label:'Amplitude A',min:0.5,max:2,step:0.5,default:1},{name:'B',label:'Frequency B',min:0.5,max:2,step:0.5,default:1}]},
{t:'sr',ti:'Worked Example: Vector Dot Product',steps:[
  'Find \\(\\vec u\\cdot\\vec v\\) for \\(\\vec u=\\langle2,3\\rangle\\) and \\(\\vec v=\\langle4,-1\\rangle\\). Formula: \\(\\vec u\\cdot\\vec v=u_1v_1+u_2v_2\\).',
  'Substitute: \\((2)(4)+(3)(-1)\\).',
  '\\(=8-3=5\\).'
]}];
D['act2-coordgeo']=[
{t:'fn',ti:'Explorer: Parabola \\(a(x-2)^2+1\\)',fns:[{expr:'a*(x-2)^2+1',color:'#1E3A6E',label:'a(x-2)^2+1'}],xrange:[-3,6],yrange:[-6,8],params:[{name:'a',label:'Coefficient a',min:-2,max:2,step:0.5,default:1}]},
{t:'sr',ti:'Worked Example: Midpoint Formula',steps:[
  'Find the midpoint of \\((-3,5)\\) and \\((7,-1)\\). Formula: \\(\\left(\\dfrac{x_1+x_2}{2},\\dfrac{y_1+y_2}{2}\\right)\\).',
  'Substitute: \\(\\left(\\dfrac{-3+7}{2},\\dfrac{5+(-1)}{2}\\right)\\).',
  '\\(=(2,2)\\).'
]},
{t:'qc',ti:'Quick Check: Vertical Lines',q:'The slope of a vertical line is:',o:['Undefined','0','1','−1'],a:0,ex:'Vertical lines have undefined slope (division by zero in the slope formula).'}
];
D['act2-planegeo']=[
{t:'sr',ti:'Worked Example: Inscribed Angle Theorem',steps:[
  'An inscribed angle intercepts an arc of 80°. The Inscribed Angle Theorem states the inscribed angle is half the intercepted arc.',
  'Substitute: \\(\\dfrac{80°}{2}\\).',
  'The inscribed angle is \\(40°\\).'
]},
{t:'qc',ti:'Quick Check: Exterior Angles',q:'Sum of exterior angles of any convex polygon:',o:['360°','180°','540°','720°'],a:0,ex:'The exterior angles of any convex polygon always sum to 360°.'}
];
D['act2-stats']=[
{t:'sr',ti:'Worked Example: Permutations',steps:[
  'How many ways can 4 different books be arranged on a shelf? Since order matters, use permutations: arranging \\(n\\) distinct items in a row is \\(n!\\).',
  'Substitute \\(n=4\\): \\(4!=4\\times3\\times2\\times1\\).',
  '\\(=24\\) arrangements.'
]},
{t:'qc',ti:'Quick Check: Mutually Exclusive Events',q:'\\(P(A\\text{ or }B)\\) for mutually exclusive events:',o:['\\(P(A)+P(B)\\)','\\(P(A)\\times P(B)\\)','\\(P(A)-P(B)\\)','\\(P(A\\cap B)\\)'],a:0,ex:'For mutually exclusive events, \\(P(A\\text{ or }B)=P(A)+P(B)\\).'}
];

/* ── PRECALC ── */
D['pc-trig']=[{t:'qc',ti:'Quick Check: Degrees to Radians',q:'Convert \\(150°\\) to radians',o:['5π/6','2π/3','3π/4','π'],a:0,ex:'\\(150\\times\\frac{\\pi}{180}=\\frac{5\\pi}{6}\\).'},
{t:'fn',ti:'Explorer: Period in \\(\\sin(Bx)\\)',fns:[{expr:'sin(B*x)',color:'#1E3A6E',label:'sin(Bx)'}],xrange:[-6.3,6.3],yrange:[-1.5,1.5],params:[{name:'B',label:'Frequency B',min:0.5,max:3,step:0.5,default:1}]},
{t:'sr',ti:'Worked Example: Solve \\(2\\sin\\theta=1\\) for \\(0°\\le\\theta<360°\\)',steps:[
  'Isolate sine: \\(\\sin\\theta=\\dfrac12\\).',
  'Reference angle: \\(\\arcsin\\left(\\frac12\\right)=30°\\).',
  'Sine is positive in Quadrants I and II, so \\(\\theta=30°\\) or \\(\\theta=180°-30°=150°\\).'
]}];
D['pc-circles']=[{t:'mt',ti:'Matching: Unit Circle',p:[{l:'sin 30°',r:'1/2'},{l:'cos 60°',r:'1/2'},{l:'tan 45°',r:'1'},{l:'sin 90°',r:'1'}]},
{t:'fn',ti:'Explorer: Phase Shift \\(\\sin(x+k)\\) vs \\(\\cos(x)\\)',fns:[{expr:'sin(x+k)',color:'#1E3A6E',label:'sin(x+k)'},{expr:'cos(x)',color:'#B8801F',label:'cos(x)'}],xrange:[-6.3,6.3],yrange:[-1.5,1.5],params:[{name:'k',label:'Phase shift k',min:-3.14,max:3.14,step:0.314,default:0}]},
{t:'sr',ti:'Worked Example: Use the Pythagorean Identity',steps:[
  'If \\(\\sin\\theta=\\dfrac35\\) and \\(\\theta\\) is in Quadrant I, use \\(\\sin^2\\theta+\\cos^2\\theta=1\\).',
  'Substitute: \\(\\left(\\dfrac35\\right)^2+\\cos^2\\theta=1\\Rightarrow\\dfrac9{25}+\\cos^2\\theta=1\\).',
  'Solve: \\(\\cos^2\\theta=\\dfrac{16}{25}\\Rightarrow\\cos\\theta=\\pm\\dfrac45\\).',
  'Since \\(\\theta\\) is in Quadrant I, cosine is positive: \\(\\cos\\theta=\\dfrac45\\).'
]}];
D['pc-exp']=[{t:'tf',ti:'True or False: Exponentials & Logs',items:[{s:'\\(\\log_b(MN)=\\log_b M+\\log_b N\\)',a:true,ex:'Product rule for logs.'},{s:'\\(\\log_b(M+N)=\\log_b M+\\log_b N\\)',a:false,ex:'No such law for sum inside log.'},{s:'\\(\\log_b b=1\\)',a:true,ex:'\\(b^1=b\\).'},{s:'\\(\\ln(e^x)=x\\)',a:true,ex:'Inverse functions.'}]},
{t:'fn',ti:'Explorer: Growth/Decay \\(e^{kx}\\)',fns:[{expr:'exp(k*x)',color:'#1E3A6E',label:'e^{kx}'}],xrange:[-3,3],yrange:[0,10],params:[{name:'k',label:'Rate k',min:-1,max:1,step:0.25,default:0.5}]},
{t:'sr',ti:'Worked Example: Exponential Growth Model',steps:[
  'A population grows as \\(P(t)=500e^{0.03t}\\). Substitute \\(t=10\\): \\(P(10)=500e^{0.03(10)}\\).',
  'Simplify the exponent: \\(0.03\\times10=0.3\\), so \\(P(10)=500e^{0.3}\\).',
  'Evaluate \\(e^{0.3}\\approx1.35\\), so \\(P(10)\\approx500(1.35)=675\\).'
]}];
D['pc-conics']=[{t:'sb',ti:'Step Builder: Ellipse \\(\\frac{x^2}{25}+\\frac{y^2}{9}=1\\) — find foci',steps:[{l:'\\(a^2\\) = larger denom =',a:'25',h:'25'},{l:'\\(b^2=\\)',a:'9',h:'9'},{l:'\\(c^2=25-9=\\)',a:'16',h:'16'},{l:'\\(c=\\)',a:'4',h:'√16=4'}]},
{t:'fn',ti:'Explorer: Parabola \\(y=ax^2\\)',fns:[{expr:'a*x^2',color:'#1E3A6E',label:'ax^2'}],xrange:[-4,4],yrange:[-8,8],params:[{name:'a',label:'Coefficient a',min:-2,max:2,step:0.5,default:1}]},
{t:'sr',ti:'Worked Example: Find the Vertex of \\(y=2(x-3)^2+5\\)',steps:[
  'The vertex form of a parabola is \\(y=a(x-h)^2+k\\), where the vertex is \\((h,k)\\).',
  'Compare: \\(h=3\\), \\(k=5\\).',
  'Vertex: \\((3,5)\\).'
]}];
D['pc-vectors']=[
{t:'fn',ti:'Explorer: Direction Vector Slope \\(y=mx\\)',fns:[{expr:'m*x',color:'#1E3A6E',label:'y=mx'}],xrange:[-4,4],yrange:[-6,6],params:[{name:'m',label:'Slope m',min:-3,max:3,step:0.5,default:1}]},
{t:'sr',ti:'Worked Example: Magnitude of a Vector',steps:[
  'Find the magnitude of \\(\\vec v=\\langle-3,4\\rangle\\). Magnitude formula: \\(|\\vec v|=\\sqrt{v_x^2+v_y^2}\\).',
  'Substitute: \\(|\\vec v|=\\sqrt{(-3)^2+4^2}=\\sqrt{9+16}\\).',
  'Simplify: \\(|\\vec v|=\\sqrt{25}=5\\).'
]},
{t:'qc',ti:'Quick Check: Parametric Curves',q:'Parametric equations \\(x=t,\\ y=t^2\\) trace out a:',o:['Parabola','Line','Circle','Ellipse'],a:0,ex:'Eliminating \\(t\\): \\(y=x^2\\) — a parabola.'}
];
D['pc-polar']=[
{t:'sr',ti:'Worked Example: Convert Polar to Rectangular',steps:[
  'Convert the polar point \\((4,60°)\\) to rectangular coordinates using \\(x=r\\cos\\theta\\) and \\(y=r\\sin\\theta\\).',
  'Compute \\(x\\): \\(x=4\\cos60°=4\\left(\\dfrac12\\right)=2\\).',
  'Compute \\(y\\): \\(y=4\\sin60°=4\\left(\\dfrac{\\sqrt3}{2}\\right)=2\\sqrt3\\).',
  'Rectangular coordinates: \\((2,2\\sqrt3)\\).'
]},
{t:'qc',ti:'Quick Check: Polar Equations',q:'The polar equation \\(r=5\\) represents:',o:['A circle of radius 5','A line','A spiral','A single point'],a:0,ex:'\\(r=5\\) means every point is a constant distance 5 from the pole — a circle.'}
];
D['pc-rational']=[
{t:'fn',ti:'Explorer: Rational Function \\(\\dfrac{1}{(x-a)^2}\\)',fns:[{expr:'1/(x-a)^2',color:'#1E3A6E',label:'1/(x-a)^2'}],xrange:[-4,4],yrange:[0,10],params:[{name:'a',label:'Asymptote a',min:-2,max:2,step:1,default:0}]},
{t:'sr',ti:'Worked Example: Limit at Infinity',steps:[
  'Find \\(\\displaystyle\\lim_{x\\to\\infty}\\dfrac{3x^2+2}{x^2-5}\\). Divide every term by \\(x^2\\), the highest power in the denominator: \\(\\dfrac{3+2/x^2}{1-5/x^2}\\).',
  'As \\(x\\to\\infty\\), the terms \\(2/x^2\\) and \\(5/x^2\\) both approach \\(0\\).',
  'The limit becomes \\(\\dfrac{3+0}{1-0}=3\\).'
]},
{t:'qc',ti:'Quick Check: Horizontal Asymptotes',q:'The horizontal asymptote of \\(f(x)=\\dfrac{2x}{x+1}\\) is:',o:['\\(y=2\\)','\\(y=0\\)','\\(y=1\\)','\\(x=-1\\)'],a:0,ex:'Equal-degree numerator/denominator: the asymptote is the ratio of leading coefficients, \\(\\frac21=2\\).'}
];
D['pc-sequences']=[
{t:'fn',ti:'Explorer: Partial Sums of a Geometric Series',fns:[{expr:'2*(1-r^x)/(1-r)',color:'#1E3A6E',label:'S_n'}],xrange:[0,10],yrange:[0,5],params:[{name:'r',label:'Ratio r',min:0.2,max:0.8,step:0.1,default:0.5}]},
{t:'sr',ti:'Worked Example: Infinite Geometric Series',steps:[
  'Find \\(\\displaystyle\\sum_{n=1}^{\\infty}8\\left(\\dfrac14\\right)^{n-1}\\). This is geometric with \\(a=8\\), \\(r=\\dfrac14\\).',
  'Since \\(|r|<1\\), it converges. Use \\(S=\\dfrac{a}{1-r}\\).',
  'Substitute: \\(S=\\dfrac{8}{1-\\frac14}=\\dfrac{8}{\\frac34}=\\dfrac{32}{3}\\).'
]},
{t:'qc',ti:'Quick Check: Divergent Series',q:'Does \\(\\displaystyle\\sum_{n=1}^{\\infty}3^n\\) converge?',o:['No — it diverges','Yes, to 3','Yes, to 1','Yes, to 0'],a:0,ex:'The ratio \\(r=3\\) has \\(|r|>1\\), so the series diverges — its terms grow without bound.'}
];

/* ── AP PRECALC ── */
D['appc-u1']=[{t:'qc',ti:'Quick Check: End Behavior',q:'End behavior of \\(f(x)=-2x^3+5x\\)?',o:['Up left, up right','Up left, down right','Down left, up right','Down left, down right'],a:1,ex:'Odd degree, negative leading coeff: up left, down right.'},
{t:'fn',ti:'Explorer: End Behavior of \\(x^n\\)',fns:[{expr:'x^n',color:'#1E3A6E',label:'x^n'}],xrange:[-3,3],yrange:[-15,15],params:[{name:'n',label:'Power n',min:1,max:5,step:1,default:3}]},
{t:'sr',ti:'Worked Example: Holes vs. Vertical Asymptotes',steps:[
  'Find the vertical asymptotes and holes of \\(f(x)=\\dfrac{(x-2)(x+3)}{(x-2)(x-1)}\\). The factor \\((x-2)\\) is common to numerator and denominator, so it cancels — this creates a hole at \\(x=2\\), not an asymptote.',
  'After cancelling, \\(f(x)=\\dfrac{x+3}{x-1}\\) for \\(x\\neq2\\).',
  'The remaining denominator zero, \\(x=1\\), doesn\'t cancel — it\'s a vertical asymptote.'
]}];
D['appc-u2']=[{t:'mt',ti:'Matching: e and ln Identities',p:[{l:'e⁰',r:'1'},{l:'ln e',r:'1'},{l:'e^(ln x)',r:'x'},{l:'ln(eˣ)',r:'x'}]},
{t:'fn',ti:'Explorer: Shifted Log \\(\\ln(x-h)\\)',fns:[{expr:'ln(x-h)',color:'#1E3A6E',label:'ln(x-h)'}],xrange:[-2,8],yrange:[-3,3],params:[{name:'h',label:'Shift h',min:-2,max:2,step:1,default:0}]},
{t:'sr',ti:'Worked Example: Half-Life Model',steps:[
  'A substance decays as \\(A(t)=A_0e^{-0.1t}\\). Find the time to reach half its original amount: set \\(A(t)=\\dfrac{A_0}{2}\\), so \\(A_0e^{-0.1t}=\\dfrac{A_0}{2}\\).',
  'Divide by \\(A_0\\) and take the natural log: \\(-0.1t=\\ln\\left(\\dfrac12\\right)\\).',
  'Solve: \\(t=\\dfrac{\\ln(1/2)}{-0.1}=\\dfrac{-0.693}{-0.1}\\approx6.93\\).'
]}];
D['appc-u3']=[{t:'tf',ti:'True or False: Polar Coordinates',items:[{s:'\\(x=r\\cos\\theta,\\ y=r\\sin\\theta\\)',a:true,ex:'Polar-to-Cartesian.'},{s:'\\(r^2=x^2+y^2\\)',a:true,ex:'Pythagorean relation.'},{s:'\\(r=a\\) is a straight line',a:false,ex:'\\(r=a\\) is a circle.'},{s:'\\(\\tan\\theta=y/x\\)',a:true,ex:'Definition of \\(\\theta\\).'}]},
{t:'fn',ti:'Explorer: Vertical Stretch \\(A\\cdot\\tan(x)\\)',fns:[{expr:'A*tan(x)',color:'#1E3A6E',label:'A·tan(x)'}],xrange:[-3,3],yrange:[-5,5],params:[{name:'A',label:'Stretch A',min:0.5,max:2,step:0.5,default:1}]},
{t:'sr',ti:'Worked Example: Evaluate a Tangent Value',steps:[
  'Evaluate \\(\\tan\\left(\\dfrac{5\\pi}{4}\\right)\\). This angle is in the third quadrant (\\(\\pi\\) to \\(\\frac{3\\pi}{2}\\)), where tangent is positive.',
  'The reference angle is \\(\\dfrac{5\\pi}{4}-\\pi=\\dfrac{\\pi}{4}\\).',
  '\\(\\tan\\left(\\dfrac{\\pi}{4}\\right)=1\\), so \\(\\tan\\left(\\dfrac{5\\pi}{4}\\right)=1\\).'
]}];
D['appc-u4']=[{t:'sb',ti:'Step Builder: Inverse of \\(f(x)=2x+3\\)',steps:[{l:'Swap x and y in \\(y=2x+3\\): \\(x=\\)',a:'2y+3',h:'x=2y+3'},{l:'Solve for y: \\(y=\\)',a:'(x-3)/2',h:'(x−3)/2'},{l:'\\(f^{-1}(x)=\\)',a:'(x-3)/2',h:'Same'}]},
{t:'fn',ti:'Explorer: Parameters \\(a\\cdot\\sin(x)+c\\)',fns:[{expr:'a*sin(x)+c',color:'#1E3A6E',label:'a·sin(x)+c'}],xrange:[-6.3,6.3],yrange:[-4,4],params:[{name:'a',label:'Amplitude a',min:0.5,max:2,step:0.5,default:1},{name:'c',label:'Vertical shift c',min:-2,max:2,step:0.5,default:0}]},
{t:'sr',ti:'Worked Example: Effect of a Parameter',steps:[
  'How does changing \\(k\\) in \\(f(x)=a(x-h)^2+k\\) affect the graph? The parameter \\(k\\) is the constant added last, outside any transformation of \\(x\\).',
  'Adding a constant \\(k\\) to a function shifts the entire graph vertically.',
  'If \\(k>0\\) the graph shifts up by \\(k\\) units; if \\(k<0\\) it shifts down by \\(|k|\\) units.'
]}];

/* ── AP STATS ── */
D['aps-u1']=[{t:'qc',ti:'Quick Check: Summary Statistics',q:'Which is most resistant to outliers?',o:['Mean','Mode','Median','Range'],a:2,ex:'Median is resistant; mean is not.'},
{t:'sr',ti:'Worked Example: Standard Deviation of a Small Data Set',steps:[
  'Find the standard deviation of \\(2,4,6,8\\) (as a population). Find the mean: \\(\\dfrac{2+4+6+8}{4}=5\\).',
  'Find squared deviations from the mean: \\((2-5)^2=9\\), \\((4-5)^2=1\\), \\((6-5)^2=1\\), \\((8-5)^2=9\\).',
  'Average the squared deviations: \\(\\dfrac{9+1+1+9}{4}=5\\) — this is the variance.',
  'Standard deviation \\(=\\sqrt5\\approx2.24\\).'
]}];
D['aps-u2']=[{t:'mt',ti:'Matching: Sampling Methods',p:[{l:'All members equally likely',r:'Simple random'},{l:'Divide into groups, sample each',r:'Stratified'},{l:'Select every k-th member',r:'Systematic'},{l:'Randomly select entire clusters',r:'Cluster'}]},
{t:'sr',ti:'Worked Example: Designing a True Experiment',steps:[
  'A researcher wants to know if a new fertilizer increases crop yield. An observational study would just record yields from farms already using different fertilizers — this can\'t establish causation, since other factors (soil quality, sunlight) may differ between farms too.',
  'A true experiment requires random assignment: randomly assign plots of land to receive the new fertilizer or a control fertilizer.',
  'Random assignment balances out confounding variables between groups, so any yield difference can be attributed to the fertilizer itself.'
]}];
D['aps-u3']=[{t:'tf',ti:'True or False: Probability',items:[{s:'\\(P(A\\cup B)=P(A)+P(B)-P(A\\cap B)\\)',a:true,ex:'Addition rule.'},{s:'Independent: \\(P(A\\cap B)=P(A)\\cdot P(B)\\)',a:true,ex:'Multiplication rule.'},{s:'\\(P(A)+P(A^c)=0\\)',a:false,ex:'\\(P(A)+P(A^c)=1\\).'},{s:'\\(E(X)=\\sum x\\cdot P(x)\\)',a:true,ex:'Definition of expected value.'}]},
{t:'fn',ti:'Explorer: Normal Distribution Shape',fns:[{expr:'exp(-(x^2)/(2*s^2))',color:'#1E3A6E',label:'normal(σ)'}],xrange:[-6,6],yrange:[0,1.2],params:[{name:'s',label:'Standard deviation σ',min:0.5,max:2.5,step:0.5,default:1}]},
{t:'sr',ti:'Worked Example: Binomial Probability',steps:[
  'A fair coin is flipped 4 times. Find \\(P(\\text{exactly 3 heads})\\). Binomial formula: \\(P(X=k)=\\binom{n}{k}p^k(1-p)^{n-k}\\).',
  'Here \\(n=4\\), \\(k=3\\), \\(p=0.5\\): \\(P(X=3)=\\binom43(0.5)^3(0.5)^1\\).',
  'Compute: \\(\\binom43=4\\), so \\(P=4\\times0.125\\times0.5=0.25\\).'
]}];
D['aps-u4']=[{t:'sb',ti:'Step Builder: One-proportion z-test',steps:[{l:'Null hypothesis: \\(H_0: p=\\)',a:'p0',h:'claimed proportion'},{l:'Test stat uses which distribution?',a:'normal',h:'Standard normal'},{l:'If p-value < α, we:',a:'reject H0',h:'reject null hypothesis'}]},
{t:'sr',ti:'Worked Example: Interpreting a Confidence Interval',steps:[
  'A poll of 400 people finds 60% support a policy, with a margin of error of 4%. The confidence interval is the sample proportion plus or minus the margin of error: \\(60\\%\\pm4\\%\\).',
  'This gives the interval \\([56\\%,64\\%]\\).',
  'Interpretation: we are confident the <em>true population proportion</em> supporting the policy lies between 56% and 64% — not that 56–64% of THIS sample supports it (we already know that\'s 60%).'
]}];

D['a2l-integ']=[{t:'sr',ti:'Worked Example: Integration by Substitution',steps:[
'Find \\(\\displaystyle\\int2x(x^2+1)^3\\,dx\\). Let \\(u=x^2+1\\), so \\(du=2x\\,dx\\).',
'The integral becomes \\(\\displaystyle\\int u^3\\,du=\\dfrac{u^4}{4}+C\\).',
'Substitute back: \\(\\dfrac{(x^2+1)^4}{4}+C\\).'
]},
{t:'qc',ti:'Quick Check: Definite Integral',q:'Evaluate \\(\\displaystyle\\int_1^2\\dfrac1x\\,dx\\).',o:['ln 2','1','ln 1','2'],a:0,ex:'\\([\\ln x]_1^2=\\ln2-\\ln1=\\ln2\\).'}];
D['a2l-series']=[{t:'sr',ti:'Worked Example: Binomial Expansion with Negative Index',steps:[
'Expand \\((1-x)^{-1}\\) up to the term in \\(x^3\\), using \\((1+y)^n=1+ny+\\tfrac{n(n-1)}2y^2+\\tfrac{n(n-1)(n-2)}6y^3\\) with \\(y=-x\\), \\(n=-1\\).',
'Term 2: \\((-1)(-x)=x\\). Term 3: \\(\\tfrac{(-1)(-2)}2(-x)^2=x^2\\).',
'Term 4: \\(\\tfrac{(-1)(-2)(-3)}6(-x)^3=x^3\\). Expansion: \\(1+x+x^2+x^3+\\cdots\\), valid for \\(|x|<1\\).'
]},
{t:'qc',ti:'Quick Check: Maclaurin Series',q:'Find the coefficient of \\(x^2\\) in the Maclaurin series for \\(\\cos x\\).',o:['−1/2','1/2','1','0'],a:0,ex:'\\(\\cos x=1-\\tfrac{x^2}{2!}+\\cdots\\), so the coefficient is \\(-\\tfrac12\\).'}];
D['a2l-vectors']=[{t:'sr',ti:'Worked Example: Angle Between Two Vectors',steps:[
'Find the angle between \\(\\mathbf a=(3,4,0)\\) and \\(\\mathbf b=(0,4,3)\\). Compute the dot product.',
'\\(\\mathbf a\\cdot\\mathbf b=3(0)+4(4)+0(3)=16\\). \\(|\\mathbf a|=\\sqrt{9+16}=5\\), \\(|\\mathbf b|=\\sqrt{16+9}=5\\).',
'\\(\\cos\\theta=\\dfrac{16}{25}=0.64\\), so \\(\\theta=\\arccos(0.64)\\approx50.2°\\).'
]},
{t:'qc',ti:'Quick Check: 3D Magnitude',q:'Find the magnitude of \\((2,-3,6)\\).',o:['7','11','49','6'],a:0,ex:'\\(|\\mathbf v|=\\sqrt{4+9+36}=\\sqrt{49}=7\\).'}];
D['a2l-algebra']=[{t:'sr',ti:'Worked Example: Partial Fractions with a Repeated Factor',steps:[
'Express \\(\\dfrac{3x+5}{(x+1)^2}\\) in partial fractions: write as \\(\\dfrac{A}{x+1}+\\dfrac{B}{(x+1)^2}\\).',
'\\(3x+5=A(x+1)+B\\). Let \\(x=-1\\): \\(2=B\\).',
'Compare coefficients of \\(x\\): \\(A=3\\). Result: \\(\\dfrac{3}{x+1}+\\dfrac{2}{(x+1)^2}\\).'
]},
{t:'qc',ti:'Quick Check: Polynomial Division',q:'Divide \\(x^3+2x^2-5x-6\\) by \\((x-2)\\). Find the remainder.',o:['0','4','−6','8'],a:0,ex:'By the remainder theorem, remainder \\(=f(2)=8+8-10-6=0\\).'}];
D['a2l-complex']=[{t:'sr',ti:'Worked Example: Complex Roots of a Quadratic',steps:[
'Solve \\(x^2+2x+5=0\\). Compute the discriminant \\(\\Delta=b^2-4ac\\).',
'\\(\\Delta=4-20=-16=16i^2\\).',
'\\(x=\\dfrac{-2\\pm\\sqrt{-16}}{2}=\\dfrac{-2\\pm4i}{2}=-1\\pm2i\\).'
]},
{t:'qc',ti:'Quick Check: Complex Multiplication',q:'Simplify \\((2+3i)(1-i)\\).',o:['5+i','2−3i','5−i','−1+5i'],a:0,ex:'\\((2+3i)(1-i)=2-2i+3i-3i^2=2+i+3=5+i\\).'}];
D['a2l-numerical']=[{t:'sr',ti:'Worked Example: Fixed-Point Iteration',steps:[
'Use \\(x_{n+1}=\\sqrt{3x_n+2}\\) with \\(x_0=3\\) to approximate a root of \\(x^2-3x-2=0\\). Find \\(x_1\\).',
'\\(x_1=\\sqrt{3(3)+2}=\\sqrt{11}\\approx3.317\\).',
'\\(x_2=\\sqrt{3(3.317)+2}=\\sqrt{11.950}\\approx3.457\\).'
]},
{t:'qc',ti:'Quick Check: Sign Change',q:'For \\(f(x)=x^3-4x-2\\), between which consecutive integers does the largest root lie?',o:['2 and 3','1 and 2','−1 and 0','0 and 1'],a:0,ex:'\\(f(2)=-2<0\\) and \\(f(3)=13>0\\), so the root lies between 2 and 3.'}];
D['a2l-diffeq']=[{t:'sr',ti:'Worked Example: Separable DE with Initial Condition',steps:[
'Solve \\(\\dfrac{dy}{dx}=xy\\), given \\(y=2\\) when \\(x=0\\). Separate variables: \\(\\dfrac1y\\,dy=x\\,dx\\).',
'Integrate: \\(\\ln|y|=\\dfrac{x^2}{2}+C\\).',
'At \\((0,2)\\): \\(\\ln2=C\\). So \\(y=2e^{x^2/2}\\).'
]},
{t:'qc',ti:'Quick Check: Separable DE',q:'Solve \\(\\dfrac{dy}{dx}=2y\\) (general solution).',o:['y=Ae^{2x}','y=Ae^x','y=2e^x+C','y=Ax²'],a:0,ex:'Separate: \\(dy/y=2\\,dx\\Rightarrow\\ln y=2x+C\\Rightarrow y=Ae^{2x}\\).'}];
D['a2l-poisson']=[{t:'sr',ti:'Worked Example: Poisson Probability over a Sub-interval',steps:[
'Calls arrive at a rate of 5 per hour. Find \\(P(\\text{exactly 2 calls in 30 minutes})\\). Adjust \\(\\lambda\\) for the half-hour interval: \\(\\lambda=5\\times0.5=2.5\\).',
'\\(P(X=2)=\\dfrac{e^{-2.5}(2.5)^2}{2!}=\\dfrac{6.25\\,e^{-2.5}}{2}\\).',
'\\(\\approx3.125\\times0.0821\\approx0.256\\).'
]},
{t:'qc',ti:'Quick Check: Poisson Mean',q:'If \\(X\\sim\\text{Po}(3.5)\\), find \\(\\text{Var}(X)\\).',o:['3.5','1.87','12.25','7'],a:0,ex:'For a Poisson distribution, mean = variance = \\(\\lambda=3.5\\).'}];
D['a2l-conrv']=[{t:'sr',ti:'Worked Example: Finding the Constant in a pdf',steps:[
'\\(f(x)=kx^2\\) for \\(0\\le x\\le2\\), zero otherwise. Use the pdf condition \\(\\int f(x)\\,dx=1\\).',
'\\(\\displaystyle\\int_0^2 kx^2\\,dx=k\\left[\\tfrac{x^3}3\\right]_0^2=\\tfrac{8k}3\\).',
'\\(\\tfrac{8k}3=1\\Rightarrow k=\\tfrac38\\).'
]},
{t:'qc',ti:'Quick Check: Uniform Distribution',q:'\\(X\\sim U(2,10)\\). Find \\(E(X)\\).',o:['6','5','8','4'],a:0,ex:'\\(E(X)=\\dfrac{a+b}{2}=\\dfrac{2+10}{2}=6\\).'}];
D['a2l-sampling']=[{t:'sr',ti:'Worked Example: Required Sample Size',steps:[
'A population has \\(\\sigma=15\\). Find the sample size so a 95% CI has margin of error at most 2. Use \\(n\\ge(z\\sigma/E)^2\\) with \\(z=1.96\\).',
'\\(n\\ge\\left(\\dfrac{1.96\\times15}{2}\\right)^2=(14.7)^2=216.09\\).',
'Round up: \\(n=217\\).'
]},
{t:'qc',ti:'Quick Check: Confidence Interval Width',q:'A 95% CI is \\(\\bar x\\pm1.96\\sigma/\\sqrt n\\). If \\(n\\) is quadrupled, the width of the CI is:',o:['halved','doubled','quartered','unchanged'],a:0,ex:'Width \\(\\propto1/\\sqrt n\\); quadrupling \\(n\\) halves the width.'}];
D['a2l-hypothesis']=[{t:'sr',ti:'Worked Example: Two-Tailed Hypothesis Test',steps:[
'A machine fills bags with mean 500 g, \\(\\sigma=10\\) g. A sample of 25 gives \\(\\bar x=504\\) g. Test at 5% (two-tailed) whether the mean has changed. State \\(H_0\\) and \\(H_1\\).',
'\\(H_0:\\mu=500\\), \\(H_1:\\mu\\neq500\\). \\(Z=\\dfrac{504-500}{10/\\sqrt{25}}=\\dfrac{4}{2}=2\\).',
'Critical value at 5% two-tailed: \\(\\pm1.96\\). Since \\(2>1.96\\), reject \\(H_0\\) — significant evidence the mean has changed.'
]},
{t:'qc',ti:'Quick Check: Type I Error',q:'What is a Type I error in hypothesis testing?',o:['Rejecting H₀ when it is true','Failing to reject H₀ when it is false','Accepting H₁ when it is false','Rejecting H₁ when it is true'],a:0,ex:'A Type I error occurs when \\(H_0\\) is rejected but is actually true.'}];

/* ── IB SL ── */
D['ibsl-t1']=[{t:'qc',ti:'Quick Check: Arithmetic Sequences',q:'10th term of \\(3,7,11,15,\\ldots\\)?',o:['39','43','36','40'],a:0,ex:'\\(a_{10}=3+9\\times4=39\\).'},
{t:'sr',ti:'Worked Example: Compound Interest',steps:[
'An investment of \\$2000 earns 4% annual interest compounded quarterly for 3 years. Use \\(FV=PV(1+r/(100k))^{kn}\\) with \\(k=4\\), \\(n=3\\).',
'\\(FV=2000(1+0.04/4)^{12}=2000(1.01)^{12}\\).',
'\\((1.01)^{12}\\approx1.1268\\), so \\(FV\\approx\\$2253.65\\).'
]},
{t:'qc',ti:'Quick Check: Change of Base',q:'Evaluate \\(\\log_5 125\\).',o:['3','5','25','15'],a:0,ex:'\\(5^3=125\\), so \\(\\log_5125=3\\).'}];
D['ibsl-t2']=[{t:'mt',ti:'Matching: Transformations',p:[{l:'f(x)+k',r:'Shift up k'},{l:'f(x−h)',r:'Shift right h'},{l:'−f(x)',r:'Reflect over x-axis'},{l:'f(−x)',r:'Reflect over y-axis'}]},
{t:'fn',ti:'Explorer: Function and Inverse \\(y=2x+3\\)',fns:[{expr:'2*x+3',color:'#1E3A6E',label:'f(x)'},{expr:'(x-3)/2',color:'#B8801F',label:'f⁻¹(x)'}],xrange:[-6,6],yrange:[-6,10]},
{t:'sr',ti:'Worked Example: Composite Function Value',steps:[
'\\(f(x)=x^2-1\\), \\(g(x)=3x+2\\). Find \\((f\\circ g)(-1)\\). First evaluate \\(g(-1)\\).',
'\\(g(-1)=3(-1)+2=-1\\).',
'\\(f(-1)=(-1)^2-1=0\\). So \\((f\\circ g)(-1)=0\\).'
]}];
D['ibsl-t3']=[{t:'tf',ti:'True or False: Geometry & Trig',items:[{s:'Area of triangle \\(=\\frac{1}{2}ab\\sin C\\)',a:true,ex:'Correct formula.'},{s:'Cosine rule: \\(c^2=a^2+b^2-2ab\\cos C\\)',a:true,ex:'Standard cosine rule.'},{s:'Arc length \\(l=r\\theta\\) where \\(\\theta\\) in degrees',a:false,ex:'\\(\\theta\\) must be in radians.'},{s:'1 radian ≈ 57.3°',a:true,ex:'\\(180/\\pi\\approx57.3°\\).'}]},
{t:'sr',ti:'Worked Example: Perpendicular Vectors',steps:[
'Find the angle between \\(\\mathbf u=(3,4)\\) and \\(\\mathbf v=(4,-3)\\). Compute the dot product.',
'\\(\\mathbf u\\cdot\\mathbf v=3(4)+4(-3)=12-12=0\\).',
'Since the dot product is zero, the vectors are perpendicular: \\(\\theta=90°\\).'
]},
{t:'qc',ti:'Quick Check: Sector Area',q:'Find the sector area for radius 5 cm and angle 1.2 radians.',o:['15 cm²','30 cm²','7.5 cm²','6 cm²'],a:0,ex:'\\(A=\\tfrac12r^2\\theta=\\tfrac12\\times25\\times1.2=15\\) cm².'}];
D['ibsl-t4']=[{t:'sb',ti:'Step Builder: \\(X\\sim B(5,0.4)\\), find \\(P(X=2)\\)',steps:[{l:'\\(\\binom{5}{2}=\\)',a:'10',h:'10'},{l:'\\((0.4)^2=\\)',a:'0.16',h:'0.16'},{l:'\\((0.6)^3=\\)',a:'0.216',h:'0.216'},{l:'\\(P(X=2)=10\\times0.16\\times0.216=\\)',a:'0.3456',h:'0.3456'}]},
{t:'sr',ti:'Worked Example: Conditional Probability & Independence',steps:[
'\\(P(A)=0.5\\), \\(P(B)=0.3\\), \\(P(A\\cap B)=0.15\\). Find \\(P(A\\mid B)=P(A\\cap B)/P(B)\\).',
'\\(P(A\\mid B)=0.15/0.3=0.5\\).',
'Since \\(P(A\\mid B)=P(A)=0.5\\), events \\(A\\) and \\(B\\) are independent.'
]},
{t:'qc',ti:'Quick Check: Union',q:'\\(P(A)=0.4\\), \\(P(B)=0.5\\), \\(P(A\\cap B)=0.2\\). Find \\(P(A\\cup B)\\).',o:['0.7','0.9','0.5','0.2'],a:0,ex:'\\(P(A\\cup B)=P(A)+P(B)-P(A\\cap B)=0.4+0.5-0.2=0.7\\).'}];

D['ibsl-t5']=[{t:'fn',ti:'Explorer: Cubic Function \\(y=x^3-3x+k\\)',fns:[{expr:'x^3-3*x+k',color:'#1E3A6E'}],xrange:[-3,3],yrange:[-6,6],params:[{name:'k',label:'Vertical shift k',min:-3,max:3,step:1,default:0}]},
{t:'sr',ti:'Worked Example: Optimisation',steps:[
'A rectangular garden has perimeter 60 m. Let width \\(=x\\), so length \\(=30-x\\). Write the area function \\(A(x)=x(30-x)\\).',
'\\(A(x)=30x-x^2\\). Differentiate: \\(A\'(x)=30-2x\\). Set to zero: \\(x=15\\).',
'Maximum area \\(=15\\times15=225\\) m\\(^2\\) (a square).'
]},
{t:'qc',ti:'Quick Check: Definite Integral',q:'Evaluate \\(\\displaystyle\\int_0^{\\pi}\\sin x\\,dx\\).',o:['2','0','1','−2'],a:0,ex:'\\([-\\cos x]_0^\\pi=-\\cos\\pi-(-\\cos0)=1+1=2\\).'}];
D['ibsl-ai']=[{t:'sr',ti:'Worked Example: Spearman\\u2019s Rank Correlation',steps:[
'Two judges rank 5 contestants. The sum of squared rank differences is \\(\\Sigma d^2=8\\). Use \\(r_s=1-\\dfrac{6\\Sigma d^2}{n(n^2-1)}\\).',
'\\(r_s=1-\\dfrac{6(8)}{5(25-1)}=1-\\dfrac{48}{120}\\).',
'\\(r_s=1-0.4=0.6\\) — a fairly strong positive correlation.'
]},
{t:'qc',ti:'Quick Check: Euler\\u2019s Method',q:'Using \\(dy/dx=x\\), \\(y(0)=1\\), \\(h=0.5\\), estimate \\(y(0.5)\\) with one Euler step.',o:['1','1.5','1.25','0.5'],a:0,ex:'\\(y_1=y_0+h\\,f(x_0,y_0)=1+0.5(0)=1\\).'}];

/* ── IB HL ── */
D['ibhl-t1']=[{t:'qc',ti:'Quick Check: Complex Numbers',q:'Modulus of \\(z=3+4i\\)?',o:['5','7','1','√7'],a:0,ex:'\\(\\sqrt{9+16}=5\\).'},
{t:'sr',ti:'Worked Example: De Moivre\\u2019s Theorem',steps:[
'Find \\(z^4\\) for \\(z=1+i\\) using De Moivre\\u2019s theorem. First write \\(z\\) in polar form: \\(|z|=\\sqrt2\\), \\(\\arg z=\\pi/4\\).',
'\\(z^4=(\\sqrt2)^4\\left(\\cos\\tfrac{4\\pi}4+i\\sin\\tfrac{4\\pi}4\\right)=4(\\cos\\pi+i\\sin\\pi)\\).',
'\\(z^4=4(-1+0i)=-4\\).'
]}];
D['ibhl-t2']=[{t:'mt',ti:'Matching: Inverse Functions',p:[{l:'Bijective',r:'One-to-one AND onto'},{l:'f(f⁻¹(x))',r:'x'},{l:'Horizontal line test',r:'Checks one-to-one'},{l:'Range of f⁻¹',r:'Domain of f'}]},
{t:'fn',ti:'Explorer: Rational Function \\(y=\\frac{2x+1}{x-a}\\)',fns:[{expr:'(2*x+1)/(x-a)',color:'#1E3A6E'}],xrange:[-6,6],yrange:[-10,10],params:[{name:'a',label:'Vertical asymptote a',min:-3,max:3,step:1,default:1}]},
{t:'sr',ti:'Worked Example: Complex Conjugate Root Theorem',steps:[
'A cubic \\(p(x)=x^3-4x^2+6x-4\\) has real coefficients and root \\(x=2\\), and \\(1+i\\) is also a root. Since coefficients are real, complex roots occur in conjugate pairs.',
'The conjugate of \\(1+i\\) is \\(1-i\\), so the third root is \\(1-i\\).',
'Check: sum of roots \\(=2+(1+i)+(1-i)=4\\), matching \\(-b/a=4\\).'
]}];
D['ibhl-t3']=[{t:'tf',ti:'True or False: 3D Vectors',items:[{s:'\\(\\mathbf{a}\\cdot\\mathbf{b}=|\\mathbf{a}||\\mathbf{b}|\\cos\\theta\\)',a:true,ex:'Dot product definition.'},{s:'\\(\\mathbf{a}\\times\\mathbf{b}\\) is parallel to both \\(\\mathbf{a}\\) and \\(\\mathbf{b}\\)',a:false,ex:'Cross product is perpendicular to both.'},{s:'\\(\\mathbf{a}\\cdot\\mathbf{b}=0\\Rightarrow\\) perpendicular',a:true,ex:'Zero dot product → 90° angle.'},{s:'\\(|\\mathbf{a}\\times\\mathbf{b}|=|\\mathbf{a}||\\mathbf{b}|\\sin\\theta\\)',a:true,ex:'Magnitude of cross product.'}]},
{t:'sr',ti:'Worked Example: Distance from a Point to a Plane',steps:[
'Find the distance from \\(P(2,-1,3)\\) to the plane \\(x+2y-2z=5\\). Use \\(d=\\dfrac{|aP_x+bP_y+cP_z-d|}{\\sqrt{a^2+b^2+c^2}}\\).',
'\\(d=\\dfrac{|1(2)+2(-1)-2(3)-5|}{\\sqrt{1+4+4}}=\\dfrac{|-11|}{3}\\).',
'\\(d=\\dfrac{11}{3}\\approx3.67\\).'
]},
{t:'qc',ti:'Quick Check: Cross Product',q:'Find the third component of \\(\\mathbf u\\times\\mathbf v\\) for \\(\\mathbf u=(1,0,2)\\), \\(\\mathbf v=(3,1,0)\\).',o:['1','−2','6','0'],a:0,ex:'Third component \\(=u_1v_2-u_2v_1=1(1)-0(3)=1\\).'}];
D['ibhl-t4']=[{t:'sb',ti:'Step Builder: Distribution \\(P(1)=0.3,P(2)=0.5,P(3)=0.2\\)',steps:[{l:'\\(E(X)=1(0.3)+2(0.5)+3(0.2)=\\)',a:'1.9',h:'0.3+1.0+0.6=1.9'},{l:'\\(E(X^2)=1(0.3)+4(0.5)+9(0.2)=\\)',a:'4.1',h:'0.3+2.0+1.8=4.1'},{l:'\\(\\text{Var}(X)=4.1-(1.9)^2=\\)',a:'0.49',h:'4.1−3.61=0.49'}]},
{t:'sr',ti:'Worked Example: Confidence Interval with Unknown σ',steps:[
'A sample of \\(n=16\\) gives \\(\\bar x=45.2\\), \\(s=5\\). Construct a 95% CI for \\(\\mu\\) using \\(t_{15,0.025}\\approx2.131\\).',
'\\(CI=45.2\\pm2.131\\times\\dfrac{5}{\\sqrt{16}}=45.2\\pm2.131(1.25)\\).',
'\\(CI=45.2\\pm2.66=(42.5,\\,47.9)\\).'
]},
{t:'qc',ti:'Quick Check: Poisson',q:'\\(X\\sim\\text{Po}(5)\\). Find \\(P(X=0)\\).',o:['0.0067','0.5','0.2','1'],a:0,ex:'\\(P(X=0)=e^{-\\lambda}=e^{-5}\\approx0.0067\\).'}];
D['ibhl-t5']=[{t:'fn',ti:'Explorer: \\(e^x\\) vs its Maclaurin Approximation',fns:[{expr:'exp(x)',color:'#1E3A6E',label:'e^x'},{expr:'1+x+x^2/2+x^3/6',color:'#B8801F',label:'Taylor deg 3'}],xrange:[-3,3],yrange:[-2,10]},
{t:'sr',ti:'Worked Example: Integration by Parts Twice',steps:[
'Find \\(\\displaystyle\\int x^2\\cos x\\,dx\\) using integration by parts twice. Let \\(u=x^2\\), \\(dv=\\cos x\\,dx\\), so \\(du=2x\\,dx\\), \\(v=\\sin x\\).',
'\\(\\int x^2\\cos x\\,dx=x^2\\sin x-\\int2x\\sin x\\,dx\\). Apply IBP again to \\(\\int2x\\sin x\\,dx\\): result is \\(-2x\\cos x+2\\sin x\\).',
'Combine: \\(\\int x^2\\cos x\\,dx=x^2\\sin x+2x\\cos x-2\\sin x+C\\).'
]},
{t:'qc',ti:'Quick Check: Maclaurin Series',q:'Find the coefficient of \\(x^3\\) in the Maclaurin series for \\(\\sin x\\).',o:['−1/6','1/6','1','0'],a:0,ex:'\\(\\sin x=x-\\tfrac{x^3}{3!}+\\cdots\\), so the coefficient is \\(-\\tfrac16\\).'}];
D['ibhl-aa']=[{t:'sr',ti:'Worked Example: Ratio Test for Convergence',steps:[
'Determine whether \\(\\displaystyle\\sum_{n=1}^{\\infty}\\dfrac{3^n}{n!}\\) converges, using the ratio test.',
'\\(\\left|\\dfrac{a_{n+1}}{a_n}\\right|=\\dfrac{3^{n+1}/(n+1)!}{3^n/n!}=\\dfrac{3}{n+1}\\).',
'As \\(n\\to\\infty\\), \\(\\dfrac{3}{n+1}\\to0<1\\), so the series converges (absolutely).'
]},
{t:'qc',ti:'Quick Check: Derivative of Inverse Trig',q:'Find \\(\\dfrac{d}{dx}[\\tan^{-1}x]\\) at \\(x=1\\).',o:['1/2','1','2','1/4'],a:0,ex:'\\(\\dfrac{d}{dx}\\tan^{-1}x=\\dfrac1{1+x^2}\\). At \\(x=1\\): \\(\\tfrac12\\).'}];
D['ibhl-aihl']=[{t:'sr',ti:'Worked Example: Eigenvalues of a Matrix',steps:[
'Find the eigenvalues of \\(A=\\begin{pmatrix}4&1\\\\2&3\\end{pmatrix}\\). Solve \\(\\det(A-\\lambda I)=0\\).',
'\\((4-\\lambda)(3-\\lambda)-2=0\\Rightarrow\\lambda^2-7\\lambda+10=0\\).',
'Factor: \\((\\lambda-5)(\\lambda-2)=0\\), so \\(\\lambda=5\\) or \\(\\lambda=2\\).'
]},
{t:'qc',ti:'Quick Check: Minimum Spanning Tree',q:'Kruskal\\u2019s algorithm builds a minimum spanning tree by:',o:['Adding edges in increasing weight, skipping cycles','Adding edges in decreasing weight','Always starting from the same vertex','Removing the heaviest edges one by one'],a:0,ex:'Kruskal\\u2019s algorithm sorts edges by weight and adds each one unless it creates a cycle.'}];

/* ══════════ ENGINE ══════════ */
function _mjax(el){
  setTimeout(function(){
    try{
      if(!window.MathJax) return;
      if(typeof MathJax.typesetPromise==='function') MathJax.typesetPromise([el]).catch(function(){});
      else if(typeof MathJax.typeset==='function') MathJax.typeset([el]);
    }catch(e){}
  },150);
}

function _norm(s){
  return String(s).trim().toLowerCase()
    .replace(/\s+/g,'')
    .replace(/²/g,'2').replace(/³/g,'3')
    .replace(/π/g,'pi').replace(/√/g,'sqrt')
    .replace(/[×·]/g,'*').replace(/÷/g,'/');
}

/* Picks the Arabic variant of a D[] field (e.g. cfg.ti_ar) when the current
   locale is 'ar' and that chapter has been given one, else falls back to the
   default (English) field — so reviewed chapters can carry real Arabic quiz
   content while every other chapter keeps working unchanged. */
function _loc(cfg,key){
  var loc=window.i18n?window.i18n.getLocale():'en';
  if(loc==='ar'&&cfg[key+'_ar']!=null)return cfg[key+'_ar'];
  return cfg[key];
}
var _IX_EN_FALLBACK={'ix.badge.qc':'Quick Check','ix.badge.sr':'Worked Example','ix.badge.mt':'Matching','ix.badge.fn':'Explorer','ix.tryAgain':'Try again',
  'ix.correct':'✓ Correct! ','ix.incorrect':'✗ Not quite. ','ix.head':'Interactive Practice',
  'ix.sr.showFirst':'Show first step ▸','ix.sr.showNext':'Show next step ▸ ({n}/{m})','ix.sr.restart':'↺ Restart',
  'ix.mt.allMatched':'🎉 All pairs matched!',
  'ix.badge.tf':'True / False','ix.tf.trueCorrect':'✓ True — ','ix.tf.falseCorrect':'✓ False — ','ix.tf.true':'True','ix.tf.false':'False',
  'ix.badge.sb':'Step Builder','ix.sb.hintPrefix':'Hint: ','ix.sb.checkAnswers':'Check Answers',
  'ix.sb.allCorrect':'✓ All {n} steps correct!','ix.sb.someCorrect':'{ok}/{total} correct. Hints: ','ix.sb.stepN':'Step {n}: '};
function _t(key,vars){
  if(window.i18n)return window.i18n.t(key,vars);
  var s=_IX_EN_FALLBACK[key]||key;
  if(vars)Object.keys(vars).forEach(function(k){s=s.replace('{'+k+'}',vars[k]);});
  return s;
}

function _buildQC(cfg,box){
  box.innerHTML='<span class="ix-badge qc">'+_t('ix.badge.qc')+'</span>';
  var h=document.createElement('h3');h.innerHTML=_loc(cfg,'ti');box.appendChild(h);
  var p=document.createElement('p');p.style.cssText='margin:.3rem 0 .65rem;font-size:.9rem';p.innerHTML=_loc(cfg,'q');box.appendChild(p);
  var od=document.createElement('div');od.className='ix-opts';
  var done=false;
  _loc(cfg,'o').forEach(function(opt,i){
    var b=document.createElement('button');b.className='ix-opt';b.innerHTML=opt;
    var optText=String(opt).replace(/<[^>]*>/g,'').trim();
    b.setAttribute('aria-label',optText||('Option '+(i+1)));
    b.addEventListener('click',function(){
      if(done)return;done=true;
      od.querySelectorAll('.ix-opt').forEach(function(btn,j){
        btn.disabled=true;
        if(j===cfg.a)btn.classList.add('correct');
        else if(j===i)btn.classList.add('wrong');
      });
      var fb=document.createElement('div');fb.className='ix-fb '+(i===cfg.a?'ok':'no');
      fb.innerHTML=(i===cfg.a?_t('ix.correct'):_t('ix.incorrect'))+_loc(cfg,'ex');
      box.appendChild(fb);
      var rb=document.createElement('button');rb.className='ix-again';rb.textContent=_t('ix.tryAgain');
      rb.addEventListener('click',function(){
        done=false;
        od.querySelectorAll('.ix-opt').forEach(function(b){b.disabled=false;b.classList.remove('correct','wrong');});
        fb.remove();rb.remove();
      });
      box.appendChild(rb);
      _mjax(box);
    });
    od.appendChild(b);
  });
  box.appendChild(od);
}

function _buildMT(cfg,box){
  box.innerHTML='<span class="ix-badge mt">'+_t('ix.badge.mt')+'</span>';
  var h=document.createElement('h3');h.innerHTML=_loc(cfg,'ti');box.appendChild(h);
  var cols=document.createElement('div');cols.className='ix-mt-cols';
  var lc=document.createElement('div');lc.className='ix-mt-col';
  var rc=document.createElement('div');rc.className='ix-mt-col';
  var matched=0,selL=null,selR=null;
  var pairs=_loc(cfg,'p');
  var rItems=pairs.map(function(p,i){return{h:p.r,i:i};});
  rItems.sort(function(){return Math.random()-.5;});
  pairs.forEach(function(p,i){
    var el=document.createElement('div');el.className='ix-mt-item';el.innerHTML=p.l;el.dataset.i=String(i);
    el.addEventListener('click',function(){
      if(el.classList.contains('ok'))return;
      if(selL)selL.classList.remove('sel');
      selL=el;el.classList.add('sel');_chkMT();
    });
    lc.appendChild(el);
  });
  rItems.forEach(function(item){
    var el=document.createElement('div');el.className='ix-mt-item';el.innerHTML=item.h;el.dataset.i=String(item.i);
    el.addEventListener('click',function(){
      if(el.classList.contains('ok'))return;
      if(selR)selR.classList.remove('sel');
      selR=el;el.classList.add('sel');_chkMT();
    });
    rc.appendChild(el);
  });
  function _chkMT(){
    if(!selL||!selR)return;
    var l=selL,r=selR;selL=null;selR=null;
    if(l.dataset.i===r.dataset.i){
      l.classList.remove('sel');l.classList.add('ok');
      r.classList.remove('sel');r.classList.add('ok');
      matched++;
      if(matched===pairs.length){
        var sc=document.createElement('div');sc.className='ix-mt-score';
        sc.textContent=_t('ix.mt.allMatched');box.appendChild(sc);
      }
    } else {
      l.classList.add('bad');r.classList.add('bad');
      setTimeout(function(){l.classList.remove('bad','sel');r.classList.remove('bad','sel');},500);
    }
  }
  cols.appendChild(lc);cols.appendChild(rc);box.appendChild(cols);
}

function _buildTF(cfg,box){
  box.innerHTML='<span class="ix-badge tf">'+_t('ix.badge.tf')+'</span>';
  var h=document.createElement('h3');h.innerHTML=_loc(cfg,'ti');box.appendChild(h);
  _loc(cfg,'items').forEach(function(item){
    var d=document.createElement('div');d.className='ix-tf-item';
    var st=document.createElement('div');st.className='ix-tf-stmt';st.innerHTML=item.s;
    var row=document.createElement('div');row.className='ix-tf-row';
    var ex=document.createElement('div');ex.className='ix-tf-exp';
    ex.innerHTML=(item.a?_t('ix.tf.trueCorrect'):_t('ix.tf.falseCorrect'))+item.ex;
    [_t('ix.tf.true'),_t('ix.tf.false')].forEach(function(label,idx){
      var btn=document.createElement('button');btn.className='ix-tf-btn';btn.textContent=label;
      var isT=(idx===0);
      btn.addEventListener('click',function(){
        if(d.querySelector('.ok,.no'))return;
        row.querySelectorAll('.ix-tf-btn').forEach(function(b){b.disabled=true;});
        var ok=(isT===item.a);
        btn.classList.add(ok?'ok':'no');
        if(!ok)row.querySelectorAll('.ix-tf-btn')[item.a?0:1].classList.add('ok');
        ex.classList.add('show');_mjax(ex);
      });
      row.appendChild(btn);
    });
    d.appendChild(st);d.appendChild(row);d.appendChild(ex);box.appendChild(d);
  });
}

function _buildSB(cfg,box){
  box.innerHTML='<span class="ix-badge sb">'+_t('ix.badge.sb')+'</span>';
  var h=document.createElement('h3');h.innerHTML=_loc(cfg,'ti');box.appendChild(h);
  var inps=[];
  _loc(cfg,'steps').forEach(function(step,i){
    var d=document.createElement('div');d.className='ix-sb-step';
    var n=document.createElement('div');n.className='ix-sb-n';n.textContent=(i+1)+'.';
    var body=document.createElement('div');body.className='ix-sb-body';body.innerHTML=step.l+' ';
    var inp=document.createElement('input');inp.className='ix-sb-inp';inp.type='text';
    inp.placeholder='?';inp.title=_t('ix.sb.hintPrefix')+step.h;
    inps.push({inp:inp,ans:step.a,hint:step.h});
    body.appendChild(inp);d.appendChild(n);d.appendChild(body);box.appendChild(d);
  });
  var go=document.createElement('button');go.className='ix-sb-go';go.textContent=_t('ix.sb.checkAnswers');
  var res=document.createElement('div');res.className='ix-sb-res';
  go.addEventListener('click',function(){
    var ok=0;
    inps.forEach(function(item){
      var u=_norm(item.inp.value),a=_norm(item.ans);
      if(u===a||u.replace(/[^a-z0-9]/g,'')===a.replace(/[^a-z0-9]/g,''))ok++;
    });
    res.className='ix-sb-res show '+(ok===inps.length?'ok':'no');
    if(ok===inps.length){
      res.innerHTML=_t('ix.sb.allCorrect',{n:inps.length});
    } else {
      var hints=inps.map(function(it,i){return '<small>'+_t('ix.sb.stepN',{n:i+1})+'<em>'+it.hint+'</em></small>';}).join(' &nbsp;|&nbsp; ');
      res.innerHTML=_t('ix.sb.someCorrect',{ok:ok,total:inps.length})+hints;
    }
    _mjax(res);
  });
  box.appendChild(go);box.appendChild(res);
}

function _buildSR(cfg,box){
  box.innerHTML='<span class="ix-badge sr">'+_t('ix.badge.sr')+'</span>';
  var h=document.createElement('h3');h.innerHTML=_loc(cfg,'ti');box.appendChild(h);
  var steps=document.createElement('div');steps.className='ix-sr-steps';box.appendChild(steps);
  var revealed=0;
  var stepsArr=_loc(cfg,'steps');
  var btn=document.createElement('button');btn.className='ix-sr-btn';btn.textContent=_t('ix.sr.showFirst');
  btn.addEventListener('click',function(){
    if(revealed<stepsArr.length){
      var i=revealed;
      var d=document.createElement('div');d.className='ix-sr-step';
      var n=document.createElement('div');n.className='ix-sr-n';n.textContent=String(i+1);
      var body=document.createElement('div');body.className='ix-sr-body';body.innerHTML=stepsArr[i];
      d.appendChild(n);d.appendChild(body);steps.appendChild(d);
      _mjax(d);
      revealed++;
      btn.textContent=revealed<stepsArr.length?_t('ix.sr.showNext',{n:revealed,m:stepsArr.length}):_t('ix.sr.restart');
    } else {
      steps.innerHTML='';revealed=0;btn.textContent=_t('ix.sr.showFirst');
    }
  });
  box.appendChild(btn);
}

/* ── Self-contained mini expression evaluator + plotter for the fn (Function
   Explorer) activity type. Deliberately independent of the site's main
   Plot/register/evalFn (those live inside a *different* top-level IIFE and
   aren't reachable from here) — keeps this new feature isolated so it can't
   regress the 58 existing canvas explorers. ── */
function _fnEval(expr,x,params){
  try{
    var e=String(expr);
    Object.keys(params||{}).forEach(function(k){
      e=e.replace(new RegExp('\\b'+k+'\\b','g'),'('+params[k]+')');
    });
    e=e.replace(/\^/g,'**')
      .replace(/sin\(/g,'Math.sin(').replace(/cos\(/g,'Math.cos(').replace(/tan\(/g,'Math.tan(')
      .replace(/sqrt\(/g,'Math.sqrt(').replace(/abs\(/g,'Math.abs(').replace(/ln\(/g,'Math.log(')
      .replace(/exp\(/g,'Math.exp(').replace(/\bpi\b/g,'Math.PI');
    /* eslint-disable no-new-func */
    return (new Function('x','return ('+e+')'))(x);
  }catch(err){return NaN;}
}
function _drawFnPlot(canvas,cfg,params){
  var dpr=window.devicePixelRatio||1, rect=canvas.getBoundingClientRect();
  if(rect.width<2||rect.height<2)return;
  canvas.width=Math.round(rect.width*dpr);canvas.height=Math.round(rect.height*dpr);
  var ctx=canvas.getContext('2d');ctx.setTransform(dpr,0,0,dpr,0,0);
  var w=rect.width,h=rect.height,pad={l:30,r:10,t:10,b:20};
  var xmin=cfg.xrange[0],xmax=cfg.xrange[1],ymin=cfg.yrange[0],ymax=cfg.yrange[1];
  function X(x){return pad.l+(x-xmin)/(xmax-xmin)*(w-pad.l-pad.r);}
  function Y(y){return h-pad.b-(y-ymin)/(ymax-ymin)*(h-pad.t-pad.b);}
  ctx.clearRect(0,0,w,h);
  ctx.strokeStyle='#D6DCE6';ctx.lineWidth=1;
  ctx.beginPath();ctx.moveTo(pad.l,Y(0));ctx.lineTo(w-pad.r,Y(0));ctx.stroke();
  ctx.beginPath();ctx.moveTo(X(0),pad.t);ctx.lineTo(X(0),h-pad.b);ctx.stroke();
  (cfg.fns||[]).forEach(function(fn){
    ctx.strokeStyle=fn.color||'#1E3A6E';ctx.lineWidth=2.4;ctx.beginPath();
    var started=false,steps=Math.max(60,Math.round(w-pad.l-pad.r));
    for(var i=0;i<=steps;i++){
      var xv=xmin+(i/steps)*(xmax-xmin);
      var yv=_fnEval(fn.expr,xv,params);
      if(!isFinite(yv)){started=false;continue;}
      var cx=X(xv),cy=Y(yv);
      if(cy<pad.t-60||cy>h-pad.b+60){started=false;continue;}
      if(!started){ctx.moveTo(cx,cy);started=true;}else{ctx.lineTo(cx,cy);}
    }
    ctx.stroke();
  });
}
function _buildFN(cfg,box){
  box.innerHTML='<span class="ix-badge fn">'+_t('ix.badge.fn')+'</span>';
  var h=document.createElement('h3');h.innerHTML=_loc(cfg,'ti');box.appendChild(h);
  var wrap=document.createElement('div');wrap.className='ix-fn-wrap';
  var canvas=document.createElement('canvas');canvas.className='ix-fn-canvas';
  wrap.appendChild(canvas);box.appendChild(wrap);
  var params={};
  if(cfg.params&&cfg.params.length){
    var controls=document.createElement('div');controls.className='ix-fn-controls';
    cfg.params.forEach(function(p){
      params[p.name]=p.default;
      var row=document.createElement('div');row.className='ix-fn-ctrl';
      var lab=document.createElement('label');lab.innerHTML=p.label+': <b class="ix-fn-val">'+p.default+'</b>';
      var slider=document.createElement('input');slider.type='range';
      slider.min=p.min;slider.max=p.max;slider.step=p.step||1;slider.value=p.default;
      slider.setAttribute('aria-label',String(p.label).replace(/<[^>]*>/g,'').trim()||'Value');
      slider.addEventListener('input',function(){
        params[p.name]=parseFloat(slider.value);
        lab.querySelector('.ix-fn-val').textContent=slider.value;
        redraw();
      });
      row.appendChild(lab);row.appendChild(slider);controls.appendChild(row);
    });
    box.appendChild(controls);
  }
  function redraw(){_drawFnPlot(canvas,cfg,params);}
  if(window.IntersectionObserver){
    var obs=new IntersectionObserver(function(entries){
      entries.forEach(function(e){if(e.isIntersecting)redraw();});
    },{threshold:0.05});
    obs.observe(canvas);
  } else {
    setTimeout(redraw,50);
  }
  var rt;window.addEventListener('resize',function(){clearTimeout(rt);rt=setTimeout(redraw,150);});
}

function _inject(chId){
  var cfg=D[chId];if(!cfg)return;
  var sec=document.getElementById(chId);if(!sec)return;
  var loc=window.i18n?window.i18n.getLocale():'en';
  var existing=sec.querySelector('.ix-section');
  if(existing){
    /* already built — rebuild only if the locale changed since (so a live
       toggle re-translates chrome + any reviewed-chapter Arabic content) */
    if(existing.getAttribute('data-ix-locale')===loc)return;
    existing.remove();
  }
  var list=Array.isArray(cfg)?cfg:[cfg]; /* D entries may be one config object (legacy) or an array of several */
  var wrap=document.createElement('div');wrap.className='ix-section';
  wrap.setAttribute('data-ix-locale',loc);
  var hd=document.createElement('div');hd.className='ix-head';
  hd.textContent='✦ '+_t('ix.head');
  wrap.appendChild(hd);
  list.forEach(function(c){
    var box=document.createElement('div');box.className='ix-box';
    if(c.t==='qc')_buildQC(c,box);
    else if(c.t==='mt')_buildMT(c,box);
    else if(c.t==='tf')_buildTF(c,box);
    else if(c.t==='sb')_buildSB(c,box);
    else if(c.t==='sr')_buildSR(c,box);
    else if(c.t==='fn')_buildFN(c,box);
    wrap.appendChild(box);
  });
  sec.appendChild(wrap);
  _mjax(wrap);setTimeout(function(){_mjax(wrap);},900);
}

/* Inject on page-load for every visible chapter that has data */
function _injectAll(){
  Object.keys(D).forEach(function(id){ _inject(id); });
}
/* Exposed so the i18n module (defined later, outside this IIFE) can trigger
   a re-translate of already-injected widgets when the user toggles locale. */
window.ClipSATIX={refreshAll:_injectAll};
if(document.readyState==='loading'){
  document.addEventListener('DOMContentLoaded',function(){setTimeout(_injectAll,800);});
}else{
  setTimeout(_injectAll,800);
}

/* Also inject via IntersectionObserver when chapters scroll into view */
if(window.IntersectionObserver){
  var _obs=new IntersectionObserver(function(entries){
    entries.forEach(function(e){if(e.isIntersecting)_inject(e.target.id);});
  },{rootMargin:'0px 0px 200px 0px',threshold:0.05});
  Object.keys(D).forEach(function(id){
    var el=document.getElementById(id);
    if(el)_obs.observe(el);
  });
}

/* Hook into goChapter */
var _ogc=window.goChapter;
window.goChapter=function(chId,view){
  if(_ogc)_ogc.apply(this,arguments);
  setTimeout(function(){_inject(chId);},600);
};

})();

/* ─────────────────────────────────────────────── */

/* ══════════════════════════════════════════════════════
   MATH VOCABULARY — global underline + definition popup
   ══════════════════════════════════════════════════════ */
