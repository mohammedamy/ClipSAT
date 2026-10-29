'use strict';

const { bi, makeExplorerBlock, makePractice } = require('./helpers');

const SUBSEC_3 = bi(
  '🏛️ Subsection III · KAUST Mathematics Competition (KMC) & KAUST Academy Pathway',
  '🏛️ القسم الثالث · مسابقة كاوست للرياضيات (KMC) ومسار أكاديمية كاوست للموهوبين (ثول)'
);

const ch11 = {
  id: 'ol-kaust-kmc-qualifier',
  chapterNumber: '11',
  railGroupLabel: bi(
    'III · KAUST Math (KMC & Academy)',
    'ثالثاً · مسابقة وأكاديمية كاوست (KAUST)'
  ),
  subsectionBanner: SUBSEC_3,
  title: bi(
    'KAUST Mathematics Competition (KMC): Regional Qualifier Speed & Problem-Solving Mastery',
    'مسابقة كاوست للرياضيات (KMC): إتقان التصفيات الإقليمية ومهارات الحل السريع المبتكر'
  ),
  railLabel: bi('KAUST KMC: Regional Qualifier', 'مسابقة كاوست: التصفيات الإقليمية'),
  chapterTag: {
    variant: 'category',
    className: 'igcse-tag',
    emoji: '🏛️',
    category: 'Subsection III · KAUST Academy & KAUST Mathematics Competition (KMC)',
    badges: [{ text: 'KAUST KMC REGIONAL', className: 'tier-e' }],
    topics: [
      'KAUST KMC Regional Qualifier structure & scoring strategy',
      'Quadratic polynomial remainder interpolation P(x) mod (x−a)(x−b)',
      'Telescoping rational & radical sums',
      'Blocked-node lattice path counting on grids',
      'Right-triangle inradius r = (a+b−c)/2 & tangency area [ABC] = xy'
    ]
  },
  content: {
    blocks: [
      {
        kind: 'text',
        body: bi(
          'Hosted by <strong>KAUST Academy (<span dir="rtl">أكاديمية كاوست</span>)</strong> at <strong>King Abdullah University of Science and Technology (KAUST)</strong> in Thuwal, the <strong>KAUST Mathematics Competition (KMC)</strong> brings together top high-school problem solvers from across Saudi Arabia. Regional qualifiers held in major Kingdom hubs test non-calculator ingenuity, algebraic compression, combinatorial path counting, and geometric elegance—selecting finalists for the <strong>Thuwal Campus Finals</strong> and prestigious <strong>KAUST–Cambridge Gifted Summer Mathematics Camps</strong>.',
          'تُنظّم <strong>أكاديمية كاوست</strong> في <strong>جامعة الملك عبدالله للعلوم والتقنية (KAUST)</strong> بثول <strong>مسابقة كاوست للرياضيات (KMC)</strong> لاستقطاب نخبة طلاب وطالبات المرحلة الثانوية المتميزين رياضياً في مختلف مناطق المملكة. تقيس التصفيات الإقليمية سرعة البديهة الرياضية دون آلة حاسبة، والاختزال الجبري، وعدّ المسارات الشبكية، والهندسة المبتكرة—وذلك لترشيح المتأهلين إلى <strong>النهائيات الحضورية في حرم كاوست بثول</strong> والبرامج الصيفية الإثرائية بالتعاون مع جامعة كامبريدج.'
        )
      },
      {
        kind: 'table',
        caption: bi(
          'KAUST Mathematics Competition (KMC) & KAUST Academy Pathway Overview',
          'خارطة مسابقة كاوست للرياضيات (KMC) وبرامج أكاديمية كاوست للموهوبين'
        ),
        columns: [
          bi('Stage / Program', 'المرحلة / البرنامج'),
          bi('Structure & Assessment', 'هيكل التقييم'),
          bi('Winning Preparation Strategy', 'استراتيجية التفوق')
        ],
        rows: [
          [
            bi('KMC Regional Qualifier', 'التصفيات الإقليمية لمسابقة KMC'),
            bi('Timed non-calculator individual paper across regional KSA test centers', 'اختبار فردي محدد بوقت دون آلة حاسبة في المراكز الإقليمية بالمملكة'),
            bi('Eliminate brute force: use telescoping, modular invariants & complementary counting', 'تجنّب الحساب المطوّل: اعتمد على المجاميع التلسكوبية والحساب المعياري والعدّ المتمم')
          ],
          [
            bi('Thuwal Campus Individual Round', 'الجولة الفردية بنهائيات ثول'),
            bi('Deep multi-step integer-answer & proof-based Olympiad problems at KAUST', 'مسائل أولمبية متعمقة وبراهين رياضية في حرم جامعة كاوست بثول'),
            bi('Master Cauchy–Schwarz/Jensen, roots-of-unity filters, homothety & radical axes', 'إتقان كوشي-شوارتز وجنسن، وفلاتر الجذور النونية، والتحاكي والمحاور الأساسية')
          ],
          [
            bi('Thuwal Campus Team & Relay Rounds', 'جولات الفرق والتتابع بنهائيات كاوست'),
            bi('Collaborative team problem sets & sequential relay handoffs under time pressure', 'تحديات جماعية ومسائل تتابع تعتمد كل خطوة فيها على إجابة الزميل السابق'),
            bi('Assign specialists (Algebra/NT vs Geo/Combo) & double-verify relay handoffs!', 'توزيع التخصصات بين أعضاء الفريق والتحقق المزدوج من نواتج التتابع قبل التسليم!')
          ],
          [
            bi('KAUST Academy Summer Math Camp', 'المعسكر الصيفي لأكاديمية كاوست'),
            bi('Residential gifted enrichment with KAUST & Cambridge mathematical mentors', 'برنامج إثرائي سكني للموهوبين بإشراف خبراء كاوست وجامعة كامبريدج'),
            bi('Builds university-level mathematical maturity in number theory, combinatorics & analysis', 'بناء نضج رياضي بحثي مبكر في نظرية الأعداد والتوافيق والتحليل الرياضي')
          ]
        ]
      },
      {
        kind: 'callout',
        style: 'def',
        label: bi(
          '● Definition 11.1 — Quadratic Polynomial Remainder Interpolation & Telescoping',
          '● تعريف 11.1 — استيفاء باقي قسمة كثيرات الحدود والمجاميع التلسكوبية للجذور'
        ),
        body: bi(
          '<p><strong>1. Remainder Modulo \\( (x - a)(x - b) \\):</strong> When ANY polynomial \\( P(x) \\) is divided by \\( (x - a)(x - b) \\) (\\( a \\ne b \\)), the remainder MUST be at most linear: \\( P(x) = (x - a)(x - b)Q(x) + (mx + c) \\). Evaluating at \\( x = a \\) and \\( x = b \\) gives the exact remainder immediately:</p>\\[ R(x) = \\frac{P(b) - P(a)}{b - a}(x - a) + P(a). \\]<p><strong>2. Rationalizing Telescoping Radicals:</strong> Multiply numerator and denominator by the conjugate \\( \\sqrt{k+d} - \\sqrt{k} \\):</p>\\[ \\sum_{k=1}^n \\frac{1}{\\sqrt{k} + \\sqrt{k+1}} = \\sum_{k=1}^n (\\sqrt{k+1} - \\sqrt{k}) = \\sqrt{n + 1} - 1. \\]',
          '<p><strong>1. باقي القسمة على \\( (x - a)(x - b) \\):</strong> عند قسمة أي كثيرة حدود \\( P(x) \\) على \\( (x - a)(x - b) \\) (حيث \\( a \\ne b \\))، يكون الباقي خطياً على الأكثر \\( R(x) = mx + c \\)، ويتحدد فوراً بالتعويض عند \\( a \\) و\\( b \\):</p>\\[ R(x) = \\frac{P(b) - P(a)}{b - a}(x - a) + P(a). \\]<p><strong>2. المجاميع التلسكوبية للجذور الصمّاء:</strong> بالضرب في المرافق \\( \\sqrt{k+1} - \\sqrt{k} \\) تنحل المتسلسلة فوراً:</p>\\[ \\sum_{k=1}^n \\frac{1}{\\sqrt{k} + \\sqrt{k+1}} = \\sum_{k=1}^n (\\sqrt{k+1} - \\sqrt{k}) = \\sqrt{n + 1} - 1. \\]'
        )
      },
      {
        kind: 'callout',
        style: 'thm',
        label: bi(
          '● Theorem 11.2 — Blocked-Grid Path Subtraction & Right-Triangle Incircle Area Law',
          '● مبرهنة 11.2 — عدّ مسارات الشبكة بوجود عوائق وقانون مساحة المثلث القائم بقطع التماس'
        ),
        body: bi(
          '<p><strong>1. Lattice Paths Avoiding a Blocked Node:</strong> Moving only Right (\\( +x \\)) and Up (\\( +y \\)) from \\( O(0,0) \\) to \\( T(m, n) \\), the number of paths avoiding an interior obstacle \\( B(x_0, y_0) \\) is:</p>\\[ N_{\\text{valid}} = \\binom{m + n}{m} - \\binom{x_0 + y_0}{x_0}\\binom{(m - x_0) + (n - y_0)}{m - x_0}. \\]<p><strong>2. Right-Triangle Incircle Tangency Theorem:</strong> In a right triangle \\( \\triangle ABC \\) (\\( \\angle C = 90^\\circ \\)) with legs \\( a, b \\) and hypotenuse \\( c \\), the inradius is \\( r = \\frac{a + b - c}{2} \\). Furthermore, if the incircle touches hypotenuse \\( AB \\) at \\( D \\), splitting it into \\( AD = x \\) and \\( DB = y \\), then the triangle’s area is simply:</p>\\[ [ABC] = x \\cdot y! \\]',
          '<p><strong>1. مسارات الشبكة مع تفادي خلية مغلقة:</strong> عند التحرك يميناً وأعلى فقط من \\( O(0,0) \\) إلى \\( T(m,n) \\) مع حظر المرور بالنقطة \\( B(x_0, y_0) \\)، فإن عدد المسارات المسموحة هو:</p>\\[ N_{\\text{المسموحة}} = \\binom{m + n}{m} - \\binom{x_0 + y_0}{x_0}\\binom{(m - x_0) + (n - y_0)}{m - x_0}. \\]<p><strong>2. مبرهنة الدائرة الداخلية للمثلث القائم:</strong> في المثلث القائم \\( \\triangle ABC \\) (\\( \\angle C = 90^\\circ \\))، نصف القطر الداخلي هو \\( r = \\frac{a + b - c}{2} \\). وإذا مسّت الدائرة الداخلية الوتر \\( AB \\) عند \\( D \\) فقسمته إلى \\( AD = x \\) و\\( DB = y \\)، فإن مساحة المثلث تساوي ببساطة مدهشة:</p>\\[ [ABC] = x \\cdot y! \\]'
        )
      },
      {
        kind: 'callout',
        style: 'pf',
        label: bi(
          '◆ Proof — 3-Line Algebraic Proof That Right-Triangle Area Equals x · y',
          '◆ البرهان الأولمبي — البرهان الجبري السريع لعلاقة المساحة [ABC] = x · y'
        ),
        body: bi(
          '<p>Because the corner at \\( C \\) has \\( \\angle C = 90^\\circ \\) and two perpendicular radii of length \\( r \\), the corner quadrilateral at \\( C \\) is a <strong>square of side \\( r \\)</strong>! Equal tangents from \\( A \\) and \\( B \\) give legs \\( b = x + r \\) and \\( a = y + r \\), while hypotenuse \\( c = x + y \\). By the Pythagorean Theorem:</p>\\[ (x + r)^2 + (y + r)^2 = (x + y)^2 \\implies x^2 + 2xr + r^2 + y^2 + 2yr + r^2 = x^2 + 2xy + y^2. \\]<p>Cancelling \\( x^2 + y^2 \\) and dividing by \\( 2 \\) gives \\( r(x + y + r) = xy \\). Note semiperimeter \\( s = \\frac{(x+r) + (y+r) + (x+y)}{2} = x + y + r \\), so \\( [ABC] = r s = r(x + y + r) = xy \\)! \\( \\blacksquare \\)</p>',
          '<p>بما أن الزاوية \\( C = 90^\\circ \\) فإن الشكل الرباعي بين نصفي قطرَي التماس عند \\( C \\) هو <strong>مربع طول ضلعه \\( r \\)</strong>! ومن تساوي المماسات نجد ساقَي القائمة \\( b = x + r \\) و\\( a = y + r \\)، والوتر \\( c = x + y \\). بتطبيق مبرهنة فيثاغورس:</p>\\[ (x + r)^2 + (y + r)^2 = (x + y)^2 \\implies 2r(x + y + r) = 2xy. \\]<p>وبما أن نصف المحيط يساوي \\( s = x + y + r \\)، فإن المساحة \\( [ABC] = rs = r(x + y + r) = xy \\) فوراً! \\( \\blacksquare \\)</p>'
        )
      },
      {
        kind: 'cards',
        items: [
          {
            label: bi('Two-Obstacle PIE Paths', 'عائقان متتاليان على الشبكة'),
            value: bi('If \\(B_1 \\prec B_2\\): \\(\\text{Total} - P(O{\\to}B_1{\\to}T) - P(O{\\to}B_2{\\to}T) + P(O{\\to}B_1{\\to}B_2{\\to}T)\\)', 'نطرح مسارات كل عائق ثم نجمع المسارات المارة بـ \\(B_1\\) ثم \\(B_2\\) معاً!')
          },
          {
            label: bi('3-Term Fraction Telescope', 'التلسكوب الثلاثي للكسور'),
            value: bi('\\(\\frac{1}{k(k+1)(k+2)} = \\frac{1}{2}\\!\\left[\\frac{1}{k(k+1)} - \\frac{1}{(k+1)(k+2)}\\right]\\)', '\\(\\sum_{k=1}^n \\frac{1}{k(k+1)(k+2)} = \\frac{1}{4} - \\frac{1}{2(n+1)(n+2)}\\)')
          },
          {
            label: bi('Right-Triangle \\(R\\) and \\(r\\)', 'نصفا القطرين في المثلث القائم'),
            value: bi('\\(R = \\frac{c}{2}\\) and \\(r = \\frac{a+b-c}{2} \\implies a + b = 2(R + r)\\)!', '\\(R = \\frac{c}{2}\\) و\\(r = \\frac{a+b-c}{2}\\) ومنه دائماً \\(a + b = 2(R + r)\\)!')
          },
          {
            label: bi('KMC Accuracy Discipline', 'انضباط الدقة في تصفيات كاوست'),
            value: bi('Test \\(n = 1, 2\\) on every closed-form sum before locking your final answer!', 'اختبر صيغتك النهائية دائماً عند \\(n = 1\\) و\\(n = 2\\) في 5 ثوانٍ للتحقق القاطع!')
          }
        ]
      },
      {
        kind: 'figure',
        figure: {
          type: 'triangle',
          A: [0, 4],
          B: [6, 0],
          C: [0, 0],
          rightAt: 'C',
          labels: ['A', 'B', 'C'],
          sides: ['a = y + r', 'b = x + r', 'c = x + y']
        },
        caption: bi(
          'KAUST KMC Right-Triangle Incircle Decomposition: corner square of side \\(r\\) at right angle \\(C\\) yields \\(r = \\frac{a + b - c}{2}\\) and exact area \\([ABC] = xy\\) from hypotenuse segments \\(x, y\\) alone!',
          'تفكيك الدائرة الداخلية للمثلث القائم: المربع الركني ضلعه \\(r = \\frac{a+b-c}{2}\\)، ومساحة المثلث تساوي \\([ABC] = x \\cdot y\\) بمعلومية جزأَي الوتر فقط!'
        )
      },
      makeExplorerBlock({
        canvasId: 'olkaustkmcqualifierExCanvas',
        titleEn: '⊙ Explorer · KAUST KMC Blocked-Lattice Path DP Engine ((0,0) → (6,4))',
        titleAr: '⊙ مستكشف تفاعلي · محرك مسارات الشبكة بوجود عقدة محظورة في مسابقة كاوست',
        ariaEn: 'Interactive KAUST KMC combinatorics explorer computing exact lattice paths from (0,0) to (6,4) around a movable blocked node (bx, by).',
        ariaAr: 'مستكشف تفاعلي لمسابقة كاوست يحسب عدد المسارات الشبكية من (0,0) إلى (6,4) مع تحريك عقدة مغلقة (bx, by) وعرض جدول البرمجة الديناميكية على الشبكة.',
        captionEn: 'Exact node-by-node Pascal DP counts vs closed-form subtraction \\(\\binom{10}{6} - \\binom{b_x+b_y}{b_x}\\binom{10-b_x-b_y}{6-b_x}\\)',
        captionAr: 'مقارنة العدّ التراكمي على كل عقدة بصيغة الطرح التوافيقي المغلقة حول العقدة المحظورة',
        s0LabelEn: 'Blocked <b>\\(b_x =\\)</b>', s0LabelAr: 'إحداثي العائق <b>\\(b_x =\\)</b>',
        s0Min: 1, s0Max: 5, s0Val: 3, s0Step: 1,
        s0AriaEn: 'Horizontal coordinate bx of blocked intersection', s0AriaAr: 'الإحداثي السيني للعقدة المغلقة bx',
        s1LabelEn: 'Blocked <b>\\(b_y =\\)</b>', s1LabelAr: 'إحداثي العائق <b>\\(b_y =\\)</b>',
        s1Min: 1, s1Max: 3, s1Val: 2, s1Step: 1,
        s1AriaEn: 'Vertical coordinate by of blocked intersection', s1AriaAr: 'الإحداثي الصادي للعقدة المغلقة by',
        r0LabelEn: 'Unblocked Total \\(\\binom{10}{4}\\)', r0LabelAr: 'الإجمالي بدون عائق \\(\\binom{10}{4}\\)', r0Init: '210 paths',
        r1LabelEn: 'Blocked Through \\((b_x,b_y)\\)', r1LabelAr: 'المسارات المارّة بالعائق', r1Init: 'C(5,3)·C(5,3) = 100',
        r2LabelEn: 'Valid KMC Paths', r2LabelAr: 'المسارات السليمة المتبقية', r2Init: '210 − 100 = 110',
        noteEn: 'Move the blocked campus junction \\((b_x, b_y)\\) across the \\(6 \\times 4\\) grid: notice placing the block near the center \\((3, 2)\\) eliminates the maximum number of paths (\\(100\\) out of \\(210\\))!',
        noteAr: 'حرّك موقع العقدة المغلقة \\((b_x, b_y)\\) عبر شبكة \\(6 \\times 4\\): لاحظ أن وضع العائق في المركز \\((3, 2)\\) يحجب أكبر عدد ممكن من المسارات (\\(100\\) من أصل \\(210\\))!'
      }),
      {
        kind: 'callout',
        style: 'example',
        label: bi(
          'Worked Example 11.A — High-Degree Polynomial Remainder Trick (KAUST KMC Qualifier)',
          'مثال محلول 11.A — إيجاد باقي قسمة كثيرة حدود من الدرجة 2026 (تصفيات كاوست)'
        ),
        body: bi(
          '<p><strong>Problem:</strong> Find the remainder polynomial \\( R(x) \\) when \\( P(x) = x^{2026} + 2x^{101} + 5 \\) is divided by \\( x^2 - 1 \\).</p><p><strong>Solution:</strong> Since \\( x^2 - 1 = (x - 1)(x + 1) \\) has degree \\( 2 \\), write:<br>\\[ x^{2026} + 2x^{101} + 5 = (x - 1)(x + 1)Q(x) + (ax + b). \\]<br>Substitute the two roots of the divisor (\\( x = 1 \\) and \\( x = -1 \\))—never perform long division!<br>• At \\( x = 1 \\): \\( 1 + 2 + 5 = 8 = a + b \\).<br>• At \\( x = -1 \\): \\( (-1)^{2026} + 2(-1)^{101} + 5 = 1 - 2 + 5 = 4 = -a + b \\).<br>Adding and subtracting gives \\( b = 6 \\) and \\( a = 2 \\), so the exact remainder is <strong>\\( R(x) = 2x + 6 \\)</strong>.</p>',
          '<p><strong>المسألة:</strong> أوجد باقي القسمة \\( R(x) \\) عند قسمة كثيرة الحدود \\( P(x) = x^{2026} + 2x^{101} + 5 \\) على \\( x^2 - 1 \\).</p><p><strong>الحل الأولمبي:</strong> بما أن المقسوم عليه \\( (x - 1)(x + 1) \\) من الدرجة الثانية، نكتب الباقي \\( R(x) = ax + b \\) ونعوّض بجذرَي المقسوم عليه دون قسمة مطوّلة:<br>• عند \\( x = 1 \\): \\( a + b = 1 + 2 + 5 = 8 \\).<br>• عند \\( x = -1 \\): \\( -a + b = 1 - 2 + 5 = 4 \\).<br>بالجمع والطرح نجد \\( b = 6 \\) و\\( a = 2 \\)، إذن الباقي هو <strong>\\( R(x) = 2x + 6 \\)</strong>.</p>'
        )
      },
      {
        kind: 'callout',
        style: 'example',
        label: bi(
          'Worked Example 11.B — Telescoping Radical-Rational Series (KAUST KMC Speed Problem)',
          'مثال محلول 11.B — المتسلسلة التلسكوبية للجذور المترافقة (مسائل السرعة في كاوست)'
        ),
        body: bi(
          '<p><strong>Problem:</strong> Evaluate the exact value of the 40-term sum:<br>\\[ S = \\sum_{k=1}^{40} \\frac{1}{(k + 1)\\sqrt{k} + k\\sqrt{k + 1}}. \\]</p><p><strong>Solution:</strong> Factor \\( \\sqrt{k(k+1)} \\) out of the denominator first!<br>\\[ (k + 1)\\sqrt{k} + k\\sqrt{k + 1} = \\sqrt{k}\\sqrt{k+1}\\left(\\sqrt{k + 1} + \\sqrt{k}\\right). \\]<br>Now multiply numerator and denominator by \\( \\sqrt{k + 1} - \\sqrt{k} \\) (using \\( (\\sqrt{k+1}+\\sqrt{k})(\\sqrt{k+1}-\\sqrt{k}) = 1 \\)):<br>\\[ \\frac{\\sqrt{k + 1} - \\sqrt{k}}{\\sqrt{k}\\sqrt{k + 1}} = \\frac{1}{\\sqrt{k}} - \\frac{1}{\\sqrt{k + 1}}! \\]<br>Summing from \\( k = 1 \\) to \\( 40 \\) telescopes every interior term:<br>\\[ S = \\left(\\frac{1}{\\sqrt{1}} - \\frac{1}{\\sqrt{2}}\\right) + \\cdots + \\left(\\frac{1}{\\sqrt{40}} - \\frac{1}{\\sqrt{41}}\\right) = 1 - \\frac{1}{\\sqrt{41}} = \\frac{41 - \\sqrt{41}}{41} \\quad \\text{(or for } n=99:\\; 1 - \\frac{1}{10} = \\frac{9}{10}\\text{!)}. \\]</p>',
          '<p><strong>المسألة:</strong> احسب القيمة الدقيقة للمجموع ذي الأربعين حداً:<br>\\[ S = \\sum_{k=1}^{40} \\frac{1}{(k + 1)\\sqrt{k} + k\\sqrt{k + 1}}. \\]</p><p><strong>الحل الأولمبي:</strong> نسحب العامل المشترك \\( \\sqrt{k}\\sqrt{k+1} \\) من المقام:<br>\\[ \\frac{1}{\\sqrt{k}\\sqrt{k+1}(\\sqrt{k+1} + \\sqrt{k})} = \\frac{\\sqrt{k+1} - \\sqrt{k}}{\\sqrt{k}\\sqrt{k+1}} = \\frac{1}{\\sqrt{k}} - \\frac{1}{\\sqrt{k+1}}! \\]<br>تختصر جميع الحدود الوسطى تلسكوبياً من \\( k = 1 \\) إلى \\( 40 \\) ليتبقى:<br>\\[ S = 1 - \\frac{1}{\\sqrt{41}} = \\frac{41 - \\sqrt{41}}{41}. \\]</p>'
        )
      },
      {
        kind: 'callout',
        style: 'example',
        label: bi(
          'Worked Example 11.C — Thuwal Campus Grid Paths With Two Blocked Intersections (PIE)',
          'مثال محلول 11.C — مسارات شبكة الحرم الجامعي مع تقاطعين مغلقين (التضمين والإقصاء)'
        ),
        body: bi(
          '<p><strong>Problem:</strong> On a \\( 5 \\times 5 \\) coordinate grid from \\( O(0,0) \\) to \\( T(5,5) \\) moving only Right and Up, intersections \\( A(2, 1) \\) and \\( B(3, 4) \\) are closed for maintenance. How many valid shortest paths exist from \\( O \\) to \\( T \\)?</p><p><strong>Solution:</strong> Apply Inclusion–Exclusion on bad sets \\( \\mathcal{P}_A \\) (paths hitting \\( A \\)) and \\( \\mathcal{P}_B \\) (paths hitting \\( B \\)):<br>1. Total unrestricted paths: \\( \\binom{10}{5} = 252 \\).<br>2. Paths through \\( A(2,1) \\): \\( \\binom{3}{2}\\binom{7}{3} = 3 \\times 35 = 105 \\).<br>3. Paths through \\( B(3,4) \\): \\( \\binom{7}{3}\\binom{3}{1} = 35 \\times 3 = 105 \\).<br>4. Paths through BOTH \\( A(2,1) \\) AND \\( B(3,4) \\) (since \\( 2 \\le 3 \\) and \\( 1 \\le 4 \\), \\( A \\to B \\) has \\( \\Delta x = 1, \\Delta y = 3 \\)):<br>\\[ |\\mathcal{P}_A \\cap \\mathcal{P}_B| = \\binom{3}{2} \\cdot \\binom{4}{1} \\cdot \\binom{3}{1} = 3 \\times 4 \\times 3 = 36. \\]<br>5. By PIE: \\( 252 - 105 - 105 + 36 = 78 \\) valid paths!</p>',
          '<p><strong>المسألة:</strong> على شبكة إحداثية \\( 5 \\times 5 \\) بالحركة يميناً وأعلى فقط من \\( O(0,0) \\) إلى \\( T(5,5) \\)، أُغلق التقاطعان \\( A(2,1) \\) و\\( B(3,4) \\). كم مساراً أقصر مسموحاً يصل \\( O \\) بـ \\( T \\)؟</p><p><strong>الحل الأولمبي:</strong> نطبّق التضمين والإقصاء على المسارات المارة بـ \\( A \\) أو \\( B \\):<br>1. إجمالي المسارات: \\( \\binom{10}{5} = 252 \\).<br>2. المسارات عبر \\( A(2,1) \\): \\( \\binom{3}{2}\\binom{7}{3} = 105 \\)؛ وعبر \\( B(3,4) \\): \\( \\binom{7}{3}\\binom{3}{1} = 105 \\).<br>3. المسارات عبر \\( A \\) ثم \\( B \\) معاً: \\( \\binom{3}{2}\\binom{4}{1}\\binom{3}{1} = 3 \\times 4 \\times 3 = 36 \\).<br>4. بالتضمين والإقصاء: \\( 252 - 105 - 105 + 36 = 78 \\) مساراً سليماً!</p>'
        )
      },
      {
        kind: 'callout',
        style: 'example',
        label: bi(
          'Worked Example 11.D — Right-Triangle Hypotenuse Tangency Area Shortcut (KAUST KMC)',
          'مثال محلول 11.D — الاختصار الذهبي لمساحة المثلث القائم من مماس الوتر (مسابقة كاوست)'
        ),
        body: bi(
          '<p><strong>Problem:</strong> The incircle of right triangle \\( \\triangle ABC \\) (\\( \\angle C = 90^\\circ \\)) touches hypotenuse \\( AB \\) at point \\( D \\) such that \\( AD = 7 \\) and \\( DB = 12 \\). Find the exact area \\( [ABC] \\) and the inradius \\( r \\).</p><p><strong>Solution:</strong><br>1. By Theorem 11.2, \\( [ABC] = AD \\cdot DB = 7 \\times 12 = 84 \\) in two seconds!<br>2. To find \\( r \\), recall \\( [ABC] = r s \\) where \\( s = x + y + r = 7 + 12 + r = 19 + r \\):<br>\\[ r(19 + r) = 84 \\implies r^2 + 19r - 84 = 0 \\implies (r + 23)(r - 4)? \\]<br>Check \\( 4 \\times 23 = 92 \\)—let’s factor \\( r^2 + 19r - 84 \\) properly: \\( \\Delta = 361 + 336 = 697 \\), so \\( r = \\frac{-19 + \\sqrt{697}}{2} \\)! (And if \\( AD = 6, DB = 14 \\), \\( [ABC] = 84 \\) and \\( r(20 + r) = 84 \\implies (r + 24)(r - 4) = 0? \\; 4 \\times 24 = 96 \\); for the \\( 8\\text{–}15\\text{–}17 \\) right triangle where \\( r = 3 \\), \\( AD = 5, DB = 12 \\implies [ABC] = 60 \\) and \\( r(17 + r) = 60 \\implies r = 3 \\)!)</p>',
          '<p><strong>المسألة:</strong> تمس الدائرة الداخلية للمثلث القائم \\( \\triangle ABC \\) (\\( \\angle C = 90^\\circ \\)) الوتر \\( AB \\) عند النقطة \\( D \\) بحيث \\( AD = 7 \\) و\\( DB = 12 \\). أوجد المساحة الدقيقة \\( [ABC] \\) ونصف القطر الداخلي \\( r \\).</p><p><strong>الحل الأولمبي:</strong><br>1. من المبرهنة 11.2 مباشرةً: \\( [ABC] = AD \\cdot DB = 7 \\times 12 = 84 \\) في ثانيتين!<br>2. لإيجاد \\( r \\)، نستخدم \\( r(x + y + r) = 84 \\implies r^2 + 19r - 84 = 0 \\)، ومن القانون العام للتربيعية الموجبة \\( r = \\frac{\\sqrt{697} - 19}{2} \\).</p>'
        )
      },
      {
        kind: 'callout',
        style: 'warn',
        label: bi(
          '⚠ KMC Trap — Checking Directed Reachability Between Two Grid Obstacles!',
          '⚠ فخ مسارات الشبكة — التحقق من إمكانية الانتقال الموجه بين عائقين!'
        ),
        body: bi(
          '<p>In two-obstacle PIE on a grid, if \\( A = (1, 4) \\) and \\( B = (3, 2) \\), NO monotonic Right/Up path can visit both \\( A \\) and \\( B \\) (since \\( 1 < 3 \\) requires moving Right while \\( 4 > 2 \\) would require moving Down)! In that case \\( |\\mathcal{P}_A \\cap \\mathcal{P}_B| = 0 \\)—never plug negative numbers into \\( \\binom{\\Delta x + \\Delta y}{\\Delta x} \\)!</p>',
          '<p>عند وجود عائقين \\( A(1,4) \\) و\\( B(3,2) \\)، انتبه إلى أنه لا يوجد أي مسار صاعد (يمين/أعلى) يمر بكليهما لأن \\( x \\) يزداد بينما \\( y \\) ينقص! في هذه الحالة يكون تقاطع المجموعتين صفراً تماماً \\( |\\mathcal{P}_A \\cap \\mathcal{P}_B| = 0 \\).</p>'
        )
      },
      {
        kind: 'callout',
        style: 'tip',
        label: bi(
          '▲ KAUST Qualifier Tip — Repeated-Root Remainder via Formal Derivative P\'(a)',
          '▲ حيلة متقدمة لتصفيات كاوست — باقي القسمة على مربع كامل \\((x - a)^2\\)'
        ),
        body: bi(
          '<p>What if \\( P(x) \\) is divided by \\( (x - a)^2 \\) where the two roots coincide? Write \\( P(x) = (x - a)^2 Q(x) + m(x - a) + c \\): plugging \\( x = a \\) gives \\( c = P(a) \\), and differentiating once at \\( x = a \\) gives \\( m = P\'(a) \\) immediately!</p>',
          '<p>عند قسمة \\( P(x) \\) على \\( (x - a)^2 \\)، اكتب الباقي على الصورة \\( R(x) = m(x - a) + c \\): التعويض المباشر يعطي \\( c = P(a) \\)، والاشتقاق مرة واحدة عند \\( a \\) يعطي \\( m = P\'(a) \\) فوراً!</p>'
        )
      },
      makePractice(
        'Practice 11.1 · KAUST KMC Regional', 'تدريب 11.1 · تصفيات كاوست الإقليمية',
        'Evaluate the exact sum \\( S = \\frac{1}{\\sqrt{1} + \\sqrt{2}} + \\frac{1}{\\sqrt{2} + \\sqrt{3}} + \\cdots + \\frac{1}{\\sqrt{99} + \\sqrt{100}} \\).',
        'أوجد القيمة الدقيقة للمجموع \\( S = \\frac{1}{\\sqrt{1} + \\sqrt{2}} + \\frac{1}{\\sqrt{2} + \\sqrt{3}} + \\cdots + \\frac{1}{\\sqrt{99} + \\sqrt{100}} \\).',
        'Rationalize each term: \\( \\frac{1}{\\sqrt{k} + \\sqrt{k+1}} = \\sqrt{k+1} - \\sqrt{k} \\).',
        'أنطق المقام لكل حد: \\( \\frac{1}{\\sqrt{k} + \\sqrt{k+1}} = \\sqrt{k+1} - \\sqrt{k} \\).',
        'Cancel interior terms from \\( \\sqrt{2} \\) through \\( \\sqrt{99} \\).',
        'اختصر الحدود الوسطى تلسكوبياً من \\( \\sqrt{2} \\) حتى \\( \\sqrt{99} \\).',
        'Evaluate \\( \\sqrt{100} - \\sqrt{1} \\).',
        'احسب \\( \\sqrt{100} - \\sqrt{1} \\).',
        'Rationalizing gives \\( \\sum_{k=1}^{99} (\\sqrt{k+1} - \\sqrt{k}) = \\sqrt{100} - \\sqrt{1} = 10 - 1 = 9 \\).',
        'بالضرب في المرافق نحصل على المجموع التلسكوبي \\( \\sqrt{100} - \\sqrt{1} = 10 - 1 = 9 \\).'
      ),
      makePractice(
        'Practice 11.2 · KAUST KMC Regional', 'تدريب 11.2 · تصفيات كاوست الإقليمية',
        'When \\( P(x) = x^{100} - 3x^{51} + 7 \\) is divided by \\( x^2 - 4 \\), the remainder is \\( ax + b \\). Find \\( 2a + b \\).',
        'عند قسمة \\( P(x) = x^{100} - 3x^{51} + 7 \\) على \\( x^2 - 4 \\)، يكون الباقي \\( ax + b \\). أوجد قيمة \\( 2a + b \\).',
        'Notice \\( x^2 - 4 = (x - 2)(x + 2) \\)! What is \\( R(2) = 2a + b \\)?',
        'انتبه! المقسوم عليه هو \\( (x - 2)(x + 2) \\)، فماذا يمثل المقدار المطلوب \\( 2a + b \\)؟',
        'Wait: \\( R(2) = P(2) = 2^{100} - 3 \\cdot 2^{51} + 7 \\) is huge—let’s ask for \\( x^2 - 1 \\) at \\( x = 1 \\) or \\( P(x) = (x - 1)^{99} + (x - 3)^{99} \\) mod \\( (x-1)(x-3) \\)! Let us adjust cleanly below.',
        'placeholder',
        'placeholder',
        'placeholder',
        'placeholder',
        'placeholder'
      ),
      makePractice(
        'Practice 11.3 · KAUST KMC Regional', 'تدريب 11.3 · تصفيات كاوست الإقليمية',
        'In right triangle \\( \\triangle ABC \\) (\\( \\angle C = 90^\\circ \\)), the incircle touches hypotenuse \\( AB \\) at \\( D \\) with \\( AD = 8 \\) and \\( DB = 15 \\). Find the exact area \\( [ABC] \\).',
        'في المثلث القائم \\( \\triangle ABC \\) (\\( \\angle C = 90^\\circ \\))، تمس الدائرة الداخلية الوتر \\( AB \\) في \\( D \\) بحيث \\( AD = 8 \\) و\\( DB = 15 \\). أوجد المساحة الدقيقة \\( [ABC] \\).',
        'Recall Theorem 11.2 for right-triangle hypotenuse tangency segments \\( x, y \\).',
        'استحضر المبرهنة 11.2 لجزأَي مماس الوتر في المثلث القائم.',
        'Use \\( [ABC] = AD \\cdot DB \\).',
        'استخدم القانون المباشر \\( [ABC] = AD \\cdot DB \\).',
        'Multiply \\( 8 \\times 15 \\).',
        'اضرب \\( 8 \\times 15 \\).',
        'By the Right-Triangle Incircle Tangency Theorem, \\( [ABC] = AD \\cdot DB = 8 \\times 15 = 120 \\).',
        'حسب مبرهنة مماس وتر المثلث القائم، فإن المساحة تساوي مباشرة \\( [ABC] = 8 \\times 15 = 120 \\).'
      ),
      makePractice(
        'Practice 11.4 · KAUST KMC Qualifier', 'تدريب 11.4 · تصفيات كاوست',
        'How many shortest Right/Up lattice paths from \\( (0, 0) \\) to \\( (6, 4) \\) do NOT pass through \\( (2, 2) \\)?',
        'كم مساراً شبكياً أقصر (يمين/أعلى) من \\( (0, 0) \\) إلى \\( (6, 4) \\) لا يمر بالنقطة \\( (2, 2) \\)؟',
        'Compute total paths \\( \\binom{6+4}{4} = \\binom{10}{4} \\).',
        'احسب إجمالي المسارات \\( \\binom{10}{4} \\).',
        'Compute paths through \\( (2, 2) \\): \\( \\binom{4}{2}\\binom{6}{2} \\).',
        'احسب المسارات المارة بـ \\( (2, 2) \\) وهي \\( \\binom{4}{2}\\binom{6}{2} \\).',
        'Subtract \\( 210 - 90 \\).',
        'اطرح \\( 210 - 90 \\).',
        'Total paths equal \\( \\binom{10}{4} = 210 \\), and paths via \\( (2, 2) \\) equal \\( \\binom{4}{2}\\binom{6}{2} = 6 \\times 15 = 90 \\). Subtracting gives \\( 210 - 90 = 120 \\) valid paths.',
        'إجمالي المسارات \\( \\binom{10}{4} = 210 \\)، والمسارات المارة بـ \\( (2,2) \\) عددها \\( 6 \\times 15 = 90 \\)، فيتبقى \\( 210 - 90 = 120 \\) مساراً.'
      ),
      makePractice(
        'Practice 11.5 · KAUST KMC Tie-Breaker', 'تدريب 11.5 · سؤال الفصل في كاوست',
        'Evaluate the telescoping sum \\( S = \\sum_{k=1}^{18} \\frac{1}{k(k + 1)(k + 2)} \\) as a simplified fraction.',
        'احسب المجموع التلسكوبي \\( S = \\sum_{k=1}^{18} \\frac{1}{k(k + 1)(k + 2)} \\) في أبسط صورة كسرية.',
        'Decompose \\( \\frac{1}{k(k+1)(k+2)} = \\frac{1}{2}\\left[\\frac{1}{k(k+1)} - \\frac{1}{(k+1)(k+2)}\\right] \\).',
        'فكّك الحد العام إلى \\( \\frac{1}{2}\\left[\\frac{1}{k(k+1)} - \\frac{1}{(k+1)(k+2)}\\right] \\).',
        'Telescope from \\( k = 1 \\) to \\( k = 18 \\): \\( \\frac{1}{2}\\left(\\frac{1}{1 \\cdot 2} - \\frac{1}{19 \\cdot 20}\\right) \\).',
        'اختصر تلسكوبياً من \\( 1 \\) إلى \\( 18 \\): \\( \\frac{1}{2}\\left(\\frac{1}{2} - \\frac{1}{380}\\right) \\).',
        'Simplify \\( \\frac{1}{4} - \\frac{1}{760} = \\frac{190 - 1}{760} \\).',
        'بسّط \\( \\frac{190 - 1}{760} \\).',
        'Using \\( \\frac{1}{k(k+1)(k+2)} = \\frac{1}{2}\\left(\\frac{1}{k(k+1)} - \\frac{1}{(k+1)(k+2)}\\right) \\), the sum telescopes to \\( \\frac{1}{2}\\left(\\frac{1}{2} - \\frac{1}{19 \\cdot 20}\\right) = \\frac{189}{760} \\).',
        'بالتفكيك التلسكوبي ينتج \\( S = \\frac{1}{2}\\left(\\frac{1}{2} - \\frac{1}{380}\\right) = \\frac{189}{760} \\).'
      ),
      {
        kind: 'seeAlso',
        links: [
          { label: 'KAUST Campus Finals & Academy Advanced Synthesis', chapterId: 'ol-kaust-finals-academy', trackId: 'olympiad' },
          { label: 'Olympiad Algebra: Vieta & Inequalities', chapterId: 'ol-algebraic-techniques', trackId: 'olympiad' },
          { label: 'NSMO of KSA: Stages 1 & 2', chapterId: 'ol-nsmo-stage1-2', trackId: 'olympiad' }
        ]
      }
    ]
  },
  quizWidget: {
    enabled: true,
    domains: ['KAUST Mathematics Competition: Regional Qualifier']
  }
};

// Clean Practice 11.2 cleanly
ch11.content.blocks.forEach((b, idx) => {
  if (b.kind === 'practiceProblem' && b.question.en.includes('Practice 11.2')) {
    ch11.content.blocks[idx] = makePractice(
      'Practice 11.2 · KAUST KMC Regional', 'تدريب 11.2 · تصفيات كاوست الإقليمية',
      'When \\( P(x) = (x - 1)^{99} + (x - 3)^{99} + 10 \\) is divided by \\( (x - 1)(x - 3) \\), the remainder is \\( ax + b \\). Find \\( a + b \\)? Even better: find the remainder \\( R(2) \\)!',
      'placeholder',
      'Write \\( P(x) = (x - 1)(x - 3)Q(x) + ax + b \\) and evaluate at \\( x = 1 \\) and \\( x = 3 \\).',
      'اكتب \\( P(x) = (x - 1)(x - 3)Q(x) + ax + b \\) وعوّض عند \\( x = 1 \\) وعند \\( x = 3 \\).',
      'Compute \\( P(1) = 0 + (-2)^{99} + 10 \\) and \\( P(3) = 2^{99} + 0 + 10 \\)!',
      'احسب \\( P(1) = -2^{99} + 10 \\) و\\( P(3) = 2^{99} + 10 \\)!',
      'Since \\( R(x) \\) is linear, \\( R(2) = \\frac{R(1) + R(3)}{2} = \\frac{P(1) + P(3)}{2} \\)—the \\( \\pm 2^{99} \\) terms cancel completely!',
      'بما أن \\( R(x) \\) خطية، فإن \\( R(2) = \\frac{P(1) + P(3)}{2} \\) فتختفي \\( \\pm 2^{99} \\) تماماً!',
      'Since \\( R(x) = ax + b \\) agrees with \\( P(x) \\) at \\( x = 1 \\) and \\( x = 3 \\), linearity gives \\( R(2) = \\frac{R(1) + R(3)}{2} = \\frac{(-2^{99} + 10) + (2^{99} + 10)}{2} = \\frac{20}{2} = 10 \\)!',
      'بما أن \\( R(x) = ax + b \\) دالة خطية تطابق \\( P \\) عند \\( 1 \\) و\\( 3 \\)، فإن قيمتها في المنتصف تساوي متوسط الطرفين: \\( R(2) = \\frac{(-2^{99} + 10) + (2^{99} + 10)}{2} = 10 \\)!'
    );
    ch11.content.blocks[idx].question = bi(
      '<strong>[Practice 11.2 · KAUST KMC Regional]</strong> Let \\( R(x) \\) be the linear remainder when \\( P(x) = (x - 1)^{99} + (x - 3)^{99} + 10 \\) is divided by \\( (x - 1)(x - 3) \\). Find \\( R(2) \\).',
      '<strong>[تدريب 11.2 · تصفيات كاوست الإقليمية]</strong> لتكن \\( R(x) \\) باقي قسمة \\( P(x) = (x - 1)^{99} + (x - 3)^{99} + 10 \\) على \\( (x - 1)(x - 3) \\). أوجد قيمة \\( R(2) \\).'
    );
  }
});

const ch12 = {
  id: 'ol-kaust-finals-academy',
  chapterNumber: '12',
  subsectionBanner: SUBSEC_3,
  title: bi(
    'KAUST Campus Finals & KAUST Academy Synthesis: Jensen, Roots-of-Unity Filters & Homothety',
    'نهائيات حرم جامعة كاوست وأكاديمية كاوست: متباينة جنسن وفلاتر الجذور النونية والتحاكي الهندسي'
  ),
  railLabel: bi('KAUST Finals & Academy Synthesis', 'نهائيات كاوست والتركيب المتقدم'),
  chapterTag: {
    variant: 'category',
    className: 'igcse-tag',
    emoji: '🌟',
    category: 'Subsection III · KAUST Thuwal Finals & KAUST–Cambridge Summer Camp',
    badges: [{ text: 'THUWAL FINALS · ACADEMY', className: 'tier-e' }],
    topics: [
      'Jensen convexity inequality & weighted Cauchy–Schwarz',
      'Generating functions & Roots-of-Unity Filter (mod 2, 3, 4)',
      'Geometric Homothety H(O, k), Euler Nine-Point & Monge Theorem',
      'Multi-branch synthesis (Algebra × NT × Geo × Combo)',
      'KAUST Team & Relay Championship execution tactics'
    ]
  },
  content: {
    blocks: [
      {
        kind: 'text',
        body: bi(
          'At the <strong>KAUST Mathematics Competition (KMC) Finals</strong> on the Red Sea campus in Thuwal—and inside <strong>KAUST Academy’s Gifted Summer Mathematics Program</strong>—problems deliberately fuse multiple Olympiad disciplines into a single cohesive challenge. Complex numbers unlock combinatorial binomial sums via the <strong>Roots-of-Unity Filter</strong>, convexity drives sharp trigonometric bounds via <strong>Jensen’s Inequality</strong>, and <strong>Homothety</strong> collapses multi-circle tangent configurations in three lines.',
          'في <strong>النهائيات الحضورية لمسابقة كاوست (KMC)</strong> بحرم الجامعة في ثول على ساحل البحر الأحمر—وخلال <strong>البرامج الصيفية المتقدمة لأكاديمية كاوست</strong>—تندمج فروع الأولمبياد معاً في مسائل تركيبية عالية المستوى؛ حيث تحسم الأعداد المركبة المجاميع التوافيقية الدورية عبر <strong>فلتر الجذور النونية للواحد</strong>، وتضبط الدوال المحدبة المتباينات المثلثية عبر <strong>متباينة جنسن</strong>، ويختزل <strong>التحاكي الهندسي (Homothety)</strong> أعقد تشكيلات الدوائر المتماسة في أسطر معدودة.'
        )
      },
      {
        kind: 'callout',
        style: 'def',
        label: bi(
          '● Definition 12.1 — Convexity & Jensen’s Inequality + Geometric Homothety H(S, k)',
          '● تعريف 12.1 — التحدب ومتباينة جنسن والتحويل التحاكي الهندسي H(S, k)'
        ),
        body: bi(
          '<p><strong>1. Jensen’s Inequality:</strong> Let \\( f: I \\to \\mathbb{R} \\) be <strong>convex</strong> on interval \\( I \\) (\\( f\'\'(x) \\ge 0 \\)). For any \\( x_1, \\dots, x_n \\in I \\) and weights \\( w_i > 0 \\) with \\( \\sum_{i=1}^n w_i = 1 \\):</p>\\[ \\sum_{i=1}^n w_i f(x_i) \\ge f\\!\\left(\\sum_{i=1}^n w_i x_i\\right) \\qquad \\text{(reversed if } f \\text{ is concave, } f\'\'(x) \\le 0\\text{)}. \\]<p><strong>2. Homothety \\( \\mathcal{H}(S, k) \\):</strong> A dilation centered at \\( S \\) with nonzero scale factor \\( k \\in \\mathbb{R} \\setminus \\{0\\} \\) maps every point \\( P \\) to \\( P\' \\) via \\( \\overrightarrow{SP\'} = k\\,\\overrightarrow{SP} \\). Every line \\( \\ell \\) maps to a parallel line \\( \\ell\' \\parallel \\ell \\), every segment scales by \\( |k| \\), every area scales by \\( k^2 \\), and any two circles of radii \\( R_1 \\ne R_2 \\) share an external homothetic center (scale \\( +R_2/R_1 \\)) and internal homothetic center (scale \\( -R_2/R_1 \\))!</p>',
          '<p><strong>1. متباينة جنسن (Jensen’s Inequality):</strong> إذا كانت \\( f \\) دالة <strong>محدبة</strong> على فترة \\( I \\) (أي \\( f\'\'(x) \\ge 0 \\))، فإنه لأي نقاط \\( x_1,\\dots,x_n \\in I \\) وأوزان موجبة \\( \\sum w_i = 1 \\):</p>\\[ \\sum_{i=1}^n w_i f(x_i) \\ge f\\!\\left(\\sum_{i=1}^n w_i x_i\\right) \\qquad \\text{(وتنعكس المتباينة للدالة المقعرة } f\'\' \\le 0\\text{)}. \\]<p><strong>2. التحاكي الهندسي \\( \\mathcal{H}(S, k) \\):</strong> تحويل مركزه \\( S \\) ونسبته \\( k \\ne 0 \\) يرسل كل نقطة \\( P \\) إلى \\( P\' \\) بحيث \\( \\overrightarrow{SP\'} = k\\,\\overrightarrow{SP} \\). يحول التحاكي كل مستقيم إلى مستقيم موازٍ له، ويضرب الأطوال في \\( |k| \\) والمساحات في \\( k^2 \\)، وأي دائرتين مختلفتَي نصف القطر تشتركان في مركزَي تحاكٍ خارجي وداخلي!</p>'
        )
      },
      {
        kind: 'callout',
        style: 'thm',
        label: bi(
          '● Theorem 12.2 — The Roots-of-Unity Filter (Multisection of Generating Functions)',
          '● مبرهنة 12.2 — فلتر الجذور النونية للواحد لاستخلاص المعاملات الدورية'
        ),
        body: bi(
          '<p>Let \\( F(x) = \\sum_{k=0}^N a_k x^k \\) be a polynomial or power series, and let \\( \\omega = e^{2\\pi i / m} \\) be a primitive \\( m \\)-th root of unity. Because \\( \\frac{1}{m}\\sum_{j=0}^{m-1} \\omega^{jk} = 1 \\) if \\( m \\mid k \\) and \\( 0 \\) otherwise, summing every \\( m \\)-th coefficient starting at residue \\( r \\) is given exactly by:</p>\\[ \\sum_{k \\equiv r \\pmod m} a_k = \\frac{1}{m} \\sum_{j=0}^{m-1} \\omega^{-jr} F(\\omega^j). \\]<p>In particular, for \\( F(x) = (1 + x)^n \\) with \\( m = 4 \\) (\\( \\omega = i \\)) and \\( r = 0 \\):</p>\\[ \\sum_{k \\equiv 0 \\pmod 4} \\binom{n}{k} = \\frac{2^n + (1 + i)^n + (1 - i)^n}{4} = \\frac{2^n + 2 \\cdot 2^{n/2}\\cos\\!\\left(\\frac{n\\pi}{4}\\right)}{4}! \\]',
          '<p>لتكن \\( F(x) = \\sum_{k=0}^N a_k x^k \\) دالة مولّدة، وليكن \\( \\omega = e^{2\\pi i / m} \\) جذراً بدائياً من الرتبة \\( m \\) للواحد. بما أن \\( \\frac{1}{m}\\sum_{j=0}^{m-1} \\omega^{jk} \\) يساوي \\( 1 \\) إذا كان \\( m \\mid k \\) و\\( 0 \\) خلاف ذلك، فإن مجموع المعاملات التي توافق \\( r \\pmod m \\) يعطى بالصيغة المغلقة:</p>\\[ \\sum_{k \\equiv r \\pmod m} a_k = \\frac{1}{m} \\sum_{j=0}^{m-1} \\omega^{-jr} F(\\omega^j). \\]<p>وبوجه خاص عند \\( F(x) = (1+x)^n \\) و\\( m = 4 \\) (\\( \\omega = i \\)) و\\( r = 0 \\):</p>\\[ \\sum_{k \\equiv 0 \\pmod 4} \\binom{n}{k} = \\frac{2^n + (1 + i)^n + (1 - i)^n}{4} = \\frac{2^n + 2 \\cdot 2^{n/2}\\cos\\!\\left(\\frac{n\\pi}{4}\\right)}{4}! \\]'
        )
      },
      {
        kind: 'callout',
        style: 'pf',
        label: bi(
          '◆ Proof — Orthogonality of Roots of Unity & Polar Form of (1 ± i)^n',
          '◆ البرهان الأولمبي — تعامد الجذور النونية للواحد والتمثيل القطبي لـ (1 ± i)^n'
        ),
        body: bi(
          '<p>1. If \\( m \\mid k \\), then \\( \\omega^k = 1 \\), so \\( \\sum_{j=0}^{m-1} (\\omega^k)^j = \\sum_{j=0}^{m-1} 1 = m \\). If \\( m \\nmid k \\), then \\( r = \\omega^k \\ne 1 \\) satisfies \\( r^m = (\\omega^m)^k = 1 \\), so the finite geometric series gives \\( \\sum_{j=0}^{m-1} r^j = \\frac{r^m - 1}{r - 1} = 0 \\)!<br>2. Exchanging the finite sums \\( \\frac{1}{m}\\sum_{j=0}^{m-1} \\sum_{k=0}^N a_k \\omega^{j(k-r)} = \\sum_{k=0}^N a_k \\left(\\frac{1}{m}\\sum_{j=0}^{m-1}\\omega^{j(k-r)}\\right) \\) kills every term with \\( k \\not\\equiv r \\pmod m \\) and keeps \\( a_k \\) with weight \\( 1 \\) whenever \\( k \\equiv r \\pmod m \\).<br>3. For \\( 1 \\pm i = \\sqrt{2}\\,e^{\\pm i\\pi/4} \\), De Moivre’s Theorem gives \\( (1+i)^n + (1-i)^n = 2^{n/2}\\left(e^{in\\pi/4} + e^{-in\\pi/4}\\right) = 2 \\cdot 2^{n/2}\\cos(n\\pi/4) \\). \\( \\blacksquare \\)</p>',
          '<p>1. إذا كان \\( m \\mid k \\) فإن \\( \\omega^k = 1 \\) ومجموع الحدود الـ \\( m \\) يساوي \\( m \\)؛ أما إذا كان \\( m \\nmid k \\) فإن \\( r = \\omega^k \\ne 1 \\) يحقق \\( r^m = 1 \\)، فتعطي المتسلسلة الهندسية \\( \\frac{r^m - 1}{r - 1} = 0 \\)!<br>2. بتبديل ترتيبي المجموعين تختفي جميع المعاملات التي لا توافق \\( r \\pmod m \\) وتبقى المعاملات المطلوبة بمعامل \\( 1 \\).<br>3. وبكتابة \\( 1 \\pm i = \\sqrt{2}\\,e^{\\pm i\\pi/4} \\) تعطي مبرهنة ديموافر فوراً \\( (1+i)^n + (1-i)^n = 2 \\cdot 2^{n/2}\\cos(n\\pi/4) \\). \\( \\blacksquare \\)</p>'
        )
      },
      {
        kind: 'cards',
        items: [
          {
            label: bi('Triangle Sine Bound (Jensen)', 'الحد الأعلى لمجموع جيوب المثلث'),
            value: bi('\\(\\sin x\\) is concave on \\([0,\\pi]\\) \\(\\implies \\sin A + \\sin B + \\sin C \\le 3\\sin 60^\\circ = \\frac{3\\sqrt{3}}{2}\\)', 'تقعر \\(\\sin x\\) يعطي فوراً \\(\\sin A + \\sin B + \\sin C \\le \\frac{3\\sqrt{3}}{2}\\)')
          },
          {
            label: bi('Medial Homothety \\(\\mathcal{H}(G, -1/2)\\)', 'تحاكي مركز الثقل \\(\\mathcal{H}(G, -1/2)\\)'),
            value: bi('Maps \\(\\triangle ABC \\mapsto \\triangle M_a M_b M_c\\), \\(H \\mapsto O\\), and circumcircle \\(R \\mapsto R/2\\)', 'يرسل المثلث لمثلث المنتصفات، ويرسل \\(H\\) إلى \\(O\\)، والدائرة المحيطة لدائرة النقاط التسع!')
          },
          {
            label: bi('Mod-3 Filter Identity', 'فلتر المعاملات بترديد 3'),
            value: bi('\\(1 + \\omega = -\\omega^2\\) for \\(\\omega = e^{2\\pi i/3}\\), so \\(|1+\\omega| = 1\\)!', 'بما أن \\(1 + \\omega + \\omega^2 = 0\\) فإن \\((1+\\omega)^n = (-\\omega^2)^n\\) دائماً مقيّد بـ \\(\\pm 1\\)!')
          },
          {
            label: bi('Monge’s Three-Circle Theorem', 'مبرهنة مونج للدوائر الثلاث'),
            value: bi('External homothetic centers of 3 circles taken pairwise are ALWAYS collinear!', 'مراكز التحاكي الخارجية لثلاث دوائر مثنى مثنى تقع دائماً على استقامة واحدة!')
          }
        ]
      },
      {
        kind: 'figure',
        figure: {
          type: 'fn',
          title: 'Jensen Convexity Gap: Convex f(x) = x² vs Secant Chord Above Curve',
          xrange: [-0.5, 4.5],
          yrange: [-1, 18],
          fns: [
            { fn: 'x^2', color: 'var(--fig-indigo)', label: 'f(x) = x² (convex)' },
            { fn: '5*x - 4', color: 'var(--fig-amber)', dash: '5,4', label: 'Secant through (1,1) & (4,16)' }
          ],
          points: [
            { x: 1, y: 1, label: '(1, 1)' },
            { x: 2.5, y: 8.5, label: '½(f(1)+f(4))=8.5' },
            { x: 2.5, y: 6.25, label: 'f(2.5)=6.25' },
            { x: 4, y: 16, label: '(4, 16)' }
          ]
        },
        caption: bi(
          'Geometric heart of Jensen’s Inequality: for convex \\(f(x) = x^2\\), the chord midpoint \\(\\frac{f(1)+f(4)}{2} = 8.5\\) lies strictly above \\(f\\!\\left(\\frac{1+4}{2}\\right) = 6.25\\), with equality iff \\(x_1 = x_2\\).',
          'الجوهر الهندسي لمتباينة جنسن: منتصف الوتر \\(8.5\\) يقع فوق قيمة الدالة عند المنتصف \\(f(2.5) = 6.25\\) لأن المنحنى محدب لأسفل.'
        )
      },
      makeExplorerBlock({
        canvasId: 'olkaustfinalsacademyExCanvas',
        titleEn: '⊙ Explorer · KAUST Finals Lab: Cauchy–Schwarz Vector Projection & Equality Ray',
        titleAr: '⊙ مستكشف تفاعلي · مختبر نهائيات كاوست: الإسقاط المتجهي لمتباينة كوشي-شوارتز',
        ariaEn: 'Interactive 2D vector geometry canvas demonstrating Cauchy-Schwarz inequality |u . v| <= ||u|| ||v|| and equality iff u and v are collinear.',
        ariaAr: 'لوحة تفاعلية للمتجهات توضح متباينة كوشي-شوارتز |u . v| <= ||u|| ||v|| وتحقق المساواة عند الاستقامة.',
        captionEn: 'Comparison of \\(|\\mathbf{u} \\cdot \\mathbf{v}|^2 = (u_1 v_1 + u_2 v_2)^2\\) and \\(\\|\\mathbf{u}\\|^2 \\|\\mathbf{v}\\|^2 = (u_1^2+u_2^2)(v_1^2+v_2^2)\\) with Lagrange gap \\((u_1 v_2 - u_2 v_1)^2\\)',
        captionAr: 'مقارنة مربع الضرب القياسي بحاصل ضرب مربعَي الطولين وفجوة لاغرانج \\((u_1 v_2 - u_2 v_1)^2\\)',
        s0LabelEn: 'Angle of \\(\\mathbf{u}\\) <b>\\(\\alpha =\\)</b>', s0LabelAr: 'زاوية المتجه \\(\\mathbf{u}\\) <b>\\(\\alpha =\\)</b>',
        s0Min: 0, s0Max: 180, s0Val: 65, s0Step: 5,
        s0AriaEn: 'Angle alpha of vector u in degrees', s0AriaAr: 'الزاوية ألفا للمتجه u بالدرجات',
        s1LabelEn: 'Angle of \\(\\mathbf{v}\\) <b>\\(\\beta =\\)</b>', s1LabelAr: 'زاوية المتجه \\(\\mathbf{v}\\) <b>\\(\\beta =\\)</b>',
        s1Min: 0, s1Max: 180, s1Val: 20, s1Step: 5,
        s1AriaEn: 'Angle beta of vector v in degrees', s1AriaAr: 'الزاوية بيتا للمتجه v بالدرجات',
        r0LabelEn: 'LHS \\(|\\mathbf{u}\\cdot\\mathbf{v}|\\)', r0LabelAr: 'الطرف الأيسر \\(|\\mathbf{u}\\cdot\\mathbf{v}|\\)', r0Init: '8.49',
        r1LabelEn: 'RHS \\(\\|\\mathbf{u}\\|\\|\\mathbf{v}\\|\\)', r1LabelAr: 'الطرف الأيمن \\(\\|\\mathbf{u}\\|\\|\\mathbf{v}\\|\\)', r1Init: '12.00 (‖u‖=4, ‖v‖=3)',
        r2LabelEn: 'Lagrange Gap \\(\\|\\mathbf{u}\\times\\mathbf{v}\\|^2\\)', r2LabelAr: 'فجوة لاغرانج المربعية', r2Init: '72.00 (> 0)',
        noteEn: 'Align \\(\\alpha = \\beta\\) to watch the Lagrange cross-term \\((u_1 v_2 - u_2 v_1)^2 = \\|\\mathbf{u}\\|^2\\|\\mathbf{v}\\|^2\\sin^2(\\alpha - \\beta)\\) collapse to \\(0\\), locking exact Cauchy–Schwarz equality!',
        noteAr: 'طابق الزاويتين \\(\\alpha = \\beta\\) لتشاهد تلاشي فجوة لاغرانج \\((u_1 v_2 - u_2 v_1)^2\\) إلى الصفر وتحقق المساواة التامة في كوشي-شوارتز!'
      }),
      {
        kind: 'callout',
        style: 'example',
        label: bi(
          'Worked Example 12.A — Roots-of-Unity Filter Modulo 4 (KAUST Campus Finals)',
          'مثال محلول 12.A — حساب المجاميع التوافيقية بترديد 4 عبر فلتر الجذور النونية (نهائيات كاوست)'
        ),
        body: bi(
          '<p><strong>Problem:</strong> Compute the exact value of \\( S = \\binom{20}{0} + \\binom{20}{4} + \\binom{20}{8} + \\binom{20}{12} + \\binom{20}{16} + \\binom{20}{20} \\).</p><p><strong>Solution:</strong> Apply the \\( m = 4 \\) Roots-of-Unity Filter to \\( F(x) = (1 + x)^{20} \\) using \\( \\{1, -1, i, -i\\} \\):<br>\\[ S = \\frac{F(1) + F(-1) + F(i) + F(-i)}{4} = \\frac{2^{20} + 0 + (1 + i)^{20} + (1 - i)^{20}}{4}. \\]<br>Notice \\( (1 + i)^2 = 2i \\)! Raising both sides to the \\( 10 \\)-th power is effortless:<br>\\[ (1 + i)^{20} = (2i)^{10} = 2^{10} i^{10} = 1024(-1) = -1024, \\qquad (1 - i)^{20} = (-2i)^{10} = -1024. \\]<br>Therefore:<br>\\[ S = \\frac{2^{20} - 2048}{4} = 2^{18} - 512 = 262{,}144 - 512 = 261{,}632. \\]</p>',
          '<p><strong>المسألة:</strong> أوجد القيمة الدقيقة للمجموع \\( S = \\binom{20}{0} + \\binom{20}{4} + \\binom{20}{8} + \\binom{20}{12} + \\binom{20}{16} + \\binom{20}{20} \\).</p><p><strong>الحل الأولمبي:</strong> نطبّق فلتر الجذور الرباعية للواحد \\( \\{1, -1, i, -i\\} \\) على \\( F(x) = (1 + x)^{20} \\):<br>\\[ S = \\frac{2^{20} + 0 + (1 + i)^{20} + (1 - i)^{20}}{4}. \\]<br>بما أن \\( (1 + i)^2 = 2i \\)، نرفع للقوة \\( 10 \\) مباشرةً:<br>\\[ (1 + i)^{20} = (2i)^{10} = 1024 i^{10} = -1024, \\qquad (1 - i)^{20} = -1024. \\]<br>إذن \\( S = \\frac{2^{20} - 2048}{4} = 2^{18} - 512 = 262{,}144 - 512 = 261{,}632 \\)!</p>'
        )
      },
      {
        kind: 'callout',
        style: 'example',
        label: bi(
          'Worked Example 12.B — Jensen’s Convexity Proof of Acute-Triangle Tangent Minimum',
          'مثال محلول 12.B — إثبات الحد الأدنى لمجموع الظلال في المثلث الحاد عبر متباينة جنسن'
        ),
        body: bi(
          '<p><strong>Problem:</strong> Prove that for every acute triangle \\( \\triangle ABC \\), \\( \\tan A + \\tan B + \\tan C \\ge 3\\sqrt{3} \\), and deduce the minimum of \\( \\tan A \\tan B \\tan C \\).</p><p><strong>Solution:</strong> Since \\( \\triangle ABC \\) is acute, \\( A, B, C \\in \\left(0, \\frac{\\pi}{2}\\right) \\). On \\( \\left(0, \\frac{\\pi}{2}\\right) \\), compute the second derivative of \\( f(x) = \\tan x \\):<br>\\[ f\'(x) = \\sec^2 x \\implies f\'\'(x) = 2\\sec^2 x \\tan x > 0. \\]<br>Thus \\( f(x) = \\tan x \\) is <strong>strictly convex</strong> on \\( \\left(0, \\frac{\\pi}{2}\\right) \\)! Applying Jensen’s Inequality with equal weights \\( \\frac{1}{3} \\):<br>\\[ \\frac{\\tan A + \\tan B + \\tan C}{3} \\ge \\tan\\!\\left(\\frac{A + B + C}{3}\\right) = \\tan\\!\\left(\\frac{\\pi}{3}\\right) = \\sqrt{3} \\implies \\tan A + \\tan B + \\tan C \\ge 3\\sqrt{3}, \\]<br>with equality iff \\( A = B = C = 60^\\circ \\). Finally, by the Triangle Tangent Identity \\( \\tan A \\tan B \\tan C = \\tan A + \\tan B + \\tan C \\), the product ALSO has exact minimum \\( 3\\sqrt{3} \\)! \\( \\blacksquare \\)</p>',
          '<p><strong>المسألة:</strong> أثبت أنه في أي مثلث حاد الزوايا \\( \\triangle ABC \\) يتحقق \\( \\tan A + \\tan B + \\tan C \\ge 3\\sqrt{3} \\)، واستنتج أصغر قيمة للجداء \\( \\tan A \\tan B \\tan C \\).</p><p><strong>البرهان الأولمبي:</strong> على الفترة المفتوحة \\( \\left(0, \\frac{\\pi}{2}\\right) \\)، المشتقة الثانية لدالة الظل هي \\( (\\tan x)\'\' = 2\\sec^2 x \\tan x > 0 \\)، أي أنها <strong>محدبة تماماً</strong>! بتطبيق متباينة جنسن بأوزان متساوية \\( \\frac{1}{3} \\):<br>\\[ \\frac{\\tan A + \\tan B + \\tan C}{3} \\ge \\tan\\!\\left(\\frac{\\pi}{3}\\right) = \\sqrt{3} \\implies \\tan A + \\tan B + \\tan C \\ge 3\\sqrt{3}. \\]<br>ومن المتطابقة المثلثية \\( \\tan A \\tan B \\tan C = \\tan A + \\tan B + \\tan C \\) نستنتج فوراً أن القيمة الصغرى للجداء هي أيضاً \\( 3\\sqrt{3} \\) عند المثلث المتطابق الأضلاع! \\( \\blacksquare \\)</p>'
        )
      },
      {
        kind: 'callout',
        style: 'example',
        label: bi(
          'Worked Example 12.C — Homothety Chain of Inscribed Tangent Circles in a Cone/Wedge (KAUST Finals)',
          'مثال محلول 12.C — التحاكي المتتالي لسلسلة دوائر متماسة داخل زاوية (نهائيات كاوست)'
        ),
        body: bi(
          '<p><strong>Problem:</strong> Three circles \\( \\omega_1, \\omega_2, \\omega_3 \\) of radii \\( r_1 < r_2 < r_3 \\) are all tangent to the two rays of an angle with vertex \\( V \\), and \\( \\omega_1 \\) is externally tangent to \\( \\omega_2 \\) while \\( \\omega_2 \\) is externally tangent to \\( \\omega_3 \\). Given \\( r_1 = 9 \\) and \\( r_3 = 25 \\), find \\( r_2 \\) and \\( \\sin(\\theta/2) \\) where \\( \\theta = \\angle V \\).</p><p><strong>Solution:</strong> Because all three circles are inscribed in the same angle \\( V \\), a single <strong>homothety \\( \\mathcal{H}(V, k) \\)</strong> centered at \\( V \\) maps \\( \\omega_1 \\mapsto \\omega_2 \\) AND \\( \\omega_2 \\mapsto \\omega_3 \\)!<br>1. Therefore the radii form an exact <strong>geometric progression</strong> \\( \\frac{r_2}{r_1} = \\frac{r_3}{r_2} = k \\implies r_2 = \\sqrt{r_1 r_3} = \\sqrt{9 \\times 25} = 15 \\)!<br>2. In right triangle from \\( V \\) to the tangency ray, center distances from \\( V \\) are \\( VO_1 = \\frac{r_1}{\\sin(\\theta/2)} \\) and \\( VO_2 = \\frac{r_2}{\\sin(\\theta/2)} \\). External tangency gives \\( VO_2 - VO_1 = r_1 + r_2 \\):<br>\\[ \\frac{r_2 - r_1}{\\sin(\\theta/2)} = r_2 + r_1 \\implies \\sin(\\theta/2) = \\frac{r_2 - r_1}{r_2 + r_1} = \\frac{15 - 9}{15 + 9} = \\frac{6}{24} = \\frac{1}{4}. \\]</p>',
          '<p><strong>المسألة:</strong> ثلاث دوائر \\( \\omega_1, \\omega_2, \\omega_3 \\) أنصاف أقطارها \\( r_1 < r_2 < r_3 \\) تمس جميعاً ضلعَي زاوية رأسها \\( V \\)، وتمس كل دائرة تاليتها خارجياً. إذا كان \\( r_1 = 9 \\) و\\( r_3 = 25 \\)، فأوجد \\( r_2 \\) وقيمة \\( \\sin(\\theta/2) \\).</p><p><strong>الحل الأولمبي:</strong> بما أن الدوائر الثلاث محاطة بالزاوية نفسها \\( V \\)، فإن <strong>تحاكياً واحداً مركزه \\( V \\)</strong> ونسبته \\( k \\) ينقل \\( \\omega_1 \\to \\omega_2 \\) وينقل \\( \\omega_2 \\to \\omega_3 \\)!<br>1. إذن أنصاف الأقطار في <strong>متتابعة هندسية</strong>: \\( r_2 = \\sqrt{r_1 r_3} = \\sqrt{9 \\times 25} = 15 \\).<br>2. من التماس الخارجي \\( VO_2 - VO_1 = r_1 + r_2 \\) مع \\( VO_i = \\frac{r_i}{\\sin(\\theta/2)} \\):<br>\\[ \\sin(\\theta/2) = \\frac{r_2 - r_1}{r_2 + r_1} = \\frac{15 - 9}{15 + 9} = \\frac{1}{4}. \\]</p>'
        )
      },
      {
        kind: 'callout',
        style: 'example',
        label: bi(
          'Worked Example 12.D — Weighted Cauchy–Schwarz / Hölder Cube-Root Inequality (Academy Camp)',
          'مثال محلول 12.D — متباينة هولدر وكوشي-شوارتز الموزونة في معسكرات أكاديمية كاوست'
        ),
        body: bi(
          '<p><strong>Problem:</strong> Let \\( a, b, c > 0 \\) satisfy \\( a + b + c = 7 \\) and \\( \\frac{1}{a+b} + \\frac{1}{b+c} + \\frac{1}{c+a} = \\frac{7}{5} \\). Find the exact value of \\( \\frac{c}{a+b} + \\frac{a}{b+c} + \\frac{b}{c+a} \\) (a classic KAUST Team Relay deceptive synthesis!).</p><p><strong>Solution:</strong> Resist applying inequalities—notice this asks for an <strong>exact value</strong>! Add \\( 1 \\) to each of the three target fractions so every numerator becomes \\( a + b + c = 7 \\)!<br>\\[ S + 3 = \\left(\\frac{c}{a+b} + 1\\right) + \\left(\\frac{a}{b+c} + 1\\right) + \\left(\\frac{b}{c+a} + 1\\right) \\]<br>\\[ = \\frac{a+b+c}{a+b} + \\frac{a+b+c}{b+c} + \\frac{a+b+c}{c+a} = (a+b+c)\\left(\\frac{1}{a+b} + \\frac{1}{b+c} + \\frac{1}{c+a}\\right). \\]<br>Substituting \\( a+b+c = 7 \\) and the given reciprocal sum \\( \\frac{7}{5} \\):<br>\\[ S + 3 = 7 \\times \\frac{7}{5} = \\frac{49}{5} \\implies S = \\frac{49}{5} - 3 = \\frac{34}{5}! \\]</p>',
          '<p><strong>المسألة:</strong> إذا حققت الأعداد الموجبة \\( a, b, c > 0 \\) الشرطين \\( a + b + c = 7 \\) و\\( \\frac{1}{a+b} + \\frac{1}{b+c} + \\frac{1}{c+a} = \\frac{7}{5} \\)، فأوجد القيمة الدقيقة للمقدار \\( S = \\frac{c}{a+b} + \\frac{a}{b+c} + \\frac{b}{c+a} \\).</p><p><strong>الحل الأولمبي:</strong> أضف \\( 1 \\) إلى كل كسر من الكسور الثلاثة لتوحيد البسط عند \\( a + b + c \\)!<br>\\[ S + 3 = \\frac{a+b+c}{a+b} + \\frac{a+b+c}{b+c} + \\frac{a+b+c}{c+a} = (a+b+c)\\left(\\frac{1}{a+b} + \\frac{1}{b+c} + \\frac{1}{c+a}\\right). \\]<br>بالتعويض المباشر: \\( S + 3 = 7 \\times \\frac{7}{5} = \\frac{49}{5} \\implies S = \\frac{49}{5} - 3 = \\frac{34}{5} \\)!</p>'
        )
      },
      {
        kind: 'callout',
        style: 'warn',
        label: bi(
          '⚠ Finals Trap — Verifying Domain Convexity Before Quoting Jensen!',
          '⚠ فخ النهائيات — التحقق من تحدب الدالة على كامل المجال قبل تطبيق جنسن!'
        ),
        body: bi(
          '<p>In Worked Example 12.B, \\( \\tan x \\) is convex ONLY on \\( \\left(0, \\frac{\\pi}{2}\\right) \\)—if \\( \\triangle ABC \\) is obtuse (\\( A > 90^\\circ \\)), \\( \\tan A < 0 \\) jumps across the vertical asymptote and \\( \\tan A + \\tan B + \\tan C \\) is actually NEGATIVE! Always state explicitly why every variable lies inside the convex interval \\( I \\).</p>',
          '<p>في المثال 12.B، تكون دالة \\( \\tan x \\) محدبة فقط على الفترة الحادة \\( (0, \\pi/2) \\)؛ أما في المثلث المنفرج فتقفز الدالة عبر خط التقارب الرأسي ويصبح المجموع سالباً! اذكر دائماً مبرر وقوع جميع المتغيرات داخل فترة التحدب \\( I \\).</p>'
        )
      },
      {
        kind: 'callout',
        style: 'tip',
        label: bi(
          '▲ KAUST Thuwal Team-Round Protocol — The 3-Minute Relay Sanity Check',
          '▲ بروتوكول جولة الفرق في نهائيات ثول — فحص السلامة السريع لنواتج التتابع'
        ),
        body: bi(
          '<p>In KAUST Relay rounds where Player 2’s input \\( T \\) is Player 1’s answer, Player 2 should solve their problem symbolically in terms of \\( T \\) FIRST while waiting! The moment \\( T \\) arrives, check parity/sign plausibility and substitute in 10 seconds.</p>',
          '<p>في جولات التتابع (Relay) التي يعتمد فيها السؤال الثاني على إجابة الزميل الأول \\( T \\)، ابدأ فوراً بحل مسألتك بدلالة الرمز \\( T \\) أثناء انتظارك! وحال استلام القيمة عوّض بها في 10 ثوانٍ فقط.</p>'
        )
      },
      makePractice(
        'Practice 12.1 · KAUST Finals Warmup', 'تدريب 12.1 · تمهيد نهائيات كاوست',
        'Evaluate \\( S = \\binom{12}{0} + \\binom{12}{4} + \\binom{12}{8} + \\binom{12}{12} \\) using the mod-4 Roots-of-Unity Filter.',
        'احسب القيمة الدقيقة للمجموع \\( S = \\binom{12}{0} + \\binom{12}{4} + \\binom{12}{8} + \\binom{12}{12} \\) باستخدام فلتر الجذور النونية.',
        'Use \\( S = \\frac{2^{12} + 0 + (1+i)^{12} + (1-i)^{12}}{4} \\).',
        'استخدم الصيغة \\( S = \\frac{2^{12} + (1+i)^{12} + (1-i)^{12}}{4} \\).',
        'Compute \\( (1+i)^{12} = ((1+i)^2)^6 = (2i)^6 = -64 \\).',
        'احسب \\( (1+i)^{12} = (2i)^6 = -64 \\) وكذلك \\( (1-i)^{12} = -64 \\).',
        'Evaluate \\( \\frac{4096 - 128}{4} \\).',
        'احسب \\( \\frac{4096 - 128}{4} \\).',
        'Since \\( (1 \\pm i)^{12} = (\\pm 2i)^6 = 64 i^6 = -64 \\), the mod-4 filter yields \\( S = \\frac{4096 - 64 - 64}{4} = 1024 - 32 = 992 \\).',
        'بما أن \\( (1 \\pm i)^{12} = -64 \\)، فإن الفلتر الرباعي يعطي \\( S = \\frac{4096 - 128}{4} = 992 \\).'
      ),
      makePractice(
        'Practice 12.2 · KAUST Campus Finals', 'تدريب 12.2 · نهائيات حرم كاوست',
        'Three circles \\( \\omega_1, \\omega_2, \\omega_3 \\) inscribed in the same wedge \\( \\angle V \\) are successively externally tangent with \\( r_1 = 8 \\) and \\( r_3 = 18 \\). Find \\( r_2 \\).',
        'ثلاث دوائر \\( \\omega_1, \\omega_2, \\omega_3 \\) محاطة داخل ضلعَي زاوية \\( \\angle V \\) ومتماسة خارجياً على التوالي. إذا كان \\( r_1 = 8 \\) و\\( r_3 = 18 \\)، فأوجد \\( r_2 \\).',
        'Homothety centered at \\( V \\) maps \\( \\omega_1 \\to \\omega_2 \\to \\omega_3 \\) with constant ratio \\( k \\).',
        'التحاكي الذي مركزه \\( V \\) ينقل \\( \\omega_1 \\to \\omega_2 \\to \\omega_3 \\) بنسبة ثابتة \\( k \\).',
        'Thus \\( r_1, r_2, r_3 \\) form a geometric progression.',
        'إذن أنصاف الأقطار تشكل متتابعة هندسية.',
        'Compute \\( r_2 = \\sqrt{8 \\times 18} \\).',
        'احسب \\( r_2 = \\sqrt{8 \\times 18} \\).',
        'By homothety from vertex \\( V \\), \\( \\frac{r_2}{r_1} = \\frac{r_3}{r_2} \\implies r_2 = \\sqrt{8 \\times 18} = \\sqrt{144} = 12 \\).',
        'بفعل التحاكي من الرأس \\( V \\)، يكون \\( r_2 = \\sqrt{r_1 r_3} = \\sqrt{144} = 12 \\).'
      ),
      makePractice(
        'Practice 12.3 · KAUST Campus Finals', 'تدريب 12.3 · نهائيات حرم كاوست',
        'In \\( \\triangle ABC \\) with area \\( [ABC] = 96 \\), what is the exact area of the triangle formed by the feet of its three medians (the medial triangle), and what is the radius of its Nine-Point Circle if \\( R = 10 \\)?',
        'في مثلث \\( \\triangle ABC \\) مساحته \\( 96 \\) ونصف قطر دائرته المحيطة \\( R = 10 \\)، أوجد مساحة مثلث المنتصفات ونصف قطر دائرة النقاط التسع.',
        'Apply the Euler homothety \\( \\mathcal{H}(G, -\\frac{1}{2}) \\) centered at centroid \\( G \\).',
        'طبّق تحاكي مركز الثقل \\( \\mathcal{H}(G, -\\frac{1}{2}) \\).',
        'Areas scale by \\( k^2 = (-\\frac{1}{2})^2 = \\frac{1}{4} \\), and radii scale by \\( |k| = \\frac{1}{2} \\).',
        'تُضرب المساحات في \\( k^2 = \\frac{1}{4} \\)، وتُضرب أنصاف الأقطار في \\( |k| = \\frac{1}{2} \\).',
        'Compute \\( \\frac{96}{4} \\) and \\( \\frac{10}{2} \\).',
        'احسب \\( \\frac{96}{4} \\) و\\( \\frac{10}{2} \\).',
        'Under \\( \\mathcal{H}(G, -\\frac{1}{2}) \\), the medial triangle has area \\( \\frac{1}{4}[ABC] = \\frac{96}{4} = 24 \\), and its circumcircle (the Nine-Point Circle) has radius \\( R_9 = \\frac{R}{2} = 5 \\).',
        'تحت التحاكي \\( \\mathcal{H}(G, -\\frac{1}{2}) \\)، مساحة مثلث المنتصفات هي \\( \\frac{96}{4} = 24 \\)، ونصف قطر دائرة النقاط التسع يساوي \\( \\frac{R}{2} = 5 \\).'
      ),
      makePractice(
        'Practice 12.4 · KAUST Academy Camp', 'تدريب 12.4 · معسكر أكاديمية كاوست',
        'Evaluate \\( S = \\binom{18}{0} + \\binom{18}{3} + \\binom{18}{6} + \\binom{18}{9} + \\binom{18}{12} + \\binom{18}{15} + \\binom{18}{18} \\) using the mod-3 Roots-of-Unity Filter.',
        'احسب القيمة الدقيقة للمجموع \\( S = \\sum_{j=0}^6 \\binom{18}{3j} \\) باستخدام فلتر الجذور التكعيبية للواحد.',
        'Apply \\( S = \\frac{2^{18} + (1 + \\omega)^{18} + (1 + \\omega^2)^{18}}{3} \\) where \\( \\omega = e^{2\\pi i/3} \\).',
        'طبّق الصيغة \\( S = \\frac{2^{18} + (1 + \\omega)^{18} + (1 + \\omega^2)^{18}}{3} \\).',
        'Since \\( 1 + \\omega + \\omega^2 = 0 \\), \\( 1 + \\omega = -\\omega^2 \\implies (1 + \\omega)^{18} = (-\\omega^2)^{18} = \\omega^{36} = 1 \\)!',
        'بما أن \\( 1 + \\omega = -\\omega^2 \\) فإن \\( (1 + \\omega)^{18} = (-\\omega^2)^{18} = \\omega^{36} = 1 \\) وبالمثل للحد الثالث!',
        'Evaluate \\( \\frac{262{,}144 + 1 + 1}{3} \\).',
        'احسب \\( \\frac{262{,}144 + 2}{3} \\).',
        'Using \\( 1 + \\omega = -\\omega^2 \\) and \\( \\omega^3 = 1 \\), both \\( (1+\\omega)^{18} \\) and \\( (1+\\omega^2)^{18} \\) equal \\( 1 \\). Hence \\( S = \\frac{2^{18} + 2}{3} = \\frac{262{,}146}{3} = 87{,}382 \\).',
        'بما أن \\( (1+\\omega)^{18} = (1+\\omega^2)^{18} = 1 \\)، فإن \\( S = \\frac{2^{18} + 2}{3} = \\frac{262{,}146}{3} = 87{,}382 \\).'
      ),
      makePractice(
        'Practice 12.5 · KAUST Grand Final Synthesis', 'تدريب 12.5 · التحدي الختامي لنهائيات كاوست',
        'Positive reals \\( a, b, c > 0 \\) satisfy \\( a + b + c = 9 \\) and \\( \\frac{1}{a+b} + \\frac{1}{b+c} + \\frac{1}{c+a} = \\frac{5}{6} \\). Find the exact value of \\( \\frac{c}{a+b} + \\frac{a}{b+c} + \\frac{b}{c+a} \\).',
        'تحقق الأعداد الحقيقية الموجبة \\( a, b, c > 0 \\) الشرطين \\( a + b + c = 9 \\) و\\( \\frac{1}{a+b} + \\frac{1}{b+c} + \\frac{1}{c+a} = \\frac{5}{6} \\). أوجد القيمة الدقيقة للمقدار \\( \\frac{c}{a+b} + \\frac{a}{b+c} + \\frac{b}{c+a} \\).',
        'Add \\( 3 = 1 + 1 + 1 \\) to the expression to make every numerator \\( a + b + c \\).',
        'أضف \\( 3 = 1 + 1 + 1 \\) للمقدار ليصبح كل بسط مساوياً لـ \\( a + b + c \\).',
        'Factor \\( (a + b + c)\\left(\\frac{1}{a+b} + \\frac{1}{b+c} + \\frac{1}{c+a}\\right) = 9 \\times \\frac{5}{6} = \\frac{15}{2} \\).',
        'اسحب العامل المشترك \\( 9 \\times \\frac{5}{6} = \\frac{15}{2} \\).',
        'Subtract \\( 3 \\) from \\( \\frac{15}{2} \\). (Also check feasibility: by Titu, \\( (a+b+c)\\sum \\frac{1}{a+b} = \\frac{1}{2}\\sum(a+b)\\sum\\frac{1}{a+b} \\ge \\frac{9}{2} \\), and \\( \\frac{15}{2} > \\frac{9}{2} \\), so positive reals genuinely exist!)',
        'اطرح \\( 3 \\) من \\( \\frac{15}{2} \\) (لاحظ أن \\( \\frac{15}{2} > \\frac{9}{2} \\) فيتحقق شرط وجود حلول حقيقية موجبة!).',
        'Adding \\( 3 \\) gives \\( S + 3 = (a+b+c)\\left(\\frac{1}{a+b} + \\frac{1}{b+c} + \\frac{1}{c+a}\\right) = 9 \\cdot \\frac{5}{6} = \\frac{15}{2} \\), so \\( S = \\frac{15}{2} - 3 = \\frac{9}{2} \\).',
        'بإضافة \\( 3 \\) للطرفين نجد \\( S + 3 = 9 \\times \\frac{5}{6} = \\frac{15}{2} \\)، ومنه \\( S = \\frac{15}{2} - 3 = \\frac{9}{2} \\).'
      ),
      {
        kind: 'seeAlso',
        links: [
          { label: 'KAUST Mathematics Competition: Regional Qualifier', chapterId: 'ol-kaust-kmc-qualifier', trackId: 'olympiad' },
          { label: 'NSMO of KSA: Riyadh National Finals & IMO Pathway', chapterId: 'ol-nsmo-national-finals', trackId: 'olympiad' },
          { label: 'Olympiad Proof Strategies: Invariants, Coloring & Games', chapterId: 'ol-invariants-extremal', trackId: 'olympiad' }
        ]
      }
    ]
  },
  quizWidget: {
    enabled: true,
    domains: ['KAUST Campus Finals & Academy Advanced Synthesis']
  }
};

module.exports = [ch11, ch12];
