'use strict';

const fs = require('fs');
const { bi, makeExplorerBlock, makePractice } = require('./helpers');

const uge = JSON.parse(
  fs.readFileSync('/Users/mohammedamy/.gemini/antigravity/brain/adc91a57-45bd-40f3-b7e5-8b3c75a4c42c/scratch/uge_olympiad_blocks.json', 'utf8')
);

const SUBSEC_1 = bi(
  '🏆 Subsection I · Core International Olympiad Pillars (Chapters 1–8)',
  '🏆 القسم الأول · المحاور الأولمبية العالمية التأسيسية (الفصول 1–8)'
);

const ch07 = {
  id: 'ol-triangle-centers-trig',
  chapterNumber: '7',
  subsectionBanner: SUBSEC_1,
  title: bi(
    'Euclidean Geometry II: Triangle Centers, Ceva, Menelaus, Stewart & Olympiad Trigonometry',
    'الهندسة الإقليدية (2): مراكز المثلث ومبرهنات سيفا ومينيلاوس وستيوارت وحساب المثلثات الأولمبي'
  ),
  railLabel: bi('Triangle Centers, Ceva & Trig', 'مراكز المثلث وسيفا والمثلثات'),
  chapterTag: {
    variant: 'category',
    className: 'igcse-tag',
    emoji: '📐',
    category: 'Core Pillar 7 — Cevians, Triangle Centers & Trigonometry',
    badges: [{ text: 'IMO · NSMO · KAUST KMC', className: 'tier-e' }],
    topics: [
      'Centroid G, Incenter I, Circumcenter O, Orthocenter H & Euler Line',
      "Ceva's concurrency & Menelaus's collinearity theorems",
      "Stewart's Theorem (man + dad = bmb + cnc) & Angle Bisector length",
      'Area relations [ABC] = rs = abc/(4R) & Euler OI² = R(R−2r)',
      'Extended Law of Sines & All 6 Trig / 6 Inverse Trig Ratios'
    ]
  },
  content: {
    blocks: [
      {
        kind: 'text',
        body: bi(
          'Triangle geometry sits at the heart of every national and international Mathematical Olympiad. While <strong>Ceva’s</strong> and <strong>Menelaus’s Theorems</strong> turn concurrency and collinearity into clean ratio products, <strong>Stewart’s Theorem</strong>, the <strong>Euler Line</strong>, and the <strong>Extended Law of Sines</strong> compute exact cevian lengths, center distances, and trigonometric products across NSMO, KAUST KMC, AMC/AIME, and IMO problems.',
          'تتربع هندسة المثلث في قلب جميع الأولمبيادات الوطنية والدولية. فبينما تحوّل مبرهنتا <strong>سيفا (Ceva)</strong> و<strong>مينيلاوس (Menelaus)</strong> مسائل التلاقي والاستقامة إلى جداءات نسبية أنيقة، تتيح <strong>مبرهنة ستيوارت</strong> و<strong>مستقيم أويلر</strong> و<strong>قانون الجيوب المعمم</strong> حساب أطوال القطع الخاصة والمسافات بين المراكز والجداءات المثلثية بدقة متناهية.'
        )
      },
      {
        kind: 'callout',
        style: 'def',
        label: bi(
          '● Definition 7.1 — Classical Triangle Centers, Radii & The Euler Line',
          '● تعريف 7.1 — المراكز الكلاسيكية للمثلث وأنصاف الأقطار ومستقيم أويلر'
        ),
        body: bi(
          '<p>In \\( \\triangle ABC \\) with side lengths \\( a, b, c \\), semiperimeter \\( s = \\frac{a+b+c}{2} \\), and area \\( \\Delta = [ABC] \\):<br>• <strong>Centroid \\( G \\)</strong> (intersection of medians): divides each median in ratio \\( AG : GM_a = 2 : 1 \\).<br>• <strong>Incenter \\( I \\)</strong> (angle bisectors): center of incircle of radius \\( r = \\frac{\\Delta}{s} \\); tangency segments from \\( A, B, C \\) have lengths \\( s-a,\\; s-b,\\; s-c \\).<br>• <strong>Circumcenter \\( O \\)</strong> (perpendicular bisectors): center of circumcircle of radius \\( R = \\frac{abc}{4\\Delta} = \\frac{a}{2\\sin A} \\).<br>• <strong>Orthocenter \\( H \\)</strong> (altitudes): \\( O, G, H \\) are collinear on the <strong>Euler Line</strong> with \\( HG = 2\\,GO \\), \\( OH^2 = 9R^2 - (a^2 + b^2 + c^2) \\), and Euler’s distance theorem \\( OI^2 = R(R - 2r) \\) (which immediately implies \\( R \\ge 2r \\)!).</p>',
          '<p>في المثلث \\( \\triangle ABC \\) الذي أطوال أضلاعه \\( a, b, c \\) ونصف محيطه \\( s = \\frac{a+b+c}{2} \\) ومساحته \\( \\Delta = [ABC] \\):<br>• <strong>مركز الثقل \\( G \\)</strong> (ملتقى المتوسطات): يقسم كل متوسط بنسبة \\( AG : GM_a = 2 : 1 \\).<br>• <strong>مركز الدائرة الداخلية \\( I \\)</strong> (ملتقى منصفات الزوايا): نصف قطرها \\( r = \\frac{\\Delta}{s} \\)، وأطوال قطع التماس من الرؤوس هي \\( s-a,\\; s-b,\\; s-c \\).<br>• <strong>مركز الدائرة المحيطة \\( O \\)</strong> (ملتقى الأعمدة المنصفة): نصف قطرها \\( R = \\frac{abc}{4\\Delta} = \\frac{a}{2\\sin A} \\).<br>• <strong>ملتقى الارتفاعات \\( H \\)</strong>: تقع النقاط \\( O, G, H \\) على استقامة واحدة هي <strong>مستقيم أويلر</strong> بنسبة \\( HG = 2\\,GO \\)، مع \\( OH^2 = 9R^2 - (a^2 + b^2 + c^2) \\) وعلاقة أويلر \\( OI^2 = R(R - 2r) \\) (ومنه المتباينة الشهيرة \\( R \\ge 2r \\)!).</p>'
        )
      },
      {
        kind: 'callout',
        style: 'thm',
        label: bi(
          "● Theorem 7.2 — Ceva's, Menelaus's & Stewart's Theorems",
          '● مبرهنة 7.2 — مبرهنات سيفا ومينيلاوس وستيوارت'
        ),
        body: bi(
          "<p>Let \\( D \\in BC,\\; E \\in CA,\\; F \\in AB \\) be points on the sidelines of \\( \\triangle ABC \\):<br><strong>1. Ceva's Theorem (Concurrency):</strong> Cevians \\( AD, BE, CF \\) concur (or are parallel) if and only if (in directed lengths):</p>\\[ \\frac{BD}{DC} \\cdot \\frac{CE}{EA} \\cdot \\frac{AF}{FB} = 1 \\qquad \\left(\\text{Trig Ceva: } \\frac{\\sin\\angle BAD}{\\sin\\angle CAD}\\cdot\\frac{\\sin\\angle CBE}{\\sin\\angle ABE}\\cdot\\frac{\\sin\\angle ACF}{\\sin\\angle BCF} = 1\\right). \\]<p><strong>2. Menelaus's Theorem (Collinearity):</strong> Points \\( D, E, F \\) (with \\( 1 \\) or \\( 3 \\) on side extensions) are collinear if and only if (in unsigned magnitudes):</p>\\[ \\frac{BD}{DC} \\cdot \\frac{CE}{EA} \\cdot \\frac{AF}{FB} = 1. \\]<p><strong>3. Stewart's Theorem:</strong> If cevian \\( AD = d \\) splits \\( BC = a \\) into \\( BD = m \\) and \\( DC = n \\) (\\( m + n = a \\)), then:</p>\\[ b^2 m + c^2 n = a(d^2 + mn) \\quad \\text{(\"a man and his dad put a bomb in the sink\": } man + dad = bmb + cnc\\text{)}. \\]",
          '<p>لتكن \\( D, E, F \\) نقاطاً على حاملات الأضلاع \\( BC, CA, AB \\) في المثلث \\( \\triangle ABC \\):<br><strong>1. مبرهنة سيفا (التلاقي):</strong> تتلاقى القطع \\( AD, BE, CF \\) في نقطة واحدة إذا وفقط إذا كان:</p>\\[ \\frac{BD}{DC} \\cdot \\frac{CE}{EA} \\cdot \\frac{AF}{FB} = 1. \\]<p><strong>2. مبرهنة مينيلاوس (الاستقامة):</strong> تقع النقاط \\( D, E, F \\) (إحداها أو ثلاثتها على امتدادات الأضلاع) على مستقيم واحد إذا وفقط إذا كان (بأطوال موجبة):</p>\\[ \\frac{BD}{DC} \\cdot \\frac{CE}{EA} \\cdot \\frac{AF}{FB} = 1. \\]<p><strong>3. مبرهنة ستيوارت:</strong> إذا قسمت القطعة \\( AD = d \\) الضلع \\( BC = a \\) إلى \\( BD = m \\) و\\( DC = n \\)، فإن:</p>\\[ b^2 m + c^2 n = a(d^2 + mn). \\]'
        )
      },
      {
        kind: 'callout',
        style: 'pf',
        label: bi(
          "◆ Proof — Law of Cosines Proof of Stewart's Theorem & Exact Angle-Bisector Length",
          '◆ البرهان الأولمبي — اشتقاق مبرهنة ستيوارت وطول منصف الزاوية عبر قانون جيب التمام'
        ),
        body: bi(
          "<p>Let \\( \\theta = \\angle ADB \\), so \\( \\angle ADC = 180^\\circ - \\theta \\) and \\( \\cos\\angle ADC = -\\cos\\theta \\). Apply the Law of Cosines to \\( \\triangle ABD \\) and \\( \\triangle ACD \\):</p>\\[ c^2 = d^2 + m^2 - 2dm\\cos\\theta, \\qquad b^2 = d^2 + n^2 + 2dn\\cos\\theta. \\]<p>Multiply the first equation by \\( n \\) and the second by \\( m \\), then add to eliminate \\( \\cos\\theta \\):</p>\\[ b^2 m + c^2 n = (m + n)d^2 + mn(m + n) = a(d^2 + mn). \\]<p><strong>Corollary (Internal Angle Bisector):</strong> When \\( AD \\) bisects \\( \\angle A \\), the Angle Bisector Theorem gives \\( \\frac{m}{n} = \\frac{c}{b} \\iff bm = cn \\). Substituting \\( b^2 m + c^2 n = bc(n + m) = abc \\) into Stewart gives \\( abc = a(d^2 + mn) \\implies d^2 = bc - mn \\)! \\( \\blacksquare \\)</p>",
          '<p>نضع \\( \\theta = \\angle ADB \\)، فيكون \\( \\angle ADC = 180^\\circ - \\theta \\) وبالتالي \\( \\cos\\angle ADC = -\\cos\\theta \\). بتطبيق قانون جيب التمام على المثلثين \\( \\triangle ABD \\) و\\( \\triangle ACD \\):</p>\\[ c^2 = d^2 + m^2 - 2dm\\cos\\theta, \\qquad b^2 = d^2 + n^2 + 2dn\\cos\\theta. \\]<p>بضرب الأولى في \\( n \\) والثانية في \\( m \\) والجمع لحذف \\( \\cos\\theta \\) مع ملاحظة \\( m + n = a \\):</p>\\[ b^2 m + c^2 n = (m + n)d^2 + mn(m + n) = a(d^2 + mn). \\]<p><strong>نتيجة فورية (طول المنصف الداخلي):</strong> عندما ينصّف \\( AD \\) الزاوية \\( A \\)، فإن \\( \\frac{m}{n} = \\frac{c}{b} \\iff bm = cn \\)، فيصبح الطرف الأيسر \\( bc(m+n) = abc \\)، وبالاختصار على \\( a \\) نحصل على القانون السريع \\( d^2 = bc - mn \\)! \\( \\blacksquare \\)</p>'
        )
      },
      {
        kind: 'table',
        caption: bi(
          'High-Yield Olympiad Triangle Formulas & Special Cevian Lengths',
          'الجدول المرجعي لأهم صيغ المثلث وأطوال القطع الخاصة في الأولمبياد'
        ),
        columns: [
          bi('Quantity', 'المقدار الهندسي'),
          bi('Exact Formula', 'الصيغة الرياضية الدقيقة'),
          bi('Olympiad Use Case', 'الاستخدام الأولمبي')
        ],
        rows: [
          [
            bi('Median \\(m_a\\) (Apollonius)', 'طول المتوسط \\(m_a\\) (أبولونيوس)'),
            bi('\\(m_a^2 = \\frac{2b^2 + 2c^2 - a^2}{4}\\)', '\\(m_a^2 = \\frac{2b^2 + 2c^2 - a^2}{4}\\)'),
            bi('Stewart special case \\(m = n = a/2\\)', 'حالة خاصة من ستيوارت عند منتصف الضلع')
          ],
          [
            bi('Internal Bisector \\(\\ell_a\\)', 'طول منصف الزاوية \\(\\ell_a\\)'),
            bi('\\(\\ell_a^2 = bc - BD \\cdot DC = bc\\!\\left(1 - \\frac{a^2}{(b+c)^2}\\right) = \\left(\\frac{2bc\\cos(A/2)}{b+c}\\right)^2\\)', '\\(\\ell_a^2 = bc - BD \\cdot DC = bc\\!\\left(1 - \\frac{a^2}{(b+c)^2}\\right)\\)'),
            bi('Instant length once \\(BD, DC\\) are split in ratio \\(c:b\\)', 'حساب فوري بمجرد تقسيم القاعدة بنسبة \\(c:b\\)')
          ],
          [
            bi('\\(A\\)-Exradius \\(r_a\\)', 'نصف قطر الدائرة المماسة خارجاً \\(r_a\\)'),
            bi('\\(r_a = \\frac{\\Delta}{s - a}\\), and \\(\\frac{1}{r} = \\frac{1}{r_a} + \\frac{1}{r_b} + \\frac{1}{r_c}\\)', '\\(r_a = \\frac{\\Delta}{s - a}\\)، و\\(\\frac{1}{r} = \\frac{1}{r_a} + \\frac{1}{r_b} + \\frac{1}{r_c}\\)'),
            bi('Excircle tangency from \\(A\\) to \\(BC\\)-touchpoints equals \\(s\\)!', 'طول المماس من الرأس \\(A\\) للدائرة الخارجية يساوي نصف المحيط \\(s\\)!')
          ],
          [
            bi('Triangle Tangent Identity', 'متطابقة ظل الزوايا في المثلث'),
            bi('For \\(A+B+C=180^\\circ\\) (non-right): \\(\\tan A + \\tan B + \\tan C = \\tan A \\tan B \\tan C\\)', 'لكل مثلث غير قائم: \\(\\tan A + \\tan B + \\tan C = \\tan A \\tan B \\tan C\\)'),
            bi('Classic NSMO / KAUST / AMC trigonometric eliminator', 'حسم مسائل المثلثات الأولمبية بخطوة واحدة')
          ]
        ]
      },
      {
        kind: 'cards',
        items: [
          {
            label: bi('13–14–15 Benchmark Triangle', 'المثلث الأولمبي القياسي 13–14–15'),
            value: bi('\\(s = 21,\\; \\Delta = 84,\\; h_{14} = 12,\\; r = 4,\\; R = \\frac{65}{8}\\)', '\\(s = 21,\\; \\Delta = 84,\\; h_{14} = 12,\\; r = 4,\\; R = \\frac{65}{8}\\)')
          },
          {
            label: bi('Area-Ratio Cevian Lemma', 'لمّة نسب المساحات عند التلاقي'),
            value: bi('If cevians concur at \\(P\\), \\(\\frac{BD}{DC} = \\frac{[ABP]}{[ACP]}\\) and \\(\\frac{PD}{AD} = \\frac{[PBC]}{[ABC]}\\)', 'عند التلاقي في \\(P\\): \\(\\frac{BD}{DC} = \\frac{[ABP]}{[ACP]}\\) ومجموع \\(\\sum \\frac{PD}{AD} = 1\\)')
          },
          {
            label: bi('Incenter–Excenter Fact (Fact 5)', 'لمّة المنصف والمركز الداخلي (المنعل/Trillium)'),
            value: bi('Midpoint \\(M\\) of minor arc \\(BC\\) satisfies \\(MB = MC = MI\\)!', 'منتصف القوس \\(BC\\) على الدائرة المحيطة يحقق دائماً \\(MB = MC = MI\\)!')
          },
          {
            label: bi('Morrie’s Cosine Product', 'جداء جيوب التمام المتضاعفة'),
            value: bi('\\(\\cos\\theta\\cos 2\\theta\\cos 4\\theta \\cdots \\cos(2^{n-1}\\theta) = \\frac{\\sin(2^n\\theta)}{2^n\\sin\\theta}\\)', '\\(\\prod_{k=0}^{n-1}\\cos(2^k\\theta) = \\frac{\\sin(2^n\\theta)}{2^n\\sin\\theta}\\)')
          }
        ]
      },
      {
        kind: 'figure',
        figure: {
          type: 'angle_bisector',
          labels: ['A', 'B', 'C', 'D'],
          sides: { ab: '8', ac: '12', bd: '4', dc: '6' }
        },
        caption: bi(
          'Internal Angle Bisector & Stewart’s Theorem in \\(\\triangle ABC\\) (\\(AB=8, AC=12, BC=10\\)): \\(BD:DC = 8:12 = 2:3 \\implies BD=4, DC=6\\), and \\(AD = \\sqrt{bc - BD \\cdot DC} = \\sqrt{96 - 24} = 6\\sqrt{2}\\).',
          'منصف الزاوية الداخلية ومبرهنة ستيوارت في \\(\\triangle ABC\\): تقسم \\(D\\) القاعدة إلى \\(4\\) و\\(6\\)، ويكون طول المنصف \\(AD = \\sqrt{8(12) - 4(6)} = 6\\sqrt{2}\\).'
        )
      },
      makeExplorerBlock({
        canvasId: 'oltrianglecenterstrigExCanvas',
        titleEn: "⊙ Explorer · Ceva Concurrency, Stewart Cevian & Triangle Centers Lab",
        titleAr: '⊙ مستكشف تفاعلي · مختبر تلاقي سيفا وطول ستيوارت ومراكز المثلث',
        ariaEn: 'Interactive triangle geometry explorer plotting concurrent cevians AD, BE, CF, Ceva product = 1, and Stewart cevian length AD.',
        ariaAr: 'مستكشف تفاعلي لهندسة المثلث يعرض القطع المتلاقية لسيفا وطول ستيوارت الدقيق للقطعة AD.',
        captionEn: 'Live Ceva ratio verification \\(\\frac{BD}{DC}\\cdot\\frac{CE}{EA}\\cdot\\frac{AF}{FB} = 1\\) and Stewart length \\(AD\\)',
        captionAr: 'التحقق الحي من جداء نسب سيفا \\(= 1\\) وطول القطعة \\(AD\\) بمبرهنة ستيوارت',
        s0LabelEn: 'Ratio <b>\\(BD/BC =\\)</b>', s0LabelAr: 'نسبة التقسيم <b>\\(BD/BC =\\)</b>',
        s0Min: 0.15, s0Max: 0.85, s0Val: 0.4, s0Step: 0.05,
        s0AriaEn: 'Fraction t1 = BD / BC along side BC', s0AriaAr: 'نسبة الموقع BD / BC على القاعدة BC',
        s1LabelEn: 'Ratio <b>\\(CE/CA =\\)</b>', s1LabelAr: 'نسبة التقسيم <b>\\(CE/CA =\\)</b>',
        s1Min: 0.15, s1Max: 0.85, s1Val: 0.5, s1Step: 0.05,
        s1AriaEn: 'Fraction t2 = CE / CA along side CA', s1AriaAr: 'نسبة الموقع CE / CA على الضلع CA',
        r0LabelEn: 'Locked \\(AF : FB\\) (Ceva)', r0LabelAr: 'النسبة المحتومة \\(AF : FB\\)', r0Init: '1.50 : 1',
        r1LabelEn: 'Stewart Length \\(AD\\)', r1LabelAr: 'طول ستيوارت \\(AD\\)', r1Init: '12.17',
        r2LabelEn: 'Sub-area \\([PBC] / [ABC]\\)', r2LabelAr: 'نسبة المساحة \\([PBC]/[ABC]\\)', r2Init: '0.357',
        noteEn: 'Set \\(BD/BC\\) and \\(CE/CA\\) freely on reference \\(13\\text{–}14\\text{–}15\\) triangle \\(ABC\\): Ceva’s Theorem uniquely locks \\(F \\in AB\\) so \\(AD, BE, CF\\) concur at \\(P\\), while Stewart’s formula updates \\(AD\\) instantaneously!',
        noteAr: 'غيّر موقعَي \\(D\\) و\\(E\\) بحرية على المثلث المرجعي \\(13\\text{–}14\\text{–}15\\): تحدد مبرهنة سيفا موقع النقطة \\(F\\) تلقائياً ليتحقق التلاقي في \\(P\\)، بينما تحسب صيغة ستيوارت طول \\(AD\\) لحظياً!'
      }),
      ...uge.trigBlocks,
      {
        kind: 'callout',
        style: 'example',
        label: bi(
          "Worked Example 7.A — Menelaus's Theorem & Cevian Area Extraction (NSMO Stage 2 / AIME)",
          'مثال محلول 7.A — مبرهنة مينيلاوس واستخلاص مساحات المثلثات الجزئية (نسما 2 / AIME)'
        ),
        body: bi(
          '<p><strong>Problem:</strong> Triangle \\( ABC \\) has area \\( 120 \\). Point \\( D \\) lies on \\( BC \\) with \\( BD : DC = 1 : 2 \\), and point \\( E \\) lies on \\( AC \\) with \\( AE : EC = 3 : 1 \\). Segments \\( AD \\) and \\( BE \\) intersect at \\( P \\). Find \\( AP : PD \\) and the exact area \\( [ABP] \\).</p><p><strong>Solution:</strong> Apply <strong>Menelaus’s Theorem</strong> to \\( \\triangle ADC \\) intersected by the line \\( B - P - E \\) (note \\( B \\) lies on the extension of \\( CD \\), with \\( CB = CD + DB = 2 + 1 = 3 \\) parts):<br>\\[ \\frac{CB}{BD} \\cdot \\frac{DP}{PA} \\cdot \\frac{AE}{EC} = 1 \\implies \\frac{3}{1} \\cdot \\frac{DP}{PA} \\cdot \\frac{3}{1} = 1 \\implies \\frac{DP}{PA} = \\frac{1}{9}, \\]<br>so \\( AP : PD = 9 : 1 \\)! Now compute the area in two 5-second steps:<br>1. Since \\( BD = \\frac{1}{3}BC \\), \\( [ABD] = \\frac{1}{3}[ABC] = \\frac{120}{3} = 40 \\).<br>2. Since \\( AP = \\frac{9}{10}AD \\), \\( [ABP] = \\frac{9}{10}[ABD] = \\frac{9}{10}(40) = 36 \\).</p>',
          '<p><strong>المسألة:</strong> مساحة المثلث \\( \\triangle ABC \\) تساوي \\( 120 \\). تقع \\( D \\) على \\( BC \\) بحيث \\( BD : DC = 1 : 2 \\)، وتقع \\( E \\) على \\( AC \\) بحيث \\( AE : EC = 3 : 1 \\). تتقاطع القطعتان \\( AD \\) و\\( BE \\) في \\( P \\). أوجد النسبة \\( AP : PD \\) والمساحة \\( [ABP] \\).</p><p><strong>الحل الأولمبي:</strong> نطبّق <strong>مبرهنة مينيلاوس</strong> على المثلث \\( \\triangle ADC \\) والقاطع \\( B - P - E \\) (لاحظ أن \\( CB = 3 \\) أجزاء و\\( BD = 1 \\)):<br>\\[ \\frac{CB}{BD} \\cdot \\frac{DP}{PA} \\cdot \\frac{AE}{EC} = 1 \\implies \\frac{3}{1} \\cdot \\frac{DP}{PA} \\cdot \\frac{3}{1} = 1 \\implies AP : PD = 9 : 1. \\]<br>والآن نحسب المساحة فوراً:<br>1. \\( [ABD] = \\frac{1}{3}[ABC] = 40 \\).<br>2. \\( [ABP] = \\frac{9}{10}[ABD] = \\frac{9}{10}(40) = 36 \\).</p>'
        )
      },
      {
        kind: 'callout',
        style: 'example',
        label: bi(
          "Worked Example 7.B — Euler's Distance OI in the 13–14–15 Olympiad Triangle (KAUST KMC)",
          'مثال محلول 7.B — حساب المسافة بين مركزَي الدائرتين المحيطة والداخلية OI (مسابقة كاوست)'
        ),
        body: bi(
          '<p><strong>Problem:</strong> In \\( \\triangle ABC \\) with \\( AB = 13,\\; BC = 14,\\; CA = 15 \\), find the inradius \\( r \\), circumradius \\( R \\), and exact distance \\( OI \\) between the circumcenter \\( O \\) and incenter \\( I \\).</p><p><strong>Solution:</strong><br>1. Semiperimeter \\( s = \\frac{13+14+15}{2} = 21 \\). By Heron’s formula, \\( \\Delta = \\sqrt{21(8)(7)(6)} = 84 \\).<br>2. Inradius: \\( r = \\frac{\\Delta}{s} = \\frac{84}{21} = 4 \\).<br>3. Circumradius: \\( R = \\frac{abc}{4\\Delta} = \\frac{13 \\cdot 14 \\cdot 15}{336} = \\frac{65}{8} \\).<br>4. By Euler’s Theorem \\( OI^2 = R(R - 2r) \\):<br>\\[ OI^2 = \\frac{65}{8}\\left(\\frac{65}{8} - 8\\right) = \\frac{65}{8} \\cdot \\frac{1}{8} = \\frac{65}{64} \\implies OI = \\frac{\\sqrt{65}}{8}. \\]</p>',
          '<p><strong>المسألة:</strong> في المثلث \\( \\triangle ABC \\) الذي أضلاعه \\( 13, 14, 15 \\)، أوجد نصف قطر الدائرة الداخلية \\( r \\)، ونصف قطر المحيطة \\( R \\)، والمسافة الدقيقة \\( OI \\).</p><p><strong>الحل الأولمبي:</strong><br>1. نصف المحيط \\( s = 21 \\)، ومن صيغة هيرون المساحة \\( \\Delta = \\sqrt{21 \\cdot 8 \\cdot 7 \\cdot 6} = 84 \\).<br>2. \\( r = \\frac{84}{21} = 4 \\)، و\\( R = \\frac{13 \\cdot 14 \\cdot 15}{4(84)} = \\frac{65}{8} \\).<br>3. من مبرهنة أويلر \\( OI^2 = R(R - 2r) = \\frac{65}{8}\\left(\\frac{65}{8} - 8\\right) = \\frac{65}{64} \\implies OI = \\frac{\\sqrt{65}}{8} \\).</p>'
        )
      },
      {
        kind: 'callout',
        style: 'example',
        label: bi(
          "Worked Example 7.C — Morrie's Telescoping Cosine Cascade (AMC 12 / NSMO Stage 1)",
          'مثال محلول 7.C — السلسلة التلسكوبية لجداء جيوب التمام (AMC 12 / نسما 1)'
        ),
        body: bi(
          '<p><strong>Problem:</strong> Evaluate the exact non-calculator value of \\( P = \\cos 20^\\circ \\cos 40^\\circ \\cos 80^\\circ \\).</p><p><strong>Solution:</strong> Whenever angles double at each step (\\( \\theta, 2\\theta, 4\\theta \\)), multiply and divide by \\( 2^3 \\sin 20^\\circ = 8\\sin 20^\\circ \\) to trigger a chain reaction of \\( 2\\sin\\alpha\\cos\\alpha = \\sin 2\\alpha \\):<br>\\[ 8\\sin 20^\\circ \\cdot P = 4(2\\sin 20^\\circ\\cos 20^\\circ)\\cos 40^\\circ\\cos 80^\\circ = 4\\sin 40^\\circ\\cos 40^\\circ\\cos 80^\\circ \\]<br>\\[ = 2\\sin 80^\\circ\\cos 80^\\circ = \\sin 160^\\circ. \\]<br>Since \\( \\sin 160^\\circ = \\sin(180^\\circ - 20^\\circ) = \\sin 20^\\circ \\ne 0 \\), dividing by \\( 8\\sin 20^\\circ \\) yields \\( P = \\frac{1}{8} \\)!</p>',
          '<p><strong>المسألة:</strong> احسب دون آلة حاسبة القيمة الدقيقة للجداء \\( P = \\cos 20^\\circ \\cos 40^\\circ \\cos 80^\\circ \\).</p><p><strong>الحل الأولمبي:</strong> عند تضاعف الزوايا (\\( \\theta, 2\\theta, 4\\theta \\))، نضرب ونقسم على \\( 8\\sin 20^\\circ \\) لتفعيل متطابقة ضعف الزاوية ثلاث مرات متتالية:<br>\\[ (8\\sin 20^\\circ)P = 4\\sin 40^\\circ\\cos 40^\\circ\\cos 80^\\circ = 2\\sin 80^\\circ\\cos 80^\\circ = \\sin 160^\\circ. \\]<br>وبما أن \\( \\sin 160^\\circ = \\sin 20^\\circ \\)، فإن الاختصار يعطي فوراً \\( P = \\frac{1}{8} \\)!</p>'
        )
      },
      {
        kind: 'callout',
        style: 'example',
        label: bi(
          "Worked Example 7.D — Stewart's Theorem on a General Cevian (KAUST Finals)",
          'مثال محلول 7.D — حساب طول قطعة داخلية عامة بمبرهنة ستيوارت (نهائيات كاوست)'
        ),
        body: bi(
          '<p><strong>Problem:</strong> In \\( \\triangle ABC \\), \\( AB = 13,\\; AC = 15,\\; BC = 14 \\). Point \\( D \\) lies on \\( BC \\) such that \\( BD = 5 \\) and \\( DC = 9 \\). Find the exact length of segment \\( AD \\).</p><p><strong>Solution:</strong> Apply Stewart’s Theorem \\( b^2 m + c^2 n = a(d^2 + mn) \\) with \\( a = 14,\\; b = 15,\\; c = 13,\\; m = 5,\\; n = 9 \\):<br>\\[ 15^2(5) + 13^2(9) = 14(d^2 + 5 \\cdot 9) \\implies 1125 + 1521 = 14(d^2 + 45). \\]<br>Since \\( 1125 + 1521 = 2646 \\) and \\( \\frac{2646}{14} = 189 \\), we obtain \\( d^2 + 45 = 189 \\implies d^2 = 144 \\implies AD = 12 \\)! (Notice \\( AD = 12 \\) equals the altitude \\( h_a \\), confirming \\( D \\) is the exact foot of the altitude since \\( 13^2 - 5^2 = 15^2 - 9^2 = 144 \\)!)</p>',
          '<p><strong>المسألة:</strong> في المثلث \\( \\triangle ABC \\) حيث \\( AB = 13,\\; AC = 15,\\; BC = 14 \\)، تقع النقطة \\( D \\) على \\( BC \\) بحيث \\( BD = 5 \\) و\\( DC = 9 \\). أوجد طول \\( AD \\).</p><p><strong>الحل الأولمبي:</strong> بتطبيق مبرهنة ستيوارت \\( b^2 m + c^2 n = a(d^2 + mn) \\):<br>\\[ 225(5) + 169(9) = 14(d^2 + 45) \\implies 2646 = 14(d^2 + 45) \\implies d^2 + 45 = 189 \\implies d^2 = 144 \\implies AD = 12. \\]</p>'
        )
      },
      {
        kind: 'callout',
        style: 'warn',
        label: bi(
          '⚠ Olympiad Trap — Swapping b and c in Stewart’s Formula',
          '⚠ فخ أولمبي شائع — عكس الأضلاع المقابلة للقطع الجزئية في صيغة ستيوارت'
        ),
        body: bi(
          '<p>In \\( b^2 m + c^2 n = a(d^2 + mn) \\), each side squared multiplies the segment on the <strong>OPPOSITE</strong> half of base \\( BC \\): \\( AC^2 \\) multiplies \\( BD = m \\), and \\( AB^2 \\) multiplies \\( DC = n \\)! Check the degenerate limit \\( m \\to 0 \\) (\\( D \\to B \\), \\( n \\to a \\)): \\( c^2 a = a d^2 \\implies d = c = AB \\), which catches a swapped sign or index immediately.</p>',
          '<p>في صيغة ستيوارت \\( b^2 m + c^2 n = a(d^2 + mn) \\)، يُضرب مربع كل ضلع في جزء القاعدة <strong>البعيد عنه</strong>: أي \\( AC^2 \\cdot BD + AB^2 \\cdot DC \\)! اختبر النهاية الحدّية \\( m \\to 0 \\) (انطباق \\( D \\) على \\( B \\)) لتتأكد فوراً من عدم تبديل الحدين.</p>'
        )
      },
      {
        kind: 'callout',
        style: 'tip',
        label: bi(
          '▲ Contest Strategy — Choosing the Right Triangle for Menelaus',
          '▲ استراتيجية المسابقات — اختيار المثلث الصحيح والقاطع المستقيم في مينيلاوس'
        ),
        body: bi(
          '<p>When two cevians \\( AD \\) and \\( BE \\) cross at \\( P \\), NEVER apply Menelaus to \\( \\triangle ABC \\)! Instead, view <strong>one cevian as a side of a sub-triangle</strong> (e.g., \\( \\triangle ADC \\)) and the <strong>other cevian \\( B-P-E \\) as the transversal line</strong>—that isolates \\( AP : PD \\) in a single equation.</p>',
          '<p>عند تقاطع قطعتين داخليتين \\( AD \\) و\\( BE \\) في \\( P \\)، لا تطبّق مينيلاوس على المثلث الكبير \\( \\triangle ABC \\)! بل اعتبر <strong>إحدى القطعتين ضلعاً في مثلث جزئي</strong> (مثل \\( \\triangle ADC \\)) واعتبر <strong>القطعة الأخرى \\( B-P-E \\) هي القاطع المستقيم</strong> لتحصل على النسبة المطلوبة في معادلة واحدة.</p>'
        )
      },
      makePractice(
        'Practice 7.1 · NSMO Stage 1 / Easy', 'تدريب 7.1 · نسما المرحلة 1 / سهل',
        'In \\( \\triangle ABC \\), \\( AB = 9,\\; AC = 15,\\; BC = 16 \\). The internal angle bisector of \\( \\angle A \\) meets \\( BC \\) at \\( D \\). Find \\( BD \\).',
        'في المثلث \\( \\triangle ABC \\)، \\( AB = 9,\\; AC = 15,\\; BC = 16 \\). يلتقي المنصف الداخلي للزاوية \\( \\angle A \\) بالضلع \\( BC \\) في \\( D \\). أوجد طول \\( BD \\).',
        'By the Angle Bisector Theorem, \\( BD : DC = AB : AC = 9 : 15 = 3 : 5 \\).',
        'حسب مبرهنة منصف الزاوية: \\( BD : DC = AB : AC = 9 : 15 = 3 : 5 \\).',
        'Split the total base \\( BC = 16 \\) into \\( 3 + 5 = 8 \\) equal parts.',
        'قسّم طول القاعدة \\( BC = 16 \\) إلى \\( 3 + 5 = 8 \\) أجزاء متساوية.',
        'Multiply \\( 3 \\times \\frac{16}{8} \\).',
        'اضرب \\( 3 \\times \\frac{16}{8} \\).',
        'Since \\( BD : DC = 9 : 15 = 3 : 5 \\) and \\( BD + DC = 16 \\), we obtain \\( BD = \\frac{3}{8}(16) = 6 \\).',
        'بما أن \\( BD : DC = 3 : 5 \\) ومجموعهما \\( 16 \\)، فإن \\( BD = \\frac{3}{8} \\times 16 = 6 \\).'
      ),
      makePractice(
        'Practice 7.2 · KAUST KMC Regional / Easy', 'تدريب 7.2 · تصفيات كاوست / سهل',
        'In \\( \\triangle ABC \\), \\( BC = 8,\\; CA = 7,\\; AB = 9 \\). Find the exact length of median \\( AM \\) drawn to side \\( BC \\).',
        'في المثلث \\( \\triangle ABC \\)، \\( BC = 8,\\; CA = 7,\\; AB = 9 \\). أوجد الطول الدقيق للمتوسط \\( AM \\) المرسوم إلى الضلع \\( BC \\).',
        'Use Apollonius’s median formula \\( m_a^2 = \\frac{2b^2 + 2c^2 - a^2}{4} \\) with \\( a = 8, b = 7, c = 9 \\).',
        'استخدم صيغة أبولونيوس للمتوسط \\( m_a^2 = \\frac{2b^2 + 2c^2 - a^2}{4} \\) حيث \\( a = 8, b = 7, c = 9 \\).',
        'Compute \\( 2(49) + 2(81) - 64 \\).',
        'احسب \\( 2(49) + 2(81) - 64 \\).',
        'Divide by \\( 4 \\) and take the square root.',
        'اقسم الناتج على \\( 4 \\) ثم خذ الجذر التربيعي.',
        'By Apollonius’s Theorem, \\( AM^2 = \\frac{2(7^2) + 2(9^2) - 8^2}{4} = \\frac{98 + 162 - 64}{4} = \\frac{196}{4} = 49 \\), so \\( AM = 7 \\).',
        'من صيغة أبولونيوس: \\( AM^2 = \\frac{2(49) + 2(81) - 64}{4} = \\frac{196}{4} = 49 \\implies AM = 7 \\).'
      ),
      makePractice(
        'Practice 7.3 · NSMO Stage 2 / Medium', 'تدريب 7.3 · نسما المرحلة 2 / متوسط',
        'Cevians \\( AD, BE, CF \\) of \\( \\triangle ABC \\) concur at \\( P \\). Given \\( BD : DC = 2 : 3 \\) and \\( CE : EA = 9 : 4 \\), find \\( AF : FB \\) in simplest form.',
        'تتلاقى القطع \\( AD, BE, CF \\) داخل المثلث \\( \\triangle ABC \\) في نقطة \\( P \\). إذا كان \\( BD : DC = 2 : 3 \\) و\\( CE : EA = 9 : 4 \\)، فأوجد النسبة \\( AF : FB \\) في أبسط صورة.',
        'Write Ceva’s Theorem \\( \\frac{BD}{DC} \\cdot \\frac{CE}{EA} \\cdot \\frac{AF}{FB} = 1 \\).',
        'اكتب علاقة سيفا \\( \\frac{BD}{DC} \\cdot \\frac{CE}{EA} \\cdot \\frac{AF}{FB} = 1 \\).',
        'Substitute \\( \\frac{2}{3} \\cdot \\frac{9}{4} = \\frac{3}{2} \\).',
        'عوّض وبسّط \\( \\frac{2}{3} \\cdot \\frac{9}{4} = \\frac{3}{2} \\).',
        'Invert \\( \\frac{3}{2} \\) to isolate \\( \\frac{AF}{FB} \\).',
        'اقلب النسبة \\( \\frac{3}{2} \\) لإيجاد \\( \\frac{AF}{FB} \\).',
        'By Ceva’s Theorem, \\( \\frac{2}{3} \\cdot \\frac{9}{4} \\cdot \\frac{AF}{FB} = 1 \\implies \\frac{3}{2} \\cdot \\frac{AF}{FB} = 1 \\implies AF : FB = 2 : 3 \\).',
        'من مبرهنة سيفا: \\( \\frac{2}{3} \\cdot \\frac{9}{4} \\cdot \\frac{AF}{FB} = 1 \\implies AF : FB = 2 : 3 \\).'
      ),
      makePractice(
        'Practice 7.4 · AMC 12 / KAUST KMC / Hard', 'تدريب 7.4 · AMC 12 / مسابقة كاوست / متقدم',
        'In \\( \\triangle ABC \\), \\( BC = 12 \\) and \\( \\angle BAC = 60^\\circ \\). Find the exact area of the circumcircle of \\( \\triangle ABC \\).',
        'في المثلث \\( \\triangle ABC \\)، \\( BC = 12 \\) وقياس الزاوية \\( \\angle BAC = 60^\\circ \\). أوجد المساحة الدقيقة للدائرة المحيطة بالمثلث \\( \\triangle ABC \\).',
        'Apply the Extended Law of Sines \\( \\frac{BC}{\\sin A} = 2R \\).',
        'استخدم قانون الجيوب المعمم \\( \\frac{BC}{\\sin A} = 2R \\).',
        'Solve \\( 2R = \\frac{12}{\\sqrt{3}/2} = 8\\sqrt{3} \\implies R = 4\\sqrt{3} \\).',
        'احسب نصف القطر \\( R = \\frac{12}{2\\sin 60^\\circ} = 4\\sqrt{3} \\).',
        'Compute \\( \\pi R^2 \\).',
        'احسب مساحة الدائرة \\( \\pi R^2 \\).',
        'By the Extended Law of Sines, \\( 2R = \\frac{12}{\\sin 60^\\circ} = \\frac{12}{\\sqrt{3}/2} = 8\\sqrt{3} \\), so \\( R = 4\\sqrt{3} \\) and the circumcircle area is \\( \\pi R^2 = 48\\pi \\).',
        'من قانون الجيوب المعمم: \\( 2R = \\frac{12}{\\sqrt{3}/2} = 8\\sqrt{3} \\implies R = 4\\sqrt{3} \\)، فتكون مساحة الدائرة المحيطة \\( \\pi R^2 = 48\\pi \\).'
      ),
      makePractice(
        'Practice 7.5 · NSMO National Finals / KAUST Finals', 'تدريب 7.5 · نهائيات نسما وكاوست',
        'An acute triangle \\( ABC \\) has circumradius \\( R = 5 \\) and \\( AB^2 + BC^2 + CA^2 = 189 \\). Find the exact distance \\( GH \\) between its centroid \\( G \\) and orthocenter \\( H \\).',
        'مثلث حاد الزوايا \\( ABC \\) نصف قطر دائرته المحيطة \\( R = 5 \\) ومجموع مربعات أضلاعه \\( AB^2 + BC^2 + CA^2 = 189 \\). أوجد المسافة الدقيقة \\( GH \\) بين مركز ثقله \\( G \\) وملتقى ارتفاعاته \\( H \\).',
        'Use the Euler-line identity \\( OH^2 = 9R^2 - (a^2 + b^2 + c^2) \\).',
        'استخدم علاقة مستقيم أويلر \\( OH^2 = 9R^2 - (a^2 + b^2 + c^2) \\).',
        'Compute \\( OH = \\sqrt{9(25) - 189} \\).',
        'احسب \\( OH = \\sqrt{225 - 189} \\).',
        'Recall \\( G \\) divides \\( OH \\) in ratio \\( OG : GH = 1 : 2 \\), so \\( GH = \\frac{2}{3}OH \\).',
        'تذكّر أن \\( G \\) يقسم \\( OH \\) بنسبة \\( 1 : 2 \\)، أي \\( GH = \\frac{2}{3}OH \\).',
        'From \\( OH^2 = 9(5^2) - 189 = 225 - 189 = 36 \\), we get \\( OH = 6 \\). On the Euler line, \\( GH = \\frac{2}{3}OH = \\frac{2}{3}(6) = 4 \\).',
        'من العلاقة \\( OH^2 = 225 - 189 = 36 \\) نجد \\( OH = 6 \\)، وعلى مستقيم أويلر \\( GH = \\frac{2}{3}OH = 4 \\).'
      ),
      {
        kind: 'seeAlso',
        links: [
          { label: 'Euclidean Geometry I: Circles, Power & Ptolemy', chapterId: 'ol-euclidean-circles', trackId: 'olympiad' },
          { label: 'NSMO National Finals & IMO Pathway', chapterId: 'ol-nsmo-national-finals', trackId: 'olympiad' },
          { label: 'KAUST Campus Finals & Advanced Synthesis', chapterId: 'ol-kaust-finals-academy', trackId: 'olympiad' }
        ]
      }
    ]
  },
  quizWidget: {
    enabled: true,
    domains: ['Triangle Centers, Ceva, Menelaus & Stewart']
  }
};

const ch08 = {
  id: 'ol-invariants-extremal',
  chapterNumber: '8',
  subsectionBanner: SUBSEC_1,
  title: bi(
    'Olympiad Proof Strategies: Invariants, Monovariants, Coloring, Pick’s Theorem & Nim Games',
    'استراتيجيات البرهان الأولمبي: اللامتغيرات وشبه اللامتغيرات والتلوين ومبرهنة بيك وألعاب نيم'
  ),
  railLabel: bi('Invariants, Coloring & Games', 'اللامتغيرات والتلوين ونظرية الألعاب'),
  chapterTag: {
    variant: 'category',
    className: 'igcse-tag',
    emoji: '♟️',
    category: 'Core Pillar 8 — Invariants, Extremal Principle & Combinatorial Games',
    badges: [{ text: 'IMO · NSMO · KAUST KMC', className: 'tier-e' }],
    topics: [
      'Parity, modular & algebraic invariants',
      'Monovariants & process termination bounds',
      'Chessboard / modular colorings & Extremal Principle',
      "Pick's Theorem A = I + B/2 − 1 on Z²",
      "Combinatorial Game Theory & Bouton's Nim XOR Theorem"
    ]
  },
  content: {
    blocks: [
      {
        kind: 'text',
        body: bi(
          'The most memorable problems on the IMO, Saudi NSMO Stage 3, and KAUST Campus Finals ask whether a multi-step process can reach a target state, whether a board can be tiled, or which player has a forced win. None of these yield to routine calculation—they fall to <strong>invariants</strong>, <strong>monovariants</strong>, <strong>coloring obstructions</strong>, the <strong>Extremal Principle</strong>, and <strong>Nim-sum XOR game theory</strong>.',
          'تتميز أجمل مسائل الأولمبياد الدولي IMO، والمرحلة النهائية لأولمبياد «نسما»، ونهائيات جامعة كاوست بأسئلة حول إمكانية الوصول إلى حالة مستهدفة عبر عمليات متكررة، أو إمكانية تبليط رقعة، أو تحديد اللاعب صاحب الاستراتيجية الفائزة حتماً. وهذه المسائل تُحسم بأدوات البرهان الأولمبي الخالصة: <strong>اللامتغيرات</strong>، و<strong>شبه اللامتغيرات</strong>، و<strong>التلوين المعياري</strong>، و<strong>المبدأ التطرفي</strong>، و<strong>نظرية ألعاب نيم (XOR)</strong>.'
        )
      },
      {
        kind: 'callout',
        style: 'def',
        label: bi(
          '● Definition 8.1 — Invariants, Monovariants & The Extremal Principle',
          '● تعريف 8.1 — اللامتغيرات وشبه اللامتغيرات والمبدأ التطرفي'
        ),
        body: bi(
          '<p><strong>1. Invariant:</strong> A function \\( \\Phi(S) \\) of the system state \\( S \\) such that every legal move \\( S \\to S\' \\) satisfies \\( \\Phi(S\') = \\Phi(S) \\). If \\( \\Phi(S_{\\text{start}}) \\ne \\Phi(S_{\\text{target}}) \\), then \\( S_{\\text{target}} \\) is <strong>strictly unreachable</strong>!</p><p><strong>2. Monovariant:</strong> A discrete-valued function \\( M(S) \\) bounded below (e.g., \\( M(S) \\in \\mathbb{Z}_{\\ge 0} \\)) that strictly decreases \\( M(S\') \\le M(S) - 1 \\) on every move. This guarantees the process <strong>must terminate in at most \\( M(S_0) \\) steps</strong>.</p><p><strong>3. Extremal Principle:</strong> Among all configurations (or putative counterexamples), select the one minimizing or maximizing a well-founded quantity (e.g., minimum perimeter, minimum sum, shortest distance) to force an immediate local contradiction or constructive step.</p>',
          '<p><strong>1. اللامتغير (Invariant):</strong> دالة \\( \\Phi(S) \\) على حالات النظام تظل ثابتة تماماً تحت أي خطوة مسموحة \\( \\Phi(S\') = \\Phi(S) \\). فإذا كان \\( \\Phi(S_{\\text{البداية}}) \\ne \\Phi(S_{\\text{الهدف}}) \\)، استحال الوصول إلى الهدف قطعياً!</p><p><strong>2. شبه اللامتغير (Monovariant):</strong> مقدار متقطع محدود من الأدنى (مثلاً عدد صحيح غير سالب) يتناقص فعلياً في كل خطوة \\( M(S\') \\le M(S) - 1 \\)، مما يبرهن حتمية <strong>انتهاء العملية في عدد خطوات لا يتجاوز \\( M(S_0) \\)</strong>.</p><p><strong>3. المبدأ التطرفي (Extremal Principle):</strong> اختيار العنصر أو التشكيل ذي القيمة الصغرى أو العظمى (أصغر محيط، أقصر مسافة، أصغر مثال مضاد) لاستنتاج تناقض فوري أو بناء مباشر.</p>'
        )
      },
      {
        kind: 'callout',
        style: 'thm',
        label: bi(
          "● Theorem 8.2 — Pick's Lattice Area Theorem & Bouton's Nim-Sum XOR Theorem",
          '● مبرهنة 8.2 — مبرهنة بيك لمساحة مضلعات الشبكة ومبرهنة بوتون للعبة نيم'
        ),
        body: bi(
          "<p><strong>1. Pick's Theorem:</strong> Every simple polygon \\( \\mathcal{P} \\) whose vertices lie on the integer lattice \\( \\mathbb{Z}^2 \\) with \\( I \\) strictly interior lattice points and \\( B \\) boundary lattice points has exact area:</p>\\[ \\operatorname{Area}(\\mathcal{P}) = I + \\frac{B}{2} - 1. \\]<p><strong>2. Bouton's Theorem for Normal-Play Nim:</strong> In Nim with heap sizes \\( (a_1, a_2, \\dots, a_k) \\) where each turn removes \\( \\ge 1 \\) stone from a single heap and the player taking the last stone wins, define the bitwise XOR <strong>Nim-sum</strong> \\( X = a_1 \\oplus a_2 \\oplus \\cdots \\oplus a_k \\). A state is a <strong>losing P-position</strong> (second player wins) iff \\( X = 0 \\), and a <strong>winning N-position</strong> (first player wins) iff \\( X \\ne 0 \\)!</p>",
          '<p><strong>1. مبرهنة بيك (Pick’s Theorem):</strong> لأي مضلع بسيط \\( \\mathcal{P} \\) تقع رؤوسه على شبكة الأعداد الصحيحة \\( \\mathbb{Z}^2 \\)، إذا حوى \\( I \\) نقطة شبكية داخلية تماماً و\\( B \\) نقطة شبكية على محيطه، فإن مساحته الدقيقة هي:</p>\\[ \\operatorname{Area}(\\mathcal{P}) = I + \\frac{B}{2} - 1. \\]<p><strong>2. مبرهنة بوتون للعبة نيم (Nim XOR):</strong> في لعبة نيم بأكوام أحجار \\( (a_1, a_2, \\dots, a_k) \\) حيث يسحب اللاعب حجراً أو أكثر من كومة واحدة ويفوز من يأخذ الحجر الأخير، نعرّف المجموع الثنائي \\( X = a_1 \\oplus a_2 \\oplus \\cdots \\oplus a_k \\). تكون الوضعية <strong>خاسرة للمبادر (P-position)</strong> إذا وفقط إذا كان \\( X = 0 \\)، و<strong>رابحة للمبادر (N-position)</strong> إذا وفقط إذا كان \\( X \\ne 0 \\)!</p>'
        )
      },
      {
        kind: 'callout',
        style: 'pf',
        label: bi(
          "◆ Proof — Invariant / Non-Invariant Proof of Bouton's Nim Theorem",
          '◆ البرهان الأولمبي — إثبات مبرهنة بوتون عبر ثنائية الحالات (P / N)'
        ),
        body: bi(
          '<p>Partition all Nim states into \\( \\mathcal{Z} = \\{S : X = 0\\} \\) and \\( \\mathcal{N} = \\{S : X \\ne 0\\} \\).<br>1. <strong>Terminal state:</strong> \\( (0, 0, \\dots, 0) \\) has \\( X = 0 \\in \\mathcal{Z} \\).<br>2. <strong>Every move from \\( \\mathcal{Z} \\) lands in \\( \\mathcal{N} \\):</strong> Changing a single heap \\( a_i \\to a_i\' < a_i \\) changes at least one binary bit of \\( a_i \\) while all other \\( a_j \\) stay fixed, so \\( X\' = X \\oplus a_i \\oplus a_i\' = a_i \\oplus a_i\' \\ne 0 \\)!<br>3. <strong>From any state in \\( \\mathcal{N} \\), there exists a move into \\( \\mathcal{Z} \\):</strong> Let \\( 2^d \\) be the highest-value \\( 1 \\)-bit of \\( X \\ne 0 \\). At least one heap \\( a_i \\) must have bit \\( 2^d \\) equal to \\( 1 \\). Set \\( a_i\' = a_i \\oplus X \\): since \\( a_i \\) and \\( a_i\' \\) agree above \\( 2^d \\) while bit \\( 2^d \\) flips \\( 1 \\to 0 \\), strictly \\( a_i\' < a_i \\), and the new Nim-sum is \\( X \\oplus a_i \\oplus (a_i \\oplus X) = 0 \\)! Thus Player 1 maintains \\( X = 0 \\) after every turn until taking the final stone. \\( \\blacksquare \\)</p>',
          '<p>نقسّم جميع وضعيات نيم إلى \\( \\mathcal{Z} = \\{X = 0\\} \\) و\\( \\mathcal{N} = \\{X \\ne 0\\} \\):<br>1. <strong>النهاية:</strong> \\( (0,\\dots,0) \\) تحقق \\( X = 0 \\in \\mathcal{Z} \\).<br>2. <strong>أي نقلة من \\( \\mathcal{Z} \\) تخرج حتماً إلى \\( \\mathcal{N} \\):</strong> لأن إنقاص كومة واحدة \\( a_i \\to a_i\' < a_i \\) يغيّر خانة ثنائية واحدة على الأقل، فيصبح \\( X\' = a_i \\oplus a_i\' \\ne 0 \\).<br>3. <strong>من أي وضعية في \\( \\mathcal{N} \\) توجد نقلة تعيد \\( X \\) إلى الصفر:</strong> لتكن \\( 2^d \\) أعلى خانة ثنائية قيمتها \\( 1 \\) في \\( X \\)؛ لا بد أن تمتلك إحدى الأكوام \\( a_i \\) الرقم \\( 1 \\) في الخانة \\( 2^d \\). باستبدال \\( a_i \\) بـ \\( a_i\' = a_i \\oplus X \\) تنقلب الخانة \\( 2^d \\) من \\( 1 \\) إلى \\( 0 \\) فيتحقق \\( a_i\' < a_i \\) ويصبح المجموع الجديد \\( 0 \\)! وهكذا يحافظ اللاعب الفائز على \\( X = 0 \\) حتى النهاية. \\( \\blacksquare \\)</p>'
        )
      },
      {
        kind: 'table',
        caption: bi(
          'Signature Olympiad Invariants & Coloring Patterns',
          'الجدول المرجعي لأشهر أنماط اللامتغيرات والتلوين الأولمبي'
        ),
        columns: [
          bi('Operation / Problem Type', 'نوع المسألة / العملية'),
          bi('Canonical Invariant / Coloring', 'اللامتغير / التلوين الحاسم'),
          bi('Why It Works', 'سر الفعالية')
        ],
        rows: [
          [
            bi('Replace \\((a,b)\\) with \\(|a - b|\\)', 'استبدال \\((a,b)\\) بـ \\(|a - b|\\)'),
            bi('Sum modulo \\(2\\): \\(\\sum x_i \\pmod 2\\)', 'زوجية المجموع الكلي \\(\\sum x_i \\pmod 2\\)'),
            bi('\\(a + b \\equiv a - b \\equiv |a - b| \\pmod 2\\)', 'لأن \\(a+b\\) و\\(|a-b|\\) لهما الزوجية نفسها دائماً')
          ],
          [
            bi('Replace \\((a,b)\\) with \\(ab + a + b\\)', 'استبدال \\((a,b)\\) بـ \\(ab + a + b\\)'),
            bi('Shifted product \\(\\prod (x_i + 1)\\)', 'الجداء المزاح \\(\\prod (x_i + 1)\\)'),
            bi('\\((ab+a+b) + 1 = (a+1)(b+1)\\)!', 'لأن \\(ab+a+b+1 = (a+1)(b+1)\\) تماماً!')
          ],
          [
            bi('Domino tiling of mutilated chessboard', 'تبليط رقعة شطرنج مقطوعة بالدومينو'),
            bi('2-coloring \\((i+j) \\bmod 2\\) (Black vs White)', 'تلوين الشطرنج الثنائي \\((i+j) \\bmod 2\\)'),
            bi('Every \\(1 \\times 2\\) domino covers 1 black + 1 white cell', 'كل قطعة دومينو تغطي مربعاً أسود ومربعاً أبيض')
          ],
          [
            bi('\\(1 \\times k\\) straight tile on \\(m \\times n\\) grid', 'تبليط بشرائط مستقيمة \\(1 \\times k\\)'),
            bi('Cyclic coloring \\((i + j) \\bmod k\\)', 'التلوين الدوري \\((i + j) \\bmod k\\)'),
            bi('Every \\(1 \\times k\\) bar covers one cell of each residue \\(0,\\dots,k-1\\)', 'كل شريط يغطي خلية واحدة من كل لون من الألوان \\(k\\)')
          ]
        ]
      },
      {
        kind: 'cards',
        items: [
          {
            label: bi('Boundary Lattice Points on Segment', 'النقاط الشبكية على قطعة مستقيمة'),
            value: bi('Segment from \\((x_1,y_1)\\) to \\((x_2,y_2)\\) contains \\(\\gcd(|\\Delta x|, |\\Delta y|) + 1\\) lattice points', 'تحوي القطعة \\(\\gcd(|x_2-x_1|, |y_2-y_1|) + 1\\) نقطة شبكية')
          },
          {
            label: bi('Subtraction Game \\(\\{1, 2, \\dots, k\\}\\)', 'لعبة الطرح المقيّد \\(\\{1,\\dots,k\\}\\)'),
            value: bi('Removing \\(1\\dots k\\) stones from \\(N\\): P-positions are \\(N \\equiv 0 \\pmod{k+1}\\)!', 'مواضع الخسارة للمبادر هي مضاعفات \\(k + 1\\) فقط!')
          },
          {
            label: bi('Symmetry-Stealing Strategy', 'استراتيجية محاكاة التناظر'),
            value: bi('Place first coin at exact center of symmetric table, then mirror opponent across center!', 'ضع القطعة الأولى في مركز التناظر تماماً، ثم اعكس كل حركة لخصمك!')
          },
          {
            label: bi('Chomp Strategy-Stealing Proof', 'برهان سرقة الاستراتيجية (وجودي)'),
            value: bi('Player 1 wins Chomp on any \\(m \\times n\\) bar (\\(mn > 1\\)) by top-right corner contradiction!', 'اللاعب الأول يملك استراتيجية فوز دائماً على أي لوح أكبر من \\(1 \\times 1\\)')
          }
        ]
      },
      {
        kind: 'figure',
        figure: {
          type: 'network_graph',
          title: 'Subtraction Game States (Remove 1 or 2 Stones · Losing P-States mod 3 = 0)',
          directed: true,
          nodes: [
            { id: '6', x: 40, y: 125, label: '6 (P)' },
            { id: '5', x: 95, y: 70, label: '5 (N)' },
            { id: '4', x: 150, y: 180, label: '4 (N)' },
            { id: '3', x: 205, y: 125, label: '3 (P)' },
            { id: '2', x: 260, y: 70, label: '2 (N)' },
            { id: '1', x: 260, y: 180, label: '1 (N)' },
            { id: '0', x: 318, y: 125, label: '0 (P)' }
          ],
          edges: [
            { from: '6', to: '5' },
            { from: '6', to: '4' },
            { from: '5', to: '3', highlight: true },
            { from: '4', to: '3', highlight: true },
            { from: '3', to: '2' },
            { from: '3', to: '1' },
            { from: '2', to: '0', highlight: true },
            { from: '1', to: '0', highlight: true }
          ]
        },
        caption: bi(
          'Directed game DAG for removing \\(1\\) or \\(2\\) stones: amber arrows show winning moves from \\(N\\)-states (\\(n \\not\\equiv 0 \\pmod 3\\)) into \\(P\\)-states (\\(n \\equiv 0 \\pmod 3\\)), while every move out of \\(6\\) or \\(3\\) hands an \\(N\\)-state to the opponent.',
          'مخطط الحالات الموجه للعبة سحب \\(1\\) أو \\(2\\) حجر: الأسهم الكهرمانية تمثل النقلات الرابحة من مواضع \\(N\\) إلى مواضع \\(P\\) (مضاعفات \\(3\\)).'
        )
      },
      makeExplorerBlock({
        canvasId: 'olinvariantsextremalExCanvas',
        titleEn: "⊙ Explorer · 3-Heap Nim XOR Binary Engine & Winning Move Finder",
        titleAr: '⊙ مستكشف تفاعلي · محرك لعبة نيم الثنائي (XOR) واكتشاف النقلة الرابحة',
        ariaEn: 'Interactive 3-heap Nim game explorer showing binary bit decomposition and bitwise XOR Nim-sum.',
        ariaAr: 'مستكشف تفاعلي للعبة نيم بثلاث أكوام يعرض التمثيل الثنائي ومجموع XOR والنقلة الرابحة.',
        captionEn: 'Bitwise binary decomposition of heaps \\((A, B, C = 10)\\) and live Nim-sum \\(A \\oplus B \\oplus C\\)',
        captionAr: 'التحليل الثنائي لأكوام الأحجار \\((A, B, C=10)\\) وحساب مجموع XOR الحي',
        s0LabelEn: 'Heap 1 <b>\\(A =\\)</b>', s0LabelAr: 'الكومة الأولى <b>\\(A =\\)</b>',
        s0Min: 1, s0Max: 15, s0Val: 7, s0Step: 1,
        s0AriaEn: 'First Nim heap size A', s0AriaAr: 'حجم الكومة الأولى A',
        s1LabelEn: 'Heap 2 <b>\\(B =\\)</b>', s1LabelAr: 'الكومة الثانية <b>\\(B =\\)</b>',
        s1Min: 1, s1Max: 15, s1Val: 12, s1Step: 1,
        s1AriaEn: 'Second Nim heap size B', s1AriaAr: 'حجم الكومة الثانية B',
        r0LabelEn: 'Nim-Sum \\(A \\oplus B \\oplus 10\\)', r0LabelAr: 'مجموع XOR لـ \\((A, B, 10)\\)', r0Init: '7 ⊕ 12 ⊕ 10 = 1',
        r1LabelEn: 'Position Verdict', r1LabelAr: 'حكم الوضعية', r1Init: 'N-Position (1st Wins)',
        r2LabelEn: 'Winning Move', r2LabelAr: 'النقلة الرابحة الفورية', r2Init: 'Heap A: 7 → 6',
        noteEn: 'Heap \\(C = 10 = 1010_2\\) is fixed. Adjust \\(A\\) and \\(B\\) to see when every binary column has an EVEN number of 1-bits (\\(X = 0\\), P-position, e.g. \\(A=6, B=12, C=10\\))!',
        noteAr: 'الكومة الثالثة مثبتة عند \\(C = 10 = 1010_2\\). حرّك \\(A\\) و\\(B\\) لترى متى يصبح عدد الآحاد زوجياً في كل عمود ثنائي (\\(X = 0\\)، مثل \\(A=6, B=12, C=10\\))!'
      }),
      {
        kind: 'figure',
        figure: {
          type: 'polygon',
          title: "Pick's Theorem on Lattice Polygon (I = 5, B = 6 ⇒ Area = 5 + 3 − 1 = 7)",
          vertices: [[0, 0], [4, 0], [3, 2], [0, 2]],
          labels: ['(0,0)', '(4,0)', '(3,2)', '(0,2)'],
          sides: ['4', '√5', '3', '2']
        },
        caption: bi(
          'Right trapezoid with vertices \\((0,0), (4,0), (3,2), (0,2)\\) on \\(\\mathbb{Z}^2\\): boundary points \\(B = 4 + 1 + 3 + 2 = 10\\) and interior points \\(I = 3\\) give \\(A = 3 + \\frac{10}{2} - 1 = 7\\), matching \\(\\frac{4+3}{2} \\times 2 = 7\\)!',
          'شبه منحرف قائم رؤوسه على الشبكة الصحيحة \\((0,0), (4,0), (3,2), (0,2)\\): عدد نقاط المحيط \\(B = 10\\) والنقاط الداخلية \\(I = 3\\)، فتعطي صيغة بيك \\(A = 3 + 5 - 1 = 7\\) تماماً!'
        )
      },
      {
        kind: 'callout',
        style: 'example',
        label: bi(
          'Worked Example 8.A — Blackboard Algebraic Invariant (NSMO Stage 2 / KAUST KMC)',
          'مثال محلول 8.A — اللامتغير الجبري لمسألة السبورة (نسما 2 / مسابقة كاوست)'
        ),
        body: bi(
          '<p><strong>Problem:</strong> The numbers \\( 1, 2, 3, 4, 5 \\) are written on a whiteboard. Repeatedly, a student erases any two numbers \\( a, b \\) and writes \\( ab + a + b \\) in their place until a single number remains. Prove that the final number is independent of the sequence of choices, and find its exact value.</p><p><strong>Solution:</strong> Notice the shifted factorization \\( (ab + a + b) + 1 = (a + 1)(b + 1) \\)! Define the state function \\( \\Phi(x_1, \\dots, x_k) = \\prod_{i=1}^k (x_i + 1) \\). Replacing \\( a, b \\) with \\( c = ab + a + b \\) replaces the factors \\( (a+1)(b+1) \\) with \\( c + 1 = (a+1)(b+1) \\), leaving \\( \\Phi \\) <strong>strictly invariant</strong>!<br>Initially, \\( \\Phi_{\\text{start}} = (1+1)(2+1)(3+1)(4+1)(5+1) = 2 \\cdot 3 \\cdot 4 \\cdot 5 \\cdot 6 = 720 \\).<br>When a single number \\( F \\) remains, \\( F + 1 = \\Phi_{\\text{final}} = 720 \\implies F = 719 \\) regardless of move order!</p>',
          '<p><strong>المسألة:</strong> كُتبت الأعداد \\( 1, 2, 3, 4, 5 \\) على سبورة. في كل خطوة يمسح الطالب أي عددين \\( a, b \\) ويكتب مكانهما \\( ab + a + b \\) حتى يتبقى عدد واحد فقط. أثبت أن العدد النهائي ثابت لا يعتمد على ترتيب الاختيارات، وأوجد قيمته.</p><p><strong>الحل الأولمبي:</strong> نلاحظ التحليل \\( (ab + a + b) + 1 = (a + 1)(b + 1) \\)! نعرّف الدالة \\( \\Phi = \\prod (x_i + 1) \\)؛ في كل خطوة يُستبدل العاملان \\( (a+1)(b+1) \\) بالعامل المساوي لهما \\( c + 1 \\)، فيظل \\( \\Phi \\) <strong>لامتغيراً تاماً</strong>!<br>في البداية \\( \\Phi = 2 \\times 3 \\times 4 \\times 5 \\times 6 = 720 \\)، وعند بقاء عدد وحيد \\( F \\) يكون \\( F + 1 = 720 \\implies F = 719 \\) دائماً!</p>'
        )
      },
      {
        kind: 'callout',
        style: 'example',
        label: bi(
          'Worked Example 8.B — 4-Color Modular Obstruction on a 10×10 Board (NSMO Finals / IMO Style)',
          'مثال محلول 8.B — استحالة التبليط عبر التلوين الرباعي المعياري للوحة 10×10 (نهائيات نسما)'
        ),
        body: bi(
          '<p><strong>Problem:</strong> Prove that a \\( 10 \\times 10 \\) grid of \\( 100 \\) unit squares CANNOT be tiled by \\( 25 \\) straight \\( 1 \\times 4 \\) tetrominoes (even though \\( 25 \\times 4 = 100 \\)).</p><p><strong>Solution:</strong> Assign each cell \\( (i, j) \\) (\\( 0 \\le i, j \\le 9 \\)) the color \\( c(i, j) = (i + j) \\bmod 4 \\in \\{0, 1, 2, 3\\} \\).<br>1. Any horizontal or vertical \\( 1 \\times 4 \\) tile covers \\( 4 \\) consecutive sums \\( s, s+1, s+2, s+3 \\), hence <strong>exactly one cell of each color \\( 0, 1, 2, 3 \\)</strong>. Thus \\( 25 \\) tiles would cover \\( (25, 25, 25, 25) \\) cells of the four colors.<br>2. Count color \\( 2 \\) on the \\( 10 \\times 10 \\) board! In row \\( 0 \\), colors are \\( 0,1,2,3,0,1,2,3,0,1 \\) (three \\( 0 \\)s, three \\( 1 \\)s, two \\( 2 \\)s, two \\( 3 \\)s). Across the \\( 10 \\) rows (two full \\( 4 \\)-row blocks + rows \\( 8, 9 \\)), the exact counts of colors \\( (0, 1, 2, 3) \\) are \\( (25, 26, 25, 24) \\)!<br>Since \\( 26 \\ne 25 \\), no tiling can exist! \\( \\blacksquare \\)</p>',
          '<p><strong>المسألة:</strong> أثبت استحالة تبليط رقعة \\( 10 \\times 10 \\) باستخدام \\( 25 \\) قطعة مستقيمة من مقاس \\( 1 \\times 4 \\) (رغم أن المساحة الكلية \\( 25 \\times 4 = 100 \\)).</p><p><strong>البرهان الأولمبي:</strong> نلوّن كل خلية \\( (i, j) \\) باللون الدوري \\( (i + j) \\bmod 4 \\in \\{0, 1, 2, 3\\} \\).<br>1. أي قطعة مستقيمة \\( 1 \\times 4 \\) (أفقية أو رأسية) تغطي أربع خلايا متتالية المجموع، أي خلية واحدة بالضبط من كل لون؛ فلو أمكن التبليط لتساوى عدد خلايا كل لون عند \\( 25 \\).<br>2. بحساب أعداد الألوان \\( (0, 1, 2, 3) \\) فعلياً على لوحة \\( 10 \\times 10 \\) نجدها \\( (25, 26, 25, 24) \\)! وبما أن \\( 26 \\ne 25 \\)، فالتبليط مستحيل قطعاً! \\( \\blacksquare \\)</p>'
        )
      },
      {
        kind: 'callout',
        style: 'example',
        label: bi(
          "Worked Example 8.C — Pick's Theorem for a Tilted Lattice Triangle (AMC 12 / KAUST KMC)",
          'مثال محلول 8.C — حساب النقاط الشبكية الداخلية لمثلث مائل بمبرهنة بيك (AMC 12 / كاوست)'
        ),
        body: bi(
          '<p><strong>Problem:</strong> Triangle \\( OAB \\) has vertices \\( O(0,0),\\; A(6, 4), \\) and \\( B(2, 8) \\). How many integer lattice points \\( (x, y) \\in \\mathbb{Z}^2 \\) lie <strong>strictly inside</strong> \\( \\triangle OAB \\)?</p><p><strong>Solution:</strong><br>1. <strong>Exact Area via Shoelace / Determinant:</strong> \\( \\operatorname{Area}(OAB) = \\frac{1}{2}|6(8) - 4(2)| = \\frac{1}{2}(48 - 8) = 20 \\).<br>2. <strong>Boundary Lattice Points \\( B \\):</strong> On each side, interior edge points equal \\( \\gcd(|\\Delta x|, |\\Delta y|) - 1 \\), so summing \\( \\gcd(|\\Delta x|, |\\Delta y|) \\) over all three edges counts every boundary point once:<br>\\[ B = \\gcd(6, 4) + \\gcd(4, 4) + \\gcd(2, 8) = 2 + 4 + 2 = 8. \\]<br>3. <strong>Pick’s Theorem \\( A = I + \\frac{B}{2} - 1 \\):</strong><br>\\[ 20 = I + \\frac{8}{2} - 1 = I + 3 \\implies I = 17 \\text{ strictly interior lattice points!} \\]</p>',
          '<p><strong>المسألة:</strong> رؤوس المثلث \\( OAB \\) هي \\( O(0,0),\\; A(6, 4),\\; B(2, 8) \\). كم نقطة شبكية صحيحة \\( (x, y) \\in \\mathbb{Z}^2 \\) تقع <strong>داخل</strong> المثلث تماماً (دون الأضلاع)؟</p><p><strong>الحل الأولمبي:</strong><br>1. <strong>المساحة بالمحدد:</strong> \\( \\operatorname{Area}(OAB) = \\frac{1}{2}|6(8) - 4(2)| = 20 \\).<br>2. <strong>نقاط المحيط \\( B \\):</strong> مجموع القواسم المشتركة لفروق الإحداثيات للأضلاع الثلاثة:<br>\\[ B = \\gcd(6, 4) + \\gcd(4, 4) + \\gcd(2, 8) = 2 + 4 + 2 = 8. \\]<br>3. <strong>بتطبيق مبرهنة بيك \\( A = I + \\frac{B}{2} - 1 \\):</strong> \\( 20 = I + 4 - 1 \\implies I = 17 \\) نقطة داخلية!</p>'
        )
      },
      {
        kind: 'callout',
        style: 'example',
        label: bi(
          'Worked Example 8.D — Finding All Winning First Moves in 3-Heap Nim (Olympiad Games)',
          'مثال محلول 8.D — تحديد جميع النقلات الافتتاحية الرابحة في لعبة نيم (ألعاب الأولمبياد)'
        ),
        body: bi(
          '<p><strong>Problem:</strong> Three heaps of stones contain \\( (9, 12, 15) \\) stones in standard Nim. Determine which player has a winning strategy, and find the exact winning first move(s).</p><p><strong>Solution:</strong> Convert each heap to 4-bit binary and compute the bitwise XOR \\( X = 9 \\oplus 12 \\oplus 15 \\):<br>• \\( 9 = 1001_2 \\)<br>• \\( 12 = 1100_2 \\)<br>• \\( 15 = 1111_2 \\)<br>Adding mod 2 column-by-column: \\( X = 1010_2 = 10 \\ne 0 \\). Thus the <strong>first player wins</strong>!<br>The highest \\( 1 \\)-bit of \\( X = 1010_2 \\) is \\( 2^3 = 8 \\). Which heaps have bit \\( 2^3 \\) set to \\( 1 \\)? All three (\\( 9, 12, 15 \\))! Compute \\( a_i\' = a_i \\oplus 10 \\) for each:<br>• Heap 1: \\( 9 \\oplus 10 = 1001_2 \\oplus 1010_2 = 0011_2 = 3 < 9 \\) (valid: remove \\( 6 \\) from \\( 9 \\));<br>• Heap 2: \\( 12 \\oplus 10 = 1100_2 \\oplus 1010_2 = 0110_2 = 6 < 12 \\) (valid: remove \\( 6 \\) from \\( 12 \\));<br>• Heap 3: \\( 15 \\oplus 10 = 1111_2 \\oplus 1010_2 = 0101_2 = 5 < 15 \\) (valid: remove \\( 10 \\) from \\( 15 \\)).<br>All <strong>3</strong> moves leave a zero-XOR state (\\( (3,12,15),\\; (9,6,15), \\) or \\( (9,12,5) \\))!</p>',
          '<p><strong>المسألة:</strong> ثلاث أكوام في لعبة نيم تحوي \\( (9, 12, 15) \\) حجراً. حدد اللاعب الفائز بملعب مثالي، وأوجد جميع النقلات الأولى الرابحة.</p><p><strong>الحل الأولمبي:</strong> نحسب المجموع الثنائي \\( X = 9 \\oplus 12 \\oplus 15 \\):<br>\\( 9 = 1001_2 \\)، \\( 12 = 1100_2 \\)، \\( 15 = 1111_2 \\implies X = 1010_2 = 10 \\ne 0 \\)، إذن <strong>اللاعب الأول يفوز</strong>!<br>نحسب القيمة المستهدفة \\( a_i \\oplus 10 \\) لكل كومة:<br>• الكومة الأولى: \\( 9 \\oplus 10 = 3 < 9 \\) (إنقاصها إلى \\( 3 \\))؛<br>• الكومة الثانية: \\( 12 \\oplus 10 = 6 < 12 \\) (إنقاصها إلى \\( 6 \\))؛<br>• الكومة الثالثة: \\( 15 \\oplus 10 = 5 < 15 \\) (إنقاصها إلى \\( 5 \\)).<br>توجد إذن <strong>3 نقلات افتتاحية رابحة</strong> تجعل مجموع XOR مساوياً للصفر!</p>'
        )
      },
      {
        kind: 'callout',
        style: 'warn',
        label: bi(
          '⚠ Olympiad Trap — Necessary Invariant Match Does NOT Prove Reachability by Itself!',
          '⚠ فخ أولمبي شائع — تطابق اللامتغير شرط ضروري وليس كافياً بمفرده!'
        ),
        body: bi(
          '<p>An invariant mismatch \\( \\Phi(S_0) \\ne \\Phi(S_{\\text{target}}) \\) is a <strong>100% proof of impossibility</strong>. However, if \\( \\Phi(S_0) = \\Phi(S_{\\text{target}}) \\), you MUST still exhibit an explicit sequence of moves (or inductive construction) to prove \\( S_{\\text{target}} \\) is reachable!</p>',
          '<p>اختلاف قيمة اللامتغير \\( \\Phi(S_0) \\ne \\Phi(S_{\\text{الهدف}}) \\) برهان قاطع على الاستحالة؛ أما تساويهما فهو <strong>شرط ضروري فقط</strong>، ولا يكتمل إثبات الإمكانية إلا ببناء صريح لخطوات الوصول!</p>'
        )
      },
      {
        kind: 'callout',
        style: 'tip',
        label: bi(
          '▲ Contest Strategy — Spotting Monovariants When Numbers Split or Merge',
          '▲ استراتيجية المسابقات — كيف تبني شبه لامتغير لعمليات التقسيم والدمج؟'
        ),
        body: bi(
          '<p>When an operation splits an integer \\( n = a + b \\) and records \\( ab \\), test the quadratic potential \\( \\Phi = \\sum x_i^2 \\): since \\( (a+b)^2 - (a^2 + b^2) = 2ab \\), the sum of all recorded products across ANY sequence of splits down to \\( 1 \\)s is <strong>always</strong> \\( \\frac{N^2 - N}{2} = \\binom{N}{2} \\)!</p>',
          '<p>عند تقسيم عدد \\( n = a + b \\) وتسجيل حاصل الضرب \\( ab \\)، اختبر مجموع المربعات \\( \\sum x_i^2 \\): بما أن \\( (a+b)^2 - (a^2+b^2) = 2ab \\)، فإن مجموع جميع الجداءات المسجلة حتى الوصول للواحدات يساوي دائماً \\( \\binom{N}{2} \\) مهما كانت طريقة التقسيم!</p>'
        )
      },
      makePractice(
        'Practice 8.1 · NSMO Stage 1 / Easy', 'تدريب 8.1 · نسما المرحلة 1 / سهل',
        'A pile starts with \\( 100 \\) stones. Players alternate removing \\( 1, 2, 3, \\) or \\( 4 \\) stones; whoever takes the last stone wins. How many stones must Player 1 remove on the very first turn to guarantee victory?',
        'كومة فيها \\( 100 \\) حجر، يتناوب لاعبان على سحب \\( 1 \\) أو \\( 2 \\) أو \\( 3 \\) أو \\( 4 \\) أحجار، ويفوز من يأخذ الحجر الأخير. كم حجراً يجب أن يسحب اللاعب الأول في الدور الأول ليضمن الفوز؟ (إن كانت الوضعية خاسرة فاكتب 0)',
        'In subtraction game \\( \\{1, 2, 3, 4\\} \\), the losing P-positions are multiples of \\( 4 + 1 = 5 \\).',
        'في لعبة سحب \\( 1\\dots 4 \\)، مواضع الخسارة للمبادر هي مضاعفات \\( 4 + 1 = 5 \\).',
        'Check whether \\( 100 \\) is already divisible by \\( 5 \\)!',
        'اختبر هل \\( 100 \\) يقبل القسمة على \\( 5 \\)!',
        'What happens if Player 1 removes \\( m \\in \\{1,2,3,4\\} \\) stones from \\( 100 \\)? Player 2 replies with \\( 5 - m \\)!',
        'إذا سحب الأول \\( m \\) حجراً، يسحب الثاني \\( 5 - m \\) في كل دور!',
        'Since \\( 100 \\equiv 0 \\pmod 5 \\), \\( 100 \\) is ALREADY a losing P-position! Whatever \\( m \\in \\{1,2,3,4\\} \\) Player 1 removes, Player 2 removes \\( 5 - m \\) stones to maintain multiples of \\( 5 \\) down to \\( 0 \\). Thus Player 2 wins (Player 1 has \\( 0 \\) winning moves).',
        'بما أن \\( 100 \\) من مضاعفات \\( 5 \\)، فإن الوضعية الابتدائية \\( P \\)-position خاسرة للمبادر! مهما سحب الأول \\( m \\in \\{1,2,3,4\\} \\) سيرد الثاني بسحب \\( 5 - m \\) حتى يأخذ الحجر الأخير (عدد النقلات الرابحة للأول = \\( 0 \\)).'
      ),
      makePractice(
        'Practice 8.2 · KAUST KMC Regional / Easy', 'تدريب 8.2 · تصفيات كاوست / سهل',
        'Start with a single pile of \\( 15 \\) coins. At each step you split any pile of size \\( > 1 \\) into two smaller piles \\( a \\) and \\( b \\) and add \\( ab \\) points to your score, stopping when \\( 15 \\) piles of size \\( 1 \\) remain. What is your final score?',
        'تبدأ بكومة واحدة من \\( 15 \\) قطعة نقدية. في كل خطوة تقسم أي كومة حجمها \\( > 1 \\) إلى كومتين \\( a \\) و\\( b \\) وتضيف \\( ab \\) نقطة إلى رصيدك حتى تصبح جميع الأكوام من قطعة واحدة. كم يكون مجموع نقاطك النهائي؟',
        'Track the invariant \\( \\text{Score} + \\frac{1}{2}\\sum x_i^2 \\)!',
        'تتبّع اللامتغير \\( \\text{الرصيد} + \\frac{1}{2}\\sum x_i^2 \\)!',
        'Check one split \\( (a+b) \\to a, b \\): \\( ab + \\frac{a^2+b^2}{2} = \\frac{(a+b)^2}{2} \\).',
        'لاحظ أن \\( ab + \\frac{a^2+b^2}{2} = \\frac{(a+b)^2}{2} \\) ثابت لا يتغير!',
        'Equate initial \\( 0 + \\frac{15^2}{2} \\) to final \\( S + 15 \\cdot \\frac{1^2}{2} \\) (equivalently \\( \\binom{15}{2} \\)).',
        'ساوِ البداية بالنهاية: \\( S = \\frac{15^2 - 15}{2} = \\binom{15}{2} \\).',
        'Every pair of coins is separated on exactly one split (or via the invariant \\( S + \\frac{1}{2}\\sum x_i^2 = \\frac{15^2}{2} \\)), so the final score is always \\( \\binom{15}{2} = \\frac{15 \\times 14}{2} = 105 \\).',
        'بما أن كل زوج من القطع ينفصل في خطوة واحدة بالضبط (أو من اللامتغير \\( S + \\frac{1}{2}\\sum x_i^2 \\))، فإن المجموع النهائي ثابت ويساوي \\( \\binom{15}{2} = 105 \\).'
      ),
      makePractice(
        'Practice 8.3 · NSMO Stage 2 / Medium', 'تدريب 8.3 · نسما المرحلة 2 / متوسط',
        'A lattice polygon has area \\( 29 \\) and exactly \\( 12 \\) lattice points on its boundary. How many lattice points lie strictly in its interior?',
        'مضلع بسيط رؤوسه شبكية مساحته \\( 29 \\) ويقع على محيطه \\( 12 \\) نقطة شبكية بالضبط. كم نقطة شبكية تقع داخله تماماً؟',
        'Apply Pick’s Theorem \\( A = I + \\frac{B}{2} - 1 \\).',
        'طبّق مبرهنة بيك \\( A = I + \\frac{B}{2} - 1 \\).',
        'Substitute \\( A = 29 \\) and \\( B = 12 \\).',
        'عوّض بـ \\( A = 29 \\) و\\( B = 12 \\).',
        'Solve \\( 29 = I + 6 - 1 \\) for \\( I \\).',
        'احسب \\( I \\) من المعادلة \\( 29 = I + 5 \\).',
        'By Pick’s Theorem, \\( 29 = I + \\frac{12}{2} - 1 = I + 5 \\implies I = 24 \\) interior lattice points.',
        'من مبرهنة بيك: \\( 29 = I + 6 - 1 = I + 5 \\implies I = 24 \\) نقطة شبكية داخلية.'
      ),
      makePractice(
        'Practice 8.4 · AMC 12 / KAUST KMC / Hard', 'تدريب 8.4 · AMC 12 / مسابقة كاوست / متقدم',
        'In 3-heap Nim with initial heaps \\( (6, 11, 14) \\), how many stones must Player 1 remove, and from which heap, to guarantee a win?',
        'في لعبة نيم بثلاث أكوام أحجامها \\( (6, 11, 14) \\)، كم حجراً يجب أن يسحب اللاعب الأول ومن أي كومة ليضمن الفوز؟',
        'Compute \\( X = 6 \\oplus 11 \\oplus 14 \\) in 4-bit binary (\\( 0110_2 \\oplus 1011_2 \\oplus 1110_2 \\)).',
        'احسب \\( X = 6 \\oplus 11 \\oplus 14 \\) بالتمثيل الثنائي \\( 0110_2 \\oplus 1011_2 \\oplus 1110_2 \\).',
        'Find \\( X = 0011_2 = 3 \\), whose highest \\( 1 \\)-bit is \\( 2^1 = 2 \\).',
        'ستجد \\( X = 0011_2 = 3 \\)، وأعلى خانة فيها \\( 1 \\) هي \\( 2^1 = 2 \\).',
        'Compute \\( a_i \\oplus 3 \\) for each heap and pick the unique one with \\( a_i \\oplus 3 < a_i \\)? Check all three: \\( 6 \\oplus 3 = 5 < 6 \\), \\( 11 \\oplus 3 = 8 < 11 \\), \\( 14 \\oplus 3 = 13 < 14 \\)! All three have bit \\( 2^1 \\) set!',
        'جميع الأكوام الثلاث تحوي الخانة \\( 2^1 = 1 \\)! احسب \\( 6 \\oplus 3 = 5 \\)، و\\( 11 \\oplus 3 = 8 \\)، و\\( 14 \\oplus 3 = 13 \\).',
        'Here \\( X = 0110_2 \\oplus 1011_2 \\oplus 1110_2 = 0011_2 = 3 \\). Since bit \\( 2^1 \\) is \\( 1 \\) in all three heaps, Player 1 has three winning options: remove \\( 1 \\) from \\( 6 \\) (leaving \\( 5,11,14 \\)), remove \\( 3 \\) from \\( 11 \\) (leaving \\( 6,8,14 \\)), or remove \\( 1 \\) from \\( 14 \\) (leaving \\( 6,11,13 \\)).',
        'بما أن \\( X = 6 \\oplus 11 \\oplus 14 = 3 \\)، والخانة \\( 2^1 \\) موجودة في الأكوام الثلاث، يملك اللاعب الأول ثلاث نقلات رابحة: سحب \\( 1 \\) من \\( 6 \\) (لتصبح \\( 5 \\))، أو سحب \\( 3 \\) من \\( 11 \\) (لتصبح \\( 8 \\))، أو سحب \\( 1 \\) من \\( 14 \\) (لتصبح \\( 13 \\)).'
      ),
      makePractice(
        'Practice 8.5 · NSMO National Finals / IMO Classic', 'تدريب 8.5 · نهائيات نسما / كلاسيكيات IMO',
        'A chameleon island has \\( 13 \\) red, \\( 15 \\) green, and \\( 17 \\) blue chameleons. Whenever two chameleons of DIFFERENT colors meet, both change to the third color. Can all \\( 45 \\) chameleons ever become the same color?',
        'جزيرة عليها \\( 13 \\) حرباء حمراء، و\\( 15 \\) خضراء، و\\( 17 \\) زرقاء. كلما التقت حرباءان من لونين مختلفين تحولتا معاً إلى اللون الثالث. هل يمكن أن تصبح جميع الحرابي الـ \\( 45 \\) بلون واحد؟',
        'Track the pairwise differences \\( (R - G, G - B, B - R) \\) modulo \\( 3 \\)!',
        'تتبّع فروق الأعداد مثنى مثنى بترديد \\( 3 \\)!',
        'On a meeting of Red + Green \\( \\to 2 \\) Blue: \\( (R, G, B) \\to (R-1, G-1, B+2) \\). How does \\( G - R \\pmod 3 \\) or \\( B - G \\pmod 3 \\) change?',
        'عند تحول \\( (R, G, B) \\to (R-1, G-1, B+2) \\)، يتغير \\( B - G \\) بمقدار \\( +3 \\equiv 0 \\pmod 3 \\)!',
        'Compare initial residues \\( (13, 15, 17) \\equiv (1, 0, 2) \\pmod 3 \\) with monochromatic \\( (45, 0, 0) \\equiv (0, 0, 0) \\pmod 3 \\).',
        'قارن البواقي الابتدائية \\( (1, 0, 2) \\pmod 3 \\) بالحالة وحيدة اللون \\( (0, 0, 0) \\pmod 3 \\).',
        'Every meeting shifts \\( (R, G, B) \\) by a permutation of \\( (-1, -1, +2) \\), so all pairwise differences \\( R - G,\\; G - B,\\; B - R \\pmod 3 \\) are <strong>strictly invariant</strong>! Initially \\( (13, 15, 17) \\equiv (1, 0, 2) \\pmod 3 \\) (no two counts are congruent mod 3), whereas a monochromatic state \\( (45, 0, 0) \\) has two equal counts \\( 0 \\equiv 0 \\pmod 3 \\). Contradiction—so it is <strong>impossible</strong>!',
        'كل لقاء يغيّر الأعداد بمقدار \\( (-1, -1, +2) \\)، فتظل الفروق \\( R - G \\) و\\( G - B \\) بترديد \\( 3 \\) <strong>ثابتة تماماً</strong>! في البداية البواقي \\( (1, 0, 2) \\pmod 3 \\) مختلفة مثنى مثنى، بينما توحيد اللون يتطلب \\( (0, 0) \\) بترديد \\( 3 \\) للونين المختفيين، وهذا مستحيل!'
      ),
      {
        kind: 'seeAlso',
        links: [
          { label: 'Subsection II · NSMO of KSA: Screening & Regional Qualifiers', chapterId: 'ol-nsmo-stage1-2', trackId: 'olympiad' },
          { label: 'Subsection II · NSMO National Finals & IMO Pathway', chapterId: 'ol-nsmo-national-finals', trackId: 'olympiad' },
          { label: 'Subsection III · KAUST Campus Finals & Academy Synthesis', chapterId: 'ol-kaust-finals-academy', trackId: 'olympiad' }
        ]
      }
    ]
  },
  quizWidget: {
    enabled: true,
    domains: ['Invariants, Monovariants, Coloring & Games']
  }
};

module.exports = [ch07, ch08];
