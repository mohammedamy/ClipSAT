/* Interactive Practice data for /ibsl/ - one entry per chapter section id.
   Shipped as public/js/ix/ibsl.js and loaded only on that track's page by the
   engine in src/scripts/modules/19-interactive-activities-engine-v1.js
   (Plan 5 Phase 5.015, ADR 0033). Entry shapes (qc/mt/tf/sb/sr/fn) are
   documented there. */
(window.__ixData = window.__ixData || []).push(function (D) {
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
});
