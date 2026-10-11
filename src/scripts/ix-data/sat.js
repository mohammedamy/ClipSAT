/* Interactive Practice data for /sat/ - one entry per chapter section id.
   Shipped as public/js/ix/sat.js and loaded only on that track's page by the
   engine in src/scripts/modules/19-interactive-activities-engine-v1.js
   (Plan 5 Phase 5.015, ADR 0033). Entry shapes (qc/mt/tf/sb/sr/fn/num/ord/cat) are
   documented there. */
(window.__ixData = window.__ixData || []).push(function (D) {
D['sat-about']=[
  {t:'qc',ti:'Quick Check: Digital SAT Math Structure',ti_ar:'فحص سريع: هيكل اختبار SAT الرقمي في الرياضيات',q:'How many total math questions and how much time are provided in the Digital SAT?',q_ar:'كم عدد أسئلة الرياضيات والوقت المخصص في اختبار SAT الرقمي؟',o:['44 questions in 70 minutes (two 35-min modules of 22 questions)','58 questions in 80 minutes','60 questions in 60 minutes','40 questions in 60 minutes'],o_ar:['44 سؤالاً في 70 دقيقة (نموذجان تكيفيان مدة كل منهما 35 دقيقة بواقع 22 سؤالاً)','58 سؤالاً في 80 دقيقة','60 سؤالاً في 60 دقيقة','40 سؤالاً في 60 دقيقة'],a:0,ex:'The Digital SAT Math section consists of 2 adaptive modules, each with 22 questions and 35 minutes (~95 seconds per question).',ex_ar:'يتكون قسم الرياضيات في SAT الرقمي من نموذجين تكيفيين، كل نموذج به 22 سؤالاً و35 دقيقة (حوالي 95 ثانية لكل سؤال).'},
  {t:'num',ti:'Numeric Entry: Module Question Count',q:'How many questions are in a single Digital SAT Math module?',a:22,ex:'Each math module contains exactly 22 questions (totalling 44 questions across both modules).'},
  {t:'ord',ti:'Order the Steps: Digital SAT Multistage Adaptive Strategy',prompt:'Arrange the stages of the Digital SAT adaptive experience in chronological order:',items:[
    'Complete Module 1 containing a balanced mix of easy, medium, and hard math questions.',
    'Algorithm analyzes Module 1 accuracy to route you to either the easier or harder Module 2.',
    'Complete Module 2 (harder module required to unlock scores above ~600).',
    'Review all flagged questions before time expires in the active module.'
  ],ex:'Take Module 1, receive adaptive routing based on performance, complete Module 2, and review answers.'},
  {t:'mt',ti:'Matching: Digital SAT Features & Rules',ti_ar:'مطابقة: ميزات وقواعد اختبار SAT الرقمي',
    p:[{l:'Built-in Desmos Calculator',r:'Available on all math questions'},{l:'Guessing Penalty',r:'None (never leave blanks)'},{l:'Module 2 Difficulty',r:'Adapts based on Module 1 performance'},{l:'Student-Produced Responses',r:'Grid-in numeric answers (no MCQ options)'}],
    p_ar:[{l:'حاسبة ديسموس المدمجة',r:'متاحة في جميع أسئلة الرياضيات'},{l:'عقوبة التخمين الخاطئ',r:'لا توجد عقوبة (لا تترك أي سؤال فارغاً)'},{l:'صعوبة النموذج الثاني',r:'تتكيف بناءً على مستوى أدائك في النموذج الأول'},{l:'الاستجابات المنتجة من الطالب',r:'إدخال رقمي مباشر (بدون خيارات متعددة)'}]},
  {t:'cat',ti:'Categorize: Digital SAT Math Domain Weightings',categories:['Core High-Yield (35% each)','Secondary Domains (15% each)'],items:[
    {s:'Algebra (linear equations, systems, inequalities)',cat:0},
    {s:'Advanced Math (quadratics, polynomials, exponentials)',cat:0},
    {s:'Problem-Solving & Data Analysis (statistics, rates, percentages)',cat:1},
    {s:'Geometry & Trigonometry (circles, triangles, solids)',cat:1}
  ],ex:'Algebra and Advanced Math together constitute 70% of the entire exam.'}
];

D['sat-linear']=[
  {t:'qc',ti:'Quick Check: Linear Functions',ti_ar:'فحص سريع: الدوال الخطية',q:'Slope of \\(3x-2y=12\\)?',q_ar:'ميل المستقيم \\(3x-2y=12\\)؟',o:['−2','3/2','3','−6'],o_ar:['−2','3/2','3','−6'],a:1,ex:'\\(y=\\frac{3}{2}x-6\\). Slope \\(=\\frac{3}{2}\\).',ex_ar:'\\(y=\\frac{3}{2}x-6\\). الميل \\(=\\frac{3}{2}\\).'},
  {t:'num',ti:'Numeric Entry: Finding the x-Intercept',q:'Find the x-intercept of the line \\(4x - 5y = 40\\). Enter the x-coordinate.',a:10,ex:'Set \\(y = 0\\): \\(4x - 5(0) = 40 \\Rightarrow 4x = 40 \\Rightarrow x = 10\\).'},
  {t:'cat',ti:'Categorize: Linear System Solutions',categories:['One Unique Solution','No Solution (Parallel)','Infinitely Many Solutions'],items:[
    {s:'\\(y = 3x + 1\\) and \\(y = 3x - 5\\)',cat:1},
    {s:'\\(2x + y = 6\\) and \\(4x + 2y = 12\\)',cat:2},
    {s:'\\(y = 2x - 4\\) and \\(y = -x + 5\\)',cat:0},
    {s:'Same slope, different y-intercepts',cat:1},
    {s:'Different slopes',cat:0}
  ],ex:'Different slopes meet once; equal slopes with different intercepts never meet; identical lines intersect everywhere.'},
  {t:'ord',ti:'Order the Steps: Solving a Linear System by Elimination',prompt:'Arrange the steps to solve \\(2x + 3y = 12\\) and \\(4x - y = 10\\):',items:[
    'Multiply the second equation by 3 to align y-coefficients: \\(12x - 3y = 30\\).',
    'Add the equations to eliminate y: \\((2x + 3y) + (12x - 3y) = 12 + 30 \\Rightarrow 14x = 42\\).',
    'Divide to isolate x: \\(x = 3\\).',
    'Substitute x = 3 into the original equation: \\(4(3) - y = 10 \\Rightarrow 12 - y = 10\\).',
    'Solve for y to obtain the solution point: \\(y = 2\\), so \\((x, y) = (3, 2)\\).'
  ],ex:'Aligning opposite coefficients allows straightforward addition to eliminate a variable.'},
  {t:'mt',ti:'Matching: Slopes and Line Relations',ti_ar:'مطابقة: الميول وعلاقات المستقيمات',
    p:[{l:'Parallel lines',r:'Equal slopes'},{l:'Perpendicular lines',r:'Negative reciprocal slopes'},{l:'Horizontal line',r:'Slope = 0'},{l:'Vertical line',r:'Slope undefined'}],
    p_ar:[{l:'مستقيمان متوازيان',r:'ميلان متساويان'},{l:'مستقيمان متعامدان',r:'معكوس مقلوب الميل'},{l:'مستقيم أفقي',r:'الميل = 0'},{l:'مستقيم رأسي',r:'الميل غير معرّف'}]},
  {t:'sr',ti:'Worked Example: Solve a Linear System by Elimination',ti_ar:'مثال محلول: حل نظام خطي بالحذف',steps:[
    'Solve \\(2x+3y=12\\) and \\(x-y=1\\). From the second equation, \\(x=y+1\\).',
    'Substitute into the first: \\(2(y+1)+3y=12\\Rightarrow2y+2+3y=12\\).',
    'Combine: \\(5y=10\\Rightarrow y=2\\).',
    'Back-substitute: \\(x=2+1=3\\). Solution: \\((3,2)\\).'
  ],steps_ar:[
    'حل المعادلتين \\(2x+3y=12\\) و\\(x-y=1\\). من المعادلة الثانية، \\(x=y+1\\).',
    'عوّض في الأولى: \\(2(y+1)+3y=12\\Rightarrow2y+2+3y=12\\).',
    'جمّع الحدود: \\(5y=10\\Rightarrow y=2\\).',
    'عوّض عكسيًا: \\(x=2+1=3\\). الحل: \\((3,2)\\).'
  ]}
];

D['sat-linfun']=[
  {t:'num',ti:'Numeric Entry: Interpreting Rate of Change',q:'A technician charges an upfront diagnostic fee of $45 plus $30 per hour of labor. If the total bill is $195, how many hours of labor were performed?',a:5,ex:'Set up linear model \\(C = 30h + 45\\). Then \\(30h + 45 = 195 \\Rightarrow 30h = 150 \\Rightarrow h = 5\\).'},
  {t:'ord',ti:'Order the Steps: Writing a Linear Equation from Two Points',prompt:'Arrange the steps to determine the equation \\(y = mx + b\\) passing through \\((2, 7)\\) and \\((4, 13)\\):',items:[
    'Calculate slope: \\(m = \\frac{13 - 7}{4 - 2} = \\frac{6}{2} = 3\\).',
    'Substitute slope and point \\((2, 7)\\) into point-slope form: \\(y - 7 = 3(x - 2)\\).',
    'Distribute: \\(y - 7 = 3x - 6\\).',
    'Isolate y to obtain slope-intercept form: \\(y = 3x + 1\\).'
  ],ex:'Find the slope, substitute a point into point-slope form, expand, and isolate y.'},
  {t:'cat',ti:'Categorize: Linear Graph Features',categories:['Slope-Intercept Form','Point-Slope Form','Horizontal / Vertical Lines'],items:[
    {s:'\\(y = mx + b\\) where m is slope and (0,b) is y-intercept',cat:0},
    {s:'\\(y - y_1 = m(x - x_1)\\)',cat:1},
    {s:'\\(y = c\\) with slope 0',cat:2},
    {s:'\\(x = c\\) with undefined slope',cat:2},
    {s:'Directly reading rate of change and initial starting value',cat:0}
  ],ex:'Slope-intercept displays rate and initial value; point-slope is best when given a slope and arbitrary point; vertical lines have undefined slope.'},
  {t:'fn',ti:'Explorer: Line Through Two Points, Slope m',ti_ar:'مستكشف: مستقيم يمر بنقطتين، الميل m',fns:[{expr:'m*x+3',color:'#1E3A6E',label:'y=mx+3'}],xrange:[-5,5],yrange:[-5,10],params:[{name:'m',label:'Slope m',min:-3,max:3,step:0.5,default:2}]},
  {t:'sr',ti:'Worked Example: Equation of a Line Through Two Points',ti_ar:'مثال محلول: معادلة مستقيم يمر بنقطتين',steps:[
    'Find the equation of the line through \\((1,3)\\) and \\((4,9)\\). Find the slope: \\(m=\\dfrac{9-3}{4-1}=\\dfrac63=2\\).',
    'Use point-slope form with \\((1,3)\\): \\(y-3=2(x-1)\\).',
    'Simplify: \\(y=2x+1\\).'
  ],steps_ar:[
    'أوجد معادلة المستقيم المار بالنقطتين \\((1,3)\\) و\\((4,9)\\). احسب الميل: \\(m=\\dfrac{9-3}{4-1}=\\dfrac63=2\\).',
    'استخدم صيغة الميل ونقطة مع \\((1,3)\\): \\(y-3=2(x-1)\\).',
    'بسّط: \\(y=2x+1\\).'
  ]},
  {t:'qc',ti:'Quick Check: Linear Inequalities',ti_ar:'فحص سريع: متباينات خطية',q:'Solve \\(3x-5>10\\)',q_ar:'حل \\(3x-5>10\\)',o:['\\(x>5\\)','\\(x>15\\)','\\(x<5\\)','\\(x>5/3\\)'],o_ar:['\\(x>5\\)','\\(x>15\\)','\\(x<5\\)','\\(x>5/3\\)'],a:0,ex:'\\(3x>15\\Rightarrow x>5\\).',ex_ar:'\\(3x>15\\Rightarrow x>5\\).'}
];

D['sat-quad']=[
  {t:'num',ti:'Numeric Entry: Sum of Roots via Vieta’s Formulas',q:'What is the sum of the solutions to \\(3x^2 - 18x + 7 = 0\\)?',a:6,ex:'By Vieta’s formulas, the sum of the roots is \\(-\\frac{b}{a} = -\\frac{-18}{3} = 6\\).'},
  {t:'cat',ti:'Categorize: Discriminant and Root Types',categories:['Two Distinct Real Roots','One Repeated Real Root','No Real Roots (Complex)'],items:[
    {s:'\\(b^2 - 4ac = 49\\)',cat:0},
    {s:'\\(b^2 - 4ac = 0\\)',cat:1},
    {s:'\\(b^2 - 4ac = -16\\)',cat:2},
    {s:'\\(x^2 - 6x + 9 = 0\\)',cat:1},
    {s:'\\(x^2 + 2x + 5 = 0\\)',cat:2},
    {s:'\\(x^2 - 5x + 4 = 0\\)',cat:0}
  ],ex:'Positive discriminant gives 2 real roots, zero gives 1 repeated real root, and negative gives complex roots.'},
  {t:'ord',ti:'Order the Steps: Finding Vertex by Completing the Square',prompt:'Arrange the steps to find the vertex of \\(y = x^2 - 6x + 11\\):',items:[
    'Group the quadratic and linear terms: \\(y = (x^2 - 6x) + 11\\).',
    'Calculate the square term: \\((-6/2)^2 = 9\\).',
    'Add and subtract 9 inside the expression: \\(y = (x^2 - 6x + 9) - 9 + 11\\).',
    'Factor the perfect square trinomial: \\(y = (x - 3)^2 + 2\\).',
    'Identify vertex \\((h, k) = (3, 2)\\) and minimum value 2.'
  ],ex:'Writing a quadratic in vertex form \\(y = a(x - h)^2 + k\\) gives the vertex \\((h, k)\\) directly.'},
  {t:'mt',ti:'Matching: Discriminant',ti_ar:'مطابقة: المميز',
    p:[{l:'b²−4ac > 0',r:'2 real roots'},{l:'b²−4ac = 0',r:'1 repeated root'},{l:'b²−4ac < 0',r:'No real roots'},{l:'Sum of roots',r:'−b/a'}],
    p_ar:[{l:'b²−4ac > 0',r:'جذران حقيقيان'},{l:'b²−4ac = 0',r:'جذر مكرر'},{l:'b²−4ac < 0',r:'لا توجد جذور حقيقية'},{l:'مجموع الجذور',r:'−b/a'}]},
  {t:'sb',ti:'Step Builder: Find vertex of \\(y=x^2-6x+11\\)',ti_ar:'باني الخطوات: إيجاد رأس المنحنى \\(y=x^2-6x+11\\)',steps:[
    {l:'\\(h = -b/(2a) = -(-6)/(2\\cdot 1) =\\)',a:'3',h:'6 / 2 = 3'},
    {l:'\\(k = 3^2 - 6(3) + 11 = 9 - 18 + 11 =\\)',a:'2',h:'9 - 18 + 11 = 2'},
    {l:'Vertex \\((h,k) =\\)',a:'(3,2)',h:'(3,2)'}
  ],steps_ar:[
    {l:'\\(h = -b/(2a) = -(-6)/(2\\cdot 1) =\\)',a:'3',h:'6 / 2 = 3'},
    {l:'\\(k = 3^2 - 6(3) + 11 = 9 - 18 + 11 =\\)',a:'2',h:'9 - 18 + 11 = 2'},
    {l:'الرأس \\((h,k) =\\)',a:'(3,2)',h:'(3,2)'}
  ]},
  {t:'sr',ti:'Worked Example: Solve a Quadratic by Factoring',ti_ar:'مثال محلول: حل معادلة تربيعية بالتحليل',steps:[
    'Solve \\(x^2-6x+8=0\\). Look for two numbers multiplying to 8 and summing to −6: −2 and −4.',
    '\\(x^2-6x+8=(x-2)(x-4)\\).',
    'Set each factor to zero: \\(x=2\\) or \\(x=4\\).'
  ],steps_ar:[
    'حل \\(x^2-6x+8=0\\). ابحث عن عددين حاصل ضربهما 8 ومجموعهما −6: −2 و−4.',
    '\\(x^2-6x+8=(x-2)(x-4)\\).',
    'ساوِ كل عامل بالصفر: \\(x=2\\) أو \\(x=4\\).'
  ]}
];

D['sat-expoly']=[
  {t:'num',ti:'Numeric Entry: Exponential Decay Factor',q:'A car purchased for $24,000 depreciates by 15% each year. What is the value of the decay factor b in \\(V(t) = a \\cdot b^t\\)?',a:0.85,ex:'The decay factor is \\(b = 1 - r = 1 - 0.15 = 0.85\\).'},
  {t:'cat',ti:'Categorize: Growth Models',categories:['Linear Growth','Exponential Growth','Exponential Decay'],items:[
    {s:'A population increases by 500 individuals each year',cat:0},
    {s:'An investment account grows by 7% per year',cat:1},
    {s:'A radioactive substance loses 12% of its mass each hour',cat:2},
    {s:'Water drains from a tank at a constant rate of 4 gallons/min',cat:0},
    {s:'\\(f(x) = 150(1.08)^x\\)',cat:1}
  ],ex:'Linear changes by a constant amount each step; exponential changes by a constant percentage/factor.'},
  {t:'ord',ti:'Order the Steps: Simplifying a Rational Expression',prompt:'Arrange the steps to simplify \\(\\dfrac{x^2 - 9}{x^2 + 5x + 6}\\):',items:[
    'Factor the numerator as a difference of squares: \\((x - 3)(x + 3)\\).',
    'Factor the denominator trinomial: \\((x + 2)(x + 3)\\).',
    'Identify restrictions on the domain: \\(x \\neq -2\\) and \\(x \\neq -3\\).',
    'Cancel the common factor \\((x + 3)\\) from numerator and denominator.',
    'Write the simplified expression: \\(\\dfrac{x - 3}{x + 2}\\).'
  ],ex:'Factoring both polynomials identifies common linear factors and domain restrictions.'},
  {t:'fn',ti:'Explorer: Cubic Family \\(x^3+k\\)',ti_ar:'مستكشف: عائلة الدوال التكعيبية \\(x^3+k\\)',fns:[{expr:'x^3+k',color:'#1E3A6E',label:'x^3+k'}],xrange:[-3,3],yrange:[-15,15],params:[{name:'k',label:'Shift k',min:-5,max:5,step:1,default:0}]},
  {t:'sr',ti:'Worked Example: Simplify a Rational Expression',ti_ar:'مثال محلول: تبسيط كسر جبري',steps:[
    'Simplify \\(\\dfrac{x^2+5x+6}{x+2}\\). Factor the numerator: \\(x^2+5x+6=(x+2)(x+3)\\).',
    'Cancel the common factor \\((x+2)\\): \\(x+3\\), for \\(x\\neq-2\\).'
  ],steps_ar:[
    'بسّط \\(\\dfrac{x^2+5x+6}{x+2}\\). حلل البسط: \\(x^2+5x+6=(x+2)(x+3)\\).',
    'احذف العامل المشترك \\((x+2)\\): \\(x+3\\)، حيث \\(x\\neq-2\\).'
  ]},
  {t:'qc',ti:'Quick Check: Multiplying Monomials',ti_ar:'فحص سريع: ضرب وحيدات الحد',q:'Simplify \\((3x^2)(2x^3)\\)',q_ar:'بسّط \\((3x^2)(2x^3)\\)',o:['\\(6x^5\\)','\\(5x^6\\)','\\(6x^6\\)','\\(5x^5\\)'],o_ar:['\\(6x^5\\)','\\(5x^6\\)','\\(6x^6\\)','\\(5x^5\\)'],a:0,ex:'Multiply coefficients (\\(3\\times2=6\\)) and add exponents (\\(2+3=5\\)).',ex_ar:'اضرب المعاملات (\\(3\\times2=6\\)) واجمع الأسس (\\(2+3=5\\)).'}
];

D['sat-data']=[
  {t:'tf',ti:'True or False: Data',ti_ar:'صحيح أم خطأ: البيانات الإحصائية',items:[{s:'Mean always equals median',a:false,ex:'They differ in skewed data.'},{s:'Correlation proves causation',a:false,ex:'Correlation ≠ causation.'},{s:'SD measures spread from the mean',a:true,ex:'Correct definition.'},{s:'Negative correlation: as x↑, y↓',a:true,ex:'Correct.'}],
    items_ar:[{s:'المتوسط دائمًا يساوي الوسيط',a:false,ex:'يختلفان في البيانات الملتوية.'},{s:'الارتباط يثبت السببية',a:false,ex:'الارتباط ≠ السببية.'},{s:'الانحراف المعياري يقيس التشتت حول المتوسط',a:true,ex:'تعريف صحيح.'},{s:'الارتباط السالب: بازدياد x، ينقص y',a:true,ex:'صحيح.'}]},
  {t:'num',ti:'Numeric Entry: Finding the Median',q:'Find the median of the dataset: 12, 18, 5, 23, 14, 9, 31.',a:14,ex:'Order the 7 values: 5, 9, 12, 14, 18, 23, 31. The middle (4th) value is 14.'},
  {t:'cat',ti:'Categorize: Statistical Study Types',categories:['Sample Survey','Observational Study','Randomized Experiment'],items:[
    {s:'Participants randomly assigned to drug or placebo groups to test efficacy',cat:2},
    {s:'Tracking dietary habits and heart health over 20 years without intervening',cat:1},
    {s:'Polling 1,000 randomly selected registered voters before an election',cat:0},
    {s:'Only study type that can establish cause-and-effect relationships',cat:2}
  ],ex:'Only randomized experiments establish causation; observational studies show association; surveys estimate population parameters.'},
  {t:'ord',ti:'Order the Steps: Successive Percentage Change',prompt:'Arrange the steps to find the final price of a $200 item discounted by 20% then discounted an additional 10%:',items:[
    'Convert the first discount to a multiplier: \\(1 - 0.20 = 0.80\\).',
    'Calculate the intermediate price: \\(200 \\times 0.80 = 160\\).',
    'Convert the second discount to a multiplier: \\(1 - 0.10 = 0.90\\).',
    'Multiply the intermediate price by the second factor: \\(160 \\times 0.90 = 144\\).',
    'Verify compound multiplier: \\(200 \\times (0.80 \\times 0.90) = 200 \\times 0.72 = 144\\).'
  ],ex:'Never add percentages directly (20% + 10% ≠ 30%). Multiply the individual decay factors.'},
  {t:'qc',ti:'Quick Check: Two-Way Table Probability',ti_ar:'فحص سريع: احتمال من جدول تكراري',q:'In a group of 100 students, 60 study Spanish and 40 study French, with 20 studying both. How many study neither?',q_ar:'في مجموعة من 100 طالب، 60 يدرسون الإسبانية و40 الفرنسية، و20 يدرسون كلتيهما. كم طالبًا لا يدرس أيًا منهما؟',o:['20','10','0','30'],o_ar:['20','10','0','30'],a:0,ex:'By Inclusion-Exclusion, \\(60+40-20=80\\) study at least one. Thus \\(100-80=20\\) study neither.',ex_ar:'بمبدأ الشمول والاستبعاد، \\(60+40-20=80\\) يدرسون لغة واحدة على الأقل. إذن \\(100-80=20\\) لا يدرسون أيًا منهما.'},
  {t:'sb',ti:'Step Builder: Interquartile Range (IQR) for \\(Q_1 = 14\\) and \\(Q_3 = 26\\)',ti_ar:'باني الخطوات: المدى الربيعي (IQR) لـ \\(Q_1 = 14\\) و\\(Q_3 = 26\\)',steps:[
    {l:'IQR formula: \\(Q_3 - Q_1 = 26 - 14 =\\)',a:'12',h:'12'},
    {l:'Lower outlier boundary: \\(Q_1 - 1.5 \\times 12 = 14 - 18 =\\)',a:'-4',h:'-4'}
  ],steps_ar:[
    {l:'صيغة IQR: \\(Q_3 - Q_1 = 26 - 14 =\\)',a:'12',h:'12'},
    {l:'الحد الأدنى للقيم المتطرفة: \\(Q_1 - 1.5 \\times 12 = 14 - 18 =\\)',a:'-4',h:'-4'}
  ]}
];

D['sat-geo']=[
  {t:'num',ti:'Numeric Entry: Circle Radius from Equation',q:'What is the radius of the circle with equation \\((x - 4)^2 + (y + 7)^2 = 64\\)?',a:8,ex:'In standard form \\((x-h)^2 + (y-k)^2 = r^2\\), \\(r^2 = 64 \\Rightarrow r = \\sqrt{64} = 8\\).'},
  {t:'ord',ti:'Order the Steps: Completing the Square for a Circle',prompt:'Arrange the steps to find the radius of \\(x^2 - 6x + y^2 + 8y = 24\\):',items:[
    'Group x-terms and y-terms: \\((x^2 - 6x) + (y^2 + 8y) = 24\\).',
    'Calculate squares to complete: \\((-6/2)^2 = 9\\) and \\((8/2)^2 = 16\\).',
    'Add 9 and 16 to both sides: \\((x^2 - 6x + 9) + (y^2 + 8y + 16) = 24 + 9 + 16 = 49\\).',
    'Rewrite in standard form: \\((x - 3)^2 + (y + 4)^2 = 7^2\\), so radius \\(r = 7\\).'
  ],ex:'Group variables, find (b/2)^2 for each, add to both sides, and factor into standard form.'},
  {t:'cat',ti:'Categorize: Geometric Formulas & Relations',categories:['Right Triangle Trig','Circle Geometry','3D Solid Volume'],items:[
    {s:'\\(\\sin\\theta = \\text{opp}/\\text{hyp}\\) and \\(\\cos\\theta = \\text{adj}/\\text{hyp}\\)',cat:0},
    {s:'Cofunction identity: \\(\\sin(x^\\circ) = \\cos(90^\\circ - x^\\circ)\\)',cat:0},
    {s:'Equation of circle: \\((x - h)^2 + (y - k)^2 = r^2\\)',cat:1},
    {s:'Arc length \\(s = r\\theta\\) where \\(\\theta\\) is in radians',cat:1},
    {s:'Cone volume: \\(V = \\frac{1}{3}\\pi r^2 h\\)',cat:2},
    {s:'Sphere volume: \\(V = \\frac{4}{3}\\pi r^3\\)',cat:2}
  ],ex:'Right triangles use trig ratios and cofunction rules; circles use center-radius and arc length formulas; solids use 3D cubic formulas.'},
  {t:'sb',ti:'Step Builder: Circle, center \\((2,3)\\), radius \\(5\\)',ti_ar:'باني الخطوات: معادلة الدائرة، المركز \\((2,3)\\)، نصف القطر \\(5\\)',steps:[{l:'Standard form: \\((x-h)^2+(y-k)^2=r^2\\). Substitute \\(h=2,k=3,r=5\\). \\(r^2=\\)',a:'25',h:'\\(5^2=25\\)'},{l:'Full equation:',a:'(x-2)^2+(y-3)^2=25',h:'\\((x-2)^2+(y-3)^2=25\\)'}],
    steps_ar:[{l:'الصيغة القياسية: \\((x-h)^2+(y-k)^2=r^2\\). بالتعويض عن \\(h=2,k=3,r=5\\). \\(r^2=\\)',a:'25',h:'\\(5^2=25\\)'},{l:'المعادلة الكاملة:',a:'(x-2)^2+(y-3)^2=25',h:'\\((x-2)^2+(y-3)^2=25\\)'}]},
  {t:'sr',ti:'Worked Example: Area of a Triangle Using Sine (SAS)',ti_ar:'مثال محلول: مساحة المثلث باستخدام الجيب (SAS)',steps:[
    'Find the area of a triangle with two sides 8 and 10 and included angle 30°. Formula: \\(\\text{Area}=\\dfrac12ab\\sin C\\).',
    'Substitute \\(a=8\\), \\(b=10\\), \\(C=30°\\): \\(\\text{Area}=\\dfrac12(8)(10)\\sin30°\\).',
    '\\(\\sin30°=\\dfrac12\\), so \\(\\text{Area}=\\dfrac12(80)\\left(\\dfrac12\\right)=20\\).'
  ],steps_ar:[
    'أوجد مساحة مثلث ضلعاه 8 و10 والزاوية المحصورة 30°. القانون: \\(\\text{المساحة}=\\dfrac12ab\\sin C\\).',
    'عوّض \\(a=8\\)، \\(b=10\\)، \\(C=30°\\): \\(\\text{المساحة}=\\dfrac12(8)(10)\\sin30°\\).',
    '\\(\\sin30°=\\dfrac12\\)، إذن \\(\\text{المساحة}=\\dfrac12(80)\\left(\\dfrac12\\right)=20\\).'
  ]},
  {t:'mt',ti:'Matching: Special Triangles & Circles',ti_ar:'مطابقة: المثلثات الخاصة والدوائر',
    p:[
      {l:'30°-60°-90° hypotenuse (short leg x)',r:'2x'},
      {l:'45°-45°-90° hypotenuse (leg x)',r:'x√2'},
      {l:'Arc length for angle θ (radians)',r:'rθ'},
      {l:'Sector area for angle θ (radians)',r:'½r²θ'}
    ],
    p_ar:[
      {l:'وتر المثلث 30°-60°-90° (الضلع القصير x)',r:'2x'},
      {l:'وتر المثلث 45°-45°-90° (الضلع x)',r:'x√2'},
      {l:'طول القوس للزاوية θ بالراديان',r:'rθ'},
      {l:'مساحة القطاع الدائري للزاوية θ بالراديان',r:'½r²θ'}
    ]}
];

D['sat-desmos']=[
  {t:'num',ti:'Numeric Entry: Solution via Desmos Intersection',q:'Graphing \\(y = 2x + 7\\) and \\(y = -x^2 + 6x + 2\\) shows an intersection at \\((5, 17)\\). What is the value of x at this intersection?',a:5,ex:'The x-coordinate at the intersection point \\((5, 17)\\) is 5.'},
  {t:'cat',ti:'Categorize: Optimal Desmos Techniques on SAT',categories:['Find Intersections (Graph Both Sides)','Add Slider for Parameter','Table Regression (~)','Direct Arithmetic Calculation'],items:[
    {s:'Solve \\(3x^2 - 5x = 2x + 1\\) by graphing \\(y=3x^2-5x\\) and \\(y=2x+1\\)',cat:0},
    {s:'Find value of k such that \\(x^2 + kx + 9 = 0\\) has one root',cat:1},
    {s:'Find exponential curve through (1, 6) and (3, 24)',cat:2},
    {s:'Compute \\(\\frac{17.4^3 - \\sqrt{512}}{3.2}\\)',cat:3}
  ],ex:'Desmos offers intersections for equations, sliders for parameter exploration, regression for curve fitting, and instant arithmetic.'},
  {t:'ord',ti:'Order the Steps: Solving a System via Desmos',prompt:'Arrange the steps to find all intersection points of \\(y = x^2 - 4x + 3\\) and \\(y = 2x - 6\\):',items:[
    'Type the first equation into Desmos: \\(y = x^2 - 4x + 3\\).',
    'Type the second equation into the next line: \\(y = 2x - 6\\).',
    'Locate the intersection points displayed as gray clickable dots on the graph.',
    'Click the gray dots to inspect coordinates: tangency occurs at \\((3, 0)\\).',
    'Read the required coordinate: \\(x = 3\\) is the single solution.'
  ],ex:'Entering both equations reveals intersections immediately without manual algebraic elimination.'},
  {t:'sr',ti:'Worked Example: Solve Graphically Instead of Algebraically',ti_ar:'مثال محلول: الحل بيانيًا بدلًا من الجبر',steps:[
    'To solve \\(x^2-4=2x-1\\) graphically, graph both sides as separate functions: \\(y_1=x^2-4\\) and \\(y_2=2x-1\\).',
    'The solutions to the original equation are the x-coordinates where the two graphs intersect.',
    'This avoids algebra entirely — just find the intersection point(s) on your calculator.'
  ],steps_ar:[
    'لحل المعادلة \\(x^2-4=2x-1\\) بيانيًا، مثل كل طرف كدالة منفصلة: \\(y_1=x^2-4\\) و\\(y_2=2x-1\\).',
    'حلول المعادلة الأصلية هي الإحداثيات السينية (x) لنقاط تقاطع المنحنيين.',
    'هذا يجنبك الجبر كليًا — ما عليك سوى العثور على نقاط التقاطع عبر الحاسبة.'
  ]},
  {t:'qc',ti:'Quick Check: Graphical System Solution',ti_ar:'فحص سريع: حل النظام بيانيًا',q:'Graphing \\(y = 2x + 1\\) and \\(y = -x + 7\\) gives an intersection at \\((2, 5)\\). What is the value of \\(x\\)?',q_ar:'تمثيل \\(y = 2x + 1\\) و\\(y = -x + 7\\) بيانيًا يتقاطعان عند \\((2, 5)\\). ما قيمة \\(x\\)؟',o:['2','5','7','1'],o_ar:['2','5','7','1'],a:0,ex:'The solution for \\(x\\) is the x-coordinate of the intersection point, which is 2.',ex_ar:'حل المعادلة بالنسبة لـ x هو الإحداثي السيني لنقطة التقاطع، وهو 2.'}
];

D['sat-functions']=[
  {t:'num',ti:'Numeric Entry: Composite Function Evaluation',q:'If \\(f(x) = 3x - 4\\) and \\(g(x) = x^2 + 2\\), what is the value of \\(f(g(3))\\)?',a:29,ex:'First compute \\(g(3) = 3^2 + 2 = 9 + 2 = 11\\). Then \\(f(11) = 3(11) - 4 = 33 - 4 = 29\\).'},
  {t:'cat',ti:'Categorize: Function Transformations',categories:['Vertical Shift','Horizontal Shift','Reflection across Axis'],items:[
    {s:'\\(f(x) + 5\\)',cat:0},
    {s:'\\(f(x - 3)\\)',cat:1},
    {s:'\\(-f(x)\\)',cat:2},
    {s:'\\(f(x) - 7\\)',cat:0},
    {s:'\\(f(x + 4)\\)',cat:1},
    {s:'\\(f(-x)\\)',cat:2}
  ],ex:'f(x)+k is vertical, f(x-h) is horizontal, -f(x) reflects over x-axis, and f(-x) reflects over y-axis.'},
  {t:'ord',ti:'Order the Steps: Evaluating Nested Functions',prompt:'Arrange the steps to evaluate \\(f(g(2))\\) given \\(f(x) = 3x - 4\\) and \\(g(x) = x^2 + 5\\):',items:[
    'Identify the innermost input: evaluate \\(g(2)\\) first.',
    'Substitute 2 into \\(g(x)\\): \\(g(2) = 2^2 + 5 = 4 + 5 = 9\\).',
    'Substitute the inner result (9) into the outer function \\(f\\): \\(f(9)\\).',
    'Compute the final expression: \\(f(9) = 3(9) - 4 = 27 - 4 = 23\\).'
  ],ex:'Always work from inside outward when evaluating composite functions.'},
  {t:'fn',ti:'Explorer: Function Shift \\((x-h)^2-3\\)',ti_ar:'مستكشف: إزاحة الدالة \\((x-h)^2-3\\)',fns:[{expr:'(x-h)^2-3',color:'#1E3A6E',label:'(x-h)^2-3'}],xrange:[-5,5],yrange:[-4,8],params:[{name:'h',label:'Shift h',min:-3,max:3,step:1,default:0}]},
  {t:'sr',ti:'Worked Example: Evaluate a Composite Function',ti_ar:'مثال محلول: إيجاد قيمة دالة مركّبة',steps:[
    'If \\(f(x)=2x-1\\) and \\(g(x)=x^2\\), find \\(f(g(3))\\). Compute the inner function first: \\(g(3)=3^2=9\\).',
    'Now apply \\(f\\) to that result: \\(f(9)=2(9)-1\\).',
    '\\(f(9)=17\\).'
  ],steps_ar:[
    'إذا كانت \\(f(x)=2x-1\\) و\\(g(x)=x^2\\)، فأوجد \\(f(g(3))\\). احسب الدالة الداخلية أولًا: \\(g(3)=3^2=9\\).',
    'طبّق الدالة \\(f\\) على الناتج: \\(f(9)=2(9)-1\\).',
    '\\(f(9)=17\\).'
  ]},
  {t:'qc',ti:'Quick Check: Function Evaluation',ti_ar:'فحص سريع: حساب قيمة الدالة',q:'If \\(f(x)=x^2+1\\), find \\(f(-2)\\)',q_ar:'إذا كانت \\(f(x)=x^2+1\\)، فأوجد \\(f(-2)\\)',o:['5','3','−3','4'],o_ar:['5','3','−3','4'],a:0,ex:'\\((-2)^2+1=4+1=5\\).',ex_ar:'\\((-2)^2+1=4+1=5\\).'}
];

D['sat-stats']=[
  {t:'num',ti:'Numeric Entry: Interquartile Range (IQR)',q:'A dataset has first quartile \\(Q_1 = 28\\) and third quartile \\(Q_3 = 45\\). What is the interquartile range (IQR)?',a:17,ex:'\\(\\text{IQR} = Q_3 - Q_1 = 45 - 28 = 17\\).'},
  {t:'cat',ti:'Categorize: Center vs Spread Measures',categories:['Measures of Center','Measures of Spread (Variability)'],items:[
    {s:'Mean',cat:0},
    {s:'Median',cat:0},
    {s:'Standard Deviation',cat:1},
    {s:'Interquartile Range (IQR)',cat:1},
    {s:'Range (Max - Min)',cat:1},
    {s:'Mode',cat:0}
  ],ex:'Mean, median, and mode measure center/typical value; standard deviation, IQR, and range measure spread/variability.'},
  {t:'ord',ti:'Order the Steps: Constructing a Margin of Error Interval',prompt:'Arrange the steps to compute and interpret a confidence interval from a survey estimate of 54% with margin of error 3%:',items:[
    'Identify the point estimate from the sample: \\(\\hat{p} = 54\\%\\).',
    'Identify the reported margin of error: \\(MOE = 3\\%\\).',
    'Subtract the margin of error for the lower bound: \\(54\\% - 3\\% = 51\\%\\).',
    'Add the margin of error for the upper bound: \\(54\\% + 3\\% = 57\\%\\).',
    'Conclude that the plausible interval for the TRUE population percentage is \\([51\\%, 57\\%]\\).'
  ],ex:'The margin of error interval [estimate - MOE, estimate + MOE] bounds the true population proportion.'},
  {t:'sr',ti:'Worked Example: Interpreting Margin of Error',ti_ar:'مثال محلول: تفسير هامش الخطأ',steps:[
    'A survey estimates 45% support with margin of error 3%. Interval: \\(45\\%\\pm3\\%\\), giving \\([42\\%,48\\%]\\).',
    'This interval is the best estimate range for the TRUE population percentage — not the sample percentage (which we already know is exactly 45%).',
    'A smaller margin of error means more precision, usually from a larger sample size.'
  ],steps_ar:[
    'يقدّر استطلاع نسبة التأييد بـ 45% بهامش خطأ 3%. الفترة: \\(45\\%\\pm3\\%\\)، أي \\([42\\%,48\\%]\\).',
    'هذه الفترة هي النطاق التقديري لنسبة المجتمع الحقيقية — وليست نسبة العينة (المعروف أنها 45% بالضبط).',
    'هامش الخطأ الأصغر يعني دقة أعلى، وينتج عادةً من عينة أكبر.'
  ]},
  {t:'qc',ti:'Quick Check: Margin of Error',ti_ar:'فحص سريع: هامش الخطأ',q:'Which factor most reduces margin of error?',q_ar:'أي عامل يقلل هامش الخطأ أكثر؟',o:['Larger sample size','Smaller sample size','Higher confidence level','Fewer survey questions'],o_ar:['حجم عينة أكبر','حجم عينة أصغر','مستوى ثقة أعلى','أسئلة استطلاع أقل'],a:0,ex:'Larger samples give more precise (smaller margin of error) estimates.',ex_ar:'العينات الأكبر تعطي تقديرات أكثر دقة (هامش خطأ أصغر).'},
  {t:'tf',ti:'True or False: Sampling & Statistical Inference',ti_ar:'صحيح أم خطأ: المعاينة والاستدلال الإحصائي',
    items:[
      {s:'A random sample from a population allows generalisation to the entire population.',a:true,ex:'Random sampling prevents selection bias and allows inference to the target population.'},
      {s:'An observational study can establish that variable X causes variable Y.',a:false,ex:'Observational studies show correlation, not causation. Only randomized controlled experiments can establish causation.'},
      {s:'Increasing sample size decreases margin of error and narrows confidence intervals.',a:true,ex:'Margin of error is inversely proportional to √n.'},
      {s:'A 95% confidence interval means 95% of individual values in the population fall in that range.',a:false,ex:'It means 95% confidence that the population parameter falls in that interval, not individual data points.'}
    ],
    items_ar:[
      {s:'العينة العشوائية من المجتمع تتيح تعميم النتائج على المجتمع بأكمله.',a:true,ex:'المعاينة العشوائية تمنع التحيز وتسمح بالاستدلال على المجتمع المستهدف.'},
      {s:'الدراسة القائمة على الملاحظة كافية لإثبات أن المتغير X يسبب المتغير Y.',a:false,ex:'الدراسات القائمة على الملاحظة تبيّن الارتباط فقط وليس السببية. التجارب العشوائية المضبوطة وحدها تثبت السببية.'},
      {s:'زيادة حجم العينة تقلل هامش الخطأ وتضيّق فترات الثقة.',a:true,ex:'هامش الخطأ يتناسب عكسيًا مع الجذر التربيعي لحجم العينة.'},
      {s:'فترة ثقة 95% تعني أن 95% من قيم أفراد المجتمع تقع داخل تلك الفترة.',a:false,ex:'تعني أننا واثقون بنسبة 95% أن مَعْلمة المجتمع (المتوسط أو النسبة) تقع في الفترة، وليس كل قيمة فردية.'}
    ]}
];

D['sat-condprob']=[
  {t:'num',ti:'Numeric Entry: Probability of Independent Events',q:'Events A and B are independent with \\(P(A) = 0.4\\) and \\(P(B) = 0.5\\). What is \\(P(A \\text{ and } B)\\)?',a:0.2,ex:'For independent events, \\(P(A \\cap B) = P(A) \\times P(B) = 0.4 \\times 0.5 = 0.2\\).'},
  {t:'ord',ti:'Order the Steps: Computing Conditional Probability from a Table',prompt:'Arrange the steps to compute \\(P(\\text{Junior} \\mid \\text{Pass})\\) from a two-way table:',items:[
    'Identify the given condition: restrict attention only to the column or row for "Pass".',
    'Find the total count for the condition: \\(\\text{Total Pass}\\) serves as the denominator.',
    'Find the joint count: number of students who are BOTH "Junior" and "Pass" for the numerator.',
    'Divide: \\(P = \\frac{\\text{Junior and Pass}}{\\text{Total Pass}}\\).'
  ],ex:'Restrict to the condition subtotal for the denominator, count matching individuals for the numerator, and divide.'},
  {t:'cat',ti:'Categorize: Probability Rules & Conditions',categories:['Multiplication Rule (Independent)','Addition Rule (General)','Complement Rule'],items:[
    {s:'\\(P(A \\cap B) = P(A) \\times P(B)\\)',cat:0},
    {s:'\\(P(A \\cup B) = P(A) + P(B) - P(A \\cap B)\\)',cat:1},
    {s:'\\(P(\\text{at least one}) = 1 - P(\\text{none})\\)',cat:2},
    {s:'Rolling two 6s on consecutive die rolls: \\(1/6 \\times 1/6\\)',cat:0},
    {s:'Probability of event not occurring: \\(1 - P(A)\\)',cat:2}
  ],ex:'Independent events multiply probabilities; inclusive unions subtract the overlap; complement rules simplify at-least-one computations.'},
  {t:'sr',ti:'Worked Example: Conditional Probability from a Table',ti_ar:'مثال محلول: الاحتمال المشروط من جدول',steps:[
    '60 people like tea; of those, 25 also like coffee. Find \\(P(\\text{coffee}\\mid\\text{tea})\\). Formula: \\(P(\\text{coffee}\\mid\\text{tea})=\\dfrac{\\text{both}}{\\text{tea total}}\\).',
    'Substitute: \\(\\dfrac{25}{60}\\).',
    'Simplify: \\(\\dfrac{25}{60}=\\dfrac{5}{12}\\approx0.417\\).'
  ],steps_ar:[
    '60 شخصًا يفضلون الشاي؛ ومنهم 25 يفضلون القهوة أيضًا. أوجد \\(P(\\text{coffee}\\mid\\text{tea})\\). القانون: \\(P(\\text{coffee}\\mid\\text{tea})=\\dfrac{\\text{كلاهما}}{\\text{إجمالي الشاي}}\\).',
    'بالتعويض: \\(\\dfrac{25}{60}\\).',
    'بالتبسيط: \\(\\dfrac{25}{60}=\\dfrac{5}{12}\\approx0.417\\).'
  ]},
  {t:'qc',ti:'Quick Check: Conditional Probability',ti_ar:'فحص سريع: الاحتمال المشروط',q:'\\(P(A\\mid B)\\) is defined as:',q_ar:'\\(P(A\\mid B)\\) يُعرّف بـ:',o:['\\(P(A\\cap B)/P(B)\\)','\\(P(A\\cap B)/P(A)\\)','\\(P(A)+P(B)\\)','\\(P(A)\\times P(B)\\)'],o_ar:['\\(P(A\\cap B)/P(B)\\)','\\(P(A\\cap B)/P(A)\\)','\\(P(A)+P(B)\\)','\\(P(A)\\times P(B)\\)'],a:0,ex:'Conditional probability: \\(P(A\\mid B)=\\dfrac{P(A\\cap B)}{P(B)}\\).',ex_ar:'الاحتمال المشروط: \\(P(A\\mid B)=\\dfrac{P(A\\cap B)}{P(B)}\\).'},
  {t:'sb',ti:'Step Builder: Two-Way Table Conditional Probability',ti_ar:'باني الخطوات: الاحتمال المشروط من جدول التكرار المزدوج',
    steps:[
      {l:'Given 30 freshmen (12 sports, 18 none) and 50 sophomores (20 sports, 30 none). Total playing sports: \\(12 + 20 =\\)',a:'32',h:'32'},
      {l:'Freshmen who play sports: \\(n =\\)',a:'12',h:'12'},
      {l:'\\(P(\\text{freshman} \\mid \\text{sports}) = \\frac{12}{32} = \\frac{3}{?}\\)',a:'8',h:'8'},
      {l:'As a decimal, \\(3 \\div 8 =\\)',a:'0.375',h:'0.375'}
    ],
    steps_ar:[
      {l:'في استطلاع شمل 30 طالب مستجد (12 رياضي، 18 غير رياضي) و50 طالب سنة ثانية (20 رياضي، 30 غير رياضي). إجمالي الرياضيين: \\(12 + 20 =\\)',a:'32',h:'32'},
      {l:'الطلاب المستجدون الرياضيون: \\(n =\\)',a:'12',h:'12'},
      {l:'\\(P(\\text{مستجد} \\mid \\text{رياضي}) = \\frac{12}{32} = \\frac{3}{?}\\)',a:'8',h:'8'},
      {l:'بالصيغة العشرية، \\(3 \\div 8 =\\)',a:'0.375',h:'0.375'}
    ]}
];
});
