/* Interactive Practice data for /calculus/ - one entry per chapter section id.
   Shipped as public/js/ix/calculus.js and loaded only on that track's page by the
   engine in src/scripts/modules/19-interactive-activities-engine-v1.js
   (Plan 5 Phase 5.015, ADR 0033). Entry shapes (qc/mt/tf/sb/sr/fn/num/ord/cat) are
   documented there. */
(window.__ixData = window.__ixData || []).push(function (D) {
D['ch-foundations']=[
  {t:'qc',ti:'Quick Check: Algebra Fundamentals',q:'Simplify \\(\\dfrac{x^2-9}{x-3}\\) for \\(x\\neq3\\)',o:['\\(x+3\\)','\\(x-3\\)','\\(x^2-3\\)','\\(3\\)'],a:0,ex:'Factor: \\(x^2-9=(x+3)(x-3)\\). Cancel \\((x-3)\\) → \\(x+3\\).'},
  {t:'mt',ti:'Matching: Functions and Domains',p:[{l:'\\(f(x)=\\sqrt{x}\\)',r:'[0, ∞)'},{l:'\\(f(x)=\\frac{1}{x}\\)',r:'x ≠ 0'},{l:'\\(f(x)=\\ln x\\)',r:'(0, ∞)'},{l:'\\(f(x)=x^2\\)',r:'(−∞, ∞)'}]},
  {t:'num',ti:'Numeric Entry: Parabola Vertex Minimum',q:'Find the minimum value of \\(f(x) = (x - 3)^2 + 7\\).',a:7,ex:'Since \\((x-3)^2 \\ge 0\\), the minimum value occurs at \\(x=3\\) and equals 7.'},
  {t:'ord',ti:'Order the Steps: Finding Domain of Rational Radical Function',prompt:'Arrange the steps to find the domain of \\(f(x) = \\frac{\\sqrt{x - 2}}{x - 5}\\):',items:[
    'Require radicand to be non-negative: \\(x - 2 \\ge 0 \\implies x \\ge 2\\).',
    'Identify denominator restriction: \\(x - 5 \\ne 0 \\implies x \\ne 5\\).',
    'Form the left interval component: \\([2, 5)\\).',
    'Form the right interval component excluding 5: \\((5, \\infty)\\).',
    'Combine into complete domain: \\([2, 5) \\cup (5, \\infty)\\).'
  ],ex:'Radicand >= 0, denominator != 0, form intervals, and unite domain.'},
  {t:'cat',ti:'Categorize: Function Symmetry',categories:['Even Function f(-x) = f(x)','Odd Function f(-x) = -f(x)'],items:[
    {s:'\\(f(x) = x^2\\)',cat:'Even Function f(-x) = f(x)'},
    {s:'\\(f(x) = \\cos x\\)',cat:'Even Function f(-x) = f(x)'},
    {s:'Symmetric across the y-axis',cat:'Even Function f(-x) = f(x)'},
    {s:'\\(f(x) = x^3\\)',cat:'Odd Function f(-x) = -f(x)'},
    {s:'\\(f(x) = \\sin x\\)',cat:'Odd Function f(-x) = -f(x)'},
    {s:'Symmetric about the origin (rotational)',cat:'Odd Function f(-x) = -f(x)'}
  ],ex:'Even functions satisfy f(-x) = f(x); odd functions satisfy f(-x) = -f(x).'}
];

D['ch-limits']=[
  {t:'mt',ti:'Matching: Limit Laws',p:[{l:'\\(\\lim[f+g]\\)',r:'L + M'},{l:'\\(\\lim[f\\cdot g]\\)',r:'L · M'},{l:'\\(\\lim\\,k\\)',r:'k'},{l:'\\(\\lim[f/g]\\)',r:'L/M (M≠0)'}]},
  {t:'num',ti:'Numeric Entry: Evaluating Indeterminate Limit',q:'Evaluate \\(\\displaystyle\\lim_{x\\to 3}\\frac{x^2 - 9}{x - 3}\\).',a:6,ex:'Factor numerator as \\((x-3)(x+3)\\). Cancel \\((x-3)\\) to get \\(\\lim_{x\\to 3}(x+3) = 6\\).'},
  {t:'ord',ti:'Order the Steps: Evaluating Conjugate Limit',prompt:'Arrange the steps to evaluate \\(\\lim_{x\\to 4}\\frac{\\sqrt{x} - 2}{x - 4}\\):',items:[
    'Direct substitution gives 0/0, confirming an indeterminate form.',
    'Multiply numerator and denominator by conjugate \\(\\sqrt{x} + 2\\).',
    'Expand numerator difference of squares to \\(x - 4\\).',
    'Cancel common factor \\(x - 4\\) leaving \\(\\frac{1}{\\sqrt{x} + 2}\\).',
    'Substitute \\(x = 4\\) to obtain limit value \\(\\frac{1}{4}\\).'
  ],ex:'Identify 0/0, multiply by conjugate, simplify numerator, cancel factor, substitute.'},
  {t:'cat',ti:'Categorize: Limit Evaluation Forms',categories:['Determinate Form','Indeterminate Form (Requires Work)'],items:[
    {s:'\\(\\frac{5}{2}\\)',cat:'Determinate Form'},
    {s:'\\(\\frac{0}{7} = 0\\)',cat:'Determinate Form'},
    {s:'\\(\\frac{4}{0}\\) (Vertical asymptote)',cat:'Determinate Form'},
    {s:'\\(\\frac{0}{0}\\)',cat:'Indeterminate Form (Requires Work)'},
    {s:'\\(\\frac{\\infty}{\\infty}\\)',cat:'Indeterminate Form (Requires Work)'},
    {s:'\\(0 \\times \\infty\\)',cat:'Indeterminate Form (Requires Work)'}
  ],ex:'0/0 and inf/inf are indeterminate forms requiring algebraic simplification or L\'Hôpital.'},
  {t:'sr',ti:'Worked Example: Evaluate \\(\\displaystyle\\lim_{x\\to4}\\dfrac{\\sqrt{x}-2}{x-4}\\)',steps:[
    'Direct substitution gives \\(\\dfrac{0}{0}\\) — an indeterminate form, so we need another approach.',
    'Multiply numerator and denominator by the conjugate \\(\\sqrt{x}+2\\): \\(\\dfrac{(\\sqrt{x}-2)(\\sqrt{x}+2)}{(x-4)(\\sqrt{x}+2)}\\).',
    'The numerator becomes \\(x-4\\) (difference of squares), which cancels with \\((x-4)\\) in the denominator, leaving \\(\\dfrac{1}{\\sqrt{x}+2}\\).',
    'Now substitute \\(x=4\\) directly: \\(\\dfrac{1}{\\sqrt{4}+2}=\\dfrac{1}{4}\\).'
  ]}
];

D['ch-derivatives']=[
  {t:'tf',ti:'True or False: Derivative Rules',items:[{s:'\\(\\frac{d}{dx}x^n=nx^{n-1}\\)',a:true,ex:'Power Rule — correct.'},{s:'\\(\\frac{d}{dx}\\sin x=-\\cos x\\)',a:false,ex:'\\(\\frac{d}{dx}\\sin x=+\\cos x\\).'},{s:'\\(\\frac{d}{dx}e^x=e^x\\)',a:true,ex:'Exponential is its own derivative.'},{s:'\\(\\frac{d}{dx}\\ln x=\\frac{1}{x^2}\\)',a:false,ex:'\\(\\frac{d}{dx}\\ln x=\\frac{1}{x}\\).'}]},
  {t:'num',ti:'Numeric Entry: Polynomial Derivative Value',q:'For \\(y = x^4 - 2x^2 + 5\\), evaluate \\(\\frac{dy}{dx}\\) at \\(x = 2\\).',a:24,ex:'\\(\\frac{dy}{dx} = 4x^3 - 4x\\). At \\(x = 2\\): \\(4(8) - 4(2) = 32 - 8 = 24\\).'},
  {t:'ord',ti:'Order the Steps: Differentiating via Product and Chain Rules',prompt:'Arrange the steps to differentiate \\(y = x^3\\sin(2x)\\):',items:[
    'Identify factors: \\(u = x^3\\) and \\(v = \\sin(2x)\\).',
    'Differentiate first factor: \\(u\' = 3x^2\\).',
    'Differentiate second factor via chain rule: \\(v\' = 2\\cos(2x)\\).',
    'Assemble product rule formula: \\(u\'v + uv\' = 3x^2\\sin(2x) + x^3(2\\cos(2x))\\).',
    'Factor out greatest common factor: \\(x^2(3\\sin(2x) + 2x\\cos(2x))\\).'
  ],ex:'Split factors, differentiate each, apply product rule, and factor.'},
  {t:'cat',ti:'Categorize: Signs of Basic Derivatives',categories:['Positive Sign','Negative Sign'],items:[
    {s:'\\(\\frac{d}{dx}(\\sin x) = \\cos x\\)',cat:'Positive Sign'},
    {s:'\\(\\frac{d}{dx}(e^x) = e^x\\)',cat:'Positive Sign'},
    {s:'\\(\\frac{d}{dx}(\\tan x) = \\sec^2 x\\)',cat:'Positive Sign'},
    {s:'\\(\\frac{d}{dx}(\\cos x) = -\\sin x\\)',cat:'Negative Sign'},
    {s:'\\(\\frac{d}{dx}(\\cot x) = -\\csc^2 x\\)',cat:'Negative Sign'},
    {s:'\\(\\frac{d}{dx}(\\csc x) = -\\csc x\\cot x\\)',cat:'Negative Sign'}
  ],ex:'All co-functions in trigonometry have negative derivatives.'},
  {t:'qc',ti:'Quick Check: Chain Rule',q:'Find \\(\\frac{d}{dx}(3x^2-1)^4\\):',o:['\\(24x(3x^2-1)^3\\)','\\(4(3x^2-1)^3\\)','\\(12x(3x^2-1)^3\\)','\\(6x(3x^2-1)^4\\)'],a:0,ex:'By the chain rule: \\(4(3x^2-1)^3\\cdot\\frac{d}{dx}(3x^2-1)=4(3x^2-1)^3(6x)=24x(3x^2-1)^3\\).'},
  {t:'sr',ti:'Worked Example: Differentiate \\(y=x^2\\sin x\\)',steps:[
    'Identify the two factors: \\(u=x^2\\) and \\(v=\\sin x\\).',
    'Differentiate each on its own: \\(u\'=2x\\) and \\(v\'=\\cos x\\).',
    'Apply the Product Rule: \\((uv)\'=u\'v+uv\'\\).',
    'Substitute: \\(y\'=2x\\sin x+x^2\\cos x\\).'
  ]}
];

D['ch-integrals']=[
  {t:'sb',ti:'Step Builder: Evaluate \\(\\displaystyle\\int_0^2 3x^2\\,dx\\)',steps:[{l:'Antiderivative of \\(3x^2\\):',a:'x^3',h:'Power rule: \\(3\\cdot\\frac{x^3}{3}=x^3\\)'},{l:'At upper limit \\(x=2\\): \\(2^3=\\)',a:'8',h:'\\(8\\)'},{l:'At lower limit \\(x=0\\): \\(0^3=\\)',a:'0',h:'\\(0\\)'},{l:'Answer \\(F(2)-F(0)=\\)',a:'8',h:'\\(8-0=8\\)'}]},
  {t:'num',ti:'Numeric Entry: Definite Integral Evaluation',q:'Evaluate \\(\\displaystyle\\int_0^3 4x\\,dx\\).',a:18,ex:'Antiderivative is \\(2x^2\\). Evaluating: \\(2(3^2) - 2(0^2) = 18 - 0 = 18\\).'},
  {t:'ord',ti:'Order the Steps: U-Substitution on \\(\\int 2x\\sqrt{x^2 + 4}\\,dx\\)',prompt:'Arrange the steps to integrate using substitution:',items:[
    'Set substitution for inner function: \\(u = x^2 + 4\\).',
    'Calculate differential: \\(du = 2x\\,dx\\).',
    'Rewrite in terms of u: \\(\\int u^{1/2}\\,du\\).',
    'Integrate via power rule: \\(\\frac{2}{3}u^{3/2} + C\\).',
    'Back-substitute u: \\(\\frac{2}{3}(x^2 + 4)^{3/2} + C\\).'
  ],ex:'Choose u, compute du, substitute, apply power rule, and back-substitute.'},
  {t:'cat',ti:'Categorize: Types of Integrals',categories:['Definite Integral','Indefinite Integral'],items:[
    {s:'Has upper and lower limits of integration \\(\\int_a^b\\)',cat:'Definite Integral'},
    {s:'Represents net signed area between curve and x-axis',cat:'Definite Integral'},
    {s:'Evaluates to a numerical value',cat:'Definite Integral'},
    {s:'Has no limits of integration \\(\\int f(x)\\,dx\\)',cat:'Indefinite Integral'},
    {s:'Represents an entire family of antiderivatives',cat:'Indefinite Integral'},
    {s:'Must include arbitrary constant \\(+ C\\)',cat:'Indefinite Integral'}
  ],ex:'Definite integrals have limits and yield values; indefinite integrals yield functions + C.'},
  {t:'sr',ti:'Worked Example: U-Substitution \\(\\displaystyle\\int 2x(x^2+1)^3\\,dx\\)',steps:[
    'Choose the substitution for the inner function: let \\(u = x^2 + 1\\).',
    'Compute the differential: \\(du = 2x\\,dx\\).',
    'Substitute into the integral: \\(\\int u^3\\,du\\).',
    'Integrate with the power rule: \\(\\dfrac{u^4}{4} + C\\).',
    'Back-substitute \\(u=x^2+1\\): \\(\\dfrac{(x^2+1)^4}{4} + C\\).'
  ]}
];

D['ch-ftc']=[
  {t:'num',ti:'Numeric Entry: Evaluating Definite Integral via FTC',q:'Evaluate \\(\\displaystyle\\int_1^3 (3x^2 - 2)\\,dx\\).',a:22,ex:'Antiderivative \\(F(x) = x^3 - 2x\\). \\(F(3) = 27 - 6 = 21\\), \\(F(1) = 1 - 2 = -1\\). \\(F(3) - F(1) = 21 - (-1) = 22\\).'},
  {t:'ord',ti:'Order the Steps: Differentiating Accumulation Function',prompt:'Arrange the steps to differentiate \\(g(x) = \\int_1^{x^2} \\sin t\\,dt\\):',items:[
    'Recognize form: \\(g(x) = \\int_1^{u(x)} f(t)\\,dt\\).',
    'Identify upper limit function: \\(u(x) = x^2\\).',
    'Compute derivative of upper limit: \\(u\'(x) = 2x\\).',
    'Evaluate integrand at upper limit: \\(f(u(x)) = \\sin(x^2)\\).',
    'Multiply by inner derivative: \\(g\'(x) = 2x\\sin(x^2)\\).'
  ],ex:'Identify u(x), compute u\'(x), evaluate f(u(x)), and multiply via chain rule.'},
  {t:'cat',ti:'Categorize: Parts of the Fundamental Theorem',categories:['FTC Part 1 (Derivative of Accumulation)','FTC Part 2 (Evaluation via Antiderivative)'],items:[
    {s:'\\(\\frac{d}{dx}\\int_a^x f(t)\\,dt = f(x)\\)',cat:'FTC Part 1 (Derivative of Accumulation)'},
    {s:'Demonstrates that differentiation and integration are inverse processes',cat:'FTC Part 1 (Derivative of Accumulation)'},
    {s:'Requires chain rule factor \\(u\'(x)\\) when limit is \\(u(x)\\)',cat:'FTC Part 1 (Derivative of Accumulation)'},
    {s:'\\(\\int_a^b f(x)\\,dx = F(b) - F(a)\\)',cat:'FTC Part 2 (Evaluation via Antiderivative)'},
    {s:'Calculates exact area without taking limit of Riemann sums',cat:'FTC Part 2 (Evaluation via Antiderivative)'},
    {s:'Net change theorem: integral of rate is total change',cat:'FTC Part 2 (Evaluation via Antiderivative)'}
  ],ex:'FTC 1 differentiates accumulation functions; FTC 2 evaluates definite integrals.'},
  {t:'sr',ti:'Worked Example: Evaluate \\(\\displaystyle\\int_1^3(2x+1)\\,dx\\)',steps:[
    'Find an antiderivative of \\(2x+1\\): \\(F(x)=x^2+x\\) (check: \\(F\'(x)=2x+1\\) ✓).',
    'Evaluate at the upper limit: \\(F(3)=3^2+3=12\\).',
    'Evaluate at the lower limit: \\(F(1)=1^2+1=2\\).',
    'By the Fundamental Theorem, the integral equals \\(F(3)-F(1)=12-2=10\\).'
  ]},
  {t:'qc',ti:'Quick Check: FTC',q:'Evaluate \\(\\displaystyle\\int_0^{\\pi}\\sin x\\,dx\\)',o:['0','1','2','−2'],a:2,ex:'\\([-\\cos x]_0^\\pi=-\\cos\\pi-(-\\cos0)=1+1=2\\).'}
];

D['ch-applications']=[
  {t:'num',ti:'Numeric Entry: Finding Critical Number',q:'Find the positive critical number of \\(f(x) = 2x^2 - 12x + 5\\).',a:3,ex:'\\(f\'(x) = 4x - 12 = 0 \\implies x = 3\\).'},
  {t:'ord',ti:'Order the Steps: Solving an Optimization Problem',prompt:'Arrange the steps to find dimensions of maximum area with fixed perimeter:',items:[
    'Draw a diagram and assign variable names for dimensions (x, y).',
    'Write the objective equation for area: \\(A = xy\\).',
    'Write constraint equation: \\(2x + y = P \\implies y = P - 2x\\).',
    'Substitute constraint into objective to express area in one variable \\(A(x)\\).',
    'Differentiate, set \\(A\'(x) = 0\\), and verify maximum with second derivative test.'
  ],ex:'Diagram, objective function, constraint equation, single-variable model, differentiate and verify.'},
  {t:'cat',ti:'Categorize: Classification of Extrema',categories:['Local Maximum','Local Minimum','Inflection Point'],items:[
    {s:'First derivative changes sign from positive to negative',cat:'Local Maximum'},
    {s:'Critical point where \\(f\'\'(c) < 0\\)',cat:'Local Maximum'},
    {s:'First derivative changes sign from negative to positive',cat:'Local Minimum'},
    {s:'Critical point where \\(f\'\'(c) > 0\\)',cat:'Local Minimum'},
    {s:'Second derivative changes sign (concavity switches)',cat:'Inflection Point'}
  ],ex:'First/second derivative tests identify local max and min; concavity change defines inflection point.'},
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
  {t:'num',ti:'Numeric Entry: Integration by Parts Definite Value',q:'Evaluate \\(\\displaystyle\\int_0^1 x e^x\\,dx\\).',a:1,ex:'Antiderivative is \\(x e^x - e^x = e^x(x - 1)\\). At \\(x = 1\\): \\(e(0) = 0\\). At \\(x = 0\\): \\(1(-1) = -1\\). Subtracting: \\(0 - (-1) = 1\\).'},
  {t:'ord',ti:'Order the Steps: Integration by Parts on \\(\\int x\\cos x\\,dx\\)',prompt:'Arrange the steps to integrate using parts:',items:[
    'Choose u and dv: let \\(u = x\\) and \\(dv = \\cos x\\,dx\\).',
    'Compute differentials: \\(du = dx\\) and \\(v = \\sin x\\).',
    'Apply formula: \\(uv - \\int v\\,du = x\\sin x - \\int \\sin x\\,dx\\).',
    'Evaluate remaining integral: \\(\\int \\sin x\\,dx = -\\cos x\\).',
    'Combine signs and add constant: \\(x\\sin x + \\cos x + C\\).'
  ],ex:'Choose u and dv, compute du and v, apply uv - int v du, evaluate and simplify.'},
  {t:'cat',ti:'Categorize: Selection of Integration Technique',categories:['U-Substitution','Integration by Parts','Partial Fractions'],items:[
    {s:'\\(\\int 2x(x^2 + 1)^4\\,dx\\)',cat:'U-Substitution'},
    {s:'\\(\\int \\frac{\\cos x}{\\sin x}\\,dx\\)',cat:'U-Substitution'},
    {s:'\\(\\int x e^x\\,dx\\)',cat:'Integration by Parts'},
    {s:'\\(\\int x^2 \\ln x\\,dx\\)',cat:'Integration by Parts'},
    {s:'\\(\\int \\frac{1}{x^2 - 4}\\,dx\\)',cat:'Partial Fractions'},
    {s:'\\(\\int \\frac{3x + 1}{(x - 1)(x + 2)}\\,dx\\)',cat:'Partial Fractions'}
  ],ex:'Use u-sub for derivative pairs, parts for mixed products, partial fractions for rational functions.'},
  {t:'sr',ti:'Worked Example: Integration by Parts — \\(\\displaystyle\\int xe^x\\,dx\\)',steps:[
    'Choose \\(u=x\\) (differentiates to something simpler) and \\(dv=e^x\\,dx\\).',
    'Then \\(du=dx\\) and \\(v=e^x\\).',
    'Apply the formula \\(\\int u\\,dv=uv-\\int v\\,du\\): \\(xe^x-\\int e^x\\,dx\\).',
    'Integrate the remaining piece: \\(xe^x-e^x+C\\).'
  ]},
  {t:'qc',ti:'Quick Check: Choosing a Substitution',q:'Which substitution works best for \\(\\displaystyle\\int 2x\\cos(x^2)\\,dx\\)?',o:['\\(u=x^2\\)','\\(u=\\cos x\\)','\\(u=2x\\)','\\(u=x\\)'],a:0,ex:'Let \\(u=x^2\\), then \\(du=2x\\,dx\\) — matches the integrand exactly.'}
];

D['ch-appint']=[
  {t:'num',ti:'Numeric Entry: Scaled Area Between Curves',q:'Find the area between \\(y = 2x\\) and \\(y = x^2\\). What is \\(3 \\times \\text{Area}\\)?',a:4,ex:'Curves intersect at \\(x = 0\\) and \\(x = 2\\). Area \\(= \\int_0^2 (2x - x^2)\\,dx = [x^2 - x^3/3]_0^2 = 4 - 8/3 = 4/3\\). Multiplied by 3 gives 4.'},
  {t:'ord',ti:'Order the Steps: Volume of Revolution via Disk Method',prompt:'Arrange the steps to find volume of solid formed by revolving y = f(x) about x-axis:',items:[
    'Sketch region and identify bounding curves.',
    'Identify axis of revolution (e.g. x-axis).',
    'Determine radius function: \\(R(x) = f(x)\\).',
    'Formulate circular cross-section area: \\(A(x) = \\pi [R(x)]^2\\).',
    'Integrate across bounds: \\(V = \\pi \\int_a^b [f(x)]^2\\,dx\\).'
  ],ex:'Sketch, find axis, write radius, formulate disk area, and integrate.'},
  {t:'cat',ti:'Categorize: Definite Integral Applications',categories:['Planar Area','Solid Volume of Revolution','Arc Length'],items:[
    {s:'\\(\\int_a^b [f(x) - g(x)]\\,dx\\)',cat:'Planar Area'},
    {s:'Enclosed space between top and bottom functions',cat:'Planar Area'},
    {s:'Disk method: \\(\\pi \\int_a^b [R(x)]^2\\,dx\\)',cat:'Solid Volume of Revolution'},
    {s:'Washer method: \\(\\pi \\int_a^b [R(x)^2 - r(x)^2]\\,dx\\)',cat:'Solid Volume of Revolution'},
    {s:'\\(\\int_a^b \\sqrt{1 + [f\'(x)]^2}\\,dx\\)',cat:'Arc Length'},
    {s:'Distance traversed along a curve in the plane',cat:'Arc Length'}
  ],ex:'Area integrates height; volume integrates pi*r²; arc length integrates line element sqrt(1 + (y\')²).'},
  {t:'sr',ti:'Worked Example: Area Between Two Curves',steps:[
    'Find where \\(y=x^2\\) and \\(y=x+2\\) intersect: \\(x^2=x+2\\Rightarrow x^2-x-2=0\\Rightarrow(x-2)(x+1)=0\\), so \\(x=-1\\) and \\(x=2\\).',
    'On \\([-1,2]\\), the line \\(y=x+2\\) lies above the parabola, so Area \\(=\\displaystyle\\int_{-1}^{2}\\big[(x+2)-x^2\\big]\\,dx\\).',
    'Antiderivative: \\(\\dfrac{x^2}{2}+2x-\\dfrac{x^3}{3}\\).',
    'Evaluate: at \\(x=2\\) this is \\(\\frac{10}{3}\\); at \\(x=-1\\) it is \\(-\\frac{7}{6}\\). Subtracting gives \\(\\frac{10}{3}+\\frac{7}{6}=\\frac{9}{2}\\).'
  ]},
  {t:'qc',ti:'Quick Check: Setting Up Area Integrals',q:'The area between \\(y=x\\) and \\(y=x^3\\) on \\([0,1]\\) is given by:',o:['\\(\\int_0^1(x-x^3)\\,dx\\)','\\(\\int_0^1(x^3-x)\\,dx\\)','\\(\\int_{-1}^1(x-x^3)\\,dx\\)','\\(\\int_0^1(x+x^3)\\,dx\\)'],a:0,ex:'On \\([0,1]\\), \\(x\\ge x^3\\), so the height of the region is \\(x-x^3\\).'}
];

D['ch-diffeq']=[
  {t:'num',ti:'Numeric Entry: Initial Value Problem',q:'If \\(\\frac{dy}{dx} = 3y\\) and \\(y(0) = 5\\), what is the initial value \\(y(0)\\)?',a:5,ex:'The initial value is given directly by the initial condition \\(y(0) = 5\\).'},
  {t:'ord',ti:'Order the Steps: Solving Exponential Growth dy/dt = ky',prompt:'Arrange the steps to solve the natural growth differential equation:',items:[
    'Separate variables: \\(\\frac{dy}{y} = k\\,dt\\).',
    'Integrate both sides: \\(\\int \\frac{1}{y}\\,dy = \\int k\\,dt\\).',
    'Add integration constant: \\(\\ln|y| = kt + C\\).',
    'Exponentiate both sides: \\(|y| = e^{kt + C} = e^C e^{kt}\\).',
    'Apply initial condition to set constant: \\(y(t) = y_0 e^{kt}\\).'
  ],ex:'Separate, integrate, add C, exponentiate, and apply initial condition.'},
  {t:'cat',ti:'Categorize: Differential Equations by Order',categories:['First-Order ODE','Second-Order ODE'],items:[
    {s:'\\(\\frac{dy}{dx} = 2xy\\)',cat:'First-Order ODE'},
    {s:'Slope fields represent gradient vectors',cat:'First-Order ODE'},
    {s:'\\(y\' + 3y = e^x\\)',cat:'First-Order ODE'},
    {s:'\\(y\'\' + 4y = 0\\)',cat:'Second-Order ODE'},
    {s:'Harmonic oscillator motion equation',cat:'Second-Order ODE'},
    {s:'Requires two initial conditions for a unique solution',cat:'Second-Order ODE'}
  ],ex:'First-order involves first derivatives; second-order involves second derivatives.'},
  {t:'sr',ti:'Worked Example: Solve \\(\\dfrac{dy}{dx}=2xy\\), \\(y(0)=3\\)',steps:[
    'Separate variables: \\(\\dfrac{dy}{y}=2x\\,dx\\).',
    'Integrate both sides: \\(\\ln|y|=x^2+C\\).',
    'Exponentiate: \\(y=Ae^{x^2}\\), where \\(A=e^C\\).',
    'Apply the initial condition \\(y(0)=3\\): \\(3=Ae^0=A\\), so \\(y=3e^{x^2}\\).'
  ]},
  {t:'qc',ti:'Quick Check: Separable Equations',q:'Which of these differential equations is separable?',o:['\\(\\dfrac{dy}{dx}=\\dfrac{x^2}{y}\\)','\\(\\dfrac{dy}{dx}=x+y\\)','\\(\\dfrac{dy}{dx}=x-y\\)','\\(\\dfrac{dy}{dx}=xy+x^2\\)'],a:0,ex:'\\(\\frac{x^2}{y}\\) splits into a pure function of \\(x\\) times a pure function of \\(y\\), so we can write \\(y\\,dy=x^2\\,dx\\).'}
];

D['ch-parametric']=[
  {t:'num',ti:'Numeric Entry: Parametric Tangent Slope',q:'For \\(x = 3t\\) and \\(y = 6t^2\\), find \\(\\frac{dy}{dx}\\) at \\(t = 2\\).',a:8,ex:'\\(\\frac{dx}{dt} = 3\\) and \\(\\frac{dy}{dt} = 12t\\). Then \\(\\frac{dy}{dx} = \\frac{12t}{3} = 4t\\). At \\(t = 2\\), the slope is \\(4(2) = 8\\).'},
  {t:'ord',ti:'Order the Steps: Evaluating Area Inside a Polar Curve',prompt:'Arrange the steps to find area enclosed by polar curve r = f(θ):',items:[
    'Identify angular bounds of integration \\(\\alpha\\) and \\(\\beta\\).',
    'Square the radius function: \\(r^2 = [f(\\theta)]^2\\).',
    'Multiply by one-half: \\(\\frac{1}{2}r^2\\).',
    'Set up polar area integral: \\(\\frac{1}{2}\\int_\\alpha^\\beta r^2\\,d\\theta\\).',
    'Evaluate the definite integral across limits.'
  ],ex:'Find angle bounds, square radius, multiply by 1/2, set up integral, and evaluate.'},
  {t:'cat',ti:'Categorize: Coordinate Systems',categories:['Cartesian Coordinates','Polar Coordinates','Parametric Form'],items:[
    {s:'Points identified as \\((x, y)\\)',cat:'Cartesian Coordinates'},
    {s:'Straightforward horizontal and vertical grids',cat:'Cartesian Coordinates'},
    {s:'Points defined by distance and angle \\((r, \\theta)\\)',cat:'Polar Coordinates'},
    {s:'Circular symmetry: \\(r = 2a\\cos\\theta\\)',cat:'Polar Coordinates'},
    {s:'Coordinates defined as functions of time: \\(x(t), y(t)\\)',cat:'Parametric Form'},
    {s:'Tracks position and motion of a moving particle',cat:'Parametric Form'}
  ],ex:'Cartesian uses (x,y); polar uses (r, theta); parametric links both to parameter t.'},
  {t:'sr',ti:'Worked Example: Parametric Slope for \\(x=t^2,\\ y=t^3-3t\\) at \\(t=2\\)',steps:[
    'Differentiate each with respect to \\(t\\): \\(\\dfrac{dx}{dt}=2t\\), \\(\\dfrac{dy}{dt}=3t^2-3\\).',
    'Use the parametric slope formula: \\(\\dfrac{dy}{dx}=\\dfrac{dy/dt}{dx/dt}=\\dfrac{3t^2-3}{2t}\\).',
    'Substitute \\(t=2\\): \\(\\dfrac{3(4)-3}{2(2)}=\\dfrac{9}{4}\\).'
  ]},
  {t:'qc',ti:'Quick Check: Parametric Slopes',q:'For \\(x=\\cos t,\\ y=\\sin t\\), what is \\(\\dfrac{dy}{dx}\\)?',o:['\\(-\\cot t\\)','\\(\\cot t\\)','\\(-\\tan t\\)','\\(\\tan t\\)'],a:0,ex:'\\(\\dfrac{dy}{dx}=\\dfrac{\\cos t}{-\\sin t}=-\\cot t\\).'}
];

D['ch-series']=[
  {t:'num',ti:'Numeric Entry: Geometric Series Sum',q:'Find the sum of the convergent geometric series \\(\\displaystyle\\sum_{n=0}^\\infty 5(0.5)^n\\).',a:10,ex:'First term \\(a = 5\\), ratio \\(r = 0.5\\). Sum \\(S = \\frac{a}{1 - r} = \\frac{5}{1 - 0.5} = 10\\).'},
  {t:'ord',ti:'Order the Steps: Constructing a Taylor Polynomial at x = a',prompt:'Arrange the steps to find the Taylor polynomial of degree n:',items:[
    'Compute successive derivatives: \\(f(x), f\'(x), f\'\'(x), \\dots, f^{(n)}(x)\\).',
    'Evaluate all derivatives at the expansion center: \\(f(a), f\'(a), \\dots, f^{(n)}(a)\\).',
    'Divide each derivative by its factorial: \\(\\frac{f^{(k)}(a)}{k!}\\).',
    'Multiply by power term \\((x - a)^k\\).',
    'Sum all terms: \\(P_n(x) = \\sum_{k=0}^n \\frac{f^{(k)}(a)}{k!}(x - a)^k\\).'
  ],ex:'Compute derivatives, evaluate at center, divide by k!, attach (x-a)^k, sum terms.'},
  {t:'cat',ti:'Categorize: Familiar Maclaurin Expansions',categories:['Alternating Sign Terms','All Positive Terms (for x > 0)'],items:[
    {s:'\\(\\sin x = x - \\frac{x^3}{3!} + \\frac{x^5}{5!} - \\dots\\)',cat:'Alternating Sign Terms'},
    {s:'\\(\\cos x = 1 - \\frac{x^2}{2!} + \\frac{x^4}{4!} - \\dots\\)',cat:'Alternating Sign Terms'},
    {s:'\\(\\ln(1 + x) = x - \\frac{x^2}{2} + \\frac{x^3}{3} - \\dots\\)',cat:'Alternating Sign Terms'},
    {s:'\\(e^x = 1 + x + \\frac{x^2}{2!} + \\frac{x^3}{3!} + \\dots\\)',cat:'All Positive Terms (for x > 0)'},
    {s:'\\(\\frac{1}{1 - x} = 1 + x + x^2 + x^3 + \\dots\\)',cat:'All Positive Terms (for x > 0)'}
  ],ex:'Sine, cosine, and log(1+x) alternate; exponential and 1/(1-x) have all positive signs.'},
  {t:'sr',ti:'Worked Example: Sum of \\(\\displaystyle\\sum_{n=0}^{\\infty}\\left(\\dfrac13\\right)^n\\)',steps:[
    'This is a geometric series with first term \\(a=1\\) and ratio \\(r=\\dfrac13\\).',
    'Since \\(|r|<1\\), the series converges. Use \\(S=\\dfrac{a}{1-r}\\).',
    'Substitute: \\(S=\\dfrac{1}{1-\\frac13}=\\dfrac{1}{\\frac23}=\\dfrac32\\).'
  ]},
  {t:'qc',ti:'Quick Check: The Harmonic Series',q:'Does the harmonic series \\(\\displaystyle\\sum\\frac1n\\) converge or diverge?',o:['Converges to 1','Converges to 2','Diverges','Converges to 0'],a:2,ex:'The harmonic series is a classic example of a divergent series — even though its terms shrink to 0, the sum still grows without bound.'}
];

D['ch-convergence']=[
  {t:'num',ti:'Numeric Entry: Smallest Convergent p-Value',q:'For a p-series \\(\\sum \\frac{1}{n^p}\\), what is the smallest integer value of p for which the series converges?',a:2,ex:'A p-series converges if and only if \\(p > 1\\). The smallest integer satisfying \\(p > 1\\) is 2.'},
  {t:'ord',ti:'Order the Steps: Performing the Ratio Test',prompt:'Arrange the steps to determine convergence via the Ratio Test:',items:[
    'Identify the nth term \\(a_n\\) and construct the next term \\(a_{n+1}\\).',
    'Form the absolute ratio \\(\\left|\\frac{a_{n+1}}{a_n}\\right|\\).',
    'Simplify powers and factorials through cancellation.',
    'Evaluate the limit \\(L = \\lim_{n\\to\\infty} \\left|\\frac{a_{n+1}}{a_n}\\right|\\).',
    'Conclude: converges if \\(L < 1\\), diverges if \\(L > 1\\), test fails if \\(L = 1\\).'
  ],ex:'Construct ratio, simplify algebra, take limit as n->infinity, and conclude.'},
  {t:'cat',ti:'Categorize: Reliability of Convergence Tests',categories:['Decisive on p-Series','Inconclusive when Limit Equals 1'],items:[
    {s:'p-Series test (checks exponent \\(p > 1\\))',cat:'Decisive on p-Series'},
    {s:'Integral test comparing \\(\\int_1^\\infty \\frac{1}{x^p}\\,dx\\)',cat:'Decisive on p-Series'},
    {s:'Limit comparison test with harmonic series',cat:'Decisive on p-Series'},
    {s:'Ratio test on rational terms \\(a_n = \\frac{1}{n^p}\\)',cat:'Inconclusive when Limit Equals 1'},
    {s:'Root test on rational terms \\(a_n = \\frac{1}{n^p}\\)',cat:'Inconclusive when Limit Equals 1'}
  ],ex:'Ratio and root tests always yield L = 1 on polynomial/p-series and are inconclusive.'},
  {t:'sr',ti:'Worked Example: Ratio Test on \\(\\displaystyle\\sum_{n=1}^{\\infty}\\dfrac{n}{2^n}\\)',steps:[
    'Let \\(a_n=\\dfrac{n}{2^n}\\). Compute \\(\\left|\\dfrac{a_{n+1}}{a_n}\\right|=\\dfrac{n+1}{2^{n+1}}\\cdot\\dfrac{2^n}{n}=\\dfrac{n+1}{2n}\\).',
    'Take the limit as \\(n\\to\\infty\\): \\(\\displaystyle\\lim_{n\\to\\infty}\\dfrac{n+1}{2n}=\\dfrac12\\).',
    'Since the limit \\(\\dfrac12<1\\), the Ratio Test confirms the series converges.'
  ]},
  {t:'qc',ti:'Quick Check: Ratio Test',q:'The Ratio Test is inconclusive when the limit equals:',o:['0','1','∞','−1'],a:1,ex:'When \\(L=1\\), the Ratio Test gives no information — another test is needed.'}
];

D['ch-vectors']=[
  {t:'num',ti:'Numeric Entry: 3D Vector Magnitude',q:'Find the magnitude of the vector \\(\\vec v = \\langle 3, 4, 12\\rangle\\).',a:13,ex:'\\(|\\vec v| = \\sqrt{3^2 + 4^2 + 12^2} = \\sqrt{9 + 16 + 144} = \\sqrt{169} = 13\\).'},
  {t:'ord',ti:'Order the Steps: Computing Angle Between Two Vectors',prompt:'Arrange the steps to find the angle between vectors u and v:',items:[
    'Calculate the dot product: \\(\\vec u \\cdot \\vec v = u_1v_1 + u_2v_2 + u_3v_3\\).',
    'Calculate magnitude \\(|\\vec u| = \\sqrt{u_1^2 + u_2^2 + u_3^2}\\).',
    'Calculate magnitude \\(|\\vec v| = \\sqrt{v_1^2 + v_2^2 + v_3^2}\\).',
    'Divide dot product by product of magnitudes: \\(\\cos\\theta = \\frac{\\vec u \\cdot \\vec v}{|\\vec u||\\vec v|}\\).',
    'Take the inverse cosine: \\(\\theta = \\cos^{-1}\\left(\\frac{\\vec u \\cdot \\vec v}{|\\vec u||\\vec v|}\\right)\\).'
  ],ex:'Dot product, magnitudes, divide to get cos(theta), and take arccosine.'},
  {t:'cat',ti:'Categorize: Vector Multiplication Operations',categories:['Dot Product (u · v)','Cross Product (u × v)'],items:[
    {s:'Result is a scalar quantity (real number)',cat:'Dot Product (u · v)'},
    {s:'Zero when non-zero vectors are perpendicular',cat:'Dot Product (u · v)'},
    {s:'Commutative: \\(\\vec u \\cdot \\vec v = \\vec v \\cdot \\vec u\\)',cat:'Dot Product (u · v)'},
    {s:'Result is a 3D vector orthogonal to both inputs',cat:'Cross Product (u × v)'},
    {s:'Zero when non-zero vectors are parallel',cat:'Cross Product (u × v)'},
    {s:'Anticommutative: \\(\\vec u \\times \\vec v = -(\\vec v \\times \\vec u)\\)',cat:'Cross Product (u × v)'}
  ],ex:'Dot product produces a scalar; cross product produces a perpendicular 3D vector.'},
  {t:'sr',ti:'Worked Example: Angle Between \\(\\vec u=\\langle3,4\\rangle\\) and \\(\\vec v=\\langle4,-3\\rangle\\)',steps:[
    'Compute the dot product: \\(\\vec u\\cdot\\vec v=3(4)+4(-3)=12-12=0\\).',
    'Compute the magnitudes: \\(|\\vec u|=\\sqrt{9+16}=5\\), \\(|\\vec v|=\\sqrt{16+9}=5\\).',
    'Use \\(\\cos\\theta=\\dfrac{\\vec u\\cdot\\vec v}{|\\vec u||\\vec v|}=\\dfrac{0}{25}=0\\).',
    'So \\(\\theta=\\cos^{-1}(0)=90°\\) — the vectors are perpendicular.'
  ]},
  {t:'qc',ti:'Quick Check: Dot Products',q:'If \\(\\vec u\\cdot\\vec v=0\\) and neither vector is zero, the vectors are:',o:['Parallel','Perpendicular','Equal','Opposite'],a:1,ex:'A zero dot product means the vectors are orthogonal (perpendicular).'}
];

D['ch-partial']=[
  {t:'num',ti:'Numeric Entry: Evaluating Partial Derivative',q:'For \\(f(x, y) = 3x^2y + 4y^2\\), find the value of \\(f_x(2, 3)\\).',a:36,ex:'Treat \\(y\\) as constant: \\(f_x = 6xy\\). At \\((2, 3)\\): \\(6(2)(3) = 36\\).'},
  {t:'ord',ti:'Order the Steps: Classifying Critical Points in Two Variables',prompt:'Arrange the steps to find and classify local extrema of f(x, y):',items:[
    'Set partial derivatives to zero: \\(f_x = 0\\) and \\(f_y = 0\\).',
    'Solve simultaneously to find critical points \\((a, b)\\).',
    'Compute second partial derivatives: \\(f_{xx}, f_{yy}, f_{xy}\\).',
    'Compute discriminant: \\(D = f_{xx}f_{yy} - (f_{xy})^2\\).',
    'Classify: D < 0 is saddle; D > 0 with f_xx > 0 is local min; D > 0 with f_xx < 0 is local max.'
  ],ex:'Find critical points, compute second partials, evaluate discriminant D, and classify.'},
  {t:'cat',ti:'Categorize: Second Derivative Test Outcomes in 2D',categories:['Local Minimum','Local Maximum','Saddle Point'],items:[
    {s:'\\(D > 0\\) and \\(f_{xx} > 0\\)',cat:'Local Minimum'},
    {s:'Surface opens upward in every vertical slice',cat:'Local Minimum'},
    {s:'\\(D > 0\\) and \\(f_{xx} < 0\\)',cat:'Local Maximum'},
    {s:'Surface opens downward in every vertical slice',cat:'Local Maximum'},
    {s:'\\(D < 0\\)',cat:'Saddle Point'},
    {s:'Surface opens upward in one direction and downward in another',cat:'Saddle Point'}
  ],ex:'D > 0 yields true extrema based on sign of f_xx; D < 0 yields a saddle point.'},
  {t:'sr',ti:'Worked Example: Partial Derivatives of \\(f(x,y)=x^2y+3xy^2\\)',steps:[
    'To find \\(f_x\\), treat \\(y\\) as a constant and differentiate with respect to \\(x\\): \\(f_x=2xy+3y^2\\).',
    'To find \\(f_y\\), treat \\(x\\) as a constant and differentiate with respect to \\(y\\): \\(f_y=x^2+6xy\\).',
    'The gradient is \\(\\nabla f=\\langle 2xy+3y^2,\\ x^2+6xy\\rangle\\).'
  ]},
  {t:'qc',ti:'Quick Check: Partial Derivatives',q:'For \\(f(x,y)=x^3y^2\\), what is \\(\\partial f/\\partial y\\)?',o:['\\(2x^3y\\)','\\(3x^2y^2\\)','\\(x^3y\\)','\\(2x^2y\\)'],a:0,ex:'Treat \\(x\\) as constant: \\(\\frac{\\partial}{\\partial y}(x^3y^2)=x^3\\cdot2y=2x^3y\\).'}
];

D['ch-multiint']=[
  {t:'num',ti:'Numeric Entry: Double Integral over Rectangle',q:'Evaluate \\(\\displaystyle\\int_0^2\\!\\int_0^3 1\\,dx\\,dy\\).',a:6,ex:'The integral of 1 over a region equals the area of the region: \\(2 \\times 3 = 6\\).'},
  {t:'ord',ti:'Order the Steps: Changing to Polar Coordinates in Double Integrals',prompt:'Arrange the steps to convert a Cartesian double integral to polar:',items:[
    'Determine the radial limits: \\(r_1 \\le r \\le r_2\\).',
    'Determine the angular limits: \\(\\alpha \\le \\theta \\le \\beta\\).',
    'Substitute coordinates: \\(x = r\\cos\\theta\\) and \\(y = r\\sin\\theta\\).',
    'Replace area element: \\(dA = r\\,dr\\,d\\theta\\) (insert Jacobian r).',
    'Evaluate the iterated polar integral.'
  ],ex:'Find r bounds, find theta bounds, substitute x and y, insert r dr dtheta, integrate.'},
  {t:'cat',ti:'Categorize: Coordinate Systems for Multiple Integrals',categories:['Cartesian Volume Element dV','Cylindrical Volume Element dV','Spherical Volume Element dV'],items:[
    {s:'\\(dx\\,dy\\,dz\\)',cat:'Cartesian Volume Element dV'},
    {s:'Rectangular box partition',cat:'Cartesian Volume Element dV'},
    {s:'\\(r\\,dr\\,d\\theta\\,dz\\)',cat:'Cylindrical Volume Element dV'},
    {s:'Ideal for pipes, cylinders, and axial rotational symmetry',cat:'Cylindrical Volume Element dV'},
    {s:'\\(\\rho^2\\sin\\phi\\,d\\rho\\,d\\phi\\,d\\theta\\)',cat:'Spherical Volume Element dV'},
    {s:'Ideal for spheres, cones, and central field models',cat:'Spherical Volume Element dV'}
  ],ex:'Cartesian uses dx dy dz; cylindrical adds r; spherical adds rho² sin(phi).'},
  {t:'sr',ti:'Worked Example: Evaluate \\(\\displaystyle\\int_0^1\\!\\int_0^2 xy\\,dy\\,dx\\)',steps:[
    'Integrate with respect to \\(y\\) first, treating \\(x\\) as constant: \\(\\displaystyle\\int_0^2 xy\\,dy=x\\cdot\\dfrac{y^2}{2}\\Big|_0^2=2x\\).',
    'Now integrate the result with respect to \\(x\\): \\(\\displaystyle\\int_0^1 2x\\,dx=x^2\\Big|_0^1=1\\).',
    'The value of the double integral is \\(1\\).'
  ]},
  {t:'qc',ti:'Quick Check: Order of Integration',q:'For a double integral over a rectangle, in what order can you integrate?',o:['Only \\(dx\\) then \\(dy\\)','Only \\(dy\\) then \\(dx\\)',"Either order (Fubini's Theorem)",'Neither — must use polar coordinates'],a:2,ex:"Fubini's Theorem guarantees the order doesn't matter for continuous functions over a rectangle."}
];

D['ch-vectorcalc']=[
  {t:'num',ti:'Numeric Entry: Divergence Calculation',q:'If \\(\\vec F = \\langle 3x, 4y, 5z\\rangle\\), find \\(\\text{div}(\\vec F)\\).',a:12,ex:'\\(\\text{div}(\\vec F) = \\frac{\\partial}{\\partial x}(3x) + \\frac{\\partial}{\\partial y}(4y) + \\frac{\\partial}{\\partial z}(5z) = 3 + 4 + 5 = 12\\).'},
  {t:'ord',ti:'Order the Steps: Applying Green\'s Theorem',prompt:'Arrange the steps to convert a line integral around curve C to a double integral:',items:[
    'Confirm that curve C is a closed, positively oriented (counterclockwise) loop.',
    'Identify vector field components: \\(P(x, y)\\) and \\(Q(x, y)\\).',
    'Compute partial derivatives: \\(\\frac{\\partial Q}{\\partial x}\\) and \\(\\frac{\\partial P}{\\partial y}\\).',
    'Formulate double integral integrand: \\(Q_x - P_y\\).',
    'Integrate over the enclosed 2D region R: \\(\\iint_R (Q_x - P_y)\\,dA\\).'
  ],ex:'Verify orientation, identify P and Q, compute Q_x and P_y, set up double integral, evaluate.'},
  {t:'cat',ti:'Categorize: Vector Calculus Differential Operators',categories:['Gradient (∇f)','Divergence (∇ · F)','Curl (∇ × F)'],items:[
    {s:'Operates on scalar field and outputs vector field',cat:'Gradient (∇f)'},
    {s:'Points in direction of steepest ascent of surface',cat:'Gradient (∇f)'},
    {s:'Operates on vector field and outputs scalar field',cat:'Divergence (∇ · F)'},
    {s:'Measures net expansion or outward flux per unit volume',cat:'Divergence (∇ · F)'},
    {s:'Operates on 3D vector field and outputs 3D vector field',cat:'Curl (∇ × F)'},
    {s:'Measures rotational tendency and circulation density',cat:'Curl (∇ × F)'}
  ],ex:'Gradient maps scalar to vector; divergence maps vector to scalar; curl maps vector to vector.'},
  {t:'sr',ti:'Worked Example: Divergence of \\(\\vec F=\\langle x^2y,\\ yz,\\ xz^2\\rangle\\)',steps:[
    'Divergence formula: \\(\\text{div}\\,\\vec F=\\dfrac{\\partial P}{\\partial x}+\\dfrac{\\partial Q}{\\partial y}+\\dfrac{\\partial R}{\\partial z}\\), where \\(\\vec F=\\langle P,Q,R\\rangle\\).',
    'Compute each term: \\(\\dfrac{\\partial}{\\partial x}(x^2y)=2xy\\), \\(\\dfrac{\\partial}{\\partial y}(yz)=z\\), \\(\\dfrac{\\partial}{\\partial z}(xz^2)=2xz\\).',
    'Sum them: \\(\\text{div}\\,\\vec F=2xy+z+2xz\\).'
  ]},
  {t:'qc',ti:'Quick Check: Divergence',q:'The divergence of a vector field is a:',o:['Vector','Scalar','Matrix','Unit vector'],a:1,ex:'Divergence measures a scalar rate of "outflow" at each point — it is a scalar field, not a vector.'}
];
});
