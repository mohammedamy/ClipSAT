/* Interactive Practice data for /qudrat/ - one entry per chapter section id.
   Shipped as public/js/ix/qudrat.js and loaded only on that track's page by the
   engine in src/scripts/modules/19-interactive-activities-engine-v1.js
   (Plan 5 Phase 5.015, ADR 0033). Entry shapes (qc/mt/tf/sb/sr/fn) are
   documented there. */
(window.__ixData = window.__ixData || []).push(function (D) {
D['qud-about']=[
{t:'qc',ti:'Quick Check: Qudrat Quantitative Structure',ti_ar:'فحص سريع: هيكل اختبار القدرات الكمي',q:'What is the structure and calculator policy of the General Aptitude Test (Qudrat)?',q_ar:'ما هو هيكل قسم الرياضيات في اختبار القدرات العامة وسياسة الآلة الحاسبة؟',o:['Multiple sections with roughly 1 minute per question; calculators are strictly prohibited','One long 3-hour section with graphing calculators allowed','60 questions with 45 minutes and scientific calculators permitted','All questions are grid-in without multiple-choice options'],o_ar:['أقسام متعددة بمعدل دقيقة واحدة تقريباً لكل سؤال، والآلة الحاسبة ممنوعة تماماً','قسم واحد مدته 3 ساعات مع السماح بالآلة البيانية','60 سؤالاً في 45 دقيقة مع السماح بالحاسبة العلمية','جميع الأسئلة حل مباشر بدون خيارات'],a:0,ex:'Qudrat sections are timed with strictly about 1 minute (or less) per question, and no calculators of any kind are permitted. Mental arithmetic and estimation tricks are essential.',ex_ar:'اختبار القدرات مقسم إلى أقسام زمنية محددة بمعدل دقيقة لكل سؤال، والآلة الحاسبة ممنوعة نهائياً مما يتطلب مهارات الحساب الذهني والتقدير السريع.'},
{t:'mt',ti:'Matching: Qudrat Comparison Question (المقارنات) Rules',ti_ar:'مطابقة: قواعد أسئلة المقارنات في القدرات',
p:[{l:'Value A is greater',r:'Option A (القيمة الأولى أكبر)'},{l:'Value B is greater',r:'Option B (القيمة الثانية أكبر)'},{l:'Values are equal',r:'Option C (القيمتان متساويتان)'},{l:'Information is insufficient',r:'Option D (المعطيات غير كافية)'}],
p_ar:[{l:'القيمة الأولى أكبر دائماً',r:'الاختيار (أ)'},{l:'القيمة الثانية أكبر دائماً',r:'الاختيار (ب)'},{l:'القيمتان متساويتان',r:'الاختيار (ج)'},{l:'المعطيات غير كافية',r:'الاختيار (د)'}]}
];
D['qud-arithmetic']=[
{t:'qc',ti:'Quick Check: Fractions',ti_ar:'فحص سريع: الكسور',
q:'Find \\(\\frac{3}{4}\\) of \\(80\\)',q_ar:'أوجد \\(\\frac{3}{4}\\) من \\(80\\)',
o:['50','60','45','70'],o_ar:['50','60','45','70'],a:1,ex:'\\(\\frac{3}{4}\\times80=60\\).',ex_ar:'\\(\\frac{3}{4}\\times80=60\\).'},
{t:'mt',ti:'Matching: Exponent Laws & Roots',ti_ar:'مطابقة: قوانين الأسس والجذور',
p:[{l:'\\(a^m \\times a^n\\)',r:'a^{m+n}'},{l:'\\((a^m)^n\\)',r:'a^{m·n}'},{l:'\\(a^{-n}\\)',r:'1 / a^n'},{l:'\\(a^{1/2}\\)',r:'√a'}],
p_ar:[{l:'\\(a^m \\times a^n\\)',r:'a^{m+n}'},{l:'\\((a^m)^n\\)',r:'a^{m·n}'},{l:'\\(a^{-n}\\)',r:'1 / a^n'},{l:'\\(a^{1/2}\\)',r:'√a'}]},
{t:'sr',ti:'Worked Example: Order of Operations',ti_ar:'مثال محلول: ترتيب العمليات الحسابية',steps:[
'Evaluate \\(3+4\\times(6-2)^2\\div8\\). Start with the brackets: \\(6-2=4\\).',
'Apply the exponent: \\(4^2=16\\). The expression becomes \\(3+4\\times16\\div8\\).',
'Multiply and divide left to right: \\(4\\times16=64\\), \\(64\\div8=8\\). Finally \\(3+8=11\\).'
],steps_ar:[
'احسب \\(3+4\\times(6-2)^2\\div8\\). ابدأ بالأقواس: \\(6-2=4\\).',
'طبّق الأس: \\(4^2=16\\). يصبح التعبير \\(3+4\\times16\\div8\\).',
'اضرب واقسم من اليسار إلى اليمين: \\(4\\times16=64\\)، \\(64\\div8=8\\). وأخيرًا \\(3+8=11\\).'
]},
{t:'sb',ti:'Step Builder: Simplify Powers \\(\\frac{2^5 \\times 3^3}{6^2}\\)',
ti_ar:'باني الخطوات: تبسيط القوى \\(\\frac{2^5 \\times 3^3}{6^2}\\)',
steps:[
  {l:'Express denominator with bases 2 and 3: \\(6^2 = (2 \\times 3)^2 = 2^2 \\times 3^2\\). Power of 2 is \\(5 - 2 =\\)',a:'3',h:'3'},
  {l:'\\(2^3 =\\)',a:'8',h:'8'},
  {l:'Power of 3 is \\(3 - 2 = 1\\), so \\(3^1 = 3\\). Final product \\(8 \\times 3 =\\)',a:'24',h:'24'}
],
steps_ar:[
  {l:'فكك المقام لأساسات 2 و3: \\(6^2 = (2 \\times 3)^2 = 2^2 \\times 3^2\\). أس العدد 2 هو \\(5 - 2 =\\)',a:'3',h:'3'},
  {l:'\\(2^3 =\\)',a:'8',h:'8'},
  {l:'أس العدد 3 هو \\(3 - 2 = 1\\)، إذن \\(3^1 = 3\\). الناتج النهائي \\(8 \\times 3 =\\)',a:'24',h:'24'}
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
o:['15%','12%','8%','20%'],o_ar:['15%','12%','8%','20%'],a:0,ex:'\\(\\dfrac{92-80}{80}\\times100\\%=15\\%\\).',ex_ar:'\\(\\dfrac{92-80}{80}\\times100\\%=15\\%\\).'},
{t:'sb',ti:'Step Builder: Successive Discount on 200 SAR (20% then 10%)',
ti_ar:'باني الخطوات: خصم متتالٍ على 200 ريال (20% ثم 10%)',
steps:[
  {l:'First discount: \\(20\\%\\text{ of }200 = 0.20 \\times 200 =\\)',a:'40',h:'40'},
  {l:'Price after 1st discount: \\(200 - 40 =\\)',a:'160',h:'160'},
  {l:'Second discount: \\(10\\%\\text{ of }160 = 0.10 \\times 160 =\\)',a:'16',h:'16'},
  {l:'Final sale price: \\(160 - 16 =\\)',a:'144',h:'144'}
],
steps_ar:[
  {l:'الخصم الأول: \\(20\\%\\text{ من }200 = 0.20 \\times 200 =\\)',a:'40',h:'40'},
  {l:'السعر بعد الخصم الأول: \\(200 - 40 =\\)',a:'160',h:'160'},
  {l:'الخصم الثاني: \\(10\\%\\text{ من }160 = 0.10 \\times 160 =\\)',a:'16',h:'16'},
  {l:'السعر النهائي بعد التخفيضين: \\(160 - 16 =\\)',a:'144',h:'144'}
]}];
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
a:0,ex:'\\(a^m\\div a^n=a^{m-n}\\Rightarrow a^{5-2}=a^3\\).',ex_ar:'\\(a^m\\div a^n=a^{m-n}\\Rightarrow a^{5-2}=a^3\\).'},
{t:'sb',ti:'Step Builder: Difference of Squares Shortcut \\(103^2 - 97^2\\)',
ti_ar:'باني الخطوات: اختصار فرق المربعين \\(103^2 - 97^2\\)',
steps:[
  {l:'Formula: \\(a^2 - b^2 = (a - b)(a + b)\\). First factor: \\(103 - 97 =\\)',a:'6',h:'6'},
  {l:'Second factor: \\(103 + 97 =\\)',a:'200',h:'200'},
  {l:'Multiply factors: \\(6 \\times 200 =\\)',a:'1200',h:'1200'}
],
steps_ar:[
  {l:'القانون: \\(a^2 - b^2 = (a - b)(a + b)\\). المعامل الأول: \\(103 - 97 =\\)',a:'6',h:'6'},
  {l:'المعامل الثاني: \\(103 + 97 =\\)',a:'200',h:'200'},
  {l:'اضرب الناتجين: \\(6 \\times 200 =\\)',a:'1200',h:'1200'}
]}];
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
o:['15','21','13.5','18'],o_ar:['15','21','13.5','18'],a:0,ex:'\\(\\sqrt{9^2+12^2}=\\sqrt{81+144}=\\sqrt{225}=15\\).',ex_ar:'\\(\\sqrt{9^2+12^2}=\\sqrt{81+144}=\\sqrt{225}=15\\).'},
{t:'qc',ti:'Quick Check: Triangle Angle Sum',ti_ar:'فحص سريع: مجموع زوايا المثلث',
q:'A triangle has two angles measuring \\(65^\\circ\\) and \\(55^\\circ\\). What is the measure of the third angle?',
q_ar:'مثلث قياس زاويتين فيه \\(65^\\circ\\) و\\(55^\\circ\\). ما قياس الزاوية الثالثة؟',
o:['60°','70°','50°','80°'],o_ar:['60°','70°','50°','80°'],
a:0,ex:'\\(180^\\circ - (65^\\circ + 55^\\circ) = 180^\\circ - 120^\\circ = 60^\\circ\\).',
ex_ar:'\\(180^\\circ - (65^\\circ + 55^\\circ) = 180^\\circ - 120^\\circ = 60^\\circ\\).'}];
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
a:0,ex:'\\(3^2=9\\) and \\(2^3=8\\), so A > B.',ex_ar:'\\(3^2=9\\) و\\(2^3=8\\)، إذن A > B.'},
{t:'tf',ti:'True or False: Quantitative Comparison Properties',ti_ar:'صحيح أم خطأ: خصائص المقارنة الكمّية',
items:[
  {s:'Adding or subtracting the same value from both quantities preserves their comparison relationship.',a:true,ex:'Correct. If \\(A > B\\), then \\(A + c > B + c\\).'},
  {s:'If \\(x^2 = 25\\), then Quantity A: \\(x\\) and Quantity B: \\(5\\) are always equal.',a:false,ex:'False. \\(x\\) could be \\(-5\\), which makes Quantity A < Quantity B.'},
  {s:'Multiplying both quantities by an unknown variable whose sign is not given is safe.',a:false,ex:'False. If the variable is negative, the inequality reverses.'},
  {s:'If Quantity A is \\(\\frac{1}{4}\\) and Quantity B is \\(0.25\\), then \\(A = B\\).',a:true,ex:'Correct. \\(\\frac{1}{4} = 0.25\\).'}
],
items_ar:[
  {s:'إضافة أو طرح نفس القيمة من كلا الطرفين يحافظ على علاقة المقارنة بينهما.',a:true,ex:'صحيح. إذا كانت \\(A > B\\)، فإن \\(A + c > B + c\\).'},
  {s:'إذا كانت \\(x^2 = 25\\)، فإن الكمية A: \\(x\\) والكمية B: \\(5\\) متساويتان دائمًا.',a:false,ex:'خطأ. قد تكون \\(x = -5\\)، فتكون الكمية A أصغر من B.'},
  {s:'ضرب كلا الطرفين في متغير مجهول الإشارة يُعد عملية آمنة دائمًا.',a:false,ex:'خطأ. إذا كان المتغير سالبًا، فإن علاقة التباين تنعكس.'},
  {s:'إذا كانت الكمية A هي \\(\\frac{1}{4}\\) والكمية B هي \\(0.25\\)، فإن \\(A = B\\).',a:true,ex:'صحيح. \\(\\frac{1}{4} = 0.25\\).'}
]},
{t:'mt',ti:'Matching: Comparison Shortcuts & Traps',ti_ar:'مطابقة: اختصارات وفخاخ المقارنات',
p:[
  {l:'If \\(x > 0\\) and \\(y < 0\\), compare \\(x - y\\) with \\(0\\)',r:'A > B (Pos − Neg = Pos)'},
  {l:'If \\(x^2 = 16\\), compare \\(x\\) with \\(4\\)',r:'Cannot be determined'},
  {l:'Compare \\(1/x\\) and \\(1/y\\) for \\(0 < x < y\\)',r:'A > B (Smaller denominator)'},
  {l:'Compare \\((a+b)^2\\) and \\(a^2+b^2\\) for \\(a,b>0\\)',r:'A > B (Extra +2ab)'}
],
p_ar:[
  {l:'إذا كان \\(x > 0\\) و\\(y < 0\\)، قارن \\(x - y\\) مع \\(0\\)',r:'A > B (موجب − سالب = موجب)'},
  {l:'إذا كان \\(x^2 = 16\\)، قارن \\(x\\) مع \\(4\\)',r:'لا يمكن التحديد'},
  {l:'قارن \\(1/x\\) و\\(1/y\\) عندما \\(0 < x < y\\)',r:'A > B (المقام الأصغر قيمته أكبر)'},
  {l:'قارن \\((a+b)^2\\) مع \\(a^2+b^2\\) عندما \\(a,b>0\\)',r:'A > B (الطرف الأول به +2ab)'}
]}];
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
a:0,ex:'Ratio \\(r=2\\). 5th term \\(=3\\times2^4=48\\).',ex_ar:'النسبة \\(r=2\\). الحد الخامس \\(=3\\times2^4=48\\).'},
{t:'sb',ti:'Step Builder: Find the 10th term of \\(5, 9, 13, 17, \\ldots\\)',
ti_ar:'باني الخطوات: أوجد الحد العاشر للمتتالية \\(5, 9, 13, 17, \\ldots\\)',
steps:[
  {l:'Common difference \\(d = 9 - 5 =\\)',a:'4',h:'4'},
  {l:'Number of increments: \\(10 - 1 =\\)',a:'9',h:'9'},
  {l:'Formula: \\(a_{10} = 5 + 9 \\times 4 = 5 + 36 =\\)',a:'41',h:'41'}
],
steps_ar:[
  {l:'الفرق المشترك \\(d = 9 - 5 =\\)',a:'4',h:'4'},
  {l:'عدد الزيادات: \\(10 - 1 =\\)',a:'9',h:'9'},
  {l:'الصيغة: \\(a_{10} = 5 + 9 \\times 4 = 5 + 36 =\\)',a:'41',h:'41'}
]},
{t:'mt',ti:'Matching: Sequence Rules',ti_ar:'مطابقة: قواعد وأنماط المتتابعات',
p:[
  {l:'3, 8, 13, 18, ... (add 5)',r:'Next is 23 (Arithmetic)'},
  {l:'2, 6, 18, 54, ... (multiply 3)',r:'Next is 162 (Geometric)'},
  {l:'1, 4, 9, 16, ... (n²)',r:'Next is 25 (Square numbers)'},
  {l:'2, 3, 5, 8, 12, ... (+1,+2,+3,+4)',r:'Next is 17 (Increasing diff)'}
],
p_ar:[
  {l:'3، 8، 13، 18، ... (إضافة 5)',r:'الحد التالي 23 (حسابية)'},
  {l:'2، 6، 18، 54، ... (ضرب 3)',r:'الحد التالي 162 (هندسية)'},
  {l:'1، 4، 9، 16، ... (مربعات n²)',r:'الحد التالي 25 (أعداد مربعة)'},
  {l:'2، 3، 5، 8، 12، ... (+1,+2,+3,+4)',r:'الحد التالي 17 (زيادة تصاعدية)'}
]}];
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
a:0,ex:'\\(P(\\text{not green})=1-\\dfrac{5}{12}=\\dfrac{7}{12}\\).',ex_ar:'\\(P(\\text{not green})=1-\\dfrac{5}{12}=\\dfrac{7}{12}\\).'},
{t:'mt',ti:'Matching: Statistical Measures',ti_ar:'مطابقة: المقاييس الإحصائية',
p:[
  {l:'Mean',r:'Sum of values ÷ count'},
  {l:'Median',r:'Middle value of ordered data'},
  {l:'Mode',r:'Most frequent value'},
  {l:'Range',r:'Maximum − Minimum'}
],
p_ar:[
  {l:'المتوسط الحسابي',r:'مجموع القيم ÷ عددها'},
  {l:'الوسيط',r:'القيمة الوسطى بعد الترتيب'},
  {l:'المنوال',r:'القيمة الأكثر تكراراً'},
  {l:'المدى',r:'أكبر قيمة − أصغر قيمة'}
]},
{t:'tf',ti:'True or False: Data & Probability Rules',ti_ar:'صحيح أم خطأ: قواعد البيانات والاحتمالات',
items:[
  {s:'The probability of any event \\(E\\) always satisfies \\(0 \\le P(E) \\le 1\\).',a:true,ex:'Probabilities are always between 0 and 1 inclusive.'},
  {s:'Adding 5 to each value in a dataset increases the standard deviation by 5.',a:false,ex:'Shifting data shifts the mean, but does not affect the spread (standard deviation remains unchanged).'},
  {s:'If the mean of 4 numbers is 15, their sum must be 60.',a:true,ex:'Sum = mean × count = 15 × 4 = 60.'},
  {s:'The median is affected by extreme outliers much more than the mean is.',a:false,ex:'The median is resistant to outliers, while the mean is sensitive to them.'}
],
items_ar:[
  {s:'احتمال أي حدث \\(E\\) يقع دائمًا في الفترة \\(0 \\le P(E) \\le 1\\).',a:true,ex:'الاحتمال محصور دائمًا بين 0 و1 شاملًا.'},
  {s:'إضافة 5 إلى كل قيمة في مجموعة بيانات تزيد الانحراف المعياري بمقدار 5.',a:false,ex:'إضافة ثابت تغيّر المتوسط الحسابي فقط ولا تغيّر مقاييس التشتت كالانحراف المعياري.'},
  {s:'إذا كان المتوسط الحسابي لأربعة أعداد هو 15، فإن مجموعها يساوي 60.',a:true,ex:'المجموع = المتوسط × العدد = 15 × 4 = 60.'},
  {s:'الوسيط يتأثر بالقيم المتطرفة بدرجة أكبر بكثير من المتوسط الحسابي.',a:false,ex:'الوسيط مقياس مقاوم للقيم المتطرفة، بينما يتأثر المتوسط بشدة بها.'}
]}];
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
a:0,ex:'Speed \\(=150/2.5=60\\) km/h. Time \\(=240/60=4\\) hours.',ex_ar:'السرعة \\(=150/2.5=60\\) كم/س. الزمن \\(=240/60=4\\) ساعات.'},
{t:'sb',ti:'Step Builder: Average Speed on a Two-Part Trip',
ti_ar:'باني الخطوات: متوسط السرعة لرحلة من مرحلتين',
steps:[
  {l:'Leg 1: \\(120\\text{ km}\\) at \\(60\\text{ km/h}\\). Time \\(=120\\div60=\\)',a:'2',h:'2 hours'},
  {l:'Leg 2: \\(120\\text{ km}\\) at \\(40\\text{ km/h}\\). Time \\(=120\\div40=\\)',a:'3',h:'3 hours'},
  {l:'Total distance: \\(120+120=\\)',a:'240',h:'240 km'},
  {l:'Average speed: \\(240\\div(2+3)=\\)',a:'48',h:'48 km/h'}
],
steps_ar:[
  {l:'المرحلة 1: \\(120\\text{ كم}\\) بسرعة \\(60\\text{ كم/س}\\). الزمن \\(=120\\div60=\\)',a:'2',h:'2 ساعة'},
  {l:'المرحلة 2: \\(120\\text{ كم}\\) بسرعة \\(40\\text{ كم/س}\\). الزمن \\(=120\\div40=\\)',a:'3',h:'3 ساعات'},
  {l:'المسافة الكلية: \\(120+120=\\)',a:'240',h:'240 كم'},
  {l:'متوسط السرعة: \\(240\\div(2+3)=\\)',a:'48',h:'48 كم/س'}
]},
{t:'mt',ti:'Matching: Word Problem Setups',ti_ar:'مطابقة: صياغة المسائل اللفظية',
p:[
  {l:'Distance with speed v and time t',r:'d = v × t'},
  {l:'Net filling rate of pipe A (rate a) and leak B (rate b)',r:'a − b'},
  {l:'A person age now is x; age 5 years ago',r:'x − 5'},
  {l:'Three consecutive integers starting at n',r:'n, n+1, n+2'}
],
p_ar:[
  {l:'المسافة بدلالة السرعة v والزمن t',r:'المسافة = السرعة × الزمن'},
  {l:'معدل الامتلاء الصافي لأنبوب يملأ بمعدل a وصنبور يُفرغ بمعدل b',r:'a − b'},
  {l:'عمر شخص الآن x؛ عمره قبل 5 سنوات',r:'x − 5'},
  {l:'ثلاثة أعداد صحيحة متتالية تبدأ بـ n',r:'n, n+1, n+2'}
]}];
});
