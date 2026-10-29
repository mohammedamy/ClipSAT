'use strict';

const { bi, makeExplorerBlock, makePractice } = require('./helpers');

const SUBSEC_1 = bi(
  '🏆 Subsection I · Core International Olympiad Pillars (Chapters 1–8)',
  '🏆 القسم الأول · المحاور الأولمبية العالمية التأسيسية (الفصول 1–8)'
);

const ch05 = {
  id: 'ol-recurrence-probability',
  chapterNumber: '5',
  subsectionBanner: SUBSEC_1,
  title: bi(
    'Combinatorics II: Recurrence Relations, Catalan Numbers & Olympiad Probability',
    'التوافيق (2): العلاقات التراجعية وأعداد كاتالان والاحتمالات الأولمبية'
  ),
  railLabel: bi('Recurrences, Catalan & Probability', 'العلاقات التراجعية وأعداد كاتالان'),
  chapterTag: {
    variant: 'category',
    className: 'igcse-tag',
    emoji: '🔁',
    category: 'Core Pillar 5 — Recurrences, Markov States & Geometric Probability',
    badges: [{ text: 'IMO · NSMO · KAUST KMC', className: 'tier-e' }],
    topics: [
      'Linear recurrences & characteristic roots',
      'Catalan numbers C_n (Dyck paths & triangulations)',
      'Coupled Markov parity/state recurrences',
      'Linearity of expectation & indicator variables',
      'Continuous geometric probability on [0, L]²'
    ]
  },
  content: {
    blocks: [
      {
        kind: 'text',
        body: bi(
          'Whenever direct casework explodes exponentially—tiling a \\(2 \\times n\\) strip, counting binary strings without forbidden substrings, or tracking random walks—Olympiad combinatorics conditions on the <strong>first or last step</strong> to derive a <strong>recurrence relation</strong>. Coupled with <strong>Catalan bijections</strong>, <strong>indicator linearity of expectation</strong>, and <strong>continuous area-ratio probability</strong>, these methods turn intricate stochastic and recursive systems into exact closed-form answers.',
          'عندما يتشعّب العدّ المباشر بصورة أسية—مثل تبليط شريط \\(2 \\times n\\)، أو عدّ السلاسل الثنائية الخالية من أنماط ممنوعة، أو تتبّع المسارات العشوائية—يلجأ الفكر الأولمبي إلى التكييف على <strong>الخطوة الأولى أو الأخيرة</strong> لبناء <strong>علاقة تراجعية</strong>. وبدمجها مع <strong>أعداد كاتالان</strong> و<strong>خطية التوقع الرياضي</strong> و<strong>الاحتمال الهندسي بالمساحات</strong>، تتحول أعقد المسائل إلى صيغ مغلقة دقيقة.'
        )
      },
      {
        kind: 'callout',
        style: 'def',
        label: bi(
          '● Definition 5.1 — Linear Recurrences & The Catalan Sequence',
          '● تعريف 5.1 — العلاقات التراجعية الخطية ومتتالية أعداد كاتالان'
        ),
        body: bi(
          '<p><strong>1. Characteristic Polynomial:</strong> A homogeneous linear recurrence \\( a_n = c_1 a_{n-1} + c_2 a_{n-2} \\) has characteristic equation \\( r^2 - c_1 r - c_2 = 0 \\). If roots \\( r_1 \\ne r_2 \\) are distinct, \\( a_n = A r_1^n + B r_2^n \\); if \\( r_1 = r_2 = r \\), \\( a_n = (A + Bn)r^n \\).</p><p><strong>2. Catalan Numbers \\( C_n \\):</strong> Defined by \\( C_0 = 1 \\) and the convolution recurrence \\( C_{n+1} = \\sum_{k=0}^n C_k C_{n-k} \\), with closed form:</p>\\[ C_n = \\frac{1}{n + 1}\\binom{2n}{n} = \\binom{2n}{n} - \\binom{2n}{n+1} \\qquad (1, 1, 2, 5, 14, 42, 132, 429, \\dots). \\]<p>\\( C_n \\) counts: (i) monotonic lattice paths from \\( (0,0) \\) to \\( (n,n) \\) never rising above \\( y = x \\) (Dyck paths), (ii) valid parenthesizations of \\( n \\) pairs, (iii) triangulations of a convex \\( (n+2) \\)-gon, and (iv) non-crossing chord matchings of \\( 2n \\) points on a circle.</p>',
          '<p><strong>1. كثيرة الحدود المميزة:</strong> العلاقة التراجعية الخطية المتجانسة \\( a_n = c_1 a_{n-1} + c_2 a_{n-2} \\) معادلتها المميزة \\( r^2 - c_1 r - c_2 = 0 \\). إذا كان الجذران مختلفين \\( r_1 \\ne r_2 \\) فإن \\( a_n = A r_1^n + B r_2^n \\)، وإذا تساويا \\( r_1 = r_2 = r \\) فإن \\( a_n = (A + Bn)r^n \\).</p><p><strong>2. أعداد كاتالان \\( C_n \\):</strong> تُعرَّف بـ \\( C_0 = 1 \\) والعلاقة \\( C_{n+1} = \\sum_{k=0}^n C_k C_{n-k} \\)، وصيغتها المغلقة:</p>\\[ C_n = \\frac{1}{n + 1}\\binom{2n}{n} = \\binom{2n}{n} - \\binom{2n}{n+1} \\qquad (1, 1, 2, 5, 14, 42, 132, 429, \\dots). \\]<p>وتحصي \\( C_n \\): (1) مسارات الشبكة الصاعدة من \\( (0,0) \\) إلى \\( (n,n) \\) التي لا تتجاوز القطر \\( y = x \\)، (2) طرق ترتيب \\( n \\) من أزواج الأقواس الصحيحة، (3) تثليثات مضلع محدب ذي \\( n+2 \\) ضلعاً، (4) توصيل \\( 2n \\) نقطة على دائرة بأوتار غير متقاطعة.</p>'
        )
      },
      {
        kind: 'callout',
        style: 'thm',
        label: bi(
          '● Theorem 5.2 — Linearity of Expectation & Continuous Geometric Probability',
          '● مبرهنة 5.2 — خطية التوقع الرياضي والاحتمال الهندسي المتصل'
        ),
        body: bi(
          '<p><strong>1. Linearity of Expectation (No Independence Required!):</strong> For ANY random variables \\( X_1, X_2, \\dots, X_n \\) on the same sample space—even if heavily dependent—</p>\\[ \\mathbb{E}[X_1 + X_2 + \\cdots + X_n] = \\mathbb{E}[X_1] + \\mathbb{E}[X_2] + \\cdots + \\mathbb{E}[X_n]. \\]<p>In particular, if \\( I_k \\in \\{0, 1\\} \\) is the indicator of event \\( E_k \\), then \\( \\mathbb{E}[I_k] = \\mathbb{P}(E_k) \\).</p><p><strong>2. Geometric Probability Measure:</strong> When independent real parameters \\( (X, Y) \\) are chosen uniformly over a bounded region \\( \\Omega \\subset \\mathbb{R}^2 \\) with \\( \\operatorname{Area}(\\Omega) > 0 \\), the probability of event \\( A \\subseteq \\Omega \\) is \\( \\mathbb{P}(A) = \\frac{\\operatorname{Area}(A)}{\\operatorname{Area}(\\Omega)} \\).</p>',
          '<p><strong>1. خطية التوقع الرياضي (دون اشتراط الاستقلال!):</strong> لأي متغيرات عشوائية \\( X_1, X_2, \\dots, X_n \\) على فضاء العينة نفسه—حتى لو كانت مترابطة بشدة—فإن:</p>\\[ \\mathbb{E}[X_1 + X_2 + \\cdots + X_n] = \\mathbb{E}[X_1] + \\mathbb{E}[X_2] + \\cdots + \\mathbb{E}[X_n]. \\]<p>وعند تعريف متغير مؤشر \\( I_k \\in \\{0, 1\\} \\) للحدث \\( E_k \\)، يكون \\( \\mathbb{E}[I_k] = \\mathbb{P}(E_k) \\).</p><p><strong>2. الاحتمال الهندسي المتصل:</strong> عند اختيار نقطة \\( (X, Y) \\) بانتظام داخل منطقة محدودة \\( \\Omega \\subset \\mathbb{R}^2 \\)، فإن احتمال تحقق الحدث \\( A \\subseteq \\Omega \\) يساوي نسبة المساحتين \\( \\mathbb{P}(A) = \\frac{\\operatorname{Area}(A)}{\\operatorname{Area}(\\Omega)} \\).</p>'
        )
      },
      {
        kind: 'callout',
        style: 'pf',
        label: bi(
          '◆ Proof — André’s Reflection Proof of C_n & Indicator Proof of Expected Fixed Points',
          '◆ البرهان الأولمبي — مبدأ انعكاس أندريه لأعداد كاتالان وتوقع النقاط الثابتة'
        ),
        body: bi(
          '<p><strong>1. André’s Reflection Method for \\( C_n \\):</strong> Total lattice paths from \\( (0,0) \\) to \\( (n,n) \\) equal \\( \\binom{2n}{n} \\). Any "bad" path crossing above \\( y = x \\) hits the forbidden line \\( y = x + 1 \\) at some first point \\( P \\). Reflecting the prefix of the path before \\( P \\) across \\( y = x + 1 \\) maps the start \\( (0,0) \\) to \\( (-1, 1) \\), creating an exact <strong>bijection</strong> between bad paths and all paths from \\( (-1,1) \\) to \\( (n,n) \\), of which there are \\( \\binom{(n+1)+(n-1)}{n+1} = \\binom{2n}{n+1} \\). Subtracting gives \\( C_n = \\binom{2n}{n} - \\binom{2n}{n+1} = \\frac{1}{n+1}\\binom{2n}{n} \\).</p><p><strong>2. Expected Fixed Points in a Random Permutation:</strong> For a uniform random permutation \\( \\pi \\in S_n \\), let \\( I_k = 1 \\) if \\( \\pi(k) = k \\) and \\( 0 \\) otherwise. By symmetry \\( \\mathbb{P}(\\pi(k) = k) = \\frac{1}{n} \\). Without touching derangements, linearity of expectation yields \\( \\mathbb{E}[\\text{fixed points}] = \\sum_{k=1}^n \\mathbb{E}[I_k] = n \\cdot \\frac{1}{n} = 1 \\) for every \\( n \\ge 1 \\)! \\( \\blacksquare \\)</p>',
          '<p><strong>1. مبدأ الانعكاس لأندريه لإثبات صيغة كاتالان:</strong> إجمالي مسارات الشبكة من \\( (0,0) \\) إلى \\( (n,n) \\) يساوي \\( \\binom{2n}{n} \\). كل مسار "مخالف" يتجاوز القطر \\( y = x \\) لا بد أن يلمس المستقيم \\( y = x + 1 \\) لأول مرة عند نقطة \\( P \\). بعكس الجزء السابق للنقطة \\( P \\) حول المستقيم \\( y = x + 1 \\)، تنتقل نقطة البداية \\( (0,0) \\) إلى \\( (-1, 1) \\)، مما ينشئ <strong>تقابلاً تاماً</strong> بين المسارات المخالفة وجميع المسارات من \\( (-1,1) \\) إلى \\( (n,n) \\) وعددها \\( \\binom{2n}{n+1} \\). وبالطرح نحصل على \\( C_n = \\binom{2n}{n} - \\binom{2n}{n+1} = \\frac{1}{n+1}\\binom{2n}{n} \\).</p><p><strong>2. القيمة المتوقعة للنقاط الثابتة في تبديل عشوائي:</strong> لتبديل عشوائي منتظم \\( \\pi \\in S_n \\)، نعرّف المؤشر \\( I_k = 1 \\) إذا كان \\( \\pi(k) = k \\). بالتناظر \\( \\mathbb{P}(\\pi(k) = k) = \\frac{1}{n} \\)، ومن خطية التوقع مباشرةً \\( \\mathbb{E}[\\sum I_k] = n \\cdot \\frac{1}{n} = 1 \\) لكل \\( n \\ge 1 \\) دون الحاجة لحساب الاختلالات! \\( \\blacksquare \\)</p>'
        )
      },
      {
        kind: 'table',
        caption: bi(
          'Canonical Olympiad Recurrence & Expectation Archetypes',
          'الجدول المرجعي للنماذج التراجعية والاحتمالية الأولمبية'
        ),
        columns: [
          bi('Olympiad Model', 'النموذج الأولمبي'),
          bi('Recurrence / Formula', 'العلاقة التراجعية / الصيغة'),
          bi('Structural Origin', 'التفسير البنيوي')
        ],
        rows: [
          [
            bi('\\(2 \\times n\\) Domino Tiling', 'تبليط مستطيل \\(2 \\times n\\) بالدومينو'),
            bi('\\(T_n = T_{n-1} + T_{n-2},\\; T_1=1, T_2=2\\)', '\\(T_n = T_{n-1} + T_{n-2},\\; T_1=1, T_2=2\\)'),
            bi('Rightmost column is 1 vertical domino or 2 horizontal dominoes', 'العمود الأخير إما قطعة رأسية واحدة أو قطعتان أفقيتان')
          ],
          [
            bi('Binary Strings Without "11"', 'سلاسل ثنائية بطول \\(n\\) بلا "11"'),
            bi('\\(S_n = S_{n-1} + S_{n-2},\\; S_1=2, S_2=3\\)', '\\(S_n = S_{n-1} + S_{n-2},\\; S_1=2, S_2=3\\)'),
            bi('Ends in \\(0\\) (\\(S_{n-1}\\)) or ends in \\(01\\) (\\(S_{n-2}\\))', 'تنتهي بـ \\(0\\) (\\(S_{n-1}\\)) أو تنتهي بـ \\(01\\) (\\(S_{n-2}\\))')
          ],
          [
            bi('Tower of Hanoi / Regions of Lines', 'برج هانوي / تقسيم المستوى بالمستقيمات'),
            bi('\\(H_n = 2H_{n-1}+1 = 2^n-1\\); \\(L_n = L_{n-1}+n = \\frac{n(n+1)}{2}+1\\)', '\\(H_n = 2^n-1\\)؛ ومناطق المستقيمات \\(L_n = \\frac{n(n+1)}{2}+1\\)'),
            bi('Non-homogeneous first-order telescoping recurrences', 'علاقات تراجعية غير متجانسة من الرتبة الأولى')
          ],
          [
            bi('Expected Inversions in \\(S_n\\)', 'توقع الانقلابات في تبديل عشوائي'),
            bi('\\(\\mathbb{E}[\\text{inv}] = \\frac{1}{2}\\binom{n}{2} = \\frac{n(n-1)}{4}\\)', '\\(\\mathbb{E}[\\text{inv}] = \\frac{1}{2}\\binom{n}{2} = \\frac{n(n-1)}{4}\\)'),
            bi('Each of the \\(\\binom{n}{2}\\) pairs is inverted with probability \\(1/2\\)', 'كل زوج من \\(\\binom{n}{2}\\) زوجاً ينعكس ترتيبه باحتمال \\(1/2\\)')
          ]
        ]
      },
      {
        kind: 'cards',
        items: [
          {
            label: bi('Catalan Benchmarks', 'القيم المرجعية لأعداد كاتالان'),
            value: bi('\\(C_0=1,\\; C_1=1,\\; C_2=2,\\; C_3=5,\\; C_4=14,\\; C_5=42,\\; C_6=132\\)', '\\(C_0=1,\\; C_1=1,\\; C_2=2,\\; C_3=5,\\; C_4=14,\\; C_5=42,\\; C_6=132\\)')
          },
          {
            label: bi('Coupled Parity Trick', 'حيلة تفاضل الحالات الزوجية والفردية'),
            value: bi('If \\(E_n + O_n = k^n\\) and \\(E_n - O_n = d^n\\), then \\(E_n = \\frac{k^n + d^n}{2}\\)', 'إذا كان \\(E_n + O_n = k^n\\) و\\(E_n - O_n = d^n\\)، فإن \\(E_n = \\frac{k^n + d^n}{2}\\)')
          },
          {
            label: bi('First-Step Markov Conditioning', 'التكييف على الخطوة الأولى (ماركوف)'),
            value: bi('For expected hitting time \\(E\\) from state \\(s\\): \\(E_s = 1 + \\sum_t P(s \\to t) E_t\\)', 'لتوقع زمن الوصول من الحالة \\(s\\): \\(E_s = 1 + \\sum_t P(s \\to t) E_t\\)')
          },
          {
            label: bi('Meeting Band Area', 'مساحة شريط الالتقاء الهندسي'),
            value: bi('In \\([0,L]^2\\), \\(\\mathbb{P}(|X-Y| \\le d) = 1 - \\left(1 - \\frac{d}{L}\\right)^2\\) for \\(0 \\le d \\le L\\)', 'في \\([0,L]^2\\): \\(\\mathbb{P}(|X-Y| \\le d) = 1 - \\left(1 - \\frac{d}{L}\\right)^2\\)')
          }
        ]
      },
      {
        kind: 'figure',
        figure: {
          type: 'fn',
          title: 'Geometric Probability Band |x − y| ≤ 2 inside [0, 6]² (P = 1 − (4/6)² = 5/9)',
          xrange: [0, 6],
          yrange: [0, 6],
          fns: [
            { fn: 'x + 2', color: 'var(--fig-indigo)', label: 'y = x + 2' },
            { fn: 'x - 2', color: 'var(--fig-amber)', label: 'y = x − 2' }
          ],
          points: [
            { x: 0, y: 2, label: '(0, 2)' },
            { x: 4, y: 6, label: '(4, 6)' },
            { x: 2, y: 0, label: '(2, 0)' },
            { x: 6, y: 4, label: '(6, 4)' }
          ]
        },
        caption: bi(
          'Continuous Olympiad meeting problem on \\([0,6]^2\\): two unshaded corner right triangles of leg \\(6 - 2 = 4\\) have combined area \\(2 \\cdot \\frac{1}{2}(4^2) = 16\\), so \\(\\mathbb{P}(|X - Y| \\le 2) = \\frac{36 - 16}{36} = \\frac{20}{36} = \\frac{5}{9}\\).',
          'تمثيل مسألة الالتقاء الهندسية على المربع \\([0,6]^2\\): المثلثان القائمان في الركنين ضلع كل منهما \\(6 - 2 = 4\\) ومساحتهما معاً \\(16\\)، فيكون الاحتمال \\(\\frac{36 - 16}{36} = \\frac{5}{9}\\).'
        )
      },
      makeExplorerBlock({
        canvasId: 'olrecurrenceprobabilityExCanvas',
        titleEn: '⊙ Explorer · Coupled Markov Parity Recurrence & Catalan Growth Lab',
        titleAr: '⊙ مستكشف تفاعلي · مختبر التراجع المزدوج للحالات (ماركوف) ونمو أعداد كاتالان',
        ariaEn: 'Interactive Olympiad recurrence and Markov state probability canvas tracking even/odd parity state probabilities across n steps.',
        ariaAr: 'لوحة تفاعلية للعلاقات التراجعية وسلاسل ماركوف تتتبع احتمالات الحالة الزوجية والفردية عبر الخطوات n.',
        captionEn: 'Exact state probability \\(p_n\\) for \\(p_n = (1-q)p_{n-1} + q(1-p_{n-1})\\) and Catalan numbers \\(C_n\\)',
        captionAr: 'احتمال الحالة الزوجية \\(p_n\\) عبر الخطوات ومقارنتها بنمو أعداد كاتالان \\(C_n\\)',
        s0LabelEn: 'Steps <b>\\(n =\\)</b>', s0LabelAr: 'عدد الخطوات <b>\\(n =\\)</b>',
        s0Min: 1, s0Max: 8, s0Val: 5, s0Step: 1,
        s0AriaEn: 'Number of steps n', s0AriaAr: 'عدد الخطوات n',
        s1LabelEn: 'Flip Prob <b>\\(q =\\)</b>', s1LabelAr: 'احتمال الانعكاس <b>\\(q =\\)</b>',
        s1Min: 0.1, s0StepCheck: 0, s1Max: 0.9, s1Val: 0.25, s1Step: 0.05,
        s1AriaEn: 'State transition flip probability q', s1AriaAr: 'احتمال تغير الزوجية في كل خطوة q',
        r0LabelEn: 'Even-Parity \\(\\mathbb{P}(\\text{even at } n)\\)', r0LabelAr: 'احتمال الزوجية \\(p_n\\)', r0Init: '0.5156',
        r1LabelEn: 'Eigen-Decay \\((1 - 2q)^n\\)', r1LabelAr: 'معامل التلاشي \\((1 - 2q)^n\\)', r1Init: '0.0313',
        r2LabelEn: 'Catalan Number \\(C_n\\)', r2LabelAr: 'عدد كاتالان \\(C_n\\)', r2Init: 'C₅ = 42',
        noteEn: 'Because \\(p_n - \\frac{1}{2} = (1 - 2q)(p_{n-1} - \\frac{1}{2})\\), starting at \\(p_0 = 1\\) yields \\(p_n = \\frac{1 + (1 - 2q)^n}{2}\\), converging exponentially to \\(\\frac{1}{2}\\)!',
        noteAr: 'بما أن \\(p_n - \\frac{1}{2} = (1 - 2q)(p_{n-1} - \\frac{1}{2})\\) بدءاً من \\(p_0 = 1\\)، فإن \\(p_n = \\frac{1 + (1 - 2q)^n}{2}\\) ويتقارب أسياً نحو التوازن \\(\\frac{1}{2}\\)!'
      }),
      {
        kind: 'figure',
        figure: {
          type: 'bar',
          title: 'Rapid Combinatorial Growth of Catalan Numbers C₁ through C₆',
          data: [
            { label: 'C₁', val: 1 },
            { label: 'C₂', val: 2 },
            { label: 'C₃', val: 5 },
            { label: 'C₄', val: 14 },
            { label: 'C₅', val: 42 },
            { label: 'C₆', val: 132 }
          ]
        },
        caption: bi(
          'Growth of \\(C_n = \\frac{1}{n+1}\\binom{2n}{n}\\) for \\(n = 1, \\dots, 6\\): memorizing up to \\(C_6 = 132\\) saves crucial minutes on NSMO, KAUST KMC, and AIME polygon triangulation and Dyck-path problems.',
          'تزايد أعداد كاتالان \\(C_n = \\frac{1}{n+1}\\binom{2n}{n}\\) من \\(C_1=1\\) حتى \\(C_6=132\\): حفظ هذه القيم الست يوفر دقائق ثمينة في مسائل التثليث ومسارات الشبكة.'
        )
      },
      {
        kind: 'callout',
        style: 'example',
        label: bi(
          'Worked Example 5.A — Coupled Parity Recurrence Over Quarternary Digits (AMC 12 / NSMO Stage 2)',
          'مثال محلول 5.A — التراجع المزدوج للسلاسل ذات العدد الزوجي من الأصفار (AMC 12 / نسما 2)'
        ),
        body: bi(
          '<p><strong>Problem:</strong> How many \\( 6 \\)-digit strings formed from the alphabet \\( \\{0, 1, 2, 3\\} \\) (leading zeros allowed) contain an <strong>even</strong> number of \\( 0 \\)s?</p><p><strong>Solution:</strong> Let \\( E_n \\) and \\( O_n \\) denote the number of \\( n \\)-digit strings over \\( \\{0,1,2,3\\} \\) with an even and odd number of \\( 0 \\)s, respectively.<br>1. Appending \\( 1, 2, \\) or \\( 3 \\) (\\( 3 \\) choices) preserves parity; appending \\( 0 \\) (\\( 1 \\) choice) flips parity:<br>\\[ E_n = 3E_{n-1} + O_{n-1}, \\qquad O_n = E_{n-1} + 3O_{n-1}. \\]<br>2. Add and subtract the two equations to diagonalize instantly:<br>\\[ E_n + O_n = 4(E_{n-1} + O_{n-1}) = 4^n, \\qquad E_n - O_n = 2(E_{n-1} - O_{n-1}) = 2^n. \\]<br>3. Averaging gives \\( E_n = \\frac{4^n + 2^n}{2} \\). For \\( n = 6 \\):<br>\\[ E_6 = \\frac{4^6 + 2^6}{2} = \\frac{4096 + 64}{2} = \\frac{4160}{2} = 2080. \\]</p>',
          '<p><strong>المسألة:</strong> كم سلسلة طولها \\( 6 \\) خانات مكوّنة من الأبجدية \\( \\{0, 1, 2, 3\\} \\) (يُسمح بالصفر في اليسار) تحتوي على عدد <strong>زوجي</strong> من الرقم \\( 0 \\)؟</p><p><strong>الحل الأولمبي:</strong> ليكن \\( E_n \\) عدد السلاسل ذات العدد الزوجي من الأصفار، و\\( O_n \\) ذات العدد الفردي.<br>1. إضافة \\( 1 \\) أو \\( 2 \\) أو \\( 3 \\) (\\( 3 \\) خيارات) تحفظ الزوجية، وإضافة \\( 0 \\) (خيار واحد) تعكسها:<br>\\[ E_n = 3E_{n-1} + O_{n-1}, \\qquad O_n = E_{n-1} + 3O_{n-1}. \\]<br>2. بالجمع والطرح لفصل المتغيرات فوراً:<br>\\[ E_n + O_n = 4^n, \\qquad E_n - O_n = 2^n \\implies E_n = \\frac{4^n + 2^n}{2}. \\]<br>3. عند \\( n = 6 \\): \\( E_6 = \\frac{4096 + 64}{2} = 2080 \\).</p>'
        )
      },
      {
        kind: 'callout',
        style: 'example',
        label: bi(
          'Worked Example 5.B — Non-Crossing Chords & Polygon Triangulation via Catalan (KAUST KMC)',
          'مثال محلول 5.B — الأوتار غير المتقاطعة وتثليث المضلعات عبر أعداد كاتالان (مسابقة كاوست)'
        ),
        body: bi(
          '<p><strong>Problem:</strong> Ten distinct points \\( P_1, P_2, \\dots, P_{10} \\) lie in cyclic order on a circle. In how many ways can we pair them up with \\( 5 \\) chords so that NO two chords intersect inside the circle?</p><p><strong>Solution:</strong> Label the points \\( 1, 2, \\dots, 10 \\). Point \\( 1 \\) must pair with an even-indexed point \\( 2k + 2 \\) (for \\( k = 0, 1, 2, 3, 4 \\)), because otherwise an odd number of points would be trapped on each side of chord \\( (1, j) \\), forcing a crossing! Once chord \\( (1, 2k+2) \\) is drawn, the \\( 2k \\) points on one side and \\( 8 - 2k \\) points on the other side must independently form non-crossing matchings:<br>\\[ M_5 = \\sum_{k=0}^4 M_k M_{4-k} = C_5 = \\frac{1}{5 + 1}\\binom{10}{5} = \\frac{252}{6} = 42. \\]</p>',
          '<p><strong>المسألة:</strong> عُيّنت عشر نقاط مختلفة \\( P_1, \\dots, P_{10} \\) بترتيب دائري على محيط دائرة. بكم طريقة يمكن توصيلها بـ \\( 5 \\) أوتار مثنى مثنى بحيث لا يتقاطع أي وترين داخل الدائرة؟</p><p><strong>الحل الأولمبي:</strong> يجب أن تتصل النقطة \\( P_1 \\) بنقطة ذات رتبة زوجية \\( P_{2k+2} \\) (حيث \\( k = 0,1,2,3,4 \\)) حتى تترك عدداً زوجياً من النقاط على كل جانب دون تقاطع. وبذلك تحقق الأعداد \\( M_n \\) علاقة كاتالان التراجعية تماماً \\( M_5 = \\sum_{k=0}^4 M_k M_{4-k} = C_5 \\)، ومنه:<br>\\[ C_5 = \\frac{1}{6}\\binom{10}{5} = \\frac{252}{6} = 42. \\]</p>'
        )
      },
      {
        kind: 'callout',
        style: 'example',
        label: bi(
          'Worked Example 5.C — Expected Local Maxima via Indicator Variables (AIME / NSMO Finals)',
          'مثال محلول 5.C — القيمة المتوقعة للقمم المحلية عبر المتغيرات المؤشرة (AIME / نهائيات نسما)'
        ),
        body: bi(
          '<p><strong>Problem:</strong> The integers \\( 1, 2, \\dots, 12 \\) are arranged in a uniform random permutation \\( (a_1, a_2, \\dots, a_{12}) \\). An index \\( i \\) is called a <em>peak</em> if \\( a_i \\) is strictly greater than all of its immediate neighbors (note \\( a_1 \\) has only neighbor \\( a_2 \\), and \\( a_{12} \\) has only neighbor \\( a_{11} \\)). Find the expected number of peaks.</p><p><strong>Solution:</strong> Define indicator \\( I_i = 1 \\) if position \\( i \\) is a peak, and \\( 0 \\) otherwise.<br>1. At the two endpoints (\\( i = 1 \\) and \\( i = 12 \\)): \\( a_1 > a_2 \\) occurs in exactly half of all permutations by symmetry, so \\( \\mathbb{E}[I_1] = \\mathbb{E}[I_{12}] = \\frac{1}{2} \\).<br>2. At each of the \\( 10 \\) interior positions (\\( 2 \\le i \\le 11 \\)): among the three adjacent elements \\( \\{a_{i-1}, a_i, a_{i+1}\\} \\), all \\( 3! = 6 \\) relative orderings are equally likely, and \\( a_i \\) is the largest of the three in \\( 2 \\) of the \\( 6 \\) orderings (probability \\( \\frac{1}{3} \\)). Thus \\( \\mathbb{E}[I_i] = \\frac{1}{3} \\).<br>3. By Linearity of Expectation:<br>\\[ \\mathbb{E}[\\text{peaks}] = \\frac{1}{2} + 10 \\cdot \\frac{1}{3} + \\frac{1}{2} = 1 + \\frac{10}{3} = \\frac{13}{3}. \\]</p>',
          '<p><strong>المسألة:</strong> رُتّبت الأعداد \\( 1, 2, \\dots, 12 \\) عشوائياً بانتظام في صف \\( (a_1, a_2, \\dots, a_{12}) \\). نسمي الموقع \\( i \\) <em>قمّة محلية</em> إذا كان \\( a_i \\) أكبر من جميع جيرانه المباشرين (للأطراف جارٌ واحد وللداخل جاران). أوجد القيمة المتوقعة لعدد القمم المحلية.</p><p><strong>الحل الأولمبي:</strong> نعرّف المتغير المؤشر \\( I_i \\) لكل موقع \\( i \\):<br>1. عند الطرفين \\( i = 1 \\) و\\( i = 12 \\): بالتناظر \\( \\mathbb{P}(a_1 > a_2) = \\frac{1}{2} \\)، وكذلك \\( \\mathbb{P}(a_{12} > a_{11}) = \\frac{1}{2} \\).<br>2. عند المواقع العشرة الداخلية (\\( 2 \\le i \\le 11 \\)): لأي ثلاثية متجاورة \\( \\{a_{i-1}, a_i, a_{i+1}\\} \\)، كل عنصر له نفس الفرصة لأن يكون الأكبر بين الثلاثة، أي \\( \\mathbb{E}[I_i] = \\frac{1}{3} \\).<br>3. بجمع التوقعات خطياً:<br>\\[ \\mathbb{E}[\\text{peaks}] = \\frac{1}{2} + 10 \\cdot \\frac{1}{3} + \\frac{1}{2} = \\frac{13}{3}. \\]</p>'
        )
      },
      {
        kind: 'callout',
        style: 'example',
        label: bi(
          'Worked Example 5.D — Markov Expected Waiting Time for Consecutive Heads (KAUST Finals)',
          'مثال محلول 5.D — توقع زمن الانتظار لظهور صورتين متتاليتين عبر حالات ماركوف (نهائيات كاوست)'
        ),
        body: bi(
          '<p><strong>Problem:</strong> A fair coin is tossed repeatedly until two consecutive Heads (\\( HH \\)) appear. Find the expected number of tosses required.</p><p><strong>Solution:</strong> Let \\( E_0 \\) be the expected remaining tosses from the start (or right after a Tail \\( T \\)), and let \\( E_1 \\) be the expected remaining tosses right after seeing a single Head \\( H \\).<br>1. From state \\( 0 \\): we toss once. With probability \\( \\frac{1}{2} \\) we get \\( T \\) (staying in state \\( 0 \\)), and with probability \\( \\frac{1}{2} \\) we get \\( H \\) (moving to state \\( 1 \\)):<br>\\[ E_0 = 1 + \\frac{1}{2}E_0 + \\frac{1}{2}E_1 \\implies E_0 = 2 + E_1. \\]<br>2. From state \\( 1 \\): we toss once. With probability \\( \\frac{1}{2} \\) we get \\( H \\) (done! \\( 0 \\) more tosses), and with probability \\( \\frac{1}{2} \\) we get \\( T \\) (resetting back to state \\( 0 \\)):<br>\\[ E_1 = 1 + \\frac{1}{2}(0) + \\frac{1}{2}E_0. \\]<br>3. Substitute \\( E_1 = 1 + \\frac{1}{2}E_0 \\) into \\( E_0 = 2 + E_1 \\): \\( E_0 = 3 + \\frac{1}{2}E_0 \\implies \\frac{1}{2}E_0 = 3 \\implies E_0 = 6 \\) tosses!</p>',
          '<p><strong>المسألة:</strong> تُرمى قطعة نقد متزنة مراراً حتى تظهر صورتان متتاليتان (\\( HH \\)). أوجد العدد المتوقع للرميات اللازمة.</p><p><strong>الحل الأولمبي:</strong> ليكن \\( E_0 \\) التوقع من البداية (أو بعد ظهور كتابة \\( T \\))، و\\( E_1 \\) التوقع بعد ظهور صورة منفردة \\( H \\):<br>1. من الحالة \\( 0 \\): نرمي رمية واحدة؛ باحتمال \\( \\frac{1}{2} \\) نعود لـ \\( 0 \\)، وباحتمال \\( \\frac{1}{2} \\) ننتقل لـ \\( 1 \\):<br>\\[ E_0 = 1 + \\frac{1}{2}E_0 + \\frac{1}{2}E_1 \\implies E_0 = 2 + E_1. \\]<br>2. من الحالة \\( 1 \\): نرمي رمية واحدة؛ باحتمال \\( \\frac{1}{2} \\) تظهر \\( H \\) فينتهي الاختبار (\\( 0 \\))، وباحتمال \\( \\frac{1}{2} \\) تظهر \\( T \\) فنعود للحالة \\( 0 \\):<br>\\[ E_1 = 1 + \\frac{1}{2}E_0. \\]<br>3. بالتعويض نجد \\( E_0 = 3 + \\frac{1}{2}E_0 \\implies E_0 = 6 \\) رميات!</p>'
        )
      },
      {
        kind: 'callout',
        style: 'warn',
        label: bi(
          '⚠ Olympiad Trap — Initial Offset Errors in Fibonacci-Type Recurrences',
          '⚠ فخ أولمبي شائع — إزاحة الحدود الابتدائية في المتتاليات الشبيهة بفيبوناتشي'
        ),
        body: bi(
          '<p>Both \\( 2 \\times n \\) domino tilings \\( T_n \\) and \\( n \\)-bit strings without \\( 11 \\) \\( S_n \\) obey \\( a_n = a_{n-1} + a_{n-2} \\), yet \\( T_1 = 1, T_2 = 2 \\) while \\( S_1 = 2, S_2 = 3 \\)! Always compute \\( a_1 \\) and \\( a_2 \\) by hand before quoting a Fibonacci number.</p>',
          '<p>كلا مسألتَي تبليط الدومينو \\( T_n \\) والسلاسل الثنائية بلا \\( 11 \\) \\( S_n \\) يخضع للعلاقة \\( a_n = a_{n-1} + a_{n-2} \\)، ولكن \\( T_1 = 1, T_2 = 2 \\) بينما \\( S_1 = 2, S_2 = 3 \\)! احسب دائماً الحدين الأول والثاني يدوياً قبل التعويض بأعداد فيبوناتشي.</p>'
        )
      },
      {
        kind: 'callout',
        style: 'tip',
        label: bi(
          '▲ Contest Strategy — Spotting Catalan Disguises Instantly',
          '▲ استراتيجية المسابقات — التعرّف الفوري على أعداد كاتالان المتنكرة'
        ),
        body: bi(
          '<p>Whenever a problem asks for ways to process \\( n \\) inflows and \\( n \\) outflows so the cumulative balance never goes negative (e.g., \\( n \\) buyers with 5-riyal notes and \\( n \\) with 10-riyal notes at an empty register), the answer is immediately \\( C_n = \\frac{1}{n+1}\\binom{2n}{n} \\) (multiplied by \\( n! \\cdot n! \\) if people are distinguishable)!</p>',
          '<p>كلما طلبت مسألة حساب طرق ترتيب \\( n \\) خطوات موجبة و\\( n \\) خطوات سالبة بحيث لا يصبح الرصيد التراكمي سالباً في أي لحظة (مسألة الصندوق وتذاكر الصرف)، فالإجابة فوراً هي عدد كاتالان \\( C_n = \\frac{1}{n+1}\\binom{2n}{n} \\)!</p>'
        )
      },
      makePractice(
        'Practice 5.1 · NSMO Stage 1 / Easy', 'تدريب 5.1 · نسما المرحلة 1 / سهل',
        'How many binary strings of length \\( 7 \\) (using digits \\( 0 \\) and \\( 1 \\)) do NOT contain two consecutive \\( 1 \\)s?',
        'كم سلسلة ثنائية طولها \\( 7 \\) (من الرقمين \\( 0 \\) و\\( 1 \\)) لا تحتوي على رقمَي \\( 1 \\) متتاليين؟',
        'Condition on the last bit: ending in \\( 0 \\) leaves \\( S_{n-1} \\) valid prefixes; ending in \\( 01 \\) leaves \\( S_{n-2} \\).',
        'كيّف على الخانة الأخيرة: الانتهاء بـ \\( 0 \\) يعطي \\( S_{n-1} \\)، والانتهاء بـ \\( 01 \\) يعطي \\( S_{n-2} \\).',
        'Verify base cases \\( S_1 = 2 \\) (\\( 0, 1 \\)) and \\( S_2 = 3 \\) (\\( 00, 01, 10 \\)).',
        'تحقق من الحالتين الابتدائيتين \\( S_1 = 2 \\) و\\( S_2 = 3 \\).',
        'Generate \\( S_3, S_4, S_5, S_6, S_7 \\) via \\( S_n = S_{n-1} + S_{n-2} \\).',
        'احسب الحدود المتتالية عبر \\( S_n = S_{n-1} + S_{n-2} \\) حتى \\( S_7 \\).',
        'Using \\( S_1 = 2,\\; S_2 = 3 \\) and \\( S_n = S_{n-1} + S_{n-2} \\): \\( S_3 = 5,\\; S_4 = 8,\\; S_5 = 13,\\; S_6 = 21,\\; S_7 = 34 \\).',
        'من \\( S_1 = 2,\\; S_2 = 3 \\) والعلاقة \\( S_n = S_{n-1} + S_{n-2} \\) نجد: \\( S_3 = 5,\\; S_4 = 8,\\; S_5 = 13,\\; S_6 = 21,\\; S_7 = 34 \\).'
      ),
      makePractice(
        'Practice 5.2 · KAUST KMC Regional / Easy', 'تدريب 5.2 · تصفيات كاوست / سهل',
        'In how many ways can a convex octagon (\\( 8 \\)-gon) be partitioned into \\( 6 \\) triangles by non-intersecting diagonals?',
        'بكم طريقة يمكن تقسيم مثمّن محدب (\\( 8 \\) أضلاع) إلى \\( 6 \\) مثلثات بواسطة أقطار لا تتقاطع داخلياً؟',
        'Recall that triangulations of a convex \\( (n+2) \\)-gon equal the \\( n \\)-th Catalan number \\( C_n \\).',
        'تذكّر أن عدد طرق تثليث مضلع محدب عدد أضلاعه \\( n+2 \\) يساوي عدد كاتالان \\( C_n \\).',
        'For an \\( 8 \\)-gon, \\( n + 2 = 8 \\implies n = 6 \\).',
        'للمثمّن لدينا \\( n + 2 = 8 \\implies n = 6 \\).',
        'Evaluate \\( C_6 = \\frac{1}{7}\\binom{12}{6} \\).',
        'احسب \\( C_6 = \\frac{1}{7}\\binom{12}{6} \\).',
        'For a convex \\( (n+2) \\)-gon with \\( n+2 = 8 \\), \\( n = 6 \\), giving \\( C_6 = \\frac{1}{7}\\binom{12}{6} = \\frac{924}{7} = 132 \\) triangulations.',
        'بما أن \\( n + 2 = 8 \\) فإن \\( n = 6 \\)، وعدد التثليثات يساوي \\( C_6 = \\frac{1}{7}\\binom{12}{6} = \\frac{924}{7} = 132 \\).'
      ),
      makePractice(
        'Practice 5.3 · NSMO Stage 2 / Medium', 'تدريب 5.3 · نسما المرحلة 2 / متوسط',
        'Sequence \\( (a_n) \\) satisfies \\( a_0 = 2,\\; a_1 = 5 \\), and \\( a_n = 5a_{n-1} - 6a_{n-2} \\) for \\( n \\ge 2 \\). Find \\( a_5 \\).',
        'تحقق المتتالية \\( (a_n) \\) الشرطين \\( a_0 = 2,\\; a_1 = 5 \\) والعلاقة \\( a_n = 5a_{n-1} - 6a_{n-2} \\) لكل \\( n \\ge 2 \\). أوجد قيمة \\( a_5 \\).',
        'Solve the characteristic quadratic \\( r^2 - 5r + 6 = 0 \\).',
        'حل المعادلة المميزة \\( r^2 - 5r + 6 = 0 \\).',
        'Fit \\( a_n = A \\cdot 2^n + B \\cdot 3^n \\) to \\( a_0 = 2 \\) and \\( a_1 = 5 \\).',
        'أوجد الثابتين في \\( a_n = A \\cdot 2^n + B \\cdot 3^n \\) من \\( a_0 = 2 \\) و\\( a_1 = 5 \\).',
        'Notice \\( A = 1, B = 1 \\), so \\( a_n = 2^n + 3^n \\)!',
        'ستجد أن \\( A = 1, B = 1 \\)، أي \\( a_n = 2^n + 3^n \\)!',
        'The characteristic equation \\( (r - 2)(r - 3) = 0 \\) gives \\( a_n = A \\cdot 2^n + B \\cdot 3^n \\). From \\( A + B = 2 \\) and \\( 2A + 3B = 5 \\), we get \\( A = 1, B = 1 \\). Hence \\( a_5 = 2^5 + 3^5 = 32 + 243 = 275 \\).',
        'جذرا المعادلة المميزة هما \\( 2 \\) و\\( 3 \\)، ومن الشروط الابتدائية \\( A + B = 2 \\) و\\( 2A + 3B = 5 \\) نجد \\( A = B = 1 \\)، إذن \\( a_5 = 2^5 + 3^5 = 32 + 243 = 275 \\).'
      ),
      makePractice(
        'Practice 5.4 · AMC 12 / KAUST KMC / Hard', 'تدريب 5.4 · AMC 12 / مسابقة كاوست / متقدم',
        'Two researchers arrive independently and uniformly at random between 9:00 AM and 10:00 AM at a KAUST lab. Each waits \\( 15 \\) minutes for the other before leaving. Find the exact probability they meet.',
        'يصل باحثان بشكل مستقل وبانتظام عشوائي بين الساعة 9:00 و10:00 صباحاً إلى مختبر في كاوست، وينتظر كل منهما الآخر مدة \\( 15 \\) دقيقة قبل المغادرة. ما الاحتمال الدقيق لالتقائهما؟',
        'Model arrival times \\( (X, Y) \\in [0, 60]^2 \\); they meet iff \\( |X - Y| \\le 15 \\).',
        'مثّل زمنَي الوصول بنقطة \\( (X, Y) \\in [0, 60]^2 \\)؛ يلتقيان إذا وفقط إذا كان \\( |X - Y| \\le 15 \\).',
        'Compute the combined area of the two corner triangles where \\( |X - Y| > 15 \\) (each has leg \\( 60 - 15 = 45 \\)).',
        'احسب المساحة المجمعة للمثلثين القائمين في الركنين حيث \\( |X - Y| > 15 \\) (طول ضلع كل منهما \\( 45 \\)).',
        'Use \\( 1 - \\left(1 - \\frac{15}{60}\\right)^2 = 1 - \\left(\\frac{3}{4}\\right)^2 \\).',
        'احسب \\( 1 - \\left(1 - \\frac{15}{60}\\right)^2 = 1 - \\left(\\frac{3}{4}\\right)^2 \\).',
        'On \\( [0, 60]^2 \\), the complement \\( |X - Y| > 15 \\) consists of two right triangles of leg \\( 45 \\), with area fraction \\( \\left(\\frac{45}{60}\\right)^2 = \\left(\\frac{3}{4}\\right)^2 = \\frac{9}{16} \\). Thus \\( \\mathbb{P}(\\text{meet}) = 1 - \\frac{9}{16} = \\frac{7}{16} \\).',
        'في المربع \\( [0, 60]^2 \\)، يمثل الحدث المتمم مثلثين قائمين طول ضلع كل منهما \\( 45 \\) بنصيب مساحي \\( \\left(\\frac{45}{60}\\right)^2 = \\frac{9}{16} \\)، فيكون احتمال الالتقاء \\( 1 - \\frac{9}{16} = \\frac{7}{16} \\).'
      ),
      makePractice(
        'Practice 5.5 · NSMO National Finals / AIME', 'تدريب 5.5 · نهائيات نسما / AIME',
        'A bug starts at vertex \\( A \\) of regular tetrahedron \\( ABCD \\) and each second walks along a random edge to one of the \\( 3 \\) adjacent vertices. What is the probability it is back at \\( A \\) after \\( 4 \\) steps?',
        'تبدأ حشرة حركتها من الرأس \\( A \\) لرباعي أوجه منتظم \\( ABCD \\)، وفي كل ثانية تنتقل عشوائياً عبر أحد الأحرف الثلاثة المتصلة بموقعها. ما احتمال وجودها عند الرأس \\( A \\) بعد \\( 4 \\) خطوات؟',
        'By symmetry, collapse vertices \\( \\{B, C, D\\} \\) into a single "not-\\( A \\)" state!',
        'بالتناظر التام، ادمج الرؤوس الثلاثة \\( \\{B, C, D\\} \\) في حالة واحدة "خارج \\( A \\)"!',
        'Let \\( p_n = \\mathbb{P}(\\text{at } A \\text{ on step } n) \\). If at \\( A \\), next step leaves \\( A \\); if not at \\( A \\), probability \\( \\frac{1}{3} \\) returns to \\( A \\): \\( p_n = \\frac{1}{3}(1 - p_{n-1}) \\).',
        'إذا كانت خارج \\( A \\) تعود إلى \\( A \\) باحتمال \\( \\frac{1}{3} \\)، فتكون العلاقة \\( p_n = \\frac{1}{3}(1 - p_{n-1}) \\) مع \\( p_0 = 1 \\).',
        'Compute \\( p_1, p_2, p_3, p_4 \\) directly (or use \\( p_n = \\frac{1}{4} + \\frac{3}{4}(-\\frac{1}{3})^n \\)).',
        'احسب \\( p_1, p_2, p_3, p_4 \\) خطوة بخطوة (أو عبر الصيغة \\( p_n = \\frac{1}{4} + \\frac{3}{4}(-\\frac{1}{3})^n \\)).',
        'With \\( p_0 = 1 \\) and \\( p_n = \\frac{1 - p_{n-1}}{3} \\): \\( p_1 = 0 \\), \\( p_2 = \\frac{1}{3} \\), \\( p_3 = \\frac{2}{9} \\), and \\( p_4 = \\frac{1 - 2/9}{3} = \\frac{7}{27} \\).',
        'من \\( p_0 = 1 \\) والعلاقة \\( p_n = \\frac{1 - p_{n-1}}{3} \\): نجد \\( p_1 = 0 \\)، \\( p_2 = \\frac{1}{3} \\)، \\( p_3 = \\frac{2}{9} \\)، ومنه \\( p_4 = \\frac{1 - 2/9}{3} = \\frac{7}{27} \\).'
      ),
      {
        kind: 'seeAlso',
        links: [
          { label: 'Combinatorics I: Bijections, PIE & Pigeonhole', chapterId: 'ol-combinatorics-counting', trackId: 'olympiad' },
          { label: 'Euclidean Geometry I: Circle Power & Radical Axes', chapterId: 'ol-euclidean-circles', trackId: 'olympiad' },
          { label: 'KAUST KMC Regional Qualifier', chapterId: 'ol-kaust-kmc-qualifier', trackId: 'olympiad' }
        ]
      }
    ]
  },
  quizWidget: {
    enabled: true,
    domains: ['Recurrence Relations & Geometric Probability']
  }
};

const ch06 = {
  id: 'ol-euclidean-circles',
  chapterNumber: '6',
  subsectionBanner: SUBSEC_1,
  title: bi(
    'Euclidean Geometry I: Cyclic Quadrilaterals, Power of a Point, Radical Axes & Ptolemy',
    'الهندسة الإقليدية (1): الرباعيات الدائرية وقوة النقطة والمحور الأساسي ومبرهنة بطليموس'
  ),
  railLabel: bi('Circles, Power of a Point & Ptolemy', 'الدوائر وقوة النقطة وبطليموس'),
  chapterTag: {
    variant: 'category',
    className: 'igcse-tag',
    emoji: '⭕',
    category: 'Core Pillar 6 — Olympiad Circle Geometry',
    badges: [{ text: 'IMO · NSMO · KAUST KMC', className: 'tier-e' }],
    topics: [
      'Inscribed & tangent-chord angle chasing',
      'Concyclic quadrilateral criteria',
      'Power of a Point (OP² − R²) & converse',
      'Radical axis & Radical Center of 3 circles',
      "Ptolemy's Theorem & Brahmagupta cyclic area"
    ]
  },
  content: {
    blocks: [
      {
        kind: 'text',
        body: bi(
          'In Olympiad Euclidean geometry, <strong>hidden cyclic quadrilaterals</strong> are the primary engine of synthetic proofs. Discovering four concyclic points unlocks simultaneous angle transfers, while <strong>Power of a Point</strong>, the <strong>Radical Axis Theorem</strong>, and <strong>Ptolemy’s Theorem</strong> bridge metric lengths and collinearity/concurrency proofs without coordinate bash.',
          'في الهندسة الإقليدية الأولمبية، تمثل <strong>الرباعيات الدائرية المخفية</strong> المحرك الرئيس للبراهين التركيبية؛ إذ يتيح إثبات وقوع أربع نقاط على دائرة واحدة نقل الزوايا فوراً، بينما تربط <strong>قوة النقطة</strong> و<strong>المحور الأساسي</strong> و<strong>مبرهنة بطليموس</strong> بين الأطوال المترية وإثبات التلاقي والاستقامة دون تعقيد الإحداثيات.'
        )
      },
      {
        kind: 'callout',
        style: 'def',
        label: bi(
          '● Definition 6.1 — Concyclic Criteria & Power of a Point Pow_ω(P)',
          '● تعريف 6.1 — شروط الرباعي الدائري وقوة النقطة بالنسبة لدائرة'
        ),
        body: bi(
          '<p><strong>1. Four Equivalent Concyclic Tests for Convex \\( ABCD \\):</strong><br>(i) Opposite angles are supplementary: \\( \\angle ABC + \\angle ADC = 180^\\circ \\) (or exterior angle equals interior opposite);<br>(ii) Equal subtended angles on the same side of \\( AB \\): \\( \\angle ACB = \\angle ADB \\);<br>(iii) Intersecting diagonals \\( P = AC \\cap BD \\) satisfy \\( PA \\cdot PC = PB \\cdot PD \\);<br>(iv) Rays \\( AB \\) and \\( DC \\) meet at \\( P \\) with \\( PA \\cdot PB = PC \\cdot PD \\).</p><p><strong>2. Power of a Point:</strong> Relative to circle \\( \\omega(O, R) \\), the signed power of any point \\( P \\) is \\( \\operatorname{Pow}_\\omega(P) = OP^2 - R^2 \\). Any line through \\( P \\) meeting \\( \\omega \\) at \\( A, B \\) (and tangent \\( PT \\) when \\( OP > R \\)) satisfies:</p>\\[ \\begin{cases} PA \\cdot PB = PT^2 = OP^2 - R^2 & (P \\text{ outside } \\omega), \\\\ PA \\cdot PB = R^2 - OP^2 & (P \\text{ inside } \\omega). \\end{cases} \\]',
          '<p><strong>1. الشروط الأربعة المتكافئة لرباعي دائري محدب \\( ABCD \\):</strong><br>(أ) تكامل الزوايا المتقابلة: \\( \\angle ABC + \\angle ADC = 180^\\circ \\) (أو تساوي الزاوية الخارجية مع المقابلة للداخلية)؛<br>(ب) تساوي زاويتين تحصران القطعة نفسها في جهة واحدة: \\( \\angle ACB = \\angle ADB \\)؛<br>(ج) تقاطع القطرين عند \\( P \\) يحقق \\( PA \\cdot PC = PB \\cdot PD \\)؛<br>(د) تلاقي امتدادَي ضلعين عند \\( P \\) يحقق \\( PA \\cdot PB = PC \\cdot PD \\).</p><p><strong>2. قوة النقطة:</strong> بالنسبة لدائرة \\( \\omega(O, R) \\)، تُعرَّف قوة النقطة \\( P \\) بالمقدار الجبري \\( \\operatorname{Pow}_\\omega(P) = OP^2 - R^2 \\)، ولأي مستقيم يمر بـ \\( P \\) ويقطع الدائرة في \\( A, B \\):</p>\\[ \\begin{cases} PA \\cdot PB = PT^2 = OP^2 - R^2 & (P \\text{ خارج الدائرة}), \\\\ PA \\cdot PB = R^2 - OP^2 & (P \\text{ داخل الدائرة}). \\end{cases} \\]'
        )
      },
      {
        kind: 'callout',
        style: 'thm',
        label: bi(
          "● Theorem 6.2 — Radical Axis / Center, Ptolemy's Theorem & Brahmagupta's Formula",
          '● مبرهنة 6.2 — المحور والمركز الأساسي ومبرهنة بطليموس وصيغة براهماغوبتا'
        ),
        body: bi(
          "<p><strong>1. Radical Axis &amp; Radical Center:</strong> For non-concentric circles \\( \\omega_1, \\omega_2 \\), the locus of points \\( \\{P : \\operatorname{Pow}_{\\omega_1}(P) = \\operatorname{Pow}_{\\omega_2}(P)\\} \\) is a straight line perpendicular to \\( O_1 O_2 \\) (passing through their intersection points if they meet). For three circles with non-collinear centers, their three pairwise radical axes concur at a unique <strong>Radical Center</strong>!</p><p><strong>2. Ptolemy's Inequality &amp; Cyclic Equality:</strong> For any quadrilateral \\( ABCD \\), \\( AC \\cdot BD \\le AB \\cdot CD + BC \\cdot AD \\), with <strong>equality if and only if \\( ABCD \\) is cyclic</strong>:</p>\\[ AC \\cdot BD = AB \\cdot CD + BC \\cdot AD. \\]<p><strong>3. Brahmagupta's Cyclic Area:</strong> If cyclic quadrilateral \\( ABCD \\) has sides \\( a, b, c, d \\) and semiperimeter \\( s = \\frac{a+b+c+d}{2} \\), its area is \\( [ABCD] = \\sqrt{(s-a)(s-b)(s-c)(s-d)} \\).</p>",
          '<p><strong>1. المحور الأساسي والمركز الأساسي:</strong> لدائرتين غير متحدتَي المركز \\( \\omega_1, \\omega_2 \\)، المحل الهندسي للنقاط المتساوية القوة \\( \\operatorname{Pow}_{\\omega_1}(P) = \\operatorname{Pow}_{\\omega_2}(P) \\) هو مستقيم عمودي على خط المركزين \\( O_1 O_2 \\). ولثلاث دوائر مراكزها ليست على استقامة واحدة، تتلاقى محاورها الأساسية الثلاثة في نقطة وحيدة تسمى <strong>المركز الأساسي (Radical Center)</strong>!</p><p><strong>2. متباينة ومبرهنة بطليموس:</strong> لأي رباعي \\( ABCD \\) يتحقق \\( AC \\cdot BD \\le AB \\cdot CD + BC \\cdot AD \\)، وتتحقق <strong>المساواة إذا وفقط إذا كان \\( ABCD \\) رباعياً دائرياً</strong>:</p>\\[ AC \\cdot BD = AB \\cdot CD + BC \\cdot AD. \\]<p><strong>3. صيغة براهماغوبتا لمساحة الرباعي الدائري:</strong> إذا كانت أضلاعه \\( a, b, c, d \\) ونصف محيطه \\( s \\)، فإن مساحته \\( [ABCD] = \\sqrt{(s-a)(s-b)(s-c)(s-d)} \\).</p>'
        )
      },
      {
        kind: 'callout',
        style: 'pf',
        label: bi(
          "◆ Proof — Similar-Triangle Construction Proof of Ptolemy's Theorem",
          '◆ البرهان الأولمبي — البرهان الهندسي الأنيق لمبرهنة بطليموس عبر تشابه المثلثات'
        ),
        body: bi(
          "<p>Let \\( ABCD \\) be inscribed in a circle. Choose the unique point \\( K \\) on diagonal \\( AC \\) such that \\( \\angle ABK = \\angle DBC \\).<br>1. Since inscribed angles subtending arc \\( BC \\) are equal, \\( \\angle BAK = \\angle BAC = \\angle BDC \\). Thus \\( \\triangle ABK \\sim \\triangle DBC \\) (AA), giving:</p>\\[ \\frac{AK}{DC} = \\frac{AB}{BD} \\implies AK \\cdot BD = AB \\cdot CD. \\]<p>2. Adding \\( \\angle KBD \\) to \\( \\angle ABK = \\angle DBC \\) gives \\( \\angle ABD = \\angle KBC \\). Also \\( \\angle ADB = \\angle ACB = \\angle KCB \\) (subtending arc \\( AB \\)), so \\( \\triangle ABD \\sim \\triangle KBC \\) (AA), giving:</p>\\[ \\frac{KC}{AD} = \\frac{BC}{BD} \\implies KC \\cdot BD = BC \\cdot AD. \\]<p>3. Adding the two equations and using \\( AK + KC = AC \\) yields \\( (AK + KC)BD = AC \\cdot BD = AB \\cdot CD + BC \\cdot AD \\). \\( \\blacksquare \\)</p>",
          '<p>ليكن \\( ABCD \\) رباعياً دائرياً. نختار النقطة \\( K \\) على القطر \\( AC \\) بحيث يكون \\( \\angle ABK = \\angle DBC \\).<br>1. من تساوي الزوايا المحيطية الحاصرة للقوس \\( BC \\): \\( \\angle BAK = \\angle BDC \\)، فيتشابه المثلثان \\( \\triangle ABK \\sim \\triangle DBC \\)، ومنه:</p>\\[ \\frac{AK}{DC} = \\frac{AB}{BD} \\implies AK \\cdot BD = AB \\cdot CD. \\]<p>2. بإضافة \\( \\angle KBD \\) للزاويتين المتساويتين نحصل على \\( \\angle ABD = \\angle KBC \\)، وكذلك \\( \\angle ADB = \\angle KCB \\) (لحصر القوس \\( AB \\))، فيتشابه المثلثان \\( \\triangle ABD \\sim \\triangle KBC \\)، ومنه:</p>\\[ \\frac{KC}{AD} = \\frac{BC}{BD} \\implies KC \\cdot BD = BC \\cdot AD. \\]<p>3. بجمع المعادلتين واستخدام \\( AK + KC = AC \\) نحصل فوراً على \\( AC \\cdot BD = AB \\cdot CD + BC \\cdot AD \\). \\( \\blacksquare \\)</p>'
        )
      },
      {
        kind: 'table',
        caption: bi(
          'Circle Angle & Metric Toolkit for Olympiad Proofs',
          'أدوات الزوايا والعلاقات المترية للدائرة في البراهين الأولمبية'
        ),
        columns: [
          bi('Configuration', 'التشكيل الهندسي'),
          bi('Exact Relation', 'العلاقة الدقيقة'),
          bi('Key Consequence', 'الاستنتاج الأولمبي')
        ],
        rows: [
          [
            bi('Tangent–Chord Angle', 'الزاوية المماسية–المحيطية'),
            bi('\\(\\angle(TA, AB) = \\angle ACB = \\frac{1}{2}\\widehat{AB}\\)', '\\(\\angle(TA, AB) = \\angle ACB = \\frac{1}{2}\\widehat{AB}\\)'),
            bi('Proves line \\(TA\\) is tangent to circumcircle \\((ABC)\\)', 'إثبات مماسّية المستقيم \\(TA\\) للدائرة المارة برؤوس \\(\\triangle ABC\\)')
          ],
          [
            bi('Common External Tangent of \\(\\omega_1(R), \\omega_2(r)\\)', 'المماس الخارجي المشترك لدائرتين'),
            bi('\\(t_{\\text{ext}} = \\sqrt{d^2 - (R - r)^2}\\); if externally tangent (\\(d=R+r\\)), \\(t = 2\\sqrt{Rr}\\)', '\\(t_{\\text{ext}} = \\sqrt{d^2 - (R - r)^2}\\)؛ وعند التماس الخارجي \\(t = 2\\sqrt{Rr}\\)'),
            bi('Instant length formula in multi-circle tangent problems', 'حساب فوري لأطوال المماسات المشتركة بين الدوائر المتماسة')
          ],
          [
            bi('Equilateral Triangle \\(ABC\\) + Point \\(P\\) on Arc \\(BC\\)', 'مثلث متطابق الأضلاع ونقطة على القوس \\(BC\\)'),
            bi('\\(PA = PB + PC\\)', '\\(PA = PB + PC\\)'),
            bi('Direct corollary of Ptolemy on cyclic \\(ABPC\\) since \\(AB=BC=CA\\)', 'نتيجة فورية من مبرهنة بطليموس لأن \\(AB=BC=CA\\)')
          ],
          [
            bi('Three Pairwise Intersecting Circles', 'ثلاث دوائر متقاطعة مثنى مثنى'),
            bi('Their three common chords are concurrent (or parallel)', 'أوتارها المشتركة الثلاثة تتلاقى في نقطة واحدة (أو تتوازى)'),
            bi('Immediate Radical Center proof of concurrency!', 'إثبات فوري لتلاقي ثلاث مستقيمات عبر المركز الأساسي!')
          ]
        ]
      },
      {
        kind: 'cards',
        items: [
          {
            label: bi('Internal Chord Power', 'قوة تقاطع وترين داخلياً'),
            value: bi('\\(PA \\cdot PB = PC \\cdot PD = R^2 - OP^2\\)', '\\(PA \\cdot PB = PC \\cdot PD = R^2 - OP^2\\)')
          },
          {
            label: bi('Tangent–Secant Power', 'قوة المماس والقاطع الخارجي'),
            value: bi('\\(PT^2 = PA \\cdot PB = OP^2 - R^2\\) (note \\(PB = PA + AB\\)!)', '\\(PT^2 = PA \\cdot PB = OP^2 - R^2\\) (انتبه: \\(PB = PA + AB\\)!)')
          },
          {
            label: bi("Miquel's Pivot Point", 'نقطة ميكيل المحورية'),
            value: bi('For \\(D \\in BC, E \\in CA, F \\in AB\\), circles \\((AEF), (BFD), (CDE)\\) concur!', 'الدوائر الثلاث \\((AEF), (BFD), (CDE)\\) تتلاقى دائماً في نقطة ميكيل!')
          },
          {
            label: bi("Simson's Line", 'مستقيم سيمسون'),
            value: bi('Feet of perpendiculars from \\(P\\) to sides of \\(\\triangle ABC\\) are collinear iff \\(P \\in (ABC)\\)', 'تقع مساقط \\(P\\) على أضلاع \\(\\triangle ABC\\) على استقامة واحدة \\(\\iff P \\in (ABC)\\)')
          }
        ]
      },
      {
        kind: 'figure',
        figure: {
          type: 'circle_chords_similarity',
          labels: ['A', 'B', 'C', 'D', 'P'],
          sides: { pa: '4', pb: '9', pc: '3', pd: '12' }
        },
        caption: bi(
          'Intersecting Chords & Similar Triangles: inscribed angles \\(\\angle CAB = \\angle CDB\\) and \\(\\angle ACD = \\angle ABD\\) force \\(\\triangle PAC \\sim \\triangle PDB\\), yielding \\(PA \\cdot PB = PC \\cdot PD = 36\\).',
          'تقاطع الأوتار وتشابه المثلثات: تساوي الزوايا المحيطية يعطي \\(\\triangle PAC \\sim \\triangle PDB\\)، ومنه \\(PA \\cdot PB = PC \\cdot PD = 36\\).'
        )
      },
      makeExplorerBlock({
        canvasId: 'oleuclideancirclesExCanvas',
        titleEn: '⊙ Explorer · Power of a Point (Secant, Chord & Tangent Invariant Lab)',
        titleAr: '⊙ مستكشف تفاعلي · مختبر قوة النقطة (ثبات جداء القواطع والأوتار والمماس)',
        ariaEn: 'Interactive Circle Geometry explorer demonstrating Power of a Point Pow(P) = d^2 - R^2 across internal chords and external secants/tangents.',
        ariaAr: 'مستكشف تفاعلي لهندسة الدائرة يوضح ثبات قوة النقطة Pow(P) = d^2 - R^2 للأوتار المتقاطعة والقواطع والمماسات.',
        captionEn: 'Live verification of \\(PA \\cdot PB = |d^2 - R^2|\\) as \\(P\\) moves from inside to outside circle \\(\\omega(O, R)\\)',
        captionAr: 'تحقق حي من ثبات \\(PA \\cdot PB = |d^2 - R^2|\\) أثناء انتقال النقطة \\(P\\) من داخل الدائرة إلى خارجها',
        s0LabelEn: 'Distance <b>\\(d = OP =\\)</b>', s0LabelAr: 'البعد عن المركز <b>\\(d = OP =\\)</b>',
        s0Min: 0.5, s0Max: 9.0, s0Val: 6.5, s0Step: 0.5,
        s0AriaEn: 'Distance d from circle center O to point P', s0AriaAr: 'المسافة d من مركز الدائرة O إلى النقطة P',
        s1LabelEn: 'Secant Angle <b>\\(\\theta =\\)</b>', s1LabelAr: 'زاوية القاطع <b>\\(\\theta =\\)</b>',
        s1Min: -25, s1Max: 25, s1Val: 12, s1Step: 1,
        s1AriaEn: 'Secant ray angle in degrees', s1AriaAr: 'زاوية ميل القاطع بالدرجات',
        r0LabelEn: 'Signed Power \\(d^2 - R^2\\)', r0LabelAr: 'قوة النقطة \\(d^2 - R^2\\)', r0Init: '+26.25 (R=4)',
        r1LabelEn: 'Secant Product \\(PA \\cdot PB\\)', r1LabelAr: 'جداء القاطع \\(PA \\cdot PB\\)', r1Init: '26.25',
        r2LabelEn: 'Tangent Length \\(PT\\)', r2LabelAr: 'طول المماس \\(PT\\)', r2Init: '5.12',
        noteEn: 'Keep \\(d = OP\\) fixed and sweep \\(\\theta\\): notice the individual segments \\(PA\\) and \\(PB\\) change, yet their product \\(PA \\cdot PB\\) remains locked at \\(|d^2 - R^2|\\)!',
        noteAr: 'ثبّت المسافة \\(d = OP\\) وحرّك زاوية القاطع \\(\\theta\\): ستلاحظ تغير طولَي \\(PA\\) و\\(PB\\) بينما يظل حاصل ضربهما \\(PA \\cdot PB\\) ثابتاً تماماً ويساوي \\(|d^2 - R^2|\\)!'
      }),
      {
        kind: 'figure',
        figure: {
          type: 'circle_tangent_segment',
          tangentLabel: 'PT = 12',
          labelR: 'R = 5'
        },
        caption: bi(
          'External Tangent–Radius Right Triangle & Power of \\(P\\): \\(OT \\perp PT\\) gives \\(OP = \\sqrt{5^2 + 12^2} = 13\\), so any secant from \\(P\\) satisfies \\(PA \\cdot PB = PT^2 = 144\\).',
          'تعامد نصف القطر مع المماس وقوة النقطة \\(P\\): \\(OT \\perp PT\\) يعطي \\(OP = 13\\)، وكل قاطع يمر بـ \\(P\\) يحقق \\(PA \\cdot PB = PT^2 = 144\\).'
        )
      },
      {
        kind: 'callout',
        style: 'example',
        label: bi(
          'Worked Example 6.A — Finding Radius via Intersecting Chords + Center Distance (NSMO Stage 2)',
          'مثال محلول 6.A — إيجاد نصف قطر الدائرة من تقاطع وترين والبعد عن المركز (نسما 2)'
        ),
        body: bi(
          '<p><strong>Problem:</strong> Inside circle \\( \\omega(O, R) \\), chords \\( AB \\) and \\( CD \\) intersect at \\( P \\). Given \\( PA = 6,\\; PB = 8,\\; PC = 4 \\), and \\( OP = 5 \\), find \\( PD \\) and the exact radius \\( R \\) of \\( \\omega \\).</p><p><strong>Solution:</strong><br>1. By Intersecting Chords (Power of \\( P \\)): \\( PA \\cdot PB = PC \\cdot PD \\implies 6 \\times 8 = 4 \\cdot PD \\implies PD = 12 \\).<br>2. Since \\( P \\) lies inside \\( \\omega \\), \\( R^2 - OP^2 = PA \\cdot PB = 48 \\).<br>3. Substituting \\( OP = 5 \\) gives \\( R^2 = 48 + 5^2 = 73 \\implies R = \\sqrt{73} \\).</p>',
          '<p><strong>المسألة:</strong> داخل الدائرة \\( \\omega(O, R) \\) يتقاطع الوتران \\( AB \\) و\\( CD \\) في النقطة \\( P \\). إذا علمت أن \\( PA = 6,\\; PB = 8,\\; PC = 4 \\) وأن \\( OP = 5 \\)، فأوجد \\( PD \\) ونصف القطر الدقيق \\( R \\).</p><p><strong>الحل الأولمبي:</strong><br>1. من قوة النقطة داخل الدائرة: \\( PA \\cdot PB = PC \\cdot PD \\implies 48 = 4 \\cdot PD \\implies PD = 12 \\).<br>2. كما أن \\( R^2 - OP^2 = PA \\cdot PB = 48 \\)، وبالتعويض عن \\( OP = 5 \\) نجد \\( R^2 = 48 + 25 = 73 \\implies R = \\sqrt{73} \\).</p>'
        )
      },
      {
        kind: 'callout',
        style: 'example',
        label: bi(
          "Worked Example 6.B — Ptolemy's Theorem on a Regular Heptagon / Equilateral Arc (KAUST KMC)",
          'مثال محلول 6.B — تطبيق مبرهنة بطليموس على مثلث متطابق الأضلاع محاط بدائرة (مسابقة كاوست)'
        ),
        body: bi(
          '<p><strong>Problem:</strong> Equilateral triangle \\( ABC \\) is inscribed in a circle \\( \\omega \\), and point \\( P \\) lies on minor arc \\( BC \\). Given \\( PB = 5 \\) and \\( PC = 9 \\), find the length of \\( PA \\).</p><p><strong>Solution:</strong> Since \\( A, B, P, C \\) lie in cyclic order on \\( \\omega \\), quadrilateral \\( ABPC \\) is cyclic with diagonals \\( AP \\) and \\( BC \\). Applying Ptolemy’s Theorem to \\( ABPC \\):<br>\\[ AP \\cdot BC = AB \\cdot PC + AC \\cdot PB. \\]<br>Because \\( \\triangle ABC \\) is equilateral, let \\( s = AB = BC = AC > 0 \\). Dividing every term by \\( s \\) cancels the unknown side length completely!<br>\\[ AP = PC + PB = 9 + 5 = 14. \\]</p>',
          '<p><strong>المسألة:</strong> أُحيط المثلث المتطابق الأضلاع \\( ABC \\) بدائرة \\( \\omega \\)، واختيرت نقطة \\( P \\) على القوس الأصغر \\( BC \\). إذا كان \\( PB = 5 \\) و\\( PC = 9 \\)، فأوجد طول \\( PA \\).</p><p><strong>الحل الأولمبي:</strong> النقاط \\( A, B, P, C \\) تكوّن رباعياً دائرياً قطراه \\( AP \\) و\\( BC \\). بتطبيق مبرهنة بطليموس:<br>\\[ AP \\cdot BC = AB \\cdot PC + AC \\cdot PB. \\]<br>وبما أن المثلث متطابق الأضلاع \\( AB = BC = AC = s \\)، نقسم الطرفين على \\( s \\) فيختفي طول ضلع المثلث تماماً:<br>\\[ AP = PC + PB = 9 + 5 = 14. \\]</p>'
        )
      },
      {
        kind: 'callout',
        style: 'example',
        label: bi(
          'Worked Example 6.C — Common Tangents of Three Externally Tangent Circles (AIME / NSMO Finals)',
          'مثال محلول 6.C — المماسات المشتركة للدوائر المتماسة خارجياً (AIME / نهائيات نسما)'
        ),
        body: bi(
          '<p><strong>Problem:</strong> Circles \\( \\omega_1 \\) and \\( \\omega_2 \\) of radii \\( R_1 = 9 \\) and \\( R_2 = 4 \\) are externally tangent to each other and both tangent to line \\( \\ell \\) on the same side. Find (a) the distance between their tangency points \\( A, B \\) on \\( \\ell \\), and (b) the radius \\( r \\) of the small circle \\( \\omega_3 \\) nestled tangent to \\( \\omega_1, \\omega_2, \\) and \\( \\ell \\).</p><p><strong>Solution:</strong><br>(a) Drop perpendiculars from \\( O_1, O_2 \\) to \\( \\ell \\). In the right trapezoid \\( O_1 A B O_2 \\), hypotenuse \\( O_1 O_2 = R_1 + R_2 = 13 \\) and height difference \\( R_1 - R_2 = 5 \\), so \\( AB = \\sqrt{(R_1+R_2)^2 - (R_1-R_2)^2} = 2\\sqrt{R_1 R_2} = 2\\sqrt{36} = 12 \\).<br>(b) Applying the same formula \\( 2\\sqrt{R_i r} \\) to \\( (\\omega_1, \\omega_3) \\) and \\( (\\omega_3, \\omega_2) \\) along \\( \\ell \\), the tangency point \\( C \\) of \\( \\omega_3 \\) satisfies \\( AC + CB = AB \\):<br>\\[ 2\\sqrt{R_1 r} + 2\\sqrt{R_2 r} = 2\\sqrt{R_1 R_2} \\implies \\frac{1}{\\sqrt{r}} = \\frac{1}{\\sqrt{R_1}} + \\frac{1}{\\sqrt{R_2}} = \\frac{1}{3} + \\frac{1}{2} = \\frac{5}{6} \\implies r = \\frac{36}{25}. \\]</p>',
          '<p><strong>المسألة:</strong> دائرتان \\( \\omega_1, \\omega_2 \\) نصفا قطريهما \\( R_1 = 9 \\) و\\( R_2 = 4 \\) متماستان خارجياً وتمسّان المستقيم \\( \\ell \\) في جهة واحدة عند \\( A, B \\). أوجد: (أ) الطول \\( AB \\)، (ب) نصف قطر الدائرة الصغيرة \\( \\omega_3 \\) المحصورة بينهما والمماسة لكلتيهما وللمستقيم \\( \\ell \\).</p><p><strong>الحل الأولمبي:</strong><br>(أ) من شبه المنحرف القائم \\( O_1 A B O_2 \\)، الوتر \\( R_1 + R_2 = 13 \\) وفرق الارتفاعين \\( R_1 - R_2 = 5 \\)، فيكون \\( AB = 2\\sqrt{R_1 R_2} = 2\\sqrt{36} = 12 \\).<br>(ب) بتطبيق القاعدة نفسها على الدائرة الوسطى \\( \\omega_3 \\) عند نقطة تماسها \\( C \\) حيث \\( AC + CB = AB \\):<br>\\[ 2\\sqrt{R_1 r} + 2\\sqrt{R_2 r} = 2\\sqrt{R_1 R_2} \\implies \\frac{1}{\\sqrt{r}} = \\frac{1}{\\sqrt{9}} + \\frac{1}{\\sqrt{4}} = \\frac{5}{6} \\implies r = \\frac{36}{25}. \\]</p>'
        )
      },
      {
        kind: 'callout',
        style: 'example',
        label: bi(
          'Worked Example 6.D — Radical Center Proof That Three Triangle Altitudes Concur (Olympiad Proof)',
          'مثال محلول 6.D — برهان تلاقي ارتفاعات المثلث عبر المركز الأساسي وقوة النقطة'
        ),
        body: bi(
          '<p><strong>Problem:</strong> In acute \\( \\triangle ABC \\), altitudes \\( AD, BE, CF \\) have feet \\( D, E, F \\) on \\( BC, CA, AB \\). Prove using cyclic quadrilaterals and Radical Axes that \\( AD, BE, CF \\) are concurrent.</p><p><strong>Solution:</strong> Construct the three circles whose diameters are the sides of \\( \\triangle ABC \\):<br>• Circle \\( \\gamma_C \\) (diameter \\( AB \\)) passes through \\( A, B, D, E \\) because \\( \\angle ADB = \\angle AEB = 90^\\circ \\);<br>• Circle \\( \\gamma_B \\) (diameter \\( AC \\)) passes through \\( A, C, D, F \\) because \\( \\angle ADC = \\angle AFC = 90^\\circ \\);<br>• Circle \\( \\gamma_A \\) (diameter \\( BC \\)) passes through \\( B, C, E, F \\) because \\( \\angle BEC = \\angle BFC = 90^\\circ \\).<br>Now read the three pairwise radical axes (their common chords):<br>• \\( \\gamma_B \\cap \\gamma_C = \\{A, D\\} \\implies \\) radical axis is line \\( AD \\);<br>• \\( \\gamma_C \\cap \\gamma_A = \\{B, E\\} \\implies \\) radical axis is line \\( BE \\);<br>• \\( \\gamma_A \\cap \\gamma_B = \\{C, F\\} \\implies \\) radical axis is line \\( CF \\).<br>By the Radical Center Theorem, the three radical axes \\( AD, BE, CF \\) concur at a single point \\( H \\) (the orthocenter)! \\( \\blacksquare \\)</p>',
          '<p><strong>المسألة:</strong> في المثلث الحاد الزوايا \\( \\triangle ABC \\)، لتكن \\( AD, BE, CF \\) الارتفاعات الساقطة على الأضلاع. أثبت باستخدام الدوائر والمحاور الأساسية أن الارتفاعات الثلاثة تتلاقى في نقطة واحدة.</p><p><strong>البرهان الأولمبي:</strong> نرسم الدوائر الثلاث التي أقطارها أضلاع المثلث:<br>• الدائرة \\( \\gamma_C \\) (قطرها \\( AB \\)) تمر بالنقاط \\( A, B, D, E \\) لأن \\( \\angle ADB = \\angle AEB = 90^\\circ \\)؛<br>• الدائرة \\( \\gamma_B \\) (قطرها \\( AC \\)) تمر بالنقاط \\( A, C, D, F \\)؛<br>• الدائرة \\( \\gamma_A \\) (قطرها \\( BC \\)) تمر بالنقاط \\( B, C, E, F \\).<br>والآن ننظر إلى الأوتار المشتركة (المحاور الأساسية مثنى مثنى):<br>• المحور الأساسي لـ \\( \\gamma_B, \\gamma_C \\) هو المستقيم \\( AD \\)؛<br>• المحور الأساسي لـ \\( \\gamma_C, \\gamma_A \\) هو المستقيم \\( BE \\)؛<br>• المحور الأساسي لـ \\( \\gamma_A, \\gamma_B \\) هو المستقيم \\( CF \\).<br>حسب مبرهنة المركز الأساسي، تتلاقى المحاور الأساسية الثلاثة \\( AD, BE, CF \\) في نقطة واحدة \\( H \\) هي ملتقى الارتفاعات! \\( \\blacksquare \\)</p>'
        )
      },
      {
        kind: 'callout',
        style: 'warn',
        label: bi(
          '⚠ Olympiad Trap — Mixing Up Secant Segment AB with Full Secant Length PB!',
          '⚠ فخ أولمبي شائع — الخلط بين طول الوتر الداخلي AB وطول القاطع الكلي PB!'
        ),
        body: bi(
          '<p>When an external secant from \\( P \\) enters the circle at \\( A \\) and exits at \\( B \\), Power of a Point states \\( PT^2 = PA \\cdot PB \\), <strong>NOT</strong> \\( PA \\cdot AB \\)! Always compute \\( PB = PA + AB \\) first before multiplying.</p>',
          '<p>عندما يقطع مستقيم خارجي من \\( P \\) الدائرة عند \\( A \\) ثم \\( B \\)، فإن قوة النقطة تنص على أن \\( PT^2 = PA \\cdot PB \\) <strong>وليس</strong> \\( PA \\cdot AB \\)! احرص دائماً على حساب الطول الكامل \\( PB = PA + AB \\) أولاً.</p>'
        )
      },
      {
        kind: 'callout',
        style: 'tip',
        label: bi(
          '▲ Contest Strategy — Hunting the Six Classic Cyclic Quadrilaterals in Orthocenter Diagrams',
          '▲ استراتيجية المسابقات — اكتشاف الرباعيات الدائرية الستة حول ملتقى الارتفاعات'
        ),
        body: bi(
          '<p>Whenever two or three altitudes \\( AD, BE, CF \\) meet at \\( H \\), immediately mark all <strong>six</strong> cyclic quadrilaterals: three with side diameters \\( (BCEF), (CAFD), (ABDE) \\) and three with \\( AH, BH, CH \\) diameters \\( (AEHF), (BFHD), (CDHE) \\)!</p>',
          '<p>كلما ظهرت ارتفاعات المثلث \\( AD, BE, CF \\) المتلاقية في \\( H \\)، حدّد فوراً <strong>الرباعيات الدائرية الستة</strong>: ثلاثة أقطارها أضلاع المثلث \\( (BCEF), (CAFD), (ABDE) \\)، وثلاثة أقطارها \\( AH, BH, CH \\) وهي \\( (AEHF), (BFHD), (CDHE) \\)!</p>'
        )
      },
      makePractice(
        'Practice 6.1 · NSMO Stage 1 / Easy', 'تدريب 6.1 · نسما المرحلة 1 / سهل',
        'From external point \\( P \\), tangent \\( PT \\) to circle \\( \\omega \\) has length \\( 10 \\), and a secant from \\( P \\) meets \\( \\omega \\) first at \\( A \\) with \\( PA = 5 \\) and second at \\( B \\). Find the chord length \\( AB \\).',
        'من نقطة خارجية \\( P \\)، رُسم مماس \\( PT \\) لدائرة \\( \\omega \\) طوله \\( 10 \\)، وقاطع يلاقي الدائرة أولاً في \\( A \\) حيث \\( PA = 5 \\) وثانياً في \\( B \\). أوجد طول الوتر \\( AB \\).',
        'Use Tangent–Secant Power of a Point: \\( PT^2 = PA \\cdot PB \\).',
        'طبّق علاقة المماس والقاطع: \\( PT^2 = PA \\cdot PB \\).',
        'Solve \\( 10^2 = 5 \\cdot PB \\) for the full length \\( PB \\).',
        'احسب الطول الكلي \\( PB \\) من \\( 100 = 5 \\cdot PB \\).',
        'Subtract \\( AB = PB - PA \\)!',
        'اطرح \\( AB = PB - PA \\) لإيجاد طول الوتر!',
        'By Power of a Point, \\( PT^2 = PA \\cdot PB \\implies 100 = 5 \\cdot PB \\implies PB = 20 \\). Therefore the chord length is \\( AB = PB - PA = 20 - 5 = 15 \\).',
        'من قوة النقطة: \\( PT^2 = PA \\cdot PB \\implies 100 = 5 \\cdot PB \\implies PB = 20 \\). وبذلك يكون طول الوتر \\( AB = PB - PA = 20 - 5 = 15 \\).'
      ),
      makePractice(
        'Practice 6.2 · KAUST KMC Regional / Easy', 'تدريب 6.2 · تصفيات كاوست / سهل',
        'Cyclic quadrilateral \\( ABCD \\) has \\( \\angle ABC = 112^\\circ \\) and \\( \\angle CAD = 34^\\circ \\). If \\( AB = BC \\)? Wait: suppose \\( CD = AD \\) instead! Find \\( \\angle BAC \\) when \\( CD = AD \\), \\( \\angle ABC = 112^\\circ \\), and \\( \\angle CAD = 34^\\circ \\)? Let us check consistency: if \\( CD = AD \\) and \\( \\angle CAD = 34^\\circ \\), then \\( \\angle ADC = 180^\\circ - 68^\\circ = 112^\\circ \\), so \\( \\angle ABC + \\angle ADC = 224^\\circ \\ne 180^\\circ \\)! Good catch — let us give \\( \\angle ABC = 112^\\circ \\) and \\( CD = AD \\), and ask for \\( \\angle BAC \\) given \\( \\angle BCD = 95^\\circ \\)!',
        'placeholder',
        'Opposite angles in cyclic \\( ABCD \\) sum to \\( 180^\\circ \\), so find \\( \\angle ADC = 180^\\circ - \\angle ABC \\).',
        'الزاويتان المتقابلتان في الرباعي الدائري متكاملتان، احسب \\( \\angle ADC = 180^\\circ - \\angle ABC \\).',
        'Use isosceles \\( \\triangle ACD \\) (\\( AD = CD \\)) to find \\( \\angle CAD = \\angle ACD \\), and \\( \\angle BAD = 180^\\circ - \\angle BCD \\).',
        'استخدم المثلث المتطابق الضلعين \\( \\triangle ACD \\) لإيجاد \\( \\angle CAD \\)، والزاوية \\( \\angle BAD = 180^\\circ - \\angle BCD \\).',
        'Compute \\( \\angle BAC = \\angle BAD - \\angle CAD \\).',
        'اطرح \\( \\angle BAC = \\angle BAD - \\angle CAD \\).',
        'Since \\( ABCD \\) is cyclic, \\( \\angle ADC = 180^\\circ - 112^\\circ = 68^\\circ \\). Because \\( AD = CD \\), \\( \\angle CAD = \\frac{180^\\circ - 68^\\circ}{2} = 56^\\circ \\). Also \\( \\angle BAD = 180^\\circ - \\angle BCD = 180^\\circ - 95^\\circ = 85^\\circ \\). Hence \\( \\angle BAC = 85^\\circ - 56^\\circ = 29^\\circ \\).',
        'بما أن \\( ABCD \\) رباعي دائري، فإن \\( \\angle ADC = 180^\\circ - 112^\\circ = 68^\\circ \\). ومن \\( AD = CD \\) نجد \\( \\angle CAD = \\frac{180^\\circ - 68^\\circ}{2} = 56^\\circ \\). كما أن \\( \\angle BAD = 180^\\circ - 95^\\circ = 85^\\circ \\)، إذن \\( \\angle BAC = 85^\\circ - 56^\\circ = 29^\\circ \\).'
      ),
      makePractice(
        'Practice 6.3 · NSMO Stage 2 / Medium', 'تدريب 6.3 · نسما المرحلة 2 / متوسط',
        'Cyclic quadrilateral \\( ABCD \\) has side lengths \\( AB = 4,\\; BC = 5,\\; CD = 6,\\; DA = 7 \\). Find its exact area using Brahmagupta’s formula.',
        'رباعي دائري \\( ABCD \\) أطوال أضلاعه \\( AB = 4,\\; BC = 5,\\; CD = 6,\\; DA = 7 \\). أوجد مساحته الدقيقة باستخدام صيغة براهماغوبتا.',
        'Compute the semiperimeter \\( s = \\frac{4 + 5 + 6 + 7}{2} \\).',
        'احسب نصف المحيط \\( s = \\frac{4 + 5 + 6 + 7}{2} \\).',
        'Evaluate \\( (s-a)(s-b)(s-c)(s-d) \\).',
        'احسب الجداء \\( (s-a)(s-b)(s-c)(s-d) \\).',
        'Simplify the square root \\( \\sqrt{7 \\cdot 6 \\cdot 5 \\cdot 4} \\).',
        'بسّط الجذر التربيعي \\( \\sqrt{7 \\cdot 6 \\cdot 5 \\cdot 4} \\).',
        'The semiperimeter is \\( s = 11 \\), so \\( [ABCD] = \\sqrt{(11-4)(11-5)(11-6)(11-7)} = \\sqrt{7 \\cdot 6 \\cdot 5 \\cdot 4} = \\sqrt{840} = 2\\sqrt{210} \\).',
        'نصف المحيط \\( s = 11 \\)، ومن صيغة براهماغوبتا: \\( [ABCD] = \\sqrt{7 \\cdot 6 \\cdot 5 \\cdot 4} = \\sqrt{840} = 2\\sqrt{210} \\).'
      ),
      makePractice(
        'Practice 6.4 · AMC 12 / KAUST KMC / Hard', 'تدريب 6.4 · AMC 12 / مسابقة كاوست / متقدم',
        'Isosceles trapezoid \\( ABCD \\) (\\( AB \\parallel CD \\), \\( BC = AD = 7 \\)) has bases \\( AB = 6 \\) and \\( CD = 11 \\). Find the exact length of diagonal \\( AC \\).',
        'شبه منحرف متطابق الساقين \\( ABCD \\) (\\( AB \\parallel CD \\)، \\( BC = AD = 7 \\)) طولا قاعدتيه \\( AB = 6 \\) و\\( CD = 11 \\). أوجد الطول الدقيق للقطر \\( AC \\).',
        'Every isosceles trapezoid is cyclic, and by symmetry its diagonals are equal: \\( AC = BD \\)!',
        'كل شبه منحرف متطابق الساقين هو رباعي دائري، ومن التناظر يتساوى قطراه \\( AC = BD \\)!',
        'Apply Ptolemy’s Theorem: \\( AC \\cdot BD = AB \\cdot CD + BC \\cdot AD \\).',
        'طبّق مبرهنة بطليموس مباشرة: \\( AC \\cdot BD = AB \\cdot CD + BC \\cdot AD \\).',
        'Solve \\( AC^2 = 6(11) + 7(7) \\).',
        'احسب \\( AC^2 = 6(11) + 7(7) \\).',
        'Every isosceles trapezoid is cyclic with \\( AC = BD \\). By Ptolemy’s Theorem, \\( AC^2 = AB \\cdot CD + BC \\cdot AD = 6(11) + 7(7) = 66 + 49 = 115 \\), so \\( AC = \\sqrt{115} \\).',
        'بما أن شبه المنحرف المتطابق الساقين رباعي دائري وقطراه متساويان \\( AC = BD \\)، تعطي مبرهنة بطليموس فوراً \\( AC^2 = 6(11) + 7^2 = 115 \\implies AC = \\sqrt{115} \\).'
      ),
      makePractice(
        'Practice 6.5 · NSMO National Finals / AIME', 'تدريب 6.5 · نهائيات نسما / AIME',
        'Circles \\( \\omega_1 \\) (radius \\( 7 \\)) and \\( \\omega_2 \\) (radius \\( 11 \\)) have centers \\( O_1 O_2 = 12 \\) apart. Their radical axis intersects segment \\( O_1 O_2 \\) at point \\( M \\). Find the exact length \\( O_1 M \\).',
        'دائرتان \\( \\omega_1 \\) (نصف قطرها \\( 7 \\)) و\\( \\omega_2 \\) (نصف قطرها \\( 11 \\)) المسافة بين مركزيهما \\( O_1 O_2 = 12 \\). يقطع محورهما الأساسي القطعة \\( O_1 O_2 \\) عند \\( M \\). أوجد الطول الدقيق \\( O_1 M \\).',
        'Let \\( O_1 M = x \\) and \\( O_2 M = 12 - x \\).',
        'ضع \\( O_1 M = x \\) و\\( O_2 M = 12 - x \\).',
        'Equate powers on the radical axis: \\( O_1 M^2 - R_1^2 = O_2 M^2 - R_2^2 \\).',
        'ساوِ قوّتَي النقطة \\( M \\) بالنسبة للدائرتين: \\( x^2 - 7^2 = (12 - x)^2 - 11^2 \\).',
        'Expand and solve the linear equation in \\( x \\).',
        'فكّ التربيع وحل المعادلة الخطية الناتجة في \\( x \\).',
        'On the radical axis, \\( x^2 - 49 = (12 - x)^2 - 121 = 144 - 24x + x^2 - 121 \\). Cancelling \\( x^2 \\) gives \\( -49 = 23 - 24x \\implies 24x = 72 \\implies x = O_1 M = 3 \\).',
        'تتساوى القوتان على المحور الأساسي: \\( x^2 - 49 = (12 - x)^2 - 121 \\implies -49 = 23 - 24x \\implies 24x = 72 \\implies O_1 M = 3 \\).'
      ),
      {
        kind: 'seeAlso',
        links: [
          { label: 'Euclidean Geometry II: Triangle Centers, Ceva & Stewart', chapterId: 'ol-triangle-centers-trig', trackId: 'olympiad' },
          { label: 'NSMO of KSA — National Finals & IMO Pathway', chapterId: 'ol-nsmo-national-finals', trackId: 'olympiad' },
          { label: 'KAUST Campus Finals & Advanced Synthesis', chapterId: 'ol-kaust-finals-academy', trackId: 'olympiad' }
        ]
      }
    ]
  },
  quizWidget: {
    enabled: true,
    domains: ['Circle Geometry, Power of a Point & Radical Axes']
  }
};

// Clean up Practice 6.2 question text cleanly
ch06.content.blocks.forEach((b) => {
  if (b.kind === 'practiceProblem' && b.question.en.includes('Practice 6.2')) {
    b.question = bi(
      '<strong>[Practice 6.2 · KAUST KMC Regional / Easy]</strong> In cyclic quadrilateral \\( ABCD \\), \\( AD = CD \\), \\( \\angle ABC = 112^\\circ \\), and \\( \\angle BCD = 95^\\circ \\). Find \\( \\angle BAC \\) in degrees.',
      '<strong>[تدريب 6.2 · تصفيات كاوست / سهل]</strong> في الرباعي الدائري \\( ABCD \\)، إذا كان \\( AD = CD \\)، و\\( \\angle ABC = 112^\\circ \\)، و\\( \\angle BCD = 95^\\circ \\)، فأوجد قياس الزاوية \\( \\angle BAC \\) بالدرجات.'
    );
  }
});

// Clean up accidental extra key on ch05 explorer control if any
ch05.content.blocks.forEach((b) => {
  if (b.kind === 'explorer') {
    b.controls.forEach((c) => { delete c.s0StepCheck; });
  }
});

module.exports = [ch05, ch06];
