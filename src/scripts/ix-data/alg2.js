/* Interactive Practice data for /alg2/ - one entry per chapter section id.
   Shipped as public/js/ix/alg2.js and loaded only on that track's page by the
   engine in src/scripts/modules/19-interactive-activities-engine-v1.js
   (Plan 5 Phase 5.015, ADR 0033). Entry shapes (qc/mt/tf/sb/sr/fn/num/ord/cat) are
   documented there. */
(window.__ixData = window.__ixData || []).push(function (D) {
D['a2-functions']=[
  {t:'qc',ti:'Quick Check: Function Notation',ti_ar:'فحص سريع: ترميز الدوال',q:'If \\(f(x)=3x^2-2\\), find \\(f(-1)\\)',q_ar:'إذا كانت \\(f(x)=3x^2-2\\)، فأوجد قيمة \\(f(-1)\\)',o:['1','5','−5','−1'],o_ar:['1','5','−5','−1'],a:0,ex:'\\(3(1)-2=1\\).',ex_ar:'\\(3(-1)^2-2=3(1)-2=1\\).'},
  {t:'num',ti:'Numeric Entry: Evaluating Function Composition',ti_ar:'إدخال رقمي: إيجاد قيمة تركيب الدوال',q:'If \\(f(x) = 2x + 3\\) and \\(g(x) = x^2 - 1\\), find \\((f \\circ g)(4)\\).',q_ar:'إذا كانت \\(f(x) = 2x + 3\\) وكانت \\(g(x) = x^2 - 1\\)، فأوجد \\((f \\circ g)(4)\\).',a:33,ex:'\\(g(4) = 4^2 - 1 = 15\\). Then \\(f(15) = 2(15) + 3 = 30 + 3 = 33\\).',ex_ar:'\\(g(4) = 4^2 - 1 = 15\\). ومن ثم \\(f(15) = 2(15) + 3 = 30 + 3 = 33\\).'},
  {t:'cat',ti:'Categorize: Function Symmetry',ti_ar:'تصنيف: تماثل الدوال',categories:['Even (y-axis)','Odd (origin)','Neither'],categories_ar:['زوجية (حول محور y)','فردية (حول نقطة الأصل)','ليست زوجية ولا فردية'],items:[{s:'\\(f(x) = x^4 - 2x^2 + 1\\)',s_ar:'\\(f(x) = x^4 - 2x^2 + 1\\)',cat:'Even (y-axis)'},{s:'\\(f(x) = x^3 - 5x\\)',s_ar:'\\(f(x) = x^3 - 5x\\)',cat:'Odd (origin)'},{s:'\\(f(x) = x^2 + 3x\\)',s_ar:'\\(f(x) = x^2 + 3x\\)',cat:'Neither'},{s:'\\(f(x) = \\cos x\\)',s_ar:'\\(f(x) = \\cos x\\)',cat:'Even (y-axis)'},{s:'\\(f(x) = \\sin x\\)',s_ar:'\\(f(x) = \\sin x\\)',cat:'Odd (origin)'}],ex:'Even functions satisfy f(-x) = f(x); odd functions satisfy f(-x) = -f(x).',ex_ar:'الدوال الزوجية تحقق \\(f(-x) = f(x)\\)؛ بينما تحقق الدوال الفردية \\(f(-x) = -f(x)\\).'},
  {t:'fn',ti:'Explorer: Horizontal Shift \\((x-h)^2\\)',ti_ar:'مستكشف: الإزاحة الأفقية \\((x-h)^2\\)',fns:[{expr:'(x-h)^2',color:'#1E3A6E',label:'(x-h)^2'}],xrange:[-6,6],yrange:[-2,10],params:[{name:'h',label:'Shift h',min:-3,max:3,step:1,default:0}]},
  {t:'sr',ti:'Worked Example: Find the Domain of \\(f(x)=\\sqrt{x-3}\\)',ti_ar:'مثال محلول: إيجاد مجال \\(f(x)=\\sqrt{x-3}\\)',steps:[
    'The expression under a square root must be \\(\\geq0\\): \\(x-3\\geq0\\).',
    'Solve the inequality: \\(x\\geq3\\).',
    'Domain: \\([3,\\infty)\\).'
  ],steps_ar:[
    'يجب أن يكون المقدار تحت الجذر التربيعي أكبر من أو يساوي الصفر: \\(x-3\\geq0\\).',
    'حل المتباينة: \\(x\\geq3\\).',
    'المجال: \\([3,\\infty)\\).'
  ]}
];
D['a2-quadratics']=[
  {t:'mt',ti:'Matching: Powers of i',ti_ar:'مطابقة: قوى العدد التخيلي i',p:[{l:'\\(i^1\\)',l_ar:'\\(i^1\\)',r:'i',r_ar:'i'},{l:'\\(i^2\\)',l_ar:'\\(i^2\\)',r:'−1',r_ar:'−1'},{l:'\\(i^3\\)',l_ar:'\\(i^3\\)',r:'−i',r_ar:'−i'},{l:'\\(i^4\\)',l_ar:'\\(i^4\\)',r:'1',r_ar:'1'}]},
  {t:'num',ti:'Numeric Entry: Evaluating Powers of i',ti_ar:'إدخال رقمي: إيجاد قيمة قوى العدد التخيلي i',q:'Evaluate \\(i^{54}\\). Enter 1, -1, or 0.',q_ar:'أوجد قيمة \\(i^{54}\\). أدخل 1 أو -1 أو 0.',a:-1,ex:'\\(54 \\div 4 = 13\\) with remainder 2. Since \\(i^2 = -1\\), \\(i^{54} = (i^4)^{13} \\cdot i^2 = 1^{13}(-1) = -1\\).',ex_ar:'\\(54 \\div 4 = 13\\) والباقي 2. وبما أن \\(i^2 = -1\\)، فإن \\(i^{54} = (i^4)^{13} \\cdot i^2 = 1^{13}(-1) = -1\\).'},
  {t:'cat',ti:'Categorize: Discriminant & Root Nature',ti_ar:'تصنيف: المميز وطبيعة الجذور',categories:['2 Distinct Real Roots','1 Repeated Real Root','2 Complex Conjugate Roots'],categories_ar:['جذران حقيقيان متمايزان','جذر حقيقي مكرر (واحد)','جذران مركبان مترافقان'],items:[{s:'\\(\\Delta = 25\\)',s_ar:'\\(\\Delta = 25\\)',cat:'2 Distinct Real Roots'},{s:'\\(\\Delta = -12\\)',s_ar:'\\(\\Delta = -12\\)',cat:'2 Complex Conjugate Roots'},{s:'\\(\\Delta = 0\\)',s_ar:'\\(\\Delta = 0\\)',cat:'1 Repeated Real Root'},{s:'\\(x^2 - 6x + 9 = 0\\)',s_ar:'\\(x^2 - 6x + 9 = 0\\)',cat:'1 Repeated Real Root'},{s:'\\(x^2 + 4x + 10 = 0\\)',s_ar:'\\(x^2 + 4x + 10 = 0\\)',cat:'2 Complex Conjugate Roots'},{s:'\\(2x^2 + 3x - 5 = 0\\)',s_ar:'\\(2x^2 + 3x - 5 = 0\\)',cat:'2 Distinct Real Roots'}],ex:'Delta > 0 gives two real roots, Delta = 0 gives one repeated root, and Delta < 0 gives two complex conjugate roots.',ex_ar:'\\(\\Delta > 0\\) يعطي جذرين حقيقيين متمايزين، و \\(\\Delta = 0\\) يعطي جذراً حقيقياً مكرراً، بينما \\(\\Delta < 0\\) يعطي جذرين مركبين مترافقين.'},
  {t:'fn',ti:'Explorer: Parabola \\(x^2-4x+c\\) — Watch the Roots',ti_ar:'مستكشف: القطع المكافئ \\(x^2-4x+c\\) — راقب الجذور',fns:[{expr:'x^2-4*x+c',color:'#1E3A6E',label:'x^2-4x+c'}],xrange:[-2,6],yrange:[-6,8],params:[{name:'c',label:'Constant c',min:-2,max:6,step:1,default:0}]},
  {t:'sr',ti:'Worked Example: Solve \\(x^2+2x+5=0\\)',ti_ar:'مثال محلول: حل المعادلة \\(x^2+2x+5=0\\)',steps:[
    'Identify \\(a=1,\\ b=2,\\ c=5\\). Compute the discriminant: \\(b^2-4ac=4-20=-16\\).',
    'Since the discriminant is negative, the roots are complex: \\(x=\\dfrac{-b\\pm\\sqrt{-16}}{2a}\\).',
    '\\(\\sqrt{-16}=4i\\), so \\(x=\\dfrac{-2\\pm4i}{2}=-1\\pm2i\\).'
  ],steps_ar:[
    'حدد المعاملات: \\(a=1,\\ b=2,\\ c=5\\). احسب المميز: \\(b^2-4ac=4-20=-16\\).',
    'بما أن المميز سالب، فإن الجذور مركبة: \\(x=\\dfrac{-b\\pm\\sqrt{-16}}{2a}\\).',
    '\\(\\sqrt{-16}=4i\\)، إذن \\(x=\\dfrac{-2\\pm4i}{2}=-1\\pm2i\\).'
  ]}
];
D['a2-polynomials']=[
  {t:'tf',ti:'True or False: Polynomials',ti_ar:'صح أم خطأ: كثيرات الحدود',items:[{s:'A degree-3 polynomial always has exactly 3 real roots',s_ar:'كثيرة حدود من الدرجة الثالثة لها دائماً 3 جذور حقيقية بالضبط',a:false,ex:'It can have 1 real + 2 complex roots.',ex_ar:'قد يكون لها جذر حقيقي واحد وجذران مركبان مترافقان.'},{s:'Remainder Theorem: \\(f(c)\\) = remainder when \\(f(x)\\div(x-c)\\)',s_ar:'نظرية الباقي: \\(f(c)\\) = باقي قسمة \\(f(x)\\div(x-c)\\)',a:true,ex:'Correct.',ex_ar:'صحيح.'},{s:'If \\(f(a)=0\\), then \\((x-a)\\) is a factor',s_ar:'إذا كان \\(f(a)=0\\)، فإن \\((x-a)\\) عامل لكثيرة الحدود',a:true,ex:'Factor Theorem.',ex_ar:'نظرية العوامل.'},{s:'Leading term controls end behavior',s_ar:'الحد الرئيس يحدد السلوك الطرفي لكثيرة الحدود',a:true,ex:'Correct.',ex_ar:'صحيح.'}]},
  {t:'num',ti:'Numeric Entry: Remainder Theorem',ti_ar:'إدخال رقمي: نظرية الباقي',q:'Find the remainder when \\(P(x) = 2x^3 - 5x^2 + 3x - 7\\) is divided by \\((x - 2)\\).',q_ar:'أوجد باقي قسمة \\(P(x) = 2x^3 - 5x^2 + 3x - 7\\) على \\((x - 2)\\).',a:-5,ex:'By the Remainder Theorem, the remainder is \\(P(2) = 2(8) - 5(4) + 3(2) - 7 = 16 - 20 + 6 - 7 = -5\\).',ex_ar:'حسب نظرية الباقي، الباقي يساوي \\(P(2) = 2(8) - 5(4) + 3(2) - 7 = 16 - 20 + 6 - 7 = -5\\).'},
  {t:'ord',ti:'Order the Steps: Factoring via Rational Root Theorem',ti_ar:'رتّب الخطوات: التحليل باستخدام نظرية الصفر النسبي',prompt:'Arrange the algebraic steps to factor a cubic polynomial:',prompt_ar:'رتب الخطوات الجبرية لتحليل كثيرة حدود تكعيبية:',items:[
    'List all candidate rational roots \\(\\pm p/q\\) from constant and leading terms.',
    'Test candidate values to identify a zero \\(x = c\\) such that \\(P(c) = 0\\).',
    'Divide \\(P(x)\\) by the factor \\((x - c)\\) using synthetic or long division.',
    'Factor the resulting quotient quadratic to obtain all remaining linear factors.'
  ],items_ar:[
    'كتابة قائمة بجميع الأصفار النسبية المحتملة \\(\\pm p/q\\) من الحد الثابت والمعامل الرئيس.',
    'اختبار القيم المحتملة لإيجاد صفر \\(x = c\\) بحيث يكون \\(P(c) = 0\\).',
    'قسمة \\(P(x)\\) على العامل \\((x - c)\\) باستخدام القسمة التركيبية أو المطولة.',
    'تحليل كثيرة الحدود الناتجة (التربيعية) لإيجاد باقي العوامل الخطية.'
  ],ex:'Find candidate roots, test for a zero, divide by (x - c), and factor the depressed quadratic.',ex_ar:'أوجد الجذور المحتملة، ثم اختبرها لإيجاد صفر، واقسم على (x - c)، ثم حلل المعادلة التربيعية الناتجة.'},
  {t:'sr',ti:'Worked Example: Remainder Theorem for \\(f(x)=x^3-4x^2+x+6\\) at \\(x=2\\)',ti_ar:'مثال محلول: نظرية الباقي للدالة \\(f(x)=x^3-4x^2+x+6\\) عند \\(x=2\\)',steps:[
    'By the Remainder Theorem, \\(f(2)\\) equals the remainder of \\(f(x)\\div(x-2)\\) — fastest way is to just substitute \\(x=2\\).',
    'Substitute: \\(f(2)=(2)^3-4(2)^2+(2)+6\\).',
    'Compute: \\(8-16+2+6=0\\).',
    'Since \\(f(2)=0\\), \\(x=2\\) is a root and \\((x-2)\\) is a factor.'
  ],steps_ar:[
    'وفقاً لنظرية الباقي، فإن \\(f(2)\\) يساوي باقي قسمة \\(f(x)\\div(x-2)\\) — وأسرع طريقة هي التعويض بـ \\(x=2\\).',
    'التعويض: \\(f(2)=(2)^3-4(2)^2+(2)+6\\).',
    'الحساب: \\(8-16+2+6=0\\).',
    'بما أن \\(f(2)=0\\)، فإن \\(x=2\\) جذر، و \\((x-2)\\) عامل لكثيرة الحدود.'
  ]}
];
D['a2-rational']=[
  {t:'num',ti:'Numeric Entry: Horizontal Asymptote of Rational Function',ti_ar:'إدخال رقمي: خط التقارب الأفقي لدالة نسبية',q:'Find the horizontal asymptote \\(y = k\\) of \\(f(x) = \\dfrac{4x^2 - 1}{2x^2 + 5x - 3}\\). Enter \\(k\\).',q_ar:'أوجد خط التقارب الأفقي \\(y = k\\) للدالة \\(f(x) = \\dfrac{4x^2 - 1}{2x^2 + 5x - 3}\\). أدخل قيمة \\(k\\).',a:2,ex:'Degrees of numerator and denominator are equal (degree 2). Ratio of leading coefficients: \\(y = 4/2 = 2\\).',ex_ar:'درجة البسط تساوي درجة المقام (الدرجة 2). خط التقارب الأفقي هو نسبة المعاملين الرئيسين: \\(y = 4/2 = 2\\).'},
  {t:'cat',ti:'Categorize: Discontinuity Types',ti_ar:'تصنيف: أنواع نقاط عدم الاتصال',categories:['Vertical Asymptote','Removable Hole'],categories_ar:['خط تقارب رأسي','نقطة انفصال (فجوة قابلة للإزالة)'],items:[
    {s:'\\(x = 2\\) in \\(f(x) = \\frac{x-2}{(x-2)(x+3)}\\)',s_ar:'\\(x = 2\\) في \\(f(x) = \\frac{x-2}{(x-2)(x+3)}\\)',cat:'Removable Hole'},
    {s:'\\(x = -3\\) in \\(f(x) = \\frac{x-2}{(x-2)(x+3)}\\)',s_ar:'\\(x = -3\\) في \\(f(x) = \\frac{x-2}{(x-2)(x+3)}\\)',cat:'Vertical Asymptote'},
    {s:'\\(x = 1\\) in \\(f(x) = \\frac{x+1}{x-1}\\)',s_ar:'\\(x = 1\\) في \\(f(x) = \\frac{x+1}{x-1}\\)',cat:'Vertical Asymptote'},
    {s:'\\(x = -4\\) in \\(f(x) = \\frac{x^2-16}{x+4}\\)',s_ar:'\\(x = -4\\) في \\(f(x) = \\frac{x^2-16}{x+4}\\)',cat:'Removable Hole'}
  ],ex:'Factors that cancel completely from the denominator produce holes; uncanceled roots yield vertical asymptotes.',ex_ar:'العوامل التي تُختصر كلياً من المقام تُنشئ فجوات؛ بينما أصفار المقام المتبقية تُنشئ خطوط تقارب رأسية.'},
  {t:'sr',ti:'Worked Example: Simplify \\(\\dfrac{x^2-9}{x^2-x-12}\\)',ti_ar:'مثال محلول: تبسيط \\(\\dfrac{x^2-9}{x^2-x-12}\\)',steps:[
    'Factor the numerator: \\(x^2-9=(x-3)(x+3)\\).',
    'Factor the denominator: \\(x^2-x-12=(x-4)(x+3)\\).',
    'Cancel the common factor \\((x+3)\\): \\(\\dfrac{x-3}{x-4}\\).'
  ],steps_ar:[
    'تحليل البسط: \\(x^2-9=(x-3)(x+3)\\).',
    'تحليل المقام: \\(x^2-x-12=(x-4)(x+3)\\).',
    'اختصار العامل المشترك \\((x+3)\\): \\(\\dfrac{x-3}{x-4}\\).'
  ]},
  {t:'qc',ti:'Quick Check: Simplifying Rational Expressions',ti_ar:'فحص سريع: تبسيط المقادير النسبية',q:'Simplify \\(\\dfrac{2x}{x^2}\\)',q_ar:'بسط المقدار \\(\\dfrac{2x}{x^2}\\)',o:['\\(\\dfrac2x\\)','\\(2x\\)','\\(\\dfrac x2\\)','\\(2\\)'],o_ar:['\\(\\dfrac2x\\)','\\(2x\\)','\\(\\dfrac x2\\)','\\(2\\)'],a:0,ex:'Cancel one factor of \\(x\\): \\(\\dfrac{2x}{x^2}=\\dfrac2x\\).',ex_ar:'اختصر \\(x\\) من البسط والمقام: \\(\\dfrac{2x}{x^2}=\\dfrac2x\\).'}
];
D['a2-exponential']=[
  {t:'sb',ti:'Step Builder: Solve \\(2^{x+1}=32\\)',ti_ar:'بناء الخطوات: حل \\(2^{x+1}=32\\)',steps:[{l:'Write 32 as power of 2: \\(32=2^?\\)',l_ar:'اكتب 32 كقوة للعدد 2: \\(32=2^?\\)',a:'5',h:'\\(2^5=32\\)',h_ar:'\\(2^5=32\\)'},{l:'Set exponents equal: \\(x+1=\\)',l_ar:'ساوِ الأسس: \\(x+1=\\)',a:'5',h:'Same base → equal exponents',h_ar:'تساوي الأساسات يعني تساوي الأسس'},{l:'Solve: \\(x=\\)',l_ar:'حل المعادلة: \\(x=\\)',a:'4',h:'\\(x+1=5\\Rightarrow x=4\\)',h_ar:'\\(x+1=5\\Rightarrow x=4\\)'}]},
  {t:'num',ti:'Numeric Entry: Evaluating Logarithmic Expressions',ti_ar:'إدخال رقمي: إيجاد قيمة مقادير لوغاريتمية',q:'Evaluate \\(\\log_5(125) + \\log_2(32)\\).',q_ar:'احسب قيمة \\(\\log_5(125) + \\log_2(32)\\).',a:8,ex:'\\(\\log_5(125) = 3\\) (since \\(5^3=125\\)) and \\(\\log_2(32) = 5\\) (since \\(2^5=32\\)). Sum: \\(3 + 5 = 8\\).',ex_ar:'\\(\\log_5(125) = 3\\) (لأن \\(5^3=125\\)) و \\(\\log_2(32) = 5\\) (لأن \\(2^5=32\\)). المجموع: \\(3 + 5 = 8\\).'},
  {t:'ord',ti:'Order the Steps: Solving Exponential Equations with Unequal Bases',ti_ar:'رتّب الخطوات: حل معادلات أسية بأساسات مختلفة',prompt:'Arrange the steps to solve \\(3^{x+1} = 7\\):',prompt_ar:'رتب خطوات حل المعادلة \\(3^{x+1} = 7\\):',items:[
    'Take the natural logarithm of both sides: \\(\\ln(3^{x+1}) = \\ln(7)\\).',
    'Apply the power rule of logarithms: \\((x + 1)\\ln(3) = \\ln(7)\\).',
    'Divide both sides by \\(\\ln(3)\\): \\(x + 1 = \\frac{\\ln 7}{\\ln 3}\\).',
    'Subtract 1 to isolate x: \\(x = \\frac{\\ln 7}{\\ln 3} - 1\\).'
  ],items_ar:[
    'أخذ اللوغاريتم الطبيعي لكلا الطرفين: \\(\\ln(3^{x+1}) = \\ln(7)\\).',
    'تطبيق خاصية القوة للوغاريتمات: \\((x + 1)\\ln(3) = \\ln(7)\\).',
    'قسمة الطرفين على \\(\\ln(3)\\): \\(x + 1 = \\frac{\\ln 7}{\\ln 3}\\).',
    'طرح 1 لعزل x: \\(x = \\frac{\\ln 7}{\\ln 3} - 1\\).'
  ],ex:'Take logs of both sides, bring power down as coefficient, divide by ln(3), and subtract 1.',ex_ar:'خذ اللوغاريتم للطرفين، نزل الأس كمعامل، اقسم على ln(3)، واطرح 1.'},
  {t:'fn',ti:'Explorer: Exponential Base \\(a^x\\)',ti_ar:'مستكشف: الدالة الأسية \\(a^x\\)',fns:[{expr:'a^x',color:'#1E3A6E',label:'a^x'}],xrange:[-3,3],yrange:[0,10],params:[{name:'a',label:'Base a',min:0.5,max:3,step:0.5,default:2}]},
  {t:'sr',ti:'Worked Example: Solve \\(\\log(x)+\\log(x-3)=1\\)',ti_ar:'مثال محلول: حل \\(\\log(x)+\\log(x-3)=1\\)',steps:[
    'Combine logs using the product rule: \\(\\log[x(x-3)]=1\\).',
    'Rewrite in exponential form: \\(x(x-3)=10^1=10\\).',
    'Expand and solve: \\(x^2-3x-10=0\\Rightarrow(x-5)(x+2)=0\\), so \\(x=5\\) or \\(x=-2\\).',
    'Reject \\(x=-2\\) (makes the original logs undefined). Solution: \\(x=5\\).'
  ],steps_ar:[
    'دمج اللوغاريتمات باستخدام قاعدة الضرب: \\(\\log[x(x-3)]=1\\).',
    'التحويل إلى الصورة الأسية: \\(x(x-3)=10^1=10\\).',
    'فك الأقواس والحل: \\(x^2-3x-10=0\\Rightarrow(x-5)(x+2)=0\\)، إذن \\(x=5\\) أو \\(x=-2\\).',
    'رفض \\(x=-2\\) (لأنه يجعل ما بداخل اللوغاريتم سالباً). الحل هو: \\(x=5\\).'
  ]}
];
D['a2-radical']=[
  {t:'num',ti:'Numeric Entry: Rational Exponent Evaluation',ti_ar:'إدخال رقمي: إيجاد قيمة أس نسبي',q:'Evaluate \\(27^{4/3}\\).',q_ar:'احسب قيمة \\(27^{4/3}\\).',a:81,ex:'\\(27^{4/3} = (\\sqrt[3]{27})^4 = 3^4 = 81\\).',ex_ar:'\\(27^{4/3} = (\\sqrt[3]{27})^4 = 3^4 = 81\\).'},
  {t:'cat',ti:'Categorize: Radical Function Inverses',ti_ar:'تصنيف: معكوسات الدوال الجذرية',categories:['Square Root Function','Cube Root Function'],categories_ar:['دالة الجذر التربيعي','دالة الجذر التكعيبي'],items:[
    {s:'Domain restricted to \\(x \\ge h\\)',s_ar:'المجال مقيد بـ \\(x \\ge h\\)',cat:'Square Root Function'},
    {s:'Domain is all real numbers \\((-\\infty, \\infty)\\)',s_ar:'المجال هو جميع الأعداد الحقيقية \\((-\\infty, \\infty)\\)',cat:'Cube Root Function'},
    {s:'Inverse of \\(y = x^3\\)',s_ar:'معكوس الدالة \\(y = x^3\\)',cat:'Cube Root Function'},
    {s:'Inverse of \\(y = x^2\\) for \\(x \\ge 0\\)',s_ar:'معكوس الدالة \\(y = x^2\\) عند \\(x \\ge 0\\)',cat:'Square Root Function'}
  ],ex:'Even roots require non-negative arguments; odd roots are defined for all real numbers.',ex_ar:'الجذور الزوجية تشترط مقادير غير سالبة؛ بينما الجذور الفردية معرفة لجميع الأعداد الحقيقية.'},
  {t:'fn',ti:'Explorer: Shifted Square Root \\(\\sqrt{x-h}\\)',ti_ar:'مستكشف: دالة الجذر التربيعي المزاحة \\(\\sqrt{x-h}\\)',fns:[{expr:'sqrt(x-h)',color:'#1E3A6E',label:'sqrt(x-h)'}],xrange:[-4,6],yrange:[0,4],params:[{name:'h',label:'Shift h',min:-3,max:3,step:1,default:0}]},
  {t:'sr',ti:'Worked Example: Solve \\(\\sqrt{2x+3}=5\\)',ti_ar:'مثال محلول: حل \\(\\sqrt{2x+3}=5\\)',steps:[
    'Square both sides to eliminate the radical: \\(2x+3=25\\).',
    'Solve: \\(2x=22\\Rightarrow x=11\\).',
    'Check: \\(\\sqrt{2(11)+3}=\\sqrt{25}=5\\) ✓.'
  ],steps_ar:[
    'تربيع الطرفين للتخلص من الجذر: \\(2x+3=25\\).',
    'حل المعادلة: \\(2x=22\\Rightarrow x=11\\).',
    'التحقق: \\(\\sqrt{2(11)+3}=\\sqrt{25}=5\\) ✓.'
  ]},
  {t:'qc',ti:'Quick Check: Radical Equations',ti_ar:'فحص سريع: المعادلات الجذرية',q:'Solve \\(\\sqrt{x}=-3\\)',q_ar:'حل المعادلة \\(\\sqrt{x}=-3\\)',o:['No real solution','\\(x=9\\)','\\(x=-9\\)','\\(x=3\\)'],o_ar:['لا يوجد حل حقيقي','\\(x=9\\)','\\(x=-9\\)','\\(x=3\\)'],a:0,ex:'The principal square root is always \\(\\geq0\\), so it can never equal \\(-3\\).',ex_ar:'الجذر التربيعي الرئيس دائماً \\(\\geq0\\)، لذا لا يمكن أبداً أن يساوي \\(-3\\).'}
];
D['a2-sequences']=[
  {t:'num',ti:'Numeric Entry: Sum of Infinite Geometric Series',ti_ar:'إدخال رقمي: مجموع متسلسلة هندسية لانهائية',q:'Find the sum of the infinite geometric series with first term \\(a_1 = 12\\) and common ratio \\(r = \\frac{1}{3}\\).',q_ar:'أوجد مجموع المتسلسلة الهندسية اللانهائية التي حدها الأول \\(a_1 = 12\\) وأساسها \\(r = \\frac{1}{3}\\).',a:18,ex:'\\(S = \\frac{a_1}{1 - r} = \\frac{12}{1 - 1/3} = \\frac{12}{2/3} = 12 \\times \\frac{3}{2} = 18\\).',ex_ar:'\\(S = \\frac{a_1}{1 - r} = \\frac{12}{1 - 1/3} = \\frac{12}{2/3} = 12 \\times \\frac{3}{2} = 18\\).'},
  {t:'cat',ti:'Categorize: Sequence Type Identification',ti_ar:'تصنيف: تحديد نوع المتتابعة',categories:['Arithmetic','Geometric','Neither'],categories_ar:['حسابية','هندسية','ليست حسابية ولا هندسية'],items:[
    {s:'\\(4, 7, 10, 13, \\dots\\)',s_ar:'\\(4, 7, 10, 13, \\dots\\)',cat:'Arithmetic'},
    {s:'\\(3, 6, 12, 24, \\dots\\)',s_ar:'\\(3, 6, 12, 24, \\dots\\)',cat:'Geometric'},
    {s:'\\(1, 4, 9, 16, \\dots\\)',s_ar:'\\(1, 4, 9, 16, \\dots\\)',cat:'Neither'},
    {s:'\\(20, 15, 10, 5, \\dots\\)',s_ar:'\\(20, 15, 10, 5, \\dots\\)',cat:'Arithmetic'},
    {s:'\\(81, -27, 9, -3, \\dots\\)',s_ar:'\\(81, -27, 9, -3, \\dots\\)',cat:'Geometric'}
  ],ex:'Constant difference = arithmetic; constant ratio = geometric; squares/cubes = neither.',ex_ar:'فرق ثابت = حسابية؛ نسبة ثابتة = هندسية؛ مربعات/مكعبات = ليست أيّاً منهما.'},
  {t:'fn',ti:'Explorer: Arithmetic vs Geometric Growth',ti_ar:'مستكشف: النمو الحسابي مقابل النمو الهندسي',fns:[{expr:'2+3*x',color:'#1E3A6E',label:'arithmetic'},{expr:'2*r^x',color:'#B8801F',label:'geometric'}],xrange:[0,5],yrange:[0,30],params:[{name:'r',label:'Ratio r',min:1,max:2,step:0.1,default:1.5}]},
  {t:'sr',ti:'Worked Example: Sum of the First 20 Terms of \\(3,7,11,15,\\ldots\\)',ti_ar:'مثال محلول: مجموع أول 20 حداً من \\(3,7,11,15,\\ldots\\)',steps:[
    'Identify \\(a_1=3\\), \\(d=4\\), \\(n=20\\).',
    'Find the 20th term: \\(a_{20}=3+(20-1)(4)=3+76=79\\).',
    'Use the sum formula \\(S_n=\\dfrac{n}{2}(a_1+a_n)\\): \\(S_{20}=\\dfrac{20}{2}(3+79)=10(82)=820\\).'
  ],steps_ar:[
    'حدد المعطيات: \\(a_1=3\\)، \\(d=4\\)، \\(n=20\\).',
    'أوجد الحد العشرين: \\(a_{20}=3+(20-1)(4)=3+76=79\\).',
    'استخدم قانون المجموع \\(S_n=\\dfrac{n}{2}(a_1+a_n)\\): \\(S_{20}=\\dfrac{20}{2}(3+79)=10(82)=820\\).'
  ]},
  {t:'qc',ti:'Quick Check: Arithmetic vs Geometric',ti_ar:'فحص سريع: حسابية أم هندسية',q:'Is the sequence \\(5,-10,20,-40,\\ldots\\) arithmetic or geometric?',q_ar:'هل المتتابعة \\(5,-10,20,-40,\\ldots\\) حسابية أم هندسية؟',o:['Geometric, \\(r=-2\\)','Arithmetic, \\(d=-15\\)','Geometric, \\(r=2\\)','Arithmetic, \\(d=-5\\)'],o_ar:['هندسية، \\(r=-2\\)','حسابية، \\(d=-15\\)','هندسية، \\(r=2\\)','حسابية، \\(d=-5\\)'],a:0,ex:'Each term is multiplied by \\(-2\\): \\(5\\times(-2)=-10\\), \\(-10\\times(-2)=20\\) — a geometric sequence.',ex_ar:'كل حد مضروب في \\(-2\\): \\(5\\times(-2)=-10\\)، و \\(-10\\times(-2)=20\\) — إذن هي متتابعة هندسية.'}
];
D['a2-conics']=[
  {t:'num',ti:'Numeric Entry: Radius of Circle from General Equation',ti_ar:'إدخال رقمي: نصف قطر دائرة من معادلتها العامة',q:'Find the radius of the circle \\(x^2 + y^2 - 6x + 8y = 0\\).',q_ar:'أوجد نصف قطر الدائرة \\(x^2 + y^2 - 6x + 8y = 0\\).',a:5,ex:'Complete the squares: \\((x - 3)^2 + (y + 4)^2 = 9 + 16 = 25\\). Radius \\(r = \\sqrt{25} = 5\\).',ex_ar:'بإكمال المربع: \\((x - 3)^2 + (y + 4)^2 = 9 + 16 = 25\\). إذن نصف القطر \\(r = \\sqrt{25} = 5\\).'},
  {t:'cat',ti:'Categorize: Conic Classification from Equation',ti_ar:'تصنيف: تمييز القطوع المخروطية من معادلاتها',categories:['Circle','Parabola','Ellipse','Hyperbola'],categories_ar:['دائرة','قطع مكافئ','قطع ناقص','قطع زائد'],items:[
    {s:'\\(x^2 + y^2 = 16\\)',s_ar:'\\(x^2 + y^2 = 16\\)',cat:'Circle'},
    {s:'\\(4x^2 + 9y^2 = 36\\)',s_ar:'\\(4x^2 + 9y^2 = 36\\)',cat:'Ellipse'},
    {s:'\\(x^2 - 4y^2 = 16\\)',s_ar:'\\(x^2 - 4y^2 = 16\\)',cat:'Hyperbola'},
    {s:'\\(y = 2x^2 - 4x + 1\\)',s_ar:'\\(y = 2x^2 - 4x + 1\\)',cat:'Parabola'},
    {s:'\\(9x^2 - 16y^2 = 144\\)',s_ar:'\\(9x^2 - 16y^2 = 144\\)',cat:'Hyperbola'},
    {s:'\\(3x^2 + 3y^2 - 6x = 12\\)',s_ar:'\\(3x^2 + 3y^2 - 6x = 12\\)',cat:'Circle'}
  ],ex:'Coefficients equal with same sign = circle; different positive coefficients = ellipse; opposite signs = hyperbola; single squared variable = parabola.',ex_ar:'المعاملات متساوية بنفس الإشارة = دائرة؛ معاملات موجبة مختلفة = قطع ناقص؛ إشارات مختلفة = قطع زائد؛ متغير واحد فقط تربيع = قطع مكافئ.'},
  {t:'sr',ti:'Worked Example: Center and Radius of \\(x^2+y^2-6x+4y-3=0\\)',ti_ar:'مثال محلول: مركز ونصف قطر \\(x^2+y^2-6x+4y-3=0\\)',steps:[
    'Group x-terms and y-terms: \\((x^2-6x)+(y^2+4y)=3\\).',
    'Complete the square for each: \\((x^2-6x+9)+(y^2+4y+4)=3+9+4\\).',
    'Write as squares: \\((x-3)^2+(y+2)^2=16\\).',
    'Center \\((3,-2)\\), radius \\(\\sqrt{16}=4\\).'
  ],steps_ar:[
    'تجميع حدود x وحدود y: \\((x^2-6x)+(y^2+4y)=3\\).',
    'إكمال المربع لكل منهما: \\((x^2-6x+9)+(y^2+4y+4)=3+9+4\\).',
    'الكتابة على صورة مربعات كاملة: \\((x-3)^2+(y+2)^2=16\\).',
    'المركز \\((3,-2)\\)، ونصف القطر \\(\\sqrt{16}=4\\).'
  ]},
  {t:'qc',ti:'Quick Check: Identifying Conics',ti_ar:'فحص سريع: تحديد نوع القطع المخروطي',q:'The equation \\(\\dfrac{x^2}{9}+\\dfrac{y^2}{4}=1\\) represents:',q_ar:'المعادلة \\(\\dfrac{x^2}{9}+\\dfrac{y^2}{4}=1\\) تمثل:',o:['An ellipse','A circle','A hyperbola','A parabola'],o_ar:['قطعاً ناقصاً','دائرة','قطعاً زائداً','قطعاً مكافئاً'],a:0,ex:'Two positive squared terms with different denominators, summing to 1 — an ellipse.',ex_ar:'حدان تربيعيان موجبان بمقامين مختلفين مجموعهما 1 — قطع ناقص.'}
];
D['a2-trig']=[
  {t:'num',ti:'Numeric Entry: Amplitude of Sinusoidal Function',ti_ar:'إدخال رقمي: سعة الدالة الجيبية',q:'What is the amplitude of \\(y = -4\\sin(3x - \\pi) + 2\\)?',q_ar:'ما هي سعة الدالة \\(y = -4\\sin(3x - \\pi) + 2\\)؟',a:4,ex:'Amplitude is the absolute value of the coefficient \\(A\\): \\(|-4| = 4\\).',ex_ar:'السعة هي القيمة المطلقة للمعامل \\(A\\): \\(|-4| = 4\\).'},
  {t:'cat',ti:'Categorize: Signs of Trig Ratios by Quadrant',ti_ar:'تصنيف: إشارات النسب المثلثية حسب الأرباع',categories:['Positive','Negative'],categories_ar:['موجبة','سالبة'],items:[
    {s:'\\(\\sin(150°)\\)',s_ar:'\\(\\sin(150°)\\)',cat:'Positive'},
    {s:'\\(\\cos(150°)\\)',s_ar:'\\(\\cos(150°)\\)',cat:'Negative'},
    {s:'\\(\\tan(240°)\\)',s_ar:'\\(\\tan(240°)\\)',cat:'Positive'},
    {s:'\\(\\sin(300°)\\)',s_ar:'\\(\\sin(300°)\\)',cat:'Negative'},
    {s:'\\(\\cos(315°)\\)',s_ar:'\\(\\cos(315°)\\)',cat:'Positive'}
  ],ex:'ASTC rule: Q2 has positive sine; Q3 has positive tangent; Q4 has positive cosine.',ex_ar:'قاعدة الإشارات (كل جبار ظالم جته مصيبة / ASTC): الربع 2 الجيب موجب؛ الربع 3 الظل موجب؛ الربع 4 جيب التمام موجب.'},
  {t:'fn',ti:'Explorer: Amplitude \\(A\\cdot\\sin(x)\\)',ti_ar:'مستكشف: السعة \\(A\\cdot\\sin(x)\\)',fns:[{expr:'A*sin(x)',color:'#1E3A6E',label:'A·sin(x)'}],xrange:[-6.3,6.3],yrange:[-3.5,3.5],params:[{name:'A',label:'Amplitude A',min:0.5,max:3,step:0.5,default:1}]},
  {t:'sr',ti:'Worked Example: Find \\(\\sin(210°)\\)',ti_ar:'مثال محلول: إيجاد \\(\\sin(210°)\\)',steps:[
    '\\(210°\\) is in the third quadrant, where sine is negative.',
    'The reference angle is \\(210°-180°=30°\\).',
    '\\(\\sin(30°)=\\dfrac12\\), so \\(\\sin(210°)=-\\dfrac12\\).'
  ],steps_ar:[
    'الزاوية \\(210°\\) تقع في الربع الثالث، حيث تكون إشارة الجيب سالبة.',
    'زاوية الإسناد (المرجع) هي \\(210°-180°=30°\\).',
    '\\(\\sin(30°)=\\dfrac12\\)، إذن \\(\\sin(210°)=-\\dfrac12\\).'
  ]},
  {t:'qc',ti:'Quick Check: Sign of Trig Functions',ti_ar:'فحص سريع: إشارة الدوال المثلثية',q:'In which quadrant is \\(\\cos\\theta < 0\\) and \\(\\sin\\theta > 0\\)?',q_ar:'في أي ربع يكون \\(\\cos\\theta < 0\\) و \\(\\sin\\theta > 0\\)؟',o:['II','I','III','IV'],o_ar:['الربع الثاني (II)','الربع الأول (I)','الربع الثالث (III)','الربع الرابع (IV)'],a:0,ex:'In Quadrant II, x-values (cosine) are negative and y-values (sine) are positive.',ex_ar:'في الربع الثاني، قيم x (جيب التمام) سالبة وقيم y (الجيب) موجبة.'}
];
D['a2-matrices']=[
  {t:'num',ti:'Numeric Entry: 2x2 Matrix Determinant',ti_ar:'إدخال رقمي: محدد مصفوفة 2×2',q:'Find the determinant of \\(\\begin{pmatrix} 5 & -3 \\\\ 2 & 4 \\end{pmatrix}\\).',q_ar:'أوجد محدد المصفوفة \\(\\begin{pmatrix} 5 & -3 \\\\ 2 & 4 \\end{pmatrix}\\).',a:26,ex:'\\(\\det = (5)(4) - (-3)(2) = 20 - (-6) = 20 + 6 = 26\\).',ex_ar:'\\(\\det = (5)(4) - (-3)(2) = 20 - (-6) = 20 + 6 = 26\\).'},
  {t:'ord',ti:'Order the Steps: Solving System via Matrix Inverse \\(A\\mathbf{x} = \\mathbf{b}\\)',ti_ar:'رتّب الخطوات: حل نظام معادلات باستخدام معكوس المصفوفة \\(A\\mathbf{x} = \\mathbf{b}\\)',prompt:'Arrange the matrix algebra steps:',prompt_ar:'رتب خطوات جبر المصفوفات:',items:[
    'Write the linear system in matrix form \\(A\\mathbf{x} = \\mathbf{b}\\).',
    'Calculate the determinant \\(\\det(A) = ad - bc\\) and verify \\(\\det(A) \\neq 0\\).',
    'Form the inverse matrix \\(A^{-1} = \\frac{1}{\\det(A)}\\begin{pmatrix} d & -b \\\\ -c & a \\end{pmatrix}\\).',
    'Multiply \\(A^{-1}\\mathbf{b}\\) to find the solution vector \\(\\mathbf{x}\\).'
  ],items_ar:[
    'كتابة النظام الخطي على صورة معادلة مصفوفية \\(A\\mathbf{x} = \\mathbf{b}\\).',
    'حساب المحدد \\(\\det(A) = ad - bc\\) والتأكد من أن \\(\\det(A) \\neq 0\\).',
    'إيجاد مصفوفة النظير الضربي \\(A^{-1} = \\frac{1}{\\det(A)}\\begin{pmatrix} d & -b \\\\ -c & a \\end{pmatrix}\\).',
    'ضرب \\(A^{-1}\\mathbf{b}\\) لإيجاد متجه الحل \\(\\mathbf{x}\\).'
  ],ex:'Set up Ax = b, compute determinant, find inverse, and multiply A^-1 * b.',ex_ar:'صغ المعادلة Ax = b، احسب المحدد، أوجد النظير الضربي، ثم اضرب A^-1 * b.'},
  {t:'sr',ti:'Worked Example: Determinant of \\(\\begin{pmatrix}3&2\\\\1&4\\end{pmatrix}\\)',ti_ar:'مثال محلول: محدد \\(\\begin{pmatrix}3&2\\\\1&4\\end{pmatrix}\\)',steps:[
    'For a \\(2\\times2\\) matrix \\(\\begin{pmatrix}a&b\\\\c&d\\end{pmatrix}\\), the determinant is \\(ad-bc\\).',
    'Substitute: \\(\\det=(3)(4)-(2)(1)\\).',
    'Compute: \\(12-2=10\\).'
  ],steps_ar:[
    'للمصفوفة \\(2\\times2\\) \\(\\begin{pmatrix}a&b\\\\c&d\\end{pmatrix}\\)، المحدد هو \\(ad-bc\\).',
    'التعويض: \\(\\det=(3)(4)-(2)(1)\\).',
    'الحساب: \\(12-2=10\\).'
  ]},
  {t:'qc',ti:'Quick Check: Systems and Determinants',ti_ar:'فحص سريع: الأنظمة والمحددات',q:'A system of equations has no solution when its lines are:',q_ar:'يكون لنظام المعادلات الخطي عدد حلول يساوي صفراً (لا حل له) عندما يكون المستقيمان:',o:['Parallel and distinct','Intersecting','The same line','Perpendicular'],o_ar:['متوازيين وغير متطابقين','متقاطعين في نقطة واحدة','المستقيم نفسه (متطابقين)','متعامدين'],a:0,ex:'Parallel, non-identical lines never meet, so there is no solution.',ex_ar:'المستقيمات المتوازية غير المتطابقة لا تتقاطع أبداً، لذا لا يوجد حل للنظام.'}
];
D['a2-stats']=[
  {t:'num',ti:'Numeric Entry: Permutations Evaluation',ti_ar:'إدخال رقمي: حساب التباديل',q:'Evaluate \\({}_6P_3\\).',q_ar:'احسب قيمة \\({}_6P_3\\).',a:120,ex:'\\({}_6P_3 = \\frac{6!}{(6-3)!} = \\frac{6!}{3!} = 6 \\times 5 \\times 4 = 120\\).',ex_ar:'\\({}_6P_3 = \\frac{6!}{(6-3)!} = \\frac{6!}{3!} = 6 \\times 5 \\times 4 = 120\\).'},
  {t:'cat',ti:'Categorize: Counting Scenarios',ti_ar:'تصنيف: طرائق العد',categories:['Permutation (Order Matters)','Combination (Order Irrelevant)'],categories_ar:['تباديل (الترتيب مهم)','توافيق (الترتيب غير مهم)'],items:[
    {s:'Selecting a 4-digit PIN code',s_ar:'اختيار رمز سري (PIN) مكوّن من 4 أرقام',cat:'Permutation (Order Matters)'},
    {s:'Electing President, VP, and Secretary',s_ar:'انتخاب رئيس ونائب رئيس وأمين سر',cat:'Permutation (Order Matters)'},
    {s:'Choosing 3 books to read on vacation',s_ar:'اختيار 3 كتب لقراءتها في العطلة',cat:'Combination (Order Irrelevant)'},
    {s:'Selecting a 5-card poker hand',s_ar:'اختيار يد مكونة من 5 بطاقات لعب',cat:'Combination (Order Irrelevant)'},
    {s:'Assigning first, second, and third place medals',s_ar:'توزيع ميداليات المراكز الأول والثاني والثالث',cat:'Permutation (Order Matters)'}
  ],ex:'Permutations apply when position matters; combinations apply when groups/subsets are chosen without ranking.',ex_ar:'تُستخدم التباديل عندما يكون الترتيب مهماً؛ وتُستخدم التوافيق عند اختيار مجموعات دون مراعاة الترتيب أو الرتبة.'},
  {t:'sr',ti:'Worked Example: Basic Probability',ti_ar:'مثال محلول: الاحتمال البسيط',steps:[
    'A bag has 4 red and 6 blue marbles. Total marbles: \\(4+6=10\\).',
    'Favorable outcomes (red): \\(4\\).',
    'Probability: \\(P(\\text{red})=\\dfrac{4}{10}=\\dfrac{2}{5}\\).'
  ],steps_ar:[
    'تحتوي حقيبة على 4 كرات حمراء و 6 كرات زرقاء. إجمالي الكرات: \\(4+6=10\\).',
    'النواتج المرغوبة (الحمراء): \\(4\\).',
    'الاحتمال: \\(P(\\text{حمراء})=\\dfrac{4}{10}=\\dfrac{2}{5}\\).'
  ]},
  {t:'qc',ti:'Quick Check: Two Dice',ti_ar:'فحص سريع: إلقاء نردين',q:'Two dice are rolled. What is \\(P(\\text{sum}=7)\\)?',q_ar:'أُلقي نردان متمايزان. ما هو احتمال \\(P(\\text{المجموع}=7)\\)؟',o:['\\(\\dfrac16\\)','\\(\\dfrac1{12}\\)','\\(\\dfrac1{36}\\)','\\(\\dfrac18\\)'],o_ar:['\\(\\dfrac16\\)','\\(\\dfrac1{12}\\)','\\(\\dfrac1{36}\\)','\\(\\dfrac18\\)'],a:0,ex:'6 of the 36 outcomes sum to 7 (1+6, 2+5, 3+4, 4+3, 5+2, 6+1): \\(\\dfrac{6}{36}=\\dfrac16\\).',ex_ar:'6 نواتج من أصل 36 تعطي مجموعاً يساوي 7: (1+6, 2+5, 3+4, 4+3, 5+2, 6+1)، إذن \\(\\dfrac{6}{36}=\\dfrac16\\).'}
];
});
