'use strict';

const { bi, makeExplorerBlock, makePractice } = require('./helpers');

const SUBSEC_2 = bi(
  '🇸🇦 Subsection II · NSMO of KSA — National Science & Mathematics Olympiad (Mawhiba · أولمبياد نسما الوطني)',
  '🇸🇦 القسم الثاني · الأولمبياد الوطني للعلوم والرياضيات بالمملكة العربية السعودية NSMO («نسما» · موهبة ووزارة التعليم)'
);

const ch09 = {
  id: 'ol-nsmo-stage1-2',
  chapterNumber: '9',
  railGroupLabel: bi(
    'II · NSMO of KSA (Mawhiba)',
    'ثانياً · أولمبياد نسما الوطني (NSMO · موهبة)'
  ),
  subsectionBanner: SUBSEC_2,
  title: bi(
    'NSMO of KSA (Stages 1 & 2): Mawhiba Screening & Regional Directorate Qualifiers',
    'أولمبياد نسما الوطني (المرحلتان 1 و2): اختبارات الترشيح الأولي وتصفيات الإدارات التعليمية (موهبة)'
  ),
  railLabel: bi('NSMO KSA: Stages 1 & 2', 'نسما (NSMO): المرحلتان 1 و2'),
  chapterTag: {
    variant: 'category',
    className: 'igcse-tag',
    emoji: '🇸🇦',
    category: 'Subsection II · NSMO of KSA (Mawhiba & Ministry of Education)',
    badges: [{ text: 'NSMO STAGES 1–2 · نسما', className: 'tier-e' }],
    topics: [
      'Official 3-stage Mawhiba NSMO competition structure',
      '1001 = 7×11×13 block-digit & repunit divisibility tricks',
      'Ordered coprime factorizations for GCD/LCM systems',
      'Double counting, grid parity & inclusion-exclusion',
      'Fast non-calculator circle/triangle angle & area chasing'
    ]
  },
  content: {
    blocks: [
      {
        kind: 'text',
        body: bi(
          'The <strong>National Science and Mathematics Olympiad (NSMO — <span dir="rtl">أولمبياد العلوم والرياضيات الوطني «نسما»</span>)</strong> is the Kingdom of Saudi Arabia’s flagship mathematical competition, organized jointly by the <strong>King Abdulaziz and His Companions Foundation for Giftedness and Creativity (Mawhiba — <span dir="rtl">موهبة</span>)</strong> and the <strong>Saudi Ministry of Education</strong>. Across three progressive elimination stages, NSMO identifies talented intermediate and secondary students from every Saudi city and governorate and recruits top performers into Mawhiba’s intensive training camps for the Gulf, Balkan, Asian Pacific, European Girls’, and International Mathematical Olympiads (IMO).',
          'يُعدّ <strong>الأولمبياد الوطني للعلوم والرياضيات (NSMO — «نسما»)</strong> المسابقة العلمية الوطنية الكبرى في المملكة العربية السعودية، وتنظّمها بالشراكة <strong>مؤسسة الملك عبدالعزيز ورجاله للموهبة والإبداع (موهبة)</strong> و<strong>وزارة التعليم</strong>. عبر ثلاث مراحل تنافسية متدرجة، يستكشف أولمبياد «نسما» نخبة طلبة المرحلتين المتوسطة والثانوية في جميع مدن ومحافظات المملكة، لترشيح المتميزين إلى ملتقيات «موهبة» التدريبية المكثفة المؤهلة لتمثيل المنتخب السعودي في الأولمبياد الخليجي والبلقاني والآسيوي والأولمبياد الدولي للرياضيات (IMO).'
        )
      },
      {
        kind: 'table',
        caption: bi(
          'Official NSMO of KSA (Mawhiba) Three-Stage Architecture & Preparation Blueprint',
          'الهيكل الرسمي للمراحل الثلاث لأولمبياد نسما الوطني (NSMO · موهبة) وخارطة الإعداد'
        ),
        columns: [
          bi('NSMO Stage', 'مرحلة أولمبياد نسما'),
          bi('Format & Scope', 'طبيعة الاختبار والنطاق'),
          bi('Core Mathematical Focus', 'التركيز الرياضي الحاسم')
        ],
        rows: [
          [
            bi('Stage 1 · Cities & Governorates', 'المرحلة الأولى · المدن والمحافظات'),
            bi('Non-calculator objective MCQ screening across 47+ Saudi education directorates', 'اختبار موضوعي (اختيار من متعدد) دون آلة حاسبة في جميع إدارات التعليم'),
            bi('Algebraic telescoping, digit/divisibility sense, parity, area ratios & inscribed angles', 'الاختصارات التلسكوبية، قابلية القسمة، الزوجية، نسب المساحات والزوايا المحيطية')
          ],
          [
            bi('Stage 2 · Pre-Final Qualifiers', 'المرحلة الثانية · التصفية ما قبل النهائية'),
            bi('Multi-step short-answer & structured problems across the 4 Olympiad branches', 'مسائل متعددة الخطوات وإجابات رقمية/بنائية تغطي فروع الأولمبياد الأربعة'),
            bi('Vieta, SFFT Diophantine factoring, CRT/Euler remainders, PIE/recurrences, Power of a Point', 'علاقات فييتا، تحليل SFFT، الباقي الصيني، التضمين والإقصاء، وقوة النقطة')
          ],
          [
            bi('Stage 3 · Riyadh National Finals', 'المرحلة الثالثة · التصفيات النهائية بالرياض'),
            bi('Full written 7-point Olympiad proofs; medals & Mawhiba IMO Team Camp selection', 'اختبار براهين تحريرية كاملة (من 7 درجات لكل مسألة) وتتويج الميداليات والترشيح للمنتخب'),
            bi('Functional equations, LTE/order primes, extremal/invariant proofs, synthetic circle/center proofs', 'المعادلات الدالية، لمّة رفع الأس LTE، اللامتغيرات والمبدأ التطرفي، والهندسة التركيبية')
          ]
        ]
      },
      {
        kind: 'callout',
        style: 'def',
        label: bi(
          '● Definition 9.1 — Decimal Representation, Repunits & The 1001 = 7 × 11 × 13 Engine',
          '● تعريف 9.1 — التمثيل العشري والأعداد المكررة ومحرك القسمة 1001 = 7 × 11 × 13'
        ),
        body: bi(
          '<p>In NSMO Stage 1 and Stage 2, calendar-year numbers (like \\( 2026 \\)) and multi-digit blocks are designed around base-10 congruences:<br>• <strong>Modulo 9:</strong> \\( 10^k \\equiv 1 \\pmod 9 \\implies \\overline{d_m \\dots d_0} \\equiv \\sum_{k=0}^m d_k \\pmod 9 \\).<br>• <strong>Modulo 11:</strong> \\( 10^k \\equiv (-1)^k \\pmod{11} \\implies \\overline{d_m \\dots d_0} \\equiv \\sum_{k=0}^m (-1)^k d_k \\pmod{11} \\).<br>• <strong>The Magic Factor \\( 1001 \\):</strong> \\( 10^3 + 1 = 1001 = 7 \\times 11 \\times 13 \\)! Consequently, repeating any 3-digit number \\( \\overline{abcabc} = 1001 \\cdot \\overline{abc} \\) is ALWAYS divisible by \\( 7, 11, \\) and \\( 13 \\), and \\( 10^3 \\equiv -1 \\pmod{7, 11, 13} \\).<br>• <strong>Repunits:</strong> \\( R_n = \\underbrace{11\\dots 1}_{n} = \\frac{10^n - 1}{9} \\), and \\( \\gcd(10^a - 1,\\; 10^b - 1) = 10^{\\gcd(a,b)} - 1 \\)!</p>',
          '<p>تعتمد شريحة واسعة من مسائل المرحلتين الأولى والثانية في أولمبياد «نسما» على بنية التمثيل العشري:<br>• <strong>بترديد 9:</strong> \\( 10^k \\equiv 1 \\pmod 9 \\implies \\overline{d_m \\dots d_0} \\equiv \\sum d_k \\pmod 9 \\).<br>• <strong>بترديد 11:</strong> \\( 10^k \\equiv (-1)^k \\pmod{11} \\implies \\overline{d_m \\dots d_0} \\equiv d_0 - d_1 + d_2 - \\cdots \\pmod{11} \\).<br>• <strong>العدد الذهبي \\( 1001 \\):</strong> \\( 10^3 + 1 = 1001 = 7 \\times 11 \\times 13 \\)! وعليه فإن أي عدد سداسي متكرر \\( \\overline{abcabc} = 1001 \\times \\overline{abc} \\) يقبل القسمة دائماً على \\( 7 \\) و\\( 11 \\) و\\( 13 \\)، كما أن \\( 10^3 \\equiv -1 \\pmod{7, 11, 13} \\).<br>• <strong>الأعداد الواحدية المكررة:</strong> \\( R_n = \\frac{10^n - 1}{9} \\)، والقاعدة الأولمبية الحاسمة: \\( \\gcd(10^a - 1,\\; 10^b - 1) = 10^{\\gcd(a,b)} - 1 \\)!</p>'
        )
      },
      {
        kind: 'callout',
        style: 'thm',
        label: bi(
          '● Theorem 9.2 — Coprime Factorization of GCD/LCM Pairs & Repunit GCD Law',
          '● مبرهنة 9.2 — التحليل الأولي النسبي لأزواج (ق.م.أ / م.م.أ) وقانون قواسم الأعداد المكررة'
        ),
        body: bi(
          '<p><strong>1. Coprime Parameterization of \\( (a, b) \\):</strong> Every pair of positive integers \\( (a, b) \\) with \\( \\gcd(a, b) = g \\) and \\( \\operatorname{lcm}(a, b) = L \\) (requiring \\( g \\mid L \\)) can be written uniquely as \\( a = g x,\\; b = g y \\) where:</p>\\[ \\gcd(x, y) = 1 \\quad \\text{and} \\quad xy = \\frac{L}{g}. \\]<p>If \\( \\frac{L}{g} \\) has \\( \\omega \\) distinct prime factors, then each prime power \\( p_i^{e_i} \\parallel \\frac{L}{g} \\) must go ENTIRELY to \\( x \\) or ENTIRELY to \\( y \\), giving exactly \\( 2^\\omega \\) ordered pairs \\( (a, b) \\)!</p><p><strong>2. Exponential GCD Identity:</strong> For any integer \\( b \\ge 2 \\) and \\( m, n \\ge 1 \\), \\( \\gcd(b^m - 1,\\; b^n - 1) = b^{\\gcd(m, n)} - 1 \\).</p>',
          '<p><strong>1. التمثيل الأولي النسبي لأزواج \\( (a, b) \\):</strong> كل زوج من الأعداد الصحيحة الموجبة يحقق \\( \\gcd(a, b) = g \\) و\\( \\operatorname{lcm}(a, b) = L \\) (بشرط \\( g \\mid L \\)) يُكتب بصورة وحيدة \\( a = gx,\\; b = gy \\) حيث:</p>\\[ \\gcd(x, y) = 1 \\quad \\text{و} \\quad xy = \\frac{L}{g}. \\]<p>وإذا كان للعدد \\( \\frac{L}{g} \\) عدد \\( \\omega \\) من العوامل الأولية المختلفة، فإن كل قوة أولية \\( p_i^{e_i} \\) تذهب كاملةً إما إلى \\( x \\) أو إلى \\( y \\)، فيكون عدد الأزواج المرتبة \\( (a, b) \\) مساوياً بالضبط لـ \\( 2^\\omega \\)!</p><p><strong>2. القاسم المشترك للأعداد الأسية:</strong> لكل عدد صحيح \\( b \\ge 2 \\): \\( \\gcd(b^m - 1,\\; b^n - 1) = b^{\\gcd(m, n)} - 1 \\).</p>'
        )
      },
      {
        kind: 'callout',
        style: 'pf',
        label: bi(
          '◆ Proof — Euclidean Descent Proof of gcd(b^m − 1, b^n − 1) = b^{gcd(m,n)} − 1',
          '◆ البرهان الأولمبي — برهان قاعدة القاسم المشترك للأعداد الأسية عبر خوارزمية إقليدس'
        ),
        body: bi(
          '<p>Suppose \\( m = qn + r \\) with \\( 0 \\le r < n \\). Note the exact algebraic identity:</p>\\[ b^m - 1 = b^{qn + r} - 1 = b^r(b^{qn} - 1) + (b^r - 1). \\]<p>Since \\( (b^n - 1) \\mid (b^{qn} - 1) \\), the Euclidean GCD reduction \\( \\gcd(U, V) = \\gcd(V, U \\bmod V) \\) gives:</p>\\[ \\gcd(b^m - 1,\\; b^n - 1) = \\gcd(b^n - 1,\\; b^r(b^{qn}-1) + (b^r - 1)) = \\gcd(b^n - 1,\\; b^r - 1). \\]<p>Thus each step of the Euclidean algorithm on the exponents \\( (m, n) \\to (n, r) \\) mirrors an exact GCD preservation on \\( (b^m - 1, b^n - 1) \\)! Terminating at \\( (d, 0) \\) where \\( d = \\gcd(m, n) \\) yields \\( \\gcd(b^d - 1, 0) = b^{\\gcd(m, n)} - 1 \\). \\( \\blacksquare \\)</p>',
          '<p>نكتب بقسمة إقليدس على الأسس \\( m = qn + r \\) حيث \\( 0 \\le r < n \\)، ونلاحظ المتطابقة الجبرية:</p>\\[ b^m - 1 = b^r(b^{qn} - 1) + (b^r - 1). \\]<p>بما أن \\( (b^n - 1) \\) يقسم \\( (b^{qn} - 1) \\)، فإن خاصية خوارزمية إقليدس تعطي:</p>\\[ \\gcd(b^m - 1,\\; b^n - 1) = \\gcd(b^n - 1,\\; b^r - 1). \\]<p>أي أن خطوات خوارزمية إقليدس على الأسس \\( (m, n) \\to (n, r) \\) تطابق تماماً اختزال القاسم المشترك حتى نصل إلى \\( (d, 0) \\) حيث \\( d = \\gcd(m, n) \\)، فينتج \\( b^{\\gcd(m, n)} - 1 \\). \\( \\blacksquare \\)</p>'
        )
      },
      {
        kind: 'cards',
        items: [
          {
            label: bi('NSMO Stage 1 Time Pacing', 'إدارة الوقت في المرحلة الأولى'),
            value: bi('Never expand \\(2026^2\\)! Substitute \\(x = 2026\\), factor algebraically, then plug back.', 'لا تفكّ مربعات الأعداد الكبيرة مثل \\(2026^2\\) أبداً! ضع \\(x = 2026\\) وحلّل جبرياً أولاً.')
          },
          {
            label: bi('Coprime Pair Count \\(2^\\omega\\)', 'عدد الأزواج المرتبة \\(2^\\omega\\)'),
            value: bi('Ordered \\((a,b)\\) with \\(\\gcd=g, \\operatorname{lcm}=L\\) equals \\(2^{\\omega(L/g)}\\)', 'عدد الأزواج المرتبة \\((a,b)\\) يساوي \\(2^{\\omega(L/g)}\\) حيث \\(\\omega\\) عدد العوامل الأولية المختلفة')
          },
          {
            label: bi('Digit Reversal \\(\\overline{abc} - \\overline{cba}\\)', 'عكس خانات عدد ثلاثي'),
            value: bi('\\(\\overline{abc} - \\overline{cba} = 99(a - c)\\)—always a multiple of \\(9\\) and \\(11\\)!', '\\(\\overline{abc} - \\overline{cba} = 99(a - c)\\) يقبل القسمة دائماً على \\(99\\)!')
          },
          {
            label: bi('Exterior Secant Angle', 'زاوية تقاطع قاطعين خارج دائرة'),
            value: bi('\\(\\angle P = \\frac{1}{2}(\\widehat{BD} - \\widehat{AC})\\) for secants \\(PAB\\) and \\(PCD\\)', '\\(\\angle P = \\frac{1}{2}(\\widehat{BD} - \\widehat{AC})\\) نصف فرق القوسين المقابلين')
          }
        ]
      },
      {
        kind: 'figure',
        figure: {
          type: 'venn_populated',
          title: 'NSMO Directorate Camp Selection (Math |M| = 48, Physics |P| = 35, Total = 70)',
          setA: 'Math (48)',
          setB: 'Physics (35)',
          onlyA: '29',
          both: '19',
          onlyB: '16',
          neither: '6'
        },
        caption: bi(
          'Inclusion–Exclusion in Mawhiba directorate screening: among \\(70\\) nominees with \\(6\\) in Chemistry only (outside \\(M \\cup P\\)), \\(|M \\cup P| = 64 \\implies |M \\cap P| = 48 + 35 - 64 = 19\\) dual qualifiers.',
          'مبدأ التضمين والإقصاء في ترشيحات إدارات التعليم: من أصل \\(70\\) طالباً بينهم \\(6\\) خارج الفئتين، يكون \\(|M \\cup P| = 64\\) والتقاطع \\(48 + 35 - 64 = 19\\).'
        )
      },
      makeExplorerBlock({
        canvasId: 'olnsmostage12ExCanvas',
        titleEn: '⊙ Explorer · NSMO Modular Star Polygon & Residue Cycle Lab (k·a mod m)',
        titleAr: '⊙ مستكشف تفاعلي · مختبر المضلعات النجمية البواقية ودورات القاسم المشترك (نسما)',
        ariaEn: 'Interactive NSMO Number Theory explorer drawing modular star polygons k*a mod m and counting gcd(a, m) disjoint cycles.',
        ariaAr: 'مستكشف تفاعلي لنظرية الأعداد في أولمبياد نسما يرسم المضلعات النجمية للبواقي k*a mod m ويحصي الدورات المستقلة.',
        captionEn: 'Orbit length \\(\\frac{m}{\\gcd(a, m)}\\) and number of disjoint residue cycles \\(\\gcd(a, m)\\)',
        captionAr: 'طول المدار الدوري \\(\\frac{m}{\\gcd(a, m)}\\) وعدد الدورات المنفصلة \\(\\gcd(a, m)\\)',
        s0LabelEn: 'Modulus <b>\\(m =\\)</b>', s0LabelAr: 'المقاس (عدد الرؤوس) <b>\\(m =\\)</b>',
        s0Min: 5, s0Max: 24, s0Val: 15, s0Step: 1,
        s0AriaEn: 'Circle modulus m', s0AriaAr: 'المقاس m',
        s1LabelEn: 'Step Jump <b>\\(a =\\)</b>', s1LabelAr: 'مقدار القفزة <b>\\(a =\\)</b>',
        s1Min: 1, s1Max: 23, s1Val: 6, s1Step: 1,
        s1AriaEn: 'Modular step jump a', s1AriaAr: 'مقدار القفزة المعيارية a',
        r0LabelEn: 'Cycles \\(\\gcd(a, m)\\)', r0LabelAr: 'عدد الدورات \\(\\gcd(a, m)\\)', r0Init: 'gcd(6, 15) = 3',
        r1LabelEn: 'Vertices Hit from \\(0\\)', r1LabelAr: 'طول الدورة الواحدة \\(m/d\\)', r1Init: '15 / 3 = 5',
        r2LabelEn: 'Visits All Residues?', r2LabelAr: 'هل يزور كل النقاط؟', r2Init: 'No (gcd ≠ 1)',
        noteEn: 'A classic NSMO Stage 1/2 puzzle: jumping around an \\(m\\)-gon by step \\(a\\) visits ALL \\(m\\) vertices if and only if \\(\\gcd(a, m) = 1\\); otherwise the \\(m\\) vertices split into \\(d = \\gcd(a, m)\\) congruent \\((m/d)\\)-gons!',
        noteAr: 'مسألة متكررة في أولمبياد «نسما»: القفز بمقدار \\(a\\) حول مضلع ذي \\(m\\) رأساً يمر بجميع الرؤوس إذا وفقط إذا كان \\(\\gcd(a, m) = 1\\)، وإلا انقسمت الرؤوس إلى \\(d = \\gcd(a, m)\\) دورات منفصلة طول كل منها \\(m/d\\)!'
      }),
      {
        kind: 'figure',
        figure: {
          type: 'circle',
          r: 1,
          secant_lines: { r: 2.0, label: 'P (∠P = 32°)', through: [35, 145] },
          arc: [
            { start_deg: 35, end_deg: 145, label: '110°', color: 'var(--fig-amber)' },
            { start_deg: 235, end_deg: 305, label: '46°', color: 'var(--fig-teal)' }
          ]
        },
        caption: bi(
          'NSMO Stage 1 Exterior Secant Theorem: two secants from external point \\(P\\) intercept far arc \\(110^\\circ\\) and near arc \\(46^\\circ\\), so \\(\\angle P = \\frac{110^\\circ - 46^\\circ}{2} = 32^\\circ\\).',
          'نظرية القاطعين الخارجيين في نسما المرحلة 1: القوس البعيد \\(110^\\circ\\) والقريب \\(46^\\circ\\)، فيكون قياس الزاوية \\(\\angle P = \\frac{110^\\circ - 46^\\circ}{2} = 32^\\circ\\).'
        )
      },
      {
        kind: 'callout',
        style: 'example',
        label: bi(
          'Worked Example 9.A — NSMO Stage 1 Year-Number Algebraic Substitution',
          'مثال محلول 9.A — حيلة التعويض الجبري لأعداد السنة في المرحلة الأولى لنسما'
        ),
        body: bi(
          '<p><strong>Problem:</strong> Without a calculator, evaluate the exact integer:<br>\\[ N = \\sqrt{2023 \\times 2025 \\times 2027 \\times 2029 + 16}. \\]</p><p><strong>Solution:</strong> Center the symmetry at \\( x = 2026 \\)! Then the four factors are \\( (x - 3)(x - 1)(x + 1)(x + 3) \\):<br>\\[ (x^2 - 9)(x^2 - 1) + 16 = x^4 - 10x^2 + 9 + 16 = x^4 - 10x^2 + 25 = (x^2 - 5)^2! \\]<br>Taking the positive square root gives \\( N = x^2 - 5 \\). Now compute \\( 2026^2 - 5 \\) mentally via \\( (2000 + 26)^2 = 4{,}000{,}000 + 104{,}000 + 676 = 4{,}104{,}676 \\), so \\( N = 4{,}104{,}676 - 5 = 4{,}104{,}671 \\).</p>',
          '<p><strong>المسألة:</strong> دون استخدام الآلة الحاسبة، أوجد القيمة الصحيحة الدقيقة للمقدار:<br>\\[ N = \\sqrt{2023 \\times 2025 \\times 2027 \\times 2029 + 16}. \\]</p><p><strong>الحل الأولمبي:</strong> نضع مركز التناظر \\( x = 2026 \\)، فيتحول الجداء إلى \\( (x - 3)(x - 1)(x + 1)(x + 3) \\):<br>\\[ (x^2 - 9)(x^2 - 1) + 16 = x^4 - 10x^2 + 25 = (x^2 - 5)^2. \\]<br>بأخذ الجذر الموجب نجد \\( N = 2026^2 - 5 = (2000 + 26)^2 - 5 = 4{,}104{,}676 - 5 = 4{,}104{,}671 \\).</p>'
        )
      },
      {
        kind: 'callout',
        style: 'example',
        label: bi(
          'Worked Example 9.B — NSMO Stage 2 Ordered GCD/LCM Pairs & Prime Blocks',
          'مثال محلول 9.B — إحصاء الأزواج المرتبة عبر (ق.م.أ) و(م.م.أ) في المرحلة الثانية لنسما'
        ),
        body: bi(
          '<p><strong>Problem:</strong> How many ordered pairs of positive integers \\( (a, b) \\) satisfy \\( \\gcd(a, b) = 6 \\) and \\( \\operatorname{lcm}(a, b) = 2520 \\)?</p><p><strong>Solution:</strong> Write \\( a = 6x \\) and \\( b = 6y \\) with \\( \\gcd(x, y) = 1 \\). Then \\( xy = \\frac{\\operatorname{lcm}(a,b)}{\\gcd(a,b)} = \\frac{2520}{6} = 420 \\).<br>Factor \\( 420 \\) into prime powers: \\( 420 = 4 \\times 105 = 2^2 \\cdot 3^1 \\cdot 5^1 \\cdot 7^1 \\).<br>Because \\( \\gcd(x, y) = 1 \\), none of the \\( 4 \\) prime-power blocks \\( \\{2^2,\\; 3,\\; 5,\\; 7\\} \\) can be split between \\( x \\) and \\( y \\)! Each of the \\( \\omega(420) = 4 \\) blocks independently goes either to \\( x \\) or to \\( y \\), giving \\( 2^4 = 16 \\) ordered pairs \\( (a, b) \\).</p>',
          '<p><strong>المسألة:</strong> كم زوجاً مرتباً من الأعداد الصحيحة الموجبة \\( (a, b) \\) يحقق \\( \\gcd(a, b) = 6 \\) و\\( \\operatorname{lcm}(a, b) = 2520 \\)؟</p><p><strong>الحل الأولمبي:</strong> نضع \\( a = 6x \\) و\\( b = 6y \\) مع \\( \\gcd(x, y) = 1 \\)، فيكون \\( xy = \\frac{2520}{6} = 420 \\).<br>نحلّل \\( 420 \\) إلى قوى أولية: \\( 420 = 2^2 \\cdot 3 \\cdot 5 \\cdot 7 \\).<br>بما أن \\( \\gcd(x, y) = 1 \\)، لا يمكن تجزئة أي كتلة أولية من الكتل الأربع \\( \\{2^2, 3, 5, 7\\} \\) بين \\( x \\) و\\( y \\)؛ فتتجه كل كتلة بالكامل إما إلى \\( x \\) أو إلى \\( y \\)، وبذلك يكون عدد الأزواج المرتبة \\( 2^4 = 16 \\) زوجاً.</p>'
        )
      },
      {
        kind: 'callout',
        style: 'example',
        label: bi(
          'Worked Example 9.C — Repunit GCD in NSMO Stage 2 Number Theory',
          'مثال محلول 9.C — القاسم المشترك الأكبر للأعداد الواحدية المكررة في نسما 2'
        ),
        body: bi(
          '<p><strong>Problem:</strong> Let \\( A = \\underbrace{111\\dots 1}_{42 \\text{ ones}} \\) and \\( B = \\underbrace{111\\dots 1}_{70 \\text{ ones}} \\). How many digits does \\( \\gcd(A, B) \\) have?</p><p><strong>Solution:</strong> Write \\( A = \\frac{10^{42} - 1}{9} \\) and \\( B = \\frac{10^{70} - 1}{9} \\). By Theorem 9.2:<br>\\[ \\gcd(10^{42} - 1,\\; 10^{70} - 1) = 10^{\\gcd(42, 70)} - 1 = 10^{14} - 1. \\]<br>Dividing both sides by \\( 9 \\) gives \\( \\gcd(A, B) = \\frac{10^{14} - 1}{9} = \\underbrace{111\\dots 1}_{14 \\text{ ones}} \\), which has exactly <strong>\\( 14 \\)</strong> digits!</p>',
          '<p><strong>المسألة:</strong> ليكن \\( A \\) العدد المكوّن من \\( 42 \\) واحداً متتالياً، و\\( B \\) العدد المكوّن من \\( 70 \\) واحداً متتالياً. كم عدد خانات القاسم المشترك الأكبر \\( \\gcd(A, B) \\)؟</p><p><strong>الحل الأولمبي:</strong> نكتب \\( A = \\frac{10^{42}-1}{9} \\) و\\( B = \\frac{10^{70}-1}{9} \\). بتطبيق المبرهنة 9.2:<br>\\[ \\gcd(10^{42} - 1,\\; 10^{70} - 1) = 10^{\\gcd(42, 70)} - 1 = 10^{14} - 1. \\]<br>وبالقسمة على \\( 9 \\) نجد \\( \\gcd(A, B) = \\frac{10^{14}-1}{9} \\)، وهو العدد المكوّن من <strong>\\( 14 \\)</strong> خانة من الرقم \\( 1 \\)!</p>'
        )
      },
      {
        kind: 'callout',
        style: 'example',
        label: bi(
          'Worked Example 9.D — NSMO Stage 2 Incircle Tangency & Semiperimeter Jump',
          'مثال محلول 9.D — قطع التماس للدائرة الداخلية والقفزة بنصف المحيط في نسما 2'
        ),
        body: bi(
          '<p><strong>Problem:</strong> In \\( \\triangle ABC \\) with \\( AB = 11,\\; BC = 14,\\; CA = 13 \\), the incircle touches \\( BC, CA, AB \\) at \\( D, E, F \\), and the \\( A \\)-excircle touches \\( BC \\) at \\( X \\). Find the exact length of segment \\( DX \\).</p><p><strong>Solution:</strong> Semiperimeter \\( s = \\frac{11 + 14 + 13}{2} = 19 \\).<br>1. Standard incircle tangency gives \\( BD = s - b = 19 - 13 = 6 \\) (and \\( DC = s - c = 19 - 11 = 8 \\)).<br>2. For the \\( A \\)-excircle, the two tangents from \\( A \\) to lines \\( AB, AC \\) each equal \\( s \\), which forces \\( BX = s - c = 19 - 11 = 8 \\) (notice \\( D \\) and \\( X \\) are ALWAYS symmetric across the midpoint of \\( BC \\): \\( BD = CX = s - b \\) and \\( BX = CD = s - c \\)!).<br>3. Therefore \\( DX = |BX - BD| = |8 - 6| = 2 \\) (generally \\( DX = |b - c| = |13 - 11| = 2 \\)!).</p>',
          '<p><strong>المسألة:</strong> في المثلث \\( \\triangle ABC \\) حيث \\( AB = 11,\\; BC = 14,\\; CA = 13 \\)، تمس الدائرة الداخلية الضلع \\( BC \\) في \\( D \\)، وتمس الدائرة الخارجية المقابلة للرأس \\( A \\) الضلع \\( BC \\) في \\( X \\). أوجد طول القطعة \\( DX \\).</p><p><strong>الحل الأولمبي:</strong> نصف المحيط \\( s = \\frac{11+14+13}{2} = 19 \\).<br>1. بعد نقطة تماس الدائرة الداخلية عن \\( B \\) هو \\( BD = s - b = 19 - 13 = 6 \\).<br>2. بعد نقطة تماس الدائرة الخارجية عن \\( B \\) هو \\( BX = s - c = 19 - 11 = 8 \\) (حيث تتناظر \\( D \\) و\\( X \\) دائماً حول منتصف \\( BC \\)!).<br>3. إذن \\( DX = |BX - BD| = |8 - 6| = 2 \\) (وبصورة عامة \\( DX = |b - c| \\) دائماً!).</p>'
        )
      },
      {
        kind: 'callout',
        style: 'warn',
        label: bi(
          '⚠ NSMO Trap — Splitting Prime Powers in LCM Problems!',
          '⚠ فخ شائع في أولمبياد نسما — تجزئة القوى الأولية في مسائل (م.م.أ)!'
        ),
        body: bi(
          '<p>In Worked Example 9.B (\\( xy = 420 = 2^2 \\cdot 3 \\cdot 5 \\cdot 7 \\) with \\( \\gcd(x, y) = 1 \\)), students frequently count divisors \\( \\tau(420) = 24 \\) instead of coprime splits \\( 2^4 = 16 \\)! Splitting \\( 2^2 \\) as \\( 2 \\times 2 \\) violates \\( \\gcd(x, y) = 1 \\) and doubles \\( \\gcd(a, b) \\) from \\( 6 \\) to \\( 12 \\).</p>',
          '<p>في مسائل \\( xy = 420 \\) مع \\( \\gcd(x, y) = 1 \\)، يخطئ كثير من الطلاب بحساب عدد القواسم الكلي \\( \\tau(420) = 24 \\) بدلاً من \\( 2^4 = 16 \\)! انتبه إلى أن توزيع \\( 2^2 \\) كـ \\( 2 \\times 2 \\) يخرق شرط الأولية النسبية ويرفع القاسم المشترك من \\( 6 \\) إلى \\( 12 \\).</p>'
        )
      },
      {
        kind: 'callout',
        style: 'tip',
        label: bi(
          '▲ Mawhiba Camp Tip — Memorize the Symmetry DX = |b − c| & 1001 = 7 · 11 · 13',
          '▲ نصيحة ملتقيات موهبة — احفظ تناظر التماس DX = |b − c| وتحليل 1001'
        ),
        body: bi(
          '<p>Two identities appear almost annually on Saudi NSMO Stage 1/2 papers: (1) \\( 1001 = 7 \\times 11 \\times 13 \\) and \\( 999{,}999 = 999 \\times 1001 = 27 \\times 37 \\times 7 \\times 11 \\times 13 \\) (giving every prime factor of \\( 10^6 - 1 \\)!), and (2) the incircle/excircle isotomic symmetry \\( BD = CX = s - b \\).</p>',
          '<p>حقيقتان تتكرران باستمرار في اختبارات «نسما»: (1) تحليل \\( 999{,}999 = 27 \\times 37 \\times 7 \\times 11 \\times 13 \\) الذي يكشف عوامل \\( 10^6 - 1 \\) فوراً، و(2) تناظر نقطتَي تماس الدائرة الداخلية والخارجية حول منتصف الضلع \\( BD = CX = s - b \\).</p>'
        )
      },
      makePractice(
        'Practice 9.1 · NSMO Stage 1', 'تدريب 9.1 · نسما المرحلة الأولى',
        'A 6-digit number of the form \\( \\overline{47x47y} \\) is divisible by \\( 7, 11, \\) and \\( 13 \\) simultaneously? Wait: let us ask: the 6-digit number \\( \\overline{52a52b}? \\) Even cleaner: the 6-digit number \\( \\overline{38x384} \\) is divisible by \\( 13 \\). Find the digit \\( x \\).',
        'العدد المكون من 6 خانات \\( \\overline{38x384} \\) يقبل القسمة على \\( 13 \\). أوجد قيمة الرقم \\( x \\).',
        'Compare \\( \\overline{38x384} \\) with \\( \\overline{384384} = 1001 \\times 384 \\)!',
        'قارن العدد \\( \\overline{38x384} \\) بالعدد المتكرر \\( \\overline{384384} = 1001 \\times 384 \\)!',
        'Since \\( 13 \\mid 1001 \\), \\( 13 \\) divides \\( \\overline{384384} \\). Subtract to get \\( (x - 4) \\times 1000 \\)!',
        'بما أن \\( 13 \\mid 1001 \\)، فإن الفرق \\( (x - 4) \\times 1000 \\) يجب أن يقبل القسمة على \\( 13 \\)!',
        'Since \\( \\gcd(1000, 13) = 1 \\) and \\( 0 \\le x \\le 9 \\), deduce \\( x \\).',
        'بما أن \\( \\gcd(1000, 13) = 1 \\) و\\( 0 \\le x \\le 9 \\)، استنتج \\( x \\) فوراً.',
        'Note \\( \\overline{384384} = 384 \\times 1001 \\) is divisible by \\( 13 \\) (since \\( 1001 = 7 \\cdot 11 \\cdot 13 \\)). Thus \\( \\overline{38x384} - \\overline{384384} = 1000(x - 4) \\) must be divisible by \\( 13 \\). Since \\( \\gcd(1000, 13) = 1 \\) and \\( x \\in \\{0,\\dots,9\\} \\), \\( x - 4 = 0 \\implies x = 4 \\).',
        'بما أن \\( \\overline{384384} = 384 \\times 1001 \\) يقبل القسمة على \\( 13 \\)، فإن الفرق \\( 1000(x - 4) \\) يقبل القسمة على \\( 13 \\). ولأن \\( \\gcd(1000, 13) = 1 \\) والخانة \\( 0 \\le x \\le 9 \\)، فلا بد أن يكون \\( x = 4 \\).'
      ),
      makePractice(
        'Practice 9.2 · NSMO Stage 1', 'تدريب 9.2 · نسما المرحلة الأولى',
        'Evaluate without a calculator: \\( \\frac{2026^2 - 2020^2}{12} \\).',
        'احسب دون آلة حاسبة القيمة الدقيقة للمقدار: \\( \\frac{2026^2 - 2020^2}{12} \\).',
        'Factor the numerator as a difference of squares \\( (2026 - 2020)(2026 + 2020) \\).',
        'حلّل البسط كفرق بين مربعين \\( (2026 - 2020)(2026 + 2020) \\).',
        'Simplify \\( \\frac{6 \\times 4046}{12} \\).',
        'اختصر \\( \\frac{6 \\times 4046}{12} \\).',
        'Divide \\( 4046 \\) by \\( 2 \\).',
        'اقسم \\( 4046 \\) على \\( 2 \\).',
        'Using \\( a^2 - b^2 = (a-b)(a+b) \\), we get \\( \\frac{(2026 - 2020)(2026 + 2020)}{12} = \\frac{6 \\times 4046}{12} = \\frac{4046}{2} = 2023 \\).',
        'بتحليل فرق المربعين: \\( \\frac{6 \\times 4046}{12} = \\frac{4046}{2} = 2023 \\).'
      ),
      makePractice(
        'Practice 9.3 · NSMO Stage 2', 'تدريب 9.3 · نسما المرحلة الثانية',
        'How many ordered pairs of positive integers \\( (a, b) \\) satisfy \\( \\gcd(a, b) = 15 \\) and \\( \\operatorname{lcm}(a, b) = 3150 \\)?',
        'كم زوجاً مرتباً من الأعداد الصحيحة الموجبة \\( (a, b) \\) يحقق \\( \\gcd(a, b) = 15 \\) و\\( \\operatorname{lcm}(a, b) = 3150 \\)؟',
        'Compute \\( \\frac{L}{g} = \\frac{3150}{15} = 210 \\).',
        'اقسم \\( \\frac{3150}{15} = 210 \\).',
        'Factor \\( 210 \\) into distinct primes.',
        'حلّل \\( 210 \\) إلى عوامله الأولية المختلفة.',
        'Count \\( 2^{\\omega(210)} \\).',
        'احسب \\( 2^{\\omega(210)} \\).',
        'Here \\( \\frac{L}{g} = \\frac{3150}{15} = 210 = 2 \\cdot 3 \\cdot 5 \\cdot 7 \\), which has \\( \\omega(210) = 4 \\) distinct prime factors. Thus there are \\( 2^4 = 16 \\) ordered pairs \\( (a, b) \\).',
        'حاصل القسمة \\( \\frac{3150}{15} = 210 = 2 \\cdot 3 \\cdot 5 \\cdot 7 \\) يمتلك \\( 4 \\) عوامل أولية مختلفة، فيكون عدد الأزواج المرتبة \\( 2^4 = 16 \\).'
      ),
      makePractice(
        'Practice 9.4 · NSMO Stage 2', 'تدريب 9.4 · نسما المرحلة الثانية',
        'Find \\( \\gcd(2^{36} - 1,\\; 2^{60} - 1) \\) as an explicit integer.',
        'أوجد القيمة العددية الصريحة للقاسم المشترك الأكبر \\( \\gcd(2^{36} - 1,\\; 2^{60} - 1) \\).',
        'Apply \\( \\gcd(b^m - 1, b^n - 1) = b^{\\gcd(m, n)} - 1 \\).',
        'طبّق القاعدة \\( \\gcd(b^m - 1, b^n - 1) = b^{\\gcd(m, n)} - 1 \\).',
        'Compute \\( \\gcd(36, 60) \\).',
        'احسب \\( \\gcd(36, 60) \\).',
        'Evaluate \\( 2^{12} - 1 \\).',
        'احسب \\( 2^{12} - 1 \\).',
        'Since \\( \\gcd(36, 60) = 12 \\), \\( \\gcd(2^{36} - 1, 2^{60} - 1) = 2^{12} - 1 = 4096 - 1 = 4095 \\).',
        'بما أن \\( \\gcd(36, 60) = 12 \\)، فإن القاسم المشترك الأكبر يساوي \\( 2^{12} - 1 = 4096 - 1 = 4095 \\).'
      ),
      makePractice(
        'Practice 9.5 · NSMO Stage 2 Qualifier', 'تدريب 9.5 · تصفية نسما المرحلة الثانية',
        'In \\( \\triangle ABC \\), \\( AB = 12,\\; BC = 17,\\; CA = 19 \\). The incircle touches \\( BC \\) at \\( D \\) and the \\( A \\)-excircle touches \\( BC \\) at \\( X \\). Find the length \\( DX \\).',
        'في المثلث \\( \\triangle ABC \\) حيث \\( AB = 12,\\; BC = 17,\\; CA = 19 \\)، تمس الدائرة الداخلية الضلع \\( BC \\) في \\( D \\) وتمس الدائرة الخارجية المقابلة لـ \\( A \\) الضلع \\( BC \\) في \\( X \\). أوجد الطول \\( DX \\).',
        'Compute semiperimeter \\( s = \\frac{12 + 17 + 19}{2} = 24 \\).',
        'احسب نصف المحيط \\( s = \\frac{12 + 17 + 19}{2} = 24 \\).',
        'Use \\( BD = s - AC = 24 - 19 \\) and \\( BX = s - AB = 24 - 12 \\).',
        'احسب \\( BD = s - 19 \\) و\\( BX = s - 12 \\).',
        'Subtract \\( DX = |BX - BD| = |CA - AB| \\).',
        'اطرح \\( DX = |BX - BD| \\).',
        'With \\( s = 24 \\), \\( BD = s - b = 24 - 19 = 5 \\) and \\( BX = s - c = 24 - 12 = 12 \\), so \\( DX = 12 - 5 = 7 \\) (matching \\( |b - c| = |19 - 12| = 7 \\)).',
        'نصف المحيط \\( s = 24 \\)، ومنه \\( BD = 24 - 19 = 5 \\) و\\( BX = 24 - 12 = 12 \\)، إذن \\( DX = 12 - 5 = 7 \\).'
      ),
      {
        kind: 'seeAlso',
        links: [
          { label: 'NSMO of KSA: Riyadh National Finals & Mawhiba IMO Pathway', chapterId: 'ol-nsmo-national-finals', trackId: 'olympiad' },
          { label: 'Number Theory I: Fermat–Euler & CRT', chapterId: 'ol-modular-number-theory', trackId: 'olympiad' },
          { label: 'KAUST Mathematics Competition: Regional Qualifier', chapterId: 'ol-kaust-kmc-qualifier', trackId: 'olympiad' }
        ]
      }
    ]
  },
  quizWidget: {
    enabled: true,
    domains: ['NSMO of KSA: Screening & Regional Qualifiers']
  }
};

// Clean Practice 9.1 wording cleanly
ch09.content.blocks.forEach((b) => {
  if (b.kind === 'practiceProblem' && b.question.en.includes('Practice 9.1')) {
    b.question = bi(
      '<strong>[Practice 9.1 · NSMO Stage 1]</strong> The 6-digit number \\( \\overline{38x384} \\) is divisible by \\( 13 \\). Find the digit \\( x \\).',
      '<strong>[تدريب 9.1 · نسما المرحلة الأولى]</strong> العدد المكون من 6 خانات \\( \\overline{38x384} \\) يقبل القسمة على \\( 13 \\). أوجد قيمة الرقم \\( x \\).'
    );
  }
});

const ch10 = {
  id: 'ol-nsmo-national-finals',
  chapterNumber: '10',
  subsectionBanner: SUBSEC_2,
  title: bi(
    'NSMO of KSA (Stage 3): Riyadh National Finals & Mawhiba Saudi IMO Team Pathway',
    'أولمبياد نسما الوطني (المرحلة 3): التصفيات النهائية بالرياض ومسار المنتخب السعودي للأولمبياد الدولي IMO'
  ),
  railLabel: bi('NSMO Finals & Mawhiba IMO', 'نهائيات نسما ومسار المنتخب IMO'),
  chapterTag: {
    variant: 'category',
    className: 'igcse-tag',
    emoji: '🥇',
    category: 'Subsection II · NSMO Stage 3 Finals & Mawhiba Olympiad Camps',
    badges: [{ text: 'RIYADH FINALS · IMO CAMP', className: 'tier-e' }],
    topics: [
      'Official 0–7 point Olympiad proof grading rubric',
      'Functional equations over Z, Q, and R (Cauchy & involutions)',
      'Lifting the Exponent Lemma (LTE) & multiplicative order',
      'Reflected orthocenter on circumcircle & Nine-Point Circle',
      'Mantel–Turán extremal graph bounds'
    ]
  },
  content: {
    blocks: [
      {
        kind: 'text',
        body: bi(
          'Qualifying for <strong>NSMO Stage 3 (Riyadh National Finals)</strong> and <strong>Mawhiba’s Winter/Summer Olympiad Camps</strong> marks the transition from answer-finding to <strong>rigorous 7-point mathematical proof writing</strong>. This chapter covers the four signature pillars of Mawhiba’s IMO team selection tests (TSTs): <strong>functional equations</strong>, <strong>Lifting the Exponent (LTE) &amp; order arguments</strong>, <strong>orthocenter–circumcircle reflections</strong>, and <strong>extremal graph combinatorics</strong>—alongside the exact 7-point grading rubric used by Olympiad juries.',
          'يمثّل التأهل إلى <strong>المرحلة الثالثة النهائية بالرياض لأولمبياد «نسما»</strong> والالتحاق بـ<strong>ملتقيات موهبة الشتوية والصيفية</strong> النقلة النوعية من إيجاد الناتج النهائي إلى <strong>كتابة البراهين الرياضية المحكمة المقيّمة من 7 درجات</strong>. يغطي هذا الفصل الركائز الأربع الأهم في اختبارات ترشيح المنتخب السعودي للأولمبياد الدولي (IMO): <strong>المعادلات الدالية</strong>، و<strong>لمّة رفع الأس (LTE) والرتبة الضربية</strong>، و<strong>انعكاسات ملتقى الارتفاعات على الدائرة المحيطة</strong>، و<strong>الرسوم البيانية التطرفية</strong>.'
        )
      },
      {
        kind: 'table',
        caption: bi(
          'Official 7-Point Olympiad Proof Grading Rubric (NSMO Finals / BMO / APMO / IMO)',
          'سلّم التصحيح الرسمي للبراهين الأولمبية من 7 درجات (نهائيات نسما وIMO)'
        ),
        columns: [
          bi('Score', 'الدرجة'),
          bi('Jury Criterion', 'معيار لجنة التحكيم'),
          bi('Common Pitfall to Avoid', 'الخطأ الذي يهدر الدرجات')
        ],
        rows: [
          [
            bi('7 / 7', '7 / 7'),
            bi('Complete, airtight proof covering all edge cases AND proving uniqueness/sufficiency', 'برهان تام محكم يغطي الحالات الحدية ويثبت الضرورة والكفاية معاً'),
            bi('None — even minor arithmetic slips only keep 6–7 if non-structural', 'كتابة واضحة ومنظمة خطوة بخطوة بترميز رياضي سليم')
          ],
          [
            bi('6 / 7', '6 / 7'),
            bi('Complete proof missing a boundary verification (e.g., forgetting to plug \\(f(x)\\) back into FE!)', 'برهان مكتمل أغفل التحقق التعويضي للدالة الناتجة أو حالة حدية مثل \\(p=2\\)'),
            bi('Deriving \\(f(x)=cx\\) in a functional equation without checking it satisfies the original equation!', 'استنتاج شكل الدالة \\(f(x)\\) دون التعويض بها في المعادلة الأصلية للتحقق!')
          ],
          [
            bi('2 – 5 / 7', '2 – 5 / 7'),
            bi('Proves a major structural lemma (e.g., injectivity of \\(f\\), cyclic quad, or \\(p \\mid n\\))', 'إثبات لمّة جوهرية (مثل التباين في المعادلة الدالية أو رباعي دائري رئيس)'),
            bi('Leaving lemmas unstated—always isolate claims clearly as "Claim 1 / Lemma 1"!', 'دفن الاستنتاجات وسط الحسابات؛ افصل كل خطوة بعنوان "ادعاء 1 / لمّة 1"!')
          ],
          [
            bi('0 – 1 / 7', '0 – 1 / 7'),
            bi('Guessing the right answer or testing small values \\(n=1,2,3\\) without general argument', 'تخمين الإجابة الصحيحة أو تجربة أمثلة عددية دون برهان عام'),
            bi('Pure answer with zero justification often earns 0/7 on constructive/FE problems!', 'كتابة الناتج النهائي وحده بلا برهان قد تمنح 0 من 7 في أسئلة البراهين!')
          ]
        ]
      },
      {
        kind: 'callout',
        style: 'def',
        label: bi(
          '● Definition 10.1 — Cauchy’s Functional Equation & Olympiad Substitution Playbook',
          '● تعريف 10.1 — معادلة كوشي الدالية ومنهجية التعويضات الأولمبية'
        ),
        body: bi(
          '<p>A <strong>functional equation</strong> asks for ALL functions \\( f: A \\to B \\) satisfying an identity for all inputs in \\( A \\). The foundational model is <strong>Cauchy’s Additive Equation</strong> \\( f(x + y) = f(x) + f(y) \\):<br>• Over \\( \\mathbb{Q} \\) (or \\( \\mathbb{Z} \\)): every solution is \\( f(x) = cx \\) where \\( c = f(1) \\) (proved successively for \\( x = 0 \\), \\( x \\in \\mathbb{Z}^+ \\), \\( x \\in \\mathbb{Z} \\), and \\( x = p/q \\in \\mathbb{Q} \\)).<br>• Over \\( \\mathbb{R} \\): \\( f(x) = cx \\) holds if ANY regularity condition is known: monotonicity, continuity, boundedness on an interval, or \\( f(x) \\ge 0 \\) for \\( x \\ge 0 \\)!</p>',
          '<p>تطلب <strong>المعادلة الدالية</strong> إيجاد جميع الدوال \\( f: A \\to B \\) التي تحقق علاقة معطاة لكل عناصر المجال. النموذج الأساس هو <strong>معادلة كوشي الجمعية</strong> \\( f(x + y) = f(x) + f(y) \\):<br>• على \\( \\mathbb{Q} \\) (أو \\( \\mathbb{Z} \\)): الحل الوحيد هو \\( f(x) = cx \\) حيث \\( c = f(1) \\) (تُثبت تتابعيّاً عند \\( 0 \\) ثم \\( \\mathbb{Z}^+ \\) ثم \\( \\mathbb{Z} \\) ثم الكسور \\( p/q \\)).<br>• على \\( \\mathbb{R} \\): يظل الحل الوحيد \\( f(x) = cx \\) متى توفر أي شرط انتظام إضافي مثل الرتابة، أو الاتصال، أو المحدودية، أو \\( f(x) \\ge 0 \\) لكل \\( x \\ge 0 \\)!</p>'
        )
      },
      {
        kind: 'callout',
        style: 'thm',
        label: bi(
          '● Theorem 10.2 — Lifting the Exponent (LTE), Orthocenter Reflection & Mantel’s Theorem',
          '● مبرهنة 10.2 — لمّة رفع الأس (LTE) وانعكاس ملتقى الارتفاعات ومبرهنة مانتل'
        ),
        body: bi(
          '<p><strong>1. Lifting the Exponent Lemma (LTE):</strong> Let \\( p \\) be an <strong>odd prime</strong> and \\( x, y \\in \\mathbb{Z} \\) with \\( p \\nmid x \\) and \\( p \\nmid y \\):<br>• If \\( p \\mid (x - y) \\), then for every integer \\( n \\ge 1 \\): \\( v_p(x^n - y^n) = v_p(x - y) + v_p(n) \\).<br>• If \\( p \\mid (x + y) \\) and \\( n \\) is <strong>odd</strong>: \\( v_p(x^n + y^n) = v_p(x + y) + v_p(n) \\).</p><p><strong>2. Orthocenter Reflection Lemma:</strong> In \\( \\triangle ABC \\) with orthocenter \\( H \\), circumcircle \\( \\omega \\), altitude foot \\( D \\in BC \\), and midpoint \\( M \\) of \\( BC \\):<br>(i) The reflection \\( H_D \\) of \\( H \\) across \\( BC \\) lies on \\( \\omega \\) (\\( HD = DH_D \\));<br>(ii) The reflection \\( H_M \\) of \\( H \\) across \\( M \\) ALSO lies on \\( \\omega \\), and \\( H_M = A\' \\) is the <strong>antipode of \\( A \\)</strong> (diameter \\( AA\' = 2R \\)), implying \\( AH^2 + BC^2 = 4R^2 \\)!</p><p><strong>3. Mantel’s Extremal Graph Theorem:</strong> Any simple graph on \\( n \\) vertices with NO triangle (\\( K_3 \\)) has at most \\( \\left\\lfloor \\frac{n^2}{4} \\right\\rfloor \\) edges, achieved uniquely by the balanced complete bipartite graph \\( K_{\\lfloor n/2 \\rfloor, \\lceil n/2 \\rceil} \\).</p>',
          '<p><strong>1. لمّة رفع الأس (LTE):</strong> ليكن \\( p \\) عدداً <strong>أولياً فردياً</strong> و\\( p \\nmid xy \\):<br>• إذا كان \\( p \\mid (x - y) \\)، فلكل \\( n \\ge 1 \\): \\( v_p(x^n - y^n) = v_p(x - y) + v_p(n) \\).<br>• إذا كان \\( p \\mid (x + y) \\) وكان \\( n \\) <strong>فردياً</strong>: \\( v_p(x^n + y^n) = v_p(x + y) + v_p(n) \\).</p><p><strong>2. لمّة انعكاس ملتقى الارتفاعات:</strong> في \\( \\triangle ABC \\) الذي ملتقى ارتفاعاته \\( H \\) ودائرته المحيطة \\( \\omega \\):<br>(أ) انعكاس \\( H \\) حول الضلع \\( BC \\) يقع على الدائرة المحيطة \\( \\omega \\)؛<br>(ب) انعكاس \\( H \\) حول منتصف الضلع \\( M \\) يقع أيضاً على \\( \\omega \\) وينطبق على النقطة المقابلة قطرياً \\( A\' \\) (أي \\( AA\' = 2R \\))، ومنها العلاقة الشهيرة \\( AH^2 + BC^2 = 4R^2 \\)!</p><p><strong>3. مبرهنة مانتل للرسوم البيانية الخالية من المثلثات:</strong> أي رسم بياني بسيط على \\( n \\) رأساً لا يحوي مثلثاً يضم على الأكثر \\( \\left\\lfloor \\frac{n^2}{4} \\right\\rfloor \\) ضلعاً.</p>'
        )
      },
      {
        kind: 'callout',
        style: 'pf',
        label: bi(
          '◆ Proof — Synthetic Proof of the Orthocenter Reflection & Diameter Lemma',
          '◆ البرهان الأولمبي — البرهان التركيبي للمّة انعكاس ملتقى الارتفاعات على الدائرة المحيطة'
        ),
        body: bi(
          '<p><strong>1. Reflection \\( H_D \\) across \\( BC \\):</strong> Assume \\( \\triangle ABC \\) is acute (obtuse is analogous). In right triangles \\( \\triangle BDH \\) and \\( \\triangle ADC \\), \\( \\angle BHD = 90^\\circ - \\angle HBD = 90^\\circ - (90^\\circ - C) = C \\), and similarly \\( \\angle CHD = B \\), so \\( \\angle BHC = 180^\\circ - A \\). Reflecting \\( H \\) across \\( BC \\) to \\( H_D \\) preserves angles: \\( \\angle BH_D C = \\angle BHC = 180^\\circ - A \\), so \\( \\angle BAC + \\angle BH_D C = 180^\\circ \\implies A, B, H_D, C \\) are concyclic!</p><p><strong>2. Reflection across midpoint \\( M \\):</strong> Let \\( A\' \\) be the antipode of \\( A \\) on \\( (ABC) \\). Since \\( AA\' \\) is a diameter, \\( \\angle ABA\' = \\angle ACA\' = 90^\\circ \\), so \\( BA\' \\perp AB \\). Meanwhile \\( CH \\perp AB \\), forcing \\( BA\' \\parallel CH \\)! Symmetrically \\( CA\' \\parallel BH \\). Therefore \\( BHCA\' \\) is a <strong>parallelogram</strong>, whose diagonals \\( BC \\) and \\( HA\' \\) bisect each other at \\( M \\)! Also \\( BA\' = CH \\) and in right \\( \\triangle ACA\' \\) (with \\( B\' \\) or \\( A\'C = BH \\)), \\( BC^2 + AH^2 = BC^2 + (2OM)^2 = BC^2 + 4(R^2 - BM^2) = 4R^2 \\). \\( \\blacksquare \\)</p>',
          '<p><strong>1. الانعكاس حول \\( BC \\):</strong> في المثلث الحاد \\( \\triangle ABC \\)، من زوايا الارتفاعات نجد \\( \\angle BHC = 180^\\circ - A \\). وبعكس \\( H \\) حول \\( BC \\) إلى \\( H_D \\) يتطابق المثلثان فيكون \\( \\angle BH_D C = \\angle BHC = 180^\\circ - A \\)، أي تتكامل مع \\( \\angle A \\)، فتقع \\( H_D \\) على الدائرة المحيطة \\( (ABC) \\)!</p><p><strong>2. الانعكاس حول المنتصف \\( M \\):</strong> لتكن \\( A\' \\) النقطة المقابلة قطرياً لـ \\( A \\). بما أن \\( AA\' \\) قطر، فإن \\( BA\' \\perp AB \\)، وبما أن \\( CH \\perp AB \\) ينتج \\( BA\' \\parallel CH \\)، وبالمثل \\( CA\' \\parallel BH \\). إذن الشكل \\( BHCA\' \\) <strong>متوازي أضلاع</strong> يتناصف قطراه \\( BC \\) و\\( HA\' \\) عند المنتصف \\( M \\)! وبما أن \\( OM \\) قطعة متوسطة في \\( \\triangle AHA\' \\) فإن \\( AH = 2OM \\)، ومن فيثاغورس \\( AH^2 + BC^2 = 4OM^2 + 4BM^2 = 4R^2 \\). \\( \\blacksquare \\)</p>'
        )
      },
      {
        kind: 'cards',
        items: [
          {
            label: bi('LTE Warning at \\(p = 2\\)', 'تنبيه لمّة LTE عند \\(p = 2\\)'),
            value: bi('For odd \\(x,y\\) and EVEN \\(n\\): \\(v_2(x^n - y^n) = v_2(x-y) + v_2(x+y) + v_2(n) - 1\\)!', 'عند \\(p = 2\\) وأس زوجي \\(n\\): \\(v_2(x^n - y^n) = v_2(x-y) + v_2(x+y) + v_2(n) - 1\\)!')
          },
          {
            label: bi('Nine-Point Circle (Feuerbach)', 'دائرة النقاط التسع (فويرباخ)'),
            value: bi('Passes through 3 midpoints, 3 altitude feet & 3 Euler midpoints; radius \\(R/2\\), center midpoint of \\(OH\\)', 'نصف قطرها \\(R/2\\) ومركزها منتصف \\(OH\\) وتمس الدائرة الداخلية!')
          },
          {
            label: bi('FE Involution Signature', 'بصمة الدالة الالتفافية في المعادلات الدالية'),
            value: bi('Whenever \\(f(f(x))\\) appears, prove \\(f\\) is injective or surjective FIRST!', 'كلما ظهر التركيب \\(f(f(x))\\)، ابدأ فوراً بإثبات التباين (Injectivity) أو الشمول!')
          },
          {
            label: bi('Orthocenter Identity', 'متطابقة طول ارتفاع الرأس لملتقى الارتفاعات'),
            value: bi('\\(AH = 2R|\\cos A|\\) and \\(AH^2 + BC^2 = 4R^2\\)', '\\(AH = 2R|\\cos A|\\) وبالتالي دائماً \\(AH^2 + BC^2 = 4R^2\\)')
          }
        ]
      },
      {
        kind: 'figure',
        figure: {
          type: 'network_graph',
          title: 'Extremal Triangle-Free Graph K_{3,3} on n = 6 Vertices (Max Edges = ⌊6²/4⌋ = 9)',
          nodes: [
            { id: 'L1', x: 90, y: 60, label: 'u₁' },
            { id: 'L2', x: 90, y: 130, label: 'u₂' },
            { id: 'L3', x: 90, y: 200, label: 'u₃' },
            { id: 'R1', x: 260, y: 60, label: 'v₁' },
            { id: 'R2', x: 260, y: 130, label: 'v₂' },
            { id: 'R3', x: 260, y: 200, label: 'v₃' }
          ],
          edges: [
            { from: 'L1', to: 'R1', highlight: true },
            { from: 'L1', to: 'R2' },
            { from: 'L1', to: 'R3' },
            { from: 'L2', to: 'R1' },
            { from: 'L2', to: 'R2', highlight: true },
            { from: 'L2', to: 'R3' },
            { from: 'L3', to: 'R1' },
            { from: 'L3', to: 'R2' },
            { from: 'L3', to: 'R3', highlight: true }
          ]
        },
        caption: bi(
          'Mantel’s Extremal Construction for \\(n = 6\\): bipartite \\(K_{3,3}\\) achieves \\(9 = \\lfloor 36/4 \\rfloor\\) edges with zero triangles (every cycle in a bipartite graph has even length); adding a 10th edge immediately forces a triangle!',
          'البناء التطرفي لمبرهنة مانتل عند \\(n = 6\\): الرسم الثنائي التام \\(K_{3,3}\\) يحقق الحد الأقصى \\(9\\) أضلاع دون أي مثلث، وإضافة ضلع عاشر تجبر ظهور مثلث فوراً!'
        )
      },
      makeExplorerBlock({
        canvasId: 'olnsmonationalfinalsExCanvas',
        titleEn: '⊙ Explorer · NSMO Riyadh Finals Lab: Orthocenter Reflections on Circumcircle (ABC)',
        titleAr: '⊙ مستكشف تفاعلي · مختبر نهائيات نسما: انعكاسات ملتقى الارتفاعات على الدائرة المحيطة',
        ariaEn: 'Interactive Olympiad synthetic geometry explorer showing triangle ABC inscribed in circumcircle (O, R), orthocenter H, side-reflection H_D, midpoint-reflection A_prime, and invariant AH^2 + BC^2 = 4R^2.',
        ariaAr: 'مستكشف تفاعلي للهندسة التركيبية يعرض المثلث المحاط بالدائرة وملتقى ارتفاعاته H وانعكاساته على الدائرة المحيطة وثبات العلاقة AH^2 + BC^2 = 4R^2.',
        captionEn: 'Live verification of \\(H_D \\in (ABC)\\), parallelogram \\(BHCA\'\\), and invariant \\(AH^2 + BC^2 = 4R^2\\)',
        captionAr: 'تحقق حي من وقوع \\(H_D\\) و\\(A\'\\) على الدائرة المحيطة وثبات \\(AH^2 + BC^2 = 4R^2\\)',
        s0LabelEn: 'Vertex \\(A\\) Angle <b>\\(\\theta_A =\\)</b>', s0LabelAr: 'موقع الرأس \\(A\\) <b>\\(\\theta_A =\\)</b>',
        s0Min: 45, s0Max: 135, s0Val: 80, s0Step: 5,
        s0AriaEn: 'Polar angle of vertex A on circumcircle', s0AriaAr: 'الزاوية القطبية للرأس A على الدائرة المحيطة',
        s1LabelEn: 'Base Span <b>\\(\\phi =\\)</b>', s1LabelAr: 'انفراج القاعدة <b>\\(\\phi =\\)</b>',
        s1Min: 35, s1Max: 75, s1Val: 55, s1Step: 5,
        s1AriaEn: 'Base half-span angle for B and C', s1AriaAr: 'نصف زاوية قوس القاعدة BC',
        r0LabelEn: 'Lengths \\((AH, BC)\\)', r0LabelAr: 'الطولان \\((AH, BC)\\)', r0Init: 'AH=4.59, BC=6.55',
        r1LabelEn: 'Invariant \\(AH^2 + BC^2\\)', r1LabelAr: 'الثابت \\(AH^2 + BC^2\\)', r1Init: '64.00 = 4R² (R=4)',
        r2LabelEn: 'Reflection \\(OH_D\\) Radius', r2LabelAr: 'بعد الانعكاس \\(OH_D\\)', r2Init: '4.00 = R ✓',
        noteEn: 'Move vertex \\(A\\) around circumcircle \\(\\omega(O, R=4)\\): watch \\(H\\) move inside \\(\\triangle ABC\\) while its reflection \\(H_D\\) across \\(BC\\) and \\(H_M = A\'\\) across midpoint \\(M\\) stay glued to \\(\\omega\\), keeping \\(AH^2 + BC^2 = 64.00\\) invariant!',
        noteAr: 'حرّك الرأس \\(A\\) على الدائرة المحيطة \\(\\omega(O, R=4)\\): لاحظ كيف يظل انعكاس \\(H\\) حول الضلع \\(BC\\) وحول منتصفه \\(M\\) واقعَين تماماً على محيط الدائرة، مع بقاء \\(AH^2 + BC^2 = 64\\) ثابتاً!'
      }),
      {
        kind: 'callout',
        style: 'example',
        label: bi(
          'Worked Example 10.A — Functional Equation Proof Over ℝ (NSMO Stage 3 / IMO Style)',
          'مثال محلول 10.A — برهان معادلة دالية كامل على ℝ (نهائيات نسما / طراز IMO)'
        ),
        body: bi(
          '<p><strong>Problem:</strong> Find all functions \\( f: \\mathbb{R} \\to \\mathbb{R} \\) such that for all \\( x, y \\in \\mathbb{R} \\):<br>\\[ f(x + f(y)) = f(x) + y. \\]</p><p><strong>7-Point Olympiad Proof:</strong><br><strong>Claim 1 (\\( f \\) is injective):</strong> Suppose \\( f(a) = f(b) \\). Setting \\( x = 0 \\) with \\( y = a \\) and \\( y = b \\) gives:<br>\\[ f(0) + a = f(f(a)) = f(f(b)) = f(0) + b \\implies a = b. \\]<br><strong>Claim 2 (Evaluate \\( f(0) \\)):</strong> Set \\( x = y = 0 \\): \\( f(f(0)) = f(0) \\). By injectivity (Claim 1) applied to \\( f(f(0)) = f(0) \\), we deduce \\( f(0) = 0 \\)!<br><strong>Claim 3 (Involution \\( f(f(y)) = y \\) and Explicit Form):</strong> Setting \\( x = 0 \\) in the given equation yields \\( f(f(y)) = f(0) + y = y \\) for all \\( y \\in \\mathbb{R} \\). Now substitute \\( y \\leftarrow f(z) \\) into the original equation and use \\( f(f(z)) = z \\):<br>\\[ f(x + z) = f(x) + f(z) \\quad \\forall x, z \\in \\mathbb{R}? \\]<br>Even better—let’s check! Wait: \\( f(x + f(f(z))) = f(x) + f(z) \\iff f(x + z) = f(x) + f(z) \\) holds, AND Wait: does \\( f(x) = x \\) vs \\( f(x) = -x \\) satisfy the original? Check \\( f(x) = -x \\): LHS \\( = -(x - y) = -x + y \\), RHS \\( = -x + y \\) —Wait: BOTH \\( f(x)=x \\) AND \\( f(x)=-x \\) satisfy \\( f(f(y))=y \\) AND \\( f(x+z)=f(x)+f(z) \\), wait why? Because in \\( f(x) = -x \\), LHS \\( f(x + f(y)) = -(x + (-y)) = -x + y = f(x) + y \\)!! Wait—are nonlinear Cauchy involutions also solutions unless pinned? Let’s check a slightly sharper NSMO FE that pins \\( f(x) = x + c \\) or \\( f(x) = x \\) uniquely without Axiom of Choice!</p><p>Let’s check \\( f(f(x) + y) = 2x + f(f(y) - x) \\) or even cleaner: \\( f(x^2 + f(y)) = y + (f(x))^2 \\) (IMO 1992 P2 classic!!):<br>• In \\( f(x^2 + f(y)) = y + f(x)^2 \\):<br>1. \\( x = 0 \\implies f(f(y)) = y + c^2 \\) where \\( c = f(0) \\).<br>2. Injectivity + \\( c = 0 \\implies f(f(y)) = y \\), \\( f(x^2) = f(x)^2 \\implies f(z) \\ge 0 \\) for \\( z \\ge 0 \\)!<br>3. Positivity for \\( z \\ge 0 \\) + additivity forces \\( f(x) = x \\) uniquely over \\( \\mathbb{R} \\)!</p>',
          'placeholder'
        )
      },
      {
        kind: 'callout',
        style: 'example',
        label: bi(
          'Worked Example 10.B — Lifting the Exponent (LTE) Exact Prime Power (Mawhiba Camp)',
          'مثال محلول 10.B — حساب أعلى قوة أولية عبر لمّة رفع الأس LTE (ملتقيات موهبة)'
        ),
        body: bi(
          '<p><strong>Problem:</strong> Find the largest integer \\( k \\) such that \\( 3^k \\) divides \\( 7^{81} - 1 \\), and determine the smallest positive integer \\( n \\) such that \\( 3^{10} \\mid (7^n - 1) \\).</p><p><strong>Solution:</strong> Since \\( p = 3 \\) is an odd prime, \\( 3 \\nmid 7 \\), and \\( 7 - 1 = 6 \\) is divisible by \\( 3 \\), the hypotheses of <strong>LTE</strong> hold cleanly for \\( x = 7,\\; y = 1 \\)!<br>1. For \\( n = 81 = 3^4 \\):<br>\\[ v_3(7^{81} - 1) = v_3(7 - 1) + v_3(81) = v_3(6) + 4 = 1 + 4 = 5 \\implies k = 5. \\]<br>2. For \\( 3^{10} \\mid (7^n - 1) \\), we need \\( v_3(7^n - 1) \\ge 10 \\iff 1 + v_3(n) \\ge 10 \\iff v_3(n) \\ge 9 \\). The smallest positive integer with \\( 3^9 \\mid n \\) is <strong>\\( n = 3^9 = 19{,}683 \\)</strong>.</p>',
          '<p><strong>المسألة:</strong> أوجد أكبر عدد صحيح \\( k \\) بحيث يقسم \\( 3^k \\) العدد \\( 7^{81} - 1 \\)، ثم حدّد أصغر عدد صحيح موجب \\( n \\) يحقق \\( 3^{10} \\mid (7^n - 1) \\).</p><p><strong>الحل الأولمبي:</strong> بما أن \\( p = 3 \\) أولي فردي، و\\( 3 \\nmid 7 \\)، و\\( 3 \\mid (7 - 1) \\)، تتحقق شروط <strong>لمّة رفع الأس (LTE)</strong> مباشرةً:<br>1. عند \\( n = 81 = 3^4 \\): \\( v_3(7^{81} - 1) = v_3(6) + v_3(81) = 1 + 4 = 5 \\implies k = 5 \\).<br>2. لتحقيق \\( v_3(7^n - 1) \\ge 10 \\) يلزم \\( 1 + v_3(n) \\ge 10 \\iff v_3(n) \\ge 9 \\)، وأصغر عدد موجب يحقق ذلك هو <strong>\\( n = 3^9 = 19{,}683 \\)</strong>.</p>'
        )
      },
      {
        kind: 'callout',
        style: 'example',
        label: bi(
          'Worked Example 10.C — Orthocenter Distance & Circumradius Synthesis (NSMO Finals)',
          'مثال محلول 10.C — المسافة إلى ملتقى الارتفاعات ونصف القطر المحيط (نهائيات نسما)'
        ),
        body: bi(
          '<p><strong>Problem:</strong> In acute \\( \\triangle ABC \\) with circumradius \\( R = 10 \\) and side \\( BC = 16 \\), let \\( H \\) be the orthocenter and \\( D \\) be the foot of the altitude from \\( A \\) to \\( BC \\). Given \\( HD = 3 \\), find the exact altitude \\( AD \\) and area \\( [ABC] \\).</p><p><strong>Solution:</strong><br>1. By the Orthocenter Diameter Lemma (Theorem 10.2), \\( AH^2 + BC^2 = 4R^2 \\):<br>\\[ AH^2 = 4(10^2) - 16^2 = 400 - 256 = 144 \\implies AH = 12. \\]<br>2. Since \\( \\triangle ABC \\) is acute, \\( H \\) lies strictly inside \\( \\triangle ABC \\) on segment \\( AD \\), so:<br>\\[ AD = AH + HD = 12 + 3 = 15. \\]<br>3. Therefore \\( [ABC] = \\frac{1}{2} \\cdot BC \\cdot AD = \\frac{1}{2}(16)(15) = 120 \\). (Notice \\( BD \\cdot DC = HD \\cdot AD = 3 \\times 15 = 45 \\) and \\( BD + DC = 16 \\implies \\{BD, DC\\} = \\{16 \\text{ split? } \\Delta = 256 - 180 = 76 > 0\\} \\), so a real acute triangle exists!)</p>',
          '<p><strong>المسألة:</strong> في المثلث الحاد الزوايا \\( \\triangle ABC \\) الذي نصف قطر دائرته المحيطة \\( R = 10 \\) وضلع قاعدته \\( BC = 16 \\)، لتكن \\( H \\) ملتقى الارتفاعات و\\( D \\) مسقط الارتفاع من \\( A \\) على \\( BC \\). إذا كان \\( HD = 3 \\)، فأوجد الارتفاع \\( AD \\) ومساحة المثلث \\( [ABC] \\).</p><p><strong>الحل الأولمبي:</strong><br>1. من لمّة ملتقى الارتفاعات (مبرهنة 10.2): \\( AH^2 + BC^2 = 4R^2 \\implies AH^2 = 400 - 256 = 144 \\implies AH = 12 \\).<br>2. بما أن المثلث حاد الزوايا تقع \\( H \\) داخل القطعة \\( AD \\)، فيكون \\( AD = AH + HD = 12 + 3 = 15 \\).<br>3. إذن المساحة \\( [ABC] = \\frac{1}{2} \\times 16 \\times 15 = 120 \\).</p>'
        )
      },
      {
        kind: 'callout',
        style: 'example',
        label: bi(
          'Worked Example 10.D — Multiplicative Order Obstruction for Prime Divisors (IMO / NSMO TST)',
          'مثال محلول 10.D — الرتبة الضربية لقواسم \\(2^p + 1\\) و\\(a^2 + 1\\) (اختبارات ترشيح المنتخب)'
        ),
        body: bi(
          '<p><strong>Problem:</strong> Prove that every odd prime divisor \\( q \\) of \\( N = n^4 + 1 \\) satisfies \\( q \\equiv 1 \\pmod 8 \\).</p><p><strong>7-Point Olympiad Proof:</strong><br>1. Suppose odd prime \\( q \\mid (n^4 + 1) \\). Then \\( q \\nmid n \\) and \\( n^4 \\equiv -1 \\pmod q \\).<br>2. Squaring gives \\( n^8 \\equiv 1 \\pmod q \\). Let \\( d = \\operatorname{ord}_q(n) \\) be the multiplicative order of \\( n \\) modulo \\( q \\).<br>3. By the fundamental property of multiplicative order, \\( n^8 \\equiv 1 \\pmod q \\implies d \\mid 8 \\), so \\( d \\in \\{1, 2, 4, 8\\} \\).<br>4. However, \\( n^4 \\equiv -1 \\not\\equiv 1 \\pmod q \\) (since \\( q \\) is odd, \\( 1 \\not\\equiv -1 \\pmod q \\)), so \\( d \\nmid 4 \\)! This eliminates \\( 1, 2, 4 \\) and forces \\( d = 8 \\).<br>5. By Fermat’s Little Theorem \\( n^{q-1} \\equiv 1 \\pmod q \\), which requires \\( d \\mid (q - 1) \\), i.e., \\( 8 \\mid (q - 1) \\iff q \\equiv 1 \\pmod 8 \\)! \\( \\blacksquare \\)</p>',
          '<p><strong>المسألة:</strong> أثبت أن كل قاسم أولي فردي \\( q \\) للعدد \\( N = n^4 + 1 \\) يحقق \\( q \\equiv 1 \\pmod 8 \\).</p><p><strong>البرهان الأولمبي (7/7):</strong><br>1. إذا كان \\( q \\mid (n^4 + 1) \\) فإن \\( q \\nmid n \\) و\\( n^4 \\equiv -1 \\pmod q \\)، وبالتربيع \\( n^8 \\equiv 1 \\pmod q \\).<br>2. لتكن \\( d = \\operatorname{ord}_q(n) \\) الرتبة الضربية للعدد \\( n \\) بترديد \\( q \\). من \\( n^8 \\equiv 1 \\) نستنتج \\( d \\mid 8 \\).<br>3. وبما أن \\( q \\) فردي فإن \\( n^4 \\equiv -1 \\not\\equiv 1 \\pmod q \\)، أي \\( d \\nmid 4 \\)، مما يحسم \\( d = 8 \\) حصراً!<br>4. من مبرهنة فيرما الصغرى \\( n^{q-1} \\equiv 1 \\pmod q \\) فيجب أن يكون \\( 8 = d \\mid (q - 1) \\)، أي \\( q \\equiv 1 \\pmod 8 \\)! \\( \\blacksquare \\)</p>'
        )
      },
      {
        kind: 'callout',
        style: 'warn',
        label: bi(
          '⚠ Finals Proof Trap — Never Apply Standard Odd-Prime LTE Directly to p = 2!',
          '⚠ فخ قاتل في براهين النهائيات — تطبيق صيغة LTE الفردية مباشرةً عند p = 2!'
        ),
        body: bi(
          '<p>For \\( p = 2 \\) and odd \\( x, y \\) with even \\( n \\), \\( v_2(x^n - y^n) \\ne v_2(x-y) + v_2(n) \\)! Because \\( x^2 - y^2 = (x-y)(x+y) \\) picks up factors of \\( 2 \\) from BOTH \\( x - y \\) and \\( x + y \\), the correct \\( p = 2 \\) LTE formula for even \\( n \\) is \\( v_2(x^n - y^n) = v_2(x - y) + v_2(x + y) + v_2(n) - 1 \\).</p>',
          '<p>لا تطبّق صيغة LTE الخاصة بالأعداد الأولية الفردية على \\( p = 2 \\) عندما يكون الأس \\( n \\) زوجياً! لأن \\( x^2 - y^2 = (x-y)(x+y) \\) يكتسب قوى للعدد \\( 2 \\) من العاملين معاً، والصيغة الصحيحة هي \\( v_2(x^n - y^n) = v_2(x - y) + v_2(x + y) + v_2(n) - 1 \\).</p>'
        )
      },
      {
        kind: 'callout',
        style: 'tip',
        label: bi(
          '▲ Mawhiba IMO Camp Strategy — Always Check Simple Ansätze First in Functional Equations',
          '▲ استراتيجية معسكرات المنتخب — اختبر الدوال المرجعية البسيطة قبل البدء بالبرهان!'
        ),
        body: bi(
          '<p>Spend your first \\( 90 \\) seconds on any functional equation testing \\( f(x) = c \\), \\( f(x) = cx \\), \\( f(x) = x + c \\), and \\( f(x) = x^2 \\). Knowing in advance whether \\( f(x) = 0 \\) or \\( f(x) = -x \\) is ALSO a valid solution prevents you from dividing by \\( f(x) \\) illegally and losing 2–3 rubric points!</p>',
          '<p>خصّص أول دقيقة ونصف في أي معادلة دالية لاختبار الدوال البسيطة \\( f(x) = c \\)، \\( cx \\)، \\( x+c \\)، \\( x^2 \\). معرفة جميع الحلول مسبقاً تحميك من القسمة الخاطئة على مقدار قد يساوي صفراً وتضمن لك علامة الحالات الحدية الكاملة!</p>'
        )
      },
      makePractice(
        'Practice 10.1 · NSMO Finals Warmup', 'تدريب 10.1 · تمهيد نهائيات نسما',
        'Using Lifting the Exponent (LTE), find the exact \\( 5 \\)-adic valuation \\( v_5(11^{125} - 1) \\).',
        'باستخدام لمّة رفع الأس (LTE)، أوجد التقييم الدقيق \\( v_5(11^{125} - 1) \\).',
        'Verify \\( p = 5 \\) is odd, \\( 5 \\nmid 11 \\), and \\( 5 \\mid (11 - 1) = 10 \\).',
        'تحقق من أن \\( p = 5 \\) أولي فردي و\\( 5 \\mid (11 - 1) = 10 \\).',
        'Apply \\( v_5(11^{125} - 1) = v_5(11 - 1) + v_5(125) \\).',
        'طبّق الصيغة \\( v_5(11^{125} - 1) = v_5(10) + v_5(125) \\).',
        'Add \\( 1 + 3 \\).',
        'اجمع \\( 1 + 3 \\).',
        'By LTE for odd prime \\( p = 5 \\), \\( v_5(11^{125} - 1) = v_5(10) + v_5(5^3) = 1 + 3 = 4 \\).',
        'بتطبيق لمّة LTE عند \\( p = 5 \\): \\( v_5(11^{125} - 1) = v_5(10) + v_5(125) = 1 + 3 = 4 \\).'
      ),
      makePractice(
        'Practice 10.2 · NSMO Stage 3', 'تدريب 10.2 · نسما المرحلة الثالثة',
        'What is the maximum possible number of edges in a simple graph on \\( 15 \\) vertices that contains NO triangle (\\( K_3 \\))?',
        'ما أكبر عدد ممكن من الأضلاع في رسم بياني بسيط على \\( 15 \\) رأساً لا يحتوي على أي مثلث (\\( K_3 \\))؟',
        'Apply Mantel’s Theorem \\( e_{\\max} = \\left\\lfloor \\frac{n^2}{4} \\right\\rfloor \\).',
        'طبّق مبرهنة مانتل \\( e_{\\max} = \\left\\lfloor \\frac{n^2}{4} \\right\\rfloor \\).',
        'Equivalently compute edges of \\( K_{7, 8} \\).',
        'أو احسب عدد أضلاع الرسم الثنائي التام المتوازن \\( K_{7, 8} \\).',
        'Multiply \\( 7 \\times 8 \\).',
        'اضرب \\( 7 \\times 8 \\).',
        'By Mantel’s Theorem, the maximum edge count is \\( \\left\\lfloor \\frac{15^2}{4} \\right\\rfloor = \\left\\lfloor \\frac{225}{4} \\right\\rfloor = 56 \\), realized by \\( K_{7, 8} \\) (\\( 7 \\times 8 = 56 \\)).',
        'حسب مبرهنة مانتل، أقصى عدد للأضلاع هو \\( \\left\\lfloor \\frac{225}{4} \\right\\rfloor = 56 \\)، ويتحقق في الرسم الثنائي التام \\( K_{7, 8} \\).'
      ),
      makePractice(
        'Practice 10.3 · NSMO Stage 3', 'تدريب 10.3 · نسما المرحلة الثالثة',
        'In \\( \\triangle ABC \\), the circumradius is \\( R = 13 \\) and side \\( BC = 24 \\). Find the exact distance \\( AH \\) from vertex \\( A \\) to the orthocenter \\( H \\).',
        'في المثلث \\( \\triangle ABC \\)، نصف قطر الدائرة المحيطة \\( R = 13 \\) وطول الضلع \\( BC = 24 \\). أوجد المسافة الدقيقة \\( AH \\) من الرأس \\( A \\) إلى ملتقى الارتفاعات \\( H \\).',
        'Use the Orthocenter–Circumradius identity \\( AH^2 + BC^2 = 4R^2 \\).',
        'استخدم المتطابقة \\( AH^2 + BC^2 = 4R^2 \\).',
        'Substitute \\( R = 13 \\) (\\( 2R = 26 \\)) and \\( BC = 24 \\).',
        'عوّض بـ \\( 2R = 26 \\) و\\( BC = 24 \\).',
        'Recognize the \\( 10\\text{–}24\\text{–}26 \\) right triangle!',
        'استحضر ثلاثية فيثاغورس \\( 10\\text{–}24\\text{–}26 \\)!',
        'From \\( AH^2 + BC^2 = (2R)^2 \\), we get \\( AH^2 = 26^2 - 24^2 = (26 - 24)(26 + 24) = 2 \\times 50 = 100 \\implies AH = 10 \\).',
        'من العلاقة \\( AH^2 = (2R)^2 - BC^2 = 26^2 - 24^2 = 100 \\)، نجد \\( AH = 10 \\).'
      ),
      makePractice(
        'Practice 10.4 · Mawhiba Olympiad Camp', 'تدريب 10.4 · ملتقيات موهبة الأولمبية',
        'Find the exact \\( 2 \\)-adic valuation \\( v_2(5^{24} - 1) \\) using the \\( p = 2 \\) Lifting the Exponent formula.',
        'أوجد التقييم الدقيق \\( v_2(5^{24} - 1) \\) باستخدام صيغة لمّة رفع الأس الخاصة بـ \\( p = 2 \\).',
        'Since \\( n = 24 \\) is even and \\( 5, 1 \\) are odd, use \\( v_2(x^n - y^n) = v_2(x - y) + v_2(x + y) + v_2(n) - 1 \\).',
        'بما أن الأس \\( 24 \\) زوجي، طبّق \\( v_2(5^{24} - 1) = v_2(5 - 1) + v_2(5 + 1) + v_2(24) - 1 \\).',
        'Compute \\( v_2(4) = 2 \\), \\( v_2(6) = 1 \\), and \\( v_2(24) = 3 \\).',
        'احسب \\( v_2(4) = 2 \\)، و\\( v_2(6) = 1 \\)، و\\( v_2(24) = 3 \\).',
        'Evaluate \\( 2 + 1 + 3 - 1 \\).',
        'احسب \\( 2 + 1 + 3 - 1 \\).',
        'By the \\( p = 2 \\) LTE formula for even \\( n \\), \\( v_2(5^{24} - 1) = v_2(4) + v_2(6) + v_2(24) - 1 = 2 + 1 + 3 - 1 = 5 \\) (so \\( 2^5 = 32 \\parallel 5^{24} - 1 \\)).',
        'بتطبيق صيغة LTE عند \\( p = 2 \\): \\( v_2(5^{24} - 1) = 2 + 1 + 3 - 1 = 5 \\).'
      ),
      makePractice(
        'Practice 10.5 · Saudi IMO TST Style', 'تدريب 10.5 · طراز اختبارات ترشيح المنتخب IMO',
        'Suppose \\( f: \\mathbb{Z} \\to \\mathbb{Z} \\) satisfies \\( f(x + y) = f(x) + f(y) + 2xy \\) for all \\( x, y \\in \\mathbb{Z} \\), and \\( f(1) = 4 \\). Find \\( f(10) \\).',
        'لتكن \\( f: \\mathbb{Z} \\to \\mathbb{Z} \\) دالة تحقق \\( f(x + y) = f(x) + f(y) + 2xy \\) لكل \\( x, y \\in \\mathbb{Z} \\)، وكان \\( f(1) = 4 \\). أوجد قيمة \\( f(10) \\).',
        'Notice \\( (x + y)^2 = x^2 + y^2 + 2xy \\) has the EXACT same cross-term \\( +2xy \\)!',
        'لاحظ أن \\( (x + y)^2 = x^2 + y^2 + 2xy \\) يمتلك الحد التفاعلي نفسه \\( +2xy \\)!',
        'Define the auxiliary function \\( g(x) = f(x) - x^2 \\) and check \\( g(x + y) \\).',
        'عرّف الدالة المساعدة \\( g(x) = f(x) - x^2 \\) وتحقق من أنها تحقق معادلة كوشي \\( g(x+y) = g(x) + g(y) \\)!',
        'Since \\( g(1) = f(1) - 1 = 3 \\), deduce \\( g(x) = 3x \\implies f(x) = x^2 + 3x \\).',
        'من \\( g(1) = 4 - 1 = 3 \\) استنتج \\( g(x) = 3x \\implies f(x) = x^2 + 3x \\).',
        'Subtracting \\( (x+y)^2 = x^2 + y^2 + 2xy \\) shows \\( g(x) = f(x) - x^2 \\) satisfies Cauchy’s equation \\( g(x+y) = g(x) + g(y) \\) over \\( \\mathbb{Z} \\). Thus \\( g(x) = g(1)x = (4 - 1)x = 3x \\), so \\( f(x) = x^2 + 3x \\) (which checks: \\( (x+y)^2 + 3(x+y) = x^2+3x + y^2+3y + 2xy \\)). Hence \\( f(10) = 100 + 30 = 130 \\).',
        'بطرح \\( (x+y)^2 \\) نجد أن \\( g(x) = f(x) - x^2 \\) تحقق معادلة كوشي الجمعية على \\( \\mathbb{Z} \\)، ومنه \\( g(x) = g(1)x = 3x \\)، أي \\( f(x) = x^2 + 3x \\). إذن \\( f(10) = 10^2 + 3(10) = 130 \\).'
      ),
      {
        kind: 'seeAlso',
        links: [
          { label: 'NSMO of KSA: Stages 1 & 2', chapterId: 'ol-nsmo-stage1-2', trackId: 'olympiad' },
          { label: 'Subsection III · KAUST Mathematics Competition: Regional Qualifier', chapterId: 'ol-kaust-kmc-qualifier', trackId: 'olympiad' },
          { label: 'Subsection III · KAUST Campus Finals & Academy Synthesis', chapterId: 'ol-kaust-finals-academy', trackId: 'olympiad' }
        ]
      }
    ]
  },
  quizWidget: {
    enabled: true,
    domains: ['NSMO of KSA: National Finals & Mawhiba IMO Pathway']
  }
};

// Replace Worked Example 10.A body with clean, textbook-grade IMO 1992 P2 / NSMO Finals proof (zero conversational notes!)
ch10.content.blocks.forEach((b) => {
  if (b.kind === 'callout' && b.label && b.label.en.includes('Worked Example 10.A')) {
    b.body = bi(
      '<p><strong>Problem:</strong> Find all functions \\( f: \\mathbb{R} \\to \\mathbb{R} \\) satisfying \\( f(x^2 + f(y)) = y + (f(x))^2 \\) for all \\( x, y \\in \\mathbb{R} \\).</p><p><strong>7-Point Olympiad Proof:</strong><br><strong>Claim 1 (Injectivity &amp; Surjectivity):</strong> Setting \\( x = 0 \\) gives \\( f(f(y)) = y + c^2 \\) where \\( c = f(0) \\). If \\( f(a) = f(b) \\), then \\( a + c^2 = f(f(a)) = f(f(b)) = b + c^2 \\implies a = b \\) (injective), and every \\( z \\in \\mathbb{R} \\) equals \\( f(f(z - c^2)) \\) (surjective).<br><strong>Claim 2 (\\( f(0) = 0 \\)):</strong> By surjectivity, pick \\( u \\) with \\( f(u) = 0 \\). Plugging \\( y = u \\) into \\( f(f(y)) = y + c^2 \\) gives \\( c = f(0) = u + c^2 \\). Meanwhile setting \\( x = u, y = 0 \\) in the original equation gives \\( f(u^2 + c) = 0 + 0 = f(u) \\); by injectivity \\( u^2 + c = u \\). Adding \\( c = u + c^2 \\) and \\( u = u^2 + c \\) gives \\( u^2 + c^2 = 0 \\implies u = c = 0 \\), so \\( f(0) = 0 \\) and \\( f(f(y)) = y \\)!<br><strong>Claim 3 (Positivity &amp; Additivity):</strong> Setting \\( y = 0 \\) yields \\( f(x^2) = f(x)^2 \\ge 0 \\), so \\( f(z) \\ge 0 \\) for all \\( z \\ge 0 \\). Replacing \\( x^2 \\) by \\( t \\ge 0 \\) and \\( y \\) by \\( f(s) \\) (using \\( f(f(s)) = s \\)) yields \\( f(t + s) = f(s) + f(t) \\) for \\( t \\ge 0 \\), which extends to all \\( s, t \\in \\mathbb{R} \\) because \\( f(-x) = -f(x) \\). Additivity + \\( f(z) \\ge 0 \\) for \\( z \\ge 0 \\) implies \\( f \\) is non-decreasing, hence \\( f(x) = kx \\); testing \\( (kx)^2 = k x^2 \\) with \\( k(kx) = x \\) forces \\( k = 1 \\).<br><strong>Verification:</strong> \\( f(x) = x \\) satisfies \\( x^2 + y = y + x^2 \\) identically. Thus \\( f(x) = x \\) is the unique solution! \\( \\blacksquare \\)</p>',
      '<p><strong>المسألة:</strong> أوجد جميع الدوال \\( f: \\mathbb{R} \\to \\mathbb{R} \\) التي تحقق \\( f(x^2 + f(y)) = y + (f(x))^2 \\) لكل \\( x, y \\in \\mathbb{R} \\).</p><p><strong>البرهان الأولمبي المحكم (7/7):</strong><br><strong>ادعاء 1 (التباين والشمول):</strong> بوضع \\( x = 0 \\) نجد \\( f(f(y)) = y + c^2 \\) حيث \\( c = f(0) \\)، وهذا يثبت فوراً أن \\( f \\) متباينة وشاملة.<br><strong>ادعاء 2 (\\( f(0) = 0 \\)):</strong> بما أن \\( f \\) شاملة، يوجد \\( u \\) يحقق \\( f(u) = 0 \\). بالتعويض \\( y = u \\) نجد \\( c = u + c^2 \\)، وبوضع \\( x = u, y = 0 \\) نجد \\( f(u^2 + c) = 0 = f(u) \\implies u^2 + c = u \\). بالجمع ينتج \\( u^2 + c^2 = 0 \\implies c = f(0) = 0 \\) وبالتالي \\( f(f(y)) = y \\)!<br><strong>ادعاء 3 (الجمعية والرتابة):</strong> بوضع \\( y = 0 \\) نحصل على \\( f(x^2) = f(x)^2 \\ge 0 \\)، أي \\( f(z) \\ge 0 \\) لكل \\( z \\ge 0 \\). كما أن استبدال \\( y \\) بـ \\( f(s) \\) يعطي معادلة كوشي الجمعية \\( f(t + s) = f(t) + f(s) \\)، ومع عدم السالبية تصبح \\( f \\) دالة خطية \\( f(x) = kx \\)؛ وبالتعويض يتعين \\( k = 1 \\) حصراً.<br><strong>التحقق التعويضي:</strong> الدالة \\( f(x) = x \\) تحقق المعادلة الأصلية فعلاً، وهي الحل الوحيد! \\( \\blacksquare \\)</p>'
    );
  }
});

module.exports = [ch09, ch10];
