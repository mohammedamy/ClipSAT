/* Interactive Practice data for /a2level/ - one entry per chapter section id.
   Shipped as public/js/ix/a2level.js and loaded only on that track's page by the
   engine in src/scripts/modules/19-interactive-activities-engine-v1.js
   (Plan 5 Phase 5.015, ADR 0033). Entry shapes (qc/mt/tf/sb/sr/fn) are
   documented there. */
(window.__ixData = window.__ixData || []).push(function (D) {
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
});
