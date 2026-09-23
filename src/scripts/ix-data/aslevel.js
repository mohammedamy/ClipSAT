/* Interactive Practice data for /aslevel/ - one entry per chapter section id.
   Shipped as public/js/ix/aslevel.js and loaded only on that track's page by the
   engine in src/scripts/modules/19-interactive-activities-engine-v1.js
   (Plan 5 Phase 5.015, ADR 0033). Entry shapes (qc/mt/tf/sb/sr/fn) are
   documented there. */
(window.__ixData = window.__ixData || []).push(function (D) {
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
});
